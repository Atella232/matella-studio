import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { AppFigure, CafesFigure, CompareFigure, ContinuityFigure, DeliveryFigure, LeisureFigure, ParcelsFigure, RaffleFigure, SalaryFigure, SurveyBinomialFigure, TableCornerFigure, TelevisionsFigure, ConnectionFigure, VotersBellFigure } from './figures'
import { distributionsBatx2gLessonChecks, type DistributionsBatx2gTopicId } from './lessonChecks'
import { distributionsBatx2gLessonTexts } from './lessonTexts'

/* ==========================================================================
   Banaketak · Batxilergoa 2 · Gizarte Zientziak — stages and lessons. The
   scope follows unit 11 of Santillana 2.º Bachillerato Ciencias Sociales
   without its opening on samples (that goes to «Muestreo»): discrete
   random variables, the binomial, the normal with its table, standardising
   to compare, the inverse search, the characteristic interval and the
   normal approximation of the binomial. Simpler than the Ciencias unit
   (no densities) and with contexts of society: shops, polls, salaries,
   deliveries. All the exercises and numbers are our own. Notation:
   B(n;\,p), N(\mu;\,\sigma), P(Z\le k), z_{\alpha/2}.
   ========================================================================== */

export type DistributionsBatx2gStageId = 'discrete' | 'binomial' | 'normal' | 'approximation'

