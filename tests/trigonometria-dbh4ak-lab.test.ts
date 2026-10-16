import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import katex from 'katex'
import {
    AREA_LIMITS,
    areaAltitude,
    areaChallenges,
    arcOverPi,
    calculatorChallenges,
    calculatorDecimal,
    calculatorValues,
    circleChallenges,
    circleValues,
    decimalText,
    DOUBLE_LIMITS,
    doubleChallenges,
    doubleSolution,
    ELEVATION_LIMITS,
    elevationChallenges,
    elevationHeight,
    fundamentalChallenges,
    fundamentalCosine,
    fundamentalValues,
    halfRootLatex,
    halfRootValue,
    initialAreaState,
    initialCalculatorState,
    initialCircleState,
    initialDoubleState,
    initialElevationState,
    initialFundamentalState,
    initialNotableState,
    initialRadianState,
    initialRatiosState,
    initialTwoSidesState,
    LEG_MAX,
    minutesText,
    NOTABLE_ANGLES,
    notableChallenges,
    notableLegRoots,
    piLatex,
    quadrant,
    radianChallenges,
    radiansOverPi,
    ratiosChallenges,
    ratiosExact,
    reducedAngle,
    rootLatex,
    setArea,
    setDouble,
    setFundamental,
    setTwoSides,
    triangleArea,
    trigonometryLabChallengeIds,
    trigonometryLabToolForTopic,
    trigonometryLabTools,
    twoSidesChallenges,
    twoSidesSolution,
    type AreaState,
    type CalculatorState,
    type CircleState,
    type DoubleState,
    type ElevationState,
    type FundamentalState,
    type NotableState,
    type RadianState,
    type RatiosState,
    type TwoSidesState
} from '../src/pages/dbh4-akademikoak-trigonometria/lab/labTools.ts'

const stages = ['ratios', 'identities', 'solving', 'problems', 'circle']
/** The lessons of lessons.tsx and their stages (node cannot load .tsx files) */
const trigonometryTopics = [
    ['right-ratios', 'ratios'], ['ratio-properties', 'ratios'], ['notable-angles', 'ratios'],
    ['fundamental', 'identities'], ['one-ratio', 'identities'], ['calculator', 'identities'],
    ['two-sides', 'solving'], ['side-angle', 'solving'], ['elevation', 'solving'],
    ['double-observation', 'problems'], ['oblique', 'problems'], ['trig-area', 'problems'],
    ['unit-circle', 'circle'], ['reduction', 'circle'], ['radians', 'circle']
].map(([id, stage]) => ({ id, stage }))
const allChallenges = [ratiosChallenges, notableChallenges, fundamentalChallenges, calculatorChallenges, twoSidesChallenges, elevationChallenges, doubleChallenges, areaChallenges, circleChallenges, radianChallenges] as const
const range = (min: number, max: number, step = 1) => Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, index) => min + index * step)

/** Every state each tool can reach, to check that each challenge can be solved */
const ratiosStates: RatiosState[] = range(1, LEG_MAX).flatMap((opposite) => range(1, LEG_MAX).map((adjacent) => ({ opposite, adjacent })))
const notableStates: NotableState[] = NOTABLE_ANGLES.flatMap((angle) => range(1, 12).map((hypotenuse) => ({ angle, hypotenuse })))
const fundamentalStates: FundamentalState[] = range(2, 13).flatMap((q) => range(1, q - 1).map((p) => ({ p, q })))
const calculatorStates: CalculatorState[] = range(0, 89).flatMap((degrees) => range(0, 59).map((minutes) => ({ degrees, minutes })))
const twoSidesStates: TwoSidesState[] = [
    ...range(1, 15).flatMap((a) => range(1, 15).map((b): TwoSidesState => ({ mode: 'legs', a, b }))),
    ...range(1, 14).flatMap((a) => range(a + 1, 15).map((b): TwoSidesState => ({ mode: 'leg-hypotenuse', a, b })))
]
const elevationStates: ElevationState[] = range(ELEVATION_LIMITS.distance.min, ELEVATION_LIMITS.distance.max, 5).flatMap((distance) => range(5, 85, 5).map((angle) => ({ distance, angle })))
const doubleStates: DoubleState[] = range(DOUBLE_LIMITS.d.min, DOUBLE_LIMITS.d.max, 10).flatMap((d) => range(10, 80, 5).flatMap((far) => range(far + 5, 85, 5).map((near) => ({ d, far, near }))))
const areaStates: AreaState[] = range(1, 12).flatMap((b) => range(1, 12).flatMap((c) => range(AREA_LIMITS.angle.min, AREA_LIMITS.angle.max, 15).map((angle) => ({ b, c, angle }))))
const circleStates: CircleState[] = range(0, 360, 15).map((angle) => ({ angle }))
const radianStates: RadianState[] = range(0, 360, 15).flatMap((angle) => range(1, 6).map((r) => ({ angle, r })))

