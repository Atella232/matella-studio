import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { initialTailState, selectTail, setTailCount, tailChallenges, tailExtra, tailMean, tailMedian, tailModes, tailPercentile, tailPrediction, type TailState } from '../src/pages/batx1-zientziak-estatistika/lab/histogramTail.ts'
import { bachStatsLabChallengeIds, bachStatsLabToolForTopic, bachStatsLabTools } from '../src/pages/batx1-zientziak-estatistika/lab/labTools.ts'
import { allData, FIXED_TIMES, initialOutlierState, limitsOf, meanOf, outlierChallenges, outlierExtra, outlierKind, setOutlier, sigmaOf, type OutlierState } from '../src/pages/batx1-zientziak-estatistika/lab/outlierBand.ts'
import { halfLatex, initialScoreState, scoreChallenges, scoreExtra, scorePrediction, setScore, zLatex, zScore, type ScoreState } from '../src/pages/batx1-zientziak-estatistika/lab/standardScore.ts'
import { bachStatsLessonChecks } from '../src/pages/batx1-zientziak-estatistika/lessonChecks.ts'

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

test('estatistika batx1 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(bachStatsLabTools.length, 14)
    for (const stage of ['data', 'centre', 'position', 'spread', 'interpretation']) assert.ok(bachStatsLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of bachStatsLabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    }
    // The «Observe» text of the tools of this unit is plain text, without LaTeX and without Basque suffixes glued to numbers
    for (const tool of bachStatsLabTools.filter((item) => ['tail', 'outlier', 'score'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
        assert.ok(!/\d[a-zñ]/.test(tool.observe.eu), tool.observe.eu)
    }
    assert.equal(new Set(bachStatsLabChallengeIds).size, bachStatsLabChallengeIds.length)
    // The three tools of this unit use the 1141xx–1143xx block; the borrowed ones keep their ids
    const own = [...scoreChallenges, ...outlierChallenges, ...tailChallenges].map((challenge) => challenge.id)
    for (const id of own) assert.ok(id >= 114101 && id <= 114399, `${id}`)
    const topics = Object.keys(bachStatsLessonChecks)
    for (const [topic, tool] of Object.entries(bachStatsLabToolForTopic)) {
        assert.ok(topics.includes(topic), topic)
        assert.ok(bachStatsLabTools.some((item) => item.id === tool), `${topic} → ${tool}`)
    }
    for (const tool of bachStatsLabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
})

test('estatistika batx1 z lab: la puntuación típica', () => {
    // The lesson's student: z = 0,5 in Maths, z = 2 in Language
    assert.deepEqual(zScore(initialScoreState.groups[0]), { numerator: 1, denominator: 2 })
    assert.deepEqual(zScore(initialScoreState.groups[1]), { numerator: 2, denominator: 1 })
    assert.equal(scorePrediction(initialScoreState), '>')
    assert.equal(halfLatex(15), '7{,}5')
    assert.equal(zLatex({ numerator: -3, denominator: 2 }), '-1{,}5')
    assert.equal(zLatex({ numerator: 1, denominator: 3 }), '\\frac{1}{3}')
    // Changing a number forgets the prediction; the limits hold
    const predicted: ScoreState = { ...initialScoreState, prediction: '>' }
    assert.equal(setScore(predicted, 0, { mark: 17 }).prediction, null)
    assert.equal(setScore(predicted, 0, { mark: 16 }).prediction, '>')
    assert.equal(setScore(initialScoreState, 1, { sd: 0 }).groups[1].sd, 1)
    assert.equal(setScore(initialScoreState, 1, { mark: 30 }).groups[1].mark, 20)
    const solutions: Record<number, ScoreState> = {
        114101: setScore(initialScoreState, 0, { mean: 12, sd: 2, mark: 16 }),
        114102: setScore(setScore(initialScoreState, 0, { mean: 10, sd: 2, mark: 12 }), 1, { mean: 12, sd: 2, mark: 14 }),
        114103: setScore(setScore(initialScoreState, 0, { mean: 10, sd: 2, mark: 14 }), 1, { mean: 12, sd: 2, mark: 14 })
    }
    checkChallenges(scoreChallenges, initialScoreState, solutions)
    checkExtras(scoreExtra, initialScoreState, (state) => setScore(setScore(state, 0, state.groups[0]), 1, state.groups[1]))
})

test('estatistika batx1 z lab: ¿atípico o no?', () => {
    // With the datum at 20: x̄ = 20 and σ² = 8
    assert.equal(FIXED_TIMES.length, 19)
    assert.equal(meanOf(allData(20)), 20)
    assert.ok(Math.abs(sigmaOf(allData(20)) ** 2 - 8) < 1e-9)
    // The datum hides itself: 32 is not an outlier, 33 is; 8 is not, 7 is
    assert.equal(outlierKind(32, 'sigma'), '=')
    assert.equal(outlierKind(33, 'sigma'), '>')
    assert.equal(outlierKind(8, 'sigma'), '=')
    assert.equal(outlierKind(7, 'sigma'), '<')
    // The box rule: Q₁ = 18, Q₃ = 22 with the datum at 20
    assert.deepEqual(limitsOf(20, 'box'), [12, 28])
    // A far datum widens the band
    assert.ok(limitsOf(50, 'sigma')[1] > limitsOf(30, 'sigma')[1] + 5)
    const predicted: OutlierState = { ...initialOutlierState, prediction: '=' }
    assert.equal(setOutlier(predicted, { datum: 21 }).prediction, null)
    assert.equal(setOutlier(predicted, { rule: 'box' }).prediction, null)
    assert.equal(setOutlier(initialOutlierState, { datum: 80 }).datum, 50)
    const solutions: Record<number, OutlierState> = {
        114201: setOutlier(initialOutlierState, { datum: 40 }),
        114202: setOutlier(initialOutlierState, { datum: 30 }),
        114203: setOutlier(initialOutlierState, { datum: 0 })
    }
    checkChallenges(outlierChallenges, initialOutlierState, solutions)
    checkExtras(outlierExtra, initialOutlierState, (state) => setOutlier(state, state))
})

test('estatistika batx1 z lab: la cola del histograma', () => {
    // The starting bars: Mo = 1, Me = 2, x̄ = 2,2 (tail on the right)
    assert.deepEqual(tailModes(initialTailState.counts), [1])
    assert.equal(tailMedian(initialTailState.counts), 2)
    assert.deepEqual(tailMean(initialTailState.counts), { numerator: 11, denominator: 5 })
    assert.equal(tailPrediction(initialTailState), '>')
    assert.equal(tailPercentile(initialTailState.counts, 25), 1)
    assert.equal(tailPercentile(initialTailState.counts, 75), 3)
    // At least one datum stays; the selection is kept inside the bars
    const one: TailState = { ...initialTailState, counts: [0, 0, 0, 1, 0, 0, 0] }
    assert.deepEqual(setTailCount(one, 3, 0), one)
    assert.equal(selectTail(initialTailState, 9).selected, 6)
    assert.equal(setTailCount({ ...initialTailState, prediction: '>' }, 6, 4).prediction, null)
    const solutions: Record<number, TailState> = {
        114301: { ...initialTailState, counts: [0, 1, 2, 4, 2, 1, 0] },
        114302: { ...initialTailState, counts: [1, 0, 1, 2, 3, 5, 0] },
        // 2 six times and 6 twice: x̄ = 24 / 8 = 3, but Me = 2
        114303: { ...initialTailState, counts: [0, 0, 6, 0, 0, 0, 2] }
    }
    checkChallenges(tailChallenges, initialTailState, solutions)
    checkExtras(tailExtra, initialTailState, (state) => state.counts.reduce((current, count, value) => setTailCount(current, value, count), { ...state }))
})
