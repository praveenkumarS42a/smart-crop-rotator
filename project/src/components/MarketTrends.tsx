import React from 'react';
import { DashboardCard } from './DashboardCard';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import type { MarketTrend } from '../types';

const mockTrends: MarketTrend[] = [
  {
    cropName: 'Corn',
    currentPrice: 175.50,
    priceChange: 2.5,
    demandLevel: 'High',
    forecast: 180.25
  },
  {
    cropName: 'Wheat',
    currentPrice: 220.75,
    priceChange: -1.2,
    demandLevel: 'Medium',
    forecast: 225.00
  }
];

export function MarketTrends() {
  return (
    <DashboardCard title="Market Trends">
      <div className="space-y-4">
        {mockTrends.map((trend) => (
          <div key={trend.cropName} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-800">{trend.cropName}</h3>
              <span className="text-sm text-gray-600">{trend.demandLevel} Demand</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-semibold text-gray-800">
                  ${trend.currentPrice.toFixed(2)}
                </span>
                <div className={`inline-flex items-center ml-2 px-2 py-0.5 rounded-full text-sm ${
                  trend.priceChange >= 0 
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {trend.priceChange >= 0 ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {Math.abs(trend.priceChange)}%
                </div>
              </div>
              
              <div className="flex items-center text-gray-500">
                <span className="text-sm">Forecast: ${trend.forecast.toFixed(2)}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}