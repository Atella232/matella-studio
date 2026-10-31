import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker, LocalizedText } from '../src/features/unit-v2/lab/types.ts'
import { stats3LabChallengeIds, stats3LabToolForTopic, stats3LabTools } from '../src/pages/dbh3-estatistika/lab/labTools.ts'
import { fans, FANS, initialSampleState, POPULATION, sampleChallenges, sampleExtra, sampleFans, sampleOf, samplePercent, samplePrediction, setSample, type SampleState } from '../src/pages/dbh3-estatistika/lab/sample.ts'
import { axisChallenges, axisExtra, axisPrediction, initialAxisState, lookRatio, setAxis, trueRatio, type AxisState } from '../src/pages/dbh3-estatistika/lab/axis.ts'
import { initialNeededState, neededChallenges, neededExtra, neededMean, neededMedian, neededPrediction, setNeeded, type NeededState } from '../src/pages/dbh3-estatistika/lab/needed.ts'
import { initialSpinnerState, redProbability, sectors, setSpinner, spinnerChallenges, spinnerExtra, spinnerPrediction, spinReds, type SpinnerState } from '../src/pages/dbh3-estatistika/lab/spinner.ts'

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




test('estatistika 3. DBH lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(stats3LabTools.length, 14)
    for (const stage of ['data', 'charts', 'centre', 'spread', 'chance']) assert.ok(stats3LabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of stats3LabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
        assert.ok(!tool.observe.es.includes('$') && !tool.observe.eu.includes('$') && !tool.observe.ar.includes('$'), tool.id)
    }
    assert.equal(new Set(stats3LabChallengeIds).size, stats3LabChallengeIds.length)
    const own = [sampleChallenges, axisChallenges, neededChallenges, spinnerChallenges].flatMap((list) => list.map((challenge) => challenge.id))
    for (const id of own) assert.ok(id >= 56101 && id <= 56499, `${id}`)
    const topics = ['population-sample', 'frequency-table', 'grouped-data', 'bar-histogram', 'pie-chart', 'reading-charts', 'mean', 'median', 'mode', 'range-quartiles', 'box-plot', 'variance', 'events', 'laplace', 'compound']
    for (const topic of topics) assert.ok(stats3LabToolForTopic[topic], topic)
    for (const id of Object.values(stats3LabToolForTopic)) assert.ok(stats3LabTools.some((tool) => tool.id === id), id)
})

/** The first draw (1–20) of a size that solves a challenge, so that every fixed challenge can be done */
function drawFor(size: number, test: (state: SampleState) => boolean): SampleState {
    for (let draw = 1; draw <= 20; draw += 1) {
        const state = setSample(initialSampleState, { size, draw })
        if (test(state)) return state
    }
    throw new Error(`No draw of ${size} solves it`)
}

test('estatistika 3. DBH lab: la muestra', () => {
    assert.equal(fans.length, POPULATION)
    assert.equal(fans.filter(Boolean).length, FANS)
    for (const size of [10, 50, 100]) for (let draw = 1; draw <= 20; draw += 1) {
        const picked = sampleOf({ size, draw })
        assert.equal(new Set(picked).size, size)
        assert.ok(picked.every((pupil) => pupil >= 0 && pupil < POPULATION))
    }
    // Large samples stay closer to 40 % than small ones
    const miss = (size: number) => Math.max(...Array.from({ length: 20 }, (_, index) => Math.abs(samplePercent({ size, draw: index + 1 }) - 40)))
    assert.ok(miss(100) < miss(10))
    assert.equal(setSample({ ...initialSampleState, prediction: '<' }, { draw: 2 }).prediction, null)
    assert.ok(['<', '=', '>'].includes(samplePrediction(initialSampleState)))
    checkChallenges(sampleChallenges, initialSampleState, Object.fromEntries(sampleChallenges.map((challenge) => {
        const size = Number(challenge.prompt.es.match(/de (\d+) alumnos/)![1])
        return [challenge.id, drawFor(size, challenge.isSolved)]
    })))
    checkExtras(sampleExtra, initialSampleState)
    assert.ok(sampleFans(initialSampleState) >= 0)
})

test('estatistika 3. DBH lab: el eje engañoso', () => {
    const at = (set: number, start: number): AxisState => setAxis(initialAxisState, { set, start })
    assert.equal(lookRatio(at(0, 0)), trueRatio(at(0, 0)))
    assert.equal(lookRatio(at(0, 40)), 2)
    // The start never reaches the smaller bar
    assert.equal(at(2, 90).start, 15)
    assert.equal(axisPrediction(initialAxisState), '<')
    assert.equal(axisPrediction(at(1, 40)), '=')
    checkChallenges(axisChallenges, initialAxisState, { 56201: at(0, 50), 56202: at(1, 40), 56203: at(1, 0), 56204: at(2, 10), 56205: at(0, 55) })
    checkExtras(axisExtra, initialAxisState, 4)
})

test('estatistika 3. DBH lab: qué nota necesito', () => {
    const at = (set: number, mark: number): NeededState => setNeeded(initialNeededState, { set, mark })
    assert.equal(neededMean(at(0, 7)), 6)
    assert.equal(neededMedian(at(0, 7)), 6)
    assert.equal(neededPrediction(initialNeededState), '<')
    assert.equal(neededPrediction(at(0, 7)), '=')
    assert.equal(at(0, 14).mark, 10)
    checkChallenges(neededChallenges, initialNeededState, { 56301: at(0, 7), 56302: at(1, 9), 56303: at(2, 10), 56304: at(3, 6), 56305: at(1, 6) })
    checkExtras(neededExtra, initialNeededState)
})

test('estatistika 3. DBH lab: la ruleta', () => {
    const at = (red: number, blue: number, green: number, spins = 0): SpinnerState => setSpinner(setSpinner(setSpinner(setSpinner(initialSpinnerState, { red }), { blue }), { green }), { spins })
    // Never empty, never more than twelve sectors
    assert.equal(sectors(at(0, 0, 0)), 1)
    assert.ok(sectors(at(8, 8, 8)) <= 12)
    assert.equal(redProbability(at(2, 1, 3)), 1 / 3)
    assert.equal(spinnerPrediction(at(3, 2, 1)), '=')
    // With a thousand spins the frequency is close to the probability
    for (const [red, blue, green] of [[1, 1, 1], [3, 1, 0], [1, 4, 3]]) {
        const state = at(red, blue, green, 2)
        assert.ok(Math.abs(spinReds(state) / 1000 - redProbability(state)) < 0.05)
    }
    checkChallenges(spinnerChallenges, initialSpinnerState, { 56401: at(2, 2, 2), 56402: at(0, 3, 0), 56403: at(2, 1, 1), 56404: at(2, 3, 3), 56405: at(2, 1, 3) })
    checkExtras(spinnerExtra, initialSpinnerState)
})
