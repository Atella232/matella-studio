import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { camera } from '../dbh2-gorputzak-v2/geometry3d'
import { GridBox } from '../dbh2-gorputzak-v2/solids'

/* ==========================================================================
   Antzekotasuna · 4. DBH aplikatuak — lesson figures: Thales with two lines
   cut by parallels, dividing a segment into equal parts, triangles in
   Thales position, two similar quadrilaterals, the three criteria, a
   homothety, perimeters and areas of squares of side 1, 2 and 3, cubes of
   edge 1, 2 and 3, a map with its scale, a room plan, and three ways of
   measuring heights (shadows, a mirror and a line of sight). Arabic
   captions carry words only; numbers use the point there.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const PAPER = '#fffcf6'
const SOFT = '#fbebc0'
const ROSE = '#f6d9d2'
const MINT = '#d6eddf'
const SKY = '#dde7f7'
const SERIF = 'Fraunces, serif'

type Point = [number, number]

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)
/** A number written with the comma, shown with the point in Arabic */
const num = (language: UnitLanguage, text: string) => (language === 'ar' ? text.replace(/,/g, '.') : text)
const points = (list: Point[]) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
const lerp = ([ax, ay]: Point, [bx, by]: Point, t: number): Point => [ax + (bx - ax) * t, ay + (by - ay) * t]
const mid = (a: Point, b: Point) => lerp(a, b, 0.5)
/** Push a point away from a segment's middle, along its normal, by d */
const off = (a: Point, b: Point, d: number): Point => {
    const [mx, my] = mid(a, b)
    const length = Math.hypot(b[0] - a[0], b[1] - a[1])
    return [mx - ((b[1] - a[1]) / length) * d, my + ((b[0] - a[0]) / length) * d]
}

function Caption({ x = 360, y, language, text, color = MUTED, size = 15 }: { x?: number; y: number; language: UnitLanguage; text: LocalizedText; color?: string; size?: number }) {
    return <Label x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={color}>{pick(language, text)}</Label>
}

function Tag({ p, children, color = INK, size = 15, anchor = 'middle' }: { p: Point; children: string; color?: string; size?: number; anchor?: 'start' | 'middle' | 'end' }) {
    return <text x={p[0]} y={p[1] + size / 3} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color} direction="ltr">{children}</text>
}

function Formula({ x, y, children, color = INK, size = 16 }: { x: number; y: number; children: string; color?: string; size?: number }) {
    return <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={color} direction="ltr">{children}</text>
}

function Line({ a, b, color = INK, width = 2, dashed = false }: { a: Point; b: Point; color?: string; width?: number; dashed?: boolean }) {
    return <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={color} strokeWidth={width} strokeDasharray={dashed ? '7 5' : undefined} strokeLinecap="round" />
}

const Dot = ({ p, color = INK, r = 4 }: { p: Point; color?: string; r?: number }) => <circle cx={p[0]} cy={p[1]} r={r} fill={color} />

/* ---------- 1. Thales ---------- */

export function ThalesFigure({ language }: { language: UnitLanguage }) {
    const O: Point = [60, 250]
    const u: Point = [1, -0.38]
    const v: Point = [1.1, 0]
    const at = (dir: Point, t: number): Point => [O[0] + dir[0] * t, O[1] + dir[1] * t]
    const [A, B, A2, B2] = [at(u, 200), at(u, 500), at(v, 200), at(v, 500)]
    const extend = (p: Point, q: Point): [Point, Point] => [lerp(p, q, -0.25), lerp(p, q, 1.25)]
    return (
        <Figure height={310} label={pick(language, say('Paraleloek bi zuzen mozten dituzte: zuzenki-zatiak proportzionalak dira', 'Unas paralelas cortan dos rectas: los segmentos son proporcionales', 'مستقيمات متوازية تقطع مستقيمين: القطع متناسبة'))}>
            <Line a={O} b={at(u, 560)} width={2.4} />
            <Line a={O} b={at(v, 570)} width={2.4} />
            {[[A, A2], [B, B2]].map(([p, q], index) => {
                const [p1, q1] = extend(p, q)
                return <Line key={index} a={p1} b={q1} color={STAGE} width={2.2} dashed />
            })}
            {[O, A, B, A2, B2].map((p, index) => <Dot key={index} p={p} />)}
            <Tag p={off(O, A, -16)} color={SECOND}>3</Tag>
            <Tag p={off(A, B, -16)} color={SECOND}>{num(language, '4,5')}</Tag>
            <Tag p={off(O, A2, 18)} color={GREEN}>4</Tag>
            <Tag p={off(A2, B2, 18)} color={GREEN}>x</Tag>
            <Formula x={220} y={50} color={STAGE}>{num(language, '3 / 4,5 = 4 / x')}</Formula>
            <Formula x={220} y={82}>{num(language, 'x = 4 · 4,5 / 3 = 6')}</Formula>
        </Figure>
    )
}

