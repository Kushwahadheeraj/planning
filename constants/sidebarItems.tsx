"use client"
import { Button, Card, Col, Drawer, Menu, type MenuProps } from "antd";
import {
  ProfileOutlined,
  TableOutlined,
  AppstoreOutlined,
  ScheduleOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";
import { getUserInfo } from "@/services/auth.service";
import AdminNotification from "@/components/view/AdminNotification/AdminNotificaton";
 import CustomerNotification from "@/components/view/CustomerNotification/CustomerNotification";
import CustomerBookingCart from "@/components/view/CustomerBookingCart/CustomerBookingCart";
import SuperAdminNotification from "@/components/view/SuperAdminNotification/SuprtAdminNotification";



export const sidebarItems = (role: string) => {
  

    const publicSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={'/'}>Home</Link>,
      key: "home",
      icon: <ProfileOutlined />,
    
    },
    //  {
    //   label: <Link href={'/category'}>Category</Link>,
    //   key: "category",
    //   icon: <ProfileOutlined />,
    // },
    //  {
    //   label: <Link href={'/services'}>Services</Link>,
    //   key: "services",
    //   icon: <ProfileOutlined />,
    // },
  
  ];
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}/my-profile`}>Account Profile</Link>,
          key: `/${role}/my-profile`,
        },
        {
          label: <Link href={`/${role}/change-password`}>Change Password</Link>,
          key: `/${role}/change-password`,
        },
      ],
    },
  ];

  const commonAdminSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/${role}/allusers`}>Manage Users</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-user`,
    },
    {
      label: <Link href={`/${role}/booking`}>Manage Bookings</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-customer`,
    },
    {
      label: <Link href={`/${role}/category`}> Manage Services</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-category`,
    },
     {
      label: <Link href={`/${role}/service`}>Manage Categorys</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-booking`,
    },
     {
      label: <Link href={`/${role}/blogPage`}>Manage blog</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-blog`,
    },
      {
      label:'',
      icon: <AdminNotification/>,
      key: `drawer`,
    },
    
     

  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
  
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
      {
      label:'',
      icon: <SuperAdminNotification/>,
      key: `drawer`,
    },
   // ...commonAdminSidebarItems,
    // {
    //   label: <Link href={`/${role}/manageadmin`}>Manage Admin</Link>,
    //   icon: <TableOutlined />,
    //   key: `/${role}/manage-something`,
    // }
    
   
  ];


  const customerSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/my-profile`}>Profile</Link>,
      icon: <TableOutlined />,
      key: `/${role}/my-profile`,
    },
     {
      label: <Link href={`/${role}/category`}>Service Page</Link>,
      icon: <TableOutlined />,
      key: `/${role}/my-category`,
    },
   
    {
      label: <Link href={`/${role}/booking`}>Bookings</Link>,
      icon: <ScheduleOutlined />,
      key: `/${role}/booking`,
    },
     {
      label: <Link href={`/${role}/feedback`}>Feedback Form</Link>,
      icon: <ScheduleOutlined />,
      key: `/${role}/feedback`,
    },
 
    // {
    //   label: <Link href={`/${role}/payment`}>Payment</Link>,
    //   icon: <CreditCardOutlined />,
    //   key: `/${role}/payment`,
    // },
    {
      label:"",
      icon: <CustomerNotification/>,
      key: `notification`,
    },
     {
      label:'',
      icon: <CustomerBookingCart/>,
      key: `drawer`,
    },
   
  ];
 const { role:roles } = getUserInfo() as any;
 if(!roles){

 }
  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.CUSTOMER) return customerSidebarItems;
    return publicSidebarItems;
};
