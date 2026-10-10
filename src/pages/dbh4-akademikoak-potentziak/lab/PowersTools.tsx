import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { FractionValue } from '../../../features/unit-v2/math/fraction'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import {
    CHANGE_BASES,
    CHANGE_VALUE_LIMITS,
    changeBracket,
    changeChallenges,
    changeLog,
    COMMON_LIMITS,
    commonChallenges,
    commonOf,
    compareRadicals,
    CONJUGATE_LIMITS,
    conjugateChallenges,
    conjugateOf,
    EXTRACT_LIMITS,
    EXTRACT_PRIMES,
    extractChallenges,
    extractOf,
    extractRadicand,
    FRACTIONAL_BASES,
    FRACTIONAL_LIMITS,
    fractionalChallenges,
    fractionalValue,
    initialChangeState,
    initialCommonState,
    initialConjugateState,
    initialExtractState,
    initialFractionalState,
    initialLadderState,
    initialRationalizeState,
    initialRulesState,
    LADDER_BASES,
    LADDER_LIMITS,
    ladderChallenges,
    ladderValue,
    RATIONALIZE_BASES,
    RATIONALIZE_LIMITS,
    rationalizeChallenges,
    rationalizeOf,
    RULES_LIMIT,
    rulesChallenges,
    rulesExponents,
    rulesValue,
    setChange,
    setCommon,
    setConjugate,
    setExtract,
    setFractional,
    setLadder,
    setRationalize,
    setRules,
    type ChangeState,
    type CommonState,
    type ConjugateState,
    type ExtractState,
    type FractionalState,
    type LadderState,
    type RationalizeState,
    type RulesState
} from './labTools'

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const MUSTARD_TINT = 'var(--mustard-tint, #fbebc0)'
const CARD = 'var(--card, #fffcf6)'
const PAPER = '#fffcf6'

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const minus = (value: number | string) => String(value).replace(/-/g, '−')
/** A fraction in LaTeX */
const texFraction = (value: FractionValue) => (value.denominator === 1 ? String(value.numerator) : `${value.numerator < 0 ? '-' : ''}\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`)
/** A fraction as plain text */
const textFraction = (value: FractionValue) => minus(value.denominator === 1 ? String(value.numerator) : `${value.numerator}/${value.denominator}`)
/** A decimal with the comma, or the point in Arabic */
const decimal = (value: number, language: UnitLanguage, digits = 3) => minus(String(Math.round(value * 10 ** digits) / 10 ** digits).replace('.', language === 'ar' ? '.' : ','))
/** A root written with Unicode: √a, ∛a, ⁴√a… */
const SUPERSCRIPT: Record<string, string> = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '-': '⁻' }
const sup = (value: number | string) => String(value).split('').map((digit) => SUPERSCRIPT[digit] ?? digit).join('')
const root = (index: number, radicand: number | string) => (index === 2 ? `√${radicand}` : index === 3 ? `∛${radicand}` : `${sup(index)}√${radicand}`)
const texRoot = (index: number, radicand: number | string) => (index === 2 ? `\\sqrt{${radicand}}` : `\\sqrt[${index}]{${radicand}}`)

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

/** A row of factor chips: the prime, repeated `count` times, coloured by group */
function Chips({ x, y, prime, count, index, size = 30 }: { x: number; y: number; prime: number; count: number; index: number; size?: number }) {
    return (
        <g>
            {Array.from({ length: count }, (_, position) => {
                const group = Math.floor(position / index)
                const full = (group + 1) * index <= count
                return (
                    <g key={position}>
                        <rect x={x + position * (size + 4)} y={y} width={size} height={size} rx={7} fill={full ? (group % 2 === 0 ? MUSTARD_TINT : '#f6d5cc') : CARD} stroke={full ? SECOND : INK} strokeWidth={1.6} />
                        <Text x={x + position * (size + 4) + size / 2} y={y + size / 2 + 6} size={15}>{prime}</Text>
                    </g>
                )
            })}
        </g>
    )
}

/* ---------- 1. The factorizing machine ---------- */

