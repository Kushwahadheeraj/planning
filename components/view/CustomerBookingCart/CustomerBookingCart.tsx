"use client"
import { getUserInfo, isLoggedIn } from '@/services/auth.service';
import React, { useEffect, useState } from 'react';
import { useCustomersQuery } from '@/redux/api/customerApi';
import { useBookingsQuery, useDeleteBookingMutation } from '@/redux/api/bookingApi';
import { USER_ROLE } from '@/constants/role';
import { redirect } from 'next/navigation';
import CartBadges from '../CartBadge/CartBadge';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast, Toaster } from "sonner";

const CustomerBookingCart = () => {
  const [deleteBooking] = useDeleteBookingMutation();
  const [open, setOpen] = useState(false);
  const [bookingCount, setBookingCount] = useState(0);

  useEffect(() => {
    const { role } = getUserInfo() as any;
    if (!isLoggedIn || role !== USER_ROLE.CUSTOMER) {
      redirect('/login');
    }
  }, []);

  const showDrawer = () => {
    setOpen(true);
    setBookingCount(0);
  };

  // const onClose = () => {
  //   setOpen(false);
  // };

  const query: Record<string, any> = {};
  const { data } = useCustomersQuery({ ...query }, { refetchOnMountOrArgChange: true, pollingInterval: 10000 });
  const { data: cartData } = useBookingsQuery({ ...query }, { refetchOnMountOrArgChange: true, pollingInterval: 10000 });

  const { userId, role } = getUserInfo() as any;

  // const customersd: any = data?.customer?.map((dam: any) => {
  //   if (dam?.id === userId) {
  //     return dam;
  //   }
  // }).filter(Boolean);

  const customerBookingreq = cartData?.bookings?.map((fr: any) => {
    if (fr?.customerID?.id === userId) {
      return fr;
    }
  }).filter(Boolean);

  const customerBookingInCard = customerBookingreq?.map((fdff: any) => fdff);
  const confirmedBookingsCount = customerBookingInCard?.filter((cd: any) => cd?.isConfirm === false)?.length;
  const customerBookingInCardLength = confirmedBookingsCount;

  useEffect(() => {
    if (!open) {
      setBookingCount(customerBookingInCardLength as number);
    } else {
      setBookingCount(0);
    }
  }, [open, customerBookingInCardLength]);

  useEffect(() => {
    if (!open) {
      setBookingCount(0);
    }
  }, [open]);

  useEffect(() => {
    if (isLoggedIn() || !isLoggedIn || role === USER_ROLE.CUSTOMER) {
      setBookingCount(customerBookingInCardLength as number);
    }
  }, [customerBookingInCardLength, role]);

  const isNotConfirmedBookingsCart = customerBookingInCard?.filter((cd: any) => {
    if (cd.isConfirm === false) {
      return cd;
    }
  });

  const deleteBookingHandler = async (id: string) => {
    try {
      const res = await deleteBooking(id);
      if (res) {
        toast.success("Booking Successfully Deleted!");
        setOpen(false);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Toaster />
      <p onClick={showDrawer}><CartBadges messageCount={bookingCount} /></p>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Service History</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            {isNotConfirmedBookingsCart?.map((cartbok: any) => (
              <Card key={cartbok?.id}>
                <CardHeader>
                  <CardTitle>Booking Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Status: {cartbok?.isConfirm === true ? "Confirmed" : "Pending"}</p>
                  <p>Booking ID: {cartbok?.id}</p>
                  <p>Created: {new Date(cartbok?.createdAt).toLocaleDateString()}</p>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Cancel Booking</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remove Booking</AlertDialogTitle>
                        <AlertDialogDescription>
                          Do you want to remove this booking?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteBookingHandler(cartbok?.id)}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default CustomerBookingCart;



