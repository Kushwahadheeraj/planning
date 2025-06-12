import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { cache } from 'react';

export const createServerClient = cache(() => {
  const cookieStore = cookies();
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
});

export type UserRole = 'ADMIN' | 'STAFF' | 'EVENT_OWNER' | 'USER';

export const getUserRole = async (userId: string): Promise<UserRole> => {
  const supabase = createServerClient();
  const { data: user, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single();

  if (error || !user) {
    return 'USER';
  }

  return user.role as UserRole;
};

export const checkAccess = async (
  userId: string,
  requiredRole: UserRole
): Promise<boolean> => {
  const userRole = await getUserRole(userId);
  
  const roleHierarchy: Record<UserRole, number> = {
    'ADMIN': 4,
    'STAFF': 3,
    'EVENT_OWNER': 2,
    'USER': 1
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};

export const isEventOwner = async (
  userId: string,
  eventId: string
): Promise<boolean> => {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('events')
    .select('organizerId')
    .eq('id', eventId)
    .single();

  if (error || !data) {
    return false;
  }

  return data.organizerId === userId;
}; 