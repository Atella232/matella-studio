import { useState, type ReactNode } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, GREEN, INK, MUSTARD, MUTED, say, SECOND, SECOND_TINT, STAGE, STAGE_TINT, texDec } from '../../dbh3-segidak/lab/labStyle'
import { placeFlag, rotate, type Point } from '../motion'
import { initialMirrorState, MIRROR_K, MIRROR_KINDS, MIRROR_START, mirrorChallenges, mirrorExtra, mirrorFlag, mirrorPrediction, mirrorTip, setMirror, type MirrorKind, type MirrorState } from './mirror'
import { setPrediction } from './prediction'
import { initialSlideState, setSlide, SLIDE_LIMITS, SLIDE_START, slideChallenges, slideExtra, slideFlag, slideLength, slidePrediction, slideTip, type SlideState } from './slide'
import { initialTurnState, setTurn, TURN_ANGLES, TURN_CENTRE, TURN_START, turnChallenges, turnExtra, turnFlag, turnPrediction, turnTip, type TurnState } from './turn'
import { CROSSING_ANGLES, GAP, initialTwoMirrorsState, setTwoMirrors, TWO_MIRRORS_START, twoMirrorsChallenges, twoMirrorsExtra, twoMirrorsFlags, twoMirrorsMove, twoMirrorsPrediction, type TwoMirrorsMode, type TwoMirrorsState } from './twoMirrors'

/* ==========================================================================
   Planoko mugimenduak · 3. DBH — the four tools of this unit: slide the
   flag, turn it, reflect it in a mirror and reflect it in two mirrors.
   Each asks for a prediction before it shows the image, and each moves
   with ▶. The flag and the movements come from ../motion.ts; the board,
   the readout and the prediction from Segidak 3. DBH.
   ========================================================================== */

const UNIT = 20
const X = (x: number) => 180 + x * UNIT
const Y = (y: number) => 172 - y * UNIT
const point = ([x, y]: Point) => `(${x},\\ ${y})`

/** The grid from −8 to 8 with its axes, clipped so that far images do not spill over */
function Plane({ label, children }: { label: string; children: ReactNode }) {
    return (
        <Board height={344} label={label}>
            <defs><clipPath id="mugimenduak-plane"><rect x={X(-8)} y={Y(8)} width={16 * UNIT} height={16 * UNIT} /></clipPath></defs>
            {Array.from({ length: 17 }, (_, i) => i - 8).map((value) => (
                <g key={value}>
                    <line x1={X(value)} x2={X(value)} y1={Y(8)} y2={Y(-8)} stroke={value === 0 ? MUTED : 'var(--line, #e6dfd1)'} strokeWidth={value === 0 ? 1.4 : 1} />
                    <line y1={Y(value)} y2={Y(value)} x1={X(-8)} x2={X(8)} stroke={value === 0 ? MUTED : 'var(--line, #e6dfd1)'} strokeWidth={value === 0 ? 1.4 : 1} />
                </g>
            ))}
            {[-6, -4, -2, 2, 4, 6].map((value) => <text key={`x${value}`} x={X(value)} y={Y(0) + 14} textAnchor="middle" fontSize={10} fill={MUTED}>{value}</text>)}
            {[-6, -4, -2, 2, 4, 6].map((value) => <text key={`y${value}`} x={X(0) - 4} y={Y(value) + 4} textAnchor="end" fontSize={10} fill={MUTED}>{value}</text>)}
            <g clipPath="url(#mugimenduak-plane)">{children}</g>
        </Board>
    )
}

function Flag({ points, colour, tint, tip, faded = false }: { points: Point[]; colour: string; tint: string; tip?: string; faded?: boolean }) {
    const [base, top, end, low] = points
    return (
        <g opacity={faded ? 0.45 : 1}>
            <line x1={X(base[0])} y1={Y(base[1])} x2={X(top[0])} y2={Y(top[1])} stroke={colour} strokeWidth={3} strokeLinecap="round" />
            <polygon points={[top, end, low].map(([x, y]) => `${X(x)},${Y(y)}`).join(' ')} fill={tint} stroke={colour} strokeWidth={2.2} strokeLinejoin="round" />
            <circle cx={X(end[0])} cy={Y(end[1])} r={4} fill={colour} />
            {tip && <text x={X(end[0]) + 6} y={Y(end[1]) - 6} fontSize={14} fontWeight={700} fill={colour}>{tip}</text>}
        </g>
    )
}

