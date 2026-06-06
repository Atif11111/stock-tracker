'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import InputField from "@/components/forms/InputField";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Pencil, Check, X, House } from "@phosphor-icons/react";
import { useProfileData } from "@/hooks/useProfileData";
import { updateProfileInfo, updatePreferences } from "@/lib/actions/profile.actions";
import Link from "next/link";

const INVESTMENT_GOALS = [
  { value: 'long-term-growth', label: 'Long-term Growth' },
  { value: 'short-term-trading', label: 'Short-term Trading' },
  { value: 'retirement', label: 'Retirement Planning' },
  { value: 'dividend-income', label: 'Dividend Income' },
  { value: 'day-trading', label: 'Day Trading' },
  { value: 'value-investing', label: 'Value Investing' },
] as const;

const RISK_TOLERANCE_LEVELS = [
  { value: 'conservative', label: 'Conservative', color: 'bg-green-500' },
  { value: 'moderate-conservative', label: 'Mod. Conservative', color: 'bg-green-400' },
  { value: 'moderate', label: 'Moderate', color: 'bg-yellow-500' },
  { value: 'moderate-aggressive', label: 'Mod. Aggressive', color: 'bg-orange-500' },
  { value: 'aggressive', label: 'Aggressive', color: 'bg-red-500' },
] as const;

