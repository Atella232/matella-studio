import { pick, randomInt, type Random } from '../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../features/unit-v2/types.ts'
import { binomialLatex, fromRoots, multiply, polyLatex, ruffini, valueAt, type Coefficients } from './polynomials.ts'

/* ==========================================================================
   Polinomioen detektibea (4. DBH, applied and academic): a worked
   calculation of three lines with one wrong line. Operations (applied
   only), division and the remainder theorem, factorising, and algebraic
   fractions (academic only). Lines that end on a polynomial or a fraction
   are compared at x = POLY_DETECTIVE_X; remainders are plain numbers.
   ========================================================================== */

export type PolyDetectiveError =
    | 'minus-bracket'
    | 'product-first-last'
    | 'square-no-middle'
    | 'product-exponents'
    | 'divisor-sign'
    | 'missing-zero'
    | 'negative-power'
    | 'ruffini-subtract'
    | 'factor-sign'
    | 'leading-lost'
    | 'difference-as-square'
    | 'lost-one'
    | 'cancel-terms'
    | 'add-across'
    | 'minus-numerator'
    | 'opposite-binomials'

export type PolyTrack = 'applied' | 'academic'

export const polyDetectiveLevels: Record<PolyTrack, PolyDetectiveError[][]> = {
    applied: [
        ['minus-bracket', 'product-first-last', 'square-no-middle', 'product-exponents'],
        ['divisor-sign', 'missing-zero', 'negative-power', 'ruffini-subtract'],
        ['factor-sign', 'leading-lost', 'difference-as-square', 'lost-one']
    ],
    academic: [
        ['divisor-sign', 'missing-zero', 'negative-power', 'ruffini-subtract'],
        ['factor-sign', 'leading-lost', 'difference-as-square', 'lost-one'],
        ['cancel-terms', 'add-across', 'minus-numerator', 'opposite-binomials']
    ]
}

export const POLY_DETECTIVE_CASES = 6
export const POLY_DETECTIVE_X = 11

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    bracket: say('Kendu parentesia', 'Quita el paréntesis', 'احذف القوسين', 'Remove the bracket'),
    group: say('Taldekatu', 'Agrupa', 'اجمع المتشابهة', 'Group'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    multiply: say('Biderkatu', 'Multiplica', 'اضرب', 'Multiply'),
    rule: say('Araua', 'Regla', 'القاعدة', 'Rule'),
    coefficients: say('Koefizienteak', 'Coeficientes', 'المعاملات', 'Coefficients'),
    powers: say('Berreturak', 'Potencias', 'القوى', 'Powers'),
    divisor: say('Ruffini, honekin:', 'Ruffini con', 'روفيني مع', 'Ruffini with'),
    row: say('Ruffiniren lerroa', 'Fila de Ruffini', 'سطر روفيني', 'Ruffini row'),
    remainder: say('Hondarra', 'Resto', 'الباقي', 'Remainder'),
    theorem: say('Hondarraren teorema', 'Teorema del resto', 'مبرهنة الباقي', 'Remainder theorem'),
    substitute: say('Ordeztu', 'Sustituye', 'عوّض', 'Substitute'),
    roots: say('Erroak', 'Raíces', 'الجذور', 'Roots'),
    factors: say('Faktoreak', 'Factores', 'العوامل', 'Factors'),
    check: say('Egiaztatu', 'Comprueba', 'تحقّق', 'Check'),
    common: say('Faktore komuna', 'Factor común', 'العامل المشترك', 'Common factor'),
    identity: say('Identitate nabarmena', 'Identidad notable', 'المتطابقة الشهيرة', 'Special product'),
    simplify: say('Sinplifikatu', 'Simplifica', 'بسّط', 'Simplify'),
    sum: say('Batu', 'Suma', 'اجمع', 'Add'),
    numerator: say('Zenbakitzailea', 'Numerador', 'البسط', 'Numerator'),
    denominator: say('Izendatzaile bera', 'Mismo denominador', 'المقام نفسه', 'Same denominator')
}

