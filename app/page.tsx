import Link from 'next/link'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default async function LandingPage() {
  const session = await auth()

  if (session) redirect('/dashboard')

  return (
    <div className="min-h-[calc(100vh-52px-45px)] flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">

        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 14 14" fill="none">
              <path d="M2 7L6 11L12 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-2xl font-medium">DevFlow</span>
        </div>

        <h1 className="text-4xl font-medium tracking-tight mb-4">
          Project management for
          <span className="text-purple-600"> developers</span>
        </h1>

        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
          Track issues, manage projects, and ship faster.
          Built with Next.js and TypeScript.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link href="/api/auth/signin">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
              Get started with GitHub
            </Button>
          </Link>
          <Link href="/issues">
            <Button size="lg" variant="outline">
              View demo
            </Button>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 text-left">
          {[
            {
              title: 'Issue tracking',
              description: 'Create, assign and track issues across your projects'
            },
            {
              title: 'Project management',
              description: 'Organize work into projects with milestones and deadlines'
            },
            {
              title: 'Team collaboration',
              description: 'Work together with your team in real time'
            },
          ].map(feature => (
            <div
              key={feature.title}
              className="bg-background border border-border rounded-xl p-5"
            >
              <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center mb-3">
                <div className="w-3 h-3 bg-purple-600 rounded-sm" />
              </div>
              <h3 className="text-sm font-medium mb-1">{feature.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}