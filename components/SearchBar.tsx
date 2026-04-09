'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'

export default function SearchBar() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const search = searchParams.get('search') ?? ''

    return (
        <Input
            value={search}
            onChange={e => router.push(`/issues?search=${e.target.value}`)}
            placeholder="Search issues..."
            className="max-w-sm h-8 text-sm"
        />
    )
}