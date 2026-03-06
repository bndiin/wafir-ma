"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calculator,
  FileText,
  Bell,
  Heart,
  MessageSquare,
  User,
  Menu,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    label: "Tableau de bord",
    href: "/mon-compte",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "Mes simulations",
    href: "/mon-compte/simulations",
    icon: Calculator,
  },
  {
    label: "Mes devis",
    href: "/mon-compte/devis",
    icon: FileText,
  },
  {
    label: "Mes alertes",
    href: "/mon-compte/alertes",
    icon: Bell,
  },
  {
    label: "Favoris",
    href: "/mon-compte/favoris",
    icon: Heart,
  },
  {
    label: "Messages",
    href: "/mon-compte/messages",
    icon: MessageSquare,
  },
  {
    label: "Mon profil",
    href: "/mon-compte/profil",
    icon: User,
  },
];

function NavContent({
  pathname,
  locale,
  onItemClick,
}: {
  pathname: string;
  locale: string;
  onItemClick?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      {/* User Info */}
      <div className="flex items-center gap-3 px-4 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
          KA
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">
            Karim Amrani
          </p>
          <p className="truncate text-xs text-muted-foreground">
            karim.amrani@email.com
          </p>
        </div>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const fullHref = `/${locale}${item.href}`;
          const isActive = item.exact
            ? pathname === fullHref
            : pathname.startsWith(fullHref);

          return (
            <Link
              key={item.href}
              href={fullHref}
              onClick={onItemClick}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Separator />

      {/* Footer */}
      <div className="space-y-1 px-3 py-4">
        <Link
          href={`/${locale}`}
          onClick={onItemClick}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          Retour au site
        </Link>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
          <LogOut className="h-4 w-4 shrink-0" />
          Déconnexion
        </button>
      </div>
    </div>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Extract locale from pathname (e.g., /fr/mon-compte -> fr)
  const locale = pathname.split("/")[1] || "fr";

  return (
    <>
      {/* Mobile trigger button */}
      <div className="sticky top-0 z-40 flex items-center gap-3 border-b bg-background px-4 py-3 md:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="shrink-0">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <NavContent
              pathname={pathname}
              locale={locale}
              onItemClick={() => setMobileOpen(false)}
            />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xs">
            W
          </div>
          <span className="text-sm font-semibold text-foreground">
            Mon Espace
          </span>
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-[250px] md:shrink-0 md:flex-col md:border-r md:bg-card">
        <div className="sticky top-0 flex h-screen flex-col overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center gap-2 px-4 py-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              W
            </div>
            <span className="text-lg font-bold text-foreground">
              Wafir<span className="text-primary">.ma</span>
            </span>
          </div>

          <Separator />

          <NavContent pathname={pathname} locale={locale} />
        </div>
      </aside>
    </>
  );
}
