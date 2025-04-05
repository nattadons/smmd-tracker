import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { YouTubeService } from '@/services/youtube.service';
import { YouTubeQuotaManager } from '@/utils/youtubeQuotaManager';

export interface YouTubeAuthState {
  isAuthenticated: boolean;
  isConnecting: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  channelStats: any | null;
  error: string | null;
  recentVideos: any[] | null;
}

export function useYoutubeAuth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const quotaManager = YouTubeQuotaManager.getInstance();

  const [state, setState] = useState<YouTubeAuthState>({
    isAuthenticated: false,
    isConnecting: false,
    accessToken: null,
    refreshToken: null,
    expiresAt: null,
    channelStats: null,
    error: null,
    recentVideos: null
  });

  const updateTokens = useCallback((accessToken: string, refreshToken: string, expiresIn: string) => {
    const expiresAt = Date.now() + parseInt(expiresIn, 10) * 1000;

    // Store tokens in localStorage
    localStorage.setItem('youtube_access_token', accessToken);
    localStorage.setItem('youtube_refresh_token', refreshToken);
    localStorage.setItem('youtube_expires_at', expiresAt.toString());

    setState(prev => ({
      ...prev,
      isAuthenticated: true,
      accessToken,
      refreshToken,
      expiresAt
    }));
  }, []);

  // Check for tokens in local storage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedAccessToken = localStorage.getItem('youtube_access_token');
    const storedRefreshToken = localStorage.getItem('youtube_refresh_token');
    const storedExpiresAt = localStorage.getItem('youtube_expires_at');

    if (storedAccessToken && storedRefreshToken && storedExpiresAt) {
      setState(prev => ({
        ...prev,
        isAuthenticated: true,
        accessToken: storedAccessToken,
        refreshToken: storedRefreshToken,
        expiresAt: parseInt(storedExpiresAt, 10)
      }));
    }

    // Check for URL parameters (from redirect)
    if (searchParams) {
      const accessToken = searchParams.get('youtube_access_token');
      const refreshToken = searchParams.get('youtube_refresh_token');
      const expiresIn = searchParams.get('youtube_expires_in');
      const error = searchParams.get('authError');

      if (accessToken && refreshToken && expiresIn) {
        updateTokens(accessToken, refreshToken, expiresIn);
        router.replace('/dashboard');
      } else if (error) {
        setState(prev => ({
          ...prev,
          error
        }));
        router.replace('/dashboard');
      }
    }
  }, [searchParams, router, updateTokens]);

  // Initiate authentication
  const connect = () => {
    setState({ ...state, isConnecting: true });
    const authUrl = YouTubeService.getAuthUrl();
    window.location.href = authUrl;
  };

  // Disconnect/logout
  const disconnect = () => {
    localStorage.removeItem('youtube_access_token');
    localStorage.removeItem('youtube_refresh_token');
    localStorage.removeItem('youtube_expires_at');

    // Clear quota manager cache
    quotaManager.clearCache();

    setState({
      isAuthenticated: false,
      isConnecting: false,
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
      channelStats: null,
      error: null,
      recentVideos: null
    });
  };

  // Fetch channel statistics
  const fetchChannelStats = async () => {
    if (!state.accessToken) {
      setState({ ...state, error: 'No access token available' });
      return;
    }

    try {
      // Check if token is expired
      if (state.expiresAt && Date.now() > state.expiresAt) {
        // Token is expired, refresh it first
        if (state.refreshToken) {
          const tokens = await YouTubeService.refreshAccessToken(state.refreshToken);
          updateTokens(tokens.access_token, state.refreshToken, tokens.expires_in);
          
          // Fetch statistics with new token using quota manager
          const stats = await quotaManager.getChannelStats(tokens.access_token);
          setState({ ...state, channelStats: stats });
          return stats;
        }
      } else {
        // Token is still valid
        const stats = await quotaManager.getChannelStats(state.accessToken);
        setState({ ...state, channelStats: stats });
        return stats;
      }
    } catch (error) {
      console.error('Error fetching YouTube stats:', error);
      setState({ ...state, error: 'Failed to fetch channel statistics' });
    }
  };

  // Fetch recent videos
  const fetchRecentVideos = async (maxResults = 10) => {
    if (!state.accessToken) {
      setState(prev => ({ ...prev, error: 'No access token available' }));
      return [];
    }
    
    try {
      // Check if token is expired
      if (state.expiresAt && Date.now() > state.expiresAt) {
        // Token is expired, refresh it first
        if (state.refreshToken) {
          const tokens = await YouTubeService.refreshAccessToken(state.refreshToken);
          updateTokens(tokens.access_token, state.refreshToken, tokens.expires_in);
          
          // Fetch recent videos with new token using quota manager
          const videos = await quotaManager.getRecentVideos(tokens.access_token, maxResults);
  
          setState(prev => ({
            ...prev,
            accessToken: tokens.access_token,
            recentVideos: videos || []
          }));
  
          return videos || [];
        }
      } else {
        // Token is still valid
        const videos = await quotaManager.getRecentVideos(state.accessToken, maxResults);
        
        setState(prev => ({
          ...prev,
          recentVideos: videos || []
        }));
  
        return videos || [];
      }
    } catch (error) {
      console.error('Error fetching recent videos:', error);
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to fetch recent videos',
        recentVideos: [] 
      }));
      return [];
    }
  };

  return {
    ...state,
    connect,
    disconnect,
    fetchChannelStats,
    fetchRecentVideos,
    clearCache: () => quotaManager.clearCache()
  };
}