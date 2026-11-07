import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { BOLZANO_FUNCTIONS, BOLZANO_LATEX, bolzanoChallenges, bolzanoExtra, bolzanoIntervals, bolzanoKind, bolzanoValue, finalInterval, initialBolzanoState, rootIn, setBolzano, type BolzanoState } from '../src/pages/batx1-zientziak-limiteak/lab/bolzano.ts'
import { degreesChallenges, degreesExtra, degreesLatex, degreesLimit, degreesPrediction, degreesValue, initialDegreesState, ratioLatex, setDegrees, type DegreesState } from '../src/pages/batx1-zientziak-limiteak/lab/degrees.ts'
import { holeChallenges, holeExtra, holeKind, holeLatex, holeLimit, holeSides, holeValue, initialHoleState, setHole, substituteLatex, type HoleState } from '../src/pages/batx1-zientziak-limiteak/lab/hole.ts'
import { bachLimitsLabChallengeIds, bachLimitsLabToolForTopic, bachLimitsLabTools } from '../src/pages/batx1-zientziak-limiteak/lab/labTools.ts'
import { initialLensState, LENS_FUNCTIONS, LENS_SETUP, lensChallenges, lensExtra, lensLimits, lensPrediction, lensValues, setLens, type LensState } from '../src/pages/batx1-zientziak-limiteak/lab/lens.ts'

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

