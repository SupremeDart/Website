import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // public paths that don't require authentication
  const isPublicPath = path === '/auth/signin' || 
                      path === '/auth/signup' || 
                      path === '/auth/forgot-password' ||
                      path === '/' ||
                      path.startsWith('/api/');
  
  // Get the session token
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });
  
  // Redirect logic
  if (isPublicPath && token) {
    // If user is authenticated and tries to access auth pages, redirect to dashboard
    if (path.startsWith('/auth/')) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    // Allow authenticated users to access other public paths
    return NextResponse.next();
  }
  
  // If user is not authenticated and tries to access protected routes
  if (!isPublicPath && !token) {
    // Save the intended destination for after login
    const url = new URL('/auth/signin', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

// paths that should be checked by the middleware
export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/profile',
    '/bills/:path*',
    '/transactions/:path*',
    '/auth/:path*',
  ],
};