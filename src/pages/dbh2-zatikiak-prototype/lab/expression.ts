import type { LocalizedText } from '../content.ts'
import { add, divide, fraction, multiply, power, subtract, type FractionValue } from '../math/fraction.ts'
import type { LabChallenge } from '../../../features/unit-v2/lab/types.ts'

/* ==========================================================================
   Take the expression apart: the learner taps the operation to do next and
   the expression shrinks to its result. Tapping one that has to wait says
   which rule comes first and, when it can, what the wrong order would give.
   ========================================================================== */

export type ExprOp = '+' | '-' | '·' | ':'

export type ExprToken =
    | { kind: 'num'; value: FractionValue; exponent?: number }
    | { kind: 'op'; op: ExprOp }
    | { kind: 'open' }
    | { kind: 'close'; exponent?: number }

type ExprNode =
    | { type: 'num'; start: number; end: number; value: FractionValue; exponent?: number }
    | { type: 'bin'; start: number; end: number; index: number; op: ExprOp; left: ExprNode; right: ExprNode }
    | { type: 'group'; start: number; end: number; inner: ExprNode; exponent?: number }

const num = (value: FractionValue, exponent?: number): ExprToken => exponent ? { kind: 'num', value, exponent } : { kind: 'num', value }

/**
 * Short notation for the presets: tokens split by spaces, * for the dot,
 * 1/2^2 for the square of a half and ")^2" for the square of a bracket.
 */
export function parseTokens(source: string): ExprToken[] {
    return source.trim().split(/\s+/).map((word): ExprToken => {
        if (word === '(') return { kind: 'open' }
        const close = word.match(/^\)(?:\^(\d+))?$/)
        if (close) return close[1] ? { kind: 'close', exponent: Number(close[1]) } : { kind: 'close' }
        if (word === '+' || word === '-' || word === ':') return { kind: 'op', op: word }
        if (word === '*') return { kind: 'op', op: '·' }
        const number = word.match(/^(-?\d+)(?:\/(\d+))?(?:\^(\d+))?$/)
        if (!number) throw new Error(`Unknown token ${word}`)
        return num(fraction(Number(number[1]), number[2] ? Number(number[2]) : 1), number[3] ? Number(number[3]) : undefined)
    })
}

/** Usual reading: brackets, then · and : from left to right, then + and − from left to right */
function parseTree(tokens: ExprToken[]): ExprNode {
    let position = 0
    const chain = (operators: ExprOp[], next: () => ExprNode) => {
        let node = next()
        for (let token = tokens[position]; token?.kind === 'op' && operators.includes(token.op); token = tokens[position]) {
            const index = position
            position += 1
            const right = next()
            node = { type: 'bin', start: node.start, end: right.end, index, op: token.op, left: node, right }
        }
        return node
    }
    const primary = (): ExprNode => {
        const token = tokens[position]
        if (token?.kind === 'num') {
            position += 1
            return { type: 'num', start: position - 1, end: position - 1, value: token.value, exponent: token.exponent }
        }
        if (token?.kind === 'open') {
            const start = position
            position += 1
            const inner = sum()
            const close = tokens[position]
            if (close?.kind !== 'close') throw new Error('Unclosed bracket')
            position += 1
            return { type: 'group', start, end: position - 1, inner, exponent: close.exponent }
        }
        throw new Error('Expected a number or a bracket')
    }
    const product = () => chain(['·', ':'], primary)
    const sum = (): ExprNode => chain(['+', '-'], product)
    const tree = sum()
    if (position !== tokens.length) throw new Error('Unexpected token')
    return tree
}

function operate(op: ExprOp, left: FractionValue, right: FractionValue): FractionValue {
    switch (op) {
        case '+': return add(left, right)
        case '-': return subtract(left, right)
        case '·': return multiply(left, right)
        case ':': return divide(left, right)
    }
}

function evaluate(node: ExprNode): FractionValue {
    if (node.type === 'bin') return operate(node.op, evaluate(node.left), evaluate(node.right))
    const base = node.type === 'num' ? node.value : evaluate(node.inner)
    return node.exponent ? power(base, node.exponent) : base
}

export const expressionValue = (tokens: ExprToken[]): FractionValue => evaluate(parseTree(tokens))

/** Every operation that can be tapped: the token that shows it, and its node */
function operations(node: ExprNode, list: Array<{ target: number; node: ExprNode }> = []) {
    if (node.type === 'num') {
        if (node.exponent) list.push({ target: node.start, node })
    } else if (node.type === 'group') {
        operations(node.inner, list)
        if (node.exponent) list.push({ target: node.end, node })
    } else {
        operations(node.left, list)
        list.push({ target: node.index, node })
        operations(node.right, list)
    }
    return list
}

const plain = (node: ExprNode) => node.type === 'num' && !node.exponent

/** Ready: an operation between two plain numbers, or the power of a number; a squared bracket waits for its inside */
const isReady = (node: ExprNode) => node.type === 'bin' ? plain(node.left) && plain(node.right) : node.type === 'num'