test('trigonometria 4. DBH ak lab: tools, topics and challenge ids', () => {
    assert.equal(trigonometryLabTools.length, 10)
    const topicIds = trigonometryTopics.map((topic) => topic.id)
    const source = readFileSync(new URL('../src/pages/dbh4-akademikoak-trigonometria/lessons.tsx', import.meta.url), 'utf8')
    assert.deepEqual([...source.matchAll(/id: '([a-z-]+)',\s+stage: '([a-z-]+)'/g)].map(([, id, stage]) => ({ id, stage })), trigonometryTopics)
    for (const tool of trigonometryLabTools) {
        assert.ok(stages.includes(tool.stage), tool.id)
        assert.ok(topicIds.includes(tool.lessonTopic), tool.id)
        assert.equal(trigonometryTopics.find((topic) => topic.id === tool.lessonTopic)?.stage, tool.stage, tool.id)
        for (const language of ['eu', 'es', 'ar'] as const) assert.ok(!tool.observe[language].includes('$') && tool.observe[language].length > 0, tool.id)
    }
    for (const stage of stages) assert.equal(trigonometryLabTools.filter((tool) => tool.stage === stage).length, 2, stage)
    // Every lesson opens a tool of its own stage
    for (const topic of trigonometryTopics) {
        const tool = trigonometryLabTools.find((item) => item.id === trigonometryLabToolForTopic[topic.id])
        assert.ok(tool, topic.id)
        assert.equal(tool.stage, topic.stage, topic.id)
    }
    assert.equal(trigonometryLabChallengeIds.length, 40)
    assert.equal(new Set(trigonometryLabChallengeIds).size, trigonometryLabChallengeIds.length)
    for (const challenges of allChallenges) {
        for (const challenge of challenges) {
            assert.ok(challenge.id >= 71001 && challenge.id <= 71999, `${challenge.id}`)
            for (const language of ['eu', 'es', 'ar'] as const) {
                for (const text of [challenge.prompt[language], challenge.hint[language]]) {
                    assert.ok(!text.includes('\\sen') && !text.includes('\\tg'), `${challenge.id} ${language}: names not localized`)
                    for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true })
                }
            }
            assert.ok(!challenge.prompt.ar.includes('{,}') && !challenge.hint.ar.includes('{,}'), `${challenge.id}`)
            assert.ok(challenge.prompt.es.includes('\\operatorname{sen}') || !/\\sin/.test(challenge.prompt.es), `${challenge.id}: Spanish writes sen`)
        }
    }
})

test('trigonometria 4. DBH ak lab: every challenge can be solved and the start solves none', () => {
    const check = <State>(challenges: ReadonlyArray<{ id: number; isSolved: (state: State) => boolean }>, states: State[], start: State) => {
        for (const challenge of challenges) assert.ok(states.some((state) => challenge.isSolved(state)), `${challenge.id}`)
        assert.deepEqual(challenges.filter((challenge) => challenge.isSolved(start)).map((challenge) => challenge.id), [])
        assert.ok(states.some((state) => JSON.stringify(state) === JSON.stringify(start)), 'the start is a reachable state')
    }
    check(ratiosChallenges, ratiosStates, initialRatiosState)
    check(notableChallenges, notableStates, initialNotableState)
    check(fundamentalChallenges, fundamentalStates, initialFundamentalState)
    check(calculatorChallenges, calculatorStates, initialCalculatorState)
    check(twoSidesChallenges, twoSidesStates, initialTwoSidesState)
    check(elevationChallenges, elevationStates, initialElevationState)
    check(doubleChallenges, doubleStates, initialDoubleState)
    check(areaChallenges, areaStates, initialAreaState)
    check(circleChallenges, circleStates, initialCircleState)
    check(radianChallenges, radianStates, initialRadianState)
})

test('trigonometria 4. DBH ak lab: ratios, notable angles and the fundamental relation', () => {
    assert.deepEqual(ratiosExact({ opposite: 3, adjacent: 4 }), { sin: { numerator: 3, denominator: 5 }, cos: { numerator: 4, denominator: 5 } })
    assert.equal(ratiosExact({ opposite: 2, adjacent: 3 }), null)
    assert.deepEqual(ratiosExact({ opposite: 6, adjacent: 8 }), ratiosExact({ opposite: 3, adjacent: 4 }))
    for (const angle of NOTABLE_ANGLES) {
        const roots = notableLegRoots(angle)
        for (const h of range(1, 12)) {
            assert.ok(Math.abs(halfRootValue(h, roots.opposite) - h * Math.sin((angle * Math.PI) / 180)) < 1e-9, `${angle} ${h}`)
            assert.ok(Math.abs(halfRootValue(h, roots.adjacent) - h * Math.cos((angle * Math.PI) / 180)) < 1e-9, `${angle} ${h}`)
            for (const root of [roots.opposite, roots.adjacent]) katex.renderToString(halfRootLatex(h, root), { throwOnError: true })
        }
    }
    assert.equal(halfRootLatex(6, 3), '3\\sqrt{3}')
    assert.equal(halfRootLatex(2, 2), '\\sqrt{2}')
    assert.equal(halfRootLatex(5, 1), '\\frac{5}{2}')
    assert.equal(halfRootLatex(1, 3), '\\frac{\\sqrt{3}}{2}')
    for (const state of fundamentalStates) {
        const { sin, cos } = fundamentalValues(state)
        assert.ok(Math.abs(sin * sin + cos * cos - 1) < 1e-12)
    }
    assert.deepEqual(fundamentalCosine({ p: 3, q: 5 }), { numerator: 4, denominator: 5 })
    assert.equal(fundamentalCosine({ p: 1, q: 3 }), null)
    assert.equal(rootLatex(8), '2\\sqrt{2}')
    assert.equal(rootLatex(16), '4')
    assert.deepEqual(setFundamental({ p: 7, q: 8 }, { q: 4 }), { p: 3, q: 4 })
})

