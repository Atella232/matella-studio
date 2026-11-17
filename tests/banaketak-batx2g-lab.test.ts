import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { BAND_LEVELS, bandChallenges, bandExtra, bandPrediction, initialBandState, intervalOf, radiusOf, setBand, type BandState } from '../src/pages/batx2-gizarte-banaketak/lab/band.ts'
import { distributionsBatx2gLabChallengeIds, distributionsBatx2gLabToolForTopic, distributionsBatx2gLabTools } from '../src/pages/batx2-gizarte-banaketak/lab/labTools.ts'
import { approximable, initialSurveysState, meanOf, setSurveys, simulate, SURVEYS_RUNS, surveysChallenges, surveysExtra, surveysPrediction, varianceOf, withinOneSd, type SurveysState } from '../src/pages/batx2-gizarte-banaketak/lab/surveys.ts'
import { distributionsBatx2gLessonChecks } from '../src/pages/batx2-gizarte-banaketak/lessonChecks.ts'

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
    assert.ok(prompts.size >= 10, `only ${prompts.size} different challenges`)
}

test('banaketak batx2 g lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(distributionsBatx2gLabTools.length, 6)
    const lessons = Object.keys(distributionsBatx2gLessonChecks)
    for (const tool of distributionsBatx2gLabTools) assert.ok(lessons.includes(tool.lessonTopic), `${tool.id}`)
    for (const [topic, tool] of Object.entries(distributionsBatx2gLabToolForTopic)) {
        assert.ok(lessons.includes(topic), topic)
        if (tool) assert.ok(distributionsBatx2gLabTools.some((item) => item.id === tool))
    }
    for (const id of [...surveysChallenges, ...bandChallenges].map((challenge) => challenge.id)) assert.ok(id >= 151101 && id <= 151399, `${id}`)
    assert.equal(new Set(distributionsBatx2gLabChallengeIds).size, distributionsBatx2gLabChallengeIds.length)
    for (const tool of distributionsBatx2gLabTools.filter((item) => ['surveys', 'band'].includes(item.id))) assert.ok(!/\d[a-zñ]/.test(tool.observe.eu), tool.observe.eu)
})

test('banaketak batx2 g lab: a thousand polls', () => {
    const solve = (patch: Partial<SurveysState>) => setSurveys(initialSurveysState, patch)
    checkChallenges(surveysChallenges, initialSurveysState, { 151101: solve({ n: 30, p: 4 }), 151102: solve({ n: 36, p: 5 }), 151103: solve({ n: 20, p: 3 }) })
    checkExtras(surveysExtra, initialSurveysState, (state) => ({ ...setSurveys(initialSurveysState, state), prediction: state.prediction }))
    for (const state of [initialSurveysState, solve({ n: 50, p: 1 }), solve({ n: 5, p: 5 })]) {
        const counts = simulate(state)
        assert.equal(counts.reduce((sum, count) => sum + count, 0), SURVEYS_RUNS)
        assert.deepEqual(simulate(state), counts, 'the same polls every time')
        // The average of the simulated polls is close to np
        const average = counts.reduce((sum, count, k) => sum + count * k, 0) / SURVEYS_RUNS
        assert.ok(Math.abs(average - meanOf(state)) < 0.4, `${average} vs ${meanOf(state)}`)
    }
    assert.equal(meanOf(solve({ n: 30, p: 4 })), 12)
    assert.equal(varianceOf(solve({ n: 36, p: 5 })), 9)
    assert.ok(approximable(solve({ n: 20, p: 3 })) && !approximable(solve({ n: 20, p: 2 })))
    // About two thirds within μ ± σ for a bell; the prediction says so
    assert.ok(withinOneSd(solve({ n: 50, p: 5 })) > 0.6 && surveysPrediction(solve({ n: 50, p: 5 })) === '=')
})

test('banaketak batx2 g lab: the band of k %', () => {
    const solve = (patch: Partial<BandState>) => setBand(initialBandState, patch)
    checkChallenges(bandChallenges, initialBandState, {
        151121: solve({ mean: 120, sd: 20, level: BAND_LEVELS.indexOf(95) }),
        151122: solve({ sd: 10, level: BAND_LEVELS.indexOf(99) }),
        151123: solve({ sd: 20, level: BAND_LEVELS.indexOf(90) })
    })
    checkExtras(bandExtra, initialBandState, (state) => ({ ...setBand(initialBandState, state), prediction: state.prediction }))
    assert.deepEqual(intervalOf(solve({ mean: 120, sd: 20, level: BAND_LEVELS.indexOf(95) })), [80.8, 159.2])
    assert.equal(radiusOf(solve({ sd: 10, level: BAND_LEVELS.indexOf(99) })), 25.75)
    assert.deepEqual(BAND_LEVELS.map((_, level) => bandPrediction({ level })), ['<', '<', '<', '=', '>', '>'])
})
