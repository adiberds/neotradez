"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeftRight, Check, Clock, MessageSquare, X } from "lucide-react"

export function PendingTrades() {
  const incomingTrades = [
    {
      id: 1,
      title: "Trade Request for your Mechanical Keyboard",
      date: "2023-11-14",
      status: "pending",
      from: {
        name: "Alex Wong",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.7,
      },
      offering: {
        title: "Wireless Headphones",
        image: "/placeholder.svg?height=100&width=100",
        value: 130,
      },
      requesting: {
        title: "Mechanical Keyboard",
        image: "/placeholder.svg?height=100&width=100",
        value: 150,
      },
    },
    {
      id: 2,
      title: "Trade Request for your Vintage Camera Collection",
      date: "2023-11-12",
      status: "pending",
      from: {
        name: "Jamie Rivera",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
      },
      offering: {
        title: "Vinyl Record Collection",
        image: "/placeholder.svg?height=100&width=100",
        value: 250,
      },
      requesting: {
        title: "Vintage Camera Collection",
        image: "/placeholder.svg?height=100&width=100",
        value: 280,
      },
    },
  ]

  const outgoingTrades = [
    {
      id: 3,
      title: "Your Trade Request for Mountain Bike",
      date: "2023-11-13",
      status: "pending",
      to: {
        name: "Casey Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
      },
      offering: {
        title: "Smart Home Bundle",
        image: "/placeholder.svg?height=100&width=100",
        value: 180,
      },
      requesting: {
        title: "Mountain Bike",
        image: "/placeholder.svg?height=100&width=100",
        value: 600,
      },
    },
    {
      id: 4,
      title: "Your Trade Request for Designer Sunglasses",
      date: "2023-11-10",
      status: "pending",
      to: {
        name: "Jordan Patel",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.6,
      },
      offering: {
        title: "Fitness Smartwatch",
        image: "/placeholder.svg?height=100&width=100",
        value: 200,
      },
      requesting: {
        title: "Designer Sunglasses",
        image: "/placeholder.svg?height=100&width=100",
        value: 220,
      },
    },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Tabs defaultValue="incoming" className="w-full">
        <TabsList className="mb-6 w-full justify-start sm:w-auto">
          <TabsTrigger value="incoming" className="min-w-[120px]">
            <span className="flex items-center gap-2">
              Incoming
              <Badge variant="secondary" className="ml-1 bg-[#00D084]/20 text-[#00D084]">
                {incomingTrades.length}
              </Badge>
            </span>
          </TabsTrigger>
          <TabsTrigger value="outgoing" className="min-w-[120px]">
            <span className="flex items-center gap-2">
              Outgoing
              <Badge variant="secondary" className="ml-1 bg-[#3B82F6]/20 text-[#3B82F6]">
                {outgoingTrades.length}
              </Badge>
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="incoming" className="mt-0 space-y-4">
          {incomingTrades.map((trade, index) => (
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
                      <div className="mb-2 flex items-center gap-2">
                        <div className="relative h-8 w-8 overflow-hidden rounded-full">
                          <Image
                            src={trade.from.avatar || "/placeholder.svg"}
                            alt={trade.from.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{trade.from.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            <Clock className="mr-1 inline-block h-3 w-3" />
                            Requested {new Date(trade.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
                        <div className="flex w-full flex-col items-center gap-2 rounded-lg border border-border/40 bg-background/60 p-3 dark:border-border/20 dark:bg-[#1a1a1a]/60 sm:w-auto sm:min-w-[180px]">
                          <div className="relative h-16 w-16 overflow-hidden rounded-md">
                            <Image
                              src={trade.offering.image || "/placeholder.svg"}
                              alt={trade.offering.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium">{trade.offering.title}</p>
                            <p className="text-xs text-muted-foreground">Value: ${trade.offering.value}</p>
                          </div>
                        </div>

                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                          <ArrowLeftRight className="h-4 w-4 text-[#00D084]" />
                        </div>

                        <div className="flex w-full flex-col items-center gap-2 rounded-lg border border-border/40 bg-background/60 p-3 dark:border-border/20 dark:bg-[#1a1a1a]/60 sm:w-auto sm:min-w-[180px]">
                          <div className="relative h-16 w-16 overflow-hidden rounded-md">
                            <Image
                              src={trade.requesting.image || "/placeholder.svg"}
                              alt={trade.requesting.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium">{trade.requesting.title}</p>
                            <p className="text-xs text-muted-foreground">Value: ${trade.requesting.value}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row gap-2 sm:flex-col md:flex-row">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-1 border-[#3B82F6]/30 bg-background/50 backdrop-blur-sm hover:bg-background/80 dark:border-border/20 dark:bg-background/10"
                      >
                        <MessageSquare className="h-4 w-4" />
                        Message
                      </Button>
                      <div className="flex flex-1 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-1 border-destructive/30 bg-background/50 text-destructive backdrop-blur-sm hover:bg-destructive/10 hover:text-destructive dark:border-destructive/20 dark:bg-background/10"
                        >
                          <X className="h-4 w-4" />
                          Decline
                        </Button>
                        <Button size="sm" className="flex-1 gap-1 bg-[#00D084] text-white hover:bg-[#00D084]/90">
                          <Check className="h-4 w-4" />
                          Accept
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="outgoing" className="mt-0 space-y-4">
          {outgoingTrades.map((trade, index) => (
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
                      <div className="mb-2 flex items-center gap-2">
                        <div className="relative h-8 w-8 overflow-hidden rounded-full">
                          <Image
                            src={trade.to.avatar || "/placeholder.svg"}
                            alt={trade.to.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">To: {trade.to.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            <Clock className="mr-1 inline-block h-3 w-3" />
                            Sent {new Date(trade.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
                        <div className="flex w-full flex-col items-center gap-2 rounded-lg border border-border/40 bg-background/60 p-3 dark:border-border/20 dark:bg-[#1a1a1a]/60 sm:w-auto sm:min-w-[180px]">
                          <div className="relative h-16 w-16 overflow-hidden rounded-md">
                            <Image
                              src={trade.offering.image || "/placeholder.svg"}
                              alt={trade.offering.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium">{trade.offering.title}</p>
                            <p className="text-xs text-muted-foreground">Value: ${trade.offering.value}</p>
                          </div>
                        </div>

                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                          <ArrowLeftRight className="h-4 w-4 text-[#3B82F6]" />
                        </div>

                        <div className="flex w-full flex-col items-center gap-2 rounded-lg border border-border/40 bg-background/60 p-3 dark:border-border/20 dark:bg-[#1a1a1a]/60 sm:w-auto sm:min-w-[180px]">
                          <div className="relative h-16 w-16 overflow-hidden rounded-md">
                            <Image
                              src={trade.requesting.image || "/placeholder.svg"}
                              alt={trade.requesting.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium">{trade.requesting.title}</p>
                            <p className="text-xs text-muted-foreground">Value: ${trade.requesting.value}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-1 border-[#3B82F6]/30 bg-background/50 backdrop-blur-sm hover:bg-background/80 dark:border-border/20 dark:bg-background/10"
                      >
                        <MessageSquare className="h-4 w-4" />
                        Message
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-1 border-destructive/30 bg-background/50 text-destructive backdrop-blur-sm hover:bg-destructive/10 hover:text-destructive dark:border-destructive/20 dark:bg-background/10"
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

