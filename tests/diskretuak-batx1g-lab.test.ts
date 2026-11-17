import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { accepted, bestP, estimateOf, expectedOf, FIT_DATA, fitChallenges, fitExtra, fitPrediction, firstRejectedAbove, initialFitState, percentOf, setFit, type FitState } from '../src/pages/batx1-gizarte-diskretuak/lab/fit.ts'
import { ballsOf, dropBalls, emptyBoard, galtonBars, galtonChallenges, galtonExtra, galtonPrediction, initialGaltonState, likeliest, pathsTo, setGalton, type GaltonState } from '../src/pages/batx1-gizarte-diskretuak/lab/galton.ts'
import { discreteBatx1gLabChallengeIds, discreteBatx1gLabToolForTopic, discreteBatx1gLabTools } from '../src/pages/batx1-gizarte-diskretuak/lab/labTools.ts'
import { gainCents, initialRaffleState, profitOf, raffleChallenges, raffleExtra, rafflePrediction, setRaffle } from '../src/pages/batx1-gizarte-diskretuak/lab/raffle.ts'
import { discreteBatx1gLessonChecks } from '../src/pages/batx1-gizarte-diskretuak/lessonChecks.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        const formulas = (value: string) => [...value.matchAll(/\$([^$]+)\$/g)].map((match) => match[1].replace(/\{,\}/g, '.')).sort()
        for (const language of ['eu', 'en', 'ar'] as const) assert.deepEqual(formulas(text[language]), formulas(text.es), `${language}: ${text[language]}`)
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/§(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '§')), text.eu)
        const words = (value: string) => value.replace(/\$[^$]+\$/g, ' ')
        assert.ok(!/\d\.\d/.test(words(text.es)) && !/\d\.\d/.test(words(text.eu)), text.es)
        assert.ok(!/\d,\d/.test(words(text.en)) && !/\d,\d/.test(words(text.ar)), text.en)
        assert.ok(!/\d\s*€/.test(words(text.en)), text.en)
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

test('diskretuak batx1 g lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(discreteBatx1gLabTools.length, 6)
    for (const stage of ['review', 'variable', 'binomial', 'fit']) assert.ok(discreteBatx1gLabTools.some((tool) => tool.stage === stage), stage)
    const topics = Object.keys(discreteBatx1gLessonChecks)
    for (const tool of discreteBatx1gLabTools) assert.ok(topics.includes(tool.lessonTopic), tool.id)
    assert.deepEqual(Object.keys(discreteBatx1gLabToolForTopic).sort(), [...topics].sort())
    for (const tool of discreteBatx1gLabTools.filter((item) => ['galton', 'raffle', 'fit'].includes(item.id))) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && !tool.observe[language].includes('$'), `${tool.id} ${language}`)
        assert.ok(!/\d[a-zñ]/.test(tool.observe.eu), tool.observe.eu)
        assert.ok(/[؀-ۿ]/.test(tool.observe.ar) && tool.observe.eu !== tool.observe.es, tool.id)
        assert.ok(!/\d,\d/.test(tool.observe.en) && !/\d,\d/.test(tool.observe.ar) && !/\d\.\d/.test(tool.observe.es), tool.id)
    }
    // The own challenges are in this unit's block; the borrowed ones keep the ids of their units
    const own = [...galtonChallenges, ...raffleChallenges, ...fitChallenges].map((challenge) => challenge.id)
    assert.ok(own.every((id) => id >= 139101 && id <= 139399))
    assert.equal(new Set(discreteBatx1gLabChallengeIds).size, discreteBatx1gLabChallengeIds.length)
})

