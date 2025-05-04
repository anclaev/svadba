import { NextRequest, NextResponse } from 'next/server'

import { COOKIES } from '@/core/constants/cookies'
import { parseJwt } from '@/core/utils'

import type { TokenPayload } from './core/types'

const AUTH_ROUTES: string[] = ['/auth']
const PROTECTED_ROUTES: string[] = []
const ADMIN_ROUTES: string[] = ['/-']
export const UNVERIFIED_PAGE = '/-/unverified'
export const BLOCKED_PAGE = '/-/blocked'

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get(COOKIES.REFRESH_TOKEN)?.value
  const url = req.nextUrl.clone()
  const pathname = url.pathname

  const tokenPayload = token ? parseJwt<TokenPayload>(token) : null
  const userRole = tokenPayload ? tokenPayload.role : null
  const userStatus = tokenPayload ? tokenPayload.status : null

  if (token && AUTH_ROUTES.some((path) => pathname.startsWith(path))) {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  if (!token && PROTECTED_ROUTES.some((path) => pathname.startsWith(path))) {
    url.pathname = '/auth'
    return NextResponse.redirect(url)
  }

  if (userRole && ADMIN_ROUTES.some((path) => pathname.startsWith(path))) {
    switch (userRole) {
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

  // Проверка на то, подтверждён ли аккаунт
  if (
    userStatus &&
    userStatus === 'CREATED' &&
    PROTECTED_ROUTES.some((path) => pathname.startsWith(path)) &&
    !pathname.startsWith(UNVERIFIED_PAGE)
  ) {
    url.pathname = UNVERIFIED_PAGE
    return NextResponse.redirect(url)
  }

  if (userStatus === 'ACCEPTED' && pathname.startsWith(UNVERIFIED_PAGE)) {
    url.pathname = '/-'
    return NextResponse.redirect(url)
  }

  // Проверка на то, не заблокирован ли аккаунт
  if (
    userStatus &&
    userStatus === 'BLOCKED' &&
    PROTECTED_ROUTES.some((path) => pathname.startsWith(path)) &&
    !pathname.startsWith(BLOCKED_PAGE)
  ) {
    url.pathname = BLOCKED_PAGE
    return NextResponse.redirect(url)
  }

  if (userStatus !== 'BLOCKED' && pathname.startsWith(BLOCKED_PAGE)) {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  NextResponse.next()
}
