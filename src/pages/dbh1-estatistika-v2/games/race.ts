import { checkAnswer, fraction, toExactDecimal, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Estatistikaren lasterketa (1. DBH): five circuits — frequencies, pie
   angles, the mean, median, mode and range, and probability. Every wrong
   option is a typical mistake (the fraction upside down, the relative
   frequency instead of the percentage, the sum without dividing, the
   middle value without sorting, favourable against unfavourable…).
   ========================================================================== */

export const STATISTICS_RACE_CIRCUITS = 5

export type StatisticsRaceError =
    | 'inverted'
    | 'not-percent'
    | 'absolute'
    | 'per-datum'
    | 'percent-degrees'
    | 'no-divide'
    | 'wrong-count'
    | 'not-sorted'
    | 'mixed-parameter'
    | 'unfavourable'
    | 'complement'
    | 'calculation'

export type StatisticsRaceQuestion = RaceQuestion<StatisticsRaceError>

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const same = (latex: string): LocalizedText => ({ eu: latex, es: latex, ar: latex.replace(/\{,\}/g, '.') })

/** A value as the options show it: an exact decimal with a comma, or a fraction when it does not end */
export function written(value: FractionValue): string {
    if (value.denominator === 1) return String(value.numerator)
    const decimal = toExactDecimal(value, ',')
    return decimal !== null && decimal.length <= 6 ? decimal.replace(',', '{,}') : `\\frac{${value.numerator}}{${value.denominator}}`
}

/** A probability as the options show it: always a fraction (or 0 and 1) */
const asFraction = (value: FractionValue) => (value.denominator === 1 ? String(value.numerator) : `\\frac{${value.numerator}}{${value.denominator}}`)

interface Candidate {
    value: FractionValue
    error: StatisticsRaceError
}

function options(random: Random, right: FractionValue, candidates: Candidate[], write = written): RaceOption<StatisticsRaceError>[] | null {
    const used = new Set([write(right)])
    const wrong: Array<{ latex: string; error: StatisticsRaceError }> = []
    for (const candidate of candidates) {
        if (wrong.length === 3) break
        if (candidate.value.numerator <= 0 || !Number.isFinite(candidate.value.numerator / candidate.value.denominator)) continue
        const latex = write(candidate.value)
        if (used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: write(right), correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

const whole = (value: number) => fraction(value)
const near = (value: FractionValue, step: FractionValue): Candidate[] => [1, -1, 2, -2].map((times) => ({ value: fraction(value.numerator * step.denominator + times * step.numerator * value.denominator, value.denominator * step.denominator), error: 'calculation' }))

function question(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<StatisticsRaceError>[], answer: FractionValue, solution: LocalizedText): StatisticsRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution }
}

const list = (values: number[]) => values.join(', ')
const listAr = (values: number[]) => values.join('، ')

/* ---------- Circuit 0: frequencies ---------- */

function frequencyQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const kind = pick(random, tier === 0 ? ['relative', 'percent'] as const : ['relative', 'percent', 'missing'] as const)
    const n = pick(random, tier === 0 ? [10, 20, 50] : [10, 20, 25, 40, 50])
    if (kind === 'missing') {
        const parts = [randomInt(random, 1, 9), randomInt(random, 1, 9), randomInt(random, 1, 9)]
        const sum = parts.reduce((total, value) => total + value, 0)
        const size = sum + randomInt(random, 1, 9)
        const answer = size - sum
        const choices = options(random, whole(answer), [{ value: whole(sum), error: 'calculation' }, { value: whole(size + sum), error: 'calculation' }, ...near(whole(answer), whole(1))])
        if (!choices) return null
        return question(0, kind, say(`N = ${size}. Maiztasun absolutuak ${list(parts)} eta x dira. Zenbat da x?`, `N = ${size}. Las frecuencias absolutas son ${list(parts)} y x. ¿Cuánto vale x?`, `N = ${size}. التكرارات المطلقة ${listAr(parts)} وx. كم x؟`), choices, whole(answer), same(`$${size}-${parts.join('-')}=${answer}$`))
    }
    const f = randomInt(random, 1, n - 1)
    const h = fraction(f, n)
    if (kind === 'relative') {
        const choices = options(random, h, [{ value: fraction(n, f), error: 'inverted' }, { value: fraction(f * 100, n), error: 'not-percent' }, { value: fraction(f, 100), error: 'calculation' }, ...near(h, fraction(1, 10))])
        if (!choices) return null
        return question(0, kind, say(`${n} datutatik ${f} «bai» dira. Zein da maiztasun erlatiboa?`, `De ${n} datos, ${f} son «sí». ¿Cuál es la frecuencia relativa?`, `من ${n} قيمة، ${f} منها «نعم». ما التكرار النسبي؟`), choices, h, same(`$\\frac{${f}}{${n}}=${written(h)}$`))
    }
    const percent = fraction(f * 100, n)
    const choices = options(random, percent, [{ value: h, error: 'not-percent' }, { value: whole(f), error: 'absolute' }, { value: fraction(n * 100, f), error: 'inverted' }, ...near(percent, whole(5))])
    if (!choices) return null
    return question(0, kind, say(`${n} ikasletatik ${f}k bizikletaz etortzen dira. Zer ehuneko da?`, `De ${n} alumnos, ${f} vienen en bici. ¿Qué porcentaje es?`, `من ${n} تلميذًا يأتي ${f} بالدراجة. ما النسبة المئوية؟`), choices, percent, same(`$\\frac{${f}}{${n}}\\cdot 100=${written(percent)}$`))
}

/* ---------- Circuit 1: pie charts ---------- */

function pieQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const n = pick(random, tier === 0 ? [10, 12, 20, 36] : [10, 12, 18, 20, 24, 30, 36, 40, 60])
    const f = randomInt(random, 1, n - 1)
    const degrees = (360 * f) / n
    if (tier === 2 && random() < 0.5) {
        const choices = options(random, whole(f), [{ value: whole(degrees), error: 'calculation' }, { value: whole(360 / n), error: 'per-datum' }, { value: fraction(n * degrees, 100), error: 'percent-degrees' }, ...near(whole(f), whole(1))])
        if (!choices) return null
        return question(1, 'count', say(`${n} datuko sektore-diagrama batean sektore batek ${degrees}° ditu. Zenbat datu dira?`, `En un diagrama de sectores de ${n} datos, un sector mide ${degrees}°. ¿Cuántos datos son?`, `في مخطط دائري لـ ${n} قيمة قطاع قياسه ${degrees}°. كم قيمة؟`), choices, whole(f), same(`$${degrees}\\mathbin{:}${360 / n}=${f}$`))
    }
    const choices = options(random, whole(degrees), [{ value: whole(f), error: 'absolute' }, { value: fraction(100 * f, n), error: 'percent-degrees' }, { value: whole(360 / n), error: 'per-datum' }, ...near(whole(degrees), whole(360 / n))])
    if (!choices) return null
    return question(1, 'angle', say(`${n} ikasletatik ${f}k igeriketa nahiago dute. Zenbat gradu ditu sektoreak?`, `De ${n} alumnos, ${f} prefieren la natación. ¿Cuántos grados mide su sector?`, `من ${n} تلميذًا يفضّل ${f} السباحة. كم درجة قطاعها؟`), choices, whole(degrees), same(`$\\frac{${f}}{${n}}\\cdot 360=${degrees}$`))
}

