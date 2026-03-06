"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import {
  Menu,
  X,
  ChevronDown,
  Calculator,
  Shield,
  CreditCard,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { NAV_LINKS } from "@/lib/constants";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);

  const otherLocales = ["fr", "ar", "en"].filter((l) => l !== locale);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
            W
          </div>
          <span className="text-xl font-bold text-foreground">
            Wafir<span className="text-primary">.ma</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Crédit Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-1">
                <CreditCard className="h-4 w-4" />
                {t("credit")}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {NAV_LINKS.credit.map((link) => (
                <DropdownMenuItem key={link.slug} asChild>
                  <Link href={`/${locale}/${link.slug}`}>
                    {t(link.slug === "credit-immobilier" ? "creditImmobilier" :
                       link.slug === "credit-consommation" ? "creditConsommation" :
                       link.slug === "credit-auto" ? "creditAuto" :
                       link.slug === "rachat-credit" ? "rachatCredit" : "mourabaha")}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Assurance Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-1">
                <Shield className="h-4 w-4" />
                {t("assurance")}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {NAV_LINKS.assurance.map((link) => (
                <DropdownMenuItem key={link.slug} asChild>
                  <Link href={`/${locale}/${link.slug}`}>
                    {t(link.slug === "assurance-auto" ? "assuranceAuto" :
                       link.slug === "assurance-habitation" ? "assuranceHabitation" :
                       link.slug === "mutuelle-sante" ? "mutuelleSante" :
                       link.slug === "assurance-vie" ? "assuranceVie" : "assuranceVoyage")}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Outils */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-1">
                <Calculator className="h-4 w-4" />
                {t("tools")}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              {NAV_LINKS.outils.map((link) => (
                <DropdownMenuItem key={link.slug} asChild>
                  <Link href={`/${locale}/outils/${link.slug}`}>
                    {link.labelFr}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" asChild>
            <Link href={`/${locale}/annuaire`}>{t("annuaire")}</Link>
          </Button>

          <Button variant="ghost" asChild>
            <Link href={`/${locale}/blog`}>{t("blog")}</Link>
          </Button>
        </nav>

        {/* Right side: CTA + Locale + Mobile */}
        <div className="flex items-center gap-2">
          {/* Locale Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {otherLocales.map((l) => (
                <DropdownMenuItem key={l} asChild>
                  <Link href={`/${l}`} locale={l}>
                    {l === "fr" ? "Français" : l === "ar" ? "العربية" : "English"}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Desktop CTA */}
          <Button asChild className="hidden md:inline-flex bg-primary hover:bg-primary/90">
            <Link href={`/${locale}/comparer`}>{t("compare")}</Link>
          </Button>

          <Button variant="outline" asChild className="hidden md:inline-flex">
            <Link href={`/${locale}/connexion`}>{t("login")}</Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={locale === "ar" ? "right" : "left"} className="w-80">
              <nav className="flex flex-col gap-4 mt-8">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {t("credit")}
                </p>
                {NAV_LINKS.credit.map((link) => (
                  <Link
                    key={link.slug}
                    href={`/${locale}/${link.slug}`}
                    className="text-base hover:text-primary transition-colors ps-3"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.labelFr}
                  </Link>
                ))}

                <DropdownMenuSeparator />

                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {t("assurance")}
                </p>
                {NAV_LINKS.assurance.map((link) => (
                  <Link
                    key={link.slug}
                    href={`/${locale}/${link.slug}`}
                    className="text-base hover:text-primary transition-colors ps-3"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.labelFr}
                  </Link>
                ))}

                <DropdownMenuSeparator />

                <Link
                  href={`/${locale}/outils`}
                  className="text-base font-medium hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("tools")}
                </Link>
                <Link
                  href={`/${locale}/annuaire`}
                  className="text-base font-medium hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("annuaire")}
                </Link>
                <Link
                  href={`/${locale}/blog`}
                  className="text-base font-medium hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("blog")}
                </Link>

                <DropdownMenuSeparator />

                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link href={`/${locale}/comparer`} onClick={() => setMobileOpen(false)}>
                    {t("compare")}
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/${locale}/connexion`} onClick={() => setMobileOpen(false)}>
                    {t("login")}
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
