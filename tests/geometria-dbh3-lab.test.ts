import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker, LocalizedText } from '../src/features/unit-v2/lab/types.ts'
import { geometry3LabChallengeIds, geometry3LabToolForTopic, geometry3LabTools } from '../src/pages/dbh3-geometria/lab/labTools.ts'
import { angleAt, inscribedChallenges, inscribedExtra, inscribedPrediction, initialInscribedState, onNearArc, setInscribed, type InscribedState } from '../src/pages/dbh3-geometria/lab/inscribed.ts'
import { initialNotableState, notableChallenges, notableExtra, notablePlace, notablePoint, notablePrediction, setNotable, type NotableKind, type NotableState, type Point } from '../src/pages/dbh3-geometria/lab/notable.ts'
import { initialLadderState, LADDER_LENGTHS, LADDER_TRIPLES, ladderChallenges, ladderDrop, ladderExtra, ladderPrediction, ladderTop, setLadder, type LadderState } from '../src/pages/dbh3-geometria/lab/ladder.ts'
import { enlargeChallenges, enlargedArea, enlargedPerimeter, enlargeExtra, enlargePrediction, FACTORS, initialEnlargeState, setEnlarge, SHAPE_SIZES, SHAPES, type EnlargeState } from '../src/pages/dbh3-geometria/lab/enlarge.ts'

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

function checkChallenges<State>(challenges: LabChallenge<State>[], initial: State, solutions: Record<number, State>) {
    assert.equal(new Set(challenges.map((challenge) => challenge.id)).size, challenges.length)
    for (const challenge of challenges) {
        assert.ok(challenge.isSolved(solutions[challenge.id]), `${challenge.id} is not solved by its solution`)
        assert.ok(!challenge.isSolved(initial), `${challenge.id} starts solved`)
    }
    checkTexts(challenges.flatMap((challenge) => [challenge.prompt, challenge.hint]))
}

function checkExtras<State>(maker: LabChallengeMaker<State>, initial: State, minimum = 6) {
    const prompts = new Set<string>()
    for (let seed = 1; seed <= 150; seed += 1) {
        const challenge = maker(createRandom(seed * 7919 + 3))
        assert.ok(challenge.isSolved(challenge.solution), `seed ${seed}: ${challenge.prompt.es}`)
        assert.ok(!challenge.isSolved(initial), `seed ${seed} starts solved`)
        checkTexts([challenge.prompt, challenge.hint])
        prompts.add(challenge.prompt.es)
    }
    assert.ok(prompts.size >= minimum, `only ${prompts.size} different challenges`)
}



test('geometria 3. DBH lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(geometry3LabTools.length, 10)
    for (const stage of ['angles', 'loci', 'pythagoras', 'areas', 'similarity']) assert.ok(geometry3LabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of geometry3LabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
        assert.ok(!tool.observe.es.includes('$') && !tool.observe.eu.includes('$') && !tool.observe.ar.includes('$'), tool.id)
    }
    assert.equal(new Set(geometry3LabChallengeIds).size, geometry3LabChallengeIds.length)
    const own = [inscribedChallenges, notableChallenges, ladderChallenges, enlargeChallenges].flatMap((list) => list.map((challenge) => challenge.id))
    for (const id of own) assert.ok(id >= 95101 && id <= 95999, `${id}`)
    const topics = ['polygon-angles', 'regular-polygons', 'circle-angles', 'perpendicular-bisector', 'angle-bisector', 'notable-points', 'pythagoras', 'pythagoras-figures', 'pythagoras-problems', 'polygon-areas', 'regular-area', 'circle-areas', 'thales', 'similar-triangles', 'scale-areas']
    for (const topic of topics) assert.ok(geometry3LabToolForTopic[topic], topic)
})

test('geometria 3. DBH lab: el ángulo inscrito', () => {
    const at = (central: number, p: number): InscribedState => setInscribed(initialInscribedState, { central, p })
    // Worked out from the points, the angle is half the central one on the far arc and 180° minus it on the near arc
    for (let central = 20; central <= 340; central += 10) {
        for (let p = 0; p < 360; p += 10) {
            const state = at(central, p)
            const expected = onNearArc(state) ? 180 - central / 2 : central / 2
            assert.ok(Math.abs(angleAt(state.central, state.p) - expected) < 1e-6, `${central} ${p}`)
        }
    }
    assert.equal(inscribedPrediction(at(180, 90)), '=')
    assert.equal(inscribedPrediction(initialInscribedState), '<')
    checkChallenges(inscribedChallenges, initialInscribedState, { 95101: at(180, 90), 95102: at(100, 90), 95103: at(100, 270), 95104: at(70, 90), 95105: at(160, 90) })
    checkExtras(inscribedExtra, initialInscribedState)
})

