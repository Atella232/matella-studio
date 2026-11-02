import { randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Aljebraren detektibea (1. DBH algebra): a worked answer of three lines
   with one wrong line. The values of the expressions are compared at
   x = ALGEBRA_DETECTIVE_X. Level 1: numeric value and like terms (3x with
   x = 2 written as 32, a square taken as a double, a number added to an x
   term); level 2: operations (x · x = x, 3x + 2x = 5x², a minus before a
   bracket that changes only the first sign); level 3: equations (a term
   moved without changing its sign, a coefficient subtracted instead of
   divided, an x term moved with its sign).
   ========================================================================== */

export type AlgebraDetectiveError =
    | 'juxtapose'
    | 'square-double'
    | 'unlike-terms'
    | 'x-times-x'
    | 'sum-squared'
    | 'minus-bracket'
    | 'transpose-sign'
    | 'divide-subtract'
    | 'x-side-sign'

export const algebraDetectiveLevels: AlgebraDetectiveError[][] = [
    ['juxtapose', 'square-double', 'unlike-terms'],
    ['x-times-x', 'sum-squared', 'minus-bracket'],
    ['transpose-sign', 'divide-subtract', 'x-side-sign']
]

export const ALGEBRA_DETECTIVE_CASES = 6
/** The expressions of levels 1 and 2 are compared at this x */
export const ALGEBRA_DETECTIVE_X = 2

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const X = ALGEBRA_DETECTIVE_X
const LABELS = {
    substitute: say('Ordeztu', 'Sustituye', 'عوّض', 'Substitute'),
    work: say('Kalkulatu', 'Calcula', 'احسب', 'Work out'),
    value: say('Zenbakizko balioa', 'Valor numérico', 'القيمة العددية', 'Numerical value'),
    power: say('Berretura', 'Potencia', 'القوة', 'Power'),
    group: say('Taldekatu', 'Agrupa', 'جمّع', 'Group'),
    reduce: say('Laburtu', 'Reduce', 'اختصر', 'Simplify'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    coefficients: say('Koefizienteak', 'Coeficientes', 'المعاملات', 'Coefficients'),
    letters: say('Letra-zatia', 'Parte literal', 'الجزء الحرفي', 'Letter part'),
    xTerms: say('x-dun gaiak', 'Términos con x', 'الحدود ذات x', 'x terms'),
    numbers: say('Zenbakiak', 'Números', 'الأعداد', 'Numbers'),
    bracket: say('Parentesia kendu', 'Quita el paréntesis', 'احذف القوسين', 'Remove the brackets'),
    equation: say('Ekuazioa', 'Ecuación', 'المعادلة', 'Equation'),
    transpose: say('Gai bat aldatu', 'Transpón', 'انقل حدًّا', 'Move a term'),
    solution: say('Soluzioa', 'Solución', 'الحل', 'Solution')
}

export const algebraDetectiveNames: Record<AlgebraDetectiveError, LocalizedText> = {
    'juxtapose': say('Zenbakia letraren ondoan idatzi du, biderkatu gabe', 'Escribió el número al lado sin multiplicar', 'كتب العدد بجانب الآخر دون ضرب', 'Wrote the number next to it without multiplying'),
    'square-double': say('Karratua bikoitza balitz bezala kalkulatu du', 'Calculó el cuadrado como si fuera el doble', 'حسب المربع كأنه الضعف', 'Worked out the square as if it were double'),
    'unlike-terms': say('Gai ez-antzekoak batu ditu', 'Sumó términos que no son semejantes', 'جمع حدودًا غير متشابهة', 'Added terms that are not like terms'),
    'x-times-x': say('$x\\cdot x$ eta $x$ berdinak direla uste du', 'Creyó que $x\\cdot x$ es $x$', 'ظن أن $x\\cdot x$ يساوي $x$', 'Thought $x\\cdot x$ is $x$'),
    'sum-squared': say('Batzean, berretzailea igo du', 'Al sumar subió el exponente', 'رفع الأس عند الجمع', 'Raised the exponent when adding'),
    'minus-bracket': say('Minusak lehen zeinua bakarrik aldatu du', 'El menos solo cambió el primer signo', 'غيّر السالب الإشارة الأولى فقط', 'The minus changed only the first sign'),
    'transpose-sign': say('Gaia aldatzean ez du zeinua aldatu', 'Transpuso sin cambiar el signo', 'نقل الحد دون تغيير إشارته', 'Moved the term without changing its sign'),
    'divide-subtract': say('Koefizientea kendu du, zatitu beharrean', 'Restó el coeficiente en vez de dividir', 'طرح المعامل بدل القسمة عليه', 'Subtracted the coefficient instead of dividing'),
    'x-side-sign': say('x-dun gaia zeinua aldatu gabe pasatu du', 'Pasó el término en x sin cambiar el signo', 'نقل الحد ذا x دون تغيير إشارته', 'Moved the x term without changing its sign')
}

export const algebraDetectiveTips: Record<AlgebraDetectiveError, LocalizedText> = {
    'juxtapose': say('$3x$ hiru bider $x$ da: $x=2$ bada, $3\\cdot 2=6$.', '$3x$ es tres por $x$: si $x=2$, $3\\cdot 2=6$.', '$3x$ تعني ثلاثة في $x$: إذا $x=2$ فإن $3\\cdot 2=6$.', '$3x$ means three times $x$: if $x=2$, $3\\cdot 2=6$.'),
    'square-double': say('$x^{2}=x\\cdot x$: $3^{2}=9$, ez $6$.', '$x^{2}=x\\cdot x$: $3^{2}=9$, no $6$.', '$x^{2}=x\\cdot x$: $3^{2}=9$ لا $6$.', '$x^{2}=x\\cdot x$: $3^{2}=9$, not $6$.'),
    'unlike-terms': say('Letra-zati bera dutenak bakarrik batzen dira: $7x+1$ ezin da gehiago laburtu.', 'Solo se suman los que tienen la misma parte literal: $7x+1$ no se reduce más.', 'نجمع فقط الحدود ذات الجزء الحرفي نفسه: $7x+1$ لا يُختصر أكثر.', 'Only terms with the same letter part add up: $7x+1$ cannot be simplified.'),
    'x-times-x': say('Biderkatzean, berretzaileak batu: $x\\cdot x=x^{2}$.', 'Al multiplicar se suman los exponentes: $x\\cdot x=x^{2}$.', 'عند الضرب نجمع الأسس: $x\\cdot x=x^{2}$.', 'When multiplying, add the exponents: $x\\cdot x=x^{2}$.'),
    'sum-squared': say('Batzean, koefizienteak bakarrik batzen dira: $3x+2x=5x$.', 'Al sumar solo se suman los coeficientes: $3x+2x=5x$.', 'عند الجمع نجمع المعاملات فقط: $3x+2x=5x$.', 'When adding, only the coefficients add: $3x+2x=5x$.'),
    'minus-bracket': say('Parentesiaren aurreko minusak zeinu guztiak aldatzen ditu: $-(2x-3)=-2x+3$.', 'El menos delante del paréntesis cambia todos los signos: $-(2x-3)=-2x+3$.', 'السالب أمام القوسين يغيّر كل الإشارات: $-(2x-3)=-2x+3$.', 'A minus before brackets changes every sign: $-(2x-3)=-2x+3$.'),
    'transpose-sign': say('Batzen ari dena beste aldera kentzen pasatzen da.', 'Lo que suma pasa al otro lado restando.', 'ما يُجمع ينتقل إلى الطرف الآخر مطروحًا.', 'What is added moves to the other side subtracted.'),
    'divide-subtract': say('Biderkatzen ari dena beste aldera zatitzen pasatzen da: $3x=12$, $x=12\\div 3$.', 'Lo que multiplica pasa dividiendo: $3x=12$, $x=12\\div 3$.', 'ما يضرب ينتقل قاسمًا: $3x=12$ إذن $x=12\\div 3$.', 'What multiplies moves across dividing: $3x=12$, $x=12\\div 3$.'),
    'x-side-sign': say('x-dun gaiek ere zeinua aldatzen dute aldez aldatzean.', 'Los términos en x también cambian de signo al cambiar de lado.', 'الحدود ذات x تغيّر إشارتها أيضًا عند نقلها.', 'The x terms also change sign when they move across.')
}

type Built = Omit<WorkedCase<AlgebraDetectiveError>, 'options'>

const term = (coefficient: number, letters = 'x') => (coefficient === 1 ? letters : `${coefficient}${letters}`)

function build(random: Random, error: AlgebraDetectiveError): Built | null {
    switch (error) {
        case 'juxtapose': {
            const [a, value, b] = [randomInt(random, 2, 9), randomInt(random, 2, 9), randomInt(random, 1, 9)]
            const glued = 10 * a + value
            return {
                problem: say(`Kalkulatu $${a}x+${b}$ adierazpenaren zenbakizko balioa $x=${value}$ denean.`, `Calcula el valor numérico de $${a}x+${b}$ para $x=${value}$.`, `احسب القيمة العددية لـ $${a}x+${b}$ عندما $x=${value}$.`, `Find the value of $${a}x+${b}$ when $x=${value}$.`),
                lines: [line(LABELS.substitute, `${a}x+${b}\\ \\to\\ ${glued}+${b}`), line(LABELS.work, `${glued}+${b}=${glued + b}`), line(LABELS.value, `${glued + b}`)],
                wrong: 0, error, fix: `${a}\\cdot ${value}+${b}=${a * value + b}`, right: a * value + b, reached: glued + b
            }
        }
        case 'square-double': {
            const [value, b] = [randomInt(random, 3, 9), randomInt(random, 1, 9)]
            return {
                problem: say(`Kalkulatu $x^{2}+${b}$ adierazpenaren zenbakizko balioa $x=${value}$ denean.`, `Calcula el valor numérico de $x^{2}+${b}$ para $x=${value}$.`, `احسب القيمة العددية لـ $x^{2}+${b}$ عندما $x=${value}$.`, `Find the value of $x^{2}+${b}$ when $x=${value}$.`),
                lines: [line(LABELS.power, `${value}^{2}=${2 * value}`), line(LABELS.substitute, `${2 * value}+${b}`), line(LABELS.value, `${2 * value + b}`)],
                wrong: 0, error, fix: `${value}^{2}=${value * value}\\ \\to\\ ${value * value}+${b}=${value * value + b}`, right: value * value + b, reached: 2 * value + b
            }
        }
        case 'unlike-terms': {
            const [a, b, c, d] = [randomInt(random, 2, 6), randomInt(random, 2, 6), randomInt(random, 2, 9), randomInt(random, 1, 5)]
            if (c <= d) return null
            const [xs, ns] = [a + b, c - d]
            return {
                problem: say(`Laburtu: $${a}x+${c}+${b}x-${d}$`, `Reduce: $${a}x+${c}+${b}x-${d}$`, `اختصر: $${a}x+${c}+${b}x-${d}$`, `Simplify: $${a}x+${c}+${b}x-${d}$`),
                lines: [line(LABELS.group, `${a}x+${b}x+${c}-${d}`), line(LABELS.reduce, `${xs}x+${ns}=${xs + ns}x`), line(LABELS.result, `${xs + ns}x`)],
                wrong: 1, error, fix: `${xs}x+${ns}`, right: xs * X + ns, reached: (xs + ns) * X
            }
        }
        case 'x-times-x': {
            const [a, b] = [randomInt(random, 2, 6), randomInt(random, 2, 6)]
            return {
                problem: say(`Biderkatu: $${a}x\\cdot ${b}x$`, `Multiplica: $${a}x\\cdot ${b}x$`, `اضرب: $${a}x\\cdot ${b}x$`, `Multiply: $${a}x\\cdot ${b}x$`),
                lines: [line(LABELS.coefficients, `${a}\\cdot ${b}=${a * b}`), line(LABELS.letters, 'x\\cdot x=x'), line(LABELS.result, `${a}x\\cdot ${b}x=${a * b}x`)],
                wrong: 1, error, fix: `x\\cdot x=x^{2}\\ \\to\\ ${a * b}x^{2}`, right: a * b * X * X, reached: a * b * X
            }
        }
        case 'sum-squared': {
            const [a, b, c, d] = [randomInt(random, 2, 6), randomInt(random, 2, 6), randomInt(random, 1, 6), randomInt(random, 1, 6)]
            return {
                problem: say(`Laburtu: $${a}x+${b}x+${c}+${d}$`, `Reduce: $${a}x+${b}x+${c}+${d}$`, `اختصر: $${a}x+${b}x+${c}+${d}$`, `Simplify: $${a}x+${b}x+${c}+${d}$`),
                lines: [line(LABELS.xTerms, `${a}x+${b}x=${a + b}x^{2}`), line(LABELS.numbers, `${c}+${d}=${c + d}`), line(LABELS.result, `${a + b}x^{2}+${c + d}`)],
                wrong: 0, error, fix: `${a}x+${b}x=${a + b}x\\ \\to\\ ${a + b}x+${c + d}`, right: (a + b) * X + c + d, reached: (a + b) * X * X + c + d
            }
        }
        case 'minus-bracket': {
            const [a, b, c] = [randomInt(random, 4, 9), randomInt(random, 1, 3), randomInt(random, 1, 9)]
            return {
                problem: say(`Kendu parentesia eta laburtu: $${term(a)}-(${term(b)}-${c})$`, `Quita el paréntesis y reduce: $${term(a)}-(${term(b)}-${c})$`, `احذف القوسين واختصر: $${term(a)}-(${term(b)}-${c})$`, `Remove the brackets and simplify: $${term(a)}-(${term(b)}-${c})$`),
                lines: [line(LABELS.bracket, `${term(a)}-${term(b)}-${c}`), line(LABELS.group, `${term(a)}-${term(b)}=${term(a - b)}`), line(LABELS.result, `${term(a - b)}-${c}`)],
                wrong: 0, error, fix: `${term(a)}-${term(b)}+${c}=${term(a - b)}+${c}`, right: (a - b) * X + c, reached: (a - b) * X - c
            }
        }
        case 'transpose-sign': {
            const [solution, b] = [randomInt(random, 2, 12), randomInt(random, 2, 9)]
            const c = solution + b
            return {
                problem: say(`Ebatzi: $x+${b}=${c}$`, `Resuelve: $x+${b}=${c}$`, `حلّ: $x+${b}=${c}$`, `Solve: $x+${b}=${c}$`),
                lines: [line(LABELS.equation, `x+${b}=${c}`), line(LABELS.transpose, `x=${c}+${b}`), line(LABELS.solution, `x=${c + b}`)],
                wrong: 1, error, fix: `x=${c}-${b}=${solution}`, right: solution, reached: c + b
            }
        }
        case 'divide-subtract': {
            const [a, solution] = [randomInt(random, 2, 9), randomInt(random, 2, 9)]
            const c = a * solution
            if (c - a === solution) return null
            return {
                problem: say(`Ebatzi: $${a}x=${c}$`, `Resuelve: $${a}x=${c}$`, `حلّ: $${a}x=${c}$`, `Solve: $${a}x=${c}$`),
                lines: [line(LABELS.equation, `${a}x=${c}`), line(LABELS.transpose, `x=${c}-${a}`), line(LABELS.solution, `x=${c - a}`)],
                wrong: 1, error, fix: `x=${c}\\div ${a}=${solution}`, right: solution, reached: c - a
            }
        }
        case 'x-side-sign': {
            const [b, k, solution] = [randomInt(random, 1, 4), randomInt(random, 1, 4), randomInt(random, 2, 6)]
            const a = b + k
            const c = k * solution
            return {
                problem: say(`Ebatzi: $${term(a)}=${term(b)}+${c}$`, `Resuelve: $${term(a)}=${term(b)}+${c}$`, `حلّ: $${term(a)}=${term(b)}+${c}$`, `Solve: $${term(a)}=${term(b)}+${c}$`),
                lines: [line(LABELS.transpose, `${term(a)}+${term(b)}=${c}`), line(LABELS.reduce, `${term(a + b)}=${c}`), line(LABELS.solution, `x=\\frac{${c}}{${a + b}}`)],
                wrong: 0, error, fix: `${term(a)}-${term(b)}=${c}\\ \\to\\ x=${solution}`, right: solution, reached: c / (a + b)
            }
        }
    }
}

export const createAlgebraDetectiveCases = (random: Random, levelIndex: number) => createWorkedCases(random, algebraDetectiveLevels[levelIndex], ALGEBRA_DETECTIVE_CASES, build)
