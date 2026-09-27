import type { LocalizedText } from '../content.ts'
import { add, checkAnswer, compare, divide, equals, fraction, gcd, multiply, power, subtract, toLatex, type AnswerCheck, type FractionValue } from '../math/fraction.ts'
import { pick, randomInt, shuffle, type Random } from './random.ts'
import type { Stars } from './records.ts'
import {
    parTimeFor,
    positionFor,
    rivalTimeFor,
    starsFor,
    type RaceOption as UnitRaceOption,
    type RaceQuestion as UnitRaceQuestion,
    type Rival,
    type Tier
} from '../../../features/unit-v2/games/raceCore.ts'

export { lapShare, nextTier, PIT_AFTER, PIT_BONUS_MS, PIT_PENALTY_MS, RACE_QUESTIONS, rivals, TURBO_BONUS_MS, TURBO_STREAK, WRONG_PENALTY_MS, type Rival, type Tier } from '../../../features/unit-v2/games/raceCore.ts'

/* ==========================================================================
   Zatikien lasterketa: question generators, rivals and scoring.
   Every wrong option comes from a typical mistake, so a wrong answer can tell
   the student what probably went wrong.
   ========================================================================== */

export const RACE_CIRCUITS = 6

export type RaceErrorKind =
    | 'not-irreducible'
    | 'one-term'
    | 'reciprocal'
    | 'added-same'
    | 'bigger-denominator'
    | 'bigger-numerator'
    | 'negative-order'
    | 'compare'
    | 'endpoint'
    | 'outside'
    | 'added-denominators'
    | 'numerator-only'
    | 'sign'
    | 'cross-multiplied'
    | 'kept-denominator'
    | 'no-invert'
    | 'inverted-first'
    | 'priority'
    | 'power-numerator'
    | 'power-times'
    | 'forgot-numerator'
    | 'divided-by-numerator'
    | 'complement'
    | 'no-hundred'
    | 'decimal-place'
    | 'digits'
    | 'multiplied-instead'
    | 'part-of-rest'
    | 'calculation'

export type RaceOption = UnitRaceOption<RaceErrorKind>
export type RaceQuestion = UnitRaceQuestion<RaceErrorKind>

/* ---------- Writing helpers ---------- */

/** A fraction exactly as written, without simplifying */
export function writtenLatex(numerator: number, denominator: number): string {
    if (denominator === 1) return String(numerator)
    const negative = (numerator < 0) !== (denominator < 0)
    return `${negative ? '-' : ''}\\frac{${Math.abs(numerator)}}{${Math.abs(denominator)}}`
}

const valueLatex = (value: FractionValue) => toLatex(value)

/** Wraps negative values in parentheses when they follow an operator */
function operandLatex(value: FractionValue): string {
    return value.numerator < 0 ? `\\left(${toLatex(value)}\\right)` : toLatex(value)
}

const math = (latex: string) => `$${latex}$`

function text(eu: string, es: string, ar: string): LocalizedText {
    return { eu, es, ar }
}

/** Same sentence in every language around the same formula */
function sameFormula(before: LocalizedText, latex: string, after: LocalizedText = text('', '', '')): LocalizedText {
    return {
        eu: `${before.eu}${math(latex)}${after.eu}`,
        es: `${before.es}${math(latex)}${after.es}`,
        ar: `${before.ar}${math(latex)}${after.ar}`
    }
}

function formula(latex: string): LocalizedText {
    return { eu: math(latex), es: math(latex), ar: math(latex) }
}

/* ---------- Options ---------- */

interface Candidate {
    latex: string
    value: FractionValue | null
    error: RaceErrorKind
}

function valueCandidate(value: FractionValue | null, error: RaceErrorKind): Candidate | null {
    return value ? { latex: valueLatex(value), value, error } : null
}

function safeFraction(numerator: number, denominator: number): FractionValue | null {
    if (denominator === 0 || !Number.isSafeInteger(numerator) || !Number.isSafeInteger(denominator)) return null
    return fraction(numerator, denominator)
}

/**
 * Builds four options: the correct one and three wrong candidates, in the
 * order given (most instructive first). When `sameValueAllowed` is false,
 * a candidate equal in value to the answer is discarded. Missing candidates
 * are filled with nearby values.
 */
function buildOptions(
    random: Random,
    correct: { latex: string; value: FractionValue },
    candidates: Array<Candidate | null>,
    sameValueAllowed = false
): RaceOption[] {
    const chosen: RaceOption[] = []
    const seen = new Set([correct.latex])
    for (const candidate of candidates) {
        if (!candidate || chosen.length === 3) continue
        if (seen.has(candidate.latex)) continue
        if (!sameValueAllowed && candidate.value && equals(candidate.value, correct.value)) continue
        seen.add(candidate.latex)
        chosen.push({ latex: candidate.latex, correct: false, error: candidate.error })
    }
    let step = 1
    while (chosen.length < 3) {
        const offset = fraction(step % 2 === 1 ? Math.ceil(step / 2) : -Math.ceil(step / 2), correct.value.denominator)
        const near = add(correct.value, offset)
        const latex = valueLatex(near)
        if (!seen.has(latex)) {
            seen.add(latex)
            chosen.push({ latex, correct: false, error: 'calculation' })
        }
        step += 1
    }
    return shuffle(random, [{ latex: correct.latex, correct: true, error: null }, ...chosen])
}

