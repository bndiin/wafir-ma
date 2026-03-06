"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/lib/constants";
import type { ComparatorFormData } from "@/types/comparator";

interface Step1ProductProps {
  formData: ComparatorFormData;
  onUpdate: (data: Partial<ComparatorFormData>) => void;
}

// Products available in the comparator (exclude assurance-vie and assurance-voyage for now)
const COMPARATOR_PRODUCTS = CATEGORIES.filter(
  (c) =>
    c.slug !== "assurance-vie" && c.slug !== "assurance-voyage"
);

// Group products by category
const CREDIT_PRODUCTS = COMPARATOR_PRODUCTS.filter(
  (c) => c.group === "CREDIT"
);
const INSURANCE_PRODUCTS = COMPARATOR_PRODUCTS.filter(
  (c) => c.group === "ASSURANCE"
);
const PARTICIPATIVE_PRODUCTS = COMPARATOR_PRODUCTS.filter(
  (c) => c.group === "FINANCE_PARTICIPATIVE"
);

export function Step1Product({ formData, onUpdate }: Step1ProductProps) {
  const t = useTranslations("comparator");

  const handleSelect = (slug: string) => {
    onUpdate({ productType: slug });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          {t("step1Desc")}
        </h2>
        <p className="text-muted-foreground">
          {t("selectProduct")}
        </p>
      </div>

      {/* Credit products */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          {t("creditGroup")}
        </h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {CREDIT_PRODUCTS.map((product) => (
            <ProductCard
              key={product.slug}
              slug={product.slug}
              icon={product.icon}
              label={product.nameFr}
              isSelected={formData.productType === product.slug}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      {/* Insurance products */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          {t("insuranceGroup")}
        </h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {INSURANCE_PRODUCTS.map((product) => (
            <ProductCard
              key={product.slug}
              slug={product.slug}
              icon={product.icon}
              label={product.nameFr}
              isSelected={formData.productType === product.slug}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      {/* Participative finance */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          {t("participativeGroup")}
        </h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {PARTICIPATIVE_PRODUCTS.map((product) => (
            <ProductCard
              key={product.slug}
              slug={product.slug}
              icon={product.icon}
              label={product.nameFr}
              isSelected={formData.productType === product.slug}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Product selection card
// ==========================================
function ProductCard({
  slug,
  icon,
  label,
  isSelected,
  onSelect,
}: {
  slug: string;
  icon: string;
  label: string;
  isSelected: boolean;
  onSelect: (slug: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(slug)}
      className={cn(
        "relative flex flex-col items-center gap-3 rounded-xl border-2 p-4 md:p-6 transition-all duration-200 cursor-pointer",
        "hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        isSelected
          ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
          : "border-border bg-card"
      )}
    >
      {/* Checkmark badge */}
      {isSelected && (
        <div className="absolute top-2 end-2 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-4" strokeWidth={2.5} />
        </div>
      )}

      {/* Icon */}
      <span className="text-3xl md:text-4xl" role="img" aria-hidden="true">
        {icon}
      </span>

      {/* Label */}
      <span
        className={cn(
          "text-sm font-medium text-center leading-tight",
          isSelected ? "text-primary" : "text-foreground"
        )}
      >
        {label}
      </span>
    </button>
  );
}
