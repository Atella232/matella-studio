import { checkAnswer, fraction } from './fraction.ts'

/* ==========================================================================
   Combined operations solved one step at a time (used by the hierarchy
   tools of the V2 units). An expression is a tree; the learner picks the
   operation that goes first and types its result.
   ========================================================================== */

export type HierarchyOp = '+' | '-' | '·' | ':'

export type Expr =
    | { kind: 'num'; value: number; /** Written with its sign in brackets, as in the integers textbook */ paren: boolean }
    | { kind: 'bin'; op: HierarchyOp; left: Expr; right: Expr }
    | { kind: 'group'; bracket: 'round' | 'square'; inner: Expr }

/** Steps from the root to a node: left, right or inside a group */
export type ExprPath = Array<'l' | 'r' | 'i'>

export const num = (value: number, paren = true): Expr => ({ kind: 'num', value, paren })
export const bin = (left: Expr, op: HierarchyOp, right: Expr): Expr => ({ kind: 'bin', op, left, right })
export const round = (inner: Expr): Expr => ({ kind: 'group', bracket: 'round', inner })
export const square = (inner: Expr): Expr => ({ kind: 'group', bracket: 'square', inner })

export interface HierarchyExercise {
    id: number
    expr: Expr
}

export function nodeAt(expr: Expr, path: ExprPath): Expr {
    return path.reduce<Expr>((node, step) => {
        if (step === 'i' && node.kind === 'group') return node.inner
        if (step === 'l' && node.kind === 'bin') return node.left
        if (step === 'r' && node.kind === 'bin') return node.right
        throw new Error('Invalid path')
    }, expr)
}

function replaceAt(expr: Expr, path: ExprPath, replacement: Expr): Expr {
    if (path.length === 0) return replacement
    const [step, ...rest] = path
    if (step === 'i' && expr.kind === 'group') return { ...expr, inner: replaceAt(expr.inner, rest, replacement) }
    if (step === 'l' && expr.kind === 'bin') return { ...expr, left: replaceAt(expr.left, rest, replacement) }
    if (step === 'r' && expr.kind === 'bin') return { ...expr, right: replaceAt(expr.right, rest, replacement) }
    throw new Error('Invalid path')
}

export function applyOp(op: HierarchyOp, left: number, right: number): number {
    if (op === '+') return left + right
    if (op === '-') return left - right
    if (op === '·') return left * right
    return left / right
}

export function evaluateExpr(expr: Expr): number {
    if (expr.kind === 'num') return expr.value
    if (expr.kind === 'group') return evaluateExpr(expr.inner)
    return applyOp(expr.op, evaluateExpr(expr.left), evaluateExpr(expr.right))
}

/** Every operation in reading order, with its path */
export function operationPaths(expr: Expr, path: ExprPath = []): ExprPath[] {
    if (expr.kind === 'num') return []
    if (expr.kind === 'group') return operationPaths(expr.inner, [...path, 'i'])
    return [...operationPaths(expr.left, [...path, 'l']), path, ...operationPaths(expr.right, [...path, 'r'])]
}

/** Whether a scope (the whole expression or one bracket) still has products or quotients outside inner brackets */
function hasMulDiv(expr: Expr): boolean {
    if (expr.kind !== 'bin') return false
    return expr.op === '·' || expr.op === ':' || hasMulDiv(expr.left) || hasMulDiv(expr.right)
}

export type StepCheck = 'ok' | 'inside-first' | 'muldiv-first' | 'left-first'

export const isMulDiv = (op: HierarchyOp) => op === '·' || op === ':'

/**
 * Whether the operation at `path` can be done now: both sides must already be
 * numbers, and a sum or subtraction waits while its bracket still has products.
 * When it cannot, says what comes first: a bracket, a product or quotient, or
 * the operation on its left.
 */
