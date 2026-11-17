import { useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { LocalizedText } from '../../../features/unit-v2/types'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import { Board, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { GREEN, GREEN_TINT, INK, MUSTARD_TINT, MUTED, PAPER, say, SECOND, SECOND_TINT, STAGE, STAGE_TINT } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { MatrixBlock } from '../../batx2-zientziak-matrizeak/MatrixSvg'
import {
    canChain, chainChallenges, chainExtra, chainPrediction, chainTerms, CHAIN_SCENARIOS, choosePart, chooseCustomer, initialChainState, loadChain, needs, ORDER_LIMITS, RECIPE_LIMITS,
    setChainOrder, setOrderAmount, setRecipe, type ChainOrder, type ChainState
} from './chain'
import {
    canMultiply, chooseShop, factors, initialTicketState, loadScenario, prices, result, setLayout, setMeasure, setOrder, setQuantity, setShape, shopTotals, sizeOf, ticketChallenges,
    ticketExtra, ticketPrediction, TICKET_LIMITS, TICKET_SCENARIOS, type Layout, type Measure, type Order, type PriceShape, type TicketState
} from './ticket'

/* ==========================================================================
   Matrizeak · Batxilergoa 2 · Gizarte Zientziak — the two tools of this
   unit: the ticket (build Q and P from a table, choose the order, see
   what each shop takes in, spends or makes) and the production chain
   (customers → products → parts, AB and why not BA). Each asks for a
   prediction before it shows the result. Logic in ticket.ts and chain.ts.
   ========================================================================== */

const minus = (value: number) => (value < 0 ? `−${-value}` : String(value))
const bracket = (value: number) => (value < 0 ? `(${value})` : String(value))
const cellOf = (rows: number) => (rows === 3 ? 22 : 26)

/** A matrix of the board with its name above and its size below; returns its width */
function Factor({ x, name, cells, tint, color }: { x: number; name: string; cells: string[][]; tint?: (r: number, c: number) => string | undefined; color?: (r: number, c: number) => string | undefined }) {
    const rows = cells.length
    const gap = cellOf(rows)
    const top = 150 + (66 - rows * gap) / 2
    const width = cells[0].length * 32 + 16
    return (
        <g>
            <text x={x + width / 2} y={142 - (rows === 1 ? -14 : rows === 2 ? -6 : 0)} textAnchor="middle" fontSize={14} fontWeight={700} fill={STAGE} direction="ltr">{name}</text>
            <MatrixBlock x={x} y={top + 6} cells={cells} cell={32} rowGap={gap} size={15} bracket={8} tint={tint} color={color} />
            <text x={x + width / 2} y={236} textAnchor="middle" fontSize={12} fill={MUTED} direction="ltr">{`${rows} × ${cells[0].length}`}</text>
        </g>
    )
}

/* ---------- L1. The ticket ---------- */

const MEASURES: Record<Measure, LocalizedText> = {
    income: say('Diru-sarrera', 'Ingreso', 'الإيراد', 'Income'),
    cost: say('Kostua', 'Coste', 'الكلفة', 'Cost'),
    profit: say('Irabazia', 'Beneficio', 'الربح', 'Profit')
}

function ticketNote(measure: Measure, first: number, second: number): LocalizedText {
    const verbs: Record<Measure, LocalizedText> = {
        income: say('jasotzen ditu', 'ingresa', 'إيراد', 'takes in'),
        cost: say('gastatzen ditu', 'gasta', 'كلفة', 'spends'),
        profit: say('irabazten ditu', 'gana', 'ربح', 'makes')
    }
    const v = verbs[measure]
    return say(
        `1. dendak ${first} euro ${v.eu}, eta 2. dendak ${second} euro.`,
        `La tienda 1 ${v.es} ${first} € y la tienda 2, ${second} €.`,
        `${v.ar} المتجر 1 هو ${first} € و${v.ar} المتجر 2 هو ${second} €.`,
        `Shop 1 ${v.en} €${first}; shop 2: €${second}.`
    )
}

export function TicketTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TicketState>(initialTicketState)
    const scenario = TICKET_SCENARIOS[state.scenario]
    const product = result(state)
    const possible = canMultiply(state)
    const shown = possible && state.prediction !== null
    const totals = shopTotals(state)
    const unitPrices = prices(state)
    const [left, right] = factors(state)
    const qName = state.layout === 'shops' ? 'Q' : 'Qᵗ'
    const pName = state.shape === 'column' ? 'P' : 'Pᵗ'
    const names = state.order === 'QP' ? [qName, pName] : [pName, qName]
    const isQ = (index: number) => (state.order === 'QP' ? index === 0 : index === 1)
    const controls = (
        <>
            <Segmented<string> label={l(say('Taula', 'Tabla', 'الجدول', 'Table'))} value={String(state.scenario)} options={TICKET_SCENARIOS.map((item, index) => ({ value: String(index), label: l(item.name) }))} onChange={(next) => setState(loadScenario(Number(next)))} />
            <Segmented<Layout> label={l(say('Kopuruak (Q)', 'Cantidades (Q)', 'الكميات (Q)', 'Quantities (Q)'))} value={state.layout} options={[{ value: 'shops', label: l(say('Dendak errenkadetan', 'Tiendas en filas', 'المتاجر في الصفوف', 'Shops in rows')) }, { value: 'products', label: l(say('Dendak zutabeetan', 'Tiendas en columnas', 'المتاجر في الأعمدة', 'Shops in columns')) }]} onChange={(next) => setState((s) => setLayout(s, next))} />
            <Segmented<PriceShape> label={l(say('Prezioak (P)', 'Precios (P)', 'الأسعار (P)', 'Prices (P)'))} value={state.shape} options={[{ value: 'column', label: l(say('Zutabea', 'Columna', 'عمود', 'Column')) }, { value: 'row', label: l(say('Errenkada', 'Fila', 'صف', 'Row')) }]} onChange={(next) => setState((s) => setShape(s, next))} />
            <Segmented<Order> label={l(say('Ordena', 'Orden', 'الترتيب', 'Order'))} value={state.order} options={[{ value: 'QP', label: l(say('Kopuruak lehenik', 'Cantidades primero', 'الكميات أولًا', 'Quantities first')) }, { value: 'PQ', label: l(say('Prezioak lehenik', 'Precios primero', 'الأسعار أولًا', 'Prices first')) }]} onChange={(next) => setState((s) => setOrder(s, next))} />
            <Segmented<Measure> label={l(say('Unitateko prezioa', 'Precio por unidad', 'سعر الوحدة', 'Price per unit'))} value={state.measure} options={(['income', 'cost', 'profit'] as const).map((measure) => ({ value: measure, label: l(MEASURES[measure]) }))} onChange={(next) => setState((s) => setMeasure(s, next))} />
            <Segmented<string> label={l(say('Denda', 'Tienda', 'المتجر', 'Shop'))} value={String(state.shop)} options={[{ value: '0', label: '1' }, { value: '1', label: '2' }]} onChange={(next) => setState((s) => chooseShop(s, Number(next)))} />
            {scenario.products.map((name, index) => (
                <Stepper key={index} label={l(name)} value={state.q[state.shop][index]} min={TICKET_LIMITS.min} max={TICKET_LIMITS.max} onChange={(next) => setState((s) => setQuantity(s, index, next))} language={props.language} />
            ))}
        </>
    )
    const [a, b] = [sizeOf(left), sizeOf(right)]
    const readout = !possible ? (
        <Readout
            latex={`(${a[0]}\\times ${a[1]})(${b[0]}\\times ${b[1]})`}
            note={l(say(
                `Ezin da biderkatu: lehen matrizeak ${a[1]} zutabe ditu, eta bigarrenak ${b[0]} errenkada. Aldatu matrize baten forma edo ordena.`,
                `No se puede multiplicar: la primera matriz tiene ${a[1]} columnas y la segunda, ${b[0]} filas. Cambia la forma de una matriz o el orden.`,
                `لا يمكن الضرب: للمصفوفة الأولى ${a[1]} أعمدة وللثانية ${b[0]} صفوف. غيّر شكل إحدى المصفوفتين أو الترتيب.`,
                `It cannot be multiplied: the first matrix has ${a[1]} columns and the second ${b[0]} rows. Change the shape of a matrix or the order.`
            ))}
        />
    ) : (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: zein dendak du gehiago?', 'Antes de verlo: ¿qué tienda tiene más?', 'قبل أن ترى: أي متجر له أكثر؟', 'Before you see it: which shop has more?')}
            labels={{ '<': say('2. dendak', 'La tienda 2', 'المتجر 2', 'Shop 2'), '=': say('Berdin', 'Igual', 'متساويان', 'The same'), '>': say('1. dendak', 'La tienda 1', 'المتجر 1', 'Shop 1') }}
            actual={ticketPrediction(state)}
            choice={state.prediction}
            tip={say('Konparatu denda bakoitzaren kopuruak, prezio handienekin batez ere.', 'Compara las cantidades de cada tienda, sobre todo las de los precios más altos.', 'قارن كميات كل متجر، ولا سيما ذات الأسعار الأعلى.', 'Compare the quantities of each shop, above all those with the highest prices.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={state.q.map((row, shop) => `${row.map((value, k) => `${value}\\cdot ${bracket(unitPrices[k])}`).join('+')}=${totals[shop]}`)}
                note={l(ticketNote(state.measure, totals[0], totals[1]))}
            />
        </Predict>
    )
    const quantityCells = (matrix: number[][]) => matrix.map((row) => row.map(String))
    const priceCells = (matrix: number[][]) => matrix.map((row) => row.map(minus))
    const leftCells = isQ(0) ? quantityCells(left) : priceCells(left)
    const rightCells = isQ(1) ? quantityCells(right) : priceCells(right)
    const leftWidth = leftCells[0].length * 32 + 16
    const rightWidth = rightCells[0].length * 32 + 16
    const resultCells = product ? product.map((row) => row.map((value) => (shown ? minus(value) : '?'))) : null
    const resultWidth = resultCells ? resultCells[0].length * 44 + 16 : 30
    const total = leftWidth + 8 + rightWidth + 30 + resultWidth
    const start = Math.max(4, (360 - total) / 2)
    const tableLeft = 104
    const columnWidth = 82
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={ticketChallenges} extraChallenges={ticketExtra} state={state}>
            <Board height={250} label={l(say(`${scenario.name.eu}: kopuruen eta prezioen taula, eta ${names.join(' · ')} biderkadura`, `${scenario.name.es}: la tabla de cantidades y precios, y el producto ${names.join(' · ')}`, `${scenario.name.ar}: جدول الكميات والأسعار والجداء ${names.join(' · ')}`, `${scenario.name.en}: the table of quantities and prices, and the product ${names.join(' · ')}`))}>
                {scenario.products.map((name, k) => (
                    <Label key={k} x={tableLeft + k * columnWidth + columnWidth / 2} y={18} textAnchor="middle" fontSize={13} fill={MUTED}>{l(name)}</Label>
                ))}
                {[0, 1].map((shop) => (
                    <g key={shop}>
                        <Label x={tableLeft - 8} y={42 + shop * 24} textAnchor="end" fontSize={13} fill={STAGE}>{l(say(`${shop + 1}. denda`, `Tienda ${shop + 1}`, `المتجر ${shop + 1}`, `Shop ${shop + 1}`))}</Label>
                        {state.q[shop].map((value, k) => (
                            <g key={k}>
                                <rect x={tableLeft + k * columnWidth} y={26 + shop * 24} width={columnWidth} height={24} fill={shop === state.shop ? STAGE_TINT : PAPER} stroke={INK} strokeWidth={1} />
                                <text x={tableLeft + k * columnWidth + columnWidth / 2} y={43 + shop * 24} textAnchor="middle" fontSize={14} fontWeight={700} fill={INK}>{value}</text>
                            </g>
                        ))}
                    </g>
                ))}
                <Label x={tableLeft - 8} y={96} textAnchor="end" fontSize={13} fill={SECOND}>{l(MEASURES[state.measure])}</Label>
                {unitPrices.map((value, k) => (
                    <g key={k}>
                        <rect x={tableLeft + k * columnWidth} y={80} width={columnWidth} height={24} fill={MUSTARD_TINT} stroke={INK} strokeWidth={1} />
                        <text x={tableLeft + k * columnWidth + columnWidth / 2} y={97} textAnchor="middle" fontSize={14} fontWeight={700} fill={INK} direction="ltr">{`${minus(value)} €`}</text>
                    </g>
                ))}
                <Factor x={start} name={names[0]} cells={leftCells} tint={() => (isQ(0) ? STAGE_TINT : MUSTARD_TINT)} />
                <text x={start + leftWidth + 4} y={190} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>·</text>
                <Factor x={start + leftWidth + 8} name={names[1]} cells={rightCells} tint={() => (isQ(1) ? STAGE_TINT : MUSTARD_TINT)} />
                <text x={start + leftWidth + 8 + rightWidth + 15} y={190} textAnchor="middle" fontSize={18} fontWeight={700} fill={possible ? INK : SECOND}>{possible ? '=' : '✗'}</text>
                {resultCells ? (
                    <g>
                        <MatrixBlock x={start + leftWidth + 8 + rightWidth + 30} y={156 + (66 - resultCells.length * 26) / 2} cells={resultCells} cell={44} rowGap={26} size={15} bracket={8} tint={() => (shown ? GREEN_TINT : SECOND_TINT)} color={() => (shown ? GREEN : SECOND)} />
                        <text x={start + leftWidth + 8 + rightWidth + 30 + resultWidth / 2} y={236} textAnchor="middle" fontSize={12} fill={MUTED} direction="ltr">{`${product!.length} × ${product![0].length}`}</text>
                    </g>
                ) : (
                    <text x={start + leftWidth + 8 + rightWidth + 34} y={194} fontSize={13} fontWeight={700} fill={SECOND} direction="ltr">{`${a[1]} ≠ ${b[0]}`}</text>
                )}
            </Board>
        </ToolFrame>
    )
}

/* ---------- L2. The production chain ---------- */

const NODE_X = [45, 180, 315]
/** Width of the boxes of each column: customers, products, parts */
const NODE_W = [86, 108, 86]
const nodeY = (index: number, count: number) => (count === 2 ? 34 + index * 58 : 20 + index * 44)

function Node({ x, y, width, text, active }: { x: number; y: number; width: number; text: string; active: boolean }) {
    return (
        <g>
            <rect x={x - width / 2} y={y - 15} width={width} height={30} rx={9} fill={active ? MUSTARD_TINT : PAPER} stroke={INK} strokeWidth={1.3} />
            <Label x={x} y={y + 5} textAnchor="middle" fontSize={12} fill={INK}>{text}</Label>
        </g>
    )
}

/** A line from a box of one column to a box of the next, with its number in the middle when it is shown */
function Link({ from, to, column, value, color }: { from: [number, number]; to: [number, number]; column: number; value?: number; color: string }) {
    const x1 = from[0] + NODE_W[column] / 2
    const x2 = to[0] - NODE_W[column + 1] / 2
    const mx = (x1 + x2) / 2
    const my = (from[1] + to[1]) / 2
    return (
        <g>
            <line x1={x1} y1={from[1]} x2={x2} y2={to[1]} stroke={color} strokeWidth={value === undefined ? 1.2 : 2} opacity={value === undefined ? 0.45 : 1} />
            {value !== undefined && (
                <g>
                    <circle cx={mx} cy={my} r={11} fill="white" stroke={color} strokeWidth={1.4} />
                    <text x={mx} y={my + 5} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>{value}</text>
                </g>
            )}
        </g>
    )
}

export function ChainTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ChainState>(initialChainState)
    const scenario = CHAIN_SCENARIOS[state.scenario]
    const possible = canChain(state)
    const shown = possible && state.prediction !== null
    const ab = needs(state)
    const controls = (
        <>
            <Segmented<string> label={l(say('Adibidea', 'Ejemplo', 'المثال', 'Example'))} value={String(state.scenario)} options={CHAIN_SCENARIOS.map((item, index) => ({ value: String(index), label: l(item.name) }))} onChange={(next) => setState(loadChain(Number(next)))} />
            <Segmented<ChainOrder> label={l(say('Ordena', 'Orden', 'الترتيب', 'Order'))} value={state.order} options={[{ value: 'AB', label: 'AB' }, { value: 'BA', label: 'BA' }]} onChange={(next) => setState((s) => setChainOrder(s, next))} />
            <Segmented<string> label={l(say('Bezeroa', 'Cliente', 'الزبون', 'Customer'))} value={String(state.customer)} options={scenario.customers.map((name, index) => ({ value: String(index), label: l(name) }))} onChange={(next) => setState((s) => chooseCustomer(s, Number(next)))} />
            {scenario.products.map((name, index) => (
                <Stepper key={`a${index}`} label={l(name)} value={state.a[state.customer][index]} min={ORDER_LIMITS.min} max={ORDER_LIMITS.max} onChange={(next) => setState((s) => setOrderAmount(s, index, next))} language={props.language} />
            ))}
            <Segmented<string> label={l(say('Pieza', 'Pieza', 'القطعة', 'Part'))} value={String(state.part)} options={scenario.parts.map((name, index) => ({ value: String(index), label: l(name) }))} onChange={(next) => setState((s) => choosePart(s, Number(next)))} />
            {scenario.products.map((name, index) => (
                <Stepper key={`b${index}`} label={`${l(name)} → ${l(scenario.parts[state.part])}`} value={state.b[index][state.part]} min={RECIPE_LIMITS.min} max={RECIPE_LIMITS.max} onChange={(next) => setState((s) => setRecipe(s, index, next))} language={props.language} />
            ))}
        </>
    )
    const part = l(scenario.parts[state.part])
    const readout = !possible ? (
        <Readout
            latex="(2\times 3)(2\times 2)"
            note={l(say(
                'BA ezin da egin: B matrizeak 3 zutabe ditu, eta A matrizeak 2 errenkada. Gainera, katea bezeroak → produktuak → piezak da: A lehenik.',
                'BA no se puede hacer: B tiene 3 columnas y A, 2 filas. Además, la cadena es clientes → productos → piezas: primero A.',
                'لا يمكن حساب BA: لـ B ثلاثة أعمدة ولـ A صفّان. ثم إن السلسلة هي الزبائن ← المنتجات ← القطع: A أولًا.',
                'BA cannot be done: B has 3 columns and A has 2 rows. Besides, the chain is customers → products → parts: A first.'
            ))}
        />
    ) : (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: nork behar ditu gehiago? (${part})`, `Antes de verlo: ¿quién necesita más ${part}?`, `قبل أن ترى: من يحتاج أكثر؟ (${part})`, `Before you see it: who needs more ${part}?`)}
            labels={{ '<': scenario.customers[1], '=': say('Berdin', 'Igual', 'متساويان', 'The same'), '>': scenario.customers[0] }}
            actual={chainPrediction(state)}
            choice={state.prediction}
            tip={say('Bide bakoitzak bi zenbaki ditu: eskaera bider errezeta. Batu bezero baten bideak.', 'Cada camino lleva dos números: el pedido por la receta. Suma los caminos de un cliente.', 'كل مسار فيه عددان: الطلب في الوصفة. اجمع مسارات الزبون.', 'Each path has two numbers: the order times the recipe. Add up the paths of a customer.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[0, 1].map((customer) => `${chainTerms(state, customer, state.part).map(([amount, each]) => `${amount}\\cdot ${each}`).join('+')}=${ab[customer][state.part]}`)}
                note={l(say(
                    `${scenario.customers[0].eu}: ${ab[0][state.part]}; ${scenario.customers[1].eu}: ${ab[1][state.part]} (${scenario.parts[state.part].eu}).`,
                    `${scenario.customers[0].es}: ${ab[0][state.part]}; ${scenario.customers[1].es.toLowerCase()}: ${ab[1][state.part]} (${scenario.parts[state.part].es}).`,
                    `${scenario.customers[0].ar}: ${ab[0][state.part]}؛ ${scenario.customers[1].ar}: ${ab[1][state.part]} (${scenario.parts[state.part].ar}).`,
                    `${scenario.customers[0].en}: ${ab[0][state.part]}; ${scenario.customers[1].en.toLowerCase()}: ${ab[1][state.part]} (${scenario.parts[state.part].en}).`
                ))}
            />
        </Predict>
    )
    const customerAt = (index: number): [number, number] => [NODE_X[0], nodeY(index, 2)]
    const productAt = (index: number): [number, number] => [NODE_X[1], nodeY(index, 2)]
    const partAt = (index: number): [number, number] => [NODE_X[2], nodeY(index, 3)]
    const aCells = state.a.map((row) => row.map(String))
    const bCells = state.b.map((row) => row.map(String))
    const abCells = ab.map((row) => row.map((value, k) => (k === state.part && !shown ? '?' : String(value))))
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={chainChallenges} extraChallenges={chainExtra} state={state}>
            <Board height={250} label={l(say(`${scenario.name.eu}: bezeroak → produktuak (A) → piezak (B), eta ${state.order} biderkadura`, `${scenario.name.es}: clientes → productos (A) → piezas (B), y el producto ${state.order}`, `${scenario.name.ar}: الزبائن ← المنتجات (A) ← القطع (B)، والجداء ${state.order}`, `${scenario.name.en}: customers → products (A) → parts (B), and the product ${state.order}`))}>
                {[0, 1].map((customer) => [0, 1].map((product) => (
                    customer === state.customer ? null : <Link key={`a${customer}${product}`} from={customerAt(customer)} to={productAt(product)} column={0} color={MUTED} />
                )))}
                {[0, 1].map((product) => (
                    <Link key={`c${product}`} from={customerAt(state.customer)} to={productAt(product)} column={0} value={state.a[state.customer][product]} color={STAGE} />
                ))}
                {[0, 1].map((product) => (
                    <Link key={`b${product}`} from={productAt(product)} to={partAt(state.part)} column={1} value={state.b[product][state.part]} color={SECOND} />
                ))}
                {scenario.customers.map((name, index) => <Node key={index} x={customerAt(index)[0]} y={customerAt(index)[1]} width={NODE_W[0]} text={l(name)} active={index === state.customer} />)}
                {scenario.products.map((name, index) => <Node key={index} x={productAt(index)[0]} y={productAt(index)[1]} width={NODE_W[1]} text={l(name)} active={false} />)}
                {scenario.parts.map((name, index) => <Node key={index} x={partAt(index)[0]} y={partAt(index)[1]} width={NODE_W[2]} text={l(name)} active={index === state.part} />)}
                {possible ? (
                    <g>
                        <Factor x={8} name="A" cells={aCells} tint={(r) => (r === state.customer ? STAGE_TINT : undefined)} />
                        <text x={88} y={190} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>·</text>
                        <Factor x={92} name="B" cells={bCells} tint={(_, c) => (c === state.part ? MUSTARD_TINT : undefined)} />
                        <text x={218} y={190} textAnchor="middle" fontSize={18} fontWeight={700} fill={INK}>=</text>
                        <Factor x={232} name="AB" cells={abCells} tint={(_, c) => (c === state.part ? (shown ? GREEN_TINT : SECOND_TINT) : undefined)} color={(_, c) => (c === state.part ? (shown ? GREEN : SECOND) : undefined)} />
                    </g>
                ) : (
                    <g>
                        <Factor x={30} name="B" cells={bCells} />
                        <text x={152} y={190} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK}>·</text>
                        <Factor x={160} name="A" cells={aCells} />
                        <text x={252} y={194} fontSize={15} fontWeight={700} fill={SECOND} direction="ltr">✗ 3 ≠ 2</text>
                    </g>
                )}
            </Board>
        </ToolFrame>
    )
}
