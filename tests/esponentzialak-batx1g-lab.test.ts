import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { socExpLabChallengeIds, socExpLabToolForTopic, socExpLabTools } from '../src/pages/batx1-gizarte-esponentzialak/lab/labTools.ts'
import { expValue, initialLineExpState, lineExpChallenges, lineExpExtra, lineExpPrediction, lineValue, setLineExp, type LineExpState } from '../src/pages/batx1-gizarte-esponentzialak/lab/lineExp.ts'
import { halfDay, initialLogisticState, logisticAt, logisticChallenges, logisticExtra, logisticPrediction, setLogistic, type LogisticState } from '../src/pages/batx1-gizarte-esponentzialak/lab/logistic.ts'

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
        // The solution is a state the controls can reach
        assert.deepEqual(setter(challenge.solution), challenge.solution, `seed ${seed}: unreachable ${challenge.prompt.es}`)
        assert.ok(!challenge.isSolved(initial), `seed ${seed} starts solved`)
        checkTexts([challenge.prompt, challenge.hint])
        prompts.add(challenge.prompt.es)
    }
    assert.ok(prompts.size >= 6, `only ${prompts.size} different challenges`)
}

test('esponentzialak batx1 g lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(socExpLabTools.length, 9)
    const stages = ['transforms', 'composition', 'exponential', 'logarithmic', 'models']
    for (const stage of stages) assert.ok(socExpLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of socExpLabTools) for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    for (const tool of socExpLabTools.filter((item) => ['line-exp', 'logistic'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
        assert.ok(/[؀-ۿ]/.test(tool.observe.ar) && /[؀-ۿ]/.test(tool.title.ar), tool.id)
    }
    assert.equal(new Set(socExpLabChallengeIds).size, socExpLabChallengeIds.length)
    for (const id of [...lineExpChallenges, ...logisticChallenges].map((challenge) => challenge.id)) assert.ok(id >= 134101 && id <= 134399, `${id}`)
    const topics = ['shifts', 'reflections', 'vertex-form', 'composition', 'inverse', 'inverse-graph', 'exp-graph', 'percent-growth', 'two-points', 'log-inverse', 'log-graph', 'solve-time', 'doubling', 'logistic', 'log-model']
    for (const [topic, tool] of Object.entries(socExpLabToolForTopic)) {
        assert.ok(topics.includes(topic), topic)
        assert.ok(socExpLabTools.some((item) => item.id === tool), `${topic} → ${tool}`)
    }
    for (const tool of socExpLabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
})

test('esponentzialak batx1 g lab: recta o exponencial', () => {
    const at = (patch: Partial<LineExpState>) => setLineExp(initialLineExpState, patch)
    // Both go through the data
    for (const state of [at({ a: 2, b: 6 }), at({ a: 8, b: 3 })]) {
        assert.equal(lineValue(state, 0), state.a)
        assert.ok(Math.abs(expValue(state, 1) - state.b) < 1e-9)
    }
    assert.equal(lineExpPrediction(at({ target: 0 })), '=')
    assert.equal(lineExpPrediction(at({ target: 1 })), '=')
    // Outside the data the exponential always wins, growing or falling
    for (const state of [at({ a: 2, b: 6 }), at({ a: 8, b: 3 })]) for (let target = 2; target <= 6; target += 1) assert.equal(lineExpPrediction({ ...state, target }), '>')
    checkChallenges(lineExpChallenges, initialLineExpState, {
        134101: at({ a: 4, b: 4 }),
        134102: at({ a: 1, b: 3 }),
        134103: at({ a: 1, b: 2 }),
        134104: at({ a: 6, b: 4 }),
        134105: at({ a: 4, b: 6 })
    })
    checkExtras(lineExpExtra, initialLineExpState, (state) => setLineExp(state, state))
})

test('esponentzialak batx1 g lab: la curva en S', () => {
    const at = (patch: Partial<LogisticState>) => setLogistic(initialLogisticState, patch)
    const state = at({ M: 800, b: 8, rate: 1 })
    assert.equal(logisticAt(state, 0), 800 / 9)
    assert.ok(Math.abs(logisticAt(state, 3) - 400) < 1e-9)
    assert.ok(Math.abs(halfDay(state) - 3) < 1e-9)
    assert.equal(logisticPrediction({ ...state, x: 3 }), '=')
    assert.equal(logisticPrediction({ ...state, x: 2 }), '<')
    assert.equal(logisticPrediction({ ...state, x: 5 }), '>')
    // It grows and stays under the ceiling
    for (let x = 0; x < 12; x += 1) assert.ok(logisticAt(state, x + 1) > logisticAt(state, x) && logisticAt(state, x + 1) < 800)
    checkChallenges(logisticChallenges, initialLogisticState, {
        134201: at({ M: 500, b: 9 }),
        134202: at({ rate: 1, b: 8 }),
        134203: at({ M: 1000, b: 24, rate: 1, x: 8 }),
        134204: at({ M: 600, b: 99 }),
        134205: at({ b: 9, rate: 2 })
    })
    checkExtras(logisticExtra, initialLogisticState, (current) => setLogistic(current, current))
})
