import type { Fraction, MixedNumber, FractionOperation, AnswerOption, LevelConfig, ExpressionNode, Operator, OperationFilter } from '../types'
import { LEVELS } from '../types'

// Greatest Common Divisor
export function gcd(a: number, b: number): number {
    a = Math.abs(a)
    b = Math.abs(b)
    while (b) {
        const t = b
        b = a % b
        a = t
    }
    return a
}

// Least Common Multiple
export function lcm(a: number, b: number): number {
    return Math.abs(a * b) / gcd(a, b)
}

// Simplify a fraction
export function simplify(numerator: number, denominator: number): Fraction {
    if (numerator === 0) return { numerator: 0, denominator: 1 }
    const divisor = gcd(numerator, denominator)
    const isNegative = (numerator < 0) !== (denominator < 0)
    return {
        numerator: Math.abs(numerator / divisor),
        denominator: Math.abs(denominator / divisor),
        isNegative
    }
}

function signedNumerator(value: Fraction): number {
    return value.isNegative ? -Math.abs(value.numerator) : value.numerator
}

function simplifyFractionValue(value: Fraction): Fraction {
    return simplify(signedNumerator(value), value.denominator)
}

function rawFraction(numerator: number, denominator: number): Fraction {
    const isNegative = (numerator < 0) !== (denominator < 0)
    return {
        numerator: Math.abs(numerator),
        denominator: Math.abs(denominator),
        isNegative
    }
}

function isValidFraction(value: Fraction): boolean {
    return Number.isFinite(value.numerator)
        && Number.isFinite(value.denominator)
        && value.denominator > 0
}

// Convert mixed number to improper fraction
export function mixedToImproper(mixed: MixedNumber): Fraction {
    const sign = mixed.isNegative ? -1 : 1
    const improperNumerator = sign * (Math.abs(mixed.whole) * mixed.denominator + mixed.numerator)
    return simplify(improperNumerator, mixed.denominator)
}

// Convert improper fraction to mixed number
export function improperToMixed(fraction: Fraction): MixedNumber {
    const normalized = simplifyFractionValue(fraction)
    const whole = Math.floor(normalized.numerator / normalized.denominator)
    const remainder = normalized.numerator % normalized.denominator
    return {
        whole,
        numerator: remainder,
        denominator: normalized.denominator,
        isNegative: normalized.isNegative
    }
}

// Check if a fraction is a mixed number (improper)
export function isMixedNumber(obj: Fraction | MixedNumber): obj is MixedNumber {
    return 'whole' in obj
}

// Get fraction value as number
export function toNumber(f: Fraction | MixedNumber): number {
    if (isMixedNumber(f)) {
        const sign = f.isNegative ? -1 : 1
        return sign * (Math.abs(f.whole) + f.numerator / f.denominator)
    }
    const sign = f.isNegative ? -1 : 1
    return sign * (f.numerator / f.denominator)
}

// Add two fractions
export function addFractions(a: Fraction, b: Fraction): Fraction {
    const commonDenom = lcm(a.denominator, b.denominator)
    const newNumA = signedNumerator(a) * (commonDenom / a.denominator)
    const newNumB = signedNumerator(b) * (commonDenom / b.denominator)
    return simplify(newNumA + newNumB, commonDenom)
}

// Add two fractions WITHOUT simplifying (for easy level)
export function addFractionsRaw(a: Fraction, b: Fraction): Fraction {
    const commonDenom = lcm(a.denominator, b.denominator)
    const newNumA = signedNumerator(a) * (commonDenom / a.denominator)
    const newNumB = signedNumerator(b) * (commonDenom / b.denominator)
    return rawFraction(newNumA + newNumB, commonDenom)
}

// Subtract two fractions
export function subtractFractions(a: Fraction, b: Fraction): Fraction {
    const commonDenom = lcm(a.denominator, b.denominator)
    const newNumA = signedNumerator(a) * (commonDenom / a.denominator)
    const newNumB = signedNumerator(b) * (commonDenom / b.denominator)
    return simplify(newNumA - newNumB, commonDenom)
}

