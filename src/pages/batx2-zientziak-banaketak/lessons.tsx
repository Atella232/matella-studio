import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { BarsBellFigure, BusFigure, DieGameFigure, FamiliesFigure, FreeThrowsFigure, HalfStepFigure, HeightsFigure, PhonesFigure, PositionsFigure, PrizesFigure, TableFigure, ThreeCoinsFigure, TopTenFigure, TrialsFigure, WaitingFigure } from './figures'
import { distributionsBatx2LessonChecks, type DistributionsBatx2TopicId } from './lessonChecks'
import { distributionsBatx2LessonTexts } from './lessonTexts'

/* ==========================================================================
   Banaketak · Batxilergoa 2 · Zientziak — stages and lessons. The scope
   follows unit 14 of Santillana 2.º Bachillerato Ciencias and unit 14 of
   Anaya Matemáticas II, with the style of the problems of the Basque
   university entrance exam. The first stage is a short review (binomial
   coefficients of 4. DBH, mean and standard deviation of 1.º) with
   «Review first» links; the other four are new in 2.º: discrete random
   variables, the binomial, continuous variables and the normal with its
   table, and the normal approximation of the binomial. Every table value
   comes from normal.ts, computed, never copied from a book. All the
   exercises and numbers are our own. Notation: B(n; p), N(μ; σ), P(Z ≤ k).
   ========================================================================== */

export type DistributionsBatx2StageId = 'review' | 'discrete' | 'binomial' | 'normal' | 'approximation'

