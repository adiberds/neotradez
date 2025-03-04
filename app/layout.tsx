import type React from "react"
import "./globals.css"
import { Inter, Space_Grotesk } from "next/font/google"
import { cn } from "@/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata = {
  title: "NeoTradez - Futuristic Barter Trading Platform",
  description: "Trade physical items with no currency transactions in a sleek, immersive platform.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn("min-h-screen font-sans antialiased", inter.variable, spaceGrotesk.variable)}>
        {children}
      </body>
    </html>
  )
}



import './globals.css'