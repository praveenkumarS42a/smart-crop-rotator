import React, { useState } from 'react';
import { Mail, ArrowRight, Loader2 } from 'lucide-react';

interface EmailAuthProps {
  onAuthenticated: (email: string) => void;
}

export function EmailAuth({ onAuthenticated }: EmailAuthProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Simple validation
      if (!email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onAuthenticated(email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md w-full">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <Mail className="w-6 h-6 text-green-600" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome to Farmer's Solutions
          </h1>
        </div>

        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}