// Subtract two fractions WITHOUT simplifying (for easy level)
export function subtractFractionsRaw(a: Fraction, b: Fraction): Fraction {
    const commonDenom = lcm(a.denominator, b.denominator)
    const newNumA = signedNumerator(a) * (commonDenom / a.denominator)
    const newNumB = signedNumerator(b) * (commonDenom / b.denominator)
    const result = newNumA - newNumB
    return rawFraction(result, commonDenom)
}

// Multiply two fractions
export function multiplyFractions(a: Fraction, b: Fraction): Fraction {
    return simplify(signedNumerator(a) * signedNumerator(b), a.denominator * b.denominator)
}

// Multiply two fractions WITHOUT simplifying
export function multiplyFractionsRaw(a: Fraction, b: Fraction): Fraction {
    return rawFraction(signedNumerator(a) * signedNumerator(b), a.denominator * b.denominator)
}

// Divide two fractions (a ÷ b = a × (b inverted))
export function divideFractions(a: Fraction, b: Fraction): Fraction {
    return simplify(signedNumerator(a) * b.denominator, a.denominator * signedNumerator(b))
}

// Divide two fractions WITHOUT simplifying
export function divideFractionsRaw(a: Fraction, b: Fraction): Fraction {
    return rawFraction(signedNumerator(a) * b.denominator, a.denominator * signedNumerator(b))
}

// Raise a fraction to an integer power
export function powerFraction(base: Fraction, exponent: number): Fraction {
    if (exponent === 0) return { numerator: 1, denominator: 1 }
    if (exponent === 1) return simplifyFractionValue(base)
    return simplify(
        Math.pow(signedNumerator(base), exponent),
        Math.pow(base.denominator, exponent)
    )
}

// Power WITHOUT simplifying
export function powerFractionRaw(base: Fraction, exponent: number): Fraction {
    if (exponent === 0) return { numerator: 1, denominator: 1 }
    return rawFraction(
        Math.pow(signedNumerator(base), exponent),
        Math.pow(base.denominator, exponent)
    )
}

// Generate a random fraction based on level config
function generateFraction(config: LevelConfig, targetDenom?: number): Fraction {
    const denominators = config.sameDenominator && targetDenom
        ? [targetDenom]
        : [2, 3, 4, 5, 6, 8, 10, 12].filter(d => d <= config.maxDenominator)

    const denominator = denominators[Math.floor(Math.random() * denominators.length)]
    const numerator = Math.floor(Math.random() * (denominator - 1)) + 1

    return { numerator, denominator }
}

// Generate a random mixed number
function generateMixedNumber(config: LevelConfig): MixedNumber {
    const fraction = generateFraction(config)
    const whole = Math.floor(Math.random() * 3) + 1
    return { whole, numerator: fraction.numerator, denominator: fraction.denominator }
}

// Generate a complete fraction operation
export function generateOperation(
    level: number,
    overrides: { operationFilter?: OperationFilter, includeMixed?: boolean } = {}
): FractionOperation {
    const baseConfig = LEVELS[Math.min(level, LEVELS.length - 1)]
    let operationType = baseConfig.operationType

    if (baseConfig.gameMode === 'addSub') {
        if (overrides.operationFilter === 'addition') operationType = 'addition'
        if (overrides.operationFilter === 'subtraction') operationType = 'subtraction'
    }
    if (baseConfig.gameMode === 'mulDiv') {
        if (overrides.operationFilter === 'multiplication') operationType = 'multiplication'
        if (overrides.operationFilter === 'division') operationType = 'division'
    }

    const config: LevelConfig = {
        ...baseConfig,
        operationType,
        includeMixed: overrides.includeMixed ?? baseConfig.includeMixed
    }

    // Determine operation type based on config
    switch (config.operationType) {
        case 'power':
            return generatePowerOperation(config)
        case 'multiplication':
            return generateMulDivOperation(config, '×')
        case 'division':
            return generateMulDivOperation(config, '÷')
        case 'mulDivMixed':
            return generateMulDivOperation(config, Math.random() > 0.5 ? '×' : '÷')
        case 'combined':
            return generateCombinedOperation(config)
        default:
            return generateAddSubOperation(config)
    }
}

