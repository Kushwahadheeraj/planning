"use client"
import Sidebar from '@/components/ui/Sidebar/Sidebar'
import React from 'react'

const AdminSidebar = ({children}:{children:React.ReactNode}) => {
     const items=[
      // {key:"1",label:"Admins",href:"/admin"},
      {key:"1",label:"Profile",href:"/admin/my-profile"}
      
    ]
  return <Sidebar items={items}>
    {children}
  </Sidebar>
  
}

export default AdminSidebar