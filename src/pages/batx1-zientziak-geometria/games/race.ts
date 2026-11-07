import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { generalLatex } from './lines.ts'

/* ==========================================================================
   Zuzenen lasterketa (Batxilergoa 1 · Zientziak): five circuits, one per
   stage — points (a coordinate of the midpoint, of a symmetric point, of
   a point a fraction of the way), lines (the slope, the y-intercept, the
   C of a line through a point), positions (k for parallel lines, k for
   perpendicular lines, a coordinate of the crossing), distances (point to
   line, between parallels, the reflection in x = k or y = k) and
   triangles (a coordinate of the centroid, the area, the third vertex
   from the centroid). The wrong options are the typical mistakes. Every
   question carries `meta`, the numbers the tests check it against.
   ========================================================================== */

export const BACH_GEOMETRY_RACE_CIRCUITS = 5

export type BachGeometryRaceError =
    | 'half-difference'
    | 'not-halved'
    | 'difference'
    | 'midpoint-taken'
    | 'sign'
    | 'from-origin'
    | 'other-end'
    | 'inverted'
    | 'wrong-axis'
    | 'swapped'
    | 'cross-ratio'
    | 'parallel-taken'
    | 'no-root'
    | 'coefficient-sum'
    | 'forgot-c'
    | 'foot-taken'
    | 'halves'
    | 'not-divided'
    | 'no-half'
    | 'two-times'
    | 'calculation'

