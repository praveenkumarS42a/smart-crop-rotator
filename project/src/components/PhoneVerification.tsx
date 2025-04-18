import React, { useState } from 'react';
import { Phone, ArrowRight } from 'lucide-react';

interface PhoneVerificationProps {
  onVerified: (phoneNumber: string) => void;
}

export function PhoneVerification({ onVerified }: PhoneVerificationProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  
  const handleSendOtp = () => {
    // In a real app, integrate with an SMS service
    setStep('otp');
  };
  
  const handleVerifyOtp = () => {
    // In a real app, verify OTP with backend
    onVerified(phoneNumber);
  };
  
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md w-full">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <Phone className="w-6 h-6 text-green-600" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">
            {step === 'phone' ? 'Welcome to Farmer\'s Solutions' : 'Verify OTP'}
          </h1>
        </div>
        
        {step === 'phone' ? (
          <>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter your phone number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your 10-digit number"
              />
            </div>
            <button
              onClick={handleSendOtp}
              disabled={phoneNumber.length !== 10}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter verification code
              </label>
              <div className="flex gap-2">
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={otp[i] || ''}
                    onChange={(e) => {
                      const newOtp = otp.split('');
                      newOtp[i] = e.target.value;
                      setOtp(newOtp.join(''));
                    }}
                    className="w-12 h-12 text-center rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent text-xl font-semibold"
                  />
                ))}
              </div>
            </div>
            <button
              onClick={handleVerifyOtp}
              disabled={otp.length !== 6}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <span>Verify</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}