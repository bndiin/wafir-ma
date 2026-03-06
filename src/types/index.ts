// ==========================================
// Shared TypeScript types for wafir.ma
// ==========================================

export type Locale = "fr" | "ar" | "en";

export type UserRole = "CLIENT" | "PRO" | "ADMIN";

export type ProTier = "GRATUIT" | "PRO" | "PREMIUM";

export type LeadSource =
  | "COMPARATOR"
  | "PDF_EXPORT"
  | "QUOTE_FORM"
  | "WHATSAPP"
  | "EXIT_POPUP"
  | "BLOG_CTA"
  | "SCROLL_TRIGGER";

export type LeadQuality = "HOT" | "WARM" | "COLD";

export type LeadStatus = "NEW" | "CONTACTED" | "CONVERTED" | "EXPIRED";

export type CategoryGroup = "CREDIT" | "ASSURANCE" | "FINANCE_PARTICIPATIVE";

export type PaymentMethod = "CMI" | "ORANGE_MONEY" | "INWI_MONEY" | "CASH_PLUS";

// Page props with locale
export interface LocalePageProps {
  params: Promise<{ locale: string }>;
}

export interface LocaleSlugPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// Pro profile for display
export interface ProProfileDisplay {
  id: string;
  slug: string;
  companyName: string;
  description: string;
  city: string;
  citySlug: string;
  specialities: string[];
  avgRating: number;
  reviewCount: number;
  responseTime: number | null;
  tier: ProTier;
  verified: boolean;
  phone?: string;
  whatsapp?: string;
  website?: string;
}

// Lead for display
export interface LeadDisplay {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  category: string;
  city: string;
  source: LeadSource;
  quality: LeadQuality;
  status: LeadStatus;
  createdAt: string;
  amount?: number;
  duration?: number;
}

// Blog article
export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: number;
  image?: string;
}

// Simulation result for saving
export interface SimulationResult {
  type: string;
  inputs: Record<string, number | string>;
  monthlyPayment: number;
  totalCost: number;
  totalInterest: number;
  createdAt: string;
}
