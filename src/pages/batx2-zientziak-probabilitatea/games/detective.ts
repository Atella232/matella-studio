import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import { fraction, toNumber } from '../../../features/unit-v2/math/fraction.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { hundredthsLatex, probLatex, say, tenthsLatex } from '../lab/probability.ts'

/* ==========================================================================
   J4 · Probabilitatearen detektibea (Detective de probabilidad, 2.º): a
   worked solution of three lines with one wrong line, the mistakes of this
   unit that the detective of 4. DBH does not have. Level 1 (events):
   P(A − B) = P(A) − P(B), «neither» as the complement of the intersection,
   «only one» taken as the union. Level 2 (conditional): P(A∩B) given as
   P(A/B), independent taken as P(A∩B) = 0, P(A∩B) = P(A)·P(B) without
   independence, P(Ā/B) = 1 − P(A/B̄). Level 3 (Bayes): the priors left
   out, P(D/Aᵢ) given as P(Aᵢ/D), the total probability as a plain average
   and the ball moved between urns ignored. `right` and `reached` only
   tell the cases apart.
   ========================================================================== */

export type ProbabilityBatx2DetectiveError =
    | 'difference'
    | 'morgan'
    | 'only-one'
    | 'joint-as-conditional'
    | 'independent-exclusive'
    | 'product-without-independence'
    | 'complement-condition'
    | 'ignore-prior'
    | 'bayes-swapped'
    | 'total-average'
    | 'transfer-ignored'

export const probabilityBatx2DetectiveLevels: ProbabilityBatx2DetectiveError[][] = [
    ['difference', 'morgan', 'only-one'],
    ['joint-as-conditional', 'independent-exclusive', 'product-without-independence', 'complement-condition'],
    ['ignore-prior', 'bayes-swapped', 'total-average', 'transfer-ignored']
]

