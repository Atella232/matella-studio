import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { equals, hasTerminatingDecimal, toExactDecimal, toLatex, toNumber, type FractionValue } from '../src/features/unit-v2/math/fraction.ts'
import { createPlaceRound, createRealsMemoryBoard, isPlacedRight, placeLevels, placePoints, placeStars, PLACE_ROUNDS, REALS_MEMORY_PAIRS, realsMemoryLevels, snapToMark } from '../src/pages/dbh4-aplikatuak-errealak/games/boards.ts'
import { realsGameModeForPath, realsGameProgressIds, realsGames } from '../src/pages/dbh4-aplikatuak-errealak/games/info.ts'
import { checkRealsPitAnswer, generateRealsRaceQuestion, realsParTime, realsRaceErrorTips, REALS_RACE_CIRCUITS, type RealsRaceQuestion } from '../src/pages/dbh4-aplikatuak-errealak/games/race.ts'
import { realsLabChallengeIds } from '../src/pages/dbh4-aplikatuak-errealak/lab/labTools.ts'
import { contains, decimalKind, expand, expansionLatex, generatrix, intervalLatex, isPerfectSquare, radicalLatex, roundDecimal, scientificLatex, simplifySqrt, toScientific } from '../src/pages/dbh4-aplikatuak-errealak/reals.ts'

const typed = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)

/** Plain arithmetic in LaTeX: fractions, powers, roots, products, divisions, absolute values and decimal commas */
function evaluate(latex: string): number | null {
    let js = latex
        .replace(/\\,/g, '')
        .replace(/\\left|\\right/g, '')
        .replace(/(\d)\{,\}(\d)/g, '$1.$2')
        .replace(/\\cdot/g, '*')
        .replace(/\\mathbin\{:\}/g, '/')
        .replace(/\|([^|]+)\|/g, 'Math.abs($1)')
        .replace(/\s+/g, '')
    for (let pass = 0; pass < 4; pass += 1) {
        js = js
            .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))')
            .replace(/\\sqrt\[(\d+)\]\{([^{}]+)\}/g, 'Math.root($2,$1)')
            .replace(/\\sqrt\{([^{}]+)\}/g, 'Math.sqrt($1)')
            .replace(/(\([^()]+\)|\d+(?:\.\d+)?)\^\{([^{}]+)\}/g, 'Math.pow($1,($2))')
    }
    js = js.replace(/\)\(/g, ')*(').replace(/(\d)\(/g, '$1*(').replace(/(\d)Math/g, '$1*Math').replace(/\)Math/g, ')*Math')
    if (!/^(?:[\d+\-*/().,]|Math\.(?:pow|sqrt|root|abs))+$/.test(js) || !/\d/.test(js)) return null
    const root = (value: number, index: number) => (value < 0 ? -((-value) ** (1 / index)) : value ** (1 / index))
    try {
        return Function('Math', `return ${js}`)({ ...Math, pow: Math.pow, sqrt: Math.sqrt, abs: Math.abs, root }) as number
    } catch {
        return null
    }
}

/** Every chain a = b = c with only numbers holds */
function checkChain(latex: string, where: string) {
    let checked = 0
    for (const part of latex.replace(/\$/g, '').split(/\\ \\to\\ |,\\ /)) {
        if (part.includes('\\approx') || part.includes('\\overline') || part.includes('<')) continue
        const values = part.split('=').map(evaluate).filter((value): value is number => value !== null)
        if (values.length < 2) continue
        assert.ok(values.every((value) => Math.abs(value - values[0]) < 1e-9 * Math.max(1, Math.abs(values[0]))), `${where}: ${part} → ${values.join(' / ')}`)
        checked += 1
    }
    return checked
}

/** Value of a number written in LaTeX in the options (decimals, fractions, scientific notation, a√b, √n, π…) */
const valueOf = (latex: string) => evaluate(latex.replace(/\\pi/g, String(Math.PI)))

