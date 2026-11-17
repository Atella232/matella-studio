import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { Plane, PlanePath, PlanePoint } from '../../dbh2-funtzioak-v2/plane'
import { standardStars } from '../../dbh4-games/equations'
import { sampled } from '../../dbh4-aplikatuak-funtzioak/functions'
import '../../dbh2-funtzioak-v2/Functions.css'
import '../../dbh4-games/Dbh4Games.css'
import { say } from '../text'
import { billFor, BILL_ROUNDS, createBillRounds, type BillRound, type BillUnit } from './bill'
import { createEstimateRounds, ESTIMATE_BOX, ESTIMATE_ROUNDS, estimateOf, isEstimateRight, type EstimateKind, type EstimateRound } from './estimate'
import { bestOf, createPriceRounds, PRICE_ROUNDS, quantityAt, unitsAtStart, valueAt, type PriceRound } from './price'
import './SocFunctionsGames.css'

/* ==========================================================================
   Estima el dato, El precio justo and La factura a trozos (Funtzio
   elementalak, Batxilergoa 1 · Gizarte Zientziak): the first asks to say
   interpolating or extrapolating and tap the estimate on the grid; the
   second shows the rectangle p × q of each price card; the third draws the
   broken line of a tariff and asks for a bill or an amount.
   ========================================================================== */

const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const CHECK = say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check')
const RED = 'var(--second, #c4432a)'
const BLUE = 'var(--blue, #2f6fdb)'
const GREEN = 'var(--success, #267b53)'
const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const MUSTARD = 'var(--mustard, #e0a100)'
const MUSTARD_TINT = 'var(--mustard-tint, #fbebc0)'
const RED_TINT = '#f6d5cc'
const GREEN_TINT = 'var(--success-tint, #d9efe2)'
const PAPER = 'var(--card, #fffcf6)'
const GRID = '#e6dfd2'

/** A number for LaTeX, with the decimal comma */
const tex = (value: number) => String(Math.round(value * 100) / 100).replace('.', '{,}')
/** Euros in words: 0,15 € in Basque, Spanish and Arabic, €0.15 in English */
const euros = (value: number, language: UnitLanguage) => {
    const number = String(Math.round(value * 100) / 100)
    if (language === 'en') return `€${number}`
    return `${language === 'ar' ? number : number.replace('.', ',')} €`
}

/** A row of choice buttons */
function Choices<Value extends string | number>({ values, label, chosen, disabled, onChoose }: { values: Value[]; label: (value: Value) => ReactNode; chosen: Value | null; disabled: boolean; onChoose: (value: Value) => void }) {
    return (
        <div className="soc-fn-choices">
            {values.map((value) => (
                <button key={String(value)} type="button" className={`soc-fn-choice${chosen === value ? ' chosen' : ''}`} aria-pressed={chosen === value} disabled={disabled} onClick={() => onChoose(value)}>{label(value)}</button>
            ))}
        </div>
    )
}

/* ---------- Estima el dato ---------- */

const KIND_LABEL: Record<EstimateKind, LocalizedText> = {
    inter: say('Interpolatzea', 'Interpolar', 'استيفاء', 'Interpolating'),
    extra: say('Estrapolatzea', 'Extrapolar', 'استقراء خارجي', 'Extrapolating')
}

