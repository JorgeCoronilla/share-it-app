import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { verifyJwtToken } from '@/app/lib/auth';

export default async function nextjs_future(request: NextRequest) {
  const PUBLIC_FILE = /\.(.*)$/;
  const isPublicFiles = PUBLIC_FILE.test(request.nextUrl.pathname);
  if (isPublicFiles) {
    return NextResponse.next();
  }
  console.log('request.nextUrl.pathname', request.nextUrl.pathname);
  // Checks cookie
  const cookie = request.cookies.get('access-token');
  console.log('cookie', cookie);
  if (cookie) {
    console.log('entra?');

    const cookiePairs = cookie.value.split('; ');
    const tokenPair = cookiePairs.find((pair) =>
      pair.startsWith('access-token=')
    );

    // Gets token from cookie
    if (tokenPair) {
      const token = tokenPair.split('=')[1];
      const verified = await verifyJwtToken(token);

      if (verified) {
        return NextResponse.next();
      } else {
        console.log('Token not found in the cookie.');
        return NextResponse.redirect(new URL('/', request.url));
      }
    }
  }
  console.log('TOken not found in the cookie.');
  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: ['/dashboard'],
};
