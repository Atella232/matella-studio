import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseItem, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'
import { percentile, tablePercentile, type FrequencyRow } from '../dbh4-aplikatuak-estatistika/stats.ts'
import { say, same } from './text.ts'

/* ==========================================================================
   Estatistika eta probabilitatea · 3. DBH — diagnostic, guided practice,
   exercise bank and challenges, after Santillana 3.º ESO units 13–14 and
   Anaya 3.º ESO units 13–15 (the books fix the scope and the order; every
   number here is original). Every closed answer has an entry in
   `stats3Checks`: the calculation it comes from and its data. The worked
   explanation is written from that same entry, one step per line, so the
   tests can work every answer out again, check every step and check that
   the data are in the question. Medians and quartiles use the textbook
   rule of 4. DBH aplikatuak (`percentile`), as the borrowed box and
   percentile tools do.
   ========================================================================== */

export type StatsCheckKind =
    | 'mean' | 'table-mean' | 'median' | 'table-median' | 'mode' | 'table-mode'
    | 'range' | 'q1' | 'q3' | 'iqr' | 'variance' | 'deviation'
    | 'relative' | 'percent' | 'degrees' | 'cumulative' | 'class-mark' | 'change-percent'
    | 'laplace' | 'complement' | 'and' | 'without' | 'union' | 'expected'

export interface StatsCheck {
    kind: StatsCheckKind
    args: number[]
}

const sorted = (data: number[]) => [...data].sort((a, b) => a - b)
const sum = (data: number[]) => data.reduce((total, value) => total + value, 0)
/** (value, count) pairs written one after the other */
const rowsOf = (args: number[]): FrequencyRow[] => Array.from({ length: args.length / 2 }, (_, index) => ({ value: args[2 * index], count: args[2 * index + 1] }))
const decimal = (value: number): FractionValue => fraction(Math.round(value * 10000), 10000)
const squares = (data: number[]) => {
    const average = sum(data) / data.length
    return data.map((value) => (value - average) ** 2)
}

/** The exact answer of every kind of check */
export function statsAnswer({ kind, args }: StatsCheck): FractionValue {
    const [a, b, c, d] = args
    switch (kind) {
        case 'mean': return fraction(sum(args), args.length)
        case 'table-mean': {
            const rows = rowsOf(args)
            return fraction(sum(rows.map((row) => row.value * row.count)), sum(rows.map((row) => row.count)))
        }
        case 'median': return decimal(percentile(args, 50))
        case 'table-median': return decimal(tablePercentile(rowsOf(args), 50))
        case 'mode': {
            const counts = new Map<number, number>()
            for (const value of args) counts.set(value, (counts.get(value) ?? 0) + 1)
            return fraction([...counts].sort((p, q) => q[1] - p[1])[0][0])
        }
        case 'table-mode': return fraction(rowsOf(args).sort((p, q) => q.count - p.count)[0].value)
        case 'range': return fraction(Math.max(...args) - Math.min(...args))
        case 'q1': return decimal(percentile(args, 25))
        case 'q3': return decimal(percentile(args, 75))
        case 'iqr': return decimal(percentile(args, 75) - percentile(args, 25))
        case 'variance': return decimal(sum(squares(args)) / args.length)
        case 'deviation': return decimal(Math.sqrt(sum(squares(args)) / args.length))
        case 'relative': return fraction(a, b)
        case 'percent': return fraction(100 * a, b)
        case 'degrees': return fraction(360 * a, b)
        case 'cumulative': return fraction(sum(args.slice(1, a + 1)))
        case 'class-mark': return decimal((a + b) / 2)
        case 'change-percent': return fraction(100 * (b - a), a)
        case 'laplace': return fraction(a, b)
        case 'complement': return fraction(b - a, b)
        case 'and': return fraction(a * c, b * d)
        case 'without': return fraction(a * (a - 1), b * (b - 1))
        case 'union': return fraction(a + b - c, d)
        case 'expected': return fraction(a * c, b)
    }
}

/* ---------- How numbers are written ---------- */

/** A number in LaTeX: decimal comma */
const num = (value: number) => String(Math.round(value * 10000) / 10000).replace('.', '{,}')
const par = (value: number) => (value < 0 ? `(${num(value)})` : num(value))
const list = (data: number[]) => data.map(num).join(',\\ ')
const added = (data: number[]) => data.map((value, index) => (index > 0 && value >= 0 ? `+${num(value)}` : num(value))).join('')
const show = (value: FractionValue) => (value.denominator === 1 ? num(value.numerator) : `\\frac{${value.numerator}}{${value.denominator}}`)
/** A fraction, then its simplified form when there is one */
const frac = (top: number, bottom: number) => {
    const simple = fraction(top, bottom)
    return simple.numerator === top && simple.denominator === bottom ? `\\frac{${top}}{${bottom}}` : `\\frac{${top}}{${bottom}}=${show(simple)}`
}
const decimalOf = (top: number, bottom: number) => num(top / bottom)

/** The data sorted, then the position rule of the quartile */
function quartileWork(data: number[], quarter: 1 | 3): string {
    const order = sorted(data)
    const position = (quarter * order.length) / 4
    const value = percentile(data, quarter * 25)
    const name = `Q_{${quarter}}`
    const where = quarter === 1 ? `\\frac{${order.length}}{4}=${num(position)}` : `\\frac{3\\cdot ${order.length}}{4}=${num(position)}`
    const pick = Number.isInteger(position) ? `${name}=\\frac{${num(order[position - 1])}+${num(order[position])}}{2}=${num(value)}` : `${name}=${num(value)}`
    return `${list(order)}\\ \\to\\ ${where}\\ \\to\\ ${pick}`
}

