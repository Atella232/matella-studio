import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { bachRealsLabChallengeIds, bachRealsLabToolForTopic, bachRealsLabTools } from '../src/pages/batx1-zientziak-errealak/lab/labTools.ts'
import { distanceChallenges, distanceExtra, distanceOf, distancePrediction, initialDistanceState, neighbourhoodOf, setDistance, type DistanceState } from '../src/pages/batx1-zientziak-errealak/lab/distance.ts'
import { initialSlideState, setSlide, slideChallenges, slideExtra, slidePrediction, slideResult, slideShift, type SlideState } from '../src/pages/batx1-zientziak-errealak/lab/slideRule.ts'
import { bandAbsolute, bandApprox, bandBound, bandChallenges, bandExtra, bandInterval, bandPrediction, bandRelative, BAND_VALUES, initialBandState, setBand, type BandState } from '../src/pages/batx1-zientziak-errealak/lab/errorBand.ts'

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

test('errealak batx1 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(bachRealsLabTools.length, 11)
    const stages = ['reals', 'absolute', 'errors', 'radicals', 'newton-stage']
    for (const stage of stages) assert.ok(bachRealsLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of bachRealsLabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    }
    // The «Observe» text of the tools of this unit is plain text, not LaTeX
    for (const tool of bachRealsLabTools.filter((item) => ['distance', 'slide-rule', 'error-band'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
    }
    assert.equal(new Set(bachRealsLabChallengeIds).size, bachRealsLabChallengeIds.length)
    // The three tools of this unit use the 99xxx block; the borrowed ones keep their 4. DBH ids
    const own = [...distanceChallenges, ...slideChallenges, ...bandChallenges].map((challenge) => challenge.id)
    for (const id of own) assert.ok(id >= 99101 && id <= 99399, `${id}`)
    const topics = ['irrational-proof', 'exact-line', 'interval-sets', 'absolute-value', 'neighbourhoods', 'significant', 'relative', 'scientific-errors', 'radical-ops', 'rationalize', 'logarithms', 'log-unknown', 'combinatorial', 'newton']
    for (const topic of topics) assert.ok(bachRealsLabToolForTopic[topic], topic)
    for (const tool of bachRealsLabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
})

test('errealak batx1 z lab: la distancia en la recta', () => {
    const at = (patch: Partial<DistanceState>) => setDistance(initialDistanceState, patch)
    assert.equal(distanceOf(at({ a: -2, x: 5 })), 7)
    assert.deepEqual(neighbourhoodOf(at({ a: 3, r: 2 })), { left: 1, right: 5 })
    assert.equal(distancePrediction(at({ a: 0, r: 2, x: 1 })), '<')
    assert.equal(distancePrediction(at({ a: 0, r: 2, x: -2 })), '=')
    assert.equal(distancePrediction(at({ a: 0, r: 2, x: 3 })), '>')
    // A new setting asks for a new prediction; the same one keeps it
    const predicted = { ...initialDistanceState, prediction: '>' as const }
    assert.equal(setDistance(predicted, { x: 4 }).prediction, null)
    assert.equal(setDistance(predicted, { x: initialDistanceState.x }).prediction, '>')
    assert.equal(at({ a: 99 }).a, 6)
    checkChallenges(distanceChallenges, initialDistanceState, {
        99101: at({ a: 5, r: 3 }),
        99102: at({ a: 1, x: -3 }),
        99103: at({ a: -2, r: 3, x: 3 }),
        99104: at({ a: -3, r: 3 }),
        99105: at({ a: 4, r: 2, x: 2 })
    })
    checkExtras(distanceExtra, initialDistanceState, (state) => setDistance(state, state))
})

test('errealak batx1 z lab: la regla de cálculo', () => {
    const at = (patch: Partial<SlideState>) => setSlide(initialSlideState, patch)
    assert.equal(slideResult(at({ a: 2, b: 4 })), 8)
    assert.ok(Math.abs(slideShift(at({ a: 2, b: 4 })) - Math.log10(2)) < 1e-12)
    // Dividing, the 1 of the sliding scale sits on the quotient
    const division = at({ operation: 'divide', a: 8, b: 2 })
    assert.equal(slideResult(division), 4)
    assert.ok(Math.abs(slideShift(division) - Math.log10(4)) < 1e-12)
    // The result stays on the scale: b is cut down when a grows
    assert.equal(setSlide(at({ a: 2, b: 5 }), { a: 4 }).b, 2)
    assert.equal(at({ operation: 'divide', a: 3, b: 7 }).b, 3)
    // Product against sum: 2·2 = 2 + 2, 1·5 < 1 + 5, 3·3 > 3 + 3
    assert.equal(slidePrediction(at({ a: 2, b: 2 })), '=')
    assert.equal(slidePrediction(at({ a: 1, b: 5 })), '<')
    assert.equal(slidePrediction(at({ a: 3, b: 3 })), '>')
    checkChallenges(slideChallenges, initialSlideState, {
        99201: at({ a: 2, b: 4 }),
        99202: at({ a: 3, b: 3 }),
        99203: at({ operation: 'divide', a: 8, b: 2 }),
        99204: at({ a: 2, b: 5 }),
        99205: at({ a: 2, b: 2 })
    })
    checkExtras(slideExtra, initialSlideState, (state) => setSlide(state, state))
})

test('errealak batx1 z lab: la banda del error', () => {
    const at = (patch: Partial<BandState>) => setBand(initialBandState, patch)
    const pi3 = at({ value: 0, figures: 3, mode: 'round' })
    assert.equal(bandApprox(pi3), 3.14)
    assert.equal(bandBound(pi3), 0.005)
    assert.deepEqual(bandInterval(pi3), { low: 3.135, high: 3.145 })
    assert.ok(bandAbsolute(pi3) < bandBound(pi3))
    // Truncating, the exact value is always above, within one unit
    for (const [index] of BAND_VALUES.entries()) {
        for (let figures = 1; figures <= 6; figures += 1) {
            const cut = at({ value: index, figures, mode: 'truncate' })
            assert.ok(bandPrediction(cut) !== '<', `${index} ${figures}`)
            assert.ok(bandAbsolute(cut) < bandBound(cut) + 1e-12, `${index} ${figures}`)
            const rounded = at({ value: index, figures, mode: 'round' })
            assert.ok(bandAbsolute(rounded) <= bandBound(rounded) + 1e-12, `${index} ${figures}`)
            const { low, high } = bandInterval(rounded)
            assert.ok(BAND_VALUES[index].value >= low - 1e-12 && BAND_VALUES[index].value <= high + 1e-12, `${index} ${figures}`)
        }
    }
    assert.equal(bandApprox(at({ value: 2, figures: 2, mode: 'truncate' })), 2.7)
    assert.equal(bandApprox(at({ value: 6, figures: 3, mode: 'round' })), 1230)
    assert.equal(bandApprox(at({ value: 5, figures: 2, mode: 'round' })), 0.046)
    assert.ok(bandRelative(at({ value: 1, figures: 4, mode: 'round' })) < 0.001)
    assert.ok(bandRelative(at({ value: 1, figures: 3, mode: 'round' })) > 0.001)
    checkChallenges(bandChallenges, initialBandState, {
        99301: pi3,
        99302: at({ value: 1, figures: 4, mode: 'round' }),
        99303: at({ value: 2, figures: 2, mode: 'truncate' }),
        99304: at({ value: 4, figures: 3, mode: 'round' }),
        99305: at({ value: 6, figures: 3, mode: 'round' })
    })
    // 1/7 truncated to three figures is not close enough: only rounding solves 99304
    assert.ok(!bandChallenges.find((challenge) => challenge.id === 99304)!.isSolved(at({ value: 4, figures: 3, mode: 'truncate' })))
    checkExtras(bandExtra, initialBandState, (state) => setBand(state, state))
})
