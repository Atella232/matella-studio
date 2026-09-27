/** Illustration of the lift game: the panel with floors and basements */
export function ElevatorArt() {
    const floors = ['+3', '+2', '+1', '0', '−1', '−2']
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <rect x="60" y="6" width="100" height="108" rx="12" fill="#fffcf6" stroke="var(--ink)" strokeWidth="2" />
            {floors.map((label, index) => {
                const x = 84 + (index % 2) * 52
                const y = 28 + Math.floor(index / 2) * 34
                const active = label === '−1'
                return (
                    <g key={label}>
                        <circle cx={x} cy={y} r="13" fill={active ? 'var(--coral)' : label.startsWith('−') ? 'var(--coral-tint)' : '#fffcf6'} stroke="var(--ink)" strokeWidth="1.8" />
                        <text x={x} y={y + 5} textAnchor="middle" fontSize="12" fontWeight="700" fill={active ? '#fffcf6' : 'var(--ink)'}>{label}</text>
                    </g>
                )
            })}
            <text x="30" y="46" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--blue)">▲</text>
            <text x="190" y="90" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--coral)">▼</text>
        </svg>
    )
}
