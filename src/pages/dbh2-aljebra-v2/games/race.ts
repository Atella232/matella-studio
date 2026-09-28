import { checkAnswer, fraction, type AnswerCheck } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { reduceTerms, termLatex, termsLatex, type Term } from '../../dbh1-aljebra-v2/algebra.ts'

/* ==========================================================================
   Aljebraren lasterketa (2. DBH): five circuits, one per stage. Every
   wrong option comes from a typical mistake (−3² read as 9, exponents
   multiplied, only the first sign changed after a minus, the 2ab left
   out, a factor that is common but not the greatest…) and explains it.
   ========================================================================== */

export const ALGEBRA_RACE_CIRCUITS = 5

export type AlgebraRaceError =
    | 'square-sign'
    | 'priority'
    | 'general-term'
    | 'added-exponents'
    | 'multiplied-exponents'
    | 'coefficients'
    | 'bracket-sign'
    | 'forgot-term'
    | 'no-double'
    | 'last-sign'
    | 'half-double'
    | 'not-greatest'
    | 'lost-one'
    | 'calculation'

export type AlgebraRaceQuestion = RaceQuestion<AlgebraRaceError>

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const math = (latex: string) => `$${latex}$`
const all = (latex: string): LocalizedText => say(math(latex), math(latex), math(latex))
const signedRandom = (random: Random, min: number, max: number) => randomInt(random, min, max) * (random() < 0.5 ? -1 : 1)

interface Candidate {
    latex: string
    error: AlgebraRaceError
}

function options(random: Random, right: string, candidates: Candidate[]): RaceOption<AlgebraRaceError>[] | null {
    const used = new Set([right])
    const wrong: Candidate[] = []
    for (const candidate of candidates) {
        if (wrong.length === 3) break
        if (used.has(candidate.latex)) continue
        used.add(candidate.latex)
        wrong.push(candidate)
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: right, correct: true, error: null }, ...wrong.map((candidate) => ({ latex: candidate.latex, correct: false, error: candidate.error }))])
}

const near = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value - 2].map((item) => ({ latex: String(item), error: 'calculation' }))

function question(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<AlgebraRaceError>[], answer: number | null, solution: LocalizedText): AlgebraRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer: fraction(answer ?? 0), answerForm: 'any', percentAnswer: false, writable: answer !== null, solution }
}

const poly = (terms: Term[]) => termsLatex(reduceTerms(terms))
const t = (coefficient: number, power: number): Term => ({ coefficient, power })
/** A factor written before a bracket: 3x(…), −2(…) */
const factorBefore = (term: Term) => (term.coefficient === 1 && term.power === 0 ? '' : term.coefficient === -1 && term.power === 0 ? '-' : termLatex(term))

/* ---------- Circuit 0: numerical value and general terms ---------- */

function valueQuestion(random: Random, tier: Tier): AlgebraRaceQuestion | null {
    if (tier > 0 && random() < 0.35) {
        const p = randomInt(random, 2, 6)
        const q = signedRandom(random, 1, 5)
        const n = randomInt(random, 10, 30)
        const rule = termsLatex([t(p, 1), t(q, 0)]).replace('x', 'n')
        const answer = p * n + q
        const choices = options(random, String(answer), [{ latex: String(p * n), error: 'general-term' }, { latex: String(p + q + n), error: 'general-term' }, { latex: String(p * (n + q)), error: 'priority' }, ...near(answer)])
        if (!choices) return null
        return question(0, 'term', say(`${math(`a_{n}=${rule}`)} bada, zenbat da ${math(`a_{${n}}`)}?`, `Si ${math(`a_{n}=${rule}`)}, ¿cuánto vale ${math(`a_{${n}}`)}?`, `إذا كان ${math(`a_{n}=${rule}`)} فكم ${math(`a_{${n}}`)}؟`), choices, answer, all(`${p}\\cdot ${n}${q < 0 ? '' : '+'}${q}=${answer}`))
    }
    const a = signedRandom(random, 1, 4)
    const b = signedRandom(random, 1, 6)
    const c = randomInt(random, -6, 6)
    const x = tier === 0 ? randomInt(random, 1, 4) : signedRandom(random, 1, 4)
    const expression = poly([t(a, 2), t(b, 1), t(c, 0)])
    const answer = a * x * x + b * x + c
    const shown = x < 0 ? `(${x})` : String(x)
    const choices = options(random, String(answer), [
        { latex: String(-a * x * x + b * x + c), error: 'square-sign' },
        { latex: String(a * 2 * x + b * x + c), error: 'priority' },
        { latex: String(a * x * x - b * x + c), error: 'calculation' },
        ...near(answer)
    ])
    if (!choices) return null
    const aPart = a === 1 ? '' : a === -1 ? '-' : `${a}\\cdot `
    const bPart = `${b < 0 ? '-' : '+'}${Math.abs(b) === 1 ? '' : `${Math.abs(b)}\\cdot `}`
    const worked = `${aPart}${shown}^{2}${bPart}${shown}${c === 0 ? '' : c < 0 ? c : `+${c}`}=${answer}`
    return question(0, 'value', say(`Zenbat da ${math(expression)} balioa ${math(`x=${x}`)} denean?`, `¿Cuánto vale ${math(expression)} para ${math(`x=${x}`)}?`, `كم قيمة ${math(expression)} عندما ${math(`x=${x}`)}؟`), choices, answer, all(worked))
}