export function RulesTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RulesState>(initialRulesState)
    const { two, three } = rulesExponents(state)
    const value = rulesValue(state)
    const controls = (
        <>
            <Stepper label="m (12ᵐ)" value={state.m} min={-RULES_LIMIT} max={RULES_LIMIT} onChange={(next) => setState((s) => setRules(s, { m: next }))} language={props.language} />
            <Stepper label="n (6ⁿ)" value={state.n} min={-RULES_LIMIT} max={RULES_LIMIT} onChange={(next) => setState((s) => setRules(s, { n: next }))} language={props.language} />
        </>
    )
    const latex = `12^{${state.m}}:6^{${state.n}}=2^{${two}}\\cdot 3^{${three}}=${texFraction(value)}`
    const bar = (count: number, y: number, color: string, prime: number) => (
        <g>
            <Text x={60} y={y + 22} size={20} color={color}>{prime}</Text>
            <line x1={330} x2={330} y1={y - 6} y2={y + 38} stroke={INK} strokeWidth={2} />
            {Array.from({ length: Math.abs(count) }, (_, index) => (
                <rect key={index} x={count > 0 ? 334 + index * 26 : 304 - index * 26} y={y} width={22} height={32} rx={6} fill={color} fillOpacity={0.35} stroke={color} strokeWidth={1.6} />
            ))}
            <Text x={count >= 0 ? 340 + Math.abs(count) * 26 + 12 : 300 - Math.abs(count) * 26 - 12} y={y + 22} size={16} color={color} anchor={count >= 0 ? 'start' : 'end'}>{`${prime}${sup(count)}`}</Text>
        </g>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={l(say('Eskuinean, zenbakitzailean; ezkerrean, izendatzailean.', 'A la derecha, en el numerador; a la izquierda, en el denominador.', 'إلى اليمين في البسط، وإلى اليسار في المقام.'))} />} challenges={rulesChallenges} state={state}>
            <Board height={250} label={l(say('2-ren eta 3-ren berretzaileak', 'Los exponentes del 2 y del 3', 'أسس 2 و3'))}>
                <Text x={320} y={40} size={22}>{`12${sup(state.m)} : 6${sup(state.n)} = (2²·3)${sup(state.m)} : (2·3)${sup(state.n)}`}</Text>
                {bar(two, 80, STAGE, 2)}
                {bar(three, 140, SECOND, 3)}
                <Text x={320} y={226} size={24} color={SECOND}>{`= ${textFraction(value)}`}</Text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 2. Fractional exponent ---------- */

