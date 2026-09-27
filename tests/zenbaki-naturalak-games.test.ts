import test from 'node:test'
import assert from 'node:assert/strict'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { checkStep, evaluateExpr, type Expr } from '../src/features/unit-v2/math/expression.ts'
import { naturalsGameModeForPath, naturalsGameProgressIds, naturalsGames } from '../src/pages/dbh1-zenbaki-naturalak-v2/games/info.ts'
import { checkNaturalsPitAnswer, generateNaturalsRaceQuestion, NATURALS_RACE_CIRCUITS, naturalsRaceErrorTips, roundTo } from '../src/pages/dbh1-zenbaki-naturalak-v2/games/race.ts'
import { createHuntRound, digitAt, HUNT_CELLS, huntLevels } from '../src/pages/dbh1-zenbaki-naturalak-v2/games/hunt.ts'
import { createSprintExpression, naturalValue, parseExpression, sprintOperations, sprintTemplates, tapOperation } from '../src/pages/dbh1-zenbaki-naturalak-v2/games/sprint.ts'
import { createNaturalsMemoryBoard, naturalsCardLatex, naturalsCardValue, naturalsMemoryLevels } from '../src/pages/dbh1-zenbaki-naturalak-v2/games/memory.ts'
import { naturalsLabChallengeIds } from '../src/pages/dbh1-zenbaki-naturalak-v2/lab/labTools.ts'

/** Reads an option written in the unit's style: 15.000, 2^{5}, \mathrm{XL}… */
function optionValue(latex: string): number | null {
    const power = latex.match(/^(\d+)\^\{(\d+)\}$/)
    if (power) return Number(power[1]) ** Number(power[2])
    if (/^[\d.]+$/.test(latex)) return Number(latex.replace(/\./g, ''))
    return null
}

test('naturals games: hub, levels, paths and progress ids', () => {
    assert.equal(naturalsGames.length, 4)
    assert.equal(new Set(naturalsGameProgressIds).size, naturalsGameProgressIds.length)
    for (const id of naturalsGameProgressIds) assert.ok(!naturalsLabChallengeIds.includes(id), `${id} is also a lab id`)
    assert.equal(naturalsGames.find((game) => game.id === 'race')!.levels.length, NATURALS_RACE_CIRCUITS)
    assert.equal(naturalsGameModeForPath('/matematika/dbh1/zenbaki-naturalak/jokuak/semaforoa'), 'sprint')
    assert.equal(naturalsGameModeForPath('/matematika/dbh1/zenbaki-naturalak/juegos/carrera'), 'race')
    assert.equal(naturalsGameModeForPath('/matematika/dbh1/zenbaki-naturalak/juegos'), 'hub')
})

test('naturals race: every question has one right option that matches its answer', () => {
    const random = createRandom(2026)
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < NATURALS_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as const) {
            for (let round = 0; round < 150; round += 1) {
                const question = generateNaturalsRaceQuestion(random, circuit, tier)
                kinds.add(question.kind)
                assert.equal(question.options.length, 4)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
                const right = question.options.filter((option) => option.correct)
                assert.equal(right.length, 1)
                const answer = toNumber(question.answer)
                assert.ok(Number.isSafeInteger(answer) && answer >= 0, question.kind)
                assert.equal(optionValue(right[0].latex), answer, `${question.kind}: ${right[0].latex}`)
                for (const option of question.options.filter((item) => !item.correct)) {
                    assert.ok(option.error && naturalsRaceErrorTips[option.error], question.kind)
                    // Same-base powers are compared by how they are written; the rest by value
                    if (question.kind !== 'same-base') assert.notEqual(optionValue(option.latex), answer, `${question.kind}: ${option.latex}`)
                }
                if (question.writable) {
                    assert.equal(checkNaturalsPitAnswer(question, String(answer)), 'correct')
                    assert.equal(checkNaturalsPitAnswer(question, answer.toLocaleString('de-DE')), 'correct', 'written with points')
                }
            }
        }
        assert.ok(generateNaturalsRaceQuestion(random, circuit, 0, true).writable)
    }
    for (const kind of ['digit-value', 'decomposition', 'roman', 'biggest', 'round', 'reverse-round', 'dividend', 'remainder', 'mental', 'problem', 'power', 'ten-power', 'same-base']) {
        assert.ok(kinds.has(kind), kind)
    }
})

