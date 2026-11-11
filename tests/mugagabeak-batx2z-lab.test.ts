import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { CONSTANTS_BASES, CONSTANTS_CASES, constantsChallenges, constantsExtra, constantsPrediction, curveAt, curveLatex, initialConstantsState, rightSlope, setConstants, slopeAt, target, throughPoint, type ConstantsState } from '../src/pages/batx2-zientziak-mugagabeak/lab/constants.ts'
import { FRACTION_CASES, fractionChallenges, fractionExtra, fractionMatches, initialFractionState, integralLatex, numerator, pieces, piecesLatex, rational, rationalLatex, setFraction, type FractionState } from '../src/pages/batx2-zientziak-mugagabeak/lab/fractions.ts'
import { bach2IndefiniteLabChallengeIds, bach2IndefiniteLabToolForTopic, bach2IndefiniteLabTools } from '../src/pages/batx2-zientziak-mugagabeak/lab/labTools.ts'
import { goodChoice, initialPartsState, maxSteps, PARTS_INTEGRANDS, PARTS_SETUP, partsChallenges, partsExtra, setParts, type PartsState } from '../src/pages/batx2-zientziak-mugagabeak/lab/parts.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        assert.ok(/[؀-ۿ]/.test(text.ar.replace(/\$[^$]+\$/g, '')), `not Arabic: ${text.ar}`)
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

const derivative = (F: (x: number) => number, x: number) => (F(x + 1e-5) - F(x - 1e-5)) / 2e-5
const near = (a: number, b: number) => Math.abs(a - b) < 1e-4 * Math.max(1, Math.abs(b))

