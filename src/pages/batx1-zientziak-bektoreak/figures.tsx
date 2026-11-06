import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Label, PlaneGrid } from '../dbh2-funtzioak-v2/plane'
import { useBoxClip } from '../dbh2-funtzioak-v2/planeClip'
import { planeMap, type PlaneBox, type PlaneMap } from '../dbh2-funtzioak-v2/planeMap'
import { Figure } from '../dbh2-zatikiak-prototype/figures'

/* ==========================================================================
   Bektoreak · Batxilergoa 1 · Zientziak — the new lesson figures: a
   linear combination as a parallelogram, a basis and two parallel vectors,
   the skew grid of a basis, the sign of the dot product, the angle of two
   vectors that follow each other, the diagonals of a parallelogram, the
   orthonormal basis, unit vectors, the angle of two vectors, a
   perpendicular, the projection as a shadow, splitting a vector and a boat
   crossing a river. The first two lessons reuse the 4. DBH figures.
   Formulas sit in their own <text> (left to right in every language);
   words go through <Label>.
   ========================================================================== */

type Point = [number, number]

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const GREEN_TINT = 'var(--success-tint, #d9efe2)'
const CARD = 'var(--card, #fffcf6)'
const LATTICE = '#b9c7e3'
const RIVER = '#cfe2f3'
const PAPER = '#fffcf6'
const MUSTARD_TINT = '#fbebc0'
const SERIF = 'Fraunces, serif'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const useText = (language: UnitLanguage) => (text: LocalizedText) => pickText(language, text)

/** The shared figure frame, with a strip on top so the y of a plane's axis is never cut */
function Fig({ height, label, children }: { height: number; label: string; children: ReactNode }) {
    return (
        <Figure height={height + 14} label={label}>
            <g transform="translate(0 14)">{children}</g>
        </Figure>
    )
}

function Caption({ y, children, x = 360 }: { y: number; children: ReactNode; x?: number }) {
    return <Label x={x} y={y} textAnchor="middle" fontSize={19} fill={MUTED}>{children}</Label>
}

/** A formula written left to right whatever the language */
function F({ x, y, children, size = 21, color = INK, anchor = 'start', weight = 700 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color} direction="ltr">{children}</text>
}

/** A small Cartesian plane placed at (ox, oy) inside a figure */
function Frame({ box, cell, ox, oy, labelStep = 1, children }: { box: PlaneBox; cell: number; ox: number; oy: number; labelStep?: number; children?: (map: PlaneMap, clip: string) => ReactNode }) {
    const map = planeMap(box, cell, ox, oy)
    const [clipPath, clip] = useBoxClip(map)
    return (
        <g>
            <defs>{clipPath}</defs>
            <rect x={ox} y={oy} width={map.width} height={map.height} fill={CARD} />
            <PlaneGrid map={map} labelStep={labelStep} />
            {children?.(map, clip)}
        </g>
    )
}

/** An arrow between two points given in pixels */
function PixelArrow({ from, to, color = STAGE, width = 3.4, dashed = false }: { from: Point; to: Point; color?: string; width?: number; dashed?: boolean }) {
    const [x1, y1] = from
    const [x2, y2] = to
    const length = Math.hypot(x2 - x1, y2 - y1)
    const [ux, uy] = [(x2 - x1) / length, (y2 - y1) / length]
    const head = 14
    const base: Point = [x2 - ux * head, y2 - uy * head]
    const wing = 6.5
    return (
        <g>
            <line x1={x1} y1={y1} x2={base[0]} y2={base[1]} stroke={color} strokeWidth={width} strokeDasharray={dashed ? '7 5' : undefined} strokeLinecap="round" />
            <polygon points={`${x2},${y2} ${base[0] - uy * wing},${base[1] + ux * wing} ${base[0] + uy * wing},${base[1] - ux * wing}`} fill={color} />
        </g>
    )
}

/** An arrow from p to q in plane coordinates, with an optional name near its middle */
function Arrow({ map, from, to, color = STAGE, width = 3.4, dashed = false, name, dx = 6, dy = -8 }: { map: PlaneMap; from: Point; to: Point; color?: string; width?: number; dashed?: boolean; name?: string; dx?: number; dy?: number }) {
    const a: Point = [map.x(from[0]), map.y(from[1])]
    const b: Point = [map.x(to[0]), map.y(to[1])]
    return (
        <g>
            <PixelArrow from={a} to={b} color={color} width={width} dashed={dashed} />
            {name && <F x={(a[0] + b[0]) / 2 + dx} y={(a[1] + b[1]) / 2 + dy} size={19} color={color}>{name}</F>}
        </g>
    )
}

/** A dashed segment in plane coordinates */
function Dashed({ map, from, to, color = MUTED, width = 2 }: { map: PlaneMap; from: Point; to: Point; color?: string; width?: number }) {
    return <line x1={map.x(from[0])} y1={map.y(from[1])} x2={map.x(to[0])} y2={map.y(to[1])} stroke={color} strokeWidth={width} strokeDasharray="6 5" />
}

/** The small square of a right angle at corner c, between the directions of a and b (plane coordinates) */
function RightMark({ map, corner, a, b, size = 12 }: { map: PlaneMap; corner: Point; a: Point; b: Point; size?: number }) {
    const unit = (p: Point): Point => {
        const dx = map.x(p[0]) - map.x(corner[0])
        const dy = map.y(p[1]) - map.y(corner[1])
        const length = Math.hypot(dx, dy)
        return [(dx / length) * size, (dy / length) * size]
    }
    const [ax, ay] = unit(a)
    const [bx, by] = unit(b)
    const [cx, cy] = [map.x(corner[0]), map.y(corner[1])]
    return <path d={`M${cx + ax} ${cy + ay} L${cx + ax + bx} ${cy + ay + by} L${cx + bx} ${cy + by}`} fill="none" stroke={INK} strokeWidth={1.8} />
}

