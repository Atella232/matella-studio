import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { deviationProducts, pairStats } from '../src/pages/batx1-zientziak-bidimentsionala/bivariate.ts'
import { BIVAR_MEMORY_PAIRS, bivarMemoryLevels, createBivarMemoryBoard } from '../src/pages/batx1-zientziak-bidimentsionala/games/boards.ts'
import { createSignRounds, SIGN_ROUNDS, texNumber } from '../src/pages/batx1-zientziak-bidimentsionala/games/covarianceSign.ts'
import { BIVAR_DETECTIVE_CASES, bivarDetectiveLevels, bivarDetectiveNames, bivarDetectiveTips, createBivarDetectiveCases } from '../src/pages/batx1-zientziak-bidimentsionala/games/detective.ts'
import { bivarGameModeForPath, bivarGameProgressIds, bivarGames, bivarGameSlugs } from '../src/pages/batx1-zientziak-bidimentsionala/games/info.ts'
import { BIVAR_RACE_CIRCUITS, bivarRaceErrorTips, checkBivarPitAnswer, generateBivarRaceQuestion } from '../src/pages/batx1-zientziak-bidimentsionala/games/race.ts'
import { createLinesRounds, lineLatex, LINES_ROUNDS, linesR, pointLatex } from '../src/pages/batx1-zientziak-bidimentsionala/games/whichLines.ts'
import { evaluate, near } from './latex-math.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const
const render = (latex: string, language: (typeof languages)[number] = 'es') => katex.renderToString(formulaFor(language, latex), { throwOnError: true, strict: 'error' })

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) render(formula, language)
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        // No Basque suffix glued to a number or to a formula
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|era|tik|z|ei|en|k|i)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/§(?:ri|ren|rekin|z|ra|tik|ei)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '§')), text.eu)
        // MathText turns «:» into ÷ inside formulas
        for (const [, formula] of text.es.matchAll(/\$([^$]+)\$/g)) assert.ok(!formula.includes(':'), formula)
    }
}

/** Every equality of a worked line with numbers is right */
function checkWorked(latex: string, where: string) {
    let read = 0
    // The evaluator does not read \frac{…{,}…}: the decimal point first
    // Rows of a gathered block are equalities of their own
    for (const part of latex.replace(/\{,\}/g, '.').replace(/\\(?:begin|end)\{gathered\}/g, '').split(/\\\\|\\qquad|\\quad|\\ \\to\\ |\\to|,\\ /)) {
        const values = part.split(/\\le|\\ge|\\neq|<|>|\\approx/)[0].split('=').map((side) => evaluate(side)).filter((value): value is number => value !== null)
        if (values.length < 2) continue
        assert.ok(values.every((value) => near(value, values[0])), `${where}: ${part} → ${values.join(' / ')}`)
        read += 1
    }
    return read
}

test('bidimentsionala batx1 z games: the hub, its levels and progress ids', () => {
    assert.deepEqual(bivarGames.map((game) => game.id), ['race', 'sign', 'lines', 'detective', 'memory', 'cloud'])
    assert.equal(new Set(bivarGameProgressIds).size, bivarGameProgressIds.length)
    // The unit's block of ids: games go from 115401 to 115899
    for (const id of bivarGameProgressIds) assert.ok(id >= 115401 && id <= 115899, `${id}`)
    const stages = ['tables', 'cloud', 'parameters', 'regression', 'problems']
    for (const game of bivarGames) {
        assert.ok(game.levels.length >= 3, game.id)
        for (const level of game.levels) {
            assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
            // Titles and descriptions are drawn as plain text
            for (const language of languages) assert.ok(!level.description[language].includes('$') && !level.title[language].includes('$'), `${game.id} ${language}`)
        }
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(bivarGameModeForPath(`/matematika/batx1-zientziak/estadistica-bidimensional/jokuak/${bivarGameSlugs[game.id]}`), game.id)
    }
    assert.equal(bivarGameModeForPath('/matematika/batx1-zientziak/estadistica-bidimensional/jokuak'), 'hub')
    assert.equal(bivarGameModeForPath('/matematika/batx1-zientziak/estadistica-bidimensional/juegos/rectas'), 'lines')
})

