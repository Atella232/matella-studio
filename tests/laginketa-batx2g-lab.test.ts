import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { samplingBatx2gLabChallengeIds, samplingBatx2gLabToolForTopic, samplingBatx2gLabTools } from '../src/pages/batx2-gizarte-laginketa/lab/labTools.ts'
import { bellFits, initialManyState, MANY_RUNS, MANY_SIZES, manyChallenges, manyExtra, manyPrediction, setMany, shareBetween, simulate, SPENDING, statisticDeviation, type ManyState } from '../src/pages/batx2-gizarte-laginketa/lab/many.ts'
import { deviationOfMeans, initialUrnState, meanOfMeans, meansDeviation, populationMean, sampleCount, setUrn, sums, urnChallenges, urnExtra, urnPrediction, URNS, type UrnState } from '../src/pages/batx2-gizarte-laginketa/lab/urn.ts'
import { samplingBatx2gLessonChecks } from '../src/pages/batx2-gizarte-laginketa/lessonChecks.ts'

/* Laginketa · 2.º Bachillerato Ciencias Sociales: the laboratory. */

const languages = ['eu', 'es', 'en', 'ar'] as const

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        const formulas = (value: string) => [...value.matchAll(/\$([^$]+)\$/g)].map((match) => match[1].replace(/\{,\}/g, '.')).sort()
        for (const language of ['eu', 'en', 'ar'] as const) assert.deepEqual(formulas(text[language]), formulas(text.es), `${language}: ${text[language]}`)
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
    }
}

function checkChallenges<State>(challenges: LabChallenge<State>[], initial: State, solutions: Record<number, State>) {
    for (const challenge of challenges) {
        assert.ok(challenge.isSolved(solutions[challenge.id]), `${challenge.id} is not solved by its solution`)
        assert.ok(!challenge.isSolved(initial), `${challenge.id} starts solved`)
    }
    checkTexts(challenges.flatMap((challenge) => [challenge.prompt, challenge.hint]))
}

function checkExtras<State>(maker: LabChallengeMaker<State>, initial: State, setter: (state: State) => State, least = 10) {
    const prompts = new Set<string>()
    for (let seed = 1; seed <= 150; seed += 1) {
        const challenge = maker(createRandom(seed * 7919 + 3))
        assert.ok(challenge.isSolved(challenge.solution), `seed ${seed}: ${challenge.prompt.es}`)
        assert.deepEqual(setter(challenge.solution), challenge.solution, `seed ${seed}: unreachable ${challenge.prompt.es}`)
        assert.ok(!challenge.isSolved(initial), `seed ${seed} starts solved`)
        checkTexts([challenge.prompt, challenge.hint])
        prompts.add(challenge.prompt.es)
    }
    assert.ok(prompts.size >= least, `only ${prompts.size} different challenges`)
}

test('laginketa batx2 g lab: the tools, their lessons and their challenge ids', () => {
    assert.deepEqual(samplingBatx2gLabTools.map((tool) => tool.id), ['sample', 'strata', 'urn', 'many'])
    const lessons = Object.keys(samplingBatx2gLessonChecks)
    for (const tool of samplingBatx2gLabTools) assert.ok(lessons.includes(tool.lessonTopic), `${tool.id}`)
    for (const [topic, tool] of Object.entries(samplingBatx2gLabToolForTopic)) {
        assert.ok(lessons.includes(topic), topic)
        if (tool) assert.ok(samplingBatx2gLabTools.some((item) => item.id === tool))
    }
    for (const id of [...urnChallenges, ...manyChallenges].map((challenge) => challenge.id)) assert.ok(id >= 152101 && id <= 152399, `${id}`)
    assert.equal(new Set(samplingBatx2gLabChallengeIds).size, samplingBatx2gLabChallengeIds.length)
    for (const tool of samplingBatx2gLabTools.filter((item) => ['urn', 'many'].includes(item.id))) checkTexts([tool.title, tool.observe])
})

test('laginketa batx2 g lab: the urn of the means', () => {
    const solve = (patch: Partial<UrnState>) => setUrn(initialUrnState, patch)
    checkChallenges(urnChallenges, initialUrnState, { 152101: solve({ urn: 1, n: 3 }), 152102: solve({ n: 4 }), 152103: solve({ urn: 2, n: 4 }) })
    checkExtras(urnExtra, initialUrnState, (state) => ({ ...setUrn(initialUrnState, state), prediction: state.prediction }))
    for (let urn = 0; urn < URNS.length; urn += 1) {
        for (let n = 1; n <= 4; n += 1) {
            const state = solve({ urn, n })
            const table = sums(state)
            assert.equal(table.reduce((total, [, count]) => total + count, 0), sampleCount(state))
            // The mean of the means is μ and their deviation is σ/√n, counted from every sample
            assert.ok(Math.abs(meanOfMeans(state) - populationMean(state)) < 1e-9)
            assert.ok(Math.abs(deviationOfMeans(state) - meansDeviation(state)) < 1e-9)
            assert.equal(urnPrediction(state), n === 1 ? '=' : '<')
        }
    }
    // The lesson's example: {2, 4, 6} with n = 2 gives 9 samples and mean 4
    assert.equal(sampleCount(solve({ n: 2 })), 9)
    assert.equal(meanOfMeans(solve({ n: 2 })), 4)
})

test('laginketa batx2 g lab: many samples', () => {
    const solve = (patch: Partial<ManyState>) => setMany(initialManyState, patch)
    const size = (n: number) => MANY_SIZES.indexOf(n)
    checkChallenges(manyChallenges, initialManyState, {
        152121: solve({ size: size(9) }),
        152122: solve({ mode: 'proportion', size: size(25) }),
        152123: solve({ mode: 'proportion', size: size(64) })
    })
    checkExtras(manyExtra, initialManyState, (state) => ({ ...setMany(initialManyState, state), prediction: state.prediction }), 8)
    // The spending: μ = 20 and σ² = 600
    const mean = SPENDING.values.reduce((total, value, index) => total + value * SPENDING.weights[index], 0)
    const second = SPENDING.values.reduce((total, value, index) => total + value * value * SPENDING.weights[index], 0)
    assert.ok(Math.abs(mean - 20) < 1e-9 && Math.abs(second - mean * mean - 600) < 1e-9)
    assert.ok(Math.abs(SPENDING.weights.reduce((a, b) => a + b, 0) - 1) < 1e-9)
    for (const mode of ['mean', 'proportion'] as const) {
        for (let index = 0; index < MANY_SIZES.length; index += 1) {
            const state = solve({ mode, size: index })
            const values = simulate(state)
            assert.equal(values.length, MANY_RUNS)
            assert.deepEqual(simulate(state), values, 'the same samples every time')
            const average = values.reduce((a, b) => a + b, 0) / MANY_RUNS
            const centre = mode === 'mean' ? 20 : 0.3
            // The 500 means are close to μ, within a few deviations of the mean of 500
            assert.ok(Math.abs(average - centre) < (4 * statisticDeviation(state)) / Math.sqrt(MANY_RUNS) + 1e-9, `${mode} ${MANY_SIZES[index]}: ${average}`)
            if (MANY_SIZES[index] >= 25) assert.equal(manyPrediction(state), '=')
        }
    }
    assert.ok(!bellFits(solve({ mode: 'proportion', size: size(16) })) && bellFits(solve({ mode: 'proportion', size: size(25) })))
    assert.ok(shareBetween(solve({ mode: 'proportion', size: size(49) }), 0.2, 0.4) <= 0.9)
})
