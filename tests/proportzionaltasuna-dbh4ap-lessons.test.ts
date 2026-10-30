import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import katex from 'katex'
import { evaluate } from './helpers/realsRaceCheck.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { formulaFor } from '../src/utils/latexLanguage.ts'
import { proportionDbh4ApLessonTexts as lessonTexts } from '../src/pages/dbh4-aplikatuak-proportzionaltasuna/lessonTexts.ts'

/* The lessons of Proportzionaltasuna 4. DBH aplikatuak: a short explanation, its cases and its typical mistake (V1 and V2 of the review) */

const topics = ['relations', 'direct-rule', 'inverse-rule', 'compound', 'direct-share', 'inverse-share', 'percent-calc', 'index', 'chained', 'simple-interest', 'compound-interest', 'periods', 'mixtures', 'motion', 'taps']
const languages = ['eu', 'es', 'en', 'ar'] as const
/** A case ending glued to a number (8an, 1200ez, 3rekin…), which the Basque texts never write */
const basqueEnding = /\d-?(an|ean|ra|era|tik|etik|ko|eko|rekin|ekin|en|ren|k|z|ez|tan|etan|ri|eri)\b/
const words = (text: string) => text.replace(/\$[^$]*\$/g, '')

const lessonParts = (id: string): LocalizedText[] => {
    const lesson = lessonTexts[id]
    return [lesson.explanation, ...lesson.cases.flatMap((item) => [item.title!, item.text, ...(item.math && typeof item.math !== 'string' ? [item.math] : [])]), lesson.mistake.wrong, lesson.mistake.right]
}

test('proportzionaltasuna 4. DBH ap lessons: every lesson is short, split into cases and has its typical mistake', () => {
    assert.deepEqual(Object.keys(lessonTexts).sort(), [...topics].sort())
    for (const id of topics) {
        const lesson = lessonTexts[id]
        assert.ok(lesson.explanation.es.length <= 250, `${id}: ${lesson.explanation.es.length} characters`)
        assert.ok(lesson.cases.length >= 2 && lesson.cases.length <= 4, id)
        for (const item of lesson.cases) assert.ok(item.title, `${id}: a case without a name`)
        for (const language of languages) for (const text of lessonParts(id)) assert.ok(text[language].trim().length > 0, `${id} ${language}`)
        // The right way is not the wrong one
        assert.notEqual(lesson.mistake.wrong.es, lesson.mistake.right.es)
    }
})

test('proportzionaltasuna 4. DBH ap lessons: formulas render, and each language keeps its rules', () => {
    let formulas = 0
    for (const id of topics) {
        for (const text of lessonParts(id)) {
            for (const language of languages) {
                const line = text[language]
                assert.equal(line.split('$').length % 2, 1, `${id} ${language}: ${line}`)
                for (const [, formula] of line.matchAll(/\$([^$]+)\$/g)) {
                    katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
                    assert.ok(!/[؀-ۿ]/.test(formula) && !formula.includes('\\text'), `${id}: ${formula}`)
                    formulas += 1
                }
                if (language === 'eu') assert.ok(!basqueEnding.test(words(line)), `${id}: ${line}`)
                if (language === 'ar') assert.ok(!line.includes('{,}') && !/\d,\d/.test(line), `${id}: ${line}`)
                if (language === 'en') assert.ok(!/\d,\d{1,2}(?!\d)/.test(words(line)), `${id}: a decimal comma in English: ${line}`)
                // A number never breaks from its € or % in Basque and Spanish
                if (language === 'eu' || language === 'es') assert.ok(!/\d [€%]|% [\d$]/.test(line), `${id}: ${line}`)
            }
        }
    }
    assert.ok(formulas > 150, `only ${formulas}`)
})

test('proportzionaltasuna 4. DBH ap lessons: every language has the same formulas', () => {
    const formulas = (line: string) => [...line.matchAll(/\$([^$]+)\$/g)].map((match) => match[1])
    for (const id of topics) {
        for (const text of lessonParts(id)) {
            const spanish = formulas(text.es)
            for (const language of ['eu', 'en'] as const) assert.deepEqual(formulas(text[language]), spanish, `${id} ${language}: ${text[language]}`)
            assert.deepEqual(formulas(text.ar), spanish.map((formula) => formula.replace(/\{,\}/g, '.')), `${id} ar: ${text.ar}`)
        }
    }
})

test('proportzionaltasuna 4. DBH ap lessons: every worked equality with numbers is right, the mistakes too', () => {
    let checked = 0
    for (const id of topics) {
        for (const text of lessonParts(id)) {
            for (const [, formula] of text.es.matchAll(/\$([^$]+)\$/g)) {
                if (formula.includes('\\approx')) continue
                for (const part of formula.split(/\\ \\to\\ /)) {
                    const values = part.split('=').map((side) => evaluate(side)).filter((value): value is number => value !== null)
                    if (values.length < 2) continue
                    assert.ok(values.every((value) => Math.abs(value - values[0]) < 1e-9 * Math.max(1, Math.abs(values[0]))), `${id}: ${part} → ${values.join(' / ')}`)
                    checked += 1
                }
            }
        }
    }
    assert.ok(checked >= 30, `only ${checked} checked`)
})

test('proportzionaltasuna 4. DBH ap lessons: the examples that challenges call «the one in the lesson» are still there', () => {
    const spanish = (id: string) => lessonParts(id).map((text) => text.es).join(' ')
    assert.ok(spanish('compound-interest').includes('1100, 1210, 1331'))
    assert.ok(spanish('simple-interest').includes('448,80'))
    assert.ok(spanish('percent-calc').includes('24 000 aficionados'))
    assert.ok(spanish('mixtures').includes('12,40') && spanish('mixtures').includes('ley 0,85'))
    assert.ok(spanish('motion').includes('240 km') && spanish('motion').includes('110 km/h'))
    assert.ok(spanish('taps').includes('A en 5 h y B en 7 h'))
})

test('proportzionaltasuna 4. DBH ap lessons: the other Basque texts of the lessons have no ending on a number either', () => {
    const source = readFileSync(new URL('../src/pages/dbh4-aplikatuak-proportzionaltasuna/lessons.tsx', import.meta.url), 'utf8')
    // The first string of each say(…) is the Basque one
    const basque = [...source.matchAll(/say\(\s*'((?:[^'\\]|\\.)*)'/g)].map((match) => match[1])
    assert.ok(basque.length > 100, `only ${basque.length}`)
    for (const line of basque) assert.ok(!basqueEnding.test(words(line)), line)
})
