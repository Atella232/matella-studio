import { checkAnswer, fraction, type AnswerCheck } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { linearLatex, termLatex, termsLatex, type Term } from '../algebra.ts'

/* ==========================================================================
   Aljebraren lasterketa (1. DBH): question generators for five circuits,
   one per stage. Every wrong option comes from a typical mistake (x² for
   the double, adding the exponents when adding, the sign when
   transposing…) and explains it.
   ========================================================================== */

export const ALGEBRA_RACE_CIRCUITS = 5

export type AlgebraRaceError =
    | 'double-square'
    | 'order'
    | 'bracket'
    | 'priority'
    | 'sign'
    | 'coefficient'
    | 'degree-count'
    | 'not-like'
    | 'added-exponents'
    | 'multiplied-exponents'
    | 'forgot-coefficient'
    | 'transpose-sign'
    | 'transpose-operation'
    | 'calculation'

export type AlgebraRaceQuestion = RaceQuestion<AlgebraRaceError>

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const math = (latex: string) => `$${latex}$`
const all = (latex: string): LocalizedText => say(math(latex), math(latex), math(latex))

interface Candidate {
    latex: string
    error: AlgebraRaceError
}

/** Candidates are typed loosely so filtered literal arrays need no casts; their errors are all AlgebraRaceError */
function options(random: Random, right: string, candidates: Array<{ latex: string; error: string }>): RaceOption<AlgebraRaceError>[] | null {
    const used = new Set([right])
    const wrong: Candidate[] = []
    for (const candidate of candidates as Candidate[]) {
        if (wrong.length === 3) break
        if (used.has(candidate.latex)) continue
        used.add(candidate.latex)
        wrong.push(candidate)
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: right, correct: true, error: null }, ...wrong.map((candidate) => ({ latex: candidate.latex, correct: false, error: candidate.error }))])
}

const near = (value: number, error: AlgebraRaceError = 'calculation'): Candidate[] => [value + 1, value - 1, value + 2, value - 2].map((item) => ({ latex: String(item), error }))

function question(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<AlgebraRaceError>[], answer: number | null, solution: LocalizedText): AlgebraRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer: fraction(answer ?? 0), answerForm: 'any', percentAnswer: false, writable: answer !== null, solution }
}

/* ---------- Circuit 0: algebraic language ---------- */

interface Phrase {
    text: (n: number) => LocalizedText
    right: (n: number) => string
    wrong: (n: number) => Candidate[]
}

const phrases: Phrase[] = [
    { text: () => say('Zenbaki baten bikoitza', 'El doble de un número', 'ضعف عدد'), right: () => '2x', wrong: () => [{ latex: 'x^{2}', error: 'double-square' }, { latex: 'x+2', error: 'coefficient' }, { latex: '\\frac{x}{2}', error: 'coefficient' }] },
    { text: () => say('Zenbaki baten karratua', 'El cuadrado de un número', 'مربع عدد'), right: () => 'x^{2}', wrong: () => [{ latex: '2x', error: 'double-square' }, { latex: 'x+x', error: 'double-square' }, { latex: 'x^{3}', error: 'coefficient' }] },
    { text: (n) => say(`Zenbaki bat ken ${n}`, `Un número disminuido en ${n}`, `عدد ناقص ${n}`), right: (n) => `x-${n}`, wrong: (n) => [{ latex: `${n}-x`, error: 'order' }, { latex: `${n}x`, error: 'coefficient' }, { latex: `x+${n}`, error: 'sign' }] },
    { text: (n) => say(`Zenbaki baten hirukoitza gehi ${n}`, `El triple de un número más ${n}`, `ثلاثة أضعاف عدد زائد ${n}`), right: (n) => `3x+${n}`, wrong: (n) => [{ latex: `3(x+${n})`, error: 'bracket' }, { latex: `x+${3 * n}`, error: 'coefficient' }, { latex: `3x-${n}`, error: 'sign' }] },
    { text: (n) => say(`Zenbaki bat gehi ${n}, bider 2`, `El doble de un número aumentado en ${n}`, `ضعف (عدد زائد ${n})`), right: (n) => `2(x+${n})`, wrong: (n) => [{ latex: `2x+${n}`, error: 'bracket' }, { latex: `x+${2 * n}`, error: 'bracket' }, { latex: `2x+${2 * n + 1}`, error: 'calculation' }] },
    { text: (n) => say(`Zure adina duela ${n} urte`, `Tu edad hace ${n} años`, `عمرك قبل ${n} سنوات`), right: (n) => `x-${n}`, wrong: (n) => [{ latex: `x+${n}`, error: 'sign' }, { latex: `${n}-x`, error: 'order' }, { latex: `${n}x`, error: 'coefficient' }] },
    { text: () => say('Zenbaki baten erdia', 'La mitad de un número', 'نصف عدد'), right: () => '\\frac{x}{2}', wrong: () => [{ latex: '2x', error: 'coefficient' }, { latex: 'x-2', error: 'coefficient' }, { latex: 'x^{2}', error: 'double-square' }] }
]

