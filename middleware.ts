import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { canManageEvent, canViewEvent } from './utils/auth';
import { UserRole } from './types/auth';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/events', '/login', '/signup'];
  const isPublicRoute = publicRoutes.some(route => 
    req.nextUrl.pathname === route || req.nextUrl.pathname.startsWith('/events/')
  );

  // Protected routes that require authentication
  const protectedRoutes = ['/dashboard', '/profile', '/rsvp'];
  const isProtectedRoute = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  );

  // Admin/Staff routes
  const managementRoutes = ['/admin', '/manage-events'];
  const isManagementRoute = managementRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  );

  // Handle public routes
  if (isPublicRoute) {
    return res;
  }

  // Handle unauthenticated users
  if (!session) {
    const redirectUrl = new URL('/login', req.url);
    redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Get user role from database
  const { data: user } = await supabase
    .from('users')
    .select('role')
    .eq('id', session.user.id)
    .single();

  const userRole = user?.role as UserRole || 'USER';

  // Handle management routes
  if (isManagementRoute && !canManageEvent(userRole)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Handle protected routes
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL('/login', req.url);
    redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - public files
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}; 