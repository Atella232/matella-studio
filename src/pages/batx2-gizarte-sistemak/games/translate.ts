import { randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   J2 · Itzuli esaldia (Traduce la frase): one sentence of a problem and
   four equations; only one says it. The wrong ones are the usual slips:
   «twice» the other way round, «more than» on the wrong side, a sum where
   there is a ratio. Level 1: total, twice, more than. Level 2: less than,
   half, exceeds. Level 3: ratios, points of an exam, percentages. Every
   template carries a sample of values that makes its sentence true, so
   the tests can check that only the right equation holds.
   ========================================================================== */

export const TRANSLATE_ROUNDS = 5

export interface TranslateRound {
    sentence: LocalizedText
    /** What each letter means */
    letters: LocalizedText
    options: string[]
    answer: number
    right: string
    /** Values that make the sentence true */
    sample: Record<string, number>
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

type Template = (random: Random) => Omit<TranslateRound, 'options' | 'answer'> & { wrong: string[] }

const FUNDS = say('$x,\\ y,\\ z$: A, B eta C fondoetako milaka euroak', '$x,\\ y,\\ z$: miles de euros en A, B y C', '$x,\\ y,\\ z$: آلاف اليوروهات في A وB وC', '$x,\\ y,\\ z$: thousands of euros in A, B and C')
const KILOS = say('$x$: kafe-kiloak; $y$: te-kiloak', '$x$: kilos de café; $y$: kilos de té', '$x$: كيلوغرامات القهوة؛ $y$: كيلوغرامات الشاي', '$x$: kilos of coffee; $y$: kilos of tea')
const PRICES = say('$x$: A-ren prezioa; $y$: B-ren prezioa (euro)', '$x$: precio de A; $y$: precio de B (€)', '$x$: سعر A؛ $y$: سعر B (€)', '$x$: price of A; $y$: price of B (€)')
const EXAM = say('$a$: asmatuak; $f$: hutsak', '$a$: aciertos; $f$: fallos', '$a$: الصحيحة؛ $f$: الخاطئة', '$a$: right answers; $f$: wrong answers')

const total: Template = (random) => {
    const t = randomInt(random, 12, 40)
    return { sentence: say(`Guztira ${t} mila euro inbertitzen dira.`, `En total se invierten ${t} mil euros.`, `يُستثمر ${t} ألف يورو إجمالًا.`, `${t} thousand euros are invested in total.`), letters: FUNDS, right: `x+y+z=${t}`, wrong: [`x+y=${t}`, `3x=${t}`, `x+y+z=3\\cdot ${t}`], sample: { x: t - 3, y: 2, z: 1 } }
}
const twice: Template = (random) => {
    const k = randomInt(random, 2, 4)
    return { sentence: say(`B fondoan A fondoan bezainbeste bider ${k}.`, `En B, ${k} veces lo que en A.`, `في B ${k} أضعاف ما في A.`, `In B, ${k} times as much as in A.`), letters: FUNDS, right: `y=${k}x`, wrong: [`x=${k}y`, `y=x+${k}`, `x+y=${k}`], sample: { x: 3, y: 3 * k, z: 0 } }
}
const more: Template = (random) => {
    const n = randomInt(random, 2, 9)
    return { sentence: say(`C fondoan A fondoan baino ${n} mila gehiago.`, `En C, ${n} mil más que en A.`, `في C أكثر مما في A بـ ${n} آلاف.`, `In C, ${n} thousand more than in A.`), letters: FUNDS, right: `z=x+${n}`, wrong: [`x=z+${n}`, `z=${n}x`, `x+z=${n}`], sample: { x: 4, y: 0, z: 4 + n } }
}
const less: Template = (random) => {
    const n = randomInt(random, 2, 6)
    return { sentence: say(`Kafea baino ${n} kilo te gutxiago saldu da.`, `Se han vendido ${n} kilos menos de té que de café.`, `بيع من الشاي أقل من القهوة بـ ${n} كيلوغرامات.`, `${n} kilos less tea than coffee have been sold.`), letters: KILOS, right: `y=x-${n}`, wrong: [`x=y-${n}`, `y=${n}-x`, `x+y=${n}`], sample: { x: n + 5, y: 5 } }
}
const half: Template = () => ({ sentence: say('Te-kiloak kafe-kiloen erdia dira.', 'De té se vende la mitad que de café.', 'يُباع من الشاي نصف ما يُباع من القهوة.', 'Half as much tea as coffee is sold.'), letters: KILOS, right: 'x=2y', wrong: ['y=2x', 'x+y=2', 'x-y=2'], sample: { x: 8, y: 4 } })
const exceeds: Template = (random) => {
    const n = randomInt(random, 2, 9)
    return { sentence: say(`A-ren prezioak B-rena ${n} eurotan gainditzen du.`, `El precio de A supera en ${n} € al de B.`, `يزيد سعر A على سعر B بـ ${n} €.`, `The price of A is €${n} more than that of B.`), letters: PRICES, right: `x=y+${n}`, wrong: [`y=x+${n}`, `x=${n}y`, `x+y=${n}`], sample: { x: 3 + n, y: 3 } }
}
const ratio: Template = () => ({ sentence: say('A-ko 3 sortako, B-ko 2 saltzen dira.', 'Por cada 3 lotes de A se venden 2 de B.', 'مقابل كل 3 مجموعات من A تُباع 2 من B.', 'For every 3 bundles of A, 2 of B are sold.'), letters: PRICES, right: '2x=3y', wrong: ['3x=2y', 'x+y=5', 'x-y=1'], sample: { x: 6, y: 4 } })
const points: Template = (random) => {
    const p = randomInt(random, 20, 40)
    return { sentence: say(`Asmatze bakoitzak 3 puntu ematen ditu eta huts bakoitzak bat kentzen du: guztira ${p} puntu.`, `Cada acierto da 3 puntos y cada fallo quita 1: en total, ${p} puntos.`, `كل إجابة صحيحة تعطي 3 نقاط وكل خاطئة تنقص 1: المجموع ${p} نقطة.`, `Each right answer gives 3 points and each wrong one takes 1 away: ${p} points in total.`), letters: EXAM, right: `3a-f=${p}`, wrong: [`3a+f=${p}`, `a-3f=${p}`, `3(a-f)=${p}`], sample: { a: Math.ceil(p / 3) + 1, f: 3 * (Math.ceil(p / 3) + 1) - p } }
}
const percent: Template = (random) => {
    const n = 10 * randomInt(random, 1, 4)
    return { sentence: say(`B-k A-k baino % ${n} gehiago balio du.`, `B cuesta un ${n} % más que A.`, `B أغلى من A بنسبة ${n} %.`, `B costs ${n}% more than A.`), letters: PRICES, right: `y=${1 + n / 100}x`.replace('.', '{,}'), wrong: [`y=x+${n}`, `y=${n / 100}x`.replace('.', '{,}'), `x=${1 + n / 100}y`.replace('.', '{,}')], sample: { x: 10, y: 10 + n / 10 } }
}

export const TRANSLATE_LEVELS: Template[][] = [[total, twice, more], [less, half, exceeds], [ratio, points, percent]]

export function createTranslateRounds(random: Random, level: number): TranslateRound[] {
    const templates = TRANSLATE_LEVELS[level] ?? TRANSLATE_LEVELS[0]
    const order = shuffle(random, [...templates, ...templates]).slice(0, TRANSLATE_ROUNDS)
    return order.map((template) => {
        const made = template(random)
        const options = shuffle(random, [made.right, ...made.wrong])
        return { sentence: made.sentence, letters: made.letters, right: made.right, sample: made.sample, options, answer: options.indexOf(made.right) }
    })
}
