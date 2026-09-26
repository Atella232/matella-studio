import test from 'node:test'
import assert from 'node:assert/strict'
import { gameModeForPath, practiceModeForPath, sectionForPath } from '../src/pages/dbh2-zatikiak-prototype/routing.ts'

test('keeps every legacy fraction URL useful after substitution', () => {
    assert.equal(sectionForPath('/matematika/dbh2/zatikiak'), 'route')
    assert.equal(sectionForPath('/matematika/dbh2/zatikiak/teoria'), 'learn')
    assert.equal(sectionForPath('/matematika/dbh2/zatikiak/laboratorio'), 'lab')
    assert.equal(sectionForPath('/matematika/dbh2/zatikiak/retos'), 'challenges')
    assert.equal(sectionForPath('/matematika/dbh2/zatikiak/misioa'), 'challenges')
    assert.equal(sectionForPath('/matematika/dbh2/zatikiak/ejercicios'), 'practice')
    assert.equal(sectionForPath('/matematika/dbh2/zatikiak/ariketak'), 'practice')
    assert.equal(sectionForPath('/matematika/dbh2/zatikiak/juegos'), 'play')
    assert.equal(sectionForPath('/matematika/dbh2/zatikiak/jokuak/pizza'), 'play')
})

test('opens the matching exercise and game subsection for legacy deep links', () => {
    assert.equal(practiceModeForPath('/matematika/dbh2/zatikiak/ejercicios'), 'bank')
    assert.equal(practiceModeForPath('/prototipo/zatikiak-v2'), 'guided')
    assert.equal(gameModeForPath('/matematika/dbh2/zatikiak/juegos/pizza'), 'wall')
    assert.equal(gameModeForPath('/matematika/dbh2/zatikiak/jokuak/horma'), 'wall')
    assert.equal(gameModeForPath('/matematika/dbh2/zatikiak/jokuak/memory'), 'memory')
    assert.equal(gameModeForPath('/matematika/dbh2/zatikiak/juegos/carrera'), 'race')
    assert.equal(gameModeForPath('/matematika/dbh2/zatikiak/jokuak/lasterketa'), 'race')
    assert.equal(gameModeForPath('/matematika/dbh2/zatikiak/jokuak/itua'), 'target')
    assert.equal(gameModeForPath('/matematika/dbh2/zatikiak/juegos'), 'hub')
    assert.equal(gameModeForPath('/matematika/dbh2/zatikiak/juegos/desconocido'), 'hub')
})
