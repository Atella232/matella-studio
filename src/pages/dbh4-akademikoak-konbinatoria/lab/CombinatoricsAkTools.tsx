import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { LocalizedText } from '../../../features/unit-v2/types'
import { COLORS, INK, LINE, MUTED, PAPER, SECOND, STAGE, STAGE_TINT } from '../../dbh2-estatistika-v2/palette'
import { thousandsSeparatorFor } from '../../../utils/numberFormat'
import {
    BRANCHES_MAX,
    choose,
    chooseChallenges,
    COPIES_MAX,
    ELEMENTS_MAX,
    FACTORIAL_MAX,
    factorial,
    factorialChallenges,
    factorialQuotient,
    GRID_HEIGHT_MAX,
    GRID_WIDTH_MAX,
    gridChallenges,
    gridPaths,
    initialChooseState,
    initialFactorialState,
    initialGridState,
    initialLettersState,
    initialPascalState,
    initialSlotsState,
    initialTreeState,
    LETTERS,
    lettersChallenges,
    lettersOrders,
    lettersTotal,
    PASCAL_ROWS_MAX,
    pascalChallenges,
    POINTS_MAX,
    POINTS_MIN,
    remainingFactors,
    setChoose,
    setFactorial,
    setGrid,
    setLetters,
    setPascal,
    setSlots,
    setTree,
    slotOptions,
    slotsChallenges,
    slotsCount,
    SLOTS_MAX,
    TREE_LEVELS_MAX,
    treeChallenges,
    treeLeaves,
    type ChooseState,
    type FactorialState,
    type GridState,
    type LettersState,
    type PascalState,
    type SlotsState,
    type TreeState
} from './labTools'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
/** Thousands grouped with a thin space in LaTeX */
const big = (value: number) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '\\,')
/** The same in SVG text. Only English changes: the other languages keep the narrow space that the typed answers use (rule 3 deviation) */
const bigText = (value: number, language: string) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, language === 'en' ? thousandsSeparatorFor(language) : '\u202f')

function Board({ height, label, children }: { height: number; label: string; children: ReactNode }) {
    return <svg viewBox={`0 0 640 ${height}`} direction="ltr" role="img" aria-label={label} style={{ width: '100%', height: 'auto', fontFamily: '"Atkinson Hyperlegible", "Noto Sans Arabic", system-ui, sans-serif' }}>{children}</svg>
}

function Readout({ latex, note }: { latex: string; note: string }) {
    return (
        <>
            {/* Each \quad part is its own formula, so a long readout wraps instead of scrolling */}
            <span className="fraction-v2-lab-readout-main"><MathText text={latex.split(/\\qquad|\\quad/).map((part) => `$${part.trim()}$`).join(' ')} /></span>
            <span className="fraction-v2-lab-readout-note">{note}</span>
        </>
    )
}

function Text({ x, y, children, color = INK, size = 22, anchor = 'middle', weight = 700 }: { x: number; y: number; children: ReactNode; color?: string; size?: number; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color}>{children}</text>
}

function Tile({ x, y, width, height, fill = PAPER, stroke = INK, children, size = 22, color = INK }: { x: number; y: number; width: number; height: number; fill?: string; stroke?: string; children: ReactNode; size?: number; color?: string }) {
    return (
        <g>
            <rect x={x - width / 2} y={y - height / 2} width={width} height={height} rx={8} fill={fill} stroke={stroke} strokeWidth={2} />
            <Text x={x} y={y + size * 0.36} size={size} color={color}>{children}</Text>
        </g>
    )
}

/* ---------- 1. The tree ---------- */

