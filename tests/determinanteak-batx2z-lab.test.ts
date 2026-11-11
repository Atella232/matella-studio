import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { matrizeakLabTools } from '../src/pages/batx2-zientziak-matrizeak/lab/labTools.ts'
import { rankChallenges } from '../src/pages/batx2-zientziak-matrizeak/lab/rankSlider.ts'
import { det } from '../src/pages/batx2-zientziak-determinanteak/determinant.ts'
import {
    chooseDetFamily, currentDetValue, DET_FAMILIES, DET_LIMITS, detAt, detCurve, detSliderChallenges, detSliderExtra, detSliderPrediction, detValues, initialDetSliderState, markDetSeen,
    rootsIn, setK, traceAll, type DetSliderState
} from '../src/pages/batx2-zientziak-determinanteak/lab/detSlider.ts'
import { determinanteakLabChallengeIds, determinanteakLabToolForTopic, determinanteakLabTools } from '../src/pages/batx2-zientziak-determinanteak/lab/labTools.ts'
import {
    ARROW_LIMITS, areaDet, chooseArrow, columnsMatrix, initialParallelogramState, nearestArrow, pairsWith, parallelogramChallenges, parallelogramDet, parallelogramExtra, parallelogramPrediction,
    setTip, slid, type ParallelogramState
} from '../src/pages/batx2-zientziak-determinanteak/lab/parallelogram.ts'
import {
    applyOperation, canApply, chooseOperation, currentDet, detOf, initialPropertyState, isTriangular, loadPreset, operationEffect, operationLatex, previewMatrix, PROPERTY_CAP, PROPERTY_PRESETS,
    propertyChallenges, propertyExtra, propertyPrediction, runOperations, setK as setAddK, setScale, setSource, setTarget, TRIANGLE_ROUTES, type PropertyState
} from '../src/pages/batx2-zientziak-determinanteak/lab/propertyMachine.ts'
import {
    allLines, chooseLine, chooseSignPreset, cofactorsNeeded, currentCount, expansion, fewestCofactors, initialSignBoardState, lineKey, loadSignPreset, markTried, presetDet, SIGN_PRESETS,
    signBoardChallenges, signBoardExtra, signBoardPrediction, type SignBoardState
} from '../src/pages/batx2-zientziak-determinanteak/lab/signBoard.ts'
import { determinanteakLessonTexts } from '../src/pages/batx2-zientziak-determinanteak/lessonTexts.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const
const number = (value: { numerator: number; denominator: number }) => value.numerator / value.denominator

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), text[language])
        // No Basque suffix glued to a number or to a formula
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
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

/** The endless challenges: well formed, solvable by their own solution (which the tool can reach), never solved at the start */
function checkExtras<State>(maker: LabChallengeMaker<State>, initial: State, reachable: (state: State) => boolean) {
    const prompts = new Set<string>()
    for (let seed = 1; seed <= 150; seed += 1) {
        const challenge = maker(createRandom(seed * 7919 + 3))
        assert.ok(challenge.isSolved(challenge.solution), `seed ${seed}: ${challenge.prompt.es}`)
        assert.ok(reachable(challenge.solution), `seed ${seed}: unreachable ${challenge.prompt.es}`)
        assert.ok(!challenge.isSolved(initial), `seed ${seed} starts solved`)
        checkTexts([challenge.prompt, challenge.hint])
        prompts.add(challenge.prompt.es)
    }
    assert.ok(prompts.size >= 6, `only ${prompts.size} different challenges`)
}

test('determinanteak batx2 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(determinanteakLabTools.length, 5)
    assert.equal(determinanteakLabTools.filter((tool) => tool.id !== 'rank-slider').length, 4, 'four tools of its own')
    for (const tool of determinanteakLabTools) {
        assert.ok(tool.lessonTopic in determinanteakLessonTexts, tool.id)
        checkTexts([tool.title, tool.observe])
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
    }
    for (const [topic, tool] of Object.entries(determinanteakLabToolForTopic)) {
        assert.ok(topic in determinanteakLessonTexts, topic)
        assert.ok(determinanteakLabTools.some((item) => item.id === tool), `${topic}: ${tool}`)
    }
    assert.deepEqual(Object.keys(determinanteakLabToolForTopic).sort(), Object.keys(determinanteakLessonTexts).sort(), 'every lesson has a tool')
    // M1, the rank slider of Matrizeak, comes back unchanged with its own ids
    const borrowed = matrizeakLabTools.find((tool) => tool.id === 'rank-slider')!
    const mine = determinanteakLabTools.find((tool) => tool.id === 'rank-slider')!
    assert.deepEqual(mine.title, borrowed.title)
    const own = determinanteakLabChallengeIds.filter((id) => !rankChallenges.some((challenge) => challenge.id === id))
    assert.equal(own.length, 20)
    assert.ok(own.every((id) => id >= 117101 && id <= 117399))
    assert.deepEqual(determinanteakLabChallengeIds.filter((id) => !own.includes(id)), rankChallenges.map((challenge) => challenge.id))
    assert.equal(new Set(determinanteakLabChallengeIds).size, determinanteakLabChallengeIds.length)
})