/* ---------- Circuit 2: the mean ---------- */

function meanQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const count = tier === 0 ? pick(random, [3, 4, 5]) : pick(random, [4, 5])
    const values = Array.from({ length: count }, () => randomInt(random, 1, tier === 2 ? 20 : 10))
    const sum = values.reduce((total, value) => total + value, 0)
    if (tier === 0 && sum % count !== 0) return null
    const mean = fraction(sum, count)
    const ordered = [...values].sort((x, y) => x - y)
    const median = count % 2 === 1 ? whole(ordered[(count - 1) / 2]) : fraction(ordered[count / 2 - 1] + ordered[count / 2], 2)
    const choices = options(random, mean, [{ value: whole(sum), error: 'no-divide' }, { value: fraction(sum, count - 1), error: 'wrong-count' }, { value: median, error: 'mixed-parameter' }, ...near(mean, whole(1))])
    if (!choices) return null
    return question(2, 'mean', say(`Zein da ${list(values)} datuen batez bestekoa?`, `¿Cuál es la media de ${list(values)}?`, `ما متوسط ${listAr(values)}؟`), choices, mean, same(`$\\frac{${values.join('+')}}{${count}}=${written(mean)}$`))
}

/* ---------- Circuit 3: median, mode and range ---------- */

function positionQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    const kind = pick(random, ['median', 'mode', 'range'] as const)
    const count = kind === 'median' ? (tier === 0 ? 5 : pick(random, [5, 6])) : pick(random, [5, 6, 7])
    const values = Array.from({ length: count }, () => randomInt(random, 1, 15))
    if (kind === 'mode') {
        const repeated = pick(random, values)
        values[randomInt(random, 0, count - 1)] = repeated
        values.push(repeated)
    }
    const ordered = [...values].sort((x, y) => x - y)
    if (ordered.join() === values.join()) return null
    const n = values.length
    const counts = new Map<number, number>()
    for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1)
    const most = Math.max(...counts.values())
    const modes = [...counts.keys()].filter((value) => counts.get(value) === most)
    const median = n % 2 === 1 ? whole(ordered[(n - 1) / 2]) : fraction(ordered[n / 2 - 1] + ordered[n / 2], 2)
    const unsortedMiddle = n % 2 === 1 ? whole(values[(n - 1) / 2]) : fraction(values[n / 2 - 1] + values[n / 2], 2)
    const mean = fraction(values.reduce((total, value) => total + value, 0), n)
    const max = ordered[n - 1]
    const min = ordered[0]
    const data = say(list(values), list(values), listAr(values))
    if (kind === 'median') {
        const choices = options(random, median, [{ value: unsortedMiddle, error: 'not-sorted' }, { value: mean, error: 'mixed-parameter' }, { value: whole(max - min), error: 'mixed-parameter' }, ...near(median, whole(1))])
        if (!choices) return null
        return question(3, kind, say(`Zein da mediana? ${data.eu}`, `¿Cuál es la mediana? ${data.es}`, `ما الوسيط؟ ${data.ar}`), choices, median, say(`Ordenatuta: ${list(ordered)} → Me = ${written(median).replace('{,}', ',')}`, `Ordenados: ${list(ordered)} → Me = ${written(median).replace('{,}', ',')}`, `بعد الترتيب: ${listAr(ordered)} ← Me = ${written(median).replace('{,}', '.')}`))
    }
    if (kind === 'mode') {
        if (modes.length !== 1) return null
        const mode = whole(modes[0])
        const choices = options(random, mode, [{ value: whole(most), error: 'absolute' }, { value: median, error: 'mixed-parameter' }, { value: whole(max), error: 'calculation' }, ...near(mode, whole(1))])
        if (!choices) return null
        return question(3, kind, say(`Zein da moda? ${data.eu}`, `¿Cuál es la moda? ${data.es}`, `ما المنوال؟ ${data.ar}`), choices, mode, say(`${modes[0]} ${most} aldiz agertzen da → Mo = ${modes[0]}`, `El ${modes[0]} aparece ${most} veces → Mo = ${modes[0]}`, `${modes[0]} يظهر ${most} مرات ← Mo = ${modes[0]}`))
    }
    const range = max - min
    if (range === 0) return null
    const choices = options(random, whole(range), [{ value: whole(max), error: 'calculation' }, { value: whole(values[n - 1] - values[0]), error: 'not-sorted' }, { value: whole(max + min), error: 'calculation' }, ...near(whole(range), whole(1))])
    if (!choices) return null
    return question(3, kind, say(`Zein da ibiltartea? ${data.eu}`, `¿Cuál es el rango? ${data.es}`, `ما المدى؟ ${data.ar}`), choices, whole(range), same(`$${max}-${min}=${range}$`))
}