/* ---------- Circuit 1: monomials ---------- */

function monomialQuestion(random: Random, tier: Tier): AlgebraRaceQuestion | null {
    const kind = pick(random, tier === 0 ? ['add', 'multiply'] as const : ['add', 'multiply', 'divide'] as const)
    if (kind === 'add') {
        const power = randomInt(random, 1, 3)
        const first = randomInt(random, 2, 9)
        const second = signedRandom(random, 2, 9)
        const sum = first + second
        if (sum === 0) return null
        const expression = poly([t(first, power)]) + (second < 0 ? '' : '+') + poly([t(second, power)])
        const right = poly([t(sum, power)])
        const choices = options(random, right, [
            { latex: poly([t(sum, 2 * power)]), error: 'added-exponents' },
            { latex: poly([t(first * second, power)]), error: 'coefficients' },
            { latex: poly([t(sum + 1, power)]), error: 'calculation' },
            { latex: poly([t(first - second, power)]), error: 'calculation' }
        ])
        return choices && question(1, kind, say(`Laburtu ${math(expression)}.`, `Reduce ${math(expression)}.`, `بسّط ${math(expression)}.`), choices, null, all(`${expression}=${right}`))
    }
    const p = randomInt(random, 1, 4)
    const q = randomInt(random, 2, 4)
    if (kind === 'multiply') {
        const a = signedRandom(random, 2, 6)
        const b = randomInt(random, 2, 6)
        const left = termLatex(t(a, p))
        const expression = `${a < 0 ? `(${left})` : left}\\cdot ${termLatex(t(b, q))}`
        const right = termLatex(t(a * b, p + q))
        const choices = options(random, right, [
            { latex: termLatex(t(a * b, p * q)), error: 'multiplied-exponents' },
            { latex: termLatex(t(a + b, p + q)), error: 'coefficients' },
            { latex: termLatex(t(-a * b, p + q)), error: 'calculation' },
            { latex: termLatex(t(a * b, p + q + 1)), error: 'calculation' }
        ])
        return choices && question(1, kind, say(`Kalkulatu ${math(expression)}.`, `Calcula ${math(expression)}.`, `احسب ${math(expression)}.`), choices, null, all(`${expression}=${right}`))
    }
    const quotient = signedRandom(random, 2, 5)
    const divisor = randomInt(random, 2, 5)
    const high = p + q
    const expression = `(${termLatex(t(quotient * divisor, high))})\\mathbin{:}(${termLatex(t(divisor, p))})`
    const right = termLatex(t(quotient, q))
    const choices = options(random, right, [
        { latex: termLatex(t(quotient, high)), error: 'added-exponents' },
        { latex: termLatex(t(quotient * divisor - divisor, q)), error: 'coefficients' },
        { latex: termLatex(t(quotient, q + 1)), error: 'calculation' },
        { latex: termLatex(t(-quotient, q)), error: 'calculation' }
    ])
    return choices && question(1, kind, say(`Kalkulatu ${math(expression)}.`, `Calcula ${math(expression)}.`, `احسب ${math(expression)}.`), choices, null, all(`${expression}=${right}`))
}

/* ---------- Circuit 2: polynomials ---------- */

