import ReactMarkdown from 'react-markdown';
import { Loader2 } from 'lucide-react';

interface ResultDisplayProps {
  isLoading: boolean;
  result: string | null;
  error: string | null;
}

export default function ResultDisplay({ isLoading, result, error }: ResultDisplayProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-4" />
        <p>Analyzing legal text...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">
        <p className="font-semibold">Error analyzing document</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="prose prose-slate max-w-none bg-white p-8 rounded-xl shadow-sm border border-slate-200">
      <ReactMarkdown>{result}</ReactMarkdown>
    </div>
  );
}
