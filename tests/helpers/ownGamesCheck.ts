import assert from 'node:assert/strict'
import katex from 'katex'
import type { LocalizedText } from '../../src/features/unit-v2/types.ts'
import type { WorkedCase } from '../../src/features/unit-v2/games/workedDetective.ts'
import { formulaFor } from '../../src/utils/latexLanguage.ts'
import { createRandom } from '../../src/features/unit-v2/games/random.ts'
import { evaluate, valueOf } from './realsRaceCheck.ts'

/* The checks every unit's own games share: texts in four languages and the worked-solution detective */

const languages = ['eu', 'es', 'en', 'ar'] as const

export const renders = (latex: string) => katex.renderToString(latex, { throwOnError: true, strict: 'error' })

/** Every formula renders, Arabic has no decimal comma nor Arabic inside formulas, Basque glues no suffix to a number */
export function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k|rik|ik|ko)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/\$(?:ri|ren|rekin|ra|tik|ei|ko|tan|ean)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '$')), text.eu)
    }
}

/** The last number of a line or a fix: after the last «=» or «→» */
const lastValue = (latex: string) => valueOf(latex.split('=').pop()!.replace(/^.*\\to\\ /, '').replace(/\\,\\%$/, ''))

/** One wrong line among three, the fix ends on the right value and the last line on the value reached */
export function checkWorkedCases<Error extends string>(cases: WorkedCase<Error>[], pool: Error[], skipReached: Error[] = []) {
    for (const item of cases) {
        assert.ok(pool.includes(item.error))
        assert.ok(item.options.includes(item.error) && new Set(item.options).size === 3)
        assert.ok(Math.abs(item.reached - item.right) > 1e-9, item.error)
        assert.equal(item.lines.length, 3)
        assert.ok(item.wrong >= 0 && item.wrong < 3)
        for (const line of item.lines) renders(line.latex)
        renders(item.fix)
        assert.ok(Math.abs(lastValue(item.fix)! - item.right) < 1e-9, `${item.error}: ${item.fix} ≠ ${item.right}`)
        if (!skipReached.includes(item.error)) assert.ok(Math.abs(lastValue(item.lines[2].latex)! - item.reached) < 1e-9, `${item.error}: ${item.lines[2].latex} ≠ ${item.reached}`)
        checkTexts([item.problem])
    }
}

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

/** English has no Arabic letters, and Arabic (its formulas left out) no Latin word: the two languages are not swapped */
export function checkLanguages(texts: LocalizedText[]) {
    for (const text of texts) {
        assert.ok(!/[\u0600-\u06ff]/.test(text.en), `Arabic in English: ${text.en}`)
        assert.ok(!/[A-Za-z]{4,}/.test(text.ar.replace(/\$[^$]+\$/g, '')), `Latin in Arabic: ${text.ar}`)
    }
}

/** The checks of a worked-solution detective: the level's errors, three options, the fix and the last line on their values */
export function checkDetective<Error extends string>(create: (random: ReturnType<typeof createRandom>, level: number) => WorkedCase<Error>[], levels: Error[][], names: Record<Error, LocalizedText>, tips: Record<Error, LocalizedText>, tolerance = 1e-6, localize = (latex: string) => latex, read = endValue) {
    checkTexts([...Object.values<LocalizedText>(names), ...Object.values<LocalizedText>(tips)])
    checkLanguages([...Object.values<LocalizedText>(names), ...Object.values<LocalizedText>(tips)])
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
                for (const line of item.lines) renders(localize(line.latex))
                renders(localize(item.fix))
                checkTexts([item.problem])
                checkLanguages([item.problem, ...item.lines.map((line) => line.label)])
                assert.ok(!/\{,\}/.test(item.problem.es.replace(/\$[^$]+\$/g, '')), item.problem.es)
                assert.ok(Math.abs(read(item.fix) - item.right) < tolerance * Math.max(1, Math.abs(item.right)), `${item.error}: ${item.fix} ≠ ${item.right}`)
                assert.ok(Math.abs(read(item.lines[2].latex) - item.reached) < tolerance * Math.max(1, Math.abs(item.reached)), `${item.error}: ${item.lines[2].latex} ≠ ${item.reached}`)
            }
        }
        assert.equal(seen.size, levels[level].length, `level ${level}: ${[...seen]}`)
    }
}
