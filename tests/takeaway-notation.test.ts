import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'

/* The «Idea clave» box sums up its lesson, so its formulas use the lesson's own letters. Until 2026-11-02 the box
   printed everything in capitals and many key ideas were written that way (Y=MX+N, A_{N}); now the box shows the
   sentence as written, so a letter that the lesson only writes in the other case is a slip. The lessons are read
   as text: the .tsx files hold drawings that node cannot import. */

const pages = new URL('../src/pages/', import.meta.url)

/** A capital that really is the other letter of its lesson: the area A next to the apothem a */
const allowed: Record<string, string> = {
    'dbh3-geometria › regular-area': 'A'
}

/** The index just past the bracket that closes the one at `start`, skipping string literals */
function closing(source: string, start: number): number {
    let depth = 0
    for (let index = start; index < source.length; index++) {
        const char = source[index]
        if (char === "'" || char === '"' || char === '`') {
            for (index++; index < source.length && source[index] !== char; index++) if (source[index] === '\\') index++
        } else if ('({['.includes(char)) depth++
        else if (')}]'.includes(char) && --depth === 0) return index + 1
    }
    return source.length
}

/** The formulas inside the string literals of a piece of source, with \\ read as \ */
function formulas(source: string): string[] {
    const found: string[] = []
    for (const [, single, double, template] of source.matchAll(/'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g)) {
        const text = (single ?? double ?? template ?? '').replace(/\$\{[^}]*\}/g, '').replace(/\\\\/g, '\\')
        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) found.push(formula)
    }
    return found
}

/** The letters of a formula, without command names or words in \text{} and \mathrm{} */
const letters = (formula: string) => new Set(formula.replace(/\\(?:text|mathrm|operatorname)\{[^}]*\}/g, ' ').replace(/\\[a-zA-Z]+/g, ' ').match(/[a-zA-Z]/g) ?? [])

const swapCase = (letter: string) => (letter === letter.toLowerCase() ? letter.toUpperCase() : letter.toLowerCase())

interface Takeaway {
    lesson: string
    formulas: string[]
    lessonLetters: Set<string>
}

/** Every key idea with the letters of the rest of its lesson (in 4. DBH aplikatuak proportionality part of it lives in lessonTexts.ts) */
function takeaways(): Takeaway[] {
    const found: Takeaway[] = []
    for (const unit of readdirSync(pages)) {
        const file = ['lessons.tsx', 'lessons.ts'].map((name) => new URL(`${unit}/${name}`, pages)).find((url) => existsSync(url))
        if (!file) continue
        const source = readFileSync(file, 'utf8')
        const textsFile = new URL(`${unit}/lessonTexts.ts`, pages)
        const texts = existsSync(textsFile) ? readFileSync(textsFile, 'utf8') : ''
        let lessonStart = 0
        for (const match of source.matchAll(/\btakeaway:\s*/g)) {
            const open = source.slice(match.index).search(/[({]/) + match.index
            const end = closing(source, open)
            const lesson = source.slice(lessonStart, match.index)
            const id = [...lesson.matchAll(/\n {8}id: '([^']+)'/g)].at(-1)?.[1] ?? '?'
            const textsKey = texts.search(new RegExp(`\\n {4}'?${id}'?: \\{`))
            const own = textsKey < 0 ? [] : formulas(texts.slice(textsKey, closing(texts, texts.indexOf('{', textsKey))))
            found.push({
                lesson: `${unit} › ${id}`,
                formulas: formulas(source.slice(open, end)),
                lessonLetters: new Set([...formulas(lesson), ...own].flatMap((formula) => [...letters(formula)]))
            })
            lessonStart = end
        }
    }
    return found
}

test('the key ideas of every course are found', () => {
    const all = takeaways()
    assert.ok(all.length > 700, `${all.length}`)
    assert.ok(all.every(({ lesson }) => !lesson.endsWith('?')))
})

test('the formulas of a key idea write each letter as its lesson does (y=mx+n, not Y=MX+N)', () => {
    for (const { lesson, formulas: written, lessonLetters } of takeaways()) {
        for (const formula of written) {
            for (const letter of letters(formula)) {
                if (lessonLetters.has(letter) || !lessonLetters.has(swapCase(letter)) || allowed[lesson]?.includes(letter)) continue
                assert.fail(`${lesson}: $${formula}$ writes ${letter}, the lesson writes ${swapCase(letter)}`)
            }
        }
    }
})

test('a key idea uses the units as they are written (km, cm), not in capitals', () => {
    for (const { lesson, formulas: written } of takeaways()) {
        for (const formula of written) {
            for (const [, unit] of formula.matchAll(/\\mathrm\{([^}]*)\}/g)) assert.ok(!/^[A-Z]{2,}$/.test(unit), `${lesson}: ${formula}`)
        }
    }
})