export function FractionalTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<FractionalState>(initialFractionalState)
    const base = FRACTIONAL_BASES[state.base]
    const value = fractionalValue(state)
    const controls = (
        <>
            <Stepper label={l(say('Oinarria', 'Base', 'الأساس'))} value={state.base} min={0} max={FRACTIONAL_BASES.length - 1} format={(index) => String(FRACTIONAL_BASES[index])} onChange={(next) => setState((s) => setFractional(s, { base: next }))} language={props.language} />
            <Stepper label={l(say('Zenbakitzailea (berretura)', 'Numerador (potencia)', 'البسط (القوة)'))} value={state.p} min={-FRACTIONAL_LIMITS.numerator} max={FRACTIONAL_LIMITS.numerator} onChange={(next) => setState((s) => setFractional(s, { p: next }))} language={props.language} />
            <Stepper label={l(say('Izendatzailea (indizea)', 'Denominador (índice)', 'المقام (الدليل)'))} value={state.q} min={1} max={FRACTIONAL_LIMITS.denominator} onChange={(next) => setState((s) => setFractional(s, { q: next }))} language={props.language} />
        </>
    )
    const radical = state.q === 1 ? `${base}^{${state.p}}` : `\\left(${texRoot(state.q, base)}\\right)^{${state.p}}`
    const latex = `${base}^{\\frac{${state.p}}{${state.q}}}=${radical}${value ? `=${texFraction(value)}` : ''}`
    const rootValue = Math.round(base ** (1 / state.q))
    const exact = rootValue ** state.q === base
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={value ? l(say('Erroa zehatza da.', 'La raíz es exacta.', 'الجذر دقيق.')) : l(say('Erroa ez da zehatza: emaitza irrazionala da.', 'La raíz no es exacta: el resultado es irracional.', 'الجذر غير دقيق: النتيجة غير نسبية.'))} />} challenges={fractionalChallenges} state={state}>
            <Board height={220} label={l(say('Lehenik erroa, gero berretura', 'Primero la raíz, después la potencia', 'الجذر أولًا ثم القوة'))}>
                <rect x={30} y={60} width={140} height={80} rx={14} fill={STAGE_TINT} stroke={INK} strokeWidth={1.8} />
                <Text x={100} y={112} size={30}>{base}</Text>
                <line x1={176} x2={246} y1={100} y2={100} stroke={MUTED} strokeWidth={2} />
                <Text x={211} y={86} size={16} color={STAGE}>{root(state.q, '')}</Text>
                <rect x={252} y={60} width={140} height={80} rx={14} fill={exact ? MUSTARD_TINT : CARD} stroke={INK} strokeWidth={1.8} />
                <Text x={322} y={112} size={exact ? 30 : 22}>{exact ? rootValue : root(state.q, base)}</Text>
                <line x1={398} x2={468} y1={100} y2={100} stroke={MUTED} strokeWidth={2} />
                <Text x={433} y={86} size={16} color={STAGE}>{`( )${sup(state.p)}`}</Text>
                <rect x={474} y={60} width={140} height={80} rx={14} fill={value ? '#f6d5cc' : CARD} stroke={INK} strokeWidth={1.8} />
                <Text x={544} y={112} size={value ? 28 : 18} color={value ? SECOND : MUTED}>{value ? textFraction(value) : '∉ ℚ'}</Text>
                <Text x={320} y={190} size={16} color={MUTED} weight={400}>{`a^(p/q) = ${root(state.q, 'a')}^p`}</Text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 3. Common index ---------- */

export function CommonTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CommonState>(initialCommonState)
    const common = commonOf(state)
    const order = compareRadicals(state)
    const sign = order > 0 ? '>' : order < 0 ? '<' : '='
    const controls = (
        <>
            <Stepper label={l(say('1. indizea', '1.er índice', 'الدليل 1'))} value={state.firstIndex} min={COMMON_LIMITS.index.min} max={COMMON_LIMITS.index.max} onChange={(next) => setState((s) => setCommon(s, { firstIndex: next }))} language={props.language} />
            <Stepper label={l(say('1. errokizuna', '1.er radicando', 'ما تحت الجذر 1'))} value={state.firstRadicand} min={COMMON_LIMITS.radicand.min} max={COMMON_LIMITS.radicand.max} onChange={(next) => setState((s) => setCommon(s, { firstRadicand: next }))} language={props.language} />
            <Stepper label={l(say('2. indizea', '2.º índice', 'الدليل 2'))} value={state.secondIndex} min={COMMON_LIMITS.index.min} max={COMMON_LIMITS.index.max} onChange={(next) => setState((s) => setCommon(s, { secondIndex: next }))} language={props.language} />
            <Stepper label={l(say('2. errokizuna', '2.º radicando', 'ما تحت الجذر 2'))} value={state.secondRadicand} min={COMMON_LIMITS.radicand.min} max={COMMON_LIMITS.radicand.max} onChange={(next) => setState((s) => setCommon(s, { secondRadicand: next }))} language={props.language} />
        </>
    )
    const latex = `${texRoot(state.firstIndex, state.firstRadicand)}=${texRoot(common.index, common.first)}\\quad ${texRoot(state.secondIndex, state.secondRadicand)}=${texRoot(common.index, common.second)}`
    const column = (x: number, index: number, radicand: number, power: number, value: number, color: string) => (
        <g>
            <rect x={x} y={30} width={250} height={150} rx={16} fill={STAGE_TINT} stroke={INK} strokeWidth={1.8} />
            <Text x={x + 125} y={74} size={28}>{root(index, radicand)}</Text>
            <Text x={x + 125} y={112} size={18} color={MUTED} weight={400}>{`${root(common.index, `${radicand}${sup(power)}`)}`}</Text>
            <Text x={x + 125} y={154} size={26} color={color}>{root(common.index, value)}</Text>
        </g>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={l(say(`Indize komuna: m.k.t.(${state.firstIndex}, ${state.secondIndex}) = ${common.index}.`, `Índice común: m.c.m.(${state.firstIndex}, ${state.secondIndex}) = ${common.index}.`, `الدليل المشترك: م.م.أ(${state.firstIndex}، ${state.secondIndex}) = ${common.index}.`))} />} challenges={commonChallenges} state={state}>
            <Board height={220} label={l(say('Bi erradikal indize komunarekin', 'Dos radicales con índice común', 'جذران بدليل مشترك'))}>
                {column(30, state.firstIndex, state.firstRadicand, common.index / state.firstIndex, common.first, order >= 0 ? SECOND : STAGE)}
                <Text x={320} y={118} size={40} color={SECOND}>{sign}</Text>
                {column(360, state.secondIndex, state.secondRadicand, common.index / state.secondIndex, common.second, order <= 0 ? SECOND : STAGE)}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 4. Factors out of a root ---------- */

