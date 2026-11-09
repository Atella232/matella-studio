import { useState, type KeyboardEvent } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { LocalizedText } from '../../../features/unit-v2/types'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { GREEN, GREEN_TINT, INK, MUSTARD_TINT, MUTED, PAPER, say, SECOND, SECOND_TINT, STAGE, STAGE_TINT } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { entryLatex, entryText, isZero, matrixLatex } from '../matrix'
import { MatrixBlock } from '../MatrixSvg'
import {
    applyJordan, canDivide, divideJordan, initialJordanState, JORDAN_LIMITS, JORDAN_NAMES, jordanChallenges, jordanExtra, jordanPrediction, leftHasZeroRow, leftIsIdentity,
    loadJordan, previewRow, rightPart, setJordan, sizeOf, swapJordan, type JordanState
} from './jordanMachine'
import { chooseFamily, currentRank, echelonAt, initialRankState, markSeen, RANK_FAMILIES, RANK_LIMITS, RANK_NAMES, rankAt, rankChallenges, rankExtra, rankPrediction, rankValues, seeAll, setM, type RankState } from './rankSlider'
import { adjacency, changes, chooseTrip, initialRouteState, routeChallenges, routeExtra, routePrediction, square, toggleArrow, TOWNS, twoStep, type RouteState } from './routeMap'
import { cellTerms, cellValue, chooseCell, initialRowColumnState, loadPair, product, ROW_COLUMN_LIMITS, ROW_COLUMN_NAMES, rowColumnChallenges, rowColumnExtra, rowColumnPrediction, setB, type RowColumnState } from './rowColumn'

/* ==========================================================================
   Matrizeak · Batxilergoa 2 · Zientziak — the four tools of this unit:
   row by column (a cell of AB and the column of B that makes it), the
   route map (tap the arrows of a graph; A² counts trips with one change),
   the Gauss–Jordan machine ((A | I) row by row) and the rank slider (m
   and the values that bring the rank down, with ▶ over every m). Each asks
   for a prediction before it shows the result. Logic in rowColumn.ts,
   routeMap.ts, jordanMachine.ts and rankSlider.ts.
   ========================================================================== */

const minus = (value: number) => (value < 0 ? `−${-value}` : String(value))
const SUBSCRIPT = ['₀', '₁', '₂', '₃', '₄']
const bracket = (value: number) => (value < 0 ? `(${value})` : String(value))

function QuickButtons({ buttons }: { buttons: Array<{ label: string; disabled?: boolean; onClick: () => void }> }) {
    return (
        <div className="fraction-v2-lab-quick-actions" style={{ width: '100%', maxWidth: 520, margin: '0 auto' }}>
            {buttons.map((button) => <button key={button.label} type="button" disabled={button.disabled} onClick={button.onClick}>{button.label}</button>)}
        </div>
    )
}

/** Enter and space act like a click on the drawn buttons */
const pressKey = (action: () => void) => (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        action()
    }
}

/* ---------- L1. Row by column ---------- */

