import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Estatistikaren detektibea (1. DBH statistics and probability): a worked
   answer of three lines with one wrong line. Level 1: parameters (the
   frequency given as the mode, the mean divided by the number of different
   values, the median of unsorted data); level 2: graphs and percentages
   (a sector worked out over 100, a percentage without × 100, the range as
   last minus first); level 3: probability (favourable over unfavourable,
   the opposite event with the same probability, «or» worked out by
   multiplying).
   ========================================================================== */

export type StatsDetectiveError =
    | 'frequency-as-mode'
    | 'mean-distinct'
    | 'median-unsorted'
    | 'sector-over-100'
    | 'percent-no-100'
    | 'range-first-last'
    | 'over-unfavourable'
    | 'opposite-same'
    | 'or-multiplied'

export const statsDetectiveLevels: StatsDetectiveError[][] = [
    ['frequency-as-mode', 'mean-distinct', 'median-unsorted'],
    ['sector-over-100', 'percent-no-100', 'range-first-last'],
    ['over-unfavourable', 'opposite-same', 'or-multiplied']
]

export const STATS_DETECTIVE_CASES = 6

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const n = (value: number) => String(Math.round(value * 100) / 100).replace('.', '{,}')
const list = (values: number[]) => values.join(',\\ ')
const sum = (values: number[]) => values.reduce((total, value) => total + value, 0)
const LABELS = {
    count: say('Kontaketa', 'Recuento', 'العدّ', 'Tally'),
    highest: say('Maiztasun handiena', 'Mayor frecuencia', 'أكبر تكرار', 'Highest frequency'),
    mode: say('Moda', 'Moda', 'المنوال', 'Mode'),
    sum: say('Batura', 'Suma', 'المجموع', 'Sum'),
    data: say('Datu kopurua', 'Número de datos', 'عدد البيانات', 'Number of data'),
    mean: say('Batez bestekoa', 'Media', 'المتوسط', 'Mean'),
    values: say('Datuak', 'Datos', 'البيانات', 'Data'),
    centre: say('Erdikoa', 'El del centro', 'الأوسط', 'The middle one'),
    median: say('Mediana', 'Mediana', 'الوسيط', 'Median'),
    fraction: say('Zatikia', 'Fracción', 'الكسر', 'Fraction'),
    angle: say('Angelua', 'Ángulo', 'الزاوية', 'Angle'),
    sector: say('Sektorea', 'Sector', 'القطاع', 'Sector'),
    decimal: say('Hamartarra', 'Decimal', 'العدد العشري', 'Decimal'),
    percent: say('Ehunekoa', 'Porcentaje', 'النسبة المئوية', 'Percentage'),
    range: say('Ibilbidea', 'Rango', 'المدى', 'Range'),
    favourable: say('Aldeko kasuak', 'Casos favorables', 'الحالات الملائمة', 'Favourable cases'),
    possible: say('Kasu posibleak', 'Casos posibles', 'الحالات الممكنة', 'Possible cases'),
    probability: say('Probabilitatea', 'Probabilidad', 'الاحتمال', 'Probability'),
    opposite: say('Aurkakoa', 'Contrario', 'الحدث المعاكس', 'Opposite event'),
    either: say('Bata edo bestea', 'Uno u otro', 'هذا أو ذاك', 'One or the other')
}

export const statsDetectiveNames: Record<StatsDetectiveError, LocalizedText> = {
    'frequency-as-mode': say('Maiztasuna eman du, modaren balioaren ordez', 'Dio la frecuencia en vez del valor de la moda', 'أعطى التكرار بدل قيمة المنوال', 'Gave the frequency instead of the value of the mode'),
    'mean-distinct': say('Balio desberdinen kopuruaz zatitu du, datu guztienaz beharrean', 'Dividió entre los valores distintos y no entre todos los datos', 'قسم على عدد القيم المختلفة لا على كل البيانات', 'Divided by the different values, not by all the data'),
    'median-unsorted': say('Mediana datuak ordenatu gabe hartu du', 'Tomó la mediana sin ordenar los datos', 'أخذ الوسيط دون ترتيب البيانات', 'Took the median without sorting the data'),
    'sector-over-100': say('Sektorearen angelua ehunen gainean kalkulatu du', 'Calculó el ángulo del sector sobre 100', 'حسب زاوية القطاع على 100', 'Worked out the sector angle over 100'),
    'percent-no-100': say('Ehunekoa ehunez biderkatu gabe eman du', 'Dio el porcentaje sin multiplicar por 100', 'أعطى النسبة المئوية دون الضرب في 100', 'Gave the percentage without multiplying by 100'),
    'range-first-last': say('Ibilbidea azken datua ken lehena dela uste du', 'Creyó que el rango es el último menos el primero', 'ظن أن المدى هو الأخير ناقص الأول', 'Thought the range is the last minus the first'),
    'over-unfavourable': say('Aldeko kasuak aurkako kasuez zatitu ditu', 'Dividió entre los casos desfavorables', 'قسم على الحالات غير الملائمة', 'Divided by the unfavourable cases'),
    'opposite-same': say('Aurkako gertaerak probabilitate bera duela uste du', 'Creyó que el suceso contrario tiene la misma probabilidad', 'ظن أن للحدث المعاكس الاحتمال نفسه', 'Thought the opposite event has the same probability'),
    'or-multiplied': say('«Edo» batu beharrean biderkatu du', 'Para «o» multiplicó en vez de sumar', 'ضرب بدل الجمع في «أو»', 'Multiplied instead of adding for «or»')
}

