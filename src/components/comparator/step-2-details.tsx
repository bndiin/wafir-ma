"use client";

import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatMAD } from "@/lib/finance";
import type { ComparatorFormData } from "@/types/comparator";

interface Step2DetailsProps {
  formData: ComparatorFormData;
  onUpdate: (data: Partial<ComparatorFormData>) => void;
}

// ==========================================
// Product group helpers
// ==========================================
const CREDIT_PRODUCTS = [
  "credit-immobilier",
  "credit-consommation",
  "credit-auto",
  "rachat-credit",
];
const INSURANCE_PRODUCTS = [
  "assurance-auto",
  "assurance-habitation",
  "mutuelle-sante",
];

function isCreditProduct(type: string): boolean {
  return CREDIT_PRODUCTS.includes(type);
}

function isInsuranceProduct(type: string): boolean {
  return INSURANCE_PRODUCTS.includes(type);
}

// ==========================================
// Config per product type
// ==========================================
const CREDIT_CONFIGS: Record<
  string,
  { minAmount: number; maxAmount: number; step: number; minDuration: number; maxDuration: number; purposes: string[] }
> = {
  "credit-immobilier": {
    minAmount: 100000,
    maxAmount: 5000000,
    step: 50000,
    minDuration: 5,
    maxDuration: 25,
    purposes: ["achat-neuf", "achat-ancien", "construction", "terrain"],
  },
  "credit-consommation": {
    minAmount: 10000,
    maxAmount: 500000,
    step: 5000,
    minDuration: 1,
    maxDuration: 7,
    purposes: ["travaux", "equipement", "voyage", "evenement", "tresorerie", "autre"],
  },
  "credit-auto": {
    minAmount: 30000,
    maxAmount: 1000000,
    step: 10000,
    minDuration: 2,
    maxDuration: 7,
    purposes: ["neuf", "occasion"],
  },
  "rachat-credit": {
    minAmount: 50000,
    maxAmount: 2000000,
    step: 10000,
    minDuration: 3,
    maxDuration: 15,
    purposes: ["alleger-mensualites", "financer-projet", "simplifier"],
  },
};

const PURPOSE_LABELS: Record<string, string> = {
  "achat-neuf": "Achat bien neuf",
  "achat-ancien": "Achat bien ancien",
  "construction": "Construction",
  "terrain": "Achat terrain",
  "travaux": "Travaux",
  "equipement": "Equipement",
  "voyage": "Voyage",
  "evenement": "Evénement",
  "tresorerie": "Trésorerie",
  "autre": "Autre",
  "neuf": "Véhicule neuf",
  "occasion": "Véhicule occasion",
  "alleger-mensualites": "Alléger mes mensualités",
  "financer-projet": "Financer un nouveau projet",
  "simplifier": "Simplifier mes remboursements",
};

const VEHICLE_BRANDS = [
  "Dacia", "Renault", "Peugeot", "Citroën", "Hyundai", "Kia",
  "Toyota", "Volkswagen", "Fiat", "Ford", "Mercedes", "BMW",
  "Audi", "Nissan", "Suzuki", "Opel", "Skoda", "Seat", "Autre",
];

const PROPERTY_TYPES = [
  { value: "appartement", label: "Appartement" },
  { value: "maison", label: "Maison / Villa" },
  { value: "riad", label: "Riad" },
  { value: "studio", label: "Studio" },
  { value: "local-commercial", label: "Local commercial" },
];

export function Step2Details({ formData, onUpdate }: Step2DetailsProps) {
  const t = useTranslations("comparator");
  const { productType } = formData;

  if (isCreditProduct(productType)) {
    return <CreditDetailsForm formData={formData} onUpdate={onUpdate} t={t} />;
  }

  if (productType === "mourabaha") {
    return <MourabahaDetailsForm formData={formData} onUpdate={onUpdate} t={t} />;
  }

  if (productType === "assurance-auto") {
    return <AutoInsuranceForm formData={formData} onUpdate={onUpdate} t={t} />;
  }

  if (productType === "assurance-habitation") {
    return <HomeInsuranceForm formData={formData} onUpdate={onUpdate} t={t} />;
  }

  if (productType === "mutuelle-sante") {
    return <HealthInsuranceForm formData={formData} onUpdate={onUpdate} t={t} />;
  }

  return null;
}

