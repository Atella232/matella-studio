import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { matrixLatex } from '../../batx2-zientziak-matrizeak/matrix.ts'
import { cofactor, cofactorSign, det, minor, sarrusTerms } from '../determinant.ts'

/* ==========================================================================
   Determinanteen lasterketa (Batxilergoa 2 · Zientziak): five circuits,
   one per stage — orders 2 and 3 (ad − bc, Sarrus, the x of an equation),
   properties (|kA| of order n, row operations, products and inverses),
   expansion (a cofactor, a line with zeros, order 4), rank (the rank by
   minors, the parameter that brings it down) and the inverse (an entry
   of A⁻¹ with cofactors, the m with no inverse, |X| from a matrix
   equation). The wrong options are the typical mistakes. Every question
   carries `meta`, the numbers the tests check it against.
   ========================================================================== */

export const DETERMINANTEAK_RACE_CIRCUITS = 5

export type DeterminanteakRaceError =
    | 'diagonal-sum'
    | 'sarrus-sign'
    | 'sign'
    | 'scalar-power'
    | 'minor-cofactor'
    | 'forgot-entry'
    | 'rows-counted'
    | 'reciprocal'
    | 'no-transpose'
    | 'calculation'

export type DeterminanteakRaceQuestion = RaceQuestion<DeterminanteakRaceError> & { meta: Record<string, number | number[][]> }

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex.replace(/\{,\}/g, '.')}$` })
const pm = (rows: number[][]) => matrixLatex(rows)
const vm = (rows: number[][]) => `\\begin{vmatrix}${rows.map((row) => row.join('&')).join('\\\\')}\\end{vmatrix}`
const bracket = (value: number) => (value < 0 ? `(${value})` : String(value))
const value = (input: FractionValue) => input.numerator / input.denominator
const detOf = (rows: number[][]) => value(det(rows))

interface Candidate {
    value: FractionValue
    error: DeterminanteakRaceError
}
const whole = (number: number, error: DeterminanteakRaceError): Candidate => ({ value: fraction(Math.round(number)), error })
const ratio = (p: number, q: number, error: DeterminanteakRaceError): Candidate => ({ value: fraction(p, q), error })
const nearby = (number: number): Candidate[] => [number + 1, number - 1, number + 2, -number].map((item) => ({ value: fraction(Math.round(item)), error: 'calculation' as const }))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<DeterminanteakRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: DeterminanteakRaceError }> = []
    for (const candidate of [...candidates, ...nearby(value(right))]) {
        if (wrong.length === 3) break
        const latex = written(candidate.value)
        if (latex === null || latex === '-0' || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<DeterminanteakRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number | number[][]>): DeterminanteakRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const small = (random: Random) => pick(random, [-3, -2, -1, 1, 2, 3, 4, 5])
const digit = (random: Random) => pick(random, [-2, -1, 0, 1, 2, 3])
const work = (formula: string) => say(`Kalkulatu $${formula}$.`, `Calcula $${formula}$.`, `احسب $${formula}$.`, `Work out $${formula}$.`)

/* ---------- Circuit 0: orders 2 and 3 ---------- */

/** |a b / c d| = ad − bc */
function twoQuestion(random: Random): DeterminanteakRaceQuestion | null {
    const a = [[small(random), small(random)], [small(random), small(random)]]
    const [[p, q], [r, s]] = a
    const answer = fraction(p * s - q * r)
    const choices = options(random, answer, [whole(p * s + q * r, 'diagonal-sum'), whole(q * r - p * s, 'sign'), whole(p * q - r * s, 'calculation')])
    return choices && build(0, 'two', work(vm(a)), choices, answer, same(`${vm(a)}=${bracket(p)}\\cdot ${bracket(s)}-${bracket(q)}\\cdot ${bracket(r)}=${p * s - q * r}`), { a })
}

/** A 3 × 3 determinant by Sarrus, with small numbers */
function sarrusQuestion(random: Random): DeterminanteakRaceQuestion | null {
    const a = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => digit(random)))
    const { plus, minus } = sarrusTerms(a)
    const P = plus.reduce((sum, item) => sum + item, 0)
    const M = minus.reduce((sum, item) => sum + item, 0)
    if (M === 0 || P === 0) return null
    const answer = fraction(P - M)
    const choices = options(random, answer, [whole(P + M, 'sarrus-sign'), whole(M - P, 'sign'), whole(P, 'calculation')])
    return choices && build(0, 'sarrus', work(vm(a)), choices, answer, same(`${vm(a)}=${bracket(P)}-${bracket(M)}=${P - M}`), { a })
}

/** |x b / c d| = v: x = (v + bc)/d */
function equationQuestion(random: Random): DeterminanteakRaceQuestion | null {
    const x = small(random)
    const b = small(random)
    const c = small(random)
    const d = pick(random, [1, 2, 3, -1, -2])
    const v = x * d - b * c
    const answer = fraction(x)
    const choices = options(random, answer, [ratio(v - b * c, d, 'sign'), ratio(v, d, 'calculation'), ratio(v + b * c, -d, 'sign')])
    const matrix = `\\begin{vmatrix}x&${b}\\\\${c}&${d}\\end{vmatrix}`
    return choices && build(0, 'equation', say(`Aurkitu $x$: $${matrix}=${v}$.`, `Halla $x$: $${matrix}=${v}$.`, `أوجد $x$: $${matrix}=${v}$.`, `Find $x$: $${matrix}=${v}$.`), choices, answer, same(`${d === 1 ? '' : d === -1 ? '-' : d}x-${bracket(b * c)}=${v}\\ \\to\\ x=${x}`), { b, c, d, v, x })
}

/* ---------- Circuit 1: properties ---------- */

/** |kA| = kⁿ|A| */
function scaleQuestion(random: Random): DeterminanteakRaceQuestion | null {
    const n = pick(random, [2, 3])
    const k = pick(random, [2, 3, -2])
    const d = pick(random, [2, 3, 4, 5, -1, -2])
    const answer = fraction(k ** n * d)
    const choices = options(random, answer, [whole(k * d, 'scalar-power'), whole(n * k * d, 'calculation'), whole(-(k ** n) * d, 'sign')])
    return choices && build(1, 'scale', say(`$A$ matrizea ${n}. ordenakoa da, eta $|A|=${d}$. Zenbat da $|${k}A|$?`, `$A$ es de orden ${n} y $|A|=${d}$. ¿Cuánto vale $|${k}A|$?`, `$A$ من الرتبة ${n} و$|A|=${d}$. كم يساوي $|${k}A|$؟`, `$A$ is of order ${n} and $|A|=${d}$. What is $|${k}A|$?`), choices, answer, same(`|${k}A|=${bracket(k)}^${n}\\cdot ${bracket(d)}=${k ** n * d}`), { n, k, d })
}

/** Two row operations on a 3 × 3: a swap (−1), a row times k (k), a multiple added (1) */
function rowsQuestion(random: Random): DeterminanteakRaceQuestion | null {
    const d = pick(random, [2, 3, 4, 5, -2, -3])
    const k = pick(random, [2, 3, 4])
    const t = pick(random, [2, 3, -1])
    const operations = shuffle(random, [
        { latex: 'E_1\\leftrightarrow E_3', factor: -1 },
        { latex: `${k}E_2`, factor: k },
        { latex: `E_2${t < 0 ? '-' : '+'}${Math.abs(t) === 1 ? '' : Math.abs(t)}E_1`, factor: 1 }
    ]).slice(0, 2)
    const factor = operations[0].factor * operations[1].factor
    const answer = fraction(factor * d)
    const choices = options(random, answer, [whole(-factor * d, 'sign'), whole(d, 'calculation'), whole(k * d * (factor < 0 ? 1 : -1), 'sign')])
    const chain = `A\\xrightarrow{${operations[0].latex}}\\ \\xrightarrow{${operations[1].latex}}B`
    return choices && build(1, 'rows', say(`$|A|=${d}$ eta $${chain}$. Zenbat da $|B|$?`, `$|A|=${d}$ y $${chain}$. ¿Cuánto vale $|B|$?`, `$|A|=${d}$ و$${chain}$. كم يساوي $|B|$؟`, `$|A|=${d}$ and $${chain}$. What is $|B|$?`), choices, answer, same(`|B|=${bracket(factor)}\\cdot ${bracket(d)}=${factor * d}`), { d, factor })
}

/** |AB^t|, |A⁻¹B|, |A²B| from |A| and |B| */
function productQuestion(random: Random): DeterminanteakRaceQuestion | null {
    const a = pick(random, [2, 3, 4, -2])
    const b = pick(random, [3, 5, 6, -3, 8])
    const kind = randomInt(random, 0, 2)
    const forms = [
        { latex: 'AB^t', p: a * b, q: 1, wrong: [whole(a + b, 'calculation'), ratio(a, b, 'calculation')] },
        { latex: 'A^{-1}B', p: b, q: a, wrong: [whole(a * b, 'reciprocal'), ratio(a, b, 'reciprocal')] },
        { latex: 'A^2B', p: a * a * b, q: 1, wrong: [whole(2 * a * b, 'calculation'), whole(a * b, 'calculation')] }
    ][kind]
    const answer = fraction(forms.p, forms.q)
    const choices = options(random, answer, [...forms.wrong, ratio(-forms.p, forms.q, 'sign')])
    const worked = kind === 0 ? `${bracket(a)}\\cdot ${bracket(b)}` : kind === 1 ? '|B|\\cdot\\frac{1}{|A|}' : `${bracket(a)}^2\\cdot ${bracket(b)}`
    return choices && build(1, 'product', say(`$|A|=${a}$ eta $|B|=${b}$. Zenbat da $|${forms.latex}|$?`, `$|A|=${a}$ y $|B|=${b}$. ¿Cuánto vale $|${forms.latex}|$?`, `$|A|=${a}$ و$|B|=${b}$. كم يساوي $|${forms.latex}|$؟`, `$|A|=${a}$ and $|B|=${b}$. What is $|${forms.latex}|$?`), choices, answer, same(`|${forms.latex}|=${worked}=${written(answer)}`), { a, b, kind })
}

/* ---------- Circuit 2: expansion ---------- */

/** A cofactor A_ij of a 3 × 3 */
function cofactorQuestion(random: Random): DeterminanteakRaceQuestion | null {
    const a = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => small(random)))
    const i = randomInt(random, 0, 2)
    const j = randomInt(random, 0, 2)
    const m = value(minor(a, i, j))
    if (m === 0) return null
    const c = value(cofactor(a, i, j))
    const answer = fraction(c)
    const choices = options(random, answer, [whole(-c, cofactorSign(i, j) === -1 ? 'minor-cofactor' : 'sign'), whole(value(cofactor(a, j, i)), 'calculation'), whole(a[i][j] * c, 'calculation')])
    const name = `A_{${i + 1}${j + 1}}`
    const rest = a.filter((_, r) => r !== i).map((row) => row.filter((_, k) => k !== j))
    return choices && build(2, 'cofactor', say(`$A=${pm(a)}$. Zenbat da $${name}$ adjuntua?`, `$A=${pm(a)}$. ¿Cuánto vale el adjunto $${name}$?`, `$A=${pm(a)}$. كم يساوي المتمم الجبري $${name}$؟`, `$A=${pm(a)}$. What is the cofactor $${name}$?`), choices, answer, same(`${name}=${cofactorSign(i, j) === 1 ? '' : '-'}${vm(rest)}=${c}`), { a, i, j })
}

/** A 3 × 3 with a column of one number: |A| = a·A_ij */
function lineQuestion(random: Random): DeterminanteakRaceQuestion | null {
    const j = randomInt(random, 0, 2)
    const i = randomInt(random, 0, 2)
    const a = Array.from({ length: 3 }, (_, r) => Array.from({ length: 3 }, (_, c) => (c === j ? (r === i ? pick(random, [2, 3, -2, 4]) : 0) : small(random))))
    const entry = a[i][j]
    const c = value(cofactor(a, i, j))
    const m = value(minor(a, i, j))
    if (c === 0) return null
    const answer = fraction(entry * c)
    const choices = options(random, answer, [whole(entry * m * (cofactorSign(i, j) === -1 ? 1 : -1), cofactorSign(i, j) === -1 ? 'minor-cofactor' : 'sign'), whole(c, 'forgot-entry'), whole(entry + c, 'calculation')])
    const rest = a.filter((_, r) => r !== i).map((row) => row.filter((_, k) => k !== j))
    return choices && build(2, 'line', work(vm(a)), choices, answer, same(`|A|=${bracket(entry)}\\cdot ${cofactorSign(i, j) === 1 ? '' : '(-1)\\cdot '}${vm(rest)}=${entry * c}`), { a })
}

/** A 4 × 4 in two blocks: the product of two 2 × 2 determinants */
function blockQuestion(random: Random): DeterminanteakRaceQuestion | null {
    const p = [[small(random), small(random)], [small(random), small(random)]]
    const q = [[small(random), small(random)], [small(random), small(random)]]
    const x = small(random)
    const y = small(random)
    const a = [[p[0][0], p[0][1], x, y], [p[1][0], p[1][1], y, x], [0, 0, q[0][0], q[0][1]], [0, 0, q[1][0], q[1][1]]]
    const dp = detOf(p)
    const dq = detOf(q)
    if (dp === 0 || dq === 0) return null
    const answer = fraction(dp * dq)
    const choices = options(random, answer, [whole(dp + dq, 'calculation'), whole(-dp * dq, 'sign'), whole(a[0][0] * a[1][1] * a[2][2] * a[3][3], 'calculation')])
    return choices && build(2, 'block', work(vm(a)), choices, answer, same(`|A|=${bracket(dp)}\\cdot ${bracket(dq)}=${dp * dq}`), { a })
}

/* ---------- Circuit 3: rank with minors ---------- */

/** The rank of a 3 × 3 built with rank 1, 2 or 3 */
function rankQuestion(random: Random): DeterminanteakRaceQuestion | null {
    const rank = randomInt(random, 1, 3)
    const e1 = [small(random), small(random), small(random)]
    const e2 = [small(random), small(random), small(random)]
    const s = pick(random, [1, 2, -1])
    const t = pick(random, [1, -1, 2])
    let rows: number[][]
    if (rank === 1) rows = [e1, e1.map((item) => s * item), e1.map((item) => t * item)]
    else if (rank === 2) rows = [e1, e2, e1.map((item, k) => s * item + t * e2[k])]
    else rows = [e1, e2, [small(random), small(random), small(random)]]
    const twoByTwo = [[rows[0][0], rows[0][1]], [rows[1][0], rows[1][1]]]
    const d = detOf(rows)
    if ((rank === 3) !== (d !== 0)) return null
    if (rank === 2 && [0, 1, 2].every((c) => rows[1][c] * rows[0][(c + 1) % 3] === rows[0][c] * rows[1][(c + 1) % 3])) return null
    if (rank === 2 && detOf(twoByTwo) === 0) return null
    const order = shuffle(random, [0, 1, 2])
    const shown = order.map((index) => rows[index])
    const answer = fraction(rank)
    const choices = options(random, answer, [0, 1, 2, 3].filter((item) => item !== rank).map((item) => whole(item, item === 3 ? 'rows-counted' : 'calculation')))
    const minorLatex = rank === 1 ? `${vm(twoByTwo)}=0` : rank === 2 ? `|A|=0,\\ ${vm(twoByTwo)}=${detOf(twoByTwo)}\\neq 0` : `|A|=${d}\\neq 0`
    return choices && build(3, 'rank', say(`Zein da $${pm(shown)}$ matrizearen heina?`, `¿Cuál es el rango de $${pm(shown)}$?`, `ما رتبة $${pm(shown)}$؟`, `What is the rank of $${pm(shown)}$?`), choices, answer, same(`${minorLatex}\\ \\to\\ \\operatorname{rg}=${rank}`), { rows: shown, rank })
}

/** (1 1 1 / 1 2 q / 1 r a): |A| = a − (q − 1)(r − 1) − 1 + … = 0 for one a */
function criticalQuestion(random: Random): DeterminanteakRaceQuestion | null {
    const q = pick(random, [3, 4, -1, 0, 2])
    const r = pick(random, [3, 5, -1, 2, 4])
    // |A| = 1(2a − qr) − 1(a − q) + 1(r − 2) = a − qr + q + r − 2
    const a = q * r - q - r + 2
    const rows = [[1, 1, 1], [1, 2, q], [1, r, a]]
    if (detOf(rows) !== 0) return null
    const answer = fraction(a)
    const choices = options(random, answer, [whole(q * r, 'calculation'), whole(-a, 'sign'), whole(a + 2, 'calculation')])
    const matrix = `\\begin{pmatrix}1&1&1\\\\1&2&${q}\\\\1&${r}&a\\end{pmatrix}`
    return choices && build(3, 'critical', say(`Zein $a$ baliotarako da 2 $${matrix}$ matrizearen heina?`, `¿Para qué $a$ tiene rango 2 $${matrix}$?`, `لأي $a$ تكون رتبة $${matrix}$ مساوية 2؟`, `For which $a$ does $${matrix}$ have rank 2?`), choices, answer, same(`|A|=a-${bracket(a)}=0\\ \\to\\ a=${a}`), { q, r, a })
}

/** (k 1 / c k) or (k c / 1 k): rank 1 when k² = c, k > 0 */
function squareQuestion(random: Random): DeterminanteakRaceQuestion | null {
    const k = pick(random, [2, 3, 4, 5])
    const c = k * k
    const matrix = pick(random, [`\\begin{pmatrix}k&1\\\\${c}&k\\end{pmatrix}`, `\\begin{pmatrix}k&${c}\\\\1&k\\end{pmatrix}`])
    const answer = fraction(k)
    const choices = options(random, answer, [whole(c, 'calculation'), whole(-k, 'sign'), ratio(c, 2, 'calculation')])
    return choices && build(3, 'square', say(`$k>0$ izanik, zein $k$ baliotarako da 1 $${matrix}$ matrizearen heina?`, `Con $k>0$, ¿para qué $k$ tiene rango 1 $${matrix}$?`, `مع $k>0$، لأي $k$ تكون رتبة $${matrix}$ مساوية 1؟`, `With $k>0$, for which $k$ does $${matrix}$ have rank 1?`), choices, answer, same(`k^2-${c}=0\\ \\to\\ k=${k}`), { k, c })
}

/* ---------- Circuit 4: the inverse ---------- */

const INVERTIBLE = [[[2, 1], [1, 1]], [[3, 1], [2, 1]], [[1, 2], [1, 3]], [[2, 3], [1, 2]], [[3, 2], [1, 1]], [[1, 1], [1, 2]], [[2, 5], [1, 3]], [[3, 1], [5, 2]], [[4, 1], [2, 1]], [[1, 3], [1, 5]], [[3, 1], [1, 1]], [[2, 1], [4, 4]]]

/** An entry of A⁻¹ = (1/|A|)(Adj A)ᵗ: (A⁻¹)_ij = A_ji/|A| */
function inverseQuestion(random: Random): DeterminanteakRaceQuestion | null {
    const a = pick(random, INVERTIBLE)
    const d = detOf(a)
    const i = randomInt(random, 0, 1)
    const j = randomInt(random, 0, 1)
    if (i === j) return null
    const right = value(cofactor(a, j, i))
    const answer = fraction(right, d)
    const choices = options(random, answer, [ratio(value(cofactor(a, i, j)), d, 'no-transpose'), ratio(-right, d, 'sign'), ratio(1, a[i][j], 'reciprocal')])
    const name = `(A^{-1})_{${i + 1}${j + 1}}`
    return choices && build(4, 'inverse', say(`$A=${pm(a)}$. Zenbat da $${name}$?`, `$A=${pm(a)}$. ¿Cuánto vale $${name}$?`, `$A=${pm(a)}$. كم يساوي $${name}$؟`, `$A=${pm(a)}$. What is $${name}$?`), choices, answer, same(`${name}=\\frac{A_{${j + 1}${i + 1}}}{|A|}=\\frac{${right}}{${d}}${d === 1 ? '' : `=${written(answer)}`}`), { a, i, j })
}

/** (m a / b m + c) with no inverse: m² + cm − ab = 0, the positive root */
function singularQuestion(random: Random): DeterminanteakRaceQuestion | null {
    const r1 = pick(random, [1, 2, 3, 4])
    const r2 = pick(random, [-1, -2, -3])
    if (r1 === -r2) return null
    const c = -(r1 + r2)
    const product = -r1 * r2
    const a = pick(random, [1, product])
    const b = product / a
    const corner = c === 0 ? 'm' : `m${c < 0 ? '-' : '+'}${Math.abs(c)}`
    const matrix = `\\begin{pmatrix}m&${a}\\\\${b}&${corner}\\end{pmatrix}`
    const answer = fraction(r1)
    const choices = options(random, answer, [whole(-r2, 'sign'), whole(r1 + 1, 'calculation'), whole(product, 'calculation')])
    return choices && build(4, 'singular', say(`Zein $m$ balio positibotarako ez du alderantzizkorik $${matrix}$ matrizeak?`, `¿Para qué valor positivo de $m$ no tiene inversa $${matrix}$?`, `لأي قيمة موجبة لـ $m$ ليس لـ $${matrix}$ معكوس؟`, `For which positive value of $m$ does $${matrix}$ have no inverse?`), choices, answer, same(`(m-${r1})(m+${-r2})=0\\ \\to\\ m=${r1}`), { a, b, c, r1, r2 })
}

/** |X| from AX = kB or XA = B with |A| and |B| of order n */
function detXQuestion(random: Random): DeterminanteakRaceQuestion | null {
    const n = pick(random, [2, 3])
    const a = pick(random, [2, 3, 4, -2])
    const b = pick(random, [6, 12, 8, -4, 24])
    const k = pick(random, [1, 2])
    const equation = k === 1 ? 'AX=B' : 'AX=2B'
    const p = k ** n * b
    const answer = fraction(p, a)
    const choices = options(random, answer, [ratio(a * b * k ** n, 1, 'reciprocal'), ratio(k * b, a, 'scalar-power'), ratio(-p, a, 'sign')])
    const result = written(answer)!
    return choices && build(4, 'det-x', say(`$${equation}$ da, ${n}. ordenako matrizeekin, $|A|=${a}$ eta $|B|=${b}$ izanik. Zenbat da $|X|$?`, `$${equation}$ con matrices de orden ${n}, $|A|=${a}$ y $|B|=${b}$. ¿Cuánto vale $|X|$?`, `$${equation}$ بمصفوفات من الرتبة ${n} مع $|A|=${a}$ و$|B|=${b}$. كم يساوي $|X|$؟`, `$${equation}$ with matrices of order ${n}, $|A|=${a}$ and $|B|=${b}$. What is $|X|$?`), choices, answer, same(`${bracket(a)}\\cdot|X|=${k === 1 ? '' : `2^${n}\\cdot `}${bracket(b)}\\ \\to\\ |X|=${result}`), { n, a, b, k })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => DeterminanteakRaceQuestion | null>> = [
    [twoQuestion, sarrusQuestion, equationQuestion],
    [scaleQuestion, rowsQuestion, productQuestion],
    [cofactorQuestion, lineQuestion, blockQuestion],
    [rankQuestion, criticalQuestion, squareQuestion],
    [inverseQuestion, singularQuestion, detXQuestion]
]

export function generateDeterminanteakRaceQuestion(random: Random, circuit: number, tier: Tier): DeterminanteakRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkDeterminanteakPitAnswer(question: RaceQuestion<DeterminanteakRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function determinanteakParTime(circuit: number): number {
    return parTimeFor([12, 13, 16, 15, 15][circuit] ?? 14)
}

export const determinanteakRaceErrorTips: Record<DeterminanteakRaceError, LocalizedText> = {
    'diagonal-sum': say('$ad-bc$: bigarren diagonala kendu egiten da, ez batu.', '$ad-bc$: la diagonal secundaria se resta, no se suma.', '$ad-bc$: يُطرح القطر الثانوي ولا يُجمع.', '$ad-bc$: the other diagonal is subtracted, not added.'),
    'sarrus-sign': say('Sarrusen, beste diagonalaren hiru biderkadurak kendu egiten dira.', 'En Sarrus, los tres productos de la otra diagonal restan.', 'في ساروس تُطرح حواصل القطر الآخر الثلاثة.', 'In Sarrus, the three products of the other diagonal subtract.'),
    sign: say('Kontuz zeinuarekin.', 'Cuidado con el signo.', 'انتبه للإشارة.', 'Watch the sign.'),
    'scalar-power': say('$|kA|=k^n|A|$: $k$ zenbakia errenkada bakoitzetik ateratzen da.', '$|kA|=k^n|A|$: la $k$ sale de cada fila.', '$|kA|=k^n|A|$: يخرج $k$ من كل صف.', '$|kA|=k^n|A|$: the $k$ comes out of every row.'),
    'minor-cofactor': say('Adjuntuak zeinua du: $A_{ij}=(-1)^{i+j}M_{ij}$.', 'El adjunto lleva signo: $A_{ij}=(-1)^{i+j}M_{ij}$.', 'للمتمم الجبري إشارة: $A_{ij}=(-1)^{i+j}M_{ij}$.', 'The cofactor carries a sign: $A_{ij}=(-1)^{i+j}M_{ij}$.'),
    'forgot-entry': say('Garapenean, elementu bakoitza bere adjuntuaz biderkatzen da.', 'Al desarrollar, cada elemento se multiplica por su adjunto.', 'عند النشر يُضرب كل عنصر في متممه الجبري.', 'When expanding, each entry is multiplied by its cofactor.'),
    'rows-counted': say('Errenkadak zenbatzea ez da nahikoa: begiratu menoreak.', 'Contar filas no basta: mira los menores.', 'عدّ الصفوف لا يكفي: انظر إلى المحددات الصغرى.', 'Counting rows is not enough: look at the minors.'),
    reciprocal: say('$|A^{-1}|=\\frac{1}{|A|}$: alderantzizkoaren determinantea zatitu egiten da.', '$|A^{-1}|=\\frac{1}{|A|}$: el determinante de la inversa divide.', '$|A^{-1}|=\\frac{1}{|A|}$: محدد المعكوس يقسم.', '$|A^{-1}|=\\frac{1}{|A|}$: the determinant of the inverse divides.'),
    'no-transpose': say('$A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$: ez ahaztu iraultzea.', '$A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$: no olvides trasponer.', '$A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$: لا تنسَ النقل.', '$A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$: do not forget to transpose.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
