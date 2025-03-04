"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeftRight, Calendar, MessageSquare, Star } from "lucide-react"

export function CompletedTrades() {
  const completedTrades = [
    {
      id: 1,
      title: "Mechanical Keyboard for Wireless Headphones",
      date: "2023-10-20",
      status: "completed",
      rating: 5,
      withUser: {
        name: "Alex Wong",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.7,
      },
      given: {
        title: "Mechanical Keyboard",
        image: "/placeholder.svg?height=100&width=100",
        value: 150,
      },
      received: {
        title: "Wireless Headphones",
        image: "/placeholder.svg?height=100&width=100",
        value: 130,
      },
    },
    {
      id: 2,
      title: "Smart Home Hub for Fitness Equipment",
      date: "2023-09-15",
      status: "completed",
      rating: 4,
      withUser: {
        name: "Jamie Rivera",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
      },
      given: {
        title: "Smart Home Hub",
        image: "/placeholder.svg?height=100&width=100",
        value: 180,
      },
      received: {
        title: "Fitness Equipment",
        image: "/placeholder.svg?height=100&width=100",
        value: 200,
      },
    },
    {
      id: 3,
      title: "Vintage Camera for Vinyl Records",
      date: "2023-08-05",
      status: "completed",
      rating: 5,
      withUser: {
        name: "Jordan Patel",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.6,
      },
      given: {
        title: "Vintage Camera",
        image: "/placeholder.svg?height=100&width=100",
        value: 120,
      },
      received: {
        title: "Vinyl Records",
        image: "/placeholder.svg?height=100&width=100",
        value: 110,
      },
    },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-4">
      {completedTrades.map((trade, index) => (
        <motion.div
          key={trade.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Card className="overflow-hidden border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                <div className="flex-1">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative h-8 w-8 overflow-hidden rounded-full">
                        <Image
                          src={trade.withUser.avatar || "/placeholder.svg"}
                          alt={trade.withUser.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{trade.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          <Calendar className="mr-1 inline-block h-3 w-3" />
                          Completed {new Date(trade.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-[#00D084]/20 text-[#00D084]">Completed</Badge>
                  </div>

                  <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
                    <div className="flex w-full flex-col items-center gap-2 rounded-lg border border-border/40 bg-background/60 p-3 dark:border-border/20 dark:bg-[#1a1a1a]/60 sm:w-auto sm:min-w-[180px]">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md">
                        <Image
                          src={trade.given.image || "/placeholder.svg"}
                          alt={trade.given.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">{trade.given.title}</p>
                        <p className="text-xs text-muted-foreground">Value: ${trade.given.value}</p>
                      </div>
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <ArrowLeftRight className="h-4 w-4 text-[#00D084]" />
                    </div>

                    <div className="flex w-full flex-col items-center gap-2 rounded-lg border border-border/40 bg-background/60 p-3 dark:border-border/20 dark:bg-[#1a1a1a]/60 sm:w-auto sm:min-w-[180px]">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md">
                        <Image
                          src={trade.received.image || "/placeholder.svg"}
                          alt={trade.received.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">{trade.received.title}</p>
                        <p className="text-xs text-muted-foreground">Value: ${trade.received.value}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < trade.rating ? "fill-amber-500" : "fill-muted stroke-muted"}`}
                        />
                      ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 border-[#3B82F6]/30 bg-background/50 backdrop-blur-sm hover:bg-background/80 dark:border-border/20 dark:bg-background/10"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}

