"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
// Add this to your imports
import { useYoutubeAuth } from '@/hooks/useYoutubeAuth';
// กำหนด type สำหรับ platforms ที่รองรับ
export type SocialPlatform = "youtube" | "tiktok" | "twitter";

// กำหนดรูปแบบข้อมูลที่จะเก็บใน context
interface SocialPlatformContextType {
    activePlatform: SocialPlatform;
    setActivePlatform: (platform: SocialPlatform) => void;
    connections: Record<SocialPlatform, boolean>;
    setConnections: React.Dispatch<React.SetStateAction<Record<SocialPlatform, boolean>>>;
    handleConnectDisconnect: () => void;
    youtubeAuth: ReturnType<typeof useYoutubeAuth>; // Add this
}

// สร้าง context
const SocialPlatformContext = createContext<SocialPlatformContextType | undefined>(undefined);

// สร้าง provider component
export const SocialPlatformProvider = ({ children }: { children: ReactNode }) => {
    // State เก็บสถานะการเชื่อมต่อของแต่ละแพลตฟอร์ม
    const [connections, setConnections] = useState<Record<SocialPlatform, boolean>>({
        youtube: false,
        tiktok: false,
        twitter: false
    });

    // State เก็บแพลตฟอร์มที่กำลังใช้งานอยู่
    const [activePlatform, setActivePlatform] = useState<SocialPlatform>("youtube");
    const router = useRouter(); // ใช้ useRouter เพื่อนำทาง



    // โหลด connection status จาก localStorage เมื่อ component mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedConnections = {
                youtube: localStorage.getItem("youtube") === "true",
                tiktok: localStorage.getItem("tiktok") === "true",
                twitter: localStorage.getItem("twitter") === "true"
            };

            setConnections(savedConnections);
        }
    }, []);

    // บันทึก connection status ลง localStorage เมื่อมีการเปลี่ยนแปลง
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem("youtube", connections.youtube.toString());
            localStorage.setItem("tiktok", connections.tiktok.toString());
            localStorage.setItem("twitter", connections.twitter.toString());
        }
    }, [connections]);


    // ตรวจจับการเปลี่ยนแปลงของ connections และนำทางเมื่อ disconnect
    useEffect(() => {
        if (!connections[activePlatform]) {
            router.push("/dashboard"); // นำทางเมื่อแพลตฟอร์มปัจจุบันถูก disconnect
        }
    }, [connections, activePlatform, router]);


    // Add YouTube auth hook
    const youtubeAuth = useYoutubeAuth();
    // Handler สำหรับเชื่อมต่อ/ตัดการเชื่อมต่อแพลตฟอร์ม
    // Update your handleConnectDisconnect function
    const handleConnectDisconnect = () => {
        if (activePlatform === "youtube") {
            if (connections.youtube) {
                // Disconnect YouTube
                youtubeAuth.disconnect();
            } else {
                // Connect YouTube
                youtubeAuth.connect();
            }
        } else {
            // Handle other platforms as before
            setConnections(prev => ({
                ...prev,
                [activePlatform]: !prev[activePlatform]
            }));
        }
    };
    // Sync YouTube auth state with connections state
    useEffect(() => {
        if (youtubeAuth.isAuthenticated !== connections.youtube) {
            setConnections(prev => ({
                ...prev,
                youtube: youtubeAuth.isAuthenticated
            }));
        }
    }, [youtubeAuth.isAuthenticated]);


    return (
        <SocialPlatformContext.Provider
            value={{
                activePlatform,
                setActivePlatform,
                connections,
                setConnections,
                handleConnectDisconnect,
                youtubeAuth // Expose YouTube auth to consumers
            }}
        >
            {children}
        </SocialPlatformContext.Provider>
    );
};

// สร้าง custom hook สำหรับการใช้งาน context
export const useSocialPlatform = () => {
    const context = useContext(SocialPlatformContext);
    if (context === undefined) {
        throw new Error("useSocialPlatform must be used within a SocialPlatformProvider");
    }
    return context;
};