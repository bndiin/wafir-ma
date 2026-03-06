import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Quote request validation schema
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

    // TODO: In production:
    // 1. Save quote request to DB
    // 2. Send notification to pro (WhatsApp + Email)
    // 3. Send confirmation to client
    // 4. Track as lead source = QUOTE_FORM

    return NextResponse.json({
      success: true,
      requestId: `QR-${Date.now()}`,
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
