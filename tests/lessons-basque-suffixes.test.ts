import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'

/* CLAUDE.md: a Basque text never glues a suffix to a number («6ren», «2rekin», «% 8an»): how it sounds depends on
   how the number is read. lesson-texts.test.ts and lesson-checks.test.ts check lessonTexts.ts and lessonChecks.ts;
   this test checks the Basque texts that stayed in the lessons files (titles, goals, «Let's solve», steps, cases,
   key ideas). The lessons are read as text: the .tsx files hold drawings that node cannot import. */

const pages = new URL('../src/pages/', import.meta.url)

const units = [
    'dbh2-zenbaki-osoak',
    'dbh2-zatigarritasuna',
    'dbh2-zatikiak-prototype',
    'dbh2-proportzionaltasuna-v2',
    'dbh2-aljebra-v2',
    'dbh2-ekuazioak-v2',
    'dbh2-pitagoras-v2',
    'dbh2-gorputzak-v2',
    'dbh2-funtzioak-v2',
    'dbh2-estatistika-v2'
]

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
    for (const bad of ['24 6ren multiploa da', 'Biderkatu 1ez, 2z, 3z…', '% 8an', '4–5ean', 'Zatitu $N=20$-z.', '$\\frac{3}{4}$-ren erdia', '$Q_1$-etik', 'Zatitu 6-z.', '$x$ren']) {
        assert.ok(glued(bad).length, bad)
    }
    for (const good of ['3n-ri gehitu', 'Batu 2x eta 0x', '$x$-ren ordez', '500 €-ko bizikleta', 'm³-tik cm³-ra', '(4.a) eta (12.a)', '24 zenbakia 6 zenbakiaren multiploa da', '22\u00a0000']) {
        assert.deepEqual(glued(good), [], good)
    }
    assert.deepEqual(glued(unescape('22\\u00a0000 €')), [])
})

for (const unit of units) {
    test(`${unit}: the Basque texts of the lessons file glue no suffix to a number`, () => {
        const file = ['lessons.tsx', 'lessons.ts'].map((name) => new URL(`${unit}/${name}`, pages)).find(existsSync)
        assert.ok(file, `${unit}: no lessons file`)
        const texts = basqueTexts(readFileSync(file, 'utf8'))
        assert.ok(texts.length > 20, `${unit}: only ${texts.length} Basque texts found`)
        const found = texts.flatMap(({ line, text }) => glued(text).map((word) => `line ${line}: «${word}» in «${text}»`))
        assert.deepEqual(found, [])
    })
}
