import { gcd } from '../../../features/unit-v2/math/fraction.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { hasDecimals, latexNumber as num, round4 } from './numbers.ts'

/* ==========================================================================
   Akatsen detektibea (4. DBH aplikatuak): a word problem and its worked
   solution, where one line is wrong. Each case is solved twice from the
   same data, once right and once with the mistake: the wrong line is the
   first one that differs, and the lines after it carry the mistake on.
   Every number on both sheets is exact (to the cent, or four decimals for
   an index or a backwards division), so the right lines always check.
   Three levels: proportions and percentages, interest, and the arithmetic
   problems (mixtures, taps, vehicles).
   ========================================================================== */

export type ProportionDetectiveError =
    | 'direct-inverse'
    | 'added-percents'
    | 'percent-of-final'
    | 'index'
    | 'months-years'
    | 'simple-for-compound'
    | 'rate-not-split'
    | 'mean-prices'
    | 'added-hours'
    | 'speeds'
    | 'upside-down'
    | 'calculation'

export interface ProportionDetectiveLine {
    /** What the line works out, with its unit */
    label: LocalizedText
    latex: string
}

export interface ProportionDetectiveCase {
    problem: LocalizedText
    lines: ProportionDetectiveLine[]
    wrong: number
    error: ProportionDetectiveError
    /** What the wrong line should have been */
    fix: string
    /** Three kinds of mistake to choose from, the right one among them */
    options: ProportionDetectiveError[]
}

/** The mistakes each level shows */
export const proportionDetectiveLevels: ProportionDetectiveError[][] = [
    ['direct-inverse', 'added-percents', 'percent-of-final', 'index', 'calculation'],
    ['months-years', 'simple-for-compound', 'rate-not-split', 'index', 'calculation'],
    ['mean-prices', 'added-hours', 'speeds', 'upside-down', 'calculation']
]

export const PROPORTION_DETECTIVE_CASES = 6

