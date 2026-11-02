import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { checkChain, typed, valueOf } from './helpers/realsRaceCheck.ts'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { hasTerminatingDecimal, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createPythagorasMemoryBoard as createProportionMemoryBoard, PYTHAGORAS_MEMORY_PAIRS as PROPORTION_MEMORY_PAIRS, pythagorasMemoryLevels as proportionMemoryLevels } from '../src/pages/dbh2-pitagoras-v2/games/boards.ts'
import { pythagorasGameModeForPath as proportionGameModeForPath, pythagorasGameProgressIds as proportionGameProgressIds, pythagorasGames as proportionGames } from '../src/pages/dbh2-pitagoras-v2/games/info.ts'
import { checkPythagorasPitAnswer as checkProportionPitAnswer, PYTHAGORAS_RACE_CIRCUITS as PROPORTION_RACE_CIRCUITS, pythagorasParTime as proportionParTime, pythagorasRaceErrorTips as proportionRaceErrorTips, generatePythagorasRaceQuestion as generateProportionRaceQuestion, type PythagorasRaceQuestion as ProportionRaceQuestion } from '../src/pages/dbh2-pitagoras-v2/games/race.ts'
import { pythagorasLabChallengeIds as proportionLabChallengeIds } from '../src/pages/dbh2-pitagoras-v2/lab/labTools.ts'
import { CLASSIFY_ROUNDS, createClassifyRounds, isTriangle, kindOf } from '../src/pages/dbh2-pitagoras-v2/games/classify.ts'
import { createPythagorasDetectiveCases, pythagorasDetectiveLevels, pythagorasDetectiveNames, pythagorasDetectiveTips } from '../src/pages/dbh2-pitagoras-v2/games/detective.ts'
import { createLadderRound, createLadderRounds, ladderRight, ladderTarget, ladderTop, LADDER_ROUNDS } from '../src/pages/dbh2-pitagoras-v2/games/ladder.ts'
import { checkTexts } from './helpers/ownGamesCheck.ts'

const renders = (latex: string) => katex.renderToString(latex, { throwOnError: true, strict: 'error' })

function checkQuestion(question: ProportionRaceQuestion): number {
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
            assert.ok(proportionRaceErrorTips[option.error!], `${question.kind}: ${option.error}`)
            assert.ok(Math.abs(value! - answer) > 1e-9, `${question.kind}: wrong option ${option.latex} equals the answer`)
        }
    }
    for (const language of ['eu', 'es', 'en', 'ar'] as const) {
        for (const text of [question.prompt[language], question.solution[language]]) for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) renders(formula)
    }
    assert.ok(!question.prompt.ar.includes('{,}') && !question.solution.ar.includes('{,}'), question.kind)
    assert.ok(question.writable && hasTerminatingDecimal(question.answer), question.kind)
    const comma = typed(question.answer)
    for (const input of [comma, comma.replace(',', '.'), `${comma} cm`, `${comma} m`]) assert.equal(checkProportionPitAnswer(question, input), 'correct', `${question.kind}: ${input}`)
    return checkChain(question.solution.es, question.kind)
}

/** Value of a memory card: a root or a number */
const cardValue = (latex: string) => valueOf(latex)

test('pitagoras 2. DBH games: levels, ids and routes', () => {
    assert.equal(proportionGames.length, 5)
    assert.equal(proportionGames[0].levels.length, PROPORTION_RACE_CIRCUITS)
    assert.equal(proportionGames.find((game) => game.id === 'memory')!.levels.length, proportionMemoryLevels.length)
    assert.equal(new Set(proportionGameProgressIds).size, proportionGameProgressIds.length)
    assert.ok(!proportionGameProgressIds.some((id) => proportionLabChallengeIds.includes(id)))
    const stages = ['theorem', 'sides', 'plane', 'circle', 'space']
    for (const game of proportionGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.equal(proportionGameModeForPath('/matematika/dbh2/teorema-pitagoras/juegos/carrera'), 'race')
    assert.equal(proportionGameModeForPath('/matematika/dbh2/teorema-pitagoras/jokuak/memoria'), 'memory')
    assert.equal(proportionGameModeForPath('/matematika/dbh2/teorema-pitagoras/jokuak'), 'hub')
})

test('pitagoras 2. DBH race: every circuit has valid questions, typical mistakes and written answers', () => {
    const kinds = new Set<string>()
    let chains = 0
    for (let circuit = 0; circuit < PROPORTION_RACE_CIRCUITS; circuit += 1) {
        for (let seed = 1; seed <= 150; seed += 1) {
            const random = createRandom(seed * 13 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateProportionRaceQuestion(random, circuit, tier)
                assert.equal(question.circuit, circuit)
                kinds.add(`${circuit}:${question.kind}`)
                chains += checkQuestion(question)
            }
        }
        assert.ok(proportionParTime(circuit) > 60000)
    }
    for (const kind of ['0:square-hypotenuse', '0:square-leg', '0:triple-hypotenuse', '0:triple-leg', '1:hypotenuse', '1:leg', '2:isosceles', '2:rectangle', '2:rhombus', '2:trapezoid-isosceles', '2:trapezoid-right', '3:chord', '3:chord-distance', '3:tangent-distance', '3:tangent-radius', '4:box', '4:grid', '4:ladder']) assert.ok(kinds.has(kind), `never generated: ${kind}`)
    assert.ok(chains > 1500, `only ${chains} worked lines checked`)
})

test('pitagoras 2. DBH race: the typical mistakes show up', () => {
    const errors = new Set<string>()
    for (let seed = 1; seed <= 200; seed += 1) {
        const random = createRandom(seed)
        for (let circuit = 0; circuit < PROPORTION_RACE_CIRCUITS; circuit += 1) {
            for (const tier of [0, 2] as const) for (const option of generateProportionRaceQuestion(random, circuit, tier).options) if (option.error) errors.add(option.error)
        }
    }
    for (const error of Object.keys(proportionRaceErrorTips).filter((error) => error !== 'calculation')) assert.ok(errors.has(error), `never used: ${error}`)
})

test('pitagoras 2. DBH memory: every card has exactly one partner and the pair is true', () => {
    for (let level = 0; level < proportionMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const cards = createProportionMemoryBoard(createRandom(seed + level * 100), level)
            assert.equal(cards.length, PROPORTION_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) {
                renders(card.latex)
                const partner = cards.find((other) => other.setId === card.setId && other.id !== card.id)!
                const a = cardValue(card.latex)
                const b = cardValue(partner.latex)
                assert.ok(a !== null && b !== null && Math.abs(a - b) < 1e-9, `${card.latex} ≠ ${partner.latex}`)
                for (const other of cards.filter((item) => item.setId !== card.setId)) assert.ok(Math.abs(cardValue(other.latex)! - a!) > 1e-9, `${card.latex} ~ ${other.latex}`)
            }
        }
    }
})

