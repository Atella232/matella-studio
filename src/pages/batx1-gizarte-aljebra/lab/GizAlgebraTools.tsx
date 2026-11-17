import { useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { groupDigits } from '../../../utils/numberFormat'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import { Board, Hidden, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { GREEN, INK, MUTED, say } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { BUSINESSES, breakEvenChallenges, breakEvenExtra, breakEvenPrediction, breakEvenUnits, costs, income, initialBreakEvenState, profit, setBreakEven, type BreakEvenState } from './breakEven'
import { budgetChallenges, budgetExtra, budgetPrediction, initialBudgetState, SCENARIOS, setBudget, uses, type BudgetState } from './budget'
import { demandAt, equilibriumPrice, gap, initialMarketState, MARKETS, marketChallenges, marketExtra, marketLatex, marketPrediction, setMarket, supplyAt, type MarketState } from './market'

/* ==========================================================================
   Aljebra · Batxilergoa 1 · Gizarte Zientziak — the three tools of this
   unit: the break-even point (income and cost lines, and the units sold),
   supply and demand (two lines and the price that makes them meet) and the
   budget region (a plan against two resources). Each asks for a prediction
   before it shows the result. Logic in breakEven.ts, market.ts and
   budget.ts; words in the drawings go through <Label>, so the Arabic reads
   right to left also in Safari.
   ========================================================================== */

/** A whole number as each language writes it, with the minus sign */
const written = (value: number, language: UnitLanguage) => `${value < 0 ? '−' : ''}${groupDigits(String(Math.abs(Math.round(value))), language)}`
/** A whole number for LaTeX, thousands with \, from five digits */
const tex = (value: number) => {
    const digits = String(Math.abs(Math.round(value)))
    return `${value < 0 ? '-' : ''}${digits.length >= 5 ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : digits}`
}
/** A number with at most two decimals for LaTeX: {,} for the comma, the point in Arabic */
const texDecimal = (value: number, language: UnitLanguage) => (Number.isInteger(value) ? tex(value) : value.toFixed(2).replace('.', language === 'ar' ? '.' : '{,}'))

/** Fixed colours: the stage colour of «economy» is coral, and the legends name blue and red */
const BLUE = '#2f6fdb'
const BLUE_TINT = '#dde7f7'
const RED = '#c4432a'

const LEFT = 44
const RIGHT = 340
const BASE = 172
const TOP = 22

/* ---------- L1. The break-even point ---------- */

export function BreakEvenTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<BreakEvenState>(initialBreakEvenState)
    const shown = state.prediction !== null
    const business = BUSINESSES[state.business]
    const profitLetter = props.language === 'en' ? 'P' : 'B'
    const controls = (
        <>
            <Segmented<string>
                label={l(say('Negozioa', 'Negocio', 'المشروع', 'Business'))}
                value={String(state.business)}
                options={BUSINESSES.map((item, index) => ({ value: String(index), label: l(item.name) }))}
                onChange={(value) => setState((s) => setBreakEven(s, { business: Number(value) }))}
            />
            <Stepper label={l(say('Prezioa', 'Precio', 'السعر', 'Price'))} value={state.price} min={business.price.min} max={business.price.max} step={business.price.step} format={(value) => `${value} €`} onChange={(price) => setState((s) => setBreakEven(s, { price }))} language={props.language} />
            <Stepper label={l(say('Saldutako unitateak', 'Unidades vendidas', 'الوحدات المبيعة', 'Units sold'))} value={state.units} min={0} max={business.units.max} step={business.units.step} format={(value) => written(value, props.language)} onChange={(units) => setState((s) => setBreakEven(s, { units }))} language={props.language} />
        </>
    )
    const point = breakEvenUnits(state)
    const result = profit(state)
    const note = result === 0
        ? say('Atalasean zaude: diru-sarrerak eta kostuak berdinak dira.', 'Estás en el punto muerto: ingresos y costes son iguales.', 'أنت عند نقطة التعادل: الإيرادات تساوي التكاليف.', 'You are at break-even: income and costs are equal.')
        : result > 0
            ? say(`${written(result, 'eu')} euroko mozkina: atalasearen eskuinean zaude.`, `Beneficio de ${written(result, 'es')} euros: estás a la derecha del punto muerto.`, `ربح قدره ${written(result, 'ar')} يورو: أنت يمين نقطة التعادل.`, `A profit of ${written(result, 'en')} euros: you are to the right of break-even.`)
            : say(`${written(-result, 'eu')} euroko galera: atalasearen ezkerrean zaude.`, `Pérdida de ${written(-result, 'es')} euros: estás a la izquierda del punto muerto.`, `خسارة قدرها ${written(-result, 'ar')} يورو: أنت يسار نقطة التعادل.`, `A loss of ${written(-result, 'en')} euros: you are to the left of break-even.`)
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: unitate hauekin, dirua galtzen da, ez irabazi ez galdu, ala irabazten da?', 'Antes de verlo: con estas unidades, ¿se pierde dinero, ni se gana ni se pierde, o se gana?', 'قبل أن تراه: بهذه الوحدات، هل نخسر المال أم لا ربح ولا خسارة أم نربح؟', 'Before you see it: with these units, do you lose money, break even, or earn?')}
            labels={{ '<': say('Galdu', 'Pierde', 'خسارة', 'Lose'), '=': say('Berdin', 'Ni gana ni pierde', 'تعادل', 'Break even'), '>': say('Irabazi', 'Gana', 'ربح', 'Earn') }}
            actual={breakEvenPrediction(state)}
            choice={state.prediction}
            tip={say('Unitate bakoitzak prezioa ken kostua uzten du; kostu finkoak ordaindu arte, galera dago.', 'Cada unidad deja el precio menos el coste; hasta pagar los costes fijos hay pérdida.', 'كل وحدة تترك السعر ناقص التكلفة؛ وحتى تُغطّى التكاليف الثابتة توجد خسارة.', 'Each unit leaves the price minus the cost; until the fixed costs are paid there is a loss.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[
                    `I=${state.price}\\cdot ${tex(state.units)}=${tex(income(state))}`,
                    `C=${tex(business.fixed)}+${business.cost}\\cdot ${tex(state.units)}=${tex(costs(state))}`,
                    `${profitLetter}=I-C=${tex(result)}`,
                    `x_0=\\frac{${tex(business.fixed)}}{${state.price}-${business.cost}}${Number.isInteger(point) ? '=' : '\\approx'}${texDecimal(point, props.language)}`
                ]}
                note={l(note)}
            />
        </Predict>
    )
    // Euros up to the larger of the two lines at the right end
    const top = Math.max(business.price.max * business.units.max * 0.6, business.fixed + business.cost * business.units.max) * 1.05
    const X = (units: number) => LEFT + (units / business.units.max) * (RIGHT - LEFT)
    const Y = (euros: number) => BASE - (Math.min(euros, top) / top) * (BASE - TOP)
    // The income line stops where it leaves the board
    const incomeEnd = Math.min(business.units.max, top / state.price)
    const at = X(state.units)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={breakEvenChallenges} extraChallenges={breakEvenExtra} state={state}>
            <Board height={214} label={l(say('Diru-sarreren eta kostuen zuzenak, eta saldutako unitateak', 'Las rectas de ingresos y costes, y las unidades vendidas', 'مستقيما الإيرادات والتكاليف والوحدات المبيعة', 'The income and cost lines, and the units sold'))}>
                <line x1={LEFT} x2={RIGHT} y1={BASE} y2={BASE} stroke={INK} strokeWidth={1.6} />
                <line x1={LEFT} x2={LEFT} y1={BASE} y2={TOP - 6} stroke={INK} strokeWidth={1.6} />
                <line x1={X(0)} y1={Y(business.fixed)} x2={X(business.units.max)} y2={Y(business.fixed + business.cost * business.units.max)} stroke={RED} strokeWidth={2.4} />
                <line x1={X(0)} y1={Y(0)} x2={X(incomeEnd)} y2={Y(state.price * incomeEnd)} stroke={BLUE} strokeWidth={2.4} />
                <text x={X(business.units.max) - 2} y={Y(business.fixed + business.cost * business.units.max) + 16} textAnchor="end" fontSize={13} fontWeight={700} fill={RED} direction="ltr">C(x)</text>
                <text x={X(incomeEnd) - 6} y={Y(state.price * incomeEnd) + 4} textAnchor="end" fontSize={13} fontWeight={700} fill={BLUE} direction="ltr">I(x)</text>
                <line x1={at} x2={at} y1={TOP - 4} y2={BASE} stroke={MUTED} strokeWidth={1.2} strokeDasharray="4 3" />
                {shown
                    ? (
                        <>
                            <line x1={at} x2={at} y1={Y(income(state))} y2={Y(costs(state))} stroke={result >= 0 ? GREEN : RED} strokeWidth={6} opacity={0.6} />
                            <circle cx={at} cy={Y(income(state))} r={4.5} fill={BLUE} />
                            <circle cx={at} cy={Y(costs(state))} r={4.5} fill={RED} />
                            {point <= business.units.max && <circle cx={X(point)} cy={Y(state.price * point)} r={6} fill="none" stroke={INK} strokeWidth={2} />}
                            {point <= business.units.max && <text x={X(point)} y={BASE + 15} textAnchor="middle" fontSize={11} fontWeight={700} fill={INK} direction="ltr">{texDecimal(point, props.language).replace('{,}', ',').replace('\\,', ' ')}</text>}
                        </>
                    )
                    : <Hidden x={200} y={100} />}
                <text x={at} y={TOP - 8} textAnchor="middle" fontSize={11} fill={MUTED} direction="ltr">{`x = ${written(state.units, props.language)}`}</text>
                <Label x={192} y={206} textAnchor="middle" fontSize={12} fill={MUTED}>{l(say('Urdina: diru-sarrerak · gorria: kostuak · zirkulua: atalasea', 'Azul: ingresos · rojo: costes · círculo: punto muerto', 'الأزرق: الإيرادات · الأحمر: التكاليف · الدائرة: نقطة التعادل', 'Blue: income · red: costs · circle: break-even'))}</Label>
            </Board>
        </ToolFrame>
    )
}

