import { useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { toLatex } from '../../../features/unit-v2/math/fraction'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { texDec } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { Board3D } from '../space/Board3D'
import { SPACE, type SceneItem } from '../space/scene'
import { boxBetween, parallelogram, planeOf } from '../space/sceneKit'
import { add, cross, scale, type Vec3 } from '../space/vec3'
import { BOX_LIMIT, boxPrediction, boxProduct, boxVolume, boxVolumeChallenges, boxVolumeExtra, flattenedW, initialBoxVolumeState, setBoxVector, type BoxVectorName, type BoxVolumeState } from './boxVolume'
import { minus, root, say, vec, wrap } from './common'
import { initialInPlaneState, inPlaneChallenges, inPlaneExtra, inPlanePrediction, noPlane, planeCoefficients, planeDeterminant, PLANE_LIMIT, planeRank, setPlaneVector, type InPlaneState, type PlaneVectorName } from './inPlane'
import { doubledMidpoint, initialPointBoxState, POINT_LIMIT, pointBoxChallenges, pointBoxExtra, pointPrediction, pointSquare, pointVector, setPoint, type PointBoxState, type PointName } from './pointBox'
import { HAND_LIMIT, handAreaSquare, handProduct, initialRightHandState, rightHandChallenges, rightHandExtra, rightHandPrediction, setHandVector, swapHand, type HandVectorName, type RightHandState } from './rightHand'
import { initialSpaceShadowState, setShadowVector, SHADOW_LIMIT, shadowAngle, shadowDot, shadowVector, spaceShadowChallenges, spaceShadowExtra, spaceShadowPrediction, type ShadowVectorName, type SpaceShadowState } from './spaceShadow'

/* ==========================================================================
   Espazioko bektoreak · Batxilergoa 2 · Zientziak — the five laboratory
   tools, all drawn on the 3D board of the block (drag to turn it). Each
   asks for a prediction before it shows the result; the box flattens
   with ▶. Logic in pointBox.ts, inPlane.ts, spaceShadow.ts, rightHand.ts
   and boxVolume.ts.
   ========================================================================== */

const BOARD_HEIGHT = 320

/** A number for LaTeX: whole, or rounded to two decimals */
const exact = (value: number, language: UnitLanguage) => (Math.abs(value - Math.round(value)) < 1e-9 ? String(Math.round(value) + 0) : texDec(value, language, 2))
const relation = (value: number) => (Math.abs(value - Math.round(value)) < 1e-9 ? '=' : '\\approx ')
/** Half a whole number, for the midpoint */
const half = (twice: number, language: UnitLanguage) => (twice % 2 === 0 ? String(twice / 2 + 0) : texDec(twice / 2, language, 1))

/** The vector being edited (a choice of names) and its three coordinates */
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

const EDIT_POINT = say('Aldatu puntua', 'Cambia el punto', 'غيّر النقطة', 'Change the point')
const EDIT_VECTOR = say('Aldatu bektorea', 'Cambia el vector', 'غيّر المتجه', 'Change the vector')

/* ---------- L1. The point and its box ---------- */

export function PointBoxTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<PointBoxState>(initialPointBoxState)
    const [editing, setEditing] = useState<PointName>('B')
    const shown = state.prediction !== null
    const ab = pointVector(state)
    const square = pointSquare(state)
    const twice = doubledMidpoint(state)
    const m = scale(0.5, twice)
    const controls = <VectorEditor names={['A', 'B'] as PointName[]} current={editing} value={editing === 'A' ? state.a : state.b} limit={POINT_LIMIT} language={props.language} label={EDIT_POINT} onPick={setEditing} onChange={(value) => setState((s) => setPoint(s, editing, value))} />
    const lines = [
        `\\overrightarrow{AB}=B-A=${vec(ab)}`,
        `|\\overrightarrow{AB}|=\\sqrt{${ab.map((value) => `${wrap(value)}^2`).join('+')}}${relation(Math.sqrt(square))}${exact(Math.sqrt(square), props.language)}`,
        `M=\\left(${twice.map((value) => half(value, props.language)).join(',')}\\right)`
    ]
    const verdict = square < 25
        ? say('$|\\overrightarrow{AB}|$ 5 baino txikiagoa da.', '$|\\overrightarrow{AB}|$ es menor que 5.', '$|\\overrightarrow{AB}|$ أصغر من 5.', '$|\\overrightarrow{AB}|$ is less than 5.')
        : square === 25
            ? say('$|\\overrightarrow{AB}|$ zehazki 5 da.', '$|\\overrightarrow{AB}|$ es justo 5.', '$|\\overrightarrow{AB}|$ يساوي 5 تمامًا.', '$|\\overrightarrow{AB}|$ is exactly 5.')
            : say('$|\\overrightarrow{AB}|$ 5 baino handiagoa da.', '$|\\overrightarrow{AB}|$ es mayor que 5.', '$|\\overrightarrow{AB}|$ أكبر من 5.', '$|\\overrightarrow{AB}|$ is greater than 5.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: $|\\overrightarrow{AB}|$ 5 baino txikiagoa, 5 ala handiagoa da?', 'Antes de verlo: ¿$|\\overrightarrow{AB}|$ es menor que 5, 5 o mayor?', 'قبل أن ترى: هل $|\\overrightarrow{AB}|$ أصغر من 5 أم 5 أم أكبر؟', 'Before you see it: is $|\\overrightarrow{AB}|$ less than 5, 5 or more?')}
            labels={{ '<': say('Txikiagoa', 'Menor', 'أصغر', 'Less'), '=': say('5', '5', '5', '5'), '>': say('Handiagoa', 'Mayor', 'أكبر', 'More') }}
            actual={pointPrediction(state)}
            choice={state.prediction}
            tip={say('Konparatu kutxaren hiru aldeen karratuen batura 25 zenbakiarekin.', 'Compara la suma de los cuadrados de los tres lados de la caja con 25.', 'قارن مجموع مربعات أضلاع الصندوق الثلاثة بـ 25.', 'Compare the sum of the squares of the three sides of the box with 25.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={lines} note={l(verdict)} />
        </Predict>
    )
    const scene: SceneItem[] = [
        ...boxBetween(state.a, state.b),
        { kind: 'vector', from: state.a, to: state.b, color: SPACE.blue },
        { kind: 'point', at: state.a, label: 'A', color: SPACE.ink, drop: 'floor' },
        { kind: 'point', at: state.b, label: 'B', color: SPACE.ink, drop: 'floor' },
        ...(shown ? [{ kind: 'point' as const, at: m, label: 'M', color: SPACE.red, hollow: true }] : [])
    ]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={pointBoxChallenges} extraChallenges={pointBoxExtra} state={state}>
            <Board3D scene={scene} language={props.language} range={4} height={BOARD_HEIGHT} label={l(say(`A${vec(state.a)} eta B${vec(state.b)} puntuak, AB bektorea eta haren kutxa`, `Los puntos A${vec(state.a)} y B${vec(state.b)}, el vector AB y su caja`, `النقطتان A${vec(state.a)} وB${vec(state.b)} والمتجه AB وصندوقه`, `The points A${vec(state.a)} and B${vec(state.b)}, the vector AB and its box`))} />
        </ToolFrame>
    )
}