/** An arc of radius r (pixels) around c (pixels) from the direction of angle a1 to a2 (degrees, counter-clockwise on screen) */
function Arc({ c, r, a1, a2, color = INK }: { c: Point; r: number; a1: number; a2: number; color?: string }) {
    const point = (angle: number): Point => [c[0] + r * Math.cos((angle * Math.PI) / 180), c[1] - r * Math.sin((angle * Math.PI) / 180)]
    const [x1, y1] = point(a1)
    const [x2, y2] = point(a2)
    const large = Math.abs(a2 - a1) > 180 ? 1 : 0
    const sweep = a2 > a1 ? 0 : 1
    return <path d={`M${x1} ${y1} A${r} ${r} 0 ${large} ${sweep} ${x2} ${y2}`} fill="none" stroke={color} strokeWidth={2.2} />
}

/** The lines of the skew grid of the basis (u, v): lines through k·v parallel to u and through k·u parallel to v */
function Lattice({ map, clip, u, v, from = -6, to = 8 }: { map: PlaneMap; clip: string; u: Point; v: Point; from?: number; to?: number }) {
    const lines: ReactNode[] = []
    for (let k = from; k <= to; k++) {
        for (const [base, direction, key] of [[v, u, 'a'], [u, v, 'b']] as const) {
            const start: Point = [k * base[0] - 20 * direction[0], k * base[1] - 20 * direction[1]]
            const end: Point = [k * base[0] + 20 * direction[0], k * base[1] + 20 * direction[1]]
            lines.push(<line key={`${key}${k}`} x1={map.x(start[0])} y1={map.y(start[1])} x2={map.x(end[0])} y2={map.y(end[1])} stroke={LATTICE} strokeWidth={1.6} />)
        }
    }
    return <g clipPath={clip}>{lines}</g>
}

/* ---------- 3. A linear combination ---------- */

export function CombinationFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -3, xMax: 4, yMin: -1, yMax: 9 }
    return (
        <Fig height={350} label={t(say('w = (1, 8) bektorea 3u eta 2v aldeko paralelogramoaren diagonala da, u = (1, 2) eta v = (−1, 1) izanik', 'El vector w = (1, 8) es la diagonal del paralelogramo de lados 3u y 2v, con u = (1, 2) y v = (−1, 1)', 'المتجه w = (1, 8) قطر متوازي الأضلاع الذي ضلعاه 3u و2v، حيث u = (1, 2) وv = (−1, 1)', 'The vector w = (1, 8) is the diagonal of the parallelogram with sides 3u and 2v, where u = (1, 2) and v = (−1, 1)'))}>
            <Frame box={box} cell={30} ox={30} oy={20}>
                {(map) => (
                    <g>
                        <polygon points={[[0, 0], [3, 6], [1, 8], [-2, 2]].map(([x, y]) => `${map.x(x)},${map.y(y)}`).join(' ')} fill={STAGE_TINT} opacity={0.7} />
                        <Dashed map={map} from={[3, 6]} to={[1, 8]} color={GREEN} />
                        <Dashed map={map} from={[-2, 2]} to={[1, 8]} color={SECOND} />
                        <Arrow map={map} from={[0, 0]} to={[3, 6]} color={SECOND} width={2.4} dashed name="3u" dx={10} dy={14} />
                        <Arrow map={map} from={[0, 0]} to={[-2, 2]} color={GREEN} width={2.4} dashed name="2v" dx={-34} dy={8} />
                        <Arrow map={map} from={[0, 0]} to={[1, 2]} color={SECOND} width={4} name="u" dx={8} dy={10} />
                        <Arrow map={map} from={[0, 0]} to={[-1, 1]} color={GREEN} width={4} name="v" dx={-24} dy={-2} />
                        <Arrow map={map} from={[0, 0]} to={[1, 8]} color={STAGE} width={3.6} name="w" dx={6} dy={-30} />
                    </g>
                )}
            </Frame>
            <F x={300} y={70}>w = a · u + b · v</F>
            <F x={300} y={124}>a − b = 1</F>
            <F x={300} y={160}>2a + b = 8</F>
            <F x={300} y={214} color={STAGE}>a = 3,  b = 2</F>
            <F x={300} y={268} color={STAGE}>w = 3u + 2v</F>
            <Caption y={338} x={500}>{t(say('Koordenatu bakoitzak ekuazio bat ematen du', 'Cada coordenada da una ecuación', 'كل مركّبة تعطي معادلة', 'Each coordinate gives an equation'))}</Caption>
        </Fig>
    )
}

/* ---------- 4. A basis, and two parallel vectors that are not one ---------- */

