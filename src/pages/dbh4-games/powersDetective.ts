import { pick, randomInt, type Random } from '../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../features/unit-v2/types.ts'
import { tex } from './geometryDetective.ts'

/* ==========================================================================
   Berreturen detektibea (4. DBH academic powers, radicals and logarithms):
   a worked calculation of three lines with one wrong line. Level 1: the
   exponents multiplied or added the wrong way, a negative exponent read
   as a negative number, the exponent of scientific notation; level 2: the
   root of a sum, a fractional exponent upside down, rationalising only
   the denominator, the conjugate with a plus; level 3: the logarithm of
   a sum, of a power and of a quotient, and log_b N taken as N ÷ b.
   ========================================================================== */

export type PowersDetectiveError =
    | 'exponent-multiply'
    | 'power-of-power-add'
    | 'negative-exponent-sign'
    | 'scientific-exponent'
    | 'radical-sum'
    | 'fractional-exponent-swap'
    | 'rationalize-only-denominator'
    | 'conjugate-sign'
    | 'log-of-sum'
    | 'log-power'
    | 'log-quotient'
    | 'log-as-division'

export const powersDetectiveLevels: PowersDetectiveError[][] = [
    ['exponent-multiply', 'power-of-power-add', 'negative-exponent-sign', 'scientific-exponent'],
    ['radical-sum', 'fractional-exponent-swap', 'rationalize-only-denominator', 'conjugate-sign'],
    ['log-of-sum', 'log-power', 'log-quotient', 'log-as-division']
]

export const POWERS_DETECTIVE_CASES = 6

/** Arabic writes the decimal point instead of the comma */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    rule: say('Araua', 'Regla', 'القاعدة', 'Rule'),
    power: say('Berretura', 'Potencia', 'القوة', 'Power'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    shift: say('Koma lekuz aldatu', 'Corre la coma', 'انقل الفاصلة', 'Move the comma'),
    tens: say('Hamarreko berretura', 'Potencia de 10', 'قوة العشرة', 'Power of 10'),
    join: say('Erroak bildu', 'Junta las raíces', 'اجمع الجذرين', 'Join the roots'),
    rationalize: say('Arrazionalizatu', 'Racionaliza', 'إنطاق المقام', 'Rationalise'),
    product: say('Biderkadura', 'Producto', 'الجداء', 'Product'),
    logarithm: say('Logaritmoa', 'Logaritmo', 'اللوغاريتم', 'Logarithm'),
    values: say('Balioak', 'Valores', 'القيم', 'Values')
}

export const powersDetectiveNames: Record<PowersDetectiveError, LocalizedText> = {
    'exponent-multiply': say('Oinarri bereko biderketan, berretzaileak biderkatu ditu', 'En el producto de igual base, multiplicó los exponentes', 'في ضرب قوى لها نفس الأساس ضرب الأسس', 'In a product with the same base, multiplied the exponents'),
    'power-of-power-add': say('Berreturaren berreturan, berretzaileak batu ditu', 'En la potencia de una potencia, sumó los exponentes', 'في قوة القوة جمع الأسس', 'In a power of a power, added the exponents'),
    'negative-exponent-sign': say('Berretzaile negatiboa zenbaki negatibotzat hartu du', 'Tomó el exponente negativo como un número negativo', 'اعتبر الأس السالب عددًا سالبًا', 'Took the negative exponent as a negative number'),
    'scientific-exponent': say('Komaren tokiak gaizki zenbatu ditu', 'Contó mal los lugares de la coma', 'أخطأ في عدّ منازل الفاصلة', 'Counted the places of the comma wrongly'),
    'radical-sum': say('Batuketaren erroa erroen batura dela pentsatu du', 'Pensó que la raíz de una suma es la suma de las raíces', 'ظن أن جذر المجموع هو مجموع الجذرين', 'Thought the root of a sum is the sum of the roots'),
    'fractional-exponent-swap': say('Berretzaile zatikia alderantziz idatzi du', 'Escribió el exponente fraccionario al revés', 'كتب الأس الكسري مقلوبًا', 'Wrote the fractional exponent upside down'),
    'rationalize-only-denominator': say('Izendatzailea bakarrik biderkatu du', 'Multiplicó solo el denominador', 'ضرب المقام فقط', 'Multiplied only the denominator'),
    'conjugate-sign': say('Konjugatuen biderkadura batuketa dela pentsatu du', 'Pensó que el producto de conjugados es una suma', 'ظن أن جداء المترافقين مجموع', 'Thought the product of conjugates is a sum'),
    'log-of-sum': say('Batuketaren logaritmoa logaritmoen batura dela pentsatu du', 'Pensó que el logaritmo de una suma es la suma de logaritmos', 'ظن أن لوغاريتم المجموع هو مجموع اللوغاريتمات', 'Thought the logarithm of a sum is the sum of the logarithms'),
    'log-power': say('Berretzailea logaritmoaren berretzaile utzi du', 'Dejó el exponente elevando al logaritmo', 'ترك الأس قوةً للوغاريتم', 'Left the exponent as a power of the logarithm'),
    'log-quotient': say('Zatiduraren logaritmoa logaritmoen zatidura dela pentsatu du', 'Pensó que el logaritmo de un cociente es el cociente de logaritmos', 'ظن أن لوغاريتم القسمة هو قسمة اللوغاريتمين', 'Thought the logarithm of a quotient is the quotient of the logarithms'),
    'log-as-division': say('Logaritmoa zatiketa bat dela pentsatu du', 'Pensó que el logaritmo es una división', 'ظن أن اللوغاريتم قسمة', 'Thought the logarithm is a division')
}

