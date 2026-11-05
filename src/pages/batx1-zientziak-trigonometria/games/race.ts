import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { readTrigonometryAnswer } from '../../dbh4-akademikoak-trigonometria/answers.ts'
import { say } from '../text.ts'
import { HUNT_EQUATIONS, HUNT_VALUES, huntSolutions } from './hunt.ts'

/* ==========================================================================
   Trigonometriaren lasterketa (Batxilergoa 1 · Zientziak): five circuits,
   one per stage — the six ratios (degrees to radians and back, a secant or
   a cosecant with its sign), sums and differences (the sine, the cosine
   and the tangent of a sum from simple ratios), double and half (sen 2α,
   cos 2α and the cosine of the half angle), equations (how many solutions
   sen nx = k has, the largest solution, an equation of second degree) and
   functions (the period as aπ, the amplitude, the height of a Ferris
   wheel). Every answer is a whole number or a simple fraction, and the
   wrong options are the typical mistakes. Formulas write \sen and \tg
   (say of this unit gives each language its names). Every question
   carries `meta`, the numbers the tests check it against.
   ========================================================================== */

export const TRIGONOMETRY_RACE_CIRCUITS = 5

export type TrigonometryRaceError =
    | 'inverted'
    | 'full-turn'
    | 'quarter'
    | 'sign'
    | 'other-reciprocal'
    | 'not-inverted'
    | 'added'
    | 'cosine-sign'
    | 'swapped'
    | 'tangent-denominator'
    | 'double'
    | 'form'
    | 'half-value'
    | 'sine-half'
    | 'no-root'
    | 'one-turn'
    | 'one-each'
    | 'acute'
    | 'cosine-symmetry'
    | 'lost-solution'
    | 'times'
    | 'no-two'
    | 'diameter'
    | 'axis'
    | 'calculation'

export type TrigonometryRaceQuestion = RaceQuestion<TrigonometryRaceError> & { meta: Record<string, number> }

const math = (latex: string) => `$${latex}$`
const same = (latex: string): LocalizedText => say(math(latex), math(latex), math(latex), math(latex))

interface Candidate {
    value: FractionValue
    error: TrigonometryRaceError
}
const whole = (value: number, error: TrigonometryRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const ratio = (p: number, q: number, error: TrigonometryRaceError): Candidate => ({ value: fraction(p, q), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => ({ value: fraction(Math.round(item * 10000), 10000), error: 'calculation' as const }))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<TrigonometryRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: TrigonometryRaceError }> = []
    for (const candidate of [...candidates, ...nearby(right.numerator / right.denominator)]) {
        if (wrong.length === 3) break
        const latex = written(candidate.value)
        if (latex === null || latex === '-0' || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<TrigonometryRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): TrigonometryRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]]
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))
const frac = (top: number, bottom: number) => {
    const divisor = gcd(top, bottom)
    const [p, q] = [top / divisor, bottom / divisor]
    return q === 1 ? `${p}` : `${p < 0 ? '-' : ''}\\frac{${Math.abs(p)}}{${q}}`
}

/* ---------- Circuit 0: the six ratios ---------- */

function toRadiansQuestion(random: Random): TrigonometryRaceQuestion | null {
    const degrees = randomInt(random, 1, 23) * 15
    if (degrees % 90 === 0) return null
    const answer = fraction(degrees, 180)
    const choices = options(random, answer, [ratio(180, degrees, 'inverted'), ratio(degrees, 360, 'full-turn'), ratio(degrees, 90, 'quarter')])
    return choices && build(0, 'to-radians', say(`Pasatu ${degrees}° radianetara: $a\\pi$ ateratzen da. Zenbat da $a$?`, `Pasa ${degrees}° a radianes: sale $a\\pi$. ¿Cuánto vale $a$?`, `حوّل ${degrees}° إلى الراديان فتحصل على $a\\pi$. كم $a$؟`, `Convert ${degrees}° to radians: you get $a\\pi$. What is $a$?`), choices, answer, same(`${degrees}\\cdot\\frac{\\pi}{180}=${frac(degrees, 180)}\\pi`), { degrees })
}