export function BasisFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -5, xMax: 3, yMin: -4, yMax: 6 }
    return (
        <Fig height={360} label={t(say('Ezkerrean u = (2, −3) eta w = (1, 2) oinarria dira: haien sareak plano osoa betetzen du. Eskuinean u eta v = (−4, 6) paraleloak dira: zuzen bakarrean geratzen dira', 'A la izquierda, u = (2, −3) y w = (1, 2) son una base: su red llena el plano. A la derecha, u y v = (−4, 6) son paralelos: se quedan en una sola recta', 'على اليسار u = (2, −3) وw = (1, 2) أساس: شبكتهما تملأ المستوى. وعلى اليمين u وv = (−4, 6) متوازيان: يبقيان على مستقيم واحد', 'On the left, u = (2, −3) and w = (1, 2) are a basis: their grid fills the plane. On the right, u and v = (−4, 6) are parallel: they stay on a single line'))}>
            <Frame box={box} cell={26} ox={40} oy={20}>
                {(map, clip) => (
                    <g>
                        <Lattice map={map} clip={clip} u={[2, -3]} v={[1, 2]} />
                        <Arrow map={map} from={[0, 0]} to={[2, -3]} color={SECOND} width={4} name="u" dx={8} dy={6} />
                        <Arrow map={map} from={[0, 0]} to={[1, 2]} color={GREEN} width={4} name="w" dx={8} dy={-4} />
                    </g>
                )}
            </Frame>
            <Frame box={box} cell={26} ox={420} oy={20}>
                {(map, clip) => (
                    <g>
                        <g clipPath={clip}><Dashed map={map} from={[-8, 12]} to={[6, -9]} color={MUTED} /></g>
                        <Arrow map={map} from={[0, 0]} to={[-4, 6]} color={GREEN} width={4} name="v" dx={-30} dy={0} />
                        <Arrow map={map} from={[0, 0]} to={[2, -3]} color={SECOND} width={4} name="u" dx={8} dy={6} />
                    </g>
                )}
            </Frame>
            <Caption y={318} x={144}>{t(say('Oinarria da', 'Son una base', 'إنهما أساس', 'They are a basis'))}</Caption>
            <Caption y={318} x={524}>{t(say('Ez dira oinarria: v = −2u', 'No son base: v = −2u', 'ليسا أساسًا: v = −2u', 'Not a basis: v = −2u'))}</Caption>
            <Caption y={350}>{t(say('Paraleloak: koordenatu proportzionalak', 'Paralelos: coordenadas proporcionales', 'المتوازيان: مركّباتهما متناسبة', 'Parallel: proportional coordinates'))}</Caption>
        </Fig>
    )
}

/* ---------- 5. Coordinates in a basis: the skew grid ---------- */

export function SkewGridFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -3, xMax: 4, yMin: -1, yMax: 9 }
    return (
        <Fig height={370} label={t(say('u = (1, 1) eta v = (−1, 2) oinarriaren sare okerra: w = (−1, 8) puntura iristeko 2 urrats u eta 3 urrats v; B oinarrian w = (2, 3)', 'La cuadrícula torcida de la base u = (1, 1), v = (−1, 2): para llegar a w = (−1, 8) hay 2 pasos de u y 3 de v; en la base B, w = (2, 3)', 'الشبكة المائلة للأساس u = (1, 1) وv = (−1, 2): للوصول إلى w = (−1, 8) نخطو خطوتين u و3 خطوات v؛ وفي الأساس B يكون w = (2, 3)', 'The skew grid of the basis u = (1, 1), v = (−1, 2): to reach w = (−1, 8) you take 2 steps of u and 3 of v; in the basis B, w = (2, 3)'))}>
            <Frame box={box} cell={32} ox={30} oy={20}>
                {(map, clip) => (
                    <g>
                        <Lattice map={map} clip={clip} u={[1, 1]} v={[-1, 2]} />
                        {[0, 1].map((k) => <Arrow key={`u${k}`} map={map} from={[k, k]} to={[k + 1, k + 1]} color={SECOND} width={3.6} />)}
                        {[0, 1, 2].map((k) => <Arrow key={`v${k}`} map={map} from={[2 - k, 2 + 2 * k]} to={[1 - k, 4 + 2 * k]} color={GREEN} width={3.6} />)}
                        <Arrow map={map} from={[0, 0]} to={[-1, 8]} color={STAGE} width={3} dashed name="w" dx={-30} dy={0} />
                        <F x={map.x(0.5) + 8} y={map.y(0.5) + 14} size={18} color={SECOND}>u</F>
                        <F x={map.x(1.5) + 10} y={map.y(3) + 6} size={18} color={GREEN}>v</F>
                    </g>
                )}
            </Frame>
            <F x={310} y={70}>w = (−1, 8)</F>
            <F x={310} y={124}>w = 2u + 3v</F>
            <text x={310} y={178} fontSize={21} fontWeight={700} fill={STAGE} direction="ltr">w = (2, 3)<tspan dy={7} fontSize={15}>B</tspan></text>
            <Caption y={240} x={510}>{t(say('Bektore bera, beste koordenatu batzuk', 'El mismo vector, otras coordenadas', 'المتجه نفسه بمركّبات أخرى', 'The same vector, other coordinates'))}</Caption>
            <Caption y={360}>{t(say('Sarearen marrak u eta v bektoreekin egiten dira', 'Las líneas de la red se hacen con u y v', 'خطوط الشبكة مرسومة بـ u وv', 'The lines of the grid are made with u and v'))}</Caption>
        </Fig>
    )
}

/* ---------- 6. The sign of the dot product ---------- */

