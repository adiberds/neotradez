import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: Request,
  { params }: { params: { tradeId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const trade = await prisma.trade.findUnique({
      where: {
        id: params.tradeId,
      },
      include: {
        listing: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
                id: true,
              },
            },
          },
        },
        messages: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    })

    if (!trade) {
      return new NextResponse("Not Found", { status: 404 })
    }

    if (
      trade.userId !== session.user.id &&
      trade.listing.userId !== session.user.id
    ) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    return NextResponse.json(trade)
  } catch (error) {
    console.error("[TRADE_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { tradeId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { status } = body

    const trade = await prisma.trade.findUnique({
      where: {
        id: params.tradeId,
      },
      include: {
        listing: {
          select: {
            userId: true,
          },
        },
      },
    })

    if (!trade) {
      return new NextResponse("Not Found", { status: 404 })
    }

    if (trade.listing.userId !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!["ACCEPTED", "COMPLETED", "CANCELLED"].includes(status)) {
      return new NextResponse("Invalid status", { status: 400 })
    }

    const updatedTrade = await prisma.trade.update({
      where: {
        id: params.tradeId,
      },
      data: {
        status,
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

    return NextResponse.json(updatedTrade)
  } catch (error) {
    console.error("[TRADE_PATCH]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 