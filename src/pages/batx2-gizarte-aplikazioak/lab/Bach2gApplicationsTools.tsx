import { useId, useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { decimalSeparatorFor, groupDigits, groupLatex } from '../../../utils/numberFormat'
import { say } from '../../batx1-zientziak-funtzioak/text'
import { Board, Hidden, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { GREEN, INK, MUTED, PAPER, SECOND, STAGE } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { AVERAGE_LIMITS, AVERAGE_TOP, averageChallenges, averageExtra, averageOf, averagePrediction, initialAverageState, nextOf, PLANT_SETUP, PLANTS, setAverage, type AverageState, type Plant } from './average'
import { customersOf, incomeAt, incomeLatex, incomeSlope, initialPriceState, priceChallenges, priceExtra, priceOf, pricePrediction, setPrice, VENUE_SETUP, VENUES, type PriceState, type Venue } from './price'
import { costOf, costSlope, FIRM_SETUP, FIRMS, incomeOf, initialProfitState, PROFIT_LIMITS, profitChallenges, profitExtra, profitOf, profitPrediction, setProfit, type Firm, type ProfitState } from './profit'

/* ==========================================================================
   Deribatuaren aplikazioak · Batxilergoa 2 · Gizarte Zientziak — the three
   tools of this unit: income minus cost, the lowest average cost and the
   price that brings in most. Each asks for a prediction before it shows
   the drawing. The boards carry numbers and letters only; the words go in
   the readout. Logic in profit.ts, average.ts and price.ts.
   ========================================================================== */

const LEFT = 48
const TOP = 20
const WIDTH = 296
const HEIGHT = 200

/** A number with the language's decimal mark and the thousands grouped */
const dec = (value: number, language: UnitLanguage, digits = 2) => {
    const text = groupDigits(String(Math.round(value * 10 ** digits) / 10 ** digits), language)
    return (language === 'ar' ? text : text.replace('.', decimalSeparatorFor(language))).replace('-', '−')
}
/** The same inside a formula */
const tex = (value: number, language: UnitLanguage, digits = 2) => {
    const text = groupLatex(String(Math.round(value * 10 ** digits) / 10 ** digits))
    return language === 'ar' ? text : text.replace('.', '{,}')
}
const arabicPoint = (latex: string, language: UnitLanguage) => (language === 'ar' ? latex.replace(/\{,\}/g, '.') : latex)

function useClip() {
    const id = useId().replace(/:/g, '')
    return { defs: <defs><clipPath id={id}><rect x={LEFT} y={TOP} width={WIDTH} height={HEIGHT} /></clipPath></defs>, url: `url(#${id})` }
}

type View = { xMin: number; xMax: number; yMin: number; yMax: number }

/** Real coordinates to the board */
function frame(view: View) {
    return {
        X: (x: number) => LEFT + ((x - view.xMin) / (view.xMax - view.xMin)) * WIDTH,
        Y: (y: number) => TOP + ((view.yMax - y) / (view.yMax - view.yMin)) * HEIGHT
    }
}

/** A sampled curve as an SVG path */
function path(fn: (x: number) => number, from: number, to: number, X: (x: number) => number, Y: (y: number) => number): string {
    const points: string[] = []
    for (let i = 0; i <= 120; i++) {
        const x = from + ((to - from) * i) / 120
        const y = Math.max(-1e6, Math.min(1e6, fn(x)))
        points.push(`${i ? 'L' : 'M'} ${X(x).toFixed(1)} ${Y(y).toFixed(1)}`)
    }
    return points.join(' ')
}

/** Paper, light grid lines every step, the axes and their numbers */
function Grid({ view, X, Y, xStep, yStep, xName, language }: { view: View; X: (x: number) => number; Y: (y: number) => number; xStep: number; yStep: number; xName: string; language: UnitLanguage }) {
    const xs: number[] = []
    for (let x = Math.ceil(view.xMin / xStep) * xStep; x <= view.xMax + 1e-9; x += xStep) xs.push(x)
    const ys: number[] = []
    for (let y = Math.ceil(view.yMin / yStep) * yStep; y <= view.yMax + 1e-9; y += yStep) ys.push(y)
    return (
        <g>
            <rect x={LEFT} y={TOP} width={WIDTH} height={HEIGHT} fill={PAPER} />
            {xs.map((x) => <line key={`x${x}`} x1={X(x)} x2={X(x)} y1={TOP} y2={TOP + HEIGHT} stroke="#e6dfd2" strokeWidth={1} />)}
            {ys.map((y) => <line key={`y${y}`} x1={LEFT} x2={LEFT + WIDTH} y1={Y(y)} y2={Y(y)} stroke="#e6dfd2" strokeWidth={1} />)}
            <line x1={LEFT} x2={LEFT + WIDTH} y1={Y(0)} y2={Y(0)} stroke={INK} strokeWidth={1.4} />
            <line x1={LEFT} x2={LEFT} y1={TOP} y2={TOP + HEIGHT} stroke={INK} strokeWidth={1.4} />
            {xs.map((x) => <text key={`tx${x}`} x={X(x)} y={TOP + HEIGHT + 16} textAnchor="middle" fontSize={11} fill={MUTED}>{dec(x, language)}</text>)}
            {ys.filter((y) => Math.abs(y) > 1e-9).map((y) => <text key={`ty${y}`} x={LEFT - 5} y={Y(y) + 4} textAnchor="end" fontSize={11} fill={MUTED}>{dec(y, language)}</text>)}
            <text x={LEFT + WIDTH} y={TOP + HEIGHT + 32} textAnchor="end" fontSize={12} fontWeight={700} fill={MUTED}>{xName}</text>
        </g>
    )
}

/* ---------- L1. Income minus cost ---------- */

const FIRM_NAMES: Record<Firm, LocalizedText> = {
    workshop: say('Tailerra', 'Taller', 'الورشة', 'Workshop'),
    bakery: say('Okindegia', 'Panadería', 'المخبز', 'Bakery'),
    press: say('Inprimategia', 'Imprenta', 'المطبعة', 'Print shop')
}

export function ProfitTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const lang = props.language
    const [state, setState] = useState<ProfitState>(initialProfitState)
    const shown = state.prediction !== null
    const { firm, x } = state
    const setup = FIRM_SETUP[firm]
    const view = { xMin: 0, xMax: 40, yMin: 0, yMax: setup.yMax }
    const { X, Y } = frame(view)
    const clip = useClip()
    const profit = profitOf(firm, x)
    const slope = costSlope(firm, x)
    const controls = (
        <>
            <Segmented<Firm> label={l(say('Enpresa', 'Empresa', 'الشركة', 'Firm'))} value={firm} options={FIRMS.map((value) => ({ value, label: l(FIRM_NAMES[value]) }))} onChange={(value) => setState((s) => setProfit(s, { firm: value }))} />
            <Stepper label={l(say('Unitateak, x', 'Unidades, x', 'الوحدات، x', 'Units, x'))} value={x} min={PROFIT_LIMITS.x.min} max={PROFIT_LIMITS.x.max} onChange={(value) => setState((s) => setProfit(s, { x: value }))} language={lang} />
        </>
    )
    const note = setup.price > slope
        ? say("$I'>C'$: hurrengo unitateak kostatzen duena baino gehiago ekartzen du. Komeni da gehiago egitea.", "$I'>C'$: la unidad siguiente aporta más de lo que cuesta. Conviene hacer más.", "$I'>C'$: تضيف الوحدة التالية أكثر مما تكلّف. يحسن إنتاج المزيد.", "$I'>C'$: the next unit brings in more than it costs. It pays to make more.")
        : setup.price < slope
            ? say("$I'<C'$: hurrengo unitateak ekartzen duena baino gehiago kostatzen du. Komeni da gutxiago egitea.", "$I'<C'$: la unidad siguiente cuesta más de lo que aporta. Conviene hacer menos.", "$I'<C'$: تكلّف الوحدة التالية أكثر مما تضيف. يحسن إنتاج أقل.", "$I'<C'$: the next unit costs more than it brings in. It pays to make less.")
            : say("$I'=C'$: hemen da irabazirik handiena.", "$I'=C'$: aquí está el mayor beneficio.", "$I'=C'$: هنا أكبر ربح.", "$I'=C'$: here is the highest profit.")
    const readout = (
        <Predict
            language={lang}
            question={say(`Ikusi aurretik: prezioa ${setup.price} euro eta $${setup.latex}$ badira, irabazirik handiena lortzeko, 20 unitate baino gutxiago, 20 unitate ala gehiago behar dira?`, `Antes de verlo: con un precio de ${setup.price} € y $${setup.latex}$, ¿el mayor beneficio se logra con menos de 20 unidades, con 20 o con más?`, `قبل أن ترى: بسعر ${setup.price} € و$${setup.latex}$، هل يتحقق أكبر ربح بأقل من 20 وحدة أم بـ 20 أم بأكثر؟`, `Before you see it: with a price of €${setup.price} and $${setup.latex}$, is the highest profit reached with fewer than 20 units, 20 or more?`)}
            labels={{ '<': say('Gutxiago', 'Menos', 'أقل', 'Fewer'), '=': say('20', '20', '20', '20'), '>': say('Gehiago', 'Más', 'أكثر', 'More') }}
            actual={profitPrediction(state)}
            choice={state.prediction}
            tip={say("Hurrengo unitateak $I'=" + setup.price + "$ ekartzen du eta $C'(x)$ kostatzen du.", "La unidad siguiente aporta $I'=" + setup.price + "$ y cuesta $C'(x)$.", "تضيف الوحدة التالية $I'=" + setup.price + "$ وتكلّف $C'(x)$.", "The next unit brings in $I'=" + setup.price + "$ and costs $C'(x)$.")}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[`I(x)=${setup.price}x`, arabicPoint(setup.latex, lang), `B(${x})=${tex(profit, lang)}`, `I'(x)=${setup.price}`, `C'(${x})=${tex(slope, lang)}`]} note={l(note)} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={profitChallenges} extraChallenges={profitExtra} state={state}>
            <Board height={264} label={l(say('Diru-sarrerak eta kostuak', 'Ingresos y costes', 'الإيراد والتكاليف', 'Income and costs'))}>
                {clip.defs}
                <Grid view={view} X={X} Y={Y} xStep={5} yStep={1000} xName="x" language={lang} />
                {shown ? (
                    <g>
                        <g clipPath={clip.url}>
                            <path d={path((t) => incomeOf(firm, t), 0, 40, X, Y)} fill="none" stroke={INK} strokeWidth={3} />
                            <path d={path((t) => costOf(firm, t), 0, 40, X, Y)} fill="none" stroke={STAGE} strokeWidth={3} />
                        </g>
                        <line x1={X(x)} x2={X(x)} y1={Y(incomeOf(firm, x))} y2={Y(costOf(firm, x))} stroke={profit >= 0 ? GREEN : SECOND} strokeWidth={4} />
                        <circle cx={X(x)} cy={Y(incomeOf(firm, x))} r={5} fill={INK} />
                        <circle cx={X(x)} cy={Y(costOf(firm, x))} r={5} fill={STAGE} />
                        <text x={LEFT + 6} y={TOP + 16} fontSize={13} fontWeight={700} fill={INK} direction="ltr">I</text>
                        <text x={LEFT + 24} y={TOP + 16} fontSize={13} fontWeight={700} fill={STAGE} direction="ltr">C</text>
                        <text x={LEFT + 42} y={TOP + 16} fontSize={13} fontWeight={700} fill={profit >= 0 ? GREEN : SECOND} direction="ltr">{`B = ${dec(profit, lang)}`}</text>
                    </g>
                ) : <Hidden x={196} y={120} />}
            </Board>
        </ToolFrame>
    )
}

