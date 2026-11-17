import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { bach2gIntegralsLabChallengeIds, bach2gIntegralsLabToolForTopic, bach2gIntegralsLabTools } from '../src/pages/batx2-gizarte-integralak/lab/labTools.ts'
import { accumulatedOf, initialPaybackState, paybackChallenges, paybackExtra, paybackMonth, paybackPrediction, PROJECTS, rateOf, setPayback, type PaybackState } from '../src/pages/batx2-gizarte-integralak/lab/payback.ts'
import { initialTotalState, marginalOf, PLANT_SETUP, PLANTS, setTotal, totalChallenges, totalExtra, totalOf, totalPrediction, variableOf, type TotalState } from '../src/pages/batx2-gizarte-integralak/lab/total.ts'

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

function checkChallenges<State>(challenges: LabChallenge<State>[], initial: State, solutions: Record<number, State>) {
    assert.equal(new Set(challenges.map((challenge) => challenge.id)).size, challenges.length)
    for (const challenge of challenges) {
        assert.ok(solutions[challenge.id], `${challenge.id} has no solution in the test`)
        assert.ok(challenge.isSolved(solutions[challenge.id]), `${challenge.id} is not solved by its solution`)
        assert.ok(!challenge.isSolved(initial), `${challenge.id} starts solved`)
    }
    checkTexts(challenges.flatMap((challenge) => [challenge.prompt, challenge.hint]))
}

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

const own = [...totalChallenges, ...paybackChallenges]
/** The integral of fn from a to b by the midpoint rule */
const numeric = (fn: (x: number) => number, a: number, b: number) => {
    let sum = 0
    const n = 2000
    for (let i = 0; i < n; i++) sum += fn(a + ((i + 0.5) * (b - a)) / n)
    return (sum * (b - a)) / n
}

test('integralak batx2 g lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(bach2gIntegralsLabTools.length, 5)
    for (const stage of ['definite', 'areas', 'economy']) assert.ok(bach2gIntegralsLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of bach2gIntegralsLabTools) for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    const ids = new Set(bach2gIntegralsLabTools.map((tool) => tool.id))
    for (const tool of Object.values(bach2gIntegralsLabToolForTopic)) assert.ok(tool && ids.has(tool), tool)
    assert.equal(new Set(bach2gIntegralsLabChallengeIds).size, bach2gIntegralsLabChallengeIds.length)
    for (const challenge of own) assert.ok(challenge.id >= 149101 && challenge.id <= 149299, `${challenge.id}`)
    checkTexts(bach2gIntegralsLabTools.flatMap((tool) => [tool.title, tool.observe]))
})

test('integralak batx2 g lab: the total cost is the fixed cost plus the area under the next unit', () => {
    for (const plant of PLANTS) {
        for (let x = 0; x <= 20; x++) {
            assert.ok(Math.abs(variableOf(plant, x) - numeric((t) => marginalOf(plant, t), 0, x)) < 1e-6, `${plant} ${x}`)
            assert.equal(totalOf(plant, x), PLANT_SETUP[plant].fixed + variableOf(plant, x))
            assert.ok(marginalOf(plant, x) >= 0 && marginalOf(plant, x) <= 60, `${plant} ${x}`)
        }
        katex.renderToString(PLANT_SETUP[plant].latex, { throwOnError: true })
    }
    assert.deepEqual(PLANTS.map((plant) => totalPrediction({ plant })), ['>', '=', '<'])
    const at = (plant: TotalState['plant'], x: number): TotalState => ({ plant, x, prediction: null })
    checkChallenges(totalChallenges, initialTotalState, { 149101: at('full', 10), 149102: at('press', 20), 149103: at('software', 10), 149104: at('full', 15), 149105: at('software', 16) })
    assert.equal(totalOf('full', 10), 400)
    assert.equal(totalOf('press', 20), 500)
    assert.equal(totalOf('software', 10), 475)
    checkExtras(totalExtra, initialTotalState, (state) => setTotal(state, {}))
})

test('integralak batx2 g lab: the money comes back when the green equals the red', () => {
    for (const project of PROJECTS) {
        const back = paybackMonth(project)
        assert.ok(Number.isInteger(back) && back > 0 && back <= 12, project)
        assert.ok(Math.abs(accumulatedOf(project, back)) < 1e-9, project)
        for (let t = 0; t <= 12; t++) {
            assert.ok(Math.abs(accumulatedOf(project, t) - numeric((s) => rateOf(project, s), 0, t)) < 1e-6, `${project} ${t}`)
            assert.ok(rateOf(project, t) >= -12 && rateOf(project, t) <= 24, `${project} ${t}`)
        }
    }
    assert.deepEqual(PROJECTS.map((project) => paybackPrediction({ project })), ['=', '<', '>'])
    const at = (project: PaybackState['project'], t: number): PaybackState => ({ project, t, prediction: null })
    checkChallenges(paybackChallenges, initialPaybackState, { 149201: at('cafe', 3), 149202: at('shop', 4), 149203: at('gym', 8), 149204: at('cafe', 7), 149205: at('gym', 4) })
    for (let t = 0; t <= 12; t++) assert.ok(accumulatedOf('cafe', t) >= accumulatedOf('cafe', 3))
    assert.equal(accumulatedOf('cafe', 7), 7)
    checkExtras(paybackExtra, initialPaybackState, (state) => setPayback(state, {}))
})
