import type { ErrorCategory, Fraction, FractionOperation } from '../types'
import { fractionsEqual } from './fractions'

function isNegative(value: Fraction): boolean {
    return Boolean(value.isNegative) && value.numerator !== 0
}

export function analyzeErrorCategory(
    operation: FractionOperation,
    selectedAnswer: Fraction,
    correctAnswer: Fraction
): ErrorCategory {
    if (fractionsEqual(selectedAnswer, correctAnswer)) return 'simplification'
    if (isNegative(selectedAnswer) !== isNegative(correctAnswer)) return 'sign'
    if (operation.displayTree) return 'operationOrder'

    switch (operation.operator) {
        case '+':
        case '-':
            return selectedAnswer.denominator !== correctAnswer.denominator
                ? 'commonDenominator'
                : 'calculation'
        case '×':
            return 'multiplication'
        case '÷':
            return 'inverse'
        case '^':
            return 'power'
        default:
            return 'calculation'
    }
}
