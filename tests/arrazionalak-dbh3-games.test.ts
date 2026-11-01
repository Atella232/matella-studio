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
import { createDetectiveCases, detectiveErrorNames, detectiveErrorTips, detectiveLevels } from '../src/pages/dbh3-arrazionalak/games/detective.ts'
import { chosenSum, createJugRound, isFull, JUG_CARDS, jugSolutionLatex } from '../src/pages/dbh3-arrazionalak/games/jug.ts'
import { createPeriodItems, PERIOD_ITEMS, periodKindAgrees, writtenDecimal } from '../src/pages/dbh3-arrazionalak/games/period.ts'
import { expand } from '../src/pages/dbh4-aplikatuak-errealak/reals.ts'
import { formulaFor } from '../src/utils/latexLanguage.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'

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
    for (const language of ['eu', 'es', 'en', 'ar'] as const) for (const text of [question.prompt[language], question.solution[language]]) for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) renders(formula)
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
    assert.deepEqual(rationalsGames.map((game) => game.id), ['race', 'jug', 'period', 'detective', 'place', 'memory'])
    assert.equal(rationalsGames[0].levels.length, RATIONALS_RACE_CIRCUITS)
    assert.equal(rationalsGames.find((game) => game.id === 'place')!.levels.length, 2)
    assert.equal(rationalsGames.find((game) => game.id === 'memory')!.levels.length, rationalsMemoryLevels.length)
    assert.equal(new Set(rationalsGameProgressIds).size, rationalsGameProgressIds.length)
    assert.ok(!rationalsGameProgressIds.some((id) => rationalsLabChallengeIds.includes(id)))
    const stages = ['fractions', 'order', 'operations', 'decimals', 'problems']
    for (const game of rationalsGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.equal(rationalsGameModeForPath('/matematika/dbh3/numeros-racionales/juegos/recta'), 'place')
    assert.equal(rationalsGameModeForPath('/matematika/dbh3/numeros-racionales/jokuak/lasterketa'), 'race')
    assert.equal(rationalsGameModeForPath('/matematika/dbh3/numeros-racionales/juegos/jarra'), 'jug')
    assert.equal(rationalsGameModeForPath('/matematika/dbh3/numeros-racionales/jokuak/periodoa'), 'period')
    assert.equal(rationalsGameModeForPath('/matematika/dbh3/numeros-racionales/juegos/detective'), 'detective')
    for (const game of rationalsGames) for (const level of game.levels) for (const language of ['eu', 'es', 'en', 'ar'] as const) assert.ok(!level.description[language].includes('$'), level.description[language])
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

/* ---------- The three games of this unit ---------- */

const languages = ['eu', 'es', 'en', 'ar'] as const

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[\u0600-\u06FF]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k|rik|ik)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
    }
}

test('arrazionalak 3. DBH detective: one wrong line, a different result and a fix with the right value', () => {
    checkTexts([...Object.values(detectiveErrorNames), ...Object.values(detectiveErrorTips)])
    for (let level = 0; level < 3; level += 1) {
        const seen = new Set<string>()
        for (let seed = 1; seed <= 80; seed += 1) {
            for (const item of createDetectiveCases(createRandom(seed * 7919 + level), level)) {
                seen.add(item.error)
                assert.ok(detectiveLevels[level].includes(item.error))
                assert.ok(item.options.includes(item.error) && new Set(item.options).size === 3)
                assert.ok(Math.abs(item.reached - item.right) > 1e-9, item.error)
                assert.ok(item.wrong >= 0 && item.wrong < item.lines.length)
                assert.equal(item.lines.length, 3)
                for (const line of item.lines) renders(line.latex)
                renders(item.fix)
                // The fix ends on the right value; the last line, on the value reached
                const last = item.fix.split('=').pop()!.replace(/^.*\\to\\ /, '')
                assert.ok(Math.abs(valueOf(last)! - item.right) < 1e-9, `${item.error}: ${item.fix}`)
                if (item.error !== 'negative-order') assert.ok(Math.abs(valueOf(item.lines[2].latex.split('=').pop()!)! - item.reached) < 1e-9, `${item.error}: ${item.lines[2].latex}`)
                checkTexts([item.problem])
            }
        }
        assert.equal(seen.size, 4)
    }
})

test('arrazionalak 3. DBH jug: the right cards fill the jug exactly and no single card does', () => {
    for (let level = 0; level < 3; level += 1) {
        let negatives = 0
        for (let seed = 1; seed <= 200; seed += 1) {
            const round = createJugRound(createRandom(seed * 7919 + level), level)
            assert.equal(round.cards.length, JUG_CARDS)
            assert.equal(new Set(round.cards.map((card) => toLatex(card.value))).size, JUG_CARDS)
            assert.ok(isFull(round, round.solution))
            assert.ok(equals(chosenSum(round, round.solution), round.target))
            assert.ok(round.solution.length >= 2)
            for (const card of round.cards) assert.ok(!isFull(round, [card.id]))
            assert.ok(toNumber(round.target) >= 0.25 && toNumber(round.target) <= 1.5)
            renders(jugSolutionLatex(round))
            if (level < 2) assert.ok(round.cards.every((card) => card.value.numerator > 0))
            if (level === 2) {
                assert.ok(round.cards.filter((card) => round.solution.includes(card.id)).some((card) => card.value.numerator < 0))
                negatives += 1
            }
        }
        if (level === 2) assert.equal(negatives, 200)
    }
})

test('arrazionalak 3. DBH period: four numbers of each kind, and the kind agrees with the long division', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const items = createPeriodItems(createRandom(seed * 7919 + level), level)
            assert.equal(items.length, PERIOD_ITEMS)
            for (const kind of ['exact', 'pure', 'mixed']) assert.equal(items.filter((item) => item.kind === kind).length, PERIOD_ITEMS / 3)
            for (const item of items) {
                assert.ok(periodKindAgrees(item), item.latex)
                const { preperiod, period } = expand(item.value)
                assert.equal(item.kind, period === '' ? 'exact' : preperiod === '' ? 'pure' : 'mixed')
                renders(item.latex)
                // A written decimal begins with the digits of the number
                if (!item.latex.includes('frac')) assert.equal(item.latex, writtenDecimal(item.value))
                else assert.ok(Math.abs(valueOf(item.latex)! - toNumber(item.value)) < 1e-12, item.latex)
                checkTexts([item.why])
            }
        }
    }
})
