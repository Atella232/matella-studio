import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { polynomialsChallenges as realsChallenges, polynomialsDiagnostic as realsDiagnostic, polynomialsExerciseBank as realsExerciseBank, polynomialsPractice as realsPractice } from '../src/pages/dbh3-polinomioak/content.ts'
import { readFileSync } from 'node:fs'

const stages = ['algebra', 'operations', 'identities', 'ruffini', 'factor']
const topics = ['expressions', 'monomials', 'value', 'add-sub', 'product', 'division', 'square-sum', 'square-diff', 'sum-diff', 'ruffini', 'remainder', 'roots', 'common-factor', 'factor-identities', 'algebraic-fractions']

const typed = (value: FractionValue, form?: string) => (hasTerminatingDecimal(value) && (form !== 'simplified' || value.denominator === 1) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)!.replace(',', '{,}') : `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`)

/** Plain arithmetic in LaTeX (no letters): powers, fractions, roots, products, divisions and decimal commas */
function evaluate(latex: string): number | null {
    let js = latex
        .replace(/\\,/g, '')
        .replace(/\\left|\\right/g, '')
        .replace(/(\d)\{,\}(\d)/g, '$1.$2')
        .replace(/\\cdot/g, '*')
        .replace(/\\mathbin\{:\}|:/g, '/')
        .replace(/\s+/g, '')
    for (let pass = 0; pass < 4; pass += 1) {
        js = js
            .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))')
            .replace(/\\sqrt\[(\d+)\]\{([^{}]+)\}/g, 'Math.cbrtn($2,$1)')
            .replace(/\\sqrt\{([^{}]+)\}/g, 'Math.sqrt($1)')
            .replace(/(\([^()]+\)|\d+(?:\.\d+)?)\^\{([^{}]+)\}/g, 'Math.pow($1,($2))')
    }
    js = js.replace(/\)\(/g, ')*(').replace(/(\d)\(/g, '$1*(').replace(/(\d)Math/g, '$1*Math').replace(/\)Math/g, ')*Math')
    if (!/^(?:[\d+\-*/().,]|Math\.(?:pow|sqrt|cbrtn))+$/.test(js) || !/\d/.test(js)) return null
    const cbrtn = (value: number, index: number) => (value < 0 ? -((-value) ** (1 / index)) : value ** (1 / index))
    try {
        return Function('Math', `return ${js}`)({ ...Math, pow: Math.pow, sqrt: Math.sqrt, cbrtn }) as number
    } catch {
        return null
    }
}

const allTexts = (): LocalizedText[] => [
    ...realsDiagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...realsPractice, ...realsChallenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...realsExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

test('polinomioak 3. DBH: the unit is active and routed', () => {
    const course = courses.find((item) => item.id === 'dbh3')!
    assert.ok(course.topics.find((topic) => topic.id === 'polinomios')!.active)
    assert.ok(isUnitV2Path('/matematika/dbh3/polinomios'))
    assert.ok(isUnitV2Path('/matematika/dbh3/polinomios/ariketak'))
})

test('polinomioak 3. DBH: diagnostic, practice, challenges and bank are consistent', () => {
    assert.equal(realsDiagnostic.length, 8)
    for (const question of realsDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    // The right option is not always in the same place
    assert.ok(new Set(realsDiagnostic.map((question) => question.correctIndex)).size === 3)
    for (const stage of stages) {
        assert.equal(realsPractice.filter((item) => item.stage === stage).length, 4, stage)
        assert.ok(realsChallenges.some((item) => item.stage === stage), stage)
    }
    for (const item of [...realsPractice, ...realsChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected, item.answerForm), item.expected, item.answerForm), 'correct', `${item.id}`)
        for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.explanation[language].length > 0 && item.prompt[language].length > 0 && item.hint[language].length > 0, `${item.id} ${language}`)
    }
    assert.deepEqual(realsExerciseBank.map((section) => section.id), stages)
    const ids = realsExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    for (const section of realsExerciseBank) {
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) {
            for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.question[language].length > 0 && item.solution[language].length > 0, `${item.id} ${language}`)
            if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected, item.answer.form), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
        }
    }
    assert.equal(new Set(realsChallenges.map((item) => item.id)).size, realsChallenges.length)
    assert.deepEqual([...new Set(realsChallenges.map((item) => item.points))].sort(), [10, 20, 30])
})

