import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker, LocalizedText } from '../src/features/unit-v2/lab/types.ts'
import { motions3LabChallengeIds, motions3LabToolForTopic, motions3LabTools } from '../src/pages/dbh3-mugimenduak/lab/labTools.ts'
import { modulus, placeFlag, reflect, rotate, translate, type Point } from '../src/pages/dbh3-mugimenduak/motion.ts'
import { initialSlideState, setSlide, slideChallenges, slideExtra, slideFlag, slideLength, slidePrediction, type SlideState } from '../src/pages/dbh3-mugimenduak/lab/slide.ts'
import { initialTurnState, setTurn, turnChallenges, turnExtra, turnFlag, turnPrediction, type TurnState } from '../src/pages/dbh3-mugimenduak/lab/turn.ts'
import { initialMirrorState, mirrorChallenges, mirrorExtra, mirrorFlag, mirrorPrediction, setMirror, type MirrorState } from '../src/pages/dbh3-mugimenduak/lab/mirror.ts'
import { initialTwoMirrorsState, reflectAt, setTwoMirrors, twoMirrorsChallenges, twoMirrorsExtra, twoMirrorsFlags, twoMirrorsPrediction, type TwoMirrorsState } from '../src/pages/dbh3-mugimenduak/lab/twoMirrors.ts'

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




const distance = (p: Point, q: Point) => Math.hypot(p[0] - q[0], p[1] - q[1])
/** Two flags are the same shape: the six distances between their four points match */
function congruent(first: Point[], second: Point[]) {
    for (let i = 0; i < first.length; i += 1) for (let j = i + 1; j < first.length; j += 1) assert.ok(Math.abs(distance(first[i], first[j]) - distance(second[i], second[j])) < 1e-6)
}
/** Turned the same way (> 0) or flipped (< 0): the sign of the area of the flag's triangle */
const orientation = ([, top, end, low]: Point[]) => Math.sign((end[0] - top[0]) * (low[1] - top[1]) - (end[1] - top[1]) * (low[0] - top[0]))

test('mugimenduak 3. DBH lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(motions3LabTools.length, 8)
    for (const stage of ['vectors', 'translations', 'rotations', 'reflections', 'patterns']) assert.ok(motions3LabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of motions3LabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
        assert.ok(!tool.observe.es.includes('$') && !tool.observe.eu.includes('$') && !tool.observe.ar.includes('$'), tool.id)
    }
    assert.equal(new Set(motions3LabChallengeIds).size, motions3LabChallengeIds.length)
    const own = [slideChallenges, turnChallenges, mirrorChallenges, twoMirrorsChallenges].flatMap((list) => list.map((challenge) => challenge.id))
    for (const id of own) assert.ok(id >= 97101 && id <= 97999, `${id}`)
    const topics = ['vector-components', 'vector-modulus', 'vector-sum', 'translation', 'translation-coordinates', 'translation-composition', 'rotation', 'rotation-coordinates', 'central-symmetry', 'axial-symmetry', 'reflection-coordinates', 'two-mirrors', 'friezes', 'tessellations', 'homothety']
    for (const topic of topics) assert.ok(motions3LabToolForTopic[topic], topic)
})

test('mugimenduak 3. DBH: the movements keep the shape; rotations keep its orientation and reflections flip it', () => {
    const flag = placeFlag([1, 0])
    for (const angle of [0, 90, 180, 270, 45, 30]) {
        const turned = flag.map((p) => rotate(p, angle, [1, -2]))
        congruent(flag, turned)
        assert.equal(orientation(turned), orientation(flag))
    }
    for (const axis of [{ kind: 'vertical', at: 2 }, { kind: 'horizontal', at: -1 }, { kind: 'diagonal' }] as const) {
        const image = flag.map((p) => reflect(p, axis))
        congruent(flag, image)
        assert.equal(orientation(image), -orientation(flag))
    }
    assert.deepEqual(rotate([3, 2], 90), [-2, 3])
    assert.deepEqual(rotate([3, 2], 180), [-3, -2])
    assert.deepEqual(rotate([3, 2], 270), [2, -3])
    assert.deepEqual(translate([3, 2], [4, -1]), [7, 1])
    assert.equal(modulus([-6, 8]), 10)
})

