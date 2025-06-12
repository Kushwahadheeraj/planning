import Link from "next/link"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export function Nav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="font-bold">Event Manager</span>
      </Link>
      <Link
        href="/dashboard"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        Dashboard
      </Link>
      <Link
        href="/events"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          pathname === "/events" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        Events
      </Link>
      <div className="flex-1" />
      <div className="flex items-center space-x-2">
        <Link href="/login">
          <Button variant="ghost" size="sm">
            Login
          </Button>
        </Link>
        <Link href="/register">
          <Button size="sm">Register</Button>
        </Link>
      </div>
    </nav>
  )
} 