import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom, randomInt } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { cross, dot, rank, type Vec3 } from '../src/pages/batx2-zientziak-bektoreak/space/vec3.ts'
import { exactRank, generalLatex, levelLatex, linearLatex, nonZeroStep, pointLatex } from '../src/pages/batx2-zientziak-planoak/lab/common.ts'
import { cutOrCrossChallenges, cutOrCrossExtra, cutOrCrossPrediction, initialCutOrCrossState, meetingPoint, meetsBoth, normalCutOrCrossState, pairKind, pairMixed, type CutOrCrossState } from '../src/pages/batx2-zientziak-planoak/lab/cutOrCross.ts'
import { linesPlanesLabChallengeIds, linesPlanesLabToolForTopic, linesPlanesLabTools } from '../src/pages/batx2-zientziak-planoak/lab/labTools.ts'
import { continuousLatex, initialParameterState, LINE_LIMIT, LINE_RANGE, linePoint, normalParameterState, parameterChallenges, parameterExtra, parameterPrediction, T_LIMIT, type ParameterState } from '../src/pages/batx2-zientziak-planoak/lab/parameterT.ts'
import { initialPlaneNormalState, normalPlaneNormalState, planeConstant, planeNormalChallenges, planeNormalExtra, planeNormalPrediction, sideValue, type PlaneNormalState } from '../src/pages/batx2-zientziak-planoak/lab/planeNormal.ts'
import { coefficientRank, commonLine, commonPoint, extendedRank, initialThreePlanesState, normalOf, normalThreePlanesState, planesCase, threePlanesChallenges, threePlanesExtra, threePlanesPrediction, type PlaneRow, type ThreePlanesState } from '../src/pages/batx2-zientziak-planoak/lab/threePlanes.ts'
import { crossingPoint, initialThroughPlaneState, meetingT, normalThroughPlaneState, throughKind, throughPlaneChallenges, throughPlaneExtra, throughPrediction, type ThroughPlaneState } from '../src/pages/batx2-zientziak-planoak/lab/throughPlane.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const
const topics = ['line-parametric', 'line-continuous', 'implicit-to-parametric', 'plane-parametric', 'plane-general', 'plane-three-points', 'lines-parallel', 'lines-cross', 'lines-intersection', 'line-plane-position', 'line-plane-point', 'pencil-planes', 'two-planes', 'three-planes', 'planes-parameter']

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
        // No Basque suffix glued to a number or to a formula
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
    }
}

/** Every fixed challenge is solved by a state we name, and none is solved when the tool opens */
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

/** The endless challenges: well formed, solvable by their own solution, reachable and never solved at the start */
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
const asNumber = (value: FractionValue) => value.numerator / value.denominator
const close = (a: number, b: number) => Math.abs(a - b) < 1e-9

test('planoak batx2 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(linesPlanesLabTools.length, 5)
    assert.deepEqual(linesPlanesLabTools.map((tool) => tool.stage), ['lines', 'planes', 'two-lines', 'line-plane', 'planes-position'])
    for (const tool of linesPlanesLabTools) {
        assert.ok(topics.includes(tool.lessonTopic!), tool.id)
        checkTexts([tool.title, tool.observe])
    }
    assert.deepEqual(Object.keys(linesPlanesLabToolForTopic).sort(), [...topics].sort())
    for (const tool of Object.values(linesPlanesLabToolForTopic)) assert.ok(linesPlanesLabTools.some((item) => item.id === tool))
    assert.equal(new Set(linesPlanesLabChallengeIds).size, 25)
    assert.ok(linesPlanesLabChallengeIds.every((id) => id >= 120101 && id <= 120399))
})

