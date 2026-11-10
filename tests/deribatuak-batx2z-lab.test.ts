import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { IMPLICIT_CURVES, IMPLICIT_SETUP, implicitChallenges, implicitExtra, implicitPrediction, implicitSlope, initialImplicitState, setImplicit, slopeLatex, slopeValue, type ImplicitState } from '../src/pages/batx2-zientziak-deribatuak/lab/implicitTangent.ts'
import { bach2DerivativesLabChallengeIds, bach2DerivativesLabToolForTopic, bach2DerivativesLabTools } from '../src/pages/batx2-zientziak-deribatuak/lab/labTools.ts'
import { initialMirrorState, MIRROR_FUNCTIONS, MIRROR_SETUP, mirrorChallenges, mirrorExtra, mirrorPrediction, mirrorSlopes, setMirror, type MirrorState } from '../src/pages/batx2-zientziak-deribatuak/lab/mirror.ts'
import { initialNoCornerState, jointKind, NO_CORNER_LIMITS, NO_CORNER_SETUP, NO_CORNER_SETUPS, noCornerChallenges, noCornerExtra, noCornerLatex, noCornerPrediction, setNoCorner } from '../src/pages/batx2-zientziak-deribatuak/lab/noCorner.ts'
import { chordSlopes, initialZoomState, setZoom, ZOOM_FUNCTIONS, ZOOM_LIMITS, ZOOM_SETUP, zoomChallenges, zoomExtra, ZOOMS, type ZoomState } from '../src/pages/batx2-zientziak-deribatuak/lab/zoom.ts'

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

