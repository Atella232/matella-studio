import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import { fraction, toLatex } from '../../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Proportzioen detektibea (2. DBH): a worked solution of three lines with
   one wrong line. Level 1: proportions (an inverse relation solved as a
   direct one, a direct one solved as inverse, adding instead of
   multiplying, the price per kilo upside down); level 2: compound
   proportion and sharing (dividing by the number of people, an inverse
   share made direct, a compound rule with one quantity forgotten, a
   quantity in the wrong direction); level 3: percentages (chained
   changes added, the change over the final value, the starting amount by
   taking the percentage off the final one, months used as years).
   ========================================================================== */

export type ProportionDetectiveError =
    | 'inverse-as-direct'
    | 'direct-as-inverse'
    | 'additive'
    | 'unit-rate-inverted'
    | 'share-by-people'
    | 'inverse-share-direct'
    | 'compound-one-only'
    | 'compound-direction'
    | 'percent-add'
    | 'change-on-final'
    | 'initial-by-subtracting'
    | 'interest-months'

export const proportionDetectiveLevels: ProportionDetectiveError[][] = [
    ['inverse-as-direct', 'direct-as-inverse', 'additive', 'unit-rate-inverted'],
    ['share-by-people', 'inverse-share-direct', 'compound-one-only', 'compound-direction'],
    ['percent-add', 'change-on-final', 'initial-by-subtracting', 'interest-months']
]

export const PROPORTION_DETECTIVE_CASES = 6

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    data: say('Datuak', 'Datos', 'المعطيات', 'Data'),
    rule: say('Araua', 'Regla', 'القاعدة', 'Rule'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}
/** A number with at most two decimals, for LaTeX: 12{,}5 */
export const num = (value: number) => String(Math.round(value * 100) / 100).replace('.', '{,}')
const isCents = (value: number) => Math.abs(value * 100 - Math.round(value * 100)) < 1e-9

export const proportionDetectiveNames: Record<ProportionDetectiveError, LocalizedText> = {
    'inverse-as-direct': say('Alderantzizko erlazioa zuzena balitz bezala ebatzi du', 'Resolvió una relación inversa como si fuera directa', 'حلّ علاقة عكسية كأنها طردية', 'Solved an inverse relation as if it were direct'),
    'direct-as-inverse': say('Erlazio zuzena alderantzizkoa balitz bezala ebatzi du', 'Resolvió una relación directa como si fuera inversa', 'حلّ علاقة طردية كأنها عكسية', 'Solved a direct relation as if it were inverse'),
    'additive': say('Kopuru bera batu du, biderkatu beharrean', 'Sumó la misma cantidad en vez de multiplicar', 'جمع المقدار نفسه بدل الضرب', 'Added the same amount instead of multiplying'),
    'unit-rate-inverted': say('Kiloko prezioa alderantziz kalkulatu du: kiloak zati prezioa', 'Calculó el precio por kilo al revés: kilos entre precio', 'حسب سعر الكيلو بالعكس: الكيلوات على السعر', 'Worked out the price per kilo upside down: kilos over price'),
    'share-by-people': say('Pertsona kopuruaz zatitu du, zatien baturaz beharrean', 'Dividió entre el número de personas, no entre la suma de las partes', 'قسم على عدد الأشخاص لا على مجموع الأجزاء', 'Divided by the number of people, not by the sum of the parts'),
    'inverse-share-direct': say('Alderantzizko banaketa zuzena balitz bezala egin du', 'Hizo un reparto inverso como si fuera directo', 'أجرى توزيعًا عكسيًا كأنه طردي', 'Did an inverse share as if it were direct'),
    'compound-one-only': say('Magnitude bat bakarrik kontuan hartu du', 'Solo tuvo en cuenta una de las magnitudes', 'أخذ مقدارًا واحدًا فقط في الحسبان', 'Took only one of the quantities into account'),
    'compound-direction': say('Magnitude bat norabide okerrean erabili du', 'Usó una magnitud en el sentido equivocado', 'استعمل مقدارًا في الاتجاه الخطأ', 'Used one quantity the wrong way round'),
    'percent-add': say('Ehuneko kateatuak batu ditu', 'Sumó los porcentajes encadenados', 'جمع النسب المتتالية', 'Added the chained percentages'),
    'change-on-final': say('Aldakuntza azken balioaren gainean kalkulatu du', 'Calculó la variación sobre el valor final', 'حسب التغيّر على القيمة النهائية', 'Worked out the change over the final value'),
    'initial-by-subtracting': say('Hasierakoa lortzeko, azkenari ehunekoa kendu dio', 'Para la inicial, quitó el porcentaje a la final', 'لإيجاد الأصلية طرح النسبة من النهائية', 'For the starting amount, took the percentage off the final one'),
    'interest-months': say('Hilabeteak urte balira bezala erabili ditu', 'Usó los meses como si fueran años', 'استعمل الأشهر كأنها سنوات', 'Used the months as if they were years')
}

