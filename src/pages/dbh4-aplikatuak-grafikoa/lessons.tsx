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
    { id: 'linear', tone: 'blue', title: { eu: 'Funtzio linealak', es: 'Funciones lineales', ar: 'الدوال الخطية' } },
    { id: 'lines', tone: 'violet', title: { eu: 'Zuzenaren ekuazioa', es: 'La ecuación de la recta', ar: 'معادلة المستقيم' } },
    { id: 'quadratic', tone: 'mustard', title: { eu: 'Funtzio koadratikoak', es: 'Funciones cuadráticas', ar: 'الدوال التربيعية' } },
    { id: 'inverse', tone: 'coral', title: { eu: 'Alderantzizkoak eta erroak', es: 'Inversas y radicales', ar: 'العكسية والجذرية' } },
    { id: 'exponential', tone: 'green', title: { eu: 'Esponentzialak eta ereduak', es: 'Exponenciales y modelos', ar: 'الأسية والنماذج' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })

export const graphsTopics: UnitTopic[] = [
    /* ---------- 1. Linear functions ---------- */
    {
        id: 'proportional',
        stage: 'linear',
        title: say('Proportzionaltasun zuzeneko funtzioak', 'Funciones de proporcionalidad directa', 'دوال التناسب الطردي'),
        goal: say('$y=mx$ funtzioak ezagutzea, $m$ proportzionaltasun-konstantea (malda) kalkulatzea eta grafikoa marraztea.', 'Reconocer las funciones $y=mx$, calcular la constante de proporcionalidad $m$ (la pendiente) y dibujar la gráfica.', 'التعرف على الدوال $y=mx$ وحساب ثابت التناسب $m$ (الميل) ورسم البيان.'),
        explanation: say(
            'Bi magnitude zuzenki proportzionalak badira, $y=mx$ funtzioaz lotzen dira. $m$ proportzionaltasun-konstantea da, eta $m=\\frac{y}{x}$ zatiketaz kalkulatzen da edozein bikoterekin. Grafikoa jatorritik, $(0,\\,0)$, pasatzen den zuzen bat da, eta $m$ da bere malda: $x$ unitate bat handitzean $y$ zenbat aldatzen den. $m>0$ bada, funtzioa gorakorra da; $m<0$ bada, beherakorra. Ur-botila bakoitzak 1,25 € balio badu, $y=1{,}25x$; 6 botilak $1{,}25\\cdot 6=7{,}5$ €. Marrazteko, nahikoa da jatorria eta beste puntu bat: $x=1$ denean, $y=m$.',
            'Si dos magnitudes son directamente proporcionales, se relacionan con una función $y=mx$. $m$ es la constante de proporcionalidad y se calcula dividiendo $m=\\frac{y}{x}$ con cualquier pareja. La gráfica es una recta que pasa por el origen, $(0,\\,0)$, y $m$ es su pendiente: lo que cambia $y$ cuando $x$ aumenta una unidad. Si $m>0$ la función es creciente; si $m<0$, decreciente. Si cada botella de agua cuesta 1,25 €, $y=1{,}25x$; 6 botellas cuestan $1{,}25\\cdot 6=7{,}5$ €. Para dibujarla basta el origen y otro punto: para $x=1$, $y=m$.',
            'إذا كان مقداران متناسبين طرديًا فإنهما يرتبطان بدالة $y=mx$. و$m$ ثابت التناسب ويُحسب بالقسمة $m=\\frac{y}{x}$ مع أي زوج. البيان مستقيم يمر بنقطة الأصل $(0,\\,0)$، و$m$ ميله: ما يتغير به $y$ عندما يزيد $x$ وحدة واحدة. إذا كان $m>0$ فالدالة متزايدة، وإذا كان $m<0$ فمتناقصة. إذا كان ثمن كل قارورة ماء 1.25 € فإن $y=1{,}25x$؛ و6 قوارير ثمنها $1{,}25\\cdot 6=7{,}5$ €. لرسمها تكفي نقطة الأصل ونقطة أخرى: عند $x=1$ يكون $y=m$.'
        ),
        problem: say('$y=mx$ zuzena $(-5,\\,10)$ puntutik pasatzen da. Zenbat da $m$?', 'La recta $y=mx$ pasa por $(-5,\\,10)$. ¿Cuánto vale $m$?', 'يمر المستقيم $y=mx$ بالنقطة $(-5,\\,10)$. كم تساوي $m$؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu puntua.', 'Sustituye el punto.', 'عوّض النقطة.'), math: same('$10=m\\cdot(-5)$') },
            { text: say('Zatitu. Beherakorra da.', 'Divide. Es decreciente.', 'اقسم. الدالة متناقصة.'), math: same('$m=-2$') }
        ],
        example: same('$y=1{,}25x$'),
        takeaway: say('Proportzionaltasun zuzena: jatorritik pasatzen den zuzena, malda m = y : x.', 'Proporcionalidad directa: recta por el origen, de pendiente m = y : x.', 'التناسب الطردي: مستقيم يمر بالأصل ميله m = y : x.'),
        figure: (language) => <ProportionalFigure language={language} />
    },
    {
        id: 'affine',
        stage: 'linear',
        title: say('Funtzio linealak eta konstanteak', 'Funciones lineales y constantes', 'الدوال الخطية والثابتة'),
        goal: say('$y=mx+n$ funtzioan malda eta jatorriko ordenatua irakurtzea, ardatzekiko ebakidurak kalkulatzea eta grafikoa marraztea.', 'Leer la pendiente y la ordenada en el origen de $y=mx+n$, calcular los cortes con los ejes y dibujar la gráfica.', 'قراءة الميل والجزء المقطوع من $y=mx+n$ وحساب التقاطع مع المحورين ورسم البيان.'),
        explanation: say(
            '$y=mx+n$ funtzio lineal baten grafikoa zuzen bat da. $m$ malda da (aldapa) eta $n$ jatorriko ordenatua: zuzenak Y ardatza $(0,\\,n)$ puntuan ebakitzen du. X ardatza ebakitzeko, $y=0$ egin eta ebatzi: $mx+n=0$. Adibidez, $y=-5x+3$ funtzioak Y ardatza $(0,\\,3)$ puntuan ebakitzen du, eta X ardatza $x=\\frac{3}{5}$ puntuan. $n=0$ bada, proportzionaltasun zuzena da. $m=0$ bada, $y=n$ funtzio konstantea da: zuzen horizontal bat. Marrazteko, kalkulatu bi puntu (adibidez, $x=0$ eta $x=1$ edo $x$-ren beste balio bat) eta lotu.',
            'La gráfica de una función lineal $y=mx+n$ es una recta. $m$ es la pendiente (la inclinación) y $n$ la ordenada en el origen: la recta corta al eje Y en $(0,\\,n)$. Para el corte con el eje X se hace $y=0$ y se resuelve $mx+n=0$. Por ejemplo, $y=-5x+3$ corta al eje Y en $(0,\\,3)$ y al eje X en $x=\\frac{3}{5}$. Si $n=0$ es una proporcionalidad directa. Si $m=0$ es la función constante $y=n$: una recta horizontal. Para dibujarla, calcula dos puntos (por ejemplo, $x=0$ y $x=1$ u otro valor de $x$) y únelos.',
            'بيان الدالة الخطية $y=mx+n$ مستقيم. $m$ الميل (الانحدار) و$n$ الجزء المقطوع من محور الصادات: يقطع المستقيم محور Y في $(0,\\,n)$. ولإيجاد التقاطع مع محور X نضع $y=0$ ونحل $mx+n=0$. مثلًا $y=-5x+3$ يقطع محور Y في $(0,\\,3)$ ومحور X في $x=\\frac{3}{5}$. إذا كان $n=0$ فهو تناسب طردي. وإذا كان $m=0$ فهي الدالة الثابتة $y=n$: مستقيم أفقي. لرسمه احسب نقطتين (مثلًا $x=0$ و$x=1$ أو قيمة أخرى لـ $x$) وصِلهما.'
        ),
        problem: say('Non ebakitzen du $y=2x-6$ zuzenak X ardatza?', '¿Dónde corta la recta $y=2x-6$ al eje X?', 'أين يقطع المستقيم $y=2x-6$ محور X؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Egin $y=0$.', 'Haz $y=0$.', 'ضع $y=0$.'), math: same('$2x-6=0$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حُلّ.'), math: same('$x=3\\to(3,\\,0)$') }
        ],
        example: same('$y=mx+n$'),
        takeaway: say('m: aldapa. n: Y ardatzeko ebakidura. m = 0: zuzen horizontala.', 'm: la inclinación. n: el corte con el eje Y. m = 0: recta horizontal.', 'm: الانحدار. n: التقاطع مع محور Y. m = 0: مستقيم أفقي.'),
        figure: (language) => <AffineFigure language={language} />
    },
    {
        id: 'linear-models',
        stage: 'linear',
        title: say('Eredu linealak', 'Modelos lineales', 'نماذج خطية'),
        goal: say('Egoera erreal bat $y=mx+n$ funtzio batez adieraztea eta datuak kalkulatzeko erabiltzea.', 'Describir una situación real con una función $y=mx+n$ y usarla para calcular datos.', 'وصف موقف واقعي بدالة $y=mx+n$ واستعمالها لحساب المعطيات.'),
        explanation: say(
            'Magnitude bat abiapuntuko balio batetik ($n$) abiatu eta abiadura konstantean ($m$) aldatzen denean, funtzio lineal bat da. Malguki batek 30 cm neurtzen ditu eta kilo bakoitzeko 15 cm luzatzen da: $y=30+15x$. Fahrenheit graduak: $y=32+1{,}8x$, $x$ gradu zentigradutan. Mugikor bat jatorritik 3 m-ra dago eta 2 m/s-ra urruntzen da: $y=3+2x$. Ereduak bi norabidetan erabiltzen dira: $x$ ezagututa, ordeztu eta kalkulatu $y$; $y$ ezagututa, ebatzi lehen mailako ekuazioa. Adibidez, malgukiak 1 m (100 cm) neur dezan: $30+15x=100$, $x\\approx 4{,}67$ kg.',
            'Cuando una magnitud parte de un valor inicial ($n$) y cambia a ritmo constante ($m$), es una función lineal. Un muelle mide 30 cm y se alarga 15 cm por cada kilo: $y=30+15x$. Los grados Fahrenheit: $y=32+1{,}8x$, con $x$ en grados centígrados. Un móvil está a 3 m del origen y se aleja a 2 m/s: $y=3+2x$. El modelo se usa en los dos sentidos: si conoces $x$, sustituye y calcula $y$; si conoces $y$, resuelve una ecuación de primer grado. Por ejemplo, para que el muelle mida 1 m (100 cm): $30+15x=100$, $x\\approx 4{,}67$ kg.',
            'عندما يبدأ مقدار من قيمة ابتدائية ($n$) ويتغير بمعدل ثابت ($m$) فهو دالة خطية. نابض طوله 30 سم ويستطيل 15 سم لكل كيلوغرام: $y=30+15x$. درجات فهرنهايت: $y=32+1{,}8x$ حيث $x$ بالدرجات المئوية. متحرك على بعد 3 م من الأصل ويبتعد بسرعة 2 م/ث: $y=3+2x$. يُستعمل النموذج في الاتجاهين: إذا عرفت $x$ فعوّض واحسب $y$، وإذا عرفت $y$ فحُلّ معادلة من الدرجة الأولى. مثلًا ليصبح طول النابض 1 م (100 سم): $30+15x=100$ و$x\\approx 4{,}67$ كغ.'
        ),
        problem: say('$y=32+1{,}8x$ erabiliz, zenbat °F dira 35 °C?', 'Con $y=32+1{,}8x$, ¿cuántos °F son 35 °C?', 'باستعمال $y=32+1{,}8x$، كم °F تساوي 35 °م؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu $x=35$.', 'Sustituye $x=35$.', 'عوّض $x=35$.'), math: same('$32+1{,}8\\cdot 35$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.'), math: same('$32+63=95$') }
        ],
        example: same('$y=30+15x$'),
        takeaway: say('Hasierako balioa n da; urrats bakoitzeko aldaketa, m.', 'El valor inicial es n; el cambio por cada unidad, m.', 'القيمة الابتدائية n؛ والتغير لكل وحدة m.'),
        figure: (language) => <LinearModelsFigure language={language} />
    },

    /* ---------- 2. The equation of a line ---------- */
    {
        id: 'slope',
        stage: 'lines',
        title: say('Bi punturen arteko malda', 'La pendiente entre dos puntos', 'الميل بين نقطتين'),
        goal: say('Bi puntutatik pasatzen den zuzenaren malda kalkulatzea eta grafiko batean irakurtzea.', 'Calcular la pendiente de la recta que pasa por dos puntos y leerla en una gráfica.', 'حساب ميل المستقيم المار بنقطتين وقراءته في بيان.'),
        explanation: say(
            '$A(x_1,\\,y_1)$ eta $B(x_2,\\,y_2)$ puntuetatik pasatzen den zuzenaren malda da $m=\\frac{y_2-y_1}{x_2-x_1}$: altueraren aldaketa zati aurrerapenaren aldaketa. Ordena berean kendu behar da goian eta behean. Adibidez, $(3,\\,-5)$ eta $(-4,\\,7)$ puntuetatik: $m=\\frac{7-(-5)}{-4-3}=\\frac{12}{-7}=-\\frac{12}{7}$. Grafiko batean, aukeratu zuzeneko bi puntu koadrikulako erpinetan, eta zenbatu zenbat lauki igotzen (edo jaisten) den eta zenbat aurrera egiten den. Puntuek $x$ bera badute, zuzena bertikala da eta ez du maldarik (ez da funtzioa).',
            'La pendiente de la recta que pasa por $A(x_1,\\,y_1)$ y $B(x_2,\\,y_2)$ es $m=\\frac{y_2-y_1}{x_2-x_1}$: lo que cambia la altura dividido entre lo que se avanza. Hay que restar en el mismo orden arriba y abajo. Por ejemplo, por $(3,\\,-5)$ y $(-4,\\,7)$: $m=\\frac{7-(-5)}{-4-3}=\\frac{12}{-7}=-\\frac{12}{7}$. En una gráfica, elige dos puntos de la recta que caigan en los cruces de la cuadrícula y cuenta cuántos cuadros sube (o baja) y cuántos avanza. Si los puntos tienen la misma $x$, la recta es vertical y no tiene pendiente (no es función).',
            'ميل المستقيم المار بـ $A(x_1,\\,y_1)$ و$B(x_2,\\,y_2)$ هو $m=\\frac{y_2-y_1}{x_2-x_1}$: تغير الارتفاع مقسومًا على التقدم. يجب الطرح بالترتيب نفسه في البسط والمقام. مثلًا عبر $(3,\\,-5)$ و$(-4,\\,7)$: $m=\\frac{7-(-5)}{-4-3}=\\frac{12}{-7}=-\\frac{12}{7}$. في البيان اختر نقطتين من المستقيم تقعان على تقاطعات الشبكة، وعُدّ كم مربعًا يصعد (أو ينزل) وكم يتقدم. إذا كان للنقطتين $x$ نفسه فالمستقيم رأسي ولا ميل له (ليس دالة).'
        ),
        problem: say('Kalkulatu $(-2,\\,-4)$ eta $(2,\\,-3)$ puntuetatik pasatzen den zuzenaren malda.', 'Calcula la pendiente de la recta que pasa por $(-2,\\,-4)$ y $(2,\\,-3)$.', 'احسب ميل المستقيم المار بـ $(-2,\\,-4)$ و$(2,\\,-3)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kendu ordena berean.', 'Resta en el mismo orden.', 'اطرح بالترتيب نفسه.'), math: same('$m=\\frac{-3-(-4)}{2-(-2)}$') },
            { text: say('Sinplifikatu.', 'Simplifica.', 'بسّط.'), math: same('$m=\\frac{1}{4}$') }
        ],
        example: same('$m=\\dfrac{y_2-y_1}{x_2-x_1}$'),
        takeaway: say('Malda: zenbat igotzen den zati zenbat aurreratzen den.', 'Pendiente: lo que sube entre lo que avanza.', 'الميل: ما يصعده مقسومًا على ما يتقدمه.'),
        figure: (language) => <SlopeFigure language={language} />
    },
    {
        id: 'line-equation',
        stage: 'lines',
        title: say('Zuzenaren ekuazioa', 'La ecuación de una recta', 'معادلة مستقيم'),
        goal: say('Puntu bat eta malda ezagututa, edo bi puntu ezagututa, zuzenaren ekuazioa idaztea.', 'Escribir la ecuación de una recta conocidos un punto y la pendiente, o dos puntos.', 'كتابة معادلة مستقيم بمعرفة نقطة والميل أو بمعرفة نقطتين.'),
        explanation: say(
            'Malda $m$ eta puntu bat $P(x_0,\\,y_0)$ ezagututa, idatzi $y=mx+n$ eta ordeztu puntua $n$ aurkitzeko: $y_0=m\\,x_0+n$. Adibidez, $m=-2$ eta $P(2,\\,-1)$: $-1=-2\\cdot 2+n$, beraz $n=3$ eta $y=-2x+3$. Gauza bera da puntu-malda ekuazioa erabiltzea: $y-y_0=m(x-x_0)$. Bi puntu ematen badituzte, kalkulatu lehenik malda eta gero jarraitu berdin. $(0,\\,-3)$ eta $(3,\\,0)$ puntuetatik: $m=\\frac{0-(-3)}{3-0}=1$ eta $n=-3$, beraz $y=x-3$. Amaitzeko, egiaztatu bigarren puntua ekuazioan.',
            'Conocida la pendiente $m$ y un punto $P(x_0,\\,y_0)$, escribe $y=mx+n$ y sustituye el punto para hallar $n$: $y_0=m\\,x_0+n$. Por ejemplo, $m=-2$ y $P(2,\\,-1)$: $-1=-2\\cdot 2+n$, así que $n=3$ e $y=-2x+3$. Es lo mismo que usar la ecuación punto-pendiente: $y-y_0=m(x-x_0)$. Si te dan dos puntos, calcula primero la pendiente y sigue igual. Por $(0,\\,-3)$ y $(3,\\,0)$: $m=\\frac{0-(-3)}{3-0}=1$ y $n=-3$, luego $y=x-3$. Al final, comprueba el segundo punto en la ecuación.',
            'بمعرفة الميل $m$ ونقطة $P(x_0,\\,y_0)$ اكتب $y=mx+n$ وعوّض النقطة لإيجاد $n$: $y_0=m\\,x_0+n$. مثلًا $m=-2$ و$P(2,\\,-1)$: $-1=-2\\cdot 2+n$، إذن $n=3$ و$y=-2x+3$. وهذا مثل استعمال معادلة النقطة والميل: $y-y_0=m(x-x_0)$. إذا أُعطيت نقطتين فاحسب الميل أولًا ثم تابع بالطريقة نفسها. عبر $(0,\\,-3)$ و$(3,\\,0)$: $m=\\frac{0-(-3)}{3-0}=1$ و$n=-3$، إذن $y=x-3$. وفي النهاية تحقق من النقطة الثانية في المعادلة.'
        ),
        problem: say('Idatzi $(1,\\,3)$ puntutik pasatzen den eta malda 2 duen zuzenaren ekuazioa.', 'Escribe la ecuación de la recta que pasa por $(1,\\,3)$ con pendiente 2.', 'اكتب معادلة المستقيم المار بـ $(1,\\,3)$ وميله 2.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu puntua.', 'Sustituye el punto.', 'عوّض النقطة.'), math: same('$3=2\\cdot 1+n$') },
            { text: say('Atera $n$.', 'Despeja $n$.', 'استخرج $n$.'), math: same('$n=1\\to y=2x+1$') }
        ],
        example: same('$y-y_0=m(x-x_0)$'),
        takeaway: say('Lehenik malda; gero puntu bat ordeztu n aurkitzeko.', 'Primero la pendiente; después un punto para hallar n.', 'الميل أولًا؛ ثم نقطة لإيجاد n.'),
        figure: (language) => <LineEquationFigure language={language} />
    },
    {
        id: 'parallel',
        stage: 'lines',
        title: say('Zuzen paraleloak eta ebakitzaileak', 'Rectas paralelas y secantes', 'المستقيمات المتوازية والمتقاطعة'),
        goal: say('Bi zuzen paraleloak diren ala ez maldaz jakitzea, paralelo bat idaztea eta bi zuzenen ebaki-puntua aurkitzea.', 'Saber por la pendiente si dos rectas son paralelas, escribir una paralela y hallar el punto de corte de dos rectas.', 'معرفة توازي مستقيمين من الميل، وكتابة مستقيم مواز، وإيجاد نقطة تقاطع مستقيمين.'),
        explanation: say(
            'Bi zuzen paraleloak dira malda bera badute eta jatorriko ordenatua desberdina: $y=2x+1$ eta $y=2x-3$ ez dira inoiz elkartzen. Malda desberdina badute, puntu bakar batean ebakitzen dira. Puntu hori aurkitzeko, berdindu bi adierazpenak: $2x+1=-x+4$ bada, $x=1$ eta $y=3$; ebaki-puntua $(1,\\,3)$ da. Zuzen bati paraleloa den eta puntu batetik pasatzen den zuzena idazteko, hartu haren malda eta ordeztu puntua. Adibidez, $(2,\\,-3)$ puntutik pasatzen den eta $y=-x+5$ zuzenaren paraleloa: $m=-1$, $-3=-2+n$, $n=-1$, beraz $y=-x-1$.',
            'Dos rectas son paralelas si tienen la misma pendiente y distinta ordenada en el origen: $y=2x+1$ e $y=2x-3$ no se encuentran nunca. Si tienen distinta pendiente, se cortan en un solo punto. Para hallarlo, iguala las dos expresiones: si $2x+1=-x+4$, entonces $x=1$ e $y=3$; el punto de corte es $(1,\\,3)$. Para escribir la paralela a una recta que pasa por un punto, toma su pendiente y sustituye el punto. Por ejemplo, la paralela a $y=-x+5$ por $(2,\\,-3)$: $m=-1$, $-3=-2+n$, $n=-1$, luego $y=-x-1$.',
            'يتوازى مستقيمان إذا كان لهما الميل نفسه وجزء مقطوع مختلف: $y=2x+1$ و$y=2x-3$ لا يلتقيان أبدًا. وإذا اختلف ميلاهما فإنهما يتقاطعان في نقطة واحدة. ولإيجادها ساوِ العبارتين: إذا كان $2x+1=-x+4$ فإن $x=1$ و$y=3$؛ ونقطة التقاطع $(1,\\,3)$. ولكتابة المستقيم الموازي لمستقيم والمار بنقطة خذ ميله وعوّض النقطة. مثلًا الموازي لـ $y=-x+5$ عبر $(2,\\,-3)$: $m=-1$ و$-3=-2+n$ و$n=-1$، إذن $y=-x-1$.'
        ),
        problem: say('Non ebakitzen dute $y=3x-1$ eta $y=x+5$ zuzenek? Eman $x$.', '¿Dónde se cortan $y=3x-1$ e $y=x+5$? Da la $x$.', 'أين يتقاطع $y=3x-1$ و$y=x+5$؟ أعطِ $x$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Berdindu.', 'Iguala.', 'ساوِ.'), math: same('$3x-1=x+5$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حُلّ.'), math: same('$2x=6\\to x=3$') }
        ],
        example: same('$m_1=m_2$'),
        takeaway: say('Malda bera: paraleloak. Malda desberdina: puntu batean ebakitzen dira.', 'Misma pendiente: paralelas. Distinta pendiente: se cortan en un punto.', 'الميل نفسه: متوازيان. ميل مختلف: يتقاطعان في نقطة.'),
        figure: (language) => <ParallelFigure language={language} />
    },

    /* ---------- 3. Quadratic functions ---------- */
    {
        id: 'parabola',
        stage: 'quadratic',
        title: say('Parabolak: y = ax²', 'Parábolas: y = ax²', 'القطوع المكافئة: y = ax²'),
        goal: say('$y=ax^2$ parabolaren forma $a$ koefizientearen arabera aurreikustea eta balio-taula batez marraztea.', 'Prever la forma de la parábola $y=ax^2$ según el coeficiente $a$ y dibujarla con una tabla de valores.', 'توقع شكل القطع المكافئ $y=ax^2$ بحسب المعامل $a$ ورسمه بجدول قيم.'),
        explanation: say(
            '$y=ax^2+bx+c$ ($a\\ne 0$) funtzio koadratikoen grafikoa parabola bat da. Errazena $y=x^2$ da: $x$ eta $-x$ balioek irudi bera dute ($(-2)^2=2^2=4$), beraz Y ardatzarekiko simetrikoa da, eta erpina $(0,\\,0)$ puntuan du. $a$ koefizienteak forma erabakitzen du: $a>0$ bada, adarrak gora doaz eta erpina minimoa da; $a<0$ bada, adarrak behera eta erpina maximoa. $|a|$ zenbat eta handiagoa, orduan eta itxiagoa: $y=3x^2$ estuagoa da $y=\\frac{1}{3}x^2$ baino. Taula egiteko, hartu $x=-2,\\,-1,\\,0,\\,1,\\,2$; $y=-3x^2$ funtzioan, $x=2$ denean $y=-12$.',
            'La gráfica de las funciones cuadráticas $y=ax^2+bx+c$ ($a\\ne 0$) es una parábola. La más sencilla es $y=x^2$: $x$ y $-x$ tienen la misma imagen ($(-2)^2=2^2=4$), así que es simétrica respecto al eje Y y tiene el vértice en $(0,\\,0)$. El coeficiente $a$ decide la forma: si $a>0$, las ramas van hacia arriba y el vértice es un mínimo; si $a<0$, hacia abajo y el vértice es un máximo. Cuanto mayor es $|a|$, más cerrada: $y=3x^2$ es más estrecha que $y=\\frac{1}{3}x^2$. Para la tabla, toma $x=-2,\\,-1,\\,0,\\,1,\\,2$; en $y=-3x^2$, para $x=2$ sale $y=-12$.',
            'بيان الدوال التربيعية $y=ax^2+bx+c$ ($a\\ne 0$) قطع مكافئ. أبسطها $y=x^2$: للقيمتين $x$ و$-x$ الصورة نفسها ($(-2)^2=2^2=4$)، فهو متماثل بالنسبة لمحور Y ورأسه في $(0,\\,0)$. المعامل $a$ يحدد الشكل: إذا كان $a>0$ يتجه الفرعان إلى الأعلى والرأس قيمة صغرى، وإذا كان $a<0$ فإلى الأسفل والرأس قيمة عظمى. وكلما كبر $|a|$ ضاق القطع: $y=3x^2$ أضيق من $y=\\frac{1}{3}x^2$. للجدول خذ $x=-2,\\,-1,\\,0,\\,1,\\,2$؛ في $y=-3x^2$ عند $x=2$ نجد $y=-12$.'
        ),
        problem: say('$y=0{,}4x^2$ parabolan, zenbat da $y$ $x=-3$ denean?', 'En la parábola $y=0{,}4x^2$, ¿cuánto vale $y$ para $x=-3$?', 'في القطع $y=0{,}4x^2$ كم تساوي $y$ عند $x=-3$؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Berretura lehenik.', 'Primero la potencia.', 'القوة أولًا.'), math: same('$(-3)^2=9$') },
            { text: say('Biderkatu.', 'Multiplica.', 'اضرب.'), math: same('$0{,}4\\cdot 9=3{,}6$') }
        ],
        example: same('$y=ax^2$'),
        takeaway: say('a positiboa: adarrak gora. a negatiboa: adarrak behera. |a| handia: itxia.', 'a positivo: ramas arriba. a negativo: ramas abajo. |a| grande: cerrada.', 'a موجب: الفرعان للأعلى. a سالب: للأسفل. |a| كبير: ضيق.'),
        figure: (language) => <ParabolaShapesFigure language={language} />
    },
    {
        id: 'vertex',
        stage: 'quadratic',
        title: say('Erpina eta ebaki-puntuak', 'Vértice y puntos de corte', 'الرأس ونقاط التقاطع'),
        goal: say('Parabola baten erpina, simetria-ardatza eta ardatzekiko ebakidurak kalkulatzea, eta haiekin marraztea.', 'Calcular el vértice, el eje de simetría y los cortes con los ejes de una parábola, y dibujarla con ellos.', 'حساب رأس القطع المكافئ ومحور تماثله وتقاطعه مع المحورين ورسمه بها.'),
        explanation: say(
            '$y=ax^2+bx+c$ parabolaren erpinaren abszisa $x_V=\\frac{-b}{2a}$ da, eta ordenatua irudia kalkulatuz lortzen da. $y=x^2-4x+3$ bada: $x_V=\\frac{4}{2}=2$ eta $y_V=4-8+3=-1$, beraz $V(2,\\,-1)$, minimoa ($a>0$). Simetria-ardatza $x=2$ zuzen bertikala da. Y ardatzarekiko ebakidura $(0,\\,c)$ da: hemen $(0,\\,3)$. X ardatzarekikoak ebazteko, $ax^2+bx+c=0$: $x^2-4x+3=0$ ekuazioak $x=1$ eta $x=3$ ematen ditu. Ekuazioak soluziorik ez badu, parabolak ez du X ardatza ebakitzen. Marrazteko: erpina, ebakidurak eta erpinaren bi aldeetako puntu simetriko batzuk.',
            'La abscisa del vértice de la parábola $y=ax^2+bx+c$ es $x_V=\\frac{-b}{2a}$, y la ordenada se obtiene calculando su imagen. Si $y=x^2-4x+3$: $x_V=\\frac{4}{2}=2$ e $y_V=4-8+3=-1$, así que $V(2,\\,-1)$, un mínimo ($a>0$). El eje de simetría es la recta vertical $x=2$. El corte con el eje Y es $(0,\\,c)$: aquí $(0,\\,3)$. Los cortes con el eje X salen de resolver $ax^2+bx+c=0$: $x^2-4x+3=0$ da $x=1$ y $x=3$. Si la ecuación no tiene solución, la parábola no corta al eje X. Para dibujarla: el vértice, los cortes y algunos puntos simétricos a los dos lados del vértice.',
            'فاصلة رأس القطع $y=ax^2+bx+c$ هي $x_V=\\frac{-b}{2a}$، والترتيبة نحصل عليها بحساب صورتها. إذا كان $y=x^2-4x+3$: $x_V=\\frac{4}{2}=2$ و$y_V=4-8+3=-1$، إذن $V(2,\\,-1)$ قيمة صغرى ($a>0$). محور التماثل هو المستقيم الرأسي $x=2$. التقاطع مع محور Y هو $(0,\\,c)$: هنا $(0,\\,3)$. والتقاطعات مع محور X تنتج من حل $ax^2+bx+c=0$: المعادلة $x^2-4x+3=0$ تعطي $x=1$ و$x=3$. إذا لم يكن للمعادلة حل فلا يقطع القطع محور X. للرسم: الرأس والتقاطعات وبعض النقاط المتماثلة على جانبي الرأس.'
        ),
        problem: say('Aurkitu $y=-x^2-2x+4$ parabolaren erpina.', 'Halla el vértice de la parábola $y=-x^2-2x+4$.', 'أوجد رأس القطع $y=-x^2-2x+4$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Abszisa.', 'La abscisa.', 'الفاصلة.'), math: same('$x_V=\\frac{2}{-2}=-1$') },
            { text: say('Ordenatua. Maximoa da.', 'La ordenada. Es un máximo.', 'الترتيبة. إنها قيمة عظمى.'), math: same('$-1+2+4=5$') }
        ],
        example: same('$x_V=\\dfrac{-b}{2a}$'),
        takeaway: say('Erpina: x = −b : 2a. Y ardatza: (0, c). X ardatza: ebatzi y = 0.', 'Vértice: x = −b : 2a. Eje Y: (0, c). Eje X: resuelve y = 0.', 'الرأس: x = −b : 2a. محور Y: (0, c). محور X: حُلّ y = 0.'),
        figure: (language) => <VertexFigure language={language} />
    },
    {
        id: 'shifts',
        stage: 'quadratic',
        title: say('Parabolen lekualdaketak', 'Traslaciones de parábolas', 'انسحاب القطوع المكافئة'),
        goal: say('$y=a(x-p)^2+q$ parabola $y=ax^2$ parabolaren lekualdaketa gisa ikustea eta erpina zuzenean irakurtzea.', 'Ver la parábola $y=a(x-p)^2+q$ como una traslación de $y=ax^2$ y leer el vértice directamente.', 'رؤية القطع $y=a(x-p)^2+q$ انسحابًا للقطع $y=ax^2$ وقراءة الرأس مباشرة.'),
        explanation: say(
            '$y=(x-3)^2$ parabola $y=x^2$ bera da, 3 unitate eskuinera eramanda: lehen $x=0$ denean zegoen balioa orain $x=3$ denean dago. $y=x^2-3$ ere bera da, 3 unitate behera. Oro har, $y=a(x-p)^2+q$ parabolaren erpina $(p,\\,q)$ da, eta forma $y=ax^2$ parabolarena. Kontuz zeinuarekin: $y=(x+2)^2$ ezkerrera doa, $p=-2$ delako. Garatuz gero, adierazpen arrunta lortzen da: $y=(x-1)^2+5=x^2-2x+6$. Eta alderantziz, $y=2(x-2)^2$ funtzioaren erpina $(2,\\,0)$ da: X ardatza puntu bakarrean ukitzen du.',
            '$y=(x-3)^2$ es la misma parábola $y=x^2$ llevada 3 unidades a la derecha: el valor que antes estaba en $x=0$ ahora está en $x=3$. $y=x^2-3$ también es la misma, 3 unidades hacia abajo. En general, la parábola $y=a(x-p)^2+q$ tiene el vértice en $(p,\\,q)$ y la forma de $y=ax^2$. Cuidado con el signo: $y=(x+2)^2$ va hacia la izquierda, porque $p=-2$. Desarrollando se obtiene la expresión habitual: $y=(x-1)^2+5=x^2-2x+6$. Y al revés, el vértice de $y=2(x-2)^2$ es $(2,\\,0)$: toca al eje X en un solo punto.',
            '$y=(x-3)^2$ هو القطع $y=x^2$ نفسه منقولًا 3 وحدات إلى اليمين: القيمة التي كانت عند $x=0$ صارت عند $x=3$. و$y=x^2-3$ هو نفسه أيضًا منقولًا 3 وحدات إلى الأسفل. عمومًا، رأس القطع $y=a(x-p)^2+q$ هو $(p,\\,q)$ وشكله شكل $y=ax^2$. انتبه للإشارة: $y=(x+2)^2$ يتجه إلى اليسار لأن $p=-2$. وبالنشر نحصل على الصيغة المعتادة: $y=(x-1)^2+5=x^2-2x+6$. وبالعكس، رأس $y=2(x-2)^2$ هو $(2,\\,0)$: يمس محور X في نقطة واحدة.'
        ),
        problem: say('Zein da $y=4-(x-2)^2$ parabolaren erpina?', '¿Cuál es el vértice de la parábola $y=4-(x-2)^2$?', 'ما رأس القطع $y=4-(x-2)^2$؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi $a(x-p)^2+q$ eran.', 'Escríbela como $a(x-p)^2+q$.', 'اكتبه بالصورة $a(x-p)^2+q$.'), math: same('$y=-(x-2)^2+4$') },
            { text: say('Irakurri. Maximoa da.', 'Lee. Es un máximo.', 'اقرأ. إنها قيمة عظمى.'), math: same('$V(2,\\,4)$') }
        ],
        example: same('$y=a(x-p)^2+q$'),
        takeaway: say('(x − p)²: p eskuinera. + q: q gora. Erpina (p, q).', '(x − p)²: p a la derecha. + q: q hacia arriba. Vértice (p, q).', '(x − p)²: p إلى اليمين. + q: q إلى الأعلى. الرأس (p, q).'),
        figure: (language) => <ShiftFigure language={language} />
    },

    /* ---------- 4. Inverse proportion and radicals ---------- */
    {
        id: 'inverse',
        stage: 'inverse',
        title: say('Alderantzizko proportzionaltasuna: y = k/x', 'Proporcionalidad inversa: y = k/x', 'التناسب العكسي: y = k/x'),
        goal: say('Alderantziz proportzionalak diren magnitudeak $y=\\frac{k}{x}$ funtzioaz adieraztea eta hiperbola marraztea.', 'Expresar magnitudes inversamente proporcionales con una función $y=\\frac{k}{x}$ y dibujar la hipérbola.', 'التعبير عن مقادير متناسبة عكسيًا بدالة $y=\\frac{k}{x}$ ورسم القطع الزائد.'),
        explanation: say(
            'Bi magnitude alderantziz proportzionalak dira bata bider bi, hiru… egitean bestea bitan, hirutan… zatitzen bada: haien biderkadura konstantea da, $x\\cdot y=k$, eta $y=\\frac{k}{x}$. 48 orduko lana: 2 langilek 24 ordu, 4 langilek 12 ordu; $y=\\frac{48}{x}$. Grafikoa hiperbola bat da, bi adarrekin. $k>0$ bada, adarrak I. eta III. koadranteetan daude eta funtzioa beherakorra da adar bakoitzean; $k<0$ bada, II. eta IV. koadranteetan. Ez du ardatzik ebakitzen: $x=0$ ez dago izate-eremuan (Dom $f=\\mathbb{R}-\\{0\\}$). Ardatzak bere asintotak dira: kurba haietara hurbiltzen da, baina ez ditu inoiz ukitzen.',
            'Dos magnitudes son inversamente proporcionales si al multiplicar una por dos, tres… la otra queda dividida entre dos, tres…: su producto es constante, $x\\cdot y=k$, e $y=\\frac{k}{x}$. Un trabajo de 48 horas: 2 trabajadores tardan 24 horas, 4 trabajadores 12 horas; $y=\\frac{48}{x}$. La gráfica es una hipérbola, con dos ramas. Si $k>0$, las ramas están en los cuadrantes I y III y la función es decreciente en cada rama; si $k<0$, en los cuadrantes II y IV. No corta a los ejes: $x=0$ no está en el dominio (Dom $f=\\mathbb{R}-\\{0\\}$). Los ejes son sus asíntotas: la curva se acerca a ellos pero no los toca nunca.',
            'يكون المقداران متناسبين عكسيًا إذا ضُرب أحدهما في اثنين أو ثلاثة… فقُسم الآخر على اثنين أو ثلاثة…: حاصل ضربهما ثابت $x\\cdot y=k$ و$y=\\frac{k}{x}$. عمل يحتاج 48 ساعة: يستغرق عاملان 24 ساعة و4 عمال 12 ساعة؛ $y=\\frac{48}{x}$. البيان قطع زائد له فرعان. إذا كان $k>0$ فالفرعان في الربعين الأول والثالث والدالة متناقصة في كل فرع؛ وإذا كان $k<0$ ففي الربعين الثاني والرابع. لا يقطع المحورين: $x=0$ ليست في المجال (Dom $f=\\mathbb{R}-\\{0\\}$). المحوران مقاربان له: يقترب المنحنى منهما دون أن يمسهما أبدًا.'
        ),
        problem: say('48 behirentzako pentsuak 15 egun irauten du. Zenbat egun iraungo du 60 behirentzat?', 'El pienso para 48 vacas dura 15 días. ¿Cuántos días dura para 60 vacas?', 'يكفي العلف 48 بقرة مدة 15 يومًا. كم يومًا يكفي 60 بقرة؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Konstantea.', 'La constante.', 'الثابت.'), math: same('$k=48\\cdot 15=720$') },
            { text: say('Zatitu.', 'Divide.', 'اقسم.'), math: same('$y=\\frac{720}{60}=12$') }
        ],
        example: same('$y=\\dfrac{k}{x}$'),
        takeaway: say('Alderantzizkoa: x · y = k. Hiperbola, ardatzak asintota.', 'Inversa: x · y = k. Hipérbola con los ejes como asíntotas.', 'عكسي: x · y = k. قطع زائد مقارباه المحوران.'),
        figure: (language) => <HyperbolaFigure language={language} />
    },
    {
        id: 'asymptotes',
        stage: 'inverse',
        title: say('Hiperbolak eta asintotak', 'Hipérbolas y asíntotas', 'القطوع الزائدة والمقاربات'),
        goal: say('$y=\\frac{k}{x-a}+b$ funtzioaren asintotak eta izate-eremua aurkitzea eta $y=\\frac{k}{x}$ hiperbolaren lekualdaketa gisa marraztea.', 'Hallar las asíntotas y el dominio de $y=\\frac{k}{x-a}+b$ y dibujarla como traslación de $y=\\frac{k}{x}$.', 'إيجاد مقاربات $y=\\frac{k}{x-a}+b$ ومجالها ورسمها انسحابًا للقطع $y=\\frac{k}{x}$.'),
        explanation: say(
            '$y=\\frac{1}{x-1}$ funtzioa $y=\\frac{1}{x}$ bera da, unitate bat eskuinera: izendatzailea $x=1$ denean da 0, beraz Dom $f=\\mathbb{R}-\\{1\\}$ eta $x=1$ asintota bertikala da. $+\\,b$ batuz gero, hiperbola $b$ unitate igotzen da eta $y=b$ asintota horizontala bihurtzen da. Laburbilduz, $y=\\frac{k}{x-a}+b$: asintota bertikala $x=a$, horizontala $y=b$, Dom $f=\\mathbb{R}-\\{a\\}$. Adibidez, $y=\\frac{1}{x-1}+2$: asintotak $x=1$ eta $y=2$. Marrazteko, trazatu asintotak marra etenez eta kalkulatu puntu batzuk bi aldeetan: $x=2$ denean $y=3$, $x=0$ denean $y=1$.',
            '$y=\\frac{1}{x-1}$ es la misma $y=\\frac{1}{x}$ una unidad a la derecha: el denominador vale 0 cuando $x=1$, así que Dom $f=\\mathbb{R}-\\{1\\}$ y $x=1$ es una asíntota vertical. Al sumar $+\\,b$, la hipérbola sube $b$ unidades y la recta $y=b$ pasa a ser la asíntota horizontal. En resumen, $y=\\frac{k}{x-a}+b$: asíntota vertical $x=a$, horizontal $y=b$, Dom $f=\\mathbb{R}-\\{a\\}$. Por ejemplo, $y=\\frac{1}{x-1}+2$: asíntotas $x=1$ e $y=2$. Para dibujarla, traza las asíntotas a trazos y calcula algunos puntos a los dos lados: para $x=2$, $y=3$; para $x=0$, $y=1$.',
            '$y=\\frac{1}{x-1}$ هي $y=\\frac{1}{x}$ نفسها منقولة وحدة إلى اليمين: ينعدم المقام عند $x=1$، إذن Dom $f=\\mathbb{R}-\\{1\\}$ و$x=1$ مقارب رأسي. وبإضافة $+\\,b$ يرتفع القطع $b$ وحدات ويصير المستقيم $y=b$ مقاربًا أفقيًا. باختصار، $y=\\frac{k}{x-a}+b$: المقارب الرأسي $x=a$ والأفقي $y=b$ وDom $f=\\mathbb{R}-\\{a\\}$. مثلًا $y=\\frac{1}{x-1}+2$: المقاربان $x=1$ و$y=2$. للرسم ارسم المقاربين بخط متقطع واحسب بعض النقاط على الجانبين: عند $x=2$ يكون $y=3$ وعند $x=0$ يكون $y=1$.'
        ),
        problem: say('Zein dira $y=\\frac{3}{x+1}-2$ funtzioaren asintotak?', '¿Cuáles son las asíntotas de $y=\\frac{3}{x+1}-2$?', 'ما مقاربا $y=\\frac{3}{x+1}-2$؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izendatzailea 0.', 'Denominador 0.', 'المقام 0.'), math: same('$x+1=0\\to x=-1$') },
            { text: say('Batutako zenbakia.', 'El número sumado.', 'العدد المضاف.'), math: same('$y=-2$') }
        ],
        example: same('$y=\\dfrac{k}{x-a}+b$'),
        takeaway: say('Asintota bertikala: izendatzailea 0. Horizontala: batzen den zenbakia.', 'Asíntota vertical: el denominador se anula. Horizontal: el número que se suma.', 'المقارب الرأسي: ينعدم المقام. الأفقي: العدد المضاف.'),
        figure: (language) => <ShiftedHyperbolaFigure language={language} />
    },
    {
        id: 'radical',
        stage: 'inverse',
        title: say('Funtzio erradikalak', 'Funciones radicales', 'الدوال الجذرية'),
        goal: say('$y=\\sqrt{x}$ motako funtzioen izate-eremua aurkitzea eta taula batez marraztea.', 'Hallar el dominio de funciones del tipo $y=\\sqrt{x}$ y dibujarlas con una tabla.', 'إيجاد مجال الدوال من نوع $y=\\sqrt{x}$ ورسمها بجدول.'),
        explanation: say(
            '$y=\\sqrt{x}$ funtzioa $x\\ge 0$ denean bakarrik dago definituta: Dom $f=[0,\\,+\\infty)$. Taula errazena karratu perfektuekin egiten da: $x=0,\\,1,\\,4,\\,9$ balioek $y=0,\\,1,\\,2,\\,3$ ematen dute. Grafikoa jatorritik abiatzen da eta gero eta mantsoago igotzen da. Errokizuna aldatzen bada, izate-eremua ere aldatzen da: $y=\\sqrt{x+3}$ funtzioan $x+3\\ge 0$, beraz Dom $f=[-3,\\,+\\infty)$, eta grafikoa 3 unitate ezkerrera doa. $y=\\sqrt{-x}$ funtzioan $-x\\ge 0$, Dom $f=(-\\infty,\\,0]$. Kanpoan batutako zenbakiak gora edo behera eramaten du: $y=2+\\sqrt{x}$ $(0,\\,2)$ puntutik abiatzen da. $y=-\\sqrt{x}$ beherantz doa.',
            'La función $y=\\sqrt{x}$ solo está definida para $x\\ge 0$: Dom $f=[0,\\,+\\infty)$. La tabla más cómoda se hace con cuadrados perfectos: $x=0,\\,1,\\,4,\\,9$ dan $y=0,\\,1,\\,2,\\,3$. La gráfica sale del origen y sube cada vez más despacio. Si cambia lo de dentro de la raíz, cambia el dominio: en $y=\\sqrt{x+3}$, $x+3\\ge 0$, así que Dom $f=[-3,\\,+\\infty)$, y la gráfica se va 3 unidades a la izquierda. En $y=\\sqrt{-x}$, $-x\\ge 0$, Dom $f=(-\\infty,\\,0]$. Un número sumado fuera la sube o la baja: $y=2+\\sqrt{x}$ sale del punto $(0,\\,2)$. $y=-\\sqrt{x}$ va hacia abajo.',
            'الدالة $y=\\sqrt{x}$ معرفة فقط عندما $x\\ge 0$: Dom $f=[0,\\,+\\infty)$. أسهل جدول يكون بالمربعات الكاملة: $x=0,\\,1,\\,4,\\,9$ تعطي $y=0,\\,1,\\,2,\\,3$. يبدأ البيان من الأصل ويصعد ببطء متزايد. إذا تغير ما تحت الجذر تغير المجال: في $y=\\sqrt{x+3}$ لدينا $x+3\\ge 0$، إذن Dom $f=[-3,\\,+\\infty)$ وينتقل البيان 3 وحدات إلى اليسار. وفي $y=\\sqrt{-x}$ لدينا $-x\\ge 0$ وDom $f=(-\\infty,\\,0]$. والعدد المضاف خارج الجذر يرفعه أو يخفضه: $y=2+\\sqrt{x}$ يبدأ من $(0,\\,2)$. و$y=-\\sqrt{x}$ يتجه إلى الأسفل.'
        ),
        problem: say('$y=\\sqrt{x-5}$ funtzioaren izate-eremua $[a,\\,+\\infty)$ da. Zenbat da $a$?', 'El dominio de $y=\\sqrt{x-5}$ es $[a,\\,+\\infty)$. ¿Cuánto vale $a$?', 'مجال $y=\\sqrt{x-5}$ هو $[a,\\,+\\infty)$. كم تساوي $a$؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Errokizuna $\\ge 0$.', 'Lo de dentro $\\ge 0$.', 'ما تحت الجذر $\\ge 0$.'), math: same('$x-5\\ge 0$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حُلّ.'), math: same('$x\\ge 5\\to a=5$') }
        ],
        example: same('$y=\\sqrt{x+3}$'),
        takeaway: say('Erroaren barrukoa ≥ 0: hortik izate-eremua. Taula: 0, 1, 4, 9.', 'Lo de dentro de la raíz ≥ 0: de ahí el dominio. Tabla: 0, 1, 4, 9.', 'ما تحت الجذر ≥ 0: ومنه المجال. الجدول: 0، 1، 4، 9.'),
        figure: (language) => <RootGraphFigure language={language} />
    },

    /* ---------- 5. Exponentials and models ---------- */
    {
        id: 'exponential',
        stage: 'exponential',
        title: say('Funtzio esponentzialak: y = aˣ', 'Funciones exponenciales: y = aˣ', 'الدوال الأسية: y = aˣ'),
        goal: say('$y=a^x$ funtzioak ezagutzea, balio-taula egitea eta gorakorrak edo beherakorrak diren erabakitzea.', 'Reconocer las funciones $y=a^x$, hacer su tabla de valores y decidir si son crecientes o decrecientes.', 'التعرف على الدوال $y=a^x$ وعمل جدول قيمها وتقرير تزايدها أو تناقصها.'),
        explanation: say(
            'Funtzio esponentzialetan aldagaia berretzailean dago: $y=a^x$, oinarria $a>0$ eta $a\\ne 1$. Taula: $y=2^x$ funtzioan $2^{-2}=\\frac{1}{4}$, $2^{-1}=\\frac{1}{2}$, $2^0=1$, $2^1=2$, $2^2=4$, $2^3=8$. Grafiko guztiak $(0,\\,1)$ puntutik pasatzen dira, $a^0=1$ delako, eta beti X ardatzaren gainetik daude: $y=0$ asintota horizontala da. $a>1$ bada, funtzioa gorakorra da eta oso azkar hazten da; $0<a<1$ bada, beherakorra. $y=\\left(\\frac{1}{3}\\right)^x$ eta $y=3^x$ simetrikoak dira Y ardatzarekiko. Oinarria negatiboa edo 1 ezin da izan: $1^x$ beti da 1.',
            'En las funciones exponenciales la variable está en el exponente: $y=a^x$, con base $a>0$ y $a\\ne 1$. Tabla: en $y=2^x$, $2^{-2}=\\frac{1}{4}$, $2^{-1}=\\frac{1}{2}$, $2^0=1$, $2^1=2$, $2^2=4$, $2^3=8$. Todas las gráficas pasan por $(0,\\,1)$, porque $a^0=1$, y quedan siempre por encima del eje X: $y=0$ es una asíntota horizontal. Si $a>1$ la función es creciente y crece muy deprisa; si $0<a<1$, es decreciente. $y=\\left(\\frac{1}{3}\\right)^x$ e $y=3^x$ son simétricas respecto al eje Y. La base no puede ser negativa ni 1: $1^x$ siempre vale 1.',
            'في الدوال الأسية يكون المتغير في الأس: $y=a^x$ حيث الأساس $a>0$ و$a\\ne 1$. الجدول: في $y=2^x$ لدينا $2^{-2}=\\frac{1}{4}$ و$2^{-1}=\\frac{1}{2}$ و$2^0=1$ و$2^1=2$ و$2^2=4$ و$2^3=8$. تمر كل البيانات بـ $(0,\\,1)$ لأن $a^0=1$، وتبقى دائمًا فوق محور X: $y=0$ مقارب أفقي. إذا كان $a>1$ فالدالة متزايدة وتنمو بسرعة كبيرة، وإذا كان $0<a<1$ فهي متناقصة. $y=\\left(\\frac{1}{3}\\right)^x$ و$y=3^x$ متماثلتان بالنسبة لمحور Y. لا يكون الأساس سالبًا ولا 1: $1^x$ يساوي 1 دائمًا.'
        ),
        problem: say('$y=\\left(\\frac{1}{2}\\right)^x$ funtzioan, zenbat da $y$ $x=-3$ denean?', 'En $y=\\left(\\frac{1}{2}\\right)^x$, ¿cuánto vale $y$ para $x=-3$?', 'في $y=\\left(\\frac{1}{2}\\right)^x$ كم تساوي $y$ عند $x=-3$؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Berretzaile negatiboa: alderantzizkoa.', 'Exponente negativo: el inverso.', 'أس سالب: المقلوب.'), math: same('$\\left(\\frac{1}{2}\\right)^{-3}=2^3$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.'), math: same('$2^3=8$') }
        ],
        example: same('$y=2^x$'),
        takeaway: say('y = aˣ: beti (0, 1) puntutik. a > 1 gorakorra; 0 < a < 1 beherakorra.', 'y = aˣ: siempre por (0, 1). a > 1 creciente; 0 < a < 1 decreciente.', 'y = aˣ: دائمًا عبر (0, 1). a > 1 متزايدة؛ 0 < a < 1 متناقصة.'),
        figure: (language) => <ExponentialFigure language={language} />
    },
    {
        id: 'growth',
        stage: 'exponential',
        title: say('Hazkunde eta beherakada esponentziala', 'Crecimiento y decrecimiento exponencial', 'النمو والتناقص الأسي'),
        goal: say('Ehuneko berean hazten edo txikitzen diren egoerak $y=k\\cdot a^x$ funtzioaz adieraztea.', 'Describir con una función $y=k\\cdot a^x$ las situaciones que crecen o decrecen en el mismo porcentaje.', 'وصف المواقف التي تزيد أو تنقص بالنسبة نفسها بدالة $y=k\\cdot a^x$.'),
        explanation: say(
            'Magnitude batek urrats bakoitzean ehuneko bera irabazten badu, biderkatzaile berdinaz biderkatzen da: % 8 igotzeak $\\cdot 1{,}08$ esan nahi du. Hasieran $k$ bada, $x$ urratsen ondoren $y=k\\cdot a^x$. Ana-ren soldata: 24 000 €, urtean % 8 gehiago: $s(t)=24\\,000\\cdot 1{,}08^t$. % 20 jaisteak $\\cdot 0{,}8$ esan nahi du: auto baten balioa $y=20\\,000\\cdot 0{,}8^x$. $k$ hasierako balioa da ($x=0$): grafikoak Y ardatza $(0,\\,k)$ puntuan ebakitzen du. Bi punturekin $k$ eta $a$ aurki daitezke: $(0,\\,3)$ eta $(1;\\,3{,}6)$ puntuetatik pasatzen bada, $k=3$ eta $a=\\frac{3{,}6}{3}=1{,}2$.',
            'Si una magnitud gana el mismo porcentaje en cada paso, se multiplica siempre por el mismo factor: subir un 8 % es multiplicar por $1{,}08$. Si al principio vale $k$, tras $x$ pasos vale $y=k\\cdot a^x$. El sueldo de Ana: 24 000 €, un 8 % más cada año: $s(t)=24\\,000\\cdot 1{,}08^t$. Bajar un 20 % es multiplicar por $0{,}8$: el valor de un coche $y=20\\,000\\cdot 0{,}8^x$. $k$ es el valor inicial ($x=0$): la gráfica corta al eje Y en $(0,\\,k)$. Con dos puntos se hallan $k$ y $a$: si pasa por $(0,\\,3)$ y $(1;\\,3{,}6)$, $k=3$ y $a=\\frac{3{,}6}{3}=1{,}2$.',
            'إذا زاد مقدار بالنسبة نفسها في كل خطوة فإنه يُضرب دائمًا في العامل نفسه: الزيادة 8 % تعني الضرب في $1{,}08$. إذا كانت قيمته في البداية $k$ فبعد $x$ خطوة تصبح $y=k\\cdot a^x$. راتب آنا: 24 000 € يزيد 8 % كل سنة: $s(t)=24\\,000\\cdot 1{,}08^t$. النقصان 20 % يعني الضرب في $0{,}8$: قيمة سيارة $y=20\\,000\\cdot 0{,}8^x$. $k$ القيمة الابتدائية ($x=0$): يقطع البيان محور Y في $(0,\\,k)$. وبنقطتين نجد $k$ و$a$: إذا مر بـ $(0,\\,3)$ و$(1;\\,3{,}6)$ فإن $k=3$ و$a=\\frac{3{,}6}{3}=1{,}2$.'
        ),
        problem: say('500 bakterio daude eta orduro bikoizten dira. Zenbat izango dira 4 ordu barru?', 'Hay 500 bacterias y se duplican cada hora. ¿Cuántas habrá dentro de 4 horas?', 'توجد 500 بكتيريا وتتضاعف كل ساعة. كم ستكون بعد 4 ساعات؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Eredua.', 'El modelo.', 'النموذج.'), math: same('$y=500\\cdot 2^x$') },
            { text: say('Ordeztu $x=4$.', 'Sustituye $x=4$.', 'عوّض $x=4$.'), math: same('$500\\cdot 16=8000$') }
        ],
        example: same('$y=k\\cdot a^x$'),
        takeaway: say('% p igo: bider (1 + p/100). % p jaitsi: bider (1 − p/100).', 'Subir un p %: por (1 + p/100). Bajar un p %: por (1 − p/100).', 'زيادة p %: الضرب في (1 + p/100). نقصان p %: في (1 − p/100).'),
        figure: (language) => <GrowthFigure language={language} />
    },
    {
        id: 'models',
        stage: 'exponential',
        title: say('Eredu egokia aukeratzea', 'Elegir el modelo adecuado', 'اختيار النموذج المناسب'),
        goal: say('Egoera edo grafiko bat ikusita zein funtzio-mota den erabakitzea eta problemak ebaztea, maximo bat aurkitzea barne.', 'Decidir qué tipo de función describe una situación o una gráfica y resolver problemas, incluido hallar un máximo.', 'تقرير نوع الدالة التي تصف موقفًا أو بيانًا وحل المسائل، بما فيها إيجاد قيمة عظمى.'),
        explanation: say(
            'Galdetu zeure buruari nola aldatzen den magnitudea. Kopuru bera batzen bada urrats bakoitzean: lineala, $y=mx+n$. Biderkadura konstantea bada: alderantzizkoa, $y=\\frac{k}{x}$. Ehuneko bera biderkatzen bada: esponentziala, $y=k\\cdot a^x$. Azalerak, jaurtiketak eta bi neurriren biderkadurak: koadratikoa, eta haren maximoa edo minimoa erpinean dago. Adibidez, 3 m-ko listoi batekin markoa: oinarria $x$ bada, altuera $1{,}5-x$ da eta azalera $A(x)=x(1{,}5-x)=-x^2+1{,}5x$. $a<0$ denez, maximoa erpinean: $x=\\frac{-1{,}5}{-2}=0{,}75$ m, eta $A=0{,}5625$ m².',
            'Pregúntate cómo cambia la magnitud. Si se suma siempre lo mismo en cada paso: lineal, $y=mx+n$. Si el producto es constante: inversa, $y=\\frac{k}{x}$. Si se multiplica siempre por el mismo porcentaje: exponencial, $y=k\\cdot a^x$. Las áreas, los lanzamientos y los productos de dos medidas: cuadrática, y su máximo o mínimo está en el vértice. Por ejemplo, un marco con un listón de 3 m: si la base es $x$, la altura es $1{,}5-x$ y el área $A(x)=x(1{,}5-x)=-x^2+1{,}5x$. Como $a<0$, el máximo está en el vértice: $x=\\frac{-1{,}5}{-2}=0{,}75$ m, y $A=0{,}5625$ m².',
            'اسأل نفسك كيف يتغير المقدار. إذا أُضيف المقدار نفسه في كل خطوة: خطية $y=mx+n$. إذا كان حاصل الضرب ثابتًا: عكسية $y=\\frac{k}{x}$. إذا ضُرب دائمًا في النسبة نفسها: أسية $y=k\\cdot a^x$. المساحات والمقذوفات وحاصل ضرب قياسين: تربيعية، وقيمتها العظمى أو الصغرى في الرأس. مثلًا إطار من عود طوله 3 م: إذا كانت القاعدة $x$ فالارتفاع $1{,}5-x$ والمساحة $A(x)=x(1{,}5-x)=-x^2+1{,}5x$. وبما أن $a<0$ فالقيمة العظمى في الرأس: $x=\\frac{-1{,}5}{-2}=0{,}75$ م و$A=0{,}5625$ م².'
        ),
        problem: say('20 m-ko hesi batekin laukizuzen bat itxi nahi da. Zenbat da azalera handiena?', 'Con 20 m de valla se quiere cerrar un rectángulo. ¿Cuál es el área máxima?', 'نريد إحاطة مستطيل بسياج طوله 20 م. ما أكبر مساحة؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Oinarria $x$, altuera $10-x$.', 'Base $x$, altura $10-x$.', 'القاعدة $x$ والارتفاع $10-x$.'), math: same('$A=x(10-x)$') },
            { text: say('Erpina $x=5$ denean.', 'Vértice en $x=5$.', 'الرأس عند $x=5$.'), math: same('$5\\cdot 5=25$') }
        ],
        example: same('$A(x)=x(1{,}5-x)$'),
        takeaway: say('Batu: lineala. Biderkadura finkoa: alderantzizkoa. Ehunekoa: esponentziala. Azalera: parabola.', 'Sumar: lineal. Producto fijo: inversa. Porcentaje: exponencial. Área: parábola.', 'جمع: خطية. ضرب ثابت: عكسية. نسبة: أسية. مساحة: قطع مكافئ.'),
        figure: (language) => <ModelsFigure language={language} />
    }
]
