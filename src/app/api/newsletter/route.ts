import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const newsletterSchema = z.object({
  email: z.string().email(),
  locale: z.enum(["fr", "ar", "en"]).optional().default("fr"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = newsletterSchema.parse(body);

    try {
      await prisma.newsletter.upsert({
        where: { email: data.email },
        update: { isActive: true, locale: data.locale },
        create: { email: data.email, locale: data.locale },
      });
    } catch (dbError) {
      console.warn("[newsletter] DB write failed:", dbError);
    }

    return NextResponse.json({
      success: true,
      message: "Inscription réussie !",
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
