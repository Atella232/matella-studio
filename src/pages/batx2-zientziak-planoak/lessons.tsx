import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { CrossingLinesFigure, ImplicitFigure, LineContinuousFigure, LineInPlaneFigure, LineParametricFigure, LinePlanePointFigure, MeetingLinesFigure, ParallelLinesFigure, ParallelPlanesFigure, ParameterPlanesFigure, PencilFigure, PlaneGeneralFigure, PlaneParametricFigure, ThreePlanesFigure, ThreePointsFigure } from './figures'
import { linesPlanesLessonChecks, type LinesPlanesTopicId } from './lessonChecks'
import { linesPlanesLessonTexts } from './lessonTexts'

/* ==========================================================================
   Zuzenak eta planoak espazioan · Batxilergoa 2 · Zientziak — stages and
   lessons. The scope follows unit 5 of Santillana 2.º Bachillerato
   Ciencias (the class book) and unit 5 of Anaya Matemáticas II: the
   equations of a line and of a plane, the position of two lines, of a
   line and a plane and of two and three planes (with ranks), and the
   pencil of planes. Points, the midpoint and collinear points were done
   in Espazioko bektoreak; angles, distances and perpendicular lines and
   planes go to Angeluak eta distantziak. The determinants are worked
   with the rule of Sarrus; the link to the 2.º Bachillerato determinants
   and systems units is added when the branches meet (see
   docs/claude-notes/planoak-batx2z.md).
   ========================================================================== */

export type LinesPlanesStageId = 'lines' | 'planes' | 'two-lines' | 'line-plane' | 'planes-position'

