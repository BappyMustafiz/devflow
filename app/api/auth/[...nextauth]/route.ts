import { handlers } from '@/lib/auth'
import { NextRequest } from 'next/server'

const originalGET = handlers.GET

export async function GET(req: NextRequest) {
    // Strip the `iss` parameter that GitHub sends in the callback.
    // @auth/core@0.41 can't validate it correctly (expects "https://authjs.dev").
    if (req.nextUrl.pathname.includes('/callback/github') && req.nextUrl.searchParams.has('iss')) {
        const url = new URL(req.url)
        url.searchParams.delete('iss')
        const cleanReq = new NextRequest(url, {
            method: req.method,
            headers: req.headers,
        })
        return originalGET(cleanReq)
    }

    return originalGET(req)
}

export const POST = handlers.POST
