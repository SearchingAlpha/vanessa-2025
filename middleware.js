// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the pathname
  const path = request.nextUrl.pathname;
  
  // Check if the path is /hub (the gaming hub) or starts with /games
  const isProtectedRoute = path === '/hub' || path.startsWith('/games');
  
  // Check if the user is authenticated
  const hasAuthCookie = request.cookies.has('authenticated');
  
  // If the route is protected and the user is not authenticated,
  // redirect to the landing page
  if (isProtectedRoute && !hasAuthCookie) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

// Configure which routes the middleware applies to
export const config = {
  matcher: ['/hub', '/games/:path*'],
};