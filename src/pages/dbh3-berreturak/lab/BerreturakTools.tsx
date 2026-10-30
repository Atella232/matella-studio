import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { decimalSeparatorFor } from '../../../utils/numberFormat'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { scaleChallenges, scaleCorrect, scaleExtra, scaleObjects, SCALE_RANGE, initialScaleState, revealScale, setScale, type ScaleState } from './scale'
import { initialSpiralState, setSpiral, spiralChallenges, spiralExact, spiralExtra, spiralPoints, spiralRoot, SPIRAL_LIMITS, type SpiralState } from './spiral'
import { initialSquareState, maxSide, setSquare, squareChallenges, squareExtra, squareFits, squareInside, squareSimplified, SQUARE_LIMITS, type SquareState } from './square'
import { initialTokensState, setTokens, TOKEN_BASES, TOKEN_LIMITS, tokensCancelled, tokensChallenges, tokensExtra, tokensNet, tokensValue, type TokensState } from './tokens'

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const SECOND_TINT = '#f6d5cc'
const MUSTARD = 'var(--mustard, #e0a100)'
const MUSTARD_TINT = 'var(--mustard-tint, #fbebc0)'
const CARD = 'var(--card, #fffcf6)'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const SUPERSCRIPT: Record<string, string> = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '-': '⁻' }
const sup = (value: number | string) => String(value).split('').map((digit) => SUPERSCRIPT[digit] ?? digit).join('')
/** A decimal written with the language's decimal mark: the point in Arabic and English, the comma in Spanish and Basque */
const dec = (value: number, language: UnitLanguage, digits = 2) => String(Math.round(value * 10 ** digits) / 10 ** digits).replace('.', language === 'ar' ? '.' : decimalSeparatorFor(language))
/** A decimal for LaTeX: {,} for the comma (MathText writes it as the point in English), the point in Arabic */
const texDec = (value: number, language: UnitLanguage, digits = 2) => String(Math.round(value * 10 ** digits) / 10 ** digits).replace('.', language === 'ar' ? '.' : '{,}')
const decimalText = (text: string, language: UnitLanguage) => (language === 'ar' ? text.replace(',', '.') : text.replace(',', decimalSeparatorFor(language)))

/** The 360-wide board every tool here draws on: legible on a phone */
function Board({ height, label, children }: { height: number; label: string; children: ReactNode }) {
    return (
        <svg viewBox={`0 0 360 ${height}`} direction="ltr" role="img" aria-label={label} style={{ display: 'block', width: '100%', maxWidth: 520, height: 'auto', margin: '0 auto', fontFamily: '"Atkinson Hyperlegible", "Noto Sans Arabic", system-ui, sans-serif' }}>
            {children}
        </svg>
    )
}

function Text({ x, y, children, color = INK, size = 15, anchor = 'middle', weight = 700 }: { x: number; y: number; children: ReactNode; color?: string; size?: number; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color}>{children}</text>
}

