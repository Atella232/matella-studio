import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   J4 · Segiden detektibea (Detective de sucesiones): a worked calculation
   of three lines with one wrong line, the mistakes of this unit. Level 1:
   n·d instead of (n − 1)·d, rⁿ instead of rⁿ⁻¹, the arithmetic sum
   without the 2, and p/100 as the ratio of a growth; level 2: the infinite
   sum with |r| ≥ 1, a recurring decimal over 100, the constant terms
   taken as the limit, and the higher degree below sent to infinity;
   level 3: (1 + 1/n)ⁿ → 1, (1 + k/n)ⁿ → k·e, N = 1/ε instead of the next
   term, and continuous growth without the time.
   ========================================================================== */

export type BachSequencesDetectiveError =
    | 'arith-n-d'
    | 'geo-power'
    | 'sum-half'
    | 'percent-ratio'
    | 'series-big-ratio'
    | 'period-hundred'
    | 'limit-constants'
    | 'limit-degree'
    | 'e-one'
    | 'e-times-k'
    | 'from-term-equal'
    | 'continuous-time'

export const bachSequencesDetectiveLevels: BachSequencesDetectiveError[][] = [
    ['arith-n-d', 'geo-power', 'sum-half', 'percent-ratio'],
    ['series-big-ratio', 'period-hundred', 'limit-constants', 'limit-degree'],
    ['e-one', 'e-times-k', 'from-term-equal', 'continuous-time']
]

export const BACH_SEQUENCES_DETECTIVE_CASES = 6

