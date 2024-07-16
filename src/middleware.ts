/* import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
 */

import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const cookies = req.cookies;
  const session = cookies.get('JeansSession');

  // Check if the session cookie exists
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Allow the request to proceed if the session cookie exists
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*', // Apply this middleware to all routes under /dashboard
};
