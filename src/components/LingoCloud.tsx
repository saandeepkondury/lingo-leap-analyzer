
import { LingoTerm } from '@/types/lingo';
import { Badge } from '@/components/ui/badge';

interface LingoCloudProps {
  terms: LingoTerm[];
}

const getCategoryColor = (category: LingoTerm['category']) => {
  switch (category) {
    case 'core_positioning': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    case 'product_category': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    case 'community_movement': return 'bg-green-500/20 text-green-300 border-green-500/30';
    case 'market_narrative': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
    default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  }
};

const getSentimentColor = (sentiment: LingoTerm['sentiment']) => {
  switch (sentiment) {
    case 'positive': return 'border-l-green-400';
    case 'disruptive': return 'border-l-red-400';
    default: return 'border-l-blue-400';
  }
};

export const LingoCloud = ({ terms }: LingoCloudProps) => {
  const sortedTerms = [...terms].sort((a, b) => b.frequency - a.frequency);
  
  return (
    <div className="space-y-4">
      {/* Top terms with larger display */}
      <div className="flex flex-wrap gap-3">
        {sortedTerms.slice(0, 10).map((term, index) => {
          const size = Math.max(12, 24 - index * 2);
          return (
            <div
              key={term.text}
              className={`p-3 rounded-lg border-l-4 ${getSentimentColor(term.sentiment)} ${getCategoryColor(term.category)} transition-all duration-200 hover:scale-105 cursor-pointer`}
              style={{ fontSize: `${size}px` }}
            >
              <div className="font-bold">{term.text}</div>
              <div className="text-xs opacity-70 mt-1">
                {term.frequency} mentions • {term.channels.join(', ')}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Smaller terms */}
      <div className="flex flex-wrap gap-2">
        {sortedTerms.slice(10).map((term) => (
          <Badge
            key={term.text}
            className={`${getCategoryColor(term.category)} cursor-pointer hover:scale-105 transition-transform`}
          >
            {term.text} ({term.frequency})
          </Badge>
        ))}
      </div>
    </div>
  );
};
