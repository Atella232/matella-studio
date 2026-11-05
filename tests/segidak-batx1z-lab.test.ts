import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { E_PAYMENTS, eLimit, eMachineChallenges, eMachineExtra, eMachinePrediction, eMark, eValue, initialEMachineState, setEMachine, type EMachineState } from '../src/pages/batx1-zientziak-segidak/lab/eMachine.ts'
import { fibChallenges, fibExtra, fibPrediction, fibRatio, fibRatios, fibTerm, fibTerms, initialFibState, PHI, setFib, type FibState } from '../src/pages/batx1-zientziak-segidak/lab/fibonacci.ts'
import { BAND_EPSILONS, BAND_SEQUENCES, firstInside, initialLimitBandState, insideBand, limitBandChallenges, limitBandExtra, limitBandPrediction, setLimitBand, type LimitBandState } from '../src/pages/batx1-zientziak-segidak/lab/limitBand.ts'
import { bachSequencesLabChallengeIds, bachSequencesLabToolForTopic, bachSequencesLabTools } from '../src/pages/batx1-zientziak-segidak/lab/labTools.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        // No Basque suffix glued to a number or to a formula
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/\$(?:ri|ren|rekin|z|ra|tik|ei)(?![a-zA-Z])/.test(text.eu), text.eu)
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

