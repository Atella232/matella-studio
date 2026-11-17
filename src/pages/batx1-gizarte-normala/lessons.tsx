import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { below, between, tableLatex } from '../batx2-zientziak-banaketak/normal'
import { CoffeeFigure, CurvesFigure, CutoffFigure, DensityFigure, FitFigure, HalfStepFigure, HistogramFigure, ScoresFigure, SigmaFigure, SurveyFigure, SymmetryFigure, TableCornerFigure, TriangleFigure } from './figures'
import { normalBatx1gLessonChecks, type NormalBatx1gTopicId } from './lessonChecks'
import { normalBatx1gLessonTexts } from './lessonTexts'

/* ==========================================================================
   Normala · Batxilergoa 1 · Gizarte Zientziak — stages and lessons. The
   scope follows unit 10 of Anaya Matemáticas Aplicadas a las Ciencias
   Sociales I (Suma Piezas edition; unit 11 in the Estándar one): from the
   histogram to the density, densities made of straight pieces, the normal
   with its 68–95–99,7 rule, the table, standardising and the inverse
   search, the binomial approximated by the normal, and fitting grouped
   data to a normal with Matella's 5 % rule. Every table value comes from
   normal.ts. All the exercises and numbers are our own.
   Notation, as in the rest of the site: N(μ; σ) and P(Z ≤ k).
   ========================================================================== */

export type NormalBatx1gStageId = 'review' | 'continuous' | 'normal' | 'approximation' | 'fit'

