import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker, LocalizedText } from '../src/features/unit-v2/lab/types.ts'
import { polynomials3LabChallengeIds, polynomials3LabToolForTopic, polynomials3LabTools } from '../src/pages/dbh3-polinomioak/lab/labTools.ts'
import { CHIP_DECKS, chipsChallenges, chipsLatex, chipsPrediction, chipsReduced, initialChipsState, randomDeck, reduceChips, startDeck, tapChip, type ChipsState } from '../src/pages/dbh3-polinomioak/lab/chips.ts'
import { initialSquareState, setSquare, squareArea, squareChallenges, squareExtra, squareNaive, squarePrediction, type SquareState } from '../src/pages/dbh3-polinomioak/lab/binomialSquare.ts'
import { initialMachineState, machineChallenges, machineExtra, machinePrediction, machineRemainder, machineRoots, MACHINE_POLYNOMIALS, ruffiniTable, setMachine, valueAt, type MachineState } from '../src/pages/dbh3-polinomioak/lab/remainderMachine.ts'
import { factorChallenges, factorExtra, factorFits, factorPair, factorPrediction, initialFactorState, setFactor, TRINOMIALS, type FactorState } from '../src/pages/dbh3-polinomioak/lab/factorRectangle.ts'

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

test('polinomioak 3. DBH lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(polynomials3LabTools.length, 8)
    for (const stage of ['algebra', 'operations', 'identities', 'ruffini', 'factor']) assert.ok(polynomials3LabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of polynomials3LabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
        assert.ok(!tool.observe.es.includes('$') && !tool.observe.eu.includes('$') && !tool.observe.ar.includes('$'), tool.id)
    }
    assert.equal(new Set(polynomials3LabChallengeIds).size, polynomials3LabChallengeIds.length)
    const own = [chipsChallenges, squareChallenges, machineChallenges, factorChallenges].flatMap((list) => list.map((challenge) => challenge.id))
    for (const id of own) assert.ok(id >= 91101 && id <= 91999, `${id}`)
    const topics = ['expressions', 'monomials', 'value', 'add-sub', 'product', 'division', 'square-sum', 'square-diff', 'sum-diff', 'ruffini', 'remainder', 'roots', 'common-factor', 'factor-identities', 'algebraic-fractions']
    for (const topic of topics) assert.ok(polynomials3LabToolForTopic[topic], topic)
})

test('polinomioak 3. DBH lab: las fichas de monomios', () => {
    const reduced = (deck: number): ChipsState => ({ ...startDeck(deck), chips: reduceChips(CHIP_DECKS[deck]) })
    assert.equal(chipsLatex(reduceChips(CHIP_DECKS[0])), '5x^{2}+3x+5')
    assert.equal(chipsPrediction(initialChipsState), '=')
    // Two like chips join; two unlike chips are refused
    const joined = tapChip(tapChip(initialChipsState, 0), 1)
    assert.ok(joined.refused)
    assert.equal(joined.chips.length, 5)
    const merged = tapChip(tapChip(initialChipsState, 0), 2)
    assert.equal(merged.chips.length, 4)
    assert.equal(merged.chips[0].coefficient, 5)
    // Opposite chips disappear
    const gone = tapChip(tapChip(startDeck(1), 0), 2)
    assert.equal(gone.chips.length, 4)
    assert.ok(!chipsReduced(initialChipsState))
    checkChallenges(chipsChallenges, initialChipsState, { 91101: reduced(0), 91102: reduced(1), 91103: reduced(2), 91104: reduced(3), 91105: reduced(4) })
    for (let seed = 1; seed <= 60; seed += 1) {
        const deck = randomDeck(createRandom(seed * 31 + 7))
        assert.ok(!chipsReduced(deck) || reduceChips(deck.original).length < deck.original.length)
    }
})

