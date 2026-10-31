import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Board } from '../dbh3-segidak/figures'
import { placeFlag, reflect, rotate, translate, type Point } from './motion'

/* ==========================================================================
   Planoko mugimenduak · 3. DBH — lesson figures: a grid with the flag and
   its image after each movement (translation, rotation, central symmetry,
   reflection, two mirrors), a vector with its components, a frieze and
   three hexagons round a vertex. Every point is worked out with the
   functions of motion.ts, so the drawing is the mathematics. Letters and
   numbers are SVG text of their own; Arabic words go through Label.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const SECOND_TINT = '#f6d5cc'
const GREEN = 'var(--success, #267b53)'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

/** Arabic captions carry words only: SVG text does not isolate formulas */
/** A square grid from (x0, y0) to (x1, y1), 22 px a unit, centred on the board */
function Grid({ from, to, children }: { from: Point; to: Point; children: (X: (x: number) => number, Y: (y: number) => number) => ReactNode }) {
    const unit = 22
    const width = (to[0] - from[0]) * unit
    const left = (360 - width) / 2
    const X = (x: number) => left + (x - from[0]) * unit
    const Y = (y: number) => 16 + (to[1] - y) * unit
    return (
        <>
            {Array.from({ length: to[0] - from[0] + 1 }, (_, i) => from[0] + i).map((x) => <line key={`x${x}`} x1={X(x)} x2={X(x)} y1={Y(to[1])} y2={Y(from[1])} stroke={x === 0 ? MUTED : 'var(--line, #e6dfd1)'} strokeWidth={x === 0 ? 1.4 : 1} />)}
            {Array.from({ length: to[1] - from[1] + 1 }, (_, i) => from[1] + i).map((y) => <line key={`y${y}`} y1={Y(y)} y2={Y(y)} x1={X(from[0])} x2={X(to[0])} stroke={y === 0 ? MUTED : 'var(--line, #e6dfd1)'} strokeWidth={y === 0 ? 1.4 : 1} />)}
            {children(X, Y)}
        </>
    )
}

function Flag({ points, X, Y, colour, tint, tip }: { points: Point[]; X: (x: number) => number; Y: (y: number) => number; colour: string; tint: string; tip?: string }) {
    const [base, top, end, low] = points
    return (
        <g>
            <line x1={X(base[0])} y1={Y(base[1])} x2={X(top[0])} y2={Y(top[1])} stroke={colour} strokeWidth={3} strokeLinecap="round" />
            <polygon points={[top, end, low].map(([x, y]) => `${X(x)},${Y(y)}`).join(' ')} fill={tint} stroke={colour} strokeWidth={2.2} strokeLinejoin="round" />
            <circle cx={X(end[0])} cy={Y(end[1])} r={4} fill={colour} />
            {tip && <text x={X(end[0]) + 6} y={Y(end[1]) - 6} fontSize={14} fontWeight={700} fill={colour}>{tip}</text>}
        </g>
    )
}

const Arrow = ({ from, to, X, Y, colour }: { from: Point; to: Point; X: (x: number) => number; Y: (y: number) => number; colour: string }) => {
    const angle = Math.atan2(Y(to[1]) - Y(from[1]), X(to[0]) - X(from[0]))
    const head = (side: number) => `${X(to[0]) - 10 * Math.cos(angle + side * 0.45)},${Y(to[1]) - 10 * Math.sin(angle + side * 0.45)}`
    return (
        <g>
            <line x1={X(from[0])} y1={Y(from[1])} x2={X(to[0])} y2={Y(to[1])} stroke={colour} strokeWidth={2.6} />
            <polygon points={`${X(to[0])},${Y(to[1])} ${head(1)} ${head(-1)}`} fill={colour} />
        </g>
    )
}

export type MotionFigureKind = 'components' | 'sum' | 'translation' | 'coordinates' | 'two-translations' | 'rotation' | 'rotation-coordinates' | 'central' | 'axial' | 'reflection-coordinates' | 'two-mirrors' | 'frieze' | 'tessellation'

