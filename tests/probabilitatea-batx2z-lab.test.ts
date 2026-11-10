import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { causesChallenges, causesExtra, causesPrediction, initialCausesState, pathsOf, posteriorOf, setRate, setShare, totalOf, type CausesState } from '../src/pages/batx2-zientziak-probabilitatea/lab/causes.ts'
import { EVENT_EXPRESSIONS, initialPaintState, namesOf, PAINT_TARGETS, paintChallenges, paintExtra, paintPrediction, setPainted, setTarget, toggleZone, ZONES, type PaintState, type ZoneSet } from '../src/pages/batx2-zientziak-probabilitatea/lab/events.ts'
import { probabilityBatx2LabChallengeIds, probabilityBatx2LabToolForTopic, probabilityBatx2LabTools } from '../src/pages/batx2-zientziak-probabilitatea/lab/labTools.ts'
import { aGivenB, bOf, initialMosaicState, isIndependent, mosaicChallenges, mosaicExtra, mosaicPrediction, piecesOf, setMosaic, type MosaicState } from '../src/pages/batx2-zientziak-probabilitatea/lab/mosaic.ts'
import { countsOf, illGivenPositive, initialPeopleState, peopleChallenges, peopleExtra, peoplePrediction, setPeople, type PeopleState } from '../src/pages/batx2-zientziak-probabilitatea/lab/people.ts'
import { probLatex } from '../src/pages/batx2-zientziak-probabilitatea/lab/probability.ts'
import { initialZonesState, setZones, unionOf, zonesChallenges, zonesExtra, zonesOf, zonesPrediction, type ZonesState } from '../src/pages/batx2-zientziak-probabilitatea/lab/zones.ts'
import { probabilityBatx2LessonChecks } from '../src/pages/batx2-zientziak-probabilitatea/lessonChecks.ts'

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

