import React from 'react';
import { X, Loader2 } from 'lucide-react';

interface RecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  loading: boolean;
  recommendation: string | null;
}

export function RecommendationModal({
  isOpen,
  onClose,
  title,
  loading,
  recommendation,
}: RecommendationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
            </div>
          ) : recommendation ? (
            <div className="prose max-w-none">
              {recommendation.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-600">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No recommendation available.</p>
          )}
        </div>
      </div>
    </div>
  );
}