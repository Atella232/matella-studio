import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { FunctionsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Funtzioak · 2. DBH — what each lesson tells: the new words (definitions),
   a short explanation, its cases as cards and the example as an exercise
   («Another example»). Plain data (no JSX) so the tests can import it;
   lessons.tsx merges it into the topics. Graphs are given in words (their
   points and how they go between them); the example uses points and rules
   of its own, never those of «Let's solve», of «Check it» or of the
   typical mistake. Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

/** The Arabic formulas get a decimal point */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const functionsLessonTexts: Record<FunctionsTopicId, LessonTexts> = {
    /* ---------- 1. Functions ---------- */
    coordinates: {
        vocabulary: [
            say('jatorria', 'origen', 'نقطة الأصل', 'origin'),
            say('koadrantea', 'cuadrante', 'الربع', 'quadrant'),
            say('ardatzak', 'ejes', 'المحاور', 'axes')
        ],
        definitions: [
            {
                term: say('Plano kartesiarra', 'Plano cartesiano', 'المستوى الإحداثي', 'Cartesian plane'),
                meaning: say(
                    'Elkarrekiko perpendikularrak diren bi zenbaki-zuzen, X ardatza (horizontala) eta Y ardatza (bertikala), $O(0,0)$ jatorrian ebakitzen direnak.',
                    'Dos rectas numéricas perpendiculares, el eje X (horizontal) y el eje Y (vertical), que se cortan en el origen, $O(0,0)$.',
                    'مستقيمان عدديان متعامدان، محور X (أفقي) ومحور Y (رأسي)، يتقاطعان في نقطة الأصل $O(0,0)$.',
                    'Two perpendicular number lines, the x-axis (horizontal) and the y-axis (vertical), that cross at the origin, $O(0,0)$.'
                )
            },
            {
                term: say('Koordenatuak', 'Coordenadas', 'الإحداثيات', 'Coordinates'),
                meaning: say(
                    'Puntu baten bikote ordenatua, $(x, y)$: abzisa, X ardatzean, eta ordenatua, Y ardatzean.',
                    'El par ordenado $(x, y)$ de un punto: la abscisa, en el eje X, y la ordenada, en el eje Y.',
                    'الزوج المرتب $(x, y)$ للنقطة: الفاصلة على محور X، والترتيبة على محور Y.',
                    'The ordered pair $(x, y)$ of a point: the x-coordinate, on the x-axis, and the y-coordinate, on the y-axis.'
                )
            }
        ],
        explanation: say(
            'Puntu bat kokatzeko, abiatu jatorritik: lehen koordenatuak esaten du zenbat joan eskuinera (+) edo ezkerrera (−), eta bigarrenak zenbat igo (+) edo jaitsi (−). Ardatzek planoa lau koadrantetan banatzen dute:',
            'Para situar un punto, parte del origen: la primera coordenada dice cuánto ir a la derecha (+) o a la izquierda (−), y la segunda, cuánto subir (+) o bajar (−). Los ejes dividen el plano en cuatro cuadrantes:',
            'لتحديد نقطة انطلق من نقطة الأصل: يبيّن الإحداثي الأول كم تذهب يمينًا (+) أو يسارًا (−)، والثاني كم تصعد (+) أو تنزل (−). ويقسم المحوران المستوى إلى أربعة أرباع:',
            'To plot a point, start at the origin: the first coordinate says how far to go right (+) or left (−), and the second how far to go up (+) or down (−). The axes divide the plane into four quadrants:'
        ),
        cases: [
            { title: say('Lehen koadrantea', 'Primer cuadrante', 'الربع الأول', 'First quadrant'), text: say('Eskuinera eta gora.', 'A la derecha y arriba.', 'إلى اليمين وإلى الأعلى.', 'Right and up.'), math: same('$(+,\\,+)$') },
            { title: say('Bigarren koadrantea', 'Segundo cuadrante', 'الربع الثاني', 'Second quadrant'), text: say('Ezkerrera eta gora.', 'A la izquierda y arriba.', 'إلى اليسار وإلى الأعلى.', 'Left and up.'), math: same('$(-,\\,+)$') },
            { title: say('Hirugarren koadrantea', 'Tercer cuadrante', 'الربع الثالث', 'Third quadrant'), text: say('Ezkerrera eta behera.', 'A la izquierda y abajo.', 'إلى اليسار وإلى الأسفل.', 'Left and down.'), math: same('$(-,\\,-)$') },
            { title: say('Laugarren koadrantea', 'Cuarto cuadrante', 'الربع الرابع', 'Fourth quadrant'), text: say('Eskuinera eta behera.', 'A la derecha y abajo.', 'إلى اليمين وإلى الأسفل.', 'Right and down.'), math: same('$(+,\\,-)$') }
        ],
        examplePrompt: say('Kokatu $C(-1,\\,-4)$ puntua eta esan zein koadrantetan dagoen.', 'Sitúa el punto $C(-1,\\,-4)$ y di en qué cuadrante está.', 'حدّد النقطة $C(-1,\\,-4)$ وبيّن في أي ربع تقع.', 'Plot the point $C(-1,\\,-4)$ and say which quadrant it is in.'),
        example: same('$C(-1,\\,-4)\\ \\to\\ \\text{III}$'),
        exampleAnswer: say('Unitate bat ezkerrera eta lau behera: hirugarren koadrantea.', 'Una unidad a la izquierda y cuatro hacia abajo: tercer cuadrante.', 'وحدة إلى اليسار وأربع إلى الأسفل: الربع الثالث.', 'One unit left and four down: the third quadrant.')
    },
    function: {
        vocabulary: [
            say('zuzen bertikala', 'recta vertical', 'المستقيم الرأسي', 'vertical line'),
            say('grafikoa', 'gráfica', 'الرسم', 'graph')
        ],
        definitions: [
            {
                term: say('Funtzioa', 'Función', 'الدالة', 'Function'),
                meaning: say(
                    'Erlazio bat, non $x$ balio bakoitzari (sarrera) $y$ balio bakarra dagokion (irteera).',
                    'Una relación en la que a cada valor de $x$ (entrada) le corresponde un único valor de $y$ (salida).',
                    'علاقة يقابل فيها كلَّ قيمة لـ$x$ (المدخل) قيمةٌ واحدة فقط لـ$y$ (المخرج).',
                    'A relationship in which each value of $x$ (input) has exactly one value of $y$ (output).'
                )
            }
        ],
        why: {
            text: say(
                'Zuzen bertikal bat $x$ bera duten puntu guztiak dira. Grafikoa bi puntutan ebakitzen badu, $x$ horrek bi $y$ balio ditu, eta hori ezin da gertatu funtzio batean.',
                'Una recta vertical son todos los puntos con la misma $x$. Si corta la gráfica en dos puntos, esa $x$ tiene dos valores de $y$, y eso no puede pasar en una función.',
                'المستقيم الرأسي هو كل النقاط التي لها $x$ نفسه. فإذا قطع الرسم في نقطتين كان لهذا $x$ قيمتان لـ $y$، وهذا لا يحدث في دالة.',
                'A vertical line is all the points with the same $x$. If it cuts the graph at two points, that $x$ has two values of $y$, and that cannot happen in a function.'
            )
        },
        explanation: say(
            'Bi $x$ desberdinek $y$ bera izan dezakete; baina $x$ berak ezin ditu bi $y$ izan. Grafiko batean, zuzen bertikal batek ezin du inoiz kurba puntu batean baino gehiagotan ebaki.',
            'Dos valores distintos de $x$ pueden tener la misma $y$; lo que no puede pasar es que una misma $x$ tenga dos $y$. En una gráfica, una recta vertical nunca puede cortar la curva en más de un punto.',
            'يمكن لقيمتين مختلفتين من $x$ أن تعطيا $y$ نفسها، لكن لا يجوز أن تكون لـ$x$ واحدة قيمتان من $y$. وفي الرسم لا يقطع أي خط رأسي المنحنى في أكثر من نقطة.',
            'Two different values of $x$ can have the same $y$; what cannot happen is for one $x$ to have two $y$ values. On a graph, a vertical line can never cross the curve at more than one point.'
        ),
        examplePrompt: say(
            'Aparkaleku batek kobratzen du: ordu bat arte, 2 €; bi ordu arte, 3 €; hiru ordu arte, 3 €. Prezioa denboraren funtzioa da?',
            'Un aparcamiento cobra: hasta 1 hora, 2 €; hasta 2 horas, 3 €; hasta 3 horas, 3 €. ¿Es el precio función del tiempo?',
            'موقف سيارات يتقاضى: حتى ساعة 2 €، وحتى ساعتين 3 €، وحتى 3 ساعات 3 €. هل السعر دالة في الزمن؟',
            'A car park charges: up to 1 hour, €2; up to 2 hours, €3; up to 3 hours, €3. Is the price a function of the time?'
        ),
        example: same('$1\\to 2,\\quad 2\\to 3,\\quad 3\\to 3$'),
        exampleAnswer: say('Bai: denbora bakoitzak prezio bakarra du. 3 balioa errepikatzeak ez du axola.', 'Sí: cada tiempo tiene un solo precio. Que el 3 se repita no importa.', 'نعم: لكل زمن سعر واحد. ولا يهم أن تتكرر القيمة 3.', 'Yes: each time has only one price. It does not matter that 3 is repeated.')
    },
    variables: {
        vocabulary: [
            say('menpe egon', 'depender', 'يعتمد', 'depend'),
            say('emaitza', 'resultado', 'النتيجة', 'result')
        ],
        definitions: [
            {
                term: say('Aldagai askea', 'Variable independiente', 'المتغير المستقل', 'Independent variable'),
                meaning: say('Aukeratzen edo neurtzen dena ($x$).', 'La que se elige o se mide ($x$).', 'ما نختاره أو نقيسه ($x$).', 'The one you choose or measure ($x$).')
            },
            {
                term: say('Aldagai menpekoa', 'Variable dependiente', 'المتغير التابع', 'Dependent variable'),
                meaning: say('$x$ balioaren arabera ateratzen dena ($y$). $y$ funtzioa da $x$ aldagaiarena, esaten da.', 'La que resulta según el valor de $x$ ($y$). Se dice que $y$ es función de $x$.', 'ما ينتج بحسب قيمة $x$ ($y$). ونقول إن $y$ دالة في $x$.', 'The one that results from the value of $x$ ($y$). We say $y$ is a function of $x$.')
            }
        ],
        explanation: say(
            'Funtzio batek aldagai bat bestearen arabera nola aldatzen den deskribatzen du. Bereizteko, galdetu: zer aukeratzen edo neurtzen dut? Zer ateratzen da horren ondorioz?',
            'Una función describe cómo depende una variable de otra. Para distinguirlas, pregunta: ¿qué elijo o mido? ¿Qué resulta de ello?',
            'تصف الدالة كيف يعتمد متغير على آخر. وللتمييز بينهما اسأل: ماذا أختار أو أقيس؟ وماذا ينتج عن ذلك؟',
            'A function describes how one variable depends on another. To tell them apart, ask: what do I choose or measure? What results from it?'
        ),
        examplePrompt: say(
            'Lapiko bateko uraren tenperatura, sutan daraman minutuen arabera. Zein da $x$ eta zein $y$?',
            'La temperatura del agua de una cazuela según los minutos que lleva al fuego. ¿Cuál es $x$ y cuál $y$?',
            'حرارة الماء في قدر بحسب الدقائق التي قضاها على النار. ما $x$ وما $y$؟',
            'The temperature of the water in a pan according to the minutes it has been on the heat. Which is $x$ and which is $y$?'
        ),
        example: '',
        exampleAnswer: say(
            '$x$: minutuak (aukeratzen edo neurtzen dira). $y$: tenperatura, haien araberakoa.',
            '$x$: los minutos (se eligen o se miden). $y$: la temperatura, que depende de ellos.',
            '$x$: الدقائق (نختارها أو نقيسها). $y$: الحرارة، وهي تتبعها.',
            '$x$: the minutes (you choose or measure them). $y$: the temperature, which depends on them.'
        )
    },
    tables: {
        vocabulary: [
            say('balio-taula', 'tabla de valores', 'جدول القيم', 'table of values'),
            say('zutabea', 'columna', 'العمود', 'column'),
            say('puntua', 'punto', 'النقطة', 'point')
        ],
        explanation: say(
            'Balio-taula batean $x$ balioak eta arauak (formulak) ematen dizkien $y$ emaitzak idazten dira. Zutabe bakoitza $(x, y)$ puntu bat da; puntuak planoan jarrita, grafikoa lortzen da. Funtzio bat denez, $x$ bakoitzak zutabe bakarra du.',
            'En una tabla de valores se escriben los valores de $x$ y los resultados $y$ que les da la regla (la fórmula). Cada columna es un punto $(x, y)$; al situarlos en el plano se obtiene la gráfica. Como es una función, cada $x$ tiene una sola columna.',
            'في جدول القيم نكتب قيم $x$ ونتائج $y$ التي تعطيها القاعدة (الصيغة). كل عمود نقطة $(x, y)$، وبوضع النقاط في المستوى نحصل على الرسم. وبما أنها دالة فلكل $x$ عمود واحد.',
            'In a table of values you write the values of $x$ and the outputs $y$ the rule (the formula) gives them. Each column is a point $(x, y)$; plotting them on the plane gives the graph. Because it is a function, each $x$ has only one column.'
        ),
        examplePrompt: say('Osatu $y=3-x$ funtzioaren taula, $x=-2,\\ 1,\\ 4$ balioetarako.', 'Completa la tabla de $y=3-x$ para $x=-2,\\ 1,\\ 4$.', 'أكمل جدول $y=3-x$ من أجل $x=-2,\\ 1,\\ 4$.', 'Complete the table of $y=3-x$ for $x=-2,\\ 1,\\ 4$.'),
        example: same('$\\begin{array}{c|ccc}x&-2&1&4\\\\ \\hline y&5&2&-1\\end{array}$'),
        exampleAnswer: say('$3-(-2)=5$, $3-1=2$ eta $3-4=-1$: puntuak $(-2,\\,5)$, $(1,\\,2)$ eta $(4,\\,-1)$ dira.', '$3-(-2)=5$, $3-1=2$ y $3-4=-1$: los puntos son $(-2,\\,5)$, $(1,\\,2)$ y $(4,\\,-1)$.', '$3-(-2)=5$ و$3-1=2$ و$3-4=-1$: النقاط $(-2,\\,5)$ و$(1,\\,2)$ و$(4,\\,-1)$.', '$3-(-2)=5$, $3-1=2$ and $3-4=-1$: the points are $(-2,\\,5)$, $(1,\\,2)$ and $(4,\\,-1)$.')
    },
    formula: {
        vocabulary: [
            say('sarrera', 'entrada', 'المدخل', 'input'),
            say('emaitza', 'resultado', 'النتيجة', 'output')
        ],
        explanation: say(
            'Funtzio bat formula batekin ematen da: $y=2x+1$ edo $f(x)=2x+1$. $f(x)$ idazkeran, $x$ sarrera da eta $f(x)$ emaitza. $f(3)$ kalkulatzeko, ordeztu $x$ 3 zenbakiarekin eta egin eragiketak hierarkiaz: lehenik berreturak. $f(a)=b$ esateak $(a, b)$ puntua funtzioarena dela esan nahi du.',
            'Una función se da con una fórmula: $y=2x+1$ o $f(x)=2x+1$. En $f(x)$, $x$ es la entrada y $f(x)$ el resultado. Para calcular $f(3)$, sustituye $x$ por 3 y opera con la jerarquía: primero las potencias. Decir $f(a)=b$ significa que el punto $(a, b)$ es de la función.',
            'تُعطى الدالة بصيغة: $y=2x+1$ أو $f(x)=2x+1$. في $f(x)$ تمثّل $x$ المدخل و$f(x)$ النتيجة. لحساب $f(3)$ عوّض $x$ بـ3 وأجرِ العمليات بحسب الأولويات: القوى أولًا. وقولنا $f(a)=b$ يعني أن النقطة $(a, b)$ تنتمي إلى الدالة.',
            'A function is given by a formula: $y=2x+1$ or $f(x)=2x+1$. In $f(x)$, $x$ is the input and $f(x)$ the output. To work out $f(3)$, put 3 in place of $x$ and follow the order of operations: powers first. Saying $f(a)=b$ means the point $(a, b)$ belongs to the function.'
        ),
        examplePrompt: say('$g(x)=2x^{2}-x$ bada, kalkulatu $g(-3)$.', 'Si $g(x)=2x^{2}-x$, calcula $g(-3)$.', 'إذا كانت $g(x)=2x^{2}-x$ فاحسب $g(-3)$.', 'If $g(x)=2x^{2}-x$, work out $g(-3)$.'),
        example: same('$\\begin{aligned}g(-3)&=2\\cdot(-3)^{2}-(-3)\\\\&=18+3=21\\end{aligned}$'),
        exampleAnswer: say('$g(-3)=21$: $(-3,\\,21)$ puntua funtzioarena da.', '$g(-3)=21$: el punto $(-3,\\,21)$ es de la función.', '$g(-3)=21$: النقطة $(-3,\\,21)$ تنتمي إلى الدالة.', '$g(-3)=21$: the point $(-3,\\,21)$ belongs to the function.')
    },
    plot: {
        vocabulary: [
            say('eskala', 'escala', 'التدريج', 'scale'),
            say('zuzena', 'recta', 'المستقيم', 'straight line'),
            say('kurba', 'curva', 'المنحنى', 'curve')
        ],
        explanation: say(
            'Funtzio bat marrazteko, egin balio-taula, kokatu puntuak eta elkartu, magnitudeak tarteko balioak hartzen baditu. Zuzen baterako bi puntu nahikoak dira; kurba baterako, zenbat eta puntu gehiago, orduan eta zehatzagoa. Aukeratu ardatz bakoitzaren eskala, aldaketak ondo ikusteko.',
            'Para dibujar una función, haz la tabla de valores, sitúa los puntos y únelos si la magnitud admite valores intermedios. Para una recta bastan dos puntos; para una curva, cuantos más puntos, más precisa sale. Elige la escala de cada eje para que se vean bien los cambios.',
            'لرسم دالة كوّن جدول القيم وضع النقاط وصِلها إذا كانت الكمية تقبل قيمًا وسيطة. للخط المستقيم تكفي نقطتان، وللمنحنى كلما زادت النقاط كان أدق. واختر تدريج كل محور لتظهر التغيرات جيدًا.',
            'To draw a function, make the table of values, plot the points and join them if the quantity can take values in between. For a straight line two points are enough; for a curve, the more points, the more accurate it is. Choose the scale of each axis so the changes show well.'
        ),
        examplePrompt: say('Marraztu $y=2x-3$.', 'Dibuja $y=2x-3$.', 'ارسم $y=2x-3$.', 'Draw $y=2x-3$.'),
        example: same('$\\begin{gathered}2\\cdot 0-3=-3\\\\2\\cdot 2-3=1\\end{gathered}$'),
        exampleAnswer: say('Zuzen bat da: bi puntu nahikoak dira, $(0,\\,-3)$ eta $(2,\\,1)$.', 'Es una recta: bastan dos puntos, $(0,\\,-3)$ y $(2,\\,1)$.', 'إنها خط مستقيم: تكفي نقطتان، $(0,\\,-3)$ و$(2,\\,1)$.', 'It is a straight line: two points are enough, $(0,\\,-3)$ and $(2,\\,1)$.')
    },
    continuity: {
        vocabulary: [
            say('tarteko balioak', 'valores intermedios', 'القيم الوسيطة', 'in-between values'),
            say('denbora', 'tiempo', 'الزمن', 'time')
        ],
        definitions: [
            {
                term: say('Grafiko jarraitua', 'Gráfica continua', 'الرسم المتصل', 'Continuous graph'),
                meaning: say('Arkatza altxatu gabe marrazten da: magnitudeak tarte bateko balio guztiak hartzen ditu.', 'Se dibuja sin levantar el lápiz: la magnitud toma todos los valores de un intervalo.', 'يُرسم دون رفع القلم: تأخذ الكمية كل قيم فترة ما.', 'You draw it without lifting the pencil: the quantity takes every value in an interval.')
            },
            {
                term: say('Grafiko etena', 'Gráfica discontinua', 'الرسم المنفصل', 'Discontinuous graph'),
                meaning: say('Puntu solteak edo jauziak ditu: balio batzuk bakarrik dira posible.', 'Tiene puntos sueltos o saltos: solo son posibles algunos valores.', 'فيه نقاط منفصلة أو قفزات: لا تكون إلا بعض القيم ممكنة.', 'It has separate points or jumps: only some values are possible.')
            }
        ],
        explanation: say(
            'Elkartu puntuak tarteko balioek zentzua dutenean bakarrik: denborak, distantziak edo tenperaturak badute; pertsona kopuruak edo eguneko salmentek, ez.',
            'Une los puntos solo cuando los valores intermedios tienen sentido: el tiempo, la distancia o la temperatura los tienen; el número de personas o las ventas de cada día, no.',
            'صِل النقاط فقط عندما يكون للقيم الوسيطة معنى: فللزمن والمسافة والحرارة قيم وسيطة، أما عدد الأشخاص أو مبيعات كل يوم فلا.',
            'Join the points only when the values in between make sense: time, distance or temperature have them; the number of people or daily sales do not.'
        ),
        examplePrompt: say(
            'Jarraitua da talde batek partida bakoitzean sartutako golen grafikoa? Eta globo batek denboraren arabera duen altuerarena?',
            '¿Es continua la gráfica de los goles que mete un equipo en cada partido? ¿Y la de la altura de un globo según el tiempo?',
            'هل رسم عدد الأهداف التي يسجّلها فريق في كل مباراة متصل؟ وماذا عن رسم ارتفاع منطاد بحسب الزمن؟',
            'Is the graph of the goals a team scores in each match continuous? And the graph of a balloon\'s height over time?'
        ),
        example: '',
        exampleAnswer: say('Golak: etena (ez dago gol eta erdirik). Globoaren altuera: jarraitua.', 'Los goles: discontinua (no hay medio gol). La altura del globo: continua.', 'الأهداف: منفصل (لا يوجد نصف هدف). ارتفاع المنطاد: متصل.', 'The goals: discontinuous (there is no half goal). The balloon\'s height: continuous.')
    },

    /* ---------- 2. Reading graphs ---------- */
    'graph-reading': {
        vocabulary: [
            say('X ardatza', 'eje X', 'المحور X', 'X axis'),
            say('laukia', 'cuadro', 'الخانة', 'square')
        ],
        explanation: say(
            'Begiratu lehenik ardatz bakoitzak zer neurtzen duen eta lauki bakoitzak zenbat balio duen. $f(a)$ lortzeko: bilatu $a$ X ardatzean, igo edo jaitsi kurbaraino eta irakurri Y ardatzean. Alderantziz, abiatu $b$ balioaren Y ardatzetik. $y$ balio berak hainbat $x$ izan ditzake.',
            'Mira primero qué mide cada eje y cuánto vale cada cuadro. Para hallar $f(a)$: busca $a$ en el eje X, sube o baja hasta la curva y lee en el eje Y. Al revés, parte de $b$ en el eje Y. Un mismo valor de $y$ puede tener varias $x$.',
            'انظر أولًا ماذا يقيس كل محور وكم تساوي كل خانة. لإيجاد $f(a)$: حدّد $a$ على محور X، واصعد أو انزل حتى المنحنى، واقرأ على محور Y. وبالعكس انطلق من $b$ على محور Y. وقد يكون للقيمة نفسها من $y$ عدة قيم لـ$x$.',
            'First look at what each axis measures and what each square is worth. To find $f(a)$: find $a$ on the x-axis, go up or down to the curve and read off the y-axis. The other way round, start from $b$ on the y-axis. The same value of $y$ can go with several $x$.'
        ),
        examplePrompt: say(
            'Grafiko bat $(1,\\,3)$, $(3,\\,6)$ eta $(6,\\,3)$ puntuetatik pasatzen da. Zenbat da $f(3)$? Zein $x$ baliotan da $y=3$?',
            'Una gráfica pasa por $(1,\\,3)$, $(3,\\,6)$ y $(6,\\,3)$. ¿Cuánto vale $f(3)$? ¿Para qué valores de $x$ es $y=3$?',
            'يمر رسم بالنقاط $(1,\\,3)$ و$(3,\\,6)$ و$(6,\\,3)$. كم تساوي $f(3)$؟ ولأي قيم $x$ تكون $y=3$؟',
            'A graph passes through $(1,\\,3)$, $(3,\\,6)$ and $(6,\\,3)$. What is $f(3)$? For which values of $x$ is $y=3$?'
        ),
        example: same('$f(3)=6\\qquad f(1)=f(6)=3$'),
        exampleAnswer: say('$f(3)=6$; eta $y=3$ bi puntutan: $x=1$ eta $x=6$.', '$f(3)=6$; y $y=3$ en dos puntos: $x=1$ y $x=6$.', '$f(3)=6$، و$y=3$ في نقطتين: $x=1$ و$x=6$.', '$f(3)=6$; and $y=3$ at two points: $x=1$ and $x=6$.')
    },
    intercepts: {
        vocabulary: [
            say('Y ardatza', 'eje Y', 'المحور Y', 'Y axis'),
            say('ebazpenak', 'soluciones', 'الحلول', 'solutions')
        ],
        definitions: [
            {
                term: say('Ebakidura-puntuak', 'Puntos de corte', 'نقاط التقاطع', 'Intercepts'),
                meaning: say('Grafikoak ardatzak mozten dituen puntuak. Haietako batean, koordenatuetako bat 0 da.', 'Los puntos donde la gráfica cruza los ejes. En cada uno, una de las coordenadas vale 0.', 'النقاط التي يقطع فيها الرسم المحورين. وفي كل منها يساوي أحد الإحداثيين 0.', 'The points where the graph crosses the axes. At each one, one of the coordinates is 0.')
            }
        ],
        why: {
            text: say(
                'Y ardatzeko puntu guztiek $x=0$ dute, eta funtzio batek balio bakarra ematen du $x$ bakoitzerako: $f(0)$. Horregatik, Y ardatzarekin ebakidura bat dago gehienez. X ardatzean $y=0$ da, eta $x$ askok eman dezakete $y=0$: ebakidura bat baino gehiago egon daitezke.',
                'Todos los puntos del eje Y tienen $x=0$, y una función da un solo valor para cada $x$: $f(0)$. Por eso hay como mucho un corte con el eje Y. En el eje X es $y=0$, y muchos valores de $x$ pueden dar $y=0$: puede haber varios cortes.',
                'كل نقاط المحور Y لها $x=0$، والدالة تعطي قيمة واحدة لكل $x$: $f(0)$. لذلك يوجد تقاطع واحد على الأكثر مع المحور Y. أما على المحور X فإن $y=0$، وقد تعطي قيم كثيرة لـ $x$ القيمة $y=0$: فقد توجد عدة نقاط تقاطع.',
                'All the points on the Y axis have $x=0$, and a function gives only one value for each $x$: $f(0)$. That is why there is at most one Y-intercept. On the X axis $y=0$, and many values of $x$ can give $y=0$: there can be several intercepts.'
            )
        },
        explanation: say(
            'Y ardatzarekiko ebakiduran $x=0$ da: $(0, f(0))$ puntua, eta gehienez bat dago. X ardatzarekiko ebakiduretan $y=0$ da: $f(x)=0$ ekuazioaren ebazpenak dira, eta bat, hainbat edo bat ere ez egon daitezke.',
            'En el corte con el eje Y se cumple $x=0$: es el punto $(0, f(0))$, y hay como mucho uno. En los cortes con el eje X se cumple $y=0$: son las soluciones de $f(x)=0$, y puede haber uno, varios o ninguno.',
            'عند التقاطع مع محور Y تكون $x=0$: النقطة $(0, f(0))$، وهي واحدة على الأكثر. وعند التقاطع مع محور X تكون $y=0$: إنها حلول $f(x)=0$، وقد تكون واحدة أو عدة أو لا شيء.',
            'Where the graph crosses the y-axis, $x=0$: it is the point $(0, f(0))$, and there is at most one. Where it crosses the x-axis, $y=0$: these are the solutions of $f(x)=0$, and there can be one, several or none.'
        ),
        examplePrompt: say('Non ebakitzen ditu $y=x^{2}-9$ funtzioak ardatzak?', '¿Dónde corta $y=x^{2}-9$ a los ejes?', 'أين تقطع $y=x^{2}-9$ المحورين؟', 'Where does $y=x^{2}-9$ cross the axes?'),
        example: same('$\\begin{gathered}x=0\\ \\to\\ y=-9\\\\y=0\\ \\to\\ x^{2}=9\\ \\to\\ x=\\pm 3\\end{gathered}$'),
        exampleAnswer: say('Y ardatza $(0,\\,-9)$ puntuan ebakitzen du, eta X ardatza $(-3,\\,0)$ eta $(3,\\,0)$ puntuetan.', 'Corta al eje Y en $(0,\\,-9)$ y al eje X en $(-3,\\,0)$ y $(3,\\,0)$.', 'تقطع محور Y في $(0,\\,-9)$ ومحور X في $(-3,\\,0)$ و$(3,\\,0)$.', 'It crosses the y-axis at $(0,\\,-9)$ and the x-axis at $(-3,\\,0)$ and $(3,\\,0)$.')
    },
    variation: {
        vocabulary: [
            say('gorakorra', 'creciente', 'متزايدة', 'increasing'),
            say('beherakorra', 'decreciente', 'متناقصة', 'decreasing'),
            say('tartea', 'intervalo', 'الفترة', 'interval')
        ],
        explanation: say(
            'Irakurri grafikoa ezkerretik eskuinera. Gora badoa, funtzioa gorakorra da tarte horretan ($x$ handitzean $y$ handitzen da); behera badoa, beherakorra; horizontala bada, konstantea. Tarteak $x$ balioen tarteekin ematen dira, $(0, 2)$ bezala, inoiz ez $y$ balioekin.',
            'Lee la gráfica de izquierda a derecha. Si sube, la función es creciente en ese tramo (al aumentar $x$, aumenta $y$); si baja, decreciente; si es horizontal, constante. Los tramos se dan con intervalos de valores de $x$, como $(0, 2)$, nunca de $y$.',
            'اقرأ الرسم من اليسار إلى اليمين. إذا صعد فالدالة متزايدة في هذا الجزء (بزيادة $x$ تزيد $y$)، وإذا هبط فمتناقصة، وإذا كان أفقيًا فثابتة. وتُعطى الأجزاء بفترات من قيم $x$ مثل $(0, 2)$، لا من قيم $y$.',
            'Read the graph from left to right. If it goes up, the function is increasing in that section (as $x$ increases, $y$ increases); if it goes down, decreasing; if it is flat, constant. Sections are given as intervals of $x$, like $(0, 2)$, never of $y$.'
        ),
        examplePrompt: say(
            'Funtzio batek 5 balio du $x=0$ puntuan, 1 $x=2$ puntuan eta 4 $x=6$ puntuan, puntu horien artean lerro zuzenean. Non da gorakorra eta non beherakorra?',
            'Una función vale 5 en $x=0$, 1 en $x=2$ y 4 en $x=6$, en línea recta entre esos puntos. ¿Dónde crece y dónde decrece?',
            'تساوي دالة 5 عند $x=0$، و1 عند $x=2$، و4 عند $x=6$، بخط مستقيم بين هذه النقاط. أين تتزايد وأين تتناقص؟',
            'A function is 5 at $x=0$, 1 at $x=2$ and 4 at $x=6$, in a straight line between those points. Where does it increase and where does it decrease?'
        ),
        example: same('$(0,\\,2)\\ \\searrow\\qquad (2,\\,6)\\ \\nearrow$'),
        exampleAnswer: say('Beherakorra $(0,\\,2)$ tartean eta gorakorra $(2,\\,6)$ tartean.', 'Decreciente en $(0,\\,2)$ y creciente en $(2,\\,6)$.', 'متناقصة في $(0,\\,2)$ ومتزايدة في $(2,\\,6)$.', 'Decreasing on $(0,\\,2)$ and increasing on $(2,\\,6)$.')
    },
    extremes: {
        vocabulary: [
            say('absolutua', 'absoluto', 'المطلق', 'absolute'),
            say('puntu altuena', 'punto más alto', 'أعلى نقطة', 'highest point'),
            say('puntu baxuena', 'punto más bajo', 'أدنى نقطة', 'lowest point')
        ],
        definitions: [
            {
                term: say('Maximoa', 'Máximo', 'القيمة العظمى', 'Maximum'),
                meaning: say('Funtzioa gorakorra izatetik beherakorra izatera pasatzen den puntua: gailur bat.', 'El punto donde la función pasa de creciente a decreciente: una cima.', 'النقطة التي تنتقل فيها الدالة من التزايد إلى التناقص: قمة.', 'The point where the function goes from increasing to decreasing: a peak.')
            },
            {
                term: say('Minimoa', 'Mínimo', 'القيمة الصغرى', 'Minimum'),
                meaning: say('Beherakorra izatetik gorakorra izatera pasatzen den puntua: haran bat.', 'El punto donde pasa de decreciente a creciente: un valle.', 'النقطة التي تنتقل فيها من التناقص إلى التزايد: وادٍ.', 'The point where it goes from decreasing to increasing: a valley.')
            }
        ],
        explanation: say(
            'Maximo absolutua grafiko osoko punturik altuena da; minimo absolutua, baxuena. Mutur bat puntu osoa da: $(x, y)$ idazten da, bere $x$ eta bere $y$ balioekin.',
            'El máximo absoluto es el punto más alto de toda la gráfica; el mínimo absoluto, el más bajo. Un extremo es un punto completo: se escribe $(x, y)$, con su $x$ y su $y$.',
            'القيمة العظمى المطلقة أعلى نقطة في الرسم كله، والصغرى المطلقة أدناها. والقيمة القصوى نقطة كاملة تُكتب $(x, y)$ بـ$x$ و$y$ الخاصين بها.',
            'The absolute maximum is the highest point of the whole graph; the absolute minimum, the lowest. A turning point is a full point: write it as $(x, y)$, with its $x$ and its $y$.'
        ),
        examplePrompt: say(
            'Funtzio bat $(1,\\,4)$ arte hazten da, $(3,\\,-2)$ arte gutxitzen, $(6,\\,7)$ arte hazten eta $(8,\\,5)$ puntuan amaitzen da. Zein dira haren muturrak? Eta maximo absolutua?',
            'Una función crece hasta $(1,\\,4)$, decrece hasta $(3,\\,-2)$, crece hasta $(6,\\,7)$ y termina en $(8,\\,5)$. ¿Cuáles son sus extremos? ¿Y el máximo absoluto?',
            'تتزايد دالة حتى $(1,\\,4)$، ثم تتناقص حتى $(3,\\,-2)$، ثم تتزايد حتى $(6,\\,7)$ وتنتهي عند $(8,\\,5)$. ما قيمها القصوى؟ وما العظمى المطلقة؟',
            'A function increases up to $(1,\\,4)$, decreases to $(3,\\,-2)$, increases to $(6,\\,7)$ and ends at $(8,\\,5)$. What are its turning points? And the absolute maximum?'
        ),
        example: '',
        exampleAnswer: say(
            'Maximoak: $(1,\\,4)$ eta $(6,\\,7)$, absolutua. Minimoa: $(3,\\,-2)$.',
            'Máximos: $(1,\\,4)$ y $(6,\\,7)$, el absoluto. Mínimo: $(3,\\,-2)$.',
            'القيم العظمى: $(1,\\,4)$ و$(6,\\,7)$، وهي المطلقة. والصغرى: $(3,\\,-2)$.',
            'Maximum points: $(1,\\,4)$ and $(6,\\,7)$, the absolute one. Minimum point: $(3,\\,-2)$.'
        )
    },

    /* ---------- 3. Straight lines ---------- */
    'direct-proportion': {
        vocabulary: [
            say('jatorria', 'origen', 'نقطة الأصل', 'origin'),
            say('bikoiztu', 'duplicar', 'المضاعفة', 'double')
        ],
        definitions: [
            {
                term: say('Proportzionaltasun zuzeneko funtzioa', 'Función de proporcionalidad directa', 'دالة التناسب الطردي', 'Direct proportion function'),
                meaning: say('$y=mx$: $\\frac{y}{x}$ zatidura beti $m$ da, proportzionaltasun-konstantea.', '$y=mx$: el cociente $\\frac{y}{x}$ es siempre $m$, la constante de proporcionalidad.', '$y=mx$: خارج القسمة $\\frac{y}{x}$ يساوي دائمًا $m$، ثابت التناسب.', '$y=mx$: the quotient $\\frac{y}{x}$ is always $m$, the constant of proportionality.')
            }
        ],
        explanation: say(
            'Bi magnitude zuzenki proportzionalak badira, $x$ bikoiztean $y$ ere bikoizten da. Grafikoa jatorritik, $(0,0)$ puntutik, pasatzen den zuzena da, eta $m$ balioak esaten du zenbat aldatzen den $y$, $x$ unitate bat handitzean.',
            'Si dos magnitudes son directamente proporcionales, al duplicar $x$ también se duplica $y$. Su gráfica es una recta que pasa por el origen, $(0,0)$, y $m$ dice cuánto cambia $y$ cuando $x$ aumenta una unidad.',
            'إذا كانت كميتان متناسبتين طرديًا فعند مضاعفة $x$ تتضاعف $y$. ورسمها خط مستقيم يمر بنقطة الأصل $(0,0)$، ويبيّن $m$ مقدار تغيّر $y$ حين تزيد $x$ وحدة واحدة.',
            'If two quantities are directly proportional, doubling $x$ also doubles $y$. Its graph is a straight line through the origin, $(0,0)$, and $m$ tells you how much $y$ changes when $x$ goes up by one.'
        ),
        examplePrompt: say(
            'Iturri batek 8 litro botatzen ditu minutuko. Idatzi litroen funtzioa minutuen arabera, eta kalkulatu zenbat botatzen dituen 15 minututan.',
            'Un grifo echa 8 litros por minuto. Escribe la función de los litros según los minutos y calcula cuántos echa en 15 minutos.',
            'يصبّ صنبور 8 لترات في الدقيقة. اكتب دالة اللترات بحسب الدقائق، واحسب كم يصبّ في 15 دقيقة.',
            'A tap pours 8 litres a minute. Write the function of the litres according to the minutes and work out how many it pours in 15 minutes.'
        ),
        example: same('$\\begin{gathered}y=8x\\\\y=8\\cdot 15=120\\end{gathered}$'),
        exampleAnswer: say('15 minututan 120 litro botatzen ditu. Zuzena $(0,\\,0)$ puntutik pasatzen da.', 'En 15 minutos echa 120 litros. La recta pasa por $(0,\\,0)$.', 'في 15 دقيقة يصبّ 120 لترًا. ويمر الخط بالنقطة $(0,\\,0)$.', 'In 15 minutes it pours 120 litres. The line passes through $(0,\\,0)$.')
    },
    slope: {
        vocabulary: [
            say('aldaketa', 'cambio', 'التغير', 'change'),
            say('ordena', 'orden', 'الترتيب', 'order')
        ],
        definitions: [
            {
                term: say('Malda', 'Pendiente', 'الميل', 'Slope'),
                meaning: say('$x$ unitate bat aurreratzean $y$ zenbat igotzen edo jaisten den: zuzenaren makurdura.', 'Cuánto sube o baja $y$ por cada unidad que avanza $x$: la inclinación de la recta.', 'مقدار صعود $y$ أو هبوطها لكل وحدة تتقدّمها $x$: انحدار الخط.', 'How much $y$ goes up or down for each unit $x$ moves: how steep the line is.')
            }
        ],
        why: {
            text: say(
                'Zuzen batean, $y$ beti kopuru berean aldatzen da $x$ 1 handitzen den bakoitzean. Horregatik, edozein bi punturen artean, $y$ aldagaiaren aldaketa $x$ aldagaiarenarekiko proportzionala da, eta zatidura berdina ateratzen da. $y=2x+1$ funtzioan:',
                'En una recta, $y$ cambia siempre lo mismo cada vez que $x$ aumenta 1. Por eso, entre dos puntos cualesquiera, el cambio de $y$ es proporcional al de $x$, y el cociente sale igual. En $y=2x+1$:',
                'في المستقيم يتغير $y$ دائمًا بالمقدار نفسه كلما زاد $x$ بمقدار 1. لذلك بين أي نقطتين يكون تغير $y$ متناسبًا مع تغير $x$، ويخرج خارج القسمة نفسه. في $y=2x+1$:',
                'On a straight line, $y$ always changes by the same amount each time $x$ goes up by 1. That is why, between any two points, the change in $y$ is proportional to the change in $x$, and the quotient comes out the same. For $y=2x+1$:'
            ),
            math: same('$\\begin{gathered}\\frac{9-3}{4-1}=\\frac{6}{3}=2\\\\\\frac{5-1}{2-0}=\\frac{4}{2}=2\\end{gathered}$')
        },
        explanation: say(
            'Zuzeneko bi puntu emanda, $(x_1, y_1)$ eta $(x_2, y_2)$, malda $m=\\dfrac{y_2-y_1}{x_2-x_1}$ da: $y$ aldagaiaren aldaketa zati $x$ aldagaiarena. Kendu beti ordena berean. Zuzen baten edozein bi puntuk malda bera ematen dute.',
            'Dados dos puntos de la recta, $(x_1, y_1)$ y $(x_2, y_2)$, la pendiente es $m=\\dfrac{y_2-y_1}{x_2-x_1}$: el cambio de $y$ entre el cambio de $x$. Resta siempre en el mismo orden. Dos puntos cualesquiera de una recta dan la misma pendiente.',
            'إذا أُعطيت نقطتان من الخط $(x_1, y_1)$ و$(x_2, y_2)$ فالميل $m=\\dfrac{y_2-y_1}{x_2-x_1}$: تغيّر $y$ مقسومًا على تغيّر $x$. اطرح دائمًا بالترتيب نفسه. وأي نقطتين من الخط تعطيان الميل نفسه.',
            'Given two points on the line, $(x_1, y_1)$ and $(x_2, y_2)$, the slope is $m=\\dfrac{y_2-y_1}{x_2-x_1}$: the change in $y$ divided by the change in $x$. Always subtract in the same order. Any two points on a line give the same slope.'
        ),
        examplePrompt: say('Kalkulatu $A(-2,\\,7)$ eta $B(4,\\,4)$ puntuetatik pasatzen den zuzenaren malda.', 'Calcula la pendiente de la recta que pasa por $A(-2,\\,7)$ y $B(4,\\,4)$.', 'احسب ميل الخط المار بالنقطتين $A(-2,\\,7)$ و$B(4,\\,4)$.', 'Work out the slope of the line through $A(-2,\\,7)$ and $B(4,\\,4)$.'),
        example: same('$m=\\dfrac{4-7}{4-(-2)}=\\dfrac{-3}{6}=-\\dfrac{1}{2}$'),
        exampleAnswer: say('Malda $-\\frac{1}{2}$ da: zuzena unitate erdi jaisten da eskuinerako unitate bakoitzeko.', 'La pendiente es $-\\frac{1}{2}$: la recta baja media unidad por cada unidad a la derecha.', 'الميل $-\\frac{1}{2}$: ينزل الخط نصف وحدة لكل وحدة إلى اليمين.', 'The slope is $-\\frac{1}{2}$: the line goes down half a unit for each unit to the right.')
    },
    'slope-sign': {
        vocabulary: [
            say('balio absolutua', 'valor absoluto', 'القيمة المطلقة', 'absolute value'),
            say('zuzen bertikala', 'recta vertical', 'المستقيم الرأسي', 'vertical line')
        ],
        explanation: say(
            'Maldaren zeinuak esaten du nora doan zuzena, eta haren balio absolutuak zenbat makurtzen den: $|m|$ zenbat eta handiagoa, orduan eta aldapatsuagoa. Zuzen bertikal batek ez du maldarik ($\\Delta x=0$) eta ez da funtzioa.',
            'El signo de la pendiente dice hacia dónde va la recta, y su valor absoluto, cuánto se inclina: cuanto mayor es $|m|$, más inclinada. Una recta vertical no tiene pendiente ($\\Delta x=0$) y no es una función.',
            'تبيّن إشارة الميل اتجاه الخط، وقيمته المطلقة مقدار انحداره: كلما كبرت $|m|$ زاد الانحدار. والخط الرأسي لا ميل له ($\\Delta x=0$) وليس دالة.',
            'The sign of the slope says which way the line goes, and its absolute value how steep it is: the bigger $|m|$, the steeper. A vertical line has no slope ($\\Delta x=0$) and is not a function.'
        ),
        cases: [
            { title: say('Gorakorra', 'Creciente', 'متزايد', 'Increasing'), text: say('Eskuinera igotzen da.', 'Sube hacia la derecha.', 'يصعد نحو اليمين.', 'It goes up to the right.'), math: same('$m>0$') },
            { title: say('Beherakorra', 'Decreciente', 'متناقص', 'Decreasing'), text: say('Eskuinera jaisten da.', 'Baja hacia la derecha.', 'ينزل نحو اليمين.', 'It goes down to the right.'), math: same('$m<0$') },
            { title: say('Horizontala', 'Horizontal', 'أفقي', 'Horizontal'), text: say('Ez da igotzen ez jaisten: funtzio konstantea.', 'No sube ni baja: función constante.', 'لا يصعد ولا ينزل: دالة ثابتة.', 'It neither goes up nor down: a constant function.'), math: same('$m=0$') }
        ],
        examplePrompt: say(
            'Ordenatu, gutxien makurtutik gehien makurtura: $y=-5x$, $y=\\frac{1}{3}x+2$, $y=2x-1$. Zein dira gorakorrak?',
            'Ordena de menos a más inclinada: $y=-5x$, $y=\\frac{1}{3}x+2$, $y=2x-1$. ¿Cuáles son crecientes?',
            'رتّب من الأقل انحدارًا إلى الأكثر: $y=-5x$، $y=\\frac{1}{3}x+2$، $y=2x-1$. أيّها متزايد؟',
            'Order from least to most steep: $y=-5x$, $y=\\frac{1}{3}x+2$, $y=2x-1$. Which are increasing?'
        ),
        example: same('$\\left|\\tfrac{1}{3}\\right|<|2|<|-5|$'),
        exampleAnswer: say(
            'Gutxien makurtua $y=\\frac{1}{3}x+2$ da, eta gehien $y=-5x$, beherakorra. Beste biak gorakorrak dira.',
            'La menos inclinada es $y=\\frac{1}{3}x+2$, y la más, $y=-5x$, que es decreciente. Las otras dos son crecientes.',
            'الأقل انحدارًا $y=\\frac{1}{3}x+2$، والأكثر $y=-5x$ وهي متناقصة. والأخريان متزايدتان.',
            'The least steep is $y=\\frac{1}{3}x+2$, and the steepest $y=-5x$, which is decreasing. The other two are increasing.'
        )
    },
    affine: {
        vocabulary: [
            say('malda', 'pendiente', 'الميل', 'slope'),
            say('puntua', 'punto', 'النقطة', 'point')
        ],
        definitions: [
            {
                term: say('Funtzio lineala (afina)', 'Función lineal (afín)', 'الدالة الخطية (التآلفية)', 'Linear function'),
                meaning: say('$y=mx+n$: $m$ maldako zuzena, Y ardatza $(0, n)$ puntuan ebakitzen duena.', '$y=mx+n$: una recta de pendiente $m$ que corta al eje Y en $(0, n)$.', '$y=mx+n$: خط مستقيم ميله $m$ يقطع محور Y في $(0, n)$.', '$y=mx+n$: a straight line with slope $m$ that crosses the y-axis at $(0, n)$.')
            }
        ],
        why: {
            text: say(
                'Y ardatzean $x=0$ da, eta orduan $y=m\\cdot 0+n=n$. Horregatik zuzenak Y ardatza $(0, n)$ puntuan ebakitzen du. Eta $x$ 1 handitzen den bakoitzean, $y$ aldagaia $m$ aldatzen da: malda.',
                'En el eje Y es $x=0$, y entonces $y=m\\cdot 0+n=n$. Por eso la recta corta el eje Y en $(0, n)$. Y cada vez que $x$ aumenta 1, $y$ cambia $m$: la pendiente.',
                'على المحور Y يكون $x=0$، وعندها $y=m\\cdot 0+n=n$. لذلك يقطع المستقيم المحور Y في $(0, n)$. وكلما زاد $x$ بمقدار 1 تغيّر $y$ بمقدار $m$: الميل.',
                'On the Y axis $x=0$, and then $y=m\\cdot 0+n=n$. That is why the line cuts the Y axis at $(0, n)$. And each time $x$ goes up by 1, $y$ changes by $m$: the slope.'
            )
        },
        explanation: say(
            'Marrazteko, kokatu $(0, n)$ puntua eta erabili malda beste puntu bat aurkitzeko: $\\Delta x$ eskuinera eta $\\Delta y$ gora. $n=0$ denean, proportzionaltasun zuzeneko funtzioa da, $y=mx$.',
            'Para dibujarla, marca $(0, n)$ y usa la pendiente para hallar otro punto: $\\Delta x$ a la derecha y $\\Delta y$ hacia arriba. Cuando $n=0$ es la función de proporcionalidad directa, $y=mx$.',
            'لرسمها ضع النقطة $(0, n)$ واستعمل الميل لإيجاد نقطة أخرى: $\\Delta x$ إلى اليمين و$\\Delta y$ إلى الأعلى. وعندما $n=0$ تكون دالة التناسب الطردي $y=mx$.',
            'To draw it, mark $(0, n)$ and use the slope to find another point: $\\Delta x$ to the right and $\\Delta y$ up. When $n=0$ it is the direct proportion function, $y=mx$.'
        ),
        examplePrompt: say(
            'Taxi batek 4 € kobratzen ditu hasieran eta 2 € km bakoitzeko. Idatzi funtzioa eta kalkulatu 9 km-ren prezioa.',
            'Un taxi cobra 4 € de bajada de bandera y 2 € por km. Escribe la función y calcula el precio de 9 km.',
            'يتقاضى سيارة أجرة 4 € عند الانطلاق و2 € لكل كم. اكتب الدالة واحسب ثمن 9 كم.',
            'A taxi charges €4 to start and €2 per km. Write the function and work out the price of 9 km.'
        ),
        example: same('$\\begin{gathered}y=2x+4\\\\y=2\\cdot 9+4=22\\end{gathered}$'),
        exampleAnswer: say('9 km-k 22 € balio dute; $n=4$ ezer egin gabe ordaintzen dena da.', '9 km cuestan 22 €; $n=4$ es lo que se paga sin recorrer nada.', '9 كم تكلّف 22 €؛ و$n=4$ هو ما يُدفع دون قطع أي مسافة.', '9 km cost €22; $n=4$ is what you pay before going anywhere.')
    },
    constant: {
        vocabulary: [
            say('zuzen horizontala', 'recta horizontal', 'المستقيم الأفقي', 'horizontal line'),
            say('zuzen bertikalak', 'rectas verticales', 'المستقيمات الرأسية', 'vertical lines')
        ],
        definitions: [
            {
                term: say('Funtzio konstantea', 'Función constante', 'الدالة الثابتة', 'Constant function'),
                meaning: say('$y=k$: emaitza beti bera da, $x$ edozein dela ere. Grafikoa zuzen horizontal bat da.', '$y=k$: el resultado es siempre el mismo, sea cual sea $x$. Su gráfica es una recta horizontal.', '$y=k$: النتيجة نفسها دائمًا مهما كانت $x$. ورسمها خط أفقي.', '$y=k$: the output is always the same, whatever $x$ is. Its graph is a horizontal line.')
            }
        ],
        explanation: say(
            'Zuzena $(0, k)$ puntutik pasatzen da, eta $y=mx+n$ da, $m=0$ eta $n=k$ izanik. $y=0$ funtzioaren grafikoa X ardatza bera da. Zuzen bertikalak, $x=k$, ez dira funtzioak: $x$ berak $y$ balio guztiak ditu.',
            'La recta pasa por $(0, k)$ y es $y=mx+n$ con $m=0$ y $n=k$. La gráfica de $y=0$ es el propio eje X. Las rectas verticales, $x=k$, no son funciones: una misma $x$ tiene todos los valores de $y$.',
            'يمر الخط بالنقطة $(0, k)$، وهو $y=mx+n$ حيث $m=0$ و$n=k$. ورسم $y=0$ هو محور X نفسه. أما الخطوط الرأسية $x=k$ فليست دوال: $x$ واحدة لها كل قيم $y$.',
            'The line passes through $(0, k)$ and is $y=mx+n$ with $m=0$ and $n=k$. The graph of $y=0$ is the x-axis itself. Vertical lines, $x=k$, are not functions: one $x$ has every value of $y$.'
        ),
        examplePrompt: say(
            'Garraio-abonamendu batek 20 € balio du hilean, bidaia kopurua edozein dela ere. Idatzi funtzioa: zenbat ordaintzen da 3 bidaiatan eta 40 bidaiatan?',
            'Un abono de transporte cuesta 20 € al mes, hagas los viajes que hagas. Escribe la función: ¿cuánto se paga con 3 viajes y con 40?',
            'يكلّف اشتراك نقل 20 € في الشهر مهما كان عدد الرحلات. اكتب الدالة: كم يُدفع مقابل 3 رحلات ومقابل 40؟',
            'A travel pass costs €20 a month, however many trips you make. Write the function: how much do you pay for 3 trips and for 40?'
        ),
        example: same('$\\begin{gathered}y=20\\\\(3,\\,20),\\ (40,\\,20)\\end{gathered}$'),
        exampleAnswer: say('Beti 20 €: zuzen horizontal bat da.', 'Siempre 20 €: es una recta horizontal.', 'دائمًا 20 €: إنها خط أفقي.', 'Always €20: it is a horizontal line.')
    },
    'line-equation': {
        vocabulary: [
            say('ekuazioa', 'ecuación', 'المعادلة', 'equation'),
            say('bi puntu', 'dos puntos', 'نقطتان', 'two points'),
            say('askatu', 'despejar', 'اعزل', 'solve for')
        ],
        explanation: say(
            'Bi puntu nahikoak dira zuzen bat zehazteko. Lehenik, kalkulatu $m$ bi puntuekin. Gero, aurkitu $n$: ordeztu puntu bat $y=mx+n$ ekuazioan eta askatu $n$, edo irakurri, $x=0$ duen punturen bat badago. Idatzi ekuazioa eta egiaztatu beste puntuarekin.',
            'Dos puntos bastan para determinar una recta. Primero calcula $m$ con los dos puntos. Después halla $n$: sustituye un punto en $y=mx+n$ y despeja $n$, o léela si hay un punto con $x=0$. Escribe la ecuación y comprueba con el otro punto.',
            'تكفي نقطتان لتحديد خط. أولًا احسب $m$ بالنقطتين. ثم أوجد $n$: عوّض نقطة في $y=mx+n$ واعزل $n$، أو اقرأها إذا وُجدت نقطة فيها $x=0$. اكتب المعادلة وتحقّق بالنقطة الأخرى.',
            'Two points are enough to fix a line. First work out $m$ with the two points. Then find $n$: put one point into $y=mx+n$ and solve for $n$, or read it off if a point has $x=0$. Write the equation and check with the other point.'
        ),
        examplePrompt: say('Aurkitu $A(2,\\,3)$ eta $B(4,\\,-1)$ puntuetatik pasatzen den zuzenaren ekuazioa.', 'Halla la ecuación de la recta que pasa por $A(2,\\,3)$ y $B(4,\\,-1)$.', 'أوجد معادلة الخط المار بالنقطتين $A(2,\\,3)$ و$B(4,\\,-1)$.', 'Find the equation of the line through $A(2,\\,3)$ and $B(4,\\,-1)$.'),
        example: same('$\\begin{gathered}m=\\dfrac{-1-3}{4-2}=-2\\\\3=-2\\cdot 2+n\\ \\to\\ n=7\\end{gathered}$'),
        exampleAnswer: say('$y=-2x+7$. Egiaztatu $B$ puntuarekin: $-2\\cdot 4+7=-1$.', '$y=-2x+7$. Comprueba con $B$: $-2\\cdot 4+7=-1$.', '$y=-2x+7$. تحقّق بـ$B$: $-2\\cdot 4+7=-1$.', '$y=-2x+7$. Check with $B$: $-2\\cdot 4+7=-1$.')
    }
}
