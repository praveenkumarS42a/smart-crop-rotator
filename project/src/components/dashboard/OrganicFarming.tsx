import React, { useState } from 'react';
import { Leaf, ShieldCheck, Loader2 } from 'lucide-react';
import { DashboardCard } from '../DashboardCard';
import { RecommendationModal } from '../RecommendationModal';
import { getAIRecommendation, generatePrompts } from '../../services/huggingface';
import type { UserProfile } from '../../types';

interface OrganicFarmingProps {
  farmDetails: UserProfile['farmDetails'];
}

export function OrganicFarming({ farmDetails }: OrganicFarmingProps) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const handleGetRecommendations = async () => {
    setLoading(true);
    setShowModal(true);
    try {
      const prompt = generatePrompts.organicRecommendations(
        farmDetails.farmingType,
        farmDetails.soilType
      );
      const result = await getAIRecommendation(prompt);
      setRecommendation(result);
    } catch (error) {
      console.error('Failed to get organic farming recommendations:', error);
      setRecommendation('Failed to generate recommendations. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DashboardCard 
        title="Organic Farming Solutions"
        className="bg-gradient-to-br from-amber-50 to-amber-100"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <Leaf className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Natural Solutions</h3>
              <p className="text-sm text-gray-600">Eco-friendly farming practices</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <h4 className="font-medium text-gray-700">Recommended Fertilizers</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Vermicompost</li>
                <li>• Green Manure</li>
                <li>• Bone Meal</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-4">
              <h4 className="font-medium text-gray-700 mb-2">Natural Pest Control</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Neem-based solutions</li>
                <li>• Companion planting</li>
                <li>• Beneficial insects</li>
              </ul>
            </div>
          </div>

          <button
            onClick={handleGetRecommendations}
            disabled={loading}
            className="w-full bg-amber-600 text-white py-3 rounded-xl font-medium hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Get Custom Recommendations"
            )}
          </button>
        </div>
      </DashboardCard>

      <RecommendationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Organic Farming Recommendations"
        loading={loading}
        recommendation={recommendation}
      />
    </>
  );
}