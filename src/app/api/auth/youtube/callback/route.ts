// src/app/api/auth/youtube/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { YouTubeService } from '@/services/youtube.service';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  // Handle errors from OAuth process
  if (error) {
    console.error('OAuth error:', error);
    return NextResponse.redirect(new URL('/dashboard?authError=' + error, request.url));
  }

  // If we got an authorization code
  if (code) {
    try {
      console.log('Exchanging code for tokens...');
      // Exchange code for tokens
      const tokens = await YouTubeService.getTokensFromCode(code);
      
      if (tokens.error) {
        console.error('Token exchange error:', tokens.error);
        return NextResponse.redirect(new URL('/dashboard?authError=token_exchange_failed', request.url));
      }
      
      // Redirect to dashboard with tokens in URL (only for client-side handling)
      const redirectUrl = new URL('/dashboard', request.url);
      redirectUrl.searchParams.set('youtube_access_token', tokens.access_token);
      redirectUrl.searchParams.set('youtube_refresh_token', tokens.refresh_token);
      redirectUrl.searchParams.set('youtube_expires_in', tokens.expires_in);
      
      return NextResponse.redirect(redirectUrl);
    } catch (error) {
      console.error('Error exchanging code for tokens:', error);
      return NextResponse.redirect(new URL('/dashboard?authError=token_exchange_failed', request.url));
    }
  }

  // If no code is present, redirect back to dashboard
  return NextResponse.redirect(new URL('/dashboard', request.url));
}