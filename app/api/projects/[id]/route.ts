import { NextResponse } from 'next/server'
import { Project } from '@/types'

const mockProjects: Project[] = [
    { id: 1, name: "DevFlow", description: "Project management tool", issues: [], createdAt: new Date() },
    { id: 2, name: "Portfolio", description: null, issues: [], createdAt: new Date() },
]

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const projectId = Number(id)
    const project = mockProjects.find(p => p.id === projectId)

    if (!project) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json(project)
}