/** Arabic writes the decimal point, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const math = (value: number | string) => `$${typeof value === 'number' ? num(value) : value}$`
const percent = (value: number) => math(`${num(value)}\\,\\%`)
const percentEu = (value: number) => math(`\\%\\,${num(value)}`)

export const proportionDetectiveErrorNames: Record<ProportionDetectiveError, LocalizedText> = {
    'direct-inverse': say('Zuzena eta alderantzizkoa nahastu', 'Confundió directa e inversa', 'خلط الطردي بالعكسي', 'Mixed up direct and inverse'),
    'added-percents': say('Ehunekoak batu ditu', 'Sumó los porcentajes', 'جمع النسب المئوية', 'Added the percentages'),
    'percent-of-final': say('% azken prezioaren gainean', 'Hizo el % del precio final', 'حسب النسبة من السعر النهائي', 'Took the % of the final price'),
    index: say('Indizea gaizki idatzi du', 'Escribió mal el índice', 'كتب المؤشر خطأً', 'Got the multiplier wrong'),
    'months-years': say('Hilabeteak urtetzat hartu ditu', 'Tomó los meses como años', 'عدّ الأشهر سنوات', 'Took months as years'),
    'simple-for-compound': say('Interes bakuna erabili du', 'Usó interés simple', 'استعمل الفائدة البسيطة', 'Used simple interest'),
    'rate-not-split': say('Ez du tasa aldietan banatu', 'No repartió el tipo anual', 'لم يقسم السعر على الفترات', 'Did not divide the annual rate'),
    'mean-prices': say('Prezioen batez bestekoa egin du', 'Hizo la media de los precios', 'أخذ متوسط السعرين', 'Took the mean of the prices'),
    'added-hours': say('Orduak batu ditu', 'Sumó las horas', 'جمع الساعات', 'Added the hours'),
    speeds: say('Topaketa eta jazarpena nahastu', 'Confundió encuentro y persecución', 'خلط التلاقي بالمطاردة', 'Mixed up meeting and chasing'),
    'upside-down': say('Alderantziz zatitu du', 'Dividió al revés', 'قسم بالعكس', 'Divided the wrong way round'),
    calculation: say('Kalkulu-akatsa', 'Error de cálculo', 'خطأ حسابي', 'Calculation error')
}

export const proportionDetectiveErrorTips: Record<ProportionDetectiveError, LocalizedText> = {
    'direct-inverse': say(
        'Lehenik, erabaki: bata handitzean bestea txikitzen bada, alderantzizkoa da eta biderkadurak berdinak dira; biak batera handitzen badira, zuzena da eta zatidurak berdinak dira.',
        'Primero decide: si al crecer una la otra disminuye, es inversa y los productos son iguales; si crecen juntas, es directa y los cocientes son iguales.',
        'قرّر أولًا: إذا نقص أحد المقدارين عندما يزيد الآخر فالتناسب عكسي وحاصلا الضرب متساويان؛ وإذا زادا معًا فهو طردي وخارجا القسمة متساويان.', 'First decide: if, as one grows, the other shrinks, it is inverse and the products are equal; if they grow together, it is direct and the quotients are equal.'
    ),
    'added-percents': say('Ehuneko kateatuak ez dira batzen: indizeak biderkatzen dira.', 'Los porcentajes encadenados no se suman: se multiplican los índices.', 'النسب المتتالية لا تُجمع: نضرب المؤشرات.', 'Percentage changes one after another are not added: you multiply the multipliers.'),
    'percent-of-final': say(
        'Ehunekoa hasierako prezioarena da, ez azkenekoarena: atzera egiteko, zatitu indizeaz.',
        'El porcentaje es del precio inicial, no del final: para volver atrás, divide entre el índice.',
        'النسبة من السعر الأصلي لا من النهائي: للرجوع اقسم على المؤشر.', 'The percentage is of the starting price, not the final one: to go back, divide by the multiplier.'
    ),
    index: say(
        `${percentEu(3)} igotzeak $1{,}03$ indizea ematen du; ${percentEu(20)} jaisteak, $0{,}8$.`,
        `Una subida del ${percent(3)} da el índice $1{,}03$; una bajada del ${percent(20)}, $0{,}8$.`,
        `زيادة ${percent(3)} تعطي المؤشر $1{,}03$، وتخفيض ${percent(20)} يعطي $0{,}8$.`, `An increase of ${percent(3)} gives the multiplier $1{,}03$; a decrease of ${percent(20)}, $0{,}8$.`
    ),
    'months-years': say('Tasa urtekoa da: hilabeteak urte bihurtzeko, hamabiz zatitu.', 'El tipo es anual: los meses se pasan a años dividiendo entre 12.', 'السعر سنوي: نحوّل الأشهر إلى سنوات بالقسمة على 12.', 'The interest rate is annual: convert months to years by dividing by 12.'),
    'simple-for-compound': say(
        'Konposatuan, interesek ere interesak sortzen dituzte: urtero indizeaz biderkatzen da, $C\\cdot(1+r)^{t}$.',
        'En el compuesto, los intereses también dan intereses: cada año se multiplica por el índice, $C\\cdot(1+r)^{t}$.',
        'في المركّبة تُنتج الفوائد فوائد أيضًا: نضرب كل سنة في المؤشر $C\\cdot(1+r)^{t}$.', 'With compound interest, the interest also earns interest: each year you multiply by the multiplier, $C\\cdot(1+r)^{t}$.'
    ),
    'rate-not-split': say(
        'Interesak urtean $k$ aldiz sartzen badira, aldi bakoitzean urteko tasa zati $k$ aplikatzen da.',
        'Si los intereses se abonan $k$ veces al año, en cada periodo se aplica el tipo anual entre $k$.',
        'إذا أُضيفت الفوائد $k$ مرات في السنة، نطبّق في كل فترة السعر السنوي مقسومًا على $k$.', 'If the interest is added $k$ times a year, each period uses the annual rate divided by $k$.'
    ),
    'mean-prices': say(
        'Nahasketaren prezioa ez da prezioen batez bestekoa: kostu osoa zati kilo guztiak.',
        'La mezcla no sale a la media de los precios: coste total entre kilos totales.',
        'سعر الخليط ليس متوسط السعرين: الكلفة الكلية على مجموع الكيلوغرامات.', 'The mixture does not come out at the average of the prices: total cost divided by total kilos.'
    ),
    'added-hours': say(
        'Biak batera bakoitza bera baino azkarrago doaz: batu ordu batean betetzen dutena, $\\frac{1}{a}+\\frac{1}{b}$.',
        'Juntos tardan menos que cada uno solo: suma lo que llena cada grifo en una hora, $\\frac{1}{a}+\\frac{1}{b}$.',
        'معًا يستغرقان أقل من كل واحد وحده: اجمع ما يملؤه كل صنبور في ساعة $\\frac{1}{a}+\\frac{1}{b}$.', 'Together they take less time than each one alone: add up what each tap fills in one hour, $\\frac{1}{a}+\\frac{1}{b}$.'
    ),
    speeds: say('Elkarrengana badoaz, abiadurak batu; bata bestearen atzetik badoa, kendu.', 'Si van al encuentro, las velocidades se suman; si uno persigue al otro, se restan.', 'إذا تلاقيا نجمع السرعتين، وإذا لاحق أحدهما الآخر نطرحهما.', 'If they are moving towards each other, the speeds are added; if one is chasing the other, they are subtracted.'),
    'upside-down': say(
        'Begiratu zatiketaren ordena: kostua zati kiloak, distantzia zati abiadura, 1 zati ordu batean betetzen dena.',
        'Mira el orden de la división: coste entre kilos, distancia entre velocidad, 1 entre lo que se llena en una hora.',
        'انتبه لترتيب القسمة: الكلفة على الكيلوغرامات، والمسافة على السرعة، و1 على ما يُملأ في ساعة.', 'Check the order of the division: cost divided by kilos, distance divided by speed, 1 divided by what fills in one hour.'
    ),
    calculation: say('Planteamendua ondo dago; berrikusi lerro horretako eragiketa.', 'El planteamiento está bien; repasa la operación de esa línea.', 'الطريقة صحيحة؛ راجع العملية في ذلك السطر.', 'Your set-up is right; check the calculation on that line.')
}

/* ---------- Solving a sheet ---------- */

interface Mistake {
    error: ProportionDetectiveError
    /** For a slip: the line where it goes and how big it is */
    line: number
    choice: number
}

const SLIPS = [1, -1, 2, -2, 10, -10]

/** Keeps the values of one sheet: a slip goes in at its line, and a value that is not exact spoils the sheet */
function sheet(mistake: Mistake) {
    let clean = true
    return {
        value(line: number, value: number, digits = 2) {
            if (!hasDecimals(value, digits)) clean = false
            if (mistake.error !== 'calculation' || mistake.line !== line) return round4(value)
            const size = Math.abs(value) >= 10 ? 1 : Math.abs(value) >= 1 ? 0.1 : 0.01
            const slipped = round4(value + SLIPS[mistake.choice] * size)
            if (Math.sign(slipped) !== Math.sign(value)) clean = false
            return slipped
        },
        done: (lines: string[]) => (clean ? lines : null)
    }
}

interface Problem {
    problem: LocalizedText
    labels: LocalizedText[]
    /** The lines, solved right (no mistake) or with the mistake; null when a number is not exact */
    solve: (mistake: Mistake) => string[] | null
}

