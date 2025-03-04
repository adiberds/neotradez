"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowLeftRight, Calendar, Edit, Eye, MoreHorizontal, Trash2, TrendingUp } from "lucide-react"

export function ActiveListings() {
  const activeListings = [
    {
      id: 1,
      title: "Mechanical Keyboard",
      description: "RGB mechanical keyboard with custom keycaps. Looking for audio equipment or computer accessories.",
      image: "/placeholder.svg?height=300&width=300",
      category: "Electronics",
      estimatedValue: 150,
      datePosted: "2023-11-15",
      views: 42,
      offers: 3,
    },
    {
      id: 2,
      title: "Vintage Camera Collection",
      description:
        "Set of 3 vintage film cameras in working condition. Looking for vinyl records or musical instruments.",
      image: "/placeholder.svg?height=300&width=300",
      category: "Photography",
      estimatedValue: 280,
      datePosted: "2023-11-10",
      views: 67,
      offers: 5,
    },
    {
      id: 3,
      title: "Mountain Bike",
      description: "High-end mountain bike, lightly used. Looking for electronics or camping gear.",
      image: "/placeholder.svg?height=300&width=300",
      category: "Sports",
      estimatedValue: 600,
      datePosted: "2023-11-05",
      views: 89,
      offers: 7,
    },
    {
      id: 4,
      title: "Designer Sunglasses",
      description: "Limited edition designer sunglasses with case. Looking for watches or accessories.",
      image: "/placeholder.svg?height=300&width=300",
      category: "Fashion",
      estimatedValue: 220,
      datePosted: "2023-11-01",
      views: 35,
      offers: 2,
    },
    {
      id: 5,
      title: "Smart Home Hub",
      description:
        "Latest model smart home hub with voice control. Looking for kitchen appliances or fitness equipment.",
      image: "/placeholder.svg?height=300&width=300",
      category: "Electronics",
      estimatedValue: 180,
      datePosted: "2023-10-28",
      views: 51,
      offers: 4,
    },
    {
      id: 6,
      title: "Leather Jacket",
      description: "Genuine leather jacket, medium size. Looking for winter sports equipment or outdoor gear.",
      image: "/placeholder.svg?height=300&width=300",
      category: "Clothing",
      estimatedValue: 250,
      datePosted: "2023-10-25",
      views: 48,
      offers: 3,
    },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {activeListings.map((listing, index) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="h-full overflow-hidden border-border/40 bg-background/40 backdrop-blur-md hover:border-[#00D084]/50 dark:border-border/20 dark:bg-[#1a1a1a]/40">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="absolute right-3 top-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm dark:bg-[#121212]/80"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Listing
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Listing
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ArrowLeftRight className="mr-2 h-4 w-4" />
                          View Offers
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <Badge className="absolute left-3 top-3 bg-background/80 backdrop-blur-sm dark:bg-[#121212]/80">
                    {listing.category}
                  </Badge>
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-heading text-lg font-semibold">{listing.title}</h3>
                    <div className="text-sm font-medium text-muted-foreground">~${listing.estimatedValue}</div>
                  </div>
                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{listing.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Posted {new Date(listing.datePosted).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{listing.views} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-[#00D084]" />
                      <span className="text-[#00D084]">{listing.offers} offers</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

