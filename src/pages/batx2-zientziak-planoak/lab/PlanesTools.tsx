import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { toLatex } from '../../../features/unit-v2/math/fraction'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { Board3D } from '../../batx2-zientziak-bektoreak/space/Board3D'
import { SPACE, type SceneItem } from '../../batx2-zientziak-bektoreak/space/scene'
import { arrow } from '../../batx2-zientziak-bektoreak/space/sceneKit'
import { add, dot, norm, scale, sub, type Vec3 } from '../../batx2-zientziak-bektoreak/space/vec3'
import { insideBox, levelLatex, minus, pointLatex, say, toNumbers, vec, wrap } from './common'
import { cutOrCrossChallenges, cutOrCrossExtra, cutOrCrossPrediction, initialCutOrCrossState, meetingPoint, PAIR_LIMIT, pairCross, pairKind, pairMixed, setPairPart, type CutOrCrossState, type PairPartName } from './cutOrCross'
import { continuousLatex, initialParameterState, LINE_LIMIT, LINE_RANGE, linePoint, parameterChallenges, parameterExtra, parameterPrediction, setLineDirection, setLinePoint, setParameter, T_LIMIT, type ParameterState } from './parameterT'
import { initialPlaneNormalState, NORMAL_LIMIT, planeConstant, planeEquation, planeNormalChallenges, planeNormalExtra, planeNormalPrediction, setNormalPart, sideValue, type NormalPointName, type PlaneNormalState } from './planeNormal'
import { coefficientRank, COEFFICIENT_LIMIT, commonLine, commonPoint, CONSTANT_LIMIT, extendedRank, initialThreePlanesState, normalOf, planeLabel, planesCase, planesDeterminant, setPlaneRow, threePlanesChallenges, threePlanesExtra, threePlanesPrediction, type PlaneIndex, type PlanesCase, type ThreePlanesState } from './threePlanes'
import { CROSS_LIMIT, crossingPoint, directionDotNormal, initialThroughPlaneState, LEVEL_LIMIT, meetingT, normalDotPoint, setThroughLevel, setThroughPart, throughKind, throughPlaneChallenges, throughPlaneExtra, throughPrediction, type ThroughPartName, type ThroughPlaneState } from './throughPlane'
import './PlanesTools.css'

/* ==========================================================================
   Zuzenak eta planoak espazioan · Batxilergoa 2 · Zientziak — the five
   laboratory tools, all drawn on the 3D board of the Espacio block (drag
   to turn it). The equations of what is on the board are written above
   it; each tool asks for a prediction before it shows the result. Logic
   in parameterT.ts, planeNormal.ts, cutOrCross.ts, throughPlane.ts and
   threePlanes.ts.
   ========================================================================== */

const BOARD_HEIGHT = 320

/** The equations of what is drawn, one per row, above the board */
function Equations({ lines }: { lines: string[] }) {
    return (
        <div className="planoak-lab-equations">
            {lines.map((line) => <MathText key={line} text={`$${line}$`} />)}
        </div>
    )
}

/** The part being edited (a choice of names) and its three coordinates */
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
/** A short arrow along a direction, whatever its length */
const along = (from: Vec3, direction: Vec3, length: number): Vec3 => add(from, scale(length / norm(direction), direction))
const OUTSIDE = say(' Puntua taulatik kanpo geratzen da.', ' El punto queda fuera del tablero.', ' تقع النقطة خارج اللوحة.', ' The point is outside the board.')

/* ---------- L1. The parameter t ---------- */

