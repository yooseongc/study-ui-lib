import type { ReactNode } from 'react'

interface SubSectionProps {
    children: ReactNode
    className?: string
}

export function SubSection({ children, className = '' }: SubSectionProps) {
    return (
        <h3 className={`text-base font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6 ${className}`}>
            {children}
        </h3>
    )
}