function varianceWork(data: number[]): string {
    const average = sum(data) / data.length
    return `\\bar{x}=\\frac{${sum(data)}}{${data.length}}=${num(average)}\\ \\to\\ \\sigma^{2}=\\frac{${squares(data).map(num).join('+')}}{${data.length}}=${num(sum(squares(data)) / data.length)}`
}

function workLine({ kind, args }: StatsCheck): string {
    const [a, b, c, d] = args
    switch (kind) {
        case 'mean': return `\\frac{${added(args)}}{${args.length}}=\\frac{${sum(args)}}{${args.length}}=${num(sum(args) / args.length)}`
        case 'table-mean': {
            const rows = rowsOf(args)
            const total = sum(rows.map((row) => row.count))
            const products = sum(rows.map((row) => row.value * row.count))
            return `\\frac{${rows.map((row) => `${num(row.value)}\\cdot ${row.count}`).join('+')}}{${total}}\\ \\to\\ \\frac{${products}}{${total}}=${decimalOf(products, total)}`
        }
        case 'median': {
            const order = sorted(args)
            const middle = order.length / 2
            return Number.isInteger(middle)
                ? `${list(order)}\\ \\to\\ Me=\\frac{${num(order[middle - 1])}+${num(order[middle])}}{2}=${num(percentile(args, 50))}`
                : `${list(order)}\\ \\to\\ Me=${num(order[Math.floor(middle)])}`
        }
        case 'table-median': {
            const rows = rowsOf(args)
            let running = 0
            const cumulative = rows.map((row) => (running += row.count))
            return `\\frac{N}{2}=\\frac{${running}}{2}=${num(running / 2)}\\ \\to\\ F_{i}=${cumulative.join(',\\ ')}\\ \\to\\ Me=${num(tablePercentile(rows, 50))}`
        }
        case 'mode': return `${list(sorted(args))}\\ \\to\\ Mo=${show(statsAnswer({ kind, args }))}`
        case 'table-mode': return `f_{max}=${Math.max(...rowsOf(args).map((row) => row.count))}\\ \\to\\ Mo=${show(statsAnswer({ kind, args }))}`
        case 'range': return `${num(Math.max(...args))}-${par(Math.min(...args))}=${num(Math.max(...args) - Math.min(...args))}`
        case 'q1': return quartileWork(args, 1)
        case 'q3': return quartileWork(args, 3)
        case 'iqr': return `${quartileWork(args, 1)}\\ \\to\\ ${quartileWork(args, 3).split('\\ \\to\\ ').slice(1).join('\\ \\to\\ ')}\\ \\to\\ ${num(percentile(args, 75))}-${num(percentile(args, 25))}=${num(percentile(args, 75) - percentile(args, 25))}`
        case 'variance': return varianceWork(args)
        case 'deviation': return `${varianceWork(args)}\\ \\to\\ \\sigma=\\sqrt{${num(sum(squares(args)) / args.length)}}=${num(Math.sqrt(sum(squares(args)) / args.length))}`
        case 'relative': return `h=\\frac{${a}}{${b}}=${decimalOf(a, b)}`
        case 'percent': return `\\frac{${a}}{${b}}\\cdot 100=${decimalOf(100 * a, b)}`
        case 'degrees': return `\\frac{${a}}{${b}}\\cdot 360=${decimalOf(360 * a, b)}`
        case 'cumulative': return `F_{${a}}=${args.slice(1, a + 1).join('+')}=${sum(args.slice(1, a + 1))}`
        case 'class-mark': return `\\frac{${num(a)}+${num(b)}}{2}=${num((a + b) / 2)}`
        case 'change-percent': return `\\frac{${num(b)}-${num(a)}}{${num(a)}}\\cdot 100=${decimalOf(100 * (b - a), a)}`
        case 'laplace': return `P=${frac(a, b)}`
        case 'complement': return `1-\\frac{${a}}{${b}}=${frac(b - a, b)}`
        case 'and': return `\\frac{${a}}{${b}}\\cdot\\frac{${c}}{${d}}=${frac(a * c, b * d)}`
        case 'without': return `\\frac{${a}}{${b}}\\cdot\\frac{${a - 1}}{${b - 1}}=${frac(a * (a - 1), b * (b - 1))}`
        case 'union': return `\\frac{${a}+${b}-${c}}{${d}}=${frac(a + b - c, d)}`
        case 'expected': return `\\frac{${a}}{${b}}\\cdot ${c}=${decimalOf(a * c, b)}`
    }
}

/** The worked explanation of every kind of check, in LaTeX, one step per line so that it fits a phone */
export function statsWork(check: StatsCheck): string {
    const steps = workLine(check).split(/\\ \\to\\ /)
    return steps.length === 1 ? steps[0] : `\\begin{gathered}${steps.join('\\\\ ')}\\end{gathered}`
}

const check = (kind: StatsCheckKind, ...args: number[]): StatsCheck => ({ kind, args })

/* ---------- The questions, one builder per kind ---------- */

type Context = 'marks' | 'goals' | 'minutes' | 'books' | 'temperatures' | 'siblings' | 'shoes' | 'pets'

const CONTEXTS: Record<Context, LocalizedText> = {
    marks: say('Azterketa bateko notak', 'Notas de un examen', 'درجات اختبار', 'Marks in a test'),
    goals: say('Partida bakoitzeko golak', 'Goles por partido', 'الأهداف في كل مباراة', 'Goals per match'),
    minutes: say('Eskolara iristeko minutuak', 'Minutos para llegar al colegio', 'دقائق الوصول إلى المدرسة', 'Minutes to get to school'),
    books: say('Hilabete batean irakurritako liburuak', 'Libros leídos en un mes', 'الكتب المقروءة في شهر', 'Books read in a month'),
    temperatures: say('Goizeko tenperaturak (°C)', 'Temperaturas de la mañana (°C)', 'درجات الحرارة صباحًا (°C)', 'Morning temperatures (°C)'),
    siblings: say('Anai-arreba kopurua', 'Número de hermanos', 'عدد الإخوة', 'Number of siblings'),
    shoes: say('Oinetakoen neurriak', 'Tallas de zapato', 'مقاسات الأحذية', 'Shoe sizes'),
    pets: say('Etxeko animalia kopurua', 'Número de mascotas', 'عدد الحيوانات الأليفة', 'Number of pets')
}