export function ParameterTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ParameterState>(initialParameterState)
    const [editing, setEditing] = useState<'A' | 'u'>('u')
    const shown = state.prediction !== null
    const p = linePoint(state)
    const controls = (
        <>
            <VectorEditor names={['A', 'u'] as Array<'A' | 'u'>} current={editing} value={editing === 'A' ? state.a : state.u} limit={LINE_LIMIT} language={props.language} label={EDIT_PART} onPick={setEditing} onChange={(value) => setState((s) => (editing === 'A' ? setLinePoint(s, value) : setLineDirection(s, value)))} />
            <Stepper label="t" value={state.t} min={-T_LIMIT} max={T_LIMIT} format={minus} onChange={(t) => setState((s) => setParameter(s, t))} language={props.language} />
        </>
    )
    const lines = [`P=${vec(state.a)}+${wrap(state.t)}\\,${vec(state.u)}`, `P=${vec(p)}`, continuousLatex(state.a, state.u)]
    const note = p[2] === 0
        ? say('$P$ lurrean dago: ${z}=0$.', '$P$ está en el suelo: ${z}=0$.', '$P$ على الأرض: ${z}=0$.', '$P$ is on the floor: ${z}=0$.')
        : p[2] > 0
            ? say(`$P$ lurraren gainean dago: ${'${z}'}=${p[2]}$.`, `$P$ está por encima del suelo: ${'${z}'}=${p[2]}$.`, `$P$ فوق الأرض: ${'${z}'}=${p[2]}$.`, `$P$ is above the floor: ${'${z}'}=${p[2]}$.`)
            : say(`$P$ lurraren azpian dago: ${'${z}'}=${p[2]}$.`, `$P$ está por debajo del suelo: ${'${z}'}=${p[2]}$.`, `$P$ تحت الأرض: ${'${z}'}=${p[2]}$.`, `$P$ is below the floor: ${'${z}'}=${p[2]}$.`)
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: $P$ puntua lurraren azpian, lurrean ala gainean dago?', 'Antes de verlo: ¿$P$ queda por debajo del suelo, en el suelo o por encima?', 'قبل أن ترى: هل تقع $P$ تحت الأرض أم عليها أم فوقها؟', 'Before you see it: is $P$ below the floor, on it or above it?')}
            labels={{ '<': say('Azpian', 'Debajo', 'تحتها', 'Below'), '=': say('Lurrean', 'En el suelo', 'عليها', 'On it'), '>': say('Gainean', 'Encima', 'فوقها', 'Above') }}
            actual={parameterPrediction(state)}
            choice={state.prediction}
            tip={say('Begiratu ${z}$ bakarrik: $a_3+t\\,u_3$.', 'Mira solo la ${z}$: $a_3+t\\,u_3$.', 'انظر إلى ${z}$ فقط: $a_3+t\\,u_3$.', 'Look only at ${z}$: $a_3+t\\,u_3$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={lines} note={l(note)} />
        </Predict>
    )
    const scene: SceneItem[] = [
        { kind: 'line', point: state.a, direction: scale(-1, state.u), color: SPACE.violet, label: 'r' },
        arrow(state.a, add(state.a, state.u), SPACE.red, 'u'),
        { kind: 'point', at: state.a, label: 'A', color: SPACE.ink },
        ...(shown ? [{ kind: 'segment' as const, from: state.a, to: p, color: SPACE.blue, dashed: true }, { kind: 'point' as const, at: p, label: 'P', color: SPACE.blue, drop: 'floor' as const }] : [])
    ]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={parameterChallenges} extraChallenges={parameterExtra} state={state}>
            <Equations lines={[`r\\colon (x,y,{z})=${vec(state.a)}+t\\,${vec(state.u)}`, `t=${state.t}`]} />
            <Board3D scene={scene} language={props.language} range={LINE_RANGE} height={BOARD_HEIGHT} label={l(say(`A${vec(state.a)} puntutik u${vec(state.u)} norabidearekin pasatzen den r zuzena, eta t = ${state.t} puntua`, `La recta r por A${vec(state.a)} con dirección u${vec(state.u)}, y el punto de t = ${state.t}`, `المستقيم r المار بـ A${vec(state.a)} باتجاه u${vec(state.u)}، والنقطة عند t = ${state.t}`, `The line r through A${vec(state.a)} with direction u${vec(state.u)}, and the point for t = ${state.t}`))} />
        </ToolFrame>
    )
}

