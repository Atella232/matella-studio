import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { readStatisticsAnswer } from '../../dbh2-estatistika-v2/answers.ts'

/* ==========================================================================
   Estatistika bidimentsionalaren lasterketa (Batxilergoa 1 · Zientziak):
   five circuits, one per stage — tables (a conditional share, a marginal
   mean, the cell of independence), the cloud (a mean of the centre, the
   product of one point, the sum of the products), covariance and r
   (σxy from Σxy/N, r from σxy, σxy after a change of units), the lines
   (the slope of y on x, an estimate, r from the two slopes) and full
   problems (a cell of grouped data, σ² from two sums, ȳ from the line).
   The wrong options are the typical mistakes. Every question carries
   `meta`, the numbers the tests check it against.
   ========================================================================== */

export const BIVAR_RACE_CIRCUITS = 5

export type BivarRaceError =
    | 'total'
    | 'inverse'
    | 'absolute'
    | 'count'
    | 'equal'
    | 'divide'
    | 'sign'
    | 'means'
    | 'variance'
    | 'units'
    | 'sigma'
    | 'root'
    | 'frequency'
    | 'square'
    | 'intercept'
    | 'calculation'

export type BivarRaceQuestion = RaceQuestion<BivarRaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** A decimal for LaTeX with the comma (MathText writes the point in English; Arabic gets it from say) */
const tex = (value: number) => String(Math.round(value * 1000) / 1000).replace('.', '{,}')
const paren = (value: number) => (value < 0 ? `(${tex(value)})` : tex(value))
const short = (value: number) => Math.abs(value * 1000 - Math.round(value * 1000)) < 1e-9

interface Candidate {
    value: FractionValue
    error: BivarRaceError
}
const exact = (value: number, error: BivarRaceError): Candidate => ({ value: fraction(Math.round(value * 1000), 1000), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => exact(item, 'calculation'))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<BivarRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: BivarRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<BivarRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): BivarRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const all = (latex: string) => say(`$${latex}$`, `$${latex}$`, `$${latex}$`, `$${latex}$`)
const list = (values: number[]) => values.join(',\\ ')
const decimal = (value: number) => fraction(Math.round(value * 1000), 1000)

/* ---------- Circuit 0: two-way tables ---------- */

/** The share of «yes» in one row: f / row total */
function conditionalQuestion(random: Random): BivarRaceQuestion | null {
    const row = pick(random, [20, 25, 40, 50])
    const total = row + pick(random, [30, 50, 60])
    const count = randomInt(random, 2, row - 1)
    if (!short(count / row) || !short(count / total)) return null
    const answer = decimal(count / row)
    const choices = options(random, answer, [exact(count / total, 'total'), exact(row / count, 'inverse'), exact(count, 'absolute')])
    return choices && build(0, 'conditional', say(`$N=${total}$; errenkada batek ${row} ditu, eta haietatik ${count} «bai». Zer zati da «bai», errenkada horretan?`, `$N=${total}$; una fila tiene ${row}, y ${count} de ellos dicen «sí». ¿Qué parte es «sí» en esa fila?`, `$N=${total}$؛ في سطر ${row}، منهم ${count} «نعم». ما نصيب «نعم» في ذلك السطر؟`, `$N=${total}$; a row has ${row}, and ${count} of them say «yes». What share is «yes» in that row?`), choices, answer, all(`h=\\frac{${count}}{${row}}=${tex(count / row)}`), { count, row, total })
}

/** ȳ from the column totals of Y = 0, 1, 2 */
function marginalQuestion(random: Random): BivarRaceQuestion | null {
    const counts = [randomInt(random, 2, 9), randomInt(random, 2, 9), randomInt(random, 2, 9)]
    const total = counts[0] + counts[1] + counts[2]
    const sum = counts[1] + 2 * counts[2]
    if (!short(sum / total)) return null
    const answer = decimal(sum / total)
    const choices = options(random, answer, [exact(sum / 3, 'count'), exact(total / 3, 'count'), exact(sum, 'divide')])
    return choices && build(0, 'marginal', say(`$Y=0$, $Y=1$ eta $Y=2$ zutabeen guztizkoak: $${list(counts)}$. Zenbat da $\\bar{y}$?`, `Totales de las columnas $Y=0$, $Y=1$ e $Y=2$: $${list(counts)}$. ¿Cuánto vale $\\bar{y}$?`, `مجاميع الأعمدة $Y=0$ و$Y=1$ و$Y=2$: $${list(counts)}$. كم $\\bar{y}$؟`, `Totals of the columns $Y=0$, $Y=1$ and $Y=2$: $${list(counts)}$. What is $\\bar{y}$?`), choices, answer, all(`\\bar{y}=\\frac{0\\cdot ${counts[0]}+1\\cdot ${counts[1]}+2\\cdot ${counts[2]}}{${total}}=${tex(sum / total)}`), { a: counts[0], b: counts[1], c: counts[2] })
}

