import type { ReactNode } from 'react'

export type InlineCodeColor = 'blue' | 'gray' | 'green' | 'yellow' | 'red' | 'purple' | 'orange'

const colorMap: Record<InlineCodeColor, string> = {
    blue: 'bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-300',
    gray: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
    green: 'bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-300',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300',
    red: 'bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-300',
    purple: 'bg-purple-50 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300',
    orange: 'bg-orange-50 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300',
}

interface InlineCodeProps {
    children: ReactNode
    /** Color variant. Default: 'blue' */
    color?: InlineCodeColor
    className?: string
}

export function InlineCode({ children, color = 'blue', className = '' }: InlineCodeProps) {
    return (
        <code className={`${colorMap[color]} px-1.5 py-0.5 rounded text-xs font-mono ${className}`}>
            {children}
        </code>
    )
}
