import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { bachFunctionsLabChallengeIds, bachFunctionsLabToolForTopic, bachFunctionsLabTools } from '../src/pages/batx1-zientziak-funtzioak/lab/labTools.ts'
import { commute, compositionChallenges, compositionExtra, compositionPrediction, fAfterG, gAfterF, initialCompositionState, setComposition, type CompositionState } from '../src/pages/batx1-zientziak-funtzioak/lab/composition.ts'
import { cutsOfProbe, initialMirrorState, keptIsInjective, mirrorChallenges, mirrorExtra, mirrorLatex, mirrorPrediction, mirrorValue, preimages, setMirror, type MirrorState } from '../src/pages/batx1-zientziak-funtzioak/lab/mirror.ts'
import { decimalTenths, floorOf, initialStairsState, setStairs, stairsChallenges, stairsExtra, stairsPrediction, tenthsLatex, type StairsState } from '../src/pages/batx1-zientziak-funtzioak/lab/stairs.ts'
import { BASE_POINT, initialTransformState, movedPoint, sameCurve, setTransform, TRANSFORM_BASES, transformChallenges, transformExtra, transformLatex, transformPrediction, transformValue, type TransformState } from '../src/pages/batx1-zientziak-funtzioak/lab/transform.ts'

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

test('funtzioak batx1 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(bachFunctionsLabTools.length, 11)
    const stages = ['study', 'transforms', 'inverse', 'piecewise', 'operations']
    for (const stage of stages) assert.ok(bachFunctionsLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of bachFunctionsLabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    }
    // The «Observe» text of the tools of this unit is plain text, not LaTeX
    for (const tool of bachFunctionsLabTools.filter((item) => ['transform', 'composition', 'mirror', 'stairs'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
        assert.ok(/[؀-ۿ]/.test(tool.observe.ar) && /[؀-ۿ]/.test(tool.title.ar), tool.id)
    }
    assert.equal(new Set(bachFunctionsLabChallengeIds).size, bachFunctionsLabChallengeIds.length)
    // The four tools of this unit use the 108xxx block; the borrowed ones keep their ids
    const own = [...transformChallenges, ...compositionChallenges, ...mirrorChallenges, ...stairsChallenges].map((challenge) => challenge.id)
    for (const id of own) assert.ok(id >= 108101 && id <= 108399, `${id}`)
    const topics = ['domain', 'symmetry', 'periodic', 'shifts', 'reflections', 'stretch', 'inverse-function', 'inverse-graph', 'exp-log', 'arc', 'piecewise', 'absolute', 'floor', 'operations', 'composition']
    for (const [topic, tool] of Object.entries(bachFunctionsLabToolForTopic)) {
        assert.ok(topics.includes(topic), topic)
        assert.ok(bachFunctionsLabTools.some((item) => item.id === tool), `${topic} → ${tool}`)
    }
    for (const tool of bachFunctionsLabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
})

test('funtzioak batx1 z lab: el taller de transformaciones', () => {
    const at = (patch: Partial<TransformState>) => setTransform(initialTransformState, patch)
    // √(x + 3) − 2 starts at (−3, −2), and P(4, 2) goes to (1, 0)
    const shifted = at({ c: 3, k: -2 })
    assert.equal(transformValue(shifted, -3), -2)
    assert.equal(transformValue(shifted, -4), null)
    assert.deepEqual(movedPoint(shifted), [1, 0])
    assert.equal(transformPrediction(shifted), '<')
    // f(2x) squeezes towards the y-axis: P(4, 2) → (2, 2); f(−x) reflects it
    assert.deepEqual(movedPoint(at({ B: 2 })), [2, 2])
    assert.deepEqual(movedPoint(at({ B: -1 })), [-4, 2])
    // −2f(x) + 1 keeps x
    assert.deepEqual(movedPoint(at({ A: -2, k: 1 })), [4, -3])
    assert.equal(transformPrediction(at({ A: -2, k: 1 })), '=')
    // x − 2 goes right
    assert.equal(transformPrediction(at({ c: -2 })), '>')
    // The same curve from two settings: |−x + 1| is |x − 1|
    assert.ok(sameCurve({ base: 'abs', A: 1, B: -1, c: 1, k: 0 }, { base: 'abs', A: 1, B: 1, c: -1, k: 0 }))
    assert.ok(!sameCurve({ base: 'sqrt', A: 1, B: -1, c: 0, k: 0 }, { base: 'sqrt', A: -1, B: 1, c: 0, k: 0 }))
    // Every marked point is on its mother curve
    for (const base of TRANSFORM_BASES) {
        const [p, q] = BASE_POINT[base]
        assert.equal(transformValue({ base, A: 1, B: 1, c: 0, k: 0 }, p), q, base)
    }
    // The formulas render
    for (const base of TRANSFORM_BASES) for (const A of [-2, 1]) for (const B of [-1, 2]) katex.renderToString(transformLatex({ base, A, B, c: -3, k: 2 }), { throwOnError: true, strict: 'error' })
    assert.equal(transformLatex({ base: 'square', A: -2, B: 1, c: 1, k: 3 }), 'y=-2(x+1)^2+3')
    assert.equal(transformLatex({ base: 'inverse', A: -2, B: 1, c: -1, k: 0 }), 'y=-\\frac{2}{x-1}')
    // A prediction stays until something changes
    const guessed = { ...shifted, prediction: '<' as const }
    assert.equal(setTransform(guessed, { c: 3 }).prediction, '<')
    assert.equal(setTransform(guessed, { k: 0 }).prediction, null)
    checkChallenges(transformChallenges, initialTransformState, {
        108101: at({ base: 'square', c: -3, k: -2 }),
        108102: at({ A: -1 }),
        108103: at({ B: -1, k: 2 }),
        108104: at({ base: 'abs', A: 2, c: -1, k: -3 }),
        108105: at({ base: 'exp', c: 2, k: 3 })
    })
    checkExtras(transformExtra, initialTransformState, (state) => setTransform(state, state))
})

test('funtzioak batx1 z lab: dos máquinas en cadena', () => {
    const at = (patch: Partial<CompositionState>) => setComposition(initialCompositionState, patch)
    // x² after x + 3 at 2 is 25; x + 3 after x² is 7
    assert.equal(fAfterG(initialCompositionState, 2), 25)
    assert.equal(gAfterF(initialCompositionState, 2), 7)
    assert.equal(compositionPrediction(initialCompositionState), '>')
    assert.equal(compositionPrediction(at({ f: 'square', g: 'neg', input: 0 })), '=')
    assert.equal(compositionPrediction(at({ f: 'neg', g: 'square', input: 3 })), '<')
    assert.ok(commute({ f: 'add3', g: 'sub2' }))
    assert.ok(commute({ f: 'mul2', g: 'neg' }))
    assert.ok(!commute({ f: 'square', g: 'neg' }))
    checkChallenges(compositionChallenges, initialCompositionState, {
        108201: at({ input: 1 }),
        108202: at({ f: 'mul2', g: 'add3', input: 2 }),
        108203: at({ g: 'neg', input: 0 }),
        108204: at({ f: 'add3', g: 'sub2' }),
        108205: at({ g: 'sub2' })
    })
    checkExtras(compositionExtra, initialCompositionState, (state) => setComposition(state, state))
})

test('funtzioak batx1 z lab: el espejo y = x', () => {
    const at = (patch: Partial<MirrorState>) => setMirror(initialMirrorState, patch)
    // y = x² cut by y = 2 twice; only once if we keep x ≥ 0
    assert.equal(cutsOfProbe(initialMirrorState).length, 2)
    assert.equal(mirrorPrediction(initialMirrorState), '>')
    assert.equal(cutsOfProbe(at({ side: 'right' })).length, 1)
    assert.equal(mirrorPrediction(at({ probe: -1 })), '<')
    // Every preimage really gives the value
    for (const family of ['parabola', 'abs', 'exp', 'line'] as const) {
        for (const h of [-2, 0, 1, 3, 5]) {
            for (const x of preimages({ family, v: 1, w: -1 }, h)) assert.ok(Math.abs(mirrorValue({ family, v: 1, w: -1 }, x) - h) < 1e-9, `${family} ${h}`)
        }
    }
    assert.ok(!keptIsInjective(initialMirrorState))
    assert.ok(keptIsInjective(at({ side: 'left', cut: -1 })))
    assert.ok(!keptIsInjective(at({ side: 'left', cut: 2 })))
    assert.ok(keptIsInjective(at({ family: 'exp' })))
    assert.equal(mirrorLatex({ family: 'parabola', v: 2, w: -1 }), 'y=(x-2)^2-1')
    assert.equal(mirrorLatex({ family: 'abs', v: -1, w: 0 }), 'y=|x+1|')
    checkChallenges(mirrorChallenges, initialMirrorState, {
        108301: at({ side: 'right' }),
        108302: at({ v: 2, w: -1, side: 'right', cut: 2 }),
        108303: at({ w: -3, probe: 1 }),
        108304: at({ family: 'line' }),
        108305: at({ family: 'abs', v: -1, side: 'left', cut: -1, probe: 4 })
    })
    checkExtras(mirrorExtra, initialMirrorState, (state) => setMirror(state, state))
})

test('funtzioak batx1 z lab: la escalera de la parte entera', () => {
    const at = (patch: Partial<StairsState>) => setStairs(initialStairsState, patch)
    assert.equal(floorOf(-24), -3)
    assert.equal(decimalTenths(-24), 6)
    assert.equal(floorOf(37), 3)
    assert.equal(floorOf(-30), -3)
    assert.equal(decimalTenths(-30), 0)
    assert.equal(tenthsLatex(-24), '-2{,}4')
    assert.equal(tenthsLatex(7), '0{,}7')
    assert.equal(tenthsLatex(-5), '-0{,}5')
    // E(x) is never the integer to the right
    for (let probe = -40; probe <= 40; probe += 1) assert.notEqual(stairsPrediction(at({ probe })), '>')
    assert.equal(stairsPrediction(at({ probe: 20 })), '=')
    assert.equal(stairsPrediction(at({ kind: 'decimal', probe: -23 })), '>')
    assert.equal(stairsPrediction(at({ kind: 'decimal', probe: -25 })), '=')
    checkChallenges(stairsChallenges, initialStairsState, {
        108351: at({ probe: -25 }),
        108352: at({ probe: -13 }),
        108353: at({ probe: 20 }),
        108354: at({ kind: 'decimal', probe: -18 }),
        108355: at({ probe: -3 })
    })
    checkExtras(stairsExtra, initialStairsState, (state) => setStairs(state, state))
})
