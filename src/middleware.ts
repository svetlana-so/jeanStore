import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const cookies = req.cookies;
  const session = cookies.get('JeansSession');

  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};
