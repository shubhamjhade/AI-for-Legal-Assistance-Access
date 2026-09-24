import { useState, useCallback } from 'react';
import { useGenAI } from '../hooks/useGenAI';
import ResultDisplay from '../components/ResultDisplay';

/**
 * Simplifier Page Component.
 * Translates legalese into plain English.
 */
export default function Simplifier() {
  const [text, setText] = useState('');
  const { result, isLoading, error, execute } = useGenAI();

  const handleSimplify = useCallback(() => {
    const prompt = `Please simplify the following legal text into plain English that an average person without legal training can understand. 
Avoid complex legalese, maintain the original meaning, and organize it with bullet points if helpful.`;
    execute(prompt, [text]);
  }, [text, execute]);

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Document Simplifier</h1>
        <p className="text-slate-600">Paste complex legal clauses below, and our AI will translate them into plain English.</p>
      </header>
      
      <main className="grid gap-6">
        <section className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <label htmlFor="legal-text" className="sr-only">Legal Text to Simplify</label>
          <textarea
            id="legal-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your legal text here (e.g., terms of service, lease agreement clause...)"
            className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none text-slate-700 placeholder-slate-400 bg-slate-50 transition-shadow"
            aria-label="Legal Text to Simplify"
          />
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 border-t border-slate-100 pt-4 gap-4">
            <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full font-medium">
              Do not enter sensitive personal information.
            </span>
            <button 
              onClick={handleSimplify}
              disabled={isLoading || !text.trim()}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-busy={isLoading}
            >
              Simplify Text
            </button>
          </div>
        </section>

        <ResultDisplay isLoading={isLoading} result={result} error={error} />
      </main>
    </div>
  );
}
