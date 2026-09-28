import test from 'node:test'
import assert from 'node:assert/strict'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { geometryGameModeForPath, geometryGameProgressIds, geometryGames } from '../src/pages/dbh1-geometria-v2/games/info.ts'
import { checkGeometryPitAnswer, generateGeometryRaceQuestion, GEOMETRY_RACE_CIRCUITS, geometryRaceErrorTips } from '../src/pages/dbh1-geometria-v2/games/race.ts'
import { ANGLE_ROUNDS, angleLevels, anglePoints, angleStars, createAngleRound, createGeometryMemoryBoard, GEOMETRY_MEMORY_PAIRS, geometryMemoryLevels } from '../src/pages/dbh1-geometria-v2/games/boards.ts'
import { geometryLabChallengeIds } from '../src/pages/dbh1-geometria-v2/lab/labTools.ts'

/** Plain arithmetic: roots, powers, fractions, ·, degrees */
function evaluate(latex: string): number {
    let js = latex.replace(/\^\{\\circ\}/g, '').replace(/A_\{\\(square|triangle)\}=/, '').replace(/(\d)\{,\}(\d)/g, '$1.$2').replace(/\^\{(\d+)\}/g, '**$1').replace(/\\cdot/g, '*')
    for (let pass = 0; pass < 2; pass += 1) js = js.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))').replace(/\\sqrt\{([^{}]+)\}/g, 'Math.sqrt($1)')
    js = js.replace(/\s+/g, '')
    return Function(`return ${js}`)() as number
}

test('geometria 1. DBH games: levels, ids and routes', () => {
    assert.equal(geometryGames.length, 3)
    assert.equal(geometryGames[0].levels.length, GEOMETRY_RACE_CIRCUITS)
    assert.equal(geometryGames.find((game) => game.id === 'angles')!.levels.length, angleLevels.length)
    assert.equal(geometryGames.find((game) => game.id === 'memory')!.levels.length, geometryMemoryLevels.length)
    assert.equal(new Set(geometryGameProgressIds).size, geometryGameProgressIds.length)
    assert.ok(!geometryGameProgressIds.some((id) => geometryLabChallengeIds.includes(id)))
    assert.equal(geometryGameModeForPath('/matematika/dbh1/geometria/juegos/angulos'), 'angles')
})

test('geometria 1. DBH race: four different positive options, one right answer, worked solution matches', () => {
    for (let circuit = 0; circuit < GEOMETRY_RACE_CIRCUITS; circuit += 1) {
        for (let seed = 1; seed <= 120; seed += 1) {
            const random = createRandom(seed * 23 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateGeometryRaceQuestion(random, circuit, tier)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                for (const option of question.options) {
                    assert.ok(evaluate(option.latex) > 0, `${question.kind}: ${option.latex}`)
                    if (!option.correct) assert.ok(geometryRaceErrorTips[option.error!], option.error!)
                }
                const right = question.options.find((option) => option.correct)!
                const value = toNumber(question.answer)
                assert.ok(Math.abs(evaluate(right.latex) - value) < 1e-9, question.kind)
                assert.equal(checkGeometryPitAnswer(question, String(value).replace('.', ',')), 'correct')
                const worked = question.solution.es.replace(/\$/g, '').split('=')
                const results = worked.map(evaluate)
                assert.ok(results.every((result) => Math.abs(result - results[0]) < 1e-6), `${question.kind}: ${question.solution.es}`)
                assert.ok(Math.abs(results[results.length - 1] - value) < 1e-6)
            }
        }
    }
})

test('geometria 1. DBH angle game and memory', () => {
    for (let level = 0; level < angleLevels.length; level += 1) {
        const round = createAngleRound(createRandom(level + 9), level)
        assert.equal(round.length, ANGLE_ROUNDS)
        assert.equal(new Set(round).size, ANGLE_ROUNDS)
        for (const value of round) assert.ok(value > 0 && value < angleLevels[level].max && value % angleLevels[level].step === 0)
    }
    assert.deepEqual([anglePoints(47, 45), anglePoints(58, 45), anglePoints(70, 45), anglePoints(90, 45)], [3, 2, 1, 0])
    assert.equal(angleStars(30), 3)
    for (let level = 0; level < geometryMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cards = createGeometryMemoryBoard(createRandom(seed * 7 + level), level)
            assert.equal(cards.length, GEOMETRY_MEMORY_PAIRS * 2)
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const partner = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!
                assert.ok(Math.abs(evaluate(card.latex) - evaluate(partner.latex)) < 1e-9, `${card.latex} = ${partner.latex}`)
            }
        }
    }
})
