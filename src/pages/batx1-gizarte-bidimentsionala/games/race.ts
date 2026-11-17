import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { readStatisticsAnswer } from '../../dbh2-estatistika-v2/answers.ts'

/* ==========================================================================
   Bidimentsionalaren lasterketa (Batxilergoa 1 · Gizarte Zientziak): five
   circuits, one per stage — cloud (the centre of gravity, a product
   (x − x̄)(y − ȳ), r of points on a line), parameters (σxy from the sums,
   r, σxy from r), regression (the slope, an estimate of y, an estimate of
   x), problems (ȳ from a line, r² from the two lines solved for y, x̄ where
   they cross) and tables (a conditional, the independent cell, a marginal
   mean). The wrong options are the typical mistakes. Every question
   carries `meta`, the numbers the tests check it against.
   ========================================================================== */

export const SOCIAL_BIVAR_RACE_CIRCUITS = 5

export type SocialBivarRaceError =
    | 'divide'
    | 'sign'
    | 'mean'
    | 'variance'
    | 'units'
    | 'line'
    | 'product'
    | 'intercept'
    | 'total'
    | 'calculation'

export type SocialBivarRaceQuestion = RaceQuestion<SocialBivarRaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const tex = (value: number) => String(Math.round(value * 1000) / 1000).replace('.', '{,}')
const short = (value: number) => Math.abs(Math.round(value * 100) - value * 100) < 1e-9

interface Candidate {
    value: FractionValue
    error: SocialBivarRaceError
}
const exact = (value: number, error: SocialBivarRaceError): Candidate => ({ value: fraction(Math.round(value * 1000), 1000), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => exact(item, 'calculation'))

function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<SocialBivarRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: SocialBivarRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<SocialBivarRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): SocialBivarRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const all = (latex: string) => say(`$${latex}$`, `$${latex}$`, `$${latex}$`, `$${latex}$`)
const value = (number: number) => fraction(Math.round(number * 1000), 1000)

/* ---------- Circuit 0: the cloud ---------- */

function centroidQuestion(random: Random): SocialBivarRaceQuestion | null {
    const xs = [randomInt(random, 1, 9), randomInt(random, 1, 9), randomInt(random, 2, 12)]
    const ys = [randomInt(random, 1, 9), randomInt(random, 1, 9), randomInt(random, 1, 9)]
    const sum = xs[0] + xs[1] + xs[2]
    if (sum % 3 !== 0 || new Set(xs).size < 3) return null
    const answer = fraction(sum / 3)
    const choices = options(random, answer, [exact(sum, 'divide'), exact(sum / 2, 'divide'), exact((ys[0] + ys[1] + ys[2]) / 3, 'mean')])
    const points = xs.map((x, index) => `(${x},\\,${ys[index]})`).join(',\\ ')
    return choices && build(0, 'centroid', say(`Zein da $${points}$ puntuen $\\bar{x}$?`, `¿Cuál es la $\\bar{x}$ de $${points}$?`, `ما $\\bar{x}$ للنقاط $${points}$؟`, `What is $\\bar{x}$ for $${points}$?`), choices, answer, all(`\\bar{x}=\\frac{${xs.join('+')}}{3}=${sum / 3}`), { a: xs[0], b: xs[1], c: xs[2] })
}

function productQuestion(random: Random): SocialBivarRaceQuestion | null {
    const mx = randomInt(random, 3, 8)
    const my = randomInt(random, 3, 8)
    const x = randomInt(random, 1, 11)
    const y = randomInt(random, 1, 11)
    if (x === mx || y === my) return null
    const answer = fraction((x - mx) * (y - my))
    const choices = options(random, answer, [exact(-(x - mx) * (y - my), 'sign'), exact(x * y - mx * my, 'mean'), exact((x - mx) + (y - my), 'calculation')])
    return choices && build(0, 'product', say(`$\\bar{x}=${mx}$ eta $\\bar{y}=${my}$. Zenbat da $(${x},\\,${y})$ puntuaren $(x-\\bar{x})(y-\\bar{y})$?`, `$\\bar{x}=${mx}$ e $\\bar{y}=${my}$. ¿Cuánto vale $(x-\\bar{x})(y-\\bar{y})$ en $(${x},\\,${y})$?`, `$\\bar{x}=${mx}$ و$\\bar{y}=${my}$. كم $(x-\\bar{x})(y-\\bar{y})$ في $(${x},\\,${y})$؟`, `$\\bar{x}=${mx}$ and $\\bar{y}=${my}$. What is $(x-\\bar{x})(y-\\bar{y})$ at $(${x},\\,${y})$?`), choices, answer, all(`(${x}-${mx})\\cdot(${y}-${my})=${(x - mx) * (y - my)}`), { mx, my, x, y })
}

