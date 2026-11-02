import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { checkChain, typed, valueOf } from './helpers/realsRaceCheck.ts'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { hasTerminatingDecimal, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createSolidsMemoryBoard, SOLIDS_MEMORY_PAIRS, solidsMemoryLevels } from '../src/pages/dbh2-gorputzak-v2/games/boards.ts'
import { solidsGameModeForPath, solidsGameProgressIds, solidsGames } from '../src/pages/dbh2-gorputzak-v2/games/info.ts'
import { checkSolidsPitAnswer, generateSolidsRaceQuestion, SOLIDS_RACE_CIRCUITS, solidsParTime, solidsRaceErrorTips, type SolidsRaceQuestion } from '../src/pages/dbh2-gorputzak-v2/games/race.ts'
import { solidsLabChallengeIds } from '../src/pages/dbh2-gorputzak-v2/lab/labTools.ts'
import { createSolidsDetectiveCases, solidsDetectiveLevels, solidsDetectiveNames, solidsDetectiveTips } from '../src/pages/dbh2-gorputzak-v2/games/detective.ts'
import { createEulerRounds, drawnCounts, eulerRight, EULER_ROUNDS, solidName } from '../src/pages/dbh2-gorputzak-v2/games/euler.ts'
import { createTankRounds, tankCapacity, tankRight, TANK_ROUNDS } from '../src/pages/dbh2-gorputzak-v2/games/tank.ts'
import { checkTexts } from './helpers/ownGamesCheck.ts'

const renders = (latex: string) => katex.renderToString(latex, { throwOnError: true, strict: 'error' })

function checkQuestion(question: SolidsRaceQuestion): number {
    assert.equal(question.options.length, 4, question.kind)
    assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
    assert.equal(question.options.filter((option) => option.correct).length, 1, question.kind)
    const answer = toNumber(question.answer)
    assert.ok(answer > 0, question.kind)
    for (const option of question.options) {
        renders(option.latex)
        const value = valueOf(option.latex)
        assert.ok(value !== null && value > 0, `${question.kind}: ${option.latex}`)
        if (option.correct) assert.ok(Math.abs(value! - answer) < 1e-9, `${question.kind}: ${option.latex} ≠ ${answer}`)
        else {
            assert.ok(solidsRaceErrorTips[option.error!], `${question.kind}: ${option.error}`)
            assert.ok(Math.abs(value! - answer) > 1e-9, `${question.kind}: wrong option ${option.latex} equals the answer`)
        }
    }
    for (const language of ['eu', 'es', 'en', 'ar'] as const) {
        for (const text of [question.prompt[language], question.solution[language]]) for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) renders(formula)
        assert.ok(!question.prompt[language].includes('?') || question.prompt[language].trim().length > 10)
    }
    assert.ok(!question.prompt.ar.includes('{,}') && !question.solution.ar.includes('{,}'), question.kind)
    assert.ok(question.writable && hasTerminatingDecimal(question.answer), question.kind)
    const comma = typed(question.answer)
    for (const input of [comma, comma.replace(',', '.'), `${comma} cm²`, `${comma} cm³`, `${comma} L`]) assert.equal(checkSolidsPitAnswer(question, input), 'correct', `${question.kind}: ${input}`)
    return checkChain(question.solution.es, question.kind)
}

test('gorputzak 2. DBH games: levels, ids and routes', () => {
    assert.equal(solidsGames.length, 5)
    assert.equal(solidsGames[0].levels.length, SOLIDS_RACE_CIRCUITS)
    assert.equal(solidsGames.find((game) => game.id === 'memory')!.levels.length, solidsMemoryLevels.length)
    assert.equal(new Set(solidsGameProgressIds).size, solidsGameProgressIds.length)
    assert.ok(!solidsGameProgressIds.some((id) => solidsLabChallengeIds.includes(id)))
    const stages = ['polyhedra', 'areas', 'round', 'units', 'volume']
    for (const game of solidsGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.equal(solidsGameModeForPath('/matematika/dbh2/cuerpos-geometricos/juegos/carrera'), 'race')
    assert.equal(solidsGameModeForPath('/matematika/dbh2/cuerpos-geometricos/jokuak/memoria'), 'memory')
    assert.equal(solidsGameModeForPath('/matematika/dbh2/cuerpos-geometricos/jokuak'), 'hub')
})

test('gorputzak 2. DBH race: every circuit has valid questions, typical mistakes and written answers', () => {
    const kinds = new Set<string>()
    let chains = 0
    for (let circuit = 0; circuit < SOLIDS_RACE_CIRCUITS; circuit += 1) {
        for (let seed = 1; seed <= 150; seed += 1) {
            const random = createRandom(seed * 13 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateSolidsRaceQuestion(random, circuit, tier)
                assert.equal(question.circuit, circuit)
                kinds.add(`${circuit}:${question.kind}`)
                chains += checkQuestion(question)
            }
        }
        assert.ok(solidsParTime(circuit) > 60000)
    }
    for (const kind of ['0:count-faces', '0:count-edges', '0:count-vertices', '0:euler-faces', '0:euler-vertices', '0:euler-edges', '1:cube', '1:cuboid', '1:pyramid-apothem', '1:pyramid-height', '2:cylinder', '2:cylinder-diameter', '2:cone', '2:cone-height', '2:sphere', '2:sphere-diameter', '3:units', '3:litres', '3:tank-dm', '3:tank-cm', '4:prism-volume', '4:cylinder-volume', '4:pyramid-volume', '4:cone-volume', '4:sphere-volume']) assert.ok(kinds.has(kind), `never generated: ${kind}`)
    assert.ok(chains > 1500, `only ${chains} worked lines checked`)
})

test('gorputzak 2. DBH race: the typical mistakes show up', () => {
    const errors = new Set<string>()
    for (let seed = 1; seed <= 200; seed += 1) {
        const random = createRandom(seed)
        for (let circuit = 0; circuit < SOLIDS_RACE_CIRCUITS; circuit += 1) {
            for (const tier of [0, 2] as const) for (const option of generateSolidsRaceQuestion(random, circuit, tier).options) if (option.error) errors.add(option.error)
        }
    }
    for (const error of Object.keys(solidsRaceErrorTips).filter((error) => error !== 'calculation')) assert.ok(errors.has(error), `never used: ${error}`)
})

test('gorputzak 2. DBH memory: every card has exactly one partner and the pair is true', () => {
    /** Value of a card: a number, or an amount with a unit turned into cm³ */
    const cardValue = (latex: string) => {
        const unit = latex.match(/\\ \\text\{(m|dm|cm|L|mL)\}/)?.[1]
        const factor = unit ? { m: 1_000_000, dm: 1000, L: 1000, cm: 1, mL: 1 }[unit] : 1
        return valueOf(latex.replace(/\\ \\text\{[^}]*\}(\^\{3\})?/, ''))! * factor
    }
    for (let level = 0; level < solidsMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const cards = createSolidsMemoryBoard(createRandom(seed + level * 100), level)
            assert.equal(cards.length, SOLIDS_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) {
                renders(card.latex)
                const partner = cards.find((other) => other.setId === card.setId && other.id !== card.id)!
                const a = cardValue(card.latex)
                const b = cardValue(partner.latex)
                assert.ok(Number.isFinite(a) && Math.abs(a - b) < 1e-6, `${card.latex} ≠ ${partner.latex}`)
                for (const other of cards.filter((item) => item.setId !== card.setId)) assert.ok(Math.abs(cardValue(other.latex) - a) > 1e-6, `${card.latex} ~ ${other.latex}`)
            }
        }
    }
})

