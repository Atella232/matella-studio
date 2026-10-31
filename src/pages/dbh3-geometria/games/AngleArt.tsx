import type { AngleFigure } from './angles'

/* ==========================================================================
   The figure of each round of the angle hunt: a triangle or quadrilateral
   with its angles written at the corners, a regular polygon with the
   angle that is asked for, or a circle with its central and inscribed
   angles. Numbers and letters only, so it is the same in every language.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const STAGE = 'var(--blue, #2f6fdb)'
const ASKED = 'var(--coral, #c4432a)'
const FONT = '"Atkinson Hyperlegible", system-ui, sans-serif'

type Vertex = [number, number]

/** A label pulled from a corner towards the middle of the shape */
const inward = ([x, y]: Vertex, [cx, cy]: Vertex, by: number): Vertex => {
    const length = Math.hypot(cx - x, cy - y) || 1
    return [x + ((cx - x) / length) * by, y + ((cy - y) / length) * by]
}

function Corners({ points, labels }: { points: Vertex[]; labels: string[] }) {
    const centre: Vertex = [points.reduce((sum, [x]) => sum + x, 0) / points.length, points.reduce((sum, [, y]) => sum + y, 0) / points.length]
    return (
        <>
            <polygon points={points.map(([x, y]) => `${x},${y}`).join(' ')} fill="var(--blue-tint, #dde7f7)" stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
            {points.map((point, index) => {
                const [x, y] = inward(point, centre, 34)
                return <text key={index} x={x} y={y + 6} textAnchor="middle" fontSize={17} fontWeight={700} fill={labels[index] === '?' ? ASKED : INK}>{labels[index]}</text>
            })}
        </>
    )
}

export function AngleArt({ figure }: { figure: AngleFigure }) {
    let body
    if (figure.type === 'triangle') {
        body = <Corners points={[[40, 180], [280, 180], [130, 40]]} labels={[`${figure.known[0]}°`, `${figure.known[1]}°`, '?']} />
    } else if (figure.type === 'quad') {
        body = <Corners points={[[40, 170], [270, 182], [240, 40], [90, 60]]} labels={[`${figure.known[0]}°`, `${figure.known[1]}°`, `${figure.known[2]}°`, '?']} />
    } else if (figure.type === 'regular') {
        const n = figure.sides
        const points: Vertex[] = Array.from({ length: n }, (_, index) => {
            const angle = -Math.PI / 2 + Math.PI / n + (2 * Math.PI * index) / n
            return [160 + 80 * Math.cos(angle), 108 + 80 * Math.sin(angle)]
        })
        const [first, second] = [points[0], points[1]]
        // The exterior angle: one side carried on past its corner
        const beyond: Vertex = [first[0] + (first[0] - points[n - 1][0]) * 0.6, first[1] + (first[1] - points[n - 1][1]) * 0.6]
        body = (
            <>
                <polygon points={points.map(([x, y]) => `${x},${y}`).join(' ')} fill="var(--blue-tint, #dde7f7)" stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
                {figure.ask === 'exterior' && <line x1={first[0]} y1={first[1]} x2={beyond[0]} y2={beyond[1]} stroke={INK} strokeWidth={2} strokeDasharray="6 4" />}
                <circle cx={first[0]} cy={first[1]} r={5} fill={ASKED} />
                {figure.ask === 'interior'
                    ? <text x={inward(first, [160, 108], 30)[0]} y={inward(first, [160, 108], 30)[1] + 6} textAnchor="middle" fontSize={18} fontWeight={700} fill={ASKED}>?</text>
                    : <text x={(beyond[0] + second[0]) / 2 + 6} y={(beyond[1] + second[1]) / 2 + 4} textAnchor="middle" fontSize={18} fontWeight={700} fill={ASKED}>?</text>}
                <text x={300} y={30} textAnchor="end" fontSize={16} fontWeight={700} fill={STAGE}>{`n = ${n}`}</text>
            </>
        )
    } else {
        const at = (degrees: number): Vertex => [160 + 80 * Math.cos((degrees * Math.PI) / 180), 108 - 80 * Math.sin((degrees * Math.PI) / 180)]
        const a = at(270 - figure.central / 2)
        const b = at(270 + figure.central / 2)
        const p = figure.near ? at(270) : at(90)
        const centralLabel = figure.ask === 'central' ? '?' : `${figure.central}°`
        const inscribedLabel = figure.ask === 'inscribed' ? '?' : `${figure.inscribed}°`
        body = (
            <>
                <circle cx={160} cy={108} r={80} fill="var(--blue-tint, #dde7f7)" stroke={INK} strokeWidth={2.4} />
                <line x1={160} y1={108} x2={a[0]} y2={a[1]} stroke={STAGE} strokeWidth={2.4} />
                <line x1={160} y1={108} x2={b[0]} y2={b[1]} stroke={STAGE} strokeWidth={2.4} />
                <line x1={p[0]} y1={p[1]} x2={a[0]} y2={a[1]} stroke={ASKED} strokeWidth={2.4} />
                <line x1={p[0]} y1={p[1]} x2={b[0]} y2={b[1]} stroke={ASKED} strokeWidth={2.4} />
                <circle cx={160} cy={108} r={4} fill={INK} />
                <text x={figure.near ? 160 : 172} y={figure.near ? 96 : 104} textAnchor={figure.near ? 'middle' : 'start'} fontSize={16} fontWeight={700} fill={figure.ask === 'central' ? ASKED : STAGE}>{centralLabel}</text>
                <text x={p[0]} y={figure.near ? p[1] + 22 : p[1] - 10} textAnchor="middle" fontSize={16} fontWeight={700} fill={figure.ask === 'inscribed' ? ASKED : INK}>{inscribedLabel}</text>
            </>
        )
    }
    return <svg className="geometria-angle-art" viewBox="0 0 320 210" direction="ltr" aria-hidden="true" fontFamily={FONT}>{body}</svg>
}
