import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { divisorsOf, gcd, lcm } from './divisibilityRounds.ts'

/* ==========================================================================
   Zatigarritasunaren detektibea (1. DBH divisibility): a worked answer of
   three lines with one wrong line. Level 1: multiples and divisors (1 and
   the number itself left out of the divisors, divisors written instead of
   multiples, the rule for 3 read on the last digit); level 2: primes (1
   taken as prime, 2 left out as even, every odd number taken as prime);
   level 3: GCD and LCM (the GCD used where the situation asks for the LCM,
   the highest exponents taken for the GCD, the product taken as the LCM).
   ========================================================================== */

export type DivisibilityDetectiveError =
    | 'missing-one-and-itself'
    | 'divisors-for-multiples'
    | 'last-digit-three'
    | 'one-prime'
    | 'two-not-prime'
    | 'odd-as-prime'
    | 'gcd-for-lcm'
    | 'gcd-max-exponents'
    | 'lcm-product'

export const divisibilityDetectiveLevels: DivisibilityDetectiveError[][] = [
    ['missing-one-and-itself', 'divisors-for-multiples', 'last-digit-three'],
    ['one-prime', 'two-not-prime', 'odd-as-prime'],
    ['gcd-for-lcm', 'gcd-max-exponents', 'lcm-product']
]

export const DIVISIBILITY_DETECTIVE_CASES = 6

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    divisors: say('Zatitzaileak', 'Divisores', 'القواسم', 'Divisors'),
    multiples: say('Multiploak', 'Múltiplos', 'المضاعفات', 'Multiples'),
    add: say('Batu', 'Suma', 'اجمع', 'Add'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    lastDigit: say('3, 6 edo 9 amaieran', 'Acaban en 3, 6 o 9', 'تنتهي بـ 3 أو 6 أو 9', 'End in 3, 6 or 9'),
    primes: say('Lehenak', 'Primos', 'الأعداد الأولية', 'Primes'),
    factors: say('Deskonposizioa', 'Descomposición', 'التحليل', 'Factorisation'),
    lowest: say('Faktore komunak, berretzaile txikiena', 'Factores comunes, menor exponente', 'العوامل المشتركة بأصغر أس', 'Common factors, lowest exponent'),
    highest: say('Faktore guztiak, berretzaile handiena', 'Todos los factores, mayor exponente', 'كل العوامل بأكبر أس', 'All factors, highest exponent'),
    answer: say('Erantzuna', 'Respuesta', 'الجواب', 'Answer'),
    common: say('Multiplo komuna', 'Múltiplo común', 'مضاعف مشترك', 'Common multiple'),
    check: say('Egiaztatu', 'Comprueba', 'تحقّق', 'Check'),
    gcd: say('ZKH', 'm.c.d.', 'ق.م.أ', 'GCD'),
    lcm: say('MKT', 'm.c.m.', 'م.م.أ', 'LCM')
}

export const divisibilityDetectiveNames: Record<DivisibilityDetectiveError, LocalizedText> = {
    'missing-one-and-itself': say('Bata eta zenbakia bera ahaztu ditu', 'Olvidó el 1 y el propio número', 'نسي العدد 1 والعدد نفسه', 'Forgot 1 and the number itself'),
    'divisors-for-multiples': say('Zatitzaileak idatzi ditu, multiploen ordez', 'Escribió divisores en vez de múltiplos', 'كتب القواسم بدل المضاعفات', 'Wrote divisors instead of multiples'),
    'last-digit-three': say('Hiruren irizpidean azken zifrari begiratu dio', 'Miró la última cifra para el criterio del 3', 'نظر إلى الرقم الأخير في قاعدة 3', 'Looked at the last digit for the rule for 3'),
    'one-prime': say('Bata lehentzat hartu du', 'Contó el 1 como primo', 'عدّ العدد 1 أوليًّا', 'Counted 1 as a prime'),
    'two-not-prime': say('Bia kanpoan utzi du, bikoitia delako', 'Dejó fuera el 2 por ser par', 'أهمل العدد 2 لأنه زوجي', 'Left out 2 because it is even'),
    'odd-as-prime': say('Bakoiti guztiak lehentzat hartu ditu', 'Tomó todos los impares como primos', 'عدّ كل الأعداد الفردية أولية', 'Took every odd number as a prime'),
    'gcd-for-lcm': say('ZKH kalkulatu du, egoerak MKT eskatzen duenean', 'Calculó el m.c.d. cuando la situación pide el m.c.m.', 'حسب ق.م.أ والموقف يتطلب م.م.أ', 'Worked out the GCD where the situation asks for the LCM'),
    'gcd-max-exponents': say('ZKH kalkulatzeko berretzaile handienak hartu ditu', 'Para el m.c.d. tomó los exponentes mayores', 'أخذ الأسس الكبرى لحساب ق.م.أ', 'Took the highest exponents for the GCD'),
    'lcm-product': say('Biderkadura MKT dela uste du', 'Creyó que el producto es el m.c.m.', 'ظن أن حاصل الضرب هو م.م.أ', 'Thought the product is the LCM')
}

