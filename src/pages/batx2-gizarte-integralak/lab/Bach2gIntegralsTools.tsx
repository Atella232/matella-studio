import { useId, useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { decimalSeparatorFor } from '../../../utils/numberFormat'
import { say } from '../../batx1-zientziak-funtzioak/text'
import { Board, Hidden, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { GREEN, INK, MUTED, PAPER, SECOND, STAGE } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { accumulatedOf, initialPaybackState, PAYBACK_LIMITS, paybackChallenges, paybackExtra, paybackPrediction, PROJECT_SETUP, PROJECTS, rateOf, setPayback, type PaybackState, type Project } from './payback'
import { initialTotalState, marginalOf, PLANT_SETUP, PLANTS, setTotal, TOTAL_LIMITS, totalChallenges, totalExtra, totalOf, totalPrediction, variableOf, type Plant, type TotalState } from './total'

/* ==========================================================================
   Integralak · Batxilergoa 2 · Gizarte Zientziak — the two tools of this
   unit: from the next unit to the total cost, and when does the money come
   back? Each asks for a prediction before it shades the area. The boards
   carry numbers and letters only; the words go in the readout. Logic in
   total.ts and payback.ts.
   ========================================================================== */

const LEFT = 48
const TOP = 20
const WIDTH = 296
const HEIGHT = 200

type View = { xMin: number; xMax: number; yMin: number; yMax: number }

const dec = (value: number, language: UnitLanguage) => {
    const text = String(Math.round(value * 100) / 100)
    return (language === 'ar' ? text : text.replace('.', decimalSeparatorFor(language))).replace('-', '−')
}
const tex = (value: number, language: UnitLanguage) => {
    const text = String(Math.round(value * 100) / 100)
    return language === 'ar' ? text : text.replace('.', '{,}')
}
const arabicPoint = (latex: string, language: UnitLanguage) => (language === 'ar' ? latex.replace(/\{,\}/g, '.') : latex)

function useClip() {
    const id = useId().replace(/:/g, '')
    return { defs: <defs><clipPath id={id}><rect x={LEFT} y={TOP} width={WIDTH} height={HEIGHT} /></clipPath></defs>, url: `url(#${id})` }
}

function frame(view: View) {
    return {
        X: (x: number) => LEFT + ((x - view.xMin) / (view.xMax - view.xMin)) * WIDTH,
        Y: (y: number) => TOP + ((view.yMax - y) / (view.yMax - view.yMin)) * HEIGHT
    }
}

function path(fn: (x: number) => number, from: number, to: number, X: (x: number) => number, Y: (y: number) => number): string {
    const points: string[] = []
    for (let i = 0; i <= 120; i++) {
        const x = from + ((to - from) * i) / 120
        points.push(`${i ? 'L' : 'M'} ${X(x).toFixed(1)} ${Y(fn(x)).toFixed(1)}`)
    }
    return points.join(' ')
}

/** The region between the curve and the axis from a to b */
function area(fn: (x: number) => number, from: number, to: number, X: (x: number) => number, Y: (y: number) => number): string {
    if (to <= from) return ''
    return `${path(fn, from, to, X, Y)} L ${X(to).toFixed(1)} ${Y(0).toFixed(1)} L ${X(from).toFixed(1)} ${Y(0).toFixed(1)} Z`
}

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
            <line x1={X(0)} x2={X(0)} y1={TOP} y2={TOP + HEIGHT} stroke={INK} strokeWidth={1.4} />
            {xs.filter((x) => Math.abs(x) > 1e-9).map((x) => <text key={`tx${x}`} x={X(x)} y={TOP + HEIGHT + 16} textAnchor="middle" fontSize={11} fill={MUTED}>{dec(x, language)}</text>)}
            {ys.filter((y) => Math.abs(y) > 1e-9).map((y) => <text key={`ty${y}`} x={LEFT - 5} y={Y(y) + 4} textAnchor="end" fontSize={11} fill={MUTED}>{dec(y, language)}</text>)}
            <text x={LEFT + WIDTH} y={TOP + HEIGHT + 32} textAnchor="end" fontSize={12} fontWeight={700} fill={MUTED}>{xName}</text>
        </g>
    )
}

/* ---------- L4. From the next unit to the total cost ---------- */

const PLANT_NAMES: Record<Plant, LocalizedText> = {
    full: say('Beteta', 'Lleno', 'مزدحمة', 'Crowded'),
    press: say('Inprimategia', 'Imprenta', 'المطبعة', 'Print shop'),
    software: say('Softwarea', 'Software', 'البرمجيات', 'Software')
}

