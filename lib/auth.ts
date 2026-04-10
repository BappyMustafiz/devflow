import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID!,
            clientSecret: process.env.AUTH_GITHUB_SECRET!,
        }),
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string }
                })

                if (!user || !user.password) return null

                const passwordMatch = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                )

                if (!passwordMatch) return null

                return {
                    id: String(user.id),
                    name: user.name,
                    email: user.email,
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt'
    }
})