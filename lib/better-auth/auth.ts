import { betterAuth, type BetterAuthOptions } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectToDatabase } from "@/database/mongoose";
import { nextCookies } from "better-auth/next-js";

let authInstance: ReturnType<typeof betterAuth> | null = null;
let authPromise: Promise<ReturnType<typeof betterAuth>> | null = null;

const getAuthInstance = async () => {
    if (authInstance) return authInstance;

    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) throw new Error('MongoDB connection not found');

    const options: BetterAuthOptions = {
        database: mongodbAdapter(db as any),
        secret: process.env.BETTER_AUTH_SECRET!,
        baseURL: process.env.BETTER_AUTH_URL!,
        emailAndPassword: {
            enabled: true,
            disableSignUp: false,
            requireEmailVerification: false,
            minPasswordLength: 8,
            maxPasswordLength: 128,
            autoSignIn: true,
        },
        plugins: [nextCookies()],
    };

    authInstance = betterAuth(options);
    return authInstance;
};

export const getAuth = async () => {
    if (!authPromise) {
        authPromise = getAuthInstance();
    }
    return authPromise;
};

export const auth = {
    api: {
        signUpEmail: async (options: any) => {
            const instance = await getAuth();
            return instance.api.signUpEmail(options);
        },
        signInEmail: async (options: any) => {
            const instance = await getAuth();
            return instance.api.signInEmail(options);
        },
        signOut: async (options: any) => {
            const instance = await getAuth();
            return instance.api.signOut(options);
        },
        getSession: async (options: any) => {
            const instance = await getAuth();
            return instance.api.getSession(options);
        },
    }
};