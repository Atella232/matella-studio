import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { APPROX_CASES, approxChallenges, approxExtra, approxOf, approxPrediction, approxWindow, edgesOf, exactOf, initialApproxState, setApprox, type ApproxState } from '../src/pages/batx2-zientziak-banaketak/lab/approx.ts'
import { areaOf, bellChallenges, bellExtra, bellPrediction, bellRange, initialBellState, setBell, zOf, type BellState } from '../src/pages/batx2-zientziak-banaketak/lab/bell.ts'
import { buildChallenges, buildExtra, buildPrediction, initialBuildState, isDistribution, meanTenths, setBar, totalOf, varianceHundredths, type BuildState } from '../src/pages/batx2-zientziak-banaketak/lab/build.ts'
import { distributionsBatx2LabChallengeIds, distributionsBatx2LabToolForTopic, distributionsBatx2LabTools } from '../src/pages/batx2-zientziak-banaketak/lab/labTools.ts'
import { initialLookupState, lookupChallenges, lookupExtra, lookupFor, lookupPrediction, lookupValue, setLookup, zHundredthsOf, type LookupState } from '../src/pages/batx2-zientziak-banaketak/lab/lookup.ts'
import { barsOf, initialMachineState, machineChallenges, machineExtra, machineMean, machinePrediction, machineVariance, paintedOf, setMachine, type MachineState } from '../src/pages/batx2-zientziak-banaketak/lab/machine.ts'
import { distributionsBatx2LessonChecks } from '../src/pages/batx2-zientziak-banaketak/lessonChecks.ts'
import { above, below, tableValue } from '../src/pages/batx2-zientziak-banaketak/normal.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        // The same formulas in the four languages
        const formulas = (value: string) => [...value.matchAll(/\$([^$]+)\$/g)].map((match) => match[1].replace(/\{,\}/g, '.')).sort()
        for (const language of ['eu', 'en', 'ar'] as const) assert.deepEqual(formulas(text[language]), formulas(text.es), `${language}: ${text[language]}`)
        // No Basque suffix glued to a number or to a formula
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/§(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '§')), text.eu)
        // Decimals in the words: a comma in Basque and Spanish, a point in English and Arabic
        const words = (value: string) => value.replace(/\$[^$]+\$/g, ' ')
        assert.ok(!/\d\.\d/.test(words(text.es)) && !/\d\.\d/.test(words(text.eu)), text.es)
        assert.ok(!/\d,\d/.test(words(text.en)) && !/\d,\d/.test(words(text.ar)), text.en)
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

/** The endless challenges: well formed, solvable by their own solution, reachable, never solved at the start */
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
    assert.ok(prompts.size >= 10, `only ${prompts.size} different challenges`)
}

