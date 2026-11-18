import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { gizarteSistemakLabChallengeIds, gizarteSistemakLabToolForTopic, gizarteSistemakLabTools } from '../src/pages/batx2-gizarte-sistemak/lab/labTools.ts'
import {
    choosePricesBundle, initialPricesState, loadPrices, pricesChallenges, pricesExtra, pricesKind, PRICES_SCENARIOS, setBundleAmount, setBundleTotal, uniquePrices, type PricesCountState
} from '../src/pages/batx2-gizarte-sistemak/lab/pricesCount.ts'
import {
    builtSolution, chooseSentence, initialStatementState, isRightRow, loadStatement, setTerm, statementChallenges, statementExtra, STATEMENT_SCENARIOS, systemDone, type StatementState
} from '../src/pages/batx2-gizarte-sistemak/lab/statement.ts'
import { gizarteSistemakLessonTexts } from '../src/pages/batx2-gizarte-sistemak/lessonTexts.ts'

const texts = (text: LocalizedText) => [text.eu, text.es, text.en, text.ar]
function checkText(text: LocalizedText) {
    for (const value of texts(text)) for (const [, formula] of value.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true, strict: 'error' })
    assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
    assert.ok(/[؀-ۿ]/.test(text.ar) && !/[؀-ۿ]/.test(text.es + text.eu + text.en), text.ar)
    assert.ok(!/\d\s*€/.test(text.en), text.en)
}

const lessons = ['classify-systems', 'triangular-systems', 'gauss-method', 'solutions-count', 'parametric-solutions', 'matrix-form', 'rouche-theorem', 'rank-classify', 'prices-how-many', 'cramer-rule', 'inverse-solve', 'homogeneous-trivial', 'parameter-determinant', 'parameter-ranks', 'parameter-solve', 'statement-system', 'word-problems', 'parameter-problems']

test('sistemak batx2 g lab: tools, ids and lessons', () => {
    assert.deepEqual(gizarteSistemakLabTools.map((tool) => tool.id), ['gauss-machine', 'prices-count', 'discussion-map', 'statement'])
    const own = [...pricesChallenges, ...statementChallenges].map((challenge) => challenge.id)
    assert.ok(own.every((id) => id >= 143101 && id <= 143399), 'own ids in the block')
    assert.equal(new Set(gizarteSistemakLabChallengeIds).size, gizarteSistemakLabChallengeIds.length)
    for (const tool of gizarteSistemakLabTools) assert.ok(lessons.includes(tool.lessonTopic), tool.id)
    for (const [topic, tool] of Object.entries(gizarteSistemakLabToolForTopic)) {
        assert.ok(lessons.includes(topic), topic)
        assert.ok(gizarteSistemakLabTools.some((item) => item.id === tool), `${topic}: ${tool}`)
    }
    assert.ok(Object.keys(gizarteSistemakLessonTexts).every((topic) => gizarteSistemakLabToolForTopic[topic]))
    for (const tool of gizarteSistemakLabTools.filter((item) => ['prices-count', 'statement'].includes(item.id))) for (const text of [tool.title, tool.observe]) checkText(text)
})

test('sistemak batx2 g lab: the three shops are one of each kind, and the unique prices fit every bundle', () => {
    assert.deepEqual([0, 1, 2].map((index) => pricesKind(loadPrices(index))), ['determined', 'inconsistent', 'indeterminate'])
    for (let seed = 0; seed < 300; seed++) {
        const random = createRandom(seed * 31 + 7)
        const q = [0, 1, 2].map(() => [Math.floor(random() * 7), Math.floor(random() * 7)])
        const totals = q.map((row) => row[0] * 3 + row[1] * 2)
        const state: PricesCountState = { ...initialPricesState, q, totals }
        if (pricesKind(state) !== 'determined') continue
        assert.deepEqual(uniquePrices(state), [3, 2])
    }
    for (const scenario of PRICES_SCENARIOS) assert.equal(scenario.q.length, 3)
})

test('sistemak batx2 g lab: every prices challenge is solvable and none starts solved', () => {
    const predicted = (state: PricesCountState): PricesCountState => ({ ...state, prediction: '=' })
    const solutions: PricesCountState[] = [
        predicted(initialPricesState),
        predicted(setBundleTotal(choosePricesBundle(loadPrices(1), 2), 5)),
        setBundleTotal(choosePricesBundle(loadPrices(0), 2), 17),
        setBundleTotal(setBundleAmount(choosePricesBundle(loadPrices(2), 2), 1, 5), 13),
        setBundleTotal(choosePricesBundle(loadPrices(2), 1), 11)
    ]
    pricesChallenges.forEach((challenge, index) => {
        assert.ok(!challenge.isSolved(initialPricesState), `${challenge.id} starts solved`)
        assert.ok(challenge.isSolved(solutions[index]), `${challenge.id} not solved`)
        checkText(challenge.prompt)
        checkText(challenge.hint)
    })
    for (let seed = 1; seed <= 150; seed++) {
        const challenge = pricesExtra(createRandom(seed * 7919))
        assert.ok(!challenge.isSolved(initialPricesState))
        assert.ok(challenge.solution && challenge.isSolved(challenge.solution), `seed ${seed}`)
        checkText(challenge.prompt)
    }
})

test('sistemak batx2 g lab: each problem\'s equations have its solution, and a multiple of an equation is right', () => {
    for (const scenario of STATEMENT_SCENARIOS) {
        for (const target of scenario.targets) assert.equal(target[0] * scenario.solution[0] + target[1] * scenario.solution[1] + target[2] * scenario.solution[2], target[3])
        for (const sentence of scenario.sentences) checkText(sentence)
        for (const unknown of scenario.unknowns) checkText(unknown.meaning)
    }
    assert.ok(isRightRow([2, 2, 2, 60], [1, 1, 1, 30]))
    assert.ok(isRightRow([-2, 1, 0, 0], [2, -1, 0, 0]))
    assert.ok(!isRightRow([1, -2, 0, 0], [2, -1, 0, 0]), '«twice» the other way round')
    let state: StatementState = loadStatement(0)
    STATEMENT_SCENARIOS[0].targets.forEach((target, sentence) => {
        state = chooseSentence(state, sentence)
        target.forEach((value, term) => { state = setTerm(state, term, value) })
    })
    assert.ok(systemDone(state))
    assert.deepEqual(builtSolution(state), [6, 12, 12])
})

test('sistemak batx2 g lab: every statement challenge is solvable and none starts solved', () => {
    const build = (scenario: number, sentences: number[]): StatementState => {
        let state = loadStatement(scenario)
        for (const sentence of sentences) {
            state = chooseSentence(state, sentence)
            STATEMENT_SCENARIOS[scenario].targets[sentence].forEach((value, term) => { state = setTerm(state, term, value) })
        }
        return state
    }
    const solutions = [build(0, [0]), build(0, [0, 1, 2]), build(1, [0, 1, 2]), build(2, [1]), build(2, [0, 1, 2])]
    statementChallenges.forEach((challenge, index) => {
        assert.ok(!challenge.isSolved(initialStatementState), `${challenge.id} starts solved`)
        assert.ok(challenge.isSolved(solutions[index]), `${challenge.id} not solved`)
        checkText(challenge.prompt)
        checkText(challenge.hint)
    })
    for (let seed = 1; seed <= 100; seed++) {
        const challenge = statementExtra(createRandom(seed * 7919))
        assert.ok(!challenge.isSolved(initialStatementState))
        assert.ok(challenge.solution && challenge.isSolved(challenge.solution), `seed ${seed}`)
        checkText(challenge.prompt)
    }
})
