import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "./stack";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await stackServerApp.getUser();

  // If user is not authenticated and trying to access protected routes, redirect to sign-in
  if (!user && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/handler/sign-in', request.url));
  }

  // If user is authenticated and accessing root, redirect to dashboard
  if (user && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Allow all other requests to proceed normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/', // Include root path for redirect
    '/dashboard/:path*',
    '/Docs/:path*',
  ],
};