import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import {
    adjugateCells, adjugateChallenges, adjugateDet, adjugateExtra, ADJUGATE_MATRICES, chooseCell, chosenCofactor, initialAdjugateState, inverseSpot, loadAdjugate, setView, type AdjugateState
} from '../src/pages/batx2-gizarte-determinanteak/lab/adjugate.ts'
import {
    bundlesChallenges, bundlesDet, bundlesExtra, bundleTotals, BUNDLE_SCENARIOS, chooseBundle, initialBundlesState, loadBundles, multipleOf, pricesFound, setAmount, type BundlesState
} from '../src/pages/batx2-gizarte-determinanteak/lab/bundles.ts'
import { gizarteDeterminanteakLabChallengeIds, gizarteDeterminanteakLabToolForTopic, gizarteDeterminanteakLabTools } from '../src/pages/batx2-gizarte-determinanteak/lab/labTools.ts'
import { gizarteDeterminanteakLessonTexts } from '../src/pages/batx2-gizarte-determinanteak/lessonTexts.ts'
import { inverseGrid, multiplyGrids } from './matrix-latex.ts'

const texts = (text: LocalizedText) => [text.eu, text.es, text.en, text.ar]
function checkText(text: LocalizedText) {
    for (const value of texts(text)) for (const [, formula] of value.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true, strict: 'error' })
    assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
    assert.ok(/[؀-ۿ]/.test(text.ar) && !/[؀-ۿ]/.test(text.es + text.eu + text.en), text.ar)
    assert.ok(!/\d\s*€/.test(text.en), text.en)
}

const lessons = ['det-two', 'sarrus', 'zero-det', 'transpose-swap', 'scale-row', 'add-multiple', 'product-det', 'minors-cofactors', 'laplace', 'rank-by-minors', 'rank-parameter-minors', 'adjugate-inverse', 'inverse-parameter', 'det-matrix-equations', 'unique-prices']

test('determinanteak batx2 g lab: tools, ids and lessons', () => {
    assert.deepEqual(gizarteDeterminanteakLabTools.map((tool) => tool.id), ['property-machine', 'adjugate', 'det-slider', 'bundles'])
    const own = [...bundlesChallenges, ...adjugateChallenges].map((challenge) => challenge.id)
    assert.ok(own.every((id) => id >= 142101 && id <= 142399), 'own ids in the block')
    assert.equal(new Set(gizarteDeterminanteakLabChallengeIds).size, gizarteDeterminanteakLabChallengeIds.length)
    for (const tool of gizarteDeterminanteakLabTools) assert.ok(lessons.includes(tool.lessonTopic), tool.id)
    for (const [topic, tool] of Object.entries(gizarteDeterminanteakLabToolForTopic)) {
        assert.ok(lessons.includes(topic), topic)
        assert.ok(gizarteDeterminanteakLabTools.some((item) => item.id === tool), `${topic}: ${tool}`)
    }
    assert.ok(Object.keys(gizarteDeterminanteakLessonTexts).every((topic) => gizarteDeterminanteakLabToolForTopic[topic]))
    for (const tool of gizarteDeterminanteakLabTools.filter((item) => ['adjugate', 'bundles'].includes(item.id))) for (const text of [tool.title, tool.observe]) checkText(text)
})

test('determinanteak batx2 g lab: the bundles cost what their rows give, and the prices come out only when |A| ≠ 0', () => {
    for (const [index, scenario] of BUNDLE_SCENARIOS.entries()) {
        const state = loadBundles(index)
        assert.equal(scenario.prices.length, scenario.q.length)
        assert.deepEqual(bundleTotals(state), scenario.q.map((row) => row.reduce((sum, amount, k) => sum + amount * scenario.prices[k], 0)))
        const inverse = inverseGrid(state.q)
        assert.equal(inverse === null, !pricesFound(state), `scenario ${index}`)
        // With |A| ≠ 0, A⁻¹B gives back the prices of the shop
        if (inverse) assert.deepEqual(multiplyGrids(inverse, bundleTotals(state).map((total) => [total]))!.map(([value]) => Math.round(value * 1e9) / 1e9), scenario.prices)
    }
    assert.deepEqual([0, 1, 2].map((index) => bundlesDet(loadBundles(index))), [1, 0, 0])
    assert.deepEqual(multipleOf(loadBundles(1)), { i: 0, j: 1, k: 2 })
    assert.equal(multipleOf(loadBundles(2)), null, 'the bakery is a mix, not a multiple')
})