const WHAT: Partial<Record<StatsCheckKind, LocalizedText>> = {
    mean: say('batez bestekoa', 'la media', 'المتوسط', 'the mean'),
    'table-mean': say('batez bestekoa', 'la media', 'المتوسط', 'the mean'),
    median: say('mediana', 'la mediana', 'الوسيط', 'the median'),
    'table-median': say('mediana', 'la mediana', 'الوسيط', 'the median'),
    mode: say('moda', 'la moda', 'المنوال', 'the mode'),
    'table-mode': say('moda', 'la moda', 'المنوال', 'the mode'),
    range: say('ibiltartea', 'el recorrido', 'المدى', 'the range'),
    q1: say('lehen kuartila, $Q_{1}$', 'el primer cuartil, $Q_{1}$', 'الربيعي الأول $Q_{1}$', 'the first quartile, $Q_{1}$'),
    q3: say('hirugarren kuartila, $Q_{3}$', 'el tercer cuartil, $Q_{3}$', 'الربيعي الثالث $Q_{3}$', 'the third quartile, $Q_{3}$'),
    iqr: say('kuartil arteko ibiltartea', 'el rango intercuartílico', 'المدى الربيعي', 'the interquartile range'),
    variance: say('bariantza', 'la varianza', 'التباين', 'the variance'),
    deviation: say('desbideratze tipikoa', 'la desviación típica', 'الانحراف المعياري', 'the standard deviation')
}

const listAsk = (kind: StatsCheckKind, context: Context, data: number[]) => {
    const what = WHAT[kind]!
    const values = `$${list(data)}$`
    const ctx = CONTEXTS[context]
    return say(`${ctx.eu}: ${values}. Zein da ${what.eu}?`, `${ctx.es}: ${values}. ¿Cuál es ${what.es}?`, `${ctx.ar}: ${values}. ما ${what.ar}؟`, `${ctx.en}: ${values}. What is ${what.en}?`)
}

const tableAsk = (kind: StatsCheckKind, context: Context, ...pairs: number[]) => {
    const what = WHAT[kind]!
    const rows = rowsOf(pairs)
    const table = `$x_{i}=${rows.map((row) => num(row.value)).join(',')}$`
    const counts = `$f_{i}=${rows.map((row) => row.count).join(',')}$`
    const ctx = CONTEXTS[context]
    return say(`${ctx.eu}, taulan: ${table} eta ${counts}. Zein da ${what.eu}?`, `${ctx.es}, en una tabla: ${table} y ${counts}. ¿Cuál es ${what.es}?`, `${ctx.ar} في جدول: ${table} و${counts}. ما ${what.ar}؟`, `${ctx.en}, in a table: ${table} and ${counts}. What is ${what.en}?`)
}

type Sport = 'football' | 'basketball' | 'swimming' | 'cycling'
const SPORTS: Record<Sport, LocalizedText> = {
    football: say('futbola', 'el fútbol', 'كرة القدم', 'football'),
    basketball: say('saskibaloia', 'el baloncesto', 'كرة السلة', 'basketball'),
    swimming: say('igeriketa', 'la natación', 'السباحة', 'swimming'),
    cycling: say('txirrindularitza', 'el ciclismo', 'ركوب الدراجات', 'cycling')
}

const surveyAsk = (kind: 'relative' | 'percent' | 'degrees', sport: Sport, count: number, total: number) => {
    const what = {
        relative: say('maiztasun erlatiboa', 'la frecuencia relativa', 'التكرار النسبي', 'the relative frequency'),
        percent: say('ehunekoa', 'el porcentaje', 'النسبة المئوية', 'the percentage'),
        degrees: say('haren sektorearen angelua (gradutan)', 'el ángulo de su sector (en grados)', 'زاوية قطاعها (بالدرجات)', 'the angle of its sector (in degrees)')
    }[kind]
    const s = SPORTS[sport]
    return say(
        `Inkesta batean ${total} ikaslek erantzun dute, eta horietako ${count} ikaslek ${s.eu} aukeratu dute. Zein da ${what.eu}?`,
        `En una encuesta responden ${total} alumnos, y ${count} de ellos eligen ${s.es}. ¿Cuál es ${what.es}?`,
        `في استبيان أجاب ${total} طالبًا، واختار ${count} منهم ${s.ar}. ما ${what.ar}؟`,
        `In a survey ${total} pupils answer, and ${count} of them choose ${s.en}. What is ${what.en}?`
    )
}

