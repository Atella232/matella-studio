import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { readTrigonometryAnswer } from '../../dbh4-akademikoak-trigonometria/answers.ts'
import { complexLatex, mul, type Complex } from '../lab/complex.ts'
import { say } from '../text.ts'

/* ==========================================================================
   Konplexuen lasterketa (Batxilergoa 1 · Zientziak): five circuits, one
   per stage — new numbers (a part of a number, its opposite or its
   conjugate, the root of a negative number), operations (the real part of
   a product or a quotient, a power of i), the polar form (the modulus, the
   argument with its quadrant, the real part of r_α), turns and powers (the
   argument of a product, the modulus of a quotient, De Moivre) and roots
   (their modulus, the first argument, how far apart they are, how many
   are real). Every answer is a whole number or a simple fraction, and the
   wrong options are the typical mistakes. Every question carries `meta`,
   the numbers the tests check it against.
   ========================================================================== */

export const COMPLEX_RACE_CIRCUITS = 5

export type ComplexRaceError =
    | 'sign'
    | 'swapped'
    | 'no-root'
    | 'i-squared'
    | 'part-by-part'
    | 'quotient'
    | 'modulus-sum'
    | 'quadrant'
    | 'conjugate'
    | 'opposite'
    | 'cos-sin'
    | 'multiplied'
    | 'subtracted'
    | 'inverted'
    | 'moivre-times'
    | 'no-turn'
    | 'no-divide'
    | 'all-real'
    | 'calculation'

export type ComplexRaceQuestion = RaceQuestion<ComplexRaceError> & { meta: Record<string, number> }

const same = (latex: string): LocalizedText => say(`$${latex}$`, `$${latex}$`, `$${latex}$`, `$${latex}$`)

interface Candidate {
    value: FractionValue
    error: ComplexRaceError
}
const whole = (value: number, error: ComplexRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2, value + 3].map((item) => ({ value: fraction(Math.round(item * 10000), 10000), error: 'calculation' as const }))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<ComplexRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: ComplexRaceError }> = []
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

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<ComplexRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): ComplexRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const nonZero = (random: Random, limit: number) => pick(random, Array.from({ length: 2 * limit }, (_, index) => (index < limit ? index - limit : index - limit + 1)))
const bracket = (value: Complex) => (value[0] !== 0 && value[1] !== 0) || value[0] < 0 || value[1] < 0 ? `(${complexLatex(value)})` : complexLatex(value)
const turn = (degrees: number) => ((degrees % 360) + 360) % 360

/* ---------- Circuit 0: new numbers ---------- */

function partQuestion(random: Random): ComplexRaceQuestion | null {
    const z: Complex = [nonZero(random, 6), nonZero(random, 6)]
    const form = pick(random, ['plain', 'opposite', 'conjugate'] as const)
    const imaginary = pick(random, [true, false])
    const shown = form === 'plain' ? complexLatex(z) : form === 'opposite' ? `-(${complexLatex(z)})` : `\\overline{${complexLatex(z)}}`
    const value: Complex = form === 'plain' ? z : form === 'opposite' ? [-z[0], -z[1]] : [z[0], -z[1]]
    const answer = fraction(imaginary ? value[1] : value[0])
    const other = form === 'opposite' ? [z[0], -z[1]] : [-z[0], -z[1]]
    const choices = options(random, answer, [whole(-(imaginary ? value[1] : value[0]), 'sign'), whole(imaginary ? value[0] : value[1], 'swapped'), whole(imaginary ? other[1] : other[0], form === 'opposite' ? 'conjugate' : 'opposite')])
    const part = imaginary ? say('zati irudikaria', 'la parte imaginaria', 'الجزء التخيلي', 'the imaginary part') : say('zati erreala', 'la parte real', 'الجزء الحقيقي', 'the real part')
    return choices && build(0, 'part', say(`Zein da $${shown}$ zenbakiaren ${part.eu}?`, `¿Cuál es ${part.es} de $${shown}$?`, `ما ${part.ar} للعدد $${shown}$؟`, `What is ${part.en} of $${shown}$?`), choices, answer, same(`${shown}=${complexLatex(value)}`), { a: z[0], b: z[1], form: ['plain', 'opposite', 'conjugate'].indexOf(form), imaginary: imaginary ? 1 : 0 })
}

