import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Figure } from '../dbh2-zatikiak-prototype/figures'
import { Label } from '../dbh2-funtzioak-v2/plane'
import {
    boxVertices,
    camera,
    countElements,
    FRONT,
    frontMost,
    frustumVertices,
    GREEN,
    hullFaces,
    INK,
    MINT,
    MUTED,
    PAPER,
    platonic,
    points,
    prismVertices,
    pyramidVertices,
    RIGHT,
    ROSE,
    SECOND,
    SKY,
    SOFT,
    STAGE,
    STAGE_TINT,
    type Face,
    type Point,
    type V3
} from './geometry3d'
import { Circle3, Cone, Cylinder, GridBox, Segment3, Solid, Sphere } from './solids'

/* ==========================================================================
   Gorputz geometrikoak · 2. DBH — lesson figures in the notebook style:
   elements of polyhedra, Euler's formula, the five regular polyhedra, nets
   and areas of prisms, pyramids and frustums, cylinder, cone and sphere,
   units of volume and capacity, Cavalieri, and the volumes. Arabic captions
   carry words only; numbers and formulas go in their own left-to-right text.
   ========================================================================== */

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)
/** A number written with the comma, shown with the point in Arabic */
const num = (language: UnitLanguage, text: string) => (language === 'ar' ? text.replace(/,/g, '.') : text)
/** Letter of the base area: O (oinarria) in Basque, B elsewhere */
const baseLetter = (language: UnitLanguage) => (language === 'eu' ? 'O' : 'B')
const dot3 = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
/** The lateral face that looks most towards the viewer */
const frontFace = (faces: Face[]) =>
    faces.filter((face) => Math.abs(face.normal[1]) < 0.999).reduce((best, face) => (dot3(face.normal, FRONT) > dot3(best.normal, FRONT) ? face : best))

function Caption({ x = 360, y, language, text, color = MUTED, size = 15 }: { x?: number; y: number; language: UnitLanguage; text: LocalizedText; color?: string; size?: number }) {
    return <Label x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={color}>{pick(language, text)}</Label>
}

function Formula({ x, y, children, color = INK, size = 17, anchor = 'middle' }: { x: number; y: number; children: ReactNode; color?: string; size?: number; anchor?: 'start' | 'middle' | 'end' }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color}>{children}</text>
}

/** A with a small subscript: A_L, A_B, A_T */
function Area({ index }: { index: string }) {
    return (
        <>
            A<tspan fontSize="0.7em" dy="0.3em">{index}</tspan>
            <tspan dy="-0.3em"> </tspan>
        </>
    )
}

function Tag({ p, text, color = INK, dx = 0, dy = 0, size = 16, anchor = 'middle' }: { p: Point; text: string; color?: string; dx?: number; dy?: number; size?: number; anchor?: 'start' | 'middle' | 'end' }) {
    return <text x={p[0] + dx} y={p[1] + dy} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color}>{text}</text>
}

/** The little square of a right angle at v, between the directions to a and b */
function RightMark({ v, a, b, size = 11, color = INK }: { v: Point; a: Point; b: Point; size?: number; color?: string }) {
    const unit = (p: Point): Point => {
        const length = Math.hypot(p[0] - v[0], p[1] - v[1])
        return [(p[0] - v[0]) / length, (p[1] - v[1]) / length]
    }
    const [ux, uy] = unit(a)
    const [wx, wy] = unit(b)
    const p1: Point = [v[0] + size * ux, v[1] + size * uy]
    const p3: Point = [v[0] + size * wx, v[1] + size * wy]
    const p2: Point = [p1[0] + size * wx, p1[1] + size * wy]
    return <polyline points={points([p1, p2, p3])} fill="none" stroke={color} strokeWidth={1.6} />
}

const midpoint = (a: Point, b: Point): Point => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]

/* ---------- 1. Elements of a polyhedron ---------- */

export function ElementsFigure({ language }: { language: UnitLanguage }) {
    const prism = prismVertices(5, 1, 2, 0.75)
    const pyramid = pyramidVertices(5, 1, 2, 0.75)
    const camPrism = camera(115, 232, 52, -0.5, 0.6)
    const camPyramid = camera(295, 232, 52, -0.5, 0.6)
    const prismFace = frontFace(hullFaces(prism))
    const pyramidFace = frontFace(hullFaces(pyramid))
    const front = frontMost(prism.slice(0, 5))
    const back = (front + 2) % 5
    const pyramidFront = frontMost(pyramid.slice(0, 5))
    const prismCount = countElements(prism)
    const pyramidCount = countElements(pyramid)
    const rows: { text: LocalizedText; color: string; values: [number, number] }[] = [
        { text: say('aurpegiak', 'caras', 'الأوجه'), color: STAGE, values: [prismCount.faces, pyramidCount.faces] },
        { text: say('ertzak', 'aristas', 'الأحرف'), color: SECOND, values: [prismCount.edges, pyramidCount.edges] },
        { text: say('erpinak', 'vértices', 'الرؤوس'), color: GREEN, values: [prismCount.vertices, pyramidCount.vertices] }
    ]
    return (
        <Figure height={300} label={pick(language, say('Prisma eta piramide pentagonalak: aurpegi bat, ertz bat eta erpin bat nabarmenduta', 'Prisma y pirámide pentagonales: una cara, una arista y un vértice destacados', 'منشور وهرم خماسيان: وجه وحرف ورأس مميزة'))}>
            <Solid cam={camPrism} vertices={prism} faceFill={(face) => (face === prismFace ? STAGE_TINT : undefined)} />
            <Segment3 cam={camPrism} a={prism[front]} b={prism[front + 5]} color={SECOND} width={4} />
            <circle cx={camPrism.at(prism[back + 5])[0]} cy={camPrism.at(prism[back + 5])[1]} r={6} fill={GREEN} />
            <Solid cam={camPyramid} vertices={pyramid} faceFill={(face) => (face === pyramidFace ? STAGE_TINT : undefined)} />
            <Segment3 cam={camPyramid} a={pyramid[pyramidFront]} b={pyramid[(pyramidFront + 1) % 5]} color={SECOND} width={4} />
            <circle cx={camPyramid.at(pyramid[5])[0]} cy={camPyramid.at(pyramid[5])[1]} r={6} fill={GREEN} />
            <Caption x={115} y={290} language={language} text={say('prisma', 'prisma', 'منشور')} color={INK} />
            <Caption x={295} y={290} language={language} text={say('piramidea', 'pirámide', 'هرم')} color={INK} />

            <Caption x={590} y={70} language={language} text={say('prisma', 'prisma', 'منشور')} size={14} />
            <Caption x={670} y={70} language={language} text={say('piramidea', 'pirámide', 'هرم')} size={14} />
            {rows.map((row, index) => (
                <g key={index}>
                    <rect x={418} y={98 + index * 44} width={14} height={14} rx={3} fill={row.color} />
                    <Caption x={490} y={111 + index * 44} language={language} text={row.text} color={row.color} />
                    <Formula x={590} y={112 + index * 44} size={20}>{row.values[0]}</Formula>
                    <Formula x={670} y={112 + index * 44} size={20}>{row.values[1]}</Formula>
                </g>
            ))}
            <Caption x={560} y={262} language={language} text={say('Oinarria: pentagonoa (n = 5)', 'Base: pentágono (n = 5)', 'القاعدة: مخمّس')} size={14} />
        </Figure>
    )
}

