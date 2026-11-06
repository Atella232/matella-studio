import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { CHAIN_LIMITS, chainChallenges, chainExtra, chainPrediction, chainValues, initialChainState, INNER, INNER_MACHINES, OUTER, OUTER_MACHINES, setChain, type ChainState } from '../src/pages/batx1-zientziak-deribatuak/lab/chain.ts'
import { bachDerivativesLabChallengeIds, bachDerivativesLabToolForTopic, bachDerivativesLabTools } from '../src/pages/batx1-zientziak-deribatuak/lab/labTools.ts'
import { initialSecantState, SECANT_FUNCTIONS, SECANT_SETUP, secantChallenges, secantExtra, secantPrediction, secantSlope, setSecant, tangentSlope, type SecantState } from '../src/pages/batx1-zientziak-deribatuak/lab/secant.ts'
import { initialSlopeState, probeSlope, setSlope, SLOPE_FUNCTIONS, SLOPE_SETUP, slopeChallenges, slopeExtra, slopePrediction, type SlopeState } from '../src/pages/batx1-zientziak-deribatuak/lab/slopeGraph.ts'
import { initialSmoothState, lineLatex, pieceEnd, setSmooth, SMOOTH_PIECES, SMOOTH_SETUP, smoothChallenges, smoothExtra, smoothKind, smoothLatex, smoothPrediction, type SmoothState } from '../src/pages/batx1-zientziak-deribatuak/lab/smooth.ts'

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
        // The solution is a state the controls can reach
        assert.deepEqual(setter(challenge.solution), challenge.solution, `seed ${seed}: unreachable ${challenge.prompt.es}`)
        assert.ok(!challenge.isSolved(initial), `seed ${seed} starts solved`)
        checkTexts([challenge.prompt, challenge.hint])
        prompts.add(challenge.prompt.es)
    }
    assert.ok(prompts.size >= 6, `only ${prompts.size} different challenges`)
}

const topics = ['average-rate', 'derivative-point', 'tangent', 'one-sided-derivatives', 'derivable-continuous', 'piecewise-derivable', 'definition', 'powers', 'sum-constant', 'product', 'quotient', 'chain', 'exp-log', 'trig', 'tangent-conditions']