/* ---------- 2. Dividing a segment ---------- */

export function DivideFigure({ language }: { language: UnitLanguage }) {
    const A: Point = [80, 230]
    const B: Point = [560, 230]
    const step = 82
    const angle = Math.atan2(-0.42, 1)
    const marks: Point[] = [1, 2, 3, 4, 5].map((k) => [A[0] + k * step * Math.cos(angle), A[1] + k * step * Math.sin(angle)])
    const cuts: Point[] = [1, 2, 3, 4, 5].map((k) => lerp(A, B, k / 5))
    return (
        <Figure height={300} label={pick(language, say('10 cm-ko zuzenkia 5 zati berdinetan, Talesekin', 'Un segmento de 10 cm en 5 partes iguales, con Tales', 'قطعة طولها 10 سم إلى 5 أجزاء متساوية بطاليس'))}>
            <Line a={A} b={lerp(A, marks[4], 1.08)} color={MUTED} width={1.8} />
            <Line a={A} b={B} width={3} />
            {marks.map((mark, index) => <g key={index}><Dot p={mark} color={SECOND} r={4.5} /><Line a={mark} b={cuts[index]} color={index === 4 ? SECOND : STAGE} width={2} dashed={index !== 4} /></g>)}
            {cuts.map((cut, index) => <line key={index} x1={cut[0]} y1={cut[1] - 8} x2={cut[0]} y2={cut[1] + 8} stroke={INK} strokeWidth={2.4} />)}
            <line x1={A[0]} y1={A[1] - 8} x2={A[0]} y2={A[1] + 8} stroke={INK} strokeWidth={2.4} />
            <Tag p={[A[0] - 14, A[1]]} anchor="end">A</Tag>
            <Tag p={[B[0] + 14, B[1]]} anchor="start">B</Tag>
            <Tag p={[320, 262]}>10 cm</Tag>
            <Tag p={off(A, marks[0], -14)} color={SECOND} size={13}>1</Tag>
            <Formula x={600} y={120} color={STAGE}>10 : 5 = 2</Formula>
            <Caption x={360} y={292} language={language} text={say('Lotu azken marka B-rekin eta marraztu paraleloak', 'Une la última marca con B y traza paralelas', 'صِل العلامة الأخيرة بـ B وارسم متوازيات')} size={14} />
        </Figure>
    )
}

/* ---------- 3. Thales position ---------- */

export function ThalesPositionFigure({ language }: { language: UnitLanguage }) {
    const A: Point = [80, 250]
    const B: Point = [460, 250]
    const C: Point = [220, 40]
    const B2 = lerp(A, B, 0.5)
    const C2 = lerp(A, C, 0.5)
    return (
        <Figure height={300} label={pick(language, say('Tales posizioan dauden bi triangelu: angelu bat partekatzen dute eta aurkako aldeak paraleloak dira', 'Dos triángulos en posición de Tales: comparten un ángulo y los lados opuestos son paralelos', 'مثلثان في وضع طاليس: يشتركان في زاوية والضلعان المقابلان متوازيان'))}>
            <polygon points={points([A, B, C])} fill={SKY} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
            <polygon points={points([A, B2, C2])} fill={SOFT} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
            <Line a={B2} b={C2} color={SECOND} width={3} />
            <Line a={B} b={C} color={SECOND} width={3} />
            <Tag p={[A[0] - 14, A[1]]} anchor="end">A</Tag>
            <Tag p={[B2[0], B2[1] + 20]}>{"B'"}</Tag>
            <Tag p={[B[0] + 12, B[1] + 8]} anchor="start">B</Tag>
            <Tag p={[C2[0] - 14, C2[1]]} anchor="end">{"C'"}</Tag>
            <Tag p={[C[0], C[1] - 14]}>C</Tag>
            <Tag p={[mid(A, B2)[0], A[1] + 20]} color={STAGE}>6</Tag>
            <Tag p={[mid(B2, B)[0], mid(B2, B)[1] + 20]} color={STAGE}>6</Tag>
            <Tag p={off(B2, C2, -16)} color={SECOND}>5</Tag>
            <Tag p={off(B, C, -18)} color={SECOND}>x</Tag>
            <Formula x={600} y={130} color={STAGE}>12 / 6 = x / 5</Formula>
            <Formula x={600} y={162}>x = 10</Formula>
        </Figure>
    )
}

