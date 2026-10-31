import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Label } from '../dbh2-funtzioak-v2/plane'

/* ==========================================================================
   Proportzionaltasuna · 3. DBH — the lesson figures that are new in this
   unit: a map with its scale bar, two gear wheels (teeth and turns are
   inversely proportional) and the two graphs side by side (a line through
   the origin and a hyperbola). The rest come from 1., 2. and 4. DBH.
   Drawn 360 wide so that the labels can be read on a phone; Arabic
   captions carry words only (Chrome ignores direction isolates in SVG).
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const PAPER = '#fffcf6'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

function Board({ height, label, children }: { height: number; label: string; children: ReactNode }) {
    return (
        <svg viewBox={`0 0 360 ${height}`} direction="ltr" role="img" aria-label={label} style={{ display: 'block', width: '100%', maxWidth: 520, height: 'auto', margin: '0 auto', fontFamily: '"Atkinson Hyperlegible", "Noto Sans Arabic", system-ui, sans-serif' }}>
            {children}
        </svg>
    )
}

const Caption = ({ y, language, text }: { y: number; language: UnitLanguage; text: LocalizedText }) => (
    <Label x={180} y={y} textAnchor="middle" fontSize={14} fill={MUTED}>{pickText(language, text)}</Label>
)

/** A gear wheel: a disc with `teeth` square teeth, turned by `angle` degrees */
export function Gear({ cx, cy, radius, teeth, angle = 0, color, tint }: { cx: number; cy: number; radius: number; teeth: number; angle?: number; color: string; tint: string }) {
    const depth = Math.min(9, radius * 0.22)
    const points: string[] = []
    for (let tooth = 0; tooth < teeth; tooth += 1) {
        const start = (tooth / teeth) * 2 * Math.PI
        const step = (2 * Math.PI) / teeth
        // Each tooth: up, across, down, across the gap
        for (const [fraction, r] of [[0, radius], [0.08, radius + depth], [0.42, radius + depth], [0.5, radius], [1, radius]] as const) {
            const a = start + fraction * step
            points.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`)
        }
    }
    return (
        <g transform={`rotate(${angle} ${cx} ${cy})`}>
            <polygon points={points.join(' ')} fill={tint} stroke={color} strokeWidth={2} strokeLinejoin="round" />
            <circle cx={cx} cy={cy} r={radius * 0.28} fill={PAPER} stroke={color} strokeWidth={2} />
            <line x1={cx} y1={cy} x2={cx + radius * 0.8} y2={cy} stroke={color} strokeWidth={3} strokeLinecap="round" />
        </g>
    )
}

/* ---------- Scales: a map with its scale bar ---------- */

export function ScaleFigure({ language }: { language: UnitLanguage }) {
    // 1 cm on the map is drawn 40 px; the route measures 3 cm
    return (
        <Board height={220} label={pickText(language, say('1:50 000 eskalako mapa: 3 cm = 1,5 km', 'Mapa a escala 1:50 000: 3 cm = 1,5 km', 'خريطة بمقياس 1:50000: ‏3 سم = 1.5 كم', 'Map at a scale of 1:50,000: 3 cm = 1.5 km'))}>
            <rect x={14} y={10} width={332} height={128} rx={10} fill={STAGE_TINT} stroke={INK} strokeWidth={1.6} />
            <path d="M40 112 C 90 40, 160 130, 230 70 S 320 40, 330 30" fill="none" stroke={MUTED} strokeWidth={3} strokeDasharray="2 6" strokeLinecap="round" />
            <circle cx={70} cy={96} r={9} fill={STAGE} stroke={INK} strokeWidth={1.5} />
            <circle cx={190} cy={96} r={9} fill={SECOND} stroke={INK} strokeWidth={1.5} />
            <Label x={70} y={128} textAnchor="middle" fontSize={14} fontWeight={700} fill={INK}>A</Label>
            <Label x={190} y={128} textAnchor="middle" fontSize={14} fontWeight={700} fill={INK}>B</Label>
            <line x1={70} x2={190} y1={72} y2={72} stroke={SECOND} strokeWidth={2.5} />
            <line x1={70} x2={70} y1={64} y2={80} stroke={SECOND} strokeWidth={2.5} />
            <line x1={190} x2={190} y1={64} y2={80} stroke={SECOND} strokeWidth={2.5} />
            <text x={130} y={62} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>3 cm</text>
            {[0, 1, 2, 3].map((cm) => (
                <g key={cm}>
                    <rect x={40 + cm * 40} y={152} width={40} height={10} fill={cm % 2 === 0 ? INK : PAPER} stroke={INK} strokeWidth={1.4} />
                    <text x={40 + cm * 40} y={180} textAnchor="middle" fontSize={13} fill={INK}>{language === 'en' || language === 'ar' ? `${cm * 0.5}` : `${String(cm * 0.5).replace('.', ',')}`}</text>
                </g>
            ))}
            <text x={200} y={180} textAnchor="middle" fontSize={13} fill={INK}>2</text>
            <text x={232} y={180} fontSize={13} fill={MUTED}>km</text>
            <text x={300} y={163} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>{language === 'en' ? '1 : 50,000' : '1 : 50 000'}</text>
            <Caption y={208} language={language} text={say('Mapako 1 cm = 50 000 cm = 500 m', '1 cm del mapa = 50 000 cm = 500 m', '1 سم على الخريطة = 500 م', '1 cm on the map = 50,000 cm = 500 m')} />
        </Board>
    )
}

/* ---------- Inverse proportion: two gear wheels ---------- */

export function GearsFigure({ language }: { language: UnitLanguage }) {
    const teeth = say('hortz', 'dientes', 'سنًّا', 'teeth')
    const turns = say('bira/min', 'vueltas/min', 'دورة/د', 'turns/min')
    return (
        <Board height={214} label={pickText(language, say('12 hortz 30 bira eta 24 hortz 15 bira: 12 · 30 = 24 · 15', '12 dientes 30 vueltas y 24 dientes 15 vueltas: 12 · 30 = 24 · 15', '12 سنًّا 30 دورة و24 سنًّا 15 دورة', '12 teeth 30 turns and 24 teeth 15 turns: 12 · 30 = 24 · 15'))}>
            <Gear cx={66} cy={92} radius={30} teeth={12} color={STAGE} tint={STAGE_TINT} />
            <Gear cx={163} cy={92} radius={60} teeth={24} angle={7.5} color={SECOND} tint="#f6d5cc" />
            <Label x={296} y={40} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>{`12 ${pickText(language, teeth)}`}</Label>
            <Label x={296} y={60} textAnchor="middle" fontSize={14} fill={STAGE}>{`30 ${pickText(language, turns)}`}</Label>
            <Label x={296} y={104} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>{`24 ${pickText(language, teeth)}`}</Label>
            <Label x={296} y={124} textAnchor="middle" fontSize={14} fill={SECOND}>{`15 ${pickText(language, turns)}`}</Label>
            <text x={180} y={182} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>12 · 30 = 24 · 15 = 360</text>
            <Caption y={206} language={language} text={say('Hortz bikoitza → bira erdiak', 'El doble de dientes → la mitad de vueltas', 'ضعف الأسنان ← نصف الدورات', 'Twice the teeth → half the turns')} />
        </Board>
    )
}

/* ---------- Tables and graphs: a line and a hyperbola ---------- */

export function GraphsFigure({ language }: { language: UnitLanguage }) {
    const panel = (x0: number, title: LocalizedText, color: string, points: Array<[number, number]>, curve: string) => {
        const px = (x: number) => x0 + 16 + x * 20
        const py = (y: number) => 160 - y * 11
        return (
            <g>
                <line x1={x0 + 16} x2={x0 + 150} y1={160} y2={160} stroke={INK} strokeWidth={1.6} />
                <line x1={x0 + 16} x2={x0 + 16} y1={160} y2={26} stroke={INK} strokeWidth={1.6} />
                <path d={curve} fill="none" stroke={color} strokeWidth={2.6} />
                {points.map(([x, y]) => <circle key={`${x}-${y}`} cx={px(x)} cy={py(y)} r={4.5} fill={color} stroke={INK} strokeWidth={1.2} />)}
                <Label x={x0 + 80} y={20} textAnchor="middle" fontSize={15} fontWeight={700} fill={color}>{pickText(language, title)}</Label>
                <text x={x0 + 154} y={164} fontSize={13} fill={MUTED}>x</text>
                <text x={x0 + 10} y={30} textAnchor="end" fontSize={13} fill={MUTED}>y</text>
            </g>
        )
    }
    const hyperbola = Array.from({ length: 31 }, (_, i) => {
        const x = 1.2 + (i / 30) * 5.3
        return `${i === 0 ? 'M' : 'L'}${(190 + 16 + x * 20).toFixed(1)} ${(160 - (12 / x) * 11).toFixed(1)}`
    }).join(' ')
    return (
        <Board height={220} label={pickText(language, say('Zuzena: y = 2x zuzena. Alderantzizkoa: x · y = 12 hiperbola.', 'Directa: la recta y = 2x. Inversa: la hipérbola x · y = 12.', 'الطردي: المستقيم y = 2x. العكسي: القطع الزائد x · y = 12.', 'Direct: the line y = 2x. Inverse: the hyperbola x · y = 12.'))}>
            {panel(10, say('Zuzena', 'Directa', 'طردي', 'Direct'), STAGE, [[1, 2], [2, 4], [3, 6], [5, 10]], `M${26} ${160} L${26 + 6 * 20} ${160 - 12 * 11}`)}
            {panel(190, say('Alderantzizkoa', 'Inversa', 'عكسي', 'Inverse'), SECOND, [[2, 6], [3, 4], [4, 3], [6, 2]], hyperbola)}
            <text x={100} y={186} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>y : x = 2</text>
            <text x={268} y={186} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND}>x · y = 12</text>
            <Caption y={210} language={language} text={say('Jatorritik pasatzen den zuzena / hiperbola', 'Recta por el origen / hipérbola', 'مستقيم يمر بالأصل / قطع زائد', 'Line through the origin / hyperbola')} />
        </Board>
    )
}
