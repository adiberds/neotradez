import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/AuthProvider"
import Navigation from "@/components/Navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NeoTradez - Trade Items Without Money",
  description: "A platform for trading physical items without using money, focusing on value exchange and community.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navigation />
          <main className="min-h-screen bg-background">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
} 