function functionalQuestion(random: Random): SocialBivarRaceQuestion | null {
    const slope = pick(random, [-3, -2, -1, 2, 3, 4])
    const intercept = randomInt(random, 0, 20)
    const xs = [1, 2, 3, 4]
    const ys = xs.map((x) => slope * x + intercept)
    if (ys.some((y) => y < 0)) return null
    const answer = fraction(Math.sign(slope))
    const choices = options(random, answer, [exact(-Math.sign(slope), 'sign'), exact(0, 'calculation'), exact(slope, 'line')])
    const points = xs.map((x, index) => `(${x},\\,${ys[index]})`).join(',\\ ')
    return choices && build(0, 'functional', say(`Zenbat da r, $${points}$ puntuetarako?`, `¿Cuánto vale r para $${points}$?`, `كم r للنقاط $${points}$؟`, `What is r for $${points}$?`), choices, answer, all(`y=${slope}x+${intercept}\\ \\to\\ r=${Math.sign(slope)}`), { slope })
}

/* ---------- Circuit 1: covariance and r ---------- */

function covarianceQuestion(random: Random): SocialBivarRaceQuestion | null {
    const n = pick(random, [4, 5, 10])
    const mx = randomInt(random, 2, 8)
    const my = randomInt(random, 2, 8)
    const cov = randomInt(random, -4, 6)
    if (cov === 0) return null
    const sum = n * (cov + mx * my)
    if (sum <= 0) return null
    const answer = fraction(cov)
    const choices = options(random, answer, [exact(sum / n, 'mean'), exact(sum - mx * my, 'divide'), exact(-cov, 'sign')])
    return choices && build(1, 'covariance', say(`$\\sum x_i y_i=${sum}$, $N=${n}$, $\\bar{x}=${mx}$ eta $\\bar{y}=${my}$. $\\sigma_{xy}$?`, `$\\sum x_i y_i=${sum}$, $N=${n}$, $\\bar{x}=${mx}$ e $\\bar{y}=${my}$. ¿$\\sigma_{xy}$?`, `$\\sum x_i y_i=${sum}$ و$N=${n}$ و$\\bar{x}=${mx}$ و$\\bar{y}=${my}$. كم $\\sigma_{xy}$؟`, `$\\sum x_i y_i=${sum}$, $N=${n}$, $\\bar{x}=${mx}$ and $\\bar{y}=${my}$. $\\sigma_{xy}$?`), choices, answer, all(`\\frac{${sum}}{${n}}-${mx}\\cdot ${my}=${cov}`), { sum, n, mx, my })
}

function correlationQuestion(random: Random): SocialBivarRaceQuestion | null {
    const sx = pick(random, [2, 3, 4, 5])
    const sy = pick(random, [2, 4, 5, 10])
    const r = pick(random, [0.5, 0.6, 0.8, -0.5, -0.8, 0.9])
    const cov = r * sx * sy
    if (!short(cov) || sx === sy) return null
    const answer = value(r)
    const choices = options(random, answer, [exact(cov / (sx * sx * sy * sy), 'variance'), exact(-r, 'sign'), exact(cov / (sx + sy), 'calculation')])
    return choices && build(1, 'correlation', say(`$\\sigma_{xy}=${tex(cov)}$, $\\sigma_x=${sx}$ eta $\\sigma_y=${sy}$. Zenbat da r?`, `$\\sigma_{xy}=${tex(cov)}$, $\\sigma_x=${sx}$ y $\\sigma_y=${sy}$. ¿Cuánto vale r?`, `$\\sigma_{xy}=${tex(cov)}$ و$\\sigma_x=${sx}$ و$\\sigma_y=${sy}$. كم r؟`, `$\\sigma_{xy}=${tex(cov)}$, $\\sigma_x=${sx}$ and $\\sigma_y=${sy}$. What is r?`), choices, answer, all(`r=\\frac{${tex(cov)}}{${sx}\\cdot ${sy}}=${tex(r)}`), { cov, sx, sy })
}

