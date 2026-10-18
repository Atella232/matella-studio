import { add, checkAnswer, divide, fraction, multiply, subtract, toLatex, toText, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { readVectorsAnswer } from '../answers.ts'
import { same, say } from '../text.ts'

/* ==========================================================================
   Bektoreen lasterketa (4. DBH akademikoak): five circuits, one per stage —
   vectors (from two points, the modulus, a combination, a parallel one),
   points (distance, midpoint, symmetric point, aligned points), equations
   (the slope from two points or from the general form, the intercept, a
   point of a parametric line, the explicit equation), positions (parallel
   and perpendicular slopes, the crossing point, the parameter k) and
   applications (the bisector, the circle both ways, the fourth vertex of a
   parallelogram). Wrong options are typical mistakes: origin minus end,
   points added, the scalar on one coordinate only, the root forgotten, the
   coordinates added, the midpoint not halved, the vector given for the
   point, the slope upside down, the sign changed, x and y swapped, r for
   r², the vertices out of order. Answers that are one number (a modulus,
   a distance, a coordinate, a slope, a parameter) can be written at the
   pit stop; points and equations are only chosen. Every question carries
   `meta`, the numbers of its prompt, so the test recomputes the answer.
   ========================================================================== */

export const VECTORS_RACE_CIRCUITS = 5

export type VectorsRaceError =
    | 'reversed'
    | 'added'
    | 'scalar'
    | 'sign'
    | 'no-root'
    | 'sum-sides'
    | 'perpendicular'
    | 'parallel'
    | 'no-half'
    | 'half-difference'
    | 'midpoint'
    | 'vector-not-point'
    | 'inverse'
    | 'intercept'
    | 'only-point'
    | 'only-vector'
    | 'swap'
    | 'no-square'
    | 'order'
    | 'calculation'

export type VectorsRaceQuestion = RaceQuestion<VectorsRaceError> & { meta: Record<string, number> }

export type Pair = [number, number]

const math = (latex: string) => `$${latex}$`
const f = (value: number) => fraction(value)

/* ---------- Writing points, numbers and equations ---------- */

export const pairLatex = ([x, y]: Pair) => `(${x},\\,${y})`
const named = (name: string, point: Pair) => `${name}${pairLatex(point)}`
const vec = (name: string) => `\\vec{${name}}`

/** One term of a sum: +3x, -x, \frac{2}{3}x, -5 */
function termLatex(coefficient: FractionValue, variable: string, first: boolean): string {
    if (coefficient.numerator === 0) return ''
    const negative = coefficient.numerator < 0
    const size = fraction(Math.abs(coefficient.numerator), coefficient.denominator)
    const body = variable && size.numerator === 1 && size.denominator === 1 ? variable : `${toLatex(size)}${variable}`
    return `${negative ? '-' : first ? '' : '+'}${body}`
}

/** A sum of terms, leaving out the zero ones: [[2,'x'],[-1,'y'],[3,'']] → 2x-y+3 */
export function sumLatex(terms: Array<[FractionValue | number, string]>): string {
    let text = ''
    for (const [coefficient, variable] of terms) text += termLatex(typeof coefficient === 'number' ? f(coefficient) : coefficient, variable, text === '')
    return text || '0'
}

export const explicitLatex = (m: FractionValue, n: FractionValue) => `y=${sumLatex([[m, 'x'], [n, '']])}`
export const generalLatex = (a: number, b: number, c: number) => `${sumLatex([[a, 'x'], [b, 'y'], [c, '']])}=0`

const squareLatex = (variable: string, centre: number) => (centre === 0 ? `${variable}^{2}` : `(${variable}${centre > 0 ? '-' : '+'}${Math.abs(centre)})^{2}`)
export const circleLatex = (a: number, b: number, right: number) => `${squareLatex('x', a)}+${squareLatex('y', b)}=${right}`

/* ---------- Options ---------- */

interface Choice {
    latex: string
    /** What makes two options the same answer */
    key: string
}

interface Candidate extends Choice {
    error: VectorsRaceError
}

const ofPair = (point: Pair): Choice => ({ latex: pairLatex(point), key: `p${point[0]},${point[1]}` })
const ofNumber = (value: FractionValue): Choice => ({ latex: toLatex(value), key: `n${toText(value)}` })
const ofExplicit = (m: FractionValue, n: FractionValue): Choice => ({ latex: explicitLatex(m, n), key: `e${toText(m)};${toText(n)}` })
const ofCircle = (a: number, b: number, right: number): Choice => ({ latex: circleLatex(a, b, right), key: `c${a},${b},${right}` })
const wrong = (choice: Choice, error: VectorsRaceError): Candidate => ({ ...choice, error })

const nearPairs = ([x, y]: Pair): Candidate[] => [[x + 1, y], [x, y - 1], [x - 1, y], [x, y + 1], [y, x], [-x, y]].map((point) => wrong(ofPair(point as Pair), 'calculation'))
const nearNumbers = (value: FractionValue): Candidate[] => [1, -1, 2, -2].map((step) => wrong(ofNumber(add(value, f(step))), 'calculation'))

/** The right option and three mistakes with different answers */
function options(random: Random, right: Choice, candidates: Candidate[]): RaceOption<VectorsRaceError>[] | null {
    const picked: Candidate[] = []
    for (const candidate of candidates) {
        if (picked.length === 3) break
        if ([right, ...picked].some((other) => other.key === candidate.key)) continue
        picked.push(candidate)
    }
    if (picked.length < 3) return null
    return shuffle(random, [{ latex: right.latex, correct: true, error: null }, ...picked.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

/** `answer` is the written answer at the pit stop; null when the answer is a point or an equation, only chosen */
function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<VectorsRaceError>[] | null, answer: FractionValue | null, solution: string, meta: Record<string, number>): VectorsRaceQuestion | null {
    if (!choices) return null
    return { circuit, kind, prompt, options: choices, answer: answer ?? f(0), answerForm: 'any', percentAnswer: false, writable: answer !== null, solution: same(math(solution)), meta }
}

const reach = (tier: Tier) => [4, 6, 8][tier]
const coordinate = (random: Random, tier: Tier) => randomInt(random, -reach(tier), reach(tier))
const randomPoint = (random: Random, tier: Tier): Pair => [coordinate(random, tier), coordinate(random, tier)]
const nonZero = (random: Random, size: number) => {
    const value = randomInt(random, 1, size)
    return random() < 0.5 ? -value : value
}
const minus = (p: Pair, q: Pair): Pair => [p[0] - q[0], p[1] - q[1]]
const plus = (p: Pair, q: Pair): Pair => [p[0] + q[0], p[1] + q[1]]
const times = (k: number, p: Pair): Pair => [k * p[0], k * p[1]]

/** Right triangles with whole sides, for moduli and distances */
const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 6, 10], [4, 3, 5], [12, 5, 13], [9, 12, 15], [8, 15, 17]]

/** A vector with whole modulus, with random signs and order */
function tripleVector(random: Random, tier: Tier): { vector: Pair; length: number } {
    const [a, b, c] = pick(random, TRIPLES.slice(0, tier === 0 ? 2 : tier === 1 ? 5 : TRIPLES.length))
    const signs = [pick(random, [-1, 1]), pick(random, [-1, 1])]
    const vector: Pair = random() < 0.5 ? [a * signs[0], b * signs[1]] : [b * signs[0], a * signs[1]]
    return { vector, length: c }
}

/* ---------- Circuit 0: vectors ---------- */

function vectorQuestion(random: Random, tier: Tier): VectorsRaceQuestion | null {
    const a = randomPoint(random, tier)
    const b = randomPoint(random, tier)
    const v = minus(b, a)
    if (v[0] === 0 && v[1] === 0) return null
    return build(0, 'vector', say(
        `${math(named('A', a))} eta ${math(named('B', b))} izanda, zein dira ${math(vec('AB'))} bektorearen koordenatuak?`,
        `Si ${math(named('A', a))} y ${math(named('B', b))}, ¿cuáles son las coordenadas de ${math(vec('AB'))}?`,
        `إذا كانت ${math(named('A', a))} و${math(named('B', b))}، فما مركّبتا ${math(vec('AB'))}؟`
    ), options(random, ofPair(v), [wrong(ofPair(minus(a, b)), 'reversed'), wrong(ofPair(plus(a, b)), 'added'), ...nearPairs(v)]), null, `${vec('AB')}=B-A=${pairLatex(v)}`, { ax: a[0], ay: a[1], bx: b[0], by: b[1] })
}

function modulusQuestion(random: Random, tier: Tier): VectorsRaceQuestion | null {
    const { vector, length } = tripleVector(random, tier)
    const [x, y] = vector
    return build(0, 'modulus', say(
        `${math(`${vec('u')}=${pairLatex(vector)}`)} izanda, zenbat da ${math(`|${vec('u')}|`)}?`,
        `Si ${math(`${vec('u')}=${pairLatex(vector)}`)}, ¿cuánto vale ${math(`|${vec('u')}|`)}?`,
        `إذا كان ${math(`${vec('u')}=${pairLatex(vector)}`)}، فكم يساوي ${math(`|${vec('u')}|`)}؟`
    ), options(random, ofNumber(f(length)), [
        wrong(ofNumber(f(x * x + y * y)), 'no-root'),
        wrong(ofNumber(f(Math.abs(x) + Math.abs(y))), 'sum-sides'),
        ...nearNumbers(f(length))
    ]), f(length), `|${vec('u')}|=\\sqrt{${x < 0 ? `(${x})` : x}^{2}+${y < 0 ? `(${y})` : y}^{2}}=\\sqrt{${x * x + y * y}}=${length}`, { x, y })
}

function combinationQuestion(random: Random, tier: Tier): VectorsRaceQuestion | null {
    const u = randomPoint(random, 0)
    const v = randomPoint(random, 0)
    const k = tier === 0 ? 2 : randomInt(random, 2, 3)
    const sign = pick(random, [1, -1])
    const right = plus(times(k, u), times(sign, v))
    const expression = `${k}${vec('u')}${sign > 0 ? '+' : '-'}${vec('v')}`
    return build(0, 'combination', say(
        `${math(`${vec('u')}=${pairLatex(u)}`)} eta ${math(`${vec('v')}=${pairLatex(v)}`)}. Kalkulatu ${math(expression)}.`,
        `${math(`${vec('u')}=${pairLatex(u)}`)} y ${math(`${vec('v')}=${pairLatex(v)}`)}. Calcula ${math(expression)}.`,
        `${math(`${vec('u')}=${pairLatex(u)}`)} و${math(`${vec('v')}=${pairLatex(v)}`)}. احسب ${math(expression)}.`
    ), options(random, ofPair(right), [
        wrong(ofPair([k * u[0] + sign * v[0], u[1] + sign * v[1]]), 'scalar'),
        wrong(ofPair(plus(times(k, u), times(-sign, v))), 'sign'),
        wrong(ofPair(plus(u, times(sign, v))), 'scalar'),
        ...nearPairs(right)
    ]), null, `${expression}=${pairLatex(times(k, u))}${sign > 0 ? '+' : '-'}${pairLatex(v)}=${pairLatex(right)}`, { ux: u[0], uy: u[1], vx: v[0], vy: v[1], k, sign })
}

function parallelQuestion(random: Random, tier: Tier): VectorsRaceQuestion | null {
    const a = nonZero(random, 4)
    const b = nonZero(random, 4)
    const k = pick(random, tier === 0 ? [2, 3] : [2, 3, -1, -2, -3])
    const c = k * a
    const right = f(k * b)
    return build(0, 'parallel', say(
        `Zenbat da ${math('y')}, ${math(`${vec('u')}=${pairLatex([a, b])}`)} eta ${math(`${vec('v')}=(${c},\\,y)`)} paraleloak izateko?`,
        `¿Cuánto vale ${math('y')} para que ${math(`${vec('u')}=${pairLatex([a, b])}`)} y ${math(`${vec('v')}=(${c},\\,y)`)} sean paralelos?`,
        `ما قيمة ${math('y')} ليكون ${math(`${vec('u')}=${pairLatex([a, b])}`)} و${math(`${vec('v')}=(${c},\\,y)`)} متوازيين؟`
    ), options(random, ofNumber(right), [
        wrong(ofNumber(fraction(-a * c, b)), 'perpendicular'),
        wrong(ofNumber(fraction(a * c, b)), 'inverse'),
        wrong(ofNumber(f(-k * b)), 'sign'),
        ...nearNumbers(right)
    ]), right, `\\frac{${c}}{${a}}=\\frac{y}{${b}}\\ \\to\\ y=${toLatex(right)}`, { a, b, c })
}

/* ---------- Circuit 1: points ---------- */

function distanceQuestion(random: Random, tier: Tier): VectorsRaceQuestion | null {
    const a = randomPoint(random, 0)
    const { vector, length } = tripleVector(random, tier)
    const b = plus(a, vector)
    const [dx, dy] = vector
    return build(1, 'distance', say(
        `Zein da ${math(named('A', a))} eta ${math(named('B', b))} puntuen arteko distantzia?`,
        `¿Cuál es la distancia entre ${math(named('A', a))} y ${math(named('B', b))}?`,
        `ما المسافة بين ${math(named('A', a))} و${math(named('B', b))}؟`
    ), options(random, ofNumber(f(length)), [
        wrong(ofNumber(f(dx * dx + dy * dy)), 'no-root'),
        wrong(ofNumber(f(Math.abs(dx) + Math.abs(dy))), 'sum-sides'),
        ...nearNumbers(f(length))
    ]), f(length), `d=\\sqrt{${Math.abs(dx)}^{2}+${Math.abs(dy)}^{2}}=\\sqrt{${dx * dx + dy * dy}}=${length}`, { ax: a[0], ay: a[1], bx: b[0], by: b[1] })
}

function midpointQuestion(random: Random, tier: Tier): VectorsRaceQuestion | null {
    const a = randomPoint(random, tier)
    const b = randomPoint(random, tier)
    const sum = plus(a, b)
    if (sum[0] % 2 !== 0 || sum[1] % 2 !== 0 || (a[0] === b[0] && a[1] === b[1])) return null
    const right = times(1 / 2, sum)
    return build(1, 'midpoint', say(
        `Zein da ${math(named('A', a))} eta ${math(named('B', b))} muturreko zuzenkiaren erdiko puntua?`,
        `¿Cuál es el punto medio del segmento de extremos ${math(named('A', a))} y ${math(named('B', b))}?`,
        `ما منتصف القطعة ذات الطرفين ${math(named('A', a))} و${math(named('B', b))}؟`
    ), options(random, ofPair(right), [
        wrong(ofPair(sum), 'no-half'),
        wrong(ofPair(times(1 / 2, minus(b, a))), 'half-difference'),
        ...nearPairs(right)
    ]), null, `M=\\left(\\frac{${a[0]}+${b[0] < 0 ? `(${b[0]})` : b[0]}}{2},\\,\\frac{${a[1]}+${b[1] < 0 ? `(${b[1]})` : b[1]}}{2}\\right)=${pairLatex(right)}`, { ax: a[0], ay: a[1], bx: b[0], by: b[1] })
}

function symmetricQuestion(random: Random, tier: Tier): VectorsRaceQuestion | null {
    const a = randomPoint(random, tier)
    const m = randomPoint(random, 0)
    if (a[0] === m[0] && a[1] === m[1]) return null
    const right = minus(times(2, m), a)
    const half = plus(a, m)
    return build(1, 'symmetric', say(
        `Zein da ${math(named('A', a))} puntuaren simetrikoa ${math(named('M', m))} puntuarekiko?`,
        `¿Cuál es el simétrico de ${math(named('A', a))} respecto de ${math(named('M', m))}?`,
        `ما نظيرة ${math(named('A', a))} بالنسبة إلى ${math(named('M', m))}؟`
    ), options(random, ofPair(right), [
        wrong(ofPair(minus(m, a)), 'vector-not-point'),
        ...(half[0] % 2 === 0 && half[1] % 2 === 0 ? [wrong(ofPair(times(1 / 2, half)), 'midpoint')] : []),
        wrong(ofPair(minus(times(2, a), m)), 'reversed'),
        ...nearPairs(right)
    ]), null, `A'=2M-A=${pairLatex(times(2, m))}-${pairLatex(a)}=${pairLatex(right)}`, { ax: a[0], ay: a[1], mx: m[0], my: m[1] })
}

function alignedQuestion(random: Random, tier: Tier): VectorsRaceQuestion | null {
    const a = randomPoint(random, 0)
    const d: Pair = [nonZero(random, 3), nonZero(random, 3)]
    const b = plus(a, d)
    const k = pick(random, tier === 0 ? [2, 3] : [2, 3, -1, -2])
    const c = plus(a, times(k, d))
    const right = f(c[1])
    return build(1, 'aligned', say(
        `${math(named('A', a))}, ${math(named('B', b))} eta ${math(`C(${c[0]},\\,y)`)} lerrokatuta daude. Zenbat da ${math('y')}?`,
        `${math(named('A', a))}, ${math(named('B', b))} y ${math(`C(${c[0]},\\,y)`)} están alineados. ¿Cuánto vale ${math('y')}?`,
        `النقاط ${math(named('A', a))} و${math(named('B', b))} و${math(`C(${c[0]},\\,y)`)} على استقامة واحدة. ما قيمة ${math('y')}؟`
    ), options(random, ofNumber(right), [
        wrong(ofNumber(add(f(a[1]), fraction(k * d[0] * d[0], d[1]))), 'inverse'),
        wrong(ofNumber(f(a[1] - k * d[1])), 'sign'),
        ...nearNumbers(right)
    ]), right, `\\frac{${c[0] - a[0]}}{${d[0]}}=\\frac{y-${a[1] < 0 ? `(${a[1]})` : a[1]}}{${d[1]}}\\ \\to\\ y=${c[1]}`, { ax: a[0], ay: a[1], bx: b[0], by: b[1], cx: c[0] })
}

/* ---------- Circuit 2: equations ---------- */

function slopeQuestion(random: Random, tier: Tier): VectorsRaceQuestion | null {
    const a = randomPoint(random, tier)
    const b = randomPoint(random, tier)
    const [dx, dy] = minus(b, a)
    if (dx === 0 || dy === 0) return null
    const right = fraction(dy, dx)
    return build(2, 'slope', say(
        `Zein da ${math(named('A', a))} eta ${math(named('B', b))} puntuetatik igarotzen den zuzenaren malda?`,
        `¿Cuál es la pendiente de la recta que pasa por ${math(named('A', a))} y ${math(named('B', b))}?`,
        `ما ميل المستقيم المار بـ${math(named('A', a))} و${math(named('B', b))}؟`
    ), options(random, ofNumber(right), [
        wrong(ofNumber(fraction(dx, dy)), 'inverse'),
        wrong(ofNumber(fraction(-dy, dx)), 'sign'),
        ...nearNumbers(right)
    ]), right, `m=\\frac{${dy}}{${dx}}=${toLatex(right)}`, { ax: a[0], ay: a[1], bx: b[0], by: b[1] })
}

function generalSlopeQuestion(random: Random, tier: Tier): VectorsRaceQuestion | null {
    // Written with A > 0, as the lessons do
    const a = randomInt(random, 1, tier === 0 ? 3 : 6)
    const b = nonZero(random, tier === 0 ? 3 : 6)
    const c = nonZero(random, 8)
    const right = fraction(-a, b)
    return build(2, 'general-slope', say(
        `Zein da ${math(generalLatex(a, b, c))} zuzenaren malda?`,
        `¿Cuál es la pendiente de la recta ${math(generalLatex(a, b, c))}?`,
        `ما ميل المستقيم ${math(generalLatex(a, b, c))}؟`
    ), options(random, ofNumber(right), [
        wrong(ofNumber(fraction(a, b)), 'sign'),
        wrong(ofNumber(fraction(-b, a)), 'inverse'),
        wrong(ofNumber(fraction(-c, b)), 'intercept'),
        ...nearNumbers(right)
    ]), right, `${b}y=${sumLatex([[-a, 'x'], [-c, '']])}\\ \\to\\ m=-\\frac{A}{B}=${toLatex(right)}`, { a, b, c })
}

function interceptQuestion(random: Random, tier: Tier): VectorsRaceQuestion | null {
    const p = randomPoint(random, tier)
    const m = nonZero(random, 3)
    const right = f(p[1] - m * p[0])
    return build(2, 'intercept', say(
        `Zuzen bat ${math(named('P', p))} puntutik igarotzen da eta haren malda ${math(`m=${m}`)} da. Zenbat da ${math('n')} jatorriko ordenatua?`,
        `Una recta pasa por ${math(named('P', p))} y tiene pendiente ${math(`m=${m}`)}. ¿Cuánto vale su ordenada en el origen ${math('n')}?`,
        `مستقيم يمر بـ${math(named('P', p))} وميله ${math(`m=${m}`)}. ما قيمة الجزء المقطوع من محور الصادات ${math('n')}؟`
    ), options(random, ofNumber(right), [
        wrong(ofNumber(f(p[1] + m * p[0])), 'sign'),
        wrong(ofNumber(f(p[0] - m * p[1])), 'swap'),
        ...nearNumbers(right)
    ]), right, `${p[1]}=${m}\\cdot${p[0] < 0 ? `(${p[0]})` : p[0]}+n\\ \\to\\ n=${toLatex(right)}`, { px: p[0], py: p[1], m })
}

function parametricQuestion(random: Random, tier: Tier): VectorsRaceQuestion | null {
    const p = randomPoint(random, 0)
    const d: Pair = [nonZero(random, 3), nonZero(random, 3)]
    const t = pick(random, tier === 0 ? [1, 2] : [2, 3, -1, -2])
    const right = plus(p, times(t, d))
    const line = `x=${sumLatex([[p[0], ''], [d[0], 't']])},\\ y=${sumLatex([[p[1], ''], [d[1], 't']])}`
    return build(2, 'parametric', say(
        `${math(`r\\colon\\ ${line}`)} zuzenean, zein puntu dagokio ${math(`t=${t}`)} balioari?`,
        `En la recta ${math(`r\\colon\\ ${line}`)}, ¿qué punto corresponde a ${math(`t=${t}`)}?`,
        `في المستقيم ${math(`r\\colon\\ ${line}`)}، ما النقطة الموافقة لـ${math(`t=${t}`)}؟`
    ), options(random, ofPair(right), [
        wrong(ofPair(p), 'only-point'),
        wrong(ofPair(times(t, d)), 'only-vector'),
        wrong(ofPair(minus(p, times(t, d))), 'sign'),
        ...nearPairs(right)
    ]), null, `${pairLatex(p)}+${t < 0 ? `(${t})` : t}\\cdot${pairLatex(d)}=${pairLatex(right)}`, { px: p[0], py: p[1], dx: d[0], dy: d[1], t })
}

function explicitQuestion(random: Random, tier: Tier): VectorsRaceQuestion | null {
    const a = randomPoint(random, 0)
    const dx = nonZero(random, 2)
    const m = nonZero(random, tier === 0 ? 2 : 3)
    const b = plus(a, [dx, m * dx])
    const n = f(a[1] - m * a[0])
    const flipped = fraction(1, m)
    return build(2, 'explicit', say(
        `Zein da ${math(named('A', a))} eta ${math(named('B', b))} puntuetatik igarotzen den zuzenaren ekuazio esplizitua?`,
        `¿Cuál es la ecuación explícita de la recta que pasa por ${math(named('A', a))} y ${math(named('B', b))}?`,
        `ما المعادلة الصريحة للمستقيم المار بـ${math(named('A', a))} و${math(named('B', b))}؟`
    ), options(random, ofExplicit(f(m), n), [
        wrong(ofExplicit(flipped, subtract(f(a[1]), multiply(flipped, f(a[0])))), 'inverse'),
        wrong(ofExplicit(f(m), f(-n.numerator)), 'sign'),
        wrong(ofExplicit(f(-m), f(a[1] + m * a[0])), 'sign'),
        wrong(ofExplicit(f(m), add(n, f(1))), 'calculation'),
        wrong(ofExplicit(f(m), add(n, f(-1))), 'calculation')
    ]), null, `m=\\frac{${m * dx}}{${dx}}=${m},\\ n=${toLatex(n)}\\ \\to\\ ${explicitLatex(f(m), n)}`, { ax: a[0], ay: a[1], bx: b[0], by: b[1] })
}

/* ---------- Circuit 3: positions ---------- */

const SLOPES: FractionValue[] = [f(2), f(3), f(-2), f(-1), fraction(1, 2), fraction(-1, 3), fraction(2, 3), fraction(-3, 4), fraction(3, 2), f(4)]

function slopePositionQuestion(random: Random, tier: Tier): VectorsRaceQuestion | null {
    const m = pick(random, SLOPES.slice(0, tier === 0 ? 4 : SLOPES.length))
    const n = nonZero(random, 5)
    const ask = randomInt(random, 0, tier === 0 ? 0 : 1)
    const perpendicular = divide(f(-1), m)
    const right = ask === 0 ? m : perpendicular
    const line = math(`r\\colon ${explicitLatex(m, f(n))}`)
    const prompt = ask === 0
        ? say(`Zein da ${line} zuzenarekiko paraleloa den zuzen baten malda?`, `¿Qué pendiente tiene una recta paralela a ${line}?`, `ما ميل مستقيم موازٍ لـ${line}؟`)
        : say(`Zein da ${line} zuzenarekiko perpendikularra den zuzen baten malda?`, `¿Qué pendiente tiene una recta perpendicular a ${line}?`, `ما ميل مستقيم عمودي على ${line}؟`)
    return build(3, 'slope-position', prompt, options(random, ofNumber(right), [
        wrong(ofNumber(ask === 0 ? perpendicular : m), ask === 0 ? 'perpendicular' : 'parallel'),
        wrong(ofNumber(divide(f(1), m)), 'inverse'),
        wrong(ofNumber(multiply(f(-1), m)), 'sign'),
        ...nearNumbers(right)
    ]), right, ask === 0 ? `m'=m=${toLatex(m)}` : `m'=-\\frac{1}{m}=${toLatex(right)}`, { m: m.numerator, q: m.denominator, n, ask })
}

function crossingQuestion(random: Random, tier: Tier): VectorsRaceQuestion | null {
    const x = randomPoint(random, tier)
    const m1 = nonZero(random, 3)
    const m2 = nonZero(random, 3)
    if (m1 === m2) return null
    const n1 = x[1] - m1 * x[0]
    const n2 = x[1] - m2 * x[0]
    const r = math(`r\\colon ${explicitLatex(f(m1), f(n1))}`)
    const s = math(`s\\colon ${explicitLatex(f(m2), f(n2))}`)
    return build(3, 'crossing', say(
        `Zein puntutan ebakitzen dute elkar ${r} eta ${s} zuzenek?`,
        `¿En qué punto se cortan ${r} y ${s}?`,
        `في أي نقطة يتقاطع ${r} و${s}؟`
    ), options(random, ofPair(x), [wrong(ofPair([x[1], x[0]]), 'swap'), ...nearPairs(x)]), null, `${sumLatex([[m1, 'x'], [n1, '']])}=${sumLatex([[m2, 'x'], [n2, '']])}\\ \\to\\ x=${x[0]},\\ y=${x[1]}`, { m1, n1, m2, n2 })
}

function parameterQuestion(random: Random, tier: Tier): VectorsRaceQuestion | null {
    const a1 = randomInt(random, 1, 4)
    const b1 = nonZero(random, 4)
    const c1 = nonZero(random, 6)
    const factor = pick(random, [2, 3, -1, -2])
    const a2 = factor * a1
    const c2 = nonZero(random, 6)
    const ask = randomInt(random, 0, tier === 0 ? 0 : 1)
    const parallelK = f(factor * b1)
    const perpendicularK = fraction(-a1 * a2, b1)
    const right = ask === 0 ? parallelK : perpendicularK
    const r = math(`r\\colon ${generalLatex(a1, b1, c1)}`)
    const s = math(`s\\colon ${sumLatex([[a2, 'x']])}+ky${c2 > 0 ? '+' : '-'}${Math.abs(c2)}=0`)
    const prompt = ask === 0
        ? say(`Zenbat da ${math('k')}, ${r} eta ${s} paraleloak izateko?`, `¿Cuánto vale ${math('k')} para que ${r} y ${s} sean paralelas?`, `ما قيمة ${math('k')} ليكون ${r} و${s} متوازيين؟`)
        : say(`Zenbat da ${math('k')}, ${r} eta ${s} perpendikularrak izateko?`, `¿Cuánto vale ${math('k')} para que ${r} y ${s} sean perpendiculares?`, `ما قيمة ${math('k')} ليكون ${r} و${s} متعامدين؟`)
    return build(3, 'parameter', prompt, options(random, ofNumber(right), [
        wrong(ofNumber(ask === 0 ? perpendicularK : parallelK), ask === 0 ? 'perpendicular' : 'parallel'),
        wrong(ofNumber(multiply(f(-1), right)), 'sign'),
        ...nearNumbers(right)
    ]), right, ask === 0 ? `\\frac{${a2}}{${a1}}=\\frac{k}{${b1}}\\ \\to\\ k=${toLatex(right)}` : `${a1}\\cdot${a2 < 0 ? `(${a2})` : a2}+${b1 < 0 ? `(${b1})` : b1}\\cdot k=0\\ \\to\\ k=${toLatex(right)}`, { a1, b1, a2, ask })
}

/* ---------- Circuit 4: applications ---------- */

function bisectorQuestion(random: Random, tier: Tier): VectorsRaceQuestion | null {
    const a = randomPoint(random, tier)
    const b = randomPoint(random, tier)
    const [dx, dy] = minus(b, a)
    if (dx === 0 || dy === 0) return null
    const right = fraction(-dx, dy)
    return build(4, 'bisector', say(
        `Zein da ${math(named('A', a))} eta ${math(named('B', b))} muturreko zuzenkiaren erdibitzailearen malda?`,
        `¿Qué pendiente tiene la mediatriz del segmento de extremos ${math(named('A', a))} y ${math(named('B', b))}?`,
        `ما ميل محور القطعة ذات الطرفين ${math(named('A', a))} و${math(named('B', b))}؟`
    ), options(random, ofNumber(right), [
        wrong(ofNumber(fraction(dy, dx)), 'parallel'),
        wrong(ofNumber(fraction(dx, dy)), 'sign'),
        wrong(ofNumber(fraction(-dy, dx)), 'inverse'),
        ...nearNumbers(right)
    ]), right, `m_{AB}=\\frac{${dy}}{${dx}}\\ \\to\\ m=-\\frac{1}{m_{AB}}=${toLatex(right)}`, { ax: a[0], ay: a[1], bx: b[0], by: b[1] })
}

function circleQuestion(random: Random, tier: Tier): VectorsRaceQuestion | null {
    const a = coordinate(random, 0)
    const b = coordinate(random, 0)
    const r = randomInt(random, 2, tier === 0 ? 5 : 9)
    const ask = randomInt(random, 0, 1)
    const equation = math(circleLatex(a, b, r * r))
    if (ask === 0) {
        if (a === 0 && b === 0) return null
        return build(4, 'circle-centre', say(
            `Zein da ${equation} zirkunferentziaren zentroa?`,
            `¿Cuál es el centro de la circunferencia ${equation}?`,
            `ما مركز الدائرة ${equation}؟`
        ), options(random, ofPair([a, b]), [wrong(ofPair([-a, -b]), 'sign'), wrong(ofPair([b, a]), 'swap'), ...nearPairs([a, b])]), null, `C${pairLatex([a, b])},\\ r=${r}`, { a, b, r, ask })
    }
    return build(4, 'circle-radius', say(
        `Zein da ${equation} zirkunferentziaren erradioa?`,
        `¿Cuál es el radio de la circunferencia ${equation}?`,
        `ما نصف قطر الدائرة ${equation}؟`
    ), options(random, ofNumber(f(r)), [wrong(ofNumber(f(r * r)), 'no-root'), ...nearNumbers(f(r))]), f(r), `r=\\sqrt{${r * r}}=${r}`, { a, b, r, ask })
}

function circleEquationQuestion(random: Random, tier: Tier): VectorsRaceQuestion | null {
    const a = coordinate(random, 0)
    const b = coordinate(random, 0)
    if (a === 0 && b === 0) return null
    const r = randomInt(random, 2, tier === 0 ? 4 : 7)
    return build(4, 'circle-equation', say(
        `Zein da ${math(named('C', [a, b]))} zentroa eta ${math(`r=${r}`)} erradioa dituen zirkunferentziaren ekuazioa?`,
        `¿Cuál es la ecuación de la circunferencia de centro ${math(named('C', [a, b]))} y radio ${math(`r=${r}`)}?`,
        `ما معادلة الدائرة التي مركزها ${math(named('C', [a, b]))} ونصف قطرها ${math(`r=${r}`)}؟`
    ), options(random, ofCircle(a, b, r * r), [
        wrong(ofCircle(-a, -b, r * r), 'sign'),
        wrong(ofCircle(a, b, r), 'no-square'),
        wrong(ofCircle(-a, -b, r), 'sign'),
        wrong(ofCircle(a, b, 2 * r), 'no-square')
    ]), null, circleLatex(a, b, r * r), { a, b, r })
}

function vertexQuestion(random: Random, tier: Tier): VectorsRaceQuestion | null {
    const a = randomPoint(random, tier)
    const b = randomPoint(random, tier)
    const c = randomPoint(random, tier)
    // Three points that are not aligned
    const ab = minus(b, a)
    const ac = minus(c, a)
    if (ab[0] * ac[1] - ab[1] * ac[0] === 0) return null
    const right = minus(plus(a, c), b)
    return build(4, 'vertex', say(
        `${math('ABCD')} paralelogramoa da, ${math(named('A', a))}, ${math(named('B', b))} eta ${math(named('C', c))} erpinekin. Zein da ${math('D')}?`,
        `${math('ABCD')} es un paralelogramo con ${math(named('A', a))}, ${math(named('B', b))} y ${math(named('C', c))}. ¿Cuál es ${math('D')}?`,
        `${math('ABCD')} متوازي أضلاع فيه ${math(named('A', a))} و${math(named('B', b))} و${math(named('C', c))}. ما ${math('D')}؟`
    ), options(random, ofPair(right), [
        wrong(ofPair(minus(plus(b, c), a)), 'order'),
        wrong(ofPair(minus(plus(a, b), c)), 'order'),
        ...nearPairs(right)
    ]), null, `D=A+\\vec{BC}=${pairLatex(a)}+${pairLatex(minus(c, b))}=${pairLatex(right)}`, { ax: a[0], ay: a[1], bx: b[0], by: b[1], cx: c[0], cy: c[1] })
}

/* ---------- Circuits ---------- */

type Generator = (random: Random, tier: Tier) => VectorsRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [vectorQuestion, modulusQuestion, combinationQuestion, parallelQuestion],
    [distanceQuestion, midpointQuestion, symmetricQuestion, alignedQuestion],
    [slopeQuestion, generalSlopeQuestion, interceptQuestion, parametricQuestion, explicitQuestion],
    [slopePositionQuestion, crossingQuestion, parameterQuestion, slopePositionQuestion],
    [bisectorQuestion, circleQuestion, circleEquationQuestion, vertexQuestion]
]

