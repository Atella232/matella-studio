/** The art of a worked-solution detective: three lines, the middle one crossed out, and a magnifying glass. Same in every language. */
export function DetectiveArt({ lines }: { lines: [string, string, string] }) {
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <rect x="14" y="10" width="132" height="100" rx="8" fill="var(--card)" stroke="var(--ink)" strokeWidth="2" />
            <text x="24" y="38" fontSize="13" fontWeight="700" fill="var(--ink)" direction="ltr">{lines[0]}</text>
            <text x="24" y="64" fontSize="13" fontWeight="700" fill="var(--coral)" direction="ltr">{lines[1]}</text>
            <line x1="22" y1="68" x2="104" y2="56" stroke="var(--coral)" strokeWidth="2.5" />
            <text x="24" y="92" fontSize="13" fontWeight="700" fill="var(--ink)" direction="ltr">{lines[2]}</text>
            <circle cx="168" cy="58" r="24" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="3" />
            <line x1="185" y1="75" x2="206" y2="98" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" />
        </svg>
    )
}
