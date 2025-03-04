"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ActiveListings } from "@/components/my-trades/active-listings"
import { PendingTrades } from "@/components/my-trades/pending-trades"
import { CompletedTrades } from "@/components/my-trades/completed-trades"
import { DraftTrades } from "@/components/my-trades/draft-trades"

export function MyTradesTabs() {
  return (
    <Tabs defaultValue="active" className="w-full">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <TabsList className="mb-8 w-full justify-start overflow-auto sm:w-auto">
          <TabsTrigger value="active" className="min-w-[120px]">
            <span className="flex items-center gap-2">
              Active Listings
              <Badge variant="secondary" className="ml-1 bg-[#00D084]/20 text-[#00D084]">
                6
              </Badge>
            </span>
          </TabsTrigger>
          <TabsTrigger value="pending" className="min-w-[120px]">
            <span className="flex items-center gap-2">
              Pending Trades
              <Badge variant="secondary" className="ml-1 bg-[#3B82F6]/20 text-[#3B82F6]">
                4
              </Badge>
            </span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="min-w-[120px]">
            Completed
          </TabsTrigger>
          <TabsTrigger value="drafts" className="min-w-[120px]">
            Drafts
          </TabsTrigger>
        </TabsList>
      </motion.div>

      <TabsContent value="active" className="mt-0">
        <ActiveListings />
      </TabsContent>

      <TabsContent value="pending" className="mt-0">
        <PendingTrades />
      </TabsContent>

      <TabsContent value="completed" className="mt-0">
        <CompletedTrades />
      </TabsContent>

      <TabsContent value="drafts" className="mt-0">
        <DraftTrades />
      </TabsContent>
    </Tabs>
  )
}

