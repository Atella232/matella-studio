import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { averageChallenges, averageExtra, averageOf, cheapestProduction, initialAverageState, nextOf, PLANTS, setAverage, type AverageState } from '../src/pages/batx2-gizarte-aplikazioak/lab/average.ts'
import { bach2gApplicationsLabChallengeIds, bach2gApplicationsLabToolForTopic, bach2gApplicationsLabTools } from '../src/pages/batx2-gizarte-aplikazioak/lab/labTools.ts'
import { bestRise, incomeAt, incomeLatex, incomeSlope, initialPriceState, priceChallenges, priceExtra, pricePrediction, setPrice, VENUE_SETUP, VENUES, type PriceState } from '../src/pages/batx2-gizarte-aplikazioak/lab/price.ts'
import { bestProduction, costOf, costSlope, FIRM_SETUP, FIRMS, initialProfitState, profitChallenges, profitExtra, profitOf, profitPrediction, setProfit, type ProfitState } from '../src/pages/batx2-gizarte-aplikazioak/lab/profit.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/\$(?:ri|ren|rekin|z|ra|tik|ei)(?![a-zA-Z])/.test(text.eu), text.eu)
    }
}

/** Every fixed challenge is solved by a state we name, and none is solved when the tool opens */
function checkChallenges<State>(challenges: LabChallenge<State>[], initial: State, solutions: Record<number, State>) {
    assert.equal(new Set(challenges.map((challenge) => challenge.id)).size, challenges.length)
    for (const challenge of challenges) {
        assert.ok(solutions[challenge.id], `${challenge.id} has no solution in the test`)
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
        assert.deepEqual(setter(challenge.solution), challenge.solution, `seed ${seed}: unreachable ${challenge.prompt.es}`)
        assert.ok(!challenge.isSolved(initial), `seed ${seed} starts solved`)
        checkTexts([challenge.prompt, challenge.hint])
        prompts.add(challenge.prompt.es)
    }
    assert.ok(prompts.size >= 6, `only ${prompts.size} different challenges`)
}

const d = (fn: (x: number) => number, x: number) => (fn(x + 1e-6) - fn(x - 1e-6)) / 2e-6
const own = [...profitChallenges, ...averageChallenges, ...priceChallenges]

test('aplikazioak batx2 g lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(bach2gApplicationsLabTools.length, 6)
    for (const stage of ['growth', 'extrema', 'curvature', 'optimization']) assert.ok(bach2gApplicationsLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of bach2gApplicationsLabTools) for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    const ids = new Set(bach2gApplicationsLabTools.map((tool) => tool.id))
    for (const tool of Object.values(bach2gApplicationsLabToolForTopic)) assert.ok(tool && ids.has(tool), tool)
    assert.equal(new Set(bach2gApplicationsLabChallengeIds).size, bach2gApplicationsLabChallengeIds.length)
    for (const challenge of own) assert.ok(challenge.id >= 147101 && challenge.id <= 147399, `${challenge.id}`)
})

test('aplikazioak batx2 g lab: income minus cost, best where I′ = C′', () => {
    for (const firm of FIRMS) {
        const best = bestProduction(firm)
        assert.ok(Number.isInteger(best) && best > 0 && best < 40, firm)
        for (let x = 0; x <= 40; x++) assert.ok(profitOf(firm, x) <= profitOf(firm, best) + 1e-9, `${firm} ${x}`)
        assert.ok(Math.abs(costSlope(firm, best) - FIRM_SETUP[firm].price) < 1e-9, firm)
        assert.ok(Math.abs(d((x) => costOf(firm, x), 7) - costSlope(firm, 7)) < 1e-4, firm)
        assert.ok(costOf(firm, 40) <= FIRM_SETUP[firm].yMax && FIRM_SETUP[firm].price * 40 <= FIRM_SETUP[firm].yMax, firm)
        katex.renderToString(FIRM_SETUP[firm].latex, { throwOnError: true })
    }
    assert.deepEqual(FIRMS.map((firm) => profitPrediction({ firm })), ['=', '>', '<'])
    const at = (firm: ProfitState['firm'], x: number): ProfitState => ({ firm, x, prediction: null })
    checkChallenges(profitChallenges, initialProfitState, { 147101: at('workshop', 20), 147102: at('bakery', 24), 147103: at('press', 4), 147104: at('workshop', 21), 147105: at('press', 10) })
    assert.ok(profitOf('press', 3) <= 0 && profitOf('press', 4) > 0)
    assert.ok(costSlope('workshop', 20) <= 50 && costSlope('workshop', 21) > 50)
    checkExtras(profitExtra, initialProfitState, (state) => setProfit(state, {}))
})

test('aplikazioak batx2 g lab: the average is lowest where it meets the next unit', () => {
    for (const plant of PLANTS) {
        const best = cheapestProduction(plant)
        assert.ok(Number.isInteger(best), plant)
        for (let x = 1; x <= 50; x++) assert.ok(averageOf(plant, x) >= averageOf(plant, best) - 1e-9, `${plant} ${x}`)
        assert.ok(Math.abs(nextOf(plant, best) - averageOf(plant, best)) < 1e-9, plant)
    }
    const at = (plant: AverageState['plant'], x: number): AverageState => ({ plant, x, prediction: null })
    checkChallenges(averageChallenges, initialAverageState, { 147201: at('p1', 20), 147202: at('p2', 30), 147203: at('p3', 20), 147204: at('p1', 21), 147205: at('p3', 10) })
    assert.ok(Math.abs(averageOf('p3', 20) - 60) < 1e-9 && Math.abs(averageOf('p3', 5) - 60) < 1e-9)
    assert.ok(nextOf('p1', 20) <= averageOf('p1', 20) + 1e-9 && nextOf('p1', 21) > averageOf('p1', 21))
    checkExtras(averageExtra, initialAverageState, (state) => setAverage(state, {}))
})

test('aplikazioak batx2 g lab: the price that brings in most', () => {
    for (const venue of VENUES) {
        const best = bestRise(venue)
        assert.ok(Number.isInteger(best) && best > 0 && best < VENUE_SETUP[venue].max, venue)
        for (let x = 0; x <= VENUE_SETUP[venue].max; x++) {
            assert.ok(incomeAt(venue, x) <= incomeAt(venue, best) + 1e-9, `${venue} ${x}`)
            assert.ok(incomeAt(venue, x) <= VENUE_SETUP[venue].yMax, `${venue} ${x}`)
            assert.ok(Math.abs(d((t) => incomeAt(venue, t), x) - incomeSlope(venue, x)) < 1e-4, `${venue} ${x}`)
        }
        assert.equal(incomeSlope(venue, best), 0)
        katex.renderToString(incomeLatex(venue), { throwOnError: true })
    }
    assert.deepEqual(VENUES.map((venue) => pricePrediction({ venue })), ['<', '=', '>'])
    const at = (venue: PriceState['venue'], x: number): PriceState => ({ venue, x, prediction: null })
    checkChallenges(priceChallenges, initialPriceState, { 147301: at('gym', 5), 147302: at('concert', 10), 147303: at('hotel', 40), 147304: at('concert', 20), 147305: at('hotel', 10) })
    checkExtras(priceExtra, initialPriceState, (state) => setPrice(state, {}))
})