function languageQuestion(random: Random, tier: Tier): AlgebraRaceQuestion | null {
    const phrase = pick(random, tier === 0 ? phrases.slice(0, 3) : phrases)
    const n = randomInt(random, 2, 9)
    const choices = options(random, phrase.right(n), phrase.wrong(n))
    if (!choices) return null
    return question(0, 'translate', say(`${phrase.text(n).eu}:`, `${phrase.text(n).es}:`, `${phrase.text(n).ar}:`), choices, null, all(phrase.right(n)))
}

function valueQuestion(random: Random, tier: Tier): AlgebraRaceQuestion | null {
    const a = randomInt(random, 2, 5)
    const b = randomInt(random, 1, 9) * (random() < 0.5 ? -1 : 1)
    const x = tier === 0 ? randomInt(random, 1, 5) : randomInt(random, -4, 6)
    if (x === 0) return null
    const square = tier === 2 && random() < 0.5
    const expression = square ? `x^{2}${b < 0 ? '' : '+'}${b}` : linearLatex({ a, b })
    const answer = square ? x * x + b : a * x + b
    const shown = x < 0 ? `(${x})` : String(x)
    const choices = options(random, String(answer), [
        ...(square ? [{ latex: String(2 * x + b), error: 'double-square' as const }] : [{ latex: String(Number(`${a}${Math.abs(x)}`) * Math.sign(x) + b), error: 'coefficient' as const }]),
        { latex: String(square ? -(x * x) + b : a * -x + b), error: 'sign' },
        ...(square ? [] : [{ latex: String(a * (x + b)), error: 'priority' as const }]),
        ...near(answer)
    ])
    if (!choices) return null
    const worked = square ? `${shown}^{2}${b < 0 ? '' : '+'}${b}=${answer}` : `${a}\\cdot ${shown}${b < 0 ? '' : '+'}${b}=${answer}`
    return question(0, 'value', say(`Zenbat balio du ${math(expression)} adierazpenak ${math(`x=${x}`)} denean?`, `¿Cuánto vale ${math(expression)} para ${math(`x=${x}`)}?`, `كم قيمة ${math(expression)} عندما ${math(`x=${x}`)}؟`), choices, answer, all(worked))
}

/* ---------- Circuit 1: monomials ---------- */

const letters = ['x', 'y', 'a', 'b']

function degreeQuestion(random: Random, tier: Tier): AlgebraRaceQuestion | null {
    const count = tier === 0 ? 1 : randomInt(random, 2, 3)
    const chosen = shuffle(random, letters).slice(0, count)
    const exponents = chosen.map(() => randomInt(random, 1, tier === 0 ? 4 : 3))
    const coefficient = randomInt(random, 2, 9) * (random() < 0.5 ? -1 : 1)
    const latex = `${coefficient}${chosen.map((letter, index) => (exponents[index] > 1 ? `${letter}^{${exponents[index]}}` : letter)).join('')}`
    const degree = exponents.reduce((sum, value) => sum + value, 0)
    const choices = options(random, String(degree), [
        { latex: String(coefficient), error: 'coefficient' },
        { latex: String(Math.max(...exponents)), error: 'degree-count' },
        { latex: String(count), error: 'degree-count' },
        ...near(degree)
    ])
    if (!choices) return null
    return question(1, 'degree', say(`Zein da ${math(latex)} monomioaren maila?`, `¿Cuál es el grado de ${math(latex)}?`, `ما درجة ${math(latex)}؟`), choices, degree, all(exponents.join('+') + `=${degree}`))
}

