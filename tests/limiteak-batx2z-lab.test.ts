import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { DELTAS, deltaWorks, EPSILON_FUNCTIONS, EPSILON_SETUP, epsilonChallenges, epsilonExtra, epsilonPrediction, EPSILONS, initialEpsilonState, largestDeltaIndex, setEpsilon, type EpsilonState } from '../src/pages/batx2-zientziak-limiteak/lab/epsilon.ts'
import { compareOrders, digits, GROWTH_LATEX, GROWTHS, initialRaceState, raceChallenges, raceExtra, setRace, type RaceState } from '../src/pages/batx2-zientziak-limiteak/lab/infinities.ts'
import { initialJointsState, isContinuous, JOINTS_LIMITS, JOINTS_SETUP, JOINTS_SETUPS, jointClosed, jointsChallenges, jointsExtra, jointsLatex, setJoints } from '../src/pages/batx2-zientziak-limiteak/lab/joints.ts'
import { bach2LimitsLabChallengeIds, bach2LimitsLabToolForTopic, bach2LimitsLabTools } from '../src/pages/batx2-zientziak-limiteak/lab/labTools.ts'
import { continuousOn, extremes, initialTheoremState, rootsIn, setTheorem, THEOREM_FUNCTIONS, THEOREM_SETUP, theoremChallenges, theoremExtra, theoremPrediction, type TheoremState } from '../src/pages/batx2-zientziak-limiteak/lab/theorems.ts'

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

