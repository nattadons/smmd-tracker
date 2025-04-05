import { YouTubeService } from '@/services/youtube.service';

export class YouTubeQuotaManager {
  private static instance: YouTubeQuotaManager;
  private cachedStats: {
    data: any,
    timestamp: number
  } | null = null;
  private cachedVideos: {
    data: any[],
    timestamp: number
  } | null = null;

  // Cache duration: 1 hour
  private CACHE_DURATION = 1 * 60 * 60 * 1000;
  private CACHE_RECENT_VIDEOS_DURATION = 15 * 60 * 1000; // 15 minutes for recent videos

  private constructor() {}

  public static getInstance(): YouTubeQuotaManager {
    if (!this.instance) {
      this.instance = new YouTubeQuotaManager();
    }
    return this.instance;
  }

  // Cached channel stats retrieval
  public async getChannelStats(accessToken: string) {
    // Check if cached data is still valid
    if (this.cachedStats && 
        (Date.now() - this.cachedStats.timestamp) < this.CACHE_DURATION) {
      return this.cachedStats.data;
    }

    try {
      const stats = await YouTubeService.getChannelStats(accessToken);
      
      // Cache the stats
      this.cachedStats = {
        data: stats,
        timestamp: Date.now()
      };

      return stats;
    } catch (error) {
      // Return cached data if available
      return this.cachedStats?.data || null;
    }
  }

  // Cached recent videos retrieval
  public async getRecentVideos(accessToken: string, maxResults = 10) {
    // Check if cached data is still valid
    if (this.cachedVideos && 
        (Date.now() - this.cachedVideos.timestamp) < this.CACHE_RECENT_VIDEOS_DURATION) {
      return this.cachedVideos.data;
    }

    try {
      const videos = await YouTubeService.getRecentVideos(accessToken, maxResults);
      
      // Cache the videos
      this.cachedVideos = {
        data: videos.items || [],
        timestamp: Date.now()
      };

      return videos.items || [];
    } catch (error) {
      // Return cached data if available
      return this.cachedVideos?.data || [];
    }
  }

  // Clear cache method
  public clearCache() {
    this.cachedStats = null;
    this.cachedVideos = null;
  }
}