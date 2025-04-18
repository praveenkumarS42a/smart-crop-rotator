import React from 'react';
import { Sun, LogOut } from 'lucide-react';
import { CropRotationPlanner } from './dashboard/CropRotationPlanner';
import { OrganicFarming } from './dashboard/OrganicFarming';
import { OptimizedFarming } from './dashboard/OptimizedFarming';
import { IrrigationSystem } from './dashboard/IrrigationSystem';
import type { UserProfile } from '../types';

interface DashboardProps {
  userProfile: UserProfile;
}

export function Dashboard({ userProfile }: DashboardProps) {
  const handleSignOut = () => {
    localStorage.removeItem('userProfile');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-800">Farmer's Solutions</span>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-sm text-gray-600">
                {userProfile.email}
              </div>
              <button 
                onClick={handleSignOut}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CropRotationPlanner farmDetails={userProfile.farmDetails} />
          <OrganicFarming farmDetails={userProfile.farmDetails} />
          <OptimizedFarming farmDetails={userProfile.farmDetails} />
          <IrrigationSystem farmDetails={userProfile.farmDetails} />
        </div>
      </main>
    </div>
  );
}