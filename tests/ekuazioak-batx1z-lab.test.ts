import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../src/features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { bachEquationsLabChallengeIds, bachEquationsLabToolForTopic, bachEquationsLabTools } from '../src/pages/batx1-zientziak-ekuazioak/lab/labTools.ts'
import { absoluteChallenges, absoluteCuts, absoluteExtra, absoluteLatex, absolutePrediction, foldValue, initialAbsoluteState, isAbsoluteSolution, setAbsolute, type AbsoluteState } from '../src/pages/batx1-zientziak-ekuazioak/lab/absoluteFold.ts'
import { changeChallenges, changeExtra, changePrediction, changeSolutions, initialChangeState, setChange, tEquationLatex, xEquationLatex, type ChangeState } from '../src/pages/batx1-zientziak-ekuazioak/lab/changeMachine.ts'
import { expressionLatex, initialSignTableState, setSignTable, signPrediction, signTableChallenges, signTableExtra, signValue, type SignTableState } from '../src/pages/batx1-zientziak-ekuazioak/lab/signTable.ts'

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

test('ekuazioak batx1 z lab: the tools, their lessons and their challenge ids', () => {
    assert.equal(bachEquationsLabTools.length, 10)
    const stages = ['polynomials', 'polynomial-equations', 'radical-absolute', 'exp-log', 'inequalities']
    for (const stage of stages) assert.ok(bachEquationsLabTools.some((tool) => tool.stage === stage), stage)
    for (const tool of bachEquationsLabTools) {
        for (const language of languages) assert.ok(tool.title[language].length > 0 && tool.observe[language].length > 0, `${tool.id} ${language}`)
    }
    // The «Observe» text of the tools of this unit is plain text, not LaTeX
    for (const tool of bachEquationsLabTools.filter((item) => ['sign-table', 'absolute-fold', 'change-machine'].includes(item.id))) {
        for (const language of languages) assert.ok(!tool.observe[language].includes('$'), `${tool.id} ${language}`)
    }
    assert.equal(new Set(bachEquationsLabChallengeIds).size, bachEquationsLabChallengeIds.length)
    // The three tools of this unit use the 101xxx block; the borrowed ones keep their ids
    const own = [...signTableChallenges, ...absoluteChallenges, ...changeChallenges].map((challenge) => challenge.id)
    for (const id of own) assert.ok(id >= 101101 && id <= 101399, `${id}`)
    const topics = ['ruffini-roots', 'factorize-high', 'algebraic-fractions', 'high-degree', 'change-variable', 'rational-equations', 'radical-equations', 'absolute-equations', 'exponential-equations', 'exponential-change', 'log-equations', 'polynomial-inequalities', 'rational-inequalities', 'absolute-inequalities', 'inequality-systems']
    for (const [topic, tool] of Object.entries(bachEquationsLabToolForTopic)) {
        assert.ok(topics.includes(topic), topic)
        assert.ok(bachEquationsLabTools.some((item) => item.id === tool), `${topic} → ${tool}`)
    }
    for (const tool of bachEquationsLabTools) assert.ok(topics.includes(tool.lessonTopic), `${tool.id}: ${tool.lessonTopic}`)
})

test('ekuazioak batx1 z lab: la tabla de signos', () => {
    const at = (patch: Partial<SignTableState>) => setSignTable(initialSignTableState, patch)
    const cubic = at({ roots: [0, 2, -2], factors: 3 })
    assert.equal(signValue(cubic, 1), 1 * -1 * 3)
    assert.equal(signValue(cubic, 3), 3 * 1 * 5)
    assert.equal(expressionLatex(cubic), 'x(x-2)(x+2)')
    // The quotient (x − 1)/(x + 2): a hole at −2, a zero at 1
    const quotient = at({ roots: [1, -2, 0], factors: 2, denominator: true })
    assert.equal(expressionLatex(quotient), '\\frac{x-1}{x+2}')
    assert.equal(signValue(quotient, -2), null)
    assert.equal(signValue(quotient, 1), 0)
    assert.equal(signPrediction({ ...quotient, probe: -2 }), '=')
    assert.equal(signPrediction({ ...quotient, probe: -4 }), '>')
    assert.equal(signPrediction({ ...quotient, probe: 0 }), '<')
    // A double root does not change the sign
    const double = at({ roots: [1, 1, -3], factors: 3 })
    assert.equal(expressionLatex(double), '(x-1)^2(x+3)')
    assert.ok((signValue(double, 0) ?? 0) > 0 && (signValue(double, 2) ?? 0) > 0)
    const predicted = { ...initialSignTableState, prediction: '<' as const }
    assert.equal(setSignTable(predicted, { probe: 1 }).prediction, null)
    assert.equal(setSignTable(predicted, { probe: initialSignTableState.probe }).prediction, '<')
    assert.equal(at({ probe: 40 }).probe, 6)
    checkChallenges(signTableChallenges, initialSignTableState, {
        101101: cubic,
        101102: quotient,
        101103: at({ roots: [-1, 3, 0], factors: 2, probe: 1 }),
        101104: at({ roots: [4, 0, 0], factors: 2, denominator: true, probe: 0 }),
        101105: double
    })
    checkExtras(signTableExtra, initialSignTableState, (state) => setSignTable(state, state))
})

