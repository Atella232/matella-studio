import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { buildChallenges, buildExtra, buildShape, buildVertices, chooseConstraint, initialBuildState, setConstraint, type BuildState } from '../src/pages/batx2-gizarte-programazioa/lab/buildRegion.ts'
import { programazioaLabChallengeIds, programazioaLabToolForTopic, programazioaLabTools } from '../src/pages/batx2-gizarte-programazioa/lab/labTools.ts'
import { initialLevelState, levelChallenges, levelExtra, levelOptimum, LEVEL_SCENARIOS, loadLevel, setK, type LevelState } from '../src/pages/batx2-gizarte-programazioa/lab/levelLine.ts'
import { programazioaLessonTexts } from '../src/pages/batx2-gizarte-programazioa/lessonTexts.ts'
import { optimum, vertices, withSigns } from '../src/pages/batx2-gizarte-programazioa/lp.ts'

const texts = (text: LocalizedText) => [text.eu, text.es, text.en, text.ar]
function checkText(text: LocalizedText) {
    for (const value of texts(text)) for (const [, formula] of value.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true, strict: 'error' })
    assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
    assert.ok(/[؀-ۿ]/.test(text.ar) && !/[؀-ۿ]/.test(text.es + text.eu + text.en), text.ar)
    assert.ok(!/\d\s*€/.test(text.en), text.en)
}

const lessons = ['half-plane-regions', 'region-cases', 'constraints', 'vertices', 'integer-points', 'level-lines', 'vertex-method', 'solution-types', 'max-profit', 'min-cost', 'full-problem']

test('programazioa batx2 g lab: tools, ids and lessons', () => {
    assert.deepEqual(programazioaLabTools.map((tool) => tool.id), ['half-plane', 'build-region', 'level-line', 'shopping'])
    const own = [...buildChallenges, ...levelChallenges].map((challenge) => challenge.id)
    assert.ok(own.every((id) => id >= 144101 && id <= 144399), 'own ids in the block')
    assert.equal(new Set(programazioaLabChallengeIds).size, programazioaLabChallengeIds.length)
    for (const tool of programazioaLabTools) assert.ok(lessons.includes(tool.lessonTopic), tool.id)
    for (const [topic, tool] of Object.entries(programazioaLabToolForTopic)) {
        assert.ok(lessons.includes(topic), topic)
        assert.ok(programazioaLabTools.some((item) => item.id === tool), `${topic}: ${tool}`)
    }
    assert.ok(Object.keys(programazioaLessonTexts).every((topic) => programazioaLabToolForTopic[topic]))
    for (const tool of programazioaLabTools.filter((item) => ['build-region', 'level-line'].includes(item.id))) for (const text of [tool.title, tool.observe]) checkText(text)
})

test('programazioa batx2 g lab: the vertices and the optimum of lp.ts', () => {
    const L = (a: number, b: number, c: number, sense: '≤' | '≥' = '≤') => ({ a, b, c, sense })
    assert.deepEqual(vertices(withSigns([L(1, 1, 6), L(1, 2, 8)])), [[0, 0], [6, 0], [4, 2], [0, 4]])
    assert.deepEqual(optimum(withSigns([L(1, 1, 6), L(1, 2, 8)]), { a: 3, b: 2 }, 'max'), { kind: 'unique', value: 18, at: [[6, 0]] })
    assert.equal(optimum(withSigns([L(1, 1, 5), L(1, 0, 4), L(0, 1, 3)]), { a: 1, b: 1 }, 'max').kind, 'multiple')
    assert.equal(optimum(withSigns([L(1, 1, 2, '≥')]), { a: 1, b: 1 }, 'max').kind, 'unbounded')
    assert.equal(optimum(withSigns([L(1, 1, 2, '≥')]), { a: 1, b: 1 }, 'min').kind, 'multiple')
    assert.equal(optimum(withSigns([L(1, 1, 2), L(1, 0, 3, '≥')]), { a: 1, b: 1 }, 'max').kind, 'empty')
})

test('programazioa batx2 g lab: the answer of each level-line scenario is where the optimum is', () => {
    for (const [index, scenario] of LEVEL_SCENARIOS.entries()) {
        const best = levelOptimum(loadLevel(index))
        assert.ok(best.value !== null && best.value <= scenario.kMax, `scenario ${index}`)
        for (const text of Object.values(scenario.choices)) checkText(text)
        checkText(scenario.name)
    }
    assert.equal(levelOptimum(loadLevel(2)).kind, 'multiple')
    assert.equal(LEVEL_SCENARIOS[2].answer, '>')
})

test('programazioa batx2 g lab: every level-line challenge is solvable and none starts solved', () => {
    const predicted = (state: LevelState): LevelState => ({ ...state, prediction: '<' })
    const solutions: LevelState[] = [predicted(initialLevelState), setK(loadLevel(0), 18), setK(loadLevel(1), 13), predicted(setK(loadLevel(2), 6)), setK(loadLevel(0), 16)]
    levelChallenges.forEach((challenge, index) => {
        assert.ok(!challenge.isSolved(initialLevelState), `${challenge.id} starts solved`)
        assert.ok(challenge.isSolved(solutions[index]), `${challenge.id} not solved`)
        checkText(challenge.prompt)
        checkText(challenge.hint)
    })
    for (let seed = 1; seed <= 150; seed++) {
        const challenge = levelExtra(createRandom(seed * 7919))
        assert.ok(!challenge.isSolved(initialLevelState))
        assert.ok(challenge.solution && challenge.isSolved(challenge.solution), `seed ${seed}`)
        checkText(challenge.prompt)
    }
})

test('programazioa batx2 g lab: every build-region challenge is solvable and none starts solved', () => {
    const third = (patch: Parameters<typeof setConstraint>[1]) => setConstraint(chooseConstraint(initialBuildState, 2), patch)
    const solutions: BuildState[] = [
        setConstraint(chooseConstraint(initialBuildState, 1), { a: 0, b: 0 }),
        third({ a: 1, b: 0, c: 5 }),
        third({ a: 1, b: 1, c: 10, sense: '≥' }),
        setConstraint(setConstraint(initialBuildState, { sense: '≥' }), {}),
        setConstraint(setConstraint(initialBuildState, { c: 5 }), {})
    ]
    // (3, 2): x + y = 5 and x + 2y = 7
    solutions[4] = setConstraint(chooseConstraint(solutions[4], 1), { c: 7 })
    solutions[3] = setConstraint(chooseConstraint(solutions[3], 1), { a: 0, b: 0 })
    assert.equal(buildShape(initialBuildState), 'closed')
    assert.equal(buildVertices(initialBuildState).length, 4)
    buildChallenges.forEach((challenge, index) => {
        assert.ok(!challenge.isSolved(initialBuildState), `${challenge.id} starts solved`)
        assert.ok(challenge.isSolved(solutions[index]), `${challenge.id} not solved`)
        checkText(challenge.prompt)
        checkText(challenge.hint)
    })
    for (let seed = 1; seed <= 150; seed++) {
        const challenge = buildExtra(createRandom(seed * 7919))
        assert.ok(!challenge.isSolved(initialBuildState))
        assert.ok(challenge.solution && challenge.isSolved(challenge.solution), `seed ${seed}`)
        checkText(challenge.prompt)
    }
})
