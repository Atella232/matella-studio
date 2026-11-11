import { useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { GREEN, GREEN_TINT, INK, MUSTARD, MUSTARD_TINT, MUTED, PAPER, say, SECOND, SECOND_TINT, STAGE, STAGE_TINT } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { MatrixBlock } from '../../batx2-zientziak-matrizeak/MatrixSvg'
import { DeterminantBlock } from '../../batx2-zientziak-determinanteak/DeterminantSvg'
import { classify, KIND_WORDS, type SystemKind } from '../system'
import {
    baseDet, chooseCramer, chooseUnknown, columnDet, CRAMER_LIMITS, CRAMER_NAMES, cramerChallenges, cramerExtra, cramerPrediction, cramerRows, cramerSolution, initialCramerState, setCramerB,
    UNKNOWN_NAMES, type CramerState
} from './cramerMachine'
import {
    A_LIMITS, aValues, chooseFamily, currentKind, detAt, DISCUSSION_FAMILIES, DISCUSSION_NAMES, discussionChallenges, discussionExtra, discussionPrediction, initialDiscussionState, kindAt, markSeen,
    seeAll, setA, type DiscussionState
} from './discussionMap'
import {
    B_LIMITS, chooseRouche, initialRoucheState, K_LIMITS, ROUCHE_NAMES, roucheChallenges, roucheClassification, roucheExtra, rouchePrediction, roucheRows, setB, setCorner, type RoucheState
} from './roucheLight'
import {
    chooseLine, COEFFICIENT_LIMITS, commonPoint, CONSTANT_LIMITS, initialLinesState, linesChallenges, linesClassification, linesExtra, linesPrediction, setCoefficient, type LinesState
} from './threeLines'

/* ==========================================================================
   Sistemak · Batxilergoa 2 · Zientziak — the four tools of this unit: the
   Rouché traffic light (A* and its ranks), three lines in the plane, the
   Cramer machine (column B into the column of an unknown, ▶ slides it)
   and the map of the discussion (the type for every a, ▶ paints them
   all). Each asks for a prediction before it shows the result. Logic in
   roucheLight.ts, threeLines.ts, cramerMachine.ts and discussionMap.ts.
   ========================================================================== */

const minus = (value: number) => (value < 0 ? `−${-value}` : String(value))
const SUBSCRIPT = ['₀', '₁', '₂', '₃', '₄']

/** The colour and tint of each type: red, amber, green */
const KIND_COLOR: Record<SystemKind, { color: string; tint: string }> = {
    inconsistent: { color: SECOND, tint: SECOND_TINT },
    indeterminate: { color: MUSTARD, tint: MUSTARD_TINT },
    determined: { color: GREEN, tint: GREEN_TINT }
}

/** The type said as the number of solutions, short enough for three buttons in a row */
const typeLabels = {
    '<': say('Bat ere ez', 'Ninguna', 'لا حل', 'None'),
    '=': say('Bat', 'Una', 'حل واحد', 'One'),
    '>': say('Infinitu', 'Infinitas', 'لا نهائية', 'Infinitely many')
}

const signLabels = {
    '<': say('Negatiboa', 'Negativo', 'سالب', 'Negative'),
    '=': say('0', '0', 'صفر', '0'),
    '>': say('Positiboa', 'Positivo', 'موجب', 'Positive')
}

/** A number or a fraction as LaTeX */
function valueLatex(numerator: number, denominator: number): string {
    const sign = numerator * denominator < 0 ? '-' : ''
    const [p, q] = [Math.abs(numerator), Math.abs(denominator)]
    const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y))
    const g = gcd(p, q) || 1
    return q / g === 1 ? `${sign}${p / g}` : `${sign}\\frac{${p / g}}{${q / g}}`
}

/* ---------- L1. The Rouché traffic light ---------- */

function TrafficLight({ x, y, kind, shown }: { x: number; y: number; kind: SystemKind; shown: boolean }) {
    const order: SystemKind[] = ['inconsistent', 'indeterminate', 'determined']
    return (
        <g>
            <rect x={x - 26} y={y - 4} width={52} height={150} rx={18} fill={INK} />
            {order.map((item, index) => (
                <circle key={item} cx={x} cy={y + 22 + index * 48} r={18} fill={shown && item === kind ? KIND_COLOR[item].color : 'var(--muted, #58616e)'} opacity={shown && item === kind ? 1 : 0.35} />
            ))}
        </g>
    )
}

