export interface SoilData {
  moisture: number;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  lastUpdated: Date;
}

export interface CropSuggestion {
  cropName: string;
  confidence: number;
  expectedYield: number;
  marketDemand: number;
  profitPotential: number;
}

export interface MarketTrend {
  cropName: string;
  currentPrice: number;
  priceChange: number;
  demandLevel: 'High' | 'Medium' | 'Low';
  forecast: number;
}

export interface UserProfile {
  email: string;
  verified: boolean;
  onboardingCompleted: boolean;
  farmDetails: {
    acres: number;
    soilType: 'Clay' | 'Sandy' | 'Loamy' | 'Silt' | 'Peaty';
    irrigationFacility: boolean;
    district: string;
    farmingType: 'Organic' | 'Traditional';
    interestedInVegetables: boolean;
  };
}

export type OnboardingStep = 
  | 'acres'
  | 'soil-type'
  | 'irrigation'
  | 'district'
  | 'farming-type'
  | 'vegetables'
  | 'completed';