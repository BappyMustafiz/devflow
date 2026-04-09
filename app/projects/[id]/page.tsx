import { Project } from '@/types'

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
    // const { id } = await params
    // const response = await fetch(`/api/projects/${id}`)
    // if (!response.ok) {
    //     return <p>Project not found</p>
    // }
    // const project: Project = await response.json()

    return (
        <>
            <p>No data found</p>
            {/* <h1>{project.name}</h1>
            <p>{project.description ?? "No description yet"}</p> */}
        </>
    )
}