/* ---------- Circuit 1: equivalence ---------- */

const irreducible = (random: Random, maxDenominator: number, allowImproper = false): FractionValue => {
    for (;;) {
        const denominator = randomInt(random, 2, maxDenominator)
        const numerator = randomInt(random, 1, allowImproper ? denominator * 2 - 1 : denominator - 1)
        if (gcd(numerator, denominator) === 1 && numerator !== denominator) return fraction(numerator, denominator)
    }
}

/** Numerator above 1, so "forgot the numerator" is a real mistake and not the answer */
const nonUnit = (random: Random, maxDenominator: number): FractionValue => {
    for (;;) {
        const value = irreducible(random, maxDenominator)
        if (value.numerator > 1) return value
    }
}

function simplifyQuestion(random: Random, tier: Tier): RaceQuestion {
    const base = irreducible(random, tier === 0 ? 7 : 11, tier === 2)
    const factors = tier === 0 ? [2, 3, 5] : tier === 1 ? [4, 6, 8, 9] : [6, 8, 12, 15]
    const factor = pick(random, factors)
    const top = base.numerator * factor
    const bottom = base.denominator * factor
    const partialDivisor = [2, 3, 5].find((divisor) => factor % divisor === 0 && divisor !== factor)
    const candidates: Array<Candidate | null> = [
        partialDivisor ? { latex: writtenLatex(top / partialDivisor, bottom / partialDivisor), value: fraction(top, bottom), error: 'not-irreducible' } : null,
        { latex: writtenLatex(base.numerator, bottom), value: fraction(base.numerator, bottom), error: 'one-term' },
        { latex: writtenLatex(base.denominator, base.numerator), value: fraction(base.denominator, base.numerator), error: 'reciprocal' },
        { latex: writtenLatex(top, base.denominator), value: fraction(top, base.denominator), error: 'one-term' }
    ]
    return {
        circuit: 0,
        kind: 'simplify',
        prompt: sameFormula(text('Sinplifikatu guztiz: ', 'Simplifica del todo: ', 'بسّط تمامًا: '), writtenLatex(top, bottom)),
        options: buildOptions(random, { latex: valueLatex(base), value: base }, candidates, true),
        answer: base,
        answerForm: 'simplified',
        percentAnswer: false,
        writable: true,
        solution: formula(`\\frac{${top}}{${bottom}}=\\frac{${top}:${factor}}{${bottom}:${factor}}=${valueLatex(base)}`)
    }
}

function missingTermQuestion(random: Random, tier: Tier): RaceQuestion {
    const base = irreducible(random, tier === 0 ? 6 : 10)
    const factor = randomInt(random, 2, tier === 0 ? 4 : 7)
    const askNumerator = tier === 0 || random() < 0.6
    const known = askNumerator ? base.denominator * factor : base.numerator * factor
    const answer = askNumerator ? base.numerator * factor : base.denominator * factor
    const promptLatex = askNumerator
        ? `${valueLatex(base)}=\\frac{?}{${known}}`
        : `${valueLatex(base)}=\\frac{${known}}{?}`
    const additive = askNumerator ? base.numerator + (known - base.denominator) : base.denominator + (known - base.numerator)
    const candidates: Array<Candidate | null> = [
        valueCandidate(fraction(additive), 'added-same'),
        valueCandidate(fraction(askNumerator ? base.numerator * (factor + 1) : base.denominator * (factor + 1)), 'calculation'),
        valueCandidate(fraction(askNumerator ? known * base.numerator : known * base.denominator), 'one-term'),
        valueCandidate(fraction(askNumerator ? base.numerator * (factor - 1) || 1 : base.denominator * (factor - 1)), 'calculation')
    ]
    return {
        circuit: 0,
        kind: 'missing-term',
        prompt: sameFormula(text('Osatu: ', 'Completa: ', 'أكمل: '), promptLatex),
        options: buildOptions(random, { latex: String(answer), value: fraction(answer) }, candidates),
        answer: fraction(answer),
        answerForm: 'any',
        percentAnswer: false,
        writable: true,
        solution: formula(askNumerator
            ? `${base.denominator}\\cdot${factor}=${known}\\Rightarrow ${base.numerator}\\cdot${factor}=${answer}`
            : `${base.numerator}\\cdot${factor}=${known}\\Rightarrow ${base.denominator}\\cdot${factor}=${answer}`)
    }
}

