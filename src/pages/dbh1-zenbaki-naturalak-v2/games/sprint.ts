import { applyOp, bin, checkStep, num, reduceStep, round, square, type Expr, type ExprPath, type HierarchyOp, type StepCheck } from '../../../features/unit-v2/math/expression.ts'
import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Semaforo-sprinta (Sprint del semáforo): tap the operations in the order
   they have to be done; the machine does the arithmetic. Expressions are
   built from templates with random numbers, and every step stays a natural
   number (no negative results, exact divisions).
   ========================================================================== */

export const SPRINT_EXPRESSIONS = 5
export const SPRINT_PENALTY_MS = 3000

/** Letters are numbers; · and : bind tighter than + and − */
export const sprintTemplates: string[][] = [
    ['a + b · c − d', 'a · b − c : d', 'a − b : c + d', 'a : b + c · d', 'a + b − c · d', 'a · b + c · d'],
    ['a · (b + c) − d', 'a + (b − c) · d', '(a + b) : c + d · e', 'a − b · (c − d)', 'a · b − (c + d) : e', '(a − b) · (c + d)'],
    ['a · [b − (c + d)] + e', '[a + b · (c − d)] : e', 'a − [b + c · (d − e)]', '(a + b) · [c − d : e]', '[a · (b + c) − d] : e']
]

type Token = { kind: 'num'; value: number } | { kind: 'op'; op: HierarchyOp } | { kind: 'open'; bracket: 'round' | 'square' } | { kind: 'close' }

function tokenize(template: string, values: Record<string, number>): Token[] {
    return template.split(/\s*/).filter(Boolean).map((char): Token => {
        if (char === '(' || char === '[') return { kind: 'open', bracket: char === '(' ? 'round' : 'square' }
        if (char === ')' || char === ']') return { kind: 'close' }
        if (char === '+' || char === '·' || char === ':') return { kind: 'op', op: char }
        if (char === '−' || char === '-') return { kind: 'op', op: '-' }
        return { kind: 'num', value: values[char] }
    })
}

/** Reads the tokens with the usual precedence, same-level operations from left to right */
export function parseExpression(tokens: Token[]): Expr {
    let position = 0
    const factor = (): Expr => {
        const token = tokens[position++]
        if (token.kind === 'num') return num(token.value, false)
        if (token.kind === 'open') {
            const inner = sum()
            position += 1
            return token.bracket === 'round' ? round(inner) : square(inner)
        }
        throw new Error('Unexpected token')
    }
    const product = (): Expr => {
        let left = factor()
        while (tokens[position]?.kind === 'op' && ['·', ':'].includes((tokens[position] as { op: HierarchyOp }).op)) {
            const op = (tokens[position++] as { op: HierarchyOp }).op
            left = bin(left, op, factor())
        }
        return left
    }
    function sum(): Expr {
        let left = product()
        while (tokens[position]?.kind === 'op' && ['+', '-'].includes((tokens[position] as { op: HierarchyOp }).op)) {
            const op = (tokens[position++] as { op: HierarchyOp }).op
            left = bin(left, op, product())
        }
        return left
    }
    const expr = sum()
    if (position !== tokens.length) throw new Error('Tokens left over')
    return expr
}

/** Value of the expression, or null if some step is negative, not exact or too big */
export function naturalValue(expr: Expr): number | null {
    if (expr.kind === 'num') return expr.value
    if (expr.kind === 'group') return naturalValue(expr.inner)
    const left = naturalValue(expr.left)
    const right = naturalValue(expr.right)
    if (left === null || right === null) return null
    if (expr.op === ':' && (right === 0 || left % right !== 0)) return null
    const value = applyOp(expr.op, left, right)
    return value >= 0 && value <= 999 ? value : null
}

export function createSprintExpression(random: Random, levelIndex: number): Expr {
    for (let attempt = 0; attempt < 5000; attempt += 1) {
        const template = pick(random, sprintTemplates[levelIndex])
        const values = Object.fromEntries('abcde'.split('').map((letter) => [letter, randomInt(random, 1, 12)]))
        // Bigger first numbers make subtractions possible more often
        values.a = randomInt(random, 2, 40)
        const expr = parseExpression(tokenize(template, values))
        if (naturalValue(expr) !== null) return expr
    }
    throw new Error('Could not build a sprint expression')
}

/** Operations still to do, in reading order */
export function sprintOperations(expr: Expr, path: ExprPath = []): ExprPath[] {
    if (expr.kind === 'num') return []
    if (expr.kind === 'group') return sprintOperations(expr.inner, [...path, 'i'])
    return [...sprintOperations(expr.left, [...path, 'l']), path, ...sprintOperations(expr.right, [...path, 'r'])]
}

/** Taps an operation: done if it is its turn, otherwise the reason it has to wait */
export function tapOperation(expr: Expr, path: ExprPath): { expr: Expr; verdict: StepCheck } {
    const verdict = checkStep(expr, path)
    return verdict === 'ok' ? { expr: reduceStep(expr, path), verdict } : { expr, verdict }
}

export function sprintParTime(levelIndex: number): number {
    return (SPRINT_EXPRESSIONS * [9, 12, 15][levelIndex] + 5) * 1000
}

export function sprintStars(levelIndex: number, timeMs: number, mistakes: number): Stars {
    const par = sprintParTime(levelIndex)
    if (timeMs <= par * 0.8 && mistakes <= 1) return 3
    if (timeMs <= par) return 2
    return 1
}