export function TreeTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TreeState>(initialTreeState)
    const leaves = treeLeaves(state)
    const levelX = [40, 210, 380, 550]
    const leafY = (index: number) => 20 + (index + 0.5) * (280 / leaves)
    /** y of node i at a level: the middle of the leaves below it */
    const nodeY = (level: number, index: number) => {
        const below = state.branches.slice(level, state.levels).reduce((product, value) => product * value, 1)
        return (leafY(index * below) + leafY(index * below + below - 1)) / 2
    }
    const lines: ReactNode[] = []
    const nodes: ReactNode[] = []
    let count = 1
    for (let level = 1; level <= state.levels; level += 1) {
        count *= state.branches[level - 1]
        for (let index = 0; index < count; index += 1) {
            const parent = Math.floor(index / state.branches[level - 1])
            const y = nodeY(level, index)
            lines.push(<line key={`l${level}-${index}`} x1={levelX[level - 1]} y1={nodeY(level - 1, parent)} x2={levelX[level]} y2={y} stroke={INK} strokeWidth={count > 24 ? 1 : 1.6} />)
            nodes.push(<circle key={`n${level}-${index}`} cx={levelX[level]} cy={y} r={count > 24 ? 3 : 7} fill={COLORS[(index % state.branches[level - 1]) % COLORS.length]} stroke={INK} strokeWidth={1} />)
        }
    }
    const controls = (
        <>
            <Stepper label={l(say('Mailak', 'Niveles', 'المستويات', 'Levels'))} value={state.levels} min={1} max={TREE_LEVELS_MAX} onChange={(levels) => setState((s) => setTree(s, { levels }))} language={props.language} />
            {[0, 1, 2].slice(0, state.levels).map((index) => (
                <Stepper key={index} label={l(say(`${index + 1}. mailako adarrak`, `Ramas del nivel ${index + 1}`, `فروع المستوى ${index + 1}`, `Branches at level ${index + 1}`))} value={state.branches[index]} min={1} max={BRANCHES_MAX} onChange={(branches) => setState((s) => setTree(s, { index, branches }))} language={props.language} />
            ))}
        </>
    )
    const latex = `${state.branches.slice(0, state.levels).join('\\cdot ')}=${leaves}`
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={l(say(`${leaves} amaiera: emaitza bakoitzeko bat`, `${leaves} extremos: uno por resultado`, `${leaves} نهاية: واحدة لكل نتيجة`, `${leaves} endpoints: one per outcome`))} />} challenges={treeChallenges} state={state}>
            <Board height={310} label={l(say('Zuhaitz-diagrama', 'Diagrama de árbol', 'المخطط الشجري', 'Tree diagram'))}>
                {lines}
                <circle cx={levelX[0]} cy={nodeY(0, 0)} r={8} fill={INK} />
                {nodes}
                <Text x={630} y={300} anchor="end" size={26} color={SECOND}>{leaves}</Text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 2. A quotient of factorials ---------- */

export function FactorialTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<FactorialState>(initialFactorialState)
    const x = (value: number) => 610 - (value - 1) * 47
    const common = Math.min(state.top, state.bottom)
    const quotient = factorialQuotient(state)
    const row = (count: number, y: number) => Array.from({ length: count }, (_, index) => {
        const value = count - index
        const crossed = value <= common
        return (
            <g key={value}>
                <Tile x={x(value)} y={y} width={40} height={40} size={20} fill={crossed ? PAPER : STAGE_TINT} stroke={crossed ? LINE : STAGE} color={crossed ? MUTED : INK}>{value}</Tile>
                {crossed && <line x1={x(value) - 18} x2={x(value) + 18} y1={y + 18} y2={y - 18} stroke={SECOND} strokeWidth={2.4} />}
            </g>
        )
    })
    const controls = (
        <>
            <Stepper label="a" value={state.top} min={0} max={FACTORIAL_MAX} onChange={(top) => setState((s) => setFactorial(s, { top }))} language={props.language} />
            <Stepper label="b" value={state.bottom} min={0} max={FACTORIAL_MAX} onChange={(bottom) => setState((s) => setFactorial(s, { bottom }))} language={props.language} />
        </>
    )
    const remaining = state.top >= state.bottom ? remainingFactors(state) : remainingFactors({ top: state.bottom, bottom: state.top })
    // Long products are shortened: 12 · 11 ⋯ 3
    const product = remaining.length === 0 ? '1' : remaining.length > 4 ? `${remaining[0]}\\cdot ${remaining[1]}\\cdots ${remaining[remaining.length - 1]}` : remaining.join('\\cdot ')
    const latex = state.top >= state.bottom
        ? `\\frac{${state.top}!}{${state.bottom}!}=${big(quotient.numerator)}\\quad ${product}`
        : `\\frac{${state.top}!}{${state.bottom}!}=\\frac{1}{${product}}`
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={l(say(`${remaining.length} faktore geratzen dira`, `Quedan ${remaining.length} factores`, `يبقى ${remaining.length} عوامل`, `${remaining.length} factors left`))} />} challenges={factorialChallenges} state={state}>
            <Board height={230} label={l(say('Faktorialen zatiketa', 'Cociente de factoriales', 'قسمة المضاريب', 'Quotient of factorials'))}>
                {row(state.top, 50)}
                <line x1={20} x2={630} y1={100} y2={100} stroke={INK} strokeWidth={2.4} />
                {row(state.bottom, 150)}
                <Text x={320} y={216} size={26} color={SECOND}>{state.top >= state.bottom ? bigText(quotient.numerator, props.language) : `1 / ${bigText(quotient.denominator, props.language)}`}</Text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 3. Slots ---------- */

