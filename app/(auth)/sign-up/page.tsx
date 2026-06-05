'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import InputField from '@/components/forms/InputField';
import FooterLink from '@/components/forms/FooterLink';
import { signUpWithEmail } from '@/lib/actions/auth.actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';

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

const SignUp = () => {
  const router = useRouter();
  const [selectedRisk, setSelectedRisk] = useState<string>('moderate');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      investmentGoals: 'long-term-growth',
      riskTolerance: 'moderate',
      preferredIndustry: 'technology',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: any) => {
    try {
      const result = await signUpWithEmail(data);

      if (result.success) {
        toast.success('Account created successfully!');
        router.push('/');
      } else {
        toast.error(result.error || 'Failed to create an account.');
      }
    } catch (e) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-100">
          Create your account
        </h1>
        <p className="mt-2 text-gray-400">
          Start investing smarter in minutes.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
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

        <InputField
          name="password"
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          register={register}
          error={errors.password}
          validation={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          }}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">
            Investment Goal
          </label>
          <select
            {...register('investmentGoals', { required: 'Please select a goal' })}
            className="w-full h-12 px-3 py-3 text-white text-base bg-gray-800 border border-gray-600 rounded-lg focus:border-yellow-500 focus:ring-0 outline-none cursor-pointer"
          >
            {INVESTMENT_GOALS.map((goal) => (
              <option key={goal.value} value={goal.value}>
                {goal.label}
              </option>
            ))}
          </select>
          {errors.investmentGoals && (
            <p className="text-sm text-red-500">{errors.investmentGoals.message}</p>
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
          <input type="hidden" {...register('riskTolerance')} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">
            Preferred Industry
          </label>
          <select
            {...register('preferredIndustry', { required: 'Please select an industry' })}
            className="w-full h-12 px-3 py-3 text-white text-base bg-gray-800 border border-gray-600 rounded-lg focus:border-yellow-500 focus:ring-0 outline-none cursor-pointer"
          >
            {PREFERRED_INDUSTRIES.map((industry) => (
              <option key={industry.value} value={industry.value}>
                {industry.label}
              </option>
            ))}
          </select>
          {errors.preferredIndustry && (
            <p className="text-sm text-red-500">{errors.preferredIndustry.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 yellow-btn"
        >
          {isSubmitting
            ? 'Creating account...'
            : 'Create Account'}
        </Button>

        <FooterLink
          text="Already have an account?"
          linkText="Sign in"
          href="/sign-in"
        />
      </form>
    </>
  );
};

export default SignUp;