export const statsDetectiveTips: Record<StatsDetectiveError, LocalizedText> = {
    'frequency-as-mode': say('Moda gehien errepikatzen den datua da, ez zenbat aldiz.', 'La moda es el dato que más se repite, no cuántas veces.', 'المنوال هو القيمة الأكثر تكرارًا لا عدد مرات تكرارها.', 'The mode is the value that repeats most, not how many times.'),
    'mean-distinct': say('Batez bestekoa: batura zati datu guztien kopurua, errepikatuak barne.', 'Media: la suma entre el número de datos, repetidos incluidos.', 'المتوسط: المجموع على عدد كل البيانات بما فيها المكررة.', 'Mean: the sum divided by the number of data, repeats included.'),
    'median-unsorted': say('Lehenik ordenatu datuak; gero, erdikoa.', 'Primero se ordenan los datos; después, el del centro.', 'نرتّب البيانات أولًا ثم نأخذ الأوسط.', 'First sort the data; then take the middle one.'),
    'sector-over-100': say('Zirkulu osoa $360^{\\circ}$ da: $\\frac{f}{N}\\cdot 360^{\\circ}$.', 'El círculo entero son $360^{\\circ}$: $\\frac{f}{N}\\cdot 360^{\\circ}$.', 'الدائرة كاملة $360^{\\circ}$: $\\frac{f}{N}\\cdot 360^{\\circ}$.', 'The whole circle is $360^{\\circ}$: $\\frac{f}{N}\\cdot 360^{\\circ}$.'),
    'percent-no-100': say('$0{,}4=\\frac{40}{100}=40\\,\\%$: biderkatu ehunez.', '$0{,}4=\\frac{40}{100}=40\\,\\%$: multiplica por 100.', '$0{,}4=\\frac{40}{100}=40\\,\\%$: اضرب في 100.', '$0{,}4=\\frac{40}{100}=40\\,\\%$: multiply by 100.'),
    'range-first-last': say('Ibilbidea: daturik handiena ken txikiena.', 'Rango: el dato mayor menos el menor.', 'المدى: أكبر قيمة ناقص أصغر قيمة.', 'Range: the biggest value minus the smallest.'),
    'over-unfavourable': say('Laplace: aldeko kasuak zati kasu posible guztiak.', 'Laplace: casos favorables entre todos los casos posibles.', 'لابلاس: الحالات الملائمة على كل الحالات الممكنة.', 'Laplace: favourable cases over all possible cases.'),
    'opposite-same': say('Aurkakoa: $1-P(A)$.', 'El contrario: $1-P(A)$.', 'المعاكس: $1-P(A)$.', 'The opposite: $1-P(A)$.'),
    'or-multiplied': say('Bata edo bestea: batu aldeko kasuak.', 'Uno u otro: se suman los casos favorables.', 'هذا أو ذاك: نجمع الحالات الملائمة.', 'One or the other: add the favourable cases.')
}

type Built = Omit<WorkedCase<StatsDetectiveError>, 'options'>

const exact = (value: number) => Math.abs(Math.round(value * 100) - value * 100) < 1e-9