test('mugimenduak 3. DBH lab: desliza la bandera', () => {
    const at = (a: number, b: number): SlideState => setSlide(initialSlideState, { a, b })
    assert.equal(slideLength(at(3, 4)), 5)
    assert.equal(slidePrediction(at(3, 4)), '=')
    assert.equal(slidePrediction(initialSlideState), '<')
    congruent(placeFlag([-3, -2]), slideFlag(at(5, -3)))
    checkChallenges(slideChallenges, initialSlideState, { 97101: at(5, 3), 97102: at(3, 4), 97103: at(3, 2), 97104: at(0, 4), 97105: at(-4, -3) })
    checkExtras(slideExtra, initialSlideState)
})

test('mugimenduak 3. DBH lab: gira la bandera', () => {
    const at = (angle: number, x: number, y: number): TurnState => setTurn(initialTurnState, { angle, x, y })
    // The tip keeps its distance to the centre
    for (const angle of [90, 180, 270]) for (let x = -3; x <= 3; x += 1) for (let y = -3; y <= 3; y += 1) {
        const state = at(angle, x, y)
        assert.ok(Math.abs(distance(turnFlag(state)[2], [x, y]) - distance([3, 2], [x, y])) < 1e-9)
    }
    assert.equal(turnPrediction(at(90, 0, 0)), '<')
    checkChallenges(turnChallenges, initialTurnState, { 97201: at(90, 0, 0), 97202: at(180, 0, 0), 97203: at(180, 1, 1), 97204: at(270, 0, 0), 97205: at(90, 1, 2) })
    checkExtras(turnExtra, initialTurnState)
})

test('mugimenduak 3. DBH lab: el espejo', () => {
    const at = (kind: MirrorState['kind'], k: number): MirrorState => setMirror(initialMirrorState, { kind, k })
    // The mirror is the perpendicular bisector of each point and its image
    for (const kind of ['vertical', 'horizontal'] as const) for (let k = -3; k <= 3; k += 1) {
        const image = mirrorFlag(at(kind, k))
        placeFlag([1, 0]).forEach((p, index) => {
            const middle = [(p[0] + image[index][0]) / 2, (p[1] + image[index][1]) / 2]
            assert.equal(kind === 'vertical' ? middle[0] : middle[1], k)
        })
    }
    assert.equal(mirrorPrediction(at('horizontal', 0)), '=')
    assert.equal(mirrorPrediction(at('vertical', 0)), '<')
    assert.equal(mirrorPrediction(at('vertical', 3)), '=')
    checkChallenges(mirrorChallenges, initialMirrorState, { 97301: at('vertical', 0), 97302: at('horizontal', 0), 97303: at('diagonal', 0), 97304: at('vertical', 2), 97305: at('vertical', 3) })
    checkExtras(mirrorExtra, initialMirrorState)
})

test('mugimenduak 3. DBH lab: dos espejos', () => {
    const at = (mode: TwoMirrorsState['mode'], gap: number, angle: number): TwoMirrorsState => setTwoMirrors(initialTwoMirrorsState, { mode, gap, angle })
    // Parallel mirrors: a translation by 2d; crossing mirrors: a rotation by 2α
    for (let gap = -4; gap <= 4; gap += 1) {
        const { twice } = twoMirrorsFlags(at('parallel', gap, 30))
        placeFlag([1, 1]).forEach((p, index) => assert.deepEqual(twice[index], [p[0] + 2 * gap, p[1]]))
    }
    for (const angle of [15, 30, 45, 60, 90, 120]) {
        const { twice } = twoMirrorsFlags(at('crossing', 1, angle))
        placeFlag([1, 1]).forEach((p, index) => {
            const turned = rotate(p, 2 * angle)
            assert.ok(Math.abs(twice[index][0] - turned[0]) < 1e-9 && Math.abs(twice[index][1] - turned[1]) < 1e-9)
        })
    }
    assert.deepEqual(reflectAt([2, 0], 90), [-2, 0])
    assert.equal(twoMirrorsPrediction(initialTwoMirrorsState), '>')
    assert.equal(twoMirrorsPrediction(at('parallel', 0, 30)), '=')
    checkChallenges(twoMirrorsChallenges, initialTwoMirrorsState, { 97401: at('parallel', 3, 30), 97402: at('parallel', -4, 30), 97403: at('crossing', 1, 45), 97404: at('crossing', 1, 90), 97405: at('crossing', 1, 30) })
    checkExtras(twoMirrorsExtra, initialTwoMirrorsState)
})
