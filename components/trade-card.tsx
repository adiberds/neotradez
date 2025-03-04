"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeftRight, MapPin } from "lucide-react"

export function TradeCard({ trade, onClick }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 20px rgba(0, 208, 132, 0.15)",
      }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card
        onClick={onClick}
        className="group h-full cursor-pointer overflow-hidden border-border/40 bg-background/40 backdrop-blur-md transition-colors hover:border-[#00D084]/50 dark:border-border/20 dark:bg-[#1a1a1a]/40"
      >
        <CardContent className="p-0">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={trade.image || "/placeholder.svg"}
              alt={trade.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-3 backdrop-blur-sm dark:from-[#121212]/80">
              <Badge variant="outline" className="bg-background/50 backdrop-blur-sm dark:bg-[#121212]/50">
                {trade.category}
              </Badge>
            </div>
          </div>
          <div className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-heading text-lg font-semibold">{trade.title}</h3>
              <div className="text-sm font-medium text-muted-foreground">~${trade.estimatedValue}</div>
            </div>
            <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{trade.description}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="relative h-6 w-6 overflow-hidden rounded-full">
                <Image
                  src={trade.owner.avatar || "/placeholder.svg"}
                  alt={trade.owner.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span>{trade.owner.name}</span>
              <span className="ml-auto flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {trade.location}
              </span>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <ArrowLeftRight className="h-4 w-4 text-[#00D084]" />
              <span className="text-xs font-medium">Looking for:</span>
              <div className="flex flex-wrap gap-1">
                {trade.lookingFor.map((item, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

