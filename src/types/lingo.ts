
export interface LingoTerm {
  text: string;
  frequency: number;
  sentiment: 'positive' | 'neutral' | 'disruptive';
  channels: string[];
  category: 'core_positioning' | 'product_category' | 'community_movement' | 'market_narrative';
  firstSeen: string;
  growth: number;
  opportunityScore: number;
}

export interface ChannelData {
  name: string;
  terms: number;
  engagement: number;
  color: string;
}

export interface TimelineData {
  date: string;
  terms: number;
  newTerms: string[];
}

export interface LingoData {
  companyUrl: string;
  companyName: string;
  analysisDate: string;
  terms: LingoTerm[];
  channels: ChannelData[];
  timeline: TimelineData[];
  suggestedLingo: string[];
  totalTermsAnalyzed: number;
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    disruptive: number;
  };
}