function toDegreesQuestion(random: Random): TrigonometryRaceQuestion | null {
    const m = pick(random, [3, 4, 6, 12])
    const k = randomInt(random, 1, 2 * m - 1)
    if (gcd(k, m) !== 1) return null
    const answer = fraction((180 * k) / m)
    const piece = k === 1 ? `\\frac{\\pi}{${m}}` : `\\frac{${k}\\pi}{${m}}`
    const choices = options(random, answer, [whole((360 * k) / m, 'full-turn'), whole((90 * k) / m, 'quarter'), ratio(180 * m, k, 'inverted')])
    return choices && build(0, 'to-degrees', say(`Zenbat gradu dira $${piece}$ rad?`, `¿Cuántos grados son $${piece}$ rad?`, `كم درجة تساوي $${piece}$ rad؟`, `How many degrees is $${piece}$ rad?`), choices, answer, same(`${piece}=\\frac{${k}\\cdot 180°}{${m}}=${(180 * k) / m}°`), { k, m })
}

function reciprocalQuestion(random: Random): TrigonometryRaceQuestion | null {
    const [p, q, h] = pick(random, TRIPLES)
    const quadrant = pick(random, [2, 3, 4])
    const sinSign = quadrant === 4 || quadrant === 3 ? -1 : 1
    const cosSign = quadrant === 2 || quadrant === 3 ? -1 : 1
    const QUADRANTS: Record<number, LocalizedText> = { 2: say('bigarren', 'segundo', 'الثاني', 'second'), 3: say('hirugarren', 'tercer', 'الثالث', 'third'), 4: say('laugarren', 'cuarto', 'الرابع', 'fourth') }
    const where = QUADRANTS[quadrant]
    if (pick(random, [true, false])) {
        // cos given, sec asked
        const answer = fraction(cosSign * h, q)
        const choices = options(random, answer, [ratio(-cosSign * h, q, 'sign'), ratio(sinSign * h, p, 'other-reciprocal'), ratio(cosSign * q, h, 'not-inverted')])
        return choices && build(0, 'secant', say(`$\\cos\\alpha=${frac(cosSign * q, h)}$ da, eta α ${where.eu} koadrantean dago. Zenbat da $\\sec\\alpha$?`, `$\\cos\\alpha=${frac(cosSign * q, h)}$ y α está en el ${where.es} cuadrante. ¿Cuánto vale $\\sec\\alpha$?`, `$\\cos\\alpha=${frac(cosSign * q, h)}$ وα في الربع ${where.ar}. كم $\\sec\\alpha$؟`, `$\\cos\\alpha=${frac(cosSign * q, h)}$ and α is in the ${where.en} quadrant. What is $\\sec\\alpha$?`), choices, answer, same(`\\sec\\alpha=\\frac{1}{\\cos\\alpha}=${frac(cosSign * h, q)}`), { p, q, h, sign: cosSign })
    }
    const answer = fraction(sinSign * h, p)
    const choices = options(random, answer, [ratio(-sinSign * h, p, 'sign'), ratio(cosSign * h, q, 'other-reciprocal'), ratio(sinSign * p, h, 'not-inverted')])
    return choices && build(0, 'cosecant', say(`$\\sen\\alpha=${frac(sinSign * p, h)}$ da, eta α ${where.eu} koadrantean dago. Zenbat da $\\cosec\\alpha$?`, `$\\sen\\alpha=${frac(sinSign * p, h)}$ y α está en el ${where.es} cuadrante. ¿Cuánto vale $\\cosec\\alpha$?`, `$\\sen\\alpha=${frac(sinSign * p, h)}$ وα في الربع ${where.ar}. كم $\\cosec\\alpha$؟`, `$\\sin\\alpha=${frac(sinSign * p, h)}$ and α is in the ${where.en} quadrant. What is $\\csc\\alpha$?`), choices, answer, same(`\\cosec\\alpha=\\frac{1}{\\sen\\alpha}=${frac(sinSign * h, p)}`), { p, q, h, sign: sinSign })
}

