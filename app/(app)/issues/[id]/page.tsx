import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'

export default async function IssueDetailPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const issue = await prisma.issue.findUnique({
        where: { id: Number(id) },
        include: { assignee: true, project: true }
    })

    if (!issue) notFound()

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
                <Link href="/issues" className="hover:text-foreground transition-colors">
                    Issues
                </Link>
                <span>/</span>
                <span className="text-foreground">{issue.title}</span>
            </div>

            <div className="bg-background border border-border rounded-xl overflow-hidden">
                <div className="p-6 border-b border-border">
                    <div className="flex items-start justify-between gap-4">
                        <h1 className="text-lg font-medium">{issue.title}</h1>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${issue.status === 'open'
                                ? 'bg-green-50 text-green-700'
                                : issue.status === 'in_progress'
                                    ? 'bg-amber-50 text-amber-700'
                                    : 'bg-muted text-muted-foreground'
                            }`}>
                            {issue.status.replace('_', ' ')}
                        </span>
                    </div>
                    {issue.description && (
                        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                            {issue.description}
                        </p>
                    )}
                </div>

                <div className="p-6 grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-xs text-muted-foreground mb-1">Created</p>
                        <p>{new Date(issue.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'long', day: 'numeric'
                        })}</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground mb-1">Project</p>
                        <p>{issue.project?.name ?? 'No project'}</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground mb-1">Assignee</p>
                        <p>{issue.assignee?.name ?? 'Unassigned'}</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground mb-1">Status</p>
                        <p className="capitalize">{issue.status.replace('_', ' ')}</p>
                    </div>
                </div>

                <div className="px-6 pb-6 flex gap-2">
                    <Button size="sm" variant="outline">Edit issue</Button>
                    <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    )
}