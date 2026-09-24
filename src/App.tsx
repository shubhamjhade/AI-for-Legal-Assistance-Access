import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Loader2 } from 'lucide-react';

// Lazy load pages for better bundle splitting and efficiency
const Home = lazy(() => import('./pages/Home'));
const Simplifier = lazy(() => import('./pages/Simplifier'));
const Comparator = lazy(() => import('./pages/Comparator'));
const RiskAnalyzer = lazy(() => import('./pages/RiskAnalyzer'));
const ConsultPrep = lazy(() => import('./pages/ConsultPrep'));

/**
 * Loading fallback for Suspense boundary
 */
const PageLoader = () => (
  <div className="flex justify-center items-center h-64" aria-label="Loading page">
    <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
  </div>
);

/**
 * Main Application Component.
 */
function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/simplify" element={<Simplifier />} />
            <Route path="/compare" element={<Comparator />} />
            <Route path="/analyze" element={<RiskAnalyzer />} />
            <Route path="/prep" element={<ConsultPrep />} />
          </Routes>
        </Suspense>
      </main>
      <footer className="bg-slate-900 text-slate-300 py-8 text-center mt-auto">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-sm font-medium mb-2">
            Disclaimer: LegalEase AI provides AI-generated insights and does not constitute professional legal advice. 
          </p>
          <p className="text-xs text-slate-400">
            Always consult a qualified attorney for legal matters. We do not store your documents on our servers.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
