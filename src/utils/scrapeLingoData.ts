import cheerio from 'cheerio';
import Sentiment from 'sentiment';
import { LingoData, LingoTerm, ChannelData, TimelineData } from '@/types/lingo';

interface ScrapeOptions {
  dateRange?: { from: Date; to: Date };
  platforms?: string[]; // e.g. ['linkedin','twitter']
  language?: string;
}

/** Strip HTML tags and return plain text */
function stripHtml(html: string): string {
  const $ = cheerio.load(html);
  return $('body').text();
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(Boolean);
}

function ngrams(words: string[], n: number): string[] {
  const grams: string[] = [];
  for (let i = 0; i <= words.length - n; i++) {
    grams.push(words.slice(i, i + n).join(' '));
  }
  return grams;
}

function extractPhrases(texts: string[]): Map<string, number> {
  const freq = new Map<string, number>();
  for (const txt of texts) {
    const words = tokenize(txt);
    for (const n of [2, 3]) {
      for (const phrase of ngrams(words, n)) {
        freq.set(phrase, (freq.get(phrase) || 0) + 1);
      }
    }
  }
  return freq;
}

function classifyPhrase(phrase: string): LingoTerm['category'] {
  const lower = phrase.toLowerCase();
  if (/(co-?pilot|ai|automation|assistant)/.test(lower)) {
    return 'core_positioning';
  }
  if (/(management|platform|intelligence|analytics)/.test(lower)) {
    return 'product_category';
  }
  if (/(community|movement|open source|founder)/.test(lower)) {
    return 'community_movement';
  }
  return 'market_narrative';
}

async function fetchText(url: string): Promise<string[]> {
  try {
    const res = await fetch(url);
    const html = await res.text();
    return [stripHtml(html)];
  } catch {
    return [];
  }
}

export async function scrapeLingoData(companyUrl: string, opts: ScrapeOptions = {}): Promise<LingoData> {
  const companyName = new URL(companyUrl).hostname.replace('www.', '').split('.')[0];

  const sentiment = new Sentiment();

  const sources: Record<string, string[]> = {
    website: [companyUrl],
    blog: [companyUrl.replace(/\/$/, '') + '/blog'],
    linkedin: [`https://r.jina.ai/https://www.linkedin.com/company/${companyName}/posts/`],
    twitter: [`https://r.jina.ai/https://twitter.com/search?q=${companyName}`],
  };

  const allTexts: Record<string, string[]> = {};
  for (const [channel, urls] of Object.entries(sources)) {
    if (opts.platforms && !opts.platforms.includes(channel)) continue;
    allTexts[channel] = [];
    for (const url of urls) {
      const texts = await fetchText(url);
      allTexts[channel].push(...texts);
    }
  }

  // Extract phrases
  const termMap = new Map<string, { count: number; channels: Set<string>; sentiment: number }>();
  for (const [channel, texts] of Object.entries(allTexts)) {
    const phraseFreq = extractPhrases(texts);
    for (const [phrase, count] of phraseFreq) {
      if (!termMap.has(phrase)) {
        termMap.set(phrase, { count: 0, channels: new Set(), sentiment: 0 });
      }
      const entry = termMap.get(phrase)!;
      entry.count += count;
      entry.channels.add(channel);
      entry.sentiment += sentiment.analyze(phrase).score;
    }
  }

  const terms: LingoTerm[] = Array.from(termMap.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 50)
    .map(([phrase, info]) => {
      const avgSentiment = info.sentiment / info.count;
      let sentimentLabel: LingoTerm['sentiment'] = 'neutral';
      if (avgSentiment > 1) sentimentLabel = 'positive';
      else if (avgSentiment < -1) sentimentLabel = 'disruptive';
      return {
        text: phrase,
        frequency: info.count,
        sentiment: sentimentLabel,
        channels: Array.from(info.channels),
        category: classifyPhrase(phrase),
        firstSeen: new Date().toISOString(),
        growth: 0,
        opportunityScore: Math.max(0, 100 - info.count),
      };
    });

  const channels: ChannelData[] = Object.entries(allTexts).map(([name, texts]) => ({
    name,
    terms: terms.filter(t => t.channels.includes(name)).length,
    engagement: texts.join(' ').length,
    color: '#8884d8',
  }));

  const timeline: TimelineData[] = [
    { date: new Date().toISOString().slice(0, 7), terms: terms.length, newTerms: terms.slice(0, 5).map(t => t.text) }
  ];

  const suggestedLingo = terms
    .filter(t => t.frequency <= 2 && t.sentiment === 'positive')
    .slice(0, 8)
    .map(t => t.text);

  const sentimentBreakdown = {
    positive: terms.filter(t => t.sentiment === 'positive').length,
    neutral: terms.filter(t => t.sentiment === 'neutral').length,
    disruptive: terms.filter(t => t.sentiment === 'disruptive').length,
  };

  return {
    companyUrl,
    companyName,
    analysisDate: new Date().toISOString(),
    terms,
    channels,
    timeline,
    suggestedLingo,
    totalTermsAnalyzed: terms.length,
    sentimentBreakdown,
  };
}