function equivalentToQuestion(random: Random, tier: Tier): RaceQuestion {
    const base = irreducible(random, tier === 0 ? 6 : 9)
    const signed = tier === 2 && random() < 0.5 ? fraction(-base.numerator, base.denominator) : base
    const factor = randomInt(random, 2, 5)
    const top = signed.numerator * factor
    const bottom = signed.denominator * factor
    const candidates: Array<Candidate | null> = [
        { latex: writtenLatex(signed.numerator + factor, signed.denominator + factor), value: safeFraction(signed.numerator + factor, signed.denominator + factor), error: 'added-same' },
        { latex: writtenLatex(top, signed.denominator + factor), value: safeFraction(top, signed.denominator + factor), error: 'one-term' },
        { latex: writtenLatex(Math.abs(bottom) * Math.sign(signed.numerator), Math.abs(top)), value: safeFraction(Math.abs(bottom) * Math.sign(signed.numerator), Math.abs(top)), error: 'reciprocal' },
        signed.numerator < 0 ? { latex: writtenLatex(-top, bottom), value: fraction(-top, bottom), error: 'sign' } : null
    ]
    return {
        circuit: 0,
        kind: 'equivalent-to',
        prompt: sameFormula(text('Zein da honen baliokidea? ', '¿Cuál es equivalente a ', 'أيّها يكافئ '), valueLatex(signed), text('', '?', '؟')),
        options: buildOptions(random, { latex: writtenLatex(top, bottom), value: signed }, [
            ...shuffle(random, candidates.filter((item) => item?.error !== 'sign')),
            candidates[3]
        ]),
        answer: signed,
        answerForm: 'any',
        percentAnswer: false,
        writable: false,
        solution: formula(`\\frac{${Math.abs(signed.numerator)}\\cdot${factor}}{${signed.denominator}\\cdot${factor}}=${writtenLatex(Math.abs(top), bottom)}`)
    }
}

/* ---------- Circuit 2: comparing ---------- */

function distinctFractions(count: number, make: () => FractionValue): FractionValue[] {
    const result: FractionValue[] = []
    let guard = 0
    while (result.length < count && guard < 500) {
        guard += 1
        const next = make()
        if (!result.some((item) => equals(item, next))) result.push(next)
    }
    return result
}

function extremeQuestion(random: Random, tier: Tier, largest: boolean): RaceQuestion {
    let values: FractionValue[]
    if (tier === 0) {
        // Same numerator: the smaller denominator makes the bigger fraction
        const numerator = randomInt(random, 1, 3)
        const denominators = shuffle(random, [2, 3, 4, 5, 6, 7, 8, 9, 10].filter((d) => d > numerator)).slice(0, 4)
        values = denominators.map((d) => fraction(numerator, d))
    } else if (tier === 1) {
        values = distinctFractions(4, () => {
            const denominator = pick(random, [3, 4, 5, 6, 8, 10, 12])
            return fraction(randomInt(random, 1, denominator - 1), denominator)
        })
    } else {
        values = distinctFractions(4, () => {
            const denominator = pick(random, [2, 3, 4, 5, 6, 8])
            return fraction(randomInt(random, -denominator * 2 + 1, denominator - 1) || 1, denominator)
        })
    }
    const sorted = [...values].sort(compare)
    const answer = largest ? sorted[sorted.length - 1] : sorted[0]
    const byDenominator = [...values].sort((left, right) => right.denominator - left.denominator)[0]
    const byNumerator = [...values].sort((left, right) => right.numerator - left.numerator)[0]
    const errorFor = (value: FractionValue): RaceErrorKind => {
        if (value.numerator < 0 && answer.numerator < 0 && largest) return 'negative-order'
        if (largest && equals(value, byDenominator)) return 'bigger-denominator'
        if (largest && equals(value, byNumerator)) return 'bigger-numerator'
        if (!largest && value.numerator < 0) return 'negative-order'
        return 'compare'
    }
    const options = shuffle(random, values).map((value) => ({
        latex: valueLatex(value),
        correct: equals(value, answer),
        error: equals(value, answer) ? null : errorFor(value)
    }))
    const decimals = sorted.map((value) => `${valueLatex(value)}`).join('<')
    return {
        circuit: 1,
        kind: largest ? 'largest' : 'smallest',
        prompt: largest
            ? text('Zein da handiena?', '¿Cuál es la mayor?', 'أيّها الأكبر؟')
            : text('Zein da txikiena?', '¿Cuál es la menor?', 'أيّها الأصغر؟'),
        options,
        answer,
        answerForm: 'any',
        percentAnswer: false,
        writable: false,
        solution: formula(decimals)
    }
}

function betweenQuestion(random: Random, tier: Tier): RaceQuestion {
    const denominator = pick(random, tier === 0 ? [2, 3, 4, 5] : [3, 4, 5, 6, 7])
    const low = fraction(randomInt(random, tier === 2 ? -denominator : 1, denominator - 2), denominator)
    const high = add(low, fraction(1, denominator))
    // Doubling the denominator reveals a fraction in the middle
    const middle = fraction(low.numerator * 2 + 1, denominator * 2)
    const step = fraction(1, denominator * 2)
    const candidates: Array<Candidate | null> = [
        valueCandidate(high, 'endpoint'),
        valueCandidate(add(high, step), 'outside'),
        valueCandidate(subtract(low, step), 'outside'),
        valueCandidate(low, 'endpoint')
    ]
    return {
        circuit: 1,
        kind: 'between',
        prompt: {
            eu: `Zein dago ${math(valueLatex(low))} eta ${math(valueLatex(high))} artean?`,
            es: `¿Cuál está entre ${math(valueLatex(low))} y ${math(valueLatex(high))}?`,
            ar: `أيّها يقع بين ${math(valueLatex(low))} و${math(valueLatex(high))}؟`
        },
        options: buildOptions(random, { latex: valueLatex(middle), value: middle }, shuffle(random, candidates)),
        answer: middle,
        answerForm: 'any',
        percentAnswer: false,
        writable: false,
        solution: formula(`${writtenLatex(low.numerator * 2, denominator * 2)}<${valueLatex(middle)}<${writtenLatex(high.numerator * 2, denominator * 2)}`)
    }
}