/* ---------- L1. The parallelogram ---------- */

test('determinanteak batx2 z lab: the parallelogram is the determinant of the two columns, with its sign', () => {
    const start = initialParallelogramState
    assert.equal(parallelogramDet(start), number(det(columnsMatrix(start))))
    assert.equal(parallelogramDet(start), 8)
    assert.equal(parallelogramPrediction(start), '>')
    // Swapping the columns changes the sign; arrows on one line give 0
    assert.equal(areaDet(start.v, start.u), -8)
    assert.equal(areaDet([2, 1], [4, 2]), 0)
    // The tips stay on the board, and moving one forgets the prediction
    const moved = setTip({ ...start, prediction: '>' }, 'v', [9, -9])
    assert.deepEqual(moved.v, [ARROW_LIMITS.max, ARROW_LIMITS.min])
    assert.equal(moved.prediction, null)
    assert.equal(moved.active, 'v')
    assert.equal(setTip(start, 'u', [3, 1]), start)
    assert.equal(chooseArrow(start, 'v').active, 'v')
    assert.equal(nearestArrow(start, [1, 4]), 'v')
    assert.equal(nearestArrow(start, [4, 1]), 'u')
    // Sliding v along u keeps the area
    for (const s of [-1, -0.5, 0.3, 1]) assert.ok(Math.abs(areaDet(start.u, slid(start, s)) - 8) < 1e-9)
    for (const target of [-9, 0, 5, 12]) for (const pair of pairsWith(target)) assert.equal(areaDet(pair.u, pair.v), target)
})

test('determinanteak batx2 z lab: parallelogram challenges', () => {
    const state = (u: [number, number], v: [number, number]): ParallelogramState => ({ u, v, active: 'u', prediction: null })
    checkChallenges(parallelogramChallenges, initialParallelogramState, {
        117101: state([2, 1], [4, 2]),
        117102: state([3, 0], [1, 2]),
        117103: state([2, 0], [1, -2]),
        117104: state([3, 0], [0, 3]),
        117105: state([2, 1], [1, 3])
    })
    // A square needs two perpendicular arrows of the same length
    assert.ok(!parallelogramChallenges[3].isSolved(state([3, 0], [1, 3])))
    // |A| = 0 with a zero arrow does not count
    assert.ok(!parallelogramChallenges[0].isSolved(state([0, 0], [1, 3])))
    const inside = (value: number) => value >= ARROW_LIMITS.min && value <= ARROW_LIMITS.max
    checkExtras(parallelogramExtra, initialParallelogramState, (solution) => [...solution.u, ...solution.v].every(inside))
})

/* ---------- L2. The property machine ---------- */

