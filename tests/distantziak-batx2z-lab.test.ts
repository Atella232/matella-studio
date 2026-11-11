import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom, randomInt } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { cross, dot, sub, type Vec3 } from '../src/pages/batx2-zientziak-bektoreak/space/vec3.ts'
import { degreesLatex, rootLatex } from '../src/pages/batx2-zientziak-distantziak/lab/common.ts'
import { distanceSquare, footChallenges, footExtra, footPoint, footPrediction, initialFootState, normalFootState, type FootState } from '../src/pages/batx2-zientziak-distantziak/lab/foot.ts'
import { anglesDistancesLabChallengeIds, anglesDistancesLabToolForTopic, anglesDistancesLabTools } from '../src/pages/batx2-zientziak-distantziak/lab/labTools.ts'
import { initialMirrorState, mirrorChallenges, mirrorExtra, mirrorFoot, mirrorImage, mirrorPrediction, normalMirrorState, type MirrorState } from '../src/pages/batx2-zientziak-distantziak/lab/mirror.ts'
import { angleDegrees, angleKind, initialProtractorState, normalProtractorState, protractorChallenges, protractorExtra, protractorPrediction, type ProtractorState } from '../src/pages/batx2-zientziak-distantziak/lab/protractor.ts'
import { initialRulerState, normalRulerState, rulerChallenges, rulerExtra, rulerPrediction, type RulerState } from '../src/pages/batx2-zientziak-distantziak/lab/ruler.ts'
import { initialSkewBoxState, isParallel, normalSkewBoxState, skewBoxChallenges, skewBoxExtra, skewPrediction, skewSquare, type SkewBoxState } from '../src/pages/batx2-zientziak-distantziak/lab/skewBox.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const
const topics = ['angle-lines', 'angle-line-plane', 'angle-planes', 'project-point-plane', 'project-point-line', 'project-line-plane', 'symmetric-plane', 'symmetric-line', 'mediator-plane', 'point-plane', 'parallel-planes', 'point-line', 'parallel-lines', 'skew-distance', 'common-perpendicular']
const renders = (formula: string) => katex.renderToString(formula, { throwOnError: true, strict: 'error' })

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), `Arabic in ${language}: ${text[language]}`)
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
        // MathText turns a colon into ÷
        for (const [, formula] of text.es.matchAll(/\$([^$]+)\$/g)) assert.ok(!formula.includes(':'), formula)
    }
}

function checkChallenges<State>(challenges: LabChallenge<State>[], initial: State, solutions: Record<number, State>, block: [number, number], normal: (state: State) => State) {
    assert.equal(new Set(challenges.map((challenge) => challenge.id)).size, challenges.length)
    assert.equal(challenges.length, 5)
    for (const challenge of challenges) {
        assert.ok(challenge.id >= block[0] && challenge.id <= block[1], `${challenge.id} outside its block`)
        const solution = solutions[challenge.id]
        assert.ok(solution, `${challenge.id} has no named solution`)
        assert.deepEqual(normal(solution), solution, `${challenge.id}: its solution cannot be set with the controls`)
        assert.ok(challenge.isSolved(solution), `${challenge.id} is not solved by its solution`)
        assert.ok(!challenge.isSolved(initial), `${challenge.id} starts solved`)
    }
    assert.deepEqual(normal(initial), initial, 'the starting state is out of the controls')
    checkTexts(challenges.flatMap((challenge) => [challenge.prompt, challenge.hint]))
}

function checkExtras<State>(maker: LabChallengeMaker<State>, initial: State, normal: (state: State) => State) {
    const prompts = new Set<string>()
    for (let seed = 1; seed <= 150; seed += 1) {
        const challenge = maker(createRandom(seed * 7919 + 3))
        assert.ok(challenge.isSolved(challenge.solution), `seed ${seed}: ${challenge.prompt.es}`)
        assert.deepEqual(normal(challenge.solution), challenge.solution, `seed ${seed}: unreachable ${challenge.prompt.es}`)
        assert.ok(!challenge.isSolved(initial), `seed ${seed} starts solved`)
        checkTexts([challenge.prompt, challenge.hint])
        prompts.add(challenge.prompt.es)
    }
    assert.ok(prompts.size >= 6, `only ${prompts.size} different challenges`)
}