/* ---------- 4. Similar figures ---------- */

export function SimilarFiguresFigure({ language }: { language: UnitLanguage }) {
    const shape: Point[] = [[0, 0], [4, 0], [3, 2], [0, 2]]
    const place = (k: number, x: number, y: number) => shape.map(([px, py]): Point => [x + px * k, y - py * k])
    const small = place(36, 60, 220)
    const large = place(54, 330, 250)
    return (
        <Figure height={310} label={pick(language, say('Bi lauki antzeko: aldeak proportzionalak (r = 1,5) eta angeluak berdinak', 'Dos cuadriláteros semejantes: lados proporcionales (r = 1,5) y ángulos iguales', 'رباعيان متشابهان: أضلاع متناسبة (r = 1.5) وزوايا متساوية'))}>
            <polygon points={points(small)} fill={SOFT} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
            <polygon points={points(large)} fill={MINT} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
            <Tag p={[mid(small[0], small[1])[0], small[0][1] + 18]}>4</Tag>
            <Tag p={[small[0][0] - 14, mid(small[0], small[3])[1]]} anchor="end">2</Tag>
            <Tag p={[mid(large[0], large[1])[0], large[0][1] + 18]}>6</Tag>
            <Tag p={[large[0][0] - 14, mid(large[0], large[3])[1]]} anchor="end">3</Tag>
            <path d={`M${small[1][0] - 16} ${small[1][1]} A16 16 0 0 0 ${lerp(small[1], small[2], 16 / Math.hypot(36, 72))[0]} ${lerp(small[1], small[2], 16 / Math.hypot(36, 72))[1]}`} fill="none" stroke={SECOND} strokeWidth={2.4} />
            <path d={`M${large[1][0] - 16} ${large[1][1]} A16 16 0 0 0 ${lerp(large[1], large[2], 16 / Math.hypot(54, 108))[0]} ${lerp(large[1], large[2], 16 / Math.hypot(54, 108))[1]}`} fill="none" stroke={SECOND} strokeWidth={2.4} />
            <Formula x={610} y={110} color={STAGE}>{num(language, '6 / 4 = 3 / 2 = 1,5')}</Formula>
            <Caption x={610} y={142} language={language} text={say('Antzekotasun-arrazoia', 'Razón de semejanza', 'نسبة التشابه')} size={14} />
            <Caption x={360} y={296} language={language} text={say('Angelu berdinak, alde proportzionalak', 'Ángulos iguales, lados proporcionales', 'زوايا متساوية وأضلاع متناسبة')} size={14} />
        </Figure>
    )
}

/* ---------- 5. Similarity criteria ---------- */

function MiniTriangle({ x, y, k, labels, arcs = [] }: { x: number; y: number; k: number; labels?: [string, string, string]; arcs?: number[] }) {
    const P: Point[] = [[x, y], [x + 4 * k, y], [x + 4 * k, y - 3 * k]]
    return (
        <g>
            <polygon points={points(P)} fill={SKY} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
            {arcs.includes(0) && <path d={`M${x + 18} ${y} A18 18 0 0 0 ${x + 18 * 0.8} ${y - 18 * 0.6}`} fill="none" stroke={SECOND} strokeWidth={2.2} />}
            {arcs.includes(1) && <polyline points={points([[P[1][0] - 10, y], [P[1][0] - 10, y - 10], [P[1][0], y - 10]])} fill="none" stroke={SECOND} strokeWidth={2} />}
            {labels && (
                <g>
                    <Tag p={[x + 2 * k, y + 14]} size={13}>{labels[0]}</Tag>
                    <Tag p={[P[1][0] + 10, y - 1.5 * k]} size={13} anchor="start">{labels[1]}</Tag>
                    <Tag p={[x + 2 * k - 10, y - 1.5 * k - 10]} size={13} anchor="end">{labels[2]}</Tag>
                </g>
            )}
        </g>
    )
}

