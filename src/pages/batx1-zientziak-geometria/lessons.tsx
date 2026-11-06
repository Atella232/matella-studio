import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { CollinearFigure, MidpointFigure, ParallelLinesFigure, ParametricFigure, PositionsFigure } from '../dbh4-akademikoak-bektoreak/figures'
import { DivideFigure, InclinationFigure, LineAngleFigure, NormalFigure, ParallelDistanceFigure, PencilFigure, PointLineFigure, ReflectionFigure, TriangleAreaFigure, TrianglePointsFigure } from './figures'
import { bachGeometryLessonChecks, type BachGeometryTopicId } from './lessonChecks'
import { bachGeometryLessonTexts } from './lessonTexts'

/* ==========================================================================
   Geometria analitikoa · Batxilergoa 1 · Zientziak — stages and lessons.
   The scope follows unit 8 of Anaya Matemáticas I and the line half of
   unit 6 of Santillana 1.º Bachillerato Ciencias (the vectors were the
   topic before, vectores; loci and conics come next). What 4. DBH
   académicas already taught (points, the equations of a line, slopes,
   parallels and relative positions) comes back as a short review with
   «Review first» links; dividing a segment, the normal vector, pencils of
   lines, the angle of two lines, distances to a line, reflections in a
   line and the notable points and area of a triangle are new.
   ========================================================================== */

export type BachGeometryStageId = 'points' | 'lines' | 'positions' | 'distances' | 'triangles'

