import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import {
    choose,
    chooseChallenges,
    combinatoricsAkLabChallengeIds,
    combinatoricsAkLabToolForTopic,
    combinatoricsAkLabTools,
    factorial,
    factorialChallenges,
    factorialQuotient,
    gridChallenges,
    gridPaths,
    initialChooseState,
    initialFactorialState,
    initialGridState,
    initialLettersState,
    initialPascalState,
    initialSlotsState,
    initialTreeState,
    lettersChallenges,
    lettersOrders,
    pascalChallenges,
    setChoose,
    setFactorial,
    setGrid,
    setLetters,
    setPascal,
    setSlots,
    setTree,
    slotOptions,
    slotsChallenges,
    slotsCount,
    treeChallenges,
    treeLeaves,
    type ChooseState,
    type FactorialState,
    type GridState,
    type LettersState,
    type PascalState,
    type SlotsState,
    type TreeState
} from '../src/pages/dbh4-akademikoak-konbinatoria/lab/labTools.ts'

const topics = ['tree', 'product', 'factorial', 'with-repetition', 'variations', 'conditions', 'permutations', 'restricted', 'repeated', 'combinations', 'binomial', 'pascal', 'which-model', 'geometry', 'committees']
const stages = ['counting', 'variations', 'permutations', 'combinations', 'problems']
const solvedIds = <State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, state: State) => challenges.filter((challenge) => challenge.isSolved(state)).map((challenge) => challenge.id)
/** Each challenge is solved by its own solution, and the starting state solves none */
function checkChallenges<State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, solutions: State[], start: State) {
    assert.equal(solutions.length, challenges.length)
    solutions.forEach((state, index) => assert.ok(solvedIds(challenges, state).includes(challenges[index].id), `${challenges[index].id}`))
    assert.deepEqual(solvedIds(challenges, start), [])
}

test('konbinatoria 4. DBH ak lab: tools, topics and challenge ids', () => {
    assert.equal(combinatoricsAkLabTools.length, 7)
    for (const tool of combinatoricsAkLabTools) {
        assert.ok(stages.includes(tool.stage), tool.id)
        assert.ok(topics.includes(tool.lessonTopic), tool.id)
        assert.ok(!tool.observe.es.includes('$'), tool.id)
    }
    for (const stage of stages) assert.ok(combinatoricsAkLabTools.some((tool) => tool.stage === stage), stage)
    for (const topic of topics) assert.ok(combinatoricsAkLabTools.some((tool) => tool.id === combinatoricsAkLabToolForTopic[topic]), topic)
    assert.equal(new Set(combinatoricsAkLabChallengeIds).size, combinatoricsAkLabChallengeIds.length)
    for (const id of combinatoricsAkLabChallengeIds) assert.ok(id >= 83101 && id < 83800, `${id}`)
    for (const challenges of [treeChallenges, factorialChallenges, slotsChallenges, lettersChallenges, chooseChallenges, pascalChallenges, gridChallenges] as Array<Array<{ id: number; prompt: Record<string, string>; hint: Record<string, string> }>>) {
        for (const challenge of challenges) {
            for (const language of ['eu', 'es', 'ar']) {
                for (const text of [challenge.prompt[language], challenge.hint[language]]) {
                    for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
                        katex.renderToString(formula, { throwOnError: true })
                        assert.ok(!/[؀-ۿ]/.test(formula), `${challenge.id} ${formula}`)
                    }
                }
            }
        }
    }
})

test('konbinatoria 4. DBH ak lab: the tree', () => {
    assert.equal(treeLeaves(initialTreeState), 6)
    assert.equal(treeLeaves({ levels: 3, branches: [4, 4, 4] }), 64)
    assert.deepEqual(setTree(initialTreeState, { levels: 9 }).levels, 3)
    assert.equal(setTree(initialTreeState, { index: 1, branches: 0 }).branches[1], 1)
    const solutions: TreeState[] = [{ levels: 2, branches: [3, 4, 2] }, { levels: 3, branches: [2, 3, 4] }, { levels: 3, branches: [2, 2, 2] }]
    checkChallenges(treeChallenges, solutions, initialTreeState)
})

