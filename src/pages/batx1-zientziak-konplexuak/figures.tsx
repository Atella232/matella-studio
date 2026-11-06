import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Figure } from '../dbh2-zatikiak-prototype/figures'

/* ==========================================================================
   Zenbaki konplexuak · Batxilergoa 1 · Zientziak — the lesson figures:
   the imaginary axis, the sets of numbers, the complex plane with a
   number, its opposite and its conjugate, … Formulas sit in their own
   <text> (left to right in every language); words go through <Label>, and
   the Arabic captions carry words only. The axes are called Re and Im in
   every language. Spanish writes «sen», the other languages «sin». Text
   is 21 px or more on a 720 px wide drawing, so it stays readable on a
   phone.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const PAPER = '#fffcf6'
const SOFT = '#fbebc0'
const ROSE = '#f6d9d2'
const GRID = '#e3ddd0'
const SERIF = 'Fraunces, serif'

type Point = [number, number]

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

/** A formula written left to right whatever the language */
function F({ x, y, children, size = 22, color = INK, anchor = 'middle' }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end' }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color} direction="ltr">{children}</text>
}

/** Words in the reader's language (Arabic right to left) */
function W({ x, y, language, text, size = 21, color = MUTED, anchor = 'middle' }: { x: number; y: number; language: UnitLanguage; text: LocalizedText; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end' }) {
    return <Label x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color}>{pickText(language, text)}</Label>
}

/** z with a bar on top, the conjugate */
const Bar = ({ children = 'z' }: { children?: ReactNode }) => <tspan textDecoration="overline">{children}</tspan>

function Dot({ p, color = INK, r = 7 }: { p: Point; color?: string; r?: number }) {
    return <circle cx={p[0]} cy={p[1]} r={r} fill={color} stroke={PAPER} strokeWidth={2} />
}

/** A grid of whole units around o, with the axes called Re and Im */
function Plane({ o, unit, x, y, numbers = [] }: { o: Point; unit: number; x: [number, number]; y: [number, number]; numbers?: Array<['x' | 'y', number]> }) {
    const xs = Array.from({ length: x[1] - x[0] + 1 }, (_, index) => x[0] + index)
    const ys = Array.from({ length: y[1] - y[0] + 1 }, (_, index) => y[0] + index)
    const left = o[0] + x[0] * unit
    const right = o[0] + x[1] * unit
    const top = o[1] - y[1] * unit
    const bottom = o[1] - y[0] * unit
    return (
        <g>
            {xs.map((value) => <line key={`x${value}`} x1={o[0] + value * unit} y1={top} x2={o[0] + value * unit} y2={bottom} stroke={GRID} strokeWidth={1.2} />)}
            {ys.map((value) => <line key={`y${value}`} x1={left} y1={o[1] - value * unit} x2={right} y2={o[1] - value * unit} stroke={GRID} strokeWidth={1.2} />)}
            <line x1={left - 12} y1={o[1]} x2={right + 14} y2={o[1]} stroke={MUTED} strokeWidth={1.8} />
            <line x1={o[0]} y1={bottom + 12} x2={o[0]} y2={top - 14} stroke={MUTED} strokeWidth={1.8} />
            <path d={`M${right + 14} ${o[1]} l-10 -5 v10 z`} fill={MUTED} />
            <path d={`M${o[0]} ${top - 14} l-5 10 h10 z`} fill={MUTED} />
            <F x={right + 10} y={o[1] + 28} size={21} color={MUTED} anchor="end">Re</F>
            <F x={o[0] + 12} y={top - 2} size={21} color={MUTED} anchor="start">Im</F>
            {numbers.map(([axis, value]) => axis === 'x'
                ? <F key={`n${axis}${value}`} x={o[0] + value * unit} y={o[1] + 26} size={21} color={MUTED}>{value < 0 ? `−${-value}` : value}</F>
                : <F key={`n${axis}${value}`} x={o[0] - 10} y={o[1] - value * unit + 8} size={21} color={MUTED} anchor="end">{value < 0 ? `−${-value}i` : `${value}i`}</F>)}
        </g>
    )
}

const at = (o: Point, unit: number, a: number, b: number): Point => [o[0] + a * unit, o[1] - b * unit]

/* ---------- 1. New numbers ---------- */

