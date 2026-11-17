import { useId, useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { decimalSeparatorFor, groupDigits, groupLatex } from '../../../utils/numberFormat'
import { say } from '../../batx1-zientziak-funtzioak/text'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { GREEN, INK, MUSTARD, MUTED, PAPER, SECOND, STAGE } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { averageCost, COST_FIRMS, COST_SETUP, costChallenges, costExtra, costPrediction, initialCostState, PRODUCTIONS, setCost, type CostFirm, type CostState } from './averageCost'
import { CAPITAL, capitalAfter, capitalOf, ceilingOf, COMPOUND_RATES, compoundChallenges, compoundExtra, compoundPrediction, initialCompoundState, PERIOD_NAMES, PERIODS, RATE_VALUE, setCompound, type CompoundRate, type CompoundState } from './compound'
import { bill, initialTariffState, setTariff, TARIFF_KINDS, TARIFF_SETUP, tariffChallenges, tariffExtra, tariffJump, tariffLatex, tariffPrediction, tariffSides, type TariffKind, type TariffState } from './tariff'

/* ==========================================================================
   Limiteak eta jarraitutasuna · Batxilergoa 2 · Gizarte Zientziak — the
   three tools of this unit: the average cost in the long run, the tariff
   by brackets and the interest compounded more and more often. Each asks
   for a prediction before it shows the drawing and moves with ▶. The
   boards carry numbers and formulas only (the svg is left to right); the
   words go in the readout. Logic in averageCost.ts, tariff.ts and
   compound.ts.
   ========================================================================== */

/** A number with the language's decimal mark and grouped thousands */
function amount(value: number, language: UnitLanguage, digits = 2): string {
    const rounded = Math.round(value * 10 ** digits) / 10 ** digits
    const [whole, part] = String(rounded).split('.')
    const grouped = groupDigits(whole, language)
    return part ? `${grouped}${language === 'ar' ? '.' : decimalSeparatorFor(language)}${part}` : grouped
}

/** The same inside a formula: 2713{,}57 or 15\,000 */
function texAmount(value: number, language: UnitLanguage, digits = 2): string {
    const rounded = Math.round(value * 10 ** digits) / 10 ** digits
    const [whole, part] = String(rounded).split('.')
    return part ? `${groupLatex(whole)}${language === 'ar' ? '.' : '{,}'}${part}` : groupLatex(whole)
}

/** Arabic writes the decimal point in formulas too */
const arabicPoint = (latex: string, language: UnitLanguage) => (language === 'ar' ? latex.replace(/\{,\}/g, '.') : latex)

/** Euros in each language's order */
const euro = (value: number, language: UnitLanguage, digits = 2) => (language === 'en' ? `€${amount(value, language, digits)}` : `${amount(value, language, digits)} €`)

function useClip(x: number, y: number, width: number, height: number) {
    const id = useId().replace(/:/g, '')
    return { defs: <defs><clipPath id={id}><rect x={x} y={y} width={width} height={height} /></clipPath></defs>, url: `url(#${id})` }
}

const Open = ({ x, y, color }: { x: number; y: number; color: string }) => <circle cx={x} cy={y} r={5.5} fill={PAPER} stroke={color} strokeWidth={2.4} />
const Full = ({ x, y, color }: { x: number; y: number; color: string }) => <circle cx={x} cy={y} r={5.5} fill={color} stroke={PAPER} strokeWidth={1.2} />

/** The plotting area: 300 × 200 from (40, 20) */
const LEFT = 40
const TOP = 20
const WIDTH = 300
const HEIGHT = 200

/** Horizontal lines and their labels every `step` from 0 to `max` */
function Rows({ max, step, Y, label }: { max: number; step: number; Y: (y: number) => number; label: (y: number) => string }) {
    const ys = Array.from({ length: Math.floor(max / step) + 1 }, (_, i) => i * step)
    return (
        <g>
            {ys.map((y) => <line key={`r${y}`} x1={LEFT} x2={LEFT + WIDTH} y1={Y(y)} y2={Y(y)} stroke="#e6dfd2" strokeWidth={1} />)}
            {ys.filter((y) => y > 0).map((y) => <text key={`l${y}`} x={LEFT - 5} y={Y(y) + 4} textAnchor="end" fontSize={11} fill={MUTED}>{label(y)}</text>)}
            <line x1={LEFT} x2={LEFT + WIDTH} y1={Y(0)} y2={Y(0)} stroke={INK} strokeWidth={1.4} />
            <line x1={LEFT} x2={LEFT} y1={TOP} y2={TOP + HEIGHT} stroke={INK} strokeWidth={1.4} />
        </g>
    )
}

/* ---------- L1. The average cost in the long run ---------- */

const FIRM_NAMES: Record<CostFirm, LocalizedText> = {
    bakery: say('Okindegia', 'Panadería', 'مخبز', 'Bakery'),
    app: say('Aplikazioa', 'App', 'تطبيق', 'App'),
    workshop: say('Lantegia', 'Taller', 'ورشة', 'Workshop')
}

const logX = (x: number) => LEFT + ((Math.log10(x) - 1) / 3) * WIDTH

export function AverageCostTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CostState>(initialCostState)
    const shown = state.prediction !== null
    const setup = COST_SETUP[state.firm]
    const playback = usePlayback(`${state.firm}-${state.step}`, 2600)
    const step = shown && playback.progress !== null ? Math.round(playback.progress * (PRODUCTIONS.length - 1)) : state.step
    const x = PRODUCTIONS[step]
    const average = averageCost(state.firm, x)
    const Y = (y: number) => TOP + HEIGHT - (Math.min(y, setup.yMax * 1.2) / setup.yMax) * HEIGHT
    const clip = useClip(LEFT, TOP, WIDTH, HEIGHT)
    const lang = props.language
    const controls = (
        <>
            <Segmented<CostFirm> label={l(say('Enpresa', 'Empresa', 'الشركة', 'Firm'))} value={state.firm} options={COST_FIRMS.map((firm) => ({ value: firm, label: l(FIRM_NAMES[firm]) }))} onChange={(firm) => setState((s) => setCost(s, { firm }))} />
            <Stepper label={l(say('Unitateak, x', 'Unidades, x', 'الوحدات، x', 'Units, x'))} value={state.step} min={0} max={PRODUCTIONS.length - 1} format={(index) => groupDigits(PRODUCTIONS[index], lang)} onChange={(index) => setState((s) => setCost(s, { step: index }))} language={lang} />
        </>
    )
    const notes: Record<CostFirm, LocalizedText> = {
        bakery: say('Kostu finkoa ogi askotan banatzen da: batez besteko kostua ogi bakoitzaren 2 euroetara jaisten da, baina ez da inoiz iristen.', 'El coste fijo se reparte entre muchos panes: el coste medio baja hacia los 2 € de cada pan, sin llegar nunca.', 'تتوزع التكلفة الثابتة على خبز كثير: ينخفض متوسط التكلفة نحو 2 € لكل خبزة دون أن يبلغها.', 'The fixed cost is shared among many loaves: the average cost falls towards the €2 of each loaf, never reaching it.'),
        app: say('Aplikazioa kopiatzeak ez du ezer kostatzen: batez besteko kostua 0 aldera doa.', 'Copiar la app no cuesta nada: el coste medio tiende a 0.', 'نسخ التطبيق لا يكلّف شيئًا: يؤول متوسط التكلفة إلى 0.', 'Copying the app costs nothing: the average cost tends to 0.'),
        workshop: say('Hasieran jaitsi egiten da, baina $0{,}05x$ gaiak agintzen du azkenean: batez besteko kostua mugarik gabe hazten da.', 'Al principio baja, pero el término $0{,}05x$ acaba mandando: el coste medio crece sin límite.', 'ينخفض في البداية، لكن الحد $0{,}05x$ يتحكم في النهاية: يكبر متوسط التكلفة بلا حد.', 'At first it falls, but the term $0{,}05x$ ends up ruling: the average cost grows without limit.')
    }
    const readout = (
        <Predict
            language={lang}
            question={say(`Ikusi aurretik: $${setup.latex}$ bada, zer gertatzen zaio batez besteko kostuari produkzioa asko handitzean?`, `Antes de verlo: con $${setup.latex}$, ¿qué le pasa al coste medio cuando la producción crece mucho?`, `قبل أن ترى: مع $${setup.latex}$، ماذا يحدث لمتوسط التكلفة عندما يكبر الإنتاج كثيرًا؟`, `Before you see it: with $${setup.latex}$, what happens to the average cost when production grows a lot?`)}
            labels={{ '<': say('0 aldera doa', 'Tiende a 0', 'يؤول إلى 0', 'It tends to 0'), '=': say('Unitateko kostura doa', 'Tiende al coste por unidad', 'يؤول إلى تكلفة الوحدة', 'It tends to the cost per unit'), '>': say('Mugarik gabe hazten da', 'Crece sin límite', 'يكبر بلا حد', 'It grows without limit') }}
            actual={costPrediction(state)}
            choice={state.prediction}
            tip={say('Zatitu $C(x)$ zati $x$ eta begiratu zer geratzen den $x$ oso handia denean.', 'Divide $C(x)$ entre $x$ y mira qué queda cuando $x$ es muy grande.', 'اقسم $C(x)$ على $x$ وانظر ماذا يبقى عندما يكون $x$ كبيرًا جدًا.', 'Divide $C(x)$ by $x$ and see what is left when $x$ is very large.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[arabicPoint(setup.latex, lang), `\\frac{C(${groupLatex(x)})}{${groupLatex(x)}}=${texAmount(average, lang)}`]} note={l(notes[state.firm])} />
        </Predict>
    )
    const samples: string[] = []
    for (let i = 0; i <= 120; i++) {
        const value = 10 ** (1 + (3 * i) / 120)
        samples.push(`${i ? 'L' : 'M'} ${logX(value).toFixed(1)} ${Y(averageCost(state.firm, value)).toFixed(1)}`)
    }
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={costChallenges} extraChallenges={costExtra} state={state}>
            <Board height={264} label={l(say(`${l(FIRM_NAMES[state.firm])}: batez besteko kostua, x unitate eginda`, `${l(FIRM_NAMES[state.firm])}: coste medio al hacer x unidades`, `${l(FIRM_NAMES[state.firm])}: متوسط التكلفة عند إنتاج x وحدة`, `${l(FIRM_NAMES[state.firm])}: average cost making x units`))}>
                {clip.defs}
                <rect x={LEFT} y={TOP} width={WIDTH} height={HEIGHT} fill={PAPER} />
                {[10, 100, 1000, 10000].map((tick) => <line key={tick} x1={logX(tick)} x2={logX(tick)} y1={TOP} y2={TOP + HEIGHT} stroke="#e6dfd2" strokeWidth={1} />)}
                <Rows max={setup.yMax} step={setup.yMax / 4} Y={Y} label={(y) => groupDigits(y, lang)} />
                {[10, 100, 1000, 10000].map((tick) => <text key={tick} x={logX(tick)} y={TOP + HEIGHT + 16} textAnchor="middle" fontSize={11} fill={MUTED}>{groupDigits(tick, lang)}</text>)}
                <text x={LEFT + WIDTH} y={TOP + HEIGHT + 30} textAnchor="end" fontSize={12} fontWeight={700} fill={MUTED}>x</text>
                <text x={LEFT + 4} y={TOP - 6} fontSize={12} fontWeight={700} fill={MUTED}>C(x)/x</text>
                {shown ? (
                    <g>
                        {setup.trend !== '>' && <line x1={LEFT} x2={LEFT + WIDTH} y1={Y(setup.perUnit)} y2={Y(setup.perUnit)} stroke={GREEN} strokeWidth={2} strokeDasharray="7 5" />}
                        <g clipPath={clip.url}><path d={samples.join(' ')} fill="none" stroke={STAGE} strokeWidth={3.2} /></g>
                        {average <= setup.yMax * 1.2 && <Full x={logX(x)} y={Y(average)} color={SECOND} />}
                        <text x={LEFT + WIDTH - 4} y={TOP + 16} textAnchor="end" fontSize={14} fontWeight={700} fill={SECOND} direction="ltr">{`${groupDigits(x, lang)} → ${amount(average, lang)}`}</text>
                    </g>
                ) : <Hidden x={190} y={120} />}
            </Board>
            <PlayButton label={l(say('Hazi produkzioa', 'Haz crecer la producción', 'زِد الإنتاج', 'Grow production'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L2. The tariff by brackets ---------- */

const TARIFF_NAMES: Record<TariffKind, LocalizedText> = {
    water: say('Ura', 'Agua', 'الماء', 'Water'),
    parking: say('Aparkalekua', 'Aparcamiento', 'الموقف', 'Car park'),
    power: say('Argia', 'Luz', 'الكهرباء', 'Electricity')
}

const TARIFF_UNITS: Record<TariffKind, string> = { water: 'm³', parking: 'h', power: 'kWh' }

export function TariffTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TariffState>(initialTariffState)
    const shown = state.prediction !== null
    const setup = TARIFF_SETUP[state.kind]
    const lang = props.language
    const playback = usePlayback(`${state.kind}-${state.k}`, 2600)
    const X = (x: number) => LEFT + (x / setup.xMax) * WIDTH
    const Y = (y: number) => TOP + HEIGHT - (y / setup.yMax) * HEIGHT
    const clip = useClip(LEFT, TOP, WIDTH, HEIGHT)
    const [left, right] = tariffSides(state)
    const jump = tariffJump(state)
    const ar = (value: number) => (lang === 'ar' ? String(value) : String(value).replace('.', '{,}'))
    const controls = (
        <>
            <Segmented<TariffKind> label={l(say('Tarifa', 'Tarifa', 'التعريفة', 'Tariff'))} value={state.kind} options={TARIFF_KINDS.map((kind) => ({ value: kind, label: l(TARIFF_NAMES[kind]) }))} onChange={(kind) => setState((s) => setTariff(s, { kind }))} />
            <Stepper label={l(say('Kuota finkoa, k', 'Cuota fija, k', 'الحصة الثابتة، k', 'Fixed charge, k'))} value={state.k} min={0} max={setup.kMax} onChange={(k) => setState((s) => setTariff(s, { k }))} language={lang} />
        </>
    )
    const note = jump === 0
        ? say('Ez dago jauzirik: muga igarotzean, faktura pixkanaka hazten da.', 'No hay salto: al pasar el límite del tramo, la factura sigue creciendo poco a poco.', 'لا توجد قفزة: عند تجاوز حد الشريحة تواصل الفاتورة النمو تدريجيًا.', 'There is no jump: going past the edge of the bracket, the bill keeps growing little by little.')
        : jump > 0
            ? say(`Jauzia gorantz: muga igarotzen duenak ${euro(jump, 'eu')} gehiago ordaintzen ditu bat-batean.`, `Salto hacia arriba: quien pasa el límite paga de golpe ${euro(jump, 'es')} más.`, `قفزة إلى الأعلى: من يتجاوز الحد يدفع فجأة ${euro(jump, 'ar')} إضافية.`, `A jump upwards: whoever goes past the edge suddenly pays ${euro(jump, 'en')} more.`)
            : say(`Jauzia beherantz: muga igarotzen duenak ${euro(-jump, 'eu')} gutxiago ordaintzen ditu, gehiago kontsumitu arren.`, `Salto hacia abajo: quien pasa el límite paga ${euro(-jump, 'es')} menos, aunque gaste más.`, `قفزة إلى الأسفل: من يتجاوز الحد يدفع ${euro(-jump, 'ar')} أقل رغم أنه يستهلك أكثر.`, `A jump downwards: whoever goes past the edge pays ${euro(-jump, 'en')} less, even though they use more.`)
    const letter = state.kind === 'parking' ? 't' : 'x'
    const readout = (
        <Predict
            language={lang}
            question={say(`Ikusi aurretik: $${tariffLatex(state)}$ tarifarekin, muga apur bat igarotzen duenak gutxiago, berdin ala gehiago ordaintzen du bat-batean?`, `Antes de verlo: con la tarifa $${tariffLatex(state)}$, quien pasa un poco el límite, ¿paga de golpe menos, lo mismo o más?`, `قبل أن ترى: مع التعريفة $${tariffLatex(state)}$، هل يدفع من يتجاوز الحد قليلًا فجأة أقل أم المبلغ نفسه أم أكثر؟`, `Before you see it: with the tariff $${tariffLatex(state)}$, does whoever goes just past the edge suddenly pay less, the same or more?`)}
            labels={{ '<': say('Gutxiago', 'Menos', 'أقل', 'Less'), '=': say('Berdin', 'Lo mismo', 'المبلغ نفسه', 'The same'), '>': say('Gehiago', 'Más', 'أكثر', 'More') }}
            actual={tariffPrediction(state)}
            choice={state.prediction}
            tip={say(`Kalkulatu bi zatiak $${letter}=${setup.boundary}$ puntuan eta alderatu.`, `Calcula los dos trozos en $${letter}=${setup.boundary}$ y compáralos.`, `احسب الجزأين عند $${letter}=${setup.boundary}$ وقارن بينهما.`, `Work out both pieces at $${letter}=${setup.boundary}$ and compare them.`)}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[arabicPoint(tariffLatex(state), lang), `f(${setup.boundary})=${ar(Math.round(left * 100) / 100)}\\qquad\\lim_{${letter}\\to ${setup.boundary}^+}f=${ar(Math.round(right * 100) / 100)}`]} note={l(note)} />
        </Predict>
    )
    const walking = shown && playback.progress !== null
    const customer = walking ? setup.boundary * (0.6 + 0.8 * playback.progress!) : null
    const xs = Array.from({ length: Math.floor(setup.xMax / setup.xStep) + 1 }, (_, i) => i * setup.xStep)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={tariffChallenges} extraChallenges={tariffExtra} state={state}>
            <Board height={264} label={l(say(`${l(TARIFF_NAMES[state.kind])}: faktura, kontsumoaren arabera`, `${l(TARIFF_NAMES[state.kind])}: la factura según el consumo`, `${l(TARIFF_NAMES[state.kind])}: الفاتورة حسب الاستهلاك`, `${l(TARIFF_NAMES[state.kind])}: the bill by use`))}>
                {clip.defs}
                <rect x={LEFT} y={TOP} width={WIDTH} height={HEIGHT} fill={PAPER} />
                {xs.map((x) => <line key={x} x1={X(x)} x2={X(x)} y1={TOP} y2={TOP + HEIGHT} stroke="#e6dfd2" strokeWidth={1} />)}
                <Rows max={setup.yMax} step={setup.yStep} Y={Y} label={(y) => `${y}`} />
                {xs.filter((x) => x > 0).map((x) => <text key={x} x={X(x)} y={TOP + HEIGHT + 16} textAnchor="middle" fontSize={11} fill={MUTED}>{x}</text>)}
                <text x={LEFT + WIDTH} y={TOP + HEIGHT + 30} textAnchor="end" fontSize={12} fontWeight={700} fill={MUTED}>{`${letter} (${TARIFF_UNITS[state.kind]})`}</text>
                <text x={LEFT + 4} y={TOP - 6} fontSize={12} fontWeight={700} fill={MUTED}>€</text>
                {shown ? (
                    <g>
                        <g clipPath={clip.url}>
                            <line x1={X(0)} y1={Y(0)} x2={X(setup.boundary)} y2={Y(left)} stroke={STAGE} strokeWidth={3.2} />
                            <line x1={X(setup.boundary)} y1={Y(right)} x2={X(setup.xMax)} y2={Y(bill(state, setup.xMax))} stroke={jump === 0 ? GREEN : SECOND} strokeWidth={3.2} />
                        </g>
                        {jump === 0
                            ? <Full x={X(setup.boundary)} y={Y(left)} color={GREEN} />
                            : (
                                <g>
                                    <line x1={X(setup.boundary)} x2={X(setup.boundary)} y1={Y(left)} y2={Y(right)} stroke={SECOND} strokeWidth={1.6} strokeDasharray="4 3" />
                                    <Full x={X(setup.boundary)} y={Y(left)} color={STAGE} />
                                    <Open x={X(setup.boundary)} y={Y(right)} color={SECOND} />
                                </g>
                            )}
                        {customer !== null && (
                            <g>
                                <circle cx={X(customer)} cy={Y(bill(state, customer))} r={7} fill={MUSTARD} stroke={INK} strokeWidth={1.4} />
                                <text x={LEFT + 6} y={TOP + 16} fontSize={14} fontWeight={700} fill={INK} direction="ltr">{lang === 'en' ? `€${amount(bill(state, customer), lang)}` : `${amount(bill(state, customer), lang)} €`}</text>
                            </g>
                        )}
                    </g>
                ) : <Hidden x={190} y={120} />}
            </Board>
            <PlayButton label={l(say('Bezeroa mugitu', 'Mueve al cliente', 'حرّك الزبون', 'Move the customer'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L3. Interest compounded more and more often ---------- */

const RATE_NAMES: Record<CompoundRate, string> = { r5: '5 %', r10: '10 %', r100: '100 %' }

export function CompoundTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CompoundState>(initialCompoundState)
    const shown = state.prediction !== null
    const lang = props.language
    const playback = usePlayback(`${state.rate}-${state.step}`, 2400)
    const step = shown && playback.progress !== null ? Math.round(playback.progress * (PERIODS.length - 1)) : state.step
    const n = PERIODS[step]
    const capital = capitalAfter(state.rate, n)
    const ceiling = ceilingOf(state.rate)
    const r = RATE_VALUE[state.rate]
    const low = CAPITAL
    const high = CAPITAL + (ceiling - CAPITAL) * 1.15
    const Y = (y: number) => TOP + HEIGHT - ((y - low) / (high - low)) * HEIGHT
    const barWidth = 30
    const barX = (index: number) => LEFT + 10 + index * 41
    const rTex = lang === 'ar' ? String(r) : String(r).replace('.', '{,}')
    const controls = (
        <>
            <Segmented<CompoundRate> label={l(say('Interesa, r', 'Interés, r', 'الفائدة، r', 'Interest, r'))} value={state.rate} options={COMPOUND_RATES.map((rate) => ({ value: rate, label: RATE_NAMES[rate] }))} onChange={(rate) => setState((s) => setCompound(s, { rate }))} />
            <Stepper label={l(say('Urtean zenbat aldiz, n', 'Veces al año, n', 'عدد المرات في السنة، n', 'Times a year, n'))} value={state.step} min={0} max={PERIODS.length - 1} format={(index) => groupDigits(PERIODS[index], lang)} onChange={(index) => setState((s) => setCompound(s, { step: index }))} language={lang} />
        </>
    )
    const period = PERIOD_NAMES[step]
    const readout = (
        <Predict
            language={lang}
            question={say('Ikusi aurretik: interesa gero eta maizago kapitalizatzen bada (urtean, hilean, egunean, orduan…), zer gertatzen zaio urte bateko kapitalari?', 'Antes de verlo: si el interés se capitaliza cada vez más a menudo (al año, al mes, al día, cada hora…), ¿qué le pasa al capital de un año?', 'قبل أن ترى: إذا رُسملت الفائدة بتكرار أكبر فأكبر (سنويًا، شهريًا، يوميًا، كل ساعة…)، فماذا يحدث لرأس المال بعد سنة؟', 'Before you see it: if the interest is compounded more and more often (yearly, monthly, daily, hourly…), what happens to the capital after a year?')}
            labels={{ '<': say('Sabai batera hurbiltzen da', 'Se acerca a un techo', 'يقترب من سقف', 'It approaches a ceiling'), '=': say('Ez da aldatzen', 'No cambia', 'لا يتغير', 'It does not change'), '>': say('Mugarik gabe hazten da', 'Crece sin límite', 'يكبر بلا حد', 'It grows without limit') }}
            actual={compoundPrediction()}
            choice={state.prediction}
            tip={say('$\\left(1+\\frac{r}{n}\\right)^{n}$ forma $1^{\\infty}$ da: begiratu $e$ zenbakiaren formulari.', '$\\left(1+\\frac{r}{n}\\right)^{n}$ es de la forma $1^{\\infty}$: mira la fórmula del número $e$.', '$\\left(1+\\frac{r}{n}\\right)^{n}$ من الصورة $1^{\\infty}$: انظر إلى صيغة العدد $e$.', '$\\left(1+\\frac{r}{n}\\right)^{n}$ has the form $1^{\\infty}$: look at the formula of the number $e$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[`1000\\left(1+\\frac{${rTex}}{${groupLatex(n)}}\\right)^{${groupLatex(n)}}=${texAmount(capital, lang)}`, `1000\\,e^{${rTex}}\\approx ${texAmount(ceiling, lang)}`]} note={l(say(`Kapitalizazioa ${period.eu}: sabaitik ${euro(ceiling - capital, 'eu')} falta dira. Maizago kapitalizatuz gero ere, ez da inoiz $1000\\,e^{r}$ gainditzen.`, `Capitalización ${period.es}: faltan ${euro(ceiling - capital, 'es')} para el techo. Por más a menudo que se capitalice, nunca pasa de $1000\\,e^{r}$.`, `رسملة ${period.ar}: ينقص ${euro(ceiling - capital, 'ar')} عن السقف. ومهما زاد تكرار الرسملة فلن يتجاوز $1000\\,e^{r}$.`, `Compounding ${period.en}: ${euro(ceiling - capital, 'en')} short of the ceiling. However often it is compounded, it never goes past $1000\\,e^{r}$.`))} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={compoundChallenges} extraChallenges={compoundExtra} state={state}>
            <Board height={264} label={l(say('Urte bateko kapitala, n aldiz kapitalizatuta', 'El capital de un año, capitalizando n veces', 'رأس المال بعد سنة مع رسملة n مرة', 'The capital after a year, compounding n times'))}>
                <rect x={LEFT} y={TOP} width={WIDTH} height={HEIGHT} fill={PAPER} />
                <line x1={LEFT} x2={LEFT + WIDTH} y1={TOP + HEIGHT} y2={TOP + HEIGHT} stroke={INK} strokeWidth={1.4} />
                <text x={LEFT - 5} y={TOP + HEIGHT + 4} textAnchor="end" fontSize={11} fill={MUTED}>{groupDigits(CAPITAL, lang)}</text>
                {PERIODS.map((value, index) => <text key={value} x={barX(index) + barWidth / 2} y={TOP + HEIGHT + 16} textAnchor="middle" fontSize={11} fill={index === step ? INK : MUTED} fontWeight={index === step ? 700 : 400}>{groupDigits(value, lang)}</text>)}
                <text x={LEFT + WIDTH} y={TOP + HEIGHT + 32} textAnchor="end" fontSize={12} fontWeight={700} fill={MUTED}>n</text>
                {shown ? (
                    <g>
                        {PERIODS.map((value, index) => index <= step && <rect key={value} x={barX(index)} y={Y(capitalAfter(state.rate, value))} width={barWidth} height={TOP + HEIGHT - Y(capitalAfter(state.rate, value))} fill={index === step ? STAGE : '#c9d8f2'} />)}
                        <line x1={LEFT} x2={LEFT + WIDTH} y1={Y(ceiling)} y2={Y(ceiling)} stroke={GREEN} strokeWidth={2} strokeDasharray="7 5" />
                        <text x={LEFT + WIDTH - 2} y={Y(ceiling) - 6} textAnchor="end" fontSize={13} fontWeight={700} fill={GREEN} direction="ltr">1000·e<tspan dy={-6} fontSize={10}>{lang === 'ar' ? String(r) : String(r).replace('.', decimalSeparatorFor(lang))}</tspan><tspan dy={6}>{` ≈ ${amount(ceiling, lang)}`}</tspan></text>
                        <text x={LEFT + 4} y={TOP + 14} fontSize={13} fontWeight={700} fill={STAGE} direction="ltr">{amount(capitalOf({ rate: state.rate, step }), lang)}</text>
                    </g>
                ) : <Hidden x={190} y={120} />}
            </Board>
            <PlayButton label={l(say('Kapitalizatu maizago', 'Capitaliza más a menudo', 'رسمِل بتكرار أكبر', 'Compound more often'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}
