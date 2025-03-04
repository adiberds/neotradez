import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import { RatingForm } from "./RatingForm"
import { Star } from "lucide-react"
import { Rating, Listing } from "@/types"

async function getUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
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
    notFound()
  }

  return user
}

async function getUserRatings(userId: string) {
  const ratings = await prisma.rating.findMany({
    where: {
      targetId: userId,
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
    ratings.reduce((acc: number, rating: Rating) => acc + rating.score, 0) / ratings.length

  return {
    ratings,
    averageRating: ratings.length > 0 ? averageRating : 0,
    totalRatings: ratings.length,
  }
}

export default async function UserPage({
  params,
}: {
  params: { userId: string }
}) {
  const session = await getServerSession(authOptions)
  const user = await getUser(params.userId)
  const { ratings, averageRating, totalRatings } = await getUserRatings(params.userId)

  const canRate = session?.user && session.user.id !== params.userId

  return (
    <div className="container space-y-6 py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h1 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          {user.name}'s Profile
        </h1>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          View user information and ratings.
        </p>
      </div>

      <div className="mx-auto grid gap-6 md:max-w-[64rem]">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <img
                src={user.image || "/default-avatar.png"}
                alt={user.name || "User"}
                className="w-24 h-24 rounded-full"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                    Member since {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary-foreground text-sm">
                    {averageRating.toFixed(1)} ★ ({totalRatings} ratings)
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {user.listings.map((listing: Listing) => (
                <Card key={listing.id}>
                  <CardHeader className="p-0">
                    <div className="aspect-square relative">
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="line-clamp-2">{listing.title}</CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {listing.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                        {listing.category}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary-foreground text-sm">
                        {listing.condition}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ratings</CardTitle>
          </CardHeader>
          <CardContent>
            {canRate && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Rate this user</h3>
                <RatingForm userId={user.id} />
              </div>
            )}

            <div className="space-y-6">
              {ratings.map((rating: Rating) => (
                <div key={rating.id} className="flex gap-4">
                  <img
                    src={rating.user.image || "/default-avatar.png"}
                    alt={rating.user.name || "User"}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{rating.user.name}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < rating.score
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {rating.comment}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(rating.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 