function polynomialQuestion(random: Random, tier: Tier): AlgebraRaceQuestion | null {
    const kind = pick(random, tier === 0 ? ['subtract', 'monomial'] as const : ['subtract', 'monomial', 'binomials'] as const)
    if (kind === 'subtract') {
        const first = [t(randomInt(random, 2, 7), 2), t(signedRandom(random, 1, 6), 1), t(signedRandom(random, 1, 6), 0)]
        const second = [t(randomInt(random, 1, 5), 2), t(signedRandom(random, 1, 6), 1), t(signedRandom(random, 1, 6), 0)]
        const expression = `(${poly(first)})-(${poly(second)})`
        const right = poly([...first, ...second.map((term) => t(-term.coefficient, term.power))])
        const choices = options(random, right, [
            { latex: poly([...first, t(-second[0].coefficient, 2), second[1], second[2]]), error: 'bracket-sign' },
            { latex: poly([...first, ...second]), error: 'bracket-sign' },
            { latex: poly([...first, t(-second[0].coefficient, 2), t(-second[1].coefficient, 1), second[2]]), error: 'bracket-sign' }
        ])
        return choices && question(2, kind, say(`Kalkulatu ${math(expression)}.`, `Calcula ${math(expression)}.`, `احسب ${math(expression)}.`), choices, null, all(`${expression}=${right}`))
    }
    if (kind === 'monomial') {
        const factor = t(signedRandom(random, 2, 5), randomInt(random, 1, 2))
        const inner = [t(randomInt(random, 1, 4), 2), t(signedRandom(random, 1, 5), 1), t(signedRandom(random, 1, 6), 0)]
        const expression = `${factorBefore(factor)}(${poly(inner)})`
        const product = inner.map((term) => t(term.coefficient * factor.coefficient, term.power + factor.power))
        const right = poly(product)
        const choices = options(random, right, [
            { latex: poly([product[0], inner[1], inner[2]]), error: 'forgot-term' },
            { latex: poly(inner.map((term) => t(term.coefficient * factor.coefficient, term.power))), error: 'added-exponents' },
            { latex: poly([product[0], product[1], t(inner[2].coefficient * factor.coefficient, 0)]), error: 'added-exponents' },
            { latex: poly(inner.map((term) => t(term.coefficient * factor.coefficient, term.power * (factor.power + 1)))), error: 'multiplied-exponents' }
        ])
        return choices && question(2, kind, say(`Kalkulatu ${math(expression)}.`, `Calcula ${math(expression)}.`, `احسب ${math(expression)}.`), choices, null, all(`${expression}=${right}`))
    }
    const a = signedRandom(random, 1, 7)
    const b = signedRandom(random, 1, 7)
    if (a === -b) return null
    const expression = `(${poly([t(1, 1), t(a, 0)])})(${poly([t(1, 1), t(b, 0)])})`
    const right = poly([t(1, 2), t(a + b, 1), t(a * b, 0)])
    const choices = options(random, right, [
        { latex: poly([t(1, 2), t(a * b, 0)]), error: 'forgot-term' },
        { latex: poly([t(1, 2), t(a * b, 1), t(a + b, 0)]), error: 'calculation' },
        { latex: poly([t(1, 2), t(a + b, 1), t(a + b, 0)]), error: 'calculation' },
        { latex: poly([t(1, 2), t(a - b, 1), t(a * b, 0)]), error: 'calculation' }
    ])
    return choices && question(2, kind, say(`Kalkulatu ${math(expression)}.`, `Calcula ${math(expression)}.`, `احسب ${math(expression)}.`), choices, null, all(`${expression}=${right}`))
}

/* ---------- Circuit 3: notable products ---------- */

function productQuestion(random: Random, tier: Tier): AlgebraRaceQuestion | null {
    const kind = pick(random, ['sum', 'difference', 'product'] as const)
    const p = tier === 0 ? 1 : randomInt(random, 1, 4)
    const q = randomInt(random, 1, 9)
    const base = (sign: 1 | -1) => poly([t(p, 1), t(sign * q, 0)])
    if (kind === 'product') {
        const expression = `(${base(1)})(${base(-1)})`
        const right = poly([t(p * p, 2), t(-q * q, 0)])
        const choices = options(random, right, [
            { latex: poly([t(p * p, 2), t(q * q, 0)]), error: 'last-sign' },
            { latex: poly([t(p * p, 2), t(-2 * p * q, 1), t(-q * q, 0)]), error: 'calculation' },
            { latex: poly([t(p * p, 2), t(-2 * q, 0)]), error: 'calculation' },
            { latex: poly([t(p, 2), t(-q, 0)]), error: 'calculation' }
        ])
        return choices && question(3, kind, say(`Garatu ${math(expression)}.`, `Desarrolla ${math(expression)}.`, `انشر ${math(expression)}.`), choices, null, all(`${expression}=${right}`))
    }
    const sign = kind === 'sum' ? 1 : -1
    const expression = `(${base(sign)})^{2}`
    const right = poly([t(p * p, 2), t(sign * 2 * p * q, 1), t(q * q, 0)])
    const choices = options(random, right, [
        { latex: poly([t(p * p, 2), t(q * q, 0)]), error: 'no-double' },
        { latex: poly([t(p * p, 2), t(sign * p * q, 1), t(q * q, 0)]), error: 'half-double' },
        { latex: poly([t(p * p, 2), t(sign * 2 * p * q, 1), t(-q * q, 0)]), error: 'last-sign' },
        { latex: poly([t(p * p, 2), t(q * q, 0)]).replace('+', '-'), error: 'no-double' }
    ])
    return choices && question(3, kind, say(`Garatu ${math(expression)}.`, `Desarrolla ${math(expression)}.`, `انشر ${math(expression)}.`), choices, null, all(`${expression}=${right}`))
}

