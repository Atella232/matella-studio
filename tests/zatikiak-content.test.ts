import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
    challenges,
    diagnosticQuestions,
    equivalenceRounds,
    guidedPractice,
    memoryCardsSource,
    pizzaRounds,
    raceRounds,
    theoryTopics
} from '../src/pages/dbh2-zatikiak-prototype/content.ts'
import { equals, toText } from '../src/pages/dbh2-zatikiak-prototype/math/fraction.ts'

test('contains the complete theory, exercise and challenge inventory', () => {
    assert.equal(theoryTopics.length, 12)
    assert.equal(guidedPractice.length, 10)
    const exerciseSource = readFileSync(new URL('../src/pages/dbh2-zatikiak/ExercisesPage/exercisesData.ts', import.meta.url), 'utf8')
    assert.equal(exerciseSource.match(/count: 6,/g)?.length, 7)
    assert.equal(exerciseSource.match(/difficulty: '(?:easy|medium|hard)'/g)?.length, 42)
    const euTranslations = exerciseSource.slice(exerciseSource.indexOf('const euTranslations'), exerciseSource.indexOf('const arTranslations'))
    const arTranslations = exerciseSource.slice(exerciseSource.indexOf('const arTranslations'), exerciseSource.indexOf('const text'))
    assert.equal(euTranslations.match(/^ {4}'/gm)?.length, 84)
    assert.equal(arTranslations.match(/^ {4}'/gm)?.length, 84)
    assert.equal(challenges.length, 12)
    assert.deepEqual(challenges.map((challenge) => challenge.id), Array.from({ length: 12 }, (_, index) => 101 + index))

    assert.equal(diagnosticQuestions.length, 6)
    assert.equal(equivalenceRounds.length, 4)
    assert.equal(pizzaRounds.length, 6)
    assert.equal(raceRounds.length, 6)
    assert.equal(memoryCardsSource.length, 12)
})

test('keeps every localized theory and challenge text populated', () => {
    for (const topic of theoryTopics) {
        for (const language of ['eu', 'es', 'ar'] as const) {
            assert.ok(topic.title[language].trim())
            assert.ok(topic.goal[language].trim())
            assert.ok(topic.explanation[language].trim())
            assert.ok(topic.takeaway[language].trim())
        }
    }

    for (const challenge of challenges) {
        assert.ok(challenge.expected.denominator > 0)
        for (const language of ['eu', 'es', 'ar'] as const) {
            assert.ok(challenge.prompt[language].trim())
            assert.ok(challenge.hint[language].trim())
            assert.ok(challenge.explanation[language].trim())
        }
    }
})

test('contains the corrected recipe and water-tank answers', () => {
    assert.equal(toText(challenges.find((challenge) => challenge.id === 106)!.expected), '5/3')
    assert.equal(toText(challenges.find((challenge) => challenge.id === 112)!.expected), '6000')
    assert.match(challenges.find((challenge) => challenge.id === 112)!.prompt.es, /1800/)
})

test('audits every diagnostic and game round', () => {
    for (const question of diagnosticQuestions) {
        assert.ok(question.correctIndex >= 0 && question.correctIndex < question.options.length)
        assert.equal(question.options.length, 3)
        for (const language of ['eu', 'es', 'ar'] as const) {
            assert.ok(question.prompt[language].trim())
            assert.ok(question.explanation[language].trim())
            assert.ok(question.options.every((option) => option[language].trim()))
        }
    }

    for (const round of equivalenceRounds) {
        assert.equal(round.options.filter((option) => equals(option, round.prompt)).length, 1)
    }
    for (const round of pizzaRounds) {
        assert.ok(round.target.numerator > 0)
        assert.ok(round.target.numerator < round.target.denominator)
    }
    assert.deepEqual(raceRounds.map((round) => toText(round.expected)), ['-1/2', '-1/4', '-1', '8/27', '2', '-1/4'])

    const pairs = new Map<number, typeof memoryCardsSource>()
    for (const card of memoryCardsSource) pairs.set(card.pairId, [...(pairs.get(card.pairId) ?? []), card])
    assert.equal(pairs.size, 6)
    for (const cards of pairs.values()) {
        assert.equal(cards.length, 2)
        assert.notEqual(cards[0].display, cards[1].display)
    }
})