export function RowColumnTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RowColumnState>(initialRowColumnState)
    const shown = state.prediction !== null
    const ab = product(state.a, state.b)
    const cell = `c_{${state.row + 1}${state.column + 1}}`
    const value = cellValue(state)
    const terms = cellTerms(state)
    const controls = (
        <>
            <Segmented<string> label={l(say('Bikotea', 'Par', 'الزوج', 'Pair'))} value={String(state.pair)} options={ROW_COLUMN_NAMES.map((name, index) => ({ value: String(index), label: name }))} onChange={(pair) => setState(loadPair(Number(pair)))} />
            <Segmented<string> label={l(say('Errenkada (i)', 'Fila (i)', 'الصف (i)', 'Row (i)'))} value={String(state.row)} options={[{ value: '0', label: '1' }, { value: '1', label: '2' }]} onChange={(row) => setState((s) => chooseCell(s, Number(row), s.column))} />
            <Segmented<string> label={l(say('Zutabea (j)', 'Columna (j)', 'العمود (j)', 'Column (j)'))} value={String(state.column)} options={[{ value: '0', label: '1' }, { value: '1', label: '2' }]} onChange={(column) => setState((s) => chooseCell(s, s.row, Number(column)))} />
            {[0, 1, 2].map((k) => (
                <Stepper key={k} label={`b${SUBSCRIPT[k + 1]}${SUBSCRIPT[state.column + 1]}`} value={state.b[k][state.column]} min={ROW_COLUMN_LIMITS.min} max={ROW_COLUMN_LIMITS.max} onChange={(next) => setState((s) => setB(s, k, next))} language={props.language} />
            ))}
        </>
    )
    const sum = terms.map(([a, b]) => `${bracket(a)}\\cdot ${bracket(b)}`).join('+')
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: zer zeinu du $${cell}$ laukiak?`, `Antes de verlo: ¿qué signo tiene $${cell}$?`, `قبل أن ترى: ما إشارة $${cell}$؟`, `Before you see it: what sign does $${cell}$ have?`)}
            labels={{ '<': say('Negatiboa', 'Negativo', 'سالب', 'Negative'), '=': say('0', '0', 'صفر', '0'), '>': say('Positiboa', 'Positivo', 'موجب', 'Positive') }}
            actual={rowColumnPrediction(state)}
            choice={state.prediction}
            tip={say('Biderkatu errenkadako eta zutabeko zenbakiak binaka, eta batu hiru biderkadurak.', 'Multiplica por parejas los números de la fila y de la columna, y suma los tres productos.', 'اضرب أعداد الصف وأعداد العمود زوجًا زوجًا، واجمع الحواصل الثلاثة.', 'Multiply the numbers of the row and of the column in pairs, and add the three products.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[`${cell}=${sum}`, `${cell}=${value}`]}
                note={l(value === 0
                    ? say('Zero bat: zutabea errenkadarekiko «perpendikularra» da.', 'Un cero: la columna es «perpendicular» a la fila.', 'صفر: العمود «عمودي» على الصف.', 'A zero: the column is «perpendicular» to the row.')
                    : say('Aldatu B matrizeko zenbaki bat, eta ikusi nola aldatzen den.', 'Cambia un número de B y mira cómo cambia.', 'غيّر عددًا من B وانظر كيف يتغير.', 'Change a number of B and see how it changes.'))}
            />
        </Predict>
    )
    const cellsAB = ab.map((row, r) => row.map((entry, c) => (r === state.row && c === state.column && !shown ? '?' : minus(entry))))
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={rowColumnChallenges} extraChallenges={rowColumnExtra} state={state}>
            <Board height={190} label={l(say(`${ROW_COLUMN_NAMES[state.pair]}. bikotea: A bider B; ${state.row + 1}. errenkada eta ${state.column + 1}. zutabea nabarmenduta`, `Par ${ROW_COLUMN_NAMES[state.pair]}: A por B, con la fila ${state.row + 1} y la columna ${state.column + 1} resaltadas`, `الزوج ${ROW_COLUMN_NAMES[state.pair]}: A في B مع إبراز الصف ${state.row + 1} والعمود ${state.column + 1}`, `Pair ${ROW_COLUMN_NAMES[state.pair]}: A times B, with row ${state.row + 1} and column ${state.column + 1} highlighted`))}>
                <text x={58} y={24} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE}>A</text>
                <MatrixBlock x={4} y={50} cells={state.a.map((row) => row.map(minus))} cell={30} rowGap={30} size={15} bracket={10} tint={(r) => (r === state.row ? STAGE_TINT : undefined)} />
                <text x={168} y={24} textAnchor="middle" fontSize={16} fontWeight={700} fill={SECOND}>B</text>
                <MatrixBlock x={128} y={34} cells={state.b.map((row) => row.map(minus))} cell={30} rowGap={30} size={15} bracket={10} tint={(_, c) => (c === state.column ? MUSTARD_TINT : undefined)} />
                <text x={222} y={86} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>=</text>
                <text x={290} y={24} textAnchor="middle" fontSize={16} fontWeight={700} fill={GREEN}>AB</text>
                <MatrixBlock
                    x={236}
                    y={50}
                    cells={cellsAB}
                    cell={44}
                    rowGap={30}
                    size={15}
                    bracket={10}
                    tint={(r, c) => (r === state.row && c === state.column ? (shown ? GREEN_TINT : SECOND_TINT) : undefined)}
                    color={(r, c) => (r === state.row && c === state.column ? (shown ? GREEN : SECOND) : undefined)}
                >
                    {ab.map((row, r) => row.map((_, c) => (
                        <rect key={`${r}${c}`} x={246 + c * 44} y={50 + r * 30} width={44} height={30} fill="transparent" style={{ cursor: 'pointer' }} role="button" tabIndex={0} aria-label={`c${r + 1}${c + 1}`}
                            onClick={() => setState((s) => chooseCell(s, r, c))} onKeyDown={pressKey(() => setState((s) => chooseCell(s, r, c)))} />
                    )))}
                </MatrixBlock>
                <text x={180} y={150} textAnchor="middle" fontSize={14} fill={MUTED} direction="ltr">{`(2 × 3)(3 × 2) → 2 × 2`}</text>
                <Label x={180} y={176} textAnchor="middle" fontSize={13} fill={MUTED}>{l(say('Ukitu AB matrizeko lauki bat', 'Toca una casilla de AB', 'المس خانة من AB', 'Tap a cell of AB'))}</Label>
            </Board>
        </ToolFrame>
    )
}

/* ---------- L2. The route map ---------- */

const TOWN_AT: Array<[number, number]> = [[70, 60], [290, 60], [290, 228], [70, 228]]

function RouteArrow({ i, j, on, onToggle }: { i: number; j: number; on: boolean; onToggle: () => void }) {
    const [x1, y1] = TOWN_AT[i]
    const [x2, y2] = TOWN_AT[j]
    const length = Math.hypot(x2 - x1, y2 - y1)
    const ux = (x2 - x1) / length
    const uy = (y2 - y1) / length
    // Each direction runs on its own side of the road
    const ox = -uy * 7
    const oy = ux * 7
    const sx = x1 + ux * 26 + ox
    const sy = y1 + uy * 26 + oy
    const ex = x2 - ux * 28 + ox
    const ey = y2 - uy * 28 + oy
    const color = on ? STAGE : MUTED
    const head = `${ex},${ey} ${ex - ux * 11 - uy * 5},${ey - uy * 11 + ux * 5} ${ex - ux * 11 + uy * 5},${ey - uy * 11 - ux * 5}`
    return (
        <g role="button" tabIndex={0} aria-pressed={on} aria-label={`${i + 1} → ${j + 1}`} style={{ cursor: 'pointer' }} onClick={onToggle} onKeyDown={pressKey(onToggle)}>
            <line x1={sx} y1={sy} x2={ex} y2={ey} stroke="transparent" strokeWidth={16} />
            <line x1={sx} y1={sy} x2={ex - ux * 8} y2={ey - uy * 8} stroke={color} strokeWidth={on ? 3 : 1.4} strokeDasharray={on ? undefined : '4 5'} opacity={on ? 1 : 0.55} />
            <polygon points={head} fill={color} opacity={on ? 1 : 0.55} />
        </g>
    )
}

export function RouteMapTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RouteState>(initialRouteState)
    const shown = state.prediction !== null
    const a = adjacency(state)
    const a2 = square(a)
    const count = twoStep(state)
    const via = changes(state)
    const towns = Array.from({ length: TOWNS }, (_, index) => ({ value: String(index), label: String(index + 1) }))
    const controls = (
        <>
            <Segmented<string> label={l(say('Nondik', 'Desde', 'من', 'From'))} value={String(state.from)} options={towns} onChange={(from) => setState((s) => chooseTrip(s, Number(from), s.to))} />
            <Segmented<string> label={l(say('Nora', 'Hasta', 'إلى', 'To'))} value={String(state.to)} options={towns} onChange={(to) => setState((s) => chooseTrip(s, s.from, Number(to)))} />
        </>
    )
    const entry = `(A^2)_{${state.from + 1}${state.to + 1}}`
    const routes = via.map((k) => `${state.from + 1} → ${k + 1} → ${state.to + 1}`).join(', ')
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: zenbat bidaia daude ${state.from + 1} herritik ${state.to + 1} herrira, aldaketa batekin?`, `Antes de verlo: ¿cuántos viajes hay del pueblo ${state.from + 1} al ${state.to + 1} con un transbordo?`, `قبل أن ترى: كم رحلة من البلدة ${state.from + 1} إلى البلدة ${state.to + 1} بتبديل واحد؟`, `Before you see it: how many trips are there from town ${state.from + 1} to town ${state.to + 1} with one change?`)}
            labels={{ '<': say('Bat ere ez', 'Ninguno', 'لا شيء', 'None'), '=': say('Bat', 'Uno', 'واحدة', 'One'), '>': say('Bi edo gehiago', 'Dos o más', 'اثنتان أو أكثر', 'Two or more') }}
            actual={routePrediction(state)}
            choice={state.prediction}
            tip={say('Begiratu herri bakoitza erdian: lehen herritik hara linea bat, eta handik azkenera beste bat.', 'Mira cada pueblo del medio: una línea del primero hasta él y otra de él al último.', 'انظر إلى كل بلدة في الوسط: خط من الأولى إليها وخط منها إلى الأخيرة.', 'Look at each town in the middle: a line from the first to it and another from it to the last.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[`A^2=${matrixLatex(a2)}`, `${entry}=${count}`]} note={count ? routes : l(say('Ez dago aldaketa bateko bidaiarik.', 'No hay viajes con un transbordo.', 'لا توجد رحلات بتبديل واحد.', 'There are no trips with one change.'))} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={routeChallenges} extraChallenges={routeExtra} state={state}>
            <Board height={300} label={l(say('Lau herri eta haien arteko autobus-lineak; ukitu gezi bat linea jartzeko edo kentzeko', 'Cuatro pueblos y sus líneas de autobús; toca una flecha para poner o quitar una línea', 'أربع بلدات وخطوط الحافلات بينها؛ المس سهمًا لتضع خطًّا أو تزيله', 'Four towns and their bus lines; tap an arrow to add or remove a line'))}>
                {Array.from({ length: TOWNS }, (_, i) => Array.from({ length: TOWNS }, (__, j) => (i === j ? null : (
                    <RouteArrow key={`${i}${j}`} i={i} j={j} on={state.arrows[i][j]} onToggle={() => setState((s) => toggleArrow(s, i, j))} />
                ))))}
                {TOWN_AT.map(([x, y], index) => {
                    const role = index === state.from ? STAGE : index === state.to ? SECOND : INK
                    const middle = shown && via.includes(index)
                    return (
                        <g key={index}>
                            <circle cx={x} cy={y} r={20} fill={middle ? GREEN_TINT : PAPER} stroke={role} strokeWidth={index === state.from || index === state.to ? 3 : 2} />
                            <text x={x} y={y + 6} textAnchor="middle" fontSize={17} fontWeight={700} fill={role}>{index + 1}</text>
                        </g>
                    )
                })}
                <text x={180} y={292} textAnchor="middle" fontSize={14} fill={MUTED} direction="ltr">{`A = (${a.map((row) => row.join(' ')).join(' | ')})`}</text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- L3. The Gauss–Jordan machine ---------- */

const verdictJordan = (state: JordanState): LocalizedText | null => {
    if (leftIsIdentity(state)) return say('Ezkerrean I dago: eskuinekoa A⁻¹ da.', 'A la izquierda está I: la derecha es A⁻¹.', 'في اليسار I: الجزء الأيمن هو A⁻¹.', 'I is on the left: the right part is A⁻¹.')
    if (leftHasZeroRow(state)) return say('Zeroko errenkada ezkerrean: A matrizeak ez du alderantzizkorik.', 'Fila de ceros a la izquierda: A no tiene inversa.', 'صف أصفار في اليسار: ليس لـ A معكوس.', 'A row of zeros on the left: A has no inverse.')
    return null
}

export function GaussJordanTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<JordanState>(initialJordanState)
    const size = sizeOf(state)
    const shown = state.prediction !== null
    const preview = previewRow(state)
    const verdict = verdictJordan(state)
    const cell = size === 2 ? 60 : 44
    // The matrix (A | I) is centred on the board; the row names sit just before it
    const left = Math.max(40, (360 - 2 * size * cell - 20) / 2 + 10)
    const top = 16
    const gap = 30
    const rowsLabels = Array.from({ length: size }, (_, index) => ({ value: String(index), label: `E${index + 1}` }))
    const op = `${state.m === 1 ? '' : state.m}E_${state.target + 1}${state.k < 0 ? '-' : '+'}${Math.abs(state.k) === 1 ? '' : Math.abs(state.k)}E_${state.source + 1}`
    const controls = (
        <>
            <Segmented<string> label={l(say('Matrizea', 'Matriz', 'المصفوفة', 'Matrix'))} value={String(state.matrix)} options={JORDAN_NAMES.map((name, index) => ({ value: String(index), label: name }))} onChange={(matrix) => setState(loadJordan(Number(matrix)))} />
            <Segmented<string> label={l(say('Aldatzen dena', 'Cambia', 'يتغيّر', 'Changes'))} value={String(state.target)} options={rowsLabels} onChange={(target) => setState((s) => setJordan(s, { target: Number(target) }))} />
            <Segmented<string> label={l(say('Erabiltzen dena', 'Usa', 'يستعمل', 'Uses'))} value={String(state.source)} options={rowsLabels.filter((option) => option.value !== String(state.target))} onChange={(source) => setState((s) => setJordan(s, { source: Number(source) }))} />
            <Stepper label="m" value={state.m} min={JORDAN_LIMITS.m.min} max={JORDAN_LIMITS.m.max} onChange={(m) => setState((s) => setJordan(s, { m }))} language={props.language} />
            <Stepper label="k" value={state.k} min={JORDAN_LIMITS.k.min} max={JORDAN_LIMITS.k.max} onChange={(k) => setState((s) => setJordan(s, { k }))} language={props.language} />
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $${op}$ eginda, zer geratzen da $E_${state.source + 1}$ errenkadaren pibotaren zutabean?`, `Antes de verlo: con $${op}$, ¿qué queda en la columna del pivote de $E_${state.source + 1}$?`, `قبل أن ترى: بالعملية $${op}$ ماذا يبقى في عمود محور $E_${state.source + 1}$؟`, `Before you see it: with $${op}$, what is left in the column of the pivot of $E_${state.source + 1}$?`)}
            labels={{ '<': say('Negatiboa', 'Negativo', 'سالب', 'Negative'), '=': say('0', '0', 'صفر', '0'), '>': say('Positiboa', 'Positivo', 'موجب', 'Positive') }}
            actual={jordanPrediction(state)}
            choice={state.prediction}
            tip={say('m bider aldatzen den errenkadako zenbakia gehi k bider erabiltzen denekoa. 0 izateko, bi biderkadurek aurkakoak izan behar dute.', 'm por el número de la fila que cambia más k por el de la fila que usa. Para un 0, los dos productos tienen que ser opuestos.', 'm ضرب عدد الصف الذي يتغيّر زائد k ضرب عدد الصف المستعمل. ليكون صفرًا يجب أن يكون الجداءان متعاكسين.', 'm times the number of the changing row plus k times that of the row used. For a 0, the two products must be opposites.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[`${op}\\ \\to\\ \\begin{pmatrix}${preview.map(entryLatex).join('&')}\\end{pmatrix}`]}
                note={l(isZero(preview[state.source])
                    ? say('Zero bat: aplikatu eragiketa.', 'Un cero: aplica la operación.', 'صفر: طبّق العملية.', 'A zero: apply the operation.')
                    : say('Ez da 0: aldatu m edo k, edo aplikatu hala ere.', 'No es 0: cambia m o k, o aplícala de todos modos.', 'ليس صفرًا: غيّر m أو k، أو طبّقها على أي حال.', 'It is not 0: change m or k, or apply it anyway.'))}
            />
        </Predict>
    )
    const rowY = (index: number) => top + index * gap
    const previewY = rowY(size) + 14
    const height = previewY + gap + (verdict ? 56 : 18)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={jordanChallenges} extraChallenges={jordanExtra} state={state}>
            <Board height={height} label={l(say(`${JORDAN_NAMES[state.matrix]} matrizea eta identitatea, (A | I)`, `La matriz ${JORDAN_NAMES[state.matrix]} y la identidad, (A | I)`, `المصفوفة ${JORDAN_NAMES[state.matrix]} والمحايدة (A | I)`, `Matrix ${JORDAN_NAMES[state.matrix]} and the identity, (A | I)`))}>
                {state.rows.map((_, index) => {
                    const role = index === state.target ? SECOND : index === state.source ? STAGE : INK
                    return <text key={index} x={left - 24} y={rowY(index) + gap / 2 + 5} textAnchor="middle" fontSize={13} fontWeight={700} fill={role}>{`E${index + 1}`}</text>
                })}
                <MatrixBlock
                    x={left - 10}
                    y={top}
                    cells={state.rows.map((row) => row.map(entryText))}
                    cell={cell}
                    rowGap={gap}
                    size={size === 2 ? 15 : 13}
                    bracket={10}
                    barBefore={size}
                    tint={(r, c) => (r === state.target ? MUSTARD_TINT : r === state.source ? STAGE_TINT : c < size && r === c && !isZero(state.rows[r][c]) ? GREEN_TINT : undefined)}
                    color={(_, c) => (c >= size ? SECOND : undefined)}
                />
                <line x1={20} x2={340} y1={previewY - 6} y2={previewY - 6} stroke={MUTED} strokeWidth={1} strokeDasharray="4 4" />
                <text x={left - 24} y={previewY + gap / 2 + 3} textAnchor="middle" fontSize={12} fontWeight={700} fill={SECOND}>{`E${state.target + 1}′`}</text>
                {preview.map((value, c) => {
                    const x = left + c * cell + cell / 2
                    const pivot = c === state.source
                    if (!shown) return pivot ? <Hidden key={c} x={x} y={previewY + gap / 2 + 7} size={20} /> : <text key={c} x={x} y={previewY + gap / 2 + 3} textAnchor="middle" fontSize={14} fill={MUTED} opacity={0.5}>·</text>
                    return (
                        <g key={c}>
                            {pivot && <rect x={x - cell / 2 + 3} y={previewY + 1} width={cell - 6} height={gap - 4} rx={7} fill={isZero(value) ? GREEN_TINT : SECOND_TINT} stroke={isZero(value) ? GREEN : SECOND} strokeWidth={1.4} />}
                            <text x={x} y={previewY + gap / 2 + 4} textAnchor="middle" fontSize={size === 2 ? 15 : 13} fontWeight={700} fill={pivot ? (isZero(value) ? GREEN : SECOND) : INK} direction="ltr">{entryText(value)}</text>
                        </g>
                    )
                })}
                {verdict && (
                    <g>
                        <rect x={20} y={previewY + gap + 6} width={320} height={34} rx={10} fill={leftIsIdentity(state) ? GREEN_TINT : SECOND_TINT} stroke={leftIsIdentity(state) ? GREEN : SECOND} strokeWidth={1.4} />
                        <Label x={180} y={previewY + gap + 28} textAnchor="middle" fontSize={13} fontWeight={700} fill={leftIsIdentity(state) ? GREEN : SECOND}>{l(verdict)}</Label>
                    </g>
                )}
            </Board>
            <QuickButtons buttons={[{ label: `✓ ${l(say('Aplikatu eragiketa', 'Aplicar la operación', 'طبّق العملية', 'Apply the operation'))}`, disabled: !shown, onClick: () => setState((s) => applyJordan(s)) }]} />
            <QuickButtons buttons={[
                { label: `E${state.target + 1} ÷ ${l(say('pibota', 'pivote', 'المحور', 'pivot'))}`, disabled: !canDivide(state), onClick: () => setState((s) => divideJordan(s)) },
                { label: `E${state.target + 1} ↔ E${state.source + 1}`, onClick: () => setState((s) => swapJordan(s)) },
                { label: l(say('Hasieratik', 'De nuevo', 'من جديد', 'Start again')), disabled: state.steps === 0, onClick: () => setState((s) => loadJordan(s.matrix)) }
            ]} />
            <p className="fraction-v2-lab-readout-note" style={{ textAlign: 'center', margin: '4px 0 0' }}>{l(say(`Eragiketak: ${state.steps}`, `Operaciones: ${state.steps}`, `العمليات: ${state.steps}`, `Operations: ${state.steps}`))}</p>
            {leftIsIdentity(state) && <p className="fraction-v2-lab-readout-note" style={{ textAlign: 'center', margin: '4px 0 0', direction: 'ltr' }}>{`A⁻¹ = (${rightPart(state).map((row) => row.map(entryText).join('  ')).join(' | ')})`}</p>}
        </ToolFrame>
    )
}

/* ---------- L4. The rank slider ---------- */

export function RankSliderTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RankState>(initialRankState)
    const shown = state.prediction !== null
    const family = RANK_FAMILIES[state.family]
    const rows = family.rows(state.m)
    const reduced = echelonAt(state)
    const rank = currentRank(state)
    const { progress, playing, play } = usePlayback(`${state.family}`, 2400)
    const cursor = progress === null ? null : rankValues[Math.min(rankValues.length - 1, Math.floor(progress * rankValues.length))]
    const controls = (
        <>
            <Segmented<string> label={l(say('Familia', 'Familia', 'العائلة', 'Family'))} value={String(state.family)} options={RANK_NAMES.map((name, index) => ({ value: String(index), label: name }))} onChange={(next) => setState((s) => chooseFamily(s, Number(next)))} />
            <Stepper label="m" value={state.m} min={RANK_LIMITS.min} max={RANK_LIMITS.max} format={minus} onChange={(m) => setState((s) => setM(s, m))} language={props.language} />
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: zein da heina $m=${state.m}$ denean?`, `Antes de verlo: ¿qué rango tiene con $m=${state.m}$?`, `قبل أن ترى: ما الرتبة عندما $m=${state.m}$؟`, `Before you see it: what is the rank with $m=${state.m}$?`)}
            labels={{ '<': say('1', '1', '1', '1'), '=': say('2', '2', '2', '2'), '>': say('3', '3', '3', '3') }}
            actual={rankPrediction(state)}
            choice={state.prediction}
            tip={say('Mailakatu: zenbatu zeroz osatuta ez dauden errenkadak.', 'Escalona: cuenta las filas que no son de ceros.', 'حوّل إلى الشكل الدرجي: عُدّ الصفوف التي ليست أصفارًا.', 'Reduce it: count the rows that are not all zeros.')}
            onChoose={(prediction) => setState((s) => markSeen(setPrediction(s, prediction)))}
        >
            <Readout latex={[`${family.latex}\\ \\to\\ ${matrixLatex(reduced)}`, `\\operatorname{rg}=${rank}`]} note={l(say('Mugitu m eta bilatu heina jaisten den balioak.', 'Mueve m y busca los valores en que baja el rango.', 'حرّك m وابحث عن القيم التي تنقص فيها الرتبة.', 'Move m and look for the values where the rank goes down.'))} />
        </Predict>
    )
    const stripY = 168
    const step = 30
    const stripX = (m: number) => 30 + (m - RANK_LIMITS.min) * step
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={rankChallenges} extraChallenges={rankExtra} state={state}>
            <Board height={236} label={l(say(`${RANK_NAMES[state.family]} familia, m = ${state.m}: matrizea eta forma mailakatua`, `Familia ${RANK_NAMES[state.family]}, m = ${state.m}: la matriz y su forma escalonada`, `العائلة ${RANK_NAMES[state.family]}، m = ${state.m}: المصفوفة وشكلها الدرجي`, `Family ${RANK_NAMES[state.family]}, m = ${state.m}: the matrix and its echelon form`))}>
                <MatrixBlock x={4} y={22} cells={rows.map((row) => row.map(minus))} cell={34} rowGap={30} size={15} bracket={10} color={(r, c) => (family.rows(0)[r][c] !== family.rows(1)[r][c] ? SECOND : undefined)} />
                <text x={148} y={74} textAnchor="middle" fontSize={20} fill={MUTED}>→</text>
                <MatrixBlock
                    x={170}
                    y={22}
                    cells={reduced.map((row) => row.map((value) => (shown ? entryText(value) : '·')))}
                    cell={56}
                    rowGap={30}
                    size={14}
                    bracket={10}
                    tint={(r) => (shown ? (reduced[r].every(isZero) ? SECOND_TINT : GREEN_TINT) : undefined)}
                />
                {shown && <text x={350} y={16} textAnchor="end" fontSize={15} fontWeight={700} fill={GREEN} direction="ltr">{`rg = ${rank}`}</text>}
                <text x={180} y={stripY - 26} textAnchor="middle" fontSize={13} fill={MUTED} direction="ltr">m</text>
                {rankValues.map((m) => {
                    const seen = state.seen.includes(m)
                    const value = rankAt(state.family, m)
                    const low = seen && value < Math.max(...rankValues.map((other) => rankAt(state.family, other)))
                    const here = m === state.m
                    const lit = cursor === m
                    return (
                        <g key={m}>
                            <rect x={stripX(m) - 13} y={stripY - 14} width={26} height={44} rx={6} fill={lit ? MUSTARD_TINT : low ? SECOND_TINT : seen ? GREEN_TINT : PAPER} stroke={here ? INK : MUTED} strokeWidth={here ? 2.4 : 1} />
                            <text x={stripX(m)} y={stripY + 2} textAnchor="middle" fontSize={12} fill={MUTED} direction="ltr">{minus(m)}</text>
                            <text x={stripX(m)} y={stripY + 22} textAnchor="middle" fontSize={15} fontWeight={700} fill={low ? SECOND : INK}>{seen ? value : '?'}</text>
                        </g>
                    )
                })}
                <Label x={180} y={stripY + 54} textAnchor="middle" fontSize={13} fill={MUTED}>{l(say('Heina m bakoitzeko', 'El rango con cada m', 'الرتبة مع كل m', 'The rank for each m'))}</Label>
            </Board>
            <PlayButton label={l(say('Ibili m guztiak', 'Recorrer todos los m', 'مرّ على كل قيم m', 'Run through every m'))} disabled={false} playing={playing} onPlay={() => { play(); setState((s) => seeAll(s)) }} />
        </ToolFrame>
    )
}
