'use server'

import { z } from 'zod'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

const IssueSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    status: z.enum(['open', 'in_progress', 'closed']).default('open')
})

export type FormState = {
    errors?: {
        title?: string[]
    }
    success?: boolean
}

export async function createIssue(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const result = IssueSchema.safeParse({
        title: formData.get('title'),
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    await prisma.issue.create({
        data: {
            title: result.data.title,
            status: result.data.status,
        }
    })

    redirect('/issues')
}