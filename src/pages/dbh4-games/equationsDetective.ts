import { pick, randomInt, type Random } from '../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../features/unit-v2/types.ts'
import { buildEquationDetectiveCase, equationDetectiveNames, equationDetectiveTips, solutionsLatex, solutionsValue, type EquationDetectiveError } from '../dbh2-ekuazioak-v2/games/detective.ts'
import { fromRoots, polyLatex } from './polynomials.ts'

/* ==========================================================================
   Ekuazioen detektibea (4. DBH, applied and academic). The applied track
   reuses the first-degree and second-degree cases of 2. DBH and adds
   systems; the academic track has the quadratic and biquadratic, the
   «other» equations (radicals, fractions, exponentials) and the
   inequalities. Values: a list of solutions is `solutionsValue`, a system
   is x·1000 + y, a set of real numbers is `setCode`.
   ========================================================================== */

export type Dbh4EquationError =
    | 'biquadratic-t-as-x'
    | 'biquadratic-negative-t'
    | 'square-sides-separately'
    | 'extraneous-kept'
    | 'zero-denominator-kept'
    | 'exponent-as-number'
    | 'negative-no-flip'
    | 'between-not-outside'
    | 'divide-by-x-inequality'
    | 'square-one-side'
    | 'substitution-bracket'
    | 'reduction-sign'
    | 'isolate-sign'
    | 'multiply-one-side'

export type Dbh4EquationAnyError = Dbh4EquationError | EquationDetectiveError
export type EquationsTrack = 'applied' | 'academic'

export const equationsDetectiveLevels: Record<EquationsTrack, Dbh4EquationAnyError[][]> = {
    applied: [
        ['transpose-sign', 'subtract-coefficient', 'divide-upside-down', 'minus-bracket'],
        ['one-root', 'divide-by-x', 'formula-sign', 'product-not-zero'],
        ['substitution-bracket', 'reduction-sign', 'isolate-sign', 'multiply-one-side']
    ],
    academic: [
        ['formula-sign', 'divide-by-x', 'biquadratic-t-as-x', 'biquadratic-negative-t'],
        ['square-sides-separately', 'extraneous-kept', 'zero-denominator-kept', 'exponent-as-number'],
        ['negative-no-flip', 'between-not-outside', 'divide-by-x-inequality', 'square-one-side']
    ]
}

export const EQUATIONS_DETECTIVE_CASES = 6

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    change: say('t = x² aldaketa', 'Cambio t = x²', 'التغيير t = x²', 'Change t = x²'),
    tValues: say('t-ren balioak', 'Valores de t', 'قيم t', 'Values of t'),
    solutions: say('Soluzioak', 'Soluciones', 'الحلول', 'Solutions'),
    candidates: say('Hautagaiak', 'Candidatos', 'المرشحون', 'Candidates'),
    square: say('Ber bi', 'Eleva al cuadrado', 'ربّع', 'Square'),
    order: say('Ordenatu', 'Ordena', 'رتّب', 'Rearrange'),
    numerator: say('Zenbakitzailea', 'Numerador', 'البسط', 'Numerator'),
    base: say('Oinarri bera', 'Misma base', 'الأساس نفسه', 'Same base'),
    exponents: say('Berretzaileak', 'Exponentes', 'الأسس', 'Exponents'),
    transpose: say('Gaiak lekuz aldatu', 'Transpón', 'انقل الحدود', 'Move the terms'),
    divide: say('Zatitu', 'Divide', 'اقسم', 'Divide'),
    roots: say('Erroak', 'Raíces', 'الجذور', 'Roots'),
    sign: say('Zeinua', 'Signo', 'الإشارة', 'Sign'),
    set: say('Soluzioa', 'Solución', 'الحل', 'Solution'),
    isolate: say('Askatu y', 'Despeja y', 'اعزل y', 'Solve for y'),
    substitute: say('Ordeztu', 'Sustituye', 'عوّض', 'Substitute'),
    subtract: say('Kendu ekuazioak', 'Resta las ecuaciones', 'اطرح المعادلتين', 'Subtract the equations'),
    multiply: say('Biderkatu', 'Multiplica', 'اضرب', 'Multiply'),
    add: say('Batu ekuazioak', 'Suma las ecuaciones', 'اجمع المعادلتين', 'Add the equations')
}