const randomVec = (random: () => number, limit: number, nonZero = false): Vec3 => {
    for (;;) {
        const v: Vec3 = [randomInt(random, -limit, limit), randomInt(random, -limit, limit), randomInt(random, -limit, limit)]
        if (!nonZero || v.some((value) => value !== 0)) return v
    }
}
const asNumbers = (point: FractionValue[]): Vec3 => [point[0].numerator / point[0].denominator, point[1].numerator / point[1].denominator, point[2].numerator / point[2].denominator]
const close = (a: number, b: number) => Math.abs(a - b) < 1e-9

test('distantziak batx2 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(anglesDistancesLabTools.length, 5)
    assert.deepEqual(anglesDistancesLabTools.map((tool) => tool.stage), ['angles', 'projections', 'symmetric', 'point-distances', 'line-distances'])
    for (const tool of anglesDistancesLabTools) {
        assert.ok(topics.includes(tool.lessonTopic!), tool.id)
        checkTexts([tool.title, tool.observe])
    }
    assert.deepEqual(Object.keys(anglesDistancesLabToolForTopic).sort(), [...topics].sort())
    assert.equal(new Set(anglesDistancesLabChallengeIds).size, 25)
    assert.ok(anglesDistancesLabChallengeIds.every((id) => id >= 121101 && id <= 121399))
})

test('distantziak batx2 z lab: exact roots and angles', () => {
    assert.equal(rootLatex(9, 1, 'es'), '3')
    assert.equal(rootLatex(4, 9, 'es'), '\\frac{2}{3}')
    assert.equal(rootLatex(8, 2, 'es'), '2')
    assert.equal(rootLatex(5, 1, 'es'), '\\sqrt{5}\\approx 2{,}24')
    assert.equal(rootLatex(5, 1, 'ar'), '\\sqrt{5}\\approx 2.24')
    assert.equal(degreesLatex(60.0000000001, 'es'), '=60^\\circ')
    assert.equal(degreesLatex(54.7356, 'eu'), '\\approx 54{,}74^\\circ')
    for (let top = 0; top <= 30; top++) for (let bottom = 1; bottom <= 12; bottom++) renders(`d=${rootLatex(top, bottom, 'es')}`)
})

test('distantziak batx2 z lab: L1 the angle and its kind', () => {
    const random = createRandom(21)
    for (let round = 0; round < 3000; round++) {
        const mode = (['lines', 'line-plane', 'planes'] as const)[round % 3]
        const state: ProtractorState = { mode, a: randomVec(random, 3, true), b: randomVec(random, 3, true), prediction: null }
        const cosine = Math.abs(dot(state.a, state.b)) / Math.sqrt(dot(state.a, state.a) * dot(state.b, state.b))
        const degrees = angleDegrees(state)
        const expected = mode === 'line-plane' ? 90 - (Math.acos(Math.min(1, cosine)) * 180) / Math.PI : (Math.acos(Math.min(1, cosine)) * 180) / Math.PI
        assert.ok(Math.abs(degrees - expected) < 1e-6, JSON.stringify(state))
        assert.ok(degrees >= -1e-9 && degrees <= 90 + 1e-9)
        const kind = angleKind(state)
        assert.equal(kind, Math.abs(degrees) < 1e-6 ? 'zero' : Math.abs(degrees - 90) < 1e-6 ? 'right' : 'acute', JSON.stringify(state))
        assert.equal(protractorPrediction(state), kind === 'zero' ? '<' : kind === 'acute' ? '=' : '>')
    }
    checkChallenges(protractorChallenges, initialProtractorState, {
        121101: { mode: 'lines', a: [1, 1, 0], b: [1, -1, 1], prediction: null },
        121102: { mode: 'line-plane', a: [1, 1, 1], b: [2, 2, 2], prediction: null },
        121103: { mode: 'planes', a: [1, 1, 0], b: [2, 2, 0], prediction: null },
        121104: { mode: 'lines', a: [1, 1, 0], b: [1, 0, 1], prediction: null },
        121105: { mode: 'line-plane', a: [1, 0, 1], b: [1, 1, 0], prediction: null }
    }, [121101, 121105], normalProtractorState)
    checkExtras(protractorExtra, initialProtractorState, normalProtractorState)
})

