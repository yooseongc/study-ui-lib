interface SourceRefProps {
    href: string
    label: string
    title?: string
    className?: string
}

export function SourceRef({ href, label, title, className = '' }: SourceRefProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={title}
            className={`inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline text-sm font-mono ${className}`}
        >
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
            </svg>
            {label}
        </a>
    )
}
