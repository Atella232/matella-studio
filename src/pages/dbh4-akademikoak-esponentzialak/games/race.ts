import { checkAnswer, fraction, toLatex, toText, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { same, say } from '../../dbh4-akademikoak-trigonometria/text.ts'
import { readExponentialAnswer } from '../answers.ts'

/* ==========================================================================
   Funtzio esponentzial, logaritmiko eta trigonometrikoen lasterketa (4.
   DBH akademikoak): five circuits, one per stage — exponentials (a value
   of aˣ, the asymptote of aˣ⁻ᵖ + q, the base through a point), growth
   (compound growth, a half-life, an exponential equation), logarithms (a
   value, the end of a domain, where a shifted logarithm cuts the X axis),
   sine and cosine (radians to degrees, notable values, how many zeros)
   and transformations (the maximum of A·sen x + d, the period of sen kx,
   the amplitude). Wrong options are typical mistakes: a·x for aˣ, the
   inverse for a negative exponent, p for q, the square for the base, the
   simple increase for the compound one, the time divided instead of
   halved, the value for the exponent, the sign, 360 for 180, sen for cos,
   the ends forgotten, the minimum for the maximum, 2/k turned over. Every
   answer is one number, so every question can be written at the pit
   stop; every question carries `meta`, the numbers of its prompt, so the
   test recomputes the answer.
   ========================================================================== */

export const EXPONENTIAL_AK_RACE_CIRCUITS = 5

export type ExponentialAkRaceError =
    | 'product'
    | 'negative-exponent'
    | 'swap'
    | 'sign'
    | 'square'
    | 'simple'
    | 'divide'
    | 'power'
    | 'point'
    | 'double'
    | 'sin-cos'
    | 'ends'
    | 'min'
    | 'inverted'
    | 'calculation'

export type ExponentialAkRaceQuestion = RaceQuestion<ExponentialAkRaceError> & { meta: Record<string, number> }

const math = (latex: string) => `$${latex}$`
const f = (value: number) => fraction(value)

/* ---------- Options ---------- */

interface Candidate {
    value: FractionValue
    error: ExponentialAkRaceError
}

const key = (value: FractionValue) => toText(value)
const wrong = (value: FractionValue, error: ExponentialAkRaceError): Candidate => ({ value, error })
const nearNumbers = (value: number): Candidate[] => [1, -1, 2, -2, 3].map((step) => wrong(f(value + step), 'calculation'))

/** The right option and three mistakes with different answers */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<ExponentialAkRaceError>[] | null {
    const picked: Candidate[] = []
    for (const candidate of candidates) {
        if (picked.length === 3) break
        if ([right, ...picked.map((item) => item.value)].some((other) => key(other) === key(candidate.value))) continue
        picked.push(candidate)
    }
    if (picked.length < 3) return null
    return shuffle(random, [{ latex: toLatex(right), correct: true, error: null }, ...picked.map((item) => ({ latex: toLatex(item.value), correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<ExponentialAkRaceError>[] | null, answer: FractionValue, solution: string, meta: Record<string, number>): ExponentialAkRaceQuestion | null {
    if (!choices) return null
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution: same(math(solution)), meta }
}

/** aⁿ exactly, for whole n of any sign */
const power = (a: number, n: number) => (n >= 0 ? f(a ** n) : fraction(1, a ** -n))
/** x − p written as x-3, x+2 or x */
const shifted = (p: number) => (p === 0 ? 'x' : p > 0 ? `x-${p}` : `x+${-p}`)
const plus = (q: number) => (q === 0 ? '' : q > 0 ? `+${q}` : `-${-q}`)

/* ---------- Circuit 0: exponentials ---------- */

function expValueQuestion(random: Random, tier: Tier): ExponentialAkRaceQuestion | null {
    const a = pick(random, tier === 0 ? [2, 3] : [2, 3, 5])
    const x = randomInt(random, tier === 0 ? -1 : -3, 3)
    if (x === 0 || x === 1) return null
    const right = power(a, x)
    return build(0, 'exp-value', say(
        `${math(`f(x)=${a}^{x}`)} bada, zenbat da ${math(`f(${x})`)}?`,
        `Si ${math(`f(x)=${a}^{x}`)}, ¿cuánto vale ${math(`f(${x})`)}?`,
        `إذا كان ${math(`f(x)=${a}^{x}`)} فكم تساوي ${math(`f(${x})`)}؟`
    ), options(random, right, [
        wrong(f(a * x), 'product'),
        wrong(x < 0 ? f(-(a ** -x)) : power(a, -x), 'negative-exponent'),
        wrong(power(a, x + 1), 'calculation'),
        wrong(power(a, x - 1), 'calculation'),
        wrong(f(x * x), 'calculation')
    ]), right, `${a}^{${x}}=${toLatex(right)}`, { a, x })
}

function asymptoteQuestion(random: Random, tier: Tier): ExponentialAkRaceQuestion | null {
    const a = pick(random, [2, 3, 5])
    const p = randomInt(random, -(tier + 2), tier + 2)
    const q = randomInt(random, -5, 5)
    if (p === q || q === 0 || 1 + q === p) return null
    return build(0, 'asymptote', say(
        `${math(`y=${a}^{${shifted(p)}}${plus(q)}`)} funtzioaren asintota horizontala ${math('y=k')} da. Zenbat da ${math('k')}?`,
        `La asíntota horizontal de ${math(`y=${a}^{${shifted(p)}}${plus(q)}`)} es ${math('y=k')}. ¿Cuánto vale ${math('k')}?`,
        `المقارب الأفقي لـ ${math(`y=${a}^{${shifted(p)}}${plus(q)}`)} هو ${math('y=k')}. كم قيمة ${math('k')}؟`
    ), options(random, f(q), [
        wrong(f(p), 'swap'),
        wrong(f(-q), 'sign'),
        wrong(f(1 + q), 'point'),
        ...nearNumbers(q)
    ]), f(q), `${a}^{${shifted(p)}}>0\\ \\to\\ y>${q}`, { a, p, q })
}

function baseQuestion(random: Random, tier: Tier): ExponentialAkRaceQuestion | null {
    const a = randomInt(random, 2, tier === 0 ? 5 : 9)
    const x = pick(random, tier === 0 ? [2] : [2, 3])
    const y = a ** x
    return build(0, 'base', say(
        `${math('y=a^{x}')} funtzioa ${math(`(${x},\\,${y})`)} puntutik pasatzen da. Zenbat da ${math('a')}?`,
        `La función ${math('y=a^{x}')} pasa por ${math(`(${x},\\,${y})`)}. ¿Cuánto vale ${math('a')}?`,
        `تمر الدالة ${math('y=a^{x}')} بـ ${math(`(${x},\\,${y})`)}. كم قيمة ${math('a')}؟`
    ), options(random, f(a), [
        wrong(f(y), 'square'),
        wrong(fraction(y, x), 'divide'),
        ...nearNumbers(a).filter((item) => item.value.numerator > 0)
    ]), f(a), `a^{${x}}=${y}\\ \\to\\ a=${a}`, { x, y })
}

/* ---------- Circuit 1: growth and equations ---------- */

function compoundQuestion(random: Random, tier: Tier): ExponentialAkRaceQuestion | null {
    const capital = pick(random, [100, 200, 400, 500, 1000])
    const rate = pick(random, tier === 0 ? [10, 50, 100] : [10, 20, 50, 100])
    const years = tier === 2 ? pick(random, [2, 3]) : 2
    const value = (capital * (100 + rate) ** years) / 100 ** years
    if (!Number.isInteger(value)) return null
    return build(1, 'compound', say(
        `${capital} € % ${rate}ean, interes konposatuan. Zenbat diru izango da ${years} urtean (€)?`,
        `${capital} € al ${rate} % de interés compuesto. ¿Cuánto habrá en ${years} años (€)?`,
        `${capital} € بفائدة مركبة ${rate} %. كم يصبح المبلغ بعد ${years} سنوات (€)؟`
    ), options(random, f(value), [
        wrong(f(capital + (capital * rate * years) / 100), 'simple'),
        wrong(f(capital * (100 + rate) / 100 * years), 'product'),
        wrong(f(value + capital), 'calculation'),
        wrong(f(value - 10), 'calculation'),
        wrong(f(value + 10), 'calculation')
    ]), f(value), `${capital}\\cdot\\left(1+\\frac{${rate}}{100}\\right)^{${years}}=${value}`, { capital, rate, years })
}

function halfLifeQuestion(random: Random, tier: Tier): ExponentialAkRaceQuestion | null {
    const halves = randomInt(random, 2, tier === 0 ? 3 : 4)
    const period = pick(random, [2, 3, 5, 6, 8, 10])
    const right = pick(random, [1, 2, 3, 5, 10])
    const mass = right * 2 ** halves
    const time = period * halves
    if (mass / time === right) return null
    return build(1, 'half-life', say(
        `Substantzia baten erdibizitza ${period} urte da. ${mass} g badira, zenbat gramo geratuko dira ${time} urtean?`,
        `Una sustancia tiene una semivida de ${period} años. Si hay ${mass} g, ¿cuántos gramos quedarán en ${time} años?`,
        `عمر النصف لمادة ${period} سنوات. إذا كان لدينا ${mass} غ فكم غرامًا يبقى بعد ${time} سنة؟`
    ), options(random, f(right), [
        wrong(fraction(mass, time), 'divide'),
        wrong(f(mass / 2), 'calculation'),
        wrong(fraction(mass, 2 * halves), 'product'),
        ...nearNumbers(right).filter((item) => item.value.numerator > 0)
    ]), f(right), `\\frac{${time}}{${period}}=${halves}\\qquad ${mass}\\cdot\\frac{1}{2^{${halves}}}=${right}`, { mass, period, time })
}

function expEquationQuestion(random: Random, tier: Tier): ExponentialAkRaceQuestion | null {
    const a = pick(random, [2, 3, 5])
    const n = randomInt(random, 2, a === 2 ? 6 : 3)
    const b = randomInt(random, -3, 3)
    if (b === 0 && tier > 0) return null
    const right = n - b
    if (right === a ** n || n + b === right) return null
    return build(1, 'exp-equation', say(
        `Ebatzi ${math(`${a}^{${b === 0 ? 'x' : `x${plus(b)}`}}=${a ** n}`)}.`,
        `Resuelve ${math(`${a}^{${b === 0 ? 'x' : `x${plus(b)}`}}=${a ** n}`)}.`,
        `حُلّ ${math(`${a}^{${b === 0 ? 'x' : `x${plus(b)}`}}=${a ** n}`)}.`
    ), options(random, f(right), [
        wrong(f(n + b), 'sign'),
        wrong(f(a ** n), 'power'),
        wrong(f(n), 'calculation'),
        ...nearNumbers(right)
    ]), f(right), `${a ** n}=${a}^{${n}}\\ \\to\\ x=${right}`, { a, n, b })
}

/* ---------- Circuit 2: logarithms ---------- */

function logValueQuestion(random: Random, tier: Tier): ExponentialAkRaceQuestion | null {
    const a = pick(random, tier === 0 ? [2, 10] : [2, 3, 5, 10])
    const n = randomInt(random, tier === 0 ? 0 : -3, a === 2 ? 6 : 3)
    const argument = power(a, n)
    const log = a === 10 ? '\\log' : `\\log_{${a}}`
    return build(2, 'log-value', say(
        `Kalkulatu ${math(`${log} ${toLatex(argument)}`)}.`,
        `Calcula ${math(`${log} ${toLatex(argument)}`)}.`,
        `احسب ${math(`${log} ${toLatex(argument)}`)}.`
    ), options(random, f(n), [
        wrong(f(-n || 0), 'sign'),
        wrong(argument, 'power'),
        wrong(f(n + 1), 'calculation'),
        wrong(f(n - 1), 'calculation'),
        wrong(f(n + 2), 'calculation')
    ]), f(n), `${a}^{${n}}=${toLatex(argument)}`, { a, n })
}

function logDomainQuestion(random: Random, tier: Tier): ExponentialAkRaceQuestion | null {
    const c = pick(random, tier === 0 ? [1] : [1, 2, 3])
    const p = randomInt(random, -5, 5)
    if (p === 0) return null
    const inside = `${c === 1 ? '' : c}x${plus(-c * p)}`
    return build(2, 'log-domain', say(
        `Zein da ${math(`y=\\log(${inside})`)} funtzioaren izate-eremuaren ezkerreko muturra?`,
        `¿Cuál es el extremo izquierdo del dominio de ${math(`y=\\log(${inside})`)}?`,
        `ما الطرف الأيسر لمجال ${math(`y=\\log(${inside})`)}؟`
    ), options(random, f(p), [
        wrong(f(-p), 'sign'),
        wrong(f(p + 1), 'point'),
        wrong(f(-c * p), 'swap'),
        ...nearNumbers(p)
    ]), f(p), `${inside}>0\\ \\to\\ x>${p}`, { c, p })
}

function logZeroQuestion(random: Random, tier: Tier): ExponentialAkRaceQuestion | null {
    const a = pick(random, [2, 3])
    const p = randomInt(random, -4, 4)
    const q = -randomInt(random, 0, tier === 0 ? 1 : 2)
    const right = p + a ** -q
    if (right === p + 1 && q !== 0) return null
    const log = `\\log_{${a}}`
    return build(2, 'log-zero', say(
        `Zein abszisatan ebakitzen du ${math(`y=${log}${p === 0 ? '\\,x' : `(${shifted(p)})`}${plus(q)}`)} funtzioak X ardatza?`,
        `¿En qué abscisa corta ${math(`y=${log}${p === 0 ? '\\,x' : `(${shifted(p)})`}${plus(q)}`)} al eje X?`,
        `عند أي إحداثي سيني تقطع ${math(`y=${log}${p === 0 ? '\\,x' : `(${shifted(p)})`}${plus(q)}`)} محور X؟`
    ), options(random, f(right), [
        wrong(f(p), 'point'),
        wrong(f(p - a ** -q), 'sign'),
        wrong(f(p + 1), 'power'),
        ...nearNumbers(right)
    ]), f(right), `${shifted(p)}=${a}^{${-q}}\\ \\to\\ x=${right}`, { a, p, q })
}

/* ---------- Circuit 3: sine and cosine ---------- */

function degreesQuestion(random: Random, tier: Tier): ExponentialAkRaceQuestion | null {
    const m = pick(random, tier === 0 ? [2, 3, 4, 6] : [2, 3, 4, 5, 6, 9, 12])
    const k = randomInt(random, 1, 2 * m - 1)
    if (k % m === 0) return null
    const right = (180 * k) / m
    if (!Number.isInteger(right)) return null
    const angle = `${k === 1 ? '' : k}\\pi`
    return build(3, 'degrees', say(
        `Zenbat gradu dira ${math(`\\frac{${angle}}{${m}}`)} rad?`,
        `¿Cuántos grados son ${math(`\\frac{${angle}}{${m}}`)} rad?`,
        `كم درجة تساوي ${math(`\\frac{${angle}}{${m}}`)} rad؟`
    ), options(random, f(right), [
        wrong(f(2 * right), 'double'),
        wrong(fraction(right, 2), 'calculation'),
        wrong(f(right + 30), 'calculation'),
        wrong(f(right - 30), 'calculation'),
        wrong(f(right + 90), 'calculation')
    ]), f(right), `\\frac{${k}\\cdot 180°}{${m}}=${right}°`, { k, m })
}

/** sen(kπ/6) for the k whose sine is rational, with the cosine when that is rational too */
const SINE_SIXTHS: Record<number, [FractionValue, FractionValue | null]> = {
    1: [fraction(1, 2), null],
    3: [f(1), f(0)],
    5: [fraction(1, 2), null],
    6: [f(0), f(-1)],
    7: [fraction(-1, 2), null],
    9: [f(-1), f(0)],
    11: [fraction(-1, 2), null]
}
/** cos(kπ/3), with the sine when it is rational */
const COSINE_THIRDS: Record<number, [FractionValue, FractionValue | null]> = {
    0: [f(1), f(0)],
    1: [fraction(1, 2), null],
    2: [fraction(-1, 2), null],
    3: [f(-1), f(0)],
    4: [fraction(-1, 2), null],
    5: [fraction(1, 2), null]
}

function trigValueQuestion(random: Random, tier: Tier): ExponentialAkRaceQuestion | null {
    const useSine = random() < 0.5
    const k = useSine ? pick(random, tier === 0 ? [3, 6, 9] : [1, 3, 5, 6, 7, 9, 11]) : pick(random, tier === 0 ? [0, 3] : [0, 1, 2, 3, 4, 5])
    const [right, other] = useSine ? SINE_SIXTHS[k] : COSINE_THIRDS[k]
    const angle = useSine
        ? (k === 6 ? '\\pi' : k === 3 ? '\\frac{\\pi}{2}' : k === 9 ? '\\frac{3\\pi}{2}' : `\\frac{${k === 1 ? '' : k}\\pi}{6}`)
        : (k === 0 ? '0' : k === 3 ? '\\pi' : `\\frac{${k === 1 ? '' : k}\\pi}{3}`)
    const name = useSine ? '\\sen' : '\\cos'
    const negative = fraction(-right.numerator || 0, right.denominator)
    return build(3, 'trig-value', say(
        `Kalkulatu ${math(`${name} ${angle}`)}.`,
        `Calcula ${math(`${name} ${angle}`)}.`,
        `احسب ${math(`${name} ${angle}`)}.`
    ), options(random, right, [
        wrong(negative, 'sign'),
        ...(other ? [wrong(other, 'sin-cos')] : []),
        ...[f(0), f(1), f(-1), fraction(1, 2), fraction(-1, 2)].map((value) => wrong(value, 'calculation' as const))
    ]), right, `${name} ${angle}=${toLatex(right)}`, useSine ? { sine: 1, sixths: k } : { sine: 0, thirds: k })
}

function zerosQuestion(random: Random, tier: Tier): ExponentialAkRaceQuestion | null {
    const n = randomInt(random, 2, tier === 0 ? 4 : 8)
    return build(3, 'zeros', say(
        `Zenbat zero ditu ${math('y=\\sen x')} funtzioak ${math(`[0,\\,${n}\\pi]`)} tartean?`,
        `¿Cuántos ceros tiene ${math('y=\\sen x')} en ${math(`[0,\\,${n}\\pi]`)}?`,
        `كم صفرًا للدالة ${math('y=\\sen x')} في ${math(`[0,\\,${n}\\pi]`)}؟`
    ), options(random, f(n + 1), [
        wrong(f(n), 'ends'),
        wrong(f(n - 1), 'ends'),
        wrong(f(2 * n), 'double'),
        ...nearNumbers(n + 1)
    ]), f(n + 1), `x=0,\\ \\pi,\\ \\ldots,\\ ${n}\\pi`, { n })
}

/* ---------- Circuit 4: amplitude and period ---------- */

function maxQuestion(random: Random, tier: Tier): ExponentialAkRaceQuestion | null {
    const a = (random() < 0.5 ? -1 : 1) * randomInt(random, 2, tier === 0 ? 3 : 6)
    const d = randomInt(random, -4, 4)
    const useSine = random() < 0.5
    const right = Math.abs(a) + d
    if (d === 0 && tier > 0) return null
    const name = useSine ? '\\sen' : '\\cos'
    return build(4, 'max', say(
        `Zein da ${math(`y=${a}${name} x${plus(d)}`)} funtzioaren balio maximoa?`,
        `¿Cuál es el valor máximo de ${math(`y=${a}${name} x${plus(d)}`)}?`,
        `ما القيمة العظمى لـ ${math(`y=${a}${name} x${plus(d)}`)}؟`
    ), options(random, f(right), [
        wrong(f(d - Math.abs(a)), 'min'),
        wrong(f(a + d), 'sign'),
        wrong(f(Math.abs(a)), 'calculation'),
        ...nearNumbers(right)
    ]), f(right), `${Math.abs(a)}${plus(d)}=${right}`, { a, d })
}

function periodQuestion(random: Random, tier: Tier): ExponentialAkRaceQuestion | null {
    const k = pick(random, tier === 0 ? [1, 2, 4] : [1, 2, 3, 4, 5, 6, 8])
    const half = tier === 2 && random() < 0.3
    const factor = half ? fraction(1, k) : f(k)
    const right = half ? f(2 * k) : fraction(2, k)
    const kx = half ? `\\frac{x}{${k}}` : `${k === 1 ? '' : k}x`
    const name = random() < 0.5 ? '\\sen' : '\\cos'
    return build(4, 'period', say(
        `${math(`y=${name} ${kx}`)} funtzioaren periodoa ${math('a\\pi')} da. Zenbat da ${math('a')}?`,
        `El periodo de ${math(`y=${name} ${kx}`)} es ${math('a\\pi')}. ¿Cuánto vale ${math('a')}?`,
        `دور ${math(`y=${name} ${kx}`)} هو ${math('a\\pi')}. كم قيمة ${math('a')}؟`
    ), options(random, right, [
        wrong(fraction(factor.numerator, 2 * factor.denominator), 'inverted'),
        wrong(f(2), 'calculation'),
        wrong(fraction(2 * factor.numerator, factor.denominator), 'product'),
        wrong(f(1), 'calculation'),
        wrong(f(4), 'calculation')
    ]), right, `T=\\frac{2\\pi}{${toLatex(factor)}}=${toLatex(right)}\\pi`, { kNumerator: factor.numerator, kDenominator: factor.denominator })
}

function amplitudeQuestion(random: Random, tier: Tier): ExponentialAkRaceQuestion | null {
    const a = -randomInt(random, 2, tier === 0 ? 4 : 7)
    const d = randomInt(random, 1, 5)
    const k = pick(random, [1, 2, 3])
    if (d === -a) return null
    const name = random() < 0.5 ? '\\sen' : '\\cos'
    return build(4, 'amplitude', say(
        `Zein da ${math(`y=${a}${name} ${k === 1 ? '' : k}x${plus(d)}`)} funtzioaren anplitudea?`,
        `¿Cuál es la amplitud de ${math(`y=${a}${name} ${k === 1 ? '' : k}x${plus(d)}`)}?`,
        `ما سعة ${math(`y=${a}${name} ${k === 1 ? '' : k}x${plus(d)}`)}؟`
    ), options(random, f(-a), [
        wrong(f(a), 'sign'),
        wrong(f(d), 'swap'),
        wrong(f(d - a), 'min'),
        ...nearNumbers(-a).filter((item) => item.value.numerator > 0)
    ]), f(-a), `|${a}|=${-a}`, { a, d })
}

/* ---------- Circuits ---------- */

type Generator = (random: Random, tier: Tier) => ExponentialAkRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [expValueQuestion, asymptoteQuestion, baseQuestion],
    [compoundQuestion, halfLifeQuestion, expEquationQuestion],
    [logValueQuestion, logDomainQuestion, logZeroQuestion],
    [degreesQuestion, trigValueQuestion, zerosQuestion],
    [maxQuestion, periodQuestion, amplitudeQuestion]
]

export function generateExponentialAkRaceQuestion(random: Random, circuit: number, tier: Tier, requireWritable = false): ExponentialAkRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 800; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next && (!requireWritable || next.writable)) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkExponentialAkPitAnswer(question: RaceQuestion<ExponentialAkRaceError>, input: string): AnswerCheck {
    return checkAnswer(readExponentialAnswer(input), question.answer as FractionValue, question.answerForm)
}

export function exponentialAkParTime(circuit: number): number {
    return parTimeFor([13, 15, 14, 14, 14][circuit] ?? 14)
}

export const exponentialAkRaceErrorTips: Record<ExponentialAkRaceError, LocalizedText> = {
    product: say('$a^{x}$ ez da $a\\cdot x$: oinarria $x$ aldiz biderkatzen da.', '$a^{x}$ no es $a\\cdot x$: la base se multiplica $x$ veces.', '$a^{x}$ ليست $a\\cdot x$: يُضرب الأساس في نفسه $x$ مرة.'),
    'negative-exponent': say('Berretzaile negatiboa: alderantzizkoa, ez negatiboa. $2^{-3}=\\frac{1}{8}$.', 'Exponente negativo: el inverso, no un negativo. $2^{-3}=\\frac{1}{8}$.', 'الأس السالب: المقلوب لا العدد السالب. $2^{-3}=\\frac{1}{8}$.'),
    swap: say('Bi parametroak nahastu dituzu: begiratu bakoitza non dagoen.', 'Has confundido los dos parámetros: mira dónde está cada uno.', 'خلطت بين الوسيطين: انظر أين يقع كل منهما.'),
    sign: say('Begiratu zeinuari.', 'Mira el signo.', 'انتبه للإشارة.'),
    square: say('Hori puntuaren $y$ da; $a$ haren erroa da.', 'Esa es la $y$ del punto; $a$ es su raíz.', 'هذا $y$ النقطة؛ و$a$ جذره.'),
    simple: say('Hori interes soila da; konposatuan urtero biderkatzen da.', 'Eso es interés simple; en el compuesto se multiplica cada año.', 'هذه فائدة بسيطة؛ في المركبة يُضرب كل سنة.'),
    divide: say('Ez zatitu: berretu. Erdibizitza bakoitzean erdia geratzen da.', 'No dividas: eleva. En cada periodo se repite la operación.', 'لا تقسم: ارفع إلى قوة. تتكرر العملية في كل دور.'),
    power: say('Logaritmoa berretzailea da, ez balioa.', 'El logaritmo es el exponente, no el valor.', 'اللوغاريتم هو الأس لا القيمة.'),
    point: say('Hori puntu ezagun bat da, ez eskatzen dena.', 'Ese es un punto conocido, no lo que se pide.', 'هذه نقطة معروفة وليست المطلوب.'),
    double: say('Kontatu berriro: $\\pi$ rad $=180°$, ez $360°$.', 'Cuenta otra vez: $\\pi$ rad $=180°$, no $360°$.', 'أعد العد: $\\pi$ rad $=180°$ لا $360°$.'),
    'sin-cos': say('Hori beste arrazoia da: sinua ordenatua da, kosinua abzisa.', 'Esa es la otra razón: el seno es la ordenada; el coseno, la abscisa.', 'هذه النسبة الأخرى: الجيب هو الصادي، وجيب التمام السيني.'),
    ends: say('Muturrak ere zeroak dira: $0$ eta $n\\pi$.', 'Los extremos también son ceros: $0$ y $n\\pi$.', 'الطرفان صفران أيضًا: $0$ و$n\\pi$.'),
    min: say('Hori minimoa da; maximoa $d+|A|$.', 'Ese es el mínimo; el máximo es $d+|A|$.', 'هذه الصغرى؛ والعظمى $d+|A|$.'),
    inverted: say('Periodoa $\\frac{2\\pi}{k}$ da, ez $\\frac{k}{2}\\pi$.', 'El periodo es $\\frac{2\\pi}{k}$, no $\\frac{k}{2}\\pi$.', 'الدور $\\frac{2\\pi}{k}$ لا $\\frac{k}{2}\\pi$.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.')
}
