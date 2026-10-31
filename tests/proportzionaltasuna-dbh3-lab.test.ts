import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker, LocalizedText } from '../src/features/unit-v2/lab/types.ts'
import { proportion3LabChallengeIds, proportion3LabToolForTopic, proportion3LabTools } from '../src/pages/dbh3-proportzionaltasuna/lab/labTools.ts'
import { gearsChallenges, gearsExtra, gearsPrediction, gearsRpmB, initialGearsState, setGears, type GearsState } from '../src/pages/dbh3-proportzionaltasuna/lab/gears.ts'
import { initialMapState, mapChallenges, mapExtra, mapPrediction, mapRealMetres, setMap, type MapState } from '../src/pages/dbh3-proportzionaltasuna/lab/mapScale.ts'
import { initialRecipeState, recipeChallenges, recipeExtra, recipeLimit, recipePrediction, setRecipe, type RecipeState } from '../src/pages/dbh3-proportzionaltasuna/lab/recipe.ts'
import { initialRectangleState, rectangleChallenges, rectangleExtra, rectanglePrediction, rectangleY, setRectangle, type RectangleState } from '../src/pages/dbh3-proportzionaltasuna/lab/rectangle.ts'
import { setPrediction } from '../src/pages/dbh3-proportzionaltasuna/lab/prediction.ts'

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
function checkExtras<State>(maker: LabChallengeMaker<State>, initial: State) {
    const prompts = new Set<string>()
    for (let seed = 1; seed <= 150; seed += 1) {
        const challenge = maker(createRandom(seed * 7919 + 3))
        assert.ok(challenge.isSolved(challenge.solution), `seed ${seed}: ${challenge.prompt.es}`)
        assert.ok(!challenge.isSolved(initial), `seed ${seed} starts solved`)
        checkTexts([challenge.prompt, challenge.hint])
        prompts.add(challenge.prompt.es)
    }
    assert.ok(prompts.size >= 6, `only ${prompts.size} different challenges`)
}

test('proportzionaltasuna 3. DBH lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(proportion3LabTools.length, 13)
    const stages = ['ratios', 'simple', 'compound', 'percent', 'problems']
    for (const tool of proportion3LabTools) assert.ok(stages.includes(tool.stage), tool.id)
    for (const stage of stages) assert.ok(proportion3LabTools.filter((tool) => tool.stage === stage).length >= 2, stage)
    for (const tool of proportion3LabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
        assert.ok(!tool.observe.es.includes('$') && !tool.observe.eu.includes('$') && !tool.observe.ar.includes('$'), tool.id)
    }
    assert.equal(new Set(proportion3LabChallengeIds).size, proportion3LabChallengeIds.length)
    const topics = ['ratio', 'proportion', 'scale', 'direct', 'inverse', 'graphs', 'compound', 'direct-share', 'inverse-share', 'percent-index', 'chained', 'interest', 'mixtures', 'motion', 'work']
    for (const topic of topics) assert.ok(proportion3LabToolForTopic[topic], topic)
    for (const tool of Object.values(proportion3LabToolForTopic)) assert.ok(proportion3LabTools.some((candidate) => candidate.id === tool))
    // The ids of this unit's own tools stay in its block
    for (const id of [...gearsChallenges, ...rectangleChallenges, ...mapChallenges, ...recipeChallenges].map((challenge) => challenge.id)) assert.ok(id >= 87101 && id <= 87999, `${id}`)
})

