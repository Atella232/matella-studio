import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { equals } from '../src/pages/dbh2-zatikiak-prototype/math/fraction.ts'
import {
    createDetectiveCase,
    createDetectiveCases,
    DETECTIVE_CASES,
    detectiveErrorNames,
    detectiveErrorTips,
    detectiveLevels,
    detectiveStars
} from '../src/pages/dbh2-zatikiak-prototype/games/detective.ts'

const render = (latex: string) => katex.renderToString(latex, { throwOnError: true })

test('zatikiak detective: exactly one line changes the value, and it is the wrong one', () => {
    detectiveLevels.forEach((kinds, level) => {
        for (const error of kinds) {
            for (let seed = 1; seed <= 80; seed += 1) {
                const item = createDetectiveCase(createRandom(seed * 4099 + level * 31), level, error)
                const label = `${level} ${error} ${item.statement}`
                assert.equal(item.error, error)
                assert.ok(item.lines.length >= 2 && item.lines.length <= 5, label)
                item.lines.forEach((line, index) => {
                    const previous = index === 0 ? item.value : item.lines[index - 1].value
                    if (index === item.wrong) assert.ok(!equals(line.value, previous), `${label}: the wrong line keeps the value`)
                    else assert.ok(equals(line.value, previous), `${label}: line ${index} changes the value`)
                })
                assert.notEqual(item.fix, item.lines[item.wrong].latex, label)
                // Three options: the mistake and two others of the level
                assert.equal(item.options.length, 3)
                assert.equal(new Set(item.options).size, 3)
                assert.ok(item.options.includes(error) && item.options.every((option) => kinds.includes(option)))
                for (const latex of [item.statement, item.fix, ...item.lines.map((line) => line.latex)]) render(latex)
            }
        }
    })
})

test('zatikiak detective: a level mixes its mistakes, and every mistake has a name and a tip', () => {
    detectiveLevels.forEach((kinds, level) => {
        const cases = createDetectiveCases(createRandom(level + 7), level)
        assert.equal(cases.length, DETECTIVE_CASES)
        assert.ok(new Set(cases.map((item) => item.error)).size >= Math.min(kinds.length, DETECTIVE_CASES) - 1)
        for (const kind of kinds) {
            for (const language of ['eu', 'es', 'en', 'ar'] as const) {
                assert.ok(detectiveErrorNames[kind][language].length > 0 && detectiveErrorTips[kind][language].length > 0)
            }
        }
    })
    assert.deepEqual([12, 11, 10, 9, 6, 5].map(detectiveStars), [3, 3, 2, 2, 1, 0])
})