function unitsQuestion(random: Random): SocialBivarRaceQuestion | null {
    const r = pick(random, [0.45, 0.6, 0.75, 0.9, -0.7])
    const factor = pick(random, [10, 100])
    const answer = value(r)
    const choices = options(random, answer, [exact(r * factor, 'units'), exact(r / factor, 'units'), exact(-r, 'sign')])
    return choices && build(1, 'units', say(`$r=${tex(r)}$. x ${factor} bider egiten bada, zenbat da r?`, `$r=${tex(r)}$. Si x se multiplica por ${factor}, ¿cuánto vale r?`, `$r=${tex(r)}$. إذا ضُربت x في ${factor} فكم r؟`, `$r=${tex(r)}$. If x is multiplied by ${factor}, what is r?`), choices, answer, all(`r=${tex(r)}`), { r })
}

/* ---------- Circuit 2: regression lines ---------- */

function slopeQuestion(random: Random): SocialBivarRaceQuestion | null {
    const vx = pick(random, [2, 4, 5, 10])
    const slope = pick(random, [0.5, 1.5, 2, -0.5, 3])
    const cov = slope * vx
    if (!short(cov)) return null
    const answer = value(slope)
    const choices = options(random, answer, [exact(cov / Math.sqrt(vx), 'variance'), exact(vx / cov, 'divide'), exact(cov, 'calculation')])
    return choices && build(2, 'slope', say(`$\\sigma_{xy}=${tex(cov)}$ eta $\\sigma_x^2=${vx}$. Zein da Y-ren X-rekiko malda?`, `$\\sigma_{xy}=${tex(cov)}$ y $\\sigma_x^2=${vx}$. ¿Cuál es la pendiente de Y sobre X?`, `$\\sigma_{xy}=${tex(cov)}$ و$\\sigma_x^2=${vx}$. ما ميل Y على X؟`, `$\\sigma_{xy}=${tex(cov)}$ and $\\sigma_x^2=${vx}$. What is the slope of Y on X?`), choices, answer, all(`m_{yx}=\\frac{${tex(cov)}}{${vx}}=${tex(slope)}`), { cov, vx })
}

function estimateQuestion(random: Random): SocialBivarRaceQuestion | null {
    const mx = randomInt(random, 3, 10)
    const my = randomInt(random, 10, 30)
    const slope = pick(random, [0.5, 1.5, 2, 3])
    const x = mx + pick(random, [-2, 2, 4])
    const result = my + slope * (x - mx)
    if (!short(result)) return null
    const answer = value(result)
    const choices = options(random, answer, [exact(slope * x, 'intercept'), exact(my + slope * x, 'mean'), exact(mx + slope * (x - my), 'line')])
    return choices && build(2, 'estimate', say(`$\\bar{x}=${mx}$, $\\bar{y}=${my}$ eta $m_{yx}=${tex(slope)}$. Estimatu y, $x=${x}$ denean.`, `$\\bar{x}=${mx}$, $\\bar{y}=${my}$ y $m_{yx}=${tex(slope)}$. Estima y para $x=${x}$.`, `$\\bar{x}=${mx}$ و$\\bar{y}=${my}$ و$m_{yx}=${tex(slope)}$. قدّر y عندما $x=${x}$.`, `$\\bar{x}=${mx}$, $\\bar{y}=${my}$ and $m_{yx}=${tex(slope)}$. Estimate y for $x=${x}$.`), choices, answer, all(`${my}+${tex(slope)}\\cdot(${x}-${mx})=${tex(result)}`), { mx, my, slope, x })
}