test('limiteak batx2 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(bach2LimitsLabTools.length, 9)
    const stages = ['review', 'definition', 'notable', 'continuity', 'theorems']
    for (const stage of stages) assert.ok(bach2LimitsLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of bach2LimitsLabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    }
    for (const tool of bach2LimitsLabTools.filter((item) => ['epsilon', 'race', 'joints', 'theorem'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
        assert.ok(/[؀-ۿ]/.test(tool.observe.ar) && /[؀-ۿ]/.test(tool.title.ar), tool.id)
    }
    assert.equal(new Set(bach2LimitsLabChallengeIds).size, bach2LimitsLabChallengeIds.length)
    const own = [...epsilonChallenges, ...raceChallenges, ...jointsChallenges, ...theoremChallenges].map((challenge) => challenge.id)
    assert.equal(own.length, 20)
    for (const id of own) assert.ok(id >= 122101 && id <= 122399, `${id}`)
    const topics = ['review-point', 'review-infinity', 'review-continuity', 'epsilon-delta', 'infinite-definitions', 'minus-infinity', 'orders', 'one-infinity', 'sine-limit', 'interval', 'parameter', 'two-parameters', 'bolzano-equations', 'intermediate', 'weierstrass']
    for (const [topic, tool] of Object.entries(bach2LimitsLabToolForTopic)) {
        assert.ok(topics.includes(topic), topic)
        assert.ok(bach2LimitsLabTools.some((item) => item.id === tool), `${topic} → ${tool}`)
    }
    for (const tool of bach2LimitsLabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
})

test('limiteak batx2 z lab: epsilon and delta', () => {
    const at = (fn: EpsilonState['fn'], e: number, delta: number): EpsilonState => ({ fn, e, d: DELTAS.indexOf(delta), prediction: null })
    checkChallenges(epsilonChallenges, initialEpsilonState, {
        122101: at('steep', 1, 0.1),
        122102: at('gentle', 2, 0.4),
        122103: at('hole', 3, 0.1),
        122104: at('square', 0, 0.4),
        122105: at('steep', 3, 0.02)
    })
    checkExtras(epsilonExtra, initialEpsilonState, (state) => setEpsilon(state, state))
    for (const fn of EPSILON_FUNCTIONS) {
        const { a, limit, f, bestDelta } = EPSILON_SETUP[fn]
        assert.ok(Math.abs(f(a) - limit) < 1e-12, `${fn}: the limit`)
        for (let e = 0; e < EPSILONS.length; e++) {
            const epsilon = EPSILONS[e]
            // Sampling the strip agrees with bestDelta: a δ works exactly when it is not above it
            const index = largestDeltaIndex(fn, e)
            assert.ok(index >= 0, `${fn} ε=${epsilon}: some δ works`)
            assert.ok(DELTAS[index] <= bestDelta(epsilon) + 1e-9 && (index === 0 || DELTAS[index - 1] > bestDelta(epsilon) + 1e-9), `${fn} ε=${epsilon}`)
            for (let d = 0; d < DELTAS.length; d++) {
                let worst = 0
                for (let i = 1; i < 400; i++) {
                    const x = a - DELTAS[d] + (2 * DELTAS[d] * i) / 400
                    if (Math.abs(x - a) > 1e-12) worst = Math.max(worst, Math.abs(f(x) - limit))
                }
                if (deltaWorks({ fn, e, d, prediction: null })) assert.ok(worst <= epsilon + 1e-9, `${fn} ε=${epsilon} δ=${DELTAS[d]}`)
            }
            const prediction = epsilonPrediction({ fn, e, d: 0, prediction: null })
            assert.equal(prediction, bestDelta(epsilon) < epsilon - 1e-9 ? '<' : bestDelta(epsilon) > epsilon + 1e-9 ? '>' : '=')
        }
    }
})

test('limiteak batx2 z lab: the race of infinities', () => {
    const race = (top: RaceState['top'], bottom: RaceState['bottom'], coef: number, k: number): RaceState => ({ top, bottom, coef, k, prediction: null })
    checkChallenges(raceChallenges, initialRaceState, {
        122201: race('x3', 'expe', 1, 3),
        122202: race('x10', 'exp11', 1, 2),
        122203: race('x2', 'x2', 3, 1),
        122204: race('ln', 'sqrt', 1, 4),
        122205: race('x2', 'ln', 1, 3)
    })
    checkExtras(raceExtra, initialRaceState, (state) => setRace(state, state))
    // The order says who wins in the end: far enough, the digits of the winner grow faster
    for (const top of GROWTHS) {
        for (const bottom of GROWTHS) {
            const order = compareOrders(top, bottom)
            const far = digits(top, 7) - digits(bottom, 7)
            const nearer = digits(top, 6) - digits(bottom, 6)
            if (order === 0) assert.equal(top, bottom)
            else if (order > 0) assert.ok(far > nearer, `${top} / ${bottom}`)
            else assert.ok(far < nearer, `${top} / ${bottom}`)
            katex.renderToString(`\\frac{${GROWTH_LATEX[top]}}{${GROWTH_LATEX[bottom]}}`, { throwOnError: true, strict: 'error' })
        }
    }
    // The trap: x¹⁰ is ahead of 1,1ˣ at x = 100 and behind at x = 1000
    assert.ok(digits('x10', 2) > digits('exp11', 2) && digits('x10', 3) < digits('exp11', 3))
})

test('limiteak batx2 z lab: adjust a and b', () => {
    checkChallenges(jointsChallenges, initialJointsState, {
        122301: { setup: 's1', a: 5, b: 6, prediction: null },
        122302: { setup: 's2', a: -1, b: 2, prediction: null },
        122303: { setup: 's3', a: 2, b: 3, prediction: null },
        122304: { setup: 's1', a: 0, b: 1, prediction: null },
        122305: { setup: 's2', a: 1, b: 4, prediction: null }
    })
    checkExtras(jointsExtra, initialJointsState, (state) => setJoints(state, state))
    for (const setup of JOINTS_SETUPS) {
        katex.renderToString(jointsLatex(setup), { throwOnError: true, strict: 'error' })
        // Exactly one pair (a, b) closes both joints, and it is the solution
        const pairs: Array<[number, number]> = []
        for (let a = JOINTS_LIMITS.a.min; a <= JOINTS_LIMITS.a.max; a++) for (let b = JOINTS_LIMITS.b.min; b <= JOINTS_LIMITS.b.max; b++) if (isContinuous({ setup, a, b })) pairs.push([a, b])
        assert.deepEqual(pairs, [JOINTS_SETUP[setup].solution], setup)
        // The prediction: how b moves to keep the first joint closed when a goes up
        const closing = (a: number) => {
            for (let b = JOINTS_LIMITS.b.min; b <= JOINTS_LIMITS.b.max; b++) if (jointClosed({ setup, a, b }, 0)) return b
            return null
        }
        const b0 = closing(0)
        const b1 = closing(1)
        assert.ok(b0 !== null && b1 !== null, setup)
        assert.equal(JOINTS_SETUP[setup].firstJoint, b1! < b0! ? '<' : b1! > b0! ? '>' : '=', setup)
    }
})

test('limiteak batx2 z lab: the right theorem', () => {
    const state = (fn: TheoremState['fn'], layer: TheoremState['layer'], a: number, b: number, extra: Partial<TheoremState> = {}): TheoremState => ({ fn, layer, a, b, k: 0, open: false, prediction: null, ...extra })
    checkChallenges(theoremChallenges, initialTheoremState, {
        122351: state('cubic', 'bolzano', 0, 1),
        122352: state('jump', 'bolzano', 0, 2),
        122353: state('cubic', 'darboux', -1, 1, { k: 2 }),
        122354: state('parabola', 'weierstrass', 0, 2, { open: true }),
        122355: state('pole', 'weierstrass', 0, 2)
    })
    checkExtras(theoremExtra, initialTheoremState, (current) => setTheorem(current, current))
    // The roots found are roots, and the cubic has its three
    const cubic = rootsIn(state('cubic', 'bolzano', -2, 2))
    assert.equal(cubic.length, 3)
    for (const x of cubic) assert.ok(Math.abs(THEOREM_SETUP.cubic.f(x)) < 1e-6)
    // On [0, 2] the jump and the pole change sign with no root: Bolzano needs continuity
    for (const fn of ['jump', 'pole'] as const) {
        assert.ok(!continuousOn(state(fn, 'bolzano', 0, 2)))
        assert.equal(rootsIn(state(fn, 'bolzano', 0, 2)).length, 0)
        assert.equal(theoremPrediction(state(fn, 'bolzano', 0, 2)), '<')
    }
    // When a theorem says yes, what it promises is there
    for (const fn of THEOREM_FUNCTIONS) {
        for (let a = -2; a < 2; a++) {
            for (let b = a + 1; b <= 2; b++) {
                if (theoremPrediction(state(fn, 'bolzano', a, b)) === '>') assert.ok(rootsIn(state(fn, 'bolzano', a, b)).length > 0, `${fn} [${a},${b}]`)
                if (theoremPrediction(state(fn, 'weierstrass', a, b)) === '>') {
                    const { max, min } = extremes(state(fn, 'weierstrass', a, b))
                    assert.ok(Number.isFinite(max[1]) && Number.isFinite(min[1]), `${fn} [${a},${b}]`)
                }
            }
        }
    }
})