const newNames: Record<Dbh4EquationError, LocalizedText> = {
    'biquadratic-t-as-x': say('t-ren balioak x-ren soluziotzat eman ditu', 'Dio los valores de t como soluciones de x', 'أعطى قيم t حلولًا لـ x', 'Gave the values of t as the solutions for x'),
    'biquadratic-negative-t': say('t negatibo baten erroa atera du', 'Sacó la raíz de un t negativo', 'أخذ جذر t سالب', 'Took the root of a negative t'),
    'square-sides-separately': say('Atal bakoitzeko gaiak banan-banan ber bi egin ditu', 'Elevó al cuadrado cada término por separado', 'ربّع كل حد على حدة', 'Squared each term on its own'),
    'extraneous-kept': say('Ez ditu soluzioak egiaztatu: bat faltsua da', 'No comprobó las soluciones: una es falsa', 'لم يتحقق من الحلول: أحدها زائف', 'Did not check the solutions: one is false'),
    'zero-denominator-kept': say('Izendatzailea zero egiten duen balioa onartu du', 'Aceptó un valor que anula el denominador', 'قبل قيمة تجعل المقام صفرًا', 'Kept a value that makes the denominator zero'),
    'exponent-as-number': say('Berretzailea zenbakiarekin berdindu du, ez berretzailearekin', 'Igualó el exponente al número, no a su exponente', 'ساوى الأس بالعدد لا بأسّه', 'Set the exponent equal to the number, not to its exponent'),
    'negative-no-flip': say('Negatibo batez zatitzean ez du desberdintza buelta eman', 'Al dividir entre un negativo no dio la vuelta a la desigualdad', 'عند القسمة على سالب لم يعكس المتباينة', 'Did not flip the inequality when dividing by a negative'),
    'between-not-outside': say('Erroen artekoa hartu du, kanpokoa beharrean', 'Tomó lo de entre las raíces en vez de lo de fuera', 'أخذ ما بين الجذرين بدل ما خارجهما', 'Took what lies between the roots instead of outside'),
    'divide-by-x-inequality': say('Desberdintza x-z zatitu du, x-ren zeinua jakin gabe', 'Dividió la inecuación entre x sin saber su signo', 'قسم المتباينة على x دون معرفة إشارته', 'Divided the inequality by x without knowing its sign'),
    'square-one-side': say('Erro karratua ateratzean alde negatiboa ahaztu du', 'Al sacar la raíz olvidó la parte negativa', 'عند أخذ الجذر نسي الجزء السالب', 'Forgot the negative side when taking the root'),
    'substitution-bracket': say('Ordeztean ez du parentesirik jarri', 'Al sustituir no puso paréntesis', 'لم يضع أقواسًا عند التعويض', 'Did not use brackets when substituting'),
    'reduction-sign': say('Ekuazioak kentzean zeinu bat oker atera zaio', 'Al restar las ecuaciones se equivocó de signo', 'أخطأ في إشارة عند طرح المعادلتين', 'Got a sign wrong when subtracting the equations'),
    'isolate-sign': say('y askatzean ez dio zeinua aldatu', 'Al despejar y no cambió el signo', 'لم يغيّر الإشارة عند عزل y', 'Did not change the sign when solving for y'),
    'multiply-one-side': say('Ekuazioaren atal bat bakarrik biderkatu du', 'Multiplicó solo un miembro de la ecuación', 'ضرب طرفًا واحدًا من المعادلة', 'Multiplied only one side of the equation')
}

