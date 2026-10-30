import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { evaluate } from './helpers/realsRaceCheck.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import {
    calendarAnswered,
    calendarChallenges,
    calendarExtra,
    calendarLatex,
    calendarValid,
    initialCalendarState,
    setCalendar,
    setUnit,
    setUnknown,
    typeCalendarAnswer,
    unknownValue,
    yearlyInterest,
    type CalendarState,
    type InterestUnknown,
    type TimeUnit
} from '../src/pages/dbh4-aplikatuak-proportzionaltasuna/lab/calendar.ts'
import { decimalFieldText, readDecimalField } from '../src/pages/dbh4-aplikatuak-proportzionaltasuna/lab/decimalInput.ts'

type Data = Partial<Pick<CalendarState, 'capital' | 'rate' | 'time' | 'interest'>>
const make = (unknown: InterestUnknown, unit: TimeUnit, data: Data, answer = '') => ({ ...initialCalendarState, unknown, unit, ...data, answer, reading: answer, checked: answer !== '' })

/** The numbers after the letters give the result: C = I · 1200 / (r · t) = 448,80 · 1200 / (3,2 · 9) = 18 700 */
function checkWorking(latex: string) {
    katex.renderToString(latex, { throwOnError: true, strict: 'error' })
    const sides = latex.split(/=|\\approx /)
    const value = evaluate(sides[2])!
    const result = evaluate(sides[3])!
    assert.ok(Math.abs(value - result) < (latex.includes('approx') ? 0.005 : 1e-9), latex)
}

function checkText(text: LocalizedText, where: string) {
    for (const language of ['eu', 'es', 'en', 'ar'] as const) {
        const line = text[language]
        assert.equal(line.split('$').length % 2, 1, `${where}: ${line}`)
        for (const [, formula] of line.matchAll(/\$([^$]+)\$/g)) {
            katex.renderToString(formula, { throwOnError: true, strict: 'error' })
            assert.ok(!/[؀-ۿ]/.test(formula), `${where}: ${formula}`)
        }
        const words = line.replace(/\$[^$]*\$/g, '')
        if (language === 'eu') assert.ok(!/\d-?(an|ean|ra|era|tik|etik|ko|eko|rekin|ekin|k|z|ez)\b/.test(words), `${where}: ${line}`)
        if (language === 'ar') assert.ok(!line.includes('{,}') && !/\d,\d/.test(line), `${where}: ${line}`)
        // English writes 3.2 and 120,000, never a decimal comma
        if (language === 'en') assert.ok(!words.includes('{,}') && !/\d,\d{1,2}(?!\d)/.test(words), `${where}: ${line}`)
        if (language === 'es' || language === 'eu') assert.ok(!/\d [€%]|% \d/.test(words), `${where}: a break between a number and its sign: ${line}`)
    }
}

