'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const LoginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginErrors = {
    email?: string
    password?: string
}

export default function LoginForm() {
    const router = useRouter()
    const [errors, setErrors] = useState<LoginErrors>({})
    const [serverError, setServerError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setErrors({})
        setServerError('')

        const formData = new FormData(e.currentTarget)
        const values = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        }

        // client side validation first
        const result = LoginSchema.safeParse(values)

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors
            setErrors({
                email: fieldErrors.email?.[0],
                password: fieldErrors.password?.[0],
            })
            return
        }

        setLoading(true)

        const signInResult = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false,
        })

        if (signInResult?.error) {
            setServerError('Invalid email or password')
            setLoading(false)
            return
        }

        router.refresh()
        router.push('/dashboard')
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className={`h-9 ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                />
                {errors.email && (
                    <p className="text-xs text-destructive">{errors.email}</p>
                )}
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className={`h-9 ${errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                />
                {errors.password && (
                    <p className="text-xs text-destructive">{errors.password}</p>
                )}
            </div>

            {serverError && (
                <div className="bg-red-50 text-red-700 text-xs px-3 py-2 rounded-md border border-red-100">
                    {serverError}
                </div>
            )}

            <Button
                type="submit"
                size="sm"
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700 text-white"
            >
                {loading ? 'Signing in...' : 'Sign in'}
            </Button>
        </form>
    )
}

export function GitHubLoginButton() {
    const [loading, setLoading] = useState(false)

    return (
        <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={loading}
            onClick={() => {
                setLoading(true)
                signIn('github', { callbackUrl: '/dashboard' })
            }}
        >
            {loading ? 'Redirecting...' : 'Continue with GitHub'}
        </Button>
    )
}