test('polinomioak 3. DBH lab: el cuadrado del binomio', () => {
    const at = (mode: SquareState['mode'], a: number, b: number): SquareState => setSquare({ ...initialSquareState, mode }, { a, b })
    assert.equal(squareArea(at('sum', 7, 3)), 100)
    assert.equal(squareArea(at('diff', 9, 5)), 16)
    assert.equal(squareArea(at('product', 7, 3)), 40)
    // The pieces always add up: (a ± b)² = a² ± 2ab + b², (a + b)(a − b) = a² − b²
    for (let a = 2; a <= 9; a += 1) for (let b = 1; b < Math.min(a, 7); b += 1) {
        assert.equal(squareArea(at('sum', a, b)), a * a + 2 * a * b + b * b)
        assert.equal(squareArea(at('diff', a, b)), a * a - 2 * a * b + b * b)
        assert.equal(squareArea(at('product', a, b)), a * a - b * b)
        assert.ok(squarePrediction(at('sum', a, b)) === '>' ? squareArea(at('sum', a, b)) > squareNaive(at('sum', a, b)) : false)
        assert.ok(squareArea(at('diff', a, b)) < squareNaive(at('diff', a, b)))
    }
    // In a difference b stays below a
    assert.equal(setSquare({ ...initialSquareState, mode: 'diff' }, { a: 4, b: 6 }).b, 3)
    checkChallenges(squareChallenges, initialSquareState, { 91201: at('sum', 7, 3), 91202: at('sum', 6, 3), 91203: at('diff', 9, 5), 91204: at('product', 7, 3), 91205: at('sum', 4, 4) })
    checkExtras(squareExtra, initialSquareState)
})

test('polinomioak 3. DBH lab: la máquina del resto', () => {
    const at = (polynomial: number, a: number): MachineState => setMachine(initialMachineState, { polynomial, a })
    // The last number of Ruffini's table is P(a)
    for (let polynomial = 0; polynomial < MACHINE_POLYNOMIALS.length; polynomial += 1) for (let a = -5; a <= 5; a += 1) {
        assert.equal(machineRemainder(at(polynomial, a)), valueAt(MACHINE_POLYNOMIALS[polynomial], a))
        const { bottom, middle } = ruffiniTable(MACHINE_POLYNOMIALS[polynomial], a)
        assert.equal(bottom.length, MACHINE_POLYNOMIALS[polynomial].length)
        assert.equal(middle.length, bottom.length)
    }
    assert.deepEqual(machineRoots(0), [-2, 3])
    assert.deepEqual(machineRoots(3), [-2, -1, 2])
    assert.equal(machinePrediction(at(0, 3)), '=')
    checkChallenges(machineChallenges, initialMachineState, { 91301: at(0, 3), 91302: at(1, -3), 91303: at(2, 2), 91304: at(3, 2), 91305: at(4, -5) })
    checkExtras(machineExtra, initialMachineState)
})

test('polinomioak 3. DBH lab: el rectángulo que se factoriza', () => {
    const at = (trinomial: number, p: number, q: number): FactorState => setFactor(initialFactorState, { trinomial, p, q })
    assert.deepEqual(factorPair(0), [2, 3])
    assert.deepEqual(factorPair(1), [3, 3])
    assert.equal(factorPair(3), null)
    assert.equal(factorPrediction(at(1, 1, 1)), '=')
    assert.equal(factorPrediction(at(3, 1, 1)), '<')
    assert.equal(factorPrediction(at(0, 1, 1)), '>')
    for (let trinomial = 0; trinomial < TRINOMIALS.length; trinomial += 1) {
        const pair = factorPair(trinomial)
        if (pair) assert.ok(factorFits(at(trinomial, pair[0], pair[1])) && factorFits(at(trinomial, pair[1], pair[0])))
    }
    checkChallenges(factorChallenges, initialFactorState, { 91401: at(0, 2, 3), 91402: at(1, 3, 3), 91403: at(2, 3, 4), 91404: at(4, 3, 5), 91405: at(6, 2, 7) })
    checkExtras(factorExtra, initialFactorState, 4)
})