function rootQuestion(random: Random): ComplexRaceQuestion | null {
    const n = randomInt(random, 2, 12)
    const answer = fraction(n)
    const choices = options(random, answer, [whole(-n, 'sign'), whole(n * n, 'no-root'), whole(n * n / 2, 'calculation')])
    return choices && build(0, 'root', say(`$\\sqrt{-${n * n}}=bi$, $b>0$ izanik. Zenbat da $b$?`, `$\\sqrt{-${n * n}}=bi$, con $b>0$. ¿Cuánto vale $b$?`, `$\\sqrt{-${n * n}}=bi$ حيث $b>0$. كم $b$؟`, `$\\sqrt{-${n * n}}=bi$, with $b>0$. What is $b$?`), choices, answer, same(`\\sqrt{-${n * n}}=\\sqrt{${n * n}}\\,i=${n}i`), { n })
}

/* ---------- Circuit 1: operations ---------- */

function productQuestion(random: Random): ComplexRaceQuestion | null {
    const z: Complex = [nonZero(random, 5), nonZero(random, 5)]
    const w: Complex = [nonZero(random, 4), nonZero(random, 4)]
    const product = mul(z, w)
    const answer = fraction(product[0])
    const choices = options(random, answer, [whole(z[0] * w[0] + z[1] * w[1], 'i-squared'), whole(product[1], 'swapped'), whole(z[0] * w[0], 'calculation')])
    return choices && build(1, 'product', say(`Zein da $${bracket(z)}${bracket(w)}$ biderkaduraren zati erreala?`, `¿Cuál es la parte real de $${bracket(z)}${bracket(w)}$?`, `ما الجزء الحقيقي لـ $${bracket(z)}${bracket(w)}$؟`, `What is the real part of $${bracket(z)}${bracket(w)}$?`), choices, answer, same(`${z[0] * w[0]}-(${z[1] * w[1]})=${product[0]}`), { a: z[0], b: z[1], c: w[0], d: w[1] })
}

function powerQuestion(random: Random): ComplexRaceQuestion | null {
    const n = randomInt(random, 5, 40)
    const k = randomInt(random, 2, 9)
    if (n % 4 === 1 || n % 4 === 3) {
        // i^n = ±i: ask for the imaginary part of k · i^n
        const answer = fraction(n % 4 === 1 ? k : -k)
        const choices = options(random, answer, [whole(-(n % 4 === 1 ? k : -k), 'sign'), whole(0, 'swapped'), whole(Math.floor(n / 4) % 4 === 1 ? k : -k, 'quotient')])
        return choices && build(1, 'power-imaginary', say(`Zein da $${k}\\cdot i^{${n}}$ zenbakiaren zati irudikaria?`, `¿Cuál es la parte imaginaria de $${k}\\cdot i^{${n}}$?`, `ما الجزء التخيلي للعدد $${k}\\cdot i^{${n}}$؟`, `What is the imaginary part of $${k}\\cdot i^{${n}}$?`), choices, answer, same(`${n}=4\\cdot ${Math.floor(n / 4)}+${n % 4}\\ \\to\\ i^{${n}}=${n % 4 === 1 ? 'i' : '-i'}`), { n, k })
    }
    const answer = fraction(n % 4 === 0 ? k : -k)
    const choices = options(random, answer, [whole(-(n % 4 === 0 ? k : -k), 'sign'), whole(0, 'swapped'), whole(k * n, 'calculation')])
    return choices && build(1, 'power-real', say(`Zenbat da $${k}\\cdot i^{${n}}$?`, `¿Cuánto vale $${k}\\cdot i^{${n}}$?`, `كم يساوي $${k}\\cdot i^{${n}}$؟`, `What is $${k}\\cdot i^{${n}}$?`), choices, answer, same(`${n}=4\\cdot ${Math.floor(n / 4)}+${n % 4}\\ \\to\\ i^{${n}}=${n % 4 === 0 ? '1' : '-1'}`), { n, k })
}

