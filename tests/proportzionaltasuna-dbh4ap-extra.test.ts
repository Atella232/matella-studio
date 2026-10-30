import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import { classifyChallenges, initialClassifyState } from '../src/pages/dbh1-proportzionaltasuna-v2/lab/labTools.ts'
import {
    CAPITALS,
    CHAIN_STARTS,
    CHANGE_LIMIT,
    chainChallenges,
    chainExtra,
    compoundChallenges,
    initialChainState,
    initialCompoundState,
    initialInterestState,
    initialShareState,
    interestChallenges,
    interestExtra,
    RATE_MAX,
    SHARE_NUMBER_MAX,
    SHARE_TOTALS,
    shareChallenges,
    shareExtra,
    YEARS_MAX
} from '../src/pages/dbh2-proportzionaltasuna-v2/lab/labTools.ts'
import {
    ALLOY_PURITIES,
    CLOCK_MAX,
    fillHours,
    GROWTH_CAPITALS,
    GROWTH_RATE_MAX,
    GROWTH_YEARS_MAX,
    growthChallenges,
    growthExtra,
    growthPrediction,
    initialGrowthState,
    initialMixtureState,
    initialMotionState,
    initialTapsState,
    MIXTURE_KILOS_MAX,
    MIXTURE_PRICES,
    mixtureChallenges,
    mixtureExtra,
    mixturePrediction,
    MOTION_DISTANCES,
    motionChallenges,
    motionExtra,
    motionPrediction,
    setGrowth,
    setMixture,
    setMotion,
    setPrediction,
    setTaps,
    SPEED_MAX,
    SPEED_MIN,
    TAP_HOURS_MAX,
    tapsChallenges,
    tapsExtra,
    tapsPrediction
} from '../src/pages/dbh4-aplikatuak-proportzionaltasuna/lab/labTools.ts'

const makers: Array<[string, LabChallengeMaker<never>, unknown]> = [
    ['growth', growthExtra as LabChallengeMaker<never>, initialGrowthState],
    ['mixture', mixtureExtra as LabChallengeMaker<never>, initialMixtureState],
    ['motion', motionExtra as LabChallengeMaker<never>, initialMotionState],
    ['taps', tapsExtra as LabChallengeMaker<never>, initialTapsState],
    ['share', shareExtra as LabChallengeMaker<never>, initialShareState],
    ['chain', chainExtra as LabChallengeMaker<never>, initialChainState],
    ['interest', interestExtra as LabChallengeMaker<never>, initialInterestState]
]

test('proportzionaltasuna 4. DBH ap lab: no fixed challenge is solved when a tool opens', () => {
    const tools: Array<[string, LabChallenge<never>[], unknown]> = [
        ['classify', classifyChallenges as LabChallenge<never>[], initialClassifyState],
        ['compound', compoundChallenges as LabChallenge<never>[], initialCompoundState],
        ['share', shareChallenges as LabChallenge<never>[], initialShareState],
        ['chain', chainChallenges as LabChallenge<never>[], initialChainState],
        ['interest', interestChallenges as LabChallenge<never>[], initialInterestState],
        ['growth', growthChallenges as LabChallenge<never>[], initialGrowthState],
        ['mixture', mixtureChallenges as LabChallenge<never>[], initialMixtureState],
        ['motion', motionChallenges as LabChallenge<never>[], initialMotionState],
        ['taps', tapsChallenges as LabChallenge<never>[], initialTapsState]
    ]
    for (const [name, challenges, start] of tools) {
        for (const challenge of challenges) assert.ok(!challenge.isSolved(start as never), `${name} ${challenge.id}`)
    }
})

test('proportzionaltasuna 4. DBH ap lab: every endless challenge can be done, and none is done at the start', () => {
    for (const [name, maker, start] of makers) {
        const prompts = new Set<string>()
        for (let seed = 1; seed <= 400; seed += 1) {
            const challenge = maker(createRandom(seed * 7919))
            assert.ok(challenge.isSolved(challenge.solution), `${name} ${seed} ${challenge.prompt.es}`)
            assert.ok(!challenge.isSolved(start as never), `${name} ${seed} starts solved`)
            prompts.add(challenge.prompt.es)
        }
        // Plenty of different challenges, not a handful repeated
        assert.ok(prompts.size > 60, `${name}: ${prompts.size}`)
    }
})

