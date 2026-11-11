import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { bachSystemsLabTools } from '../src/pages/batx1-zientziak-sistemak/lab/labTools.ts'
import { familyChallenges } from '../src/pages/batx1-zientziak-sistemak/lab/solutionFamily.ts'
import {
    baseDet, chooseCramer, chooseUnknown, columnDet, CRAMER_LIMITS, CRAMER_PRESETS, cramerChallenges, cramerExtra, cramerPrediction, cramerSolution, cramerValue, initialCramerState, loadCramer,
    setCramerB, type CramerState
} from '../src/pages/batx2-zientziak-sistemak/lab/cramerMachine.ts'
import {
    A_LIMITS, aValues, chooseFamily, criticalValues, currentKind, detAt, DISCUSSION_FAMILIES, discussionChallenges, discussionExtra, discussionPrediction, initialDiscussionState, kindAt, markSeen,
    seeAll, setA, type DiscussionState
} from '../src/pages/batx2-zientziak-sistemak/lab/discussionMap.ts'
import { sistemakLabChallengeIds, sistemakLabToolForTopic, sistemakLabTools } from '../src/pages/batx2-zientziak-sistemak/lab/labTools.ts'
import {
    B_LIMITS, chooseRouche, initialRoucheState, K_LIMITS, loadRouche, ROUCHE_PRESETS, roucheChallenges, roucheClassification, roucheExtra, roucheKind, rouchePrediction, setB, setCorner,
    type RoucheState
} from '../src/pages/batx2-zientziak-sistemak/lab/roucheLight.ts'
import {
    chooseLine, commonPoint, initialLinesState, linesChallenges, linesClassification, linesExtra, linesKind, linesPrediction, parallel, sameLine, setCoefficient, type LinesState
} from '../src/pages/batx2-zientziak-sistemak/lab/threeLines.ts'
import { sistemakLessonTexts } from '../src/pages/batx2-zientziak-sistemak/lessonTexts.ts'
import { satisfies } from '../src/pages/batx2-zientziak-sistemak/system.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), text[language])
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|tik|z|ei|en|k)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
        assert.ok(!/§(?:ri|ren|rekin|z|ra|tik|ei)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '§')), text.eu)
    }
}

function checkChallenges<State>(challenges: LabChallenge<State>[], initial: State, solutions: Record<number, State>) {
    assert.equal(new Set(challenges.map((challenge) => challenge.id)).size, challenges.length)
    for (const challenge of challenges) {
        assert.ok(challenge.isSolved(solutions[challenge.id]), `${challenge.id} is not solved by its solution`)
        assert.ok(!challenge.isSolved(initial), `${challenge.id} starts solved`)
    }
    checkTexts(challenges.flatMap((challenge) => [challenge.prompt, challenge.hint]))
}

function checkExtras<State>(maker: LabChallengeMaker<State>, initial: State, reachable: (state: State) => boolean) {
    const prompts = new Set<string>()
    for (let seed = 1; seed <= 150; seed += 1) {
        const challenge = maker(createRandom(seed * 7919 + 3))
        assert.ok(challenge.isSolved(challenge.solution), `seed ${seed}: ${challenge.prompt.es}`)
        assert.ok(reachable(challenge.solution), `seed ${seed}: unreachable ${challenge.prompt.es}`)
        assert.ok(!challenge.isSolved(initial), `seed ${seed} starts solved`)
        checkTexts([challenge.prompt, challenge.hint])
        prompts.add(challenge.prompt.es)
    }
    assert.ok(prompts.size >= 6, `only ${prompts.size} different challenges`)
}

const inside = (value: number, limits: { min: number; max: number }) => value >= limits.min && value <= limits.max