/* ---------- L2. Supply and demand ---------- */

export function MarketTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<MarketState>(initialMarketState)
    const shown = state.prediction !== null
    const market = MARKETS[state.market]
    const english = props.language === 'en'
    const controls = (
        <>
            <Segmented<string>
                label={l(say('Merkatua', 'Mercado', 'السوق', 'Market'))}
                value={String(state.market)}
                options={MARKETS.map((item, index) => ({ value: String(index), label: l(item.name) }))}
                onChange={(value) => setState((s) => setMarket(s, { market: Number(value) }))}
            />
            <Stepper label={l(say('Prezioa', 'Precio', 'السعر', 'Price'))} value={state.price} min={market.price.min} max={market.price.max} format={(value) => `${value} €`} onChange={(price) => setState((s) => setMarket(s, { price }))} language={props.language} />
        </>
    )
    const demand = demandAt(state.market, state.price)
    const supply = supplyAt(state.market, state.price)
    const difference = gap(state)
    const equilibrium = equilibriumPrice(state.market)
    const formulas = marketLatex(state.market, english)
    const supplyLetter = english ? 'S' : 'O'
    const note = difference === 0
        ? say(`Oreka: ${demand} unitate saltzen dira, ez da ezer falta eta ez dago ezer soberan.`, `Equilibrio: se venden ${demand} unidades, ni falta ni sobra nada.`, `توازن: تُباع ${demand} وحدة، لا نقص ولا فائض.`, `Equilibrium: ${demand} units are sold, nothing missing and nothing left over.`)
        : difference > 0
            ? say(`${difference} unitate soberan: prezioa altuegia da, oreka ${equilibrium} euroan dago.`, `Sobran ${difference} unidades: el precio es alto, el equilibrio está en ${equilibrium} euros.`, `تفيض ${difference} وحدة: السعر مرتفع، والتوازن عند ${equilibrium} يورو.`, `${difference} units left over: the price is high, equilibrium is at ${equilibrium} euros.`)
            : say(`${-difference} unitate falta dira: prezioa baxuegia da, oreka ${equilibrium} euroan dago.`, `Faltan ${-difference} unidades: el precio es bajo, el equilibrio está en ${equilibrium} euros.`, `تنقص ${-difference} وحدة: السعر منخفض، والتوازن عند ${equilibrium} يورو.`, `${-difference} units missing: the price is low, equilibrium is at ${equilibrium} euros.`)
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: prezio honetan, produktua faltako da, oreka egongo da, ala soberan egongo da?', 'Antes de verlo: a este precio, ¿faltará producto, habrá equilibrio o sobrará?', 'قبل أن تراه: بهذا السعر، هل ينقص المنتج أم يكون توازن أم يفيض؟', 'Before you see it: at this price, will product be missing, will there be equilibrium, or will it be left over?')}
            labels={{ '<': say('Falta', 'Falta', 'نقص', 'Missing'), '=': say('Oreka', 'Equilibrio', 'توازن', 'Equilibrium'), '>': say('Soberan', 'Sobra', 'فائض', 'Left over') }}
            actual={marketPrediction(state)}
            choice={state.prediction}
            tip={say('Prezio altuak eskaintza igotzen du eta eskaria jaisten.', 'Un precio alto sube la oferta y baja la demanda.', 'السعر المرتفع يرفع العرض ويخفض الطلب.', 'A high price raises supply and lowers demand.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[`D(${state.price})=${demand}\\qquad ${supplyLetter}(${state.price})=${supply}`, `${formulas.demand}\\qquad ${formulas.supply}`]} note={l(note)} />
        </Predict>
    )
    const maxPrice = market.price.max + 5
    const maxQuantity = Math.max(market.demand.a, supplyAt(state.market, maxPrice)) * 1.05
    const X = (price: number) => LEFT + (price / maxPrice) * (RIGHT - LEFT)
    const Y = (quantity: number) => BASE - (Math.max(0, quantity) / maxQuantity) * (BASE - TOP)
    const supplyStart = Math.max(0, market.supply.d / market.supply.c)
    const demandEnd = Math.min(maxPrice, market.demand.a / market.demand.b)
    const at = X(state.price)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={marketChallenges} extraChallenges={marketExtra} state={state}>
            <Board height={214} label={l(say('Eskariaren eta eskaintzaren zuzenak, eta aukeratutako prezioa', 'Las rectas de demanda y oferta, y el precio elegido', 'مستقيما الطلب والعرض والسعر المختار', 'The demand and supply lines, and the chosen price'))}>
                <line x1={LEFT} x2={RIGHT} y1={BASE} y2={BASE} stroke={INK} strokeWidth={1.6} />
                <line x1={LEFT} x2={LEFT} y1={BASE} y2={TOP - 6} stroke={INK} strokeWidth={1.6} />
                <line x1={X(0)} y1={Y(market.demand.a)} x2={X(demandEnd)} y2={Y(demandAt(state.market, demandEnd))} stroke={BLUE} strokeWidth={2.4} />
                <line x1={X(supplyStart)} y1={Y(supplyAt(state.market, supplyStart))} x2={X(maxPrice)} y2={Y(supplyAt(state.market, maxPrice))} stroke={RED} strokeWidth={2.4} />
                <text x={X(0) + 6} y={Y(market.demand.a) - 6} fontSize={13} fontWeight={700} fill={BLUE} direction="ltr">D(p)</text>
                <text x={X(maxPrice) - 4} y={Y(supplyAt(state.market, maxPrice)) + 16} textAnchor="end" fontSize={13} fontWeight={700} fill={RED} direction="ltr">{`${supplyLetter}(p)`}</text>
                <line x1={at} x2={at} y1={TOP - 4} y2={BASE} stroke={MUTED} strokeWidth={1.2} strokeDasharray="4 3" />
                <text x={at} y={BASE + 15} textAnchor="middle" fontSize={11} fontWeight={700} fill={INK} direction="ltr">{`${state.price} €`}</text>
                {shown
                    ? (
                        <>
                            {difference !== 0 && <line x1={at} x2={at} y1={Y(demand)} y2={Y(supply)} stroke={difference > 0 ? GREEN : RED} strokeWidth={7} opacity={0.55} />}
                            <circle cx={at} cy={Y(demand)} r={4.5} fill={BLUE} />
                            <circle cx={at} cy={Y(supply)} r={4.5} fill={RED} />
                            <circle cx={X(equilibrium)} cy={Y(demandAt(state.market, equilibrium))} r={6} fill="none" stroke={INK} strokeWidth={2} />
                        </>
                    )
                    : <Hidden x={200} y={100} />}
                <Label x={192} y={206} textAnchor="middle" fontSize={12} fill={MUTED}>{l(say('Urdina: eskaria · gorria: eskaintza · zirkulua: oreka', 'Azul: demanda · rojo: oferta · círculo: equilibrio', 'الأزرق: الطلب · الأحمر: العرض · الدائرة: التوازن', 'Blue: demand · red: supply · circle: equilibrium'))}</Label>
            </Board>
        </ToolFrame>
    )
}