/* ---------- Circuit 1: sums and differences ---------- */

function twoTriples(random: Random) {
    const [p1, q1, h1] = pick(random, TRIPLES)
    const [p2, q2, h2] = pick(random, TRIPLES)
    return { p1, q1, h1, p2, q2, h2 }
}

function sinSumQuestion(random: Random): TrigonometryRaceQuestion | null {
    const { p1, q1, h1, p2, q2, h2 } = twoTriples(random)
    const answer = fraction(p1 * q2 + q1 * p2, h1 * h2)
    const choices = options(random, answer, [ratio(p1 * h2 + p2 * h1, h1 * h2, 'added'), ratio(p1 * q2 - q1 * p2, h1 * h2, 'cosine-sign'), ratio(q1 * q2 - p1 * p2, h1 * h2, 'swapped')])
    return choices && build(1, 'sin-sum', say(`α eta β zorrotzak dira, $\\sen\\alpha=\\frac{${p1}}{${h1}}$ eta $\\sen\\beta=\\frac{${p2}}{${h2}}$. Zenbat da $\\sen(\\alpha+\\beta)$?`, `α y β agudos, $\\sen\\alpha=\\frac{${p1}}{${h1}}$ y $\\sen\\beta=\\frac{${p2}}{${h2}}$. ¿Cuánto vale $\\sen(\\alpha+\\beta)$?`, `α وβ حادتان، $\\sen\\alpha=\\frac{${p1}}{${h1}}$ و$\\sen\\beta=\\frac{${p2}}{${h2}}$. كم $\\sen(\\alpha+\\beta)$؟`, `α and β acute, $\\sin\\alpha=\\frac{${p1}}{${h1}}$ and $\\sin\\beta=\\frac{${p2}}{${h2}}$. What is $\\sin(\\alpha+\\beta)$?`), choices, answer, same(`\\frac{${p1}}{${h1}}\\cdot\\frac{${q2}}{${h2}}+\\frac{${q1}}{${h1}}\\cdot\\frac{${p2}}{${h2}}=${frac(p1 * q2 + q1 * p2, h1 * h2)}`), { p1, q1, h1, p2, q2, h2 })
}

function cosSumQuestion(random: Random): TrigonometryRaceQuestion | null {
    const { p1, q1, h1, p2, q2, h2 } = twoTriples(random)
    const answer = fraction(q1 * q2 - p1 * p2, h1 * h2)
    const choices = options(random, answer, [ratio(q1 * q2 + p1 * p2, h1 * h2, 'cosine-sign'), ratio(q1 * h2 + q2 * h1, h1 * h2, 'added'), ratio(p1 * q2 + q1 * p2, h1 * h2, 'swapped')])
    return choices && build(1, 'cos-sum', say(`α eta β zorrotzak dira, $\\cos\\alpha=\\frac{${q1}}{${h1}}$ eta $\\cos\\beta=\\frac{${q2}}{${h2}}$. Zenbat da $\\cos(\\alpha+\\beta)$?`, `α y β agudos, $\\cos\\alpha=\\frac{${q1}}{${h1}}$ y $\\cos\\beta=\\frac{${q2}}{${h2}}$. ¿Cuánto vale $\\cos(\\alpha+\\beta)$?`, `α وβ حادتان، $\\cos\\alpha=\\frac{${q1}}{${h1}}$ و$\\cos\\beta=\\frac{${q2}}{${h2}}$. كم $\\cos(\\alpha+\\beta)$؟`, `α and β acute, $\\cos\\alpha=\\frac{${q1}}{${h1}}$ and $\\cos\\beta=\\frac{${q2}}{${h2}}$. What is $\\cos(\\alpha+\\beta)$?`), choices, answer, same(`\\frac{${q1 * q2}}{${h1 * h2}}-\\frac{${p1 * p2}}{${h1 * h2}}=${frac(q1 * q2 - p1 * p2, h1 * h2)}`), { p1, q1, h1, p2, q2, h2 })
}

