export const getBaseUrl = () => {
    if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
    return 'http://localhost:3000'
}

export async function fetchData<T>(url: string): Promise<T> {
    const response = await fetch(`${getBaseUrl()}${url}`)
    if (!response.ok) throw new Error(`Failed to fetch: ${url}`)
    return response.json()
}