export function checkStep(expr: Expr, path: ExprPath): StepCheck {
    const node = nodeAt(expr, path)
    if (node.kind !== 'bin') return 'inside-first'
    const sides = [node.left, node.right].filter((side) => side.kind !== 'num')
    if (sides.some((side) => side.kind === 'group')) return 'inside-first'
    if (sides.length > 0) {
        const waitsForProduct = !isMulDiv(node.op) && sides.some((side) => side.kind === 'bin' && isMulDiv(side.op))
        return waitsForProduct ? 'muldiv-first' : 'left-first'
    }
    if (isMulDiv(node.op)) return 'ok'
    const scopeEnd = path.lastIndexOf('i') + 1
    const scope = nodeAt(expr, path.slice(0, scopeEnd))
    return hasMulDiv(scope) ? 'muldiv-first' : 'ok'
}

/** Replaces the operation by its result; a bracket left with a single number disappears */
export function reduceStep(expr: Expr, path: ExprPath): Expr {
    const node = nodeAt(expr, path)
    if (node.kind !== 'bin' || node.left.kind !== 'num' || node.right.kind !== 'num') return expr
    const value = applyOp(node.op, node.left.value, node.right.value)
    const parentPath = path.slice(0, -1)
    const parent = path.length > 0 ? nodeAt(expr, parentPath) : null
    if (parent?.kind === 'group') return replaceAt(expr, parentPath, num(value))
    return replaceAt(expr, path, num(value, path.length > 0))
}

export interface HierarchyState {
    exercise: number
    expr: Expr
    /** Operation chosen and waiting for its result */
    selected: ExprPath | null
    answer: string
    /** Wrong operation choices in this exercise */
    orderMistakes: number
    /** Wrong results or revealed steps in this exercise */
    calcMistakes: number
    feedback: Exclude<StepCheck, 'ok'> | 'wrong-result' | 'unreadable' | null
    /** Finished exercises and the mistakes made in each */
    finished: Record<number, { order: number; calc: number }>
    /** Earlier lines of the calculation, oldest first */
    history: Expr[]
}

export function startExercise(exercises: HierarchyExercise[], exercise: number, finished: HierarchyState['finished'] = {}): HierarchyState {
    const item = exercises.find((entry) => entry.id === exercise) ?? exercises[0]
    return { exercise: item.id, expr: item.expr, selected: null, answer: '', orderMistakes: 0, calcMistakes: 0, feedback: null, finished, history: [] }
}

export function chooseOperation(state: HierarchyState, path: ExprPath): HierarchyState {
    if (state.expr.kind === 'num') return state
    const verdict = checkStep(state.expr, path)
    if (verdict !== 'ok') return { ...state, selected: null, feedback: verdict, orderMistakes: state.orderMistakes + 1 }
    return { ...state, selected: path, answer: '', feedback: null }
}

function finishIfDone(state: HierarchyState): HierarchyState {
    if (state.expr.kind !== 'num') return state
    return { ...state, finished: { ...state.finished, [state.exercise]: { order: state.orderMistakes, calc: state.calcMistakes } } }
}

/**
 * Checks the typed result of the chosen operation; `reveal` does the step for
 * the learner. `normalize` lets a unit read its own way of writing numbers.
 */
export function submitStep(state: HierarchyState, reveal = false, normalize: (input: string) => string = (input) => input): HierarchyState {
    if (!state.selected) return state
    const node = nodeAt(state.expr, state.selected)
    if (node.kind !== 'bin' || node.left.kind !== 'num' || node.right.kind !== 'num') return state
    const expected = applyOp(node.op, node.left.value, node.right.value)
    if (!reveal) {
        const verdict = checkAnswer(normalize(state.answer), fraction(expected))
        if (verdict === 'unreadable') return { ...state, feedback: 'unreadable' }
        if (verdict !== 'correct') return { ...state, feedback: 'wrong-result', calcMistakes: state.calcMistakes + 1 }
    }
    return finishIfDone({
        ...state,
        expr: reduceStep(state.expr, state.selected),
        history: [...state.history, state.expr],
        selected: null,
        answer: '',
        feedback: null,
        calcMistakes: state.calcMistakes + (reveal ? 1 : 0)
    })
}

/** Whether an exercise was finished and its mistakes pass the rule */
export function finishedWith(state: HierarchyState, exercise: number, rule: (mistakes: { order: number; calc: number }) => boolean): boolean {
    const record = state.finished[exercise]
    return record !== undefined && rule(record)
}