function EstimatePlay({ round, language, onAnswer, answered }: RoundProps<EstimateRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<[number, number] | null>(null)
    const [kind, setKind] = useState<EstimateKind | null>(null)
    const right = isEstimateRight(round, picked, kind)
    const names = ['A', 'B', 'C']
    const data = round.data.map(([x, y], index) => `${names[index]}(${x},${y})`).join(',\\ ')
    const parabolic = round.mode === 'parabolic'
    const [[x1, y1], [x2, y2]] = round.data
    const working = parabolic
        ? [`${round.target}\\ \\to\\ y=${tex(round.answer[1])}`, `${tex(round.lineValue ?? 0)}\\ \\neq\\ ${tex(round.answer[1])}`]
        : [`m=\\frac{${y2}-${y1}}{${x2}-${x1}}=${tex((y2 - y1) / (x2 - x1))}`, `${y1}+${tex((y2 - y1) / (x2 - x1))}\\cdot(${round.target}-${x1})=${tex(round.answer[1])}`]
    return (
        <>
            <div className="dbh4-big-formula soc-fn-big" dir="ltr">{formula(data, language)}</div>
            <p className="prop3-prompt"><MathText text={l(parabolic
                ? say(`Hiru datuen parabolarekin, estimatu $y$, $x=${round.target}$ denean. Interpolatzea ala estrapolatzea da?`, `Con la parábola de los tres datos, estima $y$ en $x=${round.target}$. ¿Es interpolar o extrapolar?`, `بالقطع المكافئ للبيانات الثلاث قدّر $y$ عند $x=${round.target}$. هل هو استيفاء أم استقراء خارجي؟`, `With the parabola of the three data, estimate $y$ at $x=${round.target}$. Is it interpolating or extrapolating?`)
                : say(`Bi datuen zuzenarekin, estimatu $y$, $x=${round.target}$ denean. Interpolatzea ala estrapolatzea da?`, `Con la recta de los dos datos, estima $y$ en $x=${round.target}$. ¿Es interpolar o extrapolar?`, `بمستقيم البيانتين قدّر $y$ عند $x=${round.target}$. هل هو استيفاء أم استقراء خارجي؟`, `With the line of the two data, estimate $y$ at $x=${round.target}$. Is it interpolating or extrapolating?`))} /></p>
            <Choices<EstimateKind> values={['inter', 'extra']} label={(value) => l(KIND_LABEL[value])} chosen={kind} disabled={answered} onChoose={setKind} />
            <div className="soc-fn-plane">
                <Plane
                    box={{ xMin: 0, xMax: ESTIMATE_BOX, yMin: 0, yMax: ESTIMATE_BOX }}
                    cell={30}
                    labelStep={2}
                    maxHeight={340}
                    label={l(say('Datuen sarea', 'La cuadrícula de los datos', 'شبكة البيانات', 'The grid of the data'))}
                    onPick={answered ? undefined : (point) => setPicked([point[0], point[1]])}
                >
                    {(map) => (
                        <g>
                            <PlanePath map={map} points={[[round.target, 0], [round.target, ESTIMATE_BOX]]} color={MUTED} width={1.6} dashed />
                            {answered && <PlanePath map={map} points={sampled((x) => estimateOf(round, x), 0, ESTIMATE_BOX, 0.05).filter(([, y]) => y >= -0.5 && y <= ESTIMATE_BOX + 0.5)} color={GREEN} width={2.6} />}
                            {round.data.map((point, index) => <PlanePoint key={index} map={map} point={point} color={INK} name={names[index]} radius={6.5} />)}
                            {picked && <PlanePoint map={map} point={picked} color={answered && !right ? RED : BLUE} radius={7} hollow={!answered || !right} />}
                            {answered && <PlanePoint map={map} point={round.answer} color={GREEN} radius={7} />}
                        </g>
                    )}
                </Plane>
            </div>
            {!answered && (
                <div className="prop3-panel">
                    <p className="soc-fn-picked" dir="ltr">{picked ? formula(`(${picked[0]},${picked[1]})`, language) : '—'}</p>
                    <button type="button" className="fraction-v2-primary" disabled={picked === null || kind === null} onClick={() => onAnswer(right)}>{l(CHECK)}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked"><MathText text={l(KIND_LABEL[round.kind])} /></span>
                    {working.map((line) => <span key={line} className="dbh4-worked">{formula(line, language)}</span>)}
                    {parabolic && <span className="dbh4-worked"><MathText text={l(say('Zuzenak beste puntu bat emango luke.', 'La recta daría otro punto.', 'كان المستقيم سيعطي نقطة أخرى.', 'The line would give another point.'))} /></span>}
                </RoundVerdict>
            )}
        </>
    )
}

export function EstimateGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: ESTIMATE_ROUNDS,
                rules: [
                    say('Datu batzuk ematen dira sarean, eta $x$ helburu bat.', 'Te dan unos datos en la cuadrícula y un $x$ objetivo.', 'تُعطى بيانات على الشبكة وقيمة $x$ هدف.', 'You get some data on the grid and a target $x$.'),
                    say('Datuen artean, interpolatzea da; kanpoan, estrapolatzea.', 'Entre los datos es interpolar; fuera, extrapolar.', 'بين البيانات استيفاء، وخارجها استقراء خارجي.', 'Between the data it is interpolating; outside, extrapolating.'),
                    say('Aukeratu mota, sakatu sarean estimazioa eta egiaztatu.', 'Elige el tipo, toca la estimación en la cuadrícula y comprueba.', 'اختر النوع والمس التقدير على الشبكة وتحقّق.', 'Choose the kind, tap the estimate on the grid and check.')
                ],
                create: createEstimateRounds,
                stars: standardStars(ESTIMATE_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: EstimatePlay
            }}
        />
    )
}

