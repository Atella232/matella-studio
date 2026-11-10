import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { boxPrediction, boxProduct, boxVolume, boxVolumeChallenges, boxVolumeExtra, flattenedW, initialBoxVolumeState, setBoxVector, type BoxVolumeState } from '../src/pages/batx2-zientziak-bektoreak/lab/boxVolume.ts'
import { initialInPlaneState, inPlaneChallenges, inPlaneExtra, inPlanePrediction, planeCoefficients, planeDeterminant, planeRank, setPlaneVector, type InPlaneState } from '../src/pages/batx2-zientziak-bektoreak/lab/inPlane.ts'
import { spaceVectorsLabChallengeIds, spaceVectorsLabToolForTopic, spaceVectorsLabTools } from '../src/pages/batx2-zientziak-bektoreak/lab/labTools.ts'
import { doubledMidpoint, initialPointBoxState, pointBoxChallenges, pointBoxExtra, pointPrediction, pointSquare, setPoint, type PointBoxState } from '../src/pages/batx2-zientziak-bektoreak/lab/pointBox.ts'
import { handProduct, initialRightHandState, rightHandChallenges, rightHandExtra, rightHandPrediction, setHandVector, swapHand, type RightHandState } from '../src/pages/batx2-zientziak-bektoreak/lab/rightHand.ts'
import { initialSpaceShadowState, setShadowVector, shadowAngle, shadowDot, shadowVector, spaceShadowChallenges, spaceShadowExtra, spaceShadowPrediction, type SpaceShadowState } from '../src/pages/batx2-zientziak-bektoreak/lab/spaceShadow.ts'
import { add, det3, dot, scale, sub, type Vec3 } from '../src/pages/batx2-zientziak-bektoreak/space/vec3.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), `Arabic in ${language}: ${text[language]}`)
        // No Basque suffix glued to a number or to a formula
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
    }
}

/** Every fixed challenge is solved by a state we name, and none is solved when the tool opens */
function checkChallenges<State>(challenges: LabChallenge<State>[], initial: State, solutions: Record<number, State>, block: [number, number]) {
    assert.equal(new Set(challenges.map((challenge) => challenge.id)).size, challenges.length)
    assert.equal(challenges.length, 5)
    for (const challenge of challenges) {
        assert.ok(challenge.id >= block[0] && challenge.id <= block[1], `${challenge.id} outside its block`)
        assert.ok(solutions[challenge.id], `${challenge.id} has no named solution`)
        assert.ok(challenge.isSolved(solutions[challenge.id]), `${challenge.id} is not solved by its solution`)
        assert.ok(!challenge.isSolved(initial), `${challenge.id} starts solved`)
    }
    checkTexts(challenges.flatMap((challenge) => [challenge.prompt, challenge.hint]))
}

/** The endless challenges: well formed, solvable by their own solution, reachable and never solved at the start */
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

test('bektoreak batx2 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(spaceVectorsLabTools.length, 5)
    for (const stage of ['space', 'dependence', 'dot', 'cross', 'mixed']) assert.ok(spaceVectorsLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of spaceVectorsLabTools) {
        for (const language of languages) {
            assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
            // «Observe» is plain text, not LaTeX
            assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
        }
    }
    assert.equal(new Set(spaceVectorsLabChallengeIds).size, spaceVectorsLabChallengeIds.length)
    for (const id of spaceVectorsLabChallengeIds) assert.ok(id >= 119101 && id <= 119399, `${id}`)
    const topics = ['space-points', 'space-vectors', 'midpoint-symmetric', 'combination-3d', 'dependence-rank', 'basis-3d', 'dot-3d', 'angle-3d', 'projection-3d', 'cross-product', 'cross-properties', 'cross-area', 'mixed-product', 'mixed-volume', 'coplanar']
    assert.deepEqual(Object.keys(spaceVectorsLabToolForTopic).sort(), [...topics].sort())
    for (const [topic, tool] of Object.entries(spaceVectorsLabToolForTopic)) assert.ok(spaceVectorsLabTools.some((item) => item.id === tool), `${topic} → ${tool}`)
    for (const tool of spaceVectorsLabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
})

