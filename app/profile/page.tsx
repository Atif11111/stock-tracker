'use client';

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import InputField from "@/components/forms/InputField";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Pencil, Check, X } from "@phosphor-icons/react";

const INVESTMENT_GOALS = {
  'long-term-growth': 'Long-term Growth',
  'short-term-trading': 'Short-term Trading',
  'retirement': 'Retirement Planning',
  'dividend-income': 'Dividend Income',
  'day-trading': 'Day Trading',
  'value-investing': 'Value Investing',
};

const RISK_TOLERANCE_LABELS = {
  'conservative': 'Conservative',
  'moderate-conservative': 'Moderately Conservative',
  'moderate': 'Moderate',
  'moderate-aggressive': 'Moderately Aggressive',
  'aggressive': 'Aggressive',
};

const PREFERRED_INDUSTRIES = {
  'technology': 'Technology',
  'healthcare': 'Healthcare',
  'finance': 'Finance',
  'energy': 'Energy',
  'real-estate': 'Real Estate',
  'consumer-goods': 'Consumer Goods',
  'crypto': 'Crypto',
  'etfs': 'ETFs',
};

const ProfilePage = () => {
  const { user, loading } = useCurrentUser();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: user?.name || '',
      email: user?.email || '',
    },
    values: {
      fullName: user?.name || '',
      email: user?.email || '',
    },
  });

  const onSubmit = async (data: any) => {
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 sm:p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-gray-700 rounded" />
          <div className="h-4 w-72 bg-gray-700 rounded" />
          <div className="space-y-4 mt-8">
            <div className="h-24 bg-gray-800 rounded-xl" />
            <div className="h-24 bg-gray-800 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-8">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Profile</h1>
          <p className="text-gray-400 mt-1">Manage your account information</p>
        </div>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
        )}
      </div>

      <div className="mt-8 space-y-6">
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-200 mb-6 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-500"></span>
            Personal Information
          </h2>

          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <InputField
                name="fullName"
                label="Full Name"
                placeholder="John Doe"
                register={register}
                error={errors.fullName}
                validation={{
                  required: 'Full name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters',
                  },
                }}
              />

              <InputField
                name="email"
                label="Email"
                placeholder="you@example.com"
                register={register}
                error={errors.email}
                validation={{
                  required: 'Email is required',
                }}
              />

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 rounded-lg font-medium transition-colors"
                >
                  <Check className="h-4 w-4" />
                  Save Changes
                </Button>
                <Button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Full Name</label>
                <p className="text-base text-gray-200 mt-1">{user?.name || 'Not set'}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Email</label>
                <p className="text-base text-gray-200 mt-1">{user?.email || 'Not set'}</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-200 mb-6 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
            Investment Preferences
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider">Investment Goal</label>
              <p className="text-base text-gray-200 mt-1">
                {INVESTMENT_GOALS['long-term-growth'] || 'Not set'}
              </p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider">Risk Tolerance</label>
              <p className="text-base text-gray-200 mt-1">
                {RISK_TOLERANCE_LABELS['moderate'] || 'Not set'}
              </p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider">Preferred Industry</label>
              <p className="text-base text-gray-200 mt-1">
                {PREFERRED_INDUSTRIES['technology'] || 'Not set'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-200 mb-6 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            Account Summary
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider">Member Since</label>
              <p className="text-base text-gray-200 mt-1">June 2025</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider">Account Status</label>
              <p className="text-base text-green-400 mt-1 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400"></span>
                Active
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;