/* ---------- Circuit 3: adding and subtracting ---------- */

function lcmOf(left: number, right: number) {
    return Math.abs(left * right) / gcd(left, right)
}

function addSubPair(random: Random, tier: Tier): [FractionValue, FractionValue] {
    if (tier === 0) {
        const small = randomInt(random, 2, 5)
        const big = small * randomInt(random, 2, 3)
        return shuffle(random, [irreducibleWith(random, small), irreducibleWith(random, big)]) as [FractionValue, FractionValue]
    }
    if (tier === 1) {
        const [first, second] = shuffle(random, [2, 3, 4, 5, 6, 7, 8]).slice(0, 2)
        return [irreducibleWith(random, first), irreducibleWith(random, second)]
    }
    const [first, second] = shuffle(random, [3, 4, 5, 6, 8, 9, 10, 12]).slice(0, 2)
    const left = irreducibleWith(random, first, true)
    const right = irreducibleWith(random, second, true)
    return [random() < 0.4 ? fraction(-left.numerator, left.denominator) : left, right]
}

function irreducibleWith(random: Random, denominator: number, allowImproper = false): FractionValue {
    for (;;) {
        const numerator = randomInt(random, 1, allowImproper ? denominator + denominator - 1 : denominator - 1)
        if (gcd(numerator, denominator) === 1 && numerator !== denominator) return fraction(numerator, denominator)
    }
}

function addSubQuestion(random: Random, tier: Tier): RaceQuestion {
    const [left, right] = addSubPair(random, tier)
    const subtracting = tier === 0 ? random() < 0.4 : random() < 0.55
    const answer = subtracting ? subtract(left, right) : add(left, right)
    const common = lcmOf(left.denominator, right.denominator)
    const leftScaled = left.numerator * (common / left.denominator)
    const rightScaled = right.numerator * (common / right.denominator)
    const operator = subtracting ? '-' : '+'
    const combine = (a: number, b: number) => subtracting ? a - b : a + b
    const candidates: Array<Candidate | null> = [
        valueCandidate(safeFraction(combine(left.numerator, right.numerator), left.denominator + right.denominator), 'added-denominators'),
        valueCandidate(safeFraction(combine(left.numerator, right.numerator), common), 'numerator-only'),
        answer.numerator !== 0 ? valueCandidate(fraction(-answer.numerator, answer.denominator), 'sign') : null,
        valueCandidate(safeFraction(combine(leftScaled, rightScaled) + (subtracting ? 0 : 1), common), 'calculation')
    ]
    const latex = `${valueLatex(left)}${operator}${operandLatex(right)}`
    return {
        circuit: 2,
        kind: subtracting ? 'subtract' : 'add',
        prompt: formula(`${latex}=\\,?`),
        options: buildOptions(random, { latex: valueLatex(answer), value: answer }, candidates),
        answer,
        answerForm: 'any',
        percentAnswer: false,
        writable: true,
        solution: formula(`${writtenLatex(leftScaled, common)}${operator}${rightScaled < 0 ? `\\left(${writtenLatex(rightScaled, common)}\\right)` : writtenLatex(rightScaled, common)}=${writtenLatex(combine(leftScaled, rightScaled), common)}${equals(answer, fraction(combine(leftScaled, rightScaled), common)) && fraction(combine(leftScaled, rightScaled), common).denominator !== common ? `=${valueLatex(answer)}` : ''}`)
    }
}

/* ---------- Circuit 4: multiplying and dividing ---------- */

function mulDivQuestion(random: Random, tier: Tier): RaceQuestion {
    const dividing = tier === 0 ? false : tier === 1 ? true : random() < 0.5
    let left: FractionValue = irreducible(random, tier === 0 ? 7 : 9, tier === 2)
    let right: FractionValue = irreducible(random, tier === 0 ? 7 : 9, tier === 2)
    if (tier === 2 && random() < 0.5) left = fraction(-left.numerator, left.denominator)
    if (tier >= 1 && random() < 0.25) right = fraction(randomInt(random, 2, 5))
    const answer = dividing ? divide(left, right) : multiply(left, right)
    const operator = dividing ? '\\div' : '\\cdot'
    const candidates: Array<Candidate | null> = dividing
        ? [
            valueCandidate(multiply(left, right), 'no-invert'),
            valueCandidate(safeFraction(left.denominator * right.numerator, left.numerator * right.denominator), 'inverted-first'),
            answer.numerator !== 0 ? valueCandidate(fraction(-answer.numerator, answer.denominator), 'sign') : null
        ]
        : [
            valueCandidate(safeFraction(left.numerator * right.denominator, left.denominator * right.numerator), 'cross-multiplied'),
            valueCandidate(safeFraction(left.numerator * right.numerator, left.denominator), 'kept-denominator'),
            answer.numerator !== 0 ? valueCandidate(fraction(-answer.numerator, answer.denominator), 'sign') : null,
            valueCandidate(safeFraction(left.numerator + right.numerator, left.denominator + right.denominator), 'added-denominators')
        ]
    const solution = dividing
        ? `${valueLatex(left)}${operator}${operandLatex(right)}=${valueLatex(left)}\\cdot${operandLatex(fraction(right.denominator, right.numerator))}=${valueLatex(answer)}`
        : `\\frac{${left.numerator}\\cdot${right.numerator < 0 ? `(${right.numerator})` : right.numerator}}{${left.denominator}\\cdot${right.denominator}}=${valueLatex(answer)}`
    return {
        circuit: 3,
        kind: dividing ? 'divide' : 'multiply',
        prompt: formula(`${valueLatex(left)}${operator}${operandLatex(right)}=\\,?`),
        options: buildOptions(random, { latex: valueLatex(answer), value: answer }, candidates),
        answer,
        answerForm: 'any',
        percentAnswer: false,
        writable: true,
        solution: formula(solution)
    }
}

