import test, { after, before } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createServer } from 'vite'

let server
let fractionRace
let raceScoring
let raceErrors
let raceRivals
let raceProgress
let raceRules
let exerciseValidation
let exerciseData
let missionValidation
let memoryFractions
let fractionMath

before(async () => {
    server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
    ;[
        fractionRace,
        raceScoring,
        raceErrors,
        raceRivals,
        raceProgress,
        raceRules,
        exerciseValidation,
        exerciseData,
        missionValidation,
        memoryFractions,
        fractionMath
    ] = await Promise.all([
        server.ssrLoadModule('/src/features/games/FractionRace/utils/fractions.ts'),
        server.ssrLoadModule('/src/features/games/FractionRace/utils/scoring.ts'),
        server.ssrLoadModule('/src/features/games/FractionRace/utils/errorAnalysis.ts'),
        server.ssrLoadModule('/src/features/games/FractionRace/utils/rivals.ts'),
        server.ssrLoadModule('/src/features/games/FractionRace/utils/progress.ts'),
        server.ssrLoadModule('/src/features/games/FractionRace/utils/raceRules.ts'),
        server.ssrLoadModule('/src/pages/dbh2-zatikiak/ExercisesPage/exerciseValidation.ts'),
        server.ssrLoadModule('/src/pages/dbh2-zatikiak/ExercisesPage/exercisesData.ts'),
        server.ssrLoadModule('/src/pages/MissionPage/missionValidation.ts'),
        server.ssrLoadModule('/src/features/games/FractionMemory/utils/fractions.ts'),
        server.ssrLoadModule('/src/features/fractions/fractionMath.ts')
    ])
})

after(async () => {
    await server?.close()
})

function asRational(value) {
    const sign = value.isNegative ? -1 : 1
    if ('whole' in value) {
        return normalize(sign * (Math.abs(value.whole) * value.denominator + value.numerator), value.denominator)
    }
    return normalize(sign * value.numerator, value.denominator)
}

function normalize(numerator, denominator) {
    if (numerator === 0) return [0, 1]
    if (denominator < 0) {
        numerator = -numerator
        denominator = -denominator
    }

    let left = Math.abs(numerator)
    let right = Math.abs(denominator)
    while (right) [left, right] = [right, left % right]
    const divisor = left || 1
    return [numerator / divisor, denominator / divisor]
}

function evaluateTree(node) {
    if (node.type === 'fraction') return asRational(node.value)
    if (node.type === 'number') return [node.value, 1]

    const [leftNumerator, leftDenominator] = evaluateTree(node.left)
    const [rightNumerator, rightDenominator] = evaluateTree(node.right)

    if (node.operator === '+') {
        return normalize(
            leftNumerator * rightDenominator + rightNumerator * leftDenominator,
            leftDenominator * rightDenominator
        )
    }
    if (node.operator === '-') {
        return normalize(
            leftNumerator * rightDenominator - rightNumerator * leftDenominator,
            leftDenominator * rightDenominator
        )
    }
    if (node.operator === '×') {
        return normalize(leftNumerator * rightNumerator, leftDenominator * rightDenominator)
    }
    if (node.operator === '÷') {
        return normalize(leftNumerator * rightDenominator, leftDenominator * rightNumerator)
    }
    if (node.operator === '^') {
        return normalize(leftNumerator ** rightNumerator, leftDenominator ** rightNumerator)
    }

    throw new Error(`Unsupported operator: ${node.operator}`)
}

test('keeps negative intermediate results in every fraction operation', () => {
    const negative = fractionRace.subtractFractions(
        { numerator: 1, denominator: 3 },
        { numerator: 5, denominator: 6 }
    )

    assert.deepEqual(asRational(negative), [-1, 2])
    assert.deepEqual(asRational(fractionRace.addFractions(negative, { numerator: 1, denominator: 4 })), [-1, 4])
    assert.deepEqual(asRational(fractionRace.multiplyFractions(negative, { numerator: 2, denominator: 3 })), [-1, 3])
    assert.deepEqual(asRational(fractionRace.divideFractions(negative, { numerator: 3, denominator: 2 })), [-1, 3])
})

