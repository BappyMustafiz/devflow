'use client'

import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export default function LogoutButton() {
    return (
        <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs text-muted-foreground hover:text-foreground"
            onClick={() => signOut({ callbackUrl: '/' })}
        >
            Sign out
        </Button>
    )
}