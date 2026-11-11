import { useRef, useState, type PointerEvent } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { GREEN, GREEN_TINT, INK, MUSTARD_TINT, MUTED, PAPER, say, SECOND, SECOND_TINT, STAGE, STAGE_TINT } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { MatrixBlock } from '../../batx2-zientziak-matrizeak/MatrixSvg'
import { DeterminantBlock } from '../DeterminantSvg'
import {
    chooseDetFamily, currentDetValue, DET_FAMILIES, DET_LIMITS, DET_NAMES, detCurve, detSliderChallenges, detSliderExtra, detSliderPrediction, detValues, initialDetSliderState, markDetSeen, setK,
    traceAll, type DetSliderState
} from './detSlider'
import {
    ARROW_LIMITS, chooseArrow, initialParallelogramState, nearestArrow, parallelogramChallenges, parallelogramDet, parallelogramExtra, parallelogramPrediction, setTip, slid, type Arrow,
    type ParallelogramState, type Vector
} from './parallelogram'
import {
    ADD_LIMITS, applyOperation, canApply, chooseOperation, currentDet, detOf, initialPropertyState, isTriangular, loadPreset, operationLatex, previewMatrix, PROPERTY_NAMES, propertyChallenges,
    propertyExtra, propertyPrediction, setK as setAddK, setScale, setSource, setTarget, type PropertyOperation, type PropertyState
} from './propertyMachine'
import {
    chooseLine, chooseSignPreset, currentCount, expansion, initialSignBoardState, markTried, SIGN_NAMES, SIGN_PRESETS, signBoardChallenges, signBoardExtra, signBoardPrediction, type LineKind,
    type SignBoardState
} from './signBoard'

/* ==========================================================================
   Determinanteak · Batxilergoa 2 · Zientziak — the four tools of this
   unit: the parallelogram (drag the two columns; |A| is the signed area),
   the property machine (a row operation and what it does to |A|), the
   sign board (the line to expand along and its cofactors) and the
   determinant slider (|A(k)| as a curve). Each asks for a prediction
   before it shows the result. Logic in parallelogram.ts,
   propertyMachine.ts, signBoard.ts and detSlider.ts.
   ========================================================================== */

const minus = (value: number) => (value < 0 ? `−${-value}` : String(value))
const bracket = (value: number) => (value < 0 ? `(${value})` : String(value))
const SUBSCRIPT = ['₀', '₁', '₂', '₃', '₄']

function QuickButtons({ buttons }: { buttons: Array<{ label: string; disabled?: boolean; onClick: () => void }> }) {
    return (
        <div className="fraction-v2-lab-quick-actions" style={{ width: '100%', maxWidth: 520, margin: '0 auto' }}>
            {buttons.map((button) => <button key={button.label} type="button" disabled={button.disabled} onClick={button.onClick}>{button.label}</button>)}
        </div>
    )
}

const signLabels = {
    '<': say('Negatiboa', 'Negativo', 'سالب', 'Negative'),
    '=': say('0', '0', 'صفر', '0'),
    '>': say('Positiboa', 'Positivo', 'موجب', 'Positive')
}

/* ---------- L1. The parallelogram ---------- */

const OX = 180
const OY = 145
const UNIT = 22
const SPAN = 6
const toX = (x: number) => OX + x * UNIT
const toY = (y: number) => OY - y * UNIT

function ArrowLine({ to, color, name, from = [0, 0] }: { to: Vector; color: string; name: string; from?: Vector }) {
    const [x1, y1] = [toX(from[0]), toY(from[1])]
    const [x2, y2] = [toX(to[0]), toY(to[1])]
    const length = Math.hypot(x2 - x1, y2 - y1)
    if (length < 1) return <circle cx={x1} cy={y1} r={5} fill={color} />
    const ux = (x2 - x1) / length
    const uy = (y2 - y1) / length
    const head = `${x2},${y2} ${x2 - ux * 12 - uy * 6},${y2 - uy * 12 + ux * 6} ${x2 - ux * 12 + uy * 6},${y2 - uy * 12 - ux * 6}`
    return (
        <g>
            <line x1={x1} y1={y1} x2={x2 - ux * 8} y2={y2 - uy * 8} stroke={color} strokeWidth={3.4} strokeLinecap="round" />
            <polygon points={head} fill={color} />
            <text x={x2 + ux * 14} y={y2 + uy * 14 + 5} textAnchor="middle" fontSize={16} fontWeight={700} fill={color} fontStyle="italic">{name}</text>
        </g>
    )
}

