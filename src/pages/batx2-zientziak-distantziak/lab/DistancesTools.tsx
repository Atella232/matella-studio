import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { fraction, toLatex } from '../../../features/unit-v2/math/fraction'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { Board3D } from '../../batx2-zientziak-bektoreak/space/Board3D'
import { SPACE, type SceneItem } from '../../batx2-zientziak-bektoreak/space/scene'
import { arrow } from '../../batx2-zientziak-bektoreak/space/sceneKit'
import { add, dot, norm, scale, sub, type Vec3 } from '../../batx2-zientziak-bektoreak/space/vec3'
import '../../batx2-zientziak-planoak/lab/PlanesTools.css'
import { degreesLatex, levelLatex, minus, pointLatex, rootLatex, say, toNumbers, vec, wrap } from './common'
import { distanceSquare, FOOT_LEVEL_LIMIT, FOOT_LIMIT, FOOT_POINT_LIMIT, footChallenges, footExtra, footParameter, footPoint, footPrediction, initialFootState, setFootLevel, setFootMode, setFootPart, type FootMode, type FootPartName, type FootState } from './foot'
import { initialMirrorState, MIRROR_LEVEL_LIMIT, MIRROR_LIMIT, MIRROR_POINT_LIMIT, mirrorChallenges, mirrorExtra, mirrorFoot, mirrorImage, mirrorLabel, mirrorPrediction, setMirrorLevel, setMirrorPart, type MirrorPartName, type MirrorState } from './mirror'
import { ANGLE_LIMIT, angleDegrees, angleKind, angleSquares, initialProtractorState, protractorChallenges, protractorExtra, protractorPrediction, setAngleMode, setAngleVector, type AngleMode, type ProtractorState } from './protractor'
import { initialRulerState, RULER_LEVEL_LIMIT, rulerChallenges, rulerExtra, rulerPrediction, setRulerLevel, type RulerState } from './ruler'
import { BOX_LIMIT, BOX_POINT_LIMIT, initialSkewBoxState, isParallel, setSkewPart, skewBoxChallenges, skewBoxExtra, skewCross, skewMixed, skewPrediction, skewSquare, slideB, type SkewBoxState, type SkewPartName } from './skewBox'

/* ==========================================================================
   Angeluak eta distantziak · Batxilergoa 2 · Zientziak — the five
   laboratory tools, all drawn on the 3D board of the Espacio block (drag
   to turn it). The equations of what is on the board are written above
   it; each tool asks for a prediction before it shows the result. Logic
   in protractor.ts, foot.ts, mirror.ts, ruler.ts and skewBox.ts.
   ========================================================================== */

const BOARD_HEIGHT = 320

function Equations({ lines }: { lines: string[] }) {
    return (
        <div className="planoak-lab-equations">
            {lines.map((line) => <MathText key={line} text={`$${line}$`} />)}
        </div>
    )
}

function VectorEditor<Name extends string>({ names, value, limit, language, label, onPick, onChange, current }: {
    names: Name[]
    current: Name
    value: Vec3
    limit: number
    language: UnitLanguage
    label: LocalizedText
    onPick: (name: Name) => void
    onChange: (value: Vec3) => void
}) {
    const l = useLabText(language)
    const coordinate = (index: 0 | 1 | 2) => (next: number) => {
        const copy: [number, number, number] = [value[0], value[1], value[2]]
        copy[index] = next
        onChange(copy)
    }
    return (
        <>
            <Segmented label={l(label)} value={current} options={names.map((name) => ({ value: name, label: name }))} onChange={onPick} />
            {(['x', 'y', 'z'] as const).map((axis, index) => (
                <Stepper key={axis} label={`${current} · ${axis}`} value={value[index]} min={-limit} max={limit} format={minus} onChange={coordinate(index as 0 | 1 | 2)} language={language} />
            ))}
        </>
    )
}

