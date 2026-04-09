'use client'

import { useActionState } from 'react'
import { createIssue, FormState } from '@/actions/issues'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const initialState: FormState = {}

export default function IssueForm() {
    const [state, action] = useActionState(createIssue, initialState)

    return (
        <form action={action} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
                <Label htmlFor="title">Issue title</Label>
                <Input
                    id="title"
                    name="title"
                    placeholder="e.g. Fix login button on mobile"
                    className="h-9"
                />
                {state.errors?.title && (
                    <p className="text-xs text-destructive">{state.errors.title[0]}</p>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Add more details about this issue..."
                    className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-ring"
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="status">Status</Label>
                <select
                    id="status"
                    name="status"
                    className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                >
                    <option value="open">Open</option>
                    <option value="in_progress">In progress</option>
                    <option value="closed">Closed</option>
                </select>
            </div>

            <div className="flex items-center gap-3 pt-2">
                <Button type="submit" size="sm">
                    Create issue
                </Button>
                <Button type="button" variant="ghost" size="sm">
                    Cancel
                </Button>
            </div>

            {state.success && (
                <p className="text-xs text-green-600">Issue created successfully!</p>
            )}
        </form>
    )
}