test('geometria 3. DBH lab: los puntos notables', () => {
    const at = (kind: NotableKind, x: number, y: number): NotableState => setNotable(initialNotableState, { kind, x, y })
    const distance = (p: Point, q: Point) => Math.hypot(p[0] - q[0], p[1] - q[1])
    for (let x = -2; x <= 8; x += 1) {
        for (let y = 1; y <= 7; y += 1) {
            const c: Point = [x, y]
            // The circumcentre is the same distance from the three vertices
            const o = notablePoint('circumcentre', c)
            assert.ok(Math.abs(distance(o, [0, 0]) - distance(o, c)) < 1e-9 && Math.abs(distance(o, [6, 0]) - distance(o, c)) < 1e-9)
            // The orthocentre: each altitude is perpendicular to the opposite side
            const h = notablePoint('orthocentre', c)
            assert.ok(Math.abs((h[0] - 0) * (c[0] - 6) + (h[1] - 0) * (c[1] - 0)) < 1e-9)
            assert.ok(Math.abs((h[0] - 6) * (c[0] - 0) + (h[1] - 0) * (c[1] - 0)) < 1e-9)
            // The incentre and the centroid are always inside
            assert.equal(notablePlace(at('incentre', x, y)), 'inside')
            assert.equal(notablePlace(at('centroid', x, y)), 'inside')
        }
    }
    assert.equal(notablePrediction(at('circumcentre', 3, 3)), '=')
    assert.equal(notablePrediction(at('orthocentre', -2, 2)), '>')
    checkChallenges(notableChallenges, initialNotableState, { 95201: at('circumcentre', 3, 3), 95202: at('orthocentre', -2, 2), 95203: at('orthocentre', 0, 4), 95204: at('centroid', 3, 6), 95205: at('incentre', 3, 5) })
    checkExtras(notableExtra, initialNotableState)
})

test('geometria 3. DBH lab: la escalera', () => {
    const at = (length: number, foot: number): LadderState => setLadder(initialLadderState, { length, foot })
    for (const length of LADDER_LENGTHS) for (const [d, top] of LADDER_TRIPLES[length]) assert.equal(ladderTop(length, d), top)
    // Near the wall the top drops less than a metre, far from it more
    assert.equal(ladderPrediction(at(13, 1)), '<')
    assert.equal(ladderPrediction(at(13, 11)), '>')
    assert.ok(ladderDrop(at(25, 20)) > ladderDrop(at(25, 10)))
    assert.equal(setLadder(at(5, 4), { foot: 9 }).foot, 4)
    checkChallenges(ladderChallenges, initialLadderState, { 95301: at(13, 5), 95302: at(10, 6), 95303: at(17, 8), 95304: at(25, 7), 95305: at(5, 4) })
    checkExtras(ladderExtra, initialLadderState)
})

test('geometria 3. DBH lab: ampliar figuras', () => {
    const at = (shape: EnlargeState['shape'], k: number): EnlargeState => setEnlarge(initialEnlargeState, { shape, k })
    for (const shape of SHAPES) for (const k of FACTORS) {
        assert.equal(enlargedArea(at(shape, k)), SHAPE_SIZES[shape].area * k * k)
        assert.equal(enlargedPerimeter(at(shape, k)), SHAPE_SIZES[shape].perimeter * k)
    }
    assert.equal(enlargePrediction(at('triangle', 2)), '>')
    assert.equal(enlargePrediction(at('triangle', 0.5)), '<')
    assert.equal(enlargePrediction(initialEnlargeState), '=')
    checkChallenges(enlargeChallenges, initialEnlargeState, { 95401: at('rectangle', 2), 95402: at('triangle', 3), 95403: at('rectangle', 1.5), 95404: at('rectangle', 0.5), 95405: at('step', 3) })
    checkExtras(enlargeExtra, initialEnlargeState)
})
