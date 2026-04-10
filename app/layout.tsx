import type { Metadata } from 'next'
import Providers from '@/components/Providers'
import Header from '@/components/Header'
import './globals.css'

export const metadata: Metadata = {
  title: 'DevFlow',
  description: 'Project management for developers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-muted/30">
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <footer className="flex items-center justify-between px-5 py-3 border-t border-border bg-background text-xs text-muted-foreground">
              <span>DevFlow v1.0</span>
              <span>Built with Next.js + TypeScript</span>
              <span>© 2026</span>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}