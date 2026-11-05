import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { centreOutside, circumcircleChallenges, circumcircleExtra, circumcirclePrediction, circumcircleTriangle, circumcircleVertices, circumradius, initialCircumcircleState, setCircumcircle, type CircumcircleState } from '../src/pages/batx1-zientziak-triangeluak/lab/circumcircle.ts'
import { compassAngles, compassChallenges, compassCuts, compassExtra, compassHeight, compassPrediction, initialCompassState, setCompass, triangleCount, type CompassState } from '../src/pages/batx1-zientziak-triangeluak/lab/compass.ts'
import { hingeChallenges, hingeCorrection, hingeExtra, hingePrediction, hingeSide, initialHingeState, setHinge, type HingeState } from '../src/pages/batx1-zientziak-triangeluak/lab/hinge.ts'
import { trianglesLabChallengeIds, trianglesLabToolForTopic, trianglesLabTools } from '../src/pages/batx1-zientziak-triangeluak/lab/labTools.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const
const D = Math.PI / 180

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
            assert.ok(!/\\(?:sen|tg)(?![a-zA-Z])/.test(text[language]), text[language])
        }
        assert.ok(text.es.includes('\\sin') === false, text.es)
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

test('triangeluak batx1 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(trianglesLabTools.length, 8)
    for (const stage of ['angles', 'right', 'sines', 'cosines', 'applications']) assert.ok(trianglesLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of trianglesLabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    }
    // The «Observe» text of the tools of this unit is plain text, not LaTeX
    for (const tool of trianglesLabTools.filter((item) => ['compass', 'circumcircle', 'hinge'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
        assert.ok(/[؀-ۿ]/.test(tool.observe.ar) && tool.observe.eu !== tool.observe.es, tool.id)
    }
    assert.equal(new Set(trianglesLabChallengeIds).size, trianglesLabChallengeIds.length)
    // The three tools of this unit use the 102xxx block; the borrowed ones keep their 4. DBH ids
    const own = [...compassChallenges, ...circumcircleChallenges, ...hingeChallenges].map((challenge) => challenge.id)
    for (const id of own) assert.ok(id >= 102101 && id <= 102399, `${id}`)
    for (const id of trianglesLabChallengeIds.filter((item) => !own.includes(item))) assert.ok(id >= 71000 && id < 72000, `${id}`)
    const topics = ['quadrant-ratios', 'big-angles', 'related-angles', 'inverse-angles', 'right-review', 'height-strategy', 'sine-rule', 'ambiguous-case', 'circumradius', 'cosine-rule', 'three-sides', 'which-rule', 'heron', 'inaccessible', 'parallelogram-forces']
    assert.deepEqual(Object.keys(trianglesLabToolForTopic).sort(), [...topics].sort())
    for (const [topic, tool] of Object.entries(trianglesLabToolForTopic)) assert.ok(trianglesLabTools.some((item) => item.id === tool), `${topic} → ${tool}`)
    for (const tool of trianglesLabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
})

test('triangeluak batx1 z lab: el compás del caso dudoso', () => {
    const at = (patch: Partial<CompassState>) => setCompass(initialCompassState, patch)
    // The lesson's example: a = 6, b = 8, A = 40° gives two triangles, B ≈ 59.0° and 121.0°
    const two = at({ A: 40, b: 8, a: 6 })
    assert.equal(triangleCount(two), 2)
    const [obtuse, acute] = compassAngles(two)
    assert.ok(Math.abs(acute - 58.987) < 0.01 && Math.abs(obtuse - 121.013) < 0.01, `${acute} ${obtuse}`)
    // Each cut is at distance a from C
    const C: [number, number] = [8 * Math.cos(40 * D), 8 * Math.sin(40 * D)]
    for (const cut of compassCuts(two)) assert.ok(Math.abs(Math.hypot(cut - C[0], C[1]) - 6) < 1e-9)
    assert.equal(compassPrediction(two), '>')
    // Too short, just touching, longer than b, obtuse A
    assert.equal(triangleCount(at({ A: 50, b: 6, a: 4 })), 0)
    assert.equal(compassPrediction(at({ A: 50, b: 6, a: 4 })), '<')
    assert.ok(Math.abs(compassHeight(at({ A: 30, b: 8 })) - 4) < 1e-9)
    assert.equal(triangleCount(at({ A: 30, b: 8, a: 4 })), 1)
    assert.ok(Math.abs(compassAngles(at({ A: 30, b: 8, a: 4 }))[0] - 90) < 1e-9)
    assert.equal(triangleCount(at({ A: 40, b: 6, a: 7 })), 1)
    assert.equal(triangleCount(at({ A: 40, b: 6, a: 6 })), 1, 'a = b: one isosceles triangle')
    assert.equal(triangleCount(at({ A: 120, b: 6, a: 5 })), 0)
    assert.equal(triangleCount(at({ A: 120, b: 6, a: 8 })), 1)
    // The angles of every triangle add up to 180° with C, and the sine rule holds
    for (const state of [two, at({ A: 25, b: 7, a: 4 }), at({ A: 120, b: 5, a: 9 })]) {
        for (const B of compassAngles(state)) {
            assert.ok(Math.abs(state.a / Math.sin(state.A * D) - state.b / Math.sin(B * D)) < 1e-9, `${state.A} ${state.b} ${state.a}`)
            assert.ok(state.A + B < 180)
        }
    }
    // A new A, b or a forgets the prediction; the same values keep it
    const predicted = { ...initialCompassState, prediction: '=' as const }
    assert.equal(setCompass(predicted, { a: 3 }).prediction, null)
    assert.equal(setCompass(predicted, { a: initialCompassState.a }).prediction, '=')
    assert.equal(at({ A: 152 }).A, 150)
    assert.equal(at({ A: 47 }).A, 45)
    checkChallenges(compassChallenges, initialCompassState, {
        102101: at({ A: 40, b: 8, a: 6 }),
        102102: at({ A: 30, b: 8, a: 4 }),
        102103: at({ A: 50, b: 6, a: 4 }),
        102104: at({ A: 120, b: 6, a: 8 }),
        102105: at({ A: 45, b: 6, a: 5 })
    })
    checkExtras(compassExtra, initialCompassState, (state) => setCompass(state, state))
})

test('triangeluak batx1 z lab: la bisagra del coseno', () => {
    const at = (patch: Partial<HingeState>) => setHinge(initialHingeState, patch)
    assert.ok(Math.abs(hingeSide(at({ b: 5, c: 8, A: 60 })) - 7) < 1e-9)
    assert.ok(Math.abs(hingeSide(at({ b: 3, c: 5, A: 120 })) - 7) < 1e-9)
    assert.equal(hingeCorrection(at({ A: 90 })), 0)
    assert.equal(hingePrediction(at({ A: 90 })), '=')
    assert.equal(hingePrediction(at({ A: 40 })), '<')
    assert.equal(hingePrediction(at({ A: 140 })), '>')
    // The third side closes the triangle: the distance between the ends of b and c
    for (const state of [at({ b: 7, c: 3, A: 30 }), at({ b: 2, c: 8, A: 150 })]) {
        const end: [number, number] = [state.b * Math.cos(state.A * D), state.b * Math.sin(state.A * D)]
        assert.ok(Math.abs(Math.hypot(end[0] - state.c, end[1]) - hingeSide(state)) < 1e-9)
    }
    const predicted = { ...initialHingeState, prediction: '<' as const }
    assert.equal(setHinge(predicted, { A: 60 }).prediction, null)
    assert.equal(setHinge(predicted, { A: initialHingeState.A }).prediction, '<')
    assert.equal(at({ A: 175 }).A, 170)
    assert.equal(at({ b: 20 }).b, 8)
    checkChallenges(hingeChallenges, initialHingeState, {
        102201: at({ A: 90 }),
        102202: at({ b: 3, c: 5, A: 120 }),
        102203: at({ b: 5, c: 8, A: 60 }),
        102204: at({ b: 8, c: 8, A: 150 }),
        102205: at({ b: 5, c: 5, A: 40 })
    })
    checkExtras(hingeExtra, initialHingeState, (state) => setHinge(state, state))
})

test('triangeluak batx1 z lab: la circunferencia de 2R', () => {
    const at = (patch: Partial<CircumcircleState>) => setCircumcircle(initialCircumcircleState, patch)
    assert.ok(Math.abs(circumradius(at({ a: 10, A: 30 })) - 10) < 1e-9)
    assert.ok(Math.abs(circumradius(at({ a: 6, A: 90 })) - 3) < 1e-9)
    assert.equal(circumcirclePrediction(at({ a: 6, A: 30 })), '=')
    assert.equal(circumcirclePrediction(at({ a: 6, A: 150 })), '=')
    assert.equal(circumcirclePrediction(at({ a: 6, A: 60 })), '<')
    // The three vertices are on the circle, BC is a and the angle at A is A, wherever A sits on its arc
    for (const state of [at({ a: 6, A: 60, position: 2 }), at({ a: 9, A: 130, position: 7 }), at({ a: 4, A: 30, position: 5 })]) {
        const { A, B, C, R } = circumcircleVertices(state)
        for (const point of [A, B, C]) assert.ok(Math.abs(Math.hypot(point[0], point[1]) - R) < 1e-9)
        const { sides, angles } = circumcircleTriangle(state)
        assert.ok(Math.abs(sides.a - state.a) < 1e-9 && Math.abs(angles.A - state.A) < 1e-9, `${state.a} ${state.A} ${state.position}`)
        assert.ok(Math.abs(angles.A + angles.B + angles.C - 180) < 1e-9)
        // The sine rule: the three quotients are the diameter
        for (const [side, angle] of [[sides.a, angles.A], [sides.b, angles.B], [sides.c, angles.C]]) assert.ok(Math.abs(side / Math.sin(angle * D) - 2 * R) < 1e-9)
    }
    // Moving A along the arc keeps the prediction; a new a or A forgets it
    const predicted = { ...initialCircumcircleState, prediction: '<' as const }
    assert.equal(setCircumcircle(predicted, { position: 7 }).prediction, '<')
    assert.equal(setCircumcircle(predicted, { A: 90 }).prediction, null)
    assert.ok(!centreOutside(initialCircumcircleState))
    assert.ok(centreOutside(at({ A: 110 })) && centreOutside(at({ position: 1 })))
    checkChallenges(circumcircleChallenges, initialCircumcircleState, {
        102301: at({ A: 90 }),
        102302: at({ A: 30 }),
        102303: at({ a: 5, A: 30 }),
        102304: at({ position: 1 }),
        102305: at({ position: 5 })
    })
    checkExtras(circumcircleExtra, initialCircumcircleState, (state) => setCircumcircle(state, state))
})
