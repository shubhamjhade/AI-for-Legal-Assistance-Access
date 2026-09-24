import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import { Loader2, AlertCircle } from 'lucide-react';

interface ResultDisplayProps {
  isLoading: boolean;
  result: string | null;
  error: string | null;
}

/**
 * ResultDisplay component (Memoized for efficiency).
 * Renders markdown safely using rehypeSanitize to prevent XSS (Security).
 * Includes ARIA roles for screen readers (Accessibility).
 */
const ResultDisplay = memo(({ isLoading, result, error }: ResultDisplayProps) => {
  if (isLoading) {
    return (
      <div 
        className="flex flex-col items-center justify-center p-12 text-slate-500"
        role="status" 
        aria-busy="true"
        aria-label="Analyzing document"
      >
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-4" />
        <p className="font-medium">Analyzing legal text...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200 flex items-start gap-3"
        role="alert"
      >
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">Error analyzing document</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div 
      className="prose prose-slate max-w-none bg-white p-8 rounded-xl shadow-sm border border-slate-200"
      role="region"
      aria-label="Analysis Result"
      tabIndex={0}
    >
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 not-prose rounded-r-lg">
        <p className="text-sm text-blue-800 m-0 font-medium">
          <strong>Disclaimer:</strong> The insights below are AI-generated for informational purposes only and do not constitute professional legal advice.
        </p>
      </div>
      <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
        {result}
      </ReactMarkdown>
    </div>
  );
});

ResultDisplay.displayName = 'ResultDisplay';

export default ResultDisplay;