test('bektoreak batx2 z lab: el punto y su caja', () => {
    const state = (a: Vec3, b: Vec3): PointBoxState => ({ a, b, prediction: null })
    assert.equal(pointSquare(initialPointBoxState), 17)
    assert.equal(pointPrediction(initialPointBoxState), '<')
    assert.equal(pointPrediction(state([0, 0, 0], [0, 3, 4])), '=')
    assert.equal(pointPrediction(state([-1, -2, -3], [1, 1, 3])), '>')
    assert.deepEqual(doubledMidpoint(state([1, 2, 3], [3, 0, -1])), [4, 2, 2])
    // Changing a point clears the prediction; keeping it does not; points stay on the board
    const predicted = { ...initialPointBoxState, prediction: '<' as const }
    assert.equal(setPoint(predicted, 'A', predicted.a).prediction, '<')
    assert.equal(setPoint(predicted, 'A', [0, 0, 0]).prediction, null)
    assert.deepEqual(setPoint(initialPointBoxState, 'B', [9, -9, 2]).b, [4, -4, 2])
    checkChallenges(pointBoxChallenges, initialPointBoxState, {
        119101: state([-1, -2, -3], [1, 1, 3]),
        119102: state([0, 0, 0], [2, 2, 2]),
        119103: state([1, 2, 3], [-1, -2, -3]),
        119104: state([0, -2, -4], [1, 2, 4]),
        119105: state([1, 2, 0], [-1, -2, 3])
    }, [119101, 119105])
    checkExtras(pointBoxExtra, initialPointBoxState, (s) => setPoint(setPoint(s, 'A', s.a), 'B', s.b))
})

test('bektoreak batx2 z lab: ¿cabe en el plano?', () => {
    const state = (u: Vec3, v: Vec3, w: Vec3): InPlaneState => ({ u, v, w, prediction: null })
    assert.equal(planeDeterminant(initialInPlaneState), 3)
    assert.equal(inPlanePrediction(initialInPlaneState), '>')
    const inside = state([1, 2, -1], [2, 1, 0], [1, -1, 1])
    assert.equal(planeDeterminant(inside), 0)
    assert.equal(planeRank(inside), 2)
    assert.equal(inPlanePrediction(inside), '<')
    // w = v − u: the coefficients come out exact
    assert.deepEqual(planeCoefficients(inside)!.map((value) => [value.numerator, value.denominator]), [[-1, 1], [1, 1]])
    assert.equal(inPlanePrediction(state([1, 2, 0], [-2, -4, 0], [0, 0, 1])), '=')
    // Every coefficient pair rebuilds w
    for (let seed = 0; seed < 300; seed++) {
        const u: Vec3 = [(seed % 7) - 3, ((seed * 3) % 7) - 3, ((seed * 5) % 7) - 3]
        const v: Vec3 = [((seed * 2) % 7) - 3, ((seed * 11) % 7) - 3, ((seed * 13) % 7) - 3]
        const w = add(scale((seed % 5) - 2, u), scale(((seed * 3) % 5) - 2, v))
        const coefficients = planeCoefficients(state(u, v, w))
        if (!coefficients) continue
        const [a, b] = coefficients.map((value) => value.numerator / value.denominator)
        assert.ok(sub(add(scale(a, u), scale(b, v)), w).every((value) => Math.abs(value) < 1e-9), `${u} ${v} ${w}`)
    }
    checkChallenges(inPlaneChallenges, initialInPlaneState, {
        119151: state([1, 2, 0], [0, 1, 1], [1, 3, 1]),
        119152: state([1, 0, 1], [0, 1, 1], [0, 0, 2]),
        119153: state([1, 1, 1], [2, 2, 2], [-1, -1, -1]),
        119154: state([1, 1, 0], [0, 1, 1], [2, 1, -1]),
        119155: state([1, 1, 1], [1, -1, 1], [1, 1, -1])
    }, [119151, 119155])
    checkExtras(inPlaneExtra, initialInPlaneState, (s) => setPlaneVector(setPlaneVector(setPlaneVector(s, 'u', s.u), 'v', s.v), 'w', s.w))
})

