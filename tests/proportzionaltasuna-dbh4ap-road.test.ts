import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { evaluate } from './helpers/realsRaceCheck.ts'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { localLatex } from '../src/features/unit-v2/games/gameHooks.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import {
    createRoadRounds,
    isTowards,
    ROAD_ROUNDS,
    roadAnswer,
    roadGradeTexts,
    roadLevels,
    roadPositions,
    roadProblem,
    roadStars,
    roadSteps,
    scoreFlag,
    type RoadRound
} from '../src/pages/dbh4-aplikatuak-proportzionaltasuna/games/road.ts'
import { durationText, hoursLatex } from '../src/pages/dbh4-aplikatuak-proportzionaltasuna/games/numbers.ts'
import { fraction } from '../src/features/unit-v2/math/fraction.ts'

const renders = (latex: string) => katex.renderToString(latex, { throwOnError: true, strict: 'error' })

function checkText(text: LocalizedText, where: string) {
    for (const language of ['eu', 'es', 'en', 'ar'] as const) {
        const line = text[language]
        assert.equal(line.split('$').length % 2, 1, `${where}: ${line}`)
        for (const match of line.matchAll(/\$([^$]+)\$/g)) {
            renders(match[1])
            assert.ok(!/[؀-ۿ]/.test(match[1]), `${where}: ${match[1]}`)
        }
        if (language === 'eu') assert.ok(!/\d-?(an|ean|ra|era|tik|etik|ko|eko|rekin|ekin|k|z)\b/.test(line), `${where}: ${line}`)
        if (language === 'ar') assert.ok(!line.includes('{,}') && !/\d,\d/.test(line), `${where}: ${line}`)
    }
}

/** Each side of a = b = c that is a sum, all equal */
const sides = (latex: string) => latex.split('=').map(evaluate)

function checkRound(round: RoadRound, level: number) {
    const where = `level ${level}: ${JSON.stringify(round)}`
    assert.ok(roadLevels[level].includes(round.kind), where)
    assert.ok(Number.isInteger(round.meeting) && round.meeting > 0 && round.meeting < round.road, where)
    assert.ok(Number.isInteger(round.minutes) && round.minutes > round.delay, where)
    if (isTowards(round.kind)) assert.equal(round.road, round.distance, where)
    // At the meeting both are at the meeting point; a minute before, A is still behind B
    const [a, b] = roadPositions(round, round.minutes)
    assert.ok(Math.abs(a - round.meeting) < 1e-9 && Math.abs(b - round.meeting) < 1e-9, where)
    const [aBefore, bBefore] = roadPositions(round, round.minutes - 1)
    assert.ok(aBefore < bBefore, where)
    // A late vehicle has not moved before it sets off
    if (round.delay > 0) {
        const [aWait, bWait] = roadPositions(round, round.delay)
        if (round.kind === 'late-meet') assert.equal(bWait, round.distance, where)
        else assert.equal(aWait, 0, where)
    }
    // The working: every line holds, the time is the trip and the last value the meeting point
    const steps = roadSteps(round)
    assert.equal(steps.length, 3, where)
    for (const step of steps) {
        renders(step.latex)
        assert.ok(!localLatex(step.latex, 'ar').includes('{,}'), where)
        const values = sides(step.latex)
        assert.ok(values.every((value) => value !== null && Math.abs(value - values[0]!) < 1e-9), `${where}: ${step.latex}`)
        checkText(step.label, where)
    }
    assert.ok(Math.abs(evaluate(steps[1].latex.split('=').at(-1)!)! - (round.minutes - round.delay) / 60) < 1e-9, where)
    assert.equal(evaluate(steps[2].latex.split('=').at(-1)!), round.meeting, where)
    checkText(roadProblem(round), where)
    checkText(roadAnswer(round), where)
    // The numbers of the problem are in the text
    for (const value of [round.speeds[0], round.speeds[1], ...(round.distance > 0 ? [round.distance] : []), ...(round.delay > 0 ? [round.delay] : [])]) {
        assert.ok(roadProblem(round).es.includes(String(value)), `${where}: ${value}`)
    }
}

test('proportzionaltasuna 4. DBH ap road: every round meets at a whole km, and the working gives it', () => {
    roadLevels.forEach((kinds, level) => {
        const problems = new Set<string>()
        const shares: number[] = []
        for (let seed = 1; seed <= 150; seed += 1) {
            const rounds = createRoadRounds(createRandom(seed * 7919 + level), level)
            assert.equal(rounds.length, ROAD_ROUNDS)
            // Both kinds of the last level, half and half; no round twice
            for (const kind of kinds) assert.equal(rounds.filter((round) => round.kind === kind).length, ROAD_ROUNDS / kinds.length)
            assert.equal(new Set(rounds.map((round) => JSON.stringify(round))).size, ROAD_ROUNDS)
            for (const round of rounds) {
                checkRound(round, level)
                problems.add(roadProblem(round).es)
                shares.push(round.meeting / round.road)
            }
        }
        assert.ok(problems.size > 100, `level ${level}: only ${problems.size} problems`)
        // Where the road ends does not give the meeting point away
        assert.ok(Math.max(...shares) - Math.min(...shares) > 0.3, `level ${level}: ${Math.min(...shares)}–${Math.max(...shares)}`)
    })
})

test('proportzionaltasuna 4. DBH ap road: points, stars and texts', () => {
    const round = createRoadRounds(createRandom(5), 0)[0]
    assert.deepEqual(scoreFlag(round.meeting, round), { points: 100, grade: 'bullseye' })
    assert.equal(scoreFlag(round.meeting + round.road * 0.15 + 1, round).points, 0)
    const near = scoreFlag(round.meeting + Math.round(round.road * 0.05), round)
    assert.ok(near.points > 50 && near.points < 100 && near.grade === 'near', JSON.stringify(near))
    assert.ok(scoreFlag(round.meeting - 1, round).points >= scoreFlag(round.meeting - 10, round).points)
    assert.equal(roadStars(600), 3)
    assert.equal(roadStars(510), 3)
    assert.equal(roadStars(509), 2)
    assert.equal(roadStars(390), 2)
    assert.equal(roadStars(240), 1)
    assert.equal(roadStars(239), 0)
    for (const text of Object.values(roadGradeTexts)) checkText(text, 'grade')
    assert.equal(durationText(80, 'es'), '1 h 20 min')
    assert.equal(durationText(45, 'eu'), '45 min')
    assert.equal(durationText(120, 'ar'), '2 س')
    assert.equal(hoursLatex(fraction(80, 60)), '\\frac{4}{3}')
    assert.equal(hoursLatex(fraction(45, 60)), '0{,}75')
    assert.equal(hoursLatex(fraction(120, 60)), '2')
})