export function ImaginaryUnitFigure({ language }: { language: UnitLanguage }) {
    const O: Point = [190, 170]
    const u = 36
    const rows = ['i² = −1', '√−9 = 3i', '(3i)² = 9i² = −9', '(−3i)² = −9']
    return (
        <Figure height={340} label={pickText(language, say('Ardatz irudikaria: 3i eta −3i, x² = −9 ekuazioaren bi soluzioak', 'El eje imaginario: 3i y −3i, las dos soluciones de x² = −9', 'المحور التخيلي: 3i و−3i حلا المعادلة x² = −9', 'The imaginary axis: 3i and −3i, the two solutions of x² = −9'))}>
            <Plane o={O} unit={u} x={[-4, 4]} y={[-4, 4]} numbers={[['y', 1], ['y', 3], ['y', -3], ['x', 3], ['x', -3]]} />
            <Dot p={at(O, u, 0, 1)} color={MUTED} r={6} />
            <Dot p={at(O, u, 0, 3)} color={STAGE} />
            <Dot p={at(O, u, 0, -3)} color={SECOND} />
            <F x={O[0] + 16} y={at(O, u, 0, 3)[1] + 8} size={22} color={STAGE} anchor="start">3i</F>
            <F x={O[0] + 16} y={at(O, u, 0, -3)[1] + 8} size={22} color={SECOND} anchor="start">−3i</F>
            {rows.map((row, index) => (
                <g key={row}>
                    <rect x={400} y={44 + index * 66} width={300} height={52} rx={12} fill={index === 0 ? STAGE_TINT : PAPER} stroke={INK} strokeWidth={1.6} />
                    <F x={550} y={78 + index * 66} size={23} color={index === 0 ? STAGE : INK}>{row}</F>
                </g>
            ))}
            <W x={550} y={322} language={language} text={say('Bi erro, bata bestearen aurkakoa', 'Dos raíces, opuestas', 'جذران متعاكسان', 'Two roots, opposite to each other')} />
        </Figure>
    )
}

export function BinomialSetsFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={330} label={pickText(language, say('Zenbaki konplexuen multzoa: barruan errealak eta irudikari hutsak; gainerakoak, a + bi, a eta b zero ez direla', 'El conjunto de los complejos: dentro, los reales y los imaginarios puros; el resto, a + bi con a y b distintos de cero', 'مجموعة الأعداد المركبة: في داخلها الأعداد الحقيقية والتخيلية الصرفة، والباقي a + bi حيث a وb غير معدومين', 'The set of complex numbers: inside, the reals and the purely imaginary numbers; the rest, a + bi with a and b not zero'))}>
            <rect x={20} y={20} width={680} height={290} rx={22} fill={PAPER} stroke={INK} strokeWidth={2.2} />
            <F x={52} y={62} size={30} color={INK} anchor="start">ℂ</F>
            <rect x={60} y={86} width={250} height={150} rx={18} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2} />
            <W x={185} y={120} language={language} color={STAGE} text={say('Errealak', 'Reales', 'الحقيقية', 'Reals')} />
            <F x={135} y={166} size={24}>5</F>
            <F x={235} y={166} size={24}>−3/4</F>
            <F x={135} y={212} size={24}>√2</F>
            <F x={235} y={212} size={24}>π</F>
            <rect x={340} y={86} width={250} height={150} rx={18} fill={ROSE} stroke={SECOND} strokeWidth={2} />
            <W x={465} y={120} language={language} color={SECOND} text={say('Irudikari hutsak', 'Imaginarios puros', 'تخيلية صرفة', 'Purely imaginary')} />
            <F x={415} y={166} size={24}>−3i</F>
            <F x={515} y={166} size={24}>4i</F>
            <F x={465} y={212} size={24}>i√2</F>
            <F x={190} y={282} size={25} color={INK}>2 + 7i</F>
            <F x={360} y={282} size={25} color={INK}>−1 − i</F>
            <F x={530} y={282} size={25} color={INK}>4 − 5i</F>
        </Figure>
    )
}

