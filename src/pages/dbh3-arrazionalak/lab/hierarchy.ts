import { add, divide, fraction, multiply, subtract, toLatex, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'

/* ==========================================================================
   Zenbaki arrazionalak (3. DBH) — the order of operations, step by step.
   An expression is a tree whose shape already follows the rules (brackets
   first, then products and quotients, then sums and differences, left to
   right). The learner picks an operation sign: it can be done only when
   both its operands are already numbers. Doing it replaces it by its value.
   ========================================================================== */

export type Operator = '+' | '-' | '·' | ':'

export type ExpressionNode =
    | { kind: 'number'; value: FractionValue }
    | { kind: 'operation'; id: number; op: Operator; left: ExpressionNode; right: ExpressionNode; brackets?: boolean }

const n = (numerator: number, denominator = 1): ExpressionNode => ({ kind: 'number', value: fraction(numerator, denominator) })
let nextId = 0
const op = (operator: Operator, left: ExpressionNode, right: ExpressionNode, brackets = false): ExpressionNode => ({ kind: 'operation', id: (nextId += 1), op: operator, left, right, brackets })

/** The textbook expressions (Santillana 3.º ESO, unit 1) */
export const hierarchyExpressions: ExpressionNode[] = [
    // 3/2 − 4/5 · 5/6 = 5/6
    op('-', n(3, 2), op('·', n(4, 5), n(5, 6))),
    // (3/2 − 4/5) · 5/6 = 7/12
    op('·', op('-', n(3, 2), n(4, 5), true), n(5, 6)),
    // 5/3 : (1/9 + 1/6) = 6
    op(':', n(5, 3), op('+', n(1, 9), n(1, 6), true)),
    // 2/7 · (1/4 − 3/5) + 1 = 9/10
    op('+', op('·', n(2, 7), op('-', n(1, 4), n(3, 5), true)), n(1)),
    // 4/7 + (−12/5) : (−3/4) = 132/35
    op('+', n(4, 7), op(':', n(-12, 5), n(-3, 4)))
]

/** The value of a whole expression */
export function evaluate(node: ExpressionNode): FractionValue {
    if (node.kind === 'number') return node.value
    const left = evaluate(node.left)
    const right = evaluate(node.right)
    switch (node.op) {
        case '+': return add(left, right)
        case '-': return subtract(left, right)
        case '·': return multiply(left, right)
        case ':': return divide(left, right)
    }
}

/** An operation can be done when both operands are numbers */
export function isReady(node: ExpressionNode, id: number): boolean {
    if (node.kind === 'number') return false
    if (node.id === id) return node.left.kind === 'number' && node.right.kind === 'number'
    return isReady(node.left, id) || isReady(node.right, id)
}

/** Does the operation with this id, if it is ready; otherwise returns the same tree */
export function reduce(node: ExpressionNode, id: number): ExpressionNode {
    if (node.kind === 'number') return node
    if (node.id === id) return node.left.kind === 'number' && node.right.kind === 'number' ? { kind: 'number', value: evaluate(node) } : node
    return { ...node, left: reduce(node.left, id), right: reduce(node.right, id) }
}

/** Every operation still to do */
export function operationIds(node: ExpressionNode): number[] {
    return node.kind === 'number' ? [] : [...operationIds(node.left), node.id, ...operationIds(node.right)]
}

export type Token = { kind: 'number'; latex: string } | { kind: 'op'; id: number; op: Operator } | { kind: 'bracket'; open: boolean }

/** The expression written left to right; negative numbers inside an operation go in brackets */
export function tokens(node: ExpressionNode, inside = false): Token[] {
    if (node.kind === 'number') {
        const latex = toLatex(node.value)
        return inside && node.value.numerator < 0 ? [{ kind: 'bracket', open: true }, { kind: 'number', latex }, { kind: 'bracket', open: false }] : [{ kind: 'number', latex }]
    }
    const body: Token[] = [...tokens(node.left, true), { kind: 'op', id: node.id, op: node.op }, ...tokens(node.right, true)]
    return node.brackets ? [{ kind: 'bracket', open: true }, ...body, { kind: 'bracket', open: false }] : body
}

/** The expression as LaTeX */
export function expressionLatex(node: ExpressionNode): string {
    const symbol = { '+': '+', '-': '-', '·': '\\cdot ', ':': '\\mathbin{:}' }
    return tokens(node).map((token) => (token.kind === 'number' ? token.latex : token.kind === 'op' ? symbol[token.op] : token.open ? '\\left(' : '\\right)')).join('')
}

/* ---------- The tool's state ---------- */

export interface HierarchyState {
    expression: number
    tree: ExpressionNode
    /** Signs picked too early in this run */
    mistakes: number
    /** The last sign picked too early, to show it in red */
    miss: number | null
    /** Expressions finished without a single mistake */
    clean: number[]
}

export const initialHierarchyState: HierarchyState = { expression: 0, tree: hierarchyExpressions[0], mistakes: 0, miss: null, clean: [] }

export function chooseExpression(state: HierarchyState, expression: number): HierarchyState {
    const index = Math.min(hierarchyExpressions.length - 1, Math.max(0, expression))
    return { ...state, expression: index, tree: hierarchyExpressions[index], mistakes: 0, miss: null }
}

export function pickOperation(state: HierarchyState, id: number): HierarchyState {
    if (state.tree.kind === 'number') return state
    if (!isReady(state.tree, id)) return { ...state, mistakes: state.mistakes + 1, miss: id }
    const tree = reduce(state.tree, id)
    const finished = tree.kind === 'number'
    const clean = finished && state.mistakes === 0 && !state.clean.includes(state.expression) ? [...state.clean, state.expression] : state.clean
    return { ...state, tree, miss: null, clean }
}

export const isFinished = (state: HierarchyState) => state.tree.kind === 'number'
