import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { bach2DefiniteLabChallengeIds, bach2DefiniteLabToolForTopic, bach2DefiniteLabTools } from '../src/pages/batx2-zientziak-mugatua/lab/labTools.ts'
import { bestTenths, initialMeanState, isMeanPoint, MEAN_FUNCTIONS, MEAN_SETUP, meanArea, meanChallenges, meanExtra, meanPoint, meanPrediction, meanSteps, meanValue, rectangleArea, setMean, type MeanState } from '../src/pages/batx2-zientziak-mugatua/lab/meanRect.ts'
import { band, initialSqueezeState, lowerSum, pieces, setSqueeze, SQUEEZE_FUNCTIONS, SQUEEZE_LIMITS, SQUEEZE_SETUP, squeezeArea, squeezeChallenges, squeezeExtra, squeezePrediction, upperSum, type SqueezeState } from '../src/pages/batx2-zientziak-mugatua/lab/squeeze.ts'
import { allRight, initialStripState, regionArea, rightTops, setStrips, STRIP_REGIONS, STRIP_SETUP, stripChallenges, stripExtra, stripPrediction, stripTotal, stripValues, type StripState } from '../src/pages/batx2-zientziak-mugatua/lab/strips.ts'

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

/** ∫ₐᵇ f by Simpson's rule */
function simpson(fn: (x: number) => number, a: number, b: number, steps = 2000): number {
    const h = (b - a) / steps
    let sum = fn(a) + fn(b)
    for (let k = 1; k < steps; k += 1) sum += fn(a + k * h) * (k % 2 ? 4 : 2)
    return (sum * h) / 3
}
const near = (a: number, b: number) => Math.abs(a - b) < 1e-6 * Math.max(1, Math.abs(b))
/** Simpson's rule is slower to settle where the slope is infinite (√x at 0) */
const close = (a: number, b: number) => Math.abs(a - b) < 1e-4 * Math.max(1, Math.abs(b))