export const divisibilityDetectiveTips: Record<DivisibilityDetectiveError, LocalizedText> = {
    'missing-one-and-itself': say('Zenbaki guztiek dituzte zatitzaile bata eta beren burua.', 'Todo número tiene como divisores el 1 y él mismo.', 'لكل عدد قاسمان دائمًا: 1 والعدد نفسه.', 'Every number has 1 and itself as divisors.'),
    'divisors-for-multiples': say('Multiploak zenbakia biderkatuz lortzen dira: $6,\\ 12,\\ 18\\dots$', 'Los múltiplos se obtienen multiplicando el número: $6,\\ 12,\\ 18\\dots$', 'المضاعفات نحصل عليها بضرب العدد: $6,\\ 12,\\ 18\\dots$', 'Multiples come from multiplying the number: $6,\\ 12,\\ 18\\dots$'),
    'last-digit-three': say('Hiruren irizpidea: zifren batura hiruren multiploa izan behar da.', 'Criterio del 3: la suma de las cifras debe ser múltiplo de 3.', 'قاعدة 3: يجب أن يكون مجموع الأرقام من مضاعفات 3.', 'Rule for 3: the sum of the digits must be a multiple of 3.'),
    'one-prime': say('Lehen batek bi zatitzaile ditu zehazki; bata ez da lehena.', 'Un primo tiene exactamente dos divisores; el 1 no es primo.', 'للعدد الأولي قاسمان بالضبط، والعدد 1 ليس أوليًّا.', 'A prime has exactly two divisors; 1 is not a prime.'),
    'two-not-prime': say('Bia lehena da: zatitzaileak bata eta bia baino ez ditu.', 'El 2 es primo: solo tiene como divisores el 1 y el 2.', 'العدد 2 أولي: قاسماه 1 و2 فقط.', '2 is a prime: its only divisors are 1 and 2.'),
    'odd-as-prime': say('Bakoiti batzuk konposatuak dira: $25=5\\cdot 5$, $27=3\\cdot 9$.', 'Hay impares compuestos: $25=5\\cdot 5$, $27=3\\cdot 9$.', 'بعض الأعداد الفردية مركّبة: $25=5\\cdot 5$ و$27=3\\cdot 9$.', 'Some odd numbers are composite: $25=5\\cdot 5$, $27=3\\cdot 9$.'),
    'gcd-for-lcm': say('Berriro elkartzea, aldi berean gertatzea: MKT.', 'Volver a coincidir, a la vez otra vez: m.c.m.', 'الالتقاء مرة أخرى في الوقت نفسه: م.م.أ.', 'Meeting again, at the same time again: LCM.'),
    'gcd-max-exponents': say('ZKH: faktore komunak soilik, berretzaile txikienarekin.', 'm.c.d.: solo factores comunes, con el menor exponente.', 'ق.م.أ: العوامل المشتركة فقط بأصغر أس.', 'GCD: only the common factors, with the lowest exponent.'),
    'lcm-product': say('Biderkadura multiplo komuna da, baina ez beti txikiena.', 'El producto es múltiplo común, pero no siempre el menor.', 'حاصل الضرب مضاعف مشترك لكنه ليس دائمًا الأصغر.', 'The product is a common multiple, but not always the least one.')
}

type Built = Omit<WorkedCase<DivisibilityDetectiveError>, 'options'>

const list = (values: number[]) => values.join(',\\ ')
const sum = (values: number[]) => values.reduce((total, value) => total + value, 0)
const isPrime = (n: number) => n > 1 && divisorsOf(n).length === 2

/** 72 → 2^{3}\cdot 3^{2} */
function factorLatex(exponents: Map<number, number>): string {
    return [...exponents].filter(([, power]) => power > 0).map(([prime, power]) => (power === 1 ? `${prime}` : `${prime}^{${power}}`)).join('\\cdot ')
}

function exponentsOf(n: number): Map<number, number> {
    const exponents = new Map<number, number>()
    for (const prime of [2, 3, 5, 7]) {
        while (n % prime === 0) {
            exponents.set(prime, (exponents.get(prime) ?? 0) + 1)
            n /= prime
        }
    }
    return exponents
}

