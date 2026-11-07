import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { afterMoves, applyGauss, GAUSS_LIMITS, GAUSS_SYSTEMS, gaussChallenges, gaussExtra, gaussPlan, gaussPrediction, gaussSolution, gaussVerdict, initialGaussState, isTriangular, loadGaussSystem, matrixLatex, operationLatex, pivotLeft, rowLatex, setGauss, swapGauss, type GaussState } from '../src/pages/batx1-zientziak-sistemak/lab/gaussMachine.ts'
import { bachSystemsLabChallengeIds, bachSystemsLabToolForTopic, bachSystemsLabTools } from '../src/pages/batx1-zientziak-sistemak/lab/labTools.ts'
import { criticalA, initialParameterState, matchingB, PARAMETER_SYSTEMS, parameterChallenges, parameterExtra, parameterKind, parameterLetters, parameterPrediction, parameterSolution, parameterSystemLatex, reducedLatex, setParameter, type ParameterState } from '../src/pages/batx1-zientziak-sistemak/lab/parameterSlider.ts'
import { checkLatex, equationLatex, FAMILIES, FAMILY_BOX, familyChallenges, familyExtra, familyLatex, familyPoint, familyPrediction, initialFamilyState, lambdaRange, setFamily, type FamilyState } from '../src/pages/batx1-zientziak-sistemak/lab/solutionFamily.ts'
import { evaluate, near } from './latex-math.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        // No Basque suffix glued to a number or to a formula (the $ that opens a formula is not a suffix)
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

/** Whether (x, y, z) satisfies every row of a matrix */
const satisfies = (rows: number[][], point: number[]) => rows.every((row) => near(row[0] * point[0] + row[1] * point[1] + row[2] * point[2], row[3]))

