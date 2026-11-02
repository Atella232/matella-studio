import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { fracLatex as f, gcd, lcm } from './fractionRounds.ts'

/* ==========================================================================
   Zatikien detektibea (1. DBH fractions): a worked answer of three lines
   with one wrong line. Level 1: equivalence and comparison (simplified by
   subtracting, the bigger denominator taken as the bigger fraction,
   amplified by adding); level 2: operations (numerators and denominators
   added, a product done crosswise, a division without turning the second
   fraction over); level 3: problems (a fraction of a number divided by the
   numerator, the part spent given as what is left, a fraction of the rest
   taken of the whole).
   ========================================================================== */

export type FractionsDetectiveError =
    | 'simplify-subtract'
    | 'bigger-denominator'
    | 'amplify-add'
    | 'add-across'
    | 'multiply-cross'
    | 'divide-no-invert'
    | 'divide-by-numerator'
    | 'rest-forgotten'
    | 'fraction-of-whole'

export const fractionsDetectiveLevels: FractionsDetectiveError[][] = [
    ['simplify-subtract', 'bigger-denominator', 'amplify-add'],
    ['add-across', 'multiply-cross', 'divide-no-invert'],
    ['divide-by-numerator', 'rest-forgotten', 'fraction-of-whole']
]

export const FRACTIONS_DETECTIVE_CASES = 6

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    step1: say('1. urratsa', 'Paso 1', 'الخطوة 1', 'Step 1'),
    step2: say('2. urratsa', 'Paso 2', 'الخطوة 2', 'Step 2'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    simplify: say('Sinplifikatu', 'Simplifica', 'اختزل', 'Simplify'),
    compare: say('Konparatu', 'Compara', 'قارن', 'Compare'),
    denominators: say('Izendatzaileak', 'Denominadores', 'المقامان', 'Denominators'),
    bigger: say('Handiena', 'La mayor', 'الأكبر', 'The bigger'),
    goal: say('Helburua', 'Objetivo', 'الهدف', 'Goal'),
    amplify: say('Anplifikatu', 'Amplifica', 'وسّع', 'Amplify'),
    left: say('Geratzen dena', 'Lo que queda', 'الباقي', 'What is left'),
    part: say('Zati bat', 'Una parte', 'جزء واحد', 'One part')
}

export const fractionsDetectiveNames: Record<FractionsDetectiveError, LocalizedText> = {
    'simplify-subtract': say('Kenduz sinplifikatu du, zatitu beharrean', 'Simplificó restando en vez de dividir', 'اختزل بالطرح بدل القسمة', 'Simplified by subtracting instead of dividing'),
    'bigger-denominator': say('Izendatzaile handiena duena handiena dela uste du', 'Creyó mayor la de mayor denominador', 'ظن أن صاحب المقام الأكبر هو الأكبر', 'Thought the bigger denominator gives the bigger fraction'),
    'amplify-add': say('Batuz anplifikatu du, biderkatu beharrean', 'Amplificó sumando en vez de multiplicar', 'وسّع بالجمع بدل الضرب', 'Amplified by adding instead of multiplying'),
    'add-across': say('Zenbakitzaileak eta izendatzaileak batu ditu', 'Sumó numeradores y denominadores', 'جمع البسوط والمقامات', 'Added the numerators and the denominators'),
    'multiply-cross': say('Gurutzean biderkatu du, zuzenean beharrean', 'Multiplicó en cruz en vez de en línea', 'ضرب ضربًا تبادليًا بدل الضرب المباشر', 'Multiplied crosswise instead of straight across'),
    'divide-no-invert': say('Zatitzean ez du bigarren zatikia buelta eman', 'Al dividir no dio la vuelta a la segunda fracción', 'لم يقلب الكسر الثاني عند القسمة', 'Did not turn the second fraction over when dividing'),
    'divide-by-numerator': say('Zenbakitzaileaz zatitu du, izendatzaileaz beharrean', 'Dividió entre el numerador en vez del denominador', 'قسم على البسط بدل المقام', 'Divided by the numerator instead of the denominator'),
    'rest-forgotten': say('Gastatutakoa eman du, geratzen dena beharrean', 'Dio lo gastado en vez de lo que queda', 'أعطى ما أُنفق بدل الباقي', 'Gave what was spent instead of what is left'),
    'fraction-of-whole': say('Gainerakoaren zatikia osoarena balitz bezala hartu du', 'Tomó la fracción del resto como si fuera del total', 'أخذ كسر الباقي كأنه من الكل', 'Took the fraction of the rest as if it were of the whole')
}

