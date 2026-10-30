import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { fraction, type FractionValue } from '../../../features/unit-v2/math/fraction'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { decimalSeparatorFor } from '../../../utils/numberFormat'
import { evaluate, polyLatex, ruffini, tartaglia, type Poly } from '../polynomials'
import {
    BINOMIAL_LIMITS,
    binomialChallenges,
    binomialExpansion,
    binomialSum,
    commonChallenges,
    commonDenominators,
    commonSum,
    DOMAIN_LIMIT,
    domainChallenges,
    domainFractions,
    domainHoles,
    domainValue,
    discriminant,
    expandFactors,
    FACTOR_LIMIT,
    FACTOR_ROOTS,
    factorsLatex,
    gcdChallenges,
    gcdOf,
    initialBinomialState,
    initialCommonState,
    initialDomainState,
    initialGcdState,
    initialParameterState,
    initialQuadraticState,
    initialSimplifyState,
    initialTapsState,
    lcmOf,
    NUMERATOR_LIMIT,
    PARAMETER_LIMITS,
    parameterChallenges,
    parameterFamilies,
    parameterPolynomial,
    parameterRemainder,
    QUADRATIC_LIMITS,
    quadraticChallenges,
    quadraticFactors,
    remainderInM,
    setBinomial,
    setCommon,
    setDomain,
    setGcd,
    setParameter,
    setQuadratic,
    setSimplify,
    setTaps,
    SIMPLIFY_DEGREE,
    simplified,
    simplifyChallenges,
    TAPS_LIMITS,
    tapsChallenges,
    tapsTogether,
    type BinomialState,
    type CommonState,
    type DomainState,
    type Exponents,
    type GcdState,
    type ParameterState,
    type QuadraticState,
    type SimplifyState,
    type TapsState
} from './labTools'

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const GREEN_TINT = '#d6eddf'
const MUSTARD_TINT = 'var(--mustard-tint, #fbebc0)'
const PAPER = '#fffcf6'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
/** Negative numbers with the true minus sign */
const signed = (value: number) => (value < 0 ? `−${-value}` : String(value))
const SUPERSCRIPT: Record<string, string> = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' }
/** LaTeX of a polynomial or a product of factors as plain text: x^{2}-1 → x² − 1 */
const plain = (latex: string) => latex
    .replace(/\^\{(\d+)\}/g, (_, digits: string) => digits.split('').map((digit) => SUPERSCRIPT[digit]).join(''))
    .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '$1/$2')
    .replace(/([^\s(])([+-])/g, '$1 $2 ')
    .replace(/-/g, '−')
/** A fraction in LaTeX */
const texFraction = (value: FractionValue) => (value.denominator === 1 ? String(value.numerator) : `${value.numerator < 0 ? '-' : ''}\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`)
const textFraction = (value: FractionValue) => (value.denominator === 1 ? signed(value.numerator) : `${signed(value.numerator)}/${value.denominator}`)
const decimal = (value: number, language: UnitLanguage) => signed(Math.round(value * 10) / 10).replace('.', language === 'ar' ? '.' : decimalSeparatorFor(language))
/** A denominator as the learner writes it: expanded when it is one factor, else the factors */
const FACTOR_NAMES = ['x', 'x − 1', 'x + 1', 'x + 2']

function Board({ height, label, children }: { height: number; label: string; children: ReactNode }) {
    return <svg viewBox={`0 0 640 ${height}`} direction="ltr" role="img" aria-label={label} style={{ width: '100%', height: 'auto', fontFamily: '"Atkinson Hyperlegible", "Noto Sans Arabic", system-ui, sans-serif' }}>{children}</svg>
}

function Readout({ latex, note }: { latex: string; note: string }) {
    return (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${latex}$`} /></span>
            <span className="fraction-v2-lab-readout-note">{note}</span>
        </>
    )
}

function Text({ x, y, children, color = INK, size = 18, anchor = 'middle', weight = 700 }: { x: number; y: number; children: ReactNode; color?: string; size?: number; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color}>{children}</text>
}

/** A stacked fraction drawn with text, centred on x; y is the bar */
function Frac({ x, y, top, bottom, width, size = 18, color = INK }: { x: number; y: number; top: string; bottom: string; width: number; size?: number; color?: string }) {
    return (
        <g>
            <Text x={x} y={y - 8} size={size} color={color}>{top}</Text>
            <line x1={x - width / 2} x2={x + width / 2} y1={y} y2={y} stroke={color} strokeWidth={2} />
            <Text x={x} y={y + size + 4} size={size} color={color}>{bottom}</Text>
        </g>
    )
}

/** A row of factor chips: each factor repeated as many times as its exponent */
function FactorChips({ x, y, exponents, highlight, width = 60 }: { x: number; y: number; exponents: Exponents; highlight?: Exponents; width?: number }) {
    const chips = exponents.flatMap((count, index) => Array.from({ length: count }, (_, copy) => ({ index, common: highlight ? copy < highlight[index] : false })))
    if (!chips.length) return <Text x={x + 20} y={y + 24} size={20} color={MUTED}>1</Text>
    return (
        <g>
            {chips.map((chip, position) => (
                <g key={position}>
                    <rect x={x + position * (width + 6)} y={y} width={width} height={34} rx={9} fill={chip.common ? GREEN_TINT : PAPER} stroke={chip.common ? GREEN : INK} strokeWidth={1.6} />
                    <Text x={x + position * (width + 6) + width / 2} y={y + 23} size={16}>{FACTOR_NAMES[chip.index]}</Text>
                </g>
            ))}
        </g>
    )
}

/** Four steppers, one exponent per factor */
function FactorSteppers({ exponents, onChange, language, maxDegree = Infinity }: { exponents: Exponents; onChange: (index: number, value: number) => void; language: UnitLanguage; maxDegree?: number }) {
    const room = maxDegree - exponents.reduce((sum, count) => sum + count, 0)
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {FACTOR_ROOTS.map((_, index) => (
                <Stepper key={index} label={FACTOR_NAMES[index]} value={exponents[index]} min={0} max={Math.min(FACTOR_LIMIT, exponents[index] + room)} onChange={(value) => onChange(index, value)} language={language} />
            ))}
        </div>
    )
}

/* ---------- 1. Tartaglia's triangle ---------- */

export function BinomialTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<BinomialState>(initialBinomialState)
    const expansion = binomialExpansion(state)
    const row = tartaglia(state.n)
    const controls = (
        <>
            <Stepper label="n" value={state.n} min={BINOMIAL_LIMITS.n.min} max={BINOMIAL_LIMITS.n.max} onChange={(n) => setState((s) => setBinomial(s, { n }))} language={props.language} />
            <Stepper label="b" value={state.b} min={BINOMIAL_LIMITS.b.min} max={BINOMIAL_LIMITS.b.max} format={signed} onChange={(b) => setState((s) => setBinomial(s, { b }))} language={props.language} />
        </>
    )
    const sum = binomialSum(state)
    const latex = `(x${state.b < 0 ? '-' : '+'}${Math.abs(state.b)})^{${state.n}}\\ \\to\\ (1${state.b < 0 ? '-' : '+'}${Math.abs(state.b)})^{${state.n}}=${sum}`
    const note = l(say(`${state.n}. errenkada: ${row.join(' ')}. Koefizienteen batura: ${signed(sum)}.`, `Fila ${state.n}: ${row.join(' ')}. Los coeficientes suman ${signed(sum)}.`, `الصف ${state.n}: ${row.join(' ')}. مجموع المعاملات ${signed(sum)}.`, `Row ${state.n}: ${row.join(' ')}. The coefficients add up to ${signed(sum)}.`))
    const cell = Math.min(78, 600 / (state.n + 1))
    const x0 = 320 - (cell * (state.n + 1)) / 2
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={binomialChallenges} state={state}>
            <Board height={300} label={l(say('Tartagliaren triangelua eta garapena', 'Triángulo de Tartaglia y desarrollo', 'مثلث تارتاليا والنشر', 'Tartaglia\'s triangle and expansion'))}>
                {Array.from({ length: state.n + 1 }, (_, r) => tartaglia(r).map((value, k) => (
                    <Text key={`${r}-${k}`} x={320 + (k - r / 2) * 40} y={24 + r * 22} size={r === state.n ? 16 : 14} color={r === state.n ? SECOND : MUTED} weight={r === state.n ? 700 : 400}>{value}</Text>
                )))}
                {expansion.map((coefficient, index) => {
                    const power = state.n - index
                    const x = x0 + index * cell + cell / 2
                    return (
                        <g key={index}>
                            <rect x={x - cell / 2 + 3} y={208} width={cell - 6} height={62} rx={10} fill={coefficient < 0 ? MUSTARD_TINT : STAGE_TINT} stroke={INK} strokeWidth={1.4} />
                            <Text x={x} y={232} size={cell < 66 ? 14 : 17}>{signed(coefficient)}</Text>
                            <Text x={x} y={258} size={14} color={STAGE}>{power === 0 ? '1' : power === 1 ? 'x' : `x${plain(`^{${power}}`)}`}</Text>
                            <Text x={x} y={290} size={12} color={MUTED} weight={400}>{`${row[index]}·${signed(state.b)}${plain(`^{${index}}`)}`}</Text>
                        </g>
                    )
                })}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 2. A remainder with a parameter ---------- */

/** A Ruffini table drawn from numbers */
function RuffiniBoard({ coefficients, a, y = 60 }: { coefficients: Poly; a: number; y?: number }) {
    const { products, bottom } = ruffini(coefficients, a)
    const cell = 92
    const x0 = 150
    return (
        <g>
            {coefficients.map((coefficient, index) => {
                const x = x0 + index * cell + cell / 2
                const last = index === coefficients.length - 1
                return (
                    <g key={index}>
                        <Text x={x} y={y} size={21}>{signed(coefficient)}</Text>
                        {products[index] !== null && <Text x={x} y={y + 44} size={19} color={STAGE} weight={400}>{signed(products[index]!)}</Text>}
                        <Text x={x} y={y + 100} size={21} color={last ? SECOND : GREEN}>{signed(bottom[index])}</Text>
                    </g>
                )
            })}
            <Text x={x0 - 30} y={y + 44} size={21} color={STAGE}>{signed(a)}</Text>
            <line x1={x0} x2={x0} y1={y - 28} y2={y + 116} stroke={INK} strokeWidth={2} />
            <line x1={x0 - 60} x2={x0 + coefficients.length * cell + 10} y1={y + 64} y2={y + 64} stroke={INK} strokeWidth={2} />
            <rect x={x0 + (coefficients.length - 1) * cell + 10} y={y + 74} width={cell - 20} height={36} rx={8} fill="none" stroke={SECOND} strokeWidth={2.4} />
        </g>
    )
}

export function ParameterTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ParameterState>(initialParameterState)
    const coefficients = parameterPolynomial(state)
    const remainder = parameterRemainder(state)
    const [slope, constant] = remainderInM(state)
    const controls = (
        <>
            <Segmented label={l(say('Polinomioa', 'Polinomio', 'الحدودية', 'Polynomial'))} value={String(state.family)} options={parameterFamilies.map((_, index) => ({ value: String(index), label: `P${index + 1}` }))} onChange={(family) => setState((s) => setParameter(s, { family: Number(family) }))} />
            <p className="fraction-v2-lab-tip"><MathText text={`$P(x)=${parameterFamilies[state.family].latex}$`} /></p>
            <Stepper label="m" value={state.m} min={PARAMETER_LIMITS.m.min} max={PARAMETER_LIMITS.m.max} format={signed} onChange={(m) => setState((s) => setParameter(s, { m }))} language={props.language} />
            <Stepper label="a" value={state.a} min={PARAMETER_LIMITS.a.min} max={PARAMETER_LIMITS.a.max} format={signed} onChange={(a) => setState((s) => setParameter(s, { a }))} language={props.language} />
        </>
    )
    const inM = polyLatex([slope, constant], 'm')
    const latex = `R=P(${state.a})=${inM}=${remainder}`
    const note = remainder === 0
        ? l(say(`Hondarra 0: x − a = ${plain(`x${state.a < 0 ? '+' : '-'}${Math.abs(state.a)}`)} faktorea da.`, `Resto 0: ${plain(`x${state.a < 0 ? '+' : '-'}${Math.abs(state.a)}`)} es un factor.`, `الباقي 0: ${plain(`x${state.a < 0 ? '+' : '-'}${Math.abs(state.a)}`)} عامل.`, `Remainder 0: ${plain(`x${state.a < 0 ? '+' : '-'}${Math.abs(state.a)}`)} is a factor.`))
        : l(say(`m = ${signed(state.m)} denean. m bat handitzean, hondarra ${signed(slope)} aldatzen da.`, `Con m = ${signed(state.m)}. Si m sube 1, el resto cambia ${signed(slope)}.`, `عندما m = ${signed(state.m)}. إذا زادت m بواحد تغيّر الباقي بمقدار ${signed(slope)}.`, `With m = ${signed(state.m)}. If m goes up by 1, the remainder changes by ${signed(slope)}.`))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={parameterChallenges} state={state}>
            <Board height={210} label={l(say('Ruffini parametroarekin', 'Ruffini con parámetro', 'روفيني مع وسيط', 'Ruffini with a parameter'))}>
                <Text x={320} y={24} size={17} color={MUTED} weight={400}>{`P(x) = ${plain(polyLatex(coefficients))}`}</Text>
                <RuffiniBoard coefficients={coefficients} a={state.a} y={66} />
                <Text x={320} y={200} size={16} color={STAGE}>{`R = ${plain(inM)}`}</Text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 3. Factorising ax² + bx + c ---------- */

export function QuadraticTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<QuadraticState>(initialQuadraticState)
    const delta = discriminant(state)
    const factors = quadraticFactors(state)
    const polynomial = polyLatex([state.a, state.b, state.c])
    const controls = (
        <>
            <Stepper label="a" value={state.a} min={QUADRATIC_LIMITS.a.min} max={QUADRATIC_LIMITS.a.max} onChange={(a) => setState((s) => setQuadratic(s, { a }))} language={props.language} />
            <Stepper label="b" value={state.b} min={QUADRATIC_LIMITS.b.min} max={QUADRATIC_LIMITS.b.max} format={signed} onChange={(b) => setState((s) => setQuadratic(s, { b }))} language={props.language} />
            <Stepper label="c" value={state.c} min={QUADRATIC_LIMITS.c.min} max={QUADRATIC_LIMITS.c.max} format={signed} onChange={(c) => setState((s) => setQuadratic(s, { c }))} language={props.language} />
        </>
    )
    const latex = factors.latex ? `${polynomial}=${factors.latex}` : `\\Delta=${delta}`
    const roots = factors.roots.map(textFraction).join(l(say(' eta ', ' y ', ' و', ' and ')))
    const note = factors.kind === 'irreducible'
        ? l(say(`Δ = ${signed(delta)} < 0: ez du erro errealik, irreduziblea da.`, `Δ = ${signed(delta)} < 0: no tiene raíces reales, es irreducible.`, `Δ = ${signed(delta)} < 0: لا جذور حقيقية، غير قابلة للتحليل.`, `Δ = ${signed(delta)} < 0: it has no real roots, so it is irreducible.`))
        : factors.kind === 'irrational'
            ? l(say(`Δ = ${delta} ez da karratu perfektua: erro irrazionalak, ez dago faktore osorik.`, `Δ = ${delta} no es un cuadrado perfecto: raíces irracionales, sin factores enteros.`, `Δ = ${delta} ليس مربعًا تامًا: جذور غير نسبية ولا عوامل صحيحة.`, `Δ = ${delta} is not a perfect square: irrational roots, no integer factors.`))
            : factors.kind === 'double'
                ? l(say(`Δ = 0: erro bikoitza ${roots}.`, `Δ = 0: raíz doble ${roots}.`, `Δ = 0: جذر مضاعف ${roots}.`, `Δ = 0: double root ${roots}.`))
                : l(say(`Δ = ${delta}: erroak ${roots}.`, `Δ = ${delta}: raíces ${roots}.`, `Δ = ${delta}: الجذران ${roots}.`, `Δ = ${delta}: roots ${roots}.`))
    // The graph of y = ax² + bx + c for −5 ≤ x ≤ 5
    const ox = 320
    const oy = 110
    const ux = 52
    const uy = 8
    const value = (x: number) => state.a * x * x + state.b * x + state.c
    const points = Array.from({ length: 101 }, (_, index) => -5 + index / 10).map((x) => `${ox + x * ux},${Math.max(-400, Math.min(600, oy - value(x) * uy))}`).join(' ')
    const marks = factors.roots.length
        ? factors.roots.map((root) => root.numerator / root.denominator)
        : factors.kind === 'irrational' ? [(-state.b - Math.sqrt(delta)) / (2 * state.a), (-state.b + Math.sqrt(delta)) / (2 * state.a)] : []
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={quadraticChallenges} state={state}>
            <Board height={220} label={l(say('Parabola eta haren erroak', 'La parábola y sus raíces', 'القطع المكافئ وجذوره', 'The parabola and its roots'))}>
                <defs><clipPath id="quadratic-clip"><rect x={0} y={0} width={640} height={220} /></clipPath></defs>
                <line x1={40} x2={600} y1={oy} y2={oy} stroke={INK} strokeWidth={1.6} />
                <line x1={ox} x2={ox} y1={6} y2={214} stroke={INK} strokeWidth={1.2} />
                {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((x) => <Text key={x} x={ox + x * ux} y={oy + 20} size={12} color={MUTED} weight={400}>{signed(x)}</Text>)}
                <polyline points={points} fill="none" stroke={STAGE} strokeWidth={3} clipPath="url(#quadratic-clip)" />
                {marks.filter((x) => Math.abs(x) <= 5.2).map((x, index) => <circle key={index} cx={ox + x * ux} cy={oy} r={7} fill={factors.kind === 'irrational' ? PAPER : SECOND} stroke={SECOND} strokeWidth={2} />)}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 4. m.c.d. and m.c.m. ---------- */

export function GcdTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<GcdState>(initialGcdState)
    const [editing, setEditing] = useState<'p' | 'q'>('p')
    const gcd = gcdOf(state.p, state.q)
    const lcm = lcmOf(state.p, state.q)
    const controls = (
        <>
            <Segmented label={l(say('Aldatu', 'Cambia', 'غيّر', 'Change'))} value={editing} options={[{ value: 'p', label: 'P' }, { value: 'q', label: 'Q' }]} onChange={(value) => setEditing(value as 'p' | 'q')} />
            <FactorSteppers exponents={state[editing]} onChange={(index, value) => setState((s) => setGcd(s, editing, index, value))} language={props.language} />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`${l(say('z.k.h.', 'm.c.d.', 'ق.م.أ', 'GCD'))} $=${factorsLatex(gcd)}$ · ${l(say('m.k.t.', 'm.c.m.', 'م.م.أ', 'LCM'))} $=${factorsLatex(lcm)}$`} /></span>
            <span className="fraction-v2-lab-readout-note">{`P = ${plain(polyLatex(expandFactors(state.p)))} · Q = ${plain(polyLatex(expandFactors(state.q)))}`}</span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={gcdChallenges} state={state}>
            <Board height={250} label={l(say('Bi polinomioen faktoreak', 'Los factores de los dos polinomios', 'عوامل الحدوديتين', 'The factors of the two polynomials'))}>
                <Text x={30} y={40} size={20} color={editing === 'p' ? STAGE : INK}>P</Text>
                <FactorChips x={60} y={16} exponents={state.p} highlight={gcd} />
                <Text x={30} y={94} size={20} color={editing === 'q' ? STAGE : INK}>Q</Text>
                <FactorChips x={60} y={70} exponents={state.q} highlight={gcd} />
                <line x1={20} x2={620} y1={124} y2={124} stroke={MUTED} strokeWidth={1} strokeDasharray="4 4" />
                <Text x={30} y={162} size={13} color={GREEN} anchor="start">{l(say('z.k.h.', 'm.c.d.', 'ق.م.أ', 'GCD'))}</Text>
                <FactorChips x={90} y={140} exponents={gcd} highlight={gcd} />
                <Text x={30} y={216} size={13} color={SECOND} anchor="start">{l(say('m.k.t.', 'm.c.m.', 'م.م.أ', 'LCM'))}</Text>
                <FactorChips x={90} y={194} exponents={lcm} />
            </Board>
        </ToolFrame>
    )
}

/* ---------- 5. The value of a fraction ---------- */

export function DomainTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<DomainState>(initialDomainState)
    const { numerator, denominator } = domainFractions[state.fraction]
    const value = domainValue(state)
    const top = evaluate(numerator, state.x)
    const bottom = evaluate(denominator, state.x)
    const holes = domainHoles(state.fraction)
    const controls = (
        <>
            <Segmented label={l(say('Zatikia', 'Fracción', 'الكسر', 'Fraction'))} value={String(state.fraction)} options={domainFractions.map((item, index) => ({ value: String(index), label: `${plain(polyLatex(item.numerator))} / ${plain(polyLatex(item.denominator))}` }))} onChange={(index) => setState((s) => setDomain(s, { fraction: Number(index) }))} />
            <Stepper label="x" value={state.x} min={-DOMAIN_LIMIT} max={DOMAIN_LIMIT} format={signed} onChange={(x) => setState((s) => setDomain(s, { x }))} language={props.language} />
        </>
    )
    const latex = `\\frac{${polyLatex(numerator)}}{${polyLatex(denominator)}}\\ \\to\\ \\frac{${top}}{${bottom}}${value ? `=${texFraction(value)}` : ''}`
    const note = value === null
        ? l(say(`x = ${signed(state.x)} denean izendatzailea 0 da: zatikia ez dago.`, `Para x = ${signed(state.x)} el denominador es 0: la fracción no existe.`, `عندما x = ${signed(state.x)} يكون المقام 0: الكسر غير معرّف.`, `For x = ${signed(state.x)} the denominator is 0: the fraction does not exist.`))
        : l(say(`Ez dago x hauetan: ${holes.map(signed).join(', ')}.`, `No existe en: ${holes.map(signed).join(', ')}.`, `غير معرّف عند: ${holes.map(signed).join('، ')}.`, `Does not exist at: ${holes.map(signed).join(', ')}.`))
    const ox = 320
    const unit = 54
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={domainChallenges} state={state}>
            <Board height={170} label={l(say('Zenbaki-zuzena', 'La recta numérica', 'مستقيم الأعداد', 'The number line'))}>
                <Frac x={90} y={40} top={plain(polyLatex(numerator))} bottom={plain(polyLatex(denominator))} width={130} size={19} />
                <line x1={30} x2={610} y1={118} y2={118} stroke={INK} strokeWidth={2} />
                {Array.from({ length: 2 * DOMAIN_LIMIT + 1 }, (_, k) => k - DOMAIN_LIMIT).map((x) => (
                    <g key={x}>
                        <line x1={ox + x * unit} x2={ox + x * unit} y1={111} y2={125} stroke={INK} strokeWidth={1.4} />
                        <Text x={ox + x * unit} y={150} size={13} color={MUTED} weight={400}>{signed(x)}</Text>
                    </g>
                ))}
                {holes.map((x) => <circle key={x} cx={ox + x * unit} cy={118} r={8} fill={PAPER} stroke={SECOND} strokeWidth={3} />)}
                <path d={`M${ox + state.x * unit} 104 l-8 -12 h16 z`} fill={value === null ? SECOND : GREEN} />
                <Text x={ox + state.x * unit} y={84} size={15} color={value === null ? SECOND : GREEN}>{value === null ? '∄' : textFraction(value)}</Text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 6. Eliminating factors ---------- */

export function SimplifyTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SimplifyState>(initialSimplifyState)
    const [editing, setEditing] = useState<'numerator' | 'denominator'>('numerator')
    const common = gcdOf(state.numerator, state.denominator)
    const result = simplified(state)
    const controls = (
        <>
            <Segmented label={l(say('Aldatu', 'Cambia', 'غيّر', 'Change'))} value={editing} options={[{ value: 'numerator', label: l(say('Zenbakitzailea', 'Numerador', 'البسط', 'Numerator')) }, { value: 'denominator', label: l(say('Izendatzailea', 'Denominador', 'المقام', 'Denominator')) }]} onChange={(value) => setEditing(value as 'numerator' | 'denominator')} />
            <FactorSteppers exponents={state[editing]} onChange={(index, value) => setState((s) => setSimplify(s, editing, index, value))} language={props.language} maxDegree={SIMPLIFY_DEGREE} />
        </>
    )
    const expandedTop = polyLatex(expandFactors(state.numerator))
    const expandedBottom = polyLatex(expandFactors(state.denominator))
    const simplifiedLatex = factorsLatex(result.denominator) === '1' ? factorsLatex(result.numerator) : `\\frac{${factorsLatex(result.numerator)}}{${factorsLatex(result.denominator)}}`
    const latex = `\\frac{${expandedTop}}{${expandedBottom}}=${simplifiedLatex}`
    const commonDegree = common.reduce((sum, count) => sum + count, 0)
    const note = commonDegree === 0
        ? l(say('Faktore komunik ez: zatikia irreduziblea da.', 'Ningún factor común: la fracción es irreducible.', 'لا عامل مشترك: الكسر غير قابل للتبسيط.', 'No common factor: the fraction is in simplest form.'))
        : l(say(`Faktore komuna: ${plain(factorsLatex(common))}. Goian eta behean ezabatzen da.`, `Factor común: ${plain(factorsLatex(common))}. Se elimina arriba y abajo.`, `العامل المشترك: ${plain(factorsLatex(common))}. يُحذف من البسط والمقام.`, `Common factor: ${plain(factorsLatex(common))}. It is cancelled from the top and bottom.`))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={simplifyChallenges} state={state}>
            <Board height={210} label={l(say('Zenbakitzailearen eta izendatzailearen faktoreak', 'Factores del numerador y del denominador', 'عوامل البسط والمقام', 'Factors of the numerator and the denominator'))}>
                <FactorChips x={60} y={30} exponents={state.numerator} highlight={common} />
                <line x1={40} x2={600} y1={84} y2={84} stroke={INK} strokeWidth={2.4} />
                <FactorChips x={60} y={100} exponents={state.denominator} highlight={common} />
                <Text x={320} y={178} size={17} color={GREEN}>{`= ${plain(simplifiedLatex)}`}</Text>
                <Text x={320} y={202} size={13} color={GREEN} weight={400}>{l(say('berdez: ezabatzen diren faktoreak', 'en verde: los factores que se eliminan', 'بالأخضر: العوامل التي تُحذف', 'in green: the factors that are cancelled'))}</Text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 7. The common denominator ---------- */

const denominatorLatex = (index: number) => polyLatex(expandFactors(commonDenominators[index]))

export function CommonTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CommonState>(initialCommonState)
    const { lcm, missingFirst, missingSecond, numerator } = commonSum(state)
    const options = commonDenominators.map((_, index) => ({ value: String(index), label: plain(denominatorLatex(index)) }))
    const controls = (
        <>
            <Stepper label={l(say('1. zenbakitzailea', '1.er numerador', 'البسط الأول', '1st numerator'))} value={state.k1} min={-NUMERATOR_LIMIT} max={NUMERATOR_LIMIT} format={signed} onChange={(k1) => setState((s) => setCommon(s, { k1 }))} language={props.language} />
            <Segmented label={l(say('1. izendatzailea', '1.er denominador', 'المقام الأول', '1st denominator'))} value={String(state.first)} options={options} onChange={(first) => setState((s) => setCommon(s, { first: Number(first) }))} />
            <Stepper label={l(say('2. zenbakitzailea', '2.º numerador', 'البسط الثاني', '2nd numerator'))} value={state.k2} min={-NUMERATOR_LIMIT} max={NUMERATOR_LIMIT} format={signed} onChange={(k2) => setState((s) => setCommon(s, { k2 }))} language={props.language} />
            <Segmented label={l(say('2. izendatzailea', '2.º denominador', 'المقام الثاني', '2nd denominator'))} value={String(state.second)} options={options} onChange={(second) => setState((s) => setCommon(s, { second: Number(second) }))} />
        </>
    )
    const first = `\\frac{${state.k1}}{${denominatorLatex(state.first)}}`
    const second = `\\frac{${Math.abs(state.k2)}}{${denominatorLatex(state.second)}}`
    const latex = `${first}${state.k2 < 0 ? '-' : '+'}${second}=\\frac{${polyLatex(numerator)}}{${factorsLatex(lcm)}}`
    const note = l(say(`M.k.t. = ${plain(factorsLatex(lcm))}. Lehenengoari ${plain(factorsLatex(missingFirst))} falta zaio, bigarrenari ${plain(factorsLatex(missingSecond))}.`, `M.c.m. = ${plain(factorsLatex(lcm))}. Al primero le falta ${plain(factorsLatex(missingFirst))} y al segundo ${plain(factorsLatex(missingSecond))}.`, `م.م.أ = ${plain(factorsLatex(lcm))}. ينقص الأول ${plain(factorsLatex(missingFirst))} وينقص الثاني ${plain(factorsLatex(missingSecond))}.`, `LCM = ${plain(factorsLatex(lcm))}. The first is missing ${plain(factorsLatex(missingFirst))} and the second is missing ${plain(factorsLatex(missingSecond))}.`))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={commonChallenges} state={state}>
            <Board height={200} label={l(say('Bi zatiki izendatzaile komunera', 'Dos fracciones a común denominador', 'كسران إلى مقام مشترك', 'Two fractions over a common denominator'))}>
                <Frac x={110} y={60} top={signed(state.k1)} bottom={plain(denominatorLatex(state.first))} width={100} size={20} />
                <Text x={190} y={68} size={22}>{state.k2 < 0 ? '−' : '+'}</Text>
                <Frac x={270} y={60} top={String(Math.abs(state.k2))} bottom={plain(denominatorLatex(state.second))} width={100} size={20} />
                <Text x={350} y={68} size={22} color={MUTED}>=</Text>
                <Frac x={490} y={60} top={plain(polyLatex(numerator))} bottom={plain(factorsLatex(lcm))} width={210} size={20} color={GREEN} />
                <Text x={110} y={136} size={14} color={STAGE} weight={400}>{`· ${plain(factorsLatex(missingFirst))}`}</Text>
                <Text x={270} y={136} size={14} color={STAGE} weight={400}>{`· ${plain(factorsLatex(missingSecond))}`}</Text>
                <rect x={150} y={154} width={340} height={34} rx={10} fill={MUSTARD_TINT} stroke={INK} strokeWidth={1.4} />
                <Text x={320} y={177} size={16}>{`${l(say('m.k.t.', 'm.c.m.', 'م.م.أ', 'LCM'))} = ${plain(factorsLatex(lcm))}`}</Text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 8. Two taps ---------- */

export function TapsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TapsState>(initialTapsState)
    const together = tapsTogether(state)
    const perMinute = fraction(state.a + state.b, state.a * state.b)
    const controls = (
        <>
            <Stepper label={l(say('A txorrota (min)', 'Grifo A (min)', 'الصنبور A (د)', 'Tap A (min)'))} value={state.a} min={TAPS_LIMITS.min} max={TAPS_LIMITS.max} onChange={(a) => setState((s) => setTaps(s, { a }))} language={props.language} />
            <Stepper label={l(say('B txorrota (min)', 'Grifo B (min)', 'الصنبور B (د)', 'Tap B (min)'))} value={state.b} min={TAPS_LIMITS.min} max={TAPS_LIMITS.max} onChange={(b) => setState((s) => setTaps(s, { b }))} language={props.language} />
        </>
    )
    const latex = `\\frac{1}{${state.a}}+\\frac{1}{${state.b}}=${texFraction(perMinute)}`
    const minutes = together.denominator === 1 ? String(together.numerator) : `${textFraction(together)} ≈ ${decimal(together.numerator / together.denominator, props.language)}`
    const note = l(say(`Minutu bakoitzean ${textFraction(perMinute)} betetzen dute: batera ${minutes} min.`, `Cada minuto llenan ${textFraction(perMinute)}: juntos tardan ${minutes} min.`, `يملآن في كل دقيقة ${textFraction(perMinute)}: معًا يحتاجان ${minutes} د.`, `Each minute they fill ${textFraction(perMinute)}: together they take ${minutes} min.`))
    const scale = 12
    const bars = [
        { label: 'A', minutes: state.a, color: STAGE },
        { label: 'B', minutes: state.b, color: SECOND },
        { label: 'A + B', minutes: together.numerator / together.denominator, color: GREEN }
    ]
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={tapsChallenges} state={state}>
            <Board height={200} label={l(say('Depositua betetzeko minutuak', 'Minutos para llenar el depósito', 'الدقائق اللازمة لملء الخزان', 'Minutes to fill the tank'))}>
                {bars.map((bar, index) => (
                    <g key={bar.label}>
                        <Text x={56} y={44 + index * 52} size={16} color={bar.color} anchor="end">{bar.label}</Text>
                        <rect x={70} y={22 + index * 52} width={bar.minutes * scale} height={30} rx={6} fill={bar.color} opacity={0.85} />
                        <Text x={78 + bar.minutes * scale} y={44 + index * 52} size={15} anchor="start">{`${index === 2 ? (together.denominator === 1 ? together.numerator : decimal(bar.minutes, props.language)) : bar.minutes} min`}</Text>
                    </g>
                ))}
                <line x1={70} x2={70} y1={14} y2={176} stroke={INK} strokeWidth={1.6} />
                {[0, 10, 20, 30, 40].map((minute) => <Text key={minute} x={70 + minute * scale} y={194} size={12} color={MUTED} weight={400}>{minute}</Text>)}
            </Board>
        </ToolFrame>
    )
}
