import { getAuth } from "@/lib/better-auth/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const auth = await getAuth();
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    
    return NextResponse.json(session || { user: null });
  } catch (e) {
    console.error('Session fetch error:', e);
    return NextResponse.json({ user: null });
  }
}