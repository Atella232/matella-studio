import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   J2 · Zuzena ala alderantzizkoa? (¿Directa o inversa?): a situation or a
   table, and three answers: direct, inverse or neither. The trap is "one
   goes up and the other goes down, so it is inverse" or "both go up, so it
   is direct": only a constant quotient makes it direct and only a
   constant product makes it inverse. Level 1: situations; level 2:
   tables; level 3: both, with tables that rise or fall without being
   proportional.
   ========================================================================== */

export type Relation = 'direct' | 'inverse' | 'none'
export const RELATIONS: Relation[] = ['direct', 'inverse', 'none']
export const KIND_ROUNDS = 8

export type KindRound =
    | { shown: 'situation'; text: LocalizedText; answer: Relation; why: LocalizedText }
    | { shown: 'table'; xs: number[]; ys: number[]; answer: Relation; why: LocalizedText }

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

/** Situations from everyday life, with the reason for each */
export const SITUATIONS: Array<{ text: LocalizedText; answer: Relation; why: LocalizedText }> = [
    { text: say('Erositako fruta-kiloak eta ordaindutakoa', 'Los kilos de fruta comprados y lo que se paga', 'كيلوات الفاكهة المشتراة والمبلغ المدفوع', 'The kilos of fruit bought and the money paid'), answer: 'direct', why: say('Kilo bikoitzak, prezio bikoitza.', 'El doble de kilos cuesta el doble.', 'ضعف الكيلوات يكلّف الضعف.', 'Twice the kilos cost twice as much.') },
    { text: say('Obra bateko langileak eta behar dituzten egunak', 'Los obreros de una obra y los días que tardan', 'عمال ورشة والأيام التي يحتاجونها', 'The workers on a job and the days they take'), answer: 'inverse', why: say('Langile bikoitzak, egunen erdia.', 'El doble de obreros tarda la mitad.', 'ضعف العمال يحتاج نصف الأيام.', 'Twice the workers take half the time.') },
    { text: say('Pertsona baten adina eta altuera', 'La edad de una persona y su altura', 'عمر الشخص وطوله', 'A person’s age and height'), answer: 'none', why: say('Adin bikoitzak ez du altuera bikoitza ematen.', 'El doble de edad no da el doble de altura.', 'ضعف العمر لا يعطي ضعف الطول.', 'Twice the age does not mean twice the height.') },
    { text: say('Bidaia bateko abiadura eta denbora', 'La velocidad y el tiempo de un mismo viaje', 'السرعة والزمن في الرحلة نفسها', 'The speed and the time of the same trip'), answer: 'inverse', why: say('Abiadura bikoitza, denboraren erdia.', 'Al doble de velocidad, la mitad de tiempo.', 'بضعف السرعة نصف الزمن.', 'At twice the speed, half the time.') },
    { text: say('Karratu baten aldea eta azalera', 'El lado de un cuadrado y su área', 'ضلع المربع ومساحته', 'The side of a square and its area'), answer: 'none', why: say('Biak hazten dira, baina alde bikoitzak azalera laukoitza du.', 'Los dos crecen, pero el doble de lado da cuatro veces el área.', 'كلاهما يكبر، لكن ضعف الضلع يعطي أربعة أضعاف المساحة.', 'Both grow, but twice the side gives four times the area.') },
    { text: say('Karratu baten aldea eta perimetroa', 'El lado de un cuadrado y su perímetro', 'ضلع المربع ومحيطه', 'The side of a square and its perimeter'), answer: 'direct', why: say('Perimetroa beti aldea bider 4 da.', 'El perímetro es siempre el lado por 4.', 'المحيط دائمًا الضلع في 4.', 'The perimeter is always the side times 4.') },
    { text: say('Igerileku bat betetzen duten txorrota berdinak eta denbora', 'Los grifos iguales que llenan una piscina y el tiempo', 'الصنابير المتماثلة التي تملأ مسبحًا والزمن', 'The equal taps filling a pool and the time it takes'), answer: 'inverse', why: say('Txorrota bikoitzak, denboraren erdia.', 'El doble de grifos, la mitad de tiempo.', 'ضعف الصنابير نصف الزمن.', 'Twice the taps, half the time.') },
    { text: say('Gasolina-litroak eta egindako kilometroak', 'Los litros de gasolina y los kilómetros recorridos', 'لترات الوقود والكيلومترات المقطوعة', 'The litres of petrol and the kilometres driven'), answer: 'direct', why: say('Litro bikoitzak, kilometro bikoitzak.', 'El doble de litros, el doble de kilómetros.', 'ضعف اللترات ضعف الكيلومترات.', 'Twice the litres, twice the kilometres.') },
    { text: say('Sari bat partekatzen duten pertsonak eta bakoitzak jasotzen duena', 'Las personas que comparten un premio y lo que cobra cada una', 'الأشخاص الذين يتقاسمون جائزة وما يناله كل منهم', 'The people sharing a prize and what each one gets'), answer: 'inverse', why: say('Pertsona bikoitzak, bakoitzari erdia.', 'El doble de personas, la mitad para cada una.', 'ضعف الأشخاص نصف النصيب لكل منهم.', 'Twice the people, half for each.') },
    { text: say('Eguneko ordua eta tenperatura', 'La hora del día y la temperatura', 'ساعة النهار ودرجة الحرارة', 'The time of day and the temperature'), answer: 'none', why: say('Igo eta jaitsi egiten da arau finkorik gabe.', 'Sube y baja sin ninguna regla fija.', 'ترتفع وتنخفض دون قاعدة ثابتة.', 'It rises and falls with no fixed rule.') },
    { text: say('Erositako sarrerak eta ordaindutako dirua', 'Las entradas compradas y el dinero pagado', 'التذاكر المشتراة والمال المدفوع', 'The tickets bought and the money paid'), answer: 'direct', why: say('Sarrera bakoitzak berdin balio du.', 'Cada entrada cuesta lo mismo.', 'كل تذكرة بالسعر نفسه.', 'Each ticket costs the same.') },
    { text: say('Kotxe baten adina eta haren prezioa', 'Los años de un coche y su precio', 'عمر السيارة وسعرها', 'The age of a car and its price'), answer: 'none', why: say('Bata igotzean bestea jaisten da, baina ez da biderkadura konstantea.', 'Al subir uno, el otro baja, pero el producto no es constante.', 'إذا زاد أحدهما نقص الآخر، لكن حاصل الضرب ليس ثابتًا.', 'One goes up and the other goes down, but the product is not constant.') },
    { text: say('Ontzi berdinak eta bakoitzean sartzen den ura, depositu bat husteko', 'Los cubos iguales y el agua de cada uno, para vaciar un depósito', 'الدلاء المتماثلة وماء كل منها لتفريغ خزان', 'The equal buckets and the water in each, to empty a tank'), answer: 'inverse', why: say('Ontzi bikoitzak, bakoitzean erdia.', 'El doble de cubos, la mitad en cada uno.', 'ضعف الدلاء نصف الماء في كل منها.', 'Twice the buckets, half in each.') },
    { text: say('Inprimagailu batek inprimatutako orriak eta denbora', 'Las páginas que imprime una impresora y el tiempo', 'الصفحات التي تطبعها طابعة والزمن', 'The pages a printer prints and the time'), answer: 'direct', why: say('Minutuko orri kopuru bera beti.', 'Siempre las mismas páginas por minuto.', 'دائمًا عدد الصفحات نفسه في الدقيقة.', 'Always the same pages per minute.') }
]