test('sistemak batx2 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(sistemakLabTools.length, 5)
    assert.equal(sistemakLabTools.filter((tool) => tool.id !== 'solution-family').length, 4, 'four tools of its own')
    for (const tool of sistemakLabTools) {
        assert.ok(tool.lessonTopic in sistemakLessonTexts, tool.id)
        checkTexts([tool.title, tool.observe])
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
    }
    assert.deepEqual(Object.keys(sistemakLabToolForTopic).sort(), Object.keys(sistemakLessonTexts).sort())
    for (const tool of Object.values(sistemakLabToolForTopic)) assert.ok(sistemakLabTools.some((item) => item.id === tool), tool)
    // M1, the family of solutions of 1.º Bachillerato, comes back unchanged with its own ids
    assert.deepEqual(sistemakLabTools.find((tool) => tool.id === 'solution-family')!.title, bachSystemsLabTools.find((tool) => tool.id === 'solution-family')!.title)
    const own = sistemakLabChallengeIds.filter((id) => !familyChallenges.some((challenge) => challenge.id === id))
    assert.equal(own.length, 20)
    assert.ok(own.every((id) => id >= 118101 && id <= 118399))
    assert.deepEqual(sistemakLabChallengeIds.filter((id) => !own.includes(id)), familyChallenges.map((challenge) => challenge.id))
    assert.equal(new Set(sistemakLabChallengeIds).size, sistemakLabChallengeIds.length)
})

/* ---------- L1. The Rouché traffic light ---------- */

test('sistemak batx2 z lab: the traffic light follows Rouché–Frobenius', () => {
    const start = initialRoucheState
    assert.equal(roucheKind(start), 'inconsistent')
    assert.equal(rouchePrediction(start), '<')
    const dependent = setB(start, 2, 4)
    assert.equal(roucheKind(dependent), 'indeterminate')
    assert.equal(rouchePrediction(dependent), '>')
    const independent = setCorner(start, 3)
    assert.equal(roucheKind(independent), 'determined')
    assert.equal(rouchePrediction(independent), '=')
    const ranks = roucheClassification(start)
    assert.deepEqual([ranks.rankA, ranks.rankAugmented], [2, 3])
    // C can never be independent: two of its rows are proportional
    for (let k = K_LIMITS.min; k <= K_LIMITS.max; k++) assert.notEqual(roucheKind({ ...loadRouche(2), k }), 'determined')
    assert.equal(setB(start, 0, 99).b[0], B_LIMITS.max)
    assert.equal(setB({ ...start, prediction: '<' }, 1, 2).prediction, null)
    assert.equal(chooseRouche(start, 1).k, ROUCHE_PRESETS[1].k)
    checkChallenges(roucheChallenges, initialRoucheState, {
        118101: setB(start, 2, 4),
        118102: setCorner(start, 1),
        118103: setB(setCorner(loadRouche(1), -2), 2, 0),
        118104: setB(setCorner(loadRouche(1), -2), 2, -3),
        118105: setB(loadRouche(2), 1, 2)
    })
    checkExtras(roucheExtra, initialRoucheState, (state: RoucheState) => inside(state.k, K_LIMITS) && state.b.every((item) => inside(item, B_LIMITS)))
})

/* ---------- L4. Three lines ---------- */

test('sistemak batx2 z lab: three lines, their common point and their ranks', () => {
    const start = initialLinesState
    assert.equal(linesKind(start), 'inconsistent')
    assert.equal(linesPrediction(start), '<')
    const concurrent = setCoefficient(start, 2, 5)
    assert.equal(linesKind(concurrent), 'determined')
    assert.deepEqual(commonPoint(concurrent), [2, 1])
    assert.equal(linesPrediction(concurrent), '=')
    const coinciding: LinesState = { lines: [[1, 1, 2], [2, 2, 4], [3, 3, 6]], selected: 0, prediction: null }
    assert.equal(linesKind(coinciding), 'indeterminate')
    assert.equal(linesPrediction(coinciding), '>')
    assert.ok(parallel([1, 2, 3], [2, 4, 1]) && !sameLine([1, 2, 3], [2, 4, 1]) && sameLine([1, 2, 3], [2, 4, 6]))
    assert.equal(chooseLine(start, 0).selected, 0)
    checkChallenges(linesChallenges, initialLinesState, {
        118151: concurrent,
        118152: { ...start, lines: [[1, 1, 3], [1, -1, 1], [2, 2, 1]] },
        118153: { ...start, lines: [[1, 1, 0], [1, -1, 0], [2, 1, 0]] },
        118154: { ...start, lines: [[1, 1, 3], [1, -1, 1], [2, 2, 6]] },
        118155: { ...start, lines: [[1, 1, 3], [1, 1, 1], [2, 2, 4]] }
    })
    checkExtras(linesExtra, initialLinesState, (state: LinesState) => {
        const point = commonPoint(state)
        return point !== null && satisfies(state.lines.map(([a, b]) => [a, b]), state.lines.map(([, , c]) => c), point) && linesClassification(state).kind === 'determined'
    })
})

