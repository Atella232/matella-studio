import { pick, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Zatigarritasunaren detektibea (2. DBH): a worked solution of three
   lines with one wrong line. Level 1: divisors and primes (the number
   itself left out of its divisors, 1 left out, 1 counted as a prime, an
   exponent lost in the factorisation); level 2: GCD and LCM (the GCD with
   the greatest exponents, the LCM with the smallest, the LCM with only
   the common factors, the product taken as the LCM); level 3: problems
   (the GCD where the LCM was needed, the LCM where the GCD was needed,
   the length of the pieces given instead of how many, the minutes given
   instead of the laps).
   ========================================================================== */

export type DivisibilityDetectiveError =
    | 'divisors-without-n'
    | 'divisors-without-one'
    | 'one-as-prime'
    | 'exponent-lost'
    | 'gcd-greatest-exponents'
    | 'lcm-smallest-exponents'
    | 'lcm-common-only'
    | 'product-as-lcm'
    | 'gcd-instead-of-lcm'
    | 'lcm-instead-of-gcd'
    | 'length-not-pieces'
    | 'minutes-not-laps'

export const divisibilityDetectiveLevels: DivisibilityDetectiveError[][] = [
    ['divisors-without-n', 'divisors-without-one', 'one-as-prime', 'exponent-lost'],
    ['gcd-greatest-exponents', 'lcm-smallest-exponents', 'lcm-common-only', 'product-as-lcm'],
    ['gcd-instead-of-lcm', 'lcm-instead-of-gcd', 'length-not-pieces', 'minutes-not-laps']
]

export const DIVISIBILITY_DETECTIVE_CASES = 6

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    pairs: say('Bikoteak', 'Parejas', 'الأزواج', 'Pairs'),
    divisors: say('Zatitzaileak', 'Divisores', 'القواسم', 'Divisors'),
    count: say('Zenbat', 'Cuántos', 'كم', 'How many'),
    primes: say('Lehenak', 'Primos', 'الأعداد الأولية', 'Primes'),
    split: say('Deskonposatu', 'Descompón', 'حلّل', 'Split'),
    factorisation: say('Faktorizazioa', 'Factorización', 'التحليل', 'Factorisation'),
    gcd: say('ZKH', 'm.c.d.', 'ق.م.أ', 'GCD'),
    lcm: say('MKT', 'm.c.m.', 'م.م.أ', 'LCM'),
    what: say('Zer bilatzen da', 'Qué se busca', 'ما المطلوب', 'What we look for'),
    answer: say('Erantzuna', 'Respuesta', 'الجواب', 'Answer')
}

export const divisibilityDetectiveNames: Record<DivisibilityDetectiveError, LocalizedText> = {
    'divisors-without-n': say('Zenbakia bera ez du zatitzaileen artean jarri', 'No puso el propio número entre sus divisores', 'لم يضع العدد نفسه بين قواسمه', 'Left the number itself out of its divisors'),
    'divisors-without-one': say('1 ez du zatitzaileen artean jarri', 'No puso el 1 entre los divisores', 'لم يضع 1 بين القواسم', 'Left 1 out of the divisors'),
    'one-as-prime': say('1 zenbaki lehentzat hartu du', 'Contó el 1 como número primo', 'عدّ 1 عددًا أوليًا', 'Counted 1 as a prime number'),
    'exponent-lost': say('Faktorizazioan berretzaile bat galdu du', 'Perdió un exponente en la factorización', 'أضاع أسًا في التحليل', 'Lost an exponent in the factorisation'),
    'gcd-greatest-exponents': say('ZKHan berretzaile handienak hartu ditu', 'En el m.c.d. tomó los exponentes mayores', 'أخذ في ق.م.أ الأسس الكبرى', 'Took the greatest exponents for the GCD'),
    'lcm-smallest-exponents': say('MKTan berretzaile txikienak hartu ditu', 'En el m.c.m. tomó los exponentes menores', 'أخذ في م.م.أ الأسس الصغرى', 'Took the smallest exponents for the LCM'),
    'lcm-common-only': say('MKTan faktore komunak bakarrik hartu ditu', 'En el m.c.m. tomó solo los factores comunes', 'أخذ في م.م.أ العوامل المشتركة فقط', 'Took only the common factors for the LCM'),
    'product-as-lcm': say('Bi zenbakien biderkadura MKTtzat hartu du', 'Tomó el producto de los dos números como m.c.m.', 'اعتبر جداء العددين م.م.أ', 'Took the product of the two numbers as the LCM'),
    'gcd-instead-of-lcm': say('MKT behar zen eta ZKH kalkulatu du', 'Hacía falta el m.c.m. y calculó el m.c.d.', 'كان المطلوب م.م.أ فحسب ق.م.أ', 'Needed the LCM and worked out the GCD'),
    'lcm-instead-of-gcd': say('ZKH behar zen eta MKT kalkulatu du', 'Hacía falta el m.c.d. y calculó el m.c.m.', 'كان المطلوب ق.م.أ فحسب م.م.أ', 'Needed the GCD and worked out the LCM'),
    'length-not-pieces': say('Zatien luzera eman du, zenbat zati diren beharrean', 'Dio la longitud de los trozos, no cuántos hay', 'أعطى طول القطع لا عددها', 'Gave the length of the pieces, not how many there are'),
    'minutes-not-laps': say('Minutuak eman ditu, buelta kopurua beharrean', 'Dio los minutos, no el número de vueltas', 'أعطى الدقائق لا عدد الدورات', 'Gave the minutes, not the number of laps')
}