export function RoucheLightTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RoucheState>(initialRoucheState)
    const shown = state.prediction !== null
    const rows = roucheRows(state)
    const { rankA, rankAugmented, kind } = roucheClassification(state)
    const controls = (
        <>
            <Segmented<string> label={l(say('Sistema', 'Sistema', 'النظام', 'System'))} value={String(state.preset)} options={ROUCHE_NAMES.map((name, index) => ({ value: String(index), label: name }))} onChange={(preset) => setState((current) => chooseRouche(current, Number(preset)))} />
            {[0, 1, 2].map((index) => (
                <Stepper key={index} label={`b${SUBSCRIPT[index + 1]}`} value={state.b[index]} min={B_LIMITS.min} max={B_LIMITS.max} format={minus} onChange={(next) => setState((current) => setB(current, index, next))} language={props.language} />
            ))}
            <Stepper label="k" value={state.k} min={K_LIMITS.min} max={K_LIMITS.max} format={minus} onChange={(next) => setState((current) => setCorner(current, next))} language={props.language} />
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: zenbat soluzio ditu sistemak?', 'Antes de verlo: ¿cuántas soluciones tiene el sistema?', 'قبل أن ترى: كم حلًّا للنظام؟', 'Before you see it: how many solutions does the system have?')}
            labels={typeLabels}
            actual={rouchePrediction(state)}
            choice={state.prediction}
            tip={say('Konparatu $\\operatorname{rg}(A)$, $\\operatorname{rg}(A^*)$ eta 3.', 'Compara $\\operatorname{rg}(A)$, $\\operatorname{rg}(A^*)$ y 3.', 'قارن $\\operatorname{rg}(A)$ و$\\operatorname{rg}(A^*)$ و3.', 'Compare $\\operatorname{rg}(A)$, $\\operatorname{rg}(A^*)$ and 3.')}
            onChoose={(prediction) => setState((current) => setPrediction(current, prediction))}
        >
            <Readout latex={`\\operatorname{rg}(A)=${rankA}\\qquad \\operatorname{rg}(A^*)=${rankAugmented}`} note={l(KIND_WORDS[kind])} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={roucheChallenges} extraChallenges={roucheExtra} state={state}>
            <Board height={200} label={l(say(`${ROUCHE_NAMES[state.preset]} sistemaren A* matrizea eta haren semaforoa`, `La matriz A* del sistema ${ROUCHE_NAMES[state.preset]} y su semáforo`, `المصفوفة A* للنظام ${ROUCHE_NAMES[state.preset]} وإشارتها`, `The matrix A* of system ${ROUCHE_NAMES[state.preset]} and its traffic light`))}>
                <text x={130} y={22} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE} direction="ltr">A*</text>
                <MatrixBlock
                    x={8}
                    y={36}
                    cells={rows.map((row, r) => [...row.map(minus), minus(state.b[r])])}
                    cell={52}
                    rowGap={40}
                    size={18}
                    bracket={10}
                    barBefore={3}
                    color={(r, c) => (c === 3 ? SECOND : r === 2 && c === 2 ? STAGE : undefined)}
                    tint={(r, c) => (c === 3 ? MUSTARD_TINT : r === 2 && c === 2 ? STAGE_TINT : undefined)}
                />
                <text x={60} y={186} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK} direction="ltr">{`rg(A) = ${shown ? rankA : '?'}`}</text>
                <text x={196} y={186} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK} direction="ltr">{`rg(A*) = ${shown ? rankAugmented : '?'}`}</text>
                <TrafficLight x={318} y={24} kind={kind} shown={shown} />
            </Board>
        </ToolFrame>
    )
}

/* ---------- L4. Three lines ---------- */

const OX = 180
const OY = 150
const UNIT = 24
const SPAN = 6
const LINE_COLORS = [STAGE, SECOND, GREEN]

function lineEnds([a, b, c]: [number, number, number]): [[number, number], [number, number]] | null {
    if (a === 0 && b === 0) return null
    if (b !== 0) return [[-SPAN, (c + a * SPAN) / b], [SPAN, (c - a * SPAN) / b]]
    return [[c / a, -SPAN], [c / a, SPAN]]
}

const equationText = ([a, b, c]: [number, number, number]) => {
    const term = (coefficient: number, name: string, first: boolean) => (coefficient === 0 ? '' : `${coefficient < 0 ? (first ? '−' : ' − ') : first ? '' : ' + '}${Math.abs(coefficient) === 1 ? '' : Math.abs(coefficient)}${name}`)
    const left = `${term(a, 'x', true)}${term(b, 'y', a === 0)}` || '0'
    return `${left} = ${minus(c)}`
}