/* ---------- 2. Euler's formula ---------- */

export function EulerFigure({ language }: { language: UnitLanguage }) {
    const solids: { vertices: V3[]; lift: number; scale: number; name: LocalizedText }[] = [
        { vertices: boxVertices(1.5, 1.5, 1.5), lift: 18, scale: 22, name: say('kuboa', 'cubo', 'مكعب') },
        { vertices: prismVertices(5, 0.9, 1.4, 0.2), lift: 18, scale: 22, name: say('prisma pentagonala', 'prisma pentagonal', 'منشور خماسي') },
        { vertices: pyramidVertices(6, 0.95, 1.6), lift: 18, scale: 22, name: say('piramide hexagonala', 'pirámide hexagonal', 'هرم سداسي') },
        { vertices: platonic.octa, lift: 2, scale: 26, name: say('oktaedroa', 'octaedro', 'ثماني الأوجه') }
    ]
    const columns = [
        { x: 270, text: say('aurpegiak', 'caras', 'الأوجه'), color: STAGE },
        { x: 370, text: say('erpinak', 'vértices', 'الرؤوس'), color: GREEN },
        { x: 470, text: say('ertzak', 'aristas', 'الأحرف'), color: SECOND }
    ]
    return (
        <Figure height={330} label={pick(language, say('Eulerren formula lau poliedrotan: aurpegiak + erpinak = ertzak + 2', 'La fórmula de Euler en cuatro poliedros: caras + vértices = aristas + 2', 'صيغة أويلر في أربعة متعددات أوجه: الأوجه + الرؤوس = الأحرف + 2'))}>
            {columns.map((column) => <Caption key={column.x} x={column.x} y={34} language={language} text={column.text} color={column.color} size={14} />)}
            {solids.map((solid, index) => {
                const y = 88 + index * 66
                const count = countElements(solid.vertices)
                return (
                    <g key={index}>
                        <line x1={20} y1={y - 38} x2={700} y2={y - 38} stroke={MUTED} strokeOpacity={0.3} />
                        <Solid cam={camera(60, y + solid.lift, solid.scale)} vertices={solid.vertices} opacity={0.95} />
                        <Caption x={150} y={y + 6} language={language} text={solid.name} color={INK} size={13} />
                        <Formula x={270} y={y + 7} size={20} color={STAGE}>{count.faces}</Formula>
                        <Formula x={370} y={y + 7} size={20} color={GREEN}>{count.vertices}</Formula>
                        <Formula x={470} y={y + 7} size={20} color={SECOND}>{count.edges}</Formula>
                        <Formula x={610} y={y + 7} size={18}>{`${count.faces} + ${count.vertices} = ${count.edges} + 2`}</Formula>
                    </g>
                )
            })}
        </Figure>
    )
}

/* ---------- 3. The five regular polyhedra ---------- */

