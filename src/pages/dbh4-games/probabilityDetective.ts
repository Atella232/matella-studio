import { pick, randomInt, type Random } from '../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../features/unit-v2/games/workedDetective.ts'
import { add, fraction, multiply, subtract, toLatex, toNumber } from '../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../features/unit-v2/types.ts'
import { tex } from './geometryDetective.ts'

/* ==========================================================================
   Probabilitatearen detektibea (4. DBH academic): a worked solution of
   three lines with one wrong line. Level 1: favourable over unfavourable,
   the eleven sums of two dice as equally likely, the union without the
   intersection; level 2: independent events added, a draw without
   replacement treated as with, «at least one» added up; level 3: the
   conditional over the whole total or over the wrong group, the total
   probability with one branch.
   ========================================================================== */

export type ProbabilityDetectiveError =
    | 'odds-not-probability'
    | 'dice-sums-equally'
    | 'union-no-intersection'
    | 'add-instead-multiply'
    | 'replacement-ignored'
    | 'complement-wrong'
    | 'conditional-total'
    | 'conditional-swapped'
    | 'total-one-branch'

export const probabilityDetectiveLevels: ProbabilityDetectiveError[][] = [
    ['odds-not-probability', 'dice-sums-equally', 'union-no-intersection'],
    ['add-instead-multiply', 'replacement-ignored', 'complement-wrong'],
    ['conditional-total', 'conditional-swapped', 'total-one-branch']
]

export const PROBABILITY_DETECTIVE_CASES = 6

/** Arabic writes the decimal point instead of the comma */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    cases: say('Kasuak', 'Casos', 'الحالات', 'Cases'),
    rule: say('Araua', 'Regla', 'القاعدة', 'Rule'),
    substitute: say('Ordeztu', 'Sustituye', 'عوّض', 'Substitute'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    space: say('Lagin-espazioa', 'Espacio muestral', 'فضاء العينة', 'Sample space'),
    first: say('Lehen adarra', 'Primera rama', 'الفرع الأول', 'First branch'),
    second: say('Bigarren adarra', 'Segunda rama', 'الفرع الثاني', 'Second branch'),
    count: say('Zenbaketa', 'Recuento', 'العدّ', 'Count')
}

export const probabilityDetectiveNames: Record<ProbabilityDetectiveError, LocalizedText> = {
    'odds-not-probability': say('Aldekoak zati kontrakoak egin du, ez zati guztiak', 'Dividió favorables entre desfavorables, no entre todos', 'قسم المواتية على غير المواتية لا على الكل', 'Divided favourable by unfavourable, not by all'),
    'dice-sums-equally': say('Bi daduen batura guztiak berdin probableak direla pentsatu du', 'Pensó que todas las sumas de dos dados son igual de probables', 'ظن أن كل مجاميع نردين متساوية الاحتمال', 'Thought every sum of two dice is equally likely'),
    'union-no-intersection': say('Bilketan ebakidura ez du kendu', 'En la unión no restó la intersección', 'لم يطرح التقاطع في الاتحاد', 'Did not subtract the intersection in the union'),
    'add-instead-multiply': say('Gertaera independenteen probabilitateak batu ditu', 'Sumó las probabilidades de sucesos independientes', 'جمع احتمالي حدثين مستقلين', 'Added the probabilities of independent events'),
    'replacement-ignored': say('Itzuli gabe, bola bat gutxiago dagoela ahaztu du', 'Sin devolución, olvidó que queda una bola menos', 'دون إرجاع نسي أن الكرات نقصت واحدة', 'Without replacement, forgot there is one ball fewer'),
    'complement-wrong': say('«Gutxienez bat» kalkulatzean probabilitateak batu ditu', 'Para «al menos uno» sumó las probabilidades', 'لحساب «واحد على الأقل» جمع الاحتمالات', 'For «at least one» added the probabilities'),
    'conditional-total': say('Guztizkoaz zatitu du, baldintzaren taldeaz beharrean', 'Dividió entre el total y no entre el grupo de la condición', 'قسم على المجموع لا على مجموعة الشرط', 'Divided by the total, not by the group of the condition'),
    'conditional-swapped': say('Baldintza eta gertaera nahastu ditu', 'Confundió el suceso con la condición', 'خلط بين الحدث والشرط', 'Mixed up the event and the condition'),
    'total-one-branch': say('Adar bakarra hartu du; besteak ere batu behar dira', 'Tomó una sola rama; hay que sumar las demás', 'أخذ فرعًا واحدًا؛ يجب جمع الفروع الأخرى', 'Took only one branch; the others must be added')
}