interface Template {
    errors: ProportionDetectiveError[]
    /** Lines where a calculation slip can go */
    slips: number[]
    make: (random: Random, error: ProportionDetectiveError) => Problem | null
}

/** No mistake: a slip on a line that does not exist */
const RIGHT: Mistake = { error: 'calculation', line: -1, choice: 0 }

const fractionLatex = (numerator: number, denominator: number) => (denominator === 1 ? String(numerator) : `\\frac{${numerator}}{${denominator}}`)

/* ---------- Level 1: proportions and percentages ---------- */

type ProportionContext = 'painters' | 'speed' | 'price' | 'fuel'

const proportionContexts: Record<ProportionContext, { direct: boolean; values: (random: Random) => [number, number, number]; problem: (a: number, b: number, c: number) => LocalizedText }> = {
    painters: {
        direct: false,
        values: (random) => [randomInt(random, 2, 10), randomInt(random, 3, 30), randomInt(random, 2, 12)],
        problem: (a, b, c) => say(
            `${math(a)} margolarik etxe bat ${math(b)} egunetan margotzen dute. Zenbat egun beharko dituzte ${math(c)} margolarik?`,
            `${math(a)} pintores pintan una casa en ${math(b)} días. ¿Cuántos días tardarán ${math(c)} pintores?`,
            `يدهن ${math(a)} دهّانين بيتًا في ${math(b)} أيام. كم يومًا يحتاج ${math(c)} دهّانين؟`, `${math(a)} painters paint a house in ${math(b)} days. How many days will ${math(c)} painters take?`
        )
    },
    speed: {
        direct: false,
        values: (random) => [randomInt(random, 4, 12) * 10, pick(random, [1.5, 2, 2.5, 3, 4, 5, 6]), randomInt(random, 4, 12) * 10],
        problem: (a, b, c) => say(
            `Abiadura ${math(a)} km/h bada, bidaiak ${math(b)} ordu irauten du. Zenbat ordu iraungo du abiadura ${math(c)} km/h bada?`,
            `A ${math(a)} km/h, un viaje dura ${math(b)} horas. ¿Cuántas horas dura a ${math(c)} km/h?`,
            `بسرعة ${math(a)} كم/س تستغرق الرحلة ${math(b)} ساعات. كم ساعة تستغرق بسرعة ${math(c)} كم/س؟`, `At ${math(a)} km/h, a journey takes ${math(b)} hours. How many hours does it take at ${math(c)} km/h?`
        )
    },
    price: {
        direct: true,
        values: (random) => [randomInt(random, 2, 8), randomInt(random, 4, 40) / 2, randomInt(random, 3, 15)],
        problem: (a, b, c) => say(
            `${math(a)} kg laranja ${math(b)} € balio dute. Zenbat balio dute ${math(c)} kg?`,
            `${math(a)} kg de naranjas cuestan ${math(b)} €. ¿Cuánto cuestan ${math(c)} kg?`,
            `ثمن ${math(a)} كغ من البرتقال ${math(b)} €. كم ثمن ${math(c)} كغ؟`, `${math(a)} kg of oranges cost €${math(b)}. How much do ${math(c)} kg cost?`
        )
    },
    fuel: {
        direct: true,
        values: (random) => [pick(random, [100, 150, 200, 250, 300, 400, 500]), randomInt(random, 5, 40), randomInt(random, 1, 18) * 50],
        problem: (a, b, c) => say(
            `Auto batek ${math(b)} litro gastatzen ditu ${math(a)} km egiteko. Zenbat litro gastatuko ditu ${math(c)} km egiteko?`,
            `Un coche gasta ${math(b)} litros en ${math(a)} km. ¿Cuántos litros gasta en ${math(c)} km?`,
            `تستهلك سيارة ${math(b)} لترات في ${math(a)} كم. كم لترًا تستهلك في ${math(c)} كم؟`, `A car uses ${math(b)} litres in ${math(a)} km. How many litres does it use in ${math(c)} km?`
        )
    }
}

const proportionTemplate: Template = {
    errors: ['direct-inverse', 'calculation'],
    slips: [2],
    make(random) {
        const { direct, values, problem } = proportionContexts[pick(random, Object.keys(proportionContexts) as ProportionContext[])]
        const [a, b, c] = values(random)
        if (a === c) return null
        return {
            problem: problem(a, b, c),
            labels: [say('Proportzioa', 'Proporción', 'التناسب', 'Proportion'), say('x bakandu', 'Despejo x', 'نعزل x', 'Solve for x'), say('Emaitza', 'Resultado', 'النتيجة', 'Result')],
            solve(mistake) {
                const s = sheet(mistake)
                const asDirect = mistake.error === 'direct-inverse' ? !direct : direct
                const x = s.value(2, asDirect ? (b * c) / a : (a * b) / c)
                return s.done([
                    asDirect ? `\\frac{${num(a)}}{${num(b)}}=\\frac{${num(c)}}{x}` : `${num(a)}\\cdot ${num(b)}=${num(c)}\\cdot x`,
                    asDirect ? `x=\\frac{${num(b)}\\cdot ${num(c)}}{${num(a)}}` : `x=\\frac{${num(a)}\\cdot ${num(b)}}{${num(c)}}`,
                    `x=${num(x)}`
                ])
            }
        }
    }
}

const signed = (value: number) => (value < 0 ? `-${num(-value)}` : `+${num(value)}`)

