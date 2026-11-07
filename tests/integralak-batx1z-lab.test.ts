import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { ACCUMULATE_FUNCTIONS, ACCUMULATE_SETUP, accumulateChallenges, accumulateExtra, accumulatePrediction, areaAt, initialAccumulateState, setAccumulate, turning, type AccumulateState } from '../src/pages/batx1-zientziak-integralak/lab/accumulate.ts'
import { BETWEEN_PAIRS, BETWEEN_SETUP, betweenArea, betweenChallenges, betweenExtra, betweenIntegral, betweenPrediction, initialBetweenState, setBetween, topCurve, type BetweenState } from '../src/pages/batx1-zientziak-integralak/lab/between.ts'
import { bachIntegralsLabChallengeIds, bachIntegralsLabToolForTopic, bachIntegralsLabTools } from '../src/pages/batx1-zientziak-integralak/lab/labTools.ts'
import { numberLatex } from '../src/pages/batx1-zientziak-integralak/lab/numbers.ts'
import { initialRectState, RECT_FUNCTIONS, RECT_LIMITS, RECT_SETUP, RECT_SIDES, rectArea, rectChallenges, rectExtra, rectPrediction, rectSum, setRect, type RectState } from '../src/pages/batx1-zientziak-integralak/lab/rectangles.ts'
import { initialSignedState, SIGNED_FUNCTIONS, SIGNED_SETUP, signedArea, signedChallenges, signedExtra, signedIntegral, signedPrediction, setSigned, type SignedState } from '../src/pages/batx1-zientziak-integralak/lab/signed.ts'

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
        // English groups the thousands
        assert.ok(!/(?<![\d.,])\d{4,}(?!\d)/.test(text.en.replace(/\$[^$]+\$/g, '')), text.en)
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
function checkExtras<State>(maker: LabChallengeMaker<State>, initial: State, setter: (state: State) => State, different = 6) {
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
    assert.ok(prompts.size >= different, `only ${prompts.size} different challenges`)
}

const near = (a: number, b: number, tolerance = 1e-4) => Math.abs(a - b) < tolerance * Math.max(1, Math.abs(b))

/** The integral of f from a to b, worked out numerically (Simpson, 2000 pieces) */
function simpson(fn: (x: number) => number, a: number, b: number) {
    const n = 2000
    const h = (b - a) / n
    let total = fn(a) + fn(b)
    for (let i = 1; i < n; i += 1) total += fn(a + i * h) * (i % 2 === 0 ? 2 : 4)
    return (total * h) / 3
}

const topics = ['primitive', 'power-rule', 'through-point', 'exp-log', 'trig', 'arcs', 'chain-power', 'chain-exp-log', 'adjust', 'rectangles', 'barrow', 'properties', 'area-axis', 'area-sign', 'between-curves']