/* ---------- Circuit 5: combined operations and powers ---------- */

function combinedQuestion(random: Random, tier: Tier): RaceQuestion {
    const template = tier === 0 ? pick(random, ['add-mul', 'power-add']) : pick(random, ['add-mul', 'sub-div', 'power-add', 'mul-bracket', 'signed-power'])
    const a = irreducible(random, 6)
    const b = irreducible(random, 6)
    const c = irreducible(random, 6)
    let latex: string
    let answer: FractionValue
    let solution: string
    const candidates: Array<Candidate | null> = []
    switch (template) {
        case 'add-mul': {
            answer = add(a, multiply(b, c))
            latex = `${valueLatex(a)}+${valueLatex(b)}\\cdot${valueLatex(c)}`
            solution = `${valueLatex(a)}+${valueLatex(multiply(b, c))}=${valueLatex(answer)}`
            candidates.push(valueCandidate(multiply(add(a, b), c), 'priority'))
            candidates.push(valueCandidate(safeFraction(a.numerator + b.numerator * c.numerator, a.denominator + b.denominator * c.denominator), 'added-denominators'))
            break
        }
        case 'sub-div': {
            const small = fraction(1, randomInt(random, 2, 4))
            answer = subtract(a, divide(small, c))
            latex = `${valueLatex(a)}-${valueLatex(small)}\\div${valueLatex(c)}`
            solution = `${valueLatex(a)}-${valueLatex(divide(small, c))}=${valueLatex(answer)}`
            candidates.push(valueCandidate(divide(subtract(a, small), c), 'priority'))
            candidates.push(valueCandidate(subtract(a, multiply(small, c)), 'no-invert'))
            break
        }
        case 'power-add': {
            const exponent = tier === 0 ? 2 : pick(random, [2, 3])
            answer = add(power(a, exponent), b)
            latex = `\\left(${valueLatex(a)}\\right)^{${exponent}}+${valueLatex(b)}`
            solution = `${valueLatex(power(a, exponent))}+${valueLatex(b)}=${valueLatex(answer)}`
            candidates.push(valueCandidate(add(fraction(a.numerator ** exponent, a.denominator), b), 'power-numerator'))
            candidates.push(valueCandidate(add(fraction(a.numerator * exponent, a.denominator), b), 'power-times'))
            break
        }
        case 'mul-bracket': {
            answer = multiply(a, subtract(b, c))
            latex = `${valueLatex(a)}\\cdot\\left(${valueLatex(b)}-${valueLatex(c)}\\right)`
            solution = `${valueLatex(a)}\\cdot${operandLatex(subtract(b, c))}=${valueLatex(answer)}`
            candidates.push(valueCandidate(subtract(multiply(a, b), c), 'priority'))
            if (answer.numerator !== 0) candidates.push(valueCandidate(fraction(-answer.numerator, answer.denominator), 'sign'))
            break
        }
        default: {
            const negative = fraction(-a.numerator, a.denominator)
            const exponent = pick(random, [2, 3])
            answer = subtract(power(negative, exponent), b)
            latex = `\\left(${valueLatex(negative)}\\right)^{${exponent}}-${valueLatex(b)}`
            solution = `${operandLatex(power(negative, exponent))}-${valueLatex(b)}=${valueLatex(answer)}`
            candidates.push(valueCandidate(subtract(fraction(-(a.numerator ** exponent), a.denominator ** exponent), b), exponent === 2 ? 'sign' : 'calculation'))
            candidates.push(valueCandidate(subtract(fraction(-(a.numerator ** exponent), a.denominator), b), 'power-numerator'))
            break
        }
    }
    if (answer.numerator !== 0) candidates.push(valueCandidate(fraction(-answer.numerator, answer.denominator), 'sign'))
    return {
        circuit: 4,
        kind: template,
        prompt: formula(`${latex}=\\,?`),
        options: buildOptions(random, { latex: valueLatex(answer), value: answer }, candidates),
        answer,
        answerForm: 'any',
        percentAnswer: false,
        writable: true,
        solution: formula(solution)
    }
}

/* ---------- Circuit 6: percentages and quantities ---------- */