function tanSumQuestion(random: Random): TrigonometryRaceQuestion | null {
    const a = randomInt(random, 2, 6)
    const b = randomInt(random, 1, 5)
    if (a === b) return null
    const answer = fraction(a + b, 1 - a * b)
    const choices = options(random, answer, [ratio(a + b, 1 + a * b, 'tangent-denominator'), whole(a + b, 'added'), ratio(a - b, 1 + a * b, 'swapped')])
    return choices && build(1, 'tan-sum', say(`$\\tg\\alpha=${a}$ eta $\\tg\\beta=${b}$ dira. Zenbat da $\\tg(\\alpha+\\beta)$?`, `$\\tg\\alpha=${a}$ y $\\tg\\beta=${b}$. ¿Cuánto vale $\\tg(\\alpha+\\beta)$?`, `$\\tg\\alpha=${a}$ و$\\tg\\beta=${b}$. كم $\\tg(\\alpha+\\beta)$؟`, `$\\tan\\alpha=${a}$ and $\\tan\\beta=${b}$. What is $\\tan(\\alpha+\\beta)$?`), choices, answer, same(`\\frac{${a}+${b}}{1-${a * b}}=${frac(a + b, 1 - a * b)}`), { a, b })
}

/* ---------- Circuit 2: double and half ---------- */

function sinDoubleQuestion(random: Random): TrigonometryRaceQuestion | null {
    const [p, q, h] = pick(random, TRIPLES)
    const answer = fraction(2 * p * q, h * h)
    const choices = options(random, answer, [ratio(2 * p, h, 'double'), ratio(p * q, h * h, 'no-two'), ratio(2 * q * q - h * h, h * h, 'form')])
    return choices && build(2, 'sin-double', say(`$\\sen\\alpha=\\frac{${p}}{${h}}$ da, eta α zorrotza da. Zenbat da $\\sen 2\\alpha$?`, `$\\sen\\alpha=\\frac{${p}}{${h}}$ y α es agudo. ¿Cuánto vale $\\sen 2\\alpha$?`, `$\\sen\\alpha=\\frac{${p}}{${h}}$ وα حادة. كم $\\sen 2\\alpha$؟`, `$\\sin\\alpha=\\frac{${p}}{${h}}$ and α is acute. What is $\\sin 2\\alpha$?`), choices, answer, same(`2\\cdot\\frac{${p}}{${h}}\\cdot\\frac{${q}}{${h}}=${frac(2 * p * q, h * h)}`), { p, q, h })
}

function cosDoubleQuestion(random: Random): TrigonometryRaceQuestion | null {
    const [p, q, h] = pick(random, TRIPLES)
    const answer = fraction(h * h - 2 * p * p, h * h)
    const choices = options(random, answer, [ratio(2 * q, h, 'double'), ratio(2 * p * p - h * h, h * h, 'form'), ratio(h * h - p * p, h * h, 'no-two')])
    return choices && build(2, 'cos-double', say(`$\\sen\\alpha=\\frac{${p}}{${h}}$ da. Zenbat da $\\cos 2\\alpha$?`, `$\\sen\\alpha=\\frac{${p}}{${h}}$. ¿Cuánto vale $\\cos 2\\alpha$?`, `$\\sen\\alpha=\\frac{${p}}{${h}}$. كم $\\cos 2\\alpha$؟`, `$\\sin\\alpha=\\frac{${p}}{${h}}$. What is $\\cos 2\\alpha$?`), choices, answer, same(`1-2\\cdot\\frac{${p * p}}{${h * h}}=${frac(h * h - 2 * p * p, h * h)}`), { p, q, h })
}

