import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { errorOf as hundredError, hits, HUNDRED_BATCHES, HUNDRED_LEVELS, HUNDRED_RUNS, HUNDRED_SIZES, hundredChallenges, hundredExtra, hundredPrediction, initialHundredState, means, setHundred, type HundredState } from '../src/pages/batx2-gizarte-inferentzia/lab/hundred.ts'
import { inferenceBatx2gLabChallengeIds, inferenceBatx2gLabToolForTopic, inferenceBatx2gLabTools } from '../src/pages/batx2-gizarte-inferentzia/lab/labTools.ts'
import { errorOf as marginError, initialMarginState, MARGIN_LEVELS, MARGIN_SIZES, marginChallenges, marginExtra, marginPrediction, setMargin, type MarginState } from '../src/pages/batx2-gizarte-inferentzia/lab/margin.ts'
import { inferenceBatx2gLessonChecks } from '../src/pages/batx2-gizarte-inferentzia/lessonChecks.ts'

/* Inferentzia · 2.º Bachillerato Ciencias Sociales: the laboratory. */

const languages = ['eu', 'es', 'en', 'ar'] as const

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        const formulas = (value: string) => [...value.matchAll(/\$([^$]+)\$/g)].map((match) => match[1].replace(/\{,\}/g, '.')).sort()
        for (const language of ['eu', 'en', 'ar'] as const) assert.deepEqual(formulas(text[language]), formulas(text.es), `${language}: ${text[language]}`)
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
    }
}

function checkChallenges<State>(challenges: LabChallenge<State>[], initial: State, solutions: Record<number, State>) {
    for (const challenge of challenges) {
        assert.ok(challenge.isSolved(solutions[challenge.id]), `${challenge.id} is not solved by its solution`)
        assert.ok(!challenge.isSolved(initial), `${challenge.id} starts solved`)
    }
    checkTexts(challenges.flatMap((challenge) => [challenge.prompt, challenge.hint]))
}

function checkExtras<State>(maker: LabChallengeMaker<State>, initial: State, setter: (state: State) => State, least = 10) {
    const prompts = new Set<string>()
    for (let seed = 1; seed <= 150; seed += 1) {
        const challenge = maker(createRandom(seed * 7919 + 3))
        assert.ok(challenge.isSolved(challenge.solution), `seed ${seed}: ${challenge.prompt.es}`)
        assert.deepEqual(setter(challenge.solution), challenge.solution, `seed ${seed}: unreachable ${challenge.prompt.es}`)
        assert.ok(!challenge.isSolved(initial), `seed ${seed} starts solved`)
        checkTexts([challenge.prompt, challenge.hint])
        prompts.add(challenge.prompt.es)
    }
    assert.ok(prompts.size >= least, `only ${prompts.size} different challenges`)
}

test('inferentzia batx2 g lab: the tools, their lessons and their challenge ids', () => {
    assert.deepEqual(inferenceBatx2gLabTools.map((tool) => tool.id), ['lookup', 'band', 'hundred', 'margin'])
    const lessons = Object.keys(inferenceBatx2gLessonChecks)
    for (const tool of inferenceBatx2gLabTools) assert.ok(lessons.includes(tool.lessonTopic), `${tool.id}`)
    for (const [topic, tool] of Object.entries(inferenceBatx2gLabToolForTopic)) {
        assert.ok(lessons.includes(topic), topic)
        if (tool) assert.ok(inferenceBatx2gLabTools.some((item) => item.id === tool))
    }
    for (const id of [...hundredChallenges, ...marginChallenges].map((challenge) => challenge.id)) assert.ok(id >= 153101 && id <= 153399, `${id}`)
    assert.equal(new Set(inferenceBatx2gLabChallengeIds).size, inferenceBatx2gLabChallengeIds.length)
    for (const tool of inferenceBatx2gLabTools.filter((item) => ['hundred', 'margin'].includes(item.id))) checkTexts([tool.title, tool.observe])
})