/** Tokens that can be tapped: operators and exponents */
export const tapTargets = (tokens: ExprToken[]): number[] => tokens.length > 1 || tokens[0]?.kind !== 'num' || tokens[0].exponent ? operations(parseTree(tokens)).map((item) => item.target) : []

/** The operations that can be done now */
export const readyTargets = (tokens: ExprToken[]): number[] => tapTargets(tokens).length === 0
    ? []
    : operations(parseTree(tokens)).filter((item) => isReady(item.node)).map((item) => item.target)

/** A bracket around a single number is no longer needed; its exponent passes to the number */
function dropBrackets(tokens: ExprToken[]): ExprToken[] {
    for (let index = 0; index + 2 < tokens.length; index += 1) {
        const [open, inner, close] = [tokens[index], tokens[index + 1], tokens[index + 2]]
        if (open.kind === 'open' && inner.kind === 'num' && close.kind === 'close' && !(inner.exponent && close.exponent)) {
            return dropBrackets([...tokens.slice(0, index), num(inner.value, inner.exponent ?? close.exponent), ...tokens.slice(index + 3)])
        }
    }
    return tokens
}

const replaceSpan = (tokens: ExprToken[], start: number, end: number, value: FractionValue) =>
    dropBrackets([...tokens.slice(0, start), num(value), ...tokens.slice(end + 1)])

export type ExprMistake = 'parentheses' | 'power' | 'precedence' | 'left-to-right'

const MISTAKE_ORDER: ExprMistake[] = ['parentheses', 'power', 'precedence', 'left-to-right']
const level = (op: ExprOp) => op === '+' || op === '-' ? 0 : 1

/** The rules that say the tapped operation has to wait, in the order they apply */
function mistakesFor(node: ExprNode): ExprMistake[] {
    if (node.type !== 'bin') return ['parentheses']
    const reasons = [node.left, node.right].filter((child) => !plain(child)).map((child): ExprMistake => {
        if (child.type === 'group') return 'parentheses'
        if (child.type === 'num') return 'power'
        return level(child.op) > level(node.op) ? 'precedence' : 'left-to-right'
    })
    return MISTAKE_ORDER.filter((reason) => reasons.includes(reason))
}

/** The final result if the tapped operation were done now with its neighbours; null when it cannot be done */
function wrongOrderResult(tokens: ExprToken[], index: number): FractionValue | null {
    const [left, op, right] = [tokens[index - 1], tokens[index], tokens[index + 1]]
    if (op?.kind !== 'op' || left?.kind !== 'num' || right?.kind !== 'num' || left.exponent || right.exponent) return null
    try {
        return expressionValue(replaceSpan(tokens, index - 1, index + 1, operate(op.op, left.value, right.value)))
    } catch {
        return null
    }
}

export type ExprFeedback =
    | { kind: 'step'; operation: ExprToken[]; result: FractionValue }
    | { kind: 'mistake'; target: number; reasons: ExprMistake[]; wrong: FractionValue | null; focus: number[] }

export interface ExpressionState {
    preset: number
    /** The expression after every step, starting with the original one */
    lines: ExprToken[][]
    mistakes: number
    feedback: ExprFeedback | null
    /** Whether the operations that can be done now are lit up */
    hint: boolean
}

export const EXPRESSION_PRESETS: string[] = [
    '1/2 + 3/4 * 2/9',
    '5/6 - 1/3 + 1/4',
    '2/3 : 4/9 * 1/2',
    '( 1/2 - 1/3 ) * 3 + 1/2^2',
    '3/4 - 1/2 * ( 1/3 + 1/6 )',
    '2 - 3/2 : 3/4 + 1/3',
    '3/4 - -1/2^3 : 1/4',
    '( 2/3 - 1/2 )^2 * 9 - 1/2 * ( 1 - 1/3 )'
]

export function loadExpression(preset: number): ExpressionState {
    const index = Math.min(EXPRESSION_PRESETS.length - 1, Math.max(0, preset))
    return { preset: index, lines: [parseTokens(EXPRESSION_PRESETS[index])], mistakes: 0, feedback: null, hint: false }
}

export const initialExpressionState = loadExpression(0)

export const currentTokens = (state: ExpressionState) => state.lines[state.lines.length - 1]

export const expressionDone = (state: ExpressionState) => tapTargets(currentTokens(state)).length === 0

export function tapExpression(state: ExpressionState, target: number): ExpressionState {
    const tokens = currentTokens(state)
    if (expressionDone(state)) return state
    const tapped = operations(parseTree(tokens)).find((item) => item.target === target)
    if (!tapped) return state
    const { node } = tapped
    if (isReady(node)) {
        const result = evaluate(node)
        const next = replaceSpan(tokens, node.start, node.end, result)
        return { ...state, lines: [...state.lines, next], feedback: { kind: 'step', operation: tokens.slice(node.start, node.end + 1), result }, hint: false }
    }
    const blockers = node.type === 'bin' ? [node.left, node.right].filter((child) => !plain(child)) : node.type === 'group' ? [node.inner] : []
    const focus = blockers.flatMap((child) => operations(child).filter((item) => isReady(item.node)).map((item) => item.target))
    return {
        ...state,
        mistakes: state.mistakes + 1,
        feedback: { kind: 'mistake', target, reasons: mistakesFor(node), wrong: node.type === 'bin' ? wrongOrderResult(tokens, node.index) : null, focus }
    }
}