const CAPTIONS: Record<MotionFigureKind, LocalizedText> = {
    components: say('AB bektorea: osagaiak (4, 3), modulua 5', 'Vector AB: componentes (4, 3), módulo 5', 'المتجه ومركّبتاه وطوله', 'Vector AB: components (4, 3), length 5'),
    sum: say('u + v: bata bestearen ondoren', 'u + v: uno detrás de otro', 'جمع متجهين: واحد بعد الآخر', 'u + v: one after the other'),
    translation: say('Bandera (4, 2) bektorearekin lekualdatua', 'La bandera trasladada con el vector (4, 2)', 'العلم منقولًا بمتجه', 'The flag translated by the vector (4, 2)'),
    coordinates: say('(x, y) → (x + 4, y + 2)', '(x, y) → (x + 4, y + 2)', 'الانسحاب بالإحداثيات', '(x, y) → (x + 4, y + 2)'),
    'two-translations': say('Bi lekualdaketa: u eta gero v, edo zuzenean u + v', 'Dos traslaciones: u y después v, o directamente u + v', 'انسحابان متتاليان أو انسحاب واحد بمجموعهما', 'Two translations: u then v, or straight away u + v'),
    rotation: say('Bandera O puntuaren inguruan 90° biratua', 'La bandera girada 90° alrededor de O', 'العلم مدارًا ربع دورة حول المركز', 'The flag rotated 90° about O'),
    'rotation-coordinates': say('90° biraketa: (x, y) → (−y, x)', 'Giro de 90°: (x, y) → (−y, x)', 'الدوران بالإحداثيات', 'Rotation by 90°: (x, y) → (−y, x)'),
    central: say('Simetria zentrala: 180° biraketa', 'Simetría central: giro de 180°', 'التناظر المركزي: نصف دورة', 'Central symmetry: rotation by 180°'),
    axial: say('Simetria axiala: ardatza ispilu bat da', 'Simetría axial: el eje es un espejo', 'التناظر المحوري: المحور مرآة', 'Reflection: the axis is a mirror'),
    'reflection-coordinates': say('X ardatzarekiko: (x, y) → (x, −y)', 'Respecto al eje X: (x, y) → (x, −y)', 'التناظر بالنسبة إلى المحور الأفقي', 'In the X axis: (x, y) → (x, −y)'),
    'two-mirrors': say('Bi ispilu paralelo: lekualdaketa bat, distantziaren bikoitza', 'Dos espejos paralelos: una traslación del doble de la distancia', 'مرآتان متوازيتان: انسحاب بضعف المسافة', 'Two parallel mirrors: a translation of twice the distance'),
    frieze: say('Frisoa: motibo bat, behin eta berriz lekualdatua', 'Friso: un motivo trasladado una y otra vez', 'الإفريز: نقش منقول مرة بعد مرة', 'Frieze: one motif translated again and again'),
    tessellation: say('Hiru hexagono erpin batean: 3 · 120° = 360°', 'Tres hexágonos en un vértice: 3 · 120° = 360°', 'ثلاثة مسدسات حول رأس', 'Three hexagons at a vertex: 3 · 120° = 360°')
}