export function DotSignFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const panels: Array<{ angle: number; sign: string; name: LocalizedText }> = [
        { angle: 60, sign: 'u · v > 0', name: say('Zorrotza', 'Agudo', 'حادة', 'Acute') },
        { angle: 90, sign: 'u · v = 0', name: say('Zuzena', 'Recto', 'قائمة', 'Right') },
        { angle: 120, sign: 'u · v < 0', name: say('Kamutsa', 'Obtuso', 'منفرجة', 'Obtuse') }
    ]
    return (
        <Fig height={300} label={t(say('u bektorea finko dago eta v biratu egiten da: angelua zorrotza bada, biderkadura eskalarra positiboa da; zuzena bada, 0; kamutsa bada, negatiboa', 'El vector u está fijo y v gira: si el ángulo es agudo, el producto escalar es positivo; si es recto, 0; si es obtuso, negativo', 'المتجه u ثابت وv يدور: إذا كانت الزاوية حادة فالجداء السلمي موجب، وإذا كانت قائمة فهو 0، وإذا كانت منفرجة فهو سالب', 'The vector u stays fixed and v turns: if the angle is acute, the dot product is positive; if it is a right angle, 0; if it is obtuse, negative'))}>
            {panels.map(({ angle, sign, name }, index) => {
                const left = 20 + index * 236
                const origin: Point = [left + (angle > 90 ? 120 : 50), 190]
                const radians = (angle * Math.PI) / 180
                const tip: Point = [origin[0] + 110 * Math.cos(radians), origin[1] - 110 * Math.sin(radians)]
                return (
                    <g key={angle}>
                        <rect x={left} y={14} width={220} height={226} rx={14} fill={index === 1 ? GREEN_TINT : index === 0 ? STAGE_TINT : MUSTARD_TINT} stroke={INK} strokeWidth={1.4} />
                        <PixelArrow from={origin} to={[origin[0] + 90, origin[1]]} color={SECOND} />
                        <PixelArrow from={origin} to={tip} color={STAGE} />
                        {angle === 90 ? <path d={`M${origin[0] + 16} ${origin[1]} v-16 h-16`} fill="none" stroke={INK} strokeWidth={1.8} /> : <Arc c={origin} r={30} a1={0} a2={angle} />}
                        <F x={origin[0] + 84} y={origin[1] - 12} size={22} color={SECOND} anchor="end">u</F>
                        <F x={tip[0] + (angle > 90 ? -20 : 8)} y={tip[1] + 6} size={22} color={STAGE}>v</F>
                        <F x={origin[0] + 36} y={origin[1] - 36} size={19}>{`${angle}°`}</F>
                        <F x={left + 110} y={228} size={24} anchor="middle">{sign}</F>
                        <Label x={left + 110} y={46} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK}>{t(name)}</Label>
                    </g>
                )
            })}
            <Caption y={284}>{t(say('Kosinuaren zeinuak erabakitzen du', 'Lo decide el signo del coseno', 'تحدّده إشارة جيب التمام', 'The sign of the cosine decides'))}</Caption>
        </Fig>
    )
}

/* ---------- 7. Vectors that follow each other: the outer angle ---------- */

export function TailToTailFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const A: Point = [70, 250]
    const B: Point = [270, 250]
    const C: Point = [170, 250 - 100 * Math.sqrt(3)]
    const beyond: Point = [380, 250]
    return (
        <Fig height={320} label={t(say('Alde 2 duen ABC triangelu aldeberdina. AB eta BC jatorri berean jartzean 120°-ko angelua osatzen dute, ez 60°-koa', 'Triángulo equilátero ABC de lado 2. Con el mismo origen, AB y BC forman 120°, no 60°', 'مثلث متساوي الأضلاع ABC طول ضلعه 2. وعند وضع AB وBC من الأصل نفسه تكون الزاوية بينهما 120° لا 60°', 'An equilateral triangle ABC with side 2. From the same starting point, AB and BC make 120°, not 60°'))}>
            <polygon points={[A, B, C].map(([x, y]) => `${x},${y}`).join(' ')} fill={STAGE_TINT} opacity={0.6} stroke="none" />
            <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={MUTED} strokeWidth={2} />
            <line x1={B[0]} y1={B[1]} x2={beyond[0]} y2={beyond[1]} stroke={STAGE} strokeWidth={2.4} strokeDasharray="7 5" />
            <PixelArrow from={A} to={B} color={STAGE} />
            <PixelArrow from={B} to={C} color={SECOND} />
            <Arc c={B} r={34} a1={0} a2={120} color={SECOND} />
            <Arc c={B} r={22} a1={120} a2={180} color={MUTED} />
            <F x={B[0] + 30} y={B[1] - 44} size={18} color={SECOND}>120°</F>
            <F x={B[0] - 62} y={B[1] - 12} size={15} color={MUTED}>60°</F>
            <F x={A[0] - 8} y={A[1] + 26} size={20} anchor="end">A</F>
            <F x={B[0]} y={B[1] + 28} size={20} anchor="middle">B</F>
            <F x={C[0]} y={C[1] - 12} size={20} anchor="middle">C</F>
            <F x={430} y={90}>AB · BC</F>
            <F x={430} y={130}>= 2 · 2 · cos 120°</F>
            <F x={430} y={170} color={SECOND}>= −2</F>
            <Label x={430} y={226} fontSize={17} fill={MUTED}>{t(say('AB luzatu B-tik haratago:', 'Prolonga AB más allá de B:', 'مدّد AB بعد B:', 'Extend AB beyond B:'))}</Label>
            <Label x={430} y={252} fontSize={17} fill={MUTED}>{t(say('kanpoko angelua da', 'es el ángulo exterior', 'إنها الزاوية الخارجية', 'it is the outer angle'))}</Label>
            <Caption y={306}>{t(say('Bi bektoreak puntu beretik atera behar dira', 'Los dos vectores tienen que salir del mismo punto', 'يجب أن يخرج المتجهان من النقطة نفسها', 'Both vectors have to start from the same point'))}</Caption>
        </Fig>
    )
}

/* ---------- 8. The diagonals of a parallelogram ---------- */