export function RegularFigure({ language }: { language: UnitLanguage }) {
    const solids: { vertices: V3[]; radius: number; name: LocalizedText; sum: string }[] = [
        { vertices: platonic.tetra, radius: Math.sqrt(3), name: say('tetraedroa', 'tetraedro', 'رباعي الأوجه'), sum: '3 · 60° = 180°' },
        { vertices: platonic.cube, radius: Math.sqrt(3), name: say('kuboa', 'cubo', 'المكعب'), sum: '3 · 90° = 270°' },
        { vertices: platonic.octa, radius: 1, name: say('oktaedroa', 'octaedro', 'ثماني الأوجه'), sum: '4 · 60° = 240°' },
        { vertices: platonic.dodeca, radius: Math.sqrt(3), name: say('dodekaedroa', 'dodecaedro', 'اثنا عشري الأوجه'), sum: '3 · 108° = 324°' },
        { vertices: platonic.icosa, radius: Math.hypot(1, (1 + Math.sqrt(5)) / 2), name: say('ikosaedroa', 'icosaedro', 'عشريني الأوجه'), sum: '5 · 60° = 300°' }
    ]
    const fills = [ROSE, SOFT, SKY, MINT, STAGE_TINT]
    return (
        <Figure height={300} label={pick(language, say('Bost poliedro erregularrak eta erpin bakoitzean elkartzen diren angeluen batura', 'Los cinco poliedros regulares y la suma de los ángulos que se juntan en cada vértice', 'متعددات الأوجه المنتظمة الخمسة ومجموع الزوايا الملتقية عند كل رأس'))}>
            {solids.map((solid, index) => {
                const x = 72 + index * 144
                const count = countElements(solid.vertices)
                return (
                    <g key={index}>
                        <Solid cam={camera(x, 98, 46 / solid.radius, -0.4, 0.42)} vertices={solid.vertices} fill={fills[index]} opacity={0.95} width={1.6} />
                        <Caption x={x} y={178} language={language} text={solid.name} color={INK} size={14} />
                        <Formula x={x} y={204} size={15} color={STAGE}>{count.faces}</Formula>
                        <Formula x={x} y={236} size={14} color={SECOND}>{solid.sum}</Formula>
                    </g>
                )
            })}
            <Caption y={278} language={language} text={say('Erpin bakoitzean: 360° baino gutxiago', 'En cada vértice: menos de 360°', 'عند كل رأس: أقل من 360°')} color={INK} />
        </Figure>
    )
}

/* ---------- 4. Area of a prism: the net ---------- */

export function PrismAreaFigure({ language }: { language: UnitLanguage }) {
    const u = 13
    const x0 = 40
    const top = 95
    const bottom = top + 10 * u
    const xs = [x0, x0 + 3 * u, x0 + 7 * u, x0 + 12 * u]
    const B = baseLetter(language)
    const prism: V3[] = [[0, 0, 0], [3, 0, 0], [0, 0, 4], [0, 10, 0], [3, 10, 0], [0, 10, 4]].map(([x, y, z]): V3 => [x - 1, y, z - 4 / 3])
    const cam = camera(335, 262, 13)
    return (
        <Figure height={330} label={pick(language, say('Prisma triangeluar baten garapena: alboko aurpegiek laukizuzen bat osatzen dute', 'Desarrollo de un prisma triangular: las caras laterales forman un rectángulo', 'نشر منشور ثلاثي: الأوجه الجانبية تكوّن مستطيلًا'))}>
            <rect x={xs[0]} y={top} width={xs[3] - xs[0]} height={bottom - top} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
            {xs.slice(1, 3).map((x) => <line key={x} x1={x} y1={top} x2={x} y2={bottom} stroke={INK} strokeWidth={1.4} strokeDasharray="5 4" />)}
            <polygon points={points([[xs[1], top], [xs[2], top], [xs[1], top - 3 * u]])} fill={SOFT} stroke={INK} strokeWidth={2} />
            <polygon points={points([[xs[1], bottom], [xs[2], bottom], [xs[1], bottom + 3 * u]])} fill={SOFT} stroke={INK} strokeWidth={2} />
            <Formula x={(xs[0] + xs[1]) / 2} y={bottom + 22} size={15}>3</Formula>
            <Formula x={(xs[1] + xs[2]) / 2} y={bottom - 10} size={15}>4</Formula>
            <Formula x={(xs[2] + xs[3]) / 2} y={bottom + 22} size={15}>5</Formula>
            <Formula x={xs[3] + 18} y={(top + bottom) / 2 + 6} size={15}>10</Formula>
            <Formula x={xs[1] + 20} y={top - 8} size={13} color={SECOND}>6</Formula>
            <Formula x={xs[1] + 20} y={bottom + 20} size={13} color={SECOND}>6</Formula>

            <Solid cam={cam} vertices={prism} fill={STAGE_TINT} />
            <Tag p={cam.at([0.5, 10, -4 / 3])} text="3" dy={-8} size={14} />
            <Tag p={cam.at([-1, 10, 2 / 3])} text="4" dx={-12} size={14} />
            <Tag p={cam.at([-1, 5, -4 / 3])} text="10" dx={-14} size={14} />

            <Formula x={560} y={110} size={16} color={STAGE}><Area index="L" />= (3 + 4 + 5) · 10 = 120</Formula>
            <Formula x={560} y={150} size={16} color={SECOND}><Area index={B} />= 3 · 4 : 2 = 6</Formula>
            <Formula x={560} y={190} size={16}><Area index="T" />= 120 + 2 · 6 = 132</Formula>
            <Caption x={560} y={240} language={language} text={say('Alboko azalera: perimetroa · altuera', 'Área lateral: perímetro · altura', 'المساحة الجانبية: المحيط · الارتفاع')} size={14} />
        </Figure>
    )
}

/* ---------- 5. Area of a pyramid: the apothem ---------- */