/* ---------- Circuit 4: common factor and factorisation ---------- */

function factorQuestion(random: Random, tier: Tier): AlgebraRaceQuestion | null {
    if (tier === 2 && random() < 0.4) {
        const q = randomInt(random, 2, 9)
        const sign = random() < 0.5 ? 1 : -1
        const expression = poly([t(1, 2), t(sign * 2 * q, 1), t(q * q, 0)])
        const right = `(${poly([t(1, 1), t(sign * q, 0)])})^{2}`
        const choices = options(random, right, [
            { latex: `(${poly([t(1, 1), t(-sign * q, 0)])})^{2}`, error: 'last-sign' },
            { latex: `(${poly([t(1, 1), t(sign * q * q, 0)])})^{2}`, error: 'calculation' },
            { latex: `(${poly([t(1, 1), t(q, 0)])})(${poly([t(1, 1), t(-q, 0)])})`, error: 'no-double' },
            { latex: `(${poly([t(1, 1), t(sign * 2 * q, 0)])})^{2}`, error: 'half-double' }
        ])
        return choices && question(4, 'square', say(`Idatzi karratu gisa: ${math(expression)}.`, `Escribe como un cuadrado: ${math(expression)}.`, `اكتب على شكل مربع: ${math(expression)}.`), choices, null, all(`${expression}=${right}`))
    }
    const gcd = randomInt(random, 2, 6)
    const power = randomInt(random, tier === 0 ? 0 : 1, 2)
    const inner = tier === 0
        ? [t(randomInt(random, 1, 5), 1), t(signedRandom(random, 1, 5), 0)]
        : [t(randomInt(random, 1, 5), 2), t(signedRandom(random, 1, 5), 1), t(1, 0)]
    // The bracket must have nothing in common left: coprime coefficients
    const innerGcd = inner.reduce((result, term) => { let [x, y] = [Math.abs(result), Math.abs(term.coefficient)]; while (y) [x, y] = [y, x % y]; return x }, 0)
    if (innerGcd !== 1) return null
    const factor = t(gcd, power)
    const expanded = inner.map((term) => t(term.coefficient * gcd, term.power + power))
    const expression = poly(expanded)
    const write = (outside: Term, terms: Term[]) => `${factorBefore(outside)}(${poly(terms)})`
    const right = write(factor, inner)
    const distractors: Candidate[] = [
        { latex: write(t(gcd, 0), inner.map((term) => t(term.coefficient, term.power + power))), error: 'not-greatest' },
        { latex: write(factor, inner.filter((term) => term.power > 0 || term.coefficient !== 1)), error: 'lost-one' },
        { latex: write(t(gcd, power + 1), inner.map((term) => t(term.coefficient, term.power - 1))), error: 'not-greatest' },
        { latex: write(factor, inner.map((term) => t(term.coefficient * gcd, term.power))), error: 'calculation' },
        { latex: write(factor, inner.map((term, index) => (index === 1 ? t(-term.coefficient, term.power) : term))), error: 'calculation' }
    ]
    const candidates = distractors.filter((candidate) => !candidate.latex.includes('^{-') && candidate.latex !== right)
    const choices = options(random, right, candidates)
    return choices && question(4, 'common', say(`Atera faktore komuna: ${math(expression)}.`, `Saca factor común: ${math(expression)}.`, `أخرج العامل المشترك: ${math(expression)}.`), choices, null, all(`${expression}=${right}`))
}

/* ---------- Public API ---------- */

type Generator = (random: Random, tier: Tier) => AlgebraRaceQuestion | null

