"use client";

import { useTranslations } from "next-intl";
import { AnimatedCounter } from "./animated-counter";

export function StatsSection() {
  const t = useTranslations("home.statsSection");

  return (
    <section className="relative bg-[#1a1a2e] py-16 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00b894]/10 via-[#0984e3]/10 to-[#6c5ce7]/10 animate-gradient-shift" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <AnimatedCounter end={10000} prefix="+" suffix="" label={t("simulations")} />
          <AnimatedCounter end={40} prefix="+" suffix="" label={t("partners")} />
          <AnimatedCounter end={12} suffix="" label={t("cities")} />
          <AnimatedCounter end={35} suffix="%" label={t("savings")} />
        </div>
      </div>
    </section>
  );
}
