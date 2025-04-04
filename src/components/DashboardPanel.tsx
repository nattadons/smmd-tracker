"use client";

import Image from "next/image";
import SocialButton from "@/components/SocialButton";
import { useSocialPlatform } from "@/contexts/SocialPlatformContext";


export default function Dashboard({ children }: { children: React.ReactNode }) {
  const { activePlatform, setActivePlatform, connections, handleConnectDisconnect } = useSocialPlatform();

  // Handler สำหรับเลือกแพลตฟอร์ม
  const handleActivate = (id: typeof activePlatform) => {
    setActivePlatform(id);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-[50px]">
      {/* Logo */}
      <div className="text-center mb-[50px]">
        <Image src="/images/smmd.png" alt="SMMD Logo" width={500} height={0} />
      </div>

      {/* Dashboard Content */}
      <div className="bg-white rounded-2xl shadow-xl min-h-[180px] w-full p-8 mb-8">
        <h3 className="text-[28px] font-semibold text-gray-800 mb-8">
          Dashboard
        </h3>

        {/* Social Media Buttons */}
        <div className="flex flex-wrap gap-4">
          <SocialButton
            id="youtube"
            label="youtube"
            color="from-pink-300 to-red-500"
            iconColor="text-blue-600"
            icon={{
              type: 'png', 
              path: "/images/youtube.svg"
            }}
            isActive={activePlatform === "youtube"}
            onActivate={handleActivate}
            isConnected={connections.youtube}
          />
          <SocialButton
            id="tiktok"
            label="tiktok"
            color="from-purple-400 to-pink-500"
            iconColor="text-pink-600"
            icon={{
              type: 'png', 
              path: "/images/tiktok.svg"
            }}
            isActive={activePlatform === "tiktok"}
            onActivate={handleActivate}
            isConnected={connections.tiktok}
          />
          <SocialButton
            id="twitter"
            label="twitter"
            color="from-blue-400 to-blue-500"
            iconColor="text-blue-500"
            icon={{
              type: 'png', 
              path: "/images/Twitter.png"
            }}
            isActive={activePlatform === "twitter"}
            onActivate={handleActivate}
            isConnected={connections.twitter}
          />
        </div>
      </div>
      
      {/* Child Content - This will be the dashboard content */}
      {children}
      
      <div className="mt-6">
        <button 
          className={`font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all ${
            connections[activePlatform] 
              ? "bg-red-500 hover:bg-red-600 text-white" 
              : "bg-purple-500 hover:bg-purple-600 text-white"
          }`}
          onClick={handleConnectDisconnect}
        >
          {connections[activePlatform] 
            ? `Disconnect ${activePlatform.charAt(0).toUpperCase() + activePlatform.slice(1)}` 
            : `Connect ${activePlatform.charAt(0).toUpperCase() + activePlatform.slice(1)} Dashboard`}
        </button>
      </div>
    </div>
  );
}