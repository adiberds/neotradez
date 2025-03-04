import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"

async function getListing(listingId: string) {
  const listing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  })

  if (!listing) {
    notFound()
  }

  return listing
}

export default async function ListingPage({
  params,
}: {
  params: { listingId: string }
}) {
  const session = await getServerSession(authOptions)
  const listing = await getListing(params.listingId)

  return (
    <div className="container space-y-6 py-8 md:py-12 lg:py-24">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {listing.images.slice(1).map((image, index) => (
              <div key={index} className="aspect-square relative rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={`${listing.title} ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{listing.title}</h1>
            <p className="text-muted-foreground">{listing.description}</p>
          </div>

          <div className="flex items-center gap-4">
            <img
              src={listing.user.image || "/default-avatar.png"}
              alt={listing.user.name || "User"}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-medium">{listing.user.name}</p>
              <p className="text-sm text-muted-foreground">
                Listed {new Date(listing.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
              {listing.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary-foreground text-sm">
              {listing.condition}
            </span>
          </div>

          {session?.user?.id !== listing.userId && (
            <Button className="w-full" size="lg">
              Propose Trade
            </Button>
          )}
        </div>
      </div>
    </div>
  )
} 