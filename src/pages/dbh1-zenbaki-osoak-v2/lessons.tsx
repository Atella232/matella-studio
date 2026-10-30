import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { NumberLine, SignRuleFigure, SituationsFigure } from '../dbh2-zenbaki-osoak/figures'
import { BracketsFigure, CountersFigure, ElevatorFigure } from './figures'

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

export const integerIntroTopics: UnitTopic[] = [
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
        explanation: {
            eu: 'Egunero entzuten ditugu honelako esaldiak: «autoa bigarren sotoan dago», «zero azpitik lau gradu daude» edo «160 euro zor ditut». Kopuru horiek zero baino txikiagoak dira, eta zenbaki negatiboekin adierazten dira: − zeinua dute aurrean. Zero baino handiagoak direnak zenbaki positiboak dira, eta + zeinua dute.',
            es: 'Todos los días oímos frases como «el coche está en el segundo sótano», «hace cuatro grados bajo cero» o «debo 160 euros». Esas cantidades son menores que cero y se expresan con números negativos: llevan delante el signo −. Las que son mayores que cero son números positivos y llevan el signo +.',
            en: 'Every day we hear phrases like “the car is in the second basement”, “it is four degrees below zero” or “I owe €160”. These amounts are less than zero and are expressed with negative numbers: they have the sign − in front. Those that are greater than zero are positive numbers and have the sign +.',
            ar: 'نسمع كل يوم عبارات مثل «السيارة في القبو الثاني» و«الحرارة أربع درجات تحت الصفر» و«عليّ 160 يورو». هذه الكميات أصغر من الصفر ونعبّر عنها بأعداد سالبة تسبقها الإشارة −. أما الكميات الأكبر من الصفر فهي أعداد موجبة تسبقها الإشارة +.'
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
        example: '$\\begin{gathered}\\text{−120 m}\\qquad \\text{+8.844 m}\\\\\\text{−4 °C}\\qquad \\text{+30 °C}\\end{gathered}$',
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
        explanation: {
            eu: 'Zenbaki positiboek, negatiboek eta zeroak zenbaki osoen multzoa osatzen dute, eta ℤ letraz idazten da. Positiboak + zeinua duten zenbaki naturalak dira; positiboak zeinurik gabe ere idatz daitezke: +5 = 5. Zeroa ez da ez positiboa ez negatiboa. Igogailu baten botoiek ondo erakusten dute: solairuak positiboak, beheko solairua zeroa eta sotoak negatiboak.',
            es: 'Los números positivos, los negativos y el cero forman el conjunto de los números enteros, que se escribe ℤ. Los positivos son los naturales con signo +; también se pueden escribir sin signo: +5 = 5. El cero no es ni positivo ni negativo. Los botones de un ascensor lo muestran bien: las plantas son positivas, la planta baja es el cero y los sótanos son negativos.',
            en: 'Positive numbers, negative numbers and zero make up the set of integers, which is written ℤ. Positive numbers are the natural numbers with a + sign; they can also be written without the sign: +5 = 5. Zero is neither positive nor negative. The buttons in a lift show this well: the floors are positive, the ground floor is zero and the basements are negative.',
            ar: 'تشكّل الأعداد الموجبة والسالبة والصفر مجموعة الأعداد الصحيحة، وتُكتب ℤ. الموجبة هي الأعداد الطبيعية مع الإشارة +، ويمكن كتابتها دون إشارة: ‏+5 = 5. الصفر ليس موجبًا ولا سالبًا. أزرار المصعد توضّح ذلك: الطوابق موجبة، والطابق الأرضي صفر، والأقبية سالبة.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Positiboak', es: 'Positivos', en: 'Positives', ar: 'الموجبة' }, text: { eu: 'Zenbaki naturalak + zeinuarekin.', es: 'Los naturales con signo +.', en: 'Natural numbers with a + sign.', ar: 'الأعداد الطبيعية مع الإشارة +.' }, math: '$+1,\\ +2,\\ +3,\\ +4,\\ \\dots$' },
            { title: { eu: 'Zeroa', es: 'El cero', en: 'Zero', ar: 'الصفر' }, text: { eu: 'Ez positiboa ez negatiboa.', es: 'Ni positivo ni negativo.', en: 'Neither positive nor negative.', ar: 'ليس موجبًا ولا سالبًا.' }, math: '$0$' },
            { title: { eu: 'Negatiboak', es: 'Negativos', en: 'Negatives', ar: 'السالبة' }, text: { eu: 'Zenbaki naturalak − zeinuarekin.', es: 'Los naturales con signo −.', en: 'Natural numbers with a − sign.', ar: 'الأعداد الطبيعية مع الإشارة −.' }, math: '$-1,\\ -2,\\ -3,\\ -4,\\ \\dots$' }
        ],
        example: '$\\mathbb{Z}=\\{\\dots,-3,-2,-1,0,+1,+2,+3,\\dots\\}$',
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
        explanation: {
            eu: 'Zenbaki naturalen zuzena ezkerrerantz luzatzen da. Zeroa jatorria da; positiboak eskuinean daude eta negatiboak ezkerrean, zerotik distantzia berean. Horrela, zenbakiak ordenatuta geratzen dira.',
            es: 'La recta de los números naturales se alarga hacia la izquierda. El cero es el origen; los positivos van a la derecha y los negativos a la izquierda, a las mismas distancias del cero. Así los números quedan ordenados.',
            en: 'The number line of natural numbers is extended to the left. Zero is the origin: positive numbers go to the right and negative numbers to the left, at the same distances from zero. That way the numbers are ordered.',
            ar: 'نمدّ مستقيم الأعداد الطبيعية نحو اليسار. الصفر هو الأصل؛ الموجبة على اليمين والسالبة على اليسار، على المسافات نفسها من الصفر. وهكذا تبقى الأعداد مرتّبة.'
        },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Marraztu zuzen bat eta markatu jatorria: 0.', es: 'Dibuja una recta y marca el origen: 0.', en: 'Draw a straight line and mark the origin: 0.', ar: 'ارسم مستقيمًا وحدّد الأصل: 0.' } },
            { text: { eu: 'Zatitu zuzena zati berdinetan (unitateak) zeroaren bi aldeetara.', es: 'Divide la recta en partes iguales (unidades) a los dos lados del cero.', en: 'Divide the number line into equal parts (units) on both sides of zero.', ar: 'قسّم المستقيم إلى أجزاء متساوية (وحدات) على جانبي الصفر.' } },
            { text: { eu: 'Idatzi positiboak eskuinean: +1, +2, +3…', es: 'Escribe los positivos a la derecha: +1, +2, +3…', en: 'Write the positives on the right: +1, +2, +3…', ar: `اكتب الموجبة على اليمين: ${ltr('+1, +2, +3…')}` } },
            { text: { eu: 'Idatzi negatiboak ezkerrean: −1, −2, −3…', es: 'Escribe los negativos a la izquierda: −1, −2, −3…', en: 'Write the negatives on the left: −1, −2, −3…', ar: `اكتب السالبة على اليسار: ${ltr('−1, −2, −3…')}` } }
        ],
        example: '$-7<-4<-1<0<+2<+5$',
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
        explanation: {
            eu: 'Zenbakizko zuzenean, eskuinerago dagoena da handiagoa. Horregatik, edozein positibo edozein negatibo baino handiagoa da, eta zeroa negatibo guztiak baino handiagoa. Termometroan ere hala da: −2 °C ez da −6 °C bezain hotza.',
            es: 'En la recta numérica, es mayor el que está más a la derecha. Por eso cualquier positivo es mayor que cualquier negativo, y el cero es mayor que todos los negativos. En el termómetro también: −2 °C no es tan frío como −6 °C.',
            en: 'On the number line, the one further to the right is greater. So any positive is greater than any negative, and zero is greater than all the negatives. On a thermometer it is the same: −2 °C is not as cold as −6 °C.',
            ar: `على مستقيم الأعداد يكون الأكبر هو الأبعد نحو اليمين. لذلك كل عدد موجب أكبر من كل عدد سالب، والصفر أكبر من كل السالبة. وفي ميزان الحرارة أيضًا: ${ltr('−2 °C')} ليست باردة مثل ${ltr('−6 °C')}.`
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Positiboa > negatiboa', es: 'Positivo > negativo', en: 'Positive > negative', ar: 'موجب > سالب' }, text: { eu: 'Positiboa beti dago eskuinerago.', es: 'El positivo siempre está más a la derecha.', en: 'The positive is always further to the right.', ar: 'الموجب دائمًا أبعد نحو اليمين.' }, math: '$+5>-3$' },
            { title: { eu: 'Bi positibo', es: 'Dos positivos', en: 'Two positives', ar: 'عددان موجبان' }, text: { eu: 'Zenbaki naturalak bezala.', es: 'Como con los naturales.', en: 'The same as with natural numbers.', ar: 'كما في الأعداد الطبيعية.' }, math: '$+7<+11$' },
            { title: { eu: 'Bi negatibo', es: 'Dos negativos', en: 'Two negatives', ar: 'عددان سالبان' }, text: { eu: 'Zerotik hurbilago dagoena da handiagoa.', es: 'Es mayor el que está más cerca del cero.', en: 'The one closer to zero is greater.', ar: 'الأكبر هو الأقرب إلى الصفر.' }, math: '$-4>-8$' },
            { title: { eu: 'Zeroarekin', es: 'Con el cero', en: 'With zero', ar: 'مع الصفر' }, text: { eu: 'Zeroa negatiboak baino handiagoa eta positiboak baino txikiagoa da.', es: 'El cero es mayor que los negativos y menor que los positivos.', en: 'Zero is greater than negatives and less than positives.', ar: 'الصفر أكبر من السالبة وأصغر من الموجبة.' }, math: '$-1<0<+1$' }
        ],
        example: '$-6<-2 \\qquad -1<0 \\qquad +3>-10$',
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
        explanation: {
            eu: 'Zenbaki osoak ordenatzeko, pentsatu nola geratuko liratekeen zuzenean: ezkerretik eskuinera irakurrita, txikienetik handienera daude. Lagungarria da hiru taldetan banatzea: negatiboak, zeroa eta positiboak.',
            es: 'Para ordenar enteros, piensa cómo quedarían en la recta: leídos de izquierda a derecha, van de menor a mayor. Ayuda separarlos en tres grupos: negativos, cero y positivos.',
            en: 'To order integers, think how they would look on the number line: read from left to right, they go from smallest to largest. It helps to split them into three groups: negatives, zero and positives.',
            ar: 'لترتيب الأعداد الصحيحة فكّر كيف تكون على المستقيم: إذا قرأناها من اليسار إلى اليمين تكون من الأصغر إلى الأكبر. يساعد تقسيمها إلى ثلاث مجموعات: السالبة والصفر والموجبة.'
        },
        problem: { eu: 'Ordenatu txikienetik handienera: $+11,\\ -2,\\ +8,\\ 0,\\ -6,\\ +3,\\ -9$.', es: 'Ordena de menor a mayor: $+11,\\ -2,\\ +8,\\ 0,\\ -6,\\ +3,\\ -9$.', en: 'Order from smallest to largest: $+11,\\ -2,\\ +8,\\ 0,\\ -6,\\ +3,\\ -9$.', ar: 'رتّب من الأصغر إلى الأكبر: $+11,\\ -2,\\ +8,\\ 0,\\ -6,\\ +3,\\ -9$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Negatiboak lehenik: zerotik urrunen dagoena da txikiena.', es: 'Primero los negativos: el más alejado del cero es el menor.', en: 'First the negatives: the one furthest from zero is the smallest.', ar: 'السالبة أولًا: الأبعد عن الصفر هو الأصغر.' }, math: '$-9<-6<-2$' },
            { text: { eu: 'Gero zeroa.', es: 'Después el cero.', en: 'Then zero.', ar: 'ثم الصفر.' }, math: '$0$' },
            { text: { eu: 'Azkenik positiboak, naturalak bezala.', es: 'Por último los positivos, como los naturales.', en: 'Finally, the positives, as with natural numbers.', ar: 'وأخيرًا الموجبة كالأعداد الطبيعية.' }, math: '$+3<+8<+11$' }
        ],
        example: '$-9<-6<-2<0<+3<+8<+11$',
        takeaway: {
            eu: 'Txikienetik handienera: negatiboak, zeroa, positiboak.',
            es: 'De menor a mayor: negativos, cero, positivos.',
            en: 'From smallest to largest: negatives, zero, positives.',
            ar: 'من الأصغر إلى الأكبر: السالبة، الصفر، الموجبة.'
        },
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
        explanation: {
            eu: 'Zenbaki oso baten balio absolutua zenbaki hori zerotik zenbat unitatera dagoen da. Bi barra artean idazten da, eta zenbakia bera da zeinurik gabe. Distantzia bat denez, ez da inoiz negatiboa.',
            es: 'El valor absoluto de un número entero es la distancia, en unidades, que lo separa del cero. Se escribe entre dos barras y es el mismo número sin su signo. Como es una distancia, nunca es negativo.',
            en: 'The absolute value of an integer is its distance from zero, in units. It is written between two bars and is the same number without its sign. As it is a distance, it is never negative.',
            ar: 'القيمة المطلقة لعدد صحيح هي بُعده عن الصفر بالوحدات. تُكتب بين خطين عموديين، وهي العدد نفسه دون إشارته. ولأنها مسافة فهي ليست سالبة أبدًا.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Negatibo batena', es: 'De un negativo', en: 'Of a negative', ar: 'لعدد سالب' }, text: { eu: '−3 zerotik 3 unitatera dago.', es: '−3 está a 3 unidades del cero.', en: '−3 is 3 units from zero.', ar: `يبعد ${ltr('−3')} عن الصفر 3 وحدات.` }, math: '$\\lvert -3\\rvert =3$' },
            { title: { eu: 'Positibo batena', es: 'De un positivo', en: 'Of a positive', ar: 'لعدد موجب' }, text: { eu: '+5 zerotik 5 unitatera dago.', es: '+5 está a 5 unidades del cero.', en: '+5 is 5 units from zero.', ar: `يبعد ${ltr('+5')} عن الصفر 5 وحدات.` }, math: '$\\lvert +5\\rvert =5$' },
            { title: { eu: 'Zeroarena', es: 'Del cero', en: 'Of zero', ar: 'للصفر' }, text: { eu: 'Zeroa ez dago zerotik urrun.', es: 'El cero no está nada lejos del cero.', en: 'Zero is not far from zero at all.', ar: 'الصفر لا يبعد عن نفسه.' }, math: '$\\lvert 0\\rvert =0$' }
        ],
        example: '$\\lvert -10\\rvert =10 \\qquad \\lvert +7\\rvert =7 \\qquad \\lvert -15\\rvert =15$',
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
        explanation: {
            eu: 'Bi zenbaki aurkakoak dira zerotik distantzia berera daudenean, baina alde banatan. Aurkakoa lortzeko zeinua aldatzen da. Aurkakoek balio absolutu bera dute. Euskaraz Aur idazten da: Aur(+5) = −5.',
            es: 'Dos números son opuestos cuando están a la misma distancia del cero, pero a lados distintos. Para obtener el opuesto se cambia el signo. Los opuestos tienen el mismo valor absoluto. Se escribe Op: Op(+5) = −5.',
            en: 'Two numbers are opposites when they are the same distance from zero, but on different sides. To get the opposite, change the sign. Opposites have the same absolute value. It is written Op: Op(+5) = −5.',
            ar: `يكون العددان متعاكسين إذا كانا على البعد نفسه من الصفر لكن في جهتين مختلفتين. للحصول على المعاكس نغيّر الإشارة. وللمتعاكسين القيمة المطلقة نفسها: ${ltr('Aur(+5) = −5')}.`
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Zeinua aldatu', es: 'Cambiar el signo', en: 'Change the sign', ar: 'غيّر الإشارة' }, text: { eu: 'Positibo baten aurkakoa negatiboa da, eta alderantziz.', es: 'El opuesto de un positivo es negativo, y al revés.', en: 'The opposite of a positive is a negative, and the other way round.', ar: 'معاكس الموجب سالب، والعكس.' }, math: { eu: '$\\begin{gathered}\\mathrm{Aur}(+5)=-5\\\\\\mathrm{Aur}(-5)=+5\\end{gathered}$', es: '$\\begin{gathered}\\mathrm{Op}(+5)=-5\\\\\\mathrm{Op}(-5)=+5\\end{gathered}$', en: '$\\begin{gathered}\\mathrm{Op}(+5)=-5\\\\\\mathrm{Op}(-5)=+5\\end{gathered}$', ar: '$\\begin{gathered}\\mathrm{Aur}(+5)=-5\\\\\\mathrm{Aur}(-5)=+5\\end{gathered}$' } },
            { title: { eu: 'Balio absolutu bera', es: 'Mismo valor absoluto', en: 'Same absolute value', ar: 'القيمة المطلقة نفسها' }, text: { eu: 'Biak zerotik 5 unitatera daude.', es: 'Los dos están a 5 unidades del cero.', en: 'Both are 5 units from zero.', ar: 'كلاهما يبعد 5 وحدات عن الصفر.' }, math: '$\\lvert +5\\rvert =\\lvert -5\\rvert =5$' },
            { title: { eu: 'Zeroaren aurkakoa', es: 'El opuesto del cero', en: 'The opposite of zero', ar: 'معاكس الصفر' }, text: { eu: 'Zeroa bera da.', es: 'Es el propio cero.', en: 'It is zero itself.', ar: 'هو الصفر نفسه.' }, math: { eu: '$\\mathrm{Aur}(0)=0$', es: '$\\mathrm{Op}(0)=0$', en: '$\\mathrm{Op}(0)=0$', ar: '$\\mathrm{Aur}(0)=0$' } }
        ],
        example: { eu: '$\\mathrm{Aur}(-12)=+12 \\qquad \\mathrm{Aur}(+9)=-9$', es: '$\\mathrm{Op}(-12)=+12 \\qquad \\mathrm{Op}(+9)=-9$', en: '$\\mathrm{Op}(-12)=+12 \\qquad \\mathrm{Op}(+9)=-9$', ar: '$\\mathrm{Aur}(-12)=+12 \\qquad \\mathrm{Aur}(+9)=-9$' },
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
        explanation: {
            eu: 'Zuzena marraztu gabe ere alderatu daitezke zenbaki osoak. Bi positiboren artean, balio absolutu handiena duena da handiena. Bi negatiboren artean, alderantziz: balio absolutu txikiena duena da handiena, zerotik hurbilago dagoelako. Bat positiboa eta bestea negatiboa badira, ez da balio absolutua behar: positiboa da handiena.',
            es: 'También se pueden comparar enteros sin dibujar la recta. Entre dos positivos, es mayor el de mayor valor absoluto. Entre dos negativos, al revés: es mayor el de menor valor absoluto, porque está más cerca del cero. Si uno es positivo y otro negativo, no hace falta el valor absoluto: el positivo es el mayor.',
            en: 'You can also compare integers without drawing the number line. Between two positives, the one with the greater absolute value is greater. Between two negatives, it is the other way round: the one with the smaller absolute value is greater, because it is closer to zero. If one is positive and the other negative, you do not need the absolute value: the positive one is greater.',
            ar: 'يمكن مقارنة الأعداد الصحيحة دون رسم المستقيم. بين موجبين يكون الأكبر صاحب القيمة المطلقة الأكبر. وبين سالبين العكس: الأكبر صاحب القيمة المطلقة الأصغر لأنه أقرب إلى الصفر. وإذا كان أحدهما موجبًا والآخر سالبًا فلا نحتاج القيمة المطلقة: الموجب هو الأكبر.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Bi positibo', es: 'Dos positivos', en: 'Two positives', ar: 'عددان موجبان' }, text: { eu: '7 > 3 denez, +7 > +3.', es: 'Como 7 > 3, +7 > +3.', en: 'As 7 > 3, +7 > +3.', ar: `بما أن ${ltr('7 > 3')} فإن ${ltr('+7 > +3')}.` }, math: '$\\lvert +7\\rvert =7>\\lvert +3\\rvert =3$' },
            { title: { eu: 'Bi negatibo', es: 'Dos negativos', en: 'Two negatives', ar: 'عددان سالبان' }, text: { eu: '4 < 6 denez, −4 > −6.', es: 'Como 4 < 6, −4 > −6.', en: 'As 4 < 6, −4 > −6.', ar: `بما أن ${ltr('4 < 6')} فإن ${ltr('−4 > −6')}.` }, math: '$\\lvert -4\\rvert =4<\\lvert -6\\rvert =6$' },
            { title: { eu: 'Zeinu desberdinak', es: 'Signos distintos', en: 'Different signs', ar: 'إشارتان مختلفتان' }, text: { eu: 'Ez da ezer kalkulatu behar.', es: 'No hay que calcular nada.', en: 'You do not need to calculate anything.', ar: 'لا حاجة إلى أي حساب.' }, math: '$+3>-10$' }
        ],
        example: '$-5<-3 \\qquad -16<+20 \\qquad +13>-11$',
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
        explanation: {
            eu: 'Bi zenbaki osok zeinu bera badute, balio absolutuak batu eta zeinu bera jartzen da. Pentsatu diruan: 3 € badituzu eta beste 2 € ematen badizkizute, 5 € dituzu; 4 € zor badituzu eta beste euro bat zor baduzu, 5 € zor dituzu.',
            es: 'Si dos enteros tienen el mismo signo, se suman sus valores absolutos y se pone el mismo signo. Piénsalo con dinero: si tienes 3 € y te dan 2 €, tienes 5 €; si debes 4 € y debes 1 € más, debes 5 €.',
            en: 'If two integers have the same sign, add their absolute values and keep the same sign. Think of money: if you have €3 and someone gives you €2, you have €5; if you owe €4 and you owe €1 more, you owe €5.',
            ar: 'إذا كان لعددين صحيحين الإشارة نفسها نجمع قيمتيهما المطلقتين ونضع الإشارة نفسها. فكّر بالمال: إذا كان لديك 3 € وأعطوك 2 € يصير لديك 5 €؛ وإذا كان عليك 4 € ثم صار عليك يورو آخر يصير عليك 5 €.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Bi positibo', es: 'Dos positivos', en: 'Two positives', ar: 'عددان موجبان' }, text: { eu: '3 + 2 = 5, zeinua +.', es: '3 + 2 = 5, signo +.', en: '3 + 2 = 5, sign +.', ar: `${ltr('3 + 2 = 5')}، والإشارة +.` }, math: '$(+3)+(+2)=+5$' },
            { title: { eu: 'Bi negatibo', es: 'Dos negativos', en: 'Two negatives', ar: 'عددان سالبان' }, text: { eu: '4 + 1 = 5, zeinua −.', es: '4 + 1 = 5, signo −.', en: '4 + 1 = 5, sign −.', ar: `${ltr('4 + 1 = 5')}، والإشارة −.` }, math: '$(-4)+(-1)=-5$' }
        ],
        example: '$(+5)+(+10)=+15 \\qquad (-5)+(-10)=-15$',
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
        explanation: {
            eu: 'Bi zenbaki osok zeinu desberdina badute, balio absolutu handienari txikiena kentzen zaio, eta balio absolutu handiena duenaren zeinua jartzen da. Diruan: 5 € badituzu eta 3 € zor badituzu, zorra ordaintzean 2 € geratzen zaizkizu. Zuzenean: positiboa batzea eskuinera mugitzea da, eta negatiboa batzea ezkerrera.',
            es: 'Si dos enteros tienen distinto signo, al mayor valor absoluto se le resta el menor, y se pone el signo del que tiene mayor valor absoluto. Con dinero: si tienes 5 € y debes 3 €, al pagar la deuda te quedan 2 €. En la recta: sumar un positivo es moverse a la derecha, y sumar un negativo, a la izquierda.',
            en: 'If two integers have different signs, subtract the smaller absolute value from the larger one, and use the sign of the number with the larger absolute value. With money: if you have €5 and you owe €3, after paying the debt you are left with €2. On the number line: adding a positive means moving to the right, and adding a negative means moving to the left.',
            ar: 'إذا كان لعددين صحيحين إشارتان مختلفتان نطرح القيمة المطلقة الصغرى من الكبرى، ونضع إشارة صاحب القيمة المطلقة الأكبر. بالمال: إذا كان لديك 5 € وعليك 3 € يبقى لك 2 € بعد سداد الدين. وعلى المستقيم: جمع موجب حركة نحو اليمين، وجمع سالب حركة نحو اليسار.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Positiboa irabazle', es: 'Gana el positivo', en: 'The positive wins', ar: 'يغلب الموجب' }, text: { eu: '5 − 3 = 2, eta 5 handiagoa da: +.', es: '5 − 3 = 2, y 5 es mayor: +.', en: '5 − 3 = 2, and 5 is greater: +.', ar: `${ltr('5 − 3 = 2')}، و5 أكبر: +.` }, math: '$(+5)+(-3)=+2$' },
            { title: { eu: 'Negatiboa irabazle', es: 'Gana el negativo', en: 'The negative wins', ar: 'يغلب السالب' }, text: { eu: '7 − 2 = 5, eta 7 handiagoa da: −.', es: '7 − 2 = 5, y 7 es mayor: −.', en: '7 − 2 = 5, and 7 is greater: −.', ar: `${ltr('7 − 2 = 5')}، و7 أكبر: −.` }, math: '$(+2)+(-7)=-5$' },
            { title: { eu: 'Aurkakoak', es: 'Opuestos', en: 'Opposites', ar: 'متعاكسان' }, text: { eu: 'Zenbaki bat gehi bere aurkakoa zero da.', es: 'Un número más su opuesto da cero.', en: 'A number plus its opposite is zero.', ar: 'العدد زائد معاكسه يساوي صفرًا.' }, math: '$(-4)+(+4)=0$' }
        ],
        example: '$(-3)+(+5)=+2 \\qquad (-8)+(+6)=-2$',
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
        explanation: {
            eu: 'Bi zenbaki oso kentzeko, lehenengoari bigarrenaren aurkakoa batzen zaio. Horrela kenketa batuketa bihurtzen da, eta batuketaren arauak erabiltzen dira. Kontuz: negatibo bat kentzea positibo bat batzea da.',
            es: 'Para restar dos enteros, al primero se le suma el opuesto del segundo. Así la resta se convierte en una suma y se usan las reglas de la suma. Cuidado: restar un negativo es sumar un positivo.',
            en: 'To subtract two integers, add the opposite of the second one to the first. This turns the subtraction into an addition, so the rules of addition are used. Be careful: subtracting a negative is adding a positive.',
            ar: 'لطرح عددين صحيحين نجمع للأول معاكس الثاني. هكذا يتحول الطرح إلى جمع ونستعمل قواعد الجمع. انتبه: طرح عدد سالب يساوي جمع عدد موجب.'
        },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Kenketa aurkakoaren batuketa bihurtu.', es: 'Convierte la resta en la suma del opuesto.', en: 'Turn the subtraction into adding the opposite.', ar: 'حوّل الطرح إلى جمع المعاكس.' }, math: '$(-6)-(-1)=(-6)+(+1)$' },
            { text: { eu: 'Aplikatu batuketaren araua: zeinu desberdinak, kendu.', es: 'Aplica la regla de la suma: signos distintos, se restan.', en: 'Apply the addition rule: different signs, subtract them.', ar: 'طبّق قاعدة الجمع: إشارتان مختلفتان، نطرح.' }, math: '$6-1=5$' },
            { text: { eu: 'Jarri irabazten duenaren zeinua.', es: 'Pon el signo del que gana.', en: 'Use the sign of the one that wins.', ar: 'ضع إشارة الغالب.' }, math: '$(-6)-(-1)=-5$' }
        ],
        problem: { eu: 'Itsaspeko bat 100 metroko sakoneran dago eta 55 metro igotzen da. Non dago orain?', es: 'Un submarino está a 100 metros de profundidad y asciende 55 metros. ¿Dónde está ahora?', en: 'A submarine is at a depth of 100 metres and rises 55 metres. Where is it now?', ar: 'غواصة على عمق 100 متر وصعدت 55 مترًا. أين هي الآن؟' },
        example: '$\\begin{gathered}(-100)+(+55)=-45\\\\(+8)-(-12)=(+8)+(+12)=+20\\end{gathered}$',
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
        explanation: {
            eu: 'Kalkuluak errazago egiteko, parentesiak kentzen dira. Aurretik + duen parentesiak barruko zeinuak mantentzen ditu; aurretik − duenak zeinu guztiak aldatzen ditu. Gero bi modutara kalkula daiteke: ordenan, edo positiboak eta negatiboak bereiz batuz eta emaitzak kenduz.',
            es: 'Para calcular con más facilidad se quitan los paréntesis. Un paréntesis precedido de + mantiene los signos de dentro; precedido de −, cambia todos los signos. Después se puede calcular de dos formas: en orden, o sumando por separado positivos y negativos y restando los resultados.',
            en: 'To make calculation easier, the brackets are removed. A bracket preceded by + keeps the signs inside; a bracket preceded by − changes all the signs. Then you can calculate in two ways: in order, or by adding the positives and the negatives separately and subtracting the results.',
            ar: 'لتسهيل الحساب نحذف الأقواس. القوس المسبوق بـ + يحافظ على الإشارات داخله، والمسبوق بـ − يغيّر كل الإشارات. ثم نحسب بطريقتين: بالترتيب، أو بجمع الموجبة وحدها والسالبة وحدها ثم طرح النتيجتين.'
        },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Kendu parentesiak: − aurrean badago, aldatu barruko zeinuak.', es: 'Quita los paréntesis: si delante hay un −, cambia los signos de dentro.', en: 'Remove the brackets: if there is a − in front, change the signs inside.', ar: 'احذف الأقواس: إذا سبقها −، غيّر الإشارات داخلها.' }, math: '$8-(4-7)=8-4+7$' },
            { text: { eu: 'Batu positiboak alde batetik eta negatiboak bestetik.', es: 'Suma los positivos por un lado y los negativos por otro.', en: 'Add the positives on one side and the negatives on the other.', ar: 'اجمع الموجبة وحدها والسالبة وحدها.' }, math: '$8+7=15 \\qquad 4$' },
            { text: { eu: 'Kendu emaitzak eta jarri handienaren zeinua.', es: 'Resta los resultados y pon el signo del mayor.', en: 'Subtract the results and use the sign of the larger one.', ar: 'اطرح النتيجتين وضع إشارة الأكبر.' }, math: '$15-4=11$' }
        ],
        example: '$\\begin{aligned}&-(-5+3-2+7)\\\\&=+5-3+2-7=7-10=-3\\end{aligned}$',
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
        explanation: {
            eu: 'Bi zenbaki oso biderkatzeko, balio absolutuak biderkatzen dira, eta emaitzari + zeinua jartzen zaio bi zenbakiek zeinu bera badute, eta − zeinua zeinu desberdinak badituzte.',
            es: 'Para multiplicar dos enteros se multiplican sus valores absolutos, y al resultado se le pone el signo + si los dos tienen el mismo signo, y el signo − si tienen signos distintos.',
            en: 'To multiply two integers, multiply their absolute values, and give the result the sign + if both have the same sign, or the sign − if they have different signs.',
            ar: 'لضرب عددين صحيحين نضرب قيمتيهما المطلقتين، ونضع للنتيجة الإشارة + إذا كانت لهما الإشارة نفسها، والإشارة − إذا اختلفت إشارتاهما.'
        },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Biderkatu zenbakiak zeinurik gabe.', es: 'Multiplica los números sin signo.', en: 'Multiply the numbers without their signs.', ar: 'اضرب العددين دون إشارة.' }, math: '$5\\cdot 3=15$' },
            { text: { eu: 'Zeinu bera: +. Zeinu desberdinak: −.', es: 'Mismo signo: +. Signos distintos: −.', en: 'Same sign: +. Different signs: −.', ar: 'الإشارة نفسها: +. إشارتان مختلفتان: −.' }, math: '$(+5)\\cdot (-3)=-15 \\qquad (-5)\\cdot (-3)=+15$' }
        ],
        example: '$(+12)\\cdot (-3)=-36 \\qquad (-1)\\cdot (-18)=+18$',
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
        explanation: {
            eu: 'Zatiketan biderketaren zeinuen arau bera erabiltzen da: balio absolutuak zatitzen dira (zatiketa zehatza denean) eta zeinua jartzen da. Zatiketa biderketaren alderantzizkoa denez, falta den zenbaki bat aurkitzeko ere erabil daiteke.',
            es: 'En la división se usa la misma regla de los signos que en la multiplicación: se dividen los valores absolutos (cuando la división es exacta) y se pone el signo. Como la división es la operación inversa de la multiplicación, sirve también para encontrar un número que falta.',
            en: 'Division uses the same rule of signs as multiplication: divide the absolute values (when the division is exact) and put the sign on the result. Because division is the inverse of multiplication, it can also be used to find a missing number.',
            ar: 'في القسمة نستعمل قاعدة الإشارات نفسها في الضرب: نقسم القيمتين المطلقتين (عندما تكون القسمة تامة) ونضع الإشارة. ولأن القسمة عكس الضرب فهي تفيد أيضًا في إيجاد عدد ناقص.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Zeinu desberdinak', es: 'Signos distintos', en: 'Different signs', ar: 'إشارتان مختلفتان' }, text: { eu: '20 : 4 = 5, eta zeinua −.', es: '20 : 4 = 5, y signo −.', en: '20 : 4 = 5, and sign −.', ar: `${ltr('20 : 4 = 5')}، والإشارة −.` }, math: '$(+20)\\mathbin{:}(-4)=-5$' },
            { title: { eu: 'Zeinu bera', es: 'Mismo signo', en: 'Same sign', ar: 'الإشارة نفسها' }, text: { eu: '20 : 4 = 5, eta zeinua +.', es: '20 : 4 = 5, y signo +.', en: '20 : 4 = 5, and sign +.', ar: `${ltr('20 : 4 = 5')}، والإشارة +.` }, math: '$(-20)\\mathbin{:}(-4)=+5$' },
            { title: { eu: 'Falta den zenbakia', es: 'El número que falta', en: 'The missing number', ar: 'العدد الناقص' }, text: { eu: '(+9) · □ = −36 bada, □ = (−36) : (+9).', es: 'Si (+9) · □ = −36, entonces □ = (−36) : (+9).', en: 'If (+9) · □ = −36, then □ = (−36) : (+9).', ar: `إذا كان ${ltr('(+9) · □ = −36')} فإن ${ltr('□ = (−36) : (+9)')}.` }, math: '$\\square =-4$' }
        ],
        example: '$(-100)\\mathbin{:}(+25)=-4 \\qquad (-77)\\mathbin{:}(-11)=+7$',
        takeaway: {
            eu: 'Zatiketan ere: zeinu bera → +, zeinu desberdinak → −.',
            es: 'En la división también: mismo signo → +, signos distintos → −.',
            en: 'In division too: same sign → +, different signs → −.',
            ar: 'في القسمة أيضًا: الإشارة نفسها ← +، إشارتان مختلفتان ← −.'
        }
    }
]
