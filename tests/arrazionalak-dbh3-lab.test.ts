import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { equals, fraction, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { betweenCount, initialMagnifierState, magnifierChallenges, magnifierExtra, magnifierGrid, magnifierPrediction, pickedValue, pickMark, setMagnifier, type MagnifierState } from '../src/pages/dbh3-arrazionalak/lab/magnifier.ts'
import { initialMachineState, MACHINE_DECIMALS, machineChallenges, machineExtra, machineFraction, machineGivesValue, machinePrediction, setMachine, strip, tailsCancel, type MachineState } from '../src/pages/dbh3-arrazionalak/lab/machine.ts'
import { initialRemainingState, remainingChallenges, remainingExtra, remainingMistake, remainingPart, remainingPrediction, setRemaining, type RemainingState } from '../src/pages/dbh3-arrazionalak/lab/remaining.ts'
import { initialWholeState, piece, setWhole, wholeChallenges, wholeExtra, wholeMistake, wholeOf, wholePrediction, type WholeState } from '../src/pages/dbh3-arrazionalak/lab/whole.ts'
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
    assert.equal(rationalsLabTools.length, 12)
    for (const tool of rationalsLabTools) assert.ok(topics.includes(tool.lessonTopic), tool.id)
    for (const topic of topics) assert.ok(rationalsLabToolForTopic[topic], topic)
    assert.equal(new Set(rationalsLabChallengeIds).size, rationalsLabChallengeIds.length)
    const own = [...rationalsNumberLineChallenges, ...rationalsEquivalenceChallenges, ...rationalsCompareChallenges, ...rationalsSumChallenges, ...rationalsProductChallenges, ...hierarchyChallenges] as Array<LabChallenge<unknown>>
    for (const challenge of own) {
        for (const language of ['eu', 'es', 'en', 'ar'] as const) {
            for (const text of [challenge.prompt[language], challenge.hint[language]]) {
                for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
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

/* ---------- The four tools of this unit ---------- */

const languages = ['eu', 'es', 'en', 'ar'] as const

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[\u0600-\u06FF]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        // No Basque suffix glued to a number or to a formula
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/\$(?:ri|ren|rekin|z|ra|tik|ei)(?![a-zA-Z])/.test(text.eu), text.eu)
    }
}

function checkChallenges<State>(challenges: LabChallenge<State>[], initial: State, solutions: Record<number, State>) {
    assert.equal(new Set(challenges.map((challenge) => challenge.id)).size, challenges.length)
    for (const challenge of challenges) {
        assert.ok(challenge.isSolved(solutions[challenge.id]), `${challenge.id} is not solved by its solution`)
        assert.ok(!challenge.isSolved(initial), `${challenge.id} starts solved`)
    }
    checkTexts(challenges.flatMap((challenge) => [challenge.prompt, challenge.hint]))
}

function checkExtras<State>(maker: LabChallengeMaker<State>, initial: State, minimum = 6) {
    const prompts = new Set<string>()
    for (let seed = 1; seed <= 150; seed += 1) {
        const challenge = maker(createRandom(seed * 7919 + 3))
        assert.ok(challenge.isSolved(challenge.solution), `seed ${seed}: ${challenge.prompt.es}`)
        assert.ok(!challenge.isSolved(initial), `seed ${seed} starts solved`)
        checkTexts([challenge.prompt, challenge.hint])
        prompts.add(challenge.prompt.es)
    }
    assert.ok(prompts.size >= minimum, `only ${prompts.size} different challenges`)
}

test('arrazionalak 3. DBH lab: the own tools have their own ids and plain observations', () => {
    const own = [magnifierChallenges, machineChallenges, remainingChallenges, wholeChallenges].flatMap((list) => list.map((challenge) => challenge.id))
    for (const id of own) assert.ok((id >= 31701 && id <= 31999) || (id >= 33701 && id <= 33799), `${id}`)
    for (const id of ['magnifier', 'machine', 'remaining', 'whole']) {
        const tool = rationalsLabTools.find((item) => item.id === id)!
        for (const language of languages) assert.ok(tool.title[language].length > 0 && !tool.observe[language].includes('$'), `${id} ${language}`)
    }
    assert.equal(rationalsLabToolForTopic.between, 'magnifier')
    assert.equal(rationalsLabToolForTopic['periodic-generatrix'], 'machine')
})

test('arrazionalak 3. DBH lab: la lupa en la recta', () => {
    const at = (a: number, b: number, c: number, d: number, k: number, pick = 0): MagnifierState => pickMark(setMagnifier(initialMagnifierState, { firstNumerator: a, firstDenominator: b, secondNumerator: c, secondDenominator: d, k }), pick)
    // Between 1/3 and 1/2: none over 6, one over 12, two over 18
    assert.equal(betweenCount(initialMagnifierState), 0)
    assert.equal(magnifierPrediction(initialMagnifierState), '<')
    assert.equal(betweenCount(at(1, 3, 1, 2, 2)), 1)
    assert.equal(magnifierPrediction(at(1, 3, 1, 2, 2)), '=')
    assert.equal(betweenCount(at(1, 3, 1, 2, 3)), 2)
    assert.ok(equals(pickedValue(at(1, 3, 1, 2, 2, 1))!, fraction(5, 12)))
    // The order of the two does not matter, and negatives work
    assert.deepEqual(magnifierGrid(at(-1, 3, -1, 2, 1)), { denominator: 6, low: -3, high: -2, firstTop: -2, secondTop: -3 })
    // Every mark picked lies strictly between
    for (let k = 1; k <= 10; k += 1) {
        const state = at(-3, 4, 2, 5, k)
        for (let pick = 1; pick <= betweenCount(state); pick += 1) {
            const value = toNumber(pickedValue(pickMark(state, pick))!)
            assert.ok(value > -0.75 && value < 0.4)
        }
    }
    // A new fraction forgets the guess and the mark
    const guessed = { ...at(1, 3, 1, 2, 2, 1), prediction: '=' as const }
    assert.deepEqual([setMagnifier(guessed, { k: 3 }).pick, setMagnifier(guessed, { k: 3 }).prediction], [0, null])
    checkChallenges(magnifierChallenges, initialMagnifierState, { 31701: at(1, 3, 1, 2, 2, 1), 31702: at(-1, 2, -1, 3, 2, 1), 31703: at(2, 5, 3, 5, 5), 31704: at(3, 4, 4, 5, 2, 1), 31705: at(3, 10, 1, 3, 2, 1) })
    checkExtras(magnifierExtra, initialMagnifierState)
})

test('arrazionalak 3. DBH lab: lo que queda', () => {
    const at = (a: number, b: number, c: number, d: number): RemainingState => setRemaining(initialRemainingState, { firstNumerator: a, firstDenominator: b, secondNumerator: c, secondDenominator: d })
    const guessed = (state: RemainingState): RemainingState => ({ ...state, prediction: remainingPrediction(state) })
    assert.ok(equals(remainingPart(at(2, 5, 1, 3)), fraction(2, 5)))
    assert.ok(equals(remainingMistake(at(2, 5, 1, 3)), fraction(4, 15)))
    assert.ok(equals(remainingPart(initialRemainingState), fraction(3, 8)))
    assert.equal(remainingPrediction(at(1, 4, 1, 3)), '=')
    assert.equal(remainingPrediction(at(1, 5, 1, 8)), '>')
    // A cut always takes something and leaves something
    assert.deepEqual(at(9, 4, 0, 3).first, { numerator: 3, denominator: 4 })
    assert.deepEqual(at(9, 4, 0, 3).second, { numerator: 1, denominator: 3 })
    for (let b = 2; b <= 8; b += 1) for (let a = 1; a < b; a += 1) for (let d = 2; d <= 8; d += 1) for (let c = 1; c < d; c += 1) {
        const state = at(a, b, c, d)
        assert.ok(Math.abs(toNumber(remainingPart(state)) - ((b - a) * (d - c)) / (b * d)) < 1e-12)
    }
    checkChallenges(remainingChallenges, initialRemainingState, { 31801: guessed(at(2, 5, 1, 3)), 31802: at(1, 4, 1, 3), 31803: at(1, 2, 2, 3), 31804: guessed(at(1, 3, 1, 2)), 31805: at(2, 5, 1, 2) })
    checkExtras(remainingExtra, initialRemainingState)
})

test('arrazionalak 3. DBH lab: la máquina de la generatriz', () => {
    const at = (decimal: number, m: number, n: number): MachineState => setMachine(initialMachineState, { decimal, m, n })
    assert.deepEqual(strip(fraction(1, 6), 2), { whole: 16, tail: '666666666666' })
    assert.deepEqual(strip(fraction(47, 20), 1), { whole: 23, tail: '500000000000' })
    assert.equal(tailsCancel(initialMachineState), false)
    assert.equal(machinePrediction(at(0, 1, 0)), '=')
    assert.equal(machinePrediction(at(2, 1, 0)), '>')
    assert.equal(machinePrediction(at(3, 1, 0)), '<')
    assert.ok(equals(machineFraction(at(2, 2, 1))!, fraction(1, 6)))
    assert.ok(equals(machineFraction(at(4, 3, 2))!, fraction(1, 12)))
    assert.equal(machineFraction(at(2, 2, 0)), null)
    // Whenever the tails cancel, the machine gives the decimal's own fraction
    for (let decimal = 0; decimal < MACHINE_DECIMALS.length; decimal += 1) {
        let found = 0
        for (let m = 1; m <= 4; m += 1) for (let n = -1; n <= 3; n += 1) {
            const state = at(decimal, m, n)
            if (tailsCancel(state)) { found += 1; assert.ok(machineGivesValue(state), `${decimal} ${m} ${n}`) }
        }
        assert.ok(found > 0, `${decimal}`)
    }
    // A new decimal forgets the guess; new strips keep it
    const guessed = { ...at(2, 2, 1), prediction: '>' as const }
    assert.equal(setMachine(guessed, { m: 3 }).prediction, '>')
    assert.equal(setMachine(guessed, { decimal: 1 }).prediction, null)
    checkChallenges(machineChallenges, initialMachineState, { 31901: at(0, 1, 0), 31902: at(1, 2, 0), 31903: at(2, 2, 1), 31904: at(3, 2, -1), 31905: at(2, 3, 2) })
    checkExtras(machineExtra, initialMachineState)
})

test('arrazionalak 3. DBH lab: del trozo al todo', () => {
    const at = (a: number, b: number, part: number): WholeState => setWhole(initialWholeState, { numerator: a, denominator: b, part })
    const guessed = (state: WholeState): WholeState => ({ ...state, prediction: wholePrediction(state) })
    assert.ok(equals(wholeOf(at(3, 8, 24)), fraction(64)))
    assert.ok(equals(piece(at(3, 8, 24)), fraction(8)))
    assert.ok(equals(wholeMistake(at(3, 8, 24)), fraction(9)))
    assert.equal(wholePrediction(at(3, 8, 24)), '>')
    assert.equal(wholePrediction(at(2, 3, 16)), '<')
    assert.equal(wholePrediction(at(3, 6, 5)), '=')
    // The numerator never reaches the denominator
    assert.equal(at(9, 4, 10).numerator, 3)
    checkChallenges(wholeChallenges, initialWholeState, { 33701: guessed(at(3, 8, 24)), 33702: guessed(at(2, 3, 16)), 33703: at(3, 5, 30), 33704: at(1, 5, 12), 33705: at(3, 6, 7) })
    checkExtras(wholeExtra, initialWholeState)
})
