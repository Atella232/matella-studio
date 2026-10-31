import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker, LocalizedText } from '../src/features/unit-v2/lab/types.ts'
import { equations3LabChallengeIds, equations3LabToolForTopic, equations3LabTools } from '../src/pages/dbh3-ekuazioak/lab/labTools.ts'
import { applyMove, BALANCE_EQUATIONS, balanceChallenges, balanceExtra, balancePrediction, balanceSolved, boxWeight, canMove, initialBalanceState, pansLatex, randomPans, solutionSteps, startEquation, type BalanceMove, type BalanceState } from '../src/pages/dbh3-ekuazioak/lab/balance.ts'
import { groundChallenges, groundDiscriminant, groundExtra, groundPrediction, groundRoots, initialGroundState, setGround, type GroundState } from '../src/pages/dbh3-ekuazioak/lab/ground.ts'
import { eliminated, initialScalesState, SCALE_SYSTEMS, scalesChallenges, scalesExtra, scalesLevel, scalesPrediction, scalesSolution, setScales, startSystem, type ScalesState } from '../src/pages/dbh3-ekuazioak/lab/scales.ts'
import { agesAnswer, agesChallenges, agesExtra, agesPrediction, AGES_SCENARIOS, initialAgesState, setAges, startAges, type AgesState } from '../src/pages/dbh3-ekuazioak/lab/ages.ts'

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

function checkChallenges<State>(challenges: LabChallenge<State>[], initial: State, solutions: Record<number, State>) {
    assert.equal(new Set(challenges.map((challenge) => challenge.id)).size, challenges.length)
    for (const challenge of challenges) {
        assert.ok(challenge.isSolved(solutions[challenge.id]), `${challenge.id} is not solved by its solution`)
        assert.ok(!challenge.isSolved(initial), `${challenge.id} starts solved`)
    }
    checkTexts(challenges.flatMap((challenge) => [challenge.prompt, challenge.hint]))
}

function checkExtras<State>(maker: LabChallengeMaker<State>, initial: State, minimum = 6) {
    const prompts = new Set<string>()
    for (let seed = 1; seed <= 150; seed += 1) {
        const challenge = maker(createRandom(seed * 7919 + 3))
        assert.ok(challenge.isSolved(challenge.solution), `seed ${seed}: ${challenge.prompt.es}`)
        assert.ok(!challenge.isSolved(initial), `seed ${seed} starts solved`)
        checkTexts([challenge.prompt, challenge.hint])
        prompts.add(challenge.prompt.es)
    }
    assert.ok(prompts.size >= minimum, `only ${prompts.size} different challenges`)
}


test('ekuazioak 3. DBH lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(equations3LabTools.length, 9)
    for (const stage of ['linear', 'quadratic', 'systems', 'methods', 'problems']) assert.ok(equations3LabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of equations3LabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
        assert.ok(!tool.observe.es.includes('$') && !tool.observe.eu.includes('$') && !tool.observe.ar.includes('$'), tool.id)
    }
    assert.equal(new Set(equations3LabChallengeIds).size, equations3LabChallengeIds.length)
    const own = [balanceChallenges, groundChallenges, scalesChallenges, agesChallenges].flatMap((list) => list.map((challenge) => challenge.id))
    for (const id of own) assert.ok(id >= 93101 && id <= 93999, `${id}`)
    const topics = ['equations', 'brackets', 'denominators', 'incomplete', 'formula', 'discriminant', 'pairs', 'graphic', 'classify', 'substitution', 'equalisation', 'elimination', 'equation-problems', 'quadratic-problems', 'system-problems']
    for (const topic of topics) assert.ok(equations3LabToolForTopic[topic], topic)
})