const PREFERRED_INDUSTRIES = [
  { value: 'technology', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Finance' },
  { value: 'energy', label: 'Energy' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'consumer-goods', label: 'Consumer Goods' },
  { value: 'crypto', label: 'Crypto' },
  { value: 'etfs', label: 'ETFs' },
] as const;

const RISK_LABELS: Record<string, string> = {
  'conservative': 'Conservative',
  'moderate-conservative': 'Mod. Conservative',
  'moderate': 'Moderate',
  'moderate-aggressive': 'Mod. Aggressive',
  'aggressive': 'Aggressive',
};

const GOAL_LABELS: Record<string, string> = {
  'long-term-growth': 'Long-term Growth',
  'short-term-trading': 'Short-term Trading',
  'retirement': 'Retirement Planning',
  'dividend-income': 'Dividend Income',
  'day-trading': 'Day Trading',
  'value-investing': 'Value Investing',
};

const INDUSTRY_LABELS: Record<string, string> = {
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
  const { data: profile, loading, refetch } = useProfileData();
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState<string>(profile?.riskTolerance || 'moderate');

  const {
    register: registerInfo,
    handleSubmit: handleSubmitInfo,
    formState: { errors: errorsInfo, isSubmitting: isSubmittingInfo },
  } = useForm({
    values: {
      fullName: profile?.name || '',
      email: profile?.email || '',
    },
  });

  const {
    register: registerPrefs,
    handleSubmit: handleSubmitPrefs,
    formState: { errors: errorsPrefs, isSubmitting: isSubmittingPrefs },
    setValue,
  } = useForm({
    values: {
      investmentGoals: profile?.investmentGoals || 'long-term-growth',
      riskTolerance: profile?.riskTolerance || 'moderate',
      preferredIndustry: profile?.preferredIndustry || 'technology',
    },
  });

  const onSaveInfo = async (data: any) => {
    const result = await updateProfileInfo(data);
    if (result.success) {
      toast.success('Personal information updated!');
      refetch();
      setIsEditingInfo(false);
    } else {
      toast.error(result.error || 'Failed to update');
    }
  };

  const onSavePreferences = async (data: any) => {
    const result = await updatePreferences(data);
    if (result.success) {
      toast.success('Investment preferences updated!');
      refetch();
      setIsEditingPreferences(false);
    } else {
      toast.error(result.error || 'Failed to update');
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 sm:p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-gray-700 rounded" />
          <div className="h-4 w-72 bg-gray-700 rounded" />
          <div className="space-y-4 mt-8">
            <div className="h-40 bg-gray-800 rounded-xl" />
            <div className="h-52 bg-gray-800 rounded-xl" />
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
        <Link href="/">
          <Button className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors">
            <House className="h-4 w-4" />
            Home
          </Button>
        </Link>
      </div>

      <div className="mt-8 space-y-6">
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              Personal Information
            </h2>
            {!isEditingInfo && (
              <Button
                onClick={() => setIsEditingInfo(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            )}
          </div>

          {isEditingInfo ? (
            <form onSubmit={handleSubmitInfo(onSaveInfo)} className="space-y-4">
              <InputField
                name="fullName"
                label="Full Name"
                placeholder="John Doe"
                register={registerInfo}
                error={errorsInfo.fullName}
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
                register={registerInfo}
                error={errorsInfo.email}
                validation={{
                  required: 'Email is required',
                }}
              />

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={isSubmittingInfo}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 rounded-lg font-medium transition-colors"
                >
                  <Check className="h-4 w-4" />
                  Save Changes
                </Button>
                <Button
                  type="button"
                  onClick={() => setIsEditingInfo(false)}
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
                <p className="text-base text-gray-200 mt-1">{profile?.name || 'Not set'}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Email</label>
                <p className="text-base text-gray-200 mt-1">{profile?.email || 'Not set'}</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
              Investment Preferences
            </h2>
            {!isEditingPreferences && (
              <Button
                onClick={() => {
                  setSelectedRisk(profile?.riskTolerance || 'moderate');
                  setIsEditingPreferences(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            )}
          </div>

          {isEditingPreferences ? (
            <form onSubmit={handleSubmitPrefs(onSavePreferences)} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  Investment Goal
                </label>
                <select
                  {...registerPrefs('investmentGoals', { required: 'Please select a goal' })}
                  className="w-full h-12 px-3 py-3 text-white text-base bg-gray-700 border border-gray-600 rounded-lg focus:border-yellow-500 focus:ring-0 outline-none cursor-pointer"
                >
                  {INVESTMENT_GOALS.map((goal) => (
                    <option key={goal.value} value={goal.value}>
                      {goal.label}
                    </option>
                  ))}
                </select>
                {errorsPrefs.investmentGoals && (
                  <p className="text-sm text-red-500">{errorsPrefs.investmentGoals.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  Risk Tolerance
                </label>
                <div className="space-y-3">
                  <div className="flex gap-1 h-3 rounded-full overflow-hidden bg-gray-700">
                    {RISK_TOLERANCE_LEVELS.map((level) => (
                      <button
                        key={level.value}
                        type="button"
                        onClick={() => {
                          setSelectedRisk(level.value);
                          setValue('riskTolerance', level.value);
                        }}
                        className={`flex-1 h-full transition-all duration-200 ${
                          RISK_TOLERANCE_LEVELS.findIndex(l => l.value === level.value) <= 
                          RISK_TOLERANCE_LEVELS.findIndex(l => l.value === selectedRisk)
                            ? level.color
                            : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between">
                    {RISK_TOLERANCE_LEVELS.map((level) => (
                      <button
                        key={level.value}
                        type="button"
                        onClick={() => {
                          setSelectedRisk(level.value);
                          setValue('riskTolerance', level.value);
                        }}
                        className={`text-xs transition-colors ${
                          selectedRisk === level.value ? 'text-yellow-400 font-medium' : 'text-gray-500 hover:text-gray-400'
                        }`}
                      >
                        {level.label}
                      </button>
                    ))}
                  </div>
                </div>
                <input type="hidden" {...registerPrefs('riskTolerance')} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  Preferred Industry
                </label>
                <select
                  {...registerPrefs('preferredIndustry', { required: 'Please select an industry' })}
                  className="w-full h-12 px-3 py-3 text-white text-base bg-gray-700 border border-gray-600 rounded-lg focus:border-yellow-500 focus:ring-0 outline-none cursor-pointer"
                >
                  {PREFERRED_INDUSTRIES.map((industry) => (
                    <option key={industry.value} value={industry.value}>
                      {industry.label}
                    </option>
                  ))}
                </select>
                {errorsPrefs.preferredIndustry && (
                  <p className="text-sm text-red-500">{errorsPrefs.preferredIndustry.message}</p>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={isSubmittingPrefs}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 rounded-lg font-medium transition-colors"
                >
                  <Check className="h-4 w-4" />
                  Save Preferences
                </Button>
                <Button
                  type="button"
                  onClick={() => setIsEditingPreferences(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Investment Goal</label>
                <p className="text-base text-gray-200 mt-1">
                  {GOAL_LABELS[profile?.investmentGoals || ''] || 'Not set'}
                </p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Risk Tolerance</label>
                <p className="text-base text-gray-200 mt-1">
                  {RISK_LABELS[profile?.riskTolerance || ''] || 'Not set'}
                </p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Preferred Industry</label>
                <p className="text-base text-gray-200 mt-1">
                  {INDUSTRY_LABELS[profile?.preferredIndustry || ''] || 'Not set'}
                </p>
              </div>
            </div>
          )}
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