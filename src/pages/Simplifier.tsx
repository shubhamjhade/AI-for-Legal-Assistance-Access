import { useState } from 'react';
import { generateLegalResponse } from '../lib/gemini';
import ResultDisplay from '../components/ResultDisplay';

export default function Simplifier() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSimplify = async () => {
    if (!text.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const prompt = `Please simplify the following legal text into plain English that an average person without legal training can understand. Avoid complex legalese, maintain the original meaning, and organize it with bullet points if helpful.\n\nLegal Text:\n${text}`;
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
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Document Simplifier</h1>
        <p className="text-slate-600">Paste complex legal clauses below, and our AI will translate them into plain English.</p>
      </div>
      
      <div className="grid gap-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your legal text here (e.g., terms of service, lease agreement clause...)"
            className="w-full h-64 p-4 border-none focus:ring-0 resize-none text-slate-700 placeholder-slate-400 bg-transparent"
          />
          <div className="flex justify-between items-center mt-4 border-t border-slate-100 pt-4">
            <span className="text-xs text-slate-400">Do not enter sensitive personal information.</span>
            <button 
              onClick={handleSimplify}
              disabled={isLoading || !text.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              Simplify Text
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
