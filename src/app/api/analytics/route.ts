import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";

const eventSchema = z.object({
  event: z.string().min(1).max(100),
  props: z.record(z.string(), z.unknown()).optional(),
  page: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = eventSchema.parse(body);

    try {
      await prisma.analyticsEvent.create({
        data: {
          event: data.event,
          props: data.props ? (data.props as Prisma.InputJsonValue) : undefined,
          page: data.page || null,
        },
      });
    } catch (dbError) {
      console.warn("[analytics] DB write failed:", dbError);
    }

    return NextResponse.json({ success: true });
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
