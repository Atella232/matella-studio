import { useState, type ReactNode } from 'react'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, GREEN, GREEN_TINT, INK, MUSTARD, MUSTARD_TINT, MUTED, say, SECOND, SECOND_TINT, STAGE, STAGE_TINT, texDec } from '../../dbh3-segidak/lab/labStyle'
import { agesChallenges, agesExtra, agesFound, agesPrediction, agesRatio, AGES_SCENARIOS, AGES_T, initialAgesState, setAges, setAgesPrediction, startAges, type AgesState } from './ages'
import { applyMove, BALANCE_EQUATIONS, balanceChallenges, balanceExtra, balancePrediction, balanceSolved, boxWeight, canMove, initialBalanceState, pansLatex, randomPans, setBalancePrediction, solutionSteps, startEquation, type BalanceMove, type BalanceState, type Pans } from './balance'
import { GROUND_LIMITS, groundChallenges, groundDiscriminant, groundExtra, groundLatex, groundPrediction, groundRoots, initialGroundState, setGround, type GroundState } from './ground'
import { setPrediction } from './prediction'
import { eliminated, initialScalesState, panLatex, SCALE_LIMIT, SCALE_SYSTEMS, scalesChallenges, scalesExtra, scalesLevel, scalesPrediction, setScales, setScalesPrediction, startSystem, tilt, type Pan, type ScalesState } from './scales'

/* ==========================================================================
   Ekuazioak eta sistemak · 3. DBH — the four tools of this unit: the
   balance, the parabola and the ground, the two balances and the ages on
   a timeline. Each asks for a prediction before it shows the result, and
   each moves with ▶. Logic in the .ts files next to this one; the board,
   the readout and the prediction come from Segidak 3. DBH.
   ========================================================================== */

const KILO = MUSTARD
const BOX = STAGE

/** The things on a pan, from the plate upwards: boxes first, then kilos, six to a row */
function PanLoad({ cx, plate, boxes, kilos, faded = 0 }: { cx: number; plate: number; boxes: number; kilos: number; faded?: number }) {
    const items: ReactNode[] = []
    const cell = 22
    const all = [...Array.from({ length: boxes }, () => 'box' as const), ...Array.from({ length: kilos }, () => 'kilo' as const)]
    all.forEach((kind, index) => {
        const row = Math.floor(index / 6)
        const column = index % 6
        const inRow = Math.min(6, all.length - row * 6)
        const x = cx - (inRow * cell) / 2 + column * cell + cell / 2
        const y = plate - 12 - row * cell
        items.push(kind === 'box'
            ? <g key={index} opacity={1 - faded}><rect x={x - 10} y={y - 10} width={20} height={20} rx={3} fill={STAGE_TINT} stroke={BOX} strokeWidth={2} /><text x={x} y={y + 5} textAnchor="middle" fontSize={13} fontWeight={700} fill={BOX}>x</text></g>
            : <circle key={index} cx={x} cy={y} r={8.5} fill={MUSTARD_TINT} stroke={KILO} strokeWidth={2} />)
    })
    return <g>{items}</g>
}

/** A balance: beam, two plates and a stand, tilted by `angle` degrees (left side down when positive) */
function Balance({ cx, top, half, angle, left, right }: { cx: number; top: number; half: number; angle: number; left: ReactNode; right: ReactNode }) {
    const radians = (angle * Math.PI) / 180
    const leftY = top + Math.sin(radians) * half
    const rightY = top - Math.sin(radians) * half
    const leftX = cx - Math.cos(radians) * half
    const rightX = cx + Math.cos(radians) * half
    return (
        <g>
            <path d={`M${cx - 26} ${top + 110} L${cx + 26} ${top + 110} L${cx} ${top + 4} Z`} fill="#ece6da" stroke={INK} strokeWidth={1.6} />
            <line x1={leftX} y1={leftY} x2={rightX} y2={rightY} stroke={INK} strokeWidth={4} strokeLinecap="round" />
            <circle cx={cx} cy={top} r={5} fill={INK} />
            {[[leftX, leftY], [rightX, rightY]].map(([x, y], index) => (
                <g key={index}>
                    <line x1={x} y1={y} x2={x} y2={y + 70} stroke={MUTED} strokeWidth={1.4} />
                    <line x1={x - half * 0.62} y1={y + 70} x2={x + half * 0.62} y2={y + 70} stroke={INK} strokeWidth={3} strokeLinecap="round" />
                    <g transform={`translate(${x - (index === 0 ? cx - half : cx + half)} ${y - top})`}>{index === 0 ? left : right}</g>
                </g>
            ))}
        </g>
    )
}

