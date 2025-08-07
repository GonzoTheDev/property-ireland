import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(_req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const l = await prisma.listing.findUnique({ where: { id } });
  if (!l) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(l);
}


