import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Bell } from 'lucide-react';

interface BadgesProps {
  messageCount: number;
}

const Badges = ({ messageCount }: BadgesProps) => (
  <div className="relative inline-flex items-center">
    <Badge 
      variant="destructive" 
      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0"
    >
      {messageCount > 50 ? '50+' : messageCount}
    </Badge>
    <Bell className="h-5 w-5" />
  </div>
);

export default Badges;