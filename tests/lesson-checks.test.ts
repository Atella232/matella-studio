import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import katex from 'katex'
import { integerLessonChecks } from '../src/pages/dbh2-zenbaki-osoak/lessonChecks.ts'
import type { LessonCheck, LessonMistake, LocalizedText } from '../src/features/unit-v2/types.ts'

/* The typical mistake and the «Check it» question of every lesson, unit by unit. A unit that gets them adds
   one line here, with the folder whose lessons file lists its lesson ids. */

const units: Array<{ name: string; folder: string; checks: Record<string, { mistake: LessonMistake; check: LessonCheck }> }> = [
    { name: 'Zenbaki osoak 2. DBH', folder: 'dbh2-zenbaki-osoak', checks: integerLessonChecks }
]

const languages = ['eu', 'es', 'en', 'ar'] as const

/** The lesson ids of a unit, read from its lessons file (a lesson id is followed by its stage) */
function lessonIds(folder: string): string[] {
    const source = readFileSync(new URL(`../src/pages/${folder}/lessons.tsx`, import.meta.url), 'utf8')
    return [...source.matchAll(/id: '([^']+)',\s*stage:/g)].map(([, id]) => id)
}

const formulas = (text: string) => [...text.matchAll(/\$([^$]+)\$/g)].map(([, formula]) => formula)

/** Evaluates an integer expression (·, :, brackets) with plain arithmetic; null when it is something else */
function evaluate(latex: string): number | null {
    const js = latex.replace(/\\cdot/g, '*').replace(/\\mathbin\{:\}/g, '/').replace(/[[\]]/g, (b) => (b === '[' ? '(' : ')'))
    if (!/^[\d+\-*/() ]+$/.test(js)) return null
    return Function(`return ${js}`)() as number
}

/** A formula with an operation in it (not just a signed number such as −8) */
const isCalculation = (latex: string) => /[\d)\]]\s*(?:[+-]|\\cdot|\\mathbin\{:\})/.test(latex)

function texts(entry: { mistake: LessonMistake; check: LessonCheck }): LocalizedText[] {
    return [entry.mistake.wrong, entry.mistake.right, entry.check.prompt, ...entry.check.options, entry.check.explanation]
}

for (const unit of units) {
    test(`${unit.name}: every lesson has a typical mistake and a «Check it» question`, () => {
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

    test(`${unit.name}: texts in four languages, same formulas, all drawn by KaTeX`, () => {
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

    test(`${unit.name}: Basque glues no case ending to a number`, () => {
        for (const [id, entry] of Object.entries(unit.checks)) {
            for (const text of texts(entry)) {
                assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ez|ei|en|k|ko|eko|an|ean|etan)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), `${id}: ${text.eu}`)
                assert.ok(!/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), `${id}: ${text.eu}`)
            }
        }
    })

    test(`${unit.name}: when the question is a calculation, the right answer is its result`, () => {
        for (const [id, { check }] of Object.entries(unit.checks)) {
            const asked = formulas(check.prompt.es)
            const answer = formulas(check.options[check.correctIndex].es)
            if (asked.length !== 1 || answer.length !== 1 || !isCalculation(asked[0])) continue
            const question = evaluate(asked[0])
            const value = evaluate(answer[0])
            if (question === null || value === null) continue
            assert.equal(value, question, `${id}: ${asked[0]} = ${answer[0]}`)
            for (const [index, option] of check.options.entries()) {
                if (index !== check.correctIndex) assert.notEqual(evaluate(formulas(option.es)[0] ?? ''), question, `${id}: a wrong answer is also right`)
            }
        }
    })
}
