import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const profile = await prisma.profile.findUnique({ where: { userId } });
  return NextResponse.json(profile ?? {});
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const data = await req.json();
  const updated = await prisma.profile.upsert({
    where: { userId },
    update: data,
    create: { ...data, userId },
  });
  return NextResponse.json(updated);
}


