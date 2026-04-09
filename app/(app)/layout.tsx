import Sidebar from '@/components/Sidebar'

export default function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-[calc(100vh-52px-45px)]">
            <Sidebar />
            <div className="flex-1 overflow-auto bg-muted/30 p-6">
                {children}
            </div>
        </div>
    )
}