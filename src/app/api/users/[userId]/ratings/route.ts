import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const { score, comment } = await request.json()

    if (score < 1 || score > 5) {
      return new NextResponse("Rating must be between 1 and 5", { status: 400 })
    }

    // Check if user has already rated this user
    const existingRating = await prisma.rating.findFirst({
      where: {
        userId: session.user.id,
        targetId: params.userId,
      },
    })

    if (existingRating) {
      return new NextResponse("You have already rated this user", { status: 400 })
    }

    const rating = await prisma.rating.create({
      data: {
        score,
        comment,
        userId: session.user.id,
        targetId: params.userId,
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
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const ratings = await prisma.rating.findMany({
      where: {
        targetId: params.userId,
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
      ratings.reduce((acc, rating) => acc + rating.score, 0) / ratings.length

    return NextResponse.json({
      ratings,
      averageRating: ratings.length > 0 ? averageRating : 0,
      totalRatings: ratings.length,
    })
  } catch (error) {
    console.error("[RATINGS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 