import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { bestCut, BOX_SIZES, boxChallenges, boxExtra, boxPrediction, initialBoxState, setBox, volume, volumeSlope, type BoxState } from '../src/pages/batx1-zientziak-aplikazioak/lab/box.ts'
import { CURVE_FUNCTIONS, CURVE_SETUP, curveChallenges, curveExtra, curvePrediction, curveSide, initialCurveState, setCurve, type CurveState } from '../src/pages/batx1-zientziak-aplikazioak/lab/curvature.ts'
import { bachApplicationsLabChallengeIds, bachApplicationsLabToolForTopic, bachApplicationsLabTools } from '../src/pages/batx1-zientziak-aplikazioak/lab/labTools.ts'
import { extremaCount, initialLayerState, LAYER_FUNCTIONS, LAYER_SETUP, layerChallenges, layerExtra, layerPrediction, setLayers, type LayerState } from '../src/pages/batx1-zientziak-aplikazioak/lab/layers.ts'
import { initialSignState, pointKind, SIGN_FUNCTIONS, SIGN_SETUP, signChallenges, signExtra, signPieces, signPrediction, signSlope, setSign, type SignState } from '../src/pages/batx1-zientziak-aplikazioak/lab/sign.ts'

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

/** The derivative of a function, worked out numerically */
const numeric = (fn: (x: number) => number, x: number) => (fn(x + 1e-5) - fn(x - 1e-5)) / 2e-5
const near = (a: number, b: number, tolerance = 1e-4) => Math.abs(a - b) < tolerance * Math.max(1, Math.abs(b))

const topics = ['sign-monotony', 'intervals', 'always-increasing', 'singular-points', 'second-derivative', 'extreme-coefficients', 'concavity', 'inflection', 'inflection-coefficients', 'absolute-extremes', 'geometry', 'contexts', 'polynomial-graph', 'rational-graph', 'exp-log-graph']