test('determinanteak batx2 z lab: each row operation does what the property says to |A|', () => {
    assert.deepEqual(PROPERTY_PRESETS.map(detOf), [6, 2, 5])
    const start = initialPropertyState
    assert.equal(currentDet(start), 6)
    for (const preset of [0, 1, 2]) {
        for (let target = 0; target < 3; target++) {
            for (let source = 0; source < 3; source++) {
                if (source === target) continue
                const base = { ...loadPreset(preset), target, source }
                const d = currentDet(base)
                assert.equal(detOf(previewMatrix({ ...base, operation: 'swap' })), -d)
                for (const scale of [2, 3] as const) assert.equal(detOf(previewMatrix({ ...base, operation: 'scale', scale })), scale * d)
                for (const k of [-3, -2, -1, 1, 2, 3]) assert.equal(detOf(previewMatrix({ ...base, operation: 'add', k })), d)
            }
        }
    }
    assert.equal(operationEffect('swap'), '<')
    assert.equal(operationEffect('add'), '=')
    assert.equal(operationEffect('scale'), '>')
    assert.equal(propertyPrediction(start), '=')
    // The source is never the target
    const met = setTarget(start, start.source)
    assert.notEqual(met.target, met.source)
    const met2 = setSource(start, start.target)
    assert.notEqual(met2.target, met2.source)
    // k skips 0 and stays in −3 … 3; the multiplier is 2 or 3
    assert.equal(setAddK({ ...start, k: 1 }, 0).k, -1)
    assert.equal(setAddK({ ...start, k: -1 }, 0).k, 1)
    assert.equal(setAddK(start, 9).k, 3)
    assert.equal(setScale(start, 3).scale, 3)
    // Applying keeps the matrix whole numbers, counts the step and forgets the prediction
    const applied = applyOperation({ ...start, prediction: '=' })
    assert.equal(applied.steps, 1)
    assert.equal(applied.prediction, null)
    assert.deepEqual(applied.matrix[1], [0, 1, 1])
    assert.equal(chooseOperation(start, 'swap').operation, 'swap')
    assert.equal(operationLatex(start), 'E_2-2E_1')
    assert.equal(operationLatex({ ...start, operation: 'swap' }), 'E_2\\leftrightarrow E_1')
    assert.equal(operationLatex({ ...start, operation: 'scale', scale: 3 }), '3E_2')
    // No cell grows beyond the cap
    const big = { ...start, matrix: [[90, 1, 1], [90, 1, 1], [0, 0, 1]], operation: 'add' as const, k: 3 }
    assert.ok(!canApply(big))
    assert.equal(applyOperation(big), big)
    assert.ok(PROPERTY_CAP >= 50)
})

test('determinanteak batx2 z lab: the routes to a triangle keep |A|, and the diagonal gives it', () => {
    TRIANGLE_ROUTES.forEach((route, preset) => {
        const end = runOperations(preset, route)
        assert.ok(isTriangular(end.matrix), `${preset}`)
        assert.equal(currentDet(end), detOf(PROPERTY_PRESETS[preset]))
        assert.equal(end.matrix[0][0] * end.matrix[1][1] * end.matrix[2][2], currentDet(end))
    })
    assert.ok(!isTriangular(PROPERTY_PRESETS[0]))
})

test('determinanteak batx2 z lab: property machine challenges', () => {
    checkChallenges(propertyChallenges, initialPropertyState, {
        117151: runOperations(0, [{ operation: 'swap', target: 0, source: 1 }]),
        117152: runOperations(0, [{ operation: 'scale', target: 0, source: 1, scale: 3 }]),
        117153: runOperations(0, TRIANGLE_ROUTES[0]),
        117154: runOperations(1, [
            { operation: 'swap', target: 0, source: 2 },
            { operation: 'add', target: 1, source: 0, k: -2 },
            { operation: 'add', target: 2, source: 0, k: -1 },
            { operation: 'add', target: 2, source: 1, k: -1 }
        ]),
        117155: runOperations(2, [{ operation: 'scale', target: 0, source: 1, scale: 2 }, { operation: 'scale', target: 1, source: 0, scale: 3 }])
    })
    const whole = (state: PropertyState) => state.matrix.every((row) => row.every((value) => Number.isInteger(value) && Math.abs(value) <= PROPERTY_CAP))
    checkExtras(propertyExtra, initialPropertyState, whole)
})

/* ---------- L3. The sign board ---------- */