const chainedTemplate: Template = {
    errors: ['added-percents', 'index', 'calculation'],
    slips: [0, 1, 2],
    make(random) {
        const price = pick(random, [40, 50, 60, 80, 100, 120, 150, 200, 250, 300, 400, 500])
        const changes = [random() < 0.7 ? 1 : -1, random() < 0.4 ? 1 : -1].map((sign) => sign * pick(random, [5, 10, 15, 20, 25, 30, 40, 50]))
        // The index written wrong: a fall with the sign of a rise, or a rise without the 1
        const slipped = changes.findIndex((change) => change < 0)
        const words = (change: number) => ({
            eu: `${percentEu(Math.abs(change))} ${change > 0 ? 'igotzen' : 'jaisten'} da`,
            es: `${change > 0 ? 'sube' : 'baja'} un ${percent(Math.abs(change))}`,
            en: `${change > 0 ? 'goes up' : 'goes down'} by ${percent(Math.abs(change))}`,
            ar: `${change > 0 ? 'يرتفع' : 'ينخفض'} ${percent(Math.abs(change))}`
        })
        const [first, second] = changes.map(words)
        return {
            problem: say(
                `Prezio bat ${math(price)} € da. Lehenik ${first.eu}, eta gero ${second.eu}. Zein da azken prezioa? Zenbat aldatu da guztira, ehunekotan?`,
                `Un precio de ${math(price)} € ${first.es} y después ${second.es}. ¿Cuál es el precio final? ¿Cuánto ha cambiado en total, en %?`,
                `سعر ${math(price)} € ${first.ar} ثم ${second.ar}. ما السعر النهائي؟ وكم تغيّر إجمالًا بالنسبة المئوية؟`, `A price of €${math(price)} ${first.en} and then ${second.en}. What is the final price? How much has it changed overall, as a percentage?`
            ),
            labels: [say('Indize osoa', 'Índice total', 'المؤشر الكلي', 'Total multiplier'), say('Azken prezioa (€)', 'Precio final (€)', 'السعر النهائي (€)', 'Final price (€)'), say('Aldaketa (%)', 'Cambio total (%)', 'التغيّر الكلي (٪)', 'Total change (%)')],
            solve(mistake) {
                const s = sheet(mistake)
                const indices = changes.map((change) => round4(1 + change / 100))
                if (mistake.error === 'index') {
                    const which = slipped >= 0 ? slipped : 1
                    indices[which] = changes[which] < 0 ? round4(1 - changes[which] / 100) : changes[which] / 100
                }
                const added = mistake.error === 'added-percents'
                const total = s.value(0, added ? 1 + (changes[0] + changes[1]) / 100 : indices[0] * indices[1], 4)
                const final = s.value(1, price * total)
                const change = s.value(2, (total - 1) * 100)
                return s.done([
                    added ? `1${signed(changes[0] / 100)}${signed(changes[1] / 100)}=${num(total)}` : `${num(indices[0])}\\cdot ${num(indices[1])}=${num(total)}`,
                    `${num(price)}\\cdot ${num(total)}=${num(final)}`,
                    `(${num(total)}-1)\\cdot 100=${num(change)}`
                ])
            }
        }
    }
}

type ReverseVariant = 'vat21' | 'vat10' | 'discount'

const reverseTemplate: Template = {
    errors: ['percent-of-final', 'index', 'calculation'],
    slips: [1, 2],
    make(random, error) {
        // The index with the wrong sign only makes sense for a discount
        const variant: ReverseVariant = error === 'index' ? 'discount' : pick(random, ['vat21', 'vat10', 'discount'] as const)
        const vat = variant !== 'discount'
        const rate = variant === 'vat21' ? 21 : variant === 'vat10' ? 10 : pick(random, [10, 15, 20, 25, 30, 40])
        const before = variant === 'vat21' ? randomInt(random, 1, 12) * 100 : variant === 'vat10' ? randomInt(random, 3, 60) * 10 : randomInt(random, 4, 60) * 5
        const final = round4(before * (1 + (vat ? rate : -rate) / 100))
        if (!Number.isInteger(final)) return null
        const problems: Record<ReverseVariant, LocalizedText> = {
            vat21: say(
                `BEZa barne (${percentEu(21)}), mugikor batek ${math(final)} € balio du. Zenbat balio du BEZik gabe? Zenbat BEZ ordaintzen da?`,
                `Con el ${percent(21)} de IVA incluido, un móvil cuesta ${math(final)} €. ¿Cuánto cuesta sin IVA? ¿Cuánto IVA se paga?`,
                `ثمن هاتف ${math(final)} € شاملًا ضريبة القيمة المضافة ${percent(21)}. كم ثمنه دون الضريبة؟ وكم الضريبة المدفوعة؟`, `With ${percent(21)} VAT included, a phone costs €${math(final)}. How much does it cost without VAT? How much VAT do you pay?`
            ),
            vat10: say(
                `BEZa barne (${percentEu(10)}), afari batek ${math(final)} € balio du. Zenbat balio du BEZik gabe? Zenbat BEZ ordaintzen da?`,
                `Con el ${percent(10)} de IVA incluido, una cena cuesta ${math(final)} €. ¿Cuánto cuesta sin IVA? ¿Cuánto IVA se paga?`,
                `ثمن عشاء ${math(final)} € شاملًا ضريبة ${percent(10)}. كم ثمنه دون الضريبة؟ وكم الضريبة المدفوعة؟`, `With ${percent(10)} VAT included, a meal costs €${math(final)}. How much does it cost without VAT? How much VAT do you pay?`
            ),
            discount: say(
                `Beherapena eginda (${percentEu(rate)}), zapatila batzuek ${math(final)} € balio dute. Zenbat balio zuten lehen? Zenbatekoa da beherapena?`,
                `Con una rebaja del ${percent(rate)}, unas zapatillas cuestan ${math(final)} €. ¿Cuánto costaban antes? ¿Cuánto es la rebaja?`,
                `بعد تخفيض ${percent(rate)} صار ثمن حذاء رياضي ${math(final)} €. كم كان ثمنه قبل التخفيض؟ وكم مقدار التخفيض؟`, `After a ${percent(rate)} discount, a pair of trainers costs €${math(final)}. How much did they cost before? How much is the discount?`
            )
        }
        return {
            problem: problems[variant],
            labels: [
                say('Indizea', 'Índice', 'المؤشر', 'Index'),
                vat ? say('BEZik gabe (€)', 'Sin IVA (€)', 'دون الضريبة (€)', 'Without VAT (€)') : say('Lehengo prezioa (€)', 'Precio de antes (€)', 'السعر السابق (€)', 'Original price (€)'),
                vat ? say('BEZa (€)', 'IVA (€)', 'الضريبة (€)', 'VAT (€)') : say('Beherapena (€)', 'Rebaja (€)', 'التخفيض (€)', 'Discount (€)')
            ],
            solve(mistake) {
                const s = sheet(mistake)
                const up = vat !== (mistake.error === 'index')
                const index = round4(1 + (up ? rate : -rate) / 100)
                const onFinal = mistake.error === 'percent-of-final'
                const start = s.value(1, onFinal ? final * (1 + (vat ? -rate : rate) / 100) : final / index)
                const difference = s.value(2, vat ? final - start : start - final)
                return s.done([
                    `1${up ? '+' : '-'}${num(rate / 100)}=${num(index)}`,
                    onFinal ? `${num(final)}${vat ? '-' : '+'}${num(rate / 100)}\\cdot ${num(final)}=${num(start)}` : `${num(final)}\\mathbin{:}${num(index)}=${num(start)}`,
                    vat ? `${num(final)}-${num(start)}=${num(difference)}` : `${num(start)}-${num(final)}=${num(difference)}`
                ])
            }
        }
    }
}

