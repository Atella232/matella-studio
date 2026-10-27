import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * A short animation for the ▶ buttons: progress runs from 0 to 1 in
 * `duration` ms and then stays at 1. It belongs to the case it was started
 * for: when the case (its key) changes, there is no progress any more, so
 * the drawing goes back to the learner's own settings without an effect.
 * With reduced motion the animation jumps straight to the end.
 */
export function usePlayback(key: string, duration: number) {
    const [run, setRun] = useState<{ key: string; progress: number } | null>(null)
    const frame = useRef<number | null>(null)

    const play = useCallback(() => {
        if (frame.current !== null) cancelAnimationFrame(frame.current)
        const reduced = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (reduced) {
            setRun({ key, progress: 1 })
            return
        }
        const start = performance.now()
        const step = (now: number) => {
            const progress = Math.min(1, (now - start) / duration)
            setRun({ key, progress })
            frame.current = progress < 1 ? requestAnimationFrame(step) : null
        }
        setRun({ key, progress: 0 })
        frame.current = requestAnimationFrame(step)
    }, [key, duration])

    useEffect(() => {
        const handle = frame
        return () => {
            if (handle.current !== null) cancelAnimationFrame(handle.current)
        }
    }, [])

    const progress = run !== null && run.key === key ? run.progress : null
    return { progress, playing: progress !== null && progress < 1, play }
}