test('generates mathematically correct combined race operations', () => {
    for (const level of [9, 10, 11]) {
        for (let iteration = 0; iteration < 1000; iteration += 1) {
            const operation = fractionRace.generateOperation(level)
            assert.deepEqual(asRational(operation.simplifiedResult), evaluateTree(operation.displayTree))
        }
    }
})

test('never generates division by zero in combined race operations', () => {
    for (const level of [9, 10, 11]) {
        for (let iteration = 0; iteration < 5000; iteration += 1) {
            const operation = fractionRace.generateOperation(level)
            assert.ok(Number.isFinite(operation.simplifiedResult.numerator))
            assert.ok(Number.isFinite(operation.simplifiedResult.denominator))
            assert.ok(operation.simplifiedResult.denominator > 0)
        }
    }
})

test('uses simplified correct answers consistently in every race mode', () => {
    for (let level = 0; level < 12; level += 1) {
        for (let iteration = 0; iteration < 250; iteration += 1) {
            const operation = fractionRace.generateOperation(level)
            const options = fractionRace.generateAnswerOptions(operation)
            const correct = options.find(option => option.isCorrect)?.fraction
            assert.deepEqual(asRational(correct), asRational(operation.simplifiedResult))
            assert.deepEqual(correct, operation.simplifiedResult)
        }
    }
})

test('applies transparent combo and turbo scoring rules', () => {
    const firstFastAnswer = raceScoring.calculateScoreResult(0, true, true)
    assert.equal(firstFastAnswer.combo, 1)
    assert.equal(firstFastAnswer.turboActive, false)
    assert.deepEqual(firstFastAnswer.breakdown, {
        basePoints: 10,
        speedBonus: 5,
        comboBonus: 0,
        turboBonus: 0,
        total: 15,
        comboReset: false
    })

    const turboAnswer = raceScoring.calculateScoreResult(2, true, true)
    assert.equal(turboAnswer.combo, 3)
    assert.equal(turboAnswer.turboActive, true)
    assert.deepEqual(turboAnswer.breakdown, {
        basePoints: 10,
        speedBonus: 5,
        comboBonus: 4,
        turboBonus: 5,
        total: 24,
        comboReset: false
    })

    const missedAnswer = raceScoring.calculateScoreResult(3, false, true)
    assert.equal(missedAnswer.combo, 0)
    assert.equal(missedAnswer.turboActive, false)
    assert.equal(missedAnswer.breakdown.total, 0)
    assert.equal(missedAnswer.breakdown.comboReset, true)
})

test('respects the selected operation and mixed-number options', () => {
    for (let iteration = 0; iteration < 200; iteration += 1) {
        assert.equal(fractionRace.generateOperation(0, { operationFilter: 'addition' }).operator, '+')
        assert.equal(fractionRace.generateOperation(0, { operationFilter: 'subtraction' }).operator, '-')
        assert.equal(fractionRace.generateOperation(3, { operationFilter: 'multiplication' }).operator, '×')
        assert.equal(fractionRace.generateOperation(3, { operationFilter: 'division' }).operator, '÷')
        assert.equal(fractionRace.generateOperation(2, { includeMixed: false }).isMixed, false)
    }

    const mixedOperations = Array.from({ length: 300 }, () => (
        fractionRace.generateOperation(2, { includeMixed: true })
    ))
    assert.equal(mixedOperations.some(operation => operation.isMixed), true)
})

test('identifies pedagogically useful error categories', () => {
    const addOperation = {
        left: { numerator: 1, denominator: 2 },
        right: { numerator: 1, denominator: 3 },
        operator: '+',
        result: { numerator: 5, denominator: 6 },
        rawResult: { numerator: 5, denominator: 6 },
        simplifiedResult: { numerator: 5, denominator: 6 },
        isMixed: false
    }
    assert.equal(raceErrors.analyzeErrorCategory(
        addOperation,
        { numerator: 2, denominator: 5 },
        { numerator: 5, denominator: 6 }
    ), 'commonDenominator')

    assert.equal(raceErrors.analyzeErrorCategory(
        { ...addOperation, operator: '÷' },
        { numerator: 3, denominator: 2 },
        { numerator: 3, denominator: 1 }
    ), 'inverse')
})