test('diskretuak batx1 g lab: the Galton board', () => {
    // Paths and the bars of the theory
    assert.deepEqual([0, 1, 2, 3, 4].map((bin) => pathsTo(initialGaltonState, bin)), [1, 4, 6, 4, 1])
    const bars = galtonBars(initialGaltonState)
    assert.ok(Math.abs(bars.reduce((sum, value) => sum + value, 0) - 1) < 1e-12)
    assert.ok(Math.abs(bars[2] - 6 / 16) < 1e-12)
    assert.deepEqual(likeliest({ rows: 4, p: 5 }), [2])
    assert.deepEqual(likeliest({ rows: 5, p: 5 }), [2, 3])
    assert.deepEqual(likeliest({ rows: 4, p: 7 }), [3])
    assert.deepEqual(likeliest({ rows: 4, p: 6 }), [2, 3])
    assert.equal(galtonPrediction({ p: 3 }), '<')
    assert.equal(galtonPrediction({ p: 5 }), '=')
    assert.equal(galtonPrediction({ p: 8 }), '>')
    // Drops are seeded: the same state gives the same balls, and many balls look like the theory
    const once = dropBalls(initialGaltonState, 10)
    assert.deepEqual(dropBalls(initialGaltonState, 10), once)
    assert.equal(ballsOf(once), 10)
    assert.equal(once.lastPath.length, 4)
    let many: GaltonState = initialGaltonState
    for (let index = 0; index < 20; index++) many = dropBalls(many, 100)
    assert.equal(ballsOf(many), 2000)
    many.counts.forEach((count, bin) => assert.ok(Math.abs(count / 2000 - bars[bin]) < 0.04, `bin ${bin}`))
    // A tilted board piles the balls near np
    let tilted = setGalton(initialGaltonState, { rows: 10, p: 2 })
    for (let index = 0; index < 10; index++) tilted = dropBalls(tilted, 100)
    assert.equal(tilted.counts.indexOf(Math.max(...tilted.counts)), 2)
    // Changing the board empties it; emptying keeps the board
    assert.equal(ballsOf(setGalton(once, { rows: 6 })), 0)
    assert.equal(setGalton(once, { selected: 1 }).counts, once.counts)
    assert.equal(ballsOf(emptyBoard(once)), 0)
    checkChallenges(galtonChallenges, initialGaltonState, {
        139101: setGalton(initialGaltonState, { rows: 5, selected: 2 }),
        139102: setGalton(setGalton(initialGaltonState, { rows: 6 }), { selected: 6 }),
        139103: setGalton(initialGaltonState, { p: 7 })
    })
    checkExtras(galtonExtra, initialGaltonState, (state) => setGalton(state, {}))
})

test('diskretuak batx1 g lab: the fair raffle', () => {
    assert.equal(gainCents(initialRaffleState), -60)
    assert.equal(profitOf(initialRaffleState), 60)
    assert.equal(rafflePrediction(initialRaffleState), '<')
    const fair = setRaffle(initialRaffleState, { big: 200, smallCount: 0 })
    assert.equal(gainCents(fair), 0)
    assert.equal(rafflePrediction(fair), '=')
    assert.equal(rafflePrediction(setRaffle(initialRaffleState, { price: 1, big: 500 })), '>')
    // The gain is exact in cents for every ticket count
    for (const tickets of [100, 200, 500]) for (let big = 0; big <= 500; big += 50) assert.ok(Number.isInteger(gainCents({ ...initialRaffleState, tickets, big })))
    // A changed setting asks for a new prediction
    assert.equal(setRaffle({ ...initialRaffleState, prediction: '<' }, { price: 3 }).prediction, null)
    assert.equal(setRaffle({ ...initialRaffleState, prediction: '<' }, {}).prediction, '<')
    checkChallenges(raffleChallenges, initialRaffleState, {
        139121: fair,
        139122: setRaffle(initialRaffleState, { tickets: 500, price: 1, big: 200, smallCount: 0 }),
        139123: setRaffle(initialRaffleState, { tickets: 200, price: 1, big: 50, smallCount: 5, small: 10 })
    })
    checkExtras(raffleExtra, initialRaffleState, (state) => setRaffle(state, {}))
})

test('diskretuak batx1 g lab: fitting the data', () => {
    assert.deepEqual(FIT_DATA.map(estimateOf), [50, 20, 50])
    assert.deepEqual(expectedOf(FIT_DATA[0], 50).map((value) => Math.round(value * 1000) / 1000), [10, 30, 30, 10])
    assert.ok(Math.abs(percentOf(FIT_DATA[0], 50) - 3.75) < 1e-9)
    assert.ok(Math.abs(percentOf(FIT_DATA[1], 20) - 12) < 1e-9)
    assert.ok(Math.abs(percentOf(FIT_DATA[2], 50) - 2.5) < 1e-9)
    assert.deepEqual(FIT_DATA.map((data) => accepted(data, estimateOf(data))), [true, false, true])
    assert.deepEqual([0, 1, 2].map((data) => fitPrediction({ data, p: 30, prediction: null })), ['<', '>', '<'])
    // No p makes the welds a binomial: the shape is wrong
    assert.ok(!accepted(FIT_DATA[1], bestP(FIT_DATA[1])))
    const rejected = firstRejectedAbove(FIT_DATA[2], 50)
    assert.ok(rejected > 50 && !accepted(FIT_DATA[2], rejected) && accepted(FIT_DATA[2], rejected - 5))
    // Changing the table asks for a new prediction; p stays in steps of 0,05
    assert.equal(setFit({ ...initialFitState, prediction: '<' }, { data: 1 }).prediction, null)
    assert.equal(setFit(initialFitState, { p: 33 }).p, 35)
    checkTexts(FIT_DATA.map((data) => data.title))
    checkChallenges(fitChallenges, initialFitState, {
        139111: setFit(initialFitState, { p: 50 }),
        139112: setFit(initialFitState, { data: 1, p: 20 }),
        139113: setFit(initialFitState, { data: 2, p: rejected })
    })
    checkExtras(fitExtra, initialFitState, (state: FitState) => setFit(state, {}))
})
