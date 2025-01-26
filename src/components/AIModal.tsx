'use client';

import { AiData } from '@/types';
import { format, parseISO } from 'date-fns';

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
  aiData: AiData | null;
  reservationId: string;
}

export default function AIModal({ isOpen, onClose, aiData, reservationId }: AIModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              AI Insights for Reservation #{reservationId}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {aiData ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Summary</h3>
                <p className="text-gray-600">{aiData.summary}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Comments</h3>
                <ul className="space-y-2">
                  {aiData.aiComments.map((comment, index) => (
                    <li key={index} className="text-gray-600">• {comment}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Suggestions</h3>
                <ul className="space-y-2">
                  {aiData.aiSuggestions.map((suggestion, index) => (
                    <li key={index} className="text-gray-600">• {suggestion}</li>
                  ))}
                </ul>
              </div>

              <div className="text-sm text-gray-500 mt-4">
                Generated at: {format(parseISO(aiData.generatedAt), 'PPp')}
              </div>
            </div>
          ) : (
            <div className="text-gray-500">No AI data available for this reservation.</div>
          )}
        </div>
      </div>
    </div>
  );
} 