/* ---------- L2. The lowest average cost ---------- */

const PLANT_NAMES: Record<Plant, string> = { p1: '1', p2: '2', p3: '3' }

export function AverageTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const lang = props.language
    const [state, setState] = useState<AverageState>(initialAverageState)
    const shown = state.prediction !== null
    const { plant, x } = state
    const setup = PLANT_SETUP[plant]
    const view = { xMin: 0, xMax: 50, yMin: 0, yMax: AVERAGE_TOP }
    const { X, Y } = frame(view)
    const clip = useClip()
    const average = averageOf(plant, x)
    const next = nextOf(plant, x)
    const controls = (
        <>
            <Segmented<Plant> label={l(say('Lantegia', 'Fábrica', 'المصنع', 'Factory'))} value={plant} options={PLANTS.map((value) => ({ value, label: PLANT_NAMES[value] }))} onChange={(value) => setState((s) => setAverage(s, { plant: value }))} />
            <Stepper label={l(say('Unitateak, x', 'Unidades, x', 'الوحدات، x', 'Units, x'))} value={x} min={AVERAGE_LIMITS.x.min} max={AVERAGE_LIMITS.x.max} onChange={(value) => setState((s) => setAverage(s, { x: value }))} language={lang} />
        </>
    )
    const note = next < average - 1e-9
        ? say("$C'<M$: hurrengo unitatea batez bestekoa baino merkeagoa da, eta batez bestekoa jaitsi egingo da.", "$C'<M$: la unidad siguiente es más barata que la media, y la media bajará.", "$C'<M$: الوحدة التالية أرخص من المتوسط، فسينخفض المتوسط.", "$C'<M$: the next unit is cheaper than the average, so the average will go down.")
        : next > average + 1e-9
            ? say("$C'>M$: hurrengo unitatea batez bestekoa baino garestiagoa da, eta batez bestekoa igo egingo da.", "$C'>M$: la unidad siguiente es más cara que la media, y la media subirá.", "$C'>M$: الوحدة التالية أغلى من المتوسط، فسيرتفع المتوسط.", "$C'>M$: the next unit is dearer than the average, so the average will go up.")
            : say("$C'=M$: hemen da batez besteko kosturik txikiena.", "$C'=M$: aquí está el menor coste medio.", "$C'=M$: هنا أصغر متوسط تكلفة.", "$C'=M$: here is the lowest average cost.")
    const readout = (
        <Predict
            language={lang}
            question={say(`Ikusi aurretik: $${setup.latex}$ bada, batez besteko kosturik txikiena lortzeko, 20 unitate baino gutxiago, 20 unitate ala gehiago behar dira?`, `Antes de verlo: con $${setup.latex}$, ¿el menor coste medio se logra con menos de 20 unidades, con 20 o con más?`, `قبل أن ترى: مع $${setup.latex}$، هل يتحقق أصغر متوسط تكلفة بأقل من 20 وحدة أم بـ 20 أم بأكثر؟`, `Before you see it: with $${setup.latex}$, is the lowest average cost reached with fewer than 20 units, 20 or more?`)}
            labels={{ '<': say('Gutxiago', 'Menos', 'أقل', 'Fewer'), '=': say('20', '20', '20', '20'), '>': say('Gehiago', 'Más', 'أكثر', 'More') }}
            actual={averagePrediction(state)}
            choice={state.prediction}
            tip={say('Kostu finkoa zenbat eta handiagoa izan, orduan eta unitate gehiagotan banatu behar da.', 'Cuanto mayor es el coste fijo, en más unidades conviene repartirlo.', 'كلما كبرت التكلفة الثابتة حسُن توزيعها على وحدات أكثر.', 'The bigger the fixed cost, the more units it pays to share it among.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[arabicPoint(setup.latex, lang), `M(${x})=${tex(average, lang)}`, `C'(${x})=${tex(next, lang)}`]} note={l(note)} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={averageChallenges} extraChallenges={averageExtra} state={state}>
            <Board height={264} label={l(say('Batez besteko kostua eta hurrengo unitatea', 'El coste medio y la unidad siguiente', 'متوسط التكلفة والوحدة التالية', 'The average cost and the next unit'))}>
                {clip.defs}
                <Grid view={view} X={X} Y={Y} xStep={10} yStep={20} xName="x" language={lang} />
                {shown ? (
                    <g>
                        <g clipPath={clip.url}>
                            <path d={path((t) => averageOf(plant, t), 1, 50, X, Y)} fill="none" stroke={STAGE} strokeWidth={3.2} />
                            <path d={path((t) => nextOf(plant, t), 0, 50, X, Y)} fill="none" stroke={SECOND} strokeWidth={2.4} strokeDasharray="7 5" />
                        </g>
                        {average <= AVERAGE_TOP && <circle cx={X(x)} cy={Y(average)} r={5.5} fill={STAGE} />}
                        {next <= AVERAGE_TOP && <circle cx={X(x)} cy={Y(next)} r={5} fill={SECOND} />}
                        <text x={LEFT + 6} y={TOP + 16} fontSize={13} fontWeight={700} fill={STAGE} direction="ltr">M</text>
                        <text x={LEFT + 26} y={TOP + 16} fontSize={13} fontWeight={700} fill={SECOND} direction="ltr">C′</text>
                    </g>
                ) : <Hidden x={196} y={120} />}
            </Board>
        </ToolFrame>
    )
}

/* ---------- L3. The price that brings in most ---------- */

const VENUE_NAMES: Record<Venue, LocalizedText> = {
    gym: say('Gimnasioa', 'Gimnasio', 'النادي', 'Gym'),
    concert: say('Kontzertua', 'Concierto', 'الحفلة', 'Concert'),
    hotel: say('Hotela', 'Hotel', 'الفندق', 'Hotel')
}

const VENUE_STEPS: Record<Venue, { x: number; y: number }> = {
    gym: { x: 5, y: 2000 },
    concert: { x: 5, y: 5000 },
    hotel: { x: 20, y: 1000 }
}

export function PriceTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const lang = props.language
    const [state, setState] = useState<PriceState>(initialPriceState)
    const shown = state.prediction !== null
    const { venue, x } = state
    const setup = VENUE_SETUP[venue]
    const view = { xMin: 0, xMax: setup.max, yMin: 0, yMax: setup.yMax }
    const { X, Y } = frame(view)
    const clip = useClip()
    const income = incomeAt(venue, x)
    const slope = incomeSlope(venue, x)
    const controls = (
        <>
            <Segmented<Venue> label={l(say('Negozioa', 'Negocio', 'النشاط', 'Business'))} value={venue} options={VENUES.map((value) => ({ value, label: l(VENUE_NAMES[value]) }))} onChange={(value) => setState((s) => setPrice(s, { venue: value }))} />
            <Stepper label={l(say('Igoera, x (€)', 'Subida, x (€)', 'الزيادة، x (€)', 'Rise, x (€)'))} value={x} min={0} max={setup.max} onChange={(value) => setState((s) => setPrice(s, { x: value }))} language={lang} />
        </>
    )
    const note = slope > 0
        ? say("$I'>0$: prezioa igotzeak oraindik diru gehiago ematen du.", "$I'>0$: subir el precio todavía da más dinero.", "$I'>0$: رفع السعر ما زال يعطي مالًا أكثر.", "$I'>0$: raising the price still brings in more money.")
        : slope < 0
            ? say("$I'<0$: bezero gehiegi galtzen dira; diru-sarrerak jaisten ari dira.", "$I'<0$: se pierden demasiados clientes; los ingresos están bajando.", "$I'<0$: يُفقد زبائن كثيرون؛ الإيراد ينخفض.", "$I'<0$: too many customers are lost; the income is falling.")
            : say("$I'=0$: hemen da diru-sarrerarik handiena.", "$I'=0$: aquí están los mayores ingresos.", "$I'=0$: هنا أكبر إيراد.", "$I'=0$: here is the highest income.")
    const formula = incomeLatex(venue)
    const readout = (
        <Predict
            language={lang}
            question={say(`Ikusi aurretik: $${formula}$ bada, prezioa 10 euro baino gutxiago, 10 euro ala gehiago igo behar da?`, `Antes de verlo: con $${formula}$, ¿hay que subir el precio menos de 10 €, 10 € o más?`, `قبل أن ترى: مع $${formula}$، هل يجب رفع السعر أقل من 10 € أم 10 € أم أكثر؟`, `Before you see it: with $${formula}$, should the price rise by less than €10, €10 or more?`)}
            labels={{ '<': say('Gutxiago', 'Menos', 'أقل', 'Less'), '=': say('10', '10', '10', '10'), '>': say('Gehiago', 'Más', 'أكثر', 'More') }}
            actual={pricePrediction(state)}
            choice={state.prediction}
            tip={say('Begiratu euro bakoitzeko zenbat bezero galtzen diren hasierako bezeroekin alderatuta.', 'Mira cuántos clientes se pierden por euro comparado con los clientes del principio.', 'انظر كم زبونًا يُفقد مع كل يورو مقارنة بزبائن البداية.', 'Look at how many customers are lost per euro compared with the customers at the start.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[formula, `p=${priceOf(venue, x)}\\qquad q=${groupLatex(customersOf(venue, x))}`, `I(${x})=${groupLatex(income)}`, `I'(${x})=${groupLatex(slope)}`]} note={l(note)} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={priceChallenges} extraChallenges={priceExtra} state={state}>
            <Board height={264} label={l(say('Diru-sarrerak prezioaren igoeraren arabera', 'Los ingresos según la subida del precio', 'الإيراد بحسب زيادة السعر', 'The income by rise in price'))}>
                {clip.defs}
                <Grid view={view} X={X} Y={Y} xStep={VENUE_STEPS[venue].x} yStep={VENUE_STEPS[venue].y} xName="x" language={lang} />
                {shown ? (
                    <g>
                        <g clipPath={clip.url}>
                            <path d={path((t) => incomeAt(venue, t), 0, setup.max, X, Y)} fill="none" stroke={STAGE} strokeWidth={3.2} />
                        </g>
                        <line x1={X(x)} x2={X(x)} y1={Y(0)} y2={Y(income)} stroke={SECOND} strokeWidth={1.6} strokeDasharray="4 3" />
                        <circle cx={X(x)} cy={Y(income)} r={5.5} fill={INK} />
                        <text x={LEFT + 6} y={TOP + 16} fontSize={13} fontWeight={700} fill={SECOND} direction="ltr">{`I = ${dec(income, lang)}`}</text>
                    </g>
                ) : <Hidden x={196} y={120} />}
            </Board>
        </ToolFrame>
    )
}
