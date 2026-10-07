import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { createPolynomialsMemoryBoard, POLYNOMIALS_MEMORY_PAIRS, polynomialsMemoryLevels } from '../src/pages/dbh4-aplikatuak-polinomioak/games/boards.ts'
import { polynomialsGameModeForPath, polynomialsGameProgressIds, polynomialsGames } from '../src/pages/dbh4-aplikatuak-polinomioak/games/info.ts'
import { checkPolynomialsPitAnswer, generatePolynomialsRaceQuestion, POLYNOMIALS_RACE_CIRCUITS, polynomialsParTime, polynomialsRaceErrorTips } from '../src/pages/dbh4-aplikatuak-polinomioak/games/race.ts'
import { polynomialsLabChallengeIds } from '../src/pages/dbh4-aplikatuak-polinomioak/lab/labTools.ts'

/** Evaluates a LaTeX expression in x at a number: powers, implicit products and fractions */
function evaluate(latex: string, x: number): number {
    let js = latex.replace(/\\cdot/g, '*').replace(/\\mathbin\{:\}/g, '/').replace(/\s+/g, '').replace(/x/g, 'X')
    for (let pass = 0; pass < 3; pass += 1) {
        js = js
            .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))')
            .replace(/(\([^()]+\)|X|\d+)\^\{(\d+)\}/g, 'Math.pow($1,$2)')
    }
    js = js.replace(/(\d|X|\))(?=X|\(|Math)/g, '$1*').replace(/X/g, `(${x})`)
    assert.ok(/^(?:[\d+\-*/().]|Math\.pow|,)+$/.test(js), `${latex} → ${js}`)
    return Function(`return ${js}`)() as number
}

const mathIn = (text: string) => [...text.matchAll(/\$([^$]+)\$/g)].map((match) => match[1])
/** a in a divisor written x − a */
const rootOf = (binomial: string) => (binomial === 'x' ? 0 : binomial.startsWith('x-') ? Number(binomial.slice(2)) : -Number(binomial.slice(2)))