export const polyDetectiveNames: Record<PolyDetectiveError, LocalizedText> = {
    'minus-bracket': say('Minusaren atzean lehen zeinua bakarrik aldatu du', 'Tras el menos solo cambió el primer signo', 'بعد الناقص غيّر الإشارة الأولى فقط', 'After the minus, changed only the first sign'),
    'product-first-last': say('Lehenak eta azkenak bakarrik biderkatu ditu', 'Multiplicó solo los primeros y los últimos', 'ضرب الأولين والأخيرين فقط', 'Multiplied only the first and the last terms'),
    'square-no-middle': say('Karratuan 2ab gaia ahaztu du', 'En el cuadrado olvidó el término 2ab', 'في المربع نسي الحد 2ab', 'Forgot the 2ab term in the square'),
    'product-exponents': say('Biderkatzean berretzaileak biderkatu ditu', 'Al multiplicar, multiplicó los exponentes', 'عند الضرب ضرب الأسس', 'Multiplied the exponents when multiplying'),
    'divisor-sign': say('x + a zatitzailearekin, a erabili du Ruffinin, −a beharrean', 'Con el divisor x + a usó a en Ruffini, no −a', 'مع القاسم x + a استعمل a في روفيني لا −a', 'With the divisor x + a, used a in Ruffini, not −a'),
    'missing-zero': say('Falta den mailaren zeroa ez du jarri', 'No puso el 0 del grado que falta', 'لم يضع 0 للدرجة الناقصة', 'Left out the 0 of the missing degree'),
    'negative-power': say('Negatibo baten berretura bakoitia positibotzat hartu du', 'Dio positiva una potencia impar de un negativo', 'جعل القوة الفردية لعدد سالب موجبة', 'Made an odd power of a negative number positive'),
    'ruffini-subtract': say('Ruffinin kendu egin du, batu beharrean', 'En Ruffini restó en vez de sumar', 'طرح في روفيني بدل الجمع', 'Subtracted in Ruffini instead of adding'),
    'factor-sign': say('x = a erroari (x + a) faktorea jarri dio', 'A la raíz x = a le puso el factor (x + a)', 'جعل للجذر x = a العامل (x + a)', 'Gave the root x = a the factor (x + a)'),
    'leading-lost': say('Koefiziente nagusia galdu du faktorizazioan', 'Perdió el coeficiente principal al factorizar', 'أضاع المعامل الرئيسي عند التحليل', 'Lost the leading coefficient when factorising'),
    'difference-as-square': say('Karratuen kendura kendura baten karratutzat hartu du', 'Tomó la diferencia de cuadrados por el cuadrado de una diferencia', 'اعتبر فرق المربعين مربع فرق', 'Took a difference of squares for the square of a difference'),
    'lost-one': say('Faktore komuna ateratzean 1 ahaztu du', 'Al sacar factor común olvidó el 1', 'عند إخراج العامل المشترك نسي العدد 1', 'Forgot the 1 when taking out the common factor'),
    'cancel-terms': say('Batugaiak sinplifikatu ditu, ez faktoreak', 'Simplificó sumandos, no factores', 'اختصر حدودًا مجموعة لا عوامل', 'Cancelled terms of a sum, not factors'),
    'add-across': say('Zenbakitzaileak eta izendatzaileak batu ditu', 'Sumó numeradores y denominadores', 'جمع البسوط والمقامات', 'Added the numerators and the denominators'),
    'minus-numerator': say('Zatikiaren aurreko minusak lehen gaiari bakarrik eragin dio', 'El menos delante de la fracción solo afectó al primer término', 'الناقص قبل الكسر أثّر في الحد الأول فقط', 'The minus before the fraction changed only the first term'),
    'opposite-binomials': say('$\\frac{x-a}{a-x}=1$ dela pentsatu du', 'Pensó que $\\frac{x-a}{a-x}=1$', 'ظن أن $\\frac{x-a}{a-x}=1$', 'Thought that $\\frac{x-a}{a-x}=1$')
}