export function TotalTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const lang = props.language
    const [state, setState] = useState<TotalState>(initialTotalState)
    const shown = state.prediction !== null
    const { plant, x } = state
    const setup = PLANT_SETUP[plant]
    const view = { xMin: 0, xMax: 20, yMin: 0, yMax: 60 }
    const { X, Y } = frame(view)
    const clip = useClip()
    const controls = (
        <>
            <Segmented<Plant> label={l(say('Enpresa', 'Empresa', 'الشركة', 'Firm'))} value={plant} options={PLANTS.map((value) => ({ value, label: l(PLANT_NAMES[value]) }))} onChange={(value) => setState((s) => setTotal(s, { plant: value }))} />
            <Stepper label={l(say('Unitateak, x', 'Unidades, x', 'الوحدات، x', 'Units, x'))} value={x} min={TOTAL_LIMITS.x.min} max={TOTAL_LIMITS.x.max} onChange={(value) => setState((s) => setTotal(s, { x: value }))} language={lang} />
        </>
    )
    const readout = (
        <Predict
            language={lang}
            question={say(`Ikusi aurretik: $${setup.latex}$ bada, lehen 20 unitateek (kostu finkorik gabe) 400 euro baino gutxiago, 400 euro ala gehiago kostatzen dute?`, `Antes de verlo: con $${setup.latex}$, las 20 primeras unidades (sin el coste fijo), ¿cuestan menos de 400 €, 400 € o más?`, `قبل أن ترى: مع $${setup.latex}$، هل تكلّف الوحدات العشرون الأولى (دون التكلفة الثابتة) أقل من 400 € أم 400 € أم أكثر؟`, `Before you see it: with $${setup.latex}$, do the first 20 units (without the fixed cost) cost less than €400, €400 or more?`)}
            labels={{ '<': say('Gutxiago', 'Menos', 'أقل', 'Less'), '=': say('400 euro', '400 €', '400 €', '€400'), '>': say('Gehiago', 'Más', 'أكثر', 'More') }}
            actual={totalPrediction(state)}
            choice={state.prediction}
            tip={say("Hurrengo unitatearen kostua 20 eurokoa izango balitz beti, $20\\cdot 20=400$. Begiratu $C'$ gorago ala beherago dagoen.", "Si la unidad siguiente costara siempre 20 €, $20\\cdot 20=400$. Mira si $C'$ va por encima o por debajo.", "لو كانت الوحدة التالية تكلّف دائمًا 20 € لكان $20\\cdot 20=400$. انظر هل $C'$ فوق ذلك أم تحته.", "If the next unit always cost €20, $20\\cdot 20=400$. See whether $C'$ is above or below.")}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[arabicPoint(setup.latex, lang), `\\int_0^{${x}}C'=${tex(variableOf(plant, x), lang)}`, `C(${x})=${setup.fixed}+${tex(variableOf(plant, x), lang)}=${tex(totalOf(plant, x), lang)}`]} note={l(say('Azalera hori unitate guztien kostua da; kostu finkoa ($K$) gehituz, kostu osoa.', 'Esa área es lo que cuestan todas las unidades; sumando el coste fijo ($K$), el coste total.', 'تلك المساحة هي تكلفة كل الوحدات؛ وبإضافة التكلفة الثابتة ($K$) نحصل على التكلفة الكلية.', 'That area is what all the units cost; adding the fixed cost ($K$) gives the total cost.'))} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={totalChallenges} extraChallenges={totalExtra} state={state}>
            <Board height={264} label={l(say("C' eta haren azpiko azalera", "C' y el área bajo ella", "C' والمساحة تحتها", "C' and the area under it"))}>
                {clip.defs}
                <Grid view={view} X={X} Y={Y} xStep={5} yStep={10} xName="x" language={lang} />
                <g clipPath={clip.url}>
                    <path d={path((t) => marginalOf(plant, t), 0, 20, X, Y)} fill="none" stroke={STAGE} strokeWidth={3.2} />
                    {shown && <path d={area((t) => marginalOf(plant, t), 0, x, X, Y)} fill={GREEN} fillOpacity={0.3} stroke="none" />}
                </g>
                {shown ? (
                    <g>
                        <line x1={X(x)} x2={X(x)} y1={Y(0)} y2={Y(marginalOf(plant, x))} stroke={GREEN} strokeWidth={2} />
                        <text x={LEFT + 6} y={TOP + 16} fontSize={13} fontWeight={700} fill={GREEN} direction="ltr">{`C(${x}) = ${dec(totalOf(plant, x), lang)}`}</text>
                    </g>
                ) : <Hidden x={196} y={120} />}
            </Board>
        </ToolFrame>
    )
}

/* ---------- L5. When does the money come back? ---------- */

const PROJECT_NAMES: Record<Project, LocalizedText> = {
    cafe: say('Kafetegia', 'Cafetería', 'المقهى', 'Café'),
    shop: say('Denda', 'Tienda', 'المتجر', 'Shop'),
    gym: say('Gimnasioa', 'Gimnasio', 'النادي', 'Gym')
}