test('determinanteak batx2 g lab: every bundles challenge is solvable and none starts solved', () => {
    const predicted = (state: BundlesState): BundlesState => ({ ...state, prediction: '>' })
    const solutions: BundlesState[] = [
        predicted(initialBundlesState),
        predicted(setAmount(chooseBundle(loadBundles(1), 1), 0, 3)),
        setAmount(setAmount(chooseBundle(loadBundles(0), 1), 0, 4), 1, 2),
        setAmount(chooseBundle(loadBundles(2), 2), 2, 5),
        predicted(setAmount(setAmount(setAmount(chooseBundle(loadBundles(2), 2), 0, 2), 1, 2), 2, 2))
    ]
    bundlesChallenges.forEach((challenge, index) => {
        assert.ok(!challenge.isSolved(initialBundlesState), `${challenge.id} starts solved`)
        assert.ok(challenge.isSolved(solutions[index]), `${challenge.id} not solved`)
        checkText(challenge.prompt)
        checkText(challenge.hint)
    })
    for (let seed = 1; seed <= 150; seed++) {
        const challenge = bundlesExtra(createRandom(seed * 7919))
        assert.ok(!challenge.isSolved(initialBundlesState))
        assert.ok(challenge.solution && challenge.isSolved(challenge.solution), `seed ${seed}`)
        checkText(challenge.prompt)
    }
})

test('determinanteak batx2 g lab: the adjugate gives the inverse, with each cofactor transposed', () => {
    for (const [index, matrix] of ADJUGATE_MATRICES.entries()) {
        const state = loadAdjugate(index)
        const d = adjugateDet(state)
        assert.ok(d !== 0)
        const cells = adjugateCells(state)
        const inverse = inverseGrid(matrix)!
        for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
            assert.ok(Math.abs(inverse[j][i] - cells[i][j] / d) < 1e-9, `matrix ${index} (${i},${j})`)
            const spot = inverseSpot(chooseCell(state, i, j))
            assert.deepEqual([spot.row, spot.column], [j, i])
            assert.ok(Math.abs(spot.value - inverse[j][i]) < 1e-9)
        }
    }
    assert.deepEqual([0, 1, 2].map((index) => adjugateDet(loadAdjugate(index))), [3, 1, 5])
})

test('determinanteak batx2 g lab: every adjugate challenge is solvable and none starts solved', () => {
    const at = (matrix: number, row: number, column: number, view: AdjugateState['view'] = 'cofactor'): AdjugateState => ({ ...setView(chooseCell(loadAdjugate(matrix), row, column), view), prediction: '<' })
    const solutions: AdjugateState[] = [at(0, 0, 1), at(0, 1, 0), at(0, 1, 0, 'inverse'), at(2, 2, 1, 'inverse'), at(1, 0, 1, 'inverse')]
    assert.equal(chosenCofactor(at(0, 1, 0)), -2)
    adjugateChallenges.forEach((challenge, index) => {
        assert.ok(!challenge.isSolved(initialAdjugateState), `${challenge.id} starts solved`)
        assert.ok(challenge.isSolved(solutions[index]), `${challenge.id} not solved`)
        checkText(challenge.prompt)
        checkText(challenge.hint)
    })
    for (let seed = 1; seed <= 150; seed++) {
        const challenge = adjugateExtra(createRandom(seed * 7919))
        assert.ok(!challenge.isSolved(initialAdjugateState))
        assert.ok(challenge.solution && challenge.isSolved(challenge.solution), `seed ${seed}`)
        checkText(challenge.prompt)
    }
})