test('trigonometria 4. DBH ak lab: calculator, solving and heights', () => {
    assert.ok(Math.abs(calculatorDecimal({ degrees: 12, minutes: 15 }) - 12.25) < 1e-12)
    assert.equal(decimalText(calculatorValues({ degrees: 30, minutes: 0 }).sin, 4), '0,5000')
    assert.equal(minutesText(36.8699), '36° 52′')
    assert.equal(decimalText(-0.866, 2), '−0,87')
    assert.equal(decimalText(-0.0001, 2), '0,00')
    assert.deepEqual(setTwoSides({ mode: 'legs', a: 12, b: 5 }, { mode: 'leg-hypotenuse' }), { mode: 'leg-hypotenuse', a: 12, b: 13 })
    const half = twoSidesSolution({ mode: 'leg-hypotenuse', a: 4, b: 8 })
    assert.ok(Math.abs(half.alpha - 30) < 1e-9 && Math.abs(half.beta - 60) < 1e-9)
    assert.ok(Math.abs(twoSidesSolution({ mode: 'legs', a: 3, b: 4 }).third - 5) < 1e-12)
    assert.ok(Math.abs(elevationHeight({ distance: 20, angle: 45 }) - 20) < 1e-9)
    // The near angle stays above the far one, whichever is moved
    assert.deepEqual(setDouble({ d: 30, far: 20, near: 40 }, { far: 40 }), { d: 30, far: 40, near: 45 })
    assert.deepEqual(setDouble({ d: 30, far: 20, near: 40 }, { near: 15 }), { d: 30, far: 10, near: 15 })
    for (const state of doubleStates) {
        const { x, h } = doubleSolution(state)
        assert.ok(x > 0 && h > 0)
        const tan = (degrees: number) => Math.tan((degrees * Math.PI) / 180)
        assert.ok(Math.abs(h - (state.d + x) * tan(state.far)) < 1e-6 * h, JSON.stringify(state))
    }
    const classic = doubleSolution({ d: 20, far: 30, near: 60 })
    assert.ok(Math.abs(classic.x - 10) < 1e-9 && Math.abs(classic.h - 10 * Math.sqrt(3)) < 1e-9)
})

test('trigonometria 4. DBH ak lab: areas, the unit circle and radians', () => {
    assert.ok(Math.abs(triangleArea({ b: 6, c: 8, angle: 90 }) - 24) < 1e-9)
    assert.ok(Math.abs(triangleArea({ b: 6, c: 8, angle: 30 }) - triangleArea({ b: 6, c: 8, angle: 150 })) < 1e-9)
    assert.ok(Math.abs(areaAltitude({ b: 6, c: 8, angle: 30 }) - 4) < 1e-9)
    assert.deepEqual(setArea(initialAreaState, { angle: 200 }), { ...initialAreaState, angle: 165 })
    assert.deepEqual([45, 120, 210, 330, 0, 90, 180, 270, 360].map(quadrant), [1, 2, 3, 4, null, null, null, null, null])
    assert.deepEqual(reducedAngle(150), { reduced: 30, relation: '180-a' })
    assert.deepEqual(reducedAngle(225), { reduced: 45, relation: '180+a' })
    assert.deepEqual(reducedAngle(300), { reduced: 60, relation: '360-a' })
    for (const { angle } of circleStates) {
        const { sin, cos, tan } = circleValues(angle)
        const { reduced } = reducedAngle(angle)
        const base = circleValues(reduced)
        assert.ok(Math.abs(Math.abs(sin) - Math.abs(base.sin)) < 1e-12 && Math.abs(Math.abs(cos) - Math.abs(base.cos)) < 1e-12, `${angle}`)
        assert.equal(tan === null, angle === 90 || angle === 270, `${angle}`)
    }
    assert.equal(piLatex(radiansOverPi(60)), '\\frac{\\pi}{3}')
    assert.equal(piLatex(radiansOverPi(300)), '\\frac{5\\pi}{3}')
    assert.equal(piLatex(radiansOverPi(360)), '2\\pi')
    assert.equal(piLatex(radiansOverPi(0)), '0')
    assert.equal(piLatex(arcOverPi({ angle: 90, r: 4 })), '2\\pi')
    for (const { angle, r } of radianStates) katex.renderToString(piLatex(arcOverPi({ angle, r })), { throwOnError: true })
})
