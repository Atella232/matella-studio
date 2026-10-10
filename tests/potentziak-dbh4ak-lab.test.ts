import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { powersChallenges, scientificChallenges } from '../src/pages/dbh4-aplikatuak-errealak/lab/labTools.ts'
import {
    changeChallenges,
    changeLog,
    commonChallenges,
    commonOf,
    conjugateChallenges,
    conjugateOf,
    extractChallenges,
    extractOf,
    extractRadicand,
    fractionalChallenges,
    fractionalValue,
    initialChangeState,
    initialCommonState,
    initialConjugateState,
    initialExtractState,
    initialFractionalState,
    initialLadderState,
    initialRationalizeState,
    initialRulesState,
    ladderChallenges,
    ladderLog,
    ladderValue,
    powersLabChallengeIds,
    powersLabToolForTopic,
    powersLabTools,
    rationalizeChallenges,
    rationalizeOf,
    rulesChallenges,
    rulesValue,
    setRationalize,
    setRules,
    type ChangeState,
    type CommonState,
    type ConjugateState,
    type ExtractState,
    type FractionalState,
    type LadderState,
    type RationalizeState,
    type RulesState
} from '../src/pages/dbh4-akademikoak-potentziak/lab/labTools.ts'

const topics = ['integer-powers', 'power-rules', 'scientific', 'roots', 'fractional', 'equivalent', 'extract', 'add-radicals', 'multiply-radicals', 'rationalize-square', 'rationalize-index', 'conjugate', 'log-definition', 'log-properties', 'change-base']
const stages = ['powers', 'radicals', 'operations', 'rationalize', 'logarithms']
const solvedIds = <State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, state: State) => challenges.filter((challenge) => challenge.isSolved(state)).map((challenge) => challenge.id)
/** Each challenge is solved by its own solution, and the starting state solves none */
function checkChallenges<State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, solutions: State[], start: State) {
    assert.equal(solutions.length, challenges.length)
    solutions.forEach((state, index) => assert.ok(solvedIds(challenges, state).includes(challenges[index].id), `${challenges[index].id}`))
    assert.deepEqual(solvedIds(challenges, start), [])
}

test('potentziak 4. DBH ak lab: tools, topics and challenge ids', () => {
    assert.equal(powersLabTools.length, 10)
    for (const tool of powersLabTools) {
        assert.ok(stages.includes(tool.stage), tool.id)
        assert.ok(topics.includes(tool.lessonTopic), tool.id)
        assert.ok(!tool.observe.es.includes('$'), tool.id)
        assert.ok(!/\d,\d/.test(tool.observe.ar + tool.title.ar), tool.id)
    }
    for (const stage of stages) assert.ok(powersLabTools.some((tool) => tool.stage === stage), stage)
    for (const topic of topics) assert.ok(powersLabTools.some((tool) => tool.id === powersLabToolForTopic[topic]), topic)
    assert.equal(new Set(powersLabChallengeIds).size, powersLabChallengeIds.length)
    for (const borrowed of [powersChallenges, scientificChallenges]) assert.ok(borrowed.every((challenge) => powersLabChallengeIds.includes(challenge.id)))
    for (const challenges of [rulesChallenges, fractionalChallenges, commonChallenges, extractChallenges, rationalizeChallenges, conjugateChallenges, ladderChallenges, changeChallenges] as Array<Array<{ id: number; prompt: Record<string, string>; hint: Record<string, string> }>>) {
        for (const challenge of challenges) {
            assert.ok(!challenge.prompt.ar.includes('{,}') && !challenge.hint.ar.includes('{,}'), `${challenge.id}`)
            for (const language of ['eu', 'es', 'ar']) {
                for (const text of [challenge.prompt[language], challenge.hint[language]]) {
                    for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
                        katex.renderToString(formula, { throwOnError: true })
                        assert.ok(!/[؀-ۿ]/.test(formula), `${challenge.id} ${formula}`)
                    }
                }
            }
        }
    }
})

test('potentziak 4. DBH ak lab: the factorizing machine', () => {
    assert.equal(toNumber(rulesValue({ m: 3, n: 2 })), 48)
    assert.equal(toNumber(rulesValue({ m: 1, n: 2 })), 1 / 3)
    assert.equal(setRules(initialRulesState, { m: 9 }).m, 5)
    const solutions: RulesState[] = [{ m: 3, n: 2 }, { m: 1, n: 2 }, { m: -2, n: -2 }]
    checkChallenges(rulesChallenges, solutions, initialRulesState)
})