test('ekuazioak batx1 z lab: el valor absoluto doblado', () => {
    const at = (patch: Partial<AbsoluteState>) => setAbsolute(initialAbsoluteState, patch)
    const equation = at({ m: 1, q: -2, c: 3 })
    assert.deepEqual(absoluteCuts(equation), [-1, 5])
    assert.equal(absoluteLatex(equation), '|x-2|=3')
    assert.ok(isAbsoluteSolution(equation, 5) && isAbsoluteSolution(equation, -1) && !isAbsoluteSolution(equation, 0))
    assert.deepEqual(absoluteCuts(at({ c: 0, q: -3 })), [3])
    assert.deepEqual(absoluteCuts(at({ c: -1 })), [])
    const less = at({ m: 2, q: -4, c: 6, relation: '<' })
    assert.ok(isAbsoluteSolution(less, 0) && isAbsoluteSolution(less, 4) && !isAbsoluteSolution(less, 5))
    const more = at({ m: 1, q: 1, c: 2, relation: '>' })
    assert.ok(isAbsoluteSolution(more, -4) && !isAbsoluteSolution(more, -3) && isAbsoluteSolution(more, 2))
    assert.equal(foldValue(more, -4), 3)
    assert.equal(absolutePrediction({ ...more, probe: -4 }), '>')
    assert.equal(absolutePrediction({ ...more, probe: 1 }), '=')
    assert.equal(absolutePrediction({ ...more, probe: 0 }), '<')
    const predicted = { ...initialAbsoluteState, prediction: '>' as const }
    assert.equal(setAbsolute(predicted, { c: 5 }).prediction, null)
    assert.equal(setAbsolute(predicted, { c: initialAbsoluteState.c }).prediction, '>')
    assert.equal(at({ m: 7 }).m, 1)
    checkChallenges(absoluteChallenges, initialAbsoluteState, {
        101201: { ...equation, probe: 5 },
        101202: at({ m: 2, c: -1 }),
        101203: { ...less, probe: 1 },
        101204: { ...more, probe: -5 },
        101205: at({ q: -3, c: 0 })
    })
    checkExtras(absoluteExtra, initialAbsoluteState, (state) => setAbsolute(state, state))
})

test('ekuazioak batx1 z lab: la máquina del cambio de variable', () => {
    const at = (patch: Partial<ChangeState>) => setChange(initialChangeState, patch)
    assert.deepEqual(changeSolutions(at({ t1: 9, t2: 0 })), [-3, 0, 3])
    assert.deepEqual(changeSolutions(at({ t1: 4, t2: -1 })), [-2, 2])
    assert.deepEqual(changeSolutions(at({ kind: 'cube', t1: 8, t2: -1 })), [-1, 2])
    assert.deepEqual(changeSolutions(at({ kind: 'exp', t1: 4, t2: -3 })), [2])
    assert.deepEqual(changeSolutions(at({ kind: 'exp', t1: -1, t2: -5 })), [])
    assert.equal(changePrediction(at({ t1: 9, t2: 0 })), '>')
    assert.equal(changePrediction(at({ t1: 4, t2: -1 })), '=')
    assert.equal(changePrediction(at({ kind: 'exp', t1: 4, t2: -3 })), '<')
    assert.equal(tEquationLatex(at({ kind: 'cube', t1: 8, t2: -1 })), 't^2-7t-8=0')
    assert.equal(xEquationLatex(at({ kind: 'cube', t1: 8, t2: -1 })), 'x^6-7x^3-8=0')
    assert.equal(xEquationLatex(at({ kind: 'exp', t1: 4, t2: -3 })), '4^x-2^x-12=0')
    assert.equal(xEquationLatex(at({ kind: 'square', t1: 1, t2: 4 })), 'x^4-5x^2+4=0')
    // The solutions really solve the equation in x
    for (const state of [at({ t1: 9, t2: 1 }), at({ kind: 'cube', t1: 8, t2: -1 }), at({ kind: 'exp', t1: 2, t2: 8 })]) {
        for (const x of changeSolutions(state)) {
            const u = state.kind === 'square' ? x * x : state.kind === 'cube' ? x ** 3 : 2 ** x
            assert.ok(Math.abs(u * u - (state.t1 + state.t2) * u + state.t1 * state.t2) < 1e-9, `${state.kind} ${x}`)
        }
    }
    const predicted = { ...initialChangeState, prediction: '>' as const }
    assert.equal(setChange(predicted, { t2: 1 }).prediction, null)
    assert.equal(setChange(predicted, { t2: initialChangeState.t2 }).prediction, '>')
    assert.equal(at({ t1: 30 }).t1, 9)
    for (const language of languages) katex.renderToString(formulaFor(language, xEquationLatex(at({ kind: 'exp', t1: 1, t2: 8 }))), { throwOnError: true, strict: 'error' })
    checkChallenges(changeChallenges, initialChangeState, {
        101301: at({ t1: 1, t2: 4 }),
        101302: at({ t1: 4, t2: -1 }),
        101303: at({ kind: 'exp', t1: -1, t2: -2 }),
        101304: at({ kind: 'cube', t1: 8, t2: -1 }),
        101305: at({ kind: 'exp', t1: -3, t2: 4 })
    })
    checkExtras(changeExtra, initialChangeState, (state) => setChange(state, state))
})
