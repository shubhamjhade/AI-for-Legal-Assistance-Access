import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

/**
 * Entry point of the application.
 * Wrapped in StrictMode and ErrorBoundary for high code quality and resilience.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        {/* Skip Link for Keyboard Accessibility (a11y) */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-indigo-600 focus:font-bold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          Skip to main content
        </a>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