function likeQuestion(random: Random): AlgebraRaceQuestion | null {
    const power = randomInt(random, 1, 3)
    const coefficient = randomInt(random, 2, 7)
    const base: Term = { coefficient, power }
    const right: Term = { coefficient: randomInt(random, -6, 6) || 1, power }
    const choices = options(random, termLatex(right), [
        { latex: termLatex({ coefficient, power: power + 1 }), error: 'not-like' },
        { latex: termLatex({ coefficient, power: power === 1 ? 2 : power - 1 }), error: 'not-like' },
        { latex: `${coefficient}y${power > 1 ? `^{${power}}` : ''}`, error: 'not-like' }
    ])
    if (!choices) return null
    return question(1, 'like', say(`Zein da ${math(termLatex(base))} monomioaren antzekoa?`, `¿Cuál es semejante a ${math(termLatex(base))}?`, `أيها يشابه ${math(termLatex(base))}؟`), choices, null, say('Zati literal bera behar dute.', 'Tienen que tener la misma parte literal.', 'يجب أن يكون لهما الجزء الحرفي نفسه.'))
}

/* ---------- Circuit 2: operations with monomials ---------- */

function addQuestion(random: Random, tier: Tier): AlgebraRaceQuestion | null {
    const power = tier === 0 ? 1 : randomInt(random, 1, 2)
    const count = tier === 2 ? 3 : 2
    const coefficients = Array.from({ length: count }, () => randomInt(random, 1, 8) * (tier > 0 && random() < 0.4 ? -1 : 1))
    const sum = coefficients.reduce((total, value) => total + value, 0)
    if (sum === 0) return null
    const latex = termsLatex(coefficients.map((coefficient) => ({ coefficient, power })))
    const right = termLatex({ coefficient: sum, power })
    const choices = options(random, right, [
        { latex: termLatex({ coefficient: sum, power: power * count }), error: 'added-exponents' },
        { latex: termLatex({ coefficient: sum + 2 * Math.abs(coefficients[count - 1]) * (coefficients[count - 1] < 0 ? 1 : -1), power }), error: 'sign' },
        { latex: termLatex({ coefficient: sum + 1, power }), error: 'calculation' },
        { latex: termLatex({ coefficient: sum - 1, power }), error: 'calculation' }
    ].filter((candidate) => candidate.latex !== right))
    if (!choices) return null
    return question(2, 'add', say(`Laburtu: ${math(latex)}`, `Reduce: ${math(latex)}`, `بسّط: ${math(latex)}`), choices, null, all(`${latex}=${right}`))
}

function multiplyQuestion(random: Random, tier: Tier): AlgebraRaceQuestion | null {
    const left: Term = { coefficient: randomInt(random, 2, 6) * (tier > 0 && random() < 0.5 ? -1 : 1), power: randomInt(random, 1, 3) }
    const right: Term = { coefficient: randomInt(random, 2, 6), power: randomInt(random, 1, 3) }
    const product: Term = { coefficient: left.coefficient * right.coefficient, power: left.power + right.power }
    const latex = `${termLatex(left).startsWith('-') ? `(${termLatex(left)})` : termLatex(left)}\\cdot ${termLatex(right)}`
    const choices = options(random, termLatex(product), [
        { latex: termLatex({ coefficient: product.coefficient, power: left.power * right.power }), error: 'multiplied-exponents' },
        { latex: termLatex({ coefficient: left.coefficient + right.coefficient, power: product.power }), error: 'forgot-coefficient' },
        { latex: termLatex({ coefficient: -product.coefficient, power: product.power }), error: 'sign' },
        { latex: termLatex({ coefficient: product.coefficient, power: product.power + 1 }), error: 'calculation' }
    ].filter((candidate) => candidate.latex !== termLatex(product)))
    if (!choices) return null
    return question(2, 'multiply', say(`Biderkatu: ${math(latex)}`, `Multiplica: ${math(latex)}`, `اضرب: ${math(latex)}`), choices, null, all(`${latex}=${termLatex(product)}`))
}

