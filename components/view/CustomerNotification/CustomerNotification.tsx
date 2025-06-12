 "use client"
import { useAdminsQuery } from '@/redux/api/adminApi';
import { getUserInfo, isLoggedIn } from '@/services/auth.service';
import { Button, Card, Col, Drawer } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useEffect, useState } from 'react';
import Badges from '../Badge/Badge';
import { ChildProcess } from 'child_process';
import { useCustomersQuery } from '@/redux/api/customerApi';
import { USER_ROLE } from '@/constants/role';

const CustomerNotification = () => {

  const [open, setOpen] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  console.log(messageCount)

  const showDrawer = () => {
    setOpen(true);
    setMessageCount(0);
  };

  const onClose = () => {
    setOpen(false);
  };

  const query: Record<string, any> = {};
  const { data, isLoading } = useCustomersQuery({ ...query },{refetchOnMountOrArgChange:true,pollingInterval:10000});

  const customers: any = data?.customer?.map((dam:any) => dam?.id);

  const { userId,role } = getUserInfo() as any;

  const customersd: any = data?.customer?.map((dam:any) => {
    if (dam?.id === userId) {
      return dam;
    }
  }).filter(Boolean);


// Reverse the array before mapping notification messages
 const reversedCustomersd = customersd?.slice()?.reverse();
 console.log(reversedCustomersd?.map((c:any)=>c?.booking?.map((b:any)=>b?.isConfirm)))
 
  const bookingconfirmd=reversedCustomersd?.map((c:any)=>c?.booking?.map((b:any)=>b?.role))
  console.log(bookingconfirmd)
//  if(!bookingconfirmd){
//   return reversedCustomersd
//  }
// else{
//   return bookingconfirmd
// }




const customerNotification = reversedCustomersd?.flatMap((notif: { notification: any[]; }) =>
  notif?.notification?.slice()?.reverse()
);
 //console.log("notificationMessages", customerNotification);
 
  // const customerNotification = customersd?.map((notif: { notification: any[]; }) => notif?.notification?.map(not => not?.message));
  
  const custNot =customerNotification?.map((not:any) => not?.message)
  console.log(custNot)
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
// useEffect(() => {
//      if(isLoggedIn() || !isLoggedIn || role === USER_ROLE.CUSTOMER){
//          setMessageCount(customerNotification);
//          isLoading
//     }
//   }, [customerNotification, isLoading, role]);
  return (
    <div>
      <p onClick={showDrawer}><Badges messageCount={messageCount} /></p>
      <Drawer title="Notifications" placement="right" onClose={onClose} open={open}>
        {customerNotification?.map((not:any) => (
          <Col span={8} key={not?.id} style={{ margin: 0 }}>
            <Card
              title={not?.id}
              hoverable
              style={{ width: 320, justifyContent: 'center', display: 'flex' }}
            >
              
              <p>{not?.message}</p>
              {/* <p>{bookingconfirmd}</p> */}
            </Card>
          </Col>
        ))}
      </Drawer>
    </div>
  );
}

export default CustomerNotification;

