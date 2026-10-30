import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { evaluate } from './helpers/realsRaceCheck.ts'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { localLatex } from '../src/features/unit-v2/games/gameHooks.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import {
    createProportionDetectiveCase,
    createProportionDetectiveCases,
    PROPORTION_DETECTIVE_CASES,
    proportionDetectiveErrorNames,
    proportionDetectiveErrorTips,
    proportionDetectiveLevels,
    proportionDetectiveStars,
    type ProportionDetectiveCase
} from '../src/pages/dbh4-aplikatuak-proportzionaltasuna/games/detective.ts'

const renders = (latex: string) => katex.renderToString(latex, { throwOnError: true, strict: 'error' })

/** The values of a line a = b = c that can be worked out (a side with x or t is left out) */
const values = (latex: string) => latex.split('=').map(evaluate).filter((value): value is number => value !== null)
const holds = (latex: string) => {
    const found = values(latex)
    return found.every((value) => Math.abs(value - found[0]) < 1e-9 * Math.max(1, Math.abs(found[0])))
}

/** Texts in the three languages: formulas render, Arabic has its decimal point and no Arabic in a formula, Basque glues no suffix to a number */
function checkText(text: LocalizedText, where: string) {
    for (const language of ['eu', 'es', 'en', 'ar'] as const) {
        const line = text[language]
        assert.equal(line.split('$').length % 2, 1, `${where}: ${line}`)
        for (const match of line.matchAll(/\$([^$]+)\$/g)) {
            renders(match[1])
            assert.ok(!/[؀-ۿ]/.test(match[1]), `${where}: ${match[1]}`)
            if (language === 'eu') assert.ok(!/^[a-zA-Z]/.test(line.slice((match.index ?? 0) + match[0].length)), `${where}: suffix after ${match[0]} in ${line}`)
        }
        if (language === 'eu') assert.ok(!/\d-?(an|ean|ra|era|tik|etik|ko|eko|rekin|ekin|k|z)\b/.test(line), `${where}: ${line}`)
        if (language === 'ar') assert.ok(!line.includes('{,}') && !/\d,\d/.test(line), `${where}: ${line}`)
    }
}

function checkCase(item: ProportionDetectiveCase, kinds: string[]) {
    const where = `${item.error}: ${item.problem.es}`
    assert.equal(item.lines.length, 3, where)
    assert.ok(item.wrong >= 0 && item.wrong < item.lines.length, where)
    assert.notEqual(item.fix, item.lines[item.wrong].latex, where)
    assert.equal(item.options.length, 3, where)
    assert.equal(new Set(item.options).size, 3, where)
    assert.ok(item.options.includes(item.error), where)
    for (const option of item.options) assert.ok(kinds.includes(option), `${where}: ${option}`)
    checkText(item.problem, where)
    for (const [position, line] of item.lines.entries()) {
        checkText(line.label, where)
        renders(line.latex)
        assert.ok(!localLatex(line.latex, 'ar').includes('{,}'), where)
        // Every line but the wrong one is a right step (after it, from the wrong value)
        if (position !== item.wrong) assert.ok(holds(line.latex), `${where}: line ${position + 1} ${line.latex}`)
    }
    renders(item.fix)
    assert.ok(holds(item.fix), `${where}: fix ${item.fix}`)
    const wrongLine = item.lines[item.wrong].latex
    // A slip breaks the arithmetic of its line (when the line has a sum to check: «x = 32» has not);
    // any other mistake is a right sum with the wrong idea
    if (item.error !== 'calculation') assert.ok(holds(wrongLine), `${where}: ${wrongLine}`)
    else if (values(wrongLine).length >= 2) assert.ok(!holds(wrongLine), `${where}: ${wrongLine}`)
    else assert.ok(!holds(`${item.lines[item.wrong - 1].latex.split('=').at(-1)}=${wrongLine.split('=').at(-1)}`), `${where}: ${wrongLine}`)
}

test('proportzionaltasuna 4. DBH ap detective: every case has one wrong line, right steps around it and three kinds to choose from', () => {
    proportionDetectiveLevels.forEach((kinds, level) => {
        const seen = new Set<string>()
        const positions = new Set<number>()
        const problems = new Set<string>()
        for (let seed = 1; seed <= 120; seed += 1) {
            const cases = createProportionDetectiveCases(createRandom(seed * 7919 + level), level)
            assert.equal(cases.length, PROPORTION_DETECTIVE_CASES)
            // Every mistake of the level shows up in each game
            assert.equal(new Set(cases.map((item) => item.error)).size, kinds.length)
            for (const item of cases) {
                checkCase(item, kinds)
                seen.add(item.error)
                positions.add(item.wrong)
                problems.add(item.problem.es)
            }
        }
        assert.equal(seen.size, kinds.length, `level ${level}`)
        assert.deepEqual([...positions].sort(), [0, 1, 2], `level ${level}: the wrong line is not always in the same place`)
        assert.ok(problems.size > 250, `level ${level}: only ${problems.size} problems`)
    })
})

test('proportzionaltasuna 4. DBH ap detective: each mistake on its own, many times', () => {
    proportionDetectiveLevels.forEach((kinds, level) => {
        for (const error of kinds) {
            for (let seed = 1; seed <= 150; seed += 1) checkCase(createProportionDetectiveCase(createRandom(seed * 104729 + level), level, error), kinds)
        }
    })
})

test('proportzionaltasuna 4. DBH ap detective: names, tips and stars', () => {
    for (const kinds of proportionDetectiveLevels) {
        for (const kind of kinds) {
            checkText(proportionDetectiveErrorNames[kind], kind)
            checkText(proportionDetectiveErrorTips[kind], kind)
        }
    }
    assert.equal(proportionDetectiveStars(12), 3)
    assert.equal(proportionDetectiveStars(11), 3)
    assert.equal(proportionDetectiveStars(10), 2)
    assert.equal(proportionDetectiveStars(6), 1)
    assert.equal(proportionDetectiveStars(5), 0)
})