/* ---------- Circuit 3: simple equations ---------- */

function simpleEquationQuestion(random: Random, tier: Tier): AlgebraRaceQuestion | null {
    const x = randomInt(random, tier === 0 ? 1 : -5, 12)
    const kind = pick(random, tier === 0 ? ['add', 'subtract', 'times'] : ['add', 'subtract', 'times', 'divide'])
    const n = randomInt(random, 2, 9)
    const cases: Record<string, { latex: string; answer: number; wrong: Candidate[]; worked: string }> = {
        add: { latex: `x+${n}=${x + n}`, answer: x, wrong: [{ latex: String(x + 2 * n), error: 'transpose-sign' }, { latex: String((x + n) * n), error: 'transpose-operation' }], worked: `x=${x + n}-${n}=${x}` },
        subtract: { latex: `x-${n}=${x - n}`, answer: x, wrong: [{ latex: String(x - 2 * n), error: 'transpose-sign' }, { latex: String(-x), error: 'sign' }], worked: `x=${x - n}+${n}=${x}` },
        times: { latex: `${n}x=${n * x}`, answer: x, wrong: [{ latex: String(n * x - n), error: 'transpose-operation' }, { latex: String(n * n * x), error: 'transpose-operation' }], worked: `x=${n * x}\\mathbin{:}${n}=${x}` },
        divide: { latex: `\\frac{x}{${n}}=${x}`, answer: n * x, wrong: [{ latex: String(x), error: 'transpose-operation' }, { latex: String(x + n), error: 'transpose-operation' }], worked: `x=${x}\\cdot ${n}=${n * x}` }
    }
    const { latex, answer, wrong, worked } = cases[kind]
    const choices = options(random, String(answer), [...wrong, ...near(answer)])
    if (!choices) return null
    return question(3, 'equation', say(`Ebatzi: ${math(latex)}`, `Resuelve: ${math(latex)}`, `حلّ: ${math(latex)}`), choices, answer, all(worked))
}

/* ---------- Circuit 4: two-step equations ---------- */

function twoStepQuestion(random: Random, tier: Tier): AlgebraRaceQuestion | null {
    const x = randomInt(random, tier === 0 ? 1 : -4, 9)
    const a = randomInt(random, 2, 6)
    const b = randomInt(random, 1, 9) * (random() < 0.5 ? -1 : 1)
    if (tier === 2 && random() < 0.5) {
        const c = randomInt(random, 1, a - 1)
        const d = (a - c) * x + b
        const latex = `${linearLatex({ a, b })}=${linearLatex({ a: c, b: d })}`
        const choices = options(random, String(x), [
            { latex: String((d + b) / (a - c)), error: 'transpose-sign' },
            { latex: String((d - b) / (a + c)), error: 'transpose-sign' },
            ...near(x)
        ].filter((candidate) => Number.isInteger(Number(candidate.latex))))
        if (!choices) return null
        return question(4, 'both-sides', say(`Ebatzi: ${math(latex)}`, `Resuelve: ${math(latex)}`, `حلّ: ${math(latex)}`), choices, x, all(`${a - c}x=${d - b}\\ \\to\\ x=${x}`))
    }
    const c = a * x + b
    const latex = `${linearLatex({ a, b })}=${c}`
    const choices = options(random, String(x), [
        ...((c + b) % a === 0 ? [{ latex: String((c + b) / a), error: 'transpose-sign' as const }] : []),
        { latex: String(c - b), error: 'transpose-operation' },
        { latex: String(a * (c - b)), error: 'transpose-operation' },
        ...near(x)
    ])
    if (!choices) return null
    return question(4, 'two-step', say(`Ebatzi: ${math(latex)}`, `Resuelve: ${math(latex)}`, `حلّ: ${math(latex)}`), choices, x, all(`${a}x=${c - b}\\ \\to\\ x=${x}`))
}

/* ---------- Public API ---------- */

