import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { argumentOf, complexLatex, complexPlain, modulus, mul, type Complex } from '../src/pages/batx1-zientziak-konplexuak/lab/complex.ts'
import { konplexuakBatx1zLabChallengeIds, konplexuakBatx1zLabToolForTopic, konplexuakBatx1zLabTools } from '../src/pages/batx1-zientziak-konplexuak/lab/labTools.ts'
import { imageOf, initialPlaneState, planeChallenges, planeExtra, planePrediction, quadrantOf, setPlane, type PlaneState } from '../src/pages/batx1-zientziak-konplexuak/lab/plane.ts'
import { firstQuadrantCount, initialRootsState, ROOT_MODULI, rootArguments, rootModulus, rootPoints, rootsChallenges, rootsExtra, setRoots, type RootsState } from '../src/pages/batx1-zientziak-konplexuak/lab/roots.ts'
import { initialTurnState, MULTIPLIERS, productOf, setTurn, stretch, turnAngle, turnChallenges, turnExtra, turnPrediction, type TurnState } from '../src/pages/batx1-zientziak-konplexuak/lab/turn.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const
const topics = ['imaginary-unit', 'binomial-form', 'complex-plane', 'add-multiply', 'division', 'powers-of-i', 'quadratic-complex', 'modulus-argument', 'polar-binomial', 'product-quotient', 'rotations', 'de-moivre', 'nth-roots', 'roots-polygons', 'binomial-equations']

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
            assert.ok(!/\\(?:sen|tg)(?![a-zA-Z])/.test(text[language]), text[language])
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        assert.ok(/[؀-ۿ]/.test(text.ar.replace(/\$[^$]+\$/g, '')), `not Arabic: ${text.ar}`)
        // No Basque suffix glued to a number or to a formula, and z is always {z}
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
    }
}

