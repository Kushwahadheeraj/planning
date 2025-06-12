"use client"

import { useAdminsQuery } from '@/redux/api/adminApi';
import { getUserInfo } from '@/services/auth.service';
import { Button, Card, Col, Drawer } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useEffect, useState } from 'react';
import Badges from '../Badge/Badge';
import { ChildProcess } from 'child_process';

const SuperAdminNotification = () => {

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
  const { data, isLoading } = useAdminsQuery({ ...query },{refetchOnMountOrArgChange:true,pollingInterval:10000});

  const adminsd: any = data?.admins.map((dam:any)=>dam);
console.log(adminsd)
  const { userId } = getUserInfo() as any;

//   const adminsd: any = data?.admins?.map((dam:any) => {
//     if (dam?.id === userId) {
//       return dam;
//     }
//   }).filter(Boolean);
 
const reversedAdminsd = adminsd?.slice()?.reverse();
  let adminNotifications = reversedAdminsd?.flatMap((notif: { notification: any[]; }) => notif?.notification?.map(u=>u));
  console.log("notifiObjects",adminNotifications)
  
 const adminNotification = reversedAdminsd?.map((notif: { notification: any[]; }) => notif?.notification?.slice()?.reverse());
 const admnotid= adminNotification?.map((not:any) => not?.map((n:any)=>n.message));
 const admnotdataCreate= adminNotification?.map((not:any) => not?.map((n:any)=>n?.booking?.map((b:any)=>b?.createdAt)));
  console.log(admnotdataCreate)

 const adminnotiConfirm= adminNotification?.map((not:any) => not?.map((n:any)=>n?.booking?.map((b:any)=>b?.isConfirm)));
  console.log(adminnotiConfirm)

 //  const adminNotification = adminsd?.map((notif: { notification: any[]; }) => notif?.notification?.map(not => not?.message));
  
  console.log(adminNotification)
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
      <Drawer title="Notifications" placement="right" onClose={onClose} open={open}>
        {adminNotification?.map((n:any) =>n?.map((not:any)=> (
          <Col span={8} key={not?.id} style={{ margin: 0 }}>
            <Card
              title={not?.id}
              hoverable
              style={{ width: 320, justifyContent: 'center', display: 'flex' }}
            >
            
              <p>{not?.message}</p>
             <p>Time:{` `} {admnotdataCreate}</p>
             <p>isConfirm: {` `}{adminnotiConfirm ==="true"? "true":"false"}</p>
            </Card>
          </Col>
        )))}
      </Drawer>
    </div>
  );
}

export default SuperAdminNotification;



