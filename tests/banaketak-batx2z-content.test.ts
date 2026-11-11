import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { courses } from '../src/data/courses.ts'
import { checkAnswer, fraction, hasTerminatingDecimal, toExactDecimal, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { isUnitV2Path } from '../src/features/unit-v2/paths.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { readStatisticsAnswer } from '../src/pages/dbh2-estatistika-v2/answers.ts'
import { approximable, binomialAtLeast, binomialAtMost, binomialMean, binomialPmf, binomialPmfDecimal, binomialVariance, choose } from '../src/pages/batx2-zientziak-banaketak/binomial.ts'
import { distributionsBatx2Challenges, distributionsBatx2Diagnostic, distributionsBatx2ExerciseBank, distributionsBatx2Practice } from '../src/pages/batx2-zientziak-banaketak/content.ts'
import { distributionsBatx2LessonChecks } from '../src/pages/batx2-zientziak-banaketak/lessonChecks.ts'
import { distributionsBatx2LessonTexts } from '../src/pages/batx2-zientziak-banaketak/lessonTexts.ts'
import { above, below, between, inverseTable, Phi, standardize, tableLatex, tableValue, zLatex } from '../src/pages/batx2-zientziak-banaketak/normal.ts'
import { evaluate, near } from './latex-math.ts'

/* Banaketak · 2.º Bachillerato Ciencias: the content of the unit, the normal table and the binomial. The
   review is short (2 practice items, 2 challenges, 6 exercises); the four new stages carry the rest. */

const counts: Record<string, { practice: number; challenges: number; bank: number }> = {
    review: { practice: 2, challenges: 2, bank: 6 },
    discrete: { practice: 4, challenges: 3, bank: 10 },
    binomial: { practice: 5, challenges: 3, bank: 12 },
    normal: { practice: 5, challenges: 4, bank: 12 },
    approximation: { practice: 4, challenges: 3, bank: 10 }
}
const stages = Object.keys(counts)
const topics = Object.keys(distributionsBatx2LessonChecks)

const typed = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)
const written = (value: FractionValue) => `${value.numerator}/${value.denominator}`
const asNumber = (value: FractionValue) => value.numerator / value.denominator

const practice = (id: number) => distributionsBatx2Practice.find((item) => item.id === id)!
const challenge = (id: number) => distributionsBatx2Challenges.find((item) => item.id === id)!
const bank = (id: number) => distributionsBatx2ExerciseBank.flatMap((section) => section.items).find((item) => item.id === id)!

const allTexts = (): LocalizedText[] => [
    ...distributionsBatx2Diagnostic.flatMap((item) => [item.prompt, item.explanation, ...item.options]),
    ...[...distributionsBatx2Practice, ...distributionsBatx2Challenges].flatMap((item) => [item.prompt, item.hint, item.explanation]),
    ...distributionsBatx2ExerciseBank.flatMap((section) => [section.title, ...section.items.flatMap((item) => [item.question, item.solution])])
]

/* ---------- The normal table ---------- */

test('banaketak batx2 z: the table of N(0, 1) is Φ rounded to four decimals, with the values every book prints', () => {
    const known: Array<[number, number]> = [[0, 5000], [0.5, 6915], [1, 8413], [1.25, 8944], [1.28, 8997], [1.5, 9332], [1.64, 9495], [1.65, 9505], [1.96, 9750], [2, 9772], [2.33, 9901], [2.58, 9951], [3, 9987]]
    for (const [z, value] of known) assert.equal(tableValue(z), value, `Φ(${z})`)
    // Every cell is Φ itself to half a unit of the fourth decimal, and the table grows
    for (let index = 0; index <= 399; index += 1) {
        const z = index / 100
        assert.ok(Math.abs(tableValue(z) / 10_000 - Phi(z)) <= 0.00005 + 1e-12, `${z}`)
        if (index) assert.ok(tableValue(z) >= tableValue((index - 1) / 100), `${z}`)
    }
    assert.equal(tableValue(4.2), 10_000)
    // Symmetry and the 68–95–99,7 rule as the table gives it
    assert.equal(below(-1.3), above(1.3))
    assert.equal(below(-1.3), 968)
    assert.deepEqual([between(-1, 1), between(-2, 2), between(-3, 3)], [6826, 9544, 9974])
    // The inverse reading, with its ties left out
    assert.deepEqual([9000, 8000, 9750, 9900, 8500, 9772, 9800].map(inverseTable), [1.28, 0.84, 1.96, 2.33, 1.04, 2, 2.05])
    assert.equal(inverseTable(9500), null)
    assert.equal(inverseTable(9950), null)
    // LaTeX writers
    assert.deepEqual([tableLatex(9750), tableLatex(401), tableLatex(10_000)], ['0{,}9750', '0{,}0401', '1'])
    assert.deepEqual([zLatex(1.96), zLatex(-0.5), zLatex(2), zLatex(1.05)], ['1{,}96', '-0{,}5', '2', '1{,}05'])
})