export function SlotsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SlotsState>(initialSlotsState)
    const options = slotOptions(state)
    const total = slotsCount(state)
    const left = 320 - ((state.slots - 1) * 100) / 2
    const controls = (
        <>
            <Stepper label={l(say('Elementuak (n)', 'Elementos (n)', 'العناصر (n)', 'Elements (n)'))} value={state.elements} min={1} max={ELEMENTS_MAX} onChange={(elements) => setState((s) => setSlots(s, { elements }))} language={props.language} />
            <Stepper label={l(say('Laukiak (k)', 'Casillas (k)', 'الخانات (k)', 'Slots (k)'))} value={state.slots} min={1} max={SLOTS_MAX} onChange={(slots) => setState((s) => setSlots(s, { slots }))} language={props.language} />
            <Segmented
                label={l(say('Errepikatu?', '¿Repetir?', 'تكرار؟', 'Repeats allowed?'))}
                value={state.repeat ? 'yes' : 'no'}
                options={[{ value: 'no', label: l(say('Ez', 'No', 'لا', 'No')) }, { value: 'yes', label: l(say('Bai', 'Sí', 'نعم', 'Yes')) }]}
                onChange={(value) => setState((s) => setSlots(s, { repeat: value === 'yes' }))}
            />
        </>
    )
    const latex = state.repeat
        ? `\\text{VR}_{${state.elements},${state.slots}}=${state.elements}^{${state.slots}}=${big(total)}`
        : `\\text{V}_{${state.elements},${state.slots}}=${big(total)}\\quad ${options.join('\\cdot ')}`
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={l(state.repeat ? say('Lauki bakoitzean n aukera', 'En cada casilla, n opciones', 'في كل خانة n خيارًا', 'In each slot, n options') : say('Lauki bakoitzean, aurrekoan baino bat gutxiago', 'En cada casilla, una menos que en la anterior', 'في كل خانة خيار أقل من السابقة', 'In each slot, one fewer than in the previous one'))} />} challenges={slotsChallenges} state={state}>
            <Board height={230} label={l(say('Laukiak eta haien aukerak', 'Las casillas y sus opciones', 'الخانات وخياراتها', 'The slots and their options'))}>
                {options.map((value, index) => (
                    <g key={index}>
                        <rect x={left + index * 100 - 40} y={30} width={80} height={96} rx={14} fill={value === 0 ? '#f6d5cc' : STAGE_TINT} stroke={value === 0 ? SECOND : STAGE} strokeWidth={2.4} />
                        <Text x={left + index * 100} y={92} size={36} color={value === 0 ? SECOND : STAGE}>{value}</Text>
                        {index < options.length - 1 && <Text x={left + index * 100 + 50} y={88} size={28}>·</Text>}
                    </g>
                ))}
                <Text x={320} y={192} size={32} color={SECOND}>{`= ${bigText(total, props.language)}`}</Text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 4. Orders of letters ---------- */

export function LettersTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<LettersState>(initialLettersState)
    const total = lettersTotal(state)
    const orders = lettersOrders(state)
    const tiles = state.counts.flatMap((count, index) => Array.from({ length: count }, () => index))
    const step = Math.min(70, 600 / Math.max(1, tiles.length))
    const left = 320 - ((tiles.length - 1) * step) / 2
    const controls = (
        <>
            {LETTERS.map((letter, index) => (
                <Stepper key={letter} label={letter} value={state.counts[index]} min={0} max={COPIES_MAX} onChange={(count) => setState((s) => setLetters(s, index, count))} language={props.language} />
            ))}
        </>
    )
    const repeated = state.counts.filter((value) => value > 1)
    const latex = total === 0 ? '0' : repeated.length === 0 ? `${total}!=${big(orders)}` : `\\frac{${total}!}{${repeated.map((value) => `${value}!`).join('\\cdot ')}}=${big(orders)}`
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={l(say(`${total} letra`, `${total} letras`, `${total} أحرف`, `${total} letters`))} />} challenges={lettersChallenges} state={state}>
            <Board height={200} label={l(say('Letrak', 'Las letras', 'الأحرف', 'The letters'))}>
                {tiles.map((letter, index) => (
                    <Tile key={index} x={left + index * step} y={70} width={Math.min(56, step - 6)} height={60} size={28} fill={`${COLORS[letter]}33`} stroke={COLORS[letter]}>{LETTERS[letter]}</Tile>
                ))}
                <Text x={320} y={170} size={30} color={SECOND}>{total === 0 ? '—' : `${bigText(orders, props.language)}`}</Text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 5. Choose k of n ---------- */