function quantityQuestion(random: Random, tier: Tier): RaceQuestion {
    const kinds = tier === 0 ? ['fraction-of', 'percent-of'] : ['fraction-of', 'percent-of', 'to-percent', 'whole-from-part', 'what-fraction']
    const kind = pick(random, kinds)
    const whole = (value: number) => ({ latex: String(value), value: fraction(value) })
    switch (kind) {
        case 'fraction-of': {
            const part = nonUnit(random, tier === 0 ? 5 : 8)
            const total = part.denominator * randomInt(random, 3, tier === 0 ? 8 : 15)
            const answer = (total / part.denominator) * part.numerator
            return {
                circuit: 5,
                kind,
                prompt: {
                    eu: `${math(String(total))}-ren ${math(valueLatex(part))}?`,
                    es: `¿${math(valueLatex(part))} de ${math(String(total))}?`,
                    ar: `${math(valueLatex(part))} من ${math(String(total))}؟`
                },
                options: buildOptions(random, whole(answer), [
                    valueCandidate(fraction(total / part.denominator), 'forgot-numerator'),
                    valueCandidate(safeFraction(total * part.denominator, part.numerator), 'divided-by-numerator'),
                    valueCandidate(fraction(total - answer), 'complement')
                ]),
                answer: fraction(answer),
                answerForm: 'any',
                percentAnswer: false,
                writable: true,
                solution: formula(`${total}:${part.denominator}=${total / part.denominator};\\ ${total / part.denominator}\\cdot${part.numerator}=${answer}`)
            }
        }
        case 'percent-of': {
            const percent = pick(random, tier === 0 ? [10, 20, 25, 50, 75] : [5, 15, 30, 35, 40, 60, 12])
            const total = pick(random, [20, 40, 60, 80, 120, 200, 240, 300])
            const answer = fraction(percent * total, 100)
            return {
                circuit: 5,
                kind,
                prompt: {
                    eu: `${math(String(total))}-ren ${math(`${percent}\\%`)}?`,
                    es: `¿${math(`${percent}\\%`)} de ${math(String(total))}?`,
                    ar: `${math(`${percent}\\%`)} من ${math(String(total))}؟`
                },
                options: buildOptions(random, { latex: valueLatex(answer), value: answer }, [
                    valueCandidate(multiply(answer, fraction(10)), 'decimal-place'),
                    valueCandidate(subtract(fraction(total), answer), 'complement'),
                    valueCandidate(fraction(percent * total), 'no-hundred')
                ]),
                answer,
                answerForm: 'any',
                percentAnswer: false,
                writable: true,
                solution: formula(`\\frac{${percent}}{100}\\cdot${total}=${valueLatex(answer)}`)
            }
        }
        case 'to-percent': {
            const base = pick(random, [fraction(1, 4), fraction(3, 4), fraction(2, 5), fraction(3, 5), fraction(1, 5), fraction(7, 10), fraction(3, 20), fraction(9, 25)])
            const percent = multiply(base, fraction(100))
            const percentLatex = (value: FractionValue) => `${toLatex(value).replace('.', ',')}\\%`
            const options: Array<Candidate | null> = [
                { latex: `${base.numerator}${base.denominator}\\%`, value: fraction(Number(`${base.numerator}${base.denominator}`)), error: 'digits' },
                { latex: percentLatex(fraction(base.numerator * 10)), value: fraction(base.numerator * 10), error: 'decimal-place' },
                { latex: percentLatex(fraction(base.denominator - base.numerator)), value: fraction(base.denominator - base.numerator), error: 'calculation' },
                { latex: percentLatex(subtract(fraction(100), percent)), value: subtract(fraction(100), percent), error: 'complement' }
            ]
            return {
                circuit: 5,
                kind,
                prompt: sameFormula(text('Ehunekotan: ', 'En porcentaje: ', 'كنسبة مئوية: '), `${valueLatex(base)}=\\,?\\%`),
                options: buildOptions(random, { latex: percentLatex(percent), value: percent }, options),
                answer: percent,
                answerForm: 'any',
                percentAnswer: true,
                writable: true,
                solution: formula(`${valueLatex(base)}\\cdot100=${toLatex(percent)}\\%`)
            }
        }
        case 'whole-from-part': {
            const part = nonUnit(random, 6)
            const total = part.denominator * randomInt(random, 2, 9)
            const known = (total / part.denominator) * part.numerator
            return {
                circuit: 5,
                kind,
                prompt: {
                    eu: `Zenbaki baten ${math(valueLatex(part))} ${math(String(known))} da. Zein da zenbakia?`,
                    es: `${math(valueLatex(part))} de un número es ${math(String(known))}. ¿Cuál es el número?`,
                    ar: `${math(valueLatex(part))} من عدد يساوي ${math(String(known))}. ما هو العدد؟`
                },
                options: buildOptions(random, whole(total), [
                    valueCandidate(multiply(fraction(known), part), 'multiplied-instead'),
                    valueCandidate(fraction(known * part.denominator), 'forgot-numerator'),
                    valueCandidate(safeFraction(known, part.denominator), 'divided-by-numerator')
                ]),
                answer: fraction(total),
                answerForm: 'any',
                percentAnswer: false,
                writable: true,
                solution: formula(`${known}:${part.numerator}=${known / part.numerator};\\ ${known / part.numerator}\\cdot${part.denominator}=${total}`)
            }
        }
        default: {
            const denominator = pick(random, [3, 4, 5, 6, 8])
            const numerator = randomInt(random, 1, denominator - 1)
            const scale = randomInt(random, 3, 12)
            const total = denominator * scale
            const part = numerator * scale
            const answer = fraction(part, total)
            return {
                circuit: 5,
                kind: 'what-fraction',
                prompt: {
                    eu: `${math(String(total))}-tik, zein zati da ${math(String(part))}?`,
                    es: `¿Qué fracción de ${math(String(total))} es ${math(String(part))}?`,
                    ar: `ما الكسر الذي يمثله ${math(String(part))} من ${math(String(total))}؟`
                },
                options: buildOptions(random, { latex: valueLatex(answer), value: answer }, [
                    valueCandidate(fraction(total, part), 'reciprocal'),
                    valueCandidate(safeFraction(part, total - part), 'part-of-rest'),
                    valueCandidate(fraction(1, part), 'calculation')
                ]),
                answer,
                answerForm: 'any',
                percentAnswer: false,
                writable: true,
                solution: formula(`\\frac{${part}}{${total}}=${valueLatex(answer)}`)
            }
        }
    }
}