export function DiagonalsFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -4, xMax: 4, yMin: -1, yMax: 5 }
    return (
        <Fig height={290} label={t(say('u = (3, 0) eta v = (−3, 4) aldeko paralelogramoa: |u| = 3, |v| = 5, u · v = −9 eta u + v diagonalak 4 neurtzen du', 'Paralelogramo de lados u = (3, 0) y v = (−3, 4): |u| = 3, |v| = 5, u · v = −9 y la diagonal u + v mide 4', 'متوازي أضلاع ضلعاه u = (3, 0) وv = (−3, 4): ‏|u| = 3 و|v| = 5 وu · v = −9 والقطر u + v طوله 4', 'A parallelogram with sides u = (3, 0) and v = (−3, 4): |u| = 3, |v| = 5, u · v = −9 and the diagonal u + v is 4 long'))}>
            <Frame box={box} cell={34} ox={24} oy={22}>
                {(map) => (
                    <g>
                        <polygon points={[[0, 0], [3, 0], [0, 4], [-3, 4]].map(([x, y]) => `${map.x(x)},${map.y(y)}`).join(' ')} fill={STAGE_TINT} opacity={0.7} />
                        <Dashed map={map} from={[3, 0]} to={[0, 4]} color={GREEN} />
                        <Dashed map={map} from={[-3, 4]} to={[0, 4]} color={SECOND} />
                        <Arrow map={map} from={[0, 0]} to={[3, 0]} color={SECOND} width={4} name="u" dx={-4} dy={26} />
                        <Arrow map={map} from={[0, 0]} to={[-3, 4]} color={GREEN} width={4} name="v" dx={-26} dy={0} />
                        <Arrow map={map} from={[0, 0]} to={[0, 4]} color={STAGE} width={4} name="u + v" dx={8} dy={4} />
                    </g>
                )}
            </Frame>
            <F x={330} y={64}>|u| = 3,   |v| = 5,   u · v = −9</F>
            <F x={330} y={120}>|u + v|² = 9 + 2 · (−9) + 25</F>
            <F x={330} y={160} color={STAGE}>= 16  →  |u + v| = 4</F>
            <F x={330} y={216} color={MUTED} size={19}>|u| + |v| = 8 ≠ 4</F>
            <Caption y={276} x={480}>{t(say('Modulua ez da batzen: 2u · v falta da', 'Los módulos no se suman: falta 2u · v', 'الأطوال لا تُجمع: ينقص 2u · v', 'Magnitudes do not add: 2u · v is missing'))}</Caption>
        </Fig>
    )
}

/* ---------- 9. The orthonormal basis ---------- */

export function OrthonormalFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -1, xMax: 5, yMin: -3, yMax: 3 }
    return (
        <Fig height={290} label={t(say('i = (1, 0) eta j = (0, 1) oinarri ortonormala: perpendikularrak eta modulua 1 dutenak. u = (3, −2) bektorea 3i − 2j da', 'La base ortonormal i = (1, 0), j = (0, 1): perpendiculares y de módulo 1. El vector u = (3, −2) es 3i − 2j', 'الأساس المتعامد المتجانس i = (1, 0) وj = (0, 1): متعامدان وطول كل منهما 1. والمتجه u = (3, −2) هو 3i − 2j', 'The orthonormal basis i = (1, 0), j = (0, 1): perpendicular and of length 1. The vector u = (3, −2) is 3i − 2j'))}>
            <Frame box={box} cell={38} ox={24} oy={20}>
                {(map) => (
                    <g>
                        <Dashed map={map} from={[0, 0]} to={[3, 0]} color={SECOND} />
                        <Dashed map={map} from={[3, 0]} to={[3, -2]} color={GREEN} />
                        <Arrow map={map} from={[0, 0]} to={[3, -2]} color={STAGE} width={3.6} name="u" dx={-8} dy={22} />
                        <Arrow map={map} from={[0, 0]} to={[1, 0]} color={SECOND} width={4.4} name="i" dx={-4} dy={-12} />
                        <Arrow map={map} from={[0, 0]} to={[0, 1]} color={GREEN} width={4.4} name="j" dx={-22} dy={4} />
                        <RightMark map={map} corner={[0, 0]} a={[1, 0]} b={[0, 1]} />
                    </g>
                )}
            </Frame>
            <F x={300} y={62}>i · i = 1      j · j = 1</F>
            <F x={300} y={100}>i · j = 0</F>
            <F x={300} y={160} color={STAGE}>u · v = u₁v₁ + u₂v₂</F>
            <F x={300} y={212} size={19}>(3, −2) · (4, 5) = 12 − 10 = 2</F>
            <Caption y={272} x={480}>{t(say('Oinarri ortonormal batean bakarrik', 'Solo en una base ortonormal', 'في أساس متعامد ومتجانس فقط', 'Only in an orthonormal basis'))}</Caption>
        </Fig>
    )
}

/* ---------- 10. Unit vectors ---------- */