const newTips: Record<Dbh4EquationError, LocalizedText> = {
    'biquadratic-t-as-x': say('$t=x^{2}$: t bakoitzetik $x=\\pm\\sqrt{t}$ ateratzen dira.', '$t=x^{2}$: de cada t salen $x=\\pm\\sqrt{t}$.', '$t=x^{2}$: من كل t يخرج $x=\\pm\\sqrt{t}$.', '$t=x^{2}$: each t gives $x=\\pm\\sqrt{t}$.'),
    'biquadratic-negative-t': say('$x^{2}=-4$ ekuazioak ez du soluzio errealik.', '$x^{2}=-4$ no tiene solución real.', 'المعادلة $x^{2}=-4$ لا حل حقيقي لها.', '$x^{2}=-4$ has no real solution.'),
    'square-sides-separately': say('$(x+d)^{2}=x^{2}+2dx+d^{2}$: ez ahaztu erdiko gaia.', '$(x+d)^{2}=x^{2}+2dx+d^{2}$: no olvides el término del medio.', '$(x+d)^{2}=x^{2}+2dx+d^{2}$: لا تنسَ الحد الأوسط.', '$(x+d)^{2}=x^{2}+2dx+d^{2}$: do not forget the middle term.'),
    'extraneous-kept': say('Ber bi egiteak soluzio faltsuak sor ditzake: egiaztatu beti hasierako ekuazioan.', 'Elevar al cuadrado puede dar soluciones falsas: comprueba siempre en la ecuación inicial.', 'التربيع قد يعطي حلولًا زائفة: تحقّق دائمًا في المعادلة الأصلية.', 'Squaring can give false solutions: always check in the first equation.'),
    'zero-denominator-kept': say('Izendatzailea zero egiten duen balioa ez da inoiz soluzioa.', 'Un valor que anula el denominador nunca es solución.', 'القيمة التي تجعل المقام صفرًا ليست حلًا أبدًا.', 'A value that makes the denominator zero is never a solution.'),
    'exponent-as-number': say('$2^{x+1}=8=2^{3}$ bada, $x+1=3$.', 'Si $2^{x+1}=8=2^{3}$, entonces $x+1=3$.', 'إذا كان $2^{x+1}=8=2^{3}$ فإن $x+1=3$.', 'If $2^{x+1}=8=2^{3}$, then $x+1=3$.'),
    'negative-no-flip': say('$-2x>-6$ bada, $x<3$: negatibo batez zatitzean, zeinua buelta.', 'Si $-2x>-6$, entonces $x<3$: al dividir entre un negativo, el signo da la vuelta.', 'إذا كان $-2x>-6$ فإن $x<3$: عند القسمة على سالب ينعكس الرمز.', 'If $-2x>-6$, then $x<3$: dividing by a negative flips the sign.'),
    'between-not-outside': say('$x^{2}-9>0$: parabola positiboa da erroetatik kanpo.', '$x^{2}-9>0$: la parábola es positiva fuera de las raíces.', '$x^{2}-9>0$: القطع موجب خارج الجذرين.', '$x^{2}-9>0$: the parabola is positive outside the roots.'),
    'divide-by-x-inequality': say('$x^{2}>kx$: ez zatitu x-z; atera faktore komuna: $x(x-k)>0$.', '$x^{2}>kx$: no dividas entre x; saca factor común: $x(x-k)>0$.', '$x^{2}>kx$: لا تقسم على x بل أخرج العامل المشترك: $x(x-k)>0$.', '$x^{2}>kx$: do not divide by x; take out the common factor: $x(x-k)>0$.'),
    'square-one-side': say('$x^{2}\\le 16$ bada, $-4\\le x\\le 4$.', 'Si $x^{2}\\le 16$, entonces $-4\\le x\\le 4$.', 'إذا كان $x^{2}\\le 16$ فإن $-4\\le x\\le 4$.', 'If $x^{2}\\le 16$, then $-4\\le x\\le 4$.'),
    'substitution-bracket': say('Ordezten den adierazpena parentesi artean: $3(5-2x)=15-6x$.', 'Lo que se sustituye va entre paréntesis: $3(5-2x)=15-6x$.', 'ما يُعوَّض يوضع بين قوسين: $3(5-2x)=15-6x$.', 'What you substitute goes in brackets: $3(5-2x)=15-6x$.'),
    'reduction-sign': say('Atal bakoitza kendu: $8-12=-4$.', 'Se resta cada miembro: $8-12=-4$.', 'نطرح كل طرف: $8-12=-4$.', 'Subtract each side: $8-12=-4$.'),
    'isolate-sign': say('$2x+y=7$ bada, $y=7-2x$.', 'Si $2x+y=7$, entonces $y=7-2x$.', 'إذا كان $2x+y=7$ فإن $y=7-2x$.', 'If $2x+y=7$, then $y=7-2x$.'),
    'multiply-one-side': say('Ekuazio bat biderkatzean, bi atalak biderkatzen dira.', 'Al multiplicar una ecuación se multiplican los dos miembros.', 'عند ضرب معادلة يُضرب الطرفان.', 'Multiplying an equation multiplies both sides.')
}