function halfQuestion(random: Random): TrigonometryRaceQuestion | null {
    // cos α = 2t² − 1 with t = q/h, so cos(α/2) = q/h and sen(α/2) = p/h
    const [p, q, h] = pick(random, TRIPLES)
    const top = 2 * q * q - h * h
    if (top <= 0) return null
    const answer = fraction(q, h)
    const choices = options(random, answer, [ratio(top, 2 * h * h, 'half-value'), ratio(p, h, 'sine-half'), ratio(q * q, h * h, 'no-root')])
    return choices && build(2, 'half', say(`$\\cos\\alpha=${frac(top, h * h)}$ da, eta α zorrotza da. Zenbat da $\\cos\\frac{\\alpha}{2}$?`, `$\\cos\\alpha=${frac(top, h * h)}$ y α es agudo. ¿Cuánto vale $\\cos\\frac{\\alpha}{2}$?`, `$\\cos\\alpha=${frac(top, h * h)}$ وα حادة. كم $\\cos\\frac{\\alpha}{2}$؟`, `$\\cos\\alpha=${frac(top, h * h)}$ and α is acute. What is $\\cos\\frac{\\alpha}{2}$?`), choices, answer, same(`\\sqrt{\\frac{1+${frac(top, h * h)}}{2}}=\\frac{${q}}{${h}}`), { p, q, h })
}

/* ---------- Circuit 3: equations ---------- */

const NAME = { sin: '\\sen', cos: '\\cos', tan: '\\tg' } as const

function countQuestion(random: Random): TrigonometryRaceQuestion | null {
    const ratioName = pick(random, ['sin', 'cos'] as const)
    const n = pick(random, [2, 3])
    const notable = pick(random, HUNT_VALUES.filter((value) => Math.abs(value.value) <= 1 && value.angles.sin.length > 0))
    const per = notable.angles[ratioName].length
    const count = huntSolutions(ratioName, n, notable).length
    const answer = fraction(count)
    const choices = options(random, answer, [whole(per, 'one-turn'), whole(n, 'one-each'), whole(count + 2, 'calculation')])
    const term = `${NAME[ratioName]} ${n}x`
    return choices && build(3, 'count', say(`Zenbat soluzio ditu $${term}=${notable.latex}$ ekuazioak 0°-tik 360°-ra?`, `¿Cuántas soluciones tiene $${term}=${notable.latex}$ entre 0° y 360°?`, `كم حلًّا للمعادلة $${term}=${notable.latex}$ بين 0° و360°؟`, `How many solutions does $${term}=${notable.latex}$ have between 0° and 360°?`), choices, answer, same(`${n}\\cdot ${per}=${count}`), { n, count, value: notable.value, cos: ratioName === 'cos' ? 1 : 0 })
}

function largestQuestion(random: Random): TrigonometryRaceQuestion | null {
    const ratioName = pick(random, ['sin', 'cos'] as const)
    const notable = pick(random, HUNT_VALUES.filter((value) => Math.abs(value.value) < 1 && value.value !== 0 && value.angles.sin.length === 2))
    const [first, second] = huntSolutions(ratioName, 1, notable)
    // The acute angle of the first quadrant with that ratio up to the sign: what the calculator gives
    const inHalf = first % 180
    const reference = inHalf > 90 ? 180 - inHalf : inHalf
    const answer = fraction(second)
    const choices = options(random, answer, [whole(first, 'lost-solution'), whole(reference, 'acute'), ...[180 - first, 360 - first, 180 + reference].filter((x) => x > 0 && x < 360).map((x) => whole(x, 'cosine-symmetry'))])
    return choices && build(3, 'largest', say(`Ebatzi $${NAME[ratioName]} x=${notable.latex}$, 0°-tik 360°-ra. Zein da soluzio handiena?`, `Resuelve $${NAME[ratioName]} x=${notable.latex}$ entre 0° y 360°. ¿Cuál es la mayor solución?`, `حُلّ $${NAME[ratioName]} x=${notable.latex}$ بين 0° و360°. ما أكبر حل؟`, `Solve $${NAME[ratioName]} x=${notable.latex}$ between 0° and 360°. What is the largest solution?`), choices, answer, same(`x=${first}°\\qquad x=${second}°`), { value: notable.value, cos: ratioName === 'cos' ? 1 : 0, second })
}

