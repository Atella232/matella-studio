import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { trigonometryBatx1zLabChallengeIds, trigonometryBatx1zLabToolForTopic, trigonometryBatx1zLabTools } from '../src/pages/batx1-zientziak-trigonometria/lab/labTools.ts'
import { initialSixState, setSix, sixChallenges, sixExtra, sixPrediction, sixValue, type SixState } from '../src/pages/batx1-zientziak-trigonometria/lab/six.ts'
import { initialSpinState, setSpin, spinChallenges, spinCount, spinExtra, spinPlain, spinPrediction, spinSolutions, SPIN_VALUES, type SpinState } from '../src/pages/batx1-zientziak-trigonometria/lab/spin.ts'
import { combinedAngle, formulaValue, initialSumState, mistakeValue, ratioOf, setSum, sumChallenges, sumExtra, sumPrediction, type SumState } from '../src/pages/batx1-zientziak-trigonometria/lab/sum.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const
const D = Math.PI / 180

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
            assert.ok(!/\\(?:sen|tg|cosec|cotg)(?![a-zA-Z])/.test(text[language]), text[language])
        }
        assert.ok(!/\\(?:sin|csc|cot)(?![a-zA-Z])/.test(text.es), text.es)
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

test('trigonometria batx1 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(trigonometryBatx1zLabTools.length, 6)
    for (const stage of ['ratios', 'sums', 'double', 'equations', 'functions']) assert.ok(trigonometryBatx1zLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of trigonometryBatx1zLabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    }
    // The «Observe» text of the tools of this unit is plain text, not LaTeX
    for (const tool of trigonometryBatx1zLabTools.filter((item) => ['six', 'sum', 'spin'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
        assert.ok(/[؀-ۿ]/.test(tool.observe.ar) && tool.observe.eu !== tool.observe.es, tool.id)
    }
    assert.equal(new Set(trigonometryBatx1zLabChallengeIds).size, trigonometryBatx1zLabChallengeIds.length)
    // The three tools of this unit use the 103xxx block; the borrowed ones keep their 4. DBH ids
    const own = [...sumChallenges, ...spinChallenges, ...sixChallenges].map((challenge) => challenge.id)
    for (const id of own) assert.ok(id >= 103101 && id <= 103399, `${id}`)
    for (const id of trigonometryBatx1zLabChallengeIds.filter((item) => !own.includes(item))) assert.ok((id >= 71000 && id < 72000) || (id >= 79400 && id < 79500), `${id}`)
    const topics = ['radians-review', 'reciprocal', 'identities', 'sum-formulas', 'difference-tangent', 'known-ratios', 'double-angle', 'half-angle', 'sum-to-product', 'basic-equations', 'quadratic-equations', 'formula-equations', 'trig-graphs', 'transformations', 'periodic-models']
    assert.deepEqual(Object.keys(trigonometryBatx1zLabToolForTopic).sort(), [...topics].sort())
    for (const [topic, tool] of Object.entries(trigonometryBatx1zLabToolForTopic)) assert.ok(trigonometryBatx1zLabTools.some((item) => item.id === tool), `${topic} → ${tool}`)
    for (const tool of trigonometryBatx1zLabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
})

test('trigonometria batx1 z lab: dos ángulos que se suman', () => {
    const at = (patch: Partial<SumState>) => setSum(initialSumState, patch)
    // The formulas give the ratio of the angle α ± β, for every pair of angles of the tool
    for (let alpha = 0; alpha <= 345; alpha += 15) {
        for (let beta = 0; beta <= 345; beta += 15) {
            for (const ratio of ['sin', 'cos'] as const) {
                for (const operation of ['plus', 'minus'] as const) {
                    const state = at({ alpha, beta, ratio, operation })
                    const exact = ratio === 'sin' ? Math.sin(combinedAngle(state) * D) : Math.cos(combinedAngle(state) * D)
                    assert.ok(Math.abs(formulaValue(state) - exact) < 1e-9, `${ratio} ${alpha} ${operation} ${beta}`)
                }
            }
        }
    }
    // The lesson: sen 75° ≈ 0.966 against sen 45° + sen 30° ≈ 1.207
    assert.ok(Math.abs(formulaValue(initialSumState) - (Math.sqrt(6) + Math.sqrt(2)) / 4) < 1e-12)
    assert.ok(Math.abs(mistakeValue(initialSumState) - (Math.SQRT2 / 2 + 0.5)) < 1e-12)
    assert.equal(sumPrediction(initialSumState), '<')
    assert.equal(sumPrediction(at({ alpha: 0, beta: 60 })), '=')
    assert.equal(sumPrediction(at({ alpha: 120, beta: 240 })), '=')
    assert.equal(sumPrediction(at({ alpha: 210, beta: 210 })), '>')
    assert.equal(ratioOf('sin', 180), 0)
    assert.equal(combinedAngle(at({ alpha: 30, beta: 45, operation: 'minus' })), -15)
    // A new angle, ratio or operation forgets the prediction; the same values keep it
    const predicted = { ...initialSumState, prediction: '<' as const }
    assert.equal(setSum(predicted, { beta: 60 }).prediction, null)
    assert.equal(setSum(predicted, { ratio: 'cos' }).prediction, null)
    assert.equal(setSum(predicted, { beta: initialSumState.beta }).prediction, '<')
    assert.equal(at({ alpha: 400 }).alpha, 345)
    assert.equal(at({ alpha: 50 }).alpha, 45)
    checkChallenges(sumChallenges, initialSumState, {
        103101: at({ alpha: 60, beta: 30 }),
        103102: at({ alpha: 120, beta: 240 }),
        103103: at({ alpha: 60, beta: 60, ratio: 'cos', operation: 'minus' }),
        103104: at({ alpha: 60, beta: 30, ratio: 'cos' }),
        103105: at({ alpha: 210, beta: 210 })
    })
    checkExtras(sumExtra, initialSumState, (state) => setSum(state, state))
})

test('trigonometria batx1 z lab: las soluciones dan vueltas', () => {
    const at = (patch: Partial<SpinState>) => setSpin(initialSpinState, patch)
    // Each value's angles have that ratio
    for (const entry of SPIN_VALUES) {
        for (const u of entry.sin) assert.ok(Math.abs(Math.sin(u * D) - entry.value) < 1e-9, `sin ${u}`)
        for (const u of entry.cos) assert.ok(Math.abs(Math.cos(u * D) - entry.value) < 1e-9, `cos ${u}`)
        assert.equal(entry.sin.length, Math.abs(entry.value) > 1 ? 0 : Math.abs(entry.value) === 1 ? 1 : 2)
        assert.equal(entry.cos.length, entry.sin.length)
    }
    // The solutions solve the equation, lie in [0°, 360°) and are all of them (a fine search finds no more)
    for (const ratio of ['sin', 'cos'] as const) {
        for (let n = 1; n <= 3; n++) {
            for (let k = 0; k < SPIN_VALUES.length; k++) {
                const state = at({ ratio, n, k })
                const f = (x: number) => (ratio === 'sin' ? Math.sin(n * x * D) : Math.cos(n * x * D)) - SPIN_VALUES[k].value
                const solutions = spinSolutions(state)
                for (const x of solutions) assert.ok(x >= 0 && x < 360 && Math.abs(f(x)) < 1e-9, `${ratio} ${n} ${k}: ${x}`)
                const found = Array.from({ length: 7200 }, (_, index) => index / 20).filter((x) => Math.abs(f(x)) < 1e-9)
                assert.deepEqual(found, solutions, `${ratio} ${n}x = ${SPIN_VALUES[k].value}`)
                assert.equal(spinCount(state), Math.abs(SPIN_VALUES[k].value) > 1 ? 0 : Math.abs(SPIN_VALUES[k].value) === 1 ? n : 2 * n)
            }
        }
    }
    // The values as the board and the stepper write them
    assert.deepEqual(SPIN_VALUES.map((_, k) => spinPlain(k)), ['−3/2', '−1', '−√3/2', '−√2/2', '−1/2', '0', '1/2', '√2/2', '√3/2', '1', '3/2'])
    // The lessons: sen x = 1/2 gives 30° and 150°; sen 3x = 1/2 gives 6 solutions
    assert.deepEqual(spinSolutions(initialSpinState), [30, 150])
    assert.equal(spinPrediction(initialSpinState), '=')
    assert.deepEqual(spinSolutions(at({ n: 3 })), [10, 50, 130, 170, 250, 290])
    assert.equal(spinPrediction(at({ n: 3 })), '>')
    assert.equal(spinPrediction(at({ k: 10 })), '<')
    const predicted = { ...initialSpinState, prediction: '=' as const }
    assert.equal(setSpin(predicted, { n: 2 }).prediction, null)
    assert.equal(setSpin(predicted, { n: 1 }).prediction, '=')
    assert.equal(at({ n: 5 }).n, 3)
    checkChallenges(spinChallenges, initialSpinState, {
        103201: at({ n: 3 }),
        103202: at({ k: 9 }),
        103203: at({ k: 0 }),
        103204: at({ ratio: 'cos', n: 2, k: 1 }),
        103205: at({ ratio: 'cos', n: 3, k: 9 })
    })
    checkExtras(spinExtra, initialSpinState, (state) => setSpin(state, state))
})

test('trigonometria batx1 z lab: las seis razones en la circunferencia', () => {
    const at = (patch: Partial<SixState>) => setSix(initialSixState, patch)
    for (let angle = 0; angle <= 345; angle += 15) {
        const s = Math.sin(angle * D)
        const c = Math.cos(angle * D)
        const values = { sin: sixValue(angle, 'sin'), cos: sixValue(angle, 'cos'), tan: sixValue(angle, 'tan'), sec: sixValue(angle, 'sec'), csc: sixValue(angle, 'csc'), cot: sixValue(angle, 'cot') }
        assert.ok(Math.abs(values.sin! - s) < 1e-12 && Math.abs(values.cos! - c) < 1e-12)
        if (angle % 180 === 90) assert.ok(values.tan === null && values.sec === null && values.cot === 0, `${angle}`)
        else assert.ok(Math.abs(values.tan! - s / c) < 1e-9 && Math.abs(values.sec! * c - 1) < 1e-9)
        if (angle % 180 === 0) assert.ok(values.csc === null && values.cot === null, `${angle}`)
        else assert.ok(Math.abs(values.csc! * s - 1) < 1e-9 && Math.abs(values.cot! * s - c) < 1e-9)
        // Each reciprocal has the sign of its ratio
        for (const [ratio, base] of [['sec', 'cos'], ['csc', 'sin'], ['cot', 'tan']] as const) {
            const value = values[ratio]
            if (value !== null && value !== 0) assert.equal(Math.sign(value), Math.sign(values[base]!), `${ratio} ${angle}`)
        }
        // 1 + tg² = sec² and 1 + cotg² = cosec²
        if (values.tan !== null) assert.ok(Math.abs(1 + values.tan ** 2 - values.sec! ** 2) < 1e-9)
        if (values.cot !== null && values.csc !== null) assert.ok(Math.abs(1 + values.cot ** 2 - values.csc ** 2) < 1e-9)
    }
    assert.equal(sixPrediction(initialSixState), '>')
    assert.equal(sixPrediction(at({ angle: 120 })), '<')
    assert.equal(sixPrediction(at({ angle: 90 })), '=')
    assert.equal(sixPrediction(at({ angle: 90, ratio: 'cot' })), '=')
    const predicted = { ...initialSixState, prediction: '>' as const }
    assert.equal(setSix(predicted, { ratio: 'cot' }).prediction, null)
    assert.equal(setSix(predicted, { angle: 30 }).prediction, '>')
    assert.equal(at({ angle: 50 }).angle, 45)
    checkChallenges(sixChallenges, initialSixState, {
        103301: at({ angle: 60 }),
        103302: at({ angle: 180, ratio: 'csc' }),
        103303: at({ angle: 135, ratio: 'cot' }),
        103304: at({ angle: 240, ratio: 'tan' }),
        103305: at({ angle: 45 })
    })
    checkExtras(sixExtra, initialSixState, (state) => setSix(state, state))
})
