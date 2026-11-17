import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { TrialsFigure } from '../batx2-zientziak-banaketak/figures'
import { DifferencesFigure, ExpectedFigure, GaltonFigure, LoadedDieFigure, MeanSdFigure, ObservedFigure, OrdersFigure, PiecesFigure, RaffleFigure, SpreadFigure, TestBarsFigure, TreeFigure, TwoCoinsFigure } from './figures'
import { discreteBatx1gLessonChecks, type DiscreteBatx1gTopicId } from './lessonChecks'
import { discreteBatx1gLessonTexts } from './lessonTexts'

/* ==========================================================================
   Diskretuak · Batxilergoa 1 · Gizarte Zientziak — stages and lessons. The
   scope follows unit 9 of Anaya Matemáticas Aplicadas a las Ciencias
   Sociales I (Suma Piezas edition; unit 10 in the older one): compound
   probability with and without replacement, discrete random variables
   with their table, mean and standard deviation, the Galton board and the
   binomial, and fitting data to a binomial. Simpler than 2.º Ciencias
   (no distribution function), with contexts of shops, factories, surveys
   and raffles. All the exercises and numbers are our own.
   Notation, as in the rest of the site: P(X = k), B(n; p), μ and σ.
   ========================================================================== */

export type DiscreteBatx1gStageId = 'review' | 'variable' | 'binomial' | 'fit'

