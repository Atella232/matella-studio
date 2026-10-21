import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import {
    compareExtra,
    equivalenceExtra,
    numberLineExtra,
    partsExtra,
    productExtra,
    proportionExtra,
    sumExtra,
    wallExtra
} from '../src/pages/dbh2-zatikiak-prototype/lab/extraChallenges.ts'
import {
    initialCompareState,
    initialEquivalenceState,
    initialNumberLineState,
    initialPartsState,
    initialProductState,
    initialProportionState,
    initialSumState,
    initialWallState,
    numberLineBounds
} from '../src/pages/dbh2-zatikiak-prototype/lab/labTools.ts'

const makers: Array<[string, LabChallengeMaker<never>, unknown]> = [
    ['parts', partsExtra as LabChallengeMaker<never>, initialPartsState],
    ['numberline', numberLineExtra as LabChallengeMaker<never>, initialNumberLineState],
    ['wall', wallExtra as LabChallengeMaker<never>, initialWallState],
    ['equivalence', equivalenceExtra as LabChallengeMaker<never>, initialEquivalenceState],
    ['compare', compareExtra as LabChallengeMaker<never>, initialCompareState],
    ['addsub', sumExtra as LabChallengeMaker<never>, initialSumState],
    ['muldiv', productExtra as LabChallengeMaker<never>, initialProductState],
    ['proportion', proportionExtra as LabChallengeMaker<never>, initialProportionState]
]

test('zatikiak extra challenges: every generated challenge can be done, and none is done at the start', () => {
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

test('zatikiak extra challenges: the solutions stay inside what each tool can show', () => {
    for (let seed = 1; seed <= 300; seed += 1) {
        const random = () => createRandom(seed * 104729)
        const line = numberLineExtra(random()).solution
        const { min, max } = numberLineBounds(line)
        assert.ok(line.denominator >= 1 && line.denominator <= 12 && line.numerator >= min && line.numerator <= max, `line ${seed}`)
        const parts = partsExtra(random()).solution
        assert.ok(parts.units <= 4 && parts.denominator <= 12 && parts.filled.length <= parts.units * parts.denominator, `parts ${seed}`)
        const wall = wallExtra(random()).solution
        assert.ok(wall.first !== null && wall.first.denominator <= 12 && wall.first.numerator <= wall.first.denominator, `wall ${seed}`)
        const equivalence = equivalenceExtra(random()).solution
        assert.ok(equivalence.denominator <= 12 && equivalence.numerator <= equivalence.denominator && equivalence.factor <= 6, `equivalence ${seed}`)
        for (const state of [sumExtra(random()).solution, productExtra(random()).solution, compareExtra(random()).solution]) {
            for (const operand of [state.first, state.second]) assert.ok(operand.denominator >= 2 && operand.denominator <= 12 && operand.numerator >= 1 && operand.numerator <= operand.denominator, `operand ${seed}`)
        }
        const proportion = proportionExtra(random()).solution
        assert.ok(proportion.quantity >= 10 && proportion.quantity <= 600 && proportion.quantity % 10 === 0 && proportion.percent % 5 === 0, `proportion ${seed}`)
        assert.ok(proportion.denominator <= 12 && proportion.numerator <= proportion.denominator, `proportion fraction ${seed}`)
    }
})

test('zatikiak extra challenges: texts in three languages, formulas that render, no case ending after a formula', () => {
    for (const [name, maker] of makers) {
        for (let seed = 1; seed <= 150; seed += 1) {
            const challenge = maker(createRandom(seed * 31337))
            for (const language of ['eu', 'es', 'ar'] as const) {
                for (const text of [challenge.prompt[language], challenge.hint[language]]) {
                    assert.ok(text.trim().length > 0, `${name} ${language}`)
                    assert.equal(text.split('$').length % 2, 1, `${name} unbalanced $: ${text}`)
                    for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) {
                        katex.renderToString(formula, { throwOnError: true })
                        assert.ok(!/[؀-ۿ]/.test(formula), `${name} ${formula}`)
                    }
                    if (language === 'eu') assert.ok(!/\$[^$\s]+\$[A-Za-z]/.test(text) && !/\$[^$]+\$[a-z]/.test(text), `${name} suffix: ${text}`)
                }
            }
        }
    }
})
