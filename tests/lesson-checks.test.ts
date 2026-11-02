import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import katex from 'katex'
import type { LessonCheck, LessonMistake, LocalizedText } from '../src/features/unit-v2/types.ts'

/* The typical mistake and the «Check it» question of every lesson. Each unit keeps them in
   src/pages/<unit>/lessonChecks.ts; this test finds those files by itself, so a new unit needs no edit here. */

type Entry = { mistake: LessonMistake; check: LessonCheck }

const pages = new URL('../src/pages/', import.meta.url)
const languages = ['eu', 'es', 'en', 'ar'] as const

const isEntries = (value: unknown): value is Record<string, Entry> =>
    typeof value === 'object' && value !== null && Object.values(value).length > 0
    && Object.values(value).every((entry) => typeof entry === 'object' && entry !== null && 'mistake' in entry && 'check' in entry)

const units: Array<{ folder: string; checks: Record<string, Entry> }> = []
for (const folder of readdirSync(pages).sort()) {
    const url = new URL(`${folder}/lessonChecks.ts`, pages)
    if (!existsSync(url)) continue
    const checks = Object.values(await import(url.href)).find(isEntries)
    assert.ok(checks, `${folder}/lessonChecks.ts exports no lesson checks`)
    units.push({ folder, checks })
}

/** The lesson ids of a unit, read from its lessons file (a lesson id is followed by its stage) */
function lessonIds(folder: string): string[] {
    const file = ['lessons.tsx', 'lessons.ts'].map((name) => new URL(`${folder}/${name}`, pages)).find(existsSync)
    assert.ok(file, `${folder}: no lessons file`)
    return [...readFileSync(file, 'utf8').matchAll(/id: '([^']+)',\s*stage:/g)].map(([, id]) => id)
}

const formulas = (text: string) => [...text.matchAll(/\$([^$]+)\$/g)].map(([, formula]) => formula)

/** A unit written after the number (20 cm, 12 m², 5 €), left out before evaluating */
const unit = /(?:\\[ ,;]|\s)*(?:\\(?:text|mathrm)\{[^{}]*\}(?:\^\{?\d\}?)?|\\text\{€\}|€)\s*$/

/** A letter that is not part of a LaTeX command (the x of 3x, not the c of \\cdot) */
const letter = /(?<!\\[a-zA-Z]*)[a-z]/g

/** The number tried for a letter: a different one for each letter and for each trial */
const letterValue = (name: string, trial: number) => 0.7 + (name.charCodeAt(0) % 7) * 0.37 + trial * 1.13

/**
 * Evaluates a numeric expression (·, :, \frac, powers, roots, π, decimal commas, brackets); null when
 * it is something else. With a trial, each letter becomes a number, so 3x+5x and 8x can be compared.
 */
function evaluate(latex: string, trial?: number | ((name: string) => number)): number | null {
    let js = latex.replace(/\\left|\\right/g, '').replace(/^\s*\\approx\s*/, '').replace(unit, '')
    if (trial !== undefined) js = js.replace(letter, (name) => `(${typeof trial === 'number' ? letterValue(name, trial) : trial(name)})`)
    js = js.replace(/(\d)\\,(?=\d)/g, '$1') // thousands: 39\,999
    js = js.replace(/(\d+)\s*\\frac\{(\d+)\}\{(\d+)\}/g, '($1+($2)/($3))') // a mixed number: 4 5/6 is 4 + 5/6
    // Innermost first, so a power inside a root or a fraction inside a fraction also works
    for (let previous = ''; previous !== js;) {
        previous = js
        js = js.replace(/\\[dt]?frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))').replace(/\\sqrt\{([^{}]+)\}/g, 'Math.sqrt($1)').replace(/\^\{([^{}]+)\}/g, '**($1)')
    }
    js = js.replace(/\^(\d)/g, '**$1').replace(/\\pi/g, 'Math.PI').replace(/\{,\}/g, '.').replace(/\\cdot/g, '*').replace(/\\mathbin\{:\}/g, '/').replace(/\\div/g, '/').replace(/[[\]]/g, (b) => (b === '[' ? '(' : ')'))
    js = js.replace(/([\d)])\s*(?=\()/g, '$1*') // products without a dot: 2x, ab, (x+1)(x-1)
    if (!/^(?:[\d.+\-*/() ]|Math\.sqrt|Math\.PI)+$/.test(js)) return null
    try {
        const value = Function(`return ${js}`)() as number
        return Number.isFinite(value) ? value : null
    } catch {
        return null // −3**2 is not valid JavaScript: check it by hand
    }
}