export function ThreeLinesTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<LinesState>(initialLinesState)
    const shown = state.prediction !== null
    const { rankA, rankAugmented, kind } = linesClassification(state)
    const point = commonPoint(state)
    const line = state.lines[state.selected]
    const controls = (
        <>
            <Segmented<string> label={l(say('Zuzena', 'Recta', 'المستقيم', 'Line'))} value={String(state.selected)} options={['1', '2', '3'].map((label, index) => ({ value: String(index), label }))} onChange={(selected) => setState((current) => chooseLine(current, Number(selected)))} />
            <Stepper label="a" value={line[0]} min={COEFFICIENT_LIMITS.min} max={COEFFICIENT_LIMITS.max} format={minus} onChange={(next) => setState((current) => setCoefficient(current, 0, next))} language={props.language} />
            <Stepper label="b" value={line[1]} min={COEFFICIENT_LIMITS.min} max={COEFFICIENT_LIMITS.max} format={minus} onChange={(next) => setState((current) => setCoefficient(current, 1, next))} language={props.language} />
            <Stepper label="c" value={line[2]} min={CONSTANT_LIMITS.min} max={CONSTANT_LIMITS.max} format={minus} onChange={(next) => setState((current) => setCoefficient(current, 2, next))} language={props.language} />
        </>
    )
    const note = point
        ? say(`Puntu komuna: (${point.map((item) => minus(Math.round(item * 100) / 100)).join(', ')}).`, `Punto común: (${point.map((item) => minus(Math.round(item * 100) / 100)).join(', ')}).`, `النقطة المشتركة: (${point.map((item) => minus(Math.round(item * 100) / 100)).join(', ')}).`, `Common point: (${point.map((item) => minus(Math.round(item * 100) / 100)).join(', ')}).`)
        : kind === 'inconsistent'
            ? say('Ez dago puntu komunik.', 'No hay punto común.', 'لا نقطة مشتركة.', 'There is no common point.')
            : say('Zuzen bera da: infinitu puntu komun.', 'Es la misma recta: infinitos puntos comunes.', 'إنه المستقيم نفسه: نقاط مشتركة لا نهائية.', 'It is the same line: infinitely many common points.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: zenbat puntu dituzte komunean hiru zuzenek?', 'Antes de verlo: ¿cuántos puntos tienen en común las tres rectas?', 'قبل أن ترى: كم نقطة مشتركة بين المستقيمات الثلاثة؟', 'Before you see it: how many points do the three lines share?')}
            labels={{ '<': say('Bat ere ez', 'Ninguno', 'لا شيء', 'None'), '=': say('Bat', 'Uno', 'نقطة واحدة', 'One'), '>': say('Infinitu', 'Infinitos', 'ما لا نهاية', 'Infinitely many') }}
            actual={linesPrediction(state)}
            choice={state.prediction}
            tip={say('Bi zuzenen ebaki-puntua hirugarrenean dago?', '¿El punto de corte de dos rectas está en la tercera?', 'هل نقطة تقاطع مستقيمين على الثالث؟', 'Is the crossing point of two lines on the third?')}
            onChoose={(prediction) => setState((current) => setPrediction(current, prediction))}
        >
            <Readout latex={`\\operatorname{rg}(A)=${rankA}\\qquad \\operatorname{rg}(A^*)=${rankAugmented}`} note={l(note)} />
        </Predict>
    )
    const toX = (x: number) => OX + x * UNIT
    const toY = (y: number) => OY - y * UNIT
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={linesChallenges} extraChallenges={linesExtra} state={state}>
            <Board height={300} label={l(say(`Hiru zuzen: ${state.lines.map(equationText).join('; ')}`, `Tres rectas: ${state.lines.map(equationText).join('; ')}`, `ثلاثة مستقيمات: ${state.lines.map(equationText).join('؛ ')}`, `Three lines: ${state.lines.map(equationText).join('; ')}`))}>
                <defs><clipPath id="systems-three-lines"><rect x={toX(-SPAN)} y={toY(SPAN)} width={2 * SPAN * UNIT} height={2 * SPAN * UNIT} /></clipPath></defs>
                <rect x={toX(-SPAN)} y={toY(SPAN)} width={2 * SPAN * UNIT} height={2 * SPAN * UNIT} fill={PAPER} stroke={MUTED} strokeWidth={0.6} />
                {Array.from({ length: 2 * SPAN + 1 }, (_, index) => index - SPAN).map((k) => (
                    <g key={k} stroke={MUTED} strokeWidth={k === 0 ? 1.4 : 0.4} opacity={k === 0 ? 0.9 : 0.4}>
                        <line x1={toX(k)} x2={toX(k)} y1={toY(SPAN)} y2={toY(-SPAN)} />
                        <line x1={toX(-SPAN)} x2={toX(SPAN)} y1={toY(k)} y2={toY(k)} />
                    </g>
                ))}
                <g clipPath="url(#systems-three-lines)">
                    {state.lines.map((item, index) => {
                        const ends = lineEnds(item)
                        return ends && <line key={index} x1={toX(ends[0][0])} y1={toY(ends[0][1])} x2={toX(ends[1][0])} y2={toY(ends[1][1])} stroke={LINE_COLORS[index]} strokeWidth={index === state.selected ? 4 : 2.6} strokeLinecap="round" opacity={0.9} />
                    })}
                    {shown && point && <circle cx={toX(point[0])} cy={toY(point[1])} r={7} fill={INK} stroke={PAPER} strokeWidth={2} />}
                </g>
                {state.lines.map((item, index) => (
                    <text key={index} x={toX(-SPAN) + 6} y={toY(SPAN) + 18 + index * 20} fontSize={14} fontWeight={700} fill={LINE_COLORS[index]} stroke={PAPER} strokeWidth={3} paintOrder="stroke" direction="ltr">{`${index + 1}: ${equationText(item)}`}</text>
                ))}
                {!shown && <Hidden x={toX(SPAN) - 22} y={toY(SPAN) + 30} size={24} />}
            </Board>
        </ToolFrame>
    )
}