test('banaketak batx2 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(distributionsBatx2LabTools.length, 7)
    for (const stage of ['review', 'discrete', 'binomial', 'normal', 'approximation']) assert.ok(distributionsBatx2LabTools.some((tool) => tool.stage === stage), stage)
    const own = ['build', 'machine', 'bell', 'lookup', 'approx']
    for (const tool of distributionsBatx2LabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    }
    for (const tool of distributionsBatx2LabTools.filter((item) => own.includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
        assert.ok(!/\d[a-zñ]/.test(tool.observe.eu), tool.observe.eu)
        assert.ok(/[؀-ۿ]/.test(tool.observe.ar) && tool.observe.eu !== tool.observe.es, tool.id)
        assert.ok(!/\d,\d/.test(tool.observe.en) && !/\d,\d/.test(tool.observe.ar) && !/\d\.\d/.test(tool.observe.es), tool.id)
    }
    assert.equal(new Set(distributionsBatx2LabChallengeIds).size, distributionsBatx2LabChallengeIds.length)
    // The five tools of this unit use the 1291xx–1293xx block; the borrowed ones keep their ids
    for (const challenge of [...buildChallenges, ...machineChallenges, ...bellChallenges, ...lookupChallenges, ...approxChallenges]) assert.ok(challenge.id >= 129101 && challenge.id <= 129399, `${challenge.id}`)
    const topics = Object.keys(distributionsBatx2LessonChecks)
    assert.deepEqual(Object.keys(distributionsBatx2LabToolForTopic).sort(), [...topics].sort())
    for (const [topic, tool] of Object.entries(distributionsBatx2LabToolForTopic)) assert.ok(distributionsBatx2LabTools.some((item) => item.id === tool), `${topic} → ${tool}`)
    for (const tool of distributionsBatx2LabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
})

test('banaketak batx2 z lab: eraiki banaketa', () => {
    // μ and σ² of the starting bars, by hand: 0,3 0,3 0,2 0,1 0,1
    assert.equal(totalOf(initialBuildState), 10)
    assert.equal(meanTenths(initialBuildState), 14)
    assert.equal(varianceHundredths(initialBuildState), 164)
    assert.equal(buildPrediction(initialBuildState), '<')
    // Against the definitions, for every distribution with two values
    for (let x = 0; x <= 4; x += 1) {
        for (let y = x + 1; y <= 4; y += 1) {
            for (let share = 1; share <= 9; share += 1) {
                const bars = [0, 0, 0, 0, 0]
                bars[x] = share
                bars[y] = 10 - share
                const mean = (x * share + y * (10 - share)) / 10
                const variance = (x * x * share + y * y * (10 - share)) / 10 - mean * mean
                assert.ok(Math.abs(meanTenths({ bars }) - mean * 10) < 1e-9 && Math.abs(varianceHundredths({ bars }) - variance * 100) < 1e-6)
            }
        }
    }
    // A bar outside 0…1 is clamped; a change forgets the prediction
    assert.equal(setBar(initialBuildState, 0, 14).bars[0], 10)
    assert.equal(setBar({ ...initialBuildState, prediction: '<' }, 1, 5).prediction, null)
    assert.ok(!isDistribution(setBar(initialBuildState, 4, 2)))
    const made = (bars: number[]): BuildState => ({ bars, prediction: null })
    checkChallenges(buildChallenges, initialBuildState, { 129101: made([5, 0, 0, 0, 5]), 129102: made([0, 0, 5, 0, 5]), 129103: made([5, 0, 0, 0, 5]) })
    checkExtras(buildExtra, initialBuildState, (state) => state.bars.reduce((current, bar, index) => setBar(current, index, bar), state))
})

test('banaketak batx2 z lab: makina binomiala', () => {
    // The bars add up to 1; the painted part of the start is P(X ≥ 6) in B(10; 0,5)
    assert.ok(Math.abs(barsOf(initialMachineState).reduce((a, b) => a + b, 0) - 1) < 1e-12)
    assert.ok(Math.abs(paintedOf(initialMachineState) - 386 / 1024) < 1e-12)
    assert.equal(machinePrediction(initialMachineState), '<')
    assert.equal(machinePrediction(setMachine(initialMachineState, { n: 1, k: 1 })), '=')
    assert.deepEqual([machineMean(initialMachineState), machineVariance(initialMachineState)], [50, 250])
    // k never passes n
    assert.equal(setMachine(initialMachineState, { n: 4 }).k, 4)
    // The challenge of the smallest k: P(X ≥ 8) < 0,06 ≤ P(X ≥ 7)
    assert.ok(paintedOf({ n: 10, p: 5, k: 8, mode: 'atLeast' }) < 0.06 && paintedOf({ n: 10, p: 5, k: 7, mode: 'atLeast' }) >= 0.06)
    assert.ok(paintedOf({ n: 7, p: 5, k: 0, mode: 'eq' }) < 0.01 && paintedOf({ n: 6, p: 5, k: 0, mode: 'eq' }) >= 0.01)
    // μ and σ² fix n and p: no two binomials of the tool share them
    const seen = new Set<string>()
    for (let n = 1; n <= 20; n += 1) for (let p = 1; p <= 9; p += 1) {
        const key = `${machineMean({ n, p })}-${machineVariance({ n, p })}`
        assert.ok(!seen.has(key), key)
        seen.add(key)
    }
    const at = (n: number, p: number, k: number, mode: MachineState['mode']): MachineState => ({ n, p, k, mode, prediction: null })
    checkChallenges(machineChallenges, initialMachineState, { 129111: at(20, 3, 0, 'atLeast'), 129112: at(7, 5, 0, 'eq'), 129113: at(10, 5, 8, 'atLeast') })
    checkExtras(machineExtra, initialMachineState, (state) => setMachine(state, state))
})

test('banaketak batx2 z lab: kanpaiaren azpian', () => {
    // Every z of the tool has two decimals, and the area is the table's
    for (const sd of [2, 4, 5, 10]) {
        const state = setBell(initialBellState, { sd })
        const range = bellRange(state)
        for (let x = range.min; x <= range.max; x += sd === 10 ? 2 : 1) {
            const z = (x - state.mean) / sd
            assert.ok(Math.abs(z * 100 - Math.round(z * 100)) < 1e-9, `${x}`)
        }
    }
    assert.equal(areaOf({ mean: 50, sd: 10, a: 40, b: 60 }), 6826)
    assert.equal(areaOf(initialBellState), below(2) - below(-0.4))
    assert.equal(bellPrediction(initialBellState), '>')
    assert.equal(zOf({ mean: 60, sd: 4 }, 66), 1.5)
    // A new bell starts at μ ± σ; a and b keep their order and their grid
    assert.deepEqual(setBell(initialBellState, { mean: 60 }), { mean: 60, sd: 10, a: 50, b: 70, prediction: null })
    assert.equal(setBell(initialBellState, { a: 80 }).a, 70)
    assert.equal(setBell(initialBellState, { b: 47 }).b, 48)
    assert.equal(setBell(initialBellState, { b: 40 }).b, 46)
    assert.equal(setBell(initialBellState, { a: 45 }).a % 2, 0)
    const at = (mean: number, sd: number, a: number, b: number): BellState => ({ mean, sd, a, b, prediction: null })
    checkChallenges(bellChallenges, initialBellState, { 129121: at(50, 10, 40, 60), 129122: at(60, 4, 60, 66), 129123: at(40, 5, 30, 50) })
    checkExtras(bellExtra, initialBellState, (state) => setBell(state, { a: state.a, b: state.b }))
    // The b of an endless challenge is the only one with that area
    for (let seed = 1; seed <= 60; seed += 1) {
        const challenge = bellExtra(createRandom(seed * 104_729 + 11))
        const { solution } = challenge
        const range = bellRange(solution)
        const step = solution.sd === 10 ? 2 : 1
        let found = 0
        for (let b = solution.a; b <= range.max; b += step) if (challenge.isSolved({ ...solution, b })) found += 1
        assert.equal(found, 1, challenge.prompt.es)
    }
})

test('banaketak batx2 z lab: normalaren taula', () => {
    assert.equal(lookupValue(initialLookupState), 8413)
    assert.equal(lookupPrediction(initialLookupState), '>')
    // Symmetry: below −z is above z
    for (let size = 0; size <= 299; size += 7) {
        const negative = lookupFor(-size, 'below')
        assert.equal(lookupValue(negative), above(size / 100))
        assert.equal(lookupValue(lookupFor(size, 'above')), 10_000 - tableValue(size / 100))
    }
    assert.equal(zHundredthsOf(setLookup(initialLookupState, { row: 12, column: 5, negative: true })), -125)
    assert.equal(setLookup(initialLookupState, { row: 99 }).row, 29)
    // Up to 2,5 the table grows strictly, so an endless challenge has one k
    for (let index = 1; index <= 250; index += 1) assert.ok(tableValue(index / 100) > tableValue((index - 1) / 100), `${index}`)
    checkChallenges(lookupChallenges, initialLookupState, { 129131: lookupFor(150, 'below'), 129132: lookupFor(-100, 'below'), 129133: lookupFor(200, 'above') })
    checkExtras(lookupExtra, initialLookupState, (state: LookupState) => setLookup(state, state))
})

test('banaketak batx2 z lab: binomiala kanpaiaren azpian', () => {
    // Every case has σ = √(npq) of 2, 2, 5 or 10 and passes np ≥ 5, nq ≥ 5
    for (const item of APPROX_CASES) {
        assert.ok(Math.abs(Math.sqrt(item.n * item.p * (1 - item.p)) - item.sd) < 1e-12 && item.n * item.p === item.mean)
        assert.ok(item.n * item.p >= 5 && item.n * (1 - item.p) >= 5)
    }
    // Every edge k ± 0,5 standardises with two decimals
    for (let caseIndex = 0; caseIndex < APPROX_CASES.length; caseIndex += 1) {
        const range = approxWindow(caseIndex)
        for (let k = range.min; k <= range.max; k += 1) {
            for (const x of [k - 0.5, k, k + 0.5]) {
                const z = (x - APPROX_CASES[caseIndex].mean) / APPROX_CASES[caseIndex].sd
                assert.ok(Math.abs(z * 100 - Math.round(z * 100)) < 1e-9, `${caseIndex} ${x}`)
            }
        }
    }
    // The start: P(X ≤ 55) in B(100; 0,5) without the correction falls short
    assert.deepEqual(edgesOf(initialApproxState), { from: null, to: 55 })
    assert.equal(approxOf(initialApproxState), below(1))
    assert.ok(Math.abs(exactOf(initialApproxState) - 0.8644) < 0.0001)
    assert.equal(approxPrediction(initialApproxState), '<')
    // With the correction the normal stays within 0,002 of the binomial in the symmetric cases, and within
    // 0,02 in B(25; 0,2), where np = 5 only just passes and the bars lean to one side
    for (let caseIndex = 0; caseIndex < APPROX_CASES.length; caseIndex += 1) {
        const range = approxWindow(caseIndex)
        for (let k = range.min; k <= range.max; k += 1) {
            for (const mode of ['atMost', 'atLeast', 'eq'] as const) {
                const state: ApproxState = { caseIndex, k, mode, corrected: true, prediction: null }
                assert.ok(Math.abs(approxOf(state) / 10_000 - exactOf(state)) < (caseIndex === 1 ? 0.02 : 0.002), `${caseIndex} ${k} ${mode}`)
            }
        }
    }
    // Exactly k without the correction is a single point
    assert.equal(approxOf({ caseIndex: 0, k: 8, mode: 'eq', corrected: false }), 0)
    // A new binomial starts one deviation above its mean
    assert.equal(setApprox(initialApproxState, { caseIndex: 0 }).k, 10)
    const at = (caseIndex: number, k: number, mode: ApproxState['mode'], corrected: boolean): ApproxState => ({ caseIndex, k, mode, corrected, prediction: null })
    checkChallenges(approxChallenges, initialApproxState, { 129141: at(2, 60, 'atLeast', true), 129142: at(2, 50, 'eq', false), 129143: at(0, 8, 'atMost', true) })
    checkExtras(approxExtra, initialApproxState, (state) => setApprox(state, state))
})
