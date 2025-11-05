import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error(" Application Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
          <img src="/icons/icon-192x192.png" alt="LocalGovTZ" className="w-24 h-24 mb-4" />
          <h1 className="text-2xl font-semibold text-green-700 mb-2">Something went wrong</h1>
          <p className="text-gray-600 mb-4">
            Please refresh the page or try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Reload App
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
