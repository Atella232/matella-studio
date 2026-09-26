import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
    challenges,
    diagnosticQuestions,
    guidedPractice,
    theoryTopics
} from '../src/pages/dbh2-zatikiak-prototype/content.ts'
import { toText } from '../src/pages/dbh2-zatikiak-prototype/math/fraction.ts'

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

test('audits every diagnostic question', () => {
    for (const question of diagnosticQuestions) {
        assert.ok(question.correctIndex >= 0 && question.correctIndex < question.options.length)
        assert.equal(question.options.length, 3)
        for (const language of ['eu', 'es', 'ar'] as const) {
            assert.ok(question.prompt[language].trim())
            assert.ok(question.explanation[language].trim())
            assert.ok(question.options.every((option) => option[language].trim()))
        }
    }
})

test('tasks that ask for a specific written form declare it', () => {
    for (const item of [...guidedPractice, ...challenges]) {
        const prompt = item.prompt.es.toLowerCase()
        if (/simplifica|irreducible/.test(prompt)) assert.equal(item.answerForm, 'simplified', `item ${item.id}`)
        if (/número mixto/.test(prompt)) {
            assert.equal(item.answerForm, 'mixed', `item ${item.id}`)
            assert.ok(Math.abs(item.expected.numerator) > item.expected.denominator, `item ${item.id} must be improper`)
        }
    }
})