function estimateXQuestion(random: Random): SocialBivarRaceQuestion | null {
    const mx = randomInt(random, 3, 10)
    const my = randomInt(random, 10, 30)
    const mxy = pick(random, [0.25, 0.5, 0.2])
    const myx = pick(random, [2, 3])
    const y = my + pick(random, [4, 8, 10])
    const result = mx + mxy * (y - my)
    const reached = mx + (y - my) / myx
    if (!short(result) || mxy * myx > 1 || Math.abs(result - reached) < 1e-9) return null
    const answer = value(result)
    const choices = options(random, answer, [exact(reached, 'line'), exact(mxy * y, 'intercept'), exact(mx + mxy * y, 'mean')])
    return choices && build(2, 'estimateX', say(`$\\bar{x}=${mx}$, $\\bar{y}=${my}$, $m_{yx}=${myx}$ eta $m_{xy}=${tex(mxy)}$. Estimatu x, $y=${y}$ denean.`, `$\\bar{x}=${mx}$, $\\bar{y}=${my}$, $m_{yx}=${myx}$ y $m_{xy}=${tex(mxy)}$. Estima x para $y=${y}$.`, `$\\bar{x}=${mx}$ و$\\bar{y}=${my}$ و$m_{yx}=${myx}$ و$m_{xy}=${tex(mxy)}$. قدّر x عندما $y=${y}$.`, `$\\bar{x}=${mx}$, $\\bar{y}=${my}$, $m_{yx}=${myx}$ and $m_{xy}=${tex(mxy)}$. Estimate x for $y=${y}$.`), choices, answer, all(`${mx}+${tex(mxy)}\\cdot(${y}-${my})=${tex(result)}`), { mx, my, mxy, y })
}

/* ---------- Circuit 3: full problems ---------- */

function meanYQuestion(random: Random): SocialBivarRaceQuestion | null {
    const slope = pick(random, [2, 3, 0.5, 1.5])
    const intercept = randomInt(random, -5, 9)
    const mx = randomInt(random, 2, 10)
    const result = slope * mx + intercept
    if (!short(result) || intercept === 0) return null
    const answer = value(result)
    const choices = options(random, answer, [exact(intercept, 'intercept'), exact(slope * mx, 'intercept'), exact((mx - intercept) / slope, 'line')])
    const sign = intercept < 0 ? '-' : '+'
    return choices && build(3, 'meanY', say(`Y-ren X-rekiko zuzena $y=${tex(slope)}x${sign}${Math.abs(intercept)}$ da, eta $\\bar{x}=${mx}$. $\\bar{y}$?`, `La recta de Y sobre X es $y=${tex(slope)}x${sign}${Math.abs(intercept)}$ y $\\bar{x}=${mx}$. ¿$\\bar{y}$?`, `مستقيم Y على X هو $y=${tex(slope)}x${sign}${Math.abs(intercept)}$ و$\\bar{x}=${mx}$. كم $\\bar{y}$؟`, `The line of Y on X is $y=${tex(slope)}x${sign}${Math.abs(intercept)}$ and $\\bar{x}=${mx}$. $\\bar{y}$?`), choices, answer, all(`${tex(slope)}\\cdot ${mx}${sign}${Math.abs(intercept)}=${tex(result)}`), { slope, intercept, mx })
}

const LINE_PAIRS: Array<[number, number]> = [[0.8, 1.25], [0.5, 2], [0.4, 2.5], [0.9, 1.6], [0.6, 1.5], [0.3, 1.2]]

function squareQuestion(random: Random): SocialBivarRaceQuestion | null {
    const [a, b] = pick(random, LINE_PAIRS)
    const result = a / b
    if (!short(result * 10)) return null
    const answer = value(result)
    const choices = options(random, answer, [exact(a * b, 'product'), exact(b / a, 'divide'), exact(Math.sqrt(result), 'calculation')])
    return choices && build(3, 'square', say(`Zuzenak, y askatuta: $y=${tex(a)}x+1$ eta $y=${tex(b)}x-3$. Zenbat da $r^2$?`, `Las rectas, con y despejada: $y=${tex(a)}x+1$ e $y=${tex(b)}x-3$. ¿Cuánto vale $r^2$?`, `المستقيمان بعد عزل y: $y=${tex(a)}x+1$ و$y=${tex(b)}x-3$. كم $r^2$؟`, `The lines, solved for y: $y=${tex(a)}x+1$ and $y=${tex(b)}x-3$. What is $r^2$?`), choices, answer, all(`r^2=\\frac{${tex(a)}}{${tex(b)}}=${tex(result)}`), { a, b })
}

