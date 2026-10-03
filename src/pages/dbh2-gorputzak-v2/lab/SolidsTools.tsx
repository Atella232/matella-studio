import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import {
    boxVertices,
    camera,
    fitCamera,
    FRONT,
    frustumVertices,
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
    roundHull,
    ROSE,
    SECOND,
    SKY,
    SOFT,
    STAGE,
    STAGE_TINT,
    type Face,
    type Point,
    type V3
} from '../geometry3d'
import { Cone, Cylinder, GridBox, Segment3, Solid, Sphere } from '../solids'
import {
    apothemSquare,
    BASE_MAX,
    BASE_MIN,
    BOX_MAX,
    boxChallenges,
    boxLateral,
    boxTotal,
    exactRoot,
    faceAngle,
    fromHundredths,
    generatrixSquare,
    initialBoxState,
    initialPlatonicState,
    initialPolyhedronState,
    initialPyramidState,
    initialRoundState,
    initialTankState,
    initialVolumeState,
    PLATONIC_IDS,
    platonicChallenges,
    platonicData,
    polyhedronChallenges,
    polyhedronCounts,
    PYRAMID_HEIGHT_MAX,
    PYRAMID_SIDE_MAX,
    pyramidChallenges,
    pyramidLateral,
    pyramidTotal,
    ROUND_MAX,
    roundChallenges,
    roundLateralPi,
    roundTotalPi,
    setBox,
    setPlatonic,
    setPolyhedron,
    setPyramid,
    setRound,
    setTank,
    setVolume,
    TANK_MAX,
    tankChallenges,
    tankLitres,
    timesPi,
    vertexAngleSum,
    VOLUME_MAX,
    volumeChallenges,
    volumeHundredths,
    volumeThirds,
    type BoxState,
    type PlatonicId,
    type PlatonicState,
    type PolyhedronKind,
    type PolyhedronState,
    type PyramidState,
    type RoundBody,
    type RoundState,
    type TankState,
    type VolumeBody,
    type VolumeState
} from './labTools'

type Text = { eu: string; es: string; ar: string }

const say = (eu: string, es: string, ar: string): Text => ({ eu, es, ar })
/** {,} in LaTeX becomes the point in Arabic */
const localLatex = (language: string, latex: string) => (language === 'ar' ? latex.replace(/\{,\}/g, '.') : latex)
/** A decimal with the comma, ready for LaTeX */
const tex = (decimal: string) => decimal.replace(',', '{,}')
/** The root of a whole number in LaTeX: whole, or √n ≈ with two decimals */
const rootLatex = (square: number) => {
    const exact = exactRoot(square)
    if (exact !== null) return `\\sqrt{${square}}=${exact}`
    return `\\sqrt{${square}}\\approx ${tex((Math.round(Math.sqrt(square) * 100) / 100).toString().replace('.', ','))}`
}
const dot3 = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
const frontFace = (faces: Face[]) =>
    faces.filter((face) => Math.abs(face.normal[1]) < 0.999).reduce((best, face) => (dot3(face.normal, FRONT) > dot3(best.normal, FRONT) ? face : best))

function Board({ height, label, children }: { height: number; label: string; children: ReactNode }) {
    return <svg viewBox={`0 0 640 ${height}`} direction="ltr" role="img" aria-label={label} style={{ width: '100%', height: 'auto', fontFamily: '"Atkinson Hyperlegible", "Noto Sans Arabic", system-ui, sans-serif' }}>{children}</svg>
}

function Readout({ language, latex, note }: { language: string; latex: string; note: string }) {
    return (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={localLatex(language, `$${latex}$`)} /></span>
            <span className="fraction-v2-lab-readout-note">{note}</span>
        </>
    )
}

function Label({ x, y, children, color = INK, size = 16, anchor = 'middle' }: { x: number; y: number; children: ReactNode; color?: string; size?: number; anchor?: 'start' | 'middle' | 'end' }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color}>{children}</text>
}

/* ---------- 1. Prisms and pyramids ---------- */

const kindNames: Record<PolyhedronKind, Text> = {
    prism: say('Prisma', 'Prisma', 'منشور'),
    pyramid: say('Piramidea', 'Pirámide', 'هرم'),
    frustum: say('Enborra', 'Tronco', 'جذع')
}

