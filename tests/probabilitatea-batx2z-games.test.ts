import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { Tier } from '../src/features/unit-v2/games/raceCore.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { createProbabilityBatx2MemoryBoard, PROBABILITY_BATX2_MEMORY_PAIRS, probabilityBatx2MemoryLevels } from '../src/pages/batx2-zientziak-probabilitatea/games/boards.ts'
import { createCulpritRounds, CULPRIT_ROUNDS, culpritPaths, culpritPosterior } from '../src/pages/batx2-zientziak-probabilitatea/games/culprit.ts'
import { createProbabilityBatx2DetectiveCases, PROBABILITY_BATX2_DETECTIVE_CASES, probabilityBatx2DetectiveLevels, probabilityBatx2DetectiveNames, probabilityBatx2DetectiveTips } from '../src/pages/batx2-zientziak-probabilitatea/games/detective.ts'
import { probabilityBatx2GameModeForPath, probabilityBatx2GameProgressIds, probabilityBatx2Games, probabilityBatx2GameSlugs } from '../src/pages/batx2-zientziak-probabilitatea/games/info.ts'
import { checkProbabilityBatx2PitAnswer, generateProbabilityBatx2RaceQuestion, PROBABILITY_BATX2_RACE_CIRCUITS, probabilityBatx2RaceErrorTips } from '../src/pages/batx2-zientziak-probabilitatea/games/race.ts'
import { createRelationRounds, RELATION_ROUNDS, relationData, relationOf, relationWorked } from '../src/pages/batx2-zientziak-probabilitatea/games/relation.ts'
import { createVennRounds, valueOf, VENN_ROUNDS } from '../src/pages/batx2-zientziak-probabilitatea/games/vennGame.ts'
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
        const formulas = (value: string) => [...value.matchAll(/\$([^$]+)\$/g)].map((match) => match[1].replace(/\{,\}/g, '.')).sort()
        for (const language of ['eu', 'en', 'ar'] as const) assert.deepEqual(formulas(text[language]), formulas(text.es), `${language}: ${text[language]}`)
        // No Basque suffix glued to a number or to a formula
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/§(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '§')), text.eu)
        // MathText turns «:» into ÷ inside formulas
        for (const [, formula] of text.es.matchAll(/\$([^$]+)\$/g)) assert.ok(!formula.includes(':'), formula)
    }
}

/** Every equality of a worked line with numbers is right (decimals inside \frac are read with the point) */
function checkWorked(latex: string, where: string) {
    let read = 0
    for (const part of latex.replace(/\{,\}/g, '.').split(/\\qquad|\\quad|\\ \\to\\ |\\to|,\\ /)) {
        const values = part.split(/\\le|\\ge|\\neq|<|>|\\approx/)[0].split('=').map((side) => evaluate(side)).filter((value): value is number => value !== null)
        if (values.length < 2) continue
        assert.ok(values.every((value) => near(value, values[0])), `${where}: ${part} → ${values.join(' / ')}`)
        read += 1
    }
    return read
}

test('probabilitatea batx2 z games: the hub, its levels and progress ids', () => {
    assert.deepEqual(probabilityBatx2Games.map((game) => game.id), ['race', 'relation', 'venn', 'culprit', 'detective', 'memory', 'tree', 'table'])
    assert.equal(new Set(probabilityBatx2GameProgressIds).size, probabilityBatx2GameProgressIds.length)
    // The unit's block of ids: games go from 128401 to 128899
    for (const id of probabilityBatx2GameProgressIds) assert.ok(id >= 128401 && id <= 128899, `${id}`)
    const stages = ['review', 'events', 'conditional', 'bayes']
    for (const game of probabilityBatx2Games) {
        assert.ok(game.levels.length >= 3, game.id)
        for (const level of game.levels) {
            assert.ok(stages.includes(level.stage), `${game.id}: ${level.stage}`)
            for (const language of languages) assert.ok(!level.description[language].includes('$') && !level.title[language].includes('$'), `${game.id} ${language}`)
        }
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(probabilityBatx2GameModeForPath(`/matematika/batx2-zientziak/probabilidad/jokuak/${probabilityBatx2GameSlugs[game.id]}`), game.id)
    }
    assert.equal(probabilityBatx2GameModeForPath('/matematika/batx2-zientziak/probabilidad/jokuak'), 'hub')
    assert.equal(probabilityBatx2GameModeForPath('/matematika/batx2-zientziak/probabilidad/juegos/quien-fue'), 'culprit')
})

