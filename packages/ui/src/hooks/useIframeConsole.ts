import { useState, useEffect, useCallback } from 'react'

export interface ConsoleEntry {
    level: 'log' | 'warn' | 'error' | 'info'
    args: string
    timestamp: number
}

const MESSAGE_TYPE = '__iframe_console__'
const MAX_ENTRIES = 200

/**
 * Console bridge script to inject into iframe srcdoc.
 * Intercepts console.log/warn/error/info and forwards them via postMessage.
 */
export const CONSOLE_BRIDGE_SCRIPT = `
<script>
(function() {
    var orig = { log: console.log, warn: console.warn, error: console.error, info: console.info };
    function send(level, args) {
        try {
            parent.postMessage({ type: '${MESSAGE_TYPE}', level: level, args: Array.from(args).map(function(a) {
                if (a instanceof Error) return a.message;
                if (typeof a === 'object') try { return JSON.stringify(a); } catch(e) { return String(a); }
                return String(a);
            }).join(' '), timestamp: Date.now() }, '*');
        } catch(e) {}
        orig[level].apply(console, args);
    }
    console.log = function() { send('log', arguments); };
    console.warn = function() { send('warn', arguments); };
    console.error = function() { send('error', arguments); };
    console.info = function() { send('info', arguments); };
    window.onerror = function(msg, src, line, col) {
        send('error', ['[Error] ' + msg + ' (line ' + line + ')']);
    };
    window.onunhandledrejection = function(e) {
        send('error', ['[Unhandled Promise] ' + (e.reason instanceof Error ? e.reason.message : String(e.reason))]);
    };
})();
<\/script>`

/**
 * Hook that listens for console messages forwarded from an iframe via postMessage.
 * Use together with CONSOLE_BRIDGE_SCRIPT injected into the iframe's srcdoc.
 */
export function useIframeConsole() {
    const [entries, setEntries] = useState<ConsoleEntry[]>([])

    useEffect(() => {
        const handler = (e: MessageEvent) => {
            if (e.data?.type === MESSAGE_TYPE) {
                setEntries((prev) => {
                    const next = [...prev, { level: e.data.level, args: e.data.args, timestamp: e.data.timestamp }]
                    return next.length > MAX_ENTRIES ? next.slice(-MAX_ENTRIES) : next
                })
            }
        }
        window.addEventListener('message', handler)
        return () => window.removeEventListener('message', handler)
    }, [])

    const clear = useCallback(() => setEntries([]), [])

    const errorCount = entries.filter((e) => e.level === 'error').length
    const warnCount = entries.filter((e) => e.level === 'warn').length

    return { entries, clear, errorCount, warnCount }
}
