import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { GraphsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Funtzio baten grafikoa · 4. DBH aplikatuak — what each lesson tells: the
   new words (definitions), a short explanation, its cases and the example
   as an exercise («Another example»), with the key words in four languages
   and, in three lessons, «Why does it work?». Plain data so the tests can
   import it; lessons.tsx merges it into the topics. The cases keep what the
   drawings show: y = 2x, y = 2x − 1, the spring, A(1, 2) and B(4, 8), the
   parallels y = 2x + 1 and y = 2x − 3, y = x² − 4x + 3, y = (x − 3)²,
   y = 4/x, y = 1/(x − 2) + 1, y = √(x + 3), y = 2ˣ and y = 3 · 1,2ˣ. The
   line of «The equation of a line» is the answer of its «Let's solve», so
   that drawing waits after the steps.
   ========================================================================== */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

export const graphsLessonTexts: Record<GraphsTopicId, LessonTexts> = {
    /* ---------- 1. Linear functions ---------- */
    proportional: {
        vocabulary: [
            say('malda', 'pendiente', 'الميل', 'slope'),
            say('jatorria', 'origen', 'الأصل', 'origin'),
            say('proportzionaltasun-konstantea', 'constante de proporcionalidad', 'ثابت التناسب', 'constant of proportionality')
        ],
        explanation: say(
            'Bi magnitude zuzenki proportzionalak badira, $y=mx$, eta $m=\\frac{y}{x}$ edozein bikoterekin. Grafikoa jatorritik pasatzen den zuzen bat da, eta $m$ haren malda: $x$ unitate bat handitzean $y$ zenbat aldatzen den. $m>0$ bada, gorakorra da; $m<0$ bada, beherakorra.',
            'Si dos magnitudes son directamente proporcionales, $y=mx$, con $m=\\frac{y}{x}$ para cualquier pareja. La gráfica es una recta que pasa por el origen, y $m$ es su pendiente: lo que cambia $y$ cuando $x$ aumenta 1. Si $m>0$, crece; si $m<0$, decrece.',
            'إذا كان مقداران متناسبين طرديًا فإن $y=mx$، مع $m=\\frac{y}{x}$ لأي زوج. والرسم مستقيم يمر بالأصل، و$m$ ميله: مقدار تغير $y$ حين تزيد $x$ بواحد. إذا كان $m>0$ فهو متزايد، وإذا كان $m<0$ فمتناقص.',
            'If two quantities are directly proportional, $y=mx$, with $m=\\frac{y}{x}$ for any pair. The graph is a straight line through the origin, and $m$ is its slope: how much $y$ changes when $x$ goes up by 1. If $m>0$, it increases; if $m<0$, it decreases.'
        ),
        cases: [
            { title: say('Marrazkikoa', 'La del dibujo', 'مستقيم الرسم', 'The one in the drawing'), text: say('Jatorria eta beste puntu bat nahikoak dira: $(1,\\,2)$.', 'Basta el origen y otro punto: $(1,\\,2)$.', 'يكفي الأصل ونقطة أخرى: $(1,\\,2)$.', 'The origin and one more point are enough: $(1,\\,2)$.'), math: same('$y=2x$') },
            { title: say('Botilak', 'Botellas', 'زجاجات', 'Bottles'), text: say('Botila bakoitzak $1{,}25$ € balio badu, 6 botilak:', 'Si cada botella cuesta $1{,}25$ €, 6 botellas:', 'إذا كان ثمن الزجاجة $1{,}25$ € فثمن 6 زجاجات:', 'If each bottle costs €$1{,}25$, 6 bottles:'), math: same('$y=1{,}25x\\qquad 1{,}25\\cdot 6=7{,}5$') }
        ],
        examplePrompt: say('Auto batek 6 litro gastatzen ditu 100 km-ko. Idatzi funtzioa eta 250 km-ko gastua.', 'Un coche gasta 6 litros cada 100 km. Escribe la función y el gasto en 250 km.', 'تستهلك سيارة 6 لترات لكل 100 كم. اكتب الدالة والاستهلاك في 250 كم.', 'A car uses 6 litres every 100 km. Write the function and the fuel used in 250 km.'),
        example: same('$\\begin{gathered}y=0{,}06x\\\\ 0{,}06\\cdot 250=15\\end{gathered}$'),
        exampleAnswer: say('15 litro: $m=\\frac{6}{100}=0{,}06$.', '15 litros: $m=\\frac{6}{100}=0{,}06$.', '15 لترًا: $m=\\frac{6}{100}=0{,}06$.', '15 litres: $m=\\frac{6}{100}=0{,}06$.')
    },
    affine: {
        definitions: [
            {
                term: say('Jatorriko ordenatua', 'Ordenada en el origen', 'الجزء المقطوع من محور الصادات', 'Y-intercept'),
                meaning: say('$n$ zenbakia, $y=mx+n$ ekuazioan: zuzenak Y ardatza $(0,\\,n)$ puntuan mozten du.', 'El número $n$ de $y=mx+n$: la recta corta al eje Y en $(0,\\,n)$.', 'العدد $n$ في $y=mx+n$: يقطع المستقيم محور Y في $(0,\\,n)$.', 'The number $n$ in $y=mx+n$: the line crosses the Y axis at $(0,\\,n)$.')
            }
        ],
        vocabulary: [
            say('aldapa', 'inclinación', 'الانحدار', 'steepness'),
            say('zuzen horizontala', 'recta horizontal', 'مستقيم أفقي', 'horizontal line'),
            say('ardatza', 'eje', 'محور', 'axis')
        ],
        explanation: say(
            '$y=mx+n$ funtzioaren grafikoa zuzen bat da: $m$ malda da (aldapa). X ardatzarekiko ebaki-puntua $mx+n=0$ ebatziz aurkitzen da. $n=0$ bada, proportzionaltasuna da; $m=0$ bada, $y=n$ funtzio konstantea, zuzen horizontal bat. Marrazteko bi puntu nahikoak dira.',
            'La gráfica de $y=mx+n$ es una recta: $m$ es la pendiente (la inclinación). El corte con el eje X sale de resolver $mx+n=0$. Si $n=0$, es una proporcionalidad; si $m=0$, la función constante $y=n$, una recta horizontal. Para dibujarla bastan dos puntos.',
            'رسم $y=mx+n$ مستقيم: $m$ هو الميل (الانحدار). ونجد التقاطع مع محور X بحل $mx+n=0$. إذا كان $n=0$ فهو تناسب، وإذا كان $m=0$ فهو الدالة الثابتة $y=n$، أي مستقيم أفقي. ويكفي لرسمه نقطتان.',
            'The graph of $y=mx+n$ is a straight line: $m$ is the slope (the steepness). The X intercept comes from solving $mx+n=0$. If $n=0$, it is a proportion; if $m=0$, the constant function $y=n$, a horizontal line. Two points are enough to draw it.'
        ),
        cases: [
            { title: say('Marrazkikoak', 'Las del dibujo', 'مستقيما الرسم', 'The ones in the drawing'), text: say('$y=2x-1$ zuzena $y=2x$ bera da, unitate bat beherago: malda bera.', '$y=2x-1$ es $y=2x$ bajada 1: la misma pendiente.', '$y=2x-1$ هو $y=2x$ منخفضًا بواحد: الميل نفسه.', '$y=2x-1$ is $y=2x$ moved down 1: the same slope.') },
            { title: say('Konstantea', 'Constante', 'ثابتة', 'Constant'), text: say('$m=0$: zuzen horizontala.', '$m=0$: recta horizontal.', '$m=0$: مستقيم أفقي.', '$m=0$: a horizontal line.'), math: same('$y=n$') }
        ],
        examplePrompt: say('Kalkulatu $y=-5x+3$ zuzenaren ebaki-puntuak ardatzekin.', 'Calcula los cortes de $y=-5x+3$ con los ejes.', 'احسب نقاط تقاطع $y=-5x+3$ مع المحورين.', 'Work out where $y=-5x+3$ crosses the axes.'),
        example: same('$\\begin{gathered}(0,\\,3)\\\\ -5x+3=0\\ \\to\\ x=\\frac{3}{5}\\end{gathered}$'),
        exampleAnswer: say('Y ardatza $(0,\\,3)$ puntuan eta X ardatza $(\\frac{3}{5},\\,0)$ puntuan.', 'Eje Y en $(0,\\,3)$ y eje X en $(\\frac{3}{5},\\,0)$.', 'محور Y عند $(0,\\,3)$ ومحور X عند $(\\frac{3}{5},\\,0)$.', 'Y axis at $(0,\\,3)$ and X axis at $(\\frac{3}{5},\\,0)$.')
    },
    'linear-models': {
        vocabulary: [
            say('hasierako balioa', 'valor inicial', 'القيمة الابتدائية', 'starting value'),
            say('eredua', 'modelo', 'النموذج', 'model'),
            say('malguki', 'muelle', 'نابض', 'spring')
        ],
        explanation: say(
            'Magnitude bat hasierako balio batetik ($n$) abiatu eta erritmo konstantean ($m$) aldatzen denean, funtzio lineal bat da. Eredua bi noranzkoetan erabiltzen da: $x$ ezagutzen baduzu, ordeztu; $y$ ezagutzen baduzu, ebatzi lehen mailako ekuazio bat.',
            'Cuando una magnitud parte de un valor inicial ($n$) y cambia a ritmo constante ($m$), es una función lineal. El modelo se usa en los dos sentidos: si conoces $x$, sustituye; si conoces $y$, resuelve una ecuación de primer grado.',
            'عندما يبدأ مقدار من قيمة ابتدائية ($n$) ويتغير بمعدل ثابت ($m$) فهو دالة خطية. ويُستعمل النموذج في الاتجاهين: إذا عرفت $x$ فعوّض، وإذا عرفت $y$ فحلّ معادلة من الدرجة الأولى.',
            'When a quantity starts from a starting value ($n$) and changes at a steady rate ($m$), it is a linear function. The model works both ways: if you know $x$, substitute; if you know $y$, solve a first-degree equation.'
        ),
        cases: [
            { title: say('Malgukia', 'El muelle', 'النابض', 'The spring'), text: say('Marrazkikoa: 30 cm neurtzen du eta 15 cm luzatzen da kilo bakoitzeko.', 'El del dibujo: mide 30 cm y se alarga 15 cm por kilo.', 'نابض الرسم: طوله 30 سم ويستطيل 15 سم لكل كيلوغرام.', 'The one in the drawing: 30 cm long and stretching 15 cm per kilo.'), math: same('$y=30+15x$') },
            { title: say('Alderantziz', 'Al revés', 'بالعكس', 'The other way'), text: say('100 cm neur dezan:', 'Para que mida 100 cm:', 'كي يصير طوله 100 سم:', 'For it to be 100 cm long:'), math: same('$30+15x=100\\ \\to\\ x\\approx 4{,}67$') },
            { title: say('Tenperatura', 'Temperatura', 'الحرارة', 'Temperature'), text: say('Fahrenheit graduak, $x$ °C-tan.', 'Grados Fahrenheit, con $x$ en °C.', 'درجات فهرنهايت، و$x$ بالدرجات المئوية.', 'Degrees Fahrenheit, with $x$ in °C.'), math: same('$y=32+1{,}8x$') }
        ],
        examplePrompt: say('Mugikari bat jatorritik 3 m-ra dago eta 2 m/s-ko abiaduran urruntzen da. Noiz egongo da 25 m-ra?', 'Un móvil está a 3 m del origen y se aleja a 2 m/s. ¿Cuándo estará a 25 m?', 'متحرك على بعد 3 م من الأصل ويبتعد بسرعة 2 م/ث. متى يصير على بعد 25 م؟', 'An object is 3 m from the origin and moves away at 2 m/s. When will it be 25 m away?'),
        example: same('$3+2x=25\\ \\to\\ x=11$'),
        exampleAnswer: say('11 segundoren buruan.', 'A los 11 segundos.', 'بعد 11 ثانية.', 'After 11 seconds.')
    },
    /* ---------- 2. Straight lines ---------- */
    slope: {
        vocabulary: [
            say('aurreratu', 'avanzar', 'التقدم', 'go along'),
            say('koadrikula', 'cuadrícula', 'الشبكة', 'grid'),
            say('zuzen bertikala', 'recta vertical', 'مستقيم عمودي', 'vertical line')
        ],
        explanation: say(
            'Bi puntutatik pasatzen den zuzenaren malda altueraren aldaketa zati aurreratutakoa da, goian eta behean ordena berean kenduz. Grafiko batean, zenbatu koadrikulako laukiak. Puntuek $x$ bera badute, zuzena bertikala da eta ez du maldarik.',
            'La pendiente de la recta que pasa por dos puntos es lo que cambia la altura dividido entre lo que se avanza, restando en el mismo orden arriba y abajo. En una gráfica, cuenta los cuadros de la cuadrícula. Si los puntos tienen la misma $x$, la recta es vertical y no tiene pendiente.',
            'ميل المستقيم المار بنقطتين هو تغير الارتفاع مقسومًا على التقدم، مع الطرح بالترتيب نفسه في البسط والمقام. وفي الرسم عُدّ الخانات على الشبكة. وإذا كان للنقطتين $x$ نفسها فالمستقيم عمودي ولا ميل له.',
            'The slope of the line through two points is the change in height divided by how far you go along, subtracting in the same order on top and at the bottom. On a graph, count squares on the grid. If the points have the same $x$, the line is vertical and has no slope.'
        ),
        cases: [
            { title: say('Formula', 'Fórmula', 'الصيغة', 'Formula'), text: say('Igotzen dena zati aurreratzen dena.', 'Lo que sube entre lo que avanza.', 'الصعود على التقدم.', 'Rise over run.'), math: same('$m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$') },
            { title: say('Marrazkikoa', 'La del dibujo', 'مستقيم الرسم', 'The one in the drawing'), text: say('$A(1,\\,2)$ eta $B(4,\\,8)$: 6 igo eta 3 aurreratu.', '$A(1,\\,2)$ y $B(4,\\,8)$: sube 6 y avanza 3.', '$A(1,\\,2)$ و$B(4,\\,8)$: يصعد 6 ويتقدم 3.', '$A(1,\\,2)$ and $B(4,\\,8)$: up 6 and along 3.'), math: same('$m=\\frac{8-2}{4-1}=2$') }
        ],
        examplePrompt: say('Kalkulatu $(3,\\,-5)$ eta $(-4,\\,7)$ puntuetatik pasatzen den zuzenaren malda.', 'Calcula la pendiente de la recta que pasa por $(3,\\,-5)$ y $(-4,\\,7)$.', 'احسب ميل المستقيم المار بـ$(3,\\,-5)$ و$(-4,\\,7)$.', 'Work out the slope of the line through $(3,\\,-5)$ and $(-4,\\,7)$.'),
        example: same('$m=\\frac{7-(-5)}{-4-3}=\\frac{12}{-7}=-\\frac{12}{7}$'),
        exampleAnswer: say('Negatiboa: zuzena jaisten da.', 'Negativa: la recta baja.', 'سالب: المستقيم ينزل.', 'Negative: the line goes down.')
    },
    'line-equation': {
        vocabulary: [
            say('puntu-malda ekuazioa', 'ecuación punto-pendiente', 'معادلة النقطة والميل', 'point-slope form'),
            say('ordeztu', 'sustituir', 'عوّض', 'substitute'),
            say('egiaztatu', 'comprobar', 'تحقّق', 'check')
        ],
        explanation: say(
            'Malda $m$ eta puntu bat ezagututa, idatzi $y=mx+n$ eta ordeztu puntua $n$ aurkitzeko; puntu-malda ekuazioa erabiltzea bezala da. Bi puntu ematen badizkizute, kalkulatu lehenik malda. Amaieran, egiaztatu beste puntua ekuazioan.',
            'Conocida la pendiente $m$ y un punto, escribe $y=mx+n$ y sustituye el punto para hallar $n$; es lo mismo que usar la ecuación punto-pendiente. Si te dan dos puntos, calcula primero la pendiente. Al final, hay que comprobar el otro punto en la ecuación.',
            'بمعرفة الميل $m$ ونقطة اكتب $y=mx+n$ وعوّض النقطة لإيجاد $n$؛ وهذا كاستعمال معادلة النقطة والميل. وإذا أُعطيت نقطتين فاحسب الميل أولًا. وفي النهاية تحقّق من النقطة الأخرى في المعادلة.',
            'Knowing the slope $m$ and one point, write $y=mx+n$ and substitute the point to find $n$; it is the same as using the point-slope form. If you are given two points, work out the slope first. At the end, check the other point in the equation.'
        ),
        cases: [
            { title: say('Puntu-malda', 'Punto-pendiente', 'النقطة والميل', 'Point-slope'), text: say('$P(x_{0},\\,y_{0})$ puntutik, $m$ maldarekin.', 'Por $P(x_{0},\\,y_{0})$, con pendiente $m$.', 'عبر $P(x_{0},\\,y_{0})$ بالميل $m$.', 'Through $P(x_{0},\\,y_{0})$, with slope $m$.'), math: same('$y-y_{0}=m(x-x_{0})$') },
            { title: say('Bi puntu', 'Dos puntos', 'نقطتان', 'Two points'), text: say('Marrazkikoak, $(0,\\,1)$ eta $(3,\\,7)$: lehenik malda.', 'Las del dibujo, $(0,\\,1)$ y $(3,\\,7)$: primero la pendiente.', 'نقطتا الرسم $(0,\\,1)$ و$(3,\\,7)$: الميل أولًا.', 'The ones in the drawing, $(0,\\,1)$ and $(3,\\,7)$: the slope first.'), math: same('$m=\\frac{7-1}{3-0}=2$') }
        ],
        examplePrompt: say('Idatzi $(2,\\,-1)$ puntutik $-2$ maldarekin pasatzen den zuzena.', 'Escribe la recta que pasa por $(2,\\,-1)$ con pendiente $-2$.', 'اكتب المستقيم المار بـ$(2,\\,-1)$ بالميل $-2$.', 'Write the line through $(2,\\,-1)$ with slope $-2$.'),
        example: same('$\\begin{gathered}-1=-2\\cdot 2+n\\ \\to\\ n=3\\\\ y=-2x+3\\end{gathered}$'),
        exampleAnswer: say('Egiaztatu: $-2\\cdot 2+3=-1$.', 'Comprueba: $-2\\cdot 2+3=-1$.', 'تحقّق: $-2\\cdot 2+3=-1$.', 'Check: $-2\\cdot 2+3=-1$.')
    },
    parallel: {
        vocabulary: [
            say('paraleloak', 'paralelas', 'متوازيان', 'parallel'),
            say('ebakitzaileak', 'secantes', 'متقاطعان', 'intersecting'),
            say('ebaki-puntua', 'punto de corte', 'نقطة التقاطع', 'crossing point')
        ],
        explanation: say(
            'Bi zuzen paraleloak dira malda bera eta jatorriko ordenatu desberdina badituzte: ez dira inoiz elkartzen. Malda desberdina badute, puntu bakar batean ebakitzen dira, eta bi adierazpenak berdinduz aurkitzen da puntu hori.',
            'Dos rectas son paralelas si tienen la misma pendiente y distinta ordenada en el origen: no se encuentran nunca. Si tienen distinta pendiente, se cortan en un solo punto, que se halla igualando las dos expresiones.',
            'يتوازى مستقيمان إذا كان لهما الميل نفسه وجزءان مقطوعان مختلفان: لا يلتقيان أبدًا. وإذا اختلف ميلاهما فإنهما متقاطعان في نقطة واحدة نجدها بمساواة العبارتين.',
            'Two lines are parallel if they have the same slope and different y-intercepts: they never meet. If their slopes are different, they cross at a single point, found by setting the two expressions equal.'
        ),
        cases: [
            { title: say('Paraleloak', 'Paralelas', 'متوازيان', 'Parallel'), text: say('Marrazkikoak: $m=2$ biek.', 'Las del dibujo: $m=2$ las dos.', 'مستقيما الرسم: $m=2$ لكليهما.', 'The ones in the drawing: $m=2$ both.'), math: same('$y=2x+1\\qquad y=2x-3$') },
            { title: say('Ebakitzaileak', 'Secantes', 'متقاطعان', 'Intersecting'), text: say('Berdindu eta ebatzi.', 'Iguala y resuelve.', 'ساوِ وحلّ.', 'Set them equal and solve.'), math: same('$2x+1=-x+4\\ \\to\\ x=1$') },
            { title: say('Puntu batetik paraleloa', 'Paralela por un punto', 'موازٍ عبر نقطة', 'Parallel through a point'), text: say('Hartu malda eta ordeztu puntua.', 'Toma la pendiente y sustituye el punto.', 'خذ الميل وعوّض النقطة.', 'Take the slope and substitute the point.') }
        ],
        examplePrompt: say('Idatzi $y=-x+5$ zuzenaren paraleloa, $(2,\\,-3)$ puntutik pasatzen dena.', 'Escribe la paralela a $y=-x+5$ que pasa por $(2,\\,-3)$.', 'اكتب الموازي لـ$y=-x+5$ المار بـ$(2,\\,-3)$.', 'Write the parallel to $y=-x+5$ through $(2,\\,-3)$.'),
        example: same('$\\begin{gathered}-3=-2+n\\ \\to\\ n=-1\\\\ y=-x-1\\end{gathered}$'),
        exampleAnswer: say('Malda bera, $-1$; beste ordenatu bat jatorrian.', 'Misma pendiente, $-1$; otra ordenada en el origen.', 'الميل نفسه $-1$؛ وجزء مقطوع آخر.', 'Same slope, $-1$; a different y-intercept.')
    },
    /* ---------- 3. Parabolas ---------- */
    parabola: {
        definitions: [
            {
                term: say('Parabola', 'Parábola', 'القطع المكافئ', 'Parabola'),
                meaning: say('$y=ax^{2}+bx+c$ funtzioaren grafikoa, $a\\neq 0$ izanik.', 'La gráfica de $y=ax^{2}+bx+c$, con $a\\neq 0$.', 'رسم $y=ax^{2}+bx+c$ مع $a\\neq 0$.', 'The graph of $y=ax^{2}+bx+c$, with $a\\neq 0$.')
            }
        ],
        vocabulary: [
            say('erpina', 'vértice', 'الرأس', 'vertex'),
            say('adarrak', 'ramas', 'الفرعان', 'branches'),
            say('simetrikoa', 'simétrica', 'متماثل', 'symmetrical')
        ],
        explanation: say(
            'Errazena $y=x^{2}$ da: $x$ eta $-x$ balioek irudi bera dute; beraz, simetrikoa da Y ardatzarekiko, eta erpina $(0,\\,0)$ puntuan du. $a$ koefizienteak erabakitzen du forma.',
            'La más sencilla es $y=x^{2}$: $x$ y $-x$ tienen la misma imagen, así que es simétrica respecto al eje Y, con el vértice en $(0,\\,0)$. El coeficiente $a$ decide la forma.',
            'أبسطها $y=x^{2}$: للقيمتين $x$ و$-x$ الصورة نفسها، فهو متماثل حول محور Y ورأسه $(0,\\,0)$. والمعامل $a$ يحدد الشكل.',
            'The simplest is $y=x^{2}$: $x$ and $-x$ have the same image, so it is symmetrical about the Y axis, with its vertex at $(0,\\,0)$. The coefficient $a$ decides the shape.'
        ),
        cases: [
            { title: say('Positiboa', 'Positivo', 'موجب', 'Positive'), text: say('Adarrak gorantz: erpina minimoa da. Marrazkian, $y=2x^{2}$.', 'Ramas hacia arriba: el vértice es un mínimo. En el dibujo, $y=2x^{2}$.', 'الفرعان إلى الأعلى: الرأس قيمة صغرى. في الرسم $y=2x^{2}$.', 'Branches up: the vertex is a minimum. In the drawing, $y=2x^{2}$.') },
            { title: say('Negatiboa', 'Negativo', 'سالب', 'Negative'), text: say('Adarrak beherantz: erpina maximoa da.', 'Ramas hacia abajo: el vértice es un máximo.', 'الفرعان إلى الأسفل: الرأس قيمة عظمى.', 'Branches down: the vertex is a maximum.') },
            { title: say('$a$ zenbakiaren tamaina', 'Tamaño de $a$', 'قيمة $a$', 'Size of $a$'), text: say('$|a|$ zenbat eta handiagoa, orduan eta itxiagoa.', 'Cuanto mayor es $|a|$, más cerrada.', 'كلما كبر $|a|$ ضاق القطع.', 'The bigger $|a|$, the narrower.'), math: same('$y=3x^{2}\\qquad y=\\frac{1}{3}x^{2}$') }
        ],
        examplePrompt: say('Egin $y=-3x^{2}$ funtzioaren taula, $x=-2$, $-1$, $0$, $1$ eta $2$ direnean.', 'Haz la tabla de $y=-3x^{2}$ para $x=-2$, $-1$, $0$, $1$ y $2$.', 'كوّن جدول $y=-3x^{2}$ لقيم $x=-2$ و$-1$ و$0$ و$1$ و$2$.', 'Make the table of $y=-3x^{2}$ for $x=-2$, $-1$, $0$, $1$ and $2$.'),
        example: same('$-12,\\ -3,\\ 0,\\ -3,\\ -12$'),
        exampleAnswer: say('Simetrikoa: $x$ eta $-x$ berdin; erpina, $(0,\\,0)$, maximoa da.', 'Simétrica: $x$ y $-x$ dan lo mismo; el vértice, $(0,\\,0)$, es un máximo.', 'متماثل: $x$ و$-x$ يعطيان الشيء نفسه؛ والرأس $(0,\\,0)$ قيمة عظمى.', 'Symmetrical: $x$ and $-x$ give the same; the vertex, $(0,\\,0)$, is a maximum.')
    },
    vertex: {
        vocabulary: [
            say('simetria-ardatza', 'eje de simetría', 'محور التماثل', 'axis of symmetry'),
            say('abszisa', 'abscisa', 'الفاصلة', 'x-coordinate'),
            say('ordenatua', 'ordenada', 'الترتيبة', 'y-coordinate')
        ],
        explanation: say(
            '$y=ax^{2}+bx+c$ parabolaren erpinaren abszisa $x_{V}=\\frac{-b}{2a}$ da, eta ordenatua haren irudia. Simetria-ardatza erpinetik pasatzen den zuzen bertikala da. Y ardatzarekiko ebaki-puntua $(0,\\,c)$ da, eta X ardatzarekikoak $ax^{2}+bx+c=0$ ebatziz ateratzen dira.',
            'La abscisa del vértice de $y=ax^{2}+bx+c$ es $x_{V}=\\frac{-b}{2a}$, y la ordenada es su imagen. El eje de simetría es la recta vertical que pasa por el vértice. El corte con el eje Y es $(0,\\,c)$, y los cortes con el eje X salen de resolver $ax^{2}+bx+c=0$.',
            'فاصلة رأس $y=ax^{2}+bx+c$ هي $x_{V}=\\frac{-b}{2a}$، والترتيبة صورتها. ومحور التماثل المستقيم العمودي المار بالرأس. والتقاطع مع محور Y هو $(0,\\,c)$، والتقاطعات مع محور X نجدها بحل $ax^{2}+bx+c=0$.',
            'The x-coordinate of the vertex of $y=ax^{2}+bx+c$ is $x_{V}=\\frac{-b}{2a}$, and the y-coordinate is its image. The axis of symmetry is the vertical line through the vertex. The Y intercept is $(0,\\,c)$, and the X intercepts come from solving $ax^{2}+bx+c=0$.'
        ),
        cases: [
            { title: say('Erpina', 'Vértice', 'الرأس', 'Vertex'), text: say('Marrazkiko $y=x^{2}-4x+3$:', 'En $y=x^{2}-4x+3$, la del dibujo:', 'في $y=x^{2}-4x+3$، قطع الرسم:', 'In $y=x^{2}-4x+3$, the one in the drawing:'), math: same('$x_{V}=\\frac{4}{2}=2\\qquad y_{V}=4-8+3=-1$') },
            { title: say('Ebaki-puntuak', 'Cortes', 'التقاطعات', 'Intercepts'), text: say('$(0,\\,3)$ eta ekuazioaren ebazpenak:', '$(0,\\,3)$ y las soluciones de la ecuación:', '$(0,\\,3)$ وحلول المعادلة:', '$(0,\\,3)$ and the solutions of the equation:'), math: same('$x^{2}-4x+3=0\\ \\to\\ x=1,\\ x=3$') }
        ],
        why: {
            text: say(
                'Erpina simetria-ardatzean dago, X ardatzarekiko bi ebaki-puntuen erdian. Marrazkian ebaki-puntuak 1 eta 3 dira, eta erpina $x=2$ zenbakian dago; $\\frac{-b}{2a}$ formulak ere hori ematen du.',
                'El vértice está en el eje de simetría, a medio camino entre los dos cortes con el eje X. En el dibujo los cortes son 1 y 3, y el vértice está en $x=2$; la fórmula $\\frac{-b}{2a}$ da lo mismo.',
                'الرأس على محور التماثل، في منتصف المسافة بين التقاطعين مع محور X. في الرسم التقاطعان 1 و3، والرأس عند $x=2$؛ والصيغة $\\frac{-b}{2a}$ تعطي الشيء نفسه.',
                'The vertex is on the axis of symmetry, halfway between the two X intercepts. In the drawing the intercepts are 1 and 3, and the vertex is at $x=2$; the formula $\\frac{-b}{2a}$ gives the same.'
            ),
            math: same('$\\frac{1+3}{2}=2=\\frac{4}{2}$')
        },
        examplePrompt: say('Aurkitu $y=2x^{2}-8x+5$ parabolaren erpina eta Y ardatzarekiko ebaki-puntua.', 'Halla el vértice y el corte con el eje Y de $y=2x^{2}-8x+5$.', 'أوجد رأس $y=2x^{2}-8x+5$ وتقاطعه مع محور Y.', 'Find the vertex and the Y intercept of $y=2x^{2}-8x+5$.'),
        example: same('$\\begin{gathered}x_{V}=\\frac{8}{4}=2\\\\ y_{V}=8-16+5=-3\\end{gathered}$'),
        exampleAnswer: say('Erpina $(2,\\,-3)$, minimo bat; Y ardatza $(0,\\,5)$ puntuan.', 'Vértice $(2,\\,-3)$, un mínimo; corta al eje Y en $(0,\\,5)$.', 'الرأس $(2,\\,-3)$، قيمة صغرى؛ ويقطع محور Y في $(0,\\,5)$.', 'Vertex $(2,\\,-3)$, a minimum; it crosses the Y axis at $(0,\\,5)$.')
    },
    shifts: {
        vocabulary: [
            say('lekualdaketa', 'traslación', 'انسحاب', 'shift'),
            say('ezkerra', 'izquierda', 'اليسار', 'left'),
            say('eskuina', 'derecha', 'اليمين', 'right')
        ],
        explanation: say(
            '$y=a(x-p)^{2}+q$ parabola $y=ax^{2}$ bera da, lekualdatuta: haren erpina $(p,\\,q)$ da. Kontuz zeinuarekin: $(x+2)^{2}$ ezkerrera doa, $p=-2$ delako. Garatuz, ohiko adierazpena ateratzen da.',
            'La parábola $y=a(x-p)^{2}+q$ es $y=ax^{2}$ trasladada: tiene el vértice en $(p,\\,q)$. Cuidado con el signo: $(x+2)^{2}$ va hacia la izquierda, porque $p=-2$. Desarrollando sale la expresión habitual.',
            'القطع $y=a(x-p)^{2}+q$ هو $y=ax^{2}$ بعد انسحاب: رأسه $(p,\\,q)$. انتبه للإشارة: $(x+2)^{2}$ ينتقل إلى اليسار لأن $p=-2$. وبالنشر نحصل على الصيغة المعتادة.',
            'The parabola $y=a(x-p)^{2}+q$ is $y=ax^{2}$ after a shift: its vertex is at $(p,\\,q)$. Careful with the sign: $(x+2)^{2}$ moves left, because $p=-2$. Expanding gives the usual expression.'
        ),
        cases: [
            { title: say('Eskuinera', 'A la derecha', 'إلى اليمين', 'To the right'), text: say('Marrazkikoa: 3 unitate eskuinera.', 'La del dibujo: 3 unidades a la derecha.', 'قطع الرسم: 3 وحدات إلى اليمين.', 'The one in the drawing: 3 units to the right.'), math: same('$y=(x-3)^{2}$') },
            { title: say('Behera', 'Hacia abajo', 'إلى الأسفل', 'Down'), text: say('3 unitate beherantz.', '3 unidades hacia abajo.', '3 وحدات إلى الأسفل.', '3 units down.'), math: same('$y=x^{2}-3$') },
            { title: say('Garatu', 'Desarrollar', 'النشر', 'Expand'), text: say('Ohiko adierazpenera.', 'A la expresión habitual.', 'إلى الصيغة المعتادة.', 'Into the usual form.'), math: same('$(x-1)^{2}+5=x^{2}-2x+6$') }
        ],
        why: {
            text: say(
                '$y=(x-3)^{2}$ funtzioan, parentesia 0 da $x=3$ denean. $y=x^{2}$ parabolak $x=0$ zenbakian zuen erpina orain $x=3$ zenbakian agertzen da: hiru unitate eskuinerago.',
                'En $y=(x-3)^{2}$, el paréntesis vale 0 cuando $x=3$. Lo que $y=x^{2}$ tenía en $x=0$, el vértice, aparece ahora en $x=3$: tres unidades más a la derecha.',
                'في $y=(x-3)^{2}$ يساوي القوس 0 عندما $x=3$. فما كان لـ$y=x^{2}$ عند $x=0$، أي الرأس، يظهر الآن عند $x=3$: ثلاث وحدات إلى اليمين.',
                'In $y=(x-3)^{2}$, the bracket is 0 when $x=3$. What $y=x^{2}$ had at $x=0$, the vertex, now appears at $x=3$: three units further right.'
            ),
            math: same('$(3-3)^{2}=0=0^{2}$')
        },
        examplePrompt: say('Idatzi $y=x^{2}$ parabola, 4 ezkerrera eta 2 gorantz eramanda, eta garatu.', 'Escribe la parábola $y=x^{2}$ trasladada 4 a la izquierda y 2 hacia arriba, y desarróllala.', 'اكتب القطع $y=x^{2}$ بعد انسحاب 4 إلى اليسار و2 إلى الأعلى، ثم انشره.', 'Write the parabola $y=x^{2}$ shifted 4 left and 2 up, and expand it.'),
        example: same('$y=(x+4)^{2}+2=x^{2}+8x+18$'),
        exampleAnswer: say('Erpina $(-4,\\,2)$ puntuan.', 'Vértice en $(-4,\\,2)$.', 'الرأس عند $(-4,\\,2)$.', 'Vertex at $(-4,\\,2)$.')
    },
    /* ---------- 4. Inverse and radical functions ---------- */
    inverse: {
        definitions: [
            {
                term: say('Hiperbola', 'Hipérbola', 'القطع الزائد', 'Hyperbola'),
                meaning: say('$y=\\frac{k}{x}$ funtzioaren grafikoa: ardatzetara hurbiltzen diren bi adar, haiek ukitu gabe.', 'La gráfica de $y=\\frac{k}{x}$: dos ramas que se acercan a los ejes sin tocarlos.', 'رسم $y=\\frac{k}{x}$: فرعان يقتربان من المحورين دون أن يمسّاهما.', 'The graph of $y=\\frac{k}{x}$: two branches that get close to the axes without touching them.')
            }
        ],
        vocabulary: [
            say('koadrantea', 'cuadrante', 'الربع', 'quadrant'),
            say('biderkadura', 'producto', 'حاصل الضرب', 'product'),
            say('adarra', 'rama', 'فرع', 'branch')
        ],
        explanation: say(
            'Bi magnitude alderantziz proportzionalak dira haien biderkadura konstantea bada: $x\\cdot y=k$, eta $y=\\frac{k}{x}$. $k>0$ bada, adarrak I. eta III. koadranteetan daude, eta adar bakoitzean beherakorra da; $k<0$ bada, II. eta IV. koadranteetan. Ez ditu ardatzak mozten: 0 ez dago izate-eremuan.',
            'Dos magnitudes son inversamente proporcionales si su producto es constante: $x\\cdot y=k$, e $y=\\frac{k}{x}$. Si $k>0$, las ramas están en los cuadrantes I y III y decrece en cada rama; si $k<0$, en II y IV. No corta a los ejes: el 0 no está en el dominio.',
            'يكون المقداران متناسبين عكسيًا إذا كان حاصل ضربهما ثابتًا: $x\\cdot y=k$ و$y=\\frac{k}{x}$. إذا كان $k>0$ فالفرعان في الربعين الأول والثالث ويتناقص في كل فرع؛ وإذا كان $k<0$ ففي الثاني والرابع. ولا يقطع المحورين: 0 ليس في المجال.',
            'Two quantities are inversely proportional if their product is constant: $x\\cdot y=k$, and $y=\\frac{k}{x}$. If $k>0$, the branches are in quadrants I and III and it decreases on each branch; if $k<0$, in II and IV. It does not cross the axes: 0 is not in the domain.'
        ),
        cases: [
            { title: say('Marrazkikoa', 'La del dibujo', 'قطع الرسم', 'The one in the drawing'), text: say('$k=4>0$: I. eta III. koadranteak.', '$k=4>0$: cuadrantes I y III.', '$k=4>0$: الربعان الأول والثالث.', '$k=4>0$: quadrants I and III.'), math: same('$y=\\frac{4}{x}$') },
            { title: say('Lan bat', 'Un trabajo', 'عمل', 'A job'), text: say('48 orduko lana: 2 pertsona, 24 h; 4 pertsona, 12 h.', 'Un trabajo de 48 horas: 2 personas, 24 h; 4 personas, 12 h.', 'عمل يستغرق 48 ساعة: شخصان 24 س؛ 4 أشخاص 12 س.', 'A 48-hour job: 2 people, 24 h; 4 people, 12 h.'), math: same('$y=\\frac{48}{x}$') }
        ],
        examplePrompt: say('Igerileku bat betetzeko, 3 txorrotak 8 ordu behar dituzte. Zenbat behar dituzte 4 txorrotak? Idatzi funtzioa.', 'Para llenar una piscina, 3 grifos tardan 8 horas. ¿Cuánto tardan 4 grifos? Escribe la función.', 'لملء مسبح تحتاج 3 صنابير 8 ساعات. كم تحتاج 4 صنابير؟ اكتب الدالة.', 'To fill a pool, 3 taps take 8 hours. How long do 4 taps take? Write the function.'),
        example: same('$\\begin{gathered}k=3\\cdot 8=24\\\\ y=\\frac{24}{4}=6\\end{gathered}$'),
        exampleAnswer: say('6 ordu: $y=\\frac{24}{x}$.', '6 horas: $y=\\frac{24}{x}$.', '6 ساعات: $y=\\frac{24}{x}$.', '6 hours: $y=\\frac{24}{x}$.')
    },
    asymptotes: {
        definitions: [
            {
                term: say('Asintota', 'Asíntota', 'المقارب', 'Asymptote'),
                meaning: say('Grafikoa gero eta gehiago hurbiltzen zaion zuzena, hura ukitu gabe.', 'Una recta a la que la gráfica se acerca cada vez más sin tocarla.', 'مستقيم يقترب منه الرسم أكثر فأكثر دون أن يمسّه.', 'A line the graph gets closer and closer to without touching it.')
            }
        ],
        vocabulary: [
            say('bertikala', 'vertical', 'عمودي', 'vertical'),
            say('horizontala', 'horizontal', 'أفقي', 'horizontal'),
            say('izendatzailea', 'denominador', 'المقام', 'denominator')
        ],
        explanation: say(
            '$y=\\frac{k}{x-a}+b$ funtzioan, izendatzailea 0 da $x=a$ denean: hori da asintota bertikala, eta $x=a$ ez dago izate-eremuan. Batzen den zenbakiak, $b$, hiperbola igotzen du: $y=b$ asintota horizontala da. Marrazteko, marraztu asintotak marra etenez eta kalkulatu puntu batzuk.',
            'En $y=\\frac{k}{x-a}+b$, el denominador se anula en $x=a$: esa es la asíntota vertical, y $x=a$ no está en el dominio. El número que se suma, $b$, sube la hipérbola: $y=b$ es la asíntota horizontal. Para dibujarla, traza las asíntotas a trazos y calcula algunos puntos.',
            'في $y=\\frac{k}{x-a}+b$ ينعدم المقام عند $x=a$: ذلك هو المقارب العمودي، و$x=a$ ليس في المجال. والعدد المضاف $b$ يرفع القطع الزائد: $y=b$ هو المقارب الأفقي. ولرسمه ارسم المقاربين بخط متقطع واحسب بعض النقاط.',
            'In $y=\\frac{k}{x-a}+b$, the denominator is zero at $x=a$: that is the vertical asymptote, and $x=a$ is not in the domain. The number added, $b$, lifts the hyperbola: $y=b$ is the horizontal asymptote. To draw it, draw the asymptotes as dashed lines and work out a few points.'
        ),
        cases: [
            { title: say('Marrazkikoa', 'La del dibujo', 'قطع الرسم', 'The one in the drawing'), text: say('Asintotak $x=2$ eta $y=1$.', 'Asíntotas $x=2$ e $y=1$.', 'المقاربان $x=2$ و$y=1$.', 'Asymptotes $x=2$ and $y=1$.'), math: same('$y=\\frac{1}{x-2}+1$') },
            { title: say('Izate-eremua', 'Dominio', 'المجال', 'Domain'), text: say('$a$ izan ezik, denak.', 'Todos menos $a$.', 'الكل ما عدا $a$.', 'Everything except $a$.'), math: same('$\\mathbb{R}-\\{a\\}$') }
        ],
        examplePrompt: say('Asintotak, izate-eremua eta bi puntu: $y=\\frac{1}{x-1}+2$.', 'Asíntotas, dominio y dos puntos de $y=\\frac{1}{x-1}+2$.', 'المقاربان والمجال ونقطتان لـ$y=\\frac{1}{x-1}+2$.', 'Asymptotes, domain and two points of $y=\\frac{1}{x-1}+2$.'),
        example: same('$\\begin{gathered}x=1\\qquad y=2\\\\ (2,\\,3)\\qquad (0,\\,1)\\end{gathered}$'),
        exampleAnswer: say('$\\mathbb{R}-\\{1\\}$; puntu bat asintotaren alde bakoitzean.', '$\\mathbb{R}-\\{1\\}$; un punto a cada lado de la asíntota.', '$\\mathbb{R}-\\{1\\}$؛ نقطة على كل جانب من المقارب.', '$\\mathbb{R}-\\{1\\}$; one point on each side of the asymptote.')
    },
    radical: {
        vocabulary: [
            say('erro karratua', 'raíz cuadrada', 'الجذر التربيعي', 'square root'),
            say('karratu perfektuak', 'cuadrados perfectos', 'المربعات الكاملة', 'perfect squares'),
            say('izate-eremua', 'dominio', 'المجال', 'domain')
        ],
        explanation: say(
            '$y=\\sqrt{x}$ funtzioa $x\\ge 0$ denean bakarrik dago definituta. Taularik erosoena karratu perfektuekin egiten da: $x=0,\\,1,\\,4,\\,9$ balioek $y=0,\\,1,\\,2,\\,3$ ematen dute. Erro barrukoa aldatzen bada, izate-eremua aldatzen da; kanpoan batutako zenbaki batek grafikoa igotzen edo jaisten du.',
            '$y=\\sqrt{x}$ solo está definida para $x\\ge 0$. La tabla más cómoda usa cuadrados perfectos: $x=0,\\,1,\\,4,\\,9$ dan $y=0,\\,1,\\,2,\\,3$. Si cambia lo de dentro de la raíz, cambia el dominio; un número sumado fuera sube o baja la gráfica.',
            'الدالة $y=\\sqrt{x}$ معرفة فقط عندما $x\\ge 0$. وأسهل جدول بالمربعات الكاملة: $x=0,\\,1,\\,4,\\,9$ تعطي $y=0,\\,1,\\,2,\\,3$. وإذا تغيّر ما تحت الجذر تغيّر المجال؛ والعدد المضاف خارجه يرفع الرسم أو يخفضه.',
            '$y=\\sqrt{x}$ is only defined for $x\\ge 0$. The handiest table uses perfect squares: $x=0,\\,1,\\,4,\\,9$ give $y=0,\\,1,\\,2,\\,3$. If what is inside the root changes, the domain changes; a number added outside moves the graph up or down.'
        ),
        cases: [
            { title: say('Barruan', 'Dentro', 'في الداخل', 'Inside'), text: say('Marrazkiko $y=\\sqrt{x+3}$: 3 unitate ezkerrera.', 'La del dibujo, $y=\\sqrt{x+3}$: 3 unidades a la izquierda.', 'دالة الرسم $y=\\sqrt{x+3}$: 3 وحدات إلى اليسار.', 'The one in the drawing, $y=\\sqrt{x+3}$: 3 units to the left.'), math: same('$x+3\\ge 0\\ \\to\\ x\\ge -3$') },
            { title: say('Kanpoan', 'Fuera', 'في الخارج', 'Outside'), text: say('$y=2+\\sqrt{x}$ funtzioa $(0,\\,2)$ puntutik ateratzen da.', '$y=2+\\sqrt{x}$ sale del punto $(0,\\,2)$.', '$y=2+\\sqrt{x}$ تبدأ من النقطة $(0,\\,2)$.', '$y=2+\\sqrt{x}$ starts from the point $(0,\\,2)$.') }
        ],
        examplePrompt: say('$y=\\sqrt{8-2x}$ funtzioaren izate-eremua eta haren balioa $x=2$ denean.', 'Dominio de $y=\\sqrt{8-2x}$ y su valor en $x=2$.', 'مجال $y=\\sqrt{8-2x}$ وقيمتها عند $x=2$.', 'Domain of $y=\\sqrt{8-2x}$ and its value at $x=2$.'),
        example: same('$\\begin{gathered}8-2x\\ge 0\\ \\to\\ x\\le 4\\\\ \\sqrt{8-4}=2\\end{gathered}$'),
        exampleAnswer: say('$\\mathrm{Dom}\\,f=(-\\infty,\\,4]$, eta 2 balio du.', '$\\mathrm{Dom}\\,f=(-\\infty,\\,4]$, y vale 2.', '$\\mathrm{Dom}\\,f=(-\\infty,\\,4]$، وقيمتها 2.', '$\\mathrm{Dom}\\,f=(-\\infty,\\,4]$, and it is 2.')
    },
    /* ---------- 5. Exponential functions ---------- */
    exponential: {
        vocabulary: [
            say('oinarria', 'base', 'الأساس', 'base'),
            say('berretzailea', 'exponente', 'الأس', 'exponent'),
            say('asintota', 'asíntota', 'مقارب', 'asymptote')
        ],
        explanation: say(
            '$y=a^{x}$ funtzioan aldagaia berretzailean dago; oinarria positiboa da eta ez 1. Guztiak $(0,\\,1)$ puntutik pasatzen dira eta X ardatzaren gainetik geratzen dira: $y=0$ asintota bat da. $a>1$ bada, oso azkar hazten da; $0<a<1$ bada, beherakorra da.',
            'En $y=a^{x}$ la variable está en el exponente; la base es positiva y distinta de 1. Todas pasan por $(0,\\,1)$ y quedan por encima del eje X: $y=0$ es una asíntota. Si $a>1$, crece muy deprisa; si $0<a<1$, decrece.',
            'في $y=a^{x}$ المتغير في الأس؛ والأساس موجب ومختلف عن 1. وكلها تمر بـ$(0,\\,1)$ وتبقى فوق محور X: $y=0$ مقارب. إذا كان $a>1$ تكبر بسرعة كبيرة، وإذا كان $0<a<1$ تتناقص.',
            'In $y=a^{x}$ the variable is in the exponent; the base is positive and not 1. They all pass through $(0,\\,1)$ and stay above the X axis: $y=0$ is an asymptote. If $a>1$, it grows very fast; if $0<a<1$, it decreases.'
        ),
        cases: [
            { title: say('Taula', 'Tabla', 'الجدول', 'Table'), text: say('Marrazkiko $y=2^{x}$:', 'La de $y=2^{x}$, en el dibujo:', 'جدول $y=2^{x}$ في الرسم:', 'For $y=2^{x}$, in the drawing:'), math: same('$2^{-1}=\\frac{1}{2}\\qquad 2^{0}=1\\qquad 2^{3}=8$') },
            { title: say('Simetria', 'Simetría', 'التماثل', 'Symmetry'), text: say('$y=\\left(\\frac{1}{2}\\right)^{x}$ eta $y=2^{x}$ simetrikoak dira Y ardatzarekiko.', '$y=\\left(\\frac{1}{2}\\right)^{x}$ e $y=2^{x}$ son simétricas respecto al eje Y.', '$y=\\left(\\frac{1}{2}\\right)^{x}$ و$y=2^{x}$ متماثلتان حول محور Y.', '$y=\\left(\\frac{1}{2}\\right)^{x}$ and $y=2^{x}$ are symmetrical about the Y axis.') }
        ],
        why: {
            text: say(
                '$x$ aldagaiaren urrats bakoitzak $a$ zenbakiaz biderkatzen du: $a=2$ denean, taula urrats bakoitzean bikoizten da, eta horregatik hazten da hain azkar. Ezkerrera 2 zenbakiaz zatitzen da, eta ez da inoiz 0 izatera iristen.',
                'Cada paso de $x$ multiplica por $a$: con $a=2$, la tabla se dobla en cada paso, y por eso se dispara. Hacia la izquierda se divide entre 2, y nunca se llega a 0.',
                'كل خطوة في $x$ تضرب في $a$: مع $a=2$ يتضاعف الجدول في كل خطوة، ولذلك يكبر بسرعة. وإلى اليسار نقسم على 2 فلا نصل أبدًا إلى 0.',
                'Each step in $x$ multiplies by $a$: with $a=2$, the table doubles at every step, and that is why it shoots up. To the left you divide by 2, and you never get to 0.'
            ),
            math: same('$2^{3}=2\\cdot 2^{2}=8$')
        },
        examplePrompt: say('Kalkulatu $y=3^{x}$ funtzioa, $x=-2$, $0$ eta $2$ direnean.', 'Calcula $y=3^{x}$ para $x=-2$, $0$ y $2$.', 'احسب $y=3^{x}$ عندما $x=-2$ و$0$ و$2$.', 'Work out $y=3^{x}$ for $x=-2$, $0$ and $2$.'),
        example: same('$3^{-2}=\\frac{1}{9}\\qquad 3^{0}=1\\qquad 3^{2}=9$'),
        exampleAnswer: say('Gorakorra da: oinarria 1 baino handiagoa da.', 'Crece: la base es mayor que 1.', 'تتزايد: الأساس أكبر من 1.', 'It increases: the base is greater than 1.')
    },
    growth: {
        vocabulary: [
            say('biderkatzailea', 'factor', 'العامل', 'multiplier'),
            say('ehunekoa', 'porcentaje', 'النسبة', 'percentage'),
            say('hasierako balioa', 'valor inicial', 'القيمة الابتدائية', 'starting value')
        ],
        explanation: say(
            'Magnitude batek urrats bakoitzean ehuneko bera irabazten badu, biderkatzaile beraz biderkatzen da beti: % 8 igotzea $1{,}08$ zenbakiaz biderkatzea da, eta % 20 jaistea, $0{,}8$ zenbakiaz. Hasieran $k$ bada, $x$ urratsen ondoren $y=k\\cdot a^{x}$ da; grafikoak Y ardatza $(0,\\,k)$ puntuan mozten du.',
            'Si una magnitud gana el mismo porcentaje en cada paso, se multiplica siempre por el mismo factor: subir un 8 % es multiplicar por $1{,}08$, y bajar un 20 %, por $0{,}8$. Si al principio vale $k$, tras $x$ pasos vale $y=k\\cdot a^{x}$; la gráfica corta al eje Y en $(0,\\,k)$.',
            'إذا زاد مقدار بالنسبة نفسها في كل خطوة فإنه يُضرب دائمًا في العامل نفسه: الزيادة 8٪ ضرب في $1{,}08$، والنقصان 20٪ ضرب في $0{,}8$. وإذا كانت القيمة الابتدائية $k$ فبعد $x$ خطوات تصير $y=k\\cdot a^{x}$؛ ويقطع الرسم محور Y في $(0,\\,k)$.',
            'If a quantity gains the same percentage at each step, it is always multiplied by the same multiplier: going up 8% is multiplying by $1{,}08$, and going down 20%, by $0{,}8$. If it starts at $k$, after $x$ steps it is $y=k\\cdot a^{x}$; the graph crosses the Y axis at $(0,\\,k)$.'
        ),
        cases: [
            { title: say('Bi punturekin', 'Con dos puntos', 'بنقطتين', 'With two points'), text: say('Marrazkikoa, $(0,\\,3)$ eta $(1;\\,3{,}6)$: $k=3$ eta', 'La del dibujo, $(0,\\,3)$ y $(1;\\,3{,}6)$: $k=3$ y', 'منحنى الرسم $(0,\\,3)$ و$(1;\\,3{,}6)$: $k=3$ و', 'The one in the drawing, $(0,\\,3)$ and $(1;\\,3{,}6)$: $k=3$ and'), math: same('$a=\\frac{3{,}6}{3}=1{,}2$') },
            { title: say('Soldata', 'Sueldo', 'الراتب', 'Salary'), text: say('24 000 € eta % 8 gehiago urtero:', '24 000 € y un 8 % más cada año:', '24 000 € وزيادة 8٪ كل سنة:', '€24,000 and 8% more every year:'), math: same('$s(t)=24\\,000\\cdot 1{,}08^{t}$') }
        ],
        examplePrompt: say('8000 euroko moto batek urtero bere balioaren % 15 galtzen du. Zenbat balio du 2 urteren buruan?', 'Una moto de 8000 € pierde un 15 % de valor cada año. ¿Cuánto vale a los 2 años?', 'دراجة نارية ثمنها 8000 € تخسر 15٪ من قيمتها كل سنة. كم ثمنها بعد سنتين؟', 'An €8,000 motorbike loses 15% of its value every year. What is it worth after 2 years?'),
        example: same('$8000\\cdot 0{,}85^{2}=5780$'),
        exampleAnswer: say('5780 €: urtero % 85 geratzen da.', '5780 €: cada año queda el 85 %.', '5780 €: يبقى 85٪ كل سنة.', '€5,780: each year 85% is left.')
    },
    models: {
        vocabulary: [
            say('eredua', 'modelo', 'النموذج', 'model'),
            say('koadratikoa', 'cuadrática', 'تربيعية', 'quadratic'),
            say('lineala', 'lineal', 'خطية', 'linear')
        ],
        explanation: say(
            'Galdetu zeure buruari nola aldatzen den magnitudea, eta aukeratu eredua. Adibidez, 3 m-ko listoi batekin egindako marko batean, $x$ oinarriak eta $1{,}5-x$ altuerak azalera koadratiko bat ematen dute, maximoa $x=0{,}75$ m denean.',
            'Pregúntate cómo cambia la magnitud y elige el modelo. Por ejemplo, en un marco hecho con un listón de 3 m, la base $x$ y la altura $1{,}5-x$ dan un área cuadrática, con el máximo en $x=0{,}75$ m.',
            'اسأل نفسك كيف يتغير المقدار واختر النموذج. مثلًا في إطار من عصا طولها 3 م، القاعدة $x$ والارتفاع $1{,}5-x$ يعطيان مساحة تربيعية قيمتها العظمى عند $x=0{,}75$ م.',
            'Ask yourself how the quantity changes, and choose the model. For example, in a frame made from a 3 m strip, base $x$ and height $1{,}5-x$ give a quadratic area, with its maximum at $x=0{,}75$ m.'
        ),
        cases: [
            { title: say('Lineala', 'Lineal', 'خطية', 'Linear'), text: say('Urrats bakoitzean kopuru bera batzen da.', 'Se suma lo mismo en cada paso.', 'نضيف المقدار نفسه في كل خطوة.', 'The same amount is added at each step.'), math: same('$y=mx+n$') },
            { title: say('Alderantzizkoa', 'Inversa', 'عكسية', 'Inverse'), text: say('Biderkadura konstantea da.', 'El producto es constante.', 'حاصل الضرب ثابت.', 'The product is constant.'), math: same('$y=\\frac{k}{x}$') },
            { title: say('Esponentziala', 'Exponencial', 'أسية', 'Exponential'), text: say('Ehuneko berarekin biderkatzen da.', 'Se multiplica por el mismo porcentaje.', 'نضرب في النسبة نفسها.', 'It is multiplied by the same percentage.'), math: same('$y=k\\cdot a^{x}$') },
            { title: say('Koadratikoa', 'Cuadrática', 'تربيعية', 'Quadratic'), text: say('Azalerak eta bi neurriren biderkadurak: maximoa erpinean.', 'Áreas y productos de dos medidas: el máximo, en el vértice.', 'المساحات وجداءات قياسين: العظمى عند الرأس.', 'Areas and products of two measurements: the maximum at the vertex.'), math: same('$A(x)=x(1{,}5-x)$') }
        ],
        examplePrompt: say('24 m-ko hesiarekin laukizuzen bat ixten da. Zein neurrik ematen dute azalera handiena?', 'Con 24 m de valla se cierra un rectángulo. ¿Qué medidas dan el área máxima?', 'نُحيط مستطيلًا بسياج طوله 24 م. أيّ أبعاد تعطي أكبر مساحة؟', 'A rectangle is fenced with 24 m of fence. Which measurements give the largest area?'),
        example: same('$\\begin{gathered}A(x)=x(12-x)\\\\ x_{V}=6\\qquad 6\\cdot 6=36\\end{gathered}$'),
        exampleAnswer: say('6 m-ko karratu bat: 36 m².', 'Un cuadrado de 6 m: 36 m².', 'مربع ضلعه 6 م: 36 م².', 'A 6 m square: 36 m².')
    }
}