test('deribatuak batx2 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(bach2DerivativesLabTools.length, 7)
    const stages = ['review', 'derivability', 'chain', 'special', 'tangents']
    for (const stage of stages) assert.ok(bach2DerivativesLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of bach2DerivativesLabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    }
    for (const tool of bach2DerivativesLabTools.filter((item) => ['zoom', 'no-corner', 'mirror', 'implicit'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
        assert.ok(/[؀-ۿ]/.test(tool.observe.ar) && /[؀-ۿ]/.test(tool.title.ar), tool.id)
    }
    assert.equal(new Set(bach2DerivativesLabChallengeIds).size, bach2DerivativesLabChallengeIds.length)
    const own = [...zoomChallenges, ...noCornerChallenges, ...implicitChallenges, ...mirrorChallenges].map((challenge) => challenge.id)
    assert.equal(own.length, 20)
    for (const id of own) assert.ok(id >= 123101 && id <= 123399, `${id}`)
    const topics = ['review-tangent', 'review-rules', 'corners', 'absolute', 'parameters', 'three-layers', 'composite-table', 'higher-order', 'inverse', 'implicit', 'logarithmic', 'coefficients', 'exterior-point', 'tangent-curves']
    for (const [topic, tool] of Object.entries(bach2DerivativesLabToolForTopic)) {
        assert.ok(topics.includes(topic), topic)
        assert.ok(bach2DerivativesLabTools.some((item) => item.id === tool), `${topic} → ${tool}`)
    }
    for (const tool of bach2DerivativesLabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
})

test('deribatuak batx2 z lab: the lens of differentiability', () => {
    const at = (fn: ZoomState['fn'], zoom: number): ZoomState => ({ fn, z: ZOOMS.indexOf(zoom), prediction: null })
    checkChallenges(zoomChallenges, initialZoomState, {
        123101: at('kink', 8),
        123102: at('square', 64),
        123103: at('sine', 16),
        123104: at('cusp', 8),
        123105: at('flat', 64)
    })
    checkExtras(zoomExtra, initialZoomState, (state) => setZoom(state, state))
    for (const fn of ZOOM_FUNCTIONS) {
        const setup = ZOOM_SETUP[fn]
        katex.renderToString(`f(x)=${setup.latex}`, { throwOnError: true, strict: 'error' })
        // Close up, the chords tend to the one-sided derivatives (or grow without bound for the cusp)
        const [left, right] = chordSlopes({ fn, z: ZOOM_LIMITS.z.max })
        if (setup.look === '>') assert.ok(Math.abs(left) > 5 && Math.abs(right) > 5, fn)
        else {
            assert.ok(Math.abs(left - setup.left) < 0.05 && Math.abs(right - setup.right) < 0.05, `${fn}: ${left}, ${right}`)
            assert.equal(setup.look, Math.abs(setup.left - setup.right) < 1e-9 ? '=' : '<', fn)
        }
    }
})

test('deribatuak batx2 z lab: adjust a and b with no corner', () => {
    checkChallenges(noCornerChallenges, initialNoCornerState, {
        123201: { setup: 'g1', a: 2, b: 4, prediction: null },
        123202: { setup: 'g2', a: 1, b: 4, prediction: null },
        123203: { setup: 'g3', a: -2, b: 6, prediction: null },
        123204: { setup: 'g4', a: 0, b: 2, prediction: null },
        123205: { setup: 'g1', a: 2, b: 0, prediction: null }
    })
    checkExtras(noCornerExtra, initialNoCornerState, (state) => setNoCorner(state, state))
    const signs = new Set<string>()
    for (const setup of NO_CORNER_SETUPS) {
        katex.renderToString(noCornerLatex(setup), { throwOnError: true, strict: 'error' })
        // Exactly one pair (a, b) is differentiable, and it is the solution
        const pairs: Array<[number, number]> = []
        for (let a = NO_CORNER_LIMITS.a.min; a <= NO_CORNER_LIMITS.a.max; a++) for (let b = NO_CORNER_LIMITS.b.min; b <= NO_CORNER_LIMITS.b.max; b++) if (jointKind({ setup, a, b }) === 'smooth') pairs.push([a, b])
        assert.deepEqual(pairs, [NO_CORNER_SETUP[setup].solution], setup)
        signs.add(noCornerPrediction({ setup }))
    }
    // The prediction is not always the same answer
    assert.equal(signs.size, 3)
})

test('deribatuak batx2 z lab: the tangent to an implicit curve', () => {
    const at = (curve: ImplicitState['curve'], x: number, y: number): ImplicitState => ({ curve, k: IMPLICIT_SETUP[curve].points.findIndex(([px, py]) => px === x && py === y), prediction: null })
    checkChallenges(implicitChallenges, initialImplicitState, {
        123301: at('circle', -3, 4),
        123302: at('circle', 5, 0),
        123303: at('ellipse', 1, 2),
        123304: at('hyperbola', 1, 4),
        123305: at('parabola', 1, -2)
    })
    checkExtras(implicitExtra, initialImplicitState, (state) => setImplicit(state, state))
    const signs = new Set<string>()
    for (const curve of IMPLICIT_CURVES) {
        const setup = IMPLICIT_SETUP[curve]
        for (const latex of [setup.latex, setup.derived, setup.formula]) katex.renderToString(latex, { throwOnError: true, strict: 'error' })
        for (let k = 0; k < setup.points.length; k++) {
            const [x, y] = setup.points[k]
            // Every point is on its curve
            const on = curve === 'circle' ? x * x + y * y - 25 : curve === 'ellipse' ? x * x + 2 * y * y - 9 : curve === 'hyperbola' ? x * y - 4 : y * y - 4 * x
            assert.ok(Math.abs(on) < 1e-9, `${curve} (${x}, ${y})`)
            // The slope from implicit differentiation matches a numerical one on the branch through the point
            const slope = implicitSlope({ curve, k })
            katex.renderToString(slopeLatex(slope), { throwOnError: true, strict: 'error' })
            if (slope.q === 0) continue
            const h = 1e-5
            const branch = (t: number) => curve === 'circle' ? Math.sign(y) * Math.sqrt(25 - t * t) : curve === 'ellipse' ? Math.sign(y) * Math.sqrt((9 - t * t) / 2) : curve === 'hyperbola' ? 4 / t : Math.sign(y) * 2 * Math.sqrt(t)
            const numeric = (branch(x + h) - branch(x - h)) / (2 * h)
            assert.ok(Math.abs(numeric - slopeValue(slope)) < 1e-4, `${curve} (${x}, ${y}): ${numeric} vs ${slopeValue(slope)}`)
        }
        signs.add(implicitPrediction({ curve }))
    }
    assert.equal(signs.size, 3)
})

test('deribatuak batx2 z lab: the mirror of the inverse', () => {
    const at = (fn: MirrorState['fn'], a: number): MirrorState => ({ fn, k: MIRROR_SETUP[fn].points.indexOf(a), prediction: null })
    checkChallenges(mirrorChallenges, initialMirrorState, {
        123351: at('exp', 0),
        123352: at('cube', 0),
        123353: at('cubic', -1),
        123354: at('square', 1),
        123355: at('cube', 0.5)
    })
    checkExtras(mirrorExtra, initialMirrorState, (state) => setMirror(state, state))
    const signs = new Set<string>()
    for (const fn of MIRROR_FUNCTIONS) {
        const setup = MIRROR_SETUP[fn]
        for (const latex of [setup.latex, setup.inverseLatex]) katex.renderToString(latex, { throwOnError: true, strict: 'error' })
        for (let k = 0; k < setup.points.length; k++) {
            const a = setup.points[k]
            // The inverse undoes f, and its slope at f(a) is 1 / f′(a)
            assert.ok(Math.abs(setup.inverse(setup.f(a)) - a) < 1e-9, `${fn} ${a}`)
            const { m, inverse } = mirrorSlopes({ fn, k })
            if (!Number.isFinite(inverse)) { assert.ok(Math.abs(m) < 1e-12); continue }
            const h = 1e-6
            const b = setup.f(a)
            const numeric = (setup.inverse(b + h) - setup.inverse(b - h)) / (2 * h)
            assert.ok(Math.abs(numeric - inverse) < 1e-4, `${fn} ${a}: ${numeric} vs ${inverse}`)
        }
        signs.add(mirrorPrediction({ fn }))
    }
    assert.equal(signs.size, 3)
})
