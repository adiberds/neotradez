"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function Navigation() {
  const { data: session } = useSession()

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-primary">
                NeoTradez
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/listings"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Browse Items
              </Link>
              <Link
                href="/listings/new"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                List Item
              </Link>
              {session && (
                <Link
                  href="/trades"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  My Trades
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {session ? (
              <div className="ml-3 relative">
                <div className="flex items-center space-x-4">
                  <Link
                    href="/profile"
                    className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/signin"
                  className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                >
                  Sign in
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 