/* ---------- L2. The Cramer machine ---------- */

export function CramerMachineTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CramerState>(initialCramerState)
    const shown = state.prediction !== null
    const rows = cramerRows(state)
    const size = rows.length
    const letter = UNKNOWN_NAMES[state.unknown]
    const numerator = columnDet(state)
    const denominator = baseDet(state)
    const solution = cramerSolution(state)
    const { progress, playing, play } = usePlayback(`${state.preset}|${state.unknown}`, 1800)
    const slide = progress === null ? 1 : progress
    const controls = (
        <>
            <Segmented<string> label={l(say('Sistema', 'Sistema', 'النظام', 'System'))} value={String(state.preset)} options={CRAMER_NAMES.map((name, index) => ({ value: String(index), label: name }))} onChange={(preset) => setState((current) => chooseCramer(current, Number(preset)))} />
            <Segmented<string> label={l(say('Ezezaguna', 'Incógnita', 'المجهول', 'Unknown'))} value={String(state.unknown)} options={rows.map((_, index) => ({ value: String(index), label: UNKNOWN_NAMES[index] }))} onChange={(unknown) => setState((current) => chooseUnknown(current, Number(unknown)))} />
            {rows.map((_, index) => (
                <Stepper key={index} label={`b${SUBSCRIPT[index + 1]}`} value={state.b[index]} min={CRAMER_LIMITS.min} max={CRAMER_LIMITS.max} format={minus} onChange={(next) => setState((current) => setCramerB(current, index, next))} language={props.language} />
            ))}
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: zer zeinu du $${letter}$ ezezagunak?`, `Antes de verlo: ¿qué signo tiene $${letter}$?`, `قبل أن ترى: ما إشارة $${letter}$؟`, `Before you see it: what sign does $${letter}$ have?`)}
            labels={signLabels}
            actual={cramerPrediction(state)}
            choice={state.prediction}
            tip={say('Begiratu $|A_j|$ eta $|A|$ zenbakien zeinuei.', 'Mira los signos de $|A_j|$ y de $|A|$.', 'انظر إلى إشارتي $|A_j|$ و$|A|$.', 'Look at the signs of $|A_j|$ and $|A|$.')}
            onChoose={(prediction) => setState((current) => setPrediction(current, prediction))}
        >
            <Readout
                latex={[`${letter}=\\frac{|A_${letter}|}{|A|}=\\frac{${numerator}}{${denominator}}=${valueLatex(numerator, denominator)}`, `(${solution.map((item) => valueLatex(item.numerator, item.denominator)).join(',\\ ')})`]}
                note={l(say('$B$ zutabea aldatzean, zenbakitzailea bakarrik aldatzen da.', 'Al cambiar $B$, solo cambia el numerador.', 'عند تغيير $B$ يتغير البسط فقط.', 'Changing $B$ changes only the numerator.'))}
            />
        </Predict>
    )
    const cell = size === 3 ? 46 : 56
    const gap = 30
    const width = size * cell + 16
    const left = 64
    const columnX = (column: number) => left + 8 + column * cell + cell / 2
    const fromX = left + width + 48
    const movingX = fromX + (columnX(state.unknown) - fromX) * slide
    const top = 22
    const bottom = top + size * gap + 22
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={cramerChallenges} extraChallenges={cramerExtra} state={state}>
            <Board height={bottom + size * gap + 20} label={l(say(`${letter} = |A_${letter}| / |A|, ${CRAMER_NAMES[state.preset]} sisteman`, `${letter} = |A_${letter}| / |A| en el sistema ${CRAMER_NAMES[state.preset]}`, `${letter} = |A_${letter}| / |A| في النظام ${CRAMER_NAMES[state.preset]}`, `${letter} = |A_${letter}| / |A| in system ${CRAMER_NAMES[state.preset]}`))}>
                <text x={22} y={bottom - 4} fontSize={22} fontWeight={700} fill={INK} fontStyle="italic" direction="ltr">{letter}</text>
                <text x={40} y={bottom - 4} fontSize={20} fontWeight={700} fill={INK} direction="ltr">=</text>
                <DeterminantBlock
                    x={left}
                    y={top}
                    cells={rows.map((row) => row.map((item, column) => (column === state.unknown ? '' : minus(item))))}
                    cell={cell}
                    rowGap={gap}
                    size={17}
                    tint={(_, column) => (column === state.unknown ? MUSTARD_TINT : undefined)}
                />
                {state.b.map((item, r) => (
                    <text key={r} x={movingX} y={top + r * gap + gap / 2 + 6} textAnchor="middle" fontSize={17} fontWeight={700} fill={SECOND} direction="ltr">{minus(item)}</text>
                ))}
                {playing && <text x={fromX} y={top - 6} textAnchor="middle" fontSize={13} fontWeight={700} fill={SECOND} direction="ltr">B</text>}
                <line x1={left - 6} x2={left + width + 6} y1={bottom - 10} y2={bottom - 10} stroke={INK} strokeWidth={2.4} />
                <DeterminantBlock x={left} y={bottom} cells={rows.map((row) => row.map(minus))} cell={cell} rowGap={gap} size={17} tint={() => STAGE_TINT} />
                {shown ? (
                    <g>
                        <text x={fromX + 14} y={top + (size * gap) / 2 + 6} textAnchor="middle" fontSize={18} fontWeight={700} fill={SECOND} direction="ltr">{minus(numerator)}</text>
                        <text x={fromX + 14} y={bottom + (size * gap) / 2 + 6} textAnchor="middle" fontSize={18} fontWeight={700} fill={STAGE} direction="ltr">{minus(denominator)}</text>
                    </g>
                ) : <Hidden x={fromX + 14} y={bottom} size={22} />}
            </Board>
            <PlayButton label={l(say('Sartu B zutabea', 'Mete la columna B', 'أدخل العمود B', 'Slide column B in'))} disabled={false} playing={playing} onPlay={play} />
        </ToolFrame>
    )
}

/* ---------- L3. The map of the discussion ---------- */

export function DiscussionMapTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<DiscussionState>(initialDiscussionState)
    const shown = state.prediction !== null
    const family = DISCUSSION_FAMILIES[state.family]
    const rows = family.rows(state.a)
    const b = family.b(state.a)
    const { rankA, rankAugmented } = classify(rows, b)
    const kind = currentKind(state)
    const { progress, playing, play } = usePlayback(`${state.family}`, 2200)
    const cursor = progress === null ? null : aValues[Math.min(aValues.length - 1, Math.floor(progress * aValues.length))]
    const controls = (
        <>
            <Segmented<string> label={l(say('Familia', 'Familia', 'العائلة', 'Family'))} value={String(state.family)} options={DISCUSSION_NAMES.map((name, index) => ({ value: String(index), label: name }))} onChange={(next) => setState((current) => chooseFamily(current, Number(next)))} />
            <Stepper label="a" value={state.a} min={A_LIMITS.min} max={A_LIMITS.max} format={minus} onChange={(next) => setState((current) => setA(current, next))} language={props.language} />
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: zenbat soluzio ditu $a=${state.a}$ denean?`, `Antes de verlo: ¿cuántas soluciones tiene con $a=${state.a}$?`, `قبل أن ترى: كم حلًّا له عندما $a=${state.a}$؟`, `Before you see it: how many solutions does it have with $a=${state.a}$?`)}
            labels={typeLabels}
            actual={discussionPrediction(state)}
            choice={state.prediction}
            tip={say('Lehenik $|A|$; zero bada, heinak.', 'Primero $|A|$; si es cero, los rangos.', 'أولًا $|A|$؛ وإذا كان صفرًا فالرتب.', 'First $|A|$; if it is zero, the ranks.')}
            onChoose={(prediction) => setState((current) => markSeen(setPrediction(current, prediction)))}
        >
            <Readout latex={[family.latex, `|A|=${detAt(state.family, state.a)}\\qquad \\operatorname{rg}(A)=${rankA}\\qquad \\operatorname{rg}(A^*)=${rankAugmented}`]} note={l(KIND_WORDS[kind])} />
        </Predict>
    )
    const size = rows.length
    const stripY = 40 + size * 34 + 46
    const step = 36
    const stripX = (a: number) => 36 + (a - A_LIMITS.min) * step
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={discussionChallenges} extraChallenges={discussionExtra} state={state}>
            <Board height={stripY + 80} label={l(say(`${DISCUSSION_NAMES[state.family]} familia, a = ${state.a}: A* matrizea eta sistema mota a bakoitzeko`, `Familia ${DISCUSSION_NAMES[state.family]}, a = ${state.a}: la matriz A* y el tipo con cada a`, `العائلة ${DISCUSSION_NAMES[state.family]}، a = ${state.a}: المصفوفة A* والنوع مع كل a`, `Family ${DISCUSSION_NAMES[state.family]}, a = ${state.a}: the matrix A* and the type for each a`))}>
                <text x={24} y={40 + (size * 34) / 2 + 6} fontSize={16} fontWeight={700} fill={STAGE} direction="ltr">A* =</text>
                <MatrixBlock
                    x={74}
                    y={30}
                    cells={rows.map((row, r) => [...row.map(minus), minus(b[r])])}
                    cell={size === 3 ? 48 : 56}
                    rowGap={34}
                    size={17}
                    bracket={10}
                    barBefore={size}
                    color={(r, c) => (c < size && family.rows(0)[r][c] !== family.rows(1)[r][c] ? SECOND : undefined)}
                />
                {aValues.map((a) => {
                    const seen = state.seen.includes(a)
                    const type = kindAt(state.family, a)
                    const here = a === state.a
                    const lit = cursor === a
                    return (
                        <g key={a}>
                            <rect x={stripX(a) - 15} y={stripY - 16} width={30} height={32} rx={8} fill={lit ? MUSTARD_TINT : seen ? KIND_COLOR[type].tint : PAPER} stroke={here ? INK : MUTED} strokeWidth={here ? 2.4 : 1} />
                            <text x={stripX(a)} y={stripY + 6} textAnchor="middle" fontSize={14} fontWeight={700} fill={seen ? KIND_COLOR[type].color : MUTED} direction="ltr">{minus(a)}</text>
                        </g>
                    )
                })}
                <text x={stripX(A_LIMITS.max) + 22} y={stripY + 6} fontSize={14} fontStyle="italic" fill={MUTED} direction="ltr">a</text>
                {(['determined', 'indeterminate', 'inconsistent'] as SystemKind[]).map((item, index) => (
                    <Label key={item} x={60 + index * 120} y={stripY + 46} textAnchor="middle" fontSize={14} fontWeight={700} fill={KIND_COLOR[item].color}>{l(typeLabels[(['=', '>', '<'] as const)[index]])}</Label>
                ))}
                {shown && <text x={340} y={22} textAnchor="end" fontSize={14} fontWeight={700} fill={KIND_COLOR[kind].color} direction="ltr">{`rg = ${rankA}, rg* = ${rankAugmented}`}</text>}
            </Board>
            <PlayButton label={l(say('Margotu a guztiak', 'Pinta todos los a', 'لوّن كل قيم a', 'Paint every a'))} disabled={false} playing={playing} onPlay={() => { play(); setState((current) => seeAll(current)) }} />
        </ToolFrame>
    )
}

