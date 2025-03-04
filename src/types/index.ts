export interface Message {
  id: string
  content: string
  userId: string
  tradeId: string
  createdAt: Date
  user: {
    name: string | null
    image: string | null
  }
}

export interface Trade {
  id: string
  userId: string
  listingId: string
  status: "PENDING" | "ACCEPTED" | "COMPLETED" | "REJECTED" | "CANCELLED"
  createdAt: Date
  listing: {
    id: string
    title: string
    description: string
    images: string[]
    user: {
      id: string
      name: string | null
      image: string | null
    }
  }
  messages: Message[]
}

export interface Rating {
  id: string
  score: number
  comment: string
  userId: string
  targetId: string
  createdAt: Date
  user: {
    name: string | null
    image: string | null
  }
}

export interface Listing {
  id: string
  title: string
  description: string
  images: string[]
  category: string
  condition: string
  createdAt: Date
  userId: string
  user: {
    name: string | null
    image: string | null
  }
} 