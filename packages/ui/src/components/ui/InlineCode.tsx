import type { ReactNode } from 'react'

export function InlineCode({ children, className = '' }: { children: ReactNode; className?: string }) {
    return (
        <code
            className={`bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-300 px-1.5 py-0.5 rounded text-xs font-mono ${className}`}
        >
            {children}
        </code>
    )
}
