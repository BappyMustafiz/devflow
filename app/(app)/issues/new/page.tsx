import { Button } from '@/components/ui/button'
import IssueForm from '@/components/IssueForm'

export default function NewIssuePage() {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <h1 className="text-lg font-medium">Create issue</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Add a new issue to track
                </p>
            </div>

            <div className="bg-background border border-border rounded-xl p-6">
                <IssueForm />
            </div>
        </div>
    )
}