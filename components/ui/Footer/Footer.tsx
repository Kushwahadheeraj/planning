"use client"
import Reviews from '@/components/view/Reviews/Reviews'
import { Footer as FooterPage } from 'antd/es/layout/layout'

const Footer = () => {
  return (
     <FooterPage style={{ textAlign: 'center'}}>
      
     <Reviews/>
      Ant Design ©2024 Created by Ant UED
      
      </FooterPage>
  )
}

export default Footer