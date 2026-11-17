import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { probabilityBatx2gLabChallengeIds, probabilityBatx2gLabToolForTopic, probabilityBatx2gLabTools } from '../src/pages/batx2-gizarte-probabilitatea/lab/labTools.ts'
import { initialPipesState, litresInD, pipesChallenges, pipesExtra, pipesPrediction, posteriorPipe, setPipeRate, setPipeShare, sourceLitres, streamsOf, type PipesState } from '../src/pages/batx2-gizarte-probabilitatea/lab/pipes.ts'
import { initialSurveyState, isIndependentSurvey, keeps, personOf, pYes, pYesGivenYoung, setSurvey, SURVEY_TOTAL, surveyChallenges, surveyExtra, surveyPrediction, type SurveyState } from '../src/pages/batx2-gizarte-probabilitatea/lab/survey.ts'
import { probabilityBatx2gLessonChecks } from '../src/pages/batx2-gizarte-probabilitatea/lessonChecks.ts'

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
        assert.ok(!/§(?:ri|ren|rekin|z|ra|tik|ei|ek|ak|en|ko|an)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '§')), text.eu)
    }
}

function checkChallenges<State>(challenges: LabChallenge<State>[], initial: State, solutions: Record<number, State>) {
    for (const challenge of challenges) {
        assert.ok(challenge.isSolved(solutions[challenge.id]), `${challenge.id} is not solved by its solution`)
        assert.ok(!challenge.isSolved(initial), `${challenge.id} starts solved`)
    }
    checkTexts(challenges.flatMap((challenge) => [challenge.prompt, challenge.hint]))
}

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

test('probabilitatea batx2 g lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(probabilityBatx2gLabTools.length, 9)
    for (const stage of ['counting', 'events', 'conditional', 'bayes']) assert.ok(probabilityBatx2gLabTools.some((tool) => tool.stage === stage), stage)
    const lessons = Object.keys(probabilityBatx2gLessonChecks)
    for (const tool of probabilityBatx2gLabTools) {
        assert.ok(lessons.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    }
    for (const tool of probabilityBatx2gLabTools.filter((item) => ['survey', 'pipes'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
        assert.ok(!/\d[a-zñ]/.test(tool.observe.eu), tool.observe.eu)
    }
    for (const [topic, tool] of Object.entries(probabilityBatx2gLabToolForTopic)) {
        assert.ok(lessons.includes(topic), topic)
        if (tool) assert.ok(probabilityBatx2gLabTools.some((item) => item.id === tool), `${topic}: ${tool}`)
    }
    // The ids of this unit's own tools are in its block; the borrowed ones keep theirs
    for (const id of [...surveyChallenges, ...pipesChallenges].map((challenge) => challenge.id)) assert.ok(id >= 150101 && id <= 150399, `${id}`)
    assert.equal(new Set(probabilityBatx2gLabChallengeIds).size, probabilityBatx2gLabChallengeIds.length)
})

test('probabilitatea batx2 g lab: the poll', () => {
    const solve = (patch: Partial<SurveyState>) => setSurvey(initialSurveyState, patch)
    checkChallenges(surveyChallenges, initialSurveyState, {
        150101: solve({ young: 50, yesYoung: 30 }),
        150102: solve({ young: 40, yesYoung: 20, yesOld: 30 }),
        150103: solve({ yesYoung: 30, yesOld: 10 })
    })
    checkExtras(surveyExtra, initialSurveyState, (state) => setSurvey({ ...initialSurveyState, condition: state.condition, prediction: state.prediction }, state))
    // The people drawn match the counts, whatever the numbers
    for (const young of [10, 40, 90]) {
        const state = setSurvey(initialSurveyState, { young, yesYoung: young / 2, yesOld: 5 })
        const people = Array.from({ length: SURVEY_TOTAL }, (_, index) => personOf(state, index))
        assert.equal(people.filter((person) => person.young).length, young)
        assert.equal(people.filter((person) => person.young && person.yes).length, state.yesYoung)
        assert.equal(people.filter((person) => !person.young && person.yes).length, state.yesOld)
        assert.equal(people.filter((person) => keeps('yes', person)).length, state.yesYoung + state.yesOld)
    }
    // Independence is the same as P(S/G) = P(S), and the prediction says so
    const even = setSurvey(initialSurveyState, { young: 40, yesYoung: 20, yesOld: 30 })
    assert.ok(isIndependentSurvey(even) && surveyPrediction(even) === '=')
    assert.equal(toNumber(pYesGivenYoung(even)), toNumber(pYes(even)))
    assert.equal(surveyPrediction(initialSurveyState), '>')
    // A new number forgets the prediction; the yes ones never pass their group
    assert.equal(setSurvey({ ...initialSurveyState, prediction: '<' }, { young: 30 }).yesYoung, 30)
    assert.equal(setSurvey({ ...initialSurveyState, prediction: '<' }, { young: 30 }).prediction, null)
})

test('probabilitatea batx2 g lab: the tree of pipes', () => {
    const withShares = (shares: [number, number, number], rates: [number, number, number]): PipesState => ({ ...initialPipesState, shares, rates })
    checkChallenges(pipesChallenges, initialPipesState, {
        150121: withShares([50, 30, 20], [4, 2, 12]),
        150122: withShares([50, 30, 20], [2, 2, 8]),
        150123: withShares([60, 30, 10], [0, 5, 25])
    })
    const reach = (state: PipesState) => {
        let next = setPipeShare({ ...initialPipesState, shares: [5, 5, 90] }, 0, state.shares[0])
        next = setPipeShare(next, 1, state.shares[1])
        for (const source of [0, 1, 2] as const) next = setPipeRate(next, source, state.rates[source])
        return { ...next, editing: state.editing, prediction: state.prediction }
    }
    checkExtras(pipesExtra, initialPipesState, reach)
    // Every stream is a whole number of litres, the shares add up to 10 000 and the posteriors to 1
    for (let seed = 1; seed <= 60; seed += 1) {
        const state = pipesExtra(createRandom(seed)).solution
        assert.equal(sourceLitres(state).reduce((sum, value) => sum + value, 0), 10000)
        assert.ok(streamsOf(state).every((value) => Number.isInteger(value)))
        const sum = [0, 1, 2].reduce((total, source) => total + toNumber(posteriorPipe(state, source)!), 0)
        assert.ok(Math.abs(sum - 1) < 1e-9)
    }
    // The opening state: 200 + 60 + 200 litres, and A wins the tie with C
    assert.equal(litresInD(initialPipesState), 460)
    assert.equal(pipesPrediction(initialPipesState), '<')
    assert.equal(pipesPrediction(withShares([60, 30, 10], [0, 5, 25])), '>')
})