// Calculate value of an expression tree
function evaluateExpression(node: ExpressionNode): Fraction {
    if (node.type === 'fraction') {
        return isMixedNumber(node.value) ? mixedToImproper(node.value) : node.value
    }
    if (node.type === 'number') return { numerator: node.value, denominator: 1 }

    if (node.type === 'operation') {
        const leftVal = evaluateExpression(node.left)

        if (node.operator === '^') {
            // Expect right node to be number type for power
            const exponent = (node.right.type === 'number') ? node.right.value : 1
            return powerFraction(leftVal, exponent)
        }

        const rightVal = evaluateExpression(node.right)

        switch (node.operator) {
            case '+': return addFractions(leftVal, rightVal)
            case '-': return subtractFractions(leftVal, rightVal)
            case '×': return multiplyFractions(leftVal, rightVal)
            case '÷': return divideFractions(leftVal, rightVal)
        }
    }
    return { numerator: 0, denominator: 1 }
}

function generateCombinedOperation(config: LevelConfig): FractionOperation {
    const isHard = config.name === 'hard'
    const isMedium = config.name === 'medium'

    const createLeaf = (): ExpressionNode => ({
        type: 'fraction',
        value: generateFraction(config)
    })

    const createOp = (op: Operator, l: ExpressionNode, r: ExpressionNode, wrap: boolean = false): ExpressionNode => ({
        type: 'operation',
        operator: op,
        left: l,
        right: r,
        wrapped: wrap
    })

    const randomOp = (): Operator => {
        const ops: Operator[] = ['+', '-']
        if (isMedium || isHard) {
            ops.push('×')
            if (Math.random() < 0.5) ops.push('÷') // Less frequent division
        }
        // Power removed per user request
        // if (isHard && Math.random() < 0.2) return '^'
        return ops[Math.floor(Math.random() * ops.length)]
    }

    const safeOp = (op: Operator): Operator => op === '^' ? (isHard ? '^' : '+') : op

    let tree: ExpressionNode
    let result: Fraction
    let attempts = 0

    do {
        attempts++
        // Choose template
        // 0: (A op B) op C
        // 1: A op (B op C)
        // 2: (A op B) op (C op D) - Hard only
        let template = Math.random() < 0.5 ? 0 : 1
        if (isHard && Math.random() < 0.4) template = 2

        const topOp = randomOp()

        if (template === 2) {
            // (A op B) op (C op D)
            const op1 = safeOp(randomOp())
            if (op1 === '^') {
                tree = createOp(topOp,
                    createOp('^', createLeaf(), { type: 'number', value: 2 }, true),
                    createOp(safeOp(randomOp()), createLeaf(), createLeaf(), true)
                )
            } else {
                tree = createOp(topOp,
                    createOp(op1, createLeaf(), createLeaf(), true),
                    createOp(safeOp(randomOp()), createLeaf(), createLeaf(), true)
                )
            }
        } else {
            // 3 operands
            const subOp = safeOp(randomOp())
            if (template === 0) {
                // (A op B) op C
                const leftNode = subOp === '^'
                    ? createOp('^', createLeaf(), { type: 'number', value: 2 }, true)
                    : createOp(subOp, createLeaf(), createLeaf(), true)

                tree = createOp(topOp, leftNode, createLeaf())
            } else {
                // A op (B op C)
                const rightNode = subOp === '^'
                    ? createOp('^', createLeaf(), { type: 'number', value: 2 }, true)
                    : createOp(subOp, createLeaf(), createLeaf(), true)

                tree = createOp(topOp, createLeaf(), rightNode)
            }
        }

        result = evaluateExpression(tree)

    } while ((!isValidFraction(result) || result.isNegative || result.numerator < 0) && attempts < 40)

    // Fallback if no finite, non-negative expression could be generated.
    if (!isValidFraction(result) || result.isNegative || result.numerator < 0) {
        tree = createOp('+',
            { type: 'fraction', value: { numerator: 1, denominator: 2 } },
            { type: 'fraction', value: { numerator: 1, denominator: 2 } }
        )
        result = evaluateExpression(tree)
    }

    return {
        left: { numerator: 1, denominator: 1 }, // Dummy
        right: { numerator: 1, denominator: 1 }, // Dummy
        operator: '+', // Dummy
        result: result,
        rawResult: result,
        simplifiedResult: simplifyFractionValue(result),
        isMixed: false,
        displayTree: tree
    }
}