test('integralak batx1 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(bachIntegralsLabTools.length, 6)
    for (const tool of bachIntegralsLabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    }
    // The «Observe» text of the tools of this unit is plain text, not LaTeX
    for (const tool of bachIntegralsLabTools.filter((item) => ['rectangles', 'area-function', 'signed', 'between'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
        assert.ok(/[؀-ۿ]/.test(tool.observe.ar) && /[؀-ۿ]/.test(tool.title.ar), tool.id)
    }
    assert.equal(new Set(bachIntegralsLabChallengeIds).size, bachIntegralsLabChallengeIds.length)
    // The four tools of this unit use the 112xxx block; the borrowed ones keep their ids
    const own = [...rectChallenges, ...signedChallenges, ...betweenChallenges, ...accumulateChallenges].map((challenge) => challenge.id)
    assert.equal(own.length, 20)
    for (const id of own) assert.ok(id >= 112101 && id <= 112399, `${id}`)
    for (const [topic, tool] of Object.entries(bachIntegralsLabToolForTopic)) {
        assert.ok(topics.includes(topic), topic)
        assert.ok(bachIntegralsLabTools.some((item) => item.id === tool), `${topic} → ${tool}`)
    }
    for (const topic of topics) assert.ok(bachIntegralsLabToolForTopic[topic], `${topic} has no tool`)
    for (const tool of bachIntegralsLabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
    for (const tool of bachIntegralsLabTools) assert.ok(['primitives', 'immediate', 'compound', 'definite', 'areas'].includes(tool.stage), `${tool.id}: ${tool.stage}`)
})

test('integralak batx1 z lab: numbers as LaTeX', () => {
    assert.equal(numberLatex(8 / 3), '\\frac{8}{3}')
    assert.equal(numberLatex(-32 / 3), '-\\frac{32}{3}')
    assert.equal(numberLatex(4), '4')
    assert.equal(numberLatex(2.25), '\\frac{9}{4}')
})

test('integralak batx1 z lab: rectángulos bajo la curva', () => {
    const at = (patch: Partial<RectState>) => setRect(initialRectState, patch)
    for (const fn of RECT_FUNCTIONS) {
        const setup = RECT_SETUP[fn]
        katex.renderToString(setup.latex, { throwOnError: true, strict: 'error' })
        katex.renderToString(setup.areaLatex, { throwOnError: true, strict: 'error' })
        // The exact area is the integral
        assert.ok(near(rectArea(fn), simpson(setup.fn, setup.a, setup.b), 1e-4), fn)
        for (const side of RECT_SIDES) {
            // The prediction depends on the function and the height, not on how many bars
            const predictions = new Set(Array.from({ length: RECT_LIMITS.n.max }, (_, i) => rectPrediction(at({ fn, side, n: i + 1 }))))
            assert.equal(predictions.size, 1, `${fn} ${side}`)
            // More bars come closer
            assert.ok(Math.abs(rectSum(fn, side, 24) - rectArea(fn)) <= Math.abs(rectSum(fn, side, 2) - rectArea(fn)) + 1e-9, `${fn} ${side}`)
        }
    }
    assert.equal(rectSum('square', 'right', 4), 3.75)
    assert.deepEqual(RECT_SIDES.map((side) => rectPrediction(at({ fn: 'line', side }))), ['<', '=', '>'])
    assert.deepEqual(RECT_SIDES.map((side) => rectPrediction(at({ fn: 'cap', side }))), ['>', '>', '<'])
    // A new function or height asks for a new prediction; more bars do not
    const guessed = { ...initialRectState, prediction: '>' as const }
    assert.equal(setRect(guessed, { n: 9 }).prediction, '>')
    assert.equal(setRect(guessed, { side: 'left' }).prediction, null)
    assert.equal(setRect(guessed, { fn: 'exp' }).prediction, null)
    assert.equal(at({ n: 99 }).n, RECT_LIMITS.n.max)
    checkChallenges(rectChallenges, initialRectState, {
        112101: at({ n: 13 }),
        112102: at({ fn: 'cap', side: 'left', n: 8 }),
        112103: at({ fn: 'line', side: 'middle', n: 3 }),
        112104: at({ fn: 'exp', side: 'middle', n: 5 }),
        112105: at({ fn: 'root', side: 'left', n: 10 })
    })
    checkExtras(rectExtra, initialRectState, (state) => setRect(state, state))
})

test('integralak batx1 z lab: área con signo', () => {
    const at = (patch: Partial<SignedState>) => setSigned(initialSignedState, patch)
    for (const fn of SIGNED_FUNCTIONS) {
        const setup = SIGNED_SETUP[fn]
        katex.renderToString(setup.latex, { throwOnError: true, strict: 'error' })
        for (const root of setup.roots) assert.ok(Math.abs(setup.fn(root)) < 1e-12, `${fn} root ${root}`)
        for (const [a, b] of [[-3, 3], [-2.5, 1], [0, 2.5], [1.5, -1]]) {
            // F is an antiderivative of f, and the area is the integral of |f|
            assert.ok(near(signedIntegral(fn, a, b), simpson(setup.fn, a, b), 1e-6), `${fn} ∫ ${a}..${b}`)
            assert.ok(near(signedArea(fn, a, b), Math.abs(simpson((x) => Math.abs(setup.fn(x)), Math.min(a, b), Math.max(a, b))), 1e-4), `${fn} A ${a}..${b}`)
        }
        // The prediction is about the function's own interval: the limits do not change it
        const opened = at({ fn })
        for (const ta of [-6, -1, 3]) for (const tb of [-4, 0, 6]) assert.equal(signedPrediction(setSigned(opened, { ta, tb })), signedPrediction(opened), fn)
    }
    assert.deepEqual(SIGNED_FUNCTIONS.map((fn) => signedPrediction(at({ fn }))), ['=', '>', '<', '<'])
    assert.equal(signedIntegral('dip', 0, 3), 0)
    assert.ok(near(signedArea('dip', 0, 3), 8 / 3, 1e-9))
    // A new function opens on its own interval and asks for a new prediction; new limits do not
    const guessed = { ...initialSignedState, prediction: '=' as const }
    assert.equal(setSigned(guessed, { tb: 2 }).prediction, '=')
    assert.deepEqual(setSigned(guessed, { fn: 'cubic' }), { fn: 'cubic', ta: -2, tb: 4, prediction: null })
    checkChallenges(signedChallenges, initialSignedState, {
        112201: at({ ta: -2, tb: 4 }),
        112202: at({ fn: 'line', ta: -1, tb: 5 }),
        112203: at({ fn: 'cubic', ta: -4, tb: 4 }),
        112204: at({ fn: 'well', ta: -4, tb: 4 }),
        112205: at({ ta: 4, tb: 0 })
    })
    checkExtras(signedExtra, initialSignedState, (state) => setSigned(state, state))
})

test('integralak batx1 z lab: área entre dos curvas', () => {
    const at = (patch: Partial<BetweenState>) => setBetween(initialBetweenState, patch)
    for (const pair of BETWEEN_PAIRS) {
        const setup = BETWEEN_SETUP[pair]
        katex.renderToString(`f(x)=${setup.fLatex}\\quad g(x)=${setup.gLatex}`, { throwOnError: true, strict: 'error' })
        for (const cut of setup.cuts) assert.ok(Math.abs(setup.f(cut) - setup.g(cut)) < 1e-12, `${pair} cut ${cut}`)
        const difference = (x: number) => setup.f(x) - setup.g(x)
        for (const [a, b] of [[-3, 3], [-2.5, 1], [0, 2.5], [1.5, -1]]) {
            assert.ok(near(betweenIntegral(pair, a, b), simpson(difference, a, b), 1e-6), `${pair} ∫ ${a}..${b}`)
            assert.ok(near(betweenArea(pair, a, b), Math.abs(simpson((x) => Math.abs(difference(x)), Math.min(a, b), Math.max(a, b))), 1e-4), `${pair} A ${a}..${b}`)
        }
        const opened = at({ pair })
        for (const ta of [-6, -1, 3]) for (const tb of [-4, 0, 6]) assert.equal(betweenPrediction(setBetween(opened, { ta, tb })), betweenPrediction(opened), pair)
    }
    assert.deepEqual(BETWEEN_PAIRS.map((pair) => betweenPrediction(at({ pair }))), ['<', '>', '=', '>', '<'])
    assert.equal(topCurve('cubicLine', 0, 1), '<')
    assert.ok(near(betweenArea('parabolaLine', 0, 2), 4 / 3, 1e-9))
    assert.ok(near(betweenArea('lineParabola', -1, 2), 9 / 2, 1e-9))
    const guessed = { ...initialBetweenState, prediction: '<' as const }
    assert.equal(setBetween(guessed, { tb: 4 }).prediction, '<')
    assert.equal(setBetween(guessed, { pair: 'cubicLine' }).prediction, null)
    checkChallenges(betweenChallenges, initialBetweenState, {
        112301: at({ tb: 4 }),
        112302: at({ pair: 'lineParabola', ta: 4, tb: 6 }),
        112303: at({ pair: 'cubicLine', ta: 0, tb: 2 }),
        112304: at({ pair: 'twoParabolas', ta: 0, tb: 4 }),
        112305: at({ pair: 'lineCap', ta: 2, tb: 4 })
    })
    checkExtras(betweenExtra, initialBetweenState, (state) => setBetween(state, state))
})

test('integralak batx1 z lab: la función área', () => {
    const at = (patch: Partial<AccumulateState>) => setAccumulate(initialAccumulateState, patch)
    for (const fn of ACCUMULATE_FUNCTIONS) {
        const setup = ACCUMULATE_SETUP[fn]
        katex.renderToString(setup.latex, { throwOnError: true, strict: 'error' })
        katex.renderToString(setup.areaLatex, { throwOnError: true, strict: 'error' })
        // A(0) = 0 and A′ = f: A(x) is the area from 0 to x
        assert.equal(setup.A(0), 0)
        for (let t = 1; t <= setup.tMax; t += 1) assert.ok(near(areaAt(fn, t / 2), simpson(setup.f, 0, t / 2), 1e-6), `${fn} at ${t / 2}`)
        // The marked point is inside the range, and the prediction does not move with x
        assert.ok(setup.p * 2 <= setup.tMax, fn)
        const opened = at({ fn })
        for (let t = 0; t <= setup.tMax; t += 1) assert.equal(accumulatePrediction(setAccumulate(opened, { t })), accumulatePrediction(opened), fn)
    }
    assert.deepEqual(ACCUMULATE_FUNCTIONS.map((fn) => accumulatePrediction(at({ fn }))), ['<', '=', '>', '>'])
    assert.equal(turning('line', 2), 'maximum')
    assert.equal(turning('parabola', 1), 'minimum')
    assert.equal(turning('twoCuts', 3), 'minimum')
    // x stays inside a shorter range
    assert.equal(setAccumulate(at({ t: 10 }), { fn: 'parabola' }).t, 5)
    const guessed = { ...initialAccumulateState, prediction: '<' as const }
    assert.equal(setAccumulate(guessed, { t: 6 }).prediction, '<')
    assert.equal(setAccumulate(guessed, { fn: 'cosine' }).prediction, null)
    checkChallenges(accumulateChallenges, initialAccumulateState, {
        112351: at({ t: 4 }),
        112352: at({ fn: 'twoCuts', t: 6 }),
        112353: at({ fn: 'parabola', t: 2 }),
        112354: at({ t: 8 }),
        112355: at({ fn: 'cosine', t: 6 })
    })
    checkExtras(accumulateExtra, initialAccumulateState, (state) => setAccumulate(state, state))
})
