import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"

async function getTrades(userId: string) {
  const trades = await prisma.trade.findMany({
    where: {
      OR: [
        {
          userId,
        },
        {
          listing: {
            userId,
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

  return trades
}

export default async function TradesPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/auth/signin")
  }

  const trades = await getTrades(session.user.id)

  return (
    <div className="container space-y-6 py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h1 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          My Trades
        </h1>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          View and manage your trades.
        </p>
      </div>

      <div className="mx-auto grid gap-6 md:max-w-[64rem]">
        {trades.map((trade) => (
          <Card key={trade.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  {trade.listing.title}
                </CardTitle>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    trade.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : trade.status === "ACCEPTED"
                      ? "bg-green-100 text-green-800"
                      : trade.status === "COMPLETED"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {trade.status}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <img
                  src={trade.listing.images[0]}
                  alt={trade.listing.title}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {trade.listing.description}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <img
                      src={trade.listing.user.image || "/default-avatar.png"}
                      alt={trade.listing.user.name || "User"}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm text-muted-foreground">
                      {trade.listing.user.name}
                    </span>
                  </div>
                </div>
                <Button variant="outline" asChild>
                  <a href={`/trades/${trade.id}`}>View Details</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 