test('ekuazioak 3. DBH lab: la balanza', () => {
    // Every move keeps the balance level at the solution, and the shortest way ends with one box
    const level = (state: BalanceState) => {
        const x = boxWeight(state.start)
        return state.pans.a * x + state.pans.b === state.pans.c * x + state.pans.d
    }
    for (let equation = 0; equation < BALANCE_EQUATIONS.length; equation += 1) {
        let state = startEquation(equation)
        for (const move of ['box', 'kilo', 'box', 'share', 'kilo', 'box', 'kilo', 'share'] as BalanceMove[]) {
            state = applyMove(state, move)
            assert.ok(level(state), pansLatex(state.pans))
        }
        const steps = solutionSteps(BALANCE_EQUATIONS[equation])
        assert.ok(balanceSolved(steps[steps.length - 1]), `${equation}`)
        assert.ok(Number.isInteger(boxWeight(BALANCE_EQUATIONS[equation])) && boxWeight(BALANCE_EQUATIONS[equation]) > 0)
    }
    assert.deepEqual(BALANCE_EQUATIONS.map(boxWeight), [3, 4, 4, 5, 4])
    assert.equal(balancePrediction(initialBalanceState), '<')
    assert.ok(!canMove({ a: 2, b: 1, c: 0, d: 7 }, 'share'))
    assert.equal(solutionSteps(BALANCE_EQUATIONS[3]).length - 1, 5)
    const solvedBy = (equation: number): BalanceState => {
        const steps = solutionSteps(BALANCE_EQUATIONS[equation])
        return { ...startEquation(equation), pans: steps[steps.length - 1], moves: steps.length - 1 }
    }
    checkChallenges(balanceChallenges, initialBalanceState, { 93101: solvedBy(0), 93102: solvedBy(1), 93103: solvedBy(2), 93104: solvedBy(3), 93105: solvedBy(4) })
    assert.ok(!balanceChallenges[3].isSolved({ ...solvedBy(3), moves: 6 }))
    for (let seed = 1; seed <= 200; seed += 1) {
        const pans = randomPans(createRandom(seed * 13 + 5))
        assert.ok(Number.isInteger(boxWeight(pans)) && boxWeight(pans) > 0, pansLatex(pans))
        const steps = solutionSteps(pans)
        assert.ok(balanceSolved(steps[steps.length - 1]), pansLatex(pans))
    }
    checkExtras(balanceExtra, initialBalanceState)
})

test('ekuazioak 3. DBH lab: la parábola y el suelo', () => {
    const at = (b: number, c: number): GroundState => setGround(initialGroundState, { b, c })
    assert.deepEqual(groundRoots(at(-7, 10)), [2, 5])
    assert.equal(groundDiscriminant(at(6, 9)), 0)
    assert.equal(groundPrediction(at(0, 4)), '<')
    assert.equal(groundPrediction(at(6, 9)), '=')
    assert.equal(groundPrediction(initialGroundState), '>')
    // Every root really is a root
    for (let b = -8; b <= 8; b += 1) for (let c = -12; c <= 12; c += 1) for (const root of groundRoots({ b, c })) assert.ok(Math.abs(root * root + b * root + c) < 1e-9)
    checkChallenges(groundChallenges, initialGroundState, { 93201: at(6, 9), 93202: at(-7, 10), 93203: at(-4, 0), 93204: at(4, 5), 93205: at(0, -9) })
    assert.ok(!groundChallenges[3].isSolved(at(4, 6)))
    checkExtras(groundExtra, initialGroundState)
})

test('ekuazioak 3. DBH lab: dos balanzas', () => {
    const solved = (system: number): ScalesState => {
        const { x, y } = scalesSolution(SCALE_SYSTEMS[system])
        return setScales(startSystem(system), { x, y })
    }
    assert.deepEqual(SCALE_SYSTEMS.map((pans) => scalesSolution(pans)), [{ x: 3, y: 2 }, { x: 4, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 2 }, { x: 3, y: 1 }])
    for (let system = 0; system < SCALE_SYSTEMS.length; system += 1) {
        assert.ok(scalesLevel(solved(system)))
        // Taking the second balance off the first leaves a single kind of fruit
        const { times, left } = eliminated(SCALE_SYSTEMS[system])
        assert.ok(times >= 1 && (left.a === 0) !== (left.b === 0), `${system}`)
    }
    assert.equal(scalesPrediction(initialScalesState), '>')
    assert.equal(scalesPrediction(startSystem(2)), '<')
    checkChallenges(scalesChallenges, initialScalesState, { 93301: solved(0), 93302: solved(1), 93303: solved(2), 93304: solved(3), 93305: solved(4) })
    checkExtras(scalesExtra, initialScalesState)
})

test('ekuazioak 3. DBH lab: la línea del tiempo de las edades', () => {
    assert.deepEqual(AGES_SCENARIOS.map(agesAnswer), [16, 7, 4, -10, 0])
    assert.equal(agesPrediction(startAges(3)), '<')
    assert.equal(agesPrediction(startAges(4)), '=')
    assert.equal(agesPrediction(initialAgesState), '>')
    // Time cannot go back before the younger one was born
    assert.equal(setAges(startAges(2), -15).t, -5)
    const found = (scenario: number): AgesState => setAges(startAges(scenario), agesAnswer(AGES_SCENARIOS[scenario]))
    for (let scenario = 0; scenario < AGES_SCENARIOS.length; scenario += 1) {
        const { older, younger, times } = AGES_SCENARIOS[scenario]
        const t = agesAnswer(AGES_SCENARIOS[scenario])
        assert.equal(older + t, times * (younger + t))
    }
    checkChallenges(agesChallenges, initialAgesState, { 93401: found(0), 93402: found(1), 93403: found(2), 93404: found(3), 93405: found(4) })
    checkExtras(agesExtra, initialAgesState)
})