/* ---------- L2. Does it fit in the plane? ---------- */

export function InPlaneTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<InPlaneState>(initialInPlaneState)
    const [editing, setEditing] = useState<PlaneVectorName>('w')
    const shown = state.prediction !== null
    const det = planeDeterminant(state)
    const coefficients = planeCoefficients(state)
    const value = state[editing]
    const controls = <VectorEditor names={['u', 'v', 'w'] as PlaneVectorName[]} current={editing} value={value} limit={PLANE_LIMIT} language={props.language} label={EDIT_VECTOR} onPick={setEditing} onChange={(next) => setState((s) => setPlaneVector(s, editing, next))} />
    const lines = [`\\begin{vmatrix}${[state.u, state.v, state.w].map((row) => row.join('&')).join('\\\\')}\\end{vmatrix}=${det}`, `\\operatorname{rg}=${planeRank(state)}`]
    if (coefficients) lines.push(`\\vec{w}=${toLatex(coefficients[0])}\\,\\vec{u}${coefficients[1].numerator < 0 ? '' : '+'}${toLatex(coefficients[1])}\\,\\vec{v}`)
    const note = noPlane(state)
        ? say('$\\vec{u}$ eta $\\vec{v}$ paraleloak dira: ez dute planorik osatzen.', '$\\vec{u}$ y $\\vec{v}$ son paralelos: no forman un plano.', '$\\vec{u}$ و$\\vec{v}$ متوازيان: لا يكوّنان مستوى.', '$\\vec{u}$ and $\\vec{v}$ are parallel: they do not span a plane.')
        : det === 0
            ? say('$\\vec{w}$ planoan dago: hirurak mendekoak dira.', '$\\vec{w}$ está en el plano: los tres son dependientes.', '$\\vec{w}$ في المستوى: الثلاثة مرتبطة.', '$\\vec{w}$ lies in the plane: the three are dependent.')
            : say('$\\vec{w}$ planotik irteten da: oinarri bat osatzen dute.', '$\\vec{w}$ sale del plano: forman una base.', '$\\vec{w}$ يخرج من المستوى: تكوّن أساسًا.', '$\\vec{w}$ sticks out of the plane: they form a basis.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: $\\vec{w}$ bektorea $\\vec{u}$ eta $\\vec{v}$ bektoreen planoan dago?', 'Antes de verlo: ¿está $\\vec{w}$ en el plano de $\\vec{u}$ y $\\vec{v}$?', 'قبل أن ترى: هل $\\vec{w}$ في مستوى $\\vec{u}$ و$\\vec{v}$؟', 'Before you see it: is $\\vec{w}$ in the plane of $\\vec{u}$ and $\\vec{v}$?')}
            labels={{ '<': say('Barruan', 'Dentro', 'داخله', 'Inside'), '=': say('Ez dago planorik', 'No hay plano', 'لا مستوى', 'No plane'), '>': say('Kanpoan', 'Fuera', 'خارجه', 'Outside') }}
            actual={inPlanePrediction(state)}
            choice={state.prediction}
            tip={say('Biratu taula: $\\vec{w}$ planoaren gainean dago ala irteten da?', 'Gira el tablero: ¿$\\vec{w}$ está pegado al plano o sale de él?', 'أدِر اللوحة: هل $\\vec{w}$ ملتصق بالمستوى أم يخرج منه؟', 'Turn the board: does $\\vec{w}$ lie flat on the plane or stick out?')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={lines} note={l(note)} />
        </Predict>
    )
    const scene: SceneItem[] = [
        ...(noPlane(state) ? [] : [planeOf([0, 0, 0], state.u, state.v, SPACE.planeViolet, 0.3)]),
        ...(shown && coefficients
            ? (() => {
                const a = coefficients[0].numerator / coefficients[0].denominator
                const first = scale(a, state.u)
                return [
                    { kind: 'vector' as const, to: first, color: SPACE.red, dashed: true, width: 2.2 },
                    { kind: 'vector' as const, from: first, to: state.w, color: SPACE.green, dashed: true, width: 2.2 }
                ]
            })()
            : []),
        { kind: 'vector', to: state.u, color: SPACE.red, label: 'u' },
        { kind: 'vector', to: state.v, color: SPACE.green, label: 'v' },
        { kind: 'vector', to: state.w, color: SPACE.blue, label: 'w' }
    ]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={inPlaneChallenges} extraChallenges={inPlaneExtra} state={state}>
            <Board3D scene={scene} language={props.language} range={3} height={BOARD_HEIGHT} label={l(say(`u${vec(state.u)} eta v${vec(state.v)} bektoreen planoa eta w${vec(state.w)}`, `El plano de u${vec(state.u)} y v${vec(state.v)}, y w${vec(state.w)}`, `مستوى u${vec(state.u)} وv${vec(state.v)}، وw${vec(state.w)}`, `The plane of u${vec(state.u)} and v${vec(state.v)}, and w${vec(state.w)}`))} />
        </ToolFrame>
    )
}