export function ChooseTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ChooseState>(initialChooseState)
    const points = Array.from({ length: state.n }, (_, index) => {
        const angle = -Math.PI / 2 + (index * 2 * Math.PI) / state.n
        return [170 + 110 * Math.cos(angle), 140 + 110 * Math.sin(angle)]
    })
    const variations = factorial(state.n) / factorial(state.n - state.k)
    const groups = choose(state.n, state.k)
    const controls = (
        <>
            <Stepper label="n" value={state.n} min={POINTS_MIN} max={POINTS_MAX} onChange={(n) => setState((s) => setChoose(s, { n }))} language={props.language} />
            <Stepper label="k" value={state.k} min={0} max={state.n} onChange={(k) => setState((s) => setChoose(s, { k }))} language={props.language} />
        </>
    )
    const latex = `\\text{C}_{${state.n},${state.k}}=\\frac{${big(variations)}}{${state.k}!}=${big(groups)}`
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={l(say(`Aldakuntzak: ${variations} · ordena bakoitzeko talde bat: ${state.k}! = ${factorial(state.k)}`, `Variaciones: ${variations} · órdenes de cada grupo: ${state.k}! = ${factorial(state.k)}`, `التراتيب: ${variations} · ترتيبات كل مجموعة: ${state.k}! = ${factorial(state.k)}`, `Arrangements: ${variations} · orderings of each group: ${state.k}! = ${factorial(state.k)}`))} />} challenges={chooseChallenges} state={state}>
            <Board height={290} label={l(say('n puntu eta haietatik k', 'n puntos y k de ellos', 'n نقطة وk منها', 'n points, and k of them'))}>
                {state.k === 2 && <line x1={points[0][0]} y1={points[0][1]} x2={points[1][0]} y2={points[1][1]} stroke={SECOND} strokeWidth={3} />}
                {points.map(([cx, cy], index) => (
                    <g key={index}>
                        <circle cx={cx} cy={cy} r={20} fill={index < state.k ? STAGE : PAPER} fillOpacity={index < state.k ? 0.35 : 1} stroke={index < state.k ? STAGE : INK} strokeWidth={2} />
                        <Text x={cx} y={cy + 7} size={18}>{String.fromCharCode(65 + index)}</Text>
                    </g>
                ))}
                <Text x={480} y={110} size={24} color={MUTED}>{`V = ${bigText(variations, props.language)}`}</Text>
                <Text x={480} y={150} size={24} color={MUTED}>{`${state.k}! = ${factorial(state.k)}`}</Text>
                <Text x={480} y={206} size={34} color={SECOND}>{`C = ${bigText(groups, props.language)}`}</Text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 6. The triangle of Tartaglia ---------- */

export function PascalTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<PascalState>(initialPascalState)
    const rows = state.row + 1
    const width = Math.min(60, 620 / rows)
    const height = 26
    const size = rows > 10 ? 15 : rows > 7 ? 17 : 20
    const parent = (n: number, k: number) => state.row > 0 && n === state.row - 1 && (k === state.place - 1 || k === state.place)
    const controls = (
        <>
            <Stepper label={l(say('Lerroa (n)', 'Fila (n)', 'الصف (n)', 'Row (n)'))} value={state.row} min={0} max={PASCAL_ROWS_MAX} onChange={(row) => setState((s) => setPascal(s, { row }))} language={props.language} />
            <Stepper label={l(say('Lekua (k)', 'Lugar (k)', 'الموضع (k)', 'Position (k)'))} value={state.place} min={0} max={state.row} onChange={(place) => setState((s) => setPascal(s, { place }))} language={props.language} />
        </>
    )
    const value = choose(state.row, state.place)
    const latex = state.row > 0 && state.place > 0 && state.place < state.row
        ? `\\binom{${state.row}}{${state.place}}=${choose(state.row - 1, state.place - 1)}+${choose(state.row - 1, state.place)}=${value}\\quad 2^{${state.row}}=${big(2 ** state.row)}`
        : `\\binom{${state.row}}{${state.place}}=${value}\\quad 2^{${state.row}}=${big(2 ** state.row)}`
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={l(say(`${state.row}. lerroaren batura: ${2 ** state.row}`, `La fila ${state.row} suma ${2 ** state.row}`, `مجموع الصف ${state.row}: ${2 ** state.row}`, `Row ${state.row} sums to ${2 ** state.row}`))} />} challenges={pascalChallenges} state={state}>
            <Board height={rows * (height + 4) + 24} label={l(say('Tartagliaren triangelua', 'El triángulo de Tartaglia', 'مثلث تارتاليا', 'Tartaglia\'s triangle'))}>
                {Array.from({ length: rows }, (_, n) => Array.from({ length: n + 1 }, (_, k) => {
                    const chosen = n === state.row && k === state.place
                    const above = parent(n, k)
                    return (
                        <Tile key={`${n}-${k}`} x={320 + (k - n / 2) * width} y={20 + n * (height + 4)} width={width - 4} height={height} size={size} fill={chosen ? '#f6d5cc' : above ? STAGE_TINT : PAPER} stroke={chosen ? SECOND : above ? STAGE : LINE}>{choose(n, k)}</Tile>
                    )
                }))}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 7. Paths on a grid ---------- */

