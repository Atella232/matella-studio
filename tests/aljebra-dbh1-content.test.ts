import test from 'node:test'
import assert from 'node:assert/strict'
import { algebraIntroChallenges, algebraIntroDiagnostic, algebraIntroExerciseBank, algebraIntroPractice } from '../src/pages/dbh1-aljebra-v2/content.ts'
import { degreeOf, equationLatex, isSolution, linearLatex, reduceTerms, solve, termsLatex } from '../src/pages/dbh1-aljebra-v2/algebra.ts'
import { checkAnswer, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'

const stages = ['language', 'monomials', 'operations', 'equations', 'problems']
const topics = ['letters', 'translate', 'value', 'monomial', 'like-terms', 'polynomial', 'add-monomials', 'multiply-monomials', 'brackets', 'equation', 'trial', 'transpose', 'solve', 'problems']

/**
 * Evaluates an algebraic expression written in LaTeX for given letter values:
 * implicit products (3x, 2(x+1), ab), powers, fractions, · and :. Null when
 * the text is not an expression (words, \square…).
 */
function evaluate(latex: string, values: Record<string, number> = {}): number | null {
    let js = latex
        .replace(/\\left|\\right/g, '')
        .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))')
        .replace(/\\cdot/g, '*')
        .replace(/\\mathbin\{:\}/g, '/')
        .replace(/\^\{([^{}]+)\}/g, '**($1)')
        .replace(/\s+/g, '')
    if (/[^\d+\-*/().a-z]/.test(js)) return null
    // implicit multiplication: 3x, 2(, )(, x(, xy, )x
    js = js.replace(/(\d|\))(?=[a-z(])/g, '$1*').replace(/([a-z])(?=[a-z(\d])/g, '$1*')
    const letters = [...new Set(js.match(/[a-z]/g) ?? [])]
    if (letters.some((letter) => !(letter in values))) return null
    const body = letters.reduce((text, letter) => text.replace(new RegExp(letter, 'g'), `(${values[letter]})`), js)
    if (!/\d/.test(body)) return null
    return Function(`return ${body}`)() as number
}

test('aljebra 1. DBH: the unit replaces the legacy pages', () => {
    assert.ok(isUnitV2Path('/matematika/dbh1/algebra'))
    assert.ok(isUnitV2Path('/matematika/dbh1/algebra/teoria'))
})

test('aljebra 1. DBH: the algebra helpers write and solve like in class', () => {
    assert.equal(linearLatex({ a: 3, b: 2 }), '3x+2')
    assert.equal(linearLatex({ a: -1, b: -5 }), '-x-5')
    assert.equal(linearLatex({ a: 1, b: 0 }), 'x')
    assert.equal(linearLatex({ a: 0, b: 7 }), '7')
    const equation = { left: { a: 4, b: -7 }, right: { a: -1, b: 3 } }
    assert.equal(equationLatex(equation), '4x-7=-x+3')
    assert.equal(solve(equation), 2)
    assert.ok(isSolution(equation, 2))
    assert.equal(solve({ left: { a: 2, b: 1 }, right: { a: 2, b: 3 } }), null)
    const terms = reduceTerms([{ coefficient: 1, power: 2 }, { coefficient: 4, power: 1 }, { coefficient: 5, power: 2 }, { coefficient: 1, power: 1 }])
    assert.equal(termsLatex(terms), '6x^{2}+5x')
    assert.equal(degreeOf(terms), 2)
    assert.equal(termsLatex(reduceTerms([{ coefficient: 3, power: 1 }, { coefficient: -3, power: 1 }, { coefficient: -2, power: 0 }])), '-2')
})

test('aljebra 1. DBH: diagnostic, practice, challenges and bank are consistent', () => {
    for (const question of algebraIntroDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
    }
    for (const stage of stages) assert.ok(algebraIntroPractice.some((item) => item.stage === stage), stage)
    for (const item of [...algebraIntroPractice, ...algebraIntroChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        const value = toNumber(item.expected)
        assert.equal(checkAnswer(value < 0 ? `−${-value}` : String(value), item.expected), 'correct', `${item.id}`)
    }
    for (const section of algebraIntroExerciseBank) for (const item of section.items) if (item.answer) assert.equal(checkAnswer(String(toNumber(item.answer.expected)), item.answer.expected), 'correct')
    assert.deepEqual(algebraIntroExerciseBank.map((section) => section.id), stages)
    const ids = algebraIntroExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.equal(new Set(ids).size, ids.length)
})

test('aljebra 1. DBH: every equation asked is solved by its answer', () => {
    const asked = [
        ...[...algebraIntroPractice, ...algebraIntroChallenges].map((item) => ({ prompt: item.prompt.es, value: toNumber(item.expected) })),
        ...algebraIntroExerciseBank.flatMap((section) => section.items.filter((item) => item.answer).map((item) => ({ prompt: item.question.es, value: toNumber(item.answer!.expected) })))
    ]
    let checked = 0
    for (const { prompt, value } of asked) {
        const equation = prompt.match(/^Resuelve: \$([^$]+)\$$/)?.[1]
        if (!equation) continue
        const [left, right] = equation.split('=')
        assert.ok(Math.abs(evaluate(left, { x: value })! - evaluate(right, { x: value })!) < 1e-9, `${equation} with x = ${value}`)
        checked += 1
    }
    assert.ok(checked >= 12, `only ${checked} equations`)
})

test('aljebra 1. DBH: every worked numeric equality is right', () => {
    const texts = [
        ...algebraIntroPractice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...algebraIntroChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...algebraIntroExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...algebraIntroDiagnostic.map((item) => item.explanation.es)
    ]
    let checked = 0
    for (const text of texts) {
        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
            for (const part of formula.split(/\\qquad|\\quad|,\\ /)) {
                const sides = part.split('=')
                if (sides.length < 2) continue
                const values = sides.map((side) => evaluate(side))
                if (values.some((value) => value === null)) continue
                assert.ok(values.every((value) => Math.abs(value! - values[0]!) < 1e-9), `${part} → ${values.join(' / ')}`)
                checked += 1
            }
        }
    }
    assert.ok(checked >= 20, `only ${checked} checked`)
})

test('aljebra 1. DBH: reductions written in the exercises keep the value', () => {
    // An expression and its reduced form must agree for several values of the letters
    const pairs: Array<[string, string]> = [
        ['x^{2}+4x+5x^{2}+x', '6x^{2}+5x'],
        ['6x^{2}-7x+2x^{2}-x', '8x^{2}-8x'],
        ['3x^{3}-2x+5x^{2}-x^{3}+4x^{2}', '2x^{3}+9x^{2}-2x'],
        ['3(x^{2}+x)+5x', '3x^{2}+8x'],
        ['-4(x^{2}-x)-2x', '-4x^{2}+2x'],
        ['2x+2+3x', '5x+2'],
        ['3xy-xy+2xy+5x-2y+y+x', '4xy+6x-y'],
        ['2a-5a+4a-a+10a-6a', '4a'],
        ['3x+8-5x-5', '-2x+3'],
        ['2(x+6)-7x', '-5x+12']
    ]
    for (const [before, after] of pairs) {
        for (const x of [-2, 0, 1, 3]) {
            const values = { x, y: x + 2, a: x - 1 }
            assert.ok(Math.abs(evaluate(before, values)! - evaluate(after, values)!) < 1e-9, `${before} = ${after}`)
        }
    }
})
