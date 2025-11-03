import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="max-w-md text-center space-y-6">
            <h1 className="text-2xl font-bold text-red-600">
              Oops! Something went wrong
            </h1>
            
            <p className="text-gray-600">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md text-left text-sm font-mono max-w-full overflow-auto">
                <p className="font-bold mb-2">Error Details:</p>
                <p>{this.state.error.message}</p>
                {this.state.error.stack && (
                  <p className="mt-2 text-xs text-gray-600">
                    {this.state.error.stack}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-3">
              <button 
                onClick={this.handleReload}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Refresh Page
              </button>
              <button 
                onClick={this.handleReset}
                className="w-full border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
