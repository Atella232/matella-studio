import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { gizAlgebraLabChallengeIds, gizAlgebraLabToolForTopic, gizAlgebraLabTools } from '../src/pages/batx1-gizarte-aljebra/lab/labTools.ts'

import { breakEvenChallenges, breakEvenExtra, breakEvenPrediction, breakEvenUnits, BUSINESSES, initialBreakEvenState, profit, setBreakEven, type BreakEvenState } from '../src/pages/batx1-gizarte-aljebra/lab/breakEven.ts'
import { budgetChallenges, budgetExtra, budgetPrediction, fits, initialBudgetState, setBudget, uses, type BudgetState } from '../src/pages/batx1-gizarte-aljebra/lab/budget.ts'
import { equilibriumPrice, gap, initialMarketState, MARKETS, marketChallenges, marketExtra, marketPrediction, setMarket, type MarketState } from '../src/pages/batx1-gizarte-aljebra/lab/market.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(/[؀-ۿ]/.test(text.ar.replace(/\$[^$]+\$/g, '')) || !/[a-zA-Z]{3}/.test(text.es.replace(/\$[^$]+\$/g, '')), `not Arabic: ${text.ar}`)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        // No Basque suffix glued to a number or to a formula
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/\$(?:ri|ren|rekin|z|ra|tik|ei|ko|an)(?![a-zA-Z])/.test(text.eu), text.eu)
    }
}

/** Every fixed challenge is solved by a state we name, and none is solved when the tool opens */
function checkChallenges<State>(challenges: LabChallenge<State>[], initial: State, solutions: Record<number, State>) {
    assert.equal(new Set(challenges.map((challenge) => challenge.id)).size, challenges.length)
    for (const challenge of challenges) {
        assert.ok(challenge.isSolved(solutions[challenge.id]), `${challenge.id} is not solved by its solution`)
        assert.ok(!challenge.isSolved(initial), `${challenge.id} starts solved`)
    }
    checkTexts(challenges.flatMap((challenge) => [challenge.prompt, challenge.hint]))
}

/** The endless challenges: well formed, solvable by their own solution, never solved at the start */
function checkExtras<State>(maker: LabChallengeMaker<State>, initial: State, setter: (state: State) => State) {
    const prompts = new Set<string>()
    for (let seed = 1; seed <= 150; seed += 1) {
        const challenge = maker(createRandom(seed * 7919 + 3))
        assert.ok(challenge.isSolved(challenge.solution), `seed ${seed}: ${challenge.prompt.es}`)
        // The solution is a state the controls can reach
        assert.deepEqual(setter(challenge.solution), challenge.solution, `seed ${seed}: unreachable ${challenge.prompt.es}`)
        assert.ok(!challenge.isSolved(initial), `seed ${seed} starts solved`)
        checkTexts([challenge.prompt, challenge.hint])
        prompts.add(challenge.prompt.es)
    }
    assert.ok(prompts.size >= 6, `only ${prompts.size} different challenges`)
}

test('aljebra batx1 g lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(gizAlgebraLabTools.length, 14)
    for (const stage of ['polynomials', 'equations', 'systems', 'inequalities', 'economy']) assert.ok(gizAlgebraLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of gizAlgebraLabTools) for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    for (const tool of gizAlgebraLabTools.filter((item) => ['break-even', 'market', 'budget'].includes(item.id))) for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
    // Tools of two units: no id twice
    assert.equal(new Set(gizAlgebraLabChallengeIds).size, gizAlgebraLabChallengeIds.length)
    for (const id of [...breakEvenChallenges, ...marketChallenges, ...budgetChallenges].map((challenge) => challenge.id)) assert.ok(id >= 132101 && id <= 132399, `${id}`)
    const topics = ['ruffini-roots', 'factorize-high', 'algebraic-fractions', 'change-variable', 'rational-equations', 'radical-equations', 'exponential-equations', 'log-equations', 'nonlinear-substitution', 'gauss-method', 'money-systems', 'polynomial-inequalities', 'rational-inequalities', 'half-plane-regions', 'break-even', 'supply-demand', 'budget-region']
    for (const topic of Object.keys(gizAlgebraLabToolForTopic)) assert.ok(topics.includes(topic), topic)
    for (const tool of gizAlgebraLabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
    for (const tool of Object.values(gizAlgebraLabToolForTopic)) assert.ok(gizAlgebraLabTools.some((item) => item.id === tool), `${tool}`)
})

