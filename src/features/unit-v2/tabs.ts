import type { KeyboardEvent as ReactKeyboardEvent } from 'react'

/** Arrow keys move between tabs of a tablist (reversed in right-to-left) */
export function handleTabArrow(event: ReactKeyboardEvent<HTMLButtonElement>) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    const buttons = Array.from(event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? [])
    const currentIndex = buttons.indexOf(event.currentTarget)
    if (currentIndex < 0 || buttons.length === 0) return
    event.preventDefault()
    const isRtl = document.documentElement.dir === 'rtl'
    let nextIndex = currentIndex
    if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = buttons.length - 1
    else {
        const forward = event.key === 'ArrowRight' ? !isRtl : isRtl
        nextIndex = (currentIndex + (forward ? 1 : -1) + buttons.length) % buttons.length
    }
    buttons[nextIndex].focus()
    buttons[nextIndex].click()
}
