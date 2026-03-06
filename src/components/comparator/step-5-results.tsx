"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  Trophy,
  Clock,
  Phone,
  MessageCircle,
  Building2,
  TrendingDown,
  Star,
  Lock as LockIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  calcMonthlyPayment,
  calcMourabahaPayment,
  formatMAD,
  formatPercent,
} from "@/lib/finance";
import {
  CONVENTIONAL_BANKS,
  PARTICIPATIVE_BANKS,
  INSURANCE_COMPANIES,
  SOCIETES_FINANCEMENT,
  INDICATIVE_RATES,
} from "@/lib/constants";
import type { ComparatorFormData, InstitutionResult } from "@/types/comparator";

interface Step5ResultsProps {
  formData: ComparatorFormData;
  isSubmitted: boolean;
}

// ==========================================
// Simulated rate offsets per institution
// (In production, these would come from the DB)
// ==========================================
const BANK_RATE_OFFSETS: Record<string, number> = {
  "attijariwafa-bank": -0.15,
  "bmce-bank-of-africa": -0.05,
  "banque-populaire": 0.0,
  "societe-generale": 0.10,
  "bmci": 0.20,
  "credit-du-maroc": 0.15,
  "cih-bank": -0.10,
  "cfg-bank": 0.25,
  "credit-agricole-maroc": 0.05,
  "al-barid-bank": 0.30,
  "wafasalaf": 0.40,
  "cetelem": 0.35,
  "sofac": 0.50,
  "salafin": 0.45,
  "dar-salaf": 0.55,
  "bank-assafa": -0.10,
  "umnia-bank": 0.05,
  "dar-al-amane": 0.10,
  "al-yousr": 0.20,
  "arreda": 0.15,
};

const INSURANCE_PREMIUMS: Record<string, number> = {
  "wafa-assurance": 0.95,
  "rma-assurance": 1.0,
  "saham-assurance": 1.02,
  "axa-assurance-maroc": 1.05,
  "atlanta-assurance": 0.98,
  "zurich-assurance": 1.08,
  "mamda-mcma": 1.10,
  "allianz-maroc": 1.03,
};

// ==========================================
// Build results based on product type
// ==========================================
function buildCreditResults(formData: ComparatorFormData): InstitutionResult[] {
  const { productType, amount = 300000, duration = 10 } = formData;
  const months = duration * 12;

  // Get base rate
  let baseRate: number = INDICATIVE_RATES.creditConsommation.avg;
  if (productType === "credit-immobilier") baseRate = INDICATIVE_RATES.creditImmobilier.avg;
  else if (productType === "credit-auto") baseRate = INDICATIVE_RATES.creditAuto.avg;

  // For immobilier: use banks; for conso/auto: also include societes financement
  const institutions =
    productType === "credit-immobilier"
      ? [...CONVENTIONAL_BANKS]
      : [...CONVENTIONAL_BANKS.slice(0, 6), ...SOCIETES_FINANCEMENT];

  const results: InstitutionResult[] = institutions.map((inst) => {
    const offset = BANK_RATE_OFFSETS[inst.slug] ?? 0;
    const rate = Math.round((baseRate + offset) * 100) / 100;
    const monthly = calcMonthlyPayment(amount, rate, months);
    const totalCost = Math.round(monthly * months);

    return {
      slug: inst.slug,
      name: inst.nameFr,
      nameAr: inst.nameAr,
      type: inst.type,
      rate,
      monthlyPayment: monthly,
      totalCost,
      isBest: false,
    };
  });

  // Sort by monthly payment
  results.sort((a, b) => a.monthlyPayment - b.monthlyPayment);

  // Mark best
  if (results.length > 0) {
    results[0].isBest = true;
  }

  return results.slice(0, 8);
}

function buildMourabahaResults(formData: ComparatorFormData): InstitutionResult[] {
  const propertyValue = formData.propertyValue ?? 500000;
  const downPayment = formData.downPayment ?? Math.round(propertyValue * 0.1);
  const financedAmount = propertyValue - downPayment;
  const months = (formData.duration ?? 15) * 12;
  const baseRate = INDICATIVE_RATES.mourabaha.avg;

  const results: InstitutionResult[] = PARTICIPATIVE_BANKS.map((bank) => {
    const offset = BANK_RATE_OFFSETS[bank.slug] ?? 0;
    const rate = Math.round((baseRate + offset) * 100) / 100;
    const res = calcMourabahaPayment(financedAmount, rate, months);

    return {
      slug: bank.slug,
      name: bank.nameFr,
      nameAr: bank.nameAr,
      type: bank.type,
      rate,
      monthlyPayment: res.monthlyPayment,
      totalCost: res.totalCost,
      isBest: false,
    };
  });

  results.sort((a, b) => a.monthlyPayment - b.monthlyPayment);
  if (results.length > 0) results[0].isBest = true;

  return results;
}

