// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 animate-gradient-x"></div>
      
      <div className="text-center relative z-10">
        {/* Logo และชื่อ */}
        <div className="flex items-center justify-center mb-[100px]">
          <div className="ml-3">
            <Image
              src="/images/smmd.png"
              alt="SMMD Logo"
              width={500} 
              height={0}
            />
          </div>
        </div>

        {/* Welcome Text */}
        <h3 className="text-4xl font-medium text-white mb-6 drop-shadow-md">
          Welcome, Content Creators!
        </h3>

        {/* Description */}
        <p className="text-xl text-white max-w-lg mx-auto mb-16 drop-shadow-md">
          Take control of your content with a powerful and intuitive dashboard
          designed just for you.
        </p>

        {/* Button */}
        <Link
          href="/dashboard"
          className="inline-block bg-gradient-to-r from-pink-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 transition-colors text-white font-medium py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl"
        >
          Next to Dashboard
        </Link>
      </div>
    </div>
  );
}