test('planoak batx2 z lab: equations of planes are written well', () => {
    assert.equal(linearLatex([1, -1, 0]), 'x-y')
    assert.equal(linearLatex([0, 0, 1]), '{z}')
    assert.equal(linearLatex([-2, 0, 3]), '-2x+3{z}')
    assert.equal(linearLatex([0, 0, 0]), '0')
    assert.equal(generalLatex([1, 1, 2], -4), 'x+y+2{z}-4=0')
    assert.equal(generalLatex([0, -1, 0], 0), '-y=0')
    assert.equal(levelLatex([2, 0, -1], -3), '2x-{z}=-3')
    for (let a = -3; a <= 3; a++) for (let b = -3; b <= 3; b++) for (let c = -3; c <= 3; c++) for (const D of [-5, 0, 5]) {
        const text = generalLatex([a, b, c], D)
        assert.ok(!/\+-|--|(?<![\d])1[xy{]|(?<![\d])0[xy{]|^\+/.test(text), text)
        renders(text)
    }
})

test('planoak batx2 z lab: exact ranks and directions that are never zero', () => {
    const random = createRandom(2024)
    for (let round = 0; round < 3000; round++) {
        const rows = [0, 1, 2].map(() => [0, 1, 2, 3].map(() => randomInt(random, -2, 2)))
        if (round % 3 === 0) rows[2] = rows[0].map((value, index) => value + rows[1][index])
        assert.equal(exactRank(rows), rank(rows), JSON.stringify(rows))
        assert.equal(exactRank(rows.map((row) => row.slice(0, 3))), rank(rows.map((row) => row.slice(0, 3))))
        const previous = randomVec(random, 2, true)
        const next = randomVec(random, 3)
        const step = nonZeroStep(2, previous, next)
        assert.ok(step.some((value) => value !== 0) && step.every((value) => Math.abs(value) <= 2))
    }
    assert.deepEqual(nonZeroStep(2, [0, 0, 1], [0, 0, 0]), [0, 0, -1])
    assert.deepEqual(nonZeroStep(2, [0, -1, 0], [0, 0, 0]), [0, 1, 0])
})

test('planoak batx2 z lab: L1 the point of t stays on the board and its height decides the prediction', () => {
    const random = createRandom(11)
    for (let round = 0; round < 2000; round++) {
        const state: ParameterState = { a: randomVec(random, LINE_LIMIT), u: randomVec(random, LINE_LIMIT, true), t: randomInt(random, -T_LIMIT, T_LIMIT), prediction: null }
        const p = linePoint(state)
        assert.ok(p.every((value) => Math.abs(value) <= LINE_RANGE))
        assert.equal(parameterPrediction(state), p[2] === 0 ? '=' : p[2] < 0 ? '<' : '>')
        renders(continuousLatex(state.a, state.u))
    }
    assert.equal(continuousLatex([2, -1, 0], [1, 2, -1]), '\\frac{x-2}{1}=\\frac{y+1}{2}=\\frac{{z}}{-1}')
    assert.equal(continuousLatex([2, 1, 0], [0, 0, 1]), 'x=2,\\ y=1')
    checkChallenges(parameterChallenges, initialParameterState, {
        120101: { a: [1, -1, 2], u: [1, 1, -1], t: 2, prediction: null },
        120102: { a: [1, 0, 2], u: [2, 1, -2], t: 1, prediction: null },
        120103: { a: [2, 1, 0], u: [0, 0, 1], t: 0, prediction: null },
        120104: { a: [1, 1, 1], u: [1, 1, 1], t: -1, prediction: null },
        120105: { a: [2, -1, 0], u: [1, 2, -1], t: 0, prediction: null }
    }, [120101, 120105], normalParameterState)
    checkExtras(parameterExtra, initialParameterState, normalParameterState)
})

test('planoak batx2 z lab: L2 the side of Q is the sign of n·Q + D', () => {
    const random = createRandom(12)
    for (let round = 0; round < 2000; round++) {
        const state: PlaneNormalState = { n: randomVec(random, 3, true), a: randomVec(random, 3), q: randomVec(random, 3), prediction: null }
        assert.equal(planeConstant(state), -dot(state.n, state.a) + 0)
        assert.equal(sideValue(state), dot(state.n, state.q) - dot(state.n, state.a))
        assert.equal(sideValue({ ...state, q: state.a }), 0)
        const value = sideValue(state)
        assert.equal(planeNormalPrediction(state), value === 0 ? '=' : value < 0 ? '<' : '>')
    }
    checkChallenges(planeNormalChallenges, initialPlaneNormalState, {
        120151: { n: [1, 1, 2], a: [1, 1, 1], q: [2, 2, 0], prediction: null },
        120152: { n: [2, -1, 1], a: [1, 0, 1], q: [0, 0, 3], prediction: null },
        120153: { n: [0, 0, 1], a: [0, 0, 2], q: [0, 0, 3], prediction: null },
        120154: { n: [1, 1, 0], a: [1, -1, 0], q: [0, 0, 3], prediction: null },
        120155: { n: [1, 2, -1], a: [1, 1, 1], q: [0, 0, 3], prediction: null }
    }, [120151, 120155], normalPlaneNormalState)
    checkExtras(planeNormalExtra, initialPlaneNormalState, normalPlaneNormalState)
})

test('planoak batx2 z lab: L3 the kind of two lines and their exact meeting point', () => {
    const random = createRandom(13)
    const seen = new Set<string>()
    for (let round = 0; round < 4000; round++) {
        const state: CutOrCrossState = { a: randomVec(random, 2), u: randomVec(random, 2, true), b: randomVec(random, 2), v: randomVec(random, 2, true), prediction: null }
        if (round % 4 === 0) state.v = state.u
        const kind = pairKind(state)
        seen.add(kind)
        const parallel = cross(state.u, state.v).every((value) => value === 0)
        assert.equal(parallel, kind === 'parallel' || kind === 'same')
        if (!parallel) assert.equal(kind === 'meet', pairMixed(state) === 0)
        const point = meetingPoint(state)
        assert.equal(point !== null, kind === 'meet')
        if (point) {
            assert.ok(meetsBoth(state, point), JSON.stringify(state))
            renders(`P=${pointLatex(point)}`)
        }
        assert.equal(cutOrCrossPrediction(state), kind === 'meet' ? '<' : kind === 'skew' ? '>' : '=')
    }
    assert.deepEqual([...seen].sort(), ['meet', 'parallel', 'same', 'skew'])
    checkChallenges(cutOrCrossChallenges, initialCutOrCrossState, {
        120201: { a: [1, 0, 0], u: [0, 1, 0], b: [0, 1, 0], v: [1, 0, 0], prediction: null },
        120202: { a: [0, 0, 0], u: [1, 0, 0], b: [0, 0, 1], v: [0, 1, 0], prediction: null },
        120203: { a: [1, 0, 0], u: [0, 1, 0], b: [0, 0, 1], v: [0, 2, 0], prediction: null },
        120204: { a: [1, 0, 0], u: [0, 1, 0], b: [1, 2, 0], v: [0, -1, 0], prediction: null },
        120205: { a: [0, 1, 1], u: [1, 0, 0], b: [2, 0, 1], v: [0, 1, 0], prediction: null }
    }, [120201, 120205], normalCutOrCrossState)
    checkExtras(cutOrCrossExtra, initialCutOrCrossState, normalCutOrCrossState)
})

test('planoak batx2 z lab: L4 the crossing point is on the line and on the plane', () => {
    const random = createRandom(14)
    const seen = new Set<string>()
    for (let round = 0; round < 4000; round++) {
        const state: ThroughPlaneState = { n: randomVec(random, 2, true), d: randomInt(random, -4, 4), a: randomVec(random, 2), u: randomVec(random, 2, true), prediction: null }
        if (round % 3 === 0) state.u = cross(state.n, randomVec(random, 1, true)).every((value) => value === 0) ? state.u : cross(state.n, [1, 0, 0]).some((value) => value !== 0) ? cross(state.n, [1, 0, 0]) : cross(state.n, [0, 1, 0])
        if (state.u.some((value) => Math.abs(value) > 2) || state.u.every((value) => value === 0)) continue
        const kind = throughKind(state)
        seen.add(kind)
        const point = crossingPoint(state)
        const t = meetingT(state)
        assert.equal(point !== null, kind === 'meet')
        if (point && t) {
            const p = point.map(asNumber)
            assert.ok(close(state.n[0] * p[0] + state.n[1] * p[1] + state.n[2] * p[2], state.d), JSON.stringify(state))
            p.forEach((value, index) => assert.ok(close(value, state.a[index] + asNumber(t) * state.u[index])))
        }
        assert.equal(throughPrediction(state), kind === 'meet' ? '<' : kind === 'inside' ? '=' : '>')
    }
    assert.deepEqual([...seen].sort(), ['inside', 'meet', 'parallel'])
    checkChallenges(throughPlaneChallenges, initialThroughPlaneState, {
        120251: { n: [0, 0, 1], d: 2, a: [1, -1, 0], u: [1, 1, 0], prediction: null },
        120252: { n: [0, 0, 1], d: 0, a: [1, -1, 0], u: [1, 1, 0], prediction: null },
        120253: { n: [0, 0, 1], d: 0, a: [1, 1, 1], u: [1, 1, 1], prediction: null },
        120254: { n: [0, 0, 1], d: 2, a: [1, -1, 0], u: [0, 0, 1], prediction: null },
        120255: { n: [1, 1, 1], d: 3, a: [0, 0, 0], u: [1, 1, 1], prediction: null }
    }, [120251, 120255], normalThroughPlaneState)
    checkExtras(throughPlaneExtra, initialThroughPlaneState, normalThroughPlaneState)
})

test('planoak batx2 z lab: L5 ranks, cases, the common point and the common line', () => {
    const random = createRandom(15)
    const seen = new Set<string>()
    const row = (): PlaneRow => {
        const n = randomVec(random, 2, true)
        return [n[0], n[1], n[2], randomInt(random, -4, 4)]
    }
    for (let round = 0; round < 6000; round++) {
        const planes: [PlaneRow, PlaneRow, PlaneRow] = [row(), row(), row()]
        // Make the special cases common: a combination, a multiple, a copy
        const k = round % 5
        const mixed: PlaneRow = planes[0].map((value, index) => value + planes[1][index]) as unknown as PlaneRow
        if (k === 1 && normalOf(mixed).some((value) => value !== 0) && normalOf(mixed).every((value) => Math.abs(value) <= 2)) planes[2] = mixed
        if (k === 2) planes[1] = [planes[0][0], planes[0][1], planes[0][2], randomInt(random, -4, 4)]
        if (k === 3) planes[2] = [planes[0][0], planes[0][1], planes[0][2], planes[0][3]]
        if (k === 4) { planes[1] = [planes[0][0], planes[0][1], planes[0][2], randomInt(random, -4, 4)]; planes[2] = [planes[0][0], planes[0][1], planes[0][2], randomInt(random, -4, 4)] }
        const state: ThreePlanesState = { planes, prediction: null }
        const kind = planesCase(state)
        seen.add(kind)
        const m = coefficientRank(state)
        const extended = extendedRank(state)
        assert.equal(threePlanesPrediction(state), m === 3 ? '<' : m === extended ? '=' : '>')
        const point = commonPoint(state)
        assert.equal(point !== null, m === 3)
        if (point) for (const plane of planes) assert.ok(close(plane[0] * asNumber(point[0]) + plane[1] * asNumber(point[1]) + plane[2] * asNumber(point[2]), plane[3]), JSON.stringify(planes))
        const line = commonLine(state)
        assert.equal(line !== null, m === 2 && extended === 2)
        if (line) for (const plane of planes) {
            assert.ok(close(dot(normalOf(plane), line.point), plane[3]), JSON.stringify(planes))
            assert.ok(close(dot(normalOf(plane), line.direction), 0))
        }
        renders(`M^*=\\left(\\begin{array}{ccc|c}${planes.map((plane) => plane.join('&')).join('\\\\')}\\end{array}\\right)`)
    }
    assert.deepEqual([...seen].sort(), ['line', 'line-double', 'parallel', 'parallel-double', 'point', 'prism', 'same', 'two-parallel'])
    checkChallenges(threePlanesChallenges, initialThreePlanesState, {
        120301: { planes: [[1, 1, 1, 3], [1, -1, 0, 0], [1, 0, 1, 2]], prediction: null },
        120302: { planes: [[1, 1, 1, 3], [1, -1, 0, 0], [2, 0, 1, 3]], prediction: null },
        120303: { planes: [[1, 1, 1, 3], [1, -1, 0, 0], [2, 0, 1, 4]], prediction: null },
        120304: { planes: [[1, 1, 1, 3], [1, 1, 1, 0], [2, 2, 2, 2]], prediction: null },
        120305: { planes: [[1, 1, 1, 3], [1, 1, 1, 0], [1, 0, 1, 3]], prediction: null }
    }, [120301, 120305], normalThreePlanesState)
    checkExtras(threePlanesExtra, initialThreePlanesState, normalThreePlanesState)
})