export function CriteriaFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={300} label={pick(language, say('Triangeluen antzekotasun-irizpideak: bi angelu; bi alde eta angelua; hiru alde', 'Criterios de semejanza de triángulos: dos ángulos; dos lados y el ángulo; tres lados', 'معايير تشابه المثلثات: زاويتان؛ ضلعان والزاوية؛ ثلاثة أضلاع'))}>
            <MiniTriangle x={20} y={130} k={14} arcs={[0, 1]} />
            <MiniTriangle x={100} y={210} k={22} arcs={[0, 1]} />
            <Caption x={120} y={262} language={language} text={say('Bi angelu berdin', 'Dos ángulos iguales', 'زاويتان متساويتان')} size={14} />

            <MiniTriangle x={260} y={130} k={14} arcs={[1]} labels={['4', '3', '']} />
            <MiniTriangle x={340} y={210} k={22} arcs={[1]} labels={['8', '6', '']} />
            <Caption x={360} y={262} language={language} text={say('Bi alde proportzional eta angelua', 'Dos lados proporcionales y el ángulo', 'ضلعان متناسبان والزاوية')} size={14} />

            <MiniTriangle x={500} y={130} k={14} labels={['4', '3', '5']} />
            <MiniTriangle x={580} y={210} k={22} labels={['8', '6', '10']} />
            <Caption x={600} y={262} language={language} text={say('Hiru alde proportzional', 'Tres lados proporcionales', 'ثلاثة أضلاع متناسبة')} size={14} />
        </Figure>
    )
}

/* ---------- 6. Homothety ---------- */

export function HomothetyFigure({ language }: { language: UnitLanguage }) {
    const O: Point = [60, 250]
    const tri: Point[] = [[170, 215], [260, 230], [205, 150]]
    const image = tri.map((p) => lerp(O, p, 2))
    return (
        <Figure height={300} label={pick(language, say('O zentroko eta 2 arrazoiko homotezia', 'Homotecia de centro O y razón 2', 'تحاكٍ مركزه O ونسبته 2'))}>
            {image.map((p, index) => <Line key={index} a={O} b={lerp(O, p, 1.08)} color={MUTED} width={1.4} dashed />)}
            <polygon points={points(tri)} fill={SOFT} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
            <polygon points={points(image)} fill={MINT} fillOpacity={0.8} stroke={INK} strokeWidth={2.2} strokeLinejoin="round" />
            <Dot p={O} color={SECOND} r={5} />
            <Tag p={[O[0] - 12, O[1] + 4]} anchor="end" color={SECOND}>O</Tag>
            {tri.map((p, index) => <Tag key={index} p={[p[0] + 4, p[1] - 14]} size={14}>{['A', 'B', 'C'][index]}</Tag>)}
            {image.map((p, index) => <Tag key={index} p={[p[0] + 6, p[1] - 14]} size={14}>{["A'", "B'", "C'"][index]}</Tag>)}
            <Formula x={590} y={110} color={STAGE}>{"OA' = 2 · OA"}</Formula>
            <Caption x={590} y={142} language={language} text={say('Irudia bi aldiz handiagoa', 'La imagen, el doble de grande', 'الصورة ضعف الحجم')} size={14} />
        </Figure>
    )
}

/* ---------- 7. Perimeters and areas ---------- */

export function RatiosFigure({ language }: { language: UnitLanguage }) {
    const unit = 40
    const xs = [70, 210, 410]
    return (
        <Figure height={300} label={pick(language, say('1, 2 eta 3 aldeko karratuak: perimetroa r bider, azalera r² bider', 'Cuadrados de lado 1, 2 y 3: el perímetro por r, el área por r²', 'مربعات أضلاعها 1 و2 و3: المحيط في r والمساحة في r²'))}>
            {[1, 2, 3].map((side, index) => (
                <g key={side}>
                    {Array.from({ length: side * side }, (_, cell) => (
                        <rect key={cell} x={xs[index] + (cell % side) * unit} y={190 - side * unit + Math.floor(cell / side) * unit} width={unit} height={unit} fill={cell % 2 ? SKY : PAPER} stroke={MUTED} strokeWidth={1} />
                    ))}
                    <rect x={xs[index]} y={190 - side * unit} width={side * unit} height={side * unit} fill="none" stroke={SECOND} strokeWidth={3} />
                    <Formula x={xs[index] + (side * unit) / 2} y={222} color={SECOND}>{`P = ${4 * side}`}</Formula>
                    <Formula x={xs[index] + (side * unit) / 2} y={250} color={STAGE}>{`A = ${side * side}`}</Formula>
                    <Formula x={xs[index] + (side * unit) / 2} y={278} size={14} color={MUTED}>{`r = ${side}`}</Formula>
                </g>
            ))}
            <Caption x={620} y={120} language={language} text={say('Luzerak: × r', 'Longitudes: × r', 'الأطوال: × r')} color={SECOND} />
            <Caption x={620} y={150} language={language} text={say('Azalerak: × r²', 'Áreas: × r²', 'المساحات: × r²')} color={STAGE} />
        </Figure>
    )
}