/* ---------- The binomial ---------- */

test('banaketak batx2 z: the binomial is exact, adds up to 1 and has mean np and variance npq', () => {
    assert.deepEqual([choose(6, 2), choose(7, 3), choose(10, 0), choose(48, 12)], [15, 35, 1, 69_668_534_468])
    for (const [count, p] of [[4, fraction(7, 10)], [5, fraction(1, 2)], [10, fraction(1, 6)], [20, fraction(1, 4)]] as const) {
        const pmf = Array.from({ length: count + 1 }, (_, k) => binomialPmf(count, p, k))
        assert.ok(near(pmf.reduce((sum, value) => sum + asNumber(value), 0), 1))
        const mean = pmf.reduce((sum, value, k) => sum + k * asNumber(value), 0)
        const square = pmf.reduce((sum, value, k) => sum + k * k * asNumber(value), 0)
        assert.ok(near(mean, asNumber(binomialMean(count, p))))
        assert.ok(near(square - mean * mean, asNumber(binomialVariance(count, p))))
    }
    // The decimal version, for a large n, agrees with the exact one and adds up to 1 where the fraction overflows
    for (let k = 0; k <= 20; k += 1) assert.ok(near(binomialPmfDecimal(20, 0.25, k), asNumber(binomialPmf(20, fraction(1, 4), k))), `${k}`)
    assert.ok(near(Array.from({ length: 101 }, (_, k) => binomialPmfDecimal(100, 0.2, k)).reduce((a, b) => a + b, 0), 1))
    // The free throws of the lesson and its «al menos 1»
    assert.equal(written(binomialPmf(4, fraction(7, 10), 3)), '1029/2500')
    assert.ok(near(asNumber(binomialAtLeast(4, fraction(7, 10), 1)), 0.9919))
    assert.ok(near(asNumber(binomialAtMost(5, fraction(1, 2), 1)), 3 / 16))
    assert.ok(approximable(48, fraction(1, 4)) && !approximable(20, fraction(1, 10)) && approximable(60, fraction(1, 5)) && !approximable(1000, fraction(1, 1000)))
})

/* ---------- The unit and its items ---------- */

test('banaketak batx2 z: the unit is active and routed, and only in Ciencias', () => {
    const course = courses.find((item) => item.id === 'batx2-zientziak')!
    assert.ok(course.topics.find((topic) => topic.id === 'binomial-normal')!.active)
    assert.ok(isUnitV2Path('/matematika/batx2-zientziak/binomial-normal'))
    assert.ok(isUnitV2Path('/matematika/batx2-zientziak/binomial-normal/ariketak'))
    const social = courses.find((item) => item.id === 'batx2-gizarte')
    if (social) assert.ok(!social.topics.find((topic) => topic.id === 'binomial-normal')?.active)
})

