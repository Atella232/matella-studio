import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'

/* An Arabic sentence in a lesson drawing goes through <Label> (dbh2-funtzioak-v2/plane.tsx): it reads right to left
   and each formula in it left to right, also in Safari. A bare <text> inherits the figure's direction: ltr, so the
   Arabic comes out in the wrong order (in «120 : 8 = 15 في كل جزء» the formula, which comes first, ended up on the
   left). This test reads every figures.tsx as text and fails on a <text> without a direction of its own that holds an
   Arabic letter. Texts with only formulas, numbers, ٪ or Arabic digits stay <text> on purpose. It sees only the
   Arabic written inside the tag ({ ar: '…' }, say('…')); a <text> that shows a variable is checked by eye. */

const pages = new URL('../src/pages/', import.meta.url)
const files = readdirSync(pages).sort().filter((unit) => existsSync(new URL(`${unit}/figures.tsx`, pages)))

/** Every .tsx of the labs and games of the units (lab/…, games/…, and the dbh4-games folder) */
function tsxFiles(folder: URL, found: string[] = []): string[] {
    for (const entry of readdirSync(folder, { withFileTypes: true })) {
        if (entry.isDirectory()) tsxFiles(new URL(`${entry.name}/`, folder), found)
        else if (entry.name.endsWith('.tsx')) found.push(new URL(entry.name, folder).pathname)
    }
    return found
}
const labAndGameFiles = readdirSync(pages)
    .sort()
    .flatMap((unit) => {
        const base = new URL(`${unit}/`, pages)
        if (unit.endsWith('-games')) return tsxFiles(base)
        return ['lab', 'games'].filter((sub) => existsSync(new URL(`${sub}/`, base))).flatMap((sub) => tsxFiles(new URL(`${sub}/`, base)))
    })

/** Arabic letters only: not the Arabic digits, the percent sign ٪ or the comma ، */
const ARABIC_LETTER = /[ؠ-يٮ-ۓۺ-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-ﻼ]/

/** The source with its comments blanked out, so that the line numbers stay the same */
const withoutComments = (source: string) => source.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, (comment) => comment.replace(/[^\n]/g, ' '))

test('Arabic words in the figures go through Label', () => {
    const bare: string[] = []
    for (const unit of files) {
        const source = withoutComments(readFileSync(new URL(`${unit}/figures.tsx`, pages), 'utf8'))
        for (const match of source.matchAll(/<text\b([^>]*)>([\s\S]*?)<\/text>/g)) {
            if (/\bdirection=/.test(match[1]) || !ARABIC_LETTER.test(match[2])) continue
            const line = source.slice(0, match.index).split('\n').length
            bare.push(`${unit}/figures.tsx:${line}`)
        }
    }
    assert.deepEqual(bare, [], `Arabic words in a bare <text>; use <Label>:\n${bare.join('\n')}`)
})

test('Arabic words in the labs and games go through Label', () => {
    const bare: string[] = []
    for (const path of labAndGameFiles) {
        const source = withoutComments(readFileSync(path, 'utf8'))
        for (const match of source.matchAll(/<text\b([^>]*)>([\s\S]*?)<\/text>/g)) {
            if (/\bdirection=/.test(match[1]) || !ARABIC_LETTER.test(match[2])) continue
            const line = source.slice(0, match.index).split('\n').length
            bare.push(`${path.split('/src/pages/')[1]}:${line}`)
        }
    }
    assert.deepEqual(bare, [], `Arabic words in a bare <text>; use <Label>:\n${bare.join('\n')}`)
})
