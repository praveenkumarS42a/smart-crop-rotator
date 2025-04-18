import React from 'react';
import { DashboardCard } from './DashboardCard';
import { Sprout, TrendingUp, Sun, Droplet } from 'lucide-react';
import type { CropSuggestion } from '../types';

const mockSuggestions: CropSuggestion[] = [
  {
    cropName: 'Soybeans',
    confidence: 92,
    expectedYield: 85,
    marketDemand: 88,
    profitPotential: 90
  },
  {
    cropName: 'Winter Wheat',
    confidence: 88,
    expectedYield: 78,
    marketDemand: 82,
    profitPotential: 85
  }
];

export function CropSuggestions() {
  return (
    <DashboardCard title="Recommended Crops">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockSuggestions.map((crop) => (
          <div key={crop.cropName} className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                  <Sprout className="text-green-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{crop.cropName}</h3>
                  <span className="text-sm text-green-600">{crop.confidence}% Match</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Sun className="w-4 h-4 text-amber-500" />
                  <p className="text-sm text-gray-600">Yield</p>
                </div>
                <p className="font-semibold text-gray-800">{crop.expectedYield}%</p>
              </div>
              
              <div className="bg-white rounded-xl p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Droplet className="w-4 h-4 text-blue-500" />
                  <p className="text-sm text-gray-600">Demand</p>
                </div>
                <p className="font-semibold text-gray-800">{crop.marketDemand}%</p>
              </div>
              
              <div className="col-span-2 bg-white rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <p className="text-sm text-gray-600">Profit Potential</p>
                  </div>
                  <p className="font-semibold text-gray-800">{crop.profitPotential}%</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}