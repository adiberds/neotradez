"use client"

import { motion } from "framer-motion"
import { TradeCard } from "@/components/trade-card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function ExploreTrades() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "electronics", name: "Electronics" },
    { id: "furniture", name: "Furniture" },
    { id: "clothing", name: "Clothing" },
    { id: "sports", name: "Sports" },
    { id: "collectibles", name: "Collectibles" },
  ]

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
      category: "Collectibles",
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
      category: "Electronics",
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
      category: "Sports",
      estimatedValue: 600,
      location: "Denver, CO",
      lookingFor: ["Electronics", "Camping Gear"],
    },
    {
      id: 6,
      title: "Designer Clothing Bundle",
      description: "Premium designer clothing items, various sizes. Looking for tech gadgets or home decor.",
      image: "/placeholder.svg?height=300&width=300",
      owner: {
        name: "Riley Morgan",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.5,
      },
      category: "Clothing",
      estimatedValue: 400,
      location: "Miami, FL",
      lookingFor: ["Electronics", "Home Decor"],
    },
    {
      id: 7,
      title: "Vintage Comic Book Collection",
      description:
        "Rare comic books from the 90s in protective sleeves. Looking for collectible figures or rare books.",
      image: "/placeholder.svg?height=300&width=300",
      owner: {
        name: "Alex Wong",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.7,
      },
      category: "Collectibles",
      estimatedValue: 550,
      location: "San Francisco, CA",
      lookingFor: ["Collectible Figures", "Rare Books"],
    },
    {
      id: 8,
      title: "Smart Home Bundle",
      description:
        "Complete smart home starter kit with hub, lights, and sensors. Looking for audio equipment or tools.",
      image: "/placeholder.svg?height=300&width=300",
      owner: {
        name: "Sam Rivera",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.7,
      },
      category: "Electronics",
      estimatedValue: 250,
      location: "Boston, MA",
      lookingFor: ["Audio Equipment", "Tools"],
    },
    {
      id: 9,
      title: "Handcrafted Coffee Table",
      description: "Solid wood coffee table, handmade with natural finish. Looking for kitchen appliances or artwork.",
      image: "/placeholder.svg?height=300&width=300",
      owner: {
        name: "Jordan Lee",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
      },
      category: "Furniture",
      estimatedValue: 320,
      location: "Nashville, TN",
      lookingFor: ["Kitchen Appliances", "Artwork"],
    },
  ]

  const filteredTrades =
    selectedCategory === "all" ? trades : trades.filter((trade) => trade.category.toLowerCase() === selectedCategory)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white hover:from-[#00D084] hover:to-[#3B82F6]"
                  : "border-border/40 bg-background/40 backdrop-blur-sm hover:bg-background/80 dark:border-border/20 dark:bg-background/10"
              }
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTrades.map((trade, index) => (
          <motion.div
            key={trade.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <TradeCard trade={trade} onClick={() => {}} />
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          variant="outline"
          className="gap-2 border-[#3B82F6]/30 bg-background/50 backdrop-blur-sm hover:bg-background/80 dark:border-border/20 dark:bg-background/10"
        >
          Load More Trades
        </Button>
      </div>
    </motion.div>
  )
}

