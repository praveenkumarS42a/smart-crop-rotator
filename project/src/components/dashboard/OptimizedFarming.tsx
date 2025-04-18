import React, { useState } from 'react';
import { BarChart3, Target, Loader2 } from 'lucide-react';
import { DashboardCard } from '../DashboardCard';
import { RecommendationModal } from '../RecommendationModal';
import { getAIRecommendation, generatePrompts } from '../../services/huggingface';
import type { UserProfile } from '../../types';

interface OptimizedFarmingProps {
  farmDetails: UserProfile['farmDetails'];
}

export function OptimizedFarming({ farmDetails }: OptimizedFarmingProps) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const handleViewPlan = async () => {
    setLoading(true);
    setShowModal(true);
    try {
      const prompt = generatePrompts.optimizedPlan(
        farmDetails.acres,
        farmDetails.soilType
      );
      const result = await getAIRecommendation(prompt);
      setRecommendation(result);
    } catch (error) {
      console.error('Failed to get optimization plan:', error);
      setRecommendation('Failed to generate recommendations. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DashboardCard 
        title="Optimized Farming"
        className="bg-gradient-to-br from-blue-50 to-blue-100"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Area Optimization</h3>
              <p className="text-sm text-gray-600">Make the most of your {farmDetails.acres} acres</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-3">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium text-gray-700">Current Efficiency</h4>
              </div>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      75% Optimized
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                  <div className="w-3/4 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4">
              <h4 className="font-medium text-gray-700 mb-2">Recommendations</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Implement intercropping</li>
                <li>• Optimize plot divisions</li>
                <li>• Utilize border areas</li>
              </ul>
            </div>
          </div>

          <button
            onClick={handleViewPlan}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "View Optimization Plan"
            )}
          </button>
        </div>
      </DashboardCard>

      <RecommendationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Optimization Plan"
        loading={loading}
        recommendation={recommendation}
      />
    </>
  );
}