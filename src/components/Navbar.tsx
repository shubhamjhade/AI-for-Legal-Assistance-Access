import { Link } from 'react-router-dom';
import { Scale, Settings, ShieldAlert, FileText, CheckSquare } from 'lucide-react';
import { useState } from 'react';
import SettingsModal from './SettingsModal';

export default function Navbar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 text-indigo-600">
              <Scale className="h-8 w-8" />
              <span className="font-bold text-xl tracking-tight">LegalEase AI</span>
            </Link>
            
            <div className="hidden md:flex space-x-6">
              <Link to="/simplify" className="text-slate-600 hover:text-indigo-600 flex items-center space-x-1">
                <FileText className="h-4 w-4" />
                <span>Simplify</span>
              </Link>
              <Link to="/compare" className="text-slate-600 hover:text-indigo-600 flex items-center space-x-1">
                <CheckSquare className="h-4 w-4" />
                <span>Compare</span>
              </Link>
              <Link to="/analyze" className="text-slate-600 hover:text-indigo-600 flex items-center space-x-1">
                <ShieldAlert className="h-4 w-4" />
                <span>Risk Analysis</span>
              </Link>
            </div>
          </div>
          
          <div>
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </nav>
  );
}
