import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { checkChain, checkRealsQuestion, typed, valueOf } from './helpers/realsRaceCheck.ts'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { equals, fraction, multiply, subtract, toLatex, toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { RealsRaceQuestion } from '../src/pages/dbh4-aplikatuak-errealak/games/race.ts'
import { generatrix } from '../src/pages/dbh4-aplikatuak-errealak/reals.ts'
import { createRationalsMemoryBoard, RATIONALS_MEMORY_PAIRS, rationalsMemoryLevels } from '../src/pages/dbh3-arrazionalak/games/boards.ts'
import { rationalsGameModeForPath, rationalsGameProgressIds, rationalsGames } from '../src/pages/dbh3-arrazionalak/games/info.ts'
import { checkRationalsPitAnswer, generateRationalsRaceQuestion, RATIONALS_RACE_CIRCUITS, rationalsParTime, rationalsRaceErrorTips, type RationalsProblemMeta, type RationalsRaceQuestion } from '../src/pages/dbh3-arrazionalak/games/race.ts'
import { rationalsLabChallengeIds } from '../src/pages/dbh3-arrazionalak/lab/labTools.ts'

const renders = (latex: string) => katex.renderToString(latex, { throwOnError: true, strict: 'error' })

/** Shape checks every question passes; the 2. DBH questions are checked in depth by their own tests */
function checkShape(question: RationalsRaceQuestion) {
    assert.equal(question.options.length, 4, question.kind)
    assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
    assert.equal(question.options.filter((option) => option.correct).length, 1, question.kind)
    for (const option of question.options) {
        renders(option.latex)
        if (!option.correct) assert.ok(rationalsRaceErrorTips[option.error!], `${question.kind}: ${option.error}`)
    }
    for (const language of ['eu', 'es', 'ar'] as const) for (const text of [question.prompt[language], question.solution[language]]) for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) renders(formula)
    // "Simplified" and "mixed" answers are typed as the fraction; the rest, as the shortest form
    const written = question.answerForm === 'any' ? typed(question.answer) : question.answer.denominator === 1 ? String(question.answer.numerator) : `${question.answer.numerator}/${question.answer.denominator}`
    if (question.writable && question.answerForm !== 'mixed') assert.equal(checkRationalsPitAnswer(question, written), 'correct', question.kind)
}

function checkProblem(question: RationalsRaceQuestion) {
    const meta = question.meta as RationalsProblemMeta
    const right = question.options.find((option) => option.correct)!
    let expected
    switch (meta.kind) {
        case 'fraction-of': expected = multiply(meta.part, fraction(meta.amount)); assert.equal(toNumber(expected), meta.value); break
        case 'remaining': expected = multiply(subtract(fraction(1), meta.first), subtract(fraction(1), meta.second)); assert.ok(equals(expected, meta.left)); break
        case 'whole': expected = fraction(meta.whole); assert.ok(equals(multiply(meta.part, expected), fraction(meta.known))); break
    }
    assert.equal(right.latex, toLatex(expected))
    assert.ok(equals(question.answer, expected))
    for (const option of question.options.filter((item) => !item.correct)) assert.ok(Math.abs(valueOf(option.latex)! - toNumber(expected)) > 1e-9, `${question.kind}: ${option.latex}`)
    assert.ok(checkChain(question.solution.es, question.kind) > 0, question.solution.es)
}

test('arrazionalak 3. DBH games: levels, ids and routes', () => {
    assert.equal(rationalsGames.length, 3)
    assert.equal(rationalsGames[0].levels.length, RATIONALS_RACE_CIRCUITS)
    assert.equal(rationalsGames.find((game) => game.id === 'place')!.levels.length, 2)
    assert.equal(rationalsGames.find((game) => game.id === 'memory')!.levels.length, rationalsMemoryLevels.length)
    assert.equal(new Set(rationalsGameProgressIds).size, rationalsGameProgressIds.length)
    assert.ok(!rationalsGameProgressIds.some((id) => rationalsLabChallengeIds.includes(id)))
    const stages = ['fractions', 'order', 'operations', 'decimals', 'problems']
    for (const game of rationalsGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.equal(rationalsGameModeForPath('/matematika/dbh3/numeros-racionales/juegos/recta'), 'place')
    assert.equal(rationalsGameModeForPath('/matematika/dbh3/numeros-racionales/jokuak/lasterketa'), 'race')
})

test('arrazionalak 3. DBH race: every circuit has valid questions and written answers', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < RATIONALS_RACE_CIRCUITS; circuit += 1) {
        let negatives = 0
        for (let seed = 1; seed <= 150; seed += 1) {
            const random = createRandom(seed * 11 + circuit)
            for (const tier of [0, 1, 2] as const) {
                for (const requireWritable of [false, true]) {
                    const question = generateRationalsRaceQuestion(random, circuit, tier, requireWritable)
                    assert.equal(question.circuit, circuit)
                    if (requireWritable) assert.ok(question.writable, `${circuit} ${question.kind}`)
                    kinds.add(`${circuit}:${question.kind}`)
                    checkShape(question)
                    if (!requireWritable && question.options.some((option) => option.latex.startsWith('-'))) negatives += 1
                    if (question.source === 'decimals') checkRealsQuestion(question as unknown as RealsRaceQuestion, rationalsRaceErrorTips, checkRationalsPitAnswer as never)
                    if (question.source === 'problems') checkProblem(question)
                }
            }
        }
        // Third year: negative fractions show up in the fractions, order and operations circuits
        // At least 15 % of the 450 multiple-choice questions (none at the first level)
        if (circuit <= 2) assert.ok(negatives > 67, `circuit ${circuit}: only ${negatives} questions with negatives`)
        assert.ok(rationalsParTime(circuit) > 60000)
    }
    for (const kind of ['4:fraction-of', '4:remaining', '4:whole', '3:generatrix', '3:kind-pick']) assert.ok(kinds.has(kind), `never generated: ${kind}`)
})

test('arrazionalak 3. DBH memory: every card has exactly one partner and the pair is true', () => {
    for (let level = 0; level < rationalsMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const cards = createRationalsMemoryBoard(createRandom(seed * 7 + level), level)
            assert.equal(cards.length, RATIONALS_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const partner = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!
                renders(card.latex)
                renders(card.explain!)
                if (rationalsMemoryLevels[level] === 'periodic') {
                    const match = card.latex.match(/^(\d+)\{,\}(\d*)\\overline\{(\d+)\}$/)!
                    assert.equal(partner.latex, toLatex(generatrix({ negative: false, integer: match[1], preperiod: match[2], period: match[3] })))
                } else {
                    assert.ok(Math.abs(valueOf(card.latex)! - valueOf(partner.latex)!) < 1e-12, `${card.latex} ↔ ${partner.latex}`)
                    assert.notEqual(card.latex, partner.latex)
                    assert.ok(checkChain(card.explain!, card.latex) > 0, card.explain)
                }
            }
        }
    }
})
