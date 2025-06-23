
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SuggestedLingoProps {
  suggestions: string[];
}

export const SuggestedLingo = ({ suggestions }: SuggestedLingoProps) => {
  const { toast } = useToast();
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeTextNode(text);
    toast({
      title: "Copied!",
      description: `"${text}" copied to clipboard`,
    });
  };
  
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-yellow-400 mb-4">
        <Lightbulb className="w-5 h-5" />
        <span className="font-medium">Recommended terms to own or popularize</span>
      </div>
      
      <div className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
            onClick={() => copyToClipboard(suggestion)}
          >
            <span className="text-white font-medium">{suggestion}</span>
            <Copy className="w-4 h-4 text-white/40 hover:text-white/80" />
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <p className="text-blue-300 text-sm">
          💡 These terms show high market potential but low current usage. 
          Consider incorporating them into your marketing, content, and positioning strategy.
        </p>
      </div>
    </div>
  );
};