/* ---------- El precio justo ---------- */

function DemandBoard({ round, price }: { round: PriceRound; price: number | null }) {
    const top = round.A / round.B
    // At most six price marks: 5, 10, 20, 25, 50 or 100 euros apart
    const tick = [5, 10, 20, 25, 50, 100].find((size) => Math.ceil(top / size) <= 6) ?? 100
    const axis = Math.ceil(top / tick) * tick
    const unitsTop = Math.ceil(round.A / 20) * 20
    const X = (p: number) => 46 + (p / axis) * 290
    const Y = (q: number) => 200 - (q / unitsTop) * 176
    const q = price === null ? 0 : quantityAt(round, price)
    const cost = round.kind === 'profit' ? Math.min(round.v, price ?? 0) : 0
    const ticks = Array.from({ length: axis / tick + 1 }, (_, i) => i * tick)
    return (
        <svg className="soc-fn-board" viewBox="0 0 360 226" role="img" aria-hidden="true" direction="ltr">
            <rect x={X(0)} y={Y(unitsTop)} width={X(axis) - X(0)} height={Y(0) - Y(unitsTop)} fill={PAPER} />
            {ticks.map((p) => <line key={p} x1={X(p)} x2={X(p)} y1={Y(0)} y2={Y(unitsTop)} stroke={GRID} strokeWidth={1} />)}
            {price !== null && q > 0 && (
                <g>
                    {round.kind === 'profit' && <rect x={X(0)} y={Y(q)} width={X(cost) - X(0)} height={Y(0) - Y(q)} fill={RED_TINT} stroke={RED} strokeWidth={1.4} />}
                    <rect x={X(cost)} y={Y(q)} width={X(price) - X(cost)} height={Y(0) - Y(q)} fill={round.kind === 'profit' ? GREEN_TINT : MUSTARD_TINT} stroke={round.kind === 'profit' ? GREEN : MUSTARD} strokeWidth={1.6} />
                </g>
            )}
            <line x1={X(0)} y1={Y(round.A)} x2={X(top)} y2={Y(0)} stroke={BLUE} strokeWidth={3} />
            <line x1={X(0)} x2={X(axis) + 4} y1={Y(0)} y2={Y(0)} stroke={INK} strokeWidth={1.5} />
            <line x1={X(0)} x2={X(0)} y1={Y(0)} y2={Y(unitsTop) - 4} stroke={INK} strokeWidth={1.5} />
            {ticks.map((p) => <text key={p} x={X(p)} y={Y(0) + 15} textAnchor="middle" fontSize={12} fill={MUTED}>{p}</text>)}
            {[unitsTop / 2, unitsTop].map((units) => <text key={units} x={X(0) - 5} y={Y(units) + 4} textAnchor="end" fontSize={12} fill={MUTED}>{units}</text>)}
            <text x={X(0) + 6} y={Y(unitsTop) + 14} fontSize={14} fontWeight={700} fontStyle="italic" fill={BLUE}>q</text>
            <text x={X(axis) - 2} y={Y(0) - 6} textAnchor="end" fontSize={14} fontWeight={700} fontStyle="italic" fill={INK}>p</text>
            {price !== null && q > 0 && <circle cx={X(price)} cy={Y(q)} r={5.5} fill={INK} stroke={PAPER} strokeWidth={1.4} />}
        </svg>
    )
}

