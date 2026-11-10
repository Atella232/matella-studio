import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { add, cross, det3, dot, type Vec3 } from '../space/vec3.ts'

/* ==========================================================================
   Espazioko bektoreen lasterketa (Batxilergoa 2 · Zientziak): five
   circuits, one per stage — points and vectors (a coordinate of AB, |AB|,
   the symmetric point), dependence (a 3×3 determinant, the k that makes
   three vectors dependent, a coefficient of a combination), the dot
   product (u·v, the k of a perpendicular, a scalar projection), the
   cross product (a coordinate of u × v, the area of a parallelogram and
   of a triangle) and the scalar triple product ([u, v, w], the volume of
   a tetrahedron, the k of coplanar vectors). The wrong options are the
   typical mistakes. Every question carries `meta`, the numbers the tests
   check it against.
   ========================================================================== */

export const SPACE_RACE_CIRCUITS = 5

export type SpaceRaceError =
    | 'reversed'
    | 'no-z'
    | 'midpoint'
    | 'sign'
    | 'j-sign'
    | 'no-half'
    | 'no-sixth'
    | 'wrong-modulus'
    | 'third-unchecked'
    | 'calculation'

export type SpaceRaceQuestion = RaceQuestion<SpaceRaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex.replace(/\{,\}/g, '.')}$` })
const math = (latex: string) => `$${latex}$`
const wrap = (value: number) => (value < 0 ? `(${value})` : String(value + 0))
const vec = (a: Vec3) => `(${a.map((value) => value + 0).join(',')})`

interface Candidate {
    value: FractionValue
    error: SpaceRaceError
}
const whole = (value: number, error: SpaceRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const ratio = (p: number, q: number, error: SpaceRaceError): Candidate => ({ value: fraction(p, q), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => ({ value: fraction(Math.round(item * 10000), 10000), error: 'calculation' as const }))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<SpaceRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: SpaceRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<SpaceRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): SpaceRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

/** A formula followed by a question */
const ask = (formula: string, what: LocalizedText) => say(`${math(formula)}. ${what.eu}`, `${math(formula)}. ${what.es}`, `${math(formula)}. ${what.ar}`, `${math(formula)}. ${what.en}`)
const COORDINATE: LocalizedText[] = [
    say('Zein da lehen koordenatua?', '¿Cuál es la primera coordenada?', 'ما المركّبة الأولى؟', 'What is the first coordinate?'),
    say('Zein da bigarren koordenatua?', '¿Cuál es la segunda coordenada?', 'ما المركّبة الثانية؟', 'What is the second coordinate?'),
    say('Zein da hirugarren koordenatua?', '¿Cuál es la tercera coordenada?', 'ما المركّبة الثالثة؟', 'What is the third coordinate?')
]
const VALUE = say('Zenbat da?', '¿Cuánto vale?', 'كم يساوي؟', 'What is it?')
const K = say('Zenbat da $k$?', '¿Cuánto vale $k$?', 'كم يساوي $k$؟', 'What is $k$?')

const point = (random: Random, limit = 4): Vec3 => [randomInt(random, -limit, limit), randomInt(random, -limit, limit), randomInt(random, -limit, limit)]
const noZero = (a: Vec3) => a.every((value) => value !== 0)
/** Boxes with a whole diagonal */
const BOXES: Vec3[] = [[1, 2, 2], [2, 1, 2], [2, 3, 6], [3, 6, 2], [1, 4, 8], [4, 4, 7], [2, 4, 4], [0, 3, 4]]
/** Pairs with a whole |u × v| */
const AREA_PAIRS: Array<[Vec3, Vec3]> = [[[1, 0, 2], [2, -2, 0]], [[2, 1, 0], [2, 2, 3]], [[3, 0, 1], [0, -2, 1]], [[1, 2, 2], [2, 1, -2]], [[0, 2, -1], [-1, 2, 0]], [[2, 0, 1], [2, 3, -2]], [[0, 3, 2], [1, 0, 2]]]
const signed = (random: Random, a: Vec3): Vec3 => [a[0] * pick(random, [1, -1]), a[1] * pick(random, [1, -1]), a[2] * pick(random, [1, -1])]

/* ---------- 1. Points and vectors ---------- */

function abQuestion(random: Random): SpaceRaceQuestion | null {
    const a = point(random)
    const b = point(random)
    const index = randomInt(random, 0, 2)
    const value = b[index] - a[index]
    if (value === 0 || a[index] === 0) return null
    const answer = fraction(value)
    const choices = options(random, answer, [whole(-value, 'reversed'), whole(a[index] + b[index], 'calculation'), whole(b[(index + 1) % 3] - a[(index + 1) % 3], 'calculation')])
    return choices && build(0, 'ab', ask(`A${vec(a)},\\ B${vec(b)},\\ \\overrightarrow{AB}`, COORDINATE[index]), choices, answer, same(`${b[index]}-${wrap(a[index])}=${value}`), { ...flat('a', a), ...flat('b', b), index })
}

function lengthQuestion(random: Random): SpaceRaceQuestion | null {
    const box = signed(random, pick(random, BOXES))
    const length = Math.sqrt(dot(box, box))
    const answer = fraction(length)
    const flatSquare = box[0] ** 2 + box[1] ** 2
    const choices = options(random, answer, [{ value: fraction(Math.round(Math.sqrt(flatSquare) * 100), 100), error: 'no-z' }, whole(Math.abs(box[0]) + Math.abs(box[1]) + Math.abs(box[2]), 'calculation'), whole(dot(box, box), 'calculation')])
    return choices && build(0, 'length', ask(`|${vec(box)}|`, VALUE), choices, answer, same(`\\sqrt{${box[0] ** 2}+${box[1] ** 2}+${box[2] ** 2}}=${length}`), flat('v', box))
}

function symmetricQuestion(random: Random): SpaceRaceQuestion | null {
    const p = point(random, 3)
    const m = point(random, 3)
    const index = randomInt(random, 0, 2)
    const value = 2 * m[index] - p[index]
    const average = (p[index] + m[index]) / 2
    if (p[index] === m[index]) return null
    const answer = fraction(value)
    const choices = options(random, answer, [ratio(p[index] + m[index], 2, 'midpoint'), whole(2 * p[index] - m[index], 'reversed'), whole(m[index] - p[index], 'calculation')])
    const prompt = say(`$P${vec(p)}$ puntuaren simetrikoa $M${vec(m)}$ puntuarekiko. ${COORDINATE[index].eu}`, `Simétrico de $P${vec(p)}$ respecto de $M${vec(m)}$. ${COORDINATE[index].es}`, `نظيرة $P${vec(p)}$ بالنسبة إلى $M${vec(m)}$. ${COORDINATE[index].ar}`, `Symmetric of $P${vec(p)}$ with respect to $M${vec(m)}$. ${COORDINATE[index].en}`)
    return choices && average !== value ? build(0, 'symmetric', prompt, choices, answer, same(`2\\cdot ${wrap(m[index])}-${wrap(p[index])}=${value}`), { ...flat('p', p), ...flat('m', m), index }) : null
}

/* ---------- 2. Dependence ---------- */

function determinantQuestion(random: Random): SpaceRaceQuestion | null {
    const rows = [point(random, 2), point(random, 2), point(random, 2)] as const
    const value = det3(rows[0], rows[1], rows[2]) + 0
    if (value === 0) return null
    const answer = fraction(value)
    const choices = options(random, answer, [whole(-value, 'sign'), whole(det3(rows[1], rows[0], rows[2]) + 2, 'calculation'), whole(rows[0][0] * rows[1][1] * rows[2][2], 'calculation')])
    return choices && build(1, 'determinant', ask(`\\begin{vmatrix}${rows.map((row) => row.join('&')).join('\\\\')}\\end{vmatrix}`, VALUE), choices, answer, same(`\\det=${value}`), { ...flat('r', rows[0]), ...flat('s', rows[1]), ...flat('t', rows[2]) })
}

/** The k in one coordinate of w that makes u, v and w dependent */
function dependentQuestion(random: Random): SpaceRaceQuestion | null {
    const u = point(random, 2)
    const v = point(random, 2)
    const w: [number, number, number] = [randomInt(random, -3, 3), randomInt(random, -3, 3), randomInt(random, -3, 3)]
    const index = randomInt(random, 0, 2)
    w[index] = 0
    const slope = cross(u, v)[index] + 0
    const offset = det3(u, v, w) + 0
    if (slope === 0 || offset === 0 || offset % slope !== 0) return null
    const k = -offset / slope
    if (Math.abs(k) > 8) return null
    w[index] = Number.NaN
    const wLatex = `(${w.map((value) => (Number.isNaN(value) ? 'k' : value)).join(',')})`
    const answer = fraction(k)
    const choices = options(random, answer, [whole(-k, 'sign'), whole(offset, 'calculation'), ratio(slope, offset === 0 ? 1 : offset, 'calculation')])
    const prompt = say(`$${vec(u)}$, $${vec(v)}$ eta $${wLatex}$ mendekoak dira. ${K.eu}`, `$${vec(u)}$, $${vec(v)}$ y $${wLatex}$ son dependientes. ${K.es}`, `$${vec(u)}$ و$${vec(v)}$ و$${wLatex}$ مرتبطة. ${K.ar}`, `$${vec(u)}$, $${vec(v)}$ and $${wLatex}$ are dependent. ${K.en}`)
    return choices && build(1, 'dependent', prompt, choices, answer, same(`${slope}k+${wrap(offset)}=0\\ \\to\\ k=${k}`), { ...flat('u', u), ...flat('v', v), index, slope, offset })
}

/** (p, q, m) = a·(1, 0, c) + b·(0, 1, d): m = a·c + b·d */
function combinationQuestion(random: Random): SpaceRaceQuestion | null {
    const c = randomInt(random, -2, 3)
    const d = randomInt(random, -2, 3)
    const a = randomInt(random, -3, 3)
    const b = randomInt(random, -3, 3)
    if (a === 0 || b === 0 || c === 0 || d === 0) return null
    const m = a * c + b * d
    const answer = fraction(m)
    const choices = options(random, answer, [whole(a + b, 'third-unchecked'), whole(a * c - b * d, 'sign'), whole(c + d, 'calculation')])
    const prompt = say(`$(${a},${b},m)$ bektorea $(1,0,${c})$ eta $(0,1,${d})$ bektoreen konbinazio lineala da. Zenbat da $m$?`, `$(${a},${b},m)$ es combinación lineal de $(1,0,${c})$ y $(0,1,${d})$. ¿Cuánto vale $m$?`, `$(${a},${b},m)$ تركيب خطي لـ $(1,0,${c})$ و$(0,1,${d})$. كم يساوي $m$؟`, `$(${a},${b},m)$ is a linear combination of $(1,0,${c})$ and $(0,1,${d})$. What is $m$?`)
    return choices && build(1, 'combination', prompt, choices, answer, same(`m=${a}\\cdot ${wrap(c)}+${wrap(b)}\\cdot ${wrap(d)}=${m}`), { a, b, c, d })
}

/* ---------- 3. The dot product ---------- */

function dotQuestion(random: Random): SpaceRaceQuestion | null {
    const u = point(random, 4)
    const v = point(random, 4)
    if (!noZero(u) || !noZero(v)) return null
    const value = dot(u, v) + 0
    const answer = fraction(value)
    const choices = options(random, answer, [whole(value - u[2] * v[2], 'no-z'), whole(u[0] * v[0] - u[1] * v[1] + u[2] * v[2], 'sign'), whole(u[0] + v[0] + u[1] + v[1] + u[2] + v[2], 'calculation')])
    return choices && build(2, 'dot', ask(`${vec(u)}\\cdot ${vec(v)}`, VALUE), choices, answer, same(`${u.map((x, i) => `${wrap(x)}\\cdot ${wrap(v[i])}`).join('+')}=${value}`), { ...flat('u', u), ...flat('v', v) })
}

/** (k, a, b) ⟂ (c, d, e): k·c + a·d + b·e = 0 */
function perpendicularQuestion(random: Random): SpaceRaceQuestion | null {
    const c = pick(random, [-3, -2, -1, 1, 2, 3])
    const [a, b, d, e] = [randomInt(random, -4, 4), randomInt(random, -4, 4), randomInt(random, -4, 4), randomInt(random, -4, 4)]
    const rest = a * d + b * e
    if (rest === 0 || rest % c !== 0) return null
    const k = -rest / c
    if (Math.abs(k) > 9) return null
    const answer = fraction(k)
    const choices = options(random, answer, [whole(-k, 'sign'), whole(rest, 'calculation'), ratio(c, rest, 'calculation')])
    const prompt = say(`$(k,${a},${b})\\perp(${c},${d},${e})$. ${K.eu}`, `$(k,${a},${b})\\perp(${c},${d},${e})$. ${K.es}`, `$(k,${a},${b})\\perp(${c},${d},${e})$. ${K.ar}`, `$(k,${a},${b})\\perp(${c},${d},${e})$. ${K.en}`)
    return choices && build(2, 'perpendicular', prompt, choices, answer, same(`${c}k+${wrap(rest)}=0\\ \\to\\ k=${k}`), { a, b, c, d, e })
}

/** The scalar projection of v onto u with |u| whole */
function projectionQuestion(random: Random): SpaceRaceQuestion | null {
    const u = signed(random, pick(random, BOXES.slice(0, 2)))
    const v = point(random, 4)
    const value = dot(u, v) + 0
    const length = Math.sqrt(dot(u, u))
    const vLength = Math.sqrt(dot(v, v))
    if (value === 0 || !noZero(v)) return null
    const answer = fraction(value, length)
    const choices = options(random, answer, [ratio(value, length * length, 'wrong-modulus'), whole(value, 'wrong-modulus'), Number.isInteger(vLength) ? ratio(value, vLength, 'wrong-modulus') : whole(-value / length, 'sign')])
    const prompt = say(`$${vec(v)}$ bektorearen proiekzioa $${vec(u)}$ bektorearen gainean. ${VALUE.eu}`, `Proyección de $${vec(v)}$ sobre $${vec(u)}$. ${VALUE.es}`, `إسقاط $${vec(v)}$ على $${vec(u)}$. ${VALUE.ar}`, `Projection of $${vec(v)}$ onto $${vec(u)}$. ${VALUE.en}`)
    return choices && build(2, 'projection', prompt, choices, answer, same(`\\frac{${value}}{${length}}`), { ...flat('u', u), ...flat('v', v) })
}

/* ---------- 4. The cross product ---------- */

function crossQuestion(random: Random): SpaceRaceQuestion | null {
    const u = point(random, 3)
    const v = point(random, 3)
    const n = cross(u, v)
    const index = pick(random, [1, 1, 0, 2])
    if (n[index] === 0) return null
    const answer = fraction(n[index] + 0)
    const choices = options(random, answer, [whole(-n[index], index === 1 ? 'j-sign' : 'sign'), whole(u[index] * v[index], 'calculation'), whole(n[(index + 1) % 3], 'calculation')])
    return choices && build(3, 'cross', ask(`${vec(u)}\\times ${vec(v)}`, COORDINATE[index]), choices, answer, same(`${vec(u)}\\times ${vec(v)}=${vec(n)}`), { ...flat('u', u), ...flat('v', v), index })
}

function areaQuestion(random: Random, triangle: boolean): SpaceRaceQuestion | null {
    const [u, v] = pick(random, AREA_PAIRS)
    const n = cross(u, v)
    const area = Math.sqrt(dot(n, n))
    if (!Number.isInteger(area)) return null
    const answer = triangle ? fraction(area, 2) : fraction(area)
    const choices = options(random, answer, triangle
        ? [whole(area, 'no-half'), whole(dot(n, n), 'calculation'), ratio(dot(n, n), 2, 'calculation')]
        : [ratio(area, 2, 'calculation'), whole(dot(n, n), 'calculation'), whole(Math.abs(n[0]) + Math.abs(n[1]) + Math.abs(n[2]), 'calculation')])
    if (triangle) {
        const a = point(random, 2)
        const b = add(a, u)
        const c = add(a, v)
        const prompt = say(`$A${vec(a)}$, $B${vec(b)}$ eta $C${vec(c)}$ triangeluaren azalera. ${VALUE.eu}`, `Área del triángulo $A${vec(a)}$, $B${vec(b)}$, $C${vec(c)}$. ${VALUE.es}`, `مساحة المثلث $A${vec(a)}$ و$B${vec(b)}$ و$C${vec(c)}$. ${VALUE.ar}`, `Area of the triangle $A${vec(a)}$, $B${vec(b)}$, $C${vec(c)}$. ${VALUE.en}`)
        return choices && build(3, 'triangle', prompt, choices, answer, same(`\\frac{1}{2}\\,|${vec(n)}|=\\frac{${area}}{2}`), { ...flat('u', u), ...flat('v', v), ...flat('a', a) })
    }
    const prompt = say(`$${vec(u)}$ eta $${vec(v)}$ aldeak dituen paralelogramoaren azalera. ${VALUE.eu}`, `Área del paralelogramo de lados $${vec(u)}$ y $${vec(v)}$. ${VALUE.es}`, `مساحة متوازي الأضلاع الذي ضلعاه $${vec(u)}$ و$${vec(v)}$. ${VALUE.ar}`, `Area of the parallelogram with sides $${vec(u)}$ and $${vec(v)}$. ${VALUE.en}`)
    return choices && build(3, 'parallelogram', prompt, choices, answer, same(`|${vec(n)}|=${area}`), { ...flat('u', u), ...flat('v', v) })
}

/* ---------- 5. The scalar triple product ---------- */

function mixedQuestion(random: Random): SpaceRaceQuestion | null {
    const u = point(random, 2)
    const v = point(random, 2)
    const w = point(random, 2)
    const value = det3(u, v, w) + 0
    if (value === 0) return null
    const answer = fraction(value)
    const choices = options(random, answer, [whole(-value, 'sign'), ratio(Math.abs(value), 6, 'calculation'), whole(dot(u, v) + dot(v, w), 'calculation')])
    return choices && build(4, 'mixed', ask(`[${vec(u)},${vec(v)},${vec(w)}]`, VALUE), choices, answer, same(`\\begin{vmatrix}${[u, v, w].map((row) => row.join('&')).join('\\\\')}\\end{vmatrix}=${value}`), { ...flat('u', u), ...flat('v', v), ...flat('w', w) })
}

function tetraQuestion(random: Random): SpaceRaceQuestion | null {
    const u: Vec3 = [randomInt(random, 1, 4), 0, 0]
    const v: Vec3 = [randomInt(random, -2, 2), randomInt(random, 1, 3), 0]
    const w: Vec3 = [randomInt(random, -2, 2), randomInt(random, -2, 2), randomInt(random, 1, 4)]
    const value = det3(u, v, w) + 0
    if (value % 6 !== 0) return null
    const a = point(random, 2)
    const [b, c, d] = [add(a, u), add(a, v), add(a, w)]
    const answer = fraction(value / 6)
    const choices = options(random, answer, [whole(value, 'no-sixth'), ratio(value, 3, 'no-sixth'), ratio(value, 2, 'no-sixth')])
    const prompt = say(`$A${vec(a)}$, $B${vec(b)}$, $C${vec(c)}$, $D${vec(d)}$ tetraedroaren bolumena. ${VALUE.eu}`, `Volumen del tetraedro $A${vec(a)}$, $B${vec(b)}$, $C${vec(c)}$, $D${vec(d)}$. ${VALUE.es}`, `حجم رباعي الأوجه $A${vec(a)}$ و$B${vec(b)}$ و$C${vec(c)}$ و$D${vec(d)}$. ${VALUE.ar}`, `Volume of the tetrahedron $A${vec(a)}$, $B${vec(b)}$, $C${vec(c)}$, $D${vec(d)}$. ${VALUE.en}`)
    return choices && build(4, 'tetra', prompt, choices, answer, same(`\\frac{${value}}{6}=${value / 6}`), { ...flat('u', u), ...flat('v', v), ...flat('w', w), ...flat('a', a) })
}

/** The k that makes u, v and (a, b, k) coplanar */
function coplanarQuestion(random: Random): SpaceRaceQuestion | null {
    const u = point(random, 2)
    const v = point(random, 2)
    const a = randomInt(random, -3, 3)
    const b = randomInt(random, -3, 3)
    const slope = cross(u, v)[2] + 0
    const offset = det3(u, v, [a, b, 0]) + 0
    if (slope === 0 || offset === 0 || offset % slope !== 0) return null
    const k = -offset / slope
    if (Math.abs(k) > 8) return null
    const answer = fraction(k)
    const choices = options(random, answer, [whole(-k, 'sign'), whole(offset, 'calculation'), whole(k + 1, 'calculation')])
    const prompt = say(`$${vec(u)}$, $${vec(v)}$ eta $(${a},${b},k)$ planokideak dira. ${K.eu}`, `$${vec(u)}$, $${vec(v)}$ y $(${a},${b},k)$ son coplanarios. ${K.es}`, `$${vec(u)}$ و$${vec(v)}$ و$(${a},${b},k)$ مستوية. ${K.ar}`, `$${vec(u)}$, $${vec(v)}$ and $(${a},${b},k)$ are coplanar. ${K.en}`)
    return choices && build(4, 'coplanar', prompt, choices, answer, same(`${slope}k+${wrap(offset)}=0\\ \\to\\ k=${k}`), { ...flat('u', u), ...flat('v', v), a, b })
}

/** A vector as numbered meta entries: u1, u2, u3 */
function flat(name: string, a: Vec3): Record<string, number> {
    return { [`${name}1`]: a[0], [`${name}2`]: a[1], [`${name}3`]: a[2] }
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => SpaceRaceQuestion | null>> = [
    [abQuestion, lengthQuestion, symmetricQuestion],
    [determinantQuestion, dependentQuestion, combinationQuestion],
    [dotQuestion, perpendicularQuestion, projectionQuestion],
    [crossQuestion, (random) => areaQuestion(random, false), (random) => areaQuestion(random, true)],
    [mixedQuestion, tetraQuestion, coplanarQuestion]
]

export function generateSpaceRaceQuestion(random: Random, circuit: number, tier: Tier): SpaceRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 800; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkSpacePitAnswer(question: RaceQuestion<SpaceRaceError>, input: string): AnswerCheck {
    return checkAnswer(input.replace(/[°º]/g, ''), question.answer, question.answerForm)
}

export function spaceParTime(circuit: number): number {
    return parTimeFor([13, 14, 13, 14, 14][circuit] ?? 14)
}

/** The kinds of question, three per circuit (the tests go through all of them) */
export const spaceRaceKinds = ['ab', 'length', 'symmetric', 'determinant', 'dependent', 'combination', 'dot', 'perpendicular', 'projection', 'cross', 'parallelogram', 'triangle', 'mixed', 'tetra', 'coplanar'] as const

export const spaceRaceErrorTips: Record<SpaceRaceError, LocalizedText> = {
    reversed: say('Muturra ken jatorria: B − A, ez A − B.', 'Extremo menos origen: B − A, no A − B.', 'الطرف ناقص الأصل: B − A لا A − B.', 'End point minus start point: B − A, not A − B.'),
    'no-z': say('Hiru koordenatuak: z ere bai.', 'Las tres coordenadas: también la z.', 'المركّبات الثلاث: ومنها z.', 'All three coordinates: the z too.'),
    midpoint: say('Simetrikoa ez da erdiko puntua: P′ = 2M − P.', 'El simétrico no es el punto medio: P′ = 2M − P.', 'النظيرة ليست المنتصف: P′ = 2M − P.', 'The symmetric point is not the midpoint: P′ = 2M − P.'),
    sign: say('Kontuz zeinuarekin.', 'Cuidado con el signo.', 'انتبه للإشارة.', 'Watch the sign.'),
    'j-sign': say('Biderkadura bektorialean j minus zeinuarekin doa.', 'En el producto vectorial, la j va con signo menos.', 'في الجداء المتجهي يأتي j بإشارة سالبة.', 'In the cross product, the j goes with a minus sign.'),
    'no-half': say('Triangelua paralelogramoaren erdia da.', 'El triángulo es la mitad del paralelogramo.', 'المثلث نصف متوازي الأضلاع.', 'The triangle is half the parallelogram.'),
    'no-sixth': say('Tetraedroa biderkadura mistoaren seirena da.', 'El tetraedro es la sexta parte del producto mixto.', 'رباعي الأوجه سدس الجداء المختلط.', 'The tetrahedron is a sixth of the scalar triple product.'),
    'wrong-modulus': say('Proiekzioa: zatitu proiektatzen den gaineko bektorearen moduluaz.', 'Proyección: divide entre el módulo del vector sobre el que se proyecta.', 'الإسقاط: اقسم على طول المتجه الذي نُسقط عليه.', 'Projection: divide by the magnitude of the vector you project onto.'),
    'third-unchecked': say('Hirugarren koordenatua ere bete behar da.', 'La tercera coordenada también tiene que cumplirse.', 'يجب أن تتحقق المركّبة الثالثة أيضًا.', 'The third coordinate has to hold too.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