/* ---------- L2. The plane and its normal ---------- */

export function PlaneNormalTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<PlaneNormalState>(initialPlaneNormalState)
    const [editing, setEditing] = useState<NormalPointName>('Q')
    const shown = state.prediction !== null
    const D = planeConstant(state)
    const side = sideValue(state)
    const value = editing === 'n' ? state.n : editing === 'A' ? state.a : state.q
    const controls = <VectorEditor names={['n', 'A', 'Q'] as NormalPointName[]} current={editing} value={value} limit={NORMAL_LIMIT} language={props.language} label={EDIT_PART} onPick={setEditing} onChange={(next) => setState((s) => setNormalPart(s, editing, next))} />
    const products = state.n.map((coefficient, index) => `${wrap(coefficient)}\\cdot ${wrap(state.q[index])}`).join('+')
    const lines = [`D=-\\vec{n}\\cdot A=${D}`, planeEquation(state), `${products}${D < 0 ? D : `+${D}`}=${side}`]
    const note = side === 0
        ? say('$Q$ planoan dago.', '$Q$ está en el plano.', '$Q$ في المستوى.', '$Q$ is on the plane.')
        : side > 0
            ? say('$Q$ normalak seinalatzen duen aldean dago.', '$Q$ está del lado hacia el que apunta el normal.', '$Q$ في الجهة التي يشير إليها الناظم.', '$Q$ is on the side the normal points to.')
            : say('$Q$ normalaren kontrako aldean dago.', '$Q$ está al lado contrario del normal.', '$Q$ في الجهة المعاكسة للناظم.', '$Q$ is on the side opposite the normal.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: planoaren zein aldetan dago $Q$?', 'Antes de verlo: ¿a qué lado del plano está $Q$?', 'قبل أن ترى: في أي جهة من المستوى تقع $Q$؟', 'Before you see it: on which side of the plane is $Q$?')}
            labels={{ '<': say('Beste aldean', 'Al otro lado', 'الجهة الأخرى', 'Other side'), '=': say('Planoan', 'En el plano', 'في المستوى', 'On the plane'), '>': say('Normalaren aldean', 'Del lado del normal', 'جهة الناظم', 'Normal side') }}
            actual={planeNormalPrediction(state)}
            choice={state.prediction}
            tip={say('Kalkulatu $\\vec{n}\\cdot Q$ eta konparatu $\\vec{n}\\cdot A$ zenbakiarekin.', 'Calcula $\\vec{n}\\cdot Q$ y compáralo con $\\vec{n}\\cdot A$.', 'احسب $\\vec{n}\\cdot Q$ وقارنه بـ $\\vec{n}\\cdot A$.', 'Work out $\\vec{n}\\cdot Q$ and compare it with $\\vec{n}\\cdot A$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={lines} note={l(note)} />
        </Predict>
    )
    // The foot of Q on the plane, to show the side once predicted
    const foot = sub(state.q, scale(side / dot(state.n, state.n), state.n))
    const scene: SceneItem[] = [
        { kind: 'plane', point: state.a, normal: state.n, color: SPACE.planeGreen, opacity: 0.3 },
        arrow(state.a, along(state.a, state.n, 1.6), SPACE.violet, 'n'),
        { kind: 'point', at: state.a, label: 'A', color: SPACE.ink },
        ...(shown && side !== 0 ? [{ kind: 'segment' as const, from: state.q, to: foot, color: side > 0 ? SPACE.green : SPACE.red, dashed: true }] : []),
        { kind: 'point', at: state.q, label: 'Q', color: SPACE.red }
    ]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={planeNormalChallenges} extraChallenges={planeNormalExtra} state={state}>
            <Equations lines={[`\\vec{n}=${vec(state.n)}\\quad A=${vec(state.a)}`, `Q=${vec(state.q)}`]} />
            <Board3D scene={scene} language={props.language} range={4} height={BOARD_HEIGHT} label={l(say(`A${vec(state.a)} puntutik n${vec(state.n)} normalarekin pasatzen den planoa, eta Q${vec(state.q)} puntua`, `El plano por A${vec(state.a)} con normal n${vec(state.n)}, y el punto Q${vec(state.q)}`, `المستوى المار بـ A${vec(state.a)} وناظمه n${vec(state.n)}، والنقطة Q${vec(state.q)}`, `The plane through A${vec(state.a)} with normal n${vec(state.n)}, and the point Q${vec(state.q)}`))} />
        </ToolFrame>
    )
}

