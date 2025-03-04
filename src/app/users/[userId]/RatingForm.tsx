"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Star, StarHalf } from "lucide-react"

interface RatingFormProps {
  userId: string
}

export function RatingForm({ userId }: RatingFormProps) {
  const [score, setScore] = useState(0)
  const [comment, setComment] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`/api/users/${userId}/ratings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ score, comment }),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(error)
      }

      setScore(0)
      setComment("")
      router.refresh()
      toast({
        title: "Rating submitted",
        description: "Your rating has been submitted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit rating.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setScore(value)}
            className="focus:outline-none"
          >
            {value <= score ? (
              <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
            ) : (
              <Star className="h-6 w-6 text-gray-300" />
            )}
          </button>
        ))}
      </div>

      <Textarea
        placeholder="Write a comment about your experience..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="min-h-[100px]"
        disabled={isLoading}
      />

      <Button type="submit" disabled={isLoading || score === 0}>
        {isLoading ? "Submitting..." : "Submit Rating"}
      </Button>
    </form>
  )
} 