/* ---------- Circuit 4: probability ---------- */

const dieEvents: Array<{ faces: number[]; name: LocalizedText }> = [
    { faces: [2, 4, 6], name: say('zenbaki bikoitia', 'un número par', 'عدد زوجي') },
    { faces: [1, 3, 5], name: say('zenbaki bakoitia', 'un número impar', 'عدد فردي') },
    { faces: [6], name: say('6 bat', 'un 6', 'العدد 6') },
    { faces: [3, 6], name: say('3ren multiplo bat', 'un múltiplo de 3', 'مضاعفًا لـ 3') },
    { faces: [5, 6], name: say('4 baino gehiago', 'más de 4', 'أكثر من 4') },
    { faces: [1, 2, 3, 4], name: say('5 baino gutxiago', 'menos de 5', 'أقل من 5') },
    { faces: [2, 3, 5], name: say('zenbaki lehen bat', 'un número primo', 'عددًا أوليًا') },
    { faces: [1, 2, 3, 4, 5], name: say('6 ez den zenbaki bat', 'un número que no sea 6', 'عددًا غير 6') }
]

function probabilityQuestion(random: Random, tier: Tier): StatisticsRaceQuestion | null {
    let favourable: number
    let possible: number
    let prompt: LocalizedText
    if (tier === 0 || random() < 0.4) {
        const event = pick(random, dieEvents)
        favourable = event.faces.length
        possible = 6
        prompt = say(`Dado bat jaurtitzen da. Zein da ${event.name.eu} ateratzeko probabilitatea?`, `Se lanza un dado. ¿Cuál es la probabilidad de sacar ${event.name.es}?`, `يُرمى نرد. ما احتمال الحصول على ${event.name.ar}؟`)
    } else {
        const red = randomInt(random, 1, 9)
        const blue = randomInt(random, 1, 9)
        const green = tier === 2 ? randomInt(random, 1, 6) : 0
        favourable = red
        possible = red + blue + green
        const bag = green > 0
            ? say(`${red} bola gorri, ${blue} urdin eta ${green} berde`, `${red} bolas rojas, ${blue} azules y ${green} verdes`, `${red} كرات حمراء و${blue} زرقاء و${green} خضراء`)
            : say(`${red} bola gorri eta ${blue} urdin`, `${red} bolas rojas y ${blue} azules`, `${red} كرات حمراء و${blue} زرقاء`)
        prompt = say(`Poltsa batean ${bag.eu} daude. Zein da gorri bat ateratzeko probabilitatea?`, `En una bolsa hay ${bag.es}. ¿Cuál es la probabilidad de sacar una roja?`, `في كيس ${bag.ar}. ما احتمال سحب كرة حمراء؟`)
    }
    const answer = fraction(favourable, possible)
    const unfavourable = possible - favourable
    const candidates: Candidate[] = [
        { value: fraction(favourable, unfavourable), error: 'unfavourable' },
        { value: fraction(unfavourable, possible), error: 'complement' },
        { value: fraction(possible, favourable), error: 'inverted' },
        { value: fraction(favourable + 1, possible), error: 'calculation' },
        { value: fraction(1, possible), error: 'calculation' }
    ]
    const choices = options(random, answer, candidates.filter((candidate) => candidate.value.numerator < candidate.value.denominator || candidate.error === 'inverted'), asFraction)
    if (!choices) return null
    const worked = answer.denominator !== possible ? `\\frac{${favourable}}{${possible}}=${asFraction(answer)}` : `\\frac{${favourable}}{${possible}}`
    return question(4, 'laplace', prompt, choices, answer, same(`$${worked}$`))
}

