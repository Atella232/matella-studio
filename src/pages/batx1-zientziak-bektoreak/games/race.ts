import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'

/* ==========================================================================
   Bektoreen lasterketa (Batxilergoa 1 · Zientziak): five circuits, one per
   stage — vectors (a coordinate of AB, the magnitude of AB, a coordinate
   of 2u − 3v), bases (k for parallel vectors, a coefficient of a linear
   combination, a coordinate back from a basis), the dot product (with
   the angle, in a regular polygon, |u + v|²), with coordinates (the dot
   product, k for perpendicular vectors, the angle in degrees) and
   applications (the length of a projection, the work of a force, a
   resultant). The wrong options are the typical mistakes. Every question
   carries `meta`, the numbers the tests check it against.
   ========================================================================== */

export const BACH_VECTORS_RACE_CIRCUITS = 5

export type BachVectorsRaceError =
    | 'reversed'
    | 'sum-not-root'
    | 'one-coordinate'
    | 'cross-ratio'
    | 'coordinates-copied'
    | 'base-mixed'
    | 'cos-forgotten'
    | 'inner-angle'
    | 'two-forgotten'
    | 'crossed-product'
    | 'sign'
    | 'acute-taken'
    | 'wrong-modulus'
    | 'magnitudes-added'
    | 'calculation'

