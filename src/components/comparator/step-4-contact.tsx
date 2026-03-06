"use client";

import { useTranslations } from "next-intl";
import { Shield, Gift, Lock as LockIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { ComparatorFormData } from "@/types/comparator";

interface Step4ContactProps {
  formData: ComparatorFormData;
  onUpdate: (data: Partial<ComparatorFormData>) => void;
  errors: Record<string, string>;
}

export function Step4Contact({ formData, onUpdate, errors }: Step4ContactProps) {
  const t = useTranslations("comparator");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          {t("contactTitle")}
        </h2>
        <p className="text-muted-foreground">
          {t("step4Desc")}
        </p>
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-base font-medium">
          {t("phone")} *
        </Label>
        <div className="flex gap-2">
          <div className="flex h-9 items-center rounded-md border border-input bg-muted px-3 text-sm font-medium text-muted-foreground shrink-0">
            +212
          </div>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => {
              // Only allow digits, max 9 chars (6/7 + 8 digits)
              const cleaned = e.target.value.replace(/\D/g, "").slice(0, 9);
              onUpdate({ phone: cleaned });
            }}
            placeholder="0612345678"
            className="flex-1"
            inputMode="numeric"
            aria-invalid={!!errors.phone}
          />
        </div>
        {errors.phone && (
          <p className="text-sm text-destructive">{errors.phone}</p>
        )}
        <p className="text-xs text-muted-foreground">
          {t("phoneHint")}
        </p>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-base font-medium">
          {t("email")} *
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onUpdate({ email: e.target.value })}
          placeholder="votre@email.com"
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      {/* Accept terms */}
      <div className="flex items-start gap-3">
        <Checkbox
          id="acceptTerms"
          checked={formData.acceptTerms}
          onCheckedChange={(checked) =>
            onUpdate({ acceptTerms: checked === true })
          }
          aria-invalid={!!errors.acceptTerms}
        />
        <label
          htmlFor="acceptTerms"
          className="text-sm leading-relaxed text-muted-foreground cursor-pointer"
        >
          {t("acceptTermsText")}{" "}
          <a href="/fr/conditions-utilisation" className="text-primary underline hover:no-underline" target="_blank" rel="noopener">
            {t("termsLink")}
          </a>{" "}
          {t("andThe")}{" "}
          <a href="/fr/politique-confidentialite" className="text-primary underline hover:no-underline" target="_blank" rel="noopener">
            {t("privacyLink")}
          </a>.
        </label>
      </div>
      {errors.acceptTerms && (
        <p className="text-sm text-destructive">{errors.acceptTerms}</p>
      )}

      {/* Trust signals */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <TrustSignal
            icon={<LockIcon className="size-5 text-primary" />}
            title={t("trustDataProtected")}
            description={t("trustDataProtectedDesc")}
          />
          <TrustSignal
            icon={<Gift className="size-5 text-primary" />}
            title={t("trustFreeService")}
            description={t("trustFreeServiceDesc")}
          />
          <TrustSignal
            icon={<Shield className="size-5 text-primary" />}
            title={t("trustNoCommitment")}
            description={t("trustNoCommitmentDesc")}
          />
        </div>
      </div>
    </div>
  );
}

function TrustSignal({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