/* ---------- 8. Volumes ---------- */

export function VolumeRatioFigure({ language }: { language: UnitLanguage }) {
    const cams = [camera(90, 210, 30), camera(270, 220, 30), camera(500, 230, 30)]
    return (
        <Figure height={310} label={pick(language, say('1, 2 eta 3 ertzeko kuboak: bolumena r³ bider (1, 8, 27)', 'Cubos de arista 1, 2 y 3: el volumen por r³ (1, 8, 27)', 'مكعبات أحرفها 1 و2 و3: الحجم في r³ (1 و8 و27)'))}>
            {[1, 2, 3].map((edge, index) => (
                <g key={edge}>
                    <GridBox cam={cams[index]} a={edge} b={edge} c={edge} fill={[SOFT, MINT, ROSE][index]} />
                    <Formula x={[90, 270, 500][index]} y={268} color={STAGE}>{`V = ${edge ** 3}`}</Formula>
                    <Formula x={[90, 270, 500][index]} y={294} size={14} color={MUTED}>{`r = ${edge}`}</Formula>
                </g>
            ))}
            <Caption x={650} y={110} language={language} text={say('Bolumenak:', 'Volúmenes:', 'الحجوم:')} color={STAGE} size={14} />
            <Formula x={650} y={138} color={STAGE}>× r³</Formula>
        </Figure>
    )
}

/* ---------- 9. Scale of a map ---------- */

export function ScaleFigure({ language }: { language: UnitLanguage }) {
    const P: Point = [140, 190]
    const Q: Point = [380, 110]
    return (
        <Figure height={300} label={pick(language, say('1:50 000 eskalako mapa: 4 cm mapan 2 km dira errealitatean', 'Mapa a escala 1:50 000: 4 cm en el mapa son 2 km en la realidad', 'خريطة بمقياس 1:50 000: 4 سم في الخريطة هي 2 كم في الواقع'))}>
            <rect x={60} y={40} width={400} height={200} rx={10} fill={MINT} stroke={INK} strokeWidth={2} />
            <path d="M60 170 C 160 140, 220 220, 330 180 S 430 120, 460 140" fill="none" stroke={STAGE} strokeWidth={6} strokeOpacity={0.5} />
            <Line a={P} b={Q} color={SECOND} width={2.6} dashed />
            <Dot p={P} color={SECOND} r={6} />
            <Dot p={Q} color={SECOND} r={6} />
            <Tag p={off(P, Q, -18)} color={SECOND}>4 cm</Tag>
            <rect x={80} y={210} width={100} height={8} fill={INK} />
            <rect x={130} y={210} width={50} height={8} fill={PAPER} stroke={INK} strokeWidth={1} />
            <Tag p={[200, 214]} anchor="start" size={13}>1 : 50 000</Tag>
            <Formula x={590} y={120}>{'4 · 50 000 ='}</Formula>
            <Formula x={590} y={150}>{'200 000 cm'}</Formula>
            <Formula x={590} y={186} color={SECOND}>= 2 km</Formula>
            <Caption x={360} y={284} language={language} text={say('Errealitatea = mapa · n', 'Realidad = mapa · n', 'الواقع = الخريطة · n')} size={14} />
        </Figure>
    )
}

/* ---------- 10. A room plan ---------- */

