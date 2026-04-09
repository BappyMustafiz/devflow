// components/SearchBar.tsx
'use client' // only this small piece runs in browser

import { useRouter, useSearchParams } from 'next/navigation'

export default function SearchBar() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const search = searchParams.get('search') ?? ''

    return (
        <input
            value={search}
            onChange={e => router.push(`/issues?search=${e.target.value}`)}
            placeholder="Search issues..."
        />
    )
}