test('deribatuak batx1 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(bachDerivativesLabTools.length, 6)
    for (const tool of bachDerivativesLabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    }
    // The «Observe» text of the tools of this unit is plain text, not LaTeX
    for (const tool of bachDerivativesLabTools.filter((item) => ['secant', 'smooth', 'slope-graph', 'chain'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
        assert.ok(/[؀-ۿ]/.test(tool.observe.ar) && /[؀-ۿ]/.test(tool.title.ar), tool.id)
    }
    assert.equal(new Set(bachDerivativesLabChallengeIds).size, bachDerivativesLabChallengeIds.length)
    // The four tools of this unit use the 110xxx block; the borrowed ones keep their ids
    const own = [...secantChallenges, ...smoothChallenges, ...slopeChallenges, ...chainChallenges].map((challenge) => challenge.id)
    assert.equal(own.length, 20)
    for (const id of own) assert.ok(id >= 110101 && id <= 110399, `${id}`)
    for (const [topic, tool] of Object.entries(bachDerivativesLabToolForTopic)) {
        assert.ok(topics.includes(topic), topic)
        assert.ok(bachDerivativesLabTools.some((item) => item.id === tool), `${topic} → ${tool}`)
    }
    for (const tool of bachDerivativesLabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
})

test('deribatuak batx1 z lab: de la secante a la tangente', () => {
    const at = (patch: Partial<SecantState>) => setSecant(initialSecantState, patch)
    // x² at 1: the secant slope is 2 + h
    assert.ok(Math.abs(secantSlope('square', 1, 0.001) - 2.001) < 1e-9)
    assert.equal(tangentSlope('square', 1), 2)
    assert.equal(tangentSlope('root', 4), 0.25)
    assert.equal(tangentSlope('sine', 0), 1)
    // x² opens upwards: the tangent is less steep than the secant; √x the other way round
    assert.equal(secantPrediction(at({ a: 1 })), '<')
    assert.equal(secantPrediction(at({ fn: 'root', a: 1 })), '>')
    assert.equal(secantPrediction(at({ fn: 'cube', a: -1 })), '>')
    assert.equal(secantPrediction(at({ fn: 'cube', a: 1 })), '<')
    // a stays inside each function's range (√x needs a ≥ 1)
    assert.equal(at({ fn: 'root' }).a, 1)
    assert.equal(at({ a: 9 }).a, 2)
    for (const fn of SECANT_FUNCTIONS) {
        katex.renderToString(SECANT_SETUP[fn].latex, { throwOnError: true, strict: 'error' })
        const { aMin, aMax, view, fn: f } = SECANT_SETUP[fn]
        // P and Q (h up to 1) are always inside the view
        for (let a = aMin; a <= aMax; a += 1) {
            for (const x of [a, a + 1]) {
                assert.ok(x >= view.xMin && x <= view.xMax && f(x) >= view.yMin && f(x) <= view.yMax, `${fn} ${a} ${x}`)
            }
        }
    }
    // A new point asks for a new prediction; a new h does not
    const guessed = { ...at({ a: 1 }), prediction: '<' as const }
    assert.equal(setSecant(guessed, { k: 3 }).prediction, '<')
    assert.equal(setSecant(guessed, { a: 2 }).prediction, null)
    checkChallenges(secantChallenges, initialSecantState, {
        110101: at({ a: 1, k: 4 }),
        110102: at({ a: -2, k: 3 }),
        110103: at({ fn: 'root', a: 4, k: 3 }),
        110104: at({ fn: 'cube', a: 0, k: 4 }),
        110105: at({ fn: 'sine', a: 0, k: 4 })
    })
    checkExtras(secantExtra, initialSecantState, (state) => setSecant(state, state))
})

test('deribatuak batx1 z lab: ¿derivable aquí?', () => {
    const at = (patch: Partial<SmoothState>) => setSmooth(initialSmoothState, patch)
    assert.deepEqual(pieceEnd('square'), { value: 1, slope: 2 })
    assert.deepEqual(pieceEnd('cubic'), { value: 1, slope: 3 })
    assert.deepEqual(pieceEnd('cap'), { value: 3, slope: -2 })
    assert.deepEqual(pieceEnd('flat'), { value: -2, slope: 0 })
    assert.equal(smoothKind(initialSmoothState), 'jump')
    assert.equal(smoothKind(at({ m: 1, n: 0 })), 'corner')
    assert.equal(smoothKind(at({ m: 2, n: -1 })), 'smooth')
    assert.equal(smoothKind(at({ m: 2, n: 0 })), 'jump')
    // Every piece can be joined smoothly with the controls
    for (const piece of SMOOTH_PIECES) {
        const { value, slope } = pieceEnd(piece)
        assert.equal(smoothKind(at({ piece, m: slope, n: value - slope })), 'smooth', piece)
        katex.renderToString(smoothLatex(at({ piece })), { throwOnError: true, strict: 'error' })
        katex.renderToString(SMOOTH_SETUP[piece].latex, { throwOnError: true, strict: 'error' })
    }
    assert.equal(smoothPrediction(at({ piece: 'square' })), '>')
    assert.equal(smoothPrediction(at({ piece: 'cap' })), '<')
    assert.equal(smoothPrediction(at({ piece: 'flat' })), '=')
    assert.equal(lineLatex(2, -1), '2x-1')
    assert.equal(lineLatex(-1, 0), '-x')
    assert.equal(lineLatex(0, -2), '-2')
    assert.equal(lineLatex(1, 3), 'x+3')
    const guessed = { ...at({}), prediction: '>' as const }
    assert.equal(setSmooth(guessed, { m: 2 }).prediction, '>')
    assert.equal(setSmooth(guessed, { piece: 'cap' }).prediction, null)
    checkChallenges(smoothChallenges, initialSmoothState, {
        110301: at({ m: 1, n: 0 }),
        110302: at({ m: 2, n: -1 }),
        110303: at({ piece: 'cap', m: -2, n: 5 }),
        110304: at({ piece: 'cubic', m: 3, n: -2 }),
        110305: at({ piece: 'flat', m: 0, n: -2 })
    })
    checkExtras(smoothExtra, initialSmoothState, (state) => setSmooth(state, state))
})

test('deribatuak batx1 z lab: la gráfica de f′', () => {
    const at = (patch: Partial<SlopeState>) => setSlope(initialSlopeState, patch)
    assert.equal(probeSlope(at({ t: 2 })), 0)
    assert.equal(probeSlope(at({ fn: 'cubic', t: 4 })), 3)
    assert.equal(probeSlope(at({ fn: 'hill', t: -4 })), 2)
    assert.equal(probeSlope(at({ fn: 'sine', t: 0 })), 1)
    assert.equal(slopePrediction(at({ fn: 'parabola' })), '>')
    assert.equal(slopePrediction(at({ fn: 'cubic' })), '<')
    assert.equal(slopePrediction(at({ fn: 'hill' })), '=')
    assert.equal(slopePrediction(at({ fn: 'sine' })), '<')
    assert.equal(slopePrediction(at({ fn: 'exp' })), '>')
    for (const fn of SLOPE_FUNCTIONS) {
        const setup = SLOPE_SETUP[fn]
        katex.renderToString(setup.latex, { throwOnError: true, strict: 'error' })
        katex.renderToString(setup.derivativeLatex, { throwOnError: true, strict: 'error' })
        // The derivative is the slope of the function (a numeric check at a few points)
        for (const x of [-2, -0.5, 1, 2.5]) assert.ok(Math.abs((setup.fn(x + 1e-6) - setup.fn(x - 1e-6)) / 2e-6 - setup.derivative(x)) < 1e-5, `${fn} ${x}`)
        // The marked point is on the visible part of f
        assert.ok(setup.fn(setup.p) >= setup.top[0] && setup.fn(setup.p) <= setup.top[1], fn)
    }
    const guessed = { ...at({}), prediction: '>' as const }
    assert.equal(setSlope(guessed, { t: 3 }).prediction, '>')
    assert.equal(setSlope(guessed, { fn: 'hill' }).prediction, null)
    checkChallenges(slopeChallenges, initialSlopeState, {
        110201: at({ t: 2 }),
        110202: at({ fn: 'cubic', t: 4 }),
        110203: at({ fn: 'cubic', t: -2 }),
        110204: at({ fn: 'sine', t: 0 }),
        110205: at({ fn: 'exp', t: 2 })
    })
    checkExtras(slopeExtra, initialSlopeState, (state) => setSlope(state, state))
})

test('deribatuak batx1 z lab: la cadena de máquinas', () => {
    const at = (patch: Partial<ChainState>) => setChain(initialChainState, patch)
    // u = x², y = u³ at x = 1: 3·1²·2 = 6
    assert.deepEqual(chainValues('square', 'cube', 1), { u: 1, y: 1, innerSlope: 2, outerSlope: 3, total: 6 })
    assert.equal(chainValues('shift', 'cube', 1).total, 12)
    assert.equal(chainValues('square', 'square', -1).total, -4)
    assert.equal(chainValues('double', 'half', 2).total, 1)
    // The chain rule agrees with the slope of the composite, at every x the stepper reaches
    for (const inner of INNER_MACHINES) {
        for (const outer of OUTER_MACHINES) {
            for (let x = CHAIN_LIMITS.x.min; x <= CHAIN_LIMITS.x.max; x += 1) {
                const composite = (value: number) => OUTER[outer].fn(INNER[inner].fn(value))
                const numeric = (composite(x + 1e-6) - composite(x - 1e-6)) / 2e-6
                assert.ok(Math.abs(numeric - chainValues(inner, outer, x).total) < 1e-4, `${inner} ${outer} ${x}`)
            }
            katex.renderToString(INNER[inner].latex + OUTER[outer].latex, { throwOnError: true, strict: 'error' })
        }
    }
    assert.equal(chainPrediction(initialChainState), '>')
    assert.equal(chainPrediction(at({ inner: 'half', outer: 'half' })), '<')
    assert.equal(chainPrediction(at({ inner: 'double', outer: 'half' })), '=')
    const guessed = { ...at({}), prediction: '>' as const }
    assert.equal(setChain(guessed, { x: 2 }).prediction, '>')
    assert.equal(setChain(guessed, { outer: 'cube' }).prediction, null)
    checkChallenges(chainChallenges, initialChainState, {
        110351: at({ inner: 'square', outer: 'cube', x: 1 }),
        110352: at({ inner: 'square', x: 0 }),
        110353: at({ outer: 'half' }),
        110354: at({ inner: 'square', x: -1 }),
        110355: at({ inner: 'shift', outer: 'cube', x: 1 })
    })
    checkExtras(chainExtra, initialChainState, (state) => setChain(state, state))
})