export const probabilityDetectiveTips: Record<ProbabilityDetectiveError, LocalizedText> = {
    'odds-not-probability': say('Laplace: $\\frac{\\text{aldekoak}}{\\text{posibleak}}$.', 'Laplace: $\\frac{\\text{favorables}}{\\text{posibles}}$.', 'لابلاس: المواتية على الممكنة.', 'Laplace: $\\frac{\\text{favourable}}{\\text{possible}}$.'),
    'dice-sums-equally': say('Bi daduk 36 emaitza ematen dituzte; 7 batzeko 6 daude.', 'Dos dados dan 36 resultados; para sumar 7 hay 6.', 'للنردين 36 نتيجة؛ ومجموع 7 له 6 منها.', 'Two dice give 36 outcomes; 6 of them add up to 7.'),
    'union-no-intersection': say('$P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$.', '$P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$.', '$P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$.', '$P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$.'),
    'add-instead-multiply': say('Independenteak: $P(A\\cap B)=P(A)\\cdot P(B)$.', 'Independientes: $P(A\\cap B)=P(A)\\cdot P(B)$.', 'مستقلان: $P(A\\cap B)=P(A)\\cdot P(B)$.', 'Independent: $P(A\\cap B)=P(A)\\cdot P(B)$.'),
    'replacement-ignored': say('Bigarren ateratzean, bola bat gutxiago (eta kolore horretakoa ere bai).', 'En la segunda extracción, una bola menos (y una de ese color menos).', 'في السحب الثاني كرة أقل (ومن ذلك اللون أيضًا).', 'On the second draw, one ball fewer (and one of that colour fewer).'),
    'complement-wrong': say('$P(\\text{gutxienez bat})=1-P(\\text{bat ere ez})$.', '$P(\\text{al menos uno})=1-P(\\text{ninguno})$.', 'احتمال «واحد على الأقل» يساوي 1 ناقص احتمال «لا شيء».', '$P(\\text{at least one})=1-P(\\text{none})$.'),
    'conditional-total': say('$P(D/A)=\\frac{n(A\\cap D)}{n(A)}$.', '$P(D/A)=\\frac{n(A\\cap D)}{n(A)}$.', '$P(D/A)=\\frac{n(A\\cap D)}{n(A)}$.', '$P(D/A)=\\frac{n(A\\cap D)}{n(A)}$.'),
    'conditional-swapped': say('$P(A/D)$: D dutenen artean; izendatzailea $n(D)$.', '$P(A/D)$: entre los que cumplen D; denominador $n(D)$.', '$P(A/D)$: بين من يحققون D؛ المقام $n(D)$.', '$P(A/D)$: among those with D; the denominator is $n(D)$.'),
    'total-one-branch': say('Probabilitate osoa: adar guztien batura.', 'Probabilidad total: la suma de todas las ramas.', 'الاحتمال الكلي: مجموع كل الفروع.', 'Total probability: the sum of every branch.')
}

type Built = Omit<WorkedCase<ProbabilityDetectiveError>, 'options'>
const f = (numerator: number, denominator: number) => toLatex(fraction(numerator, denominator))

