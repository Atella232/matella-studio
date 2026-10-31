import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker, LocalizedText } from '../src/features/unit-v2/lab/types.ts'
import { sequencesLabChallengeIds, sequencesLabToolForTopic, sequencesLabTools } from '../src/pages/dbh3-segidak/lab/labTools.ts'
import { initialSticksState, setSticks, sticksChallenges, sticksExtra, sticksPrediction, sticksValue, type SticksState } from '../src/pages/dbh3-segidak/lab/sticks.ts'
import { frogChallenges, frogExtra, frogPrediction, frogTerm, initialFrogState, setFrog, type FrogState } from '../src/pages/dbh3-segidak/lab/frog.ts'
import { gaussChallenges, gaussExtra, gaussPrediction, gaussSum, initialGaussState, setGauss, type GaussState } from '../src/pages/dbh3-segidak/lab/gaussBars.ts'
import { bounceChallenges, bounceExtra, bounceHeight, bouncePrediction, initialBounceState, setBounce, type BounceState } from '../src/pages/dbh3-segidak/lab/bounce.ts'
import { barChallenges, barExtra, barLimit, barPartial, barPrediction, initialBarState, setBar, type BarState } from '../src/pages/dbh3-segidak/lab/endlessBar.ts'

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
        assert.ok(challenge.isSolved(solutions[challenge.id]), `${challenge.id} is not solved by its solution`)
        assert.ok(!challenge.isSolved(initial), `${challenge.id} starts solved`)
    }
    checkTexts(challenges.flatMap((challenge) => [challenge.prompt, challenge.hint]))
}

/** The endless challenges: well formed, solvable by their own solution, never solved at the start */
function checkExtras<State>(maker: LabChallengeMaker<State>, initial: State) {
    const prompts = new Set<string>()
    for (let seed = 1; seed <= 150; seed += 1) {
        const challenge = maker(createRandom(seed * 7919 + 3))
        assert.ok(challenge.isSolved(challenge.solution), `seed ${seed}: ${challenge.prompt.es}`)
        assert.ok(!challenge.isSolved(initial), `seed ${seed} starts solved`)
        checkTexts([challenge.prompt, challenge.hint])
        prompts.add(challenge.prompt.es)
    }
    assert.ok(prompts.size >= 6, `only ${prompts.size} different challenges`)
}

test('segidak 3. DBH lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(sequencesLabTools.length, 5)
    const stages = ['sequences', 'arithmetic', 'sums', 'geometric', 'geo-sums']
    for (const stage of stages) assert.ok(sequencesLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of sequencesLabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
        assert.ok(!tool.observe.es.includes('$') && !tool.observe.eu.includes('$') && !tool.observe.ar.includes('$'), tool.id)
    }
    assert.equal(new Set(sequencesLabChallengeIds).size, sequencesLabChallengeIds.length)
    for (const id of sequencesLabChallengeIds) assert.ok(id >= 89101 && id <= 89999, `${id}`)
    const topics = ['terms', 'general-term', 'recursive', 'arith-difference', 'arith-general', 'arith-find', 'gauss', 'arith-sum', 'arith-problems', 'geo-ratio', 'geo-general', 'geo-find', 'geo-sum', 'geo-infinite', 'geo-problems']
    for (const topic of topics) assert.ok(sequencesLabToolForTopic[topic], topic)
})

test('segidak 3. DBH lab: los patrones de palillos', () => {
    const at = (pattern: number, n: number): SticksState => setSticks({ ...initialSticksState, pattern }, { n })
    assert.deepEqual([0, 1, 2, 3].map((pattern) => sticksValue(at(pattern, 5))), [16, 11, 15, 25])
    assert.equal(sticksPrediction(at(0, 3)), '=')
    assert.equal(sticksPrediction(at(2, 3)), '>')
    checkChallenges(sticksChallenges, initialSticksState, { 89101: at(0, 10), 89102: at(1, 12), 89103: at(2, 6), 89104: at(3, 7), 89105: at(2, 8) })
    assert.ok(sticksChallenges[4].isSolved(at(3, 6)))
    checkExtras(sticksExtra, initialSticksState)
})

test('segidak 3. DBH lab: la rana en la recta', () => {
    const at = (a1: number, d: number, n: number): FrogState => setFrog(initialFrogState, { a1, d, n })
    assert.equal(frogTerm(at(2, 3, 10)), 29)
    assert.equal(frogPrediction(at(5, -2, 4)), '<')
    assert.equal(frogPrediction(at(5, 0, 4)), '=')
    checkChallenges(frogChallenges, initialFrogState, { 89201: at(2, 3, 10), 89202: at(12, -3, 5), 89203: at(6, 2, 8), 89204: at(7, 0, 6), 89205: at(12, -1, 15) })
    checkExtras(frogExtra, initialFrogState)
})

test('segidak 3. DBH lab: las barras de Gauss', () => {
    const at = (a1: number, d: number, n: number): GaussState => setGauss(initialGaussState, { a1, d, n })
    assert.equal(gaussSum(at(1, 1, 10)), 55)
    assert.equal(gaussPrediction(at(1, 2, 10)), '=')
    checkChallenges(gaussChallenges, initialGaussState, { 89301: at(1, 1, 10), 89302: at(1, 2, 10), 89303: at(5, 2, 6), 89304: at(3, 2, 8), 89305: at(2, 4, 7) })
    checkExtras(gaussExtra, initialGaussState)
})

test('segidak 3. DBH lab: la pelota que rebota', () => {
    const at = (height: number, ratio: number, n: number): BounceState => setBounce(initialBounceState, { height, ratio, n })
    assert.equal(bounceHeight(at(2, 1, 4)), 10)
    assert.equal(bouncePrediction(at(2, 1, 1)), '=')
    assert.equal(bouncePrediction(at(2, 4, 1)), '>')
    assert.equal(bouncePrediction(at(2, 1, 2)), '<')
    checkChallenges(bounceChallenges, initialBounceState, { 89401: at(2, 1, 4), 89402: at(5, 2, 3), 89403: at(6, 3, 4), 89404: at(4, 4, 2), 89405: at(3, 0, 4) })
    checkExtras(bounceExtra, initialBounceState)
})

test('segidak 3. DBH lab: la barra que nunca se llena', () => {
    const at = (first: number, ratio: number, pieces = 1): BarState => setBar(initialBarState, { first, ratio, pieces })
    assert.deepEqual(barLimit(at(0, 0)), { numerator: 1, denominator: 1 })
    assert.deepEqual(barPartial(at(0, 0, 3)), { numerator: 7, denominator: 8 })
    assert.equal(barPrediction(at(3, 0)), '>')
    // The partial sums never reach the limit
    for (let first = 0; first < 5; first += 1) for (let ratio = 0; ratio < 4; ratio += 1) for (let pieces = 1; pieces <= 10; pieces += 1) {
        const state = at(first, ratio, pieces)
        const partial = barPartial(state)
        const limit = barLimit(state)
        assert.ok(partial.numerator * limit.denominator < limit.numerator * partial.denominator)
    }
    checkChallenges(barChallenges, initialBarState, { 89501: at(2, 1), 89502: at(2, 3), 89503: at(0, 0, 7), 89504: at(1, 2) })
    checkExtras(barExtra, initialBarState)
})
