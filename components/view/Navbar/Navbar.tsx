"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";

interface DecodedToken {
  email: string;
  role: string;
  iat: number;
  exp: number;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface User {
  name?: string;
  email?: string;
}

interface Profile {
  profileImage?: string;
}

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ accessToken?: string } | null>(null);
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);

  useEffect(() => {
    // Get user info from localStorage
    const userInfo = localStorage.getItem(authKey);
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  useEffect(() => {
    if (user?.accessToken) {
      try {
        const decoded = jwtDecode<DecodedToken>(user.accessToken);
        setDecodedToken(decoded);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [user?.accessToken]);

  const handleLogout = () => {
    removeUserInfo(authKey);
    setUser(null);
    router.push("/login");
  };

  const unreadNotifications = notifications?.filter(
    (notification: Notification) => !notification.isRead
  );

  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800">Task Manager</h1>
          </div>

          <div className="flex items-center space-x-4">
            {user?.accessToken ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative">
                      <Bell className="h-5 w-5" />
                      {unreadNotifications && unreadNotifications.length > 0 && (
                        <Badge
                          variant="destructive"
                          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                        >
                          {unreadNotifications.length}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {notifications?.length === 0 ? (
                      <div className="p-2 text-sm text-gray-500">
                        No notifications
                      </div>
                    ) : (
                      notifications?.map((notification: Notification) => (
                        <DropdownMenuItem
                          key={notification.id}
                          className="flex flex-col items-start p-2"
                        >
                          <div className="font-medium">{notification.title}</div>
                          <div className="text-sm text-gray-500">
                            {notification.message}
                          </div>
                          <div className="text-xs text-gray-400">
                            {new Date(notification.createdAt).toLocaleString()}
                          </div>
                        </DropdownMenuItem>
                      ))
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={profileData?.profileImage}
                          alt={userData?.name || "User"}
                        />
                        <AvatarFallback>
                          {userData?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => router.push("/profile")}
                    >
                      Profile
                    </DropdownMenuItem>
                    {decodedToken?.role === "admin" && (
                      <DropdownMenuItem
                        onClick={() => router.push("/admin")}
                      >
                        Admin Dashboard
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button onClick={() => router.push("/login")}>Login</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;