test('proportzionaltasuna 4. DBH ap lab: the endless solutions stay inside what each tool can set', () => {
    for (let seed = 1; seed <= 300; seed += 1) {
        const random = () => createRandom(seed * 104729)
        const growth = growthExtra(random()).solution
        assert.ok((GROWTH_CAPITALS as readonly number[]).includes(growth.capital) && growth.rate >= 1 && growth.rate <= GROWTH_RATE_MAX && growth.years >= 1 && growth.years <= GROWTH_YEARS_MAX, `growth ${seed}`)
        const mixture = mixtureExtra(random()).solution
        const values: readonly number[] = mixture.kind === 'coffee' ? MIXTURE_PRICES : ALLOY_PURITIES
        assert.ok(mixture.kilos.every((kilos) => kilos >= 1 && kilos <= MIXTURE_KILOS_MAX) && mixture.prices.every((price) => values.includes(price)), `mixture ${seed}`)
        const motion = motionExtra(random()).solution
        assert.ok((MOTION_DISTANCES as readonly number[]).includes(motion.distance) && motion.speeds.every((speed) => speed >= SPEED_MIN && speed <= SPEED_MAX && speed % 10 === 0) && motion.minutes % 5 === 0 && motion.minutes <= CLOCK_MAX, `motion ${seed}`)
        const taps = tapsExtra(random()).solution
        assert.ok(taps.taps[0] >= 1 && taps.taps.every((hours) => hours <= TAP_HOURS_MAX) && taps.drain <= TAP_HOURS_MAX, `taps ${seed}`)
        const share = shareExtra(random()).solution
        assert.ok((SHARE_TOTALS as readonly number[]).includes(share.total) && share.numbers.every((value) => value >= 1 && value <= SHARE_NUMBER_MAX), `share ${seed}`)
        const chain = chainExtra(random()).solution
        assert.ok((CHAIN_STARTS as readonly number[]).includes(chain.start) && chain.changes.every((percent) => Math.abs(percent) <= CHANGE_LIMIT && percent % 5 === 0), `chain ${seed}`)
        const interest = interestExtra(random()).solution
        assert.ok((CAPITALS as readonly number[]).includes(interest.capital) && interest.rate <= RATE_MAX && interest.years <= YEARS_MAX, `interest ${seed}`)
    }
})

test('proportzionaltasuna 4. DBH ap lab: endless texts in three languages, formulas that render, no case ending after a number', () => {
    for (const [name, maker] of makers) {
        for (let seed = 1; seed <= 150; seed += 1) {
            const challenge = maker(createRandom(seed * 31337))
            for (const language of ['eu', 'es', 'en', 'ar'] as const) {
                for (const text of [challenge.prompt[language], challenge.hint[language]]) {
                    assert.ok(text.trim().length > 0, `${name} ${language}`)
                    assert.equal(text.split('$').length % 2, 1, `${name} unbalanced $: ${text}`)
                    for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
                        katex.renderToString(formulaFor(language, formula), { throwOnError: true })
                        assert.ok(!/[؀-ۿ]/.test(formula), `${name} ${formula}`)
                    }
                    if (language === 'ar') assert.ok(!text.includes('{,}') && !/\d,\d/.test(text), `${name} Arabic comma: ${text}`)
                    if (language === 'eu') {
                        for (const match of text.matchAll(/\$[^$]+\$/g)) assert.ok(!/[a-z]/i.test(text[match.index + match[0].length] ?? ''), `${name} suffix after a formula: ${text}`)
                        assert.ok(!/\d-?(an|ean|ra|era|tik|etik|ko|eko|rekin|ekin|ri|eri)\b/.test(text), `${name} suffix after a number: ${text}`)
                    }
                }
            }
        }
    }
})

test('proportzionaltasuna 4. DBH ap lab: predictions', () => {
    // Doubling: 2000 € at 5 % for 2 years stays below; 12 % for 7 years passes it
    assert.equal(growthPrediction(initialGrowthState), '<')
    assert.equal(growthPrediction(setGrowth(initialGrowthState, { rate: 12, years: 7 })), '>')
    // The mean price: more kilos of the dearer coffee pulls it up; equal kilos, halfway
    assert.equal(mixturePrediction(initialMixtureState), '>')
    assert.equal(mixturePrediction(setMixture(initialMixtureState, { kilos: [1, 10] })), '=')
    assert.equal(mixturePrediction(setMixture(initialMixtureState, { kilos: [1, 30] })), '<')
    // The meeting against one hour; never meeting asks nothing
    assert.equal(motionPrediction(initialMotionState), '>')
    assert.equal(motionPrediction(setMotion(setMotion(initialMotionState, { distance: 120 }), { speed: [0, 30] })), '=')
    assert.equal(motionPrediction(setMotion(setMotion(initialMotionState, { mode: 'chase' }), { speed: [0, 40] })), null)
    // Two taps beat the fastest alone; one tap is the same; a strong drain is slower or never
    assert.equal(tapsPrediction(initialTapsState), '<')
    assert.equal(tapsPrediction(setTaps(initialTapsState, { tap: [1, 0] })), '=')
    assert.equal(tapsPrediction(setTaps(initialTapsState, { drain: 5 })), '>')
    assert.equal(fillHours(setTaps(initialTapsState, { drain: 2 })), null)
    assert.equal(tapsPrediction(setTaps(initialTapsState, { drain: 2 })), '>')
    // The first guess stays; changing the case asks again, but moving the clock does not
    const guessed = setPrediction(initialMotionState, '<')
    assert.equal(setPrediction(guessed, '>').prediction, '<')
    assert.equal(setMotion(guessed, { minutes: 30 }).prediction, '<')
    assert.equal(setMotion(guessed, { distance: 120 }).prediction, null)
    assert.equal(setMotion(guessed, { speed: [0, 60] }).prediction, '<')
    assert.equal(setGrowth(setPrediction(initialGrowthState, '<'), { years: 3 }).prediction, null)
    assert.equal(setTaps(setPrediction(initialTapsState, '<'), { drain: 0 }).prediction, '<')
    assert.equal(setMixture(setPrediction(initialMixtureState, '>'), { price: [0, 1000] }).prediction, null)
})
