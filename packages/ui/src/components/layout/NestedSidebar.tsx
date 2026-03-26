import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'

/** A leaf navigation item */
export interface NavItem {
    id: string
    label: string
    route: string
    /** Small prefix shown before label (e.g. number) */
    prefix?: string
    /** Whether this item is available/enabled */
    enabled?: boolean
    /** Label shown when not enabled */
    disabledLabel?: string
}

/** A group (folder) in the navigation tree */
export interface NavGroup {
    id: string
    label: string
    route: string
    icon?: string
    /** Count display (e.g. "5/10") */
    count?: string
    children: NavItem[]
}

/** A top-level section header */
export interface NavSection {
    label: string
    groups: NavGroup[]
}

/** Extra nav links shown at the bottom of the sidebar */
export interface NavExtra {
    route: string
    icon?: string
    label: string
}

export interface NestedSidebarProps {
    /** Site title shown at top */
    title: string
    /** Subtitle shown below title */
    subtitle?: string
    /** Accent color class for active items (default: pink) */
    accentColor?: string
    /** Navigation sections with groups and items */
    sections: NavSection[]
    /** Extra standalone nav links (guides, etc.) shown after sections */
    extras?: NavExtra[]
    /** Footer nav links */
    footerLinks?: NavExtra[]
    /** Search button handler */
    onSearchOpen: () => void
    /** Mobile drawer open state */
    mobileOpen: boolean
    /** Mobile drawer close handler */
    onMobileClose: () => void
    /** Collapse sidebar (desktop) */
    collapsed?: boolean
    /** localStorage key for expanded state */
    storageKey?: string
}

function getExpandedState(key: string): Record<string, boolean> {
    try {
        const v = localStorage.getItem(key)
        return v ? JSON.parse(v) : {}
    } catch {
        return {}
    }
}

