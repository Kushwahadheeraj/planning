'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { UserRole } from '@/lib/auth';

interface WithAuthProps {
  requiredRole?: UserRole;
  children: React.ReactNode;
}

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  requiredRole?: UserRole
) {
  return function WithAuth(props: P & WithAuthProps) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClientComponentClient();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession();

          if (!session) {
            router.push('/login');
            return;
          }

          if (requiredRole) {
            const { data: user } = await supabase
              .from('users')
              .select('role')
              .eq('id', session.user.id)
              .single();

            if (!user || user.role !== requiredRole) {
              router.push('/');
              return;
            }
          }

          setIsAuthorized(true);
        } catch (error) {
          console.error('Auth check failed:', error);
          router.push('/login');
        } finally {
          setIsLoading(false);
        }
      };

      checkAuth();
    }, [router, requiredRole, supabase]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isAuthorized) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
} 