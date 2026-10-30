import test, { after, before } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createServer } from 'vite'

let server
let missionValidation
let fractionMath

before(async () => {
    server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
    ;[
        missionValidation,
        fractionMath
    ] = await Promise.all([
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
    for (const language of ['eu', 'es', 'en', 'ar']) {
        const source = JSON.parse(await readFile(new URL(`../src/i18n/locales/${language}.json`, import.meta.url), 'utf8'))
        // The number may be grouped (1.800 or 1,800) depending on the language
        assert.match(source.missions.challenges.ch12.description, /1[.,\s\u00a0\u202f]?800/)
        assert.match(source.missions.challenges.ch12.success, /6[.,\s\u00a0\u202f]?000/)
    }
})

test('distinguishes exact values from displayed approximations', () => {
    assert.deepEqual(fractionMath.formatDecimal(fractionMath.fraction(3, 8)), { value: '0,375', exact: true })
    assert.deepEqual(fractionMath.formatDecimal(fractionMath.fraction(1, 3)), { value: '0,333', exact: false })
    assert.deepEqual(fractionMath.formatPercentage(fractionMath.fraction(3, 8)), { value: '37,5%', exact: true })
    assert.deepEqual(fractionMath.formatPercentage(fractionMath.fraction(1, 3)), { value: '33,3%', exact: false })
})