export const normalBatx1gStages: UnitStage[] = [
    { id: 'review', tone: 'blue', title: { eu: 'Hasi aurretik: errepasoa', es: 'Antes de empezar: repaso', en: 'Before you start: review', ar: 'قبل أن تبدأ: مراجعة' } },
    { id: 'continuous', tone: 'violet', title: { eu: 'Aldagai jarraitua', es: 'Variable continua', en: 'Continuous variable', ar: 'المتغير المتصل' } },
    { id: 'normal', tone: 'mustard', title: { eu: 'Banaketa normala', es: 'La distribución normal', en: 'The normal distribution', ar: 'التوزيع الطبيعي' } },
    { id: 'approximation', tone: 'green', title: { eu: 'Binomialetik normalera', es: 'De la binomial a la normal', en: 'From the binomial to the normal', ar: 'من الثنائي إلى الطبيعي' } },
    { id: 'fit', tone: 'coral', title: { eu: 'Datuak normal batera doitzea', es: 'Ajuste a una normal', en: 'Fitting a normal', ar: 'المطابقة مع توزيع طبيعي' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })
/** Table values, for LaTeX */
const tableBelow = (z: number) => tableLatex(below(z))
const tableOf = (tenThousandths: number) => tableLatex(tenThousandths)
/** z in braces, so that Basque never reads it as a case ending */
const Z = '{z}'

/** «Review first»: lessons of earlier units that the new ones build on */
const need = {
    charts: { unit: 'batx1-zientziak/estadistica', topic: 'charts', title: { eu: 'Grafiko estatistikoak', es: 'Gráficos estadísticos', en: 'Statistical charts', ar: 'الرسوم الإحصائية' } },
    scores: { unit: 'batx1-zientziak/estadistica', topic: 'standard-scores', title: { eu: 'Puntuazio tipikoak', es: 'Puntuaciones típicas', en: 'Standard scores', ar: 'الدرجات المعيارية' } },
    meanSd: { unit: 'batx1-gizarte/distribuciones-discretas', topic: 'mean-sd', title: { eu: 'Batez bestekoa eta desbideratze tipikoa', es: 'Media y desviación típica', en: 'Mean and standard deviation', ar: 'المتوسط والانحراف المعياري' } },
    binomialSpread: { unit: 'batx1-gizarte/distribuciones-discretas', topic: 'binomial-parameters', title: { eu: 'Batez bestekoa eta sakabanatzea', es: 'Media y dispersión', en: 'Mean and spread', ar: 'المتوسط والتشتت' } },
    goodFit: { unit: 'batx1-gizarte/distribuciones-discretas', topic: 'good-fit', title: { eu: 'Doikuntza ona ala txarra?', es: '¿Ajuste bueno o malo?', en: 'A good or a bad fit?', ar: 'مطابقة جيدة أم سيئة؟' } }
}

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Before you start ---------- */
    {
        id: 'histogram',
        stage: 'review',
        title: say('Histograma, azalera gisa', 'El histograma como área', 'المدرج التكراري كمساحة', 'The histogram as an area'),
        goal: say('Klase zabalera desberdinetako histograma bat marraztea, barra bakoitzaren azalera haren ehunekoa izan dadin, eta azalerekin probabilitateak kalkulatzea.', 'Dibujar un histograma con clases de distinta anchura de modo que el área de cada barra sea su porcentaje, y calcular probabilidades con áreas.', 'رسم مدرج تكراري بفئات مختلفة العرض بحيث تكون مساحة كل عمود نسبته، وحساب الاحتمالات بالمساحات.', 'Draw a histogram with classes of different widths so that the area of each bar is its percentage, and work out probabilities with areas.'),
        needs: [need.charts],
        problem: say('Leihatila batean itxarondako minutuak: 0–2, % 30; 2–4, % 40; 4–6, % 20; 6–10, % 10. Zein da barra bakoitzaren altuera? Eta $P(X\\le 4)$ eta $P(3\\le X\\le 5)$?', 'Minutos de espera en una ventanilla: 0–2, el 30 %; 2–4, el 40 %; 4–6, el 20 %; 6–10, el 10 %. ¿Qué altura tiene cada barra? ¿Y $P(X\\le 4)$ y $P(3\\le X\\le 5)$?', 'دقائق الانتظار عند شبّاك: 0–2: 30٪؛ 2–4: 40٪؛ 4–6: 20٪؛ 6–10: 10٪. ما ارتفاع كل عمود؟ وما $P(X\\le 4)$ و$P(3\\le X\\le 5)$؟', 'Minutes of waiting at a counter: 0–2, 30%; 2–4, 40%; 4–6, 20%; 6–10, 10%. How tall is each bar? And $P(X\\le 4)$ and $P(3\\le X\\le 5)$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Altuera = proportzioa zati zabalera. Azken klaseak 4 minutu ditu.', 'Altura = proporción entre anchura. La última clase mide 4 minutos.', 'الارتفاع = النسبة على العرض. طول الفئة الأخيرة 4 دقائق.', 'Height = proportion over width. The last class is 4 minutes wide.'), math: same('$\\frac{0{,}3}{2}=0{,}15\\qquad\\frac{0{,}4}{2}=0{,}2\\qquad\\frac{0{,}2}{2}=0{,}1\\qquad\\frac{0{,}1}{4}=0{,}025$') },
            { text: say('4 minutu arte, lehen bi barrak.', 'Hasta 4 minutos, las dos primeras barras.', 'حتى 4 دقائق: العمودان الأولان.', 'Up to 4 minutes, the first two bars.'), math: same('$P(X\\le 4)=0{,}3+0{,}4=0{,}7$') },
            { text: say('3 eta 5 artean, minutu bat bigarren barran eta beste bat hirugarrenean.', 'Entre 3 y 5, un minuto de la segunda barra y otro de la tercera.', 'بين 3 و5: دقيقة من العمود الثاني وأخرى من الثالث.', 'Between 3 and 5, one minute of the second bar and one of the third.'), math: same('$P(3\\le X\\le 5)=1\\cdot 0{,}2+1\\cdot 0{,}1=0{,}3$') }
        ],
        takeaway: say(
            'Histograma batean, barra bakoitzaren azalera bere datuen proportzioa da: altuera = proportzioa zati zabalera. Horrela, tarte baten probabilitatea haren gaineko azalera da, eta azalera guztiek 1 egiten dute batuta.',
            'En un histograma, el área de cada barra es la proporción de sus datos: altura = proporción entre anchura. Así, la probabilidad de un intervalo es el área que hay encima, y todas las áreas suman 1.',
            'في المدرج التكراري مساحة كل عمود هي نسبة بياناته: الارتفاع = النسبة على العرض. وهكذا يكون احتمال مجال المساحةَ فوقه، ومجموع كل المساحات 1.',
            'In a histogram, the area of each bar is the proportion of its data: height = proportion over width. So the probability of an interval is the area above it, and all the areas add up to 1.'
        ),
        figureAfterSteps: true,
        figure: (language) => <HistogramFigure language={language} />
    },
    {
        id: 'standard-score',
        stage: 'review',
        title: say('Puntuazio tipikoa', 'La puntuación típica', 'الدرجة المعيارية', 'The standard score'),
        goal: say('Datu baten puntuazio tipikoa kalkulatzea eta, horrekin, banaketa desberdinetako datuak alderatzea.', 'Calcular la puntuación típica de un dato y, con ella, comparar datos de distribuciones distintas.', 'حساب الدرجة المعيارية لمعطى، والمقارنة بها بين معطيات من توزيعات مختلفة.', 'Work out the standard score of a value and use it to compare values from different distributions.'),
        needs: [need.scores],
        problem: say('Anek 8,4 atera du batez bestekoa 6 eta $\\sigma=1{,}5$ dituen azterketa batean; Jonek, 72, batez bestekoa 60 eta $\\sigma=8$ dituen beste batean. Nor nabarmentzen da gehiago?', 'Ane saca 8,4 en un examen de media 6 y $\\sigma=1{,}5$; Jon saca 72 en otro de media 60 y $\\sigma=8$. ¿Quién destaca más?', 'حصلت آنه على 8.4 في امتحان متوسطه 6 و$\\sigma=1{,}5$؛ وحصل جون على 72 في آخر متوسطه 60 و$\\sigma=8$. من يتميّز أكثر؟', 'Ane gets 8.4 in an exam with mean 6 and $\\sigma=1{,}5$; Jon gets 72 in another with mean 60 and $\\sigma=8$. Who stands out more?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Aneren puntuazio tipikoa:', 'La puntuación típica de Ane:', 'الدرجة المعيارية لآنه:', 'Ane\'s standard score:'), math: same(`$${Z}=\\frac{8{,}4-6}{1{,}5}=1{,}6$`) },
            { text: say('Jonena:', 'La de Jon:', 'درجة جون:', 'Jon\'s:'), math: same(`$${Z}=\\frac{72-60}{8}=1{,}5$`) },
            { text: say('Anek desbideratze gehiagotara gainditzen du bere batez bestekoa: hura nabarmentzen da gehiago.', 'Ane supera su media en más desviaciones: destaca más.', 'تتجاوز آنه متوسطها بانحرافات أكثر: هي الأكثر تميّزًا.', 'Ane beats her mean by more deviations: she stands out more.'), math: same('$1{,}6>1{,}5$') }
        ],
        takeaway: say(
            `${'$'}${Z}=\\frac{x-\\mu}{\\sigma}$ puntuazio tipikoak esaten du datu bat batez bestekotik zenbat desbideratzetara dagoen: positiboa gainetik, negatiboa azpitik. Unitaterik ez duenez, banaketa desberdinetako datuak alderatzeko balio du.`,
            `La puntuación típica $${Z}=\\frac{x-\\mu}{\\sigma}$ dice a cuántas desviaciones está un dato de la media: positiva por encima, negativa por debajo. Como no tiene unidades, sirve para comparar datos de distribuciones distintas.`,
            `تقول الدرجة المعيارية $${Z}=\\frac{x-\\mu}{\\sigma}$ كم انحرافًا يبعد المعطى عن المتوسط: موجبة فوقه وسالبة تحته. وبما أنها بلا وحدات فهي تصلح لمقارنة معطيات من توزيعات مختلفة.`,
            `The standard score $${Z}=\\frac{x-\\mu}{\\sigma}$ says how many deviations a value is from the mean: positive above, negative below. Since it has no units, it compares values from different distributions.`
        ),
        figureAfterSteps: true,
        figure: (language) => <ScoresFigure language={language} />
    },

    /* ---------- 2. Continuous variable ---------- */
    {
        id: 'density',
        stage: 'continuous',
        title: say('Dentsitate-funtzioa', 'La función de densidad', 'دالة الكثافة', 'The density function'),
        goal: say('Aldagai jarraitu baten probabilitateak dentsitatearen azpiko azalera gisa kalkulatzea, eta $P(X=a)=0$ dela ulertzea.', 'Calcular probabilidades de una variable continua como áreas bajo la densidad, y entender que $P(X=a)=0$.', 'حساب احتمالات متغير متصل كمساحات تحت الكثافة، وفهم أن $P(X=a)=0$.', 'Work out probabilities of a continuous variable as areas under the density, and understand that $P(X=a)=0$.'),
        problem: say('Tren bat iristeko minutuak, $X$, berdin banatuta daude 2 eta 7 artean: dentsitatea $k$ da han, eta 0 kanpoan. Aurkitu $k$, $P(3\\le X\\le 5)$ eta $P(X=4)$.', 'Los minutos que tarda un tren, $X$, se reparten por igual entre 2 y 7: la densidad vale $k$ ahí y 0 fuera. Halla $k$, $P(3\\le X\\le 5)$ y $P(X=4)$.', 'تتوزع دقائق تأخر قطار $X$ بالتساوي بين 2 و7: الكثافة $k$ هناك و0 خارج ذلك. أوجد $k$ و$P(3\\le X\\le 5)$ و$P(X=4)$.', 'The minutes a train takes, $X$, are spread evenly between 2 and 7: the density is $k$ there and 0 outside. Find $k$, $P(3\\le X\\le 5)$ and $P(X=4)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Azalera osoa 1 da: 5 zabaleko eta $k$ altuerako laukizuzena.', 'El área total es 1: un rectángulo de base 5 y altura $k$.', 'المساحة الكلية 1: مستطيل قاعدته 5 وارتفاعه $k$.', 'The total area is 1: a rectangle with base 5 and height $k$.'), math: same('$5k=1\\qquad k=0{,}2$') },
            { text: say('3 eta 5 artean, 2 zabaleko laukizuzena.', 'Entre 3 y 5, un rectángulo de base 2.', 'بين 3 و5 مستطيل قاعدته 2.', 'Between 3 and 5, a rectangle with base 2.'), math: same('$P(3\\le X\\le 5)=2\\cdot 0{,}2=0{,}4$') },
            { text: say('Balio bakar baten gainean ez dago azalerarik.', 'Sobre un solo valor no hay área.', 'لا مساحة فوق قيمة واحدة.', 'There is no area over a single value.'), math: same('$P(X=4)=0$') }
        ],
        takeaway: say(
            'Aldagai jarraitu baten $f$ dentsitatea ez da inoiz negatiboa, eta haren azpiko azalera osoa 1 da. $P(a\\le X\\le b)$ $a$ eta $b$ arteko azalera da, eta $P(X=a)=0$: berdin da $\\le$ ala $<$ jartzea.',
            'La densidad $f$ de una variable continua nunca es negativa y el área total bajo ella es 1. $P(a\\le X\\le b)$ es el área entre $a$ y $b$, y $P(X=a)=0$: da igual poner $\\le$ que $<$.',
            'كثافة متغير متصل $f$ ليست سالبة أبدًا، والمساحة الكلية تحتها 1. و$P(a\\le X\\le b)$ هو المساحة بين $a$ و$b$، و$P(X=a)=0$: لا فرق بين $\\le$ و$<$.',
            'The density $f$ of a continuous variable is never negative and the total area under it is 1. $P(a\\le X\\le b)$ is the area between $a$ and $b$, and $P(X=a)=0$: it makes no difference whether you write $\\le$ or $<$.'
        ),
        figureAfterSteps: true,
        figure: (language) => <DensityFigure language={language} />
    },
    {
        id: 'straight-density',
        stage: 'continuous',
        title: say('Zati zuzeneko dentsitateak', 'Densidades de trozos rectos', 'كثافات من قطع مستقيمة', 'Densities made of straight pieces'),
        goal: say('Triangelu, laukizuzen eta trapezio itxurako dentsitateetan $k$ aurkitzea eta probabilitateak azalera horiekin kalkulatzea.', 'Hallar $k$ en densidades con forma de triángulo, rectángulo o trapecio y calcular probabilidades con esas áreas.', 'إيجاد $k$ في كثافات على شكل مثلث أو مستطيل أو شبه منحرف، وحساب الاحتمالات بتلك المساحات.', 'Find $k$ in densities shaped like triangles, rectangles or trapeziums and work out probabilities with those areas.'),
        problem: say('Dentsitate bat $f(x)=kx$ da 0 eta 5 artean, eta 0 kanpoan. Aurkitu $k$, $P(X\\le 2)$ eta $P(X\\ge 4)$.', 'Una densidad es $f(x)=kx$ entre 0 y 5, y 0 fuera. Halla $k$, $P(X\\le 2)$ y $P(X\\ge 4)$.', 'كثافة هي $f(x)=kx$ بين 0 و5، و0 خارج ذلك. أوجد $k$ و$P(X\\le 2)$ و$P(X\\ge 4)$.', 'A density is $f(x)=kx$ between 0 and 5, and 0 outside. Find $k$, $P(X\\le 2)$ and $P(X\\ge 4)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Triangelu bat da: oinarria 5 eta altuera $5k$.', 'Es un triángulo de base 5 y altura $5k$.', 'إنه مثلث قاعدته 5 وارتفاعه $5k$.', 'It is a triangle with base 5 and height $5k$.'), math: same('$\\frac{5\\cdot 5k}{2}=1\\qquad k=0{,}08$') },
            { text: say('2 arte, triangelu txiki bat: oinarria 2 eta altuera $f(2)=0{,}16$.', 'Hasta 2, un triángulo pequeño de base 2 y altura $f(2)=0{,}16$.', 'حتى 2 مثلث صغير قاعدته 2 وارتفاعه $f(2)=0{,}16$.', 'Up to 2, a small triangle with base 2 and height $f(2)=0{,}16$.'), math: same('$P(X\\le 2)=\\frac{2\\cdot 0{,}16}{2}=0{,}16$') },
            { text: say('4 eta gehiago: osoa ken 4 arteko triangelua, altuera $f(4)=0{,}32$ duena.', 'Desde 4: el total menos el triángulo hasta 4, de altura $f(4)=0{,}32$.', 'من 4 فأكثر: الكل ناقص المثلث حتى 4 الذي ارتفاعه $f(4)=0{,}32$.', 'From 4 on: the total minus the triangle up to 4, with height $f(4)=0{,}32$.'), math: same('$P(X\\ge 4)=1-\\frac{4\\cdot 0{,}32}{2}=0{,}36$') }
        ],
        takeaway: say(
            'Dentsitatea zati zuzenez egina badago, azalerak geometriaz kalkulatzen dira: laukizuzena $b\\cdot h$, triangelua $\\frac{b\\cdot h}{2}$ eta trapezioa $\\frac{(B+b)\\,h}{2}$. Lehenik, $k$ ateratzen da azalera osoa 1 eginez.',
            'Si la densidad está hecha de trozos rectos, las áreas se calculan con geometría: rectángulo $b\\cdot h$, triángulo $\\frac{b\\cdot h}{2}$ y trapecio $\\frac{(B+b)\\,h}{2}$. Primero se saca $k$ haciendo que el área total sea 1.',
            'إذا كانت الكثافة من قطع مستقيمة فالمساحات تُحسب بالهندسة: المستطيل $b\\cdot h$، والمثلث $\\frac{b\\cdot h}{2}$، وشبه المنحرف $\\frac{(B+b)\\,h}{2}$. أولًا نستخرج $k$ بجعل المساحة الكلية 1.',
            'If the density is made of straight pieces, the areas come from geometry: rectangle $b\\cdot h$, triangle $\\frac{b\\cdot h}{2}$ and trapezium $\\frac{(B+b)\\,h}{2}$. First find $k$ by making the total area 1.'
        ),
        figureAfterSteps: true,
        figure: (language) => <TriangleFigure language={language} />
    },

    /* ---------- 3. The normal distribution ---------- */
    {
        id: 'normal-curve',
        stage: 'normal',
        title: say('Kanpai normala', 'La campana normal', 'الجرس الطبيعي', 'The normal bell'),
        goal: say('$N(\\mu;\\,\\sigma)$ kurbaren itxura ezagutzea: $\\mu$ erdian, simetria, eta $\\sigma$ handiagoarekin kanpai zabalagoa.', 'Conocer la forma de la curva $N(\\mu;\\,\\sigma)$: $\\mu$ en el centro, la simetría, y una campana más ancha con $\\sigma$ mayor.', 'معرفة شكل المنحنى $N(\\mu;\\,\\sigma)$: $\\mu$ في الوسط، والتماثل، وجرس أعرض مع $\\sigma$ أكبر.', 'Know the shape of the curve $N(\\mu;\\,\\sigma)$: $\\mu$ in the middle, symmetry, and a wider bell with a larger $\\sigma$.'),
        problem: say('Nesken altuerak $N(165;\\,6)$ dira, zentimetrotan. Zenbat da $P(X\\le 165)$? Zer da handiagoa, $P(X\\le 159)$ ala $P(X\\ge 171)$?', 'Las estaturas de unas chicas siguen una $N(165;\\,6)$ en cm. ¿Cuánto vale $P(X\\le 165)$? ¿Qué es mayor, $P(X\\le 159)$ o $P(X\\ge 171)$?', 'تتبع أطوال فتيات التوزيع $N(165;\\,6)$ بالسنتيمتر. كم يساوي $P(X\\le 165)$؟ وأيهما أكبر: $P(X\\le 159)$ أم $P(X\\ge 171)$؟', 'Some girls\' heights follow $N(165;\\,6)$ in cm. What is $P(X\\le 165)$? Which is greater, $P(X\\le 159)$ or $P(X\\ge 171)$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kanpaia simetrikoa da batez bestekoaren inguruan: erdia alde bakoitzean.', 'La campana es simétrica alrededor de la media: la mitad a cada lado.', 'الجرس متماثل حول المتوسط: النصف في كل جهة.', 'The bell is symmetric about the mean: half on each side.'), math: same('$P(X\\le 165)=0{,}5$') },
            { text: say('159 eta 171 batez bestekotik desbideratze batera daude, alde banatan.', '159 y 171 están a una desviación de la media, uno a cada lado.', '159 و171 على بُعد انحراف واحد من المتوسط، كلٌّ في جهة.', '159 and 171 are one deviation from the mean, one on each side.'), math: same('$165-6=159\\qquad 165+6=171$') },
            { text: say('Simetriagatik, bi isatsak berdinak dira.', 'Por simetría, las dos colas son iguales.', 'بالتماثل الذيلان متساويان.', 'By symmetry, the two tails are equal.'), math: same('$P(X\\le 159)=P(X\\ge 171)$') }
        ],
        takeaway: say(
            '$N(\\mu;\\,\\sigma)$ kurba kanpai bat da, simetrikoa $\\mu$ batez bestekoaren inguruan, eta hantxe du gailurra. $\\mu$ aldatzean, kanpaia mugitu egiten da; $\\sigma$ handitzean, zabaldu eta beheratu egiten da. Azpiko azalera beti da 1.',
            'La curva $N(\\mu;\\,\\sigma)$ es una campana simétrica alrededor de la media $\\mu$, donde tiene su máximo. Al cambiar $\\mu$, la campana se desplaza; al crecer $\\sigma$, se ensancha y se aplana. El área bajo ella es siempre 1.',
            'المنحنى $N(\\mu;\\,\\sigma)$ جرس متماثل حول المتوسط $\\mu$ حيث قمته. وبتغيير $\\mu$ ينتقل الجرس، وبزيادة $\\sigma$ يتسع وينخفض. والمساحة تحته دائمًا 1.',
            'The curve $N(\\mu;\\,\\sigma)$ is a bell, symmetric about the mean $\\mu$, where it peaks. Changing $\\mu$ moves the bell; increasing $\\sigma$ widens and flattens it. The area under it is always 1.'
        ),
        figure: (language) => <CurvesFigure language={language} />
    },
    {
        id: 'sigma-rule',
        stage: 'normal',
        title: say('68–95–99,7 araua', 'La regla del 68–95–99,7', 'قاعدة 68–95–99.7', 'The 68–95–99.7 rule'),
        goal: say('Taularik gabe kalkulatzea $\\mu\\pm\\sigma$, $\\mu\\pm 2\\sigma$ eta $\\mu\\pm 3\\sigma$ tarteetako probabilitateak, eta haien erdiak eta isatsak.', 'Calcular sin tabla las probabilidades de $\\mu\\pm\\sigma$, $\\mu\\pm 2\\sigma$ y $\\mu\\pm 3\\sigma$, y sus mitades y colas.', 'حساب احتمالات $\\mu\\pm\\sigma$ و$\\mu\\pm 2\\sigma$ و$\\mu\\pm 3\\sigma$ دون جدول، وأنصافها وذيولها.', 'Work out without a table the probabilities of $\\mu\\pm\\sigma$, $\\mu\\pm 2\\sigma$ and $\\mu\\pm 3\\sigma$, and their halves and tails.'),
        problem: say('Ogi-barra batzuen pisua $N(70;\\,5)$ da, gramotan. Kalkulatu $P(65\\le X\\le 75)$, $P(70\\le X\\le 80)$ eta $P(X\\ge 80)$.', 'El peso de unas barras de pan sigue una $N(70;\\,5)$ en gramos. Calcula $P(65\\le X\\le 75)$, $P(70\\le X\\le 80)$ y $P(X\\ge 80)$.', 'يتبع وزن أرغفة خبز التوزيع $N(70;\\,5)$ بالغرام. احسب $P(65\\le X\\le 75)$ و$P(70\\le X\\le 80)$ و$P(X\\ge 80)$.', 'The weight of some bread sticks follows $N(70;\\,5)$ in grams. Work out $P(65\\le X\\le 75)$, $P(70\\le X\\le 80)$ and $P(X\\ge 80)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('65 eta 75 $\\mu\\pm\\sigma$ dira.', '65 y 75 son $\\mu\\pm\\sigma$.', '65 و75 هما $\\mu\\pm\\sigma$.', '65 and 75 are $\\mu\\pm\\sigma$.'), math: same(`$P(65\\le X\\le 75)=${tableOf(between(-1, 1))}$`) },
            { text: say('70 eta 80 artean, $\\mu\\pm 2\\sigma$ tartearen erdia.', 'Entre 70 y 80, la mitad de $\\mu\\pm 2\\sigma$.', 'بين 70 و80 نصف $\\mu\\pm 2\\sigma$.', 'Between 70 and 80, half of $\\mu\\pm 2\\sigma$.'), math: same(`$P(70\\le X\\le 80)=\\frac{${tableOf(between(-2, 2))}}{2}=${tableOf(between(-2, 2) / 2)}$`) },
            { text: say('80 baino gehiago: kanpoan geratzen denaren erdia.', 'Más de 80: la mitad de lo que queda fuera.', 'أكثر من 80: نصف ما يبقى خارجًا.', 'More than 80: half of what is left outside.'), math: same(`$P(X\\ge 80)=\\frac{1-${tableOf(between(-2, 2))}}{2}=${tableOf((10_000 - between(-2, 2)) / 2)}$`) }
        ],
        takeaway: say(
            `Banaketa normal orotan, datuen % 68,26 $\\mu\\pm\\sigma$ tartean dago; % 95,44, $\\mu\\pm 2\\sigma$ tartean; eta % 99,74, $\\mu\\pm 3\\sigma$ tartean. Simetriagatik, alde bakoitzean erdia dago, eta kanpoan geratzen dena isats bietan banatzen da.`,
            `En toda normal, el 68,26 % de los datos está en $\\mu\\pm\\sigma$; el 95,44 %, en $\\mu\\pm 2\\sigma$; y el 99,74 %, en $\\mu\\pm 3\\sigma$. Por simetría, a cada lado hay la mitad, y lo que queda fuera se reparte entre las dos colas.`,
            `في كل توزيع طبيعي تقع 68.26٪ من البيانات في $\\mu\\pm\\sigma$، و95.44٪ في $\\mu\\pm 2\\sigma$، و99.74٪ في $\\mu\\pm 3\\sigma$. وبالتماثل يقع النصف في كل جهة، ويتوزع ما يبقى خارجًا على الذيلين.`,
            `In every normal, 68.26% of the data lie in $\\mu\\pm\\sigma$; 95.44%, in $\\mu\\pm 2\\sigma$; and 99.74%, in $\\mu\\pm 3\\sigma$. By symmetry, half lies on each side, and what is left outside is shared between the two tails.`
        ),
        figureAfterSteps: true,
        figure: (language) => <SigmaFigure language={language} />
    },
    {
        id: 'standard-table',
        stage: 'normal',
        title: say('Normal estandarraren taula', 'La tabla de la normal estándar', 'جدول التوزيع الطبيعي المعياري', 'The standard normal table'),
        goal: say('$N(0;\\,1)$ banaketaren taulan $P(Z\\le k)$ irakurtzea: errenkada unitatea eta hamarrena da, eta zutabea ehunena.', 'Leer $P(Z\\le k)$ en la tabla de la $N(0;\\,1)$: la fila es la unidad y la décima, y la columna, la centésima.', 'قراءة $P(Z\\le k)$ في جدول $N(0;\\,1)$: الصف هو الوحدة والعُشر، والعمود هو جزء المئة.', 'Read $P(Z\\le k)$ in the table of $N(0;\\,1)$: the row is the unit and the tenth, and the column, the hundredth.'),
        problem: say('$Z\\sim N(0;\\,1)$ bada, aurkitu $P(Z\\le 1{,}24)$, $P(Z<1{,}24)$ eta $P(Z=1{,}24)$.', 'Si $Z\\sim N(0;\\,1)$, halla $P(Z\\le 1{,}24)$, $P(Z<1{,}24)$ y $P(Z=1{,}24)$.', 'إذا كان $Z\\sim N(0;\\,1)$ فأوجد $P(Z\\le 1{,}24)$ و$P(Z<1{,}24)$ و$P(Z=1{,}24)$.', 'If $Z\\sim N(0;\\,1)$, find $P(Z\\le 1{,}24)$, $P(Z<1{,}24)$ and $P(Z=1{,}24)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('1,2 errenkada eta 0,04 zutabea.', 'Fila 1,2 y columna 0,04.', 'الصف 1.2 والعمود 0.04.', 'Row 1.2 and column 0.04.'), math: same(`$P(Z\\le 1{,}24)=${tableBelow(1.24)}$`) },
            { text: say('Aldagai jarraitu batean, $<$ eta $\\le$ gauza bera dira.', 'En una variable continua, $<$ y $\\le$ dan lo mismo.', 'في متغير متصل، $<$ و$\\le$ سواء.', 'In a continuous variable, $<$ and $\\le$ give the same.'), math: same(`$P(Z<1{,}24)=${tableBelow(1.24)}$`) },
            { text: say('Balio bakar batek ez du azalerarik.', 'Un solo valor no tiene área.', 'قيمة واحدة لا مساحة لها.', 'A single value has no area.'), math: same('$P(Z=1{,}24)=0$') }
        ],
        takeaway: say(
            'Taulak $P(Z\\le k)$ ematen du $k\\ge 0$ denean, lau hamartarrekin: $k$ balioaren unitatea eta hamarrena errenkadan, eta ehunena zutabean. $k\\ge 4$ bada, ia 1 da.',
            'La tabla da $P(Z\\le k)$ para $k\\ge 0$, con cuatro decimales: la unidad y la décima de $k$ en la fila, y la centésima en la columna. Para $k\\ge 4$ es prácticamente 1.',
            'يعطي الجدول $P(Z\\le k)$ عندما $k\\ge 0$ بأربعة أرقام عشرية: الوحدة والعُشر من $k$ في الصف، وجزء المئة في العمود. وعندما $k\\ge 4$ يكون عمليًّا 1.',
            'The table gives $P(Z\\le k)$ for $k\\ge 0$, with four decimals: the unit and the tenth of $k$ in the row, and the hundredth in the column. For $k\\ge 4$ it is practically 1.'
        ),
        figure: (language) => <TableCornerFigure language={language} />
    },
    {
        id: 'table-symmetry',
        stage: 'normal',
        title: say('Gainetik, negatiboak eta tarteak', 'Por encima, negativos y entre dos valores', 'فوق القيمة والسوالب والمجالات', 'Above, negatives and between'),
        goal: say('Taularekin eta simetriarekin kalkulatzea balio baten gaineko probabilitatea, balio negatibo baten azpikoa eta bi balioren artekoa.', 'Calcular con la tabla y la simetría la probabilidad por encima de un valor, por debajo de un negativo y entre dos valores.', 'حساب الاحتمال فوق قيمة وتحت قيمة سالبة وبين قيمتين بالجدول والتماثل.', 'Work out with the table and symmetry the probability above a value, below a negative one and between two values.'),
        problem: say('$Z\\sim N(0;\\,1)$ bada, kalkulatu $P(Z>0{,}8)$, $P(Z\\le -0{,}8)$ eta $P(-0{,}8\\le Z\\le 1{,}5)$.', 'Si $Z\\sim N(0;\\,1)$, calcula $P(Z>0{,}8)$, $P(Z\\le -0{,}8)$ y $P(-0{,}8\\le Z\\le 1{,}5)$.', 'إذا كان $Z\\sim N(0;\\,1)$ فاحسب $P(Z>0{,}8)$ و$P(Z\\le -0{,}8)$ و$P(-0{,}8\\le Z\\le 1{,}5)$.', 'If $Z\\sim N(0;\\,1)$, work out $P(Z>0{,}8)$, $P(Z\\le -0{,}8)$ and $P(-0{,}8\\le Z\\le 1{,}5)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Gainetik: 1 ken taula.', 'Por encima: 1 menos la tabla.', 'فوق القيمة: 1 ناقص الجدول.', 'Above: 1 minus the table.'), math: same(`$P(Z>0{,}8)=1-${tableBelow(0.8)}=${tableOf(10_000 - below(0.8))}$`) },
            { text: say('$-0{,}8$ puntuaren azpikoa $0{,}8$ puntuaren gainekoa da.', 'Lo de debajo de $-0{,}8$ es lo de encima de $0{,}8$.', 'ما تحت $-0{,}8$ هو ما فوق $0{,}8$.', 'What lies below $-0{,}8$ is what lies above $0{,}8$.'), math: same(`$P(Z\\le -0{,}8)=${tableOf(below(-0.8))}$`) },
            { text: say('Bi balioren artean: handiaren azpikoa ken txikiaren azpikoa.', 'Entre dos valores: lo de debajo del mayor menos lo de debajo del menor.', 'بين قيمتين: ما تحت الكبرى ناقص ما تحت الصغرى.', 'Between two values: below the larger minus below the smaller.'), math: same(`$P(-0{,}8\\le Z\\le 1{,}5)=${tableBelow(1.5)}-${tableOf(below(-0.8))}=${tableOf(between(-0.8, 1.5))}$`) }
        ],
        takeaway: say(
            '$P(Z>k)=1-P(Z\\le k)$; simetriagatik, $P(Z\\le -k)=P(Z\\ge k)$; eta $P(a\\le Z\\le b)=P(Z\\le b)-P(Z\\le a)$. Marraztu kanpaia eta margotu azalera: zein kasu den ikusten da.',
            '$P(Z>k)=1-P(Z\\le k)$; por simetría, $P(Z\\le -k)=P(Z\\ge k)$; y $P(a\\le Z\\le b)=P(Z\\le b)-P(Z\\le a)$. Dibuja la campana y pinta el área: así se ve qué caso es.',
            '$P(Z>k)=1-P(Z\\le k)$؛ وبالتماثل $P(Z\\le -k)=P(Z\\ge k)$؛ و$P(a\\le Z\\le b)=P(Z\\le b)-P(Z\\le a)$. ارسم الجرس ولوّن المساحة: هكذا ترى أي حالة هي.',
            '$P(Z>k)=1-P(Z\\le k)$; by symmetry, $P(Z\\le -k)=P(Z\\ge k)$; and $P(a\\le Z\\le b)=P(Z\\le b)-P(Z\\le a)$. Draw the bell and shade the area: that shows which case it is.'
        ),
        figureAfterSteps: true,
        figure: (language) => <SymmetryFigure language={language} />
    },
    {
        id: 'standardize',
        stage: 'normal',
        title: say('Tipifikatzea', 'Tipificar', 'التوحيد المعياري', 'Standardising'),
        goal: say('$N(\\mu;\\,\\sigma)$ banaketa baten probabilitateak kalkulatzea, ${z}=\\frac{x-\\mu}{\\sigma}$ eginez eta taula erabiliz.', 'Calcular probabilidades de una $N(\\mu;\\,\\sigma)$ tipificando con ${z}=\\frac{x-\\mu}{\\sigma}$ y usando la tabla.', 'حساب احتمالات $N(\\mu;\\,\\sigma)$ بالتوحيد المعياري ${z}=\\frac{x-\\mu}{\\sigma}$ واستعمال الجدول.', 'Work out probabilities of a $N(\\mu;\\,\\sigma)$ by standardising with ${z}=\\frac{x-\\mu}{\\sigma}$ and using the table.'),
        problem: say('Kafe-pakete batzuen pisua $N(250;\\,4)$ da, gramotan. Kalkulatu $P(X\\le 256)$ eta $P(244\\le X\\le 256)$.', 'El peso de unos paquetes de café sigue una $N(250;\\,4)$ en gramos. Calcula $P(X\\le 256)$ y $P(244\\le X\\le 256)$.', 'يتبع وزن علب قهوة التوزيع $N(250;\\,4)$ بالغرام. احسب $P(X\\le 256)$ و$P(244\\le X\\le 256)$.', 'The weight of some packets of coffee follows $N(250;\\,4)$ in grams. Work out $P(X\\le 256)$ and $P(244\\le X\\le 256)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('256 tipifikatzen da.', 'Se tipifica 256.', 'نوحّد 256 معياريًّا.', 'Standardise 256.'), math: same(`$${Z}=\\frac{256-250}{4}=1{,}5$`) },
            { text: say('Taularekin:', 'Con la tabla:', 'بالجدول:', 'With the table:'), math: same(`$P(X\\le 256)=P(Z\\le 1{,}5)=${tableBelow(1.5)}$`) },
            { text: say('244 balioak ${z}=-1{,}5$ ematen du: tarte simetrikoa da.', '244 da ${z}=-1{,}5$: el intervalo es simétrico.', '244 يعطي ${z}=-1{,}5$: المجال متماثل.', '244 gives ${z}=-1{,}5$: the interval is symmetric.'), math: same(`$P(244\\le X\\le 256)=2\\cdot ${tableBelow(1.5)}-1=${tableOf(between(-1.5, 1.5))}$`) }
        ],
        takeaway: say(
            `$X\\sim N(\\mu;\\,\\sigma)$ bada, $${Z}=\\frac{X-\\mu}{\\sigma}$ aldagaia $N(0;\\,1)$ da. Beraz, $P(X\\le x)=P\\left(Z\\le\\frac{x-\\mu}{\\sigma}\\right)$, eta taularekin kalkulatzen da. Tipifikatzean, desbideratzeaz zatitzen da, ez bariantzaz.`,
            `Si $X\\sim N(\\mu;\\,\\sigma)$, la variable $${Z}=\\frac{X-\\mu}{\\sigma}$ es una $N(0;\\,1)$. Por eso $P(X\\le x)=P\\left(Z\\le\\frac{x-\\mu}{\\sigma}\\right)$, que se calcula con la tabla. Al tipificar se divide entre la desviación, no entre la varianza.`,
            `إذا كان $X\\sim N(\\mu;\\,\\sigma)$ فإن المتغير $${Z}=\\frac{X-\\mu}{\\sigma}$ يتبع $N(0;\\,1)$. لذلك $P(X\\le x)=P\\left(Z\\le\\frac{x-\\mu}{\\sigma}\\right)$، ويُحسب بالجدول. وعند التوحيد نقسم على الانحراف لا على التباين.`,
            `If $X\\sim N(\\mu;\\,\\sigma)$, the variable $${Z}=\\frac{X-\\mu}{\\sigma}$ is a $N(0;\\,1)$. So $P(X\\le x)=P\\left(Z\\le\\frac{x-\\mu}{\\sigma}\\right)$, which is worked out with the table. When standardising, divide by the deviation, not by the variance.`
        ),
        figureAfterSteps: true,
        figure: (language) => <CoffeeFigure language={language} />
    },
    {
        id: 'inverse',
        stage: 'normal',
        title: say('Ehunekotik baliora', 'Del porcentaje al valor', 'من النسبة إلى القيمة', 'From the percentage to the value'),
        goal: say('Ehuneko bat emanda, hura uzten duen balioa aurkitzea: lehenik $k$ taularen barruan, eta gero $x=\\mu+k\\,\\sigma$.', 'Dado un porcentaje, hallar el valor que lo deja: primero $k$ dentro de la tabla, y después $x=\\mu+k\\,\\sigma$.', 'إذا أُعطيت نسبة فأوجد القيمة التي تتركها: أولًا $k$ داخل الجدول ثم $x=\\mu+k\\,\\sigma$.', 'Given a percentage, find the value that leaves it: first $k$ inside the table, then $x=\\mu+k\\,\\sigma$.'),
        problem: say('Sarbide-proba baten notak $N(6;\\,1{,}5)$ dira. Nota onena duen % 20 onartzen da. Zein da ebaketa-nota?', 'Las notas de una prueba de acceso siguen una $N(6;\\,1{,}5)$. Se admite al 20 % con mejor nota. ¿Cuál es la nota de corte?', 'تتبع علامات اختبار قبول التوزيع $N(6;\\,1{,}5)$. يُقبل أفضل 20٪. ما علامة القبول الدنيا؟', 'The marks in an entrance test follow $N(6;\\,1{,}5)$. The best 20% are admitted. What is the cut-off mark?'),
        stepsKind: 'steps',
        steps: [
            { text: say('% 20 gainetik badago, % 80 azpitik dago.', 'Si el 20 % queda por encima, el 80 % queda por debajo.', 'إذا بقيت 20٪ فوق، فـ 80٪ تحت.', 'If 20% lies above, 80% lies below.'), math: same('$P(Z\\le k)=0{,}8$') },
            { text: say(`Taularen barruan, $0{,}8$ zenbakitik hurbilena $${tableBelow(0.84)}$ da, 0,8 errenkadan eta 0,04 zutabean.`, `Dentro de la tabla, lo más cercano a $0{,}8$ es $${tableBelow(0.84)}$, en la fila 0,8 y la columna 0,04.`, `داخل الجدول أقرب قيمة إلى $0{,}8$ هي $${tableBelow(0.84)}$ في الصف 0.8 والعمود 0.04.`, `Inside the table, the closest to $0{,}8$ is $${tableBelow(0.84)}$, in row 0.8 and column 0.04.`), math: same('$k=0{,}84$') },
            { text: say('Tipifikazioa desegiten da.', 'Se deshace la tipificación.', 'نعكس التوحيد المعياري.', 'Undo the standardising.'), math: same('$x=6+0{,}84\\cdot 1{,}5=7{,}26$') }
        ],
        takeaway: say(
            'Ehuneko batetik balio batera joateko: idatzi azpitik geratzen den zatia, $P(Z\\le k)$; bilatu hura taularen barruan (balio hurbilena) $k$ ateratzeko; eta desegin tipifikazioa: $x=\\mu+k\\,\\sigma$. % 50 baino gutxiago badago azpitik, $k$ negatiboa da.',
            'Para pasar de un porcentaje a un valor: escribe la parte que queda por debajo, $P(Z\\le k)$; búscala dentro de la tabla (el valor más cercano) para sacar $k$; y deshaz la tipificación: $x=\\mu+k\\,\\sigma$. Si por debajo queda menos del 50 %, $k$ es negativo.',
            'للانتقال من نسبة إلى قيمة: اكتب الجزء الذي يبقى تحت، $P(Z\\le k)$؛ وابحث عنه داخل الجدول (أقرب قيمة) لتستخرج $k$؛ ثم اعكس التوحيد: $x=\\mu+k\\,\\sigma$. وإذا بقي تحت أقل من 50٪ كان $k$ سالبًا.',
            'To go from a percentage to a value: write the part that lies below, $P(Z\\le k)$; look it up inside the table (the closest value) to get $k$; and undo the standardising: $x=\\mu+k\\,\\sigma$. If less than 50% lies below, $k$ is negative.'
        ),
        figureAfterSteps: true,
        figure: (language) => <CutoffFigure language={language} />
    },

    /* ---------- 4. From the binomial to the normal ---------- */
    {
        id: 'binomial-to-normal',
        stage: 'approximation',
        title: say('Binomiala, normal baten antzekoa', 'La binomial se parece a una normal', 'التوزيع الثنائي يشبه الطبيعي', 'The binomial looks like a normal'),
        goal: say('$B(n;\\,p)$ bat noiz hurbil daitekeen normal batez jakitea ($np\\ge 5$ eta $nq\\ge 5$) eta zeinez: $N(np;\\,\\sqrt{npq})$.', 'Saber cuándo una $B(n;\\,p)$ se puede aproximar por una normal ($np\\ge 5$ y $nq\\ge 5$) y por cuál: $N(np;\\,\\sqrt{npq})$.', 'معرفة متى يمكن تقريب $B(n;\\,p)$ بتوزيع طبيعي ($np\\ge 5$ و$nq\\ge 5$) وبأيّها: $N(np;\\,\\sqrt{npq})$.', 'Know when a $B(n;\\,p)$ can be approximated by a normal ($np\\ge 5$ and $nq\\ge 5$) and by which one: $N(np;\\,\\sqrt{npq})$.'),
        needs: [need.binomialSpread],
        problem: say('Herri bateko bizilagunen % 20 boluntario da. 625 pertsonari galdetzen zaie. Boluntario kopurua normal batez hurbil daiteke? Zeinez?', 'El 20 % de los vecinos de un pueblo es voluntario. Se pregunta a 625 personas. ¿Se puede aproximar el número de voluntarios por una normal? ¿Por cuál?', '20٪ من سكان بلدة متطوعون. يُسأل 625 شخصًا. هل يمكن تقريب عدد المتطوعين بتوزيع طبيعي؟ بأيّها؟', '20% of the residents of a town are volunteers. 625 people are asked. Can the number of volunteers be approximated by a normal? By which one?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$X\\sim B(625;\\,0{,}2)$. Baldintza egiaztatzen da.', '$X\\sim B(625;\\,0{,}2)$. Se comprueba la condición.', '$X\\sim B(625;\\,0{,}2)$. نتحقق من الشرط.', '$X\\sim B(625;\\,0{,}2)$. Check the condition.'), math: same('$np=125\\qquad nq=500$') },
            { text: say('Binomialaren desbideratzea:', 'La desviación de la binomial:', 'انحراف التوزيع الثنائي:', 'The deviation of the binomial:'), math: same('$\\sigma=\\sqrt{625\\cdot 0{,}2\\cdot 0{,}8}=\\sqrt{100}=10$') },
            { text: say('Batez besteko eta desbideratze berak dituen normala:', 'La normal con la misma media y desviación:', 'التوزيع الطبيعي ذو المتوسط والانحراف نفسيهما:', 'The normal with the same mean and deviation:'), math: same('$N(125;\\,10)$') }
        ],
        takeaway: say(
            '$np\\ge 5$ eta $nq\\ge 5$ badira, $B(n;\\,p)$ banaketaren barrek kanpai bati jarraitzen diote: $N(np;\\,\\sqrt{npq})$ normalarenari. Horrela, $n$ handiko binomialak taularekin kalkulatzen dira, ehunka gai batu gabe.',
            'Si $np\\ge 5$ y $nq\\ge 5$, las barras de $B(n;\\,p)$ siguen una campana: la de $N(np;\\,\\sqrt{npq})$. Así se calculan binomiales con $n$ grande con la tabla, sin sumar cientos de términos.',
            'إذا كان $np\\ge 5$ و$nq\\ge 5$ اتبعت أعمدة $B(n;\\,p)$ جرسًا: جرس $N(np;\\,\\sqrt{npq})$. وهكذا تُحسب التوزيعات الثنائية ذات $n$ الكبير بالجدول دون جمع مئات الحدود.',
            'If $np\\ge 5$ and $nq\\ge 5$, the bars of $B(n;\\,p)$ follow a bell: that of $N(np;\\,\\sqrt{npq})$. This is how binomials with a large $n$ are worked out with the table, without adding hundreds of terms.'
        ),
        figureAfterSteps: true,
        figure: (language) => <SurveyFigure language={language} />
    },
    {
        id: 'continuity',
        stage: 'approximation',
        title: say('Puntu erdiaren zuzenketa', 'La corrección de medio punto', 'تصحيح نصف الوحدة', 'The half-unit correction'),
        goal: say('Binomial baten probabilitateak normalarekin hurbiltzea, balio oso bakoitza puntu erdi zabalduz alde bakoitzean.', 'Aproximar probabilidades de una binomial con la normal, ensanchando cada valor entero medio punto a cada lado.', 'تقريب احتمالات توزيع ثنائي بالطبيعي، بتوسيع كل قيمة صحيحة نصف وحدة من كل جهة.', 'Approximate probabilities of a binomial with the normal, widening each whole value half a unit on each side.'),
        problem: say('Inkesta batean, herritarren erdiak proposamen bat babesten du. 100 pertsonari galdetzen zaie. Zein da gutxienez 58 pertsonak babesteko probabilitatea?','En una encuesta, el 50 % apoya una propuesta. Se pregunta a 100 personas. ¿Qué probabilidad hay de que la apoyen al menos 58?', 'في استطلاع يؤيد 50٪ اقتراحًا. يُسأل 100 شخص. ما احتمال أن يؤيده 58 على الأقل؟', 'In a survey, 50% support a proposal. 100 people are asked. What is the probability that at least 58 support it?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$X\\sim B(100;\\,0{,}5)$ banaketa $N(50;\\,5)$ banaketaz hurbiltzen da. 58 balioaren barra 57,5 puntuan hasten da.', '$X\\sim B(100;\\,0{,}5)$ se aproxima por $N(50;\\,5)$. La barra del 58 empieza en 57,5.', 'يُقرَّب $X\\sim B(100;\\,0{,}5)$ بـ $N(50;\\,5)$. يبدأ عمود 58 عند 57.5.', '$X\\sim B(100;\\,0{,}5)$ is approximated by $N(50;\\,5)$. The bar of 58 starts at 57.5.'), math: same('$P(X\\ge 58)\\approx P(Y\\ge 57{,}5)$') },
            { text: say('Tipifikatu egiten da.', 'Se tipifica.', 'نوحّد معياريًّا.', 'Standardise.'), math: same(`$${Z}=\\frac{57{,}5-50}{5}=1{,}5$`) },
            { text: say('Taularekin, gainetik geratzen dena.', 'Con la tabla, lo que queda por encima.', 'بالجدول: ما يبقى فوق.', 'With the table, what lies above.'), math: same(`$P(Z\\ge 1{,}5)=1-${tableBelow(1.5)}=${tableOf(10_000 - below(1.5))}$`) }
        ],
        takeaway: say(
            'Binomialaren $k$ balio oso bakoitza $k-0{,}5$ puntutik $k+0{,}5$ punturaino doan barra bat da. Horrela, $P(X\\le k)\\approx P(Y\\le k+0{,}5)$ eta $P(X\\ge k)\\approx P(Y\\ge k-0{,}5)$. Pentsatu $k$ sartzen den ala ez, eta zabaldu puntu erdi alde horretara.',
            'Cada valor entero $k$ de la binomial es una barra de $k-0{,}5$ a $k+0{,}5$. Así, $P(X\\le k)\\approx P(Y\\le k+0{,}5)$ y $P(X\\ge k)\\approx P(Y\\ge k-0{,}5)$. Piensa si $k$ entra o no, y ensancha medio punto hacia ese lado.',
            'كل قيمة صحيحة $k$ للتوزيع الثنائي عمود من $k-0{,}5$ إلى $k+0{,}5$. وهكذا $P(X\\le k)\\approx P(Y\\le k+0{,}5)$ و$P(X\\ge k)\\approx P(Y\\ge k-0{,}5)$. فكّر هل تدخل $k$ أم لا، ووسّع نصف وحدة نحو تلك الجهة.',
            'Each whole value $k$ of the binomial is a bar from $k-0{,}5$ to $k+0{,}5$. So $P(X\\le k)\\approx P(Y\\le k+0{,}5)$ and $P(X\\ge k)\\approx P(Y\\ge k-0{,}5)$. Think whether $k$ is in or not, and widen half a unit that way.'
        ),
        figureAfterSteps: true,
        figure: (language) => <HalfStepFigure language={language} />
    },

    /* ---------- 5. Fitting a normal ---------- */
    {
        id: 'fit-parameters',
        stage: 'fit',
        title: say('Datu taldekatuen batez bestekoa eta desbideratzea', 'Media y desviación de datos agrupados', 'متوسط البيانات المجمّعة وانحرافها', 'Mean and deviation of grouped data'),
        goal: say('Datu taldekatuen $\\bar{x}$ eta $s$ kalkulatzea, klase-markekin, haiek doitzeko normala aukeratzeko.', 'Calcular $\\bar{x}$ y $s$ de datos agrupados con las marcas de clase, para elegir la normal con la que ajustarlos.', 'حساب $\\bar{x}$ و$s$ لبيانات مجمّعة بمراكز الفئات، لاختيار التوزيع الطبيعي الذي تُطابق معه.', 'Work out $\\bar{x}$ and $s$ of grouped data with the class marks, to choose the normal to fit them to.'),
        needs: [need.meanSd],
        problem: say('80 gazteren altuerak: 150–160, 15; 160–170, 25; 170–180, 25; 180–190, 15. Zein normalekin alderatzen dira?', 'Estaturas de 80 jóvenes: 150–160, 15; 160–170, 25; 170–180, 25; 180–190, 15. ¿Con qué normal se comparan?', 'أطوال 80 شابًّا: 150–160: 15؛ 160–170: 25؛ 170–180: 25؛ 180–190: 15. بأي توزيع طبيعي تُقارن؟', 'Heights of 80 young people: 150–160, 15; 160–170, 25; 170–180, 25; 180–190, 15. Which normal are they compared with?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Klase-markak 155, 165, 175 eta 185 dira.', 'Las marcas de clase son 155, 165, 175 y 185.', 'مراكز الفئات 155 و165 و175 و185.', 'The class marks are 155, 165, 175 and 185.'), math: same('$\\bar{x}=\\frac{155\\cdot 15+165\\cdot 25+175\\cdot 25+185\\cdot 15}{80}=170$') },
            { text: say('Batez bestekotik dauden distantzien karratuak 225 eta 25 dira.', 'Los cuadrados de las distancias a la media son 225 y 25.', 'مربعات المسافات عن المتوسط 225 و25.', 'The squares of the distances to the mean are 225 and 25.'), math: same('$s^2=\\frac{15\\cdot 225+25\\cdot 25+25\\cdot 25+15\\cdot 225}{80}=100$') },
            { text: say('Erroa: $s=10$. Datuak normal honekin alderatuko dira:', 'La raíz: $s=10$. Los datos se compararán con esta normal:', 'الجذر: $s=10$. ستُقارن البيانات بهذا التوزيع:', 'The root: $s=10$. The data will be compared with this normal:'), math: same('$N(170;\\,10)$') }
        ],
        takeaway: say(
            'Datu taldekatuetan, klase bakoitzak bere klase-marka du (erdiko puntua). Haiekin kalkulatzen dira $\\bar{x}$ eta $s$, eta datuak $N(\\bar{x};\\,s)$ normalarekin alderatzen dira.',
            'En datos agrupados, cada clase tiene su marca de clase (el punto medio). Con ellas se calculan $\\bar{x}$ y $s$, y los datos se comparan con la normal $N(\\bar{x};\\,s)$.',
            'في البيانات المجمّعة لكل فئة مركزها (النقطة الوسطى). وبها نحسب $\\bar{x}$ و$s$، ونقارن البيانات بالتوزيع $N(\\bar{x};\\,s)$.',
            'In grouped data, each class has its class mark (the midpoint). With them, $\\bar{x}$ and $s$ are worked out, and the data are compared with the normal $N(\\bar{x};\\,s)$.'
        ),
        figureAfterSteps: true,
        figure: (language) => <FitFigure language={language} step={0} />
    },
    {
        id: 'fit-expected',
        stage: 'fit',
        title: say('Klase bakoitzaren balio itxarona', 'Los esperados de cada clase', 'القيم المتوقعة لكل فئة', 'The expected values of each class'),
        goal: say('Klase-muturrak tipifikatzea, klase bakoitzaren probabilitatea taularekin kalkulatzea eta datu kopuruaz biderkatzea.', 'Tipificar los extremos de las clases, hallar la probabilidad de cada clase con la tabla y multiplicarla por el número de datos.', 'توحيد أطراف الفئات، وإيجاد احتمال كل فئة بالجدول، وضربه في عدد البيانات.', 'Standardise the ends of the classes, find the probability of each class with the table and multiply it by the number of data.'),
        problem: say('80 altuerak $N(170;\\,10)$ banaketarekin alderatzen dira; lehen klasea 160 baino gutxiago da, eta azkena 180 edo gehiago. Zenbat datu espero dira klase bakoitzean?', 'Las 80 estaturas se comparan con una $N(170;\\,10)$; la primera clase es menos de 160 y la última, 180 o más. ¿Cuántos datos se esperan en cada clase?', 'تُقارن الأطوال الثمانون بـ $N(170;\\,10)$؛ الفئة الأولى أقل من 160 والأخيرة 180 فأكثر. كم معطى يُتوقع في كل فئة؟', 'The 80 heights are compared with a $N(170;\\,10)$; the first class is under 160 and the last, 180 or more. How many data are expected in each class?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Muturrak tipifikatuta: 160, 170 eta 180 balioak $-1$, 0 eta 1 dira. Lehen klasea:', 'Tipificados los extremos, 160, 170 y 180 son $-1$, 0 y 1. La primera clase:', 'بعد توحيد الأطراف تصبح 160 و170 و180: $-1$ و0 و1. الفئة الأولى:', 'Standardised, the ends 160, 170 and 180 are $-1$, 0 and 1. The first class:'), math: same(`$P(Z\\le -1)=${tableOf(below(-1))}$`) },
            { text: say('Bigarrena, $-1$ eta 0 artean; beste biak simetrikoak dira.', 'La segunda, entre $-1$ y 0; las otras dos son simétricas.', 'الثانية بين $-1$ و0؛ والأخريان متماثلتان.', 'The second, between $-1$ and 0; the other two are symmetric.'), math: same(`$P(-1\\le Z\\le 0)=${tableOf(between(-1, 0))}$`) },
            { text: say('Datu kopuruaz biderkatuta:', 'Por el número de datos:', 'بالضرب في عدد البيانات:', 'Times the number of data:'), math: same(`$80\\cdot ${tableOf(below(-1))}=12{,}696\\qquad 80\\cdot ${tableOf(between(-1, 0))}=27{,}304$`) }
        ],
        takeaway: say(
            'Klase bakoitzaren probabilitatea haren muturren arteko azalera da: tipifikatu muturrak (ez klase-marka) eta erabili taula. Balio itxarona $N\\cdot p$ da. Lehen eta azken klaseak irekita hartzen dira, probabilitateek 1 egin dezaten.',
            'La probabilidad de cada clase es el área entre sus extremos: tipifica los extremos (no la marca) y usa la tabla. El valor esperado es $N\\cdot p$. La primera y la última clase se toman abiertas, para que las probabilidades sumen 1.',
            'احتمال كل فئة هو المساحة بين طرفيها: وحّد الطرفين (لا مركز الفئة) واستعمل الجدول. والقيمة المتوقعة $N\\cdot p$. وتؤخذ الفئتان الأولى والأخيرة مفتوحتين ليكون مجموع الاحتمالات 1.',
            'The probability of each class is the area between its ends: standardise the ends (not the mark) and use the table. The expected value is $N\\cdot p$. The first and last classes are taken as open, so that the probabilities add up to 1.'
        ),
        figureAfterSteps: true,
        figure: (language) => <FitFigure language={language} step={1} />
    },
    {
        id: 'fit-decision',
        stage: 'fit',
        title: say('Normala da ala ez?', '¿Es normal o no?', 'هل هو طبيعي أم لا؟', 'Is it normal or not?'),
        goal: say('Behatuen eta itxaronen arteko diferentziarik handiena guztizkoarekin alderatzea eta, Matellaren arauarekin, doikuntza onartu ala baztertzea.', 'Comparar la mayor diferencia entre observados y esperados con el total y aceptar o rechazar el ajuste con la regla de Matella.', 'مقارنة أكبر فرق بين المشاهَدة والمتوقعة بالكل، وقبول المطابقة أو رفضها بقاعدة ماتيلا.', 'Compare the largest difference between observed and expected with the total and accept or reject the fit with Matella\'s rule.'),
        needs: [need.goodFit],
        problem: say('Behatuak 15, 25, 25 eta 15 dira, eta itxaronak 12,696; 27,304; 27,304 eta 12,696. Altuerek normal bati jarraitzen diote?', 'Los observados son 15, 25, 25 y 15, y los esperados, 12,696; 27,304; 27,304 y 12,696. ¿Siguen las estaturas una normal?', 'المشاهَدة 15 و25 و25 و15، والمتوقعة 12.696 و27.304 و27.304 و12.696. هل تتبع الأطوال توزيعًا طبيعيًّا؟', 'The observed values are 15, 25, 25 and 15, and the expected ones, 12.696, 27.304, 27.304 and 12.696. Do the heights follow a normal?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Diferentzia guztiak berdinak dira, balio absolutuan.', 'Todas las diferencias son iguales en valor absoluto.', 'كل الفروق متساوية بالقيمة المطلقة.', 'All the differences are equal in absolute value.'), math: same('$|15-12{,}696|=2{,}304$') },
            { text: say('Handiena guztizkoarekin alderatzen da.', 'La mayor se compara con el total.', 'نقارن أكبرها بالكل.', 'The largest is compared with the total.'), math: same('$\\frac{2{,}304}{80}=0{,}0288$') },
            { text: say('% 2,88 da, % 5 baino gutxiago: doikuntza onartzen da, eta altuerek normal bati jarraitzen diotela esan daiteke.', 'Es el 2,88 %, menos del 5 %: se acepta el ajuste, y se puede decir que las estaturas siguen una normal.', 'إنه 2.88٪، أقل من 5٪: تُقبل المطابقة، ويمكن القول إن الأطوال تتبع توزيعًا طبيعيًّا.', 'It is 2.88%, less than 5%: the fit is accepted, and the heights can be said to follow a normal.'), math: same('$0{,}0288<0{,}05$') }
        ],
        takeaway: say(
            'Normal batera doitzeko: $\\bar{x}$ eta $s$, muturrak tipifikatu, klaseen probabilitateak eta $N\\cdot p$, eta diferentziak balio absolutuan. Matellaren araua (gidaliburu praktikoa, ez proba zehatza): diferentziarik handiena guztizkoaren % 5 baino handiagoa ez bada, doikuntza onartzen da.',
            'Para ajustar a una normal: $\\bar{x}$ y $s$, tipificar los extremos, probabilidades de las clases y $N\\cdot p$, y diferencias en valor absoluto. Regla de Matella (una guía práctica, no una prueba exacta): si la mayor diferencia no pasa del 5 % del total, se acepta el ajuste.',
            'للمطابقة مع توزيع طبيعي: $\\bar{x}$ و$s$، وتوحيد الأطراف، واحتمالات الفئات و$N\\cdot p$، والفروق بالقيمة المطلقة. قاعدة ماتيلا (دليل عملي لا اختبار دقيق): إذا لم يتجاوز أكبر فرق 5٪ من الكل قُبلت المطابقة.',
            'To fit a normal: $\\bar{x}$ and $s$, standardise the ends, the class probabilities and $N\\cdot p$, and the differences in absolute value. Matella\'s rule (a practical guide, not an exact test): if the largest difference is no more than 5% of the total, the fit is accepted.'
        ),
        figureAfterSteps: true,
        figure: (language) => <FitFigure language={language} step={2} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const normalBatx1gTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...normalBatx1gLessonTexts[topic.id as NormalBatx1gTopicId], ...normalBatx1gLessonChecks[topic.id as NormalBatx1gTopicId] }))