export function PyramidAreaFigure({ language }: { language: UnitLanguage }) {
    const cam = camera(180, 256, 16)
    const pyramid = pyramidVertices(4, 5 * Math.SQRT2, 12, Math.PI / 4)
    const centre: V3 = [0, 0, 0]
    const foot: V3 = [-5, 0, 0]
    const apex: V3 = [0, 12, 0]
    const [c, m, a] = [cam.at(centre), cam.at(foot), cam.at(apex)]
    const B = baseLetter(language)
    return (
        <Figure height={320} label={pick(language, say('Piramide karratu bat: altuera, oinarriaren apotema-erdia eta piramidearen apotema triangelu angeluzuzen batean', 'Una pirámide cuadrangular: la altura, media base y la apotema de la pirámide forman un triángulo rectángulo', 'هرم رباعي: الارتفاع ونصف القاعدة وعامد الهرم تكوّن مثلثًا قائمًا'))}>
            <Solid cam={cam} vertices={pyramid} fill={SOFT} />
            <polygon points={points([c, m, a])} fill={ROSE} fillOpacity={0.8} />
            <line x1={c[0]} y1={c[1]} x2={a[0]} y2={a[1]} stroke={STAGE} strokeWidth={2.4} strokeDasharray="6 4" />
            <line x1={c[0]} y1={c[1]} x2={m[0]} y2={m[1]} stroke={STAGE} strokeWidth={2.4} />
            <line x1={m[0]} y1={m[1]} x2={a[0]} y2={a[1]} stroke={SECOND} strokeWidth={3.2} />
            <RightMark v={c} a={m} b={a} />
            <Tag p={midpoint(c, a)} text="12" dx={16} color={STAGE} />
            <Tag p={midpoint(c, m)} text="5" dy={20} color={STAGE} size={15} />
            <Tag p={midpoint(m, a)} text="a" dx={-16} color={SECOND} />
            <Tag p={cam.at([0, 0, -5])} text="10" dy={26} />

            <Formula x={530} y={100} size={18} color={SECOND}>a = √(12² + 5²) = 13</Formula>
            <Formula x={530} y={145} size={17} color={STAGE}><Area index="L" />= 4 · (10 · 13 : 2) = 260</Formula>
            <Formula x={530} y={185} size={17}><Area index={B} />= 10² = 100</Formula>
            <Formula x={530} y={225} size={17}><Area index="T" />= 260 + 100 = 360</Formula>
            <Caption x={530} y={270} language={language} text={say('a: alboko triangeluaren altuera', 'a: altura de cada triángulo lateral', 'a: ارتفاع كل مثلث جانبي')} size={14} />
        </Figure>
    )
}

/* ---------- 6. Area of a frustum of a pyramid ---------- */

export function FrustumAreaFigure({ language }: { language: UnitLanguage }) {
    const height = Math.sqrt(119)
    const cam = camera(150, 235, 7.5)
    const frustum = frustumVertices(4, 10 * Math.SQRT2, 5 * Math.SQRT2, height, Math.PI / 4)
    const face = frontFace(hullFaces(frustum))
    const s = 6
    const y0 = 250
    const left = 300
    const bottomRight = left + 20 * s
    const topLeft = left + 5 * s
    const topRight = left + 15 * s
    const yTop = y0 - 12 * s
    return (
        <Figure height={300} label={pick(language, say('Piramide-enbor karratu bat eta haren alboko aurpegia, trapezio bat', 'Un tronco de pirámide cuadrangular y su cara lateral, un trapecio', 'جذع هرم رباعي ووجهه الجانبي، شبه منحرف'))}>
            <Solid cam={cam} vertices={frustum} fill={PAPER} faceFill={(item) => (item === face ? STAGE_TINT : undefined)} />
            <Tag p={cam.at([0, 0, -10])} text="20" dy={24} />

            <polygon points={points([[left, y0], [bottomRight, y0], [topRight, yTop], [topLeft, yTop]])} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
            <line x1={topLeft} y1={yTop} x2={topLeft} y2={y0} stroke={SECOND} strokeWidth={2.4} strokeDasharray="6 4" />
            <RightMark v={[topLeft, y0]} a={[left, y0]} b={[topLeft, yTop]} size={9} />
            <Formula x={(left + bottomRight) / 2} y={y0 + 22} size={15}>20</Formula>
            <Formula x={(topLeft + topRight) / 2} y={yTop - 8} size={15}>10</Formula>
            <Formula x={(left + topLeft) / 2} y={y0 - 6} size={13} color={STAGE}>5</Formula>
            <Formula x={left + 2} y={(y0 + yTop) / 2} size={15} anchor="end">13</Formula>
            <Formula x={topLeft + 6} y={(y0 + yTop) / 2 + 6} size={15} color={SECOND} anchor="start">h</Formula>

            <Formula x={590} y={100} size={17} color={SECOND}>h = √(13² − 5²) = 12</Formula>
            <Formula x={590} y={140} size={16} color={STAGE}><Area index="L" />= 4 · (20 + 10) · 12 : 2</Formula>
            <Formula x={590} y={166} size={16} color={STAGE}>= 720</Formula>
            <Formula x={590} y={206} size={16}><Area index="T" />= 720 + 400 + 100</Formula>
            <Formula x={590} y={232} size={16}>= 1220</Formula>
        </Figure>
    )
}

/* ---------- 7. The cylinder ---------- */