export function MotionFigure({ language, kind }: { language: UnitLanguage; kind: MotionFigureKind }) {
    const caption = pickText(language, CAPTIONS[kind])
    let content: ReactNode
    if (kind === 'components' || kind === 'sum') {
        content = (
            <Grid from={[-1, -1]} to={[7, 6]}>
                {(X, Y) => kind === 'components'
                    ? (
                        <>
                            <line x1={X(1)} y1={Y(1)} x2={X(5)} y2={Y(1)} stroke={MUTED} strokeWidth={2} strokeDasharray="5 4" />
                            <line x1={X(5)} y1={Y(1)} x2={X(5)} y2={Y(4)} stroke={MUTED} strokeWidth={2} strokeDasharray="5 4" />
                            <Arrow from={[1, 1]} to={[5, 4]} X={X} Y={Y} colour={STAGE} />
                            <text x={X(3)} y={Y(1) + 18} textAnchor="middle" fontSize={14} fontWeight={700} fill={MUTED}>4</text>
                            <text x={X(5) + 8} y={Y(2.5) + 5} fontSize={14} fontWeight={700} fill={MUTED}>3</text>
                            <text x={X(1) - 16} y={Y(1) + 5} fontSize={15} fontWeight={700} fill={INK}>A</text>
                            <text x={X(5) + 6} y={Y(4) - 6} fontSize={15} fontWeight={700} fill={INK}>B</text>
                        </>
                    )
                    : (
                        <>
                            <Arrow from={[0, 0]} to={[3, 1]} X={X} Y={Y} colour={STAGE} />
                            <Arrow from={[3, 1]} to={[4, 4]} X={X} Y={Y} colour={SECOND} />
                            <Arrow from={[0, 0]} to={[4, 4]} X={X} Y={Y} colour={GREEN} />
                            <text x={X(1.6)} y={Y(0.5) + 18} fontSize={15} fontWeight={700} fill={STAGE}>u</text>
                            <text x={X(3.6) + 8} y={Y(2.5)} fontSize={15} fontWeight={700} fill={SECOND}>v</text>
                            <text x={X(1.6) - 30} y={Y(2.2)} fontSize={15} fontWeight={700} fill={GREEN}>u + v</text>
                        </>
                    )}
            </Grid>
        )
    } else if (kind === 'tessellation') {
        const hexagon = (cx: number, cy: number) => Array.from({ length: 6 }, (_, i) => `${cx + 46 * Math.cos((Math.PI / 3) * i)},${cy + 46 * Math.sin((Math.PI / 3) * i)}`).join(' ')
        const vertex: Point = [180, 104]
        const centres = [0, 1, 2].map((i) => [vertex[0] + 46 * Math.cos((2 * Math.PI * i) / 3 + Math.PI / 3 * 0), vertex[1] + 46 * Math.sin((2 * Math.PI * i) / 3)] as Point)
        content = (
            <>
                {centres.map(([cx, cy], index) => <polygon key={index} points={hexagon(cx, cy)} fill={[STAGE_TINT, SECOND_TINT, '#d9efe2'][index]} stroke={INK} strokeWidth={2} />)}
                <circle cx={vertex[0]} cy={vertex[1]} r={5} fill={INK} />
                <text x={vertex[0]} y={196} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>120° + 120° + 120° = 360°</text>
            </>
        )
    } else {
        content = (
            <Grid from={[-7, -4]} to={[7, 5]}>
                {(X, Y) => {
                    const flag = placeFlag([1, 0])
                    if (kind === 'translation' || kind === 'coordinates') {
                        const image = flag.map((point) => translate(point, [4, 2]))
                        return (
                            <>
                                <Flag points={flag} X={X} Y={Y} colour={STAGE} tint={STAGE_TINT} tip="P" />
                                <Flag points={image} X={X} Y={Y} colour={SECOND} tint={SECOND_TINT} tip="P′" />
                                <Arrow from={flag[2]} to={image[2]} X={X} Y={Y} colour={GREEN} />
                                {kind === 'coordinates' && <text x={X(-6)} y={Y(4)} fontSize={14} fontWeight={700} fill={INK}>(3, 2) → (7, 4)</text>}
                            </>
                        )
                    }
                    if (kind === 'two-translations') {
                        const middle = flag.map((point) => translate(point, [3, -2]))
                        const end = flag.map((point) => translate(point, [5, 1]))
                        return (
                            <>
                                <Flag points={flag} X={X} Y={Y} colour={STAGE} tint={STAGE_TINT} />
                                <Flag points={middle} X={X} Y={Y} colour={MUTED} tint="#ece6da" />
                                <Flag points={end} X={X} Y={Y} colour={SECOND} tint={SECOND_TINT} />
                                <Arrow from={flag[2]} to={middle[2]} X={X} Y={Y} colour={STAGE} />
                                <Arrow from={middle[2]} to={end[2]} X={X} Y={Y} colour={SECOND} />
                                <Arrow from={flag[2]} to={end[2]} X={X} Y={Y} colour={GREEN} />
                            </>
                        )
                    }
                    if (kind === 'rotation' || kind === 'rotation-coordinates' || kind === 'central') {
                        const turn = kind === 'central' ? 180 : 90
                        const image = flag.map((point) => rotate(point, turn))
                        return (
                            <>
                                <Flag points={flag} X={X} Y={Y} colour={STAGE} tint={STAGE_TINT} tip="P" />
                                <Flag points={image} X={X} Y={Y} colour={SECOND} tint={SECOND_TINT} tip="P′" />
                                <path d={`M${X(flag[2][0])} ${Y(flag[2][1])} A ${Math.hypot(flag[2][0], flag[2][1]) * 22} ${Math.hypot(flag[2][0], flag[2][1]) * 22} 0 0 0 ${X(image[2][0])} ${Y(image[2][1])}`} fill="none" stroke={GREEN} strokeWidth={2} strokeDasharray="5 4" />
                                <circle cx={X(0)} cy={Y(0)} r={5} fill={INK} />
                                <text x={X(0) + 6} y={Y(0) + 16} fontSize={14} fontWeight={700} fill={INK}>O</text>
                                {kind === 'rotation-coordinates' && <text x={X(-6)} y={Y(4)} fontSize={14} fontWeight={700} fill={INK}>(3, 2) → (−2, 3)</text>}
                            </>
                        )
                    }
                    if (kind === 'axial' || kind === 'reflection-coordinates') {
                        const axis = kind === 'axial' ? { kind: 'vertical' as const, at: 0 } : { kind: 'horizontal' as const, at: 0 }
                        const shifted = kind === 'axial' ? flag : placeFlag([1, 1])
                        const image = shifted.map((point) => reflect(point, axis))
                        return (
                            <>
                                {kind === 'axial'
                                    ? <line x1={X(0)} x2={X(0)} y1={Y(5)} y2={Y(-4)} stroke={GREEN} strokeWidth={3} />
                                    : <line x1={X(-7)} x2={X(7)} y1={Y(0)} y2={Y(0)} stroke={GREEN} strokeWidth={3} />}
                                <Flag points={shifted} X={X} Y={Y} colour={STAGE} tint={STAGE_TINT} tip="P" />
                                <Flag points={image} X={X} Y={Y} colour={SECOND} tint={SECOND_TINT} tip="P′" />
                                {kind === 'reflection-coordinates' && <text x={X(-6)} y={Y(4)} fontSize={14} fontWeight={700} fill={INK}>(3, 3) → (3, −3)</text>}
                            </>
                        )
                    }
                    if (kind === 'two-mirrors') {
                        const first = placeFlag([-5, 0])
                        const once = first.map((point) => reflect(point, { kind: 'vertical', at: -2 }))
                        const twice = once.map((point) => reflect(point, { kind: 'vertical', at: 1 }))
                        return (
                            <>
                                <line x1={X(-2)} x2={X(-2)} y1={Y(5)} y2={Y(-4)} stroke={GREEN} strokeWidth={3} />
                                <line x1={X(1)} x2={X(1)} y1={Y(5)} y2={Y(-4)} stroke={GREEN} strokeWidth={3} />
                                <Flag points={first} X={X} Y={Y} colour={STAGE} tint={STAGE_TINT} />
                                <Flag points={once} X={X} Y={Y} colour={MUTED} tint="#ece6da" />
                                <Flag points={twice} X={X} Y={Y} colour={SECOND} tint={SECOND_TINT} />
                                <Arrow from={first[0]} to={twice[0]} X={X} Y={Y} colour={INK} />
                                <text x={X(-0.5)} y={Y(-2.6)} textAnchor="middle" fontSize={14} fontWeight={700} fill={INK}>2 · 3 = 6</text>
                            </>
                        )
                    }
                    // Frieze: the motif and three translations of it
                    return (
                        <>
                            {[-6, -3, 0, 3].map((shift, index) => <Flag key={shift} points={placeFlag([shift, -1])} X={X} Y={Y} colour={index === 0 ? STAGE : SECOND} tint={index === 0 ? STAGE_TINT : SECOND_TINT} />)}
                            <Arrow from={[-6, -2.4]} to={[-3, -2.4]} X={X} Y={Y} colour={GREEN} />
                        </>
                    )
                }}
            </Grid>
        )
    }
    return (
        <Board height={kind === 'tessellation' ? 210 : 236} label={caption}>
            {content}
            <Label x={180} y={kind === 'tessellation' ? 208 : 232} textAnchor="middle" fontSize={13} fill={MUTED}>{kind === 'tessellation' ? '' : caption}</Label>
        </Board>
    )
}