export function PolyhedronTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<PolyhedronState>(initialPolyhedronState)
    const { kind, n } = state
    const counts = polyhedronCounts(state)
    const turn = 0.75 - Math.PI / n
    const vertices = kind === 'prism' ? prismVertices(n, 1.4, 2.2, turn) : kind === 'pyramid' ? pyramidVertices(n, 1.4, 2.4, turn) : frustumVertices(n, 1.5, 0.8, 1.8, turn)
    const cam = fitCamera(vertices, [190, 25, 450, 300], 90, -0.5, 0.55)
    const face = frontFace(hullFaces(vertices))
    const controls = (
        <>
            <Segmented label={l(say('Gorputza', 'Cuerpo', 'الجسم'))} value={kind} options={(['prism', 'pyramid', 'frustum'] as PolyhedronKind[]).map((value) => ({ value, label: l(kindNames[value]) }))} onChange={(value) => setState((s) => setPolyhedron(s, { kind: value }))} />
            <Stepper label={l(say('Oinarriaren aldeak', 'Lados de la base', 'أضلاع القاعدة'))} value={n} min={BASE_MIN} max={BASE_MAX} onChange={(value) => setState((s) => setPolyhedron(s, { n: value }))} language={props.language} />
        </>
    )
    const note = l(say(`${counts.faces} aurpegi, ${counts.edges} ertz eta ${counts.vertices} erpin.`, `${counts.faces} caras, ${counts.edges} aristas y ${counts.vertices} vértices.`, `${counts.faces} أوجه و${counts.edges} حرفًا و${counts.vertices} رؤوس.`))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={`${counts.faces}+${counts.vertices}=${counts.edges}+2`} note={note} />} challenges={polyhedronChallenges} state={state}>
            <Board height={320} label={l(say('Aukeratutako poliedroa', 'El poliedro elegido', 'متعدد الأوجه المختار'))}>
                <Solid cam={cam} vertices={vertices} fill={PAPER} faceFill={(item) => (item === face ? STAGE_TINT : undefined)} width={2.4} />
                {vertices.map((p, index) => {
                    const [x, y] = cam.at(p)
                    return <circle key={index} cx={x} cy={y} r={3.5} fill={SECOND} />
                })}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 2. The five regular polyhedra ---------- */

const platonicNames: Record<PlatonicId, Text> = {
    tetra: say('Tetraedroa', 'Tetraedro', 'رباعي'),
    cube: say('Kuboa', 'Cubo', 'مكعب'),
    octa: say('Oktaedroa', 'Octaedro', 'ثماني'),
    dodeca: say('Dodekaedroa', 'Dodecaedro', 'اثنا عشري'),
    icosa: say('Ikosaedroa', 'Icosaedro', 'عشريني')
}
const polygonNames: Record<number, Text> = {
    3: say('triangelu aldeberdinak', 'triángulos equiláteros', 'مثلثات متساوية الأضلاع'),
    4: say('karratuak', 'cuadrados', 'مربعات'),
    5: say('pentagono erregularrak', 'pentágonos regulares', 'مخمسات منتظمة')
}
const platonicFill: Record<PlatonicId, string> = { tetra: ROSE, cube: SOFT, octa: SKY, dodeca: MINT, icosa: STAGE_TINT }

