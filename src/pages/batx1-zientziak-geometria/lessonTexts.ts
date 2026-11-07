import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { BachGeometryTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Geometria analitikoa · Batxilergoa 1 · Zientziak — what each lesson
   tells: the new words (definitions), a short explanation, the example as
   an exercise («Another example»), the key words in four languages and, in
   four lessons, «Why does it work?». Plain data so the tests can import
   it; lessons.tsx merges it into the topics. The example uses numbers of
   its own, never those of «Let's solve», of «Check it» or of the typical
   mistake. Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const bachGeometryLessonTexts: Record<BachGeometryTopicId, LessonTexts> = {
    /* ---------- 1. Points ---------- */
    'midpoint-symmetric': {
        definitions: [
            { term: say('Erdiko puntua', 'Punto medio', 'المنتصف', 'Midpoint'), meaning: say('Zuzenkiaren puntua, bi muturretatik distantzia berera dagoena.', 'El punto del segmento que está a la misma distancia de los dos extremos.', 'نقطة القطعة التي تبعد المسافة نفسها عن الطرفين.', 'The point of the segment at the same distance from both end points.') },
            { term: say('Puntu simetrikoa', 'Punto simétrico', 'النقطة النظيرة', 'Symmetric point'), meaning: say('$A\'$ puntua $A$ puntuaren simetrikoa da $P$ puntuarekiko, $P$ puntua $AA\'$ zuzenkiaren erdiko puntua bada.', '$A\'$ es el simétrico de $A$ respecto de $P$ si $P$ es el punto medio de $AA\'$.', '$A\'$ نظير $A$ بالنسبة إلى $P$ إذا كانت $P$ منتصف $AA\'$.', '$A\'$ is the symmetric point of $A$ about $P$ if $P$ is the midpoint of $AA\'$.') }
        ],
        vocabulary: [
            say('muturra', 'extremo', 'الطرف', 'end point'),
            say('batez bestekoa', 'media', 'المتوسط', 'mean')
        ],
        explanation: say(
            'Erdiko puntuaren koordenatuak muturrenen batez bestekoa dira: batu eta 2 zenbakiaz zatitu. Alderantziz, erdiko puntua $P$ eta mutur bat $A$ ezagunak badira, beste muturra $A$ puntuaren simetrikoa da $P$ puntuarekiko: $A\'=2P-A$, koordenatuz koordenatu.',
            'Las coordenadas del punto medio son la media de las de los extremos: se suman y se dividen entre 2. Al revés, si se conocen el punto medio $P$ y un extremo $A$, el otro extremo es el simétrico de $A$ respecto de $P$: $A\'=2P-A$, coordenada a coordenada.',
            'إحداثيا المنتصف متوسط إحداثيي الطرفين: نجمع ونقسم على 2. وبالعكس، إذا عرفنا المنتصف $P$ وطرفًا $A$ فالطرف الآخر نظير $A$ بالنسبة إلى $P$: $A\'=2P-A$، مركّبةً مركّبة.',
            'The coordinates of the midpoint are the mean of those of the end points: add them and divide by 2. The other way round, if you know the midpoint $P$ and one end point $A$, the other end point is the symmetric point of $A$ about $P$: $A\'=2P-A$, coordinate by coordinate.'
        ),
        examplePrompt: say('Aurkitu $Q(4,-1)$ puntuaren simetrikoa $C(-2,3)$ puntuarekiko.', 'Halla el simétrico de $Q(4,-1)$ respecto de $C(-2,3)$.', 'أوجد نظير $Q(4,-1)$ بالنسبة إلى $C(-2,3)$.', 'Find the symmetric point of $Q(4,-1)$ about $C(-2,3)$.'),
        example: same('$Q\'=2C-Q=(-4-4,6+1)=(-8,7)$'),
        exampleAnswer: say('$Q\'(-8,7)$: $C$ puntua $QQ\'$ zuzenkiaren erdiko puntua da.', '$Q\'(-8,7)$: $C$ es el punto medio de $QQ\'$.', '$Q\'(-8,7)$: ‏$C$ منتصف $QQ\'$.', '$Q\'(-8,7)$: $C$ is the midpoint of $QQ\'$.')
    },
    collinear: {
        definitions: [
            { term: say('Lerrokatutako puntuak', 'Puntos alineados', 'نقاط على استقامة واحدة', 'Collinear points'), meaning: say('Zuzen berean dauden puntuak.', 'Puntos que están en una misma recta.', 'نقاط تقع على مستقيم واحد.', 'Points that lie on the same line.') }
        ],
        vocabulary: [
            say('proportzionala', 'proporcional', 'متناسبة', 'proportional'),
            say('norabidea', 'dirección', 'الاتجاه', 'direction')
        ],
        explanation: say(
            'Hiru puntu zuzen berean daude haiek lotzen dituzten bektoreek norabide bera dutenean. Nahikoa da $\\overrightarrow{AB}$ eta $\\overrightarrow{AC}$ konparatzea: koordenatuak proportzionalak badira, paraleloak dira, eta $A$, $B$ eta $C$ lerrokatuta daude. Parametro bat eskatzen bada, proportzioak ekuazio bat ematen du.',
            'Tres puntos están en la misma recta cuando los vectores que los unen tienen la misma dirección. Basta comparar $\\overrightarrow{AB}$ y $\\overrightarrow{AC}$: si sus coordenadas son proporcionales, son paralelos y $A$, $B$ y $C$ están alineados. Si se pide un parámetro, la proporción da una ecuación.',
            'تقع ثلاث نقاط على مستقيم واحد عندما يكون للمتجهات التي تصلها الاتجاه نفسه. يكفي مقارنة $\\overrightarrow{AB}$ و$\\overrightarrow{AC}$: إذا كانت مركّباتهما متناسبة فهما متوازيان و$A$ و$B$ و$C$ على استقامة واحدة. وإذا طُلب وسيط فالتناسب يعطي معادلة.',
            'Three points lie on the same line when the vectors joining them have the same direction. Just compare $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$: if their coordinates are proportional, they are parallel and $A$, $B$ and $C$ are collinear. If a parameter is asked for, the proportion gives an equation.'
        ),
        examplePrompt: say('$k$ zenbakiaren zer baliorekin daude lerrokatuta $P(0,-3)$, $Q(2,1)$ eta $R(5,k)$?', '¿Para qué valor de $k$ están alineados $P(0,-3)$, $Q(2,1)$ y $R(5,k)$?', 'لأي قيمة لـ $k$ تكون $P(0,-3)$ و$Q(2,1)$ و$R(5,k)$ على استقامة واحدة؟', 'For which value of $k$ are $P(0,-3)$, $Q(2,1)$ and $R(5,k)$ collinear?'),
        example: same('$\\frac{5}{2}=\\frac{k+3}{4}\\ \\to\\ k=7$'),
        exampleAnswer: say('$k=7$: $\\overrightarrow{PQ}=(2,4)$ eta $\\overrightarrow{PR}=(5,10)$ proportzionalak dira.', '$k=7$: $\\overrightarrow{PQ}=(2,4)$ y $\\overrightarrow{PR}=(5,10)$ son proporcionales.', '$k=7$: ‏$\\overrightarrow{PQ}=(2,4)$ و$\\overrightarrow{PR}=(5,10)$ متناسبان.', '$k=7$: $\\overrightarrow{PQ}=(2,4)$ and $\\overrightarrow{PR}=(5,10)$ are proportional.')
    },
    'divide-segment': {
        definitions: [
            { term: say('Zatiketa-puntua', 'Punto de división', 'نقطة التقسيم', 'Division point'), meaning: say('Zuzenkiaren $P=A+t\\,\\overrightarrow{AB}$ puntu bat, $t$ zenbakia 0 eta 1 artean dagoela.', 'Un punto $P=A+t\\,\\overrightarrow{AB}$ del segmento, con $t$ entre 0 y 1.', 'نقطة $P=A+t\\,\\overrightarrow{AB}$ من القطعة حيث $t$ بين 0 و1.', 'A point $P=A+t\\,\\overrightarrow{AB}$ of the segment, with $t$ between 0 and 1.') }
        ],
        vocabulary: [
            say('herena', 'tercio', 'الثلث', 'third'),
            say('zuzenkia', 'segmento', 'القطعة', 'segment')
        ],
        explanation: say(
            '$A$ puntutik $B$ puntura joateko, $\\overrightarrow{AB}$ bektorea egiten da. Haren $t$ zati bat bakarrik egiten bada, $P=A+t\\,\\overrightarrow{AB}$ puntura iristen da. Zuzenkia $n$ zati berditan banatzeko, $t=\\frac{1}{n}$, $\\frac{2}{n}$… hartzen dira: puntuak elkarrengandik distantzia berera geratzen dira. Hiru zatitan, bi heren.',
            'Para ir de $A$ a $B$ se recorre el vector $\\overrightarrow{AB}$. Si solo se recorre una parte $t$ de él, se llega al punto $P=A+t\\,\\overrightarrow{AB}$. Para dividir el segmento en $n$ partes iguales se toman $t=\\frac{1}{n}$, $\\frac{2}{n}$…: los puntos quedan a la misma distancia unos de otros. En tres partes, cada tercio.',
            'للانتقال من $A$ إلى $B$ نقطع المتجه $\\overrightarrow{AB}$. وإذا قطعنا جزءًا $t$ منه فقط وصلنا إلى النقطة $P=A+t\\,\\overrightarrow{AB}$. ولتقسيم القطعة إلى $n$ أجزاء متساوية نأخذ $t=\\frac{1}{n}$ و$\\frac{2}{n}$…: فتكون النقاط على أبعاد متساوية. وفي ثلاثة أجزاء نأخذ كل ثلث.',
            'To go from $A$ to $B$ you travel along the vector $\\overrightarrow{AB}$. If you only travel a part $t$ of it, you reach the point $P=A+t\\,\\overrightarrow{AB}$. To divide the segment into $n$ equal parts, take $t=\\frac{1}{n}$, $\\frac{2}{n}$…: the points are the same distance apart. In three parts, each third.'
        ),
        examplePrompt: say('Aurkitu $AB$ zuzenkiko puntua, $A(2,-4)$ eta $B(10,8)$ izanik, $A$ puntutik bidearen laurdenean dagoena.', 'Halla el punto de $AB$, con $A(2,-4)$ y $B(10,8)$, que está a un cuarto del camino desde $A$.', 'أوجد نقطة القطعة $AB$ حيث $A(2,-4)$ و$B(10,8)$ الواقعة على ربع الطريق من $A$.', 'Find the point of $AB$, with $A(2,-4)$ and $B(10,8)$, that is a quarter of the way from $A$.'),
        example: same('$P=(2,-4)+\\frac{1}{4}(8,12)=(4,-1)$'),
        exampleAnswer: same('$P(4,-1)$'),
        why: {
            text: say(
                'Zergatik betetzen da? $A$, $P$ eta $B$ lerrokatuta daude, eta $\\overrightarrow{AP}=t\\,\\overrightarrow{AB}$: $\\overrightarrow{AB}$ bektorearen norabidea du, eta haren $t$ aldiz luzea da. Horregatik, $P=A+t\\,\\overrightarrow{AB}$, eta $t=\\frac{1}{2}$ denean erdiko puntuaren formula ateratzen da.',
                '¿Por qué funciona? $A$, $P$ y $B$ están alineados y $\\overrightarrow{AP}=t\\,\\overrightarrow{AB}$: tiene la dirección de $\\overrightarrow{AB}$ y es $t$ veces su longitud. Por eso $P=A+t\\,\\overrightarrow{AB}$, y con $t=\\frac{1}{2}$ sale la fórmula del punto medio.',
                'لماذا يصح؟ $A$ و$P$ و$B$ على استقامة واحدة و$\\overrightarrow{AP}=t\\,\\overrightarrow{AB}$: له اتجاه $\\overrightarrow{AB}$ وطوله $t$ مرة طوله. لذلك $P=A+t\\,\\overrightarrow{AB}$، ومع $t=\\frac{1}{2}$ نحصل على صيغة المنتصف.',
                'Why does it work? $A$, $P$ and $B$ are collinear and $\\overrightarrow{AP}=t\\,\\overrightarrow{AB}$: it has the direction of $\\overrightarrow{AB}$ and is $t$ times its length. That is why $P=A+t\\,\\overrightarrow{AB}$, and with $t=\\frac{1}{2}$ you get the midpoint formula.'
            ),
            math: same('$A+\\frac{1}{2}(B-A)=\\frac{A+B}{2}$')
        }
    },

    /* ---------- 2. The equations of a line ---------- */
    'vector-parametric': {
        definitions: [
            { term: say('Norabide-bektorea', 'Vector director', 'متجه التوجيه', 'Direction vector'), meaning: say('Zuzenaren norabidea duen bektore bat.', 'Un vector con la dirección de la recta.', 'متجه له اتجاه المستقيم.', 'A vector with the direction of the line.') },
            { term: say('Parametroa', 'Parámetro', 'الوسيط', 'Parameter'), meaning: say('$t$ zenbakia: aldatzean, puntuak zuzena zeharkatzen du.', 'El número $t$: al cambiarlo, el punto recorre la recta.', 'العدد $t$: عند تغييره تتحرك النقطة على المستقيم.', 'The number $t$: as it changes, the point runs along the line.') }
        ],
        vocabulary: [
            say('puntua', 'punto', 'النقطة', 'point'),
            say('parametrikoak', 'paramétricas', 'الوسيطيتان', 'parametric')
        ],
        explanation: say(
            'Zuzen bat puntu batek, $P$, eta norabide batek, $\\vec{d}$, finkatzen dute. Haren puntuak $P$ puntutik $\\vec{d}$ bektorearen multiploak batuz iristen direnak dira: $(x,y)=P+t\\,\\vec{d}$ ekuazio bektoriala da, eta koordenatuak bereizita ekuazio parametrikoak ateratzen dira. Puntu bat zuzenekoa da bi ekuazioek $t$ bera ematen badute.',
            'Una recta queda fijada por un punto $P$ y una dirección $\\vec{d}$. Sus puntos son los que se alcanzan desde $P$ sumando múltiplos de $\\vec{d}$: $(x,y)=P+t\\,\\vec{d}$ es la ecuación vectorial, y separando coordenadas salen las paramétricas. Un punto es de la recta si las dos ecuaciones dan el mismo $t$.',
            'يتحدد المستقيم بنقطة $P$ واتجاه $\\vec{d}$. ونقاطه هي التي نصل إليها من $P$ بإضافة مضاعفات $\\vec{d}$: ‏$(x,y)=P+t\\,\\vec{d}$ هي المعادلة المتجهية، وبفصل المركّبتين نحصل على المعادلتين الوسيطيتين. وتكون النقطة على المستقيم إذا أعطت المعادلتان $t$ نفسه.',
            'A line is fixed by a point $P$ and a direction $\\vec{d}$. Its points are those reached from $P$ by adding multiples of $\\vec{d}$: $(x,y)=P+t\\,\\vec{d}$ is the vector equation, and splitting the coordinates gives the parametric equations. A point is on the line if both equations give the same $t$.'
        ),
        examplePrompt: say('Idatzi $(-4,1)$ puntutik $(2,-5)$ norabidean doan zuzenaren ekuazio parametrikoak, eta aurkitu $t=3$ balioari dagokion puntua.', 'Escribe las paramétricas de la recta que pasa por $(-4,1)$ con dirección $(2,-5)$, y halla su punto con $t=3$.', 'اكتب المعادلتين الوسيطيتين للمستقيم المار بـ $(-4,1)$ في اتجاه $(2,-5)$، وأوجد نقطته عند $t=3$.', 'Write the parametric equations of the line through $(-4,1)$ with direction $(2,-5)$, and find its point with $t=3$.'),
        example: same('$\\begin{cases}x=-4+2t\\\\ y=1-5t\\end{cases}\\ \\to\\ (2,-14)$'),
        exampleAnswer: same('$(2,-14)$')
    },
    'general-normal': {
        definitions: [
            { term: say('Bektore normala', 'Vector normal', 'المتجه الناظمي', 'Normal vector'), meaning: say('Zuzenarekiko perpendikularra den bektorea; $Ax+By+C=0$ zuzenean, $\\vec{n}=(A,B)$.', 'Un vector perpendicular a la recta; en $Ax+By+C=0$, $\\vec{n}=(A,B)$.', 'متجه عمودي على المستقيم؛ وفي $Ax+By+C=0$ يكون $\\vec{n}=(A,B)$.', 'A vector perpendicular to the line; in $Ax+By+C=0$, $\\vec{n}=(A,B)$.') },
            { term: say('Ekuazio orokorra', 'Ecuación general', 'المعادلة العامة', 'General equation'), meaning: say('$Ax+By+C=0$ forma, ekuazio inplizitua ere deitua.', 'La forma $Ax+By+C=0$, también llamada implícita.', 'الصيغة $Ax+By+C=0$ وتسمى أيضًا الضمنية.', 'The form $Ax+By+C=0$, also called implicit.') }
        ],
        vocabulary: [
            say('perpendikularra', 'perpendicular', 'عمودي', 'perpendicular'),
            say('koefizientea', 'coeficiente', 'المعامل', 'coefficient')
        ],
        explanation: say(
            'Ekuazio parametrikoetan $t$ askatu eta berdintzen bada, ekuazio jarraitua ateratzen da. Gurutzean biderkatu eta dena alde batera eramanda, orokorra geratzen da: $Ax+By+C=0$. Haren koefizienteek, $(A,B)$, zuzenarekiko perpendikularra den bektorea osatzen dute, normala; norabide-bektore bat lortzeko, nahikoa da biratzea: $(-B,A)$.',
            'De las paramétricas se despeja $t$ en las dos y se igualan: sale la ecuación continua. Multiplicando en cruz y pasando todo a un lado, queda la general, $Ax+By+C=0$. Sus coeficientes $(A,B)$ forman un vector perpendicular a la recta, el normal; para dar un director basta girarlo: $(-B,A)$.',
            'من المعادلتين الوسيطيتين نعزل $t$ في كل منهما ونساوي: فنحصل على المعادلة المتصلة. وبالضرب التبادلي ونقل كل شيء إلى طرف نحصل على العامة $Ax+By+C=0$. ومعاملاها $(A,B)$ يكوّنان متجهًا عموديًا على المستقيم هو الناظمي؛ ولإعطاء متجه توجيه يكفي تدويره: $(-B,A)$.',
            'From the parametric equations, solve for $t$ in both and set them equal: that gives the continuous equation. Cross-multiplying and moving everything to one side leaves the general one, $Ax+By+C=0$. Its coefficients $(A,B)$ form a vector perpendicular to the line, the normal; to give a direction vector, just turn it: $(-B,A)$.'
        ),
        examplePrompt: say('Eman $5x+2y-10=0$ zuzenaren bektore normal bat, norabide-bektore bat eta puntu bat.', 'Da un vector normal, un vector director y un punto de la recta $5x+2y-10=0$.', 'أعطِ متجهًا ناظميًا ومتجه توجيه ونقطة من المستقيم $5x+2y-10=0$.', 'Give a normal vector, a direction vector and a point of the line $5x+2y-10=0$.'),
        example: same('$\\vec{n}=(5,2)\\qquad\\vec{d}=(-2,5)\\qquad(2,0)$'),
        exampleAnswer: say('$(2,0)$ puntua zuzenekoa da: $5\\cdot 2+2\\cdot 0-10=0$.', 'El punto $(2,0)$ es de la recta: $5\\cdot 2+2\\cdot 0-10=0$.', 'النقطة $(2,0)$ على المستقيم: $5\\cdot 2+2\\cdot 0-10=0$.', 'The point $(2,0)$ is on the line: $5\\cdot 2+2\\cdot 0-10=0$.'),
        why: {
            text: say(
                'Zergatik da $(A,B)$ perpendikularra? $P$ eta $Q$ zuzenekoak badira, $Ap_1+Bp_2+C=0$ eta $Aq_1+Bq_2+C=0$. Kenduz gero, $A(q_1-p_1)+B(q_2-p_2)=0$: $(A,B)$ bektoreak eta $\\overrightarrow{PQ}$ bektoreak 0 ematen dute biderkadura eskalarrean.',
                '¿Por qué $(A,B)$ es perpendicular? Si $P$ y $Q$ son de la recta, $Ap_1+Bp_2+C=0$ y $Aq_1+Bq_2+C=0$. Restando, $A(q_1-p_1)+B(q_2-p_2)=0$: el producto escalar de $(A,B)$ por $\\overrightarrow{PQ}$ es 0.',
                'لماذا $(A,B)$ عمودي؟ إذا كانت $P$ و$Q$ على المستقيم فإن $Ap_1+Bp_2+C=0$ و$Aq_1+Bq_2+C=0$. وبالطرح $A(q_1-p_1)+B(q_2-p_2)=0$: الجداء السلمي لـ $(A,B)$ و$\\overrightarrow{PQ}$ يساوي 0.',
                'Why is $(A,B)$ perpendicular? If $P$ and $Q$ are on the line, $Ap_1+Bp_2+C=0$ and $Aq_1+Bq_2+C=0$. Subtracting, $A(q_1-p_1)+B(q_2-p_2)=0$: the dot product of $(A,B)$ and $\\overrightarrow{PQ}$ is 0.'
            ),
            math: same('$(A,B)\\cdot\\overrightarrow{PQ}=0$')
        }
    },
    'explicit-slope': {
        definitions: [
            { term: say('Inklinazio-angelua', 'Ángulo de inclinación', 'زاوية الميل', 'Angle of inclination'), meaning: say('Zuzenak $X$ ardatzaren alde positiboarekin osatzen duen angelua; haren tangentea malda da.', 'El ángulo que forma la recta con la parte positiva del eje $X$; su tangente es la pendiente.', 'الزاوية بين المستقيم والجزء الموجب من المحور $X$؛ وظلها هو الميل.', 'The angle the line makes with the positive part of the $X$ axis; its tangent is the slope.') }
        ],
        vocabulary: [
            say('malda', 'pendiente', 'الميل', 'slope'),
            say('tangentea', 'tangente', 'الظل', 'tangent')
        ],
        explanation: say(
            'Ekuazio orokorrean $y$ askatuta, esplizitua ateratzen da, $y=mx+n$: $m=-\\frac{A}{B}$ malda da, eta $n$, zuzenak $Y$ ardatza mozten duen puntua. Malda aurrera egindako unitate bakoitzeko igotzen dena da, hau da, inklinazio-angeluaren tangentea. Puntu batekin eta maldarekin: $y-y_0=m(x-x_0)$.',
            'Despejando $y$ en la ecuación general sale la explícita, $y=mx+n$: $m=-\\frac{A}{B}$ es la pendiente y $n$ es donde la recta corta al eje $Y$. La pendiente es lo que sube la recta por cada unidad que avanza, es decir, la tangente de su ángulo de inclinación. Con un punto y la pendiente: $y-y_0=m(x-x_0)$.',
            'بعزل $y$ في المعادلة العامة نحصل على الصريحة $y=mx+n$: ‏$m=-\\frac{A}{B}$ هو الميل و$n$ حيث يقطع المستقيم المحور $Y$. والميل هو ما يصعده المستقيم لكل وحدة يتقدمها، أي ظل زاوية ميله. وبنقطة والميل: $y-y_0=m(x-x_0)$.',
            'Solving the general equation for $y$ gives the explicit one, $y=mx+n$: $m=-\\frac{A}{B}$ is the slope and $n$ is where the line cuts the $Y$ axis. The slope is how much the line goes up for each unit it moves along, that is, the tangent of its angle of inclination. With a point and the slope: $y-y_0=m(x-x_0)$.'
        ),
        examplePrompt: say('Idatzi $(2,-3)$ puntutik pasatzen den eta $135^\\circ$ osatzen duen zuzena $X$ ardatzarekin.', 'Escribe la recta que pasa por $(2,-3)$ y forma $135^\\circ$ con el eje $X$.', 'اكتب المستقيم المار بـ $(2,-3)$ والذي يصنع $135^\\circ$ مع المحور $X$.', 'Write the line that passes through $(2,-3)$ and makes $135^\\circ$ with the $X$ axis.'),
        example: same('$y+3=-1\\cdot(x-2)\\ \\to\\ y=-x-1$'),
        exampleAnswer: say('$\\tan 135^\\circ=-1$ da; beraz, $y=-x-1$.', '$\\tan 135^\\circ=-1$, así que $y=-x-1$.', '$\\tan 135^\\circ=-1$، إذن $y=-x-1$.', '$\\tan 135^\\circ=-1$, so $y=-x-1$.')
    },
    pencil: {
        definitions: [
            { term: say('Zuzen-sorta', 'Haz de rectas', 'حزمة المستقيمات', 'Pencil of lines'), meaning: say('Puntu beretik, sortaren zentrotik, pasatzen diren zuzen guztiak.', 'Todas las rectas que pasan por un mismo punto, el centro del haz.', 'كل المستقيمات المارة بنقطة واحدة هي مركز الحزمة.', 'All the lines through one point, the centre of the pencil.') }
        ],
        vocabulary: [
            say('zentroa', 'centro', 'المركز', 'centre'),
            say('malda', 'pendiente', 'الميل', 'slope')
        ],
        explanation: say(
            'Puntu batetik zuzen infinitu pasatzen dira: sorta bat osatzen dute, eta puntua haren zentroa da. Sortako zuzen bakoitza bere maldagatik bereizten da; beraz, sorta malda parametro gisa hartuta idazten da, $y-y_0=m(x-x_0)$, eta bertikala bakarrik falta da. Sortako zuzen bat aukeratzeko, baldintza bat ezartzen da: beste puntu batetik pasatzea, beste baten paraleloa izatea…',
            'Por un punto pasan infinitas rectas: forman un haz, y el punto es su centro. Cada recta del haz se distingue por su pendiente, así que el haz se escribe con la pendiente como parámetro, $y-y_0=m(x-x_0)$, y solo falta la vertical. Para elegir una recta del haz se impone una condición: pasar por otro punto, ser paralela a otra…',
            'تمر بنقطة مستقيمات لا نهائية: تكوّن حزمة والنقطة مركزها. ويتميز كل مستقيم في الحزمة بميله، لذلك تُكتب الحزمة بالميل وسيطًا $y-y_0=m(x-x_0)$، ولا ينقص إلا الرأسي. ولاختيار مستقيم من الحزمة نفرض شرطًا: المرور بنقطة أخرى، أو موازاة مستقيم آخر…',
            'Infinitely many lines pass through a point: they form a pencil, and the point is its centre. Each line of the pencil is told apart by its slope, so the pencil is written with the slope as a parameter, $y-y_0=m(x-x_0)$, and only the vertical one is missing. To pick a line of the pencil, set a condition: passing through another point, being parallel to another line…'
        ),
        examplePrompt: say('Aurkitu $(-3,2)$ zentroko sortaren zuzena, $y=4x+1$ zuzenaren paraleloa dena.', 'Halla la recta del haz de centro $(-3,2)$ que es paralela a $y=4x+1$.', 'أوجد مستقيم الحزمة التي مركزها $(-3,2)$ الموازي لـ $y=4x+1$.', 'Find the line of the pencil with centre $(-3,2)$ that is parallel to $y=4x+1$.'),
        example: same('$y-2=4(x+3)\\ \\to\\ y=4x+14$'),
        exampleAnswer: say('Paraleloak malda bera du, $m=4$: $y=4x+14$.', 'La paralela tiene la misma pendiente, $m=4$: $y=4x+14$.', 'للموازي الميل نفسه $m=4$: ‏$y=4x+14$.', 'The parallel has the same slope, $m=4$: $y=4x+14$.')
    },

    /* ---------- 3. Positions and angles ---------- */
    'parallel-perpendicular': {
        definitions: [
            { term: say('Zuzen perpendikularrak', 'Rectas perpendiculares', 'المستقيمات المتعامدة', 'Perpendicular lines'), meaning: say('$90^\\circ$ osatzen duten zuzenak: haien bektore normalak perpendikularrak dira.', 'Las que forman $90^\\circ$: sus vectores normales son perpendiculares.', 'التي تصنع $90^\\circ$: متجهاتها الناظمية متعامدة.', 'Lines that make $90^\\circ$: their normal vectors are perpendicular.') }
        ],
        vocabulary: [
            say('paraleloa', 'paralela', 'موازٍ', 'parallel'),
            say('normala', 'normal', 'الناظمي', 'normal')
        ],
        explanation: say(
            'Bi zuzen paralelok bektore normal bera dute; beraz, $A$ eta $B$ berberekin idatz daitezke, eta $C$ bakarrik aldatzen da. Perpendikular batek lehenengoaren norabide-bektore bat du normal gisa, $(B,-A)$. Bi kasuetan, azken zenbakia zuzenak igaro behar duen puntua ordezkatuz aurkitzen da.',
            'Dos rectas paralelas tienen el mismo vector normal, así que se pueden escribir con los mismos $A$ y $B$; solo cambia $C$. Una perpendicular tiene por normal un director de la primera, $(B,-A)$. En los dos casos, el último número se halla sustituyendo el punto por el que tiene que pasar.',
            'للمستقيمين المتوازيين المتجه الناظمي نفسه، لذلك يمكن كتابتهما بـ $A$ و$B$ نفسيهما ولا يتغير إلا $C$. والعمودي ناظميه متجه توجيه للأول $(B,-A)$. وفي الحالتين نجد العدد الأخير بتعويض النقطة التي يجب أن يمر بها.',
            'Two parallel lines have the same normal vector, so they can be written with the same $A$ and $B$; only $C$ changes. A perpendicular has as its normal a direction vector of the first, $(B,-A)$. In both cases, the last number is found by substituting the point it has to pass through.'
        ),
        examplePrompt: say('Aurkitu jatorritik pasatzen den eta $3x+y-7=0$ zuzenaren perpendikularra den zuzena.', 'Halla la perpendicular a $3x+y-7=0$ que pasa por el origen.', 'أوجد العمودي على $3x+y-7=0$ المار بالأصل.', 'Find the perpendicular to $3x+y-7=0$ through the origin.'),
        example: same('$x-3y+C=0\\ \\to\\ C=0\\ \\to\\ x-3y=0$'),
        exampleAnswer: say('$x-3y=0$: $(3,1)\\cdot(1,-3)=0$.', '$x-3y=0$: $(3,1)\\cdot(1,-3)=0$.', '$x-3y=0$: ‏$(3,1)\\cdot(1,-3)=0$.', '$x-3y=0$: $(3,1)\\cdot(1,-3)=0$.')
    },
    'relative-position': {
        definitions: [
            { term: say('Zuzen ebakitzaileak', 'Rectas secantes', 'المستقيمات المتقاطعة', 'Intersecting lines'), meaning: say('Puntu bakar batean ebakitzen diren zuzenak.', 'Rectas que se cortan en un solo punto.', 'مستقيمات تتقاطع في نقطة واحدة.', 'Lines that meet at a single point.') },
            { term: say('Zuzen bat datozenak', 'Rectas coincidentes', 'المستقيمات المنطبقة', 'Coincident lines'), meaning: say('Zuzen beraren bi ekuazio: haien koefizienteak proportzionalak dira.', 'Dos ecuaciones de la misma recta: sus coeficientes son proporcionales.', 'معادلتان للمستقيم نفسه: معاملاتهما متناسبة.', 'Two equations of the same line: their coefficients are proportional.') }
        ],
        vocabulary: [
            say('sistema', 'sistema', 'النظام', 'system'),
            say('arrazoia', 'razón', 'النسبة', 'ratio')
        ],
        explanation: say(
            'Planoan bi zuzen puntu batean ebakitzen dira, paraleloak dira edo bat datoz. Koefizienteak konparatuz ikusten da: normalak proportzionalak ez badira, ebakitzen dira, eta ebaki-puntua sistemaren soluzioa da. Proportzionalak badira, paraleloak edo bat datozenak dira, gai askearen arrazoia ere berdina den ala ez.',
            'Dos rectas del plano se cortan en un punto, son paralelas o son la misma. Se ve comparando coeficientes: si los normales no son proporcionales, se cortan, y el punto de corte es la solución del sistema. Si lo son, son paralelas o coincidentes según sea también igual o no la razón del término independiente.',
            'مستقيمان في المستوى إما يتقاطعان في نقطة أو يتوازيان أو ينطبقان. ونعرف ذلك بمقارنة المعاملات: إذا لم يكن الناظميان متناسبين تقاطعا ونقطة التقاطع حل النظام. وإذا كانا متناسبين فهما متوازيان أو منطبقان بحسب تساوي نسبة الحد الثابت أو عدمه.',
            'Two lines in the plane meet at a point, are parallel or are the same line. You see it by comparing coefficients: if the normals are not proportional, they meet, and the crossing point is the solution of the system. If they are, they are parallel or coincident depending on whether the ratio of the constant terms is also equal.'
        ),
        examplePrompt: say('Nolakoak dira $x-3y+2=0$ eta $-2x+6y-4=0$?', '¿Cómo son $x-3y+2=0$ y $-2x+6y-4=0$?', 'كيف هما $x-3y+2=0$ و$-2x+6y-4=0$؟', 'How are $x-3y+2=0$ and $-2x+6y-4=0$?'),
        example: same('$\\frac{1}{-2}=\\frac{-3}{6}=\\frac{2}{-4}$'),
        exampleAnswer: say('Bat datoz: hiru arrazoiak berdinak dira.', 'Coincidentes: las tres razones son iguales.', 'منطبقان: النسب الثلاث متساوية.', 'Coincident: the three ratios are equal.')
    },
    'line-angle': {
        definitions: [
            { term: say('Bi zuzenen angelua', 'Ángulo de dos rectas', 'زاوية مستقيمين', 'Angle of two lines'), meaning: say('Ebakitzean osatzen dituzten angeluetatik txikiena; $0^\\circ$ eta $90^\\circ$ artekoa.', 'El menor de los ángulos que forman al cortarse; va de $0^\\circ$ a $90^\\circ$.', 'أصغر الزوايا التي يصنعانها عند التقاطع؛ بين $0^\\circ$ و$90^\\circ$.', 'The smaller of the angles they make when they cross; it goes from $0^\\circ$ to $90^\\circ$.') }
        ],
        vocabulary: [
            say('zorrotza', 'agudo', 'حادة', 'acute'),
            say('balio absolutua', 'valor absoluto', 'القيمة المطلقة', 'absolute value')
        ],
        explanation: say(
            'Ebakitzen diren bi zuzenek lau angelu osatzen dituzte, binaka berdinak: bat zorrotza eta bestea kamutsa. Zuzenen angelua zorrotza da; beraz, haien norabide-bektoreen (edo normalen) angelua erabiltzen da, biderkadura eskalarra balio absolutuan hartuta: kosinua negatiboa aterako balitz, angelu osagarria hartuko litzateke.',
            'Dos rectas que se cortan forman cuatro ángulos, iguales dos a dos: uno agudo y otro obtuso. El ángulo de las rectas es el agudo, así que se usa el de sus vectores directores (o normales) con el producto escalar en valor absoluto: si el coseno saliera negativo, se tomaría el suplementario.',
            'يصنع المستقيمان المتقاطعان أربع زوايا متساوية مثنى مثنى: واحدة حادة وأخرى منفرجة. وزاوية المستقيمين هي الحادة، لذلك نستعمل زاوية متجهي توجيههما (أو ناظميهما) بالجداء السلمي بالقيمة المطلقة: فلو خرج جيب التمام سالبًا لأخذنا المكمّلة.',
            'Two crossing lines make four angles, equal in pairs: one acute and one obtuse. The angle of the lines is the acute one, so you use the angle of their direction (or normal) vectors with the dot product in absolute value: if the cosine came out negative, you would take the supplementary angle.'
        ),
        examplePrompt: say('Aurkitu $\\sqrt{3}\\,x-y=0$ zuzenak $X$ ardatzarekin, $y=0$, osatzen duen angelua.', 'Halla el ángulo que forma $\\sqrt{3}\\,x-y=0$ con el eje $X$, $y=0$.', 'أوجد الزاوية بين $\\sqrt{3}\\,x-y=0$ والمحور $X$، أي $y=0$.', 'Find the angle that $\\sqrt{3}\\,x-y=0$ makes with the $X$ axis, $y=0$.'),
        example: same('$\\cos\\alpha=\\frac{|-1|}{2\\cdot 1}=\\frac{1}{2}\\ \\to\\ \\alpha=60^\\circ$'),
        exampleAnswer: say('$60^\\circ$: normalak $(\\sqrt{3},-1)$ eta $(0,1)$ dira.', '$60^\\circ$: los normales son $(\\sqrt{3},-1)$ y $(0,1)$.', '$60^\\circ$: الناظميان $(\\sqrt{3},-1)$ و$(0,1)$.', '$60^\\circ$: the normals are $(\\sqrt{3},-1)$ and $(0,1)$.')
    },

    /* ---------- 4. Distances ---------- */
    'point-line': {
        definitions: [
            { term: say('Puntu-zuzen distantzia', 'Distancia punto-recta', 'المسافة من نقطة إلى مستقيم', 'Point-line distance'), meaning: say('$P$ puntutik $r$ zuzeneko puntuetarainoko distantziarik txikiena: perpendikularrean neurtzen dena.', 'La menor distancia de $P$ a los puntos de $r$: la que se mide por la perpendicular.', 'أصغر مسافة من $P$ إلى نقاط $r$: التي تُقاس على العمود.', 'The shortest distance from $P$ to the points of $r$: the one measured along the perpendicular.') }
        ],
        vocabulary: [
            say('perpendikularra', 'perpendicular', 'العمود', 'perpendicular'),
            say('balio absolutua', 'valor absoluto', 'القيمة المطلقة', 'absolute value')
        ],
        explanation: say(
            'Zuzeneko puntu guztietatik, $P$ puntutik hurbilena perpendikularraren oina da: distantzia hor neurtzen da. Ez da oina aurkitu behar: nahikoa da $P$ ekuazio orokorrean ordezkatzea, zeinua balio absolutuarekin kentzea eta bektore normalaren moduluaz zatitzea.',
            'De todos los puntos de la recta, el más cercano a $P$ es el pie de la perpendicular: la distancia se mide por ahí. No hace falta hallar ese pie: basta sustituir $P$ en la ecuación general, quitar el signo con el valor absoluto y dividir entre el módulo del vector normal.',
            'من بين كل نقاط المستقيم أقربها إلى $P$ موقع العمود: وهناك تُقاس المسافة. ولا حاجة لإيجاد ذلك الموقع: يكفي تعويض $P$ في المعادلة العامة وحذف الإشارة بالقيمة المطلقة والقسمة على طول المتجه الناظمي.',
            'Of all the points of the line, the closest to $P$ is the foot of the perpendicular: the distance is measured there. You do not need to find that foot: just substitute $P$ into the general equation, remove the sign with the absolute value and divide by the length of the normal vector.'
        ),
        examplePrompt: say('Aurkitu jatorritik $5x-12y+39=0$ zuzenerako distantzia.', 'Halla la distancia del origen a $5x-12y+39=0$.', 'أوجد المسافة من الأصل إلى $5x-12y+39=0$.', 'Find the distance from the origin to $5x-12y+39=0$.'),
        example: same('$d=\\frac{|39|}{\\sqrt{25+144}}=\\frac{39}{13}=3$'),
        exampleAnswer: same('$d=3$'),
        why: {
            text: say(
                'Zergatik betetzen da? $Q$ puntua $r$ zuzenekoa bada, distantzia $\\overrightarrow{QP}$ bektoreak normalaren gainean duen proiekzioaren luzera da. Biderkadura eskalarra garatzean $Ax_0+By_0+C$ agertzen da, $Aq_1+Bq_2=-C$ delako.',
                '¿Por qué funciona? Si $Q$ es un punto de $r$, la distancia es la longitud de la proyección de $\\overrightarrow{QP}$ sobre el normal. Al desarrollar el producto escalar aparece $Ax_0+By_0+C$, porque $Aq_1+Bq_2=-C$.',
                'لماذا يصح؟ إذا كانت $Q$ نقطة من $r$ فالمسافة طول إسقاط $\\overrightarrow{QP}$ على الناظمي. وعند نشر الجداء السلمي يظهر $Ax_0+By_0+C$ لأن $Aq_1+Bq_2=-C$.',
                'Why does it work? If $Q$ is a point of $r$, the distance is the length of the projection of $\\overrightarrow{QP}$ onto the normal. Expanding the dot product, $Ax_0+By_0+C$ appears, because $Aq_1+Bq_2=-C$.'
            ),
            math: same('$\\frac{|\\vec{n}\\cdot\\overrightarrow{QP}|}{|\\vec{n}|}=\\frac{|Ax_0+By_0+C|}{\\sqrt{A^2+B^2}}$')
        }
    },
    'parallel-lines': {
        definitions: [
            { term: say('Zuzen paraleloen arteko distantzia', 'Distancia entre rectas paralelas', 'المسافة بين مستقيمين متوازيين', 'Distance between parallel lines'), meaning: say('Zuzen bateko edozein puntutik besterako distantzia: beti berdina da.', 'La de cualquier punto de una recta a la otra: es siempre la misma.', 'المسافة من أي نقطة على أحدهما إلى الآخر: هي نفسها دائمًا.', 'The distance from any point of one line to the other: it is always the same.') }
        ],
        vocabulary: [
            say('paraleloa', 'paralela', 'متوازيان', 'parallel'),
            say('gai askea', 'término independiente', 'الحد الثابت', 'constant term')
        ],
        explanation: say(
            'Bi zuzen paralelo beti distantzia berera daude: nahikoa da batetik puntu bat hartzea eta besterako distantzia neurtzea. Biek $A$ eta $B$ berberak badituzte, bide laburra dago: $|C-C\'|$ zati normalaren modulua; $C$ eta $C\'$ gai askeak dira. Koefizienteak bat ez badatoz, lehenik berdindu egiten dira.',
            'Dos rectas paralelas están siempre a la misma distancia: basta tomar un punto de una y medir su distancia a la otra. Si las dos tienen los mismos $A$ y $B$, hay un atajo: $|C-C\'|$ entre el módulo del normal, con $C$ y $C\'$ los términos independientes. Si los coeficientes no coinciden, primero se igualan.',
            'المستقيمان المتوازيان على المسافة نفسها دائمًا: يكفي أخذ نقطة من أحدهما وقياس بعدها عن الآخر. وإذا كان لهما $A$ و$B$ نفسيهما فهناك طريق مختصر: $|C-C\'|$ مقسومًا على طول الناظمي، حيث $C$ و$C\'$ الحدّان الثابتان. وإذا لم تتطابق المعاملات نساويها أولًا.',
            'Two parallel lines are always the same distance apart: it is enough to take a point of one and measure its distance to the other. If both have the same $A$ and $B$, there is a shortcut: $|C-C\'|$ divided by the length of the normal, with $C$ and $C\'$ the constant terms. If the coefficients do not match, make them equal first.'
        ),
        examplePrompt: say('Aurkitu $x+y-1=0$ eta $x+y+5=0$ zuzenen arteko distantzia.', 'Halla la distancia entre $x+y-1=0$ y $x+y+5=0$.', 'أوجد المسافة بين $x+y-1=0$ و$x+y+5=0$.', 'Find the distance between $x+y-1=0$ and $x+y+5=0$.'),
        example: same('$d=\\frac{|-1-5|}{\\sqrt{2}}=\\frac{6}{\\sqrt{2}}=3\\sqrt{2}$'),
        exampleAnswer: same('$d=3\\sqrt{2}$')
    },
    reflection: {
        definitions: [
            { term: say('Perpendikularraren oina', 'Pie de la perpendicular', 'موقع العمود', 'Foot of the perpendicular'), meaning: say('$P$ puntutik pasatzen den perpendikularrak zuzena mozten duen puntua.', 'El punto donde la perpendicular que pasa por $P$ corta a la recta.', 'النقطة التي يقطع فيها العمودُ المارُّ بـ $P$ المستقيمَ.', 'The point where the perpendicular through $P$ cuts the line.') },
            { term: say('Zuzen batekiko simetrikoa', 'Simétrico respecto de una recta', 'النظير بالنسبة إلى مستقيم', 'Reflection in a line'), meaning: say('Beste aldeko $P\'$ puntua, distantzia berera, $PP\'$ zuzenarekiko perpendikularra izanik.', 'El punto $P\'$ al otro lado, a la misma distancia, con $PP\'$ perpendicular a la recta.', 'النقطة $P\'$ في الجهة الأخرى على المسافة نفسها و$PP\'$ عمودي على المستقيم.', 'The point $P\'$ on the other side, at the same distance, with $PP\'$ perpendicular to the line.') }
        ],
        vocabulary: [
            say('ispilua', 'espejo', 'المرآة', 'mirror'),
            say('erdiko puntua', 'punto medio', 'المنتصف', 'midpoint')
        ],
        explanation: say(
            'Zuzenak ispiluarena egiten du: $P\'$ simetrikoa beste aldean dago, distantzia berera eta $P$ puntutik pasatzen den perpendikularrean. Hiru urratsetan aurkitzen da: perpendikularra $P$ puntutik, haren ebakidura zuzenarekin, $M$ (oina), eta, $M$ puntua $PP\'$ zuzenkiaren erdiko puntua denez, $P\'=2M-P$.',
            'La recta hace de espejo: el simétrico $P\'$ está al otro lado, a la misma distancia y en la perpendicular que pasa por $P$. Se halla en tres pasos: la perpendicular por $P$, su corte $M$ con la recta (el pie) y, como $M$ es el punto medio de $PP\'$, $P\'=2M-P$.',
            'المستقيم مرآة: النظير $P\'$ في الجهة الأخرى على المسافة نفسها وعلى العمود المار بـ $P$. ونجده بثلاث خطوات: العمود من $P$، ثم تقاطعه $M$ مع المستقيم (الموقع)، وبما أن $M$ منتصف $PP\'$ فإن $P\'=2M-P$.',
            'The line acts as a mirror: the reflection $P\'$ is on the other side, at the same distance and on the perpendicular through $P$. It is found in three steps: the perpendicular through $P$, where it cuts the line at $M$ (the foot) and, as $M$ is the midpoint of $PP\'$, $P\'=2M-P$.'
        ),
        examplePrompt: say('Aurkitu $A(1,3)$ puntuaren simetrikoa $y=x$ zuzenarekiko.', 'Halla el simétrico de $A(1,3)$ respecto de la recta $y=x$.', 'أوجد نظير $A(1,3)$ بالنسبة إلى المستقيم $y=x$.', 'Find the reflection of $A(1,3)$ in the line $y=x$.'),
        example: same('$M(2,2)\\ \\to\\ A\'=2M-A=(3,1)$'),
        exampleAnswer: say('$A\'(3,1)$: $y=x$ zuzenarekiko simetrikoan koordenatuak trukatzen dira.', '$A\'(3,1)$: respecto de $y=x$, las coordenadas se intercambian.', '$A\'(3,1)$: بالنسبة إلى $y=x$ يتبادل الإحداثيان.', '$A\'(3,1)$: in $y=x$, the coordinates swap.')
    },

    /* ---------- 5. Triangles ---------- */
    'triangle-points': {
        definitions: [
            { term: say('Mediana', 'Mediana', 'المتوسط', 'Median'), meaning: say('Erpin bat aurkako aldearen erdiko puntuarekin lotzen duen zuzenkia.', 'El segmento que une un vértice con el punto medio del lado opuesto.', 'القطعة التي تصل رأسًا بمنتصف الضلع المقابل.', 'The segment joining a vertex to the midpoint of the opposite side.') },
            { term: say('Altuera', 'Altura', 'الارتفاع', 'Altitude'), meaning: say('Erpin batetik aurkako aldearen zuzenera doan perpendikularra.', 'La perpendicular desde un vértice a la recta del lado opuesto.', 'العمود من رأس على مستقيم الضلع المقابل.', 'The perpendicular from a vertex to the line of the opposite side.') }
        ],
        vocabulary: [
            say('barizentroa', 'baricentro', 'مركز الثقل', 'centroid'),
            say('ortozentroa', 'ortocentro', 'ملتقى الارتفاعات', 'orthocentre'),
            say('zirkunzentroa', 'circuncentro', 'مركز الدائرة المحيطة', 'circumcentre')
        ],
        explanation: say(
            'Hiru medianak barizentroan ebakitzen dira, eta hori erpinen batez bestekoa da. Hiru altuerak ortozentroan ebakitzen dira, eta hiru erdibitzaileak zirkunzentroan, erpinetatik pasatzen den zirkunferentziaren zentroan. Bi horiek aurkitzeko, nahikoa da haien bi zuzen ebakitzea: hirugarrena ere hortik pasatzen da.',
            'Las tres medianas se cortan en el baricentro, que es la media de los vértices. Las tres alturas se cortan en el ortocentro, y las tres mediatrices en el circuncentro, el centro de la circunferencia que pasa por los vértices. Para hallar estos dos basta cortar dos de sus rectas: la tercera pasa también por ahí.',
            'تتقاطع المتوسطات الثلاثة في مركز الثقل وهو متوسط الرؤوس. وتتقاطع الارتفاعات الثلاثة في ملتقى الارتفاعات، والمحاور الثلاثة في مركز الدائرة المحيطة التي تمر بالرؤوس. ولإيجاد هاتين النقطتين يكفي تقاطع مستقيمين: فالثالث يمر بها أيضًا.',
            'The three medians meet at the centroid, which is the mean of the vertices. The three altitudes meet at the orthocentre, and the three perpendicular bisectors at the circumcentre, the centre of the circle through the vertices. To find these two, it is enough to cut two of their lines: the third one passes there too.'
        ),
        examplePrompt: say('Aurkitu $P(3,-4)$, $Q(-5,2)$ eta $R(8,11)$ triangeluaren barizentroa.', 'Halla el baricentro del triángulo $P(3,-4)$, $Q(-5,2)$, $R(8,11)$.', 'أوجد مركز ثقل المثلث $P(3,-4)$ و$Q(-5,2)$ و$R(8,11)$.', 'Find the centroid of the triangle $P(3,-4)$, $Q(-5,2)$, $R(8,11)$.'),
        example: same('$G=\\left(\\frac{3-5+8}{3},\\frac{-4+2+11}{3}\\right)=(2,3)$'),
        exampleAnswer: same('$G(2,3)$')
    },
    'triangle-area': {
        vocabulary: [
            say('oinarria', 'base', 'القاعدة', 'base'),
            say('altuera', 'altura', 'الارتفاع', 'height'),
            say('azalera', 'área', 'المساحة', 'area')
        ],
        explanation: say(
            'Koordenatuekin, triangelu baten oinarria eta altuera dakizunetik ateratzen dira: oinarria bi erpinen arteko distantzia da, eta altuera, hirugarren erpinetik beste bietatik pasatzen den zuzenerako distantzia. Horregatik, azalera $\\frac{1}{2}\\,|\\overrightarrow{AB}|\\,d(C,AB)$ da.',
            'Con coordenadas, la base y la altura de un triángulo salen de lo que ya sabes: la base es la distancia entre dos vértices, y la altura es la distancia del tercer vértice a la recta que pasa por los otros dos. Por eso el área es $\\frac{1}{2}\\,|\\overrightarrow{AB}|\\,d(C,AB)$.',
            'بالإحداثيات تخرج قاعدة المثلث وارتفاعه مما تعرفه: القاعدة المسافة بين رأسين، والارتفاع المسافة من الرأس الثالث إلى المستقيم المار بالرأسين الآخرين. لذلك المساحة $\\frac{1}{2}\\,|\\overrightarrow{AB}|\\,d(C,AB)$.',
            'With coordinates, the base and the height of a triangle come from what you already know: the base is the distance between two vertices, and the height is the distance from the third vertex to the line through the other two. That is why the area is $\\frac{1}{2}\\,|\\overrightarrow{AB}|\\,d(C,AB)$.'
        ),
        examplePrompt: say('Aurkitu $O(0,0)$, $P(8,0)$ eta $Q(3,5)$ triangeluaren azalera.', 'Halla el área del triángulo $O(0,0)$, $P(8,0)$, $Q(3,5)$.', 'أوجد مساحة المثلث $O(0,0)$ و$P(8,0)$ و$Q(3,5)$.', 'Find the area of the triangle $O(0,0)$, $P(8,0)$, $Q(3,5)$.'),
        example: same('$\\frac{1}{2}\\cdot 8\\cdot 5=20$'),
        exampleAnswer: say('Oinarria $OP=8$ da, $X$ ardatzean, eta altuera $Q$ puntuaren ordenatua, 5.', 'La base $OP=8$ está en el eje $X$ y la altura es la ordenada de $Q$, 5.', 'القاعدة $OP=8$ على المحور $X$ والارتفاع إحداثي $Q$ الصادي 5.', 'The base $OP=8$ lies on the $X$ axis and the height is the second coordinate of $Q$, 5.')
    }
}