/* ---------- Public API ---------- */

type Generator = (random: Random, tier: Tier) => StatisticsRaceQuestion | null

const circuitGenerators: Generator[] = [frequencyQuestion, pieQuestion, meanQuestion, positionQuestion, probabilityQuestion]

export function generateStatisticsRaceQuestion(random: Random, circuit: number, tier: Tier): StatisticsRaceQuestion {
    const generator = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 400; attempt += 1) {
        const next = generator(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkStatisticsPitAnswer(question: StatisticsRaceQuestion, input: string): AnswerCheck {
    return checkAnswer(input.replace('%', '').trim(), question.answer, question.answerForm)
}

export function statisticsParTime(circuit: number): number {
    return parTimeFor([9, 10, 11, 11, 10][circuit] ?? 10)
}

export const statisticsRaceErrorTips: Record<StatisticsRaceError, LocalizedText> = {
    inverted: say('Zatikia buruz behera dago: goian zatia (fᵢ edo aldekoak), behean osoa (N edo posibleak).', 'La fracción está al revés: arriba la parte (fᵢ o favorables), abajo el total (N o posibles).', 'الكسر مقلوب: في الأعلى الجزء (fᵢ أو الملائمة) وفي الأسفل الكل (N أو الممكنة).'),
    'not-percent': say('Maiztasun erlatiboa eta ehunekoa ez dira gauza bera: ehunekoa lortzeko, bider 100.', 'La frecuencia relativa y el porcentaje no son lo mismo: para el porcentaje, por 100.', 'التكرار النسبي والنسبة المئوية ليسا الشيء نفسه: للنسبة المئوية اضرب في 100.'),
    absolute: say('Hori maiztasun absolutua da (zenbat aldiz), ez eskatzen dena.', 'Eso es la frecuencia absoluta (cuántas veces), no lo que se pide.', 'هذا هو التكرار المطلق (كم مرة)، وليس المطلوب.'),
    'per-datum': say('Hori datu bakar baten graduak dira (360° : N); biderkatu maiztasunaz.', 'Esos son los grados de un solo dato (360° : N); multiplica por la frecuencia.', 'هذه درجات قيمة واحدة (360° : N)؛ اضرب في التكرار.'),
    'percent-degrees': say('Sektore-diagraman 360° erabiltzen dira, ez 100.', 'En el diagrama de sectores se usan 360°, no 100.', 'في المخطط الدائري نستعمل 360° لا 100.'),
    'no-divide': say('Batu ondoren, zatitu datu kopuruaz.', 'Después de sumar, divide entre el número de datos.', 'بعد الجمع اقسم على عدد البيانات.'),
    'wrong-count': say('Zenbatu ondo zenbat datu dauden.', 'Cuenta bien cuántos datos hay.', 'عُدّ جيدًا كم قيمة هناك.'),
    'not-sorted': say('Lehenik ordenatu datuak txikienetik handienera.', 'Primero ordena los datos de menor a mayor.', 'رتّب البيانات أولًا تصاعديًا.'),
    'mixed-parameter': say('Ez nahastu: batez bestekoa (batu eta zatitu), mediana (erdikoa), moda (gehien errepikatzen dena), ibiltartea (handiena − txikiena).', 'No los confundas: media (sumar y dividir), mediana (el del centro), moda (el que más se repite), rango (mayor − menor).', 'لا تخلط: المتوسط (اجمع واقسم)، الوسيط (الأوسط)، المنوال (الأكثر تكرارًا)، المدى (الأكبر − الأصغر).'),
    unfavourable: say('Behean kasu posible guztiak, ez aurkakoak bakarrik.', 'Abajo van todos los casos posibles, no solo los contrarios.', 'في الأسفل كل الحالات الممكنة، لا المخالفة فقط.'),
    complement: say('Hori kontrako gertaeraren probabilitatea da.', 'Esa es la probabilidad del suceso contrario.', 'هذا احتمال الحدث المعاكس.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.')
}
