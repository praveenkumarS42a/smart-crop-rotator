import React, { useState } from 'react';
import { MapPin, Droplet, Trees, Car as Farm, Sprout } from 'lucide-react';
import type { UserProfile, OnboardingStep } from '../types';

interface OnboardingProps {
  onComplete: (farmDetails: UserProfile['farmDetails']) => void;
}

const soilTypes = ['Clay', 'Sandy', 'Loamy', 'Silt', 'Peaty'] as const;
const districts = ['District 1', 'District 2', 'District 3']; // Replace with actual districts

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState<OnboardingStep>('acres');
  const [farmDetails, setFarmDetails] = useState<UserProfile['farmDetails']>({
    acres: 0,
    soilType: 'Clay',
    irrigationFacility: false,
    district: '',
    farmingType: 'Traditional',
    interestedInVegetables: false,
  });

  const updateFarmDetails = (key: keyof UserProfile['farmDetails'], value: any) => {
    setFarmDetails(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    const steps: OnboardingStep[] = ['acres', 'soil-type', 'irrigation', 'district', 'farming-type', 'vegetables', 'completed'];
    const currentIndex = steps.indexOf(step);
    
    if (currentIndex === steps.length - 2) {
      onComplete(farmDetails);
    } else {
      setStep(steps[currentIndex + 1]);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'acres':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Farm className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">How many acres do you farm?</h2>
            </div>
            <input
              type="number"
              value={farmDetails.acres || ''}
              onChange={(e) => updateFarmDetails('acres', Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter acres"
            />
          </div>
        );

      case 'soil-type':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Sprout className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">What type of soil do you have?</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {soilTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => updateFarmDetails('soilType', type)}
                  className={`p-4 rounded-xl border ${
                    farmDetails.soilType === type
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        );

      case 'irrigation':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Droplet className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Do you have irrigation facilities?</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['Yes', 'No'].map((option) => (
                <button
                  key={option}
                  onClick={() => updateFarmDetails('irrigationFacility', option === 'Yes')}
                  className={`p-4 rounded-xl border ${
                    (farmDetails.irrigationFacility && option === 'Yes') ||
                    (!farmDetails.irrigationFacility && option === 'No')
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 'district':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Select your district</h2>
            </div>
            <select
              value={farmDetails.district}
              onChange={(e) => updateFarmDetails('district', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select a district</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        );

      case 'farming-type':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Trees className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">What type of farming do you practice?</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['Organic', 'Traditional'].map((type) => (
                <button
                  key={type}
                  onClick={() => updateFarmDetails('farmingType', type as 'Organic' | 'Traditional')}
                  className={`p-4 rounded-xl border ${
                    farmDetails.farmingType === type
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        );

      case 'vegetables':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Sprout className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Are you interested in growing vegetables?</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['Yes', 'No'].map((option) => (
                <button
                  key={option}
                  onClick={() => updateFarmDetails('interestedInVegetables', option === 'Yes')}
                  className={`p-4 rounded-xl border ${
                    (farmDetails.interestedInVegetables && option === 'Yes') ||
                    (!farmDetails.interestedInVegetables && option === 'No')
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md w-full">
        {renderStep()}
        
        <div className="mt-8">
          <button
            onClick={handleNext}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700"
          >
            {step === 'vegetables' ? 'Complete' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}