export function ExtractTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ExtractState>(initialExtractState)
    const radicand = extractRadicand(state)
    const { outside, inside } = extractOf(state)
    const controls = (
        <>
            {EXTRACT_PRIMES.map((prime, index) => (
                <Stepper key={prime} label={l(say(`${prime}ren berretzailea`, `Exponente del ${prime}`, `أس ${prime}`))} value={state.exponents[index]} min={0} max={EXTRACT_LIMITS.exponent} onChange={(next) => setState((s) => setExtract(s, { prime: index, exponent: next }))} language={props.language} />
            ))}
            <Stepper label={l(say('Indizea', 'Índice', 'الدليل'))} value={state.index} min={EXTRACT_LIMITS.index.min} max={EXTRACT_LIMITS.index.max} onChange={(next) => setState((s) => setExtract(s, { index: next }))} language={props.language} />
        </>
    )
    const result = inside === 1 ? String(outside) : `${outside === 1 ? '' : outside}${texRoot(state.index, inside)}`
    const latex = `${texRoot(state.index, radicand)}=${result}`
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={l(say(`${state.index}ko talde osoak (koloreztatuak) errotik ateratzen dira.`, `Los grupos completos de ${state.index} (en color) salen de la raíz.`, `المجموعات الكاملة من ${state.index} (الملوّنة) تخرج من الجذر.`))} />} challenges={extractChallenges} state={state}>
            <Board height={230} label={l(say('Errokizunaren faktore lehenak taldeka', 'Los factores primos del radicando en grupos', 'عوامل ما تحت الجذر الأولية في مجموعات'))}>
                <Text x={30} y={34} anchor="start" size={20}>{`${root(state.index, radicand)} = ${root(state.index, EXTRACT_PRIMES.map((prime, index) => (state.exponents[index] ? `${prime}${sup(state.exponents[index])}` : '')).filter(Boolean).join('·') || '1')}`}</Text>
                {EXTRACT_PRIMES.map((prime, index) => (
                    <Chips key={prime} x={30} y={56 + index * 44} prime={prime} count={state.exponents[index]} index={state.index} />
                ))}
                <Text x={30} y={214} anchor="start" size={24} color={SECOND}>{`= ${inside === 1 ? outside : `${outside === 1 ? '' : outside}${root(state.index, inside)}`}`}</Text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 5. Rationalizing a / ⁿ√bᵐ ---------- */

