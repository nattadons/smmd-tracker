"use client";

import { useSocialPlatform } from "@/contexts/SocialPlatformContext";
import YoutubeDashboard from "@/components/YoutubeDashboard";
import TiktokDashboard from "@/components/TiktokDashboard";
import TwitterDashboard from "@/components/TwitterDashboard";
export default function DashboardPage() {
  const { activePlatform, connections } = useSocialPlatform();

  // Render dashboard based on the selected platform
  const renderDashboard = () => {
    if (connections[activePlatform]) {
      switch (activePlatform) {
        case "youtube":
          return <YoutubeDashboard  />;
        case "tiktok":
          // return <TiktokDashboard />; 
          return <TiktokDashboard/>;
        case "twitter":
          // return <TwitterDashboard />;
          return <div className="w-full p-8 bg-white rounded-2xl shadow-xl">Twitter Dashboard (Coming Soon)</div>;
        default:
          return null;
      }
    }
    return (
      <div className="w-full flex items-center justify-center px-8 bg-white rounded-2xl shadow-xl min-h-40">
        <p className="text-center text-gray-500">
          Connect to {activePlatform.charAt(0).toUpperCase() + activePlatform.slice(1)} to view dashboard
        </p>
      </div>
    );
  };

  return (
    <div >
      {/* Render the appropriate dashboard */}

      {renderDashboard()}
    </div>
  );
}