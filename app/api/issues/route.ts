import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    const issues = await prisma.issue.findMany({
        include: {
            assignee: true
        }
    })
    return NextResponse.json(issues)
}