test('banaketak batx2 z: diagnostic, practice, challenges and bank are consistent', () => {
    // The unit's block of ids is 129000–129999
    assert.deepEqual(distributionsBatx2Diagnostic.map((question) => question.id), [129001, 129002, 129003, 129004, 129005, 129006, 129007, 129008])
    for (const question of distributionsBatx2Diagnostic) {
        assert.ok(topics.includes(question.topic), `${question.id}`)
        assert.ok(question.correctIndex < question.options.length)
        assert.equal(new Set(question.options.map((option) => option.es)).size, question.options.length)
    }
    assert.equal(new Set(distributionsBatx2Diagnostic.map((question) => question.correctIndex)).size, 3)
    for (const stage of stages) {
        assert.equal(distributionsBatx2Practice.filter((item) => item.stage === stage).length, counts[stage].practice, stage)
        assert.equal(distributionsBatx2Challenges.filter((item) => item.stage === stage).length, counts[stage].challenges, stage)
        assert.equal(distributionsBatx2ExerciseBank.find((section) => section.id === stage)!.items.length, counts[stage].bank, stage)
    }
    assert.equal(distributionsBatx2Practice.length, 20)
    assert.equal(distributionsBatx2Challenges.length, 15)
    for (const item of [...distributionsBatx2Practice, ...distributionsBatx2Challenges]) {
        assert.ok(stages.includes(item.stage), `${item.id}`)
        assert.equal(checkAnswer(typed(item.expected), item.expected, item.answerForm), 'correct', `${item.id}`)
        for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.explanation[language].length > 0 && item.prompt[language].length > 0 && item.hint[language].length > 0, `${item.id} ${language}`)
    }
    assert.deepEqual(distributionsBatx2Practice.map((item) => item.id), distributionsBatx2Practice.map((_, index) => index + 1))
    assert.deepEqual(distributionsBatx2Challenges.map((item) => item.id), distributionsBatx2Challenges.map((_, index) => index + 101))
    assert.deepEqual(distributionsBatx2ExerciseBank.map((section) => section.id), stages)
    const ids = distributionsBatx2ExerciseBank.flatMap((section) => section.items.map((item) => item.id))
    assert.deepEqual(ids, ids.map((_, index) => index + 1))
    assert.equal(ids.length, 50)
    for (const section of distributionsBatx2ExerciseBank) {
        assert.ok(section.items.some((item) => item.difficulty === 'easy') && section.items.some((item) => item.difficulty === 'hard'), section.id)
        for (const item of section.items) {
            for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(item.question[language].length > 0 && item.solution[language].length > 0, `${item.id} ${language}`)
            if (item.answer) assert.equal(checkAnswer(typed(item.answer.expected), item.answer.expected, item.answer.form), 'correct', `${item.id}`)
        }
    }
    assert.deepEqual([...new Set(distributionsBatx2Challenges.map((item) => item.points))].sort(), [10, 20, 30])
    // Every closed answer is a probability between 0 and 1, except these values, counts, gains and percentages
    const values = new Set([1, 2, 5, 11, 16, 17, 18, 19, 101, 102, 105, 108, 111, 112, 113])
    for (const item of [...distributionsBatx2Practice, ...distributionsBatx2Challenges]) {
        const value = asNumber(item.expected)
        if (!values.has(item.id)) assert.ok(value >= 0 && value <= 1, `${item.id}: ${value}`)
    }
})

test('banaketak batx2 z: answers as a fraction, a comma, a point, a minus or a percentage are read', () => {
    assert.equal(checkAnswer(readStatisticsAnswer('0,8944'), fraction(8944, 10_000)), 'correct')
    assert.equal(checkAnswer(readStatisticsAnswer('0.8944'), fraction(8944, 10_000)), 'correct')
    assert.equal(checkAnswer(readStatisticsAnswer('3/8'), fraction(3, 8)), 'correct')
    assert.equal(checkAnswer(readStatisticsAnswer('-0,4'), fraction(-2, 5)), 'correct')
    assert.equal(checkAnswer(readStatisticsAnswer('−0,4'), fraction(-2, 5)), 'correct')
    assert.equal(checkAnswer(readStatisticsAnswer('49,31 %'), fraction(4931, 100)), 'correct')
})

test('banaketak batx2 z: every formula renders in KaTeX', () => {
    let formulas = 0
    for (const text of allTexts()) {
        for (const language of ['eu', 'es', 'en', 'ar'] as const) {
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) {
                katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
                formulas += 1
            }
        }
    }
    assert.ok(formulas > 300, `only ${formulas}`)
})

test('banaketak batx2 z: each language in its own place, the same formulas, and Arabic never keeps the decimal comma', () => {
    const shapes = (value: string) => [...value.matchAll(/\$([^$]+)\$/g)].map(([, formula]) => formula.replace(/\{,\}/g, '.'))
    for (const text of allTexts()) {
        assert.ok(!text.ar.includes('{,}'), text.ar)
        const words = (value: string) => value.replace(/\$[^$]+\$/g, ' ')
        if (/[a-zA-Z]{4}/.test(words(text.es))) assert.ok(/[؀-ۿ]/.test(words(text.ar)), `not Arabic: ${text.ar}`)
        for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), `Arabic in ${language}: ${text[language]}`)
        if (/[a-zA-Z]{6}/.test(words(text.es))) assert.ok(text.eu !== text.es && text.en !== text.es, `copied from Spanish: ${text.es}`)
        for (const language of ['eu', 'en', 'ar'] as const) assert.deepEqual(shapes(text[language]), shapes(text.es), `${language}: ${text[language]}`)
        assert.ok(!/\d\.\d/.test(words(text.es)) && !/\d\.\d/.test(words(text.eu)), `decimal point: ${text.es}`)
        assert.ok(!/\d,\d/.test(words(text.en)) || /\d,\d{3}/.test(words(text.en)), `decimal comma in English: ${text.en}`)
        assert.ok(!/\d,\d/.test(words(text.ar)), `decimal comma in Arabic: ${text.ar}`)
    }
})

