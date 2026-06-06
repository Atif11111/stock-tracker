import { getProfileData } from "@/lib/actions/profile.actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const data = await getProfileData();
  return NextResponse.json(data);
}