function crossingQuestion(random: Random): SocialBivarRaceQuestion | null {
    const [a, b] = pick(random, LINE_PAIRS)
    const mx = randomInt(random, 2, 10)
    const my = randomInt(random, 5, 20)
    const first = my - a * mx
    const second = my - b * mx
    if (!short(first) || !short(second)) return null
    const answer = fraction(mx)
    const choices = options(random, answer, [exact(my, 'mean'), exact(first, 'intercept'), exact(mx + 1, 'calculation')])
    const signed = (number: number) => (number < 0 ? `-${tex(-number)}` : `+${tex(number)}`)
    return choices && build(3, 'crossing', say(`Zuzenak, y askatuta: $y=${tex(a)}x${signed(first)}$ eta $y=${tex(b)}x${signed(second)}$. Zenbat da $\\bar{x}$?`, `Las rectas, con y despejada: $y=${tex(a)}x${signed(first)}$ e $y=${tex(b)}x${signed(second)}$. ¿Cuánto vale $\\bar{x}$?`, `المستقيمان بعد عزل y: $y=${tex(a)}x${signed(first)}$ و$y=${tex(b)}x${signed(second)}$. كم $\\bar{x}$؟`, `The lines, solved for y: $y=${tex(a)}x${signed(first)}$ and $y=${tex(b)}x${signed(second)}$. What is $\\bar{x}$?`), choices, answer, all(`${tex(a)}x${signed(first)}=${tex(b)}x${signed(second)}\\ \\to\\ x=${mx}`), { a, b, first, second })
}

/* ---------- Circuit 4: contingency tables ---------- */

function conditionalQuestion(random: Random): SocialBivarRaceQuestion | null {
    const row = pick(random, [20, 25, 40, 50])
    const total = row + pick(random, [30, 50, 60])
    const cell = randomInt(random, 2, row - 2)
    const result = cell / row
    if (!short(result) || !short(cell / total)) return null
    const answer = value(result)
    const choices = options(random, answer, [exact(cell / total, 'total'), exact(row / total, 'total'), exact(cell, 'calculation')])
    return choices && build(4, 'conditional', say(`${total} pertsonatik ${row} neskak dira, eta ${cell} neskak kirola egiten dute. Nesken zer zatik?`, `De ${total} personas, ${row} son chicas y ${cell} de ellas hacen deporte. ¿Qué parte de las chicas?`, `من ${total} شخصًا ${row} فتاة، و${cell} منهن يمارسن الرياضة. ما جزء الفتيات؟`, `Of ${total} people, ${row} are girls and ${cell} of them do sport. What part of the girls?`), choices, answer, all(`\\frac{${cell}}{${row}}=${tex(result)}`), { cell, row })
}

function expectedQuestion(random: Random): SocialBivarRaceQuestion | null {
    const total = pick(random, [50, 100, 200])
    const row = total * pick(random, [0.2, 0.4, 0.6])
    const column = total * pick(random, [0.3, 0.5, 0.7])
    const result = (row * column) / total
    if (!short(result)) return null
    const answer = value(result)
    const choices = options(random, answer, [exact(row * column, 'total'), exact((row + column) / 2, 'calculation'), exact(row / column, 'divide')])
    return choices && build(4, 'expected', say(`$N=${total}$; errenkadak ${row} eta zutabeak ${column} batzen dute. Gelaxka, independenteak balira?`, `$N=${total}$; la fila suma ${row} y la columna ${column}. ¿La casilla, si fueran independientes?`, `$N=${total}$؛ السطر ${row} والعمود ${column}. الخانة لو كانا مستقلين؟`, `$N=${total}$; the row adds up to ${row} and the column to ${column}. The cell, if they were independent?`), choices, answer, all(`\\frac{${row}\\cdot ${column}}{${total}}=${tex(result)}`), { row, column, total })
}

