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
    { id: 'meaning', tone: 'blue', title: { eu: 'Positiboak eta negatiboak', es: 'Positivos y negativos', ar: 'الموجبة والسالبة' } },
    { id: 'line', tone: 'violet', title: { eu: 'Zuzena eta ordena', es: 'Recta y orden', ar: 'المستقيم والترتيب' } },
    { id: 'absolute', tone: 'mustard', title: { eu: 'Balio absolutua eta aurkakoa', es: 'Valor absoluto y opuesto', ar: 'القيمة المطلقة والمعاكس' } },
    { id: 'addsub', tone: 'coral', title: { eu: 'Batuketak eta kenketak', es: 'Sumas y restas', ar: 'الجمع والطرح' } },
    { id: 'muldiv', tone: 'green', title: { eu: 'Biderketak eta zatiketak', es: 'Productos y cocientes', ar: 'الضرب والقسمة' } }
]

export const integerIntroTopics: UnitTopic[] = [
    {
        id: 'negatives',
        stage: 'meaning',
        title: { eu: 'Zenbaki negatiboak eguneroko bizitzan', es: 'Los números negativos en la vida diaria', ar: 'الأعداد السالبة في الحياة اليومية' },
        goal: {
            eu: 'Egoera errealak zenbaki positibo eta negatiboekin adieraztea.',
            es: 'Expresar situaciones reales con números positivos y negativos.',
            ar: 'التعبير عن مواقف حقيقية بأعداد موجبة وسالبة.'
        },
        explanation: {
            eu: 'Egunero entzuten ditugu honelako esaldiak: «autoa bigarren sotoan dago», «zero azpitik lau gradu daude» edo «160 euro zor ditut». Kopuru horiek zero baino txikiagoak dira, eta zenbaki negatiboekin adierazten dira: − zeinua dute aurrean. Zero baino handiagoak direnak zenbaki positiboak dira, eta + zeinua dute.',
            es: 'Todos los días oímos frases como «el coche está en el segundo sótano», «hace cuatro grados bajo cero» o «debo 160 euros». Esas cantidades son menores que cero y se expresan con números negativos: llevan delante el signo −. Las que son mayores que cero son números positivos y llevan el signo +.',
            ar: 'نسمع كل يوم عبارات مثل «السيارة في القبو الثاني» و«الحرارة أربع درجات تحت الصفر» و«عليّ 160 يورو». هذه الكميات أصغر من الصفر ونعبّر عنها بأعداد سالبة تسبقها الإشارة −. أما الكميات الأكبر من الصفر فهي أعداد موجبة تسبقها الإشارة +.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Negatiboak (−)', es: 'Negativos (−)', ar: 'السالبة (−)' },
                text: { eu: 'Hitz hauekin: azpitik, zor, sotoa, jaitsi, gutxitu.', es: 'Con palabras como: bajo, deber, sótano, bajar, disminuir.', ar: 'مع كلمات مثل: تحت، دَين، قبو، نزل، نقص.' },
                math: '$-2 \\qquad -4\\,^{\\circ}\\mathrm{C} \\qquad -160\\ \\text{€}$'
            },
            {
                title: { eu: 'Positiboak (+)', es: 'Positivos (+)', ar: 'الموجبة (+)' },
                text: { eu: 'Hitz hauekin: gainetik, daukat, solairua, igo, gehitu.', es: 'Con palabras como: sobre, tener, planta, subir, aumentar.', ar: 'مع كلمات مثل: فوق، لديّ، طابق، صعد، زاد.' },
                math: '$+3 \\qquad +30\\,^{\\circ}\\mathrm{C} \\qquad +50\\ \\mathrm{m}$'
            },
            {
                title: { eu: 'Zeroa', es: 'El cero', ar: 'الصفر' },
                text: { eu: 'Erreferentzia da: beheko solairua, 0 °C edo itsas maila.', es: 'Es la referencia: la planta baja, 0 °C o el nivel del mar.', ar: 'هو المرجع: الطابق الأرضي أو 0 °م أو مستوى سطح البحر.' }
            }
        ],
        example: '$\\begin{gathered}\\text{−120 m}\\qquad \\text{+8.844 m}\\\\\\text{−4 °C}\\qquad \\text{+30 °C}\\end{gathered}$',
        takeaway: {
            eu: 'Zerotik behera: −. Zerotik gora: +.',
            es: 'Por debajo de cero: −. Por encima de cero: +.',
            ar: 'تحت الصفر: −. فوق الصفر: +.'
        },
        figure: (language) => <SituationsFigure language={language} />
    },
    {
        id: 'integer-set',
        stage: 'meaning',
        title: { eu: 'Zenbaki osoak', es: 'Los números enteros', ar: 'الأعداد الصحيحة' },
        goal: {
            eu: 'Zenbaki osoak zer diren jakitea: positiboak, negatiboak eta zeroa.',
            es: 'Saber qué son los números enteros: positivos, negativos y el cero.',
            ar: 'معرفة الأعداد الصحيحة: الموجبة والسالبة والصفر.'
        },
        explanation: {
            eu: 'Zenbaki positiboek, negatiboek eta zeroak zenbaki osoen multzoa osatzen dute, eta ℤ letraz idazten da. Positiboak + zeinua duten zenbaki naturalak dira; positiboak zeinurik gabe ere idatz daitezke: +5 = 5. Zeroa ez da ez positiboa ez negatiboa. Igogailu baten botoiek ondo erakusten dute: solairuak positiboak, beheko solairua zeroa eta sotoak negatiboak.',
            es: 'Los números positivos, los negativos y el cero forman el conjunto de los números enteros, que se escribe ℤ. Los positivos son los naturales con signo +; también se pueden escribir sin signo: +5 = 5. El cero no es ni positivo ni negativo. Los botones de un ascensor lo muestran bien: las plantas son positivas, la planta baja es el cero y los sótanos son negativos.',
            ar: 'تشكّل الأعداد الموجبة والسالبة والصفر مجموعة الأعداد الصحيحة، وتُكتب ℤ. الموجبة هي الأعداد الطبيعية مع الإشارة +، ويمكن كتابتها دون إشارة: ‏+5 = 5. الصفر ليس موجبًا ولا سالبًا. أزرار المصعد توضّح ذلك: الطوابق موجبة، والطابق الأرضي صفر، والأقبية سالبة.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Positiboak', es: 'Positivos', ar: 'الموجبة' }, text: { eu: 'Zenbaki naturalak + zeinuarekin.', es: 'Los naturales con signo +.', ar: 'الأعداد الطبيعية مع الإشارة +.' }, math: '$+1,\\ +2,\\ +3,\\ +4,\\ \\dots$' },
            { title: { eu: 'Zeroa', es: 'El cero', ar: 'الصفر' }, text: { eu: 'Ez positiboa ez negatiboa.', es: 'Ni positivo ni negativo.', ar: 'ليس موجبًا ولا سالبًا.' }, math: '$0$' },
            { title: { eu: 'Negatiboak', es: 'Negativos', ar: 'السالبة' }, text: { eu: 'Zenbaki naturalak − zeinuarekin.', es: 'Los naturales con signo −.', ar: 'الأعداد الطبيعية مع الإشارة −.' }, math: '$-1,\\ -2,\\ -3,\\ -4,\\ \\dots$' }
        ],
        example: '$\\mathbb{Z}=\\{\\dots,-3,-2,-1,0,+1,+2,+3,\\dots\\}$',
        takeaway: {
            eu: 'ℤ = negatiboak + zeroa + positiboak.',
            es: 'ℤ = negativos + cero + positivos.',
            ar: 'ℤ = السالبة + الصفر + الموجبة.'
        },
        figure: (language) => <ElevatorFigure language={language} />
    },
    {
        id: 'number-line',
        stage: 'line',
        title: { eu: 'Zenbaki osoak zuzenean', es: 'Los enteros en la recta numérica', ar: 'الأعداد الصحيحة على المستقيم' },
        goal: {
            eu: 'Zenbaki osoak zenbakizko zuzenean irudikatzea.',
            es: 'Representar números enteros en la recta numérica.',
            ar: 'تمثيل الأعداد الصحيحة على مستقيم الأعداد.'
        },
        explanation: {
            eu: 'Zenbaki naturalen zuzena ezkerrerantz luzatzen da. Zeroa jatorria da; positiboak eskuinean daude eta negatiboak ezkerrean, zerotik distantzia berean. Horrela, zenbakiak ordenatuta geratzen dira.',
            es: 'La recta de los números naturales se alarga hacia la izquierda. El cero es el origen; los positivos van a la derecha y los negativos a la izquierda, a las mismas distancias del cero. Así los números quedan ordenados.',
            ar: 'نمدّ مستقيم الأعداد الطبيعية نحو اليسار. الصفر هو الأصل؛ الموجبة على اليمين والسالبة على اليسار، على المسافات نفسها من الصفر. وهكذا تبقى الأعداد مرتّبة.'
        },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Marraztu zuzen bat eta markatu jatorria: 0.', es: 'Dibuja una recta y marca el origen: 0.', ar: 'ارسم مستقيمًا وحدّد الأصل: 0.' } },
            { text: { eu: 'Zatitu zuzena zati berdinetan (unitateak) zeroaren bi aldeetara.', es: 'Divide la recta en partes iguales (unidades) a los dos lados del cero.', ar: 'قسّم المستقيم إلى أجزاء متساوية (وحدات) على جانبي الصفر.' } },
            { text: { eu: 'Idatzi positiboak eskuinean: +1, +2, +3…', es: 'Escribe los positivos a la derecha: +1, +2, +3…', ar: `اكتب الموجبة على اليمين: ${ltr('+1, +2, +3…')}` } },
            { text: { eu: 'Idatzi negatiboak ezkerrean: −1, −2, −3…', es: 'Escribe los negativos a la izquierda: −1, −2, −3…', ar: `اكتب السالبة على اليسار: ${ltr('−1, −2, −3…')}` } }
        ],
        example: '$-7<-4<-1<0<+2<+5$',
        takeaway: {
            eu: 'Ezkerrean negatiboak, erdian zeroa, eskuinean positiboak.',
            es: 'A la izquierda los negativos, en medio el cero, a la derecha los positivos.',
            ar: 'السالبة على اليسار، والصفر في الوسط، والموجبة على اليمين.'
        },
        figure: () => <NumberLine min={-7} max={7} braces points={[{ value: -4, tone: 'second', label: '−4' }, { value: 5, label: '+5' }]} />
    },
    {
        id: 'compare',
        stage: 'line',
        title: { eu: 'Zenbaki osoak alderatzea', es: 'Comparar números enteros', ar: 'مقارنة الأعداد الصحيحة' },
        goal: {
            eu: 'Bi zenbaki oso < eta > ikurrekin alderatzea.',
            es: 'Comparar dos números enteros con los símbolos < y >.',
            ar: 'مقارنة عددين صحيحين بالرمزين < و>.'
        },
        explanation: {
            eu: 'Zenbakizko zuzenean, eskuinerago dagoena da handiagoa. Horregatik, edozein positibo edozein negatibo baino handiagoa da, eta zeroa negatibo guztiak baino handiagoa. Termometroan ere hala da: −2 °C ez da −6 °C bezain hotza.',
            es: 'En la recta numérica, es mayor el que está más a la derecha. Por eso cualquier positivo es mayor que cualquier negativo, y el cero es mayor que todos los negativos. En el termómetro también: −2 °C no es tan frío como −6 °C.',
            ar: `على مستقيم الأعداد يكون الأكبر هو الأبعد نحو اليمين. لذلك كل عدد موجب أكبر من كل عدد سالب، والصفر أكبر من كل السالبة. وفي ميزان الحرارة أيضًا: ${ltr('−2 °C')} ليست باردة مثل ${ltr('−6 °C')}.`
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Positiboa > negatiboa', es: 'Positivo > negativo', ar: 'موجب > سالب' }, text: { eu: 'Positiboa beti dago eskuinerago.', es: 'El positivo siempre está más a la derecha.', ar: 'الموجب دائمًا أبعد نحو اليمين.' }, math: '$+5>-3$' },
            { title: { eu: 'Bi positibo', es: 'Dos positivos', ar: 'عددان موجبان' }, text: { eu: 'Zenbaki naturalak bezala.', es: 'Como con los naturales.', ar: 'كما في الأعداد الطبيعية.' }, math: '$+7<+11$' },
            { title: { eu: 'Bi negatibo', es: 'Dos negativos', ar: 'عددان سالبان' }, text: { eu: 'Zerotik hurbilago dagoena da handiagoa.', es: 'Es mayor el que está más cerca del cero.', ar: 'الأكبر هو الأقرب إلى الصفر.' }, math: '$-4>-8$' },
            { title: { eu: 'Zeroarekin', es: 'Con el cero', ar: 'مع الصفر' }, text: { eu: 'Zeroa negatiboak baino handiagoa eta positiboak baino txikiagoa da.', es: 'El cero es mayor que los negativos y menor que los positivos.', ar: 'الصفر أكبر من السالبة وأصغر من الموجبة.' }, math: '$-1<0<+1$' }
        ],
        example: '$-6<-2 \\qquad -1<0 \\qquad +3>-10$',
        takeaway: {
            eu: 'Eskuinerago dagoena da handiagoa.',
            es: 'Es mayor el que está más a la derecha.',
            ar: 'الأكبر هو الأبعد نحو اليمين.'
        },
        figure: () => <NumberLine min={-8} max={4} points={[{ value: -6, tone: 'second', label: '−6' }, { value: -2, label: '−2' }]} caption="−6 < −2" />
    },
    {
        id: 'order',
        stage: 'line',
        title: { eu: 'Zenbaki osoak ordenatzea', es: 'Ordenar números enteros', ar: 'ترتيب الأعداد الصحيحة' },
        goal: {
            eu: 'Zenbaki osoen zerrenda bat txikienetik handienera eta alderantziz ordenatzea.',
            es: 'Ordenar una lista de enteros de menor a mayor y de mayor a menor.',
            ar: 'ترتيب قائمة أعداد صحيحة تصاعديًا وتنازليًا.'
        },
        explanation: {
            eu: 'Zenbaki osoak ordenatzeko, pentsatu nola geratuko liratekeen zuzenean: ezkerretik eskuinera irakurrita, txikienetik handienera daude. Lagungarria da hiru taldetan banatzea: negatiboak, zeroa eta positiboak.',
            es: 'Para ordenar enteros, piensa cómo quedarían en la recta: leídos de izquierda a derecha, van de menor a mayor. Ayuda separarlos en tres grupos: negativos, cero y positivos.',
            ar: 'لترتيب الأعداد الصحيحة فكّر كيف تكون على المستقيم: إذا قرأناها من اليسار إلى اليمين تكون من الأصغر إلى الأكبر. يساعد تقسيمها إلى ثلاث مجموعات: السالبة والصفر والموجبة.'
        },
        problem: { eu: 'Ordenatu txikienetik handienera: $+11,\\ -2,\\ +8,\\ 0,\\ -6,\\ +3,\\ -9$.', es: 'Ordena de menor a mayor: $+11,\\ -2,\\ +8,\\ 0,\\ -6,\\ +3,\\ -9$.', ar: 'رتّب من الأصغر إلى الأكبر: $+11,\\ -2,\\ +8,\\ 0,\\ -6,\\ +3,\\ -9$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Negatiboak lehenik: zerotik urrunen dagoena da txikiena.', es: 'Primero los negativos: el más alejado del cero es el menor.', ar: 'السالبة أولًا: الأبعد عن الصفر هو الأصغر.' }, math: '$-9<-6<-2$' },
            { text: { eu: 'Gero zeroa.', es: 'Después el cero.', ar: 'ثم الصفر.' }, math: '$0$' },
            { text: { eu: 'Azkenik positiboak, naturalak bezala.', es: 'Por último los positivos, como los naturales.', ar: 'وأخيرًا الموجبة كالأعداد الطبيعية.' }, math: '$+3<+8<+11$' }
        ],
        example: '$-9<-6<-2<0<+3<+8<+11$',
        takeaway: {
            eu: 'Txikienetik handienera: negatiboak, zeroa, positiboak.',
            es: 'De menor a mayor: negativos, cero, positivos.',
            ar: 'من الأصغر إلى الأكبر: السالبة، الصفر، الموجبة.'
        },
        figure: () => <NumberLine min={-10} max={12} labelEvery={2} points={[-9, -6, -2, 0, 3, 8, 11].map((value) => ({ value, tone: value < 0 ? 'second' as const : 'stage' as const }))} />
    },
    {
        id: 'absolute',
        stage: 'absolute',
        title: { eu: 'Balio absolutua', es: 'El valor absoluto', ar: 'القيمة المطلقة' },
        goal: {
            eu: 'Zenbaki oso baten balio absolutua kalkulatzea.',
            es: 'Calcular el valor absoluto de un número entero.',
            ar: 'حساب القيمة المطلقة لعدد صحيح.'
        },
        explanation: {
            eu: 'Zenbaki oso baten balio absolutua zenbaki hori zerotik zenbat unitatera dagoen da. Bi barra artean idazten da, eta zenbakia bera da zeinurik gabe. Distantzia bat denez, ez da inoiz negatiboa.',
            es: 'El valor absoluto de un número entero es la distancia, en unidades, que lo separa del cero. Se escribe entre dos barras y es el mismo número sin su signo. Como es una distancia, nunca es negativo.',
            ar: 'القيمة المطلقة لعدد صحيح هي بُعده عن الصفر بالوحدات. تُكتب بين خطين عموديين، وهي العدد نفسه دون إشارته. ولأنها مسافة فهي ليست سالبة أبدًا.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Negatibo batena', es: 'De un negativo', ar: 'لعدد سالب' }, text: { eu: '−3 zerotik 3 unitatera dago.', es: '−3 está a 3 unidades del cero.', ar: `يبعد ${ltr('−3')} عن الصفر 3 وحدات.` }, math: '$\\lvert -3\\rvert =3$' },
            { title: { eu: 'Positibo batena', es: 'De un positivo', ar: 'لعدد موجب' }, text: { eu: '+5 zerotik 5 unitatera dago.', es: '+5 está a 5 unidades del cero.', ar: `يبعد ${ltr('+5')} عن الصفر 5 وحدات.` }, math: '$\\lvert +5\\rvert =5$' },
            { title: { eu: 'Zeroarena', es: 'Del cero', ar: 'للصفر' }, text: { eu: 'Zeroa ez dago zerotik urrun.', es: 'El cero no está nada lejos del cero.', ar: 'الصفر لا يبعد عن نفسه.' }, math: '$\\lvert 0\\rvert =0$' }
        ],
        example: '$\\lvert -10\\rvert =10 \\qquad \\lvert +7\\rvert =7 \\qquad \\lvert -15\\rvert =15$',
        takeaway: {
            eu: 'Balio absolutua = zeinua kendu = zerora dagoen distantzia.',
            es: 'Valor absoluto = quitar el signo = distancia al cero.',
            ar: 'القيمة المطلقة = حذف الإشارة = البعد عن الصفر.'
        },
        figure: () => <NumberLine min={-6} max={6} points={[{ value: -3, tone: 'second' }, { value: 5 }]} spans={[{ from: 0, to: -3, tone: 'second', label: '|−3| = 3' }, { from: 0, to: 5, label: '|+5| = 5' }]} />
    },
    {
        id: 'opposite',
        stage: 'absolute',
        title: { eu: 'Aurkakoa', es: 'El opuesto', ar: 'المعاكس' },
        goal: {
            eu: 'Zenbaki oso baten aurkakoa aurkitzea.',
            es: 'Encontrar el opuesto de un número entero.',
            ar: 'إيجاد معاكس عدد صحيح.'
        },
        explanation: {
            eu: 'Bi zenbaki aurkakoak dira zerotik distantzia berera daudenean, baina alde banatan. Aurkakoa lortzeko zeinua aldatzen da. Aurkakoek balio absolutu bera dute. Euskaraz Aur idazten da: Aur(+5) = −5.',
            es: 'Dos números son opuestos cuando están a la misma distancia del cero, pero a lados distintos. Para obtener el opuesto se cambia el signo. Los opuestos tienen el mismo valor absoluto. Se escribe Op: Op(+5) = −5.',
            ar: `يكون العددان متعاكسين إذا كانا على البعد نفسه من الصفر لكن في جهتين مختلفتين. للحصول على المعاكس نغيّر الإشارة. وللمتعاكسين القيمة المطلقة نفسها: ${ltr('Aur(+5) = −5')}.`
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Zeinua aldatu', es: 'Cambiar el signo', ar: 'غيّر الإشارة' }, text: { eu: 'Positibo baten aurkakoa negatiboa da, eta alderantziz.', es: 'El opuesto de un positivo es negativo, y al revés.', ar: 'معاكس الموجب سالب، والعكس.' }, math: { eu: '$\\begin{gathered}\\mathrm{Aur}(+5)=-5\\\\\\mathrm{Aur}(-5)=+5\\end{gathered}$', es: '$\\begin{gathered}\\mathrm{Op}(+5)=-5\\\\\\mathrm{Op}(-5)=+5\\end{gathered}$', ar: '$\\begin{gathered}\\mathrm{Aur}(+5)=-5\\\\\\mathrm{Aur}(-5)=+5\\end{gathered}$' } },
            { title: { eu: 'Balio absolutu bera', es: 'Mismo valor absoluto', ar: 'القيمة المطلقة نفسها' }, text: { eu: 'Biak zerotik 5 unitatera daude.', es: 'Los dos están a 5 unidades del cero.', ar: 'كلاهما يبعد 5 وحدات عن الصفر.' }, math: '$\\lvert +5\\rvert =\\lvert -5\\rvert =5$' },
            { title: { eu: 'Zeroaren aurkakoa', es: 'El opuesto del cero', ar: 'معاكس الصفر' }, text: { eu: 'Zeroa bera da.', es: 'Es el propio cero.', ar: 'هو الصفر نفسه.' }, math: { eu: '$\\mathrm{Aur}(0)=0$', es: '$\\mathrm{Op}(0)=0$', ar: '$\\mathrm{Aur}(0)=0$' } }
        ],
        example: { eu: '$\\mathrm{Aur}(-12)=+12 \\qquad \\mathrm{Aur}(+9)=-9$', es: '$\\mathrm{Op}(-12)=+12 \\qquad \\mathrm{Op}(+9)=-9$', ar: '$\\mathrm{Aur}(-12)=+12 \\qquad \\mathrm{Aur}(+9)=-9$' },
        takeaway: {
            eu: 'Aurkakoa = zeinua aldatu. Ispilu bat zeroan bezala.',
            es: 'Opuesto = cambiar el signo. Como un espejo en el cero.',
            ar: 'المعاكس = تغيير الإشارة. كمرآة عند الصفر.'
        },
        figure: () => <NumberLine min={-6} max={6} mirror points={[{ value: -5, tone: 'second', label: '−5' }, { value: 5, label: '+5' }]} spans={[{ from: 0, to: -5, tone: 'second', label: '5' }, { from: 0, to: 5, label: '5' }]} />
    },
    {
        id: 'compare-absolute',
        stage: 'absolute',
        title: { eu: 'Balio absolutuarekin alderatzea', es: 'Comparar con el valor absoluto', ar: 'المقارنة بالقيمة المطلقة' },
        goal: {
            eu: 'Zenbaki osoak balio absolutua erabiliz alderatzea.',
            es: 'Comparar números enteros usando el valor absoluto.',
            ar: 'مقارنة الأعداد الصحيحة باستعمال القيمة المطلقة.'
        },
        explanation: {
            eu: 'Zuzena marraztu gabe ere alderatu daitezke zenbaki osoak. Bi positiboren artean, balio absolutu handiena duena da handiena. Bi negatiboren artean, alderantziz: balio absolutu txikiena duena da handiena, zerotik hurbilago dagoelako. Bat positiboa eta bestea negatiboa badira, ez da balio absolutua behar: positiboa da handiena.',
            es: 'También se pueden comparar enteros sin dibujar la recta. Entre dos positivos, es mayor el de mayor valor absoluto. Entre dos negativos, al revés: es mayor el de menor valor absoluto, porque está más cerca del cero. Si uno es positivo y otro negativo, no hace falta el valor absoluto: el positivo es el mayor.',
            ar: 'يمكن مقارنة الأعداد الصحيحة دون رسم المستقيم. بين موجبين يكون الأكبر صاحب القيمة المطلقة الأكبر. وبين سالبين العكس: الأكبر صاحب القيمة المطلقة الأصغر لأنه أقرب إلى الصفر. وإذا كان أحدهما موجبًا والآخر سالبًا فلا نحتاج القيمة المطلقة: الموجب هو الأكبر.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Bi positibo', es: 'Dos positivos', ar: 'عددان موجبان' }, text: { eu: '7 > 3 denez, +7 > +3.', es: 'Como 7 > 3, +7 > +3.', ar: `بما أن ${ltr('7 > 3')} فإن ${ltr('+7 > +3')}.` }, math: '$\\lvert +7\\rvert =7>\\lvert +3\\rvert =3$' },
            { title: { eu: 'Bi negatibo', es: 'Dos negativos', ar: 'عددان سالبان' }, text: { eu: '4 < 6 denez, −4 > −6.', es: 'Como 4 < 6, −4 > −6.', ar: `بما أن ${ltr('4 < 6')} فإن ${ltr('−4 > −6')}.` }, math: '$\\lvert -4\\rvert =4<\\lvert -6\\rvert =6$' },
            { title: { eu: 'Zeinu desberdinak', es: 'Signos distintos', ar: 'إشارتان مختلفتان' }, text: { eu: 'Ez da ezer kalkulatu behar.', es: 'No hay que calcular nada.', ar: 'لا حاجة إلى أي حساب.' }, math: '$+3>-10$' }
        ],
        example: '$-5<-3 \\qquad -16<+20 \\qquad +13>-11$',
        takeaway: {
            eu: 'Negatiboetan, balio absolutu txikiena duena da handiena.',
            es: 'Entre negativos, el de menor valor absoluto es el mayor.',
            ar: 'بين السالبة، صاحب القيمة المطلقة الأصغر هو الأكبر.'
        }
    },
    {
        id: 'add-same',
        stage: 'addsub',
        title: { eu: 'Zeinu bereko zenbakien batuketa', es: 'Suma de enteros del mismo signo', ar: 'جمع عددين لهما الإشارة نفسها' },
        goal: {
            eu: 'Zeinu bera duten bi zenbaki oso batzea.',
            es: 'Sumar dos números enteros del mismo signo.',
            ar: 'جمع عددين صحيحين لهما الإشارة نفسها.'
        },
        explanation: {
            eu: 'Bi zenbaki osok zeinu bera badute, balio absolutuak batu eta zeinu bera jartzen da. Pentsatu diruan: 3 € badituzu eta beste 2 € ematen badizkizute, 5 € dituzu; 4 € zor badituzu eta beste euro bat zor baduzu, 5 € zor dituzu.',
            es: 'Si dos enteros tienen el mismo signo, se suman sus valores absolutos y se pone el mismo signo. Piénsalo con dinero: si tienes 3 € y te dan 2 €, tienes 5 €; si debes 4 € y debes 1 € más, debes 5 €.',
            ar: 'إذا كان لعددين صحيحين الإشارة نفسها نجمع قيمتيهما المطلقتين ونضع الإشارة نفسها. فكّر بالمال: إذا كان لديك 3 € وأعطوك 2 € يصير لديك 5 €؛ وإذا كان عليك 4 € ثم صار عليك يورو آخر يصير عليك 5 €.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Bi positibo', es: 'Dos positivos', ar: 'عددان موجبان' }, text: { eu: '3 + 2 = 5, zeinua +.', es: '3 + 2 = 5, signo +.', ar: `${ltr('3 + 2 = 5')}، والإشارة +.` }, math: '$(+3)+(+2)=+5$' },
            { title: { eu: 'Bi negatibo', es: 'Dos negativos', ar: 'عددان سالبان' }, text: { eu: '4 + 1 = 5, zeinua −.', es: '4 + 1 = 5, signo −.', ar: `${ltr('4 + 1 = 5')}، والإشارة −.` }, math: '$(-4)+(-1)=-5$' }
        ],
        example: '$(+5)+(+10)=+15 \\qquad (-5)+(-10)=-15$',
        takeaway: {
            eu: 'Zeinu bera: batu eta zeinua mantendu.',
            es: 'Mismo signo: se suman y se mantiene el signo.',
            ar: 'إشارة واحدة: نجمع ونحافظ على الإشارة.'
        },
        figure: () => <NumberLine min={-7} max={2} jumps={[{ from: 0, to: -4, tone: 'second', label: '−4', row: 1 }, { from: -4, to: -5, tone: 'second', label: '−1' }]} points={[{ value: -5, tone: 'second' }]} caption="(−4) + (−1) = −5" />
    },
    {
        id: 'add-different',
        stage: 'addsub',
        title: { eu: 'Zeinu desberdineko zenbakien batuketa', es: 'Suma de enteros de distinto signo', ar: 'جمع عددين مختلفي الإشارة' },
        goal: {
            eu: 'Zeinu desberdina duten bi zenbaki oso batzea.',
            es: 'Sumar dos números enteros de distinto signo.',
            ar: 'جمع عددين صحيحين مختلفي الإشارة.'
        },
        explanation: {
            eu: 'Bi zenbaki osok zeinu desberdina badute, balio absolutu handienari txikiena kentzen zaio, eta balio absolutu handiena duenaren zeinua jartzen da. Diruan: 5 € badituzu eta 3 € zor badituzu, zorra ordaintzean 2 € geratzen zaizkizu. Zuzenean: positiboa batzea eskuinera mugitzea da, eta negatiboa batzea ezkerrera.',
            es: 'Si dos enteros tienen distinto signo, al mayor valor absoluto se le resta el menor, y se pone el signo del que tiene mayor valor absoluto. Con dinero: si tienes 5 € y debes 3 €, al pagar la deuda te quedan 2 €. En la recta: sumar un positivo es moverse a la derecha, y sumar un negativo, a la izquierda.',
            ar: 'إذا كان لعددين صحيحين إشارتان مختلفتان نطرح القيمة المطلقة الصغرى من الكبرى، ونضع إشارة صاحب القيمة المطلقة الأكبر. بالمال: إذا كان لديك 5 € وعليك 3 € يبقى لك 2 € بعد سداد الدين. وعلى المستقيم: جمع موجب حركة نحو اليمين، وجمع سالب حركة نحو اليسار.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Positiboa irabazle', es: 'Gana el positivo', ar: 'يغلب الموجب' }, text: { eu: '5 − 3 = 2, eta 5 handiagoa da: +.', es: '5 − 3 = 2, y 5 es mayor: +.', ar: `${ltr('5 − 3 = 2')}، و5 أكبر: +.` }, math: '$(+5)+(-3)=+2$' },
            { title: { eu: 'Negatiboa irabazle', es: 'Gana el negativo', ar: 'يغلب السالب' }, text: { eu: '7 − 2 = 5, eta 7 handiagoa da: −.', es: '7 − 2 = 5, y 7 es mayor: −.', ar: `${ltr('7 − 2 = 5')}، و7 أكبر: −.` }, math: '$(+2)+(-7)=-5$' },
            { title: { eu: 'Aurkakoak', es: 'Opuestos', ar: 'متعاكسان' }, text: { eu: 'Zenbaki bat gehi bere aurkakoa zero da.', es: 'Un número más su opuesto da cero.', ar: 'العدد زائد معاكسه يساوي صفرًا.' }, math: '$(-4)+(+4)=0$' }
        ],
        example: '$(-3)+(+5)=+2 \\qquad (-8)+(+6)=-2$',
        takeaway: {
            eu: 'Zeinu desberdina: kendu, eta irabazten duenaren zeinua jarri.',
            es: 'Distinto signo: se restan y se pone el signo del que gana.',
            ar: 'إشارتان مختلفتان: نطرح ونضع إشارة الغالب.'
        },
        figure: (language) => <CountersFigure language={language} have={5} owe={3} />
    },
    {
        id: 'subtract',
        stage: 'addsub',
        title: { eu: 'Kenketa: aurkakoa batu', es: 'La resta: sumar el opuesto', ar: 'الطرح: جمع المعاكس' },
        goal: {
            eu: 'Bi zenbaki osoren kenketa batuketa bihurtuz egitea.',
            es: 'Restar dos enteros convirtiendo la resta en una suma.',
            ar: 'طرح عددين صحيحين بتحويل الطرح إلى جمع.'
        },
        explanation: {
            eu: 'Bi zenbaki oso kentzeko, lehenengoari bigarrenaren aurkakoa batzen zaio. Horrela kenketa batuketa bihurtzen da, eta batuketaren arauak erabiltzen dira. Kontuz: negatibo bat kentzea positibo bat batzea da.',
            es: 'Para restar dos enteros, al primero se le suma el opuesto del segundo. Así la resta se convierte en una suma y se usan las reglas de la suma. Cuidado: restar un negativo es sumar un positivo.',
            ar: 'لطرح عددين صحيحين نجمع للأول معاكس الثاني. هكذا يتحول الطرح إلى جمع ونستعمل قواعد الجمع. انتبه: طرح عدد سالب يساوي جمع عدد موجب.'
        },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Kenketa aurkakoaren batuketa bihurtu.', es: 'Convierte la resta en la suma del opuesto.', ar: 'حوّل الطرح إلى جمع المعاكس.' }, math: '$(-6)-(-1)=(-6)+(+1)$' },
            { text: { eu: 'Aplikatu batuketaren araua: zeinu desberdinak, kendu.', es: 'Aplica la regla de la suma: signos distintos, se restan.', ar: 'طبّق قاعدة الجمع: إشارتان مختلفتان، نطرح.' }, math: '$6-1=5$' },
            { text: { eu: 'Jarri irabazten duenaren zeinua.', es: 'Pon el signo del que gana.', ar: 'ضع إشارة الغالب.' }, math: '$(-6)-(-1)=-5$' }
        ],
        problem: { eu: 'Itsaspeko bat 100 metroko sakoneran dago eta 55 metro igotzen da. Non dago orain?', es: 'Un submarino está a 100 metros de profundidad y asciende 55 metros. ¿Dónde está ahora?', ar: 'غواصة على عمق 100 متر وصعدت 55 مترًا. أين هي الآن؟' },
        example: '$\\begin{gathered}(-100)+(+55)=-45\\\\(+8)-(-12)=(+8)+(+12)=+20\\end{gathered}$',
        takeaway: {
            eu: 'Kentzea = aurkakoa batzea.',
            es: 'Restar = sumar el opuesto.',
            ar: 'الطرح = جمع المعاكس.'
        },
        figure: () => <NumberLine min={-4} max={6} jumps={[{ from: 0, to: 5, label: '+5', row: 1 }, { from: 5, to: 3, tone: 'second', label: '−2' }]} points={[{ value: 3 }]} caption="(+5) − (+2) = (+5) + (−2) = +3" />
    },
    {
        id: 'brackets',
        stage: 'addsub',
        title: { eu: 'Parentesiak kentzea', es: 'Quitar paréntesis', ar: 'حذف الأقواس' },
        goal: {
            eu: 'Batuketa eta kenketa kateak parentesiak kenduz kalkulatzea.',
            es: 'Calcular cadenas de sumas y restas quitando paréntesis.',
            ar: 'حساب سلاسل الجمع والطرح بحذف الأقواس.'
        },
        explanation: {
            eu: 'Kalkuluak errazago egiteko, parentesiak kentzen dira. Aurretik + duen parentesiak barruko zeinuak mantentzen ditu; aurretik − duenak zeinu guztiak aldatzen ditu. Gero bi modutara kalkula daiteke: ordenan, edo positiboak eta negatiboak bereiz batuz eta emaitzak kenduz.',
            es: 'Para calcular con más facilidad se quitan los paréntesis. Un paréntesis precedido de + mantiene los signos de dentro; precedido de −, cambia todos los signos. Después se puede calcular de dos formas: en orden, o sumando por separado positivos y negativos y restando los resultados.',
            ar: 'لتسهيل الحساب نحذف الأقواس. القوس المسبوق بـ + يحافظ على الإشارات داخله، والمسبوق بـ − يغيّر كل الإشارات. ثم نحسب بطريقتين: بالترتيب، أو بجمع الموجبة وحدها والسالبة وحدها ثم طرح النتيجتين.'
        },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Kendu parentesiak: − aurrean badago, aldatu barruko zeinuak.', es: 'Quita los paréntesis: si delante hay un −, cambia los signos de dentro.', ar: 'احذف الأقواس: إذا سبقها −، غيّر الإشارات داخلها.' }, math: '$8-(4-7)=8-4+7$' },
            { text: { eu: 'Batu positiboak alde batetik eta negatiboak bestetik.', es: 'Suma los positivos por un lado y los negativos por otro.', ar: 'اجمع الموجبة وحدها والسالبة وحدها.' }, math: '$8+7=15 \\qquad 4$' },
            { text: { eu: 'Kendu emaitzak eta jarri handienaren zeinua.', es: 'Resta los resultados y pon el signo del mayor.', ar: 'اطرح النتيجتين وضع إشارة الأكبر.' }, math: '$15-4=11$' }
        ],
        example: '$\\begin{aligned}&-(-5+3-2+7)\\\\&=+5-3+2-7=7-10=-3\\end{aligned}$',
        takeaway: {
            eu: '+( ): zeinuak berdin. −( ): zeinu guztiak aldatu.',
            es: '+( ): signos iguales. −( ): cambian todos los signos.',
            ar: '+( ): الإشارات كما هي. −( ): تتغير كل الإشارات.'
        },
        figure: (language) => <BracketsFigure language={language} />
    },
    {
        id: 'multiply',
        stage: 'muldiv',
        title: { eu: 'Zenbaki osoen biderketa', es: 'Multiplicación de enteros', ar: 'ضرب الأعداد الصحيحة' },
        goal: {
            eu: 'Bi zenbaki oso biderkatzea zeinuen araua erabiliz.',
            es: 'Multiplicar dos números enteros con la regla de los signos.',
            ar: 'ضرب عددين صحيحين بقاعدة الإشارات.'
        },
        explanation: {
            eu: 'Bi zenbaki oso biderkatzeko, balio absolutuak biderkatzen dira, eta emaitzari + zeinua jartzen zaio bi zenbakiek zeinu bera badute, eta − zeinua zeinu desberdinak badituzte.',
            es: 'Para multiplicar dos enteros se multiplican sus valores absolutos, y al resultado se le pone el signo + si los dos tienen el mismo signo, y el signo − si tienen signos distintos.',
            ar: 'لضرب عددين صحيحين نضرب قيمتيهما المطلقتين، ونضع للنتيجة الإشارة + إذا كانت لهما الإشارة نفسها، والإشارة − إذا اختلفت إشارتاهما.'
        },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Biderkatu zenbakiak zeinurik gabe.', es: 'Multiplica los números sin signo.', ar: 'اضرب العددين دون إشارة.' }, math: '$5\\cdot 3=15$' },
            { text: { eu: 'Zeinu bera: +. Zeinu desberdinak: −.', es: 'Mismo signo: +. Signos distintos: −.', ar: 'الإشارة نفسها: +. إشارتان مختلفتان: −.' }, math: '$(+5)\\cdot (-3)=-15 \\qquad (-5)\\cdot (-3)=+15$' }
        ],
        example: '$(+12)\\cdot (-3)=-36 \\qquad (-1)\\cdot (-18)=+18$',
        takeaway: {
            eu: 'Zeinu bera → +. Zeinu desberdinak → −.',
            es: 'Mismo signo → +. Signos distintos → −.',
            ar: 'الإشارة نفسها ← +. إشارتان مختلفتان ← −.'
        },
        figure: (language) => <SignRuleFigure language={language} />
    },
    {
        id: 'divide',
        stage: 'muldiv',
        title: { eu: 'Zenbaki osoen zatiketa', es: 'División de enteros', ar: 'قسمة الأعداد الصحيحة' },
        goal: {
            eu: 'Bi zenbaki oso zatitzea eta falta den zenbakia aurkitzea.',
            es: 'Dividir dos números enteros y encontrar el número que falta.',
            ar: 'قسمة عددين صحيحين وإيجاد العدد الناقص.'
        },
        explanation: {
            eu: 'Zatiketan biderketaren zeinuen arau bera erabiltzen da: balio absolutuak zatitzen dira (zatiketa zehatza denean) eta zeinua jartzen da. Zatiketa biderketaren alderantzizkoa denez, falta den zenbaki bat aurkitzeko ere erabil daiteke.',
            es: 'En la división se usa la misma regla de los signos que en la multiplicación: se dividen los valores absolutos (cuando la división es exacta) y se pone el signo. Como la división es la operación inversa de la multiplicación, sirve también para encontrar un número que falta.',
            ar: 'في القسمة نستعمل قاعدة الإشارات نفسها في الضرب: نقسم القيمتين المطلقتين (عندما تكون القسمة تامة) ونضع الإشارة. ولأن القسمة عكس الضرب فهي تفيد أيضًا في إيجاد عدد ناقص.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Zeinu desberdinak', es: 'Signos distintos', ar: 'إشارتان مختلفتان' }, text: { eu: '20 : 4 = 5, eta zeinua −.', es: '20 : 4 = 5, y signo −.', ar: `${ltr('20 : 4 = 5')}، والإشارة −.` }, math: '$(+20)\\mathbin{:}(-4)=-5$' },
            { title: { eu: 'Zeinu bera', es: 'Mismo signo', ar: 'الإشارة نفسها' }, text: { eu: '20 : 4 = 5, eta zeinua +.', es: '20 : 4 = 5, y signo +.', ar: `${ltr('20 : 4 = 5')}، والإشارة +.` }, math: '$(-20)\\mathbin{:}(-4)=+5$' },
            { title: { eu: 'Falta den zenbakia', es: 'El número que falta', ar: 'العدد الناقص' }, text: { eu: '(+9) · □ = −36 bada, □ = (−36) : (+9).', es: 'Si (+9) · □ = −36, entonces □ = (−36) : (+9).', ar: `إذا كان ${ltr('(+9) · □ = −36')} فإن ${ltr('□ = (−36) : (+9)')}.` }, math: '$\\square =-4$' }
        ],
        example: '$(-100)\\mathbin{:}(+25)=-4 \\qquad (-77)\\mathbin{:}(-11)=+7$',
        takeaway: {
            eu: 'Zatiketan ere: zeinu bera → +, zeinu desberdinak → −.',
            es: 'En la división también: mismo signo → +, signos distintos → −.',
            ar: 'في القسمة أيضًا: الإشارة نفسها ← +، إشارتان مختلفتان ← −.'
        }
    }
]