test('banaketak batx2 z: Basque glues no case ending to a number, English writes the euro first', () => {
    for (const text of allTexts()) {
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')) && !/\$(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
        assert.ok(!/%\s?\d+(?:,\d+)?(?:ek|an|ean|ra|tik|ko|en)\b/.test(text.eu), text.eu)
        assert.ok(!/\d\s*€/.test(text.en.replace(/\$[^$]+\$/g, '')), text.en)
    }
})

test('banaketak batx2 z: every worked equality with numbers is right', () => {
    const texts = [
        ...distributionsBatx2Practice.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...distributionsBatx2Challenges.flatMap((item) => [item.hint.es, item.explanation.es]),
        ...distributionsBatx2ExerciseBank.flatMap((section) => section.items.map((item) => item.solution.es)),
        ...distributionsBatx2Diagnostic.flatMap((item) => [item.explanation.es])
    ]
    let checked = 0
    for (const text of texts) {
        for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
            for (const part of formula.split(/\\qquad|\\quad|\\ \\to\\ |\\to|,\\ /)) {
                const sides = part.split(/\\le|\\ge|\\neq|<|>/)[0]
                const exact = sides.split('\\approx')[0].split('=').map((side) => evaluate(side)).filter((value): value is number => value !== null)
                if (exact.length >= 2) {
                    assert.ok(exact.every((value) => near(value, exact[0])), `${part} → ${exact.join(' / ')}`)
                    checked += 1
                }
            }
        }
    }
    assert.ok(checked >= 50, `only ${checked} checked`)
})

test('banaketak batx2 z: every answer appears in its worked explanation or solution', () => {
    const shows = (text: string, value: FractionValue) => {
        const decimal = toExactDecimal(value) ?? ''
        const candidates = [`\\frac{${value.numerator}}{${value.denominator}}`, decimal.replace(',', '{,}'), decimal, value.denominator === 1 ? String(value.numerator) : '']
        return candidates.some((candidate) => candidate && text.replace(/\\,/g, '').includes(candidate))
    }
    for (const item of [...distributionsBatx2Practice, ...distributionsBatx2Challenges]) assert.ok(shows(`${item.explanation.es} ${item.hint.es}`, item.expected), `${item.id}: ${written(item.expected)}`)
    for (const item of distributionsBatx2ExerciseBank.flatMap((section) => section.items)) if (item.answer) assert.ok(shows(item.solution.es, item.answer.expected), `${item.id}: ${written(item.answer.expected)}`)
})

/* ---------- Every normal value, recomputed from μ, σ and x ---------- */

/** z = (x − μ)/σ, which must come out with two decimals exactly, as the table reads it */
function exactZ(x: number, mean: number, sd: number): number {
    const z = standardize(x, mean, sd)
    assert.ok(Math.abs(z * 100 - Math.round(z * 100)) < 1e-9, `z = (${x} − ${mean}) / ${sd} = ${z} has more than two decimals`)
    return Math.round(z * 100) / 100
}
/** The k of an inverse search, which must not be a tie */
function exactK(tenThousandths: number): number {
    const k = inverseTable(tenThousandths)
    assert.ok(k !== null, `${tenThousandths} is a tie in the table`)
    return k
}
const tenThousandths = (value: FractionValue) => Math.round(asNumber(value) * 10_000)
const hundredths = (value: FractionValue) => Math.round(asNumber(value) * 100)

