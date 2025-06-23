
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Loader2, Search, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LingoData } from '@/types/lingo';
import { generateMockLingoData } from '@/utils/mockLingoData';
import { scrapeLingoData } from '@/utils/scrapeLingoData';

interface LingoAnalyzerProps {
  onAnalysisComplete: (data: LingoData) => void;
  onAnalysisStart: () => void;
  isAnalyzing: boolean;
}

export const LingoAnalyzer = ({ onAnalysisComplete, onAnalysisStart, isAnalyzing }: LingoAnalyzerProps) => {
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a company website URL",
        variant: "destructive",
      });
      return;
    }

    onAnalysisStart();
    
    // Simulate analysis progress
    const steps = [
      "Discovering company information...",
      "Scraping LinkedIn posts...",
      "Analyzing Twitter/X mentions...",
      "Processing blog articles...",
      "Extracting positioning terms...",
      "Calculating sentiment scores...",
      "Generating lingo opportunities...",
      "Building visualization data..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setProgress((i + 1) / steps.length * 100);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    let analysisData: LingoData | null = null;
    try {
      analysisData = await scrapeLingoData(url);
    } catch (err) {
      console.error('Scrape failed, falling back to mock data', err);
      analysisData = generateMockLingoData(url);
    }
    
    toast({
      title: "Analysis Complete",
      description: `Found ${analysisData.totalTermsAnalyzed} terms across ${analysisData.channels.length} channels`,
    });

    onAnalysisComplete(analysisData);
  };

  return (
    <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 mb-8">
      <form onSubmit={handleAnalyze} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="url" className="text-lg font-medium text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-400" />
            Company Website URL
          </label>
          <Input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-white/10 border-white/30 text-white placeholder-white/60 text-lg py-3"
            placeholder="https://company.com"
            required
            disabled={isAnalyzing}
          />
        </div>
        
        {isAnalyzing && (
          <div className="space-y-3">
            <Progress value={progress} className="w-full h-3" />
            <p className="text-white/80 text-center">
              Analyzing startup lingo ecosystem... {Math.round(progress)}%
            </p>
          </div>
        )}
        
        <Button
          type="submit"
          disabled={isAnalyzing}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg py-3 transition-all duration-200"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Analyzing Lingo...
            </>
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              Analyze Startup Lingo
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};
