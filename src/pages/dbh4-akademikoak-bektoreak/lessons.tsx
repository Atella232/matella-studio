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

export const vectorsTopics: UnitTopic[] = [
    /* ---------- 1. Vectors ---------- */
    {
        id: 'vector-coordinates',
        stage: 'vectors',
        title: say('Bektore baten koordenatuak eta modulua', 'Coordenadas y módulo de un vector', 'مركّبتا المتجه وطوله', 'Coordinates and magnitude of a vector'),
        goal: say('Bi puntuk zehazten duten bektorearen koordenatuak eta modulua kalkulatzea.', 'Calcular las coordenadas y el módulo del vector que determinan dos puntos.', 'حساب مركّبتي المتجه الذي تحدده نقطتان وطوله.', 'Calculate the coordinates and magnitude of the vector determined by two points.'),
        explanation: say(
            '$\\overrightarrow{AB}$ bektore finkoa zuzenki orientatu bat da: A jatorritik B muturrera doa. Haren koordenatuak muturrekoei jatorrikoak kenduta lortzen dira: $A(1,2)$ eta $B(5,5)$ badira, $\\overrightarrow{AB}=(5-1,5-2)=(4,3)$. Bektore batek modulua (luzera), norabidea (hura duen zuzenarena) eta noranzkoa (A-tik B-ra) ditu. Modulua Pitagorasekin kalkulatzen da: $|\\overrightarrow{AB}|=\\sqrt{4^{2}+3^{2}}=5$. Modulu, norabide eta noranzko bereko bi bektore finkok koordenatu berak dituzte: bektore aske bera adierazten dute, edozein puntutatik marraz daitekeena. Horregatik, puntu bat eta bektorea ezagututa, bestea aurkitzen da: $B=A+\\overrightarrow{AB}$.',
            'Un vector fijo $\\overrightarrow{AB}$ es un segmento orientado: va del origen A al extremo B. Sus coordenadas se obtienen restando las del origen a las del extremo: si $A(1,2)$ y $B(5,5)$, $\\overrightarrow{AB}=(5-1,5-2)=(4,3)$. Un vector tiene módulo (su longitud), dirección (la de la recta que lo contiene) y sentido (de A hacia B). El módulo se calcula con Pitágoras: $|\\overrightarrow{AB}|=\\sqrt{4^{2}+3^{2}}=5$. Dos vectores fijos con el mismo módulo, dirección y sentido tienen las mismas coordenadas: representan el mismo vector libre, que se puede dibujar desde cualquier punto. Por eso, si conoces un punto y el vector, encuentras el otro: $B=A+\\overrightarrow{AB}$.',
            'المتجه المقيّد $\\overrightarrow{AB}$ قطعة موجّهة: تبدأ من الأصل A وتنتهي عند الطرف B. وتُحسب مركّبتاه بطرح إحداثيي الأصل من إحداثيي الطرف: إذا كان $A(1,2)$ و$B(5,5)$ فإن $\\overrightarrow{AB}=(5-1,5-2)=(4,3)$. للمتجه طول (منظم) واتجاه (اتجاه المستقيم الحامل له) ومنحى (من A نحو B). ويُحسب الطول بفيثاغورس: $|\\overrightarrow{AB}|=\\sqrt{4^{2}+3^{2}}=5$. والمتجهان المقيّدان اللذان لهما الطول والاتجاه والمنحى نفسها لهما المركّبتان نفسهما: يمثّلان المتجه الحر نفسه، الذي يمكن رسمه من أي نقطة. لذلك إذا عرفت نقطة والمتجه وجدت الأخرى: $B=A+\\overrightarrow{AB}$.', 'A fixed vector $\\overrightarrow{AB}$ is a directed segment: it goes from the starting point A to the end point B. Its coordinates are found by subtracting those of the starting point from those of the end point: if $A(1,2)$ and $B(5,5)$, $\\overrightarrow{AB}=(5-1,5-2)=(4,3)$. A vector has a magnitude (its length), a direction (that of the straight line that contains it) and a sense (from A to B). The magnitude is worked out with Pythagoras\' theorem: $|\\overrightarrow{AB}|=\\sqrt{4^{2}+3^{2}}=5$. Two fixed vectors with the same magnitude, direction and sense have the same coordinates: they represent the same free vector, which can be drawn from any point. So, if you know one point and the vector, you can find the other point: $B=A+\\overrightarrow{AB}$.'
        ),
        problem: say('$A(-1,4)$ eta $B(5,-4)$ emanda, kalkulatu $\\overrightarrow{AB}$-ren koordenatuak eta modulua, eta $C(2,0)$ puntuan hasten den bektore berdin baten muturra.', 'Dados $A(-1,4)$ y $B(5,-4)$, halla las coordenadas y el módulo de $\\overrightarrow{AB}$, y el extremo de un vector igual que empieza en $C(2,0)$.', 'إذا كانت $A(-1,4)$ و$B(5,-4)$، فاحسب مركّبتي $\\overrightarrow{AB}$ وطوله، وطرف متجه مساوٍ له يبدأ من $C(2,0)$.', 'Given $A(-1,4)$ and $B(5,-4)$, find the coordinates and the magnitude of $\\overrightarrow{AB}$, and the end point of an equal vector that starts at $C(2,0)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Muturra ken jatorria.', 'Extremo menos origen.', 'الطرف ناقص الأصل.', 'End point minus start point.'), math: same('$\\overrightarrow{AB}=(5-(-1),-4-4)=(6,-8)$') },
            { text: say('Modulua, Pitagorasekin.', 'El módulo, con Pitágoras.', 'الطول بفيثاغورس.', 'The magnitude, using Pythagoras\' theorem.'), math: same('$|\\overrightarrow{AB}|=\\sqrt{6^{2}+(-8)^{2}}=\\sqrt{100}=10$') },
            { text: say('Batu bektorea C puntuari.', 'Suma el vector al punto C.', 'أضف المتجه إلى النقطة C.', 'Add the vector to point C.'), math: same('$D=(2+6,0-8)=(8,-8)$') }
        ],
        example: same('$\\overrightarrow{AB}=B-A$'),
        takeaway: say('Koordenatuak: muturra ken jatorria. Modulua: Pitagoras. Modulu, norabide eta noranzko bera: bektore bera.', 'Coordenadas: extremo menos origen. Módulo: Pitágoras. Mismo módulo, dirección y sentido: el mismo vector.', 'المركّبتان: الطرف ناقص الأصل. الطول: فيثاغورس. الطول والاتجاه والمنحى نفسها: المتجه نفسه.', 'Coordinates: end point minus start point. Magnitude: Pythagoras\' theorem. Same magnitude, direction and sense: the same vector.'),
        figure: (language) => <VectorFigure language={language} />
    },
    {
        id: 'vector-operations',
        stage: 'vectors',
        title: say('Bektoreekin eragiketak', 'Operaciones con vectores', 'العمليات على المتجهات', 'Operations with vectors'),
        goal: say('Bektoreak batzea, kentzea eta zenbaki batez biderkatzea, koordenatuekin eta grafikoki.', 'Sumar y restar vectores y multiplicarlos por un número, con coordenadas y gráficamente.', 'جمع المتجهات وطرحها وضربها في عدد، بالمركّبات وبيانيًا.', 'Add and subtract vectors and multiply them by a number, using coordinates and graphically.'),
        explanation: say(
            'Bektoreak koordenatuz koordenatu batzen dira: $(3,-1)+(-2,4)=(1,3)$. Grafikoki, bigarrenaren jatorria lehenengoaren muturrean jartzen da (edo biek osatzen duten paralelogramoa marrazten da). Kentzea aurkakoa batzea da: $\\vec{u}-\\vec{v}=\\vec{u}+(-\\vec{v})$, eta $(a,b)$-ren aurkakoa $(-a,-b)$ da. k zenbaki batez biderkatzean bi koordenatuak biderkatzen dira: $3\\cdot(2,-1)=(6,-3)$; emaitzak norabide bera du, modulua |k| aldiz handiagoa, eta noranzko bera k > 0 bada edo aurkakoa k < 0 bada. Eragiketa hauekin konbinazio linealak osatzen dira, $2\\vec{u}-\\vec{v}$ adibidez.',
            'Los vectores se suman coordenada a coordenada: $(3,-1)+(-2,4)=(1,3)$. Gráficamente, se pone el origen del segundo en el extremo del primero (o se dibuja el paralelogramo que forman). Restar es sumar el opuesto: $\\vec{u}-\\vec{v}=\\vec{u}+(-\\vec{v})$, y el opuesto de $(a,b)$ es $(-a,-b)$. Al multiplicar por un número k se multiplican las dos coordenadas: $3\\cdot(2,-1)=(6,-3)$; el resultado tiene la misma dirección, el módulo multiplicado por |k| y el mismo sentido si k > 0 o el contrario si k < 0. Con estas operaciones se forman combinaciones lineales como $2\\vec{u}-\\vec{v}$.',
            'تُجمع المتجهات مركّبةً مركّبة: $(3,-1)+(-2,4)=(1,3)$. وبيانيًا نضع أصل الثاني عند طرف الأول (أو نرسم متوازي الأضلاع الذي يكوّنانه). والطرح جمعُ المعاكس: $\\vec{u}-\\vec{v}=\\vec{u}+(-\\vec{v})$، ومعاكس $(a,b)$ هو $(-a,-b)$. وعند الضرب في عدد k تُضرب المركّبتان: $3\\cdot(2,-1)=(6,-3)$؛ وللناتج الاتجاه نفسه، وطوله مضروب في |k|، ومنحاه نفسه إذا كان k > 0 أو معاكس إذا كان k < 0. وبهذه العمليات تتكوّن التركيبات الخطية مثل $2\\vec{u}-\\vec{v}$.', 'Vectors are added coordinate by coordinate: $(3,-1)+(-2,4)=(1,3)$. Graphically, you place the start of the second vector at the end of the first (or draw the parallelogram they form). Subtracting means adding the opposite: $\\vec{u}-\\vec{v}=\\vec{u}+(-\\vec{v})$, and the opposite of $(a,b)$ is $(-a,-b)$. When you multiply by a number k, you multiply both coordinates: $3\\cdot(2,-1)=(6,-3)$; the result has the same direction, its magnitude is multiplied by |k|, and it has the same sense if k > 0 or the opposite sense if k < 0. With these operations you can form linear combinations such as $2\\vec{u}-\\vec{v}$.'
        ),
        problem: say('$\\vec{u}=(3,-1)$ eta $\\vec{v}=(-2,4)$ badira, kalkulatu $2\\vec{u}-\\vec{v}$ eta haren modulua.', 'Si $\\vec{u}=(3,-1)$ y $\\vec{v}=(-2,4)$, calcula $2\\vec{u}-\\vec{v}$ y su módulo.', 'إذا كان $\\vec{u}=(3,-1)$ و$\\vec{v}=(-2,4)$، فاحسب $2\\vec{u}-\\vec{v}$ وطوله.', 'If $\\vec{u}=(3,-1)$ and $\\vec{v}=(-2,4)$, calculate $2\\vec{u}-\\vec{v}$ and its magnitude.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehenik, bider 2.', 'Primero, por 2.', 'أولًا الضرب في 2.', 'First, multiply by 2.'), math: same('$2\\vec{u}=(6,-2)$') },
            { text: say('Gero, kendu koordenatuz koordenatu.', 'Después, resta coordenada a coordenada.', 'ثم اطرح مركّبةً مركّبة.', 'Then, subtract coordinate by coordinate.'), math: same('$(6-(-2),-2-4)=(8,-6)$') },
            { text: say('Modulua.', 'El módulo.', 'الطول.', 'The magnitude.'), math: same('$\\sqrt{8^{2}+(-6)^{2}}=\\sqrt{100}=10$') }
        ],
        example: same('$k\\cdot(a,b)=(ka,kb)$'),
        takeaway: say('Batu eta kendu: koordenatuz koordenatu. Zenbaki batez: bi koordenatuak. k negatiboa: noranzkoa aldatzen da.', 'Sumar y restar: coordenada a coordenada. Por un número: las dos coordenadas. k negativo: cambia el sentido.', 'الجمع والطرح: مركّبةً مركّبة. الضرب في عدد: المركّبتان معًا. k سالب: يتغيّر المنحى.', 'Add and subtract: coordinate by coordinate. By a number: both coordinates. k negative: the sense reverses.'),
        figure: (language) => <OperationsFigure language={language} />
    },
    {
        id: 'parallel-vectors',
        stage: 'vectors',
        title: say('Bektore paraleloak eta perpendikularrak', 'Vectores paralelos y perpendiculares', 'المتجهات المتوازية والمتعامدة', 'Parallel and perpendicular vectors'),
        goal: say('Bi bektore paraleloak diren aztertzea eta bektore baten perpendikular bat idaztea.', 'Reconocer si dos vectores son paralelos y escribir un vector perpendicular a otro.', 'تمييز توازي متجهين وكتابة متجه عمودي على متجه آخر.', 'Recognise whether two vectors are parallel and write a vector perpendicular to another.'),
        explanation: say(
            'Bi bektorek norabide bera dute (paraleloak dira) bata bestea bider zenbaki bat denean, hau da, haien koordenatuak proportzionalak direnean: $(2,3)$ eta $(6,9)$ paraleloak dira, $\\frac{6}{2}=\\frac{9}{3}=3$ delako. Egiaztatzeko, nahikoa da biderkadura gurutzatuak: $(a,b)$ eta $(c,d)$ paraleloak dira $a\\cdot d=b\\cdot c$ bada. $(a,b)$-ren bektore perpendikular bat koordenatuak trukatuz eta zeinu bat aldatuz lortzen da: $(-b,a)$ edo $(b,-a)$; horrela, $(3,4)$ eta $(-4,3)$ perpendikularrak dira. $\\vec{u}$-ren norabidea duen bektore unitario bat (1eko modulukoa) $\\frac{\\vec{u}}{|\\vec{u}|}$ da.',
            'Dos vectores tienen la misma dirección (son paralelos) cuando uno es el otro multiplicado por un número, es decir, cuando sus coordenadas son proporcionales: $(2,3)$ y $(6,9)$ son paralelos porque $\\frac{6}{2}=\\frac{9}{3}=3$. Para comprobarlo bastan los productos cruzados: $(a,b)$ y $(c,d)$ son paralelos si $a\\cdot d=b\\cdot c$. Un vector perpendicular a $(a,b)$ se obtiene intercambiando las coordenadas y cambiando un signo: $(-b,a)$ o $(b,-a)$; así, $(3,4)$ y $(-4,3)$ son perpendiculares. Un vector unitario (de módulo 1) con la dirección de $\\vec{u}$ es $\\frac{\\vec{u}}{|\\vec{u}|}$.',
            'يكون للمتجهين الاتجاه نفسه (متوازيان) عندما يكون أحدهما الآخرَ مضروبًا في عدد، أي عندما تكون مركّباتهما متناسبة: $(2,3)$ و$(6,9)$ متوازيان لأن $\\frac{6}{2}=\\frac{9}{3}=3$. وللتحقق يكفي الضرب التبادلي: $(a,b)$ و$(c,d)$ متوازيان إذا كان $a\\cdot d=b\\cdot c$. ونحصل على متجه عمودي على $(a,b)$ بتبديل المركّبتين وتغيير إشارة إحداهما: $(-b,a)$ أو $(b,-a)$؛ وهكذا فإن $(3,4)$ و$(-4,3)$ متعامدان. والمتجه الواحدي (طوله 1) الذي له اتجاه $\\vec{u}$ هو $\\frac{\\vec{u}}{|\\vec{u}|}$.', 'Two vectors have the same direction (they are parallel) when one is the other multiplied by a number, that is, when their coordinates are proportional: $(2,3)$ and $(6,9)$ are parallel because $\\frac{6}{2}=\\frac{9}{3}=3$. To check it, the cross products are enough: $(a,b)$ and $(c,d)$ are parallel if $a\\cdot d=b\\cdot c$. A vector perpendicular to $(a,b)$ is found by swapping the coordinates and changing one sign: $(-b,a)$ or $(b,-a)$; so $(3,4)$ and $(-4,3)$ are perpendicular. A unit vector (of magnitude 1) with the direction of $\\vec{u}$ is $\\frac{\\vec{u}}{|\\vec{u}|}$.'
        ),
        problem: say('Kalkulatu k, $(2,k)$ bektorea $(6,9)$-ren paraleloa izan dadin, eta idatzi $(6,9)$-ren bektore perpendikular bat.', 'Halla k para que $(2,k)$ sea paralelo a $(6,9)$, y escribe un vector perpendicular a $(6,9)$.', 'أوجد k ليكون $(2,k)$ موازيًا لـ $(6,9)$، واكتب متجهًا عموديًا على $(6,9)$.', 'Find k so that $(2,k)$ is parallel to $(6,9)$, and write a vector perpendicular to $(6,9)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkadura gurutzatuak berdinak.', 'Productos cruzados iguales.', 'الضربان التبادليان متساويان.', 'The cross products are equal.'), math: same('$2\\cdot 9=6\\cdot k$') },
            { text: say('Askatu k.', 'Despeja k.', 'استخرج k.', 'Solve for k.'), math: same('$k=\\frac{18}{6}=3$') },
            { text: say('Perpendikularra: trukatu eta aldatu zeinu bat.', 'Perpendicular: intercambia y cambia un signo.', 'العمودي: بدّل وغيّر إشارة.', 'Perpendicular: swap and change one sign.'), math: same('$(-9,6)$') }
        ],
        example: same('$(a,b)\\perp(-b,a)$'),
        takeaway: say('Paraleloak: koordenatu proportzionalak (a · d = b · c). (a, b)-ren perpendikularra: (−b, a).', 'Paralelos: coordenadas proporcionales (a · d = b · c). Perpendicular a (a, b): (−b, a).', 'متوازيان: مركّبات متناسبة (a · d = b · c). العمودي على (a, b): (−b, a).', 'Parallel: proportional coordinates (a · d = b · c). Perpendicular to (a, b): (−b, a).'),
        figure: (language) => <ParallelFigure language={language} />
    },

    /* ---------- 2. Points and distances ---------- */
    {
        id: 'distance',
        stage: 'points',
        title: say('Bi punturen arteko distantzia', 'Distancia entre dos puntos', 'المسافة بين نقطتين', 'Distance between two points'),
        goal: say('Bi punturen arteko distantzia kalkulatzea eta triangeluak sailkatzeko erabiltzea.', 'Calcular la distancia entre dos puntos y usarla para clasificar triángulos.', 'حساب المسافة بين نقطتين واستعمالها لتصنيف المثلثات.', 'Calculate the distance between two points and use it to classify triangles.'),
        explanation: say(
            'Bi punturen arteko distantzia haiek lotzen dituen bektorearen modulua da: $d(A,B)=|\\overrightarrow{AB}|=\\sqrt{(x_2-x_1)^{2}+(y_2-y_1)^{2}}$. Pitagoras da, abzisen kendura eta ordenatuen kendura katetoak dituen triangelu angeluzuzenean. Ordenak ez du axola, karratuek zeinua kentzen baitute. Distantziekin triangeluak sailkatzen dira (isoszeleak bi alde berdin badituzte, angeluzuzenak Pitagoras betetzen badute), perimetroak kalkulatzen dira eta puntu bat beste batetik distantzia jakin batera dagoen egiaztatzen da.',
            'La distancia entre dos puntos es el módulo del vector que los une: $d(A,B)=|\\overrightarrow{AB}|=\\sqrt{(x_2-x_1)^{2}+(y_2-y_1)^{2}}$. Es Pitágoras en el triángulo rectángulo cuyos catetos son la diferencia de abscisas y la diferencia de ordenadas. El orden no importa, porque los cuadrados eliminan el signo. Con distancias se clasifican triángulos (isósceles si tienen dos lados iguales, rectángulos si cumplen Pitágoras), se calculan perímetros y se comprueba si un punto está a cierta distancia de otro.',
            'المسافة بين نقطتين هي طول المتجه الذي يصلهما: $d(A,B)=|\\overrightarrow{AB}|=\\sqrt{(x_2-x_1)^{2}+(y_2-y_1)^{2}}$. إنها فيثاغورس في المثلث القائم الذي ضلعاه القائمان فرق السينات وفرق الصادات. ولا يهم الترتيب لأن التربيع يزيل الإشارة. وبالمسافات نصنّف المثلثات (متساوي الساقين إذا تساوى ضلعان، وقائم إذا تحققت فيثاغورس)، ونحسب المحيطات، ونتحقق من أن نقطة تبعد عن أخرى مسافة معيّنة.', 'The distance between two points is the magnitude of the vector that joins them: $d(A,B)=|\\overrightarrow{AB}|=\\sqrt{(x_2-x_1)^{2}+(y_2-y_1)^{2}}$. It is Pythagoras\' theorem in the right-angled triangle whose legs are the difference of the x-coordinates and the difference of the y-coordinates. The order does not matter, because squaring removes the sign. Distances are used to classify triangles (isosceles if two sides are equal, right-angled if they satisfy Pythagoras\' theorem), to work out perimeters, and to check whether a point is a certain distance from another point.'
        ),
        problem: say('Egiaztatu $A(1,1)$, $B(4,5)$ eta $C(8,2)$ erpineko triangelua isoszelea eta angeluzuzena dela.', 'Comprueba que el triángulo de vértices $A(1,1)$, $B(4,5)$ y $C(8,2)$ es isósceles y rectángulo.', 'تحقق من أن المثلث الذي رؤوسه $A(1,1)$ و$B(4,5)$ و$C(8,2)$ متساوي الساقين وقائم.', 'Check that the triangle with vertices $A(1,1)$, $B(4,5)$ and $C(8,2)$ is isosceles and right-angled.'),
        stepsKind: 'steps',
        steps: [
            { text: say('AB aldea.', 'El lado AB.', 'الضلع AB.', 'The side AB.'), math: same('$d(A,B)=\\sqrt{3^{2}+4^{2}}=5$') },
            { text: say('BC aldea: berdina, isoszelea.', 'El lado BC: igual, isósceles.', 'الضلع BC: مساوٍ، متساوي الساقين.', 'Side BC: equal in length, so isosceles.'), math: same('$d(B,C)=\\sqrt{4^{2}+(-3)^{2}}=5$') },
            { text: say('AC aldea.', 'El lado AC.', 'الضلع AC.', 'The side AC.'), math: same('$d(A,C)=\\sqrt{7^{2}+1^{2}}=\\sqrt{50}$') },
            { text: say('Pitagoras betetzen da: angeluzuzena B-n.', 'Se cumple Pitágoras: rectángulo en B.', 'تتحقق فيثاغورس: قائم في B.', 'Pythagoras\' theorem holds: right-angled at B.'), math: same('$5^{2}+5^{2}=50$') }
        ],
        example: same('$d(A,B)=|\\overrightarrow{AB}|$'),
        takeaway: say('Distantzia = modulua = √(Δx² + Δy²). Ordenak ez du axola.', 'Distancia = módulo = √(Δx² + Δy²). El orden no importa.', 'المسافة = الطول = √(Δx² + Δy²). الترتيب لا يهم.', 'Distance = magnitude = √(Δx² + Δy²). The order does not matter.'),
        figure: (language) => <DistanceFigure language={language} />
    },
    {
        id: 'midpoint',
        stage: 'points',
        title: say('Erdiko puntua eta puntu simetrikoa', 'Punto medio y punto simétrico', 'منتصف القطعة والنقطة المتناظرة', 'Midpoint and symmetric point'),
        goal: say('Zuzenki baten erdiko puntua eta puntu baten simetrikoa beste batekiko kalkulatzea.', 'Calcular el punto medio de un segmento y el simétrico de un punto respecto de otro.', 'حساب منتصف قطعة ونظيرة نقطة بالنسبة إلى نقطة أخرى.', 'Calculate the midpoint of a segment and the point symmetric to a point with respect to another.'),
        explanation: say(
            'AB zuzenkiaren M erdiko puntuaren koordenatuak muturrenen batez bestekoa dira: $M=\\left(\\frac{x_1+x_2}{2},\\frac{y_1+y_2}{2}\\right)$. Adibidez, $A(2,-3)$ eta $B(6,5)$ badira, $M=\\left(\\frac{2+6}{2},\\frac{-3+5}{2}\\right)=(4,1)$. Alderantziz, mutur bat eta erdiko puntua ezagututa, beste muturra $B=2M-A$ da. Horrek berak ematen du A puntuaren simetrikoa P puntuarekiko: $A\'=2P-A$, P baita $AA\'$ zuzenkiaren erdiko puntua.',
            'El punto medio M de un segmento AB tiene por coordenadas la media de las de los extremos: $M=\\left(\\frac{x_1+x_2}{2},\\frac{y_1+y_2}{2}\\right)$. Por ejemplo, de $A(2,-3)$ y $B(6,5)$ sale $M=\\left(\\frac{2+6}{2},\\frac{-3+5}{2}\\right)=(4,1)$. Al revés, si conoces un extremo y el punto medio, el otro extremo es $B=2M-A$. Eso mismo da el simétrico de un punto A respecto de otro P: $A\'=2P-A$, porque P es el punto medio de $AA\'$.',
            'إحداثيا منتصف القطعة AB، أي M، هما متوسطا إحداثيي الطرفين: $M=\\left(\\frac{x_1+x_2}{2},\\frac{y_1+y_2}{2}\\right)$. مثلًا من $A(2,-3)$ و$B(6,5)$ نحصل على $M=\\left(\\frac{2+6}{2},\\frac{-3+5}{2}\\right)=(4,1)$. وبالعكس، إذا عرفت طرفًا والمنتصف فالطرف الآخر هو $B=2M-A$. والقاعدة نفسها تعطي نظيرة النقطة A بالنسبة إلى نقطة P: $A\'=2P-A$، لأن P منتصف $AA\'$.', 'The midpoint M of a segment AB has as its coordinates the mean of those of the endpoints: $M=\\left(\\frac{x_1+x_2}{2},\\frac{y_1+y_2}{2}\\right)$. For example, from $A(2,-3)$ and $B(6,5)$ we get $M=\\left(\\frac{2+6}{2},\\frac{-3+5}{2}\\right)=(4,1)$. In reverse, if you know one endpoint and the midpoint, the other endpoint is $B=2M-A$. The same idea gives the point symmetric to a point A with respect to another point P: $A\'=2P-A$, because P is the midpoint of $AA\'$.'
        ),
        problem: say('Kalkulatu $A(-1,3)$ puntuaren simetrikoa $P(2,1)$ puntuarekiko.', 'Halla el simétrico de $A(-1,3)$ respecto de $P(2,1)$.', 'أوجد نظيرة $A(-1,3)$ بالنسبة إلى $P(2,1)$.', 'Find the point symmetric to $A(-1,3)$ with respect to $P(2,1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('P da A eta A′ puntuen erdikoa.', 'P es el punto medio de A y A′.', 'P منتصف A وA′.', 'P is the midpoint of A and A′.'), math: same('$A\'=2P-A$') },
            { text: say('Abzisa.', 'La abscisa.', 'الإحداثي السيني.', 'The x-coordinate.'), math: same('$2\\cdot 2-(-1)=5$') },
            { text: say('Ordenatua: A′(5, −1).', 'La ordenada: A′(5, −1).', 'الإحداثي الصادي: A′(5, −1).', 'The y-coordinate: A′(5, −1).'), math: same('$2\\cdot 1-3=-1$') }
        ],
        example: same('$M=\\left(\\frac{x_1+x_2}{2},\\frac{y_1+y_2}{2}\\right)$'),
        takeaway: say('Erdiko puntua: koordenatuen batez bestekoa. Simetrikoa: 2P − A.', 'Punto medio: la media de las coordenadas. Simétrico: 2P − A.', 'المنتصف: متوسط الإحداثيات. النظيرة: 2P − A.', 'Midpoint: the mean of the coordinates. Symmetric point: 2P − A.'),
        figure: (language) => <MidpointFigure language={language} />
    },
    {
        id: 'collinear',
        stage: 'points',
        title: say('Lerrokatutako puntuak', 'Puntos alineados', 'النقاط المستقيمة', 'Collinear points'),
        goal: say('Hiru puntu lerrokatuta dauden aztertzea eta koordenatu ezezagun bat aurkitzea.', 'Decidir si tres puntos están alineados y hallar una coordenada desconocida.', 'تحديد ما إذا كانت ثلاث نقاط على استقامة واحدة وإيجاد إحداثي مجهول.', 'Decide whether three points are collinear and find an unknown coordinate.'),
        explanation: say(
            'A, B eta C hiru puntu lerrokatuta daude $\\overrightarrow{AB}$ eta $\\overrightarrow{AC}$ bektoreak paraleloak badira, hau da, haien koordenatuak proportzionalak badira. $A(1,2)$, $B(3,6)$ eta $C(5,10)$ puntuekin: $\\overrightarrow{AB}=(2,4)$, $\\overrightarrow{AC}=(4,8)$ eta $\\frac{4}{2}=\\frac{8}{4}$; beraz, lerrokatuta daude. Koordenatu bat ezezaguna bada, proportzioak ekuazio bat ematen du. Lerrokatutako puntuek zuzenki bat zati berdinetan banatzeko ere balio dute: A-tik B-rako bidearen herenean dagoen puntua $A+\\frac{1}{3}\\overrightarrow{AB}$ da.',
            'Tres puntos A, B y C están alineados si los vectores $\\overrightarrow{AB}$ y $\\overrightarrow{AC}$ son paralelos, es decir, si sus coordenadas son proporcionales. Con $A(1,2)$, $B(3,6)$ y $C(5,10)$: $\\overrightarrow{AB}=(2,4)$, $\\overrightarrow{AC}=(4,8)$ y $\\frac{4}{2}=\\frac{8}{4}$; así que están alineados. Si una coordenada es desconocida, la proporción da una ecuación. Los puntos alineados también sirven para dividir un segmento en partes iguales: el punto situado a un tercio del camino de A a B es $A+\\frac{1}{3}\\overrightarrow{AB}$.',
            'تكون النقاط A وB وC على استقامة واحدة إذا كان المتجهان $\\overrightarrow{AB}$ و$\\overrightarrow{AC}$ متوازيين، أي إذا كانت مركّباتهما متناسبة. مع $A(1,2)$ و$B(3,6)$ و$C(5,10)$: $\\overrightarrow{AB}=(2,4)$ و$\\overrightarrow{AC}=(4,8)$ و$\\frac{4}{2}=\\frac{8}{4}$؛ إذن هي على استقامة واحدة. وإذا كان إحداثي مجهولًا فإن التناسب يعطي معادلة. وتفيد النقاط المستقيمة أيضًا في تقسيم قطعة إلى أجزاء متساوية: النقطة الواقعة على ثلث الطريق من A إلى B هي $A+\\frac{1}{3}\\overrightarrow{AB}$.', 'Three points A, B and C are collinear if the vectors $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$ are parallel, that is, if their coordinates are proportional. With $A(1,2)$, $B(3,6)$ and $C(5,10)$: $\\overrightarrow{AB}=(2,4)$, $\\overrightarrow{AC}=(4,8)$ and $\\frac{4}{2}=\\frac{8}{4}$; so they are collinear. If one coordinate is unknown, the proportion gives an equation. Collinear points are also useful for dividing a segment into equal parts: the point one third of the way from A to B is $A+\\frac{1}{3}\\overrightarrow{AB}$.'
        ),
        problem: say('Kalkulatu k, $A(1,2)$, $B(3,6)$ eta $C(6,k)$ lerrokatuta egon daitezen.', 'Halla k para que $A(1,2)$, $B(3,6)$ y $C(6,k)$ estén alineados.', 'أوجد k لتكون $A(1,2)$ و$B(3,6)$ و$C(6,k)$ على استقامة واحدة.', 'Find k so that $A(1,2)$, $B(3,6)$ and $C(6,k)$ are collinear.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bi bektoreak A-tik.', 'Los dos vectores desde A.', 'المتجهان من A.', 'The two vectors from A.'), math: same('$\\overrightarrow{AB}=(2,4)\\qquad \\overrightarrow{AC}=(5,k-2)$') },
            { text: say('Koordenatu proportzionalak.', 'Coordenadas proporcionales.', 'مركّبات متناسبة.', 'Proportional coordinates.'), math: same('$\\frac{5}{2}=\\frac{k-2}{4}$') },
            { text: say('Askatu: k = 12.', 'Despeja: k = 12.', 'استخرج: k = 12.', 'Solve for k: k = 12.'), math: same('$k-2=\\frac{5\\cdot 4}{2}=10$') }
        ],
        example: same('$\\overrightarrow{AB}\\parallel\\overrightarrow{AC}$'),
        takeaway: say('Lerrokatuta: AB eta AC bektoreak proportzionalak. Ezezagun bat: proportzioa ekuazio bihurtzen da.', 'Alineados: los vectores AB y AC son proporcionales. Una incógnita: la proporción se vuelve ecuación.', 'على استقامة واحدة: المتجهان AB وAC متناسبان. مجهول واحد: يصير التناسب معادلة.', 'Collinear: the vectors AB and AC are proportional. One unknown: the proportion becomes an equation.'),
        figure: (language) => <CollinearFigure language={language} />
    },

    /* ---------- 3. Equations of a line ---------- */
    {
        id: 'parametric',
        stage: 'equations',
        title: say('Ekuazio bektoriala eta parametrikoak', 'Ecuación vectorial y paramétricas', 'المعادلة المتجهية والمعادلتان الوسيطيتان', 'Vector equation and parametric equations'),
        goal: say('Puntu batetik eta norabide-bektore batetik zuzen baten ekuazio bektoriala eta parametrikoak idaztea.', 'Escribir la ecuación vectorial y las paramétricas de una recta a partir de un punto y un vector director.', 'كتابة المعادلة المتجهية والمعادلتين الوسيطيتين لمستقيم انطلاقًا من نقطة ومتجه توجيه.', 'Write the vector equation and the parametric equations of a straight line from a point and a direction vector.'),
        explanation: say(
            'Zuzen bat puntu batek, $P(p_1,p_2)$, eta norabide-bektore batek, $\\vec{d}=(d_1,d_2)$, zehazten dute. Zuzenaren X puntu bakoitzera P-tik iristen da, $\\vec{d}$-ren multiplo bat batuta: ekuazio bektoriala $(x,y)=(p_1,p_2)+t\\,(d_1,d_2)$ da. Koordenatuak bereiztean ekuazio parametrikoak ateratzen dira: $x=p_1+t\\,d_1$, $y=p_2+t\\,d_2$. t parametroaren balio bakoitzak puntu bat ematen du: t = 0 balioak P ematen du, eta t = 1 balioak $P+\\vec{d}$. Zuzena A eta B puntuetatik pasatzen bada, $\\vec{d}=\\overrightarrow{AB}$ erabil daiteke. Puntu bat zuzenekoa da t berak bi ekuazioak betetzen baditu.',
            'Una recta queda determinada por un punto $P(p_1,p_2)$ y un vector director $\\vec{d}=(d_1,d_2)$, que marca su dirección. A cada punto X de la recta se llega desde P sumando un múltiplo de $\\vec{d}$: la ecuación vectorial es $(x,y)=(p_1,p_2)+t\\,(d_1,d_2)$. Separando las coordenadas salen las ecuaciones paramétricas: $x=p_1+t\\,d_1$, $y=p_2+t\\,d_2$. Cada valor del parámetro t da un punto: t = 0 da P, y t = 1 da $P+\\vec{d}$. Si la recta pasa por A y B, sirve $\\vec{d}=\\overrightarrow{AB}$. Un punto pertenece a la recta si el mismo t cumple las dos ecuaciones.',
            'يتحدد المستقيم بنقطة $P(p_1,p_2)$ ومتجه توجيه $\\vec{d}=(d_1,d_2)$ يحدد اتجاهه. ونصل إلى كل نقطة X من المستقيم انطلاقًا من P بإضافة مضاعف لـ $\\vec{d}$: المعادلة المتجهية هي $(x,y)=(p_1,p_2)+t\\,(d_1,d_2)$. وبفصل المركّبتين نحصل على المعادلتين الوسيطيتين: $x=p_1+t\\,d_1$ و$y=p_2+t\\,d_2$. وكل قيمة للوسيط t تعطي نقطة: t = 0 تعطي P، وt = 1 تعطي $P+\\vec{d}$. وإذا مرّ المستقيم بـ A وB صلح $\\vec{d}=\\overrightarrow{AB}$. وتنتمي نقطة إلى المستقيم إذا حقّقت قيمةُ t نفسها المعادلتين.', 'A straight line is determined by a point $P(p_1,p_2)$ and a direction vector $\\vec{d}=(d_1,d_2)$, which gives its direction. To reach any point X on the straight line, start at P and add a multiple of $\\vec{d}$: the vector equation is $(x,y)=(p_1,p_2)+t\\,(d_1,d_2)$. Separating the coordinates gives the parametric equations: $x=p_1+t\\,d_1$, $y=p_2+t\\,d_2$. Each value of the parameter t gives a point: t = 0 gives P, and t = 1 gives $P+\\vec{d}$. If the straight line passes through A and B, then $\\vec{d}=\\overrightarrow{AB}$ works. A point lies on the straight line if the same t satisfies both equations.'
        ),
        problem: say('Idatzi $A(1,2)$ eta $B(4,-4)$ puntuetatik pasatzen den zuzenaren ekuazio parametrikoak, eta egiaztatu $C(-2,8)$ zuzenekoa den.', 'Escribe las paramétricas de la recta que pasa por $A(1,2)$ y $B(4,-4)$ y comprueba si $C(-2,8)$ es de la recta.', 'اكتب المعادلتين الوسيطيتين للمستقيم المار بـ $A(1,2)$ و$B(4,-4)$، وتحقق مما إذا كانت $C(-2,8)$ عليه.', 'Write the parametric equations of the straight line through $A(1,2)$ and $B(4,-4)$, and check whether $C(-2,8)$ is on the straight line.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Norabide-bektorea.', 'El vector director.', 'متجه التوجيه.', 'The direction vector.'), math: same('$\\overrightarrow{AB}=(4-1,-4-2)=(3,-6)$') },
            { text: say('Ekuazio parametrikoak A-tik.', 'Las paramétricas desde A.', 'المعادلتان الوسيطيتان من A.', 'The parametric equations from A.'), math: same('$x=1+3t,\\quad y=2-6t$') },
            { text: say('Lehen ekuaziotik, t.', 'De la primera ecuación, t.', 'من المعادلة الأولى: t.', 'From the first equation, t.'), math: same('$-2=1+3t\\ \\to\\ t=-1$') },
            { text: say('Bigarrena ere betetzen da: C zuzenekoa da.', 'También cumple la segunda: C es de la recta.', 'تتحقق الثانية أيضًا: C على المستقيم.', 'It also satisfies the second one: C is on the straight line.'), math: same('$2-6\\cdot(-1)=8$') }
        ],
        example: same('$(x,y)=(p_1,p_2)+t\\,(d_1,d_2)$'),
        takeaway: say('Puntu bat eta norabide-bektore bat. t bakoitzak puntu bat ematen du. Bi ekuazioetan t bera: zuzenekoa.', 'Un punto y un vector director. Cada t da un punto. El mismo t en las dos ecuaciones: es de la recta.', 'نقطة ومتجه توجيه. كل t تعطي نقطة. القيمة نفسها لـ t في المعادلتين: النقطة على المستقيم.', 'A point and a direction vector. Each t gives a point. The same t in both equations: it is on the straight line.'),
        figure: (language) => <ParametricFigure language={language} />
    },
    {
        id: 'continuous',
        stage: 'equations',
        title: say('Ekuazio jarraitua eta puntu-malda ekuazioa', 'Ecuación continua y punto-pendiente', 'المعادلة المتصلة ومعادلة النقطة والميل', 'Continuous and point-slope equations'),
        goal: say('Ekuazio jarraitua eta puntu-malda ekuazioa idaztea eta maldaren eta norabide-bektorearen arteko lotura erabiltzea.', 'Escribir la ecuación continua y la punto-pendiente, y relacionar la pendiente con el vector director.', 'كتابة المعادلة المتصلة ومعادلة النقطة والميل، وربط الميل بمتجه التوجيه.', 'Write the continuous and point-slope equations, and relate the slope to the direction vector.'),
        explanation: say(
            'Ekuazio parametrikoetan t askatu eta berdinduz gero, ekuazio jarraitua lortzen da: $\\frac{x-p_1}{d_1}=\\frac{y-p_2}{d_2}$ ($d_1$ eta $d_2$ zero ez badira). Gurutzean biderkatu eta y askatuz, puntu-malda ekuazioa agertzen da: $y-p_2=m\\,(x-p_1)$, non $m=\\frac{d_2}{d_1}$ malda den. Hiru ekuazioek zuzen bera deskribatzen dute: puntu bat eta norabide bat. Batetik bestera pasatzeko, identifikatu puntua eta norabide-bektorea (edo malda). Alderantziz, m maldako zuzen batek $(1,m)$ norabide-bektorea du.',
            'Despejando t en las paramétricas e igualando se obtiene la ecuación continua: $\\frac{x-p_1}{d_1}=\\frac{y-p_2}{d_2}$ (si $d_1$ y $d_2$ no son cero). Multiplicando en cruz y despejando y aparece la ecuación punto-pendiente: $y-p_2=m\\,(x-p_1)$, donde $m=\\frac{d_2}{d_1}$ es la pendiente. Las tres ecuaciones describen la misma recta: un punto y una dirección. Para pasar de una a otra, identifica el punto y el vector director (o la pendiente). Al revés, una recta de pendiente m tiene vector director $(1,m)$.',
            'بعزل t في المعادلتين الوسيطيتين ومساواة الناتجين نحصل على المعادلة المتصلة: $\\frac{x-p_1}{d_1}=\\frac{y-p_2}{d_2}$ (إذا لم يكن $d_1$ و$d_2$ صفرًا). وبالضرب التبادلي وعزل y تظهر معادلة النقطة والميل: $y-p_2=m\\,(x-p_1)$، حيث $m=\\frac{d_2}{d_1}$ هو الميل. والمعادلات الثلاث تصف المستقيم نفسه: نقطة واتجاه. وللانتقال من واحدة إلى أخرى حدّد النقطة ومتجه التوجيه (أو الميل). وبالعكس، للمستقيم الذي ميله m متجه توجيه $(1,m)$.', 'Solving for t in the parametric equations and equating them gives the continuous form: $\\frac{x-p_1}{d_1}=\\frac{y-p_2}{d_2}$ (if $d_1$ and $d_2$ are not zero). Cross-multiplying and solving for y gives the point-slope form: $y-p_2=m\\,(x-p_1)$, where $m=\\frac{d_2}{d_1}$ is the slope. The three equations describe the same straight line: one point and one direction. To go from one to another, identify the point and the direction vector (or the slope). In reverse, a straight line with slope m has direction vector $(1,m)$.'
        ),
        problem: say('Idatzi $P(2,-1)$ puntutik pasatzen den eta $\\vec{d}=(4,6)$ norabide-bektorea duen zuzenaren ekuazio jarraitua eta puntu-malda ekuazioa.', 'Escribe las ecuaciones continua y punto-pendiente de la recta que pasa por $P(2,-1)$ con vector director $\\vec{d}=(4,6)$.', 'اكتب المعادلة المتصلة ومعادلة النقطة والميل للمستقيم المار بـ $P(2,-1)$ ومتجه توجيهه $\\vec{d}=(4,6)$.', 'Write the continuous and point-slope equations of the straight line through $P(2,-1)$ with direction vector $\\vec{d}=(4,6)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ekuazio jarraitua.', 'La ecuación continua.', 'المعادلة المتصلة.', 'The continuous equation.'), math: same('$\\frac{x-2}{4}=\\frac{y+1}{6}$') },
            { text: say('Malda, bektoretik.', 'La pendiente, del vector.', 'الميل من المتجه.', 'The slope, from the vector.'), math: same('$m=\\frac{6}{4}=\\frac{3}{2}$') },
            { text: say('Puntu-malda ekuazioa.', 'La ecuación punto-pendiente.', 'معادلة النقطة والميل.', 'The point-slope equation.'), math: same('$y+1=\\frac{3}{2}\\,(x-2)$') }
        ],
        example: same('$y-p_2=m\\,(x-p_1)$'),
        takeaway: say('Jarraitua: bi zatiki berdinduta. Puntu-malda: y − p₂ = m (x − p₁), m = d₂ / d₁.', 'Continua: dos fracciones igualadas. Punto-pendiente: y − p₂ = m (x − p₁), con m = d₂ / d₁.', 'المتصلة: كسران متساويان. النقطة والميل: y − p₂ = m (x − p₁) مع m = d₂ / d₁.', 'Continuous: two fractions set equal. Point-slope: y − p₂ = m (x − p₁), with m = d₂ / d₁.'),
        figure: (language) => <FormsFigure language={language} />
    },
    {
        id: 'general-explicit',
        stage: 'equations',
        title: say('Ekuazio orokorra eta esplizitua', 'Ecuación general y explícita', 'المعادلة العامة والمعادلة الصريحة', 'General and explicit equations'),
        goal: say('Ekuazio orokorra eta esplizitua idaztea, eta haietatik malda, jatorriko ordenatua eta ardatzekiko ebakidurak irakurtzea.', 'Escribir las ecuaciones general y explícita, y leer en ellas la pendiente, la ordenada en el origen y los cortes con los ejes.', 'كتابة المعادلة العامة والصريحة، وقراءة الميل والمقطع الصادي ونقاط التقاطع مع المحورين منهما.', 'Write the general and explicit equations, and read from them the slope, the y-intercept and the intersections with the axes.'),
        explanation: say(
            'Aurrekoetako edozein eraginez, ekuazio orokorra (edo inplizitua) lortzen da: $Ax+By+C=0$, A eta B aldi berean zero izan gabe. Zuzen horren norabide-bektore bat $(-B,A)$ edo $(B,-A)$ da. $B\\neq 0$ bada, y askatzean ekuazio esplizitua ateratzen da: $y=mx+n$, non $m=-\\frac{A}{B}$ malda den eta $n=-\\frac{C}{B}$ jatorriko ordenatua (Y ardatza ebakitzen duen puntua). Ardatzekiko ebakidurak x = 0 edo y = 0 eginez lortzen dira. Zuzen bertikal batek, $x=k$, ez du ekuazio esplizitorik; horizontal bat $y=k$ da.',
            'Operando cualquiera de las anteriores se llega a la ecuación general (o implícita): $Ax+By+C=0$, con A y B no nulos a la vez. Un vector director de esa recta es $(-B,A)$ o $(B,-A)$. Si $B\\neq 0$, al despejar y sale la ecuación explícita: $y=mx+n$, donde $m=-\\frac{A}{B}$ es la pendiente y $n=-\\frac{C}{B}$ la ordenada en el origen (el punto donde corta al eje Y). Los cortes con los ejes se obtienen haciendo x = 0 o y = 0. Una recta vertical, $x=k$, no tiene ecuación explícita; una horizontal es $y=k$.',
            'بإجراء العمليات على أي من المعادلات السابقة نصل إلى المعادلة العامة (أو الضمنية): $Ax+By+C=0$، حيث A وB ليسا صفرين معًا. ومن متجهات توجيه هذا المستقيم $(-B,A)$ أو $(B,-A)$. وإذا كان $B\\neq 0$ فإن عزل y يعطي المعادلة الصريحة: $y=mx+n$، حيث $m=-\\frac{A}{B}$ هو الميل و$n=-\\frac{C}{B}$ المقطع الصادي (النقطة التي يقطع فيها محور Y). وتُحسب نقاط التقاطع مع المحورين بوضع x = 0 أو y = 0. والمستقيم الرأسي $x=k$ لا معادلة صريحة له؛ والأفقي هو $y=k$.', 'Working from any of the above leads to the general (or implicit) equation: $Ax+By+C=0$, with A and B not both zero. A direction vector of that straight line is $(-B,A)$ or $(B,-A)$. If $B\\neq 0$, solving for y gives the explicit equation: $y=mx+n$, where $m=-\\frac{A}{B}$ is the slope and $n=-\\frac{C}{B}$ is the y-intercept (the point where it crosses the y-axis). The intersections with the axes are found by setting x = 0 or y = 0. A vertical straight line, $x=k$, has no explicit equation; a horizontal one is $y=k$.'
        ),
        problem: say('Idatzi $2x-3y+6=0$ zuzenaren ekuazio esplizitua, haren malda eta ardatzekiko ebakidurak.', 'Escribe la ecuación explícita de $2x-3y+6=0$, su pendiente y sus cortes con los ejes.', 'اكتب المعادلة الصريحة للمستقيم $2x-3y+6=0$ وميله ونقطتي تقاطعه مع المحورين.', 'Write the explicit equation of $2x-3y+6=0$, its slope and its intersections with the axes.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Askatu y.', 'Despeja y.', 'اعزل y.', 'Solve for y.'), math: same('$3y=2x+6$') },
            { text: say('Esplizitua: m = 2/3 eta n = 2.', 'Explícita: m = 2/3 y n = 2.', 'الصريحة: m = 2/3 وn = 2.', 'Explicit: m = 2/3 and n = 2.'), math: same('$y=\\frac{2}{3}x+2$') },
            { text: say('x = 0: Y ardatza (0, 2) puntuan.', 'x = 0: el eje Y en (0, 2).', 'x = 0: محور Y عند (0, 2).', 'x = 0: the y-axis at (0, 2).'), math: same('$y=\\frac{2}{3}\\cdot 0+2=2$') },
            { text: say('y = 0: X ardatza (−3, 0) puntuan.', 'y = 0: el eje X en (−3, 0).', 'y = 0: محور X عند (−3, 0).', 'y = 0: the x-axis at (−3, 0).'), math: same('$2x+6=0\\ \\to\\ x=-3$') }
        ],
        example: same('$Ax+By+C=0\\ \\to\\ y=mx+n$'),
        takeaway: say('Orokorra: Ax + By + C = 0, bektorea (−B, A). Esplizitua: y = mx + n. Ebakidurak: x = 0 eta y = 0.', 'General: Ax + By + C = 0, vector (−B, A). Explícita: y = mx + n. Cortes: x = 0 e y = 0.', 'العامة: Ax + By + C = 0 والمتجه (−B, A). الصريحة: y = mx + n. التقاطعان: x = 0 وy = 0.', 'General: Ax + By + C = 0, vector (−B, A). Explicit: y = mx + n. Intersections: x = 0 and y = 0.'),
        figure: (language) => <GeneralFigure language={language} />
    },

    /* ---------- 4. Slope and relative positions ---------- */
    {
        id: 'slope',
        stage: 'positions',
        title: say('Zuzen baten malda', 'Pendiente de una recta', 'ميل المستقيم', 'Slope of a straight line'),
        goal: say('Malda bi puntutatik edo norabide-bektore batetik kalkulatzea eta haren esanahia interpretatzea.', 'Calcular la pendiente a partir de dos puntos o de un vector director e interpretar su significado.', 'حساب الميل من نقطتين أو من متجه توجيه وتفسير معناه.', 'Calculate the slope from two points or from a direction vector, and interpret its meaning.'),
        explanation: say(
            'm maldak neurtzen du zuzena zenbat igotzen (edo jaisten) den eskuinera unitate bat aurreratzen den bakoitzean. Bi puntutatik: $m=\\frac{y_2-y_1}{x_2-x_1}$; norabide-bektore batetik: $m=\\frac{d_2}{d_1}$; ekuazio esplizituan x-ren koefizientea da. m > 0 bada, zuzena gorakorra da; m < 0 bada, beherakorra; m = 0 bada, horizontala; zuzen bertikalek ez dute maldarik. Gainera, m zuzenak X ardatzaren alde positiboarekin osatzen duen angeluaren tangentea da: zenbat eta handiagoa |m|, orduan eta zutikago zuzena.',
            'La pendiente m mide cuánto sube (o baja) la recta por cada unidad que se avanza hacia la derecha. Con dos puntos: $m=\\frac{y_2-y_1}{x_2-x_1}$; con un vector director: $m=\\frac{d_2}{d_1}$; en la ecuación explícita es el coeficiente de x. Si m > 0, la recta es creciente; si m < 0, decreciente; si m = 0, horizontal; las rectas verticales no tienen pendiente. Además, m es la tangente del ángulo que forma la recta con la parte positiva del eje X: cuanto mayor es |m|, más empinada es la recta.',
            'يقيس الميل m مقدار صعود المستقيم (أو هبوطه) لكل وحدة نتقدمها نحو اليمين. من نقطتين: $m=\\frac{y_2-y_1}{x_2-x_1}$؛ ومن متجه توجيه: $m=\\frac{d_2}{d_1}$؛ وفي المعادلة الصريحة هو معامل x. إذا كان m > 0 فالمستقيم متزايد؛ وإذا كان m < 0 فمتناقص؛ وإذا كان m = 0 فأفقي؛ والمستقيمات الرأسية لا ميل لها. كما أن m هو ظل الزاوية التي يصنعها المستقيم مع الجزء الموجب من محور X: كلما كبر |m| ازداد انحدار المستقيم.', 'The slope m measures how much the straight line goes up (or down) for each unit moved to the right. With two points: $m=\\frac{y_2-y_1}{x_2-x_1}$; with a direction vector: $m=\\frac{d_2}{d_1}$; in the explicit equation it is the coefficient of x. If m > 0, the straight line is increasing; if m < 0, decreasing; if m = 0, horizontal; vertical straight lines have no slope. Also, m is the tangent of the angle that the straight line makes with the positive part of the x-axis: the greater |m| is, the steeper the straight line.'
        ),
        problem: say('Kalkulatu $A(-1,3)$ eta $B(3,-5)$ puntuetatik pasatzen den zuzenaren malda eta ekuazio esplizitua.', 'Halla la pendiente y la ecuación explícita de la recta que pasa por $A(-1,3)$ y $B(3,-5)$.', 'أوجد ميل المستقيم المار بـ $A(-1,3)$ و$B(3,-5)$ ومعادلته الصريحة.', 'Find the slope and the explicit equation of the straight line through $A(-1,3)$ and $B(3,-5)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Malda: ordenatuen kendura zati abzisen kendura.', 'Pendiente: diferencia de ordenadas entre diferencia de abscisas.', 'الميل: فرق الصادات على فرق السينات.', 'Slope: difference of the y-coordinates divided by the difference of the x-coordinates.'), math: same('$m=\\frac{-5-3}{3-(-1)}=\\frac{-8}{4}=-2$') },
            { text: say('Puntu-malda, A-tik.', 'Punto-pendiente, desde A.', 'النقطة والميل من A.', 'Point-slope, from A.'), math: same('$y-3=-2\\,(x+1)$') },
            { text: say('Esplizitua.', 'Explícita.', 'الصريحة.', 'Explicit form.'), math: same('$y=-2x+1$') }
        ],
        example: same('$m=\\frac{y_2-y_1}{x_2-x_1}$'),
        takeaway: say('Malda: igoera zati aurrerapena. m > 0 gorakorra, m < 0 beherakorra, m = 0 horizontala.', 'Pendiente: lo que sube entre lo que avanza. m > 0 creciente, m < 0 decreciente, m = 0 horizontal.', 'الميل: الصعود على التقدّم. m > 0 متزايد، m < 0 متناقص، m = 0 أفقي.', 'Slope: how much it goes up or down, divided by how far it goes across. m > 0 increasing, m < 0 decreasing, m = 0 horizontal.'),
        figure: (language) => <SlopeFigure language={language} />
    },
    {
        id: 'parallel-perpendicular',
        stage: 'positions',
        title: say('Zuzen paraleloak eta perpendikularrak', 'Rectas paralelas y perpendiculares', 'المستقيمات المتوازية والمتعامدة', 'Parallel and perpendicular straight lines'),
        goal: say('Puntu batetik zuzen baten paraleloa eta perpendikularra kalkulatzea.', 'Hallar la recta paralela y la perpendicular a otra por un punto.', 'إيجاد المستقيم الموازي والمستقيم العمودي على مستقيم آخر مرورًا بنقطة.', 'Find the parallel and the perpendicular straight line to another through a point.'),
        explanation: say(
            'Bi zuzen ez-bertikal paraleloak dira malda bera badute, $m\'=m$, eta perpendikularrak haien malden biderkadura −1 bada: $m\\cdot m\'=-1$, hau da, $m\'=-\\frac{1}{m}$. Arrazoia: $(1,m)$ eta $(-m,1)$ norabide-bektoreak perpendikularrak dira. Ekuazio orokorrean, $Ax+By+C=0$ zuzenaren paraleloek A eta B berak dituzte ($Ax+By+C\'=0$), eta perpendikularrek A eta B trukatuta eta zeinu bat aldatuta ($Bx-Ay+C\'=0$). P puntutik zuzen baten paraleloa edo perpendikularra marrazteko, kalkulatu dagokion malda eta erabili puntu-malda ekuazioa.',
            'Dos rectas no verticales son paralelas si tienen la misma pendiente, $m\'=m$, y perpendiculares si el producto de sus pendientes es −1: $m\\cdot m\'=-1$, es decir, $m\'=-\\frac{1}{m}$. La razón: los vectores directores $(1,m)$ y $(-m,1)$ son perpendiculares. En forma general, las paralelas a $Ax+By+C=0$ tienen los mismos A y B ($Ax+By+C\'=0$), y las perpendiculares, A y B intercambiados con un signo cambiado ($Bx-Ay+C\'=0$). Para trazar por un punto P la paralela o la perpendicular a una recta, calcula la pendiente que corresponde y usa la ecuación punto-pendiente.',
            'يكون المستقيمان غير الرأسيين متوازيين إذا كان لهما الميل نفسه $m\'=m$، ومتعامدين إذا كان جداء ميليهما −1: $m\\cdot m\'=-1$، أي $m\'=-\\frac{1}{m}$. والسبب أن متجهي التوجيه $(1,m)$ و$(-m,1)$ متعامدان. وفي الصورة العامة، الموازيات لـ $Ax+By+C=0$ لها A وB نفساهما ($Ax+By+C\'=0$)، والعموديات لها A وB متبادلين مع تغيير إشارة ($Bx-Ay+C\'=0$). ولرسم الموازي أو العمودي على مستقيم مرورًا بنقطة P احسب الميل المناسب واستعمل معادلة النقطة والميل.', 'Two straight lines that are not vertical are parallel if they have the same slope, $m\'=m$, and perpendicular if the product of their slopes is −1: $m\\cdot m\'=-1$, that is, $m\'=-\\frac{1}{m}$. The reason: the direction vectors $(1,m)$ and $(-m,1)$ are perpendicular. In general form, parallel straight lines to $Ax+By+C=0$ have the same A and B ($Ax+By+C\'=0$), and perpendicular ones have A and B swapped with one sign changed ($Bx-Ay+C\'=0$). To draw, through a point P, the parallel or the perpendicular to a straight line, calculate the corresponding slope and use the point-slope equation.'
        ),
        problem: say('$P(2,1)$ puntutik, kalkulatu $y=3x-4$ zuzenaren paraleloa eta perpendikularra.', 'Por $P(2,1)$, halla la paralela y la perpendicular a $y=3x-4$.', 'مرورًا بـ $P(2,1)$ أوجد الموازي والعمودي على $y=3x-4$.', 'Through $P(2,1)$, find the parallel and the perpendicular to $y=3x-4$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Paraleloa: m = 3.', 'Paralela: m = 3.', 'الموازي: m = 3.', 'Parallel: m = 3.'), math: same('$y-1=3\\,(x-2)\\ \\to\\ y=3x-5$') },
            { text: say('Perpendikularra: m′ = −1/3.', 'Perpendicular: m′ = −1/3.', 'العمودي: m′ = −1/3.', 'Perpendicular: m′ = −1/3.'), math: same('$y-1=-\\frac{1}{3}\\,(x-2)$') },
            { text: say('Esplizitua.', 'Explícita.', 'الصريحة.', 'Explicit form.'), math: same('$y=-\\frac{1}{3}x+\\frac{5}{3}$') }
        ],
        example: same('$m\\cdot m\'=-1$'),
        takeaway: say('Paraleloak: malda bera. Perpendikularrak: m · m′ = −1, alderantzizkoa eta zeinua aldatuta.', 'Paralelas: la misma pendiente. Perpendiculares: m · m′ = −1, la inversa cambiada de signo.', 'متوازيان: الميل نفسه. متعامدان: m · m′ = −1، المقلوب مع تغيير الإشارة.', 'Parallel: the same slope. Perpendicular: m · m′ = −1, the negative reciprocal.'),
        figure: (language) => <ParallelLinesFigure language={language} />
    },
    {
        id: 'relative-position',
        stage: 'positions',
        title: say('Bi zuzenen posizio erlatiboa', 'Posición relativa de dos rectas', 'الوضع النسبي لمستقيمين', 'Relative position of two straight lines'),
        goal: say('Bi zuzen ebakitzaileak, paraleloak edo bat datozenak diren erabakitzea eta ebaki-puntua kalkulatzea.', 'Decidir si dos rectas son secantes, paralelas o coincidentes y hallar el punto de corte.', 'تحديد ما إذا كان مستقيمان متقاطعين أو متوازيين أو منطبقين وإيجاد نقطة التقاطع.', 'Decide whether two straight lines are intersecting, parallel or coincident, and find the intersection point.'),
        explanation: say(
            'Planoko bi zuzen ebakitzaileak (puntu batean ebakitzen dira), paraleloak (ez dute puntu komunik) edo bat datozenak (zuzen bera dira) izan daitezke. Ekuazio esplizituekin: malda desberdinak, ebakitzaileak; malda bera eta ordenatu desberdina, paraleloak; dena berdina, bat datozenak. $Ax+By+C=0$ eta $A\'x+B\'y+C\'=0$ ekuazio orokorrekin zatidurak alderatzen dira: $\\frac{A}{A\'}\\neq\\frac{B}{B\'}$ bada, ebakitzaileak; $\\frac{A}{A\'}=\\frac{B}{B\'}\\neq\\frac{C}{C\'}$ bada, paraleloak; hiru zatidurak berdinak badira, bat datozenak. Bi ebakitzaileen ebaki-puntua haien ekuazioek osatzen duten sistemaren ebazpena da.',
            'Dos rectas del plano pueden ser secantes (se cortan en un punto), paralelas (no tienen ningún punto común) o coincidentes (son la misma recta). Con las ecuaciones explícitas: pendientes distintas, secantes; misma pendiente y distinta ordenada, paralelas; todo igual, coincidentes. Con las generales $Ax+By+C=0$ y $A\'x+B\'y+C\'=0$ se comparan los cocientes: si $\\frac{A}{A\'}\\neq\\frac{B}{B\'}$, secantes; si $\\frac{A}{A\'}=\\frac{B}{B\'}\\neq\\frac{C}{C\'}$, paralelas; si los tres cocientes son iguales, coincidentes. El punto de corte de dos secantes es la solución del sistema que forman sus ecuaciones.',
            'يمكن أن يكون مستقيمان في المستوى متقاطعين (يتقاطعان في نقطة) أو متوازيين (لا نقطة مشتركة بينهما) أو منطبقين (هما المستقيم نفسه). بالمعادلتين الصريحتين: ميلان مختلفان، متقاطعان؛ الميل نفسه والمقطع مختلف، متوازيان؛ كل شيء متساوٍ، منطبقان. وبالمعادلتين العامتين $Ax+By+C=0$ و$A\'x+B\'y+C\'=0$ نقارن النسب: إذا كان $\\frac{A}{A\'}\\neq\\frac{B}{B\'}$ فمتقاطعان؛ وإذا كان $\\frac{A}{A\'}=\\frac{B}{B\'}\\neq\\frac{C}{C\'}$ فمتوازيان؛ وإذا تساوت النسب الثلاث فمنطبقان. ونقطة تقاطع المتقاطعين هي حل النظام الذي تكوّنه معادلتاهما.', 'Two straight lines in the plane can be intersecting (they cross at one point), parallel (they have no point in common) or coincident (they are the same straight line). With the explicit equations: different slopes, intersecting; same slope and different y-intercept, parallel; everything the same, coincident. With the general equations $Ax+By+C=0$ and $A\'x+B\'y+C\'=0$, the ratios are compared: if $\\frac{A}{A\'}\\neq\\frac{B}{B\'}$, intersecting; if $\\frac{A}{A\'}=\\frac{B}{B\'}\\neq\\frac{C}{C\'}$, parallel; if the three ratios are equal, coincident. The intersection point of two intersecting straight lines is the solution of the system formed by their equations.'
        ),
        problem: say('Aztertu $r\\colon x+2y=5$ eta $s\\colon 3x-y=1$ zuzenen posizioa eta kalkulatu ebaki-puntua.', 'Estudia la posición de $r\\colon x+2y=5$ y $s\\colon 3x-y=1$ y halla el punto de corte.', 'ادرس وضع المستقيمين $r\\colon x+2y=5$ و$s\\colon 3x-y=1$ وأوجد نقطة تقاطعهما.', 'Study the relative position of $r\\colon x+2y=5$ and $s\\colon 3x-y=1$, and find their intersection point.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatidurak desberdinak: ebakitzaileak.', 'Cocientes distintos: secantes.', 'نسبتان مختلفتان: متقاطعان.', 'Different ratios: intersecting.'), math: same('$\\frac{1}{3}\\neq\\frac{2}{-1}$') },
            { text: say('s-tik, y askatu.', 'De s, despeja y.', 'من s اعزل y.', 'From s, solve for y.'), math: same('$y=3x-1$') },
            { text: say('Ordeztu r-n.', 'Sustituye en r.', 'عوّض في r.', 'Substitute into r.'), math: same('$x+2\\,(3x-1)=5\\ \\to\\ 7x=7$') },
            { text: say('Ebaki-puntua (1, 2).', 'El punto de corte es (1, 2).', 'نقطة التقاطع (1, 2).', 'The intersection point is (1, 2).'), math: same('$x=1,\\quad y=3\\cdot 1-1=2$') }
        ],
        example: same('$\\frac{A}{A\'}\\neq\\frac{B}{B\'}$'),
        takeaway: say('Malda desberdinak: ebakitzaileak. Malda bera: paraleloak edo bat datozenak. Ebaki-puntua: sistema.', 'Pendientes distintas: secantes. Misma pendiente: paralelas o coincidentes. Punto de corte: el sistema.', 'ميلان مختلفان: متقاطعان. الميل نفسه: متوازيان أو منطبقان. نقطة التقاطع: النظام.', 'Different slopes: intersecting. Same slope: parallel or coincident. Intersection point: the system.'),
        figure: (language) => <PositionsFigure language={language} />
    },

    /* ---------- 5. Applications ---------- */
    {
        id: 'bisector',
        stage: 'applications',
        title: say('Zuzenki baten erdibitzailea', 'Mediatriz de un segmento', 'محور القطعة', 'Perpendicular bisector of a segment'),
        goal: say('Zuzenki baten erdibitzailearen ekuazioa kalkulatzea eta haren propietatea erabiltzea.', 'Hallar la ecuación de la mediatriz de un segmento y usar su propiedad.', 'إيجاد معادلة محور قطعة واستعمال خاصيته.', 'Find the equation of the perpendicular bisector of a segment and use its property.'),
        explanation: say(
            'AB zuzenkiaren erdibitzailea AB-ren perpendikularra den eta haren erdiko puntutik pasatzen den zuzena da. Haren puntu guztiak A-tik eta B-tik distantzia berera daude. Kalkulatzeko: M erdiko puntua, $\\overrightarrow{AB}=(a,b)$ bektorea eta, norabide gisa, haren perpendikular bat, $(-b,a)$; edo bestela malda, $m\'=-\\frac{1}{m}$. Distantziak berdinduz ere lortzen da: $d(X,A)=d(X,B)$. Triangelu baten hiru erdibitzaileak zirkunzentroan ebakitzen dira, hiru erpinetatik pasatzen den zirkunferentziaren zentroan.',
            'La mediatriz de un segmento AB es la recta perpendicular a AB que pasa por su punto medio. Todos sus puntos están a la misma distancia de A y de B. Para hallarla: el punto medio M, el vector $\\overrightarrow{AB}=(a,b)$ y, como dirección, un vector perpendicular, $(-b,a)$; o bien la pendiente $m\'=-\\frac{1}{m}$. También se obtiene igualando distancias: $d(X,A)=d(X,B)$. Las tres mediatrices de un triángulo se cortan en el circuncentro, centro de la circunferencia que pasa por los tres vértices.',
            'محور القطعة AB هو المستقيم العمودي على AB المار بمنتصفها. وكل نقاطه على المسافة نفسها من A ومن B. ولإيجاده: المنتصف M، والمتجه $\\overrightarrow{AB}=(a,b)$، ومتجه عمودي عليه $(-b,a)$ اتجاهًا؛ أو الميل $m\'=-\\frac{1}{m}$. ويمكن الحصول عليه أيضًا بمساواة المسافتين: $d(X,A)=d(X,B)$. والمحاور الثلاثة لمثلث تتقاطع في مركز الدائرة المحيطة، أي مركز الدائرة المارة برؤوسه الثلاثة.', 'The perpendicular bisector of a segment AB is the straight line perpendicular to AB that passes through its midpoint. All its points are the same distance from A and from B. To find it, use: the midpoint M, the vector $\\overrightarrow{AB}=(a,b)$ and, as a direction, a perpendicular vector, $(-b,a)$; or else the slope $m\'=-\\frac{1}{m}$. It can also be obtained by equating distances: $d(X,A)=d(X,B)$. The three perpendicular bisectors of a triangle meet at the circumcentre, the centre of the circumference that passes through the three vertices.'
        ),
        problem: say('Kalkulatu $A(1,1)$ eta $B(5,3)$ muturreko zuzenkiaren erdibitzailea.', 'Halla la mediatriz del segmento de extremos $A(1,1)$ y $B(5,3)$.', 'أوجد محور القطعة التي طرفاها $A(1,1)$ و$B(5,3)$.', 'Find the perpendicular bisector of the segment with endpoints $A(1,1)$ and $B(5,3)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erdiko puntua.', 'El punto medio.', 'المنتصف.', 'The midpoint.'), math: same('$M=\\left(\\frac{1+5}{2},\\frac{1+3}{2}\\right)=(3,2)$') },
            { text: say('AB-ren malda.', 'La pendiente de AB.', 'ميل AB.', 'The slope of AB.'), math: same('$m=\\frac{3-1}{5-1}=\\frac{1}{2}$') },
            { text: say('Perpendikularra: m′ = −2.', 'Perpendicular: m′ = −2.', 'العمودي: m′ = −2.', 'Perpendicular: m′ = −2.'), math: same('$y-2=-2\\,(x-3)\\ \\to\\ y=-2x+8$') }
        ],
        example: same('$d(X,A)=d(X,B)$'),
        takeaway: say('Erdibitzailea: erdiko puntutik, AB-ren perpendikularra. Haren puntuak A-tik eta B-tik distantzia berera.', 'Mediatriz: por el punto medio, perpendicular a AB. Sus puntos equidistan de A y de B.', 'المحور: يمر بالمنتصف عموديًا على AB. ونقاطه على بعدين متساويين من A وB.', 'Perpendicular bisector: through the midpoint, perpendicular to AB. Its points are equidistant from A and B.'),
        figure: (language) => <BisectorFigure language={language} />
    },
    {
        id: 'circle',
        stage: 'applications',
        title: say('Zirkunferentziaren ekuazioa', 'Ecuación de la circunferencia', 'معادلة الدائرة', 'Equation of the circumference'),
        goal: say('Zirkunferentzia baten ekuazioa idaztea eta puntu bat barruan, gainean edo kanpoan dagoen erabakitzea.', 'Escribir la ecuación de una circunferencia y decidir si un punto está dentro, sobre ella o fuera.', 'كتابة معادلة دائرة وتحديد موقع نقطة: داخلها أو عليها أو خارجها.', 'Write the equation of a circumference, and decide whether a point is inside it, on it or outside it.'),
        explanation: say(
            '$C(a,b)$ zentroko eta r erradioko zirkunferentzia $d(X,C)=r$ betetzen duten X puntuek osatzen dute. Karratura jasota: $(x-a)^{2}+(y-b)^{2}=r^{2}$. Zentroa jatorria bada, $x^{2}+y^{2}=r^{2}$. P puntu bat zirkunferentzian, barruan edo kanpoan dagoen jakiteko, $d(P,C)$ eta r alderatzen dira. Zentroa eta zirkunferentziaren puntu bat ezagututa, erradioa haien arteko distantzia da; diametro baten muturrak ezagututa, zentroa haien erdiko puntua da.',
            'La circunferencia de centro $C(a,b)$ y radio r está formada por los puntos X que cumplen $d(X,C)=r$. Elevando al cuadrado: $(x-a)^{2}+(y-b)^{2}=r^{2}$. Si el centro es el origen, $x^{2}+y^{2}=r^{2}$. Para saber si un punto P está en la circunferencia, dentro o fuera, se compara $d(P,C)$ con r. Si se conocen el centro y un punto de la circunferencia, el radio es la distancia entre ellos; si se conocen los extremos de un diámetro, el centro es su punto medio.',
            'تتكوّن الدائرة التي مركزها $C(a,b)$ ونصف قطرها r من النقاط X التي تحقق $d(X,C)=r$. وبالتربيع: $(x-a)^{2}+(y-b)^{2}=r^{2}$. وإذا كان المركز هو الأصل: $x^{2}+y^{2}=r^{2}$. ولمعرفة موقع نقطة P، على الدائرة أو داخلها أو خارجها، نقارن $d(P,C)$ بـ r. وإذا عُرف المركز ونقطة من الدائرة فنصف القطر هو المسافة بينهما؛ وإذا عُرف طرفا قطر فالمركز منتصفهما.', 'The circumference with centre $C(a,b)$ and radius r is made up of the points X that satisfy $d(X,C)=r$. Squaring both sides: $(x-a)^{2}+(y-b)^{2}=r^{2}$. If the centre is the origin, $x^{2}+y^{2}=r^{2}$. To find out whether a point P is on the circumference, inside it or outside it, compare $d(P,C)$ with r. If the centre and a point on the circumference are known, the radius is the distance between them; if the endpoints of a diameter are known, the centre is their midpoint.'
        ),
        problem: say('Idatzi $C(2,-1)$ zentroa duen eta $P(5,3)$ puntutik pasatzen den zirkunferentziaren ekuazioa.', 'Escribe la ecuación de la circunferencia de centro $C(2,-1)$ que pasa por $P(5,3)$.', 'اكتب معادلة الدائرة التي مركزها $C(2,-1)$ وتمر بـ $P(5,3)$.', 'Write the equation of the circumference with centre $C(2,-1)$ that passes through $P(5,3)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erradioa: zentrotik P-ra.', 'El radio: del centro a P.', 'نصف القطر: من المركز إلى P.', 'The radius: from the centre to P.'), math: same('$r=\\sqrt{(5-2)^{2}+(3+1)^{2}}=5$') },
            { text: say('Ekuazioa.', 'La ecuación.', 'المعادلة.', 'The equation.'), math: same('$(x-2)^{2}+(y+1)^{2}=25$') }
        ],
        example: same('$(x-a)^{2}+(y-b)^{2}=r^{2}$'),
        takeaway: say('Zentroa eta erradioa: (x − a)² + (y − b)² = r². Puntu bat: alderatu zentrorako distantzia eta r.', 'Centro y radio: (x − a)² + (y − b)² = r². Un punto: compara su distancia al centro con r.', 'المركز ونصف القطر: (x − a)² + (y − b)² = r². نقطة: قارن بعدها عن المركز بـ r.', 'Centre and radius: (x − a)² + (y − b)² = r². A point: compare its distance from the centre with r.'),
        figure: (language) => <CircleFigure language={language} />
    },
    {
        id: 'polygons',
        stage: 'applications',
        title: say('Poligonoak koordenatuekin', 'Polígonos con coordenadas', 'المضلعات بالإحداثيات', 'Polygons with coordinates'),
        goal: say('Paralelogramo eta triangeluekin problemak ebaztea bektoreak, distantziak eta maldak erabiliz.', 'Resolver problemas de paralelogramos y triángulos con vectores, distancias y pendientes.', 'حل مسائل متوازيات الأضلاع والمثلثات بالمتجهات والمسافات والميول.', 'Solve problems about parallelograms and triangles using vectors, distances and slopes.'),
        explanation: say(
            'Koordenatuekin irudien problemak ebazten dira: aldeak distantziekin neurtzen dira, paralelotasunak eta perpendikulartasunak bektoreekin edo maldekin egiaztatzen dira, eta puntu nabarmenak erdiko puntuetatik eta zuzenen ebakiduretatik ateratzen dira. ABCD paralelogramo batean $\\overrightarrow{AB}=\\overrightarrow{DC}$; hortik, laugarren erpina $D=A+C-B$ da, eta diagonalak elkar erdibitzen dira. Triangelu bat B-n angeluzuzena da $\\overrightarrow{BA}$ eta $\\overrightarrow{BC}$ perpendikularrak badira. Alde bat ardatz batean (edo haren paraleloan) duen triangeluaren azalera oinarria bider altuera zati bi da, altuera koordenatuetan irakurrita.',
            'Con coordenadas se resuelven problemas de figuras: los lados se miden con distancias, los paralelismos y las perpendicularidades se comprueban con vectores o pendientes, y los puntos notables salen de puntos medios e intersecciones de rectas. En un paralelogramo ABCD se cumple $\\overrightarrow{AB}=\\overrightarrow{DC}$; de ahí, el cuarto vértice es $D=A+C-B$, y las diagonales se cortan en su punto medio. Un triángulo es rectángulo en B si $\\overrightarrow{BA}$ y $\\overrightarrow{BC}$ son perpendiculares. El área de un triángulo con un lado sobre un eje (o paralelo a él) es base por altura entre dos, leyendo la altura en las coordenadas.',
            'بالإحداثيات تُحل مسائل الأشكال: تُقاس الأضلاع بالمسافات، ويُتحقق من التوازي والتعامد بالمتجهات أو الميول، وتُستخرج النقاط المميزة من المنتصفات وتقاطعات المستقيمات. في متوازي الأضلاع ABCD يتحقق $\\overrightarrow{AB}=\\overrightarrow{DC}$؛ ومن ذلك فالرأس الرابع هو $D=A+C-B$، والقطران ينصّف كلٌّ منهما الآخر. ويكون المثلث قائمًا في B إذا كان $\\overrightarrow{BA}$ و$\\overrightarrow{BC}$ متعامدين. ومساحة مثلث أحد أضلاعه على محور (أو موازٍ له) هي القاعدة في الارتفاع على اثنين، مع قراءة الارتفاع من الإحداثيات.', 'With coordinates, problems about shapes can be solved: the sides are measured using distances, whether lines are parallel or perpendicular is checked with vectors or slopes, and the special points come from midpoints and intersections of straight lines. In a parallelogram ABCD, $\\overrightarrow{AB}=\\overrightarrow{DC}$; from this, the fourth vertex is $D=A+C-B$, and the diagonals cross at their midpoint. A triangle is right-angled at B if $\\overrightarrow{BA}$ and $\\overrightarrow{BC}$ are perpendicular. The area of a triangle with one side on an axis (or parallel to it) is base times height divided by two, reading the height from the coordinates.'
        ),
        problem: say('$A(1,1)$, $B(5,2)$ eta $C(6,6)$ ABCD paralelogramoaren hiru erpin jarraitu dira. Kalkulatu D eta egiaztatu AC eta BD diagonalek erdiko puntu bera dutela.', '$A(1,1)$, $B(5,2)$ y $C(6,6)$ son tres vértices consecutivos del paralelogramo ABCD. Halla D y comprueba que las diagonales AC y BD tienen el mismo punto medio.', '$A(1,1)$ و$B(5,2)$ و$C(6,6)$ ثلاثة رؤوس متتالية لمتوازي الأضلاع ABCD. أوجد D وتحقق من أن للقطرين AC وBD المنتصف نفسه.', '$A(1,1)$, $B(5,2)$ and $C(6,6)$ are three consecutive vertices of the parallelogram ABCD. Find D and check that the diagonals AC and BD have the same midpoint.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Laugarren erpina.', 'El cuarto vértice.', 'الرأس الرابع.', 'The fourth vertex.'), math: same('$D=(1+6-5,1+6-2)=(2,5)$') },
            { text: say('AC-ren erdiko puntua.', 'Punto medio de AC.', 'منتصف AC.', 'Midpoint of AC.'), math: same('$\\left(\\frac{1+6}{2},\\frac{1+6}{2}\\right)=(3{,}5,3{,}5)$') },
            { text: say('BD-rena, berdina.', 'El de BD, el mismo.', 'منتصف BD هو نفسه.', 'That of BD, the same.'), math: same('$\\left(\\frac{5+2}{2},\\frac{2+5}{2}\\right)=(3{,}5,3{,}5)$') }
        ],
        example: same('$D=A+C-B$'),
        takeaway: say('Paralelogramoa: D = A + C − B, diagonalak erdibituta. Angelu zuzena: bektore perpendikularrak.', 'Paralelogramo: D = A + C − B, diagonales que se cortan en su punto medio. Ángulo recto: vectores perpendiculares.', 'متوازي الأضلاع: D = A + C − B، والقطران متناصفان. الزاوية القائمة: متجهان متعامدان.', 'Parallelogram: D = A + C − B, diagonals that cross at their midpoint. Right angle: perpendicular vectors.'),
        figure: (language) => <ParallelogramFigure language={language} />
    }
]