export function GridTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<GridState>(initialGridState)
    const cell = Math.min(72, 520 / state.width, 220 / state.height)
    const x0 = 320 - (state.width * cell) / 2
    const y0 = 40 + state.height * cell
    const x = (c: number) => x0 + c * cell
    const y = (r: number) => y0 - r * cell
    // A sample path: spread the steps up as evenly as possible
    const path: Array<[number, number]> = [[0, 0]]
    let c = 0
    let r = 0
    for (let step = 0; step < state.width + state.height; step += 1) {
        const upNext = r < state.height && (c === state.width || (r + 1) * state.width <= (c + 1) * state.height)
        if (upNext) r += 1
        else c += 1
        path.push([c, r])
    }
    const paths = gridPaths(state)
    const controls = (
        <>
            <Stepper label={l(say('Eskuinera (w)', 'A la derecha (w)', 'يمينًا (w)', 'To the right (w)'))} value={state.width} min={1} max={GRID_WIDTH_MAX} onChange={(width) => setState((s) => setGrid(s, { width }))} language={props.language} />
            <Stepper label={l(say('Gora (h)', 'Hacia arriba (h)', 'أعلى (h)', 'Up (h)'))} value={state.height} min={1} max={GRID_HEIGHT_MAX} onChange={(height) => setState((s) => setGrid(s, { height }))} language={props.language} />
        </>
    )
    const latex = `\\binom{${state.width + state.height}}{${state.height}}=${big(paths)}`
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={l(say(`${state.width + state.height} urrats, horietatik ${state.height} gora`, `${state.width + state.height} pasos, ${state.height} de ellos hacia arriba`, `${state.width + state.height} خطوات، ${state.height} منها إلى الأعلى`, `${state.width + state.height} steps, ${state.height} of them up`))} />} challenges={gridChallenges} state={state}>
            <Board height={y0 + 50} label={l(say('Sareko bide bat', 'Un camino en la cuadrícula', 'مسار في الشبكة', 'A path on the grid'))}>
                {Array.from({ length: state.width + 1 }, (_, i) => <line key={`v${i}`} x1={x(i)} x2={x(i)} y1={y(0)} y2={y(state.height)} stroke={LINE} strokeWidth={2} />)}
                {Array.from({ length: state.height + 1 }, (_, i) => <line key={`h${i}`} x1={x(0)} x2={x(state.width)} y1={y(i)} y2={y(i)} stroke={LINE} strokeWidth={2} />)}
                <polyline points={path.map(([pc, pr]) => `${x(pc)},${y(pr)}`).join(' ')} fill="none" stroke={SECOND} strokeWidth={4} strokeLinejoin="round" />
                <circle cx={x(0)} cy={y(0)} r={9} fill={STAGE} />
                <circle cx={x(state.width)} cy={y(state.height)} r={9} fill={SECOND} />
                <Text x={x(0)} y={y(0) + 34} color={STAGE}>A</Text>
                <Text x={x(state.width)} y={y(state.height) - 16} color={SECOND}>B</Text>
                <Text x={630} y={y0 + 40} anchor="end" size={26} color={SECOND}>{bigText(paths, props.language)}</Text>
            </Board>
        </ToolFrame>
    )
}
