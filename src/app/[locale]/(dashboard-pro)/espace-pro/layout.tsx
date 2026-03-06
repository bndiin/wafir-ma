"use client";

import { use } from "react";
import { ProSidebar } from "@/components/dashboard-pro/sidebar";

export default function EspaceProLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  return (
    <div className="flex min-h-screen bg-muted/30">
      <ProSidebar locale={locale} />
      <div className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