/* ---------- L3. Do they meet or are they skew? ---------- */

export function CutOrCrossTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CutOrCrossState>(initialCutOrCrossState)
    const [editing, setEditing] = useState<PairPartName>('B')
    const shown = state.prediction !== null
    const kind = pairKind(state)
    const point = meetingPoint(state)
    const value = { A: state.a, u: state.u, B: state.b, v: state.v }[editing]
    const controls = <VectorEditor names={['A', 'u', 'B', 'v'] as PairPartName[]} current={editing} value={value} limit={PAIR_LIMIT} language={props.language} label={EDIT_PART} onPick={setEditing} onChange={(next) => setState((s) => setPairPart(s, editing, next))} />
    const lines = [`\\vec{u}\\times\\vec{v}=${vec(pairCross(state))}`]
    if (kind === 'meet' || kind === 'skew') lines.push(`[\\overrightarrow{AB},\\vec{u},\\vec{v}]=${pairMixed(state)}`)
    else lines.push(`\\overrightarrow{AB}\\times\\vec{u}=${vec(pairCross({ ...state, u: sub(state.b, state.a), v: state.u }))}`)
    if (point) lines.push(`P=${pointLatex(point)}`)
    const inside = point !== null && insideBox(toNumbers(point), 4)
    const notes: Record<typeof kind, LocalizedText> = {
        meet: say('Plano berean daude eta ez dira paraleloak: $P$ puntuan ebakitzen dira.', 'Están en un plano y no son paralelas: se cortan en $P$.', 'في مستوى واحد وغير متوازيين: يتقاطعان في $P$.', 'They lie in one plane and are not parallel: they meet at $P$.'),
        skew: say('Biderkadura mistoa ez da 0: gurutzatu egiten dira.', 'El producto mixto no es 0: se cruzan.', 'الجداء المختلط ليس 0: متخالفان.', 'The scalar triple product is not 0: they are skew.'),
        parallel: say('Norabide paraleloak, eta $B$ ez dago $r$ zuzenean: paraleloak dira.', 'Directores paralelos y $B$ no está en $r$: son paralelas.', 'اتجاهان متوازيان و$B$ ليست على $r$: متوازيان.', 'Parallel directions and $B$ is not on $r$: they are parallel.'),
        same: say('Norabide paraleloak, eta $B$ puntua $r$ zuzenean dago: bat datoz.', 'Directores paralelos y $B$ está en $r$: coinciden.', 'اتجاهان متوازيان و$B$ على $r$: منطبقان.', 'Parallel directions and $B$ is on $r$: they are the same line.')
    }
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: zuzenak ebakitzen dira, paraleloak dira ala gurutzatzen dira?', 'Antes de verlo: ¿las rectas se cortan, son paralelas o se cruzan?', 'قبل أن ترى: هل المستقيمان متقاطعان أم متوازيان أم متخالفان؟', 'Before you see it: do the lines meet, are they parallel or are they skew?')}
            labels={{ '<': say('Ebakitzen dira', 'Se cortan', 'متقاطعان', 'They meet'), '=': say('Paraleloak', 'Paralelas', 'متوازيان', 'Parallel'), '>': say('Gurutzatzen dira', 'Se cruzan', 'متخالفان', 'Skew') }}
            actual={cutOrCrossPrediction(state)}
            choice={state.prediction}
            tip={say('Begiratu lehenik $\\vec{u}$ eta $\\vec{v}$ paraleloak diren; bestela, biderkadura mistoa.', 'Mira primero si $\\vec{u}$ y $\\vec{v}$ son paralelos; si no, el producto mixto.', 'انظر أولًا هل $\\vec{u}$ و$\\vec{v}$ متوازيان؛ وإلا فالجداء المختلط.', 'First see whether $\\vec{u}$ and $\\vec{v}$ are parallel; if not, the scalar triple product.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={lines} note={`${l(notes[kind])}${point && !inside ? l(OUTSIDE) : ''}`} />
        </Predict>
    )
    const scene: SceneItem[] = [
        { kind: 'line', point: state.a, direction: scale(-1, state.u), color: SPACE.red, width: 3, label: 'r' },
        { kind: 'line', point: state.b, direction: scale(-1, state.v), color: SPACE.blue, width: 3, label: 's' },
        arrow(state.a, add(state.a, state.u), SPACE.red, 'u'),
        arrow(state.b, add(state.b, state.v), SPACE.blue, 'v'),
        { kind: 'point', at: state.a, label: 'A', color: SPACE.ink },
        { kind: 'point', at: state.b, label: 'B', color: SPACE.ink },
        ...(shown && point && inside ? [{ kind: 'point' as const, at: toNumbers(point), label: 'P', color: SPACE.violet }] : [])
    ]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={cutOrCrossChallenges} extraChallenges={cutOrCrossExtra} state={state}>
            <Equations lines={[`r\\colon ${vec(state.a)}+t\\,${vec(state.u)}`, `s\\colon ${vec(state.b)}+\\lambda\\,${vec(state.v)}`]} />
            <Board3D scene={scene} language={props.language} range={4} height={BOARD_HEIGHT} label={l(say(`r zuzena, A${vec(state.a)} eta u${vec(state.u)}; s zuzena, B${vec(state.b)} eta v${vec(state.v)}`, `La recta r, con A${vec(state.a)} y u${vec(state.u)}; la recta s, con B${vec(state.b)} y v${vec(state.v)}`, `المستقيم r مع A${vec(state.a)} وu${vec(state.u)}؛ والمستقيم s مع B${vec(state.b)} وv${vec(state.v)}`, `The line r, with A${vec(state.a)} and u${vec(state.u)}; the line s, with B${vec(state.b)} and v${vec(state.v)}`))} />
        </ToolFrame>
    )
}

