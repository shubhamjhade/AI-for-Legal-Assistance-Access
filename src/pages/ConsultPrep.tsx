import { useState, useCallback } from 'react';
import { useGenAI } from '../hooks/useGenAI';
import ResultDisplay from '../components/ResultDisplay';
import { Briefcase } from 'lucide-react';

/**
 * ConsultPrep Page Component.
 * Helps users generate targeted questions and summaries for a lawyer consultation.
 */
export default function ConsultPrep() {
  const [text, setText] = useState('');
  const { result, isLoading, error, execute } = useGenAI();

  const handlePrep = useCallback(() => {
    const prompt = `Based on the following legal document or situation, generate a "Consultation Prep Sheet" to help me prepare for a meeting with a lawyer. 
Include:
1. **Executive Summary:** A 2-3 sentence brief of what this document is about.
2. **Top 5 Critical Questions to Ask the Lawyer:** The most important, strategic questions I should ask my attorney regarding this text.
3. **Information to Gather:** What other documents, facts, or evidence should I bring to the consultation?`;
    execute(prompt, [text]);
  }, [text, execute]);

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
          Lawyer Consultation Prep <Briefcase className="text-blue-600" aria-hidden="true" />
        </h1>
        <p className="text-slate-600">Prepare smartly for your legal consultation by generating summaries and targeted questions.</p>
      </header>
      
      <main className="grid gap-6">
        <section className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <label htmlFor="prep-text" className="sr-only">Situation or Legal Document</label>
          <textarea
            id="prep-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your legal document or describe your situation here..."
            className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none resize-none text-slate-700 placeholder-slate-400 bg-slate-50 transition-shadow"
            aria-label="Situation or Legal Document"
          />
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 border-t border-slate-100 pt-4 gap-4">
            <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full font-medium">
              Saves you billable hours by being prepared.
            </span>
            <button 
              onClick={handlePrep}
              disabled={isLoading || !text.trim()}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              aria-busy={isLoading}
            >
              Generate Prep Sheet
            </button>
          </div>
        </section>

        <ResultDisplay isLoading={isLoading} result={result} error={error} />
      </main>
    </div>
  );
}