export function generateVectorsRaceQuestion(random: Random, circuit: number, tier: Tier, requireWritable = false): VectorsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 800; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next && (!requireWritable || next.writable)) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkVectorsPitAnswer(question: RaceQuestion<VectorsRaceError>, input: string): AnswerCheck {
    return checkAnswer(readVectorsAnswer(input), question.answer as FractionValue, question.answerForm)
}

export function vectorsParTime(circuit: number): number {
    return parTimeFor([13, 14, 15, 16, 15][circuit] ?? 14)
}

export const vectorsRaceErrorTips: Record<VectorsRaceError, LocalizedText> = {
    reversed: say('Alderantziz egin duzu: muturra ken jatorria, $\\vec{AB}=B-A$.', 'Lo has hecho al revés: extremo menos origen, $\\vec{AB}=B-A$.', 'عكست الترتيب: الطرف ناقص الأصل، $\\vec{AB}=B-A$.'),
    added: say('Puntuak ez dira batzen: bektorea muturra ken jatorria da.', 'Los puntos no se suman: el vector es extremo menos origen.', 'لا تُجمع النقاط: المتجه هو الطرف ناقص الأصل.'),
    scalar: say('Zenbakiak bi koordenatuak biderkatzen ditu: $k\\cdot(x,\\,y)=(kx,\\,ky)$.', 'El número multiplica las dos coordenadas: $k\\cdot(x,\\,y)=(kx,\\,ky)$.', 'العدد يضرب المركّبتين معًا: $k\\cdot(x,\\,y)=(kx,\\,ky)$.'),
    sign: say('Begiratu zeinuari: ken bat parentesi aurrean badago, barruko zeinu guztiak aldatzen ditu.', 'Mira el signo: un menos delante de un paréntesis cambia todos los signos de dentro.', 'انتبه للإشارة: الناقص أمام القوس يغيّر كل الإشارات داخله.'),
    'no-root': say('Hori karratua da: erro karratua falta da.', 'Eso es el cuadrado: falta la raíz cuadrada.', 'هذا هو المربع: ينقص الجذر التربيعي.'),
    'sum-sides': say('Koordenatuak ez dira batzen: $|\\vec{u}|=\\sqrt{x^{2}+y^{2}}$.', 'Las coordenadas no se suman: $|\\vec{u}|=\\sqrt{x^{2}+y^{2}}$.', 'لا تُجمع المركّبتان: $|\\vec{u}|=\\sqrt{x^{2}+y^{2}}$.'),
    perpendicular: say('Hori perpendikularra da. Paraleloak: koordenatu proportzionalak edo malda bera.', 'Eso es perpendicular. Paralelos: coordenadas proporcionales o la misma pendiente.', 'هذا عمودي. المتوازيان: مركّبات متناسبة أو الميل نفسه.'),
    parallel: say('Hori paraleloa da. Perpendikularra: $m\'=-\\frac{1}{m}$, edo biderkadura eskalarra 0.', 'Eso es paralelo. Perpendicular: $m\'=-\\frac{1}{m}$, o producto escalar 0.', 'هذا موازٍ. العمودي: $m\'=-\\frac{1}{m}$، أو الجداء السلمي 0.'),
    'no-half': say('Batu ondoren, zatitu 2z: $M=\\frac{A+B}{2}$.', 'Después de sumar, divide entre 2: $M=\\frac{A+B}{2}$.', 'بعد الجمع اقسم على 2: $M=\\frac{A+B}{2}$.'),
    'half-difference': say('Erdiko puntuan koordenatuak batzen dira, ez kentzen.', 'En el punto medio las coordenadas se suman, no se restan.', 'في المنتصف تُجمع الإحداثيات ولا تُطرح.'),
    midpoint: say('Hori $A$ eta $M$ puntuen erdikoa da; erdiko puntua $M$ bera da: $A\'=2M-A$.', 'Ese es el punto medio entre $A$ y $M$; el punto medio es el propio $M$: $A\'=2M-A$.', 'هذه منتصف $A$ و$M$؛ والمنتصف هو $M$ نفسها: $A\'=2M-A$.'),
    'vector-not-point': say('Hori $\\vec{AM}$ bektorea da, ez puntua: $A\'=M+\\vec{AM}=2M-A$.', 'Eso es el vector $\\vec{AM}$, no el punto: $A\'=M+\\vec{AM}=2M-A$.', 'هذا المتجه $\\vec{AM}$ لا النقطة: $A\'=M+\\vec{AM}=2M-A$.'),
    inverse: say('Malda alderantziz: ordenatuen kendura zati abzisen kendura, $m=\\frac{\\Delta y}{\\Delta x}$.', 'La pendiente al revés: diferencia de ordenadas entre diferencia de abscisas, $m=\\frac{\\Delta y}{\\Delta x}$.', 'الميل مقلوب: فرق الصادات على فرق السينات، $m=\\frac{\\Delta y}{\\Delta x}$.'),
    intercept: say('Hori jatorriko ordenatua da. Malda $-\\frac{A}{B}$ da.', 'Esa es la ordenada en el origen. La pendiente es $-\\frac{A}{B}$.', 'هذا الجزء المقطوع. الميل هو $-\\frac{A}{B}$.'),
    'only-point': say('Hori $t=0$ puntua da: gehitu $t\\cdot\\vec{d}$.', 'Ese es el punto de $t=0$: suma $t\\cdot\\vec{d}$.', 'هذه نقطة $t=0$: أضف $t\\cdot\\vec{d}$.'),
    'only-vector': say('$t\\cdot\\vec{d}$ bakarrik ez: hasierako puntua gehitu behar zaio.', 'No basta $t\\cdot\\vec{d}$: hay que sumarle el punto inicial.', 'لا يكفي $t\\cdot\\vec{d}$: يجب إضافة النقطة الابتدائية.'),
    swap: say('x eta y trukatu dituzu: lehenengo abzisa, gero ordenatua.', 'Has cambiado x e y: primero la abscisa y luego la ordenada.', 'بدّلت x وy: السينية أولًا ثم الصادية.'),
    'no-square': say('Eskuinean erradioaren karratua doa: $(x-a)^{2}+(y-b)^{2}=r^{2}$.', 'A la derecha va el radio al cuadrado: $(x-a)^{2}+(y-b)^{2}=r^{2}$.', 'في الطرف الأيمن مربع نصف القطر: $(x-a)^{2}+(y-b)^{2}=r^{2}$.'),
    order: say('Erpinak ordenan doaz: $ABCD$ paralelogramoan, $\\vec{AD}=\\vec{BC}$, beraz $D=A+C-B$.', 'Los vértices van en orden: en $ABCD$, $\\vec{AD}=\\vec{BC}$, así que $D=A+C-B$.', 'الرؤوس مرتبة: في $ABCD$ يكون $\\vec{AD}=\\vec{BC}$، إذن $D=A+C-B$.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.')
}
