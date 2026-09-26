import {
    equals,
    fraction,
    normalizeLocalizedDigits,
    parseFractionInput,
    type FractionValue
} from '../../../features/fractions/fractionMath'
import type { FractionLang } from './exercisesData'

type RationalAnswer = { kind: 'rational', expected: FractionValue }
type RationalListAnswer = { kind: 'rational-list', expected: FractionValue[], ordered: boolean }
type FractionFormsAnswer = { kind: 'fraction-forms', expected: Array<[number, number]> }
type BetweenAnswer = { kind: 'between', lower: FractionValue, upper: FractionValue }
type YesAnswer = { kind: 'yes' }
type ComparisonAnswer = { kind: 'comparison', expected: '>' | '<' | '=' }
type ClassificationAnswer = { kind: 'classification' }

export type ExerciseAnswerSpec = RationalAnswer
    | RationalListAnswer
    | FractionFormsAnswer
    | BetweenAnswer
    | YesAnswer
    | ComparisonAnswer
    | ClassificationAnswer

const r = (numerator: number, denominator: number = 1) => fraction(numerator, denominator)

export const EXERCISE_ANSWER_SPECS: Record<string, ExerciseAnswerSpec> = {
    'representacion-1': { kind: 'rational', expected: r(7, 12) },
    'representacion-2': { kind: 'classification' },
    'representacion-3': { kind: 'rational', expected: r(17, 5) },
    'representacion-4': { kind: 'rational', expected: r(29, 6) },
    'representacion-5': { kind: 'rational-list', expected: [r(2), r(3)], ordered: true },
    'representacion-6': { kind: 'rational-list', expected: [r(14, 9), r(14, 9)], ordered: true },

    'equivalentes-1': { kind: 'rational', expected: r(12) },
    'equivalentes-2': { kind: 'rational', expected: r(3, 4) },
    'equivalentes-3': { kind: 'yes' },
    'equivalentes-4': { kind: 'rational', expected: r(2, 3) },
    'equivalentes-5': { kind: 'fraction-forms', expected: [[21, 27], [35, 45]] },
    'equivalentes-6': { kind: 'rational', expected: r(15) },

    'comparacion-1': { kind: 'rational-list', expected: [r(1, 2), r(2, 3), r(3, 4)], ordered: true },
    'comparacion-2': { kind: 'comparison', expected: '>' },
    'comparacion-3': { kind: 'rational-list', expected: [r(-7, 10), r(-3, 5), r(0), r(1, 2)], ordered: true },
    'comparacion-4': { kind: 'between', lower: r(2, 5), upper: r(1, 2) },
    'comparacion-5': { kind: 'rational-list', expected: [r(5, 8), r(11, 18), r(7, 12)], ordered: true },
    'comparacion-6': { kind: 'rational', expected: r(7) },

    'suma-resta-1': { kind: 'rational', expected: r(1, 2) },
    'suma-resta-2': { kind: 'rational', expected: r(7, 12) },
    'suma-resta-3': { kind: 'rational', expected: r(7, 12) },
    'suma-resta-4': { kind: 'rational', expected: r(19, 18) },
    'suma-resta-5': { kind: 'rational', expected: r(43, 24) },
    'suma-resta-6': { kind: 'rational', expected: r(-7, 20) },

    'producto-division-1': { kind: 'rational', expected: r(3, 10) },
    'producto-division-2': { kind: 'rational', expected: r(15, 14) },
    'producto-division-3': { kind: 'rational', expected: r(2, 5) },
    'producto-division-4': { kind: 'rational', expected: r(-5, 6) },
    'producto-division-5': { kind: 'rational', expected: r(-1) },
    'producto-division-6': { kind: 'rational', expected: r(120) },

    'potencias-1': { kind: 'rational', expected: r(8, 27) },
    'potencias-2': { kind: 'rational', expected: r(9, 25) },
    'potencias-3': { kind: 'rational', expected: r(2, 3) },
    'potencias-4': { kind: 'rational', expected: r(1, 4) },
    'potencias-5': { kind: 'rational', expected: r(2) },
    'potencias-6': { kind: 'rational', expected: r(-1, 4) },

    'problemas-1': { kind: 'rational', expected: r(5, 12) },
    'problemas-2': { kind: 'rational', expected: r(12) },
    'problemas-3': { kind: 'rational', expected: r(5, 8) },
    'problemas-4': { kind: 'rational', expected: r(138) },
    'problemas-5': { kind: 'rational', expected: r(280) },
    'problemas-6': { kind: 'rational', expected: r(40) }
}