export const linesPlanesStages: UnitStage[] = [
    { id: 'lines', tone: 'blue', title: { eu: 'Zuzenaren ekuazioak', es: 'Ecuaciones de la recta', en: 'Equations of a line', ar: 'معادلات المستقيم' } },
    { id: 'planes', tone: 'violet', title: { eu: 'Planoaren ekuazioak', es: 'Ecuaciones del plano', en: 'Equations of a plane', ar: 'معادلات المستوى' } },
    { id: 'two-lines', tone: 'mustard', title: { eu: 'Bi zuzenen posizioa', es: 'Posición de dos rectas', en: 'Two lines', ar: 'وضع مستقيمين' } },
    { id: 'line-plane', tone: 'coral', title: { eu: 'Zuzena eta planoa', es: 'Recta y plano', en: 'A line and a plane', ar: 'مستقيم ومستوى' } },
    { id: 'planes-position', tone: 'green', title: { eu: 'Planoen posizioa', es: 'Posición de planos', en: 'Position of planes', ar: 'وضع المستويات' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

const VECTOR_PARAMETRIC = { unit: 'batx1-zientziak/geometria-analitica', topic: 'vector-parametric', title: { eu: 'Ekuazio bektoriala eta parametrikoak', es: 'Ecuación vectorial y paramétricas', en: 'Vector and parametric equations', ar: 'المعادلة المتجهية والوسيطيتان' } }
const GENERAL_NORMAL = { unit: 'batx1-zientziak/geometria-analitica', topic: 'general-normal', title: { eu: 'Ekuazio jarraitua, orokorra eta bektore normala', es: 'Ecuación continua, general y vector normal', en: 'Continuous and general equations and the normal vector', ar: 'المعادلة المتصلة والعامة والمتجه الناظمي' } }
const RELATIVE_POSITION = { unit: 'batx1-zientziak/geometria-analitica', topic: 'relative-position', title: { eu: 'Bi zuzenen posizio erlatiboa', es: 'Posición relativa de dos rectas', en: 'Relative position of two lines', ar: 'الوضع النسبي لمستقيمين' } }
const PENCIL_LINES = { unit: 'batx1-zientziak/geometria-analitica', topic: 'pencil', title: { eu: 'Zuzen-sorta', es: 'Haz de rectas', en: 'Pencil of lines', ar: 'حزمة المستقيمات' } }
const CLASSIFY_SYSTEMS = { unit: 'batx1-zientziak/sistemas', topic: 'classify-systems', title: { eu: 'Sistema motak', es: 'Tipos de sistemas', en: 'Types of systems', ar: 'أنواع الأنظمة' } }
const PARAMETER_DISCUSSION = { unit: 'batx1-zientziak/sistemas', topic: 'parameter-discussion', title: { eu: 'Parametro baten araberako eztabaida', es: 'Discutir según un parámetro', en: 'Analysing a system with a parameter', ar: 'مناقشة نظام حسب وسيط' } }
const SPACE_VECTORS = { unit: 'batx2-zientziak/vectores-espacio', topic: 'space-vectors', title: { eu: 'Bektoreak eta modulua espazioan', es: 'Vectores y módulo en el espacio', en: 'Vectors and magnitude in space', ar: 'المتجهات وطولها في الفضاء' } }
const COMBINATION_3D = { unit: 'batx2-zientziak/vectores-espacio', topic: 'combination-3d', title: { eu: 'Eragiketak eta konbinazio lineala', es: 'Operaciones y combinación lineal', en: 'Operations and linear combinations', ar: 'العمليات والتركيب الخطي' } }
const CROSS_PRODUCT = { unit: 'batx2-zientziak/vectores-espacio', topic: 'cross-product', title: { eu: 'Bi bektoreren biderkadura bektoriala', es: 'El producto vectorial de dos vectores', en: 'The cross product of two vectors', ar: 'الجداء المتجهي لمتجهين' } }
const COPLANAR = { unit: 'batx2-zientziak/vectores-espacio', topic: 'coplanar', title: { eu: 'Bektore eta puntu planokideak', es: 'Vectores y puntos coplanarios', en: 'Coplanar vectors and points', ar: 'المتجهات والنقاط المستوية' } }
const ANGLE_3D = { unit: 'batx2-zientziak/vectores-espacio', topic: 'angle-3d', title: { eu: 'Angelua eta perpendikulartasuna', es: 'Ángulo y perpendicularidad', en: 'Angle and perpendicularity', ar: 'الزاوية والتعامد' } }

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Equations of a line ---------- */
    {
        id: 'line-parametric',
        stage: 'lines',
        title: say('Zuzena: bektoriala eta parametrikoak', 'La recta: vectorial y paramétricas', 'المستقيم: المتجهية والوسيطية', 'The line: vector and parametric'),
        goal: say('Espazioko zuzen baten ekuazio bektoriala eta parametrikoak idaztea, puntu batetik eta norabide-bektore batetik.', 'Escribir la ecuación vectorial y las paramétricas de una recta del espacio a partir de un punto y un vector director.', 'كتابة المعادلة المتجهية والمعادلات الوسيطية لمستقيم في الفضاء انطلاقًا من نقطة ومتجه توجيه.', 'Write the vector equation and the parametric equations of a line in space from a point and a direction vector.'),
        needs: [VECTOR_PARAMETRIC, SPACE_VECTORS],
        problem: say('Idatzi $A(1,-2,3)$ puntutik $\\vec{u}=(2,1,-1)$ norabidearekin pasatzen den zuzenaren ekuazio bektoriala eta parametrikoak. Zein puntu da $t=2$ denean?', 'Escribe la ecuación vectorial y las paramétricas de la recta por $A(1,-2,3)$ con dirección $\\vec{u}=(2,1,-1)$. ¿Qué punto da $t=2$?', 'اكتب المعادلة المتجهية والمعادلات الوسيطية للمستقيم المار بـ $A(1,-2,3)$ باتجاه $\\vec{u}=(2,1,-1)$. ما النقطة عند $t=2$؟', 'Write the vector equation and the parametric equations of the line through $A(1,-2,3)$ with direction $\\vec{u}=(2,1,-1)$. Which point does $t=2$ give?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bektoriala: puntua gehi $t$ aldiz bektorea.', 'La vectorial: el punto más $t$ veces el vector.', 'المتجهية: النقطة زائد $t$ مرة المتجه.', 'The vector one: the point plus $t$ times the vector.'), math: same('$(x,y,{z})=(1,-2,3)+t\\,(2,1,-1)$') },
            { text: say('Koordenatuz koordenatu, parametrikoak.', 'Coordenada a coordenada, las paramétricas.', 'مركّبةً مركّبة، المعادلات الوسيطية.', 'Coordinate by coordinate, the parametric ones.'), math: same('$x=1+2t,\\ y=-2+t,\\ {z}=3-t$') },
            { text: say('$t=2$ denean:', 'Con $t=2$:', 'مع $t=2$:', 'With $t=2$:'), math: same('$(1+4,-2+2,3-2)=(5,0,1)$') }
        ],
        takeaway: say('Zuzen bat $A$ puntu batek eta $\\vec{u}$ norabide-bektore batek zehazten dute: $(x,y,{z})=A+t\\,\\vec{u}$. $t$ parametroaren balio bakoitzak zuzeneko puntu bat ematen du, eta $t=0$ denean $A$ lortzen da.', 'Una recta queda fijada por un punto $A$ y un vector director $\\vec{u}$: $(x,y,{z})=A+t\\,\\vec{u}$. Cada valor del parámetro $t$ da un punto de la recta, y con $t=0$ se tiene $A$.', 'يتحدد المستقيم بنقطة $A$ ومتجه توجيه $\\vec{u}$: ‏$(x,y,{z})=A+t\\,\\vec{u}$. وكل قيمة للوسيط $t$ تعطي نقطة من المستقيم، ومع $t=0$ نحصل على $A$.', 'A line is fixed by a point $A$ and a direction vector $\\vec{u}$: $(x,y,{z})=A+t\\,\\vec{u}$. Each value of the parameter $t$ gives a point of the line, and $t=0$ gives $A$.'),
        figure: (language) => <LineParametricFigure language={language} />
    },
    {
        id: 'line-continuous',
        stage: 'lines',
        title: say('Ekuazio jarraitua eta inplizituak', 'Ecuación continua e implícitas', 'المعادلة المتصلة والديكارتيتان', 'Continuous and implicit equations'),
        goal: say('Parametrikoetatik ekuazio jarraitura eta inplizituetara igarotzea, eta haietan puntua eta norabidea irakurtzea.', 'Pasar de las paramétricas a la ecuación continua y a las implícitas, y leer en ellas el punto y la dirección.', 'الانتقال من المعادلات الوسيطية إلى المعادلة المتصلة والديكارتيتين، وقراءة النقطة والاتجاه فيها.', 'Go from the parametric equations to the continuous and implicit equations, and read the point and the direction in them.'),
        needs: [GENERAL_NORMAL],
        problem: say('Idatzi $A(2,0,-1)$ puntutik $(3,-2,1)$ norabidearekin pasatzen den zuzenaren ekuazio jarraitua eta inplizitu batzuk.', 'Escribe la ecuación continua y unas implícitas de la recta por $A(2,0,-1)$ con dirección $(3,-2,1)$.', 'اكتب المعادلة المتصلة ومعادلتين ديكارتيتين للمستقيم المار بـ $A(2,0,-1)$ باتجاه $(3,-2,1)$.', 'Write the continuous equation and some implicit equations of the line through $A(2,0,-1)$ with direction $(3,-2,1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Jarraitua: askatu $t$ hiru parametrikoetan.', 'Continua: despeja $t$ en las tres paramétricas.', 'المتصلة: اعزل $t$ في الوسيطية الثلاث.', 'Continuous: solve the three parametric equations for $t$.'), math: same('$\\frac{x-2}{3}=\\frac{y}{-2}=\\frac{{z}+1}{1}$') },
            { text: say('Lehen berdintza, gurutzean biderkatuz.', 'Primera igualdad, multiplicando en cruz.', 'المساواة الأولى بالضرب التبادلي.', 'First equality, cross-multiplying.'), math: same('$-2(x-2)=3y\\ \\to\\ 2x+3y-4=0$') },
            { text: say('Bigarren berdintza.', 'Segunda igualdad.', 'المساواة الثانية.', 'Second equality.'), math: same('$y=-2({z}+1)\\ \\to\\ y+2{z}+2=0$') }
        ],
        takeaway: say('Jarraitua $\\frac{x-a_1}{u_1}=\\frac{y-a_2}{u_2}=\\frac{{z}-a_3}{u_3}$ da: izendatzaileak norabidea dira, eta puntua zeinua aldatuta irakurtzen da. Haren bi berdintzak inplizituak dira: zuzena bi planoren ebaki gisa.', 'La continua es $\\frac{x-a_1}{u_1}=\\frac{y-a_2}{u_2}=\\frac{{z}-a_3}{u_3}$: los denominadores son el director y el punto se lee con el signo cambiado. Dos de sus igualdades dan las implícitas: la recta como corte de dos planos.', 'المتصلة هي $\\frac{x-a_1}{u_1}=\\frac{y-a_2}{u_2}=\\frac{{z}-a_3}{u_3}$: المقامات هي متجه التوجيه، وتُقرأ النقطة بإشارة معاكسة. ومساواتان منها تعطيان الديكارتيتين: المستقيم تقاطعًا لمستويين.', 'The continuous equation is $\\frac{x-a_1}{u_1}=\\frac{y-a_2}{u_2}=\\frac{{z}-a_3}{u_3}$: the denominators are the direction and the point is read with the sign changed. Two of its equalities give the implicit equations: the line as the meeting of two planes.'),
        figure: (language) => <LineContinuousFigure language={language} />
    },
    {
        id: 'implicit-to-parametric',
        stage: 'lines',
        title: say('Inplizituetatik parametrikoetara', 'De implícitas a paramétricas', 'من الديكارتيتين إلى الوسيطية', 'From implicit to parametric'),
        goal: say('Bi planoren ebaki gisa emandako zuzen bat parametrikoetara pasatzea: norabidea normalen biderkadura bektorialarekin, eta puntu bat sistema bat ebatziz.', 'Pasar a paramétricas una recta dada como corte de dos planos: el director con el producto vectorial de los normales y un punto resolviendo un sistema.', 'تحويل مستقيم معطى تقاطعًا لمستويين إلى معادلات وسيطية: الاتجاه بالجداء المتجهي للناظمين ونقطة بحل نظام.', 'Turn a line given as the meeting of two planes into parametric equations: the direction from the cross product of the normals and a point from solving a system.'),
        needs: [CROSS_PRODUCT],
        problem: say('Idatzi parametrikoetan $r$: $x+y-{z}=1$, $2x-y+{z}=2$.', 'Escribe en paramétricas $r$: $x+y-{z}=1$, $2x-y+{z}=2$.', 'اكتب بالمعادلات الوسيطية $r$: ‏$x+y-{z}=1$ و$2x-y+{z}=2$.', 'Write in parametric form $r$: $x+y-{z}=1$, $2x-y+{z}=2$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Norabidea normalen biderkadura da.', 'El director es el producto de los normales.', 'متجه التوجيه هو جداء الناظمين.', 'The direction is the product of the normals.'), math: same('$\\begin{gathered}(1,1,-1)\\times(2,-1,1)=(0,-3,-3)\\\\ \\parallel(0,1,1)\\end{gathered}$') },
            { text: say('Puntu bat: ${z}=0$ eginez sistema bat geratzen da.', 'Un punto: con ${z}=0$ queda un sistema.', 'نقطة: مع ${z}=0$ يبقى نظام.', 'A point: with ${z}=0$ a system is left.'), math: same('$x+y=1,\\ 2x-y=2\\ \\to\\ x=1,\\ y=0$') },
            { text: say('Parametrikoak $(1,0,0)$ eta $(0,1,1)$ erabiliz.', 'Paramétricas con $(1,0,0)$ y $(0,1,1)$.', 'المعادلات الوسيطية بـ $(1,0,0)$ و$(0,1,1)$.', 'Parametric equations with $(1,0,0)$ and $(0,1,1)$.'), math: same('$x=1,\\ y=t,\\ {z}=t$') }
        ],
        takeaway: say('Inplizituetatik parametrikoetara: norabidea $\\vec{n}_1\\times\\vec{n}_2$ da, eta puntu bat koordenatu bati balio bat emanez eta geratzen den sistema ebatziz ateratzen da.', 'Para pasar de implícitas a paramétricas: el director es $\\vec{n}_1\\times\\vec{n}_2$, y un punto sale de dar un valor a una coordenada y resolver el sistema que queda.', 'من الديكارتيتين إلى الوسيطية: متجه التوجيه $\\vec{n}_1\\times\\vec{n}_2$، ونقطة تأتي من إعطاء إحداثي قيمة وحل النظام الباقي.', 'From implicit to parametric: the direction is $\\vec{n}_1\\times\\vec{n}_2$, and a point comes from giving one coordinate a value and solving the system that is left.'),
        figure: (language) => <ImplicitFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 2. Equations of a plane ---------- */
    {
        id: 'plane-parametric',
        stage: 'planes',
        title: say('Planoa: bektoriala eta parametrikoak', 'El plano: vectorial y paramétricas', 'المستوى: المتجهية والوسيطية', 'The plane: vector and parametric'),
        goal: say('Plano baten ekuazio bektoriala eta parametrikoak idaztea, puntu batetik eta paraleloak ez diren bi norabidetatik.', 'Escribir la ecuación vectorial y las paramétricas de un plano a partir de un punto y dos direcciones no paralelas.', 'كتابة المعادلة المتجهية والمعادلات الوسيطية لمستوى انطلاقًا من نقطة واتجاهين غير متوازيين.', 'Write the vector equation and the parametric equations of a plane from a point and two directions that are not parallel.'),
        needs: [COMBINATION_3D],
        problem: say('Idatzi $A(1,0,2)$ puntutik $\\vec{u}=(1,1,0)$ eta $\\vec{v}=(0,2,-1)$ norabideekin pasatzen den planoaren ekuazio bektoriala eta parametrikoak. Zein puntu da $\\lambda=1$ eta $\\mu=-1$ denean?', 'Escribe la ecuación vectorial y las paramétricas del plano por $A(1,0,2)$ con direcciones $\\vec{u}=(1,1,0)$ y $\\vec{v}=(0,2,-1)$. ¿Qué punto dan $\\lambda=1$ y $\\mu=-1$?', 'اكتب المعادلة المتجهية والمعادلات الوسيطية للمستوى المار بـ $A(1,0,2)$ باتجاهي $\\vec{u}=(1,1,0)$ و$\\vec{v}=(0,2,-1)$. ما النقطة عند $\\lambda=1$ و$\\mu=-1$؟', 'Write the vector equation and the parametric equations of the plane through $A(1,0,2)$ with directions $\\vec{u}=(1,1,0)$ and $\\vec{v}=(0,2,-1)$. Which point do $\\lambda=1$ and $\\mu=-1$ give?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bektoriala: puntua gehi bi norabideen konbinazio bat.', 'La vectorial: el punto más una combinación de las dos direcciones.', 'المتجهية: النقطة زائد تركيب من الاتجاهين.', 'The vector one: the point plus a combination of the two directions.'), math: same('$\\begin{gathered}(x,y,{z})=(1,0,2)\\\\ +\\lambda(1,1,0)+\\mu(0,2,-1)\\end{gathered}$') },
            { text: say('Koordenatuz koordenatu.', 'Coordenada a coordenada.', 'مركّبةً مركّبة.', 'Coordinate by coordinate.'), math: same('$x=1+\\lambda,\\ y=\\lambda+2\\mu,\\ {z}=2-\\mu$') },
            { text: say('$\\lambda=1$ eta $\\mu=-1$ denean:', 'Con $\\lambda=1$ y $\\mu=-1$:', 'مع $\\lambda=1$ و$\\mu=-1$:', 'With $\\lambda=1$ and $\\mu=-1$:'), math: same('$(1+1,1-2,2+1)=(2,-1,3)$') }
        ],
        takeaway: say('Plano bat $A$ puntu batek eta paraleloak ez diren bi norabidek zehazten dute: $(x,y,{z})=A+\\lambda\\vec{u}+\\mu\\vec{v}$. Bi parametro ditu; zuzenak, bat.', 'Un plano se fija con un punto $A$ y dos direcciones no paralelas: $(x,y,{z})=A+\\lambda\\vec{u}+\\mu\\vec{v}$. Tiene dos parámetros; una recta, uno.', 'يتحدد المستوى بنقطة $A$ واتجاهين غير متوازيين: $(x,y,{z})=A+\\lambda\\vec{u}+\\mu\\vec{v}$. له وسيطان؛ وللمستقيم وسيط واحد.', 'A plane is fixed by a point $A$ and two directions that are not parallel: $(x,y,{z})=A+\\lambda\\vec{u}+\\mu\\vec{v}$. It has two parameters; a line, one.'),
        figure: (language) => <PlaneParametricFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'plane-general',
        stage: 'planes',
        title: say('Ekuazio orokorra eta bektore normala', 'Ecuación general y vector normal', 'المعادلة العامة والمتجه الناظمي', 'General equation and normal vector'),
        goal: say('Plano baten ekuazio orokorra, $Ax+By+C{z}+D=0$, aurkitzea bektore normalarekin, eta ekuazio horretan normala irakurtzea.', 'Hallar la ecuación general $Ax+By+C{z}+D=0$ de un plano con su vector normal, y leer el normal en ella.', 'إيجاد المعادلة العامة لمستوى $Ax+By+C{z}+D=0$ بمتجهه الناظمي، وقراءة الناظم فيها.', 'Find the general equation $Ax+By+C{z}+D=0$ of a plane with its normal vector, and read the normal in it.'),
        needs: [GENERAL_NORMAL, CROSS_PRODUCT],
        problem: say('Aurkitu $A(1,0,2)$ puntutik $(1,1,0)$ eta $(0,2,-1)$ norabideekin pasatzen den planoaren ekuazio orokorra.', 'Halla la ecuación general del plano por $A(1,0,2)$ con direcciones $(1,1,0)$ y $(0,2,-1)$.', 'أوجد المعادلة العامة للمستوى المار بـ $A(1,0,2)$ باتجاهي $(1,1,0)$ و$(0,2,-1)$.', 'Find the general equation of the plane through $A(1,0,2)$ with directions $(1,1,0)$ and $(0,2,-1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Normala norabideen biderkadura bektoriala da.', 'El normal es el producto vectorial de las direcciones.', 'الناظم هو الجداء المتجهي للاتجاهين.', 'The normal is the cross product of the directions.'), math: same('$(1,1,0)\\times(0,2,-1)=(-1,1,2)$') },
            { text: say('Koefizienteak normala dira.', 'Los coeficientes son el normal.', 'المعاملات هي الناظم.', 'The coefficients are the normal.'), math: same('$-x+y+2{z}+D=0$') },
            { text: say('$D$, $A$ puntuarekin.', '$D$ con el punto $A$.', '$D$ بالنقطة $A$.', '$D$ with the point $A$.'), math: same('$-1+0+4+D=0\\ \\to\\ D=-3$') }
        ],
        takeaway: say('Ekuazio orokorra $Ax+By+C{z}+D=0$ da, $\\vec{n}=(A,B,C)$ planoarekiko perpendikularra izanik. Normala planoko bi norabideren biderkadura bektoriala da, eta $D$ puntu bat ordezkatuz ateratzen da.', 'La ecuación general es $Ax+By+C{z}+D=0$, con $\\vec{n}=(A,B,C)$ perpendicular al plano. El normal es el producto vectorial de dos direcciones del plano, y $D$ sale al sustituir un punto.', 'المعادلة العامة هي $Ax+By+C{z}+D=0$ حيث $\\vec{n}=(A,B,C)$ عمودي على المستوى. والناظم هو الجداء المتجهي لاتجاهين من المستوى، و$D$ يأتي من تعويض نقطة.', 'The general equation is $Ax+By+C{z}+D=0$, with $\\vec{n}=(A,B,C)$ perpendicular to the plane. The normal is the cross product of two directions of the plane, and $D$ comes from putting in a point.'),
        figure: (language) => <PlaneGeneralFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'plane-three-points',
        stage: 'planes',
        title: say('Hiru puntutatik pasatzen den planoa', 'Plano por tres puntos', 'المستوى المار بثلاث نقاط', 'The plane through three points'),
        goal: say('Lerrokatuta ez dauden hiru puntutatik, edo zuzen batetik eta kanpoko puntu batetik, pasatzen den planoa aurkitzea.', 'Hallar el plano que pasa por tres puntos no alineados, o por una recta y un punto de fuera.', 'إيجاد المستوى المار بثلاث نقاط ليست على استقامة واحدة، أو بمستقيم ونقطة خارجه.', 'Find the plane through three non-collinear points, or through a line and a point off it.'),
        needs: [COPLANAR],
        problem: say('Aurkitu $A(1,0,0)$, $B(0,2,0)$ eta $C(0,0,3)$ puntuetatik pasatzen den planoa.', 'Halla el plano que pasa por $A(1,0,0)$, $B(0,2,0)$ y $C(0,0,3)$.', 'أوجد المستوى المار بـ $A(1,0,0)$ و$B(0,2,0)$ و$C(0,0,3)$.', 'Find the plane through $A(1,0,0)$, $B(0,2,0)$ and $C(0,0,3)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bi norabide $A$ puntutik.', 'Dos direcciones desde $A$.', 'اتجاهان من $A$.', 'Two directions from $A$.'), math: same('$\\overrightarrow{AB}=(-1,2,0)\\qquad\\overrightarrow{AC}=(-1,0,3)$') },
            { text: say('Normala.', 'El normal.', 'الناظم.', 'The normal.'), math: same('$\\overrightarrow{AB}\\times\\overrightarrow{AC}=(6,3,2)$') },
            { text: say('$D$, $A$ puntuarekin.', '$D$ con el punto $A$.', '$D$ بالنقطة $A$.', '$D$ with the point $A$.'), math: same('$6+0+0+D=0\\ \\to\\ 6x+3y+2{z}-6=0$') }
        ],
        takeaway: say('Lerrokatuta ez dauden hiru puntutatik plano bakar bat pasatzen da: $\\overrightarrow{AB}$ eta $\\overrightarrow{AC}$ haren norabideak dira, eta haien biderkadura bektoriala normala. Hirurak lerrokatuta badaude, ez dago plano bakarrik.', 'Por tres puntos no alineados pasa un único plano: $\\overrightarrow{AB}$ y $\\overrightarrow{AC}$ son sus direcciones y su producto vectorial, el normal. Si los tres están alineados, no hay un único plano.', 'يمر بثلاث نقاط ليست على استقامة واحدة مستوى واحد: $\\overrightarrow{AB}$ و$\\overrightarrow{AC}$ اتجاهاه وجداؤهما المتجهي الناظم. وإذا كانت الثلاث على استقامة واحدة فلا مستوى وحيد.', 'Through three non-collinear points passes a single plane: $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$ are its directions and their cross product, the normal. If the three are collinear, there is no single plane.'),
        figure: (language) => <ThreePointsFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 3. Two lines ---------- */
    {
        id: 'lines-parallel',
        stage: 'two-lines',
        title: say('Zuzen paraleloak edo bat datozenak', 'Rectas paralelas o coincidentes', 'مستقيمات متوازية أو منطبقة', 'Parallel or coincident lines'),
        goal: say('Norabide-bektoreak proportzionalak dituzten bi zuzen paraleloak ala bat datozenak diren erabakitzea.', 'Decidir si dos rectas con directores proporcionales son paralelas o coincidentes.', 'تقرير هل مستقيمان متجها توجيههما متناسبان متوازيان أم منطبقان.', 'Decide whether two lines with proportional direction vectors are parallel or coincident.'),
        needs: [RELATIVE_POSITION],
        problem: say('$r$: $(1,0,2)+t(2,-1,3)$ eta $s$: $(3,-1,5)+\\lambda(-4,2,-6)$. Paraleloak ala bat datozenak?', '$r$: $(1,0,2)+t(2,-1,3)$ y $s$: $(3,-1,5)+\\lambda(-4,2,-6)$. ¿Paralelas o coincidentes?', '$r$: ‏$(1,0,2)+t(2,-1,3)$ و$s$: ‏$(3,-1,5)+\\lambda(-4,2,-6)$. متوازيان أم منطبقان؟', '$r$: $(1,0,2)+t(2,-1,3)$ and $s$: $(3,-1,5)+\\lambda(-4,2,-6)$. Parallel or coincident?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Norabideak proportzionalak dira.', 'Los directores son proporcionales.', 'متجها التوجيه متناسبان.', 'The directions are proportional.'), math: same('$(-4,2,-6)=-2\\,(2,-1,3)$') },
            { text: say('$(3,-1,5)$ puntua $r$ zuzenean dago?', '¿Está $(3,-1,5)$ en $r$?', 'هل تقع $(3,-1,5)$ على $r$؟', 'Is $(3,-1,5)$ on $r$?'), math: same('$1+2t=3\\ \\to\\ t=1\\ \\to\\ (3,-1,5)$') },
            { text: say('Bai: bat datoz.', 'Sí: coinciden.', 'نعم: منطبقان.', 'Yes: they coincide.'), math: same('$r=s$') }
        ],
        takeaway: say('Norabide proportzionalak dituzten bi zuzen paraleloak edo bat datozenak dira. Zuzen bateko puntu bat bestean badago, bat datoz; bestela, paraleloak dira.', 'Dos rectas con directores proporcionales son paralelas o coincidentes. Si un punto de una está en la otra, coinciden; si no, son paralelas.', 'المستقيمان اللذان متجها توجيههما متناسبان متوازيان أو منطبقان. فإن وقعت نقطة من أحدهما على الآخر فهما منطبقان، وإلا فمتوازيان.', 'Two lines with proportional directions are parallel or coincident. If a point of one is on the other, they coincide; if not, they are parallel.'),
        figure: (language) => <ParallelLinesFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'lines-cross',
        stage: 'two-lines',
        title: say('Ebakitzen dira ala gurutzatzen?', '¿Se cortan o se cruzan?', 'متقاطعان أم متخالفان؟', 'Intersecting or skew?'),
        goal: say('Paraleloak ez diren bi zuzen ebakitzen diren ala gurutzatzen diren erabakitzea, $[\\overrightarrow{AB},\\vec{u},\\vec{v}]$ biderkadura mistoarekin.', 'Decidir si dos rectas no paralelas se cortan o se cruzan con el producto mixto $[\\overrightarrow{AB},\\vec{u},\\vec{v}]$.', 'تقرير هل مستقيمان غير متوازيين متقاطعان أم متخالفان بالجداء المختلط $[\\overrightarrow{AB},\\vec{u},\\vec{v}]$.', 'Decide whether two lines that are not parallel intersect or are skew with the scalar triple product $[\\overrightarrow{AB},\\vec{u},\\vec{v}]$.'),
        needs: [COPLANAR],
        problem: say('$r$: $(1,0,0)+t(1,1,0)$ eta $s$: $(0,1,1)+\\lambda(0,1,1)$. Ebakitzen dira ala gurutzatzen?', '$r$: $(1,0,0)+t(1,1,0)$ y $s$: $(0,1,1)+\\lambda(0,1,1)$. ¿Se cortan o se cruzan?', '$r$: ‏$(1,0,0)+t(1,1,0)$ و$s$: ‏$(0,1,1)+\\lambda(0,1,1)$. متقاطعان أم متخالفان؟', '$r$: $(1,0,0)+t(1,1,0)$ and $s$: $(0,1,1)+\\lambda(0,1,1)$. Do they intersect or are they skew?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Norabideak ez dira proportzionalak: ez dira paraleloak.', 'Los directores no son proporcionales: no son paralelas.', 'متجها التوجيه غير متناسبين: ليسا متوازيين.', 'The directions are not proportional: they are not parallel.'), math: same('$\\vec{u}=(1,1,0),\\ \\vec{v}=(0,1,1)$') },
            { text: say('Puntu batetik bestera doan bektorea.', 'El vector de un punto al otro.', 'المتجه من نقطة إلى الأخرى.', 'The vector from one point to the other.'), math: same('$\\overrightarrow{AB}=(-1,1,1)$') },
            { text: say('Biderkadura mistoa ez da 0: gurutzatu egiten dira.', 'El producto mixto no es 0: se cruzan.', 'الجداء المختلط ليس 0: متخالفان.', 'The scalar triple product is not 0: they are skew.'), math: same('$\\begin{vmatrix}-1&1&1\\\\1&1&0\\\\0&1&1\\end{vmatrix}=-1+0+1-0+0-1=-1$') }
        ],
        takeaway: say('Norabideak paraleloak ez badira, zuzenak ebakitzen dira $[\\overrightarrow{AB},\\vec{u},\\vec{v}]=0$ denean, eta gurutzatu egiten dira 0 ez denean.', 'Si los directores no son paralelos, las rectas se cortan cuando $[\\overrightarrow{AB},\\vec{u},\\vec{v}]=0$ y se cruzan cuando no lo es.', 'إذا لم يتوازَ متجها التوجيه تقاطع المستقيمان عندما $[\\overrightarrow{AB},\\vec{u},\\vec{v}]=0$ وتخالفا عندما لا يكون كذلك.', 'If the directions are not parallel, the lines intersect when $[\\overrightarrow{AB},\\vec{u},\\vec{v}]=0$ and are skew when it is not.'),
        figure: (language) => <CrossingLinesFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'lines-intersection',
        stage: 'two-lines',
        title: say('Bi zuzenen ebaki-puntua', 'Punto de corte de dos rectas', 'نقطة تقاطع مستقيمين', 'Where two lines meet'),
        goal: say('Bi zuzen ebakitzaileren ebaki-puntua aurkitzea, haien parametrikoak berdinduz.', 'Hallar el punto de corte de dos rectas secantes igualando sus paramétricas.', 'إيجاد نقطة تقاطع مستقيمين متقاطعين بمساواة معادلاتهما الوسيطية.', 'Find the point where two intersecting lines meet by setting their parametric equations equal.'),
        problem: say('Non ebakitzen dira $r$: $(1,2,0)+t(1,0,1)$ eta $s$: $(0,1,1)+\\lambda(2,1,0)$?', '¿Dónde se cortan $r$: $(1,2,0)+t(1,0,1)$ y $s$: $(0,1,1)+\\lambda(2,1,0)$?', 'أين يتقاطع $r$: ‏$(1,2,0)+t(1,0,1)$ و$s$: ‏$(0,1,1)+\\lambda(2,1,0)$؟', 'Where do $r$: $(1,2,0)+t(1,0,1)$ and $s$: $(0,1,1)+\\lambda(2,1,0)$ meet?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Berdindu koordenatuz koordenatu.', 'Iguala coordenada a coordenada.', 'ساوِ مركّبةً مركّبة.', 'Set equal coordinate by coordinate.'), math: same('$\\begin{cases}1+t=2\\lambda\\\\ 2=1+\\lambda\\\\ t=1\\end{cases}$') },
            { text: say('Bigarrenak eta hirugarrenak:', 'La segunda y la tercera:', 'الثانية والثالثة:', 'The second and the third:'), math: same('$\\lambda=1\\qquad t=1$') },
            { text: say('Lehena betetzen da, $1+1=2$. Puntua:', 'La primera se cumple, $1+1=2$. El punto:', 'تتحقق الأولى، $1+1=2$. النقطة:', 'The first holds, $1+1=2$. The point:'), math: same('$(1+1,2,0+1)=(2,2,1)$') }
        ],
        takeaway: say('Bi zuzen ebakitzeko, haien parametrikoak berdintzen dira bi parametro desberdinekin. Bi ekuaziok $t$ eta $\\lambda$ ematen dituzte; hirugarrena betetzen bada, ebaki-puntua dago.', 'Para cortar dos rectas se igualan sus paramétricas con dos parámetros distintos. Dos ecuaciones dan $t$ y $\\lambda$; si la tercera se cumple, hay punto de corte.', 'لتقاطع مستقيمين نساوي معادلاتهما الوسيطية بوسيطين مختلفين. معادلتان تعطيان $t$ و$\\lambda$؛ وإن تحققت الثالثة فهناك نقطة تقاطع.', 'To intersect two lines, set their parametric equations equal with two different parameters. Two equations give $t$ and $\\lambda$; if the third holds, there is a meeting point.'),
        figure: (language) => <MeetingLinesFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 4. A line and a plane ---------- */
    {
        id: 'line-plane-position',
        stage: 'line-plane',
        title: say('Zuzenaren eta planoaren posizioa', 'Posición de recta y plano', 'وضع المستقيم والمستوى', 'Position of a line and a plane'),
        goal: say('Zuzen bat eta plano bat ebakitzaileak, paraleloak ala bata bestearen barruan dauden erabakitzea, $\\vec{u}\\cdot\\vec{n}$ eta puntu batekin.', 'Decidir si una recta y un plano son secantes, paralelos o si la recta está contenida, con $\\vec{u}\\cdot\\vec{n}$ y un punto.', 'تقرير هل مستقيم ومستوى متقاطعان أم متوازيان أم المستقيم محتوى، بـ $\\vec{u}\\cdot\\vec{n}$ ونقطة.', 'Decide whether a line and a plane are secant, parallel or the line lies in the plane, with $\\vec{u}\\cdot\\vec{n}$ and a point.'),
        needs: [ANGLE_3D],
        problem: say('$r$: $(1,0,1)+t(1,2,-1)$ eta $\\pi$: $x+y+3{z}=4$. Zer posizio dute?', '$r$: $(1,0,1)+t(1,2,-1)$ y $\\pi$: $x+y+3{z}=4$. ¿Qué posición tienen?', '$r$: ‏$(1,0,1)+t(1,2,-1)$ و$\\pi$: ‏$x+y+3{z}=4$. ما وضعهما؟', '$r$: $(1,0,1)+t(1,2,-1)$ and $\\pi$: $x+y+3{z}=4$. What is their position?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Norabidea bider normala.', 'Director por normal.', 'متجه التوجيه في الناظم.', 'Direction times normal.'), math: same('$\\vec{u}\\cdot\\vec{n}=1+2-3=0$') },
            { text: say('Paraleloa edo barruan: $(1,0,1)$ puntua $\\pi$ planoan dago?', 'Paralela o contenida: ¿está $(1,0,1)$ en $\\pi$?', 'موازٍ أو محتوى: هل تقع $(1,0,1)$ في $\\pi$؟', 'Parallel or inside: is $(1,0,1)$ on $\\pi$?'), math: same('$1+0+3=4$') },
            { text: say('Bai: zuzena planoan dago.', 'Sí: la recta está contenida en el plano.', 'نعم: المستقيم محتوى في المستوى.', 'Yes: the line lies in the plane.'), math: same('$r\\subset\\pi$') }
        ],
        takeaway: say('$\\vec{u}\\cdot\\vec{n}\\neq 0$ bada, zuzenak planoa puntu batean ebakitzen du. $\\vec{u}\\cdot\\vec{n}=0$ bada, paraleloa da edo planoan dago: zuzeneko puntu batek erabakitzen du.', 'Si $\\vec{u}\\cdot\\vec{n}\\neq 0$, la recta corta al plano en un punto. Si $\\vec{u}\\cdot\\vec{n}=0$, es paralela o está contenida: lo decide un punto de la recta.', 'إذا كان $\\vec{u}\\cdot\\vec{n}\\neq 0$ قطع المستقيم المستوى في نقطة. وإذا كان $\\vec{u}\\cdot\\vec{n}=0$ فهو موازٍ أو محتوى: تحسم ذلك نقطة من المستقيم.', 'If $\\vec{u}\\cdot\\vec{n}\\neq 0$, the line meets the plane at a point. If $\\vec{u}\\cdot\\vec{n}=0$, it is parallel or lies in it: a point of the line decides.'),
        figure: (language) => <LineInPlaneFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'line-plane-point',
        stage: 'line-plane',
        title: say('Zuzenaren eta planoaren ebaki-puntua', 'Punto de corte de recta y plano', 'نقطة تقاطع المستقيم والمستوى', 'Where a line meets a plane'),
        goal: say('Zuzen batek plano bat non zeharkatzen duen aurkitzea, parametrikoak planoaren ekuazioan ordezkatuz.', 'Hallar dónde atraviesa una recta a un plano sustituyendo sus paramétricas en la ecuación del plano.', 'إيجاد مكان اختراق مستقيم لمستوى بتعويض معادلاته الوسيطية في معادلة المستوى.', 'Find where a line goes through a plane by putting its parametric equations into the equation of the plane.'),
        problem: say('Non ebakitzen du $r$: $x=1+t$, $y=2-t$, ${z}=3t$ zuzenak $\\pi$: $x+2y+{z}=9$ planoa?', '¿Dónde corta $r$: $x=1+t$, $y=2-t$, ${z}=3t$ al plano $\\pi$: $x+2y+{z}=9$?', 'أين يقطع $r$: ‏$x=1+t$ و$y=2-t$ و${z}=3t$ المستوى $\\pi$: ‏$x+2y+{z}=9$؟', 'Where does $r$: $x=1+t$, $y=2-t$, ${z}=3t$ meet the plane $\\pi$: $x+2y+{z}=9$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordezkatu planoan.', 'Sustituye en el plano.', 'عوّض في المستوى.', 'Put it into the plane.'), math: same('$(1+t)+2(2-t)+3t=9$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حُلّ.', 'Solve.'), math: same('$5+2t=9\\ \\to\\ t=2$') },
            { text: say('Puntua.', 'El punto.', 'النقطة.', 'The point.'), math: same('$(1+2,2-2,6)=(3,0,6)$') }
        ],
        takeaway: say('Parametrikoak planoan ordezkatzean, $t$ ezezaguneko ekuazio bat geratzen da; haren soluzioa zuzenean ordezkatuz, ebaki-puntua ateratzen da.', 'Al sustituir las paramétricas en el plano queda una ecuación en $t$; su solución, llevada a la recta, da el punto de corte.', 'بتعويض المعادلات الوسيطية في المستوى تبقى معادلة في $t$؛ وحلها، بإدخاله في المستقيم، يعطي نقطة التقاطع.', 'Putting the parametric equations into the plane leaves an equation in $t$; its solution, put into the line, gives the meeting point.'),
        figure: (language) => <LinePlanePointFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'pencil-planes',
        stage: 'line-plane',
        title: say('Plano-sorta', 'Haz de planos', 'حزمة المستويات', 'Pencil of planes'),
        goal: say('Zuzen bat duten planoak idaztea, $\\pi_1+k\\,\\pi_2=0$, eta haien artean baldintza bat betetzen duena aurkitzea.', 'Escribir los planos que contienen una recta, $\\pi_1+k\\,\\pi_2=0$, y hallar entre ellos el que cumple una condición.', 'كتابة المستويات التي تحوي مستقيمًا $\\pi_1+k\\,\\pi_2=0$ وإيجاد الذي يحقق شرطًا منها.', 'Write the planes holding a line, $\\pi_1+k\\,\\pi_2=0$, and find among them the one that meets a condition.'),
        needs: [PENCIL_LINES],
        problem: say('Aurkitu $r$: $x-y=1$, $y+{z}=2$ zuzena duen eta $P(1,1,0)$ puntutik pasatzen den planoa.', 'Halla el plano que contiene a $r$: $x-y=1$, $y+{z}=2$ y pasa por $P(1,1,0)$.', 'أوجد المستوى الذي يحوي $r$: ‏$x-y=1$ و$y+{z}=2$ ويمر بـ $P(1,1,0)$.', 'Find the plane holding $r$: $x-y=1$, $y+{z}=2$ and passing through $P(1,1,0)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$r$ zuzenaren plano-sorta.', 'El haz de planos de $r$.', 'حزمة مستويات $r$.', 'The pencil of planes of $r$.'), math: same('$(x-y-1)+k\\,(y+{z}-2)=0$') },
            { text: say('Ordezkatu $P$.', 'Sustituye $P$.', 'عوّض $P$.', 'Put in $P$.'), math: same('$(1-1-1)+k\\,(1+0-2)=0\\ \\to\\ k=-1$') },
            { text: say('Sinplifikatu.', 'Simplifica.', 'بسّط.', 'Simplify.'), math: same('$x-2y-{z}+1=0$') }
        ],
        takeaway: say('$\\pi_1=\\pi_2=0$ zuzena duten planoak $\\pi_1+k\\,\\pi_2=0$ dira (eta $\\pi_2$). Puntu batetik pasatzen dena aurkitzeko, puntua ordezkatu eta $k$ askatzen da.', 'Los planos que contienen la recta $\\pi_1=\\pi_2=0$ son $\\pi_1+k\\,\\pi_2=0$ (y $\\pi_2$). Para el que pasa por un punto, se sustituye el punto y se despeja $k$.', 'المستويات التي تحوي المستقيم $\\pi_1=\\pi_2=0$ هي $\\pi_1+k\\,\\pi_2=0$ (و$\\pi_2$). وللمار منها بنقطة نعوّض النقطة ونعزل $k$.', 'The planes holding the line $\\pi_1=\\pi_2=0$ are $\\pi_1+k\\,\\pi_2=0$ (and $\\pi_2$). For the one through a point, put in the point and solve for $k$.'),
        figure: (language) => <PencilFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 5. Position of planes ---------- */
    {
        id: 'two-planes',
        stage: 'planes-position',
        title: say('Bi planoren posizioa', 'Posición de dos planos', 'وضع مستويين', 'Position of two planes'),
        goal: say('Bi plano ebakitzaileak, paraleloak ala bat datozenak diren erabakitzea, haien koefizienteak konparatuz.', 'Decidir si dos planos son secantes, paralelos o coincidentes comparando sus coeficientes.', 'تقرير هل مستويان متقاطعان أم متوازيان أم منطبقان بمقارنة معاملاتهما.', 'Decide whether two planes are secant, parallel or coincident by comparing their coefficients.'),
        problem: say('$\\pi_1$: $2x-y+3{z}=1$ eta $\\pi_2$: $-4x+2y-6{z}=5$. Nolakoak dira?', '$\\pi_1$: $2x-y+3{z}=1$ y $\\pi_2$: $-4x+2y-6{z}=5$. ¿Cómo son?', '$\\pi_1$: ‏$2x-y+3{z}=1$ و$\\pi_2$: ‏$-4x+2y-6{z}=5$. ما وضعهما؟', '$\\pi_1$: $2x-y+3{z}=1$ and $\\pi_2$: $-4x+2y-6{z}=5$. How are they?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Normalak proportzionalak dira.', 'Los normales son proporcionales.', 'الناظمان متناسبان.', 'The normals are proportional.'), math: same('$(-4,2,-6)=-2\\,(2,-1,3)$') },
            { text: say('Gai askea ez dago proportzio berean.', 'El término independiente no va en la misma proporción.', 'الحد الثابت ليس بالتناسب نفسه.', 'The constant term is not in the same proportion.'), math: same('$-2\\cdot 1=-2\\neq 5$') },
            { text: say('Paraleloak dira.', 'Son paralelos.', 'إنهما متوازيان.', 'They are parallel.'), math: same('$\\pi_1\\parallel\\pi_2$') }
        ],
        takeaway: say('Normalak proportzionalak ez badira, planoek zuzen batean ebakitzen dute elkar. Proportzionalak badira, paraleloak dira, edo bat datoz ekuazio osoa proportzio berean badago.', 'Normales no proporcionales: los planos se cortan en una recta. Proporcionales: paralelos, o coincidentes si toda la ecuación va en la misma proporción.', 'ناظمان غير متناسبين: يتقاطع المستويان في مستقيم. متناسبان: متوازيان، أو منطبقان إذا كانت المعادلة كلها بالتناسب نفسه.', 'Normals not proportional: the planes meet in a line. Proportional: parallel, or coincident if the whole equation is in the same proportion.'),
        figure: (language) => <ParallelPlanesFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'three-planes',
        stage: 'planes-position',
        title: say('Hiru plano: heinak', 'Tres planos: rangos', 'ثلاثة مستويات: الرتب', 'Three planes: ranks'),
        goal: say('Hiru planoren posizioa erabakitzea, haien sistemaren $M$ eta $M^*$ matrizeen heinekin.', 'Decidir la posición de tres planos con los rangos de las matrices $M$ y $M^*$ de su sistema.', 'تقرير وضع ثلاثة مستويات برتبتي المصفوفتين $M$ و$M^*$ لنظامها.', 'Decide the position of three planes with the ranks of the matrices $M$ and $M^*$ of their system.'),
        needs: [CLASSIFY_SYSTEMS],
        problem: say('Nola ebakitzen dute elkar $x+y+{z}=3$, $x-y=0$ eta $x+{z}=2$ planoek?', '¿Cómo se cortan los planos $x+y+{z}=3$, $x-y=0$ y $x+{z}=2$?', 'كيف تتقاطع المستويات $x+y+{z}=3$ و$x-y=0$ و$x+{z}=2$؟', 'How do the planes $x+y+{z}=3$, $x-y=0$ and $x+{z}=2$ meet?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$M$ matrizearen determinantea.', 'El determinante de $M$.', 'محدد $M$.', 'The determinant of $M$.'), math: same('$\\begin{gathered}\\begin{vmatrix}1&1&1\\\\1&-1&0\\\\1&0&1\\end{vmatrix}=-1+0+0+1-0-1\\\\ =-1\\end{gathered}$') },
            { text: say('$\\operatorname{rg}M=3$: puntu bakarra. Bigarrenetik eta hirugarrenetik:', '$\\operatorname{rg}M=3$: un solo punto. De la segunda y la tercera:', '$\\operatorname{rg}M=3$: نقطة واحدة. من الثانية والثالثة:', '$\\operatorname{rg}M=3$: a single point. From the second and the third:'), math: same('$x=y\\qquad{z}=2-x$') },
            { text: say('Ordezkatu lehenengoan.', 'Sustituye en la primera.', 'عوّض في الأولى.', 'Put it into the first.'), math: same('$x+x+2-x=3\\ \\to\\ x=1\\ \\to\\ (1,1,1)$') }
        ],
        takeaway: say('Hiru plano: $\\operatorname{rg}M=3$ bada, puntu batean ebakitzen dira; $\\operatorname{rg}M=\\operatorname{rg}M^*=2$ bada, zuzen batean; $\\operatorname{rg}M<\\operatorname{rg}M^*$ bada, ez dute puntu komunik.', 'Tres planos: si $\\operatorname{rg}M=3$, se cortan en un punto; si $\\operatorname{rg}M=\\operatorname{rg}M^*=2$, en una recta; si $\\operatorname{rg}M<\\operatorname{rg}M^*$, no tienen puntos comunes.', 'ثلاثة مستويات: إذا كان $\\operatorname{rg}M=3$ تقاطعت في نقطة؛ وإذا كان $\\operatorname{rg}M=\\operatorname{rg}M^*=2$ ففي مستقيم؛ وإذا كان $\\operatorname{rg}M<\\operatorname{rg}M^*$ فلا نقاط مشتركة لها.', 'Three planes: if $\\operatorname{rg}M=3$, they meet at a point; if $\\operatorname{rg}M=\\operatorname{rg}M^*=2$, in a line; if $\\operatorname{rg}M<\\operatorname{rg}M^*$, they have no common point.'),
        figure: (language) => <ThreePlanesFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'planes-parameter',
        stage: 'planes-position',
        title: say('Planoak parametro batekin', 'Planos con un parámetro', 'مستويات بوسيط', 'Planes with a parameter'),
        goal: say('Parametro bat duten hiru planoren posizioa eztabaidatzea: $\\det M$ lehenik, eta gero heinak kasu berezietan.', 'Discutir la posición de tres planos con un parámetro: primero $\\det M$, y después los rangos en los casos especiales.', 'مناقشة وضع ثلاثة مستويات بوسيط: أولًا $\\det M$ ثم الرتب في الحالات الخاصة.', 'Analyse the position of three planes with a parameter: first $\\det M$, then the ranks in the special cases.'),
        needs: [PARAMETER_DISCUSSION],
        problem: say('$a$ parametroaren zein baliotarako ez dute elkar puntu bakar batean ebakitzen $x+y+{z}=1$, $x+2y+{z}=2$ eta $x+y+a{z}=1$ planoek? Zer gertatzen da orduan?', '¿Para qué $a$ no se cortan en un solo punto $x+y+{z}=1$, $x+2y+{z}=2$ y $x+y+a{z}=1$? ¿Qué pasa entonces?', 'لأي $a$ لا تتقاطع $x+y+{z}=1$ و$x+2y+{z}=2$ و$x+y+a{z}=1$ في نقطة واحدة؟ وماذا يحدث عندئذ؟', 'For which $a$ do $x+y+{z}=1$, $x+2y+{z}=2$ and $x+y+a{z}=1$ not meet at a single point? What happens then?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$M$ matrizearen determinantea, Sarrusekin.', 'El determinante de $M$, con Sarrus.', 'محدد $M$ بقاعدة ساروس.', 'The determinant of $M$, with Sarrus.'), math: same('$\\begin{gathered}\\begin{vmatrix}1&1&1\\\\1&2&1\\\\1&1&a\\end{vmatrix}=2a+1+1-2-1-a\\\\ =a-1\\end{gathered}$') },
            { text: say('$a=1$ denean bakarrik da 0.', 'Solo vale 0 con $a=1$.', 'لا يساوي 0 إلا عندما $a=1$.', 'It is 0 only with $a=1$.'), math: same('$a-1=0\\ \\to\\ a=1$') },
            { text: say('$a=1$ denean hirugarrena lehena da: zuzen batean ebakitzen dute elkar.', 'Con $a=1$ el tercero es el primero: se cortan en una recta.', 'عندما $a=1$ يكون الثالث هو الأول: تتقاطع في مستقيم.', 'With $a=1$ the third is the first: they meet in a line.'), math: same('$\\operatorname{rg}M=\\operatorname{rg}M^*=2$') }
        ],
        takeaway: say('Parametro batekin: $\\det M\\neq 0$ bada, puntu bat. $\\det M=0$ egiten duten balioetan heinak konparatzen dira: zuzen bat $\\operatorname{rg}M=\\operatorname{rg}M^*=2$ bada; puntu komunik ez $\\operatorname{rg}M^*$ handiagoa bada.', 'Con un parámetro: si $\\det M\\neq 0$, un punto. En los valores con $\\det M=0$ se comparan los rangos: una recta si $\\operatorname{rg}M=\\operatorname{rg}M^*=2$; ningún punto común si $\\operatorname{rg}M^*$ es mayor.', 'مع وسيط: إذا كان $\\det M\\neq 0$ فنقطة. وفي القيم التي تجعل $\\det M=0$ نقارن الرتب: مستقيم إذا كان $\\operatorname{rg}M=\\operatorname{rg}M^*=2$؛ ولا نقطة مشتركة إذا كانت $\\operatorname{rg}M^*$ أكبر.', 'With a parameter: if $\\det M\\neq 0$, a point. For the values with $\\det M=0$, compare the ranks: a line if $\\operatorname{rg}M=\\operatorname{rg}M^*=2$; no common point if $\\operatorname{rg}M^*$ is greater.'),
        figure: (language) => <ParameterPlanesFigure language={language} />,
        figureAfterSteps: true
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const linesPlanesTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...linesPlanesLessonTexts[topic.id as LinesPlanesTopicId], ...linesPlanesLessonChecks[topic.id as LinesPlanesTopicId] }))