test('konbinatoria 4. DBH ak lab: factorials', () => {
    assert.deepEqual(factorialQuotient(initialFactorialState), { numerator: 336, denominator: 1 })
    assert.deepEqual(factorialQuotient({ top: 5, bottom: 7 }), { numerator: 1, denominator: 42 })
    assert.deepEqual(factorialQuotient({ top: 0, bottom: 0 }), { numerator: 1, denominator: 1 })
    for (let a = 0; a <= 12; a += 1) for (let b = 0; b <= a; b += 1) assert.equal(factorialQuotient({ top: a, bottom: b }).numerator, factorial(a) / factorial(b))
    assert.equal(setFactorial(initialFactorialState, { top: 20 }).top, 12)
    const solutions: FactorialState[] = [{ top: 9, bottom: 7 }, { top: 10, bottom: 7 }, { top: 6, bottom: 4 }]
    checkChallenges(factorialChallenges, solutions, initialFactorialState)
})

test('konbinatoria 4. DBH ak lab: slots', () => {
    assert.deepEqual(slotOptions(initialSlotsState), [5, 4, 3])
    assert.equal(slotsCount(initialSlotsState), 60)
    for (let n = 1; n <= 10; n += 1) {
        for (let k = 1; k <= 6; k += 1) {
            assert.equal(slotsCount({ elements: n, slots: k, repeat: true }), n ** k)
            assert.equal(slotsCount({ elements: n, slots: k, repeat: false }), k > n ? 0 : factorial(n) / factorial(n - k))
        }
    }
    assert.equal(setSlots(initialSlotsState, { slots: 9 }).slots, 6)
    const solutions: SlotsState[] = [{ elements: 6, slots: 3, repeat: false }, { elements: 4, slots: 3, repeat: true }, { elements: 3, slots: 5, repeat: false }]
    checkChallenges(slotsChallenges, solutions, initialSlotsState)
})

test('konbinatoria 4. DBH ak lab: orders of letters', () => {
    assert.equal(lettersOrders(initialLettersState), 6)
    assert.equal(lettersOrders({ counts: [2, 2, 0, 0] }), 6)
    assert.equal(lettersOrders({ counts: [3, 2, 1, 0] }), 60)
    assert.equal(lettersOrders({ counts: [4, 4, 4, 4] }), factorial(16) / factorial(4) ** 4)
    assert.equal(setLetters(initialLettersState, 0, 9).counts[0], 4)
    const solutions: LettersState[] = [{ counts: [1, 1, 1, 1] }, { counts: [2, 2, 0, 0] }, { counts: [3, 2, 1, 0] }]
    checkChallenges(lettersChallenges, solutions, initialLettersState)
})

test('konbinatoria 4. DBH ak lab: choose, Tartaglia and paths', () => {
    for (let n = 0; n <= 12; n += 1) for (let k = 0; k <= n; k += 1) {
        assert.equal(choose(n, k), factorial(n) / (factorial(k) * factorial(n - k)))
        if (n > 0 && k > 0 && k < n) assert.equal(choose(n, k), choose(n - 1, k - 1) + choose(n - 1, k))
    }
    assert.deepEqual(setChoose(initialChooseState, { n: 3 }), { n: 3, k: 2 })
    assert.deepEqual(setChoose({ n: 6, k: 6 }, { n: 4 }), { n: 4, k: 4 })
    const chooseSolutions: ChooseState[] = [{ n: 7, k: 3 }, { n: 8, k: 2 }, { n: 6, k: 6 }]
    checkChallenges(chooseChallenges, chooseSolutions, initialChooseState)
    assert.deepEqual(setPascal(initialPascalState, { row: 2 }), { row: 2, place: 2 })
    const pascalSolutions: PascalState[] = [{ row: 8, place: 5 }, { row: 9, place: 0 }, { row: 10, place: 5 }]
    checkChallenges(pascalChallenges, pascalSolutions, initialPascalState)
    assert.equal(gridPaths(initialGridState), 56)
    assert.equal(setGrid(initialGridState, { width: 0, height: 9 }).height, 5)
    const gridSolutions: GridState[] = [{ width: 4, height: 3 }, { width: 4, height: 4 }, { width: 6, height: 3 }]
    checkChallenges(gridChallenges, gridSolutions, initialGridState)
})