const EDIT_PART = say('Aldatu', 'Cambia', 'غيّر', 'Change')
const SHAPE = say('Zer', 'Qué', 'ماذا', 'What')
const along = (from: Vec3, direction: Vec3, length: number): Vec3 => add(from, scale(length / norm(direction), direction))
const fractionLatex = (top: number, bottom: number) => toLatex(fraction(top, bottom))
/** A plane n·X = d for the board, through its point closest to the origin */
const planeItem = (n: Vec3, d: number, color: string, opacity = 0.28): SceneItem => ({ kind: 'plane', point: scale(d / dot(n, n), n), normal: n, color, opacity })

/* ---------- L1. The 3D protractor ---------- */

const ANGLE_MODES: Array<{ value: AngleMode; label: LocalizedText }> = [
    { value: 'lines', label: say('Bi zuzen', 'Dos rectas', 'مستقيمان', 'Two lines') },
    { value: 'line-plane', label: say('Zuzena eta planoa', 'Recta y plano', 'مستقيم ومستوى', 'Line and plane') },
    { value: 'planes', label: say('Bi plano', 'Dos planos', 'مستويان', 'Two planes') }
]

export function ProtractorTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ProtractorState>(initialProtractorState)
    const [editing, setEditing] = useState<'a' | 'b'>('b')
    const shown = state.prediction !== null
    const names = state.mode === 'lines' ? ['u', 'v'] : state.mode === 'line-plane' ? ['u', 'n'] : ['n₁', 'n₂']
    const tex = state.mode === 'lines' ? ['\\vec{u}', '\\vec{v}'] : state.mode === 'line-plane' ? ['\\vec{u}', '\\vec{n}'] : ['\\vec{n}_1', '\\vec{n}_2']
    const [, bottom] = angleSquares(state)
    const product = dot(state.a, state.b) + 0
    const kind = angleKind(state)
    const controls = (
        <>
            <Segmented label={l(SHAPE)} value={state.mode} options={ANGLE_MODES.map((mode) => ({ value: mode.value, label: l(mode.label) }))} onChange={(mode) => setState((s) => setAngleMode(s, mode))} />
            <Segmented label={l(EDIT_PART)} value={editing} options={[{ value: 'a', label: names[0] }, { value: 'b', label: names[1] }]} onChange={setEditing} />
            {(['x', 'y', 'z'] as const).map((axis, index) => (
                <Stepper key={axis} label={`${names[editing === 'a' ? 0 : 1]} · ${axis}`} value={state[editing][index]} min={-ANGLE_LIMIT} max={ANGLE_LIMIT} format={minus} language={props.language} onChange={(next) => setState((s) => {
                    const copy: [number, number, number] = [s[editing][0], s[editing][1], s[editing][2]]
                    copy[index] = next
                    return setAngleVector(s, editing, copy)
                })} />
            ))}
        </>
    )
    const trig = state.mode === 'line-plane' ? '\\sin' : '\\cos'
    const lines = [
        `${tex[0]}\\cdot ${tex[1]}=${product}`,
        `${trig}\\alpha=\\frac{|${product}|}{\\sqrt{${dot(state.a, state.a)}}\\,\\sqrt{${dot(state.b, state.b)}}}`,
        `\\alpha${degreesLatex(angleDegrees(state), props.language)}`
    ]
    const notes = {
        zero: say('Angelua $0^\\circ$ da: paraleloak.', 'El ángulo es $0^\\circ$: paralelos.', 'الزاوية $0^\\circ$: متوازيان.', 'The angle is $0^\\circ$: parallel.'),
        acute: say('Angelu zorrotza, $0^\\circ$ eta $90^\\circ$ artean.', 'Un ángulo agudo, entre $0^\\circ$ y $90^\\circ$.', 'زاوية حادة بين $0^\\circ$ و$90^\\circ$.', 'An acute angle, between $0^\\circ$ and $90^\\circ$.'),
        right: say('Perpendikularrak: $90^\\circ$.', 'Perpendiculares: $90^\\circ$.', 'متعامدان: $90^\\circ$.', 'Perpendicular: $90^\\circ$.')
    }
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: angelua $0^\\circ$ da, zorrotza ala $90^\\circ$?', 'Antes de verlo: ¿el ángulo es $0^\\circ$, agudo o $90^\\circ$?', 'قبل أن ترى: هل الزاوية $0^\\circ$ أم حادة أم $90^\\circ$؟', 'Before you see it: is the angle $0^\\circ$, acute or $90^\\circ$?')}
            labels={{ '<': say('0 gradu', '0 grados', '0 درجة', '0 degrees'), '=': say('Zorrotza', 'Agudo', 'حادة', 'Acute'), '>': say('90 gradu', '90 grados', '90 درجة', '90 degrees') }}
            actual={protractorPrediction(state)}
            choice={state.prediction}
            tip={state.mode === 'line-plane'
                ? say('$\\vec{u}\\cdot\\vec{n}=0$ bada, $0^\\circ$; $\\vec{u}$ normalaren paraleloa bada, $90^\\circ$.', 'Si $\\vec{u}\\cdot\\vec{n}=0$, $0^\\circ$; si $\\vec{u}$ es paralelo al normal, $90^\\circ$.', 'إذا كان $\\vec{u}\\cdot\\vec{n}=0$ فـ $0^\\circ$؛ وإذا وازى $\\vec{u}$ الناظم فـ $90^\\circ$.', 'If $\\vec{u}\\cdot\\vec{n}=0$, $0^\\circ$; if $\\vec{u}$ is parallel to the normal, $90^\\circ$.')
                : say('Biderkadura eskalarra 0 bada, $90^\\circ$; bektoreak paraleloak badira, $0^\\circ$.', 'Si el producto escalar es 0, $90^\\circ$; si los vectores son paralelos, $0^\\circ$.', 'إذا كان الجداء السلمي 0 فـ $90^\\circ$؛ وإذا توازى المتجهان فـ $0^\\circ$.', 'If the dot product is 0, $90^\\circ$; if the vectors are parallel, $0^\\circ$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={lines} note={l(notes[kind])} />
        </Predict>
    )
    const origin: Vec3 = [0, 0, 0]
    const scene: SceneItem[] = []
    if (state.mode === 'lines') {
        scene.push({ kind: 'line', point: origin, direction: scale(-1, state.a), color: SPACE.red, width: 2.6, label: 'r' }, { kind: 'line', point: origin, direction: scale(-1, state.b), color: SPACE.blue, width: 2.6, label: 's' })
        scene.push(arrow(origin, along(origin, state.a, 2), SPACE.red, 'u'), arrow(origin, along(origin, product < 0 ? scale(-1, state.b) : state.b, 2), SPACE.blue, 'v'))
        if (shown && kind === 'acute') scene.push({ kind: 'arc', at: origin, u: state.a, v: product < 0 ? scale(-1, state.b) : state.b, radius: 1.1, color: SPACE.violet, label: 'α' })
    } else if (state.mode === 'line-plane') {
        const shadow = sub(state.a, scale(product / bottom * dot(state.a, state.a), state.b))
        scene.push(planeItem(state.b, 0, SPACE.planeGreen, 0.3), { kind: 'line', point: origin, direction: scale(-1, state.a), color: SPACE.violet, width: 2.8, label: 'r' })
        scene.push(arrow(origin, along(origin, state.b, 1.8), SPACE.mustard, 'n'))
        if (shown && kind === 'acute') scene.push({ kind: 'segment', from: origin, to: along(origin, shadow, 2.4), color: SPACE.muted, dashed: true }, { kind: 'arc', at: origin, u: state.a, v: shadow, radius: 1.2, color: SPACE.red, label: 'α' })
    } else {
        scene.push(planeItem(state.a, 0, SPACE.planeBlue, 0.22), planeItem(state.b, 0, SPACE.planeMustard, 0.26))
        scene.push(arrow(origin, along(origin, state.a, 2), SPACE.blue, 'n₁'), arrow(origin, along(origin, product < 0 ? scale(-1, state.b) : state.b, 2), SPACE.mustard, 'n₂'))
        if (shown && kind === 'acute') scene.push({ kind: 'arc', at: origin, u: state.a, v: product < 0 ? scale(-1, state.b) : state.b, radius: 1, color: SPACE.violet, label: 'α' })
    }
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={protractorChallenges} extraChallenges={protractorExtra} state={state}>
            <Equations lines={[`${tex[0]}=${vec(state.a)}\\qquad ${tex[1]}=${vec(state.b)}`]} />
            <Board3D scene={scene} language={props.language} range={4} height={BOARD_HEIGHT} label={l(say(`${names[0]}${vec(state.a)} eta ${names[1]}${vec(state.b)} bektoreen angelua`, `El ángulo de ${names[0]}${vec(state.a)} y ${names[1]}${vec(state.b)}`, `الزاوية بين ${names[0]}${vec(state.a)} و${names[1]}${vec(state.b)}`, `The angle of ${names[0]}${vec(state.a)} and ${names[1]}${vec(state.b)}`))} />
        </ToolFrame>
    )
}