export function CylinderFigure({ language }: { language: UnitLanguage }) {
    const cam = camera(105, 268, 21)
    const s = 14
    const rect = { x: 205, y: 110, w: 12.56 * s, h: 8 * s }
    const B = baseLetter(language)
    const axisBottom = cam.at([0, -1, 0])
    const axisTop = cam.at([0, 9.2, 0])
    return (
        <Figure height={310} label={pick(language, say('Zilindroa laukizuzen bat bere alde baten inguruan biratuz sortzen da; garapena: laukizuzen bat eta bi zirkulu', 'El cilindro se genera al girar un rectángulo alrededor de un lado; su desarrollo: un rectángulo y dos círculos', 'تنشأ الأسطوانة بدوران مستطيل حول أحد أضلاعه؛ نشرها: مستطيل ودائرتان'))}>
            <Cylinder cam={cam} r={2} h={8} />
            <line x1={axisBottom[0]} y1={axisBottom[1]} x2={axisTop[0]} y2={axisTop[1]} stroke={SECOND} strokeWidth={1.6} strokeDasharray="8 4 2 4" />
            <Segment3 cam={cam} a={[0, 8, 0]} b={[2 * RIGHT[0], 8, 2 * RIGHT[2]]} color={STAGE} />
            <Tag p={cam.at([RIGHT[0], 8, RIGHT[2]])} text="2" dy={-14} color={STAGE} size={15} />
            <Tag p={cam.at([2 * RIGHT[0], 4, 2 * RIGHT[2]])} text="8" dx={14} size={15} />

            <rect x={rect.x} y={rect.y} width={rect.w} height={rect.h} fill={SKY} stroke={INK} strokeWidth={2} />
            <circle cx={rect.x + 40} cy={rect.y - 28} r={28} fill={PAPER} stroke={INK} strokeWidth={2} />
            <circle cx={rect.x + 40} cy={rect.y + rect.h + 28} r={28} fill={PAPER} stroke={INK} strokeWidth={2} />
            <Formula x={rect.x + rect.w / 2} y={rect.y + rect.h / 2 - 4} size={14} color={STAGE}>{num(language, '2 · 3,14 · 2')}</Formula>
            <Formula x={rect.x + rect.w / 2} y={rect.y + rect.h / 2 + 18} size={14} color={STAGE}>{num(language, '= 12,56')}</Formula>
            <Formula x={rect.x + rect.w + 8} y={rect.y + rect.h / 2 + 5} size={15} anchor="start">8</Formula>

            <Formula x={585} y={110} size={16} color={STAGE}><Area index="L" />{num(language, '= 12,56 · 8 = 100,48')}</Formula>
            <Formula x={585} y={150} size={16} color={SECOND}><Area index={B} />{num(language, '= 3,14 · 2² = 12,56')}</Formula>
            <Formula x={585} y={190} size={16}><Area index="T" />{num(language, '= 100,48 + 2 · 12,56')}</Formula>
            <Formula x={585} y={216} size={16}>{num(language, '= 125,6')}</Formula>
            <Caption x={585} y={262} language={language} text={say('Laukizuzenaren oinarria: zirkunferentzia', 'Base del rectángulo: la circunferencia', 'قاعدة المستطيل: محيط الدائرة')} size={14} />
        </Figure>
    )
}

/* ---------- 8. The cone ---------- */

export function ConeFigure({ language }: { language: UnitLanguage }) {
    const cam = camera(125, 262, 13)
    const rim: V3 = [6 * RIGHT[0], 0, 6 * RIGHT[2]]
    const [c, rimPoint, apex] = [cam.at([0, 0, 0]), cam.at(rim), cam.at([0, 8, 0])]
    const B = baseLetter(language)
    const centre: Point = [335, 92]
    const R = 80
    const spread = (216 / 2) * (Math.PI / 180)
    const from: Point = [centre[0] + R * Math.cos(Math.PI / 2 - spread), centre[1] + R * Math.sin(Math.PI / 2 - spread)]
    const to: Point = [centre[0] + R * Math.cos(Math.PI / 2 + spread), centre[1] + R * Math.sin(Math.PI / 2 + spread)]
    return (
        <Figure height={310} label={pick(language, say('Konoa: altuera, erradioa eta sortzailea triangelu angeluzuzen batean; garapena: sektore zirkular bat eta zirkulu bat', 'El cono: altura, radio y generatriz en un triángulo rectángulo; su desarrollo: un sector circular y un círculo', 'المخروط: الارتفاع ونصف القطر والراسم في مثلث قائم؛ نشره: قطاع دائري ودائرة'))}>
            <Cone cam={cam} r={6} h={8} />
            <polygon points={points([c, rimPoint, apex])} fill={ROSE} fillOpacity={0.7} />
            <line x1={c[0]} y1={c[1]} x2={apex[0]} y2={apex[1]} stroke={STAGE} strokeWidth={2.4} strokeDasharray="6 4" />
            <line x1={c[0]} y1={c[1]} x2={rimPoint[0]} y2={rimPoint[1]} stroke={STAGE} strokeWidth={2.4} />
            <line x1={rimPoint[0]} y1={rimPoint[1]} x2={apex[0]} y2={apex[1]} stroke={SECOND} strokeWidth={3.2} />
            <RightMark v={c} a={rimPoint} b={apex} />
            <Tag p={midpoint(c, apex)} text="8" dx={-12} color={STAGE} size={15} />
            <Tag p={midpoint(c, rimPoint)} text="6" dy={18} color={STAGE} size={15} />
            <Tag p={midpoint(rimPoint, apex)} text="g" dx={14} color={SECOND} />

            <path d={`M ${centre[0]} ${centre[1]} L ${from[0]} ${from[1]} A ${R} ${R} 0 1 1 ${to[0]} ${to[1]} Z`} fill={SOFT} stroke={INK} strokeWidth={2} />
            <circle cx={centre[0]} cy={centre[1] + R + 48} r={48} fill={PAPER} stroke={INK} strokeWidth={2} />
            <Formula x={centre[0] - 34} y={centre[1] + 30} size={14} color={SECOND}>10</Formula>
            <Formula x={centre[0]} y={centre[1] + R + 54} size={14}>6</Formula>

            <Formula x={585} y={100} size={17} color={SECOND}>g = √(8² + 6²) = 10</Formula>
            <Formula x={585} y={140} size={16} color={STAGE}><Area index="L" />{num(language, '= 3,14 · 6 · 10 = 188,4')}</Formula>
            <Formula x={585} y={180} size={16}><Area index={B} />{num(language, '= 3,14 · 6² = 113,04')}</Formula>
            <Formula x={585} y={220} size={16}><Area index="T" />{num(language, '= 301,44')}</Formula>
            <Caption x={585} y={265} language={language} text={say('Alboko azalera: π · r · g', 'Área lateral: π · r · g', 'المساحة الجانبية: π · r · g')} size={14} />
        </Figure>
    )
}

/* ---------- 9. The sphere ---------- */