test('determinanteak batx2 z lab: every line of the sign board gives the same determinant', () => {
    SIGN_PRESETS.forEach((matrix, preset) => {
        const value = presetDet(preset)
        for (const line of allLines(preset)) {
            const terms = expansion(preset, line)
            assert.equal(terms.reduce((sum, term) => sum + term.entry * term.cofactor, 0), value, `${preset} ${lineKey(line)}`)
            for (const term of terms) assert.equal(term.sign, (term.row + term.column) % 2 === 0 ? 1 : -1)
            assert.equal(cofactorsNeeded(preset, line), terms.filter((term) => term.entry !== 0).length)
        }
        assert.ok(matrix.every((row) => row.length === matrix.length))
    })
    assert.deepEqual(SIGN_PRESETS.map((_, preset) => presetDet(preset)), [25, 12, 28, -3])
    assert.deepEqual(SIGN_PRESETS.map((_, preset) => fewestCofactors(preset)), [1, 1, 1, 3])
    const start = initialSignBoardState
    assert.equal(currentCount(start), 2)
    assert.equal(signBoardPrediction(start), '=')
    assert.equal(signBoardPrediction(chooseSignPreset(start, 3)), '>')
    assert.equal(signBoardPrediction(chooseLine(start, { kind: 'column', index: 1 })), '<')
    // A line outside a 3 × 3 board is brought back; changing the line forgets the prediction
    assert.equal(chooseLine(start, { kind: 'row', index: 3 }).line.index, 2)
    assert.equal(chooseLine({ ...start, prediction: '=' }, { kind: 'column', index: 0 }).prediction, null)
    assert.deepEqual(markTried(markTried(start)).tried, ['row-0'])
    assert.deepEqual(chooseSignPreset(markTried(start), 1).tried, [])
})

test('determinanteak batx2 z lab: sign board challenges', () => {
    const at = (preset: number, kind: 'row' | 'column', index: number): SignBoardState => ({ ...loadSignPreset(preset), line: { kind, index } })
    checkChallenges(signBoardChallenges, initialSignBoardState, {
        117201: at(0, 'column', 1),
        117202: at(1, 'row', 1),
        117203: at(1, 'column', 2),
        117204: at(2, 'row', 1),
        117205: { ...at(3, 'column', 2), tried: ['row-0', 'column-2'] }
    })
    // The 4 × 4 has two lines with a single cofactor
    assert.ok(signBoardChallenges[3].isSolved(at(2, 'column', 1)))
    checkExtras(signBoardExtra, initialSignBoardState, (solution) => solution.line.index < SIGN_PRESETS[solution.preset].length)
})

/* ---------- L4. The determinant slider ---------- */

test('determinanteak batx2 z lab: |A(k)| is the polynomial of each family, and its roots are where there is no inverse', () => {
    const polynomials = [(k: number) => k * k - 4, (k: number) => -k * k + 2 * k, (k: number) => k ** 3 + 1, (k: number) => (k * k - 4) * (k - 1), (k: number) => (k - 1) ** 2 * (k + 1)]
    DET_FAMILIES.forEach((_, family) => {
        for (const k of detValues) assert.equal(detAt(family, k), polynomials[family](k) + 0, `${family} ${k}`)
        for (const k of [-2.5, -0.7, 0.4, 1.9]) assert.ok(Math.abs(detCurve(family, k) - polynomials[family](k)) < 1e-9)
    })
    assert.deepEqual(DET_FAMILIES.map((_, family) => rootsIn(family)), [[-2, 2], [0, 2], [-1], [-2, 1, 2], [-1, 1]])
    const start = initialDetSliderState
    assert.equal(currentDetValue(start), -4)
    assert.equal(detSliderPrediction(start), '<')
    assert.equal(detSliderPrediction(setK(start, 2)), '=')
    assert.equal(setK(start, 9).k, DET_LIMITS.max)
    assert.equal(setK({ ...start, prediction: '<' }, 1).prediction, null)
    assert.deepEqual(markDetSeen(markDetSeen(start)).seen, [0])
    const traced = traceAll(start)
    assert.ok(traced.traced)
    assert.deepEqual(traced.seen, detValues)
    const other = chooseDetFamily(traced, 2)
    assert.equal(other.family, 2)
    assert.ok(!other.traced)
    assert.deepEqual(other.seen, [])
})

test('determinanteak batx2 z lab: determinant slider challenges', () => {
    const at = (family: number, k: number): DetSliderState => ({ ...initialDetSliderState, family, k })
    checkChallenges(detSliderChallenges, initialDetSliderState, {
        117301: at(0, 2),
        117302: at(1, 2),
        117303: at(2, -1),
        117304: at(3, -2),
        117305: at(4, -2)
    })
    // B has the root k = 0 too, but it is not positive; D has two positive roots
    assert.ok(!detSliderChallenges[1].isSolved(at(1, 0)))
    assert.ok(!detSliderChallenges[3].isSolved(at(3, 2)))
    checkExtras(detSliderExtra, initialDetSliderState, (solution) => solution.k >= DET_LIMITS.min && solution.k <= DET_LIMITS.max)
})
