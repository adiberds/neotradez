import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: params.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
        listings: {
          select: {
            id: true,
            title: true,
            description: true,
            images: true,
            category: true,
            condition: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    })

    if (!user) {
      return new NextResponse("Not Found", { status: 404 })
    }

    const ratings = await prisma.rating.findMany({
      where: {
        targetId: params.userId,
      },
      select: {
        score: true,
      },
    })

    const averageRating =
      ratings.reduce((acc: number, rating: { score: number }) => acc + rating.score, 0) / ratings.length

    return NextResponse.json({
      ...user,
      averageRating: ratings.length > 0 ? averageRating : 0,
      totalRatings: ratings.length,
    })
  } catch (error) {
    console.error("[USER_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (session.user.id !== params.userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { name, image } = body

    const user = await prisma.user.update({
      where: {
        id: params.userId,
      },
      data: {
        name,
        image,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error("[USER_PATCH]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 