test('aplikazioak batx1 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(bachApplicationsLabTools.length, 6)
    for (const tool of bachApplicationsLabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    }
    // The «Observe» text of the tools of this unit is plain text, not LaTeX
    for (const tool of bachApplicationsLabTools.filter((item) => ['sign', 'curvature', 'box', 'layers'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
        assert.ok(/[؀-ۿ]/.test(tool.observe.ar) && /[؀-ۿ]/.test(tool.title.ar), tool.id)
    }
    assert.equal(new Set(bachApplicationsLabChallengeIds).size, bachApplicationsLabChallengeIds.length)
    // The four tools of this unit use the 111xxx block; the borrowed ones keep their ids
    const own = [...signChallenges, ...boxChallenges, ...curveChallenges, ...layerChallenges].map((challenge) => challenge.id)
    assert.equal(own.length, 20)
    for (const id of own) assert.ok(id >= 111101 && id <= 111399, `${id}`)
    for (const [topic, tool] of Object.entries(bachApplicationsLabToolForTopic)) {
        assert.ok(topics.includes(topic), topic)
        assert.ok(bachApplicationsLabTools.some((item) => item.id === tool), `${topic} → ${tool}`)
    }
    for (const topic of topics) assert.ok(bachApplicationsLabToolForTopic[topic], `${topic} has no tool`)
    for (const tool of bachApplicationsLabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
})

test('aplikazioak batx1 z lab: el semáforo de f′', () => {
    const at = (patch: Partial<SignState>) => setSign(initialSignState, patch)
    for (const fn of SIGN_FUNCTIONS) {
        const setup = SIGN_SETUP[fn]
        katex.renderToString(setup.latex, { throwOnError: true, strict: 'error' })
        katex.renderToString(setup.derivativeLatex, { throwOnError: true, strict: 'error' })
        // f′ is the slope of f, its zeros are the listed ones, and p is one of them
        for (const x of [-2.5, -1.5, -0.5, 0.5, 1.5, 2.5]) assert.ok(near(setup.derivative(x), numeric(setup.fn, x)), `${fn} at ${x}`)
        for (const zero of setup.zeros) assert.ok(Math.abs(setup.derivative(zero)) < 1e-12, `${fn} zero ${zero}`)
        assert.ok(setup.zeros.includes(setup.p), fn)
        // The strip changes colour only at the zeros and the holes
        const pieces = signPieces(fn)
        for (const piece of pieces) {
            for (let x = piece.from + 0.01; x < piece.to; x += 0.05) assert.equal(Math.sign(setup.derivative(x)), piece.sign, `${fn} at ${x}`)
        }
        // The probe never needs a position outside the board
        assert.equal(signSlope(fn, 0) === null, setup.holes.includes(0), fn)
    }
    assert.equal(pointKind('cubic', -1), 'maximum')
    assert.equal(pointKind('flat', 1), 'neither')
    assert.equal(pointKind('quartic', 1), 'minimum')
    assert.deepEqual(SIGN_FUNCTIONS.map((fn) => signPrediction(at({ fn }))), ['>', '=', '>', '<', '<'])
    // A new function asks for a new prediction; a new probe does not
    const guessed = { ...initialSignState, prediction: '>' as const }
    assert.equal(setSign(guessed, { t: 3 }).prediction, '>')
    assert.equal(setSign(guessed, { fn: 'exp' }).prediction, null)
    assert.equal(at({ t: 40 }).t, 6)
    checkChallenges(signChallenges, initialSignState, {
        111101: at({ t: -2 }),
        111102: at({ fn: 'flat', t: 2 }),
        111103: at({ fn: 'quartic', t: 2 }),
        111104: at({ fn: 'rational', t: -1 }),
        111105: at({ fn: 'exp', t: -2 })
    })
    checkExtras(signExtra, initialSignState, (state) => setSign(state, state))
})

test('aplikazioak batx1 z lab: la caja sin tapa', () => {
    const at = (patch: Partial<BoxState>) => setBox(initialBoxState, patch)
    for (const side of BOX_SIZES) {
        // V′ is the slope of V, and it is zero at L/6, where V is greatest
        for (const x of [0.5, 1.5, 2.5, side / 4]) assert.ok(near(volumeSlope(side, x), numeric((value) => volume(side, value), x)), `${side} ${x}`)
        assert.equal(volumeSlope(side, bestCut(side)), 0)
        for (let k = 1; k < side; k += 1) assert.ok(volume(side, k / 2) <= volume(side, bestCut(side)), `${side} ${k}`)
        // The best cut is a whole number of half centimetres
        assert.ok(Number.isInteger(bestCut(side) * 2), `${side}`)
    }
    assert.equal(volume(12, 2), 128)
    assert.equal(volume(30, 5), 2000)
    assert.deepEqual([0, 1, 2, 3].map((size) => boxPrediction(at({ size }))), ['<', '=', '>', '>'])
    // The cut stays inside a smaller sheet
    assert.equal(setBox(at({ size: 3, k: 25 }), { size: 0 }).k, 11)
    const guessed = { ...initialBoxState, prediction: '<' as const }
    assert.equal(setBox(guessed, { k: 5 }).prediction, '<')
    assert.equal(setBox(guessed, { size: 1 }).prediction, null)
    checkChallenges(boxChallenges, initialBoxState, {
        111201: at({ k: 4 }),
        111202: at({ size: 1, k: 6 }),
        111203: at({ size: 2, k: 8 }),
        111204: at({ size: 3, k: 12 }),
        111205: at({ k: 6 })
    })
    checkExtras(boxExtra, initialBoxState, (state) => setBox(state, state))
})

test('aplikazioak batx1 z lab: curvatura con la tangente', () => {
    const at = (patch: Partial<CurveState>) => setCurve(initialCurveState, patch)
    for (const fn of CURVE_FUNCTIONS) {
        const setup = CURVE_SETUP[fn]
        katex.renderToString(setup.latex, { throwOnError: true, strict: 'error' })
        katex.renderToString(setup.secondLatex, { throwOnError: true, strict: 'error' })
        for (const x of [-2.5, -1.5, -0.5, 0.5, 1.5, 2.5]) {
            assert.ok(near(setup.derivative(x), numeric(setup.fn, x)), `${fn} f′ at ${x}`)
            assert.ok(near(setup.second(x), numeric(setup.derivative, x)), `${fn} f″ at ${x}`)
            // Above the tangent where f″ > 0, below where f″ < 0
            const side = curveSide(fn, x)
            if (setup.second(x) > 0.2) assert.equal(side, 'above', `${fn} at ${x}`)
            if (setup.second(x) < -0.2) assert.equal(side, 'below', `${fn} at ${x}`)
        }
    }
    assert.equal(curveSide('cubic', 0), 'cross')
    assert.equal(curveSide('quartic', 1), 'cross')
    assert.equal(curveSide('flat', 0), 'above')
    assert.equal(curveSide('exp', -2), 'cross')
    assert.equal(curveSide('inverse', 0), null)
    assert.deepEqual(CURVE_FUNCTIONS.map((fn) => curvePrediction(at({ fn }))), ['=', '=', '>', '=', '<'])
    const guessed = { ...initialCurveState, prediction: '=' as const }
    assert.equal(setCurve(guessed, { t: 3 }).prediction, '=')
    assert.equal(setCurve(guessed, { fn: 'flat' }).prediction, null)
    checkChallenges(curveChallenges, initialCurveState, {
        111301: at({ t: 2 }),
        111302: at({ fn: 'quartic', t: 2 }),
        111303: at({ fn: 'flat', t: 0 }),
        111304: at({ fn: 'exp', t: -4 }),
        111305: at({ fn: 'inverse', t: -2 })
    })
    checkExtras(curveExtra, initialCurveState, (state) => setCurve(state, state))
})

test('aplikazioak batx1 z lab: monta la gráfica', () => {
    const at = (patch: Partial<LayerState>) => setLayers(initialLayerState, patch)
    for (const fn of LAYER_FUNCTIONS) {
        const setup = LAYER_SETUP[fn]
        katex.renderToString(setup.latex, { throwOnError: true, strict: 'error' })
        for (const x of [-2.5, -1.5, -0.5, 0.5, 1.5, 2.5]) {
            if (setup.holes.some((hole) => Math.abs(hole - x) < 0.6)) continue
            assert.ok(near(setup.derivative(x), numeric(setup.fn, x)), `${fn} f′ at ${x}`)
            assert.ok(near(setup.second(x), numeric(setup.derivative, x)), `${fn} f″ at ${x}`)
        }
        // The marks are on the curve, and each is what it claims to be
        for (const mark of [...setup.cuts, ...setup.maxima, ...setup.minima, ...setup.inflections]) assert.ok(near(setup.fn(mark.x), mark.y, 1e-9), `${fn} (${mark.x}, ${mark.y})`)
        for (const mark of setup.cuts) assert.ok(Math.abs(mark.y) < 1e-12 || Math.abs(mark.x) < 1e-12, `${fn} cut`)
        for (const mark of setup.maxima) assert.ok(setup.derivative(mark.x - 0.01) > 0 && setup.derivative(mark.x + 0.01) < 0, `${fn} max ${mark.x}`)
        for (const mark of setup.minima) assert.ok(setup.derivative(mark.x - 0.01) < 0 && setup.derivative(mark.x + 0.01) > 0, `${fn} min ${mark.x}`)
        for (const mark of setup.inflections) assert.ok(setup.second(mark.x - 0.01) * setup.second(mark.x + 0.01) < 0, `${fn} inflection ${mark.x}`)
        // The asymptotes: f − (mx + n) goes to 0 on their side
        for (const line of setup.lines) {
            for (const far of line.side === 0 ? [-1e5, 1e5] : [line.side * 50]) assert.ok(Math.abs(setup.fn(far) - (line.m * far + line.n)) < 1e-3, `${fn} asymptote at ${far}`)
        }
    }
    assert.deepEqual(LAYER_FUNCTIONS.map(extremaCount), [2, 3, 2, 1])
    assert.deepEqual(LAYER_FUNCTIONS.map((fn) => layerPrediction(at({ fn }))), ['=', '>', '=', '<'])
    assert.equal(at({ layers: 9 }).layers, 6)
    // A new function starts with no layers
    assert.equal(setLayers(at({ layers: 4 }), { fn: 'exp' }).layers, 0)
    checkChallenges(layerChallenges, initialLayerState, {
        111351: at({ fn: 'rational', layers: 3 }),
        111352: at({ fn: 'exp', layers: 4 }),
        111353: at({ fn: 'quartic', layers: 4 }),
        111354: at({ fn: 'rational', layers: 5 }),
        111355: at({ layers: 4 })
    })
    checkExtras(layerExtra, initialLayerState, (state) => setLayers(state, state), 5)
})
