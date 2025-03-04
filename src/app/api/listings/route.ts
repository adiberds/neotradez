import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { title, description, category, condition, images } = body

    if (!title || !description || !category || !condition) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        category,
        condition,
        images,
        userId: session.user.id,
      },
    })

    return NextResponse.json(listing)
  } catch (error) {
    console.error("[LISTINGS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search") || ""
    const category = searchParams.get("category")
    const condition = searchParams.get("condition")

    const where = {
      AND: [
        {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        },
        category ? { category } : {},
        condition ? { condition } : {},
      ],
    }

    const listings = await prisma.listing.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(listings)
  } catch (error) {
    console.error("[LISTINGS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 