test('proportzionaltasuna 4. DBH ap calendar: the lesson cases, in years, months and days', () => {
    // 6000 € at 3 % for 8 months: 120 €, one year 180 €
    const lesson = make('interest', 'months', { capital: 6000, rate: 3, time: 8 })
    assert.equal(toNumber(unknownValue(lesson)), 120)
    assert.equal(toNumber(yearlyInterest(lesson)), 180)
    assert.equal(calendarLatex(lesson), 'I=\\frac{C\\cdot r\\cdot t}{1200}=\\frac{6000\\cdot 3\\cdot 8}{1200}=120')
    // 1000 € at 4 % for 4 months: 13,33 € to the cent
    const rounded = make('interest', 'months', { capital: 1000, rate: 4, time: 4 })
    assert.ok(calendarLatex(rounded).endsWith('\\approx 13{,}33'))
    assert.ok(calendarAnswered({ ...rounded, answer: '13,33 €', reading: '13,33 €', checked: true }))
    assert.ok(!calendarAnswered({ ...rounded, answer: '13,3', reading: '13,3', checked: true }))
    // The principal, the rate and the time worked out
    const capital = make('capital', 'months', { interest: 448.8, rate: 3.2, time: 9 })
    assert.equal(toNumber(unknownValue(capital)), 18700)
    assert.equal(calendarLatex(capital), 'C=\\frac{I\\cdot 1200}{r\\cdot t}=\\frac{448{,}80\\cdot 1200}{3{,}2\\cdot 9}=18\\,700')
    assert.equal(toNumber(unknownValue(make('rate', 'months', { capital: 120000, interest: 6750, time: 6 }))), 11.25)
    assert.equal(toNumber(unknownValue(make('time', 'days', { capital: 3600, rate: 5, interest: 30 }))), 60)
    // In years the divisor is 100, in days 36 000
    assert.equal(toNumber(unknownValue(make('interest', 'years', { capital: 6000, rate: 3, time: 2 }))), 360)
    assert.equal(toNumber(unknownValue(make('interest', 'days', { capital: 6000, rate: 3, time: 240 }))), 120)
    for (const state of [lesson, rounded, capital]) checkWorking(calendarLatex(state))
    // An unknown the fields could not hold
    assert.equal(calendarValid(make('rate', 'months', { capital: 100, interest: 500, time: 1 })), false)
    assert.equal(calendarValid(make('time', 'months', { capital: 100, rate: 1, interest: 500 })), false)
})

test('proportzionaltasuna 4. DBH ap calendar: changing the unknown, the unit and the data', () => {
    const answered = { ...initialCalendarState, answer: '30', reading: '30', checked: true }
    assert.ok(calendarAnswered(answered))
    // Same time in another unit: 6 months = 180 days = half a year, and the 30 € still hold
    const days = setUnit(answered, 'days')
    assert.equal(days.time, 180)
    assert.ok(calendarAnswered(days))
    // Half a year is not a whole number of years: 1 year, and a new case
    assert.equal(setUnit(days, 'years').time, 1)
    assert.equal(setUnit(days, 'years').answer, '')
    assert.equal(setUnit(setCalendar(initialCalendarState, { time: 24 }), 'years').time, 2)
    // When the time is the unknown, another unit asks for another number
    const time = { ...make('time', 'months', { capital: 2000, rate: 3, interest: 30 }), answer: '6', reading: '6', checked: true }
    assert.ok(calendarAnswered(time))
    assert.equal(setUnit(time, 'days').answer, '')
    // Another unknown keeps the case: what principal gives the 30 €?
    const principal = setUnknown(answered, 'capital')
    assert.equal(principal.interest, 30)
    assert.equal(principal.answer, '')
    assert.equal(toNumber(unknownValue(principal)), 2000)
    assert.equal(setUnknown(principal, 'time').capital, 2000)
    // New data clear the answer; limits hold
    assert.equal(setCalendar(answered, { rate: 4 }).answer, '')
    assert.equal(setCalendar(answered, { rate: 3 }), answered)
    assert.equal(setCalendar(answered, { rate: 3.256 }).rate, 3.26)
    assert.equal(setCalendar(answered, { time: 500 }).time, 60)
    assert.equal(setCalendar(setUnit(answered, 'days'), { time: 5000 }).time, 1800)
})

test('proportzionaltasuna 4. DBH ap calendar: English answers with thousands commas', () => {
    const capital = make('capital', 'months', { interest: 448.8, rate: 3.2, time: 9 })
    assert.ok(calendarAnswered(typeCalendarAnswer(capital, { answer: '18,700', checked: true }, 'en')))
    assert.ok(calendarAnswered(typeCalendarAnswer(capital, { answer: '€18,700', checked: true }, 'en')))
    // In Spanish 18,700 is eighteen point seven
    assert.ok(!calendarAnswered(typeCalendarAnswer(capital, { answer: '18,700', checked: true }, 'es')))
    assert.ok(calendarAnswered(typeCalendarAnswer(capital, { answer: '18 700', checked: true }, 'es')))
    // Checking later reads what was typed
    const typed = typeCalendarAnswer(capital, { answer: '18,700' }, 'en')
    assert.ok(calendarAnswered(typeCalendarAnswer(typed, { checked: true }, 'en')))
})

