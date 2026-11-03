import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import katex from 'katex'
import type { LessonDefinition, LessonStep, LocalizedText } from '../src/features/unit-v2/types.ts'
import { evaluate, formulas, near } from './latex-math.ts'

/* The short explanation, the definitions, the cases and the example as an exercise («Another example») of
   every lesson. A unit keeps them in src/pages/<unit>/lessonTexts.ts; this test finds the files whose lessons
   give their example a statement (examplePrompt), so a new unit needs no edit here. */

type Texts = {
    definitions?: LessonDefinition[]
    vocabulary?: LocalizedText[]
    why?: { text: LocalizedText; math?: string | LocalizedText }
    explanation: LocalizedText
    cases?: LessonStep[]
    problem?: LocalizedText
    steps?: LessonStep[]
    example: string | LocalizedText
    examplePrompt?: LocalizedText
    exampleAnswer?: LocalizedText
}

const pages = new URL('../src/pages/', import.meta.url)
const languages = ['eu', 'es', 'en', 'ar'] as const

/** At most this many words in the Spanish explanation (a formula counts as one word) */
const explanationWords = 50
/** At most this many words in a case, a definition or the statement of the example */
const shortWords = 30

const isRecord = (value: unknown, key: string): value is Record<string, Record<string, unknown>> =>
    typeof value === 'object' && value !== null && Object.values(value).length > 0
    && Object.values(value).every((entry) => typeof entry === 'object' && entry !== null && key in entry)

type Checks = Record<string, { check: { prompt: LocalizedText; options: LocalizedText[]; explanation: LocalizedText }; mistake: { wrong: LocalizedText; right: LocalizedText } }>
const units: Array<{ folder: string; texts: Record<string, Texts>; source: string; checks?: Checks }> = []
for (const folder of readdirSync(pages).sort()) {
    const url = new URL(`${folder}/lessonTexts.ts`, pages)
    if (!existsSync(url)) continue
    const texts = Object.values(await import(url.href)).find((value) => isRecord(value, 'explanation')) as Record<string, Texts> | undefined
    if (!texts || !Object.values(texts).some((entry) => entry.examplePrompt)) continue
    const file = ['lessons.tsx', 'lessons.ts'].map((name) => new URL(`${folder}/${name}`, pages)).find(existsSync)
    assert.ok(file, `${folder}: no lessons file`)
    const checksUrl = new URL(`${folder}/lessonChecks.ts`, pages)
    const checks = existsSync(checksUrl) ? Object.values(await import(checksUrl.href)).find((value) => isRecord(value, 'check')) as never : undefined
    units.push({ folder, texts, source: readFileSync(file, 'utf8'), checks })
}

/** Where the bracket opened at start closes, skipping strings */
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

/** The source of one lesson in the lessons file, from its id to the next lesson */
function lessonSource(source: string, id: string): string {
    const start = source.search(new RegExp(`\\n {8}id: '${id}',\\s*\\n {8}stage:`))
    assert.ok(start >= 0, `lesson ${id} not found`)
    const next = source.slice(start + 1).search(/\n {8}id: '[^']+',\s*\n {8}stage:/)
    return next < 0 ? source.slice(start) : source.slice(start, start + 1 + next)
}

