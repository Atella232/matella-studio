import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import {
    AffineFigure,
    ConstantFigure,
    ContinuityFigure,
    CoordinateFigure,
    ExtremesFigure,
    FormulaFigure,
    FunctionTestFigure,
    InterceptsFigure,
    LineEquationFigure,
    PlotFigure,
    ProportionalFigure,
    ReadFigure,
    SlopeFigure,
    SlopeSignsFigure,
    TableFigure,
    VariablesFigure,
    VariationFigure
} from './figures'

/* ==========================================================================
   Funtzioak · 2. DBH — stages and lessons
   Sequence follows the class textbook (Santillana 2.º ESO unit 13,
   "Funciones") with Anaya 2.º ESO unit 13: coordinates, the idea of
   function and its tables, formulas and graphs, reading a graph (value,
   intercepts, growth, extremes), direct proportionality, slope and the
   straight lines y = mx + n and y = k.
   ========================================================================== */

export type FunctionsStageId = 'idea' | 'representations' | 'reading' | 'proportional' | 'lines'

export const functionsStages: UnitStage[] = [
    { id: 'idea', tone: 'blue', title: { eu: 'Koordenatuak eta funtzioa', es: 'Coordenadas y función', en: 'Coordinates and function', ar: 'الإحداثيات والدالة' } },
    { id: 'representations', tone: 'violet', title: { eu: 'Taulak, formulak eta grafikoak', es: 'Tablas, fórmulas y gráficas', en: 'Tables, formulas and graphs', ar: 'الجداول والصيغ والرسوم' } },
    { id: 'reading', tone: 'mustard', title: { eu: 'Grafikoak irakurtzen', es: 'Leer gráficas', en: 'Reading graphs', ar: 'قراءة الرسوم البيانية' } },
    { id: 'proportional', tone: 'coral', title: { eu: 'Proportzionaltasun zuzena eta malda', es: 'Proporcionalidad directa y pendiente', en: 'Direct proportion and slope', ar: 'التناسب الطردي والميل' } },
    { id: 'lines', tone: 'green', title: { eu: 'Funtzio linealak eta konstanteak', es: 'Funciones lineales y constantes', en: 'Linear and constant functions', ar: 'الدوال الخطية والثابتة' } }
]

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

