import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, message } = await req.json();
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });
  await prisma.dataDeletionRequest.create({ data: { email, message } });
  return NextResponse.json({ ok: true });
}


