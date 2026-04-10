import LoginForm, { GitHubLoginButton } from "@/components/LoginForm"
import Link from "next/link"

export default async function LoginPage({
    searchParams
}: {
    searchParams: Promise<{ registered?: string }>
}) {
    const { registered } = await searchParams

    return (
        <div className="min-h-[calc(100vh-52px-45px)] flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2 7L6 11L12 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span className="text-lg font-medium">DevFlow</span>
                </div>

                {registered && (
                    <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-lg mb-4 text-center">
                        Account created! Please sign in.
                    </div>
                )}

                <div className="bg-background border border-border rounded-xl p-6">
                    <h1 className="text-base font-medium mb-1">Welcome back</h1>
                    <p className="text-sm text-muted-foreground mb-6">
                        Sign in to your account
                    </p>

                    <div className="mb-4">
                        <GitHubLoginButton />
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex-1 h-px bg-border" />
                        <span className="text-xs text-muted-foreground">or</span>
                        <div className="flex-1 h-px bg-border" />
                    </div>

                    <LoginForm />

                    <p className="text-xs text-center text-muted-foreground mt-4">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-purple-600 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}