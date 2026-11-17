import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { gizRealsLabChallengeIds, gizRealsLabToolForTopic, gizRealsLabTools } from '../src/pages/batx1-gizarte-errealak/lab/labTools.ts'
import { absoluteErrors, initialWeightState, relativeErrors, setWeight, WEIGHT_PAIRS, weightChallenges, weightExtra, weightPrediction, type WeightState } from '../src/pages/batx1-gizarte-errealak/lab/weight.ts'
import { digitsChallenges, digitsExtra, digitsOf, digitsPrediction, fullLatex, initialDigitsState, logOf, setDigits, type DigitsState } from '../src/pages/batx1-gizarte-errealak/lab/digits.ts'
import { COMMA_FIGURES, commaChallenges, commaExtra, commaPrediction, initialCommaState, mantissaLatex, mantissaText, scientificExponent, setComma, type CommaState } from '../src/pages/batx1-gizarte-errealak/lab/comma.ts'

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

test('errealak batx1 g lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(gizRealsLabTools.length, 10)
    for (const stage of ['line', 'radicals', 'logs', 'errors']) assert.ok(gizRealsLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of gizRealsLabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    }
    // The «Observe» text of the tools of this unit is plain text, not LaTeX
    for (const tool of gizRealsLabTools.filter((item) => ['weight', 'digits', 'comma'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
    }
    assert.equal(new Set(gizRealsLabChallengeIds).size, gizRealsLabChallengeIds.length)
    // The three tools of this unit use its own block; the borrowed ones keep their ids
    for (const id of [...weightChallenges, ...digitsChallenges, ...commaChallenges].map((challenge) => challenge.id)) assert.ok(id >= 130101 && id <= 130399, `${id}`)
    const topics = ['sets', 'number-kinds', 'set-language', 'interval-sets', 'absolute-value', 'neighbourhoods', 'radical-power', 'radical-ops', 'rationalize', 'logarithms', 'log-integer', 'log-unknown', 'significant', 'relative', 'big-numbers', 'scientific-errors']
    for (const topic of Object.keys(gizRealsLabToolForTopic)) assert.ok(topics.includes(topic), topic)
    for (const tool of gizRealsLabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
    for (const tool of Object.values(gizRealsLabToolForTopic)) assert.ok(gizRealsLabTools.some((item) => item.id === tool), `${tool}`)
})

test('errealak batx1 g lab: el mismo error, distinto peso', () => {
    const at = (patch: Partial<WeightState>) => setWeight(initialWeightState, patch)
    // 300 € of 30 000 and 0,03 € of 1,50 are both 1 % and 2 %
    assert.deepEqual(absoluteErrors(at({ pair: 0, big: 3, small: 3 })), { big: 300, small: 0.03 })
    assert.ok(Math.abs(relativeErrors(at({ pair: 0, big: 3 })).big - 0.01) < 1e-12)
    assert.equal(weightPrediction(at({ pair: 0, big: 10, small: 5 })), '=')
    assert.equal(weightPrediction(at({ pair: 0, big: 1, small: 1 })), '<')
    assert.equal(weightPrediction(at({ pair: 0, big: 30, small: 1 })), '>')
    // Every pair has states of equal weight, and a change resets the prediction
    for (const [pair, small, big] of [[0, 1, 2], [1, 2, 5], [2, 3, 5]]) assert.equal(weightPrediction(at({ pair, small, big })), '=', `${pair}`)
    assert.equal(setWeight({ ...initialWeightState, prediction: '<' }, { big: 2 }).prediction, null)
    assert.equal(setWeight({ ...initialWeightState, prediction: '<' }, {}).prediction, '<')
    assert.equal(at({ big: 99 }).big, 30)
    // The whole bar is 26 % of the value: no relative error goes past it
    for (let pair = 0; pair < WEIGHT_PAIRS.length; pair++) {
        const most = relativeErrors(at({ pair, big: 30, small: 30 }))
        assert.ok(most.big <= 0.26 && most.small <= 0.26, `${pair}`)
    }
    checkChallenges(weightChallenges, initialWeightState, {
        130101: at({ pair: 0, big: 3 }),
        130102: at({ pair: 0, small: 5, big: 10 }),
        130103: at({ pair: 1, big: 10, small: 4 }),
        130104: at({ pair: 2, small: 3, big: 5 }),
        130105: at({ pair: 1, big: 1, small: 4 })
    })
    for (const challenge of weightChallenges.slice(1, 4)) assert.ok(challenge.prompt.es.includes('pesa lo mismo'))
    checkExtras(weightExtra, initialWeightState, (state) => setWeight(state, {}))
    for (let seed = 1; seed <= 40; seed++) assert.equal(weightPrediction(weightExtra(createRandom(seed)).solution), '=')
})

test('errealak batx1 g lab: ¿cuántas cifras tiene?', () => {
    const at = (patch: Partial<DigitsState>) => setDigits(initialDigitsState, patch)
    assert.equal(fullLatex(at({ tenths: 34, exponent: 5 })), '340\\,000')
    assert.equal(fullLatex(at({ tenths: 20, exponent: 2 })), '200')
    assert.equal(fullLatex(at({ tenths: 34, exponent: 0 })), '3{,}4')
    assert.equal(fullLatex(at({ tenths: 50, exponent: -2 })), '0{,}05')
    assert.equal(fullLatex(at({ tenths: 11, exponent: -1 })), '0{,}11')
    assert.equal(fullLatex(at({ tenths: 75, exponent: 3 })), '7500')
    assert.equal(digitsOf(at({ tenths: 34, exponent: 5 })), 6)
    assert.equal(digitsOf(at({ tenths: 34, exponent: -1 })), 0)
    assert.ok(Math.abs(logOf(at({ tenths: 34, exponent: 5 })) - Math.log10(340000)) < 1e-12)
    // The middle of a step is 3,16, not 5
    assert.equal(digitsPrediction(at({ tenths: 30, exponent: 4 })), '<')
    assert.equal(digitsPrediction(at({ tenths: 50, exponent: 4 })), '>')
    assert.equal(at({ exponent: 20 }).exponent, 9)
    checkChallenges(digitsChallenges, initialDigitsState, {
        130201: at({ tenths: 25, exponent: 5 }),
        130202: at({ tenths: 34, exponent: 5 }),
        130203: at({ tenths: 32, exponent: 4 }),
        130204: at({ tenths: 50, exponent: -2 }),
        130205: at({ tenths: 79, exponent: 7 })
    })
    checkExtras(digitsExtra, initialDigitsState, (state) => setDigits(state, {}))
    // Each endless challenge writes N in full, and its hint gives back the same number
    for (let seed = 1; seed <= 60; seed++) {
        const { solution, hint } = digitsExtra(createRandom(seed))
        const [full, scientific] = hint.es.replace(/\$/g, '').split('=')
        const value = Number(full.replace(/\\,/g, '').replace('{,}', '.'))
        const [mantissa, power] = scientific.split('\\cdot 10^')
        assert.ok(Math.abs(value - Number(mantissa.replace('{,}', '.')) * 10 ** Number(power.replace(/[{}]/g, ''))) < 1e-9 * Math.max(1, value), hint.es)
        assert.ok(Math.abs(value - (solution.tenths / 10) * 10 ** solution.exponent) < 1e-9 * Math.max(1, value), hint.es)
    }
})

test('errealak batx1 g lab: la coma viajera', () => {
    const at = (patch: Partial<CommaState>) => setComma(initialCommaState, patch)
    // Each figure starts as it is written: 453·10¹¹, 0,85·10¹², 2840000·10⁰, 0,0037·10⁰, 12,6·10⁵
    assert.deepEqual(COMMA_FIGURES.map((_, figure) => `${mantissaText(at({ figure }))}e${at({ figure }).exponent}`), ['453e11', '0,85e12', '2840000e0', '0,0037e0', '12,6e5'])
    assert.deepEqual(COMMA_FIGURES.map(scientificExponent), [13, 11, 6, -3, 6])
    // The value never changes when the point travels
    for (let figure = 0; figure < COMMA_FIGURES.length; figure++) {
        const start = at({ figure })
        const value = Number(mantissaText(start).replace(',', '.')) * 10 ** start.exponent
        for (let shift = -6; shift <= 6; shift++) {
            const moved = setComma(start, { exponent: scientificExponent(COMMA_FIGURES[figure]) + shift })
            const now = Number(mantissaText(moved).replace(',', '.')) * 10 ** moved.exponent
            assert.ok(Math.abs(now - value) < 1e-9 * value, `${figure} ${shift}: ${mantissaText(moved)}`)
        }
    }
    assert.equal(mantissaLatex(at({ figure: 2 })), '2\\,840\\,000')
    assert.equal(mantissaText(setComma(at({ figure: 0 }), { exponent: 13 })), '4,53')
    assert.equal(commaPrediction(at({ figure: 0 })), '>')
    assert.equal(commaPrediction(at({ figure: 1 })), '<')
    assert.equal(commaPrediction(setComma(at({ figure: 4 }), { exponent: 6 })), '=')
    // A new figure starts with its own exponent; a change resets the prediction
    assert.equal(setComma({ ...initialCommaState, exponent: 13 }, { figure: 3 }).exponent, 0)
    assert.equal(setComma({ ...initialCommaState, prediction: '>' }, { exponent: 12 }).prediction, null)
    checkChallenges(commaChallenges, initialCommaState, {
        130301: setComma(at({ figure: 0 }), { exponent: 13 }),
        130302: setComma(at({ figure: 1 }), { exponent: 11 }),
        130303: setComma(at({ figure: 3 }), { exponent: -3 }),
        130304: setComma(at({ figure: 2 }), { exponent: 5 }),
        130305: setComma(at({ figure: 4 }), { exponent: 4 })
    })
    assert.equal(mantissaText(setComma(at({ figure: 2 }), { exponent: 5 })), '28,4')
    checkExtras(commaExtra, initialCommaState, (state) => setComma(state, {}))
})
