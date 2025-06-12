"use client";

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { onSidebarClose } from '@/redux/slices/sidebarSlice'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

interface SidebarProps {
    children: React.ReactNode;
    items: {
        key: string;
        label: string;
        href: string;
    }[];
}

const Sidebar = ({
    children,
    items
}: SidebarProps) => {
    const pathname = usePathname()
    const [mounted, setMounted] = useState(false);
    const open = useAppSelector((state)=>state?.sidebar.open)
    const dispatch= useAppDispatch()

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="flex min-h-screen">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-64 flex-col border-r bg-gray-50">
                <ScrollArea className="flex-1 px-3 py-4">
                    <nav className="grid gap-1">
                        {items?.map((item) => (
                            <Link
                                key={item.key}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-gray-100",
                                    pathname === item.href
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-500"
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </ScrollArea>
            </aside>

            {/* Mobile Sidebar */}
            <Sheet open={open} onOpenChange={() => dispatch(onSidebarClose())}>
                <SheetTrigger asChild className="lg:hidden">
                    <Button variant="ghost" size="icon" className="lg:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                    <ScrollArea className="flex-1 px-3 py-4">
                        <nav className="grid gap-1">
                            {items?.map((item) => (
                                <Link
                                    key={item.key}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-gray-100",
                                        pathname === item.href
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-500"
                                    )}
                                    onClick={() => dispatch(onSidebarClose())}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </ScrollArea>
                </SheetContent>
            </Sheet>

            {/* Main Content */}
            <main className="flex-1 p-4 bg-white">
                {children}
            </main>
        </div>
    )
}

export default Sidebar