test('gives every rival a distinct race profile', () => {
    const sprinter = { personality: 'sprinter' }
    const comeback = { personality: 'comeback' }
    const steady = { personality: 'steady' }
    assert.ok(raceRivals.getPersonalityPace(sprinter, 0.2) > raceRivals.getPersonalityPace(sprinter, 0.8))
    assert.ok(raceRivals.getPersonalityPace(comeback, 0.8) > raceRivals.getPersonalityPace(comeback, 0.2))
    assert.equal(raceRivals.getPersonalityPace(steady, 0.2), raceRivals.getPersonalityPace(steady, 0.8))
})

test('updates personal records and achievements without losing history', () => {
    const first = raceProgress.updateRaceRecord(undefined, {
        score: 80,
        elapsedTime: 55,
        correctAnswers: 5,
        attempts: 5,
        rank: 1,
        completed: true
    })
    assert.equal(first.record.racesPlayed, 1)
    assert.equal(first.record.wins, 1)
    assert.equal(first.record.perfectRaces, 1)
    assert.equal(first.achievements.firstWin, true)
    assert.equal(first.achievements.perfectRace, true)

    const second = raceProgress.updateRaceRecord(first.record, {
        score: 60,
        elapsedTime: 70,
        correctAnswers: 3,
        attempts: 5,
        rank: 3,
        completed: true
    })
    assert.equal(second.record.racesPlayed, 2)
    assert.equal(second.record.bestScore, 80)
    assert.equal(second.record.bestTime, 55)
    assert.equal(second.record.bestAccuracy, 1)
})

test('enforces sprint and perfect-race ending rules', () => {
    const classic = { format: 'classic', questionCount: 5, operationFilter: 'default', includeMixed: false }
    const sprint = { ...classic, format: 'sprint' }
    const perfect = { ...classic, format: 'perfect' }

    assert.equal(raceRules.getRaceQuestionLimit(classic), 5)
    assert.equal(raceRules.getRaceQuestionLimit(sprint), 20)
    assert.equal(raceRules.sprintTimeExpired(sprint, 59), false)
    assert.equal(raceRules.sprintTimeExpired(sprint, 60), true)
    assert.equal(raceRules.perfectRaceFailed(perfect, true), false)
    assert.equal(raceRules.perfectRaceFailed(perfect, false), true)
})

test('respects the configured maximum exponent', () => {
    for (const [level, maximum] of [[6, 2], [7, 3], [8, 3]]) {
        for (let iteration = 0; iteration < 500; iteration += 1) {
            const operation = fractionRace.generateOperation(level)
            assert.ok(operation.right >= 2)
            assert.ok(operation.right <= maximum)
        }
    }
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

test('includes every new race feature in all supported languages', async () => {
    for (const language of ['eu', 'es', 'ar']) {
        const source = JSON.parse(await readFile(new URL(`../src/i18n/locales/${language}.json`, import.meta.url), 'utf8'))
        const race = source.games.fractionRace
        assert.ok(race.formats.classic.name)
        assert.ok(race.formats.sprint.description)
        assert.ok(race.formats.perfect.description)
        assert.ok(race.errorInsights.commonDenominator)
        assert.ok(race.rivalPersonalities.comeback)
        assert.ok(race.achievements.perfectRace)
        assert.ok(race.rewardTiers.attempt)
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

test('only creates exact decimal and percentage memory cards', () => {
    for (let game = 0; game < 200; game += 1) {
        for (const card of memoryFractions.createCards(3)) {
            if (card.type === 'decimal') {
                assert.equal(memoryFractions.hasTerminatingDecimal(card.numerator, card.denominator), true)
            }
            if (card.type === 'percentage') {
                assert.equal(memoryFractions.hasTerminatingPercentage(card.numerator, card.denominator), true)
            }
        }
    }
})

test('distinguishes exact values from displayed approximations', () => {
    assert.deepEqual(fractionMath.formatDecimal(fractionMath.fraction(3, 8)), { value: '0,375', exact: true })
    assert.deepEqual(fractionMath.formatDecimal(fractionMath.fraction(1, 3)), { value: '0,333', exact: false })
    assert.deepEqual(fractionMath.formatPercentage(fractionMath.fraction(3, 8)), { value: '37,5%', exact: true })
    assert.deepEqual(fractionMath.formatPercentage(fractionMath.fraction(1, 3)), { value: '33,3%', exact: false })
})
