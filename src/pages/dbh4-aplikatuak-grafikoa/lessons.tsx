import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { AffineFigure, LineEquationFigure, ProportionalFigure, SlopeFigure } from '../dbh2-funtzioak-v2/figures'
import {
    ExponentialFigure,
    GrowthFigure,
    HyperbolaFigure,
    LinearModelsFigure,
    ModelsFigure,
    ParabolaShapesFigure,
    ParallelFigure,
    RootGraphFigure,
    ShiftedHyperbolaFigure,
    ShiftFigure,
    VertexFigure
} from './figures'

/* ==========================================================================
   Funtzio baten grafikoa · 4. DBH aplikatuak — stages and lessons,
   following Santillana Aplicadas 4, unit 8 (Gráfica de una función: direct
   proportion, linear functions, parabolas, inverse proportion and
   exponential functions) and Anaya Aplicadas 4, unit 9 (Funciones
   elementales: temperatures and springs, the equation of a line through a
   point or two points, parallel lines, the vertex x = −b/2a, shifted
   parabolas, hyperbolas with their asymptotes, square roots, y = k·aˣ and
   problems such as the frame of greatest area or a salary growing 8 %).
   ========================================================================== */

export type GraphsStageId = 'linear' | 'lines' | 'quadratic' | 'inverse' | 'exponential'

