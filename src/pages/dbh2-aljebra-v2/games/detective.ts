import { reduceTerms, termLatex, termsLatex, type Term } from '../../dbh1-aljebra-v2/algebra.ts'
import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Aljebraren detektibea (2. DBH): a worked calculation of three lines with
   one wrong line. Level 1: monomials and numerical value (exponents added
   when adding like terms, unlike terms added, exponents multiplied in a
   product, a negative squared without brackets); level 2: polynomials (a
   minus before a bracket that changes only the first sign, the
   distributive law applied to the first term only, a product of binomials
   with only the first and last terms, exponents divided in a quotient);
   level 3: special products and common factor (the square without 2ab,
   the coefficient not squared, the common factor not divided out of every
   term, the 1 left out). Lines end on polynomials: the right and reached
   values are the polynomials at x = 2.
   ========================================================================== */

export type AlgebraDetectiveError =
    | 'like-exponents'
    | 'unlike-added'
    | 'product-exponents'
    | 'negative-square'
    | 'minus-bracket'
    | 'distribute-first'
    | 'product-missing'
    | 'quotient-exponents'
    | 'square-no-middle'
    | 'square-coefficient'
    | 'factor-not-divided'
    | 'factor-lost-one'

export const algebraDetectiveLevels: AlgebraDetectiveError[][] = [
    ['like-exponents', 'unlike-added', 'product-exponents', 'negative-square'],
    ['minus-bracket', 'distribute-first', 'product-missing', 'quotient-exponents'],
    ['square-no-middle', 'square-coefficient', 'factor-not-divided', 'factor-lost-one']
]

export const ALGEBRA_DETECTIVE_CASES = 6
/** The point where the right and the reached polynomials are compared */
export const ALGEBRA_DETECTIVE_X = 2

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    group: say('Taldekatu', 'Agrupa', 'اجمع المتشابهة', 'Group'),
    add: say('Batu antzekoak', 'Suma semejantes', 'اجمع الحدود المتشابهة', 'Add like terms'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    coefficients: say('Koefizienteak', 'Coeficientes', 'المعاملات', 'Coefficients'),
    powers: say('Berreturak', 'Potencias', 'القوى', 'Powers'),
    substitute: say('Ordeztu', 'Sustituye', 'عوّض', 'Substitute'),
    power: say('Berretura', 'Potencia', 'القوة', 'Power'),
    bracket: say('Kendu parentesia', 'Quita el paréntesis', 'احذف القوسين', 'Remove the bracket'),
    distribute: say('Banatze-propietatea', 'Propiedad distributiva', 'خاصية التوزيع', 'Distributive law'),
    multiply: say('Biderkatu', 'Multiplica', 'اضرب', 'Multiply'),
    rule: say('Araua', 'Regla', 'القاعدة', 'Rule'),
    each: say('Gai bakoitza', 'Cada término', 'كل حد', 'Each term'),
    factor: say('Faktore komuna', 'Factor común', 'العامل المشترك', 'Common factor'),
    check: say('Egiaztatu', 'Comprueba', 'تحقّق', 'Check')
}