function marginalQuestion(random: Random): SocialBivarRaceQuestion | null {
    const counts = [randomInt(random, 1, 6), randomInt(random, 2, 9), randomInt(random, 1, 6)]
    const total = counts[0] + counts[1] + counts[2]
    const sum = counts[0] * 10 + counts[1] * 20 + counts[2] * 30
    const result = sum / total
    if (!short(result) || total === 3) return null
    const answer = value(result)
    const choices = options(random, answer, [exact(sum / 3, 'divide'), exact(20, 'mean'), exact(sum, 'divide')])
    return choices && build(4, 'marginal', say(`Marjinala: 10, 20 eta 30, $${counts.join(',\\ ')}$ maiztasunekin. $\\bar{x}$?`, `Marginal: 10, 20 y 30 con frecuencias $${counts.join(',\\ ')}$. ¿$\\bar{x}$?`, `الهامشي: 10 و20 و30 بالتكرارات $${counts.join(',\\ ')}$. كم $\\bar{x}$؟`, `Marginal: 10, 20 and 30 with frequencies $${counts.join(',\\ ')}$. $\\bar{x}$?`), choices, answer, all(`\\bar{x}=\\frac{${sum}}{${total}}=${tex(result)}`), { a: counts[0], b: counts[1], c: counts[2] })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => SocialBivarRaceQuestion | null>> = [
    [centroidQuestion, productQuestion, functionalQuestion],
    [covarianceQuestion, correlationQuestion, unitsQuestion],
    [slopeQuestion, estimateQuestion, estimateXQuestion],
    [meanYQuestion, squareQuestion, crossingQuestion],
    [conditionalQuestion, expectedQuestion, marginalQuestion]
]

export function generateSocialBivarRaceQuestion(random: Random, circuit: number, tier: Tier): SocialBivarRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkSocialBivarPitAnswer(question: RaceQuestion<SocialBivarRaceError>, input: string): AnswerCheck {
    return checkAnswer(readStatisticsAnswer(input), question.answer, question.answerForm)
}

export function socialBivarParTime(circuit: number): number {
    return parTimeFor([12, 13, 14, 14, 13][circuit] ?? 13)
}

export const socialBivarRaceErrorTips: Record<SocialBivarRaceError, LocalizedText> = {
    divide: say('Zatitu behar den zenbakiaz zatitu: $N$, $\\sigma_x^2$…', 'Divide entre lo que toca: $N$, $\\sigma_x^2$…', 'اقسم على ما يجب: $N$ و$\\sigma_x^2$…', 'Divide by the right number: $N$, $\\sigma_x^2$…'),
    sign: say('Kontuz zeinuarekin.', 'Cuidado con el signo.', 'انتبه للإشارة.', 'Watch the sign.'),
    mean: say('Kontuz batez bestekoekin: $\\bar{x}$ ala $\\bar{y}$, eta kendu $\\bar{x}\\,\\bar{y}$.', 'Cuidado con las medias: $\\bar{x}$ o $\\bar{y}$, y resta $\\bar{x}\\,\\bar{y}$.', 'انتبه للمتوسطين: $\\bar{x}$ أو $\\bar{y}$، واطرح $\\bar{x}\\,\\bar{y}$.', 'Careful with the means: $\\bar{x}$ or $\\bar{y}$, and subtract $\\bar{x}\\,\\bar{y}$.'),
    variance: say('r kalkulatzeko desbideratze tipikoak; maldarako, bariantza.', 'Para r, las desviaciones típicas; para la pendiente, la varianza.', 'لحساب r الانحرافان المعياريان، وللميل التباين.', 'For r, the standard deviations; for the slope, the variance.'),
    units: say('r koefizienteak ez du unitaterik.', 'r no tiene unidades.', 'r بلا وحدات.', 'r has no units.'),
    line: say('y estimatzeko Y-ren X-rekiko zuzena; x estimatzeko, X-ren Y-rekikoa.', 'Para y, la recta de Y sobre X; para x, la de X sobre Y.', 'لتقدير y مستقيم Y على X، ولتقدير x مستقيم X على Y.', 'For y, the line of Y on X; for x, that of X on Y.'),
    product: say('y askatuta, $r^2$ malda txikiena zati handiena da.', 'Con y despejada, $r^2$ es la pendiente menor entre la mayor.', 'بعد عزل y يكون $r^2$ الميل الأصغر مقسومًا على الأكبر.', 'Solved for y, $r^2$ is the smaller slope divided by the larger.'),
    intercept: say('Zuzena $(\\bar{x},\\bar{y})$ puntutik pasatzen da; ez ahaztu jatorriko ordenatua.', 'La recta pasa por $(\\bar{x},\\bar{y})$; no olvides la ordenada en el origen.', 'يمرّ المستقيم بـ $(\\bar{x},\\bar{y})$؛ لا تنسَ الجزء المقطوع.', 'The line passes through $(\\bar{x},\\bar{y})$; do not forget the intercept.'),
    total: say('Baldintzazkoa bere errenkadaz zatitzen da; gelaxka independentea, $N$ zenbakiaz.', 'La condicionada, entre su fila; la casilla independiente, entre $N$.', 'الشرطي يُقسَم على سطره، والخانة المستقلة على $N$.', 'The conditional, by its row; the independent cell, by $N$.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
