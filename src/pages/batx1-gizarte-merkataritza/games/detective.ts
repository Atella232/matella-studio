import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   J3 · Diruaren detektibea (Detective del dinero): a worked calculation of
   three lines with one wrong line, the mistakes of this unit. Level 1,
   percentages and interest: percentages added, a rise undone by
   subtracting, simple interest instead of compound, the yearly interest
   used as monthly. Level 2, APR and time: the APR taken as the nominal,
   the fee left out, the years worked out by dividing, the years rounded
   down. Level 3, saving and loans: the sum without the −1, every deposit
   grown the same years, the whole payment taken as repayment, the interest
   of the second year on the first capital.
   ========================================================================== */

export type GizMoneyDetectiveError =
    | 'percent-added'
    | 'rise-subtracted'
    | 'simple-not-compound'
    | 'yearly-as-monthly'
    | 'tae-nominal'
    | 'fee-ignored'
    | 'years-divided'
    | 'years-down'
    | 'sum-no-minus-one'
    | 'deposits-same-years'
    | 'payment-all-repaid'
    | 'interest-first-capital'

export const gizMoneyDetectiveLevels: GizMoneyDetectiveError[][] = [
    ['percent-added', 'rise-subtracted', 'simple-not-compound', 'yearly-as-monthly'],
    ['tae-nominal', 'fee-ignored', 'years-divided', 'years-down'],
    ['sum-no-minus-one', 'deposits-same-years', 'payment-all-repaid', 'interest-first-capital']
]

export const GIZ_MONEY_DETECTIVE_CASES = 6