const constant = (values: number[]) => values.every((value) => Math.abs(value - values[0]) < 1e-9)

/** What a table is: constant quotient, constant product or neither */
export function relationOf(xs: number[], ys: number[]): Relation {
    if (constant(xs.map((x, index) => ys[index] / x))) return 'direct'
    if (constant(xs.map((x, index) => ys[index] * x))) return 'inverse'
    return 'none'
}

function tableWhy(xs: number[], ys: number[], answer: Relation): LocalizedText {
    if (answer === 'direct') {
        const k = ys[0] / xs[0]
        const formula = `\\frac{y}{x}=${k}`
        return say(`Beti $${formula}$: zuzena.`, `Siempre $${formula}$: directa.`, `دائمًا $${formula}$: طردية.`, `Always $${formula}$: direct.`)
    }
    if (answer === 'inverse') {
        const formula = `x\\cdot y=${xs[0] * ys[0]}`
        return say(`Beti $${formula}$: alderantzizkoa.`, `Siempre $${formula}$: inversa.`, `دائمًا $${formula}$: عكسية.`, `Always $${formula}$: inverse.`)
    }
    const quotients = `\\frac{${ys[0]}}{${xs[0]}}\\ne\\frac{${ys[1]}}{${xs[1]}}`
    const products = `${xs[0]}\\cdot ${ys[0]}\\ne ${xs[1]}\\cdot ${ys[1]}`
    return say(`$${quotients}$ eta $${products}$: ez bata ez bestea.`, `$${quotients}$ y $${products}$: ni una ni otra.`, `$${quotients}$ و$${products}$: لا هذه ولا تلك.`, `$${quotients}$ and $${products}$: neither.`)
}