test('distantziak batx2 z lab: L2 the foot is on the plane or the line and PM is perpendicular', () => {
    const random = createRandom(22)
    for (let round = 0; round < 3000; round++) {
        const state: FootState = { mode: round % 2 ? 'plane' : 'line', p: randomVec(random, 3), n: randomVec(random, 2, true), d: randomInt(random, -4, 4), a: randomVec(random, 2), u: randomVec(random, 2, true), prediction: null }
        const m = asNumbers(footPoint(state))
        const pm = sub(m, state.p)
        const [top, bottom] = distanceSquare(state)
        assert.ok(close(dot(pm, pm), top / bottom), JSON.stringify(state))
        if (state.mode === 'plane') {
            assert.ok(close(dot(state.n, m), state.d))
            assert.ok(cross(pm, state.n).every((value) => close(value, 0)))
        } else {
            assert.ok(cross(sub(m, state.a), state.u).every((value) => close(value, 0)))
            assert.ok(close(dot(pm, state.u), 0))
        }
        assert.equal(footPrediction(state), Math.abs(m[2]) < 1e-12 ? '=' : m[2] < 0 ? '<' : '>')
    }
    checkChallenges(footChallenges, initialFootState, {
        121151: { ...initialFootState, mode: 'plane', p: [1, 1, 1], n: [1, 1, 1], d: 0 },
        121152: { ...initialFootState, mode: 'plane', p: [2, 1, 1], n: [0, 0, 1], d: 1 },
        121153: { ...initialFootState, mode: 'line', a: [0, 0, 0], u: [1, 0, 0], p: [2, 1, 1] },
        121154: { ...initialFootState, mode: 'plane', n: [1, 1, 1], d: 3, p: [2, 2, 2] },
        121155: { ...initialFootState, mode: 'plane', n: [0, 0, 1], d: -1, p: [2, 1, 3] }
    }, [121151, 121155], normalFootState)
    checkExtras(footExtra, initialFootState, normalFootState)
})

test('distantziak batx2 z lab: L3 the mirror image is at the same distance on the other side', () => {
    const random = createRandom(23)
    for (let round = 0; round < 3000; round++) {
        const state: MirrorState = { p: randomVec(random, 3), q: randomVec(random, 3), n: randomVec(random, 2, true), d: randomInt(random, -4, 4), prediction: null }
        const m = asNumbers(mirrorFoot(state, state.p))
        const image = asNumbers(mirrorImage(state, state.p))
        m.forEach((value, index) => assert.ok(close(2 * value, state.p[index] + image[index])))
        assert.ok(close(dot(state.n, m), state.d))
        assert.ok(close(dot(state.n, state.p) - state.d, -(dot(state.n, image) - state.d)))
        assert.equal(mirrorPrediction(state), Math.abs(image[2]) < 1e-12 ? '=' : image[2] < 0 ? '<' : '>')
    }
    checkChallenges(mirrorChallenges, initialMirrorState, {
        121201: { ...initialMirrorState, p: [2, 2, 2], n: [1, 1, 1], d: 3 },
        121202: { ...initialMirrorState, p: [2, 1, 0], n: [0, 0, 1], d: 0 },
        121203: { ...initialMirrorState, p: [1, 2, 3], n: [0, 0, 1], d: 0 },
        121204: { ...initialMirrorState, p: [2, 1, 3], n: [1, 0, 0], d: 0 },
        121205: { ...initialMirrorState, p: [2, 1, 3], n: [0, 0, 1], d: 1 }
    }, [121201, 121205], normalMirrorState)
    checkExtras(mirrorExtra, initialMirrorState, normalMirrorState)
})