/* ---------- Level 2: interest ---------- */

const capitalLabel = say('Azken kapitala (€)', 'Capital final (€)', 'رأس المال النهائي (€)', 'Final amount (€)')
const interestLabel = say('Interesak (€)', 'Intereses (€)', 'الفوائد (€)', 'Interest (€)')

const monthsTemplate: Template = {
    errors: ['months-years', 'calculation'],
    slips: [1, 2],
    make(random) {
        const capital = pick(random, [1200, 2000, 2400, 3000, 3600, 4000, 5000, 6000, 8000])
        const rate = pick(random, [2, 2.5, 3, 3.5, 4, 4.5, 5, 6])
        const months = pick(random, [3, 6, 9, 15, 18, 30])
        return {
            problem: say(
                `${math(capital)} € gordetzen dira bankuan, interes bakunarekin: urteko ${percentEu(rate)}, ${math(months)} hilabetez. Zenbat diru dago amaieran?`,
                `Se depositan ${math(capital)} € al ${percent(rate)} de interés simple anual durante ${math(months)} meses. ¿Cuánto dinero hay al final?`,
                `نودع ${math(capital)} € بفائدة بسيطة ${percent(rate)} سنويًا مدة ${math(months)} أشهر. كم يصبح المال في النهاية؟`, `€${math(capital)} is deposited at ${percent(rate)} simple annual interest for ${math(months)} months. How much money is there at the end?`
            ),
            labels: [say('Denbora (urteak)', 'Tiempo (años)', 'الزمن (سنوات)', 'Time (years)'), say('Interesa (€)', 'Interés (€)', 'الفائدة (€)', 'Interest (€)'), say('Amaieran (€)', 'Al final (€)', 'في النهاية (€)', 'Total at the end (€)')],
            solve(mistake) {
                const s = sheet(mistake)
                const asYears = mistake.error === 'months-years'
                const years = asYears ? months : months / 12
                const interest = s.value(1, (capital * rate * years) / 100)
                const total = s.value(2, capital + interest)
                return s.done([
                    asYears ? `t=${months}` : `t=\\frac{${months}}{12}=${num(years)}`,
                    `\\frac{${num(capital)}\\cdot ${num(rate)}\\cdot ${num(years)}}{100}=${num(interest)}`,
                    `${num(capital)}+${num(interest)}=${num(total)}`
                ])
            }
        }
    }
}

const compoundTemplate: Template = {
    errors: ['simple-for-compound', 'index', 'calculation'],
    slips: [1, 2],
    make(random, error) {
        // The index written wrong moves the percentage one place: 3 % → 1,3
        const rate = pick(random, error === 'index' ? [2, 3, 4, 5, 6, 8] : [2, 3, 4, 5, 6, 8, 10, 20])
        const years = pick(random, [2, 3, 4])
        const capital = pick(random, [1000, 2000, 4000, 5000, 8000, 10000])
        return {
            problem: say(
                `${math(capital)} € jartzen dira interes konposatuan, urteko ${percentEu(rate)}, ${math(years)} urtez. Zenbat diru egongo da amaieran? Zenbat interes ematen dute?`,
                `Se colocan ${math(capital)} € al ${percent(rate)} de interés compuesto anual durante ${math(years)} años. ¿Cuánto dinero habrá al final? ¿Cuántos intereses dan?`,
                `نودع ${math(capital)} € بفائدة مركّبة ${percent(rate)} سنويًا مدة ${math(years)} سنوات. كم يصبح المال في النهاية؟ وكم الفوائد؟`, `€${math(capital)} is invested at ${percent(rate)} annual compound interest for ${math(years)} years. How much money will there be at the end? How much interest will it earn?`
            ),
            labels: [say('Indizea', 'Índice', 'المؤشر', 'Index'), capitalLabel, interestLabel],
            solve(mistake) {
                const s = sheet(mistake)
                const step = mistake.error === 'index' ? rate / 10 : rate / 100
                const index = round4(1 + step)
                const simple = mistake.error === 'simple-for-compound'
                const final = s.value(1, simple ? capital * (1 + (rate / 100) * years) : capital * index ** years)
                const interest = s.value(2, final - capital)
                return s.done([
                    `1+${num(step)}=${num(index)}`,
                    simple ? `${num(capital)}\\cdot(1+${num(rate / 100)}\\cdot ${years})=${num(final)}` : `${num(capital)}\\cdot ${num(index)}^{${years}}=${num(final)}`,
                    `${num(final)}-${num(capital)}=${num(interest)}`
                ])
            }
        }
    }
}

