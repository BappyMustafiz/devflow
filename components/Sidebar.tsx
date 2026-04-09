// components/Sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
    {
        section: 'Workspace',
        items: [
            { href: '/dashboard', label: 'Dashboard', icon: '▦' },
            { href: '/issues', label: 'My issues', icon: '≡', badge: '4' },
        ]
    },
    {
        section: 'Projects',
        items: [
            { href: '/projects', label: 'All projects', icon: '+', badge: '2' },
        ]
    },
]

export default function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-56 border-r border-border bg-background flex flex-col gap-1 p-2 min-h-full">
            {navigation.map(group => (
                <div key={group.section}>
                    <p className="text-xs text-muted-foreground px-2 py-2 uppercase tracking-wider">
                        {group.section}
                    </p>
                    {group.items.map(item => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors ${pathname === item.href
                                    ? 'bg-accent text-foreground'
                                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                                }`}
                        >
                            <span className="text-xs w-4">{item.icon}</span>
                            <span className="flex-1">{item.label}</span>
                            {item.badge && (
                                <span className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full">
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    ))}
                </div>
            ))}
        </aside>
    )
}