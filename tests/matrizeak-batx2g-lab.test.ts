import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import {
    canChain, chainChallenges, chainExtra, CHAIN_SCENARIOS, choosePart, chooseCustomer, initialChainState, loadChain, needs, setChainOrder, setOrderAmount, setRecipe, type ChainState
} from '../src/pages/batx2-gizarte-matrizeak/lab/chain.ts'
import { gizarteMatrizeakLabChallengeIds, gizarteMatrizeakLabToolForTopic, gizarteMatrizeakLabTools } from '../src/pages/batx2-gizarte-matrizeak/lab/labTools.ts'
import {
    canMultiply, chooseShop, initialTicketState, loadScenario, result, setLayout, setMeasure, setOrder, setQuantity, setShape, shopTotals, ticketChallenges, ticketExtra, type TicketState
} from '../src/pages/batx2-gizarte-matrizeak/lab/ticket.ts'
import { gizarteMatrizeakLessonTexts } from '../src/pages/batx2-gizarte-matrizeak/lessonTexts.ts'

const texts = (text: LocalizedText) => [text.eu, text.es, text.en, text.ar]
function checkText(text: LocalizedText) {
    for (const value of texts(text)) for (const [, formula] of value.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true, strict: 'error' })
    assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
    assert.ok(/[؀-ۿ]/.test(text.ar) && !/[؀-ۿ]/.test(text.es + text.eu + text.en), text.ar)
    assert.ok(!/\d\s*€/.test(text.en), text.en)
}

test('matrizeak batx2 g lab: tools, ids and lessons', () => {
    assert.deepEqual(gizarteMatrizeakLabTools.map((tool) => tool.id), ['ticket', 'production-chain', 'rank-slider', 'gauss-jordan'])
    const own = [...ticketChallenges, ...chainChallenges].map((challenge) => challenge.id)
    assert.ok(own.every((id) => id >= 141101 && id <= 141399), 'own ids in the block')
    assert.equal(new Set(gizarteMatrizeakLabChallengeIds).size, gizarteMatrizeakLabChallengeIds.length)
    const lessons = ['data-tables', 'matrix-types', 'transpose-symmetric', 'sum-scalar', 'matrix-product', 'product-properties', 'costs-profits', 'production-chain', 'rank-gauss', 'rank-parameter', 'inverse-definition', 'gauss-jordan', 'matrix-powers', 'matrix-equations', 'equation-systems', 'matrix-form-system']
    for (const tool of gizarteMatrizeakLabTools) assert.ok(lessons.includes(tool.lessonTopic), tool.id)
    for (const [topic, tool] of Object.entries(gizarteMatrizeakLabToolForTopic)) {
        assert.ok(lessons.includes(topic), topic)
        assert.ok(gizarteMatrizeakLabTools.some((item) => item.id === tool), `${topic}: ${tool}`)
    }
    assert.ok(Object.keys(gizarteMatrizeakLessonTexts).every((topic) => gizarteMatrizeakLabToolForTopic[topic]))
    for (const tool of gizarteMatrizeakLabTools.slice(0, 2)) for (const text of [tool.title, tool.observe]) checkText(text)
})

test('matrizeak batx2 g lab: the ticket only multiplies QP and PᵗQᵗ, and both give the shop totals', () => {
    let possible = 0
    for (const layout of ['shops', 'products'] as const) for (const shape of ['column', 'row'] as const) for (const order of ['QP', 'PQ'] as const) {
        const state = setOrder(setShape(setLayout(initialTicketState, layout), shape), order)
        if (!canMultiply(state)) continue
        possible += 1
        assert.deepEqual(result(state)!.flat(), shopTotals(state))
    }
    assert.equal(possible, 2)
    assert.ok(!canMultiply(initialTicketState), 'it starts with a product that cannot be done')
    assert.deepEqual(shopTotals(loadScenario(1)), [89, 86])
    assert.deepEqual(shopTotals(setMeasure(loadScenario(2), 'profit')), [70, 73])
})

test('matrizeak batx2 g lab: every ticket challenge is solvable and none starts solved', () => {
    const columnQP = (state: TicketState) => setOrder(setShape(setLayout(state, 'shops'), 'column'), 'QP')
    const solutions: TicketState[] = [
        columnQP(initialTicketState),
        setOrder(setShape(setLayout(initialTicketState, 'products'), 'row'), 'PQ'),
        { ...setMeasure(columnQP(loadScenario(1)), 'profit'), prediction: '>' },
        setQuantity(chooseShop(columnQP(loadScenario(1)), 1), 0, 13),
        setQuantity(setMeasure(columnQP(loadScenario(2)), 'profit'), 1, 17)
    ]
    ticketChallenges.forEach((challenge, index) => {
        assert.ok(!challenge.isSolved(initialTicketState), `${challenge.id} starts solved`)
        assert.ok(challenge.isSolved(solutions[index]), `${challenge.id} not solved`)
        checkText(challenge.prompt)
        checkText(challenge.hint)
    })
    for (let seed = 1; seed <= 150; seed++) {
        const challenge = ticketExtra(createRandom(seed * 7919))
        assert.ok(!challenge.isSolved(initialTicketState))
        assert.ok(challenge.solution && challenge.isSolved(challenge.solution), `seed ${seed}`)
        checkText(challenge.prompt)
    }
})

test('matrizeak batx2 g lab: the production chain', () => {
    assert.deepEqual(needs(loadChain(0)), [[160, 60, 100], [136, 56, 80]])
    assert.ok(!canChain(initialChainState), 'it starts with BA')
    for (const scenario of CHAIN_SCENARIOS) {
        assert.equal(scenario.a.length, 2)
        assert.equal(scenario.b[0].length, 3)
        assert.equal(scenario.countEu.length, 3)
    }
    const ab = (state: ChainState) => setChainOrder(state, 'AB')
    const solutions: ChainState[] = [
        { ...ab(initialChainState), prediction: '>' },
        setOrderAmount(chooseCustomer(ab(initialChainState), 1), 0, 13),
        setOrderAmount(chooseCustomer(ab(loadChain(1)), 1), 0, 8),
        setRecipe(setRecipe(ab(loadChain(1)), 0, 7), 1, 5),
        setOrderAmount(setOrderAmount(ab(choosePart(loadChain(2), 2)), 0, 5), 1, 15)
    ]
    chainChallenges.forEach((challenge, index) => {
        assert.ok(!challenge.isSolved(initialChainState), `${challenge.id} starts solved`)
        assert.ok(challenge.isSolved(solutions[index]), `${challenge.id} not solved`)
        checkText(challenge.prompt)
        checkText(challenge.hint)
    })
    for (let seed = 1; seed <= 150; seed++) {
        const challenge = chainExtra(createRandom(seed * 7919))
        assert.ok(!challenge.isSolved(initialChainState))
        assert.ok(challenge.solution && challenge.isSolved(challenge.solution), `seed ${seed}`)
        checkText(challenge.prompt)
    }
})
