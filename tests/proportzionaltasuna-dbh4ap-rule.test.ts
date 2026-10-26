import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { fraction } from '../src/features/unit-v2/math/fraction.ts'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import {
    chooseRelation,
    initialRuleState,
    relationRight,
    RULE_CONTEXTS,
    ruleAnswered,
    ruleChallenges,
    ruleExtra,
    ruleFactor,
    ruleProblem,
    ruleResult,
    ruleSlip,
    setRule,
    unitValue,
    type RuleContext,
    type RuleRelation,
    type RuleState
} from '../src/pages/dbh4-aplikatuak-proportzionaltasuna/lab/ruleOfThree.ts'

const make = (context: RuleContext, a: number, b: number, c: number, relation: RuleRelation | null = null, answer = '', method: RuleState['method'] = 'factor'): RuleState => ({
    ...setRule(initialRuleState, { context, a, b, c, method }),
    relation,
    answer,
    checked: answer !== ''
})

test('proportzionaltasuna 4. DBH ap rule of three: results, arrows and the unit', () => {
    // The yogurt kind of problem: direct, b·c/a
    assert.deepEqual(ruleResult(make('price', 3, 6, 5)), fraction(10))
    assert.deepEqual(ruleFactor(make('price', 3, 6, 5)), fraction(5, 3))
    assert.deepEqual(unitValue(make('price', 5, 8, 12)), fraction(8, 5))
    // The cows: inverse, a·b/c; through the unit, 35 · 60 «cow-days»
    const cows = make('cows', 35, 60, 20)
    assert.deepEqual(ruleResult(cows), fraction(105))
    assert.deepEqual(unitValue(cows), fraction(2100))
    // The other relation gives the slip
    assert.deepEqual(ruleResult(cows, 'direct'), fraction(240, 7))
})

test('proportzionaltasuna 4. DBH ap rule of three: choosing, answering and changing the problem', () => {
    const food = make('food', 4, 30, 6, 'direct', '20')
    // The answer only counts with the right relation
    assert.ok(!relationRight(food) && !ruleAnswered(food))
    const right = chooseRelation(food, 'inverse')
    assert.ok(relationRight(right) && ruleAnswered(right))
    // Writing the direct result is the classic slip
    assert.ok(ruleSlip({ ...right, answer: '45', checked: true }))
    assert.ok(!ruleSlip({ ...right, answer: '20', checked: true }))
    assert.ok(!ruleSlip({ ...right, answer: '45', checked: false }))
    // A new problem asks again; changing the method keeps everything
    assert.equal(setRule(right, { c: 8 }).relation, null)
    assert.equal(setRule(right, { c: 8 }).answer, '')
    const unit = setRule(right, { method: 'unit' })
    assert.equal(unit.relation, 'inverse')
    assert.equal(unit.answer, '20')
    // Rounded results: 5,5 m of cable style answers to the hundredths
    assert.ok(ruleAnswered(make('price', 3, 10, 2, 'direct', '6,67')))
    assert.ok(!ruleAnswered(make('price', 3, 10, 2, 'direct', '6,6')))
    // Limits
    assert.equal(setRule(initialRuleState, { a: 0 }).a, 1)
    assert.equal(setRule(initialRuleState, { b: 123456 }).b, 9999)
})

test('proportzionaltasuna 4. DBH ap rule of three: challenges', () => {
    const states = [
        make('food', 4, 30, 6, 'inverse', '20'),
        make('distance', 12, 4, 30, 'direct', '10'),
        make('cows', 35, 60, 20, 'inverse', '105'),
        make('price', 5, 8, 12, 'direct', '19,2', 'unit')
    ]
    states.forEach((state, index) => assert.ok(ruleChallenges[index].isSolved(state), String(ruleChallenges[index].id)))
    // The unit path is part of the last one; the wrong relation never solves
    assert.ok(!ruleChallenges[3].isSolved({ ...states[3], method: 'factor' }))
    assert.ok(!ruleChallenges[0].isSolved({ ...states[0], relation: 'direct' }))
    for (const challenge of ruleChallenges) assert.ok(!challenge.isSolved(initialRuleState), String(challenge.id))
})

test('proportzionaltasuna 4. DBH ap rule of three: texts and endless challenges', () => {
    const texts = Object.keys(RULE_CONTEXTS).map((context) => ruleProblem(context as RuleContext, 3, 12, 4))
    const prompts = new Set<string>()
    for (let seed = 1; seed <= 400; seed += 1) {
        const challenge = ruleExtra(createRandom(seed * 7919))
        assert.ok(challenge.isSolved(challenge.solution), challenge.prompt.es)
        assert.ok(!challenge.isSolved(initialRuleState), `${seed} starts solved`)
        assert.ok(!challenge.isSolved({ ...challenge.solution, answer: '' }), `${seed} solved without an answer`)
        const { a, b, c } = challenge.solution
        for (const [low, high] of RULE_CONTEXTS[challenge.solution.context].ranges.map(([min, max]) => [min, max])) assert.ok(low <= high)
        assert.ok([a, b, c].every((value) => value >= 1 && value <= 9999))
        prompts.add(challenge.prompt.es)
        texts.push(challenge.prompt, challenge.hint)
    }
    assert.ok(prompts.size > 150, String(prompts.size))
    for (const challenge of ruleChallenges) texts.push(challenge.prompt, challenge.hint)
    for (const text of texts) {
        for (const language of ['eu', 'es', 'ar'] as const) {
            const line = text[language]
            assert.equal(line.split('$').length % 2, 1, line)
            for (const [, formula] of line.matchAll(/\$([^$]+)\$/g)) {
                katex.renderToString(formula, { throwOnError: true })
                assert.ok(!/[؀-ۿ]/.test(formula), formula)
            }
            if (language === 'eu') assert.ok(!/\d-?(an|ean|ra|era|tik|etik|ko|eko|rekin|ekin|k)\b/.test(line), line)
            if (language === 'ar') assert.ok(!/\d,\d/.test(line) && !line.includes('{,}'), line)
        }
    }
})
