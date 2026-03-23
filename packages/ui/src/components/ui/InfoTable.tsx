import type { ReactNode } from 'react'

export interface TableColumn {
    header: string
    /** Tailwind text alignment class. Default: 'text-left' */
    align?: 'text-left' | 'text-right' | 'text-center'
    /** Use monospace font for this column. Default: false */
    mono?: boolean
    /** Extra Tailwind classes for header cell */
    headerClassName?: string
    /** Extra Tailwind classes for body cells in this column */
    cellClassName?: string
    /** whitespace-nowrap */
    nowrap?: boolean
}

export interface TableRow {
    cells: (string | ReactNode)[]
}

interface InfoTableProps {
    /** Simple string array or detailed column config */
    headers: string[] | TableColumn[]
    rows: TableRow[]
    /** Apply monospace to all cells. Default: false */
    mono?: boolean
    /** Striped row backgrounds. Default: false */
    striped?: boolean
    /** Extra Tailwind classes on wrapper */
    className?: string
    /** Per-row className callback for custom highlighting */
    rowClassName?: (row: TableRow, index: number) => string
}

function isColumnArray(headers: string[] | TableColumn[]): headers is TableColumn[] {
    return headers.length > 0 && typeof headers[0] === 'object'
}

export function InfoTable({ headers, rows, mono = false, striped = false, className = '', rowClassName }: InfoTableProps) {
    const columns: TableColumn[] = isColumnArray(headers)
        ? headers
        : headers.map((h) => ({ header: h }))

    return (
        <div className={`overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 ${className}`}>
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
                        {columns.map((col, i) => (
                            <th
                                key={i}
                                className={[
                                    'px-4 py-2.5 font-semibold text-xs',
                                    col.align ?? 'text-left',
                                    col.mono || mono ? 'font-mono' : '',
                                    col.nowrap ? 'whitespace-nowrap' : '',
                                    col.headerClassName ?? 'text-gray-700 dark:text-gray-300',
                                ]
                                    .filter(Boolean)
                                    .join(' ')}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, ri) => (
                        <tr
                            key={ri}
                            className={[
                                'border-b last:border-0 border-gray-100 dark:border-gray-800',
                                'hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors',
                                striped && ri % 2 === 1
                                    ? 'bg-gray-50 dark:bg-gray-800/50'
                                    : '',
                                rowClassName?.(row, ri) ?? '',
                            ].join(' ')}
                        >
                            {row.cells.map((cell, ci) => {
                                const col = columns[ci]
                                return (
                                    <td
                                        key={ci}
                                        className={[
                                            'px-4 py-2.5 text-xs',
                                            col?.align ?? 'text-left',
                                            col?.mono || mono ? 'font-mono' : '',
                                            col?.nowrap ? 'whitespace-nowrap' : '',
                                            col?.cellClassName ??
                                                (ci === 0
                                                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                                                    : 'text-gray-600 dark:text-gray-400'),
                                        ]
                                            .filter(Boolean)
                                            .join(' ')}
                                    >
                                        {cell}
                                    </td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
