import { checkAnswer, fraction, type AnswerCheck } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { equationsRaceErrorTips, generateEquationsRaceQuestion, type EquationsRaceError } from '../../dbh2-ekuazioak-v2/games/race.ts'
import { linearLatex, type LinearEquation } from '../lab/labTools.ts'

/* ==========================================================================
   Ekuazioen eta sistemen lasterketa (4. DBH aplikatuak): five circuits, one
   per stage. The first-degree circuit borrows the 2. DBH brackets and
   denominators generators, and the quadratic circuit mixes the 2. DBH
   quadratics with the discriminant. Factored, radical and consecutive
   product equations, a point of a line, systems by substitution and by
   reduction, and heads-and-legs problems are new. Every answer is one
   number, so every question can be written at the pit stop. Wrong options
   are typical mistakes: the discriminant with +4ac, a root with the wrong
   sign, the false candidate of a radical equation, the other unknown of
   the system, the negative solution of a problem…
   ========================================================================== */

export const EQUATIONS_SYSTEMS_RACE_CIRCUITS = 5

export type EquationsSystemsRaceError = EquationsRaceError | 'delta-sign' | 'factor-sign' | 'false-root' | 'other-unknown' | 'negative-solution'

export type EquationsSystemsRaceQuestion = RaceQuestion<EquationsSystemsRaceError>

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const math = (latex: string) => `$${latex}$`
const all = (latex: string): LocalizedText => say(math(latex), math(latex), math(latex))
const signedRandom = (random: Random, min: number, max: number) => randomInt(random, min, max) * (random() < 0.5 ? -1 : 1)

interface Candidate {
    value: number
    error: EquationsSystemsRaceError
}

/** The right integer and three different wrong ones */
function options(random: Random, right: number, candidates: Candidate[]): RaceOption<EquationsSystemsRaceError>[] | null {
    const used = new Set([right])
    const wrong: Candidate[] = []
    for (const candidate of candidates) {
        if (wrong.length === 3) break
        if (!Number.isInteger(candidate.value) || used.has(candidate.value)) continue
        used.add(candidate.value)
        wrong.push(candidate)
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: String(right), correct: true, error: null }, ...wrong.map((candidate) => ({ latex: String(candidate.value), correct: false, error: candidate.error }))])
}

const near = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value - 2, -value].map((item) => ({ value: item, error: 'calculation' }))

function question(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<EquationsSystemsRaceError>[], answer: number, solution: LocalizedText): EquationsSystemsRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer: fraction(answer), answerForm: 'any', percentAnswer: false, writable: true, solution }
}

/** A 2. DBH equations question, renumbered as this race's circuit */
function borrowed(random: Random, circuit: number, tier: Tier, from: number[]): EquationsSystemsRaceQuestion {
    return { ...generateEquationsRaceQuestion(random, pick(random, from), tier), circuit }
}

/** x − r as LaTeX */
const binomial = (root: number) => (root === 0 ? 'x' : `x${root > 0 ? '-' : '+'}${Math.abs(root)}`)

/** x² + px + q = 0 as LaTeX */
function quadraticLatex(p: number, q: number): string {
    const middle = p === 0 ? '' : `${p < 0 ? '-' : '+'}${Math.abs(p) === 1 ? '' : Math.abs(p)}x`
    const last = q === 0 ? '' : `${q < 0 ? '-' : '+'}${Math.abs(q)}`
    return `x^{2}${middle}${last}=0`
}

/* ---------- Circuit 1: the discriminant ---------- */