export const algebraDetectiveNames: Record<AlgebraDetectiveError, LocalizedText> = {
    'like-exponents': say('Antzekoak batzean berretzaileak batu ditu', 'Al sumar semejantes sumó también los exponentes', 'عند جمع المتشابهة جمع الأسس أيضًا', 'Added the exponents too when adding like terms'),
    'unlike-added': say('Antzekoak ez diren gaiak batu ditu', 'Sumó términos que no son semejantes', 'جمع حدودًا غير متشابهة', 'Added terms that are not like terms'),
    'product-exponents': say('Biderkatzean berretzaileak biderkatu ditu', 'Al multiplicar, multiplicó los exponentes', 'عند الضرب ضرب الأسس', 'Multiplied the exponents when multiplying'),
    'negative-square': say('Negatiboa parentesirik gabe ber bi egin du', 'Elevó el negativo al cuadrado sin paréntesis', 'ربّع العدد السالب دون أقواس', 'Squared the negative number without brackets'),
    'minus-bracket': say('Minusaren atzean lehen zeinua bakarrik aldatu du', 'Tras el menos solo cambió el primer signo', 'بعد الناقص غيّر الإشارة الأولى فقط', 'After the minus sign, changed only the first sign'),
    'distribute-first': say('Lehen gaia bakarrik biderkatu du', 'Multiplicó solo el primer término', 'ضرب الحد الأول فقط', 'Multiplied only the first term'),
    'product-missing': say('Lehenak eta azkenak bakarrik biderkatu ditu', 'Multiplicó solo los primeros y los últimos', 'ضرب الأولين والأخيرين فقط', 'Multiplied only the first and the last terms'),
    'quotient-exponents': say('Zatitzean berretzaileak zatitu ditu', 'Al dividir, dividió los exponentes', 'عند القسمة قسم الأسس', 'Divided the exponents when dividing'),
    'square-no-middle': say('Karratuan 2ab gaia ahaztu du', 'En el cuadrado olvidó el término 2ab', 'في المربع نسي الحد 2ab', 'Forgot the 2ab term in the square'),
    'square-coefficient': say('Koefizientea ez du ber bi egin', 'No elevó al cuadrado el coeficiente', 'لم يربّع المعامل', 'Did not square the coefficient'),
    'factor-not-divided': say('Faktore komuna ez du gai guztietatik zatitu', 'No dividió todos los términos entre el factor común', 'لم يقسم كل الحدود على العامل المشترك', 'Did not divide every term by the common factor'),
    'factor-lost-one': say('Faktore komuna ateratzean 1 ahaztu du', 'Al sacar factor común olvidó el 1', 'عند إخراج العامل المشترك نسي العدد 1', 'Forgot the 1 when taking out the common factor')
}