/* ---------- L4. The line that goes through ---------- */

export function ThroughPlaneTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ThroughPlaneState>(initialThroughPlaneState)
    const [editing, setEditing] = useState<ThroughPartName>('u')
    const shown = state.prediction !== null
    const kind = throughKind(state)
    const nu = directionDotNormal(state)
    const na = normalDotPoint(state)
    const t = meetingT(state)
    const point = crossingPoint(state)
    const inside = point !== null && insideBox(toNumbers(point), 5)
    const value = { n: state.n, A: state.a, u: state.u }[editing]
    const controls = (
        <>
            <VectorEditor names={['n', 'A', 'u'] as ThroughPartName[]} current={editing} value={value} limit={CROSS_LIMIT} language={props.language} label={EDIT_PART} onPick={setEditing} onChange={(next) => setState((s) => setThroughPart(s, editing, next))} />
            <Stepper label="d" value={state.d} min={-LEVEL_LIMIT} max={LEVEL_LIMIT} format={minus} onChange={(d) => setState((s) => setThroughLevel(s, d))} language={props.language} />
        </>
    )
    const lines = [`\\vec{u}\\cdot\\vec{n}=${nu}`]
    if (t && point) lines.push(`t=\\frac{${state.d}-${wrap(na)}}{${nu}}=${toLatex(t)}`, `P=${pointLatex(point)}`)
    else lines.push(`\\vec{n}\\cdot A=${na}${na === state.d ? '=' : '\\neq '}${state.d}`)
    const notes: Record<typeof kind, LocalizedText> = {
        meet: say('$\\vec{u}\\cdot\\vec{n}\\neq 0$: zuzenak planoa $P$ puntuan zeharkatzen du.', '$\\vec{u}\\cdot\\vec{n}\\neq 0$: la recta atraviesa el plano en $P$.', '$\\vec{u}\\cdot\\vec{n}\\neq 0$: يخترق المستقيم المستوى في $P$.', '$\\vec{u}\\cdot\\vec{n}\\neq 0$: the line goes through the plane at $P$.'),
        inside: say('$\\vec{u}\\cdot\\vec{n}=0$ eta $A$ planoan dago: zuzena planoaren barruan dago.', '$\\vec{u}\\cdot\\vec{n}=0$ y $A$ está en el plano: la recta está dentro.', '$\\vec{u}\\cdot\\vec{n}=0$ و$A$ في المستوى: المستقيم داخله.', '$\\vec{u}\\cdot\\vec{n}=0$ and $A$ is on the plane: the line lies inside it.'),
        parallel: say('$\\vec{u}\\cdot\\vec{n}=0$ eta $A$ ez dago planoan: zuzena paraleloa da.', '$\\vec{u}\\cdot\\vec{n}=0$ y $A$ no está en el plano: la recta es paralela.', '$\\vec{u}\\cdot\\vec{n}=0$ و$A$ ليست في المستوى: المستقيم موازٍ.', '$\\vec{u}\\cdot\\vec{n}=0$ and $A$ is not on the plane: the line is parallel.')
    }
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: zuzenak planoa zeharkatzen du, barruan dago ala paraleloa da?', 'Antes de verlo: ¿la recta atraviesa el plano, está dentro o es paralela?', 'قبل أن ترى: هل يخترق المستقيم المستوى أم هو داخله أم موازٍ له؟', 'Before you see it: does the line go through the plane, lie inside it or run parallel?')}
            labels={{ '<': say('Zeharkatzen du', 'Lo atraviesa', 'يخترقه', 'Through'), '=': say('Barruan', 'Dentro', 'داخله', 'Inside'), '>': say('Paraleloa', 'Paralela', 'موازٍ', 'Parallel') }}
            actual={throughPrediction(state)}
            choice={state.prediction}
            tip={say('Kalkulatu $\\vec{u}\\cdot\\vec{n}$; 0 bada, begiratu $A$ planoan dagoen.', 'Calcula $\\vec{u}\\cdot\\vec{n}$; si es 0, mira si $A$ está en el plano.', 'احسب $\\vec{u}\\cdot\\vec{n}$؛ وإن كان 0 فانظر هل $A$ في المستوى.', 'Work out $\\vec{u}\\cdot\\vec{n}$; if it is 0, see whether $A$ is on the plane.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={lines} note={`${l(notes[kind])}${point && !inside ? l(OUTSIDE) : ''}`} />
        </Predict>
    )
    const scene: SceneItem[] = [
        { kind: 'plane', point: scale(state.d / dot(state.n, state.n), state.n), normal: state.n, color: SPACE.planeBlue, opacity: 0.28 },
        { kind: 'line', point: state.a, direction: scale(-1, state.u), color: SPACE.violet, width: 3, label: 'r' },
        arrow(state.a, add(state.a, state.u), SPACE.red, 'u'),
        { kind: 'point', at: state.a, label: 'A', color: SPACE.ink },
        ...(shown && point && inside ? [{ kind: 'point' as const, at: toNumbers(point), label: 'P', color: SPACE.red }] : [])
    ]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={throughPlaneChallenges} extraChallenges={throughPlaneExtra} state={state}>
            <Equations lines={[`\\pi\\colon ${levelLatex(state.n, state.d)}`, `r\\colon ${vec(state.a)}+t\\,${vec(state.u)}`]} />
            <Board3D scene={scene} language={props.language} range={5} height={BOARD_HEIGHT} label={l(say(`π planoa, ${levelLatex(state.n, state.d).replace('{z}', 'z')}, eta A${vec(state.a)} puntutik u${vec(state.u)} norabidearekin pasatzen den r zuzena`, `El plano π, ${levelLatex(state.n, state.d).replace('{z}', 'z')}, y la recta r por A${vec(state.a)} con dirección u${vec(state.u)}`, `المستوى π، ‏${levelLatex(state.n, state.d).replace('{z}', 'z')}، والمستقيم r المار بـ A${vec(state.a)} باتجاه u${vec(state.u)}`, `The plane π, ${levelLatex(state.n, state.d).replace('{z}', 'z')}, and the line r through A${vec(state.a)} with direction u${vec(state.u)}`))} />
        </ToolFrame>
    )
}

