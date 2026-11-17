import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { averageCost, COST_FIRMS, costChallenges, costExtra, costPrediction, initialCostState, PRODUCTIONS, setCost, type CostState } from '../src/pages/batx2-gizarte-limiteak/lab/averageCost.ts'
import { capitalAfter, ceilingOf, COMPOUND_RATES, compoundChallenges, compoundExtra, initialCompoundState, PERIODS, setCompound, type CompoundState } from '../src/pages/batx2-gizarte-limiteak/lab/compound.ts'
import { bach2gLimitsLabChallengeIds, bach2gLimitsLabToolForTopic, bach2gLimitsLabTools } from '../src/pages/batx2-gizarte-limiteak/lab/labTools.ts'
import { fairCharge, initialTariffState, setTariff, TARIFF_KINDS, TARIFF_SETUP, tariffChallenges, tariffExtra, tariffJump, tariffLatex, tariffPrediction, type TariffState } from '../src/pages/batx2-gizarte-limiteak/lab/tariff.ts'

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

const own = [...costChallenges, ...tariffChallenges, ...compoundChallenges]

test('limiteak batx2 g lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(bach2gLimitsLabTools.length, 8)
    for (const stage of ['graph', 'infinity', 'point', 'continuity', 'context']) assert.ok(bach2gLimitsLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of bach2gLimitsLabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    }
    const ids = new Set(bach2gLimitsLabTools.map((tool) => tool.id))
    for (const tool of Object.values(bach2gLimitsLabToolForTopic)) assert.ok(tool && ids.has(tool), tool)
    assert.equal(new Set(bach2gLimitsLabChallengeIds).size, bach2gLimitsLabChallengeIds.length)
    // The challenges of this unit sit in its own block of ids
    for (const challenge of own) assert.ok(challenge.id >= 145101 && challenge.id <= 145399, `${challenge.id}`)
})

test('limiteak batx2 g lab: the average cost tends to the cost per unit, to 0 or grows without end', () => {
    for (const firm of COST_FIRMS) {
        const near = averageCost(firm, 1e6)
        const trend = costPrediction({ firm })
        if (trend === '<') assert.ok(near < 0.01, firm)
        if (trend === '=') assert.ok(Math.abs(near - 2) < 0.01, firm)
        if (trend === '>') assert.ok(near > 1000, firm)
    }
    const at = (firm: CostState['firm'], x: number): CostState => ({ firm, step: PRODUCTIONS.indexOf(x), prediction: null })
    checkChallenges(costChallenges, initialCostState, { 145101: at('bakery', 1000), 145102: at('app', 2000), 145103: at('workshop', 100), 145104: at('bakery', 10000), 145105: at('app', 500) })
    // 145103: 100 units is the lowest average cost of the workshop
    const workshop = PRODUCTIONS.map((x) => averageCost('workshop', x))
    assert.equal(PRODUCTIONS[workshop.indexOf(Math.min(...workshop))], 100)
    checkExtras(costExtra, initialCostState, (state) => setCost(state, {}))
})

test('limiteak batx2 g lab: the tariff jumps by the difference of its sides, and one charge closes it', () => {
    for (const kind of TARIFF_KINDS) {
        const fair: TariffState = { kind, k: fairCharge(kind), prediction: null }
        assert.equal(tariffJump(fair), 0, kind)
        assert.equal(tariffJump({ kind, k: fairCharge(kind) + 2 }), 2, kind)
        assert.ok(Number.isInteger(fairCharge(kind)) && fairCharge(kind) <= TARIFF_SETUP[kind].kMax, kind)
        katex.renderToString(tariffLatex(fair), { throwOnError: true })
    }
    // The three tariffs start with a jump up, a jump down and no jump
    assert.deepEqual(TARIFF_KINDS.map((kind) => tariffPrediction({ kind, k: TARIFF_SETUP[kind].k0 })), ['>', '<', '='])
    checkChallenges(tariffChallenges, initialTariffState, {
        145201: { kind: 'water', k: 5, prediction: null },
        145202: { kind: 'parking', k: 2, prediction: null },
        145203: { kind: 'power', k: 21, prediction: null },
        145204: { kind: 'water', k: 4, prediction: null },
        145205: { kind: 'parking', k: 5, prediction: null }
    })
    checkExtras(tariffExtra, initialTariffState, (state) => setTariff(state, {}))
})

test('limiteak batx2 g lab: compounding more often approaches 1000 eʳ and never passes it', () => {
    for (const rate of COMPOUND_RATES) {
        const values = PERIODS.map((n) => capitalAfter(rate, n))
        for (let i = 1; i < values.length; i++) assert.ok(values[i] > values[i - 1] && values[i] < ceilingOf(rate), rate)
    }
    const at = (rate: CompoundState['rate'], n: number): CompoundState => ({ rate, step: PERIODS.indexOf(n), prediction: null })
    checkChallenges(compoundChallenges, initialCompoundState, { 145301: at('r100', 365), 145302: at('r10', 12), 145303: at('r5', 365), 145304: at('r100', 12), 145305: at('r10', 365) })
    // The fixed challenges need the right compounding, not the one just before it
    assert.ok(!compoundChallenges[0].isSolved(at('r100', 52)) && !compoundChallenges[2].isSolved(at('r5', 52)) && !compoundChallenges[4].isSolved(at('r10', 52)))
    checkExtras(compoundExtra, initialCompoundState, (state) => setCompound(state, {}))
})