export const proportionDetectiveTips: Record<ProportionDetectiveError, LocalizedText> = {
    'inverse-as-direct': say('Langile gehiagok egun gutxiago behar dituzte: alderantzizkoan, biderkadura da konstantea.', 'Más trabajadores tardan menos días: en la inversa, lo constante es el producto.', 'عمال أكثر يحتاجون أيامًا أقل: في العكسية الثابت هو حاصل الضرب.', 'More workers need fewer days: in an inverse relation the product stays the same.'),
    'direct-as-inverse': say('Kilo gehiagok gehiago balio dute: zuzenean, zatidura da konstantea.', 'Más kilos cuestan más: en la directa, lo constante es el cociente.', 'كيلوات أكثر تكلّف أكثر: في الطردية الثابت هو خارج القسمة.', 'More kilos cost more: in a direct relation the quotient stays the same.'),
    'additive': say('Proportzionaltasunean biderkatzen da: bikoitza, bikoitza.', 'En la proporcionalidad se multiplica: el doble, el doble.', 'في التناسب نضرب: الضعف يقابله الضعف.', 'Proportion multiplies: double one, double the other.'),
    'unit-rate-inverted': say('Kiloko prezioa: prezioa zati kiloak.', 'Precio por kilo: precio entre kilos.', 'سعر الكيلو: السعر على الكيلوات.', 'Price per kilo: price over kilos.'),
    'share-by-people': say('Zatitu zatien baturaz: zati bakoitzak balio duena aterako da.', 'Divide entre la suma de las partes: sale lo que vale cada parte.', 'اقسم على مجموع الأجزاء: يظهر ما يساويه كل جزء.', 'Divide by the sum of the parts: that gives what each part is worth.'),
    'inverse-share-direct': say('Alderantzizkoan, gehiago dagokio zenbaki txikienari: banatu alderantzizkoen arabera.', 'En el inverso, al número menor le toca más: reparte según los inversos.', 'في التوزيع العكسي ينال العدد الأصغر أكثر: وزّع حسب المقلوبات.', 'In an inverse share the smaller number gets more: share by the reciprocals.'),
    'compound-one-only': say('Konposatuan, magnitude guztiek eragiten dute: langile-orduak berdinak dira.', 'En la compuesta influyen todas las magnitudes: las horas de trabajo totales son las mismas.', 'في المركّب تؤثر كل المقادير: مجموع ساعات العمل نفسه.', 'In compound proportion every quantity counts: the total working hours stay the same.'),
    'compound-direction': say('Makina gehiagok denbora gutxiago behar dute: zatiki hori alderantziz doa.', 'Más máquinas tardan menos: esa fracción va al revés.', 'آلات أكثر تحتاج وقتًا أقل: هذا الكسر يُقلب.', 'More machines take less time: that fraction goes upside down.'),
    'percent-add': say('Kateatuetan indizeak biderkatzen dira: $1{,}2\\cdot 0{,}8=0{,}96$.', 'En los encadenados se multiplican los índices: $1{,}2\\cdot 0{,}8=0{,}96$.', 'في المتتالية تُضرب المؤشرات: $1{,}2\\cdot 0{,}8=0{,}96$.', 'Chained changes multiply their multipliers: $1{,}2\\cdot 0{,}8=0{,}96$.'),
    'change-on-final': say('Aldakuntza hasierako balioaren gainean: aldea zati hasierakoa.', 'La variación se calcula sobre el valor inicial: diferencia entre inicial.', 'يُحسب التغيّر على القيمة الأصلية: الفرق على الأصلية.', 'The change is over the starting value: difference over starting value.'),
    'initial-by-subtracting': say('Hasierakoa: zatitu azkena indizeaz.', 'La inicial: divide la final entre el índice.', 'الأصلية: اقسم النهائية على المؤشر.', 'The starting amount: divide the final one by the multiplier.'),
    'interest-months': say('Ehunekoa urtekoa bada, hilabeteak urte bihurtu: $t=\\frac{m}{12}$.', 'Si el rédito es anual, pasa los meses a años: $t=\\frac{m}{12}$.', 'إذا كانت النسبة سنوية فحوّل الأشهر إلى سنوات: $t=\\frac{m}{12}$.', 'If the rate is yearly, turn the months into years: $t=\\frac{m}{12}$.')
}