export function RationalizeTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RationalizeState>(initialRationalizeState)
    const result = rationalizeOf(state)
    const controls = (
        <>
            <Stepper label={l(say('Zenbakitzailea', 'Numerador', 'البسط'))} value={state.numerator} min={RATIONALIZE_LIMITS.numerator.min} max={RATIONALIZE_LIMITS.numerator.max} onChange={(next) => setState((s) => setRationalize(s, { numerator: next }))} language={props.language} />
            <Segmented label="b" value={String(state.base)} options={RATIONALIZE_BASES.map((base, index) => ({ value: String(index), label: String(base) }))} onChange={(next) => setState((s) => setRationalize(s, { base: Number(next) }))} />
            <Stepper label={l(say('Indizea', 'Índice', 'الدليل'))} value={state.index} min={RATIONALIZE_LIMITS.index.min} max={RATIONALIZE_LIMITS.index.max} onChange={(next) => setState((s) => setRationalize(s, { index: next }))} language={props.language} />
            <Stepper label={l(say('b-ren berretzailea', 'Exponente de b', 'أس b'))} value={state.exponent} min={1} max={state.index - 1} onChange={(next) => setState((s) => setRationalize(s, { exponent: next }))} language={props.language} />
        </>
    )
    const denominatorRoot = texRoot(state.index, state.exponent === 1 ? result.b : `${result.b}^{${state.exponent}}`)
    const factor = texRoot(state.index, result.missing === 1 ? result.b : `${result.b}^{${result.missing}}`)
    const outcome = `${result.coefficient === 1 ? '' : result.coefficient}${texRoot(state.index, result.factorRadicand)}`
    const latex = `\\frac{${state.numerator}}{${denominatorRoot}}\\cdot\\frac{${factor}}{${factor}}=${result.denominator === 1 ? outcome : `\\frac{${outcome}}{${result.denominator}}`}`
    const powerBoxes = (x: number, count: number, color: string) => Array.from({ length: count }, (_, index) => (
        <rect key={index} x={x + index * 30} y={120} width={26} height={30} rx={6} fill={color} fillOpacity={0.35} stroke={color} strokeWidth={1.6} />
    ))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={l(say(`Berretzailea ${state.exponent}-tik ${state.index}-raino osatzen da: falta dira ${result.missing}.`, `El exponente se completa de ${state.exponent} a ${state.index}: faltan ${result.missing}.`, `يكتمل الأس من ${state.exponent} إلى ${state.index}: ينقص ${result.missing}.`))} />} challenges={rationalizeChallenges} state={state}>
            <Board height={220} label={l(say('Berretzailea indizeraino osatu', 'Completar el exponente hasta el índice', 'إكمال الأس حتى الدليل'))}>
                <Text x={30} y={60} anchor="start" size={22}>{`${state.numerator} / ${root(state.index, `${result.b}${sup(state.exponent)}`)}`}</Text>
                <Text x={360} y={60} anchor="start" size={22} color={STAGE}>{`· ${root(state.index, `${result.b}${sup(result.missing)}`)}`}</Text>
                <Text x={30} y={108} anchor="start" size={15} color={MUTED} weight={400}>{l(say('Berretzaileak:', 'Exponentes:', 'الأسس:'))}</Text>
                {powerBoxes(30, state.exponent, SECOND)}
                {powerBoxes(30 + state.exponent * 30, result.missing, STAGE)}
                <Text x={30 + state.index * 30 + 12} y={142} anchor="start" size={18}>{`= ${state.index}`}</Text>
                <Text x={30} y={200} anchor="start" size={24} color={SECOND}>{`= ${result.coefficient === 1 ? '' : result.coefficient}${root(state.index, result.factorRadicand)}${result.denominator === 1 ? '' : ` / ${result.denominator}`}`}</Text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 6. The conjugate ---------- */