function divisionQuestion(random: Random): ComplexRaceQuestion | null {
    const w: Complex = [nonZero(random, 4), nonZero(random, 4)]
    const d: Complex = pick(random, [[1, 1], [1, -1], [2, 1], [1, 2], [2, -1], [1, 3]] as Complex[])
    const top = mul(w, d)
    const answer = fraction(w[0])
    const choices = options(random, answer, [{ value: fraction(top[0], d[0]), error: 'part-by-part' }, whole(w[1], 'swapped'), { value: fraction(top[0], d[0] ** 2 + d[1] ** 2), error: 'calculation' }])
    return choices && build(1, 'division', say(`Zein da $\\frac{${complexLatex(top)}}{${complexLatex(d)}}$ zatiduraren zati erreala?`, `¿Cuál es la parte real de $\\frac{${complexLatex(top)}}{${complexLatex(d)}}$?`, `ما الجزء الحقيقي لـ $\\frac{${complexLatex(top)}}{${complexLatex(d)}}$؟`, `What is the real part of $\\frac{${complexLatex(top)}}{${complexLatex(d)}}$?`), choices, answer, same(`\\frac{${bracket(top)}${bracket([d[0], -d[1]])}}{${d[0] ** 2 + d[1] ** 2}}=${complexLatex(w)}`), { a: w[0], b: w[1], c: d[0], d: d[1] })
}

/* ---------- Circuit 2: polar form ---------- */

const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15]]

function modulusQuestion(random: Random): ComplexRaceQuestion | null {
    const [p, q, h] = pick(random, TRIPLES)
    const z: Complex = pick(random, [true, false]) ? [pick(random, [-1, 1]) * p, pick(random, [-1, 1]) * q] : [pick(random, [-1, 1]) * q, pick(random, [-1, 1]) * p]
    const answer = fraction(h)
    const choices = options(random, answer, [whole(p + q, 'modulus-sum'), whole(h * h, 'no-root'), whole(Math.abs(p - q), 'calculation')])
    return choices && build(2, 'modulus', say(`Zein da $${complexLatex(z)}$ zenbakiaren modulua?`, `¿Cuál es el módulo de $${complexLatex(z)}$?`, `ما طويلة $${complexLatex(z)}$؟`, `What is the modulus of $${complexLatex(z)}$?`), choices, answer, same(`\\sqrt{${p * p}+${q * q}}=${h}`), { a: z[0], b: z[1] })
}

function argumentQuestion(random: Random): ComplexRaceQuestion | null {
    const k = randomInt(random, 1, 6)
    const [z, angle] = pick(random, [[[k, k], 45], [[-k, k], 135], [[-k, -k], 225], [[k, -k], 315], [[0, k], 90], [[-k, 0], 180], [[0, -k], 270]] as Array<[Complex, number]>)
    const calculator = angle === 135 || angle === 315 ? -45 : angle === 225 ? 45 : angle
    const answer = fraction(angle)
    const choices = options(random, answer, [whole(calculator, 'quadrant'), whole(turn(360 - angle), 'conjugate'), whole(turn(angle + 180), 'opposite')])
    return choices && build(2, 'argument', say(`Zein da $${complexLatex(z)}$ zenbakiaren argumentua, 0° eta 360° artean?`, `¿Cuál es el argumento de $${complexLatex(z)}$, entre 0° y 360°?`, `ما عمدة $${complexLatex(z)}$ بين 0° و360°؟`, `What is the argument of $${complexLatex(z)}$, between 0° and 360°?`), choices, answer, same(`${complexLatex(z)}\\ \\to\\ ${angle}°`), { a: z[0], b: z[1] })
}

