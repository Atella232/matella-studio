import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { socFunctionsLabChallengeIds, socFunctionsLabToolForTopic, socFunctionsLabTools } from '../src/pages/batx1-gizarte-funtzioak/lab/labTools.ts'
import { curvatureOf, estimateChallenges, estimateExtra, estimateOf, estimatePrediction, initialEstimateState, lineAt, parabolaAt, setEstimate, type EstimateState } from '../src/pages/batx1-gizarte-funtzioak/lab/estimate.ts'
import { bestPrice, initialPriceState, priceChallenges, priceExtra, priceLimit, pricePrediction, setPrice, valueAt, type PriceState } from '../src/pages/batx1-gizarte-funtzioak/lab/price.ts'
import { averageAt, averageChallenges, averageExtra, averagePrediction, initialAverageState, setAverage, type AverageState } from '../src/pages/batx1-gizarte-funtzioak/lab/average.ts'

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

test('funtzioak batx1 g lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(socFunctionsLabTools.length, 12)
    const stages = ['families', 'linear', 'quadratic', 'inverse', 'piecewise']
    for (const stage of stages) assert.ok(socFunctionsLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of socFunctionsLabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    }
    // The «Observe» text of the tools of this unit is plain text, not LaTeX
    for (const tool of socFunctionsLabTools.filter((item) => ['estimate', 'price', 'average'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
        assert.ok(/[؀-ۿ]/.test(tool.observe.ar) && /[؀-ۿ]/.test(tool.title.ar), tool.id)
    }
    assert.equal(new Set(socFunctionsLabChallengeIds).size, socFunctionsLabChallengeIds.length)
    // The three tools of this unit use the 133xxx block; the borrowed ones keep their ids
    const own = [...estimateChallenges, ...priceChallenges, ...averageChallenges].map((challenge) => challenge.id)
    for (const id of own) assert.ok(id >= 133101 && id <= 133399, `${id}`)
    const topics = ['families', 'domain', 'context-domain', 'line', 'interpolation', 'linear-models', 'parabola', 'optimum', 'three-points', 'inverse-prop', 'average-cost', 'root', 'piecewise', 'piecewise-model', 'absolute']
    for (const [topic, tool] of Object.entries(socFunctionsLabToolForTopic)) {
        assert.ok(topics.includes(topic), topic)
        assert.ok(socFunctionsLabTools.some((item) => item.id === tool), `${topic} → ${tool}`)
    }
    for (const tool of socFunctionsLabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
})

test('funtzioak batx1 g lab: entre dos (o tres) datos', () => {
    const at = (patch: Partial<EstimateState>) => setEstimate(initialEstimateState, patch)
    // The line and Newton's parabola go through their data
    const s = at({ mode: 'parabolic', a: 3, b: 9, c: 2 })
    for (const [x, y] of [[0, 3], [4, 9], [8, 2]]) assert.ok(Math.abs(parabolaAt(s, x) - y) < 1e-9)
    assert.equal(lineAt(s, 4), 9)
    // Aligned data: the parabola is the line
    const aligned = at({ mode: 'parabolic', a: 1, b: 4, c: 7 })
    assert.equal(curvatureOf(aligned), 0)
    for (let x = 0; x <= 12; x += 1) assert.ok(Math.abs(parabolaAt(aligned, x) - lineAt(aligned, x)) < 1e-9)
    // Inside, a datum, outside
    assert.equal(estimatePrediction(at({ target: 2 })), '<')
    assert.equal(estimatePrediction(at({ target: 4 })), '=')
    assert.equal(estimatePrediction(at({ target: 6 })), '>')
    assert.equal(estimatePrediction(at({ mode: 'parabolic', target: 6 })), '<')
    assert.equal(estimatePrediction(at({ mode: 'parabolic', target: 8 })), '=')
    assert.equal(estimateOf(at({ a: 4, b: 8, target: 2 })), 6)
    // Changing anything forgets the prediction
    assert.equal(setEstimate({ ...initialEstimateState, prediction: '<' }, { target: 3 }).prediction, null)
    assert.equal(setEstimate({ ...initialEstimateState, prediction: '<' }, { target: 2 }).prediction, '<')
    checkChallenges(estimateChallenges, initialEstimateState, {
        133101: at({ a: 4, b: 8, target: 2 }),
        133102: at({ target: 6 }),
        133103: at({ a: 2, b: 6, target: 8 }),
        133104: at({ mode: 'parabolic', a: 2, b: 5, c: 8 }),
        133105: at({ mode: 'parabolic', a: 2, b: 4, c: 8, target: 12 })
    })
    checkExtras(estimateExtra, initialEstimateState, (state) => setEstimate(state, state))
})

test('funtzioak batx1 g lab: el precio que más da', () => {
    const at = (patch: Partial<PriceState>) => setPrice(initialPriceState, patch)
    // The vertex is the best whole price, for the revenue and for the profit
    for (const state of [at({ Q: 100, k: 5 }), at({ mode: 'profit', Q: 120, k: 4, v: 10 }), at({ Q: 60, k: 3 })]) {
        const best = bestPrice(state)
        for (let p = 0; p <= priceLimit(state); p += 1) assert.ok(valueAt(state, p) <= valueAt(state, best) + 1e-9)
    }
    // The price never goes past the last one that sells something
    assert.equal(at({ Q: 60, k: 6, p: 40 }).p, 10)
    assert.equal(pricePrediction(at({ p: 4 })), '>')
    assert.equal(pricePrediction(at({ p: 15 })), '<')
    // q = 100 − 5p: I(p) = I(p + 1) where the vertex sits halfway, never for whole p here; with k = 4 and Q = 100, I(12) = I(13)
    assert.equal(pricePrediction(at({ k: 4, p: 12 })), '=')
    checkChallenges(priceChallenges, initialPriceState, {
        133201: at({ p: 10 }),
        133202: at({ Q: 60, k: 2, p: 10 }),
        133203: at({ mode: 'profit', Q: 120, k: 4, v: 10, p: 20 }),
        133204: at({ p: 10 }),
        133205: at({ mode: 'profit', v: 10, p: 5 })
    })
    checkExtras(priceExtra, initialPriceState, (state) => setPrice(state, state))
})

test('funtzioak batx1 g lab: el coste medio', () => {
    const at = (patch: Partial<AverageState>) => setAverage(initialAverageState, patch)
    assert.equal(averageAt(initialAverageState, 20), 30)
    // It falls with production and never reaches v
    for (let x = 10; x < 200; x += 10) assert.ok(averageAt(initialAverageState, x + 10) < averageAt(initialAverageState, x))
    assert.ok(averageAt(at({ F: 100, v: 10 }), 200) > 10)
    assert.equal(averagePrediction(at({ F: 600, v: 4, x: 150 })), '=')
    assert.equal(averagePrediction(at({ F: 600, v: 4, x: 100 })), '>')
    assert.equal(averagePrediction(at({ F: 600, v: 4, x: 200 })), '<')
    assert.equal(at({ F: 1234, x: 7 }).F, 1000)
    assert.equal(at({ F: 1234, x: 7 }).x, 10)
    checkChallenges(averageChallenges, initialAverageState, {
        133301: at({ F: 500, v: 5, x: 50 }),
        133302: at({ F: 600, v: 4, x: 150 }),
        133303: at({ F: 100, x: 200 }),
        133304: at({ F: 700, v: 5, x: 100 }),
        133305: at({ F: 800, v: 6, x: 200 })
    })
    checkExtras(averageExtra, initialAverageState, (state) => setAverage(state, state))
})