function quadraticQuestion(random: Random): TrigonometryRaceQuestion | null {
    const item = pick(random, HUNT_EQUATIONS)
    const count = item.solutions.length
    const answer = fraction(count)
    const choices = options(random, answer, [whole(count - 1, 'lost-solution'), whole(count + 1, 'calculation'), whole(2, 'one-turn')])
    return choices && build(3, 'quadratic', say(`Zenbat soluzio ditu $${item.equation}$ ekuazioak 0°-tik 360°-ra?`, `¿Cuántas soluciones tiene $${item.equation}$ entre 0° y 360°?`, `كم حلًّا للمعادلة $${item.equation}$ بين 0° و360°؟`, `How many solutions does $${item.equation}$ have between 0° and 360°?`), choices, answer, same(`x=${item.solutions.map((x) => `${x}°`).join(',\\ ')}`), { index: HUNT_EQUATIONS.indexOf(item), count })
}

/* ---------- Circuit 4: functions ---------- */

function periodQuestion(random: Random): TrigonometryRaceQuestion | null {
    const A = randomInt(random, 2, 5)
    const B = pick(random, [2, 3, 4, 5, 6])
    const answer = fraction(2, B)
    const choices = options(random, answer, [whole(2 * B, 'times'), ratio(B, 2, 'inverted'), ratio(1, B, 'no-two')])
    const ratioName = pick(random, ['\\sen', '\\cos'])
    return choices && build(4, 'period', say(`$y=${A}${ratioName} ${B}x$ funtzioaren periodoa $a\\pi$ da. Zenbat da $a$?`, `El periodo de $y=${A}${ratioName} ${B}x$ es $a\\pi$. ¿Cuánto vale $a$?`, `دور الدالة $y=${A}${ratioName} ${B}x$ هو $a\\pi$. كم $a$؟`, `The period of $y=${A}${ratioName} ${B}x$ is $a\\pi$. What is $a$?`), choices, answer, same(`T=\\frac{2\\pi}{${B}}=${frac(2, B)}\\pi`), { A, B })
}

function amplitudeQuestion(random: Random): TrigonometryRaceQuestion | null {
    const A = pick(random, [-5, -4, -3, -2, 2, 3, 4, 5, 6])
    const B = randomInt(random, 2, 4)
    const D = pick(random, [-2, -1, 1, 2, 3])
    const answer = fraction(Math.abs(A))
    const choices = options(random, answer, [whole(A < 0 ? A : 2 * A, A < 0 ? 'sign' : 'diameter'), whole(D, 'axis'), whole(Math.abs(A) + D, 'calculation')])
    const latex = `y=${A}\\sen ${B}x${D < 0 ? '' : '+'}${D}`
    return choices && build(4, 'amplitude', say(`Zer anplitude du $${latex}$ funtzioak?`, `¿Qué amplitud tiene $${latex}$?`, `ما سعة الدالة $${latex}$؟`, `What is the amplitude of $${latex}$?`), choices, answer, same(`|${A}|=${Math.abs(A)}`), { A, D })
}