function realFromPolarQuestion(random: Random): ComplexRaceQuestion | null {
    const r = pick(random, [2, 4, 6, 8, 10])
    const angle = pick(random, [60, 120, 240, 300, 180, 0])
    const cosine = { 0: 1, 60: 0.5, 120: -0.5, 180: -1, 240: -0.5, 300: 0.5 }[angle]!
    const answer = fraction(r * cosine)
    const choices = options(random, answer, [whole(-r * cosine, 'sign'), whole(r, 'calculation'), whole(angle === 0 || angle === 180 ? 0 : r / 2 + 1, 'cos-sin')])
    return choices && build(2, 'polar-real', say(`Zein da $${r}_{${angle}°}$ zenbakiaren zati erreala?`, `¿Cuál es la parte real de $${r}_{${angle}°}$?`, `ما الجزء الحقيقي لـ $${r}_{${angle}°}$؟`, `What is the real part of $${r}_{${angle}°}$?`), choices, answer, same(`${r}\\cos ${angle}°=${r * cosine}`), { r, angle })
}

/* ---------- Circuit 3: turns and powers ---------- */

function productArgumentQuestion(random: Random): ComplexRaceQuestion | null {
    const alpha = randomInt(random, 2, 34) * 10
    const beta = randomInt(random, 2, 34) * 10
    const answer = fraction(turn(alpha + beta))
    const choices = options(random, answer, [whole(alpha * beta > 9999 ? alpha * 2 : alpha * beta, 'multiplied'), whole(Math.abs(alpha - beta), 'subtracted'), whole(alpha + beta === turn(alpha + beta) ? alpha + beta + 360 : alpha + beta, 'no-turn')])
    return choices && build(3, 'product-argument', say(`Zein da $2_{${alpha}°}\\cdot 3_{${beta}°}$ biderkaduraren argumentua, 0° eta 360° artean?`, `¿Cuál es el argumento de $2_{${alpha}°}\\cdot 3_{${beta}°}$, entre 0° y 360°?`, `ما عمدة $2_{${alpha}°}\\cdot 3_{${beta}°}$ بين 0° و360°؟`, `What is the argument of $2_{${alpha}°}\\cdot 3_{${beta}°}$, between 0° and 360°?`), choices, answer, same(`${alpha}°+${beta}°=${alpha + beta}°${alpha + beta >= 360 ? `\\ \\to\\ ${turn(alpha + beta)}°` : ''}`), { alpha, beta })
}

function quotientQuestion(random: Random): ComplexRaceQuestion | null {
    const s = randomInt(random, 2, 6)
    const r = s * randomInt(random, 2, 5)
    const answer = fraction(r / s)
    const choices = options(random, answer, [whole(r * s, 'multiplied'), whole(r - s, 'subtracted'), { value: fraction(s, r), error: 'inverted' }])
    const [alpha, beta] = [randomInt(random, 10, 35) * 10, randomInt(random, 1, 9) * 10]
    return choices && build(3, 'quotient', say(`Zein da $\\frac{${r}_{${alpha}°}}{${s}_{${beta}°}}$ zatiduraren modulua?`, `¿Cuál es el módulo de $\\frac{${r}_{${alpha}°}}{${s}_{${beta}°}}$?`, `ما طويلة $\\frac{${r}_{${alpha}°}}{${s}_{${beta}°}}$؟`, `What is the modulus of $\\frac{${r}_{${alpha}°}}{${s}_{${beta}°}}$?`), choices, answer, same(`\\frac{${r}}{${s}}=${r / s}`), { r, s })
}

