import { NextResponse } from 'next/server'
import { Project } from '@/types'

const mockProjects: Project[] = [
    { id: 1, name: "DevFlow", description: "Project management tool", issues: [], createdAt: new Date() },
    { id: 2, name: "Portfolio", description: null, issues: [], createdAt: new Date() },
]

export async function GET() {
    return NextResponse.json(mockProjects)
}