/* ---------- The games of this topic ---------- */

test('pitagoras 2. DBH ladder: the target reaches the window, its neighbours do not', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            const rounds = createLadderRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, LADDER_ROUNDS)
            if (level === 0) assert.ok(rounds.every((round) => round.unknown === 'foot'))
            else assert.ok(rounds.some((round) => round.unknown === 'ladder') && rounds.some((round) => round.unknown === 'foot'))
            for (const round of rounds) {
                const target = ladderTarget(round)
                assert.ok(target >= round.min && target <= round.max, `${target} in ${round.min}–${round.max}`)
                // The slider can land on the target exactly
                assert.ok(Math.abs((target - round.min) / round.step - Math.round((target - round.min) / round.step)) < 1e-6)
                assert.ok(ladderRight(round, target) && !ladderRight(round, target + round.step) && !ladderRight(round, target - round.step))
                assert.ok(Math.abs(ladderTop(round, target) - round.height) < (level === 2 ? 0.2 : 1e-9), `${ladderTop(round, target)} vs ${round.height}`)
                assert.ok(round.foot ** 2 + round.height ** 2 - round.ladder ** 2 < (level === 2 ? 1.5 : 1e-9))
                if (level === 0) assert.ok(Number.isInteger(target))
                if (level === 1) assert.ok(Number.isInteger(target * 2))
                if (level === 2) assert.ok(!Number.isInteger(target))
                assert.ok(round.height <= 12)
            }
        }
    }
    assert.equal(createLadderRound(createRandom(3), 0, 'foot').step, 1)
})

test('pitagoras 2. DBH classify: real triangles of the right kind, every kind at least twice', () => {
    assert.equal(kindOf([5, 13, 12]), 'right')
    assert.equal(kindOf([6, 8, 11]), 'obtuse')
    assert.equal(kindOf([1.5, 2, 2.5]), 'right')
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            const rounds = createClassifyRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, CLASSIFY_ROUNDS)
            for (const kind of ['acute', 'right', 'obtuse'] as const) assert.ok(rounds.filter((round) => round.kind === kind).length >= 2)
            for (const round of rounds) {
                assert.ok(isTriangle(round.sides), `${round.sides}`)
                assert.equal(kindOf(round.sides), round.kind)
                assert.equal(new Set(round.sides).size, 3)
                if (level < 2) assert.ok(round.sides.every(Number.isInteger))
                else assert.ok(round.sides.some((side) => !Number.isInteger(side)))
            }
        }
    }
})

/** The number at the end of a line: after the last «=» or «≈» */
const endValue = (latex: string) => Number(latex.split('\\to\\ ').pop()!.split(/=|\\approx /).pop()!.replace('{,}', '.').trim())

test('pitagoras 2. DBH detective: one wrong line, the fix ends on the right length', () => {
    checkTexts([...Object.values(pythagorasDetectiveNames), ...Object.values(pythagorasDetectiveTips)])
    for (let level = 0; level < 3; level += 1) {
        const seen = new Set<string>()
        for (let seed = 1; seed <= 100; seed += 1) {
            for (const item of createPythagorasDetectiveCases(createRandom(seed * 7919 + level), level)) {
                seen.add(item.error)
                assert.ok(pythagorasDetectiveLevels[level].includes(item.error))
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