export const equationsDetectiveNames: Record<Dbh4EquationAnyError, LocalizedText> = { ...equationDetectiveNames, ...newNames }
export const equationsDetectiveTips: Record<Dbh4EquationAnyError, LocalizedText> = { ...equationDetectiveTips, ...newTips }

/* ---------- Values ---------- */

/** A system's solution as one number */
export const systemCode = (x: number, y: number) => x * 1000 + y
export const systemLatex = (x: number, y: number) => `x=${x},\\ y=${y}`

/** A set of reals as intervals: [from, to, closedFrom, closedTo], null for ∞ */
export type Piece = [number | null, number | null, boolean, boolean]
export const setLatex = (pieces: Piece[]) => pieces.map(([from, to, closedFrom, closedTo]) => `${from === null ? '(-\\infty' : `${closedFrom ? '[' : '('}${from}`},\\,${to === null ? '+\\infty)' : `${to}${closedTo ? ']' : ')'}`}`).join('\\cup ')
/** A set as one number: which half-integers from −20 to 20 it holds */
export function setCode(pieces: Piece[]): number {
    let code = 0
    for (let step = 0; step <= 80; step += 1) {
        const x = -20 + step / 2
        const inside = pieces.some(([from, to, closedFrom, closedTo]) => (from === null || x > from || (closedFrom && x === from)) && (to === null || x < to || (closedTo && x === to)))
        if (inside) code += (step + 1) ** 2
    }
    return code
}

const nonzero = (min: number, max: number) => Array.from({ length: max - min + 1 }, (_, index) => index + min).filter((value) => value !== 0)
const sorted = (values: number[]) => [...values].sort((a, b) => a - b)
/** Pairs of opposite solutions written short: x = ±2, x = ±3 */
export const plusMinusLatex = (values: number[]) => values.map((value) => `x=\\pm ${value}`).join(',\\ ')
const signedTerm = (value: number, literal = '') => `${value < 0 ? '-' : '+'}${Math.abs(value) === 1 && literal ? '' : Math.abs(value)}${literal}`
/** ax + by written as LaTeX */
const leftLatex = (a: number, b: number) => `${signedTerm(a, 'x')}${signedTerm(b, 'y')}`.replace(/^\+/, '')

type Built = Omit<WorkedCase<Dbh4EquationAnyError>, 'options'>