/* ---------- Public API ---------- */

export function generateRaceQuestion(random: Random, circuit: number, tier: Tier, requireWritable = false): RaceQuestion {
    for (let attempt = 0; attempt < 50; attempt += 1) {
        const question = generateAny(random, circuit, tier)
        if (!requireWritable || question.writable) return question
    }
    // Every circuit has writable kinds; fall back to the simplest one
    return circuit === 1 ? missingTermQuestion(random, tier) : generateAny(random, circuit, tier)
}

function generateAny(random: Random, circuit: number, tier: Tier): RaceQuestion {
    switch (circuit) {
        case 0: return pick(random, [simplifyQuestion, missingTermQuestion, equivalentToQuestion])(random, tier)
        case 1: {
            const kind = randomInt(random, 0, 2)
            if (kind === 2) return betweenQuestion(random, tier)
            return extremeQuestion(random, tier, kind === 0)
        }
        case 2: return addSubQuestion(random, tier)
        case 3: return mulDivQuestion(random, tier)
        case 4: return combinedQuestion(random, tier)
        default: return quantityQuestion(random, tier)
    }
}

/** Written answers at the pit stop. Percent answers may include the % sign. */
export function checkPitAnswer(question: RaceQuestion, input: string): AnswerCheck {
    const cleaned = question.percentAnswer ? input.replace(/[%٪]/g, '') : input
    return checkAnswer(cleaned, question.answer, question.answerForm)
}

/** Expected time of an average student, in ms: the middle rival */
export function parTime(circuit: number): number {
    return parTimeFor([7, 7, 11, 12, 15, 12][circuit] ?? 10)
}

export function rivalTime(circuit: number, rival: Rival): number {
    return rivalTimeFor(parTime(circuit), rival)
}

export function raceStars(circuit: number, timeMs: number, mistakes: number): Stars {
    return starsFor(parTime(circuit), timeMs, mistakes)
}

/** 1 = winner. Ties go to the student. */
export function racePosition(circuit: number, timeMs: number): number {
    return positionFor(parTime(circuit), timeMs)
}