/** A flag part of the way from one position to another */
const between = (from: Point[], to: Point[], t: number): Point[] => from.map(([x, y], index) => [x + (to[index][0] - x) * t, y + (to[index][1] - y) * t])

const sidePrediction = {
    question: say('Ikusi aurretik: $P\'$ $P$ puntuaren ezkerrean, parean ala eskuinean geratuko da?', 'Antes de verlo: ¿$P\'$ quedará a la izquierda de $P$, a su altura o a la derecha?', 'قبل رؤيتها: هل تقع $P\'$ يسار $P$ أم بمحاذاتها أم يمينها؟', 'Before you see it: will $P\'$ be to the left of $P$, level with it or to its right?'),
    labels: { '<': say('Ezkerrean', 'A la izquierda', 'يسارها', 'To the left'), '=': say('Parean', 'A su altura', 'بمحاذاتها', 'Level'), '>': say('Eskuinean', 'A la derecha', 'يمينها', 'To the right') }
}

/* ---------- L1. Slide the flag ---------- */

export function SlideTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SlideState>(initialSlideState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.a}-${state.b}`, 1600)
    const start = placeFlag(SLIDE_START)
    const end = slideFlag(state)
    const moving = playback.playing ? between(start, end, playback.progress ?? 0) : end
    const length = slideLength(state)
    const controls = (
        <>
            <Stepper label={l(say('Bektorea: a', 'Vector: a', 'المتجه: a', 'Vector: a'))} value={state.a} min={SLIDE_LIMITS.a.min} max={SLIDE_LIMITS.a.max} onChange={(a) => setState((s) => setSlide(s, { a }))} language={props.language} />
            <Stepper label={l(say('Bektorea: b', 'Vector: b', 'المتجه: b', 'Vector: b'))} value={state.b} min={SLIDE_LIMITS.b.min} max={SLIDE_LIMITS.b.max} onChange={(b) => setState((s) => setSlide(s, { b }))} language={props.language} />
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: bandera 5 unitate baino gutxiago, 5 ala gehiago mugituko da?', 'Antes de verlo: ¿la bandera se moverá menos de 5 unidades, 5 o más?', 'قبل رؤيته: هل يتحرك العلم أقل من 5 وحدات أم 5 أم أكثر؟', 'Before you see it: will the flag move less than 5 units, 5 or more?')}
            labels={{ '<': say('Gutxiago', 'Menos', 'أقل', 'Less'), '=': say('Justu 5', 'Justo 5', '5 تمامًا', 'Exactly 5'), '>': say('Gehiago', 'Más', 'أكثر', 'More') }}
            actual={slidePrediction(state)}
            choice={state.prediction}
            tip={say('Bektorearen modulua: $\\sqrt{a^{2}+b^{2}}$.', 'El módulo del vector: $\\sqrt{a^{2}+b^{2}}$.', 'طول المتجه: $\\sqrt{a^{2}+b^{2}}$.', 'The length of the vector: $\\sqrt{a^{2}+b^{2}}$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[`P'=(-1,\\ 0)+(${state.a},\\ ${state.b})=${point(slideTip(state))}`, `|\\vec{v}|=\\sqrt{${state.a * state.a}+${state.b * state.b}}${Number.isInteger(length) ? '=' : '\\approx '}${texDec(length, props.language)}`]}
                note={l(say('Puntu guztiak bektore berarekin mugitzen dira: bandera ez da biratzen.', 'Todos los puntos se mueven con el mismo vector: la bandera no gira.', 'تتحرك كل النقاط بالمتجه نفسه: لا يدور العلم.', 'Every point moves by the same vector: the flag does not turn.'))}
            />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={slideChallenges} extraChallenges={slideExtra} state={state}>
            <Plane label={l(say(`Bandera (${state.a}, ${state.b}) bektorearekin`, `La bandera con el vector (${state.a}, ${state.b})`, `العلم بالمتجه (${state.a}, ${state.b})`, `The flag with the vector (${state.a}, ${state.b})`))}>
                <Flag points={start} colour={STAGE} tint={STAGE_TINT} tip="P" />
                {shown
                    ? (
                        <>
                            <line x1={X(start[2][0])} y1={Y(start[2][1])} x2={X(end[2][0])} y2={Y(end[2][1])} stroke={GREEN} strokeWidth={2.4} strokeDasharray="6 4" />
                            <Flag points={moving} colour={SECOND} tint={SECOND_TINT} tip="P′" />
                        </>
                    )
                    : <Hidden x={X(4)} y={Y(4)} />}
            </Plane>
            <PlayButton label={l(say('Lekualdatu', 'Traslada', 'انقل', 'Translate'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L2. Turn the flag ---------- */

export function TurnTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TurnState>(initialTurnState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.angle}-${state.centre.join(',')}`, 1800)
    const angle = playback.playing ? (playback.progress ?? 0) * state.angle : state.angle
    const start = placeFlag(TURN_START)
    const turned = playback.playing ? start.map((p) => rotate(p, angle, state.centre)) : turnFlag(state)
    const controls = (
        <>
            <Segmented label={l(say('Angelua', 'Ángulo', 'الزاوية', 'Angle'))} value={String(state.angle)} options={TURN_ANGLES.map((value) => ({ value: String(value), label: `${value}°` }))} onChange={(value) => setState((s) => setTurn(s, { angle: Number(value) }))} />
            <Stepper label={l(say('Zentroa: x', 'Centro: x', 'المركز: x', 'Centre: x'))} value={state.centre[0]} min={TURN_CENTRE.min} max={TURN_CENTRE.max} onChange={(x) => setState((s) => setTurn(s, { x }))} language={props.language} />
            <Stepper label={l(say('Zentroa: y', 'Centro: y', 'المركز: y', 'Centre: y'))} value={state.centre[1]} min={TURN_CENTRE.min} max={TURN_CENTRE.max} onChange={(y) => setState((s) => setTurn(s, { y }))} language={props.language} />
        </>
    )
    const tip = turnTip(state)
    const readout = (
        <Predict
            language={props.language}
            question={sidePrediction.question}
            labels={sidePrediction.labels}
            actual={turnPrediction(state)}
            choice={state.prediction}
            tip={say('Zentrotik $P$ punturako gezia biratu: $90°$ biraketak ezkerrerantz eramaten du goiko puntua.', 'Gira la flecha del centro a $P$: un giro de $90°$ lleva hacia la izquierda los puntos de arriba.', 'أدِر السهم من المركز إلى $P$: دوران $90°$ يأخذ النقاط العليا نحو اليسار.', 'Turn the arrow from the centre to $P$: a $90°$ turn takes points above the centre to the left.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[`P=(3,\\ 2)\\to P'=${point(tip)}`]}
                note={l(say(`Zentrotik distantzia bera: ${dec(Math.hypot(3 - state.centre[0], 2 - state.centre[1]), props.language)}.`, `La misma distancia al centro: ${dec(Math.hypot(3 - state.centre[0], 2 - state.centre[1]), props.language)}.`, `البعد نفسه عن المركز: ${dec(Math.hypot(3 - state.centre[0], 2 - state.centre[1]), props.language)}.`, `The same distance from the centre: ${dec(Math.hypot(3 - state.centre[0], 2 - state.centre[1]), props.language)}.`))}
            />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={turnChallenges} extraChallenges={turnExtra} state={state}>
            <Plane label={l(say(`Biraketa: ${state.angle}°, zentroa (${state.centre.join(', ')})`, `Giro de ${state.angle}°, centro (${state.centre.join(', ')})`, `دوران ${state.angle}°، المركز (${state.centre.join(', ')})`, `Rotation by ${state.angle}°, centre (${state.centre.join(', ')})`))}>
                <Flag points={start} colour={STAGE} tint={STAGE_TINT} tip="P" />
                {shown ? <Flag points={turned} colour={SECOND} tint={SECOND_TINT} tip="P′" /> : <Hidden x={X(-4)} y={Y(4)} />}
                <circle cx={X(state.centre[0])} cy={Y(state.centre[1])} r={5} fill={MUSTARD} stroke={INK} strokeWidth={1.4} />
            </Plane>
            <PlayButton label={l(say('Biratu', 'Gira', 'أدِر', 'Rotate'))} disabled={!shown || state.angle === 0} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L3. The mirror ---------- */

const MIRROR_NAMES: Record<MirrorKind, ReturnType<typeof say>> = {
    vertical: say('x = k', 'x = k', 'x = k', 'x = k'),
    horizontal: say('y = k', 'y = k', 'y = k', 'y = k'),
    diagonal: say('y = x', 'y = x', 'y = x', 'y = x')
}

export function MirrorTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<MirrorState>(initialMirrorState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.kind}-${state.k}`, 1500)
    const start = placeFlag(MIRROR_START)
    const image = mirrorFlag(state)
    // ▶ folds the flag over the mirror: every point goes straight across it
    const folded = playback.playing ? between(start, image, playback.progress ?? 0) : image
    const controls = (
        <>
            <Segmented label={l(say('Ispilua', 'Espejo', 'المرآة', 'Mirror'))} value={state.kind} options={MIRROR_KINDS.map((kind) => ({ value: kind, label: l(MIRROR_NAMES[kind]) }))} onChange={(kind) => setState((s) => setMirror(s, { kind: kind as MirrorKind }))} />
            {state.kind !== 'diagonal' && <Stepper label="k" value={state.k} min={MIRROR_K.min} max={MIRROR_K.max} onChange={(k) => setState((s) => setMirror(s, { k }))} language={props.language} />}
        </>
    )
    const tip = mirrorTip(state)
    const readout = (
        <Predict
            language={props.language}
            question={sidePrediction.question}
            labels={sidePrediction.labels}
            actual={mirrorPrediction(state)}
            choice={state.prediction}
            tip={say('Ispilu horizontal batek ez du $x$ aldatzen; bertikal batek $x\\to 2k-x$.', 'Un espejo horizontal no cambia la $x$; uno vertical hace $x\\to 2k-x$.', 'المرآة الأفقية لا تغيّر $x$؛ والعمودية تجعل $x\\to 2k-x$.', 'A horizontal mirror does not change $x$; a vertical one makes $x\\to 2k-x$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[`P=(3,\\ 2)\\to P'=${point(tip)}`]}
                note={l(say('Ispiluak bandera iraultzen du: ezkerra eskuin bihurtzen da.', 'El espejo da la vuelta a la bandera: la izquierda pasa a ser la derecha.', 'تقلب المرآة العلم: يصير اليسار يمينًا.', 'The mirror flips the flag: left becomes right.'))}
            />
        </Predict>
    )
    const mirrorLine = state.kind === 'vertical'
        ? <line x1={X(state.k)} x2={X(state.k)} y1={Y(8)} y2={Y(-8)} stroke={GREEN} strokeWidth={3} />
        : state.kind === 'horizontal'
            ? <line x1={X(-8)} x2={X(8)} y1={Y(state.k)} y2={Y(state.k)} stroke={GREEN} strokeWidth={3} />
            : <line x1={X(-8)} x2={X(8)} y1={Y(-8)} y2={Y(8)} stroke={GREEN} strokeWidth={3} />
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={mirrorChallenges} extraChallenges={mirrorExtra} state={state}>
            <Plane label={l(say('Bandera eta haren irudia ispiluan', 'La bandera y su imagen en el espejo', 'العلم وصورته في المرآة', 'The flag and its image in the mirror'))}>
                {mirrorLine}
                <Flag points={start} colour={STAGE} tint={STAGE_TINT} tip="P" />
                {shown ? <Flag points={folded} colour={SECOND} tint={SECOND_TINT} tip="P′" /> : <Hidden x={X(-4)} y={Y(4)} />}
            </Plane>
            <PlayButton label={l(say('Tolestu', 'Dobla', 'اطوِ', 'Fold'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L4. Two mirrors ---------- */

export function TwoMirrorsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TwoMirrorsState>(initialTwoMirrorsState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.mode}-${state.gap}-${state.angle}`, 2400)
    const start = placeFlag(TWO_MIRRORS_START)
    const { once, twice } = twoMirrorsFlags(state)
    const t = playback.progress ?? 1
    // ▶: the first reflection in the first half, the second in the second half
    const firstStep = playback.playing ? between(start, once, Math.min(1, t * 2)) : once
    const secondStep = playback.playing ? (t < 0.5 ? null : between(once, twice, (t - 0.5) * 2)) : twice
    const controls = (
        <>
            <Segmented label={l(say('Ispiluak', 'Espejos', 'المرآتان', 'Mirrors'))} value={state.mode} options={[{ value: 'parallel', label: l(say('Paraleloak', 'Paralelos', 'متوازيتان', 'Parallel')) }, { value: 'crossing', label: l(say('Ebakitzaileak', 'Secantes', 'متقاطعتان', 'Crossing')) }]} onChange={(mode) => setState((s) => setTwoMirrors(s, { mode: mode as TwoMirrorsMode }))} />
            {state.mode === 'parallel'
                ? <Stepper label={l(say('Bigarren ispilua: x = d', 'Segundo espejo: x = d', 'المرآة الثانية: x = d', 'Second mirror: x = d'))} value={state.gap} min={GAP.min} max={GAP.max} onChange={(gap) => setState((s) => setTwoMirrors(s, { gap }))} language={props.language} />
                : <Segmented label={l(say('Ispiluen arteko angelua', 'Ángulo entre los espejos', 'الزاوية بين المرآتين', 'Angle between the mirrors'))} value={String(state.angle)} options={CROSSING_ANGLES.map((value) => ({ value: String(value), label: `${value}°` }))} onChange={(value) => setState((s) => setTwoMirrors(s, { angle: Number(value) }))} />}
        </>
    )
    const move = twoMirrorsMove(state)
    const readout = (
        <Predict
            language={props.language}
            question={state.mode === 'parallel'
                ? say('Ikusi aurretik: bandera ispiluen arteko distantzia baino gutxiago, adina ala gehiago mugituko da?', 'Antes de verlo: ¿la bandera se moverá menos, lo mismo o más que la distancia entre los espejos?', 'قبل رؤيته: هل يتحرك العلم أقل من المسافة بين المرآتين أم مثلها أم أكثر؟', 'Before you see it: will the flag move less than, the same as or more than the distance between the mirrors?')
                : say('Ikusi aurretik: bandera ispiluen arteko angelua baino gutxiago, adina ala gehiago biratuko da?', 'Antes de verlo: ¿la bandera girará menos, lo mismo o más que el ángulo entre los espejos?', 'قبل رؤيته: هل يدور العلم أقل من الزاوية بين المرآتين أم مثلها أم أكثر؟', 'Before you see it: will the flag turn less than, the same as or more than the angle between the mirrors?')}
            labels={{ '<': say('Gutxiago', 'Menos', 'أقل', 'Less'), '=': say('Adina', 'Lo mismo', 'مثلها', 'The same'), '>': say('Gehiago', 'Más', 'أكثر', 'More') }}
            actual={twoMirrorsPrediction(state)}
            choice={state.prediction}
            tip={say('Bi islapen: mugimendua bikoitza da.', 'Dos reflexiones: el movimiento es el doble.', 'انعكاسان: الحركة ضعفان.', 'Two reflections: the movement is doubled.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[state.mode === 'parallel' ? `\\vec{v}=(2\\cdot ${state.gap},\\ 0)=(${2 * state.gap},\\ 0)` : `2\\cdot ${state.angle}°=${move}°`]}
                note={l(state.mode === 'parallel'
                    ? say('Ispilu paraleloak: lekualdaketa bat, distantziaren bikoitza.', 'Espejos paralelos: una traslación del doble de la distancia.', 'مرآتان متوازيتان: انسحاب بضعف المسافة.', 'Parallel mirrors: a translation of twice the distance.')
                    : say('Ispilu ebakitzaileak: biraketa bat, angeluaren bikoitza.', 'Espejos que se cortan: un giro del doble del ángulo.', 'مرآتان متقاطعتان: دوران بضعف الزاوية.', 'Crossing mirrors: a rotation of twice the angle.'))}
            />
        </Predict>
    )
    const radians = (state.angle * Math.PI) / 180
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={twoMirrorsChallenges} extraChallenges={twoMirrorsExtra} state={state}>
            <Plane label={l(say('Bandera bi ispilutan', 'La bandera en dos espejos', 'العلم في مرآتين', 'The flag in two mirrors'))}>
                {state.mode === 'parallel'
                    ? (
                        <>
                            <line x1={X(0)} x2={X(0)} y1={Y(8)} y2={Y(-8)} stroke={GREEN} strokeWidth={3} />
                            <line x1={X(state.gap)} x2={X(state.gap)} y1={Y(8)} y2={Y(-8)} stroke={MUSTARD} strokeWidth={3} />
                        </>
                    )
                    : (
                        <>
                            <line x1={X(-8)} x2={X(8)} y1={Y(0)} y2={Y(0)} stroke={GREEN} strokeWidth={3} />
                            <line x1={X(-12 * Math.cos(radians))} y1={Y(-12 * Math.sin(radians))} x2={X(12 * Math.cos(radians))} y2={Y(12 * Math.sin(radians))} stroke={MUSTARD} strokeWidth={3} />
                        </>
                    )}
                <Flag points={start} colour={STAGE} tint={STAGE_TINT} />
                {shown && <Flag points={firstStep} colour={MUTED} tint="#ece6da" faded />}
                {shown && secondStep && <Flag points={secondStep} colour={SECOND} tint={SECOND_TINT} />}
                {!shown && <Hidden x={X(-5)} y={Y(5)} />}
            </Plane>
            <PlayButton label={l(say('Islatu bi aldiz', 'Refleja dos veces', 'اعكس مرتين', 'Reflect twice'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}
