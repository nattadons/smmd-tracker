// src/components/TiktokDashboard.tsx
"use client"

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TiktokDashboard() {
  const [timeFilter, setTimeFilter] = useState("This Week");
  const router = useRouter();

  const handleReviewClick = () => {
    router.push(`/dashboard/followers-chart`);
  };

  return (
    <div className="w-full">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Followers Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-semibold">Followers</h4>
            <div className="relative">
              <select
                className="bg-white border border-gray-200 rounded-md px-3 py-1 appearance-none pr-8 text-sm text-gray-700"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option>This Week</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="h-64 w-full">
            {/* TikTok-styled chart placeholder */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  TikTok followers chart placeholder
                </div>
                {/* TikTok-styled bar visualization */}
                <div className="absolute bottom-0 left-0 w-full h-1/2">
                  <div className="h-full w-full flex items-end">
                    <div className="h-1/2 w-1/6 bg-pink-500 mx-1 rounded-t"></div>
                    <div className="h-full w-1/6 bg-pink-500 mx-1 rounded-t"></div>
                    <div className="h-3/4 w-1/6 bg-pink-500 mx-1 rounded-t"></div>
                    <div className="h-2/3 w-1/6 bg-pink-500 mx-1 rounded-t"></div>
                    <div className="h-5/6 w-1/6 bg-pink-500 mx-1 rounded-t"></div>
                    <div className="h-4/5 w-1/6 bg-pink-500 mx-1 rounded-t"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button onClick={handleReviewClick} className="font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all">
            Review
          </button>
        </div>

        {/* Engagement Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-semibold">Engagement Rate</h4>
            <div className="relative">
              <select
                className="bg-white border border-gray-200 rounded-md px-3 py-1 appearance-none pr-8 text-sm text-gray-700"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option>This Week</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="h-64 w-full">
            {/* TikTok-styled engagement chart */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  TikTok engagement rate data
                </div>
                {/* Line chart representation */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                  <path
                    d="M0,45 L20,35 L40,20 L60,30 L80,10 L100,5"
                    stroke="#FF0050"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M0,45 L20,35 L40,20 L60,30 L80,10 L100,5"
                    stroke="#00F2EA"
                    strokeWidth="1"
                    strokeDasharray="4 2"
                    fill="none"
                    opacity="0.6"
                  />
                </svg>
              </div>
            </div>
          </div>
          <button className="font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all">
            Review
          </button>
        </div>

        {/* Video Performance Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-semibold">Video Performance</h4>
            <div className="relative">
              <select
                className="bg-white border border-gray-200 rounded-md px-3 py-1 appearance-none pr-8 text-sm text-gray-700"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option>This Week</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="h-64 w-full">
            {/* Placeholder for the chart */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Video views and engagement data
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1/2">
                  <div className="h-full w-full flex items-end">
                    <div className="h-3/4 w-1/6 bg-black mx-1 rounded-t"></div>
                    <div className="h-1/2 w-1/6 bg-black mx-1 rounded-t"></div>
                    <div className="h-full w-1/6 bg-black mx-1 rounded-t"></div>
                    <div className="h-2/3 w-1/6 bg-black mx-1 rounded-t"></div>
                    <div className="h-5/6 w-1/6 bg-black mx-1 rounded-t"></div>
                    <div className="h-1/3 w-1/6 bg-black mx-1 rounded-t"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all">
            Review
          </button>
        </div>

        {/* Audience Demographics */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-semibold">Audience Demographics</h4>
            <div className="relative">
              <select
                className="bg-white border border-gray-200 rounded-md px-3 py-1 appearance-none pr-8 text-sm text-gray-700"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option>This Week</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="h-64 w-full">
            {/* Placeholder for demographics chart */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Audience demographics data
                </div>
                {/* Simple demographics visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden">
                    <div className="h-full w-full flex">
                      <div style={{width: '35%'}} className="h-full bg-blue-500"></div>
                      <div style={{width: '65%'}} className="h-full bg-pink-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all">
            Review
          </button>
        </div>
      </div>

      {/* Recent Videos Section */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
        <h4 className="text-xl font-semibold mb-6">Recent Videos</h4>

        {/* Video Item */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src="/images/tiktok.svg"
                alt="Video thumbnail"
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h5 className="font-medium text-lg mb-1">
                #trending #dance TikTok Challenge
              </h5>
              <p className="text-gray-500 text-sm mb-4">Posted 2 days ago</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>2.5K</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>350</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>980</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>15.2K</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className="font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all">
          See All Videos
        </button>
      </div>
    </div>
  );
}