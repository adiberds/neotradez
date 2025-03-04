"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const calculateTilt = (index: number) => {
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const deltaX = (mousePosition.x - centerX) / 50
    const deltaY = (mousePosition.y - centerY) / 50

    // Add some variation based on the card index
    return {
      x: deltaX * (1 + index * 0.1),
      y: -deltaY * (1 + index * 0.1),
    }
  }

  const cards = [
    {
      id: 1,
      title: "Vintage Camera",
      image: "/placeholder.svg?height=200&width=200",
      value: "Est. Value: $120",
      owner: "Alex Chen",
    },
    {
      id: 2,
      title: "Mechanical Keyboard",
      image: "/placeholder.svg?height=200&width=200",
      value: "Est. Value: $150",
      owner: "Jordan Lee",
    },
    {
      id: 3,
      title: "Drone",
      image: "/placeholder.svg?height=200&width=200",
      value: "Est. Value: $300",
      owner: "Sam Rivera",
    },
  ]

  return (
    <section className="relative py-12 md:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,208,132,0.1),transparent_50%)]"></div>
      <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
        <div className="flex flex-col justify-center space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Trade Anything.
              <span className="bg-gradient-to-r from-[#00D084] to-[#3B82F6] bg-clip-text text-transparent dark:from-[#00D084] dark:to-[#3B82F6]">
                {" "}
                No Currency.
              </span>
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              The future of barter is here. Trade physical items directly with others in a seamless digital experience.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-[#00D084] to-[#3B82F6] text-white transition-all hover:shadow-[0_0_20px_rgba(0,208,132,0.5)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Trading <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#3B82F6] to-[#00D084] opacity-0 transition-opacity group-hover:opacity-100"></span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[#3B82F6]/30 bg-background/50 backdrop-blur-sm hover:bg-background/80 dark:border-[#3B82F6]/20 dark:bg-background/10"
            >
              Explore Trades
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Sparkles className="h-4 w-4 text-[#00D084]" />
            <span>Over 10,000 successful trades this month</span>
          </motion.div>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)]"></div>
          <div className="relative h-[400px] w-full max-w-[500px]">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                className="absolute left-0 top-0 h-[280px] w-[220px] cursor-pointer overflow-hidden rounded-xl border border-border/40 bg-background/40 p-4 backdrop-blur-md dark:border-border/20 dark:bg-[#1a1a1a]/40"
                style={{
                  left: `${index * 40}px`,
                  top: `${index * 40}px`,
                  zIndex: cards.length - index,
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotateX: calculateTilt(index).y,
                  rotateY: calculateTilt(index).x,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 * index,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(0, 208, 132, 0.3)",
                  transition: { duration: 0.2 },
                }}
              >
                <div className="flex h-full flex-col">
                  <div className="relative mb-3 h-36 w-full overflow-hidden rounded-lg">
                    <Image
                      src={card.image || "/placeholder.svg"}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.value}</p>
                  <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-muted-foreground">
                    <div className="h-5 w-5 rounded-full bg-primary/20"></div>
                    {card.owner}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

