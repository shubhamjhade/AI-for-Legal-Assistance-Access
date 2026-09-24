import { useState, useEffect, useRef } from 'react';
import { X, Key, Trash2 } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Settings Modal for securely managing the API key entirely on the client side.
 * Accessible with focus management and ARIA roles.
 */
export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [apiKey, setApiKey] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem('gemini_api_key');
      if (saved) setApiKey(saved);
      
      // Focus modal on open for accessibility
      modalRef.current?.focus();
    }
  }, [isOpen]);

  // Handle Escape key for Accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
    }
    onClose();
  };

  const handleClear = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    // No need to auto-close, let user see it's cleared
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        ref={modalRef}
        tabIndex={-1}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden outline-none ring-4 ring-indigo-500/20"
      >
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 id="modal-title" className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Key className="w-5 h-5 text-indigo-600" aria-hidden="true" />
            Security & API Settings
          </h2>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1 transition-colors"
            aria-label="Close settings"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <label htmlFor="api-key-input" className="block text-sm font-semibold text-slate-700 mb-2">
              Google Gemini API Key
            </label>
            <input 
              id="api-key-input"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-mono text-sm"
              aria-describedby="api-key-desc"
            />
            <p id="api-key-desc" className="text-sm text-slate-500 mt-3 leading-relaxed">
              <strong>Privacy First:</strong> Your key is stored locally in your browser's <code>localStorage</code> and is <em>never</em> sent to our servers.
            </p>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={handleClear}
              className="flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2.5 rounded-lg hover:bg-red-100 transition-colors font-medium border border-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              aria-label="Clear API Key"
            >
              <Trash2 className="w-4 h-4" aria-hidden="true" />
              Clear
            </button>
            <button 
              onClick={handleSave}
              className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Securely
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
