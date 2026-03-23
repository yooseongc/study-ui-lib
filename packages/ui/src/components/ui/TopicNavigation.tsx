import { Link } from 'react-router-dom'
import { useStudyConfig } from '../../hooks/useStudyConfig'

interface Props {
    topicId: string
}

export function TopicNavigation({ topicId }: Props) {
    const { topics } = useStudyConfig()
    const idx = topics.findIndex((t) => t.id === topicId)
    const prev = idx > 0 ? topics[idx - 1] : null
    const next = idx >= 0 && idx < topics.length - 1 ? topics[idx + 1] : null

    return (
        <nav className="rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 flex items-center justify-between">
            <div>
                {prev ? (
                    <>
                        <div className="text-xs text-gray-500 dark:text-gray-500 mb-1">이전 토픽</div>
                        <Link
                            to={prev.route}
                            className="font-semibold text-gray-900 dark:text-gray-200 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            ← {String(prev.number).padStart(2, '0')} · {prev.title}
                        </Link>
                    </>
                ) : (
                    <div />
                )}
            </div>
            <div className="text-right">
                {next ? (
                    <>
                        <div className="text-xs text-gray-500 dark:text-gray-500 mb-1">다음 토픽</div>
                        <Link
                            to={next.route}
                            className="font-semibold text-gray-900 dark:text-gray-200 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            {String(next.number).padStart(2, '0')} · {next.title} →
                        </Link>
                    </>
                ) : (
                    <div />
                )}
            </div>
        </nav>
    )
}