function build(random: Random, error: ProbabilityDetectiveError): Built | null {
    switch (error) {
        case 'odds-not-probability': {
            const [red, blue] = [randomInt(random, 2, 7), randomInt(random, 2, 8)]
            if (red === blue) return null
            return {
                problem: say(`Poltsa batean $${red}$ bola gorri eta $${blue}$ urdin daude. Kalkulatu P(gorria).`, `En una bolsa hay $${red}$ bolas rojas y $${blue}$ azules. Halla P(roja).`, `في كيس $${red}$ كرات حمراء و$${blue}$ زرقاء. احسب احتمال الحمراء.`, `A bag has $${red}$ red balls and $${blue}$ blue ones. Find P(red).`),
                lines: [line(LABELS.cases, `${red}+${blue}=${red + blue}`), line(LABELS.rule, `P=\\frac{${red}}{${blue}}`), line(LABELS.result, `P=${f(red, blue)}`)],
                wrong: 1, error, fix: `P=\\frac{${red}}{${red + blue}}=${f(red, red + blue)}`, right: red / (red + blue), reached: red / blue
            }
        }
        case 'dice-sums-equally': {
            const sum = pick(random, [4, 5, 6, 7, 8, 9, 10])
            const ways = 6 - Math.abs(7 - sum)
            return {
                problem: say(`Bi dado botatzen dira. Kalkulatu batura $${sum}$ izateko probabilitatea.`, `Se lanzan dos dados. Halla la probabilidad de que sumen $${sum}$.`, `نرمي نردين. احسب احتمال أن يكون المجموع $${sum}$.`, `Two dice are thrown. Find the probability that they add up to $${sum}$.`),
                lines: [line(LABELS.space, `E=\\{2,3,\\ldots,12\\}`), line(LABELS.rule, `P=\\frac{1}{11}`), line(LABELS.result, `P\\approx ${tex(Math.round((1 / 11) * 100) / 100)}`)],
                wrong: 1, error, fix: `P=\\frac{${ways}}{36}=${f(ways, 36)}`, right: ways / 36, reached: Math.round((1 / 11) * 100) / 100
            }
        }
        case 'union-no-intersection': {
            const [m, n] = pick(random, [[2, 3], [2, 5], [3, 4], [2, 4]] as Array<[number, number]>)
            const count = (predicate: (face: number) => boolean) => [1, 2, 3, 4, 5, 6].filter(predicate).length
            const [a, b, both] = [count((face) => face % m === 0), count((face) => face % n === 0), count((face) => face % m === 0 && face % n === 0)]
            if (both === 0) return null
            return {
                problem: say(`Dado bat botatzen da. A: $${m}$-ren multiploa; B: $${n}$-ren multiploa. Kalkulatu $P(A\\cup B)$.`, `Se lanza un dado. A: múltiplo de $${m}$; B: múltiplo de $${n}$. Halla $P(A\\cup B)$.`, `نرمي نردًا. A: مضاعف لـ$${m}$؛ B: مضاعف لـ$${n}$. احسب $P(A\\cup B)$.`, `A die is thrown. A: a multiple of $${m}$; B: a multiple of $${n}$. Find $P(A\\cup B)$.`),
                lines: [line(LABELS.cases, `\\frac{${a}}{6},\\ \\frac{${b}}{6}`), line(LABELS.rule, `P(A\\cup B)=\\frac{${a}}{6}+\\frac{${b}}{6}`), line(LABELS.result, `P(A\\cup B)=${f(a + b, 6)}`)],
                wrong: 1, error, fix: `\\frac{${a}}{6}+\\frac{${b}}{6}-\\frac{${both}}{6}=${f(a + b - both, 6)}`, right: (a + b - both) / 6, reached: (a + b) / 6
            }
        }
        case 'add-instead-multiply': {
            const face = randomInt(random, 1, 6)
            const right = multiply(fraction(1, 2), fraction(1, 6))
            const reached = add(fraction(1, 2), fraction(1, 6))
            return {
                problem: say(`Txanpon bat eta dado bat botatzen dira. Kalkulatu P(aurpegia eta $${face}$).`, `Se lanzan una moneda y un dado. Halla P(cara y $${face}$).`, `نرمي قطعة نقود ونردًا. احسب احتمال (وجه و$${face}$).`, `A coin and a die are thrown. Find P(heads and $${face}$).`),
                lines: [line(LABELS.cases, `\\frac{1}{2},\\ \\frac{1}{6}`), line(LABELS.rule, `P=\\frac{1}{2}+\\frac{1}{6}`), line(LABELS.result, `P=${toLatex(reached)}`)],
                wrong: 1, error, fix: `P=\\frac{1}{2}\\cdot\\frac{1}{6}=${toLatex(right)}`, right: toNumber(right), reached: toNumber(reached)
            }
        }
        case 'replacement-ignored': {
            const [red, blue] = [randomInt(random, 2, 6), randomInt(random, 2, 6)]
            const total = red + blue
            const right = multiply(fraction(red, total), fraction(red - 1, total - 1))
            const reached = multiply(fraction(red, total), fraction(red, total))
            return {
                problem: say(`Poltsa batean $${red}$ bola gorri eta $${blue}$ urdin daude. Bi atera dira, itzuli gabe. P(biak gorriak)?`, `En una bolsa hay $${red}$ bolas rojas y $${blue}$ azules. Se sacan dos sin devolver. ¿P(las dos rojas)?`, `في كيس $${red}$ كرات حمراء و$${blue}$ زرقاء. نسحب اثنتين دون إرجاع. ما احتمال أن تكونا حمراوين؟`, `A bag has $${red}$ red balls and $${blue}$ blue ones. Two are drawn without replacement. P(both red)?`),
                lines: [line(LABELS.first, `\\frac{${red}}{${total}}`), line(LABELS.second, `\\frac{${red}}{${total}}`), line(LABELS.result, `P=${toLatex(reached)}`)],
                wrong: 1, error, fix: `\\frac{${red}}{${total}}\\cdot\\frac{${red - 1}}{${total - 1}}=${toLatex(right)}`, right: toNumber(right), reached: toNumber(reached)
            }
        }
        case 'complement-wrong': {
            const throws = pick(random, [2, 3])
            const right = subtract(fraction(1), fraction(5 ** throws, 6 ** throws))
            const reached = fraction(throws, 6)
            return {
                problem: say(`Dado bat $${throws}$ aldiz botatzen da. Kalkulatu gutxienez sei bat ateratzeko probabilitatea.`, `Se lanza un dado $${throws}$ veces. Halla la probabilidad de sacar al menos un seis.`, `نرمي نردًا $${throws}$ مرات. احسب احتمال ظهور ستة واحدة على الأقل.`, `A die is thrown $${throws}$ times. Find the probability of getting at least one six.`),
                lines: [line(LABELS.rule, `P=${Array(throws).fill('\\frac{1}{6}').join('+')}`), line(LABELS.substitute, `P=\\frac{${throws}}{6}`), line(LABELS.result, `P=${toLatex(reached)}`)],
                wrong: 0, error, fix: `1-\\left(\\frac{5}{6}\\right)^{${throws}}=${toLatex(right)}`, right: toNumber(right), reached: toNumber(reached)
            }
        }
        case 'conditional-total':
        case 'conditional-swapped': {
            const girls = randomInt(random, 10, 20)
            const sportGirls = randomInt(random, 4, girls - 3)
            const sport = sportGirls + randomInt(random, 5, 15)
            const total = girls + randomInt(random, 10, 20)
            if (sport > total) return null
            const problem = say(`$${total}$ ikasletatik $${girls}$ neska dira (A) eta $${sport}$-k kirola egiten dute (D); $${sportGirls}$ neskak kirola egiten dute.`, `De $${total}$ alumnos, $${girls}$ son chicas (A) y $${sport}$ hacen deporte (D); $${sportGirls}$ chicas hacen deporte.`, `من $${total}$ تلميذًا، $${girls}$ فتيات (A) و$${sport}$ يمارسون الرياضة (D)، منهم $${sportGirls}$ فتيات.`, `Of $${total}$ students, $${girls}$ are girls (A) and $${sport}$ do sport (D); $${sportGirls}$ girls do sport.`)
            if (error === 'conditional-total') {
                return {
                    problem: { ...problem, eu: `${problem.eu} Kalkulatu $P(D/A)$.`, es: `${problem.es} Halla $P(D/A)$.`, ar: `${problem.ar} احسب $P(D/A)$.`, en: `${problem.en} Find $P(D/A)$.` },
                    lines: [line(LABELS.count, `n(A\\cap D)=${sportGirls}`), line(LABELS.rule, `P(D/A)=\\frac{${sportGirls}}{${total}}`), line(LABELS.result, `P(D/A)=${f(sportGirls, total)}`)],
                    wrong: 1, error, fix: `P(D/A)=\\frac{${sportGirls}}{${girls}}=${f(sportGirls, girls)}`, right: sportGirls / girls, reached: sportGirls / total
                }
            }
            if (sport === girls) return null
            return {
                problem: { ...problem, eu: `${problem.eu} Kalkulatu $P(A/D)$.`, es: `${problem.es} Halla $P(A/D)$.`, ar: `${problem.ar} احسب $P(A/D)$.`, en: `${problem.en} Find $P(A/D)$.` },
                lines: [line(LABELS.count, `n(A\\cap D)=${sportGirls}`), line(LABELS.rule, `P(A/D)=\\frac{${sportGirls}}{${girls}}`), line(LABELS.result, `P(A/D)=${f(sportGirls, girls)}`)],
                wrong: 1, error, fix: `P(A/D)=\\frac{${sportGirls}}{${sport}}=${f(sportGirls, sport)}`, right: sportGirls / sport, reached: sportGirls / girls
            }
        }
        case 'total-one-branch': {
            const p1 = pick(random, [0.4, 0.5, 0.6, 0.7])
            const late1 = pick(random, [0.1, 0.2, 0.3])
            const late2 = pick(random, [0.1, 0.2, 0.4])
            const [first, second] = [Math.round(p1 * late1 * 100) / 100, Math.round((1 - p1) * late2 * 100) / 100]
            const percent = (value: number) => `${Math.round(value * 100)}\\,\\%`
            return {
                problem: say(`Ikasleen $${percent(p1)}$ $G_{1}$ bidetik dator eta gainerakoak $G_{2}$ bidetik. Berandu iristen dira (T) $G_{1}$-eko $${percent(late1)}$ eta $G_{2}$-ko $${percent(late2)}$. Kalkulatu $P(T)$.`, `El $${percent(p1)}$ de los alumnos viene por la ruta $G_{1}$ y el resto por $G_{2}$. Llegan tarde (T) el $${percent(late1)}$ de $G_{1}$ y el $${percent(late2)}$ de $G_{2}$. Halla $P(T)$.`, `$${percent(p1)}$ من التلاميذ يأتون من الطريق $G_{1}$ والباقون من $G_{2}$. يتأخر (T) $${percent(late1)}$ من $G_{1}$ و$${percent(late2)}$ من $G_{2}$. احسب $P(T)$.`, `$${percent(p1)}$ of the students come by route $G_{1}$ and the rest by $G_{2}$. $${percent(late1)}$ of $G_{1}$ and $${percent(late2)}$ of $G_{2}$ arrive late (T). Find $P(T)$.`),
                lines: [line(LABELS.first, `${tex(p1)}\\cdot ${tex(late1)}=${tex(first)}`), line(LABELS.second, `${tex(1 - p1)}\\cdot ${tex(late2)}=${tex(second)}`), line(LABELS.result, `P(T)=${tex(first)}`)],
                wrong: 2, error, fix: `${tex(first)}+${tex(second)}=${tex(first + second)}`, right: Math.round((first + second) * 100) / 100, reached: first
            }
        }
    }
}

export const createProbabilityDetectiveCases = (random: Random, levelIndex: number) => createWorkedCases(random, probabilityDetectiveLevels[levelIndex], PROBABILITY_DETECTIVE_CASES, build)
