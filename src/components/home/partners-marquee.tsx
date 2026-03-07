"use client";

import { useTranslations } from "next-intl";
import { AnimateOnScroll } from "@/components/shared/animate-on-scroll";

const PARTNERS = [
  "Attijariwafa Bank",
  "BMCE Bank of Africa",
  "Banque Populaire",
  "CIH Bank",
  "Crédit du Maroc",
  "Société Générale",
  "CFG Bank",
  "Bank Assafa",
  "Al Akhdar Bank",
  "Umnia Bank",
  "Wafa Assurance",
  "RMA Assurance",
  "AXA Assurance Maroc",
  "Saham Assurance",
  "Atlanta Assurance",
  "MAMDA",
  "MCMA",
  "Zurich Assurance",
  "Allianz Maroc",
  "Sanad Assurance",
  "Euler Hermes",
];

export function PartnersMarquee() {
  const t = useTranslations("home.partners");

  return (
    <section className="py-12 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <AnimateOnScroll>
          <h2 className="text-center text-xl md:text-2xl font-bold text-foreground">
            {t("title")}
          </h2>
        </AnimateOnScroll>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex animate-marquee whitespace-nowrap">
          {[...PARTNERS, ...PARTNERS].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="inline-flex items-center mx-6 px-5 py-2.5 rounded-full border bg-card text-sm font-medium text-muted-foreground whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
