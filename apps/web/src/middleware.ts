import { NextRequest, NextResponse } from 'next/server'

import { COOKIES } from '@/core/constants/cookies'

const AUTH_ROUTES: string[] = ['/auth']
const PROTECTED_ROUTES: string[] = ['/my']

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get(COOKIES.REFRESH_TOKEN)?.value
  const url = req.nextUrl.clone()
  const pathname = url.pathname

  if (token && AUTH_ROUTES.some((path) => pathname.startsWith(path))) {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  if (!token && PROTECTED_ROUTES.some((path) => pathname.startsWith(path))) {
    url.pathname = '/auth'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