export const bachGeometryStages: UnitStage[] = [
    { id: 'points', tone: 'blue', title: { eu: 'Puntuak', es: 'Puntos', en: 'Points', ar: 'النقاط' } },
    { id: 'lines', tone: 'violet', title: { eu: 'Zuzenaren ekuazioak', es: 'Ecuaciones de la recta', en: 'Equations of a line', ar: 'معادلات المستقيم' } },
    { id: 'positions', tone: 'mustard', title: { eu: 'Posizioak eta angeluak', es: 'Posiciones y ángulos', en: 'Positions and angles', ar: 'الأوضاع والزوايا' } },
    { id: 'distances', tone: 'coral', title: { eu: 'Distantziak', es: 'Distancias', en: 'Distances', ar: 'المسافات' } },
    { id: 'triangles', tone: 'green', title: { eu: 'Triangeluak', es: 'Triángulos', en: 'Triangles', ar: 'المثلثات' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

const VECTORS_4 = 'dbh4-akademikoak/vectores-rectas'
const MIDPOINT = { unit: VECTORS_4, topic: 'midpoint', title: { eu: 'Erdiko puntua eta puntu simetrikoa', es: 'Punto medio y punto simétrico', en: 'Midpoint and symmetric point', ar: 'منتصف القطعة والنقطة المتناظرة' } }

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Points ---------- */
    {
        id: 'midpoint-symmetric',
        stage: 'points',
        title: say('Erdiko puntua eta puntu simetrikoa', 'Punto medio y punto simétrico', 'المنتصف والنقطة النظيرة', 'Midpoint and symmetric point'),
        goal: say('Zuzenki baten erdiko puntua eta puntu baten simetrikoa beste batekiko kalkulatzea.', 'Calcular el punto medio de un segmento y el simétrico de un punto respecto de otro.', 'حساب منتصف قطعة ونظير نقطة بالنسبة إلى نقطة أخرى.', 'Work out the midpoint of a segment and the symmetric point of a point about another one.'),
        needs: [MIDPOINT],
        problem: say('$A(-3,2)$ eta $B(5,-4)$ badira, aurkitu $AB$ zuzenkiaren $M$ erdiko puntua eta $A$ puntuaren simetrikoa $B$ puntuarekiko.', 'Dados $A(-3,2)$ y $B(5,-4)$, halla el punto medio $M$ de $AB$ y el simétrico de $A$ respecto de $B$.', 'إذا كانت $A(-3,2)$ و$B(5,-4)$، فأوجد منتصف $AB$ أي $M$، ونظير $A$ بالنسبة إلى $B$.', 'Given $A(-3,2)$ and $B(5,-4)$, find the midpoint $M$ of $AB$ and the symmetric point of $A$ about $B$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erdiko puntua: muturren batez bestekoa.', 'Punto medio: la media de los extremos.', 'المنتصف: متوسط الطرفين.', 'Midpoint: the mean of the end points.'), math: same('$M=\\left(\\frac{-3+5}{2},\\frac{2-4}{2}\\right)=(1,-1)$') },
            { text: say('$B$ puntua $AA\'$ zuzenkiaren erdiko puntua da.', '$B$ es el punto medio de $AA\'$.', '$B$ منتصف $AA\'$.', '$B$ is the midpoint of $AA\'$.'), math: same('$A\'=2B-A$') },
            { text: say('Koordenatuz koordenatu.', 'Coordenada a coordenada.', 'مركّبةً مركّبة.', 'Coordinate by coordinate.'), math: same('$\\begin{gathered}A\'=(2\\cdot 5-(-3),2\\cdot(-4)-2)\\\\ =(13,-10)\\end{gathered}$') }
        ],
        takeaway: say('$AB$ zuzenkiaren erdiko puntua muturren batez bestekoa da. $A$ puntuaren simetrikoa $P$ puntuarekiko $A\'=2P-A$ da, $P$ puntua $AA\'$ zuzenkiaren erdiko puntua delako.', 'El punto medio de $AB$ es la media de los extremos. El simétrico de $A$ respecto de $P$ es $A\'=2P-A$, porque $P$ es el punto medio de $AA\'$.', 'منتصف $AB$ متوسط الطرفين. ونظير $A$ بالنسبة إلى $P$ هو $A\'=2P-A$ لأن $P$ منتصف $AA\'$.', 'The midpoint of $AB$ is the mean of the end points. The symmetric point of $A$ about $P$ is $A\'=2P-A$, because $P$ is the midpoint of $AA\'$.'),
        figure: (language) => <MidpointFigure language={language} />
    },
    {
        id: 'collinear',
        stage: 'points',
        title: say('Lerrokatutako puntuak', 'Puntos alineados', 'النقاط على استقامة واحدة', 'Collinear points'),
        goal: say('Hiru puntu zuzen berean dauden jakitea, haiek lotzen dituzten bektoreak konparatuz.', 'Saber si tres puntos están en la misma recta comparando los vectores que los unen.', 'معرفة هل ثلاث نقاط على مستقيم واحد بمقارنة المتجهات التي تصلها.', 'Find out whether three points lie on the same line by comparing the vectors joining them.'),
        needs: [{ unit: VECTORS_4, topic: 'collinear', title: { eu: 'Lerrokatutako puntuak', es: 'Puntos alineados', en: 'Collinear points', ar: 'النقاط المستقيمة' } }],
        problem: say('$A(1,2)$, $B(3,5)$ eta $C(7,11)$ lerrokatuta dauden egiaztatu.', 'Comprueba si $A(1,2)$, $B(3,5)$ y $C(7,11)$ están alineados.', 'تحقق هل $A(1,2)$ و$B(3,5)$ و$C(7,11)$ على استقامة واحدة.', 'Check whether $A(1,2)$, $B(3,5)$ and $C(7,11)$ are collinear.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bi bektore $A$ puntutik.', 'Dos vectores desde $A$.', 'متجهان من $A$.', 'Two vectors from $A$.'), math: same('$\\overrightarrow{AB}=(2,3)\\qquad\\overrightarrow{AC}=(6,9)$') },
            { text: say('Konparatu koordenatuak.', 'Compara las coordenadas.', 'قارن المركّبات.', 'Compare the coordinates.'), math: same('$\\frac{6}{2}=\\frac{9}{3}=3$') },
            { text: say('Proportzionalak: lerrokatuta daude.', 'Proporcionales: están alineados.', 'متناسبة: على استقامة واحدة.', 'Proportional: they are collinear.'), math: same('$\\overrightarrow{AC}=3\\,\\overrightarrow{AB}$') }
        ],
        takeaway: say('$A$, $B$ eta $C$ lerrokatuta daude $\\overrightarrow{AB}$ eta $\\overrightarrow{AC}$ paraleloak badira: haien koordenatuak proportzionalak dira.', '$A$, $B$ y $C$ están alineados si $\\overrightarrow{AB}$ y $\\overrightarrow{AC}$ son paralelos: sus coordenadas son proporcionales.', '$A$ و$B$ و$C$ على استقامة واحدة إذا كان $\\overrightarrow{AB}$ و$\\overrightarrow{AC}$ متوازيين: مركّباتهما متناسبة.', '$A$, $B$ and $C$ are collinear if $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$ are parallel: their coordinates are proportional.'),
        figure: (language) => <CollinearFigure language={language} />
    },
    {
        id: 'divide-segment',
        stage: 'points',
        title: say('Zuzenki bat zati berditan banatzea', 'Dividir un segmento en partes iguales', 'تقسيم قطعة إلى أجزاء متساوية', 'Dividing a segment into equal parts'),
        goal: say('Zuzenki baten puntuak aurkitzea, $P=A+t\\,\\overrightarrow{AB}$ erabiliz: zati berdinak eta edozein zatiki.', 'Hallar puntos de un segmento con $P=A+t\\,\\overrightarrow{AB}$: partes iguales y cualquier fracción del camino.', 'إيجاد نقاط على قطعة بالعلاقة $P=A+t\\,\\overrightarrow{AB}$: أجزاء متساوية وأي كسر من الطريق.', 'Find points of a segment with $P=A+t\\,\\overrightarrow{AB}$: equal parts and any fraction of the way.'),
        needs: [{ unit: 'batx1-zientziak/vectores', topic: 'vector-operations', title: { eu: 'Batuketa, kenketa eta zenbaki bider bektorea', es: 'Suma, resta y producto por un número', en: 'Adding, subtracting and multiplying by a number', ar: 'الجمع والطرح والضرب في عدد' } }],
        problem: say('Banatu $A(-1,5)$ eta $B(8,-1)$ muturrak dituen zuzenkia hiru zati berditan.', 'Divide el segmento de extremos $A(-1,5)$ y $B(8,-1)$ en tres partes iguales.', 'قسّم القطعة التي طرفاها $A(-1,5)$ و$B(8,-1)$ إلى ثلاثة أجزاء متساوية.', 'Divide the segment with end points $A(-1,5)$ and $B(8,-1)$ into three equal parts.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bektorea eta haren herena.', 'El vector y su tercio.', 'المتجه وثلثه.', 'The vector and a third of it.'), math: same('$\\overrightarrow{AB}=(9,-6)\\qquad\\frac{1}{3}\\overrightarrow{AB}=(3,-2)$') },
            { text: say('Lehen puntua: $A$ gehi heren bat.', 'Primer punto: $A$ más un tercio.', 'النقطة الأولى: $A$ زائد ثلث.', 'First point: $A$ plus a third.'), math: same('$P_1=(-1+3,5-2)=(2,3)$') },
            { text: say('Bigarrena: beste heren bat.', 'Segundo: otro tercio más.', 'الثانية: ثلث آخر.', 'Second: one more third.'), math: same('$P_2=(2+3,3-2)=(5,1)$') }
        ],
        takeaway: say('$A$ puntutik $B$ punturako bidearen $t$ zatian dagoen puntua $P=A+t\\,\\overrightarrow{AB}$ da. $t=\\frac{1}{2}$ denean erdiko puntua ateratzen da.', 'El punto que está a una fracción $t$ del camino de $A$ a $B$ es $P=A+t\\,\\overrightarrow{AB}$. Con $t=\\frac{1}{2}$ sale el punto medio.', 'النقطة الواقعة على كسر $t$ من الطريق من $A$ إلى $B$ هي $P=A+t\\,\\overrightarrow{AB}$. ومع $t=\\frac{1}{2}$ نحصل على المنتصف.', 'The point a fraction $t$ of the way from $A$ to $B$ is $P=A+t\\,\\overrightarrow{AB}$. With $t=\\frac{1}{2}$ you get the midpoint.'),
        figure: (language) => <DivideFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 2. The equations of a line ---------- */
    {
        id: 'vector-parametric',
        stage: 'lines',
        title: say('Ekuazio bektoriala eta parametrikoak', 'Ecuación vectorial y paramétricas', 'المعادلة المتجهية والوسيطيتان', 'Vector and parametric equations'),
        goal: say('Zuzen baten ekuazio bektoriala eta parametrikoak idaztea, eta puntu bat zuzenekoa den egiaztatzea.', 'Escribir las ecuaciones vectorial y paramétricas de una recta y comprobar si un punto es de ella.', 'كتابة المعادلة المتجهية والوسيطيتين لمستقيم، والتحقق هل نقطة عليه.', 'Write the vector and parametric equations of a line and check whether a point is on it.'),
        needs: [{ unit: VECTORS_4, topic: 'parametric', title: { eu: 'Ekuazio bektoriala eta parametrikoak', es: 'Ecuación vectorial y paramétricas', en: 'Vector equation and parametric equations', ar: 'المعادلة المتجهية والمعادلتان الوسيطيتان' } }],
        problem: say('Idatzi $A(2,-1)$ eta $B(5,3)$ puntuetatik pasatzen den zuzenaren ekuazio bektoriala eta parametrikoak, eta esan $C(11,11)$ zuzenekoa den.', 'Escribe las ecuaciones vectorial y paramétricas de la recta que pasa por $A(2,-1)$ y $B(5,3)$, y di si $C(11,11)$ es de la recta.', 'اكتب المعادلة المتجهية والوسيطيتين للمستقيم المار بـ $A(2,-1)$ و$B(5,3)$، وقل هل $C(11,11)$ عليه.', 'Write the vector and parametric equations of the line through $A(2,-1)$ and $B(5,3)$, and say whether $C(11,11)$ is on it.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Norabide-bektorea.', 'Vector director.', 'متجه التوجيه.', 'Direction vector.'), math: same('$\\vec{d}=\\overrightarrow{AB}=(3,4)$') },
            { text: say('Ekuazio bektoriala; koordenatuz koordenatu, parametrikoak.', 'Ecuación vectorial; coordenada a coordenada, las paramétricas.', 'المعادلة المتجهية؛ ومركّبةً مركّبة الوسيطيتان.', 'Vector equation; coordinate by coordinate, the parametric ones.'), math: same('$(x,y)=(2,-1)+t(3,4)$') },
            { text: say('$C$ puntuarentzat, biek $t$ bera ematen dute: zuzenekoa da.', 'Para $C$, las dos dan el mismo $t$: es de la recta.', 'لـ $C$ تعطي المعادلتان $t$ نفسه: إنها على المستقيم.', 'For $C$, both give the same $t$: it is on the line.'), math: same('$\\begin{gathered}2+3t=11\\ \\to\\ t=3\\\\ -1+4t=11\\ \\to\\ t=3\\end{gathered}$') }
        ],
        takeaway: say('$P$ puntutik $\\vec{d}$ norabidean doan zuzena $(x,y)=P+t\\,\\vec{d}$ da: $t$ balio bakoitzak puntu bat ematen du.', 'La recta que pasa por $P$ con vector director $\\vec{d}$ es $(x,y)=P+t\\,\\vec{d}$: cada valor de $t$ da un punto.', 'المستقيم المار بـ $P$ بمتجه التوجيه $\\vec{d}$ هو $(x,y)=P+t\\,\\vec{d}$: كل قيمة لـ $t$ تعطي نقطة.', 'The line through $P$ with direction vector $\\vec{d}$ is $(x,y)=P+t\\,\\vec{d}$: each value of $t$ gives a point.'),
        figure: (language) => <ParametricFigure language={language} />
    },
    {
        id: 'general-normal',
        stage: 'lines',
        title: say('Ekuazio jarraitua, orokorra eta bektore normala', 'Ecuación continua, general y vector normal', 'المعادلة المتصلة والعامة والمتجه الناظمي', 'Continuous and general equations and the normal vector'),
        goal: say('Ekuazio jarraitua eta orokorra idaztea, eta $Ax+By+C=0$ ekuazioan bektore normala eta norabide-bektorea irakurtzea.', 'Escribir las ecuaciones continua y general, y leer en $Ax+By+C=0$ el vector normal y un vector director.', 'كتابة المعادلتين المتصلة والعامة، وقراءة المتجه الناظمي ومتجه توجيه في $Ax+By+C=0$.', 'Write the continuous and general equations, and read the normal vector and a direction vector in $Ax+By+C=0$.'),
        needs: [
            { unit: VECTORS_4, topic: 'general-explicit', title: { eu: 'Ekuazio orokorra eta esplizitua', es: 'Ecuación general y explícita', en: 'General and explicit equations', ar: 'المعادلة العامة والمعادلة الصريحة' } },
            { unit: 'batx1-zientziak/vectores', topic: 'perpendicular-vectors', title: { eu: 'Bektore perpendikularrak', es: 'Vectores perpendiculares', en: 'Perpendicular vectors', ar: 'المتجهات المتعامدة' } }
        ],
        problem: say('Aurkitu $P(1,-2)$ puntutik $\\vec{d}=(3,2)$ norabidean doan zuzenaren ekuazio jarraitua eta orokorra, eta eman bektore normal bat.', 'Halla las ecuaciones continua y general de la recta que pasa por $P(1,-2)$ con vector director $\\vec{d}=(3,2)$, y da un vector normal.', 'أوجد المعادلتين المتصلة والعامة للمستقيم المار بـ $P(1,-2)$ بمتجه التوجيه $\\vec{d}=(3,2)$، وأعطِ متجهًا ناظميًا.', 'Find the continuous and general equations of the line through $P(1,-2)$ with direction vector $\\vec{d}=(3,2)$, and give a normal vector.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ekuazio jarraitua.', 'Ecuación continua.', 'المعادلة المتصلة.', 'Continuous equation.'), math: same('$\\frac{x-1}{3}=\\frac{y+2}{2}$') },
            { text: say('Gurutzean biderkatu eta dena alde batera eraman.', 'Multiplica en cruz y pasa todo a un lado.', 'اضرب تبادليًا وانقل كل شيء إلى طرف.', 'Cross-multiply and move everything to one side.'), math: same('$2x-2=3y+6\\ \\to\\ 2x-3y-8=0$') },
            { text: say('$x$ eta $y$ aldagaien koefizienteek bektore normal bat osatzen dute.', 'Los coeficientes de $x$ e $y$ forman un vector normal.', 'معاملا $x$ و$y$ يكوّنان متجهًا ناظميًا.', 'The coefficients of $x$ and $y$ form a normal vector.'), math: same('$\\vec{n}=(2,-3)\\qquad(2,-3)\\cdot(3,2)=0$') }
        ],
        takeaway: say('$Ax+By+C=0$ zuzenean, $\\vec{n}=(A,B)$ bektorea zuzenarekiko perpendikularra da, eta $\\vec{d}=(-B,A)$ norabide-bektore bat da.', 'En $Ax+By+C=0$, el vector $\\vec{n}=(A,B)$ es perpendicular a la recta, y $\\vec{d}=(-B,A)$ es un vector director.', 'في $Ax+By+C=0$ المتجه $\\vec{n}=(A,B)$ عمودي على المستقيم، و$\\vec{d}=(-B,A)$ متجه توجيه.', 'In $Ax+By+C=0$, the vector $\\vec{n}=(A,B)$ is perpendicular to the line, and $\\vec{d}=(-B,A)$ is a direction vector.'),
        figure: (language) => <NormalFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'explicit-slope',
        stage: 'lines',
        title: say('Ekuazio esplizitua, malda eta inklinazioa', 'Ecuación explícita, pendiente e inclinación', 'المعادلة الصريحة والميل وزاوية الميل', 'Explicit equation, slope and inclination'),
        goal: say('Zuzen baten malda, jatorriko ordenatua eta inklinazio-angelua aurkitzea, eta puntu-malda ekuazioa erabiltzea.', 'Hallar la pendiente, la ordenada en el origen y el ángulo de inclinación de una recta, y usar la ecuación punto-pendiente.', 'إيجاد ميل المستقيم والجزء المقطوع من محور الصادات وزاوية الميل، واستعمال معادلة النقطة والميل.', 'Find the slope, the $y$-intercept and the angle of inclination of a line, and use the point-slope equation.'),
        needs: [
            { unit: VECTORS_4, topic: 'slope', title: { eu: 'Zuzen baten malda', es: 'Pendiente de una recta', en: 'Slope of a straight line', ar: 'ميل المستقيم' } },
            { unit: 'dbh4-akademikoak/trigonometria', topic: 'right-ratios', title: { eu: 'Sinua, kosinua eta tangentea', es: 'Seno, coseno y tangente', en: 'Sine, cosine and tangent', ar: 'الجيب وجيب التمام والظل' } }
        ],
        problem: say('Aurkitu $\\sqrt{3}\\,x-y+1=0$ zuzenaren malda, jatorriko ordenatua eta inklinazio-angelua.', 'Halla la pendiente, la ordenada en el origen y el ángulo de inclinación de $\\sqrt{3}\\,x-y+1=0$.', 'أوجد ميل $\\sqrt{3}\\,x-y+1=0$ والجزء المقطوع من محور الصادات وزاوية الميل.', 'Find the slope, the $y$-intercept and the angle of inclination of $\\sqrt{3}\\,x-y+1=0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Askatu $y$.', 'Despeja $y$.', 'اعزل $y$.', 'Solve for $y$.'), math: same('$y=\\sqrt{3}\\,x+1$') },
            { text: say('Malda eta jatorriko ordenatua.', 'Pendiente y ordenada en el origen.', 'الميل والجزء المقطوع.', 'Slope and $y$-intercept.'), math: same('$m=\\sqrt{3}\\qquad n=1$') },
            { text: say('Malda angeluaren tangentea da.', 'La pendiente es la tangente del ángulo.', 'الميل ظل الزاوية.', 'The slope is the tangent of the angle.'), math: same('$\\tan\\alpha=\\sqrt{3}\\ \\to\\ \\alpha=60^\\circ$') }
        ],
        takeaway: say('$y=mx+n$ ekuazioan, $m$ malda da eta $n$ jatorriko ordenatua. Malda zuzenak $X$ ardatzarekin osatzen duen angeluaren tangentea da: $m=\\tan\\alpha$.', 'En $y=mx+n$, $m$ es la pendiente y $n$ la ordenada en el origen. La pendiente es la tangente del ángulo que forma la recta con el eje $X$: $m=\\tan\\alpha$.', 'في $y=mx+n$ يكون $m$ الميل و$n$ الجزء المقطوع. والميل ظل الزاوية التي يصنعها المستقيم مع المحور $X$: ‏$m=\\tan\\alpha$.', 'In $y=mx+n$, $m$ is the slope and $n$ the $y$-intercept. The slope is the tangent of the angle the line makes with the $X$ axis: $m=\\tan\\alpha$.'),
        figure: (language) => <InclinationFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'pencil',
        stage: 'lines',
        title: say('Zuzen-sorta', 'Haz de rectas', 'حزمة المستقيمات', 'Pencil of lines'),
        goal: say('Puntu batetik pasatzen diren zuzen guztiak idaztea, eta haien artean baldintza bat betetzen duena aukeratzea.', 'Escribir todas las rectas que pasan por un punto y elegir entre ellas la que cumple una condición.', 'كتابة كل المستقيمات المارة بنقطة واختيار الذي يحقق شرطًا منها.', 'Write all the lines through a point and choose among them the one that meets a condition.'),
        needs: [{ unit: VECTORS_4, topic: 'continuous', title: { eu: 'Ekuazio jarraitua eta puntu-malda ekuazioa', es: 'Ecuación continua y punto-pendiente', en: 'Continuous and point-slope equations', ar: 'المعادلة المتصلة ومعادلة النقطة والميل' } }],
        problem: say('Idatzi $P(2,-1)$ zentroko zuzen-sorta, eta aurkitu $Q(4,5)$ puntutik pasatzen den sortako zuzena.', 'Escribe el haz de rectas de centro $P(2,-1)$ y halla la recta del haz que pasa por $Q(4,5)$.', 'اكتب حزمة المستقيمات التي مركزها $P(2,-1)$ وأوجد مستقيم الحزمة المار بـ $Q(4,5)$.', 'Write the pencil of lines with centre $P(2,-1)$ and find the line of the pencil through $Q(4,5)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$P$ puntutik pasatzen diren zuzen guztiak.', 'Todas las rectas que pasan por $P$.', 'كل المستقيمات المارة بـ $P$.', 'All the lines through $P$.'), math: same('$y+1=m(x-2)\\qquad x=2$') },
            { text: say('$Q$ puntutik pasa dadila.', 'Que pase por $Q$.', 'أن يمر بـ $Q$.', 'It has to pass through $Q$.'), math: same('$5+1=m(4-2)\\ \\to\\ m=3$') },
            { text: say('Zuzena.', 'La recta.', 'المستقيم.', 'The line.'), math: same('$y+1=3(x-2)\\ \\to\\ y=3x-7$') }
        ],
        takeaway: say('$P(x_0,y_0)$ zentroko zuzen-sorta $P$ puntutik pasatzen diren zuzen guztiak dira: $y-y_0=m(x-x_0)$ malda bakoitzeko, gehi $x=x_0$ bertikala.', 'El haz de rectas de centro $P(x_0,y_0)$ son todas las rectas que pasan por $P$: $y-y_0=m(x-x_0)$ para cada pendiente $m$, más la vertical $x=x_0$.', 'حزمة المستقيمات التي مركزها $P(x_0,y_0)$ هي كل المستقيمات المارة بـ $P$: ‏$y-y_0=m(x-x_0)$ لكل ميل $m$، زائد الرأسي $x=x_0$.', 'The pencil of lines with centre $P(x_0,y_0)$ is all the lines through $P$: $y-y_0=m(x-x_0)$ for each slope $m$, plus the vertical $x=x_0$.'),
        figure: (language) => <PencilFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 3. Positions and angles ---------- */
    {
        id: 'parallel-perpendicular',
        stage: 'positions',
        title: say('Zuzen paraleloak eta perpendikularrak puntu batetik', 'Paralelas y perpendiculares por un punto', 'الموازي والعمودي المار بنقطة', 'Parallels and perpendiculars through a point'),
        goal: say('Puntu batetik pasatzen diren eta zuzen baten paralelo edo perpendikular diren zuzenak aurkitzea, bektore normala erabiliz.', 'Hallar las rectas que pasan por un punto y son paralela o perpendicular a otra, usando el vector normal.', 'إيجاد المستقيمين المارين بنقطة والموازي والعمودي على مستقيم آخر باستعمال المتجه الناظمي.', 'Find the lines through a point that are parallel or perpendicular to another, using the normal vector.'),
        needs: [{ unit: VECTORS_4, topic: 'parallel-perpendicular', title: { eu: 'Zuzen paraleloak eta perpendikularrak', es: 'Rectas paralelas y perpendiculares', en: 'Parallel and perpendicular straight lines', ar: 'المستقيمات المتوازية والمتعامدة' } }],
        problem: say('Aurkitu $P(3,-2)$ puntutik pasatzen diren eta $r$: $2x-5y+1=0$ zuzenaren paraleloa eta perpendikularra diren zuzenak.', 'Halla las rectas que pasan por $P(3,-2)$ y son paralela y perpendicular a $r$: $2x-5y+1=0$.', 'أوجد المستقيمين المارين بـ $P(3,-2)$ والموازي والعمودي على $r$: $2x-5y+1=0$.', 'Find the lines through $P(3,-2)$ that are parallel and perpendicular to $r$: $2x-5y+1=0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Paraleloa: $A$ eta $B$ berberak; $C$ puntuarekin.', 'Paralela: los mismos $A$ y $B$; $C$ con el punto.', 'الموازي: $A$ و$B$ نفسهما؛ و$C$ بالنقطة.', 'Parallel: the same $A$ and $B$; $C$ from the point.'), math: same('$\\begin{gathered}2x-5y+C=0\\\\ 6+10+C=0\\ \\to\\ C=-16\\end{gathered}$') },
            { text: say('Perpendikularra: $A$ eta $B$ trukatu, eta zeinu bat aldatu.', 'Perpendicular: se intercambian $A$ y $B$ y se cambia un signo.', 'العمودي: نبدّل $A$ و$B$ ونغيّر إشارة.', 'Perpendicular: swap $A$ and $B$ and change a sign.'), math: same('$\\begin{gathered}5x+2y+C=0\\\\ 15-4+C=0\\ \\to\\ C=-11\\end{gathered}$') },
            { text: say('Bi zuzenak.', 'Las dos rectas.', 'المستقيمان.', 'The two lines.'), math: same('$2x-5y-16=0\\qquad 5x+2y-11=0$') }
        ],
        takeaway: say('$Ax+By+C=0$ zuzenaren paralelo bat $Ax+By+C\'=0$ da; perpendikular bat, $Bx-Ay+C\'=0$. $C\'$ puntuarekin aurkitzen da.', 'Una paralela a $Ax+By+C=0$ es $Ax+By+C\'=0$; una perpendicular, $Bx-Ay+C\'=0$. $C\'$ se halla con el punto.', 'الموازي لـ $Ax+By+C=0$ هو $Ax+By+C\'=0$، والعمودي $Bx-Ay+C\'=0$. ونجد $C\'$ بالنقطة.', 'A parallel to $Ax+By+C=0$ is $Ax+By+C\'=0$; a perpendicular, $Bx-Ay+C\'=0$. $C\'$ is found with the point.'),
        figure: (language) => <ParallelLinesFigure language={language} />
    },
    {
        id: 'relative-position',
        stage: 'positions',
        title: say('Bi zuzenen posizio erlatiboa', 'Posición relativa de dos rectas', 'الوضع النسبي لمستقيمين', 'Relative position of two lines'),
        goal: say('Bi zuzen ebakitzaileak, paraleloak ala bat datozenak diren erabakitzea, koefizienteak konparatuz, eta ebaki-puntua aurkitzea.', 'Decidir si dos rectas son secantes, paralelas o coincidentes comparando coeficientes, y hallar el punto de corte.', 'تحديد هل مستقيمان متقاطعان أو متوازيان أو منطبقان بمقارنة المعاملات، وإيجاد نقطة التقاطع.', 'Decide whether two lines intersect, are parallel or coincide by comparing coefficients, and find the crossing point.'),
        needs: [{ unit: VECTORS_4, topic: 'relative-position', title: { eu: 'Bi zuzenen posizio erlatiboa', es: 'Posición relativa de dos rectas', en: 'Relative position of two straight lines', ar: 'الوضع النسبي لمستقيمين' } }],
        problem: say('Aztertu $r$: $2x-y+3=0$ eta $s$: $4x-2y-6=0$ zuzenen posizio erlatiboa, eta $r$ eta $t$: $x+y-3=0$ zuzenena.', 'Estudia la posición relativa de $r$: $2x-y+3=0$ y $s$: $4x-2y-6=0$, y la de $r$ y $t$: $x+y-3=0$.', 'ادرس الوضع النسبي لـ $r$: $2x-y+3=0$ و$s$: $4x-2y-6=0$، ثم لـ $r$ و$t$: $x+y-3=0$.', 'Study the relative position of $r$: $2x-y+3=0$ and $s$: $4x-2y-6=0$, and that of $r$ and $t$: $x+y-3=0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$r$ eta $s$: lehen bi arrazoiak berdinak, hirugarrena ez. Paraleloak.', '$r$ y $s$: las dos primeras razones son iguales y la tercera no. Paralelas.', '$r$ و$s$: النسبتان الأوليان متساويتان والثالثة لا. متوازيان.', '$r$ and $s$: the first two ratios are equal and the third is not. Parallel.'), math: same('$\\frac{2}{4}=\\frac{-1}{-2}\\neq\\frac{3}{-6}$') },
            { text: say('$r$ eta $t$: arrazoiak desberdinak. Ebakitzaileak.', '$r$ y $t$: razones distintas. Secantes.', '$r$ و$t$: نسبتان مختلفتان. متقاطعان.', '$r$ and $t$: different ratios. Intersecting.'), math: same('$\\frac{2}{1}\\neq\\frac{-1}{1}$') },
            { text: say('Ebatzi sistema, ekuazioak batuz.', 'Resuelve el sistema sumando las ecuaciones.', 'حُلّ النظام بجمع المعادلتين.', 'Solve the system by adding the equations.'), math: same('$3x=0\\ \\to\\ x=0,\\ y=3$') }
        ],
        takeaway: say('$\\frac{A}{A\'}\\neq\\frac{B}{B\'}$ bada, ebakitzen dira; $\\frac{A}{A\'}=\\frac{B}{B\'}\\neq\\frac{C}{C\'}$ bada, paraleloak dira; hiru arrazoiak berdinak badira, bat datoz.', 'Con $\\frac{A}{A\'}\\neq\\frac{B}{B\'}$ se cortan; con $\\frac{A}{A\'}=\\frac{B}{B\'}\\neq\\frac{C}{C\'}$ son paralelas; si las tres razones son iguales, coinciden.', 'إذا كان $\\frac{A}{A\'}\\neq\\frac{B}{B\'}$ يتقاطعان، وإذا كان $\\frac{A}{A\'}=\\frac{B}{B\'}\\neq\\frac{C}{C\'}$ يتوازيان، وإذا تساوت النسب الثلاث ينطبقان.', 'With $\\frac{A}{A\'}\\neq\\frac{B}{B\'}$ they meet; with $\\frac{A}{A\'}=\\frac{B}{B\'}\\neq\\frac{C}{C\'}$ they are parallel; if the three ratios are equal, they coincide.'),
        figure: (language) => <PositionsFigure language={language} />
    },
    {
        id: 'line-angle',
        stage: 'positions',
        title: say('Bi zuzenen angelua', 'Ángulo de dos rectas', 'زاوية مستقيمين', 'The angle of two lines'),
        goal: say('Bi zuzenek osatzen duten angelu zorrotza aurkitzea, haien bektoreekin eta biderkadura eskalarraren balio absolutuarekin.', 'Hallar el ángulo agudo que forman dos rectas con sus vectores y el valor absoluto del producto escalar.', 'إيجاد الزاوية الحادة بين مستقيمين بمتجهيهما والقيمة المطلقة للجداء السلمي.', 'Find the acute angle two lines make, with their vectors and the absolute value of the dot product.'),
        needs: [{ unit: 'batx1-zientziak/vectores', topic: 'angle-vectors', title: { eu: 'Bi bektoreren angelua', es: 'Ángulo de dos vectores', en: 'The angle between two vectors', ar: 'زاوية متجهين' } }],
        problem: say('Aurkitu $r$: $x-3y+2=0$ eta $s$: $2x-y-1=0$ zuzenek osatzen duten angelua.', 'Halla el ángulo que forman $r$: $x-3y+2=0$ y $s$: $2x-y-1=0$.', 'أوجد الزاوية بين $r$: $x-3y+2=0$ و$s$: $2x-y-1=0$.', 'Find the angle between $r$: $x-3y+2=0$ and $s$: $2x-y-1=0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bektore normalak.', 'Vectores normales.', 'المتجهان الناظميان.', 'Normal vectors.'), math: same('$\\vec{n}_r=(1,-3)\\qquad\\vec{n}_s=(2,-1)$') },
            { text: say('Kosinua, biderkadura balio absolutuan hartuta: $|2+3|=5$.', 'El coseno, con el producto en valor absoluto: $|2+3|=5$.', 'جيب التمام بالجداء بالقيمة المطلقة: $|2+3|=5$.', 'The cosine, with the product in absolute value: $|2+3|=5$.'), math: same('$\\cos\\alpha=\\frac{5}{\\sqrt{10}\\cdot\\sqrt{5}}=\\frac{\\sqrt{2}}{2}$') },
            { text: say('Angelua.', 'El ángulo.', 'الزاوية.', 'The angle.'), math: same('$\\alpha=45^\\circ$') }
        ],
        takeaway: say('Bi zuzenen angelua zorrotza da: $\\cos\\alpha=\\frac{|\\vec{u}\\cdot\\vec{v}|}{|\\vec{u}|\\,|\\vec{v}|}$, haien norabide-bektoreekin edo normalekin.', 'El ángulo de dos rectas es el agudo: $\\cos\\alpha=\\frac{|\\vec{u}\\cdot\\vec{v}|}{|\\vec{u}|\\,|\\vec{v}|}$, con sus vectores directores o con sus normales.', 'زاوية مستقيمين هي الحادة: $\\cos\\alpha=\\frac{|\\vec{u}\\cdot\\vec{v}|}{|\\vec{u}|\\,|\\vec{v}|}$ بمتجهي توجيههما أو بناظميهما.', 'The angle of two lines is the acute one: $\\cos\\alpha=\\frac{|\\vec{u}\\cdot\\vec{v}|}{|\\vec{u}|\\,|\\vec{v}|}$, with their direction vectors or their normals.'),
        figure: (language) => <LineAngleFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 4. Distances ---------- */
    {
        id: 'point-line',
        stage: 'distances',
        title: say('Puntu batetik zuzen baterako distantzia', 'Distancia de un punto a una recta', 'المسافة من نقطة إلى مستقيم', 'Distance from a point to a line'),
        goal: say('Puntu batetik zuzen baterako distantzia formularekin kalkulatzea, perpendikularraren oina aurkitu gabe.', 'Calcular la distancia de un punto a una recta con la fórmula, sin hallar el pie de la perpendicular.', 'حساب المسافة من نقطة إلى مستقيم بالصيغة دون إيجاد موقع العمود.', 'Work out the distance from a point to a line with the formula, without finding the foot of the perpendicular.'),
        needs: [{ unit: 'batx1-zientziak/vectores', topic: 'projection', title: { eu: 'Bektore baten proiekzioa beste baten gainean', es: 'Proyección de un vector sobre otro', en: 'Projecting a vector onto another', ar: 'إسقاط متجه على آخر' } }],
        problem: say('Aurkitu $P(3,1)$ puntutik $r$: $4x+3y-5=0$ zuzenerako distantzia.', 'Halla la distancia de $P(3,1)$ a la recta $r$: $4x+3y-5=0$.', 'أوجد المسافة من $P(3,1)$ إلى المستقيم $r$: $4x+3y-5=0$.', 'Find the distance from $P(3,1)$ to the line $r$: $4x+3y-5=0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordezkatu $P$ ekuazioan.', 'Sustituye $P$ en la ecuación.', 'عوّض $P$ في المعادلة.', 'Substitute $P$ into the equation.'), math: same('$4\\cdot 3+3\\cdot 1-5=10$') },
            { text: say('Normalaren modulua.', 'El módulo del normal.', 'طول الناظمي.', 'The length of the normal.'), math: same('$\\sqrt{4^2+3^2}=5$') },
            { text: say('Zatitu.', 'Divide.', 'اقسم.', 'Divide.'), math: same('$d(P,r)=\\frac{10}{5}=2$') }
        ],
        takeaway: say('$d(P,r)=\\frac{|Ax_0+By_0+C|}{\\sqrt{A^2+B^2}}$, zuzena forma orokorrean eta $P(x_0,y_0)$ puntua izanik.', '$d(P,r)=\\frac{|Ax_0+By_0+C|}{\\sqrt{A^2+B^2}}$, con la recta en forma general y el punto $P(x_0,y_0)$.', '$d(P,r)=\\frac{|Ax_0+By_0+C|}{\\sqrt{A^2+B^2}}$ والمستقيم بالصيغة العامة والنقطة $P(x_0,y_0)$.', '$d(P,r)=\\frac{|Ax_0+By_0+C|}{\\sqrt{A^2+B^2}}$, with the line in general form and the point $P(x_0,y_0)$.'),
        figure: (language) => <PointLineFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'parallel-lines',
        stage: 'distances',
        title: say('Bi zuzen paraleloren arteko distantzia', 'Distancia entre dos rectas paralelas', 'المسافة بين مستقيمين متوازيين', 'Distance between two parallel lines'),
        goal: say('Bi zuzen paraleloren arteko distantzia kalkulatzea, zuzen bateko puntu bat hartuta edo koefizienteak berdinduta.', 'Calcular la distancia entre dos rectas paralelas tomando un punto de una o igualando los coeficientes.', 'حساب المسافة بين مستقيمين متوازيين بأخذ نقطة من أحدهما أو بمساواة المعاملات.', 'Work out the distance between two parallel lines by taking a point of one or by making the coefficients equal.'),
        problem: say('Aurkitu $r$: $3x-4y+2=0$ eta $s$: $6x-8y-11=0$ zuzenen arteko distantzia.', 'Halla la distancia entre $r$: $3x-4y+2=0$ y $s$: $6x-8y-11=0$.', 'أوجد المسافة بين $r$: $3x-4y+2=0$ و$s$: $6x-8y-11=0$.', 'Find the distance between $r$: $3x-4y+2=0$ and $s$: $6x-8y-11=0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Paraleloak dira.', 'Son paralelas.', 'إنهما متوازيان.', 'They are parallel.'), math: same('$\\frac{3}{6}=\\frac{-4}{-8}\\neq\\frac{2}{-11}$') },
            { text: say('Hartu $r$ zuzeneko puntu bat: $x=2$ denean, $y=2$.', 'Toma un punto de $r$: con $x=2$, $y=2$.', 'خذ نقطة من $r$: مع $x=2$ يكون $y=2$.', 'Take a point of $r$: with $x=2$, $y=2$.'), math: same('$P(2,2)$') },
            { text: say('$P$ puntutik $s$ zuzenerako distantzia.', 'La distancia de $P$ a $s$.', 'المسافة من $P$ إلى $s$.', 'The distance from $P$ to $s$.'), math: same('$\\frac{|12-16-11|}{\\sqrt{36+64}}=\\frac{15}{10}=1{,}5$') }
        ],
        takeaway: say('Bi zuzen paraleloren arteko distantzia batetik besterainoko edozein punturena da. $A$ eta $B$ berberekin: $d=\\frac{|C-C\'|}{\\sqrt{A^2+B^2}}$.', 'La distancia entre dos rectas paralelas es la de cualquier punto de una a la otra. Con los mismos $A$ y $B$: $d=\\frac{|C-C\'|}{\\sqrt{A^2+B^2}}$.', 'المسافة بين مستقيمين متوازيين هي مسافة أي نقطة من أحدهما إلى الآخر. وبـ $A$ و$B$ نفسيهما: $d=\\frac{|C-C\'|}{\\sqrt{A^2+B^2}}$.', 'The distance between two parallel lines is that from any point of one to the other. With the same $A$ and $B$: $d=\\frac{|C-C\'|}{\\sqrt{A^2+B^2}}$.'),
        figure: (language) => <ParallelDistanceFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'reflection',
        stage: 'distances',
        title: say('Puntu baten simetrikoa zuzen batekiko', 'Simétrico de un punto respecto de una recta', 'نظير نقطة بالنسبة إلى مستقيم', 'Reflecting a point in a line'),
        goal: say('Puntu baten simetrikoa zuzen batekiko aurkitzea: perpendikularra, haren oina eta erdiko puntua.', 'Hallar el simétrico de un punto respecto de una recta: la perpendicular, su pie y el punto medio.', 'إيجاد نظير نقطة بالنسبة إلى مستقيم: العمود وموقعه والمنتصف.', 'Find the reflection of a point in a line: the perpendicular, its foot and the midpoint.'),
        needs: [MIDPOINT],
        problem: say('Aurkitu $P(5,0)$ puntuaren simetrikoa $r$: $x-2y=0$ zuzenarekiko.', 'Halla el simétrico de $P(5,0)$ respecto de la recta $r$: $x-2y=0$.', 'أوجد نظير $P(5,0)$ بالنسبة إلى المستقيم $r$: $x-2y=0$.', 'Find the reflection of $P(5,0)$ in the line $r$: $x-2y=0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$r$ zuzenaren perpendikularra $P$ puntutik: normalaren norabidean.', 'Perpendicular a $r$ por $P$: en la dirección del normal.', 'العمودي على $r$ من $P$: في اتجاه الناظمي.', 'Perpendicular to $r$ through $P$: along the normal.'), math: same('$(x,y)=(5,0)+t(1,-2)$') },
            { text: say('Ebaki $r$ zuzenarekin: oina.', 'Corte con $r$: el pie.', 'التقاطع مع $r$: الموقع.', 'Where it cuts $r$: the foot.'), math: same('$5+t+4t=0\\ \\to\\ t=-1\\ \\to\\ M(4,2)$') },
            { text: say('$M$ puntua $PP\'$ zuzenkiaren erdiko puntua da.', '$M$ es el punto medio de $PP\'$.', '$M$ منتصف $PP\'$.', '$M$ is the midpoint of $PP\'$.'), math: same('$P\'=2M-P=(3,4)$') }
        ],
        takeaway: say('$P$ puntuaren simetrikoa $r$ zuzenarekiko: $P$ puntutik $r$ zuzenaren perpendikularra; haren ebakidura, $M$, erdiko puntua da, eta $P\'=2M-P$.', 'Para el simétrico de $P$ respecto de $r$: la perpendicular a $r$ por $P$; su corte $M$ es el punto medio, y $P\'=2M-P$.', 'لنظير $P$ بالنسبة إلى $r$: العمودي على $r$ من $P$؛ وتقاطعه $M$ هو المنتصف، و$P\'=2M-P$.', 'For the reflection of $P$ in $r$: the perpendicular to $r$ through $P$; where it cuts, $M$, is the midpoint, and $P\'=2M-P$.'),
        figure: (language) => <ReflectionFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 5. Triangles ---------- */
    {
        id: 'triangle-points',
        stage: 'triangles',
        title: say('Triangeluaren zuzen eta puntu nabarmenak', 'Rectas y puntos notables del triángulo', 'المستقيمات والنقاط الشهيرة في المثلث', 'Notable lines and points of a triangle'),
        goal: say('Triangelu baten barizentroa, ortozentroa eta zirkunzentroa koordenatuekin aurkitzea.', 'Hallar con coordenadas el baricentro, el ortocentro y el circuncentro de un triángulo.', 'إيجاد مركز الثقل وملتقى الارتفاعات ومركز الدائرة المحيطة لمثلث بالإحداثيات.', 'Find the centroid, the orthocentre and the circumcentre of a triangle with coordinates.'),
        needs: [{ unit: 'dbh3/geometria-plana', topic: 'notable-points', title: { eu: 'Triangeluaren puntu nabarmenak', es: 'Puntos notables del triángulo', en: 'Notable points of a triangle', ar: 'النقاط الشهيرة في المثلث' } }],
        problem: say('$A(-2,-1)$, $B(4,-1)$ eta $C(1,5)$ triangeluan, aurkitu barizentroa eta ortozentroa.', 'En el triángulo $A(-2,-1)$, $B(4,-1)$, $C(1,5)$, halla el baricentro y el ortocentro.', 'في المثلث $A(-2,-1)$ و$B(4,-1)$ و$C(1,5)$، أوجد مركز الثقل وملتقى الارتفاعات.', 'In the triangle $A(-2,-1)$, $B(4,-1)$, $C(1,5)$, find the centroid and the orthocentre.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Barizentroa: erpinen batez bestekoa.', 'Baricentro: la media de los vértices.', 'مركز الثقل: متوسط الرؤوس.', 'Centroid: the mean of the vertices.'), math: same('$G=\\left(\\frac{-2+4+1}{3},\\frac{-1-1+5}{3}\\right)=(1,1)$') },
            { text: say('$C$ erpineko altuera, $AB$ aldearen perpendikularra, horizontala baita.', 'Altura desde $C$: perpendicular a $AB$, que es horizontal.', 'الارتفاع من $C$: عمودي على $AB$ الأفقي.', 'Altitude from $C$: perpendicular to $AB$, which is horizontal.'), math: same('$x=1$') },
            { text: say('$A$ erpineko altuera, $\\overrightarrow{BC}=(-3,6)$ bektorearen perpendikularra; $x=1$ zuzena ortozentroan mozten du.', 'Altura desde $A$, perpendicular a $\\overrightarrow{BC}=(-3,6)$; corta a $x=1$ en el ortocentro.', 'الارتفاع من $A$ عمودي على $\\overrightarrow{BC}=(-3,6)$؛ ويقطع $x=1$ في ملتقى الارتفاعات.', 'Altitude from $A$, perpendicular to $\\overrightarrow{BC}=(-3,6)$; it cuts $x=1$ at the orthocentre.'), math: same('$-3(x+2)+6(y+1)=0\\ \\to\\ H\\left(1,\\frac{1}{2}\\right)$') }
        ],
        takeaway: say('Barizentroa, $G=\\frac{A+B+C}{3}$, medianen ebakidura da. Ortozentroa altueren ebakidura da, eta zirkunzentroa, erdibitzaileena.', 'Baricentro: $G=\\frac{A+B+C}{3}$, donde se cortan las medianas. Ortocentro: donde se cortan las alturas. Circuncentro: donde se cortan las mediatrices.', 'مركز الثقل $G=\\frac{A+B+C}{3}$ ملتقى المتوسطات. وملتقى الارتفاعات حيث تتقاطع الارتفاعات، ومركز الدائرة المحيطة حيث تتقاطع المحاور.', 'Centroid: $G=\\frac{A+B+C}{3}$, where the medians meet. Orthocentre: where the altitudes meet. Circumcentre: where the perpendicular bisectors meet.'),
        figure: (language) => <TrianglePointsFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'triangle-area',
        stage: 'triangles',
        title: say('Triangelu baten azalera distantziarekin', 'Área de un triángulo con la distancia', 'مساحة المثلث بالمسافة', 'Area of a triangle with the distance'),
        goal: say('Hiru erpinak ezagututa triangelu baten azalera kalkulatzea: oinarria alde bat da, eta altuera, aurkako erpinetik zuzenerako distantzia.', 'Calcular el área de un triángulo conocidos sus vértices: la base es un lado y la altura, la distancia del vértice opuesto a su recta.', 'حساب مساحة مثلث رؤوسه معلومة: القاعدة ضلع والارتفاع المسافة من الرأس المقابل إلى مستقيمه.', 'Work out the area of a triangle from its vertices: the base is a side and the height, the distance from the opposite vertex to its line.'),
        problem: say('Aurkitu $A(1,1)$, $B(7,4)$ eta $C(2,6)$ triangeluaren azalera.', 'Halla el área del triángulo $A(1,1)$, $B(7,4)$, $C(2,6)$.', 'أوجد مساحة المثلث $A(1,1)$ و$B(7,4)$ و$C(2,6)$.', 'Find the area of the triangle $A(1,1)$, $B(7,4)$, $C(2,6)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Oinarria: $|\\overrightarrow{AB}|$.', 'Base: $|\\overrightarrow{AB}|$.', 'القاعدة: $|\\overrightarrow{AB}|$.', 'Base: $|\\overrightarrow{AB}|$.'), math: same('$|\\overrightarrow{AB}|=\\sqrt{36+9}=3\\sqrt{5}$') },
            { text: say('$AB$ zuzena, eta altuera: $C$ puntutik zuzenerako distantzia.', 'Recta $AB$ y altura: la distancia de $C$.', 'المستقيم $AB$ والارتفاع: المسافة من $C$.', 'Line $AB$ and height: the distance from $C$.'), math: same('$\\begin{gathered}x-2y+1=0\\\\ d=\\frac{|2-12+1|}{\\sqrt{5}}=\\frac{9}{\\sqrt{5}}\\end{gathered}$') },
            { text: say('Azalera.', 'Área.', 'المساحة.', 'Area.'), math: same('$\\frac{1}{2}\\cdot 3\\sqrt{5}\\cdot\\frac{9}{\\sqrt{5}}=\\frac{27}{2}=13{,}5$') }
        ],
        takeaway: say('Azalera oinarria bider altuera zati bi da: oinarria alde bat da, $|\\overrightarrow{AB}|$, eta altuera aurkako erpinetik alde horren zuzenerako distantzia, $d(C,AB)$.', 'El área es la mitad de la base por la altura: la base es un lado, $|\\overrightarrow{AB}|$, y la altura es la distancia $d(C,AB)$ del vértice opuesto a la recta de ese lado.', 'المساحة نصف القاعدة في الارتفاع: القاعدة ضلع $|\\overrightarrow{AB}|$ والارتفاع المسافة $d(C,AB)$ من الرأس المقابل إلى مستقيم ذلك الضلع.', 'The area is half the base times the height: the base is a side, $|\\overrightarrow{AB}|$, and the height is the distance $d(C,AB)$ from the opposite vertex to the line of that side.'),
        figure: (language) => <TriangleAreaFigure language={language} />,
        figureAfterSteps: true
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const bachGeometryTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...bachGeometryLessonTexts[topic.id as BachGeometryTopicId], ...bachGeometryLessonChecks[topic.id as BachGeometryTopicId] }))
