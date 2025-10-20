import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleGenerate = () => {
    if (selectedFile) {
      navigate('/results');
    }
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
              <button className="text-gray-600 hover:text-gray-900">My Projects</button>
              <button className="text-gray-600 hover:text-gray-900">Settings</button>
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 font-semibold">U</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Your Design</h1>
          <p className="text-gray-600">Drop your Figma file or PDF mockup to get started</p>
        </div>

        {/* Upload Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onSubmit={(e) => e.preventDefault()}
            >
              <div
                className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
                  dragActive
                    ? 'border-indigo-600 bg-indigo-50'
                    : selectedFile
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 bg-white hover:border-indigo-400'
                }`}
              >
                <input
                  type="file"
                  onChange={handleChange}
                  accept=".fig,.pdf,.png,.jpg,.jpeg"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {!selectedFile ? (
                  <>
                    <div className="w-20 h-20 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {dragActive ? 'Drop your file here' : 'Drag & drop your file'}
                    </h3>
                    <p className="text-gray-600 mb-4">or click to browse</p>
                    <p className="text-sm text-gray-500">
                      Supports: Figma (.fig), PDF, PNG, JPG
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {selectedFile.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      Remove file
                    </button>
                  </>
                )}
              </div>
            </form>

            {selectedFile && (
              <button
                onClick={handleGenerate}
                className="mt-6 w-full bg-indigo-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg"
              >
                Generate React Code →
              </button>
            )}
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">How it works</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-indigo-600 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Upload Design</p>
                    <p className="text-xs text-gray-600">Drop your Figma or PDF file</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-indigo-600 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">AI Processing</p>
                    <p className="text-xs text-gray-600">Our AI analyzes your design</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-indigo-600 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Get Code</p>
                    <p className="text-xs text-gray-600">Download production-ready code</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Pro Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Use clear, organized layers in Figma
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Name your components meaningfully
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Higher resolution = better results
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;