export function PlatonicTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<PlatonicState>(initialPlatonicState)
    const { solid, turn } = state
    const data = platonicData[solid]
    const vertices = platonic[solid]
    const radius = Math.max(...vertices.map((p) => Math.hypot(...p)))
    const cam = camera(320, 165, 120 / radius, -0.4 + (turn * Math.PI) / 12, 0.42)
    const controls = (
        <>
            <Segmented label={l(say('Poliedroa', 'Poliedro', 'متعدد الأوجه'))} value={solid} options={PLATONIC_IDS.map((value) => ({ value, label: l(platonicNames[value]) }))} onChange={(value) => setState((s) => setPlatonic(s, { solid: value }))} />
            <Stepper label={l(say('Biratu', 'Girar', 'تدوير'))} value={turn} min={0} max={23} format={(value) => `${value * 15}°`} onChange={(value) => setState((s) => setPlatonic(s, { turn: value }))} language={props.language} />
        </>
    )
    const note = l(say(
        `Aurpegiak: ${data.faces} ${polygonNames[data.sides].eu}. Erpin bakoitzean ${data.perVertex}: ${data.perVertex} · ${faceAngle(solid)}° = ${vertexAngleSum(solid)}°.`,
        `Caras: ${data.faces} ${polygonNames[data.sides].es}. En cada vértice ${data.perVertex}: ${data.perVertex} · ${faceAngle(solid)}° = ${vertexAngleSum(solid)}°.`,
        `الأوجه: ${data.faces} ${polygonNames[data.sides].ar}. عند كل رأس ${data.perVertex}: ${data.perVertex} · ${faceAngle(solid)}° = ${vertexAngleSum(solid)}°.`
    ))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={`${data.faces}+${data.vertices}=${data.edges}+2`} note={note} />} challenges={platonicChallenges} state={state}>
            <Board height={330} label={l(platonicNames[solid])}>
                <Solid cam={cam} vertices={vertices} fill={platonicFill[solid]} opacity={0.95} width={2.2} />
            </Board>
        </ToolFrame>
    )
}

/* ---------- 3. A box and its net ---------- */

export function BoxTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<BoxState>(initialBoxState)
    const { a, b, c } = state
    const total = boxTotal(state)
    const cam = fitCamera(boxVertices(a, b, c), [20, 40, 290, 300], 30)
    // Net: a column of four faces (c, b, c, b tall) with the two b × c ends beside the second one
    const u = Math.min(300 / (a + 2 * c), 290 / (2 * b + 2 * c), 26)
    const x0 = 470 - (a * u) / 2
    const y0 = 165 - ((2 * b + 2 * c) * u) / 2
    const rect = (x: number, y: number, w: number, h: number, fill: string, label: number) => (
        <g key={`${x}-${y}`}>
            <rect x={x} y={y} width={w} height={h} fill={fill} stroke={INK} strokeWidth={1.6} />
            {Math.min(w, h) > 20 && <Label x={x + w / 2} y={y + h / 2 + 5} size={13}>{label}</Label>}
        </g>
    )
    const rows = [c, b, c, b]
    const tops = rows.map((_, index) => y0 + rows.slice(0, index).reduce((sum, value) => sum + value, 0) * u)
    const controls = (
        <>
            <Stepper label={l(say('Luzera', 'Largo', 'الطول'))} value={a} min={1} max={BOX_MAX} onChange={(value) => setState((s) => setBox(s, { a: value }))} language={props.language} />
            <Stepper label={l(say('Zabalera', 'Ancho', 'العرض'))} value={b} min={1} max={BOX_MAX} onChange={(value) => setState((s) => setBox(s, { b: value }))} language={props.language} />
            <Stepper label={l(say('Altuera', 'Alto', 'الارتفاع'))} value={c} min={1} max={BOX_MAX} onChange={(value) => setState((s) => setBox(s, { c: value }))} language={props.language} />
        </>
    )
    const note = l(say(`Alboko azalera: ${boxLateral(state)} cm². Azalera osoa: ${total} cm².`, `Área lateral: ${boxLateral(state)} cm². Área total: ${total} cm².`, `المساحة الجانبية: ${boxLateral(state)} سم². المساحة الكلية: ${total} سم².`))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={`2\\cdot (${a}\\cdot ${b}+${a}\\cdot ${c}+${b}\\cdot ${c})=${total}`} note={note} />} challenges={boxChallenges} state={state}>
            <Board height={330} label={l(say('Kaxa eta haren garapena', 'La caja y su desarrollo', 'الصندوق ونشره'))}>
                <GridBox cam={cam} a={a} b={b} c={c} fill={SKY} />
                {rows.map((height, index) => rect(x0, tops[index], a * u, height * u, index % 2 === 0 ? STAGE_TINT : SOFT, index % 2 === 0 ? a * c : a * b))}
                {rect(x0 - c * u, tops[1], c * u, b * u, ROSE, b * c)}
                {rect(x0 + a * u, tops[1], c * u, b * u, ROSE, b * c)}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 4. A square pyramid and its apothem ---------- */

