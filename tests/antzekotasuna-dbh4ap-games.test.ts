import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createSimilarityMemoryBoard, SIMILARITY_MEMORY_PAIRS, similarityMemoryLevels } from '../src/pages/dbh4-aplikatuak-antzekotasuna/games/boards.ts'
import { similarityGameModeForPath, similarityGameProgressIds, similarityGames } from '../src/pages/dbh4-aplikatuak-antzekotasuna/games/info.ts'
import { checkSimilarityPitAnswer, generateSimilarityRaceQuestion, SIMILARITY_RACE_CIRCUITS, similarityParTime, similarityRaceErrorTips } from '../src/pages/dbh4-aplikatuak-antzekotasuna/games/race.ts'
import { similarityLabChallengeIds } from '../src/pages/dbh4-aplikatuak-antzekotasuna/lab/labTools.ts'

const mathIn = (text: string) => [...text.matchAll(/\$([^$]+)\$/g)].map((match) => match[1])
const plainNumber = (latex: string) => Number(latex.replace(/\\,/g, '').replace('{,}', '.'))
/** The plain numbers shown in a prompt, in order (formulas like OA=2 give their number) */
const numbersIn = (text: string) => mathIn(text).map((formula) => plainNumber(formula.replace(/^.*(=|\\mathbin\{:\})/, ''))).filter((value) => !Number.isNaN(value))
const close = (a: number, b: number) => Math.abs(a - b) < 1e-6

test('antzekotasuna 4. DBH ap games: levels, ids and routes', () => {
    assert.equal(similarityGames.length, 2)
    assert.equal(similarityGames[0].levels.length, SIMILARITY_RACE_CIRCUITS)
    assert.equal(similarityGames[1].levels.length, similarityMemoryLevels.length)
    assert.equal(new Set(similarityGameProgressIds).size, similarityGameProgressIds.length)
    assert.ok(!similarityGameProgressIds.some((id) => similarityLabChallengeIds.includes(id)))
    const stages = ['thales', 'similarity', 'ratios', 'scales', 'heights']
    for (const game of similarityGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.equal(similarityGameModeForPath('/matematika/dbh4-aplikatuak/semejanza/juegos/carrera'), 'race')
    assert.equal(similarityGameModeForPath('/matematika/dbh4-aplikatuak/semejanza/jokuak/memoria'), 'memory')
})

test('antzekotasuna 4. DBH ap race: valid options and every question checked against its prompt', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < SIMILARITY_RACE_CIRCUITS; circuit += 1) {
        assert.ok(similarityParTime(circuit) > 60000)
        for (let seed = 1; seed <= 150; seed += 1) {
            const random = createRandom(seed * 37 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateSimilarityRaceQuestion(random, circuit, tier)
                assert.equal(question.circuit, circuit)
                kinds.add(`${circuit}:${question.kind}`)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                for (const option of question.options) {
                    katex.renderToString(option.latex, { throwOnError: true })
                    if (!option.correct) assert.ok(similarityRaceErrorTips[option.error!], `${question.kind}: ${option.error}`)
                }
                for (const language of ['eu', 'es', 'ar'] as const) for (const text of [question.prompt[language], question.solution[language]]) for (const formula of mathIn(text)) katex.renderToString(formula, { throwOnError: true })
                assert.ok(!question.prompt.ar.includes('{,}') && !question.solution.ar.includes('{,}'), question.kind)
                const right = question.options.find((option) => option.correct)!
                const value = toNumber(question.answer)
                assert.ok(close(plainNumber(right.latex), value), question.kind)
                assert.equal(checkSimilarityPitAnswer(question, right.latex.replace(/\\,/g, '').replace('{,}', ',')), 'correct', question.kind)
                const shown = numbersIn(question.prompt.es)
                const p = question.prompt.es
                if (question.kind === 'thales') {
                    const [a, b, c] = shown
                    assert.ok(close(value, (b * c) / a), p)
                } else if (question.kind === 'equal-parts') {
                    assert.ok(close(value, shown[0] / shown[1]), p)
                } else if (question.kind === 'proportional-parts') {
                    const weights = mathIn(p)[1].split(',\\ ').map(Number)
                    assert.ok(close(value, (shown[0] * Math.max(...weights)) / weights.reduce((total, weight) => total + weight, 0)), p)
                } else if (question.kind === 'side') {
                    const [a, a2, b] = shown
                    assert.ok(close(value, (b * a2) / a), p)
                } else if (question.kind === 'ratio') {
                    assert.ok(close(value, shown[1] / shown[0]), p)
                } else if (question.kind === 'homothety') {
                    assert.ok(close(value, shown[0] * shown[1]), p)
                } else if (['perimeter', 'area', 'volume'].includes(question.kind)) {
                    const power = { perimeter: 1, area: 2, volume: 3 }[question.kind as 'perimeter' | 'area' | 'volume']
                    assert.ok(close(value, shown[0] * shown[1] ** power), p)
                } else if (question.kind === 'area-root' || question.kind === 'volume-root') {
                    assert.ok(close(value ** (question.kind === 'area-root' ? 2 : 3), shown[0]), p)
                } else if (question.kind === 'map-to-real') {
                    const [n, cm] = shown
                    assert.ok(close(value, (cm * n) / 100000), p)
                } else if (question.kind === 'real-to-map') {
                    const [km, n] = shown
                    assert.ok(close(value, (km * 100000) / n), p)
                } else if (question.kind === 'find-scale') {
                    const [m, model] = shown
                    assert.ok(close(value, (m * 100) / model), p)
                } else if (question.kind === 'shadow') {
                    const [stick, stickShadow, treeShadow] = shown
                    assert.ok(close(value, (stick * treeShadow) / stickShadow), p)
                } else if (question.kind === 'mirror') {
                    const [eyes, toMirror, far] = shown
                    assert.ok(close(value, (eyes * far) / toMirror), p)
                } else if (question.kind === 'sight') {
                    const [eyes, toPost, post, far] = shown
                    assert.ok(close(value, ((post - eyes) * far) / toPost + eyes), p)
                } else {
                    assert.fail(`unchecked kind ${question.kind}`)
                }
            }
        }
    }
    for (const kind of ['0:thales', '0:equal-parts', '0:proportional-parts', '1:side', '1:ratio', '1:homothety', '2:perimeter', '2:area', '2:volume', '2:area-root', '2:volume-root', '3:map-to-real', '3:real-to-map', '3:find-scale', '4:shadow', '4:mirror', '4:sight']) assert.ok(kinds.has(kind), `never generated: ${kind}`)
})