// Generate addition/subtraction operation
function generateAddSubOperation(config: LevelConfig): FractionOperation {
    const operator: '+' | '-' = config.operationType === 'addition'
        ? '+' : config.operationType === 'subtraction'
            ? '-' : (Math.random() > 0.5 ? '+' : '-')

    let left: Fraction | MixedNumber
    let right: Fraction | MixedNumber
    let result: Fraction

    if (config.includeMixed && Math.random() > 0.5) {
        // Mixed number operation
        left = generateMixedNumber(config)
        right = generateFraction(config, left.denominator)

        let leftImproper = isMixedNumber(left) ? mixedToImproper(left) : left
        let rightFraction = right as Fraction
        result = operator === '+'
            ? addFractions(leftImproper, rightFraction)
            : subtractFractions(leftImproper, rightFraction)

        // Ensure positive result for subtraction
        if (result.isNegative) {
            const temp = left
            left = right
            right = temp
            leftImproper = isMixedNumber(left) ? mixedToImproper(left) : left
            rightFraction = isMixedNumber(right) ? mixedToImproper(right) : right
            result = subtractFractions(leftImproper, rightFraction)
        }

        const rawResult = operator === '+'
            ? addFractionsRaw(leftImproper, rightFraction)
            : subtractFractionsRaw(leftImproper, rightFraction)

        return {
            left,
            right,
            operator,
            result,
            rawResult,
            simplifiedResult: simplifyFractionValue(result),
            isMixed: true
        }
    } else {
        // Simple fraction operation
        const availableDenominators = [2, 3, 4, 5, 6, 8].filter(d => d <= config.maxDenominator)
        const baseDenom = config.sameDenominator
            ? availableDenominators[Math.floor(Math.random() * availableDenominators.length)]
            : undefined

        left = generateFraction(config, baseDenom)
        right = generateFraction(config, baseDenom)

        result = operator === '+'
            ? addFractions(left as Fraction, right as Fraction)
            : subtractFractions(left as Fraction, right as Fraction)

        // Ensure positive result for subtraction
        if (result.isNegative || result.numerator < 0) {
            const temp = left
            left = right
            right = temp
            result = subtractFractions(left as Fraction, right as Fraction)
        }

        const rawResult = operator === '+'
            ? addFractionsRaw(left as Fraction, right as Fraction)
            : subtractFractionsRaw(left as Fraction, right as Fraction)

        return {
            left,
            right,
            operator,
            result,
            rawResult,
            simplifiedResult: simplifyFractionValue(result),
            isMixed: false
        }
    }
}

