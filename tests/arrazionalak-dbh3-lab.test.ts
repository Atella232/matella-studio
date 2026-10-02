import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { equals, fraction } from '../src/features/unit-v2/math/fraction.ts'
import type { LabChallenge } from '../src/features/unit-v2/lab/types.ts'
import {
    initialCompareState,
    initialEquivalenceState,
    initialNumberLineState,
    initialProductState,
    initialSumState,
    moveNumberLinePoint,
    setCompareFraction,
    setNumberLineDenominator,
    setNumberLineRange,
    setProductOp,
    setProductOperand,
    setSumOp,
    setSumOperand
} from '../src/pages/dbh2-zatikiak-prototype/lab/labTools.ts'
import { chooseExpression, evaluate, expressionLatex, hierarchyExpressions, initialHierarchyState, isReady, operationIds, pickOperation, type HierarchyState } from '../src/pages/dbh3-arrazionalak/lab/hierarchy.ts'
import {
    hierarchyChallenges,
    hierarchyValues,
    rationalsCompareChallenges,
    rationalsEquivalenceChallenges,
    rationalsLabChallengeIds,
    rationalsLabToolForTopic,
    rationalsLabTools,
    rationalsNumberLineChallenges,
    rationalsProductChallenges,
    rationalsSumChallenges
} from '../src/pages/dbh3-arrazionalak/lab/labTools.ts'

// lessons.tsx holds JSX, which node cannot load: the topic ids, in order
const topics = ['rational-meaning', 'equivalent', 'simplify', 'compare', 'line', 'between', 'add-sub', 'mul-div', 'combined', 'decimal-kinds', 'exact-generatrix', 'periodic-generatrix', 'fraction-of', 'remaining', 'whole-from-part']
const solved = <State,>(challenges: LabChallenge<State>[], state: State) => challenges.filter((challenge) => challenge.isSolved(state)).map((challenge) => challenge.id)

/** Does every ready operation in turn, always the first one that can be done: a run without mistakes */
function solveCleanly(state: HierarchyState): HierarchyState {
    let next = state
    while (next.tree.kind !== 'number') next = pickOperation(next, operationIds(next.tree).find((id) => isReady(next.tree, id))!)
    return next
}

test('arrazionalak 3. DBH lab: tools, topics and challenge ids', () => {
    assert.equal(rationalsLabTools.length, 8)
    for (const tool of rationalsLabTools) assert.ok(topics.includes(tool.lessonTopic), tool.id)
    for (const topic of topics) assert.ok(rationalsLabToolForTopic[topic], topic)
    assert.equal(new Set(rationalsLabChallengeIds).size, rationalsLabChallengeIds.length)
    const own = [...rationalsNumberLineChallenges, ...rationalsEquivalenceChallenges, ...rationalsCompareChallenges, ...rationalsSumChallenges, ...rationalsProductChallenges, ...hierarchyChallenges] as Array<LabChallenge<unknown>>
    for (const challenge of own) {
        for (const language of ['eu', 'es', 'ar'] as const) {
            for (const text of [challenge.prompt[language], challenge.hint[language]]) {
                for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true, strict: 'error' })
                if (language === 'ar') assert.ok(!text.includes('{,}'), text)
            }
        }
    }
})

test('arrazionalak 3. DBH lab: the order of operations', () => {
    // 3/2 − 4/5 · 5/6, (3/2 − 4/5) · 5/6, 5/3 : (1/9 + 1/6), 2/7 · (1/4 − 3/5) + 1, 4/7 + (−12/5) : (−3/4)
    const expected = [fraction(5, 6), fraction(7, 12), fraction(6), fraction(9, 10), fraction(132, 35)]
    hierarchyValues.forEach((value, index) => assert.ok(equals(value, expected[index]), `${index}`))
    assert.ok(equals(evaluate(hierarchyExpressions[3]), fraction(9, 10)))
    assert.equal(expressionLatex(hierarchyExpressions[1]), '\\left(\\frac{3}{2}-\\frac{4}{5}\\right)\\cdot \\frac{5}{6}')
    for (const expression of hierarchyExpressions) katex.renderToString(expressionLatex(expression), { throwOnError: true })
    // The subtraction of 3/2 − 4/5 · 5/6 waits for the product
    const [minus, times] = operationIds(hierarchyExpressions[0])
    assert.ok(!isReady(hierarchyExpressions[0], minus) && isReady(hierarchyExpressions[0], times))
    const early = pickOperation(initialHierarchyState, minus)
    assert.equal(early.mistakes, 1)
    assert.equal(early.miss, minus)
    assert.equal(early.tree, initialHierarchyState.tree)
    // Finished with a mistake: not clean; finished without: clean
    assert.deepEqual(solveCleanly(early).clean, [])
    let state = solveCleanly(initialHierarchyState)
    assert.deepEqual(state.clean, [0])
    assert.ok(state.tree.kind === 'number' && equals(state.tree.value, fraction(5, 6)))
    assert.deepEqual(solved(hierarchyChallenges, state), [31601])
    for (const expression of [1, 2, 4]) state = solveCleanly(chooseExpression(state, expression))
    assert.deepEqual(solved(hierarchyChallenges, state), [31601, 31602, 31603, 31604])
})