export const graphsStages: UnitStage[] = [
    { id: 'linear', tone: 'blue', title: { eu: 'Funtzio linealak', es: 'Funciones lineales', en: 'Linear functions', ar: 'الدوال الخطية' } },
    { id: 'lines', tone: 'violet', title: { eu: 'Zuzenaren ekuazioa', es: 'La ecuación de la recta', en: 'The equation of the straight line', ar: 'معادلة المستقيم' } },
    { id: 'quadratic', tone: 'mustard', title: { eu: 'Funtzio koadratikoak', es: 'Funciones cuadráticas', en: 'Quadratic functions', ar: 'الدوال التربيعية' } },
    { id: 'inverse', tone: 'coral', title: { eu: 'Alderantzizkoak eta erroak', es: 'Inversas y radicales', en: 'Inverse and radical functions', ar: 'العكسية والجذرية' } },
    { id: 'exponential', tone: 'green', title: { eu: 'Esponentzialak eta ereduak', es: 'Exponenciales y modelos', en: 'Exponential functions and models', ar: 'الأسية والنماذج' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

export const graphsTopics: UnitTopic[] = [
    /* ---------- 1. Linear functions ---------- */
    {
        id: 'proportional',
        stage: 'linear',
        title: say('Proportzionaltasun zuzeneko funtzioak', 'Funciones de proporcionalidad directa', 'دوال التناسب الطردي', 'Direct proportion functions'),
        goal: say('$y=mx$ funtzioak ezagutzea, $m$ proportzionaltasun-konstantea (malda) kalkulatzea eta grafikoa marraztea.', 'Reconocer las funciones $y=mx$, calcular la constante de proporcionalidad $m$ (la pendiente) y dibujar la gráfica.', 'التعرف على الدوال $y=mx$ وحساب ثابت التناسب $m$ (الميل) ورسم البيان.', 'Recognise functions $y=mx$, calculate the constant of proportionality $m$ (the slope), and draw the graph.'),
        explanation: say(
            'Bi magnitude zuzenki proportzionalak badira, $y=mx$ funtzioaz lotzen dira. $m$ proportzionaltasun-konstantea da, eta $m=\\frac{y}{x}$ zatiketaz kalkulatzen da edozein bikoterekin. Grafikoa jatorritik, $(0,\\,0)$, pasatzen den zuzen bat da, eta $m$ da bere malda: $x$ unitate bat handitzean $y$ zenbat aldatzen den. $m>0$ bada, funtzioa gorakorra da; $m<0$ bada, beherakorra. Ur-botila bakoitzak 1,25 € balio badu, $y=1{,}25x$; 6 botilak $1{,}25\\cdot 6=7{,}5$ €. Marrazteko, nahikoa da jatorria eta beste puntu bat: $x=1$ denean, $y=m$.',
            'Si dos magnitudes son directamente proporcionales, se relacionan con una función $y=mx$. $m$ es la constante de proporcionalidad y se calcula dividiendo $m=\\frac{y}{x}$ con cualquier pareja. La gráfica es una recta que pasa por el origen, $(0,\\,0)$, y $m$ es su pendiente: lo que cambia $y$ cuando $x$ aumenta una unidad. Si $m>0$ la función es creciente; si $m<0$, decreciente. Si cada botella de agua cuesta 1,25 €, $y=1{,}25x$; 6 botellas cuestan $1{,}25\\cdot 6=7{,}5$ €. Para dibujarla basta el origen y otro punto: para $x=1$, $y=m$.',
            'إذا كان مقداران متناسبين طرديًا فإنهما يرتبطان بدالة $y=mx$. و$m$ ثابت التناسب ويُحسب بالقسمة $m=\\frac{y}{x}$ مع أي زوج. البيان مستقيم يمر بنقطة الأصل $(0,\\,0)$، و$m$ ميله: ما يتغير به $y$ عندما يزيد $x$ وحدة واحدة. إذا كان $m>0$ فالدالة متزايدة، وإذا كان $m<0$ فمتناقصة. إذا كان ثمن كل قارورة ماء 1.25 € فإن $y=1{,}25x$؛ و6 قوارير ثمنها $1{,}25\\cdot 6=7{,}5$ €. لرسمها تكفي نقطة الأصل ونقطة أخرى: عند $x=1$ يكون $y=m$.', 'If two quantities are directly proportional, they are related by a function $y=mx$. $m$ is the constant of proportionality, and it is calculated by dividing $m=\\frac{y}{x}$ using any pair of values. The graph is a straight line through the origin, $(0,\\,0)$, and $m$ is its slope: how much $y$ changes when $x$ increases by one unit. If $m>0$ the function is increasing; if $m<0$, decreasing. If each bottle of water costs €1.25, then $y=1{,}25x$; 6 bottles cost $1{,}25\\cdot 6=7{,}5$ euros. To draw it, the origin and one other point are enough: for $x=1$, $y=m$.'
        ),
        problem: say('$y=mx$ zuzena $(-5,\\,10)$ puntutik pasatzen da. Zenbat da $m$?', 'La recta $y=mx$ pasa por $(-5,\\,10)$. ¿Cuánto vale $m$?', 'يمر المستقيم $y=mx$ بالنقطة $(-5,\\,10)$. كم تساوي $m$؟', 'The line $y=mx$ passes through $(-5,\\,10)$. What is $m$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu puntua.', 'Sustituye el punto.', 'عوّض النقطة.', 'Substitute the point.'), math: same('$10=m\\cdot(-5)$') },
            { text: say('Zatitu. Beherakorra da.', 'Divide. Es decreciente.', 'اقسم. الدالة متناقصة.', 'Divide. It is decreasing.'), math: same('$m=-2$') }
        ],
        example: same('$y=1{,}25x$'),
        takeaway: say('Proportzionaltasun zuzena: jatorritik pasatzen den zuzena, malda m = y : x.', 'Proporcionalidad directa: recta por el origen, de pendiente m = y : x.', 'التناسب الطردي: مستقيم يمر بالأصل ميله m = y : x.', 'Direct proportion: a straight line through the origin, with slope m = y : x.'),
        figure: (language) => <ProportionalFigure language={language} />
    },
    {
        id: 'affine',
        stage: 'linear',
        title: say('Funtzio linealak eta konstanteak', 'Funciones lineales y constantes', 'الدوال الخطية والثابتة', 'Linear and constant functions'),
        goal: say('$y=mx+n$ funtzioan malda eta jatorriko ordenatua irakurtzea, ardatzekiko ebakidurak kalkulatzea eta grafikoa marraztea.', 'Leer la pendiente y la ordenada en el origen de $y=mx+n$, calcular los cortes con los ejes y dibujar la gráfica.', 'قراءة الميل والجزء المقطوع من $y=mx+n$ وحساب التقاطع مع المحورين ورسم البيان.', 'Read the slope and the y-intercept of $y=mx+n$, calculate where it crosses the axes, and draw the graph.'),
        explanation: say(
            '$y=mx+n$ funtzio lineal baten grafikoa zuzen bat da. $m$ malda da (aldapa) eta $n$ jatorriko ordenatua: zuzenak Y ardatza $(0,\\,n)$ puntuan ebakitzen du. X ardatza ebakitzeko, $y=0$ egin eta ebatzi: $mx+n=0$. Adibidez, $y=-5x+3$ funtzioak Y ardatza $(0,\\,3)$ puntuan ebakitzen du, eta X ardatza $x=\\frac{3}{5}$ puntuan. $n=0$ bada, proportzionaltasun zuzena da. $m=0$ bada, $y=n$ funtzio konstantea da: zuzen horizontal bat. Marrazteko, kalkulatu bi puntu (adibidez, $x=0$ eta $x=1$ edo $x$-ren beste balio bat) eta lotu.',
            'La gráfica de una función lineal $y=mx+n$ es una recta. $m$ es la pendiente (la inclinación) y $n$ la ordenada en el origen: la recta corta al eje Y en $(0,\\,n)$. Para el corte con el eje X se hace $y=0$ y se resuelve $mx+n=0$. Por ejemplo, $y=-5x+3$ corta al eje Y en $(0,\\,3)$ y al eje X en $x=\\frac{3}{5}$. Si $n=0$ es una proporcionalidad directa. Si $m=0$ es la función constante $y=n$: una recta horizontal. Para dibujarla, calcula dos puntos (por ejemplo, $x=0$ y $x=1$ u otro valor de $x$) y únelos.',
            'بيان الدالة الخطية $y=mx+n$ مستقيم. $m$ الميل (الانحدار) و$n$ الجزء المقطوع من محور الصادات: يقطع المستقيم محور Y في $(0,\\,n)$. ولإيجاد التقاطع مع محور X نضع $y=0$ ونحل $mx+n=0$. مثلًا $y=-5x+3$ يقطع محور Y في $(0,\\,3)$ ومحور X في $x=\\frac{3}{5}$. إذا كان $n=0$ فهو تناسب طردي. وإذا كان $m=0$ فهي الدالة الثابتة $y=n$: مستقيم أفقي. لرسمه احسب نقطتين (مثلًا $x=0$ و$x=1$ أو قيمة أخرى لـ $x$) وصِلهما.', 'The graph of a linear function $y=mx+n$ is a straight line. $m$ is the slope (how steep it is) and $n$ is the y-intercept: the line crosses the y-axis at $(0,\\,n)$. To find where it crosses the x-axis, set $y=0$ and solve $mx+n=0$. For example, $y=-5x+3$ crosses the y-axis at $(0,\\,3)$ and the x-axis at $x=\\frac{3}{5}$. If $n=0$, it is direct proportion. If $m=0$, it is the constant function $y=n$: a horizontal line. To draw it, calculate two points (for example, $x=0$ and $x=1$, or another value of $x$) and join them.'
        ),
        problem: say('Non ebakitzen du $y=2x-6$ zuzenak X ardatza?', '¿Dónde corta la recta $y=2x-6$ al eje X?', 'أين يقطع المستقيم $y=2x-6$ محور X؟', 'Where does the line $y=2x-6$ cross the x-axis?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Egin $y=0$.', 'Haz $y=0$.', 'ضع $y=0$.', 'Put $y=0$.'), math: same('$2x-6=0$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حُلّ.', 'Solve.'), math: same('$x=3\\to(3,\\,0)$') }
        ],
        example: same('$y=mx+n$'),
        takeaway: say('m: aldapa. n: Y ardatzeko ebakidura. m = 0: zuzen horizontala.', 'm: la inclinación. n: el corte con el eje Y. m = 0: recta horizontal.', 'm: الانحدار. n: التقاطع مع محور Y. m = 0: مستقيم أفقي.', 'm: the slope. n: where it crosses the y-axis. m = 0: horizontal line.'),
        figure: (language) => <AffineFigure language={language} />
    },
    {
        id: 'linear-models',
        stage: 'linear',
        title: say('Eredu linealak', 'Modelos lineales', 'نماذج خطية', 'Linear models'),
        goal: say('Egoera erreal bat $y=mx+n$ funtzio batez adieraztea eta datuak kalkulatzeko erabiltzea.', 'Describir una situación real con una función $y=mx+n$ y usarla para calcular datos.', 'وصف موقف واقعي بدالة $y=mx+n$ واستعمالها لحساب المعطيات.', 'Describe a real situation with a function $y=mx+n$ and use it to calculate data.'),
        explanation: say(
            'Magnitude bat abiapuntuko balio batetik ($n$) abiatu eta abiadura konstantean ($m$) aldatzen denean, funtzio lineal bat da. Malguki batek 30 cm neurtzen ditu eta kilo bakoitzeko 15 cm luzatzen da: $y=30+15x$. Fahrenheit graduak: $y=32+1{,}8x$, $x$ gradu zentigradutan. Mugikor bat jatorritik 3 m-ra dago eta 2 m/s-ra urruntzen da: $y=3+2x$. Ereduak bi norabidetan erabiltzen dira: $x$ ezagututa, ordeztu eta kalkulatu $y$; $y$ ezagututa, ebatzi lehen mailako ekuazioa. Adibidez, malgukiak 1 m (100 cm) neur dezan: $30+15x=100$, $x\\approx 4{,}67$ kg.',
            'Cuando una magnitud parte de un valor inicial ($n$) y cambia a ritmo constante ($m$), es una función lineal. Un muelle mide 30 cm y se alarga 15 cm por cada kilo: $y=30+15x$. Los grados Fahrenheit: $y=32+1{,}8x$, con $x$ en grados centígrados. Un móvil está a 3 m del origen y se aleja a 2 m/s: $y=3+2x$. El modelo se usa en los dos sentidos: si conoces $x$, sustituye y calcula $y$; si conoces $y$, resuelve una ecuación de primer grado. Por ejemplo, para que el muelle mida 1 m (100 cm): $30+15x=100$, $x\\approx 4{,}67$ kg.',
            'عندما يبدأ مقدار من قيمة ابتدائية ($n$) ويتغير بمعدل ثابت ($m$) فهو دالة خطية. نابض طوله 30 سم ويستطيل 15 سم لكل كيلوغرام: $y=30+15x$. درجات فهرنهايت: $y=32+1{,}8x$ حيث $x$ بالدرجات المئوية. متحرك على بعد 3 م من الأصل ويبتعد بسرعة 2 م/ث: $y=3+2x$. يُستعمل النموذج في الاتجاهين: إذا عرفت $x$ فعوّض واحسب $y$، وإذا عرفت $y$ فحُلّ معادلة من الدرجة الأولى. مثلًا ليصبح طول النابض 1 م (100 سم): $30+15x=100$ و$x\\approx 4{,}67$ كغ.', 'When a quantity starts at an initial value ($n$) and changes at a constant rate ($m$), it is a linear function. A spring is 30 cm long and stretches 15 cm for each kilogram: $y=30+15x$. Degrees Fahrenheit: $y=32+1{,}8x$, with $x$ in degrees Celsius. A moving object is 3 m from the origin and moves away at 2 m/s: $y=3+2x$. The model works both ways: if you know $x$, substitute and calculate $y$; if you know $y$, solve a first-degree equation. For example, for the spring to measure 1 m (100 cm): $30+15x=100$, $x\\approx 4{,}67$ kg.'
        ),
        problem: say('$y=32+1{,}8x$ erabiliz, zenbat °F dira 35 °C?', 'Con $y=32+1{,}8x$, ¿cuántos °F son 35 °C?', 'باستعمال $y=32+1{,}8x$، كم °F تساوي 35 °م؟', 'With $y=32+1{,}8x$, how many °F is 35 °C?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu $x=35$.', 'Sustituye $x=35$.', 'عوّض $x=35$.', 'Substitute $x=35$.'), math: same('$32+1{,}8\\cdot 35$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.', 'Calculate.'), math: same('$32+63=95$') }
        ],
        example: same('$y=30+15x$'),
        takeaway: say('Hasierako balioa n da; urrats bakoitzeko aldaketa, m.', 'El valor inicial es n; el cambio por cada unidad, m.', 'القيمة الابتدائية n؛ والتغير لكل وحدة m.', 'The starting value is n; the change for each unit is m.'),
        figure: (language) => <LinearModelsFigure language={language} />
    },

    /* ---------- 2. The equation of a line ---------- */
    {
        id: 'slope',
        stage: 'lines',
        title: say('Bi punturen arteko malda', 'La pendiente entre dos puntos', 'الميل بين نقطتين', 'The slope between two points'),
        goal: say('Bi puntutatik pasatzen den zuzenaren malda kalkulatzea eta grafiko batean irakurtzea.', 'Calcular la pendiente de la recta que pasa por dos puntos y leerla en una gráfica.', 'حساب ميل المستقيم المار بنقطتين وقراءته في بيان.', 'Calculate the slope of the line through two points, and read it from a graph.'),
        explanation: say(
            '$A(x_1,\\,y_1)$ eta $B(x_2,\\,y_2)$ puntuetatik pasatzen den zuzenaren malda da $m=\\frac{y_2-y_1}{x_2-x_1}$: altueraren aldaketa zati aurrerapenaren aldaketa. Ordena berean kendu behar da goian eta behean. Adibidez, $(3,\\,-5)$ eta $(-4,\\,7)$ puntuetatik: $m=\\frac{7-(-5)}{-4-3}=\\frac{12}{-7}=-\\frac{12}{7}$. Grafiko batean, aukeratu zuzeneko bi puntu koadrikulako erpinetan, eta zenbatu zenbat lauki igotzen (edo jaisten) den eta zenbat aurrera egiten den. Puntuek $x$ bera badute, zuzena bertikala da eta ez du maldarik (ez da funtzioa).',
            'La pendiente de la recta que pasa por $A(x_1,\\,y_1)$ y $B(x_2,\\,y_2)$ es $m=\\frac{y_2-y_1}{x_2-x_1}$: lo que cambia la altura dividido entre lo que se avanza. Hay que restar en el mismo orden arriba y abajo. Por ejemplo, por $(3,\\,-5)$ y $(-4,\\,7)$: $m=\\frac{7-(-5)}{-4-3}=\\frac{12}{-7}=-\\frac{12}{7}$. En una gráfica, elige dos puntos de la recta que caigan en los cruces de la cuadrícula y cuenta cuántos cuadros sube (o baja) y cuántos avanza. Si los puntos tienen la misma $x$, la recta es vertical y no tiene pendiente (no es función).',
            'ميل المستقيم المار بـ $A(x_1,\\,y_1)$ و$B(x_2,\\,y_2)$ هو $m=\\frac{y_2-y_1}{x_2-x_1}$: تغير الارتفاع مقسومًا على التقدم. يجب الطرح بالترتيب نفسه في البسط والمقام. مثلًا عبر $(3,\\,-5)$ و$(-4,\\,7)$: $m=\\frac{7-(-5)}{-4-3}=\\frac{12}{-7}=-\\frac{12}{7}$. في البيان اختر نقطتين من المستقيم تقعان على تقاطعات الشبكة، وعُدّ كم مربعًا يصعد (أو ينزل) وكم يتقدم. إذا كان للنقطتين $x$ نفسه فالمستقيم رأسي ولا ميل له (ليس دالة).', 'The slope of the line through $A(x_1,\\,y_1)$ and $B(x_2,\\,y_2)$ is $m=\\frac{y_2-y_1}{x_2-x_1}$: how much the height changes divided by how far you move across. Subtract in the same order on the top and the bottom. For example, through $(3,\\,-5)$ and $(-4,\\,7)$: $m=\\frac{7-(-5)}{-4-3}=\\frac{12}{-7}=-\\frac{12}{7}$. On a graph, choose two points on the line that fall on grid intersections, and count how many squares it goes up (or down) and how many it goes across. If the points have the same $x$, the line is vertical and has no slope (it is not a function).'
        ),
        problem: say('Kalkulatu $(-2,\\,-4)$ eta $(2,\\,-3)$ puntuetatik pasatzen den zuzenaren malda.', 'Calcula la pendiente de la recta que pasa por $(-2,\\,-4)$ y $(2,\\,-3)$.', 'احسب ميل المستقيم المار بـ $(-2,\\,-4)$ و$(2,\\,-3)$.', 'Calculate the slope of the line through $(-2,\\,-4)$ and $(2,\\,-3)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kendu ordena berean.', 'Resta en el mismo orden.', 'اطرح بالترتيب نفسه.', 'Subtract in the same order.'), math: same('$m=\\frac{-3-(-4)}{2-(-2)}$') },
            { text: say('Sinplifikatu.', 'Simplifica.', 'بسّط.', 'Simplify.'), math: same('$m=\\frac{1}{4}$') }
        ],
        example: same('$m=\\dfrac{y_2-y_1}{x_2-x_1}$'),
        takeaway: say('Malda: zenbat igotzen den zati zenbat aurreratzen den.', 'Pendiente: lo que sube entre lo que avanza.', 'الميل: ما يصعده مقسومًا على ما يتقدمه.', 'Slope: how much it goes up divided by how far it goes across.'),
        figure: (language) => <SlopeFigure language={language} />
    },
    {
        id: 'line-equation',
        stage: 'lines',
        title: say('Zuzenaren ekuazioa', 'La ecuación de una recta', 'معادلة مستقيم', 'The equation of a straight line'),
        goal: say('Puntu bat eta malda ezagututa, edo bi puntu ezagututa, zuzenaren ekuazioa idaztea.', 'Escribir la ecuación de una recta conocidos un punto y la pendiente, o dos puntos.', 'كتابة معادلة مستقيم بمعرفة نقطة والميل أو بمعرفة نقطتين.', 'Write the equation of a straight line given a point and the slope, or two points.'),
        explanation: say(
            'Malda $m$ eta puntu bat $P(x_0,\\,y_0)$ ezagututa, idatzi $y=mx+n$ eta ordeztu puntua $n$ aurkitzeko: $y_0=m\\,x_0+n$. Adibidez, $m=-2$ eta $P(2,\\,-1)$: $-1=-2\\cdot 2+n$, beraz $n=3$ eta $y=-2x+3$. Gauza bera da puntu-malda ekuazioa erabiltzea: $y-y_0=m(x-x_0)$. Bi puntu ematen badituzte, kalkulatu lehenik malda eta gero jarraitu berdin. $(0,\\,-3)$ eta $(3,\\,0)$ puntuetatik: $m=\\frac{0-(-3)}{3-0}=1$ eta $n=-3$, beraz $y=x-3$. Amaitzeko, egiaztatu bigarren puntua ekuazioan.',
            'Conocida la pendiente $m$ y un punto $P(x_0,\\,y_0)$, escribe $y=mx+n$ y sustituye el punto para hallar $n$: $y_0=m\\,x_0+n$. Por ejemplo, $m=-2$ y $P(2,\\,-1)$: $-1=-2\\cdot 2+n$, así que $n=3$ e $y=-2x+3$. Es lo mismo que usar la ecuación punto-pendiente: $y-y_0=m(x-x_0)$. Si te dan dos puntos, calcula primero la pendiente y sigue igual. Por $(0,\\,-3)$ y $(3,\\,0)$: $m=\\frac{0-(-3)}{3-0}=1$ y $n=-3$, luego $y=x-3$. Al final, comprueba el segundo punto en la ecuación.',
            'بمعرفة الميل $m$ ونقطة $P(x_0,\\,y_0)$ اكتب $y=mx+n$ وعوّض النقطة لإيجاد $n$: $y_0=m\\,x_0+n$. مثلًا $m=-2$ و$P(2,\\,-1)$: $-1=-2\\cdot 2+n$، إذن $n=3$ و$y=-2x+3$. وهذا مثل استعمال معادلة النقطة والميل: $y-y_0=m(x-x_0)$. إذا أُعطيت نقطتين فاحسب الميل أولًا ثم تابع بالطريقة نفسها. عبر $(0,\\,-3)$ و$(3,\\,0)$: $m=\\frac{0-(-3)}{3-0}=1$ و$n=-3$، إذن $y=x-3$. وفي النهاية تحقق من النقطة الثانية في المعادلة.', 'If you know the slope $m$ and a point $P(x_0,\\,y_0)$, write $y=mx+n$ and substitute the point to find $n$: $y_0=m\\,x_0+n$. For example, $m=-2$ and $P(2,\\,-1)$: $-1=-2\\cdot 2+n$, so $n=3$ and $y=-2x+3$. It is the same as using the point-slope equation: $y-y_0=m(x-x_0)$. If you are given two points, first calculate the slope and then carry on in the same way. For $(0,\\,-3)$ and $(3,\\,0)$: $m=\\frac{0-(-3)}{3-0}=1$ and $n=-3$, so $y=x-3$. Finally, check the second point in the equation.'
        ),
        problem: say('Idatzi $(1,\\,3)$ puntutik pasatzen den eta malda 2 duen zuzenaren ekuazioa.', 'Escribe la ecuación de la recta que pasa por $(1,\\,3)$ con pendiente 2.', 'اكتب معادلة المستقيم المار بـ $(1,\\,3)$ وميله 2.', 'Write the equation of the line that passes through $(1,\\,3)$ with slope 2.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu puntua.', 'Sustituye el punto.', 'عوّض النقطة.', 'Substitute the point.'), math: same('$3=2\\cdot 1+n$') },
            { text: say('Atera $n$.', 'Despeja $n$.', 'استخرج $n$.', 'Solve for $n$.'), math: same('$n=1\\to y=2x+1$') }
        ],
        example: same('$y-y_0=m(x-x_0)$'),
        takeaway: say('Lehenik malda; gero puntu bat ordeztu n aurkitzeko.', 'Primero la pendiente; después un punto para hallar n.', 'الميل أولًا؛ ثم نقطة لإيجاد n.', 'First the slope; then a point to find n.'),
        figure: (language) => <LineEquationFigure language={language} />
    },
    {
        id: 'parallel',
        stage: 'lines',
        title: say('Zuzen paraleloak eta ebakitzaileak', 'Rectas paralelas y secantes', 'المستقيمات المتوازية والمتقاطعة', 'Parallel and intersecting lines'),
        goal: say('Bi zuzen paraleloak diren ala ez maldaz jakitzea, paralelo bat idaztea eta bi zuzenen ebaki-puntua aurkitzea.', 'Saber por la pendiente si dos rectas son paralelas, escribir una paralela y hallar el punto de corte de dos rectas.', 'معرفة توازي مستقيمين من الميل، وكتابة مستقيم مواز، وإيجاد نقطة تقاطع مستقيمين.', 'Know from the slope whether two lines are parallel, write a parallel line, and find where two lines intersect.'),
        explanation: say(
            'Bi zuzen paraleloak dira malda bera badute eta jatorriko ordenatua desberdina: $y=2x+1$ eta $y=2x-3$ ez dira inoiz elkartzen. Malda desberdina badute, puntu bakar batean ebakitzen dira. Puntu hori aurkitzeko, berdindu bi adierazpenak: $2x+1=-x+4$ bada, $x=1$ eta $y=3$; ebaki-puntua $(1,\\,3)$ da. Zuzen bati paraleloa den eta puntu batetik pasatzen den zuzena idazteko, hartu haren malda eta ordeztu puntua. Adibidez, $(2,\\,-3)$ puntutik pasatzen den eta $y=-x+5$ zuzenaren paraleloa: $m=-1$, $-3=-2+n$, $n=-1$, beraz $y=-x-1$.',
            'Dos rectas son paralelas si tienen la misma pendiente y distinta ordenada en el origen: $y=2x+1$ e $y=2x-3$ no se encuentran nunca. Si tienen distinta pendiente, se cortan en un solo punto. Para hallarlo, iguala las dos expresiones: si $2x+1=-x+4$, entonces $x=1$ e $y=3$; el punto de corte es $(1,\\,3)$. Para escribir la paralela a una recta que pasa por un punto, toma su pendiente y sustituye el punto. Por ejemplo, la paralela a $y=-x+5$ por $(2,\\,-3)$: $m=-1$, $-3=-2+n$, $n=-1$, luego $y=-x-1$.',
            'يتوازى مستقيمان إذا كان لهما الميل نفسه وجزء مقطوع مختلف: $y=2x+1$ و$y=2x-3$ لا يلتقيان أبدًا. وإذا اختلف ميلاهما فإنهما يتقاطعان في نقطة واحدة. ولإيجادها ساوِ العبارتين: إذا كان $2x+1=-x+4$ فإن $x=1$ و$y=3$؛ ونقطة التقاطع $(1,\\,3)$. ولكتابة المستقيم الموازي لمستقيم والمار بنقطة خذ ميله وعوّض النقطة. مثلًا الموازي لـ $y=-x+5$ عبر $(2,\\,-3)$: $m=-1$ و$-3=-2+n$ و$n=-1$، إذن $y=-x-1$.', 'Two lines are parallel if they have the same slope and different y-intercepts: $y=2x+1$ and $y=2x-3$ never meet. If they have different slopes, they cross at exactly one point. To find it, set the two expressions equal: if $2x+1=-x+4$, then $x=1$ and $y=3$; the crossing point is $(1,\\,3)$. To write a parallel line through a given point, take the slope and substitute the point. For example, the parallel to $y=-x+5$ through $(2,\\,-3)$: $m=-1$, $-3=-2+n$, $n=-1$, so $y=-x-1$.'
        ),
        problem: say('Non ebakitzen dute $y=3x-1$ eta $y=x+5$ zuzenek? Eman $x$.', '¿Dónde se cortan $y=3x-1$ e $y=x+5$? Da la $x$.', 'أين يتقاطع $y=3x-1$ و$y=x+5$؟ أعطِ $x$.', 'Where do $y=3x-1$ and $y=x+5$ intersect? Give the value of $x$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Berdindu.', 'Iguala.', 'ساوِ.', 'Set them equal.'), math: same('$3x-1=x+5$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حُلّ.', 'Solve.'), math: same('$2x=6\\to x=3$') }
        ],
        example: same('$m_1=m_2$'),
        takeaway: say('Malda bera: paraleloak. Malda desberdina: puntu batean ebakitzen dira.', 'Misma pendiente: paralelas. Distinta pendiente: se cortan en un punto.', 'الميل نفسه: متوازيان. ميل مختلف: يتقاطعان في نقطة.', 'Same slope: parallel. Different slope: they cross at one point.'),
        figure: (language) => <ParallelFigure language={language} />
    },

    /* ---------- 3. Quadratic functions ---------- */
    {
        id: 'parabola',
        stage: 'quadratic',
        title: say('Parabolak: y = ax²', 'Parábolas: y = ax²', 'القطوع المكافئة: y = ax²', 'Parabolas: y = ax²'),
        goal: say('$y=ax^2$ parabolaren forma $a$ koefizientearen arabera aurreikustea eta balio-taula batez marraztea.', 'Prever la forma de la parábola $y=ax^2$ según el coeficiente $a$ y dibujarla con una tabla de valores.', 'توقع شكل القطع المكافئ $y=ax^2$ بحسب المعامل $a$ ورسمه بجدول قيم.', 'Predict the shape of the parabola $y=ax^2$ from the coefficient $a$, and draw it using a table of values.'),
        explanation: say(
            '$y=ax^2+bx+c$ ($a\\ne 0$) funtzio koadratikoen grafikoa parabola bat da. Errazena $y=x^2$ da: $x$ eta $-x$ balioek irudi bera dute ($(-2)^2=2^2=4$), beraz Y ardatzarekiko simetrikoa da, eta erpina $(0,\\,0)$ puntuan du. $a$ koefizienteak forma erabakitzen du: $a>0$ bada, adarrak gora doaz eta erpina minimoa da; $a<0$ bada, adarrak behera eta erpina maximoa. $|a|$ zenbat eta handiagoa, orduan eta itxiagoa: $y=3x^2$ estuagoa da $y=\\frac{1}{3}x^2$ baino. Taula egiteko, hartu $x=-2,\\,-1,\\,0,\\,1,\\,2$; $y=-3x^2$ funtzioan, $x=2$ denean $y=-12$.',
            'La gráfica de las funciones cuadráticas $y=ax^2+bx+c$ ($a\\ne 0$) es una parábola. La más sencilla es $y=x^2$: $x$ y $-x$ tienen la misma imagen ($(-2)^2=2^2=4$), así que es simétrica respecto al eje Y y tiene el vértice en $(0,\\,0)$. El coeficiente $a$ decide la forma: si $a>0$, las ramas van hacia arriba y el vértice es un mínimo; si $a<0$, hacia abajo y el vértice es un máximo. Cuanto mayor es $|a|$, más cerrada: $y=3x^2$ es más estrecha que $y=\\frac{1}{3}x^2$. Para la tabla, toma $x=-2,\\,-1,\\,0,\\,1,\\,2$; en $y=-3x^2$, para $x=2$ sale $y=-12$.',
            'بيان الدوال التربيعية $y=ax^2+bx+c$ ($a\\ne 0$) قطع مكافئ. أبسطها $y=x^2$: للقيمتين $x$ و$-x$ الصورة نفسها ($(-2)^2=2^2=4$)، فهو متماثل بالنسبة لمحور Y ورأسه في $(0,\\,0)$. المعامل $a$ يحدد الشكل: إذا كان $a>0$ يتجه الفرعان إلى الأعلى والرأس قيمة صغرى، وإذا كان $a<0$ فإلى الأسفل والرأس قيمة عظمى. وكلما كبر $|a|$ ضاق القطع: $y=3x^2$ أضيق من $y=\\frac{1}{3}x^2$. للجدول خذ $x=-2,\\,-1,\\,0,\\,1,\\,2$؛ في $y=-3x^2$ عند $x=2$ نجد $y=-12$.', 'The graph of the quadratic functions $y=ax^2+bx+c$ ($a\\ne 0$) is a parabola. The simplest is $y=x^2$: $x$ and $-x$ give the same value of $y$ ($(-2)^2=2^2=4$), so it is symmetrical about the y-axis and has its vertex at $(0,\\,0)$. The coefficient $a$ decides the shape: if $a>0$, the branches point upwards and the vertex is a minimum; if $a<0$, they point downwards and the vertex is a maximum. The bigger $|a|$ is, the narrower it is: $y=3x^2$ is narrower than $y=\\frac{1}{3}x^2$. For the table, take $x=-2,\\,-1,\\,0,\\,1,\\,2$; for $y=-3x^2$, when $x=2$ we get $y=-12$.'
        ),
        problem: say('$y=0{,}4x^2$ parabolan, zenbat da $y$ $x=-3$ denean?', 'En la parábola $y=0{,}4x^2$, ¿cuánto vale $y$ para $x=-3$?', 'في القطع $y=0{,}4x^2$ كم تساوي $y$ عند $x=-3$؟', 'On the parabola $y=0{,}4x^2$, what is $y$ when $x=-3$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Berretura lehenik.', 'Primero la potencia.', 'القوة أولًا.', 'Work out the power first.'), math: same('$(-3)^2=9$') },
            { text: say('Biderkatu.', 'Multiplica.', 'اضرب.', 'Multiply.'), math: same('$0{,}4\\cdot 9=3{,}6$') }
        ],
        example: same('$y=ax^2$'),
        takeaway: say('a positiboa: adarrak gora. a negatiboa: adarrak behera. |a| handia: itxia.', 'a positivo: ramas arriba. a negativo: ramas abajo. |a| grande: cerrada.', 'a موجب: الفرعان للأعلى. a سالب: للأسفل. |a| كبير: ضيق.', 'a positive: branches up. a negative: branches down. Large |a|: narrow.'),
        figure: (language) => <ParabolaShapesFigure language={language} />
    },
    {
        id: 'vertex',
        stage: 'quadratic',
        title: say('Erpina eta ebaki-puntuak', 'Vértice y puntos de corte', 'الرأس ونقاط التقاطع', 'Vertex and intercepts'),
        goal: say('Parabola baten erpina, simetria-ardatza eta ardatzekiko ebakidurak kalkulatzea, eta haiekin marraztea.', 'Calcular el vértice, el eje de simetría y los cortes con los ejes de una parábola, y dibujarla con ellos.', 'حساب رأس القطع المكافئ ومحور تماثله وتقاطعه مع المحورين ورسمه بها.', 'Calculate the vertex, the axis of symmetry and where a parabola crosses the axes, and draw it using them.'),
        explanation: say(
            '$y=ax^2+bx+c$ parabolaren erpinaren abszisa $x_V=\\frac{-b}{2a}$ da, eta ordenatua irudia kalkulatuz lortzen da. $y=x^2-4x+3$ bada: $x_V=\\frac{4}{2}=2$ eta $y_V=4-8+3=-1$, beraz $V(2,\\,-1)$, minimoa ($a>0$). Simetria-ardatza $x=2$ zuzen bertikala da. Y ardatzarekiko ebakidura $(0,\\,c)$ da: hemen $(0,\\,3)$. X ardatzarekikoak ebazteko, $ax^2+bx+c=0$: $x^2-4x+3=0$ ekuazioak $x=1$ eta $x=3$ ematen ditu. Ekuazioak soluziorik ez badu, parabolak ez du X ardatza ebakitzen. Marrazteko: erpina, ebakidurak eta erpinaren bi aldeetako puntu simetriko batzuk.',
            'La abscisa del vértice de la parábola $y=ax^2+bx+c$ es $x_V=\\frac{-b}{2a}$, y la ordenada se obtiene calculando su imagen. Si $y=x^2-4x+3$: $x_V=\\frac{4}{2}=2$ e $y_V=4-8+3=-1$, así que $V(2,\\,-1)$, un mínimo ($a>0$). El eje de simetría es la recta vertical $x=2$. El corte con el eje Y es $(0,\\,c)$: aquí $(0,\\,3)$. Los cortes con el eje X salen de resolver $ax^2+bx+c=0$: $x^2-4x+3=0$ da $x=1$ y $x=3$. Si la ecuación no tiene solución, la parábola no corta al eje X. Para dibujarla: el vértice, los cortes y algunos puntos simétricos a los dos lados del vértice.',
            'فاصلة رأس القطع $y=ax^2+bx+c$ هي $x_V=\\frac{-b}{2a}$، والترتيبة نحصل عليها بحساب صورتها. إذا كان $y=x^2-4x+3$: $x_V=\\frac{4}{2}=2$ و$y_V=4-8+3=-1$، إذن $V(2,\\,-1)$ قيمة صغرى ($a>0$). محور التماثل هو المستقيم الرأسي $x=2$. التقاطع مع محور Y هو $(0,\\,c)$: هنا $(0,\\,3)$. والتقاطعات مع محور X تنتج من حل $ax^2+bx+c=0$: المعادلة $x^2-4x+3=0$ تعطي $x=1$ و$x=3$. إذا لم يكن للمعادلة حل فلا يقطع القطع محور X. للرسم: الرأس والتقاطعات وبعض النقاط المتماثلة على جانبي الرأس.', 'The x-coordinate of the vertex of the parabola $y=ax^2+bx+c$ is $x_V=\\frac{-b}{2a}$, and the y-coordinate is found by working out the value of $y$ at that point. If $y=x^2-4x+3$: $x_V=\\frac{4}{2}=2$ and $y_V=4-8+3=-1$, so $V(2,\\,-1)$, a minimum ($a>0$). The axis of symmetry is the vertical line $x=2$. The y-axis intercept is $(0,\\,c)$: here $(0,\\,3)$. The x-axis intercepts come from solving $ax^2+bx+c=0$: $x^2-4x+3=0$ gives $x=1$ and $x=3$. If the equation has no solution, the parabola does not cross the x-axis. To draw it: the vertex, the intercepts and some points symmetrical on either side of the vertex.'
        ),
        problem: say('Aurkitu $y=-x^2-2x+4$ parabolaren erpina.', 'Halla el vértice de la parábola $y=-x^2-2x+4$.', 'أوجد رأس القطع $y=-x^2-2x+4$.', 'Find the vertex of the parabola $y=-x^2-2x+4$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Abszisa.', 'La abscisa.', 'الفاصلة.', 'The x-coordinate.'), math: same('$x_V=\\frac{2}{-2}=-1$') },
            { text: say('Ordenatua. Maximoa da.', 'La ordenada. Es un máximo.', 'الترتيبة. إنها قيمة عظمى.', 'The y-coordinate. It is a maximum.'), math: same('$-1+2+4=5$') }
        ],
        example: same('$x_V=\\dfrac{-b}{2a}$'),
        takeaway: say('Erpina: x = −b : 2a. Y ardatza: (0, c). X ardatza: ebatzi y = 0.', 'Vértice: x = −b : 2a. Eje Y: (0, c). Eje X: resuelve y = 0.', 'الرأس: x = −b : 2a. محور Y: (0, c). محور X: حُلّ y = 0.', 'Vertex: x = −b : 2a. y-axis: (0, c). x-axis: solve y = 0.'),
        figure: (language) => <VertexFigure language={language} />
    },
    {
        id: 'shifts',
        stage: 'quadratic',
        title: say('Parabolen lekualdaketak', 'Traslaciones de parábolas', 'انسحاب القطوع المكافئة', 'Translations of parabolas'),
        goal: say('$y=a(x-p)^2+q$ parabola $y=ax^2$ parabolaren lekualdaketa gisa ikustea eta erpina zuzenean irakurtzea.', 'Ver la parábola $y=a(x-p)^2+q$ como una traslación de $y=ax^2$ y leer el vértice directamente.', 'رؤية القطع $y=a(x-p)^2+q$ انسحابًا للقطع $y=ax^2$ وقراءة الرأس مباشرة.', 'See the parabola $y=a(x-p)^2+q$ as a translation of $y=ax^2$, and read the vertex directly.'),
        explanation: say(
            '$y=(x-3)^2$ parabola $y=x^2$ bera da, 3 unitate eskuinera eramanda: lehen $x=0$ denean zegoen balioa orain $x=3$ denean dago. $y=x^2-3$ ere bera da, 3 unitate behera. Oro har, $y=a(x-p)^2+q$ parabolaren erpina $(p,\\,q)$ da, eta forma $y=ax^2$ parabolarena. Kontuz zeinuarekin: $y=(x+2)^2$ ezkerrera doa, $p=-2$ delako. Garatuz gero, adierazpen arrunta lortzen da: $y=(x-1)^2+5=x^2-2x+6$. Eta alderantziz, $y=2(x-2)^2$ funtzioaren erpina $(2,\\,0)$ da: X ardatza puntu bakarrean ukitzen du.',
            '$y=(x-3)^2$ es la misma parábola $y=x^2$ llevada 3 unidades a la derecha: el valor que antes estaba en $x=0$ ahora está en $x=3$. $y=x^2-3$ también es la misma, 3 unidades hacia abajo. En general, la parábola $y=a(x-p)^2+q$ tiene el vértice en $(p,\\,q)$ y la forma de $y=ax^2$. Cuidado con el signo: $y=(x+2)^2$ va hacia la izquierda, porque $p=-2$. Desarrollando se obtiene la expresión habitual: $y=(x-1)^2+5=x^2-2x+6$. Y al revés, el vértice de $y=2(x-2)^2$ es $(2,\\,0)$: toca al eje X en un solo punto.',
            '$y=(x-3)^2$ هو القطع $y=x^2$ نفسه منقولًا 3 وحدات إلى اليمين: القيمة التي كانت عند $x=0$ صارت عند $x=3$. و$y=x^2-3$ هو نفسه أيضًا منقولًا 3 وحدات إلى الأسفل. عمومًا، رأس القطع $y=a(x-p)^2+q$ هو $(p,\\,q)$ وشكله شكل $y=ax^2$. انتبه للإشارة: $y=(x+2)^2$ يتجه إلى اليسار لأن $p=-2$. وبالنشر نحصل على الصيغة المعتادة: $y=(x-1)^2+5=x^2-2x+6$. وبالعكس، رأس $y=2(x-2)^2$ هو $(2,\\,0)$: يمس محور X في نقطة واحدة.', '$y=(x-3)^2$ is the same parabola $y=x^2$ moved 3 units to the right: the value that was at $x=0$ is now at $x=3$. $y=x^2-3$ is also the same parabola, moved 3 units down. In general, the parabola $y=a(x-p)^2+q$ has its vertex at $(p,\\,q)$ and the shape of $y=ax^2$. Be careful with the sign: $y=(x+2)^2$ moves to the left, because $p=-2$. Expanding gives the usual form: $y=(x-1)^2+5=x^2-2x+6$. Going the other way round, the vertex of $y=2(x-2)^2$ is $(2,\\,0)$: it touches the x-axis at only one point.'
        ),
        problem: say('Zein da $y=4-(x-2)^2$ parabolaren erpina?', '¿Cuál es el vértice de la parábola $y=4-(x-2)^2$?', 'ما رأس القطع $y=4-(x-2)^2$؟', 'What is the vertex of the parabola $y=4-(x-2)^2$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi $a(x-p)^2+q$ eran.', 'Escríbela como $a(x-p)^2+q$.', 'اكتبه بالصورة $a(x-p)^2+q$.', 'Write it as $a(x-p)^2+q$.'), math: same('$y=-(x-2)^2+4$') },
            { text: say('Irakurri. Maximoa da.', 'Lee. Es un máximo.', 'اقرأ. إنها قيمة عظمى.', 'Read it off. It is a maximum.'), math: same('$V(2,\\,4)$') }
        ],
        example: same('$y=a(x-p)^2+q$'),
        takeaway: say('(x − p)²: p eskuinera. + q: q gora. Erpina (p, q).', '(x − p)²: p a la derecha. + q: q hacia arriba. Vértice (p, q).', '(x − p)²: p إلى اليمين. + q: q إلى الأعلى. الرأس (p, q).', '(x − p)²: p to the right. + q: q upwards. Vertex (p, q).'),
        figure: (language) => <ShiftFigure language={language} />
    },

    /* ---------- 4. Inverse proportion and radicals ---------- */
    {
        id: 'inverse',
        stage: 'inverse',
        title: say('Alderantzizko proportzionaltasuna: y = k/x', 'Proporcionalidad inversa: y = k/x', 'التناسب العكسي: y = k/x', 'Inverse proportion: y = k/x'),
        goal: say('Alderantziz proportzionalak diren magnitudeak $y=\\frac{k}{x}$ funtzioaz adieraztea eta hiperbola marraztea.', 'Expresar magnitudes inversamente proporcionales con una función $y=\\frac{k}{x}$ y dibujar la hipérbola.', 'التعبير عن مقادير متناسبة عكسيًا بدالة $y=\\frac{k}{x}$ ورسم القطع الزائد.', 'Express inversely proportional quantities with a function $y=\\frac{k}{x}$, and draw the hyperbola.'),
        explanation: say(
            'Bi magnitude alderantziz proportzionalak dira bata bider bi, hiru… egitean bestea bitan, hirutan… zatitzen bada: haien biderkadura konstantea da, $x\\cdot y=k$, eta $y=\\frac{k}{x}$. 48 orduko lana: 2 langilek 24 ordu, 4 langilek 12 ordu; $y=\\frac{48}{x}$. Grafikoa hiperbola bat da, bi adarrekin. $k>0$ bada, adarrak I. eta III. koadranteetan daude eta funtzioa beherakorra da adar bakoitzean; $k<0$ bada, II. eta IV. koadranteetan. Ez du ardatzik ebakitzen: $x=0$ ez dago izate-eremuan (Dom $f=\\mathbb{R}-\\{0\\}$). Ardatzak bere asintotak dira: kurba haietara hurbiltzen da, baina ez ditu inoiz ukitzen.',
            'Dos magnitudes son inversamente proporcionales si al multiplicar una por dos, tres… la otra queda dividida entre dos, tres…: su producto es constante, $x\\cdot y=k$, e $y=\\frac{k}{x}$. Un trabajo de 48 horas: 2 trabajadores tardan 24 horas, 4 trabajadores 12 horas; $y=\\frac{48}{x}$. La gráfica es una hipérbola, con dos ramas. Si $k>0$, las ramas están en los cuadrantes I y III y la función es decreciente en cada rama; si $k<0$, en los cuadrantes II y IV. No corta a los ejes: $x=0$ no está en el dominio (Dom $f=\\mathbb{R}-\\{0\\}$). Los ejes son sus asíntotas: la curva se acerca a ellos pero no los toca nunca.',
            'يكون المقداران متناسبين عكسيًا إذا ضُرب أحدهما في اثنين أو ثلاثة… فقُسم الآخر على اثنين أو ثلاثة…: حاصل ضربهما ثابت $x\\cdot y=k$ و$y=\\frac{k}{x}$. عمل يحتاج 48 ساعة: يستغرق عاملان 24 ساعة و4 عمال 12 ساعة؛ $y=\\frac{48}{x}$. البيان قطع زائد له فرعان. إذا كان $k>0$ فالفرعان في الربعين الأول والثالث والدالة متناقصة في كل فرع؛ وإذا كان $k<0$ ففي الربعين الثاني والرابع. لا يقطع المحورين: $x=0$ ليست في المجال (Dom $f=\\mathbb{R}-\\{0\\}$). المحوران مقاربان له: يقترب المنحنى منهما دون أن يمسهما أبدًا.', 'Two quantities are inversely proportional if, when one is multiplied by two, three… the other is divided by two, three…: their product is constant, $x\\cdot y=k$, and $y=\\frac{k}{x}$. A job that takes 48 hours: 2 workers take 24 hours, 4 workers take 12 hours; $y=\\frac{48}{x}$. The graph is a hyperbola, with two branches. If $k>0$, the branches are in quadrants I and III and the function is decreasing on each branch; if $k<0$, in quadrants II and IV. It does not cross the axes: $x=0$ is not in the domain (Dom $f=\\mathbb{R}-\\{0\\}$). The axes are its asymptotes: the curve gets closer to them but never touches them.'
        ),
        problem: say('48 behirentzako pentsuak 15 egun irauten du. Zenbat egun iraungo du 60 behirentzat?', 'El pienso para 48 vacas dura 15 días. ¿Cuántos días dura para 60 vacas?', 'يكفي العلف 48 بقرة مدة 15 يومًا. كم يومًا يكفي 60 بقرة؟', 'The feed for 48 cows lasts 15 days. How many days will it last for 60 cows?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Konstantea.', 'La constante.', 'الثابت.', 'The constant.'), math: same('$k=48\\cdot 15=720$') },
            { text: say('Zatitu.', 'Divide.', 'اقسم.', 'Divide.'), math: same('$y=\\frac{720}{60}=12$') }
        ],
        example: same('$y=\\dfrac{k}{x}$'),
        takeaway: say('Alderantzizkoa: x · y = k. Hiperbola, ardatzak asintota.', 'Inversa: x · y = k. Hipérbola con los ejes como asíntotas.', 'عكسي: x · y = k. قطع زائد مقارباه المحوران.', 'Inverse: x · y = k. Hyperbola with the axes as asymptotes.'),
        figure: (language) => <HyperbolaFigure language={language} />
    },
    {
        id: 'asymptotes',
        stage: 'inverse',
        title: say('Hiperbolak eta asintotak', 'Hipérbolas y asíntotas', 'القطوع الزائدة والمقاربات', 'Hyperbolas and asymptotes'),
        goal: say('$y=\\frac{k}{x-a}+b$ funtzioaren asintotak eta izate-eremua aurkitzea eta $y=\\frac{k}{x}$ hiperbolaren lekualdaketa gisa marraztea.', 'Hallar las asíntotas y el dominio de $y=\\frac{k}{x-a}+b$ y dibujarla como traslación de $y=\\frac{k}{x}$.', 'إيجاد مقاربات $y=\\frac{k}{x-a}+b$ ومجالها ورسمها انسحابًا للقطع $y=\\frac{k}{x}$.', 'Find the asymptotes and the domain of $y=\\frac{k}{x-a}+b$, and draw it as a translation of $y=\\frac{k}{x}$.'),
        explanation: say(
            '$y=\\frac{1}{x-1}$ funtzioa $y=\\frac{1}{x}$ bera da, unitate bat eskuinera: izendatzailea $x=1$ denean da 0, beraz Dom $f=\\mathbb{R}-\\{1\\}$ eta $x=1$ asintota bertikala da. $+\\,b$ batuz gero, hiperbola $b$ unitate igotzen da eta $y=b$ asintota horizontala bihurtzen da. Laburbilduz, $y=\\frac{k}{x-a}+b$: asintota bertikala $x=a$, horizontala $y=b$, Dom $f=\\mathbb{R}-\\{a\\}$. Adibidez, $y=\\frac{1}{x-1}+2$: asintotak $x=1$ eta $y=2$. Marrazteko, trazatu asintotak marra etenez eta kalkulatu puntu batzuk bi aldeetan: $x=2$ denean $y=3$, $x=0$ denean $y=1$.',
            '$y=\\frac{1}{x-1}$ es la misma $y=\\frac{1}{x}$ una unidad a la derecha: el denominador vale 0 cuando $x=1$, así que Dom $f=\\mathbb{R}-\\{1\\}$ y $x=1$ es una asíntota vertical. Al sumar $+\\,b$, la hipérbola sube $b$ unidades y la recta $y=b$ pasa a ser la asíntota horizontal. En resumen, $y=\\frac{k}{x-a}+b$: asíntota vertical $x=a$, horizontal $y=b$, Dom $f=\\mathbb{R}-\\{a\\}$. Por ejemplo, $y=\\frac{1}{x-1}+2$: asíntotas $x=1$ e $y=2$. Para dibujarla, traza las asíntotas a trazos y calcula algunos puntos a los dos lados: para $x=2$, $y=3$; para $x=0$, $y=1$.',
            '$y=\\frac{1}{x-1}$ هي $y=\\frac{1}{x}$ نفسها منقولة وحدة إلى اليمين: ينعدم المقام عند $x=1$، إذن Dom $f=\\mathbb{R}-\\{1\\}$ و$x=1$ مقارب رأسي. وبإضافة $+\\,b$ يرتفع القطع $b$ وحدات ويصير المستقيم $y=b$ مقاربًا أفقيًا. باختصار، $y=\\frac{k}{x-a}+b$: المقارب الرأسي $x=a$ والأفقي $y=b$ وDom $f=\\mathbb{R}-\\{a\\}$. مثلًا $y=\\frac{1}{x-1}+2$: المقاربان $x=1$ و$y=2$. للرسم ارسم المقاربين بخط متقطع واحسب بعض النقاط على الجانبين: عند $x=2$ يكون $y=3$ وعند $x=0$ يكون $y=1$.', '$y=\\frac{1}{x-1}$ is the same as $y=\\frac{1}{x}$ moved one unit to the right: the denominator is 0 when $x=1$, so Dom $f=\\mathbb{R}-\\{1\\}$ and $x=1$ is a vertical asymptote. When $+\\,b$ is added, the hyperbola goes up $b$ units and the line $y=b$ becomes the horizontal asymptote. In short, for $y=\\frac{k}{x-a}+b$: vertical asymptote $x=a$, horizontal asymptote $y=b$, Dom $f=\\mathbb{R}-\\{a\\}$. For example, $y=\\frac{1}{x-1}+2$ has asymptotes $x=1$ and $y=2$. To draw it, draw the asymptotes as dashed lines and calculate some points on both sides: for $x=2$, $y=3$; for $x=0$, $y=1$.'
        ),
        problem: say('Zein dira $y=\\frac{3}{x+1}-2$ funtzioaren asintotak?', '¿Cuáles son las asíntotas de $y=\\frac{3}{x+1}-2$?', 'ما مقاربا $y=\\frac{3}{x+1}-2$؟', 'What are the asymptotes of $y=\\frac{3}{x+1}-2$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izendatzailea 0.', 'Denominador 0.', 'المقام 0.', 'Denominator = 0.'), math: same('$x+1=0\\to x=-1$') },
            { text: say('Batutako zenbakia.', 'El número sumado.', 'العدد المضاف.', 'The number that is added.'), math: same('$y=-2$') }
        ],
        example: same('$y=\\dfrac{k}{x-a}+b$'),
        takeaway: say('Asintota bertikala: izendatzailea 0. Horizontala: batzen den zenbakia.', 'Asíntota vertical: el denominador se anula. Horizontal: el número que se suma.', 'المقارب الرأسي: ينعدم المقام. الأفقي: العدد المضاف.', 'Vertical asymptote: the denominator becomes zero. Horizontal: the number that is added.'),
        figure: (language) => <ShiftedHyperbolaFigure language={language} />
    },
    {
        id: 'radical',
        stage: 'inverse',
        title: say('Funtzio erradikalak', 'Funciones radicales', 'الدوال الجذرية', 'Radical functions'),
        goal: say('$y=\\sqrt{x}$ motako funtzioen izate-eremua aurkitzea eta taula batez marraztea.', 'Hallar el dominio de funciones del tipo $y=\\sqrt{x}$ y dibujarlas con una tabla.', 'إيجاد مجال الدوال من نوع $y=\\sqrt{x}$ ورسمها بجدول.', 'Find the domain of functions like $y=\\sqrt{x}$, and draw them using a table.'),
        explanation: say(
            '$y=\\sqrt{x}$ funtzioa $x\\ge 0$ denean bakarrik dago definituta: Dom $f=[0,\\,+\\infty)$. Taula errazena karratu perfektuekin egiten da: $x=0,\\,1,\\,4,\\,9$ balioek $y=0,\\,1,\\,2,\\,3$ ematen dute. Grafikoa jatorritik abiatzen da eta gero eta mantsoago igotzen da. Errokizuna aldatzen bada, izate-eremua ere aldatzen da: $y=\\sqrt{x+3}$ funtzioan $x+3\\ge 0$, beraz Dom $f=[-3,\\,+\\infty)$, eta grafikoa 3 unitate ezkerrera doa. $y=\\sqrt{-x}$ funtzioan $-x\\ge 0$, Dom $f=(-\\infty,\\,0]$. Kanpoan batutako zenbakiak gora edo behera eramaten du: $y=2+\\sqrt{x}$ $(0,\\,2)$ puntutik abiatzen da. $y=-\\sqrt{x}$ beherantz doa.',
            'La función $y=\\sqrt{x}$ solo está definida para $x\\ge 0$: Dom $f=[0,\\,+\\infty)$. La tabla más cómoda se hace con cuadrados perfectos: $x=0,\\,1,\\,4,\\,9$ dan $y=0,\\,1,\\,2,\\,3$. La gráfica sale del origen y sube cada vez más despacio. Si cambia lo de dentro de la raíz, cambia el dominio: en $y=\\sqrt{x+3}$, $x+3\\ge 0$, así que Dom $f=[-3,\\,+\\infty)$, y la gráfica se va 3 unidades a la izquierda. En $y=\\sqrt{-x}$, $-x\\ge 0$, Dom $f=(-\\infty,\\,0]$. Un número sumado fuera la sube o la baja: $y=2+\\sqrt{x}$ sale del punto $(0,\\,2)$. $y=-\\sqrt{x}$ va hacia abajo.',
            'الدالة $y=\\sqrt{x}$ معرفة فقط عندما $x\\ge 0$: Dom $f=[0,\\,+\\infty)$. أسهل جدول يكون بالمربعات الكاملة: $x=0,\\,1,\\,4,\\,9$ تعطي $y=0,\\,1,\\,2,\\,3$. يبدأ البيان من الأصل ويصعد ببطء متزايد. إذا تغير ما تحت الجذر تغير المجال: في $y=\\sqrt{x+3}$ لدينا $x+3\\ge 0$، إذن Dom $f=[-3,\\,+\\infty)$ وينتقل البيان 3 وحدات إلى اليسار. وفي $y=\\sqrt{-x}$ لدينا $-x\\ge 0$ وDom $f=(-\\infty,\\,0]$. والعدد المضاف خارج الجذر يرفعه أو يخفضه: $y=2+\\sqrt{x}$ يبدأ من $(0,\\,2)$. و$y=-\\sqrt{x}$ يتجه إلى الأسفل.', 'The function $y=\\sqrt{x}$ is only defined for $x\\ge 0$: Dom $f=[0,\\,+\\infty)$. The easiest table uses perfect squares: $x=0,\\,1,\\,4,\\,9$ give $y=0,\\,1,\\,2,\\,3$. The graph starts at the origin and rises more and more slowly. If what is inside the root changes, the domain changes: in $y=\\sqrt{x+3}$, $x+3\\ge 0$, so Dom $f=[-3,\\,+\\infty)$, and the graph moves 3 units to the left. In $y=\\sqrt{-x}$, $-x\\ge 0$, so Dom $f=(-\\infty,\\,0]$. A number added outside moves it up or down: $y=2+\\sqrt{x}$ starts at the point $(0,\\,2)$. $y=-\\sqrt{x}$ goes downwards.'
        ),
        problem: say('$y=\\sqrt{x-5}$ funtzioaren izate-eremua $[a,\\,+\\infty)$ da. Zenbat da $a$?', 'El dominio de $y=\\sqrt{x-5}$ es $[a,\\,+\\infty)$. ¿Cuánto vale $a$?', 'مجال $y=\\sqrt{x-5}$ هو $[a,\\,+\\infty)$. كم تساوي $a$؟', 'The domain of $y=\\sqrt{x-5}$ is $[a,\\,+\\infty)$. What is $a$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Errokizuna $\\ge 0$.', 'Lo de dentro $\\ge 0$.', 'ما تحت الجذر $\\ge 0$.', 'What is inside the root $\\ge 0$.'), math: same('$x-5\\ge 0$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حُلّ.', 'Solve.'), math: same('$x\\ge 5\\to a=5$') }
        ],
        example: same('$y=\\sqrt{x+3}$'),
        takeaway: say('Erroaren barrukoa ≥ 0: hortik izate-eremua. Taula: 0, 1, 4, 9.', 'Lo de dentro de la raíz ≥ 0: de ahí el dominio. Tabla: 0, 1, 4, 9.', 'ما تحت الجذر ≥ 0: ومنه المجال. الجدول: 0، 1، 4، 9.', 'What is inside the root ≥ 0: that gives the domain. Table: 0, 1, 4, 9.'),
        figure: (language) => <RootGraphFigure language={language} />
    },

    /* ---------- 5. Exponentials and models ---------- */
    {
        id: 'exponential',
        stage: 'exponential',
        title: say('Funtzio esponentzialak: y = aˣ', 'Funciones exponenciales: y = aˣ', 'الدوال الأسية: y = aˣ', 'Exponential functions: y = aˣ'),
        goal: say('$y=a^x$ funtzioak ezagutzea, balio-taula egitea eta gorakorrak edo beherakorrak diren erabakitzea.', 'Reconocer las funciones $y=a^x$, hacer su tabla de valores y decidir si son crecientes o decrecientes.', 'التعرف على الدوال $y=a^x$ وعمل جدول قيمها وتقرير تزايدها أو تناقصها.', 'Recognise functions $y=a^x$, make their table of values, and decide whether they are increasing or decreasing.'),
        explanation: say(
            'Funtzio esponentzialetan aldagaia berretzailean dago: $y=a^x$, oinarria $a>0$ eta $a\\ne 1$. Taula: $y=2^x$ funtzioan $2^{-2}=\\frac{1}{4}$, $2^{-1}=\\frac{1}{2}$, $2^0=1$, $2^1=2$, $2^2=4$, $2^3=8$. Grafiko guztiak $(0,\\,1)$ puntutik pasatzen dira, $a^0=1$ delako, eta beti X ardatzaren gainetik daude: $y=0$ asintota horizontala da. $a>1$ bada, funtzioa gorakorra da eta oso azkar hazten da; $0<a<1$ bada, beherakorra. $y=\\left(\\frac{1}{3}\\right)^x$ eta $y=3^x$ simetrikoak dira Y ardatzarekiko. Oinarria negatiboa edo 1 ezin da izan: $1^x$ beti da 1.',
            'En las funciones exponenciales la variable está en el exponente: $y=a^x$, con base $a>0$ y $a\\ne 1$. Tabla: en $y=2^x$, $2^{-2}=\\frac{1}{4}$, $2^{-1}=\\frac{1}{2}$, $2^0=1$, $2^1=2$, $2^2=4$, $2^3=8$. Todas las gráficas pasan por $(0,\\,1)$, porque $a^0=1$, y quedan siempre por encima del eje X: $y=0$ es una asíntota horizontal. Si $a>1$ la función es creciente y crece muy deprisa; si $0<a<1$, es decreciente. $y=\\left(\\frac{1}{3}\\right)^x$ e $y=3^x$ son simétricas respecto al eje Y. La base no puede ser negativa ni 1: $1^x$ siempre vale 1.',
            'في الدوال الأسية يكون المتغير في الأس: $y=a^x$ حيث الأساس $a>0$ و$a\\ne 1$. الجدول: في $y=2^x$ لدينا $2^{-2}=\\frac{1}{4}$ و$2^{-1}=\\frac{1}{2}$ و$2^0=1$ و$2^1=2$ و$2^2=4$ و$2^3=8$. تمر كل البيانات بـ $(0,\\,1)$ لأن $a^0=1$، وتبقى دائمًا فوق محور X: $y=0$ مقارب أفقي. إذا كان $a>1$ فالدالة متزايدة وتنمو بسرعة كبيرة، وإذا كان $0<a<1$ فهي متناقصة. $y=\\left(\\frac{1}{3}\\right)^x$ و$y=3^x$ متماثلتان بالنسبة لمحور Y. لا يكون الأساس سالبًا ولا 1: $1^x$ يساوي 1 دائمًا.', 'In exponential functions the variable is in the exponent: $y=a^x$, with base $a>0$ and $a\\ne 1$. Table: for $y=2^x$, $2^{-2}=\\frac{1}{4}$, $2^{-1}=\\frac{1}{2}$, $2^0=1$, $2^1=2$, $2^2=4$, $2^3=8$. All the graphs pass through $(0,\\,1)$, because $a^0=1$, and they always stay above the x-axis: $y=0$ is a horizontal asymptote. If $a>1$ the function is increasing and grows very fast; if $0<a<1$, it is decreasing. $y=\\left(\\frac{1}{3}\\right)^x$ and $y=3^x$ are symmetrical about the y-axis. The base cannot be negative or 1: $1^x$ is always 1.'
        ),
        problem: say('$y=\\left(\\frac{1}{2}\\right)^x$ funtzioan, zenbat da $y$ $x=-3$ denean?', 'En $y=\\left(\\frac{1}{2}\\right)^x$, ¿cuánto vale $y$ para $x=-3$?', 'في $y=\\left(\\frac{1}{2}\\right)^x$ كم تساوي $y$ عند $x=-3$؟', 'In $y=\\left(\\frac{1}{2}\\right)^x$, what is $y$ when $x=-3$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Berretzaile negatiboa: alderantzizkoa.', 'Exponente negativo: el inverso.', 'أس سالب: المقلوب.', 'Negative exponent: the reciprocal.'), math: same('$\\left(\\frac{1}{2}\\right)^{-3}=2^3$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.', 'Calculate.'), math: same('$2^3=8$') }
        ],
        example: same('$y=2^x$'),
        takeaway: say('y = aˣ: beti (0, 1) puntutik. a > 1 gorakorra; 0 < a < 1 beherakorra.', 'y = aˣ: siempre por (0, 1). a > 1 creciente; 0 < a < 1 decreciente.', 'y = aˣ: دائمًا عبر (0, 1). a > 1 متزايدة؛ 0 < a < 1 متناقصة.', 'y = aˣ: always through (0, 1). a > 1 increasing; 0 < a < 1 decreasing.'),
        figure: (language) => <ExponentialFigure language={language} />
    },
    {
        id: 'growth',
        stage: 'exponential',
        title: say('Hazkunde eta beherakada esponentziala', 'Crecimiento y decrecimiento exponencial', 'النمو والتناقص الأسي', 'Exponential growth and decay'),
        goal: say('Ehuneko berean hazten edo txikitzen diren egoerak $y=k\\cdot a^x$ funtzioaz adieraztea.', 'Describir con una función $y=k\\cdot a^x$ las situaciones que crecen o decrecen en el mismo porcentaje.', 'وصف المواقف التي تزيد أو تنقص بالنسبة نفسها بدالة $y=k\\cdot a^x$.', 'Describe, with a function $y=k\\cdot a^x$, situations that grow or decrease by the same percentage.'),
        explanation: say(
            'Magnitude batek urrats bakoitzean ehuneko bera irabazten badu, biderkatzaile berdinaz biderkatzen da: % 8 igotzeak $\\cdot 1{,}08$ esan nahi du. Hasieran $k$ bada, $x$ urratsen ondoren $y=k\\cdot a^x$. Ana-ren soldata: 24 000 €, urtean % 8 gehiago: $s(t)=24\\,000\\cdot 1{,}08^t$. % 20 jaisteak $\\cdot 0{,}8$ esan nahi du: auto baten balioa $y=20\\,000\\cdot 0{,}8^x$. $k$ hasierako balioa da ($x=0$): grafikoak Y ardatza $(0,\\,k)$ puntuan ebakitzen du. Bi punturekin $k$ eta $a$ aurki daitezke: $(0,\\,3)$ eta $(1;\\,3{,}6)$ puntuetatik pasatzen bada, $k=3$ eta $a=\\frac{3{,}6}{3}=1{,}2$.',
            'Si una magnitud gana el mismo porcentaje en cada paso, se multiplica siempre por el mismo factor: subir un 8 % es multiplicar por $1{,}08$. Si al principio vale $k$, tras $x$ pasos vale $y=k\\cdot a^x$. El sueldo de Ana: 24 000 €, un 8 % más cada año: $s(t)=24\\,000\\cdot 1{,}08^t$. Bajar un 20 % es multiplicar por $0{,}8$: el valor de un coche $y=20\\,000\\cdot 0{,}8^x$. $k$ es el valor inicial ($x=0$): la gráfica corta al eje Y en $(0,\\,k)$. Con dos puntos se hallan $k$ y $a$: si pasa por $(0,\\,3)$ y $(1;\\,3{,}6)$, $k=3$ y $a=\\frac{3{,}6}{3}=1{,}2$.',
            'إذا زاد مقدار بالنسبة نفسها في كل خطوة فإنه يُضرب دائمًا في العامل نفسه: الزيادة 8 % تعني الضرب في $1{,}08$. إذا كانت قيمته في البداية $k$ فبعد $x$ خطوة تصبح $y=k\\cdot a^x$. راتب آنا: 24 000 € يزيد 8 % كل سنة: $s(t)=24\\,000\\cdot 1{,}08^t$. النقصان 20 % يعني الضرب في $0{,}8$: قيمة سيارة $y=20\\,000\\cdot 0{,}8^x$. $k$ القيمة الابتدائية ($x=0$): يقطع البيان محور Y في $(0,\\,k)$. وبنقطتين نجد $k$ و$a$: إذا مر بـ $(0,\\,3)$ و$(1;\\,3{,}6)$ فإن $k=3$ و$a=\\frac{3{,}6}{3}=1{,}2$.', 'If a quantity gains the same percentage at each step, it is multiplied by the same factor each time: going up 8% means multiplying by $1{,}08$. If it starts at $k$, after $x$ steps it is $y=k\\cdot a^x$. Ana\'s salary: €24,000, with an 8% rise each year: $s(t)=24\\,000\\cdot 1{,}08^t$. Going down 20% means multiplying by $0{,}8$: the value of a car is $y=20\\,000\\cdot 0{,}8^x$. $k$ is the starting value ($x=0$): the graph crosses the y-axis at $(0,\\,k)$. Using two points, you can find $k$ and $a$: if it passes through $(0,\\,3)$ and $(1;\\,3{,}6)$, then $k=3$ and $a=\\frac{3{,}6}{3}=1{,}2$.'
        ),
        problem: say('500 bakterio daude eta orduro bikoizten dira. Zenbat izango dira 4 ordu barru?', 'Hay 500 bacterias y se duplican cada hora. ¿Cuántas habrá dentro de 4 horas?', 'توجد 500 بكتيريا وتتضاعف كل ساعة. كم ستكون بعد 4 ساعات؟', 'There are 500 bacteria, and they double every hour. How many will there be in 4 hours?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Eredua.', 'El modelo.', 'النموذج.', 'The model.'), math: same('$y=500\\cdot 2^x$') },
            { text: say('Ordeztu $x=4$.', 'Sustituye $x=4$.', 'عوّض $x=4$.', 'Substitute $x=4$.'), math: same('$500\\cdot 16=8000$') }
        ],
        example: same('$y=k\\cdot a^x$'),
        takeaway: say('% p igo: bider (1 + p/100). % p jaitsi: bider (1 − p/100).', 'Subir un p %: por (1 + p/100). Bajar un p %: por (1 − p/100).', 'زيادة p %: الضرب في (1 + p/100). نقصان p %: في (1 − p/100).', 'Going up p%: multiply by (1 + p/100). Going down p%: multiply by (1 − p/100).'),
        figure: (language) => <GrowthFigure language={language} />
    },
    {
        id: 'models',
        stage: 'exponential',
        title: say('Eredu egokia aukeratzea', 'Elegir el modelo adecuado', 'اختيار النموذج المناسب', 'Choose the right model'),
        goal: say('Egoera edo grafiko bat ikusita zein funtzio-mota den erabakitzea eta problemak ebaztea, maximo bat aurkitzea barne.', 'Decidir qué tipo de función describe una situación o una gráfica y resolver problemas, incluido hallar un máximo.', 'تقرير نوع الدالة التي تصف موقفًا أو بيانًا وحل المسائل، بما فيها إيجاد قيمة عظمى.', 'Decide which type of function describes a situation or a graph, and solve problems, including finding a maximum.'),
        explanation: say(
            'Galdetu zeure buruari nola aldatzen den magnitudea. Kopuru bera batzen bada urrats bakoitzean: lineala, $y=mx+n$. Biderkadura konstantea bada: alderantzizkoa, $y=\\frac{k}{x}$. Ehuneko bera biderkatzen bada: esponentziala, $y=k\\cdot a^x$. Azalerak, jaurtiketak eta bi neurriren biderkadurak: koadratikoa, eta haren maximoa edo minimoa erpinean dago. Adibidez, 3 m-ko listoi batekin markoa: oinarria $x$ bada, altuera $1{,}5-x$ da eta azalera $A(x)=x(1{,}5-x)=-x^2+1{,}5x$. $a<0$ denez, maximoa erpinean: $x=\\frac{-1{,}5}{-2}=0{,}75$ m, eta $A=0{,}5625$ m².',
            'Pregúntate cómo cambia la magnitud. Si se suma siempre lo mismo en cada paso: lineal, $y=mx+n$. Si el producto es constante: inversa, $y=\\frac{k}{x}$. Si se multiplica siempre por el mismo porcentaje: exponencial, $y=k\\cdot a^x$. Las áreas, los lanzamientos y los productos de dos medidas: cuadrática, y su máximo o mínimo está en el vértice. Por ejemplo, un marco con un listón de 3 m: si la base es $x$, la altura es $1{,}5-x$ y el área $A(x)=x(1{,}5-x)=-x^2+1{,}5x$. Como $a<0$, el máximo está en el vértice: $x=\\frac{-1{,}5}{-2}=0{,}75$ m, y $A=0{,}5625$ m².',
            'اسأل نفسك كيف يتغير المقدار. إذا أُضيف المقدار نفسه في كل خطوة: خطية $y=mx+n$. إذا كان حاصل الضرب ثابتًا: عكسية $y=\\frac{k}{x}$. إذا ضُرب دائمًا في النسبة نفسها: أسية $y=k\\cdot a^x$. المساحات والمقذوفات وحاصل ضرب قياسين: تربيعية، وقيمتها العظمى أو الصغرى في الرأس. مثلًا إطار من عود طوله 3 م: إذا كانت القاعدة $x$ فالارتفاع $1{,}5-x$ والمساحة $A(x)=x(1{,}5-x)=-x^2+1{,}5x$. وبما أن $a<0$ فالقيمة العظمى في الرأس: $x=\\frac{-1{,}5}{-2}=0{,}75$ م و$A=0{,}5625$ م².', 'Ask yourself how the quantity changes. If you always add the same amount at each step: linear, $y=mx+n$. If the product is constant: inverse, $y=\\frac{k}{x}$. If it always changes by the same percentage: exponential, $y=k\\cdot a^x$. Areas, projectiles and products of two measurements: quadratic, and its maximum or minimum is at the vertex. For example, a frame made from a 3 m strip: if the base is $x$, the height is $1{,}5-x$ and the area is $A(x)=x(1{,}5-x)=-x^2+1{,}5x$. As $a<0$, the maximum is at the vertex: $x=\\frac{-1{,}5}{-2}=0{,}75$ m, and $A=0{,}5625$ m².'
        ),
        problem: say('20 m-ko hesi batekin laukizuzen bat itxi nahi da. Zenbat da azalera handiena?', 'Con 20 m de valla se quiere cerrar un rectángulo. ¿Cuál es el área máxima?', 'نريد إحاطة مستطيل بسياج طوله 20 م. ما أكبر مساحة؟', 'With 20 m of fencing, you want to enclose a rectangle. What is the maximum area?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Oinarria $x$, altuera $10-x$.', 'Base $x$, altura $10-x$.', 'القاعدة $x$ والارتفاع $10-x$.', 'Base $x$, height $10-x$.'), math: same('$A=x(10-x)$') },
            { text: say('Erpina $x=5$ denean.', 'Vértice en $x=5$.', 'الرأس عند $x=5$.', 'Vertex at $x=5$.'), math: same('$5\\cdot 5=25$') }
        ],
        example: same('$A(x)=x(1{,}5-x)$'),
        takeaway: say('Batu: lineala. Biderkadura finkoa: alderantzizkoa. Ehunekoa: esponentziala. Azalera: parabola.', 'Sumar: lineal. Producto fijo: inversa. Porcentaje: exponencial. Área: parábola.', 'جمع: خطية. ضرب ثابت: عكسية. نسبة: أسية. مساحة: قطع مكافئ.', 'Add: linear. Fixed product: inverse. Percentage: exponential. Area: parabola.'),
        figure: (language) => <ModelsFigure language={language} />
    }
]