test('bidimentsionala batx1 z games: every race question has one right option, worked out from its numbers', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < BIVAR_RACE_CIRCUITS; circuit += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const tier = (['easy', 'medium', 'hard'] as Tier[])[seed % 3]
            const question = generateBivarRaceQuestion(createRandom(seed * 101 + circuit), circuit, tier)
            kinds.add(question.kind)
            assert.equal(question.circuit, circuit)
            assert.equal(question.options.length, 4)
            assert.equal(question.options.filter((option) => option.correct).length, 1)
            assert.equal(new Set(question.options.map((option) => option.latex)).size, 4)
            const right = question.options.find((option) => option.correct)!
            assert.ok(near(evaluate(right.latex.replace(/\{,\}/g, '.'))!, toNumber(question.answer)), `${question.kind}: ${right.latex}`)
            for (const option of question.options) {
                render(option.latex)
                if (!option.correct) assert.ok(option.error && bivarRaceErrorTips[option.error], `${question.kind}: ${option.latex}`)
            }
            checkTexts([question.prompt, question.solution])
            assert.ok(checkWorked(question.solution.es.replace(/\$/g, ''), question.kind) >= 1, `${question.kind}: ${question.solution.es}`)
            // The pit answer is read with a comma, a point or as a fraction
            const typed = right.latex.replace(/\{,\}/g, ',').replace(/\\frac\{(\d+)\}\{(\d+)\}/, '$1/$2').replace(/^-\\frac/, '-')
            assert.equal(checkBivarPitAnswer(question, typed), 'correct', `${question.kind}: ${typed}`)
            const m = question.meta
            const value = toNumber(question.answer)
            if (question.kind === 'conditional') assert.ok(near(value, m.count / m.row))
            if (question.kind === 'marginal') assert.ok(near(value, (m.b + 2 * m.c) / (m.a + m.b + m.c)))
            if (question.kind === 'independent') assert.ok(near(value, (m.row * m.column) / m.total))
            if (question.kind === 'product') assert.ok(near(value, (m.x - m.mx) * (m.y - m.my)))
            if (question.kind === 'covariance') assert.ok(near(value, m.mean - m.mx * m.my))
            if (question.kind === 'r') assert.ok(near(value, m.cxy / (m.sx * m.sy)) && Math.abs(value) <= 1)
            if (question.kind === 'units') assert.ok(near(value, m.factor * m.cxy))
            if (question.kind === 'slope') assert.ok(near(value, m.cxy / m.vx))
            if (question.kind === 'estimate') assert.ok(near(value, m.my + m.slope * (m.x - m.mx)))
            if (question.kind === 'lines') assert.ok(near(value * value, m.a * m.c) && Math.sign(value) === Math.sign(m.a))
            if (question.kind === 'cell') assert.ok(near(value, m.f * m.x * m.y))
            if (question.kind === 'variance') assert.ok(near(value, m.squares / m.n - (m.sum / m.n) ** 2))
            if (question.kind === 'mean') assert.ok(near(value, m.slope * m.mx + m.intercept))
        }
    }
    assert.equal(kinds.size, 15)
})

test('bidimentsionala batx1 z games: el signo de la covarianza', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const rounds = createSignRounds(createRandom(seed * 37 + level), level)
            assert.equal(rounds.length, SIGN_ROUNDS)
            for (const round of rounds) {
                for (const [x, y] of round.points) assert.ok(x >= 0 && x <= 10 && y >= 0 && y <= 10)
                const stats = pairStats(round.points)
                if (round.kind === 'sign') {
                    const sign = round.answer === 0 ? 1 : round.answer === 2 ? -1 : 0
                    if (sign === 0) assert.ok(Math.abs(stats.r) <= 0.15)
                    else assert.ok(Math.sign(stats.cxy) === sign && Math.abs(stats.r) >= 0.6)
                }
                if (round.kind === 'point') {
                    const products = deviationProducts(round.points)
                    const target = products[round.answer]
                    for (const [index, value] of products.entries()) {
                        if (index === round.answer) continue
                        assert.ok(round.ask === 'adds' ? value <= target - 2 : value >= target + 2, `${round.ask}: ${products.join(' ')}`)
                    }
                    assert.ok(round.ask === 'adds' ? target > 0 : target < 0)
                }
                if (round.kind === 'value') {
                    assert.equal(round.options.length, 3)
                    assert.ok(near(round.options[round.answer], stats.cxy))
                    for (const option of round.options) render(texNumber(option))
                }
            }
        }
    }
})