export const algebraDetectiveTips: Record<AlgebraDetectiveError, LocalizedText> = {
    'like-exponents': say('$3x+2x=5x$: koefizienteak batzen dira eta letra ez da aldatzen.', '$3x+2x=5x$: se suman los coeficientes y la parte literal no cambia.', '$3x+2x=5x$: تُجمع المعاملات ويبقى الجزء الحرفي كما هو.', '$3x+2x=5x$: the coefficients add up and the letter part stays the same.'),
    'unlike-added': say('$x^{2}$ eta $x$ ez dira antzekoak: bakoitza bere aldetik geratzen da.', '$x^{2}$ y $x$ no son semejantes: cada uno se queda como está.', '$x^{2}$ و$x$ غير متشابهين: يبقى كل منهما كما هو.', '$x^{2}$ and $x$ are not like terms: each one stays as it is.'),
    'product-exponents': say('$x^{2}\\cdot x^{3}=x^{5}$: oinarri bereko berreturak biderkatzean berretzaileak batzen dira.', '$x^{2}\\cdot x^{3}=x^{5}$: al multiplicar potencias de igual base se suman los exponentes.', '$x^{2}\\cdot x^{3}=x^{5}$: عند ضرب قوى لها الأساس نفسه تُجمع الأسس.', '$x^{2}\\cdot x^{3}=x^{5}$: when multiplying powers with the same base, add the exponents.'),
    'negative-square': say('$(-3)^{2}=9$: zenbaki negatiboa parentesi artean ordezten da.', '$(-3)^{2}=9$: el número negativo se sustituye entre paréntesis.', '$(-3)^{2}=9$: يُعوَّض العدد السالب بين قوسين.', '$(-3)^{2}=9$: a negative number is substituted in brackets.'),
    'minus-bracket': say('$-(a-b+c)=-a+b-c$: zeinu guztiak aldatzen dira.', '$-(a-b+c)=-a+b-c$: cambian todos los signos.', '$-(a-b+c)=-a+b-c$: تتغيّر كل الإشارات.', '$-(a-b+c)=-a+b-c$: every sign changes.'),
    'distribute-first': say('$a(b+c)=ab+ac$: kanpoko zenbakiak gai guztiak biderkatzen ditu.', '$a(b+c)=ab+ac$: el número de fuera multiplica a todos los términos.', '$a(b+c)=ab+ac$: العدد الخارجي يضرب كل الحدود.', '$a(b+c)=ab+ac$: the number outside multiplies every term.'),
    'product-missing': say('$(x+a)(x+b)$: gai bakoitza beste guztiekin biderkatzen da, lau biderkadura.', '$(x+a)(x+b)$: cada término por todos los del otro, cuatro productos.', '$(x+a)(x+b)$: كل حد في كل حدود الآخر، أربعة جداءات.', '$(x+a)(x+b)$: each term times every term of the other, four products.'),
    'quotient-exponents': say('$x^{6}\\div x^{2}=x^{4}$: oinarri bereko berreturak zatitzean berretzaileak kentzen dira.', '$x^{6}\\div x^{2}=x^{4}$: al dividir potencias de igual base se restan los exponentes.', '$x^{6}\\div x^{2}=x^{4}$: عند قسمة قوى لها الأساس نفسه تُطرح الأسس.', '$x^{6}\\div x^{2}=x^{4}$: when dividing powers with the same base, subtract the exponents.'),
    'square-no-middle': say('$(a+b)^{2}=a^{2}+2ab+b^{2}$: ez ahaztu erdiko gaia.', '$(a+b)^{2}=a^{2}+2ab+b^{2}$: no olvides el término del medio.', '$(a+b)^{2}=a^{2}+2ab+b^{2}$: لا تنسَ الحد الأوسط.', '$(a+b)^{2}=a^{2}+2ab+b^{2}$: do not forget the middle term.'),
    'square-coefficient': say('$(3x)^{2}=9x^{2}$: koefizientea ere ber bi egiten da.', '$(3x)^{2}=9x^{2}$: también se eleva el coeficiente.', '$(3x)^{2}=9x^{2}$: يُربَّع المعامل أيضًا.', '$(3x)^{2}=9x^{2}$: the coefficient is squared too.'),
    'factor-not-divided': say('Gai bakoitza faktore komunaz zatitzen da. Egiaztatu biderkatuz.', 'Cada término se divide entre el factor común. Comprueba multiplicando.', 'يُقسم كل حد على العامل المشترك. تحقّق بالضرب.', 'Each term is divided by the common factor. Check by multiplying.'),
    'factor-lost-one': say('$5x\\div 5x=1$: gaia osorik ateratzean, 1 geratzen da.', '$5x\\div 5x=1$: si sale el término entero, queda un 1.', '$5x\\div 5x=1$: إذا خرج الحد كله يبقى 1.', '$5x\\div 5x=1$: when the whole term comes out, a 1 is left.')
}

const t = (coefficient: number, power: number): Term => ({ coefficient, power })
const mono = (coefficient: number, power: number) => termLatex(t(coefficient, power))
const poly = (terms: Term[]) => termsLatex(reduceTerms(terms))
/** A polynomial with its terms as given, not reduced */
const raw = (terms: Term[]) => termsLatex(terms.filter((term) => term.coefficient !== 0))
/** A number in a product: negative ones in brackets */
const factor = (value: number) => (value < 0 ? `(${value})` : String(value))
export const polynomialAt = (terms: Term[], x: number) => terms.reduce((total, term) => total + term.coefficient * x ** term.power, 0)
const at = (terms: Term[]) => polynomialAt(terms, ALGEBRA_DETECTIVE_X)
const signed = (values: number[]) => values.filter((value) => value !== 0)
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))
const range = (min: number, max: number) => Array.from({ length: max - min + 1 }, (_, index) => index + min)

type Built = Omit<WorkedCase<AlgebraDetectiveError>, 'options'>

