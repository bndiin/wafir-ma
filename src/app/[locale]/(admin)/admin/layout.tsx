"use client";

import { AdminSidebar } from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex overflow-hidden bg-[#f5f6fa]">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b bg-white px-4 md:px-8">
          <div className="pl-10 md:pl-0">
            <h2 className="text-sm font-semibold text-[#1a1a2e]">
              Panneau d&apos;administration
            </h2>
            <p className="text-xs text-muted-foreground">
              Wafir.ma — Gestion plateforme
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-[#1a1a2e]">Issam Admin</p>
              <p className="text-xs text-muted-foreground">Super Admin</p>
            </div>
            <div className="flex size-9 items-center justify-center rounded-full bg-[#00b894] text-xs font-bold text-white">
              IA
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
