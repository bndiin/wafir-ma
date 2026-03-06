"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  UserCircle,
  Star,
  BarChart3,
  CreditCard,
  Menu,
  X,
  LogOut,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const PRO_NAV_ITEMS = [
  {
    label: "Tableau de bord",
    href: "/espace-pro",
    icon: LayoutDashboard,
  },
  {
    label: "Leads",
    href: "/espace-pro/leads",
    icon: Inbox,
  },
  {
    label: "Mon profil",
    href: "/espace-pro/profil",
    icon: UserCircle,
  },
  {
    label: "Avis clients",
    href: "/espace-pro/avis",
    icon: Star,
  },
  {
    label: "Analytics",
    href: "/espace-pro/analytics",
    icon: BarChart3,
  },
  {
    label: "Abonnement",
    href: "/espace-pro/abonnement",
    icon: CreditCard,
  },
] as const;

function SidebarContent({ locale, onItemClick }: { locale: string; onItemClick?: () => void }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    const fullHref = `/${locale}${href}`;
    if (href === "/espace-pro") {
      return pathname === fullHref;
    }
    return pathname.startsWith(fullHref);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Logo / Branding */}
      <div className="flex items-center gap-3 px-4 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0984e3] text-white">
          <Building2 className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground">Wafir Pro</h2>
          <p className="text-xs text-muted-foreground">Espace professionnel</p>
        </div>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {PRO_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={`/${locale}${item.href}`}
              onClick={onItemClick}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-[#0984e3]/10 text-[#0984e3]"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0",
                  active ? "text-[#0984e3]" : "text-muted-foreground"
                )}
              />
              {item.label}
              {item.label === "Leads" && (
                <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-[#0984e3] px-1.5 text-[10px] font-bold text-white">
                  3
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <Separator />

      {/* User / Logout */}
      <div className="p-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0984e3]/10 text-sm font-bold text-[#0984e3]">
            WS
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">Wafasalaf</p>
            <p className="truncate text-xs text-muted-foreground">Plan PRO</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground">
          <LogOut className="h-4 w-4" />
          Se deconnecter
        </Button>
      </div>
    </div>
  );
}

export function ProSidebar({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r bg-card md:block">
        <div className="sticky top-0 h-screen overflow-y-auto">
          <SidebarContent locale={locale} />
        </div>
      </aside>

      {/* Mobile header bar */}
      <div className="sticky top-0 z-40 flex items-center gap-3 border-b bg-card px-4 py-3 md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0" showCloseButton={false}>
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <SidebarContent locale={locale} onItemClick={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0984e3] text-white">
            <Building2 className="h-4 w-4" />
          </div>
          <span className="text-sm font-bold">Wafir Pro</span>
        </div>
      </div>
    </>
  );
}
