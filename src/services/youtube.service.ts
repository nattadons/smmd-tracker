import { YOUTUBE_CONFIG } from '@/config/youtube.config';

export interface YouTubeStats {
  subscriberCount: string;
  videoCount: string;
  viewCount: string;
  commentCount: string;
  likeCount: string;
}

export class YouTubeService {
  // Simple API call counter
  private static apiCallCount = 0;

  // Generate OAuth URL for user authentication
  static getAuthUrl(): string {
    console.log(`[API CALL] getAuthUrl - Total API Calls: ${++this.apiCallCount}`);
    const scopes = YOUTUBE_CONFIG.scopes.join(' ');

    return `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${YOUTUBE_CONFIG.client_id}` +
      `&redirect_uri=${encodeURIComponent(YOUTUBE_CONFIG.redirect_uri)}` +
      `&response_type=code` +
      `&scope=${encodeURIComponent(scopes)}` +
      `&access_type=offline` +
      `&prompt=consent`;
  }

  // Token exchange method
  static async getTokensFromCode(code: string): Promise<any> {
    try {
      console.log(`[API CALL] getTokensFromCode - Total API Calls: ${++this.apiCallCount}`);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/youtube/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      return await response.json();
    } catch (error) {
      console.error('Error exchanging code for tokens:', error);
      throw error;
    }
  }

  // Get channel statistics using access token
  static async getChannelStats(accessToken: string): Promise<YouTubeStats> {
    try {
      console.log(`[API CALL] getChannelStats - Total API Calls: ${++this.apiCallCount}`);
      // First get the authenticated user's channel
      const channelResponse = await fetch(
        'https://www.googleapis.com/youtube/v3/channels?part=id,statistics&mine=true',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const channelData = await channelResponse.json();

      if (!channelData.items || channelData.items.length === 0) {
        throw new Error('No channel found for this user');
      }

      const statistics = channelData.items[0].statistics;

      // Get video statistics
      const videoStatsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=id&channelId=${channelData.items[0].id}&maxResults=50&type=video`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const videoData = await videoStatsResponse.json();
      const videoIds = videoData.items.map((item: any) => item.id.videoId).join(',');

      // Get detailed video statistics if there are videos
      let commentCount = '0';
      let likeCount = '0';

      if (videoIds.length > 0) {
        const videoDetailsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const videoDetails = await videoDetailsResponse.json();

        if (videoDetails.items && videoDetails.items.length > 0) {
          // Sum up all comments and likes
          commentCount = videoDetails.items.reduce(
            (sum: number, video: any) => sum + (parseInt(video.statistics.commentCount) || 0),
            0
          ).toString();

          likeCount = videoDetails.items.reduce(
            (sum: number, video: any) => sum + (parseInt(video.statistics.likeCount) || 0),
            0
          ).toString();
        }
      }

      return {
        subscriberCount: statistics.subscriberCount || '0',
        videoCount: statistics.videoCount || '0',
        viewCount: statistics.viewCount || '0',
        commentCount,
        likeCount
      };
    } catch (error) {
      console.error('Error fetching YouTube statistics:', error);
      throw error;
    }
  }

  // Refresh the access token using refresh token
  static async refreshAccessToken(refreshToken: string): Promise<any> {
    try {
      console.log(`[API CALL] refreshAccessToken - Total API Calls: ${++this.apiCallCount}`);
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          refresh_token: refreshToken,
          client_id: YOUTUBE_CONFIG.client_id,
          client_secret: process.env.YOUTUBE_CLIENT_SECRET || '',
          grant_type: 'refresh_token',
        }),
      });

      return await response.json();
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw error;
    }
  }

  // Get recent videos
  static async getRecentVideos(accessToken: string, maxResults = 10): Promise<any> {
    try {
      console.log(`[API CALL] getRecentVideos - Total API Calls: ${++this.apiCallCount}`);
      // ดึง Channel ID ก่อน
      const channelResponse = await fetch(
        'https://www.googleapis.com/youtube/v3/channels?part=id&mine=true',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const channelData = await channelResponse.json();

      if (!channelData.items || channelData.items.length === 0) {
        throw new Error('No channel found');
      }

      const channelId = channelData.items[0].id;

      // ค้นหาวิดีโอล่าสุด
      const searchResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${maxResults}&order=date&type=video`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const searchData = await searchResponse.json();

      if (!searchData.items || searchData.items.length === 0) {
        return { items: [] };
      }

      // ดึงรายละเอียดวิดีโอ
      const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');
      
      const videoDetailsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const videoDetails = await videoDetailsResponse.json();

      return videoDetails;
    } catch (error) {
      console.error('Error fetching recent videos:', error);
      throw error;
    }
  }
}