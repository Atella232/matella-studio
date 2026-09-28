import test from 'node:test'
import assert from 'node:assert/strict'
import { geometryIntroChallenges, geometryIntroDiagnostic, geometryIntroExerciseBank, geometryIntroPractice } from '../src/pages/dbh1-geometria-v2/content.ts'
import { checkAnswer, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'

const stages = ['angles', 'polygons', 'pythagoras', 'perimeters', 'areas']
const topics = ['lines', 'angles', 'angle-pairs', 'polygons', 'triangles', 'triangle-lines', 'quadrilaterals', 'circle', 'pythagoras', 'pythagoras-use', 'units', 'perimeter', 'circumference', 'area-rectangles', 'area-triangle', 'area-circle']

/** Plain arithmetic in LaTeX: fractions, roots, powers, degrees, decimal commas, thin-space thousands */
function evaluate(latex: string): number | null {
    let js = latex
        .replace(/\^\{\\circ\}/g, '')
        .replace(/\\,/g, '')
        .replace(/(\d)\{,\}(\d)/g, '$1.$2')
    for (let pass = 0; pass < 3; pass += 1) {
        js = js
            .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))')
            .replace(/\\sqrt\{([^{}]+)\}/g, 'Math.sqrt($1)')
    }
    js = js
        .replace(/\\cdot/g, '*')
        .replace(/\\mathbin\{:\}/g, '/')
        .replace(/\^\{(\d+)\}/g, '**$1')
        .replace(/\s+/g, '')
    if (!/^(?:[\d+\-*/().]|Math\.sqrt)+$/.test(js) || !/\d/.test(js)) return null
    return Function(`return ${js}`)() as number
}

test('geometria 1. DBH: the unit replaces the legacy pages', () => {
    assert.ok(isUnitV2Path('/matematika/dbh1/geometria'))
    assert.ok(isUnitV2Path('/matematika/dbh1/geometria/teoria'))
})

test('geometria 1. DBH: diagnostic, practice, challenges and bank are consistent', () => {
    for (const question of geometryIntroDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
    }
    for (const stage of stages) assert.ok(geometryIntroPractice.some((item) => item.stage === stage), stage)
    for (const item of [...geometryIntroPractice, ...geometryIntroChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        const written = String(toNumber(item.expected)).replace('.', ',')
        assert.equal(checkAnswer(written, item.expected), 'correct', `${item.id} ${written}`)
    }
    for (const section of geometryIntroExerciseBank) for (const item of section.items) if (item.answer) assert.equal(checkAnswer(String(toNumber(item.answer.expected)), item.answer.expected), 'correct')
    assert.deepEqual(geometryIntroExerciseBank.map((section) => section.id), stages)
    const ids = geometryIntroExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.equal(new Set(ids).size, ids.length)
})

test('geometria 1. DBH: every worked equality is right', () => {
    const texts = [
        ...geometryIntroPractice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...geometryIntroChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...geometryIntroExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...geometryIntroDiagnostic.flatMap((item) => [item.explanation.es, ...item.options.map((option) => option.es)])
    ]
    let checked = 0
    for (const text of texts) {
        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
            for (const part of formula.split(/\\qquad|\\quad|,\\ |;\\ /)) {
                if (part.includes('\\neq')) continue
                const approximate = part.includes('\\approx')
                const sides = part.split(/=|\\approx/)
                if (sides.length < 2) continue
                const values = sides.map(evaluate)
                if (values.some((value) => value === null)) continue
                assert.ok(values.every((value) => Math.abs(value! - values[0]!) < (approximate ? 0.01 : 1e-9)), `${part} → ${values.join(' / ')}`)
                checked += 1
            }
        }
    }
    assert.ok(checked >= 50, `only ${checked} checked`)
})

test('geometria 1. DBH: every answer appears in its worked explanation', () => {
    for (const item of [...geometryIntroPractice, ...geometryIntroChallenges]) {
        const value = toNumber(item.expected)
        const written = String(value).replace('.', '{,}')
        assert.ok(item.explanation.es.includes(written) || item.explanation.es.includes(String(value)), `${item.id}: ${written}`)
    }
})