/** How often the interest is paid, for how many periods, and rates that split into round percentages */
const PERIOD_PLANS = [
    { periods: 2, count: 2, rates: [4, 6, 8, 10] },
    { periods: 4, count: 2, rates: [4, 8, 12] },
    { periods: 4, count: 3, rates: [4, 8, 12] },
    { periods: 12, count: 3, rates: [6, 12] }
] as const

const periodNames: Record<2 | 4 | 12, LocalizedText> = {
    2: say('sei hilean behin', 'cada semestre', 'كل ستة أشهر', 'every six months'),
    4: say('hiru hilean behin', 'cada trimestre', 'كل ثلاثة أشهر', 'every three months'),
    12: say('hilean behin', 'cada mes', 'كل شهر', 'every month')
}

const periodsTemplate: Template = {
    errors: ['rate-not-split', 'calculation'],
    slips: [1, 2],
    make(random) {
        const plan = pick(random, PERIOD_PLANS)
        const rate = pick(random, plan.rates)
        const capital = pick(random, [1000, 2000, 4000, 5000, 8000, 10000, 20000])
        const months = (12 * plan.count) / plan.periods
        const when = periodNames[plan.periods]
        const time = months === 12
            ? { eu: 'urtebetez', es: 'un año', en: 'one year', ar: 'مدة سنة' }
            : { eu: `${math(months)} hilabetez`, es: `${math(months)} meses`, en: `${math(months)} months`, ar: `مدة ${math(months)} أشهر` }
        return {
            problem: say(
                `Banku batek urteko ${percentEu(rate)} ordaintzen du, interes konposatuan, eta interesak ${when.eu} sartzen ditu. ${math(capital)} € gordetzen dira ${time.eu}. Zenbat diru dago amaieran?`,
                `Un banco paga un ${percent(rate)} anual de interés compuesto y abona los intereses ${when.es}. Se depositan ${math(capital)} € durante ${time.es}. ¿Cuánto dinero hay al final?`,
                `يدفع مصرف فائدة مركّبة ${percent(rate)} سنويًا ويضيف الفوائد ${when.ar}. نودع ${math(capital)} € ${time.ar}. كم يصبح المال في النهاية؟`, `A bank pays ${percent(rate)} a year in compound interest and adds the interest ${when.en}. €${math(capital)} is deposited for ${time.en}. How much money is there at the end?`
            ),
            labels: [say('Aldiko indizea', 'Índice por periodo', 'مؤشر الفترة', 'Multiplier per period'), capitalLabel, interestLabel],
            solve(mistake) {
                const s = sheet(mistake)
                const whole = mistake.error === 'rate-not-split'
                const index = round4(1 + rate / 100 / (whole ? 1 : plan.periods))
                const final = s.value(1, capital * index ** plan.count)
                const interest = s.value(2, final - capital)
                return s.done([
                    whole ? `1+${num(rate / 100)}=${num(index)}` : `1+\\frac{${num(rate / 100)}}{${plan.periods}}=${num(index)}`,
                    `${num(capital)}\\cdot ${num(index)}^{${plan.count}}=${num(final)}`,
                    `${num(final)}-${num(capital)}=${num(interest)}`
                ])
            }
        }
    }
}

/* ---------- Level 3: mixtures, taps and vehicles ---------- */

const mixtureTemplate: Template = {
    errors: ['mean-prices', 'upside-down', 'calculation'],
    slips: [0, 1, 2],
    make(random) {
        const kilos = [randomInt(random, 2, 12), randomInt(random, 2, 12)]
        const prices = [randomInt(random, 40, 150) / 10, randomInt(random, 40, 150) / 10]
        const bag = pick(random, [2, 3, 5])
        if (kilos[0] === kilos[1] || Math.abs(prices[0] - prices[1]) < 1) return null
        return {
            problem: say(
                `Kafe bi nahasten dira: ${math(kilos[0])} kg, kiloa ${math(prices[0])} €, eta ${math(kilos[1])} kg, kiloa ${math(prices[1])} €. Nahasketaren poltsa batek ${math(bag)} kg ditu. Zenbat balio du?`,
                `Se mezclan ${math(kilos[0])} kg de café de ${math(prices[0])} €/kg con ${math(kilos[1])} kg de ${math(prices[1])} €/kg. ¿Cuánto cuesta una bolsa de ${math(bag)} kg de la mezcla?`,
                `نخلط ${math(kilos[0])} كغ من البن بسعر ${math(prices[0])} €/كغ مع ${math(kilos[1])} كغ بسعر ${math(prices[1])} €/كغ. كم ثمن كيس من الخليط وزنه ${math(bag)} كغ؟`, `Mix ${math(kilos[0])} kg of coffee at €${math(prices[0])}/kg with ${math(kilos[1])} kg at €${math(prices[1])}/kg. How much does a ${math(bag)} kg bag of the mixture cost?`
            ),
            labels: [say('Kostu osoa (€)', 'Coste total (€)', 'الكلفة الكلية (€)', 'Total cost (€)'), say('Kiloaren prezioa (€)', 'Precio del kilo (€)', 'سعر الكيلو (€)', 'Price per kilo (€)'), say('Poltsa (€)', 'La bolsa (€)', 'الكيس (€)', 'The bag (€)')],
            solve(mistake) {
                const s = sheet(mistake)
                const mean = mistake.error === 'mean-prices'
                const backwards = mistake.error === 'upside-down'
                const digits = backwards ? 4 : 2
                const cost = s.value(0, kilos[0] * prices[0] + kilos[1] * prices[1])
                const together = `(${kilos[0]}+${kilos[1]})`
                const price = s.value(1, mean ? (prices[0] + prices[1]) / 2 : backwards ? (kilos[0] + kilos[1]) / cost : cost / (kilos[0] + kilos[1]), digits)
                const bagCost = s.value(2, bag * price, digits)
                return s.done([
                    `${kilos[0]}\\cdot ${num(prices[0])}+${kilos[1]}\\cdot ${num(prices[1])}=${num(cost)}`,
                    mean ? `(${num(prices[0])}+${num(prices[1])})\\mathbin{:}2=${num(price)}` : backwards ? `${together}\\mathbin{:}${num(cost)}=${num(price)}` : `${num(cost)}\\mathbin{:}${together}=${num(price)}`,
                    `${bag}\\cdot ${num(price)}=${num(bagCost)}`
                ])
            }
        }
    }
}