export const functionsTopics: UnitTopic[] = [
    {
        id: 'coordinates',
        stage: 'idea',
        title: say('Koordenatuak eta koadranteak', 'Coordenadas y cuadrantes', 'الإحداثيات والأرباع', 'Coordinates and quadrants'),
        goal: say('Puntu baten koordenatuak idaztea, planoan kokatzea eta koadrantea esatea.', 'Escribir las coordenadas de un punto, situarlo en el plano y decir su cuadrante.', 'كتابة إحداثيي نقطة وتحديد موقعها في المستوى وذكر ربعها.', 'Write the coordinates of a point, plot it on the plane and say which quadrant it is in.'),
        explanation: say(
            'Plano kartesiarra elkarrekiko perpendikularrak diren bi zenbaki-zuzenek osatzen dute: X ardatza (horizontala) eta Y ardatza (bertikala). Ebakitzen diren puntua jatorria da, $O(0,0)$. Planoko puntu bakoitza bikote ordenatu batek zehazten du, $(x, y)$: lehen koordenatua X ardatzean neurtzen da (abzisa) eta bigarrena Y ardatzean (ordenatua). Ardatzek planoa lau koadrantetan banatzen dute.',
            'El plano cartesiano está formado por dos rectas numéricas perpendiculares: el eje X (horizontal) y el eje Y (vertical). Se cortan en el origen, $O(0,0)$. Cada punto del plano se determina con un par ordenado $(x, y)$: la primera coordenada se mide en el eje X (abscisa) y la segunda en el eje Y (ordenada). Los ejes dividen el plano en cuatro cuadrantes.',
            'يتكوّن المستوى الإحداثي من مستقيمين عدديين متعامدين: محور X (أفقي) ومحور Y (رأسي). يتقاطعان في نقطة الأصل $O(0,0)$. تتحدد كل نقطة بزوج مرتب $(x, y)$: يُقاس الإحداثي الأول على محور X (الفاصلة) والثاني على محور Y (الترتيبة). ويقسم المحوران المستوى إلى أربعة أرباع.', 'The Cartesian plane is made of two perpendicular number lines: the x-axis (horizontal) and the y-axis (vertical). They cross at the origin, $O(0,0)$. Each point on the plane is located by an ordered pair $(x, y)$: the first coordinate is measured on the x-axis (the abscissa, or x-coordinate) and the second on the y-axis (the ordinate, or y-coordinate). The axes divide the plane into four quadrants.'
        ),
        problem: say('Kokatu $A(-2, 3)$ puntua eta esan zein koadrantetan dagoen.', 'Sitúa el punto $A(-2, 3)$ y di en qué cuadrante está.', 'حدّد النقطة $A(-2, 3)$ وقل في أي ربع تقع.', 'Plot the point $A(-2, 3)$ and say which quadrant it is in.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hasi jatorrian. Lehen koordenatua −2 da: bi unitate ezkerrera.', 'Parte del origen. La primera coordenada es −2: dos unidades a la izquierda.', 'ابدأ من نقطة الأصل. الإحداثي الأول −2: وحدتان إلى اليسار.', 'Start at the origin. The first coordinate is −2: two units to the left.'), math: '$x=-2$' },
            { text: say('Bigarren koordenatua 3 da: hiru unitate gora.', 'La segunda coordenada es 3: tres unidades hacia arriba.', 'الإحداثي الثاني 3: ثلاث وحدات إلى أعلى.', 'The second coordinate is 3: three units up.'), math: '$y=3$' },
            { text: say('Zeinuak (−, +) dira: bigarren koadrantea.', 'Los signos son (−, +): segundo cuadrante.', 'الإشارتان (−، +): الربع الثاني.', 'The signs are (−, +): second quadrant.'), math: '$A(-2,\\,3)\\ \\to\\ \\text{II}$' }
        ],
        example: '$D(-3,-2)\\ \\to\\ \\text{III}$',
        takeaway: say('Ordenak axola du: lehenengo x, gero y. Ardatzetako puntuak ez daude koadranteetan.', 'El orden importa: primero x y después y. Los puntos de los ejes no están en ningún cuadrante.', 'الترتيب مهم: x أولًا ثم y. نقاط المحاور ليست في أي ربع.', 'The order matters: first x and then y. Points on the axes are not in any quadrant.'),
        figure: (language) => <CoordinateFigure language={language} />
    },
    {
        id: 'function',
        stage: 'idea',
        title: say('Noiz da erlazio bat funtzioa?', '¿Cuándo una relación es función?', 'متى تكون العلاقة دالة؟', 'When is a relationship a function?'),
        goal: say('Funtzioak eta funtzio ez diren erlazioak bereiztea, taula, geziak edo grafikoa erabiliz.', 'Distinguir funciones de relaciones que no lo son, con tablas, flechas o gráficas.', 'التمييز بين الدوال والعلاقات التي ليست دوال بالجداول أو الأسهم أو الرسم.', 'Tell functions apart from relationships that are not functions, using tables, arrows or graphs.'),
        explanation: say(
            'Funtzio bat bi magnituderen arteko erlazio bat da, non $x$ (sarrera) balio bakoitzari $y$ (irteera) balio bakarra dagokion. Bi $x$ desberdinek $y$ bera izan dezakete; baina $x$ berak ezin du bi $y$ izan. Grafiko batean, zuzen bertikal batek ez du inoiz kurba puntu batean baino gehiagotan ebaki behar.',
            'Una función es una relación entre dos magnitudes en la que a cada valor de $x$ (entrada) le corresponde un único valor de $y$ (salida). Dos valores distintos de $x$ pueden tener la misma $y$; lo que no puede pasar es que una misma $x$ tenga dos $y$. En una gráfica, una recta vertical nunca debe cortar la curva en más de un punto.',
            'الدالة علاقة بين كميتين يقابل فيها كل قيمة $x$ (المدخل) قيمة واحدة فقط لـ $y$ (المخرج). يمكن لقيمتين مختلفتين من $x$ أن تعطيا $y$ نفسها، لكن لا يجوز أن تعطي $x$ واحدة قيمتين لـ $y$. في الرسم البياني يجب ألا يقطع أي خط رأسي المنحنى في أكثر من نقطة.', 'A function is a relationship between two quantities in which each value of $x$ (input) corresponds to only one value of $y$ (output). Two different values of $x$ can have the same $y$; what cannot happen is for one $x$ to have two $y$ values. On a graph, a vertical line must never cross the curve at more than one point.'
        ),
        problem: say('A: $1\\to 2,\\ 2\\to 2,\\ 3\\to 5$. B: $1\\to 2$ eta $1\\to 4$. Zein da funtzioa?', 'A: $1\\to 2,\\ 2\\to 2,\\ 3\\to 5$. B: $1\\to 2$ y $1\\to 4$. ¿Cuál es función?', 'A: $1\\to 2,\\ 2\\to 2,\\ 3\\to 5$. B: $1\\to 2$ و$1\\to 4$. أيهما دالة؟', 'A: $1\\to 2,\\ 2\\to 2,\\ 3\\to 5$. B: $1\\to 2$ and $1\\to 4$. Which one is a function?'),
        stepsKind: 'facts',
        steps: [
            { title: say('A erlazioa: funtzioa', 'Relación A: es función', 'العلاقة A: دالة', 'Relationship A: it is a function'), text: say('Sarrera bakoitzak irteera bakarra du. 2 irteera bi aldiz agertzea ez da arazo.', 'Cada entrada tiene una sola salida. Que el 2 se repita como salida no importa.', 'لكل مدخل مخرج واحد. لا يهم أن يتكرر المخرج 2.', 'Each input has only one output. It does not matter that 2 is repeated as an output.'), math: '$1\\to 2,\\quad 2\\to 2,\\quad 3\\to 5$' },
            { title: say('B erlazioa: ez da funtzioa', 'Relación B: no es función', 'العلاقة B: ليست دالة', 'Relationship B: it is not a function'), text: say('1 sarrerak bi irteera ditu, 2 eta 4.', 'La entrada 1 tiene dos salidas, 2 y 4.', 'للمدخل 1 مخرجان: 2 و4.', 'The input 1 has two outputs, 2 and 4.'), math: '$1\\to 2\\quad;\\quad 1\\to 4$' },
            { title: say('Zuzen bertikalaren froga', 'La prueba de la vertical', 'اختبار الخط الرأسي', 'The vertical line test'), text: say('Grafikoan zehar zuzen bertikal bat mugitu: puntu bat baino gehiago ebakitzen baditu, ez da funtzioa.', 'Desliza una recta vertical por la gráfica: si en algún sitio corta en más de un punto, no es función.', 'مرّر خطًا رأسيًا على الرسم: إذا قطع أكثر من نقطة في أي موضع فليست دالة.', 'Slide a vertical line across the graph: if it crosses more than one point anywhere, it is not a function.'), math: '$x=k$' }
        ],
        example: say('$x=2\\to y=4$ eta $x=2\\to y=7$: ez da funtzioa', '$x=2\\to y=4$ y $x=2\\to y=7$: no es función', '$x=2\\to y=4$ و$x=2\\to y=7$: ليست دالة', '$x=2\\to y=4$ and $x=2\\to y=7$: not a function'),
        takeaway: say('Sarrera bakoitzak irteera bakarra: hori da funtzio bat.', 'Cada entrada, una única salida: eso es una función.', 'لكل مدخل مخرج واحد: هذه هي الدالة.', 'One output for each input: that is a function.'),
        figure: (language) => <FunctionTestFigure language={language} />
    },
    {
        id: 'variables',
        stage: 'idea',
        title: say('Aldagai askea eta menpekoa', 'Variable independiente y dependiente', 'المتغير المستقل والتابع', 'Independent and dependent variables'),
        goal: say('Egoera batean sarrera ($x$) eta emaitza ($y$) identifikatzea.', 'Identificar la entrada ($x$) y el resultado ($y$) en una situación.', 'تحديد المدخل ($x$) والنتيجة ($y$) في موقف.', 'Identify the input ($x$) and the output ($y$) in a situation.'),
        explanation: say(
            'Funtzio batek bi aldagairen arteko mendekotasuna deskribatzen du. Aldagai askea ($x$) aukeratzen edo neurtzen dugun magnitudea da; aldagai menpekoa ($y$), $x$-ren balioaren arabera aldatzen dena. "$y$ funtzioa da $x$-ren" esaten da. Bereizteko, galdetu: zer aukeratzen dut? Zer ateratzen da horren ondorioz?',
            'Una función describe cómo depende una variable de otra. La variable independiente ($x$) es la magnitud que se elige o se mide; la dependiente ($y$) cambia según el valor de $x$. Se dice que "$y$ es función de $x$". Para distinguirlas pregunta: ¿qué elijo? ¿Qué resulta de ello?',
            'تصف الدالة كيف يعتمد متغير على آخر. المتغير المستقل ($x$) هو الكمية التي نختارها أو نقيسها، والتابع ($y$) يتغير بحسب قيمة $x$. نقول إن "$y$ دالة في $x$". للتمييز اسأل: ماذا أختار؟ وماذا ينتج عن ذلك؟', 'A function describes how one variable depends on another. The independent variable ($x$) is the quantity that you choose or measure; the dependent variable ($y$) changes according to the value of $x$. You say that "$y$ is a function of $x$". To tell them apart, ask: what do I choose? What results from it?'
        ),
        problem: say('Bizikletaz egindako denboraren arabera distantzia neurtzen dugu. Zein da $x$ eta zein $y$?', 'Medimos la distancia recorrida en bici según el tiempo. ¿Cuál es $x$ y cuál es $y$?', 'نقيس المسافة المقطوعة بالدراجة بحسب الزمن. ما $x$ وما $y$؟', 'We measure the distance travelled by bike over time. Which is $x$ and which is $y$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zer aukeratzen edo neurtzen dugu? Denbora ($t$): aldagai askea.', '¿Qué elegimos o medimos? El tiempo ($t$): variable independiente.', 'ماذا نختار أو نقيس؟ الزمن ($t$): المتغير المستقل.', 'What do we choose or measure? Time ($t$): independent variable.'), math: '$x=t$' },
            { text: say('Zer ateratzen da? Distantzia ($d$), denboraren araberakoa: aldagai menpekoa.', '¿Qué resulta? La distancia ($d$), que depende del tiempo: variable dependiente.', 'ماذا ينتج؟ المسافة ($d$) وهي تعتمد على الزمن: المتغير التابع.', 'What results? The distance ($d$), which depends on time: dependent variable.'), math: '$y=d$' },
            { text: say('Funtzioa: distantzia denboraren funtzioa da.', 'La función: la distancia es función del tiempo.', 'الدالة: المسافة دالة في الزمن.', 'The function: distance is a function of time.'), math: '$y=f(x)$' }
        ],
        example: say('Kiloak ($x$) → prezioa ($y$)', 'Kilos ($x$) → precio ($y$)', 'الكيلوغرامات ($x$) ← السعر ($y$)', 'Kilos ($x$) → price ($y$)'),
        takeaway: say('Aldagai askea sartzen da; menpekoa ateratzen da.', 'La independiente entra; la dependiente sale.', 'المستقل يدخل والتابع يخرج.', 'The independent variable goes in; the dependent variable comes out.'),
        figure: (language) => <VariablesFigure language={language} />
    },
    {
        id: 'tables',
        stage: 'representations',
        title: say('Funtzioa taula batean', 'La función en una tabla', 'الدالة في جدول', 'The function in a table'),
        goal: say('Arau batetik balio-taula osatzea eta bikoteak puntu gisa idaztea.', 'Completar una tabla de valores a partir de una regla y escribir las parejas como puntos.', 'إكمال جدول قيم من قاعدة وكتابة الأزواج نقاطًا.', 'Complete a table of values from a rule and write the pairs as points.'),
        explanation: say(
            'Balio-taulan $x$-ren balioak eta dagozkien $y$ emaitzak jartzen dira. Arauak (formulak) esaten du $x$-rekin zer egin behar den. Taulako zutabe bakoitza $(x, y)$ puntu bat da; puntuak planoan jarrita, grafikoa lortzen da. Funtzio bat denez, $x$ bakoitzak zutabe bakarra du.',
            'En una tabla de valores se escriben los valores de $x$ y los resultados $y$ que les corresponden. La regla (la fórmula) dice qué hacer con cada $x$. Cada columna de la tabla es un punto $(x, y)$; al situarlos en el plano se obtiene la gráfica. Como es una función, cada $x$ tiene una sola columna.',
            'في جدول القيم نكتب قيم $x$ ونتائج $y$ المقابلة. القاعدة (الصيغة) تبيّن ما نفعله بكل $x$. كل عمود في الجدول نقطة $(x, y)$، وبوضعها في المستوى نحصل على الرسم. وبما أنها دالة فلكل $x$ عمود واحد.', 'In a table of values, you write the values of $x$ and the matching outputs $y$. The rule (the formula) says what to do with each $x$. Each column of the table is a point $(x, y)$; when you plot them on the plane, you get the graph. Because it is a function, each $x$ has only one column.'
        ),
        problem: say('Osatu $y=2x+1$ funtzioaren taula, $x=-1,\\ 0,\\ 2$ balioetarako.', 'Completa la tabla de $y=2x+1$ para $x=-1,\\ 0,\\ 2$.', 'أكمل جدول $y=2x+1$ عندما $x=-1,\\ 0,\\ 2$.', 'Complete the table for $y=2x+1$ for $x=-1,\\ 0,\\ 2$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu $x=-1$, parentesi artean.', 'Sustituye $x=-1$, entre paréntesis.', 'عوّض $x=-1$ بين قوسين.', 'Substitute $x=-1$ in brackets.'), math: '$2\\cdot(-1)+1=-1$' },
            { text: say('Egin gauza bera $x=0$ eta $x=2$ balioekin.', 'Haz lo mismo con $x=0$ y $x=2$.', 'افعل الشيء نفسه مع $x=0$ و$x=2$.', 'Do the same with $x=0$ and $x=2$.'), math: '$2\\cdot 0+1=1\\qquad 2\\cdot 2+1=5$' },
            { text: say('Idatzi sarrera bakoitza bere emaitzarekin.', 'Escribe cada entrada con su resultado.', 'اكتب كل مدخل مع نتيجته.', 'Write each input with its output.'), math: '$(-1,\\,-1),\\ (0,\\,1),\\ (2,\\,5)$' }
        ],
        example: '$\\begin{array}{c|ccc}x&-1&0&2\\\\ \\hline y&-1&1&5\\end{array}$',
        takeaway: say('Taula bat sarrera-irteera bikoteen zerrenda da; bikote bakoitza puntu bat da.', 'Una tabla es una lista de parejas entrada-salida; cada pareja es un punto.', 'الجدول قائمة بأزواج المدخل والمخرج، وكل زوج نقطة.', 'A table is a list of input-output pairs; each pair is a point.'),
        figure: (language) => <TableFigure language={language} />
    },
    {
        id: 'formula',
        stage: 'representations',
        title: say('Formula eta f(x) notazioa', 'La fórmula y la notación f(x)', 'الصيغة والترميز f(x)', 'The formula and the f(x) notation'),
        goal: say('$x$ formula batean ordezkatzea, $f(x)$ interpretatzea eta puntu bat funtzioarena den egiaztatzea.', 'Sustituir $x$ en una fórmula, interpretar $f(x)$ y comprobar si un punto es de la función.', 'التعويض عن $x$ في صيغة وفهم $f(x)$ والتحقق من انتماء نقطة إلى الدالة.', 'Substitute $x$ into a formula, interpret $f(x)$ and check whether a point belongs to the function.'),
        explanation: say(
            'Funtzio bat formula baten bidez ematen da: $y=2x+1$ edo $f(x)=2x+1$. $f(x)$ idazkeran, $x$ sarrera da eta $f(x)$ dagokion emaitza. $f(3)$ kalkulatzeko, ordeztu $x$ 3-rekin eta egin eragiketak hierarkia jarraituz (berreturak lehenik). $f(a)=b$ esateak $(a, b)$ puntua funtzioarena dela esan nahi du.',
            'Una función se da con una fórmula: $y=2x+1$ o $f(x)=2x+1$. En la notación $f(x)$, $x$ es la entrada y $f(x)$ el resultado que le corresponde. Para calcular $f(3)$, sustituye $x$ por 3 y opera respetando la jerarquía (primero las potencias). Decir $f(a)=b$ significa que el punto $(a, b)$ es de la función.',
            'تُعطى الدالة بصيغة: $y=2x+1$ أو $f(x)=2x+1$. في الترميز $f(x)$ تمثّل $x$ المدخل و$f(x)$ النتيجة المقابلة. لحساب $f(3)$ عوّض $x$ بـ 3 وأجرِ العمليات بحسب الأولويات (القوى أولًا). قولنا $f(a)=b$ يعني أن النقطة $(a, b)$ تنتمي إلى الدالة.', 'A function is given by a formula: $y=2x+1$ or $f(x)=2x+1$. In the $f(x)$ notation, $x$ is the input and $f(x)$ is the output that goes with it. To calculate $f(3)$, substitute 3 for $x$ and work it out following the order of operations (powers first). Saying $f(a)=b$ means that the point $(a, b)$ belongs to the function.'
        ),
        problem: say('Baldin $f(x)=x^{2}-3$, kalkulatu $f(-2)$. $(2, 1)$ puntua funtzioarena al da?', 'Si $f(x)=x^{2}-3$, calcula $f(-2)$. ¿Es $(2, 1)$ un punto de la función?', 'إذا كانت $f(x)=x^{2}-3$ فاحسب $f(-2)$. هل النقطة $(2, 1)$ على الدالة؟', 'If $f(x)=x^{2}-3$, calculate $f(-2)$. Is $(2, 1)$ a point on the function?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Jarri $-2$ $x$-ren ordez, parentesi artean, zeinua zaintzeko.', 'Sustituye $x$ por $-2$, entre paréntesis, para cuidar el signo.', 'عوّض $x$ بـ $-2$ بين قوسين للحفاظ على الإشارة.', 'Substitute $-2$ for $x$, in brackets, to be careful with the sign.'), math: '$f(-2)=(-2)^{2}-3$' },
            { text: say('Berretura lehenik, gero kenketa.', 'Primero la potencia, después la resta.', 'القوة أولًا ثم الطرح.', 'First the power, then the subtraction.'), math: '$=4-3=1$' },
            { text: say('$(2, 1)$: kalkulatu $f(2)$ eta konparatu 1 balioarekin.', '$(2, 1)$: calcula $f(2)$ y compáralo con 1.', '$(2, 1)$: احسب $f(2)$ وقارنها بـ 1.', '$(2, 1)$: calculate $f(2)$ and compare it with 1.'), math: '$f(2)=2^{2}-3=1\\ \\checkmark$' }
        ],
        example: '$f(x)=2x+1\\ \\to\\ f(3)=7$',
        takeaway: say('$f(3)$-k eskatzen du: zein da emaitza $x=3$ denean?', '$f(3)$ pregunta: ¿cuál es el resultado cuando $x=3$?', '$f(3)$ تسأل: ما النتيجة عندما $x=3$؟', '$f(3)$ asks: what is the output when $x=3$?'),
        figure: (language) => <FormulaFigure language={language} />
    },
    {
        id: 'plot',
        stage: 'representations',
        title: say('Funtzio bat marraztu', 'Dibujar una función', 'رسم دالة', 'Drawing a function'),
        goal: say('Taulatik puntuak kokatzea eta grafikoa osatzea, eskala egokia aukeratuz.', 'Situar los puntos de una tabla y completar la gráfica eligiendo una escala adecuada.', 'وضع نقاط الجدول وإكمال الرسم مع اختيار تدريج مناسب.', 'Plot the points from a table and complete the graph by choosing a suitable scale.'),
        explanation: say(
            'Funtzio bat marrazteko: (1) egin balio-taula, (2) kokatu puntuak planoan eta (3) elkartu, magnitudeak tarteko balioak hartzen baditu. Zuzenetarako bi puntu nahikoak dira; kurbetarako, zenbat eta puntu gehiago, orduan eta marra zehatzagoa. Eskala ardatz bakoitzean aukeratu behar da: batzuetan Y ardatza ez da 0tik hasten, aldaketa txikiak ondo ikusteko.',
            'Para dibujar una función: (1) haz la tabla de valores, (2) sitúa los puntos en el plano y (3) únelos si la magnitud admite valores intermedios. Para las rectas bastan dos puntos; para las curvas, cuantos más puntos, más precisa es la línea. La escala se elige en cada eje: a veces el eje Y no empieza en 0 para apreciar bien los cambios pequeños.',
            'لرسم دالة: (1) كوّن جدول القيم، (2) ضع النقاط في المستوى، (3) صِلها إذا كانت الكمية تقبل قيمًا وسيطة. للخطوط المستقيمة تكفي نقطتان، أما المنحنيات فكلما زادت النقاط كان الخط أدق. يُختار التدريج لكل محور؛ وأحيانًا لا يبدأ محور Y من 0 لتظهر التغيرات الصغيرة.', 'To draw a function: (1) make the table of values, (2) plot the points on the plane and (3) join them if the quantity can take values in between. For straight lines, two points are enough; for curves, the more points you use, the more accurate the line is. The scale is chosen on each axis: sometimes the y-axis does not start at 0, so that small changes are easier to see.'
        ),
        problem: say('Marraztu $y=x^{2}-2$, $x=-2,\\ -1,\\ 0,\\ 1,\\ 2$ balioekin.', 'Dibuja $y=x^{2}-2$ con $x=-2,\\ -1,\\ 0,\\ 1,\\ 2$.', 'ارسم $y=x^{2}-2$ بالقيم $x=-2,\\ -1,\\ 0,\\ 1,\\ 2$.', 'Draw $y=x^{2}-2$ for $x=-2,\\ -1,\\ 0,\\ 1,\\ 2$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Osatu taula: ordeztu $x$ bakoitza.', 'Completa la tabla: sustituye cada $x$.', 'أكمل الجدول: عوّض كل $x$.', 'Complete the table: substitute each $x$.'), math: '$\\begin{array}{c|ccccc}x&-2&-1&0&1&2\\\\ \\hline y&2&-1&-2&-1&2\\end{array}$' },
            { text: say('Kokatu bost puntuak planoan.', 'Sitúa los cinco puntos en el plano.', 'ضع النقاط الخمس في المستوى.', 'Plot the five points on the plane.'), math: '$(-2,\\,2),\\ (-1,\\,-1),\\ (0,\\,-2),\\ (1,\\,-1),\\ (2,\\,2)$' },
            { text: say('Elkartu puntuak marra leun batez: parabola bat da.', 'Une los puntos con una línea suave: es una parábola.', 'صِل النقاط بخط ناعم: إنه قطع مكافئ.', 'Join the points with a smooth line: it is a parabola.') }
        ],
        example: say('$y=x-1$: bi puntu nahikoak dira, $(0,\\,-1)$ eta $(2,\\,1)$', '$y=x-1$: bastan dos puntos, $(0,\\,-1)$ y $(2,\\,1)$', '$y=x-1$: تكفي نقطتان، $(0,\\,-1)$ و$(2,\\,1)$', '$y=x-1$: two points are enough, $(0,\\,-1)$ and $(2,\\,1)$'),
        takeaway: say('Taula → puntuak → marra. Eskala ondo aukeratu.', 'Tabla → puntos → línea. Elige bien la escala.', 'جدول ← نقاط ← خط. اختر التدريج جيدًا.', 'Table → points → line. Choose the scale carefully.'),
        figure: (language) => <PlotFigure language={language} />
    },
    {
        id: 'continuity',
        stage: 'representations',
        title: say('Funtzio jarraituak eta etenak', 'Funciones continuas y discontinuas', 'الدوال المتصلة والمنفصلة', 'Continuous and discontinuous functions'),
        goal: say('Egoera batek grafiko jarraitua edo etena behar duen erabakitzea.', 'Decidir si una situación necesita una gráfica continua o discontinua.', 'تحديد ما إذا كان الموقف يحتاج رسمًا متصلًا أم منفصلًا.', 'Decide whether a situation needs a continuous or a discontinuous graph.'),
        explanation: say(
            'Magnitudeak tarte bateko balio guztiak har ditzakeenean (denbora, distantzia, tenperatura), grafikoa jarraitua da: arkatza altxatu gabe marraz daiteke. Balio jakin batzuk bakarrik posible direnean (pertsona kopurua, eguneko salmentak), puntuak bakanduta daude edo jauziak daude: grafikoa etena da, eta puntuak ez dira elkartu behar.',
            'Cuando la magnitud puede tomar todos los valores de un intervalo (tiempo, distancia, temperatura), la gráfica es continua: se dibuja sin levantar el lápiz. Cuando solo son posibles valores concretos (número de personas, ventas de cada día), los puntos están separados o hay saltos: la gráfica es discontinua y los puntos no se unen.',
            'عندما تأخذ الكمية كل قيم فترة ما (الزمن، المسافة، الحرارة) يكون الرسم متصلًا ويُرسم دون رفع القلم. وعندما لا تكون إلا قيم محددة (عدد الأشخاص، مبيعات كل يوم) تكون النقاط منفصلة أو توجد قفزات: الرسم منفصل ولا نصل النقاط.', 'When the quantity can take every value in an interval (time, distance, temperature), the graph is continuous: you draw it without lifting your pencil. When only certain values are possible (number of people, daily sales), the points are separate or there are jumps: the graph is discontinuous and the points are not joined.'
        ),
        problem: say('Erabaki grafiko mota: autoaren distantzia denboraren arabera; egunero saldutako liburuak.', 'Decide el tipo de gráfica: distancia de un coche según el tiempo; libros vendidos cada día.', 'حدّد نوع الرسم: مسافة سيارة بحسب الزمن؛ الكتب المبيعة كل يوم.', 'Decide the type of graph: distance of a car against time; books sold each day.'),
        stepsKind: 'facts',
        steps: [
            { title: say('Distantzia eta denbora', 'Distancia y tiempo', 'المسافة والزمن', 'Distance and time'), text: say('Tarteko balioak daude (2,5 ordu, 13,7 km): jarraitua.', 'Hay valores intermedios (2,5 horas, 13,7 km): continua.', 'توجد قيم وسيطة (2.5 ساعة، 13.7 كم): متصلة.', 'There are values in between (2.5 hours, 13.7 km): continuous.') },
            { title: say('Eguneko salmentak', 'Ventas de cada día', 'مبيعات كل يوم', 'Sales each day'), text: say('Egun bakoitzak zenbaki oso bat du eta ez dago 2,4 libururik: etena.', 'Cada día tiene un número entero y no existen 2,4 libros: discontinua.', 'لكل يوم عدد صحيح ولا يوجد 2.4 كتاب: منفصلة.', 'Each day has a whole number of books, and there is no such thing as 2.4 books: discontinuous.') },
            { title: say('Aparkalekuaren prezioa', 'El precio del aparcamiento', 'سعر موقف السيارات', 'The price of parking'), text: say('Ordu bakoitzeko kobratzen bada, prezioak jauzi egiten du: etena, nahiz eta denbora jarraitua izan.', 'Si se cobra por horas enteras, el precio da saltos: discontinua aunque el tiempo sea continuo.', 'إذا حُسب بالساعات الكاملة قفز السعر: منفصلة مع أن الزمن متصل.', 'If you are charged for whole hours, the price jumps: discontinuous even though time is continuous.') }
        ],
        example: say('Tenperatura-ordua: jarraitua · ikasle kopurua-eguna: etena', 'Temperatura-hora: continua · número de alumnos-día: discontinua', 'الحرارة-الساعة: متصلة · عدد الطلاب-اليوم: منفصلة', 'Temperature-hour: continuous · number of students-day: discontinuous'),
        takeaway: say('Elkartu puntuak tarteko balioek zentzua dutenean bakarrik.', 'Une los puntos solo cuando los valores intermedios tienen sentido.', 'صِل النقاط فقط عندما يكون للقيم الوسيطة معنى.', 'Join the points only when the values in between make sense.'),
        figure: (language) => <ContinuityFigure language={language} />
    },
    {
        id: 'graph-reading',
        stage: 'reading',
        title: say('Balioak grafikotik irakurri', 'Leer valores en una gráfica', 'قراءة القيم من الرسم', 'Reading values from a graph'),
        goal: say('Ardatzen eskalak interpretatzea eta $f(a)$ irakurtzea, edo $f(x)=b$ den $x$ bilatzea.', 'Interpretar las escalas de los ejes y leer $f(a)$, o buscar la $x$ con $f(x)=b$.', 'فهم تدريج المحاور وقراءة $f(a)$ أو إيجاد $x$ التي تحقق $f(x)=b$.', 'Interpret the scales of the axes and read $f(a)$, or find the $x$ with $f(x)=b$.'),
        explanation: say(
            'Grafiko bat irakurri aurretik, begiratu bi ardatzek zer neurtzen duten eta zer unitatetan, eta zenbat balio dagokion lauki bakoitzari. $f(a)$ lortzeko: bilatu $a$ X ardatzean, igo edo jaitsi kurbaraino eta irakurri balioa Y ardatzean. Alderantziz ere egin daiteke: $y=b$ jakinik, bilatu $b$ Y ardatzean, joan kurbaraino eta jaitsi X ardatzera. Y balio berak $x$ bat baino gehiago izan dezake.',
            'Antes de leer una gráfica, mira qué mide cada eje, en qué unidades y cuánto vale cada cuadrícula. Para obtener $f(a)$: localiza $a$ en el eje X, sube o baja hasta la curva y lee el valor en el eje Y. También se puede hacer al revés: conocido $y=b$, busca $b$ en el eje Y, ve hasta la curva y baja al eje X. Un mismo valor de $y$ puede tener más de una $x$.',
            'قبل قراءة الرسم انظر ماذا يقيس كل محور وبأي وحدة وكم تساوي كل خانة. للحصول على $f(a)$: حدّد $a$ على محور X ثم اصعد أو انزل حتى المنحنى واقرأ القيمة على محور Y. ويمكن العكس: إذا عُلمت $y=b$ فابحث عن $b$ على محور Y واذهب إلى المنحنى ثم انزل إلى محور X. وقد يكون للقيمة نفسها من $y$ أكثر من $x$.', 'Before you read a graph, check what each axis measures, in which units, and how much each grid square is worth. To find $f(a)$: locate $a$ on the x-axis, go up or down to the curve and read the value on the y-axis. You can also do it the other way round: given $y=b$, find $b$ on the y-axis, go across to the curve and then down to the x-axis. The same value of $y$ can go with more than one $x$.'
        ),
        problem: say('Tenperatura-grafikoan, zein tenperatura dago $x=4$ ordutan? Zein ordutan da tenperatura 4 °C?', 'En la gráfica de temperatura, ¿qué temperatura hay cuando $x=4$ horas? ¿A qué hora hay 4 °C?', 'في رسم الحرارة، ما الحرارة عندما $x=4$ ساعات؟ ومتى تكون 4 °م؟', 'On the temperature graph, what is the temperature when $x=4$ hours? At what time is it 4 °C?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bilatu $x=4$ ardatz horizontalean eta igo kurbaraino.', 'Busca $x=4$ en el eje horizontal y sube hasta la curva.', 'ابحث عن $x=4$ على المحور الأفقي واصعد حتى المنحنى.', 'Find $x=4$ on the horizontal axis and go up to the curve.'), math: '$f(4)=8$' },
            { text: say('Bilatu 4 °C ardatz bertikalean eta joan kurbaraino.', 'Busca 4 °C en el eje vertical y ve hasta la curva.', 'ابحث عن 4 °م على المحور الرأسي واذهب إلى المنحنى.', 'Find 4 °C on the vertical axis and go across to the curve.'), math: '$f(x)=4$' },
            { text: say('Jaitsi X ardatzera: 3. ordua.', 'Baja al eje X: la hora 3.', 'انزل إلى محور X: الساعة 3.', 'Go down to the x-axis: hour 3.'), math: '$x=3$' }
        ],
        example: say('$f(4)=8$ da $(4,\\,8)$ puntua grafikoan dagoela esatea', '$f(4)=8$ equivale a decir que $(4,\\,8)$ está en la gráfica', '$f(4)=8$ تعني أن النقطة $(4,\\,8)$ على الرسم', '$f(4)=8$ is the same as saying that $(4,\\,8)$ is on the graph'),
        takeaway: say('Lehen koordenatua horizontala da; bigarrena, bertikala.', 'La primera coordenada es horizontal; la segunda, vertical.', 'الإحداثي الأول أفقي والثاني رأسي.', 'The first coordinate is horizontal; the second, vertical.'),
        figure: (language) => <ReadFigure language={language} />
    },
    {
        id: 'intercepts',
        stage: 'reading',
        title: say('Ardatzekiko ebakidurak', 'Puntos de corte con los ejes', 'نقاط التقاطع مع المحاور', 'Points where the graph crosses the axes'),
        goal: say('Funtzio baten ebakidurak X eta Y ardatzekin kalkulatzea eta irakurtzea.', 'Calcular y leer los puntos de corte de una función con los ejes X e Y.', 'حساب وقراءة نقاط تقاطع دالة مع محوري X وY.', 'Calculate and read the points where a function crosses the x- and y-axes.'),
        explanation: say(
            'Y ardatzarekiko ebakiduran $x=0$ da: $(0, f(0))$ puntua. Funtzio batek ardatz hori gehienez puntu batean ebakitzen du. X ardatzarekiko ebakiduretan $y=0$ da: $f(x)=0$ ekuazioaren ebazpenak dira, eta batzuk, asko edo bat ere ez izan daitezke. Ebakidura-puntu batean, koordenatuetako bat 0 da.',
            'En el punto de corte con el eje Y se cumple $x=0$: es el punto $(0, f(0))$. Una función corta a ese eje como mucho en un punto. En los cortes con el eje X se cumple $y=0$: son las soluciones de la ecuación $f(x)=0$, y puede haber varios, ninguno o uno. En un punto de corte, una de las coordenadas vale 0.',
            'عند نقطة التقاطع مع محور Y تكون $x=0$: النقطة $(0, f(0))$. تقطع الدالة هذا المحور في نقطة واحدة على الأكثر. وعند التقاطع مع محور X تكون $y=0$: إنها حلول المعادلة $f(x)=0$ وقد تكون عدة نقاط أو لا شيء أو نقطة. في نقطة التقاطع تساوي إحدى الإحداثيين صفرًا.', 'At the point where the graph crosses the y-axis, $x=0$: it is the point $(0, f(0))$. A function crosses that axis at most once. Where it crosses the x-axis, $y=0$: these are the solutions of the equation $f(x)=0$, and there can be several, none or just one. At a crossing point, one of the coordinates is 0.'
        ),
        problem: say('Zein dira $y=2x-6$ zuzenaren ebakidurak ardatzekin?', '¿Cuáles son los puntos de corte de $y=2x-6$ con los ejes?', 'ما نقاط تقاطع $y=2x-6$ مع المحورين؟', 'What are the points where $y=2x-6$ crosses the axes?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Y ardatza: $x=0$ ordeztu.', 'Eje Y: sustituye $x=0$.', 'محور Y: عوّض $x=0$.', 'y-axis: substitute $x=0$.'), math: '$y=2\\cdot 0-6=-6\\ \\to\\ (0,\\,-6)$' },
            { text: say('X ardatza: $y=0$ ipini eta ebatzi.', 'Eje X: pon $y=0$ y resuelve.', 'محور X: ضع $y=0$ وحلّ.', 'x-axis: put $y=0$ and solve.'), math: '$0=2x-6\\ \\to\\ x=3$' },
            { text: say('Ebakidura: $(3,\\,0)$.', 'Punto de corte: $(3,\\,0)$.', 'نقطة التقاطع: $(3,\\,0)$.', 'Crossing point: $(3,\\,0)$.'), math: '$(3,\\,0)$' }
        ],
        example: '$y=x^{2}-4$: $(0,\\,-4),\\ (-2,\\,0),\\ (2,\\,0)$',
        takeaway: say('Y ardatza: $x=0$. X ardatza: $y=0$.', 'Eje Y: $x=0$. Eje X: $y=0$.', 'محور Y: $x=0$. محور X: $y=0$.', 'y-axis: $x=0$. x-axis: $y=0$.'),
        figure: (language) => <InterceptsFigure language={language} />
    },
    {
        id: 'variation',
        stage: 'reading',
        title: say('Gorakorra, beherakorra eta konstantea', 'Creciente, decreciente y constante', 'متزايدة ومتناقصة وثابتة', 'Increasing, decreasing and constant'),
        goal: say('Grafiko baten gorakortasun-, beherakortasun- eta konstantasun-tarteak $x$-ren tarteekin esatea.', 'Decir los tramos en que una gráfica crece, decrece o es constante con intervalos de $x$.', 'ذكر الفترات التي تتزايد أو تتناقص أو تثبت فيها الدالة بفترات $x$.', 'Say which sections of a graph are increasing, decreasing or constant, using intervals of $x$.'),
        explanation: say(
            'Grafikoa ezkerretik eskuinera irakurtzen da. Gora badoa, funtzioa gorakorra da tarte horretan ($x$ handitzean $y$ handitzen da); behera badoa, beherakorra; eta horizontala bada, konstantea. Tarteak $x$ balioekin ematen dira: "$(0, 2)$ tartean gorakorra da". Tarte baten muturrak $x$-ren balioak dira, ez $y$-renak.',
            'La gráfica se lee de izquierda a derecha. Si sube, la función es creciente en ese tramo (al aumentar $x$ aumenta $y$); si baja, decreciente; si es horizontal, constante. Los tramos se dan con valores de $x$: "en el intervalo $(0, 2)$ es creciente". Los extremos de un intervalo son valores de $x$, no de $y$.',
            'يُقرأ الرسم من اليسار إلى اليمين. إذا صعد فالدالة متزايدة في هذه الفترة (بزيادة $x$ تزيد $y$)، وإذا هبط فمتناقصة، وإذا كان أفقيًا فثابتة. تُعطى الفترات بقيم $x$: "في الفترة $(0, 2)$ متزايدة". وطرفا الفترة قيمتان من $x$ لا من $y$.', 'Read a graph from left to right. If it goes up, the function is increasing in that section (as $x$ increases, $y$ increases); if it goes down, decreasing; if it is horizontal, constant. Sections are given with values of $x$: "in the interval $(0, 2)$ it is increasing". The end points of an interval are values of $x$, not of $y$.'
        ),
        problem: say('Hegazkinaren altuera igo egiten da 0–2 orduetan, konstante da 2–4 orduetan, berriro igotzen da 4–5ean eta jaisten 5–8an. Zein tartetan da beherakorra?', 'La altura de la avioneta sube entre 0–2 h, es constante entre 2–4 h, vuelve a subir entre 4–5 y baja entre 5–8. ¿En qué tramo decrece?', 'يرتفع ارتفاع الطائرة بين 0–2 س، ويثبت بين 2–4 س، ثم يرتفع بين 4–5 وينخفض بين 5–8. في أي فترة يتناقص؟', 'The height of the small plane rises between 0 and 2 h, stays constant between 2 and 4 h, rises again between 4 and 5 and falls between 5 and 8. In which section is it decreasing?'),
        stepsKind: 'facts',
        steps: [
            { title: say('Gorakorra', 'Creciente', 'متزايدة', 'Increasing'), text: say('$x$ handitzean $y$ handitzen da.', 'Al aumentar $x$, aumenta $y$.', 'بزيادة $x$ تزيد $y$.', 'As $x$ increases, $y$ increases.'), math: '$(0,\\,2)\\ ;\\ (4,\\,5)$' },
            { title: say('Konstantea', 'Constante', 'ثابتة', 'Constant'), text: say('$x$ handitzen da, baina $y$ ez da aldatzen.', '$x$ aumenta, pero $y$ no cambia.', 'تزيد $x$ لكن $y$ لا تتغير.', '$x$ increases, but $y$ does not change.'), math: '$(2,\\,4)$' },
            { title: say('Beherakorra', 'Decreciente', 'متناقصة', 'Decreasing'), text: say('$x$ handitzean $y$ txikitzen da.', 'Al aumentar $x$, disminuye $y$.', 'بزيادة $x$ تنقص $y$.', 'As $x$ increases, $y$ decreases.'), math: '$(5,\\,8)$' }
        ],
        example: say('Beherakorra: $(5,\\,8)$ tartean', 'Decreciente en el intervalo $(5,\\,8)$', 'متناقصة في الفترة $(5,\\,8)$', 'Decreasing in the interval $(5,\\,8)$'),
        takeaway: say('Irakurri beti ezkerretik eskuinera eta eman tarteak $x$-rekin.', 'Lee siempre de izquierda a derecha y da los tramos con $x$.', 'اقرأ دائمًا من اليسار إلى اليمين وأعطِ الفترات بقيم $x$.', 'Always read from left to right and give the sections using $x$.'),
        figure: (language) => <VariationFigure language={language} />
    },
    {
        id: 'extremes',
        stage: 'reading',
        title: say('Maximoak eta minimoak', 'Máximos y mínimos', 'القيم العظمى والصغرى', 'Maximum and minimum points'),
        goal: say('Grafiko baten maximoak eta minimoak (lokalak eta absolutuak) identifikatzea.', 'Identificar los máximos y mínimos (locales y absolutos) de una gráfica.', 'تحديد القيم العظمى والصغرى (المحلية والمطلقة) في الرسم.', 'Identify the maximum and minimum points (local and absolute) of a graph.'),
        explanation: say(
            'Funtzioak gorakorra izatetik beherakorra izatera pasatzen den puntua maximoa da; beherakorra izatetik gorakorra izatera pasatzen denean, minimoa. Muturrak funtzioaren gailur eta haranak dira. Maximo absolutua grafiko osoko punturik altuena da; minimo absolutua, baxuena. Muturra puntu osoa da: $(x, y)$ idazten da, adibidez $(3, 8)$.',
            'El punto donde la función pasa de creciente a decreciente es un máximo; donde pasa de decreciente a creciente, un mínimo. Los extremos son las cimas y los valles de la gráfica. El máximo absoluto es el punto más alto de toda la gráfica; el mínimo absoluto, el más bajo. Un extremo es un punto completo: se escribe $(x, y)$, por ejemplo $(3, 8)$.',
            'النقطة التي تنتقل فيها الدالة من التزايد إلى التناقص قيمة عظمى؛ والتي تنتقل فيها من التناقص إلى التزايد قيمة صغرى. القيم القصوى هي قمم الرسم ووديانه. القيمة العظمى المطلقة هي أعلى نقطة في الرسم كله والصغرى المطلقة أدناها. والقيمة القصوى نقطة كاملة تُكتب $(x, y)$ مثل $(3, 8)$.', 'The point where the function changes from increasing to decreasing is a maximum; where it changes from decreasing to increasing, a minimum. The turning points are the peaks and valleys of the graph. The absolute maximum is the highest point of the whole graph; the absolute minimum is the lowest. A turning point is a full point: write it as $(x, y)$, for example $(3, 8)$.'
        ),
        problem: say('Abiadura-grafikoan, zein dira maximoak eta minimoa? Zein da maximo absolutua?', 'En la gráfica de la velocidad, ¿cuáles son los máximos y el mínimo? ¿Cuál es el máximo absoluto?', 'في رسم السرعة، ما القيم العظمى والصغرى؟ وما العظمى المطلقة؟', 'On the speed graph, what are the maximum points and the minimum point? What is the absolute maximum?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bilatu gora-behera aldaketak: 3an eta 7an gorakorra beherakor bihurtzen da.', 'Busca dónde cambia la tendencia: en 3 y en 7 pasa de creciente a decreciente.', 'ابحث عن تغير الاتجاه: عند 3 و7 ينتقل من التزايد إلى التناقص.', 'Look for where the trend changes: at 3 and at 7 it changes from increasing to decreasing.'), math: '$(3,\\,8)\\ ;\\ (7,\\,7)$' },
            { text: say('5ean beherakorra gorakor bihurtzen da: minimoa.', 'En 5 pasa de decreciente a creciente: mínimo.', 'عند 5 ينتقل من التناقص إلى التزايد: قيمة صغرى.', 'At 5 it changes from decreasing to increasing: minimum.'), math: '$(5,\\,2)$' },
            { text: say('Bi maximoetatik altuena absolutua da.', 'El más alto de los dos máximos es el absoluto.', 'الأعلى من القيمتين العظميين هو المطلقة.', 'The higher of the two maximum points is the absolute maximum.'), math: '$(3,\\,8)$' }
        ],
        example: say('Maximoak: 8 eta 7 · minimoa: 2', 'Máximos: 8 y 7 · mínimo: 2', 'القيم العظمى: 8 و7 · الصغرى: 2', 'Maximum values: 8 and 7 · minimum value: 2'),
        takeaway: say('Muturrak joera aldatzen den lekuan daude. Idatzi puntu osoa.', 'Los extremos están donde cambia la tendencia. Escribe el punto completo.', 'القيم القصوى حيث يتغير الاتجاه. اكتب النقطة كاملة.', 'Turning points are where the trend changes. Write the full point.'),
        figure: (language) => <ExtremesFigure language={language} />
    },
    {
        id: 'direct-proportion',
        stage: 'proportional',
        title: say('Proportzionaltasun zuzeneko funtzioa', 'La función de proporcionalidad directa', 'دالة التناسب الطردي', 'The direct proportion function'),
        goal: say('$y=mx$ funtzioa ezagutzea, $m$ konstantea kalkulatzea eta grafikoa jatorritik pasatzen dela ulertzea.', 'Reconocer la función $y=mx$, calcular la constante $m$ y entender que su gráfica pasa por el origen.', 'التعرف على الدالة $y=mx$ وحساب الثابت $m$ وفهم أن رسمها يمر بنقطة الأصل.', 'Recognise the function $y=mx$, calculate the constant $m$ and understand that its graph passes through the origin.'),
        explanation: say(
            'Bi magnitude zuzenki proportzionalak badira, $x$ bikoiztean $y$ ere bikoizten da, eta $y$ eta $x$-ren zatidura beti bera da: $m=\\dfrac{y}{x}$. Funtzioa $y=mx$ da, eta $m$ proportzionaltasun-konstantea. Grafikoa jatorritik, $(0,0)$-tik, pasatzen den zuzena da. $m$-k esaten du $x$ unitate bat handitzean $y$ zenbat aldatzen den.',
            'Si dos magnitudes son directamente proporcionales, al duplicar $x$ también se duplica $y$, y el cociente $\\dfrac{y}{x}$ es siempre el mismo: $m=\\dfrac{y}{x}$. La función es $y=mx$ y $m$ es la constante de proporcionalidad. Su gráfica es una recta que pasa por el origen, $(0,0)$. $m$ dice cuánto cambia $y$ cuando $x$ aumenta una unidad.',
            'إذا كانت كميتان متناسبتين طرديًا فعند مضاعفة $x$ تتضاعف $y$ ويبقى خارج القسمة $\\dfrac{y}{x}$ ثابتًا: $m=\\dfrac{y}{x}$. الدالة هي $y=mx$ و$m$ ثابت التناسب. رسمها خط مستقيم يمر بنقطة الأصل $(0,0)$. ويبيّن $m$ مقدار تغير $y$ عند زيادة $x$ وحدة واحدة.', 'If two quantities are directly proportional, when you double $x$, $y$ doubles too, and the quotient $\\dfrac{y}{x}$ is always the same: $m=\\dfrac{y}{x}$. The function is $y=mx$ and $m$ is the constant of proportionality. Its graph is a straight line through the origin, $(0,0)$. $m$ tells you how much $y$ changes when $x$ increases by one unit.'
        ),
        problem: say('Kilo bat laranjak 1,20 € balio du. Idatzi prezioaren funtzioa eta kalkulatu 5 kg-ren prezioa.', 'Un kilo de naranjas cuesta 1,20 €. Escribe la función del precio y calcula el de 5 kg.', 'كيلوغرام البرتقال بـ 1.20 €. اكتب دالة السعر واحسب ثمن 5 كغ.', 'One kilo of oranges costs €1.20. Write the price function and calculate the price of 5 kg.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x$ kiloak dira eta $y$ prezioa. Konstantea kilo bakoitzaren prezioa da.', '$x$ son los kilos e $y$ el precio. La constante es el precio de un kilo.', '$x$ الكيلوغرامات و$y$ السعر. الثابت هو سعر كيلوغرام واحد.', '$x$ is the number of kilos and $y$ the price. The constant is the price of one kilo.'), math: same('$y=1{,}2\\,x$') },
            { text: say('Ordeztu $x=5$: 6 € ordaindu behar dira.', 'Sustituye $x=5$: se pagan 6 €.', 'عوّض $x=5$: يُدفع 6 €.', 'Substitute $x=5$: you pay €6.'), math: same('$y=1{,}2\\cdot 5=6$') },
            { text: say('Grafikoa: $(0,\\,0)$ eta $(5,\\,6)$ puntuetatik pasatzen den zuzena.', 'Gráfica: la recta que pasa por $(0,\\,0)$ y $(5,\\,6)$.', 'الرسم: الخط المار بالنقطتين $(0,\\,0)$ و$(5,\\,6)$.', 'Graph: the straight line through $(0,\\,0)$ and $(5,\\,6)$.') }
        ],
        example: '$y=2x\\ \\Rightarrow\\ (0,0),\\ (1,2),\\ (2,4),\\ (3,6)$',
        takeaway: say('$\\dfrac{y}{x}$ beti berdina bada, proportzionaltasun zuzena da eta grafikoak jatorria zeharkatzen du.', 'Si $\\dfrac{y}{x}$ es siempre igual, hay proporcionalidad directa y la gráfica pasa por el origen.', 'إذا كان $\\dfrac{y}{x}$ ثابتًا فالتناسب طردي ويمر الرسم بنقطة الأصل.', 'If $\\dfrac{y}{x}$ is always the same, there is direct proportion and the graph passes through the origin.'),
        figure: (language) => <ProportionalFigure language={language} />
    },
    {
        id: 'slope',
        stage: 'proportional',
        title: say('Malda: aldapa kalkulatzen', 'La pendiente: cómo se calcula', 'الميل: كيف يُحسب', 'Slope: how it is calculated'),
        goal: say('Bi punturen koordenatuekin zuzen baten malda kalkulatzea.', 'Calcular la pendiente de una recta con las coordenadas de dos puntos.', 'حساب ميل خط مستقيم من إحداثيات نقطتين.', 'Calculate the slope of a straight line using the coordinates of two points.'),
        explanation: say(
            'Malda zuzenaren aldapa neurtzen du: $x$ unitate bat eskuinera joanda, $y$ zenbat igo edo jaisten den. Zuzeneko bi puntu emanda, $(x_1, y_1)$ eta $(x_2, y_2)$, malda $m=\\dfrac{y_2-y_1}{x_2-x_1}$ da: $y$-ren aldaketa zati $x$-ren aldaketa. Zuzen baten edozein bi puntuk malda bera ematen dute.',
            'La pendiente mide la inclinación de la recta: cuánto sube o baja $y$ por cada unidad que avanzamos en $x$. Dados dos puntos de la recta, $(x_1, y_1)$ y $(x_2, y_2)$, la pendiente es $m=\\dfrac{y_2-y_1}{x_2-x_1}$: el cambio de $y$ dividido por el cambio de $x$. Dos puntos cualesquiera de una recta dan la misma pendiente.',
            'يقيس الميل انحدار الخط: مقدار صعود أو هبوط $y$ لكل وحدة نتقدمها في $x$. إذا أُعطيت نقطتان من الخط $(x_1, y_1)$ و$(x_2, y_2)$ فالميل $m=\\dfrac{y_2-y_1}{x_2-x_1}$: تغير $y$ مقسومًا على تغير $x$. وأي نقطتين من الخط تعطيان الميل نفسه.', 'The slope measures the steepness of the line: how much $y$ goes up or down for each unit we move along $x$. Given two points on the line, $(x_1, y_1)$ and $(x_2, y_2)$, the slope is $m=\\dfrac{y_2-y_1}{x_2-x_1}$: the change in $y$ divided by the change in $x$. Any two points on a straight line give the same slope.'
        ),
        problem: say('Kalkulatu $A(1, 2)$ eta $B(4, 8)$ puntuetatik pasatzen den zuzenaren malda.', 'Calcula la pendiente de la recta que pasa por $A(1, 2)$ y $B(4, 8)$.', 'احسب ميل الخط المار بالنقطتين $A(1, 2)$ و$B(4, 8)$.', 'Calculate the slope of the line through $A(1, 2)$ and $B(4, 8)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$y$-ren aldaketa: bigarren puntuko $y$ ken lehenengoarena.', 'Cambio de $y$: la $y$ del segundo punto menos la del primero.', 'تغير $y$: $y$ النقطة الثانية ناقص $y$ الأولى.', 'Change in $y$: the $y$ of the second point minus the $y$ of the first.'), math: '$\\Delta y=8-2=6$' },
            { text: say('$x$-ren aldaketa, ordena berean.', 'Cambio de $x$, en el mismo orden.', 'تغير $x$ بالترتيب نفسه.', 'Change in $x$, in the same order.'), math: '$\\Delta x=4-1=3$' },
            { text: say('Zatitu aldaketak.', 'Divide los cambios.', 'اقسم التغيرين.', 'Divide the changes.'), math: '$m=\\dfrac{6}{3}=2$' }
        ],
        example: '$A(0,5),\\ B(2,1)\\ \\to\\ m=-2$',
        takeaway: say('Kendu bi koordenatuak ordena berean: $m=\\Delta y\\,/\\,\\Delta x$.', 'Resta las dos coordenadas en el mismo orden: $m=\\Delta y\\,/\\,\\Delta x$.', 'اطرح الإحداثيين بالترتيب نفسه: $m=\\Delta y\\,/\\,\\Delta x$.', 'Subtract the two coordinates in the same order: $m=\\Delta y\\,/\\,\\Delta x$.'),
        figure: (language) => <SlopeFigure language={language} />
    },
    {
        id: 'slope-sign',
        stage: 'proportional',
        title: say('Maldaren zeinua eta tamaina', 'El signo y el tamaño de la pendiente', 'إشارة الميل وحجمه', 'The sign and the size of the slope'),
        goal: say('Maldaren zeinutik zuzenaren joera ondorioztatzea eta zuzenak aldapen arabera alderatzea.', 'Deducir el comportamiento de la recta por el signo de la pendiente y comparar rectas por su inclinación.', 'استنتاج سلوك الخط من إشارة الميل ومقارنة الخطوط بانحدارها.', 'Work out how a line behaves from the sign of its slope, and compare lines by their steepness.'),
        explanation: say(
            '$m$ positiboa bada, zuzena gorakorra da; negatiboa bada, beherakorra; eta $m=0$ bada, horizontala (funtzio konstantea). $m$-ren balio absolutua zenbat eta handiagoa, orduan eta aldapatsuagoa da zuzena. Zuzen bertikal batek ez du maldarik ($\\Delta x=0$ eta zero-rekin ezin da zatitu) eta ez da funtzioa.',
            'Si $m$ es positiva, la recta es creciente; si es negativa, decreciente; y si $m=0$, horizontal (función constante). Cuanto mayor es el valor absoluto de $m$, más inclinada es la recta. Una recta vertical no tiene pendiente ($\\Delta x=0$ y no se puede dividir entre cero) y no es una función.',
            'إذا كان $m$ موجبًا فالخط متزايد، وإذا كان سالبًا فمتناقص، وإذا كان $m=0$ فأفقي (دالة ثابتة). وكلما كبرت القيمة المطلقة لـ $m$ زاد انحدار الخط. الخط الرأسي لا ميل له ($\\Delta x=0$ ولا يجوز القسمة على صفر) وليس دالة.', 'If $m$ is positive, the line is increasing; if it is negative, decreasing; and if $m=0$, it is horizontal (constant function). The greater the absolute value of $m$, the steeper the line. A vertical line has no slope ($\\Delta x=0$ and you cannot divide by zero) and it is not a function.'
        ),
        problem: say('Kalkulatu $A(-1, 4)$ eta $B(3, -4)$ puntuetatik pasatzen den zuzenaren malda eta esan zer egiten duen.', 'Calcula la pendiente de la recta que pasa por $A(-1, 4)$ y $B(3, -4)$ y di cómo se comporta.', 'احسب ميل الخط المار بالنقطتين $A(-1, 4)$ و$B(3, -4)$ وقل كيف يتصرف.', 'Calculate the slope of the line through $A(-1, 4)$ and $B(3, -4)$ and say how it behaves.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Aldaketak kalkulatu, ordena berean.', 'Calcula los cambios, en el mismo orden.', 'احسب التغيرين بالترتيب نفسه.', 'Calculate the changes, in the same order.'), math: '$\\Delta y=-4-4=-8\\qquad \\Delta x=3-(-1)=4$' },
            { text: say('Zatitu.', 'Divide.', 'اقسم.', 'Divide.'), math: '$m=\\dfrac{-8}{4}=-2$' },
            { text: say('$m<0$: zuzena beherakorra da, eta aldapatsua ($|m|=2$).', '$m<0$: la recta es decreciente y bastante inclinada ($|m|=2$).', '$m<0$: الخط متناقص وشديد الانحدار ($|m|=2$).', '$m<0$: the line is decreasing and quite steep ($|m|=2$).') }
        ],
        example: say('$m=3$: gorakorra, aldapatsua · $m=\\tfrac{1}{2}$: gorakorra, leuna', '$m=3$: creciente y empinada · $m=\\tfrac{1}{2}$: creciente y suave', '$m=3$: متزايد وشديد الانحدار · $m=\\tfrac{1}{2}$: متزايد وخفيف', '$m=3$: increasing and steep · $m=\\tfrac{1}{2}$: increasing and gentle'),
        takeaway: say('Zeinuak norabidea esaten du; balio absolutuak, aldapa.', 'El signo dice la dirección; el valor absoluto, la inclinación.', 'تدل الإشارة على الاتجاه والقيمة المطلقة على الانحدار.', 'The sign gives the direction; the absolute value gives the steepness.'),
        figure: (language) => <SlopeSignsFigure language={language} />
    },
    {
        id: 'affine',
        stage: 'lines',
        title: say('Funtzio lineala: y = mx + n', 'La función lineal: y = mx + n', 'الدالة الخطية: y = mx + n', 'The linear function: y = mx + n'),
        goal: say('$y=mx+n$ formulan malda eta Y ardatzeko ebakidura identifikatzea eta zuzena marraztea.', 'Identificar la pendiente y el corte con el eje Y en $y=mx+n$ y dibujar la recta.', 'تحديد الميل وتقاطع محور Y في $y=mx+n$ ورسم الخط.', 'Identify the slope and the y-intercept in $y=mx+n$ and draw the line.'),
        explanation: say(
            '$y=mx+n$ funtzioan, $m$ malda da eta $n$ zuzenak Y ardatza ebakitzen duen tokiko balioa: $x=0$ denean $y=n$, hau da, $(0, n)$ puntua. Marrazteko: kokatu $(0, n)$, eta maldarekin bigarren puntu bat bilatu ($m=\\frac{\\Delta y}{\\Delta x}$: $\\Delta x$ eskuinera, $\\Delta y$ gora). $n=0$ denean, proportzionaltasun zuzeneko funtzioa da ($y=mx$). Funtzio hau "afina" ere deitzen da.',
            'En $y=mx+n$, $m$ es la pendiente y $n$ el valor donde la recta corta al eje Y: cuando $x=0$, $y=n$, es decir, el punto $(0, n)$. Para dibujarla: marca $(0, n)$ y usa la pendiente para hallar otro punto ($m=\\frac{\\Delta y}{\\Delta x}$: $\\Delta x$ a la derecha, $\\Delta y$ hacia arriba). Cuando $n=0$ es la función de proporcionalidad directa ($y=mx$). Esta función también se llama "afín".',
            'في $y=mx+n$ يمثّل $m$ الميل ويمثّل $n$ القيمة التي يقطع عندها الخط محور Y: عندما $x=0$ تكون $y=n$ أي النقطة $(0, n)$. للرسم: ضع $(0, n)$ ثم استخدم الميل لإيجاد نقطة أخرى ($m=\\frac{\\Delta y}{\\Delta x}$: $\\Delta x$ إلى اليمين و$\\Delta y$ إلى أعلى). وعندما $n=0$ تكون دالة تناسب طردي ($y=mx$). وتسمّى هذه الدالة أيضًا "تآلفية".', 'In $y=mx+n$, $m$ is the slope and $n$ is the value where the line crosses the y-axis: when $x=0$, $y=n$, that is, the point $(0, n)$. To draw it, mark $(0, n)$ and use the slope to find another point ($m=\\frac{\\Delta y}{\\Delta x}$: $\\Delta x$ to the right, $\\Delta y$ up). When $n=0$, it is the direct proportion function ($y=mx$). This function is also called "affine".'
        ),
        problem: say('Aztertu $y=2x-1$: zein da malda eta non ebakitzen du Y ardatza? Marraztu.', 'Analiza $y=2x-1$: ¿cuál es la pendiente y dónde corta al eje Y? Dibújala.', 'حلّل $y=2x-1$: ما الميل وأين يقطع محور Y؟ ارسمه.', 'Analyse $y=2x-1$: what is the slope and where does it cross the y-axis? Draw it.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Konparatu $y=mx+n$ formarekin.', 'Compárala con la forma $y=mx+n$.', 'قارنها بالصورة $y=mx+n$.', 'Compare it with the form $y=mx+n$.'), math: '$m=2\\qquad n=-1$' },
            { text: say('$x=0$ denean $y=-1$: puntu hori Y ardatzean dago.', 'Si $x=0$, $y=-1$: ese punto está en el eje Y.', 'عندما $x=0$ تكون $y=-1$: هذه النقطة على محور Y.', 'If $x=0$, $y=-1$: that point is on the y-axis.'), math: '$(0,\\,-1)$' },
            { text: say('$m=2=\\frac{2}{1}$: eskuinera 1 eta gora 2.', '$m=2=\\frac{2}{1}$: una unidad a la derecha y dos hacia arriba.', '$m=2=\\frac{2}{1}$: وحدة إلى اليمين ووحدتان إلى أعلى.', '$m=2=\\frac{2}{1}$: one unit to the right and two units up.'), math: '$(0,\\,-1)\\ \\to\\ (1,\\,1)$' }
        ],
        example: say('Alokairua: 20 € finko eta 15 € egunean: $y=15x+20$; $n=20$ hasierako prezioa da', 'Alquiler: 20 € fijos y 15 € por día: $y=15x+20$; $n=20$ es el precio inicial', 'إيجار: 20 € ثابتة و15 € لليوم: $y=15x+20$؛ $n=20$ هو السعر الابتدائي', 'Rental: €20 fixed and €15 per day: $y=15x+20$; $n=20$ is the starting price'),
        takeaway: say('$n$-k hasierako balioa finkatzen du; $m$-k aldapa.', '$n$ fija el valor inicial; $m$ fija la inclinación.', 'يحدد $n$ القيمة الابتدائية ويحدد $m$ الانحدار.', '$n$ sets the starting value; $m$ sets the steepness.'),
        figure: (language) => <AffineFigure language={language} />
    },
    {
        id: 'constant',
        stage: 'lines',
        title: say('Funtzio konstantea: y = k', 'La función constante: y = k', 'الدالة الثابتة: y = k', 'The constant function: y = k'),
        goal: say('$y=k$ zuzen horizontala ezagutzea eta bertikala ($x=k$) funtzio ez dela ulertzea.', 'Reconocer la recta horizontal $y=k$ y entender que la vertical ($x=k$) no es función.', 'التعرف على الخط الأفقي $y=k$ وفهم أن الرأسي ($x=k$) ليس دالة.', 'Recognise the horizontal line $y=k$ and understand that the vertical one ($x=k$) is not a function.'),
        explanation: say(
            '$y=k$ funtzioan emaitza beti bera da, $x$ edozein dela ere. Grafikoa $(0, k)$ puntutik pasatzen den zuzen horizontala da, eta $y=mx+n$ formarekin bat dator $m=0$ eta $n=k$ direnean. $y=0$ funtzioaren grafikoa X ardatza bera da. Zuzen bertikalak, $x=k$, ez dira funtzioak: $x$ berak $y$ balio guztiak ditu.',
            'En $y=k$ el resultado es siempre el mismo, sea cual sea $x$. Su gráfica es la recta horizontal que pasa por $(0, k)$ y coincide con $y=mx+n$ cuando $m=0$ y $n=k$. La gráfica de $y=0$ es el propio eje X. Las rectas verticales, $x=k$, no son funciones: una misma $x$ tiene todos los valores de $y$.',
            'في $y=k$ تبقى النتيجة نفسها مهما كانت $x$. رسمها خط أفقي يمر بالنقطة $(0, k)$ وينطبق على $y=mx+n$ عندما $m=0$ و$n=k$. رسم $y=0$ هو محور X نفسه. أما الخطوط الرأسية $x=k$ فليست دوال: $x$ واحدة لها كل قيم $y$.', 'In $y=k$ the output is always the same, whatever $x$ is. Its graph is the horizontal line through $(0, k)$, which matches $y=mx+n$ when $m=0$ and $n=k$. The graph of $y=0$ is the x-axis itself. Vertical lines, $x=k$, are not functions: the same $x$ has every value of $y$.'
        ),
        problem: say('$y=4$ funtzioan, kalkulatu $y$ $x=-3$ eta $x=2$ direnean. Zer da $x=2$?', 'En la función $y=4$, calcula $y$ cuando $x=-3$ y cuando $x=2$. ¿Qué es $x=2$?', 'في الدالة $y=4$ احسب $y$ عندما $x=-3$ وعندما $x=2$. وما هو $x=2$؟', 'In the function $y=4$, calculate $y$ when $x=-3$ and when $x=2$. What is $x=2$?'),
        stepsKind: 'facts',
        steps: [
            { title: say('Lehen sarrera', 'Primera entrada', 'المدخل الأول', 'First input'), text: say('$x$ aldatzen bada ere, emaitza 4 da.', 'Aunque cambie $x$, el resultado es 4.', 'مهما تغيّرت $x$ تبقى النتيجة 4.', 'Even if $x$ changes, the output is 4.'), math: '$x=-3\\ \\to\\ y=4$' },
            { title: say('Bigarren sarrera', 'Segunda entrada', 'المدخل الثاني', 'Second input'), text: say('Emaitza berdina da: malda 0 da.', 'El resultado no cambia: la pendiente es 0.', 'لا تتغير النتيجة: الميل صفر.', 'The output does not change: the slope is 0.'), math: '$x=2\\ \\to\\ y=4$' },
            { title: say('$x=2$ zuzen bertikala', 'La recta vertical $x=2$', 'الخط الرأسي $x=2$', 'The vertical line $x=2$'), text: say('$x=2$-k $y$ guztiak ditu: ez da funtzioa.', 'Para $x=2$ hay infinitas $y$: no es función.', 'من أجل $x=2$ توجد عدد لا نهائي من قيم $y$: ليست دالة.', 'For $x=2$ there are infinitely many $y$ values: it is not a function.'), math: '$(2,\\,0),\\ (2,\\,1),\\ (2,\\,5)\\ldots$' }
        ],
        example: '$y=4\\ \\to\\ (-3,\\,4),\\ (0,\\,4),\\ (2,\\,4)$',
        takeaway: say('Zuzen horizontalak funtzioak dira (malda 0); bertikalak ez.', 'Las rectas horizontales son funciones (pendiente 0); las verticales, no.', 'الخطوط الأفقية دوال (ميلها 0) والرأسية ليست دوال.', 'Horizontal lines are functions (slope 0); vertical ones are not.'),
        figure: (language) => <ConstantFigure language={language} />
    },
    {
        id: 'line-equation',
        stage: 'lines',
        title: say('Zuzen baten ekuazioa aurkitu', 'Hallar la ecuación de una recta', 'إيجاد معادلة خط مستقيم', 'Finding the equation of a straight line'),
        goal: say('Bi puntu edo grafiko batetik $y=mx+n$ ekuazioa idaztea eta buruketetan erabiltzea.', 'Escribir la ecuación $y=mx+n$ a partir de dos puntos o de una gráfica y usarla en problemas.', 'كتابة المعادلة $y=mx+n$ من نقطتين أو من رسم واستعمالها في المسائل.', 'Write the equation $y=mx+n$ from two points or from a graph and use it in problems.'),
        explanation: say(
            'Bi puntu nahikoak dira zuzen bat zehazteko. Lehenik, kalkulatu $m=\\dfrac{y_2-y_1}{x_2-x_1}$. Gero, $n$ aurkitu: puntu baten koordenatuak $y=mx+n$ formulan ordeztu eta $n$ askatu (edo irakurri, $x=0$ den puntua badago). Azkenik, idatzi $y=mx+n$. Egiaztatu bigarren puntuarekin. Buruketetan, $m$ aldaketa-tasa da eta $n$ hasierako balioa.',
            'Dos puntos bastan para determinar una recta. Primero calcula $m=\\dfrac{y_2-y_1}{x_2-x_1}$. Después halla $n$: sustituye las coordenadas de un punto en $y=mx+n$ y despeja $n$ (o léela directamente si hay un punto con $x=0$). Por último escribe $y=mx+n$. Comprueba con el segundo punto. En los problemas, $m$ es el ritmo de cambio y $n$ el valor inicial.',
            'تكفي نقطتان لتحديد خط. أولًا احسب $m=\\dfrac{y_2-y_1}{x_2-x_1}$. ثم أوجد $n$: عوّض إحداثيي نقطة في $y=mx+n$ واعزل $n$ (أو اقرأها مباشرة إذا وُجدت نقطة فيها $x=0$). وأخيرًا اكتب $y=mx+n$. تحقق بالنقطة الثانية. وفي المسائل يمثّل $m$ معدل التغير و$n$ القيمة الابتدائية.', 'Two points are enough to determine a straight line. First calculate $m=\\dfrac{y_2-y_1}{x_2-x_1}$. Then find $n$: substitute the coordinates of one point into $y=mx+n$ and solve for $n$ (or read it directly if there is a point with $x=0$). Finally, write $y=mx+n$. Check with the second point. In problems, $m$ is the rate of change and $n$ the starting value.'
        ),
        problem: say('Idatzi $A(0, 1)$ eta $B(3, 7)$ puntuetatik pasatzen den zuzenaren ekuazioa.', 'Escribe la ecuación de la recta que pasa por $A(0, 1)$ y $B(3, 7)$.', 'اكتب معادلة الخط المار بالنقطتين $A(0, 1)$ و$B(3, 7)$.', 'Write the equation of the straight line through $A(0, 1)$ and $B(3, 7)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$n$: $A$ puntuan $x=0$ da, beraz $n$ Y ardatzeko balioa da.', '$n$: en $A$ se cumple $x=0$, así que $n$ es el valor en el eje Y.', '$n$: في $A$ تكون $x=0$ فـ $n$ هي القيمة على محور Y.', '$n$: at $A$, $x=0$, so $n$ is the value on the y-axis.'), math: '$n=1$' },
            { text: say('$m$: kalkulatu malda $A$ eta $B$ puntuekin.', '$m$: calcula la pendiente con $A$ y $B$.', '$m$: احسب الميل بالنقطتين $A$ و$B$.', '$m$: calculate the slope using $A$ and $B$.'), math: '$m=\\dfrac{7-1}{3-0}=2$' },
            { text: say('Idatzi ekuazioa eta egiaztatu $B$-rekin.', 'Escribe la ecuación y comprueba con $B$.', 'اكتب المعادلة وتحقق بالنقطة $B$.', 'Write the equation and check with $B$.'), math: '$y=2x+1\\qquad 2\\cdot 3+1=7\\ \\checkmark$' }
        ],
        example: say('Aparkalekua: 1,50 € sartzeko eta 0,80 € orduko: $y=0{,}8x+1{,}5$', 'Parking: 1,50 € de entrada y 0,80 € por hora: $y=0{,}8x+1{,}5$', 'موقف سيارات: 1.50 € دخول و0.80 € للساعة: $y=0.8x+1.5$', 'Parking: €1.50 entry fee and €0.80 per hour: $y=0{,}8x+1{,}5$'),
        takeaway: say('Lehenik $m$, gero $n$, eta azkenik egiaztatu bigarren puntuarekin.', 'Primero $m$, luego $n$ y al final comprueba con el otro punto.', 'أولًا $m$ ثم $n$ وأخيرًا تحقق بالنقطة الأخرى.', 'First $m$, then $n$, and at the end check with the other point.'),
        figure: (language) => <LineEquationFigure language={language} />
    }
]