const cumulativeAsk = (position: number, ...counts: number[]) => say(
    `Maiztasun absolutuak: $f_{i}=${counts.join(',')}$. Zein da $F_{${position}}$ maiztasun metatua?`,
    `Frecuencias absolutas: $f_{i}=${counts.join(',')}$. ¿Cuál es la frecuencia acumulada $F_{${position}}$?`,
    `التكرارات المطلقة: $f_{i}=${counts.join(',')}$. ما التكرار المتجمّع $F_{${position}}$؟`,
    `Absolute frequencies: $f_{i}=${counts.join(',')}$. What is the cumulative frequency $F_{${position}}$?`
)
const markAsk = (low: number, high: number) => say(`Zein da $[${num(low)};\\ ${num(high)})$ tartearen klase-marka?`, `¿Cuál es la marca de clase del intervalo $[${num(low)};\\ ${num(high)})$?`, `ما مركز الفئة $[${num(low)};\\ ${num(high)})$؟`, `What is the class midpoint of the interval $[${num(low)};\\ ${num(high)})$?`)
const changeAsk = (before: number, after: number) => say(
    `Grafiko batean, salmentak ${before} izatetik ${after} izatera pasatu dira. Zenbatekoa da aldaketa ehunekotan (zeinuarekin)?`,
    `En un gráfico, las ventas pasan de ${before} a ${after}. ¿Cuál es la variación en porcentaje (con signo)?`,
    `في مخطط تنتقل المبيعات من ${before} إلى ${after}. ما التغيّر بالنسبة المئوية (مع الإشارة)؟`,
    `On a chart, sales go from ${before} to ${after}. What is the change as a percentage (with its sign)?`
)
const bagAsk = (red: number, blue: number, green: number, not: boolean) => {
    const total = red + blue + green
    return say(
        `Poltsa batean ${total} bola daude: ${red} gorri, ${blue} urdin eta ${green} berde. Zein da bola ${not ? 'ez-gorri' : 'gorri'} bat ateratzeko probabilitatea?`,
        `En una bolsa hay ${total} bolas: ${red} rojas, ${blue} azules y ${green} verdes. ¿Cuál es la probabilidad de sacar una bola ${not ? 'que no sea roja' : 'roja'}?`,
        `في كيس ${total} كرة: ${red} حمراء و${blue} زرقاء و${green} خضراء. ما احتمال سحب كرة ${not ? 'ليست حمراء' : 'حمراء'}؟`,
        `A bag holds ${total} balls: ${red} red, ${blue} blue and ${green} green. What is the probability of drawing a ${not ? 'ball that is not red' : 'red ball'}?`
    )
}

type DieEvent = 'even' | 'above4' | 'prime' | 'five-six' | 'below3'
const DIE_EVENTS: Record<DieEvent, LocalizedText> = {
    even: say('zenbaki bikoiti bat', 'un número par', 'عدد زوجي', 'an even number'),
    above4: say('4 baino handiago bat', 'un número mayor que 4', 'عدد أكبر من 4', 'a number greater than 4'),
    prime: say('zenbaki lehen bat', 'un número primo', 'عدد أولي', 'a prime number'),
    'five-six': say('5 edo 6', 'un 5 o un 6', '5 أو 6', 'a 5 or a 6'),
    below3: say('3 baino txikiago bat', 'un número menor que 3', 'عدد أصغر من 3', 'a number less than 3')
}
const DIE = '$E=\\{1,2,3,4,5,6\\}$'
const dieAsk = (event: DieEvent) => say(`Dado bat jaurtitzen da, ${DIE}. Zein da ${DIE_EVENTS[event].eu} ateratzeko probabilitatea?`, `Se lanza un dado, ${DIE}. ¿Cuál es la probabilidad de sacar ${DIE_EVENTS[event].es}?`, `يُرمى نرد، ${DIE}. ما احتمال ظهور ${DIE_EVENTS[event].ar}؟`, `A die is rolled, ${DIE}. What is the probability of getting ${DIE_EVENTS[event].en}?`)
const expectedAsk = (event: DieEvent, rolls: number) => say(`Dado bat, ${DIE}, ${rolls} aldiz jaurtitzen da. Gutxi gorabehera zenbat aldiz aterako da ${DIE_EVENTS[event].eu}?`, `Se lanza un dado, ${DIE}, ${rolls} veces. ¿Cuántas veces saldrá ${DIE_EVENTS[event].es}, aproximadamente?`, `يُرمى نرد ${DIE} ${rolls} مرة. كم مرة تقريبًا سيظهر ${DIE_EVENTS[event].ar}؟`, `A die, ${DIE}, is rolled ${rolls} times. About how many times will ${DIE_EVENTS[event].en} come up?`)
const shootersAsk = (a: number, b: number, c: number, d: number) => say(
    `Bi jaurtitzaile: lehenak $\\frac{${a}}{${b}}$ probabilitatearekin saskiratzen du eta bigarrenak $\\frac{${c}}{${d}}$ probabilitatearekin, elkarren menpe egon gabe. Zein da biek saskiratzeko probabilitatea?`,
    `Dos jugadores: el primero encesta con probabilidad $\\frac{${a}}{${b}}$ y el segundo con $\\frac{${c}}{${d}}$, de forma independiente. ¿Cuál es la probabilidad de que encesten los dos?`,
    `لاعبان: الأول يسجّل باحتمال $\\frac{${a}}{${b}}$ والثاني باحتمال $\\frac{${c}}{${d}}$ باستقلال. ما احتمال أن يسجّل كلاهما؟`,
    `Two players: the first scores with probability $\\frac{${a}}{${b}}$ and the second with $\\frac{${c}}{${d}}$, independently. What is the probability that both score?`
)
const drawTwoAsk = (red: number, total: number, back: boolean) => say(
    `Poltsa batean ${total} bola daude, eta horietako ${red} gorriak dira. Bi bola atera dira, ${back ? 'lehena itzulita' : 'itzuli gabe'}. Zein da biak gorriak izateko probabilitatea?`,
    `En una bolsa hay ${total} bolas, y ${red} de ellas son rojas. Se sacan dos, ${back ? 'devolviendo la primera' : 'sin devolver'}. ¿Cuál es la probabilidad de que las dos sean rojas?`,
    `في كيس ${total} كرات منها ${red} حمراء. تُسحب كرتان ${back ? 'مع إرجاع الأولى' : 'دون إرجاع'}. ما احتمال أن تكونا حمراوين؟`,
    `A bag holds ${total} balls, and ${red} of them are red. Two are drawn, ${back ? 'putting the first one back' : 'without putting back'}. What is the probability that both are red?`
)
const languagesAsk = (english: number, french: number, both: number, total: number) => say(
    `Gela batean ${total} ikasle daude. Ingelesa: ${english} ikasle; frantsesa: ${french} ikasle; biak: ${both} ikasle. Ikasle bat ausaz aukeratzen da. Zein da ingelesa edo frantsesa ikasteko probabilitatea?`,
    `En una clase hay ${total} alumnos. Inglés: ${english}; francés: ${french}; los dos: ${both}. Se elige uno al azar. ¿Cuál es la probabilidad de que estudie inglés o francés?`,
    `في صف ${total} طالبًا. الإنجليزية: ${english}؛ الفرنسية: ${french}؛ كلتاهما: ${both}. يُختار طالب عشوائيًا. ما احتمال أن يدرس الإنجليزية أو الفرنسية؟`,
    `A class has ${total} pupils. English: ${english}; French: ${french}; both: ${both}. One is chosen at random. What is the probability that they study English or French?`
)