export const powersDetectiveTips: Record<PowersDetectiveError, LocalizedText> = {
    'exponent-multiply': say('$a^{m}\\cdot a^{n}=a^{m+n}$.', '$a^{m}\\cdot a^{n}=a^{m+n}$.', '$a^{m}\\cdot a^{n}=a^{m+n}$.', '$a^{m}\\cdot a^{n}=a^{m+n}$.'),
    'power-of-power-add': say('$(a^{m})^{n}=a^{m\\cdot n}$.', '$(a^{m})^{n}=a^{m\\cdot n}$.', '$(a^{m})^{n}=a^{m\\cdot n}$.', '$(a^{m})^{n}=a^{m\\cdot n}$.'),
    'negative-exponent-sign': say('$a^{-n}=\\frac{1}{a^{n}}$: positiboa da.', '$a^{-n}=\\frac{1}{a^{n}}$: es positivo.', '$a^{-n}=\\frac{1}{a^{n}}$: إنه موجب.', '$a^{-n}=\\frac{1}{a^{n}}$: it is positive.'),
    'scientific-exponent': say('Zenbatu zenbat zero dituen zatitzaileak: $10\\,000=10^{4}$.', 'Cuenta los ceros del divisor: $10\\,000=10^{4}$.', 'عُدّ أصفار المقسوم عليه: $10\\,000=10^{4}$.', 'Count the zeros of the divisor: $10\\,000=10^{4}$.'),
    'radical-sum': say('$\\sqrt{a+b}\\ne\\sqrt{a}+\\sqrt{b}$: $\\sqrt{9+16}=5$, ez 7.', '$\\sqrt{a+b}\\ne\\sqrt{a}+\\sqrt{b}$: $\\sqrt{9+16}=5$, no 7.', '$\\sqrt{a+b}\\ne\\sqrt{a}+\\sqrt{b}$: $\\sqrt{9+16}=5$ لا 7.', '$\\sqrt{a+b}\\ne\\sqrt{a}+\\sqrt{b}$: $\\sqrt{9+16}=5$, not 7.'),
    'fractional-exponent-swap': say('$a^{\\frac{p}{q}}=\\sqrt[q]{a^{p}}$: izendatzailea da erroaren indizea.', '$a^{\\frac{p}{q}}=\\sqrt[q]{a^{p}}$: el denominador es el índice.', '$a^{\\frac{p}{q}}=\\sqrt[q]{a^{p}}$: المقام هو دليل الجذر.', '$a^{\\frac{p}{q}}=\\sqrt[q]{a^{p}}$: the denominator is the index.'),
    'rationalize-only-denominator': say('Zenbakitzailea eta izendatzailea biak biderkatu behar dira.', 'Hay que multiplicar numerador y denominador.', 'يجب ضرب البسط والمقام معًا.', 'Multiply both the numerator and the denominator.'),
    'conjugate-sign': say('$(\\sqrt{a}+\\sqrt{b})(\\sqrt{a}-\\sqrt{b})=a-b$.', '$(\\sqrt{a}+\\sqrt{b})(\\sqrt{a}-\\sqrt{b})=a-b$.', '$(\\sqrt{a}+\\sqrt{b})(\\sqrt{a}-\\sqrt{b})=a-b$.', '$(\\sqrt{a}+\\sqrt{b})(\\sqrt{a}-\\sqrt{b})=a-b$.'),
    'log-of-sum': say('$\\log(a\\cdot b)=\\log a+\\log b$, baina batuketarentzat ez dago araurik.', '$\\log(a\\cdot b)=\\log a+\\log b$, pero para la suma no hay regla.', '$\\log(a\\cdot b)=\\log a+\\log b$، لكن لا قاعدة للمجموع.', '$\\log(a\\cdot b)=\\log a+\\log b$, but there is no rule for a sum.'),
    'log-power': say('$\\log a^{n}=n\\cdot\\log a$.', '$\\log a^{n}=n\\cdot\\log a$.', '$\\log a^{n}=n\\cdot\\log a$.', '$\\log a^{n}=n\\cdot\\log a$.'),
    'log-quotient': say('$\\log\\frac{a}{b}=\\log a-\\log b$.', '$\\log\\frac{a}{b}=\\log a-\\log b$.', '$\\log\\frac{a}{b}=\\log a-\\log b$.', '$\\log\\frac{a}{b}=\\log a-\\log b$.'),
    'log-as-division': say('$\\log_{b}N$ da b-ri jarri behar zaion berretzailea N lortzeko.', '$\\log_{b}N$ es el exponente al que hay que elevar b para obtener N.', '$\\log_{b}N$ هو الأس الذي نرفع إليه b لنحصل على N.', '$\\log_{b}N$ is the exponent b must be raised to to give N.')
}