export function PlanFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={300} label={pick(language, say('1:100 eskalako planoa: 5 cm × 4 cm = 5 m × 4 m; azalera 10 000 bider', 'Plano a escala 1:100: 5 cm × 4 cm = 5 m × 4 m; el área, 10 000 veces', 'مخطط بمقياس 1:100: 5 سم × 4 سم = 5 م × 4 م؛ والمساحة 10 000 مرة'))}>
            <rect x={70} y={50} width={250} height={200} fill={PAPER} stroke={INK} strokeWidth={5} />
            <line x1={190} y1={50} x2={190} y2={140} stroke={INK} strokeWidth={4} />
            <path d="M190 180 A40 40 0 0 1 230 140" fill="none" stroke={MUTED} strokeWidth={1.4} strokeDasharray="4 3" />
            <rect x={240} y={200} width={60} height={30} fill={SOFT} stroke={INK} strokeWidth={1.4} />
            <Tag p={[195, 34]}>5 cm</Tag>
            <Tag p={[56, 150]} anchor="end">4 cm</Tag>
            <Tag p={[195, 275]} size={13} color={MUTED}>1 : 100</Tag>
            <Formula x={530} y={100}>5 · 100 = 500 cm = 5 m</Formula>
            <Formula x={530} y={130}>4 · 100 = 400 cm = 4 m</Formula>
            <Formula x={530} y={180} color={STAGE}>20 cm² → 20 m²</Formula>
            <Caption x={530} y={212} language={language} text={say('Azalera: × 100² = × 10 000', 'Área: × 100² = × 10 000', 'المساحة: × 100² = × 10 000')} color={STAGE} size={14} />
        </Figure>
    )
}

/* ---------- 11. Shadows ---------- */

export function ShadowFigure({ language }: { language: UnitLanguage }) {
    const ground = 240
    const unit = 15
    return (
        <Figure height={300} label={pick(language, say('Itzalak: makila eta zuhaitza, eguzki-izpi paraleloekin', 'Sombras: un palo y un árbol con rayos de sol paralelos', 'الظلال: عصا وشجرة مع أشعة شمس متوازية'))}>
            <Line a={[30, ground]} b={[690, ground]} color={MUTED} width={2} />
            <Line a={[80, ground]} b={[80, ground - 1.5 * unit * 2]} color={INK} width={5} />
            <Line a={[80, ground]} b={[80 + 2 * unit * 2, ground]} color={MUTED} width={8} />
            <Line a={[80, ground - 3 * unit]} b={[80 + 4 * unit, ground]} color={SECOND} width={2.4} dashed />
            <Tag p={[68, ground - 22]} anchor="end">{num(language, '1,5')}</Tag>
            <Tag p={[110, ground + 20]}>2</Tag>

            <rect x={326} y={ground - 9 * unit} width={8} height={9 * unit} fill="#8a5a2b" />
            <circle cx={330} cy={ground - 9 * unit - 10} r={38} fill={MINT} stroke={GREEN} strokeWidth={2} />
            <Line a={[330, ground]} b={[330 + 12 * unit, ground]} color={MUTED} width={8} />
            <Line a={[330, ground - 9 * unit]} b={[330 + 12 * unit, ground]} color={SECOND} width={2.4} dashed />
            <Tag p={[312, ground - 70]} anchor="end" color={SECOND}>x</Tag>
            <Tag p={[420, ground + 20]}>12</Tag>
            <Formula x={600} y={80} color={STAGE}>{num(language, 'x / 12 = 1,5 / 2')}</Formula>
            <Formula x={600} y={112}>x = 9 m</Formula>
            <Caption x={360} y={290} language={language} text={say('Ordu berean, itzalak altueren proportzionalak dira', 'A la misma hora, las sombras son proporcionales a las alturas', 'في الساعة نفسها تتناسب الظلال مع الارتفاعات')} size={14} />
        </Figure>
    )
}

/* ---------- 12. A mirror on the ground ---------- */