export const discreteBatx1gStages: UnitStage[] = [
    { id: 'review', tone: 'blue', title: { eu: 'Hasi aurretik: probabilitate konposatua', es: 'Antes de empezar: probabilidad compuesta', en: 'Before you start: compound probability', ar: 'قبل أن تبدأ: الاحتمال المركّب' } },
    { id: 'variable', tone: 'violet', title: { eu: 'Aldagai aleatorio diskretua', es: 'Variable aleatoria discreta', en: 'Discrete random variable', ar: 'المتغير العشوائي المتقطع' } },
    { id: 'binomial', tone: 'mustard', title: { eu: 'Banaketa binomiala', es: 'La distribución binomial', en: 'The binomial distribution', ar: 'التوزيع الثنائي' } },
    { id: 'fit', tone: 'coral', title: { eu: 'Datuak binomial batera doitzea', es: 'Ajuste a una binomial', en: 'Fitting a binomial', ar: 'المطابقة مع توزيع ثنائي' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** «Review first»: lessons of earlier units that the new ones build on */
const need = {
    dependent: { unit: 'dbh4-akademikoak/probabilidad', topic: 'dependent', title: { eu: 'Mendeko esperientziak', es: 'Experiencias dependientes', en: 'Dependent experiments', ar: 'التجارب التابعة' } },
    trees: { unit: 'dbh4-akademikoak/probabilidad', topic: 'trees', title: { eu: 'Zuhaitz-diagramak', es: 'Diagramas de árbol', en: 'Tree diagrams', ar: 'المخططات الشجرية' } },
    independent: { unit: 'dbh4-akademikoak/probabilidad', topic: 'independent', title: { eu: 'Esperientzia independenteak', es: 'Experiencias independientes', en: 'Independent experiments', ar: 'التجارب المستقلة' } },
    fairGames: { unit: 'dbh4-akademikoak/probabilidad', topic: 'fair-games', title: { eu: 'Itxaropena eta joko bidezkoak', es: 'Esperanza y juegos equitativos', en: 'Expected value and fair games', ar: 'الأمل الرياضي والألعاب العادلة' } },
    binomial: { unit: 'dbh4-akademikoak/combinatoria', topic: 'binomial', title: { eu: 'Zenbaki konbinatorioak', es: 'Números combinatorios', en: 'Binomial coefficients', ar: 'الأعداد التوافقية' } },
    pascal: { unit: 'dbh4-akademikoak/combinatoria', topic: 'pascal', title: { eu: 'Tartagliaren triangelua', es: 'El triángulo de Tartaglia', en: 'Tartaglia\'s triangle', ar: 'مثلث تارتاليا' } },
    varianceSd: { unit: 'batx1-zientziak/estadistica', topic: 'variance-sd', title: { eu: 'Bariantzaren formula praktikoa', es: 'La fórmula práctica de la varianza', en: 'The working formula for the variance', ar: 'الصيغة العملية للتباين' } },
    compare: { unit: 'batx1-zientziak/estadistica', topic: 'coefficient-variation', title: { eu: 'Bi banaketa konparatzea', es: 'Comparar dos distribuciones', en: 'Comparing two distributions', ar: 'مقارنة توزيعين' } }
}

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Before you start: compound probability ---------- */
    {
        id: 'compound',
        stage: 'review',
        title: say('Itzulita eta itzuli gabe', 'Con y sin devolución', 'مع الإرجاع ودونه', 'With and without replacement'),
        goal: say('Bi ateraldiren probabilitatea zuhaitz batekin kalkulatzea, bola itzultzen denean eta itzultzen ez denean, eta bi kasuak bereiztea.', 'Calcular con un árbol la probabilidad de dos extracciones, devolviendo la bola y sin devolverla, y distinguir los dos casos.', 'حساب احتمال سحبتين بشجرة، مع إرجاع الكرة ودون إرجاعها، والتمييز بين الحالتين.', 'Work out the probability of two draws with a tree, putting the ball back and not, and tell the two cases apart.'),
        needs: [need.dependent, need.trees],
        problem: say('Kutxa batean 3 bola gorri eta 2 berde daude. Bi bola ateratzen dira. Zein da biak gorriak izateko probabilitatea, lehenengoa itzulita? Eta itzuli gabe?', 'Una caja tiene 3 bolas rojas y 2 verdes. Se sacan dos bolas. ¿Qué probabilidad hay de que las dos sean rojas devolviendo la primera? ¿Y sin devolverla?', 'في صندوق 3 كرات حمراء وكرتان خضراوان. تُسحب كرتان. ما احتمال أن تكونا حمراوين مع إرجاع الأولى؟ ودون إرجاعها؟', 'A box has 3 red balls and 2 green ones. Two balls are drawn. What is the probability that both are red if the first is put back? And if it is not?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Itzulita, kutxa berdin geratzen da: bi ateraldiak independenteak dira.', 'Devolviendo, la caja queda igual: las dos extracciones son independientes.', 'مع الإرجاع يبقى الصندوق كما هو: السحبتان مستقلتان.', 'Putting it back, the box stays the same: the two draws are independent.'), math: same('$\\frac{3}{5}\\cdot\\frac{3}{5}=\\frac{9}{25}$') },
            { text: say('Itzuli gabe, gorri bat atera ondoren 2 gorri geratzen dira 4 bolatan.', 'Sin devolver, tras sacar una roja quedan 2 rojas entre 4 bolas.', 'دون إرجاع، بعد سحب حمراء تبقى حمراوان بين 4 كرات.', 'Without putting it back, after a red one 2 reds are left among 4 balls.'), math: same('$\\frac{3}{5}\\cdot\\frac{2}{4}=\\frac{3}{10}$') },
            { text: say('Hamartarrekin alderatuta, itzuli gabe probabilitatea txikiagoa da.', 'Comparando en decimales, sin devolución la probabilidad es menor.', 'بالمقارنة بالأعداد العشرية، الاحتمال دون إرجاع أصغر.', 'Comparing as decimals, without replacement the probability is smaller.'), math: same('$\\frac{9}{25}=0{,}36\\qquad\\frac{3}{10}=0{,}3$') }
        ],
        takeaway: say(
            'Itzulita, ateraldiak independenteak dira, eta probabilitate berak biderkatzen dira. Itzuli gabe, bigarrena lehenengoaren mende dago: kutxan geratzen denarekin kalkulatzen da. «Gutxienez bat» kalkulatzeko, erabili aurkakoa: 1 ken «bat ere ez» gertaeraren probabilitatea.',
            'Con devolución, las extracciones son independientes y se multiplican las mismas probabilidades. Sin devolución, la segunda depende de la primera: se calcula con lo que queda en la caja. Para «alguno», usa el contrario: 1 menos la probabilidad de «ninguno».',
            'مع الإرجاع تكون السحبات مستقلة وتُضرب الاحتمالات نفسها. ودون إرجاع تتعلق الثانية بالأولى: تُحسب بما بقي في الصندوق. ولحساب «واحد على الأقل» استعمل المعاكس: 1 ناقص احتمال «لا شيء».',
            'With replacement, the draws are independent and the same probabilities are multiplied. Without replacement, the second depends on the first: it is worked out with what is left in the box. For ‘at least one’, use the complement: 1 minus the probability of ‘none’.'
        ),
        figureAfterSteps: true,
        figure: (language) => <TreeFigure language={language} />
    },
    {
        id: 'orders',
        stage: 'review',
        title: say('Zenbat ordena?', '¿Cuántos órdenes?', 'كم ترتيبًا؟', 'How many orders?'),
        goal: say('Ordena bakoitzaren probabilitatea eta ordena kopurua biderkatzea, ordena kopurua zenbaki konbinatorio batekin zenbatuta.', 'Multiplicar la probabilidad de un orden por el número de órdenes, contando los órdenes con un número combinatorio.', 'ضرب احتمال ترتيب واحد في عدد الترتيبات، مع عدّ الترتيبات بعدد توافقي.', 'Multiply the probability of one order by the number of orders, counting the orders with a binomial coefficient.'),
        needs: [need.binomial],
        problem: say('Txanpon bat 4 aldiz botatzen da. Zein da zehazki 3 aurpegi ateratzeko probabilitatea?', 'Se lanza una moneda 4 veces. ¿Qué probabilidad hay de sacar exactamente 3 caras?', 'تُرمى قطعة نقود 4 مرات. ما احتمال ظهور 3 أوجه بالضبط؟', 'A coin is tossed 4 times. What is the probability of exactly 3 heads?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordena bakoitzak, adibidez A A A G, probabilitate bera du.', 'Cada orden, por ejemplo C C C X, tiene la misma probabilidad.', 'لكل ترتيب، مثل و و و ظ، الاحتمال نفسه.', 'Each order, for example H H H T, has the same probability.'), math: same('$0{,}5^4=\\frac{1}{16}$') },
            { text: say('Gurutzea 4 tokietako edozeinetan egon daiteke: zein 3 botalditan ateratzen den aurpegia aukeratzea da.', 'La cruz puede ir en cualquiera de los 4 sitios: es elegir en qué 3 lanzamientos sale cara.', 'يمكن أن يكون الظهر في أي موضع من المواضع الأربعة: هو اختيار الرميات الثلاث التي يظهر فيها الوجه.', 'The tail can be in any of the 4 places: it is choosing in which 3 tosses heads comes up.'), math: same('$\\binom{4}{3}=4$') },
            { text: say('Ordena kopurua bider ordena baten probabilitatea.', 'Número de órdenes por la probabilidad de uno.', 'عدد الترتيبات في احتمال ترتيب واحد.', 'Number of orders times the probability of one.'), math: same('$4\\cdot\\frac{1}{16}=\\frac{1}{4}$') }
        ],
        takeaway: say(
            'Ordena guztiek probabilitate bera badute, probabilitatea ordena kopurua bider ordena baten probabilitatea da. $n$ probatan $k$ arrakasta kokatzeko $\\binom{n}{k}$ ordena daude.',
            'Si todos los órdenes tienen la misma probabilidad, la probabilidad es el número de órdenes por la probabilidad de uno. Para colocar $k$ éxitos en $n$ pruebas hay $\\binom{n}{k}$ órdenes.',
            'إذا كان لكل الترتيبات الاحتمال نفسه، فالاحتمال يساوي عدد الترتيبات في احتمال ترتيب واحد. ولوضع $k$ نجاحًا في $n$ محاولة هناك $\\binom{n}{k}$ ترتيبًا.',
            'If all the orders have the same probability, the probability is the number of orders times the probability of one. To place $k$ successes in $n$ trials there are $\\binom{n}{k}$ orders.'
        ),
        figureAfterSteps: true,
        figure: (language) => <OrdersFigure language={language} />
    },

    /* ---------- 2. Discrete random variable ---------- */
    {
        id: 'random-variable',
        stage: 'variable',
        title: say('Aldagai aleatorioa eta haren banaketa', 'Variable aleatoria y su distribución', 'المتغير العشوائي وتوزيعه', 'A random variable and its distribution'),
        goal: say('Esperimentu baten emaitza bakoitzari zenbaki bat lotzea eta haren probabilitate-banaketa taula batean idaztea, maiztasun-taula bat bezala.', 'Asociar un número a cada resultado de un experimento y escribir su distribución de probabilidad en una tabla, como una tabla de frecuencias.', 'ربط عدد بكل نتيجة من نتائج تجربة وكتابة توزيعه الاحتمالي في جدول، مثل جدول التكرارات.', 'Attach a number to each outcome of an experiment and write its probability distribution in a table, like a frequency table.'),
        needs: [need.independent],
        problem: say('Bi txanpon botatzen dira, eta $X$ = «aurpegi kopurua». Idatzi haren banaketa eta kalkulatu $P(X\\ge 1)$.', 'Se lanzan dos monedas y $X$ = «número de caras». Escribe su distribución y calcula $P(X\\ge 1)$.', 'تُرمى قطعتا نقود و$X$ = «عدد الأوجه». اكتب توزيعه واحسب $P(X\\ge 1)$.', 'Two coins are tossed and $X$ = «number of heads». Write its distribution and work out $P(X\\ge 1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('4 emaitza daude, berdin probableak: AA, AG, GA eta GG. $X$ aldagaiak 0, 1 edo 2 balio du.', 'Hay 4 resultados igual de probables: CC, CX, XC y XX. $X$ vale 0, 1 o 2.', 'هناك 4 نتائج متساوية الاحتمال: وو، وظ، ظو، ظظ. ويأخذ $X$ القيم 0 أو 1 أو 2.', 'There are 4 equally likely outcomes: HH, HT, TH and TT. $X$ is 0, 1 or 2.'), math: same('$2\\cdot 2=4$') },
            { text: say('Aurpegi bakarra bi emaitzatan dago. 0, 1 eta 2 aurpegirentzat:', 'Una sola cara sale en dos resultados. Para 0, 1 y 2 caras:', 'يظهر وجه واحد في نتيجتين. لـ 0 و1 و2 أوجه:', 'A single head comes up in two outcomes. For 0, 1 and 2 heads:'), math: same('$\\frac{1}{4}\\quad\\frac{2}{4}\\quad\\frac{1}{4}$') },
            { text: say('«Gutxienez 1» gertaerak 1 eta 2 balioak biltzen ditu.', '«Al menos 1» junta los valores 1 y 2.', '«1 على الأقل» يجمع القيمتين 1 و2.', '‘At least 1’ puts the values 1 and 2 together.'), math: same('$P(X\\ge 1)=\\frac{2}{4}+\\frac{1}{4}=\\frac{3}{4}$') }
        ],
        takeaway: say(
            '$X$ aldagai aleatorio diskretu batek balio solteak hartzen ditu, $x_i$, $p_i=P(X=x_i)$ probabilitateekin. Haren banaketa $x_i$ eta $p_i$ zutabeen taula da, maiztasun erlatiboen taula bat bezala, baina esperimentua askotan errepikatzean espero dena esaten du.',
            'Una variable aleatoria discreta $X$ toma valores sueltos $x_i$ con probabilidades $p_i=P(X=x_i)$. Su distribución es la tabla de columnas $x_i$ y $p_i$, como una tabla de frecuencias relativas, pero dice lo que se espera al repetir muchas veces el experimento.',
            'يأخذ المتغير العشوائي المتقطع $X$ قيمًا منفصلة $x_i$ باحتمالات $p_i=P(X=x_i)$. وتوزيعه جدول عموداه $x_i$ و$p_i$، مثل جدول التكرارات النسبية، لكنه يقول ما يُتوقع عند تكرار التجربة مرات كثيرة.',
            'A discrete random variable $X$ takes separate values $x_i$ with probabilities $p_i=P(X=x_i)$. Its distribution is the table with columns $x_i$ and $p_i$, like a table of relative frequencies, but it tells what is expected when the experiment is repeated many times.'
        ),
        figureAfterSteps: true,
        figure: (language) => <TwoCoinsFigure language={language} />
    },
    {
        id: 'probability-table',
        stage: 'variable',
        title: say('Ondo egindako taula', 'Una tabla bien hecha', 'جدول صحيح', 'A well-made table'),
        goal: say('Taula bat probabilitate-banaketa den egiaztatzea, falta den probabilitatea aurkitzea eta gertaera baten probabilitatea bere balioak batuta kalkulatzea.', 'Comprobar si una tabla es una distribución de probabilidad, hallar la probabilidad que falta y calcular la de un suceso sumando sus valores.', 'التحقق من أن جدولًا توزيع احتمالي، وإيجاد الاحتمال الناقص، وحساب احتمال حدث بجمع قيمه.', 'Check whether a table is a probability distribution, find the missing probability and work out that of an event by adding its values.'),
        problem: say('Dado trukatu batean, $P(1)=P(2)=P(3)=0{,}15$ eta $P(4)=P(5)=0{,}1$. Zenbat da $P(6)$? Zein da zenbaki bikoiti bat ateratzeko probabilitatea?', 'En un dado trucado, $P(1)=P(2)=P(3)=0{,}15$ y $P(4)=P(5)=0{,}1$. ¿Cuánto vale $P(6)$? ¿Qué probabilidad hay de sacar par?', 'في نرد مغشوش $P(1)=P(2)=P(3)=0{,}15$ و$P(4)=P(5)=0{,}1$. كم يساوي $P(6)$؟ وما احتمال ظهور عدد زوجي؟', 'On a loaded die, $P(1)=P(2)=P(3)=0{,}15$ and $P(4)=P(5)=0{,}1$. What is $P(6)$? What is the probability of an even number?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ezagunak batzen dira.', 'Se suman las conocidas.', 'نجمع المعروفة.', 'Add the known ones.'), math: same('$3\\cdot 0{,}15+2\\cdot 0{,}1=0{,}65$') },
            { text: say('Guztiek 1 egin behar dute batuta.', 'Todas tienen que sumar 1.', 'يجب أن يكون مجموعها كلها 1.', 'They must all add up to 1.'), math: same('$P(6)=1-0{,}65=0{,}35$') },
            { text: say('Bikoitiak 2, 4 eta 6 dira: haien probabilitateak batzen dira.', 'Los pares son 2, 4 y 6: se suman sus probabilidades.', 'الأعداد الزوجية 2 و4 و6: نجمع احتمالاتها.', 'The even numbers are 2, 4 and 6: add their probabilities.'), math: same('$0{,}15+0{,}1+0{,}35=0{,}6$') }
        ],
        takeaway: say(
            'Taula bat probabilitate-banaketa da $p_i$ bakoitza 0 eta 1 artean badago eta guztiek 1 egiten badute batuta: $\\sum p_i=1$. Falta dena $1$ ken besteak da. Gertaera baten probabilitatea haren balioen probabilitateen batura da.',
            'Una tabla es una distribución de probabilidad si cada $p_i$ está entre 0 y 1 y todas suman 1: $\\sum p_i=1$. La que falta es $1$ menos las demás. La probabilidad de un suceso es la suma de las de sus valores.',
            'يكون الجدول توزيعًا احتماليًّا إذا كان كل $p_i$ بين 0 و1 وكان مجموعها كلها 1: $\\sum p_i=1$. والناقص هو $1$ ناقص الباقي. واحتمال حدث مجموع احتمالات قيمه.',
            'A table is a probability distribution if each $p_i$ is between 0 and 1 and they all add up to 1: $\\sum p_i=1$. The missing one is $1$ minus the others. The probability of an event is the sum of those of its values.'
        ),
        figureAfterSteps: true,
        figure: (language) => <LoadedDieFigure language={language} />
    },
    {
        id: 'mean-sd',
        stage: 'variable',
        title: say('Batez bestekoa eta desbideratze tipikoa', 'Media y desviación típica', 'المتوسط والانحراف المعياري', 'Mean and standard deviation'),
        goal: say('Aldagai diskretu baten $\\mu$ batez bestekoa eta $\\sigma$ desbideratze tipikoa kalkulatzea, $p_i\\,x_i$ eta $p_i\\,x_i^2$ zutabeak dituen taularekin.', 'Calcular la media $\\mu$ y la desviación típica $\\sigma$ de una variable discreta con la tabla de columnas $p_i\\,x_i$ y $p_i\\,x_i^2$.', 'حساب المتوسط $\\mu$ والانحراف المعياري $\\sigma$ لمتغير متقطع بالجدول ذي العمودين $p_i\\,x_i$ و$p_i\\,x_i^2$.', 'Work out the mean $\\mu$ and the standard deviation $\\sigma$ of a discrete variable with the table of columns $p_i\\,x_i$ and $p_i\\,x_i^2$.'),
        needs: [need.varianceSd],
        problem: say('Liburu-denda txiki batean, $X$ = «ordu batean saltzen diren liburuak» aldagaiak 0, 1, 2 edo 3 balio du, 0,2; 0,2; 0,3 eta 0,3 probabilitateekin. Kalkulatu $\\mu$ eta $\\sigma$.', 'En una librería pequeña, $X$ = «libros vendidos en una hora» vale 0, 1, 2 o 3 con probabilidades 0,2; 0,2; 0,3 y 0,3. Calcula $\\mu$ y $\\sigma$.', 'في مكتبة صغيرة، يأخذ $X$ = «عدد الكتب المبيعة في ساعة» القيم 0 أو 1 أو 2 أو 3 باحتمالات 0.2 و0.2 و0.3 و0.3. احسب $\\mu$ و$\\sigma$.', 'In a small bookshop, $X$ = «books sold in an hour» is 0, 1, 2 or 3 with probabilities 0.2, 0.2, 0.3 and 0.3. Work out $\\mu$ and $\\sigma$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$p_i\\,x_i$ zutabea: $1\\cdot 0{,}2$, $2\\cdot 0{,}3$ eta $3\\cdot 0{,}3$ (0 balioak ez du batzen). Batura batez bestekoa da.', 'Columna $p_i\\,x_i$: $1\\cdot 0{,}2$, $2\\cdot 0{,}3$ y $3\\cdot 0{,}3$ (el 0 no suma). La suma es la media.', 'العمود $p_i\\,x_i$: $1\\cdot 0{,}2$ و$2\\cdot 0{,}3$ و$3\\cdot 0{,}3$ (القيمة 0 لا تضيف). والمجموع هو المتوسط.', 'Column $p_i\\,x_i$: $1\\cdot 0{,}2$, $2\\cdot 0{,}3$ and $3\\cdot 0{,}3$ (the 0 adds nothing). The sum is the mean.'), math: same('$\\mu=0{,}2+0{,}6+0{,}9=1{,}7$') },
            { text: say('$p_i\\,x_i^2$ zutabea: $1\\cdot 0{,}2$, $4\\cdot 0{,}3$ eta $9\\cdot 0{,}3$.', 'Columna $p_i\\,x_i^2$: $1\\cdot 0{,}2$, $4\\cdot 0{,}3$ y $9\\cdot 0{,}3$.', 'العمود $p_i\\,x_i^2$: $1\\cdot 0{,}2$ و$4\\cdot 0{,}3$ و$9\\cdot 0{,}3$.', 'Column $p_i\\,x_i^2$: $1\\cdot 0{,}2$, $4\\cdot 0{,}3$ and $9\\cdot 0{,}3$.'), math: same('$0{,}2+1{,}2+2{,}7=4{,}1$') },
            { text: say('Batez bestekoaren karratua kentzen da, eta erroa egiten da: $\\sigma=1{,}1$.', 'Se resta el cuadrado de la media y se hace la raíz: $\\sigma=1{,}1$.', 'نطرح مربع المتوسط ثم نأخذ الجذر: $\\sigma=1{,}1$.', 'Subtract the square of the mean and take the root: $\\sigma=1{,}1$.'), math: same('$\\sigma^2=4{,}1-1{,}7^2=1{,}21$') }
        ],
        takeaway: say(
            '$\\mu=\\sum p_i\\,x_i$ esperimentua askotan errepikatuz aterako litzatekeen batez bestekoa da, eta ez da zertan $X$ aldagaiaren balio bat izan. $\\sigma=\\sqrt{\\sum p_i\\,x_i^2-\\mu^2}$ balioak neurtzen du balioak $\\mu$ baliotik zenbat urruntzen diren.',
            '$\\mu=\\sum p_i\\,x_i$ es la media que saldría repitiendo muchas veces el experimento, y no tiene por qué ser un valor de $X$. $\\sigma=\\sqrt{\\sum p_i\\,x_i^2-\\mu^2}$ mide cuánto se separan los valores de $\\mu$.',
            '$\\mu=\\sum p_i\\,x_i$ هو المتوسط الذي نحصل عليه بتكرار التجربة مرات كثيرة، ولا يلزم أن يكون قيمة من قيم $X$. و$\\sigma=\\sqrt{\\sum p_i\\,x_i^2-\\mu^2}$ يقيس مدى ابتعاد القيم عن $\\mu$.',
            '$\\mu=\\sum p_i\\,x_i$ is the mean you would get by repeating the experiment many times, and it need not be a value of $X$. $\\sigma=\\sqrt{\\sum p_i\\,x_i^2-\\mu^2}$ measures how far the values spread from $\\mu$.'
        ),
        figureAfterSteps: true,
        figure: (language) => <MeanSdFigure language={language} />
    },
    {
        id: 'expected-gain',
        stage: 'variable',
        title: say('Zozketa baten batez besteko irabazia', 'La ganancia media de una rifa', 'الربح المتوسط في يانصيب', 'The mean gain of a raffle'),
        goal: say('Zozketa edo joko baten batez besteko irabazia kalkulatzea eta jokoa bidezkoa, aldekoa edo kontrakoa den erabakitzea.', 'Calcular la ganancia media de una rifa o de un juego y decidir si es justo, favorable o desfavorable.', 'حساب الربح المتوسط في يانصيب أو لعبة، وتقرير ما إذا كانت عادلة أو مربحة أو خاسرة.', 'Work out the mean gain of a raffle or a game and decide whether it is fair, favourable or unfavourable.'),
        needs: [need.fairGames],
        problem: say('Elkarte batek 500 txartel saltzen ditu, bakoitza 2 €. Sari bat dago, 300 €-koa, eta lau, 50 €-koak. Zein da txartel baten batez besteko irabazia?', 'Una asociación vende 500 boletos a 2 €. Hay un premio de 300 € y cuatro de 50 €. ¿Cuál es la ganancia media de un boleto?', 'تبيع جمعية 500 بطاقة بسعر 2 € لكل منها. هناك جائزة قدرها 300 € وأربع جوائز قدر كل منها 50 €. ما الربح المتوسط لبطاقة؟', 'An association sells 500 tickets at €2 each. There is one prize of €300 and four of €50. What is the mean gain of a ticket?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$X$ = «saria». 300 € 500 txarteletatik batean, eta 50 € lautan; besteetan, 0.', '$X$ = «premio». 300 € en uno de los 500 boletos y 50 € en cuatro; en el resto, 0.', '$X$ = «الجائزة». 300 € في بطاقة واحدة من 500، و50 € في أربع؛ والباقي 0.', '$X$ = «prize». €300 on one of the 500 tickets and €50 on four; on the rest, 0.'), math: same('$P(300)=\\frac{1}{500}\\qquad P(50)=\\frac{4}{500}$') },
            { text: say('Batez besteko saria:', 'El premio medio:', 'الجائزة المتوسطة:', 'The mean prize:'), math: same('$\\mu=300\\cdot\\frac{1}{500}+50\\cdot\\frac{4}{500}=1$') },
            { text: say('Txartelaren prezioa kentzen da: jokalariak euro 1 galtzen du batez beste txartel bakoitzeko, eta elkarteak 500 € irabazten ditu.', 'Se resta el precio del boleto: el jugador pierde de media 1 € por boleto, y la asociación gana 500 €.', 'نطرح ثمن البطاقة: يخسر اللاعب في المتوسط 1 € عن كل بطاقة، وتربح الجمعية 500 €.', 'Subtract the price of the ticket: the player loses €1 per ticket on average, and the association makes €500.'), math: same('$1-2=-1$') }
        ],
        takeaway: say(
            'Batez besteko irabazia batez besteko saria ken jokatzeko prezioa da. 0 bada, jokoa bidezkoa da; positiboa bada, jokalariaren aldekoa; negatiboa bada, haren kontrakoa. Zozketek antolatzailearen alde irabazi ohi dute.',
            'La ganancia media es el premio medio menos lo que cuesta jugar. Si es 0, el juego es justo; si es positiva, favorable al jugador; si es negativa, desfavorable. Las rifas suelen dejar ganancia a quien las organiza.',
            'الربح المتوسط هو الجائزة المتوسطة ناقص ثمن اللعب. إذا كان 0 فاللعبة عادلة، وإذا كان موجبًا فهي في صالح اللاعب، وإذا كان سالبًا فهي ضده. وعادةً ما يربح من ينظّم اليانصيب.',
            'The mean gain is the mean prize minus what it costs to play. If it is 0, the game is fair; if it is positive, favourable to the player; if negative, unfavourable. Raffles usually leave a profit for whoever runs them.'
        ),
        figureAfterSteps: true,
        figure: (language) => <RaffleFigure language={language} />
    },

    /* ---------- 3. The binomial distribution ---------- */
    {
        id: 'galton',
        stage: 'binomial',
        title: say('Galtonen tresna', 'El aparato de Galton', 'جهاز غالتون', 'The Galton board'),
        goal: say('Galtonen tresnan bola bat kutxatila bakoitzera erortzeko probabilitatea kalkulatzea, bideak zenbaki konbinatorioekin zenbatuta.', 'Calcular la probabilidad de que una bola caiga en cada casilla del aparato de Galton, contando los caminos con números combinatorios.', 'حساب احتمال سقوط كرة في كل خانة من جهاز غالتون، مع عدّ المسارات بالأعداد التوافقية.', 'Work out the probability that a ball falls into each bin of the Galton board, counting the paths with binomial coefficients.'),
        needs: [need.pascal],
        problem: say('Galtonen tresna batek 4 iltze-errenkada ditu. Iltze bakoitzean, bola eskuinera edo ezkerrera doa, probabilitate berarekin. Zein da kutxatila bakoitzera erortzeko probabilitatea?', 'Un aparato de Galton tiene 4 filas de clavos. En cada clavo la bola va a la derecha o a la izquierda con la misma probabilidad. ¿Qué probabilidad hay de caer en cada casilla?', 'لجهاز غالتون 4 صفوف من المسامير. عند كل مسمار تتجه الكرة يمينًا أو يسارًا بالاحتمال نفسه. ما احتمال السقوط في كل خانة؟', 'A Galton board has 4 rows of pins. At each pin the ball goes right or left with the same probability. What is the probability of landing in each bin?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kutxatila eskuinera egindako jauzi kopuruak ematen du: 0, 1, 2, 3 edo 4. Bide guztiak:', 'La casilla la da el número de saltos a la derecha: 0, 1, 2, 3 o 4. Todos los caminos:', 'تحدد الخانةَ عددُ القفزات إلى اليمين: 0 أو 1 أو 2 أو 3 أو 4. كل المسارات:', 'The bin is given by the number of jumps to the right: 0, 1, 2, 3 or 4. All the paths:'), math: same('$2^4=16$') },
            { text: say('$k$ kutxatilara iristen diren bideak $\\binom{4}{k}$ dira: Tartagliaren 4. errenkada.', 'Los caminos que llegan a la casilla $k$ son $\\binom{4}{k}$: la fila 4 de Tartaglia.', 'المسارات التي تصل إلى الخانة $k$ عددها $\\binom{4}{k}$: الصف 4 من مثلث تارتاليا.', 'The paths that reach bin $k$ are $\\binom{4}{k}$: row 4 of Tartaglia.'), math: same('$1\\quad 4\\quad 6\\quad 4\\quad 1$') },
            { text: say('Erdiko kutxatila da probableena.', 'La casilla central es la más probable.', 'الخانة الوسطى هي الأرجح.', 'The middle bin is the most likely.'), math: same('$P(2)=\\frac{6}{16}=\\frac{3}{8}$') }
        ],
        takeaway: say(
            '$n$ errenkadako Galtonen tresnan, bola $k$ kutxatilara erortzen da $k$ aldiz eskuinera joaten bada. $\\binom{n}{k}$ bide daude, bakoitza $\\frac{1}{2^n}$ probabilitatearekin. Horregatik pilatzen dira bolak erdian: bide gehiago iristen dira hara.',
            'En un aparato de Galton de $n$ filas, la bola cae en la casilla $k$ si va $k$ veces a la derecha. Hay $\\binom{n}{k}$ caminos, cada uno con probabilidad $\\frac{1}{2^n}$. Por eso las bolas se amontonan en el centro: allí llegan más caminos.',
            'في جهاز غالتون ذي $n$ صفًّا تسقط الكرة في الخانة $k$ إذا اتجهت $k$ مرة إلى اليمين. هناك $\\binom{n}{k}$ مسارًا، احتمال كل منها $\\frac{1}{2^n}$. لذلك تتكدس الكرات في الوسط: تصل إليه مسارات أكثر.',
            'On a Galton board with $n$ rows, the ball lands in bin $k$ if it goes right $k$ times. There are $\\binom{n}{k}$ paths, each with probability $\\frac{1}{2^n}$. That is why the balls pile up in the middle: more paths reach it.'
        ),
        figureAfterSteps: true,
        figure: (language) => <GaltonFigure language={language} />
    },
    {
        id: 'is-binomial',
        stage: 'binomial',
        title: say('Noiz da binomiala?', '¿Cuándo es binomial?', 'متى يكون ثنائيًّا؟', 'When is it binomial?'),
        goal: say('Egoera bat banaketa binomiala den ezagutzea eta haren $n$ eta $p$ parametroak esatea.', 'Reconocer si una situación es una distribución binomial y decir sus parámetros $n$ y $p$.', 'التعرّف على ما إذا كان موقف ما توزيعًا ثنائيًّا وذكر وسيطيه $n$ و$p$.', 'Recognise whether a situation is a binomial distribution and give its parameters $n$ and $p$.'),
        problem: say('Denda bateko bezeroen % 15 eskudiruz ordaintzen du. 20 bezero begiratzen dira, eta $X$ = «eskudiruz ordaintzen dutenak». Binomiala da?', 'El 15 % de los clientes de una tienda paga en efectivo. Se observan 20 clientes y $X$ = «los que pagan en efectivo». ¿Es binomial?', 'يدفع 15٪ من زبائن متجر نقدًا. يُراقب 20 زبونًا و$X$ = «من يدفعون نقدًا». هل هو ثنائي؟', '15% of a shop\'s customers pay in cash. 20 customers are watched and $X$ = «those who pay in cash». Is it binomial?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bezero bakoitzak bi emaitza ditu: eskudirua (arrakasta) edo ez.', 'Cada cliente tiene dos resultados: efectivo (éxito) o no.', 'لكل زبون نتيجتان: نقدًا (نجاح) أو لا.', 'Each customer has two outcomes: cash (success) or not.'), math: same('$p=0{,}15\\qquad q=0{,}85$') },
            { text: say('20 proba dira, independenteak, eta $p$ ez da aldatzen bezero batetik bestera.', 'Son 20 pruebas independientes, y $p$ no cambia de un cliente a otro.', 'إنها 20 محاولة مستقلة، و$p$ لا يتغيّر من زبون إلى آخر.', 'They are 20 independent trials, and $p$ does not change from one customer to the next.'), math: same('$n=20$') },
            { text: say('$X$ aldagaiak arrakastak zenbatzen ditu: binomiala da.', '$X$ cuenta los éxitos: es binomial.', 'يعدّ $X$ النجاحات: إنه ثنائي.', '$X$ counts the successes: it is binomial.'), math: same('$X\\sim B(20;\\,0{,}15)$') }
        ],
        takeaway: say(
            '$X$ aldagaia $B(n;\\,p)$ binomiala da: $n$ proba berdin eta independente badaude, bakoitza bi emaitzarekin (arrakasta edo porrota), arrakastaren $p$ probabilitatea beti bera bada, eta $X$ aldagaiak arrakastak zenbatzen baditu. $q=1-p$ da. Itzuli gabe ateratzean, $p$ aldatu egiten da, eta ez da binomiala.',
            '$X$ es una binomial $B(n;\\,p)$ si hay $n$ pruebas iguales e independientes, cada una con dos resultados (éxito o fracaso), la probabilidad de éxito $p$ es siempre la misma y $X$ cuenta los éxitos. $q=1-p$. Al sacar sin devolver, $p$ cambia y no es binomial.',
            'يكون $X$ توزيعًا ثنائيًّا $B(n;\\,p)$ إذا كانت هناك $n$ محاولة متماثلة ومستقلة، لكل منها نتيجتان (نجاح أو فشل)، وكان احتمال النجاح $p$ ثابتًا، وكان $X$ يعدّ النجاحات. و$q=1-p$. وعند السحب دون إرجاع يتغيّر $p$ فلا يكون ثنائيًّا.',
            '$X$ is a binomial $B(n;\\,p)$ if there are $n$ equal, independent trials, each with two outcomes (success or failure), the probability of success $p$ is always the same and $X$ counts the successes. $q=1-p$. When drawing without replacement, $p$ changes and it is not binomial.'
        ),
        figure: (language) => <TrialsFigure language={language} />
    },
    {
        id: 'binomial-formula',
        stage: 'binomial',
        title: say('Binomialaren formula', 'La fórmula de la binomial', 'صيغة التوزيع الثنائي', 'The binomial formula'),
        goal: say('$P(X=k)$ kalkulatzea binomial batean: ordena kopurua bider ordena baten probabilitatea.', 'Calcular $P(X=k)$ en una binomial: el número de órdenes por la probabilidad de uno.', 'حساب $P(X=k)$ في توزيع ثنائي: عدد الترتيبات في احتمال ترتيب واحد.', 'Work out $P(X=k)$ in a binomial: the number of orders times the probability of one.'),
        problem: say('Test batek 5 galdera ditu, bakoitza 4 erantzunekoa, eta bakarra da zuzena. Zoriz erantzunda, zein da zehazki 2 asmatzeko probabilitatea?', 'Un test tiene 5 preguntas de 4 respuestas, y solo una es correcta. Contestando al azar, ¿qué probabilidad hay de acertar exactamente 2?', 'في اختبار 5 أسئلة لكل منها 4 إجابات، واحدة فقط صحيحة. بالإجابة العشوائية، ما احتمال إصابة سؤالين بالضبط؟', 'A test has 5 questions with 4 answers each, and only one is right. Answering at random, what is the probability of getting exactly 2 right?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Galdera bakoitza proba bat da, $p=\\frac{1}{4}$ probabilitatearekin.', 'Cada pregunta es una prueba con $p=\\frac{1}{4}$.', 'كل سؤال محاولة مع $p=\\frac{1}{4}$.', 'Each question is a trial with $p=\\frac{1}{4}$.'), math: same('$X\\sim B(5;\\,0{,}25)$') },
            { text: say('Asmatutako 2 galderak $\\binom{5}{2}=10$ modutan aukeratzen dira, eta ordena bakoitzak 2 asmatze eta 3 huts ditu.', 'Las 2 acertadas se eligen de $\\binom{5}{2}=10$ formas, y cada orden tiene 2 aciertos y 3 fallos.', 'يُختار السؤالان الصحيحان بـ $\\binom{5}{2}=10$ طرق، ولكل ترتيب إصابتان و3 أخطاء.', 'The 2 right ones are chosen in $\\binom{5}{2}=10$ ways, and each order has 2 right and 3 wrong.'), math: same('$0{,}25^2\\cdot 0{,}75^3$') },
            { text: say('Biak biderkatzen dira.', 'Se multiplican.', 'نضربهما.', 'Multiply.'), math: same('$P(X=2)=10\\cdot 0{,}25^2\\cdot 0{,}75^3\\approx 0{,}264$') }
        ],
        takeaway: say(
            '$X\\sim B(n;\\,p)$ bada, $P(X=k)=\\binom{n}{k}\\,p^k\\,q^{n-k}$: $\\binom{n}{k}$ ordena, eta ordena bakoitzak $k$ arrakasta eta $n-k$ porrot ditu. Muturrak errazak dira: $P(X=0)=q^n$ eta $P(X=n)=p^n$.',
            'Si $X\\sim B(n;\\,p)$, $P(X=k)=\\binom{n}{k}\\,p^k\\,q^{n-k}$: $\\binom{n}{k}$ órdenes, y cada orden tiene $k$ éxitos y $n-k$ fracasos. Los extremos son fáciles: $P(X=0)=q^n$ y $P(X=n)=p^n$.',
            'إذا كان $X\\sim B(n;\\,p)$ فإن $P(X=k)=\\binom{n}{k}\\,p^k\\,q^{n-k}$: هناك $\\binom{n}{k}$ ترتيبًا، ولكل ترتيب $k$ نجاحًا و$n-k$ فشلًا. والطرفان سهلان: $P(X=0)=q^n$ و$P(X=n)=p^n$.',
            'If $X\\sim B(n;\\,p)$, $P(X=k)=\\binom{n}{k}\\,p^k\\,q^{n-k}$: $\\binom{n}{k}$ orders, and each order has $k$ successes and $n-k$ failures. The ends are easy: $P(X=0)=q^n$ and $P(X=n)=p^n$.'
        ),
        figureAfterSteps: true,
        figure: (language) => <TestBarsFigure language={language} />
    },
    {
        id: 'binomial-events',
        stage: 'binomial',
        title: say('Gutxienez, gehienez eta bat ere ez', 'Al menos, como mucho y ninguno', 'على الأقل وعلى الأكثر ولا شيء', 'At least, at most and none'),
        goal: say('Hitzez emandako gertaerak ($\\ge$, $>$, $\\le$) binomial batean kalkulatzea, gai asko daudenean aurkakoa erabiliz.', 'Calcular en una binomial sucesos dados con palabras ($\\ge$, $>$, $\\le$), usando el contrario cuando hay muchos términos.', 'حساب أحداث معطاة بالكلمات ($\\ge$ و$>$ و$\\le$) في توزيع ثنائي، باستعمال المعاكس عندما تكثر الحدود.', 'Work out events given in words ($\\ge$, $>$, $\\le$) in a binomial, using the complement when there are many terms.'),
        problem: say('Lantegi bateko piezen % 10 akastuna da. 4 piezako kutxa batean, zein da akastunen bat egoteko probabilitatea? Eta bat baino gehiago egotekoa?', 'El 10 % de las piezas de una fábrica es defectuoso. En una caja de 4 piezas, ¿qué probabilidad hay de que alguna sea defectuosa? ¿Y de que lo sea más de una?', '10٪ من قطع مصنع معيبة. في صندوق فيه 4 قطع، ما احتمال وجود قطعة معيبة على الأقل؟ وما احتمال وجود أكثر من واحدة؟', '10% of a factory\'s parts are faulty. In a box of 4 parts, what is the probability that some part is faulty? And that more than one is?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$X\\sim B(4;\\,0{,}1)$. Akastunik ez:', '$X\\sim B(4;\\,0{,}1)$. Ninguna defectuosa:', '$X\\sim B(4;\\,0{,}1)$. لا قطعة معيبة:', '$X\\sim B(4;\\,0{,}1)$. None faulty:'), math: same('$P(X=0)=0{,}9^4=0{,}6561$') },
            { text: say('«Akastunen bat» $X\\ge 1$ da: aurkakoa.', '«Alguna defectuosa» es $X\\ge 1$: el contrario.', '«قطعة معيبة على الأقل» هو $X\\ge 1$: المعاكس.', '‘Some faulty’ is $X\\ge 1$: the complement.'), math: same('$P(X\\ge 1)=1-0{,}6561=0{,}3439$') },
            { text: say('«Bat baino gehiago» $X\\ge 2$ da: kendu $X=0$ eta $X=1$ balioak.', '«Más de una» es $X\\ge 2$: quita $X=0$ y $X=1$.', '«أكثر من واحدة» هو $X\\ge 2$: احذف $X=0$ و$X=1$.', '‘More than one’ is $X\\ge 2$: remove $X=0$ and $X=1$.'), math: same('$P(X=1)=4\\cdot 0{,}1\\cdot 0{,}9^3=0{,}2916$') },
            { text: say('Hiru zenbakiak kentzen dira.', 'Se restan los tres números.', 'نطرح الأعداد الثلاثة.', 'Subtract the numbers.'), math: same('$P(X\\ge 2)=1-0{,}6561-0{,}2916=0{,}0523$') }
        ],
        takeaway: say(
            '«Gutxienez $k$» $X\\ge k$ da; «$k$ baino gehiago», $X>k$, hau da, $X\\ge k+1$; «gehienez $k$», $X\\le k$. «Bat edo gehiago» $1-P(X=0)=1-q^n$ da. Gai asko batu behar badira, kalkulatu aurkakoa eta kendu 1 zenbakitik.',
            '«Al menos $k$» es $X\\ge k$; «más de $k$», $X>k$, es decir, $X\\ge k+1$; «como mucho $k$», $X\\le k$. «Alguno» es $1-P(X=0)=1-q^n$. Si hay que sumar muchos términos, calcula el contrario y réstalo de 1.',
            '«$k$ على الأقل» هو $X\\ge k$؛ و«أكثر من $k$» هو $X>k$ أي $X\\ge k+1$؛ و«$k$ على الأكثر» هو $X\\le k$. و«واحد على الأقل» هو $1-P(X=0)=1-q^n$. وإذا وجب جمع حدود كثيرة فاحسب المعاكس واطرحه من 1.',
            '‘At least $k$’ is $X\\ge k$; ‘more than $k$’, $X>k$, that is, $X\\ge k+1$; ‘at most $k$’, $X\\le k$. ‘Some’ is $1-P(X=0)=1-q^n$. If many terms would have to be added, work out the complement and subtract it from 1.'
        ),
        figureAfterSteps: true,
        figure: (language) => <PiecesFigure language={language} />
    },
    {
        id: 'binomial-parameters',
        stage: 'binomial',
        title: say('Batez bestekoa eta sakabanatzea', 'Media y dispersión', 'المتوسط والتشتت', 'Mean and spread'),
        goal: say('Binomial baten $\\mu=np$ eta $\\sigma=\\sqrt{npq}$ kalkulatzea, eta bi banaketaren sakabanatzea aldakuntza-koefizientearekin alderatzea.', 'Calcular $\\mu=np$ y $\\sigma=\\sqrt{npq}$ de una binomial, y comparar la dispersión de dos con el coeficiente de variación.', 'حساب $\\mu=np$ و$\\sigma=\\sqrt{npq}$ لتوزيع ثنائي، ومقارنة تشتت توزيعين بمعامل الاختلاف.', 'Work out $\\mu=np$ and $\\sigma=\\sqrt{npq}$ of a binomial, and compare the spread of two with the coefficient of variation.'),
        needs: [need.compare],
        problem: say('Hiri bateko bizilagunen % 20 bizikletaz joaten da lanera. 100 pertsonari galdetzen zaie. Kalkulatu $\\mu$ eta $\\sigma$, eta alderatu sakabanatzea $B(16;\\,0{,}5)$ banaketarenarekin.', 'El 20 % de los vecinos de una ciudad va en bici al trabajo. Se pregunta a 100 personas. Calcula $\\mu$ y $\\sigma$, y compara su dispersión con la de una $B(16;\\,0{,}5)$.', 'يذهب 20٪ من سكان مدينة إلى العمل بالدراجة. يُسأل 100 شخص. احسب $\\mu$ و$\\sigma$، وقارن التشتت بتشتت $B(16;\\,0{,}5)$.', '20% of a city\'s residents cycle to work. 100 people are asked. Work out $\\mu$ and $\\sigma$, and compare its spread with that of a $B(16;\\,0{,}5)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$X\\sim B(100;\\,0{,}2)$: batez beste, 20 bizikletari.', '$X\\sim B(100;\\,0{,}2)$: de media, 20 ciclistas.', '$X\\sim B(100;\\,0{,}2)$: في المتوسط 20 من راكبي الدراجات.', '$X\\sim B(100;\\,0{,}2)$: on average, 20 cyclists.'), math: same('$\\mu=100\\cdot 0{,}2=20$') },
            { text: say('Desbideratze tipikoa bariantzaren erroa da.', 'La desviación típica es la raíz de la varianza.', 'الانحراف المعياري جذر التباين.', 'The standard deviation is the root of the variance.'), math: same('$\\sigma=\\sqrt{100\\cdot 0{,}2\\cdot 0{,}8}=\\sqrt{16}=4$') },
            { text: say('$B(16;\\,0{,}5)$ banaketak $\\mu=8$ eta $\\sigma=2$ ditu. Aldakuntza-koefizienteak:', 'La $B(16;\\,0{,}5)$ tiene $\\mu=8$ y $\\sigma=2$. Los coeficientes de variación:', 'للتوزيع $B(16;\\,0{,}5)$ القيمتان $\\mu=8$ و$\\sigma=2$. معاملا الاختلاف:', 'The $B(16;\\,0{,}5)$ has $\\mu=8$ and $\\sigma=2$. The coefficients of variation:'), math: same('$\\frac{4}{20}=0{,}2\\qquad\\frac{2}{8}=0{,}25$') }
        ],
        takeaway: say(
            '$X\\sim B(n;\\,p)$ bada, $\\mu=np$ eta $\\sigma=\\sqrt{npq}$. Batez besteko desberdineko bi banaketaren sakabanatzea alderatzeko, $CV=\\frac{\\sigma}{\\mu}$ aldakuntza-koefizientea erabiltzen da: handiagoa duena da sakabanatuagoa, bere batez bestekoarekiko.',
            'Si $X\\sim B(n;\\,p)$, $\\mu=np$ y $\\sigma=\\sqrt{npq}$. Para comparar la dispersión de dos distribuciones con medias distintas se usa el coeficiente de variación $CV=\\frac{\\sigma}{\\mu}$: la que lo tiene mayor está más dispersa respecto de su media.',
            'إذا كان $X\\sim B(n;\\,p)$ فإن $\\mu=np$ و$\\sigma=\\sqrt{npq}$. ولمقارنة تشتت توزيعين متوسطاهما مختلفان يُستعمل معامل الاختلاف $CV=\\frac{\\sigma}{\\mu}$: صاحب المعامل الأكبر أكثر تشتتًا بالنسبة إلى متوسطه.',
            'If $X\\sim B(n;\\,p)$, $\\mu=np$ and $\\sigma=\\sqrt{npq}$. To compare the spread of two distributions with different means, use the coefficient of variation $CV=\\frac{\\sigma}{\\mu}$: the one with the larger value is more spread out relative to its mean.'
        ),
        figureAfterSteps: true,
        figure: (language) => <SpreadFigure language={language} />
    },

    /* ---------- 4. Fitting data to a binomial ---------- */
    {
        id: 'fit-p',
        stage: 'fit',
        title: say('Datuetatik binomialera', 'De los datos a la binomial', 'من البيانات إلى التوزيع الثنائي', 'From the data to the binomial'),
        goal: say('Maiztasun-taula bati egokitzen zaion binomialaren $p$ aurkitzea, datuen batez bestekoa erabiliz: $p=\\frac{\\bar{x}}{n}$.', 'Hallar la $p$ de la binomial que corresponde a una tabla de frecuencias, usando la media de los datos: $p=\\frac{\\bar{x}}{n}$.', 'إيجاد $p$ للتوزيع الثنائي الموافق لجدول تكرارات باستعمال متوسط البيانات: $p=\\frac{\\bar{x}}{n}$.', 'Find the $p$ of the binomial that matches a frequency table, using the mean of the data: $p=\\frac{\\bar{x}}{n}$.'),
        problem: say('Denda batean, 3 bezeroko 80 taldetan zenbatu da zenbatek erosten duten: 0 → 11 talde, 1 → 27, 2 → 33 eta 3 → 9. Zein binomialekin alderatu behar dira?', 'En una tienda se ha contado, en 80 grupos de 3 clientes, cuántos compran: 0 → 11 grupos, 1 → 27, 2 → 33 y 3 → 9. ¿Con qué binomial hay que compararlos?', 'في متجر عُدّ، في 80 مجموعة من 3 زبائن، كم منهم يشتري: 0 ← 11 مجموعة، 1 ← 27، 2 ← 33، 3 ← 9. بأي توزيع ثنائي يجب مقارنتها؟', 'In a shop, in 80 groups of 3 customers, it was counted how many buy: 0 → 11 groups, 1 → 27, 2 → 33 and 3 → 9. Which binomial should they be compared with?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Talde bakoitza 3 proba dira (3 bezero): $n=3$. Datuen batez bestekoa:', 'Cada grupo son 3 pruebas (3 clientes): $n=3$. La media de los datos:', 'كل مجموعة 3 محاولات (3 زبائن): $n=3$. متوسط البيانات:', 'Each group is 3 trials (3 customers): $n=3$. The mean of the data:'), math: same('$\\bar{x}=\\frac{27+66+27}{80}=\\frac{120}{80}=1{,}5$') },
            { text: say('Binomial batean $\\mu=np$ da; beraz, $p$ askatzen da.', 'En una binomial $\\mu=np$; por tanto, se despeja $p$.', 'في التوزيع الثنائي $\\mu=np$؛ إذن نستخرج $p$.', 'In a binomial $\\mu=np$; so solve for $p$.'), math: same('$p=\\frac{1{,}5}{3}=0{,}5$') },
            { text: say('Datuak hurrengo binomial honekin alderatuko dira:', 'Los datos se compararán con esta binomial:', 'ستُقارن البيانات بهذا التوزيع الثنائي:', 'The data will be compared with this binomial:'), math: same('$B(3;\\,0{,}5)$') }
        ],
        takeaway: say(
            'Datuek $B(n;\\,p)$ banaketa bati jarraitzen badiote, haien batez bestekoa $np$ ingurukoa da. Horregatik, $p=\\frac{\\bar{x}}{n}$ hartzen da, $n$ datu bakoitzeko proba kopurua dela, ez datu kopurua.',
            'Si los datos siguen una $B(n;\\,p)$, su media es cercana a $np$. Por eso se toma $p=\\frac{\\bar{x}}{n}$, donde $n$ es el número de pruebas de cada dato, no el número de datos.',
            'إذا اتبعت البيانات توزيعًا $B(n;\\,p)$ كان متوسطها قريبًا من $np$. لذلك نأخذ $p=\\frac{\\bar{x}}{n}$، حيث $n$ عدد المحاولات في كل معطى لا عدد المعطيات.',
            'If the data follow a $B(n;\\,p)$, their mean is close to $np$. That is why $p=\\frac{\\bar{x}}{n}$ is taken, where $n$ is the number of trials in each datum, not the number of data.'
        ),
        figureAfterSteps: true,
        figure: (language) => <ObservedFigure language={language} />
    },
    {
        id: 'expected-values',
        stage: 'fit',
        title: say('Balio itxaronak', 'Los valores esperados', 'القيم المتوقعة', 'The expected values'),
        goal: say('Binomial batek datu kopuru batean ematen dituen balio itxaronak kalkulatzea eta behatutako datuekin alderatzea.', 'Calcular los valores que una binomial espera en un número de datos y compararlos con los observados.', 'حساب القيم التي يتوقعها توزيع ثنائي في عدد من المعطيات ومقارنتها بالمشاهَدة.', 'Work out the values a binomial expects in a number of data and compare them with the observed ones.'),
        problem: say('80 taldeen datuak $B(3;\\,0{,}5)$ banaketarekin alderatzen dira. Zenbat talde espero dira 0, 1, 2 eta 3 erosleekin?', 'Los datos de los 80 grupos se comparan con una $B(3;\\,0{,}5)$. ¿Cuántos grupos se esperan con 0, 1, 2 y 3 compradores?', 'تُقارن بيانات المجموعات الثمانين بـ $B(3;\\,0{,}5)$. كم مجموعة يُتوقع أن يكون فيها 0 و1 و2 و3 مشترين؟', 'The data of the 80 groups are compared with a $B(3;\\,0{,}5)$. How many groups are expected with 0, 1, 2 and 3 buyers?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$B(3;\\,0{,}5)$ banaketaren probabilitateak, 0, 1, 2 eta 3 balioentzat:', 'Las probabilidades de la $B(3;\\,0{,}5)$ para 0, 1, 2 y 3:', 'احتمالات $B(3;\\,0{,}5)$ للقيم 0 و1 و2 و3:', 'The probabilities of the $B(3;\\,0{,}5)$ for 0, 1, 2 and 3:'), math: same('$\\frac{1}{8}\\quad\\frac{3}{8}\\quad\\frac{3}{8}\\quad\\frac{1}{8}$') },
            { text: say('Talde kopurua bider probabilitatea.', 'El número de grupos por la probabilidad.', 'عدد المجموعات في الاحتمال.', 'The number of groups times the probability.'), math: same('$80\\cdot\\frac{1}{8}=10\\qquad 80\\cdot\\frac{3}{8}=30$') },
            { text: say('Itxaronak 10, 30, 30 eta 10 dira; behatuak, 11, 27, 33 eta 9.', 'Los esperados son 10, 30, 30 y 10; los observados, 11, 27, 33 y 9.', 'المتوقعة 10 و30 و30 و10؛ والمشاهَدة 11 و27 و33 و9.', 'The expected values are 10, 30, 30 and 10; the observed ones, 11, 27, 33 and 9.'), math: same('$10+30+30+10=80$') }
        ],
        takeaway: say(
            '$N$ datutan, $B(n;\\,p)$ banaketak $N\\cdot P(X=k)$ datu espero ditu $k$ balio bakoitzarekin. Balio itxaron horiek ez dira zertan zenbaki osoak izan, eta $N$ egiten dute batuta, behatuek bezala.',
            'En $N$ datos, una $B(n;\\,p)$ espera $N\\cdot P(X=k)$ datos con cada valor $k$. Esos valores esperados no tienen por qué ser enteros, y suman $N$, como los observados.',
            'في $N$ معطى يتوقع التوزيع $B(n;\\,p)$ عددًا قدره $N\\cdot P(X=k)$ من المعطيات لكل قيمة $k$. ولا يلزم أن تكون هذه القيم المتوقعة صحيحة، ومجموعها $N$ مثل المشاهَدة.',
            'In $N$ data, a $B(n;\\,p)$ expects $N\\cdot P(X=k)$ data with each value $k$. Those expected values need not be whole numbers, and they add up to $N$, like the observed ones.'
        ),
        figureAfterSteps: true,
        figure: (language) => <ExpectedFigure language={language} />
    },
    {
        id: 'good-fit',
        stage: 'fit',
        title: say('Doikuntza ona ala txarra?', '¿Ajuste bueno o malo?', 'مطابقة جيدة أم سيئة؟', 'A good or a bad fit?'),
        goal: say('Behatuen eta itxaronen arteko diferentziak kalkulatzea eta, handienarekin, datuak binomial batera ondo doitzen diren erabakitzea.', 'Calcular las diferencias entre observados y esperados y decidir, con la mayor, si los datos se ajustan bien a una binomial.', 'حساب الفروق بين المشاهَدة والمتوقعة، والحكم بأكبرها على جودة مطابقة البيانات لتوزيع ثنائي.', 'Work out the differences between observed and expected values and decide, with the largest, whether the data fit a binomial well.'),
        problem: say('Behatuak 11, 27, 33 eta 9 dira, eta itxaronak, 10, 30, 30 eta 10. Doikuntza ona da?', 'Los observados son 11, 27, 33 y 9, y los esperados, 10, 30, 30 y 10. ¿Es bueno el ajuste?', 'المشاهَدة 11 و27 و33 و9، والمتوقعة 10 و30 و30 و10. هل المطابقة جيدة؟', 'The observed values are 11, 27, 33 and 9, and the expected ones, 10, 30, 30 and 10. Is the fit good?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Diferentziak, balio absolutuan: 1, 3, 3 eta 1.', 'Las diferencias, en valor absoluto: 1, 3, 3 y 1.', 'الفروق بالقيمة المطلقة: 1 و3 و3 و1.', 'The differences, in absolute value: 1, 3, 3 and 1.'), math: same('$|27-30|=3$') },
            { text: say('Handiena 3 da, eta guztizkoarekin alderatzen da.', 'La mayor es 3, y se compara con el total.', 'أكبرها 3، ويُقارن بالكل.', 'The largest is 3, and it is compared with the total.'), math: same('$\\frac{3}{80}=0{,}0375$') },
            { text: say('% 3,75 da, % 5 baino gutxiago: doikuntza ona da, eta datuak binomial bati jarraitzen diotela onartzen da.', 'Es el 3,75 %, menos del 5 %: el ajuste es bueno y se acepta que los datos siguen una binomial.', 'إنه 3.75٪، أقل من 5٪: المطابقة جيدة، ونقبل أن البيانات تتبع توزيعًا ثنائيًّا.', 'It is 3.75%, less than 5%: the fit is good and we accept that the data follow a binomial.'), math: same('$0{,}0375<0{,}05$') }
        ],
        takeaway: say(
            'Datu-taula bat binomial batera doitzeko: $p=\\frac{\\bar{x}}{n}$, balio itxaronak $N\\cdot P(X=k)$ eta diferentziak balio absolutuan. Matellaren araua (gidaliburu praktikoa, ez proba zehatza): diferentziarik handiena guztizkoaren % 5 baino handiagoa ez bada, doikuntza onartzen da; handiagoa bada, ez.',
            'Para ajustar una tabla a una binomial: $p=\\frac{\\bar{x}}{n}$, valores esperados $N\\cdot P(X=k)$ y diferencias en valor absoluto. Regla de Matella (una guía práctica, no una prueba exacta): si la mayor diferencia no pasa del 5 % del total, se acepta el ajuste; si pasa, se rechaza.',
            'لمطابقة جدول مع توزيع ثنائي: $p=\\frac{\\bar{x}}{n}$، والقيم المتوقعة $N\\cdot P(X=k)$، والفروق بالقيمة المطلقة. قاعدة ماتيلا (دليل عملي لا اختبار دقيق): إذا لم يتجاوز أكبر فرق 5٪ من الكل قُبلت المطابقة، وإذا تجاوزها رُفضت.',
            'To fit a table to a binomial: $p=\\frac{\\bar{x}}{n}$, expected values $N\\cdot P(X=k)$ and differences in absolute value. Matella\'s rule (a practical guide, not an exact test): if the largest difference is no more than 5% of the total, the fit is accepted; if it is more, it is rejected.'
        ),
        figureAfterSteps: true,
        figure: (language) => <DifferencesFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const discreteBatx1gTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...discreteBatx1gLessonTexts[topic.id as DiscreteBatx1gTopicId], ...discreteBatx1gLessonChecks[topic.id as DiscreteBatx1gTopicId] }))
