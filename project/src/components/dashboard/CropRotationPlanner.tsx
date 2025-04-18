import React, { useState } from 'react';
import { Sprout, ArrowRight, Loader2 } from 'lucide-react';
import { DashboardCard } from '../DashboardCard';
import { RecommendationModal } from '../RecommendationModal';
import { getAIRecommendation, generatePrompts } from '../../services/huggingface';
import type { UserProfile } from '../../types';

interface CropRotationPlannerProps {
  farmDetails: UserProfile['farmDetails'];
}

export function CropRotationPlanner({ farmDetails }: CropRotationPlannerProps) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const handleViewPlan = async () => {
    setLoading(true);
    setShowModal(true);
    try {
      const prompt = generatePrompts.cropRotation(farmDetails.acres, farmDetails.soilType);
      const result = await getAIRecommendation(prompt);
      setRecommendation(result);
    } catch (error) {
      console.error('Failed to get crop rotation plan:', error);
      setRecommendation('Failed to generate recommendations. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DashboardCard 
        title="Crop Rotation Planner"
        className="bg-gradient-to-br from-green-50 to-green-100"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <Sprout className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Current Season Plan</h3>
              <p className="text-sm text-gray-600">Optimize your crop rotation</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white rounded-xl p-4">
              <h4 className="font-medium text-gray-700 mb-2">Recommended Rotation</h4>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Wheat</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Legumes</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Cotton</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4">
              <h4 className="font-medium text-gray-700 mb-2">Benefits</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Improved soil fertility</li>
                <li>• Reduced pest pressure</li>
                <li>• Better yield potential</li>
              </ul>
            </div>
          </div>

          <button
            onClick={handleViewPlan}
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>View Detailed Plan</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </DashboardCard>

      <RecommendationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Detailed Crop Rotation Plan"
        loading={loading}
        recommendation={recommendation}
      />
    </>
  );
}