test('probabilitatea batx2 z games: every race question has one right option, worked out from its numbers', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < PROBABILITY_BATX2_RACE_CIRCUITS; circuit += 1) {
        for (const tier of [0, 1, 2] as Tier[]) {
            for (let seed = 1; seed <= 60; seed += 1) {
                const question = generateProbabilityBatx2RaceQuestion(createRandom(seed * 7919 + circuit * 31 + tier), circuit, tier)
                kinds.add(question.kind)
                assert.equal(question.circuit, circuit)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, `${question.kind}: ${question.options.map((option) => option.latex).join(' | ')}`)
                for (const option of question.options) render(option.latex)
                checkTexts([question.prompt, question.solution])
                const right = question.options.find((option) => option.correct)!
                const typed = right.latex.replace('{,}', ',').replace(/\\frac\{(\d+)\}\{(\d+)\}/, '$1/$2')
                assert.equal(checkProbabilityBatx2PitAnswer(question, typed), 'correct', `${question.kind}: ${right.latex}`)
                for (const option of question.options.filter((item) => !item.correct)) assert.ok(option.error && probabilityBatx2RaceErrorTips[option.error], question.kind)
                assert.ok(checkWorked(question.solution.es.replace(/\$/g, ''), question.kind) >= 1, `${question.kind}: ${question.solution.es}`)
                // The right answer, recomputed from the numbers of the question
                const m = question.meta
                const answer = toNumber(question.answer)
                const expected: Record<string, () => number> = {
                    laplace: () => (m.faces - m.k) / m.faces,
                    draws: () => (m.red * (m.red - 1)) / (m.total * (m.total - 1)),
                    pairs: () => (m.people * (m.people - 1)) / 2,
                    union: () => (m.a + m.b - m.both) / 100,
                    difference: () => (m.a - m.both) / 100,
                    neither: () => 1 - m.union / 100,
                    events: () => 2 ** m.outcomes,
                    conditional: () => m.both / m.b,
                    product: () => (m.a * m.given) / 10_000,
                    independent: () => m.a / 100 + m.b / 100 - (m.a * m.b) / 10_000,
                    'at-least': () => 1 - (1 - m.p / 100) ** m.times,
                    total: () => (m.share * m.rate1 + (100 - m.share) * m.rate2) / 10_000,
                    posterior: () => (m.share * m.rate1) / (m.share * m.rate1 + (100 - m.share) * m.rate2)
                }
                assert.ok(near(answer, expected[question.kind]()), `${question.kind}: ${answer}`)
            }
        }
    }
    assert.equal(kinds.size, 13)
})

test('probabilitatea batx2 z games: independientes, incompatibles o ninguna', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const rounds = createRelationRounds(createRandom(seed * 31 + level), level)
            assert.equal(rounds.length, RELATION_ROUNDS)
            for (const answer of ['independent', 'exclusive', 'neither'] as const) assert.equal(rounds.filter((round) => round.answer === answer).length, 2)
            for (const round of rounds) {
                assert.equal(round.given, (['both', 'union', 'conditional'] as const)[level])
                assert.equal(relationOf(round), round.answer)
                // A possible diagram, and never both independent and exclusive
                assert.ok(round.a > 0 && round.b > 0 && round.both >= 0 && round.both <= Math.min(round.a, round.b) && round.a + round.b - round.both <= 100)
                for (const latex of [...relationData(round), ...relationWorked(round)]) render(latex)
                for (const latex of relationWorked(round)) assert.ok(checkWorked(latex, 'relation') >= 1, latex)
            }
        }
    }
})

test('probabilitatea batx2 z games: rellena el Venn', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const rounds = createVennRounds(createRandom(seed * 53 + level), level)
            assert.equal(rounds.length, VENN_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.zones.reduce((sum, zone) => sum + zone, 0), 100)
                assert.ok(round.zones.every((zone) => zone >= 5 && zone % 5 === 0))
                assert.equal(round.answer, valueOf(round.zones, round.asked))
                assert.equal(round.options.length, 3)
                assert.equal(new Set(round.options).size, 3)
                assert.equal(round.options.filter((value) => value === round.answer).length, 1)
                for (const latex of [...round.data, ...round.steps]) render(latex)
                for (const latex of round.steps) assert.ok(checkWorked(latex, 'venn') >= 1, latex)
                // The data fix the diagram: the intersection the steps reach is the real one
                if (round.steps.length) assert.ok(round.steps.at(-1)!.endsWith(`=${round.zones[1] % 10 === 0 ? `0{,}${round.zones[1] / 10}` : `0{,}${String(round.zones[1]).padStart(2, '0')}`}`), round.steps.at(-1))
            }
        }
    }
})

