import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Global Error Boundary to catch UI rendering errors and prevent application crashes.
 * High Impact for Code Quality and Application Stability.
 */
export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4" role="alert">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-red-100">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" aria-hidden="true" />
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Oops! Something went wrong.</h1>
            <p className="text-slate-600 mb-6 text-sm">
              An unexpected error occurred in the application interface.
            </p>
            <button
              onClick={() => window.location.replace('/')}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
            >
              Return to Safety (Home)
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