/* ---------- Shared by L2 and L4: a point and a plane or a line ---------- */

const FOOT_MODES: Array<{ value: FootMode; label: LocalizedText }> = [
    { value: 'plane', label: say('Planoa', 'Plano', 'مستوى', 'Plane') },
    { value: 'line', label: say('Zuzena', 'Recta', 'مستقيم', 'Line') }
]

function FootControls<State extends FootState>({ state, setState, editing, setEditing, language, levelLimit, setLevel }: {
    state: State
    setState: (update: (state: State) => State) => void
    editing: FootPartName
    setEditing: (name: FootPartName) => void
    language: UnitLanguage
    levelLimit: number
    setLevel: (state: State, d: number) => State
}) {
    const l = useLabText(language)
    const names: FootPartName[] = state.mode === 'plane' ? ['P', 'n'] : ['P', 'A', 'u']
    const current = names.includes(editing) ? editing : 'P'
    const value = { P: state.p, n: state.n, A: state.a, u: state.u }[current]
    return (
        <>
            <Segmented label={l(SHAPE)} value={state.mode} options={FOOT_MODES.map((mode) => ({ value: mode.value, label: l(mode.label) }))} onChange={(mode) => setState((s) => setFootMode(s, mode))} />
            <VectorEditor names={names} current={current} value={value} limit={current === 'P' ? FOOT_POINT_LIMIT : FOOT_LIMIT} language={language} label={EDIT_PART} onPick={setEditing} onChange={(next) => setState((s) => setFootPart(s, current, next))} />
            {state.mode === 'plane' && <Stepper label="d" value={state.d} min={-levelLimit} max={levelLimit} format={minus} onChange={(d) => setState((s) => setLevel(s, d))} language={language} />}
        </>
    )
}