export const fractionsDetectiveTips: Record<FractionsDetectiveError, LocalizedText> = {
    'simplify-subtract': say('Sinplifikatzeko, zatitu biak zenbaki beraz: $\\frac{6}{9}=\\frac{6\\div 3}{9\\div 3}$.', 'Para simplificar se dividen los dos entre el mismo número: $\\frac{6}{9}=\\frac{6\\div 3}{9\\div 3}$.', 'للاختزال نقسم الحدين على العدد نفسه: $\\frac{6}{9}=\\frac{6\\div 3}{9\\div 3}$.', 'To simplify, divide both by the same number: $\\frac{6}{9}=\\frac{6\\div 3}{9\\div 3}$.'),
    'bigger-denominator': say('Konparatzeko, jarri izendatzaile bera: $\\frac{2}{3}=\\frac{10}{15}$ eta $\\frac{3}{5}=\\frac{9}{15}$.', 'Para comparar, pon el mismo denominador: $\\frac{2}{3}=\\frac{10}{15}$ y $\\frac{3}{5}=\\frac{9}{15}$.', 'للمقارنة نوحّد المقامات: $\\frac{2}{3}=\\frac{10}{15}$ و$\\frac{3}{5}=\\frac{9}{15}$.', 'To compare, use the same denominator: $\\frac{2}{3}=\\frac{10}{15}$ and $\\frac{3}{5}=\\frac{9}{15}$.'),
    'amplify-add': say('Anplifikatzeko, biderkatu biak zenbaki beraz: $\\frac{2\\cdot 3}{3\\cdot 3}=\\frac{6}{9}$.', 'Para amplificar se multiplican los dos por el mismo número: $\\frac{2\\cdot 3}{3\\cdot 3}=\\frac{6}{9}$.', 'للتوسيع نضرب الحدين في العدد نفسه: $\\frac{2\\cdot 3}{3\\cdot 3}=\\frac{6}{9}$.', 'To amplify, multiply both by the same number: $\\frac{2\\cdot 3}{3\\cdot 3}=\\frac{6}{9}$.'),
    'add-across': say('Batzeko, lehenik izendatzaile komuna; gero, zenbakitzaileak batu.', 'Para sumar, primero el denominador común; luego se suman los numeradores.', 'للجمع نوحّد المقامات أولًا ثم نجمع البسوط.', 'To add, first a common denominator; then add the numerators.'),
    'multiply-cross': say('Biderkatzean, zenbakitzailea bider zenbakitzailea eta izendatzailea bider izendatzailea.', 'Al multiplicar, numerador por numerador y denominador por denominador.', 'في الضرب: البسط في البسط والمقام في المقام.', 'When multiplying: numerator times numerator, denominator times denominator.'),
    'divide-no-invert': say('Zatitzea alderantzizkoaz biderkatzea da: $\\frac{a}{b}\\div \\frac{c}{d}=\\frac{a\\cdot d}{b\\cdot c}$.', 'Dividir es multiplicar por la inversa: $\\frac{a}{b}\\div \\frac{c}{d}=\\frac{a\\cdot d}{b\\cdot c}$.', 'القسمة ضرب في المقلوب: $\\frac{a}{b}\\div \\frac{c}{d}=\\frac{a\\cdot d}{b\\cdot c}$.', 'Dividing is multiplying by the reciprocal: $\\frac{a}{b}\\div \\frac{c}{d}=\\frac{a\\cdot d}{b\\cdot c}$.'),
    'divide-by-numerator': say('Kantitate baten zatikia: izendatzaileaz zatitu eta zenbakitzaileaz biderkatu.', 'Fracción de una cantidad: se divide entre el denominador y se multiplica por el numerador.', 'كسر من كمية: نقسم على المقام ونضرب في البسط.', 'A fraction of an amount: divide by the denominator, multiply by the numerator.'),
    'rest-forgotten': say('Galderari begiratu: zenbat geratzen den? Kendu gastatutakoa osotik.', 'Mira la pregunta: ¿cuánto queda? Resta lo gastado del total.', 'انظر إلى السؤال: كم يبقى؟ اطرح ما أُنفق من الكل.', 'Read the question: how much is left? Take what was spent from the whole.'),
    'fraction-of-whole': say('«Geratzen denaren» zatikia: lehenik kalkulatu zenbat geratzen den.', '«De lo que queda»: primero calcula cuánto queda.', '«من الباقي»: احسب الباقي أولًا.', '“Of what is left”: first work out what is left.')
}