// Generate multiplication/division operation
function generateMulDivOperation(config: LevelConfig, operator: '×' | '÷'): FractionOperation {
    let left: Fraction | MixedNumber
    let right: Fraction | MixedNumber
    let result: Fraction
    let rawResult: Fraction

    if (config.includeMixed && Math.random() > 0.5) {
        left = generateMixedNumber(config)
        right = generateFraction(config)

        const leftImproper = mixedToImproper(left as MixedNumber)
        const rightFraction = right as Fraction

        if (operator === '×') {
            result = multiplyFractions(leftImproper, rightFraction)
            rawResult = multiplyFractionsRaw(leftImproper, rightFraction)
        } else {
            result = divideFractions(leftImproper, rightFraction)
            rawResult = divideFractionsRaw(leftImproper, rightFraction)
        }

        return {
            left,
            right,
            operator,
            result,
            rawResult,
            simplifiedResult: simplifyFractionValue(result),
            isMixed: true
        }
    } else {
        left = generateFraction(config)
        right = generateFraction(config)

        if (operator === '×') {
            result = multiplyFractions(left as Fraction, right as Fraction)
            rawResult = multiplyFractionsRaw(left as Fraction, right as Fraction)
        } else {
            result = divideFractions(left as Fraction, right as Fraction)
            rawResult = divideFractionsRaw(left as Fraction, right as Fraction)
        }

        return {
            left,
            right,
            operator,
            result,
            rawResult,
            simplifiedResult: simplifyFractionValue(result),
            isMixed: false
        }
    }
}

// Generate power operation
function generatePowerOperation(config: LevelConfig): FractionOperation {
    const base = generateFraction(config)
    const maxExp = config.maxExponent || 2
    const exponent = 2 + Math.floor(Math.random() * Math.max(1, maxExp - 1))

    const result = powerFraction(base, exponent)
    const rawResult = powerFractionRaw(base, exponent)

    return {
        left: base,
        right: exponent,  // For powers, right is a number
        operator: '^',
        result,
        rawResult,
        simplifiedResult: simplifyFractionValue(result),
        isMixed: false
    }
}

