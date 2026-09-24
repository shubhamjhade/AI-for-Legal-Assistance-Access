import { useState } from 'react';
import { generateLegalResponse } from '../lib/gemini';
import ResultDisplay from '../components/ResultDisplay';
import { ShieldAlert } from 'lucide-react';

export default function RiskAnalyzer() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const prompt = `Analyze the following legal text and identify:
1. **Key Obligations:** What are the main duties required by the parties involved?
2. **Potential Risks:** Are there any clauses that seem heavily one-sided, unusual, or potentially risky for an average consumer/user?
3. **Hidden Fees/Penalties:** Are there any financial risks or penalties mentioned?

Structure your response clearly with headings and bullet points. Remember this is for informational purposes only.

Legal Text:\n${text}`;
      const response = await generateLegalResponse(prompt);
      setResult(response);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
          Risk Analyzer <ShieldAlert className="text-amber-500" />
        </h1>
        <p className="text-slate-600">Spot potential red flags, hidden obligations, and risks in contracts and policies.</p>
      </div>
      
      <div className="grid gap-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your contract, EULA, or policy here..."
            className="w-full h-64 p-4 border-none focus:ring-0 resize-none text-slate-700 placeholder-slate-400 bg-transparent"
          />
          <div className="flex justify-end mt-4 border-t border-slate-100 pt-4">
            <button 
              onClick={handleAnalyze}
              disabled={isLoading || !text.trim()}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              Analyze Risks
            </button>
          </div>
        </div>

        {(isLoading || result || error) && (
          <ResultDisplay isLoading={isLoading} result={result} error={error} />
        )}
      </div>
    </div>
  );
}