/* ---------- The games of this topic ---------- */

test('gorputzak 2. DBH count and Euler: the drawing has the counts of the formulas, which keep Euler', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 120; seed += 1) {
            const rounds = createEulerRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, EULER_ROUNDS)
            for (const round of rounds) {
                const { faces, vertices, edges } = round.counts
                assert.equal(faces + vertices, edges + 2)
                checkTexts([solidName(round)])
                if (level < 2) {
                    assert.deepEqual(drawnCounts(round), round.counts, `${round.kind} ${round.sides}`)
                    assert.equal(round.unknown, null)
                } else {
                    assert.equal(round.vertices.length, 0)
                    assert.ok(round.unknown)
                }
                assert.ok(eulerRight(round, round.counts))
                assert.ok(!eulerRight(round, { ...round.counts, edges: round.counts.edges + 1 }) || (round.unknown !== null && round.unknown !== 'edges'))
            }
        }
    }
})

test('gorputzak 2. DBH fill the tank: whole litres for boxes, the capacity in range', () => {
    assert.equal(tankCapacity('box', 'cm', [50, 30, 40]), 60)
    assert.ok(Math.abs(tankCapacity('box', 'm', [1.2, 0.5, 0.6]) - 360) < 1e-9)
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            const rounds = createTankRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, TANK_ROUNDS)
            for (const round of rounds) {
                assert.ok(Math.abs(tankCapacity(round.shape, round.unit, round.measures) - round.exact) < 1e-9)
                assert.equal(round.litres, Math.round(round.exact))
                if (round.shape === 'box') assert.ok(Math.abs(round.exact - round.litres) < 1e-6)
                assert.ok(round.litres >= 4 && round.litres <= round.max)
                assert.ok(tankRight(round, round.litres) && !tankRight(round, round.litres + 1) && !tankRight(round, round.litres - 1))
                if (level === 0) assert.equal(round.unit, 'dm')
                if (level === 2) assert.equal(round.shape, 'cylinder')
            }
            if (level === 1) assert.ok(rounds.some((round) => round.unit === 'cm') && rounds.some((round) => round.unit === 'm'))
        }
    }
})

/** The number at the end of a line: after the last «=» or «≈», with its unit left out */
const endValue = (latex: string) => Number(latex.split('\\to\\ ').pop()!.split(/=|\\approx /).pop()!.replace(/\\[ ,]\\text\{[^}]*\}(\^\{3\})?/g, '').replace('{,}', '.').trim())

test('gorputzak 2. DBH detective: one wrong line, the fix ends on the right value', () => {
    checkTexts([...Object.values(solidsDetectiveNames), ...Object.values(solidsDetectiveTips)])
    for (let level = 0; level < 3; level += 1) {
        const seen = new Set<string>()
        for (let seed = 1; seed <= 100; seed += 1) {
            for (const item of createSolidsDetectiveCases(createRandom(seed * 7919 + level), level)) {
                seen.add(item.error)
                assert.ok(solidsDetectiveLevels[level].includes(item.error))
                assert.ok(item.options.includes(item.error) && new Set(item.options).size === 3)
                assert.equal(item.lines.length, 3)
                for (const line of item.lines) katex.renderToString(line.latex, { throwOnError: true, strict: 'error' })
                katex.renderToString(item.fix, { throwOnError: true, strict: 'error' })
                checkTexts([item.problem])
                assert.ok(!/\{,\}/.test(item.problem.es), item.problem.es)
                assert.ok(Math.abs(endValue(item.fix) - item.right) < 1e-9, `${item.error}: ${item.fix} ≠ ${item.right}`)
                assert.ok(Math.abs(endValue(item.lines[2].latex) - item.reached) < 1e-9, `${item.error}: ${item.lines[2].latex} ≠ ${item.reached}`)
            }
        }
        assert.equal(seen.size, 4)
    }
})