/** Arabic writes the decimal point instead of the comma */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
/** A number in LaTeX, with the decimal comma */
const tex = (value: number) => String(Math.round(value * 100) / 100).replace('.', '{,}')
const LABELS = {
    rule: say('Araua', 'Regla', 'القاعدة', 'Rule'),
    values: say('Balioak', 'Valores', 'القيم', 'Values'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    ratio: say('Arrazoia', 'Razón', 'الأساس', 'Ratio'),
    degrees: say('Mailak', 'Grados', 'الدرجتان', 'Degrees'),
    limit: say('Limitea', 'Límite', 'النهاية', 'Limit'),
    inequality: say('Desberdintza', 'Desigualdad', 'المتباينة', 'Inequality'),
    term: say('Gaia', 'Término', 'الحد', 'Term')
}

export const bachSequencesDetectiveNames: Record<BachSequencesDetectiveError, LocalizedText> = {
    'arith-n-d': say('$n\\cdot d$ jarri du, $(n-1)\\cdot d$ ordez', 'Puso $n\\cdot d$ en vez de $(n-1)\\cdot d$', 'وضع $n\\cdot d$ بدل $(n-1)\\cdot d$', 'Wrote $n\\cdot d$ instead of $(n-1)\\cdot d$'),
    'geo-power': say('$r^n$ jarri du, $r^{n-1}$ ordez', 'Puso $r^n$ en vez de $r^{n-1}$', 'وضع $r^n$ بدل $r^{n-1}$', 'Wrote $r^n$ instead of $r^{n-1}$'),
    'sum-half': say('Batura ez du 2 zenbakiaz zatitu', 'No dividió la suma entre 2', 'لم يقسم المجموع على 2', 'Did not divide the sum by 2'),
    'percent-ratio': say('Arrazoitzat ehunekoa bakarrik hartu du', 'Tomó como razón solo el porcentaje', 'أخذ النسبة المئوية وحدها أساسًا', 'Took only the percentage as the ratio'),
    'series-big-ratio': say('Formula erabili du $|r|\\ge 1$ izanda', 'Usó la fórmula con $|r|\\ge 1$', 'استعمل الصيغة مع $|r|\\ge 1$', 'Used the formula with $|r|\\ge 1$'),
    'period-hundred': say('Periodoa 100 zenbakiaz zatitu du, ez 99 zenbakiaz', 'Dividió el periodo entre 100, no entre 99', 'قسم الدورة على 100 لا على 99', 'Divided the repeating block by 100, not by 99'),
    'limit-constants': say('Gai askeak hartu ditu, ez koefiziente nagusiak', 'Tomó los términos independientes, no los coeficientes principales', 'أخذ الحدين الثابتين لا المعاملين الرئيسيين', 'Took the constant terms, not the leading coefficients'),
    'limit-degree': say('Behean maila handiagoa izanda, infinitua eman du', 'Con mayor grado abajo, dio infinito', 'مع درجة أكبر في المقام أعطى لانهاية', 'With the higher degree below, gave infinity'),
    'e-one': say('$1+\\frac{1}{n}\\to 1$ denez, limitea 1 dela pentsatu du', 'Como $1+\\frac{1}{n}\\to 1$, pensó que el límite es 1', 'بما أن $1+\\frac{1}{n}\\to 1$ ظن أن النهاية 1', 'Since $1+\\frac{1}{n}\\to 1$, thought the limit is 1'),
    'e-times-k': say('$e^k$ ordez $k\\cdot e$ jarri du', 'Puso $k\\cdot e$ en vez de $e^k$', 'وضع $k\\cdot e$ بدل $e^k$', 'Wrote $k\\cdot e$ instead of $e^k$'),
    'from-term-equal': say('$n>N$ izan behar du, eta $N$ bera hartu du', 'Tenía que ser $n>N$ y tomó el propio $N$', 'كان يجب $n>N$ فأخذ $N$ نفسه', 'It had to be $n>N$, and took $N$ itself'),
    'continuous-time': say('Denbora ahaztu du berretzailean', 'Olvidó el tiempo en el exponente', 'نسي الزمن في الأس', 'Forgot the time in the exponent')
}

export const bachSequencesDetectiveTips: Record<BachSequencesDetectiveError, LocalizedText> = {
    'arith-n-d': say('$a_1$ gaitik $a_n$ gaira $n-1$ jauzi daude: $a_n=a_1+(n-1)\\,d$.', 'De $a_1$ a $a_n$ hay $n-1$ saltos: $a_n=a_1+(n-1)\\,d$.', 'من $a_1$ إلى $a_n$ توجد $n-1$ قفزة: $a_n=a_1+(n-1)\\,d$.', 'From $a_1$ to $a_n$ there are $n-1$ jumps: $a_n=a_1+(n-1)\\,d$.'),
    'geo-power': say('$a_n=a_1\\cdot r^{n-1}$: $a_1$ gaiak oraindik ez du $r$.', '$a_n=a_1\\cdot r^{n-1}$: $a_1$ aún no lleva $r$.', '$a_n=a_1\\cdot r^{n-1}$: الحد $a_1$ لا يحتوي $r$ بعد.', '$a_n=a_1\\cdot r^{n-1}$: $a_1$ has no $r$ yet.'),
    'sum-half': say('$S_n=\\frac{(a_1+a_n)\\,n}{2}$: bikote bakoitza bi aldiz dago.', '$S_n=\\frac{(a_1+a_n)\\,n}{2}$: cada pareja está dos veces.', '$S_n=\\frac{(a_1+a_n)\\,n}{2}$: كل زوج موجود مرتين.', '$S_n=\\frac{(a_1+a_n)\\,n}{2}$: each pair is there twice.'),
    'percent-ratio': say('% $p$ hazten bada, $r=1+\\frac{p}{100}$.', 'Si crece un $p$ %, $r=1+\\frac{p}{100}$.', 'إذا زاد $p$ % فإن $r=1+\\frac{p}{100}$.', 'If it grows by $p$%, $r=1+\\frac{p}{100}$.'),
    'series-big-ratio': say('$S_\\infty=\\frac{a_1}{1-r}$ $|r|<1$ denean bakarrik; bestela, batura ez da zenbaki bat.', '$S_\\infty=\\frac{a_1}{1-r}$ solo si $|r|<1$; si no, la suma no es un número.', '$S_\\infty=\\frac{a_1}{1-r}$ فقط إذا كان $|r|<1$، وإلا فالمجموع ليس عددًا.', '$S_\\infty=\\frac{a_1}{1-r}$ only if $|r|<1$; otherwise the sum is not a number.'),
    'period-hundred': say('$0{,}\\overline{ab}=\\frac{ab}{99}$: batura infinitua, ez 100.', '$0{,}\\overline{ab}=\\frac{ab}{99}$: es una suma infinita, no 100.', '$0{,}\\overline{ab}=\\frac{ab}{99}$: مجموع لا نهائي لا 100.', '$0{,}\\overline{ab}=\\frac{ab}{99}$: an infinite sum, not 100.'),
    'limit-constants': say('$n$ handia denean, maila handieneko gaiak agintzen du.', 'Cuando $n$ es grande, manda el término de mayor grado.', 'عندما يكون $n$ كبيرًا يغلب الحد ذو الدرجة الأكبر.', 'When $n$ is large, the highest-degree term wins.'),
    'limit-degree': say('Behean maila handiagoa: limitea 0 da.', 'Mayor grado abajo: el límite es 0.', 'درجة المقام أكبر: النهاية 0.', 'Higher degree below: the limit is 0.'),
    'e-one': say('Oinarria 1 zenbakira doa, baina berretzailea infinitura: $\\left(1+\\frac{1}{n}\\right)^n\\to e$.', 'La base va a 1, pero el exponente a infinito: $\\left(1+\\frac{1}{n}\\right)^n\\to e$.', 'الأساس يتجه إلى 1 والأس إلى اللانهاية: $\\left(1+\\frac{1}{n}\\right)^n\\to e$.', 'The base goes to 1, but the exponent to infinity: $\\left(1+\\frac{1}{n}\\right)^n\\to e$.'),
    'e-times-k': say('$\\left(1+\\frac{k}{n}\\right)^n\\to e^k$, ez $k\\cdot e$.', '$\\left(1+\\frac{k}{n}\\right)^n\\to e^k$, no $k\\cdot e$.', '$\\left(1+\\frac{k}{n}\\right)^n\\to e^k$ لا $k\\cdot e$.', '$\\left(1+\\frac{k}{n}\\right)^n\\to e^k$, not $k\\cdot e$.'),
    'from-term-equal': say('$\\frac{1}{n}<\\varepsilon$ desberdintza hertsia da: $n=\\frac{1}{\\varepsilon}$ ez da sartzen.', 'La desigualdad $\\frac{1}{n}<\\varepsilon$ es estricta: $n=\\frac{1}{\\varepsilon}$ no entra.', 'المتباينة $\\frac{1}{n}<\\varepsilon$ صارمة: $n=\\frac{1}{\\varepsilon}$ لا يدخل.', 'The inequality $\\frac{1}{n}<\\varepsilon$ is strict: $n=\\frac{1}{\\varepsilon}$ is not included.'),
    'continuous-time': say('$t$ urtetan, $C=C_0\\cdot e^{k\\,t}$.', 'En $t$ años, $C=C_0\\cdot e^{k\\,t}$.', 'في $t$ سنة يكون $C=C_0\\cdot e^{k\\,t}$.', 'In $t$ years, $C=C_0\\cdot e^{k\\,t}$.')
}

type Built = Omit<WorkedCase<BachSequencesDetectiveError>, 'options'>

function build(random: Random, error: BachSequencesDetectiveError): Built | null {
    switch (error) {
        case 'arith-n-d': {
            const a1 = randomInt(random, -5, 9)
            const d = pick(random, [-4, -3, -2, 2, 3, 4, 5])
            const n = randomInt(random, 8, 20)
            const right = a1 + (n - 1) * d
            const reached = a1 + n * d
            return {
                problem: say(`Progresio aritmetiko batean $a_1=${a1}$ eta $d=${d}$. Kalkulatu $a_{${n}}$.`, `En una progresión aritmética, $a_1=${a1}$ y $d=${d}$. Calcula $a_{${n}}$.`, `في متتالية حسابية $a_1=${a1}$ و$d=${d}$. احسب $a_{${n}}$.`, `In an arithmetic progression, $a_1=${a1}$ and $d=${d}$. Work out $a_{${n}}$.`),
                lines: [line(LABELS.rule, `a_n=a_1+n\\cdot d`), line(LABELS.values, `a_{${n}}=${a1}+${n}\\cdot(${d})`), line(LABELS.result, `a_{${n}}=${reached}`)],
                wrong: 0, error, fix: `a_{${n}}=${a1}+${n - 1}\\cdot(${d})=${right}`, right, reached
            }
        }
        case 'geo-power': {
            const a1 = randomInt(random, 2, 6)
            const r = pick(random, [2, 3])
            const n = randomInt(random, 4, 6)
            const right = a1 * r ** (n - 1)
            const reached = a1 * r ** n
            return {
                problem: say(`Progresio geometriko batean $a_1=${a1}$ eta $r=${r}$. Kalkulatu $a_${n}$.`, `En una progresión geométrica, $a_1=${a1}$ y $r=${r}$. Calcula $a_${n}$.`, `في متتالية هندسية $a_1=${a1}$ و$r=${r}$. احسب $a_${n}$.`, `In a geometric progression, $a_1=${a1}$ and $r=${r}$. Work out $a_${n}$.`),
                lines: [line(LABELS.rule, `a_n=a_1\\cdot r^n`), line(LABELS.values, `a_${n}=${a1}\\cdot ${r}^{${n}}`), line(LABELS.result, `a_${n}=${reached}`)],
                wrong: 0, error, fix: `a_${n}=${a1}\\cdot ${r}^{${n - 1}}=${right}`, right, reached
            }
        }
        case 'sum-half': {
            const a1 = randomInt(random, 1, 9)
            const d = randomInt(random, 2, 5)
            const n = pick(random, [10, 12, 20])
            const an = a1 + (n - 1) * d
            const right = ((a1 + an) * n) / 2
            const reached = (a1 + an) * n
            return {
                problem: say(`Progresio aritmetiko batean $a_1=${a1}$ eta $d=${d}$. Kalkulatu $S_{${n}}$.`, `En una progresión aritmética, $a_1=${a1}$ y $d=${d}$. Calcula $S_{${n}}$.`, `في متتالية حسابية $a_1=${a1}$ و$d=${d}$. احسب $S_{${n}}$.`, `In an arithmetic progression, $a_1=${a1}$ and $d=${d}$. Work out $S_{${n}}$.`),
                lines: [line(LABELS.term, `a_{${n}}=${a1}+${n - 1}\\cdot ${d}=${an}`), line(LABELS.rule, `S_{${n}}=(${a1}+${an})\\cdot ${n}`), line(LABELS.result, `S_{${n}}=${reached}`)],
                wrong: 1, error, fix: `S_{${n}}=\\frac{(${a1}+${an})\\cdot ${n}}{2}=${right}`, right, reached
            }
        }
        case 'percent-ratio': {
            const start = pick(random, [200, 500, 800, 1000])
            const p = pick(random, [2, 3, 4, 5, 10])
            const years = randomInt(random, 2, 3)
            const right = start * (1 + p / 100) ** years
            const reached = start * (p / 100) ** years
            return {
                problem: say(`${start} € % ${p} hazten dira urtero. Zenbat izango dira ${years} urte barru?`, `${start} € crecen un ${p} % cada año. ¿Cuánto serán dentro de ${years} años?`, `تزداد ${start} € بنسبة ${p} % كل سنة. كم تصير بعد ${years} سنوات؟`, `€${start} grows by ${p}% every year. How much will it be in ${years} years?`),
                lines: [line(LABELS.ratio, `r=${tex(p / 100)}`), line(LABELS.values, `${start}\\cdot ${tex(p / 100)}^{${years}}`), line(LABELS.result, tex(reached))],
                wrong: 0, error, fix: `r=1+${tex(p / 100)}=${tex(1 + p / 100)}\\ \\to\\ ${start}\\cdot ${tex(1 + p / 100)}^{${years}}\\approx ${tex(right)}`, right, reached
            }
        }
        case 'series-big-ratio': {
            const a1 = randomInt(random, 1, 5)
            const r = pick(random, [2, 3])
            const reached = a1 / (1 - r)
            return {
                problem: say(`Kalkulatu $${a1}+${a1 * r}+${a1 * r * r}+\\ldots$`, `Calcula $${a1}+${a1 * r}+${a1 * r * r}+\\ldots$`, `احسب $${a1}+${a1 * r}+${a1 * r * r}+\\ldots$`, `Work out $${a1}+${a1 * r}+${a1 * r * r}+\\ldots$`),
                lines: [line(LABELS.ratio, `r=${r}`), line(LABELS.rule, `S_\\infty=\\frac{${a1}}{1-${r}}`), line(LABELS.result, `S_\\infty=${tex(reached)}`)],
                wrong: 1, error, fix: `|r|=${r}\\ge 1\\ \\to\\ +\\infty`, right: Number.POSITIVE_INFINITY, reached
            }
        }
        case 'period-hundred': {
            const block = randomInt(random, 12, 98)
            if (block % 11 === 0 || block % 10 === 0) return null
            const right = block / 99
            const reached = block / 100
            return {
                problem: say(`Aurkitu $0{,}\\overline{${block}}$ zenbakiaren zatikia.`, `Halla la fracción de $0{,}\\overline{${block}}$.`, `أوجد كسر العدد $0{,}\\overline{${block}}$.`, `Find the fraction of $0{,}\\overline{${block}}$.`),
                lines: [line(LABELS.rule, `0{,}${block}+0{,}00${block}+\\ldots`), line(LABELS.values, `\\frac{${block}}{100}`), line(LABELS.result, `0{,}${block}`)],
                wrong: 1, error, fix: `\\frac{0{,}${block}}{1-0{,}01}=\\frac{${block}}{99}`, right, reached
            }
        }
        case 'limit-constants': {
            const a = randomInt(random, 2, 9)
            const b = randomInt(random, 2, 6)
            const c = randomInt(random, 1, 9)
            const d = randomInt(random, 1, 9)
            if (a * d === b * c || (a % b === 0 && c % d === 0)) return null
            const right = a / b
            const reached = c / d
            return {
                problem: say(`Kalkulatu $\\lim\\frac{${a}n+${c}}{${b}n+${d}}$.`, `Calcula $\\lim\\frac{${a}n+${c}}{${b}n+${d}}$.`, `احسب $\\lim\\frac{${a}n+${c}}{${b}n+${d}}$.`, `Work out $\\lim\\frac{${a}n+${c}}{${b}n+${d}}$.`),
                lines: [line(LABELS.degrees, `1=1`), line(LABELS.rule, `\\frac{${c}}{${d}}`), line(LABELS.limit, `\\lim=\\frac{${c}}{${d}}`)],
                wrong: 1, error, fix: `\\frac{${a}}{${b}}`, right, reached
            }
        }
        case 'limit-degree': {
            const a = randomInt(random, 1, 9)
            const c = randomInt(random, 1, 9)
            const b = randomInt(random, 2, 5)
            return {
                problem: say(`Kalkulatu $\\lim\\frac{${a}n+${c}}{${b}n^2}$.`, `Calcula $\\lim\\frac{${a}n+${c}}{${b}n^2}$.`, `احسب $\\lim\\frac{${a}n+${c}}{${b}n^2}$.`, `Work out $\\lim\\frac{${a}n+${c}}{${b}n^2}$.`),
                lines: [line(LABELS.degrees, `1<2`), line(LABELS.rule, `\\frac{n}{n^2}=\\frac{1}{n}`), line(LABELS.limit, `\\lim=+\\infty`)],
                wrong: 2, error, fix: `\\frac{1}{n}\\to 0\\ \\to\\ \\lim=0`, right: 0, reached: Number.POSITIVE_INFINITY
            }
        }
        case 'e-one': {
            const k = pick(random, [1, 2, 3])
            const power = k === 1 ? 'n' : `${k}n`
            return {
                problem: say(`Kalkulatu $\\lim\\left(1+\\frac{1}{n}\\right)^{${power}}$.`, `Calcula $\\lim\\left(1+\\frac{1}{n}\\right)^{${power}}$.`, `احسب $\\lim\\left(1+\\frac{1}{n}\\right)^{${power}}$.`, `Work out $\\lim\\left(1+\\frac{1}{n}\\right)^{${power}}$.`),
                lines: [line(LABELS.rule, `1+\\frac{1}{n}\\to 1`), line(LABELS.values, `1^{${power}}=1`), line(LABELS.limit, `\\lim=1`)],
                wrong: 1, error, fix: k === 1 ? `\\left(1+\\frac{1}{n}\\right)^n\\to e` : `\\left(\\left(1+\\frac{1}{n}\\right)^n\\right)^{${k}}\\to e^{${k}}`, right: Math.E ** k, reached: 1
            }
        }
        case 'e-times-k': {
            const k = randomInt(random, 2, 5)
            return {
                problem: say(`Kalkulatu $\\lim\\left(1+\\frac{${k}}{n}\\right)^n$.`, `Calcula $\\lim\\left(1+\\frac{${k}}{n}\\right)^n$.`, `احسب $\\lim\\left(1+\\frac{${k}}{n}\\right)^n$.`, `Work out $\\lim\\left(1+\\frac{${k}}{n}\\right)^n$.`),
                lines: [line(LABELS.rule, `\\left(1+\\frac{1}{n}\\right)^n\\to e`), line(LABELS.values, `\\left(1+\\frac{${k}}{n}\\right)^n\\to ${k}\\cdot e`), line(LABELS.limit, `\\lim\\approx ${tex(k * Math.E)}`)],
                wrong: 1, error, fix: `\\left(1+\\frac{${k}}{n}\\right)^n\\to e^{${k}}\\approx ${tex(Math.E ** k)}`, right: Math.E ** k, reached: k * Math.E
            }
        }
        case 'from-term-equal': {
            const [epsilon, size] = pick(random, [['0{,}1', 10], ['0{,}01', 100], ['0{,}001', 1000], ['0{,}05', 20], ['0{,}02', 50]] as Array<[string, number]>)
            const l = randomInt(random, 1, 5)
            return {
                problem: say(`$a_n=${l}+\\frac{1}{n}$ segidan, zein gaitik aurrera daude guztiak ${l} zenbakitik $${epsilon}$ baino gertuago?`, `En $a_n=${l}+\\frac{1}{n}$, ¿a partir de qué término están todos a menos de $${epsilon}$ de ${l}?`, `في $a_n=${l}+\\frac{1}{n}$، ابتداءً من أيّ حد تكون كلها على بعد أقل من $${epsilon}$ عن ${l}؟`, `In $a_n=${l}+\\frac{1}{n}$, from which term on are they all less than $${epsilon}$ away from ${l}?`),
                lines: [line(LABELS.inequality, `\\frac{1}{n}<${epsilon}`), line(LABELS.values, `n>${size}`), line(LABELS.term, `N=${size}`)],
                wrong: 2, error, fix: `n>${size}\\ \\to\\ N=${size + 1}`, right: size + 1, reached: size
            }
        }
        case 'continuous-time': {
            const start = pick(random, [200, 400, 500, 1000])
            const rate = pick(random, [2, 3, 4, 5])
            const years = randomInt(random, 5, 10)
            const k = rate / 100
            const right = start * Math.exp(k * years)
            const reached = start * Math.exp(k)
            return {
                problem: say(`${start} € % ${rate} interes jarraituan jartzen dira ${years} urterako. Zenbat bihurtzen dira?`, `Se colocan ${start} € al ${rate} % con interés continuo durante ${years} años. ¿En cuánto se convierten?`, `تُستثمر ${start} € بفائدة مستمرة ${rate} % مدة ${years} سنوات. كم تصير؟`, `€${start} is invested at ${rate}% continuous interest for ${years} years. What does it become?`),
                lines: [line(LABELS.rule, `C=C_0\\cdot e^{k}`), line(LABELS.values, `${start}\\cdot e^{${tex(k)}}`), line(LABELS.result, `\\approx ${tex(reached)}`)],
                wrong: 0, error, fix: `${start}\\cdot e^{${tex(k)}\\cdot ${years}}\\approx ${tex(right)}`, right, reached
            }
        }
    }
}

export const createBachSequencesDetectiveCases = (random: Random, levelIndex: number) => createWorkedCases(random, bachSequencesDetectiveLevels[levelIndex], BACH_SEQUENCES_DETECTIVE_CASES, build)