function moivreQuestion(random: Random): ComplexRaceQuestion | null {
    const r = randomInt(random, 2, 3)
    const n = randomInt(random, 3, r === 2 ? 6 : 4)
    const alpha = randomInt(random, 2, 17) * 10
    if (pick(random, [true, false])) {
        const answer = fraction(r ** n)
        const choices = options(random, answer, [whole(n * r, 'moivre-times'), whole(r, 'calculation'), whole(r ** (n - 1), 'calculation')])
        return choices && build(3, 'moivre-modulus', say(`Zein da $(${r}_{${alpha}°})^{${n}}$ zenbakiaren modulua?`, `¿Cuál es el módulo de $(${r}_{${alpha}°})^{${n}}$?`, `ما طويلة $(${r}_{${alpha}°})^{${n}}$؟`, `What is the modulus of $(${r}_{${alpha}°})^{${n}}$?`), choices, answer, same(`${r}^{${n}}=${r ** n}`), { r, n, alpha, modulus: 1 })
    }
    const answer = fraction(turn(n * alpha))
    const choices = options(random, answer, [whole(alpha, 'calculation'), whole(n * alpha === turn(n * alpha) ? n * alpha + 360 : n * alpha, 'no-turn'), whole(alpha + n, 'calculation')])
    return choices && build(3, 'moivre-argument', say(`Zein da $(${r}_{${alpha}°})^{${n}}$ zenbakiaren argumentua, 0° eta 360° artean?`, `¿Cuál es el argumento de $(${r}_{${alpha}°})^{${n}}$, entre 0° y 360°?`, `ما عمدة $(${r}_{${alpha}°})^{${n}}$ بين 0° و360°؟`, `What is the argument of $(${r}_{${alpha}°})^{${n}}$, between 0° and 360°?`), choices, answer, same(`${n}\\cdot ${alpha}°=${n * alpha}°${n * alpha >= 360 ? `\\ \\to\\ ${turn(n * alpha)}°` : ''}`), { r, n, alpha, modulus: 0 })
}

/* ---------- Circuit 4: roots ---------- */

const POWERS: Array<[number, number, number]> = [[2, 2, 4], [2, 3, 9], [2, 4, 16], [2, 5, 25], [3, 2, 8], [3, 3, 27], [4, 2, 16], [4, 3, 81], [6, 2, 64], [5, 2, 32]]

function rootModulusQuestion(random: Random): ComplexRaceQuestion | null {
    const [n, r, R] = pick(random, POWERS)
    const theta = randomInt(random, 1, 11) * 30
    const answer = fraction(r)
    const choices = options(random, answer, [{ value: fraction(R, n), error: 'no-root' }, whole(R, 'no-divide'), whole(r * n, 'calculation')])
    return choices && build(4, 'root-modulus', say(`$${R}_{${theta}°}$ zenbakiaren erro ${ORDER[n].eu} guztiek modulu bera dute. Zein?`, `Las raíces ${ORDER[n].es} de $${R}_{${theta}°}$ tienen todas el mismo módulo. ¿Cuál?`, `للجذور ${ORDER[n].ar} للعدد $${R}_{${theta}°}$ الطويلة نفسها. ما هي؟`, `The ${ORDER[n].en} roots of $${R}_{${theta}°}$ all have the same modulus. What is it?`), choices, answer, same(`\\sqrt[${n}]{${R}}=${r}`), { n, R })
}

const ORDER: Record<number, LocalizedText> = {
    2: say('karratu', 'cuadradas', 'التربيعية', 'square'),
    3: say('kubiko', 'cúbicas', 'التكعيبية', 'cube'),
    4: say('laugarren', 'cuartas', 'الرابعة', 'fourth'),
    5: say('bosgarren', 'quintas', 'الخامسة', 'fifth'),
    6: say('seigarren', 'sextas', 'السادسة', 'sixth')
}

function firstArgumentQuestion(random: Random): ComplexRaceQuestion | null {
    const n = pick(random, [2, 3, 4, 5, 6])
    const theta = randomInt(random, 1, 11) * 30
    if (theta % n !== 0) return null
    const answer = fraction(theta / n)
    const choices = options(random, answer, [whole(theta, 'no-divide'), whole(theta * n > 9999 ? theta + n : theta * n, 'multiplied'), whole((theta + 360) / n, 'calculation')])
    return choices && build(4, 'first-argument', say(`$${'{z}'}^{${n}}=w$ eta $w=1_{${theta}°}$. Zein da $k=0$ duen erroaren argumentua?`, `$${'{z}'}^{${n}}=w$ con $w=1_{${theta}°}$. ¿Cuál es el argumento de la raíz con $k=0$?`, `$${'{z}'}^{${n}}=w$ و$w=1_{${theta}°}$. ما عمدة الجذر عندما $k=0$؟`, `$${'{z}'}^{${n}}=w$ with $w=1_{${theta}°}$. What is the argument of the root with $k=0$?`), choices, answer, same(`\\frac{${theta}°}{${n}}=${theta / n}°`), { n, theta })
}