function priceQuestion(round: PriceRound): LocalizedText {
    if (round.kind === 'raise') {
        const units = unitsAtStart(round)
        return say(`Denda batek ${units} unitate saltzen ditu ${round.start} euroan, eta ${round.step} euroko igoera bakoitzeko ${round.loss} gutxiago saltzen ditu. Zein preziok ematen ditu diru-sarrerarik handienak?`, `Una tienda vende ${units} unidades a ${round.start} €, y por cada ${round.step} € de subida vende ${round.loss} menos. ¿Qué precio da los mayores ingresos?`, `يبيع متجر ${units} وحدة بسعر ${round.start} €، ومقابل كل زيادة ${round.step} € يبيع ${round.loss} أقل. أي سعر يعطي أكبر الإيرادات؟`, `A shop sells ${units} units at €${round.start}, and for every €${round.step} rise it sells ${round.loss} fewer. Which price gives the greatest revenue?`)
    }
    const demand = `$q=${round.A}-${round.B}p$`
    if (round.kind === 'profit') return say(`${demand} unitate saltzen dira $p$ euroan, eta bakoitzak ${round.v} € kostatzen ditu. Zein preziok ematen du mozkinik handiena?`, `Se venden ${demand} unidades a $p$ euros y cada una cuesta ${round.v} €. ¿Qué precio da el mayor beneficio?`, `تُباع ${demand} وحدة بسعر $p$ يورو وتكلّف كل وحدة ${round.v} €. أي سعر يعطي أكبر ربح؟`, `${demand} units sell at $p$ euros and each costs €${round.v}. Which price gives the greatest profit?`)
    return say(`${demand} unitate saltzen dira $p$ euroan. Zein preziok ematen ditu diru-sarrerarik handienak?`, `Se venden ${demand} unidades a $p$ euros. ¿Qué precio da los mayores ingresos?`, `تُباع ${demand} وحدة بسعر $p$ يورو. أي سعر يعطي أكبر الإيرادات؟`, `${demand} units sell at $p$ euros. Which price gives the greatest revenue?`)
}

function PricePlay({ round, language, onAnswer, answered }: RoundProps<PriceRound>) {
    const l = useGameText(language)
    const [chosen, setChosen] = useState<number | null>(null)
    const right = chosen === round.answer
    const name = round.kind === 'profit' ? 'B' : 'I'
    const best = bestOf(round)
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(priceQuestion(round))} /></p>
            <DemandBoard round={round} price={chosen} />
            <p className="soc-fn-note"><MathText text={l(say('Sakatu prezio bat haren laukizuzena ikusteko.', 'Toca un precio para ver su rectángulo.', 'المس سعرًا لترى مستطيله.', 'Tap a price to see its rectangle.'))} /></p>
            <Choices<number> values={round.options} label={(value) => euros(value, language)} chosen={chosen} disabled={answered} onChoose={setChosen} />
            {!answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" disabled={chosen === null} onClick={() => onAnswer(right)}>{l(CHECK)}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    {round.kind === 'raise'
                        ? <span className="dbh4-worked">{formula(`I(x)=(${round.start}+${round.step}x)(${unitsAtStart(round)}-${round.loss}x)\\ \\to\\ x=${(best - round.start) / round.step}`, language)}</span>
                        : <span className="dbh4-worked">{formula(round.kind === 'profit' ? `p=\\frac{${round.A / round.B}+${round.v}}{2}=${tex(best)}` : `p=\\frac{${round.A}}{2\\cdot ${round.B}}=${tex(best)}`, language)}</span>}
                    <span className="dbh4-worked">{formula(`${name}(${round.answer})=${tex(valueAt(round, round.answer))}`, language)}</span>
                    {chosen !== null && chosen !== round.answer && <span className="dbh4-worked">{formula(`${name}(${chosen})=${tex(valueAt(round, chosen))}`, language)}</span>}
                </RoundVerdict>
            )}
        </>
    )
}

export function PriceGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: PRICE_ROUNDS,
                rules: [
                    say('Prezioa igotzean gutxiago saltzen da: laukizuzena prezioa bider kopurua da.', 'Al subir el precio se vende menos: el rectángulo es precio por cantidad.', 'عندما يرتفع السعر تقل المبيعات: المستطيل هو السعر في الكمية.', 'When the price goes up, less is sold: the rectangle is price times quantity.'),
                    say('Mozkinarekin, gorria kostua da, eta berdea irabazten dena.', 'Con beneficio, lo rojo es el coste y lo verde lo que se gana.', 'مع الربح، الأحمر هو التكلفة والأخضر ما نكسبه.', 'With profit, the red part is the cost and the green one what is earned.'),
                    say('Aukeratu gehien ematen duen prezioa, eta egiaztatu.', 'Elige el precio que más da y comprueba.', 'اختر السعر الذي يعطي أكثر وتحقّق.', 'Choose the price that brings in most and check.')
                ],
                create: createPriceRounds,
                stars: standardStars(PRICE_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: PricePlay
            }}
        />
    )
}