/* ---------- Hints, one per kind ---------- */

const hints: Record<StatsCheckKind, LocalizedText> = {
    mean: say('Batu datu guztiak eta zatitu datu kopuruaz.', 'Suma todos los datos y divide entre cuántos hay.', 'اجمع كل البيانات واقسم على عددها.', 'Add all the data and divide by how many there are.'),
    'table-mean': same('$\\bar{x}=\\frac{\\Sigma x_{i}f_{i}}{N}$'),
    median: say('Lehenik ordenatu.', 'Primero ordena.', 'رتّب أولًا.', 'Sort first.'),
    'table-median': say('Kalkulatu $\\frac{N}{2}$ eta bilatu maiztasun metatuetan.', 'Calcula $\\frac{N}{2}$ y búscalo en las acumuladas.', 'احسب $\\frac{N}{2}$ وابحث عنه في المتجمّعة.', 'Work out $\\frac{N}{2}$ and find it in the cumulative frequencies.'),
    mode: say('Gehien errepikatzen den balioa.', 'El valor que más se repite.', 'القيمة الأكثر تكرارًا.', 'The value that repeats most.'),
    'table-mode': say('Maiztasun handiena duen balioa, ez maiztasuna.', 'El valor con mayor frecuencia, no la frecuencia.', 'القيمة ذات أكبر تكرار لا التكرار.', 'The value with the highest frequency, not the frequency.'),
    range: say('Handiena ken txikiena.', 'El mayor menos el menor.', 'الأكبر ناقص الأصغر.', 'Largest minus smallest.'),
    q1: say('Ordenatu eta kalkulatu $\\frac{N}{4}$.', 'Ordena y calcula $\\frac{N}{4}$.', 'رتّب واحسب $\\frac{N}{4}$.', 'Sort and work out $\\frac{N}{4}$.'),
    q3: say('Ordenatu eta kalkulatu $\\frac{3N}{4}$.', 'Ordena y calcula $\\frac{3N}{4}$.', 'رتّب واحسب $\\frac{3N}{4}$.', 'Sort and work out $\\frac{3N}{4}$.'),
    iqr: same('$Q_{3}-Q_{1}$'),
    variance: same('$\\sigma^{2}=\\frac{\\Sigma(x_{i}-\\bar{x})^{2}}{N}$'),
    deviation: say('Lehenik bariantza; gero erro karratua.', 'Primero la varianza; después la raíz cuadrada.', 'أولًا التباين؛ ثم الجذر التربيعي.', 'First the variance; then the square root.'),
    relative: same('$h=\\frac{f}{N}$'),
    percent: same('$\\frac{f}{N}\\cdot 100$'),
    degrees: same('$\\frac{f}{N}\\cdot 360$'),
    cumulative: say('Batu maiztasun horretaraino.', 'Suma las frecuencias hasta esa.', 'اجمع التكرارات حتى ذلك الموضع.', 'Add the frequencies up to that one.'),
    'class-mark': same('$\\frac{a+b}{2}$'),
    'change-percent': say('Aldaketa zati hasierakoa, bider 100.', 'La variación entre lo inicial, por 100.', 'التغيّر على القيمة الابتدائية في 100.', 'The change over the starting value, times 100.'),
    laplace: say('Aldeko kasuak zati kasu posibleak.', 'Casos favorables entre casos posibles.', 'الحالات المواتية على الحالات الممكنة.', 'Favourable cases over possible cases.'),
    complement: same('$P(\\bar{A})=1-P(A)$'),
    and: say('Bide batean, biderkatu.', 'En un camino, multiplica.', 'في المسار، اضرب.', 'Along a path, multiply.'),
    without: say('Itzuli gabe: bigarrenean bola bat gutxiago.', 'Sin devolver: la segunda vez hay una bola menos.', 'دون إرجاع: في المرة الثانية كرة أقل.', 'Without putting back: one ball fewer the second time.'),
    union: say('Biak dituztenak behin bakarrik zenbatu.', 'Cuenta una sola vez a los que tienen los dos.', 'عُدّ من لديهم الاثنين مرة واحدة.', 'Count those with both only once.'),
    expected: say('Probabilitatea bider jaurtiketa kopurua.', 'Probabilidad por número de lanzamientos.', 'الاحتمال في عدد الرميات.', 'Probability times the number of rolls.')
}

/* ---------- The data ---------- */

interface Entry {
    check: StatsCheck
    prompt: LocalizedText
}

