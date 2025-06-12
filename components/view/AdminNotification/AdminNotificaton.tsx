"use client"

import { useAdminsQuery } from '@/redux/api/adminApi';
import { getUserInfo } from '@/services/auth.service';
import React, { useEffect, useState } from 'react';
import Badges from '../Badge/Badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Notification {
  id: string;
  message: string;
  booking?: {
    createdAt: string;
    isConfirm: boolean;
  }[];
}

interface Admin {
  id: string;
  notification: Notification[];
}

const AdminNotification = () => {
  const [open, setOpen] = useState(false);
  const [messageCount, setMessageCount] = useState(0);

  const showDrawer = () => {
    setOpen(true);
    setMessageCount(0);
  };

  const onClose = () => {
    setOpen(false);
  };

  const query: Record<string, any> = {};
  const { data, isLoading } = useAdminsQuery({ ...query }, { refetchOnMountOrArgChange: true, pollingInterval: 10000 });

  const { userId } = getUserInfo() as any;

  const adminsd = data?.admins?.filter((dam: Admin) => dam?.id === userId);
  const reversedAdminsd = adminsd?.slice()?.reverse();
  const adminNotifications = reversedAdminsd?.flatMap((notif: Admin) => notif?.notification?.map(u => u));
  const adminNotification = reversedAdminsd?.map((notif: Admin) => notif?.notification?.slice()?.reverse());
  const admnotid = adminNotification?.map((not: Notification[]) => not?.map((n: Notification) => n.message));
  const admnotdataCreate = adminNotification?.map((not: Notification[]) => not?.map((n: Notification) => n?.booking?.map((b) => b?.createdAt)));
  const adminnotiConfirm = adminNotification?.map((not: Notification[]) => not?.map((n: Notification) => n?.booking?.map((b) => b?.isConfirm)));

  useEffect(() => {
    if (!open) {
      setMessageCount(admnotid ? admnotid.reduce((count: number, messages: string[]) => count + messages.length, 0) : 0);
    } else {
      setMessageCount(0);
    }
  }, [open, admnotid]);

  useEffect(() => {
    if (!open) {
      setMessageCount(0);
    }
  }, [open]);

  return (
    <div>
      <p onClick={showDrawer}><Badges messageCount={messageCount} /></p>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Notifications</SheetTitle>
          </SheetHeader>
          <div className="grid grid-cols-1 gap-4 mt-4">
            {adminNotification?.map((n: Notification[]) => n?.map((not: Notification) => (
              <Card key={not?.id} className="w-full">
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Notification ID: {not?.id}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{not?.message}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Time: {admnotdataCreate}
                  </p>
                  <p className="text-sm text-gray-500">
                    Status: {adminnotiConfirm === "true" ? "Confirmed" : "Pending"}
                  </p>
                </CardContent>
              </Card>
            )))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default AdminNotification;



