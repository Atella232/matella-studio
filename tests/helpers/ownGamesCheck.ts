import assert from 'node:assert/strict'
import katex from 'katex'
import type { LocalizedText } from '../../src/features/unit-v2/types.ts'
import type { WorkedCase } from '../../src/features/unit-v2/games/workedDetective.ts'
import { formulaFor } from '../../src/utils/latexLanguage.ts'
import { valueOf } from './realsRaceCheck.ts'

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
