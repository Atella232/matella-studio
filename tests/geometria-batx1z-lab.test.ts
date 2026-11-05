import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { bachGeometryLabChallengeIds, bachGeometryLabToolForTopic, bachGeometryLabTools } from '../src/pages/batx1-zientziak-geometria/lab/labTools.ts'
import { initialLineAngleState, isRight, isSameLine, lineAngleChallenges, lineAngleExtra, lineAngleOf, lineAnglePrediction, setLineAngle, throughOriginLatex, type LineAngleState } from '../src/pages/batx1-zientziak-geometria/lab/lineAngle.ts'
import { aboveBy, explicitLatex, heightAt, initialPencilState, interceptOf, onPencil, pencilChallenges, pencilExtra, pencilPrediction, PENCIL_SLOPES, pointSlopeLatex, setPencil, slopeIndex, type PencilState } from '../src/pages/batx1-zientziak-geometria/lab/pencil.ts'
import { distanceOf, footOf, generalLatex, initialShortestState, isFoot, pointQ, pqSquare, setShortest, SHORT_LINES, shortestChallenges, shortestExtra, shortestPrediction, stepRange, valueAt, type ShortestState } from '../src/pages/batx1-zientziak-geometria/lab/shortest.ts'

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

test('geometria batx1 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(bachGeometryLabTools.length, 8)
    for (const stage of ['points', 'lines', 'positions', 'distances', 'triangles']) assert.ok(bachGeometryLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of bachGeometryLabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    }
    // The «Observe» text of the tools of this unit is plain text, not LaTeX
    for (const tool of bachGeometryLabTools.filter((item) => ['pencil', 'line-angle', 'shortest'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
    }
    assert.equal(new Set(bachGeometryLabChallengeIds).size, bachGeometryLabChallengeIds.length)
    // The three tools of this unit use the 106xxx block; the borrowed ones keep their ids
    const own = [...pencilChallenges, ...lineAngleChallenges, ...shortestChallenges].map((challenge) => challenge.id)
    for (const id of own) assert.ok(id >= 106101 && id <= 106399, `${id}`)
    const topics = ['midpoint-symmetric', 'collinear', 'divide-segment', 'vector-parametric', 'general-normal', 'explicit-slope', 'pencil', 'parallel-perpendicular', 'relative-position', 'line-angle', 'point-line', 'parallel-lines', 'reflection', 'triangle-points', 'triangle-area']
    for (const topic of topics) assert.ok(bachGeometryLabToolForTopic[topic], topic)
    for (const [topic, tool] of Object.entries(bachGeometryLabToolForTopic)) {
        assert.ok(topics.includes(topic), topic)
        assert.ok(bachGeometryLabTools.some((item) => item.id === tool), `${topic} → ${tool}`)
    }
    for (const tool of bachGeometryLabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
})

test('geometria batx1 z lab: el haz de rectas', () => {
    const at = (patch: Partial<PencilState>) => setPencil(initialPencilState, patch)
    const start = at({})
    assert.equal(aboveBy(start, start.q), 1)
    assert.equal(pencilPrediction(start), '>')
    assert.equal(heightAt(start, 3).numerator, 3)
    assert.equal(pointSlopeLatex(start), 'y-1=(x-1)')
    assert.equal(explicitLatex(start), 'y=x')
    const down = at({ p: [0, 1], slope: slopeIndex(-2) })
    assert.ok(onPencil(down, [2, -3]))
    assert.equal(explicitLatex(down), 'y=-2x+1')
    assert.equal(pointSlopeLatex(down), 'y-1=-2x')
    const half = at({ p: [-1, 2], slope: slopeIndex(1, 2) })
    assert.equal(pointSlopeLatex(half), 'y-2=\\frac{1}{2}(x+1)')
    assert.deepEqual([interceptOf(half).numerator, interceptOf(half).denominator], [5, 2])
    assert.equal(explicitLatex(at({ p: [2, 3], slope: slopeIndex(0) })), 'y=3')
    const below = at({ q: [3, 2] })
    assert.equal(pencilPrediction(below), '<')
    const on = at({ p: [1, 1], slope: slopeIndex(-1, 2), q: [5, -1] })
    assert.equal(pencilPrediction(on), '=')
    assert.deepEqual(at({ p: [9, -9] }).p, [3, -3])
    assert.equal(at({ slope: 99 }).slope, PENCIL_SLOPES.length - 1)
    const predicted = { ...initialPencilState, prediction: '>' as const }
    assert.equal(setPencil(predicted, { slope: 2 }).prediction, null)
    assert.equal(setPencil(predicted, { q: initialPencilState.q }).prediction, '>')
    checkChallenges(pencilChallenges, initialPencilState, {
        106101: down,
        106102: half,
        106103: at({ p: [2, 1], slope: slopeIndex(-1, 3) }),
        106104: at({ p: [2, -1], slope: slopeIndex(-2) }),
        106105: on
    })
    checkExtras(pencilExtra, initialPencilState, (state) => setPencil(state, state))
})

test('geometria batx1 z lab: el ángulo de dos rectas', () => {
    const at = (patch: Partial<LineAngleState>) => setLineAngle(initialLineAngleState, patch)
    const start = at({})
    assert.equal(lineAnglePrediction(start), '>')
    assert.ok(Math.abs((lineAngleOf(start) ?? 0) - 53.130102) < 1e-5)
    const right = at({ r: [2, 1], s: [-1, 2] })
    assert.ok(isRight(right))
    assert.ok(Math.abs((lineAngleOf(right) ?? 0) - 90) < 1e-9)
    assert.equal(lineAnglePrediction(at({ r: [1, 0], s: [1, 1] })), '=')
    assert.equal(lineAnglePrediction(at({ r: [1, 2], s: [-1, 3] })), '=')
    assert.equal(lineAnglePrediction(at({ r: [1, 0], s: [3, 1] })), '<')
    // The angle of two lines is the acute one, whatever way the vectors point
    assert.ok(Math.abs((lineAngleOf(at({ r: [1, 0], s: [-3, 1] })) ?? 0) - (lineAngleOf(at({ r: [1, 0], s: [3, 1] })) ?? 0)) < 1e-9)
    const same = at({ r: [1, 2], s: [2, 4] })
    assert.ok(isSameLine(same))
    assert.ok(Math.abs(lineAngleOf(same) ?? 1) < 1e-6)
    assert.equal(lineAngleOf(at({ s: [0, 0] })), null)
    assert.equal(lineAnglePrediction(at({ r: [0, 0] })), null)
    assert.equal(throughOriginLatex([1, 2]), '2x-y=0')
    assert.equal(throughOriginLatex([1, 0]), 'y=0')
    assert.equal(throughOriginLatex([0, 3]), 'x=0')
    assert.equal(throughOriginLatex([2, 4]), '2x-y=0')
    assert.equal(throughOriginLatex([-1, 2]), '2x+y=0')
    assert.equal(throughOriginLatex([3, -1]), 'x+3y=0')
    const predicted = { ...initialLineAngleState, prediction: '>' as const }
    assert.equal(setLineAngle(predicted, { s: [0, 2] }).prediction, null)
    assert.equal(setLineAngle(predicted, { r: initialLineAngleState.r }).prediction, '>')
    assert.deepEqual(at({ r: [9, -9] }).r, [4, -4])
    checkChallenges(lineAngleChallenges, initialLineAngleState, {
        106201: right,
        106202: at({ r: [1, 0], s: [1, 1] }),
        106203: at({ r: [1, 2], s: [-1, 3] }),
        106204: same,
        106205: at({ r: [1, 3], s: [-1, 2] })
    })
    checkExtras(lineAngleExtra, initialLineAngleState, (state) => setLineAngle(state, state))
})

test('geometria batx1 z lab: la distancia más corta', () => {
    const at = (patch: Partial<ShortestState>) => setShortest(initialShortestState, patch)
    const start = at({})
    assert.deepEqual(pointQ(start), [0, 1])
    assert.equal(valueAt(start), -1)
    assert.equal(pqSquare(start), 13)
    assert.equal(shortestPrediction(start), '<')
    assert.ok(Math.abs(distanceOf(start) - Math.SQRT1_2) < 1e-12)
    assert.deepEqual(stepRange(0), { min: -6, max: 5 })
    assert.deepEqual(stepRange(1), { min: -1, max: 1 })
    assert.deepEqual(stepRange(2), { min: -3, max: 3 })
    assert.deepEqual(stepRange(3), { min: -2, max: 4 })
    // Every whole step of every line stays on it
    for (const [index, line] of SHORT_LINES.entries()) {
        const range = stepRange(index)
        for (let t = range.min; t <= range.max; t += 1) {
            const [x, y] = pointQ({ line: index, t })
            assert.equal(line.A * x + line.B * y + line.C, 0)
        }
    }
    const foot = at({ p: [3, 0], t: 1 })
    assert.deepEqual(footOf(foot), [1, 2])
    assert.ok(isFoot(foot))
    assert.equal(shortestPrediction(foot), '=')
    const steep = at({ line: 3, p: [0, 3], t: 2 })
    assert.deepEqual(pointQ(steep), [2, 2])
    assert.ok(isFoot(steep))
    // Q never beats the foot: the prediction is never «more»
    for (let x = -5; x <= 5; x += 1) for (let t = -6; t <= 5; t += 1) assert.notEqual(shortestPrediction(at({ p: [x, 2 - x], t })), '>')
    assert.equal(generalLatex(SHORT_LINES[0]), 'x-y+1=0')
    assert.equal(generalLatex(SHORT_LINES[1]), '3x+4y-12=0')
    assert.equal(generalLatex(SHORT_LINES[3]), '2x-y-2=0')
    assert.equal(at({ line: 1, t: 5 }).t, 1)
    assert.equal(setShortest(at({ t: 5 }), { line: 1 }).t, 1)
    assert.deepEqual(at({ p: [8, -8] }).p, [5, -5])
    const predicted = { ...initialShortestState, prediction: '<' as const }
    assert.equal(setShortest(predicted, { t: 2 }).prediction, null)
    assert.equal(setShortest(predicted, { line: 0 }).prediction, '<')
    checkChallenges(shortestChallenges, initialShortestState, {
        106301: foot,
        106302: at({ line: 1, p: [2, -1] }),
        106303: at({ line: 2, p: [2, 1] }),
        106304: steep,
        106305: at({ line: 1, p: [-3, -1] })
    })
    checkExtras(shortestExtra, initialShortestState, (state) => setShortest(state, state))
})