function build(random: Random, error: AlgebraDetectiveError): Built | null {
    switch (error) {
        case 'like-exponents': {
            const a = pick(random, signed(range(-5, 5)))
            const b = randomInt(random, 2, 7)
            const c = pick(random, signed(range(-6, 6)))
            const d = pick(random, signed(range(-9, 9)))
            if (b + c === 0) return null
            const right = [t(a, 2), t(b + c, 1), t(d, 0)]
            const reached = [t(a + b + c, 2), t(d, 0)]
            return {
                problem: say(`Laburtu: $${raw([t(b, 1), t(a, 2), t(d, 0), t(c, 1)])}$`, `Reduce: $${raw([t(b, 1), t(a, 2), t(d, 0), t(c, 1)])}$`, `اختصر: $${raw([t(b, 1), t(a, 2), t(d, 0), t(c, 1)])}$`, `Simplify: $${raw([t(b, 1), t(a, 2), t(d, 0), t(c, 1)])}$`),
                lines: [
                    line(LABELS.group, raw([t(a, 2), t(b, 1), t(c, 1), t(d, 0)])),
                    line(LABELS.add, `${raw([t(b, 1), t(c, 1)])}=${mono(b + c, 2)}`),
                    line(LABELS.result, poly(reached))
                ],
                wrong: 1,
                error,
                fix: `${raw([t(b, 1), t(c, 1)])}=${mono(b + c, 1)}\\ \\to\\ ${poly(right)}`,
                right: at(right),
                reached: at(reached)
            }
        }
        case 'unlike-added': {
            const a = randomInt(random, 2, 6)
            const c = pick(random, signed(range(-5, 5)))
            const b = randomInt(random, 2, 8)
            if (a + c === 0) return null
            const right = [t(a + c, 2), t(b, 1)]
            const reached = [t(a + c + b, 3)]
            return {
                problem: say(`Laburtu: $${raw([t(a, 2), t(b, 1), t(c, 2)])}$`, `Reduce: $${raw([t(a, 2), t(b, 1), t(c, 2)])}$`, `اختصر: $${raw([t(a, 2), t(b, 1), t(c, 2)])}$`, `Simplify: $${raw([t(a, 2), t(b, 1), t(c, 2)])}$`),
                lines: [
                    line(LABELS.group, raw([t(a, 2), t(c, 2), t(b, 1)])),
                    line(LABELS.add, poly(right)),
                    line(LABELS.result, `${poly(right)}=${poly(reached)}`)
                ],
                wrong: 2,
                error,
                fix: poly(right),
                right: at(right),
                reached: at(reached)
            }
        }
        case 'product-exponents': {
            const p = randomInt(random, 2, 4)
            const q = randomInt(random, 3, 5)
            const a = pick(random, [2, 3, 4, -2, -3])
            const b = pick(random, [2, 3, 5, -1, -2])
            const c = pick(random, [2, 3, -1])
            if (p * q === p + q) return null
            const product = a * b * c
            const right = [t(product, p + q + 1)]
            const reached = [t(product, p * q + 1)]
            return {
                problem: say(`Biderkatu: $${mono(a, p)}\\cdot ${factor(b)}x^{${q}}\\cdot ${factor(c)}x$`, `Multiplica: $${mono(a, p)}\\cdot ${factor(b)}x^{${q}}\\cdot ${factor(c)}x$`, `اضرب: $${mono(a, p)}\\cdot ${factor(b)}x^{${q}}\\cdot ${factor(c)}x$`, `Multiply: $${mono(a, p)}\\cdot ${factor(b)}x^{${q}}\\cdot ${factor(c)}x$`),
                lines: [
                    line(LABELS.coefficients, `${a}\\cdot ${factor(b)}\\cdot ${factor(c)}=${product}`),
                    line(LABELS.powers, `x^{${p}}\\cdot x^{${q}}\\cdot x=x^{${p * q + 1}}`),
                    line(LABELS.result, poly(reached))
                ],
                wrong: 1,
                error,
                fix: `x^{${p}}\\cdot x^{${q}}\\cdot x=x^{${p + q + 1}}\\ \\to\\ ${poly(right)}`,
                right: at(right),
                reached: at(reached)
            }
        }
        case 'negative-square': {
            const k = randomInt(random, 2, 5)
            const a = randomInt(random, 2, 5)
            const b = pick(random, signed(range(-6, 6)))
            const right = a * k * k - b * k
            const reached = -a * k * k - b * k
            return {
                problem: say(`Kalkulatu $${raw([t(a, 2), t(b, 1)])}$ adierazpenaren zenbakizko balioa, $x=-${k}$ denean.`, `Calcula el valor numérico de $${raw([t(a, 2), t(b, 1)])}$ para $x=-${k}$.`, `احسب القيمة العددية لـ $${raw([t(a, 2), t(b, 1)])}$ عندما $x=-${k}$.`, `Work out the numerical value of $${raw([t(a, 2), t(b, 1)])}$ for $x=-${k}$.`),
                lines: [
                    line(LABELS.substitute, `${a}\\cdot(-${k})^{2}${b < 0 ? '-' : '+'}${Math.abs(b)}\\cdot(-${k})`),
                    line(LABELS.power, `(-${k})^{2}=-${k * k}`),
                    line(LABELS.result, `${a}\\cdot(-${k * k})${-b * k < 0 ? '' : '+'}${-b * k}=${reached}`)
                ],
                wrong: 1,
                error,
                fix: `(-${k})^{2}=${k * k}\\ \\to\\ ${a}\\cdot ${k * k}${-b * k < 0 ? '' : '+'}${-b * k}=${right}`,
                right,
                reached
            }
        }
        case 'minus-bracket': {
            const [a, d] = [randomInt(random, 3, 9), randomInt(random, 1, 4)]
            const [b, e] = [pick(random, signed(range(-6, 6))), randomInt(random, 2, 7)]
            const f = randomInt(random, 2, 9)
            const first = [t(a, 2), t(b, 1)]
            const second = [t(d, 2), t(-e, 1), t(f, 0)]
            const removed = [t(-d, 2), t(-e, 1), t(f, 0)]
            const right = reduceTerms([...first, ...second.map((term) => t(-term.coefficient, term.power))])
            const reached = reduceTerms([...first, ...removed])
            return {
                problem: say(`Kendu: $(${raw(first)})-(${raw(second)})$`, `Resta: $(${raw(first)})-(${raw(second)})$`, `اطرح: $(${raw(first)})-(${raw(second)})$`, `Subtract: $(${raw(first)})-(${raw(second)})$`),
                lines: [
                    line(LABELS.bracket, raw([...first, ...removed])),
                    line(LABELS.group, raw([t(a, 2), t(-d, 2), t(b, 1), t(-e, 1), t(f, 0)])),
                    line(LABELS.result, poly(reached))
                ],
                wrong: 0,
                error,
                fix: `${raw([...first, t(-d, 2), t(e, 1), t(-f, 0)])}\\ \\to\\ ${poly(right)}`,
                right: at(right),
                reached: at(reached)
            }
        }
        case 'distribute-first': {
            const a = randomInt(random, 2, 6)
            const b = randomInt(random, 2, 9)
            const c = randomInt(random, 2, 5)
            const d = randomInt(random, 1, 7)
            const right = [t(a + c, 1), t(a * b - c * d, 0)]
            const reached = [t(a + c, 1), t(b - c * d, 0)]
            return {
                problem: say(`Eragin eta laburtu: $${c}(x-${d})+${a}(x+${b})$`, `Opera y reduce: $${c}(x-${d})+${a}(x+${b})$`, `بسّط: $${c}(x-${d})+${a}(x+${b})$`, `Expand and simplify: $${c}(x-${d})+${a}(x+${b})$`),
                lines: [
                    line(LABELS.distribute, `${c}(x-${d})=${raw([t(c, 1), t(-c * d, 0)])}`),
                    line(LABELS.distribute, `${a}(x+${b})=${raw([t(a, 1), t(b, 0)])}`),
                    line(LABELS.result, poly(reached))
                ],
                wrong: 1,
                error,
                fix: `${a}(x+${b})=${raw([t(a, 1), t(a * b, 0)])}\\ \\to\\ ${poly(right)}`,
                right: at(right),
                reached: at(reached)
            }
        }
        case 'product-missing': {
            const a = randomInt(random, 1, 6)
            const b = pick(random, signed(range(-5, 6)))
            const c = randomInt(random, 2, 6)
            // Not a square nor a sum by difference: those are special products
            if (a + b === 0 || a === b) return null
            const right = [t(2, 2), t(a + b + c, 1), t(a * b, 0)]
            const reached = [t(2, 2), t(c, 1), t(a * b, 0)]
            return {
                problem: say(`Eragin eta laburtu: $x(x+${c})+(x+${a})(${raw([t(1, 1), t(b, 0)])})$`, `Opera y reduce: $x(x+${c})+(x+${a})(${raw([t(1, 1), t(b, 0)])})$`, `بسّط: $x(x+${c})+(x+${a})(${raw([t(1, 1), t(b, 0)])})$`, `Expand and simplify: $x(x+${c})+(x+${a})(${raw([t(1, 1), t(b, 0)])})$`),
                lines: [
                    line(LABELS.distribute, `x(x+${c})=x^{2}+${c}x`),
                    line(LABELS.multiply, `(x+${a})(${raw([t(1, 1), t(b, 0)])})=${raw([t(1, 2), t(a * b, 0)])}`),
                    line(LABELS.result, poly(reached))
                ],
                wrong: 1,
                error,
                fix: `(x+${a})(${raw([t(1, 1), t(b, 0)])})=${poly([t(1, 2), t(a + b, 1), t(a * b, 0)])}\\ \\to\\ ${poly(right)}`,
                right: at(right),
                reached: at(reached)
            }
        }
        case 'quotient-exponents': {
            const [p, q] = pick(random, [[6, 2], [8, 2], [6, 3], [9, 3], [8, 4], [10, 2]] as const)
            const k = randomInt(random, 2, 5)
            const b = pick(random, [2, 3, 4])
            const c = pick(random, [2, 3, -2, -1])
            const right = [t(k * c, p - q + 1)]
            const reached = [t(k * c, p / q + 1)]
            return {
                problem: say(`Eragin: $${mono(k * b, p)}\\div ${mono(b, q)}\\cdot ${factor(c)}x$`, `Opera: $${mono(k * b, p)}\\div ${mono(b, q)}\\cdot ${factor(c)}x$`, `احسب: $${mono(k * b, p)}\\div ${mono(b, q)}\\cdot ${factor(c)}x$`, `Work out: $${mono(k * b, p)}\\div ${mono(b, q)}\\cdot ${factor(c)}x$`),
                lines: [
                    line(LABELS.coefficients, `${k * b}\\div ${b}=${k}`),
                    line(LABELS.powers, `x^{${p}}\\div x^{${q}}=x^{${p / q}}`),
                    line(LABELS.result, `${mono(k, p / q)}\\cdot ${factor(c)}x=${poly(reached)}`)
                ],
                wrong: 1,
                error,
                fix: `x^{${p}}\\div x^{${q}}=x^{${p - q}}\\ \\to\\ ${poly(right)}`,
                right: at(right),
                reached: at(reached)
            }
        }
        case 'square-no-middle': {
            const a = pick(random, signed(range(-6, 6)))
            const b = randomInt(random, 1, 9)
            if (2 * a === b) return null
            const binomial = raw([t(1, 1), t(a, 0)])
            const right = [t(1, 2), t(2 * a - b, 1), t(a * a, 0)]
            const reached = [t(1, 2), t(-b, 1), t(a * a, 0)]
            return {
                problem: say(`Garatu eta laburtu: $(${binomial})^{2}-${b}x$`, `Desarrolla y reduce: $(${binomial})^{2}-${b}x$`, `انشر وبسّط: $(${binomial})^{2}-${b}x$`, `Expand and simplify: $(${binomial})^{2}-${b}x$`),
                lines: [
                    line(LABELS.rule, `(${binomial})^{2}=x^{2}+${a * a}`),
                    line(LABELS.group, `x^{2}+${a * a}-${b}x`),
                    line(LABELS.result, poly(reached))
                ],
                wrong: 0,
                error,
                fix: `(${binomial})^{2}=${poly([t(1, 2), t(2 * a, 1), t(a * a, 0)])}\\ \\to\\ ${poly(right)}`,
                right: at(right),
                reached: at(reached)
            }
        }
        case 'square-coefficient': {
            const a = randomInt(random, 2, 5)
            const b = pick(random, signed(range(-6, 6)))
            const binomial = raw([t(a, 1), t(b, 0)])
            const right = [t(a * a, 2), t(2 * a * b, 1), t(b * b, 0)]
            const reached = [t(a, 2), t(2 * a * b, 1), t(b * b, 0)]
            return {
                problem: say(`Garatu: $(${binomial})^{2}$`, `Desarrolla: $(${binomial})^{2}$`, `انشر: $(${binomial})^{2}$`, `Expand: $(${binomial})^{2}$`),
                lines: [
                    line(LABELS.rule, `(${a}x)^{2}${b < 0 ? '-' : '+'}2\\cdot ${a}x\\cdot ${Math.abs(b)}+${Math.abs(b)}^{2}`),
                    line(LABELS.each, `(${a}x)^{2}=${a}x^{2}`),
                    line(LABELS.result, poly(reached))
                ],
                wrong: 1,
                error,
                fix: `(${a}x)^{2}=${a * a}x^{2}\\ \\to\\ ${poly(right)}`,
                right: at(right),
                reached: at(reached)
            }
        }
        case 'factor-not-divided': {
            const g = randomInt(random, 2, 5)
            const m = randomInt(random, 2, 5)
            const n = pick(random, [-5, -4, -3, -2, 2, 3, 4, 5])
            // m and n with no common factor, so that g is the greatest one; short enough for a phone
            if (gcd(m, n) !== 1) return null
            const power = pick(random, [1, 2])
            if (g * g * Math.abs(n) >= 30 || (power === 2 && (g * g * Math.abs(n) >= 12 || m >= 5))) return null
            const original = [t(g * m, power + 1), t(g * n, power)]
            const reached = [t(g * m, power + 1), t(g * g * n, power)]
            return {
                problem: say(`Atera faktore komuna: $${raw(original)}$`, `Saca factor común: $${raw(original)}$`, `أخرج العامل المشترك: $${raw(original)}$`, `Take out the common factor: $${raw(original)}$`),
                lines: [
                    line(LABELS.factor, mono(g, power)),
                    line(LABELS.factor, `${mono(g, power)}(${raw([t(m, 1), t(g * n, 0)])})`),
                    line(LABELS.check, `${mono(g, power)}(${raw([t(m, 1), t(g * n, 0)])})=${poly(reached)}`)
                ],
                wrong: 1,
                error,
                fix: `${mono(g, power)}(${raw([t(m, 1), t(n, 0)])})=${poly(original)}`,
                right: at(original),
                reached: at(reached)
            }
        }
        case 'factor-lost-one': {
            const g = randomInt(random, 2, 9)
            const m = randomInt(random, 2, 6)
            const original = [t(g * m, 2), t(g, 1)]
            const reached = [t(g * m, 2)]
            return {
                problem: say(`Atera faktore komuna: $${raw(original)}$`, `Saca factor común: $${raw(original)}$`, `أخرج العامل المشترك: $${raw(original)}$`, `Take out the common factor: $${raw(original)}$`),
                lines: [
                    line(LABELS.factor, `${g}x`),
                    line(LABELS.factor, `${g}x\\cdot ${m}x`),
                    line(LABELS.check, `${g}x\\cdot ${m}x=${poly(reached)}`)
                ],
                wrong: 1,
                error,
                fix: `${g}x(${m}x+1)=${poly(original)}`,
                right: at(original),
                reached: at(reached)
            }
        }
    }
}

export const createAlgebraDetectiveCases = (random: Random, levelIndex: number) => createWorkedCases(random, algebraDetectiveLevels[levelIndex], ALGEBRA_DETECTIVE_CASES, build)
