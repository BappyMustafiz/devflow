import SearchBar from "@/components/SearchBar"
import { Issue } from "@/types"
import Link from "next/link"
import { fetchData } from '@/lib/api'

// Server Component — fetches data on server
export default async function IssuesPage({
    searchParams
}: {
    searchParams: Promise<{ search?: string }>
}) {
    const { search } = await searchParams
    // const response = await fetch('http://localhost:3000/api/issues')
    // const issues: Issue[] = await response.json()
    const issues = await fetchData<Issue[]>(`/api/issues`)

    const filtered = search
        ? issues.filter(issue =>
            issue.title.toLowerCase().includes(search.toLowerCase())
        )
        : issues

    return (
        <main>
            <h1>Issues</h1>
            {/* 👇 Client Component nested inside Server Component */}
            <SearchBar />
            <Link href={'/issues/new'}>Create new</Link>
            {/* 👇 Just displaying data — stays as Server Component */}
            {filtered.map(issue => (
                <div key={issue.id}>{issue.title} -- {issue.status}</div>
            ))}
        </main>
    )
}