import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Proportzionaltasunaren detektibea (1. DBH proportionality): a worked
   answer of three lines with one wrong line. Level 1: ratios and direct
   proportion (the difference added instead of keeping the ratio, the rule
   of three upside down, the ratio written the other way round); level 2:
   inverse proportion (solved as direct, the difference taken away, the sum
   kept instead of the product); level 3: percentages (the amount divided by
   the percentage, the discount given as the price, the rise divided by the
   new price).
   ========================================================================== */

export type ProportionDetectiveError =
    | 'additive'
    | 'rule-upside-down'
    | 'ratio-swap'
    | 'inverse-as-direct'
    | 'inverse-additive'
    | 'constant-sum'
    | 'percent-divide'
    | 'discount-as-price'
    | 'percent-wrong-base'

export const proportionDetectiveLevels: ProportionDetectiveError[][] = [
    ['additive', 'rule-upside-down', 'ratio-swap'],
    ['inverse-as-direct', 'inverse-additive', 'constant-sum'],
    ['percent-divide', 'discount-as-price', 'percent-wrong-base']
]

export const PROPORTION_DETECTIVE_CASES = 6

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
/** A number in a formula, with the decimal comma as {,} */
const n = (value: number) => String(Math.round(value * 100) / 100).replace('.', '{,}')
const LABELS = {
    difference: say('Aldea', 'Diferencia', 'الفرق', 'Difference'),
    answer: say('Erantzuna', 'Respuesta', 'الجواب', 'Answer'),
    rule: say('Hiruko erregela', 'Regla de tres', 'القاعدة الثلاثية', 'Rule of three'),
    step2: say('2. urratsa', 'Paso 2', 'الخطوة 2', 'Step 2'),
    ratio: say('Arrazoia', 'Razón', 'النسبة', 'Ratio'),
    simplify: say('Sinplifikatu', 'Simplifica', 'اختزل', 'Simplify'),
    decimal: say('Hamartarra', 'Decimal', 'عدد عشري', 'Decimal'),
    times: say('Zenbat aldiz', 'Cuántas veces', 'كم مرة', 'How many times'),
    constant: say('Konstantea', 'Constante', 'الثابت', 'Constant'),
    discount: say('Deskontua', 'Descuento', 'التخفيض', 'Discount'),
    price: say('Azken prezioa', 'Precio final', 'السعر النهائي', 'Final price'),
    shirt: say('Kamiseta', 'Camiseta', 'القميص', 'T-shirt'),
    total: say('Guztira', 'Total', 'المجموع', 'Total'),
    rise: say('Igoera', 'Subida', 'الزيادة', 'Rise'),
    fraction: say('Zatikia', 'Fracción', 'الكسر', 'Fraction'),
    percent: say('Ehunekoa', 'Porcentaje', 'النسبة المئوية', 'Percentage')
}

export const proportionDetectiveNames: Record<ProportionDetectiveError, LocalizedText> = {
    'additive': say('Aldea batu du, proportzioa mantendu beharrean', 'Sumó la diferencia en vez de mantener la proporción', 'جمع الفرق بدل الحفاظ على التناسب', 'Added the difference instead of keeping the ratio'),
    'rule-upside-down': say('Hiruko erregela alderantziz jarri du', 'Planteó la regla de tres al revés', 'وضع القاعدة الثلاثية بالعكس', 'Set up the rule of three upside down'),
    'ratio-swap': say('Arrazoia alderantziz idatzi du', 'Escribió la razón al revés', 'كتب النسبة بالعكس', 'Wrote the ratio the other way round'),
    'inverse-as-direct': say('Alderantzizko proportzioa zuzena balitz bezala ebatzi du', 'Resolvió una proporción inversa como directa', 'حلّ تناسبًا عكسيًا كأنه طردي', 'Solved an inverse proportion as a direct one'),
    'inverse-additive': say('Aldea kendu du, proportzioa erabili beharrean', 'Restó la diferencia en vez de usar la proporción', 'طرح الفرق بدل استعمال التناسب', 'Took away the difference instead of using the proportion'),
    'constant-sum': say('Batura mantendu du, biderkadura beharrean', 'Mantuvo la suma en vez del producto', 'أبقى المجموع ثابتًا بدل الجداء', 'Kept the sum constant instead of the product'),
    'percent-divide': say('Kantitatea ehunekoaz zatitu du', 'Dividió la cantidad entre el porcentaje', 'قسم الكمية على النسبة المئوية', 'Divided the amount by the percentage'),
    'discount-as-price': say('Deskontua prezioa balitz bezala hartu du', 'Tomó el descuento como si fuera el precio', 'أخذ التخفيض كأنه السعر', 'Took the discount as if it were the price'),
    'percent-wrong-base': say('Igoera prezio berriaz zatitu du, hasierakoaz beharrean', 'Dividió la subida entre el precio nuevo y no el inicial', 'قسم الزيادة على السعر الجديد لا الأصلي', 'Divided the rise by the new price, not the starting one')
}

