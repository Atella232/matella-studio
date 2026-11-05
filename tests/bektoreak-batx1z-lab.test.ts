import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { bachVectorsLabChallengeIds, bachVectorsLabToolForTopic, bachVectorsLabTools } from '../src/pages/batx1-zientziak-bektoreak/lab/labTools.ts'
import { crossingTime, initialRiverState, landing, realVelocity, riverChallenges, riverExtra, riverPrediction, setRiver, speedSquare, type RiverState } from '../src/pages/batx1-zientziak-bektoreak/lab/river.ts'
import { angleOf, dotOf, initialShadowState, setShadow, shadowChallenges, shadowExtra, shadowFoot, shadowLength, shadowPrediction, type ShadowState } from '../src/pages/batx1-zientziak-bektoreak/lab/shadow.ts'
import { coordinatesLatex, initialSkewState, isBasis, setSkew, skewChallenges, skewCoordinates, skewExtra, skewPrediction, type SkewState } from '../src/pages/batx1-zientziak-bektoreak/lab/skewGrid.ts'

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
function checkExtras<State>(maker: LabChallengeMaker<State>, initial: State, setter: (state: State) => State) {
    const prompts = new Set<string>()
    for (let seed = 1; seed <= 150; seed += 1) {
        const challenge = maker(createRandom(seed * 7919 + 3))
        assert.ok(challenge.isSolved(challenge.solution), `seed ${seed}: ${challenge.prompt.es}`)
        // The solution is a state the controls can reach
        assert.deepEqual(setter(challenge.solution), challenge.solution, `seed ${seed}: unreachable ${challenge.prompt.es}`)
        assert.ok(!challenge.isSolved(initial), `seed ${seed} starts solved`)
        checkTexts([challenge.prompt, challenge.hint])
        prompts.add(challenge.prompt.es)
    }
    assert.ok(prompts.size >= 6, `only ${prompts.size} different challenges`)
}