test('proportzionaltasuna 3. DBH lab: las ruedas dentadas', () => {
    const at = (teethA: number, teethB: number, rpmA: number): GearsState => setGears(initialGearsState, { teethA, teethB, rpmA })
    assert.equal(gearsRpmB(at(12, 24, 30)), 15)
    assert.equal(gearsPrediction(at(12, 24, 30)), '<')
    assert.equal(gearsPrediction(at(24, 12, 30)), '>')
    assert.equal(gearsPrediction(at(20, 20, 30)), '=')
    // Teeth go in twos, turns in fives, and the prediction goes when the wheels change
    assert.deepEqual(setGears(initialGearsState, { teethA: 99, teethB: 3, rpmA: 7 }), { teethA: 48, teethB: 8, rpmA: 5, prediction: null })
    const guessed = setPrediction(initialGearsState, '>')
    assert.equal(setPrediction(guessed, '<').prediction, '>')
    assert.equal(setGears(guessed, { teethA: 30 }).prediction, null)
    checkChallenges(gearsChallenges, initialGearsState, { 87101: at(24, 16, 30), 87102: at(36, 12, 20), 87103: at(36, 18, 10), 87104: at(24, 30, 10), 87105: at(32, 32, 20) })
    checkExtras(gearsExtra, initialGearsState)
})

test('proportzionaltasuna 3. DBH lab: el rectángulo que se estira', () => {
    const at = (mode: 'inverse' | 'direct', k: number, halves: number): RectangleState => setRectangle({ ...initialRectangleState, mode }, { k, halves })
    assert.equal(rectangleY(at('inverse', 24, 16)), 3)
    assert.equal(rectangleY(at('direct', 3, 12)), 18)
    assert.equal(rectanglePrediction(at('inverse', 24, 16)), '<')
    assert.equal(rectanglePrediction(at('direct', 3, 12)), '>')
    // A fixed height is never above 6, so that the rectangle fits above the graph
    assert.equal(setRectangle(at('inverse', 30, 4), { mode: 'direct' }).k, 6)
    checkChallenges(rectangleChallenges, initialRectangleState, { 87201: at('inverse', 24, 16), 87202: at('inverse', 36, 12), 87203: at('direct', 3, 12), 87204: at('inverse', 30, 24), 87205: at('inverse', 20, 4) })
    checkExtras(rectangleExtra, initialRectangleState)
    for (let seed = 1; seed <= 150; seed += 1) {
        const { solution } = rectangleExtra(createRandom(seed * 7919 + 5))
        assert.ok(solution.k >= 2 && solution.k <= (solution.mode === 'direct' ? 6 : 36) && solution.halves >= 2 && solution.halves <= 24, JSON.stringify(solution))
    }
})

test('proportzionaltasuna 3. DBH lab: el mapa a escala', () => {
    const at = (scale: number, halves: number): MapState => setMap(initialMapState, { scale, halves })
    assert.equal(mapRealMetres(at(3, 8)), 2000)
    assert.equal(mapRealMetres(at(1, 15)), 750)
    assert.equal(mapPrediction(at(2, 8)), '=')
    assert.equal(mapPrediction(at(0, 4)), '<')
    checkChallenges(mapChallenges, initialMapState, { 87301: at(3, 8), 87302: at(5, 12), 87303: at(1, 15), 87304: at(2, 8), 87305: at(5, 10) })
    checkExtras(mapExtra, initialMapState)
    // Every real distance is a whole number of metres
    for (let scale = 0; scale < 6; scale += 1) for (let halves = 1; halves <= 24; halves += 1) assert.ok(Number.isInteger(mapRealMetres(at(scale, halves))))
})

test('proportzionaltasuna 3. DBH lab: la receta y la despensa', () => {
    const at = (people: number, pantry: number): RecipeState => setRecipe(initialRecipeState, { people, pantry })
    // In each pantry a different ingredient runs out first
    assert.deepEqual([0, 1, 2].map((pantry) => recipeLimit(pantry).ingredient.id), ['eggs', 'flour', 'milk'])
    assert.deepEqual([0, 1, 2].map((pantry) => recipeLimit(pantry).people), [8, 12, 10])
    assert.equal(recipePrediction(at(8, 0)), '=')
    assert.equal(recipePrediction(at(9, 0)), '<')
    assert.equal(recipePrediction(at(4, 0)), '>')
    checkChallenges(recipeChallenges, initialRecipeState, { 87401: at(12, 0), 87402: at(8, 0), 87403: at(12, 1), 87404: at(10, 2), 87405: at(6, 0) })
    checkExtras(recipeExtra, initialRecipeState)
})