export const raceErrorTips: Record<RaceErrorKind, LocalizedText> = {
    'not-irreducible': text('Oraindik sinplifika daiteke: zatitu berriro zatitzaile komun batez.', 'Aún se puede simplificar: divide otra vez por un divisor común.', 'لا يزال يمكن تبسيطه: اقسم مجددًا على قاسم مشترك.'),
    'one-term': text('Zenbakitzailea eta izendatzailea zenbaki berarekin biderkatu edo zatitu behar dira.', 'Numerador y denominador se multiplican o dividen por el mismo número.', 'يُضرب البسط والمقام أو يُقسمان على العدد نفسه.'),
    reciprocal: text('Zenbakitzailea eta izendatzailea trukatu dituzu.', 'Has intercambiado numerador y denominador.', 'لقد بدّلت البسط والمقام.'),
    'added-same': text('Bi gaiei zenbaki bera batzeak ez du balioa mantentzen: biderkatu behar da.', 'Sumar lo mismo a los dos términos no conserva el valor: hay que multiplicar.', 'إضافة العدد نفسه إلى الحدين لا تحافظ على القيمة: يجب الضرب.'),
    'bigger-denominator': text('Izendatzaile handiagoak zati txikiagoak esan nahi du.', 'Un denominador mayor significa partes más pequeñas.', 'المقام الأكبر يعني أجزاء أصغر.'),
    'bigger-numerator': text('Zenbakitzailea bakarrik ez da nahikoa: alderatu izendatzaile komunarekin.', 'El numerador solo no basta: compara con denominador común.', 'البسط وحده لا يكفي: قارن بمقام مشترك.'),
    'negative-order': text('Zenbaki negatiboetan, zerotik urrunago dagoena txikiagoa da.', 'En los negativos, el que está más lejos del cero es menor.', 'في الأعداد السالبة، الأبعد عن الصفر هو الأصغر.'),
    compare: text('Konparatzeko, jarri izendatzaile bera edo pasatu hamartarrera.', 'Para comparar, pon el mismo denominador o pásalas a decimal.', 'للمقارنة، وحّد المقامات أو حوّل إلى أعداد عشرية.'),
    endpoint: text('Muturretako bat da, ez dago tartean.', 'Es uno de los extremos, no está entre ellos.', 'إنه أحد الطرفين، وليس بينهما.'),
    outside: text('Tartetik kanpo dago. Bikoiztu izendatzailea tarteko zatikiak ikusteko.', 'Queda fuera del intervalo. Duplica el denominador para ver fracciones intermedias.', 'يقع خارج المجال. ضاعف المقام لترى كسورًا وسيطة.'),
    'added-denominators': text('Izendatzaileak ez dira batzen: bilatu izendatzaile komuna.', 'Los denominadores no se suman: busca un denominador común.', 'لا تُجمع المقامات: ابحث عن مقام مشترك.'),
    'numerator-only': text('Izendatzailea aldatzean, zenbakitzailea ere biderkatu behar da.', 'Al cambiar el denominador, también hay que multiplicar el numerador.', 'عند تغيير المقام يجب ضرب البسط أيضًا.'),
    sign: text('Zeinua galdu duzu. Begiratu zein zenbaki den handiagoa eta zein eragiketa den.', 'Has perdido el signo. Mira qué número es mayor y qué operación es.', 'فقدت الإشارة. انظر أي العددين أكبر وما العملية.'),
    'cross-multiplied': text('Biderketan zuzenean biderkatzen da: goikoak elkarren artean, behekoak elkarren artean.', 'En el producto se multiplica en línea: arriba con arriba y abajo con abajo.', 'في الضرب نضرب مباشرة: البسط في البسط والمقام في المقام.'),
    'kept-denominator': text('Biderketan izendatzaileak ere biderkatzen dira.', 'En el producto también se multiplican los denominadores.', 'في الضرب تُضرب المقامات أيضًا.'),
    'no-invert': text('Zatitzeko, bigarren zatikia alderantzikatu eta biderkatu.', 'Para dividir, invierte la segunda fracción y multiplica.', 'للقسمة، اقلب الكسر الثاني ثم اضرب.'),
    'inverted-first': text('Bigarren zatikia alderantzikatzen da, ez lehena.', 'Se invierte la segunda fracción, no la primera.', 'يُقلب الكسر الثاني، لا الأول.'),
    priority: text('Biderketak eta zatiketak batuketak eta kenketak baino lehen, parentesiak lehenik.', 'Productos y cocientes antes que sumas y restas; los paréntesis, lo primero.', 'الضرب والقسمة قبل الجمع والطرح، والأقواس أولًا.'),
    'power-numerator': text('Berretura zenbakitzaileari eta izendatzaileari aplikatzen zaie.', 'La potencia se aplica al numerador y al denominador.', 'تُطبق القوة على البسط والمقام.'),
    'power-times': text('Berretzea ez da berretzailearekin biderkatzea.', 'Elevar a una potencia no es multiplicar por el exponente.', 'الرفع إلى قوة ليس ضربًا في الأس.'),
    'forgot-numerator': text('Izendatzailearekin zatitu ondoren, biderkatu zenbakitzailearekin.', 'Después de dividir por el denominador, multiplica por el numerador.', 'بعد القسمة على المقام، اضرب في البسط.'),
    'divided-by-numerator': text('Zatiketa eta biderketa trukatu dituzu.', 'Has cambiado la división por la multiplicación.', 'لقد بدّلت القسمة والضرب.'),
    complement: text('Hori gelditzen den zatia da, ez eskatutakoa.', 'Esa es la parte que sobra, no la que se pide.', 'هذا هو الجزء المتبقي، وليس المطلوب.'),
    'no-hundred': text('Ehuneko bat ehuneko zati bat da: zatitu 100ez.', 'Un porcentaje son partes de cien: divide entre 100.', 'النسبة المئوية أجزاء من مئة: اقسم على 100.'),
    'decimal-place': text('Koma leku batean mugitu da: egiaztatu 10ez biderkatu edo zatitu duzun.', 'La coma se ha movido un lugar: revisa si has multiplicado o dividido por 10.', 'تحركت الفاصلة منزلة واحدة: تحقق من الضرب أو القسمة على 10.'),
    digits: text('Zifrak elkartzeak ez du ehunekoa ematen: biderkatu 100ez.', 'Juntar las cifras no da el porcentaje: multiplica por 100.', 'ضم الأرقام لا يعطي النسبة المئوية: اضرب في 100.'),
    'multiplied-instead': text('Ezagutzen duzu zatia, ez osoa: zatitu zatikiarekin.', 'Conoces la parte, no el total: divide entre la fracción.', 'أنت تعرف الجزء لا الكل: اقسم على الكسر.'),
    'part-of-rest': text('Zatia osoarekin alderatzen da, ez gainerakoarekin.', 'La parte se compara con el total, no con el resto.', 'يُقارن الجزء بالكل، لا بالباقي.'),
    calculation: text('Kalkulu-akatsa. Egin urratsak poliki.', 'Error de cálculo. Haz los pasos con calma.', 'خطأ حسابي. قم بالخطوات بهدوء.')
}