function table(random: Random, answer: Relation, tricky: boolean): KindRound {
    for (;;) {
        let xs: number[]
        let ys: number[]
        if (answer === 'direct') {
            const k = randomInt(random, 2, 6)
            xs = shuffle(random, Array.from({ length: 10 }, (_, index) => index + 1)).slice(0, 4).sort((a, b) => a - b)
            ys = xs.map((x) => k * x)
        } else if (answer === 'inverse') {
            const product = pick(random, [12, 24, 36, 48, 60, 72])
            const divisors = Array.from({ length: product }, (_, index) => index + 1).filter((d) => product % d === 0 && d < product)
            xs = shuffle(random, divisors).slice(0, 4).sort((a, b) => a - b)
            ys = xs.map((x) => product / x)
        } else {
            xs = shuffle(random, Array.from({ length: 8 }, (_, index) => index + 1)).slice(0, 4).sort((a, b) => a - b)
            const c = randomInt(random, 2, 9)
            // Tricky tables move like a proportion: one falling as the other rises, or both rising fast
            const shape = tricky ? pick(random, ['fall', 'square', 'add']) : pick(random, ['add', 'fall'])
            ys = xs.map((x) => (shape === 'fall' ? 2 * c + 10 - x : shape === 'square' ? x * x : x + c))
        }
        if (relationOf(xs, ys) !== answer || ys.some((y) => y <= 0)) continue
        return { shown: 'table', xs, ys, answer, why: tableWhy(xs, ys, answer) }
    }
}

export function createKindRounds(random: Random, levelIndex: number): KindRound[] {
    // Every answer at least twice, so no button can be pressed blindly
    const answers = shuffle(random, [...RELATIONS, ...RELATIONS, ...shuffle(random, RELATIONS).slice(0, KIND_ROUNDS - 6)])
    const situations = shuffle(random, SITUATIONS)
    return answers.map((answer, index) => {
        const asTable = levelIndex === 1 || (levelIndex === 2 && index % 2 === 1)
        if (asTable) return table(random, answer, levelIndex === 2)
        const situation = situations.find((item) => item.answer === answer)!
        situations.splice(situations.indexOf(situation), 1)
        return { shown: 'situation', ...situation }
    })
}

export function kindStars(score: number): Stars {
    if (score >= 8) return 3
    if (score >= 6) return 2
    if (score >= 4) return 1
    return 0
}
