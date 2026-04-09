export type IssueStatus = "open" | "in_progress" | "closed"

export type User = {
  id: number
  name: string
  email: string
  avatarUrl: string | null
}

export type Issue = {
  id: number
  title: string
  status: IssueStatus
  assignee: User | null
  createdAt: Date
}

export type Project = {
  id: number
  name: string
  description: string | null
  issues: Issue[]
  createdAt: Date
}