export function PyramidTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<PyramidState>(initialPyramidState)
    const { side, height } = state
    const half = side / 2
    const square = apothemSquare(state)
    const pyramid = pyramidVertices(4, half * Math.SQRT2, height, Math.PI / 4)
    const cam = fitCamera(pyramid, [20, 30, 320, 295], 40)
    const [o, m, top] = [cam.at([0, 0, 0]), cam.at([-half, 0, 0]), cam.at([0, height, 0])]
    // The right triangle, flat, on the right
    const k = Math.min(200 / Math.max(half, 1), 250 / height)
    const corner: Point = [430, 290]
    const foot: Point = [430 + half * k, 290]
    const apex: Point = [430, 290 - height * k]
    const lateral = pyramidLateral(state)
    const total = pyramidTotal(state)
    const controls = (
        <>
            <Stepper label={l(say('Oinarriaren aldea', 'Lado de la base', 'ضلع القاعدة'))} value={side} min={2} max={PYRAMID_SIDE_MAX} step={2} onChange={(value) => setState((s) => setPyramid(s, { side: value }))} language={props.language} />
            <Stepper label={l(say('Altuera', 'Altura', 'الارتفاع'))} value={height} min={1} max={PYRAMID_HEIGHT_MAX} onChange={(value) => setState((s) => setPyramid(s, { height: value }))} language={props.language} />
        </>
    )
    const note = lateral !== null && total !== null
        ? l(say(`Alboko azalera: ${lateral} cm². Azalera osoa: ${total} cm².`, `Área lateral: ${lateral} cm². Área total: ${total} cm².`, `المساحة الجانبية: ${lateral} سم². المساحة الكلية: ${total} سم².`))
        : l(say('Apotema ez da zenbaki osoa: bilatu hirukote pitagoriko bat.', 'La apotema no es entera: busca una terna pitagórica.', 'العامد ليس عددًا صحيحًا: ابحث عن ثلاثية فيثاغورية.'))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={`a=\\sqrt{${height}^{2}+${half}^{2}}=${rootLatex(square)}`} note={note} />} challenges={pyramidChallenges} state={state}>
            <Board height={320} label={l(say('Piramidea eta haren triangelu angeluzuzena', 'La pirámide y su triángulo rectángulo', 'الهرم ومثلثه القائم'))}>
                <Solid cam={cam} vertices={pyramid} fill={SOFT} />
                <polygon points={points([o, m, top])} fill={ROSE} fillOpacity={0.8} />
                <line x1={o[0]} y1={o[1]} x2={top[0]} y2={top[1]} stroke={STAGE} strokeWidth={2.2} strokeDasharray="6 4" />
                <line x1={o[0]} y1={o[1]} x2={m[0]} y2={m[1]} stroke={STAGE} strokeWidth={2.2} />
                <line x1={m[0]} y1={m[1]} x2={top[0]} y2={top[1]} stroke={SECOND} strokeWidth={3} />

                <polygon points={points([corner, foot, apex])} fill={ROSE} stroke={INK} strokeWidth={2} />
                <polyline points={points([[corner[0], corner[1] - 12], [corner[0] + 12, corner[1] - 12], [corner[0] + 12, corner[1]]])} fill="none" stroke={INK} strokeWidth={1.6} />
                <line x1={corner[0]} y1={corner[1]} x2={apex[0]} y2={apex[1]} stroke={STAGE} strokeWidth={3} />
                <line x1={corner[0]} y1={corner[1]} x2={foot[0]} y2={foot[1]} stroke={STAGE} strokeWidth={3} />
                <line x1={foot[0]} y1={foot[1]} x2={apex[0]} y2={apex[1]} stroke={SECOND} strokeWidth={3.5} />
                <Label x={corner[0] - 12} y={(corner[1] + apex[1]) / 2 + 5} anchor="end" color={STAGE}>{height}</Label>
                <Label x={(corner[0] + foot[0]) / 2} y={corner[1] + 22} color={STAGE}>{half}</Label>
                <Label x={(foot[0] + apex[0]) / 2 + 14} y={(foot[1] + apex[1]) / 2} anchor="start" color={SECOND}>a</Label>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 5. Cylinder, cone and sphere ---------- */

