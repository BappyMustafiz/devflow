import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import SearchBar from '@/components/SearchBar'

export default async function IssuesPage({
    searchParams
}: {
    searchParams: Promise<{ search?: string }>
}) {
    const { search } = await searchParams

    const issues = await prisma.issue.findMany({
        where: search ? {
            title: {
                contains: search,
            }
        } : undefined,
        orderBy: { createdAt: 'desc' },
        include: { assignee: true }
    })

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-lg font-medium">Issues</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        {issues.length} issue{issues.length !== 1 ? 's' : ''} found
                    </p>
                </div>
                <Link href="/issues/new">
                    <Button size="sm">+ New issue</Button>
                </Link>
            </div>

            <div className="bg-background border border-border rounded-xl overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                    <SearchBar />
                </div>

                {issues.length === 0 ? (
                    <div className="px-4 py-12 text-center">
                        <p className="text-sm text-muted-foreground mb-3">
                            {search ? `No issues matching "${search}"` : 'No issues yet'}
                        </p>
                        <Link href="/issues/new">
                            <Button size="sm" variant="outline">Create first issue</Button>
                        </Link>
                    </div>
                ) : (
                    issues.map(issue => (
                        <Link
                            key={issue.id}
                            href={`/issues/${issue.id}`}
                            className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-muted/50 transition-colors group"
                        >
                            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${issue.status === 'open' ? 'bg-green-500' :
                                issue.status === 'in_progress' ? 'bg-amber-500' :
                                    'bg-muted-foreground'
                                }`} />
                            <span className="flex-1 text-sm group-hover:text-foreground">
                                {issue.title}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${issue.status === 'open'
                                ? 'bg-green-50 text-green-700'
                                : issue.status === 'in_progress'
                                    ? 'bg-amber-50 text-amber-700'
                                    : 'bg-muted text-muted-foreground'
                                }`}>
                                {issue.status.replace('_', ' ')}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                {new Date(issue.createdAt).toLocaleDateString()}
                            </span>
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}