import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { fraction } from '../src/features/unit-v2/math/fraction.ts'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import {
    expectedPercentAnswer,
    initialPercentBarState,
    percentAnswered,
    percentBarCase,
    percentBarChallenges,
    percentBarExtra,
    percentIndex,
    percentSlip,
    roundedAnswer,
    setPercentBar,
    type PercentBarState
} from '../src/pages/dbh4-aplikatuak-proportzionaltasuna/lab/percentBar.ts'

const make = (patch: Partial<Pick<PercentBarState, 'find' | 'change' | 'whole' | 'part' | 'rate'>>, answer = '') => ({ ...setPercentBar(initialPercentBarState, patch), answer, checked: answer !== '' })

test('proportzionaltasuna 4. DBH ap percent bar: the three numbers', () => {
    // The 32 % of 500
    assert.deepEqual(percentBarCase(make({ find: 'part', change: 'of', whole: 500, rate: 32 })).unknown, fraction(160))
    // The stadium: 24 000 is the 80 %
    assert.deepEqual(percentBarCase(make({ find: 'whole', change: 'of', part: 24000, rate: 80 })).unknown, fraction(30000))
    // The dress: 84 € after a 25 % cut was 112 €, not 105 €
    const dress = make({ find: 'whole', change: 'down', part: 84, rate: 25 })
    assert.deepEqual(percentIndex(dress), fraction(75, 100))
    assert.deepEqual(percentBarCase(dress).unknown, fraction(112))
    // VAT: 119 € and 21 %
    assert.deepEqual(percentBarCase(make({ find: 'part', change: 'up', whole: 119, rate: 21 })).unknown, fraction(14399, 100))
    // The insurance: from 520 € to 442 € is a 15 % cut; a «rise» to a lower price makes no sense
    assert.deepEqual(percentBarCase(make({ find: 'percent', change: 'down', whole: 520, part: 442 })).unknown, fraction(15))
    assert.equal(percentBarCase(make({ find: 'percent', change: 'up', whole: 520, part: 442 })).valid, false)
    assert.deepEqual(percentBarCase(make({ find: 'percent', change: 'of', whole: 5000, part: 750 })).unknown, fraction(15))
})

test('proportzionaltasuna 4. DBH ap percent bar: rounding, answers and limits', () => {
    // 100 is the 30 % of 333,33…: the answer is rounded to the hundredths
    const third = make({ find: 'whole', change: 'of', part: 100, rate: 30 })
    assert.deepEqual(roundedAnswer(percentBarCase(third).unknown), { value: fraction(33333, 100), rounded: true })
    assert.ok(percentAnswered({ ...third, answer: '333,33' }))
    assert.ok(!percentAnswered({ ...third, answer: '333,3' }))
    // Euros and per cent signs are allowed
    assert.ok(percentAnswered(make({ find: 'part', change: 'up', whole: 119, rate: 21 }, '143,99 €')))
    assert.ok(percentAnswered(make({ find: 'percent', change: 'down', whole: 520, part: 442 }, '15 %')))
    assert.deepEqual(expectedPercentAnswer(make({ find: 'part', change: 'of', whole: 500, rate: 32 })), fraction(160))
    // A new case clears the answer; the same case keeps it
    const answered = { ...initialPercentBarState, answer: '150', checked: true }
    assert.equal(setPercentBar(answered, { whole: 600 }).answer, '')
    assert.equal(setPercentBar(answered, { whole: initialPercentBarState.whole }).answer, '150')
    // The classic slips going back: adding the 25 % to 84 €, or multiplying by 0,75
    const dress = make({ find: 'whole', change: 'down', part: 84, rate: 25 })
    assert.equal(percentSlip({ ...dress, answer: '105', checked: true }), 'added')
    assert.equal(percentSlip({ ...dress, answer: '63', checked: true }), 'multiplied')
    assert.equal(percentSlip({ ...dress, answer: '112', checked: true }), null)
    assert.equal(percentSlip({ ...dress, answer: '105', checked: false }), null)
    assert.equal(percentSlip({ ...make({ find: 'whole', change: 'up', part: 121, rate: 21 }), answer: '95,59', checked: true }), 'added')
    // A cut stays under 100 %
    assert.equal(setPercentBar(make({ change: 'of', rate: 250 }), { change: 'down' }).rate, 99)
})

test('proportzionaltasuna 4. DBH ap percent bar: challenges', () => {
    const states = [
        make({ find: 'whole', change: 'of', part: 24000, rate: 80 }, '30000'),
        make({ find: 'whole', change: 'down', part: 84, rate: 25 }, '112'),
        make({ find: 'part', change: 'up', whole: 119, rate: 21 }, '143,99'),
        make({ find: 'percent', change: 'down', whole: 520, part: 442 }, '15')
    ]
    states.forEach((state, index) => assert.ok(percentBarChallenges[index].isSolved(state), String(percentBarChallenges[index].id)))
    // Not without the answer, nor with the classic mistake, nor on arrival
    assert.ok(!percentBarChallenges[1].isSolved({ ...states[1], answer: '105' }))
    assert.ok(!percentBarChallenges[0].isSolved({ ...states[0], answer: '' }))
    for (const challenge of percentBarChallenges) assert.ok(!challenge.isSolved(initialPercentBarState), String(challenge.id))
    for (const challenge of percentBarChallenges) {
        for (const language of ['eu', 'es', 'ar'] as const) {
            for (const text of [challenge.prompt[language], challenge.hint[language]]) {
                for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true })
                if (language === 'eu') assert.ok(!/\d-?(an|ean|ra|era|tik|etik|ko|eko|rekin|ekin)\b/.test(text), text)
                if (language === 'ar') assert.ok(!/\d,\d/.test(text) && !text.includes('{,}'), text)
            }
        }
    }
})

test('proportzionaltasuna 4. DBH ap percent bar: endless challenges', () => {
    const prompts = new Set<string>()
    for (let seed = 1; seed <= 400; seed += 1) {
        const challenge = percentBarExtra(createRandom(seed * 7919))
        assert.ok(challenge.isSolved(challenge.solution), challenge.prompt.es)
        assert.ok(!challenge.isSolved(initialPercentBarState), `${seed} starts solved`)
        assert.ok(!challenge.isSolved({ ...challenge.solution, answer: '' }), `${seed} solved without an answer`)
        prompts.add(challenge.prompt.es)
        for (const language of ['eu', 'es', 'ar'] as const) {
            for (const text of [challenge.prompt[language], challenge.hint[language]]) {
                assert.equal(text.split('$').length % 2, 1, text)
                for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
                    katex.renderToString(formula, { throwOnError: true })
                    assert.ok(!/[؀-ۿ]/.test(formula), formula)
                }
                if (language === 'eu') assert.ok(!/\d-?(an|ean|ra|era|tik|etik|ko|eko|rekin|ekin)\b/.test(text), text)
                if (language === 'ar') assert.ok(!/\d,\d/.test(text) && !text.includes('{,}'), text)
            }
        }
    }
    assert.ok(prompts.size > 100, String(prompts.size))
})