// Generate answer options (1 correct + 3 wrong)
export function generateAnswerOptions(operation: FractionOperation): AnswerOption[] {
    // Every mode follows the same contract: the accepted option is simplified.
    const correct = operation.simplifiedResult
    const options: AnswerOption[] = [
        { fraction: correct, isCorrect: true, id: 'correct' }
    ]

    const wrongAnswers: Fraction[] = []
    const l = operation.left as Fraction
    // Right can be a Fraction or number (for powers)
    const r = typeof operation.right === 'number'
        ? { numerator: operation.right, denominator: 1 } as Fraction
        : operation.right as Fraction

    // Generate specific wrong answers based on operation type
    if (operation.displayTree) {
        // For combined operations, rely on variations primarily
        // Add random simplified generic mistakes
        wrongAnswers.push(simplify(correct.numerator + 1, correct.denominator))
        wrongAnswers.push(simplify(correct.numerator, correct.denominator + 1))
    } else if (operation.operator === '^' && typeof operation.right === 'number') {
        const exponent = operation.right
        // Mistake: Multiply instead of power
        wrongAnswers.push(simplify(l.numerator * exponent, l.denominator))
        wrongAnswers.push(simplify(l.numerator, l.denominator * exponent))

        // Mistake: Only power top or bottom
        wrongAnswers.push(simplify(Math.pow(l.numerator, exponent), l.denominator))
        wrongAnswers.push(simplify(l.numerator, Math.pow(l.denominator, exponent)))

        // Mistake: Add instead of power
        wrongAnswers.push(simplify(l.numerator + exponent, l.denominator))

    } else if (operation.operator === '×') {
        // Mistake: Cross multiply (division logic)
        wrongAnswers.push(simplify(l.numerator * r.denominator, l.denominator * r.numerator))

        // Mistake: Adding numerators/denominators
        wrongAnswers.push(simplify(l.numerator + r.numerator, l.denominator + r.denominator))

        // Mistake: Common denominator but multiply numerators?
        const common = lcm(l.denominator, r.denominator)
        wrongAnswers.push(simplify(l.numerator * r.numerator, common))

    } else if (operation.operator === '÷') {
        // Mistake: Direct multiply
        wrongAnswers.push(simplify(l.numerator * r.numerator, l.denominator * r.denominator))

        // Mistake: Flip wrong one
        wrongAnswers.push(simplify(l.denominator * r.numerator, l.numerator * r.denominator))

        // Mistake: Subtracting?
        // wrongAnswers.push(simplify(Math.abs(l.numerator - r.numerator), Math.abs(l.denominator - r.denominator)))

    } else {
        // Addition / Subtraction
        // Mistake: adding/subtracting denominators
        const wrongDenomOp = operation.operator === '+'
            ? l.denominator + r.denominator
            : Math.abs(l.denominator - r.denominator) || 1

        const wrongNumOp = operation.operator === '+'
            ? l.numerator + r.numerator
            : Math.abs(l.numerator - r.numerator)

        wrongAnswers.push(simplify(wrongNumOp, wrongDenomOp))

        // Mistake: Operation on numerators, keep one denominator
        wrongAnswers.push(simplify(wrongNumOp, l.denominator))
        wrongAnswers.push(simplify(wrongNumOp, r.denominator))
    }

    // Common random variations (fallback)
    const variations = [
        { num: correct.numerator + 1, den: correct.denominator },
        { num: correct.numerator - 1, den: correct.denominator },
        { num: correct.numerator, den: correct.denominator + 1 },
        { num: correct.numerator * 2, den: correct.denominator * 2 + 1 },
        { num: correct.numerator + 1, den: correct.denominator + 1 }
    ]

    for (const v of variations) {
        if (v.num > 0 && v.den > 0) {
            const simplified = simplify(v.num, v.den)
            if (!fractionsEqual(simplified, correct) && !wrongAnswers.some(w => fractionsEqual(w, simplified))) {
                wrongAnswers.push(simplified)
            }
        }
    }

    // Take 3 unique wrong answers
    const selectedWrong: Fraction[] = []

    // Filter out correct answer and duplicates from wrongAnswers
    for (const wrong of wrongAnswers) {
        if (selectedWrong.length >= 3) break

        // Check if equal to correct
        if (fractionsEqual(wrong, correct)) continue

        // Check if already selected
        if (selectedWrong.some(w => fractionsEqual(w, wrong))) continue

        // Check validity
        if (isNaN(wrong.numerator) || isNaN(wrong.denominator) || wrong.denominator === 0) continue

        selectedWrong.push(wrong)
    }

    // Fill with random if needed
    while (selectedWrong.length < 3) {
        const random = simplify(
            Math.floor(Math.random() * 10) + 1,
            Math.floor(Math.random() * 8) + 2
        )
        if (!fractionsEqual(random, correct) && !selectedWrong.some(w => fractionsEqual(w, random))) {
            selectedWrong.push(random)
        }
    }

    selectedWrong.forEach((f, i) => {
        options.push({ fraction: f, isCorrect: false, id: `wrong${i}` })
    })

    // Shuffle options
    return options.sort(() => Math.random() - 0.5)
}

// Check if two fractions are equal
export function fractionsEqual(a: Fraction, b: Fraction): boolean {
    const aSimp = simplifyFractionValue(a)
    const bSimp = simplifyFractionValue(b)
    return aSimp.numerator === bSimp.numerator &&
        aSimp.denominator === bSimp.denominator &&
        !!aSimp.isNegative === !!bSimp.isNegative
}

// Format fraction for display
export function formatFraction(f: Fraction | MixedNumber): string {
    if (isMixedNumber(f)) {
        const sign = f.isNegative ? '-' : ''
        if (f.numerator === 0) return `${sign}${f.whole}`
        return `${sign}${f.whole} ${f.numerator}/${f.denominator}`
    }
    const sign = f.isNegative ? '-' : ''
    return `${sign}${f.numerator}/${f.denominator}`
}