test('naturals race: rounding questions round the way the class does', () => {
    assert.equal(roundTo(14823, 1000), 15000)
    assert.equal(roundTo(14500, 1000), 15000)
    assert.equal(roundTo(14499, 1000), 14000)
    const random = createRandom(7)
    for (let round = 0; round < 300; round += 1) {
        const question = generateNaturalsRaceQuestion(random, 1, 2)
        if (question.kind !== 'reverse-round') continue
        const target = Number(question.prompt.es.match(/da ([\d.]+)/)![1].replace(/\./g, ''))
        const place = question.prompt.es.includes('decenas de millar') ? 10000 : question.prompt.es.includes('millares') ? 1000 : 100
        for (const option of question.options) assert.equal(roundTo(optionValue(option.latex)!, place) === target, option.correct, option.latex)
    }
})

test('naturals hunt: every grid has 16 different numbers and 4 to 7 targets', () => {
    const random = createRandom(99)
    for (let level = 0; level < huntLevels.length; level += 1) {
        for (let round = 0; round < 80; round += 1) {
            const grid = createHuntRound(random, level)
            assert.equal(grid.numbers.length, HUNT_CELLS)
            assert.equal(new Set(grid.numbers).size, HUNT_CELLS)
            const targets = grid.numbers.filter(grid.rule.test).length
            assert.ok(targets >= 4 && targets <= 7, `${grid.rule.id}: ${targets}`)
            for (const value of grid.numbers) assert.ok(grid.rule.why(value).es.length > 0)
            if (level === 0) {
                assert.ok(grid.numbers.every((value) => value >= 10000 && value <= 99999), 'five-digit numbers')
                const [, digit, place] = grid.rule.id.split('-').map(Number)
                // Traps: some wrong numbers have the digit in another place
                if (round === 0) assert.ok(grid.numbers.some((value) => !grid.rule.test(value) && String(value).includes(String(digit))))
                assert.ok(grid.numbers.filter(grid.rule.test).every((value) => digitAt(value, place) === digit))
            }
        }
    }
})

test('naturals sprint: expressions stay natural and can be finished tapping in order', () => {
    // Every template reads like the textbook: 20 − (3 + 5) · 2 + 12 : 4 = 7
    const values = { a: 20, b: 3, c: 5, d: 2, e: 4 }
    const tokens = '20 − ( 3 + 5 ) · 2 + 12 : 4'.split(' ').map((token) => (/^\d+$/.test(token) ? { kind: 'num' as const, value: Number(token) } : token === '(' ? { kind: 'open' as const, bracket: 'round' as const } : token === ')' ? { kind: 'close' as const } : { kind: 'op' as const, op: (token === '−' ? '-' : token) as '+' }))
    assert.equal(evaluateExpr(parseExpression(tokens)), 7)
    assert.ok(values)
    assert.equal(sprintTemplates.length, 3)

    const random = createRandom(31)
    for (let level = 0; level < 3; level += 1) {
        for (let round = 0; round < 60; round += 1) {
            let expr: Expr = createSprintExpression(random, level)
            const value = naturalValue(expr)
            assert.ok(value !== null && value >= 0)
            let steps = 0
            while (expr.kind !== 'num') {
                const paths = sprintOperations(expr)
                const next = paths.find((path) => checkStep(expr, path) === 'ok')
                assert.ok(next)
                const wrong = paths.find((path) => checkStep(expr, path) !== 'ok')
                if (wrong) assert.equal(tapOperation(expr, wrong).expr, expr, 'a wrong tap changes nothing')
                expr = tapOperation(expr, next).expr
                steps += 1
            }
            assert.equal(expr.value, value)
            assert.ok(steps >= 3)
        }
    }
})

test('naturals memory: every set shares its value and trap pairs are on the board', () => {
    const random = createRandom(5)
    for (let level = 0; level < naturalsMemoryLevels.length; level += 1) {
        const { groups, groupSize } = naturalsMemoryLevels[level]
        for (let round = 0; round < 60; round += 1) {
            const cards = createNaturalsMemoryBoard(random, level)
            assert.equal(cards.length, groups * groupSize)
            const values = new Map<number, number>()
            for (const card of cards) {
                assert.equal(naturalsCardValue(card), card.value)
                const known = values.get(card.setId)
                if (known !== undefined) assert.equal(known, card.value)
                values.set(card.setId, card.value)
                assert.ok(naturalsCardLatex(card).length > 0)
            }
            assert.equal(new Set(values.values()).size, groups, 'different sets have different values')
        }
    }
    const trio = createNaturalsMemoryBoard(createRandom(1), 2).filter((card) => card.setId === 0)
    const byKind = Object.fromEntries(trio.map((card) => [card.kind, naturalsCardLatex(card)]))
    assert.match(byKind.tens, /10\^\{3\}/)
    assert.ok(byKind.expanded.includes('+'))
})