/** The common factors with the lowest exponent, or all of them with the highest */
function joined(a: number, b: number, rule: 'gcd' | 'lcm'): Map<number, number> {
    const [x, y] = [exponentsOf(a), exponentsOf(b)]
    const exponents = new Map<number, number>()
    for (const prime of [2, 3, 5, 7]) {
        const power = rule === 'gcd' ? Math.min(x.get(prime) ?? 0, y.get(prime) ?? 0) : Math.max(x.get(prime) ?? 0, y.get(prime) ?? 0)
        if (power > 0) exponents.set(prime, power)
    }
    return exponents
}

/** Pairs whose GCD is not a single prime, so its factorisation shows a step */
const PAIRS: Array<[number, number]> = [[8, 12], [12, 18], [12, 20], [18, 24], [16, 24], [20, 30], [12, 30], [18, 30], [24, 36], [12, 16], [8, 20], [18, 27], [12, 42], [20, 50], [24, 40], [30, 45]]

const sumPrompt = (n: number, kind: 'less' | 'between') => (kind === 'less'
    ? say(`Batu $${n}$ baino txikiagoak diren zenbaki lehen guztiak.`, `Suma todos los números primos menores que $${n}$.`, `اجمع كل الأعداد الأولية الأصغر من $${n}$.`, `Add all the prime numbers less than $${n}$.`)
    : say(`Batu $${n}$ eta $${n + 10}$ arteko zenbaki lehenak.`, `Suma los números primos que hay entre $${n}$ y $${n + 10}$.`, `اجمع الأعداد الأولية بين $${n}$ و$${n + 10}$.`, `Add the prime numbers between $${n}$ and $${n + 10}$.`))

