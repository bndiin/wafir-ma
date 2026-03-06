"use client";

import { useState, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StepProgress } from "./step-progress";
import { Step1Product } from "./step-1-product";
import { Step2Details } from "./step-2-details";
import { Step3Personal } from "./step-3-personal";
import { Step4Contact } from "./step-4-contact";
import { Step5Results } from "./step-5-results";
import {
  INITIAL_FORM_DATA,
  type ComparatorFormData,
  type ComparatorStep,
} from "@/types/comparator";

// ==========================================
// Validation helpers
// ==========================================
function validateStep1(data: ComparatorFormData): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.productType) {
    errors.productType = "Veuillez sélectionner un produit";
  }
  return errors;
}

function validateStep2(data: ComparatorFormData): Record<string, string> {
  // Step 2 is mostly sliders with defaults, so minimal validation
  return {};
}

function validateStep3(data: ComparatorFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.firstName.trim()) {
    errors.firstName = "Le prénom est obligatoire";
  }
  if (!data.lastName.trim()) {
    errors.lastName = "Le nom est obligatoire";
  }
  if (!data.birthDate) {
    errors.birthDate = "La date de naissance est obligatoire";
  }
  if (!data.familyStatus) {
    errors.familyStatus = "Veuillez sélectionner votre situation familiale";
  }
  if (!data.profession) {
    errors.profession = "Veuillez sélectionner votre profession";
  }
  if (!data.monthlyIncome || data.monthlyIncome < 1000) {
    errors.monthlyIncome = "Veuillez indiquer vos revenus mensuels (min. 1 000 MAD)";
  }
  if (!data.cityId) {
    errors.cityId = "Veuillez sélectionner votre ville";
  }

  return errors;
}

function validateStep4(data: ComparatorFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  // Phone: must start with 06 or 07 and be 10 digits total (0 + 9 digits)
  const phoneClean = data.phone.replace(/\D/g, "");
  if (!phoneClean) {
    errors.phone = "Le numéro de téléphone est obligatoire";
  } else if (!/^0[67]\d{8}$/.test(phoneClean)) {
    errors.phone = "Format invalide (ex: 0612345678)";
  }

  // Email
  if (!data.email.trim()) {
    errors.email = "L'email est obligatoire";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Format d'email invalide";
  }

  if (!data.acceptTerms) {
    errors.acceptTerms = "Vous devez accepter les conditions";
  }

  return errors;
}

const VALIDATORS: Record<number, (data: ComparatorFormData) => Record<string, string>> = {
  1: validateStep1,
  2: validateStep2,
  3: validateStep3,
  4: validateStep4,
};