// ==========================================
// Credit form (Immobilier, Conso, Auto, Rachat)
// ==========================================
function CreditDetailsForm({
  formData,
  onUpdate,
  t,
}: {
  formData: ComparatorFormData;
  onUpdate: (data: Partial<ComparatorFormData>) => void;
  t: ReturnType<typeof useTranslations>;
}) {
  const config = CREDIT_CONFIGS[formData.productType] ?? CREDIT_CONFIGS["credit-consommation"];
  const amount = formData.amount ?? config.minAmount;
  const duration = formData.duration ?? config.minDuration;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          {t("detailsTitle")}
        </h2>
        <p className="text-muted-foreground">
          {t("detailsSubtitle")}
        </p>
      </div>

      {/* Amount slider */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">{t("amountLabel")}</Label>
          <span className="text-lg font-bold text-primary">
            {formatMAD(amount)}
          </span>
        </div>
        <Slider
          value={[amount]}
          onValueChange={([val]) => onUpdate({ amount: val })}
          min={config.minAmount}
          max={config.maxAmount}
          step={config.step}
          className="py-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatMAD(config.minAmount)}</span>
          <span>{formatMAD(config.maxAmount)}</span>
        </div>
      </div>

      {/* Duration slider */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">{t("durationLabel")}</Label>
          <span className="text-lg font-bold text-primary">
            {duration} {t("years")}
          </span>
        </div>
        <Slider
          value={[duration]}
          onValueChange={([val]) => onUpdate({ duration: val })}
          min={config.minDuration}
          max={config.maxDuration}
          step={1}
          className="py-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{config.minDuration} {t("years")}</span>
          <span>{config.maxDuration} {t("years")}</span>
        </div>
      </div>

      {/* Purpose */}
      <div className="space-y-2">
        <Label className="text-base font-medium">{t("purposeLabel")}</Label>
        <Select
          value={formData.purpose ?? ""}
          onValueChange={(val) => onUpdate({ purpose: val })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("selectPurpose")} />
          </SelectTrigger>
          <SelectContent>
            {config.purposes.map((purpose) => (
              <SelectItem key={purpose} value={purpose}>
                {PURPOSE_LABELS[purpose] ?? purpose}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Vehicle brand (credit auto only) */}
      {formData.productType === "credit-auto" && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-base font-medium">{t("vehicleBrand")}</Label>
            <Select
              value={formData.vehicleBrand ?? ""}
              onValueChange={(val) => onUpdate({ vehicleBrand: val })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("selectBrand")} />
              </SelectTrigger>
              <SelectContent>
                {VEHICLE_BRANDS.map((brand) => (
                  <SelectItem key={brand} value={brand.toLowerCase()}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-base font-medium">{t("vehicleYear")}</Label>
            <Select
              value={formData.vehicleYear?.toString() ?? ""}
              onValueChange={(val) => onUpdate({ vehicleYear: parseInt(val) })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("selectYear")} />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 6 }, (_, i) => 2026 - i).map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// Mourabaha form
// ==========================================
function MourabahaDetailsForm({
  formData,
  onUpdate,
  t,
}: {
  formData: ComparatorFormData;
  onUpdate: (data: Partial<ComparatorFormData>) => void;
  t: ReturnType<typeof useTranslations>;
}) {
  const propertyValue = formData.propertyValue ?? 500000;
  const downPayment = formData.downPayment ?? Math.round(propertyValue * 0.1);
  const duration = formData.duration ?? 15;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          {t("mourabahaTitle")}
        </h2>
        <p className="text-muted-foreground">
          {t("mourabahaSubtitle")}
        </p>
      </div>

      {/* Property type */}
      <div className="space-y-2">
        <Label className="text-base font-medium">{t("propertyTypeLabel")}</Label>
        <Select
          value={formData.propertyType ?? ""}
          onValueChange={(val) => onUpdate({ propertyType: val })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("selectPropertyType")} />
          </SelectTrigger>
          <SelectContent>
            {PROPERTY_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Property value */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">{t("propertyValueLabel")}</Label>
          <span className="text-lg font-bold text-primary">
            {formatMAD(propertyValue)}
          </span>
        </div>
        <Slider
          value={[propertyValue]}
          onValueChange={([val]) => onUpdate({ propertyValue: val })}
          min={200000}
          max={5000000}
          step={50000}
          className="py-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatMAD(200000)}</span>
          <span>{formatMAD(5000000)}</span>
        </div>
      </div>

      {/* Down payment */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">{t("downPaymentLabel")}</Label>
          <span className="text-lg font-bold text-primary">
            {formatMAD(downPayment)}
          </span>
        </div>
        <Slider
          value={[downPayment]}
          onValueChange={([val]) => onUpdate({ downPayment: val })}
          min={0}
          max={Math.round(propertyValue * 0.5)}
          step={10000}
          className="py-2"
        />
        <p className="text-xs text-muted-foreground">
          {t("downPaymentHint")}
        </p>
      </div>

      {/* Duration */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">{t("durationLabel")}</Label>
          <span className="text-lg font-bold text-primary">
            {duration} {t("years")}
          </span>
        </div>
        <Slider
          value={[duration]}
          onValueChange={([val]) => onUpdate({ duration: val })}
          min={5}
          max={25}
          step={1}
          className="py-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>5 {t("years")}</span>
          <span>25 {t("years")}</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Auto insurance form
// ==========================================
function AutoInsuranceForm({
  formData,
  onUpdate,
  t,
}: {
  formData: ComparatorFormData;
  onUpdate: (data: Partial<ComparatorFormData>) => void;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          {t("autoInsuranceTitle")}
        </h2>
        <p className="text-muted-foreground">
          {t("autoInsuranceSubtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Vehicle brand */}
        <div className="space-y-2">
          <Label className="text-base font-medium">{t("vehicleBrand")}</Label>
          <Select
            value={formData.vehicleBrand ?? ""}
            onValueChange={(val) => onUpdate({ vehicleBrand: val })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t("selectBrand")} />
            </SelectTrigger>
            <SelectContent>
              {VEHICLE_BRANDS.map((brand) => (
                <SelectItem key={brand} value={brand.toLowerCase()}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Vehicle year */}
        <div className="space-y-2">
          <Label className="text-base font-medium">{t("vehicleYear")}</Label>
          <Select
            value={formData.vehicleYear?.toString() ?? ""}
            onValueChange={(val) => onUpdate({ vehicleYear: parseInt(val) })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t("selectYear")} />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 15 }, (_, i) => 2026 - i).map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Vehicle value */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">{t("vehicleValue")}</Label>
          <span className="text-lg font-bold text-primary">
            {formatMAD(formData.amount ?? 150000)}
          </span>
        </div>
        <Slider
          value={[formData.amount ?? 150000]}
          onValueChange={([val]) => onUpdate({ amount: val })}
          min={20000}
          max={1000000}
          step={10000}
          className="py-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatMAD(20000)}</span>
          <span>{formatMAD(1000000)}</span>
        </div>
      </div>

      {/* Purpose: coverage level */}
      <div className="space-y-2">
        <Label className="text-base font-medium">{t("coverageLevel")}</Label>
        <Select
          value={formData.purpose ?? ""}
          onValueChange={(val) => onUpdate({ purpose: val })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("selectCoverage")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tiers">Responsabilité civile (Tiers)</SelectItem>
            <SelectItem value="tiers-plus">Tiers + Vol + Incendie</SelectItem>
            <SelectItem value="tous-risques">Tous risques</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

// ==========================================
// Home insurance form
// ==========================================
function HomeInsuranceForm({
  formData,
  onUpdate,
  t,
}: {
  formData: ComparatorFormData;
  onUpdate: (data: Partial<ComparatorFormData>) => void;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          {t("homeInsuranceTitle")}
        </h2>
        <p className="text-muted-foreground">
          {t("homeInsuranceSubtitle")}
        </p>
      </div>

      {/* Property type */}
      <div className="space-y-2">
        <Label className="text-base font-medium">{t("propertyTypeLabel")}</Label>
        <Select
          value={formData.propertyType ?? ""}
          onValueChange={(val) => onUpdate({ propertyType: val })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("selectPropertyType")} />
          </SelectTrigger>
          <SelectContent>
            {PROPERTY_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Property value */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">{t("propertyValueLabel")}</Label>
          <span className="text-lg font-bold text-primary">
            {formatMAD(formData.propertyValue ?? 500000)}
          </span>
        </div>
        <Slider
          value={[formData.propertyValue ?? 500000]}
          onValueChange={([val]) => onUpdate({ propertyValue: val })}
          min={100000}
          max={5000000}
          step={50000}
          className="py-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatMAD(100000)}</span>
          <span>{formatMAD(5000000)}</span>
        </div>
      </div>

      {/* Occupancy */}
      <div className="space-y-2">
        <Label className="text-base font-medium">{t("occupancy")}</Label>
        <Select
          value={formData.purpose ?? ""}
          onValueChange={(val) => onUpdate({ purpose: val })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("selectOccupancy")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="proprietaire">Propriétaire occupant</SelectItem>
            <SelectItem value="locataire">Locataire</SelectItem>
            <SelectItem value="proprietaire-bailleur">Propriétaire bailleur</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

// ==========================================
// Health insurance form
// ==========================================
function HealthInsuranceForm({
  formData,
  onUpdate,
  t,
}: {
  formData: ComparatorFormData;
  onUpdate: (data: Partial<ComparatorFormData>) => void;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          {t("healthInsuranceTitle")}
        </h2>
        <p className="text-muted-foreground">
          {t("healthInsuranceSubtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Age */}
        <div className="space-y-2">
          <Label className="text-base font-medium">{t("age")}</Label>
          <Input
            type="number"
            min={18}
            max={80}
            value={formData.healthAge ?? ""}
            onChange={(e) =>
              onUpdate({ healthAge: parseInt(e.target.value) || undefined })
            }
            placeholder="30"
          />
        </div>

        {/* Number of members to cover */}
        <div className="space-y-2">
          <Label className="text-base font-medium">{t("membersCount")}</Label>
          <Select
            value={formData.healthMembers?.toString() ?? ""}
            onValueChange={(val) => onUpdate({ healthMembers: parseInt(val) })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t("selectMembers")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 personne (moi seul)</SelectItem>
              <SelectItem value="2">2 personnes (couple)</SelectItem>
              <SelectItem value="3">3 personnes</SelectItem>
              <SelectItem value="4">4 personnes</SelectItem>
              <SelectItem value="5">5+ personnes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Coverage level */}
      <div className="space-y-2">
        <Label className="text-base font-medium">{t("coverageLevel")}</Label>
        <Select
          value={formData.purpose ?? ""}
          onValueChange={(val) => onUpdate({ purpose: val })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("selectCoverage")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="base">Couverture de base</SelectItem>
            <SelectItem value="confort">Couverture confort</SelectItem>
            <SelectItem value="premium">Couverture premium</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