function build(random: Random, error: StatsDetectiveError): Built | null {
    switch (error) {
        case 'frequency-as-mode': {
            const values = shuffle(random, [2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3)
            const counts = [randomInt(random, 3, 4), randomInt(random, 1, 2), randomInt(random, 1, 2)]
            const [mode, top] = [values[0], counts[0]]
            if (mode === top || values.slice(1).includes(top)) return null
            const data = shuffle(random, values.flatMap((value, index) => Array.from({ length: counts[index] }, () => value)))
            const tally = values.map((value, index) => [value, counts[index]] as const).sort((p, q) => p[0] - q[0]).map(([value, count]) => `${value}\\to ${count}`).join(',\\ ')
            return {
                problem: say(`Aurkitu moda: $${list(data)}$`, `Halla la moda: $${list(data)}$`, `أوجد المنوال: $${list(data)}$`, `Find the mode: $${list(data)}$`),
                lines: [line(LABELS.count, tally), line(LABELS.highest, `${top}`), line(LABELS.mode, `${top}`)],
                wrong: 2, error, fix: `${mode}\\to ${top}\\ \\to\\ ${mode}`, right: mode, reached: top
            }
        }
        case 'mean-distinct': {
            const values = shuffle(random, [2, 3, 4, 5, 6, 7, 8]).slice(0, 3)
            const data = shuffle(random, [...values, pick(random, values), pick(random, values)])
            const total = sum(data)
            if (!exact(total / data.length) || !exact(total / values.length)) return null
            return {
                problem: say(`Kalkulatu batez bestekoa: $${list(data)}$`, `Calcula la media: $${list(data)}$`, `احسب المتوسط: $${list(data)}$`, `Work out the mean: $${list(data)}$`),
                lines: [line(LABELS.sum, `${data.join('+')}=${total}`), line(LABELS.data, `${values.length}`), line(LABELS.mean, `${total}\\div ${values.length}=${n(total / values.length)}`)],
                wrong: 1, error, fix: `${total}\\div ${data.length}=${n(total / data.length)}`, right: total / data.length, reached: total / values.length
            }
        }
        case 'median-unsorted': {
            const size = pick(random, [5, 7])
            const data = shuffle(random, [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).slice(0, size)
            const middle = Math.floor(size / 2)
            const sorted = [...data].sort((p, q) => p - q)
            if (data[middle] === sorted[middle]) return null
            return {
                problem: say(`Aurkitu mediana: $${list(data)}$`, `Halla la mediana: $${list(data)}$`, `أوجد الوسيط: $${list(data)}$`, `Find the median: $${list(data)}$`),
                lines: [line(LABELS.values, list(data)), line(LABELS.centre, `${data[middle]}`), line(LABELS.median, `${data[middle]}`)],
                wrong: 1, error, fix: `${list(sorted)}\\ \\to\\ ${sorted[middle]}`, right: sorted[middle], reached: data[middle]
            }
        }
        case 'sector-over-100': {
            const total = pick(random, [20, 24, 30, 36, 40])
            const part = randomInt(random, 2, total / 2)
            const [right, reached] = [(part / total) * 360, (part / total) * 100]
            if (!Number.isInteger(right) || !exact(reached)) return null
            return {
                problem: say(`$${total}$ ikasletik $${part}$ txirrinduz etortzen dira. Zenbat gradu ditu haien sektoreak?`, `De $${total}$ alumnos, $${part}$ vienen en bici. ¿Cuántos grados mide su sector?`, `من $${total}$ طالبًا يأتي $${part}$ بالدراجة. كم درجة قطاعهم؟`, `Of $${total}$ students, $${part}$ come by bike. How many degrees is their sector?`),
                lines: [line(LABELS.fraction, `\\frac{${part}}{${total}}`), line(LABELS.angle, `\\frac{${part}}{${total}}\\cdot 100=${n(reached)}`), line(LABELS.sector, `${n(reached)}^{\\circ}`)],
                wrong: 1, error, fix: `\\frac{${part}}{${total}}\\cdot 360^{\\circ}=${right}^{\\circ}`, right, reached
            }
        }
        case 'percent-no-100': {
            const total = pick(random, [20, 25, 40, 50])
            const part = randomInt(random, 2, total - 2)
            const fraction = part / total
            if (!exact(fraction)) return null
            return {
                problem: say(`$${total}$ ikasletik $${part}$ autobusez etortzen dira. Zer ehuneko da?`, `De $${total}$ alumnos, $${part}$ vienen en autobús. ¿Qué porcentaje es?`, `من $${total}$ طالبًا يأتي $${part}$ بالحافلة. ما النسبة المئوية؟`, `Of $${total}$ students, $${part}$ come by bus. What percentage is that?`),
                lines: [line(LABELS.fraction, `\\frac{${part}}{${total}}`), line(LABELS.decimal, `\\frac{${part}}{${total}}=${n(fraction)}`), line(LABELS.percent, `${n(fraction)}\\,\\%`)],
                wrong: 2, error, fix: `${n(fraction)}\\cdot 100=${n(fraction * 100)}\\,\\%`, right: fraction * 100, reached: fraction
            }
        }
        case 'range-first-last': {
            const data = shuffle(random, [3, 5, 6, 8, 9, 11, 12, 14, 15]).slice(0, 6)
            const [first, last] = [data[0], data[data.length - 1]]
            const range = Math.max(...data) - Math.min(...data)
            if (last <= first || last - first === range) return null
            return {
                problem: say(`Aurkitu ibilbidea: $${list(data)}$`, `Halla el rango: $${list(data)}$`, `أوجد المدى: $${list(data)}$`, `Find the range: $${list(data)}$`),
                lines: [line(LABELS.values, `${first},\\ \\dots,\\ ${last}`), line(LABELS.range, `${last}-${first}`), line(LABELS.range, `${last - first}`)],
                wrong: 1, error, fix: `${Math.max(...data)}-${Math.min(...data)}=${range}`, right: range, reached: last - first
            }
        }
        case 'over-unfavourable': {
            const [favourable, others] = [randomInt(random, 2, 6), randomInt(random, 3, 8)]
            if (favourable === others) return null
            return {
                problem: say(`Poltsa batean $${favourable}$ bola gorri eta $${others}$ bola urdin daude. Zein da gorria ateratzeko probabilitatea?`, `En una bolsa hay $${favourable}$ bolas rojas y $${others}$ azules. ¿Qué probabilidad hay de sacar roja?`, `في كيس $${favourable}$ كرات حمراء و$${others}$ زرقاء. ما احتمال سحب كرة حمراء؟`, `A bag has $${favourable}$ red balls and $${others}$ blue ones. What is the probability of taking a red one?`),
                lines: [line(LABELS.favourable, `${favourable}`), line(LABELS.possible, `${others}`), line(LABELS.probability, `P=\\frac{${favourable}}{${others}}`)],
                wrong: 1, error, fix: `P=\\frac{${favourable}}{${favourable}+${others}}=\\frac{${favourable}}{${favourable + others}}`, right: favourable / (favourable + others), reached: favourable / others
            }
        }
        case 'opposite-same': {
            const total = pick(random, [8, 10, 12])
            const a = randomInt(random, 1, total / 2 - 1)
            return {
                problem: say(`$1$ eta $${total}$ arteko zenbakiak dituzten kartetatik bat ateratzen da. $A$: $${a}$ baino txikiagoa edo berdina. Zein da $A$-ren aurkakoaren probabilitatea?`, `Se saca una carta numerada del $1$ al $${total}$. $A$: salir $${a}$ o menos. ¿Qué probabilidad tiene el suceso contrario de $A$?`, `نسحب بطاقة مرقمة من $1$ إلى $${total}$. $A$: أن يكون العدد $${a}$ أو أقل. ما احتمال الحدث المعاكس لـ $A$؟`, `A card numbered $1$ to $${total}$ is drawn. $A$: getting $${a}$ or less. What is the probability of the opposite of $A$?`),
                lines: [line(LABELS.probability, `P(A)=\\frac{${a}}{${total}}`), line(LABELS.opposite, `P(\\overline{A})=P(A)`), line(LABELS.probability, `P(\\overline{A})=\\frac{${a}}{${total}}`)],
                wrong: 1, error, fix: `P(\\overline{A})=1-\\frac{${a}}{${total}}=\\frac{${total - a}}{${total}}`, right: (total - a) / total, reached: a / total
            }
        }
        case 'or-multiplied': {
            const [red, blue, green] = [randomInt(random, 2, 5), randomInt(random, 2, 5), randomInt(random, 2, 5)]
            const total = red + blue + green
            return {
                problem: say(`Poltsa batean $${red}$ bola gorri, $${blue}$ urdin eta $${green}$ berde daude. Zein da gorria edo urdina ateratzeko probabilitatea?`, `En una bolsa hay $${red}$ bolas rojas, $${blue}$ azules y $${green}$ verdes. ¿Qué probabilidad hay de sacar roja o azul?`, `في كيس $${red}$ كرات حمراء و$${blue}$ زرقاء و$${green}$ خضراء. ما احتمال سحب كرة حمراء أو زرقاء؟`, `A bag has $${red}$ red balls, $${blue}$ blue and $${green}$ green. What is the probability of taking red or blue?`),
                lines: [line(LABELS.probability, `\\frac{${red}}{${total}},\\ \\frac{${blue}}{${total}}`), line(LABELS.either, `\\frac{${red}}{${total}}\\cdot \\frac{${blue}}{${total}}`), line(LABELS.probability, `P=\\frac{${red * blue}}{${total * total}}`)],
                wrong: 1, error, fix: `\\frac{${red}}{${total}}+\\frac{${blue}}{${total}}=\\frac{${red + blue}}{${total}}`, right: (red + blue) / total, reached: (red * blue) / (total * total)
            }
        }
    }
}

export const createStatsDetectiveCases = (random: Random, levelIndex: number) => createWorkedCases(random, statsDetectiveLevels[levelIndex], STATS_DETECTIVE_CASES, build)
