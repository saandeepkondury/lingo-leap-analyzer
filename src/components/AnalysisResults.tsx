
import { LingoData } from '@/types/lingo';
import { LingoCloud } from './LingoCloud';
import { ChannelBreakdown } from './ChannelBreakdown';
import { TimelineChart } from './TimelineChart';
import { SentimentChart } from './SentimentChart';
import { OpportunityList } from './OpportunityList';
import { SuggestedLingo } from './SuggestedLingo';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Calendar, MessageSquare, Target } from 'lucide-react';

interface AnalysisResultsProps {
  data: LingoData;
}

export const AnalysisResults = ({ data }: AnalysisResultsProps) => {
  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-2xl font-bold text-white">{data.totalTermsAnalyzed}</p>
              <p className="text-white/70">Terms Analyzed</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-2xl font-bold text-white">{data.channels.length}</p>
              <p className="text-white/70">Channels</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-2xl font-bold text-white">{data.terms.filter(t => t.growth > 0).length}</p>
              <p className="text-white/70">Growing Terms</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-yellow-400" />
            <div>
              <p className="text-2xl font-bold text-white">{data.suggestedLingo.length}</p>
              <p className="text-white/70">Opportunities</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Company Info */}
      <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">{data.companyName}</h2>
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
            Analyzed {new Date(data.analysisDate).toLocaleDateString()}
          </Badge>
        </div>
        <p className="text-white/70">{data.companyUrl}</p>
      </Card>

      {/* Lingo Cloud */}
      <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
        <h3 className="text-xl font-bold text-white mb-4">Lingo Cloud</h3>
        <LingoCloud terms={data.terms} />
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Channel Breakdown</h3>
          <ChannelBreakdown channels={data.channels} />
        </Card>
        
        <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Sentiment Analysis</h3>
          <SentimentChart sentiment={data.sentimentBreakdown} />
        </Card>
      </div>

      {/* Timeline */}
      <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
        <h3 className="text-xl font-bold text-white mb-4">Lingo Timeline</h3>
        <TimelineChart timeline={data.timeline} />
      </Card>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">High Opportunity Terms</h3>
          <OpportunityList terms={data.terms.filter(t => t.opportunityScore > 70)} />
        </Card>
        
        <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Suggested Lingo to Own</h3>
          <SuggestedLingo suggestions={data.suggestedLingo} />
        </Card>
      </div>
    </div>
  );
};
