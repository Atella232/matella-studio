import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { binomialLatex, fromRoots, polyLatex } from '../../dbh4-akademikoak-polinomioak/polynomials.ts'
import { exponentLatex, flip, ray, relationLatex, RELATIONS, setLatex, span, spanContains, type Relation } from '../lab/labTools.ts'

/* ==========================================================================
   Ekuazioen lasterketa (4. DBH akademikoak): five circuits, one per stage —
   second degree (the discriminant, the greatest root, the sum or product
   of the roots, a rectangle), other polynomial equations (how many
   solutions a biquadratic has, its greatest root, the solutions of a
   product, a rational equation), radicals, exponentials and logarithms
   (a square root, the true solution among the false one, the same base, a
   logarithm, a sum of logarithms), linear inequalities (the greatest or
   smallest integer solution, which number is a solution, a taxi budget,
   two tariffs) and second degree inequalities and systems (how many
   integers, the greatest integer, a system, the parabola below a line).
   Wrong options are typical mistakes: −b² for (−b)², the other root, the
   sign of −b/a, t taken for x, a negative t giving two x, the excluded
   value, the false solution kept, N taken for the exponent, log as a
   product, the endpoint included or left out, the sense not flipped…
   Every question carries `meta`, the numbers the tests check it against.
   ========================================================================== */

export const EQUATIONS_RACE_CIRCUITS = 5

export type EquationsRaceError =
    | 'double'
    | 'sign'
    | 'other-root'
    | 'sum-sign'
    | 'sum-product'
    | 'divide-a'
    | 'negative-t'
    | 'zero-t'
    | 't-not-x'
    | 'binomial-sign'
    | 'excluded'
    | 'upside-down'
    | 'no-square'
    | 'false-solution'
    | 'power'
    | 'log-times'
    | 'endpoint'
    | 'flip'
    | 'no-fixed'
    | 'round-up'
    | 'calculation'