export function ConjugateTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ConjugateState>(initialConjugateState)
    const { denominator, coefficient } = conjugateOf(state)
    const controls = (
        <>
            <Stepper label={l(say('Zenbakitzailea', 'Numerador', 'البسط'))} value={state.numerator} min={CONJUGATE_LIMITS.numerator.min} max={CONJUGATE_LIMITS.numerator.max} onChange={(next) => setState((s) => setConjugate(s, { numerator: next }))} language={props.language} />
            <Stepper label="a" value={state.a} min={CONJUGATE_LIMITS.radicand.min} max={CONJUGATE_LIMITS.radicand.max} onChange={(next) => setState((s) => setConjugate(s, { a: next }))} language={props.language} />
            <Stepper label="b" value={state.b} min={CONJUGATE_LIMITS.radicand.min} max={CONJUGATE_LIMITS.radicand.max} onChange={(next) => setState((s) => setConjugate(s, { b: next }))} language={props.language} />
        </>
    )
    const r = (value: number) => (value === 1 ? '1' : `\\sqrt{${value}}`)
    const sum = `${r(state.a)}+${r(state.b)}`
    const latex = coefficient === null
        ? `\\frac{${state.numerator}}{${r(state.a)}-${r(state.b)}}\\ \\text{—}`
        : `\\frac{${state.numerator}}{${r(state.a)}-${r(state.b)}}=\\frac{${state.numerator}(${sum})}{${minus(denominator).replace('−', '-')}}${coefficient.denominator === 1 ? `=${coefficient.numerator === 1 ? '' : coefficient.numerator === -1 ? '-' : coefficient.numerator}(${sum})` : ''}`
    const rt = (value: number) => (value === 1 ? '1' : `√${value}`)
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={coefficient === null ? l(say('a = b denean izendatzailea 0 da.', 'Con a = b el denominador es 0.', 'عندما a = b يكون المقام 0.')) : l(say(`(${rt(state.a)} − ${rt(state.b)})(${rt(state.a)} + ${rt(state.b)}) = ${state.a} − ${state.b} = ${minus(denominator)}`, `(${rt(state.a)} − ${rt(state.b)})(${rt(state.a)} + ${rt(state.b)}) = ${state.a} − ${state.b} = ${minus(denominator)}`, `(${rt(state.a)} − ${rt(state.b)})(${rt(state.a)} + ${rt(state.b)}) = ${state.a} − ${state.b} = ${minus(denominator)}`))} />} challenges={conjugateChallenges} state={state}>
            <Board height={220} label={l(say('Batura bider kenketa', 'Suma por diferencia', 'المجموع في الفرق'))}>
                <rect x={30} y={30} width={260} height={64} rx={14} fill={CARD} stroke={INK} strokeWidth={1.8} />
                <Text x={160} y={72} size={24}>{`${rt(state.a)} − ${rt(state.b)}`}</Text>
                <Text x={320} y={72} size={26}>×</Text>
                <rect x={350} y={30} width={260} height={64} rx={14} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2} />
                <Text x={480} y={72} size={24} color={STAGE}>{`${rt(state.a)} + ${rt(state.b)}`}</Text>
                <Text x={320} y={140} size={22}>{`= (${rt(state.a)})² − (${rt(state.b)})² = ${state.a} − ${state.b}`}</Text>
                <Text x={320} y={190} size={28} color={denominator === 0 ? MUTED : SECOND}>{`= ${minus(denominator)}`}</Text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 7. The ladder of logarithms ---------- */