/** A formula with an operation in it (not just a signed number such as −8) */
const isCalculation = (latex: string) => /[\d)\]}]\s*(?:[+-]|\\cdot|\\mathbin\{:\}|\\div|\^)|\\frac|\\sqrt/.test(latex)

const near = (a: number, b: number) => Math.abs(a - b) < 1e-9 * Math.max(1, Math.abs(b))

/** A rounded answer (≈ 5,83) is right when it is the result rounded to its own decimals */
function matches(answer: string, value: number, question: number): boolean {
    if (!/^\s*\\approx/.test(answer)) return near(value, question)
    const decimals = answer.match(/\{,\}(\d+)/)?.[1].length ?? 0
    return Math.abs(value - question) <= 0.5 * 10 ** -decimals + 1e-9
}

/** The two sides of an equation such as 3x-5=10, or null when it is not one */
function sides(latex: string): [string, string] | null {
    const parts = latex.split('=')
    return parts.length === 2 && !/[<>]|\\[lg]eq|\\to|\\sim/.test(latex) ? [parts[0], parts[1]] : null
}

/** The values of x in an answer such as x=5, x=\pm 5 or x=0,\ x=5; null when it is something else */
function solutions(answer: string): number[] | null {
    const found: number[] = []
    for (const part of answer.split(/(?<!\{),(?!\})/)) {
        const match = part.replace(/^\s*(?:\\ |\\quad|\\qquad)?\s*/, '').match(/^x(?:_\{\d\})?=(\\pm\s*)?(.+)$/)
        const value = match ? evaluate(match[2]) : null
        if (match === null || value === null) return null
        found.push(value, ...(match[1] ? [-value] : []))
    }
    return found
}

/** Whether x = value makes both sides of the equation equal */
function satisfies([left, right]: [string, string], value: number): boolean {
    const at = (side: string) => evaluate(side, (name) => (name === 'x' ? value : Number.NaN))
    const a = at(left)
    const b = at(right)
    return a !== null && b !== null && near(a, b)
}

/** Two equations are equivalent when left − right of one is a multiple of the other's (tried at two sets of numbers) */
function equivalent(first: [string, string], second: [string, string]): boolean | null {
    const difference = ([left, right]: [string, string], trial: number) => {
        const a = evaluate(left, trial)
        const b = evaluate(right, trial)
        return a === null || b === null ? null : a - b
    }
    const [p, q, r, t] = [difference(first, 0), difference(first, 1), difference(second, 0), difference(second, 1)]
    if (p === null || q === null || r === null || t === null) return null
    return near(p * t, q * r) && !near(r, 0)
}

const sameSet = (a: number[], b: number[]) => a.length === b.length && [...a].sort((x, y) => x - y).every((v, i) => near(v, [...b].sort((x, y) => x - y)[i]))

/** Words outside the formulas, to tell the languages apart */
const words = (text: string) => text.replace(/\$[^$]+\$/g, ' ')

function texts(entry: Entry): LocalizedText[] {
    return [entry.mistake.wrong, entry.mistake.right, entry.check.prompt, ...entry.check.options, entry.check.explanation]
}

test('lesson checks: at least one unit has them', () => {
    assert.ok(units.length > 0)
})

