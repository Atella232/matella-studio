import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker, LocalizedText } from '../src/features/unit-v2/lab/types.ts'
import { powersLabChallengeIds, powersLabToolForTopic, powersLabTools } from '../src/pages/dbh3-berreturak/lab/labTools.ts'
import { initialScaleState, revealScale, scaleChallenges, scaleCorrect, scaleExtra, scaleObjects, setScale, type ScaleState } from '../src/pages/dbh3-berreturak/lab/scale.ts'
import { initialSpiralState, setSpiral, spiralChallenges, spiralExtra, spiralPoints, type SpiralState } from '../src/pages/dbh3-berreturak/lab/spiral.ts'
import { initialSquareState, isPerfectSquare, maxSide, setSquare, squareChallenges, squareExtra, squareFits, squareInside, squareSimplified, type SquareState } from '../src/pages/dbh3-berreturak/lab/square.ts'
import { initialTokensState, setTokens, tokensCancelled, tokensChallenges, tokensExtra, tokensNet, tokensValue, type TokensState } from '../src/pages/dbh3-berreturak/lab/tokens.ts'

const languages = ['eu', 'es', 'ar'] as const

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true, strict: 'error' })
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

test('berreturak 3. DBH lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(powersLabTools.length, 10)
    const stages = ['powers', 'scientific', 'roots', 'reals', 'approx']
    for (const tool of powersLabTools) assert.ok(stages.includes(tool.stage), tool.id)
    for (const stage of stages) assert.ok(powersLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of powersLabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
        // The «what to notice» text is plain: no LaTeX
        assert.ok(!tool.observe.es.includes('$') && !tool.observe.eu.includes('$') && !tool.observe.ar.includes('$'), tool.id)
    }
    assert.equal(new Set(powersLabChallengeIds).size, powersLabChallengeIds.length)
    for (const tool of Object.values(powersLabToolForTopic)) assert.ok(powersLabTools.some((candidate) => candidate.id === tool))
    const topics = ['power-sign', 'negative-zero', 'power-rules', 'sci-write', 'sci-compare', 'sci-ops', 'roots', 'extract', 'introduce', 'radical-ops', 'irrational', 'real-line', 'intervals', 'rounding', 'errors']
    for (const topic of topics) assert.ok(powersLabToolForTopic[topic], topic)
    assert.ok(powersLabChallengeIds.includes(36101) && powersLabChallengeIds.includes(36405))
})

test('berreturak 3. DBH lab: fichas de factores', () => {
    assert.equal(tokensNet({ base: 0, m: 2, n: 3, p: 4 }), 1)
    assert.equal(tokensCancelled({ base: 0, m: 2, n: 3, p: 4 }), 4)
    assert.equal(tokensCancelled({ base: 0, m: 1, n: 1, p: 6 }), 2)
    assert.deepEqual(tokensValue({ base: 1, m: 1, n: 0, p: 4 }), { numerator: 1, denominator: 27 })
    assert.deepEqual(tokensValue({ base: 2, m: 3, n: 0, p: 0 }), { numerator: 125, denominator: 1 })
    assert.equal(tokensNet(setTokens(initialTokensState, { m: 99, n: -5, p: 99 })), 6 - 10)
    const at = (m: number, n: number, p: number): TokensState => setTokens(initialTokensState, { m, n, p })
    checkChallenges(tokensChallenges, initialTokensState, { 36101: at(3, 3, 1), 36102: at(2, 2, 4), 36103: at(1, 0, 4), 36104: at(3, 2, 3), 36105: at(2, 2, 5) })
    checkExtras(tokensExtra, initialTokensState)
})

