import test from 'node:test'
import assert from 'node:assert/strict'
import { naturalsChallenges, naturalsDiagnostic, naturalsExerciseBank, naturalsPractice } from '../src/pages/dbh1-zenbaki-naturalak-v2/content.ts'
import { fromRoman, readNaturalAnswer, toRoman } from '../src/pages/dbh1-zenbaki-naturalak-v2/numbers.ts'
import { checkAnswer, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import { sectionForPath } from '../src/features/unit-v2/routing.ts'

const stages = ['numbering', 'rounding', 'operations', 'combined', 'powers']
const topics = ['place-value', 'big-numbers', 'order', 'roman', 'rounding', 'estimation', 'add-subtract', 'multiply', 'divide', 'hierarchy', 'brackets', 'problems', 'powers', 'powers-of-ten']

/** Evaluates the arithmetic written in the exercises: 15.000, ·, \mathbin{:}, ( ), [ ] and powers */
function evaluate(latex: string): number {
    const source = latex
        .replace(/\\mathbin\{:\}/g, ':')
        .replace(/\\cdot/g, '*')
        .replace(/\s+/g, '')
        .replace(/(\d)\.(?=\d{3})/g, '$1')
    let position = 0
    const peek = () => source[position]
    const number = (): number => {
        const match = source.slice(position).match(/^\d+/)
        if (!match) throw new Error(`number expected at ${position} in ${latex}`)
        position += match[0].length
        return Number(match[0])
    }
    const atom = (): number => {
        const open = peek()
        if (open === '(' || open === '[') {
            position += 1
            const value = sum()
            position += 1
            return value
        }
        return number()
    }
    const powerOf = (): number => {
        const base = atom()
        if (peek() !== '^') return base
        position += 1
        const braced = peek() === '{'
        if (braced) position += 1
        const exponent = braced ? sum() : Number(source[position++])
        if (braced) position += 1
        return base ** exponent
    }
    const product = (): number => {
        let value = powerOf()
        while (peek() === '*' || peek() === ':') {
            const operator = source[position++]
            const right = powerOf()
            assert.ok(operator === '*' || value % right === 0, `inexact division in ${latex}`)
            value = operator === '*' ? value * right : value / right
        }
        return value
    }
    function sum(): number {
        let value = product()
        while (peek() === '+' || peek() === '-') {
            const operator = source[position++]
            const right = product()
            value = operator === '+' ? value + right : value - right
            assert.ok(value >= 0, `negative partial result in ${latex}`)
        }
        return value
    }
    const value = sum()
    assert.equal(position, source.length, `could not read all of ${latex}`)
    return value
}

test('zenbaki naturalak: the unit is rendered by the V2 engine and keeps the old URLs', () => {
    assert.ok(isUnitV2Path('/matematika/dbh1/zenbaki-naturalak'))
    assert.ok(isUnitV2Path('/matematika/dbh1/zenbaki-naturalak/jokuak'))
    assert.equal(sectionForPath('/matematika/dbh1/zenbaki-naturalak/teoria'), 'learn')
    assert.equal(sectionForPath('/matematika/dbh1/zenbaki-naturalak/misioa'), 'challenges')
})

test('zenbaki naturalak: answers written with a point every three digits are read as whole numbers', () => {
    assert.equal(readNaturalAnswer('15.000'), '15000')
    assert.equal(readNaturalAnswer('3.405.120'), '3405120')
    assert.equal(readNaturalAnswer('15 000'), '15000')
    assert.equal(readNaturalAnswer('١٥.٠٠٠'), '15000')
    assert.equal(readNaturalAnswer('44'), '44')
    // Not a thousands group: left as written, so it is not taken as 25000
    assert.equal(readNaturalAnswer('2.5'), '2.5')
    assert.equal(checkAnswer(readNaturalAnswer('25.000'), naturalsPractice.find((item) => item.id === 5)!.expected, 'simplified'), 'correct')
})

test('zenbaki naturalak: roman numerals', () => {
    assert.equal(toRoman(87), 'LXXXVII')
    assert.equal(toRoman(425), 'CDXXV')
    assert.equal(toRoman(2600), 'MMDC')
    assert.equal(toRoman(2026), 'MMXXVI')
    assert.equal(fromRoman('XLIV'), 44)
    assert.equal(fromRoman('IIII'), null)
    assert.equal(fromRoman('mcmxcix'), 1999)
    const asked = naturalsPractice.find((item) => item.id === 4)!
    assert.equal(fromRoman(asked.prompt.es.split(': ')[1]), toNumber(asked.expected))
})

test('zenbaki naturalak: diagnostic, practice, challenges and bank are consistent', () => {
    for (const question of naturalsDiagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
    }
    for (const item of [...naturalsPractice, ...naturalsChallenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        const value = toNumber(item.expected)
        assert.ok(Number.isInteger(value) && value >= 0)
        assert.equal(checkAnswer(String(value), item.expected, 'simplified'), 'correct')
    }
    assert.equal(new Set(naturalsPractice.map((item) => item.id)).size, naturalsPractice.length)
    assert.equal(new Set(naturalsChallenges.map((item) => item.id)).size, naturalsChallenges.length)
    const bankIds = naturalsExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.equal(new Set(bankIds).size, bankIds.length)
    assert.deepEqual(naturalsExerciseBank.map((section) => section.id), stages)
    for (const stage of stages) assert.ok(naturalsPractice.some((item) => item.stage === stage), stage)
})

test('zenbaki naturalak: every "Calculate" prompt matches its expected answer', () => {
    let checked = 0
    for (const item of naturalsPractice) {
        const asked = item.prompt.eu.match(/^Kalkulatu: \$([^$]+)\$$/)
        if (!asked) continue
        assert.equal(evaluate(asked[1]), toNumber(item.expected), asked[1])
        checked += 1
    }
    assert.ok(checked >= 5, `only ${checked} checked`)
})

test('zenbaki naturalak: every worked equality in the unit is right', () => {
    const texts = [
        ...naturalsPractice.flatMap((item) => [item.prompt.es, item.hint.es, item.explanation.es]),
        ...naturalsChallenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        // Exercise 24 shows Ane and Iker's mistakes on purpose, so only its solution is checked
        ...naturalsExerciseBank.flatMap((section) => section.items.flatMap((item) => item.id === 24 ? [item.solution.es] : [item.question.es, item.solution.es])),
        ...naturalsDiagnostic.map((item) => item.explanation.es)
    ]
    let checked = 0
    for (const text of texts) {
        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
            // Chains like 6.070+893=6.963: every side must have the same value
            const cleaned = formula.replace(/\\(?:quad|qquad)/g, '|')
            for (const part of cleaned.split('|')) {
                const sides = part.split('=')
                if (sides.length < 2 || !sides.every((side) => /^[\d.\s+\-()[\]^{}:\\a-z]*$/.test(side) && /\d/.test(side))) continue
                if (/\\(?!cdot|mathbin)/.test(part.replace(/\\mathbin\{:\}/g, '').replace(/\\cdot/g, ''))) continue
                const values = sides.map(evaluate)
                assert.ok(values.every((value) => value === values[0]), `${part} → ${values.join(' / ')}`)
                checked += 1
            }
        }
    }
    assert.ok(checked >= 60, `only ${checked} checked`)
})

test('zenbaki naturalak: the answer of every challenge appears in its explanation', () => {
    for (const item of naturalsChallenges) {
        const value = toNumber(item.expected)
        const written = String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        assert.ok(item.explanation.es.includes(written), `${item.id}: ${written}`)
    }
})
