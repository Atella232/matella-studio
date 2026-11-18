/* The collage of the start page of Programazio lineala: a region with its vertices, an objective line and a table of values */

const INK = 'var(--ink, #1d2733)'
const PAPER = '#fffcf6'

export function ProgrammingHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(30 34) rotate(-3)">
                    <rect width={250} height={210} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <polygon points="40,180 190,180 160,110 40,60" fill="rgba(38, 123, 83, 0.3)" stroke="#267b53" strokeWidth={2.4} />
                    <line x1={60} y1={196} x2={226} y2={70} stroke="#c4432a" strokeWidth={3} strokeDasharray="8 6" />
                    {[[40, 180], [190, 180], [160, 110], [40, 60]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r={6} fill={x === 160 ? '#c4432a' : '#267b53'} />)}
                </g>
                <g transform="translate(300 40) rotate(4)">
                    <rect width={190} height={120} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={95} y={52} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">x + y ≤ 6</text>
                    <text x={95} y={90} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">x + 2y ≤ 8</text>
                </g>
                <g transform="translate(290 200) rotate(-3)">
                    <rect width={200} height={140} rx={16} fill="#e8e0f7" stroke={INK} strokeWidth={2} />
                    <text x={100} y={50} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">F = 3x + 2y</text>
                    <text x={100} y={98} textAnchor="middle" fontSize={24} fontWeight={700} fill="#c4432a" fontFamily="Fraunces, serif" direction="ltr">max = 18</text>
                </g>
                <g transform="translate(60 280) rotate(2)">
                    <rect width={190} height={80} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <text x={95} y={50} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK} fontFamily="Fraunces, serif" direction="ltr">(4, 2) → 16</text>
                </g>
            </svg>
        </div>
    )
}