export const divisibilityDetectiveTips: Record<DivisibilityDetectiveError, LocalizedText> = {
    'divisors-without-n': say('Zenbaki oro bere buruaren zatitzailea da: $18\\div 18=1$.', 'Todo número es divisor de sí mismo: $18\\div 18=1$.', 'كل عدد قاسم لنفسه: $18\\div 18=1$.', 'Every number divides itself: $18\\div 18=1$.'),
    'divisors-without-one': say('1 zenbaki guztien zatitzailea da.', 'El 1 es divisor de todos los números.', 'العدد 1 قاسم لكل الأعداد.', '1 divides every number.'),
    'one-as-prime': say('Zenbaki lehenak bi zatitzaile ditu zehazki; 1 zenbakiak bakarra du.', 'Un primo tiene exactamente dos divisores; el 1 solo tiene uno.', 'للعدد الأولي قاسمان بالضبط؛ وللعدد 1 قاسم واحد.', 'A prime has exactly two divisors; 1 has only one.'),
    'exponent-lost': say('Egiaztatu biderkatuz: faktorizazioak zenbakia bera eman behar du.', 'Comprueba multiplicando: la factorización tiene que dar el número.', 'تحقّق بالضرب: يجب أن يعطي التحليل العدد نفسه.', 'Check by multiplying: the factorisation must give the number back.'),
    'gcd-greatest-exponents': say('ZKH: faktore komunak, berretzaile txikienarekin.', 'm.c.d.: factores comunes con el menor exponente.', 'ق.م.أ: العوامل المشتركة بأصغر أس.', 'GCD: the common factors with the smallest exponent.'),
    'lcm-smallest-exponents': say('MKT: faktore guztiak, berretzaile handienarekin.', 'm.c.m.: todos los factores con el mayor exponente.', 'م.م.أ: كل العوامل بأكبر أس.', 'LCM: every factor with the greatest exponent.'),
    'lcm-common-only': say('MKTan faktore guztiak sartzen dira, komunak eta ez-komunak.', 'En el m.c.m. entran todos los factores, comunes y no comunes.', 'تدخل في م.م.أ كل العوامل المشتركة وغير المشتركة.', 'The LCM takes every factor, common and not common.'),
    'product-as-lcm': say('Biderkadura multiplo komuna da, baina ez beti txikiena.', 'El producto es un múltiplo común, pero no siempre el menor.', 'الجداء مضاعف مشترك لكنه ليس الأصغر دائمًا.', 'The product is a common multiple, but not always the smallest.'),
    'gcd-instead-of-lcm': say('Noiz egingo dute topo berriro? Bien multiploa: MKT.', '¿Cuándo vuelven a coincidir? Un múltiplo de los dos: m.c.m.', 'متى يلتقيان مجددًا؟ مضاعف للاثنين: م.م.أ.', 'When do they meet again? A multiple of both: the LCM.'),
    'lcm-instead-of-gcd': say('Zati berdin eta ahalik eta handienak? Bien zatitzailea: ZKH.', '¿Trozos iguales y lo más grandes posible? Un divisor de los dos: m.c.d.', 'قطع متساوية وأكبر ما يمكن؟ قاسم للاثنين: ق.م.أ.', 'Equal pieces, as large as possible? A divisor of both: the GCD.'),
    'length-not-pieces': say('ZKHk zati baten luzera ematen du; zatiak zenbatzeko, zatitu luzera osoak.', 'El m.c.d. da la longitud de un trozo; para contarlos, divide las longitudes.', 'ق.م.أ يعطي طول القطعة؛ ولعدّ القطع نقسم الأطوال.', 'The GCD gives the length of a piece; to count them, divide the lengths.'),
    'minutes-not-laps': say('MKTk minutuak ematen ditu; bueltak = minutuak zati buelta baten denbora.', 'El m.c.m. da los minutos; vueltas = minutos entre lo que tarda una vuelta.', 'م.م.أ يعطي الدقائق؛ الدورات = الدقائق ÷ زمن الدورة.', 'The LCM gives the minutes; laps = minutes ÷ the time for one lap.')
}

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
const lcm = (a: number, b: number) => (a * b) / gcd(a, b)
const divisorsOf = (n: number) => Array.from({ length: n }, (_, index) => index + 1).filter((d) => n % d === 0)
/** A list of numbers in LaTeX: 1,\ 2,\ 3 */
const list = (values: number[]) => values.join(',\\ ')
/** The prime factorisation of n in LaTeX: 2^{3}\cdot 3 */
function factorLatex(n: number): string {
    const parts: string[] = []
    let rest = n
    for (let prime = 2; prime <= rest; prime += 1) {
        let exponent = 0
        while (rest % prime === 0) {
            rest /= prime
            exponent += 1
        }
        if (exponent > 0) parts.push(exponent === 1 ? String(prime) : `${prime}^{${exponent}}`)
    }
    return parts.join('\\cdot ')
}
/** Two numbers whose factorisations share a prime with different exponents */
const PAIRS: Array<[number, number]> = [[24, 36], [12, 18], [20, 30], [40, 60], [18, 24], [36, 48], [28, 42], [45, 60]]

