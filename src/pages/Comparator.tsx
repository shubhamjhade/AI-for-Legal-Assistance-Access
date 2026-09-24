import { useState, useCallback } from 'react';
import { useGenAI } from '../hooks/useGenAI';
import ResultDisplay from '../components/ResultDisplay';
import { CheckSquare } from 'lucide-react';

/**
 * Comparator Page Component.
 * Compares two versions of a document to find differences.
 */
export default function Comparator() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const { result, isLoading, error, execute } = useGenAI();

  const handleCompare = useCallback(() => {
    const prompt = `Compare the following two legal texts. Identify and summarize:
1. **Material Differences:** What are the key substantive changes between Version 1 and Version 2?
2. **New Obligations/Risks:** What new duties or risks have been introduced in Version 2?
3. **Removed Clauses:** What significant protections or terms from Version 1 are missing in Version 2?

Format the output clearly using headings.`;
    execute(prompt, [text1, text2]);
  }, [text1, text2, execute]);

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
          Contract Comparator <CheckSquare className="text-green-500" aria-hidden="true" />
        </h1>
        <p className="text-slate-600">Compare two versions of a document to easily spot changes and inconsistencies.</p>
      </header>
      
      <main className="grid gap-6">
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col h-[400px]">
            <label htmlFor="doc-version-1" className="font-semibold text-slate-700 mb-2 px-2 block">
              Original Document (Version 1)
            </label>
            <textarea
              id="doc-version-1"
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="Paste the original document here..."
              className="flex-1 w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none text-slate-700 placeholder-slate-400 bg-slate-50"
            />
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col h-[400px]">
            <label htmlFor="doc-version-2" className="font-semibold text-slate-700 mb-2 px-2 block">
              Updated Document (Version 2)
            </label>
            <textarea
              id="doc-version-2"
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="Paste the updated document here..."
              className="flex-1 w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none text-slate-700 placeholder-slate-400 bg-slate-50"
            />
          </div>
        </section>

        <div className="flex justify-center">
          <button 
            onClick={handleCompare}
            disabled={isLoading || !text1.trim() || !text2.trim()}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-sm transition-all disabled:opacity-50 focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            aria-busy={isLoading}
          >
            Compare Documents
          </button>
        </div>

        <ResultDisplay isLoading={isLoading} result={result} error={error} />
      </main>
    </div>
  );
}
