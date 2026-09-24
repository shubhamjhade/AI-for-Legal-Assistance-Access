import { Link } from 'react-router-dom';
import { Scale, Settings, ShieldAlert, FileText, CheckSquare, Briefcase } from 'lucide-react';
import { useState } from 'react';
import SettingsModal from './SettingsModal';

/**
 * Navbar Component.
 * Contains main navigation links and settings access.
 */
export default function Navbar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200" aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1">
              <Scale className="h-8 w-8" aria-hidden="true" />
              <span className="font-bold text-xl tracking-tight">LegalEase AI</span>
            </Link>
            
            <div className="hidden lg:flex space-x-6">
              <Link to="/simplify" className="text-slate-600 hover:text-indigo-600 flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md p-1">
                <FileText className="h-4 w-4" aria-hidden="true" />
                <span>Simplify</span>
              </Link>
              <Link to="/compare" className="text-slate-600 hover:text-indigo-600 flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md p-1">
                <CheckSquare className="h-4 w-4" aria-hidden="true" />
                <span>Compare</span>
              </Link>
              <Link to="/analyze" className="text-slate-600 hover:text-indigo-600 flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md p-1">
                <ShieldAlert className="h-4 w-4" aria-hidden="true" />
                <span>Risk Analysis</span>
              </Link>
              <Link to="/prep" className="text-slate-600 hover:text-indigo-600 flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md p-1">
                <Briefcase className="h-4 w-4" aria-hidden="true" />
                <span>Consult Prep</span>
              </Link>
            </div>
          </div>
          
          <div>
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Open API Settings"
              aria-expanded={isSettingsOpen}
            >
              <Settings className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </nav>
  );
}