/** The cell that independence asks for: row · column / N */
function independentQuestion(random: Random): BivarRaceQuestion | null {
    const total = pick(random, [40, 50, 60, 80, 100])
    const row = randomInt(random, 2, 8) * 5
    const column = randomInt(random, 2, 8) * 5
    if (row >= total || column >= total) return null
    const cell = (row * column) / total
    if (!Number.isInteger(cell)) return null
    const answer = fraction(cell)
    const choices = options(random, answer, [exact(row / 2, 'equal'), exact(row * column, 'divide'), exact((row + column) / 2, 'equal')])
    return choices && build(0, 'independent', say(`Errenkada: ${row}; zutabea: ${column}; $N=${total}$. Zer gelaxkak ematen du independentzia?`, `Fila: ${row}; columna: ${column}; $N=${total}$. ¿Qué casilla da independencia?`, `السطر: ${row}؛ العمود: ${column}؛ $N=${total}$. ما الخانة التي تحقق الاستقلال؟`, `Row: ${row}; column: ${column}; $N=${total}$. What cell gives independence?`), choices, answer, all(`\\frac{${row}\\cdot ${column}}{${total}}=${cell}`), { row, column, total })
}

/* ---------- Circuit 1: the cloud ---------- */

/** ȳ of four points */
function centreQuestion(random: Random): BivarRaceQuestion | null {
    const ys = Array.from({ length: 4 }, () => randomInt(random, 1, 12))
    const xs = Array.from({ length: 4 }, () => randomInt(random, 1, 9))
    const sum = ys.reduce((total, value) => total + value, 0)
    if (sum % 4 !== 0) return null
    const answer = fraction(sum / 4)
    const xMean = xs.reduce((total, value) => total + value, 0) / 4
    const points = xs.map((x, index) => `(${x},\\,${ys[index]})`).join(',\\ ')
    const choices = options(random, answer, [exact(xMean, 'calculation'), exact(sum, 'divide'), exact(sum / 3, 'count')])
    return choices && build(1, 'centre', say(`Zenbat da $${points}$ puntuen $\\bar{y}$?`, `¿Cuánto vale $\\bar{y}$ en $${points}$?`, `كم $\\bar{y}$ للنقاط $${points}$؟`, `What is $\\bar{y}$ for $${points}$?`), choices, answer, all(`\\bar{y}=\\frac{${ys.join('+')}}{4}=${sum / 4}`), { sum })
}

/** (x − x̄)(y − ȳ) of one point */
function productQuestion(random: Random): BivarRaceQuestion | null {
    const mx = randomInt(random, 3, 8)
    const my = randomInt(random, 3, 9)
    const x = randomInt(random, 0, 11)
    const y = randomInt(random, 0, 12)
    const product = (x - mx) * (y - my)
    if (product === 0 || x === mx || y === my) return null
    const answer = fraction(product)
    const choices = options(random, answer, [exact(-product, 'sign'), exact(x - mx + y - my, 'calculation'), exact(x * y - mx * my, 'means')])
    return choices && build(1, 'product', say(`Zentroa $(${mx},\\,${my})$ da. Zenbat da $(${x},\\,${y})$ puntuaren $(x-\\bar{x})(y-\\bar{y})$?`, `El centro es $(${mx},\\,${my})$. ¿Cuánto vale $(x-\\bar{x})(y-\\bar{y})$ en $(${x},\\,${y})$?`, `المركز $(${mx},\\,${my})$. كم $(x-\\bar{x})(y-\\bar{y})$ للنقطة $(${x},\\,${y})$؟`, `The centre is $(${mx},\\,${my})$. What is $(x-\\bar{x})(y-\\bar{y})$ at $(${x},\\,${y})$?`), choices, answer, all(`(${x}-${mx})(${y}-${my})=${paren(x - mx)}\\cdot ${paren(y - my)}=${product}`), { mx, my, x, y })
}

