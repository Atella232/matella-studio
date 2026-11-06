import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { pairStats } from '../src/pages/batx1-zientziak-bidimentsionala/bivariate.ts'
import { expectedCell, independenceChallenges, independenceExtra, independencePrediction, independent, initialIndependenceState, setCell, type IndependenceState } from '../src/pages/batx1-zientziak-bidimentsionala/lab/independenceTable.ts'
import { bivarLabChallengeIds, bivarLabToolForTopic, bivarLabTools } from '../src/pages/batx1-zientziak-bidimentsionala/lab/labTools.ts'
import { initialQuadrantState, movePoint, productSum, quadrantChallenges, quadrantExtra, quadrantOf, quadrantPrediction, quadrantStats, type QuadrantState } from '../src/pages/batx1-zientziak-bidimentsionala/lab/quadrantBoard.ts'
import { initialScissorsState, scissorsChallenges, scissorsCloud, scissorsExtra, scissorsPrediction, scissorsSlopes, setScissorsR, type ScissorsState } from '../src/pages/batx1-zientziak-bidimentsionala/lab/scissors.ts'
import { bivarLessonChecks } from '../src/pages/batx1-zientziak-bidimentsionala/lessonChecks.ts'
import { setPrediction } from '../src/pages/dbh3-segidak/lab/prediction.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const
const near = (a: number, b: number) => Math.abs(a - b) < 1e-9

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        // No colon inside a formula (MathText draws it as ÷)
        for (const language of languages) assert.ok(![...text[language].matchAll(/\$([^$]+)\$/g)].some(([, formula]) => formula.includes(':')), text[language])
        // No Basque suffix glued to a number or to a formula
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|era|tik|z|ei|en|k|i)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/§(?:ri|ren|rekin|z|ra|tik|ei)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '§')), text.eu)
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
        assert.deepEqual(setter(challenge.solution), challenge.solution, `seed ${seed}: unreachable ${challenge.prompt.es}`)
        assert.ok(!challenge.isSolved(initial), `seed ${seed} starts solved`)
        checkTexts([challenge.prompt, challenge.hint])
        prompts.add(challenge.prompt.es)
    }
    assert.ok(prompts.size >= 6, `only ${prompts.size} different challenges`)
}

