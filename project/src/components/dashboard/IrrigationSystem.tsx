import React, { useState } from 'react';
import { Droplet, Cloud, Loader2 } from 'lucide-react';
import { DashboardCard } from '../DashboardCard';
import { RecommendationModal } from '../RecommendationModal';
import { getAIRecommendation, generatePrompts } from '../../services/huggingface';
import type { UserProfile } from '../../types';

interface IrrigationSystemProps {
  farmDetails: UserProfile['farmDetails'];
}

export function IrrigationSystem({ farmDetails }: IrrigationSystemProps) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const handleViewPlan = async () => {
    setLoading(true);
    setShowModal(true);
    try {
      const prompt = generatePrompts.waterManagement(
        farmDetails.acres,
        farmDetails.irrigationFacility
      );
      const result = await getAIRecommendation(prompt);
      setRecommendation(result);
    } catch (error) {
      console.error('Failed to get water management plan:', error);
      setRecommendation('Failed to generate recommendations. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DashboardCard 
        title="Irrigation System"
        className="bg-gradient-to-br from-cyan-50 to-cyan-100"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <Droplet className="w-6 h-6 text-cyan-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Water Management</h3>
              <p className="text-sm text-gray-600">Smart irrigation solutions</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Cloud className="w-5 h-5 text-cyan-600" />
                <h4 className="font-medium text-gray-700">Current Status</h4>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">System Type:</span>
                <span className="font-medium text-gray-800">
                  {farmDetails.irrigationFacility ? 'Drip Irrigation' : 'Traditional'}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4">
              <h4 className="font-medium text-gray-700 mb-2">Suggested Improvements</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Install moisture sensors</li>
                <li>• Implement drip irrigation</li>
                <li>• Schedule-based watering</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-4">
              <h4 className="font-medium text-gray-700 mb-2">Water Savings</h4>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Potential savings:</span>
                <span className="text-cyan-600 font-medium">Up to 40%</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleViewPlan}
            disabled={loading}
            className="w-full bg-cyan-600 text-white py-3 rounded-xl font-medium hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "View Water Management Plan"
            )}
          </button>
        </div>
      </DashboardCard>

      <RecommendationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Water Management Plan"
        loading={loading}
        recommendation={recommendation}
      />
    </>
  );
}