export type BachVectorsRaceQuestion = RaceQuestion<BachVectorsRaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex.replace(/\{,\}/g, '.')}$` })
const math = (latex: string) => `$${latex}$`
const wrap = (value: number) => (value < 0 ? `(${value})` : String(value))
const pair = ([x, y]: [number, number]) => `(${x},${y})`

interface Candidate {
    value: FractionValue
    error: BachVectorsRaceError
}
const whole = (value: number, error: BachVectorsRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const ratio = (p: number, q: number, error: BachVectorsRaceError): Candidate => ({ value: fraction(p, q), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => ({ value: fraction(Math.round(item * 10000), 10000), error: 'calculation' as const }))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<BachVectorsRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: BachVectorsRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<BachVectorsRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): BachVectorsRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

/** A formula followed by a question */
const ask = (formula: string, what: LocalizedText) => say(`${math(formula)}. ${what.eu}`, `${math(formula)}. ${what.es}`, `${math(formula)}. ${what.ar}`, `${math(formula)}. ${what.en}`)
const FIRST = say('Zein da lehen koordenatua?', '¿Cuál es la primera coordenada?', 'ما المركّبة الأولى؟', 'What is the first coordinate?')
const SECOND = say('Zein da bigarren koordenatua?', '¿Cuál es la segunda coordenada?', 'ما المركّبة الثانية؟', 'What is the second coordinate?')
const ANGLE = say('Zenbat gradu?', '¿Cuántos grados?', 'كم درجة؟', 'How many degrees?')
const VALUE = say('Zenbat da?', '¿Cuánto vale?', 'كم يساوي؟', 'What is it?')

/** Vectors with a whole magnitude */
const PYTHAGOREAN: Array<[number, number]> = [[3, 4], [4, 3], [6, 8], [8, 6], [5, 12], [12, 5], [0, 5], [5, 0]]
const withSigns = (random: Random, [x, y]: [number, number]): [number, number] => [x * pick(random, [1, -1]), y * pick(random, [1, -1])]

/* ---------- 1. Vectors and operations ---------- */

/** A(a1, a2), B(b1, b2): a coordinate of AB; the mistake is A − B */
function abQuestion(random: Random): BachVectorsRaceQuestion | null {
    const a: [number, number] = [randomInt(random, -5, 5), randomInt(random, -5, 5)]
    const b: [number, number] = [randomInt(random, -5, 5), randomInt(random, -5, 5)]
    const index = pick(random, [0, 1])
    const value = b[index] - a[index]
    if (value === 0 || a[index] === 0 || b[index] === 0) return null
    const answer = fraction(value)
    const choices = options(random, answer, [whole(-value, 'reversed'), whole(a[index] + b[index], 'calculation'), whole(b[1 - index] - a[1 - index], 'calculation')])
    const prompt = ask(`A${pair(a)},\\ B${pair(b)},\\ \\overrightarrow{AB}`, index === 0 ? FIRST : SECOND)
    return choices && build(0, 'ab', prompt, choices, answer, same(`${b[index]}-${wrap(a[index])}=${value}`), { a1: a[0], a2: a[1], b1: b[0], b2: b[1], index })
}

/** |(x, y)| with a Pythagorean pair: the mistake is x + y */
function modulusQuestion(random: Random): BachVectorsRaceQuestion | null {
    const [x, y] = withSigns(random, pick(random, PYTHAGOREAN))
    const length = Math.sqrt(x * x + y * y)
    const answer = fraction(length)
    const choices = options(random, answer, [whole(Math.abs(x) + Math.abs(y), 'sum-not-root'), whole(x * x + y * y, 'sum-not-root'), whole(x + y, 'calculation')])
    return choices && build(0, 'modulus', ask(`|${pair([x, y])}|`, VALUE), choices, answer, same(`\\sqrt{${x * x}+${y * y}}=${length}`), { x, y })
}

/** A coordinate of a·u − b·v: the mistake is multiplying one coordinate only */
function combinationQuestion(random: Random): BachVectorsRaceQuestion | null {
    const u: [number, number] = [randomInt(random, -4, 4), randomInt(random, -4, 4)]
    const v: [number, number] = [randomInt(random, -4, 4), randomInt(random, -4, 4)]
    const a = randomInt(random, 2, 3)
    const b = randomInt(random, 2, 3)
    const index = pick(random, [0, 1])
    const value = a * u[index] - b * v[index]
    if (u[index] === 0 || v[index] === 0) return null
    const answer = fraction(value)
    const choices = options(random, answer, [whole(u[index] - v[index], 'one-coordinate'), whole(a * u[index] + b * v[index], 'sign'), whole(a * u[index] - v[index], 'one-coordinate')])
    const prompt = ask(`\\vec{u}=${pair(u)},\\ \\vec{v}=${pair(v)},\\ ${a}\\vec{u}-${b}\\vec{v}`, index === 0 ? FIRST : SECOND)
    return choices && build(0, 'combination', prompt, choices, answer, same(`${a}\\cdot ${wrap(u[index])}-${b}\\cdot ${wrap(v[index])}=${value}`), { u1: u[0], u2: u[1], v1: v[0], v2: v[1], a, b, index })
}

/* ---------- 2. Linear combinations and bases ---------- */

/** (a, k) parallel to (c, d): a·d = k·c; the mistake is the ratio upside down */
function parallelQuestion(random: Random): BachVectorsRaceQuestion | null {
    const c = pick(random, [-4, -3, -2, -1, 1, 2, 3, 4])
    const d = randomInt(random, -6, 6)
    const a = pick(random, [-6, -4, -3, -2, 2, 3, 4, 6])
    if (d === 0 || (a * d) % c !== 0) return null
    const k = (a * d) / c
    if (k === 0 || Math.abs(k) > 12) return null
    const answer = fraction(k)
    const choices = options(random, answer, [ratio(c * d, a, 'cross-ratio'), whole(-k, 'sign'), whole(d, 'calculation')])
    const prompt = say(`$(${a},k)\\parallel(${c},${d})$. Zein da $k$?`, `$(${a},k)\\parallel(${c},${d})$. ¿Cuánto vale $k$?`, `$(${a},k)\\parallel(${c},${d})$. كم يساوي $k$؟`, `$(${a},k)\\parallel(${c},${d})$. What is $k$?`)
    return choices && build(1, 'parallel', prompt, choices, answer, same(`${a}\\cdot ${wrap(d)}=k\\cdot ${wrap(c)}\\ \\to\\ k=${k}`), { a, c, d })
}

/** w = a·u + b·v with u, v independent: a or b; the mistake is copying a coordinate of w */
function coefficientQuestion(random: Random): BachVectorsRaceQuestion | null {
    const u: [number, number] = [randomInt(random, -3, 3), randomInt(random, -3, 3)]
    const v: [number, number] = [randomInt(random, -3, 3), randomInt(random, -3, 3)]
    if (u[0] * v[1] - u[1] * v[0] === 0) return null
    const a = pick(random, [-3, -2, -1, 1, 2, 3])
    const b = pick(random, [-3, -2, -1, 1, 2, 3])
    const w: [number, number] = [a * u[0] + b * v[0], a * u[1] + b * v[1]]
    const first = pick(random, [true, false])
    const value = first ? a : b
    const answer = fraction(value)
    const choices = options(random, answer, [whole(first ? w[0] : w[1], 'coordinates-copied'), whole(first ? b : a, 'base-mixed'), whole(-value, 'sign')])
    const letter = first ? 'a' : 'b'
    const prompt = say(`$${pair(w)}=a${pair(u)}+b${pair(v)}$. Zein da $${letter}$?`, `$${pair(w)}=a${pair(u)}+b${pair(v)}$. ¿Cuánto vale $${letter}$?`, `$${pair(w)}=a${pair(u)}+b${pair(v)}$. كم يساوي $${letter}$؟`, `$${pair(w)}=a${pair(u)}+b${pair(v)}$. What is $${letter}$?`)
    return choices && build(1, 'coefficient', prompt, choices, answer, same(`a=${a},\\ b=${b}`), { u1: u[0], u2: u[1], v1: v[0], v2: v[1], w1: w[0], w2: w[1], first: first ? 1 : 0 })
}

/** w = (a, b)_B with B = (u, v): a coordinate of w in the standard basis; the mistake is a·u₁ + b·u₂ */
function canonicalQuestion(random: Random): BachVectorsRaceQuestion | null {
    const u: [number, number] = [randomInt(random, -3, 3), randomInt(random, -3, 3)]
    const v: [number, number] = [randomInt(random, -3, 3), randomInt(random, -3, 3)]
    if (u[0] * v[1] - u[1] * v[0] === 0) return null
    const a = pick(random, [-2, -1, 2, 3])
    const b = pick(random, [-2, -1, 2, 3])
    const index = pick(random, [0, 1])
    const value = a * u[index] + b * v[index]
    const answer = fraction(value)
    const choices = options(random, answer, [whole(a * u[0] + b * u[1], 'base-mixed'), whole(index === 0 ? a : b, 'coordinates-copied'), whole(a * u[index] - b * v[index], 'sign')])
    const prompt = ask(`B=(${pair(u)},${pair(v)}),\\ \\vec{w}=(${a},${b})_B`, index === 0 ? FIRST : SECOND)
    return choices && build(1, 'canonical', prompt, choices, answer, same(`${a}\\cdot ${wrap(u[index])}+${wrap(b)}\\cdot ${wrap(v[index])}=${value}`), { u1: u[0], u2: u[1], v1: v[0], v2: v[1], a, b, index })
}

/* ---------- 3. The dot product ---------- */

const NICE_COS: Record<number, [number, number]> = { 0: [1, 1], 60: [1, 2], 90: [0, 1], 120: [-1, 2], 180: [-1, 1] }

/** |u|·|v|·cos α with α = 0, 60, 90, 120 or 180: the mistake is forgetting the cosine */
function angleProductQuestion(random: Random): BachVectorsRaceQuestion | null {
    const p = randomInt(random, 2, 8)
    const q = randomInt(random, 2, 8)
    const angle = pick(random, [0, 60, 120, 180])
    const [n, d] = NICE_COS[angle]
    const answer = fraction(p * q * n, d)
    const choices = options(random, answer, [whole(p * q, 'cos-forgotten'), ratio(-p * q * n, d, 'sign'), ratio(p * q, 2, 'calculation')])
    const prompt = ask(`|\\vec{u}|=${p},\\ |\\vec{v}|=${q},\\ \\alpha=${angle}^\\circ,\\ \\vec{u}\\cdot\\vec{v}`, VALUE)
    return choices && build(2, 'angle-product', prompt, choices, answer, same(`${p}\\cdot ${q}\\cdot\\cos ${angle}^\\circ=${written(answer)}`), { p, q, angle })
}

/** AB · BC in an equilateral triangle or a square of side s: the mistake is the inner angle */
function polygonQuestion(random: Random): BachVectorsRaceQuestion | null {
    const s = randomInt(random, 2, 6)
    const triangle = pick(random, [true, false])
    const answer = triangle ? fraction(-s * s, 2) : fraction(-s * s)
    const shape = triangle
        ? say(`Alde ${s} duen $ABC$ triangelu aldeberdina. Zenbat da $\\overrightarrow{AB}\\cdot\\overrightarrow{BC}$?`, `Triángulo equilátero $ABC$ de lado ${s}. ¿Cuánto vale $\\overrightarrow{AB}\\cdot\\overrightarrow{BC}$?`, `مثلث متساوي الأضلاع $ABC$ طول ضلعه ${s}. كم يساوي $\\overrightarrow{AB}\\cdot\\overrightarrow{BC}$؟`, `Equilateral triangle $ABC$ with side ${s}. What is $\\overrightarrow{AB}\\cdot\\overrightarrow{BC}$?`)
        : say(`Alde ${s} duen $ABCD$ karratua. Zenbat da $\\overrightarrow{AB}\\cdot\\overrightarrow{CD}$?`, `Cuadrado $ABCD$ de lado ${s}. ¿Cuánto vale $\\overrightarrow{AB}\\cdot\\overrightarrow{CD}$?`, `مربع $ABCD$ طول ضلعه ${s}. كم يساوي $\\overrightarrow{AB}\\cdot\\overrightarrow{CD}$؟`, `Square $ABCD$ with side ${s}. What is $\\overrightarrow{AB}\\cdot\\overrightarrow{CD}$?`)
    const choices = options(random, answer, triangle
        ? [ratio(s * s, 2, 'inner-angle'), whole(s * s, 'cos-forgotten'), whole(-s * s, 'calculation')]
        : [whole(s * s, 'inner-angle'), whole(0, 'calculation'), whole(2 * s, 'calculation')])
    const solution = triangle ? same(`${s}\\cdot ${s}\\cdot\\cos 120^\\circ=${written(answer)}`) : same(`${s}\\cdot ${s}\\cdot\\cos 180^\\circ=${written(answer)}`)
    return choices && build(2, 'polygon', shape, choices, answer, solution, { s, triangle: triangle ? 1 : 0 })
}

/** |u + v|² from |u|, |v| and u · v: the mistake is leaving out 2u · v */
function squareSumQuestion(random: Random): BachVectorsRaceQuestion | null {
    const p = randomInt(random, 1, 6)
    const q = randomInt(random, 1, 6)
    const k = randomInt(random, -6, 8)
    const value = p * p + 2 * k + q * q
    if (value <= 0 || k === 0) return null
    const answer = fraction(value)
    const choices = options(random, answer, [whole(p * p + q * q, 'two-forgotten'), whole(p * p + k + q * q, 'two-forgotten'), whole((p + q) ** 2, 'magnitudes-added')])
    const prompt = ask(`|\\vec{u}|=${p},\\ |\\vec{v}|=${q},\\ \\vec{u}\\cdot\\vec{v}=${k},\\ |\\vec{u}+\\vec{v}|^2`, VALUE)
    return choices && build(2, 'square-sum', prompt, choices, answer, same(`${p * p}+2\\cdot ${wrap(k)}+${q * q}=${value}`), { p, q, k })
}

/* ---------- 4. The dot product with coordinates ---------- */

/** u₁v₁ + u₂v₂: the mistake is the crossed product */
function dotQuestion(random: Random): BachVectorsRaceQuestion | null {
    const u: [number, number] = [randomInt(random, -6, 6), randomInt(random, -6, 6)]
    const v: [number, number] = [randomInt(random, -6, 6), randomInt(random, -6, 6)]
    if (u.includes(0) || v.includes(0)) return null
    const value = u[0] * v[0] + u[1] * v[1]
    const answer = fraction(value)
    const choices = options(random, answer, [whole(u[0] * v[1] + u[1] * v[0], 'crossed-product'), whole(u[0] * v[0] - u[1] * v[1], 'sign'), whole(u[0] + v[0] + u[1] + v[1], 'calculation')])
    return choices && build(3, 'dot', ask(`${pair(u)}\\cdot ${pair(v)}`, VALUE), choices, answer, same(`${u[0]}\\cdot ${wrap(v[0])}+${wrap(u[1])}\\cdot ${wrap(v[1])}=${value}`), { u1: u[0], u2: u[1], v1: v[0], v2: v[1] })
}

/** (k, a) ⟂ (c, d): k·c + a·d = 0 */
function perpendicularQuestion(random: Random): BachVectorsRaceQuestion | null {
    const c = pick(random, [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5])
    const a = randomInt(random, -6, 6)
    const d = randomInt(random, -6, 6)
    if (a === 0 || d === 0 || (a * d) % c !== 0) return null
    const k = -(a * d) / c
    if (k === 0 || Math.abs(k) > 15) return null
    const answer = fraction(k)
    const choices = options(random, answer, [whole(-k, 'sign'), ratio(a * c, d, 'cross-ratio'), whole(a * d, 'calculation')])
    const prompt = say(`$(k,${a})\\perp(${c},${d})$. Zein da $k$?`, `$(k,${a})\\perp(${c},${d})$. ¿Cuánto vale $k$?`, `$(k,${a})\\perp(${c},${d})$. كم يساوي $k$؟`, `$(k,${a})\\perp(${c},${d})$. What is $k$?`)
    return choices && build(3, 'perpendicular', prompt, choices, answer, same(`${wrap(c)}k+${wrap(a)}\\cdot ${wrap(d)}=0\\ \\to\\ k=${k}`), { a, c, d })
}

/** The angle of two vectors, 45°, 90°, 135° or 180°: the mistake is taking the acute angle */
function angleQuestion(random: Random): BachVectorsRaceQuestion | null {
    const angle = pick(random, [45, 90, 135, 180])
    const [d1, d2] = pick(random, [[1, 0], [0, 1], [-1, 0], [0, -1]] as Array<[number, number]>)
    const side = pick(random, [1, -1])
    // v is d turned by ±angle, before scaling: 45° gives d ± its perpendicular, 135° the opposite of the other one
    const turned: Record<number, [number, number]> = {
        45: [d1 - side * d2, side * d1 + d2],
        90: [-side * d2, side * d1],
        135: [-d1 - side * d2, side * d1 - d2],
        180: [-d1, -d2]
    }
    const s = randomInt(random, 1, 3)
    const t = randomInt(random, 1, 2)
    const u: [number, number] = [s * d1, s * d2]
    const v: [number, number] = [t * turned[angle][0], t * turned[angle][1]]
    const answer = fraction(angle)
    const choices = options(random, answer, [whole(180 - angle === angle ? 0 : 180 - angle, 'acute-taken'), whole(angle === 90 ? 0 : 90, 'calculation'), whole(angle === 45 ? 60 : 45, 'calculation')])
    return choices && build(3, 'angle', ask(`${pair(u)},\\ ${pair(v)}`, ANGLE), choices, answer, same(`\\cos\\alpha=\\frac{${u[0] * v[0] + u[1] * v[1]}}{|\\vec{u}|\\,|\\vec{v}|}\\ \\to\\ ${angle}^\\circ`), { u1: u[0], u2: u[1], v1: v[0], v2: v[1] })
}

/* ---------- 5. Projections and applications ---------- */

/** The projection of u on v, with |v| whole: the mistake is dividing by |u| */
function projectionQuestion(random: Random): BachVectorsRaceQuestion | null {
    const v = withSigns(random, pick(random, PYTHAGOREAN.filter(([x, y]) => x * y !== 0 && x < 7 && y < 7)))
    const u: [number, number] = [randomInt(random, -6, 6), randomInt(random, -6, 6)]
    const dot = u[0] * v[0] + u[1] * v[1]
    const length = Math.sqrt(v[0] ** 2 + v[1] ** 2)
    if (dot === 0 || u.includes(0)) return null
    const answer = fraction(dot, length)
    const uLength = Math.sqrt(u[0] ** 2 + u[1] ** 2)
    const choices = options(random, answer, [whole(dot, 'wrong-modulus'), ...(Number.isInteger(uLength) ? [ratio(dot, uLength, 'wrong-modulus')] : []), ratio(-dot, length, 'sign'), ratio(dot, length * length, 'wrong-modulus')])
    const prompt = say(`Zenbat neurtzen du (zeinuarekin) $${pair(u)}$ bektorearen proiekzioak $${pair(v)}$ bektorearen gainean?`, `¿Cuánto mide (con signo) la proyección de $${pair(u)}$ sobre $${pair(v)}$?`, `كم طول إسقاط $${pair(u)}$ على $${pair(v)}$ بإشارته؟`, `What is the signed length of the projection of $${pair(u)}$ onto $${pair(v)}$?`)
    return choices && build(4, 'projection', prompt, choices, answer, same(`\\frac{${dot}}{${length}}=${written(answer)}`), { u1: u[0], u2: u[1], v1: v[0], v2: v[1] })
}

/** W = F · d with coordinates */
function workQuestion(random: Random): BachVectorsRaceQuestion | null {
    const f: [number, number] = [randomInt(random, -8, 10), randomInt(random, -8, 10)]
    const d: [number, number] = [randomInt(random, -6, 8), randomInt(random, -6, 8)]
    if (f.includes(0) || d.includes(0)) return null
    const value = f[0] * d[0] + f[1] * d[1]
    const answer = fraction(value)
    const choices = options(random, answer, [whole(f[0] * d[1] + f[1] * d[0], 'crossed-product'), whole(f[0] * d[0] - f[1] * d[1], 'sign'), whole(f[0] * d[0], 'calculation')])
    const prompt = say(`$\\vec{F}=${pair(f)}$ N eta $\\vec{d}=${pair(d)}$ m. Zenbat joule da lana?`, `$\\vec{F}=${pair(f)}$ N y $\\vec{d}=${pair(d)}$ m. ¿Cuántos julios de trabajo?`, `$\\vec{F}=${pair(f)}$ N و$\\vec{d}=${pair(d)}$ m. كم جولًا من الشغل؟`, `$\\vec{F}=${pair(f)}$ N and $\\vec{d}=${pair(d)}$ m. How many joules of work?`)
    return choices && build(4, 'work', prompt, choices, answer, same(`W=${f[0]}\\cdot ${wrap(d[0])}+${wrap(f[1])}\\cdot ${wrap(d[1])}=${value}`), { f1: f[0], f2: f[1], d1: d[0], d2: d[1] })
}

/** Two perpendicular forces: the resultant by Pythagoras; the mistake is adding the magnitudes */
function resultantQuestion(random: Random): BachVectorsRaceQuestion | null {
    const [p, q] = pick(random, [[3, 4], [6, 8], [5, 12], [9, 12], [8, 15], [12, 16]] as Array<[number, number]>)
    const value = Math.sqrt(p * p + q * q)
    const answer = fraction(value)
    const choices = options(random, answer, [whole(p + q, 'magnitudes-added'), whole(q - p, 'calculation'), whole(p * p + q * q, 'sum-not-root')])
    const prompt = say(`$${p}$ N eta $${q}$ N indarrek angelu zuzena osatzen dute. Zenbat newton da erresultantea?`, `Dos fuerzas de $${p}$ N y $${q}$ N forman un ángulo recto. ¿Cuántos newtons mide la resultante?`, `قوتان $${p}$ N و$${q}$ N متعامدتان. كم نيوتن طول المحصلة؟`, `Forces of $${p}$ N and $${q}$ N make a right angle. How many newtons is the resultant?`)
    return choices && build(4, 'resultant', prompt, choices, answer, same(`\\sqrt{${p * p}+${q * q}}=${value}`), { p, q })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => BachVectorsRaceQuestion | null>> = [
    [abQuestion, modulusQuestion, combinationQuestion],
    [parallelQuestion, coefficientQuestion, canonicalQuestion],
    [angleProductQuestion, polygonQuestion, squareSumQuestion],
    [dotQuestion, perpendicularQuestion, angleQuestion],
    [projectionQuestion, workQuestion, resultantQuestion]
]

export function generateBachVectorsRaceQuestion(random: Random, circuit: number, tier: Tier): BachVectorsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkBachVectorsPitAnswer(question: RaceQuestion<BachVectorsRaceError>, input: string): AnswerCheck {
    return checkAnswer(input.replace(/[°º]/g, ''), question.answer, question.answerForm)
}

export function bachVectorsParTime(circuit: number): number {
    return parTimeFor([12, 13, 13, 12, 13][circuit] ?? 13)
}

export const bachVectorsRaceErrorTips: Record<BachVectorsRaceError, LocalizedText> = {
    reversed: say('Muturra ken jatorria: B − A, ez A − B.', 'Extremo menos origen: B − A, no A − B.', 'الطرف ناقص الأصل: B − A لا A − B.', 'End point minus start point: B − A, not A − B.'),
    'sum-not-root': say('Modulua: koordenatuen karratuak batu eta erroa atera.', 'Módulo: suma los cuadrados de las coordenadas y saca la raíz.', 'الطول: اجمع مربعي المركّبتين وخذ الجذر.', 'Magnitude: add the squares of the coordinates and take the root.'),
    'one-coordinate': say('Zenbakiak bi koordenatuak biderkatzen ditu.', 'El número multiplica las dos coordenadas.', 'العدد يضرب المركّبتين معًا.', 'The number multiplies both coordinates.'),
    'cross-ratio': say('Paraleloak: a · d = b · c; perpendikularrak: a · c + b · d = 0. Begiratu ordena.', 'Paralelos: a · d = b · c; perpendiculares: a · c + b · d = 0. Mira el orden.', 'التوازي: a · d = b · c؛ التعامد: a · c + b · d = 0. انتبه للترتيب.', 'Parallel: a · d = b · c; perpendicular: a · c + b · d = 0. Watch the order.'),
    'coordinates-copied': say('Oinarri bateko koordenatuak ez dira bektorearen koordenatuak: ebatzi sistema.', 'Las coordenadas en una base no son las del vector: resuelve el sistema.', 'المركّبات في أساس ليست مركّبات المتجه: حُلّ النظام.', 'Coordinates in a basis are not the vector\'s coordinates: solve the system.'),
    'base-mixed': say('a bider u osoa, gehi b bider v osoa: ez nahastu koordenatuak.', 'a por todo u, más b por todo v: no mezcles coordenadas.', 'a في u كله زائد b في v كله: لا تخلط المركّبات.', 'a times all of u, plus b times all of v: do not mix coordinates.'),
    'cos-forgotten': say('Biderkadura eskalarrak kosinua du: |u| |v| cos α.', 'El producto escalar lleva el coseno: |u| |v| cos α.', 'الجداء السلمي فيه جيب التمام: |u| |v| cos α.', 'The dot product has the cosine: |u| |v| cos α.'),
    'inner-angle': say('Jarri bi bektoreak puntu beretik: kanpoko angelua da.', 'Pon los dos vectores desde el mismo punto: es el ángulo exterior.', 'ضع المتجهين من النقطة نفسها: إنها الزاوية الخارجية.', 'Put both vectors at the same point: it is the outer angle.'),
    'two-forgotten': say('|u + v|² = |u|² + 2u · v + |v|²: ez ahaztu 2u · v.', '|u + v|² = |u|² + 2u · v + |v|²: no olvides 2u · v.', '|u + v|² = |u|² + 2u · v + |v|²: لا تنسَ 2u · v.', '|u + v|² = |u|² + 2u · v + |v|²: do not forget 2u · v.'),
    'crossed-product': say('Lehenak elkarrekin eta bigarrenak elkarrekin: u₁v₁ + u₂v₂.', 'Primeras con primeras y segundas con segundas: u₁v₁ + u₂v₂.', 'الأولى مع الأولى والثانية مع الثانية: u₁v₁ + u₂v₂.', 'Firsts with firsts and seconds with seconds: u₁v₁ + u₂v₂.'),
    sign: say('Kontuz zeinuarekin.', 'Cuidado con el signo.', 'انتبه للإشارة.', 'Watch the sign.'),
    'acute-taken': say('Kosinu negatiboa: angelua kamutsa da, 90° baino handiagoa.', 'Coseno negativo: el ángulo es obtuso, mayor que 90°.', 'جيب تمام سالب: الزاوية منفرجة، أكبر من 90°.', 'Negative cosine: the angle is obtuse, more than 90°.'),
    'wrong-modulus': say('Proiekzioa: u · v zati proiektatzen den gaineko bektorearen modulua.', 'Proyección: u · v entre el módulo del vector sobre el que se proyecta.', 'الإسقاط: u · v مقسومًا على طول المتجه الذي نُسقط عليه.', 'Projection: u · v divided by the magnitude of the vector you project onto.'),
    'magnitudes-added': say('Indarrak bektore gisa batzen dira, ez moduluak.', 'Las fuerzas se suman como vectores, no sus módulos.', 'تُجمع القوى كمتجهات لا أطوالها.', 'Forces add as vectors, not their magnitudes.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