/** Every fixed challenge is solved by a state we name, and none is solved when the tool opens */
function checkChallenges<State>(challenges: LabChallenge<State>[], initial: State, solutions: Record<number, State>) {
    assert.equal(new Set(challenges.map((challenge) => challenge.id)).size, challenges.length)
    assert.deepEqual(Object.keys(solutions).map(Number).sort(), challenges.map((challenge) => challenge.id).sort())
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

test('konplexuak batx1 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(konplexuakBatx1zLabTools.length, 7)
    for (const stage of ['binomial', 'operations', 'polar', 'turns', 'roots']) assert.ok(konplexuakBatx1zLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of konplexuakBatx1zLabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    }
    // The «Observe» text of the tools of this unit is plain text, not LaTeX
    for (const tool of konplexuakBatx1zLabTools.filter((item) => ['plane', 'turn', 'roots'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
        assert.ok(/[؀-ۿ]/.test(tool.observe.ar) && tool.observe.eu !== tool.observe.es, tool.id)
    }
    assert.equal(new Set(konplexuakBatx1zLabChallengeIds).size, konplexuakBatx1zLabChallengeIds.length)
    // The three tools of this unit use the 104xxx block; the borrowed ones keep their ids
    const own = [...planeChallenges, ...turnChallenges, ...rootsChallenges].map((challenge) => challenge.id)
    for (const id of own) assert.ok(id >= 104101 && id <= 104399, `${id}`)
    for (const id of konplexuakBatx1zLabChallengeIds.filter((item) => !own.includes(item))) assert.ok((id >= 71000 && id < 72000) || (id >= 73000 && id < 74000) || (id >= 103200 && id < 103300), `${id}`)
    assert.deepEqual(Object.keys(konplexuakBatx1zLabToolForTopic).sort(), [...topics].sort())
    for (const [topic, tool] of Object.entries(konplexuakBatx1zLabToolForTopic)) assert.ok(konplexuakBatx1zLabTools.some((item) => item.id === tool), `${topic} → ${tool}`)
    for (const tool of konplexuakBatx1zLabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
})

test('konplexuak batx1 z lab: the numbers are written as the formulas write them', () => {
    const cases: Array<[Complex, string, string]> = [[[3, -2], '3-2i', '3 − 2i'], [[0, -1], '-i', '−i'], [[-4, 0], '-4', '−4'], [[0, 1], 'i', 'i'], [[-1, 3], '-1+3i', '−1 + 3i'], [[0, 0], '0', '0'], [[0.5, 1.5], '0.5+1.5i', '0.5 + 1.5i']]
    for (const [value, latex, plain] of cases) {
        assert.equal(complexLatex(value), latex)
        assert.equal(complexPlain(value), plain)
    }
    assert.equal(argumentOf([0, 0]), null)
    assert.equal(argumentOf([-1, 0]), 180)
    assert.ok(Math.abs(argumentOf([1, -1])! - 315) < 1e-9)
})

test('konplexuak batx1 z lab: the complex plane', () => {
    const at = (a: number, b: number, show: PlaneState['show']): PlaneState => ({ a, b, show, prediction: null })
    checkChallenges(planeChallenges, initialPlaneState, {
        104101: at(-2, 3, 'conjugate'), 104102: at(-4, 3, 'opposite'), 104103: at(-3, 0, 'conjugate'), 104104: at(-1, 2, 'opposite'), 104105: at(-2, 2, 'conjugate')
    })
    checkExtras(planeExtra, initialPlaneState, (state) => setPlane({ ...state, prediction: null }, state))
    // The image of every z, and the quadrant the prediction asks about
    for (let a = -4; a <= 4; a++) {
        for (let b = -4; b <= 4; b++) {
            assert.deepEqual(imageOf({ a, b, show: 'opposite' }), [a === 0 ? 0 : -a, b === 0 ? 0 : -b])
            assert.deepEqual(imageOf({ a, b, show: 'conjugate' }), [a, b === 0 ? 0 : -b])
            const opposite = planePrediction(at(a, b, 'opposite'))
            const conjugate = planePrediction(at(a, b, 'conjugate'))
            if (a !== 0 && b !== 0) {
                assert.equal((quadrantOf([a, b]) + 1) % 4 + 1, opposite, `${a} ${b}`)
                assert.equal(5 - quadrantOf([a, b]), conjugate, `${a} ${b}`)
            } else assert.ok(opposite === 0 && conjugate === 0)
        }
    }
    // A change of z or of what is shown asks for a new prediction
    assert.equal(setPlane({ ...initialPlaneState, prediction: 4 }, { a: 1 }).prediction, null)
    assert.equal(setPlane({ ...initialPlaneState, prediction: 4 }, { a: 3 }).prediction, 4)
})

test('konplexuak batx1 z lab: multiplying is turning', () => {
    const at = (a: number, b: number, id: string): TurnState => ({ a, b, w: MULTIPLIERS.findIndex((item) => item.id === id), prediction: null })
    checkChallenges(turnChallenges, initialTurnState, {
        104201: at(2, 1, 'i'), 104202: at(1, 3, 'minus-one'), 104203: at(0, 2, 'i'), 104204: at(1, 1, 'two-i'), 104205: at(1, -1, 'one-plus-i')
    })
    checkExtras(turnExtra, initialTurnState, (state) => setTurn({ ...state, prediction: null }, state))
    // |z · w| = |z| · |w| and arg(z · w) = arg z + arg w, for every z and w of the tool
    for (let a = -3; a <= 3; a++) {
        for (let b = -3; b <= 3; b++) {
            if (a === 0 && b === 0) continue
            for (let w = 0; w < MULTIPLIERS.length; w++) {
                const state: TurnState = { a, b, w, prediction: null }
                const product = productOf(state)
                assert.ok(Math.abs(modulus(product) - modulus([a, b]) * stretch(state)) < 1e-9)
                const expected = (argumentOf([a, b])! + turnAngle(state)) % 360
                assert.ok(Math.abs(((argumentOf(product)! - expected + 540) % 360) - 180) < 1e-9, `${a} ${b} ${MULTIPLIERS[w].id}`)
            }
        }
    }
    // The turns of the multipliers, and the prediction they give
    assert.deepEqual(MULTIPLIERS.map((_, w) => turnAngle({ w })), [90, 180, 270, 0, 45, 90, 45])
    assert.deepEqual(MULTIPLIERS.map((_, w) => turnPrediction({ a: 1, b: 1, w, prediction: null })), ['=', '>', '>', '<', '<', '=', '<'])
    for (const item of MULTIPLIERS) for (const language of languages) katex.renderToString(formulaFor(language, `w=${item.latex}\\qquad |w|=${item.modulusLatex}`), { throwOnError: true, strict: 'error' })
    assert.deepEqual(mul([2, 1], [0, 1]), [-1, 2])
})

test('konplexuak batx1 z lab: the roots make a polygon', () => {
    const at = (n: number, R: number, theta: number): RootsState => ({ n, m: ROOT_MODULI.indexOf(R), theta, prediction: null })
    checkChallenges(rootsChallenges, initialRootsState, {
        104301: at(4, 16, 0), 104302: at(3, 8, 0), 104303: at(2, 1, 180), 104304: at(6, 64, 0), 104305: at(2, 1, 90)
    })
    checkExtras(rootsExtra, initialRootsState, (state) => setRoots({ ...state, prediction: null }, state))
    // Every root raised to n gives w back, and the roots are 360°/n apart
    for (let n = 2; n <= 6; n++) {
        for (const R of ROOT_MODULI) {
            for (let theta = 0; theta <= 330; theta += 30) {
                const state = at(n, R, theta)
                const w: Complex = [R * Math.cos((theta * Math.PI) / 180), R * Math.sin((theta * Math.PI) / 180)]
                for (const root of rootPoints(state)) {
                    let power: Complex = [1, 0]
                    for (let k = 0; k < n; k++) power = mul(power, root)
                    assert.ok(Math.abs(power[0] - w[0]) < 1e-6 * R && Math.abs(power[1] - w[1]) < 1e-6 * R, `${n} ${R} ${theta}`)
                }
                const angles = rootArguments(state)
                for (let k = 1; k < n; k++) assert.ok(Math.abs(angles[k] - angles[k - 1] - 360 / n) < 1e-9)
                assert.ok(Math.abs(rootModulus(state) ** n - R) < 1e-6 * R)
                assert.equal(firstQuadrantCount(state), angles.filter((angle) => angle > 0 && angle < 90).length)
            }
        }
    }
    assert.equal(firstQuadrantCount(at(3, 1, 90)), 1)
    assert.equal(firstQuadrantCount(at(4, 1, 0)), 0)
    assert.equal(firstQuadrantCount(at(6, 1, 60)), 2)
})