export function LadderTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<LadderState>(initialLadderState)
    const base = LADDER_BASES[state.base]
    const baseText = textFraction(base)
    const value = ladderValue(state)
    const exponents = Array.from({ length: LADDER_LIMITS.max - LADDER_LIMITS.min + 1 }, (_, index) => LADDER_LIMITS.min + index)
    const controls = (
        <>
            <Segmented label={l(say('Oinarria', 'Base', 'الأساس'))} value={String(state.base)} options={LADDER_BASES.map((item, index) => ({ value: String(index), label: textFraction(item) }))} onChange={(next) => setState((s) => setLadder(s, { base: Number(next) }))} />
            <Stepper label={l(say('Berretzailea', 'Exponente', 'الأس'))} value={state.exponent} min={LADDER_LIMITS.min} max={LADDER_LIMITS.max} onChange={(next) => setState((s) => setLadder(s, { exponent: next }))} language={props.language} />
        </>
    )
    const logBase = base.denominator === 1 ? String(base.numerator) : `1/${base.denominator}`
    const latex = `${base.denominator === 1 ? base.numerator : `\\left(${texFraction(base)}\\right)`}^{${state.exponent}}=${texFraction(value)}\\iff \\log_{${logBase}} ${texFraction(value)}=${state.exponent}`
    const step = 54
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={l(say('Logaritmoa berretzailea da: zenbat maila igo edo jaitsi diren.', 'El logaritmo es el exponente: cuántos escalones se suben o bajan.', 'اللوغاريتم هو الأس: عدد الدرجات صعودًا أو نزولًا.'))} />} challenges={ladderChallenges} state={state}>
            <Board height={250} label={l(say('Oinarriaren berreturen eskailera', 'Escalera de potencias de la base', 'سُلّم قوى الأساس'))}>
                {exponents.map((exponent, index) => {
                    const active = exponent === state.exponent
                    const x = 30 + index * step
                    const y = 190 - index * 13
                    return (
                        <g key={exponent}>
                            <rect x={x} y={y} width={step - 4} height={30} rx={6} fill={active ? SECOND : exponent === 0 ? MUSTARD_TINT : STAGE_TINT} fillOpacity={active ? 0.85 : 1} stroke={INK} strokeWidth={1.4} />
                            <Text x={x + (step - 4) / 2} y={y + 21} size={14} color={active ? PAPER : INK}>{minus(exponent)}</Text>
                            {active && <Text x={x + (step - 4) / 2} y={y - 12} size={18} color={SECOND}>{textFraction(value)}</Text>}
                        </g>
                    )
                })}
                <Text x={30} y={40} anchor="start" size={16} color={MUTED} weight={400}>{`${l(say('oinarria', 'base', 'الأساس'))} ${baseText}`}</Text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 8. Change of base ---------- */

export function ChangeBaseTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ChangeState>(initialChangeState)
    const base = CHANGE_BASES[state.base]
    const log = changeLog(state)
    const [low, high] = changeBracket(state)
    const controls = (
        <>
            <Segmented label={l(say('Oinarria', 'Base', 'الأساس'))} value={String(state.base)} options={CHANGE_BASES.map((item, index) => ({ value: String(index), label: String(item) }))} onChange={(next) => setState((s) => setChange(s, { base: Number(next) }))} />
            <Stepper label={l(say('Zenbakia', 'Número', 'العدد'))} value={state.value} min={CHANGE_VALUE_LIMITS.min} max={CHANGE_VALUE_LIMITS.max} onChange={(next) => setState((s) => setChange(s, { value: next }))} language={props.language} />
        </>
    )
    const exact = Math.abs(log - Math.round(log)) < 1e-9
    const shown = decimal(log, props.language).replace(',', '{,}').replace('−', '-')
    const latex = `\\log_{${base}} ${state.value}=\\frac{\\log ${state.value}}{\\log ${base}}${exact ? '=' : '\\approx '}${shown}`
    const x = (value: number) => 40 + value * 80
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={`${base}${sup(low)} = ${base ** low} ≤ ${state.value} < ${base ** high} = ${base}${sup(high)}`} />} challenges={changeChallenges} state={state}>
            <Board height={190} label={l(say('Logaritmoa bi berretzaile osoren artean', 'El logaritmo entre dos exponentes enteros', 'اللوغاريتم بين أسين صحيحين'))}>
                <line x1={x(0)} x2={x(7)} y1={110} y2={110} stroke={INK} strokeWidth={2} />
                {Array.from({ length: 8 }, (_, value) => (
                    <g key={value}>
                        <line x1={x(value)} x2={x(value)} y1={102} y2={118} stroke={INK} strokeWidth={1.6} />
                        <Text x={x(value)} y={142} size={15} weight={400}>{value}</Text>
                        <Text x={x(value)} y={168} size={12} color={MUTED} weight={400}>{base ** value <= 1e7 ? `${base}${sup(value)}` : ''}</Text>
                    </g>
                ))}
                {log <= 7 && (
                    <g>
                        <rect x={x(low)} y={96} width={x(high) - x(low)} height={28} fill={STAGE_TINT} fillOpacity={0.6} />
                        <circle cx={x(log)} cy={110} r={9} fill={SECOND} stroke={INK} strokeWidth={1.4} />
                        <Text x={x(log)} y={80} size={18} color={SECOND}>{decimal(log, props.language)}</Text>
                    </g>
                )}
            </Board>
        </ToolFrame>
    )
}
