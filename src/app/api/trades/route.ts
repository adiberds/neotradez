import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { listingId } = body

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      select: {
        userId: true,
      },
    })

    if (!listing) {
      return new NextResponse("Listing not found", { status: 404 })
    }

    if (listing.userId === session.user.id) {
      return new NextResponse("Cannot trade your own listing", { status: 400 })
    }

    const existingTrade = await prisma.trade.findFirst({
      where: {
        listingId,
        userId: session.user.id,
        status: "PENDING",
      },
    })

    if (existingTrade) {
      return new NextResponse("Trade already exists", { status: 400 })
    }

    const trade = await prisma.trade.create({
      data: {
        listingId,
        userId: session.user.id,
        status: "PENDING",
      },
      include: {
        listing: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json(trade)
  } catch (error) {
    console.error("[TRADES_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const trades = await prisma.trade.findMany({
      where: {
        OR: [
          {
            userId: session.user.id,
          },
          {
            listing: {
              userId: session.user.id,
            },
          },
        ],
      },
      include: {
        listing: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(trades)
  } catch (error) {
    console.error("[TRADES_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 