test('polinomioak 3. DBH: every formula renders in KaTeX', () => {
    let formulas = 0
    for (const text of allTexts()) {
        for (const language of ['eu', 'es', 'en', 'ar'] as const) {
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) {
                katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
                formulas += 1
            }
        }
    }
    assert.ok(formulas > 250, `only ${formulas}`)
})

test('polinomioak 3. DBH: Arabic never keeps the decimal comma', () => {
    for (const text of allTexts()) assert.ok(!text.ar.includes('{,}'), text.ar)
})

test('polinomioak 3. DBH: every worked equality with numbers is right', () => {
    const texts = [
        ...realsPractice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...realsChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...realsExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...realsDiagnostic.flatMap((item) => [item.explanation.es])
    ]
    let checked = 0
    for (const text of texts) {
        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
            // Approximations (≈) and periodic decimals (\overline) are written rounded: skip them
            if (formula.includes('\\approx') || formula.includes('\\overline') || formula.includes('\\ldots')) continue
            for (const part of formula.split(/\\qquad|\\quad|\\ \\to\\ |\\to/)) {
                const values = part.replace(/^[a-z]\)\s*/, '').split('=').map(evaluate).filter((value): value is number => value !== null)
                if (values.length < 2) continue
                assert.ok(values.every((value) => Math.abs(value - values[0]) < 1e-9 * Math.max(1, Math.abs(values[0]))), `${part} → ${values.join(' / ')}`)
                checked += 1
            }
        }
    }
    assert.ok(checked >= 40, `only ${checked} checked`)
})

/** A polynomial identity in x, evaluated at a number: x^{2}, \\cdot, \\frac and brackets */
function atX(latex: string, x: number): number | null {
    // A quotient of monomials: each side of the colon is evaluated on its own
    const halves = latex.split('\\mathbin{:}')
    if (halves.length === 2) {
        const [top, bottom] = halves.map((half) => atX(half.replace(/^\((.*)\)$/, '$1'), x))
        return top === null || bottom === null || bottom === 0 ? null : top / bottom
    }
    if (/[a-wyzA-Z]/.test(latex.replace(/\\(cdot|frac|left|right|mathbin)/g, ''))) return null
    let js = latex.replace(/\\,/g, '').replace(/\\left|\\right/g, '').replace(/\\cdot/g, '*').replace(/\\mathbin\{:\}/g, '/').replace(/\s+/g, '')
    for (let pass = 0; pass < 3; pass += 1) js = js.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))')
    js = js.replace(/\^\{([^{}]+)\}/g, '**($1)').replace(/[{}]/g, '').replace(/x/g, `(${x})`).replace(/(\d|\))\(/g, '$1*(')
    if (/[^0-9+\-*/().]/.test(js) || js === '') return null
    try {
        const value = Function(`return ${js}`)() as number
        return Number.isFinite(value) ? value : null
    } catch {
        return null
    }
}

test('polinomioak 3. DBH: every worked identity in x holds for several values of x', () => {
    const texts = [
        ...realsPractice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...realsChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...realsExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...realsDiagnostic.flatMap((item) => [item.explanation.es])
    ]
    let checked = 0
    for (const text of texts) {
        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
            if (!formula.includes('x') || formula.includes('\\approx')) continue
            for (const part of formula.split(/\\qquad|\\quad|\\ \\to\\ |\\to|,\\ /)) {
                const sides = part.split('=')
                if (sides.length < 2 || !sides.every((side) => side.includes('x') || /^-?\d+$/.test(side.trim()))) continue
                // x = 3 style answers are not identities
                if (sides.length === 2 && sides[0].trim() === 'x') continue
                const rows = [2, 3, -1].map((x) => sides.map((side) => atX(side, x)))
                if (rows.some((row) => row.some((value) => value === null))) continue
                for (const row of rows) assert.ok(row.every((value) => Math.abs(value! - row[0]!) < 1e-9 * Math.max(1, Math.abs(row[0]!))), `${part} → ${row.join(' / ')}`)
                checked += 1
            }
        }
    }
    assert.ok(checked >= 25, `only ${checked} identities checked`)
})

