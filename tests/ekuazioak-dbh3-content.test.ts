import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { equations3Challenges as realsChallenges, equations3Diagnostic as realsDiagnostic, equations3ExerciseBank as realsExerciseBank, equations3Practice as realsPractice } from '../src/pages/dbh3-ekuazioak/content.ts'
import { readFileSync } from 'node:fs'

const stages = ['linear', 'quadratic', 'systems', 'methods', 'problems']
const topics = ['equations', 'brackets', 'denominators', 'incomplete', 'formula', 'discriminant', 'pairs', 'graphic', 'classify', 'substitution', 'equalisation', 'elimination', 'equation-problems', 'quadratic-problems', 'system-problems']

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

test('ekuazioak 3. DBH: the unit is active and routed', () => {
    const course = courses.find((item) => item.id === 'dbh3')!
    assert.ok(course.topics.find((topic) => topic.id === 'ecuaciones-sistemas')!.active)
    assert.ok(isUnitV2Path('/matematika/dbh3/ecuaciones-sistemas'))
    assert.ok(isUnitV2Path('/matematika/dbh3/ecuaciones-sistemas/ariketak'))
})

test('ekuazioak 3. DBH: diagnostic, practice, challenges and bank are consistent', () => {
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

test('ekuazioak 3. DBH: every formula renders in KaTeX', () => {
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

test('ekuazioak 3. DBH: Arabic never keeps the decimal comma', () => {
    for (const text of allTexts()) assert.ok(!text.ar.includes('{,}'), text.ar)
})

test('ekuazioak 3. DBH: every worked equality with numbers is right', () => {
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
    // Equations are checked by substitution below; plain arithmetic is rarer here
    assert.ok(checked >= 15, `only ${checked} checked`)
})

/** Evaluates a LaTeX expression in x and y at given values: \\frac, \\cdot, powers and brackets */
function at(latex: string, values: Record<string, number>): number | null {
    let js = latex.replace(/\\,/g, '').replace(/\\left|\\right/g, '').replace(/\\cdot/g, '*').replace(/\s+/g, '')
    for (let pass = 0; pass < 3; pass += 1) js = js.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))')
    js = js.replace(/\^\{([^{}]+)\}/g, '**($1)').replace(/[{}]/g, '').replace(/[xy]/g, (letter) => `(${values[letter]})`).replace(/(\d|\))\(/g, '$1*(')
    if (/[^0-9+\-*/().]/.test(js) || js === '') return null
    try {
        const value = Function(`return ${js}`)() as number
        return Number.isFinite(value) ? value : null
    } catch {
        return null
    }
}
const holds = (equation: string, values: Record<string, number>) => {
    const [left, right] = equation.split('=').map((side) => at(side, values))
    return left !== null && right !== null && Math.abs(left - right) < 1e-9
}

test('ekuazioak 3. DBH: every equation that is solved holds for its answer, and every solved system for its pair', () => {
    let equations = 0
    let systems = 0
    const items = [
        ...[...realsPractice, ...realsChallenges].map((item) => ({ prompt: item.prompt.es, expected: item.expected, solution: item.explanation.es })),
        ...realsExerciseBank.flatMap((section) => section.items.map((item) => ({ prompt: item.question.es, expected: item.answer!.expected, solution: item.solution.es })))
    ]
    for (const { prompt, expected, solution } of items) {
        const value = expected.numerator / expected.denominator
        const single = prompt.match(/^Resuelve \$([^$]+)\$\./)
        if (single && !single[1].includes('y')) {
            assert.ok(holds(single[1], { x: value }), `${single[1]} at ${value}`)
            equations += 1
        }
        const pair = prompt.match(/^Resuelve el sistema \$([^$]+)\$, \$([^$]+)\$/)
        if (pair) {
            const x = [...solution.matchAll(/x=(-?\d+)/g)].pop()
            const y = [...solution.matchAll(/y=(-?\d+)/g)].pop()
            assert.ok(x && y, solution)
            const values = { x: Number(x[1]), y: Number(y[1]) }
            assert.ok(holds(pair[1], values) && holds(pair[2], values), `${pair[1]}, ${pair[2]} at ${JSON.stringify(values)}`)
            assert.ok(prompt.includes('$x$?') ? values.x === value : values.y === value, prompt)
            systems += 1
        }
    }
    assert.ok(equations >= 25, `only ${equations} equations`)
    assert.ok(systems >= 15, `only ${systems} systems`)
})

test('ekuazioak 3. DBH: every answer appears in its worked explanation or solution', () => {
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

const lessonsSource = readFileSync(new URL('../src/pages/dbh3-ekuazioak/lessons.tsx', import.meta.url), 'utf8').replace(/\\\\/g, '\\')

test('ekuazioak 3. DBH: fifteen lessons in five stages, every formula renders', () => {
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

test('ekuazioak 3. DBH: no Basque suffix glued to a number', () => {
    for (const text of allTexts()) {
        // «3ri», «5ekin»: a letter suffix glued to a digit or to a formula in Basque
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/\$(?:ri|ren|rekin|z|ra|tik|ei)(?![a-zA-Z])/.test(text.eu), text.eu)
    }
})

test('ekuazioak 3. DBH: the formulas in the takeaway boxes have no lowercase letters (the box prints KaTeX in capitals)', () => {
    const takeaways = lessonsSource.split('\n').filter((line) => line.trimStart().startsWith('takeaway:'))
    assert.equal(takeaways.length, 15)
    for (const line of takeaways) {
        for (const [, formula] of line.matchAll(/\$([^$]+)\$/g)) {
            // Commands such as \neq are fine; letters of their own are not
            assert.ok(!/[a-z]/.test(formula.replace(/\\[a-zA-Z]+/g, '')), formula)
        }
    }
})

test('ekuazioak 3. DBH: every lesson names its typical mistake, and the Basque lessons glue no suffix to a number', () => {
    const mistakes = lessonsSource.split('\n').filter((line) => line.trimStart().startsWith('mistake: {'))
    assert.equal(mistakes.length, 15)
    for (const [, eu] of lessonsSource.matchAll(/say\(\s*'((?:[^'\\]|\\.)*)'/g)) {
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ez|ei|en|k|ko|eko|an|ean|etan)(?![a-zA-Z])/.test(eu.replace(/\$[^$]+\$/g, '')), eu)
    }
})

test('ekuazioak 3. DBH: the diagnostic ids are its own block', () => {
    assert.deepEqual(realsDiagnostic.map((question) => question.id), [6701, 6702, 6703, 6704, 6705, 6706, 6707, 6708])
})
