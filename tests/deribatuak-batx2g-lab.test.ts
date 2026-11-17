import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { averageRateOf, initialRateState, MODELS, RATE_MODELS, rateChallenges, rateExtra, ratePrediction, setRate, STEPS, type RateState } from '../src/pages/batx2-gizarte-deribatuak/lab/instantRate.ts'
import { bach2gDerivativesLabChallengeIds, bach2gDerivativesLabToolForTopic, bach2gDerivativesLabTools } from '../src/pages/batx2-gizarte-deribatuak/lab/labTools.ts'
import { COST_KINDS, COSTS, initialNextState, marginalOf, nextChallenges, nextCostOf, nextExtra, nextPrediction, setNext, UNITS, type NextState } from '../src/pages/batx2-gizarte-deribatuak/lab/nextUnit.ts'
import { initialSmoothState, isSmooth, setSmooth, SMOOTH_SETUP, SMOOTH_SETUPS, smoothChallenges, smoothExtra, smoothLatex, type SmoothState } from '../src/pages/batx2-gizarte-deribatuak/lab/smoothTariff.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
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
        assert.deepEqual(setter(challenge.solution), challenge.solution, `seed ${seed}: unreachable ${challenge.prompt.es}`)
        assert.ok(!challenge.isSolved(initial), `seed ${seed} starts solved`)
        checkTexts([challenge.prompt, challenge.hint])
        prompts.add(challenge.prompt.es)
    }
    assert.ok(prompts.size >= 6, `only ${prompts.size} different challenges`)
}

const own = [...rateChallenges, ...smoothChallenges, ...nextChallenges]

test('deribatuak batx2 g lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(bach2gDerivativesLabTools.length, 6)
    for (const stage of ['rate', 'point', 'rules', 'chain', 'economy']) assert.ok(bach2gDerivativesLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of bach2gDerivativesLabTools) for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    const ids = new Set(bach2gDerivativesLabTools.map((tool) => tool.id))
    for (const tool of Object.values(bach2gDerivativesLabToolForTopic)) assert.ok(tool && ids.has(tool), tool)
    assert.equal(new Set(bach2gDerivativesLabChallengeIds).size, bach2gDerivativesLabChallengeIds.length)
    for (const challenge of own) assert.ok(challenge.id >= 146101 && challenge.id <= 146399, `${challenge.id}`)
})

test('deribatuak batx2 g lab: the average rate tends to the derivative, from below, from above or not at all', () => {
    for (const model of RATE_MODELS) {
        const rates = STEPS.map((_, step) => averageRateOf({ model, step }))
        const trend = ratePrediction({ model })
        for (let i = 1; i < rates.length; i++) {
            if (trend === '>') assert.ok(rates[i] > rates[i - 1], model)
            if (trend === '<') assert.ok(rates[i] < rates[i - 1], model)
            if (trend === '=') assert.equal(rates[i], rates[i - 1], model)
        }
        assert.ok(Math.abs(rates.at(-1)! - MODELS[model].instant) <= 0.011, model)
    }
    const at = (model: RateState['model'], h: number): RateState => ({ model, step: STEPS.indexOf(h), prediction: null })
    checkChallenges(rateChallenges, initialRateState, { 146201: at('sales', 1), 146202: at('users', 0.1), 146203: at('sales', 0.01), 146204: at('line', 0.1), 146205: at('users', 0.1) })
    checkExtras(rateExtra, initialRateState, (state) => setRate(state, {}))
})

test('deribatuak batx2 g lab: one pair (a, b) leaves no jump and no corner', () => {
    for (const setup of SMOOTH_SETUPS) {
        const [a, b] = SMOOTH_SETUP[setup].solution
        assert.ok(isSmooth({ setup, a, b }), setup)
        let count = 0
        for (let x = -6; x <= 8; x++) for (let y = -10; y <= 12; y++) if (isSmooth({ setup, a: x, b: y })) count++
        assert.equal(count, 1, setup)
        katex.renderToString(smoothLatex({ setup }), { throwOnError: true })
    }
    const at = (setup: SmoothState['setup'], a: number, b: number): SmoothState => ({ setup, a, b, prediction: null })
    checkChallenges(smoothChallenges, initialSmoothState, { 146301: at('s1', 4, -4), 146302: at('s2', 2, 0), 146303: at('s3', 0, 9), 146304: at('s1', 2, 0), 146305: at('s2', 5, -3) })
    checkExtras(smoothExtra, initialSmoothState, (state) => setSmooth(state, {}))
})

test("deribatuak batx2 g lab: the next unit costs C'(x) on a line, more on a convex cost and less on a concave one", () => {
    for (const kind of COST_KINDS) {
        for (let step = 0; step < UNITS.length; step++) {
            const state = { kind, step }
            const diff = nextCostOf(state) - marginalOf(state)
            const trend = nextPrediction({ kind })
            if (trend === '=') assert.ok(Math.abs(diff) < 1e-9, kind)
            if (trend === '>') assert.ok(diff > 1e-9, kind)
            if (trend === '<') assert.ok(diff < -1e-9, kind)
            // C' is the derivative of C
            const x = UNITS[step]
            assert.ok(Math.abs((COSTS[kind].c(x + 1e-6) - COSTS[kind].c(x - 1e-6)) / 2e-6 - marginalOf(state)) < 1e-4, kind)
        }
    }
    const at = (kind: NextState['kind'], x: number): NextState => ({ kind, step: UNITS.indexOf(x), prediction: null })
    checkChallenges(nextChallenges, initialNextState, { 146101: at('crowded', 100), 146102: at('scale', 100), 146103: at('crowded', 160), 146104: at('line', 10), 146105: at('scale', 100) })
    checkExtras(nextExtra, initialNextState, (state) => setNext(state, {}))
})