export function ParallelogramTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ParallelogramState>(initialParallelogramState)
    const dragging = useRef<Arrow | null>(null)
    const shown = state.prediction !== null
    const value = parallelogramDet(state)
    const { progress, playing, play } = usePlayback(`${state.u}|${state.v}`, 3200)
    const s = progress === null ? 0 : Math.sin(progress * Math.PI * 2)
    const v = slid(state, s)
    const [a, c] = state.u
    const [b, d] = state.v
    const active = state[state.active]
    const names = state.active === 'u' ? ['a', 'c'] : ['b', 'd']

    const gridPoint = (event: PointerEvent<SVGRectElement>): Vector | null => {
        const svg = event.currentTarget.ownerSVGElement
        const matrix = svg?.getScreenCTM()
        if (!matrix) return null
        const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse())
        return [Math.round((point.x - OX) / UNIT), Math.round((OY - point.y) / UNIT)]
    }
    const onDown = (event: PointerEvent<SVGRectElement>) => {
        const point = gridPoint(event)
        if (!point) return
        const arrow = nearestArrow(state, point)
        dragging.current = arrow
        event.currentTarget.setPointerCapture(event.pointerId)
        setState((current) => setTip(current, arrow, point))
    }
    const onMove = (event: PointerEvent<SVGRectElement>) => {
        const arrow = dragging.current
        const point = arrow ? gridPoint(event) : null
        if (arrow && point) setState((current) => setTip(current, arrow, point))
    }
    const onUp = () => { dragging.current = null }

    const controls = (
        <>
            <Segmented<Arrow> label={l(say('Gezia', 'Flecha', 'السهم', 'Arrow'))} value={state.active} options={[{ value: 'u', label: 'u = (a, c)' }, { value: 'v', label: 'v = (b, d)' }]} onChange={(arrow) => setState((current) => chooseArrow(current, arrow))} />
            <Stepper label={names[0]} value={active[0]} min={ARROW_LIMITS.min} max={ARROW_LIMITS.max} format={minus} onChange={(next) => setState((current) => setTip(current, current.active, [next, current[current.active][1]]))} language={props.language} />
            <Stepper label={names[1]} value={active[1]} min={ARROW_LIMITS.min} max={ARROW_LIMITS.max} format={minus} onChange={(next) => setState((current) => setTip(current, current.active, [current[current.active][0], next]))} language={props.language} />
        </>
    )
    const side = value > 0
        ? say(`Azalera ${value} da: v gezia u geziaren ezkerraldera dago (erlojuaren kontrako noranzkoan).`, `El área es ${value}: v queda a la izquierda de u (en sentido antihorario).`, `المساحة ${value}: يقع v على يسار u (عكس اتجاه عقارب الساعة).`, `The area is ${value}: v is to the left of u (anticlockwise).`)
        : value < 0
            ? say(`Azalera ${-value} da, baina v gezia u geziaren eskuinaldera dago (erlojuaren noranzkoan): zeinua negatiboa da.`, `El área es ${-value}, pero v queda a la derecha de u (en el sentido del reloj): el signo es negativo.`, `المساحة ${-value}، لكن v يقع على يمين u (باتجاه عقارب الساعة): الإشارة سالبة.`, `The area is ${-value}, but v is to the right of u (clockwise): the sign is negative.`)
            : say('Bi geziak lerro berean daude: paralelogramoa zapaldu egin da.', 'Las dos flechas están en la misma recta: el paralelogramo se ha aplastado.', 'السهمان على المستقيم نفسه: انسحق متوازي الأضلاع.', 'Both arrows lie on the same line: the parallelogram is squashed flat.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: zer zeinu du $|A|$ determinanteak?', 'Antes de verlo: ¿qué signo tiene $|A|$?', 'قبل أن ترى: ما إشارة $|A|$؟', 'Before you see it: what sign does $|A|$ have?')}
            labels={signLabels}
            actual={parallelogramPrediction(state)}
            choice={state.prediction}
            tip={say('Begiratu $u$ gezitik $v$ gezira biratzeko noranzkoa.', 'Mira hacia dónde hay que girar para ir de $u$ a $v$.', 'انظر إلى اتجاه الدوران من $u$ إلى $v$.', 'Look at which way you turn to go from $u$ to $v$.')}
            onChoose={(prediction) => setState((current) => setPrediction(current, prediction))}
        >
            <Readout latex={[`A=\\begin{pmatrix}${a}&${b}\\\\${c}&${d}\\end{pmatrix}`, `|A|=${bracket(a)}\\cdot ${bracket(d)}-${bracket(b)}\\cdot ${bracket(c)}=${value}`]} note={l(side)} />
        </Predict>
    )
    const corner: Vector = [state.u[0] + v[0], state.u[1] + v[1]]
    const fill = !shown ? MUSTARD_TINT : value > 0 ? GREEN_TINT : value < 0 ? SECOND_TINT : PAPER
    const centre: Vector = [corner[0] / 2, corner[1] / 2]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={parallelogramChallenges} extraChallenges={parallelogramExtra} state={state}>
            <Board height={290} label={l(say(`u = (${a}, ${c}) eta v = (${b}, ${d}) geziak eta haien paralelogramoa`, `Las flechas u = (${a}, ${c}) y v = (${b}, ${d}) y su paralelogramo`, `السهمان u = (${a}, ${c}) وv = (${b}, ${d}) ومتوازي أضلاعهما`, `The arrows u = (${a}, ${c}) and v = (${b}, ${d}) and their parallelogram`))}>
                <defs>
                    <clipPath id="determinant-parallelogram-grid"><rect x={toX(-SPAN)} y={toY(SPAN)} width={2 * SPAN * UNIT} height={2 * SPAN * UNIT} /></clipPath>
                </defs>
                <rect x={toX(-SPAN)} y={toY(SPAN)} width={2 * SPAN * UNIT} height={2 * SPAN * UNIT} fill={PAPER} stroke={MUTED} strokeWidth={0.6} />
                {Array.from({ length: 2 * SPAN + 1 }, (_, index) => index - SPAN).map((k) => (
                    <g key={k} stroke={MUTED} strokeWidth={k === 0 ? 1.4 : 0.4} opacity={k === 0 ? 0.9 : 0.45}>
                        <line x1={toX(k)} x2={toX(k)} y1={toY(SPAN)} y2={toY(-SPAN)} />
                        <line x1={toX(-SPAN)} x2={toX(SPAN)} y1={toY(k)} y2={toY(k)} />
                    </g>
                ))}
                <g clipPath="url(#determinant-parallelogram-grid)">
                    <polygon points={[[0, 0], state.u, corner, v].map(([x, y]) => `${toX(x)},${toY(y)}`).join(' ')} fill={fill} stroke={shown ? (value >= 0 ? GREEN : SECOND) : INK} strokeWidth={1.6} strokeDasharray={shown ? undefined : '5 4'} opacity={0.92} />
                    <ArrowLine to={state.u} color={STAGE} name="u" />
                    <ArrowLine to={v} color={SECOND} name="v" />
                    {progress !== null && <ArrowLine from={state.u} to={corner} color={SECOND} name="" />}
                </g>
                {shown ? <text x={toX(centre[0])} y={toY(centre[1]) + 6} textAnchor="middle" fontSize={17} fontWeight={700} fill={value >= 0 ? GREEN : SECOND} stroke={PAPER} strokeWidth={4} paintOrder="stroke" direction="ltr">{`|A| = ${minus(value)}`}</text> : <Hidden x={toX(centre[0])} y={toY(centre[1]) + 9} size={22} />}
                <rect
                    x={toX(-SPAN)}
                    y={toY(SPAN)}
                    width={2 * SPAN * UNIT}
                    height={2 * SPAN * UNIT}
                    fill="transparent"
                    style={{ cursor: 'crosshair', touchAction: 'none' }}
                    onPointerDown={onDown}
                    onPointerMove={onMove}
                    onPointerUp={onUp}
                    onPointerCancel={onUp}
                />
            </Board>
            <PlayButton label={l(say('Irristatu v, u geziaren norabidean', 'Desliza v a lo largo de u', 'زلّق v على امتداد u', 'Slide v along u'))} disabled={false} playing={playing} onPlay={play} />
            {progress !== null && <p className="fraction-v2-lab-readout-note" style={{ textAlign: 'center', margin: '4px 0 0' }}>{l(say('v + s·u: oinarria eta altuera ez dira aldatzen, ezta azalera ere. Zutabe bati bestearen multiplo bat batzea da.', 'v + s·u: la base y la altura no cambian, y el área tampoco. Es sumar a una columna un múltiplo de la otra.', 'v + s·u: لا تتغير القاعدة ولا الارتفاع، ولا المساحة. إنه إضافة مضاعف عمود إلى الآخر.', 'v + s·u: the base and the height do not change, nor does the area. It is adding a multiple of one column to the other.'))}</p>}
        </ToolFrame>
    )
}