/* ---------- L5. Three planes ---------- */

const CASE_NOTES: Record<PlanesCase, LocalizedText> = {
    point: say('Hiru planoek puntu batean ebakitzen dute elkar.', 'Los tres planos se cortan en un punto.', 'تتقاطع المستويات الثلاثة في نقطة.', 'The three planes meet at a point.'),
    line: say('Hiru planoek zuzen batean ebakitzen dute elkar.', 'Los tres planos se cortan en una recta.', 'تتقاطع المستويات الثلاثة في مستقيم.', 'The three planes meet in a line.'),
    'line-double': say('Bi plano bat datoz, eta hirugarrenak zuzen batean ebakitzen ditu.', 'Dos planos coinciden y el tercero los corta en una recta.', 'ينطبق مستويان ويقطعهما الثالث في مستقيم.', 'Two planes are the same and the third cuts them in a line.'),
    prism: say('Binaka ebakitzen dute, hiru zuzen paralelotan: ez dago puntu komunik.', 'Se cortan dos a dos en tres rectas paralelas: no hay punto común.', 'تتقاطع مثنى مثنى في ثلاثة مستقيمات متوازية: لا نقطة مشتركة.', 'They meet in pairs in three parallel lines: no common point.'),
    'two-parallel': say('Bi plano paraleloak dira eta hirugarrenak biak ebakitzen ditu: ez dago puntu komunik.', 'Dos planos son paralelos y el tercero los corta: no hay punto común.', 'مستويان متوازيان والثالث يقطعهما: لا نقطة مشتركة.', 'Two planes are parallel and the third cuts both: no common point.'),
    same: say('Hiru planoak bat datoz.', 'Los tres planos coinciden.', 'المستويات الثلاثة منطبقة.', 'The three planes are the same.'),
    parallel: say('Hiru plano paralelo: ez dago puntu komunik.', 'Tres planos paralelos: no hay punto común.', 'ثلاثة مستويات متوازية: لا نقطة مشتركة.', 'Three parallel planes: no common point.'),
    'parallel-double': say('Bi plano bat datoz eta bestea paraleloa da: ez dago puntu komunik.', 'Dos planos coinciden y el otro es paralelo: no hay punto común.', 'ينطبق مستويان والآخر موازٍ: لا نقطة مشتركة.', 'Two planes are the same and the other is parallel: no common point.')
}