test('arrazionalak 3. DBH lab: the fractions tools reach every challenge', () => {
    const line = setNumberLineRange(initialNumberLineState, '-2-2')
    assert.ok(solved(rationalsNumberLineChallenges, moveNumberLinePoint(setNumberLineDenominator(line, 4), -7)).includes(31101))
    assert.ok(solved(rationalsNumberLineChallenges, moveNumberLinePoint(setNumberLineDenominator(setNumberLineRange(initialNumberLineState, '0-3'), 6), 17)).includes(31102))
    assert.ok(solved(rationalsNumberLineChallenges, moveNumberLinePoint(setNumberLineDenominator(line, 12), -5)).includes(31103))
    assert.ok(solved(rationalsNumberLineChallenges, moveNumberLinePoint(setNumberLineDenominator(line, 4), -5)).includes(31104))

    assert.ok(solved(rationalsEquivalenceChallenges, { ...initialEquivalenceState, numerator: 5, denominator: 6, mode: 'amplify', factor: 5 }).includes(31201))
    assert.ok(solved(rationalsEquivalenceChallenges, { ...initialEquivalenceState, numerator: 8, denominator: 12, mode: 'simplify', divisor: 4 }).includes(31202))
    assert.ok(solved(rationalsEquivalenceChallenges, { ...initialEquivalenceState, numerator: 9, denominator: 12, mode: 'simplify', divisor: 3 }).includes(31203))
    assert.ok(solved(rationalsEquivalenceChallenges, { ...initialEquivalenceState, numerator: 2, denominator: 3, mode: 'amplify', factor: 6 }).includes(31204))

    const pair = (a: [number, number], b: [number, number]) => setCompareFraction(setCompareFraction(initialCompareState, 'first', ...a), 'second', ...b)
    assert.ok(solved(rationalsCompareChallenges, { ...pair([5, 9], [4, 7]), strategy: 'cross', guess: '<' }).includes(31301))
    assert.ok(!solved(rationalsCompareChallenges, { ...pair([5, 9], [4, 7]), strategy: 'cross', guess: '>' }).includes(31301))
    assert.ok(solved(rationalsCompareChallenges, { ...pair([7, 12], [3, 5]), strategy: 'common', guess: '<' }).includes(31302))
    assert.ok(solved(rationalsCompareChallenges, { ...pair([3, 4], [3, 7]), guess: '>' }).includes(31303))

    const sum = (op: 'add' | 'subtract', a: [number, number], b: [number, number], answer: string) => ({ ...setSumOp(setSumOperand(setSumOperand(initialSumState, 'first', ...a), 'second', ...b), op), answer, checked: true })
    assert.ok(solved(rationalsSumChallenges, sum('subtract', [5, 6], [3, 4], '1/12')).includes(31401))
    assert.ok(solved(rationalsSumChallenges, sum('add', [2, 9], [5, 12], '23/36')).includes(31402))
    assert.ok(solved(rationalsSumChallenges, sum('subtract', [1, 4], [2, 3], '-5/12')).includes(31403))
    assert.ok(!solved(rationalsSumChallenges, sum('subtract', [1, 4], [2, 3], '5/12')).includes(31403))

    const product = (op: 'multiply' | 'divide', a: [number, number], b: [number, number], answer: string) => ({ ...setProductOp(setProductOperand(setProductOperand(initialProductState, 'first', ...a), 'second', ...b), op), answer, checked: true })
    assert.ok(solved(rationalsProductChallenges, product('multiply', [4, 5], [5, 8], '1/2')).includes(31501))
    assert.ok(!solved(rationalsProductChallenges, product('multiply', [4, 5], [5, 8], '20/40')).includes(31501))
    assert.ok(solved(rationalsProductChallenges, product('divide', [3, 4], [9, 10], '5/6')).includes(31502))
    assert.ok(solved(rationalsProductChallenges, product('divide', [3, 4], [3, 8], '2')).includes(31503))
})
