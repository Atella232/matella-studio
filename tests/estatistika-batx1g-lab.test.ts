import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { betweenChallenges, betweenExtra, betweenPrediction, BETWEEN_TABLES, initialBetweenState, insideCount, setBetween, type BetweenState } from '../src/pages/batx1-gizarte-estatistika/lab/between.ts'
import { socialStatsLabChallengeIds, socialStatsLabToolForTopic, socialStatsLabTools } from '../src/pages/batx1-gizarte-estatistika/lab/labTools.ts'
import { initialOgiveState, OGIVE_TABLES, ogiveChallenges, ogiveExtra, ogivePrediction, percentileOf, percentOfValue, polygonOf, setOgive, type OgiveState } from '../src/pages/batx1-gizarte-estatistika/lab/ogive.ts'
import { barsOf, heightLatex, HOURS, initialWidthsState, setCut, widthsChallenges, widthsExtra, widthsPrediction, type WidthsState } from '../src/pages/batx1-gizarte-estatistika/lab/widths.ts'
import { socialStatsLessonChecks } from '../src/pages/batx1-gizarte-estatistika/lessonChecks.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const
const borrowedLessons = ['population-sample', 'frequency-tables', 'class-intervals', 'centre-measures', 'grouped-centre', 'quartiles-percentiles', 'box-plot', 'variance-sd', 'coefficient-variation']
const near = (a: number, b: number) => Math.abs(a - b) < 1e-9

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), text[language])
        // No Basque suffix glued to a number or to a formula
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|era|tik|z|ei|en|k|i)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/§(?:ri|ren|rekin|z|ra|tik|ei)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '§')), text.eu)
    }
}

/** Every fixed challenge is solved by a state we name, and none is solved when the tool opens */
function checkChallenges<State>(challenges: LabChallenge<State>[], initial: State, solutions: Record<number, State>) {
    assert.equal(new Set(challenges.map((challenge) => challenge.id)).size, challenges.length)
    for (const challenge of challenges) {
        assert.ok(challenge.isSolved(solutions[challenge.id]), `${challenge.id} is not solved by its solution`)
        assert.ok(!challenge.isSolved(initial), `${challenge.id} starts solved`)
    }
    checkTexts(challenges.flatMap((challenge) => [challenge.prompt, challenge.hint]))
}

/** The endless challenges: well formed, solvable by their own solution, reachable, never solved at the start */
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