function ferrisQuestion(random: Random): TrigonometryRaceQuestion | null {
    const A = pick(random, [6, 8, 10, 12, 15, 20])
    const D = A + pick(random, [2, 3, 5])
    const B = pick(random, [6, 9, 10, 12, 15])
    const angle = pick(random, [60, 90, 120, 180])
    if (angle % B !== 0) return null
    const t = angle / B
    const cosine = { 60: 0.5, 90: 0, 120: -0.5, 180: -1 }[angle]!
    const value = D - A * cosine
    if (!Number.isInteger(value)) return null
    const answer = fraction(value)
    const choices = options(random, answer, [whole(D + A * cosine, 'sign'), whole(D - A, 'calculation'), whole(D + A, 'diameter')])
    return choices && build(4, 'ferris', say(`Kabina baten altuera $h(t)=${D}-${A}\\cos(${B}°\\cdot t)$ da, metrotan. Zenbat da $h(${t})$?`, `La altura de una cabina es $h(t)=${D}-${A}\\cos(${B}°\\cdot t)$, en metros. ¿Cuánto vale $h(${t})$?`, `ارتفاع عربة $h(t)=${D}-${A}\\cos(${B}°\\cdot t)$ بالأمتار. كم $h(${t})$؟`, `The height of a cabin is $h(t)=${D}-${A}\\cos(${B}°\\cdot t)$, in metres. What is $h(${t})$?`), choices, answer, same(`${D}-${A}\\cdot\\cos ${angle}°=${value}`), { A, B, D, t })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => TrigonometryRaceQuestion | null>> = [
    [toRadiansQuestion, toDegreesQuestion, reciprocalQuestion],
    [sinSumQuestion, cosSumQuestion, tanSumQuestion],
    [sinDoubleQuestion, cosDoubleQuestion, halfQuestion],
    [countQuestion, largestQuestion, quadraticQuestion],
    [periodQuestion, amplitudeQuestion, ferrisQuestion]
]

export function generateTrigonometryRaceQuestion(random: Random, circuit: number, tier: Tier): TrigonometryRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkTrigonometryPitAnswer(question: RaceQuestion<TrigonometryRaceError>, input: string): AnswerCheck {
    return checkAnswer(readTrigonometryAnswer(input), question.answer, question.answerForm)
}

export function trigonometryParTime(circuit: number): number {
    return parTimeFor([11, 13, 13, 12, 11][circuit] ?? 12)
}

export const trigonometryRaceErrorTips: Record<TrigonometryRaceError, LocalizedText> = {
    inverted: say('Zatiketa alderantziz egin duzu: radianetara, bider π/180; gradutara, bider 180/π.', 'Has dividido al revés: a radianes, por π/180; a grados, por 180/π.', 'قسمت بالعكس: إلى الراديان في π/180، وإلى الدرجات في 180/π.', 'You divided the wrong way round: to radians, times π/180; to degrees, times 180/π.'),
    'full-turn': say('π radian bira erdia da, 180°, ez bira osoa.', 'π radianes es media vuelta, 180°, no una vuelta entera.', 'π راديان نصف دورة، أي 180°، لا دورة كاملة.', 'π radians is half a turn, 180°, not a full turn.'),
    quarter: say('π radian 180° da, ez 90°.', 'π radianes son 180°, no 90°.', 'π راديان تساوي 180° لا 90°.', 'π radians is 180°, not 90°.'),
    sign: say('Begiratu koadranteari: zeinua hark ematen du.', 'Mira el cuadrante: él da el signo.', 'انظر إلى الربع: هو يعطي الإشارة.', 'Look at the quadrant: it gives the sign.'),
    'other-reciprocal': say('Sekantea kosinuarena da, eta kosekantea sinuarena.', 'La secante va con el coseno y la cosecante, con el seno.', 'القاطع مع جيب التمام، وقاطع التمام مع الجيب.', 'The secant goes with the cosine and the cosecant with the sine.'),
    'not-inverted': say('Arrazoi alderantzizkoa 1 zati arrazoia da.', 'La razón inversa es 1 entre la razón.', 'النسبة المقلوبة هي 1 على النسبة.', 'The reciprocal ratio is 1 divided by the ratio.'),
    added: say('Batuketaren arrazoia ez da arrazoien batuketa.', 'La razón de una suma no es la suma de las razones.', 'نسبة المجموع ليست مجموع النسب.', 'The ratio of a sum is not the sum of the ratios.'),
    'cosine-sign': say('sin(α + β): zeinu bera; cos(α + β): kontrako zeinua.', 'sen(α + β): mismo signo; cos(α + β): signo contrario.', 'sin(α + β): الإشارة نفسها؛ cos(α + β): الإشارة المعاكسة.', 'sin(α + β): same sign; cos(α + β): opposite sign.'),
    swapped: say('Sinuaren eta kosinuaren formulak trukatu dituzu.', 'Has cambiado la fórmula del seno por la del coseno.', 'بدّلت صيغة الجيب بصيغة جيب التمام.', 'You swapped the sine formula for the cosine one.'),
    'tangent-denominator': say('Tangentearen izendatzailea 1 − tg α · tg β da.', 'El denominador de la tangente es 1 − tg α · tg β.', 'مقام الظل هو 1 − tan α · tan β.', 'The denominator of the tangent is 1 − tan α · tan β.'),
    double: say('Angelu bikoitzaren arrazoia ez da arrazoiaren bikoitza.', 'La razón del ángulo doble no es el doble de la razón.', 'نسبة ضعف الزاوية ليست ضعف النسبة.', 'The ratio of the double angle is not double the ratio.'),
    form: say('Sinuarekin, cos 2α = 1 − 2 sin² α.', 'Con el seno, cos 2α = 1 − 2 sen² α.', 'مع الجيب cos 2α = 1 − 2 sin² α.', 'With the sine, cos 2α = 1 − 2 sin² α.'),
    'half-value': say('Angelu erdiaren kosinua ez da kosinuaren erdia: erroa behar da.', 'El coseno del ángulo mitad no es la mitad del coseno: hace falta la raíz.', 'جيب تمام نصف الزاوية ليس نصف جيب التمام: يلزم الجذر.', 'The cosine of the half angle is not half the cosine: you need the root.'),
    'sine-half': say('Hori angelu erdiaren sinua da: kosinuak 1 + darama.', 'Ese es el seno del ángulo mitad: el coseno lleva 1 +.', 'هذا جيب نصف الزاوية: جيب التمام فيه 1 +.', 'That is the sine of the half angle: the cosine has 1 +.'),
    'no-root': say('Ez ahaztu erro karratua.', 'No olvides la raíz cuadrada.', 'لا تنسَ الجذر التربيعي.', 'Do not forget the square root.'),
    'one-turn': say('nx angeluak n bira ematen ditu: soluzioak biderkatu egiten dira.', 'El ángulo nx da n vueltas: las soluciones se multiplican.', 'الزاوية nx تدور n دورات: تتضاعف الحلول.', 'The angle nx makes n turns: the solutions multiply.'),
    'one-each': say('Bira bakoitzean bi soluzio daude, ez bat.', 'En cada vuelta hay dos soluciones, no una.', 'في كل دورة حلان لا حل واحد.', 'Each turn has two solutions, not one.'),
    acute: say('Kalkulagailuak angelu zorrotza ematen du; begiratu zeinuaren koadranteari.', 'La calculadora da el ángulo agudo; mira el cuadrante del signo.', 'تعطي الآلة الحاسبة الزاوية الحادة؛ انظر إلى ربع الإشارة.', 'The calculator gives the acute angle; look at the quadrant of the sign.'),
    'cosine-symmetry': say('Sinu bera: α eta 180° − α; kosinu bera: α eta 360° − α.', 'Mismo seno: α y 180° − α; mismo coseno: α y 360° − α.', 'الجيب نفسه: α و180° − α؛ جيب التمام نفسه: α و360° − α.', 'Same sine: α and 180° − α; same cosine: α and 360° − α.'),
    'lost-solution': say('Soluzio bat falta zaizu: begiratu bira osoari.', 'Te falta una solución: mira toda la vuelta.', 'ينقصك حل: انظر إلى الدورة كلها.', 'A solution is missing: look at the whole turn.'),
    times: say('Periodoa 2π zati B da, ez bider B.', 'El periodo es 2π entre B, no por B.', 'الدور 2π على B لا في B.', 'The period is 2π divided by B, not times B.'),
    'no-two': say('Periodoa 2π / B da: ez ahaztu 2.', 'El periodo es 2π / B: no olvides el 2.', 'الدور 2π / B: لا تنسَ 2.', 'The period is 2π / B: do not forget the 2.'),
    diameter: say('Anplitudea erdia da: |A|, ez 2|A|.', 'La amplitud es la mitad: |A|, no 2|A|.', 'السعة هي النصف: |A| لا 2|A|.', 'The amplitude is half: |A|, not 2|A|.'),
    axis: say('D ardatza da, ez anplitudea.', 'D es el eje, no la amplitud.', 'D هو المحور لا السعة.', 'D is the axis, not the amplitude.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