test('mugagabeak batx2 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(bach2IndefiniteLabTools.length, 5)
    for (const tool of bach2IndefiniteLabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    }
    // The «Observe» text of the tools of this unit is plain text, not LaTeX
    for (const tool of bach2IndefiniteLabTools.filter((item) => ['parts', 'fractions', 'constants'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
        assert.ok(/[؀-ۿ]/.test(tool.observe.ar) && /[؀-ۿ]/.test(tool.title.ar), tool.id)
    }
    const topics = ['table', 'composed', 'composed-arcs', 'by-parts', 'parts-twice', 'log-arcs', 'division', 'simple-roots', 'double-roots', 'no-roots', 'change', 'roots-exp', 'trig-powers', 'choose', 'conditions']
    assert.deepEqual(Object.keys(bach2IndefiniteLabToolForTopic).sort(), [...topics].sort())
    for (const tool of Object.values(bach2IndefiniteLabToolForTopic)) assert.ok(bach2IndefiniteLabTools.some((item) => item.id === tool), tool)
    // Every stage has a tool
    assert.deepEqual(new Set(bach2IndefiniteLabTools.map((tool) => tool.stage)), new Set(['review', 'parts', 'rational', 'substitution', 'strategy']))
    // The own ids live in this unit's block; the borrowed ones keep those of Deribatuak (1.º)
    const ids = bach2IndefiniteLabChallengeIds
    assert.equal(new Set(ids).size, ids.length)
    for (const id of [...partsChallenges, ...fractionChallenges, ...constantsChallenges].map((challenge) => challenge.id)) assert.ok(id >= 126101 && id <= 126399, `${id}`)
})

test('mugagabeak batx2 z lab · choose u and dv: every result differentiates back to the integrand', () => {
    for (const id of PARTS_INTEGRANDS) {
        const setup = PARTS_SETUP[id]
        for (const x of [0.4, 1.3, 2.2]) assert.ok(near(derivative(setup.F, x), setup.fn(x)), `${id} at ${x}`)
        for (const branch of setup.branches) {
            assert.equal(branch.lines.length, branch.chain.length - 1, id)
            for (const latex of [branch.du, branch.v, ...branch.lines, ...(branch.final ? [branch.final] : [])]) {
                for (const language of languages) katex.renderToString(formulaFor(language, latex), { throwOnError: true, strict: 'error' })
            }
        }
        // The good u gets to the result; only eˣ · sin x has no good u (I comes back either way)
        const good = goodChoice(id)
        if (good === null) {
            assert.equal(id, 'exp-sin')
            assert.ok(setup.branches.every((branch) => branch.outcome === '=' && branch.chain.at(-1) === branch.chain[0] && branch.final))
        } else {
            assert.ok(setup.branches[good].final, id)
            assert.notEqual(setup.branches[1 - good].outcome, '<', id)
        }
    }
})

test('mugagabeak batx2 z lab · choose u and dv: the controls and the challenges', () => {
    // A new integrand or a new u asks for a new guess; the steps stay inside the chain
    const chosen = setParts({ ...initialPartsState, prediction: '<' }, { choice: 0 })
    assert.equal(chosen.prediction, null)
    const guessed: PartsState = { ...chosen, prediction: '<' }
    assert.equal(setParts(guessed, { steps: 9 }).steps, maxSteps('x-exp', 0))
    assert.equal(setParts(guessed, { steps: 9 }).prediction, '<')
    assert.equal(setParts(guessed, { integrand: 'x-sin' }).choice, null)
    checkChallenges(partsChallenges, initialPartsState, {
        126101: { integrand: 'x-exp', choice: 0, steps: 1, prediction: '<' },
        126102: { integrand: 'exp-x2', choice: 1, steps: 2, prediction: '<' },
        126103: { integrand: 'x-ln', choice: 1, steps: 1, prediction: '<' },
        126104: { integrand: 'exp-sin', choice: 0, steps: 2, prediction: '=' },
        126105: { integrand: 'cos-x', choice: 0, steps: 1, prediction: '>' }
    })
    // Without a guess the result is hidden, so nothing counts
    assert.ok(!partsChallenges[0].isSolved({ integrand: 'x-exp', choice: 0, steps: 1, prediction: null }))
    checkExtras(partsExtra, initialPartsState, (state) => setParts(state, {}), 6)
})

test('mugagabeak batx2 z lab · partial fractions: the pieces rebuild R and the integral is right', () => {
    const cases = [...FRACTION_CASES]
    for (let seed = 1; seed <= 60; seed += 1) cases.push(fractionExtra(createRandom(seed * 7919 + 3)).solution.spec)
    for (const spec of cases) {
        for (const x of [-3.3, -0.7, 0.45, 2.6]) {
            if ([spec.a, spec.b].some((root) => Math.abs(x - root) < 0.2)) continue
            assert.ok(near(pieces(spec, spec.A, spec.B, x), rational(spec, x)), `${rationalLatex(spec)} at ${x}`)
            // A wrong A does not rebuild R
            assert.ok(!near(pieces(spec, spec.A + 0.5, spec.B, x), rational(spec, x)))
        }
        // The numerator never cancels with the denominator
        const [p, q] = numerator(spec)
        for (const root of [spec.a, spec.b]) assert.ok(Math.abs(p * root + q) > 1e-9, rationalLatex(spec))
        // The integral differentiates back to R
        const F = (x: number) => spec.kind === 'simple'
            ? spec.A * Math.log(Math.abs(x - spec.a)) + spec.B * Math.log(Math.abs(x - spec.b))
            : spec.A * Math.log(Math.abs(x - spec.a)) - spec.B / (x - spec.a)
        for (const x of [-3.3, 0.45, 3.6]) if (![spec.a, spec.b].some((root) => Math.abs(x - root) < 0.2)) assert.ok(near(derivative(F, x), rational(spec, x)), `F at ${x}`)
        for (const latex of [rationalLatex(spec), integralLatex(spec), piecesLatex(spec, spec.A, spec.B), piecesLatex(spec, -1.5, 0.5)]) {
            for (const language of languages) katex.renderToString(formulaFor(language, latex), { throwOnError: true, strict: 'error' })
        }
    }
    assert.equal(rationalLatex(FRACTION_CASES[0]), 'R(x)=\\frac{x+5}{(x-1)(x+2)}')
    assert.equal(rationalLatex(FRACTION_CASES[4]), 'R(x)=\\frac{3}{(x-1)^2}')
    assert.equal(integralLatex(FRACTION_CASES[0]), '\\int R(x)\\,dx=2\\ln|x-1|-\\ln|x+2|+k')
    assert.equal(integralLatex(FRACTION_CASES[4]), '\\int R(x)\\,dx=-\\frac{3}{x-1}+k')
})

test('mugagabeak batx2 z lab · partial fractions: the controls and the challenges', () => {
    const moved = setFraction({ ...initialFractionState, prediction: '>' }, { halfA: 20 })
    assert.equal(moved.halfA, 8)
    assert.equal(moved.prediction, '>')
    assert.equal(setFraction(moved, { spec: FRACTION_CASES[2] }).prediction, null)
    const solved = (index: number): FractionState => ({ spec: FRACTION_CASES[index], halfA: 2 * FRACTION_CASES[index].A, halfB: 2 * FRACTION_CASES[index].B, prediction: '>' })
    assert.ok(FRACTION_CASES.every((_, index) => fractionMatches(solved(index))))
    checkChallenges(fractionChallenges, initialFractionState, { 126201: solved(0), 126202: solved(1), 126203: solved(3), 126204: solved(4), 126205: solved(2) })
    checkExtras(fractionExtra, initialFractionState, (state) => setFraction(state, {}), 20)
})

test('mugagabeak batx2 z lab · two constants: k₁ and k₂ are fixed by the slope and the point', () => {
    for (const base of CONSTANTS_BASES) {
        // F₀″ is the f″ written: check numerically at two points
        for (const x of [-1.2, 0.7]) {
            const second = (base.dF0(x + 1e-4) - base.dF0(x - 1e-4)) / 2e-4
            const written = Function('x', `return ${base.second.replace(/(\d)x/g, '$1*x')}`)(x) as number
            assert.ok(near(second, written), `${base.second} at ${x}`)
            assert.ok(near(derivative(base.F0, x), base.dF0(x)), base.latex)
        }
    }
    for (const spec of CONSTANTS_CASES) {
        const { x0, y0, m } = target(spec)
        const state: ConstantsState = { spec, k1: spec.k1, k2: spec.k2, prediction: '<' }
        assert.ok(throughPoint(state) && rightSlope(state))
        assert.equal(curveAt(spec.base, spec.k1, spec.k2, x0), y0)
        assert.equal(slopeAt(spec.base, spec.k1, x0), m)
        // Only one (k₁, k₂) works, and P is inside the board
        for (let k1 = -6; k1 <= 6; k1 += 1) for (let k2 = -6; k2 <= 6; k2 += 1) if (k1 !== spec.k1 || k2 !== spec.k2) assert.ok(!(throughPoint({ ...state, k1, k2 }) && rightSlope({ ...state, k1, k2 })))
        assert.ok(y0 >= -6 && y0 <= 8)
        katex.renderToString(curveLatex(spec.base, spec.k1, spec.k2), { throwOnError: true, strict: 'error' })
    }
    assert.equal(curveLatex(0, 2, 3), 'f(x)=x^3-x^2+2x+3')
    assert.equal(curveLatex(4, 0, 3), 'f(x)=x^3-3x^2+3')
    assert.equal(curveLatex(1, -1, 0), 'f(x)=x^2-x')
    assert.equal(constantsPrediction({ ...initialConstantsState, spec: CONSTANTS_CASES[4] }), '=')
})

test('mugagabeak batx2 z lab · two constants: the controls and the challenges', () => {
    const moved = setConstants({ ...initialConstantsState, prediction: '>' }, { k1: 9 })
    assert.equal(moved.k1, 6)
    assert.equal(moved.prediction, '>')
    assert.equal(setConstants(moved, { spec: CONSTANTS_CASES[1] }).prediction, null)
    const solutions: Record<number, ConstantsState> = {}
    CONSTANTS_CASES.forEach((spec, index) => { solutions[126301 + index] = { spec, k1: spec.k1, k2: spec.k2, prediction: '>' } })
    checkChallenges(constantsChallenges, initialConstantsState, solutions)
    checkExtras(constantsExtra, initialConstantsState, (state) => setConstants(state, {}), 20)
})
