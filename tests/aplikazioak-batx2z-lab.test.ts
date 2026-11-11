import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { DISTANCE_CURVES, DISTANCE_SETUP, distanceChallenges, distanceExtra, distancePrediction, distanceReading, initialDistanceState, setDistance, type DistanceState } from '../src/pages/batx2-zientziak-aplikazioak/lab/distance.ts'
import { hopitalChallenges, hopitalExtra, hopitalPrediction, hopitalValues, initialHopitalState, QUOTIENT_SETUP, QUOTIENTS, setHopital, STEPS } from '../src/pages/batx2-zientziak-aplikazioak/lab/hopitalLens.ts'
import { bach2ApplicationsLabChallengeIds, bach2ApplicationsLabToolForTopic, bach2ApplicationsLabTools } from '../src/pages/batx2-zientziak-aplikazioak/lab/labTools.ts'
import { initialMeanState, MEAN_FUNCTIONS, MEAN_SETUP, meanChallenges, meanExtra, meanPrediction, meanResult, numberLatex, setMean } from '../src/pages/batx2-zientziak-aplikazioak/lab/meanValue.ts'
import { initialRolleState, ROLLE_FUNCTIONS, ROLLE_SETUP, rolleChallenges, rolleExtra, rollePrediction, rolleResult, setRolle } from '../src/pages/batx2-zientziak-aplikazioak/lab/rolle.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/\$(?:ri|ren|rekin|z|ra|tik|ei)(?![a-zA-Z])/.test(text.eu), text.eu)
    }
}

