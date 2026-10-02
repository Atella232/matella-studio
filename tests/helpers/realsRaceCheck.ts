import assert from 'node:assert/strict'
import katex from 'katex'
import { equals, hasTerminatingDecimal, toExactDecimal, toLatex, toNumber, type FractionValue } from '../../src/features/unit-v2/math/fraction.ts'
import type { RaceQuestion } from '../../src/features/unit-v2/games/raceCore.ts'
import type { LocalizedText } from '../../src/features/unit-v2/types.ts'
import type { RealsRaceQuestion } from '../../src/pages/dbh4-aplikatuak-errealak/games/race.ts'
import { contains, decimalKind, expand, expansionLatex, generatrix, intervalLatex, isPerfectSquare, roundDecimal, scientificLatex, simplifySqrt, toScientific } from '../../src/pages/dbh4-aplikatuak-errealak/reals.ts'

/* ==========================================================================
   Checks shared by the real-number races (4. DBH applied and academic):
   each question is rebuilt from its `meta` and every worked line with only
   numbers is evaluated. Not a test file itself: the tests import it.
   ========================================================================== */

export const typed = (value: FractionValue) => (hasTerminatingDecimal(value) ? toExactDecimal(value)! : `${value.numerator}/${value.denominator}`)

/** Plain arithmetic in LaTeX: fractions, powers, roots, products, divisions, absolute values and decimal commas */
export function evaluate(latex: string): number | null {
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
export function checkChain(latex: string, where: string) {
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
export const valueOf = (latex: string) => evaluate(latex.replace(/\\pi/g, String(Math.PI)))

/** Checks a question of the applied race (or one the academic race borrows); returns how many worked lines were evaluated */
export function checkRealsQuestion(question: RealsRaceQuestion | RaceQuestion<string> & { meta: unknown }, tips: Record<string, LocalizedText>, checkPit: (question: never, input: string) => string): number {
    return checkQuestion(question as RealsRaceQuestion, tips, checkPit)
}

function checkQuestion(question: RealsRaceQuestion, tips: Record<string, LocalizedText>, checkPit: (question: never, input: string) => string) {
    const { meta } = question
    const right = question.options.findIndex((option) => option.correct)
    const wrong = question.options.map((_, index) => index).filter((index) => index !== right)
    assert.equal(question.options.length, 4, question.kind)
    assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
    assert.equal(question.options.filter((option) => option.correct).length, 1)
    for (const index of wrong) assert.ok(tips[question.options[index].error!], `${question.kind}: ${question.options[index].error}`)
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
    if (question.writable) assert.equal(checkPit(question as never, typed(question.answer)), 'correct', question.kind)
    return checkChain(question.solution.es, question.kind)
}