test('proportzionaltasuna 4. DBH ap calendar: the decimal fields in each language', () => {
    // Basque and Spanish: decimal comma, thousands with a point or a space
    for (const [text, value] of [['3,2', 3.2], ['448,80', 448.8], ['18.700', 18700], ['18 700', 18700], ['1.039,10', 1039.1], ['3.2', 3.2], ['5 %', 5]] as const) assert.equal(readDecimalField(text, 'es'), value, text)
    // English: decimal point, thousands with a comma
    for (const [text, value] of [['3.2', 3.2], ['120,000', 120000], ['6,750', 6750], ['€448.80', 448.8], ['3,2', 3.2]] as const) assert.equal(readDecimalField(text, 'en'), value, text)
    assert.equal(readDecimalField('٣٫٢', 'ar'), 3.2)
    for (const text of ['3,256', 'abc', '', '1,2,3']) assert.equal(readDecimalField(text, 'es'), null, text)
    assert.deepEqual([decimalFieldText(448.8, 'es', true), decimalFieldText(448.8, 'en', true), decimalFieldText(3.2, 'eu'), decimalFieldText(120000, 'en', true)], ['448,80', '448.80', '3,2', '120000'])
})

test('proportzionaltasuna 4. DBH ap calendar: challenges', () => {
    const states = [
        make('interest', 'months', { capital: 6000, rate: 3, time: 8 }, '120'),
        make('interest', 'months', { capital: 1000, rate: 4, time: 4 }, '13,33'),
        make('capital', 'months', { interest: 448.8, rate: 3.2, time: 9 }, '18700'),
        make('rate', 'months', { capital: 120000, interest: 6750, time: 6 }, '11,25'),
        make('time', 'days', { capital: 3600, rate: 5, interest: 30 }, '60')
    ]
    states.forEach((state, index) => assert.ok(calendarChallenges[index].isSolved(state), String(calendarChallenges[index].id)))
    // Not with the time as years, nor without the answer
    assert.ok(!calendarChallenges[0].isSolved({ ...states[0], unit: 'years', answer: '1440', reading: '1440' }))
    assert.ok(!calendarChallenges[2].isSolved({ ...states[2], answer: '', reading: '', checked: false }))
    // The unknown's own field does not matter
    assert.ok(calendarChallenges[2].isSolved({ ...states[2], capital: 5 }))
    for (const challenge of calendarChallenges) {
        assert.ok(!challenge.isSolved(initialCalendarState), String(challenge.id))
        checkText(challenge.prompt, String(challenge.id))
        checkText(challenge.hint, String(challenge.id))
    }
})

test('proportzionaltasuna 4. DBH ap calendar: endless challenges can be solved, are new and exact', () => {
    const prompts = new Set<string>()
    const kinds = new Set<string>()
    for (let seed = 1; seed <= 300; seed += 1) {
        const challenge = calendarExtra(createRandom(seed))
        const solution = challenge.solution
        assert.ok(challenge.isSolved(solution), challenge.prompt.es)
        assert.ok(!challenge.isSolved(initialCalendarState), challenge.prompt.es)
        assert.ok(calendarValid(solution), challenge.prompt.es)
        assert.ok(!calendarLatex(solution).includes('approx'), challenge.prompt.es)
        checkWorking(calendarLatex(solution))
        // Another unknown or unit does not solve it
        assert.ok(!challenge.isSolved({ ...solution, unit: solution.unit === 'months' ? 'days' : 'months' }), challenge.prompt.es)
        checkText(challenge.prompt, challenge.prompt.es)
        checkText(challenge.hint, challenge.prompt.es)
        prompts.add(challenge.prompt.es)
        kinds.add(`${solution.unknown} ${solution.unit}`)
    }
    assert.ok(prompts.size > 250, `only ${prompts.size} prompts`)
    assert.equal(kinds.size, 12, [...kinds].join(', '))
})
