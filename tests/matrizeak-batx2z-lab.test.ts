import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import { gcd } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { gaussChallenges } from '../src/pages/batx1-zientziak-sistemak/lab/gaussMachine.ts'
import { inverse, isIdentity, multiply, toMatrix, toNumbers } from '../src/pages/batx2-zientziak-matrizeak/matrix.ts'
import {
    applyJordan, canDivide, divideJordan, hasInverse, initialJordanState, JORDAN_LIMITS, JORDAN_MATRICES, jordanChallenges, jordanExtra, jordanPrediction, leftHasZeroRow, leftIsIdentity,
    loadJordan, previewRow, rightPart, setJordan, sizeOf, swapJordan, type JordanState
} from '../src/pages/batx2-zientziak-matrizeak/lab/jordanMachine.ts'
import { matrizeakLabChallengeIds, matrizeakLabToolForTopic, matrizeakLabTools } from '../src/pages/batx2-zientziak-matrizeak/lab/labTools.ts'
import { chooseFamily, criticalValues, currentRank, initialRankState, markSeen, RANK_FAMILIES, RANK_LIMITS, rankAt, rankChallenges, rankExtra, rankPrediction, rankValues, seeAll, setM, type RankState } from '../src/pages/batx2-zientziak-matrizeak/lab/rankSlider.ts'
import { adjacency, changes, chooseTrip, initialRouteState, lineCount, routeChallenges, routeExtra, routePrediction, square, toggleArrow, twoStep, type RouteState } from '../src/pages/batx2-zientziak-matrizeak/lab/routeMap.ts'
import { cellValue, chooseCell, initialRowColumnState, loadPair, product, ROW_COLUMN_LIMITS, ROW_COLUMN_PAIRS, rowColumnChallenges, rowColumnExtra, rowColumnPrediction, setB, type RowColumnState } from '../src/pages/batx2-zientziak-matrizeak/lab/rowColumn.ts'
import { matrizeakLessonTexts } from '../src/pages/batx2-zientziak-matrizeak/lessonTexts.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const

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

test('matrizeak batx2 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(matrizeakLabTools.length, 5)
    assert.equal(matrizeakLabTools.filter((tool) => tool.id !== 'gauss-machine').length, 4, 'four tools of its own')
    for (const tool of matrizeakLabTools) {
        assert.ok(tool.lessonTopic in matrizeakLessonTexts, tool.id)
        checkTexts([tool.title, tool.observe])
        // What to look for is plain text: no LaTeX
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
    }
    for (const [topic, tool] of Object.entries(matrizeakLabToolForTopic)) {
        assert.ok(topic in matrizeakLessonTexts, topic)
        assert.ok(matrizeakLabTools.some((item) => item.id === tool), `${topic}: ${tool}`)
    }
    // Own challenges in 116101–116399; the Gauss machine keeps its ids from 1.º Bachillerato
    const own = matrizeakLabChallengeIds.filter((id) => !gaussChallenges.some((challenge) => challenge.id === id))
    assert.equal(own.length, 20)
    assert.ok(own.every((id) => id >= 116101 && id <= 116399))
    assert.equal(new Set(matrizeakLabChallengeIds).size, matrizeakLabChallengeIds.length)
})

test('matrizeak batx2 z lab: fila por columna', () => {
    assert.deepEqual(product(ROW_COLUMN_PAIRS[0].a, ROW_COLUMN_PAIRS[0].b), [[1, -3], [5, 7]])
    assert.equal(cellValue(chooseCell(initialRowColumnState, 1, 0)), 5)
    assert.equal(rowColumnPrediction(chooseCell(initialRowColumnState, 0, 1)), '<')
    // Choosing another cell or another number of B forgets the prediction; the numbers stay in range
    const predicted = { ...initialRowColumnState, prediction: '>' as const }
    assert.equal(chooseCell(predicted, 0, 0).prediction, '>')
    assert.equal(chooseCell(predicted, 1, 0).prediction, null)
    assert.equal(setB(predicted, 0, 3).prediction, null)
    assert.equal(setB(initialRowColumnState, 0, 40).b[0][0], ROW_COLUMN_LIMITS.max)
    // Every pair can be multiplied: 2 × 3 by 3 × 2
    for (const pair of ROW_COLUMN_PAIRS) assert.ok(pair.a.length === 2 && pair.a[0].length === 3 && pair.b.length === 3 && pair.b[0].length === 2)
    const column = (state: RowColumnState, values: number[]) => values.reduce((s, value, k) => setB(s, k, value), state)
    checkChallenges(rowColumnChallenges, initialRowColumnState, {
        116101: { ...chooseCell(initialRowColumnState, 1, 0), prediction: '>' },
        116102: setB(initialRowColumnState, 0, 1),
        116103: column(chooseCell(initialRowColumnState, 0, 1), [1, -2, 1]),
        116104: column(chooseCell(loadPair(1), 0, 1), [5, 1, 0]),
        116105: setB(loadPair(2), 1, -3)
    })
    const inRange = (state: RowColumnState) => state.b.every((row) => row.every((value) => value >= ROW_COLUMN_LIMITS.min && value <= ROW_COLUMN_LIMITS.max))
        && state.b.flat().filter((value, index) => value !== ROW_COLUMN_PAIRS[state.pair].b.flat()[index]).length === 1
    checkExtras(rowColumnExtra, initialRowColumnState, inRange)
})

