import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { matrixLatex } from '../matrix.ts'

/* ==========================================================================
   Matrizeen lasterketa (Batxilergoa 2 · Zientziak): five circuits, one per
   stage — matrices (an entry a_ij, the rows of the transpose, the x that
   makes a matrix symmetric), operations (an entry of kA + B, an entry of
   AB, two-step paths of a graph), rank (the rank, the m that brings it
   down, the missing number of a combination), inverse and powers (an
   entry of A⁻¹, the k with no inverse, the corner of Aⁿ) and equations (an
   entry of X = A⁻¹B, X from X + Y and X − Y, the d of a commuting
   matrix). The wrong options are the typical mistakes. Every question
   carries `meta`, the numbers the tests check it against.
   ========================================================================== */

export const MATRIZEAK_RACE_CIRCUITS = 5

export type MatrizeakRaceError =
    | 'row-column-swapped'
    | 'entrywise'
    | 'sign'
    | 'scalar'
    | 'rows-counted'
    | 'reciprocal'
    | 'pattern'
    | 'side'
    | 'half'
    | 'calculation'

export type MatrizeakRaceQuestion = RaceQuestion<MatrizeakRaceError> & { meta: Record<string, number | number[][]> }

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex.replace(/\{,\}/g, '.')}$` })
const pm = (rows: number[][]) => matrixLatex(rows)
const bracket = (value: number) => (value < 0 ? `(${value})` : String(value))

interface Candidate {
    value: FractionValue
    error: MatrizeakRaceError
}
const whole = (value: number, error: MatrizeakRaceError): Candidate => ({ value: fraction(Math.round(value)), error })
const ratio = (p: number, q: number, error: MatrizeakRaceError): Candidate => ({ value: fraction(p, q), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, -value].map((item) => ({ value: fraction(Math.round(item)), error: 'calculation' as const }))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<MatrizeakRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: MatrizeakRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<MatrizeakRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number | number[][]>): MatrizeakRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const small = (random: Random) => pick(random, [-4, -3, -2, -1, 1, 2, 3, 4, 5])
const grid = (random: Random, rows: number, columns: number) => Array.from({ length: rows }, () => Array.from({ length: columns }, () => small(random)))
const mul = (a: number[][], b: number[][]) => a.map((row) => b[0].map((_, j) => row.reduce((sum, value, k) => sum + value * b[k][j], 0)))

/* ---------- Circuit 0: matrices and their kinds ---------- */

/** a_ij of a 2 × 3 matrix */
function entryQuestion(random: Random): MatrizeakRaceQuestion | null {
    const a = grid(random, 2, 3)
    const i = randomInt(random, 0, 1)
    const j = randomInt(random, 0, 2)
    const swapped = j <= 1 ? a[j][i] : a[1 - i][j]
    const answer = fraction(a[i][j])
    const choices = options(random, answer, [whole(swapped, 'row-column-swapped'), whole(a[1 - i][j], 'calculation'), whole(a[i][(j + 1) % 3], 'calculation')])
    const name = `a_{${i + 1}${j + 1}}`
    return choices && build(0, 'entry', say(`$A=${pm(a)}$. Zenbat da $${name}$?`, `$A=${pm(a)}$. ¿Cuánto vale $${name}$?`, `$A=${pm(a)}$. كم قيمة $${name}$؟`, `$A=${pm(a)}$. What is $${name}$?`), choices, answer, same(`${name}=${a[i][j]}`), { a, i, j })
}

/** The rows of the transpose of an m × n matrix */
function transposeQuestion(random: Random): MatrizeakRaceQuestion | null {
    const m = randomInt(random, 2, 6)
    const n = randomInt(random, 2, 6)
    if (m === n) return null
    const answer = fraction(n)
    const choices = options(random, answer, [whole(m, 'row-column-swapped'), whole(m * n, 'calculation'), whole(m + n, 'calculation')])
    return choices && build(0, 'transpose', say(`$A$ matrizea $${m}\\times ${n}$ da. Zenbat errenkada ditu $A^t$ matrizeak?`, `$A$ es $${m}\\times ${n}$. ¿Cuántas filas tiene $A^t$?`, `$A$ من الأبعاد $${m}\\times ${n}$. كم صفًّا في $A^t$؟`, `$A$ is $${m}\\times ${n}$. How many rows does $A^t$ have?`), choices, answer, same(`A^t\\ \\to\\ ${n}\\times ${m}`), { m, n })
}

/** x so that (p  x + c / d  q) is symmetric: x = d − c */
function symmetricQuestion(random: Random): MatrizeakRaceQuestion | null {
    const c = small(random)
    const d = small(random)
    const p = small(random)
    const q = small(random)
    const x = d - c
    const answer = fraction(x)
    const choices = options(random, answer, [whole(c - d, 'sign'), whole(d, 'calculation'), whole(d + c, 'sign')])
    const top = `x${c < 0 ? '-' : '+'}${Math.abs(c)}`
    return choices && build(0, 'symmetric', say(`Zein $x$ baliotarako da simetrikoa $\\begin{pmatrix}${p}&${top}\\\\${d}&${q}\\end{pmatrix}$?`, `¿Para qué $x$ es simétrica $\\begin{pmatrix}${p}&${top}\\\\${d}&${q}\\end{pmatrix}$?`, `لأي $x$ تكون $\\begin{pmatrix}${p}&${top}\\\\${d}&${q}\\end{pmatrix}$ متماثلة؟`, `For which $x$ is $\\begin{pmatrix}${p}&${top}\\\\${d}&${q}\\end{pmatrix}$ symmetric?`), choices, answer, same(`${top}=${d}\\ \\to\\ x=${x}`), { c, d, x })
}

/* ---------- Circuit 1: operations ---------- */

/** An entry of kA + B */
function sumQuestion(random: Random): MatrizeakRaceQuestion | null {
    const a = grid(random, 2, 2)
    const b = grid(random, 2, 2)
    const k = pick(random, [2, 3, -2, -1])
    const i = randomInt(random, 0, 1)
    const j = randomInt(random, 0, 1)
    const value = k * a[i][j] + b[i][j]
    const answer = fraction(value)
    const choices = options(random, answer, [whole(a[i][j] + b[i][j], 'scalar'), whole(k * (a[i][j] + b[i][j]), 'scalar'), whole(k * a[i][j] - b[i][j], 'sign')])
    const name = `(${k}A+B)_{${i + 1}${j + 1}}`
    return choices && build(1, 'sum', say(`$A=${pm(a)}$, $B=${pm(b)}$. Zenbat da $${name}$?`, `$A=${pm(a)}$, $B=${pm(b)}$. ¿Cuánto vale $${name}$?`, `$A=${pm(a)}$ و$B=${pm(b)}$. كم قيمة $${name}$؟`, `$A=${pm(a)}$, $B=${pm(b)}$. What is $${name}$?`), choices, answer, same(`${k}\\cdot ${bracket(a[i][j])}+${bracket(b[i][j])}=${value}`), { a, b, k, i, j })
}

/** An entry of AB, row by column */
function productQuestion(random: Random): MatrizeakRaceQuestion | null {
    const a = grid(random, 2, 2)
    const b = grid(random, 2, 2)
    const i = randomInt(random, 0, 1)
    const j = randomInt(random, 0, 1)
    const value = mul(a, b)[i][j]
    const answer = fraction(value)
    const rowByRow = a[i][0] * b[j][0] + a[i][1] * b[j][1]
    const choices = options(random, answer, [whole(a[i][j] * b[i][j], 'entrywise'), whole(rowByRow, 'row-column-swapped'), whole(mul(b, a)[i][j], 'calculation')])
    const name = `c_{${i + 1}${j + 1}}`
    return choices && build(1, 'product', say(`$AB$ biderkaduran, $A=${pm(a)}$ eta $B=${pm(b)}$ izanik. Zenbat da $${name}$?`, `En $AB$, con $A=${pm(a)}$ y $B=${pm(b)}$. ¿Cuánto vale $${name}$?`, `في $AB$ مع $A=${pm(a)}$ و$B=${pm(b)}$. كم قيمة $${name}$؟`, `In $AB$, with $A=${pm(a)}$ and $B=${pm(b)}$. What is $${name}$?`), choices, answer, same(`${name}=${bracket(a[i][0])}\\cdot ${bracket(b[0][j])}+${bracket(a[i][1])}\\cdot ${bracket(b[1][j])}=${value}`), { a, b, i, j })
}

/** Two-step paths of a graph: (A²)_ij */
function pathsQuestion(random: Random): MatrizeakRaceQuestion | null {
    const a = Array.from({ length: 3 }, (_, i) => Array.from({ length: 3 }, (__, j) => (i !== j && random() < 0.6 ? 1 : 0)))
    const i = randomInt(random, 0, 2)
    const j = randomInt(random, 0, 2)
    const value = mul(a, a)[i][j]
    const answer = fraction(value)
    const choices = options(random, answer, [whole(a[i][j], 'entrywise'), whole(value + 1, 'calculation'), whole(a[i].reduce<number>((sum, item) => sum + item, 0), 'calculation')])
    return choices && build(1, 'paths', say(`Grafo baten matrizea $${pm(a)}$ da. Zenbat bi urratseko bide doaz ${i + 1} erpinetik ${j + 1} erpinera?`, `La matriz de un grafo es $${pm(a)}$. ¿Cuántos caminos de dos pasos van del vértice ${i + 1} al ${j + 1}?`, `مصفوفة بيان هي $${pm(a)}$. كم مسارًا بخطوتين من الرأس ${i + 1} إلى الرأس ${j + 1}؟`, `The matrix of a graph is $${pm(a)}$. How many two-step paths go from vertex ${i + 1} to vertex ${j + 1}?`), choices, answer, same(`(A^2)_{${i + 1}${j + 1}}=${a[i][0]}\\cdot ${a[0][j]}+${a[i][1]}\\cdot ${a[1][j]}+${a[i][2]}\\cdot ${a[2][j]}=${value}`), { a, i, j })
}

/* ---------- Circuit 2: rank ---------- */

/** The rank of a 3 × 3 matrix built with a chosen rank */
function rankQuestion(random: Random): MatrizeakRaceQuestion | null {
    const rank = randomInt(random, 1, 3)
    const first = [1, small(random), small(random)]
    const second = [0, pick(random, [1, 2, -1]), small(random)]
    const third = [0, 0, pick(random, [1, 2, 3, -2])]
    const p = small(random)
    const q = small(random)
    const rows = rank === 3 ? [first, second.map((v, j) => v + p * first[j]), third.map((v, j) => v + q * first[j])]
        : rank === 2 ? [first, second.map((v, j) => v + p * first[j]), first.map((v, j) => p * v + q * second[j])]
            : [first, first.map((v) => p * v), first.map((v) => q * v)]
    const answer = fraction(rank)
    const choices = options(random, answer, [whole(3, 'rows-counted'), whole(rank === 1 ? 2 : rank - 1, 'calculation'), whole(rank === 3 ? 2 : rank + 1, 'calculation'), whole(0, 'calculation')])
    return choices && build(2, 'rank', say(`Zein da $${pm(rows)}$ matrizearen heina?`, `¿Cuál es el rango de $${pm(rows)}$?`, `ما رتبة $${pm(rows)}$؟`, `What is the rank of $${pm(rows)}$?`), choices, answer, same(`\\operatorname{rg}=${rank}`), { rows, rank })
}

/** (a b / c m) has rank 1 when m = bc/a */
function criticalQuestion(random: Random): MatrizeakRaceQuestion | null {
    const a = pick(random, [1, 2, -1])
    const b = small(random)
    const t = small(random)
    const c = a * t
    const m = b * t
    const answer = fraction(m)
    const choices = options(random, answer, [whole(-m, 'sign'), whole(b + c, 'calculation'), ratio(b, t, 'calculation')])
    return choices && build(2, 'critical', say(`Zein $m$ baliotarako du 1 heina $\\begin{pmatrix}${a}&${b}\\\\${c}&m\\end{pmatrix}$ matrizeak?`, `¿Con qué $m$ tiene rango 1 $\\begin{pmatrix}${a}&${b}\\\\${c}&m\\end{pmatrix}$?`, `مع أي $m$ تكون رتبة $\\begin{pmatrix}${a}&${b}\\\\${c}&m\\end{pmatrix}$ مساوية 1؟`, `For which $m$ does $\\begin{pmatrix}${a}&${b}\\\\${c}&m\\end{pmatrix}$ have rank 1?`), choices, answer, same(`E_2=${t}E_1\\ \\to\\ m=${t}\\cdot ${bracket(b)}=${m}`), { a, b, c, m, t })
}

/** (1, x, k): the third row of (1 0 p / 0 1 q / s t k) as sE1 + tE2 gives k = sp + tq */
function combinationQuestion(random: Random): MatrizeakRaceQuestion | null {
    const p = small(random)
    const q = small(random)
    const s = small(random)
    const t = small(random)
    const k = s * p + t * q
    const answer = fraction(k)
    const choices = options(random, answer, [whole(s * q + t * p, 'row-column-swapped'), whole(s + t + p + q, 'calculation'), whole(s * p - t * q, 'sign')])
    const rows = `\\begin{pmatrix}1&0&${p}\\\\0&1&${q}\\\\${s}&${t}&k\\end{pmatrix}`
    return choices && build(2, 'combination', say(`Zein $k$ baliotarako da 2 $${rows}$ matrizearen heina?`, `¿Con qué $k$ el rango de $${rows}$ es 2?`, `مع أي $k$ تكون رتبة $${rows}$ مساوية 2؟`, `For which $k$ is the rank of $${rows}$ equal to 2?`), choices, answer, same(`E_3=${s}E_1${t < 0 ? '-' : '+'}${Math.abs(t)}E_2\\ \\to\\ k=${bracket(s)}\\cdot ${bracket(p)}+${bracket(t)}\\cdot ${bracket(q)}=${k}`), { p, q, s, t, k })
}

/* ---------- Circuit 3: inverse and powers ---------- */

const UNIMODULAR = [[[2, 1], [1, 1]], [[3, 1], [2, 1]], [[1, 2], [1, 3]], [[2, 3], [1, 2]], [[3, 2], [1, 1]], [[1, 1], [1, 2]], [[2, 5], [1, 3]], [[3, 1], [5, 2]], [[4, 3], [1, 1]], [[1, 3], [1, 4]]]

/** An entry of the inverse of a matrix with determinant 1 */
function inverseQuestion(random: Random): MatrizeakRaceQuestion | null {
    const a = pick(random, UNIMODULAR)
    const inv = [[a[1][1], -a[0][1]], [-a[1][0], a[0][0]]]
    const i = randomInt(random, 0, 1)
    const j = randomInt(random, 0, 1)
    const answer = fraction(inv[i][j])
    const choices = options(random, answer, [ratio(1, a[i][j], 'reciprocal'), whole(a[i][j], 'calculation'), whole(-inv[i][j], 'sign')])
    const name = `(A^{-1})_{${i + 1}${j + 1}}`
    return choices && build(3, 'inverse', say(`$A=${pm(a)}$. Zenbat da $${name}$?`, `$A=${pm(a)}$. ¿Cuánto vale $${name}$?`, `$A=${pm(a)}$. كم قيمة $${name}$؟`, `$A=${pm(a)}$. What is $${name}$?`), choices, answer, same(`A^{-1}=${pm(inv)}`), { a, inv, i, j })
}

/** (a b / k d) has no inverse when its rows are proportional: k = ad/b */
function singularQuestion(random: Random): MatrizeakRaceQuestion | null {
    const b = pick(random, [1, 2, -1, 3])
    const t = small(random)
    const a = small(random)
    const d = b * t
    const k = a * t
    const answer = fraction(k)
    const choices = options(random, answer, [whole(-k, 'sign'), ratio(b * d, a, 'calculation'), whole(a + d, 'calculation')])
    return choices && build(3, 'singular', say(`Zein $k$ baliotarako ez du alderantzizkorik $\\begin{pmatrix}${a}&${b}\\\\k&${d}\\end{pmatrix}$ matrizeak?`, `¿Con qué $k$ no tiene inversa $\\begin{pmatrix}${a}&${b}\\\\k&${d}\\end{pmatrix}$?`, `مع أي $k$ ليس لـ $\\begin{pmatrix}${a}&${b}\\\\k&${d}\\end{pmatrix}$ معكوس؟`, `For which $k$ does $\\begin{pmatrix}${a}&${b}\\\\k&${d}\\end{pmatrix}$ have no inverse?`), choices, answer, same(`E_2=${t}E_1\\ \\to\\ k=${t}\\cdot ${bracket(a)}=${k}`), { a, b, d, k, t })
}

/** The corner of (1 a / 0 1)ⁿ: na */
function powerQuestion(random: Random): MatrizeakRaceQuestion | null {
    const a = pick(random, [2, 3, -2, 4, 5, -3])
    const n = pick(random, [5, 8, 10, 12, 20, 25, 50, 100])
    const answer = fraction(n * a)
    const choices = options(random, answer, [whole(a ** Math.min(n, 6), 'pattern'), whole(a + n, 'pattern'), whole((n - 1) * a, 'calculation')])
    return choices && build(3, 'power', say(`$A=\\begin{pmatrix}1&${a}\\\\0&1\\end{pmatrix}$. Zenbat da $A^{${n}}$ matrizearen goiko eskuineko elementua?`, `$A=\\begin{pmatrix}1&${a}\\\\0&1\\end{pmatrix}$. ¿Cuánto vale el elemento de arriba a la derecha de $A^{${n}}$?`, `$A=\\begin{pmatrix}1&${a}\\\\0&1\\end{pmatrix}$. كم قيمة العنصر في أعلى يمين $A^{${n}}$؟`, `$A=\\begin{pmatrix}1&${a}\\\\0&1\\end{pmatrix}$. What is the top-right entry of $A^{${n}}$?`), choices, answer, same(`A^n=\\begin{pmatrix}1&${a}n\\\\0&1\\end{pmatrix}\\ \\to\\ ${n}\\cdot ${bracket(a)}=${n * a}`), { a, n })
}

/* ---------- Circuit 4: equations ---------- */

/** AX = B with B a column: the first entry of X = A⁻¹B */
function solveQuestion(random: Random): MatrizeakRaceQuestion | null {
    const a = pick(random, UNIMODULAR)
    const x = [[small(random)], [small(random)]]
    const b = mul(a, x)
    const answer = fraction(x[0][0])
    const choices = options(random, answer, [whole(mul(a, b)[0][0], 'side'), ratio(b[0][0], a[0][0], 'calculation'), whole(x[1][0], 'calculation')])
    return choices && build(4, 'solve', say(`$AX=B$, $A=${pm(a)}$ eta $B=${pm(b)}$ izanik. Zenbat da $X$ matrizearen lehen elementua?`, `$AX=B$ con $A=${pm(a)}$ y $B=${pm(b)}$. ¿Cuánto vale el primer elemento de $X$?`, `$AX=B$ مع $A=${pm(a)}$ و$B=${pm(b)}$. كم قيمة العنصر الأول من $X$؟`, `$AX=B$ with $A=${pm(a)}$ and $B=${pm(b)}$. What is the first entry of $X$?`), choices, answer, same(`X=A^{-1}B=${pm(x)}`), { a, b, x })
}

/** X + Y = M, X − Y = N: an entry of X is (m + n)/2 */
function systemQuestion(random: Random): MatrizeakRaceQuestion | null {
    const x = grid(random, 2, 2)
    const y = grid(random, 2, 2)
    const m = x.map((row, i) => row.map((value, j) => value + y[i][j]))
    const n = x.map((row, i) => row.map((value, j) => value - y[i][j]))
    const i = randomInt(random, 0, 1)
    const j = randomInt(random, 0, 1)
    const answer = fraction(x[i][j])
    const choices = options(random, answer, [whole(m[i][j] + n[i][j], 'half'), ratio(m[i][j] - n[i][j], 2, 'sign'), whole(m[i][j], 'calculation')])
    const name = `x_{${i + 1}${j + 1}}`
    return choices && build(4, 'system', say(`$X+Y=${pm(m)}$ eta $X-Y=${pm(n)}$. Zenbat da $${name}$?`, `$X+Y=${pm(m)}$ y $X-Y=${pm(n)}$. ¿Cuánto vale $${name}$?`, `$X+Y=${pm(m)}$ و$X-Y=${pm(n)}$. كم قيمة $${name}$؟`, `$X+Y=${pm(m)}$ and $X-Y=${pm(n)}$. What is $${name}$?`), choices, answer, same(`2X=${pm(m.map((row, r) => row.map((value, c) => value + n[r][c])))}\\ \\to\\ ${name}=${x[i][j]}`), { m, n, x, i, j })
}

/** X = (a b / c d) commutes with (1 p / 0 q): c = 0 and d = a + (q − 1)b/p */
function commuteQuestion(random: Random): MatrizeakRaceQuestion | null {
    const p = pick(random, [1, 2, -1])
    const q = pick(random, [2, 3, -1, 0])
    const a = small(random)
    const b = p * randomInt(random, -2, 3)
    const d = a + ((q - 1) * b) / p
    if (!Number.isInteger(d)) return null
    const answer = fraction(d)
    const choices = options(random, answer, [whole(a + b, 'calculation'), whole(a - ((q - 1) * b) / p, 'sign'), whole(b, 'calculation')])
    const matrix = `\\begin{pmatrix}1&${p}\\\\0&${q}\\end{pmatrix}`
    return choices && build(4, 'commute', say(`$X=\\begin{pmatrix}${a}&${b}\\\\0&d\\end{pmatrix}$ matrizea $${matrix}$ matrizearekin trukatzen da. Zenbat da $d$?`, `$X=\\begin{pmatrix}${a}&${b}\\\\0&d\\end{pmatrix}$ conmuta con $${matrix}$. ¿Cuánto vale $d$?`, `$X=\\begin{pmatrix}${a}&${b}\\\\0&d\\end{pmatrix}$ تتبادل مع $${matrix}$. كم قيمة $d$؟`, `$X=\\begin{pmatrix}${a}&${b}\\\\0&d\\end{pmatrix}$ commutes with $${matrix}$. What is $d$?`), choices, answer, same(`${b}${p === 1 ? '+' : p === -1 ? '-' : `${p < 0 ? '-' : '+'}${Math.abs(p)}`}d=${bracket(p)}\\cdot ${bracket(a)}+${bracket(q)}\\cdot ${bracket(b)}\\ \\to\\ d=${d}`), { a, b, p, q, d })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => MatrizeakRaceQuestion | null>> = [
    [entryQuestion, transposeQuestion, symmetricQuestion],
    [sumQuestion, productQuestion, pathsQuestion],
    [rankQuestion, criticalQuestion, combinationQuestion],
    [inverseQuestion, singularQuestion, powerQuestion],
    [solveQuestion, systemQuestion, commuteQuestion]
]

export function generateMatrizeakRaceQuestion(random: Random, circuit: number, tier: Tier): MatrizeakRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkMatrizeakPitAnswer(question: RaceQuestion<MatrizeakRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function matrizeakParTime(circuit: number): number {
    return parTimeFor([11, 14, 14, 14, 15][circuit] ?? 14)
}

export const matrizeakRaceErrorTips: Record<MatrizeakRaceError, LocalizedText> = {
    'row-column-swapped': say('Lehenik errenkada, gero zutabea; eta biderkatzean, errenkada bider zutabe.', 'Primero la fila, después la columna; y al multiplicar, fila por columna.', 'الصف أولًا ثم العمود؛ وعند الضرب صفّ في عمود.', 'Row first, then column; and when multiplying, row by column.'),
    entrywise: say('Biderkadura ez da elementuz elementu: errenkada bider zutabe da.', 'El producto no es casilla a casilla: es fila por columna.', 'الضرب ليس عنصرًا في عنصر: إنه صفّ في عمود.', 'The product is not entry by entry: it is row by column.'),
    sign: say('Kontuz zeinuarekin.', 'Cuidado con el signo.', 'انتبه للإشارة.', 'Watch the sign.'),
    scalar: say('$k$ zenbakiak $A$ biderkatzen du bakarrik, ez $B$.', 'El número $k$ solo multiplica a $A$, no a $B$.', 'العدد $k$ يضرب $A$ فقط لا $B$.', 'The number $k$ only multiplies $A$, not $B$.'),
    'rows-counted': say('Mailakatu: errenkada batzuk besteen menpekoak dira.', 'Escalona: algunas filas dependen de otras.', 'حوّل إلى الشكل الدرجي: بعض الصفوف مرتبطة بغيرها.', 'Reduce it: some rows depend on others.'),
    reciprocal: say('Alderantzizkoa ez da zenbaki bakoitzaren alderantzizkoa.', 'La inversa no es el inverso de cada número.', 'المعكوس ليس مقلوب كل عدد.', 'The inverse is not the reciprocal of each number.'),
    pattern: say('Kalkulatu $A^2$ eta $A^3$: goiko eskuineko elementua batuz hazten da, ez biderkatuz.', 'Calcula $A^2$ y $A^3$: el elemento de arriba a la derecha crece sumando, no multiplicando.', 'احسب $A^2$ و$A^3$: العنصر في أعلى اليمين يكبر بالجمع لا بالضرب.', 'Work out $A^2$ and $A^3$: the top-right entry grows by adding, not multiplying.'),
    side: say('$X=A^{-1}B$: alderantzizkoaz biderkatu, ez $A$ matrizeaz.', '$X=A^{-1}B$: se multiplica por la inversa, no por $A$.', '$X=A^{-1}B$: نضرب في المعكوس لا في $A$.', '$X=A^{-1}B$: multiply by the inverse, not by $A$.'),
    half: say('Batzean $2X$ ateratzen da: zatitu 2 zenbakiaz.', 'Al sumar sale $2X$: divide entre 2.', 'بالجمع نحصل على $2X$: اقسم على 2.', 'Adding gives $2X$: divide by 2.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