test('polinomioak 4. DBH ap games: levels, ids and routes', () => {
    assert.equal(polynomialsGames.length, 2)
    assert.equal(polynomialsGames[0].levels.length, POLYNOMIALS_RACE_CIRCUITS)
    assert.equal(polynomialsGames[1].levels.length, polynomialsMemoryLevels.length)
    assert.equal(new Set(polynomialsGameProgressIds).size, polynomialsGameProgressIds.length)
    assert.ok(!polynomialsGameProgressIds.some((id) => polynomialsLabChallengeIds.includes(id)))
    const stages = ['monomials', 'operations', 'division', 'factor', 'expressions']
    for (const game of polynomialsGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.equal(polynomialsGameModeForPath('/matematika/dbh4-aplikatuak/polinomios/juegos/carrera'), 'race')
    assert.equal(polynomialsGameModeForPath('/matematika/dbh4-aplikatuak/polinomios/jokuak/memoria'), 'memory')
})

test('polinomioak 4. DBH ap race: valid options and every new question checked against its prompt', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < POLYNOMIALS_RACE_CIRCUITS; circuit += 1) {
        assert.ok(polynomialsParTime(circuit) > 60000)
        for (let seed = 1; seed <= 120; seed += 1) {
            const random = createRandom(seed * 19 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generatePolynomialsRaceQuestion(random, circuit, tier)
                assert.equal(question.circuit, circuit)
                kinds.add(`${circuit}:${question.kind}`)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                for (const option of question.options) {
                    katex.renderToString(option.latex, { throwOnError: true })
                    if (!option.correct) assert.ok(polynomialsRaceErrorTips[option.error!], option.error!)
                }
                for (const language of ['eu', 'es', 'ar'] as const) for (const text of [question.prompt[language], question.solution[language]]) for (const formula of mathIn(text)) katex.renderToString(formula, { throwOnError: true })
                const right = question.options.find((option) => option.correct)!
                if (question.writable) {
                    assert.equal(Number(right.latex), toNumber(question.answer), question.kind)
                    assert.equal(checkPolynomialsPitAnswer(question, right.latex), 'correct')
                }
                if (circuit < 2) continue
                const shown = mathIn(question.prompt.es)
                const wrongValues = question.options.filter((option) => !option.correct).map((option) => Number(option.latex))
                const value = toNumber(question.answer)
                if (question.kind === 'remainder' || question.kind === 'quotient') {
                    const [, dividend, divisor] = shown[0].match(/^\((.+)\)\\mathbin\{:\}\((.+)\)$/)!
                    const a = rootOf(divisor)
                    if (question.kind === 'remainder') assert.equal(evaluate(dividend, a), value, shown[0])
                    else {
                        // C(x) = (P(x) − P(a)) / (x − a): its x coefficient from three values
                        const c = (t: number) => (evaluate(dividend, t) - evaluate(dividend, a)) / (t - a)
                        const [c1, c2, c3] = [c(a + 1), c(a + 2), c(a + 3)]
                        const second = (c3 - 2 * c2 + c1) / 2
                        const first = c2 - c1 - second * (2 * (a + 1) + 1)
                        assert.ok(Math.abs(first - value) < 1e-9, `${shown[0]}: ${first} vs ${value}`)
                    }
                } else if (question.kind === 'exact') {
                    const [, dividend, divisor] = shown[0].match(/^\((.+)\)\\mathbin\{:\}\((.+)\)$/)!
                    assert.equal(evaluate(dividend.replace('k', `(${value})`), rootOf(divisor)), 0)
                    for (const wrong of wrongValues) assert.notEqual(evaluate(dividend.replace('k', `(${wrong})`), rootOf(divisor)), 0)
                } else if (question.kind === 'root') {
                    assert.equal(evaluate(shown[0], Number(right.latex)), 0, shown[0])
                    for (const wrong of wrongValues) assert.notEqual(evaluate(shown[0], wrong), 0, `${shown[0]}: ${wrong}`)
                } else if (question.kind === 'fraction') {
                    const x = Number(shown[1].split('=')[1])
                    assert.equal(evaluate(shown[0], x), value, shown[0])
                } else if (question.kind === 'simplify') {
                    assert.equal(evaluate(shown[0], 0), value, shown[0])
                } else if (question.kind === 'rectangle') {
                    assert.equal(evaluate(shown[1], Number(shown[2].split('=')[1])), value)
                }
                if (question.writable) for (const wrong of wrongValues) assert.notEqual(wrong, value, question.kind)
            }
        }
    }
    for (const kind of ['2:remainder', '2:quotient', '2:exact', '3:root', '4:fraction', '4:simplify', '4:rectangle']) assert.ok(kinds.has(kind), `never generated: ${kind}`)
})

test('polinomioak 4. DBH ap race: the typical mistakes show up', () => {
    const errors = new Set<string>()
    for (let seed = 1; seed <= 200; seed += 1) {
        const random = createRandom(seed)
        for (let circuit = 0; circuit < POLYNOMIALS_RACE_CIRCUITS; circuit += 1) {
            for (const tier of [0, 2] as const) for (const option of generatePolynomialsRaceQuestion(random, circuit, tier).options) if (option.error) errors.add(option.error)
        }
    }
    for (const error of Object.keys(polynomialsRaceErrorTips).filter((error) => error !== 'calculation')) assert.ok(errors.has(error), `never used: ${error}`)
})

test('polinomioak 4. DBH ap memory: every card has exactly one partner and the pair is true', () => {
    for (let level = 0; level < polynomialsMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cards = createPolynomialsMemoryBoard(createRandom(seed * 7 + level), level)
            assert.equal(cards.length, POLYNOMIALS_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                katex.renderToString(card.latex, { throwOnError: true })
                const partner = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!
                if (polynomialsMemoryLevels[level] === 'remainder') {
                    const [, dividend, divisor] = card.latex.match(/^\((.+)\)\\mathbin\{:\}\((.+)\)$/)!
                    assert.equal(`R=${evaluate(dividend, rootOf(divisor))}`, partner.latex)
                } else for (const x of [2, 3, -1]) assert.ok(Math.abs(evaluate(card.latex, x) - evaluate(partner.latex, x)) < 1e-9, `${card.latex} = ${partner.latex}`)
            }
        }
    }
})
