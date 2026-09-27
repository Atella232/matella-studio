import test from 'node:test'
import assert from 'node:assert/strict'
import { availableSections, exerciseBankSize, totalGoals, type UnitDefinition } from '../src/features/unit-v2/types.ts'
import { practiceModeForPath, sectionForPath } from '../src/features/unit-v2/routing.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import { fraction } from '../src/features/unit-v2/math/fraction.ts'

const text = { eu: 'a', es: 'a', ar: 'a' }
const baseUnit: UnitDefinition = {
    storagePrefix: 'test',
    coursePath: '/matematika/dbh2',
    courseTitle: text,
    title: text,
    documentTitle: text,
    tagline: text,
    heroArt: null,
    pathSubtitle: text,
    stages: [{ id: 's1', tone: 'blue', title: text }],
    topics: [
        { id: 't1', stage: 's1', title: text, goal: text, explanation: text, example: '$1$', takeaway: text },
        { id: 't2', stage: 's1', title: text, goal: text, explanation: text, example: '$2$', takeaway: text }
    ],
    answers: { note: text, placeholder: () => text, wrongForm: () => text, unreadable: text, defaultForm: 'simplified', inputMode: 'text' },
    errorByStage: {}
}

test('unit engine: a unit only offers the sections it has content for', () => {
    assert.deepEqual(availableSections(baseUnit), ['route', 'learn'])
    const full: UnitDefinition = {
        ...baseUnit,
        diagnostic: [{ id: 1, prompt: text, options: [text], correctIndex: 0, explanation: text, topic: 't1' }],
        guidedPractice: [{ id: 1, stage: 's1', prompt: text, expected: fraction(3), hint: text, explanation: text }],
        exerciseBank: [{ id: 'b', title: text, items: [{ id: 1, difficulty: 'easy', question: text, solution: text }, { id: 2, difficulty: 'hard', question: text, solution: text }] }],
        challenges: [{ id: 5, stage: 's1', prompt: text, expected: fraction(-2), hint: text, explanation: text, points: 10, context: 'starter' }],
        lab: { description: text, progressIds: [1, 2, 3], toolForTopic: {}, render: () => null },
        games: { description: text, progressIds: [7, 8], render: () => null }
    }
    assert.deepEqual(availableSections(full), ['route', 'diagnostic', 'learn', 'lab', 'practice', 'challenges', 'play'])
    assert.equal(exerciseBankSize(full), 2)
    assert.equal(totalGoals(baseUnit), 2)
    assert.equal(totalGoals(full), 1 + 2 + 1 + 2 + 1 + 2 + 3)
})

test('unit engine: legacy URLs open the matching section of any V2 unit', () => {
    assert.equal(sectionForPath('/matematika/dbh2/numeros-enteros'), 'route')
    assert.equal(sectionForPath('/matematika/dbh2/numeros-enteros/teoria'), 'learn')
    assert.equal(sectionForPath('/matematika/dbh2/numeros-enteros/laborategia'), 'lab')
    assert.equal(practiceModeForPath('/matematika/dbh2/numeros-enteros/ariketak'), 'bank')
    assert.ok(isUnitV2Path('/matematika/dbh2/numeros-enteros/teoria'))
    assert.ok(isUnitV2Path('/matematika/dbh2/zatikiak'))
    assert.ok(!isUnitV2Path('/matematika/dbh1/numeros-enteros'))
    assert.ok(!isUnitV2Path('/matematika/dbh2/zatikiak-extra'))
})
