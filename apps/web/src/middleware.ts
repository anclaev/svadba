import { NextRequest, NextResponse } from 'next/server'

import { COOKIES } from '@/core/constants/cookies'
import { parseJwt } from '@/core/utils'

import type { TokenPayload } from './core/types'

const AUTH_ROUTES: string[] = ['/auth']
const PROTECTED_ROUTES: string[] = ['/-']
const ADMIN_ROUTES: string[] = ['/-/files', '/-/guests', '/-/system']

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get(COOKIES.REFRESH_TOKEN)?.value
  const url = req.nextUrl.clone()
  const pathname = url.pathname
  const role = token ? parseJwt<TokenPayload>(token).role : null

  if (token && AUTH_ROUTES.some((path) => pathname.startsWith(path))) {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  if (!token && PROTECTED_ROUTES.some((path) => pathname.startsWith(path))) {
    url.pathname = '/auth'
    return NextResponse.redirect(url)
  }

  if (role && ADMIN_ROUTES.some((path) => pathname.startsWith(path))) {
    switch (role) {
      case 'GROOM': {
        return NextResponse.next()
      }

      case 'BRIDE':
      case 'PARENT': {
        if (!pathname.startsWith('/-/system')) {
          return NextResponse.next()
        }
      }

      default: {
        url.pathname = '/-'
        return NextResponse.redirect(url)
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
