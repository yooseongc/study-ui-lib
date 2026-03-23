import type { ReactNode } from 'react'

export function Prose({ children, className = '' }: { children: ReactNode; className?: string }) {
    return <p className={`text-gray-600 dark:text-gray-400 leading-relaxed text-sm ${className}`}>{children}</p>
}