const footEquations = (state: FootState) => [state.mode === 'plane' ? `\\pi\\colon ${levelLatex(state.n, state.d)}` : `r\\colon ${vec(state.a)}+t\\,${vec(state.u)}`, `P=${vec(state.p)}`]

function footScene(state: FootState, shown: boolean): SceneItem[] {
    const m = toNumbers(footPoint(state))
    const scene: SceneItem[] = state.mode === 'plane'
        ? [planeItem(state.n, state.d, SPACE.planeBlue, 0.28), arrow(m, along(m, state.n, 1.4), SPACE.mustard, 'n')]
        : [{ kind: 'line', point: state.a, direction: scale(-1, state.u), color: SPACE.violet, width: 3, label: 'r' }, { kind: 'point', at: state.a, label: 'A', color: SPACE.ink }]
    scene.push({ kind: 'point', at: state.p, label: 'P', color: SPACE.red })
    if (shown) scene.push({ kind: 'segment', from: state.p, to: m, color: SPACE.red, dashed: true }, { kind: 'point', at: m, label: 'M', color: SPACE.blue })
    return scene
}

/* ---------- L2. The foot of the perpendicular ---------- */

export function FootTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<FootState>(initialFootState)
    const [editing, setEditing] = useState<FootPartName>('P')
    const shown = state.prediction !== null
    const [top, bottom] = footParameter(state)
    const [dTop, dBottom] = distanceSquare(state)
    const controls = <FootControls state={state} setState={setState} editing={editing} setEditing={setEditing} language={props.language} levelLimit={FOOT_LEVEL_LIMIT} setLevel={setFootLevel} />
    const lines = [
        state.mode === 'plane' ? `t=\\frac{d-\\vec{n}\\cdot P}{|\\vec{n}|^2}=${fractionLatex(top, bottom)}` : `t=\\frac{\\overrightarrow{AP}\\cdot\\vec{u}}{|\\vec{u}|^2}=${fractionLatex(top, bottom)}`,
        `M=${pointLatex(footPoint(state))}`,
        `|\\overrightarrow{PM}|=${rootLatex(dTop, dBottom, props.language)}`
    ]
    const z = footPoint(state)[2].numerator
    const note = z === 0 ? say('$M$ lurrean dago.', '$M$ está en el suelo.', '$M$ على الأرض.', '$M$ is on the floor.') : z > 0 ? say('$M$ lurraren gainean dago.', '$M$ está por encima del suelo.', '$M$ فوق الأرض.', '$M$ is above the floor.') : say('$M$ lurraren azpian dago.', '$M$ está por debajo del suelo.', '$M$ تحت الأرض.', '$M$ is below the floor.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: $M$ oina lurraren azpian, lurrean ala gainean dago?', 'Antes de verlo: ¿el pie $M$ queda debajo del suelo, en el suelo o encima?', 'قبل أن ترى: هل المسقط $M$ تحت الأرض أم عليها أم فوقها؟', 'Before you see it: is the foot $M$ below the floor, on it or above it?')}
            labels={{ '<': say('Azpian', 'Debajo', 'تحتها', 'Below'), '=': say('Lurrean', 'En el suelo', 'عليها', 'On it'), '>': say('Gainean', 'Encima', 'فوقها', 'Above') }}
            actual={footPrediction(state)}
            choice={state.prediction}
            tip={say('Jaitsi $P$ puntutik perpendikularra, normalaren edo $\\vec{u}$ bektorearen norabideari begira.', 'Baja la perpendicular desde $P$, mirando la dirección del normal o de $\\vec{u}$.', 'أنزل العمودي من $P$ وانظر إلى اتجاه الناظم أو $\\vec{u}$.', 'Drop the perpendicular from $P$, looking at the direction of the normal or of $\\vec{u}$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={lines} note={l(note)} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={footChallenges} extraChallenges={footExtra} state={state}>
            <Equations lines={footEquations(state)} />
            <Board3D scene={footScene(state, shown)} language={props.language} range={5} height={BOARD_HEIGHT} label={l(say(`P${vec(state.p)} puntua eta haren perpendikularraren oina`, `El punto P${vec(state.p)} y el pie de su perpendicular`, `النقطة P${vec(state.p)} ومسقط عمودها`, `The point P${vec(state.p)} and the foot of its perpendicular`))} />
        </ToolFrame>
    )
}