const tapsTemplate: Template = {
    errors: ['added-hours', 'upside-down', 'calculation'],
    slips: [1, 2],
    make(random) {
        const a = randomInt(random, 2, 12)
        const b = randomInt(random, 2, 15)
        if (a === b) return null
        const common = gcd(a + b, a * b)
        return {
            problem: say(
                `A txorrotak biltegia ${math(a)} orduan betetzen du, eta B txorrotak, ${math(b)} orduan. Zenbat denbora behar dute biek batera, ordutan eta minututan?`,
                `El grifo A llena un depósito en ${math(a)} horas, y el grifo B, en ${math(b)} horas. ¿Cuánto tardan los dos juntos, en horas y en minutos?`,
                `يملأ الصنبور أ خزانًا في ${math(a)} ساعات، والصنبور ب في ${math(b)} ساعات. كم يحتاجان معًا بالساعات والدقائق؟`, `Tap A fills a tank in ${math(a)} hours, and tap B fills it in ${math(b)} hours. How long do the two taps take together, in hours and minutes?`
            ),
            labels: [say('Batera, ordu batean', 'Juntos en 1 hora', 'معًا في ساعة', 'Together in 1 hour'), say('Denbora (h)', 'Tiempo (h)', 'الزمن (س)', 'Time (h)'), say('Denbora (min)', 'Tiempo (min)', 'الزمن (د)', 'Time (min)')],
            solve(mistake) {
                const s = sheet(mistake)
                const added = mistake.error === 'added-hours'
                const backwards = mistake.error === 'upside-down'
                const digits = backwards ? 4 : 2
                // The part of the tank filled in an hour
                const [top, bottom] = added ? [1, a + b] : [(a + b) / common, (a * b) / common]
                const part = fractionLatex(top, bottom)
                const hours = s.value(1, backwards ? top / bottom : bottom / top, digits)
                const minutes = s.value(2, hours * 60, digits)
                return s.done([
                    added ? `\\frac{1}{${a}+${b}}=${part}` : `\\frac{1}{${a}}+\\frac{1}{${b}}=${part}`,
                    backwards ? `${part}\\mathbin{:}1=${num(hours)}` : `1\\mathbin{:}${part}=${num(hours)}`,
                    `${num(hours)}\\cdot 60=${num(minutes)}`
                ])
            }
        }
    }
}

const timeLabel = say('Denbora (h)', 'Tiempo (h)', 'الزمن (س)', 'Time (h)')
const closingLabel = say('Hurbiltzea (km/h)', 'Se acercan (km/h)', 'سرعة الاقتراب (كم/س)', 'Closing speed (km/h)')

/** A chase: a lorry leaves, a car follows later from the same place, faster */
function chaseProblem(random: Random): Problem {
    const slow = randomInt(random, 4, 9) * 10
    const fast = slow + randomInt(random, 1, 6) * 10
    const delay = pick(random, [1.5, 2, 2.5, 3])
    return {
        problem: say(
            `Kamioi bat herri batetik ateratzen da, abiadura ${math(slow)} km/h. ${math(delay)} ordu geroago, auto bat herri beretik ateratzen da errepide beretik, abiadura ${math(fast)} km/h. Zenbat ordu behar ditu autoak kamioia harrapatzeko?`,
            `Un camión sale de un pueblo a ${math(slow)} km/h. ${math(delay)} horas después sale del mismo pueblo, por la misma carretera, un coche a ${math(fast)} km/h. ¿Cuántas horas tarda el coche en alcanzarlo?`,
            `تنطلق شاحنة من قرية بسرعة ${math(slow)} كم/س. بعد ${math(delay)} ساعات تنطلق سيارة من القرية نفسها وعلى الطريق نفسها بسرعة ${math(fast)} كم/س. كم ساعة تحتاج السيارة لتلحق بالشاحنة؟`, `A lorry leaves a village at ${math(slow)} km/h. ${math(delay)} hours later, a car leaves the same village, on the same road, at ${math(fast)} km/h. How many hours will the car take to catch up with it?`
        ),
        labels: [say('Aurrea (km)', 'Ventaja (km)', 'الفارق (كم)', 'Lead (km)'), closingLabel, timeLabel],
        solve(mistake) {
            const s = sheet(mistake)
            const added = mistake.error === 'speeds'
            const backwards = mistake.error === 'upside-down'
            const lead = s.value(0, slow * delay)
            const closing = s.value(1, added ? fast + slow : fast - slow)
            const time = s.value(2, backwards ? closing / lead : lead / closing, backwards ? 4 : 2)
            return s.done([
                `${slow}\\cdot ${num(delay)}=${num(lead)}`,
                `${fast}${added ? '+' : '-'}${slow}=${num(closing)}`,
                backwards ? `${num(closing)}\\mathbin{:}${num(lead)}=${num(time)}` : `${num(lead)}\\mathbin{:}${num(closing)}=${num(time)}`
            ])
        }
    }
}

