import { useStudyConfig } from '../../hooks/useStudyConfig'

interface TopicHeaderProps {
    topicId: string
    /** Optional description override. If not provided, uses topic.description from config */
    description?: string
}

export function TopicHeader({ topicId, description }: TopicHeaderProps) {
    const { topics } = useStudyConfig()
    const topic = topics.find((t) => t.id === topicId)

    if (!topic) return null

    return (
        <header className="space-y-3">
            <p className="text-xs text-blue-500 dark:text-blue-400 uppercase tracking-widest font-semibold">
                Topic {String(topic.number).padStart(2, '0')}
            </p>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{topic.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{topic.subtitle}</p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                {description ?? topic.description}
            </p>
        </header>
    )
}
