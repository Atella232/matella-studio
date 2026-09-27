import test from 'node:test'
import assert from 'node:assert/strict'
import { availableSections, exerciseBankSize, totalGoals, type UnitDefinition } from '../src/features/unit-v2/types.ts'
import { parseUnitPath, practiceModeForPath, sectionForPath, unitBasePath, unitPathFor } from '../src/features/unit-v2/routing.ts'
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
    assert.ok(isUnitV2Path('/matematika/dbh1/numeros-enteros'))
    assert.ok(!isUnitV2Path('/matematika/dbh1/algebra'))
    assert.ok(!isUnitV2Path('/matematika/dbh2/zatikiak-extra'))
})

test('every place inside a unit has its own address', () => {
    const base = '/matematika/dbh2/divisibilidad'
    assert.equal(unitBasePath(`${base}/teoria/multiples`), base)
    assert.deepEqual(parseUnitPath(`${base}/teoria/multiples`), { section: 'learn', practiceMode: 'guided', detail: 'multiples' })
    assert.deepEqual(parseUnitPath(`${base}/laborategia/sieve`), { section: 'lab', practiceMode: 'guided', detail: 'sieve' })
    assert.deepEqual(parseUnitPath(`${base}/praktika/primes`), { section: 'practice', practiceMode: 'guided', detail: 'primes' })
    assert.equal(parseUnitPath(`${base}/ejercicios`).practiceMode, 'bank')
    assert.equal(parseUnitPath(`${base}/diagnostikoa`).section, 'diagnostic')
    assert.equal(parseUnitPath(`${base}/juegos/carrera`).section, 'play')
    assert.equal(parseUnitPath(`${base}/zerbait`).section, 'route')
    assert.equal(unitPathFor(base, 'route'), base)
    assert.equal(unitPathFor(base, 'learn', 'multiples'), `${base}/teoria/multiples`)
    assert.equal(unitPathFor(base, 'practice', 'primes', 'bank'), `${base}/ariketak/primes`)
    assert.equal(unitPathFor(base, 'challenges'), `${base}/erronkak`)
    for (const section of ['diagnostic', 'learn', 'lab', 'practice', 'challenges', 'play'] as const) {
        assert.equal(parseUnitPath(unitPathFor(base, section, 'x')).section, section)
    }
})

test('every game address opens that game', async () => {
    const units = [
        ['/matematika/dbh2/zatikiak', await import('../src/pages/dbh2-zatikiak-prototype/routing.ts').then((m) => [m.gameSlugs, m.gameModeForPath] as const)],
        ['/matematika/dbh2/divisibilidad', await import('../src/pages/dbh2-zatigarritasuna/games/info.ts').then((m) => [m.divisibilityGameSlugs, m.divisibilityGameModeForPath] as const)],
        ['/matematika/dbh2/numeros-enteros', await import('../src/pages/dbh2-zenbaki-osoak/games/info.ts').then((m) => [m.integerGameSlugs, m.integerGameModeForPath] as const)],
        ['/matematika/dbh1/zenbaki-naturalak', await import('../src/pages/dbh1-zenbaki-naturalak-v2/games/info.ts').then((m) => [m.naturalsGameSlugs, m.naturalsGameModeForPath] as const)]
    ] as const
    for (const [base, [slugs, modeForPath]] of units) {
        for (const [id, slug] of Object.entries(slugs)) {
            const path = unitPathFor(base, 'play', slug)
            assert.equal(parseUnitPath(path).section, 'play')
            assert.equal((modeForPath as (pathname: string) => string)(path), id, path)
        }
        assert.equal((modeForPath as (pathname: string) => string)(unitPathFor(base, 'play')), 'hub')
    }
})