/** Arabic writes the decimal point instead of the comma */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
/** A number in LaTeX, with the decimal comma and the thousands grouped */
const tex = (value: number, decimals = 2) => {
    const rounded = Math.round(value * 10 ** decimals) / 10 ** decimals
    const [whole, part] = String(Math.abs(rounded)).split('.')
    const grouped = whole.length >= 5 ? whole.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : whole
    return `${rounded < 0 ? '-' : ''}${grouped}${part ? `{,}${part}` : ''}`
}
/** 1 + r/100 in LaTeX: 1{,}05 or 1{,}12 */
const factor = (rate: number) => tex(1 + rate / 100, 4)
const cents = (value: number) => Math.round(value * 100) / 100
const LABELS = {
    rule: say('Araua', 'Regla', 'القاعدة', 'Rule'),
    values: say('Balioak', 'Valores', 'القيم', 'Values'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    answer: say('Erantzuna', 'Respuesta', 'الجواب', 'Answer'),
    interest: say('Interesak', 'Intereses', 'الفوائد', 'Interest'),
    repaid: say('Amortizazioa', 'Amortización', 'الإطفاء', 'Repayment'),
    debt: say('Zorra', 'Deuda', 'الدين', 'Debt')
}

export const gizMoneyDetectiveNames: Record<GizMoneyDetectiveError, LocalizedText> = {
    'percent-added': say('Ehunekoak batu ditu, indizeak biderkatu beharrean', 'Sumó los porcentajes en vez de multiplicar los índices', 'جمع النسب بدل أن يضرب المؤشرات', 'Added the percentages instead of multiplying the indexes'),
    'rise-subtracted': say('Igoera desegiteko ehunekoa kendu du, indizeaz zatitu beharrean', 'Para deshacer la subida restó el porcentaje en vez de dividir entre el índice', 'لإلغاء الزيادة طرح النسبة بدل القسمة على المؤشر', 'Undid the rise by subtracting the percentage instead of dividing by the index'),
    'simple-not-compound': say('Interes bakuna erabili du, konposatuaren ordez', 'Usó interés simple en lugar de compuesto', 'استعمل الفائدة البسيطة بدل المركبة', 'Used simple interest instead of compound'),
    'yearly-as-monthly': say('Urteko interesa hileko gisa erabili du', 'Usó el interés anual como si fuera mensual', 'استعمل الفائدة السنوية كأنها شهرية', 'Used the yearly interest as if it were monthly'),
    'tae-nominal': say('Urteko tasa baliokidea interes nominala dela pentsatu du', 'Pensó que la TAE es el interés nominal', 'ظن أن المعدل السنوي المكافئ هو الفائدة الاسمية', 'Thought the APR is the nominal interest'),
    'fee-ignored': say('Komisioa ahaztu du', 'Olvidó la comisión', 'نسي العمولة', 'Forgot the fee'),
    'years-divided': say('Urteak zatituz kalkulatu ditu, logaritmoen ordez', 'Calculó los años dividiendo, no con logaritmos', 'حسب السنوات بالقسمة لا باللوغاريتمات', 'Worked out the years by dividing, not with logarithms'),
    'years-down': say('Urteak behera biribildu ditu', 'Redondeó los años hacia abajo', 'قرّب السنوات إلى الأسفل', 'Rounded the years down'),
    'sum-no-minus-one': say('Baturaren formulan $-1$ ahaztu du', 'Olvidó el $-1$ en la fórmula de la suma', 'نسي $-1$ في صيغة المجموع', 'Forgot the $-1$ in the sum formula'),
    'deposits-same-years': say('Diru-sarrera guztiek urte berak hazten dituztela pentsatu du', 'Pensó que todos los ingresos crecen los mismos años', 'ظن أن كل الإيداعات تنمو السنوات نفسها', 'Thought every deposit grows for the same years'),
    'payment-all-repaid': say('Ordainketa osoa amortizaziotzat hartu du', 'Tomó todo el pago como amortización', 'اعتبر الدفعة كلها إطفاءً', 'Took the whole payment as repayment'),
    'interest-first-capital': say('Interesak hasierako kapitalaren gainean kalkulatu ditu', 'Calculó los intereses sobre el capital inicial', 'حسب الفوائد على رأس المال الأولي', 'Worked out the interest on the first capital')
}

export const gizMoneyDetectiveTips: Record<GizMoneyDetectiveError, LocalizedText> = {
    'percent-added': say('Ehunekoak kateatzean, indizeak biderkatzen dira: $1{,}2\\cdot 0{,}8=0{,}96$.', 'Al encadenar porcentajes se multiplican los índices: $1{,}2\\cdot 0{,}8=0{,}96$.', 'عند تتابع النسب تُضرب المؤشرات: $1{,}2\\cdot 0{,}8=0{,}96$.', 'Chained percentages multiply the indexes: $1{,}2\\cdot 0{,}8=0{,}96$.'),
    'rise-subtracted': say('Hasierako prezioa: zatitu indizeaz, $\\frac{P}{1{,}25}$.', 'Precio inicial: divide entre el índice, $\\frac{P}{1{,}25}$.', 'السعر الأصلي: اقسم على المؤشر $\\frac{P}{1{,}25}$.', 'Starting price: divide by the index, $\\frac{P}{1{,}25}$.'),
    'simple-not-compound': say('Konposatua: $C\\cdot(1+i)^{n}$, ez $C\\cdot(1+n\\cdot i)$.', 'Compuesto: $C\\cdot(1+i)^{n}$, no $C\\cdot(1+n\\cdot i)$.', 'المركبة: $C\\cdot(1+i)^{n}$ لا $C\\cdot(1+n\\cdot i)$.', 'Compound: $C\\cdot(1+i)^{n}$, not $C\\cdot(1+n\\cdot i)$.'),
    'yearly-as-monthly': say('Hilekoa: urtekoa zati 12.', 'Mensual: el anual entre 12.', 'الشهرية: السنوية مقسومة على 12.', 'Monthly: the yearly rate divided by 12.'),
    'tae-nominal': say('Aldi batzuetan ordainduta: $\\left(1+\\frac{r}{n}\\right)^{n}-1$.', 'Pagado en varios periodos: $\\left(1+\\frac{r}{n}\\right)^{n}-1$.', 'عند الدفع على فترات: $\\left(1+\\frac{r}{n}\\right)^{n}-1$.', 'Paid in several periods: $\\left(1+\\frac{r}{n}\\right)^{n}-1$.'),
    'fee-ignored': say('Komisioarekin gutxiago jasotzen da: zatitu jasotakoaz.', 'Con la comisión se recibe menos: divide entre lo recibido.', 'مع العمولة تستلم أقل: اقسم على المستلم.', 'With the fee you receive less: divide by what you receive.'),
    'years-divided': say('$(1+i)^{n}=k$ askatzeko, logaritmoak: $n=\\frac{\\log k}{\\log(1+i)}$.', 'Para despejar $(1+i)^{n}=k$, logaritmos: $n=\\frac{\\log k}{\\log(1+i)}$.', 'لعزل $(1+i)^{n}=k$ نستعمل اللوغاريتمات: $n=\\frac{\\log k}{\\log(1+i)}$.', 'To solve $(1+i)^{n}=k$, use logarithms: $n=\\frac{\\log k}{\\log(1+i)}$.'),
    'years-down': say('Bankuak urte osoak ordaintzen ditu: hamartarrak badaude, hurrengo urtea.', 'El banco paga años completos: si hay decimales, el año siguiente.', 'المصرف يدفع عن سنوات كاملة: إذا ظهرت كسور فالسنة التالية.', 'The bank pays for whole years: if there are decimals, the next year.'),
    'sum-no-minus-one': say('$S_n=a_1\\cdot\\frac{r^{n}-1}{r-1}$.', '$S_n=a_1\\cdot\\frac{r^{n}-1}{r-1}$.', '$S_n=a_1\\cdot\\frac{r^{n}-1}{r-1}$.', '$S_n=a_1\\cdot\\frac{r^{n}-1}{r-1}$.'),
    'deposits-same-years': say('Lehenengoak $n$ urte hazten du, azkenak bat: progresio geometrikoa da.', 'El primero crece $n$ años y el último uno: es una progresión geométrica.', 'الأول ينمو $n$ سنة والأخير سنة واحدة: إنها متتالية هندسية.', 'The first grows $n$ years and the last one year: it is a geometric progression.'),
    'payment-all-repaid': say('Amortizazioa = urtekoa ken interesak.', 'Amortización = anualidad menos intereses.', 'الإطفاء = الدفعة ناقص الفوائد.', 'Repayment = payment minus interest.'),
    'interest-first-capital': say('Urte bakoitzeko interesak, urte horretako zorraren gainean.', 'Los intereses de cada año, sobre la deuda de ese año.', 'فوائد كل سنة تُحسب على دين تلك السنة.', 'Each year\'s interest is on that year\'s debt.')
}

type Built = Omit<WorkedCase<GizMoneyDetectiveError>, 'options'>

function build(random: Random, error: GizMoneyDetectiveError): Built | null {
    switch (error) {
        case 'percent-added': {
            const up = pick(random, [10, 20, 25, 30])
            const down = pick(random, [10, 15, 20, 30])
            const price = randomInt(random, 4, 20) * 10
            const right = cents(price * (1 + up / 100) * (1 - down / 100))
            const reached = cents(price * (1 + (up - down) / 100))
            return {
                problem: say(`${price} euroko prezio bat % ${up} igo eta gero % ${down} jaisten da. Zein da azken prezioa?`, `Un precio de ${price} euros sube un ${up} % y luego baja un ${down} %. ¿Cuál es el precio final?`, `سعر ${price} يورو يرتفع ${up} % ثم ينخفض ${down} %. ما السعر النهائي؟`, `A price of ${price} euros goes up ${up}% and then down ${down}%. What is the final price?`),
                lines: [line(LABELS.rule, `${up}-${down}=${up - down}`), line(LABELS.values, `${price}\\cdot ${factor(up - down)}`), line(LABELS.result, tex(reached))],
                wrong: 0, error, fix: `${price}\\cdot ${factor(up)}\\cdot ${tex(1 - down / 100, 2)}=${tex(right)}`, right, reached
            }
        }
        case 'rise-subtracted': {
            const rate = pick(random, [20, 25, 40, 50])
            const before = randomInt(random, 4, 30) * 10
            const after = cents(before * (1 + rate / 100))
            const reached = cents(after * (1 - rate / 100))
            return {
                problem: say(`% ${rate} igo ondoren, artikulu batek ${tex(after).replace('{,}', ',')} euro balio du. Zenbat balio zuen lehen?`, `Tras subir un ${rate} %, un artículo vale ${tex(after).replace('{,}', ',')} euros. ¿Cuánto valía antes?`, `بعد ارتفاع ${rate} % صار سعر سلعة ${tex(after).replace('{,}', '.')} يورو. كم كان سعرها قبل ذلك؟`, `After a ${rate}% rise, an item costs ${tex(after).replace('{,}', '.')} euros. How much was it before?`),
                lines: [line(LABELS.rule, `${tex(after)}-${rate}\\,\\%`), line(LABELS.values, `${tex(after)}\\cdot ${tex(1 - rate / 100, 2)}`), line(LABELS.result, tex(reached))],
                wrong: 0, error, fix: `\\frac{${tex(after)}}{${factor(rate)}}=${before}`, right: before, reached
            }
        }
        case 'simple-not-compound': {
            const capital = randomInt(random, 2, 10) * 1000
            const rate = pick(random, [3, 4, 5, 6])
            const years = randomInt(random, 2, 4)
            const right = cents(capital * (1 + rate / 100) ** years)
            const reached = cents(capital * (1 + (rate * years) / 100))
            return {
                problem: say(`${capital} euro, interes konposatua % ${rate}, ${years} urtez. Zenbat da amaieran?`, `${capital} euros al ${rate} % de interés compuesto durante ${years} años. ¿Cuánto hay al final?`, `${capital} يورو بفائدة مركبة ${rate} % لمدة ${years} سنوات. كم يصبح المبلغ؟`, `${capital} euros at ${rate}% compound interest for ${years} years. How much is there at the end?`),
                lines: [line(LABELS.rule, `C\\cdot(1+n\\cdot i)`), line(LABELS.values, `${capital}\\cdot(1+${years}\\cdot ${tex(rate / 100)})`), line(LABELS.result, tex(reached))],
                wrong: 0, error, fix: `${capital}\\cdot ${factor(rate)}^{${years}}\\approx ${tex(right)}`, right, reached
            }
        }
        case 'yearly-as-monthly': {
            const capital = randomInt(random, 1, 9) * 1000
            const rate = pick(random, [6, 12])
            const right = cents(capital * (1 + rate / 1200) ** 12)
            const reached = cents(capital * (1 + rate / 100) ** 12)
            return {
                problem: say(`${capital} euro, urteko % ${rate}, hilero ordainduta. Zenbat da urtebeteren ondoren?`, `${capital} euros al ${rate} % anual con pago mensual. ¿Cuánto hay al cabo de un año?`, `${capital} يورو بفائدة ${rate} % سنويًا تُدفع شهريًا. كم يصبح بعد سنة؟`, `${capital} euros at ${rate}% a year paid monthly. How much is there after one year?`),
                lines: [line(LABELS.rule, `i=${tex(rate / 100)}`), line(LABELS.values, `${capital}\\cdot ${factor(rate)}^{12}`), line(LABELS.result, tex(reached))],
                wrong: 0, error, fix: `i=\\frac{${tex(rate / 100)}}{12}\\ \\to\\ ${capital}\\cdot ${factor(rate / 12)}^{12}\\approx ${tex(right)}`, right, reached
            }
        }
        case 'tae-nominal': {
            const rate = pick(random, [6, 8, 10, 12])
            const periods = pick(random, [4, 12])
            const right = cents(((1 + rate / 100 / periods) ** periods - 1) * 100)
            return {
                problem: say(`Zein da urteko % ${rate} interesaren tasa baliokidea, urtean ${periods} aldiz ordainduta?`, `¿Cuál es la TAE de un ${rate} % anual pagado ${periods} veces al año?`, `ما المعدل السنوي المكافئ لفائدة ${rate} % تُدفع ${periods} مرات في السنة؟`, `What is the APR of ${rate}% a year paid ${periods} times a year?`),
                lines: [line(LABELS.rule, `\\frac{${rate}}{${periods}}\\cdot ${periods}`), line(LABELS.values, `${rate}`), line(LABELS.result, `${rate}\\,\\%`)],
                wrong: 0, error, fix: `\\left(1+\\frac{${tex(rate / 100)}}{${periods}}\\right)^{${periods}}-1\\approx ${tex(right / 100, 4)}`, right, reached: rate
            }
        }
        case 'fee-ignored': {
            const loan = randomInt(random, 2, 10) * 1000
            const rate = pick(random, [5, 6, 8, 10])
            const fee = pick(random, [1, 2])
            const back = loan * (1 + rate / 100)
            const received = loan * (1 - fee / 100)
            const right = cents((back / received - 1) * 100)
            return {
                problem: say(`${loan} euroko mailegua, interesa % ${rate}, urtebetean itzultzekoa; sinatzean komisioa % ${fee} da. Zein da urteko tasa baliokidea?`, `Préstamo de ${loan} euros al ${rate} %, a devolver en un año, con una comisión del ${fee} %. ¿Cuál es la TAE?`, `قرض ${loan} يورو بفائدة ${rate} % يُسدَّد بعد سنة مع عمولة ${fee} %. ما المعدل السنوي المكافئ؟`, `A loan of ${loan} euros at ${rate}%, paid back in one year, with a ${fee}% fee. What is the APR?`),
                lines: [line(LABELS.rule, `\\frac{${tex(back)}}{${loan}}`), line(LABELS.values, tex(back / loan, 2)), line(LABELS.result, `${rate}\\,\\%`)],
                wrong: 0, error, fix: `\\frac{${tex(back)}}{${tex(received)}}\\approx ${tex(back / received, 4)}`, right, reached: rate
            }
        }
        case 'years-divided': {
            const rate = pick(random, [4, 5, 6, 8])
            const goal = pick(random, [2, 3])
            const right = Math.ceil(Math.log(goal) / Math.log(1 + rate / 100))
            const reached = cents(goal / (1 + rate / 100))
            return {
                problem: say(`Zenbat urtetan biderkatzen da kapital bat ${goal} aldiz, urteko interesa % ${rate} bada?`, `¿En cuántos años se multiplica por ${goal} un capital al ${rate} % anual?`, `في كم سنة يُضرب رأس مال في ${goal} بفائدة ${rate} % سنويًا؟`, `In how many years is a capital multiplied by ${goal} at ${rate}% a year?`),
                lines: [line(LABELS.rule, `${factor(rate)}^{n}=${goal}`), line(LABELS.values, `n=\\frac{${goal}}{${factor(rate)}}`), line(LABELS.result, `n\\approx ${tex(reached)}`)],
                wrong: 1, error, fix: `n=\\frac{\\log ${goal}}{\\log ${factor(rate)}}\\ \\to\\ ${right}`, right, reached
            }
        }
        case 'years-down': {
            const rate = pick(random, [3, 4, 5, 6, 7])
            const goal = pick(random, [1.5, 2])
            const exact = Math.log(goal) / Math.log(1 + rate / 100)
            if (exact - Math.floor(exact) < 0.1) return null
            return {
                problem: say(`Zenbat urte behar dira kapital bat bider ${tex(goal).replace('{,}', ',')} egiteko, urteko interesa % ${rate} bada?`, `¿Cuántos años hacen falta para multiplicar un capital por ${tex(goal).replace('{,}', ',')} al ${rate} % anual?`, `كم سنة تلزم لضرب رأس مال في ${tex(goal).replace('{,}', '.')} بفائدة ${rate} % سنويًا؟`, `How many years does it take to multiply a capital by ${tex(goal).replace('{,}', '.')} at ${rate}% a year?`),
                lines: [line(LABELS.rule, `n=\\frac{\\log ${tex(goal)}}{\\log ${factor(rate)}}`), line(LABELS.values, `n\\approx ${tex(exact)}`), line(LABELS.answer, `${Math.floor(exact)}`)],
                wrong: 2, error, fix: `${tex(exact)}\\ \\to\\ ${Math.ceil(exact)}`, right: Math.ceil(exact), reached: Math.floor(exact)
            }
        }
        case 'sum-no-minus-one': {
            const first = randomInt(random, 1, 5)
            const ratio = pick(random, [2, 3])
            const terms = randomInt(random, 4, 6)
            const right = (first * (ratio ** terms - 1)) / (ratio - 1)
            const reached = (first * ratio ** terms) / (ratio - 1)
            return {
                problem: say(`Batu ${first}, ${first * ratio}, ${first * ratio * ratio}… progresioaren lehen ${terms} gaiak.`, `Suma los ${terms} primeros términos de ${first}, ${first * ratio}, ${first * ratio * ratio}…`, `اجمع الحدود ${terms} الأولى من ${first}، ${first * ratio}، ${first * ratio * ratio}…`, `Add the first ${terms} terms of ${first}, ${first * ratio}, ${first * ratio * ratio}…`),
                lines: [line(LABELS.rule, `S_n=a_1\\cdot\\frac{r^{n}}{r-1}`), line(LABELS.values, `${first}\\cdot\\frac{${ratio}^{${terms}}}{${ratio - 1}}`), line(LABELS.result, tex(reached))],
                wrong: 0, error, fix: `${first}\\cdot\\frac{${ratio}^{${terms}}-1}{${ratio - 1}}=${tex(right)}`, right, reached
            }
        }
        case 'deposits-same-years': {
            const amount = randomInt(random, 1, 5) * 1000
            const rate = pick(random, [2, 3, 4, 5])
            const years = randomInt(random, 3, 5)
            const f = 1 + rate / 100
            const right = cents((amount * f * (f ** years - 1)) / (rate / 100))
            const reached = cents(amount * years * f ** years)
            return {
                problem: say(`${amount} euro sartzen dira urte hasieran, ${years} urtez, interesa % ${rate}. Zenbat dago amaieran?`, `Se ingresan ${amount} euros al principio de cada año durante ${years} años al ${rate} %. ¿Cuánto hay al final?`, `تُودَع ${amount} يورو في بداية كل سنة لمدة ${years} سنوات بفائدة ${rate} %. كم يوجد في النهاية؟`, `${amount} euros are paid in at the start of each year for ${years} years at ${rate}%. How much is there at the end?`),
                lines: [line(LABELS.rule, `${years}\\cdot ${amount}=${years * amount}`), line(LABELS.values, `${years * amount}\\cdot ${factor(rate)}^{${years}}`), line(LABELS.result, tex(reached))],
                wrong: 1, error, fix: `${amount}\\cdot ${factor(rate)}\\cdot\\frac{${factor(rate)}^{${years}}-1}{${tex(rate / 100)}}\\approx ${tex(right)}`, right, reached
            }
        }
        case 'payment-all-repaid': {
            const debt = randomInt(random, 4, 20) * 1000
            const rate = pick(random, [3, 4, 5, 6])
            const payment = randomInt(random, 2, 6) * 500 + debt * rate / 100
            const interest = (debt * rate) / 100
            const right = debt - (payment - interest)
            const reached = debt - payment
            if (reached <= 0) return null
            return {
                problem: say(`Zorra ${debt} euro da, interesa % ${rate}, eta ${payment} euro ordaintzen dira. Zenbat geratzen da zor?`, `La deuda es de ${debt} euros al ${rate} % y se pagan ${payment} euros. ¿Cuánta deuda queda?`, `الدين ${debt} يورو بفائدة ${rate} % ويُدفع ${payment} يورو. كم يبقى من الدين؟`, `The debt is ${debt} euros at ${rate}% and ${payment} euros are paid. How much debt is left?`),
                lines: [line(LABELS.repaid, `${payment}`), line(LABELS.debt, `${debt}-${payment}`), line(LABELS.result, `${reached}`)],
                wrong: 0, error, fix: `${payment}-${debt}\\cdot ${tex(rate / 100)}=${payment - interest}\\ \\to\\ ${right}`, right, reached
            }
        }
        case 'interest-first-capital': {
            const capital = randomInt(random, 4, 20) * 1000
            const rate = pick(random, [4, 5, 6, 8])
            const firstRepaid = randomInt(random, 2, 5) * 500
            const debt = capital - firstRepaid
            const right = (debt * rate) / 100
            const reached = (capital * rate) / 100
            return {
                problem: say(`${capital} euroko mailegua, interesa % ${rate}; lehen urtean ${firstRepaid} euro amortizatu dira. Zenbat interes bigarren urtean?`, `Préstamo de ${capital} euros al ${rate} %; el primer año se amortizaron ${firstRepaid} euros. ¿Cuántos intereses el segundo año?`, `قرض ${capital} يورو بفائدة ${rate} %، وأُطفئ في السنة الأولى ${firstRepaid} يورو. كم الفوائد في السنة الثانية؟`, `A loan of ${capital} euros at ${rate}%; ${firstRepaid} euros were repaid in the first year. How much interest in the second year?`),
                lines: [line(LABELS.debt, `${capital}`), line(LABELS.interest, `${capital}\\cdot ${tex(rate / 100)}`), line(LABELS.result, tex(reached))],
                wrong: 0, error, fix: `(${capital}-${firstRepaid})\\cdot ${tex(rate / 100)}=${tex(right)}`, right, reached
            }
        }
    }
}

export const createGizMoneyDetectiveCases = (random: Random, levelIndex: number) => createWorkedCases(random, gizMoneyDetectiveLevels[levelIndex], GIZ_MONEY_DETECTIVE_CASES, build)