function build(random: Random, error: Dbh4EquationAnyError): Built | null {
    if (error in equationDetectiveNames) return buildEquationDetectiveCase(random, error as EquationDetectiveError)
    const problem = (latex: string) => say(`Ebatzi: $${latex}$`, `Resuelve: $${latex}$`, `حلّ: $${latex}$`, `Solve: $${latex}$`)
    switch (error as Dbh4EquationError) {
        case 'biquadratic-t-as-x': {
            const p = randomInt(random, 1, 3)
            const q = randomInt(random, p + 1, 5)
            const [t1, t2] = [p * p, q * q]
            const right = sorted([p, -p, q, -q])
            return {
                problem: problem(`${polyLatex([1, 0, -(t1 + t2), 0, t1 * t2])}=0`),
                lines: [line(LABELS.change, `${polyLatex([1, -(t1 + t2), t1 * t2], 't')}=0`), line(LABELS.tValues, `t_{1}=${t1},\\ t_{2}=${t2}`), line(LABELS.solutions, solutionsLatex([t1, t2]))],
                wrong: 2, error, fix: `x=\\pm\\sqrt{t}\\ \\to\\ ${plusMinusLatex([p, q])}`, right: solutionsValue(right), reached: solutionsValue([t1, t2])
            }
        }
        case 'biquadratic-negative-t': {
            const p = randomInt(random, 1, 4)
            const q = randomInt(random, 1, 3)
            if (p === q) return null
            const [t1, t2] = [p * p, -q * q]
            const reached = sorted([p, -p, q, -q])
            return {
                problem: problem(`${polyLatex([1, 0, -(t1 + t2), 0, t1 * t2])}=0`),
                lines: [line(LABELS.change, `${polyLatex([1, -(t1 + t2), t1 * t2], 't')}=0`), line(LABELS.tValues, `t_{1}=${t1},\\ t_{2}=${t2}`), line(LABELS.solutions, plusMinusLatex([Math.min(p, q), Math.max(p, q)]))],
                wrong: 2, error, fix: `x^{2}=${t2}\\ \\to\\ ${plusMinusLatex([p])}`, right: solutionsValue([-p, p]), reached: solutionsValue(reached)
            }
        }
        case 'square-sides-separately': {
            // √(x + c) = x + d; the wrong squaring x + c = x² + d² must have whole roots, and so must the right one
            const s1 = randomInt(random, -4, 5)
            const d = pick(random, nonzero(-3, 3))
            const c = d * d - s1 * (1 - s1)
            const discriminant = (2 * d - 1) ** 2 - 4 * (d * d - c)
            const root = Math.sqrt(discriminant)
            if (discriminant < 0 || !Number.isInteger(root) || c === 0) return null
            const candidates = [(1 - 2 * d - root) / 2, (1 - 2 * d + root) / 2]
            const right = sorted(candidates.filter((x) => x + d >= 0 && x + c >= 0))
            const reached = sorted([s1, 1 - s1].filter((x, index, all) => all.indexOf(x) === index))
            if (right.length === 0 || !right.every(Number.isInteger) || solutionsValue(right) === solutionsValue(reached)) return null
            return {
                problem: problem(`\\sqrt{x${c > 0 ? '+' : '-'}${Math.abs(c)}}=x${d > 0 ? '+' : '-'}${Math.abs(d)}`),
                lines: [line(LABELS.square, `x${c > 0 ? '+' : '-'}${Math.abs(c)}=x^{2}+${d * d}`), line(LABELS.order, `${polyLatex([1, -1, d * d - c])}=0`), line(LABELS.solutions, solutionsLatex(reached))],
                wrong: 0, error, fix: `x${c > 0 ? '+' : '-'}${Math.abs(c)}=${polyLatex([1, 2 * d, d * d])}\\ \\to\\ ${solutionsLatex(right)}`, right: solutionsValue(right), reached: solutionsValue(reached)
            }
        }
        case 'extraneous-kept': {
            const r1 = randomInt(random, -6, 6)
            const r2 = randomInt(random, -6, 6)
            if (r1 === r2 || (r1 + r2) % 2 === 0) return null
            const d = (1 - r1 - r2) / 2
            const c = d * d - r1 * r2
            const good = [r1, r2].filter((x) => x + d >= 0)
            if (good.length !== 1 || c === 0 || d === 0) return null
            const bad = r1 === good[0] ? r2 : r1
            return {
                problem: problem(`\\sqrt{x${c > 0 ? '+' : '-'}${Math.abs(c)}}=x${d > 0 ? '+' : '-'}${Math.abs(d)}`),
                lines: [line(LABELS.square, `x${c > 0 ? '+' : '-'}${Math.abs(c)}=${polyLatex([1, 2 * d, d * d])}`), line(LABELS.candidates, `${polyLatex([1, 2 * d - 1, d * d - c])}=0`), line(LABELS.solutions, solutionsLatex(sorted([r1, r2])))],
                wrong: 2, error, fix: `x=${bad}\\ \\to\\ ${bad}${d > 0 ? '+' : '-'}${Math.abs(d)}<0\\ \\to\\ x=${good[0]}`, right: good[0], reached: solutionsValue(sorted([r1, r2]))
            }
        }
        case 'zero-denominator-kept': {
            const a = pick(random, nonzero(-5, 5))
            const r = pick(random, nonzero(-6, 6))
            if (a === r) return null
            return {
                problem: problem(`\\frac{${polyLatex(fromRoots(1, [a, r]))}}{x${a > 0 ? '-' : '+'}${Math.abs(a)}}=0`),
                lines: [line(LABELS.numerator, `${polyLatex(fromRoots(1, [a, r]))}=0`), line(LABELS.candidates, `x=${a},\\ x=${r}`), line(LABELS.solutions, solutionsLatex(sorted([a, r])))],
                wrong: 2, error, fix: `x\\ne ${a}\\ \\to\\ x=${r}`, right: r, reached: solutionsValue(sorted([a, r]))
            }
        }
        case 'exponent-as-number': {
            const base = pick(random, [2, 3, 5])
            const n = base === 2 ? randomInt(random, 3, 5) : 2
            const k = randomInt(random, 1, 3)
            const power = base ** n
            return {
                problem: problem(`${base}^{x+${k}}=${power}`),
                lines: [line(LABELS.base, `${base}^{x+${k}}=${base}^{${n}}`), line(LABELS.exponents, `x+${k}=${power}`), line(LABELS.solutions, `x=${power - k}`)],
                wrong: 1, error, fix: `x+${k}=${n}\\ \\to\\ x=${n - k}`, right: n - k, reached: power - k
            }
        }
        case 'negative-no-flip': {
            const a = randomInt(random, 2, 5)
            const root = pick(random, nonzero(-5, 5))
            const strict = random() < 0.5
            const right: Piece[] = [[null, root, false, !strict]]
            const reached: Piece[] = [[root, null, !strict, false]]
            const sign = strict ? '>' : '\\ge '
            return {
                problem: problem(`-${a}x${a * root > 0 ? '+' : '-'}${Math.abs(a * root)}${sign}0`),
                lines: [line(LABELS.transpose, `-${a}x${sign}${-a * root}`), line(LABELS.divide, `x${sign}${root}`), line(LABELS.set, setLatex(reached))],
                wrong: 1, error, fix: `x${strict ? '<' : '\\le '}${root}\\ \\to\\ ${setLatex(right)}`, right: setCode(right), reached: setCode(reached)
            }
        }
        case 'between-not-outside': {
            const r1 = randomInt(random, -6, 2)
            const r2 = randomInt(random, r1 + 1, 7)
            const strict = random() < 0.5
            const outside = random() < 0.5
            const between: Piece[] = [[r1, r2, !strict, !strict]]
            const out: Piece[] = [[null, r1, false, !strict], [r2, null, !strict, false]]
            const relation = outside ? (strict ? '>' : '\\ge ') : strict ? '<' : '\\le '
            const [right, reached] = outside ? [out, between] : [between, out]
            return {
                problem: problem(`${polyLatex(fromRoots(1, [r1, r2]))}${relation}0`),
                lines: [line(LABELS.roots, `x_{1}=${r1},\\ x_{2}=${r2}`), line(LABELS.sign, outside ? `${r1}${strict ? '<' : '\\le '}x${strict ? '<' : '\\le '}${r2}` : `x${strict ? '<' : '\\le '}${r1},\\ x${strict ? '>' : '\\ge '}${r2}`), line(LABELS.set, setLatex(reached))],
                wrong: 1, error, fix: setLatex(right), right: setCode(right), reached: setCode(reached)
            }
        }
        case 'divide-by-x-inequality': {
            const k = randomInt(random, 2, 7)
            const right: Piece[] = [[null, 0, false, false], [k, null, false, false]]
            const reached: Piece[] = [[k, null, false, false]]
            return {
                problem: problem(`x^{2}>${k}x`),
                lines: [line(LABELS.order, `x^{2}-${k}x>0`), line(LABELS.divide, `x>${k}`), line(LABELS.set, setLatex(reached))],
                wrong: 1, error, fix: `x(x-${k})>0\\ \\to\\ ${setLatex(right)}`, right: setCode(right), reached: setCode(reached)
            }
        }
        case 'square-one-side': {
            const r = randomInt(random, 2, 7)
            const strict = random() < 0.5
            const right: Piece[] = [[-r, r, !strict, !strict]]
            const reached: Piece[] = [[null, r, false, !strict]]
            return {
                problem: problem(`x^{2}${strict ? '<' : '\\le '}${r * r}`),
                lines: [line(LABELS.roots, `x=\\pm ${r}`), line(LABELS.sign, `x${strict ? '<' : '\\le '}${r}`), line(LABELS.set, setLatex(reached))],
                wrong: 1, error, fix: setLatex(right), right: setCode(right), reached: setCode(reached)
            }
        }
        case 'substitution-bracket': {
            const [x, y] = [randomInt(random, -3, 5), randomInt(random, -3, 5)]
            const a1 = pick(random, [2, 3, -2])
            const c1 = a1 * x + y
            const [a2, b2] = [pick(random, [1, 2, 3]), pick(random, [2, 3, 4])]
            const c2 = a2 * x + b2 * y
            // Wrong: a2·x + b2·c1 − a1·x = c2
            const slope = a2 - a1
            if (slope === 0 || (c2 - b2 * c1) % slope !== 0) return null
            const wx = (c2 - b2 * c1) / slope
            const wy = c1 - a1 * wx
            if (wx === x) return null
            const system = `\\begin{cases}${leftLatex(a1, 1)}=${c1}\\\\${leftLatex(a2, b2)}=${c2}\\end{cases}`
            return {
                problem: problem(system),
                lines: [line(LABELS.isolate, `y=${c1}${signedTerm(-a1, 'x')}`), line(LABELS.substitute, `${a2 === 1 ? '' : a2}x+${b2}\\cdot ${c1}${signedTerm(-a1, 'x')}=${c2}`), line(LABELS.solutions, systemLatex(wx, wy))],
                wrong: 1, error, fix: `${a2 === 1 ? '' : a2}x+${b2}(${c1}${signedTerm(-a1, 'x')})=${c2}\\ \\to\\ ${systemLatex(x, y)}`, right: systemCode(x, y), reached: systemCode(wx, wy)
            }
        }
        case 'reduction-sign': {
            const [x, y] = [randomInt(random, -3, 5), randomInt(random, -3, 5)]
            const b = pick(random, [2, 3])
            const [a1, a2] = [1, pick(random, [3, 4, 5])]
            const [c1, c2] = [a1 * x + b * y, a2 * x + b * y]
            // (a1 − a2)x = c1 − c2, written with the constant of the wrong sign
            const right = c1 - c2
            if (right === 0) return null
            const wx = -right / (a1 - a2)
            if (!Number.isInteger(wx) || wx === x) return null
            const wy = (c1 - a1 * wx) / b
            if (!Number.isInteger(wy)) return null
            return {
                problem: problem(`\\begin{cases}${leftLatex(a1, b)}=${c1}\\\\${leftLatex(a2, b)}=${c2}\\end{cases}`),
                lines: [line(LABELS.subtract, `${a1 - a2}x=${c1}-${c2 < 0 ? `(${c2})` : c2}`), line(LABELS.divide, `${a1 - a2}x=${-right}`), line(LABELS.solutions, systemLatex(wx, wy))],
                wrong: 1, error, fix: `${a1 - a2}x=${right}\\ \\to\\ ${systemLatex(x, y)}`, right: systemCode(x, y), reached: systemCode(wx, wy)
            }
        }
        case 'isolate-sign': {
            const [x, y] = [randomInt(random, -3, 5), randomInt(random, -3, 5)]
            const a1 = pick(random, [2, 3])
            const c1 = a1 * x + y
            const [a2, b2] = [pick(random, [1, 2]), pick(random, [1, 2, 3])]
            const c2 = a2 * x + b2 * y
            // Wrong: y = c1 + a1·x, so a2·x + b2(c1 + a1·x) = c2
            const slope = a2 + b2 * a1
            if ((c2 - b2 * c1) % slope !== 0) return null
            const wx = (c2 - b2 * c1) / slope
            const wy = c1 + a1 * wx
            if (wx === x) return null
            return {
                problem: problem(`\\begin{cases}${leftLatex(a1, 1)}=${c1}\\\\${leftLatex(a2, b2)}=${c2}\\end{cases}`),
                lines: [line(LABELS.isolate, `y=${c1}+${a1}x`), line(LABELS.substitute, `${a2 === 1 ? '' : a2}x+${b2 === 1 ? '' : b2}(${c1}+${a1}x)=${c2}`), line(LABELS.solutions, systemLatex(wx, wy))],
                wrong: 0, error, fix: `y=${c1}-${a1}x\\ \\to\\ ${systemLatex(x, y)}`, right: systemCode(x, y), reached: systemCode(wx, wy)
            }
        }
        case 'multiply-one-side': {
            const [x, y] = [randomInt(random, -3, 5), randomInt(random, -3, 5)]
            const k = pick(random, [2, 3])
            const [a1, b1] = [1, 1]
            const [a2, b2] = [k, pick(random, [-1, 2, -2, 3])]
            if (b2 === k) return null
            const [c1, c2] = [a1 * x + b1 * y, a2 * x + b2 * y]
            // First equation times k on the left only: kx + ky = c1; subtracting the second: (k − b2)y = c1 − c2
            if ((c1 - c2) % (k - b2) !== 0) return null
            const wy = (c1 - c2) / (k - b2)
            const wx = c1 - wy
            if (wy === y) return null
            return {
                problem: problem(`\\begin{cases}x+y=${c1}\\\\${leftLatex(a2, b2)}=${c2}\\end{cases}`),
                lines: [line(LABELS.multiply, `${k}x+${k}y=${c1}`), line(LABELS.subtract, `${k - b2}y=${c1 - c2}`), line(LABELS.solutions, systemLatex(wx, wy))],
                wrong: 0, error, fix: `${k}x+${k}y=${k * c1}\\ \\to\\ ${systemLatex(x, y)}`, right: systemCode(x, y), reached: systemCode(wx, wy)
            }
        }
    }
}

export const createEquationsDetectiveCases = (track: EquationsTrack) => (random: Random, levelIndex: number) => createWorkedCases(random, equationsDetectiveLevels[track][levelIndex], EQUATIONS_DETECTIVE_CASES, build)
