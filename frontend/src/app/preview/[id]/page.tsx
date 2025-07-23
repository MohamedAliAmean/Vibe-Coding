'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { sectionsApi, SectionResponse } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function PreviewPage() {
  const params = useParams();
  const router = useRouter();
  const [sections, setSections] = useState<SectionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSections = async () => {
      if (!params.id || typeof params.id !== 'string') {
        setError('Invalid section ID');
        setIsLoading(false);
        return;
      }

      try {
        const response = await sectionsApi.getById(params.id);
        setSections(response);
      } catch (err) {
        setError('Failed to load sections. Please try again.');
        console.error('API Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSections();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">Loading sections...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">{error}</div>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!sections) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 mb-4">No sections found</div>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mb-4"
          >
            ← Back to Generator
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            Website Sections Preview
          </h1>
          <p className="mt-2 text-gray-600">
            Generated for: <span className="font-medium">{sections.idea}</span>
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Recommended Sections
          </h2>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sections.sections.map((section, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-blue-900">
                    {section}
                  </h3>
                  <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    #{index + 1}
                  </span>
                </div>
                <p className="mt-2 text-sm text-blue-700">
                  Section for your {sections.idea.toLowerCase()}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">
              <p><strong>Created:</strong> {new Date(sections.createdAt).toLocaleString()}</p>
              <p><strong>Section ID:</strong> {sections.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}