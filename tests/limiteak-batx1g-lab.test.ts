import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { socLimitsLabChallengeIds, socLimitsLabToolForTopic, socLimitsLabTools } from '../src/pages/batx1-gizarte-limiteak/lab/labTools.ts'
import { initialLongRunState, longRunAt, longRunChallenges, longRunExtra, longRunPrediction, setLongRun, startOf, type LongRunState } from '../src/pages/batx1-gizarte-limiteak/lab/longRun.ts'
import { initialTariffState, jumpOf, leftAt, rightAt, setTariff, tariffAt, tariffChallenges, tariffExtra, tariffPrediction, type TariffState } from '../src/pages/batx1-gizarte-limiteak/lab/tariff.ts'

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

test('limiteak batx1 g lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(socLimitsLabTools.length, 5)
    for (const stage of ['infinity', 'point', 'continuity']) assert.ok(socLimitsLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of socLimitsLabTools) for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    for (const tool of socLimitsLabTools.filter((item) => ['long-run', 'tariff'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
        assert.ok(/[؀-ۿ]/.test(tool.observe.ar) && /[؀-ۿ]/.test(tool.title.ar), tool.id)
        assert.ok(!/\d[a-zñ]/.test(tool.observe.eu), tool.observe.eu)
    }
    assert.equal(new Set(socLimitsLabChallengeIds).size, socLimitsLabChallengeIds.length)
    for (const id of [...longRunChallenges, ...tariffChallenges].map((challenge) => challenge.id)) assert.ok(id >= 135101 && id <= 135399, `${id}`)
    const topics = ['long-run', 'poly-exp', 'degrees', 'minus-infinity', 'roots-infinity', 'long-models', 'one-sided', 'infinite', 'zero-zero', 'continuous', 'discontinuities', 'parameter', 'vertical-horizontal', 'oblique', 'branches']
    for (const [topic, tool] of Object.entries(socLimitsLabToolForTopic)) {
        assert.ok(topics.includes(topic), topic)
        assert.ok(socLimitsLabTools.some((item) => item.id === tool), `${topic} → ${tool}`)
    }
    for (const tool of socLimitsLabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
})

test('limiteak batx1 g lab: a largo plazo', () => {
    const at = (patch: Partial<LongRunState>) => setLongRun(initialLongRunState, patch)
    // It starts at B/C and tends to A
    const fish = at({ A: 9, B: 6, C: 3 })
    assert.equal(startOf(fish), 2)
    assert.ok(Math.abs(longRunAt(fish, 1e6) - 9) < 1e-4)
    assert.equal(longRunPrediction(fish), '>')
    assert.equal(longRunPrediction(at({ A: 5, B: 60, C: 2 })), '<')
    assert.equal(longRunPrediction(at({ A: 4, B: 12, C: 3 })), '=')
    // A constant model never moves
    for (const t of [0, 1, 7, 40]) assert.ok(Math.abs(longRunAt(at({ A: 4, B: 12, C: 3 }), t) - 4) < 1e-12)
    // The controls stay in range, and changing one clears the prediction
    assert.deepEqual(setLongRun(initialLongRunState, { A: 40, B: -3, C: 0 }), { A: 12, B: 0, C: 1, prediction: null })
    assert.equal(setLongRun({ ...initialLongRunState, prediction: '<' }, { B: 9 }).prediction, null)
    assert.equal(setLongRun({ ...initialLongRunState, prediction: '<' }, {}).prediction, '<')
    checkChallenges(longRunChallenges, initialLongRunState, {
        135101: at({ A: 8, B: 4, C: 2 }),
        135102: at({ A: 5, B: 60, C: 2 }),
        135103: at({ A: 4, B: 12, C: 3 }),
        135104: at({ A: 8, B: 4, C: 4 }),
        135105: at({ A: 6, B: 0, C: 3 })
    })
    assert.ok(Math.abs(longRunAt(at({ A: 8, B: 4, C: 4 }), 10) - 6) < 1e-12)
    assert.ok(Math.abs(longRunAt(at({ A: 6, B: 0, C: 3 }), 3) - 3) < 1e-12)
    checkExtras(longRunExtra, initialLongRunState, (state) => setLongRun(state, state))
})

test('limiteak batx1 g lab: la tarifa que no salta', () => {
    const at = (patch: Partial<TariffState>) => setTariff(initialTariffState, patch)
    // The textbook case of the lesson: 2x up to 10 and 1.5x + 5 after it join at 20
    const water = at({ first: 2, second: 2, L: 10, k: 5 })
    assert.equal(leftAt(water), 20)
    assert.equal(rightAt(water), 20)
    assert.equal(jumpOf(water), 0)
    assert.equal(tariffPrediction(water), '=')
    assert.equal(tariffAt(water, 10), 20)
    assert.equal(tariffAt(water, 12), 23)
    assert.equal(tariffPrediction(initialTariffState), '<')
    assert.equal(tariffPrediction(at({ k: 10 })), '>')
    // L moves in steps of 2 and k stays in range
    assert.equal(setTariff(initialTariffState, { L: 7 }).L, 8)
    assert.equal(setTariff(initialTariffState, { L: 30, k: -50 }).L, 12)
    assert.equal(setTariff(initialTariffState, { k: -50 }).k, -10)
    assert.equal(setTariff({ ...initialTariffState, prediction: '=' }, { k: 3 }).prediction, null)
    checkChallenges(tariffChallenges, initialTariffState, {
        135201: water,
        135202: at({ first: 2, second: 2, L: 8, k: 4 }),
        135203: at({ first: 2, second: 2, L: 6, k: 0 }),
        135204: at({ first: 2, second: 1, L: 6, k: 6 }),
        135205: at({ first: 2, second: 2, L: 10, k: 10 })
    })
    checkExtras(tariffExtra, initialTariffState, (state) => setTariff(state, state))
})
