"use client"
import React from "react";
import Link from "next/link";
import { USER_ROLE } from "./role";
import { getUserInfo } from "@/services/auth.service";
import AdminNotification from "@/components/view/AdminNotification/AdminNotificaton";
import CustomerNotification from "@/components/view/CustomerNotification/CustomerNotification";
import CustomerBookingCart from "@/components/view/CustomerBookingCart/CustomerBookingCart";
import SuperAdminNotification from "@/components/view/SuperAdminNotification/SuprtAdminNotification";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import {
  User,
  Users,
  Calendar,
  CreditCard,
  LayoutGrid,
  FileText,
  Home,
} from "lucide-react";

interface SidebarItem {
  title: string;
  href?: string;
  icon: React.ReactNode;
  items?: {
    title: string;
    href: string;
    description: string;
  }[];
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export const getSidebarItems = (role: string): SidebarItem[] => {
  const publicSidebarItems: SidebarItem[] = [
    {
      title: "Home",
      href: "/",
      icon: <Home className="h-4 w-4" />,
    },
  ];

  const defaultSidebarItems: SidebarItem[] = [
    {
      title: "Profile",
      icon: <User className="h-4 w-4" />,
      items: [
        {
          title: "Account Profile",
          href: `/${role}/my-profile`,
          description: "View and edit your profile information",
        },
        {
          title: "Change Password",
          href: `/${role}/change-password`,
          description: "Update your password",
        },
      ],
    },
  ];

  const commonAdminSidebarItems: SidebarItem[] = [
    {
      title: "Manage Users",
      href: `/${role}/allusers`,
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Manage Bookings",
      href: `/${role}/booking`,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      title: "Manage Services",
      href: `/${role}/category`,
      icon: <LayoutGrid className="h-4 w-4" />,
    },
    {
      title: "Manage Categories",
      href: `/${role}/service`,
      icon: <LayoutGrid className="h-4 w-4" />,
    },
    {
      title: "Manage Blog",
      href: `/${role}/blogPage`,
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: "",
      icon: <AdminNotification />,
    },
  ];

  const adminSidebarItems = [...defaultSidebarItems, ...commonAdminSidebarItems];

  const superAdminSidebarItems: SidebarItem[] = [
    ...defaultSidebarItems,
    {
      title: "",
      icon: <SuperAdminNotification />,
    },
  ];

  const customerSidebarItems: SidebarItem[] = [
    ...defaultSidebarItems,
    {
      title: "Profile",
      href: `/${role}/my-profile`,
      icon: <User className="h-4 w-4" />,
    },
    {
      title: "Service Page",
      href: `/${role}/category`,
      icon: <LayoutGrid className="h-4 w-4" />,
    },
    {
      title: "Bookings",
      href: `/${role}/booking`,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      title: "Feedback Form",
      href: `/${role}/feedback`,
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: "",
      icon: <CustomerNotification />,
    },
    {
      title: "",
      icon: <CustomerBookingCart />,
    },
  ];

  return role === USER_ROLE.SUPER_ADMIN
    ? superAdminSidebarItems
    : role === USER_ROLE.ADMIN
    ? adminSidebarItems
    : role === USER_ROLE.CUSTOMER
    ? customerSidebarItems
    : publicSidebarItems;
};

export const SidebarNavigation = ({ role }: { role: string }) => {
  const items = getSidebarItems(role);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {items.map((item, index) => (
          <NavigationMenuItem key={index}>
            {item.items ? (
              <>
                <NavigationMenuTrigger className="h-9">
                  {item.icon}
                  <span className="ml-2">{item.title}</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {item.items.map((subItem) => (
                      <ListItem
                        key={subItem.href}
                        href={subItem.href}
                        title={subItem.title}
                      >
                        {subItem.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <Link href={item.href || "#"} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item.icon}
                  {item.title && <span className="ml-2">{item.title}</span>}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