test('inferentzia batx2 g lab: a hundred intervals', () => {
    const solve = (patch: Partial<HundredState>) => setHundred(initialHundredState, patch)
    const level = (value: number) => HUNDRED_LEVELS.indexOf(value as (typeof HUNDRED_LEVELS)[number])
    // A batch at 90 % with 12 misses or more, and a batch at 99 % (n = 25) with no miss, exist
    const missing = Array.from({ length: HUNDRED_BATCHES }, (_, index) => index + 1).find((batch) => HUNDRED_RUNS - hits(solve({ level: level(90), batch })) >= 12)
    const perfect = Array.from({ length: HUNDRED_BATCHES }, (_, index) => index + 1).find((batch) => hits(solve({ level: level(99), size: HUNDRED_SIZES.indexOf(25), batch })) === HUNDRED_RUNS)
    assert.ok(missing && perfect)
    checkChallenges(hundredChallenges, initialHundredState, {
        153101: solve({ level: level(95), size: HUNDRED_SIZES.indexOf(100) }),
        153102: solve({ level: level(90), batch: missing }),
        153103: solve({ level: level(99), size: HUNDRED_SIZES.indexOf(25), batch: perfect })
    })
    checkExtras(hundredExtra, initialHundredState, (state) => ({ ...setHundred(initialHundredState, state), prediction: state.prediction }))
    // The same batch always gives the same means; across all batches the share that catch μ is close to the level
    for (let index = 0; index < HUNDRED_LEVELS.length; index += 1) {
        let caught = 0
        let total = 0
        for (let size = 0; size < HUNDRED_SIZES.length; size += 1) {
            for (let batch = 1; batch <= HUNDRED_BATCHES; batch += 1) {
                const state = solve({ level: index, size, batch })
                caught += hits(state)
                total += HUNDRED_RUNS
                assert.ok(['<', '=', '>'].includes(hundredPrediction(state)))
            }
        }
        assert.ok(Math.abs((100 * caught) / total - HUNDRED_LEVELS[index]) < 1, `${HUNDRED_LEVELS[index]}: ${(100 * caught) / total}`)
    }
    assert.deepEqual(means(solve({ batch: 3 })), means(solve({ batch: 3 })))
    assert.ok(Math.abs(hundredError(solve({ level: level(95), size: HUNDRED_SIZES.indexOf(25) })) - 3.92) < 1e-9)
})

test('inferentzia batx2 g lab: the margin of error', () => {
    const solve = (patch: Partial<MarginState>) => setMargin(initialMarginState, patch)
    const level = (value: number) => MARGIN_LEVELS.indexOf(value as (typeof MARGIN_LEVELS)[number])
    checkChallenges(marginChallenges, initialMarginState, {
        153121: solve({ sd: 10, level: level(95), size: MARGIN_SIZES.indexOf(100) }),
        153122: solve({ sd: 30, level: level(95), size: MARGIN_SIZES.indexOf(36) }),
        153123: solve({ mode: 'proportion', p: 5, level: level(95), size: MARGIN_SIZES.indexOf(400) })
    })
    checkExtras(marginExtra, initialMarginState, (state) => ({ ...setMargin(initialMarginState, state), prediction: state.prediction }))
    // The smallest n that the challenges ask for really is the smallest in the list
    assert.ok(marginError(solve({ sd: 10, level: level(95), size: MARGIN_SIZES.indexOf(64) })) > 2)
    assert.ok(marginError(solve({ sd: 10, level: level(95), size: MARGIN_SIZES.indexOf(100) })) <= 2)
    assert.ok(marginError(solve({ mode: 'proportion', p: 5, level: level(95), size: MARGIN_SIZES.indexOf(225) })) >= 0.05)
    assert.ok(marginError(solve({ mode: 'proportion', p: 5, level: level(95), size: MARGIN_SIZES.indexOf(400) })) < 0.05)
    assert.deepEqual(MARGIN_LEVELS.map((_, index) => marginPrediction({ level: index })), ['<', '<', '=', '>'])
})