/* ---------- L2. The Cramer machine ---------- */

test('sistemak batx2 z lab: Cramer gives the solution, and every value is |A_j| / |A|', () => {
    for (const [preset, { rows, b }] of CRAMER_PRESETS.entries()) {
        const state = loadCramer(preset)
        assert.notEqual(baseDet(state), 0, `${preset}`)
        const solution = cramerSolution(state).map((item) => item.numerator / item.denominator)
        assert.ok(satisfies(rows, b, solution), `${preset}`)
        for (let unknown = 0; unknown < rows.length; unknown++) assert.ok(Math.abs(cramerValue({ ...state, unknown }) - columnDet({ ...state, unknown }) / baseDet(state)) < 1e-9)
    }
    const start = initialCramerState
    assert.deepEqual(cramerSolution(start).map((item) => item.numerator / item.denominator), [1, 2, 3])
    assert.equal(cramerPrediction(start), '>')
    assert.equal(chooseUnknown(chooseCramer(start, 1), 2).unknown, 1, 'only x and y in a 2 × 2')
    assert.equal(setCramerB(start, 0, 40).b[0], CRAMER_LIMITS.max)
    checkChallenges(cramerChallenges, initialCramerState, {
        118201: { ...start, b: [2, 0, 1] },
        118202: { ...loadCramer(1), b: [1, 5] },
        118203: { ...loadCramer(2), b: [4, 2, 2] },
        118204: { ...start, b: [3, 2, 2] },
        118205: { ...loadCramer(1), b: [3, 0] }
    })
    checkExtras(cramerExtra, initialCramerState, (state: CramerState) => state.b.every((item) => inside(item, CRAMER_LIMITS)) && state.unknown < CRAMER_PRESETS[state.preset].rows.length)
})

/* ---------- L3. The map of the discussion ---------- */

test('sistemak batx2 z lab: the map of the discussion, critical values and their types', () => {
    assert.deepEqual(DISCUSSION_FAMILIES.map((_, family) => criticalValues(family)), [[-2, 1], [-2, 1], [4], [-2, 2]])
    assert.deepEqual([kindAt(0, 1), kindAt(0, -2)], ['indeterminate', 'inconsistent'])
    assert.deepEqual([kindAt(1, 1), kindAt(1, -2)], ['indeterminate', 'inconsistent'])
    assert.equal(kindAt(2, 4), 'indeterminate')
    assert.deepEqual([kindAt(3, 2), kindAt(3, -2)], ['indeterminate', 'inconsistent'])
    // Away from the roots of |A|, always independent
    DISCUSSION_FAMILIES.forEach((_, family) => {
        for (const a of aValues) if (detAt(family, a) !== 0) assert.equal(kindAt(family, a), 'determined', `${family} ${a}`)
    })
    const start = initialDiscussionState
    assert.equal(currentKind(start), 'determined')
    assert.equal(discussionPrediction(start), '=')
    assert.equal(setA(start, 9).a, A_LIMITS.max)
    assert.equal(setA({ ...start, prediction: '>' }, 1).prediction, null)
    assert.deepEqual(markSeen(markSeen(start)).seen, [0])
    assert.deepEqual(seeAll(start).seen, aValues)
    assert.deepEqual(chooseFamily(seeAll(start), 2).seen, [])
    const at = (family: number, a: number): DiscussionState => ({ ...start, family, a })
    checkChallenges(discussionChallenges, initialDiscussionState, {
        118301: at(0, -2),
        118302: at(0, 1),
        118303: at(1, -2),
        118304: at(2, 4),
        118305: at(3, 2)
    })
    checkExtras(discussionExtra, initialDiscussionState, (state: DiscussionState) => inside(state.a, A_LIMITS))
})
