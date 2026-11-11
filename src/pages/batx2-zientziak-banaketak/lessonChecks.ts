import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Banaketak · Batxilergoa 2 · Zientziak — the typical mistake and the
   «Check it» question of every lesson. Plain data (no JSX) so the tests can
   import it; lessons.tsx merges it into the topics. The questions use new
   numbers, never those of «Let's solve» or of the example, and one of
   their wrong answers is the lesson's typical mistake. The values of the
   normal table come from normal.ts (the tests check them).
   ========================================================================== */

export type DistributionsBatx2TopicId =
    | 'review-combinatorial' | 'review-mean-sd'
    | 'random-variable' | 'mean-variance' | 'expected-value'
    | 'is-binomial' | 'binomial-formula' | 'binomial-parameters'
    | 'density' | 'normal-curve' | 'standard-table' | 'standardize' | 'inverse-normal'
    | 'binomial-to-normal' | 'continuity'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const distributionsBatx2LessonChecks: Record<DistributionsBatx2TopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Before you start: review ---------- */
    'review-combinatorial': {
        mistake: {
            wrong: say('6 elementutatik 3 aukeratzeko, $\\binom{6}{3}=6\\cdot 5\\cdot 4=120$.', 'Para elegir 3 de 6, $\\binom{6}{3}=6\\cdot 5\\cdot 4=120$.', 'لاختيار 3 من 6: $\\binom{6}{3}=6\\cdot 5\\cdot 4=120$.', 'To choose 3 out of 6, $\\binom{6}{3}=6\\cdot 5\\cdot 4=120$.'),
            right: say('Hori ordenarekin zenbatzea da; ordenarik gabe $3!$ zenbakiaz zatitzen da: $\\binom{6}{3}=\\frac{120}{6}=20$.', 'Eso cuenta con orden; sin orden se divide entre $3!$: $\\binom{6}{3}=\\frac{120}{6}=20$.', 'هذا عدّ مع الترتيب؛ ودون ترتيب نقسم على $3!$: $\\binom{6}{3}=\\frac{120}{6}=20$.', 'That counts with order; without order divide by $3!$: $\\binom{6}{3}=\\frac{120}{6}=20$.')
        },
        check: {
            prompt: say('Test batek 5 galdera ditu. Zenbat modutan asma daitezke zehazki 2?', 'Un test tiene 5 preguntas. ¿De cuántas formas se pueden acertar exactamente 2?', 'في اختبار 5 أسئلة. بكم طريقة يمكن إصابة سؤالين بالضبط؟', 'A test has 5 questions. In how many ways can exactly 2 be right?'),
            options: [same('$10$'), same('$20$'), same('$32$')],
            correctIndex: 0,
            explanation: say('Asmatutako 2 galderak ordenarik gabe aukeratzen dira: $\\binom{5}{2}=\\frac{5\\cdot 4}{2}=10$. 20 ordenarekin zenbatzea litzateke.', 'Se eligen las 2 acertadas sin orden: $\\binom{5}{2}=\\frac{5\\cdot 4}{2}=10$. 20 sería contando con orden.', 'نختار السؤالين الصحيحين دون ترتيب: $\\binom{5}{2}=\\frac{5\\cdot 4}{2}=10$. و20 عدّ مع الترتيب.', 'The 2 right ones are chosen with no order: $\\binom{5}{2}=\\frac{5\\cdot 4}{2}=10$. 20 would be counting with order.')
        }
    },
    'review-mean-sd': {
        mistake: {
            wrong: say('$\\bar{x}=3$ eta $\\sum x_i^2\\,h_i=10{,}5$ badira, bariantza 10,5 da.', 'Si $\\bar{x}=3$ y $\\sum x_i^2\\,h_i=10{,}5$, la varianza es 10,5.', 'إذا كان $\\bar{x}=3$ و$\\sum x_i^2\\,h_i=10{,}5$ فالتباين 10.5.', 'If $\\bar{x}=3$ and $\\sum x_i^2\\,h_i=10{,}5$, the variance is 10.5.'),
            right: say('Batez bestekoaren karratua kendu behar da: $\\sigma^2=10{,}5-3^2=1{,}5$.', 'Falta restar el cuadrado de la media: $\\sigma^2=10{,}5-3^2=1{,}5$.', 'ينقص طرح مربع المتوسط: $\\sigma^2=10{,}5-3^2=1{,}5$.', 'The square of the mean has to be subtracted: $\\sigma^2=10{,}5-3^2=1{,}5$.')
        },
        check: {
            prompt: say('Aldagai batek 1 balio du kasuen erdietan, eta 3 beste erdietan. Zenbat da $\\sigma$?', 'Una variable vale 1 la mitad de las veces y 3 la otra mitad. ¿Cuánto vale $\\sigma$?', 'يأخذ متغير القيمة 1 في نصف المرات و3 في النصف الآخر. كم يساوي $\\sigma$؟', 'A variable is 1 half of the time and 3 the other half. What is $\\sigma$?'),
            options: [same('$5$'), same('$1$'), same('$2$')],
            correctIndex: 1,
            explanation: say('Batez bestekoa 2 da; $\\sigma^2=1\\cdot 0{,}5+9\\cdot 0{,}5-2^2=1$, eta $\\sigma=1$. 5 ateratzen da $2^2$ kentzen ez bada.', 'La media es 2; $\\sigma^2=1\\cdot 0{,}5+9\\cdot 0{,}5-2^2=1$, y $\\sigma=1$. El 5 sale si no se resta $2^2$.', 'المتوسط 2؛ $\\sigma^2=1\\cdot 0{,}5+9\\cdot 0{,}5-2^2=1$، و$\\sigma=1$. ونحصل على 5 إذا لم نطرح $2^2$.', 'The mean is 2; $\\sigma^2=1\\cdot 0{,}5+9\\cdot 0{,}5-2^2=1$, and $\\sigma=1$. 5 comes out if $2^2$ is not subtracted.')
        }
    },

    /* ---------- 2. Discrete random variables ---------- */
    'random-variable': {
        mistake: {
            wrong: same('$P(X<2)=P(X=0)+P(X=1)+P(X=2)$'),
            right: say('$<$ ikurrarekin 2 ez da sartzen: $P(X<2)=P(X=0)+P(X=1)$.', 'Con $<$ el 2 no entra: $P(X<2)=P(X=0)+P(X=1)$.', 'مع $<$ لا يدخل 2: $P(X<2)=P(X=0)+P(X=1)$.', 'With $<$ the 2 is left out: $P(X<2)=P(X=0)+P(X=1)$.')
        },
        check: {
            prompt: say('$X$ aldagaiak 0, 1, 2 eta 3 hartzen ditu, 0,1; 0,4; 0,3 eta 0,2 probabilitateekin. Zenbat da $P(X<2)$?', '$X$ toma 0, 1, 2 y 3 con probabilidades 0,1; 0,4; 0,3 y 0,2. ¿Cuánto vale $P(X<2)$?', 'يأخذ $X$ القيم 0 و1 و2 و3 باحتمالات 0.1 و0.4 و0.3 و0.2. كم يساوي $P(X<2)$؟', '$X$ takes 0, 1, 2 and 3 with probabilities 0.1, 0.4, 0.3 and 0.2. What is $P(X<2)$?'),
            options: [same('$0{,}8$'), same('$0{,}3$'), same('$0{,}5$')],
            correctIndex: 2,
            explanation: say('$P(X<2)=0{,}1+0{,}4=0{,}5$. 0,8 emaitzak 2 barne hartzen du, eta hark ez du $X<2$ betetzen.', '$P(X<2)=0{,}1+0{,}4=0{,}5$. 0,8 incluye el 2, que no cumple $X<2$.', '$P(X<2)=0{,}1+0{,}4=0{,}5$. و0.8 يضمّ 2، وهو لا يحقق $X<2$.', '$P(X<2)=0{,}1+0{,}4=0{,}5$. 0.8 includes the 2, which does not satisfy $X<2$.')
        }
    },
    'mean-variance': {
        mistake: {
            wrong: say('$X$ aldagaiak 0, 1 edo 2 balio badu, batez bestekoa $\\frac{0+1+2}{3}=1$ da.', 'Si $X$ vale 0, 1 o 2, su media es $\\frac{0+1+2}{3}=1$.', 'إذا أخذ $X$ القيم 0 أو 1 أو 2 فمتوسطه $\\frac{0+1+2}{3}=1$.', 'If $X$ is 0, 1 or 2, its mean is $\\frac{0+1+2}{3}=1$.'),
            right: say('Hiru balioak berdin probableak badira bakarrik. Balio bakoitzak bere probabilitatearen pisua du: $\\mu=\\sum x_i\\,p_i$.', 'Solo si los tres valores son igual de probables. Cada valor pesa su probabilidad: $\\mu=\\sum x_i\\,p_i$.', 'هذا فقط إذا كانت القيم الثلاث متساوية الاحتمال. كل قيمة تُوزن باحتمالها: $\\mu=\\sum x_i\\,p_i$.', 'Only if the three values are equally likely. Each value is weighted by its probability: $\\mu=\\sum x_i\\,p_i$.')
        },
        check: {
            prompt: say('$X$ aldagaiak 0 balio du 0,8 probabilitatearekin, eta 10, 0,2 probabilitatearekin. Zenbat da $\\mu$?', '$X$ vale 0 con probabilidad 0,8 y 10 con probabilidad 0,2. ¿Cuánto vale $\\mu$?', 'يأخذ $X$ القيمة 0 باحتمال 0.8 والقيمة 10 باحتمال 0.2. كم يساوي $\\mu$؟', '$X$ is 0 with probability 0.8 and 10 with probability 0.2. What is $\\mu$?'),
            options: [same('$5$'), same('$2$'), same('$8$')],
            correctIndex: 1,
            explanation: say('$\\mu=0\\cdot 0{,}8+10\\cdot 0{,}2=2$. 5 litzateke 0 eta 10 balioen batez bestekoa, probabilitateak kontuan hartu gabe.', '$\\mu=0\\cdot 0{,}8+10\\cdot 0{,}2=2$. 5 sería la media de 0 y 10 sin pesar las probabilidades.', '$\\mu=0\\cdot 0{,}8+10\\cdot 0{,}2=2$. و5 متوسط 0 و10 دون وزن الاحتمالات.', '$\\mu=0\\cdot 0{,}8+10\\cdot 0{,}2=2$. 5 would be the mean of 0 and 10 without weighting the probabilities.')
        }
    },
    'expected-value': {
        mistake: {
            wrong: say('Irabazteak eta galtzeak probabilitate bera badute, jokoa bidezkoa da.', 'Si ganar y perder son igual de probables, el juego es justo.', 'إذا تساوى احتمال الربح والخسارة فاللعبة عادلة.', 'If winning and losing are equally likely, the game is fair.'),
            right: say('Zenbat irabazten eta galtzen den begiratu behar da: erdietan 5 euro irabazi eta erdietan 3 euro galduz, $5\\cdot 0{,}5-3\\cdot 0{,}5=1$.', 'Hay que mirar cuánto se gana y se pierde: ganando 5 € la mitad de las veces y perdiendo 3 € la otra mitad, $5\\cdot 0{,}5-3\\cdot 0{,}5=1$.', 'يجب النظر إلى مقدار الربح والخسارة: بربح 5 € في نصف المرات وخسارة 3 € في النصف الآخر، $5\\cdot 0{,}5-3\\cdot 0{,}5=1$.', 'Look at how much is won and lost: winning €5 half the time and losing €3 the other half, $5\\cdot 0{,}5-3\\cdot 0{,}5=1$.')
        },
        check: {
            prompt: say('Jokatzeak euro 1 balio du. Bi txanpon botatzen dira, eta bi aurpegi ateratzen badira, 4 euro ematen dizkizute. Zein da irabaziaren itxaropena?', 'Jugar cuesta 1 €. Se lanzan dos monedas y, si salen dos caras, te dan 4 €. ¿Cuál es la ganancia esperada?', 'تكلّف المشاركة 1 €. تُرمى قطعتا نقود، وإذا ظهر وجهان تأخذ 4 €. ما الربح المتوقع؟', 'Playing costs €1. Two coins are tossed and, if two heads come up, you get €4. What is the expected gain?'),
            options: [same('$1$'), same('$3$'), same('$0$')],
            correctIndex: 2,
            explanation: say('$4\\cdot\\frac{1}{4}-1=0$: jokoa bidezkoa da. 3 bi aurpegi ateratzen direnean bakarrik irabazten da.', '$4\\cdot\\frac{1}{4}-1=0$: el juego es equitativo. 3 es lo que se gana solo cuando salen dos caras.', '$4\\cdot\\frac{1}{4}-1=0$: اللعبة عادلة. و3 هو الربح عند ظهور وجهين فقط.', '$4\\cdot\\frac{1}{4}-1=0$: the game is fair. 3 is what you win only when two heads come up.')
        }
    },

    /* ---------- 3. The binomial distribution ---------- */
    'is-binomial': {
        mistake: {
            wrong: say('Kutxa batetik 4 bola itzuli gabe atera eta gorriak zenbatzea binomiala da.', 'Sacar 4 bolas sin devolución de una urna y contar las rojas es una binomial.', 'سحب 4 كرات من جرّة دون إرجاع وعدّ الحمراء توزيع ثنائي.', 'Drawing 4 balls from an urn without replacement and counting the red ones is a binomial.'),
            right: say('Itzuli gabe, gorriaren probabilitatea aldatu egiten da ateratze bakoitzean: ez da binomiala. Itzulita, bai.', 'Sin devolución, la probabilidad de roja cambia en cada extracción: no es binomial. Con devolución, sí.', 'دون إرجاع يتغيّر احتمال الحمراء في كل سحبة: ليس ثنائيًّا. ومع الإرجاع نعم.', 'Without replacement, the probability of red changes at each draw: it is not binomial. With replacement, it is.')
        },
        check: {
            prompt: say('Aldagai hauetatik zein da binomiala?', '¿Cuál de estas variables es binomial?', 'أيّ هذه المتغيرات ثنائي؟', 'Which of these variables is binomial?'),
            options: [
                say('Batekoak, 5 karta itzuli gabe ateratzean', 'Ases al sacar 5 cartas sin devolver', 'الآسات عند سحب 5 أوراق دون إرجاع', 'Aces when 5 cards are drawn without replacement'),
                say('Seiak, dado bat 5 aldiz botatzean', 'Seises al lanzar un dado 5 veces', 'مرات ظهور 6 عند رمي نرد 5 مرات', 'Sixes when a die is rolled 5 times'),
                say('Botaldiak, lehen 6 atera arte', 'Lanzamientos hasta el primer 6', 'الرميات حتى ظهور أول 6', 'Rolls until the first 6')
            ],
            correctIndex: 1,
            explanation: say('5 botaldiak independenteak dira, eta beti $p=\\frac{1}{6}$: $B(5;\\,\\frac{1}{6})$. Itzuli gabe $p$ aldatu egiten da, eta besteak ez du $n$ finkorik.', 'Los 5 lanzamientos son independientes y siempre $p=\\frac{1}{6}$: $B(5;\\,\\frac{1}{6})$. Sin devolución $p$ cambia, y en la otra no hay un $n$ fijo.', 'الرميات الخمس مستقلة ودائمًا $p=\\frac{1}{6}$: $B(5;\\,\\frac{1}{6})$. ودون إرجاع يتغيّر $p$، وفي الأخرى لا يوجد $n$ ثابت.', 'The 5 rolls are independent and always $p=\\frac{1}{6}$: $B(5;\\,\\frac{1}{6})$. Without replacement $p$ changes, and the other has no fixed $n$.')
        }
    },
    'binomial-formula': {
        mistake: {
            wrong: say('$B(6;\\,0{,}3)$ banaketan, $P(X=2)=0{,}3^2\\cdot 0{,}7^4$.', 'En $B(6;\\,0{,}3)$, $P(X=2)=0{,}3^2\\cdot 0{,}7^4$.', 'في $B(6;\\,0{,}3)$، $P(X=2)=0{,}3^2\\cdot 0{,}7^4$.', 'In $B(6;\\,0{,}3)$, $P(X=2)=0{,}3^2\\cdot 0{,}7^4$.'),
            right: say('$\\binom{6}{2}=15$ ordenak falta dira: $P(X=2)=15\\cdot 0{,}3^2\\cdot 0{,}7^4$.', 'Faltan los $\\binom{6}{2}=15$ órdenes: $P(X=2)=15\\cdot 0{,}3^2\\cdot 0{,}7^4$.', 'تنقص الترتيبات $\\binom{6}{2}=15$: $P(X=2)=15\\cdot 0{,}3^2\\cdot 0{,}7^4$.', 'The $\\binom{6}{2}=15$ orders are missing: $P(X=2)=15\\cdot 0{,}3^2\\cdot 0{,}7^4$.')
        },
        check: {
            prompt: say('Dado bat 3 aldiz botatzen da. Zein da zehazki 6 bat ateratzeko probabilitatea?', 'Se lanza un dado 3 veces. ¿Qué probabilidad hay de sacar exactamente un 6?', 'يُرمى نرد 3 مرات. ما احتمال ظهور 6 مرة واحدة بالضبط؟', 'A die is rolled 3 times. What is the probability of exactly one 6?'),
            options: [same('$\\frac{25}{216}$'), same('$\\frac{1}{2}$'), same('$\\frac{25}{72}$')],
            correctIndex: 2,
            explanation: say('$3\\cdot\\frac{1}{6}\\cdot\\frac{25}{36}=\\frac{75}{216}=\\frac{25}{72}$. Ordenen 3 hori gabe, $\\frac{25}{216}$ aterako litzateke.', '$3\\cdot\\frac{1}{6}\\cdot\\frac{25}{36}=\\frac{75}{216}=\\frac{25}{72}$. Sin el 3 de los órdenes saldría $\\frac{25}{216}$.', '$3\\cdot\\frac{1}{6}\\cdot\\frac{25}{36}=\\frac{75}{216}=\\frac{25}{72}$. ودون العدد 3 للترتيبات نحصل على $\\frac{25}{216}$.', '$3\\cdot\\frac{1}{6}\\cdot\\frac{25}{36}=\\frac{75}{216}=\\frac{25}{72}$. Without the 3 of the orders you would get $\\frac{25}{216}$.')
        }
    },
    'binomial-parameters': {
        mistake: {
            wrong: say('$B(50;\\,0{,}5)$ banaketan, $\\sigma=50\\cdot 0{,}5\\cdot 0{,}5=12{,}5$.', 'En $B(50;\\,0{,}5)$, $\\sigma=50\\cdot 0{,}5\\cdot 0{,}5=12{,}5$.', 'في $B(50;\\,0{,}5)$، $\\sigma=50\\cdot 0{,}5\\cdot 0{,}5=12{,}5$.', 'In $B(50;\\,0{,}5)$, $\\sigma=50\\cdot 0{,}5\\cdot 0{,}5=12{,}5$.'),
            right: say('Hori bariantza da; desbideratzea haren erroa da: $\\sigma=\\sqrt{12{,}5}\\approx 3{,}54$.', 'Eso es la varianza; la desviación es su raíz: $\\sigma=\\sqrt{12{,}5}\\approx 3{,}54$.', 'هذا هو التباين؛ والانحراف جذره: $\\sigma=\\sqrt{12{,}5}\\approx 3{,}54$.', 'That is the variance; the deviation is its root: $\\sigma=\\sqrt{12{,}5}\\approx 3{,}54$.')
        },
        check: {
            prompt: say('$X$ aldagaia $B(400;\\,0{,}5)$ da. Zenbat da haren desbideratze tipikoa?', '$X$ sigue una $B(400;\\,0{,}5)$. ¿Cuánto vale su desviación típica?', 'يتبع $X$ التوزيع $B(400;\\,0{,}5)$. كم يساوي انحرافه المعياري؟', '$X$ follows $B(400;\\,0{,}5)$. What is its standard deviation?'),
            options: [same('$100$'), same('$10$'), same('$200$')],
            correctIndex: 1,
            explanation: say('$\\sigma^2=400\\cdot 0{,}5\\cdot 0{,}5=100$, eta $\\sigma=10$. 100 bariantza da, eta 200, batez bestekoa.', '$\\sigma^2=400\\cdot 0{,}5\\cdot 0{,}5=100$, y $\\sigma=10$. 100 es la varianza, y 200, la media.', '$\\sigma^2=400\\cdot 0{,}5\\cdot 0{,}5=100$، و$\\sigma=10$. و100 هو التباين، و200 هو المتوسط.', '$\\sigma^2=400\\cdot 0{,}5\\cdot 0{,}5=100$, and $\\sigma=10$. 100 is the variance, and 200, the mean.')
        }
    },

    /* ---------- 4. Continuous variables and the normal ---------- */
    density: {
        mistake: {
            wrong: say('$f(x)=k$ bada 2 eta 6 artean, orduan $k=\\frac{1}{6}$.', 'Si $f(x)=k$ entre 2 y 6, entonces $k=\\frac{1}{6}$.', 'إذا كان $f(x)=k$ بين 2 و6 فإن $k=\\frac{1}{6}$.', 'If $f(x)=k$ between 2 and 6, then $k=\\frac{1}{6}$.'),
            right: say('Azalera oinarria bider altuera da, eta oinarriak $6-2=4$ neurtzen du: $k=\\frac{1}{4}$.', 'El área es base por altura, y la base mide $6-2=4$: $k=\\frac{1}{4}$.', 'المساحة هي القاعدة في الارتفاع، والقاعدة $6-2=4$: $k=\\frac{1}{4}$.', 'The area is base times height, and the base is $6-2=4$: $k=\\frac{1}{4}$.')
        },
        check: {
            prompt: say('Dentsitate batek $k$ balio du 3 eta 8 artean, eta 0 kanpoan. Zenbat da $k$?', 'Una densidad vale $k$ entre 3 y 8, y 0 fuera. ¿Cuánto vale $k$?', 'كثافة تساوي $k$ بين 3 و8، و0 خارج ذلك. كم يساوي $k$؟', 'A density is $k$ between 3 and 8, and 0 outside. What is $k$?'),
            options: [same('$\\frac{1}{8}$'), same('$\\frac{1}{5}$'), same('$\\frac{1}{3}$')],
            correctIndex: 1,
            explanation: say('Oinarriak $8-3=5$ neurtzen du, eta azalera 1 da: $5k=1$, $k=\\frac{1}{5}$.', 'La base mide $8-3=5$ y el área es 1: $5k=1$, $k=\\frac{1}{5}$.', 'القاعدة $8-3=5$ والمساحة 1: $5k=1$، $k=\\frac{1}{5}$.', 'The base is $8-3=5$ and the area is 1: $5k=1$, $k=\\frac{1}{5}$.')
        }
    },
    'normal-curve': {
        mistake: {
            wrong: say('$N(50;\\,10)$ banaketan, datuen erdia 40 eta 60 artean dago.', 'En una $N(50;\\,10)$, la mitad de los datos está entre 40 y 60.', 'في $N(50;\\,10)$ يقع نصف البيانات بين 40 و60.', 'In $N(50;\\,10)$, half the data lie between 40 and 60.'),
            right: say('$\\mu-\\sigma$ eta $\\mu+\\sigma$ artean % 68,26 dago; erdia $\\mu=50$ azpitik geratzen dena da.', 'Entre $\\mu-\\sigma$ y $\\mu+\\sigma$ está el 68,26 %; la mitad es lo que queda por debajo de $\\mu=50$.', 'بين $\\mu-\\sigma$ و$\\mu+\\sigma$ يقع 68.26٪؛ والنصف هو ما يقع تحت $\\mu=50$.', 'Between $\\mu-\\sigma$ and $\\mu+\\sigma$ lies 68.26%; half is what lies below $\\mu=50$.')
        },
        check: {
            prompt: say('$X$ aldagaia $N(60;\\,5)$ da. Zein da $X$ aldagaia 55 eta 65 artean egoteko probabilitatea?', '$X$ sigue una $N(60;\\,5)$. ¿Qué probabilidad hay de que $X$ esté entre 55 y 65?', 'يتبع $X$ التوزيع $N(60;\\,5)$. ما احتمال أن يكون $X$ بين 55 و65؟', '$X$ follows $N(60;\\,5)$. What is the probability that $X$ is between 55 and 65?'),
            options: [same('$0{,}5$'), same('$0{,}9544$'), same('$0{,}6826$')],
            correctIndex: 2,
            explanation: say('55 eta 65, $\\mu-\\sigma$ eta $\\mu+\\sigma$ dira: 0,6826. 0,9544 litzateke 50 eta 70 artean.', '55 y 65 son $\\mu-\\sigma$ y $\\mu+\\sigma$: 0,6826. 0,9544 sería entre 50 y 70.', '55 و65 هما $\\mu-\\sigma$ و$\\mu+\\sigma$: 0.6826. و0.9544 بين 50 و70.', '55 and 65 are $\\mu-\\sigma$ and $\\mu+\\sigma$: 0.6826. 0.9544 would be between 50 and 70.')
        }
    },
    'standard-table': {
        mistake: {
            wrong: say('$P(Z\\le -0{,}8)=0{,}7881$, $P(Z\\le 0{,}8)$ bezala.', '$P(Z\\le -0{,}8)=0{,}7881$, lo mismo que $P(Z\\le 0{,}8)$.', '$P(Z\\le -0{,}8)=0{,}7881$، مثل $P(Z\\le 0{,}8)$.', '$P(Z\\le -0{,}8)=0{,}7881$, the same as $P(Z\\le 0{,}8)$.'),
            right: say('Simetriagatik, eskuineko isatsa da: $P(Z\\le -0{,}8)=1-0{,}7881=0{,}2119$.', 'Por simetría es la cola de la derecha: $P(Z\\le -0{,}8)=1-0{,}7881=0{,}2119$.', 'بالتماثل هو الذيل الأيمن: $P(Z\\le -0{,}8)=1-0{,}7881=0{,}2119$.', 'By symmetry it is the right-hand tail: $P(Z\\le -0{,}8)=1-0{,}7881=0{,}2119$.')
        },
        check: {
            prompt: say('Taulan, $P(Z\\le 1{,}1)=0{,}8643$. Zenbat da $P(Z>1{,}1)$?', 'Con la tabla, $P(Z\\le 1{,}1)=0{,}8643$. ¿Cuánto vale $P(Z>1{,}1)$?', 'من الجدول $P(Z\\le 1{,}1)=0{,}8643$. كم يساوي $P(Z>1{,}1)$؟', 'From the table, $P(Z\\le 1{,}1)=0{,}8643$. What is $P(Z>1{,}1)$?'),
            options: [same('$0{,}1357$'), same('$0{,}8643$'), same('$0{,}3643$')],
            correctIndex: 0,
            explanation: say('Gainetik aurkakoa dago: $P(Z>1{,}1)=1-0{,}8643=0{,}1357$.', 'Por encima está el contrario: $P(Z>1{,}1)=1-0{,}8643=0{,}1357$.', 'فوقها المعاكس: $P(Z>1{,}1)=1-0{,}8643=0{,}1357$.', 'Above it is the complement: $P(Z>1{,}1)=1-0{,}8643=0{,}1357$.')
        }
    },
    standardize: {
        mistake: {
            wrong: say('$N(20;\\,2)$ banaketan, $x=24$ balioak ${z}=\\frac{24-20}{4}=1$ ematen du.', 'En $N(20;\\,2)$, $x=24$ da ${z}=\\frac{24-20}{4}=1$.', 'في $N(20;\\,2)$ تعطي $x=24$ القيمة ${z}=\\frac{24-20}{4}=1$.', 'In $N(20;\\,2)$, $x=24$ gives ${z}=\\frac{24-20}{4}=1$.'),
            right: say('$\\sigma=2$ zenbakiaz zatitzen da, ez 4 bariantzaz: ${z}=\\frac{24-20}{2}=2$.', 'Se divide entre $\\sigma=2$, no entre la varianza 4: ${z}=\\frac{24-20}{2}=2$.', 'نقسم على $\\sigma=2$ لا على التباين 4: ${z}=\\frac{24-20}{2}=2$.', 'Divide by $\\sigma=2$, not by the variance 4: ${z}=\\frac{24-20}{2}=2$.')
        },
        check: {
            prompt: say('$X$ aldagaia $N(70;\\,8)$ da. Zein da $x=82$ balioaren puntuazio tipikoa?', '$X$ sigue una $N(70;\\,8)$. ¿Cuál es la puntuación típica de $x=82$?', 'يتبع $X$ التوزيع $N(70;\\,8)$. ما الدرجة المعيارية للقيمة $x=82$؟', '$X$ follows $N(70;\\,8)$. What is the standard score of $x=82$?'),
            options: [same('$12$'), same('$1{,}5$'), same('$0{,}1875$')],
            correctIndex: 1,
            explanation: say('${z}=\\frac{82-70}{8}=1{,}5$. 12 zatitu gabeko distantzia da, eta 0,1875 64 bariantzaz zatituz ateratzen da.', '${z}=\\frac{82-70}{8}=1{,}5$. 12 es la distancia sin dividir, y 0,1875 sale dividiendo entre la varianza 64.', '${z}=\\frac{82-70}{8}=1{,}5$. و12 هي المسافة دون قسمة، و0.1875 نحصل عليه بالقسمة على التباين 64.', '${z}=\\frac{82-70}{8}=1{,}5$. 12 is the distance without dividing, and 0.1875 comes from dividing by the variance 64.')
        }
    },
    'inverse-normal': {
        mistake: {
            wrong: say('Gainetik % 2 uzteko, 0,02 bilatzen da taulan.', 'Para dejar un 2 % por encima, se busca 0,02 en la tabla.', 'لترك 2٪ فوق القيمة نبحث عن 0.02 في الجدول.', 'To leave 2% above, look for 0.02 in the table.'),
            right: say('Taulak azpikoa ematen du: 0,98 bilatzen da, eta hurbilenak $k=2{,}05$ ematen du.', 'La tabla da lo de debajo: se busca 0,98, y el más cercano da $k=2{,}05$.', 'يعطي الجدول ما تحت: نبحث عن 0.98، والأقرب يعطي $k=2{,}05$.', 'The table gives what lies below: look for 0.98, and the closest gives $k=2{,}05$.')
        },
        check: {
            prompt: say('$N(0;\\,1)$ banaketan, zein $k$ balioak uzten du gainetik 0,1587 probabilitatea?', 'En la $N(0;\\,1)$, ¿qué $k$ deja por encima una probabilidad de 0,1587?', 'في $N(0;\\,1)$، ما قيمة $k$ التي تترك فوقها احتمال 0.1587؟', 'In $N(0;\\,1)$, which $k$ leaves a probability of 0.1587 above it?'),
            options: [same('$-1$'), same('$0{,}16$'), same('$1$')],
            correctIndex: 2,
            explanation: say('Azpitik $1-0{,}1587=0{,}8413$ geratzen da, eta taulan hori $k=1$ da. $-1$ balioarekin, gainetik 0,8413 geratzen da.', 'Por debajo queda $1-0{,}1587=0{,}8413$, que en la tabla es $k=1$. Con $-1$, lo que queda por encima es 0,8413.', 'يبقى تحتها $1-0{,}1587=0{,}8413$، وهي في الجدول $k=1$. ومع $-1$ يبقى فوقها 0.8413.', 'Below it lies $1-0{,}1587=0{,}8413$, which in the table is $k=1$. With $-1$, what lies above is 0.8413.')
        }
    },

    /* ---------- 5. Approximating the binomial by the normal ---------- */
    'binomial-to-normal': {
        mistake: {
            wrong: say('$B(20;\\,0{,}1)$ ondo hurbiltzen da normal batez, $n=20$ handia delako.', '$B(20;\\,0{,}1)$ se aproxima bien por una normal porque $n=20$ es grande.', 'يُقرَّب $B(20;\\,0{,}1)$ جيدًا بتوزيع طبيعي لأن $n=20$ كبير.', '$B(20;\\,0{,}1)$ is well approximated by a normal because $n=20$ is large.'),
            right: say('$np=2<5$ da: barrak 0 zenbakiaren ondoan pilatzen dira, eta ez dute kanpairik osatzen.', 'Es $np=2<5$: las barras se amontonan junto a 0 y no forman una campana.', 'إن $np=2<5$: تتكدس الأعمدة قرب 0 ولا تكوّن جرسًا.', 'It has $np=2<5$: the bars pile up next to 0 and do not make a bell.')
        },
        check: {
            prompt: say('Binomial hauetatik zein hurbil daiteke normal batez?', '¿Cuál de estas binomiales se puede aproximar por una normal?', 'أيّ هذه التوزيعات الثنائية يمكن تقريبه بتوزيع طبيعي؟', 'Which of these binomials can be approximated by a normal?'),
            options: [same('$B(30;\\,0{,}1)$'), same('$B(60;\\,0{,}2)$'), same('$B(1000;\\,0{,}001)$')],
            correctIndex: 1,
            explanation: say('$B(60;\\,0{,}2)$ banaketan, $np=12$ eta $nq=48$. Besteetan, $np=3$ eta $np=1$.', 'En $B(60;\\,0{,}2)$, $np=12$ y $nq=48$. En las otras, $np=3$ y $np=1$.', 'في $B(60;\\,0{,}2)$، $np=12$ و$nq=48$. وفي الأخريين $np=3$ و$np=1$.', 'In $B(60;\\,0{,}2)$, $np=12$ and $nq=48$. In the others, $np=3$ and $np=1$.')
        }
    },
    continuity: {
        mistake: {
            wrong: say('$P(X\\le 40)\\approx P(Y\\le 40)$, zuzendu gabe.', '$P(X\\le 40)\\approx P(Y\\le 40)$, sin corregir.', '$P(X\\le 40)\\approx P(Y\\le 40)$ دون تصحيح.', '$P(X\\le 40)\\approx P(Y\\le 40)$, without correcting.'),
            right: say('40 balioaren barra 40,5 arte iristen da: $P(X\\le 40)\\approx P(Y\\le 40{,}5)$.', 'La barra del 40 llega hasta 40,5: $P(X\\le 40)\\approx P(Y\\le 40{,}5)$.', 'يصل عمود 40 إلى 40.5: $P(X\\le 40)\\approx P(Y\\le 40{,}5)$.', 'The bar of 40 reaches 40.5: $P(X\\le 40)\\approx P(Y\\le 40{,}5)$.')
        },
        check: {
            prompt: say('$X\\sim B(16;\\,0{,}5)$ banaketa $Y\\sim N(8;\\,2)$ banaketaz hurbiltzen da. Zenbat da, gutxi gorabehera, $P(X=8)$?', '$X\\sim B(16;\\,0{,}5)$ se aproxima por $Y\\sim N(8;\\,2)$. ¿Cuánto vale, aproximadamente, $P(X=8)$?', 'يُقرَّب $X\\sim B(16;\\,0{,}5)$ بـ $Y\\sim N(8;\\,2)$. كم يساوي $P(X=8)$ تقريبًا؟', '$X\\sim B(16;\\,0{,}5)$ is approximated by $Y\\sim N(8;\\,2)$. Roughly, what is $P(X=8)$?'),
            options: [same('$0$'), same('$0{,}1974$'), same('$0{,}5987$')],
            correctIndex: 1,
            explanation: say('$P(7{,}5\\le Y\\le 8{,}5)$: ${z}=\\pm 0{,}25$, eta $2\\cdot 0{,}5987-1=0{,}1974$. Zuzenketarik gabe, $P(Y=8)=0$ aterako litzateke.', '$P(7{,}5\\le Y\\le 8{,}5)$: ${z}=\\pm 0{,}25$, y $2\\cdot 0{,}5987-1=0{,}1974$. Sin corrección saldría $P(Y=8)=0$.', '$P(7{,}5\\le Y\\le 8{,}5)$: ${z}=\\pm 0{,}25$، و$2\\cdot 0{,}5987-1=0{,}1974$. ودون تصحيح نحصل على $P(Y=8)=0$.', '$P(7{,}5\\le Y\\le 8{,}5)$: ${z}=\\pm 0{,}25$, and $2\\cdot 0{,}5987-1=0{,}1974$. Without the correction you would get $P(Y=8)=0$.')
        }
    }
}
