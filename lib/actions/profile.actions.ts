'use server';

import { getAuth } from "@/lib/better-auth/auth";
import { connectToDatabase } from "@/database/mongoose";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";

export const updateProfileInfo = async (data: { fullName: string; email: string }) => {
  try {
    const auth = await getAuth();
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: 'Not authenticated' };
    }

    await auth.api.updateUser({
      body: {
        name: data.fullName,
      },
      headers: await headers(),
    });

    if (data.email !== session.user.email) {
      await auth.api.changeEmail({
        body: {
          newEmail: data.email,
        },
        headers: await headers(),
      });
    }

    revalidatePath('/profile');
    return { success: true };
  } catch (e) {
    console.error('Failed to update profile:', e);
    return { success: false, error: 'Failed to update profile' };
  }
};

export const updatePreferences = async (data: {
  investmentGoals: string;
  riskTolerance: string;
  preferredIndustry: string;
}) => {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    const auth = await getAuth();
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: 'Not authenticated' };
    }

    await db.collection('user').updateOne(
      { email: session.user.email },
      {
        $set: {
          investmentGoals: data.investmentGoals,
          riskTolerance: data.riskTolerance,
          preferredIndustry: data.preferredIndustry,
        },
      }
    );

    revalidatePath('/profile');
    return { success: true };
  } catch (e) {
    console.error('Failed to update preferences:', e);
    return { success: false, error: 'Failed to update preferences' };
  }
};

export const getProfileData = async () => {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    const auth = await getAuth();
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return null;
    }

    const userData = await db.collection('user').findOne(
      { email: session.user.email },
      {
        projection: {
          investmentGoals: 1,
          riskTolerance: 1,
          preferredIndustry: 1,
        },
      }
    );

    return {
      name: session.user.name,
      email: session.user.email,
      investmentGoals: userData?.investmentGoals || 'long-term-growth',
      riskTolerance: userData?.riskTolerance || 'moderate',
      preferredIndustry: userData?.preferredIndustry || 'technology',
    };
  } catch (e) {
    console.error('Failed to get profile data:', e);
    return null;
  }
};