"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Search, Send } from "lucide-react"

export function MessagesLayout() {
  const [selectedChat, setSelectedChat] = useState(null)

  const chats = [
    {
      id: 1,
      name: "Morgan Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Hey, did you ship the keyboard yet?",
      lastMessageTime: "2023-11-15T10:30:00",
      unread: 2,
    },
    {
      id: 2,
      name: "Jamie Rivera",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "I'm interested in trading for your camera.",
      lastMessageTime: "2023-11-14T15:45:00",
      unread: 0,
    },
    {
      id: 3,
      name: "Taylor Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Let me know if you're still looking for a laptop.",
      lastMessageTime: "2023-11-13T09:12:00",
      unread: 1,
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "me",
      text: "Hey, I'm interested in trading for your vintage camera collection.",
      time: "2023-11-14T15:40:00",
    },
    {
      id: 2,
      sender: "other",
      text: "Great! What do you have to offer?",
      time: "2023-11-14T15:42:00",
    },
    {
      id: 3,
      sender: "me",
      text: "I have a vinyl record collection I'd be willing to trade.",
      time: "2023-11-14T15:43:00",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid h-[600px] grid-cols-1 lg:grid-cols-[300px_1fr]"
    >
      <div className="border-r border-border/40 bg-background/40 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search messages..." className="w-full pl-9" />
          </div>
        </div>
        <div className="overflow-y-auto">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`flex w-full items-start gap-3 border-b border-border/40 p-4 last:border-none hover:bg-accent hover:text-accent-foreground dark:border-border/20 ${selectedChat?.id === chat.id ? "bg-accent text-accent-foreground" : ""}`}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={chat.avatar} alt={chat.name} />
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{chat.name}</h3>
                  <span className="text-xs text-muted-foreground">
                    {new Date(chat.lastMessageTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <p className="line-clamp-1 text-sm text-muted-foreground">{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <div className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#00D084] text-xs font-medium text-[#121212]">
                  {chat.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        {selectedChat ? (
          <>
            <div className="sticky top-0 z-10 border-b border-border/40 bg-background/80 p-4 backdrop-blur-md dark:border-border/20 dark:bg-[#121212]/80">
              <div className="flex items-center gap-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedChat.name}</h3>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-2 flex flex-col ${message.sender === "me" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`rounded-xl px-3 py-2 text-sm ${
                      message.sender === "me" ? "bg-[#00D084]/10 text-right" : "bg-muted"
                    }`}
                  >
                    {message.text}
                  </div>
                  <span className="mt-1 text-[0.7rem] text-muted-foreground">
                    {new Date(message.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              ))}
            </div>
            <div className="sticky bottom-0 border-t border-border/40 bg-background/80 p-4 backdrop-blur-md dark:border-border/20 dark:bg-[#121212]/80">
              <div className="flex items-center gap-2">
                <Input type="text" placeholder="Type your message..." className="flex-1" />
                <Button variant="outline" size="icon">
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-center text-muted-foreground">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </motion.div>
  )
}