test('estatistika batx1 g lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(socialStatsLabTools.length, 11)
    for (const stage of ['data', 'centre', 'position', 'spread', 'interpretation']) assert.ok(socialStatsLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of socialStatsLabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    }
    // The «Observe» text of the tools of this unit is plain text, without LaTeX and without Basque suffixes glued to numbers
    for (const tool of socialStatsLabTools.filter((item) => ['widths', 'ogive', 'between'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
        assert.ok(!/\d[a-zñ]/.test(tool.observe.eu), tool.observe.eu)
    }
    assert.equal(new Set(socialStatsLabChallengeIds).size, socialStatsLabChallengeIds.length)
    // The three tools of this unit use the 1371xx–1373xx block; the borrowed ones keep their ids
    const own = [...ogiveChallenges, ...betweenChallenges, ...widthsChallenges].map((challenge) => challenge.id)
    assert.equal(own.length, 9)
    for (const id of own) assert.ok(id >= 137101 && id <= 137399, `${id}`)
    const topics = [...borrowedLessons, ...Object.keys(socialStatsLessonChecks)]
    for (const [topic, tool] of Object.entries(socialStatsLabToolForTopic)) {
        assert.ok(topics.includes(topic), topic)
        assert.ok(socialStatsLabTools.some((item) => item.id === tool), `${topic} → ${tool}`)
    }
    for (const tool of socialStatsLabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
})

test('estatistika batx1 g lab: el polígono acumulado', () => {
    // The tables add up to 100 % and the first one is the lesson's: Q1 = 35, Me = 42,5, 45 → P60
    for (const table of OGIVE_TABLES) assert.equal(table.bars.reduce((sum, bar) => sum + bar.percent, 0), 100)
    assert.deepEqual(polygonOf(OGIVE_TABLES[0]), [[20, 0], [30, 10], [40, 40], [50, 80], [60, 100]])
    assert.equal(percentileOf(OGIVE_TABLES[0], 25).value, 35)
    assert.equal(percentileOf(OGIVE_TABLES[0], 50).value, 42.5)
    assert.equal(percentOfValue(OGIVE_TABLES[0], 45).value, 60)
    // The two directions undo each other
    for (const table of OGIVE_TABLES) for (let k = 1; k < 100; k += 1) assert.ok(near(percentOfValue(table, percentileOf(table, k).value).value, k))
    // P50 = 42,5 is before the class mark 45
    assert.equal(ogivePrediction(initialOgiveState), '<')
    assert.equal(ogivePrediction(setOgive(initialOgiveState, { mode: 'value', x: 42 })), '<')
    assert.equal(ogivePrediction(setOgive(initialOgiveState, { mode: 'value', x: 44 })), '>')
    // Changing something forgets the prediction; the limits hold; x follows its grid
    const predicted: OgiveState = { ...initialOgiveState, prediction: '<' }
    assert.equal(setOgive(predicted, { k: 51 }).prediction, null)
    assert.equal(setOgive(predicted, { k: 50 }).prediction, '<')
    assert.equal(setOgive(initialOgiveState, { k: 150 }).k, 99)
    assert.equal(setOgive(initialOgiveState, { table: 2 }).x, 140)
    assert.equal(setOgive(setOgive(initialOgiveState, { table: 2 }), { x: 141 }).x, 142)
    const solutions: Record<number, OgiveState> = {
        137101: setOgive(initialOgiveState, { k: 60 }),
        137102: setOgive(setOgive(initialOgiveState, { table: 1, mode: 'value' }), { x: 28 }),
        137103: setOgive(initialOgiveState, { table: 2, k: 60 })
    }
    checkChallenges(ogiveChallenges, initialOgiveState, solutions)
    checkExtras(ogiveExtra, initialOgiveState, (state) => setOgive(state, { table: state.table, mode: state.mode, k: state.k, x: state.x }))
})

test('estatistika batx1 g lab: ¿cuántos caben?', () => {
    // The lesson's parts: 365 between 46 and 54; the waits: x̄ ± σ holds 30,8
    assert.equal(insideCount(BETWEEN_TABLES[0], 46, 54), 365)
    assert.ok(near(insideCount(BETWEEN_TABLES[1], 13, 27), 30.8))
    assert.equal(insideCount(BETWEEN_TABLES[0], 40, 60), 500)
    assert.equal(betweenPrediction(initialBetweenState), '>')
    // The cuts never cross, and the one that moves pushes the other
    assert.deepEqual([setBetween(initialBetweenState, { low: 58 }).low, setBetween(initialBetweenState, { low: 58 }).high], [58, 59])
    assert.deepEqual([setBetween(initialBetweenState, { high: 41 }).low, setBetween(initialBetweenState, { high: 41 }).high], [40, 41])
    const predicted: BetweenState = { ...initialBetweenState, prediction: '>' }
    assert.equal(setBetween(predicted, { low: 45 }).prediction, null)
    assert.equal(setBetween(predicted, { low: 44 }).prediction, '>')
    const solutions: Record<number, BetweenState> = {
        137201: setBetween(initialBetweenState, { low: 46, high: 54 }),
        137202: setBetween(setBetween(initialBetweenState, { table: 1 }), { low: 13, high: 27 }),
        137203: setBetween(setBetween(initialBetweenState, { table: 1 }), { low: 15, high: 25 })
    }
    checkChallenges(betweenChallenges, initialBetweenState, solutions)
    checkExtras(betweenExtra, initialBetweenState, (state) => setBetween(state, { table: state.table, low: state.low, high: state.high }))
})

test('estatistika batx1 g lab: anchos distintos', () => {
    assert.equal(HOURS.reduce((sum, count) => sum + count, 0), 50)
    // The first state: f = 8, 28, 14; drawn well 4, 7 and 2,33: the widest bar looks the biggest with height f
    const bars = barsOf(initialWidthsState.cuts)
    assert.deepEqual(bars.map((bar) => bar.count), [8, 28, 14])
    assert.deepEqual(bars.map((bar) => bar.height.numerator / bar.height.denominator).map((value) => Math.round(value * 100) / 100), [4, 7, 2.33])
    assert.equal(widthsPrediction(initialWidthsState), '<')
    assert.equal(heightLatex({ numerator: 7, denominator: 3 }), '\\frac{7}{3}')
    assert.equal(heightLatex({ numerator: 5, denominator: 2 }), '2{,}5')
    // The cuts stay inside and never cross
    assert.deepEqual(setCut(initialWidthsState, 0, 9).cuts, [9, 10])
    assert.deepEqual(setCut(initialWidthsState, 1, 1).cuts, [1, 2])
    assert.deepEqual(setCut(initialWidthsState, 1, 30).cuts, [2, 11])
    const predicted: WidthsState = { ...initialWidthsState, prediction: '<' }
    assert.equal(setCut(predicted, 0, 3).prediction, null)
    assert.equal(setCut(predicted, 0, 2).prediction, '<')
    const solutions: Record<number, WidthsState> = {
        137301: setCut(initialWidthsState, 1, 4),
        137302: setCut(initialWidthsState, 0, 3),
        137303: setCut(initialWidthsState, 1, 3)
    }
    checkChallenges(widthsChallenges, initialWidthsState, solutions)
    checkExtras(widthsExtra, initialWidthsState, (state) => setCut(setCut(state, 0, state.cuts[0]), 1, state.cuts[1]))
})