/** σxy from five products (x − x̄)(y − ȳ) */
function productsQuestion(random: Random): BivarRaceQuestion | null {
    const products = Array.from({ length: 5 }, () => randomInt(random, -6, 9))
    const sum = products.reduce((total, value) => total + value, 0)
    if (sum === 0 || !products.some((value) => value < 0)) return null
    const answer = decimal(sum / 5)
    const absolute = products.reduce((total, value) => total + Math.abs(value), 0)
    const choices = options(random, answer, [exact(sum, 'divide'), exact(absolute / 5, 'sign'), exact(sum / 4, 'count')])
    return choices && build(1, 'products', say(`Bost punturen $(x-\\bar{x})(y-\\bar{y})$ biderkadurak: $${list(products)}$. Zenbat da $\\sigma_{xy}$?`, `Productos $(x-\\bar{x})(y-\\bar{y})$ de cinco puntos: $${list(products)}$. ¿Cuánto vale $\\sigma_{xy}$?`, `جداءات $(x-\\bar{x})(y-\\bar{y})$ لخمس نقاط: $${list(products)}$. كم $\\sigma_{xy}$؟`, `Products $(x-\\bar{x})(y-\\bar{y})$ of five points: $${list(products)}$. What is $\\sigma_{xy}$?`), choices, answer, all(`\\sigma_{xy}=\\frac{${sum}}{5}=${tex(sum / 5)}`), { sum })
}

/* ---------- Circuit 2: covariance and correlation ---------- */

/** σxy = Σxy/N − x̄ȳ */
function covarianceQuestion(random: Random): BivarRaceQuestion | null {
    const mx = randomInt(random, 2, 7)
    const my = randomInt(random, 2, 9)
    const cxy = pick(random, [-3, -2, -1.5, -1, 1, 1.5, 2, 2.5, 3, 4])
    const mean = mx * my + cxy
    const answer = decimal(cxy)
    const choices = options(random, answer, [exact(mean, 'means'), exact(mean - mx - my, 'means'), exact(-cxy, 'sign')])
    return choices && build(2, 'covariance', say(`$\\frac{\\sum x_i\\,y_i}{N}=${tex(mean)}$, $\\bar{x}=${mx}$ eta $\\bar{y}=${my}$. Zenbat da $\\sigma_{xy}$?`, `$\\frac{\\sum x_i\\,y_i}{N}=${tex(mean)}$, $\\bar{x}=${mx}$ e $\\bar{y}=${my}$. ¿Cuánto vale $\\sigma_{xy}$?`, `$\\frac{\\sum x_i\\,y_i}{N}=${tex(mean)}$ و$\\bar{x}=${mx}$ و$\\bar{y}=${my}$. كم $\\sigma_{xy}$؟`, `If $\\frac{\\sum x_i\\,y_i}{N}=${tex(mean)}$, $\\bar{x}=${mx}$ and $\\bar{y}=${my}$, what is $\\sigma_{xy}$?`), choices, answer, all(`\\sigma_{xy}=${tex(mean)}-${mx}\\cdot ${my}=${tex(cxy)}`), { mean, mx, my })
}

