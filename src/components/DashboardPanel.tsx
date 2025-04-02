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
            id="facebook"
            label="Facebook"
            color="from-purple-500 to-purple-400"
            iconColor="text-blue-600"
            iconPath="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z"
            isActive={activePlatform === "facebook"}
            onActivate={handleActivate}
            isConnected={connections.facebook}
          />
          <SocialButton
            id="instagram"
            label="Instagram"
            color="from-pink-500 to-purple-400"
            iconColor="text-pink-600"
            iconPath="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.04 0 2.67.01 2.986.058 4.04.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.04.058 2.67 0 2.987-.01 4.04-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.04 0-2.67-.01-2.986-.058-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.058-4.04-.058zm0 3.063a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 8.468a3.333 3.333 0 100-6.666 3.333 3.333 0 000 6.666zm6.538-8.669a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z"
            isActive={activePlatform === "instagram"}
            onActivate={handleActivate}
            isConnected={connections.instagram}
          />
          <SocialButton
            id="twitter"
            label="Twitter"
            color="from-blue-400 to-blue-500"
            iconColor="text-blue-500"
            iconPath="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
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