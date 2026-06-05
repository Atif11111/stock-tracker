'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import InputField from '@/components/forms/InputField';
import FooterLink from '@/components/forms/FooterLink';

import { signInWithEmail } from '@/lib/actions/auth.actions';

import { toast } from 'sonner';

const SignIn = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const result = await signInWithEmail(data);

      if (result.success) {
        toast.success('Welcome back!');
        router.push('/');
      } else {
        toast.error('Sign in failed', {
          description: result.error || 'Invalid email or password.',
        });
      }
    } catch (e) {
      toast.error('Sign in failed', {
        description:
          e instanceof Error
            ? e.message
            : 'Invalid email or password.',
      });
    }
  };

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-100">
          Welcome back
        </h1>

        <p className="mt-2 text-gray-400">
          Sign in to continue.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
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
          placeholder="Enter your password"
          register={register}
          error={errors.password}
          validation={{
            required: 'Password is required',
          }}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 yellow-btn"
        >
          {isSubmitting
            ? 'Signing in...'
            : 'Sign In'}
        </Button>

        <FooterLink
          text="Don't have an account?"
          linkText="Create one"
          href="/sign-up"
        />
      </form>
    </>
  );
};

export default SignIn;