// ==========================================
// Main Component
// ==========================================
export function ComparatorFlow() {
  const t = useTranslations("comparator");
  const tCommon = useTranslations("common");

  const [currentStep, setCurrentStep] = useState<ComparatorStep>(1);
  const [formData, setFormData] = useState<ComparatorFormData>({ ...INITIAL_FORM_DATA });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  // Track completed steps
  const completedSteps = useMemo(() => {
    const steps: ComparatorStep[] = [];
    if (currentStep > 1 && formData.productType) steps.push(1);
    if (currentStep > 2) steps.push(2);
    if (currentStep > 3 && formData.firstName && formData.lastName) steps.push(3);
    if (currentStep > 4 && isSubmitted) steps.push(4);
    if (isSubmitted) steps.push(5);
    return steps;
  }, [currentStep, formData, isSubmitted]);

  // Update form data
  const handleUpdate = useCallback(
    (partial: Partial<ComparatorFormData>) => {
      setFormData((prev) => ({ ...prev, ...partial }));
      // Clear errors for fields that changed
      if (Object.keys(errors).length > 0) {
        const clearedErrors = { ...errors };
        Object.keys(partial).forEach((key) => {
          delete clearedErrors[key];
        });
        setErrors(clearedErrors);
      }
    },
    [errors]
  );

  // Go to next step
  const handleNext = useCallback(async () => {
    // Validate current step
    const validator = VALIDATORS[currentStep];
    if (validator) {
      const stepErrors = validator(formData);
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        return;
      }
    }

    setErrors({});
    setDirection("forward");

    // Step 4 -> 5: submit the lead
    if (currentStep === 4) {
      setIsSubmitting(true);
      try {
        // Simulate API call (in production: POST to /api/leads)
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitted(true);
        setCurrentStep(5);
      } catch {
        setErrors({ submit: "Une erreur est survenue. Veuillez réessayer." });
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as ComparatorStep);
    }
  }, [currentStep, formData]);

  // Go to previous step
  const handleBack = useCallback(() => {
    setErrors({});
    setDirection("backward");
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as ComparatorStep);
    }
  }, [currentStep]);

  // Step 1: auto-advance when product is selected
  const handleStep1Update = useCallback(
    (partial: Partial<ComparatorFormData>) => {
      handleUpdate(partial);
      if (partial.productType) {
        // Small delay for visual feedback
        setTimeout(() => {
          setDirection("forward");
          setCurrentStep(2);
        }, 300);
      }
    },
    [handleUpdate]
  );

  // Can go next?
  const canProceed = useMemo(() => {
    switch (currentStep) {
      case 1:
        return !!formData.productType;
      case 2:
        return true; // Sliders always have values
      case 3:
        return !!(
          formData.firstName &&
          formData.lastName &&
          formData.birthDate &&
          formData.familyStatus &&
          formData.profession &&
          formData.monthlyIncome >= 1000 &&
          formData.cityId
        );
      case 4:
        return !!(formData.phone && formData.email && formData.acceptTerms);
      case 5:
        return false;
      default:
        return false;
    }
  }, [currentStep, formData]);

  // Button labels
  const nextLabel = useMemo(() => {
    if (currentStep === 4) return t("seeResults");
    return tCommon("next");
  }, [currentStep, t, tCommon]);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 md:py-10">
      {/* Step progress bar */}
      <div className="mb-8 md:mb-12">
        <StepProgress
          currentStep={currentStep}
          completedSteps={completedSteps}
        />
      </div>

      {/* Step content with transition */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          direction === "forward"
            ? "animate-in fade-in slide-in-from-right-4"
            : "animate-in fade-in slide-in-from-left-4"
        )}
        key={currentStep}
      >
        {currentStep === 1 && (
          <Step1Product formData={formData} onUpdate={handleStep1Update} />
        )}
        {currentStep === 2 && (
          <Step2Details formData={formData} onUpdate={handleUpdate} />
        )}
        {currentStep === 3 && (
          <Step3Personal
            formData={formData}
            onUpdate={handleUpdate}
            errors={errors}
          />
        )}
        {currentStep === 4 && (
          <Step4Contact
            formData={formData}
            onUpdate={handleUpdate}
            errors={errors}
          />
        )}
        {currentStep === 5 && (
          <Step5Results formData={formData} isSubmitted={isSubmitted} />
        )}
      </div>

      {/* Submit error */}
      {errors.submit && (
        <p className="mt-4 text-center text-sm text-destructive">
          {errors.submit}
        </p>
      )}

      {/* Navigation buttons */}
      {currentStep !== 5 && (
        <div className="mt-8 flex items-center justify-between gap-4">
          {/* Back button */}
          {currentStep > 1 ? (
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleBack}
              className="gap-2"
            >
              <ArrowLeft className="size-4" />
              {tCommon("back")}
            </Button>
          ) : (
            <div />
          )}

          {/* Next / Submit button */}
          {currentStep !== 1 && (
            <Button
              type="button"
              size="lg"
              onClick={handleNext}
              disabled={!canProceed || isSubmitting}
              className="gap-2 min-w-[160px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {t("submitting")}
                </>
              ) : (
                <>
                  {nextLabel}
                  {currentStep < 4 && <ArrowRight className="size-4" />}
                </>
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