test('segidak batx1 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(bachSequencesLabTools.length, 8)
    const stages = ['sequences', 'progressions', 'infinite-sums', 'limits', 'number-e']
    for (const stage of stages) assert.ok(bachSequencesLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of bachSequencesLabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    }
    // The «Observe» text of the tools of this unit is plain text, not LaTeX
    for (const tool of bachSequencesLabTools.filter((item) => ['fibonacci', 'limit-band', 'e-machine'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
    }
    assert.equal(new Set(bachSequencesLabChallengeIds).size, bachSequencesLabChallengeIds.length)
    // The three tools of this unit use the 100xxx block; the borrowed ones keep their 3. DBH ids
    const own = [...fibChallenges, ...limitBandChallenges, ...eMachineChallenges].map((challenge) => challenge.id)
    for (const id of own) assert.ok(id >= 100101 && id <= 100399, `${id}`)
    const topics = ['terms', 'fibonacci', 'monotony', 'arithmetic', 'geometric', 'progression-problems', 'geometric-series', 'periodic-decimals', 'squares-sum', 'converge', 'from-term', 'infinite-limits', 'quotient-limits', 'e-number', 'continuous-growth']
    for (const [topic, tool] of Object.entries(bachSequencesLabToolForTopic)) {
        assert.ok(topics.includes(topic), topic)
        assert.ok(bachSequencesLabTools.some((item) => item.id === tool), `${topic} → ${tool}`)
    }
    for (const tool of bachSequencesLabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
})

test('segidak batx1 z lab: Fibonacci y el número de oro', () => {
    const at = (patch: Partial<FibState>) => setFib(initialFibState, patch)
    assert.deepEqual(fibTerms(at({ a1: 1, a2: 1 }), 8), [1, 1, 2, 3, 5, 8, 13, 21])
    assert.equal(fibTerm(at({ a1: 2, a2: 7 }), 5), 2 * 2 + 3 * 7)
    assert.equal(fibRatio(at({ n: 6 })), 8 / 5)
    // The quotients jump above and below φ, closer each time, and are never φ
    for (const start of [{ a1: 1, a2: 1 }, { a1: 2, a2: 7 }, { a1: 9, a2: 1 }]) {
        const ratios = fibRatios(at({ ...start, n: 12 }))
        for (let i = 3; i < ratios.length; i += 1) {
            assert.ok(Math.abs(ratios[i] - PHI) < Math.abs(ratios[i - 1] - PHI), `${JSON.stringify(start)} ${i}`)
            assert.notEqual(Math.sign(ratios[i] - PHI), Math.sign(ratios[i - 1] - PHI))
        }
        assert.ok(ratios.every((ratio) => ratio !== PHI))
    }
    assert.equal(fibPrediction(at({ n: 5 })), '>')
    assert.equal(fibPrediction(at({ n: 6 })), '<')
    // A new setting asks for a new prediction; the same one keeps it
    const predicted = { ...initialFibState, prediction: '>' as const }
    assert.equal(setFib(predicted, { n: 7 }).prediction, null)
    assert.equal(setFib(predicted, { n: initialFibState.n }).prediction, '>')
    assert.equal(at({ a1: 99, n: 0 }).a1, 9)
    assert.equal(at({ n: 0 }).n, 3)
    // 100103: n = 10 is the first within 0,001 of φ; 100105: n = 6 is the first below φ within 0,05
    assert.ok(Math.abs(fibRatio(at({ n: 9 })) - PHI) > 0.001 && Math.abs(fibRatio(at({ n: 10 })) - PHI) < 0.001)
    for (let n = 3; n < 6; n += 1) assert.ok(!(fibRatio(at({ n })) < PHI && PHI - fibRatio(at({ n })) < 0.05), `${n}`)
    checkChallenges(fibChallenges, initialFibState, {
        100101: at({ n: 8 }),
        100102: at({ a1: 4, a2: 1, n: 5 }),
        100103: at({ n: 10 }),
        100104: at({ a1: 2, a2: 7, n: 12 }),
        100105: at({ n: 6 })
    })
    checkExtras(fibExtra, initialFibState, (state) => setFib(state, state))
})

test('segidak batx1 z lab: la banda del límite', () => {
    const at = (patch: Partial<LimitBandState>) => setLimitBand(initialLimitBandState, patch)
    // |aₙ − L| written exactly agrees with the terms
    for (const [index, sequence] of BAND_SEQUENCES.entries()) {
        for (let n = 1; n <= 100; n += 1) assert.ok(Math.abs(Math.abs(sequence.term(n) - sequence.limit) - sequence.gap(n)) < 1e-12, `${index} ${n}`)
    }
    assert.deepEqual(BAND_EPSILONS.map((_, epsilon) => firstInside(0, epsilon)), [3, 5, 11, 21])
    assert.deepEqual(BAND_EPSILONS.map((_, epsilon) => firstInside(1, epsilon)), [8, 16, 40, 80])
    assert.deepEqual(BAND_EPSILONS.map((_, epsilon) => firstInside(2, epsilon)), [3, 5, 11, 21])
    // From the first one on, all inside; the one before, outside
    for (let sequence = 0; sequence < BAND_SEQUENCES.length; sequence += 1) {
        for (let epsilon = 0; epsilon < BAND_EPSILONS.length; epsilon += 1) {
            const first = firstInside(sequence, epsilon)
            assert.ok(first <= 100)
            for (let n = first; n <= 100; n += 1) assert.ok(insideBand(sequence, epsilon, n))
            if (first > 1) assert.ok(!insideBand(sequence, epsilon, first - 1))
        }
    }
    assert.equal(limitBandPrediction(at({ epsilon: 2, from: 10 })), '<')
    assert.equal(limitBandPrediction(at({ epsilon: 2, from: 11 })), '=')
    assert.equal(limitBandPrediction(at({ epsilon: 2, from: 30 })), '>')
    const predicted = { ...initialLimitBandState, prediction: '<' as const }
    assert.equal(setLimitBand(predicted, { from: 2 }).prediction, null)
    assert.equal(setLimitBand(predicted, { from: 1 }).prediction, '<')
    assert.equal(at({ from: 500 }).from, 100)
    checkChallenges(limitBandChallenges, initialLimitBandState, {
        100201: at({ sequence: 0, epsilon: 2, from: 11 }),
        100202: at({ sequence: 1, epsilon: 0, from: 8 }),
        100203: at({ sequence: 2, epsilon: 1, from: 5 }),
        100204: at({ sequence: 0, epsilon: 3, from: 21 }),
        100205: at({ sequence: 1, epsilon: 2, from: 40 })
    })
    checkExtras(limitBandExtra, initialLimitBandState, (state) => setLimitBand(state, state))
})

test('segidak batx1 z lab: la máquina de e', () => {
    const at = (patch: Partial<EMachineState>) => setEMachine(initialEMachineState, patch)
    assert.equal(eValue(at({ rate: 0, payments: 0 })), 2)
    assert.equal(eValue(at({ rate: 0, payments: 1 })), 2.25)
    // More payments, more money, but never eᵏ
    for (let rate = 0; rate < 3; rate += 1) {
        for (let payments = 1; payments < E_PAYMENTS.length; payments += 1) {
            assert.ok(eValue(at({ rate, payments })) > eValue(at({ rate, payments: payments - 1 })), `${rate} ${payments}`)
            assert.ok(eValue(at({ rate, payments })) < eLimit(rate), `${rate} ${payments}`)
        }
    }
    assert.deepEqual([0, 1, 2].map(eMark), [2.7, 7.3, 20])
    assert.equal(eMachinePrediction(at({ rate: 0, payments: 4 })), '<')
    assert.equal(eMachinePrediction(at({ rate: 0, payments: 5 })), '>')
    assert.equal(eMachinePrediction(at({ rate: 2, payments: 6 })), '<')
    // The smallest n of 100301, 100302 and 100305
    const smallest = (rate: number, threshold: number) => E_PAYMENTS.findIndex((_, payments) => eValue(at({ rate, payments })) > threshold)
    assert.equal(smallest(0, 2.7), 5)
    assert.equal(smallest(1, 7), 4)
    assert.equal(smallest(2, 14), 3)
    const predicted = { ...initialEMachineState, prediction: '<' as const }
    assert.equal(setEMachine(predicted, { payments: 3 }).prediction, null)
    assert.equal(setEMachine(predicted, { payments: initialEMachineState.payments }).prediction, '<')
    assert.equal(at({ payments: 40 }).payments, 6)
    checkChallenges(eMachineChallenges, initialEMachineState, {
        100301: at({ rate: 0, payments: 5 }),
        100302: at({ rate: 1, payments: 4 }),
        100303: at({ rate: 0, payments: 0 }),
        100304: at({ rate: 2, payments: 6 }),
        100305: at({ rate: 2, payments: 3 })
    })
    // Each endless mark falls between two payments of the list, so its answer is the smallest
    for (let seed = 1; seed <= 60; seed += 1) {
        const challenge = eMachineExtra(createRandom(seed * 104729 + 11))
        const { rate, payments } = challenge.solution
        const threshold = Number(challenge.prompt.es.match(/>([\d{},]+)\$/)![1].replace('{,}', '.'))
        assert.ok(eValue(at({ rate, payments: payments - 1 })) < threshold && threshold < eValue(at({ rate, payments })), `seed ${seed}: ${challenge.prompt.es}`)
    }
    checkExtras(eMachineExtra, initialEMachineState, (state) => setEMachine(state, state))
})