export function ComplexPlaneFigure({ language }: { language: UnitLanguage }) {
    const O: Point = [240, 170]
    const u = 40
    const z = at(O, u, 3, 2)
    const minus = at(O, u, -3, -2)
    const bar = at(O, u, 3, -2)
    return (
        <Figure height={340} label={pickText(language, say('z = 3 + 2i lehen koadrantean, −z jatorriarekiko simetrikoa eta konjokatua ardatz errealarekiko simetrikoa', 'z = 3 + 2i en el primer cuadrante, −z simétrico respecto al origen y el conjugado simétrico respecto al eje real', 'z = 3 + 2i في الربع الأول، و−z مناظره بالنسبة إلى الأصل، والمرافق مناظره بالنسبة إلى المحور الحقيقي', 'z = 3 + 2i in the first quadrant, −z its mirror image through the origin and the conjugate its mirror image in the real axis'))}>
            <Plane o={O} unit={u} x={[-5, 5]} y={[-3, 3]} numbers={[['x', 3], ['x', -3], ['y', 2], ['y', -2]]} />
            <line x1={minus[0]} y1={minus[1]} x2={z[0]} y2={z[1]} stroke={SECOND} strokeWidth={2.4} strokeDasharray="8 6" />
            <line x1={z[0]} y1={z[1]} x2={bar[0]} y2={bar[1]} stroke={GREEN} strokeWidth={2.4} strokeDasharray="8 6" />
            <line x1={O[0]} y1={O[1]} x2={z[0]} y2={z[1]} stroke={STAGE} strokeWidth={3.4} />
            <Dot p={z} color={STAGE} />
            <Dot p={minus} color={SECOND} />
            <Dot p={bar} color={GREEN} />
            <F x={z[0] + 14} y={z[1] - 10} size={23} color={STAGE} anchor="start">z = 3 + 2i</F>
            <F x={minus[0] - 14} y={minus[1] + 30} size={23} color={SECOND} anchor="start">−z = −3 − 2i</F>
            <F x={bar[0] + 14} y={bar[1] + 30} size={23} color={GREEN} anchor="start"><Bar /> = 3 − 2i</F>
        </Figure>
    )
}

/* ---------- Hero art ---------- */

export function ComplexHeroArt() {
    const hexagon = Array.from({ length: 6 }, (_, index) => {
        const angle = ((30 + index * 60) * Math.PI) / 180
        return [105 + 66 * Math.cos(angle), 100 - 66 * Math.sin(angle)]
    })
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(24 30) rotate(-4)">
                    <rect width={230} height={210} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    {[40, 75, 110, 145, 180].map((value) => <line key={`v${value}`} x1={value} y1={20} x2={value} y2={190} stroke={GRID} strokeWidth={1.2} />)}
                    {[35, 70, 105, 140, 175].map((value) => <line key={`h${value}`} x1={20} y1={value} x2={210} y2={value} stroke={GRID} strokeWidth={1.2} />)}
                    <line x1={20} y1={105} x2={210} y2={105} stroke="#58616e" strokeWidth={1.8} />
                    <line x1={110} y1={20} x2={110} y2={190} stroke="#58616e" strokeWidth={1.8} />
                    <line x1={110} y1={105} x2={180} y2={52} stroke="#2f6fdb" strokeWidth={3.4} />
                    <circle cx={180} cy={52} r={7} fill="#2f6fdb" />
                    <circle cx={180} cy={158} r={7} fill="#267b53" />
                    <line x1={180} y1={52} x2={180} y2={158} stroke="#267b53" strokeWidth={2.4} strokeDasharray="7 5" />
                </g>
                <g transform="translate(282 48) rotate(5)">
                    <rect width={210} height={200} rx={16} fill={SOFT} stroke={INK} strokeWidth={2} />
                    <circle cx={105} cy={100} r={66} fill="none" stroke={INK} strokeWidth={2} />
                    <polygon points={hexagon.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')} fill="none" stroke="#c4432a" strokeWidth={2.6} />
                    {hexagon.map(([x, y]) => <circle key={`${x}`} cx={x} cy={y} r={6} fill="#c4432a" />)}
                </g>
                <g transform="translate(46 284) rotate(2)">
                    <rect width={430} height={86} rx={16} fill={ROSE} stroke={INK} strokeWidth={2} />
                    <text x={215} y={56} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily={SERIF}>i² = −1</text>
                </g>
            </svg>
        </div>
    )
}