test('matrizeak batx2 z lab: el mapa de rutas', () => {
    // At the start: 1 → 2 → 3 → 1
    assert.equal(lineCount(initialRouteState), 3)
    assert.equal(twoStep(initialRouteState), 1)
    assert.deepEqual(changes(initialRouteState), [1])
    assert.equal(routePrediction(initialRouteState), '=')
    assert.deepEqual(toggleArrow(initialRouteState, 2, 2), initialRouteState)
    // A² counts the paths i → k → j, by brute force
    for (let seed = 1; seed <= 60; seed++) {
        const random = createRandom(seed)
        let state: RouteState = initialRouteState
        for (let step = 0; step < 6; step++) state = toggleArrow(state, Math.floor(random() * 4), Math.floor(random() * 4))
        const a2 = square(adjacency(state))
        for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
            let paths = 0
            for (let k = 0; k < 4; k++) if (state.arrows[i][k] && state.arrows[k][j]) paths++
            assert.equal(a2[i][j], paths)
        }
    }
    const lines = (pairs: Array<[number, number]>, from = 0, to = 2): RouteState => ({ arrows: Array.from({ length: 4 }, (_, i) => Array.from({ length: 4 }, (__, j) => pairs.some(([a, b]) => a === i && b === j))), from, to, prediction: null })
    checkChallenges(routeChallenges, initialRouteState, {
        116151: { ...chooseTrip(initialRouteState, 2, 1), prediction: '=' },
        116152: lines([[0, 1], [1, 2], [0, 3], [3, 2]]),
        116153: lines([[0, 1], [1, 0]]),
        116154: lines([[0, 1], [0, 2]]),
        116155: lines([[0, 1], [1, 3], [0, 2], [2, 3]])
    })
    checkExtras(routeExtra, initialRouteState, (state) => state.arrows.every((row, i) => !row[i]))
})

/** The moves a learner can make that take (A | I) to (I | A⁻¹), or to a row of zeros, with the machine's own limits */
function jordanPlan(index: number): JordanState {
    let state = loadJordan(index)
    const size = sizeOf(state)
    const value = (r: number, c: number) => state.rows[r][c].numerator / state.rows[r][c].denominator
    const zero = (target: number, source: number) => {
        const pivot = value(source, source)
        const entry = value(target, source)
        if (entry === 0 || pivot === 0) return
        assert.ok(Number.isInteger(pivot) && Number.isInteger(entry), `${index}: fractions before dividing`)
        const g = gcd(Math.abs(pivot), Math.abs(entry))
        const m = Math.abs(pivot) / g
        const k = (-Math.sign(pivot) * entry) / g
        assert.ok(m <= JORDAN_LIMITS.m.max && Math.abs(k) <= JORDAN_LIMITS.k.max, `${index}: m=${m}, k=${k}`)
        state = setJordan(state, { target, source, m, k })
        assert.equal(jordanPrediction(state), '=')
        state = applyJordan(state)
    }
    for (let column = 0; column < size; column++) {
        if (value(column, column) === 0) {
            const below = Array.from({ length: size }, (_, r) => r).find((r) => r > column && value(r, column) !== 0)
            if (below === undefined) return state
            state = swapJordan(setJordan(state, { target: column, source: below }))
        }
        for (let r = 0; r < size; r++) if (r !== column) zero(r, column)
    }
    for (let r = 0; r < size; r++) {
        state = setJordan(state, { target: r, source: (r + 1) % size })
        if (canDivide(state)) state = divideJordan(state)
    }
    return state
}