/** r = σxy / (σx σy) */
function rQuestion(random: Random): BivarRaceQuestion | null {
    const sx = pick(random, [1, 2, 3, 4, 5])
    const sy = pick(random, [2, 3, 4, 5])
    const r = pick(random, [0.5, 0.6, 0.75, 0.8, 0.9, -0.4, -0.6, -0.8, -0.9])
    const cxy = r * sx * sy
    if (!short(cxy) || !short(cxy / (sx * sx * sy * sy))) return null
    const answer = decimal(r)
    const choices = options(random, answer, [exact(cxy / (sx * sx * sy * sy), 'variance'), exact((sx * sy) / cxy, 'inverse'), exact(-r, 'sign')])
    return choices && build(2, 'r', say(`$\\sigma_{xy}=${tex(cxy)}$, $\\sigma_x=${sx}$ eta $\\sigma_y=${sy}$. Zenbat da r?`, `$\\sigma_{xy}=${tex(cxy)}$, $\\sigma_x=${sx}$ y $\\sigma_y=${sy}$. ¿Cuánto vale r?`, `$\\sigma_{xy}=${tex(cxy)}$ و$\\sigma_x=${sx}$ و$\\sigma_y=${sy}$. كم r؟`, `If $\\sigma_{xy}=${tex(cxy)}$, $\\sigma_x=${sx}$ and $\\sigma_y=${sy}$, what is r?`), choices, answer, all(`r=\\frac{${tex(cxy)}}{${sx}\\cdot ${sy}}=${tex(r)}`), { cxy, sx, sy })
}

/** σxy after multiplying x by k: k·σxy (and r would stay) */
function unitsQuestion(random: Random): BivarRaceQuestion | null {
    const factor = pick(random, [10, 60, 100])
    const cxy = pick(random, [0.2, 0.3, 0.5, 1.2, 2.5, -0.4])
    const answer = decimal(factor * cxy)
    const choices = options(random, answer, [exact(cxy, 'units'), exact(factor * factor * cxy, 'units'), exact(cxy / factor, 'inverse')])
    return choices && build(2, 'units', say(`$\\sigma_{xy}=${tex(cxy)}$ da. x guztiak ${factor} bider egiten badira, zenbat da kobariantza berria?`, `$\\sigma_{xy}=${tex(cxy)}$. Si todas las x se multiplican por ${factor}, ¿cuánto vale la nueva covarianza?`, `$\\sigma_{xy}=${tex(cxy)}$. إذا ضُربت كل قيم x في ${factor} فكم يصبح التغاير؟`, `$\\sigma_{xy}=${tex(cxy)}$. If every x is multiplied by ${factor}, what is the new covariance?`), choices, answer, all(`${factor}\\cdot ${paren(cxy)}=${tex(factor * cxy)}`), { factor, cxy })
}

/* ---------- Circuit 3: regression lines ---------- */

/** The slope of y on x: σxy / σx² */
function slopeQuestion(random: Random): BivarRaceQuestion | null {
    const vx = pick(random, [2, 4, 5, 8, 10])
    const vy = pick(random, [3, 6, 9, 12])
    const cxy = pick(random, [1, 2, 3, 4, 6, -2, -3])
    if (cxy * cxy > vx * vy) return null
    const slope = cxy / vx
    if (!short(slope) || !short(cxy / vy)) return null
    const answer = decimal(slope)
    const choices = options(random, answer, [exact(cxy / vy, 'sigma'), exact(vx / cxy, 'inverse'), exact(cxy / Math.sqrt(vx), 'sigma')])
    return choices && build(3, 'slope', say(`$\\sigma_{xy}=${cxy}$, $\\sigma_x^2=${vx}$ eta $\\sigma_y^2=${vy}$. Zein da Y-ren X-rekiko zuzenaren malda?`, `$\\sigma_{xy}=${cxy}$, $\\sigma_x^2=${vx}$ y $\\sigma_y^2=${vy}$. ¿Cuál es la pendiente de la recta de Y sobre X?`, `$\\sigma_{xy}=${cxy}$ و$\\sigma_x^2=${vx}$ و$\\sigma_y^2=${vy}$. ما ميل مستقيم انحدار Y على X؟`, `If $\\sigma_{xy}=${cxy}$, $\\sigma_x^2=${vx}$ and $\\sigma_y^2=${vy}$, what is the slope of the line of Y on X?`), choices, answer, all(`m_{yx}=\\frac{${cxy}}{${vx}}=${tex(slope)}`), { cxy, vx, vy })
}