export function UnitVectorFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -2, xMax: 7, yMin: -9, yMax: 1 }
    return (
        <Fig height={330} label={t(say('v = (6, −8) bektoreak 10 neurtzen du. 10 zenbakiaz zatituta, norabide eta noranzko bereko bektore unitarioa ateratzen da; bider 5, (3, −4)', 'El vector v = (6, −8) mide 10. Al dividirlo entre 10 sale el unitario con su dirección y sentido; por 5, (3, −4)', 'المتجه v = (6, −8) طوله 10. وبقسمته على 10 نحصل على متجه الوحدة بالاتجاه والمنحى نفسيهما؛ وبالضرب في 5 نحصل على (3, −4)', 'The vector v = (6, −8) is 10 long. Dividing it by 10 gives the unit vector with its direction and sense; times 5, (3, −4)'))}>
            <Frame box={box} cell={29} ox={24} oy={20}>
                {(map) => (
                    <g>
                        <circle cx={map.x(0)} cy={map.y(0)} r={map.cell} fill="none" stroke={GREEN} strokeWidth={1.8} strokeDasharray="4 4" />
                        <circle cx={map.x(0)} cy={map.y(0)} r={5 * map.cell} fill="none" stroke={SECOND} strokeWidth={1.4} strokeDasharray="4 5" />
                        <Arrow map={map} from={[0, 0]} to={[6, -8]} color={STAGE} width={3} name="v" dx={10} dy={0} />
                        <Arrow map={map} from={[0, 0]} to={[3, -4]} color={SECOND} width={4} />
                        <Arrow map={map} from={[0, 0]} to={[0.6, -0.8]} color={GREEN} width={4.4} />
                    </g>
                )}
            </Frame>
            <F x={330} y={64}>|v| = √(36 + 64) = 10</F>
            <F x={330} y={122} color={GREEN}>v / 10 = (3/5, −4/5)</F>
            <F x={330} y={176} color={SECOND}>5 · (3/5, −4/5) = (3, −4)</F>
            <Label x={330} y={232} fontSize={17} fill={GREEN}>{t(say('Berdea: modulua 1', 'Verde: módulo 1', 'الأخضر: الطول 1', 'Green: length 1'))}</Label>
            <Label x={330} y={258} fontSize={17} fill={SECOND}>{t(say('Gorria: modulua 5', 'Rojo: módulo 5', 'الأحمر: الطول 5', 'Red: length 5'))}</Label>
            <Caption y={318} x={500}>{t(say('Zatitu modulua: norabidea ez da aldatzen', 'Divide entre el módulo: la dirección no cambia', 'اقسم على الطول: الاتجاه لا يتغير', 'Divide by the length: the direction does not change'))}</Caption>
        </Fig>
    )
}

/* ---------- 11. The angle of two vectors ---------- */

export function AngleFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -2, xMax: 4, yMin: -5, yMax: 4 }
    const map = planeMap(box, 30, 24, 20)
    const origin: Point = [map.x(0), map.y(0)]
    const angleOf = ([x, y]: Point) => (Math.atan2(y, x) * 180) / Math.PI
    return (
        <Fig height={320} label={t(say('u = (1, 3) eta v = (2, −4) bektoreek 135°-ko angelua osatzen dute: kosinua negatiboa da', 'u = (1, 3) y v = (2, −4) forman 135°: el coseno es negativo', 'المتجهان u = (1, 3) وv = (2, −4) يصنعان زاوية 135°: جيب التمام سالب', 'u = (1, 3) and v = (2, −4) make 135°: the cosine is negative'))}>
            <Frame box={box} cell={30} ox={24} oy={20}>
                {(plane) => (
                    <g>
                        <Arc c={origin} r={34} a1={angleOf([2, -4])} a2={angleOf([1, 3])} color={SECOND} />
                        <Arrow map={plane} from={[0, 0]} to={[1, 3]} color={STAGE} width={3.8} name="u" dx={8} dy={-8} />
                        <Arrow map={plane} from={[0, 0]} to={[2, -4]} color={GREEN} width={3.8} name="v" dx={10} dy={8} />
                        <F x={origin[0] + 44} y={origin[1] - 18} size={18} color={SECOND}>135°</F>
                    </g>
                )}
            </Frame>
            <F x={290} y={62}>u · v = 2 − 12 = −10</F>
            <F x={290} y={104}>|u| = √10,   |v| = √20</F>
            <F x={290} y={160}>cos α = −10 / (√10 · √20)</F>
            <F x={290} y={200} color={SECOND}>= −√2 / 2  →  α = 135°</F>
            <Caption y={262} x={500}>{t(say('Kosinu negatiboa: angelu kamutsa', 'Coseno negativo: ángulo obtuso', 'جيب تمام سالب: زاوية منفرجة', 'Negative cosine: obtuse angle'))}</Caption>
        </Fig>
    )
}

/* ---------- 12. Perpendicular vectors ---------- */

export function PerpendicularFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -4, xMax: 5, yMin: -7, yMax: 3 }
    return (
        <Fig height={320} label={t(say('v = (4, −6) bektorearen perpendikularrak: (3, 2) eta (−3, −2); biderkadura eskalarra 0 da', 'Perpendiculares a v = (4, −6): (3, 2) y (−3, −2); el producto escalar es 0', 'العموديان على v = (4, −6): ‏(3, 2) و(−3, −2)؛ والجداء السلمي 0', 'Perpendiculars to v = (4, −6): (3, 2) and (−3, −2); the dot product is 0'))}>
            <Frame box={box} cell={28} ox={24} oy={20}>
                {(map) => (
                    <g>
                        <Arrow map={map} from={[0, 0]} to={[4, -6]} color={STAGE} width={3.8} name="v" dx={10} dy={0} />
                        <Arrow map={map} from={[0, 0]} to={[3, 2]} color={SECOND} width={3.8} name="(3, 2)" dx={10} dy={-6} />
                        <Arrow map={map} from={[0, 0]} to={[-3, -2]} color={GREEN} width={3.2} name="(−3, −2)" dx={-86} dy={18} />
                        <RightMark map={map} corner={[0, 0]} a={[4, -6]} b={[3, 2]} size={14} />
                    </g>
                )}
            </Frame>
            <F x={310} y={70}>(3, k) · (4, −6) = 12 − 6k = 0</F>
            <F x={310} y={110} color={STAGE}>k = 2</F>
            <F x={310} y={170}>(3, 2) · (4, −6) = 12 − 12 = 0</F>
            <F x={310} y={226} color={MUTED} size={19}>(a, b) ⟂ (−b, a)</F>
            <Caption y={304} x={500}>{t(say('Perpendikularrak: biderkadura eskalarra 0', 'Perpendiculares: producto escalar 0', 'متعامدان: الجداء السلمي 0', 'Perpendicular: dot product 0'))}</Caption>
        </Fig>
    )
}