export const PROBABILITY_BATX2_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const h = hundredthsLatex
const LABELS = {
    data: say('Datuak', 'Datos', 'المعطيات', 'Data'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    morgan: say('De Morgan', 'De Morgan', 'دي مورغان', 'De Morgan'),
    onlyOne: say('Bat bakarrik', 'Solo uno', 'واحد فقط', 'Only one'),
    conditional: say('Baldintzatua', 'Condicionada', 'المشروط', 'Conditional'),
    independent: say('Independenteak', 'Independientes', 'مستقلان', 'Independent'),
    total: say('Probabilitate osoa', 'Probabilidad total', 'الاحتمال الكلي', 'Total probability'),
    bayes: say('Bayes', 'Bayes', 'بايز', 'Bayes'),
    urn: say('II kutxa', 'Urna II', 'الجرّة II', 'Urn II'),
    moved: say('Bola pasatu ondoren', 'Tras pasar la bola', 'بعد نقل الكرة', 'After moving the ball')
}

export const probabilityBatx2DetectiveNames: Record<ProbabilityBatx2DetectiveError, LocalizedText> = {
    difference: say('$P(A-B)=P(A)-P(B)$ egin du', 'Hizo $P(A-B)=P(A)-P(B)$', 'كتب $P(A-B)=P(A)-P(B)$', 'Wrote $P(A-B)=P(A)-P(B)$'),
    morgan: say('«Ez $A$ ez $B$» ebakiduraren aurkakotzat hartu du', 'Tomó «ni $A$ ni $B$» como el contrario de la intersección', 'اعتبر «لا $A$ ولا $B$» معاكس التقاطع', 'Took ‘neither $A$ nor $B$’ as the complement of the intersection'),
    'only-one': say('«Bat bakarrik» bildura dela uste izan du', 'Creyó que «solo uno» es la unión', 'ظن أن «واحد فقط» هو الاتحاد', 'Thought ‘only one’ is the union'),
    'joint-as-conditional': say('$P(A\\cap B)$ eman du $P(A/B)$ gisa, zatitu gabe', 'Dio $P(A\\cap B)$ como $P(A/B)$, sin dividir', 'أعطى $P(A\\cap B)$ على أنه $P(A/B)$ دون قسمة', 'Gave $P(A\\cap B)$ as $P(A/B)$, without dividing'),
    'independent-exclusive': say('Independenteak bateraezintzat hartu ditu', 'Tomó independientes por incompatibles', 'اعتبر المستقلين متنافيين', 'Took independent events as mutually exclusive'),
    'product-without-independence': say('Biderkatu egin du gertaerak independenteak izan gabe', 'Multiplicó sin que los sucesos fueran independientes', 'ضرب مع أن الحدثين غير مستقلين', 'Multiplied although the events are not independent'),
    'complement-condition': say('Baldintza aldatu du aurkakoa hartzean', 'Cambió la condición al tomar el contrario', 'غيّر الشرط عند أخذ المعاكس', 'Changed the condition when taking the complement'),
    'ignore-prior': say('A priori probabilitateak ahaztu ditu', 'Olvidó las probabilidades a priori', 'نسي الاحتمالات القبلية', 'Forgot the prior probabilities'),
    'bayes-swapped': say('$P(D/A_i)$ eman du $P(A_i/D)$ gisa', 'Dio $P(D/A_i)$ como $P(A_i/D)$', 'أعطى $P(D/A_i)$ على أنه $P(A_i/D)$', 'Gave $P(D/A_i)$ as $P(A_i/D)$'),
    'total-average': say('Probabilitate osoa batez besteko soil gisa kalkulatu du', 'Calculó la probabilidad total como una media simple', 'حسب الاحتمال الكلي كمتوسط بسيط', 'Worked out the total probability as a plain average'),
    'transfer-ignored': say('Pasatutako bola ahaztu du', 'Olvidó la bola que se pasó', 'نسي الكرة المنقولة', 'Forgot the ball that was moved')
}

export const probabilityBatx2DetectiveTips: Record<ProbabilityBatx2DetectiveError, LocalizedText> = {
    difference: say('Zati komuna bakarrik kentzen da: $P(A-B)=P(A)-P(A\\cap B)$.', 'Solo se quita la parte común: $P(A-B)=P(A)-P(A\\cap B)$.', 'نطرح الجزء المشترك فقط: $P(A-B)=P(A)-P(A\\cap B)$.', 'Only the common part is taken away: $P(A-B)=P(A)-P(A\\cap B)$.'),
    morgan: say('De Morgan: $\\overline{A}\\cap\\overline{B}=\\overline{A\\cup B}$, bilduraren aurkakoa.', 'De Morgan: $\\overline{A}\\cap\\overline{B}=\\overline{A\\cup B}$, el contrario de la unión.', 'دي مورغان: $\\overline{A}\\cap\\overline{B}=\\overline{A\\cup B}$، معاكس الاتحاد.', 'De Morgan: $\\overline{A}\\cap\\overline{B}=\\overline{A\\cup B}$, the complement of the union.'),
    'only-one': say('Bildurak zona komuna ere badu: kendu egin behar da.', 'La unión incluye también la zona común: hay que quitarla.', 'يشمل الاتحاد المنطقة المشتركة أيضًا: يجب حذفها.', 'The union also includes the common zone: take it away.'),
    'joint-as-conditional': say('$P(A/B)=\\frac{P(A\\cap B)}{P(B)}$: baldintza osoko berria da.', '$P(A/B)=\\frac{P(A\\cap B)}{P(B)}$: la condición es el nuevo total.', '$P(A/B)=\\frac{P(A\\cap B)}{P(B)}$: الشرط هو الكل الجديد.', '$P(A/B)=\\frac{P(A\\cap B)}{P(B)}$: the condition is the new total.'),
    'independent-exclusive': say('Independenteak: $P(A\\cap B)=P(A)\\cdot P(B)$, ez 0.', 'Independientes: $P(A\\cap B)=P(A)\\cdot P(B)$, no 0.', 'المستقلان: $P(A\\cap B)=P(A)\\cdot P(B)$ لا 0.', 'Independent: $P(A\\cap B)=P(A)\\cdot P(B)$, not 0.'),
    'product-without-independence': say('Biderkaduraren erregela: $P(A\\cap B)=P(A)\\cdot P(B/A)$.', 'Regla del producto: $P(A\\cap B)=P(A)\\cdot P(B/A)$.', 'قاعدة الضرب: $P(A\\cap B)=P(A)\\cdot P(B/A)$.', 'Multiplication rule: $P(A\\cap B)=P(A)\\cdot P(B/A)$.'),
    'complement-condition': say('Baldintza bera mantentzen da: $P(\\overline{A}/B)=1-P(A/B)$.', 'La condición se mantiene: $P(\\overline{A}/B)=1-P(A/B)$.', 'يبقى الشرط نفسه: $P(\\overline{A}/B)=1-P(A/B)$.', 'The condition stays the same: $P(\\overline{A}/B)=1-P(A/B)$.'),
    'ignore-prior': say('Bide bakoitza kausa bider akatsa da: $P(A_i)\\cdot P(D/A_i)$.', 'Cada camino es causa por defecto: $P(A_i)\\cdot P(D/A_i)$.', 'كل مسار هو السبب في العيب: $P(A_i)\\cdot P(D/A_i)$.', 'Each path is cause times fault: $P(A_i)\\cdot P(D/A_i)$.'),
    'bayes-swapped': say('Alderantziz da: $P(A_i/D)=\\frac{P(A_i)\\cdot P(D/A_i)}{P(D)}$.', 'Es al revés: $P(A_i/D)=\\frac{P(A_i)\\cdot P(D/A_i)}{P(D)}$.', 'إنه بالعكس: $P(A_i/D)=\\frac{P(A_i)\\cdot P(D/A_i)}{P(D)}$.', 'It is the other way round: $P(A_i/D)=\\frac{P(A_i)\\cdot P(D/A_i)}{P(D)}$.'),
    'total-average': say('Kausa bakoitzak bere probabilitatearen pisua du: $P(D)=\\sum P(A_i)\\cdot P(D/A_i)$.', 'Cada causa pesa según su probabilidad: $P(D)=\\sum P(A_i)\\cdot P(D/A_i)$.', 'لكل سبب وزن بحسب احتماله: $P(D)=\\sum P(A_i)\\cdot P(D/A_i)$.', 'Each cause weighs according to its probability: $P(D)=\\sum P(A_i)\\cdot P(D/A_i)$.'),
    'transfer-ignored': say('II kutxak bola bat gehiago du: adar bat pasatzen den kolore bakoitzeko.', 'La urna II tiene una bola más: una rama por cada color que puede pasar.', 'في الجرّة II كرة إضافية: فرع لكل لون يمكن أن ينتقل.', 'Urn II has one more ball: one branch for each colour that can move.')
}

type Built = Omit<WorkedCase<ProbabilityBatx2DetectiveError>, 'options'>
const value = (numerator: number, denominator: number) => toNumber(fraction(numerator, denominator))

function build(random: Random, error: ProbabilityBatx2DetectiveError): Built | null {
    switch (error) {
        case 'difference': {
            const a = 5 * randomInt(random, 8, 16)
            const b = 5 * randomInt(random, 3, 7)
            const both = 5 * randomInt(random, 1, b / 5 - 1)
            if (a + b - both > 100 || a <= b) return null
            return {
                problem: say(`$P(A)=${h(a)}$, $P(B)=${h(b)}$ eta $P(A\\cap B)=${h(both)}$. Kalkulatu $P(A-B)$ eta haren aurkakoa.`, `$P(A)=${h(a)}$, $P(B)=${h(b)}$ y $P(A\\cap B)=${h(both)}$. Calcula $P(A-B)$ y su contrario.`, `$P(A)=${h(a)}$ و$P(B)=${h(b)}$ و$P(A\\cap B)=${h(both)}$. احسب $P(A-B)$ ومعاكسه.`, `$P(A)=${h(a)}$, $P(B)=${h(b)}$ and $P(A\\cap B)=${h(both)}$. Work out $P(A-B)$ and its complement.`),
                lines: [line(LABELS.data, `P(A)=${h(a)},\\ P(B)=${h(b)}`), line(LABELS.step, `P(A-B)=${h(a)}-${h(b)}=${h(a - b)}`), line(LABELS.result, `P(\\overline{A-B})=1-${h(a - b)}=${h(100 - a + b)}`)],
                wrong: 1, error, fix: `P(A-B)=${h(a)}-${h(both)}=${h(a - both)}`, right: a - both, reached: a - b
            }
        }
        case 'morgan': {
            const union = 5 * randomInt(random, 10, 18)
            const both = 5 * randomInt(random, 1, 6)
            if (both * 2 >= union) return null
            return {
                problem: say(`$P(A\\cup B)=${h(union)}$ eta $P(A\\cap B)=${h(both)}$. Zein da ez $A$ ez $B$ gertatzeko probabilitatea?`, `$P(A\\cup B)=${h(union)}$ y $P(A\\cap B)=${h(both)}$. ¿Qué probabilidad hay de que no ocurra ni $A$ ni $B$?`, `$P(A\\cup B)=${h(union)}$ و$P(A\\cap B)=${h(both)}$. ما احتمال ألّا يقع لا $A$ ولا $B$؟`, `$P(A\\cup B)=${h(union)}$ and $P(A\\cap B)=${h(both)}$. What is the probability that neither $A$ nor $B$ happens?`),
                lines: [line(LABELS.data, `P(A\\cup B)=${h(union)},\\ P(A\\cap B)=${h(both)}`), line(LABELS.morgan, '\\overline{A}\\cap\\overline{B}=\\overline{A\\cap B}'), line(LABELS.result, `P(\\overline{A}\\cap\\overline{B})=1-${h(both)}=${h(100 - both)}`)],
                wrong: 1, error, fix: `\\overline{A}\\cap\\overline{B}=\\overline{A\\cup B}\\ \\to\\ 1-${h(union)}=${h(100 - union)}`, right: 100 - union, reached: 100 - both
            }
        }
        case 'only-one': {
            const a = 5 * randomInt(random, 4, 10)
            const b = 5 * randomInt(random, 4, 10)
            const both = 5 * randomInt(random, 1, Math.min(a, b) / 5 - 1)
            const union = a + b - both
            if (union > 100) return null
            return {
                problem: say(`$P(A)=${h(a)}$, $P(B)=${h(b)}$ eta $P(A\\cap B)=${h(both)}$. Zein da bietako bat bakarrik gertatzeko probabilitatea?`, `$P(A)=${h(a)}$, $P(B)=${h(b)}$ y $P(A\\cap B)=${h(both)}$. ¿Qué probabilidad hay de que ocurra solo uno de los dos?`, `$P(A)=${h(a)}$ و$P(B)=${h(b)}$ و$P(A\\cap B)=${h(both)}$. ما احتمال وقوع واحد فقط منهما؟`, `$P(A)=${h(a)}$, $P(B)=${h(b)}$ and $P(A\\cap B)=${h(both)}$. What is the probability that only one of them happens?`),
                lines: [line(LABELS.step, `P(A\\cup B)=${h(a)}+${h(b)}-${h(both)}=${h(union)}`), line(LABELS.onlyOne, 'P=P(A\\cup B)'), line(LABELS.result, `P=${h(union)}`)],
                wrong: 1, error, fix: `P=P(A\\cup B)-P(A\\cap B)=${h(union)}-${h(both)}=${h(union - both)}`, right: union - both, reached: union
            }
        }
        case 'joint-as-conditional': {
            const b = pick(random, [20, 25, 40, 50, 80])
            const both = 5 * randomInt(random, 1, b / 5 - 1)
            if (!Number.isInteger((both * 100) / b)) return null
            return {
                problem: say(`$P(B)=${h(b)}$ eta $P(A\\cap B)=${h(both)}$. Kalkulatu $P(A/B)$.`, `$P(B)=${h(b)}$ y $P(A\\cap B)=${h(both)}$. Calcula $P(A/B)$.`, `$P(B)=${h(b)}$ و$P(A\\cap B)=${h(both)}$. احسب $P(A/B)$.`, `$P(B)=${h(b)}$ and $P(A\\cap B)=${h(both)}$. Work out $P(A/B)$.`),
                lines: [line(LABELS.data, `P(B)=${h(b)},\\ P(A\\cap B)=${h(both)}`), line(LABELS.conditional, 'P(A/B)=P(A\\cap B)'), line(LABELS.result, `P(A/B)=${h(both)}`)],
                wrong: 1, error, fix: `P(A/B)=\\frac{${h(both)}}{${h(b)}}=${probLatex(fraction(both, b))}`, right: value(both, b), reached: both / 100
            }
        }
        case 'independent-exclusive': {
            const a = 10 * randomInt(random, 1, 6)
            const b = 10 * randomInt(random, 1, 6)
            if (a + b > 100) return null
            const product = (a * b) / 100
            return {
                problem: say(`$A$ eta $B$ independenteak dira, $P(A)=${h(a)}$ eta $P(B)=${h(b)}$ izanik. Kalkulatu $P(A\\cup B)$.`, `$A$ y $B$ son independientes, con $P(A)=${h(a)}$ y $P(B)=${h(b)}$. Calcula $P(A\\cup B)$.`, `$A$ و$B$ مستقلان، مع $P(A)=${h(a)}$ و$P(B)=${h(b)}$. احسب $P(A\\cup B)$.`, `$A$ and $B$ are independent, with $P(A)=${h(a)}$ and $P(B)=${h(b)}$. Work out $P(A\\cup B)$.`),
                lines: [line(LABELS.independent, 'P(A\\cap B)=0'), line(LABELS.step, `P(A\\cup B)=${h(a)}+${h(b)}-0`), line(LABELS.result, `P(A\\cup B)=${h(a + b)}`)],
                wrong: 0, error, fix: `P(A\\cap B)=${h(a)}\\cdot ${h(b)}=${h(product)}\\ \\to\\ P(A\\cup B)=${h(a + b - product)}`, right: a + b - product, reached: a + b
            }
        }
        case 'product-without-independence': {
            const a = 10 * randomInt(random, 2, 8)
            const b = 10 * randomInt(random, 2, 8)
            const tenths = randomInt(random, 1, 9)
            const both = (a * tenths) / 10
            if (tenths * 10 === b || both > b || a + b - both > 100) return null
            const product = (a * b) / 100
            return {
                problem: say(`$P(A)=${h(a)}$, $P(B)=${h(b)}$ eta $P(B/A)=${tenthsLatex(tenths)}$. Kalkulatu $P(A\\cup B)$.`, `$P(A)=${h(a)}$, $P(B)=${h(b)}$ y $P(B/A)=${tenthsLatex(tenths)}$. Calcula $P(A\\cup B)$.`, `$P(A)=${h(a)}$ و$P(B)=${h(b)}$ و$P(B/A)=${tenthsLatex(tenths)}$. احسب $P(A\\cup B)$.`, `$P(A)=${h(a)}$, $P(B)=${h(b)}$ and $P(B/A)=${tenthsLatex(tenths)}$. Work out $P(A\\cup B)$.`),
                lines: [line(LABELS.data, `P(A)=${h(a)},\\ P(B)=${h(b)}`), line(LABELS.step, `P(A\\cap B)=${h(a)}\\cdot ${h(b)}=${h(product)}`), line(LABELS.result, `P(A\\cup B)=${h(a)}+${h(b)}-${h(product)}=${h(a + b - product)}`)],
                wrong: 1, error, fix: `P(A\\cap B)=${h(a)}\\cdot ${tenthsLatex(tenths)}=${h(both)}\\ \\to\\ P(A\\cup B)=${h(a + b - both)}`, right: a + b - both, reached: a + b - product
            }
        }
        case 'complement-condition': {
            const b = pick(random, [20, 50, 60, 75, 80])
            const both = 5 * randomInt(random, 1, b / 5 - 1)
            const a = both + 5 * randomInt(random, 1, (100 - b) / 5)
            const givenB = fraction(both, b)
            const givenNotB = fraction(a - both, 100 - b)
            if (a > 100 || toNumber(givenB) === toNumber(givenNotB) || (both * 100) % b !== 0 || ((a - both) * 100) % (100 - b) !== 0) return null
            return {
                problem: say(`$P(A)=${h(a)}$, $P(B)=${h(b)}$ eta $P(A\\cap B)=${h(both)}$. Kalkulatu $P(\\overline{A}/B)$.`, `$P(A)=${h(a)}$, $P(B)=${h(b)}$ y $P(A\\cap B)=${h(both)}$. Calcula $P(\\overline{A}/B)$.`, `$P(A)=${h(a)}$ و$P(B)=${h(b)}$ و$P(A\\cap B)=${h(both)}$. احسب $P(\\overline{A}/B)$.`, `$P(A)=${h(a)}$, $P(B)=${h(b)}$ and $P(A\\cap B)=${h(both)}$. Work out $P(\\overline{A}/B)$.`),
                lines: [line(LABELS.conditional, `P(A/\\overline{B})=\\frac{${h(a - both)}}{${h(100 - b)}}=${probLatex(givenNotB)}`), line(LABELS.step, 'P(\\overline{A}/B)=1-P(A/\\overline{B})'), line(LABELS.result, `P(\\overline{A}/B)=1-${probLatex(givenNotB)}=${probLatex(fraction(givenNotB.denominator - givenNotB.numerator, givenNotB.denominator))}`)],
                wrong: 1, error, fix: `P(\\overline{A}/B)=1-\\frac{${h(both)}}{${h(b)}}=${probLatex(fraction(givenB.denominator - givenB.numerator, givenB.denominator))}`, right: 1 - toNumber(givenB), reached: 1 - toNumber(givenNotB)
            }
        }
        case 'ignore-prior':
        case 'bayes-swapped': {
            const share = 10 * randomInt(random, 6, 9)
            const rate1 = randomInt(random, 1, 4)
            const rate2 = randomInt(random, rate1 + 2, 9)
            const path1 = share * rate1
            const path2 = (100 - share) * rate2
            const total = path1 + path2
            const p = (percent: number) => probLatex(fraction(percent, 100))
            const t = (tenThousandths: number) => probLatex(fraction(tenThousandths, 10_000))
            const problem = say(`Piezen % ${share} $A_1$ makinatik dator, eta gainerakoak $A_2$ makinatik; % ${rate1} eta % ${rate2} akastunak dira. Pieza bat akastuna bada, zein da $A_${error === 'ignore-prior' ? 1 : 2}$ makinatik etortzeko probabilitatea?`, `El ${share} % de las piezas sale de $A_1$ y el resto de $A_2$; fallan el ${rate1} % y el ${rate2} %. Si una pieza falla, ¿qué probabilidad hay de que venga de $A_${error === 'ignore-prior' ? 1 : 2}$?`, `تخرج ${share}٪ من القطع من $A_1$ والباقي من $A_2$؛ والمعيب ${rate1}٪ و${rate2}٪. إذا كانت قطعة معيبة، فما احتمال أن تأتي من $A_${error === 'ignore-prior' ? 1 : 2}$؟`, `${share}% of the parts come from $A_1$ and the rest from $A_2$; ${rate1}% and ${rate2}% fail. If a part fails, what is the probability that it comes from $A_${error === 'ignore-prior' ? 1 : 2}$?`)
            const totalLine = line(LABELS.total, `P(D)=${t(path1)}+${t(path2)}=${t(total)}`)
            if (error === 'ignore-prior') {
                const right = fraction(path1, total)
                const reached = fraction(rate1, rate1 + rate2)
                if (toNumber(right) === toNumber(reached)) return null
                return {
                    problem,
                    lines: [totalLine, line(LABELS.bayes, `P(A_1/D)=\\frac{${p(rate1)}}{${p(rate1)}+${p(rate2)}}=${probLatex(reached)}`), line(LABELS.result, `P(A_2/D)=1-${probLatex(reached)}=${probLatex(fraction(rate2, rate1 + rate2))}`)],
                    wrong: 1, error, fix: `P(A_1/D)=\\frac{${t(path1)}}{${t(total)}}=${probLatex(right)}`, right: toNumber(right), reached: toNumber(reached)
                }
            }
            const right = fraction(path2, total)
            return {
                problem,
                lines: [totalLine, line(LABELS.bayes, `P(A_2/D)=P(D/A_2)`), line(LABELS.result, `P(A_2/D)=${p(rate2)}`)],
                wrong: 1, error, fix: `P(A_2/D)=\\frac{${t(path2)}}{${t(total)}}=${probLatex(right)}`, right: toNumber(right), reached: rate2 / 100
            }
        }
        case 'total-average': {
            const share = 10 * randomInt(random, 1, 4)
            const rate1 = 10 * randomInt(random, 3, 8)
            const rate2 = 5 * randomInt(random, 1, 4)
            if (rate1 === rate2) return null
            const total = share * rate1 + (100 - share) * rate2
            return {
                problem: say(`Egunen % ${share} euria egiten du. Euriarekin, % ${rate1} berandu iristen naiz ($D$), eta euririk gabe, % ${rate2}. Zein da berandu iristeko probabilitatea?`, `Llueve el ${share} % de los días. Con lluvia llego tarde ($D$) el ${rate1} % de las veces, y sin lluvia, el ${rate2} %. ¿Qué probabilidad hay de llegar tarde?`, `تمطر ${share}٪ من الأيام. مع المطر أتأخر ($D$) ${rate1}٪ من المرات، ودون مطر ${rate2}٪. ما احتمال التأخر؟`, `It rains on ${share}% of days. With rain I am late ($D$) ${rate1}% of the time, and without rain, ${rate2}%. What is the probability of being late?`),
                lines: [line(LABELS.data, `P(D/A_1)=${h(rate1)},\\ P(D/A_2)=${h(rate2)}`), line(LABELS.total, `P(D)=\\frac{${h(rate1)}+${h(rate2)}}{2}`), line(LABELS.result, `P(D)=${probLatex(fraction(rate1 + rate2, 200))}`)],
                wrong: 1, error, fix: `P(D)=${h(share)}\\cdot ${h(rate1)}+${h(100 - share)}\\cdot ${h(rate2)}=${probLatex(fraction(total, 10_000))}`, right: total / 10_000, reached: (rate1 + rate2) / 200
            }
        }
        case 'transfer-ignored': {
            const white1 = randomInt(random, 1, 4)
            const black1 = randomInt(random, 1, 4)
            const white2 = randomInt(random, 1, 4)
            const black2 = randomInt(random, 1, 4)
            const n1 = white1 + black1
            const n2 = white2 + black2
            const right = fraction(white1 * (white2 + 1) + black1 * white2, n1 * (n2 + 1))
            if (toNumber(right) === white2 / n2 || white1 * n2 === white2 * n1) return null
            return {
                problem: say(`I kutxak ${white1} zuri eta ${black1} beltz ditu; II kutxak, ${white2} zuri eta ${black2} beltz. Bola bat I kutxatik II kutxara pasatzen da, eta bat ateratzen da II kutxatik. Zein da zuria izateko probabilitatea?`, `La urna I tiene ${white1} blancas y ${black1} negras; la II, ${white2} blancas y ${black2} negras. Se pasa una bola de I a II y se saca una de II. ¿Qué probabilidad hay de que sea blanca?`, `في الجرّة I ${white1} بيضاء و${black1} سوداء، وفي II ${white2} بيضاء و${black2} سوداء. تُنقل كرة من I إلى II وتُسحب كرة من II. ما احتمال أن تكون بيضاء؟`, `Urn I has ${white1} white and ${black1} black; urn II, ${white2} white and ${black2} black. A ball is moved from I to II and one is drawn from II. What is the probability that it is white?`),
                lines: [line(LABELS.urn, `${white2}+${black2}=${n2}`), line(LABELS.moved, `P=\\frac{${white2}}{${n2}}`), line(LABELS.result, `P=${probLatex(fraction(white2, n2))}`)],
                wrong: 1, error, fix: `\\frac{${white1}}{${n1}}\\cdot\\frac{${white2 + 1}}{${n2 + 1}}+\\frac{${black1}}{${n1}}\\cdot\\frac{${white2}}{${n2 + 1}}=${probLatex(right)}`, right: toNumber(right), reached: white2 / n2
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createProbabilityBatx2DetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, probabilityBatx2DetectiveLevels[levelIndex], PROBABILITY_BATX2_DETECTIVE_CASES, build)
    let made = draw()
    for (let attempt = 0; attempt < 30 && new Set(made.map((item) => item.problem.es)).size < made.length; attempt += 1) made = draw()
    return made
}
