import { checkAnswer, fraction, multiply, subtract, toLatex, toNumber, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { checkPitAnswer, generateRaceQuestion, raceErrorTips, type RaceErrorKind } from '../../dbh2-zatikiak-prototype/games/race.ts'
import { expansionQuestion, generatrixQuestion, kindPickQuestion, realsRaceErrorTips, type RealsRaceError } from '../../dbh4-aplikatuak-errealak/games/race.ts'

/* ==========================================================================
   Zenbaki arrazionalak (3. DBH) race: five circuits, one per stage. The
   fractions, order and operations circuits reuse the 2. DBH questions one
   level up (negative fractions appear from the second level); the decimals
   circuit reuses the 4. DBH applied unit's questions; the problems circuit
   is new: the fraction of an amount, the part that is left and the whole
   from a part, with typical mistakes as wrong options.
   ========================================================================== */

export const RATIONALS_RACE_CIRCUITS = 5

export type RationalsRaceError = RaceErrorKind | RealsRaceError | 'remaining-whole' | 'part-instead' | 'whole-inverted'

export type RationalsProblemMeta =
    | { kind: 'fraction-of'; part: FractionValue; amount: number; value: number }
    | { kind: 'remaining'; first: FractionValue; second: FractionValue; left: FractionValue }
    | { kind: 'whole'; part: FractionValue; known: number; whole: number }

export type RationalsRaceQuestion = RaceQuestion<RationalsRaceError> & { meta?: unknown; source: 'fractions' | 'decimals' | 'problems' }

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const math = (latex: string) => `$${latex}$`
const same = (latex: string): LocalizedText => say(math(latex), math(latex), math(latex))

interface Choice {
    latex: string
    error: RationalsRaceError | null
}

/** Four distinct options: the right one and three typical mistakes */
function pickOptions(random: Random, right: Choice, wrongs: Choice[]): RaceOption<RationalsRaceError>[] | null {
    const used = new Set([right.latex])
    const chosen: Choice[] = []
    for (const wrong of wrongs) {
        if (chosen.length === 3) break
        if (used.has(wrong.latex)) continue
        used.add(wrong.latex)
        chosen.push(wrong)
    }
    if (chosen.length < 3) return null
    return shuffle(random, [{ latex: right.latex, correct: true, error: null as RationalsRaceError | null }, ...chosen.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

const valueChoice = (value: FractionValue, error: RationalsRaceError): Choice => ({ latex: toLatex(value), error })

function problem(kind: string, prompt: LocalizedText, options: RaceOption<RationalsRaceError>[], answer: FractionValue, worked: string, meta: RationalsProblemMeta): RationalsRaceQuestion {
    return { circuit: 4, kind, prompt, options, answer, answerForm: 'any', percentAnswer: false, writable: true, solution: same(worked), meta, source: 'problems' }
}

const parts = [fraction(1, 2), fraction(1, 3), fraction(2, 3), fraction(1, 4), fraction(3, 4), fraction(2, 5), fraction(3, 5), fraction(3, 8), fraction(5, 8), fraction(5, 6)]

/* ---------- Circuit 4: problems ---------- */

function fractionOfQuestion(random: Random, tier: Tier): RationalsRaceQuestion | null {
    const part = pick(random, tier === 0 ? parts.slice(0, 5) : parts)
    const amount = part.denominator * randomInt(random, 2, tier === 0 ? 10 : 30)
    const value = (amount / part.denominator) * part.numerator
    const options = pickOptions(random, valueChoice(fraction(value), 'calculation'), shuffle(random, [
        valueChoice(fraction(amount - value), 'part-instead'),
        valueChoice(fraction(amount / part.denominator), 'calculation'),
        valueChoice(fraction(amount * part.numerator), 'calculation'),
        valueChoice(fraction(amount * part.denominator, part.numerator), 'whole-inverted')
    ]))
    if (!options) return null
    return problem('fraction-of', say(`Kalkulatu ${math(`${amount}`)} zenbakiaren ${math(toLatex(part))}.`, `Calcula ${math(toLatex(part))} de ${math(`${amount}`)}.`, `احسب ${math(toLatex(part))} من ${math(`${amount}`)}.`), options, fraction(value), `${amount}:${part.denominator}=${amount / part.denominator}\\ \\to\\ ${amount / part.denominator}\\cdot ${part.numerator}=${value}`, { kind: 'fraction-of', part, amount, value })
}

function remainingQuestion(random: Random): RationalsRaceQuestion | null {
    const first = pick(random, parts)
    const second = pick(random, parts)
    const rest = subtract(fraction(1), first)
    const left = multiply(rest, subtract(fraction(1), second))
    const wrongWhole = subtract(rest, second)
    const options = pickOptions(random, valueChoice(left, 'calculation'), shuffle(random, [
        ...(toNumber(wrongWhole) > 0 ? [valueChoice(wrongWhole, 'remaining-whole')] : []),
        valueChoice(multiply(rest, second), 'part-instead'),
        valueChoice(subtract(fraction(1), multiply(first, second)), 'calculation'),
        valueChoice(rest, 'calculation'),
        valueChoice(multiply(first, second), 'calculation')
    ]).filter((item) => item.latex !== toLatex(left)))
    if (!options) return null
    return problem('remaining', say(`Pastel baten ${math(toLatex(first))} jan da eta gero gainerakoaren ${math(toLatex(second))}. Pastelaren zer zati geratzen da?`, `Se come ${math(toLatex(first))} de un pastel y después ${math(toLatex(second))} de lo que queda. ¿Qué fracción del pastel queda?`, `أُكل ${math(toLatex(first))} من كعكة ثم ${math(toLatex(second))} مما بقي. ما الكسر الباقي من الكعكة؟`), options, left, `${toLatex(rest)}\\cdot ${toLatex(subtract(fraction(1), second))}=${toLatex(left)}`, { kind: 'remaining', first, second, left })
}

function wholeQuestion(random: Random, tier: Tier): RationalsRaceQuestion | null {
    const part = pick(random, tier === 0 ? parts.slice(0, 5) : parts)
    const whole = part.denominator * randomInt(random, 2, tier === 0 ? 10 : 25)
    const known = (whole / part.denominator) * part.numerator
    const options = pickOptions(random, valueChoice(fraction(whole), 'calculation'), shuffle(random, [
        valueChoice(fraction(known * part.numerator, part.denominator), 'whole-inverted'),
        valueChoice(fraction(known * part.denominator), 'calculation'),
        valueChoice(fraction(known, part.numerator), 'calculation'),
        valueChoice(fraction(known + whole / part.denominator), 'calculation')
    ]))
    if (!options) return null
    return problem('whole', say(`Bidaia baten ${math(toLatex(part))} ${math(`${known}`)} km dira. Zenbat km ditu bidaiak?`, `Los ${math(toLatex(part))} de un viaje son ${math(`${known}`)} km. ¿Cuántos km tiene el viaje?`, `${math(toLatex(part))} من رحلة يساوي ${math(`${known}`)} كم. كم كم طول الرحلة؟`), options, fraction(whole), `${known}:${part.numerator}=${whole / part.denominator}\\ \\to\\ ${whole / part.denominator}\\cdot ${part.denominator}=${whole}`, { kind: 'whole', part, known, whole })
}

/* ---------- Public API ---------- */

/** The 2. DBH fractions questions, one level up so negative fractions come early */
function fractionsQuestion(random: Random, circuit: number, tier: Tier, requireWritable: boolean): RationalsRaceQuestion {
    const level = Math.min(2, tier + 1) as Tier
    const sourceCircuit = circuit === 2 ? pick(random, [2, 3, 4]) : circuit
    let question = generateRaceQuestion(random, sourceCircuit, level, requireWritable)
    // The equivalence circuit seldom brings negatives on its own: ask for one more often
    if (circuit === 0 && level === 2 && random() < 0.2) {
        for (let attempt = 0; attempt < 30 && !question.options.some((option) => option.latex.startsWith('-')); attempt += 1) {
            question = generateRaceQuestion(random, sourceCircuit, level, requireWritable)
        }
    }
    return { ...question, circuit, source: 'fractions' }
}

const decimalGenerators = [
    (random: Random) => kindPickQuestion(random),
    (random: Random) => expansionQuestion(random),
    (random: Random, tier: Tier) => generatrixQuestion(random, tier),
    (random: Random, tier: Tier) => generatrixQuestion(random, tier)
]

const problemGenerators = [
    (random: Random, tier: Tier) => fractionOfQuestion(random, tier),
    (random: Random) => remainingQuestion(random),
    (random: Random, tier: Tier) => wholeQuestion(random, tier)
]

export function generateRationalsRaceQuestion(random: Random, circuit: number, tier: Tier, requireWritable = false): RationalsRaceQuestion {
    if (circuit <= 2) return fractionsQuestion(random, circuit, tier, requireWritable)
    for (let attempt = 0; attempt < 800; attempt += 1) {
        const question = circuit === 3 ? pick(random, decimalGenerators)(random, tier) : pick(random, problemGenerators)(random, tier)
        if (!question || (requireWritable && !question.writable)) continue
        return circuit === 3 ? { ...question, circuit, source: 'decimals' } : (question as RationalsRaceQuestion)
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkRationalsPitAnswer(question: RaceQuestion<RationalsRaceError>, input: string): AnswerCheck {
    return (question as RationalsRaceQuestion).source === 'fractions' ? checkPitAnswer(question as never, input) : checkAnswer(input, question.answer, question.answerForm)
}

export function rationalsParTime(circuit: number): number {
    return parTimeFor([9, 9, 14, 13, 13][circuit] ?? 12)
}

export const rationalsRaceErrorTips: Record<RationalsRaceError, LocalizedText> = {
    ...realsRaceErrorTips,
    ...raceErrorTips,
    'remaining-whole': say('"Gainerakoaren" zatikia ez da osoaren gainean kentzen: biderkatu geratzen den zatiaz.', 'La fracción "de lo que queda" no se resta del total: multiplica por la parte que queda.', 'كسر "من الباقي" لا يُطرح من الكل: اضرب في الجزء الباقي.'),
    'part-instead': say('Begiratu zer galdetzen den: hartzen den zatia ala geratzen dena.', 'Mira qué se pregunta: la parte que se toma o la que queda.', 'انظر إلى المطلوب: الجزء المأخوذ أم الباقي.'),
    'whole-inverted': say('Osoa aurkitzeko, zatitu zenbakitzaileaz eta biderkatu izendatzaileaz (ez alderantziz).', 'Para hallar el total, divide entre el numerador y multiplica por el denominador (no al revés).', 'لإيجاد الكل اقسم على البسط واضرب في المقام (لا العكس).')
}
