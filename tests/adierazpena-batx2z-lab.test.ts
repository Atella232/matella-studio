import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { ASYMPTOTE_CURVES, ASYMPTOTE_SETUP, asymptoteChallenges, asymptoteExtra, asymptotePrediction, asymptoteReading, exactDifference, fractionLatex, initialAsymptoteState, setAsymptote, type AsymptoteState } from '../src/pages/batx2-zientziak-adierazpena/lab/asymptote.ts'
import { DERIVATIVE_SETUP, derivativeChallenges, derivativeExtra, derivativePrediction, DERIVATIVES, initialDerivativeState, setDerivative } from '../src/pages/batx2-zientziak-adierazpena/lab/fromDerivative.ts'
import { bach2SketchLabChallengeIds, bach2SketchLabToolForTopic, bach2SketchLabTools } from '../src/pages/batx2-zientziak-adierazpena/lab/labTools.ts'
import { initialMirrorState, MIRROR_FUNCTIONS, MIRROR_SETUP, MIRROR_XS, mirrorChallenges, mirrorCorners, mirrorExtra, mirrorPrediction, mirrorValue, setMirror } from '../src/pages/batx2-zientziak-adierazpena/lab/mirror.ts'
import { copyMatches, initialSymmetryState, setSymmetry, SYMMETRY_FUNCTIONS, SYMMETRY_SETUP, symmetryChallenges, symmetryExtra, symmetryPrediction } from '../src/pages/batx2-zientziak-adierazpena/lab/symmetry.ts'

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

