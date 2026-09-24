import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Simplifier from './pages/Simplifier';
import Comparator from './pages/Comparator';
import RiskAnalyzer from './pages/RiskAnalyzer';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simplify" element={<Simplifier />} />
          <Route path="/compare" element={<Comparator />} />
          <Route path="/analyze" element={<RiskAnalyzer />} />
        </Routes>
      </main>
      <footer className="bg-slate-900 text-slate-300 py-8 text-center mt-auto">
        <p className="text-sm">
          Disclaimer: This tool provides AI-generated insights and does not constitute professional legal advice. 
          Always consult a qualified attorney for legal matters.
        </p>
      </footer>
    </div>
  );
}

export default App;