test('probabilitatea batx2 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(probabilityBatx2LabTools.length, 11)
    for (const stage of ['review', 'events', 'conditional', 'bayes']) assert.ok(probabilityBatx2LabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of probabilityBatx2LabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    }
    const own = ['paint', 'zones', 'mosaic', 'causes', 'people']
    for (const tool of probabilityBatx2LabTools.filter((item) => own.includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
        assert.ok(!/\d[a-zñ]/.test(tool.observe.eu), tool.observe.eu)
        assert.ok(/[؀-ۿ]/.test(tool.observe.ar) && tool.observe.eu !== tool.observe.es, tool.id)
    }
    assert.equal(new Set(probabilityBatx2LabChallengeIds).size, probabilityBatx2LabChallengeIds.length)
    // The five tools of this unit use the 1281xx block; the borrowed ones keep their ids
    for (const challenge of [...paintChallenges, ...zonesChallenges, ...mosaicChallenges, ...causesChallenges, ...peopleChallenges]) assert.ok(challenge.id >= 128101 && challenge.id <= 128399, `${challenge.id}`)
    const topics = Object.keys(probabilityBatx2LessonChecks)
    assert.deepEqual(Object.keys(probabilityBatx2LabToolForTopic).sort(), [...topics].sort())
    for (const [topic, tool] of Object.entries(probabilityBatx2LabToolForTopic)) assert.ok(probabilityBatx2LabTools.some((item) => item.id === tool), `${topic} → ${tool}`)
    for (const tool of probabilityBatx2LabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
})

test('probabilitatea batx2 z lab: an exact probability in LaTeX', () => {
    assert.equal(probLatex({ numerator: 1, denominator: 4 }), '0{,}25')
    assert.equal(probLatex({ numerator: 30, denominator: 195 }), '\\frac{2}{13}')
    assert.equal(probLatex({ numerator: 100, denominator: 100 }), '1')
    assert.equal(probLatex({ numerator: 1, denominator: 3 }), '\\frac{1}{3}')
})

test('probabilitatea batx2 z lab: pinta el suceso', () => {
    // Every set of zones has a name, and the sixteen sets are all there
    const keys = new Set(EVENT_EXPRESSIONS.map((expression) => expression.zones.map(Number).join('')))
    assert.equal(keys.size, 16)
    // De Morgan: two names for one zone
    assert.deepEqual(namesOf([false, false, false, true]).map((name) => name.id).sort(), ['neither', 'notOr'])
    assert.deepEqual(namesOf([true, false, true, true]).map((name) => name.id).sort(), ['notAOrNotB', 'notAnd'])
    for (const expression of PAINT_TARGETS) assert.ok(expression.zones.some(Boolean) && !expression.zones.every(Boolean), expression.id)
    // Painting and the prediction (zones of the target)
    const painted = toggleZone(toggleZone(initialPaintState, 'onlyA'), 'onlyA')
    assert.deepEqual(painted.painted, initialPaintState.painted)
    assert.equal(paintPrediction(initialPaintState), '<')
    const notAnd = PAINT_TARGETS.findIndex((item) => item.id === 'notAnd')
    assert.equal(paintPrediction(setTarget(initialPaintState, notAnd)), '>')
    // A new target forgets the painting and the prediction
    const predicted: PaintState = { ...toggleZone(initialPaintState, 'both'), prediction: '<' }
    assert.deepEqual(setTarget(predicted, notAnd), { painted: [false, false, false, false], target: notAnd, prediction: null })
    const paint = (...zones: string[]): PaintState => setPainted(initialPaintState, ZONES.map((zone) => zones.includes(zone)) as ZoneSet)
    checkChallenges(paintChallenges, initialPaintState, { 128101: paint('none'), 128102: paint('onlyA', 'onlyB', 'none'), 128103: paint('onlyA', 'onlyB') })
    checkExtras(paintExtra, initialPaintState, (state) => setPainted(state, state.painted))
})

test('probabilitatea batx2 z lab: las cuatro zonas', () => {
    assert.deepEqual(zonesOf(initialZonesState), [30, 20, 20, 30])
    assert.equal(unionOf(initialZonesState), 70)
    assert.equal(zonesPrediction(initialZonesState), '<')
    assert.equal(zonesPrediction({ ...initialZonesState, both: 0 }), '=')
    // The diagram is always possible: the intersection fits, the union does not pass 1
    for (const patch of [{ both: 60 }, { a: 100 }, { b: 95 }, { both: 0, a: 80 }]) {
        const state = setZones(initialZonesState, patch)
        assert.ok(zonesOf(state).every((zone) => zone >= 0), JSON.stringify(state))
        assert.equal(zonesOf(state).reduce((sum, zone) => sum + zone, 0), 100)
    }
    assert.equal(setZones({ ...initialZonesState, prediction: '<' }, { a: 55 }).prediction, null)
    const solutions: Record<number, ZonesState> = {
        128121: setZones(setZones(initialZonesState, { both: 0 }), { a: 30 }),
        128122: { a: 40, b: 50, both: 10, prediction: null },
        128123: { a: 40, b: 30, both: 15, prediction: null }
    }
    checkChallenges(zonesChallenges, initialZonesState, solutions)
    checkExtras(zonesExtra, initialZonesState, (state) => setZones(setZones(setZones(state, { both: state.both }), { a: state.a }), { b: state.b }))
})

test('probabilitatea batx2 z lab: el cuadrado de probabilidad', () => {
    // The starting square: P(A∩B) = 0,3, P(B) = 0,4, P(A/B) = 3/4 > P(A) = 0,5
    assert.deepEqual(piecesOf(initialMosaicState), [30, 20, 10, 40])
    assert.equal(bOf(initialMosaicState), 40)
    assert.deepEqual(aGivenB(initialMosaicState), { numerator: 3, denominator: 4 })
    assert.equal(mosaicPrediction(initialMosaicState), '>')
    // Cuts at the same height: independent, P(A/B) = P(A) and P(A∩B) = P(A)·P(B)
    for (let a = 1; a <= 9; a += 1) {
        for (let cut = 1; cut <= 10; cut += 1) {
            const state: MosaicState = { a, bGivenA: cut, bGivenNotA: cut, prediction: null }
            assert.ok(isIndependent(state))
            assert.equal(mosaicPrediction(state), '=')
            assert.equal(piecesOf(state)[0] * 100, a * 10 * bOf(state))
        }
    }
    assert.equal(aGivenB({ a: 5, bGivenA: 0, bGivenNotA: 0 }), null)
    assert.equal(setMosaic({ ...initialMosaicState, prediction: '>' }, { bGivenNotA: 3 }).prediction, null)
    assert.equal(setMosaic(initialMosaicState, { a: 12 }).a, 9)
    const solutions: Record<number, MosaicState> = {
        128141: { a: 3, bGivenA: 6, bGivenNotA: 6, prediction: null },
        128142: { a: 5, bGivenA: 6, bGivenNotA: 0, prediction: null },
        128143: { a: 4, bGivenA: 3, bGivenNotA: 5, prediction: null }
    }
    checkChallenges(mosaicChallenges, initialMosaicState, solutions)
    checkExtras(mosaicExtra, initialMosaicState, (state) => setMosaic(state, state))
})

test('probabilitatea batx2 z lab: las causas en el cuadrado', () => {
    // 0,5 · 0,05 + 0,3 · 0,1 + 0,2 · 0,2 = 0,095; the smallest maker is the likeliest cause
    assert.deepEqual(pathsOf(initialCausesState), [25, 30, 40])
    assert.equal(totalOf(initialCausesState), 95)
    assert.deepEqual(posteriorOf(initialCausesState, 2), { numerator: 8, denominator: 19 })
    assert.equal(causesPrediction(initialCausesState), '>')
    // The shares always add up to 10, with at least one tenth each
    for (const share of [0, 1, 4, 7, 9]) {
        const state = setShare(initialCausesState, 0, share)
        assert.equal(state.shares.reduce((sum, value) => sum + value, 0), 10)
        assert.ok(state.shares.every((value) => value >= 1), JSON.stringify(state.shares))
    }
    assert.equal(setRate({ ...initialCausesState, prediction: '<' }, 1, 11).prediction, null)
    assert.equal(setRate(initialCausesState, 2, 140).rates[2], 100)
    const solutions: Record<number, CausesState> = {
        128161: { ...initialCausesState, shares: [8, 1, 1], rates: [10, 20, 30] },
        128162: { ...initialCausesState, rates: [6, 10, 20] },
        128163: { ...initialCausesState, rates: [5, 15, 10] }
    }
    checkChallenges(causesChallenges, initialCausesState, solutions)
    checkExtras(causesExtra, initialCausesState, (state) => [0, 1, 2].reduce<CausesState>((current, cause) => setRate(current, cause as 0 | 1 | 2, state.rates[cause]), setShare(setShare(state, 0, state.shares[0]), 1, state.shares[1])))
})

test('probabilitatea batx2 z lab: 10 000 personas', () => {
    // The lesson's test: 1 %, 99 % and 1 % give as many false positives as true ones
    const lesson = setPeople(initialPeopleState, { prevalence: 1, sensitivity: 99, falsePositive: 1 })
    assert.deepEqual(countsOf(lesson), { ill: 100, truePositive: 99, falseNegative: 1, falsePositive: 99, trueNegative: 9801 })
    assert.equal(peoplePrediction(lesson), '=')
    // The starting test: 90 true positives and 495 false ones
    assert.deepEqual(illGivenPositive(initialPeopleState), { numerator: 2, denominator: 13 })
    assert.equal(peoplePrediction(initialPeopleState), '<')
    // Every group is a whole number of people for every setting
    for (let prevalence = 1; prevalence <= 50; prevalence += 7) {
        for (let falsePositive = 0; falsePositive <= 30; falsePositive += 3) {
            const counts = countsOf({ prevalence, sensitivity: 87, falsePositive })
            assert.ok(Object.values(counts).every(Number.isInteger), `${prevalence} ${falsePositive}`)
            assert.equal(counts.truePositive + counts.falseNegative + counts.falsePositive + counts.trueNegative, 10_000)
        }
    }
    const solutions: Record<number, PeopleState> = {
        128181: setPeople(initialPeopleState, { prevalence: 20, sensitivity: 100, falsePositive: 2 }),
        128182: setPeople(initialPeopleState, { prevalence: 10, sensitivity: 90, falsePositive: 10 }),
        128183: setPeople(initialPeopleState, { prevalence: 1, sensitivity: 100, falsePositive: 2 })
    }
    checkChallenges(peopleChallenges, initialPeopleState, solutions)
    checkExtras(peopleExtra, initialPeopleState, (state) => setPeople(state, state))
})
