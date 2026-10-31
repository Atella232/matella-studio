import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { AffineFigure, ExtremesFigure, InterceptsFigure, LineEquationFigure, ProportionalFigure, ReadFigure, SlopeFigure, TableFigure, VariationFigure } from '../dbh2-funtzioak-v2/figures'
import { ParabolaCutsFigure } from '../dbh4-akademikoak-polinomikoak/figures'
import { DomainGraphFigure } from '../dbh4-aplikatuak-funtzioak/figures'
import { LinearModelsFigure, ParabolaShapesFigure, ParallelFigure, VertexFigure } from '../dbh4-aplikatuak-grafikoa/figures'
import { say, same } from './text'

/* ==========================================================================
   Funtzioak · 3. DBH — stages and lessons. The course lists one topic,
   «Funciones lineales», so it gathers Santillana 3.º ESO units 11
   «Funciones» (graphs and their features) and 12 «Funciones lineales y
   cuadráticas», and Anaya 3.º ESO units 8 «Funciones y gráficas» and 9
   «Funciones lineales». Every number and context is original: the books
   only fix the scope and the order. Each lesson names its typical mistake.
   ========================================================================== */

export type Functions3StageId = 'graphs' | 'features' | 'linear' | 'lines' | 'quadratic'

export const functions3Stages: UnitStage[] = [
    { id: 'graphs', tone: 'blue', title: { eu: 'Funtzioak eta grafikoak', es: 'Funciones y gráficas', en: 'Functions and graphs', ar: 'الدوال والتمثيلات البيانية' } },
    { id: 'features', tone: 'violet', title: { eu: 'Ezaugarriak', es: 'Características', en: 'Features', ar: 'الخصائص' } },
    { id: 'linear', tone: 'mustard', title: { eu: 'Funtzio linealak', es: 'Funciones lineales', en: 'Linear functions', ar: 'الدوال الخطية' } },
    { id: 'lines', tone: 'coral', title: { eu: 'Zuzenak eta ereduak', es: 'Rectas y modelos', en: 'Lines and models', ar: 'المستقيمات والنماذج' } },
    { id: 'quadratic', tone: 'green', title: { eu: 'Funtzio koadratikoak', es: 'Funciones cuadráticas', en: 'Quadratic functions', ar: 'الدوال التربيعية' } }
]