/* ---------- 13. The projection as a shadow ---------- */

export function ProjectionFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -1, xMax: 8, yMin: -1, yMax: 6 }
    return (
        <Fig height={300} label={t(say('u = (7, 1) bektorearen proiekzioa v = (3, 4) bektorearen gainean: u-ren muturretik perpendikular bat jaitsita, itzala (3, 4) da eta 5 neurtzen du', 'La proyección de u = (7, 1) sobre v = (3, 4): bajando una perpendicular desde el extremo de u, la sombra es (3, 4) y mide 5', 'إسقاط u = (7, 1) على v = (3, 4): بإنزال عمود من طرف u يكون الظل (3, 4) وطوله 5', 'The projection of u = (7, 1) onto v = (3, 4): dropping a perpendicular from the tip of u, the shadow is (3, 4) and it is 5 long'))}>
            <Frame box={box} cell={32} ox={24} oy={20}>
                {(map, clip) => (
                    <g>
                        <g clipPath={clip}><Dashed map={map} from={[-1.5, -2]} to={[4.5, 6]} color={MUTED} width={1.6} /></g>
                        <Dashed map={map} from={[7, 1]} to={[3, 4]} color={SECOND} />
                        <RightMark map={map} corner={[3, 4]} a={[0, 0]} b={[7, 1]} />
                        <line x1={map.x(0)} y1={map.y(0)} x2={map.x(3)} y2={map.y(4)} stroke={GREEN} strokeWidth={9} strokeLinecap="round" opacity={0.45} />
                        <Arrow map={map} from={[0, 0]} to={[7, 1]} color={STAGE} width={3.8} name="u" dx={0} dy={24} />
                        <Arrow map={map} from={[0, 0]} to={[1.8, 2.4]} color={SECOND} width={3.8} name="v" dx={8} dy={10} />
                    </g>
                )}
            </Frame>
            <F x={340} y={64}>u · v = 21 + 4 = 25</F>
            <F x={340} y={104}>|v| = 5</F>
            <F x={340} y={160} color={GREEN}>u · v / |v| = 25 / 5 = 5</F>
            <Label x={340} y={214} fontSize={17} fill={GREEN}>{t(say('Berdea: u-ren itzala v-ren zuzenean', 'Verde: la sombra de u sobre la recta de v', 'الأخضر: ظل u على مستقيم v', 'Green: the shadow of u on the line of v'))}</Label>
            <Caption y={288} x={500}>{t(say('Argia zuzenarekiko perpendikularra da', 'La luz es perpendicular a la recta', 'الضوء عمودي على المستقيم', 'The light is perpendicular to the line'))}</Caption>
        </Fig>
    )
}

/* ---------- 14. Splitting a vector ---------- */

export function DecompositionFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -1, xMax: 6, yMin: -1, yMax: 8 }
    return (
        <Fig height={340} label={t(say('w = (1, 7) bi zatitan: v = (1, 1) bektorearen paraleloa, (4, 4), eta perpendikularra, (−3, 3)', 'w = (1, 7) en dos partes: la paralela a v = (1, 1), (4, 4), y la perpendicular, (−3, 3)', 'المتجه w = (1, 7) بجزأين: الموازي لـ v = (1, 1) وهو (4, 4)، والعمودي وهو (−3, 3)', 'w = (1, 7) in two parts: the one parallel to v = (1, 1), (4, 4), and the perpendicular one, (−3, 3)'))}>
            <Frame box={box} cell={32} ox={24} oy={20}>
                {(map, clip) => (
                    <g>
                        <g clipPath={clip}><Dashed map={map} from={[-1, -1]} to={[6, 6]} color={MUTED} width={1.6} /></g>
                        <RightMark map={map} corner={[4, 4]} a={[0, 0]} b={[1, 7]} />
                        <Arrow map={map} from={[0, 0]} to={[4, 4]} color={GREEN} width={3.8} name="w∥" dx={10} dy={14} />
                        <Arrow map={map} from={[4, 4]} to={[1, 7]} color={SECOND} width={3.8} name="w⟂" dx={8} dy={-6} />
                        <Arrow map={map} from={[0, 0]} to={[1, 7]} color={STAGE} width={3.8} name="w" dx={-28} dy={0} />
                        <Arrow map={map} from={[0, 0]} to={[1, 1]} color={INK} width={3} name="v" dx={6} dy={18} />
                    </g>
                )}
            </Frame>
            <F x={300} y={70}>w · v = 1 + 7 = 8,   |v|² = 2</F>
            <F x={300} y={124} color={GREEN}>w∥ = (8/2) · (1, 1) = (4, 4)</F>
            <F x={300} y={178} color={SECOND}>w⟂ = (1, 7) − (4, 4) = (−3, 3)</F>
            <F x={300} y={232} size={19}>(−3, 3) · (1, 1) = 0</F>
            <Caption y={326} x={480}>{t(say('Paraleloa gehi perpendikularra', 'Paralela más perpendicular', 'موازٍ زائد عمودي', 'Parallel plus perpendicular'))}</Caption>
        </Fig>
    )
}