type Generator = (random: Random, tier: Tier) => AlgebraRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [languageQuestion, valueQuestion],
    [degreeQuestion, (random) => likeQuestion(random)],
    [addQuestion, multiplyQuestion],
    [simpleEquationQuestion],
    [twoStepQuestion]
]

export function generateAlgebraRaceQuestion(random: Random, circuit: number, tier: Tier, requireWritable = false): AlgebraRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 400; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next && (!requireWritable || next.writable)) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkAlgebraPitAnswer(question: AlgebraRaceQuestion, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function algebraParTime(circuit: number): number {
    return parTimeFor([9, 8, 9, 8, 12][circuit] ?? 10)
}

export const algebraRaceErrorTips: Record<AlgebraRaceError, LocalizedText> = {
    'double-square': say('Bikoitza $2x$ da ($x+x$); karratua $x^{2}$ da ($x\\cdot x$).', 'El doble es $2x$ ($x+x$); el cuadrado, $x^{2}$ ($x\\cdot x$).', 'الضعف $2x$ ($x+x$)، والمربع $x^{2}$ ($x\\cdot x$).'),
    order: say('Kenketan ordena garrantzitsua da: «zenbaki bat ken 3» $x-3$ da.', 'En la resta importa el orden: «un número menos 3» es $x-3$.', 'في الطرح الترتيب مهم: «عدد ناقص 3» هو $x-3$.'),
    bracket: say('«Baturaren bikoitza» parentesiarekin idazten da; «bikoitza gehi», gabe.', '«El doble de la suma» lleva paréntesis; «el doble más», no.', '«ضعف المجموع» يُكتب بقوس، أما «الضعف زائد» فبدونه.'),
    priority: say('Lehenik biderketa, gero batuketa.', 'Primero la multiplicación, después la suma.', 'الضرب أولًا ثم الجمع.'),
    sign: say('Begiratu zeinuari: minus bat galdu edo gehitu duzu.', 'Mira el signo: has perdido o añadido un menos.', 'انتبه للإشارة: أضعت علامة ناقص أو أضفتها.'),
    coefficient: say('Koefizienteak x biderkatzen du; ez da batzen edo zatitzen.', 'El coeficiente multiplica a la x; no se suma ni se divide.', 'المعامل يضرب x؛ لا يُجمع ولا يُقسم.'),
    'degree-count': say('Maila berretzaile guztien batura da (1 berretzaileak ere bai).', 'El grado es la suma de todos los exponentes (también los que valen 1).', 'الدرجة مجموع كل الأسس (ومنها التي تساوي 1).'),
    'not-like': say('Antzekoak izateko, letra eta berretzaile berak behar dira.', 'Para ser semejantes hacen falta las mismas letras y los mismos exponentes.', 'لكي تكون متشابهة يلزم الحروف نفسها والأسس نفسها.'),
    'added-exponents': say('Batzean koefizienteak batzen dira; berretzailea ez da aldatzen.', 'Al sumar se suman los coeficientes; el exponente no cambia.', 'عند الجمع نجمع المعاملات؛ والأس لا يتغيّر.'),
    'multiplied-exponents': say('Biderkatzean berretzaileak batzen dira, ez biderkatzen.', 'Al multiplicar, los exponentes se suman, no se multiplican.', 'عند الضرب تُجمع الأسس ولا تُضرب.'),
    'forgot-coefficient': say('Koefizienteak biderkatu egiten dira, ez batu.', 'Los coeficientes se multiplican, no se suman.', 'المعاملات تُضرب ولا تُجمع.'),
    'transpose-sign': say('Batzen ari dena kentzen pasatzen da, eta kentzen ari dena batzen.', 'Lo que suma pasa restando y lo que resta pasa sumando.', 'ما يُجمع ينتقل مطروحًا وما يُطرح ينتقل مجموعًا.'),
    'transpose-operation': say('Biderkatzen ari dena zatitzen pasatzen da, eta zatitzen ari dena biderkatzen.', 'Lo que multiplica pasa dividiendo y lo que divide pasa multiplicando.', 'ما يَضرب ينتقل قاسمًا وما يَقسم ينتقل ضاربًا.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.')
}
