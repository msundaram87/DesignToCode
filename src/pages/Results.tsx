import { useState } from 'react';
import { Link } from 'react-router-dom';

const Results = () => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);

  const sampleCode = `import React from 'react';

const GeneratedComponent = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to Your Generated Component
      </h1>
      <p className="text-lg text-gray-600">
        This is a sample of AI-generated React code from your design.
      </p>
      <button className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
        Get Started
      </button>
    </div>
  );
};

export default GeneratedComponent;`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([sampleCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'GeneratedComponent.tsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">DC</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Design to Code</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Back to Dashboard</Link>
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">New Project</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Generated Code</h1>
          <p className="text-gray-600">Review, edit, and download your AI-generated React component</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={handleCopy}
            className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            {copied ? (
              <>
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy Code</span>
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download</span>
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span>Share</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                  activeTab === 'preview'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                  activeTab === 'code'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Code
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'preview' ? (
              <div className="bg-gray-50 rounded-lg p-8 min-h-[500px] border border-gray-200">
                <div className="bg-white rounded-lg p-8 shadow-sm">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Welcome to Your Generated Component
                  </h1>
                  <p className="text-lg text-gray-600 mb-6">
                    This is a sample of AI-generated React code from your design.
                  </p>
                  <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
                    Get Started
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
                  <code className="text-sm">{sampleCode}</code>
                </pre>
                <button
                  onClick={handleCopy}
                  className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm flex items-center space-x-1"
                >
                  {copied ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Lines of Code</div>
            <div className="text-3xl font-bold text-gray-900">247</div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Components</div>
            <div className="text-3xl font-bold text-gray-900">12</div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Time Saved</div>
            <div className="text-3xl font-bold text-gray-900">4.5 hrs</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;