test('potentziak 4. DBH ak lab: fractional exponents', () => {
    // bases: 4, 8, 9, 16, 25, 27, 32, 64, 81
    assert.equal(toNumber(fractionalValue({ base: 1, p: 2, q: 3 })!), 4)
    assert.equal(fractionalValue({ base: 1, p: 1, q: 2 }), null)
    const solutions: FractionalState[] = [{ base: 1, p: 2, q: 3 }, { base: 3, p: -3, q: 4 }, { base: 2, p: 3, q: 2 }, { base: 7, p: 5, q: 6 }]
    checkChallenges(fractionalChallenges, solutions, initialFractionalState)
})

test('potentziak 4. DBH ak lab: common index', () => {
    assert.deepEqual(commonOf({ firstIndex: 2, firstRadicand: 2, secondIndex: 3, secondRadicand: 3 }), { index: 6, first: 8, second: 9 })
    const solutions: CommonState[] = [
        { firstIndex: 2, firstRadicand: 2, secondIndex: 3, secondRadicand: 3 },
        { firstIndex: 4, firstRadicand: 3, secondIndex: 3, secondRadicand: 5 },
        { firstIndex: 2, firstRadicand: 2, secondIndex: 4, secondRadicand: 4 }
    ]
    checkChallenges(commonChallenges, solutions, initialCommonState)
})

test('potentziak 4. DBH ak lab: factors out of a root', () => {
    assert.equal(extractRadicand({ exponents: [3, 4, 1], index: 3 }), 3240)
    assert.deepEqual(extractOf({ exponents: [3, 4, 1], index: 3 }), { outside: 6, inside: 15 })
    const solutions: ExtractState[] = [
        { exponents: [3, 4, 1], index: 3 },
        { exponents: [0, 4, 1], index: 4 },
        { exponents: [5, 0, 0], index: 5 },
        { exponents: [4, 1, 0], index: 3 }
    ]
    checkChallenges(extractChallenges, solutions, initialExtractState)
})

test('potentziak 4. DBH ak lab: rationalizing', () => {
    // 4 / ∛2 = 4∛4 / 2 = 2∛4
    assert.deepEqual(rationalizeOf({ numerator: 4, base: 0, index: 3, exponent: 1 }), { b: 2, missing: 2, factorRadicand: 4, coefficient: 2, denominator: 1 })
    // The exponent never reaches the index
    assert.equal(setRationalize({ numerator: 1, base: 0, index: 5, exponent: 4 }, { index: 3 }).exponent, 2)
    const solutions: RationalizeState[] = [
        { numerator: 5, base: 0, index: 3, exponent: 1 },
        { numerator: 1, base: 1, index: 5, exponent: 2 },
        { numerator: 6, base: 0, index: 4, exponent: 1 }
    ]
    checkChallenges(rationalizeChallenges, solutions, initialRationalizeState)
})

test('potentziak 4. DBH ak lab: the conjugate', () => {
    assert.deepEqual(conjugateOf({ numerator: 4, a: 5, b: 1 }).coefficient, { numerator: 1, denominator: 1 })
    assert.equal(conjugateOf({ numerator: 4, a: 3, b: 3 }).coefficient, null)
    const solutions: ConjugateState[] = [{ numerator: 2, a: 3, b: 2 }, { numerator: 4, a: 5, b: 1 }, { numerator: 3, a: 2, b: 5 }]
    checkChallenges(conjugateChallenges, solutions, initialConjugateState)
})

test('potentziak 4. DBH ak lab: the ladder of logarithms', () => {
    // bases: 2, 3, 5, 10, 1/2
    for (const base of [0, 1, 2, 3, 4]) for (const exponent of [-4, -1, 0, 2, 6]) assert.equal(toNumber(ladderLog({ base, exponent })!), exponent, `${base} ${exponent}`)
    assert.equal(toNumber(ladderValue({ base: 4, exponent: -3 })), 8)
    const solutions: LadderState[] = [{ base: 0, exponent: 5 }, { base: 2, exponent: -2 }, { base: 4, exponent: -3 }, { base: 3, exponent: -3 }]
    checkChallenges(ladderChallenges, solutions, initialLadderState)
})

test('potentziak 4. DBH ak lab: change of base', () => {
    assert.ok(Math.abs(changeLog({ base: 2, value: 20 }) - 1.861) < 0.001)
    const solutions: ChangeState[] = [{ base: 2, value: 20 }, { base: 0, value: 40 }, { base: 1, value: 81 }]
    checkChallenges(changeChallenges, solutions, initialChangeState)
})
