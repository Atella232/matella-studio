import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { DATA_CARDS, DATA_SETUP, dataChallenges, dataExtra, dataPrediction, fits, fittingK, initialDataState, modelOf, setData, type DataState } from '../src/pages/batx2-gizarte-adierazpena/lab/fromData.ts'
import { bach2gSketchLabChallengeIds, bach2gSketchLabToolForTopic, bach2gSketchLabTools } from '../src/pages/batx2-gizarte-adierazpena/lab/labTools.ts'
import { asymptoteAt, gapLatex, gapOf, initialObliqueState, OBLIQUE_CURVES, OBLIQUE_SETUP, obliqueChallenges, obliqueExtra, obliqueF, obliquePrediction, setOblique, X0S, type ObliqueState } from '../src/pages/batx2-gizarte-adierazpena/lab/oblique.ts'

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

function checkChallenges<State>(challenges: LabChallenge<State>[], initial: State, solutions: Record<number, State>) {
    assert.equal(new Set(challenges.map((challenge) => challenge.id)).size, challenges.length)
    for (const challenge of challenges) {
        assert.ok(solutions[challenge.id], `${challenge.id} has no solution in the test`)
        assert.ok(challenge.isSolved(solutions[challenge.id]), `${challenge.id} is not solved by its solution`)
        assert.ok(!challenge.isSolved(initial), `${challenge.id} starts solved`)
    }
    checkTexts(challenges.flatMap((challenge) => [challenge.prompt, challenge.hint]))
}

function checkExtras<State>(maker: LabChallengeMaker<State>, initial: State, setter: (state: State) => State, minimum = 6) {
    const prompts = new Set<string>()
    for (let seed = 1; seed <= 150; seed += 1) {
        const challenge = maker(createRandom(seed * 7919 + 3))
        assert.ok(challenge.isSolved(challenge.solution), `seed ${seed}: ${challenge.prompt.es}`)
        assert.deepEqual(setter(challenge.solution), challenge.solution, `seed ${seed}: unreachable ${challenge.prompt.es}`)
        assert.ok(!challenge.isSolved(initial), `seed ${seed} starts solved`)
        checkTexts([challenge.prompt, challenge.hint])
        prompts.add(challenge.prompt.es)
    }
    assert.ok(prompts.size >= minimum, `only ${prompts.size} different challenges`)
}

const own = [...obliqueChallenges, ...dataChallenges]

test('adierazpena batx2 g lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(bach2gSketchLabTools.length, 5)
    for (const stage of ['asymptotes', 'derivatives', 'graphs', 'reading']) assert.ok(bach2gSketchLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of bach2gSketchLabTools) for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    const ids = new Set(bach2gSketchLabTools.map((tool) => tool.id))
    for (const tool of Object.values(bach2gSketchLabToolForTopic)) assert.ok(tool && ids.has(tool), tool)
    assert.equal(new Set(bach2gSketchLabChallengeIds).size, bach2gSketchLabChallengeIds.length)
    for (const challenge of own) assert.ok(challenge.id >= 148101 && challenge.id <= 148399, `${challenge.id}`)
})

test('adierazpena batx2 g lab: the division gives the oblique', () => {
    for (const curve of OBLIQUE_CURVES) {
        const { latex, division } = OBLIQUE_SETUP[curve]
        katex.renderToString(`${latex}=${division}`, { throwOnError: true })
        for (let step = 0; step < X0S.length; step++) {
            const x = X0S[step]
            assert.ok(Math.abs(obliqueF(curve, x) - asymptoteAt(curve, x) - gapOf({ curve, step })) < 1e-9, curve)
            katex.renderToString(gapLatex({ curve, step }), { throwOnError: true })
        }
        // The gap shrinks as x₀ grows, and its sign is the prediction
        const gaps = X0S.map((_, step) => gapOf({ curve, step }))
        for (let i = 1; i < gaps.length; i++) assert.ok(Math.abs(gaps[i]) <= Math.abs(gaps[i - 1]), curve)
        const sign = Math.sign(gaps[0])
        assert.equal(obliquePrediction({ curve }), sign === 0 ? '=' : sign < 0 ? '<' : '>')
    }
    // The fractions really divide to what the readout says
    const fractions: Record<string, (x: number) => number> = { o1: (x) => (x * x + 4) / x, o2: (x) => (x * x - 3 * x) / (x - 1), o3: (x) => (x * x - 4) / (x - 2) }
    for (const curve of OBLIQUE_CURVES) for (const x of [3.5, 5, 9]) assert.ok(Math.abs(fractions[curve](x) - obliqueF(curve, x)) < 1e-9, curve)
    const at = (curve: ObliqueState['curve'], x: number): ObliqueState => ({ curve, step: X0S.indexOf(x), prediction: null })
    checkChallenges(obliqueChallenges, initialObliqueState, { 148101: at('o1', 4), 148102: at('o2', 3), 148103: at('o1', 5), 148104: at('o3', 3), 148105: at('o2', 7) })
    checkExtras(obliqueExtra, initialObliqueState, (state) => setOblique(state, {}), 5)
})

test('adierazpena batx2 g lab: one model meets each data card', () => {
    for (const card of DATA_CARDS) {
        const { a, b, point } = DATA_SETUP[card]
        const k = fittingK(card)
        assert.ok(k !== 0 && Math.abs(k) <= 4, card)
        const state: DataState = { card, a, b, k, prediction: null }
        assert.ok(fits(state), card)
        assert.ok(Math.abs(modelOf(state)(point[0]) - point[1]) < 1e-9, card)
        let count = 0
        for (let aa = -4; aa <= 4; aa++) for (let bb = -4; bb <= 4; bb++) for (let kk = -4; kk <= 4; kk++) if (kk !== 0 && fits({ card, a: aa, b: bb, k: kk, prediction: null })) count++
        assert.equal(count, 1, card)
    }
    assert.deepEqual(DATA_CARDS.map((card) => dataPrediction({ card })), ['<', '=', '>'])
    assert.equal(setData(initialDataState, { k: 0 }).k, -1)
    const at = (card: DataState['card'], a: number, b: number, k: number): DataState => ({ card, a, b, k, prediction: null })
    checkChallenges(dataChallenges, initialDataState, { 148201: at('d1', 2, 1, 3), 148202: at('d2', -1, 2, -2), 148203: at('d3', 1, -1, -2), 148204: at('d2', -1, 2, -4), 148205: at('d3', 1, -1, -1) })
    assert.ok(Math.abs(modelOf({ a: -1, b: 2, k: -4 })(1)) < 1e-9 && Math.abs(modelOf({ a: 1, b: -1, k: -1 })(0)) < 1e-9)
    checkExtras(dataExtra, initialDataState, (state) => setData(state, {}))
})
