
import { LingoTerm } from '@/types/lingo';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Star } from 'lucide-react';

interface OpportunityListProps {
  terms: LingoTerm[];
}

export const OpportunityList = ({ terms }: OpportunityListProps) => {
  const sortedTerms = [...terms].sort((a, b) => b.opportunityScore - a.opportunityScore);
  
  return (
    <div className="space-y-3">
      {sortedTerms.slice(0, 8).map((term) => (
        <div key={term.text} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white font-medium">{term.text}</span>
              <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300">
                <Star className="w-3 h-3 mr-1" />
                {term.opportunityScore}
              </Badge>
            </div>
            <div className="text-sm text-white/60">
              {term.frequency} mentions • {term.channels.join(', ')}
            </div>
          </div>
          {term.growth > 0 && (
            <div className="flex items-center gap-1 text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">+{term.growth}%</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
