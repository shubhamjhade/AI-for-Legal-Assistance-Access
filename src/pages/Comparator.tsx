import { useState } from 'react';
import { generateLegalResponse } from '../lib/gemini';
import ResultDisplay from '../components/ResultDisplay';
import { CheckSquare } from 'lucide-react';

export default function Comparator() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async () => {
    if (!text1.trim() || !text2.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const prompt = `Compare the following two legal texts. Identify and summarize:
1. **Material Differences:** What are the key substantive changes between Version 1 and Version 2?
2. **New Obligations/Risks:** What new duties or risks have been introduced in Version 2?
3. **Removed Clauses:** What significant protections or terms from Version 1 are missing in Version 2?

**Version 1:**\n${text1}\n\n**Version 2:**\n${text2}`;
      const response = await generateLegalResponse(prompt);
      setResult(response);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
          Contract Comparator <CheckSquare className="text-green-500" />
        </h1>
        <p className="text-slate-600">Compare two versions of a document to easily spot changes and inconsistencies.</p>
      </div>
      
      <div className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col h-[400px]">
            <h3 className="font-semibold text-slate-700 mb-2 px-2">Original Document (Version 1)</h3>
            <textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="Paste the original document here..."
              className="flex-1 w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none text-slate-700 placeholder-slate-400"
            />
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col h-[400px]">
            <h3 className="font-semibold text-slate-700 mb-2 px-2">Updated Document (Version 2)</h3>
            <textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="Paste the updated document here..."
              className="flex-1 w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none text-slate-700 placeholder-slate-400"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button 
            onClick={handleCompare}
            disabled={isLoading || !text1.trim() || !text2.trim()}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-sm transition-all disabled:opacity-50"
          >
            Compare Documents
          </button>
        </div>

        {(isLoading || result || error) && (
          <ResultDisplay isLoading={isLoading} result={result} error={error} />
        )}
      </div>
    </div>
  );
}
