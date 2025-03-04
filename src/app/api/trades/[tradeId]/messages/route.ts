import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(
  request: Request,
  { params }: { params: { tradeId: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const { content } = await request.json()

    const trade = await prisma.trade.findUnique({
      where: {
        id: params.tradeId,
      },
      include: {
        listing: true,
      },
    })

    if (!trade) {
      return new NextResponse("Trade not found", { status: 404 })
    }

    if (
      session.user.id !== trade.userId &&
      session.user.id !== trade.listing.userId
    ) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const message = await prisma.message.create({
      data: {
        content,
        userId: session.user.id,
        tradeId: params.tradeId,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json(message)
  } catch (error) {
    console.error("[MESSAGES_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

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
      select: {
        userId: true,
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

    if (
      trade.userId !== session.user.id &&
      trade.listing.userId !== session.user.id
    ) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const messages = await prisma.message.findMany({
      where: {
        tradeId: params.tradeId,
      },
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
    })

    return NextResponse.json(messages)
  } catch (error) {
    console.error("[MESSAGES_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 