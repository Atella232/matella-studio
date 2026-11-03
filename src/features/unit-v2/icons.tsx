import type { UnitSection as PrototypeSection } from './types'

export type IconName = PrototypeSection | 'more' | 'check' | 'arrow' | 'back' | 'bulb' | 'close' | 'expand' | 'languages' | 'question'

const paths: Record<IconName, string[]> = {
    route: ['M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z'],
    diagnostic: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z', 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'],
    learn: ['M4 4h11a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4z', 'M8 8h7'],
    lab: ['M9 3h6', 'M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3', 'M7 15h10'],
    practice: ['M4 20h4L19 9l-4-4L4 16z', 'M13 7l4 4'],
    challenges: ['M5 21V4h11l-2 4 2 4H5'],
    play: ['M7 7h10a4 4 0 0 1 4 4v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a4 4 0 0 1 4-4z', 'M8 11v3', 'M6.5 12.5h3', 'M15.5 11.5h.01', 'M17.5 13.5h.01'],
    more: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
    check: ['M5 12.5l4.5 4.5L19 7.5'],
    arrow: ['M5 12h14', 'M13 6l6 6-6 6'],
    back: ['M15 5l-7 7 7 7'],
    bulb: ['M9 18h6', 'M10 21h4', 'M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z'],
    close: ['M6 6l12 12', 'M18 6L6 18'],
    expand: ['M4 9V4h5', 'M20 9V4h-5', 'M4 15v5h5', 'M20 15v5h-5'],
    languages: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z', 'M3 12h18', 'M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9', 'M12 3c-2.5 2.6-3.8 5.6-3.8 9s1.3 6.4 3.8 9'],
    question: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z', 'M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6', 'M12 17h.01']
}

export function Icon({ name, size = 20, strokeWidth = 2, className }: { name: IconName; size?: number; strokeWidth?: number; className?: string }) {
    return (
        <svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
        >
            {paths[name].map((d) => <path d={d} key={d} />)}
        </svg>
    )
}
