import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { between } from '../src/pages/batx2-zientziak-banaketak/normal.ts'
import { densityChallenges, densityExtra, densityPrediction, initialDensityState, isDensity, rightHeight, setDensity, totalArea, windowArea, type DensityState } from '../src/pages/batx1-gizarte-normala/lab/density.ts'
import { accepted, estimateOf, expectedOf, firstRejectedSd, fitNormalChallenges, fitNormalExtra, fitNormalPrediction, initialFitNormalState, NORMAL_DATA, percentOf, setFitNormal, totalOf, type FitNormalState } from '../src/pages/batx1-gizarte-normala/lab/fitNormal.ts'
import { addData, classesOf, histogramChallenges, histogramExtra, initialHistogramState, normalIn, setHistogram, shareIn, type HistogramState } from '../src/pages/batx1-gizarte-normala/lab/histogram.ts'
import { normalBatx1gLabChallengeIds, normalBatx1gLabToolForTopic, normalBatx1gLabTools } from '../src/pages/batx1-gizarte-normala/lab/labTools.ts'
import { normalBatx1gLessonChecks } from '../src/pages/batx1-gizarte-normala/lessonChecks.ts'

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
        assert.ok(!/§(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '§')), text.eu)
        const words = (value: string) => value.replace(/\$[^$]+\$/g, ' ')
        assert.ok(!/\d\.\d/.test(words(text.es)) && !/\d\.\d/.test(words(text.eu)), text.es)
        assert.ok(!/\d,\d(?!\d\d)/.test(words(text.en)) && !/\d,\d/.test(words(text.ar)), text.en)
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

function checkExtras<State>(maker: LabChallengeMaker<State>, initial: State, setter: (state: State) => State, least: number) {
    const prompts = new Set<string>()
    for (let seed = 1; seed <= 120; seed += 1) {
        const challenge = maker(createRandom(seed * 7919 + 3))
        assert.ok(challenge.isSolved(challenge.solution), `seed ${seed}: ${challenge.prompt.es}`)
        assert.deepEqual(setter(challenge.solution), challenge.solution, `seed ${seed}: unreachable ${challenge.prompt.es}`)
        assert.ok(!challenge.isSolved(initial), `seed ${seed} starts solved`)
        checkTexts([challenge.prompt, challenge.hint])
        prompts.add(challenge.prompt.es)
    }
    assert.ok(prompts.size >= least, `only ${prompts.size} different challenges`)
}

test('normala batx1 g lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(normalBatx1gLabTools.length, 7)
    for (const stage of ['review', 'continuous', 'normal', 'approximation', 'fit']) assert.ok(normalBatx1gLabTools.some((tool) => tool.stage === stage), stage)
    const topics = Object.keys(normalBatx1gLessonChecks)
    for (const tool of normalBatx1gLabTools) assert.ok(topics.includes(tool.lessonTopic), tool.id)
    assert.deepEqual(Object.keys(normalBatx1gLabToolForTopic).sort(), [...topics].sort())
    for (const tool of normalBatx1gLabTools.filter((item) => ['histogram', 'density', 'fitNormal'].includes(item.id))) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && !tool.observe[language].includes('$'), `${tool.id} ${language}`)
        assert.ok(!/\d[a-zñ]/.test(tool.observe.eu), tool.observe.eu)
        assert.ok(/[؀-ۿ]/.test(tool.observe.ar) && tool.observe.eu !== tool.observe.es, tool.id)
    }
    const own = [...histogramChallenges, ...densityChallenges, ...fitNormalChallenges].map((challenge) => challenge.id)
    assert.ok(own.every((id) => id >= 140101 && id <= 140399))
    assert.equal(new Set(normalBatx1gLabChallengeIds).size, normalBatx1gLabChallengeIds.length)
})