const entry = (prompt: LocalizedText, kind: StatsCheckKind, ...args: number[]): Entry => ({ prompt, check: check(kind, ...args) })
const fromList = (kind: StatsCheckKind, context: Context, ...data: number[]) => entry(listAsk(kind, context, data), kind, ...data)
const fromTable = (kind: StatsCheckKind, context: Context, ...pairs: number[]) => entry(tableAsk(kind, context, ...pairs), kind, ...pairs)
const fromSurvey = (kind: 'relative' | 'percent' | 'degrees', sport: Sport, count: number, total: number) => entry(surveyAsk(kind, sport, count, total), kind, count, total)
const fromBag = (red: number, blue: number, green: number, not: boolean) => entry(bagAsk(red, blue, green, not), not ? 'complement' : 'laplace', red, red + blue + green)
const DIE_FAVOURABLE: Record<DieEvent, number> = { even: 3, above4: 2, prime: 3, 'five-six': 2, below3: 2 }
const fromDie = (event: DieEvent) => entry(dieAsk(event), 'laplace', DIE_FAVOURABLE[event], 6)

const practiceEntries: Record<number, [string, Entry]> = {
    1: ['data', fromSurvey('relative', 'football', 9, 20)],
    2: ['data', fromSurvey('percent', 'basketball', 14, 40)],
    3: ['data', entry(cumulativeAsk(3, 4, 7, 9, 5), 'cumulative', 3, 4, 7, 9, 5)],
    4: ['data', entry(markAsk(150, 160), 'class-mark', 150, 160)],
    5: ['charts', fromSurvey('degrees', 'swimming', 14, 40)],
    6: ['charts', fromSurvey('degrees', 'cycling', 15, 60)],
    7: ['charts', fromSurvey('percent', 'football', 18, 24)],
    8: ['charts', entry(changeAsk(80, 100), 'change-percent', 80, 100)],
    9: ['centre', fromList('mean', 'marks', 6, 8, 5, 9, 7)],
    10: ['centre', fromTable('table-mean', 'siblings', 1, 4, 2, 5, 3, 1)],
    11: ['centre', fromList('median', 'minutes', 7, 2, 9, 4, 6, 3)],
    12: ['centre', fromTable('table-mode', 'shoes', 36, 4, 37, 9, 38, 6, 39, 1)],
    13: ['spread', fromList('range', 'goals', 12, 5, 18, 9, 7)],
    14: ['spread', fromList('q1', 'minutes', 3, 5, 6, 8, 9, 11, 12, 15)],
    15: ['spread', fromList('variance', 'marks', 3, 5, 7, 9, 11)],
    16: ['spread', fromList('deviation', 'books', 2, 4, 4, 4, 5, 5, 7, 9)],
    17: ['chance', fromBag(5, 4, 3, false)],
    18: ['chance', fromBag(4, 5, 1, true)],
    19: ['chance', fromDie('prime')],
    20: ['chance', entry(drawTwoAsk(4, 10, false), 'without', 4, 10)]
}

const challengeEntries: Record<number, [string, number, ChallengeItem['context'], Entry]> = {
    101: ['data', 10, 'starter', fromSurvey('relative', 'cycling', 12, 48)],
    102: ['data', 20, 'advanced', entry(cumulativeAsk(4, 3, 6, 8, 5, 2), 'cumulative', 4, 3, 6, 8, 5, 2)],
    103: ['data', 30, 'master', entry(markAsk(12.5, 17.5), 'class-mark', 12.5, 17.5)],
    104: ['charts', 10, 'starter', fromSurvey('degrees', 'basketball', 9, 24)],
    105: ['charts', 20, 'advanced', fromSurvey('percent', 'swimming', 27, 60)],
    106: ['charts', 30, 'master', entry(changeAsk(250, 200), 'change-percent', 250, 200)],
    107: ['centre', 10, 'starter', fromList('mean', 'temperatures', -3, 1, 4, -2, 5)],
    108: ['centre', 20, 'advanced', fromTable('table-mean', 'pets', 0, 3, 1, 8, 2, 6, 3, 3)],
    109: ['centre', 30, 'master', fromTable('table-median', 'siblings', 1, 3, 2, 7, 3, 6, 4, 4)],
    110: ['spread', 10, 'starter', fromList('iqr', 'goals', 4, 6, 7, 9, 10, 12, 15, 18)],
    111: ['spread', 20, 'advanced', fromList('q3', 'minutes', 2, 3, 5, 7, 8, 10, 11)],
    112: ['spread', 30, 'master', fromList('deviation', 'marks', 5, 5, 5, 9, 9, 9)],
    113: ['chance', 10, 'starter', fromDie('above4')],
    114: ['chance', 20, 'advanced', entry(languagesAsk(12, 8, 5, 30), 'union', 12, 8, 5, 30)],
    115: ['chance', 30, 'master', entry(shootersAsk(3, 4, 2, 3), 'and', 3, 4, 2, 3)]
}

type BankEntry = [ExerciseItem['difficulty'], Entry]

