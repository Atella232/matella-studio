import test from 'node:test'
import assert from 'node:assert/strict'
import { equationsChallenges, equationsDiagnostic, equationsExerciseBank, equationsPractice } from '../src/pages/dbh2-ekuazioak-v2/content.ts'
import { checkAnswer, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'

const stages = ['basics', 'first-degree', 'denominators', 'problems', 'quadratic']
const topics = ['meaning', 'elements', 'simple', 'brackets', 'special', 'denominators', 'lcm', 'mixed', 'problem-steps', 'problems-ages', 'problems-geometry', 'quadratic', 'incomplete', 'formula']

const typed = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)!.replace(',', '{,}') : `\\frac{${value.numerator}}{${value.denominator}}`)

/** Plain arithmetic in LaTeX (no letters): powers, fractions, products, divisions, decimal commas, thin-space thousands */
export function evaluate(latex: string): number | null {
    let js = latex
        .replace(/\\,/g, '')
        .replace(/(\d)\{,\}(\d)/g, '$1.$2')
        .replace(/\\cdot/g, '*')
        .replace(/\\mathbin\{:\}/g, '/')
        .replace(/\s+/g, '')
    for (let pass = 0; pass < 3; pass += 1) {
        js = js
            .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))')
            .replace(/(\([^()]+\)|\d+(?:\.\d+)?)\^\{(\d+)\}/g, 'Math.pow($1,$2)')
    }
    js = js.replace(/\)\(/g, ')*(').replace(/(\d)\(/g, '$1*(')
    if (!/^(?:[\d+\-*/().,]|Math\.pow)+$/.test(js) || !/\d/.test(js)) return null
    return Function(`return ${js}`)() as number
}

test('ekuazioak 2. DBH: the unit replaces the legacy pages', () => {
    assert.ok(isUnitV2Path('/matematika/dbh2/ekuazioak'))
    assert.ok(isUnitV2Path('/matematika/dbh2/ekuazioak/ariketak'))
})

test('ekuazioak 2. DBH: diagnostic, practice, challenges and bank are consistent', () => {
    for (const question of equationsDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
    }
    for (const stage of stages) {
        assert.ok(equationsPractice.some((item) => item.stage === stage), stage)
        assert.ok(equationsChallenges.some((item) => item.stage === stage), stage)
    }
    for (const item of [...equationsPractice, ...equationsChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected), item.expected), 'correct', `${item.id}`)
        assert.ok(item.explanation.es.length > 0 && item.explanation.eu.length > 0 && item.explanation.ar.length > 0, `${item.id}`)
    }
    for (const section of equationsExerciseBank) for (const item of section.items) if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected), item.answer.expected), 'correct', `${item.id}`)
    assert.deepEqual(equationsExerciseBank.map((section) => section.id), stages)
    const ids = equationsExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.equal(new Set(ids).size, ids.length)
})

test('ekuazioak 2. DBH: every worked equality with numbers is right', () => {
    const texts = [
        ...equationsPractice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...equationsChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...equationsExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...equationsDiagnostic.flatMap((item) => [item.explanation.es, ...item.options.map((option) => option.es)])
    ]
    let checked = 0
    for (const text of texts) {
        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
            for (const part of formula.split(/\\qquad|\\quad|\\ \\to\\ /)) {
                // Only the sides without letters are compared: x=15\mathbin{:}3=5 checks 15 : 3 = 5
                const values = part.replace(/^[a-z]\)\s*/, '').split('=').map(evaluate).filter((value): value is number => value !== null)
                if (values.length < 2) continue
                assert.ok(values.every((value) => Math.abs(value - values[0]) < 1e-9), `${part} → ${values.join(' / ')}`)
                checked += 1
            }
        }
    }
    assert.ok(checked >= 35, `only ${checked} checked`)
})

test('ekuazioak 2. DBH: every answer appears in its worked explanation', () => {
    for (const item of [...equationsPractice, ...equationsChallenges]) {
        const value = written(item.expected)
        const plain = value.replace(/^(-?)(\d+)(\d{3})$/, '$1$2\\,$3')
        assert.ok(item.explanation.es.includes(value) || item.explanation.es.includes(plain), `${item.id}: ${value}`)
    }
})
