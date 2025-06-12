"use client"
import Sidebar from '@/components/ui/Sidebar/Sidebar'
import React from 'react'

const SuperAdminSidebar = ({children}:{children:React.ReactNode}) => {
     const items=[
      {key:"1",label:"All admin",href:"/super_admin"},
      {key:"2",label:"All Admin Profile",href:"/super_admin/my-profile"},
      {key:"3",label:"Department",href:"/super_admin/department"}
    ]
  return <Sidebar items={items}>
    {children}
  </Sidebar>
  
}

export default SuperAdminSidebar