/* ---------- L2. The property machine ---------- */

const operationText = (state: Pick<PropertyState, 'operation' | 'target' | 'source' | 'scale' | 'k'>) => {
    const t = `E${SUBSCRIPT[state.target + 1]}`
    const s = `E${SUBSCRIPT[state.source + 1]}`
    if (state.operation === 'swap') return `${t} ↔ ${s}`
    if (state.operation === 'scale') return `${state.scale}${t}`
    const size = Math.abs(state.k) === 1 ? '' : String(Math.abs(state.k))
    return `${t} ${state.k < 0 ? '−' : '+'} ${size}${s}`
}

export function PropertyMachineTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<PropertyState>(initialPropertyState)
    const shown = state.prediction !== null
    const name = PROPERTY_NAMES[state.preset]
    const before = currentDet(state)
    const preview = previewMatrix(state)
    const after = detOf(preview)
    const rows = ['1', '2', '3'].map((label, index) => ({ value: String(index), label }))
    const controls = (
        <>
            <Segmented<string> label={l(say('Matrizea', 'Matriz', 'المصفوفة', 'Matrix'))} value={String(state.preset)} options={PROPERTY_NAMES.map((item, index) => ({ value: String(index), label: item }))} onChange={(preset) => setState(loadPreset(Number(preset)))} />
            <Segmented<PropertyOperation>
                label={l(say('Eragiketa', 'Operación', 'العملية', 'Operation'))}
                value={state.operation}
                options={[{ value: 'swap', label: 'Eᵢ ↔ Eⱼ' }, { value: 'scale', label: 'k·Eᵢ' }, { value: 'add', label: 'Eᵢ + k·Eⱼ' }]}
                onChange={(operation) => setState((current) => chooseOperation(current, operation))}
            />
            <Segmented<string> label={l(say('Errenkada (i)', 'Fila (i)', 'الصف (i)', 'Row (i)'))} value={String(state.target)} options={rows} onChange={(row) => setState((current) => setTarget(current, Number(row)))} />
            {state.operation !== 'scale' && <Segmented<string> label={l(say('Beste errenkada (j)', 'Otra fila (j)', 'الصف الآخر (j)', 'Other row (j)'))} value={String(state.source)} options={rows} onChange={(row) => setState((current) => setSource(current, Number(row)))} />}
            {state.operation === 'scale' && <Segmented<string> label="k" value={String(state.scale)} options={[{ value: '2', label: '2' }, { value: '3', label: '3' }]} onChange={(scale) => setState((current) => setScale(current, Number(scale) as 2 | 3))} />}
            {state.operation === 'add' && <Stepper label="k" value={state.k} min={ADD_LIMITS.min} max={ADD_LIMITS.max} format={minus} onChange={(k) => setState((current) => setAddK(current, k))} language={props.language} />}
        </>
    )
    const effect = state.operation === 'swap'
        ? say('Bi errenkada trukatzean, zeinua aldatzen da.', 'Al cambiar dos filas, cambia el signo.', 'تبديل صفين يغيّر الإشارة.', 'Swapping two rows changes the sign.')
        : state.operation === 'scale'
            ? say(`Errenkada bat ${state.scale} zenbakiaz biderkatzean, determinantea ere ${state.scale} zenbakiaz biderkatzen da.`, `Al multiplicar una fila por ${state.scale}, el determinante se multiplica por ${state.scale}.`, `ضرب صف في ${state.scale} يضرب المحدد في ${state.scale}.`, `Multiplying a row by ${state.scale} multiplies the determinant by ${state.scale}.`)
            : say('Beste errenkada baten multiplo bat batzeak ez du determinantea aldatzen.', 'Sumar un múltiplo de otra fila no cambia el determinante.', 'إضافة مضاعف صف آخر لا تغيّر المحدد.', 'Adding a multiple of another row does not change the determinant.')
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: zer gertatzen zaio $|${name}|$ determinanteari $${operationLatex(state)}$ eragiketarekin?`, `Antes de verlo: ¿qué le pasa a $|${name}|$ con $${operationLatex(state)}$?`, `قبل أن ترى: ماذا يحدث لـ $|${name}|$ مع $${operationLatex(state)}$؟`, `Before you see it: what happens to $|${name}|$ with $${operationLatex(state)}$?`)}
            labels={{
                '<': say('Zeinuz aldatzen da', 'Cambia de signo', 'تتغير إشارته', 'It changes sign'),
                '=': say('Ez da aldatzen', 'No cambia', 'لا يتغير', 'It does not change'),
                '>': say('Biderkatu egiten da', 'Se multiplica', 'يُضرب في عدد', 'It is multiplied')
            }}
            actual={propertyPrediction(state)}
            choice={state.prediction}
            tip={say('Trukatu, biderkatu ala batu: eragiketa bakoitzak bere propietatea du.', 'Cambiar, multiplicar o sumar: cada operación tiene su propiedad.', 'تبديل أو ضرب أو جمع: لكل عملية خاصيتها.', 'Swap, multiply or add: each operation has its property.')}
            onChoose={(prediction) => setState((current) => setPrediction(current, prediction))}
        >
            <Readout latex={`|${name}|=${before}\\ \\to\\ ${after}`} note={l(effect)} />
        </Predict>
    )
    const changed = (r: number) => r === state.target || (state.operation === 'swap' && r === state.source)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={propertyChallenges} extraChallenges={propertyExtra} state={state}>
            <Board height={200} label={l(say(`${name} matrizea eta ${operationText(state)} eragiketa`, `La matriz ${name} y la operación ${operationText(state)}`, `المصفوفة ${name} والعملية ${operationText(state)}`, `The matrix ${name} and the operation ${operationText(state)}`))}>
                <MatrixBlock x={2} y={34} cells={state.matrix.map((row) => row.map(minus))} cell={38} rowGap={32} size={15} bracket={10} tint={(r) => (changed(r) ? STAGE_TINT : undefined)} />
                <text x={70} y={22} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE} direction="ltr">{name}</text>
                <text x={70} y={160} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK} direction="ltr">{`|${name}| = ${minus(before)}`}</text>
                <text x={180} y={74} textAnchor="middle" fontSize={14} fontWeight={700} fill={SECOND} direction="ltr">{operationText(state)}</text>
                <text x={180} y={98} textAnchor="middle" fontSize={22} fill={MUTED}>→</text>
                <MatrixBlock
                    x={224}
                    y={34}
                    cells={preview.map((row, r) => row.map((entry) => (shown || !changed(r) ? minus(entry) : '·')))}
                    cell={38}
                    rowGap={32}
                    size={15}
                    bracket={10}
                    tint={(r) => (changed(r) ? (shown ? GREEN_TINT : SECOND_TINT) : undefined)}
                />
                {shown
                    ? <text x={292} y={160} textAnchor="middle" fontSize={15} fontWeight={700} fill={GREEN} direction="ltr">{`|${name}′| = ${minus(after)}`}</text>
                    : <Hidden x={292} y={164} size={22} />}
                {isTriangular(state.matrix) && <Label x={180} y={190} textAnchor="middle" fontSize={13} fill={GREEN}>{l(say(`Triangeluarra: |${name}| = ${state.matrix.map((row, i) => minus(row[i])).join(' · ')}`, `Triangular: |${name}| = ${state.matrix.map((row, i) => minus(row[i])).join(' · ')}`, `مثلثية: |${name}| = ${state.matrix.map((row, i) => minus(row[i])).join(' · ')}`, `Triangular: |${name}| = ${state.matrix.map((row, i) => minus(row[i])).join(' · ')}`))}</Label>}
            </Board>
            <QuickButtons buttons={[
                { label: `✓ ${l(say('Aplikatu eragiketa', 'Aplicar la operación', 'طبّق العملية', 'Apply the operation'))}`, disabled: !shown || !canApply(state), onClick: () => setState((current) => applyOperation(current)) },
                { label: l(say('Hasieratik', 'De nuevo', 'من جديد', 'Start again')), disabled: state.steps === 0, onClick: () => setState((current) => loadPreset(current.preset)) }
            ]} />
            <p className="fraction-v2-lab-readout-note" style={{ textAlign: 'center', margin: '4px 0 0' }}>
                {l(say(`Eragiketak: ${state.steps}`, `Operaciones: ${state.steps}`, `العمليات: ${state.steps}`, `Operations: ${state.steps}`))}
                {!canApply(state) && ` · ${l(say('Zenbakiak handiegiak lirateke.', 'Los números serían demasiado grandes.', 'ستصبح الأعداد كبيرة جدًّا.', 'The numbers would be too big.'))}`}
            </p>
        </ToolFrame>
    )
}

/* ---------- L3. The sign board ---------- */

export function SignBoardTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SignBoardState>(initialSignBoardState)
    const shown = state.prediction !== null
    const name = SIGN_NAMES[state.preset]
    const matrix = SIGN_PRESETS[state.preset]
    const size = matrix.length
    const terms = expansion(state.preset, state.line)
    const needed = terms.filter((term) => term.entry !== 0)
    const total = terms.reduce((sum, term) => sum + term.entry * term.cofactor, 0)
    const count = currentCount(state)
    const inLine = (r: number, c: number) => (state.line.kind === 'row' ? r === state.line.index : c === state.line.index)
    const lineName = (kind: LineKind, index: number) => (kind === 'row'
        ? say(`${index + 1}. errenkada`, `la fila ${index + 1}`, `الصف ${index + 1}`, `row ${index + 1}`)
        : say(`${index + 1}. zutabea`, `la columna ${index + 1}`, `العمود ${index + 1}`, `column ${index + 1}`))
    const here = lineName(state.line.kind, state.line.index)
    // Basque says «along» with the genitive of the word, never of the number
    const alongEu = state.line.kind === 'row' ? `${state.line.index + 1}. errenkadaren arabera` : `${state.line.index + 1}. zutabearen arabera`
    const controls = (
        <>
            <Segmented<string> label={l(say('Determinantea', 'Determinante', 'المحدد', 'Determinant'))} value={String(state.preset)} options={SIGN_NAMES.map((item, index) => ({ value: String(index), label: item }))} onChange={(preset) => setState((current) => chooseSignPreset(current, Number(preset)))} />
            <Segmented<LineKind> label={l(say('Lerroa', 'Línea', 'الخط', 'Line'))} value={state.line.kind} options={[{ value: 'row', label: l(say('Errenkada', 'Fila', 'صف', 'Row')) }, { value: 'column', label: l(say('Zutabea', 'Columna', 'عمود', 'Column')) }]} onChange={(kind) => setState((current) => chooseLine(current, { kind, index: current.line.index }))} />
            <Segmented<string> label={l(say('Zenbakia', 'Número', 'الرقم', 'Number'))} value={String(state.line.index)} options={Array.from({ length: size }, (_, index) => ({ value: String(index), label: String(index + 1) }))} onChange={(index) => setState((current) => chooseLine(current, { kind: current.line.kind, index: Number(index) }))} />
        </>
    )
    const cofactorName = (row: number, column: number) => `${name}_{${row + 1}${column + 1}}`
    const factor = (entry: number) => (entry === 1 ? '' : `${bracket(entry)}\\cdot `)
    const symbolic = needed.map((term) => `${factor(term.entry)}${cofactorName(term.row, term.column)}`).join('+')
    const numeric = needed.map((term) => `${bracket(term.entry)}\\cdot ${bracket(term.cofactor)}`).join('+')
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: zenbat adjuntu kalkulatu behar dira, ${alongEu} garatuta?`, `Antes de verlo: ¿cuántos adjuntos hay que calcular desarrollando por ${here.es}?`, `قبل أن ترى: كم متممًا جبريًا يجب حسابه بالنشر حسب ${here.ar}؟`, `Before you see it: how many cofactors do you need, expanding along ${here.en}?`)}
            labels={{ '<': say('1', '1', '1', '1'), '=': say('2', '2', '2', '2'), '>': say('3 edo gehiago', '3 o más', '3 أو أكثر', '3 or more') }}
            actual={signBoardPrediction(state)}
            choice={state.prediction}
            tip={say('Zero batek ez du adjunturik behar: $0$ bider edozer, $0$.', 'Un cero no necesita adjunto: $0$ por cualquier cosa es $0$.', 'الصفر لا يحتاج إلى متمم جبري: $0$ ضرب أي شيء يساوي $0$.', 'A zero needs no cofactor: $0$ times anything is $0$.')}
            onChoose={(prediction) => setState((current) => markTried(setPrediction(current, prediction)))}
        >
            <Readout latex={[`|${name}|=${symbolic}`, `=${numeric}`, `=${total}`]} note={l(say(`${count} adjuntu, ${size - count} zero. Lerro guztiek emaitza bera ematen dute.`, `${count} adjuntos y ${size - count} ceros. Todas las líneas dan lo mismo.`, `${count} من المتممات الجبرية و${size - count} من الأصفار. كل الخطوط تعطي النتيجة نفسها.`, `${count} cofactors and ${size - count} zeros. Every line gives the same.`))} />
        </Predict>
    )
    const cell = size === 4 ? 46 : 54
    const gap = size === 4 ? 38 : 44
    const width = size * cell + 16
    const left = (360 - width) / 2
    const termsY = 24 + size * gap + 34
    const step = 360 / size
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={signBoardChallenges} extraChallenges={signBoardExtra} state={state}>
            <Board height={termsY + 64} label={l(say(`${name} determinantea, zeinuen taularekin; ${here.eu} nabarmenduta`, `El determinante ${name} con su tablero de signos; ${here.es} resaltada`, `المحدد ${name} مع لوحة الإشارات؛ ${here.ar} مُبرَز`, `The determinant ${name} with its sign board; ${here.en} highlighted`))}>
                <text x={left - 8} y={24 + (size * gap) / 2 + 6} textAnchor="end" fontSize={17} fontWeight={700} fill={STAGE} direction="ltr">{`${name} =`}</text>
                <DeterminantBlock
                    x={left}
                    y={24}
                    cells={matrix.map((row) => row.map(minus))}
                    cell={cell}
                    rowGap={gap}
                    size={18}
                    signs
                    tint={(r, c) => (inLine(r, c) ? (matrix[r][c] === 0 ? PAPER : STAGE_TINT) : undefined)}
                    color={(r, c) => (inLine(r, c) && matrix[r][c] === 0 ? MUTED : undefined)}
                />
                {terms.map((term, index) => {
                    const x = step * index + step / 2
                    const zero = term.entry === 0
                    const sign = term.sign === 1 ? '+' : '−'
                    return (
                        <g key={index}>
                            <rect x={x - step / 2 + 4} y={termsY - 26} width={step - 8} height={54} rx={8} fill={zero ? PAPER : shown ? GREEN_TINT : MUSTARD_TINT} stroke={zero ? MUTED : INK} strokeWidth={0.8} strokeDasharray={zero ? '4 3' : undefined} />
                            <text x={x} y={termsY - 4} textAnchor="middle" fontSize={16} fontWeight={700} fill={zero ? MUTED : INK} direction="ltr">{zero ? '0' : `${minus(term.entry)} · (${sign})`}</text>
                            <text x={x} y={termsY + 17} textAnchor="middle" fontSize={14} fill={MUTED} direction="ltr">{zero ? '—' : shown ? `${name}${SUBSCRIPT[term.row + 1]}${SUBSCRIPT[term.column + 1]} = ${minus(term.cofactor)}` : `${name}${SUBSCRIPT[term.row + 1]}${SUBSCRIPT[term.column + 1]} = ?`}</text>
                        </g>
                    )
                })}
                <Label x={180} y={termsY + 52} textAnchor="middle" fontSize={shown ? 17 : 14} fontWeight={shown ? 700 : 400} fill={shown ? GREEN : MUTED}>{shown ? `|${name}| = ${minus(total)}` : l(say('Zeroak doan ateratzen dira', 'Los ceros salen gratis', 'الأصفار مجانية', 'The zeros come for free'))}</Label>
            </Board>
        </ToolFrame>
    )
}

