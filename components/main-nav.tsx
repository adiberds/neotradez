"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export function MainNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/explore",
      label: "Explore",
      active: pathname === "/explore",
    },
    {
      href: "/my-trades",
      label: "My Trades",
      active: pathname === "/my-trades",
    },
    {
      href: "/messages",
      label: "Messages",
      active: pathname === "/messages",
    },
  ]

  return (
    <nav className="hidden md:flex md:gap-6 lg:gap-10">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-foreground/80",
            route.active ? "text-foreground" : "text-foreground/60",
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}