export type EquationsRaceQuestion = RaceQuestion<EquationsRaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex}$` })
const math = (latex: string) => `$${latex}$`
/** A number inside a sum: +3, −3, and nothing for 0 */
const plus = (value: number) => (value === 0 ? '' : value < 0 ? `-${-value}` : `+${value}`)
/** A value in brackets when negative */
const bracket = (value: number) => (value < 0 ? `(${value})` : String(value))
/** k·x with the 1 left out: x, −x, 3x */
const times = (value: number, letter = 'x') => (value === 0 ? '0' : value === 1 ? letter : value === -1 ? `-${letter}` : `${value}${letter}`)
const nonZero = (random: Random, min: number, max: number) => {
    const value = randomInt(random, min, max - 1)
    return value >= 0 ? value + 1 : value
}
/** x − r as a factor: x, (x−3), (x+2) */
const factor = (root: number) => (root === 0 ? 'x' : `(${binomialLatex(root)})`)
/** a(x − r)(x − s) with the leading 1 or −1 written as nothing or − */
const factored = (a: number, roots: number[]) => `${a === 1 ? '' : a === -1 ? '-' : a}${roots.map(factor).join('')}`

/** A value in LaTeX: a whole number or a fraction */
export function written(value: FractionValue): string {
    if (value.denominator === 1) return String(value.numerator)
    return `${value.numerator < 0 ? '-' : ''}\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`
}

interface Candidate {
    value: FractionValue
    error: EquationsRaceError
}
const whole = (value: number, error: EquationsRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const near = (value: number): Candidate[] => [value + 1, value - 1, value + 2, -value, value - 2].map((item) => whole(item, 'calculation'))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<EquationsRaceError>[] | null {
    const rightLatex = written(right)
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: EquationsRaceError }> = []
    for (const candidate of candidates) {
        if (wrong.length === 3) break
        if (!Number.isFinite(candidate.value.numerator / candidate.value.denominator)) continue
        const latex = written(candidate.value)
        if (latex === '-0' || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<EquationsRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>, writable = true): EquationsRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable, solution, meta }
}

const greatestSolution = (equation: string) => say(`Zein da ${math(equation)} ekuazioaren ebazpenik handiena?`, `¿Cuál es la mayor solución de ${math(equation)}?`, `ما أكبر حل للمعادلة ${math(equation)}؟`, `What is the largest solution of ${math(equation)}?`)
const onlySolution = (equation: string) => say(`Zein da ${math(equation)} ekuazioaren ebazpena?`, `¿Cuál es la solución de ${math(equation)}?`, `ما حل المعادلة ${math(equation)}؟`, `What is the solution of ${math(equation)}?`)
const howManyIntegers = (condition: string) => say(`Zenbat zenbaki osok betetzen dute ${math(condition)}?`, `¿Cuántos números enteros cumplen ${math(condition)}?`, `كم عددًا صحيحًا يحقق ${math(condition)}؟`, `How many integers satisfy ${math(condition)}?`)

/* ---------- Circuit 0: second degree ---------- */

function discriminantQuestion(random: Random, tier: Tier): EquationsRaceQuestion | null {
    const a = tier === 0 ? 1 : nonZero(random, -3, 3)
    const b = nonZero(random, -9, 9)
    const c = nonZero(random, -9, 9)
    const value = b * b - 4 * a * c
    const choices = options(random, fraction(value), [whole(-b * b - 4 * a * c, 'sign'), whole(b * b + 4 * a * c, 'sign'), whole(2 * b - 4 * a * c, 'double'), ...near(value)])
    return choices && build(0, 'discriminant', say(
        `Zenbat da ${math(`${polyLatex([a, b, c])}=0`)} ekuazioaren diskriminatzailea?`,
        `¿Cuánto vale el discriminante de ${math(`${polyLatex([a, b, c])}=0`)}?`,
        `كم يساوي مميّز المعادلة ${math(`${polyLatex([a, b, c])}=0`)}؟`, `What is the discriminant of ${math(`${polyLatex([a, b, c])}=0`)}?`
    ), choices, fraction(value), same(`\\Delta=${bracket(b)}^{2}-4\\cdot ${bracket(a)}\\cdot ${bracket(c)}=${value}`), { a, b, c })
}

function greatestRootQuestion(random: Random, tier: Tier): EquationsRaceQuestion | null {
    const a = tier === 0 ? 1 : pick(random, [1, 2, -1, 3])
    const r = randomInt(random, -9, 8)
    const s = randomInt(random, r + 1, 9)
    const p = fromRoots([r, s]).map((c) => c * a)
    if (p.some((c) => Math.abs(c) > 60)) return null
    const choices = options(random, fraction(s), [whole(-s, 'sign'), whole(r, 'other-root'), whole(-r, 'sign'), ...near(s)])
    return choices && build(0, 'greatest-root', greatestSolution(`${polyLatex(p)}=0`), choices, fraction(s), same(`${polyLatex(p)}=${factored(a, [r, s])}`), { a, r, s })
}

function sumProductQuestion(random: Random, tier: Tier): EquationsRaceQuestion | null {
    const a = tier === 0 ? 1 : randomInt(random, 2, 4)
    const r = randomInt(random, -6, 6)
    const s = randomInt(random, -6, 6)
    const [, b, c] = fromRoots([r, s]).map((k) => k * a)
    const which = randomInt(random, 0, 1)
    const equation = `${polyLatex([a, b, c])}=0`
    const sum = r + s
    const product = r * s
    if (which === 0) {
        const choices = options(random, fraction(sum), [whole(-sum, 'sum-sign'), whole(product, 'sum-product'), whole(a * sum, 'divide-a'), ...near(sum)])
        return choices && build(0, 'sum-product', say(
            `Ebatzi gabe, zenbat da ${math(equation)} ekuazioaren ebazpenen batura?`,
            `Sin resolverla, ¿cuánto suman las soluciones de ${math(equation)}?`,
            `دون حلّها، كم مجموع حلول ${math(equation)}؟`, `Without solving it, what is the sum of the solutions of ${math(equation)}?`
        ), choices, fraction(sum), same(`x_1+x_2=-\\frac{b}{a}=${a === 1 ? -b : `\\frac{${-b}}{${a}}`}${a === 1 ? '' : `=${sum}`}`), { a, r, s, which })
    }
    const choices = options(random, fraction(product), [whole(-product, 'sum-sign'), whole(sum, 'sum-product'), whole(a * product, 'divide-a'), ...near(product)])
    return choices && build(0, 'sum-product', say(
        `Ebatzi gabe, zenbat da ${math(equation)} ekuazioaren ebazpenen biderkadura?`,
        `Sin resolverla, ¿cuánto vale el producto de las soluciones de ${math(equation)}?`,
        `دون حلّها، كم جداء حلول ${math(equation)}؟`, `Without solving it, what is the product of the solutions of ${math(equation)}?`
    ), choices, fraction(product), same(`x_1\\cdot x_2=\\frac{c}{a}=${a === 1 ? c : `\\frac{${c}}{${a}}`}${a === 1 ? '' : `=${product}`}`), { a, r, s, which })
}

function rectangleQuestion(random: Random, tier: Tier): EquationsRaceQuestion | null {
    const p = randomInt(random, 2, tier === 0 ? 6 : 10)
    const q = randomInt(random, p + 1, tier === 0 ? 9 : 15)
    const perimeter = 2 * (p + q)
    const area = p * q
    const choices = options(random, fraction(q), [whole(p, 'other-root'), whole(p + q, 'calculation'), ...near(q)])
    return choices && build(0, 'rectangle', say(
        `Laukizuzen baten perimetroa ${perimeter} cm da eta azalera ${area} cm². Zenbat neurtzen du alde luzeenak (cm)?`,
        `Un rectángulo tiene ${perimeter} cm de perímetro y ${area} cm² de área. ¿Cuánto mide el lado mayor (cm)?`,
        `مستطيل محيطه ${perimeter} سم ومساحته ${area} سم². كم طول ضلعه الأكبر (سم)؟`, `A rectangle has a perimeter of ${perimeter} cm and an area of ${area} cm². How long is the longer side (cm)?`
    ), choices, fraction(q), same(`x(${p + q}-x)=${area}\\ \\to\\ x=${p},\\ x=${q}`), { p, q })
}

/* ---------- Circuit 1: other polynomial equations ---------- */

const T_VALUES = [-9, -4, -1, 0, 1, 4, 9]
const xCount = (t: number) => (t < 0 ? 0 : t === 0 ? 1 : 2)

function biquadraticCountQuestion(random: Random): EquationsRaceQuestion | null {
    const t1 = pick(random, T_VALUES)
    const t2 = pick(random, T_VALUES)
    if (t1 >= t2) return null
    const count = xCount(t1) + xCount(t2)
    const candidates: Candidate[] = []
    if (t1 < 0) candidates.push(whole(t1 === 0 || t2 === 0 ? 3 : 4, 'negative-t'))
    if (t1 === 0 || t2 === 0) candidates.push(whole(count + 1, 'zero-t'))
    candidates.push(whole(2, 't-not-x'), ...[0, 1, 2, 3, 4].map((value) => whole(value, 'calculation')))
    const choices = options(random, fraction(count), candidates)
    const equation = `${polyLatex([1, 0, -(t1 + t2), 0, t1 * t2])}=0`
    return choices && build(1, 'biquadratic-count', say(
        `Zenbat ebazpen erreal ditu ${math(equation)} ekuazioak?`,
        `¿Cuántas soluciones reales tiene ${math(equation)}?`,
        `كم حلًّا حقيقيًا للمعادلة ${math(equation)}؟`, `How many real solutions does ${math(equation)} have?`
    ), choices, fraction(count), same(`x^{2}=t\\ \\to\\ ${polyLatex([1, -(t1 + t2), t1 * t2], 't')}=0\\ \\to\\ t=${t1},\\ t=${t2}`), { t1, t2 })
}

function biquadraticRootQuestion(random: Random, tier: Tier): EquationsRaceQuestion | null {
    const a = randomInt(random, 1, tier === 0 ? 2 : 4)
    const b = randomInt(random, a + 1, tier === 0 ? 3 : 5)
    const equation = `${polyLatex([1, 0, -(a * a + b * b), 0, a * a * b * b])}=0`
    const choices = options(random, fraction(b), [whole(b * b, 't-not-x'), whole(a * a, 't-not-x'), whole(-b, 'sign'), whole(a, 'other-root'), ...near(b)])
    return choices && build(1, 'biquadratic-root', greatestSolution(equation), choices, fraction(b), same(`t=x^{2}\\ \\to\\ t=${a * a},\\ t=${b * b}\\ \\to\\ x=\\pm ${a},\\ x=\\pm ${b}`), { a, b })
}

function factoredQuestion(random: Random, tier: Tier): EquationsRaceQuestion | null {
    const roots = Array.from({ length: tier === 0 ? 2 : 3 }, () => randomInt(random, -6, 6))
    if (new Set(roots).size < roots.length) return null
    const sum = roots.reduce((total, root) => total + root, 0)
    const equation = `${roots.map(factor).join('')}=0`
    const choices = options(random, fraction(sum), [whole(-sum, 'binomial-sign'), ...near(sum)])
    return choices && build(1, 'factored', say(
        `Zenbat da ${math(equation)} ekuazioaren ebazpenen batura?`,
        `¿Cuánto suman las soluciones de ${math(equation)}?`,
        `كم مجموع حلول ${math(equation)}؟`, `What is the sum of the solutions of ${math(equation)}?`
    ), choices, fraction(sum), same(roots.map((root) => `x=${root}`).join(',\\ ')), { r0: roots[0], r1: roots[1], r2: roots[2] ?? 0 })
}

function rationalQuestion(random: Random): EquationsRaceQuestion | null {
    const p = randomInt(random, -5, 5)
    const b = nonZero(random, -4, 4)
    const q = nonZero(random, -5, 5)
    const a = b * q
    const value = p + q
    const choices = options(random, fraction(value), [whole(p, 'excluded'), whole(q - p, 'binomial-sign'), { value: fraction(p * a + b, a), error: 'upside-down' }, ...near(value)])
    const equation = `\\frac{${a}}{${binomialLatex(p)}}=${b}`
    return choices && build(1, 'rational', onlySolution(equation), choices, fraction(value), same(`${binomialLatex(p)}=\\frac{${a}}{${b}}=${q}\\ \\to\\ x=${value}`), { p, a, b })
}

/* ---------- Circuit 2: radicals, exponentials and logarithms ---------- */

function radicalQuestion(random: Random, tier: Tier): EquationsRaceQuestion | null {
    const c = randomInt(random, 1, tier === 0 ? 5 : 9)
    const b = nonZero(random, -9, 9)
    const value = c * c - b
    const choices = options(random, fraction(value), [whole(c - b, 'no-square'), whole(c * c + b, 'sign'), whole(c * c, 'calculation'), ...near(value)])
    return choices && build(2, 'radical', onlySolution(`\\sqrt{x${plus(b)}}=${c}`), choices, fraction(value), same(`x${plus(b)}=${c}^{2}=${c * c}\\ \\to\\ x=${value}`), { b, c })
}

function radicalFalseQuestion(random: Random): EquationsRaceQuestion | null {
    const c = randomInt(random, -3, 3)
    const t = randomInt(random, -3, 8)
    const f = randomInt(random, -9, 9)
    const a = t + f + 2 * c
    const b = c * c - t * f
    // t is true (x + c ≥ 0) and f is false (x + c < 0)
    if (t === f || t + c < 0 || f + c >= 0 || a < 1 || a > 6 || Math.abs(b) > 30) return null
    const equation = `\\sqrt{${times(a)}${plus(b)}}=${c === 0 ? 'x' : `x${plus(c)}`}`
    const choices = options(random, fraction(t), [whole(f, 'false-solution'), whole(-t, 'sign'), ...near(t)])
    return choices && build(2, 'radical-false', onlySolution(equation), choices, fraction(t), same(`x=${t}\\ \\to\\ \\sqrt{${a * t + b}}=${t + c}\\quad x=${f}\\ \\to\\ ${f + c}<0`), { a, b, c })
}

function exponentialQuestion(random: Random, tier: Tier): EquationsRaceQuestion | null {
    const base = tier === 0 ? 2 : pick(random, [2, 3, 5])
    const p = tier === 0 ? 1 : randomInt(random, 1, 3)
    const q = randomInt(random, -4, 4)
    const x = randomInt(random, -3, 5)
    const k = p * x + q
    if (Math.abs(k) > (base === 2 ? 7 : base === 3 ? 4 : 3)) return null
    const right = k >= 0 ? String(base ** k) : `\\frac{1}{${base ** -k}}`
    const candidates: Candidate[] = []
    if (k >= 0 && (base ** k - q) % p === 0) candidates.push(whole((base ** k - q) / p, 'power'))
    if ((k + q) % p === 0) candidates.push(whole((k + q) / p, 'sign'))
    const choices = options(random, fraction(x), [...candidates, ...near(x)])
    return choices && build(2, 'exponential', onlySolution(`${base}^{${exponentLatex([p, q])}}=${right}`), choices, fraction(x), same(`${right}=${base}^{${k}}\\ \\to\\ ${exponentLatex([p, q])}=${k}${p === 1 && q === 0 ? '' : `\\ \\to\\ x=${x}`}`), { base, p, q, k })
}

const logOf = (base: number, argument: string) => (base === 10 ? `\\log(${argument})` : `\\log_{${base}}(${argument})`)

function logQuestion(random: Random): EquationsRaceQuestion | null {
    const base = pick(random, [2, 3, 5, 10])
    const k = randomInt(random, 1, base === 2 ? 6 : base === 3 ? 4 : base === 5 ? 3 : 2)
    const q = nonZero(random, -9, 9)
    const value = base ** k - q
    const choices = options(random, fraction(value), [whole(base * k - q, 'log-times'), whole(base ** k + q, 'sign'), whole(k - q, 'calculation'), ...near(value)])
    return choices && build(2, 'logarithm', onlySolution(`${logOf(base, `x${plus(q)}`)}=${k}`), choices, fraction(value), same(`x${plus(q)}=${base}^{${k}}=${base ** k}\\ \\to\\ x=${value}`), { base, k, q })
}

function logSumQuestion(random: Random, tier: Tier): EquationsRaceQuestion | null {
    const r = randomInt(random, 1, tier === 0 ? 5 : 9)
    const d = randomInt(random, 1, tier === 0 ? 4 : 9)
    const n = r * (r + d)
    const choices = options(random, fraction(r), [whole(-r - d, 'false-solution'), whole(n - d, 'log-times'), ...near(r)])
    return choices && build(2, 'log-sum', onlySolution(`\\log x+\\log(x+${d})=\\log ${n}`), choices, fraction(r), same(`x(x+${d})=${n}\\ \\to\\ x=${r},\\ x=${-r - d}`), { r, d })
}

/* ---------- Circuit 3: linear inequalities ---------- */

const inequalityLatex = (a: number, b: number, relation: Relation, c: number) => `${polyLatex([a, b])}${relationLatex[relation]}${c}`
/** ax + b R c solved: x R' e */
const solve = (a: number, b: number, relation: Relation, c: number) => ({ relation: a < 0 ? flip[relation] : relation, end: fraction(c - b, a) })
const upper = (relation: Relation) => relation === '<' || relation === '≤'

function integerSolutionQuestion(random: Random, tier: Tier): EquationsRaceQuestion | null {
    const a = tier === 0 ? randomInt(random, 2, 5) : nonZero(random, -5, 5)
    const b = randomInt(random, -9, 9)
    const c = randomInt(random, -9, 9)
    const relation = pick(random, RELATIONS)
    const { relation: solved, end } = solve(a, b, relation, c)
    const e = end.numerator / end.denominator
    const strict = solved === '<' || solved === '>'
    const answer = solved === '≤' ? Math.floor(e) : solved === '<' ? Math.ceil(e) - 1 : solved === '≥' ? Math.ceil(e) : Math.floor(e) + 1
    const boundary = upper(solved) ? (strict ? answer + 1 : answer - 1) : (strict ? answer - 1 : answer + 1)
    const choices = options(random, fraction(answer), [whole(boundary, 'endpoint'), whole(-answer, 'sign'), ...near(answer)])
    const inequality = inequalityLatex(a, b, relation, c)
    const prompt = upper(solved)
        ? say(`Zein da ${math(inequality)} inekuazioaren ebazpen oso handiena?`, `¿Cuál es la mayor solución entera de ${math(inequality)}?`, `ما أكبر حل صحيح للمتراجحة ${math(inequality)}؟`, `What is the largest integer solution of ${math(inequality)}?`)
        : say(`Zein da ${math(inequality)} inekuazioaren ebazpen oso txikiena?`, `¿Cuál es la menor solución entera de ${math(inequality)}?`, `ما أصغر حل صحيح للمتراجحة ${math(inequality)}؟`, `What is the smallest integer solution of ${math(inequality)}?`)
    return choices && build(3, 'integer-solution', prompt, choices, fraction(answer), same(`x${relationLatex[solved]}${written(end)}\\ \\to\\ ${answer}`), { a, b, c, relation: RELATIONS.indexOf(relation) })
}

function probeQuestion(random: Random, tier: Tier): EquationsRaceQuestion | null {
    const a = tier === 0 && randomInt(random, 0, 1) === 0 ? randomInt(random, 2, 4) : -randomInt(random, 1, 4)
    const b = randomInt(random, -9, 9)
    const c = randomInt(random, -9, 9)
    const relation = pick(random, RELATIONS)
    const { relation: solved, end } = solve(a, b, relation, c)
    const e = end.numerator / end.denominator
    const right = ray(solved, e)
    const wrongSense = ray(relation, e)
    const pool = Array.from({ length: 19 }, (_, k) => k - 9).filter((x) => x !== e)
    const inside = pool.filter((x) => spanContains(right, x))
    const outside = pool.filter((x) => !spanContains(right, x))
    if (!inside.length || outside.length < 3) return null
    const answer = pick(random, inside)
    const candidates: Candidate[] = []
    if (Number.isInteger(e) && !spanContains(right, e)) candidates.push(whole(e, 'endpoint'))
    if (a < 0) candidates.push(...shuffle(random, outside.filter((x) => spanContains(wrongSense, x))).slice(0, 2).map((x) => whole(x, 'flip')))
    candidates.push(...shuffle(random, outside).map((x) => whole(x, 'calculation')))
    const choices = options(random, fraction(answer), candidates)
    const inequality = inequalityLatex(a, b, relation, c)
    return choices && build(3, 'probe', say(
        `Zenbaki hauetako zein da ${math(inequality)} inekuazioaren ebazpena?`,
        `¿Cuál de estos números es solución de ${math(inequality)}?`,
        `أيّ هذه الأعداد حلّ للمتراجحة ${math(inequality)}؟`, `Which of these numbers is a solution of ${math(inequality)}?`
    ), choices, fraction(answer), same(`x${relationLatex[solved]}${written(end)}`), { a, b, c, relation: RELATIONS.indexOf(relation) }, false)
}

function budgetQuestion(random: Random): EquationsRaceQuestion | null {
    const fixed = randomInt(random, 2, 6)
    const rate = randomInt(random, 1, 3)
    const km = randomInt(random, 3, 15)
    const budget = fixed + rate * km + randomInt(random, 0, rate - 1)
    const answer = Math.floor((budget - fixed) / rate)
    const choices = options(random, fraction(answer), [whole(Math.floor(budget / rate), 'no-fixed'), whole(answer + 1, 'round-up'), ...near(answer)])
    return choices && build(3, 'budget', say(
        `Taxi batek ${fixed} € finko kobratzen ditu eta ${rate} € km bakoitzeko. Gehienez ${budget} € badituzu, gehienez zenbat km oso egin ditzakezu?`,
        `Un taxi cobra ${fixed} € fijos y ${rate} € por km. Si tienes como mucho ${budget} €, ¿cuántos km enteros puedes recorrer como máximo?`,
        `تتقاضى سيارة أجرة ${fixed} € ثابتة و${rate} € لكل كم. إذا كان معك ${budget} € على الأكثر، فكم كم صحيحًا يمكنك أن تقطع على الأكثر؟`, `A taxi charges a fixed fee of €${fixed} plus €${rate} per km. If you have at most €${budget}, what is the greatest whole number of km you can travel?`
    ), choices, fraction(answer), same(`${fixed}+${times(rate)}\\le ${budget}\\ \\to\\ x\\le ${written(fraction(budget - fixed, rate))}`), { fixed, rate, budget })
}

function tariffsQuestion(random: Random): EquationsRaceQuestion | null {
    const fee = randomInt(random, 5, 40)
    const rateA = randomInt(random, 1, 4)
    const rateB = randomInt(random, rateA + 1, 6)
    const cross = fraction(fee, rateB - rateA)
    const answer = Math.floor(cross.numerator / cross.denominator) + 1
    const choices = options(random, fraction(answer), [whole(answer - 1, 'endpoint'), whole(Math.floor(fee / rateB) + 1, 'no-fixed'), ...near(answer)])
    return choices && build(3, 'tariffs', say(
        `A tarifa: ${fee} € hilean eta ${rateA} € orduko. B tarifa: ${rateB} € orduko. Gutxienez zenbat ordu (zenbaki osoa) behar dira A merkeagoa izateko?`,
        `Tarifa A: ${fee} € al mes y ${rateA} € por hora. Tarifa B: ${rateB} € por hora. ¿Cuántas horas (número entero) hacen falta como mínimo para que la A sea más barata?`,
        `التعرفة A: ${fee} € شهريًا و${rateA} € للساعة. التعرفة B: ${rateB} € للساعة. كم ساعة (عددًا صحيحًا) على الأقل حتى تصبح A أرخص؟`, `Plan A: €${fee} a month and €${rateA} per hour. Plan B: €${rateB} per hour. What is the least number of hours (an integer) needed for plan A to be cheaper?`
    ), choices, fraction(answer), same(`${fee}+${times(rateA)}<${times(rateB)}\\ \\to\\ x>${written(cross)}`), { fee, rateA, rateB })
}

/* ---------- Circuit 4: second degree inequalities and systems ---------- */

/** a(x − r)(x − s) R 0 with its solution between the roots */
function betweenRoots(random: Random, tier: Tier) {
    const r = randomInt(random, -6, 6)
    const s = randomInt(random, r + 2, Math.min(9, r + 8))
    const a = tier === 0 ? 1 : pick(random, [1, -1])
    const closed = randomInt(random, 0, 1) === 1
    // a > 0: negative between the roots; a < 0: positive
    const relation: Relation = a > 0 ? (closed ? '≤' : '<') : (closed ? '≥' : '>')
    const p = fromRoots([r, s]).map((c) => c * a)
    if (p.some((c) => Math.abs(c) > 40)) return null
    return { r, s, a, closed, relation, inequality: `${polyLatex(p)}${relationLatex[relation]}0`, solution: `${polyLatex(p)}=${factored(a, [r, s])}\\ \\to\\ ${setLatex([span(r, s, closed, closed)])}` }
}

function quadraticCountQuestion(random: Random, tier: Tier): EquationsRaceQuestion | null {
    const data = betweenRoots(random, tier)
    if (!data) return null
    const { r, s, a, closed } = data
    const count = closed ? s - r + 1 : s - r - 1
    const choices = options(random, fraction(count), [whole(closed ? s - r - 1 : s - r + 1, 'endpoint'), whole(s - r, 'endpoint'), ...near(count)])
    return choices && build(4, 'quadratic-count', howManyIntegers(data.inequality), choices, fraction(count), same(data.solution), { r, s, a, relation: RELATIONS.indexOf(data.relation) })
}

function quadraticGreatestQuestion(random: Random, tier: Tier): EquationsRaceQuestion | null {
    const data = betweenRoots(random, tier)
    if (!data) return null
    const { r, s, a, closed } = data
    const answer = closed ? s : s - 1
    const choices = options(random, fraction(answer), [whole(closed ? s - 1 : s, 'endpoint'), whole(r, 'other-root'), whole(-s, 'binomial-sign'), ...near(answer)])
    return choices && build(4, 'quadratic-greatest', say(
        `Zein da ${math(data.inequality)} inekuazioaren ebazpen oso handiena?`,
        `¿Cuál es la mayor solución entera de ${math(data.inequality)}?`,
        `ما أكبر حل صحيح للمتراجحة ${math(data.inequality)}؟`, `What is the largest integer solution of ${math(data.inequality)}?`
    ), choices, fraction(answer), same(data.solution), { r, s, a, relation: RELATIONS.indexOf(data.relation) })
}

function systemCountQuestion(random: Random, tier: Tier): EquationsRaceQuestion | null {
    const p = randomInt(random, -6, 4)
    const q = randomInt(random, p + 1, Math.min(9, p + 7))
    const lower: Relation = pick(random, ['≥', '>'])
    const higher: Relation = pick(random, ['≤', '<'])
    const a1 = randomInt(random, 1, 3)
    const b1 = randomInt(random, -6, 6)
    const a2 = tier === 0 ? randomInt(random, 1, 3) : nonZero(random, -3, 3)
    const b2 = randomInt(random, -6, 6)
    // a₂ < 0 is written with the sense flipped, so solving it flips it back
    const second: Relation = a2 < 0 ? flip[higher] : higher
    const count = q - p + 1 - (lower === '>' ? 1 : 0) - (higher === '<' ? 1 : 0)
    if (count < 1) return null
    const first = inequalityLatex(a1, b1, lower, a1 * p + b1)
    const other = inequalityLatex(a2, b2, second, a2 * q + b2)
    const choices = options(random, fraction(count), [whole(q - p + 1, 'endpoint'), whole(q - p - 1, 'endpoint'), whole(q - p, 'endpoint'), ...near(count)])
    return choices && build(4, 'system-count', say(
        `Zenbat zenbaki osok betetzen dituzte batera ${math(first)} eta ${math(other)}?`,
        `¿Cuántos números enteros cumplen a la vez ${math(first)} y ${math(other)}?`,
        `كم عددًا صحيحًا يحقق معًا ${math(first)} و${math(other)}؟`, `How many integers satisfy ${math(first)} and ${math(other)} at the same time?`
    ), choices, fraction(count), same(`x${relationLatex[lower]}${p},\\ x${relationLatex[higher]}${q}\\ \\to\\ ${setLatex([span(p, q, lower === '≥', higher === '≤')])}`), { a1, b1, c1: a1 * p + b1, rel1: RELATIONS.indexOf(lower), a2, b2, c2: a2 * q + b2, rel2: RELATIONS.indexOf(second) })
}

function graphicLengthQuestion(random: Random): EquationsRaceQuestion | null {
    const r = randomInt(random, -5, 4)
    const s = randomInt(random, r + 1, 6)
    const m = r + s
    const n = -r * s
    if (Math.abs(m) > 9 || Math.abs(n) > 20) return null
    const length = s - r
    const choices = options(random, fraction(length), [whole(m, 'sum-product'), whole(length + 1, 'endpoint'), whole(s, 'other-root'), ...near(length)])
    return choices && build(4, 'graphic-length', say(
        `${math('y=x^{2}')} parabola ${math(`y=${polyLatex([m, n])}`)} zuzenaren azpitik dago tarte batean. Zenbat neurtzen du tarte horrek?`,
        `La parábola ${math('y=x^{2}')} queda por debajo de la recta ${math(`y=${polyLatex([m, n])}`)} en un intervalo. ¿Cuánto mide ese intervalo?`,
        `يكون القطع المكافئ ${math('y=x^{2}')} تحت المستقيم ${math(`y=${polyLatex([m, n])}`)} في مجال. كم طول هذا المجال؟`, `The parabola ${math('y=x^{2}')} is below the straight line ${math(`y=${polyLatex([m, n])}`)} over an interval. What is the length of that interval?`
    ), choices, fraction(length), same(`${polyLatex([1, -m, -n])}=0\\ \\to\\ x=${r},\\ x=${s}`), { m, n })
}

type Generator = (random: Random, tier: Tier) => EquationsRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [discriminantQuestion, greatestRootQuestion, sumProductQuestion, rectangleQuestion],
    [biquadraticCountQuestion, biquadraticRootQuestion, factoredQuestion, rationalQuestion],
    [radicalQuestion, radicalFalseQuestion, exponentialQuestion, logQuestion, logSumQuestion],
    [integerSolutionQuestion, probeQuestion, budgetQuestion, tariffsQuestion],
    [quadraticCountQuestion, quadraticGreatestQuestion, systemCountQuestion, graphicLengthQuestion]
]

export function generateEquationsRaceQuestion(random: Random, circuit: number, tier: Tier): EquationsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkEquationsPitAnswer(question: RaceQuestion<EquationsRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function equationsParTime(circuit: number): number {
    return parTimeFor([13, 13, 13, 13, 14][circuit] ?? 13)
}

export const equationsRaceErrorTips: Record<EquationsRaceError, LocalizedText> = {
    double: say('b² karratua da, b · b; ez 2b.', 'b² es un cuadrado, b · b; no 2b.', 'b² مربع أي b · b وليس 2b.', 'b² is b squared: b · b, not 2b.'),
    sign: say('Kontuz zeinuarekin: (−b)² positiboa da, eta negatiboak parentesi artean.', 'Cuidado con el signo: (−b)² es positivo, y los negativos van entre paréntesis.', 'انتبه للإشارة: (−b)² موجب، والسالب بين قوسين.', 'Be careful with the sign: (−b)² is positive, and negative values go in brackets.'),
    'other-root': say('Bi ebazpen daude: begiratu zein eskatzen den.', 'Hay dos soluciones: mira cuál se pide.', 'هناك حلّان: انظر أيّهما المطلوب.', 'There are two solutions: check which one is asked for.'),
    'sum-sign': say('Batura −b/a da, minus zeinuarekin; biderkadura c/a.', 'La suma es −b/a, con el signo menos; el producto, c/a.', 'المجموع −b/a بإشارة سالبة؛ والجداء c/a.', 'The sum is −b/a, with a minus sign; the product is c/a.'),
    'sum-product': say('Ez nahastu batura eta biderkadura: batura −b/a, biderkadura c/a.', 'No confundas suma y producto: la suma es −b/a y el producto c/a.', 'لا تخلط بين المجموع والجداء: المجموع −b/a والجداء c/a.', 'Do not mix up sum and product: the sum is −b/a and the product is c/a.'),
    'divide-a': say('Ez ahaztu a-z zatitzea.', 'No olvides dividir entre a.', 'لا تنسَ القسمة على a.', 'Do not forget to divide by a.'),
    'negative-t': say('t negatibo batek ez du x-rik ematen: x² ezin da negatiboa izan.', 'Una t negativa no da ninguna x: x² no puede ser negativo.', 'لا تعطي t السالبة أي x: لا يمكن أن يكون x² سالبًا.', 'A negative t gives no x: x² cannot be negative.'),
    'zero-t': say('t = 0 balioak x bakarra ematen du: x = 0.', 't = 0 da una sola x: x = 0.', 't = 0 تعطي قيمة واحدة: x = 0.', 't = 0 gives only one x: x = 0.'),
    't-not-x': say('t = x²: t aurkitu ondoren, atera erro karratua x lortzeko.', 't = x²: después de hallar t, saca la raíz cuadrada para obtener x.', 't = x²: بعد إيجاد t خذ الجذر التربيعي لتحصل على x.', 't = x²: after finding t, take the square root to get x.'),
    'binomial-sign': say('x − a = 0 bada, x = a; x + a = 0 bada, x = −a.', 'Si x − a = 0, x = a; si x + a = 0, x = −a.', 'إذا كان x − a = 0 فإن x = a؛ وإذا كان x + a = 0 فإن x = −a.', 'If x − a = 0, then x = a; if x + a = 0, then x = −a.'),
    excluded: say('Izendatzailea 0 egiten duen balioa ez da inoiz ebazpena.', 'El valor que anula el denominador nunca es solución.', 'القيمة التي تعدم المقام ليست حلًّا أبدًا.', 'The value that makes the denominator zero is never a solution.'),
    'upside-down': say('Zatikiari ez eman buelta: a/(x − p) = b bada, x − p = a/b.', 'No le des la vuelta a la fracción: si a/(x − p) = b, entonces x − p = a/b.', 'لا تقلب الكسر: إذا كان a/(x − p) = b فإن x − p = a/b.', 'Don\'t turn the fraction upside down: if a/(x − p) = b, then x − p = a/b.'),
    'no-square': say('Erroa kentzeko, bi aldeak karratura jaso.', 'Para quitar la raíz, eleva los dos lados al cuadrado.', 'لإزالة الجذر ربّع الطرفين.', 'To remove the root, square both sides.'),
    'false-solution': say('Egiaztatu: erro batek ezin du negatiboa eman, eta logaritmoak argumentu positiboa behar du.', 'Comprueba: una raíz no puede dar negativo, y el logaritmo necesita un argumento positivo.', 'تحقّق: لا يعطي الجذر عددًا سالبًا، واللوغاريتم يحتاج إلى عدد موجب.', 'Check: a square root cannot be negative, and a logarithm needs a positive argument.'),
    power: say('Idatzi zenbakia oinarriaren berretura gisa eta berdindu berretzaileak.', 'Escribe el número como potencia de la base e iguala los exponentes.', 'اكتب العدد قوةً للأساس وساوِ بين الأسّين.', 'Write the number as a power of the base and set the exponents equal.'),
    'log-times': say('log_b(A) = k bada, A = bᵏ; ez b · k. Eta log A + log B = log(A · B).', 'Si log_b(A) = k, entonces A = bᵏ; no b · k. Y log A + log B = log(A · B).', 'إذا كان log_b(A) = k فإن A = bᵏ لا b · k. وlog A + log B = log(A · B).', 'If log_b(A) = k, then A = bᵏ, not b · k. And log A + log B = log(A · B).'),
    endpoint: say('< eta > zeinuekin muturra ez da sartzen; ≤ eta ≥ zeinuekin bai.', 'Con < y > el extremo no entra; con ≤ y ≥ sí.', 'مع < و> لا يدخل الطرف؛ ومع ≤ و≥ يدخل.', 'With < and >, the endpoint is not included; with ≤ and ≥ it is.'),
    flip: say('Negatibo batez zatitzean, zentzua aldatu.', 'Al dividir entre un negativo, cambia el sentido.', 'عند القسمة على عدد سالب اقلب الاتجاه.', 'When you divide by a negative, the inequality sign flips.'),
    'no-fixed': say('Ez ahaztu zati finkoa: hura ere ordaindu behar da.', 'No olvides la parte fija: también se paga.', 'لا تنسَ الجزء الثابت: يُدفع أيضًا.', 'Don\'t forget the fixed part: you also pay for it.'),
    'round-up': say('«Gehienez» bada, biribildu behera: gora eginez gero, aurrekontua gainditzen da.', 'Si es «como mucho», redondea hacia abajo: hacia arriba te pasas del presupuesto.', 'إذا كان «على الأكثر» فقرّب إلى الأسفل: إلى الأعلى تتجاوز الميزانية.', 'If it says “at most”, round down: rounding up would take you over budget.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
