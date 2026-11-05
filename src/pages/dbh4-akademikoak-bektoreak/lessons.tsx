import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import {
    BisectorFigure,
    CircleFigure,
    CollinearFigure,
    DistanceFigure,
    FormsFigure,
    GeneralFigure,
    MidpointFigure,
    OperationsFigure,
    ParallelFigure,
    ParallelLinesFigure,
    ParallelogramFigure,
    ParametricFigure,
    PositionsFigure,
    SlopeFigure,
    VectorFigure
} from './figures'
import { same, say } from './text'
import { vectorsLessonChecks, type VectorsTopicId } from './lessonChecks'
import { vectorsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Bektoreak eta zuzenak · 4. DBH akademikoak — stages and lessons,
   following Anaya 4.º Académicas unit 8 (geometría analítica: vectors and
   their coordinates, operations, the midpoint and the symmetric point,
   aligned points, the equations of a line, the slope, parallel and
   perpendicular lines, relative positions, distances and the
   circumference) and Santillana 4.º Académicas unit 8 (vectors and lines
   in the plane, the bisector of a segment, problems with polygons).
   ========================================================================== */

export type VectorsStageId = 'vectors' | 'points' | 'equations' | 'positions' | 'applications'

export const vectorsStages: UnitStage[] = [
    { id: 'vectors', tone: 'blue', title: { eu: 'Bektoreak', es: 'Vectores', en: 'Vectors', ar: 'المتجهات' } },
    { id: 'points', tone: 'violet', title: { eu: 'Puntuak eta distantziak', es: 'Puntos y distancias', en: 'Points and distances', ar: 'النقاط والمسافات' } },
    { id: 'equations', tone: 'mustard', title: { eu: 'Zuzenaren ekuazioak', es: 'Ecuaciones de la recta', en: 'Equations of a straight line', ar: 'معادلات المستقيم' } },
    { id: 'positions', tone: 'coral', title: { eu: 'Malda eta posizio erlatiboak', es: 'Pendiente y posiciones relativas', en: 'Slope and relative positions', ar: 'الميل والأوضاع النسبية' } },
    { id: 'applications', tone: 'green', title: { eu: 'Aplikazioak', es: 'Aplicaciones', en: 'Applications', ar: 'تطبيقات' } }
]

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Vectors ---------- */
    {
        id: 'vector-coordinates',
        stage: 'vectors',
        title: say('Bektore baten koordenatuak eta modulua', 'Coordenadas y módulo de un vector', 'مركّبتا المتجه وطوله', 'Coordinates and magnitude of a vector'),
        goal: say('Bi puntuk zehazten duten bektorearen koordenatuak eta modulua kalkulatzea.', 'Calcular las coordenadas y el módulo del vector que determinan dos puntos.', 'حساب مركّبتي المتجه الذي تحدده نقطتان وطوله.', 'Calculate the coordinates and magnitude of the vector determined by two points.'),
        needs: [
            { unit: 'dbh3/movimientos-plano', topic: 'vector-components', title: { eu: 'Bektoreak eta haien osagaiak', es: 'Vectores y sus componentes', en: 'Vectors and their components', ar: 'المتجهات ومركّباتها' } },
            { unit: 'dbh3/movimientos-plano', topic: 'vector-modulus', title: { eu: 'Bektore baten modulua', es: 'El módulo de un vector', en: 'The length of a vector', ar: 'طول المتجه' } }
        ],
        problem: say('$A(-1,4)$ eta $B(5,-4)$ emanda, kalkulatu $\\overrightarrow{AB}$-ren koordenatuak eta modulua, eta $C(2,0)$ puntuan hasten den bektore berdin baten muturra.', 'Dados $A(-1,4)$ y $B(5,-4)$, halla las coordenadas y el módulo de $\\overrightarrow{AB}$, y el extremo de un vector igual que empieza en $C(2,0)$.', 'إذا كانت $A(-1,4)$ و$B(5,-4)$، فاحسب مركّبتي $\\overrightarrow{AB}$ وطوله، وطرف متجه مساوٍ له يبدأ من $C(2,0)$.', 'Given $A(-1,4)$ and $B(5,-4)$, find the coordinates and the magnitude of $\\overrightarrow{AB}$, and the end point of an equal vector that starts at $C(2,0)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Muturra ken jatorria.', 'Extremo menos origen.', 'الطرف ناقص الأصل.', 'End point minus start point.'), math: same('$\\overrightarrow{AB}=(5-(-1),-4-4)=(6,-8)$') },
            { text: say('Modulua, Pitagorasekin.', 'El módulo, con Pitágoras.', 'الطول بفيثاغورس.', 'The magnitude, using Pythagoras\' theorem.'), math: same('$|\\overrightarrow{AB}|=\\sqrt{6^{2}+(-8)^{2}}=\\sqrt{100}=10$') },
            { text: say('Batu bektorea C puntuari.', 'Suma el vector al punto C.', 'أضف المتجه إلى النقطة C.', 'Add the vector to point C.'), math: same('$D=(2+6,0-8)=(8,-8)$') }
        ],
        takeaway: say('Koordenatuak: muturra ken jatorria. Modulua: Pitagoras. Modulu, norabide eta noranzko bera: bektore bera.', 'Coordenadas: extremo menos origen. Módulo: Pitágoras. Mismo módulo, dirección y sentido: el mismo vector.', 'المركّبتان: الطرف ناقص الأصل. الطول: فيثاغورس. الطول والاتجاه والمنحى نفسها: المتجه نفسه.', 'Coordinates: end point minus start point. Magnitude: Pythagoras\' theorem. Same magnitude, direction and sense: the same vector.'),
        figure: (language) => <VectorFigure language={language} />
    },
    {
        id: 'vector-operations',
        stage: 'vectors',
        title: say('Bektoreekin eragiketak', 'Operaciones con vectores', 'العمليات على المتجهات', 'Operations with vectors'),
        goal: say('Bektoreak batzea, kentzea eta zenbaki batez biderkatzea, koordenatuekin eta grafikoki.', 'Sumar y restar vectores y multiplicarlos por un número, con coordenadas y gráficamente.', 'جمع المتجهات وطرحها وضربها في عدد، بالمركّبات وبيانيًا.', 'Add and subtract vectors and multiply them by a number, using coordinates and graphically.'),
        needs: [
            { unit: 'dbh3/movimientos-plano', topic: 'vector-sum', title: { eu: 'Bektoreen batura', es: 'Suma de vectores', en: 'Adding vectors', ar: 'جمع المتجهات' } }
        ],
        problem: say('$\\vec{u}=(3,-1)$ eta $\\vec{v}=(-2,4)$ badira, kalkulatu $2\\vec{u}-\\vec{v}$ eta haren modulua.', 'Si $\\vec{u}=(3,-1)$ y $\\vec{v}=(-2,4)$, calcula $2\\vec{u}-\\vec{v}$ y su módulo.', 'إذا كان $\\vec{u}=(3,-1)$ و$\\vec{v}=(-2,4)$، فاحسب $2\\vec{u}-\\vec{v}$ وطوله.', 'If $\\vec{u}=(3,-1)$ and $\\vec{v}=(-2,4)$, calculate $2\\vec{u}-\\vec{v}$ and its magnitude.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehenik, bider 2.', 'Primero, por 2.', 'أولًا الضرب في 2.', 'First, multiply by 2.'), math: same('$2\\vec{u}=(6,-2)$') },
            { text: say('Gero, kendu koordenatuz koordenatu.', 'Después, resta coordenada a coordenada.', 'ثم اطرح مركّبةً مركّبة.', 'Then, subtract coordinate by coordinate.'), math: same('$(6-(-2),-2-4)=(8,-6)$') },
            { text: say('Modulua.', 'El módulo.', 'الطول.', 'The magnitude.'), math: same('$\\sqrt{8^{2}+(-6)^{2}}=\\sqrt{100}=10$') }
        ],
        takeaway: say('Batu eta kendu: koordenatuz koordenatu. Zenbaki batez: bi koordenatuak. k negatiboa: noranzkoa aldatzen da.', 'Sumar y restar: coordenada a coordenada. Por un número: las dos coordenadas. k negativo: cambia el sentido.', 'الجمع والطرح: مركّبةً مركّبة. الضرب في عدد: المركّبتان معًا. k سالب: يتغيّر المنحى.', 'Add and subtract: coordinate by coordinate. By a number: both coordinates. k negative: the sense reverses.'),
        figure: (language) => <OperationsFigure language={language} />
    },
    {
        id: 'parallel-vectors',
        stage: 'vectors',
        title: say('Bektore paraleloak eta perpendikularrak', 'Vectores paralelos y perpendiculares', 'المتجهات المتوازية والمتعامدة', 'Parallel and perpendicular vectors'),
        goal: say('Bi bektore paraleloak diren aztertzea eta bektore baten perpendikular bat idaztea.', 'Reconocer si dos vectores son paralelos y escribir un vector perpendicular a otro.', 'تمييز توازي متجهين وكتابة متجه عمودي على متجه آخر.', 'Recognise whether two vectors are parallel and write a vector perpendicular to another.'),
        problem: say('Kalkulatu k, $(2,k)$ bektorea $(6,9)$-ren paraleloa izan dadin, eta idatzi $(6,9)$-ren bektore perpendikular bat.', 'Halla k para que $(2,k)$ sea paralelo a $(6,9)$, y escribe un vector perpendicular a $(6,9)$.', 'أوجد k ليكون $(2,k)$ موازيًا لـ $(6,9)$، واكتب متجهًا عموديًا على $(6,9)$.', 'Find k so that $(2,k)$ is parallel to $(6,9)$, and write a vector perpendicular to $(6,9)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkadura gurutzatuak berdinak.', 'Productos cruzados iguales.', 'الضربان التبادليان متساويان.', 'The cross products are equal.'), math: same('$2\\cdot 9=6\\cdot k$') },
            { text: say('Askatu k.', 'Despeja k.', 'استخرج k.', 'Solve for k.'), math: same('$k=\\frac{18}{6}=3$') },
            { text: say('Perpendikularra: trukatu eta aldatu zeinu bat.', 'Perpendicular: intercambia y cambia un signo.', 'العمودي: بدّل وغيّر إشارة.', 'Perpendicular: swap and change one sign.'), math: same('$(-9,6)$') }
        ],
        takeaway: say('Paraleloak: koordenatu proportzionalak (a · d = b · c). (a, b)-ren perpendikularra: (−b, a).', 'Paralelos: coordenadas proporcionales (a · d = b · c). Perpendicular a (a, b): (−b, a).', 'متوازيان: مركّبات متناسبة (a · d = b · c). العمودي على (a, b): (−b, a).', 'Parallel: proportional coordinates (a · d = b · c). Perpendicular to (a, b): (−b, a).'),
        figure: (language) => <ParallelFigure language={language} />
    },

    /* ---------- 2. Points and distances ---------- */
    {
        id: 'distance',
        stage: 'points',
        figureAfterSteps: true,
        title: say('Bi punturen arteko distantzia', 'Distancia entre dos puntos', 'المسافة بين نقطتين', 'Distance between two points'),
        goal: say('Bi punturen arteko distantzia kalkulatzea eta triangeluak sailkatzeko erabiltzea.', 'Calcular la distancia entre dos puntos y usarla para clasificar triángulos.', 'حساب المسافة بين نقطتين واستعمالها لتصنيف المثلثات.', 'Calculate the distance between two points and use it to classify triangles.'),
        needs: [
            { unit: 'dbh3/geometria-plana', topic: 'pythagoras', title: { eu: 'Pitagorasen teorema', es: 'El teorema de Pitágoras', en: 'Pythagoras\' theorem', ar: 'مبرهنة فيثاغورس' } }
        ],
        problem: say('Egiaztatu $A(1,1)$, $B(4,5)$ eta $C(8,2)$ erpineko triangelua isoszelea eta angeluzuzena dela.', 'Comprueba que el triángulo de vértices $A(1,1)$, $B(4,5)$ y $C(8,2)$ es isósceles y rectángulo.', 'تحقق من أن المثلث الذي رؤوسه $A(1,1)$ و$B(4,5)$ و$C(8,2)$ متساوي الساقين وقائم.', 'Check that the triangle with vertices $A(1,1)$, $B(4,5)$ and $C(8,2)$ is isosceles and right-angled.'),
        stepsKind: 'steps',
        steps: [
            { text: say('AB aldea.', 'El lado AB.', 'الضلع AB.', 'The side AB.'), math: same('$d(A,B)=\\sqrt{3^{2}+4^{2}}=5$') },
            { text: say('BC aldea: berdina, isoszelea.', 'El lado BC: igual, isósceles.', 'الضلع BC: مساوٍ، متساوي الساقين.', 'Side BC: equal in length, so isosceles.'), math: same('$d(B,C)=\\sqrt{4^{2}+(-3)^{2}}=5$') },
            { text: say('AC aldea.', 'El lado AC.', 'الضلع AC.', 'The side AC.'), math: same('$d(A,C)=\\sqrt{7^{2}+1^{2}}=\\sqrt{50}$') },
            { text: say('Pitagoras betetzen da: angeluzuzena B-n.', 'Se cumple Pitágoras: rectángulo en B.', 'تتحقق فيثاغورس: قائم في B.', 'Pythagoras\' theorem holds: right-angled at B.'), math: same('$5^{2}+5^{2}=50$') }
        ],
        takeaway: say('Distantzia = modulua = √(Δx² + Δy²). Ordenak ez du axola.', 'Distancia = módulo = √(Δx² + Δy²). El orden no importa.', 'المسافة = الطول = √(Δx² + Δy²). الترتيب لا يهم.', 'Distance = magnitude = √(Δx² + Δy²). The order does not matter.'),
        figure: (language) => <DistanceFigure language={language} />
    },
    {
        id: 'midpoint',
        stage: 'points',
        title: say('Erdiko puntua eta puntu simetrikoa', 'Punto medio y punto simétrico', 'منتصف القطعة والنقطة المتناظرة', 'Midpoint and symmetric point'),
        goal: say('Zuzenki baten erdiko puntua eta puntu baten simetrikoa beste batekiko kalkulatzea.', 'Calcular el punto medio de un segmento y el simétrico de un punto respecto de otro.', 'حساب منتصف قطعة ونظيرة نقطة بالنسبة إلى نقطة أخرى.', 'Calculate the midpoint of a segment and the point symmetric to a point with respect to another.'),
        needs: [
            { unit: 'dbh3/movimientos-plano', topic: 'central-symmetry', title: { eu: 'Simetria zentrala eta errosetoiak', es: 'Simetría central y rosetones', en: 'Central symmetry and rosettes', ar: 'التناظر المركزي والزخارف الدائرية' } }
        ],
        problem: say('Kalkulatu $A(-1,3)$ puntuaren simetrikoa $P(2,1)$ puntuarekiko.', 'Halla el simétrico de $A(-1,3)$ respecto de $P(2,1)$.', 'أوجد نظيرة $A(-1,3)$ بالنسبة إلى $P(2,1)$.', 'Find the point symmetric to $A(-1,3)$ with respect to $P(2,1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('P da A eta A′ puntuen erdikoa.', 'P es el punto medio de A y A′.', 'P منتصف A وA′.', 'P is the midpoint of A and A′.'), math: same('$A\'=2P-A$') },
            { text: say('Abzisa.', 'La abscisa.', 'الإحداثي السيني.', 'The x-coordinate.'), math: same('$2\\cdot 2-(-1)=5$') },
            { text: say('Ordenatua: A′(5, −1).', 'La ordenada: A′(5, −1).', 'الإحداثي الصادي: A′(5, −1).', 'The y-coordinate: A′(5, −1).'), math: same('$2\\cdot 1-3=-1$') }
        ],
        takeaway: say('Erdiko puntua: koordenatuen batez bestekoa. Simetrikoa: 2P − A.', 'Punto medio: la media de las coordenadas. Simétrico: 2P − A.', 'المنتصف: متوسط الإحداثيات. النظيرة: 2P − A.', 'Midpoint: the mean of the coordinates. Symmetric point: 2P − A.'),
        figure: (language) => <MidpointFigure language={language} />
    },
    {
        id: 'collinear',
        stage: 'points',
        title: say('Lerrokatutako puntuak', 'Puntos alineados', 'النقاط المستقيمة', 'Collinear points'),
        goal: say('Hiru puntu lerrokatuta dauden aztertzea eta koordenatu ezezagun bat aurkitzea.', 'Decidir si tres puntos están alineados y hallar una coordenada desconocida.', 'تحديد ما إذا كانت ثلاث نقاط على استقامة واحدة وإيجاد إحداثي مجهول.', 'Decide whether three points are collinear and find an unknown coordinate.'),
        problem: say('Kalkulatu k, $A(1,2)$, $B(3,6)$ eta $C(6,k)$ lerrokatuta egon daitezen.', 'Halla k para que $A(1,2)$, $B(3,6)$ y $C(6,k)$ estén alineados.', 'أوجد k لتكون $A(1,2)$ و$B(3,6)$ و$C(6,k)$ على استقامة واحدة.', 'Find k so that $A(1,2)$, $B(3,6)$ and $C(6,k)$ are collinear.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bi bektoreak A-tik.', 'Los dos vectores desde A.', 'المتجهان من A.', 'The two vectors from A.'), math: same('$\\overrightarrow{AB}=(2,4)\\qquad \\overrightarrow{AC}=(5,k-2)$') },
            { text: say('Koordenatu proportzionalak.', 'Coordenadas proporcionales.', 'مركّبات متناسبة.', 'Proportional coordinates.'), math: same('$\\frac{5}{2}=\\frac{k-2}{4}$') },
            { text: say('Askatu: k = 12.', 'Despeja: k = 12.', 'استخرج: k = 12.', 'Solve for k: k = 12.'), math: same('$k-2=\\frac{5\\cdot 4}{2}=10$') }
        ],
        takeaway: say('Lerrokatuta: AB eta AC bektoreak proportzionalak. Ezezagun bat: proportzioa ekuazio bihurtzen da.', 'Alineados: los vectores AB y AC son proporcionales. Una incógnita: la proporción se vuelve ecuación.', 'على استقامة واحدة: المتجهان AB وAC متناسبان. مجهول واحد: يصير التناسب معادلة.', 'Collinear: the vectors AB and AC are proportional. One unknown: the proportion becomes an equation.'),
        figure: (language) => <CollinearFigure language={language} />
    },

    /* ---------- 3. Equations of a line ---------- */
    {
        id: 'parametric',
        stage: 'equations',
        figureAfterSteps: true,
        title: say('Ekuazio bektoriala eta parametrikoak', 'Ecuación vectorial y paramétricas', 'المعادلة المتجهية والمعادلتان الوسيطيتان', 'Vector equation and parametric equations'),
        goal: say('Puntu batetik eta norabide-bektore batetik zuzen baten ekuazio bektoriala eta parametrikoak idaztea.', 'Escribir la ecuación vectorial y las paramétricas de una recta a partir de un punto y un vector director.', 'كتابة المعادلة المتجهية والمعادلتين الوسيطيتين لمستقيم انطلاقًا من نقطة ومتجه توجيه.', 'Write the vector equation and the parametric equations of a straight line from a point and a direction vector.'),
        problem: say('Idatzi $A(1,2)$ eta $B(4,-4)$ puntuetatik pasatzen den zuzenaren ekuazio parametrikoak, eta egiaztatu $C(-2,8)$ zuzenekoa den.', 'Escribe las paramétricas de la recta que pasa por $A(1,2)$ y $B(4,-4)$ y comprueba si $C(-2,8)$ es de la recta.', 'اكتب المعادلتين الوسيطيتين للمستقيم المار بـ $A(1,2)$ و$B(4,-4)$، وتحقق مما إذا كانت $C(-2,8)$ عليه.', 'Write the parametric equations of the straight line through $A(1,2)$ and $B(4,-4)$, and check whether $C(-2,8)$ is on the straight line.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Norabide-bektorea.', 'El vector director.', 'متجه التوجيه.', 'The direction vector.'), math: same('$\\overrightarrow{AB}=(4-1,-4-2)=(3,-6)$') },
            { text: say('Ekuazio parametrikoak A-tik.', 'Las paramétricas desde A.', 'المعادلتان الوسيطيتان من A.', 'The parametric equations from A.'), math: same('$x=1+3t,\\quad y=2-6t$') },
            { text: say('Lehen ekuaziotik, t.', 'De la primera ecuación, t.', 'من المعادلة الأولى: t.', 'From the first equation, t.'), math: same('$-2=1+3t\\ \\to\\ t=-1$') },
            { text: say('Bigarrena ere betetzen da: C zuzenekoa da.', 'También cumple la segunda: C es de la recta.', 'تتحقق الثانية أيضًا: C على المستقيم.', 'It also satisfies the second one: C is on the straight line.'), math: same('$2-6\\cdot(-1)=8$') }
        ],
        takeaway: say('Puntu bat eta norabide-bektore bat. t bakoitzak puntu bat ematen du. Bi ekuazioetan t bera: zuzenekoa.', 'Un punto y un vector director. Cada t da un punto. El mismo t en las dos ecuaciones: es de la recta.', 'نقطة ومتجه توجيه. كل t تعطي نقطة. القيمة نفسها لـ t في المعادلتين: النقطة على المستقيم.', 'A point and a direction vector. Each t gives a point. The same t in both equations: it is on the straight line.'),
        figure: (language) => <ParametricFigure language={language} />
    },
    {
        id: 'continuous',
        stage: 'equations',
        title: say('Ekuazio jarraitua eta puntu-malda ekuazioa', 'Ecuación continua y punto-pendiente', 'المعادلة المتصلة ومعادلة النقطة والميل', 'Continuous and point-slope equations'),
        goal: say('Ekuazio jarraitua eta puntu-malda ekuazioa idaztea eta maldaren eta norabide-bektorearen arteko lotura erabiltzea.', 'Escribir la ecuación continua y la punto-pendiente, y relacionar la pendiente con el vector director.', 'كتابة المعادلة المتصلة ومعادلة النقطة والميل، وربط الميل بمتجه التوجيه.', 'Write the continuous and point-slope equations, and relate the slope to the direction vector.'),
        needs: [
            { unit: 'dbh3/funciones-lineales', topic: 'two-points', title: { eu: 'Bi puntutatik igarotzen den zuzena', es: 'Recta que pasa por dos puntos', en: 'The line through two points', ar: 'المستقيم المار بنقطتين' } }
        ],
        problem: say('Idatzi $P(2,-1)$ puntutik pasatzen den eta $\\vec{d}=(4,6)$ norabide-bektorea duen zuzenaren ekuazio jarraitua eta puntu-malda ekuazioa.', 'Escribe las ecuaciones continua y punto-pendiente de la recta que pasa por $P(2,-1)$ con vector director $\\vec{d}=(4,6)$.', 'اكتب المعادلة المتصلة ومعادلة النقطة والميل للمستقيم المار بـ $P(2,-1)$ ومتجه توجيهه $\\vec{d}=(4,6)$.', 'Write the continuous and point-slope equations of the straight line through $P(2,-1)$ with direction vector $\\vec{d}=(4,6)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ekuazio jarraitua.', 'La ecuación continua.', 'المعادلة المتصلة.', 'The continuous equation.'), math: same('$\\frac{x-2}{4}=\\frac{y+1}{6}$') },
            { text: say('Malda, bektoretik.', 'La pendiente, del vector.', 'الميل من المتجه.', 'The slope, from the vector.'), math: same('$m=\\frac{6}{4}=\\frac{3}{2}$') },
            { text: say('Puntu-malda ekuazioa.', 'La ecuación punto-pendiente.', 'معادلة النقطة والميل.', 'The point-slope equation.'), math: same('$y+1=\\frac{3}{2}\\,(x-2)$') }
        ],
        takeaway: say('Jarraitua: bi zatiki berdinduta. Puntu-malda: y − p₂ = m (x − p₁), m = d₂ / d₁.', 'Continua: dos fracciones igualadas. Punto-pendiente: y − p₂ = m (x − p₁), con m = d₂ / d₁.', 'المتصلة: كسران متساويان. النقطة والميل: y − p₂ = m (x − p₁) مع m = d₂ / d₁.', 'Continuous: two fractions set equal. Point-slope: y − p₂ = m (x − p₁), with m = d₂ / d₁.'),
        figure: (language) => <FormsFigure language={language} />
    },
    {
        id: 'general-explicit',
        stage: 'equations',
        figureAfterSteps: true,
        title: say('Ekuazio orokorra eta esplizitua', 'Ecuación general y explícita', 'المعادلة العامة والمعادلة الصريحة', 'General and explicit equations'),
        goal: say('Ekuazio orokorra eta esplizitua idaztea, eta haietatik malda, jatorriko ordenatua eta ardatzekiko ebakidurak irakurtzea.', 'Escribir las ecuaciones general y explícita, y leer en ellas la pendiente, la ordenada en el origen y los cortes con los ejes.', 'كتابة المعادلة العامة والصريحة، وقراءة الميل والمقطع الصادي ونقاط التقاطع مع المحورين منهما.', 'Write the general and explicit equations, and read from them the slope, the y-intercept and the intersections with the axes.'),
        needs: [
            { unit: 'dbh3/funciones-lineales', topic: 'intercepts', title: { eu: 'Ardatzekiko ebaki-puntuak', es: 'Puntos de corte con los ejes', en: 'Where a graph meets the axes', ar: 'نقاط التقاطع مع المحورين' } }
        ],
        problem: say('Idatzi $2x-3y+6=0$ zuzenaren ekuazio esplizitua, haren malda eta ardatzekiko ebakidurak.', 'Escribe la ecuación explícita de $2x-3y+6=0$, su pendiente y sus cortes con los ejes.', 'اكتب المعادلة الصريحة للمستقيم $2x-3y+6=0$ وميله ونقطتي تقاطعه مع المحورين.', 'Write the explicit equation of $2x-3y+6=0$, its slope and its intersections with the axes.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Askatu y.', 'Despeja y.', 'اعزل y.', 'Solve for y.'), math: same('$3y=2x+6$') },
            { text: say('Esplizitua: m = 2/3 eta n = 2.', 'Explícita: m = 2/3 y n = 2.', 'الصريحة: m = 2/3 وn = 2.', 'Explicit: m = 2/3 and n = 2.'), math: same('$y=\\frac{2}{3}x+2$') },
            { text: say('x = 0: Y ardatza (0, 2) puntuan.', 'x = 0: el eje Y en (0, 2).', 'x = 0: محور Y عند (0, 2).', 'x = 0: the y-axis at (0, 2).'), math: same('$y=\\frac{2}{3}\\cdot 0+2=2$') },
            { text: say('y = 0: X ardatza (−3, 0) puntuan.', 'y = 0: el eje X en (−3, 0).', 'y = 0: محور X عند (−3, 0).', 'y = 0: the x-axis at (−3, 0).'), math: same('$2x+6=0\\ \\to\\ x=-3$') }
        ],
        takeaway: say('Orokorra: Ax + By + C = 0, bektorea (−B, A). Esplizitua: y = mx + n. Ebakidurak: x = 0 eta y = 0.', 'General: Ax + By + C = 0, vector (−B, A). Explícita: y = mx + n. Cortes: x = 0 e y = 0.', 'العامة: Ax + By + C = 0 والمتجه (−B, A). الصريحة: y = mx + n. التقاطعان: x = 0 وy = 0.', 'General: Ax + By + C = 0, vector (−B, A). Explicit: y = mx + n. Intersections: x = 0 and y = 0.'),
        figure: (language) => <GeneralFigure language={language} />
    },

    /* ---------- 4. Slope and relative positions ---------- */
    {
        id: 'slope',
        stage: 'positions',
        figureAfterSteps: true,
        title: say('Zuzen baten malda', 'Pendiente de una recta', 'ميل المستقيم', 'Slope of a straight line'),
        goal: say('Malda bi puntutatik edo norabide-bektore batetik kalkulatzea eta haren esanahia interpretatzea.', 'Calcular la pendiente a partir de dos puntos o de un vector director e interpretar su significado.', 'حساب الميل من نقطتين أو من متجه توجيه وتفسير معناه.', 'Calculate the slope from two points or from a direction vector, and interpret its meaning.'),
        needs: [
            { unit: 'dbh3/funciones-lineales', topic: 'slope', title: { eu: 'Malda', es: 'La pendiente', en: 'The slope', ar: 'الميل' } },
            { unit: 'dbh4-akademikoak/trigonometria', topic: 'right-ratios', title: { eu: 'Sinua, kosinua eta tangentea', es: 'Seno, coseno y tangente', en: 'Sine, cosine and tangent', ar: 'الجيب وجيب التمام والظل' } }
        ],
        problem: say('Kalkulatu $A(-1,3)$ eta $B(3,-5)$ puntuetatik pasatzen den zuzenaren malda eta ekuazio esplizitua.', 'Halla la pendiente y la ecuación explícita de la recta que pasa por $A(-1,3)$ y $B(3,-5)$.', 'أوجد ميل المستقيم المار بـ $A(-1,3)$ و$B(3,-5)$ ومعادلته الصريحة.', 'Find the slope and the explicit equation of the straight line through $A(-1,3)$ and $B(3,-5)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Malda: ordenatuen kendura zati abzisen kendura.', 'Pendiente: diferencia de ordenadas entre diferencia de abscisas.', 'الميل: فرق الصادات على فرق السينات.', 'Slope: difference of the y-coordinates divided by the difference of the x-coordinates.'), math: same('$m=\\frac{-5-3}{3-(-1)}=\\frac{-8}{4}=-2$') },
            { text: say('Puntu-malda, A-tik.', 'Punto-pendiente, desde A.', 'النقطة والميل من A.', 'Point-slope, from A.'), math: same('$y-3=-2\\,(x+1)$') },
            { text: say('Esplizitua.', 'Explícita.', 'الصريحة.', 'Explicit form.'), math: same('$y=-2x+1$') }
        ],
        takeaway: say('Malda: igoera zati aurrerapena. m > 0 gorakorra, m < 0 beherakorra, m = 0 horizontala.', 'Pendiente: lo que sube entre lo que avanza. m > 0 creciente, m < 0 decreciente, m = 0 horizontal.', 'الميل: الصعود على التقدّم. m > 0 متزايد، m < 0 متناقص، m = 0 أفقي.', 'Slope: how much it goes up or down, divided by how far it goes across. m > 0 increasing, m < 0 decreasing, m = 0 horizontal.'),
        figure: (language) => <SlopeFigure language={language} />
    },
    {
        id: 'parallel-perpendicular',
        stage: 'positions',
        figureAfterSteps: true,
        title: say('Zuzen paraleloak eta perpendikularrak', 'Rectas paralelas y perpendiculares', 'المستقيمات المتوازية والمتعامدة', 'Parallel and perpendicular straight lines'),
        goal: say('Puntu batetik zuzen baten paraleloa eta perpendikularra kalkulatzea.', 'Hallar la recta paralela y la perpendicular a otra por un punto.', 'إيجاد المستقيم الموازي والمستقيم العمودي على مستقيم آخر مرورًا بنقطة.', 'Find the parallel and the perpendicular straight line to another through a point.'),
        needs: [
            { unit: 'dbh3/funciones-lineales', topic: 'parallel-lines', title: { eu: 'Zuzen paraleloak eta ebakidurak', es: 'Rectas paralelas y cortes', en: 'Parallel lines and crossings', ar: 'المستقيمات المتوازية والتقاطعات' } }
        ],
        problem: say('$P(2,1)$ puntutik, kalkulatu $y=3x-4$ zuzenaren paraleloa eta perpendikularra.', 'Por $P(2,1)$, halla la paralela y la perpendicular a $y=3x-4$.', 'مرورًا بـ $P(2,1)$ أوجد الموازي والعمودي على $y=3x-4$.', 'Through $P(2,1)$, find the parallel and the perpendicular to $y=3x-4$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Paraleloa: m = 3.', 'Paralela: m = 3.', 'الموازي: m = 3.', 'Parallel: m = 3.'), math: same('$y-1=3\\,(x-2)\\ \\to\\ y=3x-5$') },
            { text: say('Perpendikularra: m′ = −1/3.', 'Perpendicular: m′ = −1/3.', 'العمودي: m′ = −1/3.', 'Perpendicular: m′ = −1/3.'), math: same('$y-1=-\\frac{1}{3}\\,(x-2)$') },
            { text: say('Esplizitua.', 'Explícita.', 'الصريحة.', 'Explicit form.'), math: same('$y=-\\frac{1}{3}x+\\frac{5}{3}$') }
        ],
        takeaway: say('Paraleloak: malda bera. Perpendikularrak: m · m′ = −1, alderantzizkoa eta zeinua aldatuta.', 'Paralelas: la misma pendiente. Perpendiculares: m · m′ = −1, la inversa cambiada de signo.', 'متوازيان: الميل نفسه. متعامدان: m · m′ = −1، المقلوب مع تغيير الإشارة.', 'Parallel: the same slope. Perpendicular: m · m′ = −1, the negative reciprocal.'),
        figure: (language) => <ParallelLinesFigure language={language} />
    },
    {
        id: 'relative-position',
        stage: 'positions',
        title: say('Bi zuzenen posizio erlatiboa', 'Posición relativa de dos rectas', 'الوضع النسبي لمستقيمين', 'Relative position of two straight lines'),
        goal: say('Bi zuzen ebakitzaileak, paraleloak edo bat datozenak diren erabakitzea eta ebaki-puntua kalkulatzea.', 'Decidir si dos rectas son secantes, paralelas o coincidentes y hallar el punto de corte.', 'تحديد ما إذا كان مستقيمان متقاطعين أو متوازيين أو منطبقين وإيجاد نقطة التقاطع.', 'Decide whether two straight lines are intersecting, parallel or coincident, and find the intersection point.'),
        needs: [
            { unit: 'dbh4-akademikoak/sistemas', topic: 'classify', title: { eu: 'Koefizienteekin sailkatzea', es: 'Clasificar con los coeficientes', en: 'Classify using the coefficients', ar: 'التصنيف بالمعاملات' } }
        ],
        problem: say('Aztertu $r\\colon x+2y=5$ eta $s\\colon 3x-y=1$ zuzenen posizioa eta kalkulatu ebaki-puntua.', 'Estudia la posición de $r\\colon x+2y=5$ y $s\\colon 3x-y=1$ y halla el punto de corte.', 'ادرس وضع المستقيمين $r\\colon x+2y=5$ و$s\\colon 3x-y=1$ وأوجد نقطة تقاطعهما.', 'Study the relative position of $r\\colon x+2y=5$ and $s\\colon 3x-y=1$, and find their intersection point.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatidurak desberdinak: ebakitzaileak.', 'Cocientes distintos: secantes.', 'نسبتان مختلفتان: متقاطعان.', 'Different ratios: intersecting.'), math: same('$\\frac{1}{3}\\neq\\frac{2}{-1}$') },
            { text: say('s-tik, y askatu.', 'De s, despeja y.', 'من s اعزل y.', 'From s, solve for y.'), math: same('$y=3x-1$') },
            { text: say('Ordeztu r-n.', 'Sustituye en r.', 'عوّض في r.', 'Substitute into r.'), math: same('$x+2\\,(3x-1)=5\\ \\to\\ 7x=7$') },
            { text: say('Ebaki-puntua (1, 2).', 'El punto de corte es (1, 2).', 'نقطة التقاطع (1, 2).', 'The intersection point is (1, 2).'), math: same('$x=1,\\quad y=3\\cdot 1-1=2$') }
        ],
        takeaway: say('Malda desberdinak: ebakitzaileak. Malda bera: paraleloak edo bat datozenak. Ebaki-puntua: sistema.', 'Pendientes distintas: secantes. Misma pendiente: paralelas o coincidentes. Punto de corte: el sistema.', 'ميلان مختلفان: متقاطعان. الميل نفسه: متوازيان أو منطبقان. نقطة التقاطع: النظام.', 'Different slopes: intersecting. Same slope: parallel or coincident. Intersection point: the system.'),
        figure: (language) => <PositionsFigure language={language} />
    },

    /* ---------- 5. Applications ---------- */
    {
        id: 'bisector',
        stage: 'applications',
        figureAfterSteps: true,
        title: say('Zuzenki baten erdibitzailea', 'Mediatriz de un segmento', 'محور القطعة', 'Perpendicular bisector of a segment'),
        goal: say('Zuzenki baten erdibitzailearen ekuazioa kalkulatzea eta haren propietatea erabiltzea.', 'Hallar la ecuación de la mediatriz de un segmento y usar su propiedad.', 'إيجاد معادلة محور قطعة واستعمال خاصيته.', 'Find the equation of the perpendicular bisector of a segment and use its property.'),
        needs: [
            { unit: 'dbh3/geometria-plana', topic: 'perpendicular-bisector', title: { eu: 'Segmentu baten erdibitzailea', es: 'La mediatriz de un segmento', en: 'The perpendicular bisector', ar: 'المنصّف العمودي لقطعة' } }
        ],
        problem: say('Kalkulatu $A(1,1)$ eta $B(5,3)$ muturreko zuzenkiaren erdibitzailea.', 'Halla la mediatriz del segmento de extremos $A(1,1)$ y $B(5,3)$.', 'أوجد محور القطعة التي طرفاها $A(1,1)$ و$B(5,3)$.', 'Find the perpendicular bisector of the segment with endpoints $A(1,1)$ and $B(5,3)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erdiko puntua.', 'El punto medio.', 'المنتصف.', 'The midpoint.'), math: same('$M=\\left(\\frac{1+5}{2},\\frac{1+3}{2}\\right)=(3,2)$') },
            { text: say('AB-ren malda.', 'La pendiente de AB.', 'ميل AB.', 'The slope of AB.'), math: same('$m=\\frac{3-1}{5-1}=\\frac{1}{2}$') },
            { text: say('Perpendikularra: m′ = −2.', 'Perpendicular: m′ = −2.', 'العمودي: m′ = −2.', 'Perpendicular: m′ = −2.'), math: same('$y-2=-2\\,(x-3)\\ \\to\\ y=-2x+8$') }
        ],
        takeaway: say('Erdibitzailea: erdiko puntutik, AB-ren perpendikularra. Haren puntuak A-tik eta B-tik distantzia berera.', 'Mediatriz: por el punto medio, perpendicular a AB. Sus puntos equidistan de A y de B.', 'المحور: يمر بالمنتصف عموديًا على AB. ونقاطه على بعدين متساويين من A وB.', 'Perpendicular bisector: through the midpoint, perpendicular to AB. Its points are equidistant from A and B.'),
        figure: (language) => <BisectorFigure language={language} />
    },
    {
        id: 'circle',
        stage: 'applications',
        figureAfterSteps: true,
        title: say('Zirkunferentziaren ekuazioa', 'Ecuación de la circunferencia', 'معادلة الدائرة', 'Equation of the circumference'),
        goal: say('Zirkunferentzia baten ekuazioa idaztea eta puntu bat barruan, gainean edo kanpoan dagoen erabakitzea.', 'Escribir la ecuación de una circunferencia y decidir si un punto está dentro, sobre ella o fuera.', 'كتابة معادلة دائرة وتحديد موقع نقطة: داخلها أو عليها أو خارجها.', 'Write the equation of a circumference, and decide whether a point is inside it, on it or outside it.'),
        problem: say('Idatzi $C(2,-1)$ zentroa duen eta $P(5,3)$ puntutik pasatzen den zirkunferentziaren ekuazioa.', 'Escribe la ecuación de la circunferencia de centro $C(2,-1)$ que pasa por $P(5,3)$.', 'اكتب معادلة الدائرة التي مركزها $C(2,-1)$ وتمر بـ $P(5,3)$.', 'Write the equation of the circumference with centre $C(2,-1)$ that passes through $P(5,3)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erradioa: zentrotik P-ra.', 'El radio: del centro a P.', 'نصف القطر: من المركز إلى P.', 'The radius: from the centre to P.'), math: same('$r=\\sqrt{(5-2)^{2}+(3+1)^{2}}=5$') },
            { text: say('Ekuazioa.', 'La ecuación.', 'المعادلة.', 'The equation.'), math: same('$(x-2)^{2}+(y+1)^{2}=25$') }
        ],
        takeaway: say('Zentroa eta erradioa: (x − a)² + (y − b)² = r². Puntu bat: alderatu zentrorako distantzia eta r.', 'Centro y radio: (x − a)² + (y − b)² = r². Un punto: compara su distancia al centro con r.', 'المركز ونصف القطر: (x − a)² + (y − b)² = r². نقطة: قارن بعدها عن المركز بـ r.', 'Centre and radius: (x − a)² + (y − b)² = r². A point: compare its distance from the centre with r.'),
        figure: (language) => <CircleFigure language={language} />
    },
    {
        id: 'polygons',
        stage: 'applications',
        figureAfterSteps: true,
        title: say('Poligonoak koordenatuekin', 'Polígonos con coordenadas', 'المضلعات بالإحداثيات', 'Polygons with coordinates'),
        goal: say('Paralelogramo eta triangeluekin problemak ebaztea bektoreak, distantziak eta maldak erabiliz.', 'Resolver problemas de paralelogramos y triángulos con vectores, distancias y pendientes.', 'حل مسائل متوازيات الأضلاع والمثلثات بالمتجهات والمسافات والميول.', 'Solve problems about parallelograms and triangles using vectors, distances and slopes.'),
        problem: say('$A(1,1)$, $B(5,2)$ eta $C(6,6)$ ABCD paralelogramoaren hiru erpin jarraitu dira. Kalkulatu D eta egiaztatu AC eta BD diagonalek erdiko puntu bera dutela.', '$A(1,1)$, $B(5,2)$ y $C(6,6)$ son tres vértices consecutivos del paralelogramo ABCD. Halla D y comprueba que las diagonales AC y BD tienen el mismo punto medio.', '$A(1,1)$ و$B(5,2)$ و$C(6,6)$ ثلاثة رؤوس متتالية لمتوازي الأضلاع ABCD. أوجد D وتحقق من أن للقطرين AC وBD المنتصف نفسه.', '$A(1,1)$, $B(5,2)$ and $C(6,6)$ are three consecutive vertices of the parallelogram ABCD. Find D and check that the diagonals AC and BD have the same midpoint.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Laugarren erpina.', 'El cuarto vértice.', 'الرأس الرابع.', 'The fourth vertex.'), math: same('$D=(1+6-5,1+6-2)=(2,5)$') },
            { text: say('AC-ren erdiko puntua.', 'Punto medio de AC.', 'منتصف AC.', 'Midpoint of AC.'), math: same('$\\left(\\frac{1+6}{2},\\frac{1+6}{2}\\right)=(3{,}5,3{,}5)$') },
            { text: say('BD-rena, berdina.', 'El de BD, el mismo.', 'منتصف BD هو نفسه.', 'That of BD, the same.'), math: same('$\\left(\\frac{5+2}{2},\\frac{2+5}{2}\\right)=(3{,}5,3{,}5)$') }
        ],
        takeaway: say('Paralelogramoa: D = A + C − B, diagonalak erdibituta. Angelu zuzena: bektore perpendikularrak.', 'Paralelogramo: D = A + C − B, diagonales que se cortan en su punto medio. Ángulo recto: vectores perpendiculares.', 'متوازي الأضلاع: D = A + C − B، والقطران متناصفان. الزاوية القائمة: متجهان متعامدان.', 'Parallelogram: D = A + C − B, diagonals that cross at their midpoint. Right angle: perpendicular vectors.'),
        figure: (language) => <ParallelogramFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const vectorsTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...vectorsLessonTexts[topic.id as VectorsTopicId], ...vectorsLessonChecks[topic.id as VectorsTopicId] }))