/* ---------- L3. The mirror ---------- */

export function MirrorTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<MirrorState>(initialMirrorState)
    const [editing, setEditing] = useState<MirrorPartName>('P')
    const shown = state.prediction !== null
    const value = { P: state.p, Q: state.q, n: state.n }[editing]
    const controls = (
        <>
            <VectorEditor names={['P', 'Q', 'n'] as MirrorPartName[]} current={editing} value={value} limit={editing === 'n' ? MIRROR_LIMIT : MIRROR_POINT_LIMIT} language={props.language} label={EDIT_PART} onPick={setEditing} onChange={(next) => setState((s) => setMirrorPart(s, editing, next))} />
            <Stepper label="d" value={state.d} min={-MIRROR_LEVEL_LIMIT} max={MIRROR_LEVEL_LIMIT} format={minus} onChange={(d) => setState((s) => setMirrorLevel(s, d))} language={props.language} />
        </>
    )
    const m = mirrorFoot(state, state.p)
    const image = mirrorImage(state, state.p)
    const imageQ = mirrorImage(state, state.q)
    const lines = [`M=${pointLatex(m)}`, `P'=2M-P=${pointLatex(image)}`, `Q'=${pointLatex(imageQ)}`]
    const z = image[2].numerator
    const note = z === 0 ? say('$P\'$ lurrean dago.', '$P\'$ está en el suelo.', '$P\'$ على الأرض.', '$P\'$ is on the floor.') : z > 0 ? say('$P\'$ lurraren gainean dago.', '$P\'$ está por encima del suelo.', '$P\'$ فوق الأرض.', '$P\'$ is above the floor.') : say('$P\'$ lurraren azpian dago.', '$P\'$ está por debajo del suelo.', '$P\'$ تحت الأرض.', '$P\'$ is below the floor.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: $P\'$ lurraren azpian, lurrean ala gainean geratzen da?', 'Antes de verlo: ¿$P\'$ queda debajo del suelo, en el suelo o encima?', 'قبل أن ترى: هل تقع $P\'$ تحت الأرض أم عليها أم فوقها؟', 'Before you see it: does $P\'$ end up below the floor, on it or above it?')}
            labels={{ '<': say('Azpian', 'Debajo', 'تحتها', 'Below'), '=': say('Lurrean', 'En el suelo', 'عليها', 'On it'), '>': say('Gainean', 'Encima', 'فوقها', 'Above') }}
            actual={mirrorPrediction(state)}
            choice={state.prediction}
            tip={say('$P\'$ ispiluaren beste aldean dago, distantzia berera: $P\'=2M-P$.', '$P\'$ está al otro lado del espejo, a la misma distancia: $P\'=2M-P$.', '$P\'$ في الجهة الأخرى من المرآة وعلى البعد نفسه: $P\'=2M-P$.', '$P\'$ is on the other side of the mirror, at the same distance: $P\'=2M-P$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={lines} note={l(note)} />
        </Predict>
    )
    const scene: SceneItem[] = [
        planeItem(state.n, state.d, SPACE.planeBlue, 0.3),
        { kind: 'segment', from: state.p, to: state.q, color: SPACE.red, width: 3 },
        { kind: 'point', at: state.p, label: 'P', color: SPACE.red },
        { kind: 'point', at: state.q, label: 'Q', color: SPACE.red }
    ]
    if (shown) {
        const [p2, q2] = [toNumbers(image), toNumbers(imageQ)]
        scene.push({ kind: 'segment', from: state.p, to: p2, color: SPACE.muted, dashed: true }, { kind: 'segment', from: p2, to: q2, color: SPACE.green, width: 3 }, { kind: 'point', at: toNumbers(m), label: 'M', color: SPACE.ink }, { kind: 'point', at: p2, label: "P'", color: SPACE.green }, { kind: 'point', at: q2, label: "Q'", color: SPACE.green })
    }
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={mirrorChallenges} extraChallenges={mirrorExtra} state={state}>
            <Equations lines={[`\\pi\\colon ${mirrorLabel(state)}`, `P=${vec(state.p)}\\qquad Q=${vec(state.q)}`]} />
            <Board3D scene={scene} language={props.language} range={6} height={BOARD_HEIGHT} label={l(say(`${mirrorLabel(state).replace('{z}', 'z')} ispilua, PQ zuzenkia eta haren irudia`, `El espejo ${mirrorLabel(state).replace('{z}', 'z')}, el segmento PQ y su imagen`, `المرآة ${mirrorLabel(state).replace('{z}', 'z')} والقطعة PQ وصورتها`, `The mirror ${mirrorLabel(state).replace('{z}', 'z')}, the segment PQ and its image`))} />
        </ToolFrame>
    )
}

