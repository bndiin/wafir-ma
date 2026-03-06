import { z } from "zod";

// Moroccan phone number: 06 or 07 followed by 8 digits
export const phoneSchema = z
  .string()
  .regex(/^(06|07)\d{8}$/, "Format invalide. Exemple: 0612345678");

// Email
export const emailSchema = z.string().email("Adresse email invalide");

// Lead form
export const leadFormSchema = z.object({
  productType: z.string().min(1, "Sélectionnez un produit"),
  firstName: z.string().min(2, "Minimum 2 caractères"),
  lastName: z.string().min(2, "Minimum 2 caractères"),
  email: emailSchema,
  phone: phoneSchema,
  cityId: z.string().optional(),
  monthlyIncome: z.number().positive().optional(),
  amount: z.number().positive().optional(),
  duration: z.number().positive().optional(),
  profession: z.string().optional(),
  familyStatus: z.string().optional(),
  children: z.number().min(0).optional(),
  purpose: z.string().optional(),
  acceptTerms: z.literal(true, "Vous devez accepter les conditions"),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

// Quote request form
export const quoteFormSchema = z.object({
  name: z.string().min(2, "Minimum 2 caractères"),
  phone: phoneSchema,
  email: emailSchema,
  categoryId: z.string().optional(),
  message: z
    .string()
    .min(10, "Minimum 10 caractères")
    .max(1000, "Maximum 1000 caractères"),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;

// Registration form
export const registerSchema = z.object({
  firstName: z.string().min(2, "Minimum 2 caractères"),
  lastName: z.string().min(2, "Minimum 2 caractères"),
  email: emailSchema,
  phone: phoneSchema,
  password: z.string().min(8, "Minimum 8 caractères"),
  accountType: z.enum(["client", "pro"]),
  companyName: z.string().optional(),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

// Login form
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Mot de passe requis"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Pro profile form
export const proProfileSchema = z.object({
  companyName: z.string().min(2),
  description: z.string().min(50).max(2000),
  phone: phoneSchema,
  whatsapp: phoneSchema.optional(),
  website: z.string().url().optional().or(z.literal("")),
  address: z.string().min(5),
  cityId: z.string(),
  specialities: z.array(z.string()).min(1, "Au moins une spécialité"),
  zones: z.array(z.string()).min(1, "Au moins une zone"),
});

export type ProProfileFormData = z.infer<typeof proProfileSchema>;
