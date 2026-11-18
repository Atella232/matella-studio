import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { socDerivLabChallengeIds, socDerivLabToolForTopic, socDerivLabTools } from '../src/pages/batx1-gizarte-deribatuak/lab/labTools.ts'
import { initialMarginalState, marginalAt, marginalChallenges, marginalExtra, marginalPrediction, nextUnit, setMarginal, type MarginalState } from '../src/pages/batx1-gizarte-deribatuak/lab/marginal.ts'
import { bestX, initialProfitState, profitAt, profitChallenges, profitExtra, profitPrediction, setProfit, type ProfitState } from '../src/pages/batx1-gizarte-deribatuak/lab/profit.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        // No Basque suffix glued to a number or to a formula
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/\$(?:ri|ren|rekin|z|ra|tik|ei)(?![a-zA-Z])/.test(text.eu), text.eu)
    }
}

/** Every fixed challenge is solved by a state we name, and none is solved when the tool opens */
function checkChallenges<State>(challenges: LabChallenge<State>[], initial: State, solutions: Record<number, State>) {
    assert.equal(new Set(challenges.map((challenge) => challenge.id)).size, challenges.length)
    for (const challenge of challenges) {
        assert.ok(solutions[challenge.id], `${challenge.id} has no solution in the test`)
        assert.ok(challenge.isSolved(solutions[challenge.id]), `${challenge.id} is not solved by its solution`)
        assert.ok(!challenge.isSolved(initial), `${challenge.id} starts solved`)
    }
    checkTexts(challenges.flatMap((challenge) => [challenge.prompt, challenge.hint]))
}

/** The endless challenges: well formed, solvable by their own solution, never solved at the start */
function checkExtras<State>(maker: LabChallengeMaker<State>, initial: State, setter: (state: State) => State) {
    const prompts = new Set<string>()
    for (let seed = 1; seed <= 150; seed += 1) {
        const challenge = maker(createRandom(seed * 7919 + 3))
        assert.ok(challenge.isSolved(challenge.solution), `seed ${seed}: ${challenge.prompt.es}`)
        // The solution is a state the controls can reach
        assert.deepEqual(setter(challenge.solution), challenge.solution, `seed ${seed}: unreachable ${challenge.prompt.es}`)
        assert.ok(!challenge.isSolved(initial), `seed ${seed} starts solved`)
        checkTexts([challenge.prompt, challenge.hint])
        prompts.add(challenge.prompt.es)
    }
    assert.ok(prompts.size >= 6, `only ${prompts.size} different challenges`)
}

test('deribatuak batx1 g lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(socDerivLabTools.length, 5)
    for (const stage of ['rate', 'monotony', 'optimization']) assert.ok(socDerivLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of socDerivLabTools) for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    for (const tool of socDerivLabTools.filter((item) => ['marginal', 'profit'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
        assert.ok(/[؀-ۿ]/.test(tool.observe.ar) && /[؀-ۿ]/.test(tool.title.ar), tool.id)
        assert.ok(!/\d[a-zñ]/.test(tool.observe.eu), tool.observe.eu)
    }
    assert.equal(new Set(socDerivLabChallengeIds).size, socDerivLabChallengeIds.length)
    for (const id of [...marginalChallenges, ...profitChallenges].map((challenge) => challenge.id)) assert.ok(id >= 136101 && id <= 136399, `${id}`)
    const topics = ['average-rate', 'derivative-point', 'tangent', 'derivative-function', 'product-quotient', 'chain-exp-log', 'sign-intervals', 'singular-points', 'extreme-coefficients', 'max-profit', 'optimize', 'interval-extremes', 'polynomial-graph', 'rational-graph', 'derivative-graph']
    for (const [topic, tool] of Object.entries(socDerivLabToolForTopic)) {
        assert.ok(topics.includes(topic), topic)
        assert.ok(socDerivLabTools.some((item) => item.id === tool), `${topic} → ${tool}`)
    }
    for (const tool of socDerivLabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
})

test('deribatuak batx1 g lab: el coste marginal', () => {
    const at = (patch: Partial<MarginalState>) => setMarginal(initialMarginalState, patch)
    // The next unit costs exactly a more than the marginal cost
    for (const curve of [0, 1, 2, 3, 4]) for (const x of [1, 5, 12]) {
        const state = at({ curve, x, b: 7 })
        assert.ok(Math.abs(nextUnit(state) - marginalAt(state, x) - [-0.5, 0, 0.5, 1, 2][curve]) < 1e-9)
    }
    assert.equal(marginalPrediction(at({ curve: 0 })), '<')
    assert.equal(marginalPrediction(at({ curve: 1 })), '=')
    assert.equal(marginalPrediction(at({ curve: 4 })), '>')
    assert.deepEqual(setMarginal(initialMarginalState, { curve: 9, b: 99, F: 37, x: 0 }), { curve: 4, b: 30, F: 40, x: 1, prediction: null })
    assert.equal(setMarginal({ ...initialMarginalState, prediction: '<' }, { b: 9 }).prediction, null)
    checkChallenges(marginalChallenges, initialMarginalState, {
        136101: at({ curve: 1 }),
        136102: at({ curve: 3, b: 10, x: 10 }),
        136103: at({ curve: 4 }),
        136104: at({ curve: 2, b: 5, x: 10 }),
        136105: at({ curve: 0, b: 20, x: 10 })
    })
    checkExtras(marginalExtra, initialMarginalState, (state) => setMarginal(state, state))
})

test('deribatuak batx1 g lab: beneficio máximo', () => {
    const at = (patch: Partial<ProfitState>) => setProfit(initialProfitState, patch)
    // The lesson: 60x against x² + 20x + 100 is best at 20 with 300
    const lesson = at({ p: 60, v: 20, curve: 1, F: 100, x: 20 })
    assert.equal(bestX(lesson), 20)
    assert.equal(profitAt(lesson, 20), 300)
    assert.equal(profitPrediction(lesson), '=')
    assert.equal(profitPrediction(at({ p: 60, v: 20, curve: 1, x: 5 })), '>')
    assert.equal(profitPrediction(at({ p: 60, v: 20, curve: 1, x: 25 })), '<')
    // One more unit raises the profit exactly when the prediction says so
    for (const x of [0, 7, 15, 22, 30]) {
        const state = at({ p: 40, v: 10, curve: 1, x })
        const gain = profitAt(state, x + 0.001) - profitAt(state, x)
        assert.equal(profitPrediction(state), Math.abs(gain) < 1e-4 ? '=' : gain > 0 ? '>' : '<')
    }
    assert.equal(setProfit(initialProfitState, { p: 33 }).p, 35)
    checkChallenges(profitChallenges, initialProfitState, {
        136201: at({ p: 40, v: 10, curve: 1, x: 15 }),
        136202: at({ p: 40, v: 10, curve: 1, x: 15 }),
        136203: at({ p: 50, v: 10, curve: 1 }),
        136204: at({ p: 40, v: 10, curve: 1, F: 100 }),
        136205: at({ p: 50, v: 10, curve: 2, x: 10 })
    })
    checkExtras(profitExtra, initialProfitState, (state) => setProfit(state, state))
})