export function MirrorFigure({ language }: { language: UnitLanguage }) {
    const ground = 240
    const unit = 30
    const M: Point = [60 + 2 * unit, ground]
    const eye: Point = [60, ground - 1.6 * unit]
    const top: Point = [M[0] + 15 * 0.5 * unit, ground - 12 * 0.5 * unit]
    return (
        <Figure height={300} label={pick(language, say('Ispilua lurrean: erasotze- eta islapen-angeluak berdinak dira, triangeluak antzekoak', 'Un espejo en el suelo: los ángulos de incidencia y reflexión son iguales y los triángulos, semejantes', 'مرآة على الأرض: زاويتا السقوط والانعكاس متساويتان والمثلثان متشابهان'))}>
            <Line a={[30, ground]} b={[690, ground]} color={MUTED} width={2} />
            <Line a={[60, ground]} b={eye} color={INK} width={5} />
            <circle cx={eye[0]} cy={eye[1] - 8} r={8} fill={PAPER} stroke={INK} strokeWidth={2} />
            <rect x={M[0] - 14} y={ground - 3} width={28} height={6} fill={STAGE} />
            <rect x={top[0] - 4} y={top[1]} width={60} height={ground - top[1]} fill={SKY} stroke={INK} strokeWidth={2} />
            <Line a={eye} b={M} color={SECOND} width={2.2} />
            <Line a={M} b={top} color={SECOND} width={2.2} />
            <Tag p={[48, ground - 24]} anchor="end">{num(language, '1,6')}</Tag>
            <Tag p={[90, ground + 20]}>2</Tag>
            <Tag p={[(M[0] + top[0]) / 2, ground + 20]}>15</Tag>
            <Tag p={[top[0] + 70, (top[1] + ground) / 2]} anchor="start" color={SECOND}>x</Tag>
            <Formula x={580} y={70} color={STAGE}>{num(language, 'x / 15 = 1,6 / 2')}</Formula>
            <Formula x={580} y={100}>x = 12 m</Formula>
        </Figure>
    )
}

/* ---------- 13. A line of sight over a post ---------- */

export function SightFigure({ language }: { language: UnitLanguage }) {
    const ground = 250
    const unit = 22
    const eye: Point = [60, ground - 1.5 * unit]
    const post: Point = [60 + 4 * unit, ground - 3 * unit]
    const top: Point = [60 + 20 * unit, ground - 9 * unit]
    return (
        <Figure height={300} label={pick(language, say('Ikus-lerroa zutoin baten puntatik eraikinaren goialderaino', 'La línea de visión pasa por la punta de un poste y llega a lo alto del edificio', 'خط النظر يمر برأس عمود ويصل إلى أعلى المبنى'))}>
            <Line a={[30, ground]} b={[690, ground]} color={MUTED} width={2} />
            <Line a={[60, ground]} b={eye} color={INK} width={5} />
            <circle cx={eye[0]} cy={eye[1] - 8} r={8} fill={PAPER} stroke={INK} strokeWidth={2} />
            <Line a={[post[0], ground]} b={post} color={INK} width={4} />
            <rect x={top[0] - 4} y={top[1]} width={64} height={ground - top[1]} fill={SKY} stroke={INK} strokeWidth={2} />
            <Line a={eye} b={top} color={SECOND} width={2.2} />
            <Line a={eye} b={[top[0], eye[1]]} color={STAGE} width={1.6} dashed />
            <Tag p={[48, ground - 18]} anchor="end">{num(language, '1,5')}</Tag>
            <Tag p={[post[0] + 12, post[1] + 20]} anchor="start">3</Tag>
            <Tag p={[(60 + post[0]) / 2, ground + 20]}>4</Tag>
            <Tag p={[(60 + top[0]) / 2, ground + 20]}>20</Tag>
            <Tag p={[top[0] + 72, (top[1] + ground) / 2]} anchor="start" color={SECOND}>x</Tag>
            <Formula x={250} y={50} color={STAGE}>{num(language, '(x − 1,5) / 20 = 1,5 / 4')}</Formula>
            <Formula x={250} y={80}>{num(language, 'x = 7,5 + 1,5 = 9 m')}</Formula>
        </Figure>
    )
}

/* ---------- Hero art: two similar triangles, a scale and a shadow ---------- */

export function SimilarityHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(30 30) rotate(-4)">
                    <rect width={260} height={190} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <polygon points="30,160 110,160 110,100" fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <polygon points="110,160 230,160 230,70" fill="#dde7f7" stroke={INK} strokeWidth={2} />
                    <line x1={30} y1={160} x2={240} y2={62} stroke="#c4432a" strokeWidth={2.4} strokeDasharray="7 5" />
                </g>
                <g transform="translate(320 60) rotate(5)">
                    <rect width={170} height={130} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <text x={85} y={78} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily={SERIF}>1 : 100</text>
                </g>
                <g transform="translate(50 260) rotate(2)">
                    <rect width={420} height={90} rx={16} fill="#f6d9d2" stroke={INK} strokeWidth={2} />
                    <text x={210} y={58} textAnchor="middle" fontSize={28} fontWeight={700} fill={INK} fontFamily={SERIF}>{"a' / a = b' / b = r"}</text>
                </g>
            </svg>
        </div>
    )
}
