"use client"
import Sidebar from '@/components/ui/Sidebar/Sidebar'
import React from 'react'

const CustomerSidebar = ({children}:{children:React.ReactNode}) => {
     const items=[
      {key:"1",label:"Home",href:"/"},
      {key:"2",label:"My-profile",href:"my-profile"},
      
    ]
  return <Sidebar items={items}>
    {children}
  </Sidebar>
  
}

export default CustomerSidebar