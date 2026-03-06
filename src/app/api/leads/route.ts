import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Lead submission validation schema
const leadSchema = z.object({
  productType: z.string().min(1),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^(06|07)\d{8}$/, "Format: 06/07 + 8 chiffres"),
  cityId: z.string().optional(),
  monthlyIncome: z.number().positive().optional(),
  amount: z.number().positive().optional(),
  duration: z.number().positive().optional(),
  profession: z.string().optional(),
  familyStatus: z.string().optional(),
  children: z.number().min(0).optional(),
  purpose: z.string().optional(),
  acceptTerms: z.literal(true),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = leadSchema.parse(body);

    // TODO: In production, this will:
    // 1. Save lead to DB via Prisma
    // 2. Run lead-router.ts to match with best pros
    // 3. Send WhatsApp/SMS/Email notifications to matched pros
    // 4. Send confirmation email to client
    // 5. Track lead source and quality

    // For now, return success with mock data
    return NextResponse.json({
      success: true,
      leadId: `LEAD-${Date.now()}`,
      message: "Votre demande a été enregistrée. Un conseiller vous contactera sous 24h.",
      matchedPros: 3,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
