'use client'

import { useActionState } from 'react'
import { signup, SignupState } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const initialState: SignupState = {}

export default function SignupForm() {
    const [state, action] = useActionState(signup, initialState)

    return (
        <form action={action} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">Full name</Label>
                <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    className="h-9"
                />
                {state.errors?.name && (
                    <p className="text-xs text-destructive">{state.errors.name[0]}</p>
                )}
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="h-9"
                />
                {state.errors?.email && (
                    <p className="text-xs text-destructive">{state.errors.email[0]}</p>
                )}
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="h-9"
                />
                {state.errors?.password && (
                    <p className="text-xs text-destructive">{state.errors.password[0]}</p>
                )}
            </div>

            {state.error && (
                <p className="text-xs text-destructive">{state.error}</p>
            )}

            <Button type="submit" size="sm">
                Create account
            </Button>
        </form>
    )
}