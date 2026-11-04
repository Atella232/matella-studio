import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { NumberLine, SignRuleFigure, SituationsFigure } from '../dbh2-zenbaki-osoak/figures'
import { BracketsFigure, CountersFigure, ElevatorFigure } from './figures'
import { integerIntroLessonChecks, type IntegerIntroTopicId } from './lessonChecks'
import { integerIntroLessonTexts } from './lessonTexts'

/* ==========================================================================
   Zenbaki osoak · 1. DBH — stages and lessons
   Sequence follows the class textbook (Santillana 1.º ESO, unit 5, curricular
   adaptation): meaning of positive and negative numbers, the number line,
   order and comparison, absolute value and opposite, sums and subtractions
   (also with brackets), products, quotients and the sign rule. Anaya unit 4
   adds contexts and the two ways to work with brackets. It is the first
   contact with integers: small numbers and many everyday situations; the
   2. DBH unit goes further (combined operations and square brackets).
   Notation as in 2. DBH: Aur(a) in Basque, Op(a) in Spanish.
   ========================================================================== */

export type IntegerIntroStageId = 'meaning' | 'line' | 'absolute' | 'addsub' | 'muldiv'

/** Keeps a signed number or an expression left-to-right inside Arabic text */
const ltr = (text: string) => `⁦${text}⁩`

