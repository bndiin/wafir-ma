// ==========================================
// Financial Calculation Library for wafir.ma
// Pure functions — no side effects, easily testable
// ==========================================

export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface MourabahaResult {
  monthlyPayment: number;
  totalCost: number;
  profitMargin: number;
  acquisitionPrice: number;
}

export interface NotaryFeesResult {
  droitsEnregistrement: number;
  taxeConservation: number;
  honorairesNotaire: number;
  timbresEtDivers: number;
  total: number;
  percentage: number;
}

export interface Debt {
  name: string;
  balance: number;
  monthlyPayment: number;
  rate: number;
  remainingMonths: number;
}

export interface ConsolidationResult {
  currentTotalMonthly: number;
  newMonthlyPayment: number;
  monthlySavings: number;
  currentTotalCost: number;
  newTotalCost: number;
  totalSavings: number;
}

export interface BorrowingCapacityResult {
  maxBorrowingAmount: number;
  maxMonthlyPayment: number;
  debtRatio: number;
}

// ==========================================
// 1. Monthly Payment (Annuity Formula)
// M = P × [r(1+r)^n] / [(1+r)^n - 1]
// ==========================================
export function calcMonthlyPayment(
  principal: number,
  annualRate: number,
  months: number
): number {
  if (principal <= 0 || months <= 0) return 0;
  if (annualRate <= 0) return principal / months;

  const r = annualRate / 100 / 12;
  const n = months;
  const numerator = r * Math.pow(1 + r, n);
  const denominator = Math.pow(1 + r, n) - 1;

  return Math.round((principal * numerator / denominator) * 100) / 100;
}

// ==========================================
// 2. Full Amortization Schedule
// ==========================================
export function calcAmortizationSchedule(
  principal: number,
  annualRate: number,
  months: number
): AmortizationRow[] {
  const schedule: AmortizationRow[] = [];
  const monthlyPayment = calcMonthlyPayment(principal, annualRate, months);
  const r = annualRate / 100 / 12;
  let balance = principal;

  for (let month = 1; month <= months; month++) {
    const interest = Math.round(balance * r * 100) / 100;
    const principalPaid = Math.round((monthlyPayment - interest) * 100) / 100;
    balance = Math.round((balance - principalPaid) * 100) / 100;

    // Fix floating point on last month
    if (month === months) {
      balance = 0;
    }

    schedule.push({
      month,
      payment: monthlyPayment,
      principal: principalPaid,
      interest,
      balance: Math.max(0, balance),
    });
  }

  return schedule;
}

// ==========================================
// 3. Borrowing Capacity (33% rule — Morocco)
// maxPayment = (income - expenses) × 0.33
// Then reverse the annuity formula to find max principal
// ==========================================
export function calcBorrowingCapacity(
  monthlyIncome: number,
  monthlyExpenses: number,
  annualRate: number,
  months: number
): BorrowingCapacityResult {
  const maxMonthlyPayment = (monthlyIncome - monthlyExpenses) * 0.33;
  const debtRatio = 33;

  if (maxMonthlyPayment <= 0 || months <= 0) {
    return { maxBorrowingAmount: 0, maxMonthlyPayment: 0, debtRatio };
  }

  if (annualRate <= 0) {
    return {
      maxBorrowingAmount: Math.round(maxMonthlyPayment * months),
      maxMonthlyPayment: Math.round(maxMonthlyPayment),
      debtRatio,
    };
  }

  const r = annualRate / 100 / 12;
  const n = months;
  const denominator = r * Math.pow(1 + r, n);
  const numerator = Math.pow(1 + r, n) - 1;
  const maxBorrowingAmount = Math.round(maxMonthlyPayment * numerator / denominator);

  return {
    maxBorrowingAmount,
    maxMonthlyPayment: Math.round(maxMonthlyPayment),
    debtRatio,
  };
}