/** An estimate with the line through the centre of gravity */
function estimateQuestion(random: Random): BivarRaceQuestion | null {
    const mx = randomInt(random, 2, 8)
    const my = randomInt(random, 4, 15)
    const slope = pick(random, [0.5, 1.5, 2, 3, -0.5, -1, -2])
    const x = mx + pick(random, [-2, -1, 1, 2, 3])
    const estimate = my + slope * (x - mx)
    const answer = decimal(estimate)
    const choices = options(random, answer, [exact(slope * x, 'intercept'), exact(my + slope * x, 'intercept'), exact(my - slope * (x - mx), 'sign')])
    return choices && build(3, 'estimate', say(`Y-ren X-rekiko zuzena $(${mx},\\,${my})$ puntutik pasatzen da, $${tex(slope)}$ maldarekin. Zer y estimatzen du $x=${x}$ denean?`, `La recta de Y sobre X pasa por $(${mx},\\,${my})$ con pendiente $${tex(slope)}$. ¿Qué y estima para $x=${x}$?`, `يمرّ مستقيم انحدار Y على X بالنقطة $(${mx},\\,${my})$ وميله $${tex(slope)}$. ما قيمة y المقدّرة عندما $x=${x}$؟`, `The line of Y on X passes through $(${mx},\\,${my})$ with slope $${tex(slope)}$. What y does it estimate for $x=${x}$?`), choices, answer, all(`${my}+${paren(slope)}\\cdot ${paren(x - mx)}=${tex(estimate)}`), { mx, my, slope, x })
}

/** r from the two slopes: √(m·m′) with their sign */
function linesQuestion(random: Random): BivarRaceQuestion | null {
    const [a, c] = pick(random, [[0.8, 0.45], [0.9, 0.4], [1.6, 0.4], [2, 0.32], [0.5, 0.5], [1.2, 0.3], [0.5, 0.98], [1.8, 0.45], [2.5, 0.1]] as Array<[number, number]>)
    const sign = pick(random, [1, -1])
    const product = a * c
    const r = sign * Math.sqrt(product)
    const answer = decimal(r)
    const choices = options(random, answer, [exact(product, 'root'), exact(-r, 'sign'), exact((a + c) / 2, 'calculation')])
    return choices && build(3, 'lines', say(`$m_{yx}=${tex(sign * a)}$ eta $m_{xy}=${tex(sign * c)}$. Zenbat da r?`, `$m_{yx}=${tex(sign * a)}$ y $m_{xy}=${tex(sign * c)}$. ¿Cuánto vale r?`, `$m_{yx}=${tex(sign * a)}$ و$m_{xy}=${tex(sign * c)}$. كم r؟`, `If $m_{yx}=${tex(sign * a)}$ and $m_{xy}=${tex(sign * c)}$, what is r?`), choices, answer, all(`r^2=${paren(sign * a)}\\cdot ${paren(sign * c)}=${tex(product)}\\ \\to\\ r=${tex(r)}`), { a: sign * a, c: sign * c })
}

/* ---------- Circuit 4: full problems ---------- */

/** f · x · y of one cell of grouped data */
function cellQuestion(random: Random): BivarRaceQuestion | null {
    const x = pick(random, [5, 10, 15, 25, 30])
    const y = pick(random, [1, 2, 3, 4, 5])
    const f = randomInt(random, 2, 9)
    const answer = fraction(f * x * y)
    const choices = options(random, answer, [exact(x * y, 'frequency'), exact(f * (x + y), 'calculation'), exact(f + x * y, 'frequency')])
    return choices && build(4, 'cell', say(`Gelaxka baten markak $x=${x}$ eta $y=${y}$ dira, eta haren maiztasuna ${f}. Zenbat gehitzen dio $\\sum f_{ij}\\,x_i\\,y_j$ baturari?`, `Una casilla tiene marcas $x=${x}$ e $y=${y}$ y frecuencia ${f}. ¿Cuánto suma a $\\sum f_{ij}\\,x_i\\,y_j$?`, `لخانة المركزان $x=${x}$ و$y=${y}$ وتكرارها ${f}. كم تضيف إلى $\\sum f_{ij}\\,x_i\\,y_j$؟`, `A cell has marks $x=${x}$ and $y=${y}$ and frequency ${f}. How much does it add to $\\sum f_{ij}\\,x_i\\,y_j$?`), choices, answer, all(`${f}\\cdot ${x}\\cdot ${y}=${f * x * y}`), { f, x, y })
}

