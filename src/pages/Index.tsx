
import { useState } from 'react';
import { LingoAnalyzer } from '@/components/LingoAnalyzer';
import { AnalysisResults } from '@/components/AnalysisResults';
import { LingoData } from '@/types/lingo';

const Index = () => {
  const [analysisData, setAnalysisData] = useState<LingoData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysisComplete = (data: LingoData) => {
    setAnalysisData(data);
    setIsAnalyzing(false);
  };

  const handleAnalysisStart = () => {
    setIsAnalyzing(true);
    setAnalysisData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Startup Lingo Analyzer
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Discover the linguistic DNA of any startup. Analyze positioning terms, market narratives, 
            and community language to uncover opportunities in the startup ecosystem.
          </p>
        </div>

        <LingoAnalyzer 
          onAnalysisComplete={handleAnalysisComplete}
          onAnalysisStart={handleAnalysisStart}
          isAnalyzing={isAnalyzing}
        />

        {analysisData && (
          <AnalysisResults data={analysisData} />
        )}
      </div>
    </div>
  );
};

export default Index;