const circuitGenerators: Generator[] = [valueQuestion, monomialQuestion, polynomialQuestion, productQuestion, factorQuestion]

export function generateAlgebraRaceQuestion(random: Random, circuit: number, tier: Tier): AlgebraRaceQuestion {
    const generator = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 400; attempt += 1) {
        const next = generator(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkAlgebraPitAnswer(question: AlgebraRaceQuestion, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function algebraParTime(circuit: number): number {
    return parTimeFor([10, 9, 12, 11, 12][circuit] ?? 10)
}

export const algebraRaceErrorTips: Record<AlgebraRaceError, LocalizedText> = {
    'square-sign': say('$(-3)^{2}=9$: negatibo baten karratua positiboa da. Jarri parentesiak.', '$(-3)^{2}=9$: el cuadrado de un negativo es positivo. Pon paréntesis.', '$(-3)^{2}=9$: مربع السالب موجب. ضع الأقواس.'),
    priority: say('Lehenik berreturak eta biderketak, gero batuketak.', 'Primero potencias y productos, después sumas.', 'القوى والضرب أولًا ثم الجمع.'),
    'general-term': say('Ordeztu n zenbakiaz formula osoan.', 'Sustituye n por el número en toda la fórmula.', 'عوّض n بالعدد في الصيغة كلها.'),
    'added-exponents': say('Batzean berretzaileak ez dira aldatzen; biderkatzean batu egiten dira; zatitzean, kendu.', 'Al sumar, los exponentes no cambian; al multiplicar se suman; al dividir, se restan.', 'في الجمع لا تتغيّر الأسس، وفي الضرب تُجمع، وفي القسمة تُطرح.'),
    'multiplied-exponents': say('Berretzaileak batu egiten dira, ez biderkatu: $x^{2}\\cdot x^{3}=x^{5}$.', 'Los exponentes se suman, no se multiplican: $x^{2}\\cdot x^{3}=x^{5}$.', 'الأسس تُجمع ولا تُضرب: $x^{2}\\cdot x^{3}=x^{5}$.'),
    coefficients: say('Koefizienteekin, eragiketa bera: batzean batu, biderkatzean biderkatu.', 'Con los coeficientes, la misma operación: al sumar se suman, al multiplicar se multiplican.', 'مع المعاملات العملية نفسها: في الجمع تُجمع وفي الضرب تُضرب.'),
    'bracket-sign': say('Minus baten atzeko parentesian gai GUZTIEK aldatzen dute zeinua.', 'Tras un menos, TODOS los términos del paréntesis cambian de signo.', 'بعد الناقص تتغيّر إشارة كل حدود القوس.'),
    'forgot-term': say('Gai bakoitza beste parentesiko gai guztiez biderkatu behar da.', 'Cada término se multiplica por todos los del otro paréntesis.', 'كل حد يُضرب في كل حدود القوس الآخر.'),
    'no-double': say('$(a+b)^{2}$ ez da $a^{2}+b^{2}$: falta da $2ab$.', '$(a+b)^{2}$ no es $a^{2}+b^{2}$: falta $2ab$.', '$(a+b)^{2}$ ليست $a^{2}+b^{2}$: ينقص $2ab$.'),
    'last-sign': say('Karratu bat beti da positiboa; batura bider kenduran, berriz, $-b^{2}$.', 'Un cuadrado siempre es positivo; en suma por diferencia, en cambio, $-b^{2}$.', 'المربع موجب دائمًا؛ أما في مجموع في فرق فـ$-b^{2}$.'),
    'half-double': say('Erdiko gaia BIKOITZA da: $2\\cdot a\\cdot b$.', 'El término del medio es el DOBLE: $2\\cdot a\\cdot b$.', 'الحد الأوسط هو الضعف: $2\\cdot a\\cdot b$.'),
    'not-greatest': say('Faktore komuna da, baina ez handiena: hartu koefizienteen ZKH eta letra komunak berretzaile txikienarekin.', 'Es común, pero no el mayor: toma el m.c.d. de los coeficientes y las letras comunes con el menor exponente.', 'إنه مشترك لكن ليس الأكبر: خذ ق.م.أ للمعاملات والحروف المشتركة بأصغر أس.'),
    'lost-one': say('Faktore osoa ateratzen den gaiaren lekuan 1 geratzen da.', 'Donde sale todo el término, dentro queda un 1.', 'حيث يخرج الحد كله يبقى داخل القوس 1.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.')
}