export const toggleExpressionHint = (state: ExpressionState): ExpressionState => ({ ...state, hint: !state.hint })

/* ---------- Writing it ---------- */

/** A number in LaTeX; brackets when asked for (a negative after an operator, or a power base) */
export function numberLatex(value: FractionValue, bracketed = false): string {
    const absolute = Math.abs(value.numerator)
    const body = `${value.numerator < 0 ? '-' : ''}${value.denominator === 1 ? absolute : `\\frac{${absolute}}{${value.denominator}}`}`
    return bracketed ? `\\left(${body}\\right)` : body
}

/** Whether a number token is written in brackets: the base of a power that is negative or a fraction, or a negative after an operator */
export function needsBrackets(token: Extract<ExprToken, { kind: 'num' }>, previous: ExprToken | undefined): boolean {
    const negative = token.value.numerator < 0
    if (token.exponent) return negative || token.value.denominator !== 1
    return negative && previous !== undefined && previous.kind !== 'open'
}

export const opLatex: Record<ExprOp, string> = { '+': '+', '-': '-', '·': '\\cdot ', ':': '\\div ' }

export function expressionLatex(tokens: ExprToken[]): string {
    return tokens.map((token, index) => {
        switch (token.kind) {
            case 'num':
                return `${numberLatex(token.value, needsBrackets(token, tokens[index - 1]))}${token.exponent ? `^{${token.exponent}}` : ''}`
            case 'op':
                return opLatex[token.op]
            case 'open':
                return '\\left('
            case 'close':
                return `\\right)${token.exponent ? `^{${token.exponent}}` : ''}`
        }
    }).join('')
}

/* ---------- Challenges ---------- */

const presetLatex = (preset: number) => expressionLatex(parseTokens(EXPRESSION_PRESETS[preset]))

const calculate = (preset: number): LocalizedText => ({
    eu: `Kalkulatu $${presetLatex(preset)}$ urratsez urrats, akatsik gabe.`,
    es: `Calcula $${presetLatex(preset)}$ paso a paso, sin ningún error.`,
    en: `Calculate $${presetLatex(preset)}$ step by step, without any mistakes.`,
    ar: `احسب $${presetLatex(preset)}$ خطوة بخطوة من دون أي خطأ.`
})

const cleanRun = (state: ExpressionState, preset: number) => state.preset === preset && expressionDone(state) && state.mistakes === 0

export const expressionChallenges: LabChallenge<ExpressionState>[] = [
    {
        id: 1601,
        prompt: calculate(0),
        hint: { eu: '1. adierazpena da. Biderketa batuketaren aurretik egiten da.', es: 'Es la expresión 1. La multiplicación se hace antes que la suma.', en: 'This is expression 1. Multiplication is done before addition.', ar: 'إنها العبارة 1. الضرب يسبق الجمع.' },
        isSolved: (state) => cleanRun(state, 0)
    },
    {
        id: 1602,
        prompt: calculate(1),
        hint: { eu: '2. adierazpena da. Batuketak eta kenketak ezkerretik eskuinera egiten dira.', es: 'Es la expresión 2. Las sumas y las restas se hacen de izquierda a derecha.', en: 'This is expression 2. Additions and subtractions are done from left to right.', ar: 'إنها العبارة 2. الجمع والطرح من اليسار إلى اليمين.' },
        isSolved: (state) => cleanRun(state, 1)
    },
    {
        id: 1603,
        prompt: calculate(3),
        hint: { eu: '4. adierazpena da. Lehenik parentesia eta berretura; gero biderketa; azkenik batuketa.', es: 'Es la expresión 4. Primero el paréntesis y la potencia; después el producto; al final la suma.', en: 'This is expression 4. First the brackets and the power; then the multiplication; finally the addition.', ar: 'إنها العبارة 4. أولًا القوسان والقوة، ثم الضرب، وأخيرًا الجمع.' },
        isSolved: (state) => cleanRun(state, 3)
    },
    {
        id: 1604,
        prompt: calculate(6),
        hint: { eu: '7. adierazpena da. Berretzaile bakoitiak zeinu negatiboa mantentzen du; gero zatiketa eta azkenik kenketa.', es: 'Es la expresión 7. Un exponente impar mantiene el signo negativo; después la división y al final la resta.', en: 'This is expression 7. An odd exponent keeps the negative sign; then the division; finally the subtraction.', ar: 'إنها العبارة 7. الأس الفردي يُبقي الإشارة السالبة، ثم القسمة، وأخيرًا الطرح.' },
        isSolved: (state) => cleanRun(state, 6)
    }
]