function Readout({ latex, note }: { latex: string; note: string }) {
    return (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${latex}$`} /></span>
            <span className="fraction-v2-lab-readout-note">{note}</span>
        </>
    )
}

/* ---------- L1. Tokens that cancel ---------- */

const TOKEN_STEP = 26
const TOKEN_LEFT = 30

export function TokensTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TokensState>(initialTokensState)
    const base = TOKEN_BASES[state.base]
    const net = tokensNet(state)
    const cancelled = tokensCancelled(state)
    const numerator = state.m + state.n
    const value = tokensValue(state)
    const controls = (
        <>
            <Segmented label={l(say('Oinarria', 'Base', 'الأساس', 'Base'))} value={String(state.base)} options={TOKEN_BASES.map((candidate, index) => ({ value: String(index), label: String(candidate) }))} onChange={(next) => setState((s) => setTokens(s, { base: Number(next) }))} />
            <Stepper label={l(say('m (goian)', 'm (arriba)', 'm (أعلى)', 'm (top)'))} value={state.m} min={0} max={TOKEN_LIMITS.m} format={(v) => `${base}${sup(v)}`} onChange={(next) => setState((s) => setTokens(s, { m: next }))} language={props.language} />
            <Stepper label={l(say('n (goian)', 'n (arriba)', 'n (أعلى)', 'n (top)'))} value={state.n} min={0} max={TOKEN_LIMITS.n} format={(v) => `${base}${sup(v)}`} onChange={(next) => setState((s) => setTokens(s, { n: next }))} language={props.language} />
            <Stepper label={l(say('p (behean)', 'p (abajo)', 'p (أسفل)', 'p (bottom)'))} value={state.p} min={0} max={TOKEN_LIMITS.p} format={(v) => `${base}${sup(v)}`} onChange={(next) => setState((s) => setTokens(s, { p: next }))} language={props.language} />
        </>
    )
    const parts = [state.m > 0 || state.n === 0 ? `${base}^{${state.m}}` : '', state.n > 0 ? `${base}^{${state.n}}` : ''].filter(Boolean).join('\\cdot ')
    const result = net === 0 ? '1' : net > 0 ? `${base}^{${net}}=${value.numerator}` : `${base}^{${net}}=\\frac{1}{${value.denominator}}`
    const latex = `\\frac{${parts}}{${base}^{${state.p}}}=${net === 0 ? `${base}^{0}=1` : result}`
    const token = (x: number, y: number, color: string, tint: string, faded: boolean, key: string) => (
        <g key={key} opacity={faded ? 0.3 : 1}>
            <circle cx={x} cy={y} r={11} fill={tint} stroke={color} strokeWidth={2} />
            <Text x={x} y={y + 5} size={13}>{base}</Text>
        </g>
    )
    return (
        <ToolFrame {...props} controls={controls} state={state} challenges={tokensChallenges} extraChallenges={tokensExtra}
            readout={<Readout latex={latex} note={net === 0 ? l(say('Fitxa guztiak bikoteka kendu dira: emaitza $1$ da.', 'Todas las fichas se anularon por parejas: el resultado es 1.', 'تلاشت كل الرقاقات بالأزواج: النتيجة 1.', 'All the counters cancelled out in pairs: the result is 1.')) : net > 0 ? l(say(`${net} fitxa geratu dira goian: berretzaile positiboa.`, `Sobran ${net} fichas arriba: exponente positivo.`, `بقيت ${net} رقاقات في الأعلى: أس موجب.`, `${net} counters are left over on top: positive exponent.`)) : l(say(`${-net} fitxa geratu dira behean: berretzaile negatiboa.`, `Sobran ${-net} fichas abajo: exponente negativo.`, `بقيت ${-net} رقاقات في الأسفل: أس سالب.`, `${-net} counters are left over at the bottom: negative exponent.`))}
            />}>
            <Board height={214} label={l(say('Goiko eta beheko fitxak bikoteka kentzen dira', 'Las fichas de arriba y de abajo se anulan por parejas', 'تتلاشى الرقاقات العلوية والسفلية بالأزواج', 'Counters on top and at the bottom cancel out in pairs'))}>
                <Text x={20} y={22} anchor="start" size={14} color={MUTED} weight={400}>{l(say('Zenbakitzailea', 'Numerador', 'البسط', 'Numerator'))}</Text>
                {Array.from({ length: numerator }, (_, index) => token(TOKEN_LEFT + index * TOKEN_STEP, 48, index < state.m ? STAGE : SECOND, index < state.m ? STAGE_TINT : SECOND_TINT, index < cancelled, `n${index}`))}
                <line x1={16} x2={344} y1={84} y2={84} stroke={INK} strokeWidth={2.5} />
                <Text x={20} y={108} anchor="start" size={14} color={MUTED} weight={400}>{l(say('Izendatzailea', 'Denominador', 'المقام', 'Denominator'))}</Text>
                {Array.from({ length: state.p }, (_, index) => token(TOKEN_LEFT + index * TOKEN_STEP, 134, MUSTARD, MUSTARD_TINT, index < cancelled, `d${index}`))}
                {Array.from({ length: cancelled }, (_, index) => <line key={`c${index}`} x1={TOKEN_LEFT + index * TOKEN_STEP} x2={TOKEN_LEFT + index * TOKEN_STEP} y1={60} y2={122} stroke={INK} strokeWidth={1.5} strokeDasharray="3 3" opacity={0.55} />)}
                <Text x={180} y={196} size={22} color={SECOND}>{`${base}${sup(net)}`}</Text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- L2. The square of the root ---------- */

export function SquareTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SquareState>(initialSquareState)
    const { n, s } = state
    const fits = squareFits(state)
    const inside = squareInside(state)
    const blocks = Math.floor(n / (s * s))
    const left = n - blocks * s * s
    const cell = Math.max(5, Math.min(16, Math.floor(300 / s)))
    const gap = s > 1 ? 6 : 0
    const unit = s * cell + gap
    const perRow = Math.max(1, Math.floor(328 / unit))
    const items = blocks + (left > 0 ? 1 : 0)
    const rows = Math.ceil(items / perRow)
    const height = 62 + rows * unit + 12
    const controls = (
        <>
            <Stepper label={l(say('Azalera n', 'Área n', 'المساحة n', 'Area n'))} value={n} min={SQUARE_LIMITS.n.min} max={SQUARE_LIMITS.n.max} onChange={(next) => setState((current) => setSquare(current, { n: next }))} language={props.language} />
            <Stepper label={l(say('Blokearen aldea s', 'Lado del bloque s', 'ضلع الكتلة s', 'Side of the block s'))} value={s} min={SQUARE_LIMITS.s.min} max={SQUARE_LIMITS.s.max} onChange={(next) => setState((current) => setSquare(current, { s: next }))} language={props.language} />
        </>
    )
    const latex = fits ? (inside === 1 ? `\\sqrt{${n}}=\\sqrt{${s}^{2}}=${s}` : `\\sqrt{${n}}=\\sqrt{${s}^{2}\\cdot ${inside}}=${s === 1 ? '' : s}\\sqrt{${inside}}`) : `${s}^{2}=${s * s}\\ \\nmid\\ ${n}`
    const note = !fits
        ? l(say(`${s}×${s} blokeek ez dute azalera betetzen: ${left} gelaxka geratzen dira.`, `Los bloques de ${s}×${s} no llenan el área: sobran ${left} cuadritos.`, `كتل ${s}×${s} لا تملأ المساحة: يتبقى ${left} مربعات صغيرة.`, `The blocks of ${s}×${s} do not fill the area: ${left} small squares are left over.`))
        : squareSimplified(state) ? l(say('Ezin da gehiago atera: errokizunak ez du karratu perfekturik.', 'No se puede sacar más: el radicando ya no tiene cuadrados perfectos.', 'لا يمكن إخراج المزيد: لم يعد في ما تحت الجذر مربع كامل.', 'You cannot take out anything more: the radicand no longer has any perfect squares.'))
            : l(say(`Oraindik bloke handiagoa sartzen da: ${maxSide(n)}×${maxSide(n)}.`, `Todavía cabe un bloque mayor: ${maxSide(n)}×${maxSide(n)}.`, `ما زالت تتسع كتلة أكبر: ${maxSide(n)}×${maxSide(n)}.`, `A larger block still fits: ${maxSide(n)}×${maxSide(n)}.`))
    return (
        <ToolFrame {...props} controls={controls} state={state} challenges={squareChallenges} extraChallenges={squareExtra} readout={<Readout latex={latex} note={note} />}>
            <Board height={height} label={l(say(`${n} gelaxka, ${s}×${s} blokeetan`, `${n} cuadritos en bloques de ${s}×${s}`, `${n} مربعًا صغيرًا في كتل ${s}×${s}`, `${n} small squares in blocks of ${s}×${s}`))}>
                <Text x={180} y={30} size={20} color={fits ? SECOND : MUTED}>{fits ? (inside === 1 ? `√${n} = ${s}` : `√${n} = ${s === 1 ? '' : s}√${inside}`) : `√${n}`}</Text>
                <Text x={180} y={50} size={13} color={MUTED} weight={400}>{fits ? l(say(`${n} = ${s * s} · ${inside}`, `${n} = ${s * s} · ${inside}`, `${n} = ${s * s} · ${inside}`, `${n} = ${s * s} · ${inside}`)) : `${n} = ${s * s} · ${blocks} + ${left}`}</Text>
                {Array.from({ length: items }, (_, item) => {
                    const partial = item === blocks
                    const x0 = 16 + (item % perRow) * unit
                    const y0 = 62 + Math.floor(item / perRow) * unit
                    const count = partial ? left : s * s
                    return (
                        <g key={item}>
                            {Array.from({ length: count }, (_, index) => (
                                <rect key={index} x={x0 + (index % s) * cell} y={y0 + Math.floor(index / s) * cell} width={cell} height={cell} fill={partial ? SECOND_TINT : item % 2 === 0 ? STAGE_TINT : MUSTARD_TINT} stroke={partial ? SECOND : INK} strokeWidth={0.8} />
                            ))}
                            {!partial && s > 1 && <rect x={x0} y={y0} width={s * cell} height={s * cell} fill="none" stroke={INK} strokeWidth={1.8} />}
                        </g>
                    )
                })}
            </Board>
        </ToolFrame>
    )
}

/* ---------- L3. The scale of magnitudes ---------- */

const AXIS = { left: 24, right: 336 }
const axisX = (exponent: number) => AXIS.left + ((exponent - SCALE_RANGE.min) / (SCALE_RANGE.max - SCALE_RANGE.min)) * (AXIS.right - AXIS.left)

/** A long name split into two lines of about the same length */
function twoLines(text: string): [string, string] {
    if (text.length <= 28) return [text, '']
    const words = text.split(' ')
    let best = 1
    let gap = Infinity
    for (let cut = 1; cut < words.length; cut += 1) {
        const difference = Math.abs(words.slice(0, cut).join(' ').length - words.slice(cut).join(' ').length)
        if (difference < gap) { gap = difference; best = cut }
    }
    return [words.slice(0, best).join(' '), words.slice(best).join(' ')]
}

export function ScaleTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ScaleState>(initialScaleState)
    const object = scaleObjects[state.object]
    const correct = scaleCorrect(state)
    const realExponent = object.exponent + Math.log10(Number(object.mantissa.replace(',', '.')))
    const [first, second] = twoLines(l(object.name))
    const controls = (
        <>
            <Stepper label={l(say('Objektua', 'Objeto', 'الجسم', 'Object'))} value={state.object + 1} min={1} max={scaleObjects.length} format={(v) => `${v} / ${scaleObjects.length}`} onChange={(next) => setState((s) => setScale(s, { object: next - 1 }))} language={props.language} />
            <Stepper label={l(say('Zure iragarpena: berretzailea', 'Tu predicción: el exponente', 'توقّعك: الأس', 'Your prediction: the exponent'))} value={state.guess} min={SCALE_RANGE.min} max={SCALE_RANGE.max} format={(v) => `10${sup(v)} m`} onChange={(next) => setState((s) => setScale(s, { guess: next }))} language={props.language} />
            <button type="button" className="fraction-v2-primary" disabled={state.revealed} onClick={() => setState((s) => revealScale(s))}>{l(say('Egiaztatu', 'Comprobar', 'تحقق', 'Check'))}</button>
        </>
    )
    const latex = state.revealed ? `${object.mantissa.replace(',', '{,}')}\\cdot 10^{${object.exponent}}\\ \\text{m}` : `10^{${state.guess}}\\ \\text{m}`
    const note = !state.revealed ? l(say('Iragarri berretzailea eta sakatu «Egiaztatu».', 'Predice el exponente y pulsa «Comprobar».', 'توقّع الأس ثم اضغط «تحقق».', 'Predict the exponent and press ‘Check’.'))
        : correct ? l(say('Ondo asmatu duzu!', '¡Acertaste!', 'أحسنت، لقد أصبت!', 'You got it right!'))
            : state.guess < object.exponent ? l(say(`Txikiegia: benetako berretzailea ${object.exponent} da.`, `Te quedaste corto: el exponente real es ${object.exponent}.`, `أقل من اللازم: الأس الحقيقي ${object.exponent}.`, `You were too low: the real exponent is ${object.exponent}.`)) : l(say(`Handiegia: benetako berretzailea ${object.exponent} da.`, `Te pasaste: el exponente real es ${object.exponent}.`, `أكبر من اللازم: الأس الحقيقي ${object.exponent}.`, `You were too high: the real exponent is ${object.exponent}.`))
    const ticks = Array.from({ length: SCALE_RANGE.max - SCALE_RANGE.min + 1 }, (_, index) => SCALE_RANGE.min + index)
    return (
        <ToolFrame {...props} controls={controls} state={state} challenges={scaleChallenges} extraChallenges={scaleExtra} readout={<Readout latex={latex} note={note} />}>
            <Board height={190} label={l(say('10en berreturen zerrenda eta objektuaren tokia', 'La tira de potencias de 10 y el lugar del objeto', 'شريط قوى العدد 10 ومكان الجسم', 'The strip of powers of 10 and the object\'s position'))}>
                <Text x={180} y={26} size={16}>{first}</Text>
                {second && <Text x={180} y={46} size={16}>{second}</Text>}
                <line x1={AXIS.left} x2={AXIS.right} y1={120} y2={120} stroke={INK} strokeWidth={2.5} />
                {ticks.map((exponent) => (
                    <g key={exponent}>
                        <line x1={axisX(exponent)} x2={axisX(exponent)} y1={exponent % 5 === 0 ? 110 : 114} y2={126} stroke={INK} strokeWidth={exponent % 5 === 0 ? 2 : 1.2} />
                        {exponent % 5 === 0 && <Text x={axisX(exponent)} y={146} size={12} weight={700} color={MUTED}>{`10${sup(exponent)}`}</Text>}
                    </g>
                ))}
                <path d={`M${axisX(state.guess)} 118 l-9 -18 h18 z`} fill={MUSTARD} stroke={INK} strokeWidth={1.8} />
                <Text x={axisX(state.guess)} y={92} size={12} color={MUTED} weight={400}>{l(say('zu', 'tú', 'أنت', 'you'))}</Text>
                {state.revealed && (
                    <g>
                        <circle cx={axisX(realExponent)} cy={120} r={8} fill={correct ? 'var(--success, #267b53)' : SECOND} stroke={CARD} strokeWidth={2.5} />
                        <Text x={Math.min(326, Math.max(36, axisX(realExponent)))} y={174} size={13} color={correct ? 'var(--success, #267b53)' : SECOND}>{`${decimalText(object.mantissa, props.language)}·10${sup(object.exponent)} m`}</Text>
                    </g>
                )}
            </Board>
        </ToolFrame>
    )
}

/* ---------- L4. The spiral of roots ---------- */

const SPIRAL = { cx: 150, cy: 140, reach: 104, maxScale: 70 }

export function SpiralTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SpiralState>(initialSpiralState)
    const playback = usePlayback(`spiral-${state.n}`, 2600)
    const progress = playback.progress ?? 1
    const points = spiralPoints(state.n)
    const root = spiralRoot(state)
    // The bigger the spiral, the smaller its unit, so it always fits the board
    const scale = Math.min(SPIRAL.maxScale, SPIRAL.reach / root)
    const shown = Math.min(state.n, 1 + Math.ceil(progress * (state.n - 1)))
    const ticks = Array.from({ length: Math.ceil(root) + 1 }, (_, index) => index)
    const at = (x: number, y: number) => ({ x: SPIRAL.cx + x * scale, y: SPIRAL.cy - y * scale })
    const origin = at(0, 0)
    const axisEnd = at(Math.ceil(root) + 0.4, 0)
    const last = points[Math.min(shown, points.length) - 1]
    const lastPoint = at(last.x, last.y)
    const arcFraction = progress >= 1 ? 1 : 0
    const angle = Math.atan2(last.y, last.x)
    const arcEnd = at(Math.sqrt(last.k), 0)
    const controls = (
        <>
            <Stepper label={l(say('Errokizuna n', 'Radicando n', 'ما تحت الجذر n', 'Radicand n'))} value={state.n} min={SPIRAL_LIMITS.min} max={SPIRAL_LIMITS.max} onChange={(next) => setState(setSpiral(next))} language={props.language} />
            <button type="button" className="fraction-v2-primary" disabled={playback.playing} onClick={playback.play}>▶ {l(say('Eraiki pausoz pauso', 'Construir paso a paso', 'ابنِ خطوة خطوة', 'Build step by step'))}</button>
        </>
    )
    const latex = spiralExact(state) ? `\\sqrt{${state.n}}=${Math.round(root)}` : `\\sqrt{${state.n}}\\approx ${texDec(root, props.language, 3)}`
    const note = spiralExact(state)
        ? l(say('Karratu perfektua: hipotenusa zenbaki osoa da eta zuzeneko marka batean erortzen da.', 'Cuadrado perfecto: la hipotenusa es un número entero y cae justo en una marca de la recta.', 'مربع كامل: الوتر عدد صحيح ويقع تمامًا على علامة من المستقيم.', 'Perfect square: the hypotenuse is a whole number and lands exactly on a mark on the number line.'))
        : l(say(`Hipotenusa √${state.n - 1} eta 1 aldeen artean dago; zuzenean bi marken artean erortzen da.`, `La hipotenusa de catetos √${state.n - 1} y 1 cae entre dos marcas de la recta.`, `وتر الضلعين √${state.n - 1} و1 يقع بين علامتين على المستقيم.`, `The hypotenuse with legs √${state.n - 1} and 1 falls between two marks on the number line.`))
    return (
        <ToolFrame {...props} controls={controls} state={state} challenges={spiralChallenges} extraChallenges={spiralExtra} readout={<Readout latex={latex} note={note} />}>
            <Board height={272} label={l(say(`Erroen espirala √${state.n} arte`, `La espiral de raíces hasta √${state.n}`, `حلزون الجذور حتى √${state.n}`, `The spiral of roots up to √${state.n}`))}>
                {points.slice(0, Math.max(0, shown - 0)).map((point, index) => {
                    const next = points[index + 1]
                    if (!next || index + 1 >= shown) return null
                    const a = at(point.x, point.y)
                    const b = at(next.x, next.y)
                    return <polygon key={point.k} points={`${origin.x},${origin.y} ${a.x},${a.y} ${b.x},${b.y}`} fill={index % 2 === 0 ? STAGE_TINT : MUSTARD_TINT} stroke={INK} strokeWidth={1.4} />
                })}
                <line x1={origin.x - 8} x2={axisEnd.x} y1={origin.y} y2={origin.y} stroke={INK} strokeWidth={2} />
                {ticks.map((tick) => (
                    <g key={tick}>
                        <line x1={at(tick, 0).x} x2={at(tick, 0).x} y1={origin.y - 5} y2={origin.y + 5} stroke={INK} strokeWidth={2} />
                        <Text x={at(tick, 0).x} y={origin.y + 22} size={13} color={MUTED}>{tick}</Text>
                    </g>
                ))}
                <line x1={origin.x} y1={origin.y} x2={lastPoint.x} y2={lastPoint.y} stroke={SECOND} strokeWidth={3} />
                {arcFraction === 1 && last.k > 1 && (
                    <path d={`M${lastPoint.x} ${lastPoint.y} A${Math.sqrt(last.k) * scale} ${Math.sqrt(last.k) * scale} 0 ${angle > Math.PI ? 1 : 0} 1 ${arcEnd.x} ${arcEnd.y}`} fill="none" stroke={SECOND} strokeWidth={2.4} strokeDasharray="6 5" />
                )}
                {arcFraction === 1 && <circle cx={arcEnd.x} cy={arcEnd.y} r={6} fill={SECOND} stroke={CARD} strokeWidth={2.5} />}
                <circle cx={lastPoint.x} cy={lastPoint.y} r={5} fill={SECOND} />
                <Text x={lastPoint.x + (lastPoint.x > origin.x ? 18 : -18)} y={lastPoint.y + (lastPoint.y > origin.y ? 16 : -8)} size={15} color={SECOND}>{`√${last.k}`}</Text>
                {arcFraction === 1 && last.k > 1 && <Text x={Math.min(344, arcEnd.x + 4)} y={origin.y + 44} size={13} color={SECOND}>{`≈ ${dec(Math.sqrt(last.k), props.language, 2)}`}</Text>}
            </Board>
        </ToolFrame>
    )
}