export function PaybackTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const lang = props.language
    const [state, setState] = useState<PaybackState>(initialPaybackState)
    const shown = state.prediction !== null
    const { project, t } = state
    const setup = PROJECT_SETUP[project]
    const view = { xMin: 0, xMax: 12, yMin: -12, yMax: 24 }
    const { X, Y } = frame(view)
    const clip = useClip()
    const zero = setup.c / setup.m
    const total = accumulatedOf(project, t)
    const controls = (
        <>
            <Segmented<Project> label={l(say('Negozioa', 'Negocio', 'النشاط', 'Business'))} value={project} options={PROJECTS.map((value) => ({ value, label: l(PROJECT_NAMES[value]) }))} onChange={(value) => setState((s) => setPayback(s, { project: value }))} />
            <Stepper label={l(say('Hilabeteak, t', 'Meses, t', 'الأشهر، t', 'Months, t'))} value={t} min={PAYBACK_LIMITS.t.min} max={PAYBACK_LIMITS.t.max} onChange={(value) => setState((s) => setPayback(s, { t: value }))} language={lang} />
        </>
    )
    const note = total < 0
        ? say('Oraindik galera: gorria berdea baino handiagoa da.', 'Todavía hay pérdidas: el rojo es mayor que el verde.', 'ما زالت هناك خسارة: الأحمر أكبر من الأخضر.', 'Still a loss: the red is bigger than the green.')
        : total === 0 && t > 0
            ? say('Inbertsioa berreskuratu da: berdea eta gorria berdinak dira.', 'Se ha recuperado la inversión: el verde y el rojo son iguales.', 'استُرجع الاستثمار: الأخضر والأحمر متساويان.', 'The investment has come back: the green and the red are equal.')
            : say('Irabaziak: berdea gorria baino handiagoa da.', 'Hay beneficios: el verde es mayor que el rojo.', 'هناك أرباح: الأخضر أكبر من الأحمر.', 'There are profits: the green is bigger than the red.')
    const readout = (
        <Predict
            language={lang}
            question={say(`Ikusi aurretik: hileko irabazia $${setup.latex}$ bada (milaka euro), inbertsioa 6. hilabetea baino lehen, 6. hilabetean ala geroago berreskuratzen da?`, `Antes de verlo: con un beneficio mensual $${setup.latex}$ (miles de euros), ¿se recupera la inversión antes del mes 6, en el mes 6 o después?`, `قبل أن ترى: مع ربح شهري $${setup.latex}$ (بآلاف اليوروهات)، هل يُسترجع الاستثمار قبل الشهر 6 أم فيه أم بعده؟`, `Before you see it: with a monthly profit $${setup.latex}$ (thousands of euros), does the investment come back before month 6, in month 6 or later?`)}
            labels={{ '<': say('Lehenago', 'Antes', 'قبل', 'Before'), '=': say('6. hilabetean', 'En el mes 6', 'في الشهر 6', 'In month 6'), '>': say('Geroago', 'Después', 'بعد', 'Later') }}
            actual={paybackPrediction(state)}
            choice={state.prediction}
            tip={say('Galera pilatua handiena da $b(t)=0$ denean; berreskuratzeko, bikoitza behar da.', 'La pérdida acumulada es mayor cuando $b(t)=0$; para recuperar hace falta el doble de tiempo.', 'تكون الخسارة المتراكمة أكبر عندما $b(t)=0$؛ وللاسترجاع يلزم ضعف ذلك الزمن.', 'The accumulated loss is largest when $b(t)=0$; to get it back takes twice as long.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[setup.latex, `A(${t})=\\int_0^{${t}}b(t)\\,dt=${tex(total, lang)}`]} note={l(note)} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={paybackChallenges} extraChallenges={paybackExtra} state={state}>
            <Board height={264} label={l(say('Hileko irabazia eta pilatutakoa', 'El beneficio mensual y lo acumulado', 'الربح الشهري والمتراكم', 'The monthly profit and what piles up'))}>
                {clip.defs}
                <Grid view={view} X={X} Y={Y} xStep={2} yStep={6} xName="t" language={lang} />
                <g clipPath={clip.url}>
                    <path d={path((s) => rateOf(project, s), 0, 12, X, Y)} fill="none" stroke={STAGE} strokeWidth={3.2} />
                    {shown && <path d={area((s) => rateOf(project, s), 0, Math.min(t, zero), X, Y)} fill={SECOND} fillOpacity={0.32} stroke="none" />}
                    {shown && <path d={area((s) => rateOf(project, s), zero, t, X, Y)} fill={GREEN} fillOpacity={0.32} stroke="none" />}
                </g>
                {shown ? (
                    <g>
                        <line x1={X(t)} x2={X(t)} y1={TOP} y2={TOP + HEIGHT} stroke={MUTED} strokeWidth={1.4} strokeDasharray="5 4" />
                        <text x={LEFT + 6} y={TOP + 16} fontSize={13} fontWeight={700} fill={total < 0 ? SECOND : GREEN} direction="ltr">{`A(${t}) = ${dec(total, lang)}`}</text>
                    </g>
                ) : <Hidden x={196} y={120} />}
            </Board>
        </ToolFrame>
    )
}
