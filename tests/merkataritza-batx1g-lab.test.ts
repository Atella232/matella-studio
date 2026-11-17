import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { gizMoneyLabChallengeIds, gizMoneyLabToolForTopic, gizMoneyLabTools } from '../src/pages/batx1-gizarte-merkataritza/lab/labTools.ts'

import { doubleChallenges, doubleExtra, doublePrediction, exactYears, initialDoubleState, setDouble, yearsNeeded, type DoubleState } from '../src/pages/batx1-gizarte-merkataritza/lab/double.ts'
import { annuityOf, bestPayment, finalDebt, initialTableState, setTable, TABLE_LOANS, tableChallenges, tableExtra, tablePrediction, tableRows, type TableState } from '../src/pages/batx1-gizarte-merkataritza/lab/table.ts'
import { initialTaeState, setTae, stateTae, taeChallenges, taeExtra, taeOf, taePrediction, type TaeState } from '../src/pages/batx1-gizarte-merkataritza/lab/tae.ts'

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

test('merkataritza batx1 g lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(gizMoneyLabTools.length, 8)
    for (const stage of ['percent', 'interest', 'tae', 'loans']) assert.ok(gizMoneyLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of gizMoneyLabTools) for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    for (const tool of gizMoneyLabTools.filter((item) => ['double', 'tae', 'table'].includes(item.id))) for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
    assert.equal(new Set(gizMoneyLabChallengeIds).size, gizMoneyLabChallengeIds.length)
    for (const id of [...doubleChallenges, ...taeChallenges, ...tableChallenges].map((challenge) => challenge.id)) assert.ok(id >= 131101 && id <= 131399, `${id}`)
    const topics = ['index', 'chained', 'percent-inverse', 'compound-interest', 'periods', 'interest-time', 'tae', 'tae-costs', 'geometric', 'geometric-sum', 'pension', 'loan-payment', 'amortization-table', 'pending-debt']
    for (const topic of Object.keys(gizMoneyLabToolForTopic)) assert.ok(topics.includes(topic), topic)
    for (const tool of gizMoneyLabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
    for (const tool of Object.values(gizMoneyLabToolForTopic)) assert.ok(gizMoneyLabTools.some((item) => item.id === tool), `${tool}`)
})

test('merkataritza batx1 g lab: cuándo se duplica', () => {
    const at = (patch: Partial<DoubleState>) => setDouble(initialDoubleState, patch)
    assert.ok(Math.abs(exactYears(at({ rate: 5, goal: 'double' })) - Math.log(2) / Math.log(1.05)) < 1e-12)
    assert.equal(yearsNeeded(at({ rate: 5, goal: 'double' })), 15)
    assert.equal(yearsNeeded(at({ rate: 6, goal: 'double' })), 12)
    assert.equal(yearsNeeded(at({ rate: 8, goal: 'triple' })), 15)
    assert.equal(yearsNeeded(at({ rate: 7, goal: 'triple' })), 17)
    assert.equal(yearsNeeded(at({ rate: 6, goal: 'half' })), 7)
    // Whole years: the capital reaches the goal in that year and not the one before
    for (let rate = 1; rate <= 12; rate++) for (const goal of ['half', 'double', 'triple'] as const) {
        const years = yearsNeeded({ rate, goal })
        const factor = { half: 1.5, double: 2, triple: 3 }[goal]
        assert.ok((1 + rate / 100) ** years >= factor - 1e-9 && (1 + rate / 100) ** (years - 1) < factor, `${rate} ${goal}`)
    }
    assert.equal(doublePrediction(at({ rate: 12 })), '<')
    assert.equal(doublePrediction(at({ rate: 2 })), '>')
    assert.equal(at({ rate: 40 }).rate, 12)
    checkChallenges(doubleChallenges, initialDoubleState, {
        131101: at({ rate: 9 }),
        131102: at({ rate: 6 }),
        131103: at({ rate: 8, goal: 'triple' }),
        131104: at({ rate: 3, goal: 'triple' }),
        131105: at({ rate: 6, goal: 'half' })
    })
    checkExtras(doubleExtra, initialDoubleState, (state) => setDouble(state, {}))
})

test('merkataritza batx1 g lab: el cuadro de amortización', () => {
    const at = (patch: Partial<TableState>) => setTable(initialTableState, patch)
    assert.deepEqual(TABLE_LOANS.map(bestPayment), [2800, 2300, 4500])
    assert.ok(Math.abs(annuityOf(TABLE_LOANS[0]) - 2820.12) < 0.01)
    // The table: the first year of 10 000 at 5 % paying 2800
    const rows = tableRows(at({ payment: 2800 }))
    assert.equal(rows.length, 4)
    assert.deepEqual([rows[0].interest, rows[0].repaid, rows[0].left], [500, 2300, 7700])
    for (const row of rows) assert.ok(Math.abs(row.debt - row.repaid - row.left) < 0.011)
    // With the exact annuity the debt would end at zero; to the hundred, close to it
    assert.ok(Math.abs(finalDebt(at({ payment: 2800 }))) < 100)
    assert.equal(tablePrediction(at({ payment: 2800 })), '=')
    assert.equal(tablePrediction(at({ payment: 2000 })), '>')
    assert.ok(finalDebt(at({ payment: 2000 })) > 0)
    assert.equal(tablePrediction(at({ payment: 3500 })), '<')
    assert.ok(finalDebt(at({ payment: 3500 })) < 0)
    assert.equal(at({ payment: 2345 }).payment, 2300)
    assert.equal(at({ payment: 100 }).payment, 500)
    checkChallenges(tableChallenges, initialTableState, {
        131201: at({ payment: 2800 }),
        131202: at({ loan: 1, payment: 2300 }),
        131203: at({ loan: 2, payment: 4500 }),
        131204: at({ payment: 2600 }),
        131205: at({ loan: 2, payment: 1600 })
    })
    checkExtras(tableExtra, initialTableState, (state) => setTable(state, {}))
})

test('merkataritza batx1 g lab: la TAE crece', () => {
    const at = (patch: Partial<TaeState>) => setTae(initialTaeState, patch)
    assert.ok(Math.abs(taeOf(6, 12) - 0.0616778) < 1e-6)
    assert.ok(Math.abs(taeOf(12, 4) - 0.1255088) < 1e-6)
    assert.ok(Math.abs(taeOf(7, 1) - 0.07) < 1e-12)
    // More periods, a higher APR
    for (let rate = 1; rate <= 12; rate++) for (const [a, b] of [[1, 2], [2, 4], [4, 12], [12, 365]]) assert.ok(taeOf(rate, b) > taeOf(rate, a), `${rate} ${a} ${b}`)
    assert.equal(taePrediction(at({ rate: 6, periods: 12 })), '<')
    assert.equal(taePrediction(at({ rate: 12, periods: 12 })), '>')
    assert.equal(taePrediction(at({ rate: 12, periods: 1 })), '<')
    assert.ok(stateTae(at({ rate: 9 })) > 0.09 && stateTae(at({ rate: 8 })) < 0.09)
    checkChallenges(taeChallenges, initialTaeState, {
        131301: at({ rate: 10, periods: 2 }),
        131302: at({ rate: 9, periods: 12 }),
        131303: at({ periods: 1 }),
        131304: at({ rate: 12, periods: 4 }),
        131305: at({ rate: 6, periods: 4 })
    })
    checkExtras(taeExtra, initialTaeState, (state) => setTae(state, {}))
})