export const distributionsBatx2Stages: UnitStage[] = [
    { id: 'review', tone: 'blue', title: { eu: 'Hasi aurretik: errepasoa', es: 'Antes de empezar: repaso', en: 'Before you start: review', ar: 'قبل أن تبدأ: مراجعة' } },
    { id: 'discrete', tone: 'violet', title: { eu: 'Aldagai aleatorio diskretuak', es: 'Variables aleatorias discretas', en: 'Discrete random variables', ar: 'المتغيرات العشوائية المتقطعة' } },
    { id: 'binomial', tone: 'mustard', title: { eu: 'Banaketa binomiala', es: 'La distribución binomial', en: 'The binomial distribution', ar: 'التوزيع الثنائي' } },
    { id: 'normal', tone: 'coral', title: { eu: 'Aldagai jarraituak eta banaketa normala', es: 'Variables continuas y distribución normal', en: 'Continuous variables and the normal distribution', ar: 'المتغيرات المتصلة والتوزيع الطبيعي' } },
    { id: 'approximation', tone: 'green', title: { eu: 'Binomiala normalarekin hurbiltzea', es: 'Aproximar la binomial por la normal', en: 'Approximating the binomial by the normal', ar: 'تقريب التوزيع الثنائي بالطبيعي' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** «Review first»: lessons of earlier units that the new ones build on */
const need = {
    binomial: { unit: 'dbh4-akademikoak/combinatoria', topic: 'binomial', title: { eu: 'Zenbaki konbinatorioak', es: 'Números combinatorios', en: 'Binomial coefficients', ar: 'الأعداد التوافقية' } },
    pascal: { unit: 'dbh4-akademikoak/combinatoria', topic: 'pascal', title: { eu: 'Tartagliaren triangelua', es: 'El triángulo de Tartaglia', en: 'Tartaglia\'s triangle', ar: 'مثلث تارتاليا' } },
    fairGames: { unit: 'dbh4-akademikoak/probabilidad', topic: 'fair-games', title: { eu: 'Itxaropena eta joko bidezkoak', es: 'Esperanza y juegos equitativos', en: 'Expected value and fair games', ar: 'الأمل الرياضي والألعاب العادلة' } },
    independent: { unit: 'dbh4-akademikoak/probabilidad', topic: 'independent', title: { eu: 'Esperientzia independenteak', es: 'Experiencias independientes', en: 'Independent experiments', ar: 'التجارب المستقلة' } },
    varianceSd: { unit: 'batx1-zientziak/estadistica', topic: 'variance-sd', title: { eu: 'Bariantzaren formula praktikoa', es: 'La fórmula práctica de la varianza', en: 'The working formula for the variance', ar: 'الصيغة العملية للتباين' } },
    standardScores: { unit: 'batx1-zientziak/estadistica', topic: 'standard-scores', title: { eu: 'Puntuazio tipikoak', es: 'Puntuaciones típicas', en: 'Standard scores', ar: 'الدرجات المعيارية' } },
    independence: { unit: 'batx2-zientziak/probabilidad', topic: 'independence', title: { eu: 'Gertaera independenteak', es: 'Sucesos independientes', en: 'Independent events', ar: 'الأحداث المستقلة' } },
    productRule: { unit: 'batx2-zientziak/probabilidad', topic: 'product-rule', title: { eu: 'Biderkaduraren erregela', es: 'La regla del producto', en: 'The multiplication rule', ar: 'قاعدة الضرب' } }
}

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Before you start: review ---------- */
    {
        id: 'review-combinatorial',
        stage: 'review',
        title: say('Zenbaki konbinatorioak: errepasoa', 'Números combinatorios: repaso', 'الأعداد التوافقية: مراجعة', 'Binomial coefficients: a review'),
        goal: say('$\\binom{n}{k}$ errepasatzea —$n$ tokitik $k$ aukeratzeko modu kopurua— eta haren simetria; binomialak kalkulu guztietan erabiliko du.', 'Repasar $\\binom{n}{k}$ —el número de formas de elegir $k$ posiciones de $n$— y su simetría, que la binomial usará en cada cálculo.', 'مراجعة $\\binom{n}{k}$ —عدد طرق اختيار $k$ موضعًا من $n$— وتماثله، الذي سيستعمله التوزيع الثنائي في كل حساب.', 'Review $\\binom{n}{k}$ —the number of ways of choosing $k$ places out of $n$— and its symmetry, which the binomial will use in every calculation.'),
        needs: [need.binomial, need.pascal],
        problem: say('Txanpon bat 6 aldiz botatzen da. Zenbat modutan atera daitezke zehazki 2 aurpegi? Eta zehazki 4?', 'Se lanza una moneda 6 veces. ¿De cuántas formas pueden salir exactamente 2 caras? ¿Y exactamente 4?', 'تُرمى قطعة نقود 6 مرات. بكم طريقة يمكن أن يظهر وجهان بالضبط؟ وأربعة أوجه بالضبط؟', 'A coin is tossed 6 times. In how many ways can exactly 2 heads come up? And exactly 4?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Modu bakoitza 6 botaldietatik zein 2 diren aurpegi aukeratzea da: bi horien ordenak ez du axola.', 'Cada forma es elegir en qué 2 de los 6 lanzamientos sale cara: el orden de esos dos no importa.', 'كل طريقة هي اختيار الرميتين اللتين يظهر فيهما الوجه من الرميات الست: ترتيبهما لا يهم.', 'Each way is a choice of which 2 of the 6 tosses are heads: the order of those two does not matter.'), math: same('$\\binom{6}{2}=\\frac{6\\cdot 5}{2\\cdot 1}=15$') },
            { text: say('Zehazki 4 aurpegi eta zehazki 2 gurutze gauza bera dira.', 'Exactamente 4 caras es lo mismo que exactamente 2 cruces.', 'أربعة أوجه بالضبط هي نفسها ظهران بالضبط.', 'Exactly 4 heads is the same as exactly 2 tails.'), math: same('$\\binom{6}{4}=\\binom{6}{2}=15$') },
            { text: say('Tartagliaren triangeluaren 6. errenkada: modu guztiek $2^6$ egiten dute.', 'Fila 6 del triángulo de Tartaglia: todas las formas suman $2^6$.', 'الصف 6 من مثلث تارتاليا: مجموع كل الطرق $2^6$.', 'Row 6 of Tartaglia\'s triangle: all the ways add up to $2^6$.'), math: same('$1+6+15+20+15+6+1=64$') }
        ],
        takeaway: say(
            '$\\binom{n}{k}=\\frac{n!}{k!\\,(n-k)!}$ zenbakiak $n$ tokitik $k$ ordenarik gabe aukeratzeko moduak zenbatzen ditu. Simetrikoa da, $\\binom{n}{k}=\\binom{n}{n-k}$, eta $\\binom{n}{0}=\\binom{n}{n}=1$.',
            '$\\binom{n}{k}=\\frac{n!}{k!\\,(n-k)!}$ cuenta las formas de elegir $k$ posiciones de $n$ sin orden. Es simétrico, $\\binom{n}{k}=\\binom{n}{n-k}$, y $\\binom{n}{0}=\\binom{n}{n}=1$.',
            '$\\binom{n}{k}=\\frac{n!}{k!\\,(n-k)!}$ يعدّ طرق اختيار $k$ موضعًا من $n$ دون ترتيب. وهو متماثل، $\\binom{n}{k}=\\binom{n}{n-k}$، و$\\binom{n}{0}=\\binom{n}{n}=1$.',
            '$\\binom{n}{k}=\\frac{n!}{k!\\,(n-k)!}$ counts the ways of choosing $k$ places out of $n$ with no order. It is symmetric, $\\binom{n}{k}=\\binom{n}{n-k}$, and $\\binom{n}{0}=\\binom{n}{n}=1$.'
        ),
        figure: (language) => <PositionsFigure language={language} />
    },
    {
        id: 'review-mean-sd',
        stage: 'review',
        title: say('Batez bestekoa eta desbideratze tipikoa: errepasoa', 'Media y desviación típica: repaso', 'المتوسط والانحراف المعياري: مراجعة', 'Mean and standard deviation: a review'),
        goal: say('Taula baten batez bestekoa, bariantza eta desbideratze tipikoa maiztasun erlatiboekin errepasatzea; gai honetan probabilitate bihurtuko dira.', 'Repasar la media, la varianza y la desviación típica de una tabla con las frecuencias relativas, que en este tema se convertirán en probabilidades.', 'مراجعة المتوسط والتباين والانحراف المعياري لجدول باستعمال التكرارات النسبية، التي ستصير في هذا الموضوع احتمالات.', 'Review the mean, the variance and the standard deviation of a table with the relative frequencies, which in this topic will become probabilities.'),
        needs: [need.varianceSd, need.standardScores],
        problem: say('20 familiatan seme-alabak zenbatzen dira: 2 familiak 0 dituzte, 6 familiak 1, 8 familiak 2 eta 4 familiak 3. Kalkulatu batez bestekoa eta desbideratze tipikoa.', 'En 20 familias se cuentan los hijos: 2 familias tienen 0, 6 tienen 1, 8 tienen 2 y 4 tienen 3. Calcula la media y la desviación típica.', 'في 20 أسرة يُعدّ الأبناء: أسرتان لهما 0، و6 أسر لها 1، و8 أسر لها 2، و4 أسر لها 3. احسب المتوسط والانحراف المعياري.', 'In 20 families the children are counted: 2 families have 0, 6 have 1, 8 have 2 and 4 have 3. Work out the mean and the standard deviation.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Maiztasun erlatiboak: kopuru bakoitza zati 20, 0, 1, 2 eta 3 balioentzat.', 'Frecuencias relativas: cada recuento entre 20, para 0, 1, 2 y 3.', 'التكرارات النسبية: كل عدد على 20، للقيم 0 و1 و2 و3.', 'Relative frequencies: each count over 20, for 0, 1, 2 and 3.'), math: same('$0{,}1\\quad 0{,}3\\quad 0{,}4\\quad 0{,}2$') },
            { text: say('Batez bestekoa: balio bakoitza bider bere maiztasun erlatiboa ($1\\cdot 0{,}3$, $2\\cdot 0{,}4$ eta $3\\cdot 0{,}2$).', 'La media: cada valor por su frecuencia relativa ($1\\cdot 0{,}3$, $2\\cdot 0{,}4$ y $3\\cdot 0{,}2$).', 'المتوسط: كل قيمة في تكرارها النسبي ($1\\cdot 0{,}3$ و$2\\cdot 0{,}4$ و$3\\cdot 0{,}2$).', 'The mean: each value times its relative frequency ($1\\cdot 0{,}3$, $2\\cdot 0{,}4$ and $3\\cdot 0{,}2$).'), math: same('$\\bar{x}=0{,}3+0{,}8+0{,}6=1{,}7$') },
            { text: say('Karratuen batez bestekoa $0{,}3+1{,}6+1{,}8=3{,}7$ da; ken batez bestekoaren karratua, eta erroa: $\\sigma=0{,}9$.', 'La media de los cuadrados es $0{,}3+1{,}6+1{,}8=3{,}7$; menos el cuadrado de la media, y la raíz: $\\sigma=0{,}9$.', 'متوسط المربعات $0{,}3+1{,}6+1{,}8=3{,}7$؛ ناقص مربع المتوسط، ثم الجذر: $\\sigma=0{,}9$.', 'The mean of the squares is $0{,}3+1{,}6+1{,}8=3{,}7$; minus the square of the mean, and the root: $\\sigma=0{,}9$.'), math: same('$\\sigma^2=3{,}7-1{,}7^2=0{,}81$') }
        ],
        takeaway: say(
            '$h_i$ maiztasun erlatiboekin: $\\bar{x}=\\sum x_i\\,h_i$ eta $\\sigma^2=\\sum x_i^2\\,h_i-\\bar{x}^2$; $\\sigma$ haren erroa da. ${z}=\\frac{x-\\bar{x}}{\\sigma}$ puntuazio tipikoak esaten du datu bat batez bestekotik zenbat $\\sigma$ urrun dagoen.',
            'Con frecuencias relativas $h_i$: $\\bar{x}=\\sum x_i\\,h_i$ y $\\sigma^2=\\sum x_i^2\\,h_i-\\bar{x}^2$; $\\sigma$ es su raíz. La puntuación típica ${z}=\\frac{x-\\bar{x}}{\\sigma}$ dice a cuántas $\\sigma$ está un dato de la media.',
            'مع التكرارات النسبية $h_i$: $\\bar{x}=\\sum x_i\\,h_i$ و$\\sigma^2=\\sum x_i^2\\,h_i-\\bar{x}^2$، و$\\sigma$ جذره. والدرجة المعيارية ${z}=\\frac{x-\\bar{x}}{\\sigma}$ تقول كم $\\sigma$ يبعد معطى عن المتوسط.',
            'With relative frequencies $h_i$: $\\bar{x}=\\sum x_i\\,h_i$ and $\\sigma^2=\\sum x_i^2\\,h_i-\\bar{x}^2$; $\\sigma$ is its root. The standard score ${z}=\\frac{x-\\bar{x}}{\\sigma}$ says how many $\\sigma$ a value is from the mean.'
        ),
        figureAfterSteps: true,
        figure: (language) => <FamiliesFigure language={language} />
    },

    /* ---------- 2. Discrete random variables ---------- */
    {
        id: 'random-variable',
        stage: 'discrete',
        title: say('Aldagai aleatorio diskretua', 'Variable aleatoria discreta', 'المتغير العشوائي المتقطع', 'Discrete random variable'),
        goal: say('Esperimentu baten emaitza bakoitzari zenbaki bat lotzea, probabilitate-funtzioa taula batean idaztea eta probabilitateak kalkulatzeko erabiltzea.', 'Asociar un número a cada resultado de un experimento, escribir la función de probabilidad en una tabla y usarla para calcular probabilidades.', 'ربط عدد بكل نتيجة من نتائج تجربة، وكتابة دالة الاحتمال في جدول، واستعمالها لحساب الاحتمالات.', 'Attach a number to each outcome of an experiment, write the probability function in a table and use it to work out probabilities.'),
        needs: [need.productRule],
        problem: say('3 txanpon botatzen dira, eta $X$ = «aurpegi kopurua». Idatzi $X$ aldagaiaren probabilitate-funtzioa eta kalkulatu $P(X\\ge 2)$.', 'Se lanzan 3 monedas y $X$ = «número de caras». Escribe la función de probabilidad de $X$ y calcula $P(X\\ge 2)$.', 'تُرمى 3 قطع نقود و$X$ = «عدد الأوجه». اكتب دالة احتمال $X$ واحسب $P(X\\ge 2)$.', 'Three coins are tossed and $X$ = «number of heads». Write the probability function of $X$ and work out $P(X\\ge 2)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('8 emaitza daude, berdin probableak. $X$ aldagaiak aurpegiak zenbatzen ditu: 0, 1, 2 edo 3 balio du.', 'Hay 8 resultados igual de probables. $X$ cuenta las caras: vale 0, 1, 2 o 3.', 'هناك 8 نتائج متساوية الاحتمال. يعدّ $X$ الأوجه: يساوي 0 أو 1 أو 2 أو 3.', 'There are 8 equally likely outcomes. $X$ counts the heads: it is 0, 1, 2 or 3.'), math: same('$2^3=8$') },
            { text: say('Aurpegi bat 8 emaitzatik 3 emaitzatan ateratzen da, eta bi aurpegi ere bai. 0, 1, 2 eta 3 aurpegirentzat:', 'Una cara sale en 3 de los 8 resultados, y dos caras también. Para 0, 1, 2 y 3 caras:', 'يظهر وجه واحد في 3 من النتائج الثماني، وكذلك وجهان. لـ 0 و1 و2 و3 أوجه:', 'One head comes up in 3 of the 8 outcomes, and so do two heads. For 0, 1, 2 and 3 heads:'), math: same('$\\frac{1}{8}\\quad\\frac{3}{8}\\quad\\frac{3}{8}\\quad\\frac{1}{8}$') },
            { text: say('«Gutxienez 2» gertaerak 2 eta 3 balioak biltzen ditu.', '«Al menos 2» junta los valores 2 y 3.', '«2 على الأقل» يجمع القيمتين 2 و3.', '‘At least 2’ puts the values 2 and 3 together.'), math: same('$P(X\\ge 2)=\\frac{3}{8}+\\frac{1}{8}=\\frac{1}{2}$') }
        ],
        takeaway: say(
            '$X$ aldagai aleatorio diskretu batek $x_i$ balio solteak hartzen ditu, $p_i=P(X=x_i)$ probabilitateekin. Haren probabilitate-funtzioa balioen eta probabilitateen taula da: $p_i\\ge 0$ bakoitza, eta guztiek 1 egiten dute batuta.',
            'Una variable aleatoria discreta $X$ toma valores sueltos $x_i$ con probabilidades $p_i=P(X=x_i)$. Su función de probabilidad es la tabla de valores y probabilidades: cada $p_i\\ge 0$, y todas suman 1.',
            'يأخذ المتغير العشوائي المتقطع $X$ قيمًا منفصلة $x_i$ باحتمالات $p_i=P(X=x_i)$. ودالة احتماله جدول القيم والاحتمالات: كل $p_i\\ge 0$، ومجموعها 1.',
            'A discrete random variable $X$ takes separate values $x_i$ with probabilities $p_i=P(X=x_i)$. Its probability function is the table of values and probabilities: each $p_i\\ge 0$, and they all add up to 1.'
        ),
        figureAfterSteps: true,
        figure: (language) => <ThreeCoinsFigure language={language} />
    },
    {
        id: 'mean-variance',
        stage: 'discrete',
        title: say('Aldagai baten batez bestekoa eta bariantza', 'Media y varianza de una variable', 'متوسط المتغير العشوائي وتباينه', 'Mean and variance of a random variable'),
        goal: say('Aldagai diskretu baten $\\mu$ batez bestekoa, bariantza eta $\\sigma$ desbideratze tipikoa kalkulatzea, haren probabilitate-funtziotik.', 'Calcular la media $\\mu$, la varianza y la desviación típica $\\sigma$ de una variable discreta a partir de su función de probabilidad.', 'حساب المتوسط $\\mu$ والتباين والانحراف المعياري $\\sigma$ لمتغير متقطع انطلاقًا من دالة احتماله.', 'Work out the mean $\\mu$, the variance and the standard deviation $\\sigma$ of a discrete variable from its probability function.'),
        needs: [need.varianceSd],
        problem: say('Azoka batean, $X$ = «haur batek joko batean irabazten dituen sariak» aldagaiak 0, 1 edo 2 balio du, 0,3; 0,5 eta 0,2 probabilitateekin. Kalkulatu $\\mu$ eta $\\sigma$.', 'En una feria, $X$ = «premios que gana un niño en un juego» vale 0, 1 o 2 con probabilidades 0,3; 0,5 y 0,2. Calcula $\\mu$ y $\\sigma$.', 'في معرض، يأخذ $X$ = «عدد الجوائز التي يربحها طفل في لعبة» القيم 0 أو 1 أو 2 باحتمالات 0.3 و0.5 و0.2. احسب $\\mu$ و$\\sigma$.', 'At a fair, $X$ = «prizes a child wins in a game» takes the values 0, 1 or 2 with probabilities 0.3, 0.5 and 0.2. Work out $\\mu$ and $\\sigma$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batez bestekoan, balio bakoitzak bere probabilitatearen pisua du: $1\\cdot 0{,}5$ eta $2\\cdot 0{,}2$ (0 balioak ez du batzen).', 'La media pesa cada valor con su probabilidad: $1\\cdot 0{,}5$ y $2\\cdot 0{,}2$ (el 0 no suma).', 'في المتوسط تُوزن كل قيمة باحتمالها: $1\\cdot 0{,}5$ و$2\\cdot 0{,}2$ (القيمة 0 لا تضيف شيئًا).', 'The mean weights each value by its probability: $1\\cdot 0{,}5$ and $2\\cdot 0{,}2$ (the 0 adds nothing).'), math: same('$\\mu=0{,}5+0{,}4=0{,}9$') },
            { text: say('Karratuen batez bestekoa, pisu berekin.', 'La media de los cuadrados, con los mismos pesos.', 'متوسط المربعات بالأوزان نفسها.', 'The mean of the squares, with the same weights.'), math: same('$0{,}5+4\\cdot 0{,}2=1{,}3$') },
            { text: say('Batez bestekoaren karratua kentzen da, eta erroa egiten da: $\\sigma=0{,}7$.', 'Se resta el cuadrado de la media y se hace la raíz: $\\sigma=0{,}7$.', 'نطرح مربع المتوسط ثم نأخذ الجذر: $\\sigma=0{,}7$.', 'Subtract the square of the mean and take the root: $\\sigma=0{,}7$.'), math: same('$\\sigma^2=1{,}3-0{,}9^2=0{,}49$') }
        ],
        takeaway: say(
            '$\\mu=\\sum x_i\\,p_i$ esperimentua askotan errepikatuz aterako litzatekeen batez bestekoa da. $\\sigma^2=\\sum x_i^2\\,p_i-\\mu^2$ eta $\\sigma=\\sqrt{\\sigma^2}$ balioek neurtzen dute balioak $\\mu$ baliotik zenbat urruntzen diren.',
            '$\\mu=\\sum x_i\\,p_i$ es la media que saldría repitiendo el experimento muchas veces. $\\sigma^2=\\sum x_i^2\\,p_i-\\mu^2$ y $\\sigma=\\sqrt{\\sigma^2}$ miden cuánto se separan los valores de $\\mu$.',
            '$\\mu=\\sum x_i\\,p_i$ هو المتوسط الذي نحصل عليه بتكرار التجربة مرات كثيرة. و$\\sigma^2=\\sum x_i^2\\,p_i-\\mu^2$ و$\\sigma=\\sqrt{\\sigma^2}$ يقيسان مدى ابتعاد القيم عن $\\mu$.',
            '$\\mu=\\sum x_i\\,p_i$ is the mean you would get by repeating the experiment many times. $\\sigma^2=\\sum x_i^2\\,p_i-\\mu^2$ and $\\sigma=\\sqrt{\\sigma^2}$ measure how far the values spread from $\\mu$.'
        ),
        figure: (language) => <PrizesFigure language={language} />
    },
    {
        id: 'expected-value',
        stage: 'discrete',
        title: say('Itxaropena eta jokoak', 'Esperanza y juegos', 'الأمل الرياضي والألعاب', 'Expected value and games'),
        goal: say('Irabaziaren batez bestekoa —itxaropena— erabiltzea joko bat bidezkoa den erabakitzeko eta epe luzean partidako zenbat irabazten edo galtzen den jakiteko.', 'Usar la media de la ganancia —la esperanza— para decidir si un juego es justo y cuánto se gana o se pierde por partida a la larga.', 'استعمال متوسط الربح —الأمل الرياضي— لتقرير هل اللعبة عادلة، وكم نربح أو نخسر في الجولة على المدى الطويل.', 'Use the mean of the gain —the expected value— to decide whether a game is fair and how much is won or lost per round in the long run.'),
        needs: [need.fairGames],
        problem: say('Jokatzeak 3 euro balio du. Dado bat botatzen da: 6 ateratzen bada, 12 euro ordaintzen dizute; 4 edo 5 ateratzen bada, 3 euro; eta gainerakoekin, ezer ez. Joko bidezkoa da?', 'Jugar cuesta 3 €. Se lanza un dado: con un 6 te pagan 12 €; con un 4 o un 5, 3 €, y con el resto, nada. ¿Es un juego justo?', 'تكلّف المشاركة 3 €. يُرمى نرد: إذا ظهر 6 تأخذ 12 €، وإذا ظهر 4 أو 5 تأخذ 3 €، ومع الباقي لا شيء. هل اللعبة عادلة؟', 'Playing costs €3. A die is rolled: a 6 pays you €12; a 4 or a 5, €3; and the rest, nothing. Is it a fair game?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batez besteko saria: sari bakoitza bider bere probabilitatea.', 'El premio medio: cada premio por su probabilidad.', 'متوسط الجائزة: كل جائزة مضروبة في احتمالها.', 'The mean prize: each prize times its probability.'), math: same('$12\\cdot\\frac{1}{6}+3\\cdot\\frac{2}{6}=3$') },
            { text: say('Batez besteko irabazia: batez besteko saria ken jokatzeak balio duena. 0 da: jokoa bidezkoa da.', 'La ganancia media es el premio medio menos lo que cuesta jugar. Es 0: el juego es justo.', 'متوسط الربح هو متوسط الجائزة ناقص كلفة اللعب. إنه 0: اللعبة عادلة.', 'The mean gain is the mean prize minus what it costs to play. It is 0: the game is fair.'), math: same('$3-3=0$') },
            { text: say('6 ateratzean 18 euro ordainduko balute, jokalariak euro 1 irabaziko luke partidako, batez beste.', 'Si el 6 pagara 18 €, el jugador ganaría 1 € por partida, de media.', 'لو دفع الرقم 6 مبلغ 18 € لربح اللاعب 1 € في الجولة في المتوسط.', 'If the 6 paid €18, the player would win €1 per round, on average.'), math: same('$18\\cdot\\frac{1}{6}+1-3=1$') }
        ],
        takeaway: say(
            'Irabaziaren $E=\\mu$ itxaropena partida bakoitzean batez beste irabazten dena da. Jokoa bidezkoa da $E=0$ bada; $E<0$ bada, epe luzean jokalariak galtzen du.',
            'La esperanza $E=\\mu$ de la ganancia es lo que se gana de media por partida. El juego es justo si $E=0$; si $E<0$, a la larga pierde el jugador.',
            'الأمل الرياضي للربح $E=\\mu$ هو ما نربحه في المتوسط في الجولة. وتكون اللعبة عادلة إذا كان $E=0$؛ وإذا كان $E<0$ خسر اللاعب على المدى الطويل.',
            'The expected value $E=\\mu$ of the gain is what is won on average per round. The game is fair if $E=0$; if $E<0$, the player loses in the long run.'
        ),
        figure: (language) => <DieGameFigure language={language} />
    },

    /* ---------- 3. The binomial distribution ---------- */
    {
        id: 'is-binomial',
        stage: 'binomial',
        title: say('Noiz da binomiala?', '¿Cuándo es binomial?', 'متى يكون التوزيع ثنائيًّا؟', 'When is it binomial?'),
        goal: say('$B(n;\\,p)$ binomial bat ezagutzea: $n$ proba berdin eta independente, bi emaitzarekin —arrakasta eta porrota— eta $p$ bera guztietan.', 'Reconocer una binomial $B(n;\\,p)$: $n$ pruebas iguales e independientes con dos resultados, éxito y fracaso, y la misma $p$ en todas.', 'التعرّف على التوزيع الثنائي $B(n;\\,p)$: $n$ محاولة متماثلة ومستقلة بنتيجتين، نجاح وفشل، و$p$ نفسه في كلها.', 'Recognise a binomial $B(n;\\,p)$: $n$ identical, independent trials with two outcomes, success and failure, and the same $p$ in all of them.'),
        needs: [need.independent, need.independence],
        problem: say('Zein dira binomialak? a) Dado bat 10 aldiz bota eta seiak zenbatu. b) 40 kartako sorta batetik (4 bateko) 3 karta atera, itzuli gabe, eta batekoak zenbatu. c) Dado bat bota 6 atera arte, eta botaldiak zenbatu.', '¿Cuáles son binomiales? a) Lanzar un dado 10 veces y contar los seises. b) Sacar 3 cartas sin devolución de una baraja de 40 (con 4 ases) y contar los ases. c) Lanzar un dado hasta que salga un 6 y contar los lanzamientos.', 'أيّها ثنائي؟ أ) رمي نرد 10 مرات وعدّ مرات ظهور 6. ب) سحب 3 أوراق دون إرجاع من مجموعة من 40 ورقة (فيها 4 آسات) وعدّ الآسات. ج) رمي نرد حتى يظهر 6 وعدّ الرميات.', 'Which are binomial? a) Rolling a die 10 times and counting the sixes. b) Drawing 3 cards without replacement from a pack of 40 (with 4 aces) and counting the aces. c) Rolling a die until a 6 comes up and counting the rolls.'),
        stepsKind: 'steps',
        steps: [
            { text: say('a) 10 proba independente, «6 ateratzea» arrakasta da, eta beti $p=\\frac{1}{6}$: binomiala da.', 'a) 10 pruebas independientes, éxito «sale 6» y siempre $p=\\frac{1}{6}$: es binomial.', 'أ) 10 محاولات مستقلة، والنجاح «ظهور 6» ودائمًا $p=\\frac{1}{6}$: إنه ثنائي.', 'a) 10 independent trials, success ‘a 6 comes up’ and always $p=\\frac{1}{6}$: it is binomial.'), math: same('$X\\sim B(10;\\,\\frac{1}{6})$') },
            { text: say('b) Itzuli gabe, batekoaren probabilitatea aldatu egiten da karta batetik bestera: ez da binomiala.', 'b) Sin devolución, la probabilidad de as cambia de una carta a otra: no es binomial.', 'ب) دون إرجاع يتغيّر احتمال الآس من ورقة إلى أخرى: ليس ثنائيًّا.', 'b) Without replacement, the probability of an ace changes from one card to the next: it is not binomial.'), math: same('$\\frac{4}{40}\\neq\\frac{3}{39}$') },
            { text: say('c) Proba kopurua ez dago aurretik finkatuta: hau ere ez da binomiala.', 'c) El número de pruebas no está fijado de antemano: tampoco es binomial.', 'ج) عدد المحاولات غير محدد مسبقًا: فليس ثنائيًّا أيضًا.', 'c) The number of trials is not fixed in advance: it is not binomial either.') }
        ],
        takeaway: say(
            '$X\\sim B(n;\\,p)$ aldagaiak arrakastak zenbatzen ditu $n$ proba independentetan, bakoitza bi emaitzarekin eta arrakastaren $p$ probabilitate berarekin; porrotarena $q=1-p$ da. Itzuli gabe, edo $n$ finkorik gabe, ez da binomiala.',
            '$X\\sim B(n;\\,p)$ cuenta los éxitos en $n$ pruebas independientes, cada una con dos resultados y la misma probabilidad de éxito $p$; la de fracaso es $q=1-p$. Sin devolución, o sin $n$ fijo, no es binomial.',
            '$X\\sim B(n;\\,p)$ يعدّ النجاحات في $n$ محاولة مستقلة، لكل منها نتيجتان وباحتمال النجاح نفسه $p$؛ واحتمال الفشل $q=1-p$. ودون إرجاع، أو دون $n$ ثابت، ليس ثنائيًّا.',
            '$X\\sim B(n;\\,p)$ counts the successes in $n$ independent trials, each with two outcomes and the same probability of success $p$; that of failure is $q=1-p$. Without replacement, or with no fixed $n$, it is not binomial.'
        ),
        figure: (language) => <TrialsFigure language={language} />
    },
    {
        id: 'binomial-formula',
        stage: 'binomial',
        title: say('Probabilitateak binomialean', 'Probabilidades en la binomial', 'الاحتمالات في التوزيع الثنائي', 'Probabilities in the binomial'),
        goal: say('$P(X=k)=\\binom{n}{k}p^k q^{n-k}$ kalkulatzea, eta «gutxienez» eta «gehienez» probabilitateak, aurkakoa erabiliz kalkuluak aurrezten dituenean.', 'Calcular $P(X=k)=\\binom{n}{k}p^k q^{n-k}$ y las probabilidades de «al menos» y «como mucho», usando el contrario cuando ahorra cuentas.', 'حساب $P(X=k)=\\binom{n}{k}p^k q^{n-k}$ واحتمالات «على الأقل» و«على الأكثر»، باستعمال المعاكس عندما يختصر الحساب.', 'Work out $P(X=k)=\\binom{n}{k}p^k q^{n-k}$ and the probabilities of ‘at least’ and ‘at most’, using the complement when it saves work.'),
        needs: [need.binomial],
        problem: say('Jokalari batek bere jaurtiketa libreen % 70 sartzen du. 4 jaurtitzen ditu. Zein da zehazki 3 sartzeko probabilitatea? Eta gutxienez 1?', 'Una jugadora encesta el 70 % de sus tiros libres. Lanza 4. ¿Qué probabilidad hay de que enceste exactamente 3? ¿Y al menos 1?', 'تسجّل لاعبة 70٪ من رمياتها الحرة. ترمي 4 رميات. ما احتمال أن تسجّل 3 بالضبط؟ وواحدة على الأقل؟', 'A player scores 70% of her free throws. She takes 4. What is the probability that she scores exactly 3? And at least 1?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Jaurtiketa bakoitza proba independente bat da, $p=0{,}7$ probabilitatearekin.', 'Cada tiro es una prueba independiente con $p=0{,}7$.', 'كل رمية محاولة مستقلة مع $p=0{,}7$.', 'Each throw is an independent trial with $p=0{,}7$.'), math: same('$X\\sim B(4;\\,0{,}7)$') },
            { text: say('Zehazki 3: $\\binom{4}{3}=4$ ordena, bakoitza $0{,}7^3\\cdot 0{,}3$ probabilitatearekin.', 'Exactamente 3: los $\\binom{4}{3}=4$ órdenes, cada uno con probabilidad $0{,}7^3\\cdot 0{,}3$.', '3 بالضبط: الترتيبات $\\binom{4}{3}=4$، لكل منها الاحتمال $0{,}7^3\\cdot 0{,}3$.', 'Exactly 3: the $\\binom{4}{3}=4$ orders, each with probability $0{,}7^3\\cdot 0{,}3$.'), math: same('$P(X=3)=4\\cdot 0{,}7^3\\cdot 0{,}3=0{,}4116$') },
            { text: say('Gutxienez 1 «bat ere ez» gertaeraren aurkakoa da.', 'Al menos 1 es lo contrario de ninguno.', 'واحدة على الأقل هي معاكس «ولا واحدة».', 'At least 1 is the complement of none.'), math: same('$P(X\\ge 1)=1-0{,}3^4=0{,}9919$') }
        ],
        takeaway: say(
            '$B(n;\\,p)$ banaketan, $P(X=k)=\\binom{n}{k}p^k q^{n-k}$: zenbaki konbinatorioak ordenak zenbatzen ditu. «Gutxienez $k$» $X\\ge k$ da, eta «gehienez $k$», $X\\le k$; gai asko batu behar badira, erabili aurkakoa.',
            'En $B(n;\\,p)$, $P(X=k)=\\binom{n}{k}p^k q^{n-k}$: el número combinatorio cuenta los órdenes. «Al menos $k$» es $X\\ge k$ y «como mucho $k$», $X\\le k$; si hay que sumar muchos términos, usa el contrario.',
            'في $B(n;\\,p)$، $P(X=k)=\\binom{n}{k}p^k q^{n-k}$: يعدّ العدد التوافقي الترتيبات. و«$k$ على الأقل» هو $X\\ge k$، و«$k$ على الأكثر» هو $X\\le k$؛ وإذا وجب جمع حدود كثيرة فاستعمل المعاكس.',
            'In $B(n;\\,p)$, $P(X=k)=\\binom{n}{k}p^k q^{n-k}$: the binomial coefficient counts the orders. ‘At least $k$’ is $X\\ge k$ and ‘at most $k$’, $X\\le k$; if many terms have to be added, use the complement.'
        ),
        figureAfterSteps: true,
        figure: (language) => <FreeThrowsFigure language={language} />
    },
    {
        id: 'binomial-parameters',
        stage: 'binomial',
        title: say('Binomialaren batez bestekoa eta desbideratzea', 'Media y desviación de la binomial', 'متوسط التوزيع الثنائي وانحرافه', 'Mean and deviation of the binomial'),
        goal: say('Binomial baten $\\mu=np$ eta $\\sigma=\\sqrt{npq}$ kalkulatzea taula egin gabe, eta interpretatzea: zenbat arrakasta espero diren eta zenbat urruntzen diren.', 'Calcular $\\mu=np$ y $\\sigma=\\sqrt{npq}$ de una binomial sin hacer la tabla, e interpretarlas: cuántos éxitos se esperan y cuánto se separan.', 'حساب $\\mu=np$ و$\\sigma=\\sqrt{npq}$ للتوزيع الثنائي دون جدول، وتفسيرهما: كم نجاحًا يُتوقع وكم تبتعد النتائج.', 'Work out $\\mu=np$ and $\\sigma=\\sqrt{npq}$ of a binomial without making the table, and read them: how many successes are expected and how far they spread.'),
        problem: say('Sorta bateko mugikorren % 20 akatsdunak dira. Zoriz 100 aztertzen dira. Zenbat akatsdun espero dira? Zein da desbideratze tipikoa?', 'El 20 % de los móviles de un lote tiene un fallo. Se revisan 100 al azar. ¿Cuántos con fallo se esperan? ¿Cuál es la desviación típica?', '20٪ من الهواتف في دفعة بها عيب. تُفحص 100 هاتف عشوائيًّا. كم هاتفًا معيبًا يُتوقّع؟ وما الانحراف المعياري؟', '20% of the phones in a batch have a fault. 100 are checked at random. How many faulty ones are expected? What is the standard deviation?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Binomiala da: 100 proba, $p=0{,}2$ probabilitatearekin (sorta handia da).', 'Es binomial: 100 pruebas con $p=0{,}2$ (el lote es grande).', 'إنه ثنائي: 100 محاولة مع $p=0{,}2$ (الدفعة كبيرة).', 'It is binomial: 100 trials with $p=0{,}2$ (the batch is large).'), math: same('$X\\sim B(100;\\,0{,}2)$') },
            { text: say('Batez bestekoa $np$ da.', 'La media es $np$.', 'المتوسط هو $np$.', 'The mean is $np$.'), math: same('$\\mu=100\\cdot 0{,}2=20$') },
            { text: say('Bariantza $npq$ da, eta $\\sigma$ haren erroa: $\\sigma=4$.', 'La varianza es $npq$, y $\\sigma$ su raíz: $\\sigma=4$.', 'التباين هو $npq$، و$\\sigma$ جذره: $\\sigma=4$.', 'The variance is $npq$, and $\\sigma$ its root: $\\sigma=4$.'), math: same('$\\sigma^2=100\\cdot 0{,}2\\cdot 0{,}8=16$') }
        ],
        takeaway: say(
            '$B(n;\\,p)$ banaketan, $\\mu=np$ eta $\\sigma=\\sqrt{npq}$. $np$ arrakasta inguru espero dira, eta ohikoena handik $\\sigma$ bat edo bi $\\sigma$ urrun geratzea da.',
            'En $B(n;\\,p)$, $\\mu=np$ y $\\sigma=\\sqrt{npq}$. Se esperan unos $np$ éxitos, y lo normal es quedar a una o dos $\\sigma$ de ahí.',
            'في $B(n;\\,p)$، $\\mu=np$ و$\\sigma=\\sqrt{npq}$. يُتوقع نحو $np$ نجاحًا، والمعتاد أن نبعد عنه $\\sigma$ واحدة أو اثنتين.',
            'In $B(n;\\,p)$, $\\mu=np$ and $\\sigma=\\sqrt{npq}$. About $np$ successes are expected, and the usual thing is to land one or two $\\sigma$ from there.'
        ),
        figureAfterSteps: true,
        figure: (language) => <PhonesFigure language={language} />
    },

    /* ---------- 4. Continuous variables and the normal ---------- */
    {
        id: 'density',
        stage: 'normal',
        title: say('Aldagai jarraituak eta dentsitatea', 'Variables continuas y densidad', 'المتغيرات المتصلة والكثافة', 'Continuous variables and density'),
        goal: say('Aldagai jarraitu batean probabilitatea dentsitate-funtzioaren azpiko azalera dela ulertzea, azalera osoa 1 izateko $k$ aurkitzea eta $P(X=a)=0$ dela ikustea.', 'Entender que en una variable continua la probabilidad es un área bajo la función de densidad, hallar $k$ para que el área total sea 1 y ver que $P(X=a)=0$.', 'فهم أن الاحتمال في المتغير المتصل مساحة تحت دالة الكثافة، وإيجاد $k$ لتكون المساحة الكلية 1، ورؤية أن $P(X=a)=0$.', 'Understand that for a continuous variable the probability is an area under the density function, find $k$ so that the total area is 1 and see that $P(X=a)=0$.'),
        problem: say('Autobus baten zain egoteko $X$ denborak, minututan, $f(x)=k$ dentsitatea du 0 eta 10 artean, eta 0 kanpoan. Aurkitu $k$, $P(X\\le 3)$ eta $P(X=3)$.', 'El tiempo de espera $X$ de un autobús, en minutos, tiene densidad $f(x)=k$ entre 0 y 10, y 0 fuera. Halla $k$, $P(X\\le 3)$ y $P(X=3)$.', 'لزمن انتظار حافلة $X$، بالدقائق، كثافة $f(x)=k$ بين 0 و10، و0 خارج ذلك. أوجد $k$ و$P(X\\le 3)$ و$P(X=3)$.', 'The waiting time $X$ for a bus, in minutes, has density $f(x)=k$ between 0 and 10, and 0 outside. Find $k$, $P(X\\le 3)$ and $P(X=3)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$f$ funtzioaren azpiko azalera osoa 1 da: 10 oinarriko eta $k$ altuerako laukizuzen bat.', 'El área total bajo $f$ es 1: un rectángulo de base 10 y altura $k$.', 'المساحة الكلية تحت $f$ تساوي 1: مستطيل قاعدته 10 وارتفاعه $k$.', 'The total area under $f$ is 1: a rectangle with base 10 and height $k$.'), math: same('$10\\cdot k=1\\qquad k=\\frac{1}{10}$') },
            { text: say('$P(X\\le 3)$ 0 eta 3 arteko azalera da.', '$P(X\\le 3)$ es el área entre 0 y 3.', '$P(X\\le 3)$ هي المساحة بين 0 و3.', '$P(X\\le 3)$ is the area between 0 and 3.'), math: same('$3\\cdot\\frac{1}{10}=0{,}3$') },
            { text: say('Puntu bakar bat zabalerarik gabeko laukizuzen bat da.', 'Un solo punto es un rectángulo sin anchura.', 'النقطة الواحدة مستطيل بلا عرض.', 'A single point is a rectangle with no width.'), math: same('$P(X=3)=0$') }
        ],
        takeaway: say(
            'Dentsitate-funtzio batek $f(x)\\ge 0$ betetzen du, eta haren azalera osoa 1 da. $P(a\\le X\\le b)$ $f$ funtzioaren azpiko azalera da $a$ eta $b$ artean, eta $P(X=a)=0$: $<$ edo $\\le$ erabili, berdin ateratzen da.',
            'Una función de densidad cumple $f(x)\\ge 0$ y tiene área total 1. $P(a\\le X\\le b)$ es el área bajo $f$ entre $a$ y $b$, y $P(X=a)=0$: con $<$ o con $\\le$ sale lo mismo.',
            'تحقق دالة الكثافة $f(x)\\ge 0$ ومساحتها الكلية 1. و$P(a\\le X\\le b)$ هي المساحة تحت $f$ بين $a$ و$b$، و$P(X=a)=0$: مع $<$ أو مع $\\le$ نحصل على النتيجة نفسها.',
            'A density function satisfies $f(x)\\ge 0$ and has total area 1. $P(a\\le X\\le b)$ is the area under $f$ between $a$ and $b$, and $P(X=a)=0$: with $<$ or with $\\le$ you get the same.'
        ),
        figureAfterSteps: true,
        figure: (language) => <WaitingFigure language={language} />
    },
    {
        id: 'normal-curve',
        stage: 'normal',
        title: say('Banaketa normala', 'La distribución normal', 'التوزيع الطبيعي', 'The normal distribution'),
        goal: say('$N(\\mu;\\,\\sigma)$ banaketaren kanpaia ezagutzea, $\\mu$ balioaren inguruan simetrikoa, eta batez bestekotik $\\sigma$ bat, bi eta hiru $\\sigma$ urrun geratzen diren ehunekoak erabiltzea.', 'Reconocer la campana de $N(\\mu;\\,\\sigma)$, simétrica alrededor de $\\mu$, y usar los porcentajes que quedan a una, dos y tres $\\sigma$ de la media.', 'التعرّف على جرس $N(\\mu;\\,\\sigma)$ المتماثل حول $\\mu$، واستعمال النسب على بعد واحد واثنين وثلاثة $\\sigma$ من المتوسط.', 'Recognise the bell of $N(\\mu;\\,\\sigma)$, symmetric about $\\mu$, and use the percentages lying within one, two and three $\\sigma$ of the mean.'),
        problem: say('17 urteko mutilen altuera $N(175;\\,7)$ da, zentimetrotan. Zer ehuneko neurtzen du 168 eta 182 cm artean? Eta 189 cm baino gehiago?', 'La altura de los chicos de 17 años sigue una $N(175;\\,7)$ en cm. ¿Qué porcentaje mide entre 168 y 182 cm? ¿Y más de 189 cm?', 'يتبع طول الفتيان في سن 17 التوزيع $N(175;\\,7)$ بالسنتيمتر. ما النسبة التي يتراوح طولها بين 168 و182 سم؟ وما النسبة التي يزيد طولها على 189 سم؟', 'The height of 17-year-old boys follows $N(175;\\,7)$ in cm. What percentage is between 168 and 182 cm tall? And taller than 189 cm?'),
        stepsKind: 'steps',
        steps: [
            { text: say('168 eta 182, $\\mu-\\sigma$ eta $\\mu+\\sigma$ dira: haien artean % 68,26 dago.', '168 y 182 son $\\mu-\\sigma$ y $\\mu+\\sigma$: entre ellos está el 68,26 %.', '168 و182 هما $\\mu-\\sigma$ و$\\mu+\\sigma$: بينهما 68.26٪.', '168 and 182 are $\\mu-\\sigma$ and $\\mu+\\sigma$: 68.26% lies between them.'), math: same('$175-7=168\\qquad 175+7=182$') },
            { text: say('189 $\\mu+2\\sigma$ da, eta $\\mu-2\\sigma$ eta $\\mu+2\\sigma$ artean % 95,44 dago.', '189 es $\\mu+2\\sigma$, y entre $\\mu-2\\sigma$ y $\\mu+2\\sigma$ está el 95,44 %.', '189 هو $\\mu+2\\sigma$، وبين $\\mu-2\\sigma$ و$\\mu+2\\sigma$ يقع 95.44٪.', '189 is $\\mu+2\\sigma$, and 95.44% lies between $\\mu-2\\sigma$ and $\\mu+2\\sigma$.'), math: same('$175+2\\cdot 7=189$') },
            { text: say('Kanpoan % 4,56 geratzen da, erdia alde bakoitzean: % 2,28 dira 189 cm baino gehiago.', 'Fuera queda el 4,56 %, la mitad por cada lado: el 2,28 % mide más de 189 cm.', 'يبقى خارجهما 4.56٪، نصفه في كل جهة: 2.28٪ أطول من 189 سم.', '4.56% is left outside, half on each side: 2.28% are taller than 189 cm.'), math: same('$(100-95{,}44)\\div 2=2{,}28$') }
        ],
        takeaway: say(
            '$N(\\mu;\\,\\sigma)$ normala kanpai simetriko bat da $\\mu$ balioaren inguruan, 1 azalera osoarekin. $\\mu\\pm\\sigma$ artean % 68,26 geratzen da; $\\mu\\pm 2\\sigma$ artean, % 95,44; eta $\\mu\\pm 3\\sigma$ artean, % 99,74.',
            'La normal $N(\\mu;\\,\\sigma)$ es una campana simétrica alrededor de $\\mu$, con área total 1. Entre $\\mu\\pm\\sigma$ queda el 68,26 %; entre $\\mu\\pm 2\\sigma$, el 95,44 %, y entre $\\mu\\pm 3\\sigma$, el 99,74 %.',
            'التوزيع الطبيعي $N(\\mu;\\,\\sigma)$ جرس متماثل حول $\\mu$ مساحته الكلية 1. بين $\\mu\\pm\\sigma$ يقع 68.26٪، وبين $\\mu\\pm 2\\sigma$ يقع 95.44٪، وبين $\\mu\\pm 3\\sigma$ يقع 99.74٪.',
            'The normal $N(\\mu;\\,\\sigma)$ is a bell symmetric about $\\mu$, with total area 1. Within $\\mu\\pm\\sigma$ lies 68.26%; within $\\mu\\pm 2\\sigma$, 95.44%; and within $\\mu\\pm 3\\sigma$, 99.74%.'
        ),
        figureAfterSteps: true,
        figure: (language) => <HeightsFigure language={language} />
    },
    {
        id: 'standard-table',
        stage: 'normal',
        title: say('Normal estandarraren taula', 'La tabla de la normal estándar', 'جدول التوزيع الطبيعي المعياري', 'The standard normal table'),
        goal: say('$Z\\sim N(0;\\,1)$ banaketan $P(Z\\le k)$ taulan irakurtzea, eta, aurkakoarekin eta simetriarekin, gainetik, negatibo baten azpitik eta bi balioren artean dauden probabilitateak lortzea.', 'Leer en la tabla $P(Z\\le k)$ para $Z\\sim N(0;\\,1)$ y obtener, con el contrario y la simetría, las probabilidades por encima, por debajo de un negativo y entre dos valores.', 'قراءة $P(Z\\le k)$ في الجدول للتوزيع $Z\\sim N(0;\\,1)$، والحصول بالمعاكس والتماثل على الاحتمالات فوق قيمة، وتحت قيمة سالبة، وبين قيمتين.', 'Read $P(Z\\le k)$ in the table for $Z\\sim N(0;\\,1)$ and get, with the complement and symmetry, the probabilities above a value, below a negative one and between two values.'),
        problem: say('$Z$ aldagaia $N(0;\\,1)$ da. Kalkulatu $P(Z\\le 1{,}25)$, $P(Z>1{,}25)$, $P(Z\\le -1{,}25)$ eta $P(-1{,}25\\le Z\\le 1{,}25)$.', '$Z$ sigue una $N(0;\\,1)$. Calcula $P(Z\\le 1{,}25)$, $P(Z>1{,}25)$, $P(Z\\le -1{,}25)$ y $P(-1{,}25\\le Z\\le 1{,}25)$.', 'يتبع $Z$ التوزيع $N(0;\\,1)$. احسب $P(Z\\le 1{,}25)$ و$P(Z>1{,}25)$ و$P(Z\\le -1{,}25)$ و$P(-1{,}25\\le Z\\le 1{,}25)$.', '$Z$ follows $N(0;\\,1)$. Work out $P(Z\\le 1{,}25)$, $P(Z>1{,}25)$, $P(Z\\le -1{,}25)$ and $P(-1{,}25\\le Z\\le 1{,}25)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Taularen 1,2 errenkada eta 0,05 zutabea.', 'Fila 1,2 y columna 0,05 de la tabla.', 'الصف 1.2 والعمود 0.05 من الجدول.', 'Row 1.2 and column 0.05 of the table.'), math: same('$P(Z\\le 1{,}25)=0{,}8944$') },
            { text: say('Gainetik: aurkakoa.', 'Por encima: el contrario.', 'فوقها: المعاكس.', 'Above: the complement.'), math: same('$P(Z>1{,}25)=1-0{,}8944=0{,}1056$') },
            { text: say('$-1{,}25$ azpitik: gauza bera, simetriagatik.', 'Por debajo de $-1{,}25$: lo mismo, por simetría.', 'تحت $-1{,}25$: الشيء نفسه بالتماثل.', 'Below $-1{,}25$: the same, by symmetry.'), math: same('$P(Z\\le -1{,}25)=0{,}1056$') },
            { text: say('Bien artean: kendu.', 'Entre los dos: resta.', 'بينهما: اطرح.', 'Between the two: subtract.'), math: same('$0{,}8944-0{,}1056=0{,}7888$') }
        ],
        takeaway: say(
            'Taulak $P(Z\\le k)$ ematen du $k\\ge 0$ denean. Gainetik, $P(Z>k)=1-P(Z\\le k)$; simetriagatik, $P(Z\\le -k)=P(Z>k)$; eta bi balioren artean, $P(a\\le Z\\le b)=P(Z\\le b)-P(Z\\le a)$.',
            'La tabla da $P(Z\\le k)$ para $k\\ge 0$. Por encima, $P(Z>k)=1-P(Z\\le k)$; por la simetría, $P(Z\\le -k)=P(Z>k)$, y entre dos valores, $P(a\\le Z\\le b)=P(Z\\le b)-P(Z\\le a)$.',
            'يعطي الجدول $P(Z\\le k)$ عندما $k\\ge 0$. وفوق القيمة $P(Z>k)=1-P(Z\\le k)$؛ وبالتماثل $P(Z\\le -k)=P(Z>k)$؛ وبين قيمتين $P(a\\le Z\\le b)=P(Z\\le b)-P(Z\\le a)$.',
            'The table gives $P(Z\\le k)$ for $k\\ge 0$. Above, $P(Z>k)=1-P(Z\\le k)$; by symmetry, $P(Z\\le -k)=P(Z>k)$; and between two values, $P(a\\le Z\\le b)=P(Z\\le b)-P(Z\\le a)$.'
        ),
        figure: (language) => <TableFigure language={language} />
    },
    {
        id: 'standardize',
        stage: 'normal',
        title: say('Tipifikatzea', 'Tipificar', 'التوحيد المعياري', 'Standardising'),
        goal: say('Edozein $N(\\mu;\\,\\sigma)$ banaketatik $N(0;\\,1)$ banaketara pasatzea ${z}=\\frac{x-\\mu}{\\sigma}$ erabiliz, taula irakurtzeko, eta ehunekoekin problemak ebaztea.', 'Pasar de cualquier $N(\\mu;\\,\\sigma)$ a la $N(0;\\,1)$ con ${z}=\\frac{x-\\mu}{\\sigma}$ para leer la tabla, y resolver problemas con porcentajes.', 'الانتقال من أي $N(\\mu;\\,\\sigma)$ إلى $N(0;\\,1)$ باستعمال ${z}=\\frac{x-\\mu}{\\sigma}$ لقراءة الجدول، وحل مسائل بالنسب.', 'Go from any $N(\\mu;\\,\\sigma)$ to $N(0;\\,1)$ with ${z}=\\frac{x-\\mu}{\\sigma}$ to read the table, and solve problems with percentages.'),
        needs: [need.standardScores],
        problem: say('Autobus-ibilbide baten iraupena $N(40;\\,5)$ da, minututan. Zein da 48 minutu baino gutxiago behar izateko probabilitatea? Eta 35 eta 48 artean?', 'La duración de un trayecto en autobús sigue una $N(40;\\,5)$ en minutos. ¿Qué probabilidad hay de tardar menos de 48 minutos? ¿Y entre 35 y 48?', 'تتبع مدة رحلة بالحافلة التوزيع $N(40;\\,5)$ بالدقائق. ما احتمال أن تستغرق أقل من 48 دقيقة؟ وبين 35 و48؟', 'The length of a bus journey follows $N(40;\\,5)$ in minutes. What is the probability of taking less than 48 minutes? And between 35 and 48?'),
        stepsKind: 'steps',
        steps: [
            { text: say('48 tipifikatzen da: batez bestekotik zenbat $\\sigma$ urrun dagoen.', 'Se tipifica 48: a cuántas $\\sigma$ está de la media.', 'نوحّد 48 معياريًّا: كم $\\sigma$ يبعد عن المتوسط.', 'Standardise 48: how many $\\sigma$ it is from the mean.'), math: same('${z}=\\frac{48-40}{5}=1{,}6$') },
            { text: say('Taulak probabilitatea ematen du.', 'La tabla da la probabilidad.', 'يعطي الجدول الاحتمال.', 'The table gives the probability.'), math: same('$P(X<48)=P(Z<1{,}6)=0{,}9452$') },
            { text: say('35 balioak ${z}=-1$ ematen du, eta azpitik $1-0{,}8413=0{,}1587$ uzten du. 35 eta 48 artean:', '35 da ${z}=-1$, que deja por debajo $1-0{,}8413=0{,}1587$. Entre 35 y 48:', 'تعطي 35 القيمة ${z}=-1$، التي تترك تحتها $1-0{,}8413=0{,}1587$. وبين 35 و48:', '35 gives ${z}=-1$, which leaves $1-0{,}8413=0{,}1587$ below it. Between 35 and 48:'), math: same('$0{,}9452-0{,}1587=0{,}7865$') }
        ],
        takeaway: say(
            '$X\\sim N(\\mu;\\,\\sigma)$ bada, $Z=\\frac{X-\\mu}{\\sigma}$ aldagaia $N(0;\\,1)$ da: $P(X\\le x)=P\\left(Z\\le\\frac{x-\\mu}{\\sigma}\\right)$. Tipifikatu, marraztu kanpaia eta irakurri taula.',
            'Si $X\\sim N(\\mu;\\,\\sigma)$, $Z=\\frac{X-\\mu}{\\sigma}$ es $N(0;\\,1)$: $P(X\\le x)=P\\left(Z\\le\\frac{x-\\mu}{\\sigma}\\right)$. Tipifica, dibuja la campana y lee la tabla.',
            'إذا كان $X\\sim N(\\mu;\\,\\sigma)$ فإن $Z=\\frac{X-\\mu}{\\sigma}$ يتبع $N(0;\\,1)$: $P(X\\le x)=P\\left(Z\\le\\frac{x-\\mu}{\\sigma}\\right)$. وحّد، وارسم الجرس، واقرأ الجدول.',
            'If $X\\sim N(\\mu;\\,\\sigma)$, $Z=\\frac{X-\\mu}{\\sigma}$ is $N(0;\\,1)$: $P(X\\le x)=P\\left(Z\\le\\frac{x-\\mu}{\\sigma}\\right)$. Standardise, draw the bell and read the table.'
        ),
        figureAfterSteps: true,
        figure: (language) => <BusFigure language={language} />
    },
    {
        id: 'inverse-normal',
        stage: 'normal',
        title: say('Taula alderantziz irakurtzea', 'Leer la tabla al revés', 'قراءة الجدول بالعكس', 'Reading the table backwards'),
        goal: say('Probabilitate jakin bat uzten duen $k$ balioa aurkitzea, taularen barruan bilatuz, eta tipifikazioa desegitea $x=\\mu+z\\,\\sigma$ erabiliz.', 'Hallar el valor $k$ que deja una probabilidad dada, buscándola dentro de la tabla, y deshacer la tipificación con $x=\\mu+z\\,\\sigma$.', 'إيجاد القيمة $k$ التي تترك احتمالًا معطى بالبحث عنه داخل الجدول، وعكس التوحيد المعياري باستعمال $x=\\mu+z\\,\\sigma$.', 'Find the value $k$ that leaves a given probability, by looking for it inside the table, and undo the standardising with $x=\\mu+z\\,\\sigma$.'),
        problem: say('Azterketa baten notak $N(6;\\,1{,}5)$ dira. Zein notatik aurrera dago % 10 onena?', 'Las notas de un examen siguen una $N(6;\\,1{,}5)$. ¿A partir de qué nota está el 10 % de las mejores?', 'تتبع علامات امتحان التوزيع $N(6;\\,1{,}5)$. ابتداءً من أي علامة تقع أفضل 10٪؟', 'The marks in an exam follow $N(6;\\,1{,}5)$. From which mark up are the best 10%?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Gainetik % 10 geratzen bada, azpitik % 90 geratzen da.', 'Si el 10 % queda por encima, por debajo queda el 90 %.', 'إذا بقي 10٪ فوق القيمة بقي 90٪ تحتها.', 'If 10% lies above, 90% lies below.'), math: same('$P(Z\\le k)=0{,}9$') },
            { text: say('Taularen barruan, 0,9 zenbakitik hurbilena 0,8997 da: 1,2 errenkada eta 0,08 zutabea.', 'Dentro de la tabla, lo más cercano a 0,9 es 0,8997: fila 1,2 y columna 0,08.', 'داخل الجدول أقرب عدد إلى 0.9 هو 0.8997: الصف 1.2 والعمود 0.08.', 'Inside the table, the closest to 0.9 is 0.8997: row 1.2 and column 0.08.'), math: same('$k=1{,}28$') },
            { text: say('Tipifikazioa desegiten da.', 'Se deshace la tipificación.', 'نعكس التوحيد المعياري.', 'Undo the standardising.'), math: same('$x=6+1{,}28\\cdot 1{,}5=7{,}92$') }
        ],
        takeaway: say(
            'Alderantzizko bilaketan, datua «azpitik geratzen dena» bihurtu, bilatu probabilitate hori taularen barruan eta irakurri $k$. 0,5 baino txikiagoa bada, $k$ negatiboa da, simetriagatik. Azkenik, $x=\\mu+k\\,\\sigma$.',
            'Para la búsqueda inversa, pasa el dato a «lo que queda por debajo», busca esa probabilidad dentro de la tabla y lee $k$. Si es menor que 0,5, $k$ es negativo, por simetría. Al final, $x=\\mu+k\\,\\sigma$.',
            'في البحث العكسي حوّل المعطى إلى «ما يقع تحت»، وابحث عن هذا الاحتمال داخل الجدول، واقرأ $k$. وإذا كان أصغر من 0.5 كان $k$ سالبًا بالتماثل. وفي النهاية $x=\\mu+k\\,\\sigma$.',
            'For the inverse search, turn the data into ‘what lies below’, look for that probability inside the table and read $k$. If it is less than 0.5, $k$ is negative, by symmetry. Finally, $x=\\mu+k\\,\\sigma$.'
        ),
        figureAfterSteps: true,
        figure: (language) => <TopTenFigure language={language} />
    },

    /* ---------- 5. Approximating the binomial by the normal ---------- */
    {
        id: 'binomial-to-normal',
        stage: 'approximation',
        title: say('Binomiala, normal baten antzekoa', 'La binomial se parece a una normal', 'التوزيع الثنائي يشبه الطبيعي', 'The binomial looks like a normal'),
        goal: say('$B(n;\\,p)$ bat noiz hurbil daitekeen normal batez jakitea ($np\\ge 5$ eta $nq\\ge 5$) eta zeinez: $N(np;\\,\\sqrt{npq})$.', 'Saber cuándo una $B(n;\\,p)$ se puede aproximar por una normal ($np\\ge 5$ y $nq\\ge 5$) y por cuál: $N(np;\\,\\sqrt{npq})$.', 'معرفة متى يمكن تقريب $B(n;\\,p)$ بتوزيع طبيعي ($np\\ge 5$ و$nq\\ge 5$) وبأيّها: $N(np;\\,\\sqrt{npq})$.', 'Know when a $B(n;\\,p)$ can be approximated by a normal ($np\\ge 5$ and $nq\\ge 5$) and by which one: $N(np;\\,\\sqrt{npq})$.'),
        problem: say('Test batek 48 galdera ditu, bakoitza 4 aukerakoa, eta zoriz erantzuten da. Asmatze kopurua normal batez hurbil daiteke? Zeinez?', 'Un test tiene 48 preguntas de 4 opciones y se contesta al azar. ¿Se puede aproximar el número de aciertos por una normal? ¿Por cuál?', 'في اختبار 48 سؤالًا لكل منها 4 خيارات، ويُجاب عنه عشوائيًّا. هل يمكن تقريب عدد الإجابات الصحيحة بتوزيع طبيعي؟ بأيّها؟', 'A test has 48 questions with 4 options each and is answered at random. Can the number of right answers be approximated by a normal? By which one?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Asmatzeak binomial bat dira.', 'Los aciertos son una binomial.', 'الإجابات الصحيحة توزيع ثنائي.', 'The right answers are a binomial.'), math: same('$X\\sim B(48;\\,0{,}25)$') },
            { text: say('Baldintza egiaztatzen da.', 'Se comprueba la condición.', 'نتحقق من الشرط.', 'Check the condition.'), math: same('$np=12\\ge 5\\qquad nq=36\\ge 5$') },
            { text: say('Batez besteko eta desbideratze berak: $N(12;\\,3)$.', 'La misma media y la misma desviación: $N(12;\\,3)$.', 'المتوسط نفسه والانحراف نفسه: $N(12;\\,3)$.', 'The same mean and the same deviation: $N(12;\\,3)$.'), math: same('$\\sigma=\\sqrt{48\\cdot 0{,}25\\cdot 0{,}75}=3$') }
        ],
        takeaway: say(
            '$np\\ge 5$ eta $nq\\ge 5$ badira, $B(n;\\,p)$ banaketaren barrek kanpai bati jarraitzen diote: $N(np;\\,\\sqrt{npq})$ normalarenari, batez besteko eta desbideratze berekoari. Horrela, $n$ handiko binomialak kalkulatzen dira dozenaka gai batu gabe.',
            'Si $np\\ge 5$ y $nq\\ge 5$, las barras de $B(n;\\,p)$ siguen una campana: la de $N(np;\\,\\sqrt{npq})$, con su misma media y su misma desviación. Así se calculan binomiales con $n$ grande sin sumar decenas de términos.',
            'إذا كان $np\\ge 5$ و$nq\\ge 5$ اتبعت أعمدة $B(n;\\,p)$ جرسًا: جرس $N(np;\\,\\sqrt{npq})$ ذي المتوسط والانحراف نفسيهما. وهكذا تُحسب التوزيعات الثنائية ذات $n$ الكبير دون جمع عشرات الحدود.',
            'If $np\\ge 5$ and $nq\\ge 5$, the bars of $B(n;\\,p)$ follow a bell: that of $N(np;\\,\\sqrt{npq})$, with its same mean and its same deviation. This is how binomials with a large $n$ are worked out without adding dozens of terms.'
        ),
        figureAfterSteps: true,
        figure: (language) => <BarsBellFigure language={language} />
    },
    {
        id: 'continuity',
        stage: 'approximation',
        title: say('Jarraitutasun-zuzenketa', 'La corrección de continuidad', 'تصحيح الاتصال', 'The continuity correction'),
        goal: say('Binomial baten probabilitateak normalarekin hurbiltzea, balio oso bakoitza puntu erdi zabalduz alde bakoitzean, eta tipifikatzea.', 'Aproximar probabilidades de una binomial con la normal, ensanchando cada valor entero medio punto a cada lado, y tipificar.', 'تقريب احتمالات توزيع ثنائي بالطبيعي، بتوسيع كل قيمة صحيحة نصف وحدة من كل جهة، ثم التوحيد المعياري.', 'Approximate probabilities of a binomial with the normal, widening each whole value half a unit on each side, and standardise.'),
        problem: say('Txanpon bat 100 aldiz botatzen da. Kalkulatu, normalarekin, gutxienez 60 aurpegi ateratzeko probabilitatea.', 'Se lanza una moneda 100 veces. Calcula, con la normal, la probabilidad de sacar al menos 60 caras.', 'تُرمى قطعة نقود 100 مرة. احسب بالتوزيع الطبيعي احتمال ظهور 60 وجهًا على الأقل.', 'A coin is tossed 100 times. Using the normal, work out the probability of at least 60 heads.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$X\\sim B(100;\\,0{,}5)$ banaketa $N(50;\\,5)$ banaketaz hurbiltzen da.', '$X\\sim B(100;\\,0{,}5)$ se aproxima por $N(50;\\,5)$.', 'يُقرَّب $X\\sim B(100;\\,0{,}5)$ بـ $N(50;\\,5)$.', '$X\\sim B(100;\\,0{,}5)$ is approximated by $N(50;\\,5)$.'), math: same('$\\mu=50\\qquad\\sigma=\\sqrt{25}=5$') },
            { text: say('60 balioa 59,5 eta 60,5 arteko barra bat da: «gutxienez 60» 59,5 puntuan hasten da.', 'El valor 60 es una barra de 59,5 a 60,5: «al menos 60» empieza en 59,5.', 'القيمة 60 عمود من 59.5 إلى 60.5: «60 على الأقل» يبدأ عند 59.5.', 'The value 60 is a bar from 59.5 to 60.5: ‘at least 60’ starts at 59.5.'), math: same('$P(X\\ge 60)\\approx P(Y\\ge 59{,}5)$') },
            { text: say('Tipifikatu egiten da.', 'Se tipifica.', 'نوحّد معياريًّا.', 'Standardise.'), math: same('${z}=\\frac{59{,}5-50}{5}=1{,}9$') },
            { text: say('Taularekin, gainetik geratzen dena.', 'Con la tabla, lo que queda por encima.', 'بالجدول: ما يبقى فوق.', 'With the table, what lies above.'), math: same('$P(Z\\ge 1{,}9)=1-0{,}9713=0{,}0287$') }
        ],
        takeaway: say(
            'Binomialaren $k$ balio oso bakoitza $k-0{,}5$ puntutik $k+0{,}5$ punturaino doan barra bat da. Horrela, $P(X\\le k)\\approx P(Y\\le k+0{,}5)$, $P(X\\ge k)\\approx P(Y\\ge k-0{,}5)$ eta $P(X=k)\\approx P(k-0{,}5\\le Y\\le k+0{,}5)$.',
            'Cada valor entero $k$ de la binomial es una barra de $k-0{,}5$ a $k+0{,}5$. Así, $P(X\\le k)\\approx P(Y\\le k+0{,}5)$, $P(X\\ge k)\\approx P(Y\\ge k-0{,}5)$ y $P(X=k)\\approx P(k-0{,}5\\le Y\\le k+0{,}5)$.',
            'كل قيمة صحيحة $k$ للتوزيع الثنائي عمود من $k-0{,}5$ إلى $k+0{,}5$. وهكذا $P(X\\le k)\\approx P(Y\\le k+0{,}5)$ و$P(X\\ge k)\\approx P(Y\\ge k-0{,}5)$ و$P(X=k)\\approx P(k-0{,}5\\le Y\\le k+0{,}5)$.',
            'Each whole value $k$ of the binomial is a bar from $k-0{,}5$ to $k+0{,}5$. So $P(X\\le k)\\approx P(Y\\le k+0{,}5)$, $P(X\\ge k)\\approx P(Y\\ge k-0{,}5)$ and $P(X=k)\\approx P(k-0{,}5\\le Y\\le k+0{,}5)$.'
        ),
        figureAfterSteps: true,
        figure: (language) => <HalfStepFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const distributionsBatx2Topics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...distributionsBatx2LessonTexts[topic.id as DistributionsBatx2TopicId], ...distributionsBatx2LessonChecks[topic.id as DistributionsBatx2TopicId] }))
