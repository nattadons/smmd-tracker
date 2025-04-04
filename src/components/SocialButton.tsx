"use client";
import React from "react";
import Image from "next/image";

// กำหนด type สำหรับ platforms ที่รองรับ
type SocialPlatform = "youtube" | "tiktok" | "twitter";

interface SocialButtonProps {
  id: SocialPlatform;
  label: string;
  color: string;
  iconColor: string;
  icon: {
    type: 'svg' | 'png';
    path: string;  // สำหรับ SVG path หรือ PNG image path
  };
  isActive: boolean;
  isConnected: boolean;
  onActivate: (id: SocialPlatform) => void;
}

export default function SocialButton({
  id,
  label,
  color,
  iconColor,
  icon,
  isActive,
  isConnected = false,
  onActivate,
}: SocialButtonProps) {
  const renderIcon = () => {
    if (icon.type === 'svg') {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d={icon.path} />
        </svg>
      );
    }
    
    return (
      <Image 
        src={icon.path} 
        alt={`${label} icon`} 
        width={20} 
        height={20} 
        className="object-contain"
      />
    );
  };

  return (
    <button
      className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-all ${
        isActive ? `bg-gradient-to-r ${color} text-white shadow-md` : "bg-gray-100 text-gray-600"
      }`}
      onClick={() => onActivate(id)}
    >
      <span className={isActive ? "text-white" : iconColor}>
        {renderIcon()}
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