test('matrizeak batx2 z lab: la máquina de Gauss-Jordan', () => {
    // m·Eᵢ + k·Eⱼ on the whole row, the I part too
    const moved = setJordan(initialJordanState, { target: 1, source: 0, m: 2, k: -5 })
    assert.deepEqual(previewRow(moved).map((value) => value.numerator / value.denominator), [0, 1, -5, 2])
    assert.equal(jordanPrediction(moved), '=')
    assert.equal(setJordan(initialJordanState, { target: 0, source: 0 }).source, 1, 'the row used is never the row that changes')
    assert.equal(setJordan({ ...initialJordanState, prediction: '<' }, { k: 2 }).prediction, null)
    // Every matrix of the machine: with an inverse, the moves reach (I | A⁻¹); without, a row of zeros
    JORDAN_MATRICES.forEach((matrix, index) => {
        const end = jordanPlan(index)
        if (hasInverse(index)) {
            assert.ok(leftIsIdentity(end), `${index}: not (I | A⁻¹)`)
            assert.ok(isIdentity(multiply(toMatrix(matrix), rightPart(end))), `${index}: the right part is not A⁻¹`)
            assert.deepEqual(toNumbers(rightPart(end)), toNumbers(inverse(toMatrix(matrix))!))
        } else {
            assert.ok(leftHasZeroRow(end), `${index}: no row of zeros`)
        }
    })
    assert.deepEqual(JORDAN_MATRICES.map((_, index) => hasInverse(index)), [true, true, false, true, true, false])
    const solved = (index: number) => jordanPlan(index)
    checkChallenges(jordanChallenges, initialJordanState, {
        116201: applyJordan(setJordan(initialJordanState, { target: 1, source: 0, m: 2, k: -5 })),
        116202: solved(0),
        116203: solved(1),
        116204: solved(2),
        116205: solved(3)
    })
    checkExtras(jordanExtra, initialJordanState, (state) => (leftIsIdentity(state) ? leftIsIdentity(jordanPlan(state.matrix)) : leftHasZeroRow(jordanPlan(state.matrix))))
})

test('matrizeak batx2 z lab: el deslizador del rango', () => {
    // The critical values of each family, inside the range of the slider
    assert.deepEqual(RANK_FAMILIES.map((_, family) => criticalValues(family)), [
        [{ m: 3, rank: 2 }],
        [{ m: 2, rank: 2 }],
        [{ m: 1, rank: 1 }],
        [{ m: -2, rank: 2 }, { m: 1, rank: 1 }],
        [{ m: 6, rank: 1 }]
    ])
    assert.equal(rankValues.length, RANK_LIMITS.max - RANK_LIMITS.min + 1)
    for (let family = 0; family < RANK_FAMILIES.length; family++) {
        for (const m of rankValues) {
            const rank = rankAt(family, m)
            assert.ok(rank >= 1 && rank <= 3)
            const prediction = rankPrediction({ ...initialRankState, family, m })
            assert.equal(prediction, rank === 1 ? '<' : rank === 2 ? '=' : '>')
        }
    }
    // Moving m forgets the prediction but not the strip; a new family starts the strip again
    const seen = markSeen({ ...initialRankState, prediction: '>' })
    assert.deepEqual(seen.seen, [0])
    assert.equal(setM(seen, 3).prediction, null)
    assert.deepEqual(setM(seen, 3).seen, [0])
    assert.deepEqual(chooseFamily(seen, 2).seen, [])
    assert.equal(seeAll(initialRankState).seen.length, rankValues.length)
    assert.equal(setM(initialRankState, 40).m, RANK_LIMITS.max)
    const at = (family: number, m: number): RankState => setM(chooseFamily(initialRankState, family), m)
    checkChallenges(rankChallenges, initialRankState, {
        116301: at(0, 3),
        116302: at(1, 2),
        116303: at(2, 1),
        116304: at(3, -2),
        116305: at(4, 6)
    })
    checkExtras(rankExtra, initialRankState, (state) => currentRank(state) === currentRank(at(state.family, state.m)))
})
