'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export default function LoginButton() {
    const { data: session } = useSession()

    if (session) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <p>{session.user?.name}</p>
                <Button onClick={() => signOut()}>Sign out</Button>
            </div>
        )
    }

    return (
        <Button onClick={() => signIn('github')}>
            Login with GitHub
        </Button>
    )
}