function build(random: Random, error: DivisibilityDetectiveError): Built | null {
    switch (error) {
        case 'missing-one-and-itself': {
            const n = pick(random, [12, 18, 20, 24, 28, 30])
            const all = divisorsOf(n)
            const shown = all.slice(1, -1)
            return {
                problem: say(`Batu $${n}$ zenbakiaren zatitzaile guztiak.`, `Suma todos los divisores de $${n}$.`, `اجمع كل قواسم العدد $${n}$.`, `Add up all the divisors of $${n}$.`),
                lines: [line(LABELS.divisors, list(shown)), line(LABELS.add, shown.join('+')), line(LABELS.result, `${sum(shown)}`)],
                wrong: 0, error, fix: `${all.join('+')}=${sum(all)}`, right: sum(all), reached: sum(shown)
            }
        }
        case 'divisors-for-multiples': {
            const n = pick(random, [6, 8, 10, 12])
            const shown = divisorsOf(n).slice(0, 3)
            return {
                problem: say(`Batu $${n}$ zenbakiaren lehen hiru multiploak (0 kontatu gabe).`, `Suma los tres primeros múltiplos de $${n}$ (sin contar el 0).`, `اجمع أول ثلاثة مضاعفات للعدد $${n}$ (دون الصفر).`, `Add the first three multiples of $${n}$ (not counting 0).`),
                lines: [line(LABELS.multiples, list(shown)), line(LABELS.add, shown.join('+')), line(LABELS.result, `${sum(shown)}`)],
                wrong: 0, error, fix: `${n}+${2 * n}+${3 * n}=${6 * n}`, right: 6 * n, reached: sum(shown)
            }
        }
        case 'last-digit-three': {
            const numbers = Array.from({ length: 4 }, () => randomInt(random, 10, 99))
            const looked = numbers.filter((value) => [3, 6, 9].includes(value % 10))
            const real = numbers.filter((value) => value % 3 === 0)
            // Four different numbers; the last digit fools at least once each way
            if (new Set(numbers).size < 4 || looked.length === 0 || real.length === 0) return null
            if (!looked.some((value) => value % 3 !== 0) || !real.some((value) => ![3, 6, 9].includes(value % 10)) || sum(looked) === sum(real)) return null
            return {
                problem: say(`Batu zerrenda honetako hiruren multiploak: $${list(numbers)}$`, `Suma los múltiplos de 3 de esta lista: $${list(numbers)}$`, `اجمع مضاعفات 3 في هذه القائمة: $${list(numbers)}$`, `Add the multiples of 3 in this list: $${list(numbers)}$`),
                lines: [line(LABELS.lastDigit, list(looked)), line(LABELS.add, looked.join('+')), line(LABELS.result, `${sum(looked)}`)],
                wrong: 0, error, fix: real.length === 1 ? `${real[0]}` : `${real.join('+')}=${sum(real)}`, right: sum(real), reached: sum(looked)
            }
        }
        case 'one-prime':
        case 'two-not-prime': {
            const n = randomInt(random, 10, 20)
            const primes = Array.from({ length: n - 1 }, (_, index) => index + 1).filter(isPrime)
            const shown = error === 'one-prime' ? [1, ...primes] : primes.slice(1)
            return {
                problem: sumPrompt(n, 'less'),
                lines: [line(LABELS.primes, list(shown)), line(LABELS.add, shown.join('+')), line(LABELS.result, `${sum(shown)}`)],
                wrong: 0, error, fix: `${primes.join('+')}=${sum(primes)}`, right: sum(primes), reached: sum(shown)
            }
        }
        case 'odd-as-prime': {
            const n = 10 * randomInt(random, 1, 8)
            const odd = [1, 3, 5, 7, 9].map((step) => n + step)
            const primes = odd.filter(isPrime)
            return {
                problem: sumPrompt(n, 'between'),
                lines: [line(LABELS.primes, list(odd)), line(LABELS.add, odd.join('+')), line(LABELS.result, `${sum(odd)}`)],
                wrong: 0, error, fix: `${primes.join('+')}=${sum(primes)}`, right: sum(primes), reached: sum(odd)
            }
        }
        case 'gcd-for-lcm': {
            const [a, b] = pick(random, PAIRS)
            if (lcm(a, b) > 60) return null
            return {
                problem: say(`Bi autobus elkarrekin irten dira: bata $${a}$ minuturo eta bestea $${b}$ minuturo. Noiz irtengo dira berriro elkarrekin?`, `Dos autobuses salen juntos: uno cada $${a}$ minutos y otro cada $${b}$. ¿Cuándo vuelven a salir juntos?`, `حافلتان تنطلقان معًا: الأولى كل $${a}$ دقيقة والثانية كل $${b}$. متى تنطلقان معًا مرة أخرى؟`, `Two buses leave together: one every $${a}$ minutes and the other every $${b}$. When do they next leave together?`),
                lines: [line(LABELS.factors, `${a}=${factorLatex(exponentsOf(a))},\\ ${b}=${factorLatex(exponentsOf(b))}`), line(LABELS.lowest, `${factorLatex(joined(a, b, 'gcd'))}=${gcd(a, b)}`), line(LABELS.answer, `${gcd(a, b)}`)],
                wrong: 1, error, fix: `${factorLatex(joined(a, b, 'lcm'))}=${lcm(a, b)}`, right: lcm(a, b), reached: gcd(a, b)
            }
        }
        case 'gcd-max-exponents': {
            const [a, b] = pick(random, PAIRS)
            return {
                problem: say(`Kalkulatu $${a}$ eta $${b}$ zenbakien ZKH.`, `Halla el m.c.d. de $${a}$ y $${b}$.`, `أوجد ق.م.أ للعددين $${a}$ و$${b}$.`, `Find the GCD of $${a}$ and $${b}$.`),
                lines: [line(LABELS.factors, `${a}=${factorLatex(exponentsOf(a))},\\ ${b}=${factorLatex(exponentsOf(b))}`), line(LABELS.highest, factorLatex(joined(a, b, 'lcm'))), line(LABELS.gcd, `${lcm(a, b)}`)],
                wrong: 1, error, fix: `${factorLatex(joined(a, b, 'gcd'))}=${gcd(a, b)}`, right: gcd(a, b), reached: lcm(a, b)
            }
        }
        case 'lcm-product': {
            const [a, b] = pick(random, PAIRS)
            if (a * b > 300) return null
            const m = lcm(a, b)
            return {
                problem: say(`Kalkulatu $${a}$ eta $${b}$ zenbakien MKT.`, `Halla el m.c.m. de $${a}$ y $${b}$.`, `أوجد م.م.أ للعددين $${a}$ و$${b}$.`, `Find the LCM of $${a}$ and $${b}$.`),
                lines: [line(LABELS.common, `${a}\\cdot ${b}=${a * b}`), line(LABELS.check, `${a * b}\\div ${a}=${b},\\ ${a * b}\\div ${b}=${a}`), line(LABELS.lcm, `${a * b}`)],
                wrong: 2, error, fix: `${a}\\cdot ${m / a}=${b}\\cdot ${m / b}=${m}`, right: m, reached: a * b
            }
        }
    }
}

export const createDivisibilityDetectiveCases = (random: Random, levelIndex: number) => createWorkedCases(random, divisibilityDetectiveLevels[levelIndex], DIVISIBILITY_DETECTIVE_CASES, build)