/* ---------- L3. The shadow in space ---------- */

export function SpaceShadowTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SpaceShadowState>(initialSpaceShadowState)
    const [editing, setEditing] = useState<ShadowVectorName>('v')
    const shown = state.prediction !== null
    const product = shadowDot(state)
    const foot = shadowVector(state)
    const angle = shadowAngle(state)
    const squareU = state.u[0] ** 2 + state.u[1] ** 2 + state.u[2] ** 2
    const controls = <VectorEditor names={['u', 'v'] as ShadowVectorName[]} current={editing} value={state[editing]} limit={SHADOW_LIMIT} language={props.language} label={EDIT_VECTOR} onPick={setEditing} onChange={(next) => setState((s) => setShadowVector(s, editing, next))} />
    const lines = [`\\vec{u}\\cdot\\vec{v}=${state.u.map((value, index) => `${wrap(value)}\\cdot ${wrap(state.v[index])}`).join('+')}=${product}`]
    if (squareU > 0) lines.push(`\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|}=\\frac{${product}}{${root(squareU)}}${relation(product / Math.sqrt(squareU))}${exact(product / Math.sqrt(squareU), props.language)}`)
    if (angle !== null) lines.push(`\\alpha${relation(angle)}${exact(angle, props.language)}^\\circ`)
    const note = product === 0
        ? say('Itzalik ez: $\\vec{u}$ eta $\\vec{v}$ perpendikularrak dira.', 'Sin sombra: $\\vec{u}$ y $\\vec{v}$ son perpendiculares.', 'لا ظل: $\\vec{u}$ و$\\vec{v}$ متعامدان.', 'No shadow: $\\vec{u}$ and $\\vec{v}$ are perpendicular.')
        : product > 0
            ? say('Itzala aurrera erortzen da: angelu zorrotza.', 'La sombra cae hacia delante: ángulo agudo.', 'يقع الظل إلى الأمام: زاوية حادة.', 'The shadow falls forwards: acute angle.')
            : say('Itzala atzera erortzen da: angelu kamutsa.', 'La sombra cae hacia atrás: ángulo obtuso.', 'يقع الظل إلى الخلف: زاوية منفرجة.', 'The shadow falls backwards: obtuse angle.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: $\\vec{u}\\cdot\\vec{v}$ negatiboa, 0 ala positiboa da?', 'Antes de verlo: ¿$\\vec{u}\\cdot\\vec{v}$ es negativo, 0 o positivo?', 'قبل أن ترى: هل $\\vec{u}\\cdot\\vec{v}$ سالب أم 0 أم موجب؟', 'Before you see it: is $\\vec{u}\\cdot\\vec{v}$ negative, 0 or positive?')}
            labels={{ '<': say('Negatiboa', 'Negativo', 'سالب', 'Negative'), '=': say('0', '0', '0', '0'), '>': say('Positiboa', 'Positivo', 'موجب', 'Positive') }}
            actual={spaceShadowPrediction(state)}
            choice={state.prediction}
            tip={say('Biratu taula eta begiratu angeluari, edo kalkulatu $u_1v_1+u_2v_2+u_3v_3$.', 'Gira el tablero y mira el ángulo, o calcula $u_1v_1+u_2v_2+u_3v_3$.', 'أدِر اللوحة وانظر إلى الزاوية، أو احسب $u_1v_1+u_2v_2+u_3v_3$.', 'Turn the board and look at the angle, or work out $u_1v_1+u_2v_2+u_3v_3$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={lines} note={l(note)} />
        </Predict>
    )
    const scene: SceneItem[] = [
        ...(squareU > 0 ? [{ kind: 'line' as const, point: [0, 0, 0] as Vec3, direction: state.u, color: SPACE.muted, width: 1.3, dashed: true }] : []),
        ...(shown && foot
            ? [
                { kind: 'vector' as const, to: foot, color: product >= 0 ? SPACE.green : SPACE.red, width: 7 },
                { kind: 'segment' as const, from: state.v, to: foot, color: SPACE.ink, dashed: true, width: 1.5 }
            ]
            : []),
        ...(shown && angle !== null && angle > 1 && angle < 179 ? [{ kind: 'arc' as const, at: [0, 0, 0] as Vec3, u: state.u, v: state.v, radius: 0.8, color: SPACE.mustard }] : []),
        { kind: 'vector', to: state.u, color: SPACE.red, label: 'u' },
        { kind: 'vector', to: state.v, color: SPACE.blue, label: 'v' }
    ]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={spaceShadowChallenges} extraChallenges={spaceShadowExtra} state={state}>
            <Board3D scene={scene} language={props.language} range={3} height={BOARD_HEIGHT} label={l(say(`u${vec(state.u)} eta v${vec(state.v)} bektoreak, eta v bektorearen itzala u bektorearen zuzenean`, `Los vectores u${vec(state.u)} y v${vec(state.v)}, y la sombra de v sobre la recta de u`, `المتجهان u${vec(state.u)} وv${vec(state.v)} وظل v على مستقيم u`, `The vectors u${vec(state.u)} and v${vec(state.v)}, and the shadow of v on the line of u`))} />
        </ToolFrame>
    )
}