export const proportionDetectiveTips: Record<ProportionDetectiveError, LocalizedText> = {
    'additive': say('Proportzio zuzenean biderkatu edo zatitu egiten da: bikoitza, bikoitza.', 'En la proporción directa se multiplica o se divide: el doble, el doble.', 'في التناسب الطردي نضرب أو نقسم: الضعف يعطي الضعف.', 'In direct proportion you multiply or divide: double gives double.'),
    'rule-upside-down': say('Lerro bakoitzean magnitude bera: $\\frac{a}{b}=\\frac{c}{x}$.', 'En cada fila, la misma magnitud: $\\frac{a}{b}=\\frac{c}{x}$.', 'في كل سطر المقدار نفسه: $\\frac{a}{b}=\\frac{c}{x}$.', 'Each row holds the same quantity: $\\frac{a}{b}=\\frac{c}{x}$.'),
    'ratio-swap': say('«a eta b-ren arteko arrazoia» $\\frac{a}{b}$ da, ordena berean.', 'La razón «de a a b» es $\\frac{a}{b}$, en ese orden.', 'النسبة «من a إلى b» هي $\\frac{a}{b}$ بهذا الترتيب.', 'The ratio “of a to b” is $\\frac{a}{b}$, in that order.'),
    'inverse-as-direct': say('Langile gehiago, egun gutxiago: alderantzizkoa. Biderkadura mantentzen da.', 'Más obreros, menos días: es inversa. Se mantiene el producto.', 'عمال أكثر وأيام أقل: تناسب عكسي، والجداء ثابت.', 'More workers, fewer days: it is inverse. The product stays the same.'),
    'inverse-additive': say('Alderantzizkoan, biderkadura konstantea da: $a\\cdot b=c\\cdot x$.', 'En la inversa, el producto es constante: $a\\cdot b=c\\cdot x$.', 'في التناسب العكسي الجداء ثابت: $a\\cdot b=c\\cdot x$.', 'In inverse proportion the product is constant: $a\\cdot b=c\\cdot x$.'),
    'constant-sum': say('Konstante dena biderkadura da, ez batura.', 'Lo constante es el producto, no la suma.', 'الثابت هو الجداء لا المجموع.', 'What stays the same is the product, not the sum.'),
    'percent-divide': say('$p\\,\\%$ kalkulatzeko: kantitatea bider $p$, zati $100$.', 'El $p\\,\\%$ de una cantidad: por $p$ y entre $100$.', 'لحساب $p\\,\\%$ من كمية: نضرب في $p$ ونقسم على $100$.', '$p\\,\\%$ of an amount: times $p$, divided by $100$.'),
    'discount-as-price': say('Azken prezioa = hasierako prezioa − deskontua.', 'Precio final = precio inicial − descuento.', 'السعر النهائي = السعر الأصلي − التخفيض.', 'Final price = starting price − discount.'),
    'percent-wrong-base': say('Ehunekoa beti hasierako balioaren gainean: igoera zati hasierakoa.', 'El porcentaje, siempre sobre el valor inicial: igual a la subida entre el inicial.', 'النسبة دائمًا من القيمة الأصلية: الزيادة مقسومة على الأصلية.', 'The percentage is always of the starting value: the rise divided by the start.')
}