for (const unit of units) {
    test(`${unit.folder}: every lesson has a typical mistake and a «Check it» question`, () => {
        assert.deepEqual(Object.keys(unit.checks).sort(), lessonIds(unit.folder).sort())
        const indexes = new Set<number>()
        for (const [id, { check }] of Object.entries(unit.checks)) {
            assert.equal(check.options.length, 3, `${id}: three answers`)
            assert.ok(check.correctIndex >= 0 && check.correctIndex < check.options.length, `${id}: right answer`)
            indexes.add(check.correctIndex)
            for (const language of languages) {
                assert.equal(new Set(check.options.map((option) => option[language])).size, check.options.length, `${id}: distinct answers in ${language}`)
            }
        }
        assert.ok(indexes.size > 1, 'the right answer is not always in the same place')
    })

    test(`${unit.folder}: texts in four languages, same formulas, all drawn by KaTeX`, () => {
        for (const [id, entry] of Object.entries(unit.checks)) {
            for (const text of texts(entry)) {
                for (const language of languages) assert.ok(text[language].trim(), `${id}: empty ${language}`)
                const reference = formulas(text.es).sort()
                for (const language of ['eu', 'en'] as const) assert.deepEqual(formulas(text[language]).sort(), reference, `${id}: formulas in ${language}: ${text[language]}`)
                assert.deepEqual(formulas(text.ar).sort(), reference.map((formula) => formula.replace(/\{,\}/g, '.')).sort(), `${id}: formulas in ar: ${text.ar}`)
                assert.ok(!text.ar.includes('{,}'), `${id}: Arabic writes a point`)
                for (const formula of formulas(text.es)) assert.doesNotThrow(() => katex.renderToString(formula, { throwOnError: true }), `${id}: ${formula}`)
            }
        }
    })

    test(`${unit.folder}: each language in its own place (say takes eu, es, ar, en)`, () => {
        for (const [id, entry] of Object.entries(unit.checks)) {
            for (const text of texts(entry)) {
                if (!/[a-zA-Z؀-ۿ]{3}/.test(words(text.es))) continue
                assert.ok(/[؀-ۿ]/.test(words(text.ar)), `${id}: ar is not Arabic: ${text.ar}`)
                for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), `${id}: Arabic in ${language}: ${text[language]}`)
                if (/[a-zA-Z]{5}/.test(words(text.es))) assert.ok(text.eu !== text.es && text.en !== text.es, `${id}: a text copied from Spanish: ${text.es}`)
            }
        }
    })

    test(`${unit.folder}: Basque glues no case ending to a number`, () => {
        for (const [id, entry] of Object.entries(unit.checks)) {
            for (const text of texts(entry)) {
                // Any lowercase letter right after a digit is a glued ending (10en, 3ko, 100ekoak); units go after a space
                assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')), `${id}: ${text.eu}`)
                assert.ok(!/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), `${id}: ${text.eu}`)
            }
        }
    })

    test(`${unit.folder}: when the question is a calculation, the right answer is its result`, (t) => {
        const unchecked: string[] = []
        for (const [id, { check }] of Object.entries(unit.checks)) {
            const asked = formulas(check.prompt.es)
            const answer = formulas(check.options[check.correctIndex].es)
            if (asked.length !== 1 || answer.length !== 1) continue
            // An equation: each solution must make both sides equal, or the answer must be an equivalent equation
            const equation = asked[0].search(letter) >= 0 ? sides(asked[0]) : null
            if (!equation && !isCalculation(asked[0])) continue
            if (equation) {
                const roots = solutions(answer[0])
                const others = check.options.filter((_, index) => index !== check.correctIndex).map((option) => formulas(option.es)[0] ?? '')
                if (roots) {
                    assert.ok(roots.every((root) => satisfies(equation, root)), `${id}: ${answer[0]} does not solve ${asked[0]}`)
                    for (const other of others) {
                        const wrong = solutions(other)
                        if (!wrong) continue
                        assert.ok(!sameSet(wrong, roots), `${id}: a wrong answer is also right: ${other}`)
                        // A wrong answer with every right root and more, all of them solutions: the right one misses some
                        const more = wrong.every((root) => satisfies(equation, root)) && roots.every((root) => wrong.some((w) => near(w, root)))
                        assert.ok(!more, `${id}: ${other} has more solutions than the right answer`)
                    }
                    continue
                }
                const rewritten = sides(answer[0])
                const same = rewritten && equivalent(equation, rewritten)
                if (same === null || same === undefined) {
                    unchecked.push(`${id}: ${asked[0]}`)
                    continue
                }
                assert.ok(same, `${id}: ${answer[0]} is not equivalent to ${asked[0]}`)
                for (const other of others) {
                    const wrong = sides(other)
                    if (wrong) assert.ok(equivalent(equation, wrong) === false, `${id}: a wrong answer is also right: ${other}`)
                }
                continue
            }
            // An expression with letters (reduce, expand, factorise) is compared at two sets of numbers
            const algebraic = asked[0].search(letter) >= 0 && !/[=<>]/.test(asked[0] + answer[0])
            const trials = algebraic ? [0, 1] : [undefined]
            const valuesOf = (formula: string) => trials.map((trial) => evaluate(formula, trial))
            const question = valuesOf(asked[0])
            const value = valuesOf(answer[0])
            if (question.includes(null) || value.includes(null)) {
                unchecked.push(`${id}: ${asked[0]}`)
                continue
            }
            const same = (formula: string, values: Array<number | null>) => values.every((v, i) => v !== null && matches(formula, v, question[i] as number))
            assert.ok(same(answer[0], value), `${id}: ${asked[0]} = ${answer[0]}`)
            for (const [index, option] of check.options.entries()) {
                const formula = formulas(option.es)[0] ?? ''
                const other = valuesOf(formula)
                if (index !== check.correctIndex && !other.includes(null)) assert.ok(!same(formula, other), `${id}: a wrong answer is also right: ${formula}`)
            }
        }
        // Questions that look like a calculation but this evaluator cannot read: check them by hand
        if (unchecked.length) t.diagnostic(`not evaluated: ${unchecked.join(' · ')}`)
    })
}
