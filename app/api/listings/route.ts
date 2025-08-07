import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") as "RENT" | "SALE" | null;
  const county = searchParams.get("county");
  const q = searchParams.get("q");

  const where: Record<string, unknown> = {};
  if (type) where.type = type;
  if (county) where.county = county;
  if (q) where.OR = [{ title: { contains: q, mode: "insensitive" } }, { town: { contains: q, mode: "insensitive" } }];

  const listings = await prisma.listing.findMany({
    where,
    include: { images: true, user: { select: { id: true, name: true } } },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json(listings);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const listing = await prisma.listing.create({
      data: {
        title: data.title,
        description: data.description,
        type: data.type,
        price: data.price,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        areaSqM: data.areaSqM ?? null,
        furnished: data.furnished ?? null,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2 ?? null,
        town: data.town,
        county: data.county,
        eircode: data.eircode ?? null,
        latitude: data.latitude ?? null,
        longitude: data.longitude ?? null,
        amenities: data.amenities ?? [],
        userId: data.userId,
        images: data.images?.length
          ? { createMany: { data: data.images.map((u: string, i: number) => ({ url: u, orderIndex: i })) } }
          : undefined,
      },
      include: { images: true },
    });
    return NextResponse.json(listing);
  } catch {
    return NextResponse.json({ error: "Failed to create listing" }, { status: 400 });
  }
}