/* ---------- La factura a trozos ---------- */

const UNIT_WORD: Record<BillUnit, LocalizedText> = {
    kwh: say('kWh', 'kWh', 'kWh', 'kWh'),
    m3: say('m³', 'm³', 'm³', 'm³'),
    copies: say('kopia', 'copias', 'نسخة', 'copies'),
    minutes: say('minutu', 'minutos', 'دقيقة', 'minutes')
}

function BillBoard({ round, answered }: { round: BillRound; answered: boolean }) {
    const xMax = Math.ceil((Math.max(round.amount, round.limit) * 1.25) / 20) * 20
    const yMax = Math.ceil(billFor(round, xMax) / 10) * 10
    const X = (x: number) => 46 + (x / xMax) * 290
    const Y = (y: number) => 196 - (y / yMax) * 172
    const xTicks = [0, round.limit, xMax]
    return (
        <svg className="soc-fn-board" viewBox="0 0 360 222" role="img" aria-hidden="true" direction="ltr">
            <rect x={X(0)} y={Y(yMax)} width={X(xMax) - X(0)} height={Y(0) - Y(yMax)} fill={PAPER} />
            <line x1={X(round.limit)} x2={X(round.limit)} y1={Y(0)} y2={Y(yMax)} stroke={MUTED} strokeWidth={1.2} strokeDasharray="4 4" />
            <path d={`M ${X(0)} ${Y(round.fixed)} L ${X(round.limit)} ${Y(billFor(round, round.limit))}`} stroke={BLUE} strokeWidth={3.2} fill="none" />
            <path d={`M ${X(round.limit)} ${Y(billFor(round, round.limit))} L ${X(xMax)} ${Y(billFor(round, xMax))}`} stroke={GREEN} strokeWidth={3.2} fill="none" />
            <line x1={X(0)} x2={X(xMax) + 4} y1={Y(0)} y2={Y(0)} stroke={INK} strokeWidth={1.5} />
            <line x1={X(0)} x2={X(0)} y1={Y(0)} y2={Y(yMax) - 4} stroke={INK} strokeWidth={1.5} />
            {xTicks.map((x) => <text key={x} x={X(x)} y={Y(0) + 15} textAnchor="middle" fontSize={12} fill={MUTED}>{x}</text>)}
            {[yMax / 2, yMax].map((y) => <text key={y} x={X(0) - 5} y={Y(y) + 4} textAnchor="end" fontSize={12} fill={MUTED}>{y}</text>)}
            {round.fixed > 0 && <text x={X(0) + 6} y={Y(round.fixed) - 6} fontSize={12} fill={BLUE}>{round.fixed}</text>}
            <text x={X(0) + 6} y={Y(yMax) + 14} fontSize={14} fontWeight={700} fontStyle="italic" fill={INK}>C</text>
            <text x={X(xMax) - 2} y={Y(0) - 6} textAnchor="end" fontSize={14} fontWeight={700} fontStyle="italic" fill={INK}>x</text>
            {answered && <circle cx={X(round.amount)} cy={Y(round.bill)} r={7} fill={RED} stroke={PAPER} strokeWidth={1.6} />}
        </svg>
    )
}