/* ---------- L4. The distance ruler ---------- */

export function RulerTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RulerState>(initialRulerState)
    const [editing, setEditing] = useState<FootPartName>('P')
    const shown = state.prediction !== null
    const [top, bottom] = distanceSquare(state)
    const controls = <FootControls state={state} setState={setState} editing={editing} setEditing={setEditing} language={props.language} levelLimit={RULER_LEVEL_LIMIT} setLevel={setRulerLevel} />
    const value = dot(state.n, state.p) + 0
    const lines = state.mode === 'plane'
        ? [`d=\\frac{|${value}-${wrap(state.d)}|}{\\sqrt{${bottom}}}`, `d=${rootLatex(top, bottom, props.language)}`]
        : [`|\\overrightarrow{AP}\\times\\vec{u}|=\\sqrt{${top}}`, `|\\vec{u}|=\\sqrt{${bottom}}`, `d=${rootLatex(top, bottom, props.language)}`]
    const note = top === 9 * bottom ? say('Distantzia zehazki 3 da.', 'La distancia es justo 3.', 'المسافة 3 بالضبط.', 'The distance is exactly 3.') : top < 9 * bottom ? say('Distantzia 3 baino txikiagoa da.', 'La distancia es menor que 3.', 'المسافة أصغر من 3.', 'The distance is less than 3.') : say('Distantzia 3 baino handiagoa da.', 'La distancia es mayor que 3.', 'المسافة أكبر من 3.', 'The distance is more than 3.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: distantzia 3 baino txikiagoa, 3 ala handiagoa da?', 'Antes de verlo: ¿la distancia es menor que 3, 3 o mayor?', 'قبل أن ترى: هل المسافة أصغر من 3 أم 3 أم أكبر؟', 'Before you see it: is the distance less than 3, 3 or more?')}
            labels={{ '<': say('Txikiagoa', 'Menor', 'أصغر', 'Less'), '=': say('3', '3', '3', '3'), '>': say('Handiagoa', 'Mayor', 'أكبر', 'More') }}
            actual={rulerPrediction(state)}
            choice={state.prediction}
            tip={state.mode === 'plane'
                ? say('Ordezkatu $P$ ekuazioan eta zatitu $|\\vec{n}|$ zenbakiaz.', 'Sustituye $P$ en la ecuación y divide entre $|\\vec{n}|$.', 'عوّض $P$ في المعادلة واقسم على $|\\vec{n}|$.', 'Put $P$ into the equation and divide by $|\\vec{n}|$.')
                : say('Paralelogramoaren azalera zati oinarria.', 'Área del paralelogramo entre la base.', 'مساحة متوازي الأضلاع على القاعدة.', 'Area of the parallelogram divided by the base.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={lines} note={l(note)} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={rulerChallenges} extraChallenges={rulerExtra} state={state}>
            <Equations lines={footEquations(state)} />
            <Board3D scene={footScene(state, shown)} language={props.language} range={5} height={BOARD_HEIGHT} label={l(say(`P${vec(state.p)} puntua eta haren distantzia`, `El punto P${vec(state.p)} y su distancia`, `النقطة P${vec(state.p)} ومسافتها`, `The point P${vec(state.p)} and its distance`))} />
        </ToolFrame>
    )
}

