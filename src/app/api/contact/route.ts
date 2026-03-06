import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const quoteSchema = z.object({
  proId: z.string().optional(),
  name: z.string().min(2),
  phone: z.string().regex(/^(06|07)\d{8}$/),
  email: z.string().email(),
  categoryId: z.string().optional(),
  message: z.string().min(10).max(1000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = quoteSchema.parse(body);

    let requestId = `QR-${Date.now()}`;
    try {
      const quote = await prisma.quoteRequest.create({
        data: {
          name: data.name,
          phone: data.phone,
          email: data.email,
          productType: data.categoryId || "general",
          city: null,
          details: { message: data.message, proId: data.proId },
        },
      });
      requestId = quote.id;
    } catch (dbError) {
      console.warn("[contact] DB write failed:", dbError);
    }

    return NextResponse.json({
      success: true,
      requestId,
      message: "Votre demande de devis a été envoyée. Le professionnel vous répondra sous 48h.",
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
