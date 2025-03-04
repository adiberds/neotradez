import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: Request,
  { params }: { params: { listingId: string } }
) {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: params.listingId,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
            id: true,
          },
        },
      },
    })

    if (!listing) {
      return new NextResponse("Not Found", { status: 404 })
    }

    return NextResponse.json(listing)
  } catch (error) {
    console.error("[LISTING_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { listingId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { title, description, images, category, condition } = body

    const listing = await prisma.listing.findUnique({
      where: {
        id: params.listingId,
      },
      select: {
        userId: true,
      },
    })

    if (!listing) {
      return new NextResponse("Not Found", { status: 404 })
    }

    if (listing.userId !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const updatedListing = await prisma.listing.update({
      where: {
        id: params.listingId,
      },
      data: {
        title,
        description,
        images,
        category,
        condition,
      },
    })

    return NextResponse.json(updatedListing)
  } catch (error) {
    console.error("[LISTING_PATCH]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { listingId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const listing = await prisma.listing.findUnique({
      where: {
        id: params.listingId,
      },
      select: {
        userId: true,
      },
    })

    if (!listing) {
      return new NextResponse("Not Found", { status: 404 })
    }

    if (listing.userId !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    await prisma.listing.delete({
      where: {
        id: params.listingId,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[LISTING_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 