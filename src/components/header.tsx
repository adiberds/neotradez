import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">NeoTradez</span>
        </Link>
        <Navigation />
        <div className="flex flex-1 items-center justify-end space-x-4">
          {session ? (
            <>
              <Link href="/listings/new">
                <Button>List Item</Button>
              </Link>
              <Button variant="outline" onClick={() => signOut()}>
                Sign out
              </Button>
            </>
          ) : (
            <Link href="/auth/signin">
              <Button>Sign in</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
} 