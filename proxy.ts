import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const authProxy = auth((req) => {
    const { pathname } = req.nextUrl
    const isLoggedIn = !!req.auth

    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup')

    if (isAuthPage && isLoggedIn) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/issues')

    if (isProtectedRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
})

export function proxy(request: NextRequest) {
    return (authProxy as any)(request, {} as any)
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
