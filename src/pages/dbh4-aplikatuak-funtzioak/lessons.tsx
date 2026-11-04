import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { FormulaFigure, FunctionTestFigure } from '../dbh2-funtzioak-v2/figures'
import {
    BoxModelFigure,
    ContinuityFigure,
    DomainFormulaFigure,
    DomainGraphFigure,
    ExpressionsFigure,
    ExtremaFigure,
    GlucoseFigure,
    InterceptsFormulaFigure,
    MonotonyFigure,
    PeriodicFigure,
    RateFigure,
    StudyFigure,
    TendencyFigure
} from './figures'
import { functionsLessonChecks, type FunctionsTopicId } from './lessonChecks'
import { functionsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Funtzioak · 4. DBH aplikatuak — stages and lessons, following Santillana
   Aplicadas 4, unit 7 (Funciones: concept, ways of giving a function,
   domain and range from a graph and from a formula, intercepts, average
   rate of change, increasing and decreasing, maxima and minima, continuity,
   periodicity and the study of a graph) and Anaya Aplicadas 4, unit 8
   (Funciones. Características: tendency, reading graphs in context and
   functions that come from a problem, like the box made from a card).
   ========================================================================== */

export type FunctionsStageId = 'concept' | 'domain' | 'change' | 'properties' | 'study'

export const functionsStages: UnitStage[] = [
    { id: 'concept', tone: 'blue', title: { eu: 'Funtzio kontzeptua', es: 'Concepto de función', en: 'The concept of a function', ar: 'مفهوم الدالة' } },
    { id: 'domain', tone: 'violet', title: { eu: 'Izate-eremua eta ebaki-puntuak', es: 'Dominio y puntos de corte', en: 'Domain and intercepts', ar: 'المجال ونقاط التقاطع' } },
    { id: 'change', tone: 'mustard', title: { eu: 'Hazkundea eta muturrak', es: 'Crecimiento y extremos', en: 'Growth and extremes', ar: 'التزايد والقيم القصوى' } },
    { id: 'properties', tone: 'coral', title: { eu: 'Jarraitutasuna, periodikotasuna eta joera', es: 'Continuidad, periodicidad y tendencia', en: 'Continuity, periodicity and trend', ar: 'الاتصال والدورية والاتجاه' } },
    { id: 'study', tone: 'green', title: { eu: 'Funtzioak aztertzea', es: 'Estudiar funciones', en: 'Studying functions', ar: 'دراسة الدوال' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Concept ---------- */
    {
        id: 'what-is',
        stage: 'concept',
        needs: [{ unit: 'dbh3/funciones-lineales', topic: 'function-concept', title: { eu: 'Funtzio baten kontzeptua', es: 'Concepto de función', en: 'What a function is', ar: 'مفهوم الدالة' } }],
        title: say('Zer da funtzio bat?', '¿Qué es una función?', 'ما الدالة؟', 'What is a function?'),
        goal: say('Bi magnituderen arteko erlazio bat funtzioa den ala ez erabakitzea, eta aldagai askea eta menpekoa bereiztea.', 'Decidir si una relación entre dos magnitudes es una función y distinguir la variable independiente de la dependiente.', 'تقرير ما إذا كانت علاقة بين مقدارين دالة، والتمييز بين المتغير المستقل والتابع.', 'Decide whether a relationship between two quantities is a function, and tell the independent variable from the dependent one.'),
        problem: say('Erlazio honek funtzio bat ematen du? $(1,\\,4)$, $(2,\\,5)$, $(1,\\,6)$, $(3,\\,7)$', '¿Es función esta relación? $(1,\\,4)$, $(2,\\,5)$, $(1,\\,6)$, $(3,\\,7)$', 'هل هذه العلاقة دالة؟ $(1,\\,4)$، $(2,\\,5)$، $(1,\\,6)$، $(3,\\,7)$', 'Is this relation a function? $(1,\\,4)$, $(2,\\,5)$, $(1,\\,6)$, $(3,\\,7)$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bilatu errepikatzen den $x$.', 'Busca una $x$ repetida.', 'ابحث عن $x$ مكررة.', 'Look for a repeated $x$.'), math: same('$x=1$') },
            { text: say('Bi irteera ditu: 4 eta 6. Ez da funtzioa.', 'Tiene dos salidas: 4 y 6. No es función.', 'لها مخرجان: 4 و6. ليست دالة.', 'It has two outputs: 4 and 6. It is not a function.') }
        ],
        takeaway: say('Funtzioa: x bakoitzeko y bakarra. Y bat errepika daiteke, x bat ez.', 'Función: cada x, una sola y. Una y puede repetirse; una x, no.', 'الدالة: لكل x قيمة y واحدة. يمكن أن تتكرر y لا x.', 'Function: each x, only one y. A y can repeat; an x cannot.'),
        figure: (language) => <FunctionTestFigure language={language} />
    },
    {
        id: 'expressions',
        stage: 'concept',
        title: say('Funtzio bat adierazteko erak', 'Formas de expresar una función', 'طرق التعبير عن دالة', 'Ways to express a function'),
        goal: say('Funtzio bera enuntziatu, formula, balio-taula eta grafiko gisa adieraztea eta batetik bestera igarotzea.', 'Expresar una misma función con un enunciado, una fórmula, una tabla y una gráfica, y pasar de una forma a otra.', 'التعبير عن الدالة نفسها بنص وصيغة وجدول ورسم، والانتقال من صورة إلى أخرى.', 'Express the same function as a word problem, a formula, a table and a graph, and move from one form to another.'),
        problem: say('Txorrota batek 1,5 litro galtzen ditu orduko. Idatzi formula eta kalkulatu zenbat galtzen den 6 orduan.', 'Un grifo pierde 1,5 litros cada hora. Escribe la fórmula y calcula cuánto pierde en 6 horas.', 'يفقد صنبور 1.5 لتر كل ساعة. اكتب الصيغة واحسب كم يفقد في 6 ساعات.', 'A tap loses 1.5 litres every hour. Write the formula and work out how much it loses in 6 hours.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x$: orduak; $y$: litroak.', '$x$: horas; $y$: litros.', '$x$: الساعات؛ $y$: اللترات.', '$x$: hours; $y$: litres.'), math: same('$y=1{,}5x$') },
            { text: say('Ordeztu $x=6$.', 'Sustituye $x=6$.', 'عوّض $x=6$.', 'Substitute $x=6$.'), math: same('$y=1{,}5\\cdot 6=9$') }
        ],
        takeaway: say('Enuntziatua, formula, taula eta grafikoa: funtzio bera lau eratara.', 'Enunciado, fórmula, tabla y gráfica: la misma función de cuatro formas.', 'النص والصيغة والجدول والرسم: الدالة نفسها بأربع طرق.', 'Word problem, formula, table and graph: the same function in four ways.'),
        figure: (language) => <ExpressionsFigure language={language} />
    },
    {
        id: 'evaluate',
        stage: 'concept',
        title: say('Irudiak eta grafikoaren puntuak', 'Imágenes y puntos de la gráfica', 'الصور ونقاط الرسم', 'Images and points on the graph'),
        goal: say('Formula batetik irudiak kalkulatzea eta puntu bat grafikoan dagoen ala ez egiaztatzea.', 'Calcular imágenes con una fórmula y comprobar si un punto está en la gráfica.', 'حساب الصور بصيغة والتحقق من وقوع نقطة على الرسم.', 'Calculate images using a formula and check whether a point is on the graph.'),
        problem: say('$f(x)=2x^2-x$ izanik, kalkulatu $f(-3)$.', 'Siendo $f(x)=2x^2-x$, calcula $f(-3)$.', 'إذا كان $f(x)=2x^2-x$ فاحسب $f(-3)$.', 'Given $f(x)=2x^2-x$, calculate $f(-3)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu parentesi artean.', 'Sustituye entre paréntesis.', 'عوّض بين قوسين.', 'Substitute it in brackets.'), math: same('$2\\cdot(-3)^2-(-3)$') },
            { text: say('Berretura lehenik.', 'Primero la potencia.', 'القوة أولًا.', 'Work out the power first.'), math: same('$2\\cdot 9+3=21$') }
        ],
        takeaway: say('Puntu bat grafikoan dago bere x-aren irudia bere y bada.', 'Un punto está en la gráfica si la imagen de su x es su y.', 'تقع النقطة على الرسم إذا كانت صورة x فيها هي y.', 'A point is on the graph if the image of its x is its y.'),
        figure: (language) => <FormulaFigure language={language} />
    },

    /* ---------- 2. Domain and intercepts ---------- */
    {
        id: 'domain-graph',
        stage: 'domain',
        needs: [{ unit: 'dbh4-aplikatuak/numeros-reales', topic: 'intervals', title: { eu: 'Tarteak eta zuzenerdiak', es: 'Intervalos y semirrectas', en: 'Intervals and half-lines', ar: 'الفترات وأنصاف المستقيمات' } }],
        title: say('Izate-eremua eta ibiltartea grafikoan', 'Dominio y recorrido en una gráfica', 'المجال والمدى في الرسم', 'Domain and range on a graph'),
        goal: say('Grafiko baten izate-eremua eta ibiltartea irakurtzea eta tarte gisa idaztea.', 'Leer el dominio y el recorrido de una gráfica y escribirlos como intervalos.', 'قراءة مجال الرسم ومداه وكتابتهما فترات.', 'Read the domain and range of a graph and write them as intervals.'),
        problem: say('Ur-txorrota baten tenperaturak 10 °C-tik 58 °C-ra igotzen du, 0 eta 6 minutu artean. Zein dira izate-eremua eta ibiltartea?', 'La temperatura del agua de un grifo sube de 10 °C a 58 °C entre el minuto 0 y el 6. ¿Cuáles son el dominio y el recorrido?', 'ترتفع حرارة ماء صنبور من 10 °م إلى 58 °م بين الدقيقة 0 والدقيقة 6. ما المجال والمدى؟', 'The temperature of the water from a tap rises from 10 °C to 58 °C between minute 0 and minute 6. What are the domain and the range?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Denbora ($x$).', 'El tiempo ($x$).', 'الزمن ($x$).', 'Time ($x$).'), math: same('$\\text{Dom}\\,f=[0,\\,6]$') },
            { text: say('Tenperatura ($y$).', 'La temperatura ($y$).', 'الحرارة ($y$).', 'Temperature ($y$).'), math: same('$\\text{Rec}\\,f=[10,\\,58]$') }
        ],
        takeaway: say('Izate-eremua X ardatzean, ibiltartea Y ardatzean.', 'Dominio en el eje X; recorrido en el eje Y.', 'المجال على محور X والمدى على محور Y.', 'Domain on the x-axis; range on the y-axis.'),
        figure: (language) => <DomainGraphFigure language={language} />
    },
    {
        id: 'domain-formula',
        stage: 'domain',
        needs: [{ unit: 'dbh3/funciones-lineales', topic: 'domain-range', title: { eu: 'Definizio-eremua eta ibilbidea', es: 'Dominio y recorrido', en: 'Domain and range', ar: 'المجال والمدى' } }],
        title: say('Izate-eremua formulatik', 'Dominio desde la fórmula', 'المجال من الصيغة', 'Domain from the formula'),
        goal: say('Polinomio, zatiki eta erro karratuen izate-eremua kalkulatzea, eta testuinguru baten izate-eremua erabakitzea.', 'Calcular el dominio de polinomios, fracciones y raíces cuadradas, y decidir el dominio de un contexto.', 'حساب مجال كثيرات الحدود والكسور والجذور التربيعية، وتحديد مجال سياق.', 'Calculate the domain of polynomials, fractions and square roots, and decide the domain in a real-life context.'),
        problem: say('Zein $x$ balio ez dago $y=\\dfrac{x^2}{x+4}$ funtzioaren izate-eremuan?', '¿Qué valor de $x$ no está en el dominio de $y=\\dfrac{x^2}{x+4}$?', 'ما قيمة $x$ التي ليست في مجال $y=\\dfrac{x^2}{x+4}$؟', 'Which value of $x$ is not in the domain of $y=\\dfrac{x^2}{x+4}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izendatzailea zero.', 'Denominador cero.', 'المقام صفر.', 'Denominator equal to zero.'), math: same('$x+4=0\\to x=-4$') },
            { text: say('Kendu balio hori.', 'Quita ese valor.', 'احذف هذه القيمة.', 'Remove that value.'), math: same('$\\mathbb{R}-\\{-4\\}$') }
        ],
        takeaway: say('Polinomioak: zenbaki guztiak. Zatikiak: izendatzailea ez zero. Erroak: barrukoa ez negatiboa.', 'Polinomios: todos los números. Fracciones: denominador distinto de cero. Raíces: el interior no negativo.', 'كثيرات الحدود: كل الأعداد. الكسور: مقام غير صفري. الجذور: ما تحتها غير سالب.', 'Polynomials: all numbers. Fractions: denominator not equal to zero. Square roots: the expression inside is not negative.'),
        figure: (language) => <DomainFormulaFigure language={language} />
    },
    {
        id: 'intercepts',
        stage: 'domain',
        needs: [{ unit: 'dbh4-aplikatuak/ecuaciones-sistemas', topic: 'formula', title: { eu: 'Formula orokorra', es: 'La fórmula general', en: 'The quadratic formula', ar: 'الصيغة العامة' } }],
        title: say('Ardatzekiko ebaki-puntuak', 'Puntos de corte con los ejes', 'نقاط التقاطع مع المحورين', 'Intercepts with the axes'),
        goal: say('Funtzio baten eta ardatzen arteko ebaki-puntuak formulatik kalkulatzea.', 'Calcular con la fórmula los puntos de corte de una función con los ejes.', 'حساب نقاط تقاطع الدالة مع المحورين بالصيغة.', 'Use the formula to calculate where a function crosses the axes.'),
        problem: say('Kalkulatu $y=\\dfrac{2x+6}{x-1}$ funtzioaren ebaki-puntuak ardatzekin.', 'Calcula los puntos de corte de $y=\\dfrac{2x+6}{x-1}$ con los ejes.', 'احسب نقاط تقاطع $y=\\dfrac{2x+6}{x-1}$ مع المحورين.', 'Calculate the intercepts of $y=\\dfrac{2x+6}{x-1}$ with the axes.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Y ardatza: $x=0$.', 'Eje Y: $x=0$.', 'محور Y: $x=0$.', 'y-axis: $x=0$.'), math: same('$y=\\dfrac{6}{-1}=-6\\to(0,\\,-6)$') },
            { text: say('X ardatza: zenbakitzailea 0.', 'Eje X: numerador 0.', 'محور X: البسط 0.', 'x-axis: numerator = 0.'), math: same('$2x+6=0\\to(-3,\\,0)$') }
        ],
        takeaway: say('Y ardatza: x = 0 jarri. X ardatza: y = 0 jarri eta ekuazioa ebatzi.', 'Eje Y: pon x = 0. Eje X: pon y = 0 y resuelve la ecuación.', 'محور Y: ضع x = 0. محور X: ضع y = 0 وحُلّ المعادلة.', 'y-axis: put x = 0. x-axis: put y = 0 and solve the equation.'),
        figure: (language) => <InterceptsFormulaFigure language={language} />
    },

    /* ---------- 3. Increasing, extremes and rate ---------- */
    {
        id: 'monotony',
        stage: 'change',
        needs: [{ unit: 'dbh3/funciones-lineales', topic: 'growth', title: { eu: 'Gorakortasuna eta beherakortasuna', es: 'Crecimiento y decrecimiento', en: 'Increasing and decreasing', ar: 'التزايد والتناقص' } }],
        title: say('Gorakorra eta beherakorra', 'Crecimiento y decrecimiento', 'التزايد والتناقص', 'Increasing and decreasing'),
        goal: say('Funtzio bat gorakorra, beherakorra edo konstantea den tarteak grafikoan irakurtzea eta idaztea.', 'Leer en una gráfica y escribir los intervalos en los que una función crece, decrece o es constante.', 'قراءة فترات تزايد الدالة وتناقصها وثباتها من الرسم وكتابتها.', 'Read a graph and write the intervals where a function increases, decreases or is constant.'),
        problem: say('Grafiko bat $(0,\\,0)$ puntutik $(1,\\,3)$ puntura igotzen da, $(3,\\,1)$ puntura jaisten da eta $(5,\\,2)$ puntura igotzen da berriro. Idatzi tarteak.', 'Una gráfica sube de $(0,\\,0)$ a $(1,\\,3)$, baja hasta $(3,\\,1)$ y vuelve a subir hasta $(5,\\,2)$. Escribe los intervalos.', 'يصعد رسم من $(0,\\,0)$ إلى $(1,\\,3)$ وينزل إلى $(3,\\,1)$ ثم يصعد إلى $(5,\\,2)$. اكتب الفترات.', 'A graph goes up from $(0,\\,0)$ to $(1,\\,3)$, goes down to $(3,\\,1)$ and goes up again to $(5,\\,2)$. Write the intervals.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Gorakorra.', 'Crece.', 'متزايدة.', 'Increases.'), math: same('$(0,\\,1)\\cup(3,\\,5)$') },
            { text: say('Beherakorra.', 'Decrece.', 'متناقصة.', 'Decreases.'), math: same('$(1,\\,3)$') }
        ],
        takeaway: say('Ezkerretik eskuinera irakurri eta idatzi x-ren tarteak.', 'Lee de izquierda a derecha y escribe intervalos de x.', 'اقرأ من اليسار إلى اليمين واكتب فترات x.', 'Read from left to right and write intervals of x.'),
        figure: (language) => <MonotonyFigure language={language} />
    },
    {
        id: 'extrema',
        stage: 'change',
        needs: [{ unit: 'dbh3/funciones-lineales', topic: 'extremes', title: { eu: 'Maximoak eta minimoak', es: 'Máximos y mínimos', en: 'Maxima and minima', ar: 'القيم العظمى والصغرى' } }],
        title: say('Maximoak eta minimoak', 'Máximos y mínimos', 'القيم العظمى والصغرى', 'Maximum and minimum points'),
        goal: say('Maximo eta minimo erlatiboak eta absolutuak aurkitzea grafiko batean.', 'Encontrar máximos y mínimos relativos y absolutos en una gráfica.', 'إيجاد القيم العظمى والصغرى النسبية والمطلقة في رسم.', 'Find local and absolute maxima and minima on a graph.'),
        problem: say('Funtzio bat gorakorra da $(-\\infty,\\,-3)$ tartean eta beherakorra $(-3,\\,1)$ tartean, eta $f(-3)=2$. Zer dago $x=-3$ puntuan?', 'Una función crece en $(-\\infty,\\,-3)$, decrece en $(-3,\\,1)$ y $f(-3)=2$. ¿Qué hay en $x=-3$?', 'دالة متزايدة في $(-\\infty,\\,-3)$ ومتناقصة في $(-3,\\,1)$ و$f(-3)=2$. ماذا يوجد عند $x=-3$؟', 'A function increases on $(-\\infty,\\,-3)$, decreases on $(-3,\\,1)$ and $f(-3)=2$. What is at $x=-3$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Gorakorretik beherakorrera: maximo erlatiboa.', 'De creciente a decreciente: máximo relativo.', 'من التزايد إلى التناقص: عظمى نسبية.', 'From increasing to decreasing: local maximum.') },
            { text: say('Puntu osoa.', 'El punto entero.', 'النقطة كاملة.', 'The whole point.'), math: same('$(-3,\\,2)$') }
        ],
        takeaway: say('Maximoa: igotzetik jaistera. Minimoa: jaistetik igotzera. Eman puntu osoa.', 'Máximo: de subir a bajar. Mínimo: de bajar a subir. Da el punto entero.', 'العظمى: من الصعود إلى النزول. الصغرى: من النزول إلى الصعود. أعطِ النقطة كاملة.', 'Maximum: from going up to going down. Minimum: from going down to going up. Give the whole point.'),
        figure: (language) => <ExtremaFigure language={language} />
    },
    {
        id: 'rate',
        stage: 'change',
        needs: [{ unit: 'dbh3/funciones-lineales', topic: 'slope', title: { eu: 'Malda', es: 'La pendiente', en: 'The slope', ar: 'الميل' } }],
        title: say('Batez besteko aldakuntza-tasa', 'Tasa de variación media', 'معدل التغير المتوسط', 'Average rate of change'),
        goal: say('Tarte bateko batez besteko aldakuntza-tasa kalkulatzea eta interpretatzea.', 'Calcular e interpretar la tasa de variación media en un intervalo.', 'حساب معدل التغير المتوسط في فترة وتفسيره.', 'Calculate and interpret the average rate of change over an interval.'),
        problem: say('Harri bat 0 s-tan 0 m-ra dago eta 3 s-tan 75 m-ra. Zein da batez besteko abiadura $[0,\\,3]$ tartean?', 'Una piedra está a 0 m en el segundo 0 y a 75 m en el segundo 3. ¿Cuál es su velocidad media en $[0,\\,3]$?', 'حجر على ارتفاع 0 م في الثانية 0 و75 م في الثانية 3. ما سرعته المتوسطة في $[0,\\,3]$؟', 'A stone is at 0 m at second 0 and at 75 m at second 3. What is its average velocity over $[0,\\,3]$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Aldaketak zatitu.', 'Divide los cambios.', 'اقسم التغيرين.', 'Divide the two changes.'), math: same('$\\dfrac{75-0}{3-0}=25$') },
            { text: say('25 m/s.', '25 m/s.', '25 م/ث.', '25 m/s.') }
        ],
        takeaway: say('y-ren aldaketa zati x-ren aldaketa, bi aldeetan ordena berean.', 'Cambio de y entre cambio de x, restando en el mismo orden.', 'تغير y على تغير x، بالطرح بالترتيب نفسه.', 'Change in y divided by change in x, subtracting in the same order.'),
        figure: (language) => <RateFigure language={language} />
    },

    /* ---------- 4. Continuity, periodicity and tendency ---------- */
    {
        id: 'continuity',
        stage: 'properties',
        title: say('Funtzio jarraituak eta etenak', 'Funciones continuas y discontinuas', 'الدوال المتصلة والمنفصلة', 'Continuous and discontinuous functions'),
        goal: say('Funtzio bat jarraitua den erabakitzea eta etenuneak eta haien arrazoia aurkitzea.', 'Decidir si una función es continua y encontrar sus puntos de discontinuidad y su causa.', 'تقرير ما إذا كانت الدالة متصلة وإيجاد نقاط انقطاعها وسببه.', 'Decide whether a function is continuous, and find its points of discontinuity and what causes them.'),
        problem: say('Aparkaleku batek 2 € kobratzen ditu hasitako ordu bakoitzeko. Zenbat ordaintzen da 2 ordu eta 10 minuturengatik? Jarraitua da funtzioa?', 'Un aparcamiento cobra 2 € por cada hora empezada. ¿Cuánto se paga por 2 h y 10 min? ¿Es continua la función?', 'يأخذ موقف سيارات 2 € عن كل ساعة بدأت. كم يُدفع عن ساعتين و10 دقائق؟ هل الدالة متصلة؟', 'A car park charges €2 for each hour started. How much do you pay for 2 h and 10 min? Is the function continuous?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hiru ordu hasi dira.', 'Se han empezado tres horas.', 'بدأت ثلاث ساعات.', 'Three hours have been started.'), math: same('$3\\cdot 2=6$') },
            { text: say('Etena: jauziak ordu bakoitzean.', 'Discontinua: saltos en cada hora.', 'منفصلة: قفزات عند كل ساعة.', 'Discontinuous: jumps at every hour.') }
        ],
        takeaway: say('Jarraitua: arkatza altxatu gabe. Etenak: jauziak, zuloak eta adar infinituak.', 'Continua: sin levantar el lápiz. Discontinuidades: saltos, agujeros y ramas infinitas.', 'المتصلة: دون رفع القلم. الانقطاعات: قفزات وثقوب وفروع لانهائية.', 'Continuous: without lifting the pencil. Discontinuities: jumps, holes and infinite branches.'),
        figure: (language) => <ContinuityFigure language={language} />
    },
    {
        id: 'periodicity',
        stage: 'properties',
        title: say('Funtzio periodikoak', 'Funciones periódicas', 'الدوال الدورية', 'Periodic functions'),
        goal: say('Funtzio periodikoak ezagutzea, haien periodoa aurkitzea eta urruneko balioak kalkulatzea.', 'Reconocer funciones periódicas, hallar su periodo y calcular valores lejanos.', 'التعرف إلى الدوال الدورية وإيجاد دورها وحساب قيم بعيدة.', 'Recognise periodic functions, find their period and calculate values far along the x-axis.'),
        problem: say('Funtzio baten periodoa $T=4$ da eta $f(3)=2{,}5$. Zenbat da $f(23)$?', 'Una función tiene periodo $T=4$ y $f(3)=2{,}5$. ¿Cuánto vale $f(23)$?', 'دالة دورها $T=4$ و$f(3)=2{,}5$. كم تساوي $f(23)$؟', 'A function has period $T=4$ and $f(3)=2{,}5$. What is the value of $f(23)$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatitu periodoaz.', 'Divide entre el periodo.', 'اقسم على الدور.', 'Divide by the period.'), math: same('$23=5\\cdot 4+3$') },
            { text: say('Hondarreko balioa.', 'El valor del resto.', 'قيمة الباقي.', 'The value of the remainder.'), math: same('$f(23)=f(3)=2{,}5$') }
        ],
        takeaway: say('Periodikoa: zati bat errepikatzen da. Urruneko balioak: kendu periodoa.', 'Periódica: un trozo se repite. Valores lejanos: quita el periodo.', 'الدورية: جزء يتكرر. القيم البعيدة: اطرح الدور.', 'Periodic: a piece repeats. Far-away values: subtract the period.'),
        figure: (language) => <PeriodicFigure language={language} />
    },
    {
        id: 'tendency',
        stage: 'properties',
        title: say('Funtzio baten joera', 'Tendencia de una función', 'اتجاه الدالة', 'Trend of a function'),
        goal: say('Funtzio batek $x$ handitzean zein baliotara jotzen duen deskribatzea.', 'Describir a qué valor tiende una función cuando $x$ se hace grande.', 'وصف القيمة التي تتجه إليها الدالة عندما تكبر $x$.', 'Describe the value a function approaches when $x$ becomes large.'),
        problem: say('Substantzia batek 64 unitate ditu eta urtero erdia galtzen du. Zenbat geratzen dira 4 urtean? Zertara jotzen du?', 'Una sustancia tiene 64 unidades y cada año pierde la mitad. ¿Cuántas quedan a los 4 años? ¿A qué tiende?', 'مادة فيها 64 وحدة وتفقد نصفها كل سنة. كم يبقى بعد 4 سنوات؟ وإلى أين تتجه؟', 'A substance has 64 units and loses half of them every year. How many are left after 4 years? What does it tend to?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lau aldiz erdira.', 'Cuatro veces a la mitad.', 'أربع مرات إلى النصف.', 'Halved four times.'), math: same('$64\\to 32\\to 16\\to 8\\to 4$') },
            { text: say('0 baliora jotzen du, inoiz iritsi gabe.', 'Tiende a 0 sin llegar nunca.', 'تتجه إلى 0 دون أن تبلغه.', 'It tends to 0 but never reaches it.') }
        ],
        takeaway: say('Joera: x oso handia denean y hurbiltzen den balioa.', 'Tendencia: el valor al que se acerca y cuando x es muy grande.', 'الاتجاه: القيمة التي تقترب منها y عندما تكون x كبيرة جدًا.', 'Trend: the value it approaches when x is very large.'),
        figure: (language) => <TendencyFigure language={language} />
    },

    /* ---------- 5. Studying functions ---------- */
    {
        id: 'reading',
        stage: 'study',
        title: say('Testuinguruko grafikoak irakurtzea', 'Interpretar gráficas', 'تفسير الرسوم البيانية', 'Interpret graphs'),
        goal: say('Egoera erreal bat deskribatzen duen grafiko bat irakurtzea eta haren ezaugarriak hitzez kontatzea.', 'Leer una gráfica que describe una situación real y contar con palabras sus características.', 'قراءة رسم يصف وضعًا حقيقيًا ووصف خصائصه بالكلمات.', 'Read a graph that describes a real situation and describe its features in words.'),
        problem: say('Enpresa baten balioa 600\u00a0000 €-koa zen hasieran eta 4 hilabetean 200\u00a0000 €-ra jaitsi zen. Zenbat galdu zuen hilabeteko, batez beste?', 'Una empresa valía 600 000 € al abrir y a los 4 meses bajó a 200 000 €. ¿Cuánto perdió por mes, de media?', 'كانت قيمة شركة 600\u00a0000 € عند الافتتاح وانخفضت بعد 4 أشهر إلى 200\u00a0000 €. كم خسرت في الشهر في المتوسط؟', 'A company was worth €600,000 when it opened, and after 4 months it had fallen to €200,000. How much did it lose per month, on average?'),
        stepsKind: 'steps',
        steps: [
            { text: say('BAT $[0,\\,4]$ tartean.', 'T.V.M. en $[0,\\,4]$.', 'المعدل في $[0,\\,4]$.', 'Average rate of change on $[0,\\,4]$.'), math: same('$\\dfrac{200\\,000-600\\,000}{4}=-100\\,000$') },
            { text: say('100\u00a0000 € hilabeteko.', '100\u00a0000 € al mes.', '100\u00a0000 € في الشهر.', '€100,000 per month.') }
        ],
        takeaway: say('Lehenik ardatzak eta unitateak; gero kurba, ezkerretik eskuinera.', 'Primero los ejes y las unidades; después la curva, de izquierda a derecha.', 'أولًا المحاور والوحدات، ثم المنحنى من اليسار إلى اليمين.', 'First the axes and the units; then the curve, from left to right.'),
        figure: (language) => <GlucoseFigure language={language} />
    },
    {
        id: 'study',
        stage: 'study',
        title: say('Funtzio baten azterketa osoa', 'Estudio completo de una función', 'دراسة كاملة لدالة', 'Full study of a function'),
        goal: say('Grafiko baten ezaugarri guztiak ordenan aztertzea: izate-eremua, ebaki-puntuak, hazkundea, muturrak, jarraitutasuna eta periodikotasuna.', 'Estudiar en orden todas las características de una gráfica: dominio, cortes, crecimiento, extremos, continuidad y periodicidad.', 'دراسة كل خصائص رسم بالترتيب: المجال ونقاط التقاطع والتزايد والقيم القصوى والاتصال والدورية.', 'Study all the features of a graph in order: domain, intercepts, increase and decrease, extremes, continuity and periodicity.'),
        problem: say('Abiadura-grafiko bat: 0 eta 10 minutu artean 0 km/h-tik 90 km/h-ra igotzen da, 15 minutura 45 km/h-ra jaisten da, 20 minutura 60 km/h-ra igotzen da eta 25 minutuan gelditzen da. Zenbat maximo ditu?', 'Una gráfica de velocidad sube de 0 a 90 km/h entre el minuto 0 y el 10, baja a 45 en el 15, sube a 60 en el 20 y se para en el 25. ¿Cuántos máximos tiene?', 'رسم سرعة يصعد من 0 إلى 90 كم/س بين الدقيقة 0 و10، وينزل إلى 45 في الدقيقة 15، ويصعد إلى 60 في الدقيقة 20، ويتوقف في الدقيقة 25. كم قيمة عظمى له؟', 'A speed graph rises from 0 to 90 km/h between minute 0 and minute 10, falls to 45 at minute 15, rises to 60 at minute 20 and stops at minute 25. How many maxima does it have?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Igotzetik jaistera: $x=10$ eta $x=20$.', 'De subir a bajar: $x=10$ y $x=20$.', 'من الصعود إلى النزول: $x=10$ و$x=20$.', 'From going up to going down: $x=10$ and $x=20$.'), math: same('$(10,\\,90)\\quad(20,\\,60)$') },
            { text: say('Bi maximo; minimoa $(15,\\,45)$.', 'Dos máximos; mínimo en $(15,\\,45)$.', 'قيمتان عظميان؛ والصغرى $(15,\\,45)$.', 'Two maxima; minimum at $(15,\\,45)$.') }
        ],
        takeaway: say('Izate-eremua, ebakiak, hazkundea, muturrak, jarraitutasuna: beti ordena horretan.', 'Dominio, cortes, crecimiento, extremos, continuidad: siempre en ese orden.', 'المجال، التقاطع، التزايد، القيم القصوى، الاتصال: دائمًا بهذا الترتيب.', 'Domain, intercepts, increase and decrease, extremes, continuity: always in that order.'),
        figure: (language) => <StudyFigure language={language} />
    },
    {
        id: 'modelling',
        stage: 'study',
        title: say('Problema batetik funtziora', 'De un problema a una función', 'من مسألة إلى دالة', 'From a problem to a function'),
        goal: say('Enuntziatu batetik funtzioaren formula idaztea, zentzua duen izate-eremua erabakitzea eta balioak kalkulatzea.', 'Escribir la fórmula de una función a partir de un enunciado, decidir su dominio con sentido y calcular valores.', 'كتابة صيغة الدالة من نص، وتحديد مجالها المنطقي، وحساب قيم.', 'Write the formula of a function from a problem, decide its domain in context and calculate values.'),
        problem: say('7 cm-ko aldeko karratu baten barruan beste karratu bat inskribatzen da, erpin bakoitza $x$ distantziara jarrita. Bere azalera $A(x)=x^2+(7-x)^2$ da. Kalkulatu $A(3)$.', 'Dentro de un cuadrado de 7 cm de lado se inscribe otro con cada vértice a distancia $x$. Su área es $A(x)=x^2+(7-x)^2$. Calcula $A(3)$.', 'داخل مربع ضلعه 7 سم يُرسم مربع آخر كل رأس منه على بعد $x$. مساحته $A(x)=x^2+(7-x)^2$. احسب $A(3)$.', 'Inside a square of side 7 cm, another square is drawn with each vertex a distance $x$ from a corner. Its area is $A(x)=x^2+(7-x)^2$. Work out $A(3)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu $x=3$.', 'Sustituye $x=3$.', 'عوّض $x=3$.', 'Substitute $x=3$.'), math: same('$3^2+4^2$') },
            { text: say('25 cm².', '25 cm².', '25 سم².', '25 cm².'), math: same('$9+16=25$') }
        ],
        takeaway: say('Aukeratu x, idatzi dena x-ren arabera eta begiratu zein balio diren zentzuzkoak.', 'Elige x, escribe todo en función de x y mira qué valores tienen sentido.', 'اختر x واكتب كل شيء بدلالتها وانظر أي القيم لها معنى.', 'Choose x, write everything in terms of x and check which values make sense.'),
        figure: (language) => <BoxModelFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const functionsTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...functionsLessonTexts[topic.id as FunctionsTopicId], ...functionsLessonChecks[topic.id as FunctionsTopicId] }))