test('bektoreak batx1 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(bachVectorsLabTools.length, 5)
    for (const stage of ['vectors', 'bases', 'dot', 'applications']) assert.ok(bachVectorsLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of bachVectorsLabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    }
    // The «Observe» text of the tools of this unit is plain text, not LaTeX
    for (const tool of bachVectorsLabTools.filter((item) => ['skew-grid', 'shadow', 'river'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
    }
    assert.equal(new Set(bachVectorsLabChallengeIds).size, bachVectorsLabChallengeIds.length)
    // The three tools of this unit use the 105xxx block; the borrowed ones keep their ids
    const own = [...skewChallenges, ...shadowChallenges, ...riverChallenges].map((challenge) => challenge.id)
    for (const id of own) assert.ok(id >= 105101 && id <= 105399, `${id}`)
    const topics = ['free-vectors', 'vector-operations', 'linear-combination', 'basis', 'basis-coordinates', 'dot-definition', 'dot-figures', 'dot-properties', 'orthonormal', 'modulus-unit', 'angle-vectors', 'perpendicular-vectors', 'projection', 'decomposition', 'forces']
    for (const [topic, tool] of Object.entries(bachVectorsLabToolForTopic)) {
        assert.ok(topics.includes(topic), topic)
        assert.ok(bachVectorsLabTools.some((item) => item.id === tool), `${topic} → ${tool}`)
    }
    for (const tool of bachVectorsLabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
})

test('bektoreak batx1 z lab: la cuadrícula torcida', () => {
    const at = (patch: Partial<SkewState>) => setSkew(initialSkewState, patch)
    // w = 3u − v in the basis u = (1, 1), v = (−1, 2)
    const first = at({ w: [4, 1] })
    const coordinates = skewCoordinates(first)!
    assert.deepEqual(coordinates.map((value) => [value.numerator, value.denominator]), [[3, 1], [-1, 1]])
    assert.equal(coordinatesLatex(coordinates), '(3,-1)_B')
    assert.equal(skewPrediction(first), '>')
    // Fractions: w = (1, 2) with u = (2, 0), v = (1, 1) is −½·u + 2·v
    const half = at({ u: [2, 0], v: [1, 1], w: [1, 2] })
    assert.deepEqual(skewCoordinates(half)!.map((value) => [value.numerator, value.denominator]), [[-1, 2], [2, 1]])
    assert.equal(skewPrediction(half), '<')
    assert.equal(coordinatesLatex(skewCoordinates(half)!), '(-\\frac{1}{2},2)_B')
    // Parallel vectors are no basis
    const flat = at({ u: [1, 2], v: [-1, -2] })
    assert.ok(!isBasis(flat))
    assert.equal(skewCoordinates(flat), null)
    assert.equal(skewPrediction(flat), null)
    // Every coordinate pair rebuilds w
    for (let seed = 0; seed < 200; seed++) {
        const state = at({ u: [(seed % 7) - 3, ((seed * 3) % 7) - 3], v: [((seed * 5) % 7) - 3, ((seed * 2) % 7) - 3], w: [((seed * 11) % 13) - 6, ((seed * 7) % 13) - 6] })
        const pair = skewCoordinates(state)
        if (!pair) continue
        const [a, b] = pair.map((value) => value.numerator / value.denominator)
        assert.ok(Math.abs(a * state.u[0] + b * state.v[0] - state.w[0]) < 1e-9 && Math.abs(a * state.u[1] + b * state.v[1] - state.w[1]) < 1e-9)
    }
    const predicted = { ...initialSkewState, prediction: '<' as const }
    assert.equal(setSkew(predicted, { w: [2, 2] }).prediction, null)
    assert.equal(setSkew(predicted, { w: initialSkewState.w }).prediction, '<')
    assert.deepEqual(at({ u: [9, -9] }).u, [3, -3])
    checkChallenges(skewChallenges, initialSkewState, {
        105101: first,
        105102: flat,
        105103: at({ u: [2, 1], v: [-1, 2], w: [0, 5] }),
        105104: at({ u: [2, 3], v: [3, 2], w: [5, 5] }),
        105105: half
    })
    checkExtras(skewExtra, initialSkewState, (state) => setSkew(state, state))
})

test('bektoreak batx1 z lab: la sombra', () => {
    const at = (patch: Partial<ShadowState>) => setShadow(initialShadowState, patch)
    const start = at({})
    assert.equal(dotOf(start.u, start.v), 5)
    assert.equal(shadowPrediction(start), '>')
    const back = at({ u: [3, 1], v: [-2, 1] })
    assert.equal(shadowPrediction(back), '<')
    assert.ok((shadowLength(back) ?? 0) < 0)
    const square = at({ u: [4, 0], v: [3, 2] })
    assert.equal(shadowLength(square), 3)
    assert.deepEqual(shadowFoot(square), [3, 0])
    const right = at({ u: [2, 1], v: [-1, 2] })
    assert.equal(shadowPrediction(right), '=')
    assert.ok(Math.abs((angleOf(right) ?? 0) - 90) < 1e-9)
    assert.ok(Math.abs((angleOf(at({ u: [1, 1], v: [-1, 0] })) ?? 0) - 135) < 1e-9)
    assert.equal(angleOf(at({ v: [0, 0] })), null)
    assert.equal(shadowLength(at({ u: [0, 0] })), null)
    const predicted = { ...initialShadowState, prediction: '>' as const }
    assert.equal(setShadow(predicted, { v: [0, 3] }).prediction, null)
    assert.equal(setShadow(predicted, { v: initialShadowState.v }).prediction, '>')
    assert.deepEqual(at({ v: [7, -7] }).v, [4, -4])
    checkChallenges(shadowChallenges, initialShadowState, {
        105201: right,
        105202: back,
        105203: square,
        105204: at({ u: [1, 1], v: [-1, 0] }),
        105205: at({ u: [3, 4], v: [2, 1] })
    })
    checkExtras(shadowExtra, initialShadowState, (state) => setShadow(state, state))
})

test('bektoreak batx1 z lab: el barco y el río', () => {
    const at = (patch: Partial<RiverState>) => setRiver(initialRiverState, patch)
    const start = at({})
    assert.deepEqual(realVelocity(start), [2, 3])
    assert.deepEqual([landing(start).numerator, landing(start).denominator], [8, 1])
    assert.deepEqual([crossingTime(start).numerator, crossingTime(start).denominator], [4, 1])
    assert.equal(riverPrediction(start), '>')
    const across = at({ bx: -2 })
    assert.equal(riverPrediction(across), '=')
    assert.equal(landing(across).numerator, 0)
    const up = at({ current: 0, bx: -3, by: 3 })
    assert.equal(riverPrediction(up), '<')
    assert.equal(landing(up).numerator, -12)
    // 12·(bx + c)/by can be a decimal: 12·1/5 = 2.4
    const fifth = at({ current: 1, bx: 0, by: 5 })
    assert.deepEqual([landing(fifth).numerator, landing(fifth).denominator], [12, 5])
    assert.equal(speedSquare(at({ current: 3, bx: 0, by: 4 })), 25)
    const predicted = { ...initialRiverState, prediction: '>' as const }
    assert.equal(setRiver(predicted, { by: 4 }).prediction, null)
    assert.equal(setRiver(predicted, { by: initialRiverState.by }).prediction, '>')
    assert.equal(at({ by: 0 }).by, 1)
    assert.equal(at({ current: 9 }).current, 4)
    checkChallenges(riverChallenges, initialRiverState, {
        105301: across,
        105302: at({ current: 3, bx: -2, by: 2 }),
        105303: at({ current: 3, bx: 0, by: 4 }),
        105304: at({ current: 1, bx: -1, by: 5 }),
        105305: up
    })
    checkExtras(riverExtra, initialRiverState, (state) => setRiver(state, state))
})
