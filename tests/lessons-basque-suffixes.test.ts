import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'

/* CLAUDE.md: a Basque text never glues a suffix to a number («6ren», «2rekin», «% 8an»): how it sounds depends on
   how the number is read. lesson-texts.test.ts and lesson-checks.test.ts check lessonTexts.ts and lessonChecks.ts;
   this test checks the Basque texts of the lessons file of every unit (titles, goals, explanations, examples,
   «Let's solve», steps, cases, key ideas). The lessons are read as text: the .tsx files hold drawings that node
   cannot import. */

const pages = new URL('../src/pages/', import.meta.url)

/** Every unit with a lessons file */
const units = readdirSync(pages).sort().flatMap((unit) => {
    const file = ['lessons.tsx', 'lessons.ts'].map((name) => new URL(`${unit}/${name}`, pages)).find(existsSync)
    return file ? [{ unit, file }] : []
})

/** Algebra written as plain text with a letter that is also a Basque ending (the -a of «2a»): the vertex of a parabola */
const algebraInWords: Record<string, string[]> = {
    'dbh4-akademikoak-polinomikoak': ['x = −b/2a'],
    'dbh4-aplikatuak-grafikoa': ['x = −b : 2a']
}

/** A string literal as the page shows it: \\ is \, \' is ' and \u00a0 is the character */
const unescape = (literal: string) => literal.replace(/\\(u[0-9a-fA-F]{4}|.)/g, (_, escape: string) => (escape.length === 5 ? String.fromCharCode(parseInt(escape.slice(1), 16)) : escape))

/** The Basque texts of a lessons file: { eu: '…' } and the first argument of say('…', es, ar, en) */
function basqueTexts(source: string): Array<{ line: number; text: string }> {
    return [...source.matchAll(/(?:\beu:\s*|\bsay\(\s*)'((?:[^'\\]|\\.)*)'/g)].map((match) => ({
        line: source.slice(0, match.index).split('\n').length,
        text: unescape(match[1])
    }))
}

/**
 * The places of a text where a suffix sticks to a number. A formula that ends in a digit counts as a number
 * ($N=20$-z, $\frac{3}{4}$-ren, $Q_1$-etik); one that ends in a letter may take a hyphen ($x$-ren). An algebraic
 * term is not a suffix (3n, 2x, 0x).
 */
function glued(text: string): string[] {
    const plain = text
        .replace(/\$[^$]+\$/g, (formula) => (/\d\}*\s*\$$/.test(formula) ? ' 9' : ' §'))
        .replace(/(?<![\p{L}\d])\d+[nxy](?![\p{L}])/gu, ' ')
    return [...plain.matchAll(/\S*(?:\d-?|§)[a-zñ]\S*/g)].map(([word]) => word)
}

test('the Basque suffix check finds what it has to', () => {
    for (const bad of ['24 6ren multiploa da', 'Biderkatu 1ez, 2z, 3z…', '% 8an', '4–5ean', 'Zatitu $N=20$-z.', '$\\frac{3}{4}$-ren erdia', '$Q_1$-etik', 'Zatitu 6-z.', '$x$ren', 'aurreko 4a zatitzen', '% 15eko beherapena', '1986an ikusi zen', '$n$etatik']) {
        assert.ok(glued(bad).length, bad)
    }
    for (const good of ['3n-ri gehitu', 'Batu 2x eta 0x', '$x$-ren ordez', '500 €-ko bizikleta', 'm³-tik cm³-ra', '(4.a) eta (12.a)', '24 zenbakia 6 zenbakiaren multiploa da', '22\u00a0000']) {
        assert.deepEqual(glued(good), [], good)
    }
    assert.deepEqual(glued(unescape('22\\u00a0000 €')), [])
})

test('the lessons files of every course are found', () => {
    for (const course of ['dbh1-', 'dbh2-', 'dbh3-', 'dbh4-akademikoak-', 'dbh4-aplikatuak-']) {
        assert.ok(units.filter(({ unit }) => unit.startsWith(course)).length >= 8, course)
    }
})

for (const { unit, file } of units) {
    test(`${unit}: the Basque texts of the lessons file glue no suffix to a number`, () => {
        const texts = basqueTexts(readFileSync(file, 'utf8'))
        assert.ok(texts.length > 20, `${unit}: only ${texts.length} Basque texts found`)
        const algebra = algebraInWords[unit] ?? []
        const found = texts.flatMap(({ line, text }) => glued(algebra.reduce((rest, term) => rest.split(term).join(' '), text)).map((word) => `line ${line}: «${word}» in «${text}»`))
        assert.deepEqual(found, [])
    })
}
