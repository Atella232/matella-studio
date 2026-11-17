import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import { fraction, toNumber } from '../../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { hundredthsLatex, probLatex, say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'
import { arrangements, combinations } from './order.ts'

/* ==========================================================================
   P-J3 · Probabilitatearen detektibea (Gizarte Zientziak): a worked
   solution of three lines with one wrong line. The mistakes are the ones
   of this unit, in its contexts. Level 1 (counting): order counted in a
   committee, repetition where nothing repeats, favourable and possible
   cases counted in different ways. Level 2 (tables and trees): the grand
   total below a conditional, the condition the other way round, a row and
   a column added as the union, the second branch without the person taken
   out. Level 3 (total and Bayes): the plain average of the rates, the
   priors left out, the sensitivity of a test taken as P(E/+). `right` and
   `reached` only tell the cases apart.
   ========================================================================== */

export type ProbabilityBatx2gDetectiveError =
    | 'order-counted'
    | 'repetition'
    | 'mixed-criteria'
    | 'grand-total'
    | 'swapped-condition'
    | 'union-double'
    | 'no-replacement'
    | 'average-rates'
    | 'forget-prior'
    | 'sensitivity'

export const probabilityBatx2gDetectiveLevels: ProbabilityBatx2gDetectiveError[][] = [
    ['order-counted', 'repetition', 'mixed-criteria'],
    ['grand-total', 'swapped-condition', 'union-double', 'no-replacement'],
    ['average-rates', 'forget-prior', 'sensitivity']
]

