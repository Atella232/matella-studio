import { add, checkAnswer, fraction, gcd, subtract, toLatex, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { checkPitAnswer, generateRaceQuestion, raceErrorTips, type RaceErrorKind } from '../../dbh2-zatikiak-prototype/games/race.ts'

/* ==========================================================================
   Carrera de fracciones (1. DBH). Five circuits, one per stage. The first
   (improper fractions and mixed numbers) and the last (fraction of a
   quantity and the part that is left, as in Santillana) are new; the
   equivalence, comparison and operation circuits reuse the 2. DBH
   questions at their two easier levels, which have no negative fractions.
   ========================================================================== */

export const INTRO_FRACTION_RACE_CIRCUITS = 5

export type IntroFractionRaceError = RaceErrorKind | 'mixed-swapped' | 'mixed-added' | 'mixed-remainder'
export type IntroFractionRaceQuestion = RaceQuestion<IntroFractionRaceError>

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const math = (latex: string) => `$${latex}$`
const all = (latex: string): LocalizedText => say(math(latex), math(latex), math(latex))
const mixedLatex = (whole: number, numerator: number, denominator: number) => `${whole}\\frac{${numerator}}{${denominator}}`

interface Candidate {
    latex: string
    error: IntroFractionRaceError
}

/** The right option and three different wrong ones, in order of preference; null when there are not enough */
function options(random: Random, right: string, candidates: Candidate[]): RaceOption<IntroFractionRaceError>[] | null {
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

const question = (circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<IntroFractionRaceError>[], answer: FractionValue, solution: LocalizedText, form: 'any' | 'simplified' | 'mixed' = 'any'): IntroFractionRaceQuestion =>
    ({ circuit, kind, prompt, options: choices, answer, answerForm: form, percentAnswer: false, writable: true, solution })

/** An improper fraction that is not a whole number */
function improper(random: Random, tier: Tier): { numerator: number; denominator: number; whole: number; rest: number } {
    for (;;) {
        const denominator = randomInt(random, 2, [5, 8, 12][tier])
        const whole = randomInt(random, 1, [3, 4, 6][tier])
        const rest = randomInt(random, 1, denominator - 1)
        if (gcd(rest, denominator) === 1) return { numerator: whole * denominator + rest, denominator, whole, rest }
    }
}

/* ---------- Circuit 0: improper fractions and mixed numbers ---------- */

function toMixedQuestion(random: Random, tier: Tier): IntroFractionRaceQuestion | null {
    const { numerator, denominator, whole, rest } = improper(random, tier)
    const choices = options(random, mixedLatex(whole, rest, denominator), [
        ...(rest !== whole && whole < denominator ? [{ latex: mixedLatex(rest, whole, denominator), error: 'mixed-swapped' as const }] : []),
        { latex: mixedLatex(whole + 1, rest, denominator), error: 'mixed-remainder' },
        ...(whole > 1 ? [{ latex: mixedLatex(whole - 1, rest, denominator), error: 'mixed-remainder' as const }] : []),
        ...(rest + 1 < denominator ? [{ latex: mixedLatex(whole, rest + 1, denominator), error: 'calculation' as const }] : []),
        ...(rest > 1 ? [{ latex: mixedLatex(whole, rest - 1, denominator), error: 'calculation' as const }] : [])
    ])
    if (!choices) return null
    return question(0, 'to-mixed', say(`Nola idazten da ${math(`\\frac{${numerator}}{${denominator}}`)} zenbaki misto gisa?`, `¿Cómo se escribe ${math(`\\frac{${numerator}}{${denominator}}`)} como número mixto?`, `كيف يُكتب ${math(`\\frac{${numerator}}{${denominator}}`)} عددًا كسريًا؟`), choices, fraction(numerator, denominator), all(`${numerator}=${denominator}\\cdot ${whole}+${rest}`), 'mixed')
}

function toImproperQuestion(random: Random, tier: Tier): IntroFractionRaceQuestion | null {
    const { numerator, denominator, whole, rest } = improper(random, tier)
    const frac = (top: number) => `\\frac{${top}}{${denominator}}`
    const choices = options(random, frac(numerator), ([
        { latex: frac(whole + rest), error: 'mixed-added' },
        { latex: frac(whole * rest + denominator), error: 'mixed-added' },
        { latex: frac(numerator + 1), error: 'calculation' },
        { latex: frac(numerator - 1), error: 'calculation' }
    ] as Candidate[]).filter((candidate) => !candidate.latex.includes('{0}')))
    if (!choices) return null
    return question(0, 'to-improper', say(`Nola idazten da ${math(mixedLatex(whole, rest, denominator))} zatiki gisa?`, `¿Cómo se escribe ${math(mixedLatex(whole, rest, denominator))} como fracción?`, `كيف يُكتب ${math(mixedLatex(whole, rest, denominator))} كسرًا؟`), choices, fraction(numerator, denominator), all(`\\frac{${whole}\\cdot ${denominator}+${rest}}{${denominator}}=\\frac{${numerator}}{${denominator}}`))
}

/* ---------- Circuit 4: fraction of a quantity and the part that is left ---------- */

function fractionOfQuestion(random: Random, tier: Tier): IntroFractionRaceQuestion | null {
    const denominator = randomInt(random, 3, [5, 8, 10][tier])
    const numerator = randomInt(random, 2, denominator - 1)
    if (gcd(numerator, denominator) !== 1) return null
    const part = randomInt(random, 2, [6, 10, 15][tier])
    const total = denominator * part
    const answer = part * numerator
    const choices = options(random, String(answer), ([
        { latex: String(part), error: 'forgot-numerator' },
        { latex: String(total - answer), error: 'complement' },
        { latex: String(answer + part), error: 'calculation' },
        { latex: String(answer - part), error: 'calculation' }
    ] as Candidate[]).filter((candidate) => Number(candidate.latex) > 0))
    if (!choices) return null
    const frac = `\\frac{${numerator}}{${denominator}}`
    return question(4, 'fraction-of', say(`Zenbat da ${total}ren ${math(frac)}?`, `¿Cuánto es ${math(frac)} de ${total}?`, `كم يساوي ${math(frac)} من ${total}؟`), choices, fraction(answer), all(`${total}\\mathbin{:}${denominator}\\cdot ${numerator}=${answer}`))
}

function remainingQuestion(random: Random, tier: Tier): IntroFractionRaceQuestion | null {
    const denominator = randomInt(random, 3, [6, 9, 12][tier])
    const spent = randomInt(random, 1, denominator - 1)
    if (gcd(spent, denominator) !== 1) return null
    const left = fraction(denominator - spent, denominator)
    const spentValue = fraction(spent, denominator)
    const choices = options(random, toLatex(left), [
        { latex: toLatex(spentValue), error: 'complement' },
        { latex: `\\frac{${denominator - spent}}{${spent}}`, error: 'part-of-rest' },
        { latex: `\\frac{1}{${denominator}}`, error: 'calculation' },
        { latex: toLatex(add(left, fraction(1, denominator))), error: 'calculation' }
    ])
    if (!choices) return null
    const situation = pick(random, [
        say(`Ane-k pagaren ${math(toLatex(spentValue))} gastatu du. Pagaren zer zati geratzen zaio?`, `Ana ha gastado ${math(toLatex(spentValue))} de su paga. ¿Qué fracción de la paga le queda?`, `أنفقت آنه ${math(toLatex(spentValue))} مصروفها. ما الكسر المتبقي من المصروف؟`),
        say(`Liburu baten ${math(toLatex(spentValue))} irakurri dut. Liburuaren zer zati falta zait?`, `He leído ${math(toLatex(spentValue))} de un libro. ¿Qué fracción del libro me falta?`, `قرأت ${math(toLatex(spentValue))} كتاب. ما الكسر المتبقي من الكتاب؟`),
        say(`Pastel baten ${math(toLatex(spentValue))} jan dugu. Pastelaren zer zati geratzen da?`, `Nos hemos comido ${math(toLatex(spentValue))} de una tarta. ¿Qué fracción de la tarta queda?`, `أكلنا ${math(toLatex(spentValue))} كعكة. ما الكسر المتبقي من الكعكة؟`)
    ])
    return question(4, 'remaining', situation, choices, left, all(`1-${toLatex(spentValue)}=\\frac{${denominator}}{${denominator}}-${toLatex(spentValue)}=${toLatex(subtract(fraction(1), spentValue))}`))
}

/* ---------- Public API ---------- */

type Generator = (random: Random, tier: Tier) => IntroFractionRaceQuestion | null

const ownGenerators: Record<number, Generator[]> = {
    0: [toMixedQuestion, toImproperQuestion],
    4: [fractionOfQuestion, remainingQuestion]
}

/** 1. DBH circuit → 2. DBH circuits whose questions it reuses */
const sharedCircuits: Record<number, number[]> = { 1: [0], 2: [1], 3: [2, 3] }

export function generateIntroFractionRaceQuestion(random: Random, circuit: number, tier: Tier, requireWritable = false): IntroFractionRaceQuestion {
    const own = ownGenerators[circuit]
    if (own) {
        for (let attempt = 0; attempt < 400; attempt += 1) {
            const next = pick(random, own)(random, tier)
            if (next) return next
        }
        throw new Error(`No question for circuit ${circuit}`)
    }
    // First year: the two easier levels of the 2. DBH questions, which have no negative fractions
    for (let attempt = 0; attempt < 200; attempt += 1) {
        const shared = generateRaceQuestion(random, pick(random, sharedCircuits[circuit] ?? [0]), Math.min(tier, 1) as Tier, requireWritable)
        // A subtraction can still give a negative result: ask another one
        if (shared.answer.numerator < 0) continue
        return { ...shared, circuit, options: withoutNegatives(shared.options, shared.answer) }
    }
    throw new Error(`No question for circuit ${circuit}`)
}

/** The 2. DBH questions may offer the answer with the wrong sign; first year has no negatives, so a nearby value takes its place */
function withoutNegatives(choices: RaceOption<RaceErrorKind>[], answer: FractionValue): RaceOption<IntroFractionRaceError>[] {
    const used = new Set(choices.map((option) => option.latex))
    let step = 1
    return choices.map((option) => {
        if (!option.latex.startsWith('-')) return option
        for (;;) {
            const near = add(answer, fraction(step, answer.denominator))
            step += 1
            const latex = toLatex(near)
            if (!used.has(latex)) {
                used.add(latex)
                return { latex, correct: false, error: 'calculation' }
            }
        }
    })
}

export function checkIntroFractionPitAnswer(question: IntroFractionRaceQuestion, input: string): AnswerCheck {
    if (question.kind === 'to-mixed' || question.kind === 'to-improper' || question.kind === 'fraction-of' || question.kind === 'remaining') {
        return checkAnswer(input, question.answer, question.answerForm)
    }
    return checkPitAnswer(question as RaceQuestion<RaceErrorKind>, input)
}

export function introFractionParTime(circuit: number): number {
    return parTimeFor([9, 7, 7, 11, 10][circuit] ?? 10)
}

export const introFractionRaceErrorTips: Record<IntroFractionRaceError, LocalizedText> = {
    ...raceErrorTips,
    'mixed-swapped': say('Zatidura unitate osoak dira, eta hondarra zenbakitzaile berria; trukatu dituzu.', 'El cociente son las unidades y el resto, el nuevo numerador; los has intercambiado.', 'الناتج هو الوحدات والباقي هو البسط الجديد؛ لقد بدّلتهما.'),
    'mixed-added': say('Unitateak izendatzaileaz biderkatu behar dira, eta gero zenbakitzailea batu.', 'Hay que multiplicar las unidades por el denominador y después sumar el numerador.', 'يجب ضرب الوحدات في المقام ثم إضافة البسط.'),
    'mixed-remainder': say('Zenbatu ondo zenbat aldiz sartzen den izendatzailea zenbakitzailean.', 'Cuenta bien cuántas veces cabe el denominador en el numerador.', 'عُدّ جيدًا كم مرة يدخل المقام في البسط.')
}
