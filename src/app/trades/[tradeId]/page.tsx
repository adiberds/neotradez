import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import { MessageForm } from "./MessageForm"
import { TradeActions } from "./TradeActions"
import { Message } from "@/types"

async function getTrade(tradeId: string) {
  const trade = await prisma.trade.findUnique({
    where: {
      id: tradeId,
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
    notFound()
  }

  return trade
}

export default async function TradePage({
  params,
}: {
  params: { tradeId: string }
}) {
  const session = await getServerSession(authOptions)
  const trade = await getTrade(params.tradeId)

  if (
    session?.user?.id !== trade.userId &&
    session?.user?.id !== trade.listing.userId
  ) {
    notFound()
  }

  const isListingOwner = session?.user?.id === trade.listing.userId

  return (
    <div className="container space-y-6 py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h1 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Trade Details
        </h1>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          View and discuss the trade.
        </p>
      </div>

      <div className="mx-auto grid gap-6 md:max-w-[64rem]">
        <Card>
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
                <p className="text-sm text-muted-foreground">
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
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trade.messages.map((message: Message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${
                    message.userId === session?.user?.id
                      ? "flex-row-reverse"
                      : "flex-row"
                  }`}
                >
                  <img
                    src={message.user.image || "/default-avatar.png"}
                    alt={message.user.name || "User"}
                    className="w-8 h-8 rounded-full"
                  />
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.userId === session?.user?.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(message.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <MessageForm tradeId={trade.id} />
          </CardContent>
        </Card>

        <TradeActions
          tradeId={trade.id}
          status={trade.status}
          isListingOwner={isListingOwner}
        />
      </div>
    </div>
  )
} 