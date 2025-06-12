"use client"
import { getUserInfo} from '@/services/auth.service';
import React, { useEffect, useState } from 'react';
import { useCustomersQuery } from '@/redux/api/customerApi';
import Badges from '../Badge/Badge';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const CustomerNotification = () => {
  const [open, setOpen] = useState(false);
  const [messageCount, setMessageCount] = useState(0);

  const showDrawer = () => {
    setOpen(true);
    setMessageCount(0);
  };

  // const onClose = () => {
  //   setOpen(false);
  // };

  const query: Record<string, any> = {};
  const { data } = useCustomersQuery({ ...query }, { refetchOnMountOrArgChange: true, pollingInterval: 10000 });

  const { userId } = getUserInfo() as any;

  const customersd: any = data?.customer?.map((dam: any) => {
    if (dam?.id === userId) {
      return dam;
    }
  }).filter(Boolean);

  const reversedCustomersd = customersd?.slice()?.reverse();
  // const bookingconfirmd = reversedCustomersd?.map((c: any) => c?.booking?.map((b: any) => b?.role));

  const customerNotification = reversedCustomersd?.flatMap((notif: { notification: any[]; }) =>
    notif?.notification?.slice()?.reverse()
  );

  const custNot = customerNotification?.map((not: any) => not?.message);

  useEffect(() => {
    if (!open) {
      setMessageCount(custNot ? custNot.reduce((count: any, messages: string | any[]) => count + messages.length, 0) : 0);
    } else {
      setMessageCount(0);
    }
  }, [open, custNot]);

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
            {customerNotification?.map((not: any) => (
              <Card key={not?.id}>
                <CardHeader>
                  <CardTitle>Notification {not?.id}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{not?.message}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default CustomerNotification;