test('adierazpena batx2 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(bach2SketchLabTools.length, 6)
    for (const tool of bach2SketchLabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    }
    for (const tool of bach2SketchLabTools.filter((item) => ['asymptote', 'symmetry', 'mirror', 'derivative'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
        assert.ok(/[؀-ۿ]/.test(tool.observe.ar) && /[؀-ۿ]/.test(tool.title.ar), tool.id)
    }
    assert.equal(new Set(bach2SketchLabChallengeIds).size, bach2SketchLabChallengeIds.length)
    const own = [...asymptoteChallenges, ...mirrorChallenges, ...derivativeChallenges, ...symmetryChallenges].map((challenge) => challenge.id)
    assert.equal(own.length, 20)
    for (const id of own) assert.ok(id >= 125101 && id <= 125399, `${id}`)
    const topics = ['sketch-plan', 'asymptotes-review', 'rational-review', 'symmetry-period', 'asymptote-position', 'domain-edges', 'exp-products', 'exp-special', 'log-functions', 'root-functions', 'trig-functions', 'piecewise-graphs', 'absolute-graphs', 'derivative-graph', 'curve-from-data']
    const stages = ['review', 'study', 'explog', 'roots', 'reading']
    for (const [topic, tool] of Object.entries(bach2SketchLabToolForTopic)) {
        assert.ok(topics.includes(topic), topic)
        assert.ok(bach2SketchLabTools.some((item) => item.id === tool), `${topic} → ${tool}`)
    }
    for (const tool of bach2SketchLabTools) {
        assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
        assert.ok(stages.includes(tool.stage), `${tool.id}: ${tool.stage}`)
    }
})

test('adierazpena batx2 z lab: the curve and its asymptote', () => {
    const at = (curve: AsymptoteState['curve'], x: number): AsymptoteState => ({ curve, x: ASYMPTOTE_SETUP[curve].xs.indexOf(x), prediction: null })
    checkChallenges(asymptoteChallenges, initialAsymptoteState, {
        125101: at('g1', 10),
        125102: at('g2', -5),
        125103: at('g3', 2),
        125104: at('g4', 0),
        125105: at('g5', -10)
    })
    checkExtras(asymptoteExtra, initialAsymptoteState, (state) => setAsymptote(state, state))
    const kinds = new Set<string>()
    for (const curve of ASYMPTOTE_CURVES) {
        const setup = ASYMPTOTE_SETUP[curve]
        katex.renderToString(`f(x)=${setup.latex}`, { throwOnError: true, strict: 'error' })
        kinds.add(asymptotePrediction({ curve }))
        assert.ok(setup.xs[setup.start] === 2, curve)
        for (let index = 0; index < setup.xs.length; index++) {
            const reading = asymptoteReading({ curve, x: index })
            assert.ok(Number.isFinite(reading.y), `${curve}: f(${reading.x})`)
            // The exact difference agrees with the drawn one
            const exact = exactDifference(curve, index)
            if (exact) assert.ok(Math.abs(exact[0] / exact[1] - reading.difference) < 1e-12, `${curve}: ${reading.x}`)
        }
        // Far away the difference is small: the line is an asymptote
        const far = setup.f(1e6) - (setup.right[0] * 1e6 + setup.right[1])
        const farLeft = setup.f(-1e6) - (setup.left[0] * -1e6 + setup.left[1])
        assert.ok(Math.abs(far) < 1e-4 && Math.abs(farLeft) < 1e-4, curve)
    }
    assert.equal(kinds.size, 3)
    assert.equal(fractionLatex([-1, 2]), '-\\frac{1}{2}')
    assert.equal(fractionLatex([3, 1]), '3')
})

test('adierazpena batx2 z lab: the mirror of the absolute value', () => {
    const state = (fn: (typeof MIRROR_FUNCTIONS)[number], mode: 'f' | 'abs' | 'even', x: number) => ({ fn, mode, x: MIRROR_XS.indexOf(x), prediction: null })
    checkChallenges(mirrorChallenges, initialMirrorState, {
        125201: state('f1', 'abs', 3),
        125202: state('f2', 'abs', 0),
        125203: state('f5', 'abs', 0),
        125204: state('f2', 'even', 0),
        125205: state('f4', 'even', 1)
    })
    checkExtras(mirrorExtra, initialMirrorState, (s) => setMirror(s, s))
    const kinds = new Set<string>()
    for (const fn of MIRROR_FUNCTIONS) {
        const setup = MIRROR_SETUP[fn]
        katex.renderToString(`f(x)=${setup.latex}`, { throwOnError: true, strict: 'error' })
        kinds.add(mirrorPrediction({ fn }))
        // |f| has a corner exactly where f changes sign; f(|x|) one at 0 exactly when f′(0) ≠ 0
        for (let x = -4.5; x <= 4.5; x += 0.01) {
            if (setup.f(x) * setup.f(x + 0.01) < 0) assert.ok(setup.signChanges.some((c) => c >= x - 1e-9 && c <= x + 0.01 + 1e-9), `${fn}: sign change near ${x}`)
        }
        for (const c of setup.signChanges) assert.ok(Math.abs(setup.f(c)) < 1e-9, `${fn}: f(${c})`)
        const slope = (setup.f(1e-6) - setup.f(-1e-6)) / 2e-6
        assert.equal(setup.evenCorners.length === 1, Math.abs(slope) > 1e-6, fn)
        // f(|x|) is even and |f(x)| is never negative
        for (const x of MIRROR_XS) {
            assert.ok(Math.abs(mirrorValue(fn, 'even', x) - mirrorValue(fn, 'even', -x)) < 1e-12, fn)
            assert.ok(mirrorValue(fn, 'abs', x) >= 0, fn)
        }
        // The minima of f(|x|) are lower than their neighbours
        for (const m of setup.evenMinima) assert.ok(mirrorValue(fn, 'even', m) <= mirrorValue(fn, 'even', m + 0.01) && mirrorValue(fn, 'even', m) <= mirrorValue(fn, 'even', m - 0.01), `${fn}: ${m}`)
    }
    assert.equal(kinds.size, 3)
    assert.deepEqual(mirrorCorners('f2', 'abs'), [-2, 0, 2])
})

test('adierazpena batx2 z lab: from f′ to f', () => {
    const at = (fn: (typeof DERIVATIVES)[number], x: number, C = 0) => ({ fn, x: DERIVATIVE_SETUP[fn].xs.indexOf(x), C, prediction: null })
    checkChallenges(derivativeChallenges, initialDerivativeState, {
        125301: at('d1', -1),
        125302: at('d2', 1),
        125303: at('d3', -2),
        125304: at('d5', 1.5),
        125305: { fn: 'd4', x: 0, C: 4, prediction: null }
    })
    checkExtras(derivativeExtra, initialDerivativeState, (state) => setDerivative(state, state))
    const kinds = new Set<string>()
    for (const fn of DERIVATIVES) {
        const setup = DERIVATIVE_SETUP[fn]
        katex.renderToString(`f'(x)=${setup.fpLatex}\\qquad f(x)=${setup.FLatex}`, { throwOnError: true, strict: 'error' })
        kinds.add(derivativePrediction({ fn }))
        assert.equal(setup.F(0), 0, fn)
        // F′ = f′ (numerically), and the extrema and inflections are where they should be
        for (let x = setup.xs[0]; x <= setup.xs[setup.xs.length - 1]; x += 0.25) {
            const slope = (setup.F(x + 1e-6) - setup.F(x - 1e-6)) / 2e-6
            assert.ok(Math.abs(slope - setup.fp(x)) < 1e-4, `${fn}: F′(${x})`)
        }
        for (const m of setup.maxima) assert.ok(Math.abs(setup.fp(m)) < 1e-9 && setup.fp(m - 0.01) > 0 && setup.fp(m + 0.01) < 0, `${fn}: max ${m}`)
        for (const m of setup.minima) assert.ok(Math.abs(setup.fp(m)) < 1e-9 && setup.fp(m - 0.01) < 0 && setup.fp(m + 0.01) > 0, `${fn}: min ${m}`)
        for (const p of setup.inflections) {
            const second = (x: number) => (setup.fp(x + 1e-5) - setup.fp(x - 1e-5)) / 2e-5
            assert.ok(Math.abs(second(p)) < 1e-4 && second(p - 0.05) * second(p + 0.05) < 0, `${fn}: inflection ${p}`)
        }
    }
    assert.equal(kinds.size, 3)
    // The minima of x⁴/4 − 2x² + 4 sit on the X axis
    assert.equal(DERIVATIVE_SETUP.d4.F(2) + 4, 0)
})

test('adierazpena batx2 z lab: symmetry and period', () => {
    checkChallenges(symmetryChallenges, initialSymmetryState, {
        125351: { fn: 's2', mode: 'mirror', k: 1, prediction: null },
        125352: { fn: 's1', mode: 'origin', k: 1, prediction: null },
        125353: { fn: 's4', mode: 'shift', k: 2, prediction: null },
        125354: { fn: 's5', mode: 'shift', k: 4, prediction: null },
        125355: { fn: 's6', mode: 'shift', k: 4, prediction: null }
    })
    checkExtras(symmetryExtra, initialSymmetryState, (state) => setSymmetry(state, state))
    const kinds = new Set<string>()
    for (const fn of SYMMETRY_FUNCTIONS) {
        const setup = SYMMETRY_SETUP[fn]
        kinds.add(symmetryPrediction({ fn }))
        for (const language of languages) katex.renderToString(formulaFor(language, `f(x)=${setup.latex}`), { throwOnError: true, strict: 'error' })
        // The parity says which reflection falls on the curve
        assert.equal(copyMatches({ fn, mode: 'mirror', k: 1 }), setup.parity === 'even', fn)
        assert.equal(copyMatches({ fn, mode: 'origin', k: 1 }), setup.parity === 'odd', fn)
        // Only the trigonometric ones have a period, 2π at most
        const periodic = [1, 2, 3, 4].filter((k) => copyMatches({ fn, mode: 'shift', k }))
        assert.equal(periodic.includes(4), ['s4', 's5', 's6'].includes(fn), fn)
    }
    assert.equal(kinds.size, 3)
    assert.deepEqual([1, 2, 3, 4].filter((k) => copyMatches({ fn: 's4', mode: 'shift', k })), [2, 4])
})