export function SphereFigure({ language }: { language: UnitLanguage }) {
    const cam = camera(170, 160, 28)
    const [cx, cy] = cam.at([0, 0, 0])
    const R = 3 * cam.scale
    const bandTop = cam.at([0, 1, 0])[1]
    const bandBottom = cam.at([0, -1, 0])[1]
    const section = Math.sqrt(8)
    const side = cam.at([3 * RIGHT[0], 0, 3 * RIGHT[2]])
    return (
        <Figure height={320} label={pick(language, say('Esfera bere zilindro zirkunskribatuan; zona esferiko batek zilindroaren banda berdinaren azalera du', 'La esfera en su cilindro circunscrito; una zona esférica tiene la misma área que la banda del cilindro', 'الكرة داخل أسطوانتها المحيطة؛ للمنطقة الكروية مساحة الشريط نفسه من الأسطوانة'))}>
            <defs>
                <clipPath id="gorputzak-sphere-band">
                    <circle cx={cx} cy={cy} r={R} />
                </clipPath>
            </defs>
            <Sphere cam={cam} r={3} equator={false} />
            <rect x={cx - R} y={bandTop} width={2 * R} height={bandBottom - bandTop} fill={SOFT} clipPath="url(#gorputzak-sphere-band)" />
            <Circle3 cam={cam} y={1} r={section} color={SECOND} />
            <Circle3 cam={cam} y={-1} r={section} color={SECOND} />
            <circle cx={cx} cy={cy} r={R} fill="none" stroke={INK} strokeWidth={2} />
            <rect x={cx - R} y={cam.at([0, 3, 0])[1]} width={2 * R} height={cam.at([0, -3, 0])[1] - cam.at([0, 3, 0])[1]} fill="none" stroke={STAGE} strokeWidth={1.6} strokeDasharray="7 5" />
            <line x1={cx} y1={cy} x2={side[0]} y2={side[1]} stroke={STAGE} strokeWidth={2.2} />
            <circle cx={cx} cy={cy} r={3.5} fill={INK} />
            <Tag p={midpoint([cx, cy], side)} text="r" dy={-8} color={STAGE} />
            <line x1={cx + R + 16} y1={bandTop} x2={cx + R + 16} y2={bandBottom} stroke={SECOND} strokeWidth={2} />
            <Tag p={[cx + R + 30, (bandTop + bandBottom) / 2 + 6]} text="h" color={SECOND} />

            <Formula x={530} y={90} size={19}>A = 4 · π · r²</Formula>
            <Formula x={530} y={130} size={16} color={STAGE}>{num(language, 'r = 3:  4 · 3,14 · 9 = 113,04')}</Formula>
            <Caption x={530} y={185} language={language} text={say('Zona edo kasketa:', 'Zona o casquete:', 'المنطقة أو القبعة:')} color={SECOND} size={15} />
            <Formula x={530} y={215} size={18} color={SECOND}>A = 2 · π · r · h</Formula>
            <Caption x={530} y={262} language={language} text={say('Zilindroaren banda bezainbeste', 'Lo mismo que la banda del cilindro', 'مثل شريط الأسطوانة')} size={14} />
        </Figure>
    )
}

/* ---------- 10. Units of volume ---------- */

export function VolumeUnitsFigure({ language }: { language: UnitLanguage }) {
    const cam = camera(160, 270, 13)
    const corner = frontMost(boxVertices(10, 10, 10))
    const small = boxVertices(1, 1, 1).map(([x, y, z]): V3 => [x + (boxVertices(10, 10, 10)[corner][0] > 0 ? 4.5 : -4.5), y, z + (boxVertices(10, 10, 10)[corner][2] > 0 ? 4.5 : -4.5)])
    const units = ['km³', 'hm³', 'dam³', 'm³', 'dm³', 'cm³', 'mm³']
    return (
        <Figure height={320} label={pick(language, say('Dezimetro kubiko batean 1000 zentimetro kubiko sartzen dira; unitate bakoitza hurrengoa baino 1000 aldiz handiagoa da', 'En un decímetro cúbico caben 1000 centímetros cúbicos; cada unidad es 1000 veces la siguiente', 'في الديسيمتر المكعب 1000 سنتيمتر مكعب؛ كل وحدة تساوي 1000 مرة الوحدة التالية'))}>
            <GridBox cam={cam} a={10} b={10} c={10} fill={SKY} />
            <Solid cam={cam} vertices={small} fill={SECOND} opacity={1} />
            <Tag p={cam.at([0, 0, -5])} text="10 cm" dy={28} size={15} />
            <Formula x={170} y={40} size={16} color={STAGE}>1 dm³ = 10 · 10 · 10 cm³</Formula>
            <Formula x={170} y={64} size={16} color={STAGE}>= 1000 cm³</Formula>

            {units.map((unit, index) => (
                <g key={unit}>
                    <rect x={480} y={36 + index * 38} width={84} height={28} rx={6} fill={unit === 'dm³' || unit === 'cm³' ? STAGE_TINT : PAPER} stroke={INK} strokeWidth={1.4} />
                    <Formula x={522} y={56 + index * 38} size={16}>{unit}</Formula>
                    {index < units.length - 1 && <path d={`M 574 ${52 + index * 38} q 18 19 0 38`} fill="none" stroke={SECOND} strokeWidth={1.8} />}
                    {index < units.length - 1 && <Formula x={598} y={76 + index * 38} size={13} color={SECOND} anchor="start">· 1000</Formula>}
                    {index < units.length - 1 && <path d={`M 470 ${90 + index * 38} q -18 -19 0 -38`} fill="none" stroke={GREEN} strokeWidth={1.8} />}
                    {index < units.length - 1 && <Formula x={444} y={76 + index * 38} size={13} color={GREEN} anchor="end">: 1000</Formula>}
                </g>
            ))}
        </Figure>
    )
}