const bankSections: [string, LocalizedText, BankEntry[]][] = [
    ['data', say('Datuak eta taulak', 'Datos y tablas', 'البيانات والجداول', 'Data and tables'), [
        ['easy', fromSurvey('relative', 'football', 6, 20)],
        ['easy', fromSurvey('percent', 'swimming', 8, 25)],
        ['easy', entry(markAsk(20, 30), 'class-mark', 20, 30)],
        ['easy', entry(cumulativeAsk(2, 5, 9, 4, 2), 'cumulative', 2, 5, 9, 4, 2)],
        ['medium', fromSurvey('relative', 'basketball', 7, 28)],
        ['medium', fromSurvey('percent', 'cycling', 33, 60)],
        ['medium', entry(cumulativeAsk(4, 2, 6, 10, 7, 5), 'cumulative', 4, 2, 6, 10, 7, 5)],
        ['medium', entry(markAsk(1.5, 2.5), 'class-mark', 1.5, 2.5)],
        ['hard', fromSurvey('percent', 'football', 21, 35)],
        ['hard', fromSurvey('relative', 'swimming', 45, 72)]
    ]],
    ['charts', say('Grafikoak', 'Gráficos', 'المخططات', 'Charts'), [
        ['easy', fromSurvey('degrees', 'football', 10, 40)],
        ['easy', fromSurvey('degrees', 'basketball', 5, 30)],
        ['easy', fromSurvey('percent', 'cycling', 12, 48)],
        ['easy', entry(changeAsk(50, 60), 'change-percent', 50, 60)],
        ['medium', fromSurvey('degrees', 'swimming', 7, 20)],
        ['medium', entry(changeAsk(120, 90), 'change-percent', 120, 90)],
        ['medium', fromSurvey('degrees', 'cycling', 11, 36)],
        ['medium', fromSurvey('percent', 'basketball', 27, 45)],
        ['hard', entry(changeAsk(400, 350), 'change-percent', 400, 350)],
        ['hard', fromSurvey('degrees', 'football', 13, 72)]
    ]],
    ['centre', say('Zentralizazio-neurriak', 'Medidas de centralización', 'مقاييس النزعة المركزية', 'Measures of centre'), [
        ['easy', fromList('mean', 'marks', 4, 7, 5, 8, 6)],
        ['easy', fromList('median', 'goals', 3, 8, 1, 6, 9)],
        ['easy', fromList('mode', 'pets', 2, 5, 3, 5, 4, 5, 2)],
        ['easy', fromList('mean', 'minutes', 12, 15, 18, 11)],
        ['medium', fromTable('table-mean', 'books', 0, 2, 1, 5, 2, 8, 3, 5)],
        ['medium', fromList('median', 'minutes', 10, 4, 7, 13, 9, 6)],
        ['medium', fromTable('table-mode', 'siblings', 1, 6, 2, 11, 3, 8, 4, 5)],
        ['medium', fromList('mean', 'temperatures', -4, 2, -1, 3, 0)],
        ['hard', fromTable('table-median', 'pets', 0, 5, 1, 6, 2, 7, 3, 2)],
        ['hard', fromTable('table-mean', 'marks', 5, 2, 6, 4, 7, 8, 8, 6)]
    ]],
    ['spread', say('Posizioa eta sakabanaketa', 'Posición y dispersión', 'الموقع والتشتت', 'Position and spread'), [
        ['easy', fromList('range', 'goals', 7, 15, 3, 12, 9)],
        ['easy', fromList('range', 'temperatures', -2, 5, 8, -6, 1)],
        ['easy', fromList('q1', 'marks', 1, 2, 4, 5, 7, 8, 9, 12)],
        ['easy', fromList('q3', 'marks', 1, 2, 4, 5, 7, 8, 9, 12)],
        ['medium', fromList('variance', 'books', 4, 6, 8, 10, 12)],
        ['medium', fromList('deviation', 'goals', 4, 4, 10, 10)],
        ['medium', fromList('iqr', 'minutes', 2, 5, 6, 9, 11, 14, 15, 20)],
        ['medium', fromList('q1', 'books', 3, 4, 6, 8, 9, 10, 12)],
        ['hard', fromList('deviation', 'minutes', 3, 3, 11, 11)],
        ['hard', fromList('variance', 'pets', 1, 2, 3, 4, 5, 6, 7)]
    ]],
    ['chance', say('Probabilitatea', 'Probabilidad', 'الاحتمال', 'Probability'), [
        ['easy', fromDie('even')],
        ['easy', fromBag(3, 4, 1, false)],
        ['easy', fromBag(2, 5, 3, true)],
        ['easy', entry(expectedAsk('five-six', 600), 'expected', 2, 6, 600)],
        ['medium', entry(shootersAsk(2, 3, 3, 4), 'and', 2, 3, 3, 4)],
        ['medium', entry(drawTwoAsk(5, 8, false), 'without', 5, 8)],
        ['medium', entry(languagesAsk(15, 10, 4, 40), 'union', 15, 10, 4, 40)],
        ['medium', entry(drawTwoAsk(4, 10, true), 'and', 4, 10, 4, 10)],
        ['hard', entry(drawTwoAsk(4, 12, false), 'without', 4, 12)],
        ['hard', entry(expectedAsk('below3', 450), 'expected', 2, 6, 450)]
    ]]
]

/** p: practice, c: challenge, b: bank */
export const stats3Checks: Record<string, StatsCheck> = {
    ...Object.fromEntries(Object.entries(practiceEntries).map(([id, [, value]]) => [`p${id}`, value.check])),
    ...Object.fromEntries(Object.entries(challengeEntries).map(([id, [, , , value]]) => [`c${id}`, value.check])),
    ...Object.fromEntries(bankSections.flatMap(([, , items]) => items).map(([, value], index) => [`b${index + 1}`, value.check]))
}

const explain = (value: Entry) => same(`$${statsWork(value.check)}$`)

