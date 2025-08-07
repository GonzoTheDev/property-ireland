import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const data = await req.json();
  try {
    const listing = await prisma.listing.create({
      data: {
        ...data,
        userId,
      },
    });
    return NextResponse.json(listing);
  } catch {
    return NextResponse.json({ error: "Failed to create listing" }, { status: 400 });
  }
}


