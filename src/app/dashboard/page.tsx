"use client";

import { useSocialPlatform } from "@/contexts/SocialPlatformContext";
import FacebookDashboard from "@/components/FacebookDashboard";


export default function DashboardPage() {
  const { activePlatform, connections } = useSocialPlatform();

  // Render dashboard based on the selected platform
  const renderDashboard = () => {
    if (connections[activePlatform]) {
      switch (activePlatform) {
        case "facebook":
          return <FacebookDashboard  />;
        case "instagram":
          // return <InstagramDashboard />; 
          return <div className="w-full p-8 bg-white rounded-2xl shadow-xl">Instagram Dashboard (Coming Soon)</div>;
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