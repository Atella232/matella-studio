import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { generateMatrizeakRaceQuestion, matrizeakParTime, type MatrizeakRaceError, type MatrizeakRaceQuestion } from '../../batx2-zientziak-matrizeak/games/race.ts'
import { matrixLatex } from '../../batx2-zientziak-matrizeak/matrix.ts'

/* ==========================================================================
   Matrizeen lasterketa (Batxilergoa 2 · Gizarte Zientziak): the five
   circuits of the Ciencias twin, without what the Sociales books leave out
   (linear combinations, commuting matrices), and with questions of their
   own in half of the turns of circuits 1, 2 and 5: what a shop sold of a
   product (a table), what a shop takes in (Q times the prices), the parts
   of an order (a row times the recipe) and x of a system solved with A⁻¹.
   ========================================================================== */

export const GIZARTE_RACE_CIRCUITS = 5
/** Kinds of the twin that the Sociales books do not have */
export const LEFT_OUT_KINDS = ['combination', 'commute']

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex}$` })
const pm = (rows: number[][]) => matrixLatex(rows)
const col = (values: number[]) => matrixLatex(values.map((value) => [value]))

interface Candidate {
    value: number
    error: MatrizeakRaceError
}

/** The right option and three different mistakes */
function options(random: Random, right: number, candidates: Candidate[]): RaceOption<MatrizeakRaceError>[] | null {
    const rightLatex = written(fraction(right))!
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: MatrizeakRaceError }> = []
    for (const candidate of [...candidates, ...[right + 1, right - 1, right + 2, right + 10].map((value) => ({ value, error: 'calculation' as const }))]) {
        if (wrong.length === 3) break
        const latex = written(fraction(Math.round(candidate.value)))
        if (latex === null || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<MatrizeakRaceError>[], answer: number, solution: LocalizedText, meta: Record<string, number | number[][]>): MatrizeakRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer: fraction(answer) as FractionValue, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const amount = (random: Random) => randomInt(random, 2, 15)
const price = (random: Random) => randomInt(random, 2, 9)
const mul = (a: number[][], b: number[][]) => a.map((row) => b[0].map((_, j) => row.reduce((sum, value, k) => sum + value * b[k][j], 0)))

/** What shop i sold of product j, in a table with the shops in rows */
function tableQuestion(random: Random): MatrizeakRaceQuestion | null {
    const q = [0, 1].map(() => [amount(random), amount(random), amount(random)])
    const i = randomInt(random, 0, 1)
    const j = randomInt(random, 0, 1)
    const answer = q[i][j]
    const choices = options(random, answer, [{ value: q[j][i], error: 'row-column-swapped' }, { value: q[1 - i][j], error: 'calculation' }, { value: q[i][2], error: 'calculation' }])
    return choices && build(0, 'table', say(
        `$Q=${pm(q)}$: dendak errenkadetan, produktuak zutabeetan. Zenbat saldu du ${i + 1}. dendak ${j + 1}. produktutik?`,
        `$Q=${pm(q)}$: tiendas en filas, productos en columnas. ¿Cuánto vende la tienda ${i + 1} del producto ${j + 1}?`,
        `$Q=${pm(q)}$: المتاجر في الصفوف والمنتجات في الأعمدة. كم يبيع المتجر ${i + 1} من المنتج ${j + 1}؟`,
        `$Q=${pm(q)}$: shops in rows, products in columns. How much does shop ${i + 1} sell of product ${j + 1}?`
    ), choices, answer, same(`a_{${i + 1}${j + 1}}=${answer}`), { q, i, j })
}

/** What shop i takes in: its row of Q times the column of prices */
function incomeQuestion(random: Random): MatrizeakRaceQuestion | null {
    const q = [[amount(random), amount(random)], [amount(random), amount(random)]]
    const v = [price(random), price(random)]
    const i = randomInt(random, 0, 1)
    const answer = q[i][0] * v[0] + q[i][1] * v[1]
    const choices = options(random, answer, [{ value: q[0][i] * v[0] + q[1][i] * v[1], error: 'row-column-swapped' }, { value: q[i][0] * v[0], error: 'entrywise' }, { value: (q[i][0] + q[i][1]) * (v[0] + v[1]), error: 'calculation' }])
    return choices && build(1, 'income', say(
        `$Q=${pm(q)}$ (dendak × produktuak) eta prezioak $V=${col(v)}$. Zenbat jasotzen du ${i + 1}. dendak?`,
        `$Q=${pm(q)}$ (tiendas × productos) y precios $V=${col(v)}$. ¿Cuánto ingresa la tienda ${i + 1}?`,
        `$Q=${pm(q)}$ (المتاجر × المنتجات) والأسعار $V=${col(v)}$. كم إيراد المتجر ${i + 1}؟`,
        `$Q=${pm(q)}$ (shops × products) and prices $V=${col(v)}$. How much does shop ${i + 1} take in?`
    ), choices, answer, same(`${q[i][0]}\\cdot ${v[0]}+${q[i][1]}\\cdot ${v[1]}=${answer}`), { q, v: [v], i })
}

/** The parts of an order: the row of the order times the recipe */
function orderQuestion(random: Random): MatrizeakRaceQuestion | null {
    const order = [amount(random), amount(random)]
    const recipe = [[randomInt(random, 1, 6), randomInt(random, 1, 6)], [randomInt(random, 1, 6), randomInt(random, 1, 6)]]
    const j = randomInt(random, 0, 1)
    const answer = order[0] * recipe[0][j] + order[1] * recipe[1][j]
    const choices = options(random, answer, [{ value: order[0] * recipe[j][0] + order[1] * recipe[j][1], error: 'row-column-swapped' }, { value: order[j] * recipe[j][j], error: 'entrywise' }, { value: order[0] + order[1] + recipe[0][j] + recipe[1][j], error: 'calculation' }])
    return choices && build(1, 'order', say(
        `Eskaera: $${pm([order])}$ (mahaiak, aulkiak). Errezeta: $${pm(recipe)}$ (altzariak × piezak). Zenbat ${j + 1}. pieza behar dira?`,
        `Pedido: $${pm([order])}$ (mesas, sillas). Receta: $${pm(recipe)}$ (muebles × piezas). ¿Cuántas piezas ${j + 1} hacen falta?`,
        `الطلب: $${pm([order])}$ (طاولات، كراسٍ). الوصفة: $${pm(recipe)}$ (الأثاث × القطع). كم قطعة من النوع ${j + 1} نحتاج؟`,
        `Order: $${pm([order])}$ (tables, chairs). Recipe: $${pm(recipe)}$ (furniture × parts). How many parts ${j + 1} are needed?`
    ), choices, answer, same(`${order[0]}\\cdot ${recipe[0][j]}+${order[1]}\\cdot ${recipe[1][j]}=${answer}`), { order: [order], recipe, j })
}

/** 2 × 2 matrices with determinant 1: their inverses are whole numbers */
const UNIMODULAR = [[[2, 1], [1, 1]], [[3, 1], [2, 1]], [[1, 2], [1, 3]], [[2, 3], [1, 2]], [[3, 2], [1, 1]], [[1, 1], [1, 2]], [[2, 5], [1, 3]], [[3, 1], [5, 2]]]

/** x of AX = B, with A⁻¹ given */
function formQuestion(random: Random): MatrizeakRaceQuestion | null {
    const a = pick(random, UNIMODULAR)
    const x = [randomInt(random, 1, 7), randomInt(random, 1, 7)]
    if (x[0] === x[1]) return null
    const b = mul(a, x.map((value) => [value])).map((row) => row[0])
    const inverse = [[a[1][1], -a[0][1]], [-a[1][0], a[0][0]]]
    const answer = x[0]
    const choices = options(random, answer, [{ value: x[1], error: 'row-column-swapped' }, { value: a[0][0] * b[0] + a[0][1] * b[1], error: 'side' }, { value: inverse[0][0] * b[0] + inverse[1][0] * b[1], error: 'row-column-swapped' }])
    return choices && build(4, 'form', say(
        `$${pm(a)}\\begin{pmatrix}x\\\\y\\end{pmatrix}=${col(b)}$ eta $A^{-1}=${pm(inverse)}$. Zenbat da $x$?`,
        `$${pm(a)}\\begin{pmatrix}x\\\\y\\end{pmatrix}=${col(b)}$ y $A^{-1}=${pm(inverse)}$. ¿Cuánto vale $x$?`,
        `$${pm(a)}\\begin{pmatrix}x\\\\y\\end{pmatrix}=${col(b)}$ و$A^{-1}=${pm(inverse)}$. كم قيمة $x$؟`,
        `$${pm(a)}\\begin{pmatrix}x\\\\y\\end{pmatrix}=${col(b)}$ and $A^{-1}=${pm(inverse)}$. What is $x$?`
    ), choices, answer, same(`x=${inverse[0][0]}\\cdot ${b[0]}${inverse[0][1] < 0 ? '-' : '+'}${Math.abs(inverse[0][1])}\\cdot ${b[1]}=${answer}`), { a, b: [b], x: [x] })
}

const ownGenerators: Record<number, Array<(random: Random) => MatrizeakRaceQuestion | null>> = {
    0: [tableQuestion],
    1: [incomeQuestion, orderQuestion],
    4: [formQuestion]
}

export function generateGizarteRaceQuestion(random: Random, circuit: number, tier: Tier): MatrizeakRaceQuestion {
    const own = ownGenerators[circuit]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        if (own && random() < 0.5) {
            const next = pick(random, own)(random)
            if (next) return next
            continue
        }
        const next = generateMatrizeakRaceQuestion(random, circuit, tier)
        if (!LEFT_OUT_KINDS.includes(next.kind)) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkGizartePitAnswer(question: RaceQuestion<MatrizeakRaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export const gizarteParTime = matrizeakParTime
