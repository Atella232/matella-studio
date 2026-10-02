import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { checkChain, checkRealsQuestion, typed, valueOf } from './helpers/realsRaceCheck.ts'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toLatex } from '../src/features/unit-v2/math/fraction.ts'
import { createPlaceRound, createRealsMemoryBoard, isPlacedRight, placeLevels, placePoints, placeStars, PLACE_ROUNDS, REALS_MEMORY_PAIRS, realsMemoryLevels, snapToMark } from '../src/pages/dbh4-aplikatuak-errealak/games/boards.ts'
import { realsGameModeForPath, realsGameProgressIds, realsGames } from '../src/pages/dbh4-aplikatuak-errealak/games/info.ts'
import { checkRealsPitAnswer, generateRealsRaceQuestion, realsParTime, realsRaceErrorTips, REALS_RACE_CIRCUITS, type RealsRaceQuestion } from '../src/pages/dbh4-aplikatuak-errealak/games/race.ts'

const check = (question: RealsRaceQuestion) => checkRealsQuestion(question, realsRaceErrorTips, checkRealsPitAnswer as never)
import { realsLabChallengeIds } from '../src/pages/dbh4-aplikatuak-errealak/lab/labTools.ts'
import { generatrix, radicalLatex, scientificLatex, simplifySqrt, toScientific } from '../src/pages/dbh4-aplikatuak-errealak/reals.ts'

test('errealak 4. DBH games: levels, ids and routes', () => {
    assert.equal(realsGames.length, 3)
    assert.equal(realsGames[0].levels.length, REALS_RACE_CIRCUITS)
    assert.equal(realsGames.find((game) => game.id === 'place')!.levels.length, placeLevels.length)
    assert.equal(realsGames.find((game) => game.id === 'memory')!.levels.length, realsMemoryLevels.length)
    assert.equal(new Set(realsGameProgressIds).size, realsGameProgressIds.length)
    assert.ok(!realsGameProgressIds.some((id) => realsLabChallengeIds.includes(id)))
    assert.equal(realsGameModeForPath('/matematika/dbh4-aplikatuak/numeros-reales/juegos/recta'), 'place')
    assert.equal(realsGameModeForPath('/matematika/dbh4-aplikatuak/numeros-reales/jokuak/lasterketa'), 'race')
    assert.equal(realsGameModeForPath('/matematika/dbh4-aplikatuak/numeros-reales/jokuak'), 'hub')
})

test('errealak 4. DBH race: every question is right and every wrong option is really wrong', () => {
    const kinds = new Set<string>()
    let chains = 0
    for (let circuit = 0; circuit < REALS_RACE_CIRCUITS; circuit += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            const random = createRandom(seed * 17 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateRealsRaceQuestion(random, circuit, tier)
                kinds.add(question.kind)
                assert.equal(question.circuit, circuit)
                chains += check(question)
                const pit = generateRealsRaceQuestion(random, circuit, tier, true)
                assert.ok(pit.writable, `${circuit} ${pit.kind}`)
                chains += check(pit)
            }
        }
        assert.ok(realsParTime(circuit) > 60000)
    }
    for (const kind of ['fraction-sum', 'fraction-div', 'negative-power', 'power-product', 'kind-pick', 'expansion', 'generatrix', 'exact-fraction', 'irrational-pick', 'interval-inequality', 'interval-line', 'interval-count', 'sqrt-between', 'round', 'abs-error', 'sci-exponent', 'scientific', 'sci-product', 'root', 'simplify', 'like-radicals', 'radical-product']) assert.ok(kinds.has(kind), `never generated: ${kind}`)
    assert.ok(chains > 2000, `only ${chains} worked lines checked`)
})

test('errealak 4. DBH race: fractions and decimals are accepted in the pit stop', () => {
    let seen = 0
    for (let seed = 1; seed <= 300; seed += 1) {
        const question = generateRealsRaceQuestion(createRandom(seed), 1, 2, true)
        if (question.answer.denominator === 1) continue
        seen += 1
        assert.equal(checkRealsPitAnswer(question, `${question.answer.numerator}/${question.answer.denominator}`), 'correct')
        assert.equal(checkRealsPitAnswer(question, `${question.answer.numerator + 1}/${question.answer.denominator}`), 'incorrect')
    }
    assert.ok(seen > 100, `only ${seen}`)
    const rounding = generateRealsRaceQuestion(createRandom(5), 3, 0, true)
    assert.equal(checkRealsPitAnswer(rounding, typed(rounding.answer).replace(',', '.')), 'correct')
})