export const functions3Topics: UnitTopic[] = [
    /* ---------- 1. Functions and graphs ---------- */
    {
        id: 'function-concept',
        stage: 'graphs',
        title: say('Funtzio baten kontzeptua', 'Concepto de función', 'مفهوم الدالة', 'What a function is'),
        goal: say('Funtzio bat taula, grafiko eta formula gisa ezagutzea.', 'Reconocer una función como tabla, gráfica y fórmula.', 'التعرّف على الدالة كجدول وتمثيل بياني وصيغة.', 'Recognise a function as a table, a graph and a formula.'),
        explanation: say(
            'Funtzio batek $x$ aldagai independentearen balio bakoitzari $y$ aldagai menpekoaren balio bakar bat lotzen dio. Hiru eratara eman daiteke: taula batean, grafiko batean edo formula batean, adibidez $y=2x+1$. Formula batekin, $x$ ordezkatu eta $y$ kalkulatzen da: $f(3)=2\\cdot 3+1=7$. Grafiko batean, zuzen bertikal batek puntu bakarrean ebaki behar du.',
            'Una función asocia a cada valor de la variable independiente $x$ un único valor de la variable dependiente $y$. Se puede dar de tres formas: con una tabla, con una gráfica o con una fórmula, por ejemplo $y=2x+1$. Con la fórmula, se sustituye $x$ y se calcula $y$: $f(3)=2\\cdot 3+1=7$. En una gráfica, cualquier recta vertical la corta en un solo punto.',
            'تربط الدالة كل قيمة للمتغيّر المستقل $x$ بقيمة واحدة فقط للمتغيّر التابع $y$. ويمكن إعطاؤها بثلاث طرق: بجدول أو بتمثيل بياني أو بصيغة، مثل $y=2x+1$. وبالصيغة نعوّض $x$ ونحسب $y$: $f(3)=2\\cdot 3+1=7$. وفي التمثيل البياني يقطعه أي مستقيم عمودي في نقطة واحدة.',
            'A function gives each value of the independent variable $x$ exactly one value of the dependent variable $y$. It can be given in three ways: as a table, as a graph or as a formula, for example $y=2x+1$. With the formula, substitute $x$ and work out $y$: $f(3)=2\\cdot 3+1=7$. On a graph, any vertical line meets it at one point only.'
        ),
        problem: say('$f(x)=x^{2}-3x$. Zenbat da $f(-2)$?', '$f(x)=x^{2}-3x$. ¿Cuánto vale $f(-2)$?', '$f(x)=x^{2}-3x$. كم يساوي $f(-2)$؟', '$f(x)=x^{2}-3x$. What is $f(-2)$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordezkatu, negatiboa parentesi artean.', 'Sustituye, con el negativo entre paréntesis.', 'عوّض، والسالب بين قوسين.', 'Substitute, with the negative number in brackets.'), math: same('$(-2)^{2}-3\\cdot(-2)$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.', 'Work it out.'), math: same('$4+6=10$') }
        ],
        example: same('$f(0)=0^{2}-3\\cdot 0=0$'),
        mistake: {
            wrong: same('$f(-2)=-2^{2}+6=2$'),
            right: say('Negatiboa parentesi artean karratura: $(-2)^{2}=4$, eta $f(-2)=10$.', 'El negativo va entre paréntesis al cuadrado: $(-2)^{2}=4$, y $f(-2)=10$.', 'يُربَّع السالب بين قوسين: $(-2)^{2}=4$، و$f(-2)=10$.', 'Square the negative number in brackets: $(-2)^{2}=4$, so $f(-2)=10$.')
        },
        takeaway: say('$X$ bakoitzari $Y$ BAKAR bat.', 'A cada $X$, UN SOLO $Y$.', 'لكل $X$ قيمة $Y$ واحدة فقط.', 'Each $X$ gets ONE $Y$ only.'),
        figure: (language) => <TableFigure language={language} />
    },
    {
        id: 'domain-range',
        stage: 'graphs',
        title: say('Definizio-eremua eta ibilbidea', 'Dominio y recorrido', 'المجال والمدى', 'Domain and range'),
        goal: say('Grafiko batean funtzioak hartzen dituen $x$ eta $y$ balioak irakurtzea.', 'Leer en una gráfica qué valores de $x$ y de $y$ toma la función.', 'قراءة قيم $x$ و$y$ التي تأخذها الدالة من تمثيلها البياني.', 'Read off a graph which values of $x$ and $y$ the function takes.'),
        explanation: say(
            'Definizio-eremua funtzioa definituta dagoen $x$ balioen multzoa da: grafikoak ardatz horizontalean hartzen duen tartea. Ibilbidea $y$ balioena da: ardatz bertikalean hartzen duena. Bi muturrak tarte gisa idazten dira: $[-2,5]$ multzoak $-2$ eta $5$ barne hartzen ditu. Formula batean, zatitzailea ezin da zero izan, eta erro karratuaren barrukoa ezin da negatiboa izan.',
            'El dominio es el conjunto de valores de $x$ para los que la función está definida: el tramo que ocupa la gráfica en el eje horizontal. El recorrido es el de los valores de $y$: lo que ocupa en el eje vertical. Se escriben como intervalos: $[-2,5]$ incluye el $-2$ y el $5$. En una fórmula, un denominador no puede ser cero y lo de dentro de una raíz cuadrada no puede ser negativo.',
            'المجال مجموعة قيم $x$ التي تكون الدالة معرّفة عندها: الجزء الذي يشغله التمثيل على المحور الأفقي. والمدى مجموعة قيم $y$: ما يشغله على المحور العمودي. وتُكتب كفترات: $[-2,5]$ تشمل $-2$ و$5$. وفي الصيغة لا يكون المقام صفرًا ولا يكون ما تحت الجذر التربيعي سالبًا.',
            'The domain is the set of values of $x$ where the function is defined: the stretch of the horizontal axis the graph covers. The range is the set of values of $y$: what it covers on the vertical axis. Both are written as intervals: $[-2,5]$ includes $-2$ and $5$. In a formula, a denominator cannot be zero and what is under a square root cannot be negative.'
        ),
        problem: say('Zein da $f(x)=\\frac{1}{x-4}$ funtzioaren definizio-eremutik kanpo geratzen den zenbakia?', '¿Qué número queda fuera del dominio de $f(x)=\\frac{1}{x-4}$?', 'أي عدد يقع خارج مجال $f(x)=\\frac{1}{x-4}$؟', 'Which number is left out of the domain of $f(x)=\\frac{1}{x-4}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izendatzailea ezin da zero izan.', 'El denominador no puede ser cero.', 'لا يكون المقام صفرًا.', 'The denominator cannot be zero.'), math: same('$x-4=0\\ \\to\\ x=4$') }
        ],
        example: same('$[-3,6]\\ \\to\\ 6-(-3)=9$'),
        mistake: {
            wrong: say('Definizio-eremua grafikoaren altuera da.', 'El dominio es la altura de la gráfica.', 'المجال هو ارتفاع التمثيل.', 'The domain is how high the graph goes.'),
            right: say('Altuera ibilbidea da ($y$). Definizio-eremua zabalera da ($x$).', 'La altura es el recorrido ($y$). El dominio es el ancho ($x$).', 'الارتفاع هو المدى ($y$). والمجال هو العرض ($x$).', 'Height is the range ($y$). The domain is the width ($x$).')
        },
        takeaway: say('Eremua: $X$ ardatza. Ibilbidea: $Y$ ardatza.', 'Dominio: eje $X$. Recorrido: eje $Y$.', 'المجال: محور $X$. المدى: محور $Y$.', 'Domain: the $X$ axis. Range: the $Y$ axis.'),
        figure: (language) => <DomainGraphFigure language={language} />
    },
    {
        id: 'reading-graphs',
        stage: 'graphs',
        title: say('Grafikoak irakurri', 'Leer gráficas', 'قراءة التمثيلات البيانية', 'Reading graphs'),
        goal: say('Egoera erreal baten grafikoa interpretatzea.', 'Interpretar la gráfica de una situación real.', 'تفسير التمثيل البياني لموقف حقيقي.', 'Interpret the graph of a real situation.'),
        explanation: say(
            'Grafiko bat irakurtzeko, begiratu lehenik ardatzei: zer neurtzen duten eta zein unitatetan. Puntu bakoitzak $(x,y)$ bikote bat esaten du: «$x$ unean, $y$ balioa». Zati gorakorrek balioa hazten dela esaten dute; zati horizontalek, ez dela aldatzen; beherakorrek, gutxitzen dela. Malda handiagoa, aldaketa azkarragoa.',
            'Para leer una gráfica, mira primero los ejes: qué miden y en qué unidades. Cada punto dice una pareja $(x,y)$: «en el momento $x$, el valor $y$». Los tramos que suben dicen que el valor crece; los horizontales, que no cambia; los que bajan, que disminuye. Cuanto más inclinado, más rápido es el cambio.',
            'لقراءة تمثيل بياني انظر أولًا إلى المحورين: ماذا يقيسان وبأي وحدات. كل نقطة تقول زوجًا $(x,y)$: «في اللحظة $x$ القيمة $y$». الأجزاء الصاعدة تعني أن القيمة تزداد، والأفقية أنها لا تتغيّر، والنازلة أنها تنقص. وكلما زاد الميل كان التغيّر أسرع.',
            'To read a graph, first look at the axes: what they measure and in which units. Each point says a pair $(x,y)$: «at moment $x$, the value $y$». Rising stretches say the value grows; flat ones, that it does not change; falling ones, that it decreases. The steeper, the faster the change.'
        ),
        problem: say('Ibilaldi batean, 2 orduan 8 km egin dira, gero ordubete geldirik, eta itzuli 2 orduan. Zenbat km dira gehienez etxetik?', 'En una excursión se recorren 8 km en 2 horas, se para una hora y se vuelve en 2 horas. ¿A cuántos km se llega de casa como mucho?', 'في رحلة يُقطع 8 كم في ساعتين، ثم توقّف ساعة، ثم عودة في ساعتين. ما أبعد مسافة عن البيت؟', 'On a walk, 8 km are covered in 2 hours, then a one-hour stop, then back in 2 hours. How far from home does it get at most?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zati gorakorra: 8 km-raino.', 'Tramo creciente: hasta 8 km.', 'الجزء الصاعد: حتى 8 كم.', 'Rising stretch: up to 8 km.') },
            { text: say('Geldialdia: altuera bera.', 'Parada: la misma altura.', 'التوقف: الارتفاع نفسه.', 'Stop: the same height.'), math: same('$y=8$') }
        ],
        example: same('$\\frac{8}{2}=4$'),
        mistake: {
            wrong: say('Zati horizontal batean, pertsona azkar dabil.', 'En un tramo horizontal, la persona va deprisa.', 'في الجزء الأفقي يسير الشخص بسرعة.', 'On a flat stretch, the person is moving fast.'),
            right: say('Zati horizontalean distantzia ez da aldatzen: geldirik dago.', 'En un tramo horizontal la distancia no cambia: está parada.', 'في الجزء الأفقي لا تتغيّر المسافة: إنه متوقف.', 'On a flat stretch the distance does not change: they are standing still.')
        },
        takeaway: say('Lehenik ARDATZAK; gero gora, horizontal, behera.', 'Primero los EJES; después sube, horizontal, baja.', 'أولًا المحوران؛ ثم صعود وأفقي ونزول.', 'First the AXES; then up, flat, down.'),
        figure: (language) => <ReadFigure language={language} />
    },
    /* ---------- 2. Features ---------- */
    {
        id: 'growth',
        stage: 'features',
        title: say('Gorakortasuna eta beherakortasuna', 'Crecimiento y decrecimiento', 'التزايد والتناقص', 'Increasing and decreasing'),
        goal: say('Funtzio bat non hazten eta non gutxitzen den tarteetan idaztea.', 'Escribir en intervalos dónde crece y dónde decrece una función.', 'كتابة أين تتزايد الدالة وأين تتناقص بالفترات.', 'Write in intervals where a function increases and where it decreases.'),
        explanation: say(
            'Funtzio bat gorakorra da tarte batean, ezkerretik eskuinera joatean grafikoa igotzen bada: $x$ handitzean $y$ ere handitzen da. Beherakorra da jaisten bada, eta konstantea horizontala bada. Tarteak beti $x$ ardatzean irakurtzen dira: $(1,4)$ tartean gorakorra esan nahi du $x$ 1 eta 4 artean dagoenean igotzen dela.',
            'Una función es creciente en un intervalo si, al ir de izquierda a derecha, la gráfica sube: al aumentar $x$ también aumenta $y$. Es decreciente si baja, y constante si es horizontal. Los intervalos se leen siempre en el eje $x$: creciente en $(1,4)$ quiere decir que sube cuando $x$ está entre 1 y 4.',
            'تكون الدالة متزايدة على فترة إذا صعد تمثيلها من اليسار إلى اليمين: عندما يزداد $x$ يزداد $y$ أيضًا. وتكون متناقصة إذا نزل، وثابتة إذا كان أفقيًا. وتُقرأ الفترات دائمًا على المحور $x$: متزايدة على $(1,4)$ تعني أنها تصعد عندما يكون $x$ بين 1 و4.',
            'A function is increasing on an interval if, going from left to right, the graph rises: as $x$ grows, $y$ grows too. It is decreasing if it falls, and constant if it is flat. Intervals are always read on the $x$ axis: increasing on $(1,4)$ means it rises when $x$ is between 1 and 4.'
        ),
        problem: say('$f(x)=x^{2}$. Gorakorra ala beherakorra da $x<0$ denean?', '$f(x)=x^{2}$. ¿Es creciente o decreciente para $x<0$?', '$f(x)=x^{2}$. هل هي متزايدة أم متناقصة عندما $x<0$؟', '$f(x)=x^{2}$. Is it increasing or decreasing for $x<0$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Probatu bi balio.', 'Prueba dos valores.', 'جرّب قيمتين.', 'Try two values.'), math: same('$f(-3)=9,\\ f(-1)=1$') },
            { text: say('$x$ handitzean $y$ gutxitzen da: beherakorra.', 'Al aumentar $x$ disminuye $y$: decreciente.', 'عندما يزداد $x$ ينقص $y$: متناقصة.', 'As $x$ grows, $y$ falls: decreasing.') }
        ],
        example: same('$f(1)=1<f(3)=9$'),
        mistake: {
            wrong: say('Tarteak $y$ ardatzean idazten dira: gorakorra $(2,8)$ tartean, $y$ balioa 2 eta 8 artean dagoelako.', 'Los intervalos se escriben en el eje $y$: creciente en $(2,8)$ porque $y$ va de 2 a 8.', 'تُكتب الفترات على المحور $y$: متزايدة على $(2,8)$ لأن $y$ يذهب من 2 إلى 8.', 'Intervals are written on the $y$ axis: increasing on $(2,8)$ because $y$ goes from 2 to 8.'),
            right: say('Tarteak $x$ ardatzekoak dira: begiratu non dagoen $x$ grafikoa igotzen denean.', 'Los intervalos son del eje $x$: mira dónde está $x$ mientras la gráfica sube.', 'الفترات على المحور $x$: انظر أين يكون $x$ بينما يصعد التمثيل.', 'Intervals are on the $x$ axis: look where $x$ is while the graph rises.')
        },
        takeaway: say('Ezkerretik eskuinera: igo = GORAKORRA, jaitsi = BEHERAKORRA.', 'De izquierda a derecha: sube = CRECIENTE, baja = DECRECIENTE.', 'من اليسار إلى اليمين: صعود = متزايدة، نزول = متناقصة.', 'Left to right: up = INCREASING, down = DECREASING.'),
        figure: (language) => <VariationFigure language={language} />
    },
    {
        id: 'extremes',
        stage: 'features',
        title: say('Maximoak eta minimoak', 'Máximos y mínimos', 'القيم العظمى والصغرى', 'Maxima and minima'),
        goal: say('Funtzio baten maximo eta minimo erlatiboak eta absolutuak aurkitzea.', 'Encontrar los máximos y mínimos relativos y absolutos de una función.', 'إيجاد القيم العظمى والصغرى النسبية والمطلقة لدالة.', 'Find the relative and absolute maxima and minima of a function.'),
        explanation: say(
            'Maximo erlatibo bat funtzioa gorakorra izatetik beherakorra izatera pasatzen den puntua da: tontor bat. Minimo erlatiboa, beherakorretik gorakorrera: haran bat. Maximo absolutua grafiko osoko punturik altuena da. Puntu bat $(x,y)$ bikote gisa ematen da: $x$ non dagoen, eta $y$ zenbat balio duen.',
            'Un máximo relativo es un punto donde la función pasa de crecer a decrecer: una cima. Un mínimo relativo, donde pasa de decrecer a crecer: un valle. El máximo absoluto es el punto más alto de toda la gráfica. Un punto se da como pareja $(x,y)$: dónde está $x$ y cuánto vale $y$.',
            'القيمة العظمى النسبية نقطة تنتقل فيها الدالة من التزايد إلى التناقص: قمة. والصغرى النسبية من التناقص إلى التزايد: وادٍ. والعظمى المطلقة أعلى نقطة في التمثيل كله. وتُعطى النقطة كزوج $(x,y)$: أين يقع $x$ وكم يساوي $y$.',
            'A relative maximum is where the function stops increasing and starts decreasing: a peak. A relative minimum, where it stops decreasing and starts increasing: a valley. The absolute maximum is the highest point of the whole graph. A point is given as a pair $(x,y)$: where $x$ is and what $y$ is.'
        ),
        problem: say('Taula: $x=0,1,2,3,4$ eta $y=2,5,6,3,1$. Zein da maximoa?', 'Tabla: $x=0,1,2,3,4$ e $y=2,5,6,3,1$. ¿Cuál es el máximo?', 'الجدول: $x=0,1,2,3,4$ و$y=2,5,6,3,1$. ما القيمة العظمى؟', 'Table: $x=0,1,2,3,4$ and $y=2,5,6,3,1$. What is the maximum?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$y$ balioa 6 arte igotzen da eta gero jaisten da.', '$y$ sube hasta 6 y luego baja.', 'يصعد $y$ إلى 6 ثم ينزل.', '$y$ rises to 6 and then falls.') },
            { text: say('Maximoa:', 'Máximo:', 'العظمى:', 'Maximum:'), math: same('$(2,6)$') }
        ],
        example: same('$(-1,-4)$'),
        mistake: {
            wrong: say('Maximoa $x=2$ da.', 'El máximo es $x=2$.', 'العظمى هي $x=2$.', 'The maximum is $x=2$.'),
            right: say('Maximoa puntu bat da, $(2,6)$: $x=2$ denean, $y$ balio handiena 6 da.', 'El máximo es un punto, $(2,6)$: en $x=2$ el mayor valor de $y$ es 6.', 'العظمى نقطة $(2,6)$: عند $x=2$ تكون أكبر قيمة لـ$y$ هي 6.', 'The maximum is a point, $(2,6)$: at $x=2$ the largest value of $y$ is 6.')
        },
        takeaway: say('Maximoa: GORA → BEHERA. Minimoa: BEHERA → GORA.', 'Máximo: SUBE → BAJA. Mínimo: BAJA → SUBE.', 'العظمى: صعود ← نزول. الصغرى: نزول ← صعود.', 'Maximum: UP → DOWN. Minimum: DOWN → UP.'),
        figure: (language) => <ExtremesFigure language={language} />
    },
    {
        id: 'intercepts',
        stage: 'features',
        title: say('Ardatzekiko ebaki-puntuak', 'Puntos de corte con los ejes', 'نقاط التقاطع مع المحورين', 'Where a graph meets the axes'),
        goal: say('Grafikoak ardatzak non mozten dituen kalkulatzea.', 'Calcular dónde corta la gráfica a los ejes.', 'حساب أين يقطع التمثيل المحورين.', 'Work out where the graph meets the axes.'),
        explanation: say(
            'Y ardatza mozteko, $x=0$ ordezkatu: $(0,f(0))$ puntua. X ardatza mozteko, $f(x)=0$ ekuazioa ebatzi: ebazpen bakoitza $(x,0)$ puntu bat da. Funtzio batek Y ardatza puntu batean gehienez mozten du, baina X ardatza hainbat puntutan.',
            'Para cortar el eje Y, se sustituye $x=0$: el punto $(0,f(0))$. Para cortar el eje X, se resuelve la ecuación $f(x)=0$: cada solución es un punto $(x,0)$. Una función corta el eje Y como mucho en un punto, pero el eje X puede cortarlo en varios.',
            'لإيجاد التقاطع مع محور Y نعوّض $x=0$: النقطة $(0,f(0))$. ولإيجاد التقاطع مع محور X نحلّ $f(x)=0$: كل حل نقطة $(x,0)$. وتقطع الدالة محور Y في نقطة واحدة على الأكثر، لكنها قد تقطع محور X في عدة نقاط.',
            'To meet the Y axis, substitute $x=0$: the point $(0,f(0))$. To meet the X axis, solve $f(x)=0$: each solution is a point $(x,0)$. A function meets the Y axis at most once, but it can meet the X axis several times.'
        ),
        problem: say('$f(x)=2x-6$. Non mozten ditu ardatzak?', '$f(x)=2x-6$. ¿Dónde corta a los ejes?', '$f(x)=2x-6$. أين تقطع المحورين؟', '$f(x)=2x-6$. Where does it meet the axes?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Y ardatza: $x=0$.', 'Eje Y: $x=0$.', 'محور Y: $x=0$.', 'Y axis: $x=0$.'), math: same('$f(0)=-6\\ \\to\\ (0,-6)$') },
            { text: say('X ardatza: $f(x)=0$.', 'Eje X: $f(x)=0$.', 'محور X: $f(x)=0$.', 'X axis: $f(x)=0$.'), math: same('$2x-6=0\\ \\to\\ (3,0)$') }
        ],
        example: same('$x^{2}-9=0\\ \\to\\ x=\\pm 3$'),
        mistake: {
            wrong: say('X ardatza mozteko $x=0$ ordezkatu.', 'Para cortar el eje X se sustituye $x=0$.', 'لقطع محور X نعوّض $x=0$.', 'To meet the X axis, substitute $x=0$.'),
            right: say('Alderantziz: X ardatzean $y=0$ da. $x=0$ Y ardatzerako da.', 'Al revés: en el eje X es $y=0$. $x=0$ es para el eje Y.', 'بالعكس: على محور X يكون $y=0$. و$x=0$ لمحور Y.', 'The other way round: on the X axis $y=0$. $x=0$ is for the Y axis.')
        },
        takeaway: say('Y ardatza: $X=0$. X ardatza: $Y=0$.', 'Eje Y: $X=0$. Eje X: $Y=0$.', 'محور Y: $X=0$. محور X: $Y=0$.', 'Y axis: $X=0$. X axis: $Y=0$.'),
        figure: (language) => <InterceptsFigure language={language} />
    },
    /* ---------- 3. Linear functions ---------- */
    {
        id: 'proportional',
        stage: 'linear',
        title: say('Proportzionaltasun zuzeneko funtzioak', 'Funciones de proporcionalidad directa', 'دوال التناسب الطردي', 'Direct proportion functions'),
        goal: say('$y=mx$ funtzioak ezagutzea eta haien grafikoa marraztea.', 'Reconocer las funciones $y=mx$ y dibujar su gráfica.', 'التعرّف على الدوال $y=mx$ ورسم تمثيلها.', 'Recognise the functions $y=mx$ and draw their graph.'),
        explanation: say(
            'Bi magnitude zuzenki proportzionalak badira, haien funtzioa $y=mx$ da: zuzen bat jatorritik igarotzen dena. $m$ zenbakia proportzionaltasun-konstantea da, eta $\\frac{y}{x}$ zatidurak beti $m$ ematen du. Marrazteko nahikoa dira jatorria eta beste puntu bat: $x=1$ denean, $y=m$.',
            'Si dos magnitudes son directamente proporcionales, su función es $y=mx$: una recta que pasa por el origen. El número $m$ es la constante de proporcionalidad, y el cociente $\\frac{y}{x}$ siempre da $m$. Para dibujarla basta con el origen y otro punto: si $x=1$, $y=m$.',
            'إذا كان مقداران متناسبين طرديًا فدالتهما $y=mx$: مستقيم يمر بالأصل. والعدد $m$ ثابت التناسب، والقسمة $\\frac{y}{x}$ تعطي دائمًا $m$. ولرسمه يكفي الأصل ونقطة أخرى: إذا $x=1$ فإن $y=m$.',
            'If two quantities are in direct proportion, their function is $y=mx$: a line through the origin. The number $m$ is the constant of proportionality, and the ratio $\\frac{y}{x}$ always gives $m$. To draw it you only need the origin and one more point: if $x=1$, $y=m$.'
        ),
        problem: say('3 kg sagarrek 6 € balio dute. Zein da funtzioa, eta zenbat balio dute 7 kg-k?', '3 kg de manzanas cuestan 6 €. ¿Cuál es la función y cuánto cuestan 7 kg?', '3 كغ تفاح بـ 6 يورو. ما الدالة وكم ثمن 7 كغ؟', '3 kg of apples cost 6 €. What is the function and how much do 7 kg cost?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Konstantea.', 'La constante.', 'الثابت.', 'The constant.'), math: same('$m=\\frac{6}{3}=2\\ \\to\\ y=2x$') },
            { text: say('Ordezkatu.', 'Sustituye.', 'عوّض.', 'Substitute.'), math: same('$2\\cdot 7=14$') }
        ],
        example: same('$\\frac{15}{5}=\\frac{6}{2}=3$'),
        mistake: {
            wrong: say('$y=2x+1$ proportzionaltasun zuzenekoa da, zuzen bat delako.', '$y=2x+1$ es de proporcionalidad directa porque es una recta.', '$y=2x+1$ تناسب طردي لأنه مستقيم.', '$y=2x+1$ is a direct proportion because it is a line.'),
            right: say('Ez da jatorritik igarotzen ($x=0$ denean $y=1$): afina da, ez proportzionala.', 'No pasa por el origen ($x=0$ da $y=1$): es afín, no proporcional.', 'لا يمر بالأصل ($x=0$ يعطي $y=1$): إنها تآلفية لا تناسبية.', 'It does not go through the origin ($x=0$ gives $y=1$): it is affine, not proportional.')
        },
        takeaway: say('$Y=MX$: zuzena JATORRITIK, $M=\\frac{Y}{X}$.', '$Y=MX$: recta por el ORIGEN, $M=\\frac{Y}{X}$.', '$Y=MX$: مستقيم يمر بالأصل، $M=\\frac{Y}{X}$.', '$Y=MX$: a line through the ORIGIN, $M=\\frac{Y}{X}$.'),
        figure: (language) => <ProportionalFigure language={language} />
    },
    {
        id: 'slope',
        stage: 'linear',
        title: say('Malda', 'La pendiente', 'الميل', 'The slope'),
        goal: say('Zuzen baten malda bi puntutatik kalkulatzea eta interpretatzea.', 'Calcular la pendiente de una recta a partir de dos puntos e interpretarla.', 'حساب ميل مستقيم من نقطتين وتفسيره.', 'Work out the slope of a line from two points and interpret it.'),
        explanation: say(
            'Malda $m$ da $x$ unitate bat aurreratzean $y$ zenbat aldatzen den: $m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$. Positiboa bada zuzena igotzen da, negatiboa bada jaisten da, eta zero bada horizontala da. Zenbat eta handiagoa (balio absolutuan), orduan eta inklinatuagoa. Bi puntuetan ordena bera erabili: goian eta behean.',
            'La pendiente $m$ es cuánto cambia $y$ cuando $x$ avanza una unidad: $m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$. Si es positiva la recta sube, si es negativa baja, y si es cero es horizontal. Cuanto mayor (en valor absoluto), más inclinada. Usa el mismo orden de los puntos arriba y abajo.',
            'الميل $m$ هو مقدار تغيّر $y$ عندما يتقدم $x$ وحدة واحدة: $m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$. إذا كان موجبًا يصعد المستقيم، وإذا كان سالبًا ينزل، وإذا كان صفرًا فهو أفقي. وكلما كبر (بالقيمة المطلقة) زاد الانحدار. استعمل ترتيب النقطتين نفسه في الأعلى والأسفل.',
            'The slope $m$ is how much $y$ changes when $x$ moves on by one unit: $m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$. If it is positive the line rises, if negative it falls, and if zero it is flat. The larger it is (ignoring the sign), the steeper. Use the same order of the points on top and below.'
        ),
        problem: say('$A=(1,2)$ eta $B=(4,11)$. Zein da malda?', '$A=(1,2)$ y $B=(4,11)$. ¿Cuál es la pendiente?', '$A=(1,2)$ و$B=(4,11)$. ما الميل؟', '$A=(1,2)$ and $B=(4,11)$. What is the slope?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Igoera zati aurrerapena.', 'Subida entre avance.', 'الصعود على التقدم.', 'Rise over run.'), math: same('$m=\\frac{11-2}{4-1}=\\frac{9}{3}=3$') }
        ],
        example: same('$m=\\frac{-6}{2}=-3$'),
        mistake: {
            wrong: same('$m=\\frac{4-1}{11-2}=\\frac{1}{3}$'),
            right: say('Malda $y$ aldaketa zati $x$ aldaketa da, ez alderantziz: $\\frac{9}{3}=3$.', 'La pendiente es el cambio de $y$ entre el cambio de $x$, no al revés: $\\frac{9}{3}=3$.', 'الميل تغيّر $y$ على تغيّر $x$ لا العكس: $\\frac{9}{3}=3$.', 'The slope is the change in $y$ over the change in $x$, not the other way round: $\\frac{9}{3}=3$.')
        },
        takeaway: same('$M=\\frac{Y_{2}-Y_{1}}{X_{2}-X_{1}}$'),
        figure: (language) => <SlopeFigure language={language} />
    },
    {
        id: 'affine',
        stage: 'linear',
        title: say('Funtzio afinak', 'Funciones afines', 'الدوال التآلفية', 'Affine functions'),
        goal: say('$y=mx+n$ funtzioa irakurtzea eta marraztea.', 'Leer y dibujar la función $y=mx+n$.', 'قراءة الدالة $y=mx+n$ ورسمها.', 'Read and draw the function $y=mx+n$.'),
        explanation: say(
            'Funtzio afin baten formula $y=mx+n$ da: $m$ malda da eta $n$ jatorriko ordenatua, zuzenak Y ardatza mozten duen puntua $(0,n)$. Marrazteko: jarri $(0,n)$ puntua, eta handik aurreratu 1 eskuinera eta $m$ gora (edo behera, $m$ negatiboa bada). $n=0$ bada, proportzionaltasun zuzenekoa da.',
            'La fórmula de una función afín es $y=mx+n$: $m$ es la pendiente y $n$ la ordenada en el origen, el punto $(0,n)$ donde la recta corta al eje Y. Para dibujarla: marca $(0,n)$ y desde ahí avanza 1 a la derecha y $m$ hacia arriba (o hacia abajo si $m$ es negativa). Si $n=0$, es de proporcionalidad directa.',
            'صيغة الدالة التآلفية $y=mx+n$: $m$ الميل و$n$ الجزء المقطوع، أي النقطة $(0,n)$ حيث يقطع المستقيم محور Y. لرسمها: ضع $(0,n)$ ثم تقدّم 1 إلى اليمين و$m$ إلى الأعلى (أو إلى الأسفل إن كان $m$ سالبًا). وإذا $n=0$ فهي تناسب طردي.',
            'The formula of an affine function is $y=mx+n$: $m$ is the slope and $n$ the intercept, the point $(0,n)$ where the line meets the Y axis. To draw it: mark $(0,n)$ and from there move 1 to the right and $m$ up (or down if $m$ is negative). If $n=0$, it is a direct proportion.'
        ),
        problem: say('Marraztu $y=-2x+3$.', 'Dibuja $y=-2x+3$.', 'ارسم $y=-2x+3$.', 'Draw $y=-2x+3$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Y ardatzarekiko puntua.', 'Punto en el eje Y.', 'النقطة على محور Y.', 'Point on the Y axis.'), math: same('$(0,3)$') },
            { text: say('1 eskuinera, 2 behera.', '1 a la derecha, 2 hacia abajo.', '1 يمينًا و2 إلى الأسفل.', '1 to the right, 2 down.'), math: same('$(1,1)$') },
            { text: say('Egiaztatu beste puntu bat.', 'Comprueba otro punto.', 'تحقّق بنقطة أخرى.', 'Check another point.'), math: same('$-2\\cdot 2+3=-1$') }
        ],
        example: same('$\\frac{1}{2}\\cdot 2-1=0$'),
        mistake: {
            wrong: say('$y=3x-2$ zuzenak Y ardatza $(0,3)$ puntuan mozten du.', 'La recta $y=3x-2$ corta al eje Y en $(0,3)$.', 'المستقيم $y=3x-2$ يقطع محور Y في $(0,3)$.', 'The line $y=3x-2$ meets the Y axis at $(0,3)$.'),
            right: say('3 malda da. Ebaki-puntua $n=-2$ da: $(0,-2)$.', 'El 3 es la pendiente. El corte es $n=-2$: $(0,-2)$.', '3 هو الميل. والتقاطع $n=-2$: $(0,-2)$.', '3 is the slope. The intercept is $n=-2$: $(0,-2)$.')
        },
        takeaway: say('$Y=MX+N$: $M$ malda, $N$ Y ardatzean.', '$Y=MX+N$: $M$ pendiente, $N$ en el eje Y.', '$Y=MX+N$: $M$ الميل و$N$ على محور Y.', '$Y=MX+N$: $M$ slope, $N$ on the Y axis.'),
        figure: (language) => <AffineFigure language={language} />
    },
    /* ---------- 4. Lines and models ---------- */
    {
        id: 'two-points',
        stage: 'lines',
        title: say('Bi puntutatik igarotzen den zuzena', 'Recta que pasa por dos puntos', 'المستقيم المار بنقطتين', 'The line through two points'),
        goal: say('Bi puntu ezagututa, zuzenaren ekuazioa aurkitzea.', 'Hallar la ecuación de la recta conociendo dos puntos.', 'إيجاد معادلة المستقيم بمعرفة نقطتين.', 'Find the equation of the line through two known points.'),
        explanation: say(
            'Bi puntu ezagututa, lehenik kalkulatu malda: $m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$. Gero, ordezkatu puntu bat $y=mx+n$ formulan eta bakandu $n$. Adibidez, $(2,7)$ puntua eta $m=3$: $7=3\\cdot 2+n$, beraz $n=1$, eta zuzena $y=3x+1$. Egiaztatu beste puntuarekin.',
            'Conociendo dos puntos, primero calcula la pendiente: $m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$. Después sustituye un punto en $y=mx+n$ y despeja $n$. Por ejemplo, con el punto $(2,7)$ y $m=3$: $7=3\\cdot 2+n$, así que $n=1$ y la recta es $y=3x+1$. Comprueba con el otro punto.',
            'بمعرفة نقطتين احسب أولًا الميل: $m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$. ثم عوّض نقطة في $y=mx+n$ واعزل $n$. مثلًا بالنقطة $(2,7)$ و$m=3$: $7=3\\cdot 2+n$، إذن $n=1$ والمستقيم $y=3x+1$. تحقّق بالنقطة الأخرى.',
            'Knowing two points, first work out the slope: $m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$. Then substitute one point in $y=mx+n$ and isolate $n$. For example, with the point $(2,7)$ and $m=3$: $7=3\\cdot 2+n$, so $n=1$ and the line is $y=3x+1$. Check with the other point.'
        ),
        problem: say('Aurkitu $(1,5)$ eta $(3,9)$ puntuetatik igarotzen den zuzena.', 'Halla la recta que pasa por $(1,5)$ y $(3,9)$.', 'جد المستقيم المار بـ$(1,5)$ و$(3,9)$.', 'Find the line through $(1,5)$ and $(3,9)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Malda.', 'Pendiente.', 'الميل.', 'Slope.'), math: same('$m=\\frac{9-5}{3-1}=2$') },
            { text: say('Ordezkatu $(1,5)$.', 'Sustituye $(1,5)$.', 'عوّض $(1,5)$.', 'Substitute $(1,5)$.'), math: same('$5=2\\cdot 1+n\\ \\to\\ n=3$') },
            { text: say('Zuzena eta egiaztapena.', 'Recta y comprobación.', 'المستقيم والتحقق.', 'Line and check.'), math: same('$y=2x+3:\\ 2\\cdot 3+3=9$') }
        ],
        example: same('$m=\\frac{0-4}{2-0}=-2$'),
        mistake: {
            wrong: say('$m=2$ eta $(1,5)$: $n=5$, beraz $y=2x+5$.', '$m=2$ y $(1,5)$: $n=5$, así que $y=2x+5$.', '$m=2$ و$(1,5)$: $n=5$، إذن $y=2x+5$.', '$m=2$ and $(1,5)$: $n=5$, so $y=2x+5$.'),
            right: say('$n$ ez da puntuaren $y$, $x=0$ denean ez badago: $5=2\\cdot 1+n$, $n=3$.', '$n$ no es la $y$ del punto si no está en $x=0$: $5=2\\cdot 1+n$, $n=3$.', '$n$ ليس $y$ للنقطة إن لم تكن عند $x=0$: $5=2\\cdot 1+n$، $n=3$.', '$n$ is not the $y$ of the point unless it is at $x=0$: $5=2\\cdot 1+n$, $n=3$.')
        },
        takeaway: say('Lehenik $M$; gero puntu bat ordezkatu $N$ lortzeko.', 'Primero $M$; después sustituye un punto para hallar $N$.', 'أولًا $M$؛ ثم عوّض نقطة لإيجاد $N$.', 'First $M$; then substitute a point to find $N$.'),
        figure: (language) => <LineEquationFigure language={language} />
    },
    {
        id: 'parallel-lines',
        stage: 'lines',
        title: say('Zuzen paraleloak eta ebakidurak', 'Rectas paralelas y cortes', 'المستقيمات المتوازية والتقاطعات', 'Parallel lines and crossings'),
        goal: say('Bi zuzen paraleloak diren jakitea eta haien ebakidura-puntua kalkulatzea.', 'Saber si dos rectas son paralelas y calcular su punto de corte.', 'معرفة ما إذا كان مستقيمان متوازيين وحساب نقطة تقاطعهما.', 'Tell whether two lines are parallel and work out where they cross.'),
        explanation: say(
            'Bi zuzen paraleloak dira malda bera badute eta $n$ desberdina: $y=2x+1$ eta $y=2x-3$. Malda desberdina badute, puntu batean ebakitzen dira. Ebakidura kalkulatzeko, berdindu bi adierazpenak: $mx+n=m^{\\prime}x+n^{\\prime}$, eta ebatzi $x$. Gero ordezkatu $y$ lortzeko. Sistemen ebazpen grafikoa da, berriro.',
            'Dos rectas son paralelas si tienen la misma pendiente y distinto $n$: $y=2x+1$ e $y=2x-3$. Si tienen distinta pendiente, se cortan en un punto. Para hallar el corte, se igualan las dos expresiones: $mx+n=m^{\\prime}x+n^{\\prime}$, y se resuelve $x$. Después se sustituye para obtener $y$. Es otra vez la resolución gráfica de sistemas.',
            'يتوازى مستقيمان إذا كان لهما الميل نفسه و$n$ مختلف: $y=2x+1$ و$y=2x-3$. وإذا اختلف الميلان تقاطعا في نقطة. ولإيجاد التقاطع نساوي العبارتين: $mx+n=m^{\\prime}x+n^{\\prime}$ ونحلّ بالنسبة إلى $x$، ثم نعوّض لإيجاد $y$. إنه مرة أخرى الحل البياني للأنظمة.',
            'Two lines are parallel if they have the same slope and a different $n$: $y=2x+1$ and $y=2x-3$. If their slopes differ, they cross at one point. To find it, set the two expressions equal: $mx+n=m^{\\prime}x+n^{\\prime}$, and solve for $x$. Then substitute to get $y$. It is the graphical way of solving systems again.'
        ),
        problem: say('$y=3x-1$ eta $y=x+5$. Non ebakitzen dira?', '$y=3x-1$ e $y=x+5$. ¿Dónde se cortan?', '$y=3x-1$ و$y=x+5$. أين يتقاطعان؟', '$y=3x-1$ and $y=x+5$. Where do they cross?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Berdindu.', 'Iguala.', 'ساوِ.', 'Set equal.'), math: same('$3x-1=x+5\\ \\to\\ x=3$') },
            { text: say('Ordezkatu.', 'Sustituye.', 'عوّض.', 'Substitute.'), math: same('$y=3+5=8\\ \\to\\ (3,8)$') }
        ],
        example: same('$m_{1}=m_{2}=-1$'),
        mistake: {
            wrong: say('$y=2x+1$ eta $y=x+1$ paraleloak dira, $n$ bera dutelako.', '$y=2x+1$ e $y=x+1$ son paralelas porque tienen el mismo $n$.', '$y=2x+1$ و$y=x+1$ متوازيان لأن لهما $n$ نفسه.', '$y=2x+1$ and $y=x+1$ are parallel because they have the same $n$.'),
            right: say('$n$ bera dutenek Y ardatzean ebakitzen dute, $(0,1)$ puntuan. Paraleloek malda bera dute.', 'Con el mismo $n$ se cortan en el eje Y, en $(0,1)$. Las paralelas tienen la misma pendiente.', 'لهما $n$ نفسه فيتقاطعان على محور Y في $(0,1)$. والمتوازيان لهما الميل نفسه.', 'With the same $n$ they cross on the Y axis, at $(0,1)$. Parallel lines have the same slope.')
        },
        takeaway: say('Paraleloak: $M$ BERA. Ebakidura: berdindu.', 'Paralelas: la MISMA $M$. Corte: igualar.', 'المتوازيان: $M$ نفسه. التقاطع: المساواة.', 'Parallel: the SAME $M$. Crossing: set equal.'),
        figure: (language) => <ParallelFigure language={language} />
    },
    {
        id: 'linear-problems',
        stage: 'lines',
        title: say('Eredu linealak', 'Modelos lineales', 'النماذج الخطية', 'Linear models'),
        goal: say('Egoera erreal bat funtzio afin batekin adieraztea eta erabiltzea.', 'Expresar una situación real con una función afín y usarla.', 'التعبير عن موقف حقيقي بدالة تآلفية واستعمالها.', 'Describe a real situation with an affine function and use it.'),
        explanation: say(
            'Tarifa askok funtzio afin bat jarraitzen dute: zati finko bat ($n$) gehi unitate bakoitzeko prezioa ($m$). Taxi batek 3 € kobratzen ditu hasteko eta 1,50 € km bakoitzeko: $y=1{,}5x+3$. Bi tarifa konparatzeko, berdindu: ebakidura-puntuaren ezkerrean bata merkeagoa da, eta eskuinean bestea.',
            'Muchas tarifas siguen una función afín: una parte fija ($n$) más un precio por cada unidad ($m$). Un taxi cobra 3 € por empezar y 1,50 € por kilómetro: $y=1{,}5x+3$. Para comparar dos tarifas se igualan: a la izquierda del punto de corte una es más barata y a la derecha, la otra.',
            'تتبع تعريفات كثيرة دالة تآلفية: جزء ثابت ($n$) زائد سعر لكل وحدة ($m$). سيارة أجرة تأخذ 3 يورو للانطلاق و1.50 يورو لكل كيلومتر: $y=1{,}5x+3$. ولمقارنة تعريفتين نساويهما: على يسار نقطة التقاطع تكون إحداهما أرخص، وعلى يمينها الأخرى.',
            'Many prices follow an affine function: a fixed part ($n$) plus a price per unit ($m$). A taxi charges 3 € to start and 1.50 € per kilometre: $y=1{,}5x+3$. To compare two prices, set them equal: to the left of the crossing one is cheaper, to the right the other.'
        ),
        problem: say('A tarifa: 10 € gehi 2 € orduko. B tarifa: 4 € orduko. Zenbat ordutan balio dute berdin?', 'Tarifa A: 10 € más 2 € por hora. Tarifa B: 4 € por hora. ¿A cuántas horas cuestan lo mismo?', 'التعريفة A: 10 يورو زائد 2 يورو للساعة. التعريفة B: 4 يورو للساعة. بعد كم ساعة تتساويان؟', 'Price A: 10 € plus 2 € an hour. Price B: 4 € an hour. After how many hours do they cost the same?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Funtzioak.', 'Las funciones.', 'الدالتان.', 'The functions.'), math: same('$y=2x+10,\\ y=4x$') },
            { text: say('Berdindu.', 'Iguala.', 'ساوِ.', 'Set equal.'), math: same('$2x+10=4x\\ \\to\\ x=5$') }
        ],
        example: same('$1{,}5\\cdot 8+3=15$'),
        mistake: {
            wrong: say('Taxia: 3 € hasteko eta 1,50 € km-ko. 8 km: $3\\cdot 8+1{,}5=25{,}5$ €.', 'Taxi: 3 € de bajada y 1,50 € el km. 8 km: $3\\cdot 8+1{,}5=25{,}5$ €.', 'سيارة أجرة: 3 يورو انطلاق و1.50 يورو للكيلومتر. 8 كم: $3\\cdot 8+1{,}5=25{,}5$ يورو.', 'Taxi: 3 € to start and 1.50 € per km. 8 km: $3\\cdot 8+1{,}5=25{,}5$ €.'),
            right: say('Km kopurua prezioaz biderkatzen da, eta zati finkoa batu: $1{,}5\\cdot 8+3=15$ €.', 'Se multiplica el precio por los km y se suma la parte fija: $1{,}5\\cdot 8+3=15$ €.', 'نضرب السعر في الكيلومترات ونضيف الجزء الثابت: $1{,}5\\cdot 8+3=15$ يورو.', 'Multiply the price by the km and add the fixed part: $1{,}5\\cdot 8+3=15$ €.')
        },
        takeaway: say('Tarifa = $M$ · unitateak + $N$ finkoa.', 'Tarifa = $M$ · unidades + $N$ fijo.', 'التعريفة = $M$ · الوحدات + $N$ الثابت.', 'Price = $M$ · units + fixed $N$.'),
        figure: (language) => <LinearModelsFigure language={language} />
    },
    /* ---------- 5. Quadratic functions ---------- */
    {
        id: 'parabola-shape',
        stage: 'quadratic',
        title: say('Parabola', 'La parábola', 'القطع المكافئ', 'The parabola'),
        goal: say('$y=ax^{2}+bx+c$ funtzioaren grafikoa parabola bat dela eta $a$ zeinuak zer esaten duen jakitea.', 'Saber que la gráfica de $y=ax^{2}+bx+c$ es una parábola y qué dice el signo de $a$.', 'معرفة أن تمثيل $y=ax^{2}+bx+c$ قطع مكافئ وما تقوله إشارة $a$.', 'Know that the graph of $y=ax^{2}+bx+c$ is a parabola and what the sign of $a$ tells you.'),
        explanation: say(
            'Funtzio koadratiko baten grafikoa parabola bat da. $a>0$ bada, adarrak gora doaz (minimo bat du); $a<0$ bada, behera (maximo bat). $|a|$ zenbat eta handiagoa, orduan eta estuagoa. $c$ zenbakia Y ardatzarekiko ebaki-puntua da: $(0,c)$. Parabola simetrikoa da erpinetik igarotzen den zuzen bertikal batekiko.',
            'La gráfica de una función cuadrática es una parábola. Si $a>0$, las ramas van hacia arriba (tiene un mínimo); si $a<0$, hacia abajo (un máximo). Cuanto mayor es $|a|$, más estrecha. El número $c$ es el corte con el eje Y: $(0,c)$. La parábola es simétrica respecto a la recta vertical que pasa por el vértice.',
            'تمثيل الدالة التربيعية قطع مكافئ. إذا $a>0$ تتجه الفرعان إلى الأعلى (لها صغرى)، وإذا $a<0$ إلى الأسفل (لها عظمى). وكلما كبر $|a|$ ضاق القطع. والعدد $c$ هو التقاطع مع محور Y: $(0,c)$. والقطع متناظر بالنسبة إلى المستقيم العمودي المار بالرأس.',
            'The graph of a quadratic function is a parabola. If $a>0$, the arms point up (it has a minimum); if $a<0$, down (a maximum). The larger $|a|$, the narrower it is. The number $c$ is where it meets the Y axis: $(0,c)$. The parabola is symmetric about the vertical line through its vertex.'
        ),
        problem: say('$y=-2x^{2}+3x+5$: gora ala behera irekitzen da, eta non mozten du Y ardatza?', '$y=-2x^{2}+3x+5$: ¿se abre hacia arriba o hacia abajo, y dónde corta al eje Y?', '$y=-2x^{2}+3x+5$: هل ينفتح إلى الأعلى أم إلى الأسفل، وأين يقطع محور Y؟', '$y=-2x^{2}+3x+5$: does it open up or down, and where does it meet the Y axis?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$a=-2<0$: behera.', '$a=-2<0$: hacia abajo.', '$a=-2<0$: إلى الأسفل.', '$a=-2<0$: down.') },
            { text: say('Y ardatza: $c$.', 'Eje Y: $c$.', 'محور Y: $c$.', 'Y axis: $c$.'), math: same('$(0,5)$') }
        ],
        example: same('$3\\cdot(-1)^{2}=3\\cdot 1^{2}=3$'),
        mistake: {
            wrong: say('$y=-x^{2}$ gora irekitzen da, $x^{2}$ beti positiboa delako.', '$y=-x^{2}$ se abre hacia arriba porque $x^{2}$ siempre es positivo.', '$y=-x^{2}$ ينفتح إلى الأعلى لأن $x^{2}$ موجب دائمًا.', '$y=-x^{2}$ opens upwards because $x^{2}$ is always positive.'),
            right: say('Minusak $y$ guztiak negatibo egiten ditu: behera irekitzen da.', 'El menos hace negativos todos los $y$: se abre hacia abajo.', 'السالب يجعل كل قيم $y$ سالبة: ينفتح إلى الأسفل.', 'The minus makes every $y$ negative: it opens downwards.')
        },
        takeaway: say('$A>0$: ∪ (minimoa). $A<0$: ∩ (maximoa).', '$A>0$: ∪ (mínimo). $A<0$: ∩ (máximo).', '$A>0$: ∪ (صغرى). $A<0$: ∩ (عظمى).', '$A>0$: ∪ (minimum). $A<0$: ∩ (maximum).'),
        figure: (language) => <ParabolaShapesFigure language={language} />
    },
    {
        id: 'vertex',
        stage: 'quadratic',
        title: say('Erpina eta simetria-ardatza', 'Vértice y eje de simetría', 'الرأس ومحور التناظر', 'The vertex and the axis of symmetry'),
        goal: say('Parabola baten erpina kalkulatzea.', 'Calcular el vértice de una parábola.', 'حساب رأس القطع المكافئ.', 'Work out the vertex of a parabola.'),
        explanation: say(
            'Erpina parabolaren punturik baxuena (edo altuena) da. Haren $x$ koordenatua $x_{v}=\\frac{-b}{2a}$ da, eta $y$ koordenatua ordezkatuz lortzen da: $y_{v}=f(x_{v})$. Simetria-ardatza erpinetik igarotzen den zuzen bertikala da, $x=x_{v}$. Bi puntu altuera berean badaude, erpina haien erdian dago.',
            'El vértice es el punto más bajo (o más alto) de la parábola. Su coordenada $x$ es $x_{v}=\\frac{-b}{2a}$, y la $y$ se obtiene sustituyendo: $y_{v}=f(x_{v})$. El eje de simetría es la recta vertical que pasa por el vértice, $x=x_{v}$. Si dos puntos están a la misma altura, el vértice está en medio.',
            'الرأس أخفض نقطة (أو أعلاها) في القطع المكافئ. إحداثيه $x$ هو $x_{v}=\\frac{-b}{2a}$، ونحصل على $y$ بالتعويض: $y_{v}=f(x_{v})$. ومحور التناظر المستقيم العمودي المار بالرأس، $x=x_{v}$. وإذا كانت نقطتان على الارتفاع نفسه فالرأس في منتصفهما.',
            'The vertex is the lowest (or highest) point of the parabola. Its $x$ coordinate is $x_{v}=\\frac{-b}{2a}$, and its $y$ is found by substituting: $y_{v}=f(x_{v})$. The axis of symmetry is the vertical line through the vertex, $x=x_{v}$. If two points are at the same height, the vertex is halfway between them.'
        ),
        problem: say('Aurkitu $y=x^{2}-6x+5$ parabolaren erpina.', 'Halla el vértice de $y=x^{2}-6x+5$.', 'جد رأس $y=x^{2}-6x+5$.', 'Find the vertex of $y=x^{2}-6x+5$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x$ koordenatua.', 'Coordenada $x$.', 'الإحداثي $x$.', 'The $x$ coordinate.'), math: same('$x_{v}=\\frac{6}{2}=3$') },
            { text: say('Ordezkatu.', 'Sustituye.', 'عوّض.', 'Substitute.'), math: same('$9-18+5=-4\\ \\to\\ (3,-4)$') }
        ],
        example: same('$x_{v}=\\frac{-4}{-2}=2$'),
        mistake: {
            wrong: same('$x_{v}=\\frac{-6}{2}=-3$'),
            right: say('Formulak $-b$ du: $b=-6$ bada, $-b=6$ eta $x_{v}=3$.', 'La fórmula lleva $-b$: si $b=-6$, $-b=6$ y $x_{v}=3$.', 'في الصيغة $-b$: إذا $b=-6$ فإن $-b=6$ و$x_{v}=3$.', 'The formula has $-b$: if $b=-6$, $-b=6$ and $x_{v}=3$.')
        },
        takeaway: same('$X_{V}=\\frac{-B}{2A}$'),
        figure: (language) => <VertexFigure language={language} />
    },
    {
        id: 'parabola-intercepts',
        stage: 'quadratic',
        title: say('Parabolaren ebaki-puntuak', 'Cortes de la parábola con los ejes', 'تقاطعات القطع المكافئ مع المحورين', 'Where a parabola meets the axes'),
        goal: say('Parabola bat marraztea erpinarekin eta ebaki-puntuekin.', 'Dibujar una parábola con su vértice y sus cortes con los ejes.', 'رسم قطع مكافئ برأسه وتقاطعاته مع المحورين.', 'Draw a parabola with its vertex and where it meets the axes.'),
        explanation: say(
            'Y ardatza: $(0,c)$. X ardatza: ebatzi $ax^{2}+bx+c=0$; diskriminatzaileak esaten du zenbat puntu dauden (bi, bat edo bat ere ez). Bi ebaki-puntu badaude, erpina haien erdian dago: $x_{v}=\\frac{x_{1}+x_{2}}{2}$. Marrazteko: erpina, ebaki-puntuak eta simetrikoa den puntu bat edo bi.',
            'Eje Y: $(0,c)$. Eje X: resuelve $ax^{2}+bx+c=0$; el discriminante dice cuántos puntos hay (dos, uno o ninguno). Si hay dos cortes, el vértice está en medio: $x_{v}=\\frac{x_{1}+x_{2}}{2}$. Para dibujarla: el vértice, los cortes y uno o dos puntos simétricos.',
            'محور Y: $(0,c)$. محور X: حلّ $ax^{2}+bx+c=0$؛ ويقول المميّز كم نقطة هناك (اثنتان أو واحدة أو لا شيء). وإذا كان هناك تقاطعان فالرأس في منتصفهما: $x_{v}=\\frac{x_{1}+x_{2}}{2}$. وللرسم: الرأس والتقاطعات ونقطة أو اثنتان متناظرتان.',
            'Y axis: $(0,c)$. X axis: solve $ax^{2}+bx+c=0$; the discriminant says how many points there are (two, one or none). If there are two, the vertex is halfway between them: $x_{v}=\\frac{x_{1}+x_{2}}{2}$. To draw it: the vertex, the crossings and one or two symmetric points.'
        ),
        problem: say('$y=x^{2}-2x-8$: non mozten ditu ardatzak?', '$y=x^{2}-2x-8$: ¿dónde corta a los ejes?', '$y=x^{2}-2x-8$: أين يقطع المحورين؟', '$y=x^{2}-2x-8$: where does it meet the axes?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Y ardatza.', 'Eje Y.', 'محور Y.', 'Y axis.'), math: same('$(0,-8)$') },
            { text: say('X ardatza.', 'Eje X.', 'محور X.', 'X axis.'), math: same('$x=\\frac{2\\pm 6}{2}\\ \\to\\ (4,0),\\ (-2,0)$') },
            { text: say('Erpina erdian.', 'El vértice, en medio.', 'الرأس في المنتصف.', 'The vertex, halfway.'), math: same('$x_{v}=\\frac{4+(-2)}{2}=1$') }
        ],
        example: same('$y=x^{2}+4\\ \\to\\ \\Delta<0$'),
        mistake: {
            wrong: say('Parabola batek beti mozten du X ardatza bi puntutan.', 'Una parábola siempre corta al eje X en dos puntos.', 'يقطع القطع المكافئ محور X دائمًا في نقطتين.', 'A parabola always meets the X axis at two points.'),
            right: say('Ez beti: $\\Delta$ negatiboa bada ez du mozten, eta zero bada ukitu besterik ez du egiten.', 'No siempre: si $\\Delta$ es negativo no lo corta, y si es cero solo lo toca.', 'ليس دائمًا: إذا كان $\\Delta$ سالبًا لا يقطعه، وإذا كان صفرًا يمسّه فقط.', 'Not always: if $\\Delta$ is negative it does not meet it, and if it is zero it only touches it.')
        },
        takeaway: say('Y ardatza: $(0,C)$. X ardatza: $AX^{2}+BX+C=0$.', 'Eje Y: $(0,C)$. Eje X: $AX^{2}+BX+C=0$.', 'محور Y: $(0,C)$. محور X: $AX^{2}+BX+C=0$.', 'Y axis: $(0,C)$. X axis: $AX^{2}+BX+C=0$.'),
        figure: (language) => <ParabolaCutsFigure language={language} />
    }
]