export const PROBABILITY_BATX2G_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const h = hundredthsLatex
const LABELS = {
    model: say('Eredua', 'Modelo', 'النموذج', 'Model'),
    count: say('Zenbaketa', 'Recuento', 'العدّ', 'Count'),
    favourable: say('Aldekoak', 'Favorables', 'الملائمة', 'Favourable'),
    possible: say('Posibleak', 'Posibles', 'الممكنة', 'Possible'),
    data: say('Datuak', 'Datos', 'المعطيات', 'Data'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    total: say('Probabilitate osoa', 'Probabilidad total', 'الاحتمال الكلي', 'Total probability'),
    bayes: say('Bayes', 'Bayes', 'بايز', 'Bayes')
}

export const probabilityBatx2gDetectiveNames: Record<ProbabilityBatx2gDetectiveError, LocalizedText> = {
    'order-counted': say('Ordena zenbatu du batzorde batean', 'Contó el orden en una comisión', 'حسب الترتيب في لجنة', 'Counted the order in a committee'),
    repetition: say('Errepikapena onartu du ezin denean', 'Permitió repetir cuando no se puede', 'سمح بالتكرار حيث لا يجوز', 'Allowed repetition where it is not possible'),
    'mixed-criteria': say('Aldekoak eta posibleak irizpide desberdinekin zenbatu ditu', 'Contó favorables y posibles con criterios distintos', 'عدّ الملائمة والممكنة بمعيارين مختلفين', 'Counted favourable and possible cases in different ways'),
    'grand-total': say('Guztizko nagusiaz zatitu du, baldintzaz ordez', 'Dividió entre el total general en vez de entre la condición', 'قسم على المجموع العام بدل الشرط', 'Divided by the grand total instead of by the condition'),
    'swapped-condition': say('Baldintza alderantziz hartu du', 'Tomó la condición al revés', 'أخذ الشرط بالعكس', 'Took the condition the other way round'),
    'union-double': say('Errenkada eta zutabea batu ditu, lauki komuna kendu gabe', 'Sumó fila y columna sin quitar la casilla común', 'جمع الصف والعمود دون طرح الخانة المشتركة', 'Added a row and a column without taking off the shared cell'),
    'no-replacement': say('Bigarren adarrean ez du kendu aukeratutako pertsona', 'En la segunda rama no quitó a la persona elegida', 'لم يُنقص الشخص المختار في الفرع الثاني', 'Did not take the chosen person out in the second branch'),
    'average-rates': say('Probabilitate osoa tasen batez besteko soila da', 'Hizo la probabilidad total como media simple de las tasas', 'جعل الاحتمال الكلي متوسطًا بسيطًا للنسب', 'Made the total probability a plain average of the rates'),
    'forget-prior': say('A priori probabilitateak ahaztu ditu Bayesen', 'Olvidó las probabilidades a priori en Bayes', 'نسي الاحتمالات القبلية في بايز', 'Forgot the prior probabilities in Bayes'),
    sensitivity: say('Probaren sentikortasuna $P(E/+)$ gisa hartu du', 'Tomó la sensibilidad de la prueba como $P(E/+)$', 'اعتبر حساسية الفحص هي $P(E/+)$', 'Took the sensitivity of the test as $P(E/+)$')
}

export const probabilityBatx2gDetectiveTips: Record<ProbabilityBatx2gDetectiveError, LocalizedText> = {
    'order-counted': say('Batzorde batean ordenak ez du axola: konbinazioak, $C_{n,k}=\\frac{V_{n,k}}{k!}$.', 'En una comisión el orden no importa: combinaciones, $C_{n,k}=\\frac{V_{n,k}}{k!}$.', 'لا يهم الترتيب في اللجنة: توافيق، $C_{n,k}=\\frac{V_{n,k}}{k!}$.', 'In a committee the order does not matter: combinations, $C_{n,k}=\\frac{V_{n,k}}{k!}$.'),
    repetition: say('Pertsona batek ezin ditu bi kargu izan: aukera bakoitzean bat gutxiago.', 'Una persona no puede tener dos cargos: en cada elección, una opción menos.', 'لا يشغل شخص منصبين: في كل اختيار خيار أقل.', 'One person cannot hold two posts: one option fewer at each choice.'),
    'mixed-criteria': say('Aldekoak eta posibleak irizpide berarekin: biak ordenarik gabe.', 'Favorables y posibles con el mismo criterio: los dos sin orden.', 'الملائمة والممكنة بالمعيار نفسه: كلاهما دون ترتيب.', 'Favourable and possible cases the same way: both without order.'),
    'grand-total': say('$P(A/B)$: $B$ da osoko berria; zatitu $B$-ren guztizkoaz.', '$P(A/B)$: $B$ es el nuevo total; divide entre el total de $B$.', '$P(A/B)$: $B$ هو الكل الجديد؛ اقسم على مجموع $B$.', '$P(A/B)$: $B$ is the new total; divide by the total of $B$.'),
    'swapped-condition': say('Barraren atzean dagoena da osoko berria: $P(A/B)\\neq P(B/A)$.', 'El nuevo total es lo que va detrás de la barra: $P(A/B)\\neq P(B/A)$.', 'الكل الجديد هو ما بعد الخط: $P(A/B)\\neq P(B/A)$.', 'The new total is what comes after the bar: $P(A/B)\\neq P(B/A)$.'),
    'union-double': say('Bildura: errenkada gehi zutabea ken lauki komuna.', 'La unión: fila más columna menos la casilla común.', 'الاتحاد: الصف زائد العمود ناقص الخانة المشتركة.', 'The union: row plus column minus the shared cell.'),
    'no-replacement': say('Itzuli gabe, bigarrenean pertsona bat gutxiago dago.', 'Sin devolución, en la segunda hay una persona menos.', 'دون إرجاع ينقص شخص في الاختيار الثاني.', 'Without replacement, there is one person fewer the second time.'),
    'average-rates': say('Talde bakoitzak bere pisua du: $P(D)=\\sum P(A_i)\\cdot P(D/A_i)$.', 'Cada grupo pesa lo suyo: $P(D)=\\sum P(A_i)\\cdot P(D/A_i)$.', 'لكل مجموعة وزنها: $P(D)=\\sum P(A_i)\\cdot P(D/A_i)$.', 'Each group has its own weight: $P(D)=\\sum P(A_i)\\cdot P(D/A_i)$.'),
    'forget-prior': say('Zenbakitzailea bide osoa da: $P(A_i)\\cdot P(D/A_i)$.', 'El numerador es el camino entero: $P(A_i)\\cdot P(D/A_i)$.', 'البسط هو المسار كله: $P(A_i)\\cdot P(D/A_i)$.', 'The numerator is the whole path: $P(A_i)\\cdot P(D/A_i)$.'),
    sensitivity: say('$P(+/E)$ eta $P(E/+)$ desberdinak dira: positibo faltsuak ere kontuan hartu.', '$P(+/E)$ y $P(E/+)$ son distintas: cuenta también los falsos positivos.', '$P(+/E)$ و$P(E/+)$ مختلفان: احسب الإيجابيات الكاذبة أيضًا.', '$P(+/E)$ and $P(E/+)$ are different: count the false positives too.')
}

type Built = Omit<WorkedCase<ProbabilityBatx2gDetectiveError>, 'options'>

/** A count of people or a share written in LaTeX */
const share = (top: number, bottom: number) => probLatex(fraction(top, bottom))

function build(random: Random, error: ProbabilityBatx2gDetectiveError): Built | null {
    switch (error) {
        case 'order-counted': {
            const n = randomInt(random, 6, 12)
            const k = randomInt(random, 2, 3)
            return {
                problem: say(`${n} bizilagunen artean ${k} pertsonako batzorde bat osatzen da. Zenbat batzorde daude?`, `Entre ${n} vecinos se forma una comisión de ${k} personas. ¿Cuántas comisiones hay?`, `تُكوَّن لجنة من ${k} أشخاص من بين ${n} جيران. كم لجنة توجد؟`, `A committee of ${k} people is formed from ${n} neighbours. How many committees are there?`),
                lines: [line(LABELS.data, `n=${n},\\ k=${k}`), line(LABELS.model, `V_{${n},${k}}`), line(LABELS.result, `V_{${n},${k}}=${arrangements(n, k)}`)],
                wrong: 1, error, fix: `C_{${n},${k}}=${combinations(n, k)}`, right: combinations(n, k), reached: arrangements(n, k)
            }
        }
        case 'repetition': {
            const n = randomInt(random, 5, 10)
            return {
                problem: say(`${n} ikasleren artean ordezkaria eta ordezkariordea aukeratzen dira. Zenbat modutan?`, `Entre ${n} alumnos se eligen delegado y subdelegado. ¿De cuántas formas?`, `يُختار من بين ${n} طلاب مندوب ونائب مندوب. بكم طريقة؟`, `A delegate and a deputy are chosen among ${n} students. In how many ways?`),
                lines: [line(LABELS.data, `n=${n},\\ k=2`), line(LABELS.model, `VR_{${n},2}=${n}^2`), line(LABELS.result, `${n * n}`)],
                wrong: 1, error, fix: `V_{${n},2}=${n}\\cdot ${n - 1}=${n * (n - 1)}`, right: n * (n - 1), reached: n * n
            }
        }
        case 'mixed-criteria': {
            const women = randomInt(random, 3, 6)
            const men = randomInt(random, 3, 6)
            const total = women + men
            const favourable = combinations(women, 2)
            const possible = combinations(total, 2)
            return {
                problem: say(`${women} emakume eta ${men} gizonetik 2 pertsona zozketatzen dira. Zein da biak emakumeak izateko probabilitatea?`, `Entre ${women} mujeres y ${men} hombres se sortean 2 personas. ¿Qué probabilidad hay de que sean dos mujeres?`, `من بين ${women} نساء و${men} رجال تُجرى قرعة لشخصين. ما احتمال أن تكونا امرأتين؟`, `2 people are drawn from ${women} women and ${men} men. What is the probability that both are women?`),
                lines: [line(LABELS.possible, `C_{${total},2}=${possible}`), line(LABELS.favourable, `V_{${women},2}=${arrangements(women, 2)}`), line(LABELS.result, `P=\\frac{${arrangements(women, 2)}}{${possible}}`)],
                wrong: 1, error, fix: `C_{${women},2}=${favourable}\\ \\to\\ P=\\frac{${favourable}}{${possible}}=${share(favourable, possible)}`, right: favourable / possible, reached: arrangements(women, 2) / possible
            }
        }
        case 'grand-total': {
            const group = 10 * randomInt(random, 6, 15)
            const yes = 5 * randomInt(random, 2, group / 5 - 2)
            const all = group + 10 * randomInt(random, 5, 15)
            return {
                problem: say(`Inkesta batean ${all} pertsona daude: ${group} gazteak dira, eta horietatik ${yes} gaztek «bai» erantzun dute. Kalkulatu $P(S/G)$.`, `En una encuesta hay ${all} personas: ${group} son jóvenes y ${yes} de ellos han dicho «sí». Calcula $P(S/G)$.`, `في استطلاع ${all} شخصًا: ${group} منهم شباب، و${yes} منهم قالوا «نعم». احسب $P(S/G)$.`, `A poll has ${all} people: ${group} are young and ${yes} of them said ‘yes’. Work out $P(S/G)$.`),
                lines: [line(LABELS.data, `${yes},\\ ${group},\\ ${all}`), line(LABELS.step, `P(S/G)=\\frac{${yes}}{${all}}`), line(LABELS.result, `P(S/G)=${share(yes, all)}`)],
                wrong: 1, error, fix: `P(S/G)=\\frac{${yes}}{${group}}=${share(yes, group)}`, right: yes / group, reached: yes / all
            }
        }
        case 'swapped-condition': {
            const women = 10 * randomInt(random, 10, 30)
            const yesWomen = 10 * randomInt(random, 3, women / 10 - 3)
            const yesAll = yesWomen + 10 * randomInt(random, 3, 15)
            if (yesAll === women) return null
            return {
                problem: say(`Erreferendum batean, ${women} emakumetatik ${yesWomen} emakumek «bai» bozkatu dute, eta guztira ${yesAll} pertsonak. Kalkulatu $P(M/S)$, emakumea izatea «bai» bozkatu duela jakinda.`, `En un referéndum, ${yesWomen} de ${women} mujeres han votado «sí», y en total ${yesAll} personas. Calcula $P(M/S)$, ser mujer sabiendo que votó «sí».`, `في استفتاء، صوّتت ${yesWomen} من ${women} امرأة بـ«نعم»، وإجمالًا ${yesAll} شخصًا. احسب $P(M/S)$، أي أن يكون امرأة مع العلم أنه صوّت بـ«نعم».`, `In a referendum, ${yesWomen} of ${women} women voted ‘yes’, and ${yesAll} people in all. Work out $P(M/S)$, being a woman given a ‘yes’ vote.`),
                lines: [line(LABELS.data, `P(M\\cap S)\\to ${yesWomen}`), line(LABELS.step, `P(M/S)=\\frac{${yesWomen}}{${women}}`), line(LABELS.result, `P(M/S)=${share(yesWomen, women)}`)],
                wrong: 1, error, fix: `P(M/S)=\\frac{${yesWomen}}{${yesAll}}=${share(yesWomen, yesAll)}`, right: yesWomen / yesAll, reached: yesWomen / women
            }
        }
        case 'union-double': {
            const row = 10 * randomInt(random, 5, 12)
            const column = 10 * randomInt(random, 5, 12)
            const both = 10 * randomInt(random, 1, Math.min(row, column) / 10 - 1)
            const all = Math.max(200, row + column)
            if (row + column - both > all) return null
            return {
                problem: say(`${all} bezerotatik ${row} gazteak dira, ${column} online erosleak, eta ${both} biak. Zein da bezero bat gaztea edo online eroslea izateko probabilitatea?`, `De ${all} clientes, ${row} son jóvenes, ${column} compran online y ${both} las dos cosas. ¿Qué probabilidad hay de que un cliente sea joven o compre online?`, `من ${all} زبون، ${row} شباب، و${column} يشترون عبر الإنترنت، و${both} الأمرين. ما احتمال أن يكون زبون شابًّا أو يشتري عبر الإنترنت؟`, `Of ${all} customers, ${row} are young, ${column} buy online and ${both} are both. What is the probability that a customer is young or buys online?`),
                lines: [line(LABELS.data, `${row},\\ ${column},\\ ${both}`), line(LABELS.step, `${row}+${column}=${row + column}`), line(LABELS.result, `P=\\frac{${row + column}}{${all}}`)],
                wrong: 1, error, fix: `${row}+${column}-${both}=${row + column - both}\\ \\to\\ P=${share(row + column - both, all)}`, right: (row + column - both) / all, reached: (row + column) / all
            }
        }
        case 'no-replacement': {
            const women = randomInt(random, 3, 7)
            const men = randomInt(random, 3, 7)
            const total = women + men
            return {
                problem: say(`Bulego batean ${women} emakume eta ${men} gizon daude. Bi aukeratzen dira zoriz. Zein da biak emakumeak izateko probabilitatea?`, `En una oficina hay ${women} mujeres y ${men} hombres. Se eligen dos al azar. ¿Qué probabilidad hay de que sean dos mujeres?`, `في مكتب ${women} نساء و${men} رجال. يُختار اثنان عشوائيًّا. ما احتمال أن تكونا امرأتين؟`, `An office has ${women} women and ${men} men. Two are chosen at random. What is the probability that both are women?`),
                lines: [line(LABELS.step, `P(M_1)=\\frac{${women}}{${total}}`), line(LABELS.step, `P(M_2/M_1)=\\frac{${women}}{${total}}`), line(LABELS.result, `P=\\frac{${women * women}}{${total * total}}`)],
                wrong: 1, error, fix: `P(M_2/M_1)=\\frac{${women - 1}}{${total - 1}}\\ \\to\\ P=${share(women * (women - 1), total * (total - 1))}`, right: (women * (women - 1)) / (total * (total - 1)), reached: (women * women) / (total * total)
            }
        }
        case 'average-rates': {
            const first = 10 * randomInt(random, 6, 9)
            const rates = [randomInt(random, 2, 8), randomInt(random, 10, 30)]
            const total = first * rates[0] + (100 - first) * rates[1]
            return {
                problem: say(`Bezeroen %\u00a0${first} A dendakoa da eta gainerakoak B dendakoak. Kexatzen dira A dendakoen %\u00a0${rates[0]} eta B dendakoen %\u00a0${rates[1]}. Zein da $P(Q)$?`, `El ${first}\u00a0% de los clientes es de la tienda A y el resto de la B. Se quejan el ${rates[0]}\u00a0% de los de A y el ${rates[1]}\u00a0% de los de B. ¿Cuánto vale $P(Q)$?`, `${first}\u00a0% من الزبائن من المتجر A والباقون من B. يشتكي ${rates[0]}\u00a0% من زبائن A و${rates[1]}\u00a0% من زبائن B. كم يساوي $P(Q)$؟`, `${first}% of the customers are from shop A and the rest from B. ${rates[0]}% of A's and ${rates[1]}% of B's customers complain. What is $P(Q)$?`),
                lines: [line(LABELS.data, `P(Q/A)=${h(rates[0])},\\ P(Q/B)=${h(rates[1])}`), line(LABELS.total, `P(Q)=\\frac{${h(rates[0])}+${h(rates[1])}}{2}`), line(LABELS.result, `P(Q)=${probLatex(fraction(rates[0] + rates[1], 200))}`)],
                wrong: 1, error, fix: `P(Q)=${h(first)}\\cdot ${h(rates[0])}+${h(100 - first)}\\cdot ${h(rates[1])}=${probLatex(fraction(total, 10000))}`, right: total / 10000, reached: (rates[0] + rates[1]) / 200
            }
        }
        case 'forget-prior': {
            const first = 10 * randomInt(random, 6, 8)
            const rates = [randomInt(random, 2, 5), randomInt(random, 8, 20)]
            const paths = [first * rates[0], (100 - first) * rates[1]]
            if (paths[0] === paths[1]) return null
            return {
                problem: say(`Eskaeren %\u00a0${first} A biltegitik dator eta gainerakoak B biltegitik. Itzultzen dira A biltegikoen %\u00a0${rates[0]} eta B biltegikoen %\u00a0${rates[1]}. Eskaera bat itzuli da: kalkulatu $P(B/D)$.`, `El ${first}\u00a0% de los pedidos sale del almacén A y el resto del B. Se devuelven el ${rates[0]}\u00a0% de los de A y el ${rates[1]}\u00a0% de los de B. Se ha devuelto un pedido: calcula $P(B/D)$.`, `${first}\u00a0% من الطلبات تخرج من المستودع A والباقي من B. يُعاد ${rates[0]}\u00a0% من طلبات A و${rates[1]}\u00a0% من طلبات B. أُعيد طلب: احسب $P(B/D)$.`, `${first}% of the orders leave from warehouse A and the rest from B. ${rates[0]}% of A's and ${rates[1]}% of B's orders are returned. An order was returned: work out $P(B/D)$.`),
                lines: [line(LABELS.data, `P(D/A)=${h(rates[0])},\\ P(D/B)=${h(rates[1])}`), line(LABELS.bayes, `P(B/D)=\\frac{${h(rates[1])}}{${h(rates[0])}+${h(rates[1])}}`), line(LABELS.result, `P(B/D)=${share(rates[1], rates[0] + rates[1])}`)],
                wrong: 1, error, fix: `P(B/D)=\\frac{${h(100 - first)}\\cdot ${h(rates[1])}}{${h(first)}\\cdot ${h(rates[0])}+${h(100 - first)}\\cdot ${h(rates[1])}}=${share(paths[1], paths[0] + paths[1])}`, right: paths[1] / (paths[0] + paths[1]), reached: rates[1] / (rates[0] + rates[1])
            }
        }
        case 'sensitivity': {
            const ill = pick(random, [1, 2, 5])
            const sensitivity = pick(random, [80, 90, 95])
            const falsePositive = pick(random, [5, 10])
            const truePositive = ill * sensitivity
            const wrongPositive = (100 - ill) * falsePositive
            return {
                problem: say(`Biztanleen %\u00a0${ill} gaixo dago. Proba positiboa da gaixoen artean %\u00a0${sensitivity}, eta osasuntsuen artean %\u00a0${falsePositive}. Zein da $P(E/+)$?`, `Está enfermo el ${ill}\u00a0% de la población. La prueba da positivo en el ${sensitivity}\u00a0% de los enfermos y en el ${falsePositive}\u00a0% de los sanos. ¿Cuánto vale $P(E/+)$?`, `المريض ${ill}\u00a0% من السكان. يعطي الفحص نتيجة إيجابية لدى ${sensitivity}\u00a0% من المرضى و${falsePositive}\u00a0% من الأصحاء. كم يساوي $P(E/+)$؟`, `${ill}% of the population is ill. The test is positive in ${sensitivity}% of the ill and in ${falsePositive}% of the healthy. What is $P(E/+)$?`),
                lines: [line(LABELS.data, `P(E)=${h(ill)},\\ P(+/E)=${h(sensitivity)}`), line(LABELS.step, `P(E/+)=P(+/E)`), line(LABELS.result, `P(E/+)=${h(sensitivity)}`)],
                wrong: 1, error, fix: `P(E/+)=\\frac{${h(ill)}\\cdot ${h(sensitivity)}}{${h(ill)}\\cdot ${h(sensitivity)}+${h(100 - ill)}\\cdot ${h(falsePositive)}}=${share(truePositive, truePositive + wrongPositive)}`, right: truePositive / (truePositive + wrongPositive), reached: sensitivity / 100
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createProbabilityBatx2gDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, probabilityBatx2gDetectiveLevels[levelIndex], PROBABILITY_BATX2G_DETECTIVE_CASES, build)
    let made = draw()
    for (let attempt = 0; attempt < 30 && new Set(made.map((item) => item.problem.es)).size < made.length; attempt += 1) made = draw()
    return made
}

export const detectiveValue = (top: number, bottom: number) => toNumber(fraction(top, bottom))