test('berreturak 3. DBH lab: el cuadrado de la raíz', () => {
    assert.equal(maxSide(72), 6)
    assert.equal(maxSide(50), 5)
    assert.equal(maxSide(45), 3)
    assert.equal(maxSide(13), 1)
    assert.ok(isPerfectSquare(81) && !isPerfectSquare(80))
    assert.ok(squareFits({ n: 72, s: 6 }) && !squareFits({ n: 72, s: 4 }) && squareFits({ n: 72, s: 3 }))
    assert.equal(squareInside({ n: 72, s: 6 }), 2)
    assert.equal(squareInside({ n: 72, s: 3 }), 8)
    assert.equal(squareInside({ n: 72, s: 5 }), null)
    assert.ok(squareSimplified({ n: 72, s: 6 }) && !squareSimplified({ n: 72, s: 3 }) && !squareSimplified({ n: 72, s: 4 }))
    assert.deepEqual(setSquare(initialSquareState, { n: 999, s: 0 }), { n: 200, s: 1 })
    const at = (n: number, s: number): SquareState => ({ n, s })
    checkChallenges(squareChallenges, initialSquareState, { 36201: at(72, 6), 36202: at(45, 3), 36203: at(81, 9), 36204: at(80, 4), 36205: at(50, 3) })
    checkExtras(squareExtra, initialSquareState)
    // Every n up to 200 can be simplified by the block that fits last
    for (let n = 2; n <= 200; n += 1) assert.ok(squareSimplified({ n, s: maxSide(n) }), `${n}`)
})

test('berreturak 3. DBH lab: la escala de magnitudes', () => {
    assert.equal(scaleObjects.length, 13)
    for (const object of scaleObjects) {
        const mantissa = Number(object.mantissa.replace(',', '.'))
        assert.ok(mantissa >= 1 && mantissa < 10, object.id)
        checkTexts([object.name])
    }
    // Sorted from the smallest to the largest
    const sizes = scaleObjects.map((object) => Number(object.mantissa.replace(',', '.')) * 10 ** object.exponent)
    assert.deepEqual([...sizes].sort((a, b) => a - b), sizes)
    const person = scaleObjects.findIndex((object) => object.id === 'person')
    const guessed = (object: number, guess: number): ScaleState => revealScale(setScale(initialScaleState, { object, guess }))
    assert.ok(scaleCorrect({ object: person, guess: 0 }) && !scaleCorrect({ object: person, guess: 1 }))
    // A new prediction closes the answer
    assert.equal(setScale(guessed(person, 0), { guess: 1 }).revealed, false)
    // Wrong guesses are not remembered, right ones are, and only once
    assert.deepEqual(guessed(person, 3).right, [])
    assert.deepEqual(revealScale(guessed(person, 0)).right, [person])
    const id = (name: string) => scaleObjects.findIndex((object) => object.id === name)
    checkChallenges(scaleChallenges, initialScaleState, {
        36301: guessed(id('person'), 0),
        36302: guessed(id('cell'), -6),
        36303: guessed(id('orbit'), 11),
        36304: guessed(id('virus'), -7),
        36305: { ...initialScaleState, right: [1, 2, 3] }
    })
    // A wrong answer does not solve a challenge
    assert.ok(!scaleChallenges[0].isSolved(guessed(person, 2)))
    checkExtras(scaleExtra, initialScaleState)
})

test('berreturak 3. DBH lab: la espiral de raíces', () => {
    const points = spiralPoints(17)
    assert.equal(points.length, 17)
    points.forEach((point, index) => assert.ok(Math.abs(Math.hypot(point.x, point.y) - Math.sqrt(index + 1)) < 1e-9, `P${index + 1}`))
    // Each leg between consecutive vertices measures 1 and is perpendicular to the previous hypotenuse
    for (let index = 0; index + 1 < points.length; index += 1) {
        const a = points[index]
        const b = points[index + 1]
        assert.ok(Math.abs(Math.hypot(b.x - a.x, b.y - a.y) - 1) < 1e-9, `leg ${index + 1}`)
        assert.ok(Math.abs(a.x * (b.x - a.x) + a.y * (b.y - a.y)) < 1e-9, `perpendicular ${index + 1}`)
    }
    assert.deepEqual(setSpiral(99), { n: 17 })
    assert.deepEqual(setSpiral(-4), { n: 2 })
    const at = (n: number): SpiralState => ({ n })
    checkChallenges(spiralChallenges, initialSpiralState, { 36401: at(5), 36402: at(13), 36403: at(9), 36404: at(10), 36405: at(13) })
    // √16 is also an exact root beyond 9; 9 and 16 are the only ones in range
    assert.ok(spiralChallenges[2].isSolved(at(16)) && !spiralChallenges[2].isSolved(at(12)))
    checkExtras(spiralExtra, initialSpiralState)
})