export function NestedSidebar({
    title,
    subtitle,
    accentColor = 'pink',
    sections,
    extras = [],
    footerLinks = [],
    onSearchOpen,
    mobileOpen,
    onMobileClose,
    collapsed = false,
    storageKey = 'sidebar-expanded',
}: NestedSidebarProps) {
    const { theme, toggle } = useTheme()
    const location = useLocation()
    const [expanded, setExpanded] = useState<Record<string, boolean>>(() => getExpandedState(storageKey))

    // Auto-expand group matching current route
    useEffect(() => {
        for (const section of sections) {
            for (const group of section.groups) {
                const match = group.children.some((item) => location.pathname.includes(item.route))
                    || location.pathname.includes(group.route)
                if (match && !expanded[group.id]) {
                    setExpanded((prev) => {
                        const next = { ...prev, [group.id]: true }
                        localStorage.setItem(storageKey, JSON.stringify(next))
                        return next
                    })
                }
            }
        }
    }, [location.pathname, sections, storageKey]) // eslint-disable-line react-hooks/exhaustive-deps

    const toggleExpanded = (id: string) => {
        setExpanded((prev) => {
            const next = { ...prev, [id]: !prev[id] }
            localStorage.setItem(storageKey, JSON.stringify(next))
            return next
        })
    }

    const activeClass = `bg-${accentColor}-50 dark:bg-${accentColor}-900/30 text-${accentColor}-700 dark:text-${accentColor}-300`
    const inactiveClass = 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'

    return (
        <aside
            className={[
                'bg-gray-50 dark:bg-gray-900',
                'border-r border-gray-200 dark:border-gray-800',
                'flex flex-col h-full overflow-hidden',
                'fixed inset-y-0 left-0 z-40 transition-transform duration-300',
                mobileOpen ? 'translate-x-0' : '-translate-x-full',
                'md:relative md:inset-auto md:z-auto md:translate-x-0 md:transition-[width] md:duration-200',
                collapsed ? 'md:w-0 md:border-r-0' : 'md:w-72 md:shrink-0',
            ].join(' ')}
        >
            {/* Logo */}
            <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <NavLink to="/" className="block" onClick={onMobileClose}>
                    <div className={`text-sm font-bold text-${accentColor}-600 dark:text-${accentColor}-400 tracking-widest uppercase`}>
                        {title}
                    </div>
                    {subtitle && <div className="text-xs text-gray-400 mt-0.5">{subtitle}</div>}
                </NavLink>
                <button
                    onClick={onMobileClose}
                    className="md:hidden p-1 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Close menu"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Search */}
            <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-800">
                <button
                    onClick={onSearchOpen}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm transition-colors"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="flex-1 text-left text-xs">Search...</span>
                    <kbd className="hidden sm:inline text-xs border border-gray-300 dark:border-gray-600 rounded px-1">\u2318K</kbd>
                </button>
            </div>

            {/* Nested Navigation */}
            <nav className="flex-1 min-h-0 overflow-y-auto py-2 px-2">
                {sections.map((section, si) => (
                    <div key={si}>
                        <div className="px-3 py-1.5 mb-1 text-[10px] font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-wider">
                            {section.label}
                        </div>
                        {section.groups.map((group) => {
                            const isExpanded = expanded[group.id] ?? false
                            return (
                                <div key={group.id} className="mb-0.5">
                                    <div className="flex items-center">
                                        <NavLink
                                            to={group.route}
                                            onClick={onMobileClose}
                                            className={({ isActive }) =>
                                                `flex-1 flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? activeClass : inactiveClass}`
                                            }
                                        >
                                            {group.icon && <span className="text-base leading-none">{group.icon}</span>}
                                            <span className="font-medium leading-snug flex-1">{group.label}</span>
                                            {group.count && (
                                                <span className="text-[10px] font-mono text-gray-400 dark:text-gray-600">{group.count}</span>
                                            )}
                                        </NavLink>
                                        {group.children.length > 0 && (
                                            <button
                                                onClick={() => toggleExpanded(group.id)}
                                                className="p-1.5 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                                aria-label={isExpanded ? 'Collapse' : 'Expand'}
                                                aria-expanded={isExpanded}
                                            >
                                                <svg
                                                    className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                    {isExpanded && (
                                        <div className="ml-4 pl-3 border-l border-gray-200 dark:border-gray-800 mt-0.5 mb-1">
                                            {group.children.map((item) => (
                                                <NavLink
                                                    key={item.id}
                                                    to={item.route}
                                                    onClick={onMobileClose}
                                                    className={({ isActive }) =>
                                                        `flex items-center gap-2 px-2 py-1.5 rounded text-xs transition-colors ${
                                                            isActive
                                                                ? activeClass
                                                                : item.enabled !== false
                                                                  ? 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                                                  : 'text-gray-400 dark:text-gray-600'
                                                        }`
                                                    }
                                                >
                                                    {item.prefix && (
                                                        <span className="font-mono text-[10px] text-gray-400 dark:text-gray-600 shrink-0 w-6">
                                                            {item.prefix}
                                                        </span>
                                                    )}
                                                    <span className="truncate capitalize">{item.label}</span>
                                                    {item.enabled === false && item.disabledLabel && (
                                                        <span className="ml-auto text-[9px] text-gray-400 dark:text-gray-700 shrink-0">
                                                            {item.disabledLabel}
                                                        </span>
                                                    )}
                                                </NavLink>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                ))}

                {/* Extras */}
                {extras.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800">
                        {extras.map((extra) => (
                            <NavLink
                                key={extra.route}
                                to={extra.route}
                                onClick={onMobileClose}
                                className={({ isActive }) =>
                                    `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? activeClass : inactiveClass}`
                                }
                            >
                                {extra.icon && <span className="text-sm leading-none">{extra.icon}</span>}
                                <span className="font-medium leading-snug">{extra.label}</span>
                            </NavLink>
                        ))}
                    </div>
                )}
            </nav>

            {/* Footer */}
            <div className="px-2 py-2 border-t border-gray-200 dark:border-gray-800 space-y-1">
                {footerLinks.map((link) => (
                    <NavLink
                        key={link.route}
                        to={link.route}
                        onClick={onMobileClose}
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? activeClass : inactiveClass}`
                        }
                    >
                        {link.icon && <span className="text-sm">{link.icon}</span>}
                        {link.label}
                    </NavLink>
                ))}
                <button
                    onClick={toggle}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    {theme === 'dark' ? (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            Light Mode
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                            Dark Mode
                        </>
                    )}
                </button>
            </div>
        </aside>
    )
}
