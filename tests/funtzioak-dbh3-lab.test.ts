import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker, LocalizedText } from '../src/features/unit-v2/lab/types.ts'
import { functions3LabChallengeIds, functions3LabToolForTopic, functions3LabTools } from '../src/pages/dbh3-funtzioak/lab/labTools.ts'
import { initialWalkState, setWalkSpeed, walkChallenges, walkExtra, walkFarthest, walkPositions, walkPrediction, type WalkState } from '../src/pages/dbh3-funtzioak/lab/walk.ts'
import { initialTaxiState, setTaxi, taxiChallenges, taxiCost, taxiExtra, taxiPrediction, type TaxiState } from '../src/pages/dbh3-funtzioak/lab/taxi.ts'
import { initialPlansState, planA, planB, plansChallenges, plansCrossing, plansExtra, plansPrediction, setPlans, type PlansState } from '../src/pages/dbh3-funtzioak/lab/plans.ts'
import { initialThrowState, setThrow, throwChallenges, throwExtra, throwHeight, throwLanding, throwPrediction, throwVertex, type ThrowState } from '../src/pages/dbh3-funtzioak/lab/throw.ts'

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




test('funtzioak 3. DBH lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(functions3LabTools.length, 13)
    for (const stage of ['graphs', 'features', 'linear', 'lines', 'quadratic']) assert.ok(functions3LabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of functions3LabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
        assert.ok(!tool.observe.es.includes('$') && !tool.observe.eu.includes('$') && !tool.observe.ar.includes('$'), tool.id)
    }
    assert.equal(new Set(functions3LabChallengeIds).size, functions3LabChallengeIds.length)
    const own = [walkChallenges, taxiChallenges, plansChallenges, throwChallenges].flatMap((list) => list.map((challenge) => challenge.id))
    for (const id of own) assert.ok(id >= 38101 && id <= 38499, `${id}`)
    const topics = ['function-concept', 'domain-range', 'reading-graphs', 'growth', 'extremes', 'intercepts', 'proportional', 'slope', 'affine', 'two-points', 'parallel-lines', 'linear-problems', 'parabola-shape', 'vertex', 'parabola-intercepts']
    for (const topic of topics) assert.ok(functions3LabToolForTopic[topic], topic)
    for (const id of Object.values(functions3LabToolForTopic)) assert.ok(functions3LabTools.some((tool) => tool.id === id), id)
})

test('funtzioak 3. DBH lab: el paseo', () => {
    const at = (...speeds: number[]): WalkState => speeds.reduce((state, speed, hour) => setWalkSpeed(state, hour, speed), initialWalkState)
    assert.deepEqual(walkPositions([2, 0, -1, 3]), [0, 2, 2, 1, 4])
    // Never behind home and never beyond 10 km
    assert.deepEqual(walkPositions(at(1, -4, -4, 2).speeds), [0, 1, 0, 0, 2])
    assert.ok(walkFarthest(at(4, 4, 4, 4)) <= 10)
    assert.equal(walkPrediction(initialWalkState), '=')
    assert.equal(walkPrediction(at(3, 2, -1, -1)), '>')
    // A new speed forgets the old guess
    assert.equal(setWalkSpeed({ ...initialWalkState, prediction: '<' }, 0, 2).prediction, null)
    checkChallenges(walkChallenges, initialWalkState, { 38101: at(3, 3, -3, -3), 38102: at(2, 2, 0, -4), 38103: at(2, 3, 1, -1), 38104: at(3, -1, -1, -1), 38105: at(4, 3, 2, 1) })
    checkExtras(walkExtra, initialWalkState)
})

test('funtzioak 3. DBH lab: el taxímetro', () => {
    const at = (start: number, perKm: number, km: number): TaxiState => setTaxi(initialTaxiState, { start, perKm, km })
    assert.equal(taxiCost(at(3, 1.5, 10)), 18)
    assert.equal(taxiCost(at(2, 1, 0)), 2)
    assert.equal(taxiPrediction(initialTaxiState), '<')
    assert.equal(taxiPrediction(at(4, 2, 8)), '=')
    assert.equal(at(7.3, 0.2, 13).start, 6)
    checkChallenges(taxiChallenges, initialTaxiState, { 38201: at(3, 1.5, 10), 38202: at(5, 2, 10), 38203: at(4, 1, 0), 38204: at(0, 2.5, 6), 38205: at(6, 1, 8) })
    checkExtras(taxiExtra, initialTaxiState)
})

test('funtzioak 3. DBH lab: dos tarifas', () => {
    const at = (m: number, n: number, month: number): PlansState => setPlans(initialPlansState, { m, n, month })
    assert.equal(plansCrossing(initialPlansState), 5)
    assert.equal(planA(5), planB(initialPlansState, 5))
    assert.equal(plansCrossing(at(5, 0, 1)), null)
    assert.equal(plansPrediction(initialPlansState), '<')
    assert.equal(plansPrediction(at(8, 5, 5)), '=')
    assert.equal(plansPrediction(at(8, 5, 9)), '>')
    checkChallenges(plansChallenges, initialPlansState, { 38301: at(8, 5, 5), 38302: at(5, 0, 2), 38303: at(10, 0, 4), 38304: at(5, 15, 2), 38305: at(5, 20, 2) })
    checkExtras(plansExtra, initialPlansState)
})

test('funtzioak 3. DBH lab: el lanzamiento', () => {
    const at = (v: number, h0: number, t: number): ThrowState => setThrow(initialThrowState, { v, h0, t })
    // The vertex is the highest point and the parabola is symmetric about it
    for (const v of [5, 10, 15, 20, 25, 30]) for (const h0 of [0, 5, 10, 15, 20]) {
        const state = at(v, h0, 0)
        const top = throwVertex(state)
        assert.ok(Math.abs(throwHeight(state, top.t) - top.h) < 1e-9)
        for (const d of [0.25, 0.5, 1]) {
            assert.ok(throwHeight(state, top.t + d) < top.h)
            if (top.t - d >= 0) assert.ok(Math.abs(throwHeight(state, top.t - d) - throwHeight(state, top.t + d)) < 1e-9)
        }
        assert.ok(Math.abs(throwHeight(state, throwLanding(state))) < 1e-9)
    }
    assert.equal(throwLanding(at(10, 15, 0)), 3)
    assert.equal(throwPrediction(initialThrowState), '<')
    assert.equal(throwPrediction(at(20, 0, 0)), '=')
    // Moving the cursor keeps the guess; a new throw forgets it
    assert.equal(setThrow({ ...initialThrowState, prediction: '<' }, { t: 3 }).prediction, '<')
    assert.equal(setThrow({ ...initialThrowState, prediction: '<' }, { v: 20 }).prediction, null)
    checkChallenges(throwChallenges, initialThrowState, { 38401: at(20, 0, 0), 38402: at(25, 0, 2.5), 38403: at(20, 0, 0), 38404: at(10, 15, 3), 38405: at(20, 0, 3) })
    checkExtras(throwExtra, initialThrowState)
})