export const integerIntroStages: UnitStage[] = [
    { id: 'meaning', tone: 'blue', title: { eu: 'Positiboak eta negatiboak', es: 'Positivos y negativos', en: 'Positives and negatives', ar: 'الموجبة والسالبة' } },
    { id: 'line', tone: 'violet', title: { eu: 'Zuzena eta ordena', es: 'Recta y orden', en: 'Number line and order', ar: 'المستقيم والترتيب' } },
    { id: 'absolute', tone: 'mustard', title: { eu: 'Balio absolutua eta aurkakoa', es: 'Valor absoluto y opuesto', en: 'Absolute value and opposite', ar: 'القيمة المطلقة والمعاكس' } },
    { id: 'addsub', tone: 'coral', title: { eu: 'Batuketak eta kenketak', es: 'Sumas y restas', en: 'Adding and subtracting', ar: 'الجمع والطرح' } },
    { id: 'muldiv', tone: 'green', title: { eu: 'Biderketak eta zatiketak', es: 'Productos y cocientes', en: 'Multiplying and dividing', ar: 'الضرب والقسمة' } }
]

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    {
        id: 'negatives',
        stage: 'meaning',
        title: { eu: 'Zenbaki negatiboak eguneroko bizitzan', es: 'Los números negativos en la vida diaria', en: 'Negative numbers in everyday life', ar: 'الأعداد السالبة في الحياة اليومية' },
        goal: {
            eu: 'Egoera errealak zenbaki positibo eta negatiboekin adieraztea.',
            es: 'Expresar situaciones reales con números positivos y negativos.',
            en: 'Express real situations with positive and negative numbers.',
            ar: 'التعبير عن مواقف حقيقية بأعداد موجبة وسالبة.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Negatiboak (−)', es: 'Negativos (−)', en: 'Negatives (−)', ar: 'السالبة (−)' },
                text: { eu: 'Hitz hauekin: azpitik, zor, sotoa, jaitsi, gutxitu.', es: 'Con palabras como: bajo, deber, sótano, bajar, disminuir.', en: 'With words like: below, owe, basement, go down, decrease.', ar: 'مع كلمات مثل: تحت، دَين، قبو، نزل، نقص.' },
                math: '$-2 \\qquad -4\\,^{\\circ}\\mathrm{C} \\qquad -160\\ \\text{€}$'
            },
            {
                title: { eu: 'Positiboak (+)', es: 'Positivos (+)', en: 'Positives (+)', ar: 'الموجبة (+)' },
                text: { eu: 'Hitz hauekin: gainetik, daukat, solairua, igo, gehitu.', es: 'Con palabras como: sobre, tener, planta, subir, aumentar.', en: 'With words like: above, have, floor, go up, increase.', ar: 'مع كلمات مثل: فوق، لديّ، طابق، صعد، زاد.' },
                math: '$+3 \\qquad +30\\,^{\\circ}\\mathrm{C} \\qquad +50\\ \\mathrm{m}$'
            },
            {
                title: { eu: 'Zeroa', es: 'El cero', en: 'Zero', ar: 'الصفر' },
                text: { eu: 'Erreferentzia da: beheko solairua, 0 °C edo itsas maila.', es: 'Es la referencia: la planta baja, 0 °C o el nivel del mar.', en: 'It is the reference: the ground floor, 0 °C or sea level.', ar: 'هو المرجع: الطابق الأرضي أو 0 °م أو مستوى سطح البحر.' }
            }
        ],
        takeaway: {
            eu: 'Zerotik behera: −. Zerotik gora: +.',
            es: 'Por debajo de cero: −. Por encima de cero: +.',
            en: 'Below zero: −. Above zero: +.',
            ar: 'تحت الصفر: −. فوق الصفر: +.'
        },
        figure: (language) => <SituationsFigure language={language} />
    },
    {
        id: 'integer-set',
        stage: 'meaning',
        title: { eu: 'Zenbaki osoak', es: 'Los números enteros', en: 'Integers', ar: 'الأعداد الصحيحة' },
        goal: {
            eu: 'Zenbaki osoak zer diren jakitea: positiboak, negatiboak eta zeroa.',
            es: 'Saber qué son los números enteros: positivos, negativos y el cero.',
            en: 'Know what integers are: positives, negatives and zero.',
            ar: 'معرفة الأعداد الصحيحة: الموجبة والسالبة والصفر.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Positiboak', es: 'Positivos', en: 'Positives', ar: 'الموجبة' }, text: { eu: 'Zenbaki naturalak + zeinuarekin.', es: 'Los naturales con signo +.', en: 'Natural numbers with a + sign.', ar: 'الأعداد الطبيعية مع الإشارة +.' }, math: '$+1,\\ +2,\\ +3,\\ +4,\\ \\dots$' },
            { title: { eu: 'Zeroa', es: 'El cero', en: 'Zero', ar: 'الصفر' }, text: { eu: 'Ez positiboa ez negatiboa.', es: 'Ni positivo ni negativo.', en: 'Neither positive nor negative.', ar: 'ليس موجبًا ولا سالبًا.' }, math: '$0$' },
            { title: { eu: 'Negatiboak', es: 'Negativos', en: 'Negatives', ar: 'السالبة' }, text: { eu: 'Zenbaki naturalak − zeinuarekin.', es: 'Los naturales con signo −.', en: 'Natural numbers with a − sign.', ar: 'الأعداد الطبيعية مع الإشارة −.' }, math: '$-1,\\ -2,\\ -3,\\ -4,\\ \\dots$' }
        ],
        takeaway: {
            eu: 'ℤ = negatiboak + zeroa + positiboak.',
            es: 'ℤ = negativos + cero + positivos.',
            en: 'ℤ = negatives + zero + positives.',
            ar: 'ℤ = السالبة + الصفر + الموجبة.'
        },
        figure: (language) => <ElevatorFigure language={language} />
    },
    {
        id: 'number-line',
        stage: 'line',
        title: { eu: 'Zenbaki osoak zuzenean', es: 'Los enteros en la recta numérica', en: 'Integers on the number line', ar: 'الأعداد الصحيحة على المستقيم' },
        goal: {
            eu: 'Zenbaki osoak zenbakizko zuzenean irudikatzea.',
            es: 'Representar números enteros en la recta numérica.',
            en: 'Represent integers on the number line.',
            ar: 'تمثيل الأعداد الصحيحة على مستقيم الأعداد.'
        },
        needs: [{ unit: 'dbh1/zenbaki-naturalak', topic: 'order', title: { eu: 'Ordenatu eta zuzenean kokatu', es: 'Ordenar y situar en la recta', en: 'Ordering and placing on the number line', ar: 'الترتيب والتمثيل على المستقيم' } }],
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Marraztu zuzen bat eta markatu jatorria: 0.', es: 'Dibuja una recta y marca el origen: 0.', en: 'Draw a straight line and mark the origin: 0.', ar: 'ارسم مستقيمًا وحدّد الأصل: 0.' } },
            { text: { eu: 'Zatitu zuzena zati berdinetan (unitateak) zeroaren bi aldeetara.', es: 'Divide la recta en partes iguales (unidades) a los dos lados del cero.', en: 'Divide the number line into equal parts (units) on both sides of zero.', ar: 'قسّم المستقيم إلى أجزاء متساوية (وحدات) على جانبي الصفر.' } },
            { text: { eu: 'Idatzi positiboak eskuinean: +1, +2, +3…', es: 'Escribe los positivos a la derecha: +1, +2, +3…', en: 'Write the positives on the right: +1, +2, +3…', ar: `اكتب الموجبة على اليمين: ${ltr('+1, +2, +3…')}` } },
            { text: { eu: 'Idatzi negatiboak ezkerrean: −1, −2, −3…', es: 'Escribe los negativos a la izquierda: −1, −2, −3…', en: 'Write the negatives on the left: −1, −2, −3…', ar: `اكتب السالبة على اليسار: ${ltr('−1, −2, −3…')}` } }
        ],
        takeaway: {
            eu: 'Ezkerrean negatiboak, erdian zeroa, eskuinean positiboak.',
            es: 'A la izquierda los negativos, en medio el cero, a la derecha los positivos.',
            en: 'On the left, the negatives; in the middle, zero; on the right, the positives.',
            ar: 'السالبة على اليسار، والصفر في الوسط، والموجبة على اليمين.'
        },
        figure: () => <NumberLine min={-7} max={7} braces points={[{ value: -4, tone: 'second', label: '−4' }, { value: 5, label: '+5' }]} />
    },
    {
        id: 'compare',
        stage: 'line',
        title: { eu: 'Zenbaki osoak alderatzea', es: 'Comparar números enteros', en: 'Compare integers', ar: 'مقارنة الأعداد الصحيحة' },
        goal: {
            eu: 'Bi zenbaki oso < eta > ikurrekin alderatzea.',
            es: 'Comparar dos números enteros con los símbolos < y >.',
            en: 'Compare two integers using the symbols < and >.',
            ar: 'مقارنة عددين صحيحين بالرمزين < و>.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Positiboa > negatiboa', es: 'Positivo > negativo', en: 'Positive > negative', ar: 'موجب > سالب' }, text: { eu: 'Positiboa beti dago eskuinerago.', es: 'El positivo siempre está más a la derecha.', en: 'The positive is always further to the right.', ar: 'الموجب دائمًا أبعد نحو اليمين.' }, math: '$+5>-3$' },
            { title: { eu: 'Bi positibo', es: 'Dos positivos', en: 'Two positives', ar: 'عددان موجبان' }, text: { eu: 'Zenbaki naturalak bezala.', es: 'Como con los naturales.', en: 'The same as with natural numbers.', ar: 'كما في الأعداد الطبيعية.' }, math: '$+7<+11$' },
            { title: { eu: 'Bi negatibo', es: 'Dos negativos', en: 'Two negatives', ar: 'عددان سالبان' }, text: { eu: 'Zerotik hurbilago dagoena da handiagoa.', es: 'Es mayor el que está más cerca del cero.', en: 'The one closer to zero is greater.', ar: 'الأكبر هو الأقرب إلى الصفر.' }, math: '$-4>-8$' },
            { title: { eu: 'Zeroarekin', es: 'Con el cero', en: 'With zero', ar: 'مع الصفر' }, text: { eu: 'Zeroa negatiboak baino handiagoa eta positiboak baino txikiagoa da.', es: 'El cero es mayor que los negativos y menor que los positivos.', en: 'Zero is greater than negatives and less than positives.', ar: 'الصفر أكبر من السالبة وأصغر من الموجبة.' }, math: '$-1<0<+1$' }
        ],
        takeaway: {
            eu: 'Eskuinerago dagoena da handiagoa.',
            es: 'Es mayor el que está más a la derecha.',
            en: 'The one further to the right is greater.',
            ar: 'الأكبر هو الأبعد نحو اليمين.'
        },
        figure: () => <NumberLine min={-8} max={4} points={[{ value: -6, tone: 'second', label: '−6' }, { value: -2, label: '−2' }]} caption="−6 < −2" />
    },
    {
        id: 'order',
        stage: 'line',
        title: { eu: 'Zenbaki osoak ordenatzea', es: 'Ordenar números enteros', en: 'Order integers', ar: 'ترتيب الأعداد الصحيحة' },
        goal: {
            eu: 'Zenbaki osoen zerrenda bat txikienetik handienera eta alderantziz ordenatzea.',
            es: 'Ordenar una lista de enteros de menor a mayor y de mayor a menor.',
            en: 'Order a list of integers from smallest to largest and from largest to smallest.',
            ar: 'ترتيب قائمة أعداد صحيحة تصاعديًا وتنازليًا.'
        },
        problem: { eu: 'Ordenatu txikienetik handienera: $+11$, $-2$, $+8$, $0$, $-6$, $+3$, $-9$.', es: 'Ordena de menor a mayor: $+11$, $-2$, $+8$, $0$, $-6$, $+3$, $-9$.', en: 'Order from smallest to largest: $+11$, $-2$, $+8$, $0$, $-6$, $+3$, $-9$.', ar: 'رتّب من الأصغر إلى الأكبر: $+11$، $-2$، $+8$، $0$، $-6$، $+3$، $-9$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Negatiboak lehenik: zerotik urrunen dagoena da txikiena.', es: 'Primero los negativos: el más alejado del cero es el menor.', en: 'First the negatives: the one furthest from zero is the smallest.', ar: 'السالبة أولًا: الأبعد عن الصفر هو الأصغر.' }, math: '$-9<-6<-2$' },
            { text: { eu: 'Gero zeroa.', es: 'Después el cero.', en: 'Then zero.', ar: 'ثم الصفر.' }, math: '$0$' },
            { text: { eu: 'Azkenik positiboak, naturalak bezala.', es: 'Por último los positivos, como los naturales.', en: 'Finally, the positives, as with natural numbers.', ar: 'وأخيرًا الموجبة كالأعداد الطبيعية.' }, math: '$+3<+8<+11$' }
        ],
        takeaway: {
            eu: 'Txikienetik handienera: negatiboak, zeroa, positiboak.',
            es: 'De menor a mayor: negativos, cero, positivos.',
            en: 'From smallest to largest: negatives, zero, positives.',
            ar: 'من الأصغر إلى الأكبر: السالبة، الصفر، الموجبة.'
        },
        figureAfterSteps: true,
        figure: () => <NumberLine min={-10} max={12} labelEvery={2} points={[-9, -6, -2, 0, 3, 8, 11].map((value) => ({ value, tone: value < 0 ? 'second' as const : 'stage' as const }))} />
    },
    {
        id: 'absolute',
        stage: 'absolute',
        title: { eu: 'Balio absolutua', es: 'El valor absoluto', en: 'Absolute value', ar: 'القيمة المطلقة' },
        goal: {
            eu: 'Zenbaki oso baten balio absolutua kalkulatzea.',
            es: 'Calcular el valor absoluto de un número entero.',
            en: 'Calculate the absolute value of an integer.',
            ar: 'حساب القيمة المطلقة لعدد صحيح.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Negatibo batena', es: 'De un negativo', en: 'Of a negative', ar: 'لعدد سالب' }, text: { eu: '−3 zerotik 3 unitatera dago.', es: '−3 está a 3 unidades del cero.', en: '−3 is 3 units from zero.', ar: `يبعد ${ltr('−3')} عن الصفر 3 وحدات.` }, math: '$\\lvert -3\\rvert =3$' },
            { title: { eu: 'Positibo batena', es: 'De un positivo', en: 'Of a positive', ar: 'لعدد موجب' }, text: { eu: '+5 zerotik 5 unitatera dago.', es: '+5 está a 5 unidades del cero.', en: '+5 is 5 units from zero.', ar: `يبعد ${ltr('+5')} عن الصفر 5 وحدات.` }, math: '$\\lvert +5\\rvert =5$' },
            { title: { eu: 'Zeroarena', es: 'Del cero', en: 'Of zero', ar: 'للصفر' }, text: { eu: 'Zeroa ez dago zerotik urrun.', es: 'El cero no está nada lejos del cero.', en: 'Zero is not far from zero at all.', ar: 'الصفر لا يبعد عن نفسه.' }, math: '$\\lvert 0\\rvert =0$' }
        ],
        takeaway: {
            eu: 'Balio absolutua = zeinua kendu = zerora dagoen distantzia.',
            es: 'Valor absoluto = quitar el signo = distancia al cero.',
            en: 'Absolute value = remove the sign = distance from zero.',
            ar: 'القيمة المطلقة = حذف الإشارة = البعد عن الصفر.'
        },
        figure: () => <NumberLine min={-6} max={6} points={[{ value: -3, tone: 'second' }, { value: 5 }]} spans={[{ from: 0, to: -3, tone: 'second', label: '|−3| = 3' }, { from: 0, to: 5, label: '|+5| = 5' }]} />
    },
    {
        id: 'opposite',
        stage: 'absolute',
        title: { eu: 'Aurkakoa', es: 'El opuesto', en: 'The opposite', ar: 'المعاكس' },
        goal: {
            eu: 'Zenbaki oso baten aurkakoa aurkitzea.',
            es: 'Encontrar el opuesto de un número entero.',
            en: 'Find the opposite of an integer.',
            ar: 'إيجاد معاكس عدد صحيح.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Zeinua aldatu', es: 'Cambiar el signo', en: 'Change the sign', ar: 'غيّر الإشارة' }, text: { eu: 'Positibo baten aurkakoa negatiboa da, eta alderantziz.', es: 'El opuesto de un positivo es negativo, y al revés.', en: 'The opposite of a positive is a negative, and the other way round.', ar: 'معاكس الموجب سالب، والعكس.' }, math: { eu: '$\\begin{gathered}\\mathrm{Aur}(+5)=-5\\\\\\mathrm{Aur}(-5)=+5\\end{gathered}$', es: '$\\begin{gathered}\\mathrm{Op}(+5)=-5\\\\\\mathrm{Op}(-5)=+5\\end{gathered}$', en: '$\\begin{gathered}\\mathrm{Op}(+5)=-5\\\\\\mathrm{Op}(-5)=+5\\end{gathered}$', ar: '$\\begin{gathered}\\mathrm{Aur}(+5)=-5\\\\\\mathrm{Aur}(-5)=+5\\end{gathered}$' } },
            { title: { eu: 'Balio absolutu bera', es: 'Mismo valor absoluto', en: 'Same absolute value', ar: 'القيمة المطلقة نفسها' }, text: { eu: 'Biak zerotik 5 unitatera daude.', es: 'Los dos están a 5 unidades del cero.', en: 'Both are 5 units from zero.', ar: 'كلاهما يبعد 5 وحدات عن الصفر.' }, math: '$\\lvert +5\\rvert =\\lvert -5\\rvert =5$' },
            { title: { eu: 'Zeroaren aurkakoa', es: 'El opuesto del cero', en: 'The opposite of zero', ar: 'معاكس الصفر' }, text: { eu: 'Zeroa bera da.', es: 'Es el propio cero.', en: 'It is zero itself.', ar: 'هو الصفر نفسه.' }, math: { eu: '$\\mathrm{Aur}(0)=0$', es: '$\\mathrm{Op}(0)=0$', en: '$\\mathrm{Op}(0)=0$', ar: '$\\mathrm{Aur}(0)=0$' } }
        ],
        takeaway: {
            eu: 'Aurkakoa = zeinua aldatu. Ispilu bat zeroan bezala.',
            es: 'Opuesto = cambiar el signo. Como un espejo en el cero.',
            en: 'Opposite = change the sign. Like a mirror at zero.',
            ar: 'المعاكس = تغيير الإشارة. كمرآة عند الصفر.'
        },
        figure: () => <NumberLine min={-6} max={6} mirror points={[{ value: -5, tone: 'second', label: '−5' }, { value: 5, label: '+5' }]} spans={[{ from: 0, to: -5, tone: 'second', label: '5' }, { from: 0, to: 5, label: '5' }]} />
    },
    {
        id: 'compare-absolute',
        stage: 'absolute',
        title: { eu: 'Balio absolutuarekin alderatzea', es: 'Comparar con el valor absoluto', en: 'Compare using the absolute value', ar: 'المقارنة بالقيمة المطلقة' },
        goal: {
            eu: 'Zenbaki osoak balio absolutua erabiliz alderatzea.',
            es: 'Comparar números enteros usando el valor absoluto.',
            en: 'Compare integers using the absolute value.',
            ar: 'مقارنة الأعداد الصحيحة باستعمال القيمة المطلقة.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Bi positibo', es: 'Dos positivos', en: 'Two positives', ar: 'عددان موجبان' }, text: { eu: '7 > 3 denez, +7 > +3.', es: 'Como 7 > 3, +7 > +3.', en: 'As 7 > 3, +7 > +3.', ar: `بما أن ${ltr('7 > 3')} فإن ${ltr('+7 > +3')}.` }, math: '$\\lvert +7\\rvert =7>\\lvert +3\\rvert =3$' },
            { title: { eu: 'Bi negatibo', es: 'Dos negativos', en: 'Two negatives', ar: 'عددان سالبان' }, text: { eu: '4 < 6 denez, −4 > −6.', es: 'Como 4 < 6, −4 > −6.', en: 'As 4 < 6, −4 > −6.', ar: `بما أن ${ltr('4 < 6')} فإن ${ltr('−4 > −6')}.` }, math: '$\\lvert -4\\rvert =4<\\lvert -6\\rvert =6$' },
            { title: { eu: 'Zeinu desberdinak', es: 'Signos distintos', en: 'Different signs', ar: 'إشارتان مختلفتان' }, text: { eu: 'Ez da ezer kalkulatu behar.', es: 'No hay que calcular nada.', en: 'You do not need to calculate anything.', ar: 'لا حاجة إلى أي حساب.' }, math: '$+3>-10$' }
        ],
        takeaway: {
            eu: 'Negatiboetan, balio absolutu txikiena duena da handiena.',
            es: 'Entre negativos, el de menor valor absoluto es el mayor.',
            en: 'Between negatives, the one with the smaller absolute value is greater.',
            ar: 'بين السالبة، صاحب القيمة المطلقة الأصغر هو الأكبر.'
        }
    },
    {
        id: 'add-same',
        stage: 'addsub',
        title: { eu: 'Zeinu bereko zenbakien batuketa', es: 'Suma de enteros del mismo signo', en: 'Adding integers with the same sign', ar: 'جمع عددين لهما الإشارة نفسها' },
        goal: {
            eu: 'Zeinu bera duten bi zenbaki oso batzea.',
            es: 'Sumar dos números enteros del mismo signo.',
            en: 'Add two integers with the same sign.',
            ar: 'جمع عددين صحيحين لهما الإشارة نفسها.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Bi positibo', es: 'Dos positivos', en: 'Two positives', ar: 'عددان موجبان' }, text: { eu: '3 + 2 = 5, zeinua +.', es: '3 + 2 = 5, signo +.', en: '3 + 2 = 5, sign +.', ar: `${ltr('3 + 2 = 5')}، والإشارة +.` }, math: '$(+3)+(+2)=+5$' },
            { title: { eu: 'Bi negatibo', es: 'Dos negativos', en: 'Two negatives', ar: 'عددان سالبان' }, text: { eu: '4 + 1 = 5, zeinua −.', es: '4 + 1 = 5, signo −.', en: '4 + 1 = 5, sign −.', ar: `${ltr('4 + 1 = 5')}، والإشارة −.` }, math: '$(-4)+(-1)=-5$' }
        ],
        takeaway: {
            eu: 'Zeinu bera: batu eta zeinua mantendu.',
            es: 'Mismo signo: se suman y se mantiene el signo.',
            en: 'Same sign: add them and keep the sign.',
            ar: 'إشارة واحدة: نجمع ونحافظ على الإشارة.'
        },
        figure: () => <NumberLine min={-7} max={2} jumps={[{ from: 0, to: -4, tone: 'second', label: '−4', row: 1 }, { from: -4, to: -5, tone: 'second', label: '−1' }]} points={[{ value: -5, tone: 'second' }]} caption="(−4) + (−1) = −5" />
    },
    {
        id: 'add-different',
        stage: 'addsub',
        title: { eu: 'Zeinu desberdineko zenbakien batuketa', es: 'Suma de enteros de distinto signo', en: 'Adding integers with different signs', ar: 'جمع عددين مختلفي الإشارة' },
        goal: {
            eu: 'Zeinu desberdina duten bi zenbaki oso batzea.',
            es: 'Sumar dos números enteros de distinto signo.',
            en: 'Add two integers with different signs.',
            ar: 'جمع عددين صحيحين مختلفي الإشارة.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Positiboa irabazle', es: 'Gana el positivo', en: 'The positive wins', ar: 'يغلب الموجب' }, text: { eu: '5 − 3 = 2, eta 5 handiagoa da: +.', es: '5 − 3 = 2, y 5 es mayor: +.', en: '5 − 3 = 2, and 5 is greater: +.', ar: `${ltr('5 − 3 = 2')}، و5 أكبر: +.` }, math: '$(+5)+(-3)=+2$' },
            { title: { eu: 'Negatiboa irabazle', es: 'Gana el negativo', en: 'The negative wins', ar: 'يغلب السالب' }, text: { eu: '7 − 2 = 5, eta 7 handiagoa da: −.', es: '7 − 2 = 5, y 7 es mayor: −.', en: '7 − 2 = 5, and 7 is greater: −.', ar: `${ltr('7 − 2 = 5')}، و7 أكبر: −.` }, math: '$(+2)+(-7)=-5$' },
            { title: { eu: 'Aurkakoak', es: 'Opuestos', en: 'Opposites', ar: 'متعاكسان' }, text: { eu: 'Zenbaki bat gehi bere aurkakoa zero da.', es: 'Un número más su opuesto da cero.', en: 'A number plus its opposite is zero.', ar: 'العدد زائد معاكسه يساوي صفرًا.' }, math: '$(-4)+(+4)=0$' }
        ],
        takeaway: {
            eu: 'Zeinu desberdina: kendu, eta irabazten duenaren zeinua jarri.',
            es: 'Distinto signo: se restan y se pone el signo del que gana.',
            en: 'Different signs: subtract them and use the sign of the one that wins.',
            ar: 'إشارتان مختلفتان: نطرح ونضع إشارة الغالب.'
        },
        figure: (language) => <CountersFigure language={language} have={5} owe={3} />
    },
    {
        id: 'subtract',
        stage: 'addsub',
        title: { eu: 'Kenketa: aurkakoa batu', es: 'La resta: sumar el opuesto', en: 'Subtraction: add the opposite', ar: 'الطرح: جمع المعاكس' },
        goal: {
            eu: 'Bi zenbaki osoren kenketa batuketa bihurtuz egitea.',
            es: 'Restar dos enteros convirtiendo la resta en una suma.',
            en: 'Subtract two integers by turning the subtraction into an addition.',
            ar: 'طرح عددين صحيحين بتحويل الطرح إلى جمع.'
        },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Kenketa aurkakoaren batuketa bihurtu.', es: 'Convierte la resta en la suma del opuesto.', en: 'Turn the subtraction into adding the opposite.', ar: 'حوّل الطرح إلى جمع المعاكس.' }, math: '$(-6)-(-1)=(-6)+(+1)$' },
            { text: { eu: 'Aplikatu batuketaren araua: zeinu desberdinak, kendu.', es: 'Aplica la regla de la suma: signos distintos, se restan.', en: 'Apply the addition rule: different signs, subtract them.', ar: 'طبّق قاعدة الجمع: إشارتان مختلفتان، نطرح.' }, math: '$6-1=5$' },
            { text: { eu: 'Jarri irabazten duenaren zeinua.', es: 'Pon el signo del que gana.', en: 'Use the sign of the one that wins.', ar: 'ضع إشارة الغالب.' }, math: '$(-6)-(-1)=-5$' }
        ],
        problem: { eu: 'Kalkulatu $(-6)-(-1)$.', es: 'Calcula $(-6)-(-1)$.', en: 'Work out $(-6)-(-1)$.', ar: 'احسب $(-6)-(-1)$.' },
        takeaway: {
            eu: 'Kentzea = aurkakoa batzea.',
            es: 'Restar = sumar el opuesto.',
            en: 'Subtract = add the opposite.',
            ar: 'الطرح = جمع المعاكس.'
        },
        figure: () => <NumberLine min={-4} max={6} jumps={[{ from: 0, to: 5, label: '+5', row: 1 }, { from: 5, to: 3, tone: 'second', label: '−2' }]} points={[{ value: 3 }]} caption="(+5) − (+2) = (+5) + (−2) = +3" />
    },
    {
        id: 'brackets',
        stage: 'addsub',
        title: { eu: 'Parentesiak kentzea', es: 'Quitar paréntesis', en: 'Removing brackets', ar: 'حذف الأقواس' },
        goal: {
            eu: 'Batuketa eta kenketa kateak parentesiak kenduz kalkulatzea.',
            es: 'Calcular cadenas de sumas y restas quitando paréntesis.',
            en: 'Calculate chains of additions and subtractions by removing brackets.',
            ar: 'حساب سلاسل الجمع والطرح بحذف الأقواس.'
        },
        needs: [{ unit: 'dbh1/zenbaki-naturalak', topic: 'brackets', title: { eu: 'Parentesiak eta kako zuzenak', es: 'Paréntesis y corchetes', en: 'Brackets and square brackets', ar: 'الأقواس والأقواس المعقوفة' } }],
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Kendu parentesiak: − aurrean badago, aldatu barruko zeinuak.', es: 'Quita los paréntesis: si delante hay un −, cambia los signos de dentro.', en: 'Remove the brackets: if there is a − in front, change the signs inside.', ar: 'احذف الأقواس: إذا سبقها −، غيّر الإشارات داخلها.' }, math: '$8-(4-7)=8-4+7$' },
            { text: { eu: 'Batu positiboak alde batetik eta negatiboak bestetik.', es: 'Suma los positivos por un lado y los negativos por otro.', en: 'Add the positives on one side and the negatives on the other.', ar: 'اجمع الموجبة وحدها والسالبة وحدها.' }, math: '$8+7=15 \\qquad 4$' },
            { text: { eu: 'Kendu emaitzak eta jarri handienaren zeinua.', es: 'Resta los resultados y pon el signo del mayor.', en: 'Subtract the results and use the sign of the larger one.', ar: 'اطرح النتيجتين وضع إشارة الأكبر.' }, math: '$15-4=11$' }
        ],
        takeaway: {
            eu: '+( ): zeinuak berdin. −( ): zeinu guztiak aldatu.',
            es: '+( ): signos iguales. −( ): cambian todos los signos.',
            en: '+( ): signs stay the same. −( ): all the signs change.',
            ar: '+( ): الإشارات كما هي. −( ): تتغير كل الإشارات.'
        },
        figure: (language) => <BracketsFigure language={language} />
    },
    {
        id: 'multiply',
        stage: 'muldiv',
        title: { eu: 'Zenbaki osoen biderketa', es: 'Multiplicación de enteros', en: 'Multiplying integers', ar: 'ضرب الأعداد الصحيحة' },
        goal: {
            eu: 'Bi zenbaki oso biderkatzea zeinuen araua erabiliz.',
            es: 'Multiplicar dos números enteros con la regla de los signos.',
            en: 'Multiply two integers using the rule of signs.',
            ar: 'ضرب عددين صحيحين بقاعدة الإشارات.'
        },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Biderkatu zenbakiak zeinurik gabe.', es: 'Multiplica los números sin signo.', en: 'Multiply the numbers without their signs.', ar: 'اضرب العددين دون إشارة.' }, math: '$5\\cdot 3=15$' },
            { text: { eu: 'Zeinu bera: +. Zeinu desberdinak: −.', es: 'Mismo signo: +. Signos distintos: −.', en: 'Same sign: +. Different signs: −.', ar: 'الإشارة نفسها: +. إشارتان مختلفتان: −.' }, math: '$(+5)\\cdot (-3)=-15 \\qquad (-5)\\cdot (-3)=+15$' }
        ],
        takeaway: {
            eu: 'Zeinu bera → +. Zeinu desberdinak → −.',
            es: 'Mismo signo → +. Signos distintos → −.',
            en: 'Same sign → +. Different signs → −.',
            ar: 'الإشارة نفسها ← +. إشارتان مختلفتان ← −.'
        },
        figure: (language) => <SignRuleFigure language={language} />
    },
    {
        id: 'divide',
        stage: 'muldiv',
        title: { eu: 'Zenbaki osoen zatiketa', es: 'División de enteros', en: 'Dividing integers', ar: 'قسمة الأعداد الصحيحة' },
        goal: {
            eu: 'Bi zenbaki oso zatitzea eta falta den zenbakia aurkitzea.',
            es: 'Dividir dos números enteros y encontrar el número que falta.',
            en: 'Divide two integers and find the missing number.',
            ar: 'قسمة عددين صحيحين وإيجاد العدد الناقص.'
        },
        needs: [{ unit: 'dbh1/zenbaki-naturalak', topic: 'divide', title: { eu: 'Zatiketa', es: 'La división', en: 'Division', ar: 'القسمة' } }],
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Zeinu desberdinak', es: 'Signos distintos', en: 'Different signs', ar: 'إشارتان مختلفتان' }, text: { eu: '20 : 4 = 5, eta zeinua −.', es: '20 : 4 = 5, y signo −.', en: '20 : 4 = 5, and sign −.', ar: `${ltr('20 : 4 = 5')}، والإشارة −.` }, math: '$(+20)\\mathbin{:}(-4)=-5$' },
            { title: { eu: 'Zeinu bera', es: 'Mismo signo', en: 'Same sign', ar: 'الإشارة نفسها' }, text: { eu: '20 : 4 = 5, eta zeinua +.', es: '20 : 4 = 5, y signo +.', en: '20 : 4 = 5, and sign +.', ar: `${ltr('20 : 4 = 5')}، والإشارة +.` }, math: '$(-20)\\mathbin{:}(-4)=+5$' },
            { title: { eu: 'Falta den zenbakia', es: 'El número que falta', en: 'The missing number', ar: 'العدد الناقص' }, text: { eu: '(+9) · □ = −36 bada, □ = (−36) : (+9).', es: 'Si (+9) · □ = −36, entonces □ = (−36) : (+9).', en: 'If (+9) · □ = −36, then □ = (−36) : (+9).', ar: `إذا كان ${ltr('(+9) · □ = −36')} فإن ${ltr('□ = (−36) : (+9)')}.` }, math: '$\\square =-4$' }
        ],
        takeaway: {
            eu: 'Zatiketan ere: zeinu bera → +, zeinu desberdinak → −.',
            es: 'En la división también: mismo signo → +, signos distintos → −.',
            en: 'In division too: same sign → +, different signs → −.',
            ar: 'في القسمة أيضًا: الإشارة نفسها ← +، إشارتان مختلفتان ← −.'
        }
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const integerIntroTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...integerIntroLessonTexts[topic.id as IntegerIntroTopicId], ...integerIntroLessonChecks[topic.id as IntegerIntroTopicId] }))
