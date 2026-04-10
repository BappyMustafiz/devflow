import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'

export default async function DashboardPage() {
    const [openCount, inProgressCount, closedCount, recentIssues] = await Promise.all([
        prisma.issue.count({ where: { status: 'open' } }),
        prisma.issue.count({ where: { status: 'in_progress' } }),
        prisma.issue.count({ where: { status: 'closed' } }),
        prisma.issue.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: { assignee: true }
        })
    ])

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-lg font-medium">Dashboard</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Welcome back, here's what's happening
                    </p>
                </div>
                <Link href="/issues/new">
                    <Button size="sm">+ New issue</Button>
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                    { label: 'Open issues', value: openCount, color: 'text-green-700' },
                    { label: 'In progress', value: inProgressCount, color: 'text-amber-700' },
                    { label: 'Closed', value: closedCount, color: 'text-muted-foreground' },
                ].map(stat => (
                    <div key={stat.label} className="bg-background border border-border rounded-xl p-4">
                        <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                        <p className={`text-2xl font-medium ${stat.color}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent issues */}
            <div className="bg-background border border-border rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                    <h2 className="text-sm font-medium">Recent issues</h2>
                    <Link href="/issues">
                        <Button variant="ghost" size="sm" className="text-xs">
                            View all
                        </Button>
                    </Link>
                </div>
                {recentIssues.length === 0 ? (
                    <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                        No issues yet —{' '}
                        <Link href="/issues/new" className="text-purple-600 hover:underline">
                            create your first one
                        </Link>
                    </div>
                ) : (
                    recentIssues.map(issue => (
                        <Link
                            key={issue.id}
                            href={`/issues/${issue.id}`}
                            className="flex items-center gap-3 px-4 py-2.5 border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                        >
                            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${issue.status === 'open' ? 'bg-green-500' :
                                issue.status === 'in_progress' ? 'bg-amber-500' :
                                    'bg-muted-foreground'
                                }`} />
                            <span className="flex-1 text-sm">{issue.title}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${issue.status === 'open' ? 'bg-green-50 text-green-700' :
                                issue.status === 'in_progress' ? 'bg-amber-50 text-amber-700' :
                                    'bg-muted text-muted-foreground'
                                }`}>
                                {issue.status.replace('_', ' ') ?? 'unknown'}
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