/* ---------- L5. The box of skew lines ---------- */

export function SkewBoxTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SkewBoxState>(initialSkewBoxState)
    const [editing, setEditing] = useState<SkewPartName>('B')
    const shown = state.prediction !== null
    const playback = usePlayback(`${vec(state.b)}${vec(state.u)}${vec(state.v)}`, 1800)
    const lambda = shown && playback.progress !== null ? 2 * playback.progress : 0
    const b = slideB(state, lambda)
    const value = { B: state.b, u: state.u, v: state.v }[editing]
    const [top, bottom] = skewSquare(state)
    const parallel = isParallel(state)
    const controls = <VectorEditor names={['B', 'u', 'v'] as SkewPartName[]} current={editing} value={value} limit={editing === 'B' ? BOX_POINT_LIMIT : BOX_LIMIT} language={props.language} label={EDIT_PART} onPick={setEditing} onChange={(next) => setState((s) => setSkewPart(s, editing, next))} />
    const lines = parallel
        ? ['\\vec{u}\\times\\vec{v}=\\vec{0}', `d=\\frac{|\\overrightarrow{AB}\\times\\vec{u}|}{|\\vec{u}|}=${rootLatex(top, bottom, props.language)}`]
        : [`[\\overrightarrow{AB},\\vec{u},\\vec{v}]=${skewMixed(state)}`, `\\vec{u}\\times\\vec{v}=${vec(skewCross(state))}`, `d=\\frac{|[\\overrightarrow{AB},\\vec{u},\\vec{v}]|}{|\\vec{u}\\times\\vec{v}|}=${rootLatex(top, bottom, props.language)}`]
    const note = parallel
        ? say('Zuzen paraleloak: kutxarik ez; $B$ puntutik $r$ zuzenerako distantzia.', 'Rectas paralelas: no hay caja; la distancia de $B$ a $r$.', 'مستقيمان متوازيان: لا صندوق؛ المسافة من $B$ إلى $r$.', 'Parallel lines: no box; the distance from $B$ to $r$.')
        : skewMixed(state) === 0
            ? say('Kutxa zapalduta dago: zuzenak ebakitzen dira.', 'La caja está aplastada: las rectas se cortan.', 'الصندوق منضغط: المستقيمان متقاطعان.', 'The box is flat: the lines meet.')
            : say('Altuera da distantzia: $B$ zuzenean mugitzean ez da aldatzen.', 'La altura es la distancia: no cambia al mover $B$ por su recta.', 'الارتفاع هو المسافة: لا يتغير عند تحريك $B$ على مستقيمه.', 'The height is the distance: it does not change when $B$ moves along its line.')
    const readout = (
        <>
            <Predict
                language={props.language}
                question={say('Ikusi aurretik: zuzenen arteko distantzia 2 baino txikiagoa, 2 ala handiagoa da?', 'Antes de verlo: ¿la distancia entre las rectas es menor que 2, 2 o mayor?', 'قبل أن ترى: هل المسافة بين المستقيمين أصغر من 2 أم 2 أم أكبر؟', 'Before you see it: is the distance between the lines less than 2, 2 or more?')}
                labels={{ '<': say('Txikiagoa', 'Menor', 'أصغر', 'Less'), '=': say('2', '2', '2', '2'), '>': say('Handiagoa', 'Mayor', 'أكبر', 'More') }}
                actual={skewPrediction(state)}
                choice={state.prediction}
                tip={say('Bolumena $|[\\overrightarrow{AB},\\vec{u},\\vec{v}]|$ zati oinarria $|\\vec{u}\\times\\vec{v}|$.', 'Volumen $|[\\overrightarrow{AB},\\vec{u},\\vec{v}]|$ entre la base $|\\vec{u}\\times\\vec{v}|$.', 'الحجم $|[\\overrightarrow{AB},\\vec{u},\\vec{v}]|$ على القاعدة $|\\vec{u}\\times\\vec{v}|$.', 'Volume $|[\\overrightarrow{AB},\\vec{u},\\vec{v}]|$ divided by the base $|\\vec{u}\\times\\vec{v}|$.')}
                onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
            >
                <Readout latex={lines} note={l(note)} />
            </Predict>
            {shown && !parallel && <PlayButton label={l(say('Mugitu B zuzenean', 'Mueve B por su recta', 'حرّك B على مستقيمه', 'Move B along its line'))} disabled={false} playing={playback.playing} onPlay={playback.play} />}
        </>
    )
    const origin: Vec3 = [0, 0, 0]
    const scene: SceneItem[] = [
        { kind: 'line', point: origin, direction: scale(-1, state.u), color: SPACE.red, width: 3, label: 'r' },
        { kind: 'line', point: state.b, direction: scale(-1, state.v), color: SPACE.blue, width: 3, label: 's' },
        ...(parallel ? [] : [{ kind: 'box' as const, origin, edges: [state.u, state.v, b] as const, color: SPACE.planeGreen, opacity: 0.16 }]),
        arrow(origin, b, SPACE.violet, ''),
        { kind: 'point', at: origin, label: 'A', color: SPACE.ink },
        { kind: 'point', at: b, label: 'B', color: SPACE.ink }
    ]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={skewBoxChallenges} extraChallenges={skewBoxExtra} state={state}>
            <Equations lines={[`r\\colon t\\,${vec(state.u)}`, `s\\colon ${vec(state.b)}+\\lambda\\,${vec(state.v)}`]} />
            <Board3D scene={scene} language={props.language} range={5} height={BOARD_HEIGHT} label={l(say(`r eta s zuzenak eta AB, u eta v bektoreen kutxa`, `Las rectas r y s y la caja de AB, u y v`, `المستقيمان r وs وصندوق AB وu وv`, `The lines r and s and the box of AB, u and v`))} />
        </ToolFrame>
    )
}
