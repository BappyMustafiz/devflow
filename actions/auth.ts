'use server'

import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

const SignupSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type SignupState = {
    errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
    }
    error?: string
}

export async function signup(
    prevState: SignupState,
    formData: FormData
): Promise<SignupState> {
    const result = SignupSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!result.success) {
        return { errors: result.error.flatten().fieldErrors }
    }

    // check if user already exists
    const existing = await prisma.user.findUnique({
        where: { email: result.data.email }
    })

    if (existing) {
        return { error: 'Email already in use' }
    }

    // hash password — never store plain text
    const hashedPassword = await bcrypt.hash(result.data.password, 10)

    await prisma.user.create({
        data: {
            name: result.data.name,
            email: result.data.email,
            password: hashedPassword,
        }
    })

    redirect('/login?registered=true')
}