test('polinomioak 3. DBH: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const plain = written(value)
        const asFraction = `\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`
        const minus = value.numerator < 0 ? [`-${plain}`, `-${asFraction}`] : [asFraction]
        const scientific = [`10^{${value.numerator}}`]
        const coefficient = [`${value.numerator}\\sqrt`, `${value.numerator}\\,\\%`, `${value.numerator}\\sqrt[3]`]
        // Thousands are grouped with thin spaces: 10\,000
        return [plain, ...minus, ...scientific, ...coefficient].some((candidate) => text.replace(/\\,/g, '').includes(candidate))
    }
    for (const item of [...realsPractice, ...realsChallenges]) assert.ok(shows(item.explanation.es, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const section of realsExerciseBank) for (const item of section.items) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `bank ${item.id}`)
})

const lessonsSource = readFileSync(new URL('../src/pages/dbh3-polinomioak/lessons.tsx', import.meta.url), 'utf8').replace(/\\\\/g, '\\')

test('polinomioak 3. DBH: fifteen lessons in five stages, every formula renders', () => {
    const ids = [...lessonsSource.matchAll(/^ {8}id: '([a-z-]+)',\n {8}stage: '([a-z-]+)'/gm)]
    assert.deepEqual(ids.map((match) => match[1]), topics)
    for (const stage of stages) assert.ok(ids.some((match) => match[2] === stage), stage)
    let formulas = 0
    for (const [, formula] of lessonsSource.matchAll(/\$([^$\n']+)\$/g)) {
        katex.renderToString(formula, { throwOnError: true, strict: 'error' })
        formulas += 1
    }
    assert.ok(formulas > 200, `only ${formulas}`)
    assert.equal((lessonsSource.match(/\\text\{/g) ?? []).length, 0)
})

test('polinomioak 3. DBH: no Basque suffix glued to a number', () => {
    for (const text of allTexts()) {
        // «3ri», «5ekin»: a letter suffix glued to a digit or to a formula in Basque
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/\$(?:ri|ren|rekin|z|ra|tik|ei)(?![a-zA-Z])/.test(text.eu), text.eu)
    }
})

test('polinomioak 3. DBH: the formulas in the takeaway boxes have no lowercase letters (the box prints KaTeX in capitals)', () => {
    const takeaways = lessonsSource.split('\n').filter((line) => line.trimStart().startsWith('takeaway:'))
    assert.equal(takeaways.length, 15)
    for (const line of takeaways) {
        for (const [, formula] of line.matchAll(/\$([^$]+)\$/g)) {
            // Commands such as \neq are fine; letters of their own are not
            assert.ok(!/[a-z]/.test(formula.replace(/\\[a-zA-Z]+/g, '')), formula)
        }
    }
})

test('polinomioak 3. DBH: every lesson names its typical mistake, and the Basque lessons glue no suffix to a number', () => {
    const mistakes = lessonsSource.split('\n').filter((line) => line.trimStart().startsWith('mistake: {'))
    assert.equal(mistakes.length, 15)
    for (const [, eu] of lessonsSource.matchAll(/say\(\s*'((?:[^'\\]|\\.)*)'/g)) {
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ez|ei|en|k|ko|eko|an|ean|etan)(?![a-zA-Z])/.test(eu.replace(/\$[^$]+\$/g, '')), eu)
    }
})

test('polinomioak 3. DBH: the diagnostic ids are its own block', () => {
    assert.deepEqual(realsDiagnostic.map((question) => question.id), [6601, 6602, 6603, 6604, 6605, 6606, 6607, 6608])
})
