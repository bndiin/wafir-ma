"use client";

import { useTranslations } from "next-intl";
import {
  LayoutGrid,
  FileText,
  User,
  Phone,
  BarChart3,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ComparatorStep } from "@/types/comparator";

interface StepProgressProps {
  currentStep: ComparatorStep;
  completedSteps: ComparatorStep[];
}

const STEP_ICONS = [LayoutGrid, FileText, User, Phone, BarChart3] as const;

export function StepProgress({ currentStep, completedSteps }: StepProgressProps) {
  const t = useTranslations("comparator");

  const steps = [
    { number: 1 as ComparatorStep, label: t("step1") },
    { number: 2 as ComparatorStep, label: t("step2") },
    { number: 3 as ComparatorStep, label: t("step3") },
    { number: 4 as ComparatorStep, label: t("step4") },
    { number: 5 as ComparatorStep, label: t("step5") },
  ];

  return (
    <nav aria-label="Progress" className="w-full">
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = STEP_ICONS[index];
          const isActive = step.number === currentStep;
          const isCompleted = completedSteps.includes(step.number);
          const isPast = step.number < currentStep;

          return (
            <li
              key={step.number}
              className={cn(
                "flex flex-1 items-center",
                index < steps.length - 1 && "relative"
              )}
            >
              {/* Step circle + label */}
              <div className="flex flex-col items-center gap-1.5 relative z-10">
                <div
                  className={cn(
                    "flex size-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                    isActive &&
                      "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-110",
                    isCompleted &&
                      "border-primary bg-primary text-primary-foreground",
                    !isActive &&
                      !isCompleted &&
                      "border-muted-foreground/30 bg-background text-muted-foreground"
                  )}
                >
                  {isCompleted && !isActive ? (
                    <Check className="size-5" strokeWidth={2.5} />
                  ) : (
                    <Icon className="size-5" />
                  )}
                </div>
                {/* Label: hidden on mobile, visible on md+ */}
                <span
                  className={cn(
                    "hidden text-xs font-medium text-center max-w-[80px] leading-tight md:block",
                    isActive && "text-primary font-semibold",
                    isCompleted && isPast && "text-primary",
                    !isActive && !isCompleted && "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 h-0.5 self-start mt-5">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      isPast || isCompleted
                        ? "bg-primary"
                        : "bg-muted-foreground/20"
                    )}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
