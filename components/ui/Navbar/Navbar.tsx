"use client";
import { sidebarItems } from "@/constants/sidebarItems";
import { authKey } from "@/constants/storageKey";
import { useAppDispatch } from "@/redux/hooks";
import { showSidebarDrawer } from "@/redux/slices/sidebarSlice";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SidebarItem {
  key: string;
  label: string;
  href?: string;
}

const Navbar = ({
  hasSider,
}: {
  hasSider?: boolean;
}) => {
  const { role } = getUserInfo() as any;
  const pathname = usePathname();
  const router = useRouter();

  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  const [open, setOpen] = useState(false);
  
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <header className="flex h-16 items-center justify-between px-4 md:px-6 shadow-sm bg-gray-800 text-white">
      {hasSider && (
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => {
            dispatch(showSidebarDrawer());
          }}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      )}

      <Link href="/" className="flex items-center justify-center">
        <h1 className={cn("text-xl font-bold", hasSider && "text-center sm:text-left")}>
          Events
        </h1>
      </Link>

      <nav className="hidden lg:flex items-center space-x-4">
        {sidebarItems(role).map((item: SidebarItem) => (
          <Link
            key={item.key}
            href={item.href || '#'}
            className={cn(
              "text-sm font-medium transition-colors hover:text-blue-400",
              pathname === item.href ? "text-blue-400" : "text-gray-300"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        {role ? (
          <Button variant="outline" onClick={logOut}>
            Sign Out
          </Button>
        ) : (
          <Button variant="outline" onClick={() => router.push("/login")}>
            Sign In
          </Button>
        )}

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm">
            <nav className="flex flex-col gap-4 py-6">
              {sidebarItems(role).map((item: SidebarItem) => (
                <Link
                  key={item.key}
                  href={item.href || '#'}
                  className={cn(
                    "text-lg font-medium hover:text-gray-800 dark:hover:text-gray-200",
                    pathname === item.href ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;