const roundNames: Record<RoundBody, Text> = {
    cylinder: say('Zilindroa', 'Cilindro', 'أسطوانة'),
    cone: say('Konoa', 'Cono', 'مخروط'),
    sphere: say('Esfera', 'Esfera', 'كرة')
}

export function RoundTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RoundState>(initialRoundState)
    const { body, r, h } = state
    const lateral = roundLateralPi(state)
    const total = roundTotalPi(state)
    const g2 = generatrixSquare(state)
    const g = Math.sqrt(g2)
    const hull = body === 'sphere' ? roundHull(r, -r, r) : roundHull(r, 0, h, body === 'cone' ? 0 : r)
    const cam = fitCamera(hull, [20, 30, 290, 310], 60)
    // Net on the right
    let net: ReactNode = null
    if (body === 'cylinder') {
        const k = Math.min(250 / (2 * Math.PI * r), 170 / (h + 4 * r))
        const w = 2 * Math.PI * r * k
        const x = 470 - w / 2
        const y = 165 - (h * k) / 2
        net = (
            <g>
                <rect x={x} y={y} width={w} height={h * k} fill={SKY} stroke={INK} strokeWidth={2} />
                <circle cx={x + r * k} cy={y - r * k} r={r * k} fill={PAPER} stroke={INK} strokeWidth={2} />
                <circle cx={x + r * k} cy={y + h * k + r * k} r={r * k} fill={PAPER} stroke={INK} strokeWidth={2} />
            </g>
        )
    } else if (body === 'cone') {
        const angle = (2 * Math.PI * r) / g
        // The sector opens downwards; past half a circle its two ends rise above the centre
        const up = g * Math.max(0, -Math.cos(angle / 2))
        const k = Math.min(110 / g, 290 / (up + g + 2 * r))
        const centre: Point = [470, 170 - ((g + 2 * r - up) * k) / 2]
        const from: Point = [centre[0] + g * k * Math.cos(Math.PI / 2 - angle / 2), centre[1] + g * k * Math.sin(Math.PI / 2 - angle / 2)]
        const to: Point = [centre[0] + g * k * Math.cos(Math.PI / 2 + angle / 2), centre[1] + g * k * Math.sin(Math.PI / 2 + angle / 2)]
        net = (
            <g>
                <path d={`M ${centre[0]} ${centre[1]} L ${from[0]} ${from[1]} A ${g * k} ${g * k} 0 ${angle > Math.PI ? 1 : 0} 1 ${to[0]} ${to[1]} Z`} fill={SOFT} stroke={INK} strokeWidth={2} />
                <circle cx={centre[0]} cy={centre[1] + g * k + r * k} r={r * k} fill={PAPER} stroke={INK} strokeWidth={2} />
            </g>
        )
    } else {
        net = <Label x={470} y={170} size={20} color={MUTED}>4 · π · r²</Label>
    }
    const controls = (
        <>
            <Segmented label={l(say('Gorputza', 'Cuerpo', 'الجسم'))} value={body} options={(['cylinder', 'cone', 'sphere'] as RoundBody[]).map((value) => ({ value, label: l(roundNames[value]) }))} onChange={(value) => setState((s) => setRound(s, { body: value }))} />
            <Stepper label={l(say('Erradioa', 'Radio', 'نصف القطر'))} value={r} min={1} max={ROUND_MAX} onChange={(value) => setState((s) => setRound(s, { r: value }))} language={props.language} />
            {body !== 'sphere' && <Stepper label={l(say('Altuera', 'Altura', 'الارتفاع'))} value={h} min={1} max={ROUND_MAX} onChange={(value) => setState((s) => setRound(s, { h: value }))} language={props.language} />}
        </>
    )
    let latex: string
    if (body === 'cylinder') latex = `A_L=2\\pi\\cdot ${r}\\cdot ${h}=${lateral}\\pi\\approx ${tex(timesPi(lateral!))}`
    else if (body === 'sphere') latex = `A=4\\pi\\cdot ${r}^{2}=${lateral}\\pi\\approx ${tex(timesPi(lateral!))}`
    else latex = `g=${rootLatex(g2)}` + (lateral !== null ? `\\qquad A_L=\\pi\\cdot ${r}\\cdot ${exactRoot(g2)}=${lateral}\\pi` : '')
    const note = total !== null
        ? l(say(`Azalera osoa: ${total}π ≈ ${timesPi(total)} cm².`, `Área total: ${total}π ≈ ${timesPi(total)} cm².`, `المساحة الكلية: ${total}π ≈ ${timesPi(total).replace(',', '.')} سم².`))
        : l(say('Sortzailea ez da osoa: bilatu hirukote pitagoriko bat.', 'La generatriz no es entera: busca una terna pitagórica.', 'الراسم ليس عددًا صحيحًا: ابحث عن ثلاثية فيثاغورية.'))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={roundChallenges} state={state}>
            <Board height={330} label={l(roundNames[body])}>
                {body === 'cylinder' && <Cylinder cam={cam} r={r} h={h} />}
                {body === 'cone' && (
                    <g>
                        <Cone cam={cam} r={r} h={h} />
                        <Segment3 cam={cam} a={[0, 0, 0]} b={[0, h, 0]} color={STAGE} dashed />
                        <Segment3 cam={cam} a={[0, 0, 0]} b={[r * RIGHT[0], 0, r * RIGHT[2]]} color={STAGE} />
                        <Segment3 cam={cam} a={[r * RIGHT[0], 0, r * RIGHT[2]]} b={[0, h, 0]} color={SECOND} width={3} />
                    </g>
                )}
                {body === 'sphere' && (
                    <g>
                        <Cylinder cam={cam} r={r} h={2 * r} base={-r} fill="none" top="none" stroke={MUTED} />
                        <Sphere cam={cam} r={r} />
                    </g>
                )}
                {net}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 6. The tank in litres ---------- */

