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
    const { targetId, score, comment } = body

    if (score < 1 || score > 5) {
      return new NextResponse("Rating must be between 1 and 5", { status: 400 })
    }

    if (targetId === session.user.id) {
      return new NextResponse("Cannot rate yourself", { status: 400 })
    }

    const existingRating = await prisma.rating.findFirst({
      where: {
        userId: session.user.id,
        targetId,
      },
    })

    if (existingRating) {
      return new NextResponse("Already rated this user", { status: 400 })
    }

    const rating = await prisma.rating.create({
      data: {
        userId: session.user.id,
        targetId,
        score,
        comment,
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

    return NextResponse.json(rating)
  } catch (error) {
    console.error("[RATINGS_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const targetId = searchParams.get("targetId")

    if (!targetId) {
      return new NextResponse("Target ID is required", { status: 400 })
    }

    const ratings = await prisma.rating.findMany({
      where: {
        targetId,
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
        createdAt: "desc",
      },
    })

    const averageRating =
      ratings.reduce((acc: number, rating: { score: number }) => acc + rating.score, 0) / ratings.length

    return NextResponse.json({
      ratings,
      averageRating: ratings.length > 0 ? averageRating : 0,
    })
  } catch (error) {
    console.error("[RATINGS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 