/** σx² from N, Σx and Σx² */
function varianceQuestion(random: Random): BivarRaceQuestion | null {
    const n = pick(random, [4, 5, 10])
    const mean = randomInt(random, 2, 8)
    const variance = pick(random, [1, 2, 2.5, 4, 5, 6])
    const sum = n * mean
    const squares = n * (variance + mean * mean)
    if (!Number.isInteger(squares)) return null
    const answer = decimal(variance)
    const choices = options(random, answer, [exact(squares / n, 'square'), exact((squares - sum * sum) / n, 'square'), exact(squares / n - mean, 'square')])
    return choices && build(4, 'variance', say(`$N=${n}$, $\\sum x=${sum}$ eta $\\sum x^2=${squares}$. Zenbat da $\\sigma_x^2$?`, `$N=${n}$, $\\sum x=${sum}$ y $\\sum x^2=${squares}$. ¿Cuánto vale $\\sigma_x^2$?`, `$N=${n}$ و$\\sum x=${sum}$ و$\\sum x^2=${squares}$. كم $\\sigma_x^2$؟`, `If $N=${n}$, $\\sum x=${sum}$ and $\\sum x^2=${squares}$, what is $\\sigma_x^2$?`), choices, answer, all(`\\sigma_x^2=\\frac{${squares}}{${n}}-${mean}^2=${tex(variance)}`), { n, sum, squares })
}