test('sistemak batx1 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(bachSystemsLabTools.length, 9)
    for (const stage of ['linear', 'gauss', 'discussion', 'nonlinear', 'inequalities']) assert.ok(bachSystemsLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of bachSystemsLabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    }
    // The «Observe» text of the tools of this unit is plain text, not LaTeX
    for (const tool of bachSystemsLabTools.filter((item) => ['gauss-machine', 'parameter-slider', 'solution-family'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
    }
    assert.equal(new Set(bachSystemsLabChallengeIds).size, bachSystemsLabChallengeIds.length)
    // The three tools of this unit use the 1131xx–1133xx block; the borrowed ones keep their ids
    const own = [...gaussChallenges, ...parameterChallenges, ...familyChallenges].map((challenge) => challenge.id)
    for (const id of own) assert.ok(id >= 113101 && id <= 113399, `${id}`)
    const topics = ['linear-equations', 'classify-systems', 'equivalent-systems', 'triangular-systems', 'gauss-method', 'augmented-matrix', 'three-unknown-problems', 'solutions-count', 'parametric-solutions', 'parameter-discussion', 'nonlinear-substitution', 'radical-log-systems', 'exponential-systems', 'nonlinear-problems', 'half-plane-regions', 'region-cases']
    for (const [topic, tool] of Object.entries(bachSystemsLabToolForTopic)) {
        assert.ok(topics.includes(topic), topic)
        assert.ok(bachSystemsLabTools.some((item) => item.id === tool), `${topic} → ${tool}`)
    }
    for (const tool of bachSystemsLabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
})

test('sistemak batx1 z lab: la máquina de Gauss', () => {
    // E2 − 2E1 on system A leaves 0 under the pivot, the constant term too
    const first = setGauss(initialGaussState, { target: 1, source: 0, m: 1, k: -2 })
    assert.equal(pivotLeft(first), 0)
    assert.equal(gaussPrediction(first), '=')
    assert.deepEqual(applyGauss(first).rows[1], [0, -3, -1, -9])
    assert.equal(operationLatex(first), 'E_2-2E_1')
    assert.equal(rowLatex([0, -3, -1, -9]), '-3y-z=-9')
    assert.equal(rowLatex([0, 0, 0, 1]), '0z=1')
    assert.equal(operationLatex(setGauss(initialGaussState, { target: 2, source: 1, m: 3, k: 1 })), '3E_3+E_2')
    assert.equal(gaussPrediction(setGauss(initialGaussState, { k: 1 })), '>')
    assert.equal(gaussPrediction(setGauss(initialGaussState, { k: -3 })), '<')
    // E2 can only use E1; m is never 0
    assert.equal(setGauss(initialGaussState, { target: 1, source: 1 }).source, 0)
    assert.equal(setGauss(initialGaussState, { m: 0 }).m, GAUSS_LIMITS.m.min)
    // Changing the operation forgets the prediction; applying it too
    const predicted = { ...first, prediction: '=' as const }
    assert.equal(setGauss(predicted, { k: -1 }).prediction, null)
    assert.equal(setGauss(predicted, { k: -2 }).prediction, '=')
    assert.equal(applyGauss(predicted).prediction, null)
    assert.equal(applyGauss(predicted).steps, 1)
    assert.deepEqual(swapGauss(initialGaussState, 0).rows[0], GAUSS_SYSTEMS[0][1])
    katex.renderToString(matrixLatex(GAUSS_SYSTEMS[0]), { throwOnError: true, strict: 'error' })

    // Every system becomes triangular with operations the controls allow, and says what the book says
    const expected = [['one', [1, 2, 3]], ['one', [2, 3, 1]], ['none'], ['infinite'], ['one', [1, 1, 2]], ['one', [1, 0, 1]]] as const
    GAUSS_SYSTEMS.forEach((system, index) => {
        const plan = gaussPlan(system)
        for (const move of plan) if (move.kind === 'row') assert.ok(move.m >= GAUSS_LIMITS.m.min && move.m <= GAUSS_LIMITS.m.max && Math.abs(move.k) <= GAUSS_LIMITS.k.max, `${index}: ${JSON.stringify(move)}`)
        const done = afterMoves(index, plan)
        assert.ok(isTriangular(done.rows), `${index}`)
        assert.equal(gaussVerdict(done.rows), expected[index][0], `${index}`)
        assert.equal(gaussVerdict(system), expected[index][0], `${index}: the operations keep the solutions`)
        if (expected[index][0] === 'one') {
            const solution = gaussSolution(done.rows)!.map((value) => value.numerator / value.denominator)
            assert.deepEqual(solution, expected[index][1])
            assert.ok(satisfies(system, solution), `${index}`)
        }
        // The rows of the triangular matrix still hold at the solution: they are equivalent equations
        if (expected[index][0] === 'one') assert.ok(satisfies(done.rows, [...expected[index][1]]), `${index}`)
    })
    assert.equal(afterMoves(4, gaussPlan(GAUSS_SYSTEMS[4])).steps, 3)

    const a = (moves: Parameters<typeof afterMoves>[1]) => afterMoves(0, moves)
    checkChallenges(gaussChallenges, initialGaussState, {
        113101: a([{ kind: 'row', target: 1, source: 0, m: 1, k: -2 }]),
        113102: a(gaussPlan(GAUSS_SYSTEMS[0])),
        113103: afterMoves(2, gaussPlan(GAUSS_SYSTEMS[2])),
        113104: afterMoves(3, gaussPlan(GAUSS_SYSTEMS[3])),
        113105: afterMoves(4, gaussPlan(GAUSS_SYSTEMS[4]))
    })
    // With a swap first, system E needs four operations: the challenge asks for m
    const swapped = afterMoves(4, [{ kind: 'swap', first: 0 }, ...gaussPlan(swapGauss(loadGaussSystem(initialGaussState, 4), 0).rows)])
    assert.ok(isTriangular(swapped.rows) && swapped.steps === 4)
    assert.ok(!gaussChallenges.find((challenge) => challenge.id === 113105)!.isSolved(swapped))
    checkExtras(gaussExtra, initialGaussState, (state: GaussState) => setGauss(state, state))
})

test('sistemak batx1 z lab: el deslizador del parámetro', () => {
    const at = (patch: Partial<ParameterState>) => setParameter(initialParameterState, patch)
    assert.deepEqual(parameterSystemLatex(initialParameterState), ['x+2y=3', '2x+2y=5'])
    assert.equal(reducedLatex(initialParameterState), '-2y=-1')
    assert.equal(parameterLetters(0), '\\begin{cases}x+2y=3\\\\ 2x+ay=b\\end{cases}')
    assert.equal(parameterKind(initialParameterState), 'one')
    assert.equal(parameterPrediction(initialParameterState), '=')
    // The critical a of each system makes the coefficient of y zero
    PARAMETER_SYSTEMS.forEach((_, system) => {
        assert.equal(parameterKind(at({ system, a: criticalA(system), b: matchingB(system) })), 'infinite')
        assert.equal(parameterKind(at({ system, a: criticalA(system), b: matchingB(system) + 1 })), 'none')
        assert.equal(parameterKind(at({ system, a: criticalA(system) + 1 })), 'one')
    })
    assert.equal(parameterPrediction(at({ a: 4, b: 5 })), '<')
    assert.equal(parameterPrediction(at({ a: 4, b: 6 })), '>')
    // The solution satisfies both equations
    for (let a = -8; a <= 8; a++) {
        for (const system of [0, 1, 2, 3]) {
            const state = at({ system, a, b: 3 })
            const solution = parameterSolution(state)
            if (!solution) continue
            const [x, y] = solution.map((value) => value.numerator / value.denominator)
            const { q, r, s } = PARAMETER_SYSTEMS[system]
            assert.ok(near(x + q * y, r) && near(s * x + a * y, 3), `${system} ${a}`)
        }
    }
    assert.deepEqual(parameterSolution(at({ a: 3, b: 5 }))!.map((value) => value.numerator / value.denominator), [1, 1])
    const predicted = { ...initialParameterState, prediction: '=' as const }
    assert.equal(setParameter(predicted, { a: 3 }).prediction, null)
    assert.equal(setParameter(predicted, { a: initialParameterState.a }).prediction, '=')
    assert.equal(at({ a: 40 }).a, 8)
    checkChallenges(parameterChallenges, initialParameterState, {
        113201: at({ a: 4, b: 5 }),
        113202: at({ a: 4, b: 6 }),
        113203: at({ a: 3, b: 5 }),
        113204: at({ system: 1, a: -3, b: 6 }),
        113205: at({ system: 3, a: 2, b: 0 })
    })
    checkExtras(parameterExtra, initialParameterState, (state) => setParameter(state, state))
})

test('sistemak batx1 z lab: la familia de soluciones', () => {
    // Every point of every family satisfies both equations, and the drawing holds the whole range
    FAMILIES.forEach((family, index) => {
        const [min, max] = lambdaRange(index)
        assert.ok(min <= 0 && max >= 0 && max - min >= 3, `${index}: ${min} … ${max}`)
        for (let lambda = min; lambda <= max; lambda++) {
            const point = familyPoint(index, lambda)
            assert.ok(satisfies(family.rows, point), `${index} ${lambda}`)
            assert.ok(Math.abs(point[0]) <= FAMILY_BOX && Math.abs(point[1]) <= FAMILY_BOX)
            // The worked check of each equation adds up
            for (const row of family.rows) {
                const [left, right] = checkLatex(row, point).split('=')
                assert.ok(near(evaluate(left)!, evaluate(right)!), checkLatex(row, point))
            }
        }
        katex.renderToString(familyLatex(index), { throwOnError: true, strict: 'error' })
    })
    assert.equal(familyLatex(0), '(-3+3\\lambda,\\ 4-\\lambda,\\ \\lambda)')
    assert.equal(familyLatex(1), '(3-\\lambda,\\ 1,\\ \\lambda)')
    assert.equal(equationLatex(FAMILIES[0].rows[0]), 'x+2y-z=5')
    assert.equal(checkLatex(FAMILIES[0].rows[0], [3, 2, 2]), '3+2\\cdot 2-2=5')
    assert.deepEqual(FAMILIES.map((_, family) => familyPrediction({ ...initialFamilyState, family })), ['<', '=', '>', '<'])
    // λ moves without forgetting the prediction; a new system forgets it and starts at λ = 0
    const predicted = { ...initialFamilyState, prediction: '<' as const }
    assert.equal(setFamily(predicted, { lambda: 2 }).prediction, '<')
    assert.deepEqual(setFamily({ ...predicted, lambda: 2 }, { family: 1 }), { family: 1, lambda: 0, prediction: null })
    assert.equal(setFamily(initialFamilyState, { lambda: 40 }).lambda, lambdaRange(0)[1])
    const at = (family: number, lambda: number): FamilyState => setFamily(initialFamilyState, { family, lambda })
    checkChallenges(familyChallenges, initialFamilyState, {
        113301: at(0, 3),
        113302: at(0, 1),
        113303: at(2, -2),
        113304: at(3, 2),
        113305: at(0, 2)
    })
    checkExtras(familyExtra, initialFamilyState, (state) => setFamily(state, state))
})