function discriminantQuestion(random: Random, tier: Tier): EquationsSystemsRaceQuestion | null {
    const a = tier === 0 ? 1 : randomInt(random, 1, 3)
    const b = signedRandom(random, 1, tier === 2 ? 9 : 6)
    const c = signedRandom(random, 1, 8)
    const answer = b * b - 4 * a * c
    const choices = options(random, answer, [
        { value: b * b + 4 * a * c, error: 'delta-sign' },
        { value: -b * b - 4 * a * c, error: 'delta-sign' },
        { value: b * b - 4 * c, error: 'calculation' },
        { value: b * b - a * c, error: 'calculation' },
        ...near(answer)
    ])
    const equation = `${a === 1 ? '' : a}x^{2}${b < 0 ? '-' : '+'}${Math.abs(b) === 1 ? '' : Math.abs(b)}x${c < 0 ? '-' : '+'}${Math.abs(c)}=0`
    return choices && question(1, 'discriminant', say(
        `Zenbat da ${math(equation)} ekuazioaren diskriminatzailea?`,
        `¿Cuánto vale el discriminante de ${math(equation)}?`,
        `كم مميّز ${math(equation)}؟`
    ), choices, answer, all(`\\Delta=${b < 0 ? `(${b})` : b}^{2}-4\\cdot ${a}\\cdot ${c < 0 ? `(${c})` : c}=${answer}`))
}

/* ---------- Circuit 2: factored, radical and product equations ---------- */

function factoredQuestion(random: Random, tier: Tier): EquationsSystemsRaceQuestion | null {
    const roots = [signedRandom(random, 1, 9), signedRandom(random, 1, 9), ...(tier === 2 ? [signedRandom(random, 1, 9)] : [])]
    if (new Set(roots).size < roots.length) return null
    const largest = random() < 0.5
    const answer = largest ? Math.max(...roots) : Math.min(...roots)
    const equation = `${roots.map((root) => `(${binomial(root)})`).join('')}=0`
    const choices = options(random, answer, [
        ...roots.map((root): Candidate => ({ value: -root, error: 'factor-sign' })),
        ...roots.filter((root) => root !== answer).map((root): Candidate => ({ value: root, error: 'calculation' })),
        ...near(answer)
    ])
    return choices && question(2, 'factored', say(
        `${math(equation)}. Zein da ebazpen ${largest ? 'handiena' : 'txikiena'}?`,
        `${math(equation)}. ¿Cuál es la ${largest ? 'mayor' : 'menor'} solución?`,
        `${math(equation)}. ما الحل ${largest ? 'الأكبر' : 'الأصغر'}؟`
    ), choices, answer, all(`x=${roots.join(',\\ x=')}`))
}

/** √(x + b) = x + c with two whole candidates, one of them false */
function radicalQuestion(random: Random): EquationsSystemsRaceQuestion | null {
    const answer = randomInt(random, 1, 9)
    const c = randomInt(random, -answer, 4)
    // The right side x + c is the root, so it is ≥ 0; the inside is its square
    const root = answer + c
    if (root < 1) return null
    const b = root * root - answer
    // Squaring: x² + (2c − 1)x + c² − b = 0, whose other root is the false one
    const other = 1 - 2 * c - answer
    if (other === answer || other + c >= 0 || other + b < 0) return null
    const equation = `\\sqrt{${binomial(-b)}}=${binomial(-c)}`
    const choices = options(random, answer, [{ value: other, error: 'false-root' }, ...near(answer), { value: root, error: 'calculation' }])
    return choices && question(2, 'radical', say(
        `Ebatzi ${math(equation)}.`,
        `Resuelve ${math(equation)}.`,
        `حلّ ${math(equation)}.`
    ), choices, answer, all(`${quadraticLatex(2 * c - 1, c * c - b)}\\to x=${answer};\\ x=${other}\\ \\times`))
}

/** Two consecutive naturals with a given product: the smaller one */
function productQuestion(random: Random, tier: Tier): EquationsSystemsRaceQuestion | null {
    const answer = randomInt(random, tier === 0 ? 3 : 6, tier === 2 ? 25 : 14)
    const product = answer * (answer + 1)
    const choices = options(random, answer, [{ value: -(answer + 1), error: 'negative-solution' }, { value: answer + 1, error: 'wrong-equation' }, ...near(answer)])
    return choices && question(2, 'product', say(
        `Bi zenbaki natural jarraien biderkadura ${product} da. Zein da txikiena?`,
        `El producto de dos números naturales consecutivos es ${product}. ¿Cuál es el menor?`,
        `جداء عددين طبيعيين متتاليين ${product}. ما الأصغر؟`
    ), choices, answer, all(`x(x+1)=${product}\\to x=${answer}`))
}

/* ---------- Circuits 3 and 4: systems ---------- */