/* ---------- L4. The right hand ---------- */

export function RightHandTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RightHandState>(initialRightHandState)
    const [editing, setEditing] = useState<HandVectorName>('v')
    const shown = state.prediction !== null
    const product = handProduct(state)
    const areaSquare = handAreaSquare(state)
    const name = state.swapped ? '\\vec{v}\\times\\vec{u}' : '\\vec{u}\\times\\vec{v}'
    const plainName = state.swapped ? 'v × u' : 'u × v'
    const [first, second] = state.swapped ? [state.v, state.u] : [state.u, state.v]
    const controls = (
        <>
            <VectorEditor names={['u', 'v'] as HandVectorName[]} current={editing} value={state[editing]} limit={HAND_LIMIT} language={props.language} label={EDIT_VECTOR} onPick={setEditing} onChange={(next) => setState((s) => setHandVector(s, editing, next))} />
            <div className="fraction-v2-lab-quick-actions" style={{ width: '100%' }}>
                <button type="button" aria-pressed={state.swapped} onClick={() => setState(swapHand)}>{l(say('Aldatu ordena', 'Cambiar el orden', 'غيّر الترتيب', 'Swap the order'))}: {plainName}</button>
            </div>
        </>
    )
    const lines = [
        `${name}=\\begin{vmatrix}\\vec{i}&\\vec{j}&\\vec{k}\\\\${first.join('&')}\\\\${second.join('&')}\\end{vmatrix}=${vec(product)}`,
        `S=|${name}|=${root(areaSquare)}${Number.isInteger(Math.sqrt(areaSquare)) ? '' : `\\approx ${texDec(Math.sqrt(areaSquare), props.language, 2)}`}`
    ]
    const note = product[2] > 0
        ? say('Gezia gora seinalatzen du.', 'La flecha apunta hacia arriba.', 'يشير السهم إلى الأعلى.', 'The arrow points up.')
        : product[2] < 0
            ? say('Gezia behera seinalatzen du.', 'La flecha apunta hacia abajo.', 'يشير السهم إلى الأسفل.', 'The arrow points down.')
            : areaSquare === 0
                ? say('Paraleloak dira: biderkadura bektoriala $\\vec{0}$ da.', 'Son paralelos: el producto vectorial es $\\vec{0}$.', 'إنهما متوازيان: الجداء المتجهي هو $\\vec{0}$.', 'They are parallel: the cross product is $\\vec{0}$.')
                : say('Gezia horizontala da: zorua bezain laua.', 'La flecha es horizontal, paralela al suelo.', 'السهم أفقي، موازٍ للأرض.', 'The arrow is horizontal, parallel to the floor.')
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: nora seinalatzen du $${name}$ bektoreak?`, `Antes de verlo: ¿hacia dónde apunta $${name}$?`, `قبل أن ترى: إلى أين يشير $${name}$؟`, `Before you see it: where does $${name}$ point?`)}
            labels={{ '<': say('Behera', 'Abajo', 'إلى الأسفل', 'Down'), '=': say('Horizontal', 'Horizontal', 'أفقي', 'Flat'), '>': say('Gora', 'Arriba', 'إلى الأعلى', 'Up') }}
            actual={rightHandPrediction(state)}
            choice={state.prediction}
            tip={say('Eskuineko eskua: hatzak lehen bektoretik bigarrenera biratzen dira, eta erpuruak noranzkoa ematen du.', 'Mano derecha: los dedos giran del primer vector al segundo y el pulgar da el sentido.', 'اليد اليمنى: تدور الأصابع من المتجه الأول إلى الثاني ويعطي الإبهام المنحى.', 'Right hand: the fingers turn from the first vector to the second and the thumb gives the sense.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={lines} note={l(note)} />
        </Predict>
    )
    const scene: SceneItem[] = [
        parallelogram([0, 0, 0], state.u, state.v, SPACE.planeBlue, 0.4),
        ...(shown && areaSquare > 0
            ? [
                { kind: 'right-angle' as const, at: [0, 0, 0] as Vec3, u: state.u, v: product, size: 0.35 },
                { kind: 'vector' as const, to: product, color: SPACE.green, label: plainName }
            ]
            : []),
        { kind: 'vector', to: state.u, color: SPACE.red, label: 'u' },
        { kind: 'vector', to: state.v, color: SPACE.blue, label: 'v' }
    ]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={rightHandChallenges} extraChallenges={rightHandExtra} state={state}>
            <Board3D scene={scene} language={props.language} range={5} height={BOARD_HEIGHT} label={l(say(`u${vec(state.u)} eta v${vec(state.v)} bektoreen paralelogramoa eta haien biderkadura bektoriala`, `El paralelogramo de u${vec(state.u)} y v${vec(state.v)} y su producto vectorial`, `متوازي أضلاع u${vec(state.u)} وv${vec(state.v)} وجداؤهما المتجهي`, `The parallelogram of u${vec(state.u)} and v${vec(state.v)} and their cross product`))} />
        </ToolFrame>
    )
}

/* ---------- L5. The box of three vectors ---------- */

export function BoxVolumeTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<BoxVolumeState>(initialBoxVolumeState)
    const [editing, setEditing] = useState<BoxVectorName>('w')
    const [shape, setShape] = useState<'box' | 'tetra'>('box')
    const shown = state.prediction !== null
    const playback = usePlayback(`${vec(state.u)}${vec(state.v)}${vec(state.w)}`, 1600)
    const progress = shown && playback.progress !== null ? playback.progress : 0
    const w = progress > 0 ? flattenedW(state, progress) : state.w
    const product = boxProduct(state)
    const volume = boxVolume(state)
    const previous = state.previous ? boxVolume(state.previous) : null
    const controls = (
        <>
            <VectorEditor names={['u', 'v', 'w'] as BoxVectorName[]} current={editing} value={state[editing]} limit={BOX_LIMIT} language={props.language} label={EDIT_VECTOR} onPick={setEditing} onChange={(next) => setState((s) => setBoxVector(s, editing, next))} />
            <Segmented label={l(say('Irudia', 'Figura', 'الشكل', 'Shape'))} value={shape} options={[{ value: 'box', label: l(say('Kutxa', 'Caja', 'الصندوق', 'Box')) }, { value: 'tetra', label: l(say('Tetraedroa', 'Tetraedro', 'رباعي الأوجه', 'Tetrahedron')) }]} onChange={setShape} />
        </>
    )
    const lines = [
        `[\\vec{u},\\vec{v},\\vec{w}]=\\begin{vmatrix}${[state.u, state.v, state.w].map((row) => row.join('&')).join('\\\\')}\\end{vmatrix}=${product}`,
        `V=|${product}|=${volume}\\qquad V_{\\text{T}}=\\frac{${volume}}{6}${relation(volume / 6)}${exact(volume / 6, props.language)}`
    ]
    if (previous !== null) lines.push(`V_{0}=${previous}`)
    const note = volume === 0
        ? say('Kutxa zapalduta dago: hiru bektoreak planokideak dira.', 'La caja está aplastada: los tres vectores son coplanarios.', 'الصندوق منضغط: المتجهات الثلاثة مستوية.', 'The box is flat: the three vectors are coplanar.')
        : previous === null || previous === volume
            ? say('Bolumena ez da aldatu.', 'El volumen no ha cambiado.', 'لم يتغير الحجم.', 'The volume has not changed.')
            : volume > previous
                ? say('Bolumena handitu da.', 'El volumen ha crecido.', 'زاد الحجم.', 'The volume has grown.')
                : say('Bolumena txikitu da.', 'El volumen ha bajado.', 'نقص الحجم.', 'The volume has gone down.')
    const readout = (
        <>
            <Predict
                language={props.language}
                question={say('Ikusi aurretik: aurreko kutxarekin alderatuta ($V_0$), bolumena txikitu, berdin geratu ala handitu da?', 'Antes de verlo: comparado con la caja anterior ($V_0$), ¿el volumen ha bajado, sigue igual o ha crecido?', 'قبل أن ترى: مقارنة بالصندوق السابق ($V_0$)، هل نقص الحجم أم بقي كما هو أم زاد؟', 'Before you see it: compared with the box before ($V_0$), has the volume gone down, stayed the same or grown?')}
                labels={{ '<': say('Txikitu', 'Ha bajado', 'نقص', 'Down'), '=': say('Berdin', 'Igual', 'كما هو', 'Same'), '>': say('Handitu', 'Ha crecido', 'زاد', 'Up') }}
                actual={boxPrediction(state)}
                choice={state.prediction}
                tip={say('Oinarria berdina bada, altuera bakarrik axola da: $\\vec{w}$ bektorearen distantzia oinarriaren planora.', 'Si la base es la misma, solo cuenta la altura: la distancia de $\\vec{w}$ al plano de la base.', 'إذا بقيت القاعدة نفسها فلا يهم إلا الارتفاع: بعد $\\vec{w}$ عن مستوى القاعدة.', 'If the base is the same, only the height counts: how far $\\vec{w}$ is from the plane of the base.')}
                onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
            >
                <Readout latex={lines} note={l(note)} />
            </Predict>
            {shown && volume > 0 && <PlayButton label={l(say('Zapaldu kutxa', 'Aplasta la caja', 'اضغط الصندوق', 'Flatten the box'))} disabled={false} playing={playback.playing} onPlay={playback.play} />}
        </>
    )
    const tetraFaces = (origin: Vec3, a: Vec3, b: Vec3, c: Vec3): SceneItem[] => {
        const [p, q, r] = [add(origin, a), add(origin, b), add(origin, c)]
        return [[origin, p, q], [origin, p, r], [origin, q, r], [p, q, r]].map((points) => ({ kind: 'polygon' as const, points, color: SPACE.planeRed, opacity: 0.32, stroke: SPACE.red }))
    }
    const scene: SceneItem[] = [
        ...(state.previous && !shown ? [{ kind: 'box' as const, origin: [0, 0, 0] as Vec3, edges: [state.previous.u, state.previous.v, state.previous.w] as const, color: SPACE.planeGreen, opacity: 0.04, stroke: SPACE.muted }] : []),
        ...(shown
            ? [{ kind: 'box' as const, origin: [0, 0, 0] as Vec3, edges: [state.u, state.v, w] as const, opacity: shape === 'box' ? 0.18 : 0.05 }, ...(shape === 'tetra' ? tetraFaces([0, 0, 0], state.u, state.v, w) : [])]
            : [parallelogram([0, 0, 0], state.u, state.v, SPACE.planeGreen, 0.35)]),
        { kind: 'vector', to: state.u, color: SPACE.red, label: 'u' },
        { kind: 'vector', to: state.v, color: SPACE.blue, label: 'v' },
        { kind: 'vector', to: w, color: SPACE.violet, label: 'w' }
    ]
    const n = cross(state.u, state.v)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={boxVolumeChallenges} extraChallenges={boxVolumeExtra} state={state}>
            <Board3D scene={scene} language={props.language} range={4} height={BOARD_HEIGHT} label={l(say(`u${vec(state.u)}, v${vec(state.v)} eta w${vec(state.w)} ertzak dituen kutxa; oinarriaren normala ${vec(n)}`, `La caja de aristas u${vec(state.u)}, v${vec(state.v)} y w${vec(state.w)}; normal de la base ${vec(n)}`, `الصندوق ذو الأحرف u${vec(state.u)} وv${vec(state.v)} وw${vec(state.w)}؛ ناظم القاعدة ${vec(n)}`, `The box with edges u${vec(state.u)}, v${vec(state.v)} and w${vec(state.w)}; normal of the base ${vec(n)}`))} />
        </ToolFrame>
    )
}