type Built = Omit<WorkedCase<ProportionDetectiveError>, 'options'>

/* ---------- Level 1: proportions ---------- */

function inverseAsDirect(random: Random): Built {
    const workers = randomInt(random, 2, 6)
    const k = pick(random, [2, 3])
    const more = workers * k
    const days = k * randomInt(random, 2, 6)
    const right = days / k
    const reached = days * k
    return {
        problem: say(`$${workers}$ langilek obra bat $${days}$ egunetan egiten dute. Zenbat egun beharko dituzte $${more}$ langilek?`, `$${workers}$ obreros hacen una obra en $${days}$ días. ¿Cuántos días tardarán $${more}$ obreros?`, `يُنجز $${workers}$ عمال عملًا في $${days}$ يومًا. كم يومًا يحتاج $${more}$ عاملًا؟`, `$${workers}$ workers do a job in $${days}$ days. How many days will $${more}$ workers take?`),
        lines: [line(LABELS.rule, `\\frac{${workers}}{${more}}=\\frac{${days}}{x}`), line(LABELS.step, `x=\\frac{${days}\\cdot ${more}}{${workers}}`), line(LABELS.result, `x=${reached}`)],
        wrong: 0, error: 'inverse-as-direct', fix: `${workers}\\cdot ${days}=${more}\\cdot x\\ \\to\\ x=${right}`, right, reached
    }
}

function directAsInverse(random: Random): Built {
    const kilos = randomInt(random, 2, 5)
    const k = pick(random, [2, 3, 4])
    const more = kilos * k
    const price = kilos * randomInt(random, 2, 6)
    const right = price * k
    const reached = (kilos * price) / more
    return {
        problem: say(`$${kilos}$ kg sagarrek $${price}$ euro balio dute. Zenbat balio dute $${more}$ kg-k?`, `$${kilos}$ kg de manzanas cuestan $${price}$ euros. ¿Cuánto cuestan $${more}$ kg?`, `$${kilos}$ كغ من التفاح ثمنها $${price}$ يورو. كم ثمن $${more}$ كغ؟`, `$${kilos}$ kg of apples cost $${price}$ euros. How much do $${more}$ kg cost?`),
        lines: [line(LABELS.data, `${kilos}\\ \\mathrm{kg}\\to ${price}`), line(LABELS.step, `${kilos}\\cdot ${price}=${more}\\cdot x`), line(LABELS.result, `x=${toLatex(fraction(kilos * price, more))}`)],
        wrong: 1, error: 'direct-as-inverse', fix: `\\frac{${kilos}}{${price}}=\\frac{${more}}{x}\\ \\to\\ x=${right}`, right, reached
    }
}

