"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
// กำหนด type สำหรับ platforms ที่รองรับ
export type SocialPlatform = "facebook" | "instagram" | "twitter";

// กำหนดรูปแบบข้อมูลที่จะเก็บใน context
interface SocialPlatformContextType {
    activePlatform: SocialPlatform;
    setActivePlatform: (platform: SocialPlatform) => void;
    connections: Record<SocialPlatform, boolean>;
    setConnections: React.Dispatch<React.SetStateAction<Record<SocialPlatform, boolean>>>;
    handleConnectDisconnect: () => void;
}

// สร้าง context
const SocialPlatformContext = createContext<SocialPlatformContextType | undefined>(undefined);

// สร้าง provider component
export const SocialPlatformProvider = ({ children }: { children: ReactNode }) => {
    // State เก็บสถานะการเชื่อมต่อของแต่ละแพลตฟอร์ม
    const [connections, setConnections] = useState<Record<SocialPlatform, boolean>>({
        facebook: false,
        instagram: false,
        twitter: false
    });

    // State เก็บแพลตฟอร์มที่กำลังใช้งานอยู่
    const [activePlatform, setActivePlatform] = useState<SocialPlatform>("facebook");
    const router = useRouter(); // ใช้ useRouter เพื่อนำทาง
    // โหลด connection status จาก localStorage เมื่อ component mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedConnections = {
                facebook: localStorage.getItem("facebook") === "true",
                instagram: localStorage.getItem("instagram") === "true",
                twitter: localStorage.getItem("twitter") === "true"
            };

            setConnections(savedConnections);
        }
    }, []);

    // บันทึก connection status ลง localStorage เมื่อมีการเปลี่ยนแปลง
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem("facebook", connections.facebook.toString());
            localStorage.setItem("instagram", connections.instagram.toString());
            localStorage.setItem("twitter", connections.twitter.toString());
        }
    }, [connections]);


    // ตรวจจับการเปลี่ยนแปลงของ connections และนำทางเมื่อ disconnect
    useEffect(() => {
        if (!connections[activePlatform]) {
            router.push("/dashboard"); // นำทางเมื่อแพลตฟอร์มปัจจุบันถูก disconnect
        }
    }, [connections, activePlatform, router]);
    // Handler สำหรับเชื่อมต่อ/ตัดการเชื่อมต่อแพลตฟอร์ม
    const handleConnectDisconnect = () => {
        setConnections(prev => ({
            ...prev,
            [activePlatform]: !prev[activePlatform]
        }));
    };


    return (
        <SocialPlatformContext.Provider
            value={{
                activePlatform,
                setActivePlatform,
                connections,
                setConnections,
                handleConnectDisconnect
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