test('bidimentsionala batx1 z games: ¿qué rectas?', () => {
    assert.equal(lineLatex('y', 0.8, -1.4), 'y=0{,}8x-1{,}4')
    assert.equal(lineLatex('x', -1, 9), 'x=-y+9')
    assert.equal(lineLatex('y', 2, 0), 'y=2x')
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const rounds = createLinesRounds(createRandom(seed * 41 + level), level)
            assert.equal(rounds.length, LINES_ROUNDS)
            for (const round of rounds) {
                render(lineLatex('y', round.a, round.b))
                render(lineLatex('x', round.c, round.d))
                const product = round.a * round.c
                if (round.verdict === 'possible') {
                    assert.ok(product > 0 && product <= 1)
                    // The two lines cross at the centre of gravity
                    assert.ok(near(round.a * round.mx + round.b, round.my) && near(round.c * round.my + round.d, round.mx))
                }
                if (round.verdict === 'signs') assert.ok(product < 0)
                if (round.verdict === 'over') assert.ok(product > 1)
                assert.equal(new Set(round.options).size, round.options.length)
                if (level === 0) assert.equal(round.options[round.answer], pointLatex(round.mx, round.my))
                if (level === 1) assert.ok(near(Number(round.options[round.answer].replace('{,}', '.')), linesR(round)))
                if (level === 2) assert.equal(round.options[round.answer], round.verdict)
                for (const option of level < 2 ? round.options : []) render(option)
            }
        }
    }
})

test('bidimentsionala batx1 z games: the detective has one wrong line, with a typical mistake', () => {
    assert.deepEqual(Object.keys(bivarDetectiveNames).sort(), bivarDetectiveLevels.flat().sort())
    checkTexts([...Object.values(bivarDetectiveNames), ...Object.values(bivarDetectiveTips)])
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cases = createBivarDetectiveCases(createRandom(seed * 17 + level), level)
            assert.equal(cases.length, BIVAR_DETECTIVE_CASES)
            for (const item of cases) {
                assert.equal(item.lines.length, 3)
                assert.ok(item.wrong >= 0 && item.wrong < 3)
                assert.ok(item.options.includes(item.error) && item.options.length === 3)
                assert.ok(!near(item.right, item.reached))
                checkTexts([item.problem, ...item.lines.map((entry) => entry.label)])
                for (const entry of item.lines) render(entry.latex)
                render(item.fix)
                assert.ok(checkWorked(item.fix, item.error) >= 1, `${item.error}: ${item.fix}`)
                // The lines before the wrong one are right
                for (const entry of item.lines.slice(0, item.wrong)) checkWorked(entry.latex, `${item.error} before the mistake`)
            }
        }
    }
})

test('bidimentsionala batx1 z games: memory pairs have one partner each', () => {
    for (let level = 0; level < bivarMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cards = createBivarMemoryBoard(createRandom(seed * 11 + level), level)
            assert.equal(cards.length, 2 * BIVAR_MEMORY_PAIRS)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) {
                render(card.latex)
                assert.ok(!card.latex.includes(':'), card.latex)
            }
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const answer = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!
                const value = Number(answer.latex.split('=').at(-1)!.replace('{,}', '.'))
                if (level === 0) assert.ok(near(value, evaluate(card.latex.replace(/\{-\}/g, '-'))!), card.latex)
                if (level === 1) assert.ok(near(value, evaluate(card.latex.replace(/\{,\}/g, '.'))!), card.latex)
                if (level === 2) {
                    const [a, c] = card.latex.replace(/\{,\}/g, '.').match(/-?\d+(?:\.\d+)?/g)!.map(Number)
                    assert.ok(near(value * value, a * c), card.latex)
                }
            }
        }
    }
})