/* ---------- L3. The budget region ---------- */

/** The corners of the region where every resource holds and x, y ≥ 0, in order around it */
function regionCorners(scenario: number): Array<[number, number]> {
    const { resources } = SCENARIOS[scenario]
    const candidates: Array<[number, number]> = [[0, 0]]
    for (const { a, b, limit } of resources) candidates.push([limit / a, 0], [0, limit / b])
    const [first, second] = resources
    const det = first.a * second.b - first.b * second.a
    if (det !== 0) candidates.push([(first.limit * second.b - first.b * second.limit) / det, (first.a * second.limit - first.limit * second.a) / det])
    const inside = candidates.filter(([x, y]) => x >= -1e-9 && y >= -1e-9 && resources.every(({ a, b, limit }) => a * x + b * y <= limit + 1e-9))
    const cx = inside.reduce((sum, [x]) => sum + x, 0) / inside.length
    const cy = inside.reduce((sum, [, y]) => sum + y, 0) / inside.length
    return inside.sort((p, q) => Math.atan2(p[1] - cy, p[0] - cx) - Math.atan2(q[1] - cy, q[0] - cx))
}

export function BudgetTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<BudgetState>(initialBudgetState)
    const shown = state.prediction !== null
    const scenario = SCENARIOS[state.scenario]
    const controls = (
        <>
            <Segmented<string>
                label={l(say('Lantegia', 'Negocio', 'المشروع', 'Business'))}
                value={String(state.scenario)}
                options={SCENARIOS.map((item, index) => ({ value: String(index), label: l(item.name) }))}
                onChange={(value) => setState((s) => setBudget(s, { scenario: Number(value) }))}
            />
            <Stepper label={`x · ${l(scenario.x)}`} value={state.x} min={0} max={scenario.max.x} onChange={(x) => setState((s) => setBudget(s, { x }))} language={props.language} />
            <Stepper label={`y · ${l(scenario.y)}`} value={state.y} min={0} max={scenario.max.y} onChange={(y) => setState((s) => setBudget(s, { y }))} language={props.language} />
        </>
    )
    const used = uses(state)
    const verdict = budgetPrediction(state)
    const note = verdict === '<'
        ? say('Sartzen da, eta baliabide guztietatik zerbait geratzen da.', 'Cabe, y sobra algo de todos los recursos.', 'تتسع الخطة ويبقى شيء من كل الموارد.', 'It fits, and something is left of every resource.')
        : verdict === '='
            ? say('Justu sartzen da: baliabide bat agortzen da. Puntua mugan dago.', 'Cabe justo: un recurso se agota. El punto está en la frontera.', 'تتسع بالضبط: يُستنفد أحد الموارد. النقطة على الحد.', 'It just fits: one resource runs out. The point is on the boundary.')
            : say('Ez da sartzen: muga bat gainditzen du. Puntua eskualdetik kanpo dago.', 'No cabe: pasa de un límite. El punto está fuera de la región.', 'لا تتسع: تتجاوز أحد الحدود. النقطة خارج المنطقة.', 'It does not fit: it goes over a limit. The point is outside the region.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: plan hau soberakinarekin sartzen da, justu sartzen da, ala ez da sartzen?', 'Antes de verlo: ¿este plan cabe con margen, cabe justo o no cabe?', 'قبل أن تراه: هل تتسع هذه الخطة مع فائض أم بالضبط أم لا تتسع؟', 'Before you see it: does this plan fit with room to spare, just fit, or not fit?')}
            labels={{ '<': say('Soberan', 'Con margen', 'مع فائض', 'With room'), '=': say('Justu', 'Justo', 'بالضبط', 'Just'), '>': say('Ez da sartzen', 'No cabe', 'لا تتسع', 'Does not fit') }}
            actual={verdict}
            choice={state.prediction}
            tip={say('Ordeztu $x$ eta $y$ inekuazio bakoitzean: bat huts egiten badu, ez da sartzen.', 'Sustituye $x$ e $y$ en cada inecuación: si falla una, no cabe.', 'عوّض $x$ و$y$ في كل متراجحة: إذا أخلّت واحدة فلا تتسع.', 'Put $x$ and $y$ into each inequality: if one fails, it does not fit.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={scenario.resources.map(({ a, b, limit }, index) => `${a}\\cdot ${state.x}+${b}\\cdot ${state.y}=${tex(used[index])}${used[index] <= limit ? '\\le' : '>'} ${tex(limit)}`)}
                note={l(note)}
            />
        </Predict>
    )
    const X = (x: number) => LEFT + (x / scenario.max.x) * (RIGHT - LEFT)
    const Y = (y: number) => BASE - (y / scenario.max.y) * (BASE - TOP)
    const colors = [RED, GREEN]
    const corners = regionCorners(state.scenario)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={budgetChallenges} extraChallenges={budgetExtra} state={state}>
            <Board height={214} label={l(say('Bi murrizketen zuzenak, eskualde bideragarria eta plana', 'Las rectas de las dos restricciones, la región factible y el plan', 'مستقيما القيدين والمنطقة الممكنة والخطة', 'The lines of the two constraints, the feasible region and the plan'))}>
                {shown && <polygon points={corners.map(([x, y]) => `${X(x)},${Y(y)}`).join(' ')} fill={BLUE_TINT} stroke={BLUE} strokeWidth={1.2} />}
                <line x1={LEFT} x2={RIGHT} y1={BASE} y2={BASE} stroke={INK} strokeWidth={1.6} />
                <line x1={LEFT} x2={LEFT} y1={BASE} y2={TOP - 6} stroke={INK} strokeWidth={1.6} />
                {scenario.resources.map(({ a, b, limit }, index) => {
                    // From where the line enters the board to where it leaves it
                    const y0 = Math.min(limit / b, scenario.max.y)
                    const x0 = (limit - b * y0) / a
                    const x1 = Math.min(limit / a, scenario.max.x)
                    const y1 = (limit - a * x1) / b
                    return <line key={index} x1={X(x0)} y1={Y(y0)} x2={X(x1)} y2={Y(y1)} stroke={colors[index]} strokeWidth={2.2} />
                })}
                <circle cx={X(state.x)} cy={Y(state.y)} r={5.5} fill={shown ? (verdict === '>' ? RED : verdict === '=' ? INK : GREEN) : INK} stroke="#fff" strokeWidth={1.4} />
                <text x={X(state.x) + 8} y={Y(state.y) - 8} fontSize={11} fontWeight={700} fill={INK} direction="ltr">{`(${state.x}, ${state.y})`}</text>
                {!shown && <Hidden x={250} y={70} />}
                <text x={RIGHT} y={BASE + 15} textAnchor="end" fontSize={11} fill={MUTED} direction="ltr">x</text>
                <text x={LEFT - 6} y={TOP} textAnchor="end" fontSize={11} fill={MUTED} direction="ltr">y</text>
                <Label x={192} y={206} textAnchor="middle" fontSize={12} fill={MUTED}>{l(say(`Gorria: ${scenario.resources[0].name.eu} · berdea: ${scenario.resources[1].name.eu}`, `Rojo: ${scenario.resources[0].name.es} · verde: ${scenario.resources[1].name.es}`, `الأحمر: ${scenario.resources[0].name.ar} · الأخضر: ${scenario.resources[1].name.ar}`, `Red: ${scenario.resources[0].name.en} · green: ${scenario.resources[1].name.en}`))}</Label>
            </Board>
        </ToolFrame>
    )
}