/** Every fixed challenge is solved by a state we name, and none is solved when the tool opens */
function checkChallenges<State>(challenges: LabChallenge<State>[], initial: State, solutions: Record<number, State>) {
    assert.equal(new Set(challenges.map((challenge) => challenge.id)).size, challenges.length)
    for (const challenge of challenges) {
        assert.ok(solutions[challenge.id], `${challenge.id} has no solution in the test`)
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

test('aplikazioak batx2 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(bach2ApplicationsLabTools.length, 7)
    for (const stage of ['review', 'rolle', 'hopital', 'optimization']) assert.ok(bach2ApplicationsLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of bach2ApplicationsLabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    }
    for (const tool of bach2ApplicationsLabTools.filter((item) => ['rolle', 'mean', 'hopital', 'distance'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
        assert.ok(/[؀-ۿ]/.test(tool.observe.ar) && /[؀-ۿ]/.test(tool.title.ar), tool.id)
    }
    assert.equal(new Set(bach2ApplicationsLabChallengeIds).size, bach2ApplicationsLabChallengeIds.length)
    const own = [...rolleChallenges, ...meanChallenges, ...hopitalChallenges, ...distanceChallenges].map((challenge) => challenge.id)
    assert.equal(own.length, 20)
    for (const id of own) assert.ok(id >= 124101 && id <= 124399, `${id}`)
    const topics = ['monotony-review', 'curvature-review', 'absolute-review', 'rolle', 'roots-count', 'mean-value', 'hopital', 'hopital-products', 'hopital-powers', 'extreme-condition', 'inflection-condition', 'extreme-tangent', 'areas-volumes', 'distances', 'contexts-interval']
    for (const [topic, tool] of Object.entries(bach2ApplicationsLabToolForTopic)) {
        assert.ok(topics.includes(topic), topic)
        assert.ok(bach2ApplicationsLabTools.some((item) => item.id === tool), `${topic} → ${tool}`)
    }
    for (const tool of bach2ApplicationsLabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
})

test('aplikazioak batx2 z lab: Rolle looks for the point', () => {
    checkChallenges(rolleChallenges, initialRolleState, {
        124101: { fn: 'parabola', a: 1, b: 3, prediction: null },
        124102: { fn: 'cubic', a: 0, b: 4, prediction: null },
        124103: { fn: 'abs', a: 1, b: 3, prediction: null },
        124104: { fn: 'jump', a: 1, b: 3, prediction: null },
        124105: { fn: 'wave', a: 0, b: 4, prediction: null }
    })
    checkExtras(rolleExtra, initialRolleState, (state) => setRolle(state, state))
    const kinds = new Set<string>()
    for (const fn of ROLLE_FUNCTIONS) {
        const setup = ROLLE_SETUP[fn]
        katex.renderToString(`f(x)=${setup.latex}`, { throwOnError: true, strict: 'error' })
        for (const label of setup.labels) katex.renderToString(label, { throwOnError: true, strict: 'error' })
        assert.equal(setup.labels.length, setup.points.length, fn)
        kinds.add(rollePrediction({ fn }))
        // Wherever Rolle applies, every c it gives has a horizontal tangent and lies inside
        for (let a = 0; a < setup.points.length; a++) for (let b = 0; b < setup.points.length; b++) {
            const result = rolleResult({ fn, a, b })
            if (result.failure === null) {
                assert.ok(result.cs.length > 0, `${fn} [${result.a}, ${result.b}]: Rolle applies but no c`)
                for (const c of result.cs) assert.ok(result.a < c && c < result.b, `${fn}: c = ${c}`)
            }
        }
    }
    assert.equal(kinds.size, 3)
    assert.equal(rolleResult({ fn: 'abs', a: 1, b: 3 }).failure, 'corner')
    assert.equal(rolleResult({ fn: 'jump', a: 1, b: 3 }).failure, 'jump')
    assert.equal(rolleResult({ fn: 'jump', a: 2, b: 4 }).failure, 'heights')
    assert.deepEqual(rolleResult({ fn: 'cubic', a: 1, b: 5 }).cs, [-1, 1])
})

test('aplikazioak batx2 z lab: the secant and its parallel tangent', () => {
    checkChallenges(meanChallenges, initialMeanState, {
        124201: { fn: 'square', a: 1, b: 5, prediction: null },
        124202: { fn: 'cube', a: 1, b: 3, prediction: null },
        124203: { fn: 'root', a: 0, b: 4, prediction: null },
        124204: { fn: 'cube', a: 0, b: 2, prediction: null },
        124205: { fn: 'square', a: 1, b: 4, prediction: null }
    })
    checkExtras(meanExtra, initialMeanState, (state) => setMean(state, state))
    const kinds = new Set<string>()
    for (const fn of MEAN_FUNCTIONS) {
        const setup = MEAN_SETUP[fn]
        kinds.add(meanPrediction({ fn }))
        // Every c has the slope of the secant (checked with a numerical derivative)
        for (let a = 0; a < setup.points.length; a++) for (let b = a + 1; b < setup.points.length; b++) {
            const result = meanResult({ fn, a, b })
            assert.ok(result.cs.length >= 1, `${fn} [${result.a}, ${result.b}]`)
            for (const c of result.cs) {
                const slope = (setup.f(c + 1e-6) - setup.f(c - 1e-6)) / 2e-6
                assert.ok(Math.abs(slope - result.m) < 1e-4, `${fn}: f′(${c}) = ${slope} ≠ ${result.m}`)
            }
        }
    }
    assert.equal(kinds.size, 3)
    assert.equal(numberLatex(9 / 16), '\\frac{9}{16}')
    assert.equal(numberLatex(-1.5), '-\\frac{3}{2}')
})

test('aplikazioak batx2 z lab: L\'Hôpital up close', () => {
    checkChallenges(hopitalChallenges, initialHopitalState, {
        124301: { q: 'poly', k: 4, prediction: null },
        124302: { q: 'none', k: 0, prediction: null },
        124303: { q: 'cos', k: 5, prediction: null },
        124304: { q: 'sine', k: 3, prediction: null },
        124305: { q: 'log', k: 4, prediction: null }
    })
    checkExtras(hopitalExtra, initialHopitalState, (state) => setHopital(state, state))
    const kinds = new Set<string>()
    for (const q of QUOTIENTS) {
        const setup = QUOTIENT_SETUP[q]
        katex.renderToString(setup.latex, { throwOnError: true, strict: 'error' })
        kinds.add(hopitalPrediction({ q }))
        // Close to a, f/g is near the limit; f′/g′ too, only when it is 0/0
        const near = hopitalValues({ q, k: STEPS.indexOf(0.01) })
        assert.ok(Math.abs(near.quotient - setup.limit) < 0.02, `${q}: f/g = ${near.quotient}`)
        assert.equal(Math.abs(near.derivatives - setup.limit) < 0.05, setup.indeterminate, `${q}: f′/g′ = ${near.derivatives}`)
        assert.equal(Math.abs(setup.f(setup.a)) < 1e-12 && Math.abs(setup.g(setup.a)) < 1e-12, setup.indeterminate, q)
    }
    assert.equal(kinds.size, 3)
})

test('aplikazioak batx2 z lab: the shortest distance to a curve', () => {
    const best = (curve: DistanceState['curve']): DistanceState => ({ curve, k: DISTANCE_SETUP[curve].xs.indexOf(DISTANCE_SETUP[curve].best), prediction: null })
    checkChallenges(distanceChallenges, initialDistanceState, {
        124351: best('parabola'),
        124352: best('root'),
        124353: best('valley'),
        124354: best('hyperbola'),
        124355: best('line')
    })
    checkExtras(distanceExtra, initialDistanceState, (state) => setDistance(state, state))
    const kinds = new Set<string>()
    for (const curve of DISTANCE_CURVES) {
        const setup = DISTANCE_SETUP[curve]
        kinds.add(distancePrediction({ curve }))
        // The closest point of the list is the true one, and there PQ is perpendicular to the tangent
        const k = setup.xs.indexOf(setup.best)
        assert.ok(k >= 0, curve)
        const reading = distanceReading({ curve, k })
        assert.ok(reading.closest && reading.perpendicular, curve)
        assert.equal(setup.xs.filter((_, index) => distanceReading({ curve, k: index }).closest).length, 1, curve)
        // Q stays inside the plane drawn
        for (const x of setup.xs) {
            assert.ok(x >= setup.view.xMin && x <= setup.view.xMax, `${curve}: x = ${x}`)
            assert.ok(setup.f(x) >= setup.view.yMin && setup.f(x) <= setup.view.yMax, `${curve}: f(${x}) = ${setup.f(x)}`)
        }
    }
    assert.equal(kinds.size, 3)
})
