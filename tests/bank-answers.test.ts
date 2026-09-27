import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { checkAnswer, toMixedText, toText } from '../src/features/unit-v2/math/fraction.ts'
import type { ExerciseAnswer, ExerciseSection } from '../src/features/unit-v2/types.ts'
import { divisibilityExerciseBank } from '../src/pages/dbh2-zatigarritasuna/content.ts'
import { integerExerciseBank } from '../src/pages/dbh2-zenbaki-osoak/content.ts'
import { naturalsExerciseBank } from '../src/pages/dbh1-zenbaki-naturalak-v2/content.ts'
import { fractionBankAnswers } from '../src/pages/dbh2-zatikiak-prototype/bankAnswers.ts'

const checked = (bank: ExerciseSection[]) => bank.flatMap((section) => section.items.filter((item) => item.answer))

/** The canonical way to write an answer must pass the bank's own check */
const writesCorrectly = (answer: ExerciseAnswer) => {
    const written = answer.form === 'mixed' ? toMixedText(answer.expected) : toText(answer.expected)
    return checkAnswer(written, answer.expected, answer.form ?? 'any') === 'correct'
}

test('checks the closed exercises of every bank', () => {
    assert.equal(Object.keys(fractionBankAnswers).length, 32)
    assert.equal(checked(divisibilityExerciseBank).length, 5)
    assert.equal(checked(integerExerciseBank).length, 12)
    assert.equal(checked(naturalsExerciseBank).length, 3)
})

test('every expected answer is accepted and matches the written solution', () => {
    for (const bank of [divisibilityExerciseBank, integerExerciseBank, naturalsExerciseBank]) {
        for (const item of checked(bank)) {
            assert.ok(writesCorrectly(item.answer!), `item ${item.id}`)
            // Thousands points and spaces are only formatting: 40.001 is 40001
            const solution = item.solution.es.replace(/[.\s]|\\,/g, '')
            const value = Math.abs(item.answer!.expected.numerator)
            const inWords = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez'][value]
            const shown = solution.includes(String(value)) || (inWords !== undefined && solution.toLowerCase().includes(inWords))
            assert.ok(shown, `item ${item.id} solution shows the answer`)
        }
    }
})

test('Zatikiak answers point at real exercises and appear in their solutions', () => {
    const source = readFileSync(new URL('../src/pages/dbh2-zatikiak/ExercisesPage/exercisesData.ts', import.meta.url), 'utf8')
    for (const [key, answer] of Object.entries(fractionBankAnswers)) {
        const [sectionId, itemId] = key.split('#')
        const section = source.slice(source.indexOf(`id: '${sectionId}'`))
        assert.ok(source.includes(`id: '${sectionId}'`), key)
        const item = section.slice(section.indexOf(`id: ${itemId},`), section.indexOf(`id: ${Number(itemId) + 1},`) >>> 0)
        const solution = item.slice(item.indexOf('solution:'))
        const { numerator, denominator } = answer.expected
        const shown = denominator === 1
            ? solution.includes(String(Math.abs(numerator)))
            : answer.form === 'mixed' || solution.includes(`{${Math.abs(numerator)}}{${denominator}}`) || solution.includes(`${Math.abs(numerator)}}{${denominator}`)
        assert.ok(writesCorrectly(answer), key)
        assert.ok(shown, `${key} solution shows ${numerator}/${denominator}`)
    }
})

test('units and labels around an answer do not make its form wrong', () => {
    assert.equal(checkAnswer('25 m', { numerator: 25, denominator: 1 }, 'simplified'), 'correct')
    assert.equal(checkAnswer('x = 15', { numerator: 15, denominator: 1 }, 'simplified'), 'correct')
    assert.equal(checkAnswer('−3 °C', { numerator: -3, denominator: 1 }, 'simplified'), 'correct')
    assert.equal(checkAnswer('14/24 kg', { numerator: 7, denominator: 12 }, 'simplified'), 'wrong-form')
    assert.equal(checkAnswer('2 1/2 m', { numerator: 5, denominator: 2 }, 'mixed'), 'correct')
})
