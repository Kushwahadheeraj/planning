"use client"
import React from 'react';
import { Card, Space } from 'antd';
import { ICategory, IMeta } from '@/types';

const PublicCard = ({ 
    categoryData,
    children,  
    title,
    hoverable,
    className,
   }: { 
    categoryData:any,
    children:React.ReactNode;
    title?:string;
    hoverable?:boolean;
    className?:string; }) => {
  const data = categoryData.data;
  const meta = categoryData.meta as IMeta;

  return (
    <Space direction="vertical" size={16}>
      {/* Access data and meta as needed */}
      {data?.map((category: ICategory) => (
        
        <Card key={category.id}
        title={title}
  hoverable={hoverable}
  className={className} 
  bordered={false} 
  style={{ width: 300 }}
        >
          {children}
          <h2>{category.name}</h2>
          {/* Access other properties of the category object as needed */}
          <p>Category ID: {category.id}</p>
          <p>Profile Image: {category.profileImage}</p>
          {/* Add more information from the category object */}
        </Card>
      ))}
      <p>Total Categories: {meta.total}</p>
   </Space>
  );
};

export default PublicCard;
