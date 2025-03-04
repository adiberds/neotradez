"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface TradeActionsProps {
  tradeId: string
  status: string
  isListingOwner: boolean
}

export function TradeActions({ tradeId, status, isListingOwner }: TradeActionsProps) {
  const router = useRouter()
  const { toast } = useToast()

  const handleAction = async (newStatus: string) => {
    try {
      const response = await fetch(`/api/trades/${tradeId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(error)
      }

      router.refresh()
      toast({
        title: "Success",
        description: `Trade ${newStatus.toLowerCase()} successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update trade status.",
        variant: "destructive",
      })
    }
  }

  if (isListingOwner && status === "PENDING") {
    return (
      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          className="bg-red-50 text-red-600 hover:bg-red-100"
          onClick={() => handleAction("REJECTED")}
        >
          Reject
        </Button>
        <Button onClick={() => handleAction("ACCEPTED")}>Accept</Button>
      </div>
    )
  }

  if (status === "ACCEPTED") {
    return (
      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          className="bg-red-50 text-red-600 hover:bg-red-100"
          onClick={() => handleAction("CANCELLED")}
        >
          Cancel
        </Button>
        <Button onClick={() => handleAction("COMPLETED")}>Complete</Button>
      </div>
    )
  }

  return null
} 