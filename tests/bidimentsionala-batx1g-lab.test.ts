import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { socialBivarLabChallengeIds, socialBivarLabToolForTopic, socialBivarLabTools } from '../src/pages/batx1-gizarte-bidimentsionala/lab/labTools.ts'
import { initialRelationState, relationChallenges, relationExtra, relationPrediction, relationR, rLatex, setRelation, type RelationState } from '../src/pages/batx1-gizarte-bidimentsionala/lab/relation.ts'
import { estimate, initialReliableState, reliableChallenges, reliableExtra, reliablePrediction, reliableR, setReliable, verdictOf, type ReliableState } from '../src/pages/batx1-gizarte-bidimentsionala/lab/reliable.ts'
import { socialBivarLessonChecks } from '../src/pages/batx1-gizarte-bidimentsionala/lessonChecks.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const
const borrowedLessons = ['scatter-dependence', 'quadrants', 'covariance', 'correlation-coefficient', 'units-change', 'regression-yx', 'estimation', 'calculation-table', 'inverse-problems', 'two-variables', 'marginal', 'conditional', 'independence', 'grouped-pairs']

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formulaFor(language, formula), { throwOnError: true, strict: 'error' })
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        assert.ok(!/[؀-ۿ]/.test([...text.ar.matchAll(/\$([^$]+)\$/g)].map((match) => match[1]).join('')), text.ar)
        for (const language of ['eu', 'es', 'en'] as const) assert.ok(!/[؀-ۿ]/.test(text[language]), text[language])
        assert.ok(!/\d(?:ri|ren|rekin|ekin|ek|ak|ra|era|tik|z|ei|en|k|i)(?![a-zA-Z])/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
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
    assert.ok(prompts.size >= 6, `only ${prompts.size} different challenges`)
}

test('bidimentsionala batx1 g lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(socialBivarLabTools.length, 7)
    for (const stage of ['cloud', 'parameters', 'regression', 'tables']) assert.ok(socialBivarLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of socialBivarLabTools) for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    for (const tool of socialBivarLabTools.filter((item) => ['relation', 'reliable'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
        assert.ok(!/\d[a-zñ]/.test(tool.observe.eu), tool.observe.eu)
    }
    assert.equal(new Set(socialBivarLabChallengeIds).size, socialBivarLabChallengeIds.length)
    const own = [...relationChallenges, ...reliableChallenges].map((challenge) => challenge.id)
    for (const id of own) assert.ok(id >= 138101 && id <= 138399, `${id}`)
    const topics = [...borrowedLessons, ...Object.keys(socialBivarLessonChecks)]
    for (const [topic, tool] of Object.entries(socialBivarLabToolForTopic)) {
        assert.ok(topics.includes(topic), topic)
        assert.ok(socialBivarLabTools.some((item) => item.id === tool), `${topic} → ${tool}`)
    }
    for (const tool of socialBivarLabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
})

test('bidimentsionala batx1 g lab: ¿funcional o estadística?', () => {
    // No noise: |r| = 1; a flat line: r = 0; more noise, smaller |r|
    assert.ok(Math.abs(relationR({ slope: -2, noise: 0 }) + 1) < 1e-9)
    assert.ok(Math.abs(relationR({ slope: 0, noise: 3 })) < 1e-9)
    for (let noise = 1; noise < 6; noise += 1) assert.ok(Math.abs(relationR({ slope: 1, noise: noise + 1 })) < Math.abs(relationR({ slope: 1, noise })))
    // The slope does not change the strength
    assert.ok(Math.abs(relationR({ slope: 2, noise: 2 }) + relationR({ slope: -2, noise: 2 })) < 1e-9)
    assert.equal(relationPrediction(initialRelationState), '<')
    assert.equal(relationPrediction({ slope: 1, noise: 0 }), '=')
    assert.equal(rLatex(-0.934), '-0{,}93')
    const predicted: RelationState = { ...initialRelationState, prediction: '<' }
    assert.equal(setRelation(predicted, { noise: 3 }).prediction, null)
    assert.equal(setRelation(predicted, { noise: 4 }).prediction, '<')
    assert.equal(setRelation(initialRelationState, { slope: 9 }).slope, 2)
    // A strong but not functional correlation exists
    const strong = [1, 2, 3, 4, 5, 6].map((noise) => ({ slope: 2, noise })).find((state) => relationR(state) >= 0.8)
    assert.ok(strong)
    const solutions: Record<number, RelationState> = {
        138101: setRelation(initialRelationState, { slope: -1, noise: 0 }),
        138102: setRelation(initialRelationState, strong!),
        138103: setRelation(initialRelationState, { slope: 0 })
    }
    checkChallenges(relationChallenges, initialRelationState, solutions)
    checkExtras(relationExtra, initialRelationState, (state) => setRelation(state, state))
})

test('bidimentsionala batx1 g lab: ¿fiable o no?', () => {
    // Same line, different r
    assert.ok(reliableR(0) > 0.9 && reliableR(0) < 0.95)
    assert.ok(reliableR(1) > 0.5 && reliableR(1) < 0.6)
    assert.equal(estimate(6), 4)
    assert.equal(verdictOf({ data: 0, x: 8 }), 'reliable')
    assert.equal(verdictOf({ data: 0, x: 11 }), 'little')
    assert.equal(verdictOf({ data: 0, x: 20 }), 'not')
    assert.equal(verdictOf({ data: 1, x: 6 }), 'not')
    assert.equal(reliablePrediction(initialReliableState), '>')
    const predicted: ReliableState = { ...initialReliableState, prediction: '>' }
    assert.equal(setReliable(predicted, { x: 9 }).prediction, null)
    assert.equal(setReliable(predicted, { x: 8 }).prediction, '>')
    assert.equal(setReliable(initialReliableState, { x: 40 }).x, 24)
    const solutions: Record<number, ReliableState> = {
        138201: setReliable(initialReliableState, { x: 6 }),
        138202: setReliable(initialReliableState, { x: 20 }),
        138203: setReliable(initialReliableState, { data: 1, x: 6 })
    }
    checkChallenges(reliableChallenges, initialReliableState, solutions)
    checkExtras(reliableExtra, initialReliableState, (state) => setReliable(state, state))
})
