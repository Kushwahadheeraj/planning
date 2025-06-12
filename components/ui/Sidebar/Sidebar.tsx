import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { onSidebarClose } from '@/redux/slices/sidebarSlice'
import { Drawer, Layout, Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = ({
    children,
    items
}: {children: React.ReactNode,
    items:{
         key:string,
         label:string,
         href: string
    }[]
}) => {
    const pathname= usePathname()
    const open = useAppSelector((state)=>state?.sidebar.open)
    const dispatch= useAppDispatch()
  return (
    <Layout className='flex-row'>
          <Sider  width={250} className='min-h-screen bg-gray-300  lg:block hidden'>
            <Menu
        className='bg-transparent px-3 py-1'
        disabledOverflow
          theme="light"
          mode="inline"
          selectedKeys={[
            items?.find((item)=>item.href===pathname)?.key!]}
          >
            {
                items?.map((item)=>{
                    return (
                        
                        <Menu.Item key={item.key}>
                            <Link  href={item.href}>
                                 {item.label}
                            </Link>
                        </Menu.Item>
                       
                    )
                })
            }
          </Menu>
          </Sider>
          <Content className='bg-white p-4'>{children}</Content>
        <Drawer  width={250} className='lg:hidden' title="Documents" placement="left" onClose={()=>dispatch(onSidebarClose())} open={open}>
        <Menu
       
        disabledOverflow
          theme="light"
          mode="vertical"
          selectedKeys={[
            items?.find((item)=>item.href===pathname)?.key!]}
          >
            {
                items?.map((item)=>{
                    return (
                        
                        <Menu.Item key={item.key}>
                            <Link  href={item.href}>
                                 {item.label}
                            </Link>
                        </Menu.Item>
                       
                    )
                })
            }
          </Menu>
      </Drawer>
        </Layout>
  )
}

export default Sidebar