type Built = Omit<WorkedCase<DivisibilityDetectiveError>, 'options'>

function build(random: Random, error: DivisibilityDetectiveError): Built | null {
    switch (error) {
        case 'divisors-without-n':
        case 'divisors-without-one': {
            // At most three pairs, so the line fits on a phone
            const n = pick(random, [12, 18, 20, 28, 32, 45, 50])
            const divisors = divisorsOf(n)
            const pairs = divisors.filter((d) => d * d <= n).map((d) => `${d}\\cdot ${n / d}`)
            const written = error === 'divisors-without-n' ? divisors.filter((d) => d !== n) : divisors.filter((d) => d !== 1)
            return {
                problem: say(`Zenbat zatitzaile ditu ${n} zenbakiak?`, `¿Cuántos divisores tiene ${n}?`, `كم قاسمًا للعدد ${n}؟`, `How many divisors does ${n} have?`),
                lines: [line(LABELS.pairs, pairs.join(',\\ ')), line(LABELS.divisors, list(written)), line(LABELS.count, String(written.length))],
                wrong: 1,
                error,
                fix: `${list(divisors)}\\ \\to\\ ${divisors.length}`,
                right: divisors.length,
                reached: written.length
            }
        }
        case 'one-as-prime': {
            const limit = pick(random, [8, 10, 12])
            const primes = Array.from({ length: limit - 2 }, (_, index) => index + 2).filter((n) => divisorsOf(n).length === 2)
            const sum = primes.reduce((total, prime) => total + prime, 0)
            return {
                problem: say(`Zenbat egiten dute ${limit} baino txikiagoak diren zenbaki lehenen baturak?`, `¿Cuánto suman los números primos menores que ${limit}?`, `ما مجموع الأعداد الأولية الأصغر من ${limit}؟`, `What do the prime numbers below ${limit} add up to?`),
                lines: [line(LABELS.primes, list([1, ...primes])), line(LABELS.count, [1, ...primes].join('+')), line(LABELS.answer, String(sum + 1))],
                wrong: 0,
                error,
                fix: `${primes.join('+')}=${sum}`,
                right: sum,
                reached: sum + 1
            }
        }
        case 'exponent-lost': {
            const [a, b] = pick(random, [[8, 9], [4, 9], [8, 3], [4, 25], [8, 5], [16, 3]] as const)
            const n = a * b
            const lost = factorLatex(a).replace(/\^\{\d\}/, '')
            const reachedValue = Number(lost.split('\\cdot ').reduce((product, part) => product * Number(part), 1)) * b
            return {
                problem: say(`Faktorizatu ${n}.`, `Factoriza ${n}.`, `حلّل العدد ${n}.`, `Factorise ${n}.`),
                lines: [line(LABELS.split, `${n}=${a}\\cdot ${b}`), line(LABELS.split, `${a}=${factorLatex(a)},\\ ${b}=${factorLatex(b)}`), line(LABELS.factorisation, `${n}=${lost}\\cdot ${factorLatex(b)}`)],
                wrong: 2,
                error,
                fix: `${n}=${factorLatex(n)}`,
                right: n,
                reached: reachedValue
            }
        }
        case 'gcd-greatest-exponents':
        case 'lcm-smallest-exponents': {
            const [a, b] = pick(random, PAIRS)
            const [g, l] = [gcd(a, b), lcm(a, b)]
            const asked = error === 'gcd-greatest-exponents' ? LABELS.gcd : LABELS.lcm
            return {
                problem: say(`Kalkulatu ${a} eta ${b} zenbakien ${asked.eu}.`, `Calcula el ${asked.es} de ${a} y ${b}.`, `احسب ${asked.ar} للعددين ${a} و${b}.`, `Work out the ${asked.en} of ${a} and ${b}.`),
                lines: [line(LABELS.factorisation, `${a}=${factorLatex(a)},\\ ${b}=${factorLatex(b)}`), line(asked, factorLatex(error === 'gcd-greatest-exponents' ? l : g)), line(LABELS.answer, String(error === 'gcd-greatest-exponents' ? l : g))],
                wrong: 1,
                error,
                fix: `${factorLatex(error === 'gcd-greatest-exponents' ? g : l)}=${error === 'gcd-greatest-exponents' ? g : l}`,
                right: error === 'gcd-greatest-exponents' ? g : l,
                reached: error === 'gcd-greatest-exponents' ? l : g
            }
        }
        case 'lcm-common-only': {
            const [a, b] = pick(random, [[12, 10], [20, 6], [18, 12], [15, 20], [8, 12], [9, 12]] as const)
            // Only the common primes, with the greatest exponent
            const common = [2, 3, 5].filter((prime) => a % prime === 0 && b % prime === 0)
            const highest = (prime: number) => Math.max(...[a, b].map((n) => { let e = 0; while (n % prime ** (e + 1) === 0) e += 1; return e }))
            const reached = common.reduce((product, prime) => product * prime ** highest(prime), 1)
            if (reached === lcm(a, b)) return null
            return {
                problem: say(`Kalkulatu ${a} eta ${b} zenbakien MKT.`, `Calcula el m.c.m. de ${a} y ${b}.`, `احسب م.م.أ للعددين ${a} و${b}.`, `Work out the LCM of ${a} and ${b}.`),
                lines: [line(LABELS.factorisation, `${a}=${factorLatex(a)},\\ ${b}=${factorLatex(b)}`), line(LABELS.lcm, factorLatex(reached)), line(LABELS.answer, String(reached))],
                wrong: 1,
                error,
                fix: `${factorLatex(lcm(a, b))}=${lcm(a, b)}`,
                right: lcm(a, b),
                reached
            }
        }
        case 'product-as-lcm': {
            const [a, b] = pick(random, PAIRS.slice(0, 5))
            return {
                problem: say(`Kalkulatu ${a} eta ${b} zenbakien MKT.`, `Calcula el m.c.m. de ${a} y ${b}.`, `احسب م.م.أ للعددين ${a} و${b}.`, `Work out the LCM of ${a} and ${b}.`),
                lines: [line(LABELS.what, `${a}\\cdot ${b}`), line(LABELS.lcm, `${a}\\cdot ${b}=${a * b}`), line(LABELS.answer, String(a * b))],
                wrong: 0,
                error,
                fix: `${factorLatex(lcm(a, b))}=${lcm(a, b)}`,
                right: lcm(a, b),
                reached: a * b
            }
        }
        case 'gcd-instead-of-lcm': {
            const [a, b] = pick(random, [[12, 18], [10, 15], [8, 12], [20, 30], [6, 15]] as const)
            return {
                problem: say(`Autobus bat ${a} minuturo ateratzen da eta beste bat ${b} minuturo. Biak batera irten dira. Zenbat minutu barru irtengo dira berriro batera?`, `Un autobús sale cada ${a} minutos y otro cada ${b}. Han salido a la vez. ¿Dentro de cuántos minutos vuelven a salir juntos?`, `حافلة تنطلق كل ${a} دقيقة وأخرى كل ${b}. انطلقتا معًا. بعد كم دقيقة تنطلقان معًا مجددًا؟`, `One bus leaves every ${a} minutes and another every ${b}. They have just left together. In how many minutes will they leave together again?`),
                lines: [line(LABELS.gcd, `(${a},\\ ${b})`), line(LABELS.factorisation, `${a}=${factorLatex(a)},\\ ${b}=${factorLatex(b)}`), line(LABELS.answer, String(gcd(a, b)))],
                wrong: 0,
                error,
                fix: `${factorLatex(lcm(a, b))}=${lcm(a, b)}`,
                right: lcm(a, b),
                reached: gcd(a, b)
            }
        }
        case 'lcm-instead-of-gcd': {
            const [a, b] = pick(random, [[12, 18], [20, 30], [24, 36], [16, 24], [30, 45]] as const)
            return {
                problem: say(`${a} cm eta ${b} cm-ko bi zinta zati berdinetan moztu nahi ditugu, ahalik eta luzeenak, soberarik gabe. Zenbat neurtuko du zati bakoitzak?`, `Queremos cortar dos cintas de ${a} cm y ${b} cm en trozos iguales, lo más largos posible y sin que sobre nada. ¿Cuánto medirá cada trozo?`, `نريد قص شريطين طولهما ${a} سم و${b} سم إلى قطع متساوية بأطول ما يمكن دون بقايا. كم طول كل قطعة؟`, `We want to cut two ribbons of ${a} cm and ${b} cm into equal pieces, as long as possible, with nothing left over. How long is each piece?`),
                lines: [line(LABELS.factorisation, `${a}=${factorLatex(a)},\\ ${b}=${factorLatex(b)}`), line(LABELS.lcm, `${factorLatex(lcm(a, b))}=${lcm(a, b)}`), line(LABELS.answer, String(lcm(a, b)))],
                wrong: 1,
                error,
                fix: `${factorLatex(gcd(a, b))}=${gcd(a, b)}`,
                right: gcd(a, b),
                reached: lcm(a, b)
            }
        }
        case 'length-not-pieces': {
            const [a, b] = pick(random, [[12, 18], [20, 30], [24, 36], [16, 24], [30, 45]] as const)
            const g = gcd(a, b)
            return {
                problem: say(`${a} cm eta ${b} cm-ko bi zinta zati berdinetan moztu ditugu, ahalik eta luzeenak, soberarik gabe. Zenbat zati atera dira guztira?`, `Cortamos dos cintas de ${a} cm y ${b} cm en trozos iguales, lo más largos posible y sin que sobre nada. ¿Cuántos trozos salen en total?`, `قصصنا شريطين طولهما ${a} سم و${b} سم إلى قطع متساوية بأطول ما يمكن دون بقايا. كم قطعة نتجت إجمالًا؟`, `We cut two ribbons of ${a} cm and ${b} cm into equal pieces, as long as possible, with nothing left over. How many pieces are there in all?`),
                lines: [line(LABELS.factorisation, `${a}=${factorLatex(a)},\\ ${b}=${factorLatex(b)}`), line(LABELS.gcd, `${factorLatex(g)}=${g}`), line(LABELS.answer, String(g))],
                wrong: 2,
                error,
                fix: `\\frac{${a}}{${g}}+\\frac{${b}}{${g}}=${a / g}+${b / g}=${(a + b) / g}`,
                right: (a + b) / g,
                reached: g
            }
        }
        case 'minutes-not-laps': {
            const [a, b] = pick(random, [[4, 6], [6, 8], [6, 9], [8, 12], [10, 15]] as const)
            const l = lcm(a, b)
            return {
                problem: say(`Bi korrikalarik ${a} eta ${b} minutu behar dituzte zirkuituari buelta bat emateko. Batera irten dira. Zenbat buelta emango ditu lehenengoak berriro elkartzen direnean?`, `Dos corredores tardan ${a} y ${b} minutos en dar una vuelta al circuito. Salen a la vez. ¿Cuántas vueltas habrá dado el primero cuando vuelvan a coincidir?`, `يحتاج عدّاءان ${a} و${b} دقائق لإكمال دورة. انطلقا معًا. كم دورة أكمل الأول حين يلتقيان مجددًا؟`, `Two runners take ${a} and ${b} minutes to do one lap. They start together. How many laps will the first have done when they meet again?`),
                lines: [line(LABELS.what, `${a},\\ ${b}`), line(LABELS.lcm, `${factorLatex(l)}=${l}`), line(LABELS.answer, String(l))],
                wrong: 2,
                error,
                fix: `${l}\\div ${a}=${l / a}`,
                right: l / a,
                reached: l
            }
        }
    }
}

export const createDivisibilityDetectiveCases = (random: Random, levelIndex: number) => createWorkedCases(random, divisibilityDetectiveLevels[levelIndex], DIVISIBILITY_DETECTIVE_CASES, build)
