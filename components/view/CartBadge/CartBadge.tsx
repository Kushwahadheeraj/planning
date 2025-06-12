import React from 'react';
import { Avatar, Badge, Space } from 'antd';
import { NotificationFilled, NotificationOutlined, NotificationTwoTone, ShoppingCartOutlined } from '@ant-design/icons';
import { useAdminsQuery } from '@/redux/api/adminApi';
import { getUserInfo } from '@/services/auth.service';

const CartBadges = ({messageCount}:{messageCount:any}) => (
 
  <Space size="small">
    {/* count={99} overflowCount={10} */}
    <Badge count={messageCount} overflowCount={50}>
       <ShoppingCartOutlined style={{backgroundColor:"white",fontSize:'20px',textAlign:'center',margin:'4px',padding:'0px',justifyContent:'center',alignItems:'center'}} />
  
      {/* <Avatar style={{backgroundColor:"blue"}} shape="square" size="default"  /> */}
    </Badge>
  </Space>
);

export default CartBadges;