/** The source of one property of a lesson (problem: say(…) or problem: { … }) */
function property(lesson: string, name: string): string {
    const at = lesson.search(new RegExp(`\\n {8}${name}: `))
    if (at < 0) return ''
    const open = lesson.slice(at).search(/[({'[]/) + at
    return lesson.slice(at, closing(lesson, open))
}

/** The numbers written in a text or in its formulas: 15, 6,4 or 6{,}4, 15\,728 (not the exponents) */
const numbers = (text: string) => (text.replace(/\^\{?\d\}?/g, '').replace(/(\d)\\,(?=\d)/g, '$1').replace(/\{,\}/g, ',').match(/\d+(?:[.,]\d+)?/g) ?? []).map((n) => n.replace('.', ','))

/** Words outside the formulas; a formula counts as one word */
const countWords = (text: string) => text.replace(/\$[^$]+\$/g, ' F ').split(/\s+/).filter((word) => /[\p{L}\p{N}]/u.test(word)).length

const words = (text: string) => text.replace(/\$[^$]+\$/g, ' ')

/** A formula with each letter as x, to compare it across languages that name a letter differently */
const shape = (formula: string) => formula.replace(/\\(?:text|mathrm)\{[^{}]*\}/g, 'T').replace(/\\[a-zA-Z]+|[a-zA-Z]/g, (match) => (match.length > 1 ? match : 'x'))

const pick = (value: string | LocalizedText, language: (typeof languages)[number]) => (typeof value === 'string' ? value : value[language])

/** Every text of a lesson that this file holds */
function allTexts(entry: Texts): LocalizedText[] {
    const steps = (list?: LessonStep[]) => (list ?? []).flatMap((step) => [...(step.title ? [step.title] : []), step.text, ...(step.math && typeof step.math !== 'string' ? [step.math] : [])])
    return [
        ...(entry.definitions ?? []).flatMap((definition) => [definition.term, definition.meaning]),
        entry.explanation,
        ...steps(entry.cases),
        ...(entry.problem ? [entry.problem] : []),
        ...steps(entry.steps),
        ...(typeof entry.example === 'string' ? [] : [entry.example]),
        ...(entry.examplePrompt ? [entry.examplePrompt] : []),
        ...(entry.exampleAnswer ? [entry.exampleAnswer] : []),
        ...(entry.vocabulary ?? []),
        ...(entry.why ? [entry.why.text, ...(entry.why.math && typeof entry.why.math !== 'string' ? [entry.why.math] : [])] : [])
    ]
}

/** The formulas of a lesson that work something out: the example and its answer, the cases, the new steps and «Why» */
function worked(entry: Texts): string[] {
    const maths = [entry.example, entry.exampleAnswer, entry.why?.math, ...(entry.cases ?? []).map((item) => item.math), ...(entry.steps ?? []).map((item) => item.math)]
    return maths.flatMap((math) => (math ? formulas(pick(math, 'es')) : []))
}

/** A formula cut where it starts something new: rows (a row that starts with = goes on with the one above), wide spaces, arrows */
const pieces = (formula: string) => formula
    .replace(/\\begin\{[a-z]+\}(?:\{[^}]*\})?|\\end\{[a-z]+\}|&/g, ' ')
    .split(/\\\\/)
    .reduce<string[]>((rows, row) => (/^\s*=/.test(row) && rows.length ? [...rows.slice(0, -1), rows.at(-1) + row] : [...rows, row]), [])
    .flatMap((row) => row.split(/\\qquad|\\quad|\\to|\\Rightarrow|\\rightarrow/))

/** The decimals of a written number: 5{,}83 has 2 */
const decimals = (latex: string) => /\{,\}(\d+)\s*(?:\\[ ,;]|\s)*(?:\\(?:text|mathrm)\{[^{}]*\}(?:\^\{?\d\}?)?)?\s*$/.exec(latex.trim())?.[1].length ?? 0

/**
 * Checks the equalities of a formula: every side that is a number has to give the same value
 * (≈ allows the rounding of the decimals written). Returns how many equalities it could read.
 */
function checkEqualities(formula: string, where: string): number {
    let read = 0
    for (const piece of pieces(formula)) {
        // a < or > is a comparison, not a result: each side on its own still has to be right
        for (const part of piece.split(/<|>|\\le|\\ge|\\neq/)) {
            const sides = part.split(/(=|\\approx)/)
            let previous: number | null = null
            let previousLatex = ''
            for (let index = 0; index < sides.length; index += 2) {
                const latex = sides[index]
                const value = evaluate(latex)
                const relation = sides[index - 1]
                if (value !== null && previous !== null) {
                    read++
                    if (relation === '=') assert.ok(near(previous, value), `${where}: ${previousLatex} = ${latex} (${previous} ≠ ${value})`)
                    else {
                        const places = Math.max(decimals(latex), decimals(previousLatex))
                        assert.ok(Math.abs(previous - value) <= 0.5 * 10 ** -places + 1e-9, `${where}: ${previousLatex} ≈ ${latex} (${previous}, ${value})`)
                    }
                }
                if (value !== null) {
                    previous = value
                    previousLatex = latex
                } else if (relation === '=' || index === 0) {
                    previous = null // a side with letters or words breaks the chain
                }
            }
        }
    }
    return read
}

/** The values of x that an example gives as solutions, x=5, x=-2, x=\frac{3}{2}, x=\pm 4, at the start of a piece (not 2x+x=24 nor x=90\mathbin{:}9) */
function givenSolutions(latex: string): number[] {
    const found: number[] = []
    const pattern = /(?<=(?:^|\\to|\\qquad|\\quad|\\\\|,|\\ |\{gathered\}|\{aligned\}|&)\s*)x=(\\pm\s*)?(-?(?:\\frac\{\d+\}\{\d+\}|\d+(?:\{,\}\d+)?))(?=\s*(?:$|,|;|\)|\\\\|\\qquad|\\quad|\\to|\\end|\\ ))/g
    for (const [, pm, number] of latex.matchAll(pattern)) {
        const value = evaluate(number)
        if (value === null) continue
        found.push(value)
        if (pm) found.push(-value)
    }
    return found
}

/** The one equation in x of a statement (2x+5=3x+2), or null: other letters, several equations or just x=4 */
function askedEquation(prompt: string): [string, string] | null {
    const equations = formulas(prompt).filter((formula) => /x/.test(formula) && formula.split('=').length === 2 && !/[<>]|\\[lg]e|\\neq/.test(formula) && !/^\s*x\s*=/.test(formula))
    if (equations.length !== 1 || /[a-wyz]/.test(equations[0].replace(/\\[a-zA-Z]+/g, ''))) return null
    const [left, right] = equations[0].split('=')
    return [left, right]
}

/** Units whose example equalities with letters are identities (expanding, reducing): they hold for any value of the letters */
const identityUnits = new Set(['dbh2-aljebra-v2'])

const hasLetters = (latex: string) => /[a-z]/.test(latex.replace(/\\[a-zA-Z]+/g, ''))

/** At most this many words in «Why does it work?» (Spanish; a formula counts as one word) */
const whyWords = 60

/**
 * The beginnings of the words of a term, to find it in a text whatever its ending: hipotenusa in hipotenusaren,
 * catetos in cateto, الوتر in وتره (the Arabic article and one last letter left out). Short words do not count.
 */
function stems(term: string, language: string): string[] {
    const arabic = language === 'ar'
    return term.replace(/\$[^$]*\$/g, ' ').replace(/\([^)]*\)/g, ' ').split(/[\s,·/-]+/)
        .map((word) => plain(word).replace(/[^\p{L}]/gu, ''))
        .map((word) => (arabic ? word.replace(/^(?:وال|بال|فال|كال|لل|ال)/, '') : word))
        .filter((word) => word.length >= (arabic ? 3 : 4))
        .map((word) => word.slice(0, arabic ? Math.max(3, word.length - (word.length >= 6 ? 2 : 1)) : Math.max(4, word.length - 2)))
}

/** Lower case and without the Arabic short vowels and shadda, which a word may or may not carry */
const plain = (text: string) => text.toLowerCase().replace(/[\u064B-\u0652]/g, '')

test('lesson texts: at least one unit gives its examples a statement', () => {
    assert.ok(units.length > 0)
})

for (const unit of units) {
    test(`${unit.folder}: every lesson has its texts here, and the lessons file no longer has them`, () => {
        const ids = [...unit.source.matchAll(/id: '([^']+)',\s*stage:/g)].map(([, id]) => id)
        assert.deepEqual(Object.keys(unit.texts).sort(), ids.sort())
        assert.ok(!/\n {8}(?:explanation|example):/.test(unit.source), 'an explanation or example left in the lessons file')
    })

    test(`${unit.folder}: short explanations; definitions and cases short too`, () => {
        for (const [id, entry] of Object.entries(unit.texts)) {
            const count = countWords(entry.explanation.es)
            assert.ok(count <= explanationWords, `${id}: the explanation has ${count} words (at most ${explanationWords})`)
            if (entry.cases) {
                assert.ok(entry.cases.length >= 2 && entry.cases.length <= 4, `${id}: ${entry.cases.length} cases`)
                for (const item of entry.cases) {
                    assert.ok(item.title, `${id}: a case without a name`)
                    assert.ok(countWords(item.text.es) <= shortWords, `${id}: a long case: ${item.text.es}`)
                }
            }
            for (const definition of entry.definitions ?? []) {
                assert.ok(countWords(definition.term.es) <= 5, `${id}: a long term: ${definition.term.es}`)
                assert.ok(countWords(definition.meaning.es) <= shortWords, `${id}: a long definition: ${definition.meaning.es}`)
            }
            assert.ok((entry.definitions?.length ?? 0) <= 3, `${id}: more than three definitions`)
        }
    })

    test(`${unit.folder}: the example is an exercise with numbers of its own`, () => {
        for (const [id, entry] of Object.entries(unit.texts)) {
            assert.ok(entry.examplePrompt, `${id}: the example has no statement`)
            assert.ok(countWords(entry.examplePrompt.es) <= shortWords, `${id}: a long statement`)
            const lesson = lessonSource(unit.source, id)
            // one-digit numbers (the values 0, 1, 2 of a table, the 2 of a half) and π ≈ 3,14 are everywhere: they do not count
            const big = (text: string) => numbers(text).filter((n) => n.length > 1 && n !== '3,14')
            const own = new Set(big(entry.examplePrompt.es))
            const compare = (other: string, name: string) => {
                const shared = [...new Set(big(other))].filter((n) => own.has(n))
                assert.ok(shared.length <= 1, `${id}: the example repeats the numbers of ${name}: ${shared.join(', ')}`)
                const sorted = (text: string) => numbers(text).sort().join(' ')
                assert.ok(!numbers(other).length || sorted(other) !== sorted(entry.examplePrompt!.es), `${id}: the example has the same numbers as ${name}`)
            }
            compare(entry.problem?.es ?? property(lesson, 'problem'), '«Let\'s solve»')
            const check = unit.checks?.[id]?.check.prompt.es
            if (check) compare(check, '«Check it»')
            const example = pick(entry.example, 'es')
            if (!example) assert.ok(entry.exampleAnswer, `${id}: an example without a formula needs its answer in words`)
            // Nor the result: a wrong answer of the mistake box that the example gives as right would confuse
            const mistake = unit.checks?.[id]?.mistake
            if (mistake) {
                const shown = new Set(big(`${entry.examplePrompt.es} ${example}`))
                const shared = [...new Set(big(`${mistake.wrong.es} ${mistake.right.es}`))].filter((n) => shown.has(n))
                assert.ok(shared.length <= 1, `${id}: the example repeats the numbers of the typical mistake: ${shared.join(', ')}`)
            }
            for (const formula of formulas(example)) {
                assert.ok(!lesson.includes(formula.replace(/\\/g, '\\\\')), `${id}: the example formula is already in the lesson: ${formula}`)
            }
        }
    })

    test(`${unit.folder}: the worked formulas add up`, (t) => {
        let read = 0
        for (const [id, entry] of Object.entries(unit.texts)) {
            for (const formula of worked(entry)) read += checkEqualities(formula, id)
        }
        t.diagnostic(`${read} equalities checked`)
        assert.ok(read > 0)
    })

    test(`${unit.folder}: the solutions the example gives satisfy the equation it asks about`, (t) => {
        let read = 0
        for (const [id, entry] of Object.entries(unit.texts)) {
            const equation = entry.examplePrompt && askedEquation(entry.examplePrompt.es)
            if (!equation) continue
            const shown = [pick(entry.example, 'es'), entry.exampleAnswer?.es ?? ''].flatMap(formulas)
            for (const value of shown.flatMap(givenSolutions)) {
                const left = evaluate(equation[0], () => value)
                const right = evaluate(equation[1], () => value)
                if (left === null || right === null) continue
                read++
                assert.ok(near(left, right), `${id}: x=${value} does not solve ${equation.join('=')} (${left} ≠ ${right})`)
            }
        }
        t.diagnostic(`${read} solutions checked`)
    })

    if (identityUnits.has(unit.folder)) {
        test(`${unit.folder}: the expressions of the example are equal for any value of the letters`, (t) => {
            let read = 0
            for (const [id, entry] of Object.entries(unit.texts)) {
                const shown = [pick(entry.example, 'es'), entry.exampleAnswer?.es ?? ''].flatMap(formulas)
                for (const piece of shown.flatMap(pieces)) {
                    const sides = piece.split('=')
                    for (let index = 1; index < sides.length; index++) {
                        const [left, right] = [sides[index - 1], sides[index]]
                        if (!hasLetters(left) || !hasLetters(right)) continue
                        for (const trial of [0, 1]) {
                            const a = evaluate(left, trial)
                            const b = evaluate(right, trial)
                            if (a === null || b === null) continue
                            read++
                            assert.ok(near(a, b), `${id}: ${left} = ${right} is not an identity (${a} ≠ ${b})`)
                        }
                    }
                }
            }
            t.diagnostic(`${read} identities checked`)
            assert.ok(read > 0)
        })
    }

    test(`${unit.folder}: vocabulary and «Why does it work?» are short, and each word is the one the lesson uses`, () => {
        const unused: string[] = []
        for (const [id, entry] of Object.entries(unit.texts)) {
            if (entry.why) assert.ok(countWords(entry.why.text.es) <= whyWords, `${id}: «Why» has ${countWords(entry.why.text.es)} words`)
            const words = entry.vocabulary ?? []
            if (words.length) assert.ok(words.length >= 2 && words.length <= 5, `${id}: ${words.length} vocabulary words`)
            const terms = (entry.definitions ?? []).map((definition) => definition.term)
            const seen = new Set<string>()
            for (const word of [...terms, ...words]) {
                const key = word.es.toLowerCase()
                assert.ok(!seen.has(key), `${id}: «${word.es}» twice (a vocabulary word that is already a definition?)`)
                seen.add(key)
            }
            // A vocabulary word is one the lesson uses, in each language: in its texts (but not the word list itself),
            // its mistake and question, or its block of the lessons file (title, goal, steps, key idea)
            const check = unit.checks?.[id]
            const lessonBlock = lessonSource(unit.source, id)
            for (const language of languages) {
                const corpus = plain([
                    ...allTexts({ ...entry, vocabulary: [] }).map((text) => text[language]),
                    ...(check ? [check.mistake.wrong, check.mistake.right, check.check.prompt, check.check.explanation, ...check.check.options].map((text) => text[language]) : []),
                    lessonBlock
                ].join(' '))
                for (const word of words) {
                    const found = stems(word[language], language)
                    if (found.length && !found.some((stem) => corpus.includes(stem))) unused.push(`${id}: «${word[language]}» (${language})`)
                }
            }
        }
        assert.deepEqual(unused, [], 'words the lesson never uses')
    })

    test(`${unit.folder}: texts in four languages, same formulas, all drawn by KaTeX`, () => {
        for (const [id, entry] of Object.entries(unit.texts)) {
            for (const text of allTexts(entry)) {
                for (const language of languages) assert.ok(text[language]?.trim(), `${id}: empty ${language}`)
                const es = formulas(text.es)
                // A language may name a letter its own way (A_O for the area of the base, Med for the median): same shape and numbers
                for (const language of ['eu', 'en'] as const) assert.deepEqual(formulas(text[language]).map(shape), es.map(shape), `${id}: the formulas of ${language} differ: ${text[language]}`)
                // Arabic writes the decimal point, and the Basque names where the unit uses them (Zat, ZKH)
                assert.deepEqual(formulas(text.ar).map(shape), es.map((formula) => shape(formula.replace(/\{,\}/g, '.'))), `${id}: the Arabic formulas differ: ${text.ar}`)
                for (const language of languages) {
                    for (const formula of formulas(text[language])) katex.renderToString(formula, { throwOnError: true })
                }
            }
            for (const formula of languages.flatMap((language) => formulas(pick(entry.example, language)))) katex.renderToString(formula, { throwOnError: true })
        }
    })

    test(`${unit.folder}: each language in its own place (say takes eu, es, ar, en)`, () => {
        for (const [id, entry] of Object.entries(unit.texts)) {
            for (const text of allTexts(entry)) {
                if (!/[a-zA-Z؀-ۿ]{3}/.test(words(text.es))) continue
                assert.ok(/[؀-ۿ]/.test(words(text.ar)), `${id}: ar is not Arabic: ${text.ar}`)
                for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), `${id}: Arabic in ${language}: ${text[language]}`)
                // KaTeX cannot shape Arabic inside \text{}: the Arabic words go outside the formula
                assert.ok(!formulas(text.ar).some((formula) => /\\text\{[^}]*[؀-ۿ]/.test(formula)), `${id}: Arabic inside \\text{}: ${text.ar}`)
                // A term may be the same word (Hipotenusa, Apotema); a sentence may not
                if (/[a-zA-Z]{5}/.test(words(text.es)) && countWords(text.es) > 2) assert.ok(text.eu !== text.es && text.en !== text.es, `${id}: a text copied from Spanish: ${text.es}`)
            }
        }
    })

    test(`${unit.folder}: numbers in the words as each language groups them (2,918 in English; 15 728 in the others)`, () => {
        for (const [id, entry] of Object.entries(unit.texts)) {
            for (const text of allTexts(entry)) {
                // groupDigits: English groups with a comma from four digits; the others with a space from five
                assert.ok(!/(?<![\d.,])\d{4,}(?![\d])/.test(words(text.en)), `${id}: group the thousands in English: ${text.en}`)
                for (const language of ['eu', 'es', 'ar'] as const) assert.ok(!/(?<![\d.,\u00a0 ])\d{5,}/.test(words(text[language])), `${id}: group the thousands in ${language}: ${text[language]}`)
            }
        }
    })

    test(`${unit.folder}: Basque glues no case ending to a number`, () => {
        for (const [id, entry] of Object.entries(unit.texts)) {
            for (const text of allTexts(entry)) {
                assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')), `${id}: ${text.eu}`)
                assert.ok(!/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), `${id}: ${text.eu}`)
            }
        }
    })
}