function billQuestion(round: BillRound, language: UnitLanguage): LocalizedText {
    const unit = UNIT_WORD[round.unit]
    const r1 = euros(round.r1 / 100, language)
    const r2 = euros(round.r2 / 100, language)
    const fixed = euros(round.fixed, language)
    const words = say(
        `${round.fixed > 0 ? `${fixed} finko; ` : ''}${r1} ${unit.eu} bakoitzeko ${round.limit} ${unit.eu} arte, eta ${r2} hortik aurrera.`,
        `${round.fixed > 0 ? `${fixed} fijos; ` : ''}${r1} por cada unidad (${unit.es}) hasta ${round.limit} y ${r2} a partir de ahí.`,
        `${round.fixed > 0 ? `${fixed} ثابتة؛ ` : ''}${r1} لكل وحدة (${unit.ar}) حتى ${round.limit} و${r2} بعد ذلك.`,
        `${round.fixed > 0 ? `${fixed} fixed; ` : ''}${r1} per unit (${unit.en}) up to ${round.limit} and ${r2} after that.`
    )
    if (round.level === 2) {
        const bill = euros(round.bill, language)
        return say(`${words.eu} Faktura ${bill} izan da. Zenbat ${unit.eu} kontsumitu dira?`, `${words.es} La factura ha sido de ${bill}. ¿Cuántas unidades se gastaron?`, `${words.ar} كانت الفاتورة ${bill}. كم وحدة استُهلكت؟`, `${words.en} The bill was ${bill}. How many units were used?`)
    }
    if (round.level === 1) return say(`${words.eu} Zenbat ordaintzen da ${round.amount} ${unit.eu} kontsumituta?`, `${words.es} ¿Cuánto se paga por ${round.amount} unidades?`, `${words.ar} كم يُدفع مقابل ${round.amount} وحدة؟`, `${words.en} How much is paid for ${round.amount} units?`)
    return say(`Zenbat da $C(${round.amount})$, eurotan?`, `¿Cuánto vale $C(${round.amount})$, en euros?`, `كم تساوي $C(${round.amount})$ باليورو؟`, `What is $C(${round.amount})$, in euros?`)
}

/** The tariff as a piecewise formula (level 1), shown in its own block above the question */
function billCases(round: BillRound): string {
    const first = `${round.fixed > 0 ? `${round.fixed}+` : ''}${tex(round.r1 / 100)}x`
    const second = `${round.fixed > 0 ? `${round.fixed}+` : ''}${tex((round.r1 * round.limit) / 100)}+${tex(round.r2 / 100)}(x-${round.limit})`
    return `C(x)=\\begin{cases}${first} & x\\le ${round.limit}\\\\ ${second} & x>${round.limit}\\end{cases}`
}

function BillPlay({ round, language, onAnswer, answered }: RoundProps<BillRound>) {
    const l = useGameText(language)
    const [chosen, setChosen] = useState<number | null>(null)
    const right = chosen === round.answer
    const reverse = round.level === 2
    const parts = round.amount <= round.limit
        ? `${round.fixed > 0 ? `${round.fixed}+` : ''}${tex(round.r1 / 100)}\\cdot ${round.amount}=${tex(round.bill)}`
        : `${round.fixed > 0 ? `${round.fixed}+` : ''}${tex(round.r1 / 100)}\\cdot ${round.limit}+${tex(round.r2 / 100)}\\cdot ${round.amount - round.limit}=${tex(round.bill)}`
    return (
        <>
            {round.level === 0 && <div className="dbh4-big-formula soc-fn-big" dir="ltr">{formula(billCases(round), language)}</div>}
            <p className="prop3-prompt"><MathText text={l(billQuestion(round, language))} /></p>
            <BillBoard round={round} answered={answered} />
            <Choices<number> values={round.options} label={(value) => (reverse ? String(value) : euros(value, language))} chosen={chosen} disabled={answered} onChoose={setChosen} />
            {!answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" disabled={chosen === null} onClick={() => onAnswer(right)}>{l(CHECK)}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked">{formula(parts, language)}</span>
                    {reverse && <span className="dbh4-worked">{formula(`x=${round.amount}`, language)}</span>}
                </RoundVerdict>
            )}
        </>
    )
}

export function BillGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: BILL_ROUNDS,
                rules: [
                    say('Tarifak bi prezio ditu: bat mugaraino, eta beste bat mugaz gaindiko unitateentzat.', 'La tarifa tiene dos precios: uno hasta el límite y otro para las unidades que lo pasan.', 'للتعرفة سعران: واحد حتى الحدّ وآخر للوحدات التي تتجاوزه.', 'The tariff has two prices: one up to the limit and another for the units beyond it.'),
                    say('Lehen unitateek lehen prezioa dute beti; ez ahaztu zati finkoa.', 'Las primeras unidades van siempre al primer precio; no olvides la parte fija.', 'الوحدات الأولى دائمًا بالسعر الأول؛ ولا تنسَ الجزء الثابت.', 'The first units always keep the first price; do not forget the fixed part.'),
                    say('Aukeratu txartel bat eta egiaztatu.', 'Elige una tarjeta y comprueba.', 'اختر بطاقة وتحقّق.', 'Choose a card and check.')
                ],
                create: createBillRounds,
                stars: standardStars(BILL_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: BillPlay
            }}
        />
    )
}
