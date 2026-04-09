import { Project } from '@/types'
import Link from 'next/link'

// This is a React component — like a Vue component but just a function
export default async function ProjectsPage() {
    const response = await fetch('http://localhost:3000/api/projects')
    const projects: Project[] = await response.json()

    return (
        <main>
            <h1>My Projects</h1>
            {/* Loop through projects and show each name */}
            {projects.map(project => (
                <div key={project.id}>
                    <Link href={`/projects/${project.id}`}>
                        <h1>{project.name}</h1>
                        <p>{project.description ?? "No description yet"}</p>
                    </Link>
                </div>
            ))
            }
        </main >
    )
}