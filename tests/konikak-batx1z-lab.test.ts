import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { compareTo } from '../src/pages/dbh3-segidak/lab/prediction.ts'
import { bachConicsLabChallengeIds, bachConicsLabToolForTopic, bachConicsLabTools } from '../src/pages/batx1-zientziak-konikak/lab/labTools.ts'
import { directrixChallenges, directrixExtra, directrixPrediction, halfLatex, initialDirectrixState, onParabola, parabolaValue, setDirectrix, toDirectrix as parabolaToDirectrix, toFocus as parabolaToFocus, wholePoints, type DirectrixState } from '../src/pages/batx1-zientziak-konikak/lab/directrix.ts'
import { angleRange, curvePoints, eccentricityChallenges, eccentricityExtra, eccentricityPrediction, eLatex, initialEccentricityState, pointOf, setEccentricity, toDirectrix, toFocus, validAngle, type EccentricityState } from '../src/pages/batx1-zientziak-konikak/lab/eccentricity.ts'
import { ellipseValue, gardenerChallenges, gardenerExtra, gardenerLatex, gardenerPrediction, initialGardenerState, onEllipse, setGardener, stringSum, type GardenerState } from '../src/pages/batx1-zientziak-konikak/lab/gardener.ts'

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
function checkExtras<State>(maker: LabChallengeMaker<State>, initial: State, setter: (state: State) => State) {
    const prompts = new Set<string>()
    for (let seed = 1; seed <= 150; seed += 1) {
        const challenge = maker(createRandom(seed * 7919 + 3))
        assert.ok(challenge.isSolved(challenge.solution), `seed ${seed}: ${challenge.prompt.es}`)
        // The solution is a state the controls can reach
        assert.deepEqual(setter(challenge.solution), challenge.solution, `seed ${seed}: unreachable ${challenge.prompt.es}`)
        assert.ok(!challenge.isSolved(initial), `seed ${seed} starts solved`)
        checkTexts([challenge.prompt, challenge.hint])
        prompts.add(challenge.prompt.es)
    }
    assert.ok(prompts.size >= 6, `only ${prompts.size} different challenges`)
}

