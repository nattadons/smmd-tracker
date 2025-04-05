// src/app/api/auth/youtube/token/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { YOUTUBE_CONFIG } from '@/config/youtube.config';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();
    
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: YOUTUBE_CONFIG.client_id,
        client_secret: process.env.YOUTUBE_CLIENT_SECRET || '',
        redirect_uri: YOUTUBE_CONFIG.redirect_uri,
        grant_type: 'authorization_code',
      }),
    });
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in token exchange:', error);
    return NextResponse.json({ error: 'Token exchange failed' }, { status: 500 });
  }
}