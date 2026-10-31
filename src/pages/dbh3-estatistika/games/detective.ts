import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Estatistikaren detektibea (3. DBH): a worked solution of three lines
   where exactly one line has a mistake, and the lines after it carry it
   on. The learner taps the wrong line and says which mistake it is, among
   three. Level 1: tables and charts (the percentage taken as degrees, the
   cumulative frequency without the earlier ones, the end of the interval
   as its midpoint, dividing by the rest instead of by N); level 2:
   centre (the mean without the frequencies, the median without sorting,
   the frequency given as the mode, one middle datum when there are two);
   level 3: spread and chance (the variance given as σ, favourable over
   unfavourable, the second draw as if the ball went back, the overlap
   counted twice). Every case carries the right number and the number
   reached.
   ========================================================================== */

export type DetectiveError =
    | 'degrees-percent'
    | 'cumulative-own'
    | 'mark-end'
    | 'relative-rest'
    | 'mean-unweighted'
    | 'median-unsorted'
    | 'mode-frequency'
    | 'median-one'
    | 'deviation-no-root'
    | 'odds'
    | 'replacement'
    | 'union-twice'

export interface DetectiveLine {
    label: LocalizedText
    latex: string
}

export interface DetectiveCase {
    problem: LocalizedText
    lines: DetectiveLine[]
    wrong: number
    error: DetectiveError
    fix: string
    options: DetectiveError[]
    right: number
    reached: number
}

export const detectiveLevels: DetectiveError[][] = [
    ['degrees-percent', 'cumulative-own', 'mark-end', 'relative-rest'],
    ['mean-unweighted', 'median-unsorted', 'mode-frequency', 'median-one'],
    ['deviation-no-root', 'odds', 'replacement', 'union-twice']
]

