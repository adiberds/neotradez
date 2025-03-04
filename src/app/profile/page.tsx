import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { prisma } from "@/lib/prisma"

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
    select: {
      score: true,
    },
  })

  const averageRating =
    ratings.reduce((acc: number, rating: { score: number }) => acc + rating.score, 0) / ratings.length

  return {
    averageRating: ratings.length > 0 ? averageRating : 0,
    totalRatings: ratings.length,
  }
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/auth/signin")
  }

  const user = await getUser(session.user.id)
  const { averageRating, totalRatings } = await getUserRatings(session.user.id)

  return (
    <div className="container space-y-6 py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h1 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Profile
        </h1>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Manage your account and view your listings.
        </p>
      </div>

      <div className="mx-auto grid gap-6 md:max-w-[64rem]">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={user.image || "/default-avatar.png"}
                  alt={user.name || "User"}
                  className="w-24 h-24 rounded-full"
                />
                <div className="flex-1">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      defaultValue={user.name || ""}
                    />
                  </div>
                  <div className="mt-4 space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      defaultValue={user.email || ""}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </span>
                <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary-foreground text-sm">
                  {averageRating.toFixed(1)} ★ ({totalRatings} ratings)
                </span>
              </div>

              <Button type="submit">Save Changes</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {user.listings.map((listing) => (
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
      </div>
    </div>
  )
} 