function normalizeText(value: string): string {
    return normalizeLocalizedDigits(value)
        .normalize('NFD')
        .replace(/\p{M}/gu, '')
        .replace(/\u0640/g, '')
        .toLocaleLowerCase()
        .replace(/[^\p{L}\p{N}<>=]+/gu, ' ')
        .trim()
}

export function extractRationalInputs(input: string): FractionValue[] {
    const normalized = normalizeLocalizedDigits(input)
        .replace(/\b(?:y|eta)\b/gi, ' ')
    const tokens = normalized.match(/[+-]?\d+\s+\d+\/\d+|[+-]?\d+\/[+-]?\d+|[+-]?\d+(?:[.,]\d+)?/g) ?? []

    return tokens
        .map((token) => parseFractionInput(token))
        .filter((value): value is FractionValue => value !== null)
}

function validateRationalList(input: string, spec: RationalListAnswer): boolean {
    const values = extractRationalInputs(input)
    if (values.length !== spec.expected.length) return false

    if (spec.ordered) {
        return values.every((value, index) => equals(value, spec.expected[index]))
    }

    const remaining = [...spec.expected]
    return values.every((value) => {
        const index = remaining.findIndex((candidate) => equals(value, candidate))
        if (index === -1) return false
        remaining.splice(index, 1)
        return true
    })
}

function validateFractionForms(input: string, spec: FractionFormsAnswer): boolean {
    const normalized = normalizeLocalizedDigits(input)
    const forms = [...normalized.matchAll(/([+-]?\d+)\s*\/\s*([+-]?\d+)/g)]
        .map((match) => [Number(match[1]), Number(match[2])] as [number, number])

    if (forms.length !== spec.expected.length) return false
    return forms.every(([numerator, denominator], index) => {
        const [expectedNumerator, expectedDenominator] = spec.expected[index]
        return numerator === expectedNumerator && denominator === expectedDenominator
    })
}

function validateClassification(input: string, lang: FractionLang): boolean {
    const normalized = normalizeText(input)
    const aliases: Record<FractionLang, string[][]> = {
        es: [['propia'], ['impropia'], ['unidad', 'igual a 1', '1']],
        eu: [['propioa'], ['inpropioa'], ['unitatea', 'unitatearen', '1']],
        ar: [['حقيقي'], ['غير حقيقي'], ['الواحد', 'يساوي 1', '1']]
    }

    let previousIndex = -1
    return aliases[lang].every((group) => {
        const indexes = group
            .map((alias) => normalized.indexOf(normalizeText(alias), previousIndex + 1))
            .filter((index) => index >= 0)
        if (indexes.length === 0) return false
        previousIndex = Math.min(...indexes)
        return true
    })
}

export function validateExerciseAnswer(
    sectionId: string,
    exerciseId: number,
    input: string,
    lang: FractionLang
): boolean {
    const spec = EXERCISE_ANSWER_SPECS[`${sectionId}-${exerciseId}`]
    if (!spec || !input.trim()) return false

    switch (spec.kind) {
        case 'rational': {
            const value = parseFractionInput(input)
            return value !== null && equals(value, spec.expected)
        }
        case 'rational-list':
            return validateRationalList(input, spec)
        case 'fraction-forms':
            return validateFractionForms(input, spec)
        case 'between': {
            const value = parseFractionInput(input)
            if (!value) return false
            return value.numerator * spec.lower.denominator > spec.lower.numerator * value.denominator
                && value.numerator * spec.upper.denominator < spec.upper.numerator * value.denominator
        }
        case 'yes': {
            const normalized = normalizeText(input)
            return ['si', 'bai', 'yes', 'نعم'].includes(normalized)
        }
        case 'comparison': {
            const normalized = normalizeText(input)
            if (spec.expected === '>') {
                return input.includes('>')
                    || ['mayor', 'handiago', 'أكبر'].some((word) => normalized.includes(normalizeText(word)))
            }
            if (spec.expected === '<') {
                return input.includes('<')
                    || ['menor', 'txikiago', 'أصغر'].some((word) => normalized.includes(normalizeText(word)))
            }
            return input.includes('=') || ['igual', 'berdin', 'يساوي'].some((word) => normalized.includes(normalizeText(word)))
        }
        case 'classification':
            return validateClassification(input, lang)
    }
}
