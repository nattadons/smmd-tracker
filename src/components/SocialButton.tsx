"use client";
import React from "react";


// กำหนด type สำหรับ platforms ที่รองรับ
type SocialPlatform = "facebook" | "instagram" | "twitter";



interface SocialButtonProps {
  id: SocialPlatform;
  label: string;
  color: string;
  iconColor: string;
  iconPath: string;
  isActive: boolean;
  isConnected: boolean;
  onActivate: (id: SocialPlatform) => void;
}

export default function SocialButton({
  id,
  label,
  color,
  iconColor,
  iconPath,
  isActive,
  isConnected = false, // default value
  onActivate,
}: SocialButtonProps) {
  return (
    <button
      className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-all ${
        isActive ? `bg-gradient-to-r ${color} text-white shadow-md` : "bg-gray-100 text-gray-600"
      }`}
      onClick={() => onActivate(id)}
    >
      <span className={isActive ? "text-white" : iconColor}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d={iconPath} />
        </svg>
      </span>
      <span>{label}</span>
      
      {/* แสดงไอคอนสถานะการเชื่อมต่อ */}
      {isConnected && (
        <span className="ml-1 text-white bg-green-500 rounded-full w-3 h-3 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
      )}
    </button>
  );
}