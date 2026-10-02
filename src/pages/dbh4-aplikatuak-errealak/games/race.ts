import { add, checkAnswer, divide, equals, fraction, multiply, power, subtract, toLatex, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import type { LineSpec } from '../realLineMap.ts'
import {
    commaLatex,
    decimalKind,
    expand,
    expansionLatex,
    generatrixLatex,
    inequalityLatex,
    integerRoot,
    interval,
    intervalLatex,
    isPerfectSquare,
    radicalLatex,
    roundDecimal,
    scientificLatex,
    simplifySqrt,
    toScientific,
    truncateDecimal,
    type DecimalKind,
    type Interval
} from '../reals.ts'

/* ==========================================================================
   Zenbaki errealen lasterketa (4. DBH, aplikatuak): five circuits, one per
   stage. Every wrong option is a typical mistake: adding numerators and
   denominators, a negative exponent read as a negative number, 99 where 90
   goes, the part before the period not subtracted, a bracket for a
   parenthesis, truncating instead of rounding, the exponent's sign lost, a
   square taken out of a root instead of its root… Each question carries
   `meta`, the data it was built from, so the tests can check the right
   option again without trusting the generator. Interval questions read on
   the real line carry a `line` (plain data, drawn by RaceGame.tsx).
   ========================================================================== */

export const REALS_RACE_CIRCUITS = 5

export type RealsRaceError =
    | 'added'
    | 'no-flip'
    | 'negative-power'
    | 'no-inverse'
    | 'exponents-multiplied'
    | 'exponent-sign'
    | 'denominator-factors'
    | 'period-place'
    | 'nines-zeros'
    | 'forgot-subtract'
    | 'irrational-set'
    | 'bracket'
    | 'endpoints'
    | 'root-guess'
    | 'truncated'
    | 'wrong-place'
    | 'error-meaning'
    | 'exponent-count'
    | 'mantissa'
    | 'radical-pairs'
    | 'unlike-radicals'
    | 'forgot-root'
    | 'calculation'

export type RealsRaceMeta =
    | { kind: 'fraction-op'; a: FractionValue; b: FractionValue; op: '+' | '-' | ':'; result: FractionValue; values: Array<FractionValue | null> }
    | { kind: 'negative-power'; base: FractionValue; exponent: number; values: Array<FractionValue | null> }
    | { kind: 'power-product'; base: number; p: number; q: number; r: number; exponent: number }
    | { kind: 'kind-pick'; target: DecimalKind; fractions: FractionValue[]; right: number }
    | { kind: 'expansion'; value: FractionValue }
    | { kind: 'generatrix'; value: FractionValue; values: FractionValue[] }
    | { kind: 'irrational-pick'; right: number; rational: boolean[] }
    | { kind: 'interval'; value: Interval; options: Interval[]; right: number }
    | { kind: 'interval-count'; value: Interval; count: number }
    | { kind: 'sqrt-between'; n: number; low: number }
    | { kind: 'round'; text: string; places: number; rounded: string }
    | { kind: 'abs-error'; real: string; approximation: string; error: string }
    | { kind: 'scientific'; text: string; mantissa: string; exponent: number }
    | { kind: 'sci-product'; a: string; m: number; b: string; n: number; mantissa: string; exponent: number }
    | { kind: 'root'; radicand: number; index: number; value: number }
    | { kind: 'simplify'; radicand: number; outside: number; inside: number }
    | { kind: 'like-radicals'; terms: Array<{ coefficient: number; radicand: number }>; inside: number; total: number }
    | { kind: 'radical-product'; a: number; b: number; value: number }

export type RealsRaceQuestion = RaceQuestion<RealsRaceError> & { meta: RealsRaceMeta; line?: LineSpec }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => say(`$${latex}$`, `$${latex}$`, `$${latex}$`)
const math = (latex: string) => `$${latex}$`
const bracket = (latex: string) => (latex.startsWith('-') ? `\\left(${latex}\\right)` : latex)

interface Choice {
    latex: string
    error: RealsRaceError | null
}

/** Four distinct options: the right one and three typical mistakes (never written like the right one) */
function pickOptions(random: Random, right: Choice, wrongs: Choice[]): RaceOption<RealsRaceError>[] | null {
    const used = new Set([right.latex])
    const chosen: Choice[] = []
    for (const wrong of wrongs) {
        if (chosen.length === 3) break
        if (used.has(wrong.latex)) continue
        used.add(wrong.latex)
        chosen.push(wrong)
    }
    if (chosen.length < 3) return null
    return shuffle(random, [{ latex: right.latex, correct: true, error: null as RealsRaceError | null }, ...chosen.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

const numberChoice = (value: number, error: RealsRaceError): Choice => ({ latex: String(value), error })
const near = (value: number): Choice[] => [value + 1, value - 1, value + 2, value - 2].map((item) => numberChoice(item, 'calculation'))

function build(circuit: number, kind: string, prompt: LocalizedText, options: RaceOption<RealsRaceError>[], answer: FractionValue | null, worked: LocalizedText, meta: RealsRaceMeta, line?: LineSpec): RealsRaceQuestion {
    return { circuit, kind, prompt, options, answer: answer ?? fraction(0), answerForm: 'any', percentAnswer: false, writable: answer !== null, solution: worked, meta, ...(line ? { line } : {}) }
}

/** The fraction (as a value) each option shows, so the tests can recompute it */
const fractionValues = (options: RaceOption<RealsRaceError>[], candidates: Array<{ latex: string; value: FractionValue }>) => options.map((option) => candidates.find((item) => item.latex === option.latex)?.value ?? null)

/* ---------- Circuit 0: fractions and powers ---------- */

function smallFraction(random: Random, maxDenominator: number): FractionValue {
    const denominator = randomInt(random, 2, maxDenominator)
    const numerator = randomInt(random, 1, denominator * 2 - 1)
    const value = fraction(numerator, denominator)
    return value.denominator === 1 ? smallFraction(random, maxDenominator) : value
}

function fractionOpQuestion(random: Random, tier: Tier): RealsRaceQuestion | null {
    const a = smallFraction(random, tier === 0 ? 6 : 9)
    const b = smallFraction(random, tier === 0 ? 6 : 9)
    if (a.denominator === b.denominator) return null
    const op = pick(random, tier === 0 ? (['+', '-'] as const) : (['+', '-', ':'] as const))
    const result = op === '+' ? add(a, b) : op === '-' ? subtract(a, b) : divide(a, b)
    const naive = (top: number, bottom: number) => fraction(top, bottom)
    const candidates: Array<{ latex: string; value: FractionValue; error: RealsRaceError }> = op === ':'
        ? [
            { value: multiply(a, b), error: 'no-flip' },
            { value: divide(b, a), error: 'no-flip' },
            { value: fraction(-result.numerator, result.denominator), error: 'calculation' },
            { value: add(result, fraction(1)), error: 'calculation' }
        ].map((item) => ({ ...item, latex: toLatex(item.value) })) as Array<{ latex: string; value: FractionValue; error: RealsRaceError }>
        : [
            { value: naive(op === '+' ? a.numerator + b.numerator : a.numerator - b.numerator, a.denominator + b.denominator), error: 'added' },
            { value: naive(op === '+' ? a.numerator + b.numerator : a.numerator - b.numerator, a.denominator * b.denominator), error: 'added' },
            { value: op === '+' ? subtract(a, b) : add(a, b), error: 'calculation' },
            { value: fraction(-result.numerator, result.denominator), error: 'calculation' }
        ].map((item) => ({ ...item, latex: toLatex(item.value) })) as Array<{ latex: string; value: FractionValue; error: RealsRaceError }>
    const wrongs = candidates.filter((item) => !equals(item.value, result))
    const options = pickOptions(random, { latex: toLatex(result), error: null }, wrongs)
    if (!options) return null
    const sign = op === ':' ? '\\mathbin{:}' : op
    const statement = `${toLatex(a)}${sign}${toLatex(b)}`
    const worked = op === ':'
        ? `${statement}=\\frac{${a.numerator}\\cdot ${b.denominator}}{${a.denominator}\\cdot ${b.numerator}}=${toLatex(result)}`
        : `${statement}=\\frac{${a.numerator * b.denominator}${op}${b.numerator * a.denominator}}{${a.denominator * b.denominator}}=${toLatex(result)}`
    return build(0, op === ':' ? 'fraction-div' : 'fraction-sum', same(`${statement}=\\ ?`), options, result, same(worked), { kind: 'fraction-op', a, b, op, result, values: fractionValues(options, [{ latex: toLatex(result), value: result }, ...candidates]) })
}

function negativePowerQuestion(random: Random, tier: Tier): RealsRaceQuestion | null {
    const top = randomInt(random, 1, 5)
    const bottom = randomInt(random, 2, 6)
    const base = fraction(top, bottom)
    if (base.denominator === 1 || base.numerator === 1 && tier === 0 && random() < 0.5) return null
    const exponent = tier === 0 ? randomInt(random, 1, 2) : randomInt(random, 2, 3)
    const result = power(base, -exponent)
    const straight = power(base, exponent)
    const candidates: Array<{ latex: string; value: FractionValue; error: RealsRaceError }> = [
        { value: fraction(-straight.numerator, straight.denominator), error: 'negative-power' as const },
        { value: straight, error: 'no-inverse' as const },
        { value: fraction(-result.numerator, result.denominator), error: 'negative-power' as const },
        { value: fraction(base.denominator ** exponent, base.numerator), error: 'calculation' as const }
    ].map((item) => ({ ...item, latex: toLatex(item.value) }))
    const options = pickOptions(random, { latex: toLatex(result), error: null }, candidates.filter((item) => !equals(item.value, result)))
    if (!options) return null
    const statement = `\\left(${toLatex(base)}\\right)^{-${exponent}}`
    return build(0, 'negative-power', same(`${statement}=\\ ?`), options, result, same(`${statement}=\\left(\\frac{${base.denominator}}{${base.numerator}}\\right)^{${exponent}}=${toLatex(result)}`), { kind: 'negative-power', base, exponent, values: fractionValues(options, [{ latex: toLatex(result), value: result }, ...candidates]) })
}

function powerProductQuestion(random: Random, tier: Tier): RealsRaceQuestion | null {
    const base = pick(random, [2, 3, 5, 10])
    const p = tier === 0 ? randomInt(random, 2, 6) : randomInt(random, -4, 7)
    const q = tier === 0 ? randomInt(random, 2, 5) : randomInt(random, -5, 6)
    const r = tier === 2 ? randomInt(random, -4, 6) : randomInt(random, 1, 4)
    if (p === 0 || q === 0 || r === 0) return null
    const exponent = p + q - r
    const options = pickOptions(random, numberChoice(exponent, 'calculation'), [numberChoice(p * q - r, 'exponents-multiplied'), numberChoice(p + q + r, 'exponent-sign'), numberChoice(p * q / r, 'exponents-multiplied'), ...near(exponent)].filter((item) => Number.isInteger(Number(item.latex))))
    if (!options) return null
    const pow = (exponentValue: number) => `${base}^{${exponentValue}}`
    const statement = `${pow(p)}\\cdot ${pow(q)}\\mathbin{:}${pow(r)}`
    return build(0, 'power-product', say(`${math(`${statement}=${base}^{\\,?}`)} Zein da berretzailea?`, `${math(`${statement}=${base}^{\\,?}`)} ¿Cuál es el exponente?`, `${math(`${statement}=${base}^{\\,?}`)} ما الأس؟`), options, fraction(exponent), same(`${p}+${bracket(String(q))}-${bracket(String(r))}=${exponent}\\ \\to\\ ${pow(exponent)}`), { kind: 'power-product', base, p, q, r, exponent })
}

/* ---------- Circuit 1: decimals and their fraction ---------- */

const kindDenominators: Record<DecimalKind, number[]> = { exact: [2, 4, 5, 8, 20, 25, 40], pure: [3, 7, 9, 11, 27, 33], mixed: [6, 12, 15, 22, 30, 45] }

function fractionOfKind(random: Random, kind: DecimalKind): FractionValue {
    const denominator = pick(random, kindDenominators[kind])
    for (;;) {
        const numerator = randomInt(random, 1, denominator * 2)
        const value = fraction(numerator, denominator)
        if (value.denominator === denominator) return value
    }
}

const kindNames: Record<DecimalKind, LocalizedText> = {
    exact: say('hamartar zehatza', 'un decimal exacto', 'عددًا عشريًا منتهيًا'),
    pure: say('hamartar periodiko hutsa', 'un decimal periódico puro', 'عددًا عشريًا دوريًا بحتًا'),
    mixed: say('hamartar periodiko mistoa', 'un decimal periódico mixto', 'عددًا عشريًا دوريًا مختلطًا')
}

function kindPickQuestion(random: Random): RealsRaceQuestion | null {
    const target = pick(random, ['exact', 'pure', 'mixed'] as const)
    const others = (['exact', 'pure', 'mixed'] as const).filter((kind) => kind !== target)
    const right = fractionOfKind(random, target)
    const wrongFractions = [fractionOfKind(random, others[0]), fractionOfKind(random, others[1]), fractionOfKind(random, pick(random, others))]
    const options = pickOptions(random, { latex: toLatex(right), error: null }, wrongFractions.map((value) => ({ latex: toLatex(value), error: 'denominator-factors' as const })))
    if (!options) return null
    const fractions = options.map((option) => (option.correct ? right : wrongFractions.find((value) => toLatex(value) === option.latex)!))
    const name = kindNames[target]
    const kind = decimalKind(expand(right))
    return build(1, 'kind-pick', say(`Zein zatikik ematen du ${name.eu}?`, `¿Qué fracción da ${name.es}?`, `أي كسر يعطي ${name.ar}؟`), options, null, same(`${toLatex(right)}=${expansionLatex(expand(right))}`), { kind: 'kind-pick', target: kind, fractions, right: options.findIndex((option) => option.correct) })
}

function expansionQuestion(random: Random): RealsRaceQuestion | null {
    const value = fractionOfKind(random, pick(random, ['pure', 'mixed'] as const))
    const expansion = expand(value)
    const right = expansionLatex(expansion)
    const { integer, preperiod, period } = expansion
    const shifted: Choice[] = preperiod === ''
        ? period.length === 1 ? [] : [{ latex: `${integer}{,}${period[0]}\\overline{${period.slice(1) || period}}`, error: 'period-place' }]
        : [{ latex: `${integer}{,}\\overline{${preperiod}${period}}`, error: 'period-place' }, { latex: `${integer}{,}${preperiod}${period}`, error: 'period-place' }]
    const neighbours: Choice[] = [fraction(value.numerator + 1, value.denominator), fraction(value.numerator - 1, value.denominator), fraction(value.numerator, value.denominator + 1)]
        .filter((item) => item.numerator > 0)
        .map((item) => ({ latex: expansionLatex(expand(item)), error: 'calculation' as const }))
    const wrongs = [...shifted, { latex: `${integer}{,}${preperiod}${period}`, error: 'period-place' as const }, ...shuffle(random, neighbours)]
    const options = pickOptions(random, { latex: right, error: null }, wrongs)
    if (!options) return null
    return build(1, 'expansion', same(`${toLatex(value)}=\\ ?`), options, null, say(`${math(`${value.numerator}\\mathbin{:}${value.denominator}=${right}`)}: hondarrak errepikatzen dira.`, `${math(`${value.numerator}\\mathbin{:}${value.denominator}=${right}`)}: los restos se repiten.`, `${math(`${value.numerator}\\mathbin{:}${value.denominator}=${right}`)}: البواقي تتكرر.`), { kind: 'expansion', value })
}

function generatrixQuestion(random: Random, tier: Tier): RealsRaceQuestion | null {
    const kind: DecimalKind = tier === 0 ? pick(random, ['exact', 'pure'] as const) : tier === 1 ? pick(random, ['pure', 'mixed'] as const) : 'mixed'
    const value = fractionOfKind(random, kind)
    const expansion = expand(value)
    const { integer, preperiod, period } = expansion
    const digits = Number(integer + preperiod + period)
    const before = Number(integer + preperiod)
    const nines = '9'.repeat(period.length)
    const zeros = '0'.repeat(preperiod.length)
    const candidates: Array<{ value: FractionValue; error: RealsRaceError }> = kind === 'exact'
        ? [
            { value: fraction(digits, 10 ** (preperiod.length + 1)), error: 'nines-zeros' },
            { value: fraction(digits, Number('9'.repeat(Math.max(1, preperiod.length)))), error: 'nines-zeros' },
            { value: fraction(digits, 10 ** Math.max(0, preperiod.length - 1)), error: 'nines-zeros' }
        ]
        : [
            { value: fraction(digits, Number(nines + zeros)), error: 'forgot-subtract' },
            { value: fraction(digits - before, Number(nines + '9'.repeat(preperiod.length))), error: 'nines-zeros' },
            { value: fraction(digits - before, 10 ** (preperiod.length + period.length)), error: 'nines-zeros' },
            { value: fraction(digits - before, Number(nines + '9' + zeros)), error: 'nines-zeros' },
            { value: fraction(digits - Number(integer), Number(nines + zeros)), error: 'forgot-subtract' }
        ]
    const wrongs = candidates.filter((item) => !equals(item.value, value)).map((item) => ({ ...item, latex: toLatex(item.value) }))
    const options = pickOptions(random, { latex: toLatex(value), error: null }, wrongs)
    if (!options) return null
    const values = options.map((option) => (option.correct ? value : wrongs.find((item) => item.latex === option.latex)!.value))
    const decimal = expansionLatex(expansion)
    return build(1, kind === 'exact' ? 'exact-fraction' : 'generatrix', say(`Zein da ${math(decimal)} zenbakiaren zatiki sortzailea?`, `¿Cuál es la fracción generatriz de ${math(decimal)}?`, `ما الكسر المولّد للعدد ${math(decimal)}؟`), options, value, same(`${decimal}=${generatrixLatex(expansion)}=${toLatex(value)}`), { kind: 'generatrix', value, values })
}

/* ---------- Circuit 2: real numbers and intervals ---------- */

function irrationalPickQuestion(random: Random, tier: Tier): RealsRaceQuestion | null {
    const nonSquares = [2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 15, 17, 20]
    const irrationals = tier === 0
        ? [`\\sqrt{${pick(random, nonSquares)}}`, '\\pi']
        : [`\\sqrt{${pick(random, nonSquares)}}`, '\\pi', `1+\\sqrt{${pick(random, nonSquares)}}`, '0{,}1010010001\\ldots', `\\frac{\\sqrt{${pick(random, nonSquares)}}}{2}`]
    const k = randomInt(random, 2, 9)
    const periodic = fractionOfKind(random, pick(random, ['pure', 'mixed'] as const))
    const rationals = [`\\sqrt{${k * k}}`, expansionLatex(expand(periodic)), toLatex(smallFraction(random, 9)), `-${randomInt(random, 2, 9)}`, `\\frac{\\sqrt{${k * k}}}{${k + 1}}`, commaLatex(String(randomInt(random, 11, 99) / 10))]
    const right = pick(random, irrationals)
    const wrongs = shuffle(random, rationals).map((latex) => ({ latex, error: 'irrational-set' as const }))
    const options = pickOptions(random, { latex: right, error: null }, wrongs)
    if (!options) return null
    return build(2, 'irrational-pick', say('Zein zenbaki da irrazionala?', '¿Qué número es irracional?', 'أي عدد غير نسبي؟'), options, null, say(`${math(right)}: hamartar infinitu, periodorik gabe. Besteak zatiki gisa idatz daitezke.`, `${math(right)}: infinitos decimales sin periodo. Los demás se pueden escribir como fracción.`, `${math(right)}: منازل عشرية لا نهائية بلا دور. أما البقية فتُكتب كسورًا.`), { kind: 'irrational-pick', right: options.findIndex((option) => option.correct), rational: options.map((option) => !option.correct) })
}

function randomInterval(random: Random, tier: Tier): Interval {
    const from = randomInt(random, -6, 3)
    const to = from + randomInt(random, 2, 6)
    if (tier === 2 && random() < 0.4) return random() < 0.5 ? interval(null, to, false, random() < 0.5) : interval(from, null, random() < 0.5, false)
    return interval(from, to, random() < 0.5, random() < 0.5)
}

function intervalQuestion(random: Random, tier: Tier): RealsRaceQuestion | null {
    const value = randomInterval(random, tier)
    const flips: Array<{ value: Interval; error: RealsRaceError }> = [
        { value: interval(value.from, value.to, !value.closedFrom, value.closedTo), error: 'bracket' },
        { value: interval(value.from, value.to, value.closedFrom, !value.closedTo), error: 'bracket' },
        { value: interval(value.from, value.to, !value.closedFrom, !value.closedTo), error: 'bracket' },
        // A ray pointing the wrong way, with either end
        ...(value.from === null ? [true, false].map((closed) => ({ value: interval(value.to, null, closed, false), error: 'endpoints' as const })) : []),
        ...(value.to === null ? [true, false].map((closed) => ({ value: interval(null, value.from, false, closed), error: 'endpoints' as const })) : [])
    ]
    const wrongs = shuffle(random, flips).map((item) => ({ ...item, latex: intervalLatex(item.value) }))
    const options = pickOptions(random, { latex: intervalLatex(value), error: null }, wrongs)
    if (!options) return null
    const shown = options.map((option) => (option.correct ? value : wrongs.find((item) => item.latex === option.latex)!.value))
    const meta: RealsRaceMeta = { kind: 'interval', value, options: shown, right: options.findIndex((option) => option.correct) }
    const solution = same(`${inequalityLatex(value)}\\ \\to\\ ${intervalLatex(value)}`)
    if (tier === 0 || random() < 0.5) {
        return build(2, 'interval-inequality', say(`Zein tarte da ${math(inequalityLatex(value))}?`, `¿Qué intervalo es ${math(inequalityLatex(value))}?`, `ما الفترة ${math(inequalityLatex(value))}؟`), options, null, solution, meta)
    }
    const ends = [value.from, value.to].filter((end): end is number => end !== null)
    const line: LineSpec = { from: Math.min(...ends) - 2, to: Math.max(...ends) + 2, intervals: [{ value }] }
    return build(2, 'interval-line', say('Zein tarte dago marraztuta?', '¿Qué intervalo está dibujado?', 'ما الفترة المرسومة؟'), options, null, solution, meta, line)
}

function intervalCountQuestion(random: Random): RealsRaceQuestion | null {
    const from = randomInt(random, -6, 2)
    const to = from + randomInt(random, 3, 8)
    const value = interval(from, to, random() < 0.5, random() < 0.5)
    const count = to - from - 1 + (value.closedFrom ? 1 : 0) + (value.closedTo ? 1 : 0)
    const options = pickOptions(random, numberChoice(count, 'calculation'), shuffle(random, [numberChoice(to - from + 1, 'bracket'), numberChoice(to - from - 1, 'bracket'), numberChoice(to - from, 'bracket'), numberChoice(to + from, 'calculation'), ...near(count)]))
    if (!options) return null
    const members = Array.from({ length: to - from + 1 }, (_, index) => from + index).filter((x) => (x > from || value.closedFrom) && (x < to || value.closedTo))
    return build(2, 'interval-count', say(`Zenbat zenbaki oso daude ${math(intervalLatex(value))} tartean?`, `¿Cuántos números enteros hay en el intervalo ${math(intervalLatex(value))}?`, `كم عددًا صحيحًا في الفترة ${math(intervalLatex(value))}؟`), options, fraction(count), same(`${members.join(',\\ ')}\\ \\to\\ ${count}`), { kind: 'interval-count', value, count }, { from: from - 1, to: to + 1, intervals: [{ value }] })
}

function sqrtBetweenQuestion(random: Random): RealsRaceQuestion | null {
    const n = randomInt(random, 5, 99)
    if (isPerfectSquare(n)) return null
    const low = Math.floor(Math.sqrt(n))
    const pair = (a: number) => `(${a},\\,${a + 1})`
    const half = Math.floor(n / 2)
    const options = pickOptions(random, { latex: pair(low), error: null }, shuffle(random, [{ latex: pair(half), error: 'root-guess' as const }, { latex: pair(low - 1), error: 'calculation' as const }, { latex: pair(low + 1), error: 'calculation' as const }, { latex: pair(low + 2), error: 'calculation' as const }]).filter((item) => !item.latex.startsWith('(0') && !item.latex.startsWith('(-')))
    if (!options) return null
    return build(2, 'sqrt-between', say(`Zein bi zenbaki osoren artean dago ${math(`\\sqrt{${n}}`)}?`, `¿Entre qué dos números enteros está ${math(`\\sqrt{${n}}`)}?`, `بين أي عددين صحيحين يقع ${math(`\\sqrt{${n}}`)}؟`), options, null, same(`${low}^{2}=${low * low}<${n}<${(low + 1) * (low + 1)}=${low + 1}^{2}`), { kind: 'sqrt-between', n, low })
}

/* ---------- Circuit 3: approximations and scientific notation ---------- */

const decimalFraction = (text: string): FractionValue => {
    const [whole, decimals = ''] = text.replace('-', '').split('.')
    const value = fraction(Number(whole + decimals), 10 ** decimals.length)
    return text.startsWith('-') ? fraction(-value.numerator, value.denominator) : value
}

function roundQuestion(random: Random, tier: Tier): RealsRaceQuestion | null {
    const places = tier === 0 ? 1 : randomInt(random, 1, 3)
    const extra = randomInt(random, 1, 2)
    const whole = randomInt(random, 0, 60)
    const decimals = Array.from({ length: places + extra }, (_, index) => (index === places ? randomInt(random, 5, 9) : randomInt(random, 0, 9))).join('')
    if (decimals.endsWith('0')) return null
    const text = `${whole}.${decimals}`
    const rounded = roundDecimal(text, places)
    const truncated = truncateDecimal(text, places)
    const unit = 10 ** -places
    const wrongs: Choice[] = [
        { latex: commaLatex(truncated), error: 'truncated' },
        { latex: commaLatex(roundDecimal(text, places + 1)), error: 'wrong-place' },
        ...(places > 1 ? [{ latex: commaLatex(roundDecimal(text, places - 1)), error: 'wrong-place' as const }] : []),
        { latex: commaLatex((Number(rounded) + unit).toFixed(places)), error: 'calculation' },
        { latex: commaLatex(roundDecimal(text, 0)), error: 'wrong-place' }
    ]
    // 2,96 → 3,0 and 3 are the same number: keep only wrong options with another value
    const options = pickOptions(random, { latex: commaLatex(rounded), error: null }, wrongs.filter((item) => Number(item.latex.replace('{,}', '.')) !== Number(rounded)))
    if (!options) return null
    const place = [say('hamarrenetara', 'a las décimas', 'إلى الأعشار'), say('ehunenetara', 'a las centésimas', 'إلى الأجزاء من مئة'), say('milarenetara', 'a las milésimas', 'إلى الأجزاء من ألف')][places - 1]
    const next = decimals[places]
    return build(3, 'round', say(`Biribildu ${math(commaLatex(text))} ${place.eu}.`, `Redondea ${math(commaLatex(text))} ${place.es}.`, `قرّب ${math(commaLatex(text))} ${place.ar}.`), options, decimalFraction(rounded), say(`Hurrengo zifra ${next} da (≥ 5): ${math(`${commaLatex(text)}\\approx ${commaLatex(rounded)}`)}`, `La cifra siguiente es ${next} (≥ 5): ${math(`${commaLatex(text)}\\approx ${commaLatex(rounded)}`)}`, `الرقم التالي ${next} (≥ 5): ${math(`${commaLatex(text)}\\approx ${commaLatex(rounded)}`)}`), { kind: 'round', text, places, rounded })
}

/** Exact difference of two decimals written as text, as text */
function difference(a: string, b: string): string {
    const places = Math.max(a.split('.')[1]?.length ?? 0, b.split('.')[1]?.length ?? 0)
    const scale = 10 ** places
    const value = Math.abs(Math.round(Number(a) * scale) - Math.round(Number(b) * scale))
    return places === 0 ? String(value) : (value / scale).toFixed(places).replace(/0+$/, '').replace(/\.$/, '')
}

function absErrorQuestion(random: Random): RealsRaceQuestion | null {
    const places = randomInt(random, 2, 3)
    const whole = randomInt(random, 1, 30)
    const decimals = Array.from({ length: places }, () => randomInt(random, 0, 9)).join('')
    if (decimals.endsWith('0')) return null
    const real = `${whole}.${decimals}`
    const approximation = random() < 0.5 ? roundDecimal(real, places - 1) : truncateDecimal(real, places - 1)
    const error = difference(real, approximation)
    if (Number(error) === 0) return null
    const shift = (text: string, by: number) => (Number(text) * 10 ** by).toFixed(Math.max(0, places - by)).replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '')
    // The error of the other approximation (truncating instead of rounding, or the reverse) is a near miss
    const other = difference(real, approximation === roundDecimal(real, places - 1) ? truncateDecimal(real, places - 1) : roundDecimal(real, places - 1))
    const options = pickOptions(random, { latex: commaLatex(error), error: null }, shuffle(random, [
        { latex: commaLatex(shift(error, 1)), error: 'wrong-place' as const },
        { latex: commaLatex(shift(error, -1)), error: 'wrong-place' as const },
        ...(Number(other) > 0 ? [{ latex: commaLatex(other), error: 'calculation' as const }] : []),
        { latex: commaLatex(approximation), error: 'error-meaning' as const }
    ]))
    if (!options) return null
    return build(3, 'abs-error', say(`${math(commaLatex(real))} zenbakiaren ordez ${math(commaLatex(approximation))} hartzen da. Zein da errore absolutua?`, `Se toma ${math(commaLatex(approximation))} en lugar de ${math(commaLatex(real))}. ¿Cuál es el error absoluto?`, `نأخذ ${math(commaLatex(approximation))} بدل ${math(commaLatex(real))}. ما الخطأ المطلق؟`), options, decimalFraction(error), same(`|${commaLatex(real)}-${commaLatex(approximation)}|=${commaLatex(error)}`), { kind: 'abs-error', real, approximation, error })
}

function scientificQuestion(random: Random, tier: Tier): RealsRaceQuestion | null {
    const significant = String(randomInt(random, 11, 999)).replace(/0+$/, '')
    const exponent = tier === 0 ? randomInt(random, 3, 9) * (random() < 0.5 ? 1 : -1) : randomInt(random, 4, 14) * (random() < 0.5 ? 1 : -1)
    const mantissa = significant.length > 1 ? `${significant[0]}.${significant.slice(1)}` : significant
    const text = fromSci(mantissa, exponent)
    const scientific = toScientific(text)
    if (scientific.mantissa !== mantissa || scientific.exponent !== exponent) return null
    const written = groupedNumber(text)
    // Half the time the exponent is asked as a number (it can be written at the pit stop)
    if (random() < 0.5) {
        const options = pickOptions(random, numberChoice(exponent, 'calculation'), [numberChoice(-exponent, 'exponent-sign'), numberChoice(exponent + 1, 'exponent-count'), numberChoice(exponent - 1, 'exponent-count'), numberChoice(exponent < 0 ? exponent + significant.length : exponent - significant.length + 1, 'mantissa')])
        if (!options) return null
        return build(3, 'sci-exponent', say(`${math(`${written}=${commaLatex(mantissa)}\\cdot 10^{\\,?}`)} Zein da berretzailea?`, `${math(`${written}=${commaLatex(mantissa)}\\cdot 10^{\\,?}`)} ¿Cuál es el exponente?`, `${math(`${written}=${commaLatex(mantissa)}\\cdot 10^{\\,?}`)} ما الأس؟`), options, fraction(exponent), same(`${written}=${scientificLatex(scientific)}`), { kind: 'scientific', text, mantissa, exponent })
    }
    const wrongs: Choice[] = [
        { latex: scientificLatex({ mantissa, exponent: -exponent }), error: 'exponent-sign' },
        { latex: scientificLatex({ mantissa, exponent: exponent + 1 }), error: 'exponent-count' },
        { latex: scientificLatex({ mantissa, exponent: exponent - 1 }), error: 'exponent-count' },
        ...(significant.length > 1 ? [{ latex: `${significant}\\cdot 10^{${exponent - significant.length + 1}}`, error: 'mantissa' as const }] : [])
    ]
    const options = pickOptions(random, { latex: scientificLatex(scientific), error: null }, shuffle(random, wrongs))
    if (!options) return null
    return build(3, 'scientific', say(`Idatzi ${math(written)} idazkera zientifikoan.`, `Escribe ${math(written)} en notación científica.`, `اكتب ${math(written)} بالترميز العلمي.`), options, null, same(`${written}=${scientificLatex(scientific)}`), { kind: 'scientific', text, mantissa, exponent })
}

function fromSci(mantissa: string, exponent: number): string {
    const digits = mantissa.replace('.', '')
    const point = 1 + exponent
    if (point <= 0) return `0.${'0'.repeat(-point)}${digits}`
    if (point >= digits.length) return digits + '0'.repeat(point - digits.length)
    return `${digits.slice(0, point)}.${digits.slice(point)}`
}

const groupedNumber = (text: string) => {
    const [whole, decimals] = text.split('.')
    const groupedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,')
    return decimals ? `${groupedWhole}{,}${decimals.replace(/(\d{3})(?=\d)/g, '$1\\,')}` : groupedWhole
}

function sciProductQuestion(random: Random, tier: Tier): RealsRaceQuestion | null {
    const a = pick(random, ['1.5', '2', '2.5', '3', '4', '1.2', '6', '8'])
    const b = pick(random, ['2', '3', '4', '1.5', '5', '2.5'])
    const m = randomInt(random, -9, 12) || 4
    const n = randomInt(random, -9, 12) || -3
    const productText = String(Math.round(Number(a) * Number(b) * 100) / 100)
    const product = Number(productText)
    if (tier === 0 && product >= 10) return null
    const normalized = product >= 10 ? { mantissa: String(Math.round(product * 10) / 100), exponent: m + n + 1 } : { mantissa: productText, exponent: m + n }
    if (Number(normalized.mantissa) < 1) return null
    const wrongs: Choice[] = [
        { latex: scientificLatex({ mantissa: normalized.mantissa, exponent: m * n }), error: 'exponents-multiplied' },
        ...(product >= 10 ? [{ latex: `${commaLatex(productText)}\\cdot 10^{${m + n}}`, error: 'mantissa' as const }] : []),
        { latex: scientificLatex({ mantissa: normalized.mantissa, exponent: normalized.exponent + 1 }), error: 'exponent-count' },
        { latex: scientificLatex({ mantissa: normalized.mantissa, exponent: normalized.exponent - 1 }), error: 'exponent-count' },
        { latex: scientificLatex({ mantissa: normalized.mantissa, exponent: m - n }), error: 'exponent-sign' }
    ]
    const options = pickOptions(random, { latex: scientificLatex(normalized), error: null }, wrongs)
    if (!options) return null
    const statement = `\\left(${scientificLatex({ mantissa: a, exponent: m })}\\right)\\cdot\\left(${scientificLatex({ mantissa: b, exponent: n })}\\right)`
    const worked = product >= 10
        ? `${commaLatex(a)}\\cdot ${commaLatex(b)}=${commaLatex(productText)},\\ ${commaLatex(productText)}\\cdot 10^{${m + n}}=${scientificLatex(normalized)}`
        : `${commaLatex(a)}\\cdot ${commaLatex(b)}=${commaLatex(productText)},\\ ${bracket(String(m))}+${bracket(String(n))}=${m + n}\\ \\to\\ ${scientificLatex(normalized)}`
    return build(3, 'sci-product', same(`${statement}=\\ ?`), options, null, same(worked), { kind: 'sci-product', a, m, b, n, mantissa: normalized.mantissa, exponent: normalized.exponent })
}

/* ---------- Circuit 4: roots and radicals ---------- */

function rootQuestion(random: Random, tier: Tier): RealsRaceQuestion | null {
    const index = tier === 0 ? pick(random, [2, 3]) : pick(random, [2, 3, 3, 4, 5])
    const base = randomInt(random, 2, index === 2 ? 15 : index === 3 ? 6 : 3)
    const negative = index % 2 === 1 && random() < 0.5
    const value = negative ? -base : base
    const radicand = value ** index
    if (integerRoot(radicand, index) !== value) return null
    const options = pickOptions(random, numberChoice(value, 'calculation'), [numberChoice(radicand / index, 'root-guess'), numberChoice(-value, 'calculation'), ...near(value)].filter((item) => Number.isInteger(Number(item.latex))))
    if (!options) return null
    const root = index === 2 ? `\\sqrt{${radicand}}` : `\\sqrt[${index}]{${radicand}}`
    return build(4, 'root', same(`${root}=\\ ?`), options, fraction(value), same(`${bracket(String(value))}^{${index}}=${radicand}\\ \\to\\ ${root}=${value}`), { kind: 'root', radicand, index, value })
}

function simplifyQuestion(random: Random): RealsRaceQuestion | null {
    const inside = pick(random, [2, 3, 5, 6, 7])
    const outside = randomInt(random, 2, inside <= 3 ? 10 : 6)
    const radicand = outside * outside * inside
    if (simplifySqrt(radicand).outside !== outside) return null
    const options = pickOptions(random, numberChoice(outside, 'calculation'), shuffle(random, [numberChoice(outside * outside, 'radical-pairs'), numberChoice(radicand / inside / 2, 'root-guess'), ...near(outside)]).filter((item) => Number(item.latex) > 0 && Number.isInteger(Number(item.latex))))
    if (!options) return null
    return build(4, 'simplify', say(`${math(`\\sqrt{${radicand}}=a\\sqrt{${inside}}`)}. Zenbat da $a$?`, `${math(`\\sqrt{${radicand}}=a\\sqrt{${inside}}`)}. ¿Cuánto vale $a$?`, `${math(`\\sqrt{${radicand}}=a\\sqrt{${inside}}`)}. كم تساوي $a$؟`), options, fraction(outside), same(`\\sqrt{${radicand}}=\\sqrt{${outside * outside}\\cdot ${inside}}=${radicalLatex(outside, inside)}`), { kind: 'simplify', radicand, outside, inside })
}

function likeRadicalsQuestion(random: Random, tier: Tier): RealsRaceQuestion | null {
    const inside = pick(random, [2, 3, 5])
    const count = tier === 2 ? 3 : 2
    const terms = Array.from({ length: count }, (_, index) => ({ coefficient: randomInt(random, 1, 6) * (index > 0 && random() < 0.3 ? -1 : 1), radicand: inside * (index === 0 ? 1 : pick(random, [1, 4, 9])) }))
    if (terms.every((term) => term.radicand === inside)) terms[count - 1].radicand = inside * 4
    const total = terms.reduce((sum, term) => sum + term.coefficient * Math.sqrt(term.radicand / inside), 0)
    const naive = terms.reduce((sum, term) => sum + term.coefficient, 0)
    const squares = terms.reduce((sum, term) => sum + term.coefficient * (term.radicand / inside), 0)
    if (total === 0) return null
    const options = pickOptions(random, numberChoice(total, 'calculation'), [numberChoice(naive, 'unlike-radicals'), numberChoice(squares, 'radical-pairs'), ...near(total)])
    if (!options) return null
    const term = (item: { coefficient: number; radicand: number }, first: boolean) => `${item.coefficient < 0 ? '-' : first ? '' : '+'}${Math.abs(item.coefficient) === 1 ? '' : Math.abs(item.coefficient)}\\sqrt{${item.radicand}}`
    const statement = terms.map((item, index) => term(item, index === 0)).join('')
    const simplified = terms.map((item, index) => term({ coefficient: item.coefficient * Math.sqrt(item.radicand / inside), radicand: inside }, index === 0)).join('')
    return build(4, 'like-radicals', say(`${math(`${statement}=a\\sqrt{${inside}}`)}. Zenbat da $a$?`, `${math(`${statement}=a\\sqrt{${inside}}`)}. ¿Cuánto vale $a$?`, `${math(`${statement}=a\\sqrt{${inside}}`)}. كم تساوي $a$؟`), options, fraction(total), same(`${statement}=${simplified}=${radicalLatex(total, inside)}`), { kind: 'like-radicals', terms, inside, total })
}

function radicalProductQuestion(random: Random): RealsRaceQuestion | null {
    const value = randomInt(random, 2, 12)
    const a = pick(random, [2, 3, 5, 6, 7])
    if ((value * value) % a !== 0) return null
    const b = (value * value) / a
    if (b === a || isPerfectSquare(b)) return null
    const options = pickOptions(random, numberChoice(value, 'calculation'), [numberChoice(value * value, 'forgot-root'), numberChoice(a + b, 'added'), ...near(value)])
    if (!options) return null
    return build(4, 'radical-product', same(`\\sqrt{${a}}\\cdot\\sqrt{${b}}=\\ ?`), options, fraction(value), same(`\\sqrt{${a}\\cdot ${b}}=\\sqrt{${value * value}}=${value}`), { kind: 'radical-product', a, b, value })
}

/* ---------- Public API ---------- */

type Generator = (random: Random, tier: Tier) => RealsRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [
        (random, tier) => fractionOpQuestion(random, tier),
        (random, tier) => negativePowerQuestion(random, tier),
        (random, tier) => powerProductQuestion(random, tier),
        (random, tier) => (tier === 0 ? fractionOpQuestion(random, 0) : negativePowerQuestion(random, tier))
    ],
    [
        (random) => kindPickQuestion(random),
        (random) => expansionQuestion(random),
        (random, tier) => generatrixQuestion(random, tier),
        (random, tier) => generatrixQuestion(random, tier)
    ],
    [
        (random, tier) => irrationalPickQuestion(random, tier),
        (random, tier) => intervalQuestion(random, tier),
        (random) => intervalCountQuestion(random),
        (random) => sqrtBetweenQuestion(random)
    ],
    [
        (random, tier) => roundQuestion(random, tier),
        (random) => absErrorQuestion(random),
        (random, tier) => scientificQuestion(random, tier),
        (random, tier) => (tier === 0 ? scientificQuestion(random, 0) : sciProductQuestion(random, tier))
    ],
    [
        (random, tier) => rootQuestion(random, tier),
        (random) => simplifyQuestion(random),
        (random, tier) => likeRadicalsQuestion(random, tier),
        (random, tier) => (tier === 0 ? rootQuestion(random, 0) : radicalProductQuestion(random))
    ]
]

export function generateRealsRaceQuestion(random: Random, circuit: number, tier: Tier, requireWritable = false): RealsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next && (!requireWritable || next.writable)) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkRealsPitAnswer(question: RaceQuestion<RealsRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function realsParTime(circuit: number): number {
    return parTimeFor([12, 13, 12, 13, 12][circuit] ?? 12)
}

export const realsRaceErrorTips: Record<RealsRaceError, LocalizedText> = {
    added: say('Ez batu zenbakitzaileak eta izendatzaileak: lehenik izendatzaile komuna.', 'No sumes numeradores y denominadores: primero, denominador común.', 'لا تجمع البسوط والمقامات: أولًا المقام المشترك.'),
    'no-flip': say('Zatitzeko, biderkatu bigarrenaren alderantzizkoaz (gurutzean).', 'Para dividir, multiplica por el inverso del segundo (en cruz).', 'للقسمة اضرب في مقلوب الثاني (تبادليًا).'),
    'negative-power': say('Berretzaile negatiboak ez du zenbakia negatibo bihurtzen: alderantzizkoa ematen du.', 'Un exponente negativo no hace negativo el número: da el inverso.', 'الأس السالب لا يجعل العدد سالبًا: بل يعطي المقلوب.'),
    'no-inverse': say('Berretzaile negatiboa: lehenik oinarriaren alderantzizkoa, gero berretu.', 'Exponente negativo: primero el inverso de la base, después la potencia.', 'الأس السالب: أولًا مقلوب الأساس ثم القوة.'),
    'exponents-multiplied': say('Oinarri bereko berreturak biderkatzean, berretzaileak batu egiten dira (ez biderkatu).', 'Al multiplicar potencias de la misma base, los exponentes se suman (no se multiplican).', 'عند ضرب قوى لها الأساس نفسه تُجمع الأسس (لا تُضرب).'),
    'exponent-sign': say('Zaindu berretzailearen zeinua: zatitzean kendu egiten da, eta zenbaki txikiek berretzaile negatiboa dute.', 'Cuida el signo del exponente: al dividir se resta, y los números pequeños tienen exponente negativo.', 'انتبه لإشارة الأس: عند القسمة يُطرح، والأعداد الصغيرة أسها سالب.'),
    'denominator-factors': say('Begiratu izendatzaile laburtezina: 2 eta 5 bakarrik → zehatza; 2 eta 5 gabe → hutsa; nahastuta → mistoa.', 'Mira el denominador irreducible: solo 2 y 5 → exacto; sin 2 ni 5 → puro; mezclados → mixto.', 'انظر إلى المقام بعد الاختزال: 2 و5 فقط ← منتهٍ؛ بلا 2 ولا 5 ← دوري بحت؛ مختلط ← دوري مختلط.'),
    'period-place': say('Periodoa errepikatzen den zifra-taldea da, eta komaren ondoren berehala hasten den ala ez begiratu.', 'El periodo es el grupo de cifras que se repite; mira si empieza justo después de la coma o no.', 'الدور هو مجموعة الأرقام المتكررة؛ انظر هل تبدأ بعد الفاصلة مباشرة أم لا.'),
    'nines-zeros': say('Izendatzailea: 9 bat periodoko zifra bakoitzeko eta 0 bat aurreperiodoko bakoitzeko. Hamartar zehatzak: 10, 100, 1000…', 'Denominador: un 9 por cada cifra del periodo y un 0 por cada cifra del anteperiodo. Decimales exactos: 10, 100, 1000…', 'المقام: 9 لكل رقم في الدور و0 لكل رقم قبله. والعشري المنتهي: 10 أو 100 أو 1000…'),
    'forgot-subtract': say('Zenbakitzailea: zifra guztiak ken periodoaren aurretik daudenak.', 'Numerador: todas las cifras menos las que hay antes del periodo.', 'البسط: كل الأرقام ناقص الأرقام التي قبل الدور.'),
    'irrational-set': say('Zatiki gisa idatz daitekeena arrazionala da: hamartar periodikoak eta karratu perfektuen erroak ere bai.', 'Lo que se puede escribir como fracción es racional: también los decimales periódicos y las raíces de cuadrados perfectos.', 'ما يمكن كتابته كسرًا نسبي: وكذلك العشري الدوري وجذور المربعات الكاملة.'),
    bracket: say('Kortxetea [ ]: muturra barne (≤). Parentesia ( ): muturra kanpo (<).', 'Corchete [ ]: el extremo está incluido (≤). Paréntesis ( ): no lo está (<).', 'القوس المعقوف [ ]: الطرف داخل (≤). والقوس العادي ( ): الطرف خارج (<).'),
    endpoints: say('Begiratu norabidea: $x>a$ eskuinera doa, $(a,\\,+\\infty)$; $x<a$ ezkerrera, $(-\\infty,\\,a)$.', 'Mira la dirección: $x>a$ va hacia la derecha, $(a,\\,+\\infty)$; $x<a$ hacia la izquierda, $(-\\infty,\\,a)$.', 'انظر إلى الاتجاه: $x>a$ نحو اليمين $(a,\\,+\\infty)$؛ و$x<a$ نحو اليسار $(-\\infty,\\,a)$.'),
    'root-guess': say('Erroa ez da zatiketa: bilatu zein zenbaki berretuta ematen duen errokizuna.', 'La raíz no es una división: busca qué número elevado da el radicando.', 'الجذر ليس قسمة: ابحث عن العدد الذي إذا رُفع أعطى ما تحت الجذر.'),
    truncated: say('Biribiltzean, kentzen den lehen zifra 5 edo handiagoa bada, gehitu 1 azken zifrari.', 'Al redondear, si la primera cifra suprimida es 5 o mayor, suma 1 a la última cifra.', 'عند التقريب إذا كان أول رقم محذوف 5 أو أكثر فأضف 1 إلى آخر رقم.'),
    'wrong-place': say('Begiratu zein ordenaraino biribildu behar den: hamarrenak (1), ehunenak (2), milarenak (3).', 'Mira hasta qué orden hay que redondear: décimas (1), centésimas (2), milésimas (3).', 'انظر إلى أي منزلة نقرّب: الأعشار (1) والأجزاء من مئة (2) والأجزاء من ألف (3).'),
    'error-meaning': say('Errore absolutua bi zenbakien arteko distantzia da: |benetakoa − hurbilketa|.', 'El error absoluto es la distancia entre los dos números: |real − aproximación|.', 'الخطأ المطلق هو المسافة بين العددين: |الحقيقي − التقريب|.'),
    'exponent-count': say('Zenbatu koma zenbat tokitan mugitzen den 1 eta 10 arteko zenbaki bat lortu arte.', 'Cuenta cuántos lugares se mueve la coma hasta dejar un número entre 1 y 10.', 'عُدّ كم منزلة تتحرك الفاصلة حتى يبقى عدد بين 1 و10.'),
    mantissa: say('Idazkera zientifikoan, komaren aurretik zero ez den zifra bakarra: 1 ≤ a < 10.', 'En notación científica, una sola cifra distinta de cero delante de la coma: 1 ≤ a < 10.', 'في الترميز العلمي رقم واحد غير الصفر قبل الفاصلة: 1 ≤ a < 10.'),
    'radical-pairs': say('Bikote bakoitzetik faktore bat ateratzen da: √36 = 6, ez 36.', 'De cada pareja sale un solo factor: √36 = 6, no 36.', 'من كل زوج يخرج عامل واحد: √36 = 6 وليس 36.'),
    'unlike-radicals': say('Lehenik sinplifikatu erradikalak; errokizun bera dutenean bakarrik batzen dira koefizienteak.', 'Primero simplifica los radicales; solo se suman los coeficientes cuando tienen el mismo radicando.', 'بسّط الجذريات أولًا؛ ولا تُجمع المعاملات إلا إذا تساوى ما تحت الجذر.'),
    'forgot-root': say('√a · √b = √(a · b): biderkatu eta gero atera erroa.', '√a · √b = √(a · b): multiplica y después saca la raíz.', '√a · √b = √(a · b): اضرب ثم خذ الجذر.'),
    calculation: say('Berrikusi kalkulua urratsez urrats.', 'Revisa el cálculo paso a paso.', 'راجع الحساب خطوة بخطوة.')
}
