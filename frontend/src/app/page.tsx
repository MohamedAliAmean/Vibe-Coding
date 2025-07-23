'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sectionsApi, SectionResponse } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  const [idea, setIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [sections, setSections] = useState<SectionResponse | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!idea.trim()) {
      setError('Please enter a website idea');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await sectionsApi.create({ idea: idea.trim() });
      setSections(response);
      
      // Redirect to preview page
      router.push(`/preview/${response.id}`);
    } catch (err: unknown) {
      console.error('API Error:', err);
      
      const error = err as { 
        response?: { status?: number }; 
        code?: string; 
        message?: string; 
      };
      
      if (error.response?.status === 404) {
        setError('API endpoint not found. Make sure the backend is running on the correct port.');
      } else if (error.response?.status && error.response.status >= 500) {
        setError('Server error. Please try again later.');
      } else if (error.code === 'ECONNREFUSED' || error.message?.includes('Network Error')) {
        setError('Cannot connect to server. Make sure the backend is running.');
      } else {
        setError('Failed to generate sections. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Website Section Generator
          </h1>
        </div>

        <div className="bg-white py-8 px-6 shadow rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="idea" className="block text-sm font-medium text-gray-700">
                Website Idea
              </label>
              <div className="mt-1">
                <input
                  id="idea"
                  name="idea"
                  type="text"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="e.g., Landing page for bakery"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  disabled={isLoading}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <LoadingSpinner /> : 'Generate Sections'}
              </button>
            </div>
          </form>

          {sections && (
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Generated Sections Preview
              </h2>
              <div className="space-y-2">
                {sections.sections.map((section, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 border border-blue-200 rounded-md px-4 py-2"
                  >
                    <span className="text-blue-800 font-medium">{section}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Idea: {sections.idea}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