test('antzekotasuna 4. DBH ap race: the typical mistakes show up', () => {
    const errors = new Set<string>()
    for (let seed = 1; seed <= 200; seed += 1) {
        const random = createRandom(seed)
        for (let circuit = 0; circuit < SIMILARITY_RACE_CIRCUITS; circuit += 1) {
            for (const tier of [0, 1, 2] as const) for (const option of generateSimilarityRaceQuestion(random, circuit, tier).options) if (option.error) errors.add(option.error)
        }
    }
    for (const error of ['cross-wrong', 'ratio-inverse', 'r-not-squared', 'r-squared-volume', 'unit', 'eyes', 'one-part']) assert.ok(errors.has(error), `never used: ${error}`)
})

test('antzekotasuna 4. DBH ap memory: every card has exactly one partner and the pair is true', () => {
    for (let level = 0; level < similarityMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cards = createSimilarityMemoryBoard(createRandom(seed * 7 + level), level)
            assert.equal(cards.length, SIMILARITY_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            assert.equal(new Set(cards.filter((card) => card.id.endsWith('-a')).map((card) => card.latex)).size, SIMILARITY_MEMORY_PAIRS)
            for (const card of cards) katex.renderToString(card.latex, { throwOnError: true })
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const partner = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!
                const answer = plainNumber(partner.latex.replace(/^x=|^\\times |\\ \\text\{km\}$/g, ''))
                const level_ = similarityMemoryLevels[level]
                if (level_ === 'thales') {
                    const [, a, b, c] = card.latex.match(/^\\frac\{(\d+)\}\{([\d{},\\]+)\}=\\frac\{(\d+)\}\{x\}$/)!
                    assert.ok(close(answer, (plainNumber(b) * Number(c)) / Number(a)), card.latex)
                } else if (level_ === 'factors') {
                    const [, r, name] = card.latex.match(/^r=(\d+)\\ \\to\\ ([PAV])$/)!
                    assert.ok(close(answer, Number(r) ** { P: 1, A: 2, V: 3 }[name as 'P' | 'A' | 'V']), card.latex)
                } else {
                    const [, cm, n] = card.latex.match(/^(\d+)\\ \\text\{cm\},\\ 1\\mathbin\{:\}([\d\\,]+)$/)!
                    assert.ok(close(answer, (Number(cm) * plainNumber(n)) / 100000), card.latex)
                }
            }
        }
    }
})
