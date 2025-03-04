"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { TradeCard } from "@/components/trade-card"
import { TradeModal } from "@/components/trade-modal"

export function LiveTradeFeed() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTrade, setSelectedTrade] = useState(null)

  const openTradeModal = (trade) => {
    setSelectedTrade(trade)
    setIsModalOpen(true)
  }

  const trades = [
    {
      id: 1,
      title: "Gaming Console",
      description: "Latest model gaming console, barely used. Looking for a mountain bike or high-end camera.",
      image: "/placeholder.svg?height=300&width=300",
      owner: {
        name: "Morgan Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
      },
      category: "Electronics",
      estimatedValue: 450,
      location: "Seattle, WA",
      lookingFor: ["Sports Equipment", "Cameras"],
    },
    {
      id: 2,
      title: "Vintage Record Collection",
      description:
        "Collection of 50+ vinyl records from the 70s and 80s. Great condition. Looking for musical instruments.",
      image: "/placeholder.svg?height=300&width=300",
      owner: {
        name: "Jamie Rivera",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
      },
      category: "Music & Media",
      estimatedValue: 300,
      location: "Portland, OR",
      lookingFor: ["Musical Instruments", "Audio Equipment"],
    },
    {
      id: 3,
      title: "Professional DSLR Camera",
      description: "Professional camera with 2 lenses and accessories. Looking for a laptop or tablet.",
      image: "/placeholder.svg?height=300&width=300",
      owner: {
        name: "Taylor Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.7,
      },
      category: "Photography",
      estimatedValue: 800,
      location: "Austin, TX",
      lookingFor: ["Computers", "Electronics"],
    },
    {
      id: 4,
      title: "Designer Desk Chair",
      description:
        "Ergonomic designer chair, perfect condition. Looking for home office equipment or smart home devices.",
      image: "/placeholder.svg?height=300&width=300",
      owner: {
        name: "Jordan Patel",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.6,
      },
      category: "Furniture",
      estimatedValue: 350,
      location: "Chicago, IL",
      lookingFor: ["Office Equipment", "Smart Home"],
    },
    {
      id: 5,
      title: "Mountain Bike",
      description: "High-end mountain bike, lightly used. Looking for electronics or camping gear.",
      image: "/placeholder.svg?height=300&width=300",
      owner: {
        name: "Casey Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
      },
      category: "Sports & Outdoors",
      estimatedValue: 600,
      location: "Denver, CO",
      lookingFor: ["Electronics", "Camping Gear"],
    },
    {
      id: 6,
      title: "Smart Home Bundle",
      description:
        "Complete smart home starter kit with hub, lights, and sensors. Looking for audio equipment or tools.",
      image: "/placeholder.svg?height=300&width=300",
      owner: {
        name: "Alex Wong",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.7,
      },
      category: "Electronics",
      estimatedValue: 250,
      location: "San Francisco, CA",
      lookingFor: ["Audio Equipment", "Tools"],
    },
  ]

  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
      >
        <div>
          <h2 className="font-heading text-3xl font-bold tracking-tight">Live Trade Feed</h2>
          <p className="text-muted-foreground">Discover the latest items available for trade</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search trades..."
              className="w-full min-w-[200px] pl-8 sm:w-[200px] md:w-[300px]"
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </motion.div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-8 w-full justify-start overflow-auto sm:w-auto">
          <TabsTrigger value="all" className="min-w-[100px]">
            All Trades
          </TabsTrigger>
          <TabsTrigger value="electronics" className="min-w-[100px]">
            Electronics
          </TabsTrigger>
          <TabsTrigger value="furniture" className="min-w-[100px]">
            Furniture
          </TabsTrigger>
          <TabsTrigger value="clothing" className="min-w-[100px]">
            Clothing
          </TabsTrigger>
          <TabsTrigger value="sports" className="min-w-[100px]">
            Sports
          </TabsTrigger>
          <TabsTrigger value="other" className="min-w-[100px]">
            Other
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trades.map((trade, index) => (
              <motion.div
                key={trade.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <TradeCard trade={trade} onClick={() => openTradeModal(trade)} />
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="electronics" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trades
              .filter((trade) => trade.category === "Electronics")
              .map((trade, index) => (
                <motion.div
                  key={trade.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <TradeCard trade={trade} onClick={() => openTradeModal(trade)} />
                </motion.div>
              ))}
          </div>
        </TabsContent>

        {/* Other tab contents would follow the same pattern */}
        <TabsContent value="furniture" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trades
              .filter((trade) => trade.category === "Furniture")
              .map((trade, index) => (
                <motion.div
                  key={trade.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <TradeCard trade={trade} onClick={() => openTradeModal(trade)} />
                </motion.div>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-center">
        <Button
          variant="outline"
          className="gap-2 border-[#3B82F6]/30 bg-background/50 backdrop-blur-sm hover:bg-background/80 dark:border-[#3B82F6]/20 dark:bg-background/10"
        >
          Load More Trades
        </Button>
      </div>

      {isModalOpen && selectedTrade && <TradeModal trade={selectedTrade} onClose={() => setIsModalOpen(false)} />}
    </section>
  )
}

