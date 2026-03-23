import type { ReactNode } from 'react'
import { TopicHeader } from './TopicHeader'
import { LearningCard } from './LearningCard'
import { TopicNavigation } from './TopicNavigation'

interface TopicPageProps {
    topicId: string
    /** Learning objectives list */
    learningItems: string[]
    /** Optional description override for TopicHeader */
    description?: string
    children: ReactNode
    /** Extra Tailwind classes on wrapper */
    className?: string
}

export function TopicPage({ topicId, learningItems, description, children, className = '' }: TopicPageProps) {
    return (
        <div className={`max-w-4xl mx-auto px-6 py-10 space-y-14 ${className}`}>
            <TopicHeader topicId={topicId} description={description} />
            <LearningCard topicId={topicId} items={learningItems} />
            {children}
            <TopicNavigation topicId={topicId} />
        </div>
    )
}
