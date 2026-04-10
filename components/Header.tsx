// components/Header.tsx
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import LogoutButton from './LogoutButton'

export default async function Header() {
    const session = await auth()

    return (
        <header className="flex items-center justify-between px-6 h-14 border-b border-border bg-background sticky top-0 z-50">
            <div className="flex items-center gap-6">
                <Link href="/" className="flex items-center gap-2 text-sm font-medium text-foreground no-underline">
                    <div className="w-6 h-6 bg-purple-600 rounded-md flex items-center justify-center flex-shrink-0">
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                            <path d="M2 7L6 11L12 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    DevFlow
                </Link>

                {session && (
                    <nav className="flex items-center gap-1">
                        <Link href="/dashboard" className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
                            Dashboard
                        </Link>
                        <Link href="/projects" className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
                            Projects
                        </Link>
                        <Link href="/issues" className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
                            Issues
                        </Link>
                    </nav>
                )}
            </div>

            <div className="flex items-center gap-3">
                {session ? (
                    <>
                        <Link href="/issues/new">
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white h-8 text-xs">
                                + New issue
                            </Button>
                        </Link>
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-xs font-medium text-purple-700">
                                {session.user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <LogoutButton />
                        </div>
                    </>
                ) : (
                    <Link href="/login">
                        <Button size="sm" variant="outline" className="h-8 text-xs">
                            Sign in
                        </Button>
                    </Link>
                )}
            </div>
        </header>
    )
}