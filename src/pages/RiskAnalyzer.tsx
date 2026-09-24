import { useState, useCallback } from 'react';
import { useGenAI } from '../hooks/useGenAI';
import ResultDisplay from '../components/ResultDisplay';
import { ShieldAlert } from 'lucide-react';

/**
 * Risk Analyzer Page Component.
 * Identifies risks and obligations in contracts.
 */
export default function RiskAnalyzer() {
  const [text, setText] = useState('');
  const { result, isLoading, error, execute } = useGenAI();

  const handleAnalyze = useCallback(() => {
    const prompt = `Analyze the following legal text and identify:
1. **Key Obligations:** What are the main duties required by the parties involved?
2. **Potential Risks:** Are there any clauses that seem heavily one-sided, unusual, or potentially risky for an average consumer/user?
3. **Hidden Fees/Penalties:** Are there any financial risks or penalties mentioned?

Structure your response clearly with headings and bullet points. End with a "Recommended Next Steps" section.`;
    execute(prompt, [text]);
  }, [text, execute]);

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
          Risk Analyzer <ShieldAlert className="text-amber-500" aria-hidden="true" />
        </h1>
        <p className="text-slate-600">Spot potential red flags, hidden obligations, and risks in contracts and policies.</p>
      </header>
      
      <main className="grid gap-6">
        <section className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <label htmlFor="risk-text" className="sr-only">Contract or Policy Text</label>
          <textarea
            id="risk-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your contract, EULA, or policy here..."
            className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none resize-none text-slate-700 placeholder-slate-400 bg-slate-50 transition-shadow"
            aria-label="Contract or Policy Text"
          />
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 border-t border-slate-100 pt-4 gap-4">
            <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full font-medium">
              Review our terms before proceeding.
            </span>
            <button 
              onClick={handleAnalyze}
              disabled={isLoading || !text.trim()}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              aria-busy={isLoading}
            >
              Analyze Risks
            </button>
          </div>
        </section>

        <ResultDisplay isLoading={isLoading} result={result} error={error} />
      </main>
    </div>
  );
}