type Built = Omit<WorkedCase<ProportionDetectiveError>, 'options'>

function build(random: Random, error: ProportionDetectiveError): Built | null {
    switch (error) {
        case 'additive': {
            const [p, q] = [randomInt(random, 2, 6), randomInt(random, 3, 9)]
            const unit = pick(random, [1.5, 2, 2.5, 3, 4])
            const cost = unit * p
            if (q === p || !Number.isInteger(cost) || q - p + cost === unit * q) return null
            return {
                problem: say(`$${p}$ koaderno $${n(cost)}$ € dira. Zenbat balio dute $${q}$ koadernok?`, `$${p}$ cuadernos cuestan $${n(cost)}$ €. ¿Cuánto cuestan $${q}$ cuadernos?`, `ثمن $${p}$ دفاتر $${n(cost)}$ يورو. كم ثمن $${q}$ دفاتر؟`, `$${p}$ notebooks cost €$${n(cost)}$. How much do $${q}$ notebooks cost?`),
                lines: [line(LABELS.difference, `${q}-${p}=${q - p}`), line(LABELS.step2, `${n(cost)}+${q - p}=${n(cost + q - p)}`), line(LABELS.answer, n(cost + q - p))],
                wrong: 1, error, fix: `${n(cost)}\\div ${p}=${n(unit)}\\ \\to\\ ${n(unit)}\\cdot ${q}=${n(unit * q)}`, right: unit * q, reached: cost + q - p
            }
        }
        case 'rule-upside-down': {
            const [p, q] = [randomInt(random, 2, 5), randomInt(random, 3, 10)]
            const unit = randomInt(random, 2, 6)
            const cost = unit * p
            const wrong = (cost * p) / q
            if (q === p || Math.round(wrong * 100) !== wrong * 100) return null
            return {
                problem: say(`$${p}$ kg sagar $${cost}$ € dira. Zenbat balio dute $${q}$ kg-k?`, `$${p}$ kg de manzanas cuestan $${cost}$ €. ¿Cuánto cuestan $${q}$ kg?`, `ثمن $${p}$ كغ من التفاح $${cost}$ يورو. كم ثمن $${q}$ كغ؟`, `$${p}$ kg of apples cost €$${cost}$. How much do $${q}$ kg cost?`),
                lines: [line(LABELS.rule, `x=\\frac{${cost}\\cdot ${p}}{${q}}`), line(LABELS.step2, `x=\\frac{${cost * p}}{${q}}`), line(LABELS.answer, `x=${n(wrong)}`)],
                wrong: 0, error, fix: `x=\\frac{${cost}\\cdot ${q}}{${p}}=${unit * q}`, right: unit * q, reached: wrong
            }
        }
        case 'ratio-swap': {
            const [a, b] = pick(random, [[2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [1, 2], [1, 4]] as Array<[number, number]>)
            const k = randomInt(random, 2, 6)
            const [girls, boys] = [a * k, b * k]
            return {
                problem: say(`Klase batean $${girls}$ neska eta $${boys}$ mutil daude. Zein da nesken eta mutilen arteko arrazoia?`, `En una clase hay $${girls}$ chicas y $${boys}$ chicos. ¿Cuál es la razón de chicas a chicos?`, `في صف $${girls}$ بنتًا و$${boys}$ ولدًا. ما نسبة البنات إلى الأولاد؟`, `A class has $${girls}$ girls and $${boys}$ boys. What is the ratio of girls to boys?`),
                lines: [line(LABELS.ratio, `\\frac{${boys}}{${girls}}`), line(LABELS.simplify, `\\frac{${boys}}{${girls}}=\\frac{${b}}{${a}}`), line(LABELS.decimal, `\\frac{${b}}{${a}}=${n(b / a)}`)],
                wrong: 0, error, fix: `\\frac{${girls}}{${boys}}=\\frac{${a}}{${b}}`, right: a / b, reached: Math.round((b / a) * 100) / 100
            }
        }
        case 'inverse-as-direct': {
            const [workers, factor] = [randomInt(random, 2, 4), pick(random, [2, 3])]
            const days = factor * randomInt(random, 2, 6)
            const more = workers * factor
            return {
                problem: say(`$${workers}$ langilek $${days}$ egun behar dituzte horma bat margotzeko. Zenbat egun beharko dituzte $${more}$ langilek?`, `$${workers}$ pintores tardan $${days}$ días en pintar un muro. ¿Cuántos días tardarán $${more}$ pintores?`, `يحتاج $${workers}$ دهّانين إلى $${days}$ أيام لطلاء جدار. كم يومًا يحتاج $${more}$ دهّانين؟`, `$${workers}$ painters take $${days}$ days to paint a wall. How many days will $${more}$ painters take?`),
                lines: [line(LABELS.times, `${more}\\div ${workers}=${factor}`), line(LABELS.step2, `${days}\\cdot ${factor}=${days * factor}`), line(LABELS.answer, `${days * factor}`)],
                wrong: 1, error, fix: `${days}\\div ${factor}=${days / factor}`, right: days / factor, reached: days * factor
            }
        }
        case 'inverse-additive': {
            const [taps, hours] = [randomInt(random, 2, 4), randomInt(random, 6, 12)]
            const more = taps + randomInt(random, 1, 3)
            const right = (taps * hours) / more
            if (!Number.isInteger(right) || right === hours - (more - taps)) return null
            return {
                problem: say(`$${taps}$ txorrotek $${hours}$ ordu behar dituzte depositua betetzeko. Zenbat ordu $${more}$ txorrotekin?`, `$${taps}$ grifos llenan un depósito en $${hours}$ horas. ¿Cuántas horas con $${more}$ grifos?`, `تملأ $${taps}$ صنابير خزانًا في $${hours}$ ساعات. كم ساعة مع $${more}$ صنابير؟`, `$${taps}$ taps fill a tank in $${hours}$ hours. How many hours with $${more}$ taps?`),
                lines: [line(LABELS.difference, `${more}-${taps}=${more - taps}`), line(LABELS.step2, `${hours}-${more - taps}=${hours - (more - taps)}`), line(LABELS.answer, `${hours - (more - taps)}`)],
                wrong: 1, error, fix: `${taps}\\cdot ${hours}=${taps * hours}\\ \\to\\ ${taps * hours}\\div ${more}=${right}`, right, reached: hours - (more - taps)
            }
        }
        case 'constant-sum': {
            const [workers, days] = [randomInt(random, 3, 8), randomInt(random, 6, 12)]
            const fewer = randomInt(random, 2, workers - 1)
            const right = (workers * days) / fewer
            const reached = workers + days - fewer
            if (!Number.isInteger(right) || right === reached) return null
            return {
                problem: say(`$${workers}$ langilek $${days}$ egunetan egiten dute lan bat. Zenbat egun beharko dituzte $${fewer}$ langilek?`, `$${workers}$ obreros hacen un trabajo en $${days}$ días. ¿Cuántos días tardarán $${fewer}$ obreros?`, `يُنجز $${workers}$ عمال عملًا في $${days}$ أيام. كم يومًا يحتاج $${fewer}$ عمال؟`, `$${workers}$ workers do a job in $${days}$ days. How many days will $${fewer}$ workers take?`),
                lines: [line(LABELS.constant, `${workers}+${days}=${workers + days}`), line(LABELS.step2, `${workers + days}-${fewer}=${reached}`), line(LABELS.answer, `${reached}`)],
                wrong: 0, error, fix: `${workers}\\cdot ${days}=${workers * days}\\ \\to\\ ${workers * days}\\div ${fewer}=${right}`, right, reached
            }
        }
        case 'percent-divide': {
            const price = pick(random, [20, 40, 50, 60, 80])
            const percent = pick(random, [10, 20, 25, 40])
            const wrongDiscount = price / percent
            const right = price - (price * percent) / 100
            if (Math.round(wrongDiscount * 100) !== wrongDiscount * 100) return null
            return {
                problem: say(`$${price}$ €-ko jaka batek $${percent}\\,\\%$-ko deskontua du. Zenbat ordaintzen da?`, `Una chaqueta de $${price}$ € tiene un descuento del $${percent}\\,\\%$. ¿Cuánto se paga?`, `سترة ثمنها $${price}$ يورو عليها تخفيض $${percent}\\,\\%$. كم ندفع؟`, `A jacket costs €$${price}$ with a $${percent}\\,\\%$ discount. How much do you pay?`),
                lines: [line(LABELS.discount, `${price}\\div ${percent}=${n(wrongDiscount)}`), line(LABELS.price, `${price}-${n(wrongDiscount)}`), line(LABELS.answer, n(price - wrongDiscount))],
                wrong: 0, error, fix: `${price}\\cdot ${percent}\\div 100=${n((price * percent) / 100)}\\ \\to\\ ${price}-${n((price * percent) / 100)}=${n(right)}`, right, reached: price - wrongDiscount
            }
        }
        case 'discount-as-price': {
            const price = pick(random, [20, 30, 40, 50, 60])
            const percent = pick(random, [10, 20, 30, 40])
            const socks = randomInt(random, 3, 9)
            const discount = (price * percent) / 100
            return {
                problem: say(`$${price}$ €-ko kamiseta bat $${percent}\\,\\%$-ko deskontuarekin eta $${socks}$ €-ko galtzerdi batzuk erosi dituzu. Zenbat ordaindu duzu?`, `Compras una camiseta de $${price}$ € con un $${percent}\\,\\%$ de descuento y unos calcetines de $${socks}$ €. ¿Cuánto pagas?`, `تشتري قميصًا ثمنه $${price}$ يورو بتخفيض $${percent}\\,\\%$ وجوارب بـ$${socks}$ يورو. كم تدفع؟`, `You buy a €$${price}$ T-shirt with a $${percent}\\,\\%$ discount and some €$${socks}$ socks. How much do you pay?`),
                lines: [line(LABELS.discount, `${price}\\cdot ${percent}\\div 100=${discount}`), line(LABELS.shirt, `${discount}`), line(LABELS.total, `${discount}+${socks}=${discount + socks}`)],
                wrong: 1, error, fix: `${price}-${discount}=${price - discount}\\ \\to\\ ${price - discount}+${socks}=${price - discount + socks}`, right: price - discount + socks, reached: discount + socks
            }
        }
        case 'percent-wrong-base': {
            const [start, percent] = [pick(random, [20, 40, 50, 80]), pick(random, [25, 60, 100])]
            const rise = (start * percent) / 100
            const end = start + rise
            const reached = (rise / end) * 100
            if (Math.round(reached * 100) !== reached * 100) return null
            return {
                problem: say(`Prezio bat $${start}$ €-tik $${n(end)}$ €-ra igo da. Zenbat igo da ehunekotan?`, `Un precio sube de $${start}$ € a $${n(end)}$ €. ¿Qué porcentaje ha subido?`, `ارتفع سعر من $${start}$ يورو إلى $${n(end)}$ يورو. ما نسبة الزيادة؟`, `A price rises from €$${start}$ to €$${n(end)}$. By what percentage has it risen?`),
                lines: [line(LABELS.rise, `${n(end)}-${start}=${n(rise)}`), line(LABELS.fraction, `\\frac{${n(rise)}}{${n(end)}}=${n(rise / end)}`), line(LABELS.percent, `${n(reached)}\\,\\%`)],
                wrong: 1, error, fix: `\\frac{${n(rise)}}{${start}}=${n(rise / start)}\\ \\to\\ ${percent}\\,\\%`, right: percent, reached
            }
        }
    }
}

export const createProportionDetectiveCases = (random: Random, levelIndex: number) => createWorkedCases(random, proportionDetectiveLevels[levelIndex], PROPORTION_DETECTIVE_CASES, build)
