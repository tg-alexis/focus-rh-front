import { signOut } from '@/lib/auth/auth';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    await signOut({ redirect: false });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Signout error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
