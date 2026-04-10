import SignupForm from '@/components/SignupForm'
import Link from 'next/link'

export default function SignupPage() {
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

                <div className="bg-background border border-border rounded-xl p-6">
                    <h1 className="text-base font-medium mb-1">Create account</h1>
                    <p className="text-sm text-muted-foreground mb-6">
                        Get started with DevFlow for free
                    </p>

                    <SignupForm />

                    <p className="text-xs text-center text-muted-foreground mt-4">
                        Already have an account?{' '}
                        <Link href="/login" className="text-purple-600 hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}