function buildInsuranceResults(formData: ComparatorFormData): InstitutionResult[] {
  // Simulated annual premium based on product + vehicle/property value
  const baseValue = formData.amount ?? formData.propertyValue ?? 200000;
  let basePremium: number;

  if (formData.productType === "assurance-auto") {
    // ~2-4% of vehicle value for annual premium
    basePremium = Math.round(baseValue * 0.03);
  } else if (formData.productType === "assurance-habitation") {
    // ~0.2-0.5% of property value
    basePremium = Math.round(baseValue * 0.003);
  } else {
    // Mutuelle: base on members + age
    const members = formData.healthMembers ?? 1;
    basePremium = 2400 + (members - 1) * 1800;
  }

  const results: InstitutionResult[] = INSURANCE_COMPANIES.map((co) => {
    const multiplier = INSURANCE_PREMIUMS[co.slug] ?? 1.0;
    const annualPremium = Math.round(basePremium * multiplier);
    const monthlyPremium = Math.round(annualPremium / 12);

    return {
      slug: co.slug,
      name: co.nameFr,
      nameAr: co.nameAr,
      type: co.type,
      rate: 0,
      monthlyPayment: monthlyPremium,
      totalCost: annualPremium,
      isBest: false,
    };
  });

  results.sort((a, b) => a.monthlyPayment - b.monthlyPayment);
  if (results.length > 0) results[0].isBest = true;

  return results;
}

function buildResults(formData: ComparatorFormData): InstitutionResult[] {
  const { productType } = formData;

  if (productType === "mourabaha") {
    return buildMourabahaResults(formData);
  }

  if (
    productType === "assurance-auto" ||
    productType === "assurance-habitation" ||
    productType === "mutuelle-sante"
  ) {
    return buildInsuranceResults(formData);
  }

  // Default: credit products
  return buildCreditResults(formData);
}

// ==========================================
// Component
// ==========================================
export function Step5Results({ formData, isSubmitted }: Step5ResultsProps) {
  const t = useTranslations("comparator");
  const isInsurance = [
    "assurance-auto",
    "assurance-habitation",
    "mutuelle-sante",
  ].includes(formData.productType);

  const results = useMemo(() => buildResults(formData), [formData]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          {t("resultsTitle")}
        </h2>
        <p className="text-muted-foreground">
          {t("resultsSubtitle")}
        </p>
      </div>

      {/* Confirmation message */}
      {isSubmitted && (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
          <div className="flex items-center justify-center gap-2 text-primary mb-2">
            <Clock className="size-5" />
            <span className="font-semibold">{t("confirmationTitle")}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {t("confirmationDesc")}
          </p>
        </div>
      )}

      {/* Results list */}
      <div className={cn("space-y-4", !isSubmitted && "relative")}>
        {/* Blur overlay when not submitted */}
        {!isSubmitted && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-background/60 backdrop-blur-sm">
            <LockIcon className="size-8 text-primary mb-3" />
            <p className="text-lg font-semibold text-foreground text-center px-4">
              {t("blurTitle")}
            </p>
            <p className="text-sm text-muted-foreground text-center px-4 mt-1">
              {t("blurSubtitle")}
            </p>
          </div>
        )}

        {results.map((result, index) => (
          <ResultCard
            key={result.slug}
            result={result}
            rank={index + 1}
            isInsurance={isInsurance}
            isSubmitted={isSubmitted}
            t={t}
          />
        ))}
      </div>

      {/* CTA after results */}
      {isSubmitted && (
        <div className="space-y-4">
          <Separator />
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              {t("needHelp")}
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button variant="default" size="lg" className="gap-2 w-full sm:w-auto">
                <Phone className="size-4" />
                {t("callAdvisor")}
              </Button>
              <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                <MessageCircle className="size-4" />
                {t("whatsappAdvisor")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// Result card
// ==========================================
function ResultCard({
  result,
  rank,
  isInsurance,
  isSubmitted,
  t,
}: {
  result: InstitutionResult;
  rank: number;
  isInsurance: boolean;
  isSubmitted: boolean;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div
      className={cn(
        "relative rounded-xl border p-4 md:p-5 transition-all duration-200",
        result.isBest
          ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
          : "border-border bg-card hover:border-primary/30 hover:shadow-sm"
      )}
    >
      {/* Best offer badge */}
      {result.isBest && (
        <div className="absolute -top-3 start-4">
          <Badge className="gap-1 px-3 py-1 text-xs">
            <Trophy className="size-3" />
            {t("bestOffer")}
          </Badge>
        </div>
      )}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Rank + Institution info */}
        <div className="flex items-center gap-4">
          {/* Rank number */}
          <div
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold",
              result.isBest
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {rank}
          </div>

          {/* Logo placeholder + Name */}
          <div className="flex items-center gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border bg-muted">
              <Building2 className="size-6 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{result.name}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {result.type === "banque"
                  ? "Banque"
                  : result.type === "banque_participative"
                  ? "Banque participative"
                  : result.type === "financement"
                  ? "Société de financement"
                  : "Assurance"}
              </p>
            </div>
          </div>
        </div>

        {/* Rate + Payment */}
        <div className="flex items-center gap-6 ps-14 md:ps-0">
          {/* Rate (credit only) */}
          {!isInsurance && (
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                {t("rateLabel")}
              </p>
              <p className="text-lg font-bold text-foreground">
                {formatPercent(result.rate)}
              </p>
            </div>
          )}

          {/* Monthly payment */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              {isInsurance ? t("monthlyPremium") : t("monthlyLabel")}
            </p>
            <p className="text-lg font-bold text-primary">
              {formatMAD(result.monthlyPayment)}
            </p>
          </div>

          {/* Total cost */}
          <div className="text-center hidden md:block">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              {isInsurance ? t("annualPremium") : t("totalCostLabel")}
            </p>
            <p className="text-sm font-medium text-foreground">
              {formatMAD(result.totalCost)}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="ps-14 md:ps-0">
          <Button
            size="sm"
            variant={result.isBest ? "default" : "outline"}
            className="w-full md:w-auto"
            disabled={!isSubmitted}
          >
            {t("requestQuote")}
          </Button>
        </div>
      </div>
    </div>
  );
}
