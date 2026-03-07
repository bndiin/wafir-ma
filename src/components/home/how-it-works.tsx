"use client";

import { useTranslations } from "next-intl";
import { FileText, BarChart3, ThumbsUp } from "lucide-react";
import { AnimateOnScroll } from "@/components/shared/animate-on-scroll";

const STEPS = [
  { icon: FileText, color: "bg-[#00b894]", num: "01" },
  { icon: BarChart3, color: "bg-[#0984e3]", num: "02" },
  { icon: ThumbsUp, color: "bg-[#6c5ce7]", num: "03" },
] as const;

export function HowItWorks() {
  const t = useTranslations("home.howItWorks");

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <AnimateOnScroll>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {t("title")}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t("subtitle")}
          </p>
        </AnimateOnScroll>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {/* Connecting line (desktop only) */}
        <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-0.5 gradient-divider" />

        {STEPS.map((step, i) => (
          <AnimateOnScroll key={step.num} delay={i * 150}>
            <div className="relative flex flex-col items-center text-center">
              <div
                className={`${step.color} flex h-16 w-16 items-center justify-center rounded-full text-white text-xl font-bold mb-4 shadow-lg relative z-10`}
              >
                {step.num}
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">
                {t(`step${i + 1}Title` as "step1Title" | "step2Title" | "step3Title")}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                {t(`step${i + 1}Desc` as "step1Desc" | "step2Desc" | "step3Desc")}
              </p>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
