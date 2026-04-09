// components/Header.tsx
import Link from 'next/link'
import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import LoginButton from '@/components/LoginButton'

export default async function Header() {
    const session = await auth()

    return (
        <header className="flex items-center justify-between px-5 h-13 border-b border-border bg-background">
            <div className="flex items-center gap-5">
                <Link href="/" className="flex items-center gap-2 text-sm font-medium no-underline text-foreground">
                    <div className="w-6 h-6 bg-purple-600 rounded-md flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2 7L6 11L12 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    DevFlow
                </Link>
                <nav className="flex items-center gap-1">
                    <Link href="/dashboard" className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">Dashboard</Link>
                    <Link href="/projects" className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">Projects</Link>
                    <Link href="/issues" className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">Issues</Link>
                </nav>
            </div>
            <div className="flex items-center gap-2">
                {session && (
                    <Link href="/issues/new">
                        <Button size="sm">+ New issue</Button>
                    </Link>
                )}
                <LoginButton />
            </div>
        </header>
    )
}