function additive(random: Random): Built | null {
    const people = pick(random, [2, 3, 4, 5])
    const eggs = people * pick(random, [2, 3])
    const more = people * pick(random, [2, 3, 4])
    const right = (eggs * more) / people
    const reached = eggs + (more - people)
    return {
        problem: say(`Errezeta batek $${people}$ pertsonarentzat $${eggs}$ arrautza behar ditu. Zenbat $${more}$ pertsonarentzat?`, `Una receta para $${people}$ personas lleva $${eggs}$ huevos. ¿Cuántos para $${more}$ personas?`, `وصفة لـ$${people}$ أشخاص تحتاج $${eggs}$ بيضات. كم بيضة لـ$${more}$ أشخاص؟`, `A recipe for $${people}$ people takes $${eggs}$ eggs. How many for $${more}$ people?`),
        lines: [line(LABELS.data, `${people}\\to ${eggs}`), line(LABELS.step, `${more}-${people}=${more - people}\\ \\to\\ ${eggs}+${more - people}`), line(LABELS.result, `x=${reached}`)],
        wrong: 1, error: 'additive', fix: `x=\\frac{${eggs}\\cdot ${more}}{${people}}=${right}`, right, reached
    }
}

function unitRateInverted(random: Random): Built {
    const kilos = pick(random, [2, 3, 4, 5])
    const price = kilos * randomInt(random, 2, 5)
    const more = randomInt(random, 6, 12)
    const wrongRate = fraction(kilos, price)
    const reached = fraction(kilos * more, price)
    return {
        problem: say(`$${kilos}$ kg gaztainek $${price}$ euro balio dute. Zenbat balio dute $${more}$ kg-k?`, `$${kilos}$ kg de castañas cuestan $${price}$ euros. ¿Cuánto cuestan $${more}$ kg?`, `$${kilos}$ كغ من الكستناء ثمنها $${price}$ يورو. كم ثمن $${more}$ كغ؟`, `$${kilos}$ kg of chestnuts cost $${price}$ euros. How much do $${more}$ kg cost?`),
        lines: [line(LABELS.step, `\\frac{${kilos}}{${price}}=${toLatex(wrongRate)}`), line(LABELS.step, `${toLatex(wrongRate)}\\cdot ${more}`), line(LABELS.result, `x=${toLatex(reached)}`)],
        wrong: 0, error: 'unit-rate-inverted', fix: `\\frac{${price}}{${kilos}}=${price / kilos}\\ \\to\\ ${price / kilos}\\cdot ${more}=${(price / kilos) * more}`, right: (price / kilos) * more, reached: (kilos * more) / price
    }
}

/* ---------- Level 2: sharing and compound proportion ---------- */

function shareByPeople(random: Random): Built | null {
    const parts = [randomInt(random, 1, 5), randomInt(random, 2, 6), randomInt(random, 3, 7)]
    const sum = parts[0] + parts[1] + parts[2]
    const unit = randomInt(random, 2, 12) * 3
    const total = sum * unit
    if (total % 3 !== 0 || new Set(parts).size < 3) return null
    const right = unit * parts[0]
    const reached = (total / 3) * parts[0]
    return {
        problem: say(`Banatu $${total}$ euro $${parts[0]}$, $${parts[1]}$ eta $${parts[2]}$ zenbakiekiko zuzenki proportzionalak diren zatitan. Zenbat dagokio lehenari?`, `Reparte $${total}$ euros en partes directamente proporcionales a $${parts[0]}$, $${parts[1]}$ y $${parts[2]}$. ¿Cuánto le toca al primero?`, `وزّع $${total}$ يورو بأجزاء طردية مع $${parts[0]}$ و$${parts[1]}$ و$${parts[2]}$. كم ينال الأول؟`, `Share $${total}$ euros in parts directly proportional to $${parts[0]}$, $${parts[1]}$ and $${parts[2]}$. How much does the first get?`),
        lines: [line(LABELS.step, `\\frac{${total}}{3}=${total / 3}`), line(LABELS.step, `${total / 3}\\cdot ${parts[0]}`), line(LABELS.result, `${reached}`)],
        wrong: 0, error: 'share-by-people', fix: `\\frac{${total}}{${sum}}=${unit}\\ \\to\\ ${unit}\\cdot ${parts[0]}=${right}`, right, reached
    }
}