export const polyDetectiveTips: Record<PolyDetectiveError, LocalizedText> = {
    'minus-bracket': say('$-(a-b+c)=-a+b-c$: zeinu guztiak aldatzen dira.', '$-(a-b+c)=-a+b-c$: cambian todos los signos.', '$-(a-b+c)=-a+b-c$: تتغيّر كل الإشارات.', '$-(a-b+c)=-a+b-c$: every sign changes.'),
    'product-first-last': say('Gai bakoitza beste guztiekin biderkatzen da.', 'Cada término se multiplica por todos los del otro.', 'كل حد يُضرب في كل حدود الآخر.', 'Each term multiplies every term of the other.'),
    'square-no-middle': say('$(a-b)^{2}=a^{2}-2ab+b^{2}$.', '$(a-b)^{2}=a^{2}-2ab+b^{2}$.', '$(a-b)^{2}=a^{2}-2ab+b^{2}$.', '$(a-b)^{2}=a^{2}-2ab+b^{2}$.'),
    'product-exponents': say('$x^{3}\\cdot x^{2}=x^{5}$: berretzaileak batzen dira.', '$x^{3}\\cdot x^{2}=x^{5}$: los exponentes se suman.', '$x^{3}\\cdot x^{2}=x^{5}$: تُجمع الأسس.', '$x^{3}\\cdot x^{2}=x^{5}$: the exponents add.'),
    'divisor-sign': say('$x+2=x-(-2)$: Ruffinin $-2$ erabiltzen da.', '$x+2=x-(-2)$: en Ruffini se usa $-2$.', '$x+2=x-(-2)$: نستعمل $-2$ في روفيني.', '$x+2=x-(-2)$: Ruffini uses $-2$.'),
    'missing-zero': say('$x^{3}-7x+6$: koefizienteak $1,\\ 0,\\ -7,\\ 6$ dira.', '$x^{3}-7x+6$: los coeficientes son $1,\\ 0,\\ -7,\\ 6$.', '$x^{3}-7x+6$: المعاملات $1,\\ 0,\\ -7,\\ 6$.', '$x^{3}-7x+6$: the coefficients are $1,\\ 0,\\ -7,\\ 6$.'),
    'negative-power': say('$(-2)^{3}=-8$, baina $(-2)^{2}=4$.', '$(-2)^{3}=-8$, pero $(-2)^{2}=4$.', '$(-2)^{3}=-8$ لكن $(-2)^{2}=4$.', '$(-2)^{3}=-8$, but $(-2)^{2}=4$.'),
    'ruffini-subtract': say('Ruffinin beti: biderkatu eta batu.', 'En Ruffini siempre: multiplica y suma.', 'في روفيني دائمًا: اضرب واجمع.', 'In Ruffini always: multiply and add.'),
    'factor-sign': say('$x=3$ erroa bada, faktorea $(x-3)$ da.', 'Si la raíz es $x=3$, el factor es $(x-3)$.', 'إذا كان الجذر $x=3$ فالعامل $(x-3)$.', 'If the root is $x=3$, the factor is $(x-3)$.'),
    'leading-lost': say('$P(x)=a(x-r_{1})(x-r_{2})$: a ez da galtzen.', '$P(x)=a(x-r_{1})(x-r_{2})$: la a no se pierde.', '$P(x)=a(x-r_{1})(x-r_{2})$: لا يضيع a.', '$P(x)=a(x-r_{1})(x-r_{2})$: the a is not lost.'),
    'difference-as-square': say('$a^{2}-b^{2}=(a+b)(a-b)$, ez $(a-b)^{2}$.', '$a^{2}-b^{2}=(a+b)(a-b)$, no $(a-b)^{2}$.', '$a^{2}-b^{2}=(a+b)(a-b)$ وليس $(a-b)^{2}$.', '$a^{2}-b^{2}=(a+b)(a-b)$, not $(a-b)^{2}$.'),
    'lost-one': say('$x^{3}+x^{2}=x^{2}(x+1)$: 1 geratzen da.', '$x^{3}+x^{2}=x^{2}(x+1)$: queda un 1.', '$x^{3}+x^{2}=x^{2}(x+1)$: يبقى 1.', '$x^{3}+x^{2}=x^{2}(x+1)$: a 1 is left.'),
    'cancel-terms': say('Faktoreak bakarrik sinplifikatzen dira: lehenik faktorizatu.', 'Solo se simplifican factores: primero factoriza.', 'لا تُختصر إلا العوامل: حلّل أولًا.', 'Only factors cancel: factorise first.'),
    'add-across': say('Zatikiak batzeko izendatzaile komuna behar da.', 'Para sumar fracciones hace falta denominador común.', 'لجمع الكسور نحتاج مقامًا مشتركًا.', 'Adding fractions needs a common denominator.'),
    'minus-numerator': say('$-\\frac{x-b}{c}$: minusak zenbakitzaile osoari eragiten dio.', '$-\\frac{x-b}{c}$: el menos afecta a todo el numerador.', '$-\\frac{x-b}{c}$: الناقص يشمل البسط كله.', '$-\\frac{x-b}{c}$: the minus applies to the whole numerator.'),
    'opposite-binomials': say('$a-x=-(x-a)$, beraz $\\frac{x-a}{a-x}=-1$.', '$a-x=-(x-a)$, así que $\\frac{x-a}{a-x}=-1$.', '$a-x=-(x-a)$ إذن $\\frac{x-a}{a-x}=-1$.', '$a-x=-(x-a)$, so $\\frac{x-a}{a-x}=-1$.')
}

