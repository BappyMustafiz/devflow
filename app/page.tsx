// app/page.tsx
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'

const features = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="#7C3AED" strokeWidth="1.5" />
        <path d="M5 8l2 2 4-4" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Issue tracking',
    description: 'Create, assign and track issues across your projects with ease'
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="5" height="5" rx="1" stroke="#7C3AED" strokeWidth="1.5" />
        <rect x="9" y="2" width="5" height="5" rx="1" stroke="#7C3AED" strokeWidth="1.5" />
        <rect x="2" y="9" width="5" height="5" rx="1" stroke="#7C3AED" strokeWidth="1.5" />
        <rect x="9" y="9" width="5" height="5" rx="1" stroke="#7C3AED" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Project management',
    description: 'Organize work into projects with clear milestones and deadlines'
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="6" cy="5" r="2.5" stroke="#7C3AED" strokeWidth="1.5" />
        <path d="M1 13c0-2.2 2-4 5-4s5 1.8 5 4" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="5" r="2" stroke="#7C3AED" strokeWidth="1.5" />
        <path d="M14 13c0-1.5-1-2.8-2.5-3.3" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Team collaboration',
    description: 'Work together with your team in real time, assign and review'
  },
]

export default async function LandingPage() {
  const session = await auth()
  if (session) redirect('/dashboard')

  return (
    <div className="min-h-[calc(100vh-56px-45px)] flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 text-xs font-medium px-3 py-1.5 rounded-full mb-8 border border-purple-100">
          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
          Built with Next.js 15 + TypeScript
        </div>

        {/* Hero */}
        <h1 className="text-5xl font-medium tracking-tight mb-5 leading-tight">
          Project management
          <br />
          for <span className="text-purple-600">developers</span>
        </h1>

        <p className="text-muted-foreground text-base mb-10 leading-relaxed max-w-md mx-auto">
          Track issues, manage projects, and ship faster.
          Simple, powerful, and built for engineering teams.
        </p>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-3 mb-16">
          <Link href="/login">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white h-10 px-6">
              Get started free
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="outline" className="h-10 px-6">
              Create account
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 text-left">
          {features.map(feature => (
            <div
              key={feature.title}
              className="bg-background border border-border rounded-xl p-5 hover:border-purple-200 transition-colors"
            >
              <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-sm font-medium mb-2">{feature.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Social proof */}
        <p className="text-xs text-muted-foreground mt-10">
          Free to use · No credit card required · Deploy anywhere
        </p>
      </div>
    </div>
  )
}