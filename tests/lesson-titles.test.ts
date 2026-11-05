import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'

/* Lesson and stage titles are drawn as plain text (the heading, the lesson menu, «Antes de empezar» links), not with
   KaTeX: a formula in a title would show as «La función $y=a^{x}$». The sources are read as text (the .tsx files
   hold drawings that node cannot import). */

const pages = new URL('../src/pages/', import.meta.url)

/** Rewritten on the 4. DBH academic theory branch, not merged yet: drop this list when it is */
const pending = new Set([
    ...['exp-graph', 'log-graph', 'sine', 'cosine', 'period', 'tangent'].map((id) => `dbh4-akademikoak-esponentzialak › ${id}`),
    ...['parabola-a', 'inverse', 'rational-form'].map((id) => `dbh4-akademikoak-polinomikoak › ${id}`)
])

test('lessons: no formula in a lesson or stage title', () => {
    const found: string[] = []
    let titles = 0
    for (const folder of readdirSync(pages)) {
        for (const name of ['lessons.tsx', 'lessons.ts']) {
            const url = new URL(`${folder}/${name}`, pages)
            if (!existsSync(url)) continue
            const source = readFileSync(url, 'utf8')
            const lessons = source.matchAll(/id: '([^']+)',\s*stage: '[^']+',\s*title: ([^\n]*)/g)
            const stages = source.matchAll(/\{ id: '([^']+)', tone: '[^']+', title: ([^\n]*)/g)
            for (const [, id, title] of [...lessons, ...stages]) {
                titles++
                if (title.includes('$') && !pending.has(`${folder} › ${id}`)) found.push(`${folder} › ${id}`)
            }
        }
    }
    assert.ok(titles > 500, `only ${titles} titles found`)
    assert.deepEqual(found, [], 'titles with a formula')
})
