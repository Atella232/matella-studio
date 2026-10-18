import { checkAnswer, fraction, toLatex, toText, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { readFunctionsAnswer } from '../answers.ts'
import { same, say } from '../text.ts'

/* ==========================================================================
   Funtzioen lasterketa (4. DBH akademikoak): five circuits, one per stage —
   functions (an image, an antiimage, the lowest value of the range),
   domains (of a fraction, of a linear or a quadratic root, of a root in
   the denominator), continuity (a value of a function given piecewise,
   the k that joins two pieces, the jump, the missing point of a hole),
   features (the intercept with the Y axis, the largest root of a cubic or
   a biquadratic, f(−a) of an even or odd function, where a parabola is
   negative) and change (the T.V.M., the extreme of a parabola, the
   reduced x of a periodic function, an average speed). Wrong options are
   typical mistakes: (−3)² taken as −9, the image for the antiimage, the
   vertex x for its y, the roots with the wrong sign, ≥ for >, the
   inequality not turned round, the inside of the roots for the outside,
   the other piece, the jump the wrong way round, r² for r, the other
   parity, the difference not divided, the quotient for the remainder.
   Answers that are one number can be written at the pit stop; domains
   and intervals are only chosen. Every question carries `meta`, the
   numbers of its prompt, so the test recomputes the answer.
   ========================================================================== */

export const FUNCTIONS_AK_RACE_CIRCUITS = 5

export type FunctionsAkRaceError =
    | 'square-sign'
    | 'image-for-preimage'
    | 'sign'
    | 'vertex-x'
    | 'constant'
    | 'root-sign'
    | 'whole-line'
    | 'inequality-direction'
    | 'bracket'
    | 'inside-outside'
    | 'strict'
    | 'fraction-only'
    | 'wrong-piece'
    | 'left-value'
    | 'jump-order'
    | 'hole-x'
    | 'square'
    | 'sum-roots'
    | 'parity'
    | 'no-divide'
    | 'quotient'
    | 'from-zero'
    | 'calculation'

export type FunctionsAkRaceQuestion = RaceQuestion<FunctionsAkRaceError> & { meta: Record<string, number> }

const math = (latex: string) => `$${latex}$`
const f = (value: number) => fraction(value)

/* ---------- Writing polynomials and intervals ---------- */

/** One term of a sum: +3x, -x^{2}, -5 */
function termLatex(coefficient: number, power: string, first: boolean): string {
    if (coefficient === 0) return ''
    const size = Math.abs(coefficient) === 1 && power ? '' : String(Math.abs(coefficient))
    return `${coefficient < 0 ? '-' : first ? '' : '+'}${size}${power}`
}

/** A polynomial from its coefficients, highest degree first: [1, -2, -3] → x^{2}-2x-3 */
export function polynomialLatex(coefficients: readonly number[]): string {
    const degree = coefficients.length - 1
    let text = ''
    coefficients.forEach((coefficient, index) => {
        const power = degree - index
        text += termLatex(coefficient, power === 0 ? '' : power === 1 ? 'x' : `x^{${power}}`, text === '')
    })
    return text || '0'
}

/** (x − r) written as LaTeX: x-3, x+2, x */
const factorLatex = (root: number) => (root === 0 ? 'x' : `(x${root > 0 ? '-' : '+'}${Math.abs(root)})`)

type Bound = number | '-inf' | 'inf'
/** An interval: [2,\,+\infty), (-\infty,\,-3] */
export function intervalLatex(from: Bound, to: Bound, closedFrom = false, closedTo = false): string {
    const left = from === '-inf' ? '(-\\infty' : `${closedFrom ? '[' : '('}${from}`
    const right = to === 'inf' ? '+\\infty)' : `${to}${closedTo ? ']' : ')'}`
    return `${left},\\,${right}`
}
/** ℝ without some points: \mathbb{R}-\{-4,\,2\} */
export const withoutLatex = (points: number[]) => `\\mathbb{R}-\\{${[...points].sort((a, b) => a - b).join(',\\,')}\\}`

/* ---------- Options ---------- */

interface Choice {
    latex: string
    /** What makes two options the same answer */
    key: string
}

interface Candidate extends Choice {
    error: FunctionsAkRaceError
}

const ofNumber = (value: FractionValue): Choice => ({ latex: toLatex(value), key: `n${toText(value)}` })
const ofLatex = (latex: string): Choice => ({ latex, key: latex })
const wrong = (choice: Choice, error: FunctionsAkRaceError): Candidate => ({ ...choice, error })
const nearNumbers = (value: number): Candidate[] => [1, -1, 2, -2, 3].map((step) => wrong(ofNumber(f(value + step)), 'calculation'))

/** The right option and three mistakes with different answers */
function options(random: Random, right: Choice, candidates: Candidate[]): RaceOption<FunctionsAkRaceError>[] | null {
    const picked: Candidate[] = []
    for (const candidate of candidates) {
        if (picked.length === 3) break
        if ([right, ...picked].some((other) => other.key === candidate.key)) continue
        picked.push(candidate)
    }
    if (picked.length < 3) return null
    return shuffle(random, [{ latex: right.latex, correct: true, error: null }, ...picked.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

/** `answer` is the written answer at the pit stop; null when the answer is a set or an interval, only chosen */
function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<FunctionsAkRaceError>[] | null, answer: number | null, solution: string, meta: Record<string, number>): FunctionsAkRaceQuestion | null {
    if (!choices) return null
    return { circuit, kind, prompt, options: choices, answer: f(answer ?? 0), answerForm: 'any', percentAnswer: false, writable: answer !== null, solution: same(math(solution)), meta }
}

const nonZero = (random: Random, size: number) => {
    const value = randomInt(random, 1, size)
    return random() < 0.5 ? -value : value
}
const reach = (tier: Tier) => [3, 4, 5][tier]
/** A number in parentheses when negative, for substitutions */
const paren = (value: number) => (value < 0 ? `(${value})` : String(value))

/* ---------- Circuit 0: functions ---------- */

function imageQuestion(random: Random, tier: Tier): FunctionsAkRaceQuestion | null {
    const a = tier === 0 ? 1 : pick(random, [1, 2, -1])
    const b = randomInt(random, -4, 4)
    const c = randomInt(random, -5, 5)
    const x = -randomInt(random, 1, reach(tier))
    const right = a * x * x + b * x + c
    return build(0, 'image', say(
        `${math(`f(x)=${polynomialLatex([a, b, c])}`)} bada, zenbat da ${math(`f(${x})`)}?`,
        `Si ${math(`f(x)=${polynomialLatex([a, b, c])}`)}, ¿cuánto vale ${math(`f(${x})`)}?`,
        `إذا كان ${math(`f(x)=${polynomialLatex([a, b, c])}`)} فكم تساوي ${math(`f(${x})`)}؟`
    ), options(random, ofNumber(f(right)), [
        wrong(ofNumber(f(-a * x * x + b * x + c)), 'square-sign'),
        wrong(ofNumber(f(a * x * x - b * x + c)), 'sign'),
        ...nearNumbers(right)
    ]), right, `f(${x})=${a === 1 ? '' : a === -1 ? '-' : `${a}\\cdot `}${paren(x)}^{2}${b === 0 ? '' : `${b > 0 ? '+' : '-'}${Math.abs(b)}\\cdot ${paren(x)}`}${c === 0 ? '' : `${c > 0 ? '+' : '-'}${Math.abs(c)}`}=${right}`, { a, b, c, x })
}

function preimageQuestion(random: Random, tier: Tier): FunctionsAkRaceQuestion | null {
    const m = nonZero(random, tier === 0 ? 3 : 5)
    const n = randomInt(random, -6, 6)
    const x = randomInt(random, -reach(tier), reach(tier))
    const value = m * x + n
    return build(0, 'preimage', say(
        `${math(`f(x)=${polynomialLatex([m, n])}`)} bada, zein ${math('x')} baliori dagokio ${math(String(value))} irudia?`,
        `Si ${math(`f(x)=${polynomialLatex([m, n])}`)}, ¿qué ${math('x')} tiene imagen ${math(String(value))}?`,
        `إذا كان ${math(`f(x)=${polynomialLatex([m, n])}`)} فما قيمة ${math('x')} التي صورتها ${math(String(value))}؟`
    ), options(random, ofNumber(f(x)), [
        wrong(ofNumber(f(m * value + n)), 'image-for-preimage'),
        wrong(ofNumber(fraction(value + n, m)), 'sign'),
        ...nearNumbers(x)
    ]), x, `${polynomialLatex([m, n])}=${value}\\ \\to\\ x=${x}`, { m, n, value })
}

function rangeQuestion(random: Random, tier: Tier): FunctionsAkRaceQuestion | null {
    const h = nonZero(random, reach(tier))
    const k = randomInt(random, -6, 6)
    const c = h * h + k
    if (c === k || c === h) return null
    return build(0, 'range-min', say(
        `Zein da ${math(`y=${polynomialLatex([1, -2 * h, c])}`)} funtzioaren ibiltarteko balio txikiena?`,
        `¿Cuál es el menor valor del recorrido de ${math(`y=${polynomialLatex([1, -2 * h, c])}`)}?`,
        `ما أصغر قيمة في مدى ${math(`y=${polynomialLatex([1, -2 * h, c])}`)}؟`
    ), options(random, ofNumber(f(k)), [
        wrong(ofNumber(f(h)), 'vertex-x'),
        wrong(ofNumber(f(c)), 'constant'),
        wrong(ofNumber(f(-k)), 'sign'),
        ...nearNumbers(k)
    ]), k, `x=\\frac{${2 * h}}{2}=${h}\\qquad y=${paren(h)}^{2}${-2 * h >= 0 ? '+' : '-'}${Math.abs(2 * h)}\\cdot ${paren(h)}${c >= 0 ? '+' : '-'}${Math.abs(c)}=${k}`, { h, k })
}

/* ---------- Circuit 1: domains ---------- */

function domainEndQuestion(random: Random, tier: Tier): FunctionsAkRaceQuestion | null {
    const a = tier === 0 ? 1 : randomInt(random, 1, 4)
    const p = nonZero(random, reach(tier) + 1)
    const b = -a * p
    return build(1, 'domain-end', say(
        `Zein da ${math(`y=\\sqrt{${polynomialLatex([a, b])}}`)} funtzioaren izate-eremuko balio txikiena?`,
        `¿Cuál es el menor valor del dominio de ${math(`y=\\sqrt{${polynomialLatex([a, b])}}`)}?`,
        `ما أصغر قيمة في مجال ${math(`y=\\sqrt{${polynomialLatex([a, b])}}`)}؟`
    ), options(random, ofNumber(f(p)), [
        wrong(ofNumber(f(-p)), 'root-sign'),
        wrong(ofNumber(f(b)), 'constant'),
        ...nearNumbers(p)
    ]), p, `${polynomialLatex([a, b])}\\ge 0\\ \\to\\ x\\ge ${p}`, { a, b })
}

function excludedCountQuestion(random: Random, tier: Tier): FunctionsAkRaceQuestion | null {
    const r = randomInt(random, 2, tier === 0 ? 3 : 6)
    const right = 2 * r - 1
    return build(1, 'excluded-count', say(
        `Zenbat zenbaki oso EZ daude ${math(`y=\\sqrt{${polynomialLatex([1, 0, -r * r])}}`)} funtzioaren izate-eremuan?`,
        `¿Cuántos números enteros NO están en el dominio de ${math(`y=\\sqrt{${polynomialLatex([1, 0, -r * r])}}`)}?`,
        `كم عددًا صحيحًا ليس في مجال ${math(`y=\\sqrt{${polynomialLatex([1, 0, -r * r])}}`)}؟`
    ), options(random, ofNumber(f(right)), [
        wrong(ofNumber(f(2 * r + 1)), 'bracket'),
        wrong(ofNumber(f(r * r)), 'square'),
        ...nearNumbers(right)
    ]), right, `${intervalLatex(-r, r)}\\ \\to\\ ${-r + 1},\\ldots,${r - 1}\\ \\to\\ ${right}`, { r })
}

function fractionDomainQuestion(random: Random, tier: Tier): FunctionsAkRaceQuestion | null {
    const p = nonZero(random, reach(tier))
    const q = nonZero(random, reach(tier))
    if (p === q || p === -q) return null
    const denominator = polynomialLatex([1, -(p + q), p * q])
    return build(1, 'fraction-domain', say(
        `Zein da ${math(`y=\\frac{1}{${denominator}}`)} funtzioaren izate-eremua?`,
        `¿Cuál es el dominio de ${math(`y=\\frac{1}{${denominator}}`)}?`,
        `ما مجال ${math(`y=\\frac{1}{${denominator}}`)}؟`
    ), options(random, ofLatex(withoutLatex([p, q])), [
        wrong(ofLatex(withoutLatex([-p, -q])), 'root-sign'),
        wrong(ofLatex('\\mathbb{R}'), 'whole-line'),
        wrong(ofLatex(withoutLatex([p * q])), 'calculation'),
        wrong(ofLatex(withoutLatex([-p, q])), 'root-sign')
    ]), null, `${denominator}=${factorLatex(p)}${factorLatex(q)}=0\\ \\to\\ ${withoutLatex([p, q])}`, { p, q })
}

function linearRootQuestion(random: Random, tier: Tier): FunctionsAkRaceQuestion | null {
    const a = tier === 0 ? pick(random, [1, -1]) : nonZero(random, 3)
    const p = randomInt(random, -5, 5)
    const b = -a * p
    // a x + b ≥ 0 → x ≥ p (a > 0) or x ≤ p (a < 0)
    const right = a > 0 ? intervalLatex(p, 'inf', true) : intervalLatex('-inf', p, false, true)
    const flipped = a > 0 ? intervalLatex('-inf', p, false, true) : intervalLatex(p, 'inf', true)
    const open = a > 0 ? intervalLatex(p, 'inf') : intervalLatex('-inf', p)
    const opposite = a > 0 ? intervalLatex(-p, 'inf', true) : intervalLatex('-inf', -p, false, true)
    return build(1, 'linear-root', say(
        `Zein da ${math(`y=\\sqrt{${polynomialLatex([a, b])}}`)} funtzioaren izate-eremua?`,
        `¿Cuál es el dominio de ${math(`y=\\sqrt{${polynomialLatex([a, b])}}`)}?`,
        `ما مجال ${math(`y=\\sqrt{${polynomialLatex([a, b])}}`)}؟`
    ), options(random, ofLatex(right), [
        wrong(ofLatex(flipped), 'inequality-direction'),
        wrong(ofLatex(open), 'bracket'),
        wrong(ofLatex(opposite), 'sign'),
        wrong(ofLatex(withoutLatex([p])), 'fraction-only')
    ]), null, `${polynomialLatex([a, b])}\\ge 0\\ \\to\\ x${a > 0 ? '\\ge' : '\\le'} ${p}`, { a, p })
}

function quadraticRootQuestion(random: Random, tier: Tier): FunctionsAkRaceQuestion | null {
    const r = randomInt(random, 1, tier === 0 ? 3 : 6)
    const outside = random() < 0.5
    const radicand = outside ? polynomialLatex([1, 0, -r * r]) : polynomialLatex([-1, 0, r * r])
    const out = `${intervalLatex('-inf', -r, false, true)}\\cup${intervalLatex(r, 'inf', true)}`
    const inside = intervalLatex(-r, r, true, true)
    const openOut = `${intervalLatex('-inf', -r)}\\cup${intervalLatex(r, 'inf')}`
    const openInside = intervalLatex(-r, r)
    return build(1, 'quadratic-root', say(
        `Zein da ${math(`y=\\sqrt{${radicand}}`)} funtzioaren izate-eremua?`,
        `¿Cuál es el dominio de ${math(`y=\\sqrt{${radicand}}`)}?`,
        `ما مجال ${math(`y=\\sqrt{${radicand}}`)}؟`
    ), options(random, ofLatex(outside ? out : inside), [
        wrong(ofLatex(outside ? inside : out), 'inside-outside'),
        wrong(ofLatex(outside ? openOut : openInside), 'bracket'),
        wrong(ofLatex(withoutLatex([-r, r])), 'fraction-only')
    ]), null, `${radicand}\\ge 0\\ \\to\\ ${outside ? out : inside}`, { r, outside: outside ? 1 : 0 })
}

function rootDenominatorQuestion(random: Random, tier: Tier): FunctionsAkRaceQuestion | null {
    const p = randomInt(random, -reach(tier), reach(tier))
    const radicand = polynomialLatex([1, -p])
    return build(1, 'root-denominator', say(
        `Zein da ${math(`y=\\frac{1}{\\sqrt{${radicand}}}`)} funtzioaren izate-eremua?`,
        `¿Cuál es el dominio de ${math(`y=\\frac{1}{\\sqrt{${radicand}}}`)}?`,
        `ما مجال ${math(`y=\\frac{1}{\\sqrt{${radicand}}}`)}؟`
    ), options(random, ofLatex(intervalLatex(p, 'inf')), [
        wrong(ofLatex(intervalLatex(p, 'inf', true)), 'strict'),
        wrong(ofLatex(withoutLatex([p])), 'fraction-only'),
        wrong(ofLatex(intervalLatex('-inf', p)), 'inequality-direction')
    ]), null, `${radicand}>0\\ \\to\\ x>${p}`, { p })
}

/* ---------- Circuit 2: continuity and pieces ---------- */

function pieceValueQuestion(random: Random, tier: Tier): FunctionsAkRaceQuestion | null {
    const at = randomInt(random, -2, 2)
    const m1 = nonZero(random, 3)
    const n1 = randomInt(random, -4, 4)
    const m2 = nonZero(random, 3)
    const n2 = randomInt(random, -4, 4)
    const x = at + pick(random, tier === 0 ? [-2, 2] : [-3, -1, 0, 1, 3])
    const left = x < at
    const right = left ? m1 * x + n1 : m2 * x + n2
    const other = left ? m2 * x + n2 : m1 * x + n1
    if (other === right) return null
    return build(2, 'piece-value', say(
        `${math(`f(x)=${polynomialLatex([m1, n1])}`)} ${math(`x<${at}`)} denean, eta ${math(`f(x)=${polynomialLatex([m2, n2])}`)} ${math(`x\\ge ${at}`)} denean. Zenbat da ${math(`f(${x})`)}?`,
        `${math(`f(x)=${polynomialLatex([m1, n1])}`)} si ${math(`x<${at}`)} y ${math(`f(x)=${polynomialLatex([m2, n2])}`)} si ${math(`x\\ge ${at}`)}. ¿Cuánto vale ${math(`f(${x})`)}?`,
        `${math(`f(x)=${polynomialLatex([m1, n1])}`)} إذا ${math(`x<${at}`)} و${math(`f(x)=${polynomialLatex([m2, n2])}`)} إذا ${math(`x\\ge ${at}`)}. كم تساوي ${math(`f(${x})`)}؟`
    ), options(random, ofNumber(f(right)), [wrong(ofNumber(f(other)), 'wrong-piece'), ...nearNumbers(right)]), right, `f(${x})=${left ? m1 : m2}\\cdot ${paren(x)}${(left ? n1 : n2) >= 0 ? '+' : '-'}${Math.abs(left ? n1 : n2)}=${right}`, { at, m1, n1, m2, n2, x })
}

function joinQuestion(random: Random, tier: Tier): FunctionsAkRaceQuestion | null {
    const at = randomInt(random, tier === 0 ? 1 : -3, 3)
    const p = randomInt(random, -4, 4)
    const left = at * at + p
    const k = left - at
    if (k === left || k === left + at) return null
    return build(2, 'join', say(
        `Kalkulatu ${math('k')}, ${math(`f(x)=${polynomialLatex([1, 0, p])}`)} (${math(`x\\le ${at}`)}) eta ${math('f(x)=x+k')} (${math(`x>${at}`)}) jarraitua izan dadin.`,
        `Halla ${math('k')} para que ${math(`f(x)=${polynomialLatex([1, 0, p])}`)} (${math(`x\\le ${at}`)}), ${math('f(x)=x+k')} (${math(`x>${at}`)}) sea continua.`,
        `أوجد ${math('k')} لتكون ${math(`f(x)=${polynomialLatex([1, 0, p])}`)} (${math(`x\\le ${at}`)})، ${math('f(x)=x+k')} (${math(`x>${at}`)}) متصلة.`
    ), options(random, ofNumber(f(k)), [
        wrong(ofNumber(f(left)), 'left-value'),
        wrong(ofNumber(f(left + at)), 'sign'),
        ...nearNumbers(k)
    ]), k, `${paren(at)}^{2}${p >= 0 ? '+' : '-'}${Math.abs(p)}=${at}+k\\ \\to\\ k=${k}`, { at, p })
}

function jumpQuestion(random: Random, tier: Tier): FunctionsAkRaceQuestion | null {
    const at = randomInt(random, -2, 3)
    const m1 = nonZero(random, 3)
    const n1 = randomInt(random, -4, 4)
    const m2 = nonZero(random, tier === 0 ? 2 : 3)
    const n2 = randomInt(random, -4, 4)
    const left = m1 * at + n1
    const right = m2 * at + n2
    const jump = right - left
    if (jump === 0) return null
    return build(2, 'jump', say(
        `${math(`f(x)=${polynomialLatex([m1, n1])}`)} ${math(`x<${at}`)} denean, eta ${math(`f(x)=${polynomialLatex([m2, n2])}`)} ${math(`x\\ge ${at}`)} denean. Zenbatekoa da jauzia (eskuina ken ezkerra) ${math(`x=${at}`)} puntuan?`,
        `${math(`f(x)=${polynomialLatex([m1, n1])}`)} si ${math(`x<${at}`)} y ${math(`f(x)=${polynomialLatex([m2, n2])}`)} si ${math(`x\\ge ${at}`)}. ¿Cuánto es el salto (derecha menos izquierda) en ${math(`x=${at}`)}?`,
        `${math(`f(x)=${polynomialLatex([m1, n1])}`)} إذا ${math(`x<${at}`)} و${math(`f(x)=${polynomialLatex([m2, n2])}`)} إذا ${math(`x\\ge ${at}`)}. ما مقدار القفزة (اليمين ناقص اليسار) عند ${math(`x=${at}`)}؟`
    ), options(random, ofNumber(f(jump)), [wrong(ofNumber(f(-jump)), 'jump-order'), wrong(ofNumber(f(right + left)), 'sign'), ...nearNumbers(jump)]), jump, `${right}-${paren(left)}=${jump}`, { at, m1, n1, m2, n2 })
}

function holeQuestion(random: Random, tier: Tier): FunctionsAkRaceQuestion | null {
    const p = nonZero(random, reach(tier))
    const right = 2 * p
    return build(2, 'hole', say(
        `${math(`y=\\frac{${polynomialLatex([1, 0, -p * p])}}{${polynomialLatex([1, -p])}}`)} funtzioak zulo bat du ${math(`x=${p}`)} puntuan. Zein ordenatu falta da?`,
        `${math(`y=\\frac{${polynomialLatex([1, 0, -p * p])}}{${polynomialLatex([1, -p])}}`)} tiene un agujero en ${math(`x=${p}`)}. ¿Qué ordenada falta?`,
        `للدالة ${math(`y=\\frac{${polynomialLatex([1, 0, -p * p])}}{${polynomialLatex([1, -p])}}`)} ثقب عند ${math(`x=${p}`)}. ما الإحداثي الصادي الناقص؟`
    ), options(random, ofNumber(f(right)), [
        wrong(ofNumber(f(p)), 'hole-x'),
        wrong(ofNumber(f(p * p)), 'square'),
        wrong(ofNumber(f(0)), 'calculation'),
        ...nearNumbers(right)
    ]), right, `\\frac{${factorLatex(p)}${factorLatex(-p)}}{${factorLatex(p)}}=${polynomialLatex([1, p])}\\qquad ${p}${p >= 0 ? '+' : '-'}${Math.abs(p)}=${right}`, { p })
}

/* ---------- Circuit 3: intercepts, sign and parity ---------- */

function yInterceptQuestion(random: Random, tier: Tier): FunctionsAkRaceQuestion | null {
    const roots = [nonZero(random, reach(tier)), nonZero(random, reach(tier)), nonZero(random, 3)]
    const right = -roots[0] * roots[1] * roots[2]
    return build(3, 'y-intercept', say(
        `Zein ordenatutan ebakitzen du ${math(`y=${roots.map(factorLatex).join('')}`)} funtzioak Y ardatza?`,
        `¿En qué ordenada corta al eje Y la función ${math(`y=${roots.map(factorLatex).join('')}`)}?`,
        `عند أي إحداثي صادي تقطع الدالة ${math(`y=${roots.map(factorLatex).join('')}`)} محور Y؟`
    ), options(random, ofNumber(f(right)), [
        wrong(ofNumber(f(-right)), 'sign'),
        wrong(ofNumber(f(roots[0] + roots[1] + roots[2])), 'sum-roots'),
        ...nearNumbers(right)
    ]), right, `${roots.map((root) => `(0${root > 0 ? '-' : '+'}${Math.abs(root)})`).join('')}=${right}`, { r: roots[0], s: roots[1], t: roots[2] })
}

function largestRootQuestion(random: Random, tier: Tier): FunctionsAkRaceQuestion | null {
    if (random() < 0.5) {
        const r = randomInt(random, 2, tier === 0 ? 4 : 7)
        return build(3, 'cubic-root', say(
            `Zein da ${math(`y=${polynomialLatex([1, 0, -r * r, 0])}`)} funtzioak X ardatzarekin duen ebaki-puntu handienaren abszisa?`,
            `¿Cuál es la abscisa del mayor corte de ${math(`y=${polynomialLatex([1, 0, -r * r, 0])}`)} con el eje X?`,
            `ما الإحداثي السيني لأكبر نقطة تقاطع لـ ${math(`y=${polynomialLatex([1, 0, -r * r, 0])}`)} مع محور X؟`
        ), options(random, ofNumber(f(r)), [wrong(ofNumber(f(r * r)), 'square'), wrong(ofNumber(f(0)), 'calculation'), wrong(ofNumber(f(-r)), 'sign'), ...nearNumbers(r)]), r, `x(x-${r})(x+${r})=0\\ \\to\\ x=${r}`, { r, s: 0 })
    }
    const a = randomInt(random, 1, 3)
    const b = randomInt(random, a + 1, tier === 0 ? 4 : 5)
    return build(3, 'biquadratic-root', say(
        `Zein da ${math(`y=${polynomialLatex([1, 0, -(a * a + b * b), 0, a * a * b * b])}`)} funtzioak X ardatzarekin duen ebaki-puntu handienaren abszisa?`,
        `¿Cuál es la abscisa del mayor corte de ${math(`y=${polynomialLatex([1, 0, -(a * a + b * b), 0, a * a * b * b])}`)} con el eje X?`,
        `ما الإحداثي السيني لأكبر نقطة تقاطع لـ ${math(`y=${polynomialLatex([1, 0, -(a * a + b * b), 0, a * a * b * b])}`)} مع محور X؟`
    ), options(random, ofNumber(f(b)), [wrong(ofNumber(f(b * b)), 'square'), wrong(ofNumber(f(a)), 'calculation'), wrong(ofNumber(f(-b)), 'sign'), ...nearNumbers(b)]), b, `t^{2}-${a * a + b * b}t+${a * a * b * b}=0\\ \\to\\ t=${a * a},\\ t=${b * b}\\ \\to\\ x=\\pm ${a},\\ x=\\pm ${b}`, { r: a, s: b })
}

function parityQuestion(random: Random, tier: Tier): FunctionsAkRaceQuestion | null {
    const odd = random() < 0.5
    const a = randomInt(random, 1, reach(tier))
    const value = nonZero(random, 9)
    const right = odd ? -value : value
    return build(3, 'parity', say(
        `${math('f')} funtzioa ${odd ? 'bakoitia' : 'bikoitia'} da eta ${math(`f(${a})=${value}`)}. Zenbat da ${math(`f(-${a})`)}?`,
        `La función ${math('f')} es ${odd ? 'impar' : 'par'} y ${math(`f(${a})=${value}`)}. ¿Cuánto vale ${math(`f(-${a})`)}?`,
        `الدالة ${math('f')} ${odd ? 'فردية' : 'زوجية'} و${math(`f(${a})=${value}`)}. كم تساوي ${math(`f(-${a})`)}؟`
    ), options(random, ofNumber(f(right)), [wrong(ofNumber(f(-right)), 'parity'), ...nearNumbers(right)]), right, `f(-${a})=${odd ? '-' : ''}f(${a})=${right}`, { a, value, odd: odd ? 1 : 0 })
}

function negativeQuestion(random: Random, tier: Tier): FunctionsAkRaceQuestion | null {
    const r = randomInt(random, -reach(tier), reach(tier) - 1)
    const s = randomInt(random, r + 1, reach(tier))
    if (r === -s) return null
    return build(3, 'negative', say(
        `Non da negatiboa ${math(`f(x)=${polynomialLatex([1, -(r + s), r * s])}`)} funtzioa?`,
        `¿Dónde es negativa ${math(`f(x)=${polynomialLatex([1, -(r + s), r * s])}`)}?`,
        `أين تكون ${math(`f(x)=${polynomialLatex([1, -(r + s), r * s])}`)} سالبة؟`
    ), options(random, ofLatex(intervalLatex(r, s)), [
        wrong(ofLatex(`${intervalLatex('-inf', r)}\\cup${intervalLatex(s, 'inf')}`), 'inside-outside'),
        wrong(ofLatex(intervalLatex(-s, -r)), 'root-sign'),
        wrong(ofLatex(intervalLatex(r, s, true, true)), 'bracket')
    ]), null, `${factorLatex(r)}${factorLatex(s)}<0\\ \\to\\ ${intervalLatex(r, s)}`, { r, s })
}

/* ---------- Circuit 4: increasing, rate and period ---------- */

function rateQuestion(random: Random, tier: Tier): FunctionsAkRaceQuestion | null {
    const b = randomInt(random, -4, 4)
    const c = randomInt(random, -3, 3)
    const from = randomInt(random, -3, 2)
    const to = from + randomInt(random, 2, tier === 0 ? 2 : 4)
    const value = (x: number) => x * x + b * x + c
    const difference = value(to) - value(from)
    const right = difference / (to - from)
    if (difference === 0) return null
    return build(4, 'rate', say(
        `Kalkulatu ${math(`f(x)=${polynomialLatex([1, b, c])}`)} funtzioaren T.V.M. ${math(`[${from},\\,${to}]`)} tartean.`,
        `Halla la T.V.M. de ${math(`f(x)=${polynomialLatex([1, b, c])}`)} en ${math(`[${from},\\,${to}]`)}.`,
        `أوجد معدل التغير المتوسط لـ ${math(`f(x)=${polynomialLatex([1, b, c])}`)} في ${math(`[${from},\\,${to}]`)}.`
    ), options(random, ofNumber(f(right)), [
        wrong(ofNumber(f(difference)), 'no-divide'),
        wrong(ofNumber(f(-right)), 'sign'),
        ...nearNumbers(right)
    ]), right, `\\frac{${value(to)}-${paren(value(from))}}{${to}-${paren(from)}}=\\frac{${difference}}{${to - from}}=${right}`, { b, c, from, to })
}

function extremeQuestion(random: Random, tier: Tier): FunctionsAkRaceQuestion | null {
    const a = pick(random, [1, -1])
    const h = nonZero(random, reach(tier))
    const k = randomInt(random, -6, 6)
    const c = a * h * h + k
    if (c === k || h === k || k === 0) return null
    return build(4, 'extreme', say(
        `Zein da ${math(`y=${polynomialLatex([a, -2 * a * h, c])}`)} funtzioaren ${a > 0 ? 'balio minimoa' : 'balio maximoa'}?`,
        `¿Cuál es el valor ${a > 0 ? 'mínimo' : 'máximo'} de ${math(`y=${polynomialLatex([a, -2 * a * h, c])}`)}?`,
        `ما القيمة ${a > 0 ? 'الصغرى' : 'العظمى'} لـ ${math(`y=${polynomialLatex([a, -2 * a * h, c])}`)}؟`
    ), options(random, ofNumber(f(k)), [
        wrong(ofNumber(f(h)), 'vertex-x'),
        wrong(ofNumber(f(c)), 'constant'),
        wrong(ofNumber(f(-k)), 'sign'),
        ...nearNumbers(k)
    ]), k, `x=\\frac{${2 * a * h}}{${2 * a}}=${h}\\qquad y=${a > 0 ? '' : '-'}${paren(h)}^{2}${-2 * a * h >= 0 ? '+' : '-'}${Math.abs(2 * a * h)}\\cdot ${paren(h)}${c >= 0 ? '+' : '-'}${Math.abs(c)}=${k}`, { a, h, k })
}

function periodQuestion(random: Random, tier: Tier): FunctionsAkRaceQuestion | null {
    const period = randomInt(random, 3, tier === 0 ? 5 : 9)
    const quotient = randomInt(random, 3, tier === 2 ? 15 : 9)
    const rest = randomInt(random, 1, period - 1)
    const x = quotient * period + rest
    if (quotient === rest || period - rest === rest || quotient === period - rest) return null
    return build(4, 'period', say(
        `Funtzio baten periodoa ${math(String(period))} da. ${math(`[0,\\,${period})`)} tarteko zein ${math('x')} balioak ematen du ${math(`f(${x})`)} balio bera?`,
        `Una función tiene periodo ${math(String(period))}. ¿Qué ${math('x')} de ${math(`[0,\\,${period})`)} tiene el mismo valor que ${math(`f(${x})`)}?`,
        `دور دالة ${math(String(period))}. ما قيمة ${math('x')} في ${math(`[0,\\,${period})`)} التي لها قيمة ${math(`f(${x})`)} نفسها؟`
    ), options(random, ofNumber(f(rest)), [
        wrong(ofNumber(f(quotient)), 'quotient'),
        wrong(ofNumber(f(period - rest)), 'calculation'),
        ...nearNumbers(rest).filter((item) => toNumberSafe(item.key) >= 0 && toNumberSafe(item.key) < period)
    ]), rest, `${x}=${quotient}\\cdot ${period}+${rest}`, { period, x })
}

/** The number behind an option key such as n-3 or n2/3 */
function toNumberSafe(key: string): number {
    const [numerator, denominator = '1'] = key.slice(1).split('/')
    return Number(numerator) / Number(denominator)
}

function speedQuestion(random: Random, tier: Tier): FunctionsAkRaceQuestion | null {
    const alpha = pick(random, tier === 0 ? [5, 10] : [2, 5, 10])
    const from = randomInt(random, 1, 3)
    const to = from + randomInt(random, 1, 3)
    const right = alpha * (from + to)
    const fromZero = (alpha * to * to) / to
    if (fromZero === right) return null
    return build(4, 'speed', say(
        `Bola batek ${math(`e=${alpha}t^{2}`)} metro egiten ditu ${math('t')} segundotan. Zein da haren abiadura ertaina ${math(`[${from},\\,${to}]`)} tartean, m/s-tan?`,
        `Una bola recorre ${math(`e=${alpha}t^{2}`)} metros en ${math('t')} segundos. ¿Cuál es su velocidad media en ${math(`[${from},\\,${to}]`)}, en m/s?`,
        `تقطع كرة ${math(`e=${alpha}t^{2}`)} مترًا في ${math('t')} ثانية. ما سرعتها المتوسطة في ${math(`[${from},\\,${to}]`)} بالمتر في الثانية؟`
    ), options(random, ofNumber(f(right)), [
        wrong(ofNumber(f(fromZero)), 'from-zero'),
        wrong(ofNumber(f(alpha * (to * to - from * from))), 'no-divide'),
        ...nearNumbers(right)
    ]), right, `\\frac{${alpha * to * to}-${alpha * from * from}}{${to}-${from}}=${right}`, { alpha, from, to })
}

/* ---------- Circuits ---------- */

type Generator = (random: Random, tier: Tier) => FunctionsAkRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [imageQuestion, preimageQuestion, rangeQuestion],
    [domainEndQuestion, excludedCountQuestion, fractionDomainQuestion, linearRootQuestion, quadraticRootQuestion, rootDenominatorQuestion],
    [pieceValueQuestion, joinQuestion, jumpQuestion, holeQuestion],
    [yInterceptQuestion, largestRootQuestion, parityQuestion, negativeQuestion],
    [rateQuestion, extremeQuestion, periodQuestion, speedQuestion]
]

export function generateFunctionsAkRaceQuestion(random: Random, circuit: number, tier: Tier, requireWritable = false): FunctionsAkRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 800; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next && (!requireWritable || next.writable)) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkFunctionsAkPitAnswer(question: RaceQuestion<FunctionsAkRaceError>, input: string): AnswerCheck {
    return checkAnswer(readFunctionsAnswer(input), question.answer as FractionValue, question.answerForm)
}

export function functionsAkParTime(circuit: number): number {
    return parTimeFor([13, 14, 14, 14, 15][circuit] ?? 14)
}

export const functionsAkRaceErrorTips: Record<FunctionsAkRaceError, LocalizedText> = {
    'square-sign': say('Ordeztu parentesi artean: $(-3)^{2}=9$, ez $-9$.', 'Sustituye entre paréntesis: $(-3)^{2}=9$, no $-9$.', 'عوّض بين قوسين: $(-3)^{2}=9$ وليس $-9$.'),
    'image-for-preimage': say('Irudia kalkulatu duzu. Aurreirudia: ebatzi $f(x)=b$.', 'Has calculado la imagen. La antiimagen: resuelve $f(x)=b$.', 'حسبت الصورة. الأصل: حُلّ $f(x)=b$.'),
    sign: say('Begiratu zeinuari: gai bat aldatu da.', 'Mira el signo: ha cambiado algún término.', 'انتبه للإشارة: تغيّر أحد الحدود.'),
    'vertex-x': say('Hori erpinaren abszisa da; balioa haren ordenatua da.', 'Esa es la abscisa del vértice; el valor es su ordenada.', 'هذا الإحداثي السيني للرأس؛ والقيمة هي إحداثيه الصادي.'),
    constant: say('Gai askea $f(0)$ da, ez muturra: kalkulatu $f$ erpinean.', 'El término independiente es $f(0)$, no el extremo: calcula $f$ en el vértice.', 'الحد الثابت هو $f(0)$ لا القيمة القصوى: احسب $f$ عند الرأس.'),
    'root-sign': say('Erroek aurkako zeinua dute: $(x-3)=0$ bada, $x=3$.', 'Las raíces tienen el signo contrario: si $(x-3)=0$, $x=3$.', 'للجذر الإشارة المعاكسة: إذا $(x-3)=0$ فإن $x=3$.'),
    'whole-line': say('Izendatzailea anulatu egiten da: kendu haren erroak.', 'El denominador sí se anula: quita sus raíces.', 'المقام ينعدم: احذف جذريه.'),
    'inequality-direction': say('Zenbaki negatibo batez zatitzean, desberdintzaren noranzkoa aldatzen da.', 'Al dividir entre un número negativo cambia el sentido de la desigualdad.', 'عند القسمة على عدد سالب يتغير اتجاه المتراجحة.'),
    bracket: say('Erroa: $\\ge 0$, muturrak barne, kortxetearekin.', 'Raíz: $\\ge 0$, extremos incluidos, con corchete.', 'الجذر: $\\ge 0$، الطرفان ضمنها، بقوس معقوف.'),
    'inside-outside': say('Begiratu parabolaren zeinua: $x^{2}-r^{2}$ positiboa da erroetatik kanpo, eta $r^{2}-x^{2}$ barruan.', 'Mira el signo de la parábola: $x^{2}-r^{2}$ es positivo fuera de las raíces, y $r^{2}-x^{2}$ dentro.', 'انظر إلى إشارة القطع: $x^{2}-r^{2}$ موجب خارج الجذرين و$r^{2}-x^{2}$ داخلهما.'),
    strict: say('Erroa izendatzailean: $>0$ hertsia, 0z ezin delako zatitu.', 'Raíz en el denominador: $>0$ estricto, porque no se divide entre 0.', 'الجذر في المقام: $>0$ تمامًا لأن القسمة على 0 لا تجوز.'),
    'fraction-only': say('Hori zatiki baten izate-eremua da; erroan zeinua ere begiratu behar da.', 'Ese es el dominio de una fracción; en la raíz también cuenta el signo.', 'هذا مجال كسر؛ في الجذر تهم الإشارة أيضًا.'),
    'wrong-piece': say('Beste zatia erabili duzu: begiratu lehenik zein tartetan dagoen $x$.', 'Has usado el otro trozo: mira primero en qué intervalo está $x$.', 'استعملت الجزء الآخر: انظر أولًا في أي فترة تقع $x$.'),
    'left-value': say('Hori ezkerreko zatiaren balioa da; $k$ askatu behar da: $a+k=$ balio hori.', 'Ese es el valor del trozo izquierdo; hay que despejar $k$: $a+k=$ ese valor.', 'هذه قيمة الجزء الأيسر؛ يجب عزل $k$: $a+k=$ تلك القيمة.'),
    'jump-order': say('Jauzia: eskuineko balioa ken ezkerrekoa.', 'El salto: valor de la derecha menos el de la izquierda.', 'القفزة: قيمة اليمين ناقص قيمة اليسار.'),
    'hole-x': say('Hori zuloaren abszisa da; ordenatua sinplifikatutako formulatik ateratzen da.', 'Esa es la abscisa del agujero; la ordenada sale de la fórmula simplificada.', 'هذا الإحداثي السيني للثقب؛ والصادي من الصيغة المبسّطة.'),
    square: say('Hori karratua da: erroa falta da.', 'Eso es el cuadrado: falta la raíz.', 'هذا هو المربع: ينقص الجذر.'),
    'sum-roots': say('Y ardatzean $x=0$: biderkatu, ez batu.', 'En el eje Y, $x=0$: multiplica, no sumes.', 'على محور Y يكون $x=0$: اضرب ولا تجمع.'),
    parity: say('Bikoitia: $f(-x)=f(x)$. Bakoitia: $f(-x)=-f(x)$.', 'Par: $f(-x)=f(x)$. Impar: $f(-x)=-f(x)$.', 'الزوجية: $f(-x)=f(x)$. الفردية: $f(-x)=-f(x)$.'),
    'no-divide': say('Kendura falta da tartearen luzeraz zatitzea: $\\frac{f(b)-f(a)}{b-a}$.', 'Falta dividir la diferencia entre la longitud del intervalo: $\\frac{f(b)-f(a)}{b-a}$.', 'ينقص قسمة الفرق على طول الفترة: $\\frac{f(b)-f(a)}{b-a}$.'),
    quotient: say('Hori zatidura da; behar dena hondarra da.', 'Ese es el cociente; lo que hace falta es el resto.', 'هذا خارج القسمة؛ والمطلوب الباقي.'),
    'from-zero': say('Hori $[0,\\,b]$ tarteko abiadura ertaina da; kendu $e(a)$ eta zatitu $b-a$-z.', 'Esa es la velocidad media en $[0,\\,b]$; resta $e(a)$ y divide entre $b-a$.', 'هذه السرعة المتوسطة في $[0,\\,b]$؛ اطرح $e(a)$ واقسم على $b-a$.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.')
}
