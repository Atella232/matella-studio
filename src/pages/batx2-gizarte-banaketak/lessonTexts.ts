import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { DistributionsBatx2gTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Banaketak · Batxilergoa 2 · Gizarte Zientziak — what each lesson tells:
   the new words, a short explanation, the example as an exercise
   («Another example»), the key words in four languages and, in several
   lessons, «Why does it work?». Plain data so the tests can import it;
   lessons.tsx merges it into the topics. The example uses numbers of its
   own, never those of «Let's solve», of «Check it» or of the mistake.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const distributionsBatx2gLessonTexts: Record<DistributionsBatx2gTopicId, LessonTexts> = {
    /* ---------- 1. Discrete random variables ---------- */
    'random-variable': {
        definitions: [
            { term: say('Aldagai aleatorioa', 'Variable aleatoria', 'المتغير العشوائي', 'Random variable'), meaning: say('Esperimentu aleatorio baten emaitza bakoitzari zenbaki bat ematen dion arau bat.', 'Una regla que da un número a cada resultado de un experimento aleatorio.', 'قاعدة تعطي عددًا لكل نتيجة من نتائج تجربة عشوائية.', 'A rule that gives a number to each outcome of a random experiment.') },
            { term: say('Probabilitate-funtzioa', 'Función de probabilidad', 'دالة الاحتمال', 'Probability function'), meaning: say('Balio bakoitzaren probabilitatea ematen duen taula: $p_i=P(X=x_i)$.', 'La tabla que da la probabilidad de cada valor: $p_i=P(X=x_i)$.', 'الجدول الذي يعطي احتمال كل قيمة: $p_i=P(X=x_i)$.', 'The table that gives the probability of each value: $p_i=P(X=x_i)$.') }
        ],
        vocabulary: [say('balioa', 'valor', 'القيمة', 'value'), say('diskretua', 'discreta', 'المتقطع', 'discrete')],
        explanation: say(
            'Aldagai aleatorio bat diskretua da balio solteak hartzen baditu (0, 1, 2…), zenbaketa batean bezala. Haren banaketa taula batean idazten da: balio bakoitza eta haren probabilitatea. Probabilitateak ez dira negatiboak, eta 1 egiten dute batuta.',
            'Una variable aleatoria es discreta si toma valores sueltos (0, 1, 2…), como al contar. Su distribución se escribe en una tabla: cada valor y su probabilidad. Las probabilidades no son negativas y suman 1.',
            'يكون المتغير العشوائي متقطعًا إذا أخذ قيمًا منفصلة (0، 1، 2…) كما في العدّ. ويُكتب توزيعه في جدول: كل قيمة واحتمالها. والاحتمالات ليست سالبة ومجموعها 1.',
            'A random variable is discrete if it takes separate values (0, 1, 2…), as when counting. Its distribution is written in a table: each value and its probability. The probabilities are not negative and add up to 1.'
        ),
        examplePrompt: say('$X$ aldagaiak 1, 2, 3 eta 4 balioak hartzen ditu, $0{,}15$, $0{,}25$, $0{,}35$ eta $0{,}25$ probabilitateekin. Zenbat da $P(X\\le 2)$?', '$X$ vale 1, 2, 3 o 4 con probabilidades $0{,}15$, $0{,}25$, $0{,}35$ y $0{,}25$. ¿Cuánto vale $P(X\\le 2)$?', 'يأخذ $X$ القيم 1 و2 و3 و4 باحتمالات $0{,}15$ و$0{,}25$ و$0{,}35$ و$0{,}25$. كم يساوي $P(X\\le 2)$؟', '$X$ takes 1, 2, 3 or 4 with probabilities $0{,}15$, $0{,}25$, $0{,}35$ and $0{,}25$. What is $P(X\\le 2)$?'),
        example: same('$P(X\\le 2)=0{,}15+0{,}25=0{,}4$'),
        exampleAnswer: say('1 eta 2 balioen probabilitateak batu dira.', 'Se suman las probabilidades del 1 y del 2.', 'نجمع احتمالي 1 و2.', 'The probabilities of 1 and 2 are added.')
    },
    'mean-variance': {
        definitions: [
            { term: say('Itxaropena', 'Esperanza', 'الأمل الرياضي', 'Expected value'), meaning: say('Aldagai aleatorio baten batez bestekoa: $\\mu=\\sum x_i\\,p_i$.', 'La media de una variable aleatoria: $\\mu=\\sum x_i\\,p_i$.', 'متوسط متغير عشوائي: $\\mu=\\sum x_i\\,p_i$.', 'The mean of a random variable: $\\mu=\\sum x_i\\,p_i$.') }
        ],
        vocabulary: [say('bariantza', 'varianza', 'التباين', 'variance'), say('batez bestekoa', 'media', 'المتوسط', 'mean')],
        explanation: say(
            'Batez bestekoak esaten du zein balio lortuko den batez beste esperimentua askotan errepikatuz gero. Bariantzak eta desbideratze tipikoak neurtzen dute zenbat sakabanatzen diren balioak batez bestekoaren inguruan. Datuen estatistikan bezala kalkulatzen dira, maiztasun erlatiboen ordez probabilitateekin.',
            'La media dice qué valor se obtiene en promedio si se repite el experimento muchas veces. La varianza y la desviación típica miden cuánto se dispersan los valores alrededor de la media. Se calculan como en la estadística de datos, con probabilidades en lugar de frecuencias relativas.',
            'يقول المتوسط ما القيمة التي نحصل عليها في المتوسط إذا كرّرنا التجربة مرات كثيرة. ويقيس التباين والانحراف المعياري مدى تشتت القيم حول المتوسط. ويُحسبان كما في إحصاء البيانات، بالاحتمالات بدل التكرارات النسبية.',
            'The mean says what value is obtained on average if the experiment is repeated many times. The variance and the standard deviation measure how spread out the values are around the mean. They are worked out as in data statistics, with probabilities instead of relative frequencies.'
        ),
        examplePrompt: say('$X$ aldagaiak 1 edo 3 balio du, $0{,}75$ eta $0{,}25$ probabilitateekin. Zenbat da $\\mu$?', '$X$ vale 1 o 3 con probabilidades $0{,}75$ y $0{,}25$. ¿Cuánto vale $\\mu$?', 'يأخذ $X$ القيمة 1 أو 3 باحتمالي $0{,}75$ و$0{,}25$. كم يساوي $\\mu$؟', '$X$ takes 1 or 3 with probabilities $0{,}75$ and $0{,}25$. What is $\\mu$?'),
        example: same('$\\mu=1\\cdot 0{,}75+3\\cdot 0{,}25=1{,}5$'),
        exampleAnswer: say('Batez bestekoa 1 baliotik gertuago dago, probableagoa delako.', 'La media queda más cerca del 1, que es más probable.', 'المتوسط أقرب إلى 1 لأنه الأرجح.', 'The mean is closer to 1, which is more likely.')
    },
    'expected-gain': {
        definitions: [
            { term: say('Joko bidezkoa', 'Juego justo', 'لعبة عادلة', 'Fair game'), meaning: say('Espero den irabazia 0 duen jokoa: inork ez du irabazten batez beste.', 'Un juego cuya ganancia esperada es 0: nadie gana en promedio.', 'لعبة ربحها المتوقع 0: لا يربح أحد في المتوسط.', 'A game whose expected gain is 0: nobody wins on average.') }
        ],
        vocabulary: [say('irabazia', 'ganancia', 'الربح', 'gain'), say('saria', 'premio', 'الجائزة', 'prize')],
        explanation: say(
            'Dirua dagoenean, $X$ = «irabazia» aldagaia da, eta galerak negatiboak dira. Espero den irabazia haren batez bestekoa da: zenbat irabazten edo galtzen den batez beste, askotan jokatuz gero. Zozketa eta aseguru gehienetan negatiboa da erosten duenarentzat: horrela irabazten du antolatzaileak.',
            'Cuando hay dinero, $X$ = «ganancia», y las pérdidas son negativas. La ganancia esperada es su media: cuánto se gana o se pierde en promedio jugando muchas veces. En casi todas las rifas y seguros es negativa para quien compra: así gana quien organiza.',
            'عند وجود مال يكون $X$ = «الربح»، والخسائر سالبة. والربح المتوقع متوسطه: كم يُربح أو يُخسر في المتوسط باللعب مرات كثيرة. وفي معظم اليانصيب والتأمينات يكون سالبًا للمشتري: هكذا يربح المنظِّم.',
            'When there is money, $X$ = ‘gain’, and losses are negative. The expected gain is its mean: how much is won or lost on average when playing many times. In almost every raffle and insurance it is negative for the buyer: that is how the organiser earns.'
        ),
        examplePrompt: say('Aseguru batek 60 € balio du, eta $0{,}02$ probabilitatearekin 1000 € ordaintzen ditu. Zein da aseguratuaren espero den irabazia?', 'Un seguro cuesta 60 € y con probabilidad $0{,}02$ paga 1000 €. ¿Cuál es la ganancia esperada del asegurado?', 'يكلّف تأمين 60 € ويدفع 1000 € باحتمال $0{,}02$. ما الربح المتوقع للمؤمَّن له؟', 'An insurance costs €60 and pays €1,000 with probability $0{,}02$. What is the insured person\'s expected gain?'),
        example: same('$1000\\cdot 0{,}02-60=-40$'),
        exampleAnswer: say('40 € galtzen ditu batez beste: aseguratzaileak irabazten du.', 'Pierde 40 € en promedio: gana la aseguradora.', 'يخسر 40 € في المتوسط: تربح شركة التأمين.', 'They lose €40 on average: the insurer earns.')
    },

    /* ---------- 2. The binomial distribution ---------- */
    'is-binomial': {
        definitions: [
            { term: say('Banaketa binomiala', 'Distribución binomial', 'التوزيع الثنائي', 'Binomial distribution'), meaning: say('$n$ proba independenteetan, $p$ probabilitateko arrakasten kopuruaren banaketa: $B(n;\\,p)$.', 'La del número de éxitos en $n$ pruebas independientes con probabilidad de éxito $p$: $B(n;\\,p)$.', 'توزيع عدد النجاحات في $n$ تجربة مستقلة احتمال النجاح فيها $p$: $B(n;\\,p)$.', 'That of the number of successes in $n$ independent trials with probability of success $p$: $B(n;\\,p)$.') }
        ],
        vocabulary: [say('arrakasta', 'éxito', 'النجاح', 'success'), say('proba', 'prueba', 'التجربة', 'trial')],
        explanation: say(
            'Inkesta batean pertsona bakoitza proba bat da: «bai» arrakasta da eta «ez» porrota. Populazioa handia bada, galdetutako batek ez du hurrengoaren probabilitatea aldatzen, eta probak independenteak dira. Talde txiki batean itzuli gabe aukeratzean, ordea, $p$ aldatu egiten da.',
            'En una encuesta cada persona es una prueba: «sí» es un éxito y «no» un fracaso. Si la población es grande, preguntar a uno no cambia la probabilidad del siguiente y las pruebas son independientes. Al elegir sin devolución en un grupo pequeño, en cambio, $p$ cambia.',
            'في الاستطلاع كل شخص تجربة: «نعم» نجاح و«لا» فشل. وإذا كان المجتمع كبيرًا فسؤال شخص لا يغيّر احتمال التالي، والتجارب مستقلة. أما عند الاختيار دون إرجاع في مجموعة صغيرة فيتغير $p$.',
            'In a poll each person is a trial: ‘yes’ is a success and ‘no’ a failure. If the population is large, asking one person does not change the probability for the next, and the trials are independent. When choosing without replacement in a small group, however, $p$ changes.'
        ),
        examplePrompt: say('Txanpon bat 8 aldiz botatzen da eta aurpegiak zenbatzen dira. Binomiala da? Zein parametrorekin?', 'Se lanza una moneda 8 veces y se cuentan las caras. ¿Es binomial? ¿Con qué parámetros?', 'تُرمى قطعة نقود 8 مرات وتُعدّ الوجوه. هل هو ثنائي؟ وبأي معلمتين؟', 'A coin is tossed 8 times and the heads are counted. Is it binomial? With what parameters?'),
        example: same('$X\\sim B(8;\\,0{,}5)$'),
        exampleAnswer: say('Bai: 8 proba independente, bi emaitza eta $p=0{,}5$ beti.', 'Sí: 8 pruebas independientes, dos resultados y siempre $p=0{,}5$.', 'نعم: 8 تجارب مستقلة ونتيجتان و$p=0{,}5$ دائمًا.', 'Yes: 8 independent trials, two outcomes and always $p=0{,}5$.')
    },
    'binomial-formula': {
        vocabulary: [say('porrota', 'fracaso', 'الفشل', 'failure'), say('ordena', 'orden', 'الترتيب', 'order')],
        explanation: say(
            'Zehazki $k$ arrakasta lortzeko, bide bakoitzak $k$ arrakasta eta $n-k$ porrot ditu, eta haren probabilitatea $p^k\\,q^{n-k}$ da. Arrakastak $n$ tokitik $k$ tokitan egon daitezke: $\\binom{n}{k}$ bide. «Gutxienez bat» kasuan, errazagoa da aurkakoa kentzea.',
            'Para tener exactamente $k$ éxitos, cada camino tiene $k$ éxitos y $n-k$ fracasos, y su probabilidad es $p^k\\,q^{n-k}$. Los éxitos pueden estar en $k$ de los $n$ lugares: $\\binom{n}{k}$ caminos. Para «al menos uno», es más fácil restar el contrario.',
            'للحصول على $k$ نجاحًا بالضبط، يحوي كل مسار $k$ نجاحًا و$n-k$ فشلًا، واحتماله $p^k\\,q^{n-k}$. ويمكن أن تقع النجاحات في $k$ من $n$ مواضع: $\\binom{n}{k}$ مسارًا. ولـ«واحد على الأقل» الأسهل طرح المعاكس.',
            'To get exactly $k$ successes, each path has $k$ successes and $n-k$ failures, and its probability is $p^k\\,q^{n-k}$. The successes can be in $k$ of the $n$ places: $\\binom{n}{k}$ paths. For ‘at least one’, it is easier to take away the complement.'
        ),
        examplePrompt: say('$X\\sim B(4;\\,0{,}5)$. Zenbat da $P(X=3)$?', '$X\\sim B(4;\\,0{,}5)$. ¿Cuánto vale $P(X=3)$?', '$X\\sim B(4;\\,0{,}5)$. كم يساوي $P(X=3)$؟', '$X\\sim B(4;\\,0{,}5)$. What is $P(X=3)$?'),
        example: same('$P(X=3)=4\\cdot 0{,}5^4=0{,}25$'),
        exampleAnswer: say('$\\binom{4}{3}=4$ ordena, bakoitza $0{,}5^4$ probabilitatearekin.', '$\\binom{4}{3}=4$ órdenes, cada uno con probabilidad $0{,}5^4$.', '$\\binom{4}{3}=4$ ترتيبات، لكل منها احتمال $0{,}5^4$.', '$\\binom{4}{3}=4$ orders, each with probability $0{,}5^4$.'),
        why: {
            text: say('Probak independenteak direnez, bide bateko probabilitateak biderkatzen dira: $p$ arrakasta bakoitzeko eta $q$ porrot bakoitzeko. Bide guztiek probabilitate bera dute, beraz bide kopuruaz biderkatzen da.', 'Como las pruebas son independientes, en un camino se multiplican: $p$ por cada éxito y $q$ por cada fracaso. Todos los caminos tienen la misma probabilidad, así que se multiplica por el número de caminos.', 'لأن التجارب مستقلة نضرب في المسار: $p$ لكل نجاح و$q$ لكل فشل. ولكل المسارات الاحتمال نفسه، فنضرب في عدد المسارات.', 'As the trials are independent, along a path you multiply: $p$ for each success and $q$ for each failure. All the paths have the same probability, so you multiply by the number of paths.')
        }
    },
    'binomial-mean': {
        vocabulary: [say('espero dena', 'esperado', 'المتوقع', 'expected'), say('sakabanatzea', 'dispersión', 'التشتت', 'spread')],
        explanation: say(
            'Binomial batean ez da taula osoa behar batez bestekoa kalkulatzeko: $n$ probatan, bakoitzak $p$ arrakasta ematen du batez beste, eta beraz $\\mu=np$. Bariantza $npq$ da, eta desbideratze tipikoa haren erroa. $p$ 0,5 baliotik urrunago, sakabanatze txikiagoa.',
            'En una binomial no hace falta la tabla para la media: en $n$ pruebas, cada una da en promedio $p$ éxitos, así que $\\mu=np$. La varianza es $npq$ y la desviación típica su raíz. Cuanto más lejos está $p$ de 0,5, menos dispersión.',
            'في التوزيع الثنائي لا نحتاج الجدول للمتوسط: في $n$ تجربة تعطي كل منها $p$ نجاحًا في المتوسط، فإن $\\mu=np$. والتباين $npq$ والانحراف المعياري جذره. وكلما ابتعد $p$ عن 0.5 قل التشتت.',
            'In a binomial the table is not needed for the mean: in $n$ trials, each gives $p$ successes on average, so $\\mu=np$. The variance is $npq$ and the standard deviation its square root. The further $p$ is from 0.5, the less spread.'
        ),
        examplePrompt: say('Bidalketen % 10 berandu iristen da. 900 bidalketatan, zenbat da $\\sigma$?', 'El 10 % de los envíos llega tarde. En 900 envíos, ¿cuánto vale $\\sigma$?', 'تتأخر 10 % من الشحنات. في 900 شحنة، كم يساوي $\\sigma$؟', '10% of the parcels arrive late. In 900 parcels, what is $\\sigma$?'),
        example: same('$\\sigma=\\sqrt{900\\cdot 0{,}1\\cdot 0{,}9}=\\sqrt{81}=9$'),
        exampleAnswer: say('90 inguru berandu, 9 gora edo behera.', 'Unos 90 tarde, 9 arriba o abajo.', 'نحو 90 متأخرة، بزيادة أو نقص 9.', 'About 90 late, 9 above or below.')
    },

    /* ---------- 3. The normal distribution ---------- */
    'normal-curve': {
        definitions: [
            { term: say('Banaketa normala', 'Distribución normal', 'التوزيع الطبيعي', 'Normal distribution'), meaning: say('Kanpai formako banaketa jarraitua, $\\mu$ batez bestekoarekin eta $\\sigma$ desbideratze tipikoarekin: $N(\\mu;\\,\\sigma)$.', 'Distribución continua con forma de campana, de media $\\mu$ y desviación típica $\\sigma$: $N(\\mu;\\,\\sigma)$.', 'توزيع متصل على شكل جرس، متوسطه $\\mu$ وانحرافه المعياري $\\sigma$: $N(\\mu;\\,\\sigma)$.', 'A continuous bell-shaped distribution with mean $\\mu$ and standard deviation $\\sigma$: $N(\\mu;\\,\\sigma)$.') }
        ],
        vocabulary: [say('kanpaia', 'campana', 'الجرس', 'bell'), say('azalera', 'área', 'المساحة', 'area'), say('simetrikoa', 'simétrica', 'متماثل', 'symmetric')],
        explanation: say(
            'Altuerak, soldatak edo denborak bezalako aldagaiak jarraituak dira: edozein balio har dezakete. Askotan haien banaketa kanpai bat da: balio gehienak batez bestekotik gertu, eta gutxi muturretan. Probabilitatea kanpaiaren azpiko azalera da; balio jakin batek probabilitate 0 du.',
            'Variables como las alturas, los sueldos o los tiempos son continuas: pueden tomar cualquier valor. Muchas veces su distribución es una campana: casi todos los valores cerca de la media y pocos en los extremos. La probabilidad es el área bajo la campana; un valor exacto tiene probabilidad 0.',
            'المتغيرات مثل الأطوال والرواتب والأزمنة متصلة: يمكن أن تأخذ أي قيمة. وكثيرًا ما يكون توزيعها جرسًا: معظم القيم قرب المتوسط وقليلها في الأطراف. والاحتمال هو المساحة تحت الجرس؛ وللقيمة المضبوطة احتمال 0.',
            'Variables such as heights, salaries or times are continuous: they can take any value. Often their distribution is a bell: most values near the mean and few at the ends. The probability is the area under the bell; an exact value has probability 0.'
        ),
        examplePrompt: say('$X\\sim N(50;\\,5)$. Zenbat da $P(45<X<55)$?', '$X\\sim N(50;\\,5)$. ¿Cuánto vale $P(45<X<55)$?', '$X\\sim N(50;\\,5)$. كم يساوي $P(45<X<55)$؟', '$X\\sim N(50;\\,5)$. What is $P(45<X<55)$?'),
        example: same('$P(45<X<55)=P(-1<Z<1)=0{,}6826$'),
        exampleAnswer: say('45 eta 55 dira $\\mu\\pm\\sigma$: % 68 inguru.', '45 y 55 son $\\mu\\pm\\sigma$: cerca del 68 %.', '45 و55 هما $\\mu\\pm\\sigma$: نحو 68 %.', '45 and 55 are $\\mu\\pm\\sigma$: about 68%.')
    },
    'standard-table': {
        definitions: [
            { term: say('Normal estandarra', 'Normal estándar', 'الطبيعي المعياري', 'Standard normal'), meaning: say('$\\mu=0$ eta $\\sigma=1$ dituen normala, $Z\\sim N(0;\\,1)$; haren taula dago liburuetan.', 'La normal de $\\mu=0$ y $\\sigma=1$, $Z\\sim N(0;\\,1)$; es la que está tabulada.', 'الطبيعي الذي $\\mu=0$ و$\\sigma=1$، أي $Z\\sim N(0;\\,1)$؛ وهو المجدول.', 'The normal with $\\mu=0$ and $\\sigma=1$, $Z\\sim N(0;\\,1)$; it is the one in the table.') }
        ],
        vocabulary: [say('taula', 'tabla', 'الجدول', 'table'), say('buztana', 'cola', 'الذيل', 'tail')],
        explanation: say(
            'Taulak $k$ positibo baten ezkerreko azalera ematen du, bi hamartarrekin, $P(Z\\le k)$: errenkadak unitatea eta lehen hamartarra ematen ditu, eta zutabeak bigarren hamartarra. Gainerako guztia kanpaiaren simetriatik eta azalera osoa 1 delako ateratzen da.',
            'La tabla da el área a la izquierda de un $k$ positivo con dos decimales, $P(Z\\le k)$: la fila da la unidad y la primera cifra decimal, y la columna la segunda. Todo lo demás sale de la simetría de la campana y de que el área total es 1.',
            'يعطي الجدول المساحة يسار $k$ موجب برقمين عشريين، $P(Z\\le k)$: يعطي الصف الآحاد والرقم العشري الأول، والعمود الرقم الثاني. وكل ما عدا ذلك يأتي من تماثل الجرس ومن أن المساحة الكلية 1.',
            'The table gives the area to the left of a positive $k$ with two decimals, $P(Z\\le k)$: the row gives the units and the first decimal, and the column the second. Everything else comes from the symmetry of the bell and from the total area being 1.'
        ),
        examplePrompt: say('Zenbat da $P(Z>1{,}2)$?', '¿Cuánto vale $P(Z>1{,}2)$?', 'كم يساوي $P(Z>1{,}2)$؟', 'What is $P(Z>1{,}2)$?'),
        example: same('$P(Z>1{,}2)=1-0{,}8849=0{,}1151$'),
        exampleAnswer: say('Gainetik dagoena: 1 ken taulako balioa.', 'Lo de encima: 1 menos el valor de la tabla.', 'ما فوق: 1 ناقص قيمة الجدول.', 'What lies above: 1 minus the table value.')
    },
    standardize: {
        definitions: [
            { term: say('Tipifikatu', 'Tipificar', 'التوحيد المعياري', 'Standardise'), meaning: say('$x$ balio bat ${z}=\\frac{x-\\mu}{\\sigma}$ bihurtzea: zenbat $\\sigma$ dagoen batez bestekotik.', 'Pasar un valor $x$ a ${z}=\\frac{x-\\mu}{\\sigma}$: cuántas $\\sigma$ está de la media.', 'تحويل القيمة $x$ إلى ${z}=\\frac{x-\\mu}{\\sigma}$: كم $\\sigma$ تبعد عن المتوسط.', 'Turn a value $x$ into ${z}=\\frac{x-\\mu}{\\sigma}$: how many $\\sigma$ it is from the mean.') }
        ],
        vocabulary: [say('zabalera', 'anchura', 'العرض', 'width'), say('mugak', 'extremos', 'الطرفين', 'ends')],
        explanation: say(
            'Normal bakoitzak bere $\\mu$ eta $\\sigma$ ditu, baina taula bakarra dago. Tipifikatzean, batez bestekoa zerora eramaten da eta $\\sigma$ zenbakiaz zatitzen da: azalerak berdin geratzen dira. Horregatik, $P(X\\le x)=P(Z\\le z)$.',
            'Cada normal tiene su $\\mu$ y su $\\sigma$, pero hay una sola tabla. Al tipificar, la media se lleva al 0 y se divide entre $\\sigma$: las áreas quedan igual. Por eso $P(X\\le x)=P(Z\\le z)$.',
            'لكل توزيع طبيعي $\\mu$ و$\\sigma$، لكن هناك جدول واحد. وعند التوحيد ننقل المتوسط إلى 0 ونقسم على $\\sigma$: تبقى المساحات كما هي. لذلك $P(X\\le x)=P(Z\\le z)$.',
            'Each normal has its own $\\mu$ and $\\sigma$, but there is only one table. Standardising moves the mean to 0 and divides by $\\sigma$: the areas stay the same. That is why $P(X\\le x)=P(Z\\le z)$.'
        ),
        examplePrompt: say('$X\\sim N(20;\\,4)$. Zenbat da $P(X<26)$?', '$X\\sim N(20;\\,4)$. ¿Cuánto vale $P(X<26)$?', '$X\\sim N(20;\\,4)$. كم يساوي $P(X<26)$؟', '$X\\sim N(20;\\,4)$. What is $P(X<26)$?'),
        example: same('${z}=\\frac{26-20}{4}=1{,}5\\ \\to\\ 0{,}9332$'),
        exampleAnswer: say('Tipifikatu eta taulan irakurri.', 'Se tipifica y se lee en la tabla.', 'نوحّد ونقرأ في الجدول.', 'Standardise and read it in the table.'),
        why: {
            text: say('$\\mu$ kenduz, kanpaia mugitu egiten da baina ez da aldatzen; $\\sigma$ zenbakiaz zatituz, zabalera 1 bihurtzen da. Azalerak ez dira aldatzen, eta $Z$ normal estandarra da.', 'Al restar $\\mu$ la campana se desplaza sin cambiar; al dividir entre $\\sigma$ su anchura pasa a ser 1. Las áreas no cambian y $Z$ es la normal estándar.', 'بطرح $\\mu$ ينتقل الجرس دون أن يتغير، وبالقسمة على $\\sigma$ يصبح عرضه 1. لا تتغير المساحات ويكون $Z$ الطبيعي المعياري.', 'Subtracting $\\mu$ moves the bell without changing it; dividing by $\\sigma$ makes its width 1. The areas do not change and $Z$ is the standard normal.')
        }
    },
    'compare-scores': {
        vocabulary: [say('nabarmendu', 'destacar', 'التميز', 'stand out'), say('eskala', 'escala', 'المقياس', 'scale')],
        explanation: say(
            'Bi emaitza eskala desberdinetan daudenean (10 puntutik eta 100 puntutik, euroak eta orduak), ezin dira zuzenean konparatu. Haien ${z}$ bakoitzak bere taldean non dagoen esaten du: ${z}$ handiagoak nabarmenago esan nahi du. ${z}$ negatiboa batez bestekotik behera dago.',
            'Cuando dos resultados están en escalas distintas (sobre 10 y sobre 100, euros y horas), no se pueden comparar directamente. Su ${z}$ dice dónde está cada uno en su grupo: mayor ${z}$ quiere decir que destaca más. Una ${z}$ negativa está por debajo de la media.',
            'عندما تكون نتيجتان على مقياسين مختلفين (من 10 ومن 100، يورو وساعات) لا تُقارنان مباشرة. وتقول ${z}$ أين تقع كل منهما في مجموعتها: ${z}$ الأكبر تعني تميزًا أكبر. و${z}$ السالبة تحت المتوسط.',
            'When two results are on different scales (out of 10 and out of 100, euros and hours), they cannot be compared directly. Their ${z}$ says where each one is in its group: a bigger ${z}$ means it stands out more. A negative ${z}$ is below the mean.'
        ),
        examplePrompt: say('Zeinek nabarmentzen du gehiago: 30 $N(25;\\,2)$ banaketan, ala 70 $N(60;\\,5)$ banaketan?', '¿Qué destaca más: un 30 en una $N(25;\\,2)$ o un 70 en una $N(60;\\,5)$?', 'أيهما يتميز أكثر: 30 في $N(25;\\,2)$ أم 70 في $N(60;\\,5)$؟', 'Which stands out more: 30 in an $N(25;\\,2)$ or 70 in an $N(60;\\,5)$?'),
        example: same('${z}=\\frac{30-25}{2}=2{,}5\\qquad z=\\frac{70-60}{5}=2$'),
        exampleAnswer: say('30 puntukoak: ${z}$ handiagoa du.', 'El 30: tiene mayor ${z}$.', 'الـ 30: له ${z}$ أكبر.', 'The 30: it has the bigger ${z}$.')
    },
    'inverse-normal': {
        vocabulary: [say('ehunekoa', 'porcentaje', 'النسبة المئوية', 'percentage'), say('muga', 'corte', 'الحد', 'cut-off')],
        explanation: say(
            'Batzuetan probabilitatea ezaguna da eta balioa bilatzen da: beka bat jasotzeko nota, entrega motelen muga. Lehenik idatzi mugaren azpian geratzen den azalera; gero, taulan, azalera horretatik hurbilen dagoen balioa da $k$. Azkenik, desegin tipifikazioa.',
            'A veces se sabe la probabilidad y se busca el valor: la nota para una beca, el límite de las entregas lentas. Primero se escribe el área que queda por debajo del corte; después, en la tabla, $k$ es el valor más cercano a esa área. Por último, se deshace la tipificación.',
            'أحيانًا يكون الاحتمال معروفًا ونبحث عن القيمة: درجة منحة أو حد التوصيلات البطيئة. نكتب أولًا المساحة تحت الحد، ثم يكون $k$ في الجدول القيمة الأقرب إلى تلك المساحة. وأخيرًا نعكس التوحيد.',
            'Sometimes the probability is known and the value is wanted: the mark for a grant, the limit of the slow deliveries. First write the area below the cut; then, in the table, $k$ is the value closest to that area. Finally, undo the standardising.'
        ),
        examplePrompt: say('$N(160;\\,10)$ banaketan, zein baliotik gora dago % 10 altuena?', 'En una $N(160;\\,10)$, ¿a partir de qué valor está el 10 % más alto?', 'في $N(160;\\,10)$، ابتداءً من أي قيمة تقع أعلى 10 %؟', 'In an $N(160;\\,10)$, from what value on are the highest 10%?'),
        example: same('$P(Z\\le k)=0{,}9\\ \\to\\ k=1{,}28\\ \\to\\ x=160+12{,}8=172{,}8$'),
        exampleAnswer: say('172,8 baliotik gora.', 'A partir de 172,8.', 'ابتداءً من 172.8.', 'From 172.8 on.')
    },

    /* ---------- 4. Intervals and approximation ---------- */
    'characteristic-interval': {
        definitions: [
            { term: say('Balio kritikoa', 'Valor crítico', 'القيمة الحرجة', 'Critical value'), meaning: say('${z}_{\\alpha/2}$: $-z_{\\alpha/2}$ eta ${z}_{\\alpha/2}$ artean $1-\\alpha$ probabilitatea dago.', '${z}_{\\alpha/2}$: entre $-z_{\\alpha/2}$ y ${z}_{\\alpha/2}$ queda probabilidad $1-\\alpha$.', '${z}_{\\alpha/2}$: بين $-z_{\\alpha/2}$ و${z}_{\\alpha/2}$ احتمال $1-\\alpha$.', '${z}_{\\alpha/2}$: between $-z_{\\alpha/2}$ and ${z}_{\\alpha/2}$ there is probability $1-\\alpha$.') }
        ],
        vocabulary: [say('erradioa', 'radio', 'نصف القطر', 'radius'), say('tartea', 'intervalo', 'الفترة', 'interval')],
        explanation: say(
            'Tarte karakteristikoa batez bestekoan zentratutako tartea da, eta probabilitate jakin bat du ($1-\\alpha$). Kanpoan geratzen den $\\alpha$ bi buztanetan banatzen da, erdia bakoitzean. Taulan $1-\\frac{\\alpha}{2}$ bilatuz, ${z}_{\\alpha/2}$ ateratzen da, eta erradioa ${z}_{\\alpha/2}\\,\\sigma$ da.',
            'El intervalo característico está centrado en la media y tiene una probabilidad dada ($1-\\alpha$). La $\\alpha$ que queda fuera se reparte en las dos colas, la mitad en cada una. Buscando $1-\\frac{\\alpha}{2}$ en la tabla sale ${z}_{\\alpha/2}$, y el radio es ${z}_{\\alpha/2}\\,\\sigma$.',
            'الفترة المميزة متمركزة حول المتوسط ولها احتمال معطى ($1-\\alpha$). وتتوزع $\\alpha$ الخارجة على الذيلين، نصفها في كل منهما. وبالبحث عن $1-\\frac{\\alpha}{2}$ في الجدول نجد ${z}_{\\alpha/2}$، ونصف القطر ${z}_{\\alpha/2}\\,\\sigma$.',
            'The characteristic interval is centred on the mean and has a given probability ($1-\\alpha$). The $\\alpha$ left outside is split between the two tails, half in each. Looking up $1-\\frac{\\alpha}{2}$ in the table gives ${z}_{\\alpha/2}$, and the radius is ${z}_{\\alpha/2}\\,\\sigma$.'
        ),
        examplePrompt: say('Zein da $N(30;\\,4)$ banaketaren tarte karakteristikoa, % 90 probabilitatearekin?', '¿Cuál es el intervalo característico del 90 % de una $N(30;\\,4)$?', 'ما الفترة المميزة لـ 90 % في $N(30;\\,4)$؟', 'What is the 90% characteristic interval of an $N(30;\\,4)$?'),
        example: same('$1{,}645\\cdot 4=6{,}58\\ \\to\\ (23{,}42;\\ 36{,}58)$'),
        exampleAnswer: say('Balio kritikoa 1,645 da.', 'El valor crítico es 1,645.', 'القيمة الحرجة 1.645.', 'The critical value is 1.645.'),
        why: {
            text: say('Kanpaia simetrikoa denez, buztan bakoitzean $\\frac{\\alpha}{2}$ geratzen da. Beraz, ${z}_{\\alpha/2}$ zenbakiaren ezkerrean $1-\\frac{\\alpha}{2}$ dago, eta hori da taulan bilatzen dena.', 'Como la campana es simétrica, en cada cola queda $\\frac{\\alpha}{2}$. Así que a la izquierda de ${z}_{\\alpha/2}$ hay $1-\\frac{\\alpha}{2}$, y eso es lo que se busca en la tabla.', 'لأن الجرس متماثل يبقى $\\frac{\\alpha}{2}$ في كل ذيل. فيكون يسار ${z}_{\\alpha/2}$ مقدار $1-\\frac{\\alpha}{2}$، وهذا ما نبحث عنه في الجدول.', 'As the bell is symmetric, each tail holds $\\frac{\\alpha}{2}$. So to the left of ${z}_{\\alpha/2}$ there is $1-\\frac{\\alpha}{2}$, and that is what you look up in the table.')
        }
    },
    'binomial-to-normal': {
        vocabulary: [say('hurbilketa', 'aproximación', 'التقريب', 'approximation'), say('baldintza', 'condición', 'الشرط', 'condition')],
        explanation: say(
            '$n$ handia denean, formula binomiala erabiltzea astuna da. Barren itxura kanpai bat da, batez bestekoa $np$ eta desbideratze tipikoa $\\sqrt{npq}$ dituena. Hurbilketa ona da $np$ eta $nq$ gutxienez 5 direnean; bestela, barrak alde batera makurtzen dira.',
            'Cuando $n$ es grande, usar la fórmula binomial es pesado. Las barras tienen forma de campana, de media $np$ y desviación típica $\\sqrt{npq}$. La aproximación es buena cuando $np$ y $nq$ son al menos 5; si no, las barras se tuercen hacia un lado.',
            'عندما يكون $n$ كبيرًا يصبح استعمال الصيغة الثنائية مرهقًا. وتأخذ الأعمدة شكل جرس متوسطه $np$ وانحرافه المعياري $\\sqrt{npq}$. ويكون التقريب جيدًا إذا كان $np$ و$nq$ على الأقل 5؛ وإلا مالت الأعمدة إلى جهة.',
            'When $n$ is large, using the binomial formula is heavy. The bars take the shape of a bell with mean $np$ and standard deviation $\\sqrt{npq}$. The approximation is good when $np$ and $nq$ are at least 5; otherwise the bars lean to one side.'
        ),
        examplePrompt: say('$X\\sim B(400;\\,0{,}1)$. Zein normalekin hurbiltzen da?', '$X\\sim B(400;\\,0{,}1)$. ¿Por qué normal se aproxima?', '$X\\sim B(400;\\,0{,}1)$. بأي توزيع طبيعي يُقرَّب؟', '$X\\sim B(400;\\,0{,}1)$. Which normal approximates it?'),
        example: same('$\\sigma=\\sqrt{400\\cdot 0{,}1\\cdot 0{,}9}=6\\ \\to\\ N(40;\\,6)$'),
        exampleAnswer: say('$np=40$ eta $nq=360$, biak 5 baino handiagoak.', '$np=40$ y $nq=360$, los dos mayores que 5.', '$np=40$ و$nq=360$، وكلاهما أكبر من 5.', '$np=40$ and $nq=360$, both greater than 5.')
    },
    continuity: {
        vocabulary: [say('barra', 'barra', 'العمود', 'bar'), say('zuzenketa', 'corrección', 'التصحيح', 'correction')],
        explanation: say(
            'Binomialak balio osoak hartzen ditu, eta bakoitza barra bat da, zabalera 1 duena, $k-0{,}5$ zenbakitik $k+0{,}5$ zenbakira. Normalarekin hurbiltzean, barra osoak sartu behar dira: muga puntu erdi mugitzen da, barra sartzeko edo uzteko.',
            'La binomial toma valores enteros, y cada uno es una barra de anchura 1, de $k-0{,}5$ a $k+0{,}5$. Al aproximar por la normal hay que meter las barras enteras: el extremo se mueve medio punto para incluir o dejar fuera la barra.',
            'يأخذ التوزيع الثنائي قيمًا صحيحة، وكل منها عمود عرضه 1 من $k-0{,}5$ إلى $k+0{,}5$. وعند التقريب بالطبيعي يجب إدخال الأعمدة كاملة: ينتقل الطرف نصف وحدة لإدخال العمود أو تركه.',
            'The binomial takes whole values, and each one is a bar of width 1, from $k-0{,}5$ to $k+0{,}5$. When approximating by the normal, the whole bars must go in: the end moves half a unit to include or leave out the bar.'
        ),
        examplePrompt: say('$B(100;\\,0{,}5)\\approx N(50;\\,5)$. Zenbat da $P(X\\le 53)$ gutxi gorabehera?', '$B(100;\\,0{,}5)\\approx N(50;\\,5)$. ¿Cuánto vale aproximadamente $P(X\\le 53)$?', '$B(100;\\,0{,}5)\\approx N(50;\\,5)$. كم يساوي $P(X\\le 53)$ تقريبًا؟', '$B(100;\\,0{,}5)\\approx N(50;\\,5)$. What is $P(X\\le 53)$ roughly?'),
        example: same('$P(Y\\le 53{,}5)=P(Z\\le 0{,}7)=0{,}758$'),
        exampleAnswer: say('53 barra sartzen da: 53,5 arte.', 'Entra la barra del 53: hasta 53,5.', 'يدخل عمود 53: حتى 53.5.', 'The bar of 53 goes in: up to 53.5.'),
        why: {
            text: say('Barra baten azalera haren erdiko balioaren probabilitatea da. Kanpaiak barra horren zabalera osoa estali behar du, beraz $k\\pm 0{,}5$ arteko azalera hartzen da.', 'El área de una barra es la probabilidad de su valor central. La campana debe cubrir todo el ancho de la barra, así que se toma el área entre $k\\pm 0{,}5$.', 'مساحة العمود هي احتمال قيمته الوسطى. ويجب أن يغطي الجرس عرض العمود كله، لذلك نأخذ المساحة بين $k\\pm 0{,}5$.', 'The area of a bar is the probability of its middle value. The bell must cover the whole width of the bar, so the area between $k\\pm 0{,}5$ is taken.')
        }
    }
}
