import test, { after, before } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createServer } from 'vite'

let server
let exerciseValidation
let exerciseData
let missionValidation
let fractionMath

before(async () => {
    server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
    ;[
        exerciseValidation,
        exerciseData,
        missionValidation,
        fractionMath
    ] = await Promise.all([
        server.ssrLoadModule('/src/pages/dbh2-zatikiak/ExercisesPage/exerciseValidation.ts'),
        server.ssrLoadModule('/src/pages/dbh2-zatikiak/ExercisesPage/exercisesData.ts'),
        server.ssrLoadModule('/src/pages/MissionPage/missionValidation.ts'),
        server.ssrLoadModule('/src/features/fractions/fractionMath.ts')
    ])
})

after(async () => {
    await server?.close()
})

test('validates every mission with exact and localized numeric parsing', () => {
    assert.equal(missionValidation.validateMissionAnswer(2, '0,75'), true)
    assert.equal(missionValidation.validateMissionAnswer(2, '٦/٨'), true)
    assert.equal(missionValidation.validateMissionAnswer(6, '1 2/3 tazas'), true)
    assert.equal(missionValidation.validateMissionAnswer(8, '35 minutos'), true)
    assert.equal(missionValidation.validateMissionAnswer(8, '135 minutos'), false)
    assert.equal(missionValidation.validateMissionAnswer(10, '190 min'), false)
    assert.equal(missionValidation.validateMissionAnswer(11, '12000'), false)
    assert.equal(missionValidation.validateMissionAnswer(12, '6000 litros'), true)
})

test('keeps the corrected water-tank statement aligned in every language', async () => {
    for (const language of ['eu', 'es', 'ar']) {
        const source = JSON.parse(await readFile(new URL(`../src/i18n/locales/${language}.json`, import.meta.url), 'utf8'))
        assert.match(source.missions.challenges.ch12.description, /1800/)
        assert.match(source.missions.challenges.ch12.success, /6000/)
    }
})

test('has an answer specification for all 42 original exercises', () => {
    const exerciseCount = exerciseData.fractionExerciseSections
        .reduce((total, section) => total + section.items.length, 0)
    assert.equal(exerciseCount, 42)
    assert.equal(Object.keys(exerciseValidation.EXERCISE_ANSWER_SPECS).length, exerciseCount)

    for (const section of exerciseData.fractionExerciseSections) {
        for (const item of section.items) {
            assert.ok(exerciseValidation.EXERCISE_ANSWER_SPECS[`${section.id}-${item.id}`])
        }
    }
})

test('checks equivalent, mixed, ordered, textual and open exercise answers', () => {
    const validate = exerciseValidation.validateExerciseAnswer

    assert.equal(validate('suma-resta', 1, '4/8', 'es'), true)
    assert.equal(validate('representacion', 4, '4 5/6', 'es'), true)
    assert.equal(validate('representacion', 2, 'propia, impropia, igual a la unidad', 'es'), true)
    assert.equal(validate('representacion', 2, 'propioa, inpropioa, unitatearen berdina', 'eu'), true)
    assert.equal(validate('representacion', 2, 'حقيقي، غير حقيقي، يساوي الواحد', 'ar'), true)
    assert.equal(validate('equivalentes', 3, 'نعم', 'ar'), true)
    assert.equal(validate('equivalentes', 5, '21/27 y 35/45', 'es'), true)
    assert.equal(validate('comparacion', 1, '1/2 < 2/3 < 3/4', 'es'), true)
    assert.equal(validate('comparacion', 1, '3/4 > 2/3 > 1/2', 'es'), false)
    assert.equal(validate('comparacion', 4, '41/100', 'es'), true)
    assert.equal(validate('comparacion', 4, '1/2', 'es'), false)
    assert.equal(validate('problemas', 2, '١٢ estudiantes', 'es'), true)
})

test('distinguishes exact values from displayed approximations', () => {
    assert.deepEqual(fractionMath.formatDecimal(fractionMath.fraction(3, 8)), { value: '0,375', exact: true })
    assert.deepEqual(fractionMath.formatDecimal(fractionMath.fraction(1, 3)), { value: '0,333', exact: false })
    assert.deepEqual(fractionMath.formatPercentage(fractionMath.fraction(3, 8)), { value: '37,5%', exact: true })
    assert.deepEqual(fractionMath.formatPercentage(fractionMath.fraction(1, 3)), { value: '33,3%', exact: false })
})
