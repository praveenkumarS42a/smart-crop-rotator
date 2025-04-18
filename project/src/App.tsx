import React, { useState, useEffect } from 'react';
import { EmailAuth } from './components/EmailAuth';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import type { UserProfile } from './types';

function App() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
    }
  }, [userProfile]);

  const handleAuthenticated = (email: string) => {
    setUserProfile({
      email,
      verified: true,
      onboardingCompleted: false,
      farmDetails: {
        acres: 0,
        soilType: 'Clay',
        irrigationFacility: false,
        district: '',
        farmingType: 'Traditional',
        interestedInVegetables: false,
      },
    });
  };

  const handleOnboardingComplete = (farmDetails: UserProfile['farmDetails']) => {
    setUserProfile(prev => prev ? {
      ...prev,
      onboardingCompleted: true,
      farmDetails,
    } : null);
  };

  if (!userProfile) {
    return <EmailAuth onAuthenticated={handleAuthenticated} />;
  }

  if (!userProfile.onboardingCompleted) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return <Dashboard userProfile={userProfile} />;
}

export default App;