function inverseShareDirect(random: Random): Built | null {
    const a = randomInt(random, 2, 5)
    const b = randomInt(random, a + 1, 8)
    const total = (a + b) * randomInt(random, 3, 12)
    const right = (total * b) / (a + b)
    const reached = (total * a) / (a + b)
    return {
        problem: say(`Banatu $${total}$ euro $${a}$ eta $${b}$ zenbakiekiko alderantziz proportzionalak diren zatitan. Zenbat dagokio lehenari?`, `Reparte $${total}$ euros en partes inversamente proporcionales a $${a}$ y $${b}$. ¿Cuánto le toca al primero?`, `وزّع $${total}$ يورو بأجزاء عكسية مع $${a}$ و$${b}$. كم ينال الأول؟`, `Share $${total}$ euros in parts inversely proportional to $${a}$ and $${b}$. How much does the first get?`),
        lines: [line(LABELS.step, `${a}+${b}=${a + b}`), line(LABELS.step, `\\frac{${total}}{${a + b}}\\cdot ${a}`), line(LABELS.result, `${reached}`)],
        wrong: 0, error: 'inverse-share-direct', fix: `\\frac{1}{${a}}+\\frac{1}{${b}}=\\frac{${a + b}}{${a * b}}\\ \\to\\ ${total}\\cdot\\frac{${b}}{${a + b}}=${right}`, right, reached
    }
}

function compoundOneOnly(random: Random): Built | null {
    const workers = randomInt(random, 2, 6)
    const hours = pick(random, [4, 5, 6, 8])
    const days = randomInt(random, 3, 10)
    const total = workers * hours * days
    const workers2 = randomInt(random, 2, 10)
    const hours2 = pick(random, [4, 5, 6, 8, 10])
    if (workers2 === workers || hours2 === hours || total % (workers2 * hours2) !== 0 || (days * workers) % workers2 !== 0) return null
    const right = total / (workers2 * hours2)
    const reached = (days * workers) / workers2
    return {
        problem: say(`$${workers}$ langilek, egunean $${hours}$ ordu lan eginez, obra bat $${days}$ egunetan amaitzen dute. Zenbat egun beharko dituzte $${workers2}$ langilek egunean $${hours2}$ ordu lan eginez?`, `$${workers}$ obreros, trabajando $${hours}$ horas al día, acaban una obra en $${days}$ días. ¿Cuántos días tardarán $${workers2}$ obreros trabajando $${hours2}$ horas al día?`, `يُنهي $${workers}$ عمال عملًا في $${days}$ أيام بالعمل $${hours}$ ساعات يوميًا. كم يومًا يحتاج $${workers2}$ عمال بالعمل $${hours2}$ ساعات يوميًا؟`, `$${workers}$ workers, working $${hours}$ hours a day, finish a job in $${days}$ days. How many days will $${workers2}$ workers take working $${hours2}$ hours a day?`),
        lines: [line(LABELS.data, `${workers}\\cdot ${hours}\\cdot ${days}=${total}`), line(LABELS.step, `x=\\frac{${days}\\cdot ${workers}}{${workers2}}`), line(LABELS.result, `x=${reached}`)],
        wrong: 1, error: 'compound-one-only', fix: `x=\\frac{${total}}{${workers2}\\cdot ${hours2}}=${right}`, right, reached
    }
}