test('banaketak batx2 z: every normal answer is the table value of an exact z', () => {
    // Lessons
    assert.equal(exactZ(48, 40, 5), 1.6)
    assert.equal(between(exactZ(35, 40, 5), 1.6), 7865)
    assert.equal(above(exactZ(130, 100, 15)), 228)
    assert.equal(above(exactZ(189, 175, 7)), 228)
    assert.ok(near(6 + exactK(9000) * 1.5, 7.92))
    assert.ok(near(500 - exactK(10_000 - 2000) * 10, 491.6))
    assert.equal(between(-1.25, 1.25), 7888)
    assert.equal(between(0.5, 1.5), 2417)
    // Practice
    assert.equal(tenThousandths(practice(13).expected), 2743)
    assert.equal(tenThousandths(practice(14).expected), 8664)
    assert.equal(tenThousandths(practice(15).expected), above(exactZ(2.1, 1.8, 0.2)))
    assert.ok(near(asNumber(practice(16).expected), 170 + exactK(8000) * 10))
    assert.equal(tenThousandths(practice(20).expected), below(exactZ(55.5, 50, 5)))
    // Challenges
    assert.equal(tenThousandths(challenge(109).expected), 3085)
    assert.equal(tenThousandths(challenge(110).expected), below(exactZ(36, 50, 8)))
    assert.equal(hundredths(challenge(111).expected), between(exactZ(5, 5.5, 2), exactZ(8, 5.5, 2)))
    assert.equal(asNumber(challenge(112).expected), 30 - exactK(10_000 - 228) * 4)
    assert.equal(tenThousandths(challenge(114).expected), between(exactZ(49.5, 50, 5), exactZ(50.5, 50, 5)))
    assert.equal(tenThousandths(challenge(115).expected), above(exactZ(130.5, 120, 10)))
    // Bank
    assert.equal(tenThousandths(bank(30).answer!.expected), 7734)
    assert.equal(hundredths(bank(31).answer!.expected), between(exactZ(74, 80, 6), exactZ(86, 80, 6)))
    assert.equal(tenThousandths(bank(32).answer!.expected), above(1.8))
    assert.equal(tenThousandths(bank(33).answer!.expected), between(-0.4, 1))
    assert.equal(tenThousandths(bank(35).answer!.expected), below(exactZ(67, 60, 4)))
    assert.equal(tenThousandths(bank(36).answer!.expected), below(exactZ(274, 300, 20)))
    assert.equal(asNumber(bank(37).answer!.expected), exactK(9901))
    assert.equal(hundredths(bank(38).answer!.expected), below(exactZ(2.5, 3.2, 0.5)))
    assert.ok(near(asNumber(bank(39).answer!.expected), 7 + exactK(10_000 - 1500) * 1.2))
    assert.ok(near(asNumber(bank(40).answer!.expected), 500 + exactK(9900) * 5))
    assert.equal(tenThousandths(bank(46).answer!.expected), below(exactZ(10.5, 8, 2)))
    assert.equal(tenThousandths(bank(47).answer!.expected), above(exactZ(209.5, 200, 10)))
    assert.equal(tenThousandths(bank(48).answer!.expected), above(exactZ(140.5, 125, 10)))
    assert.equal(tenThousandths(bank(49).answer!.expected), between(exactZ(44.5, 50, 5), exactZ(55.5, 50, 5)))
    assert.equal(tenThousandths(bank(50).answer!.expected), above(exactZ(520.5, 500, 10)))
})

/* ---------- Every normal approximation, against the exact binomial ---------- */

/** P(a ≤ X ≤ b) for B(n, p), in floating point through logarithms (n up to a few thousand) */
function exactBinomial(count: number, p: number, a: number, b: number): number {
    const logChoose = (k: number) => {
        let sum = 0
        for (let i = 1; i <= k; i += 1) sum += Math.log(count - k + i) - Math.log(i)
        return sum
    }
    let total = 0
    for (let k = Math.max(0, a); k <= Math.min(count, b); k += 1) total += Math.exp(logChoose(k) + k * Math.log(p) + (count - k) * Math.log(1 - p))
    return total
}