/* ---------- 11. Volume and capacity ---------- */

export function CapacityFigure({ language }: { language: UnitLanguage }) {
    const cam = camera(140, 250, 14)
    const water = boxVertices(10, 10, 8.5)
    return (
        <Figure height={300} label={pick(language, say('Ur litro batek dezimetro kubiko bat betetzen du eta kilo bat pisatzen du', 'Un litro de agua llena un decímetro cúbico y pesa un kilo', 'لتر الماء يملأ ديسيمترًا مكعبًا ويزن كيلوغرامًا'))}>
            <Solid cam={cam} vertices={water} fill={SKY} opacity={0.95} hidden={false} />
            <Solid cam={cam} vertices={boxVertices(10, 10, 10)} fill="none" opacity={0} />
            <Tag p={cam.at([0, 4, -5])} text="1 L" size={22} color={STAGE} />
            <Tag p={cam.at([0, 0, -5])} text="1 dm" dy={28} size={15} />
            <Solid cam={camera(300, 250, 14)} vertices={boxVertices(1, 1, 1)} fill={SECOND} opacity={1} />
            <Formula x={300} y={225} size={15} color={SECOND}>1 mL</Formula>
            <Formula x={300} y={278} size={14}>1 cm³</Formula>

            <Formula x={560} y={70} size={18}>1 m³ = 1000 L</Formula>
            <Formula x={560} y={110} size={18} color={STAGE}>1 dm³ = 1 L</Formula>
            <Formula x={560} y={150} size={18} color={SECOND}>1 cm³ = 1 mL</Formula>
            <Formula x={560} y={190} size={18}>1 L = 1000 mL</Formula>
            <Caption x={560} y={238} language={language} text={say('Ur litro batek 1 kg pisatzen du', 'Un litro de agua pesa 1 kg', 'لتر الماء يزن 1 kg')} color={GREEN} />
        </Figure>
    )
}

/* ---------- 12. Cavalieri and the cuboid ---------- */

function CoinStack({ x, y, lean }: { x: number; y: number; lean: number }) {
    return (
        <g>
            {Array.from({ length: 9 }, (_, index) => {
                const cx = x + lean * index
                const cy = y - index * 15
                return (
                    <g key={index}>
                        <path d={`M ${cx - 42} ${cy - 10} L ${cx - 42} ${cy} A 42 11 0 0 0 ${cx + 42} ${cy} L ${cx + 42} ${cy - 10}`} fill={SOFT} stroke={INK} strokeWidth={1.4} />
                        <ellipse cx={cx} cy={cy - 10} rx={42} ry={11} fill={index === 8 ? PAPER : SOFT} stroke={INK} strokeWidth={1.4} />
                    </g>
                )
            })}
        </g>
    )
}

export function CavalieriFigure({ language }: { language: UnitLanguage }) {
    const cam = camera(560, 222, 38)
    return (
        <Figure height={310} label={pick(language, say('Txanpon-pila zuzena eta okertua: bolumen bera. Ortoedroa unitate-kuboekin', 'Una pila de monedas recta y otra inclinada: mismo volumen. Un ortoedro con cubos unidad', 'كومة نقود مستقيمة وأخرى مائلة: الحجم نفسه. ومتوازي مستطيلات من مكعبات الوحدة'))}>
            <CoinStack x={90} y={250} lean={0} />
            <CoinStack x={210} y={250} lean={7} />
            <line x1={30} y1={262} x2={330} y2={262} stroke={INK} strokeWidth={2} />
            <Caption x={180} y={292} language={language} text={say('Altuera eta sekzio berdinak → bolumen bera', 'Igual altura y secciones → mismo volumen', 'الارتفاع والمقاطع نفسها ← الحجم نفسه')} size={14} />

            <GridBox cam={cam} a={4} b={3} c={2} fill={STAGE_TINT} />
            <Tag p={cam.at([0, 0, -1.5])} text="4" dy={22} />
            <Tag p={cam.at([-2, 0, 0])} text="3" dx={-14} dy={14} />
            <Tag p={cam.at([-2, 1, 1.5])} text="2" dx={-14} dy={5} />
            <Formula x={560} y={50} size={19} color={STAGE}>V = 4 · 3 · 2 = 24</Formula>
            <Caption x={560} y={298} language={language} text={say('24 unitate-kubo', '24 cubos unidad', '24 مكعب وحدة')} size={14} />
        </Figure>
    )
}

/* ---------- 13. Volume of a prism and a cylinder ---------- */