test('konikak batx1 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(bachConicsLabTools.length, 5)
    for (const stage of ['loci', 'circle', 'ellipse', 'hyperbola', 'parabola']) assert.ok(bachConicsLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of bachConicsLabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    }
    // The «Observe» text of the tools of this unit is plain text, not LaTeX
    for (const tool of bachConicsLabTools.filter((item) => ['gardener', 'eccentricity', 'directrix'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
    }
    assert.equal(new Set(bachConicsLabChallengeIds).size, bachConicsLabChallengeIds.length)
    // The three tools of this unit use the 107xxx block; the borrowed ones keep their ids
    const own = [...gardenerChallenges, ...directrixChallenges, ...eccentricityChallenges].map((challenge) => challenge.id)
    for (const id of own) assert.ok(id >= 107101 && id <= 107399, `${id}`)
    const topics = ['perpendicular-bisector', 'angle-bisectors', 'distance-loci', 'circle-equation', 'circle-general', 'circle-line', 'two-circles', 'ellipse-definition', 'ellipse-elements', 'ellipse-shifted', 'hyperbola-definition', 'hyperbola-asymptotes', 'parabola-definition', 'parabola-positions', 'recognize-conic']
    for (const topic of topics) assert.ok(bachConicsLabToolForTopic[topic], topic)
    for (const [topic, tool] of Object.entries(bachConicsLabToolForTopic)) {
        assert.ok(topics.includes(topic), topic)
        assert.ok(bachConicsLabTools.some((item) => item.id === tool), `${topic} → ${tool}`)
    }
    for (const tool of bachConicsLabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
})

test('konikak batx1 z lab: el jardinero', () => {
    const at = (patch: Partial<GardenerState>) => setGardener(initialGardenerState, patch)
    const start = at({})
    assert.equal(ellipseValue(start), -20)
    assert.equal(gardenerPrediction(start), '<')
    // The whole-number test agrees with the sum of the two string pieces everywhere on the board
    for (let c = 0; c <= 4; c += 1) {
        for (let a = c + 1; a <= 6; a += 1) {
            for (let x = -6; x <= 6; x += 1) {
                for (let y = -5; y <= 5; y += 1) {
                    const state = at({ c, a, p: [x, y] })
                    assert.equal(gardenerPrediction(state), compareTo(stringSum(state), 2 * a), `c=${c} a=${a} P(${x},${y})`)
                }
            }
        }
    }
    // The string is always longer than the distance between the nails
    assert.equal(at({ c: 4 }).a, 5)
    assert.equal(at({ a: 2 }).a, 4)
    assert.deepEqual(at({ p: [9, -9] }).p, [6, -5])
    assert.ok(onEllipse(at({ c: 4, a: 5, p: [0, 3] })))
    assert.ok(onEllipse(at({ c: 2, a: 4, p: [2, -3] })))
    assert.ok(Math.abs(stringSum(at({ c: 2, a: 4, p: [2, 3] })) - 8) < 1e-12)
    assert.equal(gardenerLatex({ a: 5, c: 4 }), '\\frac{x^2}{25}+\\frac{y^2}{9}=1')
    assert.equal(gardenerLatex({ a: 4, c: 0 }), 'x^2+y^2=16')
    const predicted = { ...initialGardenerState, prediction: '<' as const }
    assert.equal(setGardener(predicted, { a: 5 }).prediction, null)
    assert.equal(setGardener(predicted, { p: initialGardenerState.p }).prediction, '<')
    checkChallenges(gardenerChallenges, initialGardenerState, {
        107101: at({ c: 4, a: 5, p: [0, 3] }),
        107102: at({ c: 3, a: 5 }),
        107103: at({ c: 0, a: 4 }),
        107104: at({ c: 3, a: 5 }),
        107105: at({ c: 2, a: 4, p: [2, 3] })
    })
    checkExtras(gardenerExtra, initialGardenerState, (state) => setGardener(state, state))
})

test('konikak batx1 z lab: foco y directriz', () => {
    const at = (patch: Partial<DirectrixState>) => setDirectrix(initialDirectrixState, patch)
    const start = at({})
    assert.equal(parabolaValue(start), -2)
    assert.equal(directrixPrediction(start), '<')
    // The whole-number test agrees with the two distances everywhere on the board
    for (let p = 1; p <= 6; p += 1) {
        for (let x = -4; x <= 8; x += 1) {
            for (let y = -6; y <= 6; y += 1) {
                const state = at({ p, point: [x, y] })
                assert.equal(directrixPrediction(state), compareTo(parabolaToFocus(state), parabolaToDirectrix(state)), `p=${p} P(${x},${y})`)
            }
        }
    }
    assert.ok(onParabola(at({ p: 6, point: [3, 6] })))
    assert.deepEqual(wholePoints(1), [[8, -4], [2, -2], [2, 2], [8, 4]])
    assert.deepEqual(wholePoints(5), [])
    for (let p = 1; p <= 6; p += 1) for (const point of wholePoints(p)) assert.ok(onParabola({ p, point }))
    assert.equal(halfLatex(3), '\\frac{3}{2}')
    assert.equal(halfLatex(4), '2')
    assert.deepEqual(at({ point: [-9, 9] }).point, [-4, 6])
    assert.equal(at({ p: 9 }).p, 6)
    const predicted = { ...initialDirectrixState, prediction: '<' as const }
    assert.equal(setDirectrix(predicted, { p: 2 }).prediction, null)
    assert.equal(setDirectrix(predicted, { point: initialDirectrixState.point }).prediction, '<')
    checkChallenges(directrixChallenges, initialDirectrixState, {
        107201: at({ p: 4, point: [2, 4] }),
        107202: at({ p: 1 }),
        107203: at({ p: 6, point: [3, 6] }),
        107204: at({ p: 2, point: [1, -2] }),
        107205: at({ p: 2, point: [4, 4] })
    })
    checkExtras(directrixExtra, initialDirectrixState, (state) => setDirectrix(state, state))
})

test('konikak batx1 z lab: la excentricidad', () => {
    const at = (patch: Partial<EccentricityState>) => setEccentricity(initialEccentricityState, patch)
    const start = at({})
    assert.equal(eccentricityPrediction(start), '<')
    assert.equal(eccentricityPrediction(at({ k: 4 })), '=')
    assert.equal(eccentricityPrediction(at({ k: 7 })), '>')
    assert.deepEqual(angleRange(3), { min: -150, max: 180 })
    assert.deepEqual(angleRange(4), { min: -150, max: 150 })
    assert.deepEqual(angleRange(6), { min: -120, max: 120 })
    assert.deepEqual(angleRange(8), { min: -90, max: 90 })
    assert.equal(setEccentricity(at({ angle: 180 }), { k: 8 }).angle, 90)
    // e = 0 is the circle of radius 2 round the focus
    for (let angle = -150; angle <= 180; angle += 30) assert.ok(Math.abs(toFocus({ k: 0, angle }) - 2) < 1e-12)
    assert.equal(toDirectrix({ k: 0, angle: 30 }), null)
    // Everywhere the curve exists, d(P, F) = e · d(P, directrix), and P is at distance r from F
    for (let k = 1; k <= 8; k += 1) {
        const range = angleRange(k)
        for (let angle = range.min; angle <= range.max; angle += 30) {
            assert.ok(validAngle(k, angle), `${k} ${angle}`)
            const state = { k, angle }
            assert.ok(Math.abs(toFocus(state) - (k / 4) * (toDirectrix(state) ?? 0)) < 1e-9, `${k} ${angle}`)
            const [x, y] = pointOf(state)
            assert.ok(Math.abs(Math.hypot(x, y) - toFocus(state)) < 1e-9)
        }
        assert.ok(curvePoints(k).length > 20, `${k}`)
    }
    assert.deepEqual([0, 1, 2, 3, 4, 5, 6, 7, 8].map(eLatex), ['0', '\\frac{1}{4}', '\\frac{1}{2}', '\\frac{3}{4}', '1', '\\frac{5}{4}', '\\frac{3}{2}', '\\frac{7}{4}', '2'])
    const predicted = { ...initialEccentricityState, prediction: '<' as const }
    assert.equal(setEccentricity(predicted, { k: 5 }).prediction, null)
    assert.equal(setEccentricity(predicted, { angle: 90 }).prediction, '<')
    checkChallenges(eccentricityChallenges, initialEccentricityState, {
        107301: at({ k: 0 }),
        107302: at({ k: 4 }),
        107303: at({ k: 2 }),
        107304: at({ k: 5 }),
        107305: at({ k: 2, angle: 0 })
    })
    checkExtras(eccentricityExtra, initialEccentricityState, (state) => setEccentricity(state, state))
})