function compoundDirection(random: Random): Built | null {
    const machines = randomInt(random, 2, 4)
    const pieces = pick(random, [100, 200, 300])
    const hours = randomInt(random, 2, 6)
    const k1 = pick(random, [2, 3])
    const k2 = pick(random, [2, 3])
    const machines2 = machines * k2
    const pieces2 = pieces * k1
    if ((hours * k1) % k2 !== 0) return null
    const right = (hours * k1) / k2
    const reached = hours * k1 * k2
    return {
        problem: say(`$${machines}$ makinak $${pieces}$ pieza egiten dituzte $${hours}$ ordutan. Zenbat ordu beharko dituzte $${machines2}$ makinak $${pieces2}$ pieza egiteko?`, `$${machines}$ máquinas hacen $${pieces}$ piezas en $${hours}$ horas. ¿Cuántas horas tardarán $${machines2}$ máquinas en hacer $${pieces2}$ piezas?`, `تصنع $${machines}$ آلات $${pieces}$ قطعة في $${hours}$ ساعات. كم ساعة تحتاج $${machines2}$ آلات لصنع $${pieces2}$ قطعة؟`, `$${machines}$ machines make $${pieces}$ parts in $${hours}$ hours. How many hours will $${machines2}$ machines take to make $${pieces2}$ parts?`),
        lines: [line(LABELS.step, `${hours}\\cdot\\frac{${pieces2}}{${pieces}}=${hours * k1}`), line(LABELS.step, `${hours * k1}\\cdot\\frac{${machines2}}{${machines}}`), line(LABELS.result, `x=${reached}`)],
        wrong: 1, error: 'compound-direction', fix: `${hours * k1}\\cdot\\frac{${machines}}{${machines2}}=${right}`, right, reached
    }
}

/* ---------- Level 3: percentages ---------- */

function percentAdd(random: Random): Built | null {
    const price = pick(random, [100, 200, 300, 400, 500, 800])
    const up = pick(random, [10, 20, 25, 30, 40])
    const down = pick(random, [10, 20, 25, 30])
    const right = (price * (100 + up) * (100 - down)) / 10000
    const reached = (price * (100 + up - down)) / 100
    if (!isCents(right)) return null
    const net = up - down
    return {
        problem: say(`$${price}$ euroko prezio bat $${up}\\,\\%$ igo da eta gero $${down}\\,\\%$ jaitsi. Zein da azken prezioa?`, `Un precio de $${price}$ euros sube un $${up}\\,\\%$ y luego baja un $${down}\\,\\%$. ¿Cuál es el precio final?`, `سعر $${price}$ يورو ارتفع $${up}\\,\\%$ ثم انخفض $${down}\\,\\%$. ما السعر النهائي؟`, `A price of $${price}$ euros goes up $${up}\\,\\%$ and then down $${down}\\,\\%$. What is the final price?`),
        lines: [line(LABELS.step, `${up}\\,\\%-${down}\\,\\%=${net}\\,\\%`), line(LABELS.step, `${price}\\cdot ${num(1 + net / 100)}`), line(LABELS.result, `${num(reached)}`)],
        wrong: 0, error: 'percent-add', fix: `${price}\\cdot ${num(1 + up / 100)}\\cdot ${num(1 - down / 100)}=${num(right)}`, right, reached
    }
}

function changeOnFinal(random: Random): Built | null {
    const start = pick(random, [40, 50, 60, 80, 120, 150, 200])
    const rate = pick(random, [10, 20, 25, 50])
    const end = (start * (100 + rate)) / 100
    const difference = end - start
    const reached = (difference / end) * 100
    if (!Number.isInteger(end) || !isCents(reached)) return null
    return {
        problem: say(`Prezio bat $${start}$ eurotik $${end}$ eurora igo da. Zer ehuneko igo da?`, `Un precio pasa de $${start}$ a $${end}$ euros. ¿Qué porcentaje ha subido?`, `ارتفع سعر من $${start}$ إلى $${end}$ يورو. بأي نسبة ارتفع؟`, `A price goes from $${start}$ to $${end}$ euros. By what percentage has it risen?`),
        lines: [line(LABELS.step, `${end}-${start}=${difference}`), line(LABELS.step, `\\frac{${difference}}{${end}}\\cdot 100`), line(LABELS.result, `${num(reached)}\\,\\%`)],
        wrong: 1, error: 'change-on-final', fix: `\\frac{${difference}}{${start}}\\cdot 100=${rate}\\,\\%`, right: rate, reached
    }
}

