
import { LingoData, LingoTerm } from '@/types/lingo';

const sampleTerms: LingoTerm[] = [
  {
    text: "AI co-pilot for CFOs",
    frequency: 145,
    sentiment: 'positive',
    channels: ['LinkedIn', 'X', 'TechCrunch'],
    category: 'core_positioning',
    firstSeen: '2024-01-15',
    growth: 25,
    opportunityScore: 85
  },
  {
    text: "Revenue Intelligence",
    frequency: 89,
    sentiment: 'positive',
    channels: ['LinkedIn', 'Blogs'],
    category: 'product_category',
    firstSeen: '2024-02-01',
    growth: 18,
    opportunityScore: 72
  },
  {
    text: "Legacy tools are broken",
    frequency: 67,
    sentiment: 'disruptive',
    channels: ['X', 'Reddit', 'Blogs'],
    category: 'market_narrative',
    firstSeen: '2024-01-20',
    growth: 35,
    opportunityScore: 78
  },
  {
    text: "Founder-led growth",
    frequency: 134,
    sentiment: 'positive',
    channels: ['X', 'LinkedIn', 'Podcasts'],
    category: 'community_movement',
    firstSeen: '2023-12-10',
    growth: 12,
    opportunityScore: 65
  },
  {
    text: "No-code revolution",
    frequency: 156,
    sentiment: 'positive',
    channels: ['X', 'LinkedIn', 'YouTube'],
    category: 'community_movement',
    firstSeen: '2023-11-05',
    growth: 45,
    opportunityScore: 90
  },
  {
    text: "Spend Management 2.0",
    frequency: 43,
    sentiment: 'neutral',
    channels: ['LinkedIn', 'Blogs'],
    category: 'product_category',
    firstSeen: '2024-02-15',
    growth: 8,
    opportunityScore: 58
  },
  {
    text: "AI-first accounting",
    frequency: 78,
    sentiment: 'positive',
    channels: ['LinkedIn', 'X', 'Industry Reports'],
    category: 'core_positioning',
    firstSeen: '2024-01-08',
    growth: 42,
    opportunityScore: 88
  },
  {
    text: "Embedded finance",
    frequency: 92,
    sentiment: 'positive',
    channels: ['LinkedIn', 'TechCrunch', 'Blogs'],
    category: 'market_narrative',
    firstSeen: '2023-12-20',
    growth: 28,
    opportunityScore: 75
  }
];

const sampleChannels = [
  { name: 'LinkedIn', terms: 28, engagement: 1250, color: '#0077B5' },
  { name: 'X/Twitter', terms: 22, engagement: 890, color: '#1DA1F2' },
  { name: 'TechCrunch', terms: 15, engagement: 650, color: '#00D562' },
  { name: 'Blogs', terms: 18, engagement: 420, color: '#FF6B35' },
  { name: 'Reddit', terms: 12, engagement: 380, color: '#FF4500' },
  { name: 'Podcasts', terms: 8, engagement: 290, color: '#9B59B6' }
];

const sampleTimeline = [
  { date: '2023-11', terms: 12, newTerms: ['No-code revolution'] },
  { date: '2023-12', terms: 18, newTerms: ['Founder-led growth', 'Embedded finance'] },
  { date: '2024-01', terms: 25, newTerms: ['AI co-pilot for CFOs', 'AI-first accounting'] },
  { date: '2024-02', terms: 34, newTerms: ['Revenue Intelligence', 'Spend Management 2.0'] },
  { date: '2024-03', terms: 41, newTerms: ['Intelligent automation'] },
  { date: '2024-04', terms: 38, newTerms: [] },
  { date: '2024-05', terms: 45, newTerms: ['CFO copilot', 'Smart finance'] },
  { date: '2024-06', terms: 52, newTerms: ['Finance AI'] }
];

const suggestedLingo = [
  "CFO Command Center",
  "Financial Intelligence Platform",
  "Smart Spend Analytics",
  "Revenue Optimization Engine",
  "AI-Powered Finance Stack",
  "Predictive Cash Flow",
  "Finance Automation Suite",
  "Strategic Finance AI"
];

export function generateMockLingoData(url: string): LingoData {
  const companyName = extractCompanyName(url);
  
  return {
    companyUrl: url,
    companyName,
    analysisDate: new Date().toISOString(),
    terms: sampleTerms,
    channels: sampleChannels,
    timeline: sampleTimeline,
    suggestedLingo,
    totalTermsAnalyzed: 247,
    sentimentBreakdown: {
      positive: 156,
      neutral: 67,
      disruptive: 24
    }
  };
}

function extractCompanyName(url: string): string {
  try {
    const domain = new URL(url).hostname.replace('www.', '');
    const name = domain.split('.')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  } catch {
    return "Sample Company";
  }
}