export type BachGeometryRaceQuestion = RaceQuestion<BachGeometryRaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex.replace(/\{,\}/g, '.')}$` })
const wrap = (value: number) => (value < 0 ? `(${value})` : String(value))
const pair = ([x, y]: [number, number]) => `(${x},${y})`
const nonZero = (random: Random, limit: number) => pick(random, Array.from({ length: 2 * limit }, (_, index) => (index < limit ? index - limit : index - limit + 1)))

interface Candidate {
    value: FractionValue
    error: BachGeometryRaceError
}
const ratio = (p: number, q: number, error: BachGeometryRaceError): Candidate => ({ value: fraction(p, q), error })
const whole = (value: number, error: BachGeometryRaceError): Candidate => ratio(value, 1, error)
const nearby = (value: FractionValue): Candidate[] => [1, -1, 2, -2].map((step) => ({ value: fraction(value.numerator + step * value.denominator, value.denominator), error: 'calculation' as const }))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<BachGeometryRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: BachGeometryRaceError }> = []
    for (const candidate of [...candidates, ...nearby(right)]) {
        if (wrong.length === 3) break
        const latex = written(candidate.value)
        if (latex === null || latex === '-0' || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<BachGeometryRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): BachGeometryRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const FIRST = say('Zein da lehen koordenatua?', '¿Cuál es la primera coordenada?', 'ما الإحداثي الأول؟', 'What is the first coordinate?')
const SECOND = say('Zein da bigarren koordenatua?', '¿Cuál es la segunda coordenada?', 'ما الإحداثي الثاني؟', 'What is the second coordinate?')
/** A sentence followed by a question */
const then = (text: LocalizedText, what: LocalizedText) => say(`${text.eu} ${what.eu}`, `${text.es} ${what.es}`, `${text.ar} ${what.ar}`, `${text.en} ${what.en}`)
const coordinate = (index: number) => (index === 0 ? FIRST : SECOND)

/* ---------- 1. Points ---------- */

/** The midpoint of AB; the mistakes are half the difference and the sum */
function midpointQuestion(random: Random): BachGeometryRaceQuestion | null {
    const a: [number, number] = [randomInt(random, -6, 6), randomInt(random, -6, 6)]
    const b: [number, number] = [randomInt(random, -6, 6), randomInt(random, -6, 6)]
    const index = pick(random, [0, 1])
    const sum = a[index] + b[index]
    if (sum % 2 !== 0 || a[index] === b[index] || sum === 0) return null
    const answer = fraction(sum / 2)
    const choices = options(random, answer, [ratio(b[index] - a[index], 2, 'half-difference'), whole(sum, 'not-halved'), whole(b[index] - a[index], 'calculation')])
    const prompt = then(say(`$A${pair(a)}$ eta $B${pair(b)}$: erdiko puntua.`, `$A${pair(a)}$ y $B${pair(b)}$: el punto medio.`, `$A${pair(a)}$ و$B${pair(b)}$: المنتصف.`, `$A${pair(a)}$ and $B${pair(b)}$: the midpoint.`), coordinate(index))
    return choices && build(0, 'midpoint', prompt, choices, answer, same(`\\frac{${a[index]}+${wrap(b[index])}}{2}=${sum / 2}`), { a1: a[0], a2: a[1], b1: b[0], b2: b[1], index })
}

/** The symmetric point of A about P: 2P − A; the mistakes are P − A and the midpoint */
function symmetricQuestion(random: Random): BachGeometryRaceQuestion | null {
    const a: [number, number] = [randomInt(random, -5, 5), randomInt(random, -5, 5)]
    const p: [number, number] = [randomInt(random, -4, 4), randomInt(random, -4, 4)]
    const index = pick(random, [0, 1])
    const value = 2 * p[index] - a[index]
    if (a[index] === p[index] || a[index] === 0) return null
    const answer = fraction(value)
    const choices = options(random, answer, [whole(p[index] - a[index], 'difference'), ratio(a[index] + p[index], 2, 'midpoint-taken'), whole(2 * p[index] + a[index], 'sign')])
    const prompt = then(say(`$A${pair(a)}$ puntuaren simetrikoa $P${pair(p)}$ puntuarekiko.`, `El simétrico de $A${pair(a)}$ respecto de $P${pair(p)}$.`, `نظير $A${pair(a)}$ بالنسبة إلى $P${pair(p)}$.`, `The symmetric point of $A${pair(a)}$ about $P${pair(p)}$.`), coordinate(index))
    return choices && build(0, 'symmetric', prompt, choices, answer, same(`2\\cdot ${wrap(p[index])}-${wrap(a[index])}=${value}`), { a1: a[0], a2: a[1], p1: p[0], p2: p[1], index })
}

const FRACTIONS: Array<[number, number]> = [[1, 3], [2, 3], [1, 4], [3, 4], [1, 2]]

/** The point a fraction t of the way from A to B: A + t(B − A); the mistakes start from the origin or from B */
function divideQuestion(random: Random): BachGeometryRaceQuestion | null {
    const [tn, td] = pick(random, FRACTIONS)
    const a = randomInt(random, -5, 5)
    const step = nonZero(random, 3) * td
    const b = a + step
    if (Math.abs(b) > 12) return null
    const value = a + (tn * step) / td
    const answer = fraction(value)
    const choices = options(random, answer, [ratio(tn * b, td, 'from-origin'), ratio(a * td + (td - tn) * step, td, 'other-end'), ratio(a * td + tn * b, td, 'calculation')])
    const t = `\\frac{${tn}}{${td}}`
    const prompt = say(`$P=A+${t}\\,\\overrightarrow{AB}$, $A$ puntuaren lehen koordenatua $${a}$ eta $B$ puntuarena $${b}$ izanik. Zein da $P$ puntuaren lehen koordenatua?`, `$P=A+${t}\\,\\overrightarrow{AB}$, con primera coordenada $${a}$ en $A$ y $${b}$ en $B$. ¿Cuál es la primera coordenada de $P$?`, `$P=A+${t}\\,\\overrightarrow{AB}$ حيث الإحداثي الأول لـ $A$ هو $${a}$ ولـ $B$ هو $${b}$. ما الإحداثي الأول لـ $P$؟`, `$P=A+${t}\\,\\overrightarrow{AB}$, with first coordinate $${a}$ for $A$ and $${b}$ for $B$. What is the first coordinate of $P$?`)
    return choices && build(0, 'divide', prompt, choices, answer, same(`${a}+${t}\\cdot ${wrap(step)}=${value}`), { a, b, tn, td })
}

/* ---------- 2. The equations of a line ---------- */

const LINE_A = [1, 2, 3, 4, 5, 6]
const LINE_B = [-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6]

/** The slope −A/B; the mistakes are A/B and −B/A */
function slopeQuestion(random: Random): BachGeometryRaceQuestion | null {
    const A = pick(random, LINE_A)
    const B = pick(random, LINE_B)
    const C = randomInt(random, -9, 9)
    if (Math.abs(A) === Math.abs(B)) return null
    const answer = fraction(-A, B)
    const choices = options(random, answer, [ratio(A, B, 'sign'), ratio(-B, A, 'inverted'), ratio(B, A, 'inverted')])
    const prompt = say(`$${generalLatex({ A, B, C })}$. Zein da malda?`, `$${generalLatex({ A, B, C })}$. ¿Cuál es la pendiente?`, `$${generalLatex({ A, B, C })}$. ما الميل؟`, `$${generalLatex({ A, B, C })}$. What is the slope?`)
    return choices && build(1, 'slope', prompt, choices, answer, same(`m=-\\frac{A}{B}=-\\frac{${A}}{${B}}`), { A, B, C })
}

/** The y-intercept −C/B; the mistakes are C/B and −C/A */
function interceptQuestion(random: Random): BachGeometryRaceQuestion | null {
    const A = pick(random, LINE_A)
    const B = pick(random, LINE_B)
    const C = nonZero(random, 9)
    if (Math.abs(A) === Math.abs(B)) return null
    const answer = fraction(-C, B)
    const choices = options(random, answer, [ratio(C, B, 'sign'), ratio(-C, A, 'wrong-axis'), ratio(-B, C, 'calculation')])
    const prompt = say(`$${generalLatex({ A, B, C })}$. Non mozten du $Y$ ardatza?`, `$${generalLatex({ A, B, C })}$. ¿Dónde corta al eje $Y$?`, `$${generalLatex({ A, B, C })}$. أين يقطع المحور $Y$؟`, `$${generalLatex({ A, B, C })}$. Where does it cut the $Y$ axis?`)
    return choices && build(1, 'intercept', prompt, choices, answer, same(`x=0\\ \\to\\ y=-\\frac{${C}}{${B}}`), { A, B, C })
}

/** Ax + By + k = 0 through P: k = −(Ax₀ + By₀); the mistakes are the sign and the coordinates swapped */
function lineCQuestion(random: Random): BachGeometryRaceQuestion | null {
    const A = pick(random, LINE_A)
    const B = pick(random, LINE_B)
    const p: [number, number] = [nonZero(random, 5), nonZero(random, 5)]
    const value = -(A * p[0] + B * p[1])
    if (value === 0 || p[0] === p[1]) return null
    const answer = fraction(value)
    const choices = options(random, answer, [whole(-value, 'sign'), whole(-(A * p[1] + B * p[0]), 'swapped'), whole(-(A * p[0] - B * p[1]), 'calculation')])
    const shape = generalLatex({ A, B, C: 0 }).replace('=0', '+k=0')
    const prompt = say(`$${shape}$ zuzena $P${pair(p)}$ puntutik pasatzen da. Zenbat da $k$?`, `La recta $${shape}$ pasa por $P${pair(p)}$. ¿Cuánto vale $k$?`, `المستقيم $${shape}$ يمر بـ $P${pair(p)}$. كم يساوي $k$؟`, `The line $${shape}$ passes through $P${pair(p)}$. What is $k$?`)
    return choices && build(1, 'line-c', prompt, choices, answer, same(`${A}\\cdot ${wrap(p[0])}${B < 0 ? '' : '+'}${B}\\cdot ${wrap(p[1])}+k=0\\ \\to\\ k=${value}`), { A, B, p1: p[0], p2: p[1] })
}

/* ---------- 3. Positions ---------- */

/** kx + by + c = 0 parallel to a'x + b'y + c' = 0: k = a'b/b'; the mistakes are the sign and the ratio upside down */
function parallelKQuestion(random: Random): BachGeometryRaceQuestion | null {
    const b = nonZero(random, 4)
    const a2 = nonZero(random, 6)
    const b2 = nonZero(random, 4)
    if ((a2 * b) % b2 !== 0) return null
    const value = (a2 * b) / b2
    const c = randomInt(random, -5, 5)
    const c2 = randomInt(random, -5, 5)
    if (value * c2 === a2 * c) return null
    const answer = fraction(value)
    const choices = options(random, answer, [whole(-value, 'sign'), ratio(a2 * b2, b, 'cross-ratio'), ratio(-b * b2, a2, 'calculation')])
    const first = `kx${b < 0 ? '' : '+'}${b}y${c === 0 ? '' : c < 0 ? c : `+${c}`}=0`
    const second = generalLatex({ A: a2, B: b2, C: c2 })
    const prompt = say(`$${first}$ eta $${second}$ paraleloak dira. Zenbat da $k$?`, `$${first}$ y $${second}$ son paralelas. ¿Cuánto vale $k$?`, `$${first}$ و$${second}$ متوازيان. كم يساوي $k$؟`, `$${first}$ and $${second}$ are parallel. What is $k$?`)
    return choices && build(2, 'parallel-k', prompt, choices, answer, same(`\\frac{k}{${a2}}=\\frac{${b}}{${b2}}\\ \\to\\ k=${value}`), { b, a2, b2 })
}

/** kx + by + c = 0 perpendicular to a'x + b'y + c' = 0: ka' + bb' = 0; the mistakes are the sign and the parallel value */
function perpendicularKQuestion(random: Random): BachGeometryRaceQuestion | null {
    const b = nonZero(random, 4)
    const a2 = nonZero(random, 4)
    const b2 = nonZero(random, 6)
    if ((b * b2) % a2 !== 0) return null
    const value = -(b * b2) / a2
    if (value === 0) return null
    const answer = fraction(value)
    const choices = options(random, answer, [whole(-value, 'sign'), ratio(a2 * b, b2, 'parallel-taken'), ratio(-a2 * b2, b, 'calculation')])
    const first = `kx${b < 0 ? '' : '+'}${b}y=0`
    const second = generalLatex({ A: a2, B: b2, C: randomInt(random, -5, 5) })
    const prompt = say(`$${first}$ eta $${second}$ perpendikularrak dira. Zenbat da $k$?`, `$${first}$ y $${second}$ son perpendiculares. ¿Cuánto vale $k$?`, `$${first}$ و$${second}$ متعامدان. كم يساوي $k$؟`, `$${first}$ and $${second}$ are perpendicular. What is $k$?`)
    return choices && build(2, 'perpendicular-k', prompt, choices, answer, same(`${a2}k${b * b2 < 0 ? '' : '+'}${b * b2}=0\\ \\to\\ k=${value}`), { b, a2, b2 })
}

/** Where two lines cross: a coordinate of the solution; the mistakes are the other coordinate and the sign */
function crossingQuestion(random: Random): BachGeometryRaceQuestion | null {
    const x = randomInt(random, -5, 5)
    const y = randomInt(random, -5, 5)
    const [a1, b1] = [nonZero(random, 3), nonZero(random, 3)]
    const [a2, b2] = [nonZero(random, 3), nonZero(random, 3)]
    if (a1 * b2 === a2 * b1 || x === y || x === 0 || y === 0) return null
    const e1 = a1 * x + b1 * y
    const e2 = a2 * x + b2 * y
    const index = pick(random, [0, 1])
    const value = index === 0 ? x : y
    const answer = fraction(value)
    const choices = options(random, answer, [whole(index === 0 ? y : x, 'swapped'), whole(-value, 'sign'), whole(x + y, 'calculation')])
    const r = generalLatex({ A: a1, B: b1, C: -e1 })
    const s = generalLatex({ A: a2, B: b2, C: -e2 })
    const prompt = then(say(`$${r}$ eta $${s}$ zuzenen ebaki-puntua.`, `El punto de corte de $${r}$ y $${s}$.`, `نقطة تقاطع $${r}$ و$${s}$.`, `The crossing point of $${r}$ and $${s}$.`), coordinate(index))
    return choices && build(2, 'crossing', prompt, choices, answer, same(`(${x},${y})`), { a1, b1, e1, a2, b2, e2, index })
}

/* ---------- 4. Distances ---------- */

const NORMALS: Array<[number, number, number]> = [[3, 4, 5], [4, 3, 5], [3, -4, 5], [4, -3, 5], [5, 12, 13], [12, -5, 13], [6, 8, 10], [8, -6, 10]]

/** |Ax₀ + By₀ + C| / √(A² + B²); the mistakes are no root, A + B and forgetting C */
function pointLineQuestion(random: Random): BachGeometryRaceQuestion | null {
    const [A, B, length] = pick(random, NORMALS)
    const p: [number, number] = [randomInt(random, -4, 4), randomInt(random, -4, 4)]
    const value = nonZero(random, 2 * length)
    const C = value - (A * p[0] + B * p[1])
    if (Math.abs(C) > 50 || C === 0) return null
    const answer = fraction(Math.abs(value), length)
    if (written(answer) === null || written(answer)!.includes('frac')) return null
    const choices = options(random, answer, [ratio(Math.abs(value), length * length, 'no-root'), ratio(Math.abs(value), Math.abs(A) + Math.abs(B), 'coefficient-sum'), ratio(Math.abs(A * p[0] + B * p[1]), length, 'forgot-c')])
    const prompt = say(`$P${pair(p)}$ eta $${generalLatex({ A, B, C })}$. Zenbat da distantzia?`, `$P${pair(p)}$ y $${generalLatex({ A, B, C })}$. ¿Cuál es la distancia?`, `$P${pair(p)}$ و$${generalLatex({ A, B, C })}$. ما المسافة؟`, `$P${pair(p)}$ and $${generalLatex({ A, B, C })}$. What is the distance?`)
    return choices && build(3, 'point-line', prompt, choices, answer, same(`d=\\frac{|${value}|}{${length}}=${written(answer)}`), { A, B, C, p1: p[0], p2: p[1] })
}

/** Two parallels with the same A and B: |C − C′| / √(A² + B²) */
function parallelLinesQuestion(random: Random): BachGeometryRaceQuestion | null {
    const [A, B, length] = pick(random, NORMALS.slice(0, 6))
    const c1 = randomInt(random, -12, 12)
    const c2 = randomInt(random, -12, 12)
    if (c1 === c2 || c1 + c2 === 0 || c1 === -c2) return null
    const answer = fraction(Math.abs(c1 - c2), length)
    if (written(answer)!.includes('frac')) return null
    const choices = options(random, answer, [ratio(Math.abs(c1 + c2), length, 'sign'), ratio(Math.abs(c1 - c2), length * length, 'no-root'), whole(Math.abs(c1 - c2), 'calculation')])
    const r = generalLatex({ A, B, C: c1 })
    const s = generalLatex({ A, B, C: c2 })
    const prompt = say(`$${r}$ eta $${s}$. Zenbat da haien arteko distantzia?`, `$${r}$ y $${s}$. ¿Qué distancia hay entre ellas?`, `$${r}$ و$${s}$. ما المسافة بينهما؟`, `$${r}$ and $${s}$. How far apart are they?`)
    return choices && build(3, 'parallel-lines', prompt, choices, answer, same(`d=\\frac{|${c1}-${wrap(c2)}|}{${length}}=${written(answer)}`), { A, B, c1, c2 })
}

/** The reflection of P in x = k or y = k: 2k − p; the mistakes are the foot and k − p */
function reflectionQuestion(random: Random): BachGeometryRaceQuestion | null {
    const p: [number, number] = [randomInt(random, -5, 5), randomInt(random, -5, 5)]
    const k = nonZero(random, 4)
    const vertical = pick(random, [true, false])
    const own = vertical ? p[0] : p[1]
    if (own === k || own === 0) return null
    const value = 2 * k - own
    const answer = fraction(value)
    const choices = options(random, answer, [whole(k, 'foot-taken'), whole(k - own, 'difference'), whole(-own, 'calculation')])
    const mirror = vertical ? `x=${k}` : `y=${k}`
    const prompt = then(say(`$P${pair(p)}$ puntuaren simetrikoa $${mirror}$ zuzenarekiko.`, `El simétrico de $P${pair(p)}$ respecto de $${mirror}$.`, `نظير $P${pair(p)}$ بالنسبة إلى $${mirror}$.`, `The reflection of $P${pair(p)}$ in $${mirror}$.`), coordinate(vertical ? 0 : 1))
    return choices && build(3, 'reflection', prompt, choices, answer, same(`2\\cdot ${wrap(k)}-${wrap(own)}=${value}`), { own, k })
}

/* ---------- 5. Triangles ---------- */

/** A coordinate of the centroid: the mean of three; the mistakes divide by 2 or not at all */
function centroidQuestion(random: Random): BachGeometryRaceQuestion | null {
    const values = [randomInt(random, -6, 6), randomInt(random, -6, 6), randomInt(random, -6, 6)]
    const sum = values[0] + values[1] + values[2]
    if (sum % 3 !== 0 || sum === 0) return null
    const index = pick(random, [0, 1])
    const answer = fraction(sum / 3)
    const choices = options(random, answer, [ratio(sum, 2, 'halves'), whole(sum, 'not-divided'), ratio(values[0] + values[1], 2, 'calculation')])
    const other = [randomInt(random, -6, 6), randomInt(random, -6, 6), randomInt(random, -6, 6)]
    const points = values.map((value, at) => (index === 0 ? [value, other[at]] : [other[at], value]) as [number, number])
    const prompt = then(say(`$A${pair(points[0])}$, $B${pair(points[1])}$ eta $C${pair(points[2])}$ triangeluaren barizentroa.`, `El baricentro del triángulo $A${pair(points[0])}$, $B${pair(points[1])}$, $C${pair(points[2])}$.`, `مركز ثقل المثلث $A${pair(points[0])}$ و$B${pair(points[1])}$ و$C${pair(points[2])}$.`, `The centroid of the triangle $A${pair(points[0])}$, $B${pair(points[1])}$, $C${pair(points[2])}$.`), coordinate(index))
    return choices && build(4, 'centroid', prompt, choices, answer, same(`\\frac{${values[0]}+${wrap(values[1])}+${wrap(values[2])}}{3}=${sum / 3}`), { v1: values[0], v2: values[1], v3: values[2] })
}

/** The area of a triangle: half of |AB × AC|; the mistake forgets the half */
function areaQuestion(random: Random): BachGeometryRaceQuestion | null {
    const a: [number, number] = [randomInt(random, -3, 3), randomInt(random, -3, 3)]
    const u: [number, number] = [randomInt(random, 1, 6), randomInt(random, -2, 2)]
    const v: [number, number] = [randomInt(random, -2, 3), randomInt(random, 1, 6)]
    const cross = u[0] * v[1] - u[1] * v[0]
    if (cross === 0) return null
    const b: [number, number] = [a[0] + u[0], a[1] + u[1]]
    const c: [number, number] = [a[0] + v[0], a[1] + v[1]]
    const answer = fraction(Math.abs(cross), 2)
    const choices = options(random, answer, [whole(Math.abs(cross), 'no-half'), ratio(Math.abs(u[0] * v[1] + u[1] * v[0]), 2, 'calculation'), ratio(Math.abs(u[0] * v[0] + u[1] * v[1]), 2, 'calculation')])
    const prompt = say(`Zenbat da $A${pair(a)}$, $B${pair(b)}$ eta $C${pair(c)}$ triangeluaren azalera?`, `¿Cuál es el área del triángulo $A${pair(a)}$, $B${pair(b)}$, $C${pair(c)}$?`, `ما مساحة المثلث $A${pair(a)}$ و$B${pair(b)}$ و$C${pair(c)}$؟`, `What is the area of the triangle $A${pair(a)}$, $B${pair(b)}$, $C${pair(c)}$?`)
    return choices && build(4, 'area', prompt, choices, answer, same(`\\frac{|${u[0]}\\cdot ${wrap(v[1])}-${wrap(u[1])}\\cdot ${wrap(v[0])}|}{2}=${written(answer)}`), { u1: u[0], u2: u[1], v1: v[0], v2: v[1] })
}

/** The third vertex from the centroid: 3G − A − B; the mistakes use 2G or G */
function thirdVertexQuestion(random: Random): BachGeometryRaceQuestion | null {
    const a = randomInt(random, -5, 5)
    const b = randomInt(random, -5, 5)
    const g = randomInt(random, -3, 3)
    const value = 3 * g - a - b
    if (g === 0 || Math.abs(value) > 15) return null
    const answer = fraction(value)
    const choices = options(random, answer, [whole(2 * g - a - b, 'two-times'), whole(3 * g + a + b, 'sign'), whole(g - a - b, 'calculation')])
    const prompt = say(`Triangelu batean, $A$ puntuaren lehen koordenatua $${a}$ da, $B$ puntuarena $${b}$ eta barizentroarena $${g}$. Zein da $C$ puntuaren lehen koordenatua?`, `En un triángulo, la primera coordenada de $A$ es $${a}$, la de $B$ es $${b}$ y la del baricentro es $${g}$. ¿Cuál es la primera coordenada de $C$?`, `في مثلث، الإحداثي الأول لـ $A$ هو $${a}$ ولـ $B$ هو $${b}$ ولمركز الثقل $${g}$. ما الإحداثي الأول لـ $C$؟`, `In a triangle, the first coordinate of $A$ is $${a}$, that of $B$ is $${b}$ and that of the centroid is $${g}$. What is the first coordinate of $C$?`)
    return choices && build(4, 'third-vertex', prompt, choices, answer, same(`3\\cdot ${wrap(g)}-${wrap(a)}-${wrap(b)}=${value}`), { a, b, g })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => BachGeometryRaceQuestion | null>> = [
    [midpointQuestion, symmetricQuestion, divideQuestion],
    [slopeQuestion, interceptQuestion, lineCQuestion],
    [parallelKQuestion, perpendicularKQuestion, crossingQuestion],
    [pointLineQuestion, parallelLinesQuestion, reflectionQuestion],
    [centroidQuestion, areaQuestion, thirdVertexQuestion]
]

export function generateBachGeometryRaceQuestion(random: Random, circuit: number, tier: Tier): BachGeometryRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkBachGeometryPitAnswer(question: RaceQuestion<BachGeometryRaceError>, input: string): AnswerCheck {
    return checkAnswer(input.replace(/[°º]/g, ''), question.answer, question.answerForm)
}

export function bachGeometryParTime(circuit: number): number {
    return parTimeFor([12, 12, 14, 13, 13][circuit] ?? 13)
}

export const bachGeometryRaceErrorTips: Record<BachGeometryRaceError, LocalizedText> = {
    'half-difference': say('Erdiko puntua: batu eta zatitu bi, ez kendu.', 'Punto medio: suma y divide entre 2, no restes.', 'المنتصف: اجمع واقسم على 2 لا تطرح.', 'Midpoint: add and divide by 2, do not subtract.'),
    'not-halved': say('Erdiko puntua: batura zati bi.', 'Punto medio: la suma entre 2.', 'المنتصف: المجموع على 2.', 'Midpoint: the sum divided by 2.'),
    difference: say('Simetrikoa: A′ = 2P − A.', 'Simétrico: A′ = 2P − A.', 'النظير: A′ = 2P − A.', 'Symmetric point: A′ = 2P − A.'),
    'midpoint-taken': say('P da erdiko puntua; bilatzen duzuna beste muturra da.', 'P es el punto medio; lo que buscas es el otro extremo.', 'P هو المنتصف؛ ما تبحث عنه هو الطرف الآخر.', 'P is the midpoint; what you are looking for is the other end.'),
    sign: say('Kontuz zeinuarekin.', 'Cuidado con el signo.', 'انتبه للإشارة.', 'Watch the sign.'),
    'from-origin': say('A puntutik hasi: P = A + t · AB.', 'Empieza en A: P = A + t · AB.', 'ابدأ من A: ‏P = A + t · AB.', 'Start at A: P = A + t · AB.'),
    'other-end': say('t zatia A puntutik neurtzen da, ez B puntutik.', 'La fracción t se mide desde A, no desde B.', 'يُقاس الكسر t من A لا من B.', 'The fraction t is measured from A, not from B.'),
    inverted: say('Malda: −A / B, eta ez alderantziz.', 'Pendiente: −A / B, y no al revés.', 'الميل: ‏−A / B لا العكس.', 'Slope: −A / B, not the other way round.'),
    'wrong-axis': say('Y ardatzean x = 0 da: y = −C / B.', 'En el eje Y, x = 0: y = −C / B.', 'على المحور Y يكون x = 0: ‏y = −C / B.', 'On the Y axis, x = 0: y = −C / B.'),
    swapped: say('Ez trukatu koordenatuak: x lehenik, y gero.', 'No cambies las coordenadas de sitio: primero x, después y.', 'لا تبدّل الإحداثيين: x أولًا ثم y.', 'Do not swap the coordinates: x first, then y.'),
    'cross-ratio': say('Paraleloak: k / a′ = b / b′.', 'Paralelas: k / a′ = b / b′.', 'متوازيان: ‏k / a′ = b / b′.', 'Parallel: k / a′ = b / b′.'),
    'parallel-taken': say('Perpendikularrak: normalen biderkadura 0, ez proportzioa.', 'Perpendiculares: el producto de los normales es 0, no una proporción.', 'متعامدان: جداء الناظميين 0 لا تناسب.', 'Perpendicular: the product of the normals is 0, not a proportion.'),
    'no-root': say('Zatitu √(A² + B²) zenbakiaz, ez A² + B² zenbakiaz.', 'Divide entre √(A² + B²), no entre A² + B².', 'اقسم على √(A² + B²) لا على A² + B².', 'Divide by √(A² + B²), not by A² + B².'),
    'coefficient-sum': say('Izendatzailea normalaren modulua da, ez A + B.', 'El denominador es el módulo del normal, no A + B.', 'المقام طول الناظمي لا A + B.', 'The denominator is the length of the normal, not A + B.'),
    'forgot-c': say('Ordezkatu ekuazio osoan: Ax₀ + By₀ + C.', 'Sustituye en toda la ecuación: Ax₀ + By₀ + C.', 'عوّض في المعادلة كلها: Ax₀ + By₀ + C.', 'Substitute into the whole equation: Ax₀ + By₀ + C.'),
    'foot-taken': say('Hori oina da; simetrikoa beste aldean dago: 2 · k − p.', 'Eso es el pie; el simétrico está al otro lado: 2 · k − p.', 'هذا موقع العمود؛ النظير في الجهة الأخرى: 2 · k − p.', 'That is the foot; the reflection is on the other side: 2 · k − p.'),
    halves: say('Barizentroa: hiru erpinen batura zati hiru.', 'Baricentro: la suma de los tres vértices entre 3.', 'مركز الثقل: مجموع الرؤوس الثلاثة على 3.', 'Centroid: the sum of the three vertices divided by 3.'),
    'not-divided': say('Barizentroa batez bestekoa da: zatitu hiru.', 'El baricentro es una media: divide entre 3.', 'مركز الثقل متوسط: اقسم على 3.', 'The centroid is a mean: divide by 3.'),
    'no-half': say('Azalera: oinarria bider altuera zati bi.', 'Área: base por altura entre 2.', 'المساحة: القاعدة في الارتفاع على 2.', 'Area: base times height divided by 2.'),
    'two-times': say('A + B + C = 3G, beraz C = 3G − A − B.', 'A + B + C = 3G, así que C = 3G − A − B.', 'A + B + C = 3G إذن C = 3G − A − B.', 'A + B + C = 3G, so C = 3G − A − B.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
