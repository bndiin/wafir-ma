// ==========================================
// Comparator Form Types — wafir.ma
// Multi-step lead capture funnel
// ==========================================

export interface ComparatorFormData {
  // Step 1 — Product type
  productType: string;

  // Step 2 — Project details (varies by product)
  amount?: number;
  duration?: number;
  purpose?: string;
  vehicleBrand?: string;
  vehicleYear?: number;
  propertyType?: string;
  propertyValue?: number;
  downPayment?: number;
  healthAge?: number;
  healthMembers?: number;

  // Step 3 — Personal info
  firstName: string;
  lastName: string;
  birthDate: string;
  familyStatus: string;
  children: number;
  profession: string;
  monthlyIncome: number;
  cityId: string;

  // Step 4 — Contact info
  phone: string;
  email: string;
  acceptTerms: boolean;
}

export const INITIAL_FORM_DATA: ComparatorFormData = {
  productType: "",
  amount: undefined,
  duration: undefined,
  purpose: undefined,
  vehicleBrand: undefined,
  vehicleYear: undefined,
  propertyType: undefined,
  propertyValue: undefined,
  downPayment: undefined,
  healthAge: undefined,
  healthMembers: undefined,
  firstName: "",
  lastName: "",
  birthDate: "",
  familyStatus: "",
  children: 0,
  profession: "",
  monthlyIncome: 0,
  cityId: "",
  phone: "",
  email: "",
  acceptTerms: false,
};

export interface InstitutionResult {
  slug: string;
  name: string;
  nameAr: string;
  type: string;
  rate: number;
  monthlyPayment: number;
  totalCost: number;
  isBest: boolean;
}

export type ComparatorStep = 1 | 2 | 3 | 4 | 5;