function separationQuestion(random: Random): ComplexRaceQuestion | null {
    const n = pick(random, [3, 4, 5, 6, 8, 9, 10, 12])
    const answer = fraction(360 / n)
    const choices = options(random, answer, [whole(180 / n === Math.round(180 / n) ? 180 / n : 360 / n + 10, 'calculation'), whole(360, 'no-divide'), whole(n, 'calculation')])
    return choices && build(4, 'separation', say(`Zenbat gradu banatzen dira ondoz ondoko bi erro, $n=${n}$ denean?`, `¿Cuántos grados separan dos raíces seguidas de orden $n=${n}$?`, `كم درجة تفصل بين جذرين متتاليين من الرتبة $n=${n}$؟`, `How many degrees apart are two roots in a row of order $n=${n}$?`), choices, answer, same(`\\frac{360°}{${n}}=${360 / n}°`), { n })
}

function realRootsQuestion(random: Random): ComplexRaceQuestion | null {
    const n = randomInt(random, 2, 7)
    const [R, sign] = pick(random, [[2 ** n, 1], [2 ** n, -1]] as Array<[number, number]>)
    const count = sign > 0 ? (n % 2 === 0 ? 2 : 1) : n % 2 === 0 ? 0 : 1
    const answer = fraction(count)
    const choices = options(random, answer, [whole(n, 'all-real'), whole(count === 2 ? 1 : 2, 'calculation'), whole(count === 0 ? 1 : 0, 'calculation')])
    return choices && build(4, 'real-roots', say(`Zenbat soluzio erreal ditu $${'{z}'}^{${n}}=${sign * R}$ ekuazioak?`, `¿Cuántas soluciones reales tiene $${'{z}'}^{${n}}=${sign * R}$?`, `كم حلًّا حقيقيًا للمعادلة $${'{z}'}^{${n}}=${sign * R}$؟`, `How many real solutions does $${'{z}'}^{${n}}=${sign * R}$ have?`), choices, answer, say(`${n} erroetatik ${count} daude ardatz errealean.`, `De las ${n} raíces, ${count} están sobre el eje real.`, `من الجذور الـ ${n} يقع ${count} على المحور الحقيقي.`, `Of the ${n} roots, ${count} lie on the real axis.`), { n, R: sign * R })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => ComplexRaceQuestion | null>> = [
    [partQuestion, partQuestion, rootQuestion],
    [productQuestion, powerQuestion, divisionQuestion],
    [modulusQuestion, argumentQuestion, realFromPolarQuestion],
    [productArgumentQuestion, quotientQuestion, moivreQuestion],
    [rootModulusQuestion, firstArgumentQuestion, separationQuestion, realRootsQuestion]
]

export function generateComplexRaceQuestion(random: Random, circuit: number, tier: Tier): ComplexRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkComplexPitAnswer(question: RaceQuestion<ComplexRaceError>, input: string): AnswerCheck {
    return checkAnswer(readTrigonometryAnswer(input), question.answer, question.answerForm)
}

export function complexParTime(circuit: number): number {
    return parTimeFor([10, 13, 12, 12, 11][circuit] ?? 12)
}

export const complexRaceErrorTips: Record<ComplexRaceError, LocalizedText> = {
    sign: say('Begiratu zeinuari.', 'Mira el signo.', 'انظر إلى الإشارة.', 'Look at the sign.'),
    swapped: say('Zati erreala eta irudikaria nahastu dituzu.', 'Has confundido la parte real y la imaginaria.', 'خلطت بين الجزء الحقيقي والتخيلي.', 'You mixed up the real and the imaginary part.'),
    'no-root': say('Ez ahaztu erroa.', 'No olvides la raíz.', 'لا تنسَ الجذر.', 'Do not forget the root.'),
    'i-squared': say('i² = −1: bd gaiak zeinua aldatzen du.', 'i² = −1: el término bd cambia de signo.', 'i² = −1: الحد bd يغيّر إشارته.', 'i² = −1: the term bd changes sign.'),
    'part-by-part': say('Ez da zatitzen zatiz zati: biderkatu konjokatuaz.', 'No se divide parte a parte: multiplica por el conjugado.', 'لا نقسم جزءًا على جزء: اضرب في المرافق.', 'You do not divide part by part: multiply by the conjugate.'),
    quotient: say('Hondarrak agintzen du, ez zatidurak.', 'Cuenta el resto, no el cociente.', 'العبرة بالباقي لا بخارج القسمة.', 'The remainder counts, not the quotient.'),
    'modulus-sum': say('Modulua √(a² + b²) da, ez a + b.', 'El módulo es √(a² + b²), no a + b.', 'الطويلة √(a² + b²) لا a + b.', 'The modulus is √(a² + b²), not a + b.'),
    quadrant: say('Kalkulagailuaren angelua ez da beti zuzena: begiratu koadranteari.', 'El ángulo de la calculadora no siempre vale: mira el cuadrante.', 'زاوية الآلة الحاسبة لا تصلح دائمًا: انظر إلى الربع.', 'The calculator\'s angle does not always work: look at the quadrant.'),
    conjugate: say('Hori konjokatuarena da.', 'Ese es el del conjugado.', 'هذا للمرافق.', 'That is the conjugate\'s.'),
    opposite: say('Hori aurkakoarena da.', 'Ese es el del opuesto.', 'هذا للمعاكس.', 'That is the opposite\'s.'),
    'cos-sin': say('Zati errealak kosinua darama.', 'La parte real lleva el coseno.', 'الجزء الحقيقي يأخذ جيب التمام.', 'The real part takes the cosine.'),
    multiplied: say('Biderkatzean argumentuak batu egiten dira; zatitzean, moduluak zatitu.', 'Al multiplicar, los argumentos se suman; al dividir, los módulos se dividen.', 'عند الضرب تُجمع العُمَد، وعند القسمة تُقسم الطويلات.', 'When multiplying, the arguments add; when dividing, the moduli divide.'),
    subtracted: say('Moduluak zatitu egiten dira, ez kendu; argumentuak, batu.', 'Los módulos se dividen, no se restan; los argumentos del producto se suman.', 'الطويلات تُقسم ولا تُطرح؛ وعُمَد الجداء تُجمع.', 'The moduli divide, they do not subtract; the arguments of a product add.'),
    inverted: say('Zatiketa alderantziz egin duzu.', 'Has dividido al revés.', 'قسمت بالعكس.', 'You divided the wrong way round.'),
    'moivre-times': say('Moivre: modulua berretu egiten da, ez da bider n egiten.', 'Moivre: el módulo se eleva, no se multiplica por n.', 'دي موافر: تُرفع الطويلة إلى القوة ولا تُضرب في n.', 'De Moivre: the modulus is raised to the power, not multiplied by n.'),
    'no-turn': say('Kendu bira osoak: argumentua 0° eta 360° artean.', 'Quita las vueltas enteras: el argumento, entre 0° y 360°.', 'اطرح الدورات الكاملة: العمدة بين 0° و360°.', 'Take away whole turns: the argument goes between 0° and 360°.'),
    'no-divide': say('Zatitu n zenbakiaz.', 'Divide entre n.', 'اقسم على n.', 'Divide by n.'),
    'all-real': say('Erro guztiak ez daude ardatz errealean.', 'No todas las raíces están sobre el eje real.', 'ليست كل الجذور على المحور الحقيقي.', 'Not all the roots lie on the real axis.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}
