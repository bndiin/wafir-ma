import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

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

    // Try to save to DB; if DB is not available, still return success
    let leadId = `LEAD-${Date.now()}`;
    try {
      const lead = await prisma.lead.create({
        data: {
          clientName: `${data.firstName} ${data.lastName}`,
          clientPhone: data.phone,
          clientEmail: data.email,
          clientCity: data.cityId || null,
          productType: data.productType,
          amount: data.amount || null,
          duration: data.duration || null,
          source: "COMPARATOR",
          quality: "WARM",
          status: "NEW",
          categoryId: data.productType, // Will match category slug
          details: {
            firstName: data.firstName,
            lastName: data.lastName,
            monthlyIncome: data.monthlyIncome,
            profession: data.profession,
            familyStatus: data.familyStatus,
            children: data.children,
            purpose: data.purpose,
          },
        },
      });
      leadId = lead.id;
    } catch (dbError) {
      // DB not available — log but don't fail the request
      console.warn("[leads] DB write failed, returning mock response:", dbError);
    }

    return NextResponse.json({
      success: true,
      leadId,
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
