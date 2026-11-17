import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import { above, below, between, tableLatex } from '../batx2-zientziak-banaketak/normal.ts'
import type { NormalBatx1gTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Normala · Batxilergoa 1 · Gizarte Zientziak — what each lesson tells:
   definitions, a short explanation, the example as an exercise («Another
   example»), the key words and, in some lessons, «Why does it work?».
   Plain data so the tests can import it. The example uses numbers of its
   own. The values of the normal table come from normal.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)
const P = (z: number) => tableLatex(below(z))
const Q = (z: number) => tableLatex(above(z))
const T = (tenThousandths: number) => tableLatex(tenThousandths)
/** z in braces, so that Basque never reads it as a case ending */
const Z = '{z}'

export const normalBatx1gLessonTexts: Record<NormalBatx1gTopicId, LessonTexts> = {
    /* ---------- 1. Before you start ---------- */
    histogram: {
        vocabulary: [
            say('histograma', 'histograma', 'المدرج التكراري', 'histogram'),
            say('altuera', 'altura', 'الارتفاع', 'height'),
            say('zabalera', 'anchura', 'العرض', 'width')
        ],
        explanation: say(
            'Klaseak zabalera berekoak ez direnean, barraren altuera ez da ehunekoa: barra zabal batek gehiago irudikatuko luke. Horregatik, altuera ehunekoa zati zabalera da, eta orduan azalerak ematen du proportzioa. Tarte baten probabilitatea haren gaineko azalera da, klasearen barruan datuak berdin banatuta daudela hartuta.',
            'Cuando las clases no tienen la misma anchura, la altura de la barra no es el porcentaje: una barra ancha aparentaría más. Por eso la altura es el porcentaje entre la anchura, y así el área da la proporción. La probabilidad de un intervalo es el área encima, suponiendo los datos repartidos por igual en la clase.',
            'عندما لا يكون للفئات العرض نفسه فارتفاع العمود ليس النسبة: العمود العريض يبدو أكبر. لذلك الارتفاع هو النسبة على العرض، وهكذا تعطي المساحة النسبة. واحتمال مجال هو المساحة فوقه، على افتراض أن البيانات موزعة بالتساوي داخل الفئة.',
            'When the classes do not have the same width, the height of the bar is not the percentage: a wide bar would look bigger. So the height is the percentage over the width, and then the area gives the proportion. The probability of an interval is the area above it, assuming the data are spread evenly within the class.'
        ),
        examplePrompt: say('Bi klase: 0–3, % 45, eta 3–9, % 55. Zenbat da $P(X\\le 6)$?', 'Dos clases: 0–3, el 45 %, y 3–9, el 55 %. ¿Cuánto vale $P(X\\le 6)$?', 'فئتان: 0–3: 45٪، و3–9: 55٪. كم يساوي $P(X\\le 6)$؟', 'Two classes: 0–3, 45%, and 3–9, 55%. What is $P(X\\le 6)$?'),
        example: same('$0{,}45+3\\cdot\\frac{0{,}55}{6}=0{,}725$'),
        exampleAnswer: say('Bigarren klasearen erdia hartzen da: $\\frac{0{,}55}{2}=0{,}275$.', 'Se toma la mitad de la segunda clase: $\\frac{0{,}55}{2}=0{,}275$.', 'نأخذ نصف الفئة الثانية: $\\frac{0{,}55}{2}=0{,}275$.', 'Half of the second class is taken: $\\frac{0{,}55}{2}=0{,}275$.')
    },
    'standard-score': {
        definitions: [
            { term: say('Puntuazio tipikoa', 'Puntuación típica', 'الدرجة المعيارية', 'Standard score'), meaning: say(`$${Z}=\\frac{x-\\mu}{\\sigma}$: datu bat batez bestekotik zenbat desbideratzetara dagoen.`, `$${Z}=\\frac{x-\\mu}{\\sigma}$: a cuántas desviaciones está un dato de la media.`, `$${Z}=\\frac{x-\\mu}{\\sigma}$: كم انحرافًا يبعد معطى عن المتوسط.`, `$${Z}=\\frac{x-\\mu}{\\sigma}$: how many deviations a value is from the mean.`) }
        ],
        vocabulary: [
            say('batez bestekoa', 'media', 'المتوسط', 'mean'),
            say('desbideratzea', 'desviación', 'الانحراف', 'deviation')
        ],
        explanation: say(
            '8 bat ona da edo ez, taldearen arabera. Puntuazio tipikoak datua bere taldearekin alderatzen du: batez bestekoa kendu, eta desbideratzeaz zatitu. Horrela, unitate eta eskala desberdinetako datuak alderatu daitezke. Alderantziz, ${z}$ ezagututa, $x=\\mu+{z}\\,\\sigma$.',
            'Un 8 es bueno o no según el grupo. La puntuación típica compara el dato con su grupo: se resta la media y se divide entre la desviación. Así se pueden comparar datos con unidades y escalas distintas. Al revés, conocida ${z}$, $x=\\mu+{z}\\,\\sigma$.',
            'العلامة 8 جيدة أو لا بحسب المجموعة. تقارن الدرجة المعيارية المعطى بمجموعته: نطرح المتوسط ونقسم على الانحراف. وهكذا يمكن مقارنة معطيات بوحدات ومقاييس مختلفة. وبالعكس، إذا عُرفت ${z}$ فإن $x=\\mu+{z}\\,\\sigma$.',
            'An 8 is good or not depending on the group. The standard score compares the value with its group: subtract the mean and divide by the deviation. That way values with different units and scales can be compared. The other way round, knowing ${z}$, $x=\\mu+{z}\\,\\sigma$.'
        ),
        examplePrompt: say('Batez bestekoa 50 da, $\\sigma=4$, eta datu batek ${z}=-1{,}25$ du. Zein da datua?', 'La media es 50, $\\sigma=4$, y un dato tiene ${z}=-1{,}25$. ¿Cuál es el dato?', 'المتوسط 50 و$\\sigma=4$، ولمعطى ${z}=-1{,}25$. ما المعطى؟', 'The mean is 50, $\\sigma=4$, and a value has ${z}=-1{,}25$. What is the value?'),
        example: same('$x=50-1{,}25\\cdot 4=45$'),
        exampleAnswer: say('Batez bestekotik 5 unitate behera dago.', 'Está 5 unidades por debajo de la media.', 'إنه تحت المتوسط بخمس وحدات.', 'It is 5 units below the mean.')
    },

    /* ---------- 2. Continuous variable ---------- */
    density: {
        definitions: [
            { term: say('Aldagai jarraitua', 'Variable continua', 'المتغير المتصل', 'Continuous variable'), meaning: say('Tarte bateko edozein balio har dezakeen aldagaia: denbora, pisua, altuera.', 'La que puede tomar cualquier valor de un intervalo: tiempo, peso, estatura.', 'متغير يمكن أن يأخذ أي قيمة في مجال: الزمن والوزن والطول.', 'One that can take any value in an interval: time, weight, height.') },
            { term: say('Dentsitate-funtzioa', 'Función de densidad', 'دالة الكثافة', 'Density function'), meaning: say('Azpiko azalerek probabilitateak ematen dituzten kurba; azalera osoa 1 da.', 'La curva cuyas áreas debajo son las probabilidades; el área total es 1.', 'منحنى تعطي المساحات تحته الاحتمالات؛ المساحة الكلية 1.', 'The curve whose areas underneath are the probabilities; the total area is 1.') }
        ],
        vocabulary: [
            say('azalera', 'área', 'المساحة', 'area'),
            say('laukizuzena', 'rectángulo', 'المستطيل', 'rectangle')
        ],
        explanation: say(
            'Histograma bati klase estuagoak eta datu gehiago jartzean, barrak kurba leun bat bihurtzen dira: dentsitatea. Probabilitateak haren azpiko azalerak dira. Balio bakar baten gainean azalerarik ez dagoenez, $P(X=a)=0$ da, eta berdin da muturra sartzea edo ez.',
            'Al poner a un histograma clases cada vez más estrechas y más datos, las barras se convierten en una curva suave: la densidad. Las probabilidades son las áreas bajo ella. Como sobre un solo valor no hay área, $P(X=a)=0$, y da igual incluir o no el extremo.',
            'عندما نجعل فئات المدرج أضيق والبيانات أكثر تصير الأعمدة منحنى أملس: الكثافة. والاحتمالات هي المساحات تحته. وبما أنه لا مساحة فوق قيمة واحدة فإن $P(X=a)=0$، ولا فرق في إدخال الطرف أو عدمه.',
            'Giving a histogram narrower and narrower classes and more data, the bars turn into a smooth curve: the density. The probabilities are the areas under it. Since there is no area over a single value, $P(X=a)=0$, and it does not matter whether the end is included.'
        ),
        examplePrompt: say('Dentsitate bat $k$ da 0 eta 8 artean. Zenbat dira $k$ eta $P(X\\le 2)$?', 'Una densidad vale $k$ entre 0 y 8. ¿Cuánto valen $k$ y $P(X\\le 2)$?', 'كثافة تساوي $k$ بين 0 و8. كم يساوي $k$ و$P(X\\le 2)$؟', 'A density is $k$ between 0 and 8. What are $k$ and $P(X\\le 2)$?'),
        example: same('$k=\\frac{1}{8}=0{,}125\\qquad P(X\\le 2)=2\\cdot 0{,}125=0{,}25$'),
        exampleAnswer: say('Laurdena: 8 minututik 2.', 'Una cuarta parte: 2 de los 8 minutos.', 'الربع: دقيقتان من 8.', 'A quarter: 2 of the 8 minutes.')
    },
    'straight-density': {
        vocabulary: [
            say('triangelua', 'triángulo', 'المثلث', 'triangle'),
            say('trapezioa', 'trapecio', 'شبه المنحرف', 'trapezium'),
            say('oinarria', 'base', 'القاعدة', 'base')
        ],
        explanation: say(
            'Batxilergo honetan, dentsitateak zati zuzenez eginak dira, eta azalerak geometriako formulekin kalkulatzen dira. Lehen urratsa beti bera da: azalera osoa 1 izan behar du, eta horrek ematen du $k$. Gero, eskatutako zatia marraztu eta haren azalera kalkulatu; batzuetan errazagoa da osotik kentzea.',
            'En este curso, las densidades están hechas de trozos rectos, y las áreas se calculan con fórmulas de geometría. El primer paso es siempre el mismo: el área total tiene que ser 1, y eso da $k$. Después se dibuja el trozo pedido y se calcula su área; a veces es más fácil restarlo del total.',
            'في هذا الصف تتكوّن الكثافات من قطع مستقيمة، وتُحسب المساحات بصيغ الهندسة. والخطوة الأولى دائمًا نفسها: يجب أن تكون المساحة الكلية 1، وهذا يعطي $k$. ثم نرسم الجزء المطلوب ونحسب مساحته؛ وأحيانًا يكون طرحه من الكل أسهل.',
            'In this course, densities are made of straight pieces, and the areas come from geometry formulas. The first step is always the same: the total area must be 1, and that gives $k$. Then draw the piece asked for and work out its area; sometimes it is easier to subtract it from the total.'
        ),
        examplePrompt: say('Dentsitate bat $k$ da 0 eta 2 artean, eta $2k$ 2 eta 4 artean. Zenbat da $k$?', 'Una densidad vale $k$ entre 0 y 2, y $2k$ entre 2 y 4. ¿Cuánto vale $k$?', 'كثافة تساوي $k$ بين 0 و2، و$2k$ بين 2 و4. كم يساوي $k$؟', 'A density is $k$ between 0 and 2, and $2k$ between 2 and 4. What is $k$?'),
        example: same('$2k+4k=1\\qquad k=\\frac{1}{6}$'),
        exampleAnswer: say('Eta $P(X\\le 2)=2\\cdot\\frac{1}{6}=\\frac{1}{3}$.', 'Y $P(X\\le 2)=2\\cdot\\frac{1}{6}=\\frac{1}{3}$.', 'و$P(X\\le 2)=2\\cdot\\frac{1}{6}=\\frac{1}{3}$.', 'And $P(X\\le 2)=2\\cdot\\frac{1}{6}=\\frac{1}{3}$.')
    },

    /* ---------- 3. The normal distribution ---------- */
    'normal-curve': {
        definitions: [
            { term: say('Banaketa normala', 'Distribución normal', 'التوزيع الطبيعي', 'Normal distribution'), meaning: say('Kanpai-formako dentsitatea, $N(\\mu;\\,\\sigma)$: altuerak, pisuak, neurketa-akatsak eta antzekoak.', 'La densidad en forma de campana, $N(\\mu;\\,\\sigma)$: estaturas, pesos, errores de medida y parecidos.', 'الكثافة على شكل جرس $N(\\mu;\\,\\sigma)$: الأطوال والأوزان وأخطاء القياس ونحوها.', 'The bell-shaped density, $N(\\mu;\\,\\sigma)$: heights, weights, measuring errors and the like.') }
        ],
        vocabulary: [
            say('kanpaia', 'campana', 'الجرس', 'bell'),
            say('simetria', 'simetría', 'التماثل', 'symmetry'),
            say('isatsa', 'cola', 'الذيل', 'tail')
        ],
        explanation: say(
            'Datu asko kanpai baten itxuran banatzen dira: gehienak batez bestekoaren inguruan, eta gutxi muturretan. Kanpai horri normala esaten zaio, eta bi zenbakik zehazten dute: $\\mu$ batez bestekoak, non dagoen, eta $\\sigma$ desbideratzeak, zenbat zabaltzen den. Simetrikoa da: $\\mu$ baliotik behera erdia.',
            'Muchos datos se reparten en forma de campana: la mayoría cerca de la media y pocos en los extremos. A esa campana se le llama normal, y la fijan dos números: la media $\\mu$, dónde está, y la desviación $\\sigma$, cuánto se abre. Es simétrica: por debajo de $\\mu$ queda la mitad.',
            'تتوزع بيانات كثيرة على شكل جرس: معظمها قرب المتوسط وقليل منها في الطرفين. يُسمى هذا الجرس الطبيعي، ويحدده عددان: المتوسط $\\mu$ أين يقع، والانحراف $\\sigma$ كم يتسع. وهو متماثل: تحت $\\mu$ يقع النصف.',
            'Many data are spread in the shape of a bell: most near the mean and few at the ends. That bell is called normal, and two numbers fix it: the mean $\\mu$, where it is, and the deviation $\\sigma$, how wide it opens. It is symmetric: half lies below $\\mu$.'
        ),
        examplePrompt: say('$N(30;\\,2)$ eta $N(30;\\,5)$: zein da altuagoa erdian?', '$N(30;\\,2)$ y $N(30;\\,5)$: ¿cuál es más alta en el centro?', '$N(30;\\,2)$ و$N(30;\\,5)$: أيهما أعلى في الوسط؟', '$N(30;\\,2)$ and $N(30;\\,5)$: which one is taller in the middle?'),
        example: same('$\\sigma=2<5$'),
        exampleAnswer: say('$N(30;\\,2)$: estuagoa denez, azalera bera (1) altuera handiagoarekin lortzen du.', '$N(30;\\,2)$: al ser más estrecha, consigue la misma área (1) con más altura.', '$N(30;\\,2)$: لأنه أضيق فإنه يبلغ المساحة نفسها (1) بارتفاع أكبر.', '$N(30;\\,2)$: being narrower, it reaches the same area (1) with more height.')
    },
    'sigma-rule': {
        vocabulary: [
            say('desbideratzea', 'desviación', 'الانحراف', 'deviation'),
            say('erdia', 'mitad', 'النصف', 'half'),
            say('isatsa', 'cola', 'الذيل', 'tail')
        ],
        explanation: say(
            'Normal guztiek forma bera dute: bakarrik mugitu eta zabaldu egiten dira. Horregatik, datuen zati bera dago beti batez bestekotik desbideratze batera, bitara edo hirura. Hiru zenbaki horiek jakinda, eta simetria erabiliz, kalkulu asko taularik gabe egiten dira.',
            'Todas las normales tienen la misma forma: solo se desplazan y se ensanchan. Por eso siempre queda la misma parte de los datos a una, dos o tres desviaciones de la media. Sabiendo esos tres números, y usando la simetría, muchos cálculos se hacen sin tabla.',
            'لكل التوزيعات الطبيعية الشكل نفسه: تنتقل وتتسع فقط. لذلك يبقى دائمًا الجزء نفسه من البيانات على بُعد انحراف أو اثنين أو ثلاثة من المتوسط. وبمعرفة هذه الأعداد الثلاثة واستعمال التماثل تُجرى حسابات كثيرة دون جدول.',
            'All normals have the same shape: they only move and widen. That is why the same share of the data always lies within one, two or three deviations of the mean. Knowing those three numbers, and using symmetry, many sums are done without a table.'
        ),
        examplePrompt: say('Etxe batzuen argi-kontsumoa $N(500;\\,50)$ da, kWh-tan. Zer zati dago 350 eta 650 artean?', 'El consumo de luz de unas casas sigue una $N(500;\\,50)$ en kWh. ¿Qué parte queda entre 350 y 650?', 'يتبع استهلاك الكهرباء لبيوت التوزيع $N(500;\\,50)$ بالكيلوواط ساعي. ما الجزء بين 350 و650؟', 'The electricity use of some homes follows $N(500;\\,50)$ in kWh. What share lies between 350 and 650?'),
        example: same(`$P(350\\le X\\le 650)=${T(between(-3, 3))}$`),
        exampleAnswer: say('350 eta 650 $\\mu\\pm 3\\sigma$ dira: ia etxe guztiak.', '350 y 650 son $\\mu\\pm 3\\sigma$: casi todas las casas.', '350 و650 هما $\\mu\\pm 3\\sigma$: تقريبًا كل البيوت.', '350 and 650 are $\\mu\\pm 3\\sigma$: nearly all the homes.')
    },
    'standard-table': {
        definitions: [
            { term: say('Normal estandarra', 'Normal estándar', 'الطبيعي المعياري', 'Standard normal'), meaning: say('$N(0;\\,1)$, batez bestekoa 0 eta desbideratzea 1 dituen normala; $Z$ izena du.', 'La normal $N(0;\\,1)$, de media 0 y desviación 1; se llama $Z$.', 'التوزيع $N(0;\\,1)$ ذو المتوسط 0 والانحراف 1؛ ويُسمى $Z$.', 'The normal $N(0;\\,1)$, with mean 0 and deviation 1; it is called $Z$.') }
        ],
        vocabulary: [
            say('taula', 'tabla', 'الجدول', 'table'),
            say('errenkada', 'fila', 'الصف', 'row'),
            say('zutabea', 'columna', 'العمود', 'column')
        ],
        explanation: say(
            'Kanpai baten azpiko azalerak ezin dira geometria hutsez kalkulatu; horregatik, $N(0;\\,1)$ banaketarenak taula batean daude. Taulak $k$ balioaren azpian geratzen den azalera ematen du, lau hamartarrekin. Errenkada $k$ balioaren lehen bi zifrekin aukeratzen da, eta zutabea ehunenekin.',
            'Las áreas bajo una campana no se pueden calcular con geometría; por eso las de la $N(0;\\,1)$ están en una tabla. La tabla da el área que queda por debajo de $k$, con cuatro decimales. La fila se elige con las dos primeras cifras de $k$, y la columna, con las centésimas.',
            'لا يمكن حساب المساحات تحت الجرس بالهندسة؛ لذلك توجد مساحات $N(0;\\,1)$ في جدول. يعطي الجدول المساحة تحت $k$ بأربعة أرقام عشرية. ويُختار الصف بالرقمين الأولين من $k$، والعمود بأجزاء المئة.',
            'The areas under a bell cannot be worked out with geometry; that is why those of $N(0;\\,1)$ are in a table. The table gives the area below $k$, with four decimals. The row is chosen with the first two figures of $k$, and the column with the hundredths.'
        ),
        examplePrompt: say('Zenbat da $P(Z\\le 0{,}75)$?', '¿Cuánto vale $P(Z\\le 0{,}75)$?', 'كم يساوي $P(Z\\le 0{,}75)$؟', 'What is $P(Z\\le 0{,}75)$?'),
        example: same(`$P(Z\\le 0{,}75)=${P(0.75)}$`),
        exampleAnswer: say('0,7 errenkada eta 0,05 zutabea.', 'Fila 0,7 y columna 0,05.', 'الصف 0.7 والعمود 0.05.', 'Row 0.7 and column 0.05.')
    },
    'table-symmetry': {
        vocabulary: [
            say('simetria', 'simetría', 'التماثل', 'symmetry'),
            say('negatiboa', 'negativo', 'سالب', 'negative')
        ],
        explanation: say(
            'Taulak kasu bakarra ematen du: $k$ positibo baten azpikoa. Beste guztiak hortik ateratzen dira. Gainetik dagoena 1 ken azpikoa da; kanpaia simetrikoa denez, $-k$ puntuaren azpikoa $k$ puntuaren gainekoa da; eta bi balioren artekoa, bi azpikoen kenketa.',
            'La tabla da un solo caso: lo de debajo de un $k$ positivo. Todos los demás salen de ahí. Lo de encima es 1 menos lo de debajo; como la campana es simétrica, lo de debajo de $-k$ es lo de encima de $k$; y lo de entre dos valores, la resta de los dos «por debajo».',
            'يعطي الجدول حالة واحدة: ما تحت $k$ موجب. وكل الحالات الأخرى تُستخرج منها. ما فوق هو 1 ناقص ما تحت؛ وبما أن الجرس متماثل فما تحت $-k$ هو ما فوق $k$؛ وما بين قيمتين هو فرق «ما تحت» للقيمتين.',
            'The table gives a single case: what lies below a positive $k$. All the others come from it. What lies above is 1 minus what lies below; since the bell is symmetric, below $-k$ is above $k$; and between two values, the difference of the two «below»s.'
        ),
        examplePrompt: say('Zenbat da $P(-1\\le Z\\le 1)$?', '¿Cuánto vale $P(-1\\le Z\\le 1)$?', 'كم يساوي $P(-1\\le Z\\le 1)$؟', 'What is $P(-1\\le Z\\le 1)$?'),
        example: same(`$2\\cdot ${P(1)}-1=${T(between(-1, 1))}$`),
        exampleAnswer: say('68–95–99,7 arauaren lehen zenbakia da.', 'Es el primer número de la regla del 68–95–99,7.', 'إنه العدد الأول في قاعدة 68–95–99.7.', 'It is the first number of the 68–95–99.7 rule.')
    },
    standardize: {
        vocabulary: [
            say('tipifikatu', 'tipificar', 'التوحيد المعياري', 'standardise'),
            say('taula', 'tabla', 'الجدول', 'table')
        ],
        explanation: say(
            'Normal bakoitzak bere taula beharko luke, baina tipifikatzean denak $N(0;\\,1)$ bihurtzen dira: batez bestekoa kentzean kanpaia 0 puntura mugitzen da, eta desbideratzeaz zatitzean zabalera 1 da. Probabilitatea ez da aldatzen: $x$ balioaren azpikoa haren ${z}$ balioaren azpikoa da.',
            'Cada normal necesitaría su tabla, pero al tipificar todas se convierten en $N(0;\\,1)$: al restar la media la campana se mueve al 0, y al dividir entre la desviación su anchura pasa a ser 1. La probabilidad no cambia: lo de debajo de $x$ es lo de debajo de su ${z}$.',
            'كل توزيع طبيعي سيحتاج إلى جدوله، لكن بالتوحيد المعياري تصير كلها $N(0;\\,1)$: بطرح المتوسط ينتقل الجرس إلى 0، وبالقسمة على الانحراف يصير عرضه 1. ولا يتغير الاحتمال: ما تحت $x$ هو ما تحت ${z}$ الخاصة به.',
            'Each normal would need its own table, but standardising turns them all into $N(0;\\,1)$: subtracting the mean moves the bell to 0, and dividing by the deviation makes its width 1. The probability does not change: below $x$ is below its ${z}$.'
        ),
        examplePrompt: say('$X\\sim N(60;\\,10)$. Zenbat da $P(X\\ge 72)$?', '$X\\sim N(60;\\,10)$. ¿Cuánto vale $P(X\\ge 72)$?', '$X\\sim N(60;\\,10)$. كم يساوي $P(X\\ge 72)$؟', '$X\\sim N(60;\\,10)$. What is $P(X\\ge 72)$?'),
        example: same(`$P(Z\\ge 1{,}2)=1-${P(1.2)}=${Q(1.2)}$`),
        exampleAnswer: say(`${'$'}${Z}=\\frac{72-60}{10}=1{,}2$, eta gainetik dagoena.`, `$${Z}=\\frac{72-60}{10}=1{,}2$, y lo de encima.`, `$${Z}=\\frac{72-60}{10}=1{,}2$، ثم ما فوق.`, `$${Z}=\\frac{72-60}{10}=1{,}2$, and what lies above.`),
        why: {
            text: say('Zergatik ez da probabilitatea aldatzen? $X\\le x$ eta ${z}$ balioaren azpikoa gertaera bera dira: bi aldeetatik zenbaki bera kentzeak eta positibo batez zatitzeak ez dute desberdintza aldatzen.', '¿Por qué no cambia la probabilidad? $X\\le x$ y quedar por debajo de ${z}$ son el mismo suceso: restar el mismo número a los dos lados y dividir entre un positivo no cambia la desigualdad.', 'لماذا لا يتغير الاحتمال؟ $X\\le x$ والوقوع تحت ${z}$ حدث واحد: طرح العدد نفسه من الطرفين والقسمة على عدد موجب لا يغيّران المتباينة.', 'Why does the probability not change? $X\\le x$ and falling below ${z}$ are the same event: subtracting the same number from both sides and dividing by a positive one do not change the inequality.')
        }
    },
    inverse: {
        vocabulary: [
            say('ebaketa-nota', 'nota de corte', 'العلامة الدنيا', 'cut-off mark'),
            say('ehunekoa', 'porcentaje', 'النسبة المئوية', 'percentage')
        ],
        explanation: say(
            'Batzuetan probabilitatea ezaguna da, eta balioa bilatzen da: plaza kopuru batek, beka batek edo pertzentil batek muga bat eskatzen du. Bidea alderantzizkoa da: azpitik geratzen den zatia taularen barruan bilatu $k$ ateratzeko, eta gero tipifikazioa desegin.',
            'A veces se conoce la probabilidad y se busca el valor: un número de plazas, una beca o un percentil piden un límite. El camino es el inverso: busca dentro de la tabla la parte que queda por debajo para sacar $k$, y después deshaz la tipificación.',
            'أحيانًا يُعرف الاحتمال ويُبحث عن القيمة: عدد المقاعد أو منحة أو مئين يتطلب حدًّا. والطريق معكوس: ابحث داخل الجدول عن الجزء الذي يبقى تحت لتستخرج $k$، ثم اعكس التوحيد المعياري.',
            'Sometimes the probability is known and the value is sought: a number of places, a grant or a percentile call for a limit. The path is the inverse one: look inside the table for the part below to get $k$, then undo the standardising.'
        ),
        examplePrompt: say('$N(100;\\,15)$ banaketan, zein balio da 75. pertzentila?', 'En una $N(100;\\,15)$, ¿qué valor es el percentil 75?', 'في $N(100;\\,15)$، ما القيمة التي هي المئين 75؟', 'In $N(100;\\,15)$, which value is the 75th percentile?'),
        example: same('$x=100+0{,}67\\cdot 15=110{,}05$'),
        exampleAnswer: say(`$P(Z\\le 0{,}67)=${P(0.67)}$ da 0,75 zenbakitik hurbilena.`, `$P(Z\\le 0{,}67)=${P(0.67)}$ es lo más cercano a 0,75.`, `$P(Z\\le 0{,}67)=${P(0.67)}$ هو الأقرب إلى 0.75.`, `$P(Z\\le 0{,}67)=${P(0.67)}$ is the closest to 0.75.`)
    },

    /* ---------- 4. From the binomial to the normal ---------- */
    'binomial-to-normal': {
        vocabulary: [
            say('batez bestekoa', 'media', 'المتوسط', 'mean'),
            say('baldintza', 'condición', 'الشرط', 'condition')
        ],
        explanation: say(
            '$n$ handia denean, binomial baten barrek kanpai baten itxura hartzen dute, $p$ oso txikia edo oso handia ez bada. Baldintza: $np\\ge 5$ eta $nq\\ge 5$. Orduan, binomialaren batez besteko eta desbideratze bera dituen normala hartzen da.',
            'Cuando $n$ es grande, las barras de una binomial toman forma de campana, salvo que $p$ sea muy pequeña o muy grande. La condición: $np\\ge 5$ y $nq\\ge 5$. Entonces se toma la normal con la misma media y la misma desviación que la binomial.',
            'عندما يكون $n$ كبيرًا تأخذ أعمدة التوزيع الثنائي شكل جرس، إلا إذا كان $p$ صغيرًا جدًّا أو كبيرًا جدًّا. الشرط: $np\\ge 5$ و$nq\\ge 5$. وعندئذ نأخذ التوزيع الطبيعي ذا المتوسط والانحراف نفسيهما.',
            'When $n$ is large, the bars of a binomial take the shape of a bell, unless $p$ is very small or very large. The condition: $np\\ge 5$ and $nq\\ge 5$. Then take the normal with the same mean and the same deviation as the binomial.'
        ),
        examplePrompt: say('Zein normalek hurbiltzen du $B(400;\\,0{,}5)$?', '¿Qué normal aproxima a $B(400;\\,0{,}5)$?', 'أي توزيع طبيعي يقرّب $B(400;\\,0{,}5)$؟', 'Which normal approximates $B(400;\\,0{,}5)$?'),
        example: same('$\\sigma=\\sqrt{400\\cdot 0{,}5\\cdot 0{,}5}=10$'),
        exampleAnswer: say('$\\mu=200$ denez, $N(200;\\,10)$.', 'Como $\\mu=200$, $N(200;\\,10)$.', 'بما أن $\\mu=200$ فهو $N(200;\\,10)$.', 'Since $\\mu=200$, $N(200;\\,10)$.')
    },
    continuity: {
        vocabulary: [
            say('barra', 'barra', 'العمود', 'bar'),
            say('zuzenketa', 'corrección', 'التصحيح', 'correction')
        ],
        explanation: say(
            'Binomialak balio osoak hartzen ditu, eta normalak, edozein. Bat bestearekin ordezkatzeko, balio oso bakoitza 1 zabaleko barra bat da, $k-0{,}5$ puntutik $k+0{,}5$ punturaino. Mugako balioa sartzen bada, haren barra osoa hartzen da; sartzen ez bada, ez da hartzen.',
            'La binomial toma valores enteros, y la normal, cualquiera. Para cambiar una por otra, cada valor entero es una barra de anchura 1, de $k-0{,}5$ a $k+0{,}5$. Si el valor del borde entra, se toma su barra entera; si no entra, no se toma.',
            'يأخذ التوزيع الثنائي قيمًا صحيحة، والطبيعي أي قيمة. ولاستبدال أحدهما بالآخر تكون كل قيمة صحيحة عمودًا عرضه 1، من $k-0{,}5$ إلى $k+0{,}5$. فإذا دخلت القيمة الحدّية أُخذ عمودها كله، وإلا فلا.',
            'The binomial takes whole values, and the normal, any value. To swap one for the other, each whole value is a bar of width 1, from $k-0{,}5$ to $k+0{,}5$. If the boundary value is in, its whole bar is taken; if it is not, it is not.'
        ),
        examplePrompt: say('$X\\sim B(16;\\,0{,}5)$. Normalarekin, zenbat da $P(X\\le 10)$?', '$X\\sim B(16;\\,0{,}5)$. Con la normal, ¿cuánto vale $P(X\\le 10)$?', '$X\\sim B(16;\\,0{,}5)$. بالتوزيع الطبيعي، كم يساوي $P(X\\le 10)$؟', '$X\\sim B(16;\\,0{,}5)$. Using the normal, what is $P(X\\le 10)$?'),
        example: same(`$${Z}=\\frac{10{,}5-8}{2}=1{,}25\\qquad P(Z\\le 1{,}25)=${P(1.25)}$`),
        exampleAnswer: say('$N(8;\\,2)$ normalarekin, eta 10 balioaren barra 10,5 arte.', 'Con $N(8;\\,2)$, y la barra del 10 hasta 10,5.', 'بـ $N(8;\\,2)$، وعمود 10 حتى 10.5.', 'With $N(8;\\,2)$, and the bar of 10 up to 10.5.')
    },

    /* ---------- 5. Fitting a normal ---------- */
    'fit-parameters': {
        definitions: [
            { term: say('Klase-marka', 'Marca de clase', 'مركز الفئة', 'Class mark'), meaning: say('Klase baten erdiko puntua, klaseko datu guztien ordezkari gisa erabiltzen dena.', 'El punto medio de una clase, que se usa en lugar de todos sus datos.', 'النقطة الوسطى لفئة، وتُستعمل بدل كل بياناتها.', 'The midpoint of a class, used in place of all its data.') }
        ],
        vocabulary: [
            say('klasea', 'clase', 'الفئة', 'class'),
            say('maiztasuna', 'frecuencia', 'التكرار', 'frequency')
        ],
        explanation: say(
            'Datuak klaseetan taldekatuta daudenean, ez dakigu zehazki zenbat diren; klase bakoitzeko datuak haren klase-markan daudela hartzen da. Horrela kalkulatzen dira $\\bar{x}$ eta $s$, maiztasun-taula batean bezala, eta haiek dira doitzeko normalaren $\\mu$ eta $\\sigma$.',
            'Cuando los datos están agrupados en clases no sabemos su valor exacto; se supone que los de cada clase están en su marca de clase. Así se calculan $\\bar{x}$ y $s$, como en una tabla de frecuencias, y ellos son la $\\mu$ y la $\\sigma$ de la normal con la que se ajusta.',
            'عندما تكون البيانات مجمّعة في فئات لا نعرف قيمتها بالضبط؛ فنفترض أن بيانات كل فئة عند مركزها. وهكذا نحسب $\\bar{x}$ و$s$ كما في جدول تكرارات، وهما $\\mu$ و$\\sigma$ للتوزيع الطبيعي الذي نطابق معه.',
            'When the data are grouped in classes we do not know their exact values; the data of each class are taken to be at its class mark. That is how $\\bar{x}$ and $s$ are worked out, as in a frequency table, and they are the $\\mu$ and $\\sigma$ of the normal to fit.'
        ),
        examplePrompt: say('Bi klase: 0–4 (6 datu) eta 4–8 (2 datu). Zenbat da $\\bar{x}$?', 'Dos clases: 0–4 (6 datos) y 4–8 (2 datos). ¿Cuánto vale $\\bar{x}$?', 'فئتان: 0–4 (6 معطيات) و4–8 (معطيان). كم يساوي $\\bar{x}$؟', 'Two classes: 0–4 (6 data) and 4–8 (2 data). What is $\\bar{x}$?'),
        example: same('$\\bar{x}=\\frac{2\\cdot 6+6\\cdot 2}{8}=3$'),
        exampleAnswer: say('Klase-markak 2 eta 6 dira.', 'Las marcas de clase son 2 y 6.', 'مركزا الفئتين 2 و6.', 'The class marks are 2 and 6.')
    },
    'fit-expected': {
        vocabulary: [
            say('muturra', 'extremo', 'الطرف', 'end'),
            say('itxarona', 'esperado', 'المتوقع', 'expected')
        ],
        explanation: say(
            'Normala egia balitz, zenbat datu egongo lirateke klase bakoitzean? Klasearen muturrak tipifikatu, taularekin haien arteko azalera kalkulatu, eta datu kopuruaz biderkatu: $N\\cdot p$. Lehen eta azken klaseak irekita hartzen dira, normalak muturrak ere betetzen baititu.',
            'Si la normal fuera cierta, ¿cuántos datos habría en cada clase? Se tipifican los extremos de la clase, se calcula con la tabla el área entre ellos y se multiplica por el número de datos: $N\\cdot p$. La primera y la última clase se toman abiertas, porque la normal también llena los extremos.',
            'لو كان التوزيع الطبيعي صحيحًا، فكم معطى سيكون في كل فئة؟ نوحّد طرفي الفئة، ونحسب بالجدول المساحة بينهما، ونضرب في عدد البيانات: $N\\cdot p$. وتؤخذ الفئتان الأولى والأخيرة مفتوحتين لأن التوزيع الطبيعي يملأ الأطراف أيضًا.',
            'If the normal were true, how many data would be in each class? Standardise the ends of the class, work out the area between them with the table and multiply by the number of data: $N\\cdot p$. The first and last classes are taken as open, because the normal also fills the ends.'
        ),
        examplePrompt: say('$N(20;\\,5)$ banaketan, zein da 15–25 klasearen probabilitatea?', 'En una $N(20;\\,5)$, ¿qué probabilidad tiene la clase 15–25?', 'في $N(20;\\,5)$، ما احتمال الفئة 15–25؟', 'In $N(20;\\,5)$, what is the probability of the class 15–25?'),
        example: same(`$P(-1\\le Z\\le 1)=${T(between(-1, 1))}$`),
        exampleAnswer: say('Muturrak $\\mu\\pm\\sigma$ dira.', 'Los extremos son $\\mu\\pm\\sigma$.', 'الطرفان هما $\\mu\\pm\\sigma$.', 'The ends are $\\mu\\pm\\sigma$.')
    },
    'fit-decision': {
        vocabulary: [
            say('diferentzia', 'diferencia', 'الفرق', 'difference'),
            say('balio absolutua', 'valor absoluto', 'القيمة المطلقة', 'absolute value')
        ],
        explanation: say(
            'Diskretuekin bezala, behatuak eta itxaronak ez dira inoiz berdinak izango. Diferentzien balio absolutua hartu eta handiena guztizkoarekin alderatzen da. Matellaren arauaz, % 5 baino gehiago ez bada, normala eredu ona da; bestela, datuek beste itxura bat dute, adibidez bi gailur edo isats luze bat.',
            'Como con las discretas, observados y esperados nunca serán iguales. Se toma el valor absoluto de las diferencias y la mayor se compara con el total. Con la regla de Matella, si no pasa del 5 %, la normal es un buen modelo; si pasa, los datos tienen otra forma, por ejemplo dos picos o una cola larga.',
            'كما في التوزيعات المتقطعة، لن تتساوى المشاهَدة والمتوقعة أبدًا. نأخذ القيمة المطلقة للفروق ونقارن أكبرها بالكل. وبقاعدة ماتيلا إذا لم يتجاوز 5٪ فالتوزيع الطبيعي نموذج جيد؛ وإلا فللبيانات شكل آخر، مثل قمتين أو ذيل طويل.',
            'As with the discrete ones, observed and expected values will never be equal. Take the absolute value of the differences and compare the largest with the total. With Matella\'s rule, if it is no more than 5%, the normal is a good model; if it is more, the data have another shape, for example two peaks or a long tail.'
        ),
        examplePrompt: say('500 datutan, diferentziarik handiena 30 da. Doikuntza onartzen da?', 'En 500 datos, la mayor diferencia es 30. ¿Se acepta el ajuste?', 'في 500 معطى أكبر فرق 30. هل تُقبل المطابقة؟', 'In 500 data, the largest difference is 30. Is the fit accepted?'),
        example: same('$\\frac{30}{500}=0{,}06$'),
        exampleAnswer: say('% 6 da, % 5 baino gehiago: doikuntza ez da onartzen.', 'Es el 6 %, más del 5 %: el ajuste se rechaza.', 'إنه 6٪، أكثر من 5٪: تُرفض المطابقة.', 'It is 6%, more than 5%: the fit is rejected.')
    }
}