/** A system with a whole solution: the coefficients are small and the determinant is not 0 */
function system(random: Random, tier: Tier, easy: boolean): { first: LinearEquation; second: LinearEquation; x: number; y: number } | null {
    const x = signedRandom(random, 1, tier === 0 ? 6 : 9)
    const y = signedRandom(random, 1, tier === 0 ? 6 : 9)
    const a1 = easy ? 1 : randomInt(random, 1, 5)
    const b1 = easy ? signedRandom(random, 1, 3) : signedRandom(random, 1, 5)
    const a2 = randomInt(random, 1, 5)
    const b2 = easy ? pick(random, [1, -1]) : signedRandom(random, 1, 5)
    if (a1 * b2 - a2 * b1 === 0) return null
    return { first: [a1, b1, a1 * x + b1 * y], second: [a2, b2, a2 * x + b2 * y], x, y }
}

const systemLatex = (first: LinearEquation, second: LinearEquation) => `${linearLatex(first)},\\ ${linearLatex(second)}`

function systemQuestion(random: Random, tier: Tier, circuit: 3 | 4): EquationsSystemsRaceQuestion | null {
    const found = system(random, tier, circuit === 3)
    if (!found) return null
    const { first, second, x, y } = found
    const askX = random() < 0.5
    const answer = askX ? x : y
    const other = askX ? y : x
    const choices = options(random, answer, [{ value: other, error: 'other-unknown' }, { value: -answer, error: 'transpose-sign' }, ...near(answer)])
    const method = circuit === 3 ? say('ordezkapenez', 'por sustitución', 'بالتعويض') : say('laburketaz', 'por reducción', 'بالحذف')
    const letter = askX ? 'x' : 'y'
    return choices && question(circuit, circuit === 3 ? 'substitution' : 'reduction', say(
        `Ebatzi ${method.eu} ${math(systemLatex(first, second))}. Zenbat da ${letter}?`,
        `Resuelve ${method.es} ${math(systemLatex(first, second))}. ¿Cuánto vale ${letter}?`,
        `حلّ ${method.ar} ${math(systemLatex(first, second))}. كم ${letter}؟`
    ), choices, answer, all(`x=${x},\\ y=${y}`))
}

/** A point of a line: y for a given x */
function pointQuestion(random: Random, tier: Tier): EquationsSystemsRaceQuestion | null {
    const a = signedRandom(random, 1, 5)
    const b = pick(random, tier === 0 ? [1] : [1, -1, 2])
    const x = signedRandom(random, 1, 6)
    const y = randomInt(random, -6, 8)
    const equation: LinearEquation = [a, b, a * x + b * y]
    const choices = options(random, y, [{ value: x, error: 'other-unknown' }, { value: (equation[2] + a * x) / b, error: 'transpose-sign' }, ...near(y)])
    return choices && question(3, 'point', say(
        `${math(linearLatex(equation))} ekuazioan, zenbat da y ${math(`x=${x}`)} denean?`,
        `En ${math(linearLatex(equation))}, ¿cuánto vale y cuando ${math(`x=${x}`)}?`,
        `في ${math(linearLatex(equation))}، كم y عندما ${math(`x=${x}`)}؟`
    ), choices, y, all(`${a}\\cdot(${x})${b < 0 ? '-' : '+'}${Math.abs(b) === 1 ? '' : Math.abs(b)}y=${equation[2]}\\to y=${y}`))
}

/** Heads and legs: hens (2 legs) and rabbits (4 legs) */
function farmQuestion(random: Random): EquationsSystemsRaceQuestion | null {
    const hens = randomInt(random, 3, 30)
    const rabbits = randomInt(random, 3, 30)
    const heads = hens + rabbits
    const legs = 2 * hens + 4 * rabbits
    const choices = options(random, rabbits, [{ value: hens, error: 'other-unknown' }, { value: legs / 4, error: 'wrong-equation' }, { value: legs - 2 * heads, error: 'calculation' }, ...near(rabbits)])
    return choices && question(4, 'farm', say(
        `Baserri batean oiloak eta untxiak daude: ${heads} buru eta ${legs} hanka. Zenbat untxi daude?`,
        `En una granja hay gallinas y conejos: ${heads} cabezas y ${legs} patas. ¿Cuántos conejos hay?`,
        `في مزرعة دجاج وأرانب: ${heads} رأسًا و${legs} رجلًا. كم أرنبًا؟`
    ), choices, rabbits, all(`x+y=${heads},\\ 2x+4y=${legs}\\to y=${rabbits}`))
}