test('probabilitatea batx2 z games: ¿quién fue?', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const rounds = createCulpritRounds(createRandom(seed * 71 + level), level)
            assert.equal(rounds.length, CULPRIT_ROUNDS)
            let traps = 0
            for (const round of rounds) {
                assert.equal(round.shares.length, level === 0 ? 2 : 3)
                assert.equal(round.shares.reduce((sum, share) => sum + share, 0), 10)
                if (level < 2) assert.ok(round.faulty)
                // The answer is the largest posterior, clearly ahead of the others
                const posteriors = round.shares.map((_, index) => toNumber(culpritPosterior(round, index)))
                assert.ok(near(posteriors.reduce((sum, value) => sum + value, 0), 1))
                const paths = culpritPaths(round)
                for (const [index, path] of paths.entries()) if (index !== round.answer) assert.ok(path * 6 <= paths[round.answer] * 5)
                if (round.answer !== round.shares.indexOf(Math.max(...round.shares))) traps += 1
            }
            if (level < 2) assert.equal(traps, 4)
        }
    }
})

test('probabilitatea batx2 z games: the detective has one wrong line, with a typical mistake of 2.º', () => {
    assert.deepEqual(Object.keys(probabilityBatx2DetectiveNames).sort(), probabilityBatx2DetectiveLevels.flat().sort())
    checkTexts([...Object.values(probabilityBatx2DetectiveNames), ...Object.values(probabilityBatx2DetectiveTips)])
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cases = createProbabilityBatx2DetectiveCases(createRandom(seed * 17 + level), level)
            assert.equal(cases.length, PROBABILITY_BATX2_DETECTIVE_CASES)
            for (const item of cases) {
                assert.equal(item.lines.length, 3)
                assert.ok(item.wrong >= 0 && item.wrong < 3)
                assert.ok(item.options.includes(item.error) && item.options.length === 3)
                assert.ok(!near(item.right, item.reached), `${item.error}: ${item.right}`)
                checkTexts([item.problem, ...item.lines.map((entry) => entry.label)])
                for (const entry of item.lines) render(entry.latex)
                render(item.fix)
                assert.ok(checkWorked(item.fix, item.error) >= 1, `${item.error}: ${item.fix}`)
                for (const entry of item.lines.slice(0, item.wrong)) checkWorked(entry.latex, `${item.error} before the mistake`)
            }
        }
    }
})

test('probabilitatea batx2 z games: memory pairs have one partner each', () => {
    for (let level = 0; level < probabilityBatx2MemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cards = createProbabilityBatx2MemoryBoard(createRandom(seed * 11 + level), level)
            assert.equal(cards.length, 2 * PROBABILITY_BATX2_MEMORY_PAIRS)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) {
                render(card.latex)
                assert.equal(cards.filter((other) => other.setId === card.setId).length, 2)
            }
            // Each pair is right: complements add up to 1, products and Bayes quotients are exact
            for (let set = 0; set < PROBABILITY_BATX2_MEMORY_PAIRS; set += 1) {
                const [first, second] = cards.filter((card) => card.setId === set)
                const question = first.id.endsWith('-q') ? first.latex : second.latex
                const answer = first.id.endsWith('-a') ? first.latex : second.latex
                const read = (latex: string) => evaluate(latex.replace(/\{,\}/g, '.'))!
                const number = (latex: string) => read(latex.split('=').at(-1)!)
                if (level === 0) assert.ok(near(number(question) + number(answer), 1), `${question} ${answer}`)
                if (level === 1) {
                    const values = [...question.matchAll(/=([\d{},]+)/g)].map((match) => read(match[1]))
                    assert.ok(near(values[0] * values[1], number(answer)), `${question} ${answer}`)
                }
                if (level === 2) assert.ok(near(read(question), read(answer)), `${question} ${answer}`)
            }
        }
    }
})