export const distributionsBatx2gStages: UnitStage[] = [
    { id: 'discrete', tone: 'blue', title: { eu: 'Aldagai aleatorio diskretuak', es: 'Variables aleatorias discretas', en: 'Discrete random variables', ar: 'المتغيرات العشوائية المتقطعة' } },
    { id: 'binomial', tone: 'violet', title: { eu: 'Banaketa binomiala', es: 'La distribución binomial', en: 'The binomial distribution', ar: 'التوزيع الثنائي' } },
    { id: 'normal', tone: 'mustard', title: { eu: 'Banaketa normala', es: 'La distribución normal', en: 'The normal distribution', ar: 'التوزيع الطبيعي' } },
    { id: 'approximation', tone: 'coral', title: { eu: 'Tarteak eta hurbilketa', es: 'Intervalos y aproximación', en: 'Intervals and approximation', ar: 'الفترات والتقريب' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** «Review first»: lessons of earlier units that the new ones build on */
const need = {
    fair: { unit: 'dbh4-akademikoak/probabilidad', topic: 'fair-games', title: { eu: 'Itxaropena eta joko bidezkoak', es: 'Esperanza y juegos equitativos', en: 'Expected value and fair games', ar: 'الأمل الرياضي والألعاب العادلة' } },
    variance: { unit: 'batx1-zientziak/estadistica', topic: 'variance-sd', title: { eu: 'Bariantzaren formula praktikoa', es: 'La fórmula práctica de la varianza', en: 'The working formula for the variance', ar: 'الصيغة العملية للتباين' } },
    scores: { unit: 'batx1-zientziak/estadistica', topic: 'standard-scores', title: { eu: 'Puntuazio tipikoak', es: 'Puntuaciones típicas', en: 'Standard scores', ar: 'الدرجات المعيارية' } },
    coefficients: { unit: 'dbh4-akademikoak/combinatoria', topic: 'binomial', title: { eu: 'Zenbaki konbinatorioak', es: 'Números combinatorios', en: 'Binomial coefficients', ar: 'الأعداد التوافقية' } },
    trees: { unit: 'batx2-gizarte/probabilidad', topic: 'trees', title: { eu: 'Zuhaitzak eta biderkaduraren erregela', es: 'Árboles y regla del producto', en: 'Trees and the product rule', ar: 'الأشجار وقاعدة الجداء' } },
    independence: { unit: 'batx2-gizarte/probabilidad', topic: 'independence', title: { eu: 'Gertaera independenteak', es: 'Sucesos independientes', en: 'Independent events', ar: 'الأحداث المستقلة' } },
    union: { unit: 'batx2-gizarte/probabilidad', topic: 'union', title: { eu: 'Bildura eta aurkakoa', es: 'La unión y el contrario', en: 'The union and the complement', ar: 'الاتحاد والمعاكس' } }
}

const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Discrete random variables ---------- */
    {
        id: 'random-variable',
        stage: 'discrete',
        title: say('Aldagai aleatorioa eta haren banaketa', 'Variable aleatoria y su distribución', 'المتغير العشوائي وتوزيعه', 'A random variable and its distribution'),
        goal: say('Aldagai aleatorio diskretu baten probabilitate-funtzioa taula batean idaztea eta probabilitateak irakurtzea.', 'Escribir en una tabla la función de probabilidad de una variable aleatoria discreta y leer probabilidades en ella.', 'كتابة دالة الاحتمال لمتغير عشوائي متقطع في جدول وقراءة الاحتمالات منه.', 'Write the probability function of a discrete random variable in a table and read probabilities from it.'),
        needs: [need.union],
        problem: say('Denda batek egunean 0, 1, 2 edo 3 telebista saltzen ditu, $0{,}2$, $0{,}4$, $0{,}3$ eta $k$ probabilitateekin. Kalkulatu $k$ eta $P(X\\ge 2)$.', 'Una tienda vende 0, 1, 2 o 3 televisores al día con probabilidades $0{,}2$, $0{,}4$, $0{,}3$ y $k$. Calcula $k$ y $P(X\\ge 2)$.', 'يبيع متجر يوميًّا 0 أو 1 أو 2 أو 3 أجهزة تلفاز باحتمالات $0{,}2$ و$0{,}4$ و$0{,}3$ و$k$. احسب $k$ و$P(X\\ge 2)$.', 'A shop sells 0, 1, 2 or 3 TVs a day with probabilities $0{,}2$, $0{,}4$, $0{,}3$ and $k$. Work out $k$ and $P(X\\ge 2)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Probabilitate guztiek 1 egiten dute batuta.', 'Todas las probabilidades suman 1.', 'مجموع كل الاحتمالات 1.', 'All the probabilities add up to 1.'), math: same('$k=1-(0{,}2+0{,}4+0{,}3)=0{,}1$') },
            { text: say('«Gutxienez 2»: 2 eta 3 balioak.', '«Al menos 2»: los valores 2 y 3.', '«2 على الأقل»: القيمتان 2 و3.', '‘At least 2’: the values 2 and 3.'), math: same('$P(X\\ge 2)=0{,}3+0{,}1=0{,}4$') }
        ],
        takeaway: say(
            'Aldagai aleatorio diskretu batek balio bakoitzari probabilitate bat ematen dio, $p_i=P(X=x_i)$, eta $\\sum p_i=1$. Gertaera baten probabilitatea bere balioen probabilitateen batura da.',
            'Una variable aleatoria discreta da a cada valor una probabilidad, $p_i=P(X=x_i)$, y $\\sum p_i=1$. La probabilidad de un suceso es la suma de las de sus valores.',
            'يعطي المتغير العشوائي المتقطع كل قيمة احتمالًا $p_i=P(X=x_i)$، و$\\sum p_i=1$. واحتمال حدث هو مجموع احتمالات قيمه.',
            'A discrete random variable gives each value a probability, $p_i=P(X=x_i)$, and $\\sum p_i=1$. The probability of an event is the sum of those of its values.'
        ),
        figure: (language) => <TelevisionsFigure language={language} />
    },
    {
        id: 'mean-variance',
        stage: 'discrete',
        title: say('Batez bestekoa eta desbideratze tipikoa', 'Media y desviación típica', 'المتوسط والانحراف المعياري', 'Mean and standard deviation'),
        goal: say('Aldagai aleatorio diskretu baten batez bestekoa, bariantza eta desbideratze tipikoa kalkulatzea.', 'Calcular la media, la varianza y la desviación típica de una variable aleatoria discreta.', 'حساب المتوسط والتباين والانحراف المعياري لمتغير عشوائي متقطع.', 'Work out the mean, the variance and the standard deviation of a discrete random variable.'),
        needs: [need.variance],
        problem: say('$X$ = «langile batek egunean hartzen dituen kafeak» aldagaiak 0, 1, 2 eta 3 balioak hartzen ditu, $0{,}1$, $0{,}3$, $0{,}4$ eta $0{,}2$ probabilitateekin. Kalkulatu $\\mu$ eta $\\sigma$.', '$X$ = «cafés que toma un trabajador al día» vale 0, 1, 2 o 3 con probabilidades $0{,}1$, $0{,}3$, $0{,}4$ y $0{,}2$. Calcula $\\mu$ y $\\sigma$.', '$X$ = «عدد فناجين القهوة التي يشربها عامل يوميًّا» يأخذ 0 أو 1 أو 2 أو 3 باحتمالات $0{,}1$ و$0{,}3$ و$0{,}4$ و$0{,}2$. احسب $\\mu$ و$\\sigma$.', '$X$ = «coffees a worker drinks a day» takes 0, 1, 2 or 3 with probabilities $0{,}1$, $0{,}3$, $0{,}4$ and $0{,}2$. Work out $\\mu$ and $\\sigma$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batez bestekoa: balio bakoitza bider bere probabilitatea, batuta.', 'Media: cada valor por su probabilidad, sumados.', 'المتوسط: كل قيمة في احتمالها ثم الجمع.', 'Mean: each value times its probability, added up.'), math: same('$\\mu=0{,}3+0{,}8+0{,}6=1{,}7$') },
            { text: say('Karratuen batez bestekoa ken batez bestekoaren karratua.', 'Media de los cuadrados menos el cuadrado de la media.', 'متوسط المربعات ناقص مربع المتوسط.', 'Mean of the squares minus the square of the mean.'), math: same('$\\sigma^2=0{,}3+1{,}6+1{,}8-1{,}7^2=0{,}81$') },
            { text: say('Desbideratze tipikoa, erro karratua.', 'La desviación típica, la raíz.', 'الانحراف المعياري هو الجذر.', 'The standard deviation, the square root.'), math: same('$\\sigma=\\sqrt{0{,}81}=0{,}9$') }
        ],
        takeaway: say(
            '$\\mu=\\sum x_i\\,p_i$ eta $\\sigma^2=\\sum x_i^2\\,p_i-\\mu^2$; $\\sigma$ haren erroa da. Datuen estatistikaren formula berak dira, maiztasunen ordez probabilitateekin.',
            '$\\mu=\\sum x_i\\,p_i$ y $\\sigma^2=\\sum x_i^2\\,p_i-\\mu^2$; $\\sigma$ es su raíz. Son las fórmulas de la estadística de datos, con probabilidades en lugar de frecuencias.',
            '$\\mu=\\sum x_i\\,p_i$ و$\\sigma^2=\\sum x_i^2\\,p_i-\\mu^2$، و$\\sigma$ جذره. إنها صيغ إحصاء البيانات نفسها مع الاحتمالات بدل التكرارات.',
            '$\\mu=\\sum x_i\\,p_i$ and $\\sigma^2=\\sum x_i^2\\,p_i-\\mu^2$; $\\sigma$ is its square root. They are the formulas of data statistics, with probabilities instead of frequencies.'
        ),
        figure: (language) => <CafesFigure language={language} />
    },
    {
        id: 'expected-gain',
        stage: 'discrete',
        title: say('Espero den irabazia', 'La ganancia esperada', 'الربح المتوقع', 'The expected gain'),
        goal: say('Zozketa, aseguru edo joko baten batez besteko irabazia kalkulatzea eta bidezkoa den erabakitzea.', 'Calcular la ganancia media de un sorteo, un seguro o un juego y decidir si es justo.', 'حساب متوسط الربح في قرعة أو تأمين أو لعبة وتقرير ما إذا كانت عادلة.', 'Work out the mean gain of a raffle, an insurance or a game and decide whether it is fair.'),
        needs: [need.fair],
        problem: say('Zozketa bateko txartel batek 2 € balio du. 50 €-ko saria irabazteko probabilitatea $0{,}01$ da, eta 10 €-koa, $0{,}05$. Zein da espero den irabazia?', 'Una papeleta de una rifa cuesta 2 €. La probabilidad de ganar 50 € es $0{,}01$, y la de ganar 10 €, $0{,}05$. ¿Cuál es la ganancia esperada?', 'ثمن ورقة يانصيب 2 €. احتمال ربح 50 € هو $0{,}01$، واحتمال ربح 10 € هو $0{,}05$. ما الربح المتوقع؟', 'A raffle ticket costs €2. The probability of winning €50 is $0{,}01$, and of winning €10, $0{,}05$. What is the expected gain?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Espero den saria: sari bakoitza bider bere probabilitatea.', 'Premio esperado: cada premio por su probabilidad.', 'الجائزة المتوقعة: كل جائزة في احتمالها.', 'Expected prize: each prize times its probability.'), math: same('$50\\cdot 0{,}01+10\\cdot 0{,}05=1$') },
            { text: say('Kendu txartelaren prezioa.', 'Resta el precio de la papeleta.', 'اطرح ثمن الورقة.', 'Take away the price of the ticket.'), math: same('$1-2=-1$') }
        ],
        takeaway: say(
            'Espero den irabazia irabazien batez bestekoa da: irabazi edo galera bakoitza bider bere probabilitatea, batuta. Joko bat bidezkoa da $\\mu=0$ bada; negatiboa bada, jokalariak galtzen du batez beste.',
            'La ganancia esperada es la media de las ganancias: cada ganancia o pérdida por su probabilidad, sumadas. Un juego es justo si $\\mu=0$; si es negativa, el jugador pierde en promedio.',
            'الربح المتوقع هو متوسط الأرباح: كل ربح أو خسارة في احتمالها ثم الجمع. واللعبة عادلة إذا كان $\\mu=0$؛ وإذا كان سالبًا يخسر اللاعب في المتوسط.',
            'The expected gain is the mean of the gains: each gain or loss times its probability, added up. A game is fair if $\\mu=0$; if it is negative, the player loses on average.'
        ),
        figure: (language) => <RaffleFigure language={language} />
    },

    /* ---------- 2. The binomial distribution ---------- */
    {
        id: 'is-binomial',
        stage: 'binomial',
        title: say('Binomiala da?', '¿Es binomial?', 'هل هو ثنائي؟', 'Is it binomial?'),
        goal: say('Egoera bat banaketa binomial bat den erabakitzea: $n$ proba independente, bi emaitza eta $p$ bera beti.', 'Decidir si una situación es binomial: $n$ pruebas independientes, dos resultados y siempre la misma $p$.', 'تقرير ما إذا كانت حالة ثنائية: $n$ تجربة مستقلة ونتيجتان والاحتمال $p$ نفسه دائمًا.', 'Decide whether a situation is binomial: $n$ independent trials, two outcomes and always the same $p$.'),
        needs: [need.independence],
        problem: say('Hauetako zein da binomiala? a) Hiri bateko 20 pertsonari galdetzea bizikleta duten. b) 10 pertsonako talde batetik 3 aukeratzea eta emakumeak zenbatzea. c) Bezero bat erosten duen arte deitzea.', '¿Cuáles son binomiales? a) Preguntar a 20 personas de una ciudad si tienen bicicleta. b) Elegir 3 de un grupo de 10 personas y contar las mujeres. c) Llamar a clientes hasta que uno compre.', 'أيها ثنائي؟ أ) سؤال 20 شخصًا في مدينة هل لديهم دراجة. ب) اختيار 3 من مجموعة من 10 أشخاص وعدّ النساء. ج) الاتصال بالزبائن حتى يشتري أحدهم.', 'Which are binomial? a) Asking 20 people in a city whether they own a bike. b) Choosing 3 from a group of 10 people and counting the women. c) Calling customers until one buys.'),
        stepsKind: 'steps',
        steps: [
            { text: say('a) 20 proba, bi erantzun (bai/ez), eta hiri handi batean $p$ ez da aldatzen: binomiala da.', 'a) 20 pruebas, dos respuestas (sí/no) y en una ciudad grande $p$ no cambia: es binomial.', 'أ) 20 تجربة وإجابتان (نعم/لا)، وفي مدينة كبيرة لا يتغير $p$: إنه ثنائي.', 'a) 20 trials, two answers (yes/no) and in a big city $p$ does not change: it is binomial.') },
            { text: say('b) Talde txiki batean, itzuli gabe, $p$ aldatu egiten da aukeraketa bakoitzean: ez da binomiala.', 'b) En un grupo pequeño y sin devolución, $p$ cambia en cada elección: no es binomial.', 'ب) في مجموعة صغيرة ودون إرجاع يتغير $p$ في كل اختيار: ليس ثنائيًّا.', 'b) In a small group without replacement, $p$ changes at each choice: it is not binomial.') },
            { text: say('c) Proba kopurua ez dago finkatuta: ez da binomiala.', 'c) El número de pruebas no está fijado: no es binomial.', 'ج) عدد التجارب غير محدد: ليس ثنائيًّا.', 'c) The number of trials is not fixed: it is not binomial.') }
        ],
        takeaway: say(
            '$X$ = «arrakasten kopurua» binomiala da, $B(n;\\,p)$, baldin eta: $n$ proba finkatuta badaude, independenteak, bakoitzean bi emaitza (arrakasta edo porrota) eta arrakastaren probabilitatea beti $p$.',
            '$X$ = «número de éxitos» es binomial, $B(n;\\,p)$, si hay $n$ pruebas fijadas, independientes, cada una con dos resultados (éxito o fracaso) y la probabilidad de éxito siempre $p$.',
            'يكون $X$ = «عدد النجاحات» ثنائيًّا $B(n;\\,p)$ إذا كانت هناك $n$ تجربة محددة ومستقلة، لكل منها نتيجتان (نجاح أو فشل) واحتمال النجاح دائمًا $p$.',
            '$X$ = «number of successes» is binomial, $B(n;\\,p)$, if there are $n$ fixed, independent trials, each with two outcomes (success or failure) and the probability of success always $p$.'
        ),
        figure: (language) => <SurveyBinomialFigure language={language} />
    },
    {
        id: 'binomial-formula',
        stage: 'binomial',
        title: say('Probabilitate binomialak', 'Probabilidades binomiales', 'الاحتمالات الثنائية', 'Binomial probabilities'),
        goal: say('$P(X=k)$ kalkulatzea formula binomialarekin, eta «gutxienez bat» aurkakoarekin.', 'Calcular $P(X=k)$ con la fórmula binomial, y «al menos uno» con el contrario.', 'حساب $P(X=k)$ بالصيغة الثنائية، و«واحد على الأقل» بالمعاكس.', 'Work out $P(X=k)$ with the binomial formula, and ‘at least one’ with the complement.'),
        needs: [need.coefficients, need.trees],
        problem: say('Bezeroen % 30 aplikazio bidezko erosleak dira. 5 bezero aukeratzen dira. Zein da zehazki 2 bezerok aplikazioarekin erosteko probabilitatea? Eta gutxienez batek?', 'El 30 % de los clientes compra con la app. Se eligen 5 clientes. ¿Qué probabilidad hay de que exactamente 2 compren con la app? ¿Y de que lo haga al menos uno?', '30 % من الزبائن يشترون عبر التطبيق. يُختار 5 زبائن. ما احتمال أن يشتري اثنان بالضبط عبر التطبيق؟ وما احتمال أن يفعل ذلك واحد على الأقل؟', '30% of customers buy with the app. 5 customers are chosen. What is the probability that exactly 2 buy with the app? And that at least one does?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$X\\sim B(5;\\,0{,}3)$. Bi arrakasta eta hiru porrot, $\\binom{5}{2}$ ordenatan.', '$X\\sim B(5;\\,0{,}3)$. Dos éxitos y tres fracasos, en $\\binom{5}{2}$ órdenes.', '$X\\sim B(5;\\,0{,}3)$. نجاحان وثلاثة إخفاقات في $\\binom{5}{2}$ ترتيبًا.', '$X\\sim B(5;\\,0{,}3)$. Two successes and three failures, in $\\binom{5}{2}$ orders.'), math: same('$P(X=2)=10\\cdot 0{,}09\\cdot 0{,}343=0{,}3087$') },
            { text: say('«Gutxienez bat» = 1 ken «bat ere ez».', '«Al menos uno» = 1 menos «ninguno».', '«واحد على الأقل» = 1 ناقص «لا أحد».', '‘At least one’ = 1 minus ‘none’.'), math: same('$P(X\\ge 1)=1-0{,}7^5=1-0{,}16807=0{,}83193$') }
        ],
        takeaway: say(
            '$X\\sim B(n;\\,p)$ bada, $P(X=k)=\\binom{n}{k}\\,p^k\\,q^{n-k}$, $q=1-p$ izanik. «Gutxienez bat» kalkulatzeko, errazagoa da $1-P(X=0)=1-q^n$.',
            'Si $X\\sim B(n;\\,p)$, $P(X=k)=\\binom{n}{k}\\,p^k\\,q^{n-k}$, con $q=1-p$. Para «al menos uno» es más fácil $1-P(X=0)=1-q^n$.',
            'إذا كان $X\\sim B(n;\\,p)$ فإن $P(X=k)=\\binom{n}{k}\\,p^k\\,q^{n-k}$ حيث $q=1-p$. ولـ«واحد على الأقل» الأسهل $1-P(X=0)=1-q^n$.',
            'If $X\\sim B(n;\\,p)$, $P(X=k)=\\binom{n}{k}\\,p^k\\,q^{n-k}$, with $q=1-p$. For ‘at least one’ it is easier to use $1-P(X=0)=1-q^n$.'
        ),
        figure: (language) => <AppFigure language={language} />
    },
    {
        id: 'binomial-mean',
        stage: 'binomial',
        title: say('Binomialaren batez bestekoa eta desbideratzea', 'Media y desviación de la binomial', 'متوسط التوزيع الثنائي وانحرافه', 'Mean and deviation of the binomial'),
        goal: say('Espero den arrakasta kopurua eta haren desbideratze tipikoa kalkulatzea: $\\mu=np$ eta $\\sigma=\\sqrt{npq}$.', 'Calcular el número esperado de éxitos y su desviación típica: $\\mu=np$ y $\\sigma=\\sqrt{npq}$.', 'حساب العدد المتوقع للنجاحات وانحرافه المعياري: $\\mu=np$ و$\\sigma=\\sqrt{npq}$.', 'Work out the expected number of successes and its standard deviation: $\\mu=np$ and $\\sigma=\\sqrt{npq}$.'),
        needs: [need.variance],
        problem: say('Hautesleen % 20 X alderdiaren aldekoa da. 400 pertsonari galdetzen zaie. Zenbat X boto espero dira? Zein da desbideratze tipikoa?', 'El 20 % de los votantes vota al partido X. Se pregunta a 400 personas. ¿Cuántos votos a X se esperan? ¿Cuál es la desviación típica?', 'يصوّت 20 % من الناخبين للحزب X. يُسأل 400 شخص. كم صوتًا لـ X يُتوقع؟ وما الانحراف المعياري؟', '20% of voters vote for party X. 400 people are asked. How many votes for X are expected? What is the standard deviation?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$X\\sim B(400;\\,0{,}2)$. Batez bestekoa:', '$X\\sim B(400;\\,0{,}2)$. La media:', '$X\\sim B(400;\\,0{,}2)$. المتوسط:', '$X\\sim B(400;\\,0{,}2)$. The mean:'), math: same('$\\mu=400\\cdot 0{,}2=80$') },
            { text: say('Desbideratze tipikoa, $npq$ zenbakiaren erroa.', 'La desviación típica, la raíz de $npq$.', 'الانحراف المعياري جذر $npq$.', 'The standard deviation, the square root of $npq$.'), math: same('$\\sigma=\\sqrt{400\\cdot 0{,}2\\cdot 0{,}8}=\\sqrt{64}=8$') }
        ],
        takeaway: say(
            '$B(n;\\,p)$ banaketan $\\mu=np$ eta $\\sigma=\\sqrt{npq}$. Gehienetan arrakasten kopurua $\\mu$ zenbakitik gertu dago, $\\sigma$ batzuk gora edo behera.',
            'En una $B(n;\\,p)$, $\\mu=np$ y $\\sigma=\\sqrt{npq}$. Casi siempre el número de éxitos queda cerca de $\\mu$, unas pocas $\\sigma$ arriba o abajo.',
            'في $B(n;\\,p)$ يكون $\\mu=np$ و$\\sigma=\\sqrt{npq}$. وغالبًا يبقى عدد النجاحات قريبًا من $\\mu$ ببضع $\\sigma$ فوقه أو تحته.',
            'In a $B(n;\\,p)$, $\\mu=np$ and $\\sigma=\\sqrt{npq}$. Almost always the number of successes stays near $\\mu$, a few $\\sigma$ above or below.'
        ),
        figure: (language) => <VotersBellFigure language={language} />
    },

    /* ---------- 3. The normal distribution ---------- */
    {
        id: 'normal-curve',
        stage: 'normal',
        title: say('Banaketa normala', 'La distribución normal', 'التوزيع الطبيعي', 'The normal distribution'),
        goal: say('Banaketa normalaren kanpaia ezagutzea, $\\mu$ eta $\\sigma$ zenbakien eragina, eta kanpaiaren azpiko azalera probabilitate gisa irakurtzea.', 'Conocer la campana de la normal, el papel de $\\mu$ y $\\sigma$, y leer el área bajo la campana como probabilidad.', 'معرفة جرس التوزيع الطبيعي ودور $\\mu$ و$\\sigma$، وقراءة المساحة تحت الجرس احتمالًا.', 'Know the bell of the normal, the role of $\\mu$ and $\\sigma$, and read the area under the bell as a probability.'),
        problem: say('Gazte baten hileko aisialdi-gastua $N(120;\\,20)$ banaketa da, eurotan. Zer ehuneko gastatzen du 100 eta 140 euro artean? Eta 160 eurotik gora?', 'El gasto mensual en ocio de un joven sigue una $N(120;\\,20)$ en euros. ¿Qué porcentaje gasta entre 100 y 140 €? ¿Y más de 160 €?', 'يتبع الإنفاق الشهري لشاب على الترفيه $N(120;\\,20)$ باليورو. ما النسبة التي تنفق بين 100 و140 €؟ وأكثر من 160 €؟', 'A young person\'s monthly leisure spending follows an $N(120;\\,20)$ in euros. What percentage spends between €100 and €140? And more than €160?'),
        stepsKind: 'steps',
        steps: [
            { text: say('100 eta 140 dira $\\mu-\\sigma$ eta $\\mu+\\sigma$: erdiko zatia.', '100 y 140 son $\\mu-\\sigma$ y $\\mu+\\sigma$: la parte central.', '100 و140 هما $\\mu-\\sigma$ و$\\mu+\\sigma$: الجزء الأوسط.', '100 and 140 are $\\mu-\\sigma$ and $\\mu+\\sigma$: the central part.'), math: same('$P(-1\\le Z\\le 1)=0{,}6826$') },
            { text: say('160 da $\\mu+2\\sigma$: eskuineko buztana.', '160 es $\\mu+2\\sigma$: la cola derecha.', '160 هو $\\mu+2\\sigma$: الذيل الأيمن.', '160 is $\\mu+2\\sigma$: the right tail.'), math: same('$P(Z>2)=1-0{,}9772=0{,}0228$') }
        ],
        takeaway: say(
            '$N(\\mu;\\,\\sigma)$ kanpai simetriko bat da $\\mu$ zenbakiaren inguruan; $\\sigma$ handiagoa, kanpai zabalagoa. Azalera osoa 1 da, eta tarte baten probabilitatea haren azpiko azalera da. Datuen % 68 inguru $\\mu\\pm\\sigma$ tartean dago, eta % 95 inguru $\\mu\\pm 2\\sigma$ tartean.',
            'La $N(\\mu;\\,\\sigma)$ es una campana simétrica alrededor de $\\mu$; cuanto mayor $\\sigma$, más ancha. El área total es 1 y la probabilidad de un intervalo es el área que tiene debajo. Cerca del 68 % está en $\\mu\\pm\\sigma$, y cerca del 95 %, en $\\mu\\pm 2\\sigma$.',
            '$N(\\mu;\\,\\sigma)$ جرس متماثل حول $\\mu$؛ كلما كبر $\\sigma$ اتسع. المساحة الكلية 1، واحتمال فترة هو المساحة تحتها. نحو 68 % في $\\mu\\pm\\sigma$، ونحو 95 % في $\\mu\\pm 2\\sigma$.',
            '$N(\\mu;\\,\\sigma)$ is a bell symmetric about $\\mu$; the bigger $\\sigma$, the wider. The total area is 1 and the probability of an interval is the area under it. About 68% lies in $\\mu\\pm\\sigma$, and about 95% in $\\mu\\pm 2\\sigma$.'
        ),
        figureAfterSteps: true,
        figure: (language) => <LeisureFigure language={language} />
    },
    {
        id: 'standard-table',
        stage: 'normal',
        title: say('Normal estandarraren taula', 'La tabla de la normal estándar', 'جدول التوزيع الطبيعي المعياري', 'The standard normal table'),
        goal: say('$N(0;\\,1)$ banaketaren taulan $P(Z\\le k)$ irakurtzea eta, simetriaz eta aurkakoaz, beste probabilitateak kalkulatzea.', 'Leer $P(Z\\le k)$ en la tabla de la $N(0;\\,1)$ y calcular las demás probabilidades con la simetría y el contrario.', 'قراءة $P(Z\\le k)$ في جدول $N(0;\\,1)$ وحساب بقية الاحتمالات بالتماثل والمعاكس.', 'Read $P(Z\\le k)$ in the table of $N(0;\\,1)$ and work out the other probabilities with symmetry and the complement.'),
        problem: say('$Z\\sim N(0;\\,1)$. Kalkulatu $P(Z\\le 1{,}4)$, $P(Z>1{,}4)$, $P(Z\\le -1{,}4)$ eta $P(-1{,}4\\le Z\\le 1{,}4)$.', '$Z\\sim N(0;\\,1)$. Calcula $P(Z\\le 1{,}4)$, $P(Z>1{,}4)$, $P(Z\\le -1{,}4)$ y $P(-1{,}4\\le Z\\le 1{,}4)$.', '$Z\\sim N(0;\\,1)$. احسب $P(Z\\le 1{,}4)$ و$P(Z>1{,}4)$ و$P(Z\\le -1{,}4)$ و$P(-1{,}4\\le Z\\le 1{,}4)$.', '$Z\\sim N(0;\\,1)$. Work out $P(Z\\le 1{,}4)$, $P(Z>1{,}4)$, $P(Z\\le -1{,}4)$ and $P(-1{,}4\\le Z\\le 1{,}4)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Taulan zuzenean: 1,4 errenkada, 0 zutabea.', 'Directo en la tabla: fila 1,4, columna 0.', 'مباشرة من الجدول: الصف 1.4 والعمود 0.', 'Straight from the table: row 1.4, column 0.'), math: same('$P(Z\\le 1{,}4)=0{,}9192$') },
            { text: say('Gainetik, aurkakoa; negatiboak, simetriaz.', 'Por encima, el contrario; los negativos, por simetría.', 'فوقه بالمعاكس، والسالب بالتماثل.', 'Above it, the complement; negatives, by symmetry.'), math: same('$P(Z>1{,}4)=P(Z\\le -1{,}4)=1-0{,}9192=0{,}0808$') },
            { text: say('Bien artean: osoa ken bi buztanak.', 'Entre los dos: el total menos las dos colas.', 'بينهما: الكل ناقص الذيلين.', 'Between them: the whole minus the two tails.'), math: same('$P(-1{,}4\\le Z\\le 1{,}4)=0{,}9192-0{,}0808=0{,}8384$') }
        ],
        takeaway: say(
            'Taulak $P(Z\\le k)$ ematen du $k\\ge 0$ denean. $P(Z>k)=1-P(Z\\le k)$, $P(Z\\le -k)=P(Z\\ge k)$ simetriaz, eta $P(a\\le Z\\le b)=P(Z\\le b)-P(Z\\le a)$. Normalean, $\\le$ eta $<$ berdinak dira.',
            'La tabla da $P(Z\\le k)$ para $k\\ge 0$. $P(Z>k)=1-P(Z\\le k)$, $P(Z\\le -k)=P(Z\\ge k)$ por simetría y $P(a\\le Z\\le b)=P(Z\\le b)-P(Z\\le a)$. En la normal, $\\le$ y $<$ dan lo mismo.',
            'يعطي الجدول $P(Z\\le k)$ لـ $k\\ge 0$. و$P(Z>k)=1-P(Z\\le k)$، و$P(Z\\le -k)=P(Z\\ge k)$ بالتماثل، و$P(a\\le Z\\le b)=P(Z\\le b)-P(Z\\le a)$. وفي التوزيع الطبيعي $\\le$ و$<$ سيان.',
            'The table gives $P(Z\\le k)$ for $k\\ge 0$. $P(Z>k)=1-P(Z\\le k)$, $P(Z\\le -k)=P(Z\\ge k)$ by symmetry, and $P(a\\le Z\\le b)=P(Z\\le b)-P(Z\\le a)$. In the normal, $\\le$ and $<$ give the same.'
        ),
        figure: (language) => <TableCornerFigure language={language} />
    },
    {
        id: 'standardize',
        stage: 'normal',
        title: say('Tipifikatzea', 'Tipificar', 'التوحيد المعياري', 'Standardising'),
        goal: say('$N(\\mu;\\,\\sigma)$ edozein banaketa $N(0;\\,1)$ bihurtzea ${z}=\\frac{x-\\mu}{\\sigma}$ eginez, taula erabiltzeko.', 'Pasar cualquier $N(\\mu;\\,\\sigma)$ a la $N(0;\\,1)$ con ${z}=\\frac{x-\\mu}{\\sigma}$ para poder usar la tabla.', 'تحويل أي $N(\\mu;\\,\\sigma)$ إلى $N(0;\\,1)$ بـ ${z}=\\frac{x-\\mu}{\\sigma}$ لاستعمال الجدول.', 'Turn any $N(\\mu;\\,\\sigma)$ into $N(0;\\,1)$ with ${z}=\\frac{x-\\mu}{\\sigma}$ so the table can be used.'),
        needs: [need.scores],
        problem: say('Enpresa bateko soldatak $N(1800;\\,300)$ banaketa dira, eurotan. Zein da 2250 eurotik behera irabazteko probabilitatea? Eta 1500 eta 2250 euro artean?', 'Los sueldos de una empresa siguen una $N(1800;\\,300)$ en euros. ¿Qué probabilidad hay de cobrar menos de 2250 €? ¿Y entre 1500 y 2250 €?', 'تتبع رواتب شركة $N(1800;\\,300)$ باليورو. ما احتمال تقاضي أقل من 2250 €؟ وبين 1500 و2250 €؟', 'The salaries of a firm follow an $N(1800;\\,300)$ in euros. What is the probability of earning less than €2,250? And between €1,500 and €2,250?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Tipifikatu bi mugak.', 'Tipifica los dos extremos.', 'وحّد الطرفين.', 'Standardise the two ends.'), math: same('${z}=\\frac{2250-1800}{300}=1{,}5\\qquad z=\\frac{1500-1800}{300}=-1$') },
            { text: say('Taula.', 'La tabla.', 'الجدول.', 'The table.'), math: same('$P(X<2250)=P(Z<1{,}5)=0{,}9332$') },
            { text: say('Tartea: bi irakurketen kenketa, negatiboa simetriaz.', 'El intervalo: resta de las dos lecturas, la negativa por simetría.', 'الفترة: فرق القراءتين، والسالبة بالتماثل.', 'The interval: subtract the two readings, the negative one by symmetry.'), math: same('$0{,}9332-(1-0{,}8413)=0{,}7745$') }
        ],
        takeaway: say(
            '$X\\sim N(\\mu;\\,\\sigma)$ bada, $Z=\\frac{X-\\mu}{\\sigma}\\sim N(0;\\,1)$. Lehenik tipifikatu, gero taula irakurri. Zatitu $\\sigma$ zenbakiaz, ez bariantzaz.',
            'Si $X\\sim N(\\mu;\\,\\sigma)$, $Z=\\frac{X-\\mu}{\\sigma}\\sim N(0;\\,1)$. Primero se tipifica y luego se lee la tabla. Se divide entre $\\sigma$, no entre la varianza.',
            'إذا كان $X\\sim N(\\mu;\\,\\sigma)$ فإن $Z=\\frac{X-\\mu}{\\sigma}\\sim N(0;\\,1)$. نوحّد أولًا ثم نقرأ الجدول. ونقسم على $\\sigma$ لا على التباين.',
            'If $X\\sim N(\\mu;\\,\\sigma)$, $Z=\\frac{X-\\mu}{\\sigma}\\sim N(0;\\,1)$. First standardise, then read the table. Divide by $\\sigma$, not by the variance.'
        ),
        figure: (language) => <SalaryFigure language={language} />
    },
    {
        id: 'compare-scores',
        stage: 'normal',
        title: say('Tipifikatuz konparatzea', 'Comparar tipificando', 'المقارنة بالتوحيد المعياري', 'Comparing by standardising'),
        goal: say('Banaketa desberdinetako bi emaitza konparatzea haien puntuazio tipikoarekin.', 'Comparar dos resultados de distribuciones distintas con su puntuación tipificada.', 'مقارنة نتيجتين من توزيعين مختلفين بدرجتيهما المعياريتين.', 'Compare two results from different distributions with their standard scores.'),
        needs: [need.scores],
        problem: say('Anek 7 atera du $N(6;\\,0{,}8)$ banaketako azterketa batean, eta Jonek 75 $N(65;\\,10)$ banaketako beste batean. Zeinek emaitza hobea lortu du bere taldean?', 'Ane ha sacado un 7 en un examen que sigue una $N(6;\\,0{,}8)$, y Jon un 75 en otro que sigue una $N(65;\\,10)$. ¿Quién ha quedado mejor en su grupo?', 'حصلت آنِه على 7 في امتحان يتبع $N(6;\\,0{,}8)$، وحصل جون على 75 في امتحان آخر يتبع $N(65;\\,10)$. من حلّ في مرتبة أفضل في مجموعته؟', 'Ane scored 7 in an exam that follows an $N(6;\\,0{,}8)$, and Jon 75 in another that follows an $N(65;\\,10)$. Who did better within their group?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ane:', 'Ane:', 'آنِه:', 'Ane:'), math: same('${z}=\\frac{7-6}{0{,}8}=1{,}25$') },
            { text: say('Jon:', 'Jon:', 'جون:', 'Jon:'), math: same('${z}=\\frac{75-65}{10}=1$') },
            { text: say('Anek ${z}$ handiagoa du: bere taldean hobeto geratu da, nahiz eta notak ezin konparatu zuzenean.', 'Ane tiene mayor ${z}$: ha quedado mejor en su grupo, aunque las notas no se puedan comparar directamente.', 'لآنِه ${z}$ أكبر: حلّت أفضل في مجموعتها، رغم أن الدرجتين لا تُقارنان مباشرة.', 'Ane has the bigger ${z}$: she did better within her group, even though the marks cannot be compared directly.') }
        ],
        takeaway: say(
            'Puntuazio tipikoak, $\\frac{x-\\mu}{\\sigma}$, esaten du zenbat $\\sigma$ dagoen emaitza bat batez bestekoaren gainetik edo azpitik. Banaketa desberdinetako emaitzak konparatzeko, konparatu haien puntuazio tipikoak.',
            'La puntuación tipificada, $\\frac{x-\\mu}{\\sigma}$, dice cuántas $\\sigma$ está un resultado por encima o por debajo de la media. Para comparar resultados de distribuciones distintas se comparan sus puntuaciones tipificadas.',
            'تقول الدرجة المعيارية، $\\frac{x-\\mu}{\\sigma}$، كم $\\sigma$ تبعد النتيجة فوق المتوسط أو تحته. ولمقارنة نتائج من توزيعات مختلفة نقارن درجاتها المعيارية.',
            'The standard score, $\\frac{x-\\mu}{\\sigma}$, tells how many $\\sigma$ a result is above or below the mean. To compare results from different distributions, compare their standard scores.'
        ),
        figure: (language) => <CompareFigure language={language} />
    },
    {
        id: 'inverse-normal',
        stage: 'normal',
        title: say('Alderantzizko bilaketa', 'La búsqueda inversa', 'البحث العكسي', 'The inverse search'),
        goal: say('Ehuneko bat emanda, hari dagokion $x$ balioa aurkitzea: taula alderantziz irakurri eta tipifikazioa desegin.', 'Dado un porcentaje, hallar el valor $x$ que le corresponde: leer la tabla al revés y deshacer la tipificación.', 'إيجاد القيمة $x$ الموافقة لنسبة معطاة: قراءة الجدول بالعكس ثم عكس التوحيد.', 'Given a percentage, find the value $x$ that matches it: read the table backwards and undo the standardising.'),
        problem: say('Paketeen entrega-denbora $N(48;\\,6)$ banaketa da, ordutan. Zein denboratik aurrera daude paketeen % 15 motelenak?', 'El tiempo de entrega de los paquetes sigue una $N(48;\\,6)$ en horas. ¿A partir de qué tiempo está el 15 % de los más lentos?', 'يتبع زمن توصيل الطرود $N(48;\\,6)$ بالساعات. ابتداءً من أي زمن تقع أبطأ 15 % من الطرود؟', 'The delivery time of parcels follows an $N(48;\\,6)$ in hours. From what time on are the slowest 15%?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Mozketaren azpian, % 85 dago.', 'Por debajo del corte queda el 85 %.', 'يقع تحت الحد 85 %.', 'Below the cut lies 85%.'), math: same('$P(Z\\le k)=0{,}85$') },
            { text: say('Taulan, 0,85 hurbilen dagoen balioa: $k$.', 'En la tabla, el valor más cercano a 0,85: $k$.', 'في الجدول، أقرب قيمة إلى 0.85: $k$.', 'In the table, the value closest to 0.85: $k$.'), math: same('$k=1{,}04$') },
            { text: say('Desegin tipifikazioa.', 'Deshaz la tipificación.', 'اعكس التوحيد.', 'Undo the standardising.'), math: same('$x=48+1{,}04\\cdot 6=54{,}24$') }
        ],
        takeaway: say(
            'Ehuneko batetik: idatzi $P(Z\\le k)$ (behekoa beti), bilatu $k$ taulan alderantziz, eta $x=\\mu+k\\,\\sigma$. Ezkerreko buztana bada, $k$ negatiboa da.',
            'Desde un porcentaje: escribe $P(Z\\le k)$ (siempre lo de debajo), busca $k$ en la tabla al revés y $x=\\mu+k\\,\\sigma$. Si es la cola izquierda, $k$ es negativo.',
            'من نسبة: اكتب $P(Z\\le k)$ (ما تحت دائمًا)، وابحث عن $k$ في الجدول بالعكس، ثم $x=\\mu+k\\,\\sigma$. وإذا كان الذيل الأيسر فـ $k$ سالب.',
            'From a percentage: write $P(Z\\le k)$ (always what lies below), find $k$ in the table backwards, and $x=\\mu+k\\,\\sigma$. If it is the left tail, $k$ is negative.'
        ),
        figure: (language) => <DeliveryFigure language={language} />
    },

    /* ---------- 4. Intervals and approximation ---------- */
    {
        id: 'characteristic-interval',
        stage: 'approximation',
        title: say('Tarte karakteristikoa', 'El intervalo característico', 'الفترة المميزة', 'The characteristic interval'),
        goal: say('Batez bestekoan zentratuta eta probabilitate jakin bat duen tartea aurkitzea: $\\mu\\pm z_{\\alpha/2}\\,\\sigma$.', 'Hallar el intervalo centrado en la media que tiene una probabilidad dada: $\\mu\\pm z_{\\alpha/2}\\,\\sigma$.', 'إيجاد الفترة المتمركزة حول المتوسط ذات احتمال معطى: $\\mu\\pm z_{\\alpha/2}\\,\\sigma$.', 'Find the interval centred on the mean with a given probability: $\\mu\\pm z_{\\alpha/2}\\,\\sigma$.'),
        problem: say('Gazteek sare sozialetan egunean igarotako denbora $N(90;\\,15)$ banaketa da, minututan. Aurkitu tarte karakteristikoa, % 95 probabilitatearekin.', 'El tiempo diario de los jóvenes en redes sociales sigue una $N(90;\\,15)$ en minutos. Halla el intervalo característico del 95 %.', 'يتبع الوقت اليومي للشباب على الشبكات الاجتماعية $N(90;\\,15)$ بالدقائق. جد الفترة المميزة لـ 95 %.', 'Young people\'s daily time on social media follows an $N(90;\\,15)$ in minutes. Find the 95% characteristic interval.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erdian % 95; bi buztanetan $\\alpha=0{,}05$, $0{,}025$ bakoitzean.', 'En el centro el 95 %; en las dos colas $\\alpha=0{,}05$, $0{,}025$ en cada una.', 'في الوسط 95 %؛ وفي الذيلين $\\alpha=0{,}05$، أي $0{,}025$ في كل منهما.', '95% in the middle; in the two tails $\\alpha=0{,}05$, $0{,}025$ in each.'), math: same('$P(Z\\le z_{\\alpha/2})=0{,}975\\ \\to\\ z_{\\alpha/2}=1{,}96$') },
            { text: say('Erradioa:', 'El radio:', 'نصف القطر:', 'The radius:'), math: same('$1{,}96\\cdot 15=29{,}4$') },
            { text: say('Tartea:', 'El intervalo:', 'الفترة:', 'The interval:'), math: same('$(90-29{,}4;\\ 90+29{,}4)=(60{,}6;\\ 119{,}4)$') }
        ],
        takeaway: say(
            'Probabilitatea $1-\\alpha$ duen tarte karakteristikoa $(\\mu-z_{\\alpha/2}\\,\\sigma;\\ \\mu+z_{\\alpha/2}\\,\\sigma)$ da. Balio kritikoak: % 90 → 1,645; % 95 → 1,96; % 99 → 2,575.',
            'El intervalo característico de probabilidad $1-\\alpha$ es $(\\mu-z_{\\alpha/2}\\,\\sigma;\\ \\mu+z_{\\alpha/2}\\,\\sigma)$. Valores críticos: 90 % → 1,645; 95 % → 1,96; 99 % → 2,575.',
            'الفترة المميزة ذات الاحتمال $1-\\alpha$ هي $(\\mu-z_{\\alpha/2}\\,\\sigma;\\ \\mu+z_{\\alpha/2}\\,\\sigma)$. القيم الحرجة: 90 % → 1.645؛ 95 % → 1.96؛ 99 % → 2.575.',
            'The characteristic interval with probability $1-\\alpha$ is $(\\mu-z_{\\alpha/2}\\,\\sigma;\\ \\mu+z_{\\alpha/2}\\,\\sigma)$. Critical values: 90% → 1.645; 95% → 1.96; 99% → 2.575.'
        ),
        figureAfterSteps: true,
        figure: (language) => <ConnectionFigure language={language} />
    },
    {
        id: 'binomial-to-normal',
        stage: 'approximation',
        title: say('Binomiala normalarekin hurbiltzea', 'La binomial aproximada por la normal', 'تقريب الثنائي بالطبيعي', 'The binomial approximated by the normal'),
        goal: say('$n$ handia denean, $B(n;\\,p)$ banaketa $N(np;\\,\\sqrt{npq})$ banaketarekin hurbiltzea, $np\\ge 5$ eta $nq\\ge 5$ badira.', 'Cuando $n$ es grande, aproximar la $B(n;\\,p)$ por la $N(np;\\,\\sqrt{npq})$, si $np\\ge 5$ y $nq\\ge 5$.', 'عندما يكون $n$ كبيرًا، تقريب $B(n;\\,p)$ بـ $N(np;\\,\\sqrt{npq})$ إذا كان $np\\ge 5$ و$nq\\ge 5$.', 'When $n$ is large, approximate $B(n;\\,p)$ by $N(np;\\,\\sqrt{npq})$, if $np\\ge 5$ and $nq\\ge 5$.'),
        problem: say('Herritarren % 40 garraio publikoaren erabiltzailea da. 150 pertsonari galdetzen zaie. Hurbil daiteke normal batekin? Zeinekin?', 'El 40 % de la población usa el transporte público. Se pregunta a 150 personas. ¿Se puede aproximar por una normal? ¿Por cuál?', 'يستعمل 40 % من السكان النقل العام. يُسأل 150 شخصًا. هل يمكن التقريب بتوزيع طبيعي؟ وبأيّه؟', '40% of people use public transport. 150 people are asked. Can it be approximated by a normal? By which one?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$X\\sim B(150;\\,0{,}4)$. Egiaztatu baldintzak.', '$X\\sim B(150;\\,0{,}4)$. Comprueba las condiciones.', '$X\\sim B(150;\\,0{,}4)$. تحقق من الشرطين.', '$X\\sim B(150;\\,0{,}4)$. Check the conditions.'), math: same('$np=60\\ge 5\\qquad nq=90\\ge 5$') },
            { text: say('Batez bestekoa eta desbideratze tipikoa.', 'La media y la desviación típica.', 'المتوسط والانحراف المعياري.', 'The mean and the standard deviation.'), math: same('$\\sigma=\\sqrt{150\\cdot 0{,}4\\cdot 0{,}6}=\\sqrt{36}=6$') },
            { text: say('Hurbilketa: $N(60;\\,6)$.', 'La aproximación: $N(60;\\,6)$.', 'التقريب: $N(60;\\,6)$.', 'The approximation: $N(60;\\,6)$.') }
        ],
        takeaway: say(
            '$n$ handia eta $np\\ge 5$, $nq\\ge 5$ badira, $B(n;\\,p)\\approx N(np;\\,\\sqrt{npq})$. Barren forma kanpaiaren antzekoa da, eta kalkulua askoz errazagoa.',
            'Si $n$ es grande y $np\\ge 5$, $nq\\ge 5$, $B(n;\\,p)\\approx N(np;\\,\\sqrt{npq})$. Las barras tienen forma de campana y el cálculo es mucho más fácil.',
            'إذا كان $n$ كبيرًا و$np\\ge 5$ و$nq\\ge 5$ فإن $B(n;\\,p)\\approx N(np;\\,\\sqrt{npq})$. تأخذ الأعمدة شكل الجرس ويصبح الحساب أسهل بكثير.',
            'If $n$ is large and $np\\ge 5$, $nq\\ge 5$, $B(n;\\,p)\\approx N(np;\\,\\sqrt{npq})$. The bars take the shape of a bell and the calculation is much easier.'
        ),
        figure: (language) => <ParcelsFigure language={language} />
    },
    {
        id: 'continuity',
        stage: 'approximation',
        title: say('Jarraitutasun-zuzenketa', 'La corrección de continuidad', 'تصحيح الاستمرارية', 'The continuity correction'),
        goal: say('Binomiala normalarekin hurbiltzean, balio oso bakoitza puntu erdi zabaltzea.', 'Al aproximar la binomial por la normal, ensanchar cada valor entero medio punto.', 'عند تقريب الثنائي بالطبيعي، توسيع كل قيمة صحيحة بنصف وحدة.', 'When approximating the binomial by the normal, widen each whole value by half a unit.'),
        problem: say('Herritarren erdia lege baten alde dago. 100 pertsonari galdetzen zaie. Zein da gutxienez 58 alde egoteko probabilitatea?', 'La mitad de la población está a favor de una ley. Se pregunta a 100 personas. ¿Qué probabilidad hay de que al menos 58 estén a favor?', 'نصف السكان مع قانون. يُسأل 100 شخص. ما احتمال أن يكون 58 على الأقل معه؟', 'Half the population supports a law. 100 people are asked. What is the probability that at least 58 support it?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$B(100;\\,0{,}5)\\approx N(50;\\,5)$.', '$B(100;\\,0{,}5)\\approx N(50;\\,5)$.', '$B(100;\\,0{,}5)\\approx N(50;\\,5)$.', '$B(100;\\,0{,}5)\\approx N(50;\\,5)$.') },
            { text: say('«Gutxienez 58»: 58 barra osoa sartzen da, 57,5 zenbakitik hasita.', '«Al menos 58»: entra toda la barra del 58, desde 57,5.', '«58 على الأقل»: يدخل عمود 58 كله ابتداءً من 57.5.', '‘At least 58’: the whole bar of 58 goes in, from 57.5.'), math: same('$P(X\\ge 58)\\approx P(Y\\ge 57{,}5)$') },
            { text: say('Tipifikatu eta taula.', 'Tipifica y tabla.', 'وحّد واستعمل الجدول.', 'Standardise and use the table.'), math: same('${z}=\\frac{57{,}5-50}{5}=1{,}5\\ \\to\\ 1-0{,}9332=0{,}0668$') }
        ],
        takeaway: say(
            'Balio oso bakoitza barra bat da, zabalera 1 duena: $P(X\\ge k)\\approx P(Y\\ge k-0{,}5)$, $P(X\\le k)\\approx P(Y\\le k+0{,}5)$ eta $P(X=k)\\approx P(k-0{,}5\\le Y\\le k+0{,}5)$.',
            'Cada valor entero es una barra de anchura 1: $P(X\\ge k)\\approx P(Y\\ge k-0{,}5)$, $P(X\\le k)\\approx P(Y\\le k+0{,}5)$ y $P(X=k)\\approx P(k-0{,}5\\le Y\\le k+0{,}5)$.',
            'كل قيمة صحيحة عمود عرضه 1: $P(X\\ge k)\\approx P(Y\\ge k-0{,}5)$ و$P(X\\le k)\\approx P(Y\\le k+0{,}5)$ و$P(X=k)\\approx P(k-0{,}5\\le Y\\le k+0{,}5)$.',
            'Each whole value is a bar of width 1: $P(X\\ge k)\\approx P(Y\\ge k-0{,}5)$, $P(X\\le k)\\approx P(Y\\le k+0{,}5)$ and $P(X=k)\\approx P(k-0{,}5\\le Y\\le k+0{,}5)$.'
        ),
        figure: (language) => <ContinuityFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const distributionsBatx2gTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...distributionsBatx2gLessonTexts[topic.id as DistributionsBatx2gTopicId], ...distributionsBatx2gLessonChecks[topic.id as DistributionsBatx2gTopicId] }))
