// YouTube API configuration
export const YOUTUBE_CONFIG = {
    client_id: process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_ID || '',
    api_key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || '',
    scopes: [
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/youtube.force-ssl'
    ],
    redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/youtube/callback`|| 'http://localhost:3000/api/auth/youtube/callback'
  };