export function PrismVolumeFigure({ language }: { language: UnitLanguage }) {
    const camPrism = camera(115, 250, 34)
    const camCylinder = camera(300, 250, 34)
    const prism = prismVertices(6, 1.3, 4)
    const B = baseLetter(language)
    return (
        <Figure height={300} label={pick(language, say('Prisma eta zilindroa: bolumena oinarriaren azalera bider altuera da', 'Prisma y cilindro: el volumen es el área de la base por la altura', 'المنشور والأسطوانة: الحجم مساحة القاعدة في الارتفاع'))}>
            <Solid cam={camPrism} vertices={prism} fill={PAPER} faceFill={(face) => (face.normal[1] > 0.99 ? SOFT : undefined)} />
            <Formula x={camPrism.at([0, 4, 0])[0]} y={camPrism.at([0, 4, 0])[1] + 6} size={15} color={SECOND}><Area index={B} /></Formula>
            <Tag p={camPrism.at([1.3 * RIGHT[0], 2, 1.3 * RIGHT[2]])} text="h" dx={16} color={STAGE} />
            <Cylinder cam={camCylinder} r={1.3} h={4} fill={SKY} top={SOFT} />
            <Formula x={camCylinder.at([0, 4, 0])[0]} y={camCylinder.at([0, 4, 0])[1] + 6} size={15} color={SECOND}><Area index={B} /></Formula>
            <Tag p={camCylinder.at([1.3 * RIGHT[0], 2, 1.3 * RIGHT[2]])} text="h" dx={16} color={STAGE} />

            <Formula x={555} y={90} size={22}>V = A<tspan fontSize="0.7em" dy="0.3em">{B}</tspan><tspan dy="-0.3em"> · h</tspan></Formula>
            <Caption x={555} y={140} language={language} text={say('Zilindroa: oinarria zirkulua', 'Cilindro: la base es un círculo', 'الأسطوانة: القاعدة دائرة')} size={14} />
            <Formula x={555} y={172} size={18} color={STAGE}>V = π · r² · h</Formula>
            <Formula x={555} y={214} size={16} color={SECOND}>{num(language, 'r = 5, h = 10:')}</Formula>
            <Formula x={555} y={240} size={16} color={SECOND}>{num(language, '3,14 · 25 · 10 = 785')}</Formula>
        </Figure>
    )
}

/* ---------- 14. Volume of a pyramid and a cone ---------- */

export function PyramidVolumeFigure({ language }: { language: UnitLanguage }) {
    const camBox = camera(115, 258, 15)
    const camCylinder = camera(300, 258, 15)
    const B = baseLetter(language)
    return (
        <Figure height={310} label={pick(language, say('Piramide batek oinarri eta altuera bereko prismaren herena hartzen du; konoak, zilindroarena', 'Una pirámide ocupa un tercio del prisma de igual base y altura; el cono, un tercio del cilindro', 'يشغل الهرم ثلث المنشور المساوي له قاعدةً وارتفاعًا؛ والمخروط ثلث الأسطوانة'))}>
            <Solid cam={camBox} vertices={boxVertices(8, 8, 10)} fill="none" opacity={0} stroke={MUTED} width={1.4} />
            <Solid cam={camBox} vertices={pyramidVertices(4, 4 * Math.SQRT2, 10, Math.PI / 4)} fill={SOFT} />
            <Cylinder cam={camCylinder} r={4} h={10} fill="none" top="none" stroke={MUTED} />
            <Cone cam={camCylinder} r={4} h={10} fill={ROSE} />
            <Caption x={205} y={40} language={language} text={say('Hiru aldiz betetzen da', 'Se llena tres veces', 'يمتلئ ثلاث مرات')} color={SECOND} />

            <Formula x={555} y={90} size={22}>V = A<tspan fontSize="0.7em" dy="0.3em">{B}</tspan><tspan dy="-0.3em"> · h : 3</tspan></Formula>
            <Formula x={555} y={140} size={16} color={STAGE}>10² · 12 : 3 = 400</Formula>
            <Caption x={555} y={190} language={language} text={say('Konoa:', 'Cono:', 'المخروط:')} size={14} />
            <Formula x={555} y={220} size={17} color={SECOND}>V = π · r² · h : 3</Formula>
            <Formula x={555} y={256} size={15} color={SECOND}>{num(language, '3,14 · 6² · 8 : 3 = 301,44')}</Formula>
        </Figure>
    )
}

/* ---------- 15. Volume of a sphere ---------- */

export function SphereVolumeFigure({ language }: { language: UnitLanguage }) {
    const cam = camera(170, 170, 26)
    return (
        <Figure height={320} label={pick(language, say('Esferaren bolumena zilindro zirkunskribatuaren bi heren da', 'El volumen de la esfera es dos tercios del de su cilindro circunscrito', 'حجم الكرة ثلثا حجم الأسطوانة المحيطة بها'))}>
            <Cylinder cam={cam} r={3} h={6} base={-3} fill={SKY} top={PAPER} />
            <Sphere cam={cam} r={3} fill={MINT} />
            <Segment3 cam={cam} a={[0, 0, 0]} b={[3 * RIGHT[0], 0, 3 * RIGHT[2]]} color={STAGE} />
            <Tag p={cam.at([1.5 * RIGHT[0], 0, 1.5 * RIGHT[2]])} text="r" dy={-8} color={STAGE} />

            <Formula x={530} y={86} size={20}>V = 4 · π · r³ : 3</Formula>
            <Formula x={530} y={126} size={16} color={STAGE}>{num(language, 'r = 3:  4 · 3,14 · 27 : 3 = 113,04')}</Formula>
            <Caption x={530} y={180} language={language} text={say('Zilindro zirkunskribatua:', 'Cilindro circunscrito:', 'الأسطوانة المحيطة:')} size={14} />
            <Formula x={530} y={208} size={16}>{num(language, '3,14 · 3² · 6 = 169,56')}</Formula>
            <Formula x={530} y={244} size={16} color={SECOND}>{num(language, '169,56 · 2 : 3 = 113,04')}</Formula>
        </Figure>
    )
}

/* ---------- Hero art: a cube, a cylinder, a cone, a sphere and a pyramid ---------- */

export function SolidsHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <GridBox cam={camera(130, 330, 30)} a={3} b={3} c={3} fill="#dde7f7" />
                <Cylinder cam={camera(290, 330, 34)} r={1.2} h={4.2} fill={SOFT} />
                <Cone cam={camera(420, 330, 34)} r={1.4} h={3.6} fill={ROSE} />
                <Sphere cam={camera(380, 110, 46)} r={1.3} fill={MINT} />
                <Solid cam={camera(170, 160, 44)} vertices={pyramidVertices(4, 1.5, 2.4, Math.PI / 4)} fill={PAPER} />
            </svg>
        </div>
    )
}
