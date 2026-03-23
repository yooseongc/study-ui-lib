import type { ElementType, ReactNode } from 'react'

interface ProseProps {
    children: ReactNode
    className?: string
    /** HTML tag to render. Default: 'p' */
    as?: ElementType
}

export function Prose({ children, className = '', as: Tag = 'p' }: ProseProps) {
    return <Tag className={`text-gray-600 dark:text-gray-400 leading-relaxed text-sm ${className}`}>{children}</Tag>
}
