import React from 'react';
import { DashboardCard } from './DashboardCard';
import { Droplet, Thermometer, Leaf } from 'lucide-react';
import type { SoilData } from '../types';

const mockSoilData: SoilData = {
  moisture: 65,
  ph: 6.8,
  nitrogen: 75,
  phosphorus: 60,
  potassium: 80,
  lastUpdated: new Date()
};

export function SoilHealthPanel() {
  return (
    <DashboardCard title="Soil Health Analysis">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <Droplet className="text-green-600 w-5 h-5" />
            </div>
            <span className="text-2xl font-semibold text-green-600">{mockSoilData.moisture}%</span>
          </div>
          <p className="text-sm font-medium text-green-700">Moisture Level</p>
          <p className="text-xs text-green-600 mt-1">Optimal range: 60-70%</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <Thermometer className="text-blue-600 w-5 h-5" />
            </div>
            <span className="text-2xl font-semibold text-blue-600">{mockSoilData.ph}</span>
          </div>
          <p className="text-sm font-medium text-blue-700">pH Level</p>
          <p className="text-xs text-blue-600 mt-1">Optimal range: 6.0-7.0</p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <Leaf className="text-amber-600 w-5 h-5" />
            </div>
            <span className="text-2xl font-semibold text-amber-600">
              {mockSoilData.nitrogen}/{mockSoilData.phosphorus}/{mockSoilData.potassium}
            </span>
          </div>
          <p className="text-sm font-medium text-amber-700">NPK Levels</p>
          <p className="text-xs text-amber-600 mt-1">N-P-K Ratio</p>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-4">
        Last updated: {mockSoilData.lastUpdated.toLocaleString()}
      </p>
    </DashboardCard>
  );
}