/** Two numbers from their sum and difference: the larger one */
function sumDifferenceQuestion(random: Random): EquationsSystemsRaceQuestion | null {
    const small = randomInt(random, 4, 40)
    const large = small + randomInt(random, 2, 30)
    const choices = options(random, large, [{ value: small, error: 'other-unknown' }, { value: large + small, error: 'calculation' }, ...near(large)])
    return choices && question(4, 'sum-difference', say(
        `Bi zenbakiren batura ${large + small} da eta kendura ${large - small}. Zein da handiena?`,
        `Dos números suman ${large + small} y su diferencia es ${large - small}. ¿Cuál es el mayor?`,
        `مجموع عددين ${large + small} والفرق بينهما ${large - small}. ما الأكبر؟`
    ), choices, large, all(`2x=${2 * large}\\to x=${large}`))
}

/* ---------- Public API ---------- */

type Generator = (random: Random, tier: Tier) => EquationsSystemsRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [(random, tier) => borrowed(random, 0, tier, [1, 2])],
    [(random, tier) => borrowed(random, 1, tier, [4]), discriminantQuestion],
    [factoredQuestion, (random) => radicalQuestion(random), productQuestion],
    [pointQuestion, (random, tier) => systemQuestion(random, tier, 3), (random, tier) => systemQuestion(random, tier, 3)],
    [(random, tier) => systemQuestion(random, tier, 4), (random) => farmQuestion(random), (random) => sumDifferenceQuestion(random)]
]

export function generateEquationsSystemsRaceQuestion(random: Random, circuit: number, tier: Tier): EquationsSystemsRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 400; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkEquationsSystemsPitAnswer(question: EquationsSystemsRaceQuestion, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function equationsSystemsParTime(circuit: number): number {
    return parTimeFor([12, 12, 12, 13, 14][circuit] ?? 12)
}

export const equationsSystemsRaceErrorTips: Record<EquationsSystemsRaceError, LocalizedText> = {
    ...equationsRaceErrorTips,
    'delta-sign': say('$\\Delta=b^{2}-4ac$: kendu, eta kontuz c negatiboa denean ($-4ac$ positibo bihurtzen da).', '$\\Delta=b^{2}-4ac$: se resta, y cuidado cuando c es negativo ($-4ac$ se vuelve positivo).', '$\\Delta=b^{2}-4ac$: نطرح، وانتبه عندما يكون c سالبًا (يصير $-4ac$ موجبًا).'),
    'factor-sign': say('$(x-3)=0$ bada, $x=3$; $(x+3)=0$ bada, $x=-3$. Zeinua aldatzen da.', 'Si $(x-3)=0$, $x=3$; si $(x+3)=0$, $x=-3$. El signo cambia.', 'إذا كان $(x-3)=0$ فإن $x=3$؛ وإذا كان $(x+3)=0$ فإن $x=-3$. تتغيّر الإشارة.'),
    'false-root': say('Karratura jasotzean ebazpen faltsuak agertzen dira: egiaztatu hasierako ekuazioan, erroa ezin da negatiboa izan.', 'Al elevar al cuadrado aparecen soluciones falsas: comprueba en la ecuación inicial, la raíz no puede ser negativa.', 'بالتربيع تظهر حلول زائفة: تحقّق في المعادلة الأصلية، فالجذر لا يكون سالبًا.'),
    'other-unknown': say('Hori beste ezezagunaren balioa da. Irakurri zer galdetzen den.', 'Ese es el valor de la otra incógnita. Lee qué se pregunta.', 'هذه قيمة المجهول الآخر. اقرأ المطلوب.'),
    'negative-solution': say('Zenbaki naturalak eskatzen dira: ebazpen negatiboa baztertu.', 'Se piden números naturales: descarta la solución negativa.', 'المطلوب أعداد طبيعية: استبعد الحل السالب.')
}