type Built = Omit<WorkedCase<FractionsDetectiveError>, 'options'>

const calculate = (latex: string) => say(`Kalkulatu: $${latex}$`, `Calcula: $${latex}$`, `احسب: $${latex}$`, `Work out: $${latex}$`)

/** p/q in lowest terms, as LaTeX */
const lowest = (p: number, q: number) => f(p / gcd(p, q), q / gcd(p, q))

/** Two proper fractions a/b and c/d whose wrong result p/q can be simplified, so the third line is a real step */
function pairFor(random: Random, wrong: (a: number, b: number, c: number, d: number) => [number, number]): [number, number, number, number] | null {
    const [b, d] = [randomInt(random, 2, 9), randomInt(random, 2, 9)]
    const [a, c] = [randomInt(random, 1, b - 1), randomInt(random, 1, d - 1)]
    if (b === d || gcd(a, b) !== 1 || gcd(c, d) !== 1) return null
    const [p, q] = wrong(a, b, c, d)
    return gcd(p, q) > 1 ? [a, b, c, d] : null
}

function build(random: Random, error: FractionsDetectiveError): Built | null {
    switch (error) {
        case 'simplify-subtract': {
            const [p, q] = pick(random, [[2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [5, 6]] as Array<[number, number]>)
            const [k, m] = [pick(random, [2, 3]), randomInt(random, 2, 3)]
            const [a, b] = [p * k * m, q * k * m]
            const [x, y] = [p * m, q * m]
            const [u, v] = [x - m, y - m]
            if (u <= 0 || gcd(u, v) === 1) return null
            return {
                problem: say(`Sinplifikatu, zatiki laburtezina lortu arte: $${f(a, b)}$`, `Simplifica hasta la fracción irreducible: $${f(a, b)}$`, `اختزل حتى الكسر غير القابل للاختزال: $${f(a, b)}$`, `Simplify down to lowest terms: $${f(a, b)}$`),
                lines: [line(LABELS.step1, `${f(a, b)}=${f(`${a}\\div ${k}`, `${b}\\div ${k}`)}=${f(x, y)}`), line(LABELS.step2, `${f(x, y)}=${f(`${x}-${m}`, `${y}-${m}`)}=${f(u, v)}`), line(LABELS.simplify, `${f(u, v)}=${lowest(u, v)}`)],
                wrong: 1, error, fix: `${f(`${x}\\div ${m}`, `${y}\\div ${m}`)}=${f(p, q)}`, right: p / q, reached: u / v
            }
        }
        case 'bigger-denominator': {
            const [b, d] = [randomInt(random, 2, 6), randomInt(random, 3, 9)]
            const [a, c] = [randomInt(random, 1, b - 1), randomInt(random, 2, d - 1)]
            // c/d has the bigger numbers but is the smaller fraction
            if (d <= b || c <= a || c * b >= a * d || gcd(a, b) !== 1 || gcd(c, d) !== 1) return null
            const common = lcm(b, d)
            return {
                problem: say(`Zein da handiagoa: $${f(a, b)}$ ala $${f(c, d)}$?`, `¿Cuál es mayor: $${f(a, b)}$ o $${f(c, d)}$?`, `أيهما أكبر: $${f(a, b)}$ أم $${f(c, d)}$؟`, `Which is bigger: $${f(a, b)}$ or $${f(c, d)}$?`),
                lines: [line(LABELS.denominators, `${d}>${b}`), line(LABELS.compare, `${f(c, d)}>${f(a, b)}`), line(LABELS.bigger, f(c, d))],
                wrong: 1, error, fix: `${f((a * common) / b, common)}>${f((c * common) / d, common)}\\ \\to\\ ${f(a, b)}`, right: a / b, reached: c / d
            }
        }
        case 'amplify-add': {
            const b = randomInt(random, 2, 6)
            const a = randomInt(random, 1, b - 1)
            const k = randomInt(random, 2, 4)
            if (gcd(a, b) !== 1) return null
            const added = b * k - b
            return {
                problem: say(`Idatzi $${f(a, b)}$ zatikiaren baliokide bat, izendatzailea $${b * k}$ duela.`, `Escribe una fracción equivalente a $${f(a, b)}$ con denominador $${b * k}$.`, `اكتب كسرًا مكافئًا لـ $${f(a, b)}$ مقامه $${b * k}$.`, `Write a fraction equivalent to $${f(a, b)}$ with denominator $${b * k}$.`),
                lines: [line(LABELS.goal, `${f(a, b)}=${f('?', b * k)}`), line(LABELS.amplify, f(`${a}+${added}`, `${b}+${added}`)), line(LABELS.result, f(a + added, b * k))],
                wrong: 1, error, fix: `${f(`${a}\\cdot ${k}`, `${b}\\cdot ${k}`)}=${f(a * k, b * k)}`, right: a / b, reached: (a + added) / (b * k)
            }
        }
        case 'add-across': {
            const pair = pairFor(random, (a, b, c, d) => [a + c, b + d])
            if (!pair) return null
            const [a, b, c, d] = pair
            const common = lcm(b, d)
            const sum = (a * common) / b + (c * common) / d
            return {
                problem: calculate(`${f(a, b)}+${f(c, d)}`),
                lines: [line(LABELS.step1, `${f(a, b)}+${f(c, d)}=${f(`${a}+${c}`, `${b}+${d}`)}`), line(LABELS.step2, f(a + c, b + d)), line(LABELS.simplify, lowest(a + c, b + d))],
                wrong: 0, error, fix: `${f((a * common) / b, common)}+${f((c * common) / d, common)}=${f(sum, common)}`, right: sum / common, reached: (a + c) / (b + d)
            }
        }
        case 'multiply-cross': {
            const pair = pairFor(random, (a, b, c, d) => [a * d, b * c])
            if (!pair) return null
            const [a, b, c, d] = pair
            return {
                problem: calculate(`${f(a, b)}\\cdot ${f(c, d)}`),
                lines: [line(LABELS.step1, `${f(a, b)}\\cdot ${f(c, d)}=${f(`${a}\\cdot ${d}`, `${b}\\cdot ${c}`)}`), line(LABELS.step2, f(a * d, b * c)), line(LABELS.simplify, lowest(a * d, b * c))],
                wrong: 0, error, fix: `${f(`${a}\\cdot ${c}`, `${b}\\cdot ${d}`)}=${f(a * c, b * d)}`, right: (a * c) / (b * d), reached: (a * d) / (b * c)
            }
        }
        case 'divide-no-invert': {
            const pair = pairFor(random, (a, b, c, d) => [a * c, b * d])
            if (!pair) return null
            const [a, b, c, d] = pair
            return {
                problem: calculate(`${f(a, b)}\\div ${f(c, d)}`),
                lines: [line(LABELS.step1, `${f(a, b)}\\div ${f(c, d)}=${f(`${a}\\cdot ${c}`, `${b}\\cdot ${d}`)}`), line(LABELS.step2, f(a * c, b * d)), line(LABELS.simplify, lowest(a * c, b * d))],
                wrong: 0, error, fix: `${f(`${a}\\cdot ${d}`, `${b}\\cdot ${c}`)}=${f(a * d, b * c)}`, right: (a * d) / (b * c), reached: (a * c) / (b * d)
            }
        }
        case 'divide-by-numerator': {
            const d = randomInt(random, 3, 6)
            const a = randomInt(random, 2, d - 1)
            if (gcd(a, d) !== 1) return null
            const total = a * d * randomInt(random, 1, 3)
            return {
                problem: say(`Kalkulatu $${total}$ zenbakiaren $${f(a, d)}$.`, `Calcula $${f(a, d)}$ de $${total}$.`, `احسب $${f(a, d)}$ من $${total}$.`, `Work out $${f(a, d)}$ of $${total}$.`),
                lines: [line(LABELS.part, `${total}\\div ${a}=${total / a}`), line(LABELS.step2, `${total / a}\\cdot ${d}=${(total / a) * d}`), line(LABELS.result, `${(total / a) * d}`)],
                wrong: 0, error, fix: `${total}\\div ${d}=${total / d}\\ \\to\\ ${total / d}\\cdot ${a}=${(total / d) * a}`, right: (total / d) * a, reached: (total / a) * d
            }
        }
        case 'rest-forgotten': {
            const d = randomInt(random, 3, 8)
            const a = randomInt(random, 1, d - 1)
            if (gcd(a, d) !== 1 || 2 * a === d) return null
            const total = d * randomInt(random, 2, 6)
            const spent = (total / d) * a
            return {
                problem: say(`Anak $${total}$ € ditu eta horien $${f(a, d)}$ gastatu ditu. Zenbat euro geratzen zaizkio?`, `Ana tiene $${total}$ € y gasta $${f(a, d)}$. ¿Cuántos euros le quedan?`, `مع آنا $${total}$ يورو وأنفقت $${f(a, d)}$ منها. كم يورو بقي معها؟`, `Ana has €$${total}$ and spends $${f(a, d)}$ of it. How many euros are left?`),
                lines: [line(LABELS.part, `${total}\\div ${d}=${total / d}`), line(LABELS.step2, `${total / d}\\cdot ${a}=${spent}`), line(LABELS.left, `${spent}`)],
                wrong: 2, error, fix: `${total}-${spent}=${total - spent}`, right: total - spent, reached: spent
            }
        }
        case 'fraction-of-whole': {
            const [d1, d2] = [pick(random, [2, 3, 4, 5]), pick(random, [2, 3, 4, 5])]
            const total = d1 * d2 * randomInt(random, 2, 4)
            const first = total / d1
            const rest = total - first
            if (rest % d2 !== 0 || total % d2 !== 0 || total - first - total / d2 <= 0) return null
            const [second, wrongSecond] = [rest / d2, total / d2]
            return {
                problem: say(`Liburu batek $${total}$ orri ditu. Lehen egunean $${f(1, d1)}$ irakurri du, eta bigarrenean geratzen denaren $${f(1, d2)}$. Zenbat orri geratzen dira?`, `Un libro tiene $${total}$ páginas. El primer día lee $${f(1, d1)}$ y el segundo, $${f(1, d2)}$ de lo que queda. ¿Cuántas páginas quedan?`, `في كتاب $${total}$ صفحة. يقرأ في اليوم الأول $${f(1, d1)}$ منه، وفي الثاني $${f(1, d2)}$ من الباقي. كم صفحة بقيت؟`, `A book has $${total}$ pages. On day one you read $${f(1, d1)}$ of it and on day two $${f(1, d2)}$ of what is left. How many pages are left?`),
                lines: [line(LABELS.step1, `${total}\\div ${d1}=${first}`), line(LABELS.step2, `${total}\\div ${d2}=${wrongSecond}`), line(LABELS.left, `${total}-${first}-${wrongSecond}=${total - first - wrongSecond}`)],
                wrong: 1, error, fix: `${rest}\\div ${d2}=${second}\\ \\to\\ ${rest}-${second}=${rest - second}`, right: rest - second, reached: total - first - wrongSecond
            }
        }
    }
}

export const createFractionsDetectiveCases = (random: Random, levelIndex: number) => createWorkedCases(random, fractionsDetectiveLevels[levelIndex], FRACTIONS_DETECTIVE_CASES, build)
