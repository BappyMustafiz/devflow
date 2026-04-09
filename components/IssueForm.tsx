'use client'

import { createIssue, FormState } from '@/actions/issues'
import { useActionState } from 'react'

const initialState: FormState = {}

export default function IssueForm() {
    const [state, action] = useActionState(createIssue, initialState)

    return (
        <form action={action}>
            <div>
                <input name="title" placeholder="Issue title" />
                {/* 👇 show error if it exists */}
                {state.errors?.title && (
                    <p style={{ color: 'red' }}>{state.errors.title[0]}</p>
                )}
            </div>
            <button type="submit">Create Issue</button>
            {state.success && <p style={{ color: 'green' }}>Issue created!</p>}
        </form>
    )
}