export function TankTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TankState>(initialTankState)
    const { a, b, c } = state
    const litres = tankLitres(state)
    const cam = fitCamera(boxVertices(a, b, c), [140, 30, 500, 300], 26)
    const controls = (
        <>
            <Stepper label={l(say('Luzera (dm)', 'Largo (dm)', 'الطول (دسم)'))} value={a} min={1} max={TANK_MAX} onChange={(value) => setState((s) => setTank(s, { a: value }))} language={props.language} />
            <Stepper label={l(say('Zabalera (dm)', 'Ancho (dm)', 'العرض (دسم)'))} value={b} min={1} max={TANK_MAX} onChange={(value) => setState((s) => setTank(s, { b: value }))} language={props.language} />
            <Stepper label={l(say('Altuera (dm)', 'Alto (dm)', 'الارتفاع (دسم)'))} value={c} min={1} max={TANK_MAX} onChange={(value) => setState((s) => setTank(s, { c: value }))} language={props.language} />
        </>
    )
    const cubic = String(litres / 1000).replace('.', ',')
    const note = l(say(`${litres} L = ${cubic} m³ = ${litres * 1000} cm³. Ur-geruza bakoitzak ${a * b} L ditu.`, `${litres} L = ${cubic} m³ = ${litres * 1000} cm³. Cada capa de agua tiene ${a * b} L.`, `${litres} L = ${cubic.replace(',', '.')} m³ = ${litres * 1000} cm³. في كل طبقة ماء ${a * b} L.`))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={`${a}\\cdot ${b}\\cdot ${c}=${litres}\\ \\text{dm}^{3}=${litres}\\ \\text{L}`} note={note} />} challenges={tankChallenges} state={state}>
            <Board height={320} label={l(say('Depositua dezimetro kubikoetan', 'El depósito en decímetros cúbicos', 'الخزان بالديسيمترات المكعبة'))}>
                <GridBox cam={cam} a={a} b={b} c={c} fill={SKY} />
            </Board>
        </ToolFrame>
    )
}

/* ---------- 7. Comparing volumes ---------- */