test('normala batx1 g lab: from the histogram to the bell', () => {
    // Every class edge is a z with two decimals, so the table gives each class
    for (const width of [10, 5, 2.5]) {
        const classes = classesOf({ width })
        assert.equal(classes.length, 80 / width)
        const total = classes.reduce((sum, a) => sum + normalIn({ width }, a), 0)
        assert.ok(Math.abs(total - 10_000) <= classes.length, `${width}: ${total}`)
    }
    assert.equal(normalIn({ width: 10 }, 160) + normalIn({ width: 10 }, 170), between(-1, 1))
    // The draws are seeded, and many data look like N(170; 10)
    assert.deepEqual(addData(initialHistogramState, 100), addData(initialHistogramState, 100))
    let many: HistogramState = initialHistogramState
    for (let index = 0; index < 10; index += 1) many = addData(many, 1000)
    assert.equal(many.data.length, 10_000)
    const middle = many.data.filter((value) => value >= 160 && value < 180).length / 10_000
    assert.ok(Math.abs(middle - 0.6826) < 0.02, `${middle}`)
    for (const a of classesOf({ width: 10 })) assert.ok(Math.abs(shareIn({ ...many, width: 10 }, a) - normalIn({ width: 10 }, a) / 10_000) < 0.02, `${a}`)
    // A new width keeps the data and moves the class
    assert.equal(setHistogram(many, { width: 5 }).data.length, 10_000)
    assert.equal(setHistogram({ ...initialHistogramState, selected: 167.5 }, { width: 10 }).selected, 160)
    checkChallenges(histogramChallenges, initialHistogramState, {
        140101: setHistogram({ ...many, width: 5 }, { selected: 165 }),
        140102: setHistogram({ ...initialHistogramState, width: 5 }, { selected: 170 }),
        140103: setHistogram({ ...many, width: 2.5 }, { selected: 167.5 })
    })
    checkExtras(histogramExtra, initialHistogramState, (state) => setHistogram(state, {}), 5)
})

test('normala batx1 g lab: build a density', () => {
    for (const shape of ['rectangle', 'up', 'down'] as const) {
        for (const base of [2, 4, 5, 10]) {
            const height = rightHeight(shape, base)
            const state = setDensity(initialDensityState, { shape, base, height, from: 0, to: base })
            assert.ok(isDensity(state), `${shape} ${base}`)
            assert.equal(windowArea(state), 10_000)
        }
    }
    assert.equal(totalArea(initialDensityState), 20_000)
    assert.equal(densityPrediction(initialDensityState), '>')
    const ramp: DensityState = setDensity(initialDensityState, { shape: 'up', base: 4, height: 50, from: 0, to: 2 })
    assert.equal(windowArea(ramp), 2500)
    assert.equal(windowArea(setDensity(ramp, { from: 2, to: 4 })), 7500)
    assert.equal(setDensity({ ...initialDensityState, prediction: '>' }, { height: 25 }).prediction, null)
    assert.equal(setDensity({ ...initialDensityState, prediction: '>' }, { from: 0 }).prediction, '>')
    checkChallenges(densityChallenges, initialDensityState, {
        140111: setDensity(initialDensityState, { shape: 'rectangle', base: 5, height: 20 }),
        140112: ramp,
        140113: setDensity(initialDensityState, { shape: 'down', base: 10, height: 20, from: 0, to: 2 })
    })
    checkExtras(densityExtra, initialDensityState, (state) => setDensity(state, {}), 10)
})

test('normala batx1 g lab: fitting a normal', () => {
    assert.deepEqual(NORMAL_DATA.map(estimateOf), [{ mean: 1700, sd: 100 }, { mean: 75, sd: 50 }, { mean: 60, sd: 20 }])
    for (const data of NORMAL_DATA) {
        const { mean, sd } = estimateOf(data)
        assert.ok(Math.abs(expectedOf(data, mean, sd).reduce((sum, value) => sum + value, 0) - totalOf(data)) < 1e-9)
    }
    assert.ok(Math.abs(percentOf(NORMAL_DATA[0], 1700, 100) - 2.88) < 0.01)
    assert.ok(Math.abs(percentOf(NORMAL_DATA[1], 75, 50) - 9.15) < 0.01)
    assert.deepEqual(NORMAL_DATA.map((data) => accepted(data, estimateOf(data).mean, estimateOf(data).sd)), [true, false, true])
    assert.deepEqual([0, 1, 2].map((data) => fitNormalPrediction({ ...initialFitNormalState, data })), ['<', '>', '<'])
    const rejected = firstRejectedSd(NORMAL_DATA[2])
    assert.ok(rejected > 20 && !accepted(NORMAL_DATA[2], 60, rejected) && accepted(NORMAL_DATA[2], 60, rejected - 5))
    checkTexts(NORMAL_DATA.map((data) => data.title))
    checkChallenges(fitNormalChallenges, initialFitNormalState, {
        140121: setFitNormal(initialFitNormalState, { mean: 1700, sd: 100 }),
        140122: setFitNormal(initialFitNormalState, { data: 1, mean: 75, sd: 50 }),
        140123: setFitNormal(initialFitNormalState, { data: 2, mean: 60, sd: rejected })
    })
    checkExtras(fitNormalExtra, initialFitNormalState, (state: FitNormalState) => setFitNormal(state, {}), 4)
})