/* ---------- L1. The balance ---------- */

const MOVES: Array<{ move: BalanceMove; label: ReturnType<typeof say> }> = [
    { move: 'box', label: say('Kendu kaxa bat bietan', 'Quita una caja de cada lado', 'أزل صندوقًا من كل جانب', 'Take a box off each side') },
    { move: 'kilo', label: say('Kendu kilo bat bietan', 'Quita un kilo de cada lado', 'أزل كيلوغرامًا من كل جانب', 'Take a kilo off each side') },
    { move: 'share', label: say('Banatu kaxen artean', 'Reparte entre las cajas', 'وزّع على الصناديق', 'Share among the boxes') }
]

export function BalanceTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<BalanceState>(initialBalanceState)
    const shown = state.prediction !== null
    const steps = solutionSteps(state.start)
    const playback = usePlayback(`${pansLatex(state.start)}-${state.moves}`, 600 * Math.max(1, steps.length - 1))
    // ▶ shows the whole solution from the start; afterwards the learner's own pans come back
    const pans: Pans = playback.playing ? steps[Math.min(steps.length - 1, Math.floor((playback.progress ?? 0) * steps.length))] : state.pans
    const solved = balanceSolved(pans)
    const weight = boxWeight(state.start)
    const controls = (
        <>
            <Segmented label={l(say('Ekuazioa', 'Ecuación', 'المعادلة', 'Equation'))} value={String(state.equation)} options={[...BALANCE_EQUATIONS.map((_, index) => ({ value: String(index), label: String(index + 1) })), ...(state.equation === -1 ? [{ value: '-1', label: '🎲' }] : [])]} onChange={(equation) => setState(Number(equation) >= 0 ? startEquation(Number(equation)) : state)} />
            <div className="fraction-v2-lab-quick-actions">
                <button type="button" onClick={() => { const start = randomPans(createRandom(randomSeed())); setState({ equation: -1, start, pans: { ...start }, moves: 0, prediction: null }) }}>{`🎲 ${l(say('Beste bat', 'Otra', 'أخرى', 'Another'))}`}</button>
                <button type="button" onClick={() => setState((s) => ({ ...s, pans: { ...s.start }, moves: 0 }))}>{l(say('Hasieratik', 'Desde el principio', 'من البداية', 'Start again'))}</button>
            </div>
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say('Hasi aurretik: kaxa batek 4 kilo baino gutxiago, 4 kilo ala gehiago pisatzen du?', 'Antes de empezar: ¿una caja pesa menos de 4 kilos, 4 kilos o más?', 'قبل البدء: هل يزن الصندوق أقل من 4 كيلوغرامات أم 4 أم أكثر؟', 'Before you start: does a box weigh less than 4 kilos, 4 kilos or more?')}
            labels={{ '<': say('4 kilo baino gutxiago', 'Menos de 4 kilos', 'أقل من 4', 'Less than 4 kilos'), '=': say('Justu 4 kilo', 'Justo 4 kilos', '4 تمامًا', 'Exactly 4 kilos'), '>': say('4 kilo baino gehiago', 'Más de 4 kilos', 'أكثر من 4', 'More than 4 kilos') }}
            actual={balancePrediction(state)}
            choice={state.prediction}
            tip={say(`Kaxa batek ${weight} kilo pisatzen ditu: probatu ordezkatuz.`, `Una caja pesa ${weight} kilos: compruébalo sustituyendo.`, `يزن الصندوق ${weight} كيلوغرامات: تحقّق بالتعويض.`, `A box weighs ${weight} kilos: check it by substituting.`)}
            onChoose={(prediction) => setState((s) => setBalancePrediction(s, prediction))}
        >
            <Readout
                latex={[pansLatex(pans)]}
                note={solved
                    ? l(say(`Kaxa bat bakarrik geratzen da: x = ${weight}. ${state.moves} mugimendu.`, `Queda una caja sola: x = ${weight}. ${state.moves} movimientos.`, `بقي صندوق وحده: x = ${weight}. عدد الحركات ${state.moves}.`, `A single box is left: x = ${weight}. ${state.moves} moves.`))
                    : l(say('Egin gauza bera bi platerretan: balantza orekan geratzen da.', 'Haz lo mismo en los dos platillos: la balanza sigue en equilibrio.', 'افعل الشيء نفسه في الكفتين: يبقى الميزان متوازنًا.', 'Do the same on both pans: the balance stays level.'))}
            />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={balanceChallenges} extraChallenges={balanceExtra} state={state}>
            <Board height={232} label={l(say(`Balantza: ${pansLatex(pans)}`, `Balanza: ${pansLatex(pans)}`, `الميزان: ${pansLatex(pans)}`, `Balance: ${pansLatex(pans)}`))}>
                <Balance cx={180} top={40} half={110} angle={0}
                    left={<PanLoad cx={70} plate={110} boxes={pans.a} kilos={pans.b} />}
                    right={<PanLoad cx={290} plate={110} boxes={pans.c} kilos={pans.d} />} />
                <rect x={14} y={206} width={14} height={14} rx={3} fill={STAGE_TINT} stroke={BOX} strokeWidth={2} />
                <Label x={34} y={218} fontSize={13} fill={MUTED}>{`= x ${l(say('kilo', 'kilos', 'كغ', 'kilos'))}`}</Label>
                <circle cx={208} cy={213} r={7} fill={MUSTARD_TINT} stroke={KILO} strokeWidth={2} />
                <Label x={222} y={218} fontSize={13} fill={MUTED}>{`= 1 ${l(say('kilo', 'kilo', 'كغ', 'kilo'))}`}</Label>
            </Board>
            <div className="fraction-v2-lab-quick-actions" style={{ width: '100%', maxWidth: 520, margin: '0 auto', flexWrap: 'wrap' }}>
                {MOVES.map(({ move, label }) => <button key={move} type="button" disabled={!shown || solved || playback.playing || !canMove(state.pans, move)} onClick={() => setState((s) => applyMove(s, move))}>{l(label)}</button>)}
            </div>
            <PlayButton label={l(say('Erakutsi ebazpena', 'Muestra la solución', 'اعرض الحل', 'Show the solution'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L2. The parabola and the ground ---------- */

export function GroundTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<GroundState>(initialGroundState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.b}-${state.c}`, 1600)
    // ▶ lowers the parabola onto its place from 14 units above
    const lift = playback.playing ? (1 - (playback.progress ?? 0)) * 14 : 0
    const X = (x: number) => 180 + x * 16
    const Y = (y: number) => 130 - y * 8
    const points: string[] = []
    for (let i = 0; i <= 200; i += 1) {
        const x = -10 + i * 0.1
        const y = x * x + state.b * x + state.c + lift
        if (y > 15 || y < -14) continue
        points.push(`${points.length === 0 ? 'M' : 'L'}${X(x).toFixed(1)} ${Y(y).toFixed(1)}`)
    }
    const roots = groundRoots(state)
    const delta = groundDiscriminant(state)
    const touching = lift === 0 ? roots : groundRoots({ b: state.b, c: state.c + lift })
    const controls = (
        <>
            <Stepper label="b" value={state.b} min={GROUND_LIMITS.b.min} max={GROUND_LIMITS.b.max} onChange={(b) => setState((s) => setGround(s, { b }))} language={props.language} />
            <Stepper label="c" value={state.c} min={GROUND_LIMITS.c.min} max={GROUND_LIMITS.c.max} onChange={(c) => setState((s) => setGround(s, { c }))} language={props.language} />
        </>
    )
    const count = roots.length
    const readout = (
        <Predict
            language={props.language}
            question={say(`Emaitza ikusi aurretik: zenbat ebazpen ditu $${groundLatex(state)}$ ekuazioak?`, `Antes de ver el resultado: ¿cuántas soluciones tiene $${groundLatex(state)}$?`, `قبل رؤية النتيجة: كم حلًّا لـ $${groundLatex(state)}$؟`, `Before you see the result: how many solutions does $${groundLatex(state)}$ have?`)}
            labels={{ '<': say('Bat ere ez', 'Ninguna', 'لا حل', 'None'), '=': say('Bat', 'Una', 'حلّ واحد', 'One'), '>': say('Bi', 'Dos', 'حلّان', 'Two') }}
            actual={groundPrediction(state)}
            choice={state.prediction}
            tip={say('Kalkulatu $\\Delta=b^{2}-4c$: zeinuak erabakitzen du.', 'Calcula $\\Delta=b^{2}-4c$: su signo lo decide.', 'احسب $\\Delta=b^{2}-4c$: إشارته تقرّر.', 'Work out $\\Delta=b^{2}-4c$: its sign decides.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[groundLatex(state), `\\Delta=(${state.b})^{2}-4\\cdot(${state.c})=${delta}`, count === 0 ? '\\Delta<0' : roots.map((root) => `x${Number.isInteger(root * 2) ? '=' : '\\approx '}${texDec(root, props.language)}`).join(',\\ ')]}
                note={l(count === 0
                    ? say('Parabolak ez du lurra ukitzen: ebazpenik ez.', 'La parábola no toca el suelo: no hay solución.', 'لا يمسّ القطع المكافئ الأرض: لا حل.', 'The parabola does not touch the ground: no solution.')
                    : count === 1
                        ? say('Parabolak lurra puntu batean ukitzen du: ebazpen bakarra.', 'La parábola toca el suelo en un punto: una sola solución.', 'يمسّ القطع المكافئ الأرض في نقطة: حلّ واحد.', 'The parabola touches the ground at one point: a single solution.')
                        : say('Parabolak lurra bi puntutan mozten du: bi ebazpen.', 'La parábola corta el suelo en dos puntos: dos soluciones.', 'يقطع القطع المكافئ الأرض في نقطتين: حلّان.', 'The parabola crosses the ground at two points: two solutions.'))}
            />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={groundChallenges} extraChallenges={groundExtra} state={state}>
            <Board height={250} label={l(say(`y = x² + bx + c parabola, b = ${state.b}, c = ${state.c}`, `Parábola y = x² + bx + c, b = ${state.b}, c = ${state.c}`, `القطع المكافئ y = x² + bx + c، b = ${state.b}، c = ${state.c}`, `Parabola y = x² + bx + c, b = ${state.b}, c = ${state.c}`))}>
                <rect x={X(-10)} y={Y(0)} width={320} height={Y(-14) - Y(0)} fill="#efe6d4" />
                {Array.from({ length: 21 }, (_, i) => i - 10).map((x) => (
                    <g key={x}>
                        <line x1={X(x)} x2={X(x)} y1={Y(0) - 3} y2={Y(0) + 3} stroke={INK} strokeWidth={1} />
                        {x % 2 === 0 && <text x={X(x)} y={Y(0) + 16} textAnchor="middle" fontSize={11} fill={MUTED}>{x}</text>}
                    </g>
                ))}
                <line x1={X(-10)} x2={X(10)} y1={Y(0)} y2={Y(0)} stroke={INK} strokeWidth={2} />
                <line x1={X(0)} x2={X(0)} y1={Y(15)} y2={Y(-14)} stroke={MUTED} strokeWidth={1} strokeDasharray="3 3" />
                {shown ? <path d={points.join(' ')} fill="none" stroke={STAGE} strokeWidth={3} /> : <Hidden x={180} y={70} />}
                {shown && touching.map((root) => <circle key={root} cx={X(root)} cy={Y(0)} r={6} fill={SECOND} stroke={INK} strokeWidth={1.4} />)}
            </Board>
            <PlayButton label={l(say('Jaitsi parabola', 'Baja la parábola', 'أنزل القطع المكافئ', 'Lower the parabola'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L3. The two balances ---------- */

function Fruit({ x, y, kind, faded }: { x: number; y: number; kind: 'apple' | 'pear'; faded: boolean }) {
    return kind === 'apple'
        ? <circle cx={x} cy={y} r={8} fill={SECOND_TINT} stroke={SECOND} strokeWidth={2} opacity={faded ? 0.2 : 1} />
        : <ellipse cx={x} cy={y} rx={6.5} ry={9} fill={GREEN_TINT} stroke={GREEN} strokeWidth={2} opacity={faded ? 0.2 : 1} />
}

function FruitPan({ cx, plate, pan, removed }: { cx: number; plate: number; pan: Pan; removed: { a: number; b: number } }) {
    const fruits = [...Array.from({ length: pan.a }, (_, i) => ({ kind: 'apple' as const, faded: i >= pan.a - removed.a })), ...Array.from({ length: pan.b }, (_, i) => ({ kind: 'pear' as const, faded: i >= pan.b - removed.b }))]
    return (
        <g>
            {fruits.map((fruit, index) => {
                const row = Math.floor(index / 4)
                const inRow = Math.min(4, fruits.length - row * 4)
                return <Fruit key={index} x={cx - (inRow * 18) / 2 + (index % 4) * 18 + 9} y={plate - 11 - row * 19} kind={fruit.kind} faded={fruit.faded} />
            })}
        </g>
    )
}

function KiloBlock({ cx, plate, kilos }: { cx: number; plate: number; kilos: number }) {
    return (
        <g>
            <rect x={cx - 20} y={plate - 26} width={40} height={24} rx={5} fill={MUSTARD_TINT} stroke={KILO} strokeWidth={2} />
            <text x={cx} y={plate - 9} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>{`${kilos} kg`}</text>
        </g>
    )
}

export function ScalesTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ScalesState>(initialScalesState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.system}-${panLatex(state.pans[0])}`, 1800)
    const { times, left } = eliminated(state.pans)
    const progress = playback.progress ?? 0
    const removing = playback.progress !== null
    const [first, second] = state.pans
    const angleOf = (pan: Pan) => Math.max(-14, Math.min(14, tilt(pan, state.x, state.y) * 3))
    const controls = (
        <>
            <Segmented label={l(say('Sistema', 'Sistema', 'النظام', 'System'))} value={String(state.system)} options={SCALE_SYSTEMS.map((_, index) => ({ value: String(index), label: String(index + 1) }))} onChange={(system) => setState(startSystem(Number(system)))} />
            <Stepper label={l(say('Sagar bat (kg)', 'Una manzana (kg)', 'تفاحة (كغ)', 'An apple (kg)'))} value={state.x} min={0} max={SCALE_LIMIT} onChange={(x) => setState((s) => setScales(s, { x }))} language={props.language} />
            <Stepper label={l(say('Madari bat (kg)', 'Una pera (kg)', 'إجاصة (كغ)', 'A pear (kg)'))} value={state.y} min={0} max={SCALE_LIMIT} onChange={(y) => setState((s) => setScales(s, { y }))} language={props.language} />
        </>
    )
    const line = (pan: Pan) => `${pan.a}\\cdot ${state.x}+${pan.b}\\cdot ${state.y}=${pan.a * state.x + pan.b * state.y}${tilt(pan, state.x, state.y) === 0 ? '=' : '\\neq '}${pan.c}`
    const readout = (
        <Predict
            language={props.language}
            question={say('Probatu aurretik: sagar batek madari batek baino gutxiago, berdin ala gehiago pisatzen du?', 'Antes de probar: ¿una manzana pesa menos, lo mismo o más que una pera?', 'قبل التجربة: هل تزن التفاحة أقل من الإجاصة أم مثلها أم أكثر؟', 'Before you try: does an apple weigh less than, the same as or more than a pear?')}
            labels={{ '<': say('Gutxiago', 'Menos', 'أقل', 'Less'), '=': say('Berdin', 'Lo mismo', 'مثلها', 'The same'), '>': say('Gehiago', 'Más', 'أكثر', 'More') }}
            actual={scalesPrediction(state)}
            choice={state.prediction}
            tip={say('Konparatu bi balantzak: bata bestearen barruan dago, eta aldea fruta gutxi batzuk dira.', 'Compara las dos balanzas: una cabe dentro de la otra, y la diferencia son unas pocas frutas.', 'قارن الميزانين: أحدهما داخل الآخر، والفرق بضع ثمار.', 'Compare the two balances: one fits inside the other, and the difference is a few fruits.')}
            onChoose={(prediction) => setState((s) => setScalesPrediction(s, prediction))}
        >
            <Readout latex={[line(first), line(second)]} note={scalesLevel(state)
                ? l(say(`Bi balantzak orekan: x = ${state.x}, y = ${state.y}.`, `Las dos balanzas en equilibrio: x = ${state.x}, y = ${state.y}.`, `الميزانان متوازنان: x = ${state.x}، y = ${state.y}.`, `Both balances level: x = ${state.x}, y = ${state.y}.`))
                : l(say('Balantza batek okertuta jarraitzen du: aldatu pisuak.', 'Alguna balanza sigue inclinada: cambia los pesos.', 'ما زال أحد الميزانين مائلًا: غيّر الأوزان.', 'A balance is still tipped: change the weights.'))} />
        </Predict>
    )
    // While ▶ runs, the second balance is taken off the first `times` times: those fruits fade out
    const removed = removing ? { a: Math.round(times * second.a * Math.min(1, progress * 1.4)), b: Math.round(times * second.b * Math.min(1, progress * 1.4)) } : { a: 0, b: 0 }
    const firstKilos = removing && progress >= 0.7 ? left.c : first.c
    const coefficient = (k: number, letter: string) => (k === 0 ? '' : k === 1 ? letter : `${k}${letter}`)
    const leftText = `${[coefficient(left.a, 'x'), coefficient(left.b, 'y')].filter(Boolean).join(' + ')} = ${left.c}`
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={scalesChallenges} extraChallenges={scalesExtra} state={state}>
            <Board height={206} label={l(say(`Bi balantza: ${panLatex(first)} eta ${panLatex(second)}`, `Dos balanzas: ${panLatex(first)} y ${panLatex(second)}`, `ميزانان: ${panLatex(first)} و${panLatex(second)}`, `Two balances: ${panLatex(first)} and ${panLatex(second)}`))}>
                {[first, second].map((pan, index) => {
                    const cx = index === 0 ? 92 : 268
                    return (
                        <g key={index}>
                            <Balance cx={cx} top={52} half={62} angle={shown && !removing ? angleOf(pan) : 0}
                                left={<FruitPan cx={cx - 62} plate={122} pan={pan} removed={index === 0 ? removed : { a: 0, b: 0 }} />}
                                right={<KiloBlock cx={cx + 62} plate={122} kilos={index === 0 ? firstKilos : pan.c} />} />
                            <text x={cx} y={24} textAnchor="middle" fontSize={14} fontWeight={700} fill={MUTED}>{index + 1}</text>
                        </g>
                    )
                })}
                {removing && progress >= 0.7 && <text x={180} y={194} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>{times > 1 ? `(1) − ${times}·(2): ${leftText}` : `(1) − (2): ${leftText}`}</text>}
                {!shown && <Hidden x={180} y={36} />}
            </Board>
            <PlayButton label={l(say('Kendu 2. balantza 1.ari', 'Quita la balanza 2 de la 1', 'اطرح الميزان 2 من 1', 'Take balance 2 off balance 1'))} disabled={!shown || times < 1} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L4. Ages on a timeline ---------- */

export function AgesTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<AgesState>(initialAgesState)
    const shown = state.prediction !== null
    const { older, younger, times } = state.people
    const first = Math.max(AGES_T.min, -younger + 1)
    const playback = usePlayback(`${state.scenario}-${older}-${younger}`, 3200)
    // ▶ runs time from the earliest year to the last one; then the learner's own year comes back
    const t = playback.playing ? Math.round(first + (playback.progress ?? 0) * (AGES_T.max - first)) : state.t
    const scale = 3.2
    const ratio = (older + t) / (younger + t)
    const controls = (
        <>
            <Segmented label={l(say('Familia', 'Familia', 'العائلة', 'Family'))} value={String(state.scenario)} options={[...AGES_SCENARIOS.map((_, index) => ({ value: String(index), label: String(index + 1) })), ...(state.scenario === -1 ? [{ value: '-1', label: '🎲' }] : [])]} onChange={(scenario) => setState(Number(scenario) >= 0 ? startAges(Number(scenario)) : state)} />
            <Stepper label={l(say('Urteak t (− lehen, + gero)', 'Años t (− antes, + después)', 'السنوات t (− قبل، + بعد)', 'Years t (− before, + after)'))} value={state.t} min={first} max={AGES_T.max} onChange={(next) => setState((s) => setAges(s, next))} language={props.language} />
        </>
    )
    const timesWord = times === 2 ? say('bikoitza', 'el doble', 'ضعف', 'twice') : times === 3 ? say('hirukoitza', 'el triple', 'ثلاثة أمثال', 'three times') : say('laukoitza', 'el cuádruple', 'أربعة أمثال', 'four times')
    const readout = (
        <Predict
            language={props.language}
            question={say(`Bilatu aurretik: amak semearen ${timesWord.eu} noiz du, iraganean, orain ala etorkizunean?`, `Antes de buscar: ¿cuándo tiene la madre ${timesWord.es} que el hijo, en el pasado, ahora o en el futuro?`, `قبل البحث: متى يكون عمر الأم ${timesWord.ar} عمر الابن، في الماضي أم الآن أم في المستقبل؟`, `Before you search: when is the mother ${timesWord.en} her son's age, in the past, now or in the future?`)}
            labels={{ '<': say('Iraganean', 'En el pasado', 'في الماضي', 'In the past'), '=': say('Orain', 'Ahora', 'الآن', 'Now'), '>': say('Etorkizunean', 'En el futuro', 'في المستقبل', 'In the future') }}
            actual={agesPrediction(state)}
            choice={state.prediction}
            tip={say(`Orain: ${older} : ${younger}. Zatidura hori ${times} baino handiagoa bada, etorkizunean; txikiagoa bada, iraganean.`, `Ahora: ${older} : ${younger}. Si esa razón es mayor que ${times}, en el futuro; si es menor, en el pasado.`, `الآن: ${older} : ${younger}. إذا كانت هذه النسبة أكبر من ${times} ففي المستقبل، وإذا كانت أصغر ففي الماضي.`, `Now: ${older} : ${younger}. If that ratio is greater than ${times}, in the future; if smaller, in the past.`)}
            onChoose={(prediction) => setState((s) => setAgesPrediction(s, prediction))}
        >
            <Readout
                latex={[`${older}${t < 0 ? '' : '+'}${t}=${older + t}`, `${younger}${t < 0 ? '' : '+'}${t}=${younger + t}`, `${older + t}\\div ${younger + t}${Number.isInteger(agesRatio({ ...state, t }) * 100) ? '=' : '\\approx '}${texDec(agesRatio({ ...state, t }), props.language)}`]}
                note={agesFound({ ...state, t })
                    ? l(say(`Hori da! ${older + t} = ${times} · ${younger + t}.`, `¡Eso es! ${older + t} = ${times} · ${younger + t}.`, `هذا هو! ${older + t} = ${times} · ${younger + t}.`, `That's it! ${older + t} = ${times} · ${younger + t}.`))
                    : l(say('Urteak biei batzen zaizkie: zatidura 1 zenbakira hurbiltzen da.', 'Los años se suman a los dos: la razón se acerca a 1.', 'تُضاف السنوات إلى الاثنين: تقترب النسبة من 1.', 'The years are added to both: the ratio gets closer to 1.'))}
            />
        </Predict>
    )
    const bar = (y: number, age: number, colour: string, tint: string, text: string, who: ReturnType<typeof say>) => (
        <g>
            <Label x={14} y={y - 5} fontSize={12} fontWeight={700} fill={MUTED}>{l(who)}</Label>
            <rect x={14} y={y} width={Math.max(2, age * scale)} height={26} rx={5} fill={tint} stroke={colour} strokeWidth={2} />
            <text x={Math.min(22 + age * scale, 300)} y={y + 18} fontSize={15} fontWeight={700} fill={colour}>{text}</text>
        </g>
    )
    const axisX = (year: number) => 30 + ((year - first) / (AGES_T.max - first)) * 300
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={agesChallenges} extraChallenges={agesExtra} state={state}>
            <Board height={206} label={l(say(`Ama ${older + t} urte, semea ${younger + t}`, `Madre ${older + t} años, hijo ${younger + t}`, `الأم ${older + t} سنة والابن ${younger + t}`, `Mother ${older + t}, son ${younger + t}`))}>
                {bar(24, older + t, SECOND, SECOND_TINT, String(older + t), say('Ama', 'Madre', 'الأم', 'Mother'))}
                {bar(76, younger + t, STAGE, STAGE_TINT, String(younger + t), say('Semea', 'Hijo', 'الابن', 'Son'))}
                {shown && <text x={340} y={95} textAnchor="end" fontSize={17} fontWeight={700} fill={Math.abs(ratio - times) < 1e-9 ? GREEN : INK}>{`× ${dec(ratio, props.language, 1)}`}</text>}
                <line x1={30} x2={330} y1={150} y2={150} stroke={INK} strokeWidth={2} />
                {[first, 0, AGES_T.max].map((year) => (
                    <g key={year}>
                        <line x1={axisX(year)} x2={axisX(year)} y1={144} y2={156} stroke={INK} strokeWidth={1.4} />
                        <text x={axisX(year)} y={174} textAnchor="middle" fontSize={12} fill={MUTED}>{year > 0 ? `+${year}` : year}</text>
                    </g>
                ))}
                <Label x={axisX(0)} y={196} textAnchor="middle" fontSize={12} fill={MUTED}>{l(say('orain', 'ahora', 'الآن', 'now'))}</Label>
                <path d={`M${axisX(t)} 140 l-7 -12 h14 Z`} fill={MUSTARD} stroke={INK} strokeWidth={1.2} />
                {!shown && <Hidden x={300} y={120} />}
            </Board>
            <PlayButton label={l(say('Pasa denbora', 'Pasa el tiempo', 'مرّر الزمن', 'Let time pass'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}