const volumeNames: Record<VolumeBody, Text> = {
    prism: say('Prisma', 'Prisma', 'منشور'),
    pyramid: say('Piramidea', 'Pirámide', 'هرم'),
    cylinder: say('Zilindroa', 'Cilindro', 'أسطوانة'),
    cone: say('Konoa', 'Cono', 'مخروط'),
    sphere: say('Esfera', 'Esfera', 'كرة')
}

export function VolumeTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<VolumeState>(initialVolumeState)
    const { body, r, h } = state
    const { thirds, pi } = volumeThirds(state)
    const { value, exact } = volumeHundredths(state)
    const square = body === 'prism' || body === 'pyramid'
    const hull = square ? boxVertices(r, r, h) : body === 'sphere' ? roundHull(r, -r, r) : roundHull(r, 0, h)
    const cam = fitCamera(hull, [170, 30, 470, 310], 60)
    const ghost = square ? <Solid cam={cam} vertices={boxVertices(r, r, h)} fill="none" opacity={0} stroke={MUTED} width={1.3} /> : null
    const controls = (
        <>
            <Segmented label={l(say('Gorputza', 'Cuerpo', 'الجسم'))} value={body} options={(['prism', 'pyramid', 'cylinder', 'cone', 'sphere'] as VolumeBody[]).map((item) => ({ value: item, label: l(volumeNames[item]) }))} onChange={(item) => setState((s) => setVolume(s, { body: item }))} />
            <Stepper label={square ? l(say('Oinarriaren aldea', 'Lado de la base', 'ضلع القاعدة')) : l(say('Erradioa', 'Radio', 'نصف القطر'))} value={r} min={1} max={VOLUME_MAX} onChange={(item) => setState((s) => setVolume(s, { r: item }))} language={props.language} />
            {body !== 'sphere' && <Stepper label={l(say('Altuera', 'Altura', 'الارتفاع'))} value={h} min={1} max={VOLUME_MAX} onChange={(item) => setState((s) => setVolume(s, { h: item }))} language={props.language} />}
        </>
    )
    const piText = pi ? '\\pi' : ''
    const formula: Record<VolumeBody, string> = {
        prism: `V=${r}^{2}\\cdot ${h}`,
        pyramid: `V=\\frac{${r}^{2}\\cdot ${h}}{3}`,
        cylinder: `V=\\pi\\cdot ${r}^{2}\\cdot ${h}`,
        cone: `V=\\frac{\\pi\\cdot ${r}^{2}\\cdot ${h}}{3}`,
        sphere: `V=\\frac{4\\pi\\cdot ${r}^{3}}{3}`
    }
    const amount = thirds % 3 === 0 ? `${thirds / 3}${piText}` : `\\frac{${thirds}}{3}${piText}`
    const latex = `${formula[body]}=${amount}${pi || !exact ? `\\approx ${tex(fromHundredths(value))}` : ''}`
    const note = l(say(
        `Bolumena: ${fromHundredths(value)} cm³${exact ? '' : ' gutxi gorabehera'}.`,
        `Volumen: ${exact ? '' : 'unos '}${fromHundredths(value)} cm³.`,
        `الحجم: ${exact ? '' : 'نحو '}${fromHundredths(value).replace(',', '.')} سم³.`
    ))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout language={props.language} latex={latex} note={note} />} challenges={volumeChallenges} state={state}>
            <Board height={330} label={l(volumeNames[body])}>
                {body === 'prism' && <Solid cam={cam} vertices={boxVertices(r, r, h)} fill={SKY} />}
                {body === 'pyramid' && <>{ghost}<Solid cam={cam} vertices={pyramidVertices(4, (r / 2) * Math.SQRT2, h, Math.PI / 4)} fill={SOFT} /></>}
                {body === 'cylinder' && <Cylinder cam={cam} r={r} h={h} />}
                {body === 'cone' && <><Cylinder cam={cam} r={r} h={h} fill="none" top="none" stroke={MUTED} /><Cone cam={cam} r={r} h={h} fill={ROSE} /></>}
                {body === 'sphere' && <><Cylinder cam={cam} r={r} h={2 * r} base={-r} fill="none" top="none" stroke={MUTED} /><Sphere cam={cam} r={r} /></>}
            </Board>
        </ToolFrame>
    )
}