/* ---------- L4. The determinant slider ---------- */

export function DetSliderTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<DetSliderState>(initialDetSliderState)
    const shown = state.prediction !== null
    const family = DET_FAMILIES[state.family]
    const rows = family.rows(state.k)
    const value = currentDetValue(state)
    const { progress, playing, play } = usePlayback(`${state.family}`, 2600)
    const controls = (
        <>
            <Segmented<string> label={l(say('Familia', 'Familia', 'العائلة', 'Family'))} value={String(state.family)} options={DET_NAMES.map((name, index) => ({ value: String(index), label: name }))} onChange={(next) => setState((current) => chooseDetFamily(current, Number(next)))} />
            <Stepper label="k" value={state.k} min={DET_LIMITS.min} max={DET_LIMITS.max} format={minus} onChange={(k) => setState((current) => setK(current, k))} language={props.language} />
        </>
    )
    const verdict = value === 0
        ? say('$|A|=0$: matrizeak ez du alderantzizkorik.', '$|A|=0$: la matriz no tiene inversa.', '$|A|=0$: ليس للمصفوفة معكوس.', '$|A|=0$: the matrix has no inverse.')
        : say('$|A|\\neq 0$: matrizeak alderantzizkoa du.', '$|A|\\neq 0$: la matriz tiene inversa.', '$|A|\\neq 0$: للمصفوفة معكوس.', '$|A|\\neq 0$: the matrix has an inverse.')
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: zer zeinu du $|A|$ determinanteak, $k=${state.k}$ denean? Zero bada, ez dago alderantzizkorik.`, `Antes de verlo: ¿qué signo tiene $|A|$ con $k=${state.k}$? Si es cero, no hay inversa.`, `قبل أن ترى: ما إشارة $|A|$ عندما $k=${state.k}$؟ إذا كان صفرًا فلا معكوس.`, `Before you see it: what sign does $|A|$ have with $k=${state.k}$? If it is zero, there is no inverse.`)}
            labels={signLabels}
            actual={detSliderPrediction(state)}
            choice={state.prediction}
            tip={say('Ordeztu $k$ matrizean eta kalkulatu Sarrusekin.', 'Sustituye $k$ en la matriz y calcula con Sarrus.', 'عوّض $k$ في المصفوفة واحسب بقاعدة ساروس.', 'Put $k$ into the matrix and work it out with Sarrus.')}
            onChoose={(prediction) => setState((current) => markDetSeen(setPrediction(current, prediction)))}
        >
            <Readout latex={[`|A|=${family.detLatex}`, `k=${state.k}\\ \\to\\ |A|=${value}`]} note={l(verdict)} />
        </Predict>
    )
    // The plot: k from −3 to 3 across, |A| up and down, scaled to the family
    const plotX = (k: number) => 40 + ((k - DET_LIMITS.min) / (DET_LIMITS.max - DET_LIMITS.min)) * 280
    const highest = Math.max(1, ...Array.from({ length: 61 }, (_, index) => Math.abs(detCurve(state.family, DET_LIMITS.min + index * 0.1))))
    const baseline = 196
    const plotY = (y: number) => baseline - (y / highest) * 60
    const end = progress === null ? (state.traced ? 1 : 0) : progress
    const samples = Array.from({ length: Math.round(end * 120) + 1 }, (_, index) => DET_LIMITS.min + (index / 120) * (DET_LIMITS.max - DET_LIMITS.min))
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={detSliderChallenges} extraChallenges={detSliderExtra} state={state}>
            <Board height={288} label={l(say(`${DET_NAMES[state.family]} familia, k = ${state.k}: matrizea eta |A| kurba`, `Familia ${DET_NAMES[state.family]}, k = ${state.k}: la matriz y la curva de |A|`, `العائلة ${DET_NAMES[state.family]}، k = ${state.k}: المصفوفة ومنحنى |A|`, `Family ${DET_NAMES[state.family]}, k = ${state.k}: the matrix and the curve of |A|`))}>
                <text x={14} y={66} fontSize={16} fontWeight={700} fill={STAGE} direction="ltr">A =</text>
                <MatrixBlock x={50} y={14} cells={rows.map((row) => row.map(minus))} cell={38} rowGap={30} size={15} bracket={10} color={(r, c) => (family.rows(0)[r][c] !== family.rows(1)[r][c] ? SECOND : undefined)} />
                <text x={250} y={58} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK} direction="ltr">|A| =</text>
                {shown
                    ? <text x={250} y={86} textAnchor="middle" fontSize={22} fontWeight={700} fill={value === 0 ? SECOND : GREEN} direction="ltr">{minus(value)}</text>
                    : <Hidden x={250} y={90} />}
                <line x1={plotX(DET_LIMITS.min) - 10} x2={plotX(DET_LIMITS.max) + 14} y1={baseline} y2={baseline} stroke={INK} strokeWidth={1.4} />
                <text x={plotX(DET_LIMITS.max) + 20} y={baseline + 5} fontSize={14} fontStyle="italic" fill={MUTED} direction="ltr">k</text>
                <text x={6} y={baseline - 8} fontSize={12} fill={MUTED} direction="ltr">|A|</text>
                {samples.length > 1 && <polyline points={samples.map((k) => `${plotX(k)},${plotY(detCurve(state.family, k))}`).join(' ')} fill="none" stroke={STAGE} strokeWidth={2.4} strokeLinejoin="round" />}
                {detValues.map((k) => {
                    const seen = state.seen.includes(k)
                    const y = seen ? plotY(currentDetValue({ family: state.family, k })) : baseline
                    const root = seen && currentDetValue({ family: state.family, k }) === 0
                    return (
                        <g key={k}>
                            <line x1={plotX(k)} x2={plotX(k)} y1={baseline - 4} y2={baseline + 4} stroke={MUTED} strokeWidth={1} />
                            <text x={plotX(k)} y={baseline + 20} textAnchor="middle" fontSize={12} fill={k === state.k ? INK : MUTED} fontWeight={k === state.k ? 700 : 400} direction="ltr">{minus(k)}</text>
                            {seen && <circle cx={plotX(k)} cy={y} r={root ? 6.5 : 4.5} fill={root ? SECOND : PAPER} stroke={root ? SECOND : STAGE} strokeWidth={2} />}
                        </g>
                    )
                })}
                <line x1={plotX(state.k)} x2={plotX(state.k)} y1={baseline - 70} y2={baseline + 8} stroke={INK} strokeWidth={1.2} strokeDasharray="4 4" opacity={0.6} />
                <Label x={180} y={280} textAnchor="middle" fontSize={13} fill={MUTED}>{l(say('Puntu gorriak: alderantzizkorik gabeko k balioak', 'Puntos rojos: las k sin inversa', 'النقاط الحمراء: قيم k دون معكوس', 'Red dots: the k with no inverse'))}</Label>
            </Board>
            <PlayButton label={l(say('Marraztu kurba osoa', 'Dibuja la curva entera', 'ارسم المنحنى كله', 'Draw the whole curve'))} disabled={false} playing={playing} onPlay={() => { play(); setState((current) => traceAll(current)) }} />
        </ToolFrame>
    )
}