/* ---------- 15. A boat crossing a river ---------- */

export function RiverFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const scale = 46
    const start: Point = [110, 270]
    const up: Point = [start[0], start[1] - 4 * scale]
    const side: Point = [start[0] + 3 * scale, start[1]]
    const real: Point = [start[0] + 3 * scale, start[1] - 4 * scale]
    return (
        <Fig height={330} label={t(say('Txalupa batek ibaia zeharkatzen du 4 m/s-ko abiaduran ertzarekiko perpendikularki, eta korronteak 3 m/s-ko abiaduran eramaten du: benetako abiadura (3, 4) da, 5 m/s', 'Una barca cruza el río a 4 m/s perpendicular a la orilla y la corriente la arrastra a 3 m/s: la velocidad real es (3, 4), 5 m/s', 'قارب يعبر النهر بسرعة 4 m/s عموديًا على الضفة، والتيار يجرّه بسرعة 3 m/s: السرعة الحقيقية (3, 4) أي 5 m/s', 'A boat crosses the river at 4 m/s perpendicular to the bank and the current drags it at 3 m/s: the real velocity is (3, 4), 5 m/s'))}>
            <rect x={20} y={start[1] - 4 * scale - 20} width={380} height={4 * scale + 40} fill={RIVER} />
            <line x1={20} y1={start[1] + 20} x2={400} y2={start[1] + 20} stroke={INK} strokeWidth={2.4} />
            <line x1={20} y1={start[1] - 4 * scale - 20} x2={400} y2={start[1] - 4 * scale - 20} stroke={INK} strokeWidth={2.4} />
            {[60, 180, 300].map((x) => <PixelArrow key={x} from={[x, start[1] - 2 * scale + 70]} to={[x + 50, start[1] - 2 * scale + 70]} color="#8fb3d9" width={2} />)}
            <line x1={up[0]} y1={up[1]} x2={real[0]} y2={real[1]} stroke={MUTED} strokeWidth={2} strokeDasharray="6 5" />
            <line x1={side[0]} y1={side[1]} x2={real[0]} y2={real[1]} stroke={MUTED} strokeWidth={2} strokeDasharray="6 5" />
            <PixelArrow from={start} to={up} color={GREEN} />
            <PixelArrow from={start} to={side} color={SECOND} />
            <PixelArrow from={start} to={real} color={STAGE} width={4} />
            <Arc c={start} r={40} a1={53.13} a2={90} color={INK} />
            <F x={start[0] + 8} y={start[1] - 52} size={17}>α</F>
            <F x={start[0] - 12} y={start[1] - 2 * scale} size={19} color={GREEN} anchor="end">4</F>
            <F x={start[0] + 1.5 * scale} y={start[1] + 18} size={19} color={SECOND} anchor="middle">3</F>
            <F x={real[0] + 8} y={real[1] + 6} size={19} color={STAGE}>5</F>
            <F x={430} y={70}>v = (0, 4) + (3, 0)</F>
            <F x={430} y={108} color={STAGE}>= (3, 4)</F>
            <F x={430} y={162}>|v| = √(3² + 4²) = 5</F>
            <F x={430} y={216}>cos α = 4 / 5</F>
            <F x={430} y={254}>α ≈ 36,87°</F>
            <Caption y={320} x={210}>{t(say('Abiadurak bektore gisa batzen dira', 'Las velocidades se suman como vectores', 'تُجمع السرعات كمتجهات', 'Velocities add as vectors'))}</Caption>
        </Fig>
    )
}

/* ---------- Hero art: a skew grid, a shadow and the dot product ---------- */

export function BachVectorsHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(20 24) rotate(-4)">
                    <rect width={250} height={210} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    {[-2, -1, 0, 1, 2, 3].map((k) => <line key={`a${k}`} x1={40 + k * 40} y1={196} x2={140 + k * 40} y2={14} stroke={LATTICE} strokeWidth={1.4} />)}
                    {[0, 1, 2, 3, 4].map((k) => <line key={`b${k}`} x1={14} y1={60 + k * 36} x2={236} y2={30 + k * 36} stroke={LATTICE} strokeWidth={1.4} />)}
                    <line x1={50} y1={170} x2={150} y2={150} stroke="#c4432a" strokeWidth={4} strokeLinecap="round" />
                    <polygon points="164,147 146,140 150,158" fill="#c4432a" />
                    <line x1={50} y1={170} x2={100} y2={80} stroke="#267b53" strokeWidth={4} strokeLinecap="round" />
                    <polygon points="107,66 92,78 106,86" fill="#267b53" />
                </g>
                <g transform="translate(296 40) rotate(5)">
                    <rect width={200} height={190} rx={16} fill={MUSTARD_TINT} stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={160} x2={180} y2={160} stroke="#2f6fdb" strokeWidth={4} />
                    <line x1={20} y1={160} x2={130} y2={50} stroke="#c4432a" strokeWidth={4} />
                    <line x1={130} y1={50} x2={130} y2={160} stroke={INK} strokeWidth={2} strokeDasharray="6 5" />
                    <line x1={20} y1={160} x2={130} y2={160} stroke="#267b53" strokeWidth={10} opacity={0.45} />
                </g>
                <g transform="translate(40 276) rotate(2)">
                    <rect width={440} height={86} rx={16} fill={GREEN_TINT} stroke={INK} strokeWidth={2} />
                    <text x={220} y={56} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK} fontFamily={SERIF}>u · v = |u| |v| cos α</text>
                </g>
            </svg>
        </div>
    )
}
