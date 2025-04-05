"use client"

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSocialPlatform } from "@/contexts/SocialPlatformContext";

export default function YoutubeDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recentVideos, setRecentVideos] = useState<any[]>([]);

  const router = useRouter();
  const { youtubeAuth } = useSocialPlatform();

  const loadYouTubeData = useCallback(async () => {
    if (!youtubeAuth.isAuthenticated) return;

    setIsLoading(true);
    try {
      // Only fetch stats if not already loaded
      if (!stats) {
        const channelStats = await youtubeAuth.fetchChannelStats();
        setStats(channelStats);
      }

      // Fetch recent videos
      const recentVideosData = await youtubeAuth.fetchRecentVideos(5);

      // Update recent videos state
      if (recentVideosData && recentVideosData.length > 0) {
        setRecentVideos(recentVideosData);
      }
    } catch (error) {
      console.error("Error fetching YouTube data:", error);
      setRecentVideos([]);
    } finally {
      setIsLoading(false);
    }
  }, [youtubeAuth.isAuthenticated]);

  // Memoize the initial data load effect
  useEffect(() => {
    if (youtubeAuth.isAuthenticated) {
      loadYouTubeData();
    }
  }, [youtubeAuth.isAuthenticated, loadYouTubeData]);

  // Memoize handlers and components to prevent unnecessary re-renders
  const handleReviewClick = useCallback(() => {
    router.push(`/dashboard/followers-chart`);
  }, [router]);

  const StatCard = useMemo(() => ({ title, value, subtitle, chart, onReview }) => (
    <div className="bg-white rounded-3xl shadow-xl p-6 transition-all hover:scale-[1.02] hover:shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xl font-semibold text-gray-800">{title}</h4>
      </div>

      <div className="mb-6">
        <div className="text-4xl font-bold text-center text-indigo-700">
          {value}
        </div>
        <div className="text-sm text-gray-500 text-center mt-2">{subtitle}</div>
      </div>

      <div className="h-48 w-full mb-4">
        <div className="w-full h-full flex items-center justify-center">
          {chart}
        </div>
      </div>

      <button
        onClick={onReview}
        className="w-full bg-indigo-50 text-indigo-600 font-medium py-3 rounded-full 
        hover:bg-indigo-100 transition-colors"
      >
        Review
      </button>
    </div>
  ), []);

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full p-8 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl shadow-2xl">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
        </div>
      </div>
    );
  }

  // Render dashboard content
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Subscribers */}
        <StatCard
          title="Subscribers"
          value={stats?.subscriberCount ? Number(stats.subscriberCount).toLocaleString() : '0'}
          subtitle="Total Subscribers"
          chart={
            <div className="w-full h-36 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg relative">
              <div className="absolute inset-0 flex items-end justify-around p-2">
                {[30, 50, 40, 60, 45, 55].map((height, i) => (
                  <div
                    key={i}
                    className="w-4 bg-purple-500 rounded-t-md"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
            </div>
          }
          onReview={handleReviewClick}
        />

        {/* Views */}
        <StatCard
          title="Total Views"
          value={stats?.viewCount ? Number(stats.viewCount).toLocaleString() : '0'}
          subtitle="Lifetime Views"
          chart={
            <svg className="w-full h-36" viewBox="0 0 100 50" preserveAspectRatio="none">
              <path
                d="M0,40 L20,35 L40,30 L60,20 L80,15 L100,10"
                stroke="#10B981"
                strokeWidth="3"
                fill="none"
              />
              <rect x="0" y="0" width="100" height="50" fill="url(#gradient)" opacity="0.1" />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          }
          onReview={() => {}}
        />

        {/* Video Count */}
        <StatCard
          title="Video Count"
          value={stats?.videoCount ? Number(stats.videoCount).toLocaleString() : '0'}
          subtitle="Total Published Videos"
          chart={
            <div className="w-full h-36 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center">
              <div className="grid grid-cols-6 gap-2 w-4/5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-blue-500 rounded-sm"
                    style={{
                      height: `${Math.floor(Math.random() * 50) + 20}px`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          }
          onReview={() => {}}
        />

        {/* Engagement */}
        <StatCard
          title="Engagement"
          value={`${stats?.likeCount || '0'} Likes`}
          subtitle={`${stats?.commentCount || '0'} Comments`}
          chart={
            <div className="w-full h-36 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg flex items-center justify-around px-4">
              <div className="flex flex-col items-center">
                <div
                  className="w-16 bg-blue-500 rounded-t-lg"
                  style={{ height: '80%' }}
                ></div>
                <span className="text-xs mt-2 text-gray-600">Likes</span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className="w-16 bg-green-500 rounded-t-lg"
                  style={{ height: '60%' }}
                ></div>
                <span className="text-xs mt-2 text-gray-600">Comments</span>
              </div>
            </div>
          }
          onReview={() => {}}
        />
      </div>

      {/* Recent Videos Section */}
      <div className="mt-8 bg-white rounded-3xl shadow-xl p-6">
        <h4 className="text-2xl font-semibold mb-6 text-gray-800">Recent Videos</h4>

        {recentVideos && recentVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentVideos.map((video) => (
              <div
                key={video.id}
                className="bg-gray-100 rounded-lg p-4"
              >
                <div className="mb-2">
                  <h5 className="text-lg font-medium">{video.snippet?.title || 'Untitled Video'}</h5>
                  <p className="text-sm text-gray-500 mt-1 truncate">
                    {video.snippet?.description || 'No description'}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Views:</span>
                    <span className="font-semibold">{video.statistics?.viewCount || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Likes:</span>
                    <span className="font-semibold">{video.statistics?.likeCount || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Comments:</span>
                    <span className="font-semibold">{video.statistics?.commentCount || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Published:</span>
                    <span className="font-semibold">
                      {video.snippet?.publishedAt 
                        ? new Date(video.snippet.publishedAt).toLocaleDateString() 
                        : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-gray-100 rounded-lg mb-6">
            <p className="text-lg text-gray-700">Your recent YouTube videos will appear here</p>
            <p className="text-sm text-gray-500 mt-2">
              Connect to YouTube Analytics to see more detailed data
            </p>
          </div>
        )}
        <button className="w-full bg-indigo-600 text-white font-medium py-3 rounded-full 
        hover:bg-indigo-700 transition-colors mt-6">
          View All Videos
        </button>
      </div>
    </div>
  );
}