test('bektoreak batx2 z lab: la sombra en el espacio', () => {
    const state = (u: Vec3, v: Vec3): SpaceShadowState => ({ u, v, prediction: null })
    assert.equal(shadowDot(initialSpaceShadowState), 1)
    assert.equal(spaceShadowPrediction(initialSpaceShadowState), '>')
    const back = state([1, 1, 1], [-1, 0, 0])
    assert.equal(spaceShadowPrediction(back), '<')
    // The shadow lies on the line of u and v minus its shadow is perpendicular to u
    for (let seed = 0; seed < 200; seed++) {
        const u: Vec3 = [(seed % 7) - 3, ((seed * 3) % 7) - 3, ((seed * 5) % 7) - 3]
        const v: Vec3 = [((seed * 2) % 7) - 3, ((seed * 11) % 7) - 3, ((seed * 13) % 7) - 3]
        const foot = shadowVector(state(u, v))
        if (!foot) continue
        assert.ok(Math.abs(dot(sub(v, foot), u)) < 1e-9)
    }
    assert.ok(Math.abs(shadowAngle(state([1, 1, 0], [0, 1, 1]))! - 60) < 1e-9)
    checkChallenges(spaceShadowChallenges, initialSpaceShadowState, {
        119201: state([1, 1, 1], [1, -1, 0]),
        119202: state([1, 2, 2], [1, 2, 2]),
        119203: back,
        119204: state([0, 0, 2], [0, 0, 3]),
        119205: state([1, 1, 0], [0, 1, 1])
    }, [119201, 119205])
    checkExtras(spaceShadowExtra, initialSpaceShadowState, (s) => setShadowVector(setShadowVector(s, 'u', s.u), 'v', s.v))
})

test('bektoreak batx2 z lab: la mano derecha', () => {
    const state = (u: Vec3, v: Vec3, swapped = false): RightHandState => ({ u, v, swapped, prediction: null })
    assert.deepEqual(handProduct(initialRightHandState), [0, 0, 4])
    assert.equal(rightHandPrediction(initialRightHandState), '>')
    // Swapping turns the arrow round and asks again
    const swapped = swapHand({ ...initialRightHandState, prediction: '>' })
    assert.deepEqual(handProduct(swapped), [0, 0, -4])
    assert.equal(swapped.prediction, null)
    assert.equal(rightHandPrediction(swapped), '<')
    assert.equal(rightHandPrediction(state([1, 0, 0], [0, 0, 1])), '=')
    checkChallenges(rightHandChallenges, initialRightHandState, {
        119251: state([1, -2, 0], [2, 1, 0]),
        119252: state([2, 0, 0], [0, 3, 0]),
        119253: state([1, 1, 0], [2, 2, 0]),
        119254: state([1, 0, 0], [0, -1, 0], true),
        119255: state([0, 1, 0], [0, 0, 1])
    }, [119251, 119255])
    checkExtras(rightHandExtra, initialRightHandState, (s) => setHandVector(setHandVector(s, 'u', s.u), 'v', s.v))
})

test('bektoreak batx2 z lab: la caja de tres vectores', () => {
    const state = (u: Vec3, v: Vec3, w: Vec3): BoxVolumeState => ({ u, v, w, previous: null, prediction: null })
    // It opens after moving w sideways: same volume
    assert.equal(boxVolume(initialBoxVolumeState), 8)
    assert.equal(boxPrediction(initialBoxVolumeState), '=')
    // Raising w makes it bigger; the change keeps the box before it
    const raised = setBoxVector(initialBoxVolumeState, 'w', [1, 1, 3])
    assert.equal(boxVolume(raised.previous!), 8)
    assert.equal(boxPrediction(raised), '>')
    assert.equal(setBoxVector(raised, 'w', [1, 1, 3]), raised)
    // ▶ pushes w onto the plane of u and v: the volume goes to 0, and halfway it is halved
    for (const edges of [initialBoxVolumeState, state([1, 2, 0], [0, 1, 3], [2, 0, 1]), state([2, 1, -1], [0, 1, 2], [1, -3, 2])]) {
        assert.ok(Math.abs(det3(edges.u, edges.v, flattenedW(edges, 1))) < 1e-9)
        assert.ok(Math.abs(det3(edges.u, edges.v, flattenedW(edges, 0.5)) - boxProduct(edges) / 2) < 1e-9)
    }
    checkChallenges(boxVolumeChallenges, initialBoxVolumeState, {
        119301: state([2, 0, 0], [0, 2, 0], [0, 0, 3]),
        119302: state([1, 0, 0], [0, 1, 0], [1, 1, 0]),
        119303: state([1, 0, 0], [0, 2, 0], [0, 0, 3]),
        119304: state([2, 0, 0], [0, 3, 0], [1, 1, 2]),
        119305: state([1, 0, 0], [0, 2, 0], [0, 0, -3])
    }, [119301, 119305])
    checkExtras(boxVolumeExtra, initialBoxVolumeState, (s) => setBoxVector(setBoxVector(setBoxVector(s, 'u', s.u), 'v', s.v), 'w', s.w))
})