test('bidimentsionala batx1 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(bivarLabTools.length, 5)
    for (const stage of ['tables', 'cloud', 'parameters', 'regression']) assert.ok(bivarLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of bivarLabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    }
    // The «Observe» text of the tools of this unit is plain text, without LaTeX and without Basque suffixes glued to numbers
    for (const tool of bivarLabTools.filter((item) => ['independence', 'quadrants', 'scissors'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
        assert.ok(!/\d[a-zñ]/.test(tool.observe.eu), tool.observe.eu)
    }
    assert.equal(new Set(bivarLabChallengeIds).size, bivarLabChallengeIds.length)
    // The three tools of this unit use the 1151xx–1153xx block; the borrowed ones keep their ids
    const own = [...quadrantChallenges, ...scissorsChallenges, ...independenceChallenges].map((challenge) => challenge.id)
    for (const id of own) assert.ok(id >= 115101 && id <= 115399, `${id}`)
    const topics = Object.keys(bivarLessonChecks)
    for (const [topic, tool] of Object.entries(bivarLabToolForTopic)) {
        assert.ok(topics.includes(topic), topic)
        assert.ok(bivarLabTools.some((item) => item.id === tool), `${topic} → ${tool}`)
    }
    for (const tool of bivarLabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
})

test('bidimentsionala batx1 z lab: los cuatro cuadrantes', () => {
    // The lesson's points: centre (3, 4), products adding up to 12, σxy = 2,4
    assert.equal(productSum(initialQuadrantState), 12)
    assert.ok(near(quadrantStats(initialQuadrantState).cxy, 2.4))
    assert.equal(quadrantPrediction(initialQuadrantState), '>')
    assert.deepEqual(initialQuadrantState.points.map((_, index) => quadrantOf(initialQuadrantState, index)), [3, 3, 0, 1, 1])
    // Moving a point clamps it to the grid and forgets the prediction
    const predicted = setPrediction(initialQuadrantState, '>')
    const moved = movePoint(predicted, 0, [9.6, -2])
    assert.deepEqual(moved.points[0], [8, 0])
    assert.equal(moved.prediction, null)
    assert.equal(movePoint(predicted, 0, [1.2, 2.3]).prediction, '>')
    const set = (points: QuadrantState['points']): QuadrantState => ({ points, selected: 0, prediction: null })
    checkChallenges(quadrantChallenges, initialQuadrantState, {
        115101: set([[1, 5], [2, 4], [3, 3], [4, 2], [5, 1]]),
        115102: set([[1, 1], [1, 5], [5, 1], [5, 5], [3, 3]]),
        115103: set([[0, 2], [2, 3], [4, 4], [6, 5], [8, 6]])
    })
    checkExtras(quadrantExtra, initialQuadrantState, (state) => ({ ...state.points.reduce((current, point, index) => movePoint(current, index, point), state), selected: state.selected }))
})

test('bidimentsionala batx1 z lab: las tijeras', () => {
    // The cloud has x̄ = 5, ȳ = 10, σx = 2, σy = 4 and exactly the r chosen
    for (const r10 of [-10, -7, -3, 0, 4, 8, 10]) {
        const stats = pairStats(scissorsCloud(r10 / 10))
        assert.ok(near(stats.mx, 5) && near(stats.my, 10) && near(stats.vx, 4) && near(stats.vy, 16), `${r10}`)
        assert.ok(Math.abs(stats.r - r10 / 10) < 1e-9, `r = ${stats.r} for ${r10}`)
        const { myx, mxy } = scissorsSlopes(r10 / 10)
        assert.ok(near(myx, stats.myx) && near(mxy, stats.mxy) && near(myx * mxy, (r10 / 10) ** 2))
    }
    // r = 0,5 against 0,9: more open; the same |r| gives the same angle; a bigger one closes them
    assert.equal(scissorsPrediction(initialScissorsState), '>')
    assert.equal(scissorsPrediction({ ...initialScissorsState, r10: -9 }), '=')
    assert.equal(scissorsPrediction({ ...initialScissorsState, r10: 10 }), '<')
    // After the lines are seen, they become the reference of the next r
    const seen = setPrediction(initialScissorsState, '>')
    const next = setScissorsR(seen, 7)
    assert.deepEqual(next, { r10: 7, reference10: 5, prediction: null })
    assert.equal(setScissorsR(initialScissorsState, 6).reference10, 9)
    assert.equal(setScissorsR(initialScissorsState, 14).r10, 10)
    const at = (r10: number): ScissorsState => ({ r10, reference10: 9, prediction: null })
    checkChallenges(scissorsChallenges, initialScissorsState, { 115201: at(-10), 115202: at(0), 115203: at(-8) })
    checkExtras(scissorsExtra, initialScissorsState, (state) => ({ ...state, r10: setScissorsR({ ...state, r10: 99 }, state.r10).r10 }))
})

test('bidimentsionala batx1 z lab: ¿independientes?', () => {
    // 12 of 20 girls and 9 of 20 boys: not independent, more «yes» among the girls; independence would ask for 10,5
    assert.ok(!independent(initialIndependenceState))
    assert.equal(independencePrediction(initialIndependenceState), '>')
    assert.ok(near(expectedCell(initialIndependenceState), 10.5))
    const changed = setCell(setPrediction(initialIndependenceState, '>'), 1, 0, 25)
    assert.equal(changed.cells[1][0], 20)
    assert.equal(changed.prediction, null)
    const table = (cells: IndependenceState['cells']): IndependenceState => ({ cells, prediction: null })
    assert.equal(independencePrediction(table([[6, 4], [12, 8]])), '=')
    // An empty row is never independent
    assert.ok(!independent(table([[0, 0], [5, 5]])))
    checkChallenges(independenceChallenges, initialIndependenceState, {
        115301: table([[12, 8], [6, 4]]),
        115302: table([[10, 20], [10, 20]]),
        115303: table([[2, 8], [4, 6]])
    })
    checkExtras(independenceExtra, initialIndependenceState, (state) => {
        let current = { ...state, cells: [[0, 0], [0, 0]] } as IndependenceState
        for (const row of [0, 1] as const) for (const column of [0, 1] as const) current = setCell(current, row, column, state.cells[row][column])
        return current
    })
})