export const DETECTIVE_CASES = 6

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): DetectiveLine => ({ label, latex })
const LABELS = {
    rule: say('Araua', 'Regla', 'القاعدة', 'Rule'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}
const num = (value: number) => String(Math.round(value * 10000) / 10000).replace('.', '{,}')
const list = (data: number[]) => data.join(',\\ ')

export const detectiveErrorNames: Record<DetectiveError, LocalizedText> = {
    'degrees-percent': say('Ehunekoa gradu gisa hartu du', 'Tomó el porcentaje como grados', 'أخذ النسبة المئوية على أنها درجات', 'Took the percentage as degrees'),
    'cumulative-own': say('Metatuan aurreko maiztasunak ez ditu batu', 'En la acumulada no sumó las anteriores', 'لم يجمع التكرارات السابقة في المتجمّع', 'Did not add the earlier frequencies in the cumulative one'),
    'mark-end': say('Tartearen muturra hartu du klase-marka gisa', 'Tomó el extremo del intervalo como marca de clase', 'أخذ طرف الفترة مركزًا للفئة', 'Took the end of the interval as the class midpoint'),
    'relative-rest': say('Gainerako datuez zatitu du, ez $N$ zenbakiaz', 'Dividió entre el resto de datos, no entre $N$', 'قسم على باقي البيانات لا على $N$', 'Divided by the rest of the data, not by $N$'),
    'mean-unweighted': say('Batez bestekoan maiztasunak ahaztu ditu', 'En la media olvidó las frecuencias', 'نسي التكرارات في المتوسط', 'Forgot the frequencies in the mean'),
    'median-unsorted': say('Mediana kalkulatu du ordenatu gabe', 'Calculó la mediana sin ordenar', 'حسب الوسيط دون ترتيب', 'Found the median without sorting'),
    'mode-frequency': say('Maiztasuna eman du moda gisa', 'Dio la frecuencia como moda', 'أعطى التكرار على أنه المنوال', 'Gave the frequency as the mode'),
    'median-one': say('Bi erdiko daturen ordez bakarra hartu du', 'Tomó un solo dato central en vez de dos', 'أخذ بيانًا أوسط واحدًا بدل اثنين', 'Took one middle datum instead of two'),
    'deviation-no-root': say('Bariantza eman du desbideratze tipiko gisa', 'Dio la varianza como desviación típica', 'أعطى التباين على أنه الانحراف المعياري', 'Gave the variance as the standard deviation'),
    odds: say('Aldekoak zati aurkakoak egin du, ez aldekoak zati guztiak', 'Hizo favorables entre desfavorables, no entre todos', 'قسم المواتية على غير المواتية لا على الكل', 'Did favourable over unfavourable, not over all'),
    replacement: say('Itzuli gabe atera arren, bola itzuli balitz bezala kalkulatu du', 'Sin devolver, calculó como si la bola volviera', 'دون إرجاع حسب كأن الكرة أُعيدت', 'Without putting back, worked it out as if the ball went back'),
    'union-twice': say('Biak dituztenak bi aldiz zenbatu ditu', 'Contó dos veces a los que tienen las dos cosas', 'عدّ من لديهم الأمرين مرتين', 'Counted those with both twice')
}

export const detectiveErrorTips: Record<DetectiveError, LocalizedText> = {
    'degrees-percent': say('Zirkulua 360° da: $\\frac{f}{N}\\cdot 360$.', 'El círculo son 360°: $\\frac{f}{N}\\cdot 360$.', 'الدائرة 360°: $\\frac{f}{N}\\cdot 360$.', 'The circle is 360°: $\\frac{f}{N}\\cdot 360$.'),
    'cumulative-own': say('$F_{i}$: aurreko metatua gehi $f_{i}$.', '$F_{i}$: la acumulada anterior más $f_{i}$.', '$F_{i}$: المتجمّع السابق زائد $f_{i}$.', '$F_{i}$: the previous cumulative plus $f_{i}$.'),
    'mark-end': same('\\frac{a+b}{2}'),
    'relative-rest': same('h=\\frac{f}{N}'),
    'mean-unweighted': same('\\bar{x}=\\frac{\\Sigma x_{i}f_{i}}{N}'),
    'median-unsorted': say('Lehenik ordenatu, gero erdikoa.', 'Primero ordena, después el central.', 'رتّب أولًا ثم خذ الأوسط.', 'Sort first, then take the middle one.'),
    'mode-frequency': say('Moda balioa da, ez zenbat aldiz agertzen den.', 'La moda es el valor, no cuántas veces aparece.', 'المنوال هو القيمة لا عدد مرات ظهورها.', 'The mode is the value, not how many times it appears.'),
    'median-one': say('Datu kopuru bikoitiarekin, erdiko bien batez bestekoa.', 'Con un número par de datos, la media de los dos centrales.', 'مع عدد زوجي من البيانات، متوسط البيانين الأوسطين.', 'With an even number of data, the mean of the two middle ones.'),
    'deviation-no-root': same('\\sigma=\\sqrt{\\sigma^{2}}'),
    odds: say('Laplace: aldekoak zati posible guztiak.', 'Laplace: favorables entre todos los posibles.', 'لابلاس: المواتية على كل الممكنة.', 'Laplace: favourable over all the possible ones.'),
    replacement: say('Itzuli gabe, bigarrenean bola bat gutxiago dago.', 'Sin devolver, la segunda vez hay una bola menos.', 'دون إرجاع تكون في المرة الثانية كرة أقل.', 'Without putting back, there is one ball fewer the second time.'),
    'union-twice': say('Kendu biak dituztenak: $a+b-c$.', 'Resta a los que tienen las dos: $a+b-c$.', 'اطرح من لديهم الأمرين: $a+b-c$.', 'Take away those with both: $a+b-c$.')
}

function same(latex: string): LocalizedText {
    return say(`$${latex}$`, `$${latex}$`, `$${latex}$`, `$${latex}$`)
}

type Built = Omit<DetectiveCase, 'options'>
type Builder = (random: Random) => Built | null

/* ---------- Level 1: tables and charts ---------- */

function degreesPercent(random: Random): Built {
    const total = pick(random, [20, 40, 50])
    const count = randomInt(random, 3, total / 2)
    const percent = (100 * count) / total
    const degrees = (360 * count) / total
    return {
        problem: say(`${total} ikasletatik ${count} ikaslek igeriketa nahiago dute. Zenbat gradu ditu haren sektoreak?`, `De ${total} alumnos, ${count} prefieren natación. ¿Cuántos grados mide su sector?`, `من بين ${total} طالبًا يفضّل ${count} السباحة. كم درجة قطاعها؟`, `Of ${total} pupils, ${count} prefer swimming. How many degrees is its sector?`),
        lines: [line(LABELS.rule, `\\frac{${count}}{${total}}\\cdot 100=${num(percent)}`), line(LABELS.step, `${num(percent)}\\ \\%\\to ${num(percent)}°`), line(LABELS.result, `${num(percent)}°`)],
        wrong: 1, error: 'degrees-percent', fix: `\\frac{${count}}{${total}}\\cdot 360=${num(degrees)}`, right: degrees, reached: percent
    }
}

function cumulativeOwn(random: Random): Built {
    const counts = Array.from({ length: 4 }, () => randomInt(random, 2, 9))
    const position = randomInt(random, 2, 4)
    const right = counts.slice(0, position).reduce((sum, value) => sum + value, 0)
    return {
        problem: say(`Maiztasunak: $f_{i}=${counts.join(',')}$. Zein da $F_{${position}}$?`, `Frecuencias: $f_{i}=${counts.join(',')}$. ¿Cuánto vale $F_{${position}}$?`, `التكرارات: $f_{i}=${counts.join(',')}$. كم يساوي $F_{${position}}$؟`, `Frequencies: $f_{i}=${counts.join(',')}$. What is $F_{${position}}$?`),
        lines: [line(LABELS.rule, `F_{${position}}=f_{${position}}`), line(LABELS.step, `f_{${position}}=${counts[position - 1]}`), line(LABELS.result, `F_{${position}}=${counts[position - 1]}`)],
        wrong: 0, error: 'cumulative-own', fix: `F_{${position}}=${counts.slice(0, position).join('+')}=${right}`, right, reached: counts[position - 1]
    }
}

function markEnd(random: Random): Built {
    const low = pick(random, [10, 20, 40, 150, 160])
    const width = pick(random, [10, 20])
    const high = low + width
    return {
        problem: say(`Zein da $[${low};\\ ${high})$ tartearen klase-marka?`, `¿Cuál es la marca de clase de $[${low};\\ ${high})$?`, `ما مركز الفئة $[${low};\\ ${high})$؟`, `What is the class midpoint of $[${low};\\ ${high})$?`),
        lines: [line(LABELS.rule, `[${low};\\ ${high})`), line(LABELS.step, `x=${high}`), line(LABELS.result, `${high}`)],
        wrong: 1, error: 'mark-end', fix: `\\frac{${low}+${high}}{2}=${low + width / 2}`, right: low + width / 2, reached: high
    }
}

function relativeRest(random: Random): Built {
    const total = pick(random, [20, 25, 40, 50])
    const count = pick(random, [total / 5, (2 * total) / 5, total / 2].filter(Number.isInteger))
    const reached = count / (total - count)
    return {
        problem: say(`${total} daturen artean, ${count} datu «bai» dira. Zein da «bai» erantzunaren maiztasun erlatiboa?`, `De ${total} datos, ${count} son «sí». ¿Cuál es la frecuencia relativa de «sí»?`, `من بين ${total} بيانًا، ${count} منها «نعم». ما التكرار النسبي لـ«نعم»؟`, `Of ${total} data, ${count} are «yes». What is the relative frequency of «yes»?`),
        lines: [line(LABELS.rule, 'h=\\frac{f}{N-f}'), line(LABELS.step, `\\frac{${count}}{${total - count}}`), line(LABELS.result, `h=${num(reached)}`)],
        wrong: 0, error: 'relative-rest', fix: `h=\\frac{${count}}{${total}}=${num(count / total)}`, right: count / total, reached
    }
}

/* ---------- Level 2: centre ---------- */

function meanUnweighted(random: Random): Built | null {
    const counts = [randomInt(random, 1, 6), randomInt(random, 1, 6), randomInt(random, 1, 6)]
    const n = counts.reduce((sum, count) => sum + count, 0)
    const products = counts[0] * 1 + counts[1] * 2 + counts[2] * 3
    const right = products / n
    if (Math.abs(right * 100 - Math.round(right * 100)) > 1e-9) return null
    return {
        problem: say(`Taula: $x_{i}=1,2,3$ eta $f_{i}=${counts.join(',')}$. Zein da batez bestekoa?`, `Tabla: $x_{i}=1,2,3$ y $f_{i}=${counts.join(',')}$. ¿Cuál es la media?`, `الجدول: $x_{i}=1,2,3$ و$f_{i}=${counts.join(',')}$. ما المتوسط؟`, `Table: $x_{i}=1,2,3$ and $f_{i}=${counts.join(',')}$. What is the mean?`),
        lines: [line(LABELS.rule, '\\bar{x}=\\frac{\\Sigma x_{i}}{3}'), line(LABELS.step, '\\frac{1+2+3}{3}'), line(LABELS.result, '\\bar{x}=2')],
        wrong: 0, error: 'mean-unweighted', fix: `\\frac{1\\cdot ${counts[0]}+2\\cdot ${counts[1]}+3\\cdot ${counts[2]}}{${n}}=${num(right)}`, right, reached: 2
    }
}

function medianUnsorted(random: Random): Built | null {
    const data = Array.from({ length: 5 }, () => randomInt(random, 1, 15))
    const sorted = [...data].sort((a, b) => a - b)
    if (new Set(data).size < 5 || data[2] === sorted[2]) return null
    return {
        problem: say(`Zein da $${list(data)}$ datuen mediana?`, `¿Cuál es la mediana de $${list(data)}$?`, `ما وسيط $${list(data)}$؟`, `What is the median of $${list(data)}$?`),
        lines: [line(LABELS.rule, 'N=5'), line(LABELS.step, list(data)), line(LABELS.result, `Me=${data[2]}`)],
        wrong: 1, error: 'median-unsorted', fix: `${list(sorted)}\\ \\to\\ ${sorted[2]}`, right: sorted[2], reached: data[2]
    }
}

function modeFrequency(random: Random): Built | null {
    const values = [36, 37, 38, 39]
    const counts = shuffle(random, [2, 3, 5, 8])
    const top = Math.max(...counts)
    const mode = values[counts.indexOf(top)]
    return {
        problem: say(`Oinetakoen neurriak: $x_{i}=${values.join(',')}$ eta $f_{i}=${counts.join(',')}$. Zein da moda?`, `Tallas: $x_{i}=${values.join(',')}$ y $f_{i}=${counts.join(',')}$. ¿Cuál es la moda?`, `المقاسات: $x_{i}=${values.join(',')}$ و$f_{i}=${counts.join(',')}$. ما المنوال؟`, `Shoe sizes: $x_{i}=${values.join(',')}$ and $f_{i}=${counts.join(',')}$. What is the mode?`),
        lines: [line(LABELS.rule, 'f_{max}'), line(LABELS.step, `f_{max}=${top}`), line(LABELS.result, `Mo=${top}`)],
        wrong: 2, error: 'mode-frequency', fix: `f_{max}=${top}\\ \\to\\ Mo=${mode}`, right: mode, reached: top
    }
}

function medianOne(random: Random): Built | null {
    const data = Array.from({ length: 6 }, () => randomInt(random, 1, 20)).sort((a, b) => a - b)
    if (data[2] === data[3] || (data[2] + data[3]) % 2 !== 0) return null
    const right = (data[2] + data[3]) / 2
    return {
        problem: say(`Zein da $${list(data)}$ datuen mediana?`, `¿Cuál es la mediana de $${list(data)}$?`, `ما وسيط $${list(data)}$؟`, `What is the median of $${list(data)}$?`),
        lines: [line(LABELS.rule, 'N=6'), line(LABELS.step, `Me=${data[2]}`), line(LABELS.result, `${data[2]}`)],
        wrong: 1, error: 'median-one', fix: `\\frac{${data[2]}+${data[3]}}{2}=${right}`, right, reached: data[2]
    }
}

/* ---------- Level 3: spread and chance ---------- */

const SQUARE_SETS = [[4, 4, 10, 10], [3, 3, 11, 11], [5, 5, 5, 9, 9, 9], [1, 1, 7, 7], [2, 2, 12, 12]]

function deviationNoRoot(random: Random): Built {
    const data = pick(random, SQUARE_SETS)
    const mean = data.reduce((sum, value) => sum + value, 0) / data.length
    const variance = data.reduce((sum, value) => sum + (value - mean) ** 2, 0) / data.length
    return {
        problem: say(`Zein da $${list(data)}$ datuen desbideratze tipikoa?`, `¿Cuál es la desviación típica de $${list(data)}$?`, `ما الانحراف المعياري لـ$${list(data)}$؟`, `What is the standard deviation of $${list(data)}$?`),
        lines: [line(LABELS.rule, `\\bar{x}=${mean}`), line(LABELS.step, `\\sigma^{2}=${variance}`), line(LABELS.result, `\\sigma=${variance}`)],
        wrong: 2, error: 'deviation-no-root', fix: `\\sigma=\\sqrt{${variance}}=${Math.sqrt(variance)}`, right: Math.sqrt(variance), reached: variance
    }
}

function odds(random: Random): Built | null {
    const red = randomInt(random, 2, 6)
    const blue = randomInt(random, 2, 7)
    const total = red + blue
    if (red % blue === 0) return null
    return {
        problem: say(`Poltsa batean ${red} bola gorri eta ${blue} urdin daude. Gorri bat ateratzeko probabilitatea?`, `En una bolsa hay ${red} bolas rojas y ${blue} azules. ¿Probabilidad de sacar roja?`, `في كيس ${red} كرات حمراء و${blue} زرقاء. احتمال سحب حمراء؟`, `A bag has ${red} red balls and ${blue} blue ones. Probability of a red one?`),
        lines: [line(LABELS.rule, 'P=\\frac{a}{b}'), line(LABELS.step, `P=\\frac{${red}}{${blue}}`), line(LABELS.result, `P=\\frac{${red}}{${blue}}`)],
        wrong: 1, error: 'odds', fix: `P=\\frac{${red}}{${total}}`, right: red / total, reached: red / blue
    }
}

function replacement(random: Random): Built {
    const total = randomInt(random, 5, 10)
    const red = randomInt(random, 2, total - 2)
    return {
        problem: say(`Poltsa batean ${total} bola daude, eta horietako ${red} gorriak dira. Bi atera dira itzuli gabe. Biak gorriak?`, `En una bolsa hay ${total} bolas, ${red} rojas. Se sacan dos sin devolver. ¿Las dos rojas?`, `في كيس ${total} كرات منها ${red} حمراء. تُسحب كرتان دون إرجاع. كلتاهما حمراء؟`, `A bag has ${total} balls, ${red} of them red. Two are drawn without putting back. Both red?`),
        lines: [line(LABELS.rule, `P=\\frac{${red}}{${total}}\\cdot P_{2}`), line(LABELS.step, `\\frac{${red}}{${total}}\\cdot\\frac{${red}}{${total}}`), line(LABELS.result, `\\frac{${red * red}}{${total * total}}`)],
        wrong: 1, error: 'replacement', fix: `\\frac{${red}}{${total}}\\cdot\\frac{${red - 1}}{${total - 1}}=\\frac{${red * (red - 1)}}{${total * (total - 1)}}`, right: (red * (red - 1)) / (total * (total - 1)), reached: (red * red) / (total * total)
    }
}

function unionTwice(random: Random): Built {
    const total = pick(random, [20, 25, 30, 40])
    const both = randomInt(random, 2, 5)
    const english = randomInt(random, both + 3, total / 2)
    const french = randomInt(random, both + 2, total / 2 - 2)
    return {
        problem: say(`${total} ikasle: ingelesa ${english} ikasle, frantsesa ${french} ikasle, biak ${both} ikasle. Ingelesa edo frantsesa ikasteko probabilitatea?`, `${total} alumnos: inglés ${english}, francés ${french}, los dos ${both}. ¿Probabilidad de inglés o francés?`, `${total} طالبًا: الإنجليزية ${english}، الفرنسية ${french}، كلتاهما ${both}. احتمال الإنجليزية أو الفرنسية؟`, `${total} pupils: English ${english}, French ${french}, both ${both}. Probability of English or French?`),
        lines: [line(LABELS.rule, `P=\\frac{${english}}{${total}}+\\frac{${french}}{${total}}`), line(LABELS.step, `\\frac{${english + french}}{${total}}`), line(LABELS.result, `P=\\frac{${english + french}}{${total}}`)],
        wrong: 0, error: 'union-twice', fix: `\\frac{${english}+${french}-${both}}{${total}}=\\frac{${english + french - both}}{${total}}`, right: (english + french - both) / total, reached: (english + french) / total
    }
}

const builders: Record<DetectiveError, Builder> = {
    'degrees-percent': degreesPercent,
    'cumulative-own': cumulativeOwn,
    'mark-end': markEnd,
    'relative-rest': relativeRest,
    'mean-unweighted': meanUnweighted,
    'median-unsorted': medianUnsorted,
    'mode-frequency': modeFrequency,
    'median-one': medianOne,
    'deviation-no-root': deviationNoRoot,
    odds,
    replacement,
    'union-twice': unionTwice
}

export function createDetectiveCase(random: Random, levelIndex: number, error: DetectiveError): DetectiveCase {
    const pool = detectiveLevels[levelIndex] ?? detectiveLevels[0]
    for (let attempt = 0; attempt < 500; attempt += 1) {
        const made = builders[error](random)
        if (!made || Math.abs(made.right - made.reached) < 1e-9) continue
        const others = shuffle(random, pool.filter((item) => item !== error)).slice(0, 2)
        return { ...made, options: shuffle(random, [error, ...others]) }
    }
    throw new Error(`No detective case for ${error}`)
}

export function createDetectiveCases(random: Random, levelIndex: number): DetectiveCase[] {
    const pool = detectiveLevels[levelIndex] ?? detectiveLevels[0]
    const order = shuffle(random, pool)
    const errors = Array.from({ length: DETECTIVE_CASES }, (_, index) => order[index % order.length])
    return shuffle(random, errors).map((error) => createDetectiveCase(random, levelIndex, error))
}

export function detectiveStars(score: number): Stars {
    if (score >= 11) return 3
    if (score >= 9) return 2
    if (score >= 6) return 1
    return 0
}