function check(question: RealsRaceQuestion) {
    const { meta } = question
    const right = question.options.findIndex((option) => option.correct)
    const wrong = question.options.map((_, index) => index).filter((index) => index !== right)
    assert.equal(question.options.length, 4, question.kind)
    assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
    assert.equal(question.options.filter((option) => option.correct).length, 1)
    for (const index of wrong) assert.ok(realsRaceErrorTips[question.options[index].error!], `${question.kind}: ${question.options[index].error}`)
    const rightLatex = question.options[right].latex
    const numbers = (value: number) => {
        // The right option has this value and no wrong option has it, except a number not in scientific notation
        assert.ok(Math.abs(valueOf(rightLatex)! / value - 1) < 1e-9 || Math.abs(valueOf(rightLatex)! - value) < 1e-12, `${question.kind}: ${rightLatex} ≠ ${value}`)
        for (const index of wrong) {
            if (question.options[index].error === 'mantissa' && question.kind !== 'sci-exponent') {
                const mantissa = Number(question.options[index].latex.split('\\cdot')[0].replace('{,}', '.'))
                assert.ok(mantissa >= 10 || mantissa < 1, question.options[index].latex)
                continue
            }
            const other = valueOf(question.options[index].latex)
            assert.ok(other === null || (value === 0 ? Math.abs(other) > 1e-12 : Math.abs(other / value - 1) > 1e-9), `${question.kind}: ${question.options[index].latex} is also ${value}`)
        }
    }
    switch (meta.kind) {
        case 'fraction-op': {
            const expected = meta.op === ':' ? toNumber(meta.a) / toNumber(meta.b) : meta.op === '+' ? toNumber(meta.a) + toNumber(meta.b) : toNumber(meta.a) - toNumber(meta.b)
            assert.ok(Math.abs(toNumber(meta.result) - expected) < 1e-12)
            assert.equal(rightLatex, toLatex(meta.result))
            numbers(expected)
            break
        }
        case 'negative-power': {
            const expected = toNumber(meta.base) ** -meta.exponent
            numbers(expected)
            assert.ok(Math.abs(toNumber(question.answer) - expected) < 1e-12)
            break
        }
        case 'power-product':
            assert.equal(meta.exponent, meta.p + meta.q - meta.r)
            numbers(meta.exponent)
            assert.ok(Math.abs(meta.base ** meta.p * meta.base ** meta.q / meta.base ** meta.r - meta.base ** meta.exponent) < 1e-9 * meta.base ** Math.abs(meta.exponent))
            break
        case 'kind-pick':
            assert.equal(meta.right, right)
            meta.fractions.forEach((value, index) => {
                assert.equal(question.options[index].latex, toLatex(value))
                assert.equal(decimalKind(expand(value)) === meta.target, index === right, toLatex(value))
            })
            break
        case 'expansion':
            assert.equal(rightLatex, expansionLatex(expand(meta.value)))
            // Every wrong option is another number: a different expansion
            for (const index of wrong) {
                const latex = question.options[index].latex
                const match = latex.match(/^(\d+)(?:\{,\}(\d*)(?:\\overline\{(\d+)\})?)?$/)!
                assert.ok(match, latex)
                const other = generatrix({ negative: false, integer: match[1], preperiod: match[2] ?? '', period: match[3] ?? '' })
                assert.ok(!equals(other, meta.value), `${latex} = ${rightLatex}`)
            }
            break
        case 'generatrix':
            assert.equal(rightLatex, toLatex(meta.value))
            meta.values.forEach((value, index) => {
                assert.equal(question.options[index].latex, toLatex(value))
                assert.equal(equals(value, meta.value), index === right)
            })
            break
        case 'irrational-pick': {
            assert.equal(meta.right, right)
            const irrational = (latex: string) => latex.includes('\\pi') || latex.includes('\\ldots') || [...latex.matchAll(/\\sqrt\{(\d+)\}/g)].some(([, n]) => !isPerfectSquare(Number(n)))
            question.options.forEach((option, index) => assert.equal(irrational(option.latex), index === right, option.latex))
            break
        }
        case 'interval':
            assert.equal(meta.right, right)
            meta.options.forEach((value, index) => {
                assert.equal(question.options[index].latex, intervalLatex(value))
                assert.equal(JSON.stringify(value) === JSON.stringify(meta.value), index === right)
            })
            if (question.line) {
                assert.deepEqual(question.line.intervals![0].value, meta.value)
                for (const end of [meta.value.from, meta.value.to]) if (end !== null) assert.ok(end > question.line.from && end < question.line.to)
            }
            break
        case 'interval-count': {
            let count = 0
            for (let x = -20; x <= 20; x += 1) if (contains(meta.value, x)) count += 1
            assert.equal(count, meta.count)
            numbers(count)
            break
        }
        case 'sqrt-between':
            assert.ok(meta.low ** 2 < meta.n && meta.n < (meta.low + 1) ** 2)
            assert.equal(rightLatex, `(${meta.low},\\,${meta.low + 1})`)
            break
        case 'round':
            assert.equal(meta.rounded, roundDecimal(meta.text, meta.places))
            assert.notEqual(meta.rounded, meta.text.slice(0, meta.text.indexOf('.') + meta.places + 1).replace(/\.$/, ''), 'truncating would give the same')
            numbers(Number(meta.rounded))
            break
        case 'abs-error':
            assert.ok(Math.abs(Math.abs(Number(meta.real) - Number(meta.approximation)) - Number(meta.error)) < 1e-12)
            numbers(Number(meta.error))
            break
        case 'scientific': {
            assert.deepEqual(toScientific(meta.text), { mantissa: meta.mantissa, exponent: meta.exponent })
            if (question.kind === 'sci-exponent') numbers(meta.exponent)
            else {
                assert.equal(rightLatex, scientificLatex({ mantissa: meta.mantissa, exponent: meta.exponent }))
                numbers(Number(meta.text))
            }
            break
        }
        case 'sci-product': {
            const mantissa = Number(meta.mantissa)
            assert.ok(mantissa >= 1 && mantissa < 10)
            assert.ok(Math.abs(Number(meta.a) * 10 ** meta.m * Number(meta.b) * 10 ** meta.n / (mantissa * 10 ** meta.exponent) - 1) < 1e-9)
            assert.equal(rightLatex, scientificLatex({ mantissa: meta.mantissa, exponent: meta.exponent }))
            numbers(mantissa * 10 ** meta.exponent)
            break
        }
        case 'root':
            assert.equal(meta.value ** meta.index, meta.radicand)
            numbers(meta.value)
            break
        case 'simplify':
            assert.deepEqual(simplifySqrt(meta.radicand), { outside: meta.outside, inside: meta.inside })
            numbers(meta.outside)
            break
        case 'like-radicals': {
            const sum = meta.terms.reduce((total, term) => total + term.coefficient * Math.sqrt(term.radicand), 0)
            assert.ok(Math.abs(sum - meta.total * Math.sqrt(meta.inside)) < 1e-9)
            assert.ok(meta.terms.some((term) => term.radicand !== meta.inside), 'something to simplify')
            numbers(meta.total)
            break
        }
        case 'radical-product':
            assert.equal(meta.a * meta.b, meta.value ** 2)
            assert.ok(!isPerfectSquare(meta.a) && !isPerfectSquare(meta.b))
            numbers(meta.value)
            break
    }
    for (const language of ['eu', 'es', 'ar'] as const) {
        for (const text of [question.prompt[language], question.solution[language]]) {
            for (const [, formula] of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(formula, { throwOnError: true, strict: 'error' })
            if (language === 'ar') assert.ok(!text.includes('{,}'), text)
        }
    }
    for (const option of question.options) katex.renderToString(option.latex, { throwOnError: true, strict: 'error' })
    if (question.writable) assert.equal(checkRealsPitAnswer(question, typed(question.answer)), 'correct', question.kind)
    return checkChain(question.solution.es, question.kind)
}

test('errealak 4. DBH games: levels, ids and routes', () => {
    assert.equal(realsGames.length, 3)
    assert.equal(realsGames[0].levels.length, REALS_RACE_CIRCUITS)
    assert.equal(realsGames.find((game) => game.id === 'place')!.levels.length, placeLevels.length)
    assert.equal(realsGames.find((game) => game.id === 'memory')!.levels.length, realsMemoryLevels.length)
    assert.equal(new Set(realsGameProgressIds).size, realsGameProgressIds.length)
    assert.ok(!realsGameProgressIds.some((id) => realsLabChallengeIds.includes(id)))
    assert.equal(realsGameModeForPath('/matematika/dbh4-aplikatuak/numeros-reales/juegos/recta'), 'place')
    assert.equal(realsGameModeForPath('/matematika/dbh4-aplikatuak/numeros-reales/jokuak/lasterketa'), 'race')
    assert.equal(realsGameModeForPath('/matematika/dbh4-aplikatuak/numeros-reales/jokuak'), 'hub')
})

test('errealak 4. DBH race: every question is right and every wrong option is really wrong', () => {
    const kinds = new Set<string>()
    let chains = 0
    for (let circuit = 0; circuit < REALS_RACE_CIRCUITS; circuit += 1) {
        for (let seed = 1; seed <= 200; seed += 1) {
            const random = createRandom(seed * 17 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateRealsRaceQuestion(random, circuit, tier)
                kinds.add(question.kind)
                assert.equal(question.circuit, circuit)
                chains += check(question)
                const pit = generateRealsRaceQuestion(random, circuit, tier, true)
                assert.ok(pit.writable, `${circuit} ${pit.kind}`)
                chains += check(pit)
            }
        }
        assert.ok(realsParTime(circuit) > 60000)
    }
    for (const kind of ['fraction-sum', 'fraction-div', 'negative-power', 'power-product', 'kind-pick', 'expansion', 'generatrix', 'exact-fraction', 'irrational-pick', 'interval-inequality', 'interval-line', 'interval-count', 'sqrt-between', 'round', 'abs-error', 'sci-exponent', 'scientific', 'sci-product', 'root', 'simplify', 'like-radicals', 'radical-product']) assert.ok(kinds.has(kind), `never generated: ${kind}`)
    assert.ok(chains > 2000, `only ${chains} worked lines checked`)
})

test('errealak 4. DBH race: fractions and decimals are accepted in the pit stop', () => {
    let seen = 0
    for (let seed = 1; seed <= 300; seed += 1) {
        const question = generateRealsRaceQuestion(createRandom(seed), 1, 2, true)
        if (question.answer.denominator === 1) continue
        seen += 1
        assert.equal(checkRealsPitAnswer(question, `${question.answer.numerator}/${question.answer.denominator}`), 'correct')
        assert.equal(checkRealsPitAnswer(question, `${question.answer.numerator + 1}/${question.answer.denominator}`), 'incorrect')
    }
    assert.ok(seen > 100, `only ${seen}`)
    const rounding = generateRealsRaceQuestion(createRandom(5), 3, 0, true)
    assert.equal(checkRealsPitAnswer(rounding, typed(rounding.answer).replace(',', '.')), 'correct')
})

test('errealak 4. DBH line game: targets fit the line and are scored fairly', () => {
    for (let level = 0; level < placeLevels.length; level += 1) {
        const settings = placeLevels[level]
        for (let seed = 1; seed <= 80; seed += 1) {
            const targets = createPlaceRound(createRandom(seed * 3 + level), level)
            assert.equal(targets.length, PLACE_ROUNDS)
            assert.equal(new Set(targets.map((target) => target.latex)).size, PLACE_ROUNDS)
            for (const target of targets) {
                assert.ok(target.value > settings.from && target.value < settings.to, target.latex)
                assert.ok(Math.abs(valueOf(target.latex)! - target.value) < 1e-9, target.latex)
                katex.renderToString(target.worked, { throwOnError: true, strict: 'error' })
                const nearest = snapToMark(settings, target.value)
                assert.ok(isPlacedRight(settings, nearest, target.value), `${target.latex} at ${nearest}`)
                // Two marks further away is always wrong
                assert.ok(!isPlacedRight(settings, nearest + 1 / settings.minor * (nearest > target.value ? 1 : -1) * 2, target.value), target.latex)
                if (settings.tolerance === 0) {
                    assert.equal(nearest, target.value, `${target.latex} is not on a mark`)
                    assert.ok(checkChain(target.worked, target.latex) > 0, target.worked)
                } else {
                    // Both tenths around an irrational are right, the next ones are not
                    const below = Math.floor(target.value * 10) / 10
                    assert.ok(isPlacedRight(settings, below, target.value) && isPlacedRight(settings, below + 0.1, target.value))
                    assert.ok(!isPlacedRight(settings, below - 0.1, target.value) && !isPlacedRight(settings, below + 0.2, target.value))
                    const approx = target.worked.match(/\\approx (?:[^=]*=)?(\d+\{,\}\d+)$/)
                    assert.ok(approx, target.worked)
                    assert.ok(Math.abs(Number(approx[1].replace('{,}', '.')) - target.value) < 0.006, target.worked)
                }
            }
        }
    }
    assert.equal(snapToMark(placeLevels[1], 0.36), 0.4)
    assert.equal(snapToMark(placeLevels[0], 9), 3)
    assert.deepEqual([placePoints(0), placePoints(1), placePoints(2)], [2, 1, 0])
    assert.deepEqual([placeStars(16), placeStars(14), placeStars(10), placeStars(4)], [3, 3, 2, 1])
})

test('errealak 4. DBH memory: every card has exactly one partner and the pair is true', () => {
    for (let level = 0; level < realsMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 80; seed += 1) {
            const cards = createRealsMemoryBoard(createRandom(seed * 7 + level), level)
            assert.equal(cards.length, REALS_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const partner = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!
                assert.ok(card.explain && card.explain === partner.explain)
                katex.renderToString(card.latex, { throwOnError: true, strict: 'error' })
                katex.renderToString(card.explain!, { throwOnError: true, strict: 'error' })
                if (level === 0) {
                    const match = card.latex.match(/^(\d+)\{,\}(\d*)\\overline\{(\d+)\}$/)!
                    assert.ok(match, card.latex)
                    assert.equal(partner.latex, toLatex(generatrix({ negative: false, integer: match[1], preperiod: match[2], period: match[3] })))
                } else if (level === 1) {
                    const text = card.latex.replace(/\\,/g, '').replace('{,}', '.')
                    assert.equal(partner.latex, scientificLatex(toScientific(text)))
                    assert.ok(Math.abs(valueOf(partner.latex)! / Number(text) - 1) < 1e-9)
                } else {
                    const n = Number(card.latex.match(/^\\sqrt\{(\d+)\}$/)![1])
                    const { outside, inside } = simplifySqrt(n)
                    assert.ok(outside > 1 && inside > 1)
                    assert.equal(partner.latex, radicalLatex(outside, inside))
                }
                if (level !== 0) assert.ok(checkChain(card.explain!, card.latex) > 0, card.explain)
            }
        }
    }
})
