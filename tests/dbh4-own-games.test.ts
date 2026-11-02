import test from 'node:test'
import assert from 'node:assert/strict'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { WorkedCase } from '../src/features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { contains } from '../src/pages/dbh4-aplikatuak-errealak/reals.ts'
import { createIntervalRounds, INTERVAL_MAX, INTERVAL_MIN, INTERVAL_ROUNDS } from '../src/pages/dbh4-games/intervals.ts'
import { createRealsDetectiveCases, realsDetectiveLevels, realsDetectiveNames, realsDetectiveTips } from '../src/pages/dbh4-games/realsDetective.ts'
import { checkTexts, renders } from './helpers/ownGamesCheck.ts'
import { evaluate } from './helpers/realsRaceCheck.ts'

/* The own games shared by the 4. DBH applied and academic units */

/** The number at the end of a line: after the last «→», then after the last «=» or «≈»; a percentage sign and units left out */
export function endValue(latex: string): number {
    const last = latex.split('\\ \\to\\ ').pop()!.split(/=|\\approx /).pop()!
        .replace(/\\,\\%$/, '')
        .replace(/\\[ ,]\\text\{[^}]*\}(\^\{\d\})?/g, '')
        .trim()
    const value = evaluate(last.replace(/\\pi/g, `(${Math.PI})`))
    assert.ok(value !== null, `cannot read ${latex}`)
    return value!
}

/** The checks of a worked-solution detective: the level's errors, three options, the fix and the last line on their values */
export function checkDetective<Error extends string>(create: (random: ReturnType<typeof createRandom>, level: number) => WorkedCase<Error>[], levels: Error[][], names: Record<Error, LocalizedText>, tips: Record<Error, LocalizedText>, tolerance = 1e-6) {
    checkTexts([...Object.values<LocalizedText>(names), ...Object.values<LocalizedText>(tips)])
    for (let level = 0; level < levels.length; level += 1) {
        const seen = new Set<string>()
        const wrongLines = new Set<number>()
        for (let seed = 1; seed <= 100; seed += 1) {
            for (const item of create(createRandom(seed * 7919 + level), level)) {
                seen.add(item.error)
                wrongLines.add(item.wrong)
                assert.ok(levels[level].includes(item.error))
                assert.ok(item.options.includes(item.error) && new Set(item.options).size === 3)
                assert.equal(item.lines.length, 3)
                for (const line of item.lines) renders(line.latex)
                renders(item.fix)
                checkTexts([item.problem])
                assert.ok(!/\{,\}/.test(item.problem.es.replace(/\$[^$]+\$/g, '')), item.problem.es)
                assert.ok(Math.abs(endValue(item.fix) - item.right) < tolerance * Math.max(1, Math.abs(item.right)), `${item.error}: ${item.fix} ≠ ${item.right}`)
                assert.ok(Math.abs(endValue(item.lines[2].latex) - item.reached) < tolerance * Math.max(1, Math.abs(item.reached)), `${item.error}: ${item.lines[2].latex} ≠ ${item.reached}`)
            }
        }
        assert.equal(seen.size, levels[level].length, `level ${level}: ${[...seen]}`)
    }
}

test('4. DBH build the interval: sets inside the line, distinct rounds, the prompt says the same set', () => {
    for (const track of ['applied', 'academic'] as const) {
        for (let level = 0; level < 3; level += 1) {
            for (let seed = 1; seed <= 150; seed += 1) {
                const rounds = createIntervalRounds(createRandom(seed * 7919 + level), level, track)
                assert.equal(rounds.length, INTERVAL_ROUNDS)
                for (const { target, latex, words } of rounds) {
                    for (const end of [target.from, target.to]) if (end !== null) assert.ok(end >= INTERVAL_MIN && end <= INTERVAL_MAX)
                    if (target.from !== null && target.to !== null) assert.ok(target.from < target.to)
                    if (level === 0) assert.ok(target.from !== null && target.to !== null)
                    if (level === 1) assert.ok((target.from === null) !== (target.to === null))
                    if (latex) renders(latex)
                    if (words) checkTexts([words])
                    // An absolute value |x − c| ≤ r holds exactly on the interval
                    if (level === 2 && track === 'academic') {
                        const match = latex!.match(/^\|x([+-]\d+)?\|(\\le |<)(\d+)$/)!
                        const centre = match[1] ? -Number(match[1]) : 0
                        for (let x = -12; x <= 12; x += 0.5) assert.equal(contains(target, x), match[2] === '<' ? Math.abs(x - centre) < Number(match[3]) : Math.abs(x - centre) <= Number(match[3]), `${latex} at ${x}`)
                    }
                }
            }
        }
    }
})

test('4. DBH reals detective: both tracks', () => {
    for (const track of ['applied', 'academic'] as const) checkDetective(createRealsDetectiveCases(track), realsDetectiveLevels[track], realsDetectiveNames, realsDetectiveTips, 1e-3)
})