test('banaketak batx2 z: every normal approximation with the continuity correction is within 0,01 of the exact binomial', () => {
    const cases: Array<{ where: string; count: number; p: number; a: number; b: number; approx: number }> = [
        { where: 'lesson continuity', count: 100, p: 0.5, a: 60, b: 100, approx: above(exactZ(59.5, 50, 5)) },
        { where: 'example continuity', count: 180, p: 1 / 6, a: 0, b: 25, approx: below(exactZ(25.5, 30, 5)) },
        { where: 'check continuity', count: 16, p: 0.5, a: 8, b: 8, approx: between(exactZ(7.5, 8, 2), exactZ(8.5, 8, 2)) },
        { where: 'practice 20', count: 100, p: 0.5, a: 0, b: 55, approx: tenThousandths(practice(20).expected) },
        { where: 'challenge 114', count: 100, p: 0.5, a: 50, b: 50, approx: tenThousandths(challenge(114).expected) },
        { where: 'challenge 115', count: 720, p: 1 / 6, a: 131, b: 720, approx: tenThousandths(challenge(115).expected) },
        { where: 'bank 46', count: 16, p: 0.5, a: 0, b: 10, approx: tenThousandths(bank(46).answer!.expected) },
        { where: 'bank 47', count: 400, p: 0.5, a: 210, b: 400, approx: tenThousandths(bank(47).answer!.expected) },
        { where: 'bank 48', count: 625, p: 0.2, a: 141, b: 625, approx: tenThousandths(bank(48).answer!.expected) },
        { where: 'bank 49', count: 100, p: 0.5, a: 45, b: 55, approx: tenThousandths(bank(49).answer!.expected) },
        { where: 'bank 50', count: 625, p: 0.8, a: 521, b: 625, approx: tenThousandths(bank(50).answer!.expected) }
    ]
    for (const item of cases) {
        assert.ok(approximable(item.count, fraction(Math.round(item.p * 600), 600)), item.where)
        const exact = exactBinomial(item.count, item.p, item.a, item.b)
        assert.ok(Math.abs(exact - item.approx / 10_000) < 0.01, `${item.where}: exact ${exact.toFixed(4)}, normal ${item.approx / 10_000}`)
    }
})

test('banaketak batx2 z: the lessons and the binomial items give what the binomial gives', () => {
    const p = (count: number, q: FractionValue, k: number) => asNumber(binomialPmf(count, q, k))
    // review-combinatorial: 2 heads in 6 tosses; row 6 of Tartaglia
    assert.equal(choose(6, 2), 15)
    assert.equal(Array.from({ length: 7 }, (_, k) => choose(6, k)).reduce((a, b) => a + b, 0), 64)
    // random-variable: three coins
    assert.ok(near(p(3, fraction(1, 2), 2) + p(3, fraction(1, 2), 3), 1 / 2))
    // binomial-formula: B(4; 0,7)
    assert.ok(near(p(4, fraction(7, 10), 3), 0.4116))
    // binomial-parameters: B(100; 0,2)
    assert.equal(asNumber(binomialMean(100, fraction(1, 5))), 20)
    assert.equal(asNumber(binomialVariance(100, fraction(1, 5))), 16)
    // binomial-to-normal: B(48; 0,25) → N(12; 3)
    assert.equal(asNumber(binomialVariance(48, fraction(1, 4))), 9)
    // Practice and bank binomials
    assert.ok(near(asNumber(practice(7).expected), p(4, fraction(1, 2), 2)))
    assert.ok(near(asNumber(practice(9).expected), 1 - p(4, fraction(1, 6), 0)))
    assert.ok(near(asNumber(practice(10).expected), p(5, fraction(1, 2), 0) + p(5, fraction(1, 2), 1)))
    assert.ok(near(asNumber(challenge(107).expected), p(3, fraction(1, 4), 2)))
    assert.ok(near(asNumber(bank(21).answer!.expected), p(3, fraction(1, 5), 1)))
    assert.ok(near(asNumber(bank(22).answer!.expected), p(3, fraction(4, 5), 2) + p(3, fraction(4, 5), 3)))
    assert.ok(near(asNumber(bank(23).answer!.expected), p(10, fraction(1, 2), 0) + p(10, fraction(1, 2), 1)))
    assert.ok(near(asNumber(bank(27).answer!.expected), p(5, fraction(1, 3), 4) + p(5, fraction(1, 3), 5)))
    assert.equal(Array.from({ length: 20 }, (_, index) => index + 1).find((tosses) => 1 - 0.5 ** tosses > 0.99), 7)
    // «Check it» of binomial-formula: exactly one 6 in three rolls
    assert.ok(near(p(3, fraction(1, 6), 1), 25 / 72))
})

test('banaketak batx2 z: the lesson examples are worked exercises with an answer', () => {
    for (const [id, entry] of Object.entries(distributionsBatx2LessonTexts)) {
        assert.ok(entry.examplePrompt && entry.exampleAnswer, id)
    }
})
