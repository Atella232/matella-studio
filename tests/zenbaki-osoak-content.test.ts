import test from 'node:test'
import assert from 'node:assert/strict'
import { integerChallenges, integerDiagnostic, integerExerciseBank, integerPractice } from '../src/pages/dbh2-zenbaki-osoak/content.ts'
import { checkAnswer, toNumber } from '../src/features/unit-v2/math/fraction.ts'

const stages = ['integers', 'absolute', 'ordering', 'addsub', 'muldiv']
const topics = ['negatives', 'integer-set', 'absolute', 'opposite', 'compare', 'order', 'add', 'subtract', 'shorthand', 'brackets', 'multiply-divide', 'combined']

/** Evaluates the LaTeX of an integer expression (·, :, brackets) with plain JS arithmetic */
function evaluate(latex: string): number {
    const js = latex
        .replace(/\$/g, '')
        .replace(/\\cdot/g, '*')
        .replace(/\\mathbin\{:\}/g, '/')
        .replace(/[[\]]/g, (bracket) => (bracket === '[' ? '(' : ')'))
    assert.match(js, /^[\d+\-*/() ]+$/, `unexpected expression ${latex}`)
    return Function(`return ${js}`)() as number
}

test('zenbaki osoak: diagnostic points to real lessons and valid options', () => {
    for (const question of integerDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id} topic`)
        assert.ok(question.correctIndex >= 0 && question.correctIndex < question.options.length, `${question.id} index`)
    }
    assert.equal(new Set(integerDiagnostic.map((q) => q.id)).size, integerDiagnostic.length)
})

test('zenbaki osoak: every stage has practice and all answers are integers', () => {
    for (const stage of stages) assert.ok(integerPractice.some((item) => item.stage === stage), stage)
    for (const item of [...integerPractice, ...integerChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id} stage`)
        assert.equal(item.expected.denominator, 1, `${item.id} integer`)
        const value = toNumber(item.expected)
        const typed = value < 0 ? `−${Math.abs(value)}` : String(value)
        assert.equal(checkAnswer(typed, item.expected, 'simplified'), 'correct', `${item.id} typed`)
        if (value > 0) assert.equal(checkAnswer(`+${value}`, item.expected, 'simplified'), 'correct')
        if (item.expression && !item.expression.includes('lvert') && !item.expression.includes(',')) {
            assert.equal(evaluate(item.expression), value, `${item.id} expression`)
        }
    }
    assert.equal(new Set(integerPractice.map((item) => item.id)).size, integerPractice.length)
    assert.equal(new Set(integerChallenges.map((item) => item.id)).size, integerChallenges.length)
})

test('zenbaki osoak: exercise bank covers every stage with unique ids', () => {
    assert.deepEqual(integerExerciseBank.map((section) => section.id), stages)
    const ids = integerExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.equal(new Set(ids).size, ids.length)
})