test('limiteak batx1 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(bachLimitsLabTools.length, 8)
    const stages = ['point', 'calculus', 'infinity', 'asymptotes', 'continuity']
    for (const stage of stages) assert.ok(bachLimitsLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of bachLimitsLabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    }
    // The «Observe» text of the tools of this unit is plain text, not LaTeX
    for (const tool of bachLimitsLabTools.filter((item) => ['lens', 'hole', 'degrees', 'bolzano'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
        assert.ok(/[؀-ۿ]/.test(tool.observe.ar) && /[؀-ۿ]/.test(tool.title.ar), tool.id)
    }
    assert.equal(new Set(bachLimitsLabChallengeIds).size, bachLimitsLabChallengeIds.length)
    // The four tools of this unit use the 109xxx block; the borrowed ones keep their ids
    const own = [...lensChallenges, ...holeChallenges, ...degreesChallenges, ...bolzanoChallenges].map((challenge) => challenge.id)
    assert.equal(own.length, 20)
    for (const id of own) assert.ok(id >= 109101 && id <= 109399, `${id}`)
    const topics = ['idea', 'one-sided', 'infinite', 'substitute', 'zero-zero', 'roots', 'degrees', 'infinity-minus', 'e-limits', 'vertical-horizontal', 'oblique', 'branches', 'continuous', 'discontinuities', 'bolzano']
    for (const [topic, tool] of Object.entries(bachLimitsLabToolForTopic)) {
        assert.ok(topics.includes(topic), topic)
        assert.ok(bachLimitsLabTools.some((item) => item.id === tool), `${topic} → ${tool}`)
    }
    for (const tool of bachLimitsLabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
})

test('limiteak batx1 z lab: la lupa del límite', () => {
    const at = (patch: Partial<LensState>) => setLens(initialLensState, patch)
    // (x² − 4)/(x − 2) near 2: 3,999 and 4,001
    assert.deepEqual(lensValues(at({ k: 3 })), [3.999, 4.001])
    assert.deepEqual(lensValues(at({ k: 0 })), [3, 5])
    assert.deepEqual(lensLimits('jump'), [2, 3])
    assert.deepEqual(lensLimits('drop'), [2, 0])
    assert.deepEqual(lensValues(at({ fn: 'moved', k: 2 })), [2.98, 3.02])
    assert.deepEqual(lensValues(at({ fn: 'sign', k: 1 })), [-1, 1])
    assert.equal(lensPrediction(at({ fn: 'hole' })), '=')
    assert.equal(lensPrediction(at({ fn: 'moved' })), '=')
    assert.equal(lensPrediction(at({ fn: 'jump' })), '<')
    assert.equal(lensPrediction(at({ fn: 'sign' })), '<')
    assert.equal(lensPrediction(at({ fn: 'drop' })), '>')
    // f(a) is what the piece on the right gives, or a point apart
    assert.equal(LENS_SETUP.jump.at, LENS_SETUP.jump.right(1))
    assert.equal(LENS_SETUP.drop.at, LENS_SETUP.drop.right(-1))
    assert.notEqual(LENS_SETUP.moved.at, LENS_SETUP.moved.right(1))
    for (const fn of LENS_FUNCTIONS) katex.renderToString(LENS_SETUP[fn].latex, { throwOnError: true, strict: 'error' })
    // A prediction stays while only the lens changes
    const guessed = { ...at({ fn: 'jump' }), prediction: '<' as const }
    assert.equal(setLens(guessed, { k: 3 }).prediction, '<')
    assert.equal(setLens(guessed, { fn: 'drop' }).prediction, null)
    checkChallenges(lensChallenges, initialLensState, {
        109101: at({ k: 3 }),
        109102: at({ fn: 'jump', k: 2 }),
        109103: at({ fn: 'moved', k: 3 }),
        109104: at({ fn: 'drop', k: 2 }),
        109105: at({ fn: 'sign', k: 3 })
    })
    checkExtras(lensExtra, initialLensState, (state) => setLens(state, state))
})

test('limiteak batx1 z lab: el agujero del 0/0', () => {
    const at = (patch: Partial<HoleState>) => setHole(initialHoleState, patch)
    // (x − 2)(x + 1)/(x − 1): 2·... k/0 at once
    assert.equal(holeKind(initialHoleState), '<')
    assert.equal(holeLatex(initialHoleState), 'f(x)=\\frac{x^2-x-2}{x-1}')
    assert.equal(substituteLatex(initialHoleState), 'f(1)\\to\\frac{-2}{0}')
    assert.deepEqual(holeSides(initialHoleState), [1, -1])
    // (x − 2)(x + 1)/(x − 2): a hole at (2, 3)
    const hole = at({ d: 2 })
    assert.equal(holeKind(hole), '=')
    assert.equal(holeLimit(hole), 3)
    assert.equal(holeValue(hole, 2), null)
    assert.equal(holeValue(hole, 3), 4)
    assert.equal(substituteLatex(hole), 'f(2)\\to\\frac{0}{0}')
    // (x − 2)(x + 1)/(x − 2)²: 0/0 and still an asymptote
    const after = at({ d: 2, power: 2 })
    assert.equal(holeKind(after), '>')
    assert.equal(holeLatex(after), 'f(x)=\\frac{x^2-x-2}{x^2-4x+4}')
    assert.deepEqual(holeSides(after), [-1, 1])
    // (x − 1)²/(x − 1)² is 1 with a hole
    assert.equal(holeLimit(at({ r: 1, s: 1, d: 1, power: 2 })), 1)
    assert.equal(holeLimit(at({ r: 1, s: 1, d: 1 })), 0)
    // The sides agree with the values just beside d
    for (let r = -3; r <= 3; r += 1) for (let s = -3; s <= 3; s += 1) for (let d = -3; d <= 3; d += 1) for (const power of [1, 2] as const) {
        const state = at({ r, s, d, power })
        const sides = holeSides(state)
        if (sides) {
            assert.equal(Math.sign(holeValue(state, d - 1e-4)!), sides[0], `${r} ${s} ${d} ${power}`)
            assert.equal(Math.sign(holeValue(state, d + 1e-4)!), sides[1], `${r} ${s} ${d} ${power}`)
        } else {
            assert.ok(Math.abs(holeValue(state, d + 1e-6)! - holeLimit(state)!) < 1e-4, `${r} ${s} ${d} ${power}`)
        }
        katex.renderToString(holeLatex(state), { throwOnError: true, strict: 'error' })
    }
    const guessed = { ...hole, prediction: '=' as const }
    assert.equal(setHole(guessed, { d: 2 }).prediction, '=')
    assert.equal(setHole(guessed, { power: 2 }).prediction, null)
    checkChallenges(holeChallenges, initialHoleState, {
        109201: at({ d: 2 }),
        109202: at({ r: 1, s: -2, d: 1 }),
        109203: at({ d: 2, power: 2 }),
        109204: at({ r: 1, s: 1, d: 1 }),
        109205: at({ r: 1, s: 2, d: -2, power: 2 })
    })
    checkExtras(holeExtra, initialHoleState, (state) => setHole(state, state))
})

test('limiteak batx1 z lab: gana el de mayor grado', () => {
    const at = (patch: Partial<DegreesState>) => setDegrees(initialDegreesState, patch)
    assert.equal(degreesLatex(initialDegreesState), 'f(x)=\\frac{x^2+5x}{x-4}')
    assert.equal(degreesLatex(at({ m: 1, n: 3, a: -2, b: 3 })), 'f(x)=\\frac{-2x+5}{3x^3-4}')
    assert.equal(degreesPrediction(initialDegreesState), '>')
    assert.equal(degreesLimit(initialDegreesState), Infinity)
    assert.equal(degreesLimit(at({ a: -1 })), -Infinity)
    assert.equal(degreesLimit(at({ m: 1, n: 3 })), 0)
    assert.equal(degreesLimit(at({ m: 3, n: 3, a: 3, b: 2 })), 1.5)
    // The values really get close to the limit
    const draw = at({ m: 2, n: 2, a: 3, b: -2 })
    assert.ok(Math.abs(degreesValue(draw, 10_000) - -1.5) < 1e-3)
    // A leading coefficient is never 0
    assert.equal(setDegrees(initialDegreesState, { a: 0 }).a, -1)
    assert.equal(setDegrees({ ...initialDegreesState, a: -1 }, { a: 0 }).a, 1)
    assert.equal(ratioLatex(2, -4), '-\\frac{1}{2}')
    assert.equal(ratioLatex(-3, -1), '3')
    const guessed = { ...initialDegreesState, prediction: '>' as const }
    assert.equal(setDegrees(guessed, { k: 4 }).prediction, '>')
    assert.equal(setDegrees(guessed, { n: 2 }).prediction, null)
    checkChallenges(degreesChallenges, initialDegreesState, {
        109301: at({ n: 2, a: 3 }),
        109302: at({ n: 2, a: 2, b: -1 }),
        109303: at({ n: 3 }),
        109304: at({ a: -2 }),
        109305: at({ m: 3, n: 3, a: 1, b: 2 })
    })
    checkExtras(degreesExtra, initialDegreesState, (state) => setDegrees(state, state))
})

test('limiteak batx1 z lab: Bolzano encierra la raíz', () => {
    const at = (patch: Partial<BolzanoState>) => setBolzano(initialBolzanoState, patch)
    assert.equal(bolzanoKind(initialBolzanoState), '>')
    assert.equal(bolzanoKind(at({ p: 1, q: 2 })), '<')
    assert.equal(bolzanoKind(at({ fn: 'odd', p: 0, q: 2 })), '=')
    assert.equal(bolzanoKind(at({ fn: 'jump', p: 0, q: 2 })), '>')
    assert.equal(bolzanoKind(at({ fn: 'jump', p: 2, q: 3 })), '>')
    assert.equal(bolzanoValue('jump', 1), null)
    // x³ + x − 3 on [1, 2]: [1; 1,5] → [1; 1,25] → [1,125; 1,25]
    assert.deepEqual(bolzanoIntervals(at({ fn: 'cubic2', p: 1, q: 2, halvings: 3 })), [[1, 2], [1, 1.5], [1, 1.25], [1.125, 1.25]])
    // A midpoint that is a root closes the interval: x³ − x on [−2, 2]
    assert.deepEqual(finalInterval(at({ fn: 'odd', p: -2, q: 2, halvings: 2 })), [0, 0])
    // Each interval keeps a change of sign and the root
    for (const fn of BOLZANO_FUNCTIONS) {
        katex.renderToString(BOLZANO_LATEX[fn], { throwOnError: true, strict: 'error' })
        for (let p = -3; p <= 2; p += 1) for (let q = p + 1; q <= 3; q += 1) {
            const state = at({ fn, p, q, halvings: 3 })
            if (bolzanoKind(state) !== '<') continue
            for (const [lo, hi] of bolzanoIntervals(state)) if (lo !== hi) assert.ok(bolzanoValue(fn, lo)! * bolzanoValue(fn, hi)! < 0, `${fn} [${lo}, ${hi}]`)
        }
    }
    assert.ok(Math.abs(rootIn('square', 1, 2) - Math.SQRT2) < 1e-12)
    // The ends make way for each other
    assert.deepEqual([at({ p: 2 }).p, at({ p: 2 }).q], [2, 3])
    assert.deepEqual([at({ q: -1 }).p, at({ q: -1 }).q], [-2, -1])
    const guessed = { ...at({ p: 1, q: 2 }), prediction: '<' as const }
    assert.equal(setBolzano(guessed, { halvings: 2 }).prediction, '<')
    assert.equal(setBolzano(guessed, { q: 3 }).prediction, null)
    checkChallenges(bolzanoChallenges, initialBolzanoState, {
        109351: at({ fn: 'cubic', p: -2, q: -1 }),
        109352: at({ fn: 'jump', p: 0, q: 2 }),
        109353: at({ p: 1, q: 2, halvings: 2 }),
        109354: at({ fn: 'odd', p: 0, q: 2 }),
        109355: at({ fn: 'cubic2', p: 1, q: 2, halvings: 3 })
    })
    checkExtras(bolzanoExtra, initialBolzanoState, (state) => setBolzano(state, state))
})