test('errealak 4. DBH line game: targets fit the line and are scored fairly', () => {
    for (let level = 0; level < placeLevels.length; level += 1) {
        const settings = placeLevels[level]
        for (let seed = 1; seed <= 80; seed += 1) {
            const targets = createPlaceRound(createRandom(seed * 3 + level), level)
            assert.equal(targets.length, PLACE_ROUNDS)
            assert.equal(new Set(targets.map((target) => target.latex)).size, PLACE_ROUNDS)
            for (const target of targets) {
                assert.ok(target.value > settings.from && target.value < settings.to, target.latex)
                assert.ok(Math.abs(valueOf(target.latex)! - target.value) < 1e-9, target.latex)
                katex.renderToString(target.worked, { throwOnError: true, strict: 'error' })
                const nearest = snapToMark(settings, target.value)
                assert.ok(isPlacedRight(settings, nearest, target.value), `${target.latex} at ${nearest}`)
                // Two marks further away is always wrong
                assert.ok(!isPlacedRight(settings, nearest + 1 / settings.minor * (nearest > target.value ? 1 : -1) * 2, target.value), target.latex)
                if (settings.tolerance === 0) {
                    assert.equal(nearest, target.value, `${target.latex} is not on a mark`)
                    assert.ok(checkChain(target.worked, target.latex) > 0, target.worked)
                } else {
                    // Both tenths around an irrational are right, the next ones are not
                    const below = Math.floor(target.value * 10) / 10
                    assert.ok(isPlacedRight(settings, below, target.value) && isPlacedRight(settings, below + 0.1, target.value))
                    assert.ok(!isPlacedRight(settings, below - 0.1, target.value) && !isPlacedRight(settings, below + 0.2, target.value))
                    const approx = target.worked.match(/\\approx (?:[^=]*=)?(\d+\{,\}\d+)$/)
                    assert.ok(approx, target.worked)
                    assert.ok(Math.abs(Number(approx[1].replace('{,}', '.')) - target.value) < 0.006, target.worked)
                }
            }
        }
    }
    assert.equal(snapToMark(placeLevels[1], 0.36), 0.4)
    assert.equal(snapToMark(placeLevels[0], 9), 3)
    assert.deepEqual([placePoints(0), placePoints(1), placePoints(2)], [2, 1, 0])
    assert.deepEqual([placeStars(16), placeStars(14), placeStars(10), placeStars(4)], [3, 3, 2, 1])
})

test('errealak 4. DBH memory: every card has exactly one partner and the pair is true', () => {
    for (let level = 0; level < realsMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const cards = createRealsMemoryBoard(createRandom(seed * 7 + level), level)
            assert.equal(cards.length, REALS_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const partner = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!
                assert.ok(card.explain && card.explain === partner.explain)
                katex.renderToString(card.latex, { throwOnError: true, strict: 'error' })
                katex.renderToString(card.explain!, { throwOnError: true, strict: 'error' })
                if (level === 0) {
                    const match = card.latex.match(/^(\d+)\{,\}(\d*)\\overline\{(\d+)\}$/)!
                    assert.ok(match, card.latex)
                    assert.equal(partner.latex, toLatex(generatrix({ negative: false, integer: match[1], preperiod: match[2], period: match[3] })))
                } else if (level === 1) {
                    const text = card.latex.replace(/\\,/g, '').replace('{,}', '.')
                    assert.equal(partner.latex, scientificLatex(toScientific(text)))
                    assert.ok(Math.abs(valueOf(partner.latex)! / Number(text) - 1) < 1e-9)
                } else {
                    const n = Number(card.latex.match(/^\\sqrt\{(\d+)\}$/)![1])
                    const { outside, inside } = simplifySqrt(n)
                    assert.ok(outside > 1 && inside > 1)
                    assert.equal(partner.latex, radicalLatex(outside, inside))
                }
                if (level !== 0) assert.ok(checkChain(card.explain!, card.latex) > 0, card.explain)
            }
        }
    }
})