type Built = Omit<WorkedCase<PowersDetectiveError>, 'options'>

const SQUARE_PAIRS: Array<[number, number]> = [[9, 16], [16, 9], [36, 64], [64, 36], [25, 144], [81, 144]]

function build(random: Random, error: PowersDetectiveError): Built | null {
    switch (error) {
        case 'exponent-multiply':
        case 'power-of-power-add': {
            const a = pick(random, [2, 3])
            const m = randomInt(random, 2, 4)
            const n = randomInt(random, 2, 3)
            if (m * n === m + n) return null
            const right = error === 'exponent-multiply' ? m + n : m * n
            const reached = error === 'exponent-multiply' ? m * n : m + n
            if (a ** Math.max(right, reached) > 5000) return null
            const start = error === 'exponent-multiply' ? `${a}^{${m}}\\cdot ${a}^{${n}}` : `(${a}^{${m}})^{${n}}`
            const wrongRule = error === 'exponent-multiply' ? `${m}\\cdot ${n}` : `${m}+${n}`
            const rightRule = error === 'exponent-multiply' ? `${m}+${n}` : `${m}\\cdot ${n}`
            return {
                problem: say(`Kalkulatu: $${start}$`, `Calcula: $${start}$`, `احسب: $${start}$`, `Work out: $${start}$`),
                lines: [line(LABELS.rule, `${start}=${a}^{${wrongRule}}`), line(LABELS.power, `${a}^{${reached}}`), line(LABELS.result, `${tex(a ** reached)}`)],
                wrong: 0, error, fix: `${a}^{${rightRule}}=${a}^{${right}}=${tex(a ** right)}`, right: a ** right, reached: a ** reached
            }
        }
        case 'negative-exponent-sign': {
            const a = pick(random, [2, 3, 4, 5, 10])
            const n = randomInt(random, 2, a >= 5 ? 2 : 3)
            return {
                problem: say(`Kalkulatu: $${a}^{-${n}}$`, `Calcula: $${a}^{-${n}}$`, `احسب: $${a}^{-${n}}$`, `Work out: $${a}^{-${n}}$`),
                lines: [line(LABELS.rule, `${a}^{-${n}}=-${a}^{${n}}`), line(LABELS.power, `-${a}^{${n}}=-(${Array(n).fill(a).join('\\cdot ')})`), line(LABELS.result, `-${a ** n}`)],
                wrong: 0, error, fix: `${a}^{-${n}}=\\frac{1}{${a}^{${n}}}=\\frac{1}{${a ** n}}`, right: 1 / a ** n, reached: -(a ** n)
            }
        }
        case 'scientific-exponent': {
            const mantissa = pick(random, [1.2, 2.5, 3.4, 4.7, 5.6, 7.8, 8.3])
            const k = randomInt(random, 3, 5)
            const value = mantissa / 10 ** k
            const written = `0{,}${'0'.repeat(k - 1)}${String(mantissa).replace('.', '')}`
            const divisor = tex(10 ** k)
            return {
                problem: say(`Idatzi notazio zientifikoan: $${written}$`, `Escribe en notación científica: $${written}$`, `اكتب بالترميز العلمي: $${written}$`, `Write in scientific notation: $${written}$`),
                lines: [line(LABELS.shift, `${written}=\\frac{${tex(mantissa)}}{${divisor}}`), line(LABELS.tens, `${divisor}=10^{${k - 1}}`), line(LABELS.result, `${tex(mantissa)}\\cdot 10^{-${k - 1}}`)],
                wrong: 1, error, fix: `${divisor}=10^{${k}}\\ \\to\\ ${tex(mantissa)}\\cdot 10^{-${k}}`, right: value, reached: mantissa / 10 ** (k - 1)
            }
        }
        case 'radical-sum': {
            const [a, b] = pick(random, SQUARE_PAIRS)
            return {
                problem: say(`Kalkulatu: $\\sqrt{${a}}+\\sqrt{${b}}$`, `Calcula: $\\sqrt{${a}}+\\sqrt{${b}}$`, `احسب: $\\sqrt{${a}}+\\sqrt{${b}}$`, `Work out: $\\sqrt{${a}}+\\sqrt{${b}}$`),
                lines: [line(LABELS.join, `\\sqrt{${a}+${b}}`), line(LABELS.power, `\\sqrt{${a + b}}`), line(LABELS.result, `${Math.sqrt(a + b)}`)],
                wrong: 0, error, fix: `\\sqrt{${a}}+\\sqrt{${b}}\\ \\to\\ ${Math.sqrt(a)}+${Math.sqrt(b)}=${Math.sqrt(a) + Math.sqrt(b)}`, right: Math.sqrt(a) + Math.sqrt(b), reached: Math.sqrt(a + b)
            }
        }
        case 'fractional-exponent-swap': {
            const [p, q] = pick(random, [[2, 3], [3, 2], [3, 4]] as const)
            const k = pick(random, q === 4 ? [2] : [2, 3, 4])
            const a = k ** q
            const right = k ** p
            const reached = a ** (q / p)
            const index = (n: number) => (n === 2 ? '\\sqrt' : `\\sqrt[${n}]`)
            if (a ** q > 1e6) return null
            const exact = Math.abs(reached - Math.round(reached)) < 1e-9
            return {
                problem: say(`Kalkulatu: $${a}^{\\frac{${p}}{${q}}}$`, `Calcula: $${a}^{\\frac{${p}}{${q}}}$`, `احسب: $${a}^{\\frac{${p}}{${q}}}$`, `Work out: $${a}^{\\frac{${p}}{${q}}}$`),
                lines: [line(LABELS.rule, `${a}^{\\frac{${p}}{${q}}}=${index(p)}{${a}^{${q}}}`), line(LABELS.power, `${index(p)}{${tex(a ** q)}}`), line(LABELS.result, exact ? `${Math.round(reached)}` : `\\approx ${tex(reached)}`)],
                wrong: 0, error, fix: `${a}^{\\frac{${p}}{${q}}}=${index(q)}{${a}^{${p}}}=${right}`, right, reached: exact ? Math.round(reached) : Math.round(reached * 100) / 100
            }
        }
        case 'rationalize-only-denominator': {
            const b = pick(random, [2, 3, 5, 6, 7])
            const a = pick(random, [1, 2, 3, 4, 6, 10, 12, 14].filter((value) => value !== b))
            const simplified = a % b === 0 ? `${a / b === 1 ? '' : a / b}\\sqrt{${b}}` : `\\frac{${a}\\sqrt{${b}}}{${b}}`
            return {
                problem: say(`Arrazionalizatu: $\\frac{${a}}{\\sqrt{${b}}}$`, `Racionaliza: $\\frac{${a}}{\\sqrt{${b}}}$`, `أنطِق المقام: $\\frac{${a}}{\\sqrt{${b}}}$`, `Rationalise: $\\frac{${a}}{\\sqrt{${b}}}$`),
                lines: [line(LABELS.rationalize, `\\frac{${a}}{\\sqrt{${b}}\\cdot\\sqrt{${b}}}`), line(LABELS.product, `\\frac{${a}}{${b}}`), line(LABELS.result, `${tex(a / b)}`)],
                wrong: 0, error, fix: `\\frac{${a}\\cdot\\sqrt{${b}}}{\\sqrt{${b}}\\cdot\\sqrt{${b}}}=${simplified}`, right: a / Math.sqrt(b), reached: Math.round((a / b) * 100) / 100
            }
        }
        case 'conjugate-sign': {
            const a = randomInt(random, 3, 12)
            const b = randomInt(random, 2, a - 1)
            return {
                problem: say(`Kalkulatu: $(\\sqrt{${a}}+\\sqrt{${b}})(\\sqrt{${a}}-\\sqrt{${b}})$`, `Calcula: $(\\sqrt{${a}}+\\sqrt{${b}})(\\sqrt{${a}}-\\sqrt{${b}})$`, `احسب: $(\\sqrt{${a}}+\\sqrt{${b}})(\\sqrt{${a}}-\\sqrt{${b}})$`, `Work out: $(\\sqrt{${a}}+\\sqrt{${b}})(\\sqrt{${a}}-\\sqrt{${b}})$`),
                lines: [line(LABELS.product, `(\\sqrt{${a}})^{2}+(\\sqrt{${b}})^{2}`), line(LABELS.values, `${a}+${b}`), line(LABELS.result, `${a + b}`)],
                wrong: 0, error, fix: `(\\sqrt{${a}})^{2}-(\\sqrt{${b}})^{2}\\ \\to\\ ${a}-${b}=${a - b}`, right: a - b, reached: a + b
            }
        }
        case 'log-of-sum': {
            const m = randomInt(random, 2, 5)
            const a = 2 ** m
            return {
                problem: say(`Kalkulatu: $\\log_{2}(${a}+${a})$`, `Calcula: $\\log_{2}(${a}+${a})$`, `احسب: $\\log_{2}(${a}+${a})$`, `Work out: $\\log_{2}(${a}+${a})$`),
                lines: [line(LABELS.logarithm, `\\log_{2}${a}+\\log_{2}${a}`), line(LABELS.values, `${m}+${m}`), line(LABELS.result, `${2 * m}`)],
                wrong: 0, error, fix: `\\log_{2}${2 * a}=${m + 1}`, right: m + 1, reached: 2 * m
            }
        }
        case 'log-power': {
            const base = pick(random, [2, 3, 10])
            const e = randomInt(random, base === 10 ? 1 : 2, base === 2 ? 4 : 3)
            const k = randomInt(random, 2, 3)
            const N = base ** e
            if (e ** k === k * e) return null
            return {
                problem: say(`Kalkulatu: $\\log_{${base}}${N}^{${k}}$`, `Calcula: $\\log_{${base}}${N}^{${k}}$`, `احسب: $\\log_{${base}}${N}^{${k}}$`, `Work out: $\\log_{${base}}${N}^{${k}}$`),
                lines: [line(LABELS.rule, `(\\log_{${base}}${N})^{${k}}`), line(LABELS.values, `${e}^{${k}}`), line(LABELS.result, `${e ** k}`)],
                wrong: 0, error, fix: `${k}\\cdot\\log_{${base}}${N}=${k}\\cdot ${e}=${k * e}`, right: k * e, reached: e ** k
            }
        }
        case 'log-quotient': {
            const m = randomInt(random, 4, 7)
            const n = randomInt(random, 1, m - 1)
            if (m / n === m - n || !Number.isInteger((m / n) * 100)) return null
            return {
                problem: say(`Kalkulatu: $\\log_{2}\\frac{${2 ** m}}{${2 ** n}}$`, `Calcula: $\\log_{2}\\frac{${2 ** m}}{${2 ** n}}$`, `احسب: $\\log_{2}\\frac{${2 ** m}}{${2 ** n}}$`, `Work out: $\\log_{2}\\frac{${2 ** m}}{${2 ** n}}$`),
                lines: [line(LABELS.rule, `\\frac{\\log_{2}${2 ** m}}{\\log_{2}${2 ** n}}`), line(LABELS.values, `\\frac{${m}}{${n}}`), line(LABELS.result, `${tex(m / n)}`)],
                wrong: 0, error, fix: `\\log_{2}${2 ** m}-\\log_{2}${2 ** n}\\ \\to\\ ${m}-${n}=${m - n}`, right: m - n, reached: m / n
            }
        }
        case 'log-as-division': {
            const base = pick(random, [2, 3, 5])
            const e = randomInt(random, 3, base === 2 ? 6 : 4)
            const N = base ** e
            return {
                problem: say(`Kalkulatu: $\\log_{${base}}${N}$`, `Calcula: $\\log_{${base}}${N}$`, `احسب: $\\log_{${base}}${N}$`, `Work out: $\\log_{${base}}${N}$`),
                lines: [line(LABELS.logarithm, `\\log_{${base}}${N}=\\frac{${N}}{${base}}`), line(LABELS.values, `${N}\\div ${base}`), line(LABELS.result, `${N / base}`)],
                wrong: 0, error, fix: `${base}^{${e}}=${N}\\ \\to\\ \\log_{${base}}${N}=${e}`, right: e, reached: N / base
            }
        }
    }
}

export const createPowersDetectiveCases = (random: Random, levelIndex: number) => createWorkedCases(random, powersDetectiveLevels[levelIndex], POWERS_DETECTIVE_CASES, build)
