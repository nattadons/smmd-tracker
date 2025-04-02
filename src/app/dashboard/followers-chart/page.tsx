"use client"

import { useRouter } from "next/navigation";
import { useSocialPlatform } from "@/contexts/SocialPlatformContext";

export default function FollowersChartDetail() {
  const router = useRouter();
  const { activePlatform } = useSocialPlatform();
  
  return (
    <div className="w-full mx-auto ">
      <h1 className="text-2xl font-bold mb-6">
        {activePlatform.charAt(0).toUpperCase() + activePlatform.slice(1)} Followers Chart Details
      </h1>
      
      {/* Add your detailed chart view here */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="h-96 w-full bg-gray-100 rounded-lg flex items-center justify-center mb-6">
          <p className="text-gray-500">Detailed {activePlatform} followers chart will go here</p>
        </div>
        
        <div className="mt-8">
          <button 
            onClick={() => router.back()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}