/** ȳ from the line of y on x and x̄ */
function meanQuestion(random: Random): BivarRaceQuestion | null {
    const slope = pick(random, [0.5, 1.5, 2, 3, -1, -2])
    const intercept = randomInt(random, -5, 9)
    const mx = randomInt(random, 2, 7)
    if (intercept === 0) return null
    const my = slope * mx + intercept
    const answer = decimal(my)
    const lineText = `y=${tex(slope)}x${intercept < 0 ? '' : '+'}${intercept}`
    const choices = options(random, answer, [exact(intercept, 'intercept'), exact(slope * mx, 'intercept'), exact(mx, 'calculation')])
    return choices && build(4, 'mean', say(`Y-ren X-rekiko zuzena $${lineText}$ da, eta $\\bar{x}=${mx}$. Zenbat da $\\bar{y}$?`, `La recta de Y sobre X es $${lineText}$ y $\\bar{x}=${mx}$. ¿Cuánto vale $\\bar{y}$?`, `مستقيم انحدار Y على X هو $${lineText}$ و$\\bar{x}=${mx}$. كم $\\bar{y}$؟`, `The line of Y on X is $${lineText}$ and $\\bar{x}=${mx}$. What is $\\bar{y}$?`), choices, answer, all(`\\bar{y}=${paren(slope)}\\cdot ${mx}${intercept < 0 ? '' : '+'}${intercept}=${tex(my)}`), { slope, intercept, mx })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => BivarRaceQuestion | null>> = [
    [conditionalQuestion, marginalQuestion, independentQuestion],
    [centreQuestion, productQuestion, productsQuestion],
    [covarianceQuestion, rQuestion, unitsQuestion],
    [slopeQuestion, estimateQuestion, linesQuestion],
    [cellQuestion, varianceQuestion, meanQuestion]
]

export function generateBivarRaceQuestion(random: Random, circuit: number, tier: Tier): BivarRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkBivarPitAnswer(question: RaceQuestion<BivarRaceError>, input: string): AnswerCheck {
    return checkAnswer(readStatisticsAnswer(input), question.answer, question.answerForm)
}

export function bivarParTime(circuit: number): number {
    return parTimeFor([13, 12, 13, 13, 13][circuit] ?? 13)
}

export const bivarRaceErrorTips: Record<BivarRaceError, LocalizedText> = {
    total: say('Baldintzatuan, zatitu errenkadaren guztizkoaz, ez N zenbakiaz.', 'En la condicionada, divide entre el total de la fila, no entre N.', 'في التوزيع الشرطي اقسم على مجموع السطر لا على N.', 'In a conditional, divide by the row total, not by N.'),
    inverse: say('Alderantziz: zatia goian, osoa behean.', 'Al revés: la parte arriba y el total abajo.', 'العكس: الجزء في الأعلى والكل في الأسفل.', 'The other way round: the part on top, the total below.'),
    absolute: say('Hori maiztasun absolutua da; zatia eskatzen da.', 'Esa es la frecuencia absoluta; se pide la parte.', 'هذا هو التكرار المطلق؛ المطلوب النصيب.', 'That is the absolute frequency; the share is asked for.'),
    count: say('Zatitu datu kopuruaz, N, ez balio kopuruaz.', 'Divide entre el número de datos, N, no entre el número de valores.', 'اقسم على عدد البيانات N لا على عدد القيم.', 'Divide by the number of data, N, not by the number of values.'),
    equal: say('Independentzia ez da gelaxka berdinak izatea: errenkada · zutabea / N.', 'Independencia no es que las casillas sean iguales: fila · columna / N.', 'الاستقلال ليس تساوي الخانات: السطر · العمود / N.', 'Independence is not equal cells: row · column / N.'),
    divide: say('Ez ahaztu N zenbakiaz zatitzea.', 'No olvides dividir entre N.', 'لا تنسَ القسمة على N.', 'Do not forget to divide by N.'),
    sign: say('Kontuz zeinuarekin: minus bider minus, plus.', 'Cuidado con el signo: menos por menos es más.', 'انتبه للإشارة: سالب في سالب موجب.', 'Watch the sign: minus times minus is plus.'),
    means: say('Kobariantzan, kendu batez bestekoen biderkadura: $\\bar{x}\\,\\bar{y}$.', 'En la covarianza, resta el producto de las medias: $\\bar{x}\\,\\bar{y}$.', 'في التغاير اطرح جداء المتوسطين: $\\bar{x}\\,\\bar{y}$.', 'In the covariance, subtract the product of the means: $\\bar{x}\\,\\bar{y}$.'),
    variance: say('Zatitu desbideratze tipikoez, ez bariantzez.', 'Divide entre las desviaciones típicas, no entre las varianzas.', 'اقسم على الانحرافين المعياريين لا على التباينين.', 'Divide by the standard deviations, not by the variances.'),
    units: say('x bider k egitean, kobariantza ere bider k; r ez da aldatzen.', 'Al multiplicar x por k, la covarianza también se multiplica por k; r no cambia.', 'عند ضرب x في k يُضرب التغاير في k أيضًا؛ ولا يتغير r.', 'Multiplying x by k multiplies the covariance by k too; r does not change.'),
    sigma: say('Y-ren X-rekiko malda: $\\frac{\\sigma_{xy}}{\\sigma_x^2}$.', 'Pendiente de Y sobre X: $\\frac{\\sigma_{xy}}{\\sigma_x^2}$.', 'ميل Y على X: $\\frac{\\sigma_{xy}}{\\sigma_x^2}$.', 'Slope of Y on X: $\\frac{\\sigma_{xy}}{\\sigma_x^2}$.'),
    root: say('Malden biderkadura $r^2$ da: atera erro karratua.', 'El producto de las pendientes es $r^2$: saca la raíz.', 'جداء الميلين هو $r^2$: خذ الجذر.', 'The product of the slopes is $r^2$: take the root.'),
    frequency: say('Biderkatu gelaxkaren maiztasunaz ere.', 'Multiplica también por la frecuencia de la casilla.', 'اضرب أيضًا في تكرار الخانة.', 'Multiply by the frequency of the cell too.'),
    square: say('$\\sigma_x^2=\\frac{\\sum x^2}{N}-\\bar{x}^2$: ez ahaztu $\\bar{x}^2$.', '$\\sigma_x^2=\\frac{\\sum x^2}{N}-\\bar{x}^2$: no olvides $\\bar{x}^2$.', '$\\sigma_x^2=\\frac{\\sum x^2}{N}-\\bar{x}^2$: لا تنسَ $\\bar{x}^2$.', '$\\sigma_x^2=\\frac{\\sum x^2}{N}-\\bar{x}^2$: do not forget $\\bar{x}^2$.'),
    intercept: say('Zuzena $(\\bar{x},\\bar{y})$ puntutik pasatzen da: ordeztu x.', 'La recta pasa por $(\\bar{x},\\bar{y})$: sustituye x.', 'يمرّ المستقيم بـ $(\\bar{x},\\bar{y})$: عوّض x.', 'The line passes through $(\\bar{x},\\bar{y})$: substitute x.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