const X = POLY_DETECTIVE_X
const at = (coefficients: Coefficients) => valueAt(coefficients, X)
const list = (values: number[]) => values.join(',\\ ')
const nonzero = (min: number, max: number) => Array.from({ length: max - min + 1 }, (_, index) => index + min).filter((value) => value !== 0)

type Built = Omit<WorkedCase<PolyDetectiveError>, 'options'>

function build(random: Random, error: PolyDetectiveError): Built | null {
    const problem = (es: string, eu: string, ar: string, en: string, latex: string) => say(`${eu}: $${latex}$`, `${es}: $${latex}$`, `${ar}: $${latex}$`, `${en}: $${latex}$`)
    switch (error) {
        case 'minus-bracket': {
            const first: Coefficients = [randomInt(random, 2, 6), pick(random, nonzero(-5, 5)), 0]
            const second: Coefficients = [randomInt(random, 1, 3), -randomInt(random, 2, 6), randomInt(random, 2, 9)]
            const right = first.map((c, i) => c - second[i])
            const reached = [first[0] - second[0], first[1] + second[1], second[2]]
            return {
                problem: problem('Resta', 'Kendu', 'اطرح', 'Subtract', `(${polyLatex(first)})-(${polyLatex(second)})`),
                lines: [line(LABELS.bracket, `${polyLatex(first)}${polyLatex([-second[0], second[1], second[2]])}`), line(LABELS.group, `${first[0]}x^{2}-${second[0]}x^{2}=${polyLatex([first[0] - second[0], 0, 0])}`), line(LABELS.result, polyLatex(reached))],
                wrong: 0, error, fix: `${polyLatex(first)}${polyLatex(second.map((c) => -c))}\\ \\to\\ ${polyLatex(right)}`, right: at(right), reached: at(reached)
            }
        }
        case 'product-first-last': {
            const a = randomInt(random, 1, 6)
            const b = pick(random, nonzero(-6, 6))
            if (a === -b || a === b) return null
            const c = randomInt(random, 2, 5)
            const product = multiply([1, a], [1, b])
            const total = [product[0] + c, product[1], product[2]]
            const wrongProduct = [1, 0, a * b]
            const reached = [1 + c, 0, a * b]
            return {
                problem: problem('Opera', 'Eragin', 'احسب', 'Work out', `${c}x^{2}+(${binomialLatex(-a)})(${binomialLatex(-b)})`),
                lines: [line(LABELS.multiply, `(${binomialLatex(-a)})(${binomialLatex(-b)})=${polyLatex(wrongProduct)}`), line(LABELS.group, `${c}x^{2}+${polyLatex(wrongProduct)}`), line(LABELS.result, polyLatex(reached))],
                wrong: 0, error, fix: `(${binomialLatex(-a)})(${binomialLatex(-b)})=${polyLatex(product)}\\ \\to\\ ${polyLatex(total)}`, right: at(total), reached: at(reached)
            }
        }
        case 'square-no-middle': {
            const a = randomInt(random, 2, 7)
            const b = randomInt(random, 1, 9)
            if (2 * a === b) return null
            const right = [1, -2 * a + b, a * a]
            const reached = [1, b, -a * a]
            return {
                problem: problem('Desarrolla y reduce', 'Garatu eta laburtu', 'انشر وبسّط', 'Expand and simplify', `(x-${a})^{2}+${b}x`),
                lines: [line(LABELS.identity, `(x-${a})^{2}=x^{2}-${a * a}`), line(LABELS.group, `x^{2}-${a * a}+${b}x`), line(LABELS.result, polyLatex(reached))],
                wrong: 0, error, fix: `(x-${a})^{2}=x^{2}-${2 * a}x+${a * a}\\ \\to\\ ${polyLatex(right)}`, right: at(right), reached: at(reached)
            }
        }
        case 'product-exponents': {
            const [p, q] = pick(random, [[3, 4], [2, 5], [4, 3], [3, 5]] as const)
            const [a, b] = [randomInt(random, 2, 4), randomInt(random, 2, 5)]
            const c = randomInt(random, 2, 9)
            // a·b·x^n + c·x as coefficient lists
            const withPower = (n: number): Coefficients => Array.from({ length: n + 1 }, (_, index) => (index === 0 ? a * b : index === n - 1 ? c : 0))
            const right = withPower(p + q)
            const reached = withPower(p * q)
            return {
                problem: problem('Opera', 'Eragin', 'احسب', 'Work out', `${a}x^{${p}}\\cdot ${b}x^{${q}}+${c}x`),
                lines: [line(LABELS.coefficients, `${a}\\cdot ${b}=${a * b}`), line(LABELS.powers, `x^{${p}}\\cdot x^{${q}}=x^{${p * q}}`), line(LABELS.result, polyLatex(reached))],
                wrong: 1, error, fix: `x^{${p}}\\cdot x^{${q}}=x^{${p + q}}\\ \\to\\ ${polyLatex(right)}`, right: at(right), reached: at(reached)
            }
        }
        case 'divisor-sign': {
            const p: Coefficients = [1, pick(random, nonzero(-4, 4)), pick(random, nonzero(-6, 6)), pick(random, nonzero(-9, 9))]
            const a = randomInt(random, 1, 3)
            const wrong = ruffini(p, a)
            const right = ruffini(p, -a)
            if (wrong.remainder === right.remainder) return null
            return {
                problem: say(`Kalkulatu $${polyLatex(p)}$ zati $x+${a}$ zatiketaren hondarra.`, `Halla el resto de dividir $${polyLatex(p)}$ entre $x+${a}$.`, `أوجد باقي قسمة $${polyLatex(p)}$ على $x+${a}$.`, `Find the remainder of $${polyLatex(p)}$ divided by $x+${a}$.`),
                lines: [line(LABELS.coefficients, list(p)), line(LABELS.divisor, `${a}`), line(LABELS.remainder, `R=${wrong.remainder}`)],
                wrong: 1, error, fix: `${-a}\\ \\to\\ R=${right.remainder}`, right: right.remainder, reached: wrong.remainder
            }
        }
        case 'missing-zero': {
            const p: Coefficients = [1, 0, pick(random, nonzero(-7, 7)), pick(random, nonzero(-9, 9))]
            const a = pick(random, [2, 3, -2, -1])
            const squeezed = [p[0], p[2], p[3]]
            const wrong = ruffini(squeezed, a)
            const right = ruffini(p, a)
            if (wrong.remainder === right.remainder) return null
            return {
                problem: say(`Kalkulatu $${polyLatex(p)}$ zati $${binomialLatex(a)}$ zatiketaren hondarra.`, `Halla el resto de dividir $${polyLatex(p)}$ entre $${binomialLatex(a)}$.`, `أوجد باقي قسمة $${polyLatex(p)}$ على $${binomialLatex(a)}$.`, `Find the remainder of $${polyLatex(p)}$ divided by $${binomialLatex(a)}$.`),
                lines: [line(LABELS.coefficients, list(squeezed)), line(LABELS.row, list(wrong.row)), line(LABELS.remainder, `R=${wrong.remainder}`)],
                wrong: 0, error, fix: `${list(p)}\\ \\to\\ R=${right.remainder}`, right: right.remainder, reached: wrong.remainder
            }
        }
        case 'negative-power': {
            const a = randomInt(random, 2, 3)
            const b = pick(random, nonzero(-4, 4))
            const c = pick(random, nonzero(-9, 9))
            const p: Coefficients = [1, 0, b, c]
            const right = valueAt(p, -a)
            const reached = a ** 3 - b * a + c
            return {
                problem: say(`Hondarraren teorema erabiliz, kalkulatu $${polyLatex(p)}$ zati $x+${a}$ zatiketaren hondarra.`, `Con el teorema del resto, halla el resto de dividir $${polyLatex(p)}$ entre $x+${a}$.`, `باستعمال مبرهنة الباقي أوجد باقي قسمة $${polyLatex(p)}$ على $x+${a}$.`, `Using the remainder theorem, find the remainder of $${polyLatex(p)}$ divided by $x+${a}$.`),
                lines: [line(LABELS.theorem, `R=P(-${a})`), line(LABELS.powers, `(-${a})^{3}=${a ** 3}`), line(LABELS.remainder, `R=${a ** 3}${b * -a < 0 ? '' : '+'}${b * -a}${c < 0 ? '' : '+'}${c}=${reached}`)],
                wrong: 1, error, fix: `(-${a})^{3}=-${a ** 3}\\ \\to\\ R=${right}`, right, reached
            }
        }
        case 'ruffini-subtract': {
            const p: Coefficients = [1, pick(random, nonzero(-4, 4)), pick(random, nonzero(-6, 6)), pick(random, nonzero(-9, 9))]
            const a = pick(random, [2, 3, -2])
            const row: number[] = []
            let carry = 0
            for (const coefficient of p) {
                carry = coefficient - carry * a
                row.push(carry)
            }
            const right = ruffini(p, a)
            if (row[3] === right.remainder) return null
            return {
                problem: say(`Kalkulatu $${polyLatex(p)}$ zati $${binomialLatex(a)}$ zatiketaren hondarra.`, `Halla el resto de dividir $${polyLatex(p)}$ entre $${binomialLatex(a)}$.`, `أوجد باقي قسمة $${polyLatex(p)}$ على $${binomialLatex(a)}$.`, `Find the remainder of $${polyLatex(p)}$ divided by $${binomialLatex(a)}$.`),
                lines: [line(LABELS.coefficients, list(p)), line(LABELS.row, list(row)), line(LABELS.remainder, `R=${row[3]}`)],
                wrong: 1, error, fix: `${list(right.row)}\\ \\to\\ R=${right.remainder}`, right: right.remainder, reached: row[3]
            }
        }
        case 'factor-sign': {
            const r1 = randomInt(random, 1, 5)
            const r2 = randomInt(random, 1, 6)
            if (r1 === r2) return null
            const p = fromRoots(1, [r1, r2])
            const wrong = fromRoots(1, [-r1, -r2])
            return {
                problem: problem('Factoriza', 'Faktorizatu', 'حلّل', 'Factorise', polyLatex(p)),
                lines: [line(LABELS.roots, `x=${r1},\\ x=${r2}`), line(LABELS.factors, `(x+${r1})(x+${r2})`), line(LABELS.check, polyLatex(wrong))],
                wrong: 1, error, fix: `(x-${r1})(x-${r2})\\ \\to\\ ${polyLatex(p)}`, right: at(p), reached: at(wrong)
            }
        }
        case 'leading-lost': {
            const lead = randomInt(random, 2, 4)
            const r1 = pick(random, nonzero(-4, 4))
            const r2 = pick(random, nonzero(-5, 5))
            if (r1 === r2) return null
            const p = fromRoots(lead, [r1, r2])
            const wrong = fromRoots(1, [r1, r2])
            return {
                problem: problem('Factoriza', 'Faktorizatu', 'حلّل', 'Factorise', polyLatex(p)),
                lines: [line(LABELS.roots, `x=${r1},\\ x=${r2}`), line(LABELS.factors, `(${binomialLatex(r1)})(${binomialLatex(r2)})`), line(LABELS.check, `${polyLatex(wrong)}`)],
                wrong: 1, error, fix: `${lead}(${binomialLatex(r1)})(${binomialLatex(r2)})\\ \\to\\ ${polyLatex(p)}`, right: at(p), reached: at(wrong)
            }
        }
        case 'difference-as-square': {
            const a = randomInt(random, 2, 6)
            const p: Coefficients = [1, 0, -a * a, 0]
            const wrong = multiply([1, 0], multiply([1, -a], [1, -a]))
            return {
                problem: problem('Factoriza', 'Faktorizatu', 'حلّل', 'Factorise', polyLatex(p)),
                lines: [line(LABELS.common, `x(x^{2}-${a * a})`), line(LABELS.identity, `x(x-${a})^{2}`), line(LABELS.check, polyLatex(wrong))],
                wrong: 1, error, fix: `x(x+${a})(x-${a})=${polyLatex(p)}`, right: at(p), reached: at(wrong)
            }
        }
        case 'lost-one': {
            const a = randomInt(random, 2, 7)
            const p: Coefficients = [a, a, 0, 0]
            return {
                problem: problem('Factoriza', 'Faktorizatu', 'حلّل', 'Factorise', polyLatex(p)),
                lines: [line(LABELS.common, `${a}x^{2}`), line(LABELS.factors, `${a}x^{2}\\cdot x`), line(LABELS.check, `${a}x^{3}`)],
                wrong: 1, error, fix: `${a}x^{2}(x+1)=${polyLatex(p)}`, right: at(p), reached: at([a, 0, 0, 0])
            }
        }
        case 'cancel-terms': {
            const a = randomInt(random, 2, 9)
            const b = randomInt(random, 2, 9)
            if (a === b) return null
            return {
                problem: problem('Simplifica', 'Sinplifikatu', 'بسّط', 'Simplify', `\\frac{x^{2}+${a}x}{x^{2}+${b}x}`),
                lines: [line(LABELS.simplify, `\\frac{${a}x}{${b}x}`), line(LABELS.simplify, `\\frac{${a}}{${b}}`), line(LABELS.result, `\\frac{${a}}{${b}}`)],
                wrong: 0, error, fix: `\\frac{x(x+${a})}{x(x+${b})}=\\frac{x+${a}}{x+${b}}`, right: (X + a) / (X + b), reached: a / b
            }
        }
        case 'add-across': {
            const a = randomInt(random, 1, 6)
            const b = randomInt(random, 1, 6)
            const right = (a * (X - 1) + b * (X + 1)) / (X * X - 1)
            return {
                problem: problem('Suma', 'Batu', 'اجمع', 'Add', `\\frac{${a}}{x+1}+\\frac{${b}}{x-1}`),
                lines: [line(LABELS.sum, `\\frac{${a}+${b}}{(x+1)+(x-1)}`), line(LABELS.result, `\\frac{${a + b}}{2x}`), line(LABELS.result, `\\frac{${a + b}}{2x}`)],
                wrong: 0, error, fix: `\\frac{${a}(x-1)+${b}(x+1)}{x^{2}-1}=\\frac{${polyLatex([a + b, b - a])}}{x^{2}-1}`, right, reached: (a + b) / (2 * X)
            }
        }
        case 'minus-numerator': {
            const a = randomInt(random, 1, 7)
            const b = randomInt(random, 1, 7)
            const c = randomInt(random, 1, 5)
            return {
                problem: problem('Resta', 'Kendu', 'اطرح', 'Subtract', `\\frac{x+${a}}{x+${c}}-\\frac{x-${b}}{x+${c}}`),
                lines: [line(LABELS.denominator, `\\frac{(x+${a})-(x-${b})}{x+${c}}`), line(LABELS.numerator, `x+${a}-x-${b}`), line(LABELS.result, `\\frac{${a - b}}{x+${c}}`)],
                wrong: 1, error, fix: `x+${a}-x+${b}=${a + b}\\ \\to\\ \\frac{${a + b}}{x+${c}}`, right: (a + b) / (X + c), reached: (a - b) / (X + c)
            }
        }
        case 'opposite-binomials': {
            const a = randomInt(random, 1, 7)
            const b = randomInt(random, 2, 6)
            return {
                problem: problem('Simplifica', 'Sinplifikatu', 'بسّط', 'Simplify', `\\frac{${b}x-${a * b}}{${a}-x}`),
                lines: [line(LABELS.common, `\\frac{${b}(x-${a})}{${a}-x}`), line(LABELS.simplify, `${b}\\cdot 1`), line(LABELS.result, `${b}`)],
                wrong: 1, error, fix: `${a}-x=-(x-${a})\\ \\to\\ -${b}`, right: -b, reached: b
            }
        }
    }
}

export const createPolyDetectiveCases = (track: PolyTrack) => (random: Random, levelIndex: number) => createWorkedCases(random, polyDetectiveLevels[track][levelIndex], POLY_DETECTIVE_CASES, build)
