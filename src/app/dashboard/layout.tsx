"use client";

import Dashboard from "@/components/DashboardPanel";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Dashboard>
      <main className="w-full">{children}</main>
    </Dashboard>
  );
}