"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CITIES } from "@/lib/constants";
import { formatMAD } from "@/lib/finance";
import type { ComparatorFormData } from "@/types/comparator";

interface Step3PersonalProps {
  formData: ComparatorFormData;
  onUpdate: (data: Partial<ComparatorFormData>) => void;
  errors: Record<string, string>;
}

const FAMILY_STATUSES = [
  { value: "celibataire", label: "Célibataire" },
  { value: "marie", label: "Marié(e)" },
  { value: "divorce", label: "Divorcé(e)" },
  { value: "veuf", label: "Veuf / Veuve" },
];

const PROFESSIONS = [
  { value: "salarie", label: "Salarié(e)" },
  { value: "fonctionnaire", label: "Fonctionnaire" },
  { value: "profession-liberale", label: "Profession libérale" },
  { value: "commercant", label: "Commerçant(e)" },
  { value: "retraite", label: "Retraité(e)" },
  { value: "autre", label: "Autre" },
];

const CHILDREN_OPTIONS = [
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4+" },
];

export function Step3Personal({ formData, onUpdate, errors }: Step3PersonalProps) {
  const t = useTranslations("comparator");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          {t("personalTitle")}
        </h2>
        <p className="text-muted-foreground">
          {t("personalSubtitle")}
        </p>
      </div>

      {/* Name fields */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-base font-medium">
            {t("firstName")} *
          </Label>
          <Input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) => onUpdate({ firstName: e.target.value })}
            placeholder="ex: Mohammed"
            aria-invalid={!!errors.firstName}
          />
          {errors.firstName && (
            <p className="text-sm text-destructive">{errors.firstName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-base font-medium">
            {t("lastName")} *
          </Label>
          <Input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) => onUpdate({ lastName: e.target.value })}
            placeholder="ex: Alami"
            aria-invalid={!!errors.lastName}
          />
          {errors.lastName && (
            <p className="text-sm text-destructive">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Birth date */}
      <div className="space-y-2">
        <Label htmlFor="birthDate" className="text-base font-medium">
          {t("birthDate")} *
        </Label>
        <Input
          id="birthDate"
          type="date"
          value={formData.birthDate}
          onChange={(e) => onUpdate({ birthDate: e.target.value })}
          max="2008-01-01"
          min="1940-01-01"
          aria-invalid={!!errors.birthDate}
        />
        {errors.birthDate && (
          <p className="text-sm text-destructive">{errors.birthDate}</p>
        )}
      </div>

      {/* Family status + Children */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-base font-medium">
            {t("familyStatus")} *
          </Label>
          <Select
            value={formData.familyStatus}
            onValueChange={(val) => onUpdate({ familyStatus: val })}
          >
            <SelectTrigger className="w-full" aria-invalid={!!errors.familyStatus}>
              <SelectValue placeholder={t("selectFamilyStatus")} />
            </SelectTrigger>
            <SelectContent>
              {FAMILY_STATUSES.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.familyStatus && (
            <p className="text-sm text-destructive">{errors.familyStatus}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-base font-medium">
            {t("children")}
          </Label>
          <Select
            value={formData.children.toString()}
            onValueChange={(val) => onUpdate({ children: parseInt(val) })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="0" />
            </SelectTrigger>
            <SelectContent>
              {CHILDREN_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Profession */}
      <div className="space-y-2">
        <Label className="text-base font-medium">
          {t("profession")} *
        </Label>
        <Select
          value={formData.profession}
          onValueChange={(val) => onUpdate({ profession: val })}
        >
          <SelectTrigger className="w-full" aria-invalid={!!errors.profession}>
            <SelectValue placeholder={t("selectProfession")} />
          </SelectTrigger>
          <SelectContent>
            {PROFESSIONS.map((prof) => (
              <SelectItem key={prof.value} value={prof.value}>
                {prof.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.profession && (
          <p className="text-sm text-destructive">{errors.profession}</p>
        )}
      </div>

      {/* Monthly income */}
      <div className="space-y-2">
        <Label htmlFor="monthlyIncome" className="text-base font-medium">
          {t("monthlyIncome")} *
        </Label>
        <div className="relative">
          <Input
            id="monthlyIncome"
            type="number"
            min={0}
            step={500}
            value={formData.monthlyIncome || ""}
            onChange={(e) =>
              onUpdate({ monthlyIncome: parseInt(e.target.value) || 0 })
            }
            placeholder="ex: 8000"
            className="pe-16"
            aria-invalid={!!errors.monthlyIncome}
          />
          <span className="absolute end-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
            MAD
          </span>
        </div>
        {errors.monthlyIncome && (
          <p className="text-sm text-destructive">{errors.monthlyIncome}</p>
        )}
        <p className="text-xs text-muted-foreground">
          {t("incomeHint")}
        </p>
      </div>

      {/* City */}
      <div className="space-y-2">
        <Label className="text-base font-medium">
          {t("city")} *
        </Label>
        <Select
          value={formData.cityId}
          onValueChange={(val) => onUpdate({ cityId: val })}
        >
          <SelectTrigger className="w-full" aria-invalid={!!errors.cityId}>
            <SelectValue placeholder={t("selectCity")} />
          </SelectTrigger>
          <SelectContent>
            {CITIES.map((city) => (
              <SelectItem key={city.slug} value={city.slug}>
                {city.nameFr}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.cityId && (
          <p className="text-sm text-destructive">{errors.cityId}</p>
        )}
      </div>
    </div>
  );
}
