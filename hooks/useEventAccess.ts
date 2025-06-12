'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { UserRole } from '@/lib/auth';

interface EventAccess {
  canEdit: boolean;
  canDelete: boolean;
  canManageBookings: boolean;
  isLoading: boolean;
}

export function useEventAccess(eventId: string): EventAccess {
  const [access, setAccess] = useState<EventAccess>({
    canEdit: false,
    canDelete: false,
    canManageBookings: false,
    isLoading: true,
  });

  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          setAccess({
            canEdit: false,
            canDelete: false,
            canManageBookings: false,
            isLoading: false,
          });
          return;
        }

        // Get user role
        const { data: user } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single();

        // Check if user is event owner
        const { data: event } = await supabase
          .from('events')
          .select('organizerId')
          .eq('id', eventId)
          .single();

        const isAdmin = user?.role === 'ADMIN';
        const isStaff = user?.role === 'STAFF';
        const isEventOwner = event?.organizerId === session.user.id;

        setAccess({
          canEdit: isAdmin || isStaff || isEventOwner,
          canDelete: isAdmin || isEventOwner,
          canManageBookings: isAdmin || isStaff || isEventOwner,
          isLoading: false,
        });
      } catch (error) {
        console.error('Error checking event access:', error);
        setAccess({
          canEdit: false,
          canDelete: false,
          canManageBookings: false,
          isLoading: false,
        });
      }
    };

    checkAccess();
  }, [eventId, supabase]);

  return access;
} 