test('distantziak batx2 z lab: L4 the distance ruler', () => {
    const random = createRandom(24)
    for (let round = 0; round < 2000; round++) {
        const state: RulerState = { mode: round % 2 ? 'plane' : 'line', p: randomVec(random, 3), n: randomVec(random, 2, true), d: randomInt(random, -9, 9), a: randomVec(random, 2), u: randomVec(random, 2, true), prediction: null }
        const [top, bottom] = distanceSquare(state)
        const distance = Math.sqrt(top / bottom)
        assert.equal(rulerPrediction(state), Math.abs(distance - 3) < 1e-9 ? '=' : distance < 3 ? '<' : '>')
    }
    checkChallenges(rulerChallenges, initialRulerState, {
        121251: { ...initialRulerState, mode: 'plane', p: [1, 2, 3], n: [0, 0, 1], d: 0 },
        121252: { ...initialRulerState, mode: 'plane', n: [2, 1, 2], d: 0, p: [1, 1, 0] },
        121253: { ...initialRulerState, mode: 'line', a: [0, 0, 0], u: [1, 0, 0], p: [0, 2, 2] },
        121254: { ...initialRulerState, mode: 'plane', p: [0, 0, 0], n: [0, 0, 1], d: 2 },
        121255: { ...initialRulerState, mode: 'line', a: [0, 0, 0], u: [1, 1, 0], p: [1, 1, 0] }
    }, [121251, 121255], normalRulerState)
    checkExtras(rulerExtra, initialRulerState, normalRulerState)
})

test('distantziak batx2 z lab: L5 the box of skew lines', () => {
    const random = createRandom(25)
    for (let round = 0; round < 3000; round++) {
        const state: SkewBoxState = { b: randomVec(random, 3), u: randomVec(random, 2, true), v: randomVec(random, 2, true), prediction: null }
        if (round % 4 === 0) state.v = state.u
        const [top, bottom] = skewSquare(state)
        // The distance is the smallest |B + λv − t·u| over t and λ
        let best = Infinity
        for (let t = -12; t <= 12; t += 0.05) for (let l = -12; l <= 12; l += 0.5) {
            const point = sub([state.b[0] + l * state.v[0], state.b[1] + l * state.v[1], state.b[2] + l * state.v[2]], [t * state.u[0], t * state.u[1], t * state.u[2]])
            best = Math.min(best, dot(point, point))
            if (round > 40) break
        }
        if (round <= 40) assert.ok(top / bottom <= best + 1e-6, JSON.stringify(state))
        assert.equal(isParallel(state), cross(state.u, state.v).every((value) => value === 0))
        const distance = Math.sqrt(top / bottom)
        assert.equal(skewPrediction(state), Math.abs(distance - 2) < 1e-9 ? '=' : distance < 2 ? '<' : '>')
    }
    checkChallenges(skewBoxChallenges, initialSkewBoxState, {
        121301: { b: [0, 1, 2], u: [1, 0, 0], v: [0, 1, 0], prediction: null },
        121302: { b: [1, 1, 0], u: [1, 0, 0], v: [0, 1, 0], prediction: null },
        121303: { b: [0, 1, 0], u: [1, 0, 0], v: [2, 0, 0], prediction: null },
        121304: { b: [1, -1, 2], u: [1, 1, 0], v: [0, 1, 2], prediction: null },
        121305: { b: [0, 0, 2], u: [1, 0, 0], v: [0, 1, 1], prediction: null }
    }, [121301, 121305], normalSkewBoxState)
    checkExtras(skewBoxExtra, initialSkewBoxState, normalSkewBoxState)
})
