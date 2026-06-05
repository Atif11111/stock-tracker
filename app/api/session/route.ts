import { getAuth } from "@/lib/better-auth/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const auth = await getAuth();
    const session = await auth.api.getSession({
      headers: new Headers(),
    });
    
    return NextResponse.json(session || { user: null });
  } catch (e) {
    return NextResponse.json({ user: null });
  }
}