test('aljebra batx1 g lab: el punto muerto', () => {
    const at = (patch: Partial<BreakEvenState>) => setBreakEven(initialBreakEvenState, patch)
    const school = setBreakEven(initialBreakEvenState, { business: 2 })
    assert.deepEqual([school.price, school.units], [80, 20])
    assert.equal(breakEvenUnits(at({})), 300)
    assert.equal(profit(at({ units: 300 })), 0)
    assert.equal(profit(at({ units: 400 })), 400)
    assert.equal(breakEvenPrediction(at({ units: 300 })), '=')
    assert.equal(breakEvenPrediction(at({ units: 100 })), '<')
    assert.equal(breakEvenPrediction(at({ units: 500 })), '>')
    // The break-even point of each business at its starting price is a whole number of units
    BUSINESSES.forEach((business, index) => assert.ok(Number.isInteger(breakEvenUnits({ business: index, price: business.price.start }))))
    assert.equal(at({ price: 40 }).price, 15)
    assert.equal(at({ units: 312 }).units, 300)
    assert.equal(at({ units: 150 }).prediction, null)
    checkChallenges(breakEvenChallenges, initialBreakEvenState, {
        132101: at({ units: 300 }),
        132102: at({ price: 11, units: 200 }),
        132103: setBreakEven(setBreakEven(initialBreakEvenState, { business: 1 }), { price: 4, units: 400 }),
        132104: setBreakEven(school, { price: 100, units: 30 }),
        132105: setBreakEven(school, { units: 50 })
    })
    // 132104: 90 euros loses money with 30 students, 100 does not
    assert.ok(profit(setBreakEven(school, { price: 90, units: 30 })) < 0 && profit(setBreakEven(school, { price: 100, units: 30 })) >= 0)
    checkExtras(breakEvenExtra, initialBreakEvenState, (state) => setBreakEven(state, {}))
})

test('aljebra batx1 g lab: oferta y demanda', () => {
    const at = (patch: Partial<MarketState>) => setMarket(initialMarketState, patch)
    assert.deepEqual(MARKETS.map((_, index) => equilibriumPrice(index)), [25, 16, 20])
    // Never a negative quantity inside each market's prices
    MARKETS.forEach((market, index) => {
        for (let price = market.price.min; price <= market.price.max; price++) {
            assert.ok(market.demand.a - market.demand.b * price >= 0 && market.supply.c * price - market.supply.d >= 0, `${index} ${price}`)
        }
    })
    assert.equal(gap(at({ price: 30 })), 50)
    assert.equal(marketPrediction(at({ price: 25 })), '=')
    assert.equal(marketPrediction(at({ price: 20 })), '<')
    assert.equal(marketPrediction(at({ price: 30 })), '>')
    assert.equal(at({ price: 99 }).price, 45)
    const fruit = setMarket(initialMarketState, { market: 1 })
    checkChallenges(marketChallenges, initialMarketState, {
        132201: at({ price: 25 }),
        132202: at({ price: 30 }),
        132203: setMarket(fruit, { price: 12 }),
        132204: setMarket(setMarket(initialMarketState, { market: 2 }), { price: 20 }),
        132205: setMarket(setMarket(initialMarketState, { market: 2 }), { price: 25 })
    })
    checkExtras(marketExtra, initialMarketState, (state) => setMarket(state, {}))
})

test('aljebra batx1 g lab: la región del presupuesto', () => {
    const at = (patch: Partial<BudgetState>) => setBudget(initialBudgetState, patch)
    assert.deepEqual(uses(at({ x: 20, y: 10 })), [900, 80])
    assert.ok(fits(at({ x: 20, y: 10 })))
    assert.equal(budgetPrediction(at({ x: 20, y: 10 })), '<')
    assert.equal(budgetPrediction(at({ x: 25, y: 10 })), '=')
    assert.equal(budgetPrediction(at({ x: 45, y: 0 })), '=')
    assert.equal(budgetPrediction(at({ x: 40, y: 4 })), '>')
    assert.ok(!fits(at({ x: 40, y: 4 })))
    const bakery = setBudget(initialBudgetState, { scenario: 1 })
    checkChallenges(budgetChallenges, initialBudgetState, {
        132301: at({ x: 25, y: 10 }),
        132302: at({ x: 45, y: 0 }),
        132303: at({ x: 5, y: 19 }),
        132304: setBudget(bakery, { x: 0, y: 25 }),
        132305: setBudget(bakery, { x: 15, y: 10 })
    })
    // 132302: 46 chairs no longer fit in the hours
    assert.ok(!fits(at({ x: 46, y: 0 })))
    checkExtras(budgetExtra, initialBudgetState, (state) => setBudget(state, {}))
})