test('mugatua batx2 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(bach2DefiniteLabTools.length, 5)
    for (const tool of bach2DefiniteLabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    }
    // The «Observe» text of the tools of this unit is plain text, not LaTeX
    for (const tool of bach2DefiniteLabTools.filter((item) => ['squeeze', 'mean-rect', 'strips'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
        assert.ok(/[؀-ۿ]/.test(tool.observe.ar) && /[؀-ۿ]/.test(tool.title.ar), tool.id)
    }
    const topics = ['barrow-review', 'areas-review', 'lower-upper', 'limit-sums', 'mean-value', 'area-function', 'upper-limit', 'barrow-conditions', 'definite-change', 'definite-parts', 'piecewise', 'three-curves', 'parameter', 'integral-extrema', 'revolution']
    assert.deepEqual(Object.keys(bach2DefiniteLabToolForTopic).sort(), [...topics].sort())
    for (const tool of Object.values(bach2DefiniteLabToolForTopic)) if (tool) assert.ok(bach2DefiniteLabTools.some((item) => item.id === tool), tool)
    // Each tool opens a lesson of this unit that points back to it
    for (const tool of bach2DefiniteLabTools) assert.equal(bach2DefiniteLabToolForTopic[tool.lessonTopic], tool.id, tool.id)
    // The own ids live in this unit's block; the borrowed ones keep those of Integralak (1.º)
    const ids = bach2DefiniteLabChallengeIds
    assert.equal(new Set(ids).size, ids.length)
    for (const id of [...squeezeChallenges, ...meanChallenges, ...stripChallenges].map((challenge) => challenge.id)) assert.ok(id >= 127101 && id <= 127399, `${id}`)
})

test('mugatua batx2 z lab · trap the area: s ≤ A ≤ S, the band narrows, and the guess does not depend on n', () => {
    for (const fn of SQUEEZE_FUNCTIONS) {
        const setup = SQUEEZE_SETUP[fn]
        const area = squeezeArea(fn)
        assert.ok(close(area, simpson(setup.fn, setup.a, setup.b)), fn)
        const guess = squeezePrediction({ fn, n: 1 })
        for (let n = SQUEEZE_LIMITS.n.min; n <= SQUEEZE_LIMITS.n.max; n += 1) {
            const s = lowerSum(fn, n)
            const S = upperSum(fn, n)
            assert.ok(s <= area + 1e-9 && area <= S + 1e-9, `${fn} n=${n}: ${s} ≤ ${area} ≤ ${S}`)
            assert.equal(squeezePrediction({ fn, n }), guess, `${fn} n=${n}`)
            // Each rectangle is the true minimum and maximum of f on its piece (checked on a fine grid)
            for (const piece of pieces(fn, n)) {
                const values = Array.from({ length: 401 }, (_, k) => setup.fn(piece.x + (piece.width * k) / 400))
                assert.ok(Math.abs(Math.min(...values) - piece.low) < 1e-3 && Math.abs(Math.max(...values) - piece.high) < 1e-3, `${fn} n=${n} at ${piece.x}`)
            }
        }
        // Doubling n never widens the band
        for (const n of [1, 2, 4, 8, 16]) assert.ok(band(fn, 2 * n) <= band(fn, n) + 1e-9, `${fn} ${n}`)
    }
    // Bent down: nearer to S; bent up: nearer to s; straight: halfway
    assert.deepEqual(SQUEEZE_FUNCTIONS.map((fn) => squeezePrediction({ fn, n: 4 })), ['>', '<', '=', '>'])
    // A new function asks for a new guess; n does not
    const guessed: SqueezeState = { ...initialSqueezeState, prediction: '>' }
    assert.equal(setSqueeze(guessed, { n: 9 }).prediction, '>')
    assert.equal(setSqueeze(guessed, { fn: 'line' }).prediction, null)
    assert.equal(setSqueeze(guessed, { n: 99 }).n, SQUEEZE_LIMITS.n.max)
    const firstN = (test: (n: number) => boolean) => Array.from({ length: SQUEEZE_LIMITS.n.max }, (_, i) => i + 1).find(test)!
    checkChallenges(squeezeChallenges, initialSqueezeState, {
        127101: { fn: 'cap', n: firstN((n) => band('cap', n) < 2), prediction: null },
        127102: { fn: 'valley', n: firstN((n) => lowerSum('valley', n) > 8.5), prediction: null },
        127103: { fn: 'line', n: 8, prediction: null },
        127104: { fn: 'root', n: firstN((n) => band('root', n) < 0.25), prediction: null },
        127105: { fn: 'cap', n: firstN((n) => squeezeArea('cap') - lowerSum('cap', n) < 1 && upperSum('cap', n) - squeezeArea('cap') < 1), prediction: null }
    })
    checkExtras(squeezeExtra, initialSqueezeState, (state) => setSqueeze(state, {}))
})

test('mugatua batx2 z lab · the mean value rectangle: the point of the theorem and the guess', () => {
    for (const fn of MEAN_FUNCTIONS) {
        const setup = MEAN_SETUP[fn]
        const area = meanArea(fn)
        assert.ok(close(area, simpson(setup.fn, setup.a, setup.b)), fn)
        // f(c)·(b − a) is the area at the exact c, which lies inside the interval
        const c = meanPoint(fn)
        assert.ok(c > setup.a && c < setup.b, fn)
        assert.ok(near(setup.fn(c) * (setup.b - setup.a), area), fn)
        assert.ok(near(setup.fn(c), meanValue(fn)), fn)
        // The best tenth is the one whose rectangle comes nearest to the area
        const gaps = Array.from({ length: meanSteps(fn) + 1 }, (_, tenths) => Math.abs(rectangleArea({ fn, tenths }) - area))
        assert.equal(gaps.indexOf(Math.min(...gaps)), bestTenths(fn), fn)
        assert.ok(isMeanPoint({ fn, tenths: bestTenths(fn) }) && !isMeanPoint({ fn, tenths: bestTenths(fn) + 1 }), fn)
    }
    // √3 ≈ 1.73 and 16/9 ≈ 1.78: right of 1.5 and left of 2; a straight line at the middle
    assert.deepEqual(MEAN_FUNCTIONS.map((fn) => meanPrediction({ fn })), ['>', '<', '=', '>', '>'])
    assert.deepEqual(MEAN_FUNCTIONS.map(bestTenths), [17, 18, 20, 12, 12])
    // Moving c keeps the guess; a new function asks for a new one
    const guessed: MeanState = { ...initialMeanState, prediction: '<' }
    assert.equal(setMean(guessed, { tenths: 12 }).prediction, '<')
    assert.equal(setMean(guessed, { fn: 'exp' }).prediction, null)
    assert.equal(setMean(guessed, { tenths: 99 }).tenths, meanSteps('square'))
    const solutions = Object.fromEntries(meanChallenges.map((challenge, i) => [challenge.id, { fn: MEAN_FUNCTIONS[i], tenths: bestTenths(MEAN_FUNCTIONS[i]), prediction: null }])) as Record<number, MeanState>
    checkChallenges(meanChallenges, initialMeanState, solutions)
    checkExtras(meanExtra, initialMeanState, (state) => setMean(state, {}))
})

test('mugatua batx2 z lab · split the region: the strips, their values and the area', () => {
    const areas: Record<string, number> = { parabolaLine: 5 / 6, rootLine: 7 / 6, twoParabolas: 16 / 3, chord: 4 / 3, cubicAxis: 11 / 4 }
    for (const region of STRIP_REGIONS) {
        const setup = STRIP_SETUP[region]
        assert.ok(near(regionArea(region), areas[region]), region)
        assert.equal(setup.labels.length, setup.curves.length, region)
        // The strips follow each other, and in each one the curve marked on top really is on top (and they meet at the cuts)
        for (const [i, strip] of setup.strips.entries()) {
            if (i > 0) assert.equal(strip.from, setup.strips[i - 1].to, region)
            const upper = strip.curves[strip.top]
            const lower = strip.curves[strip.top === 0 ? 1 : 0]
            for (let k = 1; k < 20; k += 1) {
                const x = strip.from + ((strip.to - strip.from) * k) / 20
                assert.ok(upper.fn(x) > lower.fn(x), `${region} strip ${i} at ${x}`)
            }
            for (const curve of strip.curves) assert.ok(close(curve.F(strip.to) - curve.F(strip.from), simpson(curve.fn, strip.from, strip.to)), `${region} ${curve.name}`)
        }
        // With the right tops every strip is positive and the sum is the area; turning one over makes it negative
        const right: StripState = { region, tops: rightTops(region), prediction: '=' }
        assert.ok(allRight(right) && stripValues(right).every((value) => value > 0))
        assert.ok(near(stripTotal(right), areas[region]))
        const turned = setStrips(right, { strip: 0, top: right.tops[0] === 0 ? 1 : 0 })
        assert.ok(!allRight(turned) && stripValues(turned)[0] < 0, region)
        // The first buttons never fit the whole region
        assert.ok(!allRight({ region, tops: setup.strips.map(() => 0), prediction: '=' }), region)
    }
    assert.deepEqual(STRIP_REGIONS.map((region) => stripPrediction({ region })), ['=', '=', '=', '<', '>'])
    // A new region starts again; choosing a top keeps the guess
    const guessed: StripState = { ...initialStripState, prediction: '=' }
    assert.equal(setStrips(guessed, { strip: 1, top: 1 }).prediction, '=')
    assert.deepEqual(setStrips(guessed, { region: 'cubicAxis' }), { region: 'cubicAxis', tops: [0, 0, 0], prediction: null })
    const solutions = Object.fromEntries(stripChallenges.map((challenge, i) => [challenge.id, { region: STRIP_REGIONS[i], tops: rightTops(STRIP_REGIONS[i]), prediction: '=' }])) as Record<number, StripState>
    checkChallenges(stripChallenges, initialStripState, solutions)
    checkExtras(stripExtra, initialStripState, (state) => setStrips(state, {}))
})