const PLANE_COLORS = [SPACE.planeBlue, SPACE.planeMustard, SPACE.planeGreen]
const PLANE_NAMES = ['π₁', 'π₂', 'π₃']

export function ThreePlanesTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ThreePlanesState>(initialThreePlanesState)
    const [editing, setEditing] = useState<PlaneIndex>(2)
    const shown = state.prediction !== null
    const row = state.planes[editing]
    const point = commonPoint(state)
    const line = commonLine(state)
    const inside = point !== null && insideBox(toNumbers(point), 5)
    const change = (place: 0 | 1 | 2 | 3) => (next: number) => setState((s) => {
        const copy: [number, number, number, number] = [row[0], row[1], row[2], row[3]]
        copy[place] = next
        return setPlaneRow(s, editing, copy)
    })
    const controls = (
        <>
            <Segmented label={l(EDIT_PART)} value={String(editing)} options={PLANE_NAMES.map((name, index) => ({ value: String(index), label: name }))} onChange={(value) => setEditing(Number(value) as PlaneIndex)} />
            {(['a', 'b', 'c'] as const).map((name, place) => (
                <Stepper key={name} label={`${PLANE_NAMES[editing]} · ${name}`} value={row[place]} min={-COEFFICIENT_LIMIT} max={COEFFICIENT_LIMIT} format={minus} onChange={change(place as 0 | 1 | 2)} language={props.language} />
            ))}
            <Stepper label={`${PLANE_NAMES[editing]} · d`} value={row[3]} min={-CONSTANT_LIMIT} max={CONSTANT_LIMIT} format={minus} onChange={change(3)} language={props.language} />
        </>
    )
    const lines = [
        `M^*=\\left(\\begin{array}{ccc|c}${state.planes.map((plane) => plane.join('&')).join('\\\\')}\\end{array}\\right)`,
        `\\det M=${planesDeterminant(state)}`,
        `\\operatorname{rg}M=${coefficientRank(state)}\\qquad\\operatorname{rg}M^*=${extendedRank(state)}`
    ]
    if (point) lines.push(`P=${pointLatex(point)}`)
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: zenbat puntu dituzte komunean hiru planoek?', 'Antes de verlo: ¿cuántos puntos comparten los tres planos?', 'قبل أن ترى: كم نقطة تشترك فيها المستويات الثلاثة؟', 'Before you see it: how many points do the three planes share?')}
            labels={{ '<': say('Bat', 'Uno', 'واحدة', 'One'), '=': say('Infinitu', 'Infinitos', 'لا نهائية', 'Infinitely many'), '>': say('Bat ere ez', 'Ninguno', 'ولا واحدة', 'None') }}
            actual={threePlanesPrediction(state)}
            choice={state.prediction}
            tip={say('Konparatu $\\operatorname{rg}M$ eta $\\operatorname{rg}M^*$.', 'Compara $\\operatorname{rg}M$ y $\\operatorname{rg}M^*$.', 'قارن $\\operatorname{rg}M$ و$\\operatorname{rg}M^*$.', 'Compare $\\operatorname{rg}M$ and $\\operatorname{rg}M^*$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={lines} note={`${l(CASE_NOTES[planesCase(state)])}${point && !inside ? l(OUTSIDE) : ''}`} />
        </Predict>
    )
    const scene: SceneItem[] = [
        ...state.planes.map((plane, index): SceneItem => {
            const n = normalOf(plane)
            return { kind: 'plane', point: scale(plane[3] / dot(n, n), n), normal: n, color: PLANE_COLORS[index], opacity: index === editing ? 0.34 : 0.2 }
        }),
        ...(shown && line ? [{ kind: 'line' as const, point: line.point, direction: line.direction, color: SPACE.violet, width: 3.4 }] : []),
        ...(shown && point && inside ? [{ kind: 'point' as const, at: toNumbers(point), label: 'P', color: SPACE.red }] : [])
    ]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={threePlanesChallenges} extraChallenges={threePlanesExtra} state={state}>
            <Equations lines={state.planes.map((plane, index) => `\\pi_${index + 1}\\colon ${planeLabel(plane)}`)} />
            <Board3D scene={scene} language={props.language} range={5} height={BOARD_HEIGHT} label={l(say(`Hiru plano: ${state.planes.map((plane) => planeLabel(plane).replace('{z}', 'z')).join('; ')}`, `Tres planos: ${state.planes.map((plane) => planeLabel(plane).replace('{z}', 'z')).join('; ')}`, `ثلاثة مستويات: ${state.planes.map((plane) => planeLabel(plane).replace('{z}', 'z')).join('؛ ')}`, `Three planes: ${state.planes.map((plane) => planeLabel(plane).replace('{z}', 'z')).join('; ')}`))} />
        </ToolFrame>
    )
}