function initialBySubtracting(random: Random): Built | null {
    const initial = pick(random, [40, 60, 80, 100, 120, 160, 200])
    const rate = pick(random, [10, 20, 25, 50])
    const final = (initial * (100 + rate)) / 100
    const off = (final * rate) / 100
    const reached = final - off
    if (!isCents(final) || !isCents(off)) return null
    return {
        problem: say(`Errekargu bat gehituta ($${rate}\\,\\%$), prezioa $${num(final)}$ euro da. Zein zen prezioa errekargurik gabe?`, `Con un recargo del $${rate}\\,\\%$ el precio es $${num(final)}$ euros. ¿Cuál era el precio sin recargo?`, `مع زيادة $${rate}\\,\\%$ أصبح السعر $${num(final)}$ يورو. ما السعر قبل الزيادة؟`, `With a $${rate}\\,\\%$ surcharge the price is $${num(final)}$ euros. What was the price before it?`),
        lines: [line(LABELS.step, `${num(final)}\\cdot\\frac{${rate}}{100}=${num(off)}`), line(LABELS.step, `${num(final)}-${num(off)}`), line(LABELS.result, `${num(reached)}`)],
        wrong: 0, error: 'initial-by-subtracting', fix: `\\frac{${num(final)}}{${num(1 + rate / 100)}}=${initial}`, right: initial, reached
    }
}

function interestMonths(random: Random): Built | null {
    const capital = pick(random, [600, 1200, 2400, 3000, 6000])
    const rate = randomInt(random, 2, 6)
    const months = pick(random, [3, 4, 6, 8, 9])
    const right = (capital * rate * months) / 1200
    const reached = (capital * rate * months) / 100
    if (!isCents(right)) return null
    return {
        problem: say(`$${capital}$ euro, urteko $${rate}\\,\\%$ interes bakunean, $${months}$ hilabetez. Zenbat interes ematen du?`, `$${capital}$ euros al $${rate}\\,\\%$ anual de interés simple durante $${months}$ meses. ¿Qué interés producen?`, `$${capital}$ يورو بفائدة بسيطة $${rate}\\,\\%$ سنويًا مدة $${months}$ أشهر. ما الفائدة؟`, `$${capital}$ euros at $${rate}\\,\\%$ a year simple interest for $${months}$ months. How much interest do they earn?`),
        lines: [line(LABELS.rule, 'I=\\frac{C\\cdot r\\cdot t}{100}'), line(LABELS.step, `I=\\frac{${capital}\\cdot ${rate}\\cdot ${months}}{100}`), line(LABELS.result, `I=${num(reached)}`)],
        wrong: 1, error: 'interest-months', fix: `I=\\frac{${capital}\\cdot ${rate}\\cdot ${months}}{1200}=${num(right)}`, right, reached
    }
}

const builders: Record<ProportionDetectiveError, (random: Random) => Built | null> = {
    'inverse-as-direct': inverseAsDirect,
    'direct-as-inverse': directAsInverse,
    additive,
    'unit-rate-inverted': unitRateInverted,
    'share-by-people': shareByPeople,
    'inverse-share-direct': inverseShareDirect,
    'compound-one-only': compoundOneOnly,
    'compound-direction': compoundDirection,
    'percent-add': percentAdd,
    'change-on-final': changeOnFinal,
    'initial-by-subtracting': initialBySubtracting,
    'interest-months': interestMonths
}

export const createProportionDetectiveCases = (random: Random, level: number) =>
    createWorkedCases(random, proportionDetectiveLevels[level] ?? proportionDetectiveLevels[0], PROPORTION_DETECTIVE_CASES, (inner, error) => builders[error](inner))
