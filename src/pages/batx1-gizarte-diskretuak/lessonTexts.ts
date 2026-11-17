import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { DiscreteBatx1gTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Diskretuak · Batxilergoa 1 · Gizarte Zientziak — what each lesson tells:
   the new words (definitions), a short explanation, the example as an
   exercise («Another example»), the key words in four languages and, in
   some lessons, «Why does it work?». Plain data so the tests can import
   it; lessons.tsx merges it into the topics. The example uses numbers of
   its own, never those of «Let's solve», of «Check it» or of the mistake.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const discreteBatx1gLessonTexts: Record<DiscreteBatx1gTopicId, LessonTexts> = {
    /* ---------- 1. Before you start: compound probability ---------- */
    compound: {
        definitions: [
            { term: say('Itzulita ateratzea', 'Extracción con devolución', 'السحب مع الإرجاع', 'Drawing with replacement'), meaning: say('Ateratakoa itzuli egiten da hurrengoa atera aurretik: kutxa berdin geratzen da.', 'Lo sacado se devuelve antes de la siguiente extracción: la caja queda igual.', 'يُعاد المسحوب قبل السحبة التالية: يبقى الصندوق كما هو.', 'What is drawn goes back before the next draw: the box stays the same.') }
        ],
        vocabulary: [
            say('zuhaitza', 'árbol', 'الشجرة', 'tree'),
            say('independentea', 'independiente', 'مستقل', 'independent'),
            say('aurkakoa', 'contrario', 'المعاكس', 'complement')
        ],
        explanation: say(
            'Bi ateraldi daudenean, zuhaitz bat egiten da, eta adar baten probabilitateak biderkatzen dira. Bola itzultzen bada, bigarren ateraldiak lehenengoaren probabilitate berak ditu: independenteak dira. Itzultzen ez bada, bigarrena kutxan geratzen denarekin kalkulatzen da. Gutxienez bat behar denean, errazagoa da aurkakoa kalkulatzea.',
            'Con dos extracciones se hace un árbol y se multiplican las probabilidades de una rama. Si se devuelve la bola, la segunda extracción tiene las mismas probabilidades que la primera: son independientes. Si no se devuelve, la segunda se calcula con lo que queda en la caja. Cuando se pide «alguno», es más fácil calcular el contrario.',
            'مع سحبتين نرسم شجرة ونضرب احتمالات الفرع الواحد. إذا أُعيدت الكرة فللسحبة الثانية احتمالات الأولى نفسها: إنهما مستقلتان. وإذا لم تُعد فالثانية تُحسب بما بقي في الصندوق. وعندما يُطلب «واحد على الأقل» يكون حساب المعاكس أسهل.',
            'With two draws, draw a tree and multiply the probabilities along a branch. If the ball goes back, the second draw has the same probabilities as the first: they are independent. If it does not, the second is worked out with what is left in the box. When ‘at least one’ is asked for, the complement is easier.'
        ),
        examplePrompt: say('Hiru dado botatzen dira. Zein da sei bat ere ez ateratzeko probabilitatea?', 'Se lanzan tres dados. ¿Qué probabilidad hay de no sacar ningún seis?', 'تُرمى ثلاثة أحجار نرد. ما احتمال ألّا يظهر أي ستة؟', 'Three dice are rolled. What is the probability of not getting any six?'),
        example: same('$\\frac{5}{6}\\cdot\\frac{5}{6}\\cdot\\frac{5}{6}=\\frac{125}{216}$'),
        exampleAnswer: say('Eta gutxienez sei bat ateratzekoa, aurkakoa: $1-\\frac{125}{216}=\\frac{91}{216}$.', 'Y la de sacar algún seis, el contrario: $1-\\frac{125}{216}=\\frac{91}{216}$.', 'واحتمال ظهور ستة واحدة على الأقل هو المعاكس: $1-\\frac{125}{216}=\\frac{91}{216}$.', 'And that of getting some six, the complement: $1-\\frac{125}{216}=\\frac{91}{216}$.')
    },
    orders: {
        vocabulary: [
            say('ordena', 'orden', 'الترتيب', 'order'),
            say('zenbaki konbinatorioa', 'número combinatorio', 'العدد التوافقي', 'binomial coefficient'),
            say('aurpegia', 'cara', 'الوجه', 'heads')
        ],
        explanation: say(
            'Zehazki $k$ aurpegi ateratzeko modu asko daude, eta bakoitza ordena bat da. Txanpon zuzen batekin, ordena guztiek probabilitate bera dute. Beraz, nahikoa da ordena baten probabilitatea kalkulatzea eta ordena kopuruaz biderkatzea. Ordenak zenbatzeko, zein botalditan ateratzen den aurpegia aukeratzen da: zenbaki konbinatorio bat da.',
            'Hay muchas formas de sacar exactamente $k$ caras, y cada una es un orden. Con una moneda correcta, todos los órdenes tienen la misma probabilidad. Basta, pues, calcular la de un orden y multiplicarla por el número de órdenes. Para contarlos, se elige en qué lanzamientos sale cara: es un número combinatorio.',
            'هناك طرق كثيرة لظهور $k$ وجهًا بالضبط، وكل طريقة ترتيب. ومع قطعة نقود سليمة يكون لكل الترتيبات الاحتمال نفسه. فيكفي حساب احتمال ترتيب واحد وضربه في عدد الترتيبات. ولعدّها نختار الرميات التي يظهر فيها الوجه: إنه عدد توافقي.',
            'There are many ways of getting exactly $k$ heads, and each one is an order. With a fair coin, all the orders have the same probability. So it is enough to work out that of one order and multiply it by the number of orders. To count them, choose in which tosses heads comes up: it is a binomial coefficient.'
        ),
        examplePrompt: say('Hiru dado botatzen dira. Zein da zehazki bi sei ateratzeko probabilitatea?', 'Se lanzan tres dados. ¿Qué probabilidad hay de sacar exactamente dos seises?', 'تُرمى ثلاثة أحجار نرد. ما احتمال ظهور ستّتين بالضبط؟', 'Three dice are rolled. What is the probability of exactly two sixes?'),
        example: same('$\\binom{3}{2}\\cdot\\frac{5}{216}=\\frac{15}{216}=\\frac{5}{72}$'),
        exampleAnswer: say('Ordena bakoitzak (6, 6 eta beste bat, eta abar) $\\frac{1}{6}\\cdot\\frac{1}{6}\\cdot\\frac{5}{6}$ probabilitatea du.', 'Cada orden (6, 6 y otro, etc.) tiene probabilidad $\\frac{1}{6}\\cdot\\frac{1}{6}\\cdot\\frac{5}{6}$.', 'لكل ترتيب (6 و6 وعدد آخر، إلخ) احتمال $\\frac{1}{6}\\cdot\\frac{1}{6}\\cdot\\frac{5}{6}$.', 'Each order (6, 6 and another, and so on) has probability $\\frac{1}{6}\\cdot\\frac{1}{6}\\cdot\\frac{5}{6}$.')
    },

    /* ---------- 2. Discrete random variable ---------- */
    'random-variable': {
        definitions: [
            { term: say('Aldagai aleatorio diskretua', 'Variable aleatoria discreta', 'المتغير العشوائي المتقطع', 'Discrete random variable'), meaning: say('Esperimentu baten emaitza bakoitzari zenbaki bat lotzen dion araua, $x_i$ balio solteekin.', 'Regla que asocia un número a cada resultado de un experimento, con valores sueltos $x_i$.', 'قاعدة تربط عددًا بكل نتيجة من نتائج تجربة، بقيم منفصلة $x_i$.', 'A rule that attaches a number to each outcome of an experiment, with separate values $x_i$.') },
            { term: say('Probabilitate-banaketa', 'Distribución de probabilidad', 'التوزيع الاحتمالي', 'Probability distribution'), meaning: say('Aldagaiaren balioen eta haien $p_i$ probabilitateen taula.', 'La tabla de los valores de la variable y sus probabilidades $p_i$.', 'جدول قيم المتغير واحتمالاتها $p_i$.', 'The table of the values of the variable and their probabilities $p_i$.') }
        ],
        vocabulary: [
            say('maiztasun erlatiboa', 'frecuencia relativa', 'التكرار النسبي', 'relative frequency'),
            say('balioa', 'valor', 'القيمة', 'value')
        ],
        explanation: say(
            'Estatistikan, maiztasun-taulak gertatu dena kontatzen du. Probabilitatean, aldagai aleatorio batek gertatuko dena esaten du: emaitza bakoitzari zenbaki bat lotzen zaio, eta balio bakoitzari bere probabilitatea. Esperimentua asko errepikatzean, maiztasun erlatiboak probabilitate horietara hurbiltzen dira.',
            'En estadística, una tabla de frecuencias cuenta lo que ha pasado. En probabilidad, una variable aleatoria dice lo que pasará: a cada resultado se le asocia un número, y a cada valor, su probabilidad. Al repetir mucho el experimento, las frecuencias relativas se acercan a esas probabilidades.',
            'في الإحصاء يروي جدول التكرارات ما حدث. وفي الاحتمال يقول المتغير العشوائي ما سيحدث: نربط عددًا بكل نتيجة، واحتمالًا بكل قيمة. وعند تكرار التجربة كثيرًا تقترب التكرارات النسبية من تلك الاحتمالات.',
            'In statistics, a frequency table tells what has happened. In probability, a random variable tells what will happen: each outcome gets a number, and each value its probability. When the experiment is repeated a lot, the relative frequencies get close to those probabilities.'
        ),
        examplePrompt: say('Dado bat botatzen da. $X$ aldagaiak 1 balio du 5 edo 6 ateratzen bada, eta 0, bestela. Idatzi haren banaketa.', 'Se lanza un dado. $X$ vale 1 si sale 5 o 6, y 0 si no. Escribe su distribución.', 'يُرمى نرد. يأخذ $X$ القيمة 1 إذا ظهر 5 أو 6، و0 في غير ذلك. اكتب توزيعه.', 'A die is rolled. $X$ is 1 if a 5 or a 6 comes up, and 0 otherwise. Write its distribution.'),
        example: same('$P(X=1)=\\frac{2}{6}=\\frac{1}{3}\\qquad P(X=0)=\\frac{2}{3}$'),
        exampleAnswer: say('Bi probabilitateek 1 egiten dute batuta: $\\frac{1}{3}+\\frac{2}{3}=1$.', 'Las dos suman 1: $\\frac{1}{3}+\\frac{2}{3}=1$.', 'مجموع الاحتمالين 1: $\\frac{1}{3}+\\frac{2}{3}=1$.', 'The two add up to 1: $\\frac{1}{3}+\\frac{2}{3}=1$.')
    },
    'probability-table': {
        vocabulary: [
            say('batura', 'suma', 'المجموع', 'sum'),
            say('gertaera', 'suceso', 'الحدث', 'event'),
            say('negatiboa', 'negativa', 'سالب', 'negative')
        ],
        explanation: say(
            'Taula bat probabilitate-banaketa izateko, bi gauza bete behar ditu: $p_i$ probabilitate bakoitza 0 eta 1 artean egotea (bat ere ez negatiboa) eta guztien batura 1 izatea. Horregatik, bat falta bada, 1 ken besteen batura da. Gertaera baten probabilitatea haren balioen probabilitateak batuz lortzen da.',
            'Para que una tabla sea una distribución de probabilidad tiene que cumplir dos cosas: cada probabilidad $p_i$ está entre 0 y 1 (ninguna negativa) y la suma de todas es 1. Por eso, si falta una, es 1 menos la suma de las demás. La probabilidad de un suceso se obtiene sumando las de sus valores.',
            'لكي يكون الجدول توزيعًا احتماليًّا يجب أن يحقق أمرين: كل احتمال $p_i$ بين 0 و1 (لا شيء سالب)، ومجموع الكل 1. لذلك إذا نقص احتمال فهو 1 ناقص مجموع الباقي. ويُحسب احتمال حدث بجمع احتمالات قيمه.',
            'For a table to be a probability distribution, two things must hold: each probability $p_i$ is between 0 and 1 (none negative) and the sum of them all is 1. So, if one is missing, it is 1 minus the sum of the others. The probability of an event comes from adding those of its values.'
        ),
        examplePrompt: say('$X$ aldagaiak 1, 2 eta 3 balio ditu, 0,4; 0,25 eta $k$ probabilitateekin. Zenbat da $k$?', '$X$ vale 1, 2 o 3 con probabilidades 0,4; 0,25 y $k$. ¿Cuánto vale $k$?', 'يأخذ $X$ القيم 1 و2 و3 باحتمالات 0.4 و0.25 و$k$. كم يساوي $k$؟', '$X$ is 1, 2 or 3 with probabilities 0.4, 0.25 and $k$. What is $k$?'),
        example: same('$k=1-0{,}4-0{,}25=0{,}35$'),
        exampleAnswer: say('$k=0{,}35$ 0 eta 1 artean dago: taula ondo dago.', '$k=0{,}35$ está entre 0 y 1: la tabla está bien.', '$k=0{,}35$ بين 0 و1: الجدول صحيح.', '$k=0{,}35$ is between 0 and 1: the table is fine.')
    },
    'mean-sd': {
        vocabulary: [
            say('batez bestekoa', 'media', 'المتوسط', 'mean'),
            say('desbideratze tipikoa', 'desviación típica', 'الانحراف المعياري', 'standard deviation'),
            say('bariantza', 'varianza', 'التباين', 'variance')
        ],
        explanation: say(
            'Batez bestekoa maiztasun-taula batean bezala kalkulatzen da, maiztasun erlatiboen ordez probabilitateak jarrita: $\\mu=\\sum p_i\\,x_i$. Desbideratze tipikoa kalkulatzeko, $p_i\\,x_i^2$ zutabea gehitzen da, haren batura hartzen da, $\\mu^2$ kentzen zaio eta erroa egiten da.',
            'La media se calcula como en una tabla de frecuencias, poniendo probabilidades en lugar de frecuencias relativas: $\\mu=\\sum p_i\\,x_i$. Para la desviación típica se añade la columna $p_i\\,x_i^2$, se toma su suma, se le resta $\\mu^2$ y se hace la raíz.',
            'يُحسب المتوسط كما في جدول التكرارات، بوضع الاحتمالات مكان التكرارات النسبية: $\\mu=\\sum p_i\\,x_i$. وللانحراف المعياري نضيف العمود $p_i\\,x_i^2$، ونأخذ مجموعه، ونطرح منه $\\mu^2$، ثم نأخذ الجذر.',
            'The mean is worked out as in a frequency table, with probabilities instead of relative frequencies: $\\mu=\\sum p_i\\,x_i$. For the standard deviation, add the column $p_i\\,x_i^2$, take its sum, subtract $\\mu^2$ and take the root.'
        ),
        examplePrompt: say('$X$ aldagaiak 2 edo 6 balio du, bakoitza 0,5 probabilitatearekin. Zenbat dira $\\mu$ eta $\\sigma$?', '$X$ vale 2 o 6, cada uno con probabilidad 0,5. ¿Cuánto valen $\\mu$ y $\\sigma$?', 'يأخذ $X$ القيمة 2 أو 6، كلًّا منهما باحتمال 0.5. كم يساوي $\\mu$ و$\\sigma$؟', '$X$ is 2 or 6, each with probability 0.5. What are $\\mu$ and $\\sigma$?'),
        example: same('$\\mu=2\\cdot 0{,}5+6\\cdot 0{,}5=4$'),
        exampleAnswer: say('$\\sum p_i\\,x_i^2=2+18=20$ da; beraz, $\\sigma=\\sqrt{20-4^2}=2$.', 'Y $\\sum p_i\\,x_i^2=2+18=20$; por tanto, $\\sigma=\\sqrt{20-4^2}=2$.', 'و$\\sum p_i\\,x_i^2=2+18=20$؛ إذن $\\sigma=\\sqrt{20-4^2}=2$.', 'And $\\sum p_i\\,x_i^2=2+18=20$; so $\\sigma=\\sqrt{20-4^2}=2$.'),
        why: {
            text: say('Zergatik kentzen da $\\mu^2$? Bariantza $(x_i-\\mu)^2$ distantzien batez bestekoa da; karratua garatuz, $\\sum p_i\\,x_i^2-2\\mu\\cdot\\mu+\\mu^2$ ateratzen da, hau da, $\\sum p_i\\,x_i^2-\\mu^2$.', '¿Por qué se resta $\\mu^2$? La varianza es la media de las distancias $(x_i-\\mu)^2$; al desarrollar el cuadrado sale $\\sum p_i\\,x_i^2-2\\mu\\cdot\\mu+\\mu^2$, es decir, $\\sum p_i\\,x_i^2-\\mu^2$.', 'لماذا نطرح $\\mu^2$؟ التباين متوسط المسافات $(x_i-\\mu)^2$؛ وبنشر المربع نحصل على $\\sum p_i\\,x_i^2-2\\mu\\cdot\\mu+\\mu^2$، أي $\\sum p_i\\,x_i^2-\\mu^2$.', 'Why subtract $\\mu^2$? The variance is the mean of the distances $(x_i-\\mu)^2$; expanding the square gives $\\sum p_i\\,x_i^2-2\\mu\\cdot\\mu+\\mu^2$, that is, $\\sum p_i\\,x_i^2-\\mu^2$.')
        }
    },
    'expected-gain': {
        definitions: [
            { term: say('Joko bidezkoa', 'Juego justo', 'اللعبة العادلة', 'Fair game'), meaning: say('Batez besteko irabazia 0 duen jokoa: luzera, ez da irabazten ez galtzen.', 'Juego con ganancia media 0: a la larga, ni se gana ni se pierde.', 'لعبة ربحها المتوسط 0: على المدى الطويل لا ربح ولا خسارة.', 'A game with mean gain 0: in the long run, you neither win nor lose.') }
        ],
        vocabulary: [
            say('irabazia', 'ganancia', 'الربح', 'gain'),
            say('saria', 'premio', 'الجائزة', 'prize'),
            say('prezioa', 'precio', 'الثمن', 'price')
        ],
        explanation: say(
            'Zozketa batean, $X$ = «saria» aldagai aleatorio bat da: sari bakoitzak bere probabilitatea du, eta gehienetan saria 0 da. Haren batez bestekoa $\\mu$ da, batez beste txartel bakoitzak ematen duena. Batez besteko irabazia lortzeko, prezioa kentzen zaio.',
            'En una rifa, $X$ = «premio» es una variable aleatoria: cada premio tiene su probabilidad, y casi siempre el premio es 0. Su media $\\mu$ es lo que da cada boleto por término medio. Para la ganancia media se le resta el precio.',
            'في اليانصيب، $X$ = «الجائزة» متغير عشوائي: لكل جائزة احتمالها، وفي أغلب الأحيان تكون الجائزة 0. ومتوسطه $\\mu$ هو ما تعطيه كل بطاقة في المتوسط. وللربح المتوسط نطرح منه الثمن.',
            'In a raffle, $X$ = «prize» is a random variable: each prize has its probability, and nearly always the prize is 0. Its mean $\\mu$ is what each ticket gives on average. For the mean gain, subtract the price.'
        ),
        examplePrompt: say('Jokatzeak euro 1 balio du. Dado bat botatzen da, eta 6 ateratzen bada, 5 € ematen dizkizute. Zein da batez besteko irabazia?', 'Jugar cuesta 1 €. Se lanza un dado y, si sale 6, te dan 5 €. ¿Cuál es la ganancia media?', 'يكلّف اللعب 1 €. يُرمى نرد، وإذا ظهر 6 تأخذ 5 €. ما الربح المتوسط؟', 'Playing costs €1. A die is rolled and, if a 6 comes up, you get €5. What is the mean gain?'),
        example: same('$5\\cdot\\frac{1}{6}-1=-\\frac{1}{6}$'),
        exampleAnswer: say('Jokalariak 17 zentimo inguru galtzen ditu batez beste: jokoa kontrakoa da.', 'El jugador pierde unos 17 céntimos de media: el juego es desfavorable.', 'يخسر اللاعب نحو 17 سنتًا في المتوسط: اللعبة ضده.', 'The player loses about 17 cents on average: the game is unfavourable.')
    },

    /* ---------- 3. The binomial distribution ---------- */
    galton: {
        definitions: [
            { term: say('Galtonen tresna', 'Aparato de Galton', 'جهاز غالتون', 'Galton board'), meaning: say('Iltze-errenkadak dituen taula: bola bakoitza iltze bakoitzean eskuinera edo ezkerrera doa, eta behean kutxatila batera erortzen da.', 'Tablero con filas de clavos: cada bola va a la derecha o a la izquierda en cada clavo y cae abajo en una casilla.', 'لوح بصفوف من المسامير: تتجه كل كرة يمينًا أو يسارًا عند كل مسمار وتسقط في خانة في الأسفل.', 'A board with rows of pins: each ball goes right or left at each pin and falls into a bin at the bottom.') }
        ],
        vocabulary: [
            say('kutxatila', 'casilla', 'الخانة', 'bin'),
            say('bidea', 'camino', 'المسار', 'path'),
            say('erdia', 'centro', 'الوسط', 'middle')
        ],
        explanation: say(
            'Bolaren bidea txanpon-jaurtiketa sorta bat bezalakoa da: iltze bakoitzean, eskuinera edo ezkerrera. Erortzen den kutxatila eskuinera egindako jauzi kopuruaren araberakoa da bakarrik, ez ordenaren araberakoa. Erdiko kutxatiletara bide asko iristen dira, eta muturretara bakarra; horregatik dago jende gehiago erdian.',
            'El camino de la bola es como una serie de lanzamientos de moneda: en cada clavo, derecha o izquierda. La casilla donde cae solo depende del número de saltos a la derecha, no del orden. A las casillas centrales llegan muchos caminos y a los extremos uno solo; por eso el centro se llena más.',
            'مسار الكرة مثل سلسلة من رميات قطعة نقود: عند كل مسمار يمين أو يسار. والخانة التي تسقط فيها لا تتوقف إلا على عدد القفزات إلى اليمين لا على الترتيب. وتصل إلى الخانات الوسطى مسارات كثيرة وإلى الطرفين مسار واحد؛ لذلك يمتلئ الوسط أكثر.',
            'The path of the ball is like a series of coin tosses: at each pin, right or left. The bin where it lands only depends on the number of jumps to the right, not on the order. Many paths reach the middle bins and only one reaches each end; that is why the middle fills up more.'
        ),
        examplePrompt: say('Galtonen tresna batek 3 iltze-errenkada ditu. Zein da bola 1. kutxatilara erortzeko probabilitatea?', 'Un aparato de Galton tiene 3 filas de clavos. ¿Qué probabilidad hay de que la bola caiga en la casilla 1?', 'لجهاز غالتون 3 صفوف من المسامير. ما احتمال سقوط الكرة في الخانة 1؟', 'A Galton board has 3 rows of pins. What is the probability that the ball lands in bin 1?'),
        example: same('$\\binom{3}{1}\\cdot\\frac{1}{8}=\\frac{3}{8}$'),
        exampleAnswer: say('3 bide iristen dira hara (EEZ, EZE, ZEE), 8 bidetik.', 'Llegan 3 caminos (DII, IDI, IID) de los 8.', 'تصل إليها 3 مسارات من 8.', '3 paths get there (RLL, LRL, LLR) out of 8.'),
        why: {
            text: say('Zergatik Tartaglia? $k$ kutxatilara iristeko, azken iltzetik lehen ezkerreko edo eskuineko kutxatilatik etorri behar da: bide kopurua goiko bi zenbakien batura da, Tartagliaren triangeluan bezala.', '¿Por qué Tartaglia? Para llegar a la casilla $k$ hay que venir del clavo de la izquierda o de la derecha de la fila anterior: los caminos son la suma de los dos números de encima, como en el triángulo de Tartaglia.', 'لماذا تارتاليا؟ للوصول إلى الخانة $k$ يجب المجيء من المسمار الأيسر أو الأيمن في الصف السابق: عدد المسارات مجموع العددين فوقه، كما في مثلث تارتاليا.', 'Why Tartaglia? To reach bin $k$ you must come from the pin on the left or on the right in the row above: the paths are the sum of the two numbers above, as in Tartaglia\'s triangle.')
        }
    },
    'is-binomial': {
        definitions: [
            { term: say('Banaketa binomiala', 'Distribución binomial', 'التوزيع الثنائي', 'Binomial distribution'), meaning: say('$n$ proba berdin eta independentetako arrakasta kopuruaren banaketa, arrakastaren $p$ probabilitatea beti bera dela.', 'La del número de éxitos en $n$ pruebas iguales e independientes, con la misma probabilidad de éxito $p$.', 'توزيع عدد النجاحات في $n$ محاولة متماثلة ومستقلة، باحتمال النجاح $p$ نفسه.', 'That of the number of successes in $n$ equal, independent trials, with the same probability of success $p$.') }
        ],
        vocabulary: [
            say('arrakasta', 'éxito', 'النجاح', 'success'),
            say('proba', 'prueba', 'المحاولة', 'trial'),
            say('parametroak', 'parámetros', 'الوسيطان', 'parameters')
        ],
        explanation: say(
            'Binomiala da gauza bera $n$ aldiz errepikatzen denean eta, aldi bakoitzean, zerbait gertatzen den (arrakasta) ala ez begiratzen denean. Arrakastaren $p$ probabilitateak berdin iraun behar du, eta probek ez dute elkarren eraginik izan behar. Bere parametroak $n$ eta $p$ dira: $B(n;\\,p)$.',
            'Es binomial cuando se repite $n$ veces lo mismo y cada vez se mira si pasa algo (éxito) o no. La probabilidad de éxito $p$ tiene que mantenerse y las pruebas no pueden influirse entre sí. Sus parámetros son $n$ y $p$: $B(n;\\,p)$.',
            'يكون ثنائيًّا عندما يتكرر الشيء نفسه $n$ مرة ونرى في كل مرة هل يحدث أمر ما (نجاح) أم لا. ويجب أن يبقى احتمال النجاح $p$ ثابتًا، وألّا تؤثر المحاولات بعضها في بعض. ووسيطاه $n$ و$p$: $B(n;\\,p)$.',
            'It is binomial when the same thing is repeated $n$ times and each time you look at whether something happens (success) or not. The probability of success $p$ must stay the same and the trials must not affect one another. Its parameters are $n$ and $p$: $B(n;\\,p)$.'
        ),
        examplePrompt: say('Dado bat 12 aldiz botatzen da, eta $X$ = «bost kopurua». Zein binomial da?', 'Se lanza un dado 12 veces y $X$ = «número de cincos». ¿Qué binomial es?', 'يُرمى نرد 12 مرة و$X$ = «عدد مرات ظهور 5». أي توزيع ثنائي هو؟', 'A die is rolled 12 times and $X$ = «number of fives». Which binomial is it?'),
        example: same('$X\\sim B\\left(12;\\,\\frac{1}{6}\\right)$'),
        exampleAnswer: say('12 jaurtiketa berdin eta independente, bi emaitzarekin: bosta ala ez.', '12 tiradas iguales e independientes, con dos resultados: cinco o no.', '12 رمية متماثلة ومستقلة بنتيجتين: خمسة أو لا.', '12 equal, independent rolls with two outcomes: five or not.')
    },
    'binomial-formula': {
        vocabulary: [
            say('porrota', 'fracaso', 'الفشل', 'failure'),
            say('formula', 'fórmula', 'الصيغة', 'formula'),
            say('ordena', 'orden', 'الترتيب', 'order')
        ],
        explanation: say(
            'Zehazki $k$ arrakasta lortzeko, ordena bakoitzak $k$ arrakasta ditu, $p$ probabilitatearekin, eta $n-k$ porrot, $q$ probabilitatearekin: $p^k\\,q^{n-k}$. Ordena horiek $\\binom{n}{k}$ dira. Formula hau da, beraz, ordena kopurua bider ordena baten probabilitatea.',
            'Para sacar exactamente $k$ éxitos, cada orden tiene $k$ éxitos con probabilidad $p$ y $n-k$ fracasos con probabilidad $q$: $p^k\\,q^{n-k}$. Esos órdenes son $\\binom{n}{k}$. La fórmula es, pues, el número de órdenes por la probabilidad de uno.',
            'للحصول على $k$ نجاحًا بالضبط، في كل ترتيب $k$ نجاحًا باحتمال $p$ و$n-k$ فشلًا باحتمال $q$: $p^k\\,q^{n-k}$. وعدد هذه الترتيبات $\\binom{n}{k}$. فالصيغة إذن عدد الترتيبات في احتمال ترتيب واحد.',
            'To get exactly $k$ successes, each order has $k$ successes with probability $p$ and $n-k$ failures with probability $q$: $p^k\\,q^{n-k}$. There are $\\binom{n}{k}$ such orders. So the formula is the number of orders times the probability of one.'
        ),
        examplePrompt: say('$X\\sim B(4;\\,0{,}5)$ bada, zenbat da $P(X=1)$?', 'Si $X\\sim B(4;\\,0{,}5)$, ¿cuánto vale $P(X=1)$?', 'إذا كان $X\\sim B(4;\\,0{,}5)$، فكم يساوي $P(X=1)$؟', 'If $X\\sim B(4;\\,0{,}5)$, what is $P(X=1)$?'),
        example: same('$\\binom{4}{1}\\cdot 0{,}5\\cdot 0{,}5^3=\\frac{4}{16}=0{,}25$'),
        exampleAnswer: say('4 ordena daude, bakoitza $\\frac{1}{16}$ probabilitatearekin.', 'Hay 4 órdenes, cada uno con probabilidad $\\frac{1}{16}$.', 'هناك 4 ترتيبات، احتمال كل منها $\\frac{1}{16}$.', 'There are 4 orders, each with probability $\\frac{1}{16}$.')
    },
    'binomial-events': {
        vocabulary: [
            say('gutxienez', 'al menos', 'على الأقل', 'at least'),
            say('gehienez', 'como mucho', 'على الأكثر', 'at most'),
            say('aurkakoa', 'contrario', 'المعاكس', 'complement')
        ],
        explanation: say(
            'Enuntziatuek hitzak erabiltzen dituzte: «gutxienez», «baino gehiago», «gehienez», «bat ere ez». Lehenik, hitza ikur bihurtu behar da, eta mugako balioa sartzen den ala ez begiratu. Gero, batu egiten dira balio horien probabilitateak. Gai asko badira, aurkakoa kalkulatu eta 1 zenbakitik kendu.',
            'Los enunciados usan palabras: «al menos», «más de», «como mucho», «ninguno». Primero hay que pasar la palabra a símbolo y mirar si el valor del borde entra o no. Después se suman las probabilidades de esos valores. Si son muchos términos, calcula el contrario y réstalo de 1.',
            'تستعمل نصوص المسائل كلمات: «على الأقل» و«أكثر من» و«على الأكثر» و«لا شيء». أولًا نحوّل الكلمة إلى رمز وننظر هل تدخل القيمة الحدّية أم لا. ثم نجمع احتمالات تلك القيم. وإذا كثرت الحدود فاحسب المعاكس واطرحه من 1.',
            'Problems use words: ‘at least’, ‘more than’, ‘at most’, ‘none’. First turn the word into a symbol and check whether the boundary value is included. Then add the probabilities of those values. If there are many terms, work out the complement and subtract it from 1.'
        ),
        examplePrompt: say('$X\\sim B(10;\\,0{,}5)$ bada, zenbat da $P(X\\ge 1)$?', 'Si $X\\sim B(10;\\,0{,}5)$, ¿cuánto vale $P(X\\ge 1)$?', 'إذا كان $X\\sim B(10;\\,0{,}5)$، فكم يساوي $P(X\\ge 1)$؟', 'If $X\\sim B(10;\\,0{,}5)$, what is $P(X\\ge 1)$?'),
        example: same('$1-0{,}5^{10}=1-\\frac{1}{1024}=\\frac{1023}{1024}$'),
        exampleAnswer: say('Hamar gai batu ordez, bakarra kalkulatzen da: $P(X=0)$.', 'En lugar de sumar diez términos, se calcula uno solo: $P(X=0)$.', 'بدل جمع عشرة حدود نحسب حدًّا واحدًا: $P(X=0)$.', 'Instead of adding ten terms, just one is worked out: $P(X=0)$.')
    },
    'binomial-parameters': {
        definitions: [
            { term: say('Aldakuntza-koefizientea', 'Coeficiente de variación', 'معامل الاختلاف', 'Coefficient of variation'), meaning: say('$CV=\\frac{\\sigma}{\\mu}$: desbideratze tipikoa batez bestekoarekiko; batez besteko desberdinak dituzten banaketak alderatzeko balio du.', '$CV=\\frac{\\sigma}{\\mu}$: la desviación típica respecto de la media; sirve para comparar distribuciones de medias distintas.', '$CV=\\frac{\\sigma}{\\mu}$: الانحراف المعياري بالنسبة إلى المتوسط؛ يفيد في مقارنة توزيعات متوسطاتها مختلفة.', '$CV=\\frac{\\sigma}{\\mu}$: the standard deviation relative to the mean; it compares distributions with different means.') }
        ],
        vocabulary: [
            say('sakabanatzea', 'dispersión', 'التشتت', 'spread'),
            say('batez bestekoa', 'media', 'المتوسط', 'mean')
        ],
        explanation: say(
            'Binomial batean ez da taularik behar: batez bestekoa $np$ da, txanpona 100 aldiz botatzean 50 aurpegi espero diren bezala, eta bariantza $npq$. Bi banaketaren sakabanatzea alderatzeko, $\\sigma$ bakarrik begiratzea ez da nahikoa batez bestekoak desberdinak badira: aldakuntza-koefizientea erabiltzen da.',
            'En una binomial no hace falta la tabla: la media es $np$, como se esperan 50 caras al lanzar 100 veces una moneda, y la varianza es $npq$. Para comparar la dispersión de dos distribuciones, mirar solo $\\sigma$ no basta si las medias son distintas: se usa el coeficiente de variación.',
            'في التوزيع الثنائي لا حاجة إلى الجدول: المتوسط $np$، كما يُتوقع 50 وجهًا عند رمي قطعة نقود 100 مرة، والتباين $npq$. ولمقارنة تشتت توزيعين لا يكفي النظر إلى $\\sigma$ وحده إذا اختلف المتوسطان: يُستعمل معامل الاختلاف.',
            'In a binomial the table is not needed: the mean is $np$, just as 50 heads are expected when a coin is tossed 100 times, and the variance is $npq$. To compare the spread of two distributions, looking only at $\\sigma$ is not enough if the means differ: use the coefficient of variation.'
        ),
        examplePrompt: say('$X\\sim B(50;\\,0{,}1)$ bada, zenbat dira $\\mu$ eta $\\sigma$?', 'Si $X\\sim B(50;\\,0{,}1)$, ¿cuánto valen $\\mu$ y $\\sigma$?', 'إذا كان $X\\sim B(50;\\,0{,}1)$، فكم يساوي $\\mu$ و$\\sigma$؟', 'If $X\\sim B(50;\\,0{,}1)$, what are $\\mu$ and $\\sigma$?'),
        example: same('$\\mu=5\\qquad\\sigma=\\sqrt{50\\cdot 0{,}1\\cdot 0{,}9}=\\sqrt{4{,}5}\\approx 2{,}12$'),
        exampleAnswer: say('Aldakuntza-koefizientea $\\frac{2{,}12}{5}\\approx 0{,}42$ da.', 'El coeficiente de variación es $\\frac{2{,}12}{5}\\approx 0{,}42$.', 'معامل الاختلاف $\\frac{2{,}12}{5}\\approx 0{,}42$.', 'The coefficient of variation is $\\frac{2{,}12}{5}\\approx 0{,}42$.'),
        why: {
            text: say('Zergatik $np$? Proba bakoitzak batez beste $p$ arrakasta ematen ditu (1 bider $p$ gehi 0 bider $q$), eta $n$ proba daude: $n\\cdot p$.', '¿Por qué $np$? Cada prueba da de media $p$ éxitos (1 por $p$ más 0 por $q$), y hay $n$ pruebas: $n\\cdot p$.', 'لماذا $np$؟ كل محاولة تعطي في المتوسط $p$ نجاحًا (1 في $p$ زائد 0 في $q$)، وهناك $n$ محاولة: $n\\cdot p$.', 'Why $np$? Each trial gives $p$ successes on average (1 times $p$ plus 0 times $q$), and there are $n$ trials: $n\\cdot p$.')
        }
    },

    /* ---------- 4. Fitting data to a binomial ---------- */
    'fit-p': {
        definitions: [
            { term: say('Doikuntza', 'Ajuste', 'المطابقة', 'Fit'), meaning: say('Datu errealak eredu batekin (hemen, binomial batekin) alderatzea, eredu hori balio duen ikusteko.', 'Comparar unos datos reales con un modelo (aquí, una binomial) para ver si el modelo sirve.', 'مقارنة بيانات حقيقية بنموذج (هنا توزيع ثنائي) لمعرفة ما إذا كان النموذج صالحًا.', 'Comparing real data with a model (here, a binomial) to see whether the model works.') }
        ],
        vocabulary: [
            say('maiztasuna', 'frecuencia', 'التكرار', 'frequency'),
            say('batez bestekoa', 'media', 'المتوسط', 'mean'),
            say('eredua', 'modelo', 'النموذج', 'model')
        ],
        explanation: say(
            'Batzuetan datu errealak ditugu, eta binomial bat eredu ona den jakin nahi dugu. $n$ ezaguna da, datu bakoitzeko proba kopurua baita, baina $p$ ez. Binomial batean $\\mu=np$ denez, datuen $\\bar{x}$ batez bestekoa hartzen da $\\mu$ gisa, eta $p$ askatzen da.',
            'A veces tenemos datos reales y queremos saber si una binomial es un buen modelo. $n$ se conoce, porque es el número de pruebas de cada dato, pero $p$ no. Como en una binomial $\\mu=np$, se toma la media $\\bar{x}$ de los datos como $\\mu$ y se despeja $p$.',
            'أحيانًا تكون لدينا بيانات حقيقية ونريد معرفة ما إذا كان التوزيع الثنائي نموذجًا جيدًا. نعرف $n$ لأنه عدد المحاولات في كل معطى، أما $p$ فلا. وبما أن $\\mu=np$ في التوزيع الثنائي، نأخذ متوسط البيانات $\\bar{x}$ مكان $\\mu$ ونستخرج $p$.',
            'Sometimes we have real data and want to know whether a binomial is a good model. $n$ is known, because it is the number of trials in each datum, but $p$ is not. Since $\\mu=np$ in a binomial, the mean $\\bar{x}$ of the data is taken as $\\mu$ and $p$ is solved for.'
        ),
        examplePrompt: say('4 piezako 50 kutxatan, akastunen batez bestekoa 0,8 da. Zein $p$ hartzen da?', 'En 50 cajas de 4 piezas, la media de defectuosas es 0,8. ¿Qué $p$ se toma?', 'في 50 صندوقًا من 4 قطع، متوسط القطع المعيبة 0.8. ما $p$ المأخوذ؟', 'In 50 boxes of 4 parts, the mean number of faulty ones is 0.8. What $p$ is taken?'),
        example: same('$p=\\frac{0{,}8}{4}=0{,}2$'),
        exampleAnswer: say('Datuak $B(4;\\,0{,}2)$ banaketarekin alderatuko dira.', 'Los datos se compararán con una $B(4;\\,0{,}2)$.', 'ستُقارن البيانات بـ $B(4;\\,0{,}2)$.', 'The data will be compared with a $B(4;\\,0{,}2)$.')
    },
    'expected-values': {
        vocabulary: [
            say('behatua', 'observado', 'المشاهَد', 'observed'),
            say('itxarona', 'esperado', 'المتوقع', 'expected'),
            say('probabilitatea', 'probabilidad', 'الاحتمال', 'probability')
        ],
        explanation: say(
            '$p$ ezagututa, binomialaren $P(X=k)$ probabilitateak kalkulatzen dira. Probabilitate bakoitza datu kopuruaz biderkatuta, eredua egia balitz $k$ balio bakoitza zenbat aldiz agertuko litzatekeen lortzen da: hori da balio itxarona. Gero, ondoz ondo jartzen dira behatuak eta itxaronak.',
            'Conocida $p$, se calculan las probabilidades $P(X=k)$ de la binomial. Multiplicando cada probabilidad por el número de datos se obtiene cuántas veces saldría cada valor $k$ si el modelo fuera cierto: es el valor esperado. Después se ponen al lado los observados y los esperados.',
            'بعد معرفة $p$ نحسب احتمالات التوزيع الثنائي $P(X=k)$. وبضرب كل احتمال في عدد المعطيات نحصل على عدد مرات ظهور كل قيمة $k$ لو كان النموذج صحيحًا: هذه هي القيمة المتوقعة. ثم نضع المشاهَدة والمتوقعة جنبًا إلى جنب.',
            'Once $p$ is known, work out the probabilities $P(X=k)$ of the binomial. Multiplying each probability by the number of data gives how many times each value $k$ would come up if the model were true: that is the expected value. Then put the observed and the expected side by side.'
        ),
        examplePrompt: say('200 datu $B(2;\\,0{,}5)$ banaketarekin alderatzen dira. Zein dira balio itxaronak?', 'Se comparan 200 datos con una $B(2;\\,0{,}5)$. ¿Cuáles son los valores esperados?', 'تُقارن 200 معطى بـ $B(2;\\,0{,}5)$. ما القيم المتوقعة؟', '200 data are compared with a $B(2;\\,0{,}5)$. What are the expected values?'),
        example: same('$200\\cdot\\frac{1}{4}=50\\qquad 200\\cdot\\frac{2}{4}=100$'),
        exampleAnswer: say('50, 100 eta 50 dira, 0, 1 eta 2 balioentzat.', 'Son 50, 100 y 50, para 0, 1 y 2.', 'إنها 50 و100 و50 للقيم 0 و1 و2.', 'They are 50, 100 and 50, for 0, 1 and 2.')
    },
    'good-fit': {
        vocabulary: [
            say('diferentzia', 'diferencia', 'الفرق', 'difference'),
            say('balio absolutua', 'valor absoluto', 'القيمة المطلقة', 'absolute value'),
            say('ehunekoa', 'porcentaje', 'النسبة المئوية', 'percentage')
        ],
        explanation: say(
            'Datuak zoriz ateratzen direnez, behatuak ez dira inoiz itxaronak bezalakoak izango: diferentzia txikiak normalak dira. Diferentzia bakoitzaren balio absolutua hartzen da, eta handiena guztizkoarekin alderatzen da, ehuneko gisa. Ehuneko txikia bada, eredua ona da; handia bada, datuek ez diote binomial horri jarraitzen.',
            'Como los datos salen al azar, los observados nunca serán iguales que los esperados: las diferencias pequeñas son normales. Se toma el valor absoluto de cada diferencia y la mayor se compara con el total, como porcentaje. Si el porcentaje es pequeño, el modelo es bueno; si es grande, los datos no siguen esa binomial.',
            'بما أن البيانات تأتي بالصدفة فلن تساوي المشاهَدةُ المتوقعةَ أبدًا: الفروق الصغيرة طبيعية. نأخذ القيمة المطلقة لكل فرق ونقارن أكبرها بالكل كنسبة مئوية. إذا كانت النسبة صغيرة فالنموذج جيد، وإذا كانت كبيرة فالبيانات لا تتبع ذلك التوزيع الثنائي.',
            'Since the data come out by chance, the observed values will never equal the expected ones: small differences are normal. Take the absolute value of each difference and compare the largest with the total, as a percentage. If the percentage is small, the model is good; if it is large, the data do not follow that binomial.'
        ),
        examplePrompt: say('100 datutan, diferentziarik handiena 12 da. Doikuntza onartzen da?', 'En 100 datos, la mayor diferencia es 12. ¿Se acepta el ajuste?', 'في 100 معطى أكبر فرق 12. هل تُقبل المطابقة؟', 'In 100 data, the largest difference is 12. Is the fit accepted?'),
        example: same('$\\frac{12}{100}=0{,}12$'),
        exampleAnswer: say('% 12 da, % 5 baino askoz gehiago: doikuntza ez da onartzen.', 'Es el 12 %, mucho más del 5 %: el ajuste se rechaza.', 'إنه 12٪، أكثر بكثير من 5٪: تُرفض المطابقة.', 'It is 12%, far more than 5%: the fit is rejected.')
    }
}