// ==========================================
// 4. Mourabaha Payment (Islamic Finance)
// Linear calculation: totalCost = price + (price × marginRate × years)
// monthly = totalCost / months
// ==========================================
export function calcMourabahaPayment(
  acquisitionPrice: number,
  profitMarginRate: number,
  months: number
): MourabahaResult {
  if (acquisitionPrice <= 0 || months <= 0) {
    return { monthlyPayment: 0, totalCost: 0, profitMargin: 0, acquisitionPrice: 0 };
  }

  const years = months / 12;
  const profitMargin = Math.round(acquisitionPrice * (profitMarginRate / 100) * years);
  const totalCost = acquisitionPrice + profitMargin;
  const monthlyPayment = Math.round((totalCost / months) * 100) / 100;

  return {
    monthlyPayment,
    totalCost,
    profitMargin,
    acquisitionPrice,
  };
}

// ==========================================
// 5. Notary Fees (Morocco-specific)
// - Droits d'enregistrement: 4% (new) or 4% (used)
// - Conservation foncière: 1.5% + 150 MAD
// - Honoraires notaire: 1% (min 2,500 MAD) + TVA 10%
// - Timbres et divers: ~1,500 MAD forfait
// ==========================================
export function calcNotaryFees(
  propertyPrice: number,
  isNew: boolean
): NotaryFeesResult {
  if (propertyPrice <= 0) {
    return {
      droitsEnregistrement: 0,
      taxeConservation: 0,
      honorairesNotaire: 0,
      timbresEtDivers: 0,
      total: 0,
      percentage: 0,
    };
  }

  // Droits d'enregistrement: 4% pour neuf et ancien
  const droitsEnregistrement = Math.round(propertyPrice * 0.04);

  // Conservation foncière: 1.5% + 150 MAD fixe
  const taxeConservation = Math.round(propertyPrice * 0.015 + 150);

  // Honoraires notaire: 1% avec minimum 2,500 MAD + TVA 10%
  const honorairesHT = Math.max(propertyPrice * 0.01, 2500);
  const honorairesNotaire = Math.round(honorairesHT * 1.10);

  // Timbres et frais divers: forfait ~1,500 MAD
  const timbresEtDivers = 1500;

  const total = droitsEnregistrement + taxeConservation + honorairesNotaire + timbresEtDivers;
  const percentage = Math.round((total / propertyPrice) * 10000) / 100;

  return {
    droitsEnregistrement,
    taxeConservation,
    honorairesNotaire,
    timbresEtDivers,
    total,
    percentage,
  };
}

// ==========================================
// 6. Debt Consolidation
// Compare current total payments vs. consolidated single payment
// ==========================================
export function calcDebtConsolidation(
  debts: Debt[],
  newRate: number,
  newDurationMonths: number
): ConsolidationResult {
  if (debts.length === 0) {
    return {
      currentTotalMonthly: 0,
      newMonthlyPayment: 0,
      monthlySavings: 0,
      currentTotalCost: 0,
      newTotalCost: 0,
      totalSavings: 0,
    };
  }

  // Current situation
  const currentTotalMonthly = debts.reduce((sum, d) => sum + d.monthlyPayment, 0);
  const currentTotalCost = debts.reduce(
    (sum, d) => sum + d.monthlyPayment * d.remainingMonths,
    0
  );
  const totalBalance = debts.reduce((sum, d) => sum + d.balance, 0);

  // New consolidated loan
  const newMonthlyPayment = calcMonthlyPayment(totalBalance, newRate, newDurationMonths);
  const newTotalCost = Math.round(newMonthlyPayment * newDurationMonths * 100) / 100;

  return {
    currentTotalMonthly: Math.round(currentTotalMonthly * 100) / 100,
    newMonthlyPayment,
    monthlySavings: Math.round((currentTotalMonthly - newMonthlyPayment) * 100) / 100,
    currentTotalCost: Math.round(currentTotalCost * 100) / 100,
    newTotalCost,
    totalSavings: Math.round((currentTotalCost - newTotalCost) * 100) / 100,
  };
}

// ==========================================
// Utility: Format MAD currency
// ==========================================
export function formatMAD(amount: number): string {
  return new Intl.NumberFormat('fr-MA', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + ' MAD';
}

export function formatPercent(value: number): string {
  return value.toFixed(2) + '%';
}
