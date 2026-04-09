import { Project } from '@/types'

// This is a React component — like a Vue component but just a function
export default function Home() {
  const projects: Project[] = [
    {
      id: 1,
      name: "DevFlow",
      description: null,
      issues: [],
      createdAt: new Date()
    }
  ]

  return (
    <main>
      <h1>My Projects</h1>
      {/* Loop through projects and show each name */}
      {projects.map(project => (
        <div key={project.id}>
          <h1>{project.name}</h1>
          <p>{project.description ?? "No description yet"}</p>
        </div>
      ))}
    </main>
  )
}