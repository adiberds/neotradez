"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Maximize2, Minimize2 } from "lucide-react"
import Image from "next/image"

export function ExploreMap() {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`relative overflow-hidden rounded-xl border border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40 ${
        expanded ? "h-[600px]" : "h-[300px]"
      }`}
    >
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="relative h-full w-full">
          <Image src="/placeholder.svg?height=600&width=1200" alt="Map view" fill className="object-cover opacity-80" />

          {/* Map pins */}
          <div className="absolute left-[20%] top-[30%] z-20">
            <MapPin count={3} />
          </div>
          <div className="absolute left-[50%] top-[40%] z-20">
            <MapPin count={8} />
          </div>
          <div className="absolute left-[70%] top-[60%] z-20">
            <MapPin count={5} />
          </div>
          <div className="absolute left-[30%] top-[70%] z-20">
            <MapPin count={2} />
          </div>
          <div className="absolute left-[80%] top-[20%] z-20">
            <MapPin count={4} />
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between">
        <Badge className="bg-background/80 backdrop-blur-sm dark:bg-[#121212]/80">Showing 22 trades in your area</Badge>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setExpanded(!expanded)}
          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm dark:bg-[#121212]/80"
        >
          {expanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>
      </div>

      <div className="absolute left-4 top-4 z-20">
        <div className="rounded-lg bg-background/80 p-2 backdrop-blur-sm dark:bg-[#121212]/80">
          <div className="text-xs font-medium">Your Location</div>
          <div className="text-xs text-muted-foreground">Seattle, WA</div>
        </div>
      </div>
    </motion.div>
  )
}

function MapPin({ count }: { count: number }) {
  return (
    <div className="group relative">
      <div className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#00D084] text-xs font-medium text-[#121212] shadow-lg transition-transform hover:scale-110">
        {count}
        <div className="absolute -bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 transform bg-[#00D084]"></div>
      </div>
      <div className="absolute -left-20 -top-24 z-30 hidden min-w-[200px] rounded-lg border border-border/40 bg-background/95 p-3 shadow-xl backdrop-blur-md group-hover:block dark:border-border/20 dark:bg-[#1a1a1a]/95">
        <div className="text-sm font-medium">Multiple Items</div>
        <div className="mt-1 text-xs text-muted-foreground">{count} items available in this area</div>
        <div className="mt-2 flex -space-x-2">
          {Array(Math.min(count, 5))
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="relative h-6 w-6 overflow-hidden rounded-full border-2 border-background dark:border-[#1a1a1a]"
              >
                <Image
                  src={`/placeholder.svg?height=24&width=24&text=${i + 1}`}
                  alt="Item thumbnail"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          {count > 5 && (
            <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium dark:border-[#1a1a1a]">
              +{count - 5}
            </div>
          )}
        </div>
        <Button variant="link" className="mt-1 h-auto p-0 text-xs text-[#00D084]">
          View all items
        </Button>
      </div>
    </div>
  )
}

