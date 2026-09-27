import test from 'node:test'
import assert from 'node:assert/strict'
import {
    bracketsChallenges,
    bracketsExercises,
    bracketSlots,
    bracketsValue,
    flattenParts,
    initialBracketsState,
    introCompareChallenges,
    introCountersChallenges,
    introJumpsChallenges,
    introLabChallengeIds,
    introLabToolForTopic,
    introLabTools,
    introLineChallenges,
    introMirrorChallenges,
    introSignsChallenges,
    rightSign,
    setBracketSign,
    signsAllRight,
    startBrackets,
    updateBracketsAnswer
} from '../src/pages/dbh1-zenbaki-osoak-v2/lab/labTools.ts'
import { initialJumpsState, initialSignsState, integerLabChallengeIds, relationOf, setJumps, setSignsDividend, setSignsOp, setSignsSize } from '../src/pages/dbh2-zenbaki-osoak/lab/labTools.ts'

const solved = <State>(challenges: Array<{ id: number; isSolved: (state: State) => boolean }>, id: number, state: State) =>
    challenges.find((challenge) => challenge.id === id)!.isSolved(state)

// Lesson ids of the unit (lessons.tsx cannot be loaded by node --test)
const topics = ['negatives', 'integer-set', 'number-line', 'compare', 'order', 'absolute', 'opposite', 'compare-absolute', 'add-same', 'add-different', 'subtract', 'brackets', 'multiply', 'divide']

test('zenbaki osoak 1. DBH lab: seven tools, every lesson has one and ids are unique', () => {
    assert.equal(introLabTools.length, 7)
    assert.equal(introLabChallengeIds.length, 28)
    assert.equal(new Set(introLabChallengeIds).size, 28)
    for (const topic of topics) assert.ok(introLabTools.some((tool) => tool.id === introLabToolForTopic[topic]), topic)
    for (const tool of introLabTools) assert.ok(topics.includes(tool.lessonTopic), tool.id)
    // Its own progress ids, even though the tools are shared with 2. DBH
    assert.ok(!introLabChallengeIds.some((id) => integerLabChallengeIds.includes(id)))
})

test('zenbaki osoak 1. DBH lab: shared tools with first-year challenges', () => {
    assert.ok(solved(introLineChallenges, 2102, { context: 'temperature', value: -5 }))
    assert.ok(!solved(introLineChallenges, 2102, { context: 'plain', value: -5 }))
    assert.ok(solved(introLineChallenges, 2104, { context: 'sea', value: 9 }))
    assert.ok(solved(introCompareChallenges, 2202, { first: -4, second: -7, guess: relationOf(-4, -7) }))
    assert.ok(!solved(introCompareChallenges, 2202, { first: -4, second: -7, guess: '<' }))
    assert.ok(solved(introMirrorChallenges, 2303, { value: -4, showOpposite: true }))
    assert.ok(solved(introCountersChallenges, 2404, { positive: 4, negative: 6 }))
    assert.ok(solved(introJumpsChallenges, 2504, { ...setJumps(initialJumpsState, { start: -6, op: 'subtract', amount: -1 }), answer: '−5' }))
    assert.ok(solved(introJumpsChallenges, 2503, { ...setJumps(initialJumpsState, { start: 5, op: 'subtract', amount: 2 }), answer: '3' }))
    let signs = setSignsSize({ ...initialSignsState, groups: 5 }, -3)
    assert.ok(solved(introSignsChallenges, 2701, { ...signs, answer: '−15' }))
    signs = setSignsDividend(setSignsSize(setSignsOp(initialSignsState, 'divide'), -4), 20)
    assert.ok(solved(introSignsChallenges, 2703, { ...signs, answer: '-5' }))
    signs = setSignsDividend(signs, -20)
    assert.ok(solved(introSignsChallenges, 2704, { ...signs, answer: '+5' }))
})

test('zenbaki osoak 1. DBH lab: removing brackets', () => {
    assert.deepEqual(bracketsExercises.map((item) => bracketsValue(item.parts)), [-6, 11, 3, -11])
    assert.deepEqual(flattenParts(bracketsExercises[3].parts), [-4, -5, 7, -4, -5])
    for (const exercise of bracketsExercises) {
        let state = startBrackets(exercise.id)
        for (const slot of bracketSlots(exercise.parts)) state = setBracketSign(state, slot, rightSign(exercise.parts, slot))
        assert.ok(signsAllRight(state))
        state = updateBracketsAnswer(state, { answer: String(bracketsValue(exercise.parts)).replace('-', '−'), checked: true })
        assert.ok(solved(bracketsChallenges, 2600 + exercise.id, state), `exercise ${exercise.id}`)
    }
    // A wrong sign keeps the exercise open, even with the right result typed
    let state = setBracketSign(initialBracketsState, '0-0', '+')
    for (const slot of ['0-1', '0-2']) state = setBracketSign(state, slot, rightSign(bracketsExercises[0].parts, slot))
    state = updateBracketsAnswer(state, { answer: '−6', checked: true })
    assert.ok(!signsAllRight(state) && !solved(bracketsChallenges, 2601, state))
    // Revealing the result does not count
    assert.deepEqual(updateBracketsAnswer({ ...state, signs: { '0-0': '-', '0-1': '-', '0-2': '+' } }, { revealed: true, checked: true, answer: '−6' }).finished, [])
})
