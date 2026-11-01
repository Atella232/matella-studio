const FONT = '"Atkinson Hyperlegible", system-ui, sans-serif'

/** A fraction in the art: numerator, bar and denominator */
const art = (x: number, y: number, top: string, bottom: string, colour = 'var(--ink)') => {
    const half = Math.max(8, Math.max(top.length, bottom.length) * 4.5)
    return (
    <g fill={colour} fontSize="13" fontWeight="700" textAnchor="middle">
        <text x={x} y={y - 3}>{top}</text>
        <line x1={x - half} x2={x + half} y1={y} y2={y} stroke={colour} strokeWidth="1.6" />
        <text x={x} y={y + 13}>{bottom}</text>
    </g>
    )
}

/** Small illustration of the games of this unit; the art is the same in every language, so it has no words */
export function RationalsGameArt({ game }: { game: 'jug' | 'period' | 'detective' }) {
    if (game === 'jug') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                <path d="M70 18 h70 l-6 92 h-58 Z" fill="var(--card)" stroke="var(--ink)" strokeWidth="2.4" strokeLinejoin="round" />
                <path d="M140 30 q22 4 18 30 q-3 16 -20 18" fill="none" stroke="var(--ink)" strokeWidth="2.4" />
                <path d="M74 62 h62 l-3 46 h-56 Z" fill="var(--blue-tint, #dde7f7)" stroke="none" />
                <line x1="66" x2="148" y1="54" y2="54" stroke="var(--coral, #c4432a)" strokeWidth="2.4" strokeDasharray="6 4" />
                <rect x="166" y="70" width="34" height="42" rx="6" fill="var(--card)" stroke="var(--ink)" strokeWidth="2" />
                {art(183, 92, '1', '4')}
                <rect x="20" y="70" width="34" height="42" rx="6" fill="var(--card)" stroke="var(--ink)" strokeWidth="2" />
                {art(37, 92, '1', '2')}
            </svg>
        )
    }
    if (game === 'period') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
                {art(110, 26, '5', '6', 'var(--coral, #c4432a)')}
                <line x1="110" x2="110" y1="42" y2="62" stroke="var(--muted)" strokeWidth="2" strokeDasharray="3 4" />
                {[{ x: 18, tint: 'var(--blue-tint, #dde7f7)' }, { x: 82, tint: 'var(--success-tint, #d9efe2)' }, { x: 146, tint: 'var(--coral-tint, #f6d5cc)' }].map((bin) => (
                    <path key={bin.x} d={`M${bin.x} 72 h56 l-6 40 h-44 Z`} fill={bin.tint} stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
                ))}
                {art(46, 92, '1', '2')}
                {art(110, 92, '1', '3')}
                {art(174, 92, '1', '6')}
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true" direction="ltr" fontFamily={FONT}>
            <rect x="30" y="14" width="120" height="92" rx="8" fill="var(--card)" stroke="var(--ink)" strokeWidth="2" />
            {art(58, 46, 'a', 'b')}
            <text x="76" y="50" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)">+</text>
            {art(94, 46, 'c', 'd')}
            <text x="112" y="50" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)">=</text>
            {art(130, 46, 'a+c', 'b+d', 'var(--coral, #c4432a)')}
            <line x1="44" x2="136" y1="84" y2="84" stroke="var(--line)" strokeWidth="4" strokeLinecap="round" />
            <circle cx="164" cy="72" r="24" fill="none" stroke="var(--ink)" strokeWidth="4" />
            <line x1="181" y1="89" x2="204" y2="112" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" />
        </svg>
    )
}