export const stats3Diagnostic: DiagnosticQuestion[] = [
    {
        id: 7601,
        prompt: say('25 ikasletatik 5 ikaslek lau anai-arreba dituzte. Zein da maiztasun erlatiboa?', 'De 25 alumnos, 5 tienen cuatro hermanos. ¿Cuál es la frecuencia relativa?', 'من بين 25 طالبًا لدى 5 منهم أربعة إخوة. ما التكرار النسبي؟', 'Of 25 pupils, 5 have four siblings. What is the relative frequency?'),
        options: [same('$5$'), same('$0{,}2$'), same('$0{,}5$')],
        correctIndex: 1,
        explanation: same('$\\frac{5}{25}=0{,}2$'),
        topic: 'frequency-table'
    },
    {
        id: 7602,
        prompt: say('Sektore-diagrama batean, zenbat gradu hartzen ditu datuen erdiak (% 50)?', 'En un diagrama de sectores, ¿cuántos grados ocupa el 50 % de los datos?', 'في مخطط دائري كم درجة يشغل 50 % من البيانات؟', 'In a pie chart, how many degrees does 50% of the data take up?'),
        options: [same('$50°$'), same('$100°$'), same('$180°$')],
        correctIndex: 2,
        explanation: same('$\\frac{1}{2}\\cdot 360=180$'),
        topic: 'pie-chart'
    },
    {
        id: 7603,
        prompt: say('Zein da $4,\\ 6,\\ 8,\\ 10$ datuen batez bestekoa?', '¿Cuál es la media de $4,\\ 6,\\ 8,\\ 10$?', 'ما متوسط $4,\\ 6,\\ 8,\\ 10$؟', 'What is the mean of $4,\\ 6,\\ 8,\\ 10$?'),
        options: [same('$7$'), same('$28$'), same('$6$')],
        correctIndex: 0,
        explanation: same('$\\frac{28}{4}=7$'),
        topic: 'mean'
    },
    {
        id: 7604,
        prompt: say('Zein da $9,\\ 1,\\ 5,\\ 3,\\ 7$ datuen mediana?', '¿Cuál es la mediana de $9,\\ 1,\\ 5,\\ 3,\\ 7$?', 'ما وسيط $9,\\ 1,\\ 5,\\ 3,\\ 7$؟', 'What is the median of $9,\\ 1,\\ 5,\\ 3,\\ 7$?'),
        options: [same('$5$'), same('$9$'), same('$3$')],
        correctIndex: 0,
        explanation: same('$1,\\ 3,\\ 5,\\ 7,\\ 9\\ \\to\\ 5$'),
        topic: 'median'
    },
    {
        id: 7605,
        prompt: say('Taula: $x_{i}=1,2,3$ eta $f_{i}=6,2,4$. Zein da moda?', 'Tabla: $x_{i}=1,2,3$ y $f_{i}=6,2,4$. ¿Cuál es la moda?', 'الجدول: $x_{i}=1,2,3$ و$f_{i}=6,2,4$. ما المنوال؟', 'Table: $x_{i}=1,2,3$ and $f_{i}=6,2,4$. What is the mode?'),
        options: [same('$6$'), same('$3$'), same('$1$')],
        correctIndex: 2,
        explanation: say('Maiztasun handiena 6 da, $x=1$ baliorena.', 'La mayor frecuencia es 6, la del valor $x=1$.', 'أكبر تكرار 6 للقيمة $x=1$.', 'The highest frequency is 6, for the value $x=1$.'),
        topic: 'mode'
    },
    {
        id: 7606,
        prompt: say('Zein da $3,\\ 11,\\ 7,\\ 2,\\ 9$ datuen ibiltartea?', '¿Cuál es el recorrido de $3,\\ 11,\\ 7,\\ 2,\\ 9$?', 'ما مدى $3,\\ 11,\\ 7,\\ 2,\\ 9$؟', 'What is the range of $3,\\ 11,\\ 7,\\ 2,\\ 9$?'),
        options: [same('$6$'), same('$9$'), same('$11$')],
        correctIndex: 1,
        explanation: same('$11-2=9$'),
        topic: 'range-quartiles'
    },
    {
        id: 7607,
        prompt: say('Dado bat jaurtitzen da. Zein da 3 baino handiago bat ateratzeko probabilitatea?', 'Se lanza un dado. ¿Cuál es la probabilidad de sacar más de 3?', 'يُرمى نرد. ما احتمال ظهور عدد أكبر من 3؟', 'A die is rolled. What is the probability of getting more than 3?'),
        options: [same('$\\frac{1}{3}$'), same('$\\frac{1}{2}$'), same('$\\frac{3}{4}$')],
        correctIndex: 1,
        explanation: same('$\\frac{3}{6}=\\frac{1}{2}$'),
        topic: 'laplace'
    },
    {
        id: 7608,
        prompt: say('Bi txanpon jaurtitzen dira. Zein da bi aurpegi ateratzeko probabilitatea?', 'Se lanzan dos monedas. ¿Cuál es la probabilidad de sacar dos caras?', 'تُرمى قطعتا نقود. ما احتمال ظهور صورتين؟', 'Two coins are tossed. What is the probability of two heads?'),
        options: [same('$\\frac{1}{2}$'), same('$\\frac{1}{3}$'), same('$\\frac{1}{4}$')],
        correctIndex: 2,
        explanation: same('$\\frac{1}{2}\\cdot\\frac{1}{2}=\\frac{1}{4}$'),
        topic: 'compound'
    }
]

export const stats3Practice: PracticeItem[] = Object.entries(practiceEntries).map(([id, [stage, value]]) => ({
    id: Number(id),
    stage,
    prompt: value.prompt,
    expected: statsAnswer(value.check),
    hint: hints[value.check.kind],
    explanation: explain(value)
}))

export const stats3Challenges: ChallengeItem[] = Object.entries(challengeEntries).map(([id, [stage, points, context, value]]) => ({
    id: Number(id),
    stage,
    points,
    context,
    prompt: value.prompt,
    expected: statsAnswer(value.check),
    hint: hints[value.check.kind],
    explanation: explain(value)
}))

let bankId = 0
export const stats3ExerciseBank: ExerciseSection[] = bankSections.map(([id, title, items]) => ({
    id,
    title,
    items: items.map(([difficulty, value]) => {
        bankId += 1
        return { id: bankId, difficulty, question: value.prompt, solution: explain(value), answer: { expected: statsAnswer(value.check) } }
    })
}))
