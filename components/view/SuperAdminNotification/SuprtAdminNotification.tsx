"use client"

import { useAdminsQuery } from '@/redux/api/adminApi';
import { getUserInfo } from '@/services/auth.service';
import React, { useEffect, useState } from 'react';
import Badges from '../Badge/Badge';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { format } from "date-fns";

const SuperAdminNotification = () => {
  const [open, setOpen] = useState(false);
  const [messageCount, setMessageCount] = useState(0);

  const showDrawer = () => {
    setOpen(true);
    setMessageCount(0);
  };

  const query: Record<string, any> = {};
  const { data } = useAdminsQuery({ ...query }, { refetchOnMountOrArgChange: true, pollingInterval: 10000 });

  const adminsd: any = data?.admins.map((dam: any) => dam);
  const { userId } = getUserInfo() as any;

  const reversedAdminsd = adminsd?.slice()?.reverse();
  const adminNotification = reversedAdminsd?.map((notif: { notification: any[]; }) => 
    notif?.notification?.slice()?.reverse()
  );

  const admnotid = adminNotification?.map((not: any) => 
    not?.map((n: any) => n.message)
  );

  const admnotdataCreate = adminNotification?.map((not: any) => 
    not?.map((n: any) => n?.booking?.map((b: any) => b?.createdAt))
  );

  const adminnotiConfirm = adminNotification?.map((not: any) => 
    not?.map((n: any) => n?.booking?.map((b: any) => b?.isConfirm))
  );

  useEffect(() => {
    if (!open) {
      setMessageCount(admnotid ? admnotid.reduce((count: any, messages: string | any[]) => count + messages.length, 0) : 0);
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
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Notifications</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            {adminNotification?.map((n: any) => 
              n?.map((not: any) => (
                <Card key={not?.id}>
                  <CardHeader>
                    <CardTitle>Notification {not?.id}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2">{not?.message}</p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>
                        Time: {admnotdataCreate && format(new Date(admnotdataCreate[0]?.[0]?.[0]), 'PPpp')}
                      </p>
                      <p>
                        Status: {adminnotiConfirm?.[0]?.[0]?.[0] === true ? "Confirmed" : "Pending"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default SuperAdminNotification;