/** A meeting: two cars leave two towns at the same time, one towards the other */
function meetProblem(random: Random): Problem | null {
    const speeds = [randomInt(random, 4, 12) * 10, randomInt(random, 4, 12) * 10]
    if (speeds[0] === speeds[1]) return null
    const distance = (speeds[0] + speeds[1]) * pick(random, [0.5, 1, 1.5, 2, 2.5, 3])
    const [fast, slow] = [Math.max(...speeds), Math.min(...speeds)]
    return {
        problem: say(
            `A eta B hirien arteko distantzia ${math(distance)} km da. Aldi berean, auto bana ateratzen da hiri bakoitzetik bestearengana: A-koaren abiadura ${math(speeds[0])} km/h da, eta B-koarena, ${math(speeds[1])} km/h. Zenbat ordu behar dute gurutzatzeko, eta A-tik zenbat kilometrotara gurutzatzen dira?`,
            `Dos ciudades, A y B, están a ${math(distance)} km. A la vez sale un coche de cada una hacia la otra: el de A a ${math(speeds[0])} km/h y el de B a ${math(speeds[1])} km/h. ¿Cuántas horas tardan en cruzarse y a cuántos km de A?`,
            `المسافة بين المدينتين أ وب ${math(distance)} كم. تنطلق في اللحظة نفسها سيارة من كل مدينة نحو الأخرى: سيارة أ بسرعة ${math(speeds[0])} كم/س وسيارة ب بسرعة ${math(speeds[1])} كم/س. بعد كم ساعة تتقاطعان، وعلى بعد كم كيلومترًا من أ؟`, `Two cities, A and B, are ${math(distance)} km apart. At the same time, a car leaves each city towards the other: the car from A at ${math(speeds[0])} km/h and the car from B at ${math(speeds[1])} km/h. How many hours do they take to meet, and how many km from A is the meeting point?`
        ),
        labels: [closingLabel, timeLabel, say('A-tik (km)', 'Desde A (km)', 'من أ (كم)', 'From A (km)')],
        solve(mistake) {
            const s = sheet(mistake)
            const subtracted = mistake.error === 'speeds'
            const backwards = mistake.error === 'upside-down'
            const digits = backwards ? 4 : 2
            const closing = s.value(0, subtracted ? fast - slow : speeds[0] + speeds[1])
            const time = s.value(1, backwards ? closing / distance : distance / closing, digits)
            const fromA = s.value(2, speeds[0] * time, digits)
            return s.done([
                subtracted ? `${fast}-${slow}=${num(closing)}` : `${speeds[0]}+${speeds[1]}=${num(closing)}`,
                backwards ? `${num(closing)}\\mathbin{:}${num(distance)}=${num(time)}` : `${num(distance)}\\mathbin{:}${num(closing)}=${num(time)}`,
                `${speeds[0]}\\cdot ${num(time)}=${num(fromA)}`
            ])
        }
    }
}

const motionTemplate: Template = {
    errors: ['speeds', 'upside-down', 'calculation'],
    slips: [0, 1, 2],
    make: (random) => (random() < 0.5 ? chaseProblem(random) : meetProblem(random))
}

/* ---------- Building the cases ---------- */

const levelTemplates: Template[][] = [
    [proportionTemplate, chainedTemplate, reverseTemplate],
    [monthsTemplate, compoundTemplate, periodsTemplate],
    [mixtureTemplate, tapsTemplate, motionTemplate]
]

export function createProportionDetectiveCase(random: Random, levelIndex: number, error: ProportionDetectiveError): ProportionDetectiveCase {
    const kinds = proportionDetectiveLevels[levelIndex]
    const templates = levelTemplates[levelIndex].filter((template) => template.errors.includes(error))
    for (let attempt = 0; attempt < 20000; attempt += 1) {
        const template = pick(random, templates)
        const made = template.make(random, error)
        if (!made) continue
        const right = made.solve(RIGHT)
        const bad = made.solve({ error, line: pick(random, template.slips), choice: randomInt(random, 0, SLIPS.length - 1) })
        if (!right || !bad) continue
        const wrong = bad.findIndex((latex, index) => latex !== right[index])
        if (wrong < 0) continue
        // The other mistakes of the same kind of problem first, so the choice is not given away
        const related = shuffle(random, template.errors.filter((kind) => kind !== error))
        const others = shuffle(random, kinds.filter((kind) => kind !== error && !related.includes(kind)))
        return {
            problem: made.problem,
            lines: made.labels.map((label, index) => ({ label, latex: bad[index] })),
            wrong,
            error,
            fix: right[wrong],
            options: shuffle(random, [error, ...[...related, ...others].slice(0, 2)])
        }
    }
    throw new Error(`No detective case for ${error}`)
}

/** Six cases: every mistake of the level once, and one more */
export function createProportionDetectiveCases(random: Random, levelIndex: number): ProportionDetectiveCase[] {
    const kinds = proportionDetectiveLevels[levelIndex]
    const order = [...shuffle(random, kinds), ...shuffle(random, kinds)].slice(0, PROPORTION_DETECTIVE_CASES)
    return order.map((error) => createProportionDetectiveCase(random, levelIndex, error))
}

/** One point for the line and one for the kind of mistake */
export function proportionDetectiveStars(score: number): Stars {
    if (score >= 11) return 3
    if (score >= 9) return 2
    if (score >= 6) return 1
    return 0
}
