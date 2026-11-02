import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'

/* MathText draws every «:» inside $…$ as ÷, because in eu and es «:» is division. A colon used as a label
   («y=x: (2,-5)→(-5,2)», «{x: 0<x≤3}») then reads as a division. A division never has a space right after the
   colon, a label always had one, so that is what this test looks for. Labels go on the arrow
   (\xrightarrow{\ y=x\ }), sets use \mid, and «for this value, this result» uses \to. */

const pages = new URL('../src/pages/', import.meta.url)

/** The formulas inside the string literals of a source file, with \\ read as \ */
function formulas(source: string): string[] {
    const found: string[] = []
    for (const [, single, double, template] of source.matchAll(/'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g)) {
        const text = (single ?? double ?? template ?? '').replace(/\$\{[^}]*\}/g, '').replace(/\\\\/g, '\\')
        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) found.push(formula)
    }
    return found
}

test('lessons: no colon used as a label inside a formula (it would be drawn as ÷)', () => {
    const slips: string[] = []
    let checked = 0
    for (const unit of readdirSync(pages)) {
        for (const file of ['lessons.ts', 'lessons.tsx', 'lessonTexts.ts']) {
            const url = new URL(`${unit}/${file}`, pages)
            if (!existsSync(url)) continue
            for (const formula of formulas(readFileSync(url, 'utf8'))) {
                checked++
                if (/(^|[^\\{]):\s*\\(?:[ ,;]|quad|qquad)/.test(formula)) slips.push(`${unit}: $${formula}$`)
            }
        }
    }
    assert.ok(checked > 1000, `only ${checked} formulas read: the lesson files moved?`)
    assert.deepEqual(slips, [])
})
