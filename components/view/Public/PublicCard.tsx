"use client"
import React from 'react';
import { ICategory, IMeta } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PublicCardProps {
  categoryData: {
    data: ICategory[];
    meta: IMeta;
  };
  children: React.ReactNode;
  title?: string;
  hoverable?: boolean;
  className?: string;
}

const PublicCard = ({ 
  categoryData,
  children,  
  title,
  hoverable,
  className,
}: PublicCardProps) => {
  const data = categoryData.data;
  const meta = categoryData.meta as IMeta;

  return (
    <div className="space-y-4">
      {data?.map((category: ICategory) => (
        <Card 
          key={category.id}
          className={cn(
            "w-[300px] transition-all duration-200",
            hoverable && "hover:shadow-lg hover:scale-[1.02]",
            className
          )}
        >
          <CardHeader>
            {title && <CardTitle>{title}</CardTitle>}
          </CardHeader>
          <CardContent>
            {children}
            <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
            <p className="text-sm text-muted-foreground">Category ID: {category.id}</p>
            {category.profileImage && (
              <p className="text-sm text-muted-foreground">Profile Image: {category.profileImage}</p>
            )}
          </CardContent>
        </Card>
      ))}
      <p className="text-sm text-muted-foreground">Total Categories: {meta.total}</p>
    </div>
  );
};

export default PublicCard;
