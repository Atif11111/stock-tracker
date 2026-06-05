import { getAuth } from "@/lib/better-auth/auth";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const auth = await getAuth();
    const session = await auth.api.getSession({
      headers: new Headers({
        cookie: (await cookies()).toString(),
      }),
    });
    
    return NextResponse.json(session || { user: null });
  } catch (e) {
    console.error('Session fetch error:', e);
    return NextResponse.json({ user: null });
  }
}