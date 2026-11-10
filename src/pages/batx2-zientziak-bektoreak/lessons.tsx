import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { AngleFigure, BasisFigure, CombinationFigure, CoplanarFigure, CrossFigure, CrossOrderFigure, DependenceFigure, DotFigure, MidpointFigure, MixedBoxFigure, ProjectionFigure, SpacePointFigure, SpaceVectorFigure, TetraFigure, TriangleAreaFigure } from './figures'
import { spaceVectorsLessonChecks, type SpaceVectorsTopicId } from './lessonChecks'
import { spaceVectorsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Espazioko bektoreak · Batxilergoa 2 · Zientziak — stages and lessons.
   The scope follows unit 4 of Santillana 2.º Bachillerato Ciencias (the
   class book: points, the midpoint and the symmetric point come here)
   and unit 4 of Anaya Matemáticas II. What 1.º Bachillerato taught in the
   plane (operations, combinations, bases, the dot product) comes back in
   space with «Review first» links; linear dependence with the rank and
   the determinant, the cross product and the scalar triple product are
   new. The determinants are worked with the rule of Sarrus; the link to
   the 2.º Bachillerato determinants unit is added when the two branches
   meet (see docs/claude-notes/bektoreak-batx2z.md).
   ========================================================================== */

export type SpaceVectorsStageId = 'space' | 'dependence' | 'dot' | 'cross' | 'mixed'

export const spaceVectorsStages: UnitStage[] = [
    { id: 'space', tone: 'blue', title: { eu: 'Puntuak eta bektoreak espazioan', es: 'Puntos y vectores en el espacio', en: 'Points and vectors in space', ar: 'النقاط والمتجهات في الفضاء' } },
    { id: 'dependence', tone: 'violet', title: { eu: 'Mendekotasun lineala eta oinarriak', es: 'Dependencia lineal y bases', en: 'Linear dependence and bases', ar: 'الارتباط الخطي والأساسات' } },
    { id: 'dot', tone: 'mustard', title: { eu: 'Biderkadura eskalarra', es: 'Producto escalar', en: 'Dot product', ar: 'الجداء السلمي' } },
    { id: 'cross', tone: 'coral', title: { eu: 'Biderkadura bektoriala', es: 'Producto vectorial', en: 'Cross product', ar: 'الجداء المتجهي' } },
    { id: 'mixed', tone: 'green', title: { eu: 'Biderkadura mistoa', es: 'Producto mixto', en: 'Scalar triple product', ar: 'الجداء المختلط' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

const ORTHONORMAL = { unit: 'batx1-zientziak/vectores', topic: 'orthonormal', title: { eu: 'Oinarri ortonormala eta koordenatuak', es: 'Base ortonormal y coordenadas', en: 'Orthonormal basis and coordinates', ar: 'الأساس المتعامد المتجانس والمركّبات' } }
const FREE_VECTORS = { unit: 'batx1-zientziak/vectores', topic: 'free-vectors', title: { eu: 'Bektore finkoak eta askeak', es: 'Vectores fijos y libres', en: 'Fixed and free vectors', ar: 'المتجهات المقيّدة والحرة' } }
const CUBOID_DIAGONAL = { unit: 'dbh2/teorema-pitagoras', topic: 'box', title: { eu: 'Ortoedroaren eta kuboaren diagonala', es: 'La diagonal del ortoedro y del cubo', en: 'The diagonal of a cuboid and of a cube', ar: 'قطر متوازي المستطيلات والمكعب' } }
const MIDPOINT_PLANE = { unit: 'batx1-zientziak/geometria-analitica', topic: 'midpoint-symmetric', title: { eu: 'Erdiko puntua eta puntu simetrikoa', es: 'Punto medio y punto simétrico', en: 'Midpoint and symmetric point', ar: 'المنتصف والنقطة النظيرة' } }
const LINEAR_COMBINATION = { unit: 'batx1-zientziak/vectores', topic: 'linear-combination', title: { eu: 'Konbinazio lineala', es: 'Combinación lineal', en: 'Linear combinations', ar: 'التركيب الخطي' } }
const COLLINEAR = { unit: 'batx1-zientziak/geometria-analitica', topic: 'collinear', title: { eu: 'Lerrokatutako puntuak', es: 'Puntos alineados', en: 'Collinear points', ar: 'النقاط على استقامة واحدة' } }
const GAUSS = { unit: 'batx1-zientziak/sistemas', topic: 'gauss-method', title: { eu: 'Gaussen metodoa', es: 'El método de Gauss', en: 'Gaussian elimination', ar: 'طريقة غاوس' } }
const BASIS_COORDINATES = { unit: 'batx1-zientziak/vectores', topic: 'basis-coordinates', title: { eu: 'Oinarri bateko koordenatuak', es: 'Coordenadas en una base', en: 'Coordinates in a basis', ar: 'المركّبات في أساس' } }
const DOT_PROPERTIES = { unit: 'batx1-zientziak/vectores', topic: 'dot-properties', title: { eu: 'Biderkadura eskalarraren propietateak', es: 'Propiedades del producto escalar', en: 'Properties of the dot product', ar: 'خصائص الجداء السلمي' } }
const ANGLE_VECTORS = { unit: 'batx1-zientziak/vectores', topic: 'angle-vectors', title: { eu: 'Bi bektoreren angelua', es: 'Ángulo de dos vectores', en: 'The angle between two vectors', ar: 'زاوية متجهين' } }
const PERPENDICULAR_VECTORS = { unit: 'batx1-zientziak/vectores', topic: 'perpendicular-vectors', title: { eu: 'Bektore perpendikularrak', es: 'Vectores perpendiculares', en: 'Perpendicular vectors', ar: 'المتجهات المتعامدة' } }
const PROJECTION_PLANE = { unit: 'batx1-zientziak/vectores', topic: 'projection', title: { eu: 'Bektore baten proiekzioa beste baten gainean', es: 'Proyección de un vector sobre otro', en: 'Projecting a vector onto another', ar: 'إسقاط متجه على آخر' } }
const UNIT_VECTORS = { unit: 'batx1-zientziak/vectores', topic: 'modulus-unit', title: { eu: 'Modulua eta bektore unitarioak', es: 'Módulo y vectores unitarios', en: 'Magnitude and unit vectors', ar: 'الطول ومتجهات الوحدة' } }
const PYRAMID = { unit: 'dbh4-akademikoak/areas-volumenes-semejanza', topic: 'pyramid-cone-volume', title: { eu: 'Piramidea eta konoa', es: 'Pirámide y cono', en: 'Pyramid and cone', ar: 'الهرم والمخروط' } }

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Points and vectors in space ---------- */
    {
        id: 'space-points',
        stage: 'space',
        title: say('Puntuak espazioan', 'Puntos en el espacio', 'النقاط في الفضاء', 'Points in space'),
        goal: say('$P(x,y,z)$ puntu bat bere hiru koordenatuekin kokatzea, eta haren proiekzioak aurkitzea plano eta ardatz koordenatuetan.', 'Situar un punto $P(x,y,z)$ con sus tres coordenadas y hallar sus proyecciones sobre los planos y los ejes de coordenadas.', 'تحديد موقع نقطة $P(x,y,z)$ بإحداثياتها الثلاثة، وإيجاد مساقطها على المستويات والمحاور الإحداثية.', 'Place a point $P(x,y,z)$ with its three coordinates and find its projections onto the coordinate planes and axes.'),
        needs: [ORTHONORMAL],
        problem: say('$P(3,-2,4)$ puntua: zein da haren proiekzioa $XY$ planoan? Eta ${z}$ ardatzean? Zer distantziatara dago $XY$ planotik?', 'El punto $P(3,-2,4)$: ¿cuál es su proyección sobre el plano $XY$? ¿Y sobre el eje ${z}$? ¿A qué distancia está del plano $XY$?', 'النقطة $P(3,-2,4)$: ما مسقطها على المستوى $XY$؟ وعلى المحور ${z}$؟ وعلى أي بعد تقع من المستوى $XY$؟', 'The point $P(3,-2,4)$: what is its projection onto the plane $XY$? And onto the ${z}$ axis? How far is it from the plane $XY$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$XY$ planoan, ${z}$ altuera zero bihurtzen da.', 'Sobre el plano $XY$, la altura ${z}$ pasa a ser 0.', 'على المستوى $XY$ يصبح الارتفاع ${z}$ صفرًا.', 'On the plane $XY$, the height ${z}$ becomes 0.'), math: same('$P_{XY}=(3,-2,0)$') },
            { text: say('${z}$ ardatzean hirugarren koordenatua bakarrik geratzen da.', 'Sobre el eje ${z}$ solo queda la tercera coordenada.', 'على المحور ${z}$ يبقى الإحداثي الثالث فقط.', 'On the ${z}$ axis only the third coordinate is left.'), math: same('$P_z=(0,0,4)$') },
            { text: say('$XY$ planorako distantzia altuera da, balio absolutuan.', 'La distancia al plano $XY$ es la altura, en valor absoluto.', 'البعد عن المستوى $XY$ هو الارتفاع بالقيمة المطلقة.', 'The distance to the plane $XY$ is the height, in absolute value.'), math: same('$d(P,XY)=|4|=4$') }
        ],
        takeaway: say('Espazioko puntu batek hiru koordenatu ditu, $P(x,y,z)$: $|x|$, $|y|$ eta $|z|$ aldeko kutxa baten erpina da, jatorriaren aurrez aurrekoa. Plano edo ardatz koordenatu batean proiektatzea falta diren koordenatuak 0 jartzea da.', 'Un punto del espacio tiene tres coordenadas, $P(x,y,z)$: es el vértice opuesto al origen de una caja de lados $|x|$, $|y|$ y $|z|$. Proyectar sobre un plano o un eje de coordenadas es poner a 0 las coordenadas que faltan.', 'للنقطة في الفضاء ثلاثة إحداثيات $P(x,y,z)$: إنها رأس صندوق أضلاعه $|x|$ و$|y|$ و$|z|$، مقابل للأصل. والإسقاط على مستوى أو محور إحداثي هو جعل الإحداثيات الناقصة أصفارًا.', 'A point in space has three coordinates, $P(x,y,z)$: it is the corner opposite the origin of a box with sides $|x|$, $|y|$ and $|z|$. Projecting onto a coordinate plane or axis means setting the missing coordinates to 0.'),
        figure: (language) => <SpacePointFigure language={language} />
    },
    {
        id: 'space-vectors',
        stage: 'space',
        title: say('Bektoreak eta modulua espazioan', 'Vectores y módulo en el espacio', 'المتجهات وطولها في الفضاء', 'Vectors and magnitude in space'),
        goal: say('Espazioko bi punturen arteko $\\overrightarrow{AB}$ bektorearen koordenatuak eta modulua aurkitzea, $|\\vec{u}|=\\sqrt{u_1^2+u_2^2+u_3^2}$.', 'Hallar las coordenadas del vector $\\overrightarrow{AB}$ entre dos puntos del espacio y su módulo, $|\\vec{u}|=\\sqrt{u_1^2+u_2^2+u_3^2}$.', 'إيجاد مركّبات المتجه $\\overrightarrow{AB}$ بين نقطتين في الفضاء وطوله $|\\vec{u}|=\\sqrt{u_1^2+u_2^2+u_3^2}$.', 'Find the coordinates of the vector $\\overrightarrow{AB}$ between two points in space and its magnitude, $|\\vec{u}|=\\sqrt{u_1^2+u_2^2+u_3^2}$.'),
        needs: [FREE_VECTORS, CUBOID_DIAGONAL, UNIT_VECTORS],
        problem: say('$A(1,-2,0)$ eta $B(3,1,6)$ badira, aurkitu $\\overrightarrow{AB}$ eta haren modulua.', 'Con $A(1,-2,0)$ y $B(3,1,6)$, halla $\\overrightarrow{AB}$ y su módulo.', 'إذا كانت $A(1,-2,0)$ و$B(3,1,6)$ فأوجد $\\overrightarrow{AB}$ وطوله.', 'With $A(1,-2,0)$ and $B(3,1,6)$, find $\\overrightarrow{AB}$ and its magnitude.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Muturra ken jatorria, koordenatuz koordenatu.', 'Extremo menos origen, coordenada a coordenada.', 'الطرف ناقص الأصل، مركّبةً مركّبة.', 'End point minus start point, coordinate by coordinate.'), math: same('$\\overrightarrow{AB}=(3-1,1+2,6-0)=(2,3,6)$') },
            { text: say('Moduluak hiru karratuak batzen ditu.', 'El módulo suma los tres cuadrados.', 'يجمع الطول المربعات الثلاثة.', 'The magnitude adds the three squares.'), math: same('$|\\overrightarrow{AB}|=\\sqrt{2^2+3^2+6^2}$') },
            { text: say('Atera erro karratua.', 'Saca la raíz cuadrada.', 'استخرج الجذر التربيعي.', 'Take the square root.'), math: same('$\\sqrt{4+9+36}=\\sqrt{49}=7$') }
        ],
        takeaway: say('Espazioan, $\\overrightarrow{AB}=B-A$ bektoreak hiru koordenatu ditu, eta haren modulua osatzen duten kutxaren diagonala da: $|\\vec{u}|=\\sqrt{u_1^2+u_2^2+u_3^2}$.', 'En el espacio, $\\overrightarrow{AB}=B-A$ tiene tres coordenadas, y su módulo es la diagonal de la caja que forman: $|\\vec{u}|=\\sqrt{u_1^2+u_2^2+u_3^2}$.', 'في الفضاء للمتجه $\\overrightarrow{AB}=B-A$ ثلاث مركّبات، وطوله قطر الصندوق الذي تكوّنه: $|\\vec{u}|=\\sqrt{u_1^2+u_2^2+u_3^2}$.', 'In space, $\\overrightarrow{AB}=B-A$ has three coordinates, and its magnitude is the diagonal of the box they form: $|\\vec{u}|=\\sqrt{u_1^2+u_2^2+u_3^2}$.'),
        figure: (language) => <SpaceVectorFigure language={language} />
    },
    {
        id: 'midpoint-symmetric',
        stage: 'space',
        title: say('Erdiko puntua eta simetrikoa espazioan', 'Punto medio y simétrico en el espacio', 'المنتصف والنظيرة في الفضاء', 'Midpoint and symmetric point in space'),
        goal: say('Zuzenki baten erdiko puntua aurkitzea, $M=\\frac{A+B}{2}$, eta puntu baten simetrikoa beste batekiko, $P\'=2M-P$.', 'Hallar el punto medio de un segmento, $M=\\frac{A+B}{2}$, y el simétrico de un punto respecto de otro, $P\'=2M-P$.', 'إيجاد منتصف قطعة $M=\\frac{A+B}{2}$، ونظيرة نقطة بالنسبة إلى أخرى $P\'=2M-P$.', 'Find the midpoint of a segment, $M=\\frac{A+B}{2}$, and the symmetric of a point with respect to another, $P\'=2M-P$.'),
        needs: [MIDPOINT_PLANE],
        problem: say('Aurkitu $A(0,-2,3)$ eta $B(2,2,1)$ puntuen $M$ erdiko puntua, eta $P(3,1,0)$ puntuaren simetrikoa $M$ puntuarekiko.', 'Halla el punto medio $M$ de $A(0,-2,3)$ y $B(2,2,1)$, y el simétrico de $P(3,1,0)$ respecto de $M$.', 'أوجد المنتصف $M$ للنقطتين $A(0,-2,3)$ و$B(2,2,1)$، ونظيرة $P(3,1,0)$ بالنسبة إلى $M$.', 'Find the midpoint $M$ of $A(0,-2,3)$ and $B(2,2,1)$, and the symmetric of $P(3,1,0)$ with respect to $M$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Koordenatu bakoitzaren batezbestekoa.', 'La media de cada coordenada.', 'متوسط كل إحداثي.', 'The average of each coordinate.'), math: same('$M=\\left(\\frac{0+2}{2},\\frac{-2+2}{2},\\frac{3+1}{2}\\right)=(1,0,2)$') },
            { text: say('$M$ puntua $P$ eta haren $P\'$ simetrikoaren erdiko puntua da.', '$M$ es el punto medio de $P$ y su simétrico $P\'$.', '$M$ منتصف $P$ ونظيرتها $P\'$.', '$M$ is the midpoint of $P$ and its symmetric point $P\'$.'), math: same('$P\'=2M-P$') },
            { text: say('Koordenatuz koordenatu.', 'Coordenada a coordenada.', 'مركّبةً مركّبة.', 'Coordinate by coordinate.'), math: same('$P\'=(2-3,0-1,4-0)=(-1,-1,4)$') }
        ],
        takeaway: say('Erdiko puntua koordenatuen batezbestekoa da, $M=\\frac{A+B}{2}$. $P$ puntuaren simetrikoa $M$ puntuarekiko $P\'=2M-P$ da, $M$ puntua $P$ eta $P\'$ puntuen erdian dagoelako.', 'El punto medio es la media de las coordenadas, $M=\\frac{A+B}{2}$. El simétrico de $P$ respecto de $M$ es $P\'=2M-P$, porque $M$ queda en medio de $P$ y $P\'$.', 'المنتصف متوسط الإحداثيات $M=\\frac{A+B}{2}$. ونظيرة $P$ بالنسبة إلى $M$ هي $P\'=2M-P$، لأن $M$ تقع في منتصف $P$ و$P\'$.', 'The midpoint is the average of the coordinates, $M=\\frac{A+B}{2}$. The symmetric of $P$ with respect to $M$ is $P\'=2M-P$, because $M$ lies halfway between $P$ and $P\'$.'),
        figure: (language) => <MidpointFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 2. Linear dependence and bases ---------- */
    {
        id: 'combination-3d',
        stage: 'dependence',
        title: say('Eragiketak eta konbinazio lineala', 'Operaciones y combinación lineal', 'العمليات والتركيب الخطي', 'Operations and linear combinations'),
        goal: say('Espazioko bektoreekin eragiketak egitea, eta sistema batekin erabakitzea bektore bat beste biren konbinazio lineala den, $\\vec{w}=a\\vec{u}+b\\vec{v}$.', 'Operar con vectores del espacio y decidir con un sistema si un vector es combinación lineal de otros dos, $\\vec{w}=a\\vec{u}+b\\vec{v}$.', 'إجراء العمليات على متجهات الفضاء، وتقرير هل متجه تركيب خطي لمتجهين آخرين $\\vec{w}=a\\vec{u}+b\\vec{v}$ بواسطة نظام.', 'Operate with vectors in space and decide with a system whether a vector is a linear combination of two others, $\\vec{w}=a\\vec{u}+b\\vec{v}$.'),
        needs: [LINEAR_COMBINATION, COLLINEAR],
        problem: say('$\\vec{u}=(-1,0,2)$ eta $\\vec{v}=(0,1,-1)$ badira, $\\vec{w}=(-2,3,1)$ bektorea $\\vec{u}$ eta $\\vec{v}$ bektoreen konbinazio lineala da?', 'Con $\\vec{u}=(-1,0,2)$ y $\\vec{v}=(0,1,-1)$, ¿es $\\vec{w}=(-2,3,1)$ combinación lineal de $\\vec{u}$ y $\\vec{v}$?', 'إذا كان $\\vec{u}=(-1,0,2)$ و$\\vec{v}=(0,1,-1)$، فهل $\\vec{w}=(-2,3,1)$ تركيب خطي لـ $\\vec{u}$ و$\\vec{v}$؟', 'With $\\vec{u}=(-1,0,2)$ and $\\vec{v}=(0,1,-1)$, is $\\vec{w}=(-2,3,1)$ a linear combination of $\\vec{u}$ and $\\vec{v}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Planteatu $a\\vec{u}+b\\vec{v}=\\vec{w}$: hiru ekuazio eta bi ezezagun.', 'Plantea $a\\vec{u}+b\\vec{v}=\\vec{w}$: tres ecuaciones y dos incógnitas.', 'اكتب $a\\vec{u}+b\\vec{v}=\\vec{w}$: ثلاث معادلات ومجهولان.', 'Set up $a\\vec{u}+b\\vec{v}=\\vec{w}$: three equations and two unknowns.'), math: same('$\\begin{cases}-a=-2\\\\ b=3\\\\ 2a-b=1\\end{cases}$') },
            { text: say('Lehen biek $a$ eta $b$ ematen dituzte; egiaztatu hirugarrena.', 'Las dos primeras dan $a$ y $b$; comprueba la tercera.', 'تعطي المعادلتان الأوليان $a$ و$b$؛ تحقق من الثالثة.', 'The first two give $a$ and $b$; check the third.'), math: same('$2\\cdot 2-3=1$') },
            { text: say('Betetzen da: bai, konbinazio lineala da.', 'Se cumple: sí lo es.', 'تتحقق: نعم إنه تركيب خطي.', 'It holds: yes, it is one.'), math: same('$\\vec{w}=2\\vec{u}+3\\vec{v}$') }
        ],
        takeaway: say('Espazioan koordenatuz koordenatu egiten dira eragiketak, planoan bezala. $\\vec{w}$ bektorea $\\vec{u}$ eta $\\vec{v}$ bektoreen konbinazio lineala da hiru ekuazioko $a\\vec{u}+b\\vec{v}=\\vec{w}$ sistemak soluzioa badu; orduan, $\\vec{w}$ bektorea $\\vec{u}$ eta $\\vec{v}$ bektoreen planoan dago.', 'En el espacio se opera coordenada a coordenada, como en el plano. $\\vec{w}$ es combinación lineal de $\\vec{u}$ y $\\vec{v}$ si el sistema $a\\vec{u}+b\\vec{v}=\\vec{w}$, de tres ecuaciones, tiene solución; entonces $\\vec{w}$ está en el plano de $\\vec{u}$ y $\\vec{v}$.', 'في الفضاء تُجرى العمليات مركّبةً مركّبة كما في المستوى. ويكون $\\vec{w}$ تركيبًا خطيًا لـ $\\vec{u}$ و$\\vec{v}$ إذا كان للنظام $a\\vec{u}+b\\vec{v}=\\vec{w}$ ذي المعادلات الثلاث حل؛ وعندئذ يقع $\\vec{w}$ في مستوى $\\vec{u}$ و$\\vec{v}$.', 'In space you operate coordinate by coordinate, as in the plane. $\\vec{w}$ is a linear combination of $\\vec{u}$ and $\\vec{v}$ if the system $a\\vec{u}+b\\vec{v}=\\vec{w}$, of three equations, has a solution; then $\\vec{w}$ lies in the plane of $\\vec{u}$ and $\\vec{v}$.'),
        figure: (language) => <CombinationFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'dependence-rank',
        stage: 'dependence',
        title: say('Mendekotasun lineala: heina eta determinantea', 'Dependencia lineal: rango y determinante', 'الارتباط الخطي: الرتبة والمحدد', 'Linear dependence: rank and determinant'),
        goal: say('Bektore batzuk linealki mendekoak ala independenteak diren erabakitzea heinarekin eta, hiru badira, haien determinantearekin.', 'Decidir si unos vectores son linealmente dependientes o independientes con el rango y, si son tres, con su determinante.', 'تقرير هل متجهات ما مرتبطة خطيًا أم مستقلة بواسطة الرتبة، وبمحددها إذا كانت ثلاثة.', 'Decide whether some vectors are linearly dependent or independent with the rank and, if there are three, with their determinant.'),
        needs: [GAUSS],
        problem: say('$k$ parametroaren zein baliotarako dira linealki mendekoak $\\vec{u}=(1,2,-1)$, $\\vec{v}=(2,1,0)$ eta $\\vec{w}=(1,-1,k)$?', '¿Para qué valor de $k$ son linealmente dependientes $\\vec{u}=(1,2,-1)$, $\\vec{v}=(2,1,0)$ y $\\vec{w}=(1,-1,k)$?', 'لأي قيمة لـ $k$ تكون $\\vec{u}=(1,2,-1)$ و$\\vec{v}=(2,1,0)$ و$\\vec{w}=(1,-1,k)$ مرتبطة خطيًا؟', 'For which value of $k$ are $\\vec{u}=(1,2,-1)$, $\\vec{v}=(2,1,0)$ and $\\vec{w}=(1,-1,k)$ linearly dependent?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi hiru bektoreen determinantea.', 'Escribe el determinante de los tres vectores.', 'اكتب محدد المتجهات الثلاثة.', 'Write the determinant of the three vectors.'), math: same('$\\begin{vmatrix}1&2&-1\\\\2&1&0\\\\1&-1&k\\end{vmatrix}$') },
            { text: say('Garatu Sarrusen erregelarekin.', 'Desarróllalo con la regla de Sarrus.', 'انشره بقاعدة ساروس.', 'Expand it with the rule of Sarrus.'), math: same('$k+0+2+1-0-4k=3-3k$') },
            { text: say('Mendekoak dira 0 bada.', 'Son dependientes si vale 0.', 'تكون مرتبطة إذا كان يساوي 0.', 'They are dependent if it is 0.'), math: same('$3-3k=0\\ \\to\\ k=1$') }
        ],
        takeaway: say('Bektore batzuk linealki mendekoak dira bat besteen konbinazio lineala bada. Heinak esaten du zenbat diren independenteak, eta espazioko hiru bektore independenteak dira baldin eta soilik baldin haien determinantea 0 ez bada.', 'Unos vectores son linealmente dependientes si uno es combinación lineal de los demás. Su rango dice cuántos son independientes, y tres vectores del espacio son independientes si y solo si su determinante no es 0.', 'تكون متجهات مرتبطة خطيًا إذا كان أحدها تركيبًا خطيًا للأخرى. وتدل رتبتها على عدد المستقل منها، وتكون ثلاثة متجهات في الفضاء مستقلة إذا وفقط إذا كان محددها غير 0.', 'Some vectors are linearly dependent if one is a linear combination of the others. Their rank tells how many are independent, and three vectors in space are independent if and only if their determinant is not 0.'),
        figure: (language) => <DependenceFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'basis-3d',
        stage: 'dependence',
        title: say('Espazioaren oinarriak eta koordenatuak', 'Bases del espacio y coordenadas', 'أساسات الفضاء والمركّبات', 'Bases of space and coordinates'),
        goal: say('Espazioaren oinarri bat ezagutzea (hiru bektore independente) eta bektore baten koordenatuak oinarri horretan aurkitzea.', 'Reconocer una base del espacio (tres vectores independientes) y hallar las coordenadas de un vector en ella.', 'التعرف على أساس للفضاء (ثلاثة متجهات مستقلة) وإيجاد مركّبات متجه فيه.', 'Recognise a basis of space (three independent vectors) and find the coordinates of a vector in it.'),
        needs: [BASIS_COORDINATES],
        problem: say('$B=\\{(1,1,0),(0,1,1),(1,0,1)\\}$ oinarri bat da? Aurkitu $\\vec{w}=(3,5,4)$ bektorearen koordenatuak $B$ oinarrian.', '¿Es $B=\\{(1,1,0),(0,1,1),(1,0,1)\\}$ una base? Halla las coordenadas de $\\vec{w}=(3,5,4)$ en $B$.', 'هل $B=\\{(1,1,0),(0,1,1),(1,0,1)\\}$ أساس؟ أوجد مركّبات $\\vec{w}=(3,5,4)$ في $B$.', 'Is $B=\\{(1,1,0),(0,1,1),(1,0,1)\\}$ a basis? Find the coordinates of $\\vec{w}=(3,5,4)$ in $B$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Determinantea ez da 0: oinarri bat da.', 'El determinante no es 0: es una base.', 'المحدد ليس 0: إنه أساس.', 'The determinant is not 0: it is a basis.'), math: same('$\\begin{vmatrix}1&1&0\\\\0&1&1\\\\1&0&1\\end{vmatrix}=1+1=2$') },
            { text: say('Planteatu $a(1,1,0)+b(0,1,1)+c(1,0,1)=(3,5,4)$.', 'Plantea $a(1,1,0)+b(0,1,1)+c(1,0,1)=(3,5,4)$.', 'اكتب $a(1,1,0)+b(0,1,1)+c(1,0,1)=(3,5,4)$.', 'Set up $a(1,1,0)+b(0,1,1)+c(1,0,1)=(3,5,4)$.'), math: same('$\\begin{cases}a+c=3\\\\ a+b=5\\\\ b+c=4\\end{cases}$') },
            { text: say('Batu hirurak, $a+b+c=6$, eta kendu bakoitza.', 'Suma las tres, $a+b+c=6$, y resta cada una.', 'اجمع الثلاث $a+b+c=6$ ثم اطرح كل واحدة.', 'Add all three, $a+b+c=6$, and subtract each one.'), math: same('$b=3,\\ c=1,\\ a=2\\ \\to\\ \\vec{w}=(2,3,1)_B$') }
        ],
        takeaway: say('Espazioko hiru bektore independentek oinarri bat osatzen dute: edozein bektore modu bakarrean idazten da $a\\vec{u}+b\\vec{v}+c\\vec{w}$ gisa, eta $(a,b,c)$ dira haren koordenatuak oinarri horretan. Oinarri kanonikoa $\\{\\vec{i},\\vec{j},\\vec{k}\\}$ da.', 'Tres vectores independientes del espacio forman una base: cualquier vector se escribe de una sola manera como $a\\vec{u}+b\\vec{v}+c\\vec{w}$, y $(a,b,c)$ son sus coordenadas en esa base. La base canónica es $\\{\\vec{i},\\vec{j},\\vec{k}\\}$.', 'تكوّن ثلاثة متجهات مستقلة في الفضاء أساسًا: يُكتب أي متجه بطريقة واحدة على الشكل $a\\vec{u}+b\\vec{v}+c\\vec{w}$، و$(a,b,c)$ مركّباته في هذا الأساس. والأساس القانوني هو $\\{\\vec{i},\\vec{j},\\vec{k}\\}$.', 'Three independent vectors in space form a basis: any vector can be written in just one way as $a\\vec{u}+b\\vec{v}+c\\vec{w}$, and $(a,b,c)$ are its coordinates in that basis. The standard basis is $\\{\\vec{i},\\vec{j},\\vec{k}\\}$.'),
        figure: (language) => <BasisFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 3. The dot product in space ---------- */
    {
        id: 'dot-3d',
        stage: 'dot',
        title: say('Biderkadura eskalarra espazioan', 'Producto escalar en el espacio', 'الجداء السلمي في الفضاء', 'The dot product in space'),
        goal: say('Biderkadura eskalarra koordenatuekin kalkulatzea, $u_1v_1+u_2v_2+u_3v_3$, eta haren propietateak erabiltzea.', 'Calcular el producto escalar con coordenadas, $u_1v_1+u_2v_2+u_3v_3$, y usar sus propiedades.', 'حساب الجداء السلمي بالمركّبات $u_1v_1+u_2v_2+u_3v_3$ واستعمال خصائصه.', 'Work out the dot product with coordinates, $u_1v_1+u_2v_2+u_3v_3$, and use its properties.'),
        needs: [DOT_PROPERTIES],
        problem: say('$\\vec{u}=(2,-1,3)$ eta $\\vec{v}=(1,4,2)$ badira, kalkulatu $\\vec{u}\\cdot\\vec{v}$ eta $\\vec{u}\\cdot(\\vec{u}+\\vec{v})$.', 'Con $\\vec{u}=(2,-1,3)$ y $\\vec{v}=(1,4,2)$, calcula $\\vec{u}\\cdot\\vec{v}$ y $\\vec{u}\\cdot(\\vec{u}+\\vec{v})$.', 'إذا كان $\\vec{u}=(2,-1,3)$ و$\\vec{v}=(1,4,2)$ فاحسب $\\vec{u}\\cdot\\vec{v}$ و$\\vec{u}\\cdot(\\vec{u}+\\vec{v})$.', 'With $\\vec{u}=(2,-1,3)$ and $\\vec{v}=(1,4,2)$, work out $\\vec{u}\\cdot\\vec{v}$ and $\\vec{u}\\cdot(\\vec{u}+\\vec{v})$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu koordenatuz koordenatu eta batu.', 'Multiplica coordenada a coordenada y suma.', 'اضرب مركّبةً مركّبة ثم اجمع.', 'Multiply coordinate by coordinate and add.'), math: same('$\\vec{u}\\cdot\\vec{v}=2\\cdot 1+(-1)\\cdot 4+3\\cdot 2=4$') },
            { text: say('Erabili banatze-propietatea.', 'Usa la propiedad distributiva.', 'استعمل خاصية التوزيع.', 'Use the distributive property.'), math: same('$\\vec{u}\\cdot(\\vec{u}+\\vec{v})=\\vec{u}\\cdot\\vec{u}+\\vec{u}\\cdot\\vec{v}$') },
            { text: say('$\\vec{u}\\cdot\\vec{u}$ modulua ber bi da.', '$\\vec{u}\\cdot\\vec{u}$ es el módulo al cuadrado.', '$\\vec{u}\\cdot\\vec{u}$ مربع الطول.', '$\\vec{u}\\cdot\\vec{u}$ is the magnitude squared.'), math: same('$|\\vec{u}|^2+4=14+4=18$') }
        ],
        takeaway: say('Oinarri ortonormal batean, $\\vec{u}\\cdot\\vec{v}=u_1v_1+u_2v_2+u_3v_3$. Zenbaki bat da, trukakorra eta banakorra, eta $\\vec{u}\\cdot\\vec{u}=|\\vec{u}|^2$.', 'En una base ortonormal, $\\vec{u}\\cdot\\vec{v}=u_1v_1+u_2v_2+u_3v_3$. Es un número, conmutativo y distributivo, y $\\vec{u}\\cdot\\vec{u}=|\\vec{u}|^2$.', 'في أساس متعامد متجانس $\\vec{u}\\cdot\\vec{v}=u_1v_1+u_2v_2+u_3v_3$. وهو عدد، تبديلي وتوزيعي، و$\\vec{u}\\cdot\\vec{u}=|\\vec{u}|^2$.', 'In an orthonormal basis, $\\vec{u}\\cdot\\vec{v}=u_1v_1+u_2v_2+u_3v_3$. It is a number, commutative and distributive, and $\\vec{u}\\cdot\\vec{u}=|\\vec{u}|^2$.'),
        figure: (language) => <DotFigure language={language} />
    },
    {
        id: 'angle-3d',
        stage: 'dot',
        title: say('Angelua eta perpendikulartasuna', 'Ángulo y perpendicularidad', 'الزاوية والتعامد', 'Angle and perpendicularity'),
        goal: say('Espazioko bi bektoreren angelua aurkitzea, $\\cos\\alpha=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|\\,|\\vec{v}|}$, eta haiek perpendikular bihurtzen dituen parametroa.', 'Hallar el ángulo de dos vectores del espacio con $\\cos\\alpha=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|\\,|\\vec{v}|}$ y el parámetro que los hace perpendiculares.', 'إيجاد الزاوية بين متجهين في الفضاء بـ $\\cos\\alpha=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|\\,|\\vec{v}|}$ والوسيط الذي يجعلهما متعامدين.', 'Find the angle between two vectors in space with $\\cos\\alpha=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|\\,|\\vec{v}|}$ and the parameter that makes them perpendicular.'),
        needs: [ANGLE_VECTORS, PERPENDICULAR_VECTORS],
        problem: say('Zer angelu osatzen dute $\\vec{u}=(1,1,0)$ eta $\\vec{v}=(0,1,1)$ bektoreek? $k$ parametroaren zein baliotarako da $(k,2,1)$ perpendikularra $(2,-3,4)$ bektorearekiko?', '¿Qué ángulo forman $\\vec{u}=(1,1,0)$ y $\\vec{v}=(0,1,1)$? ¿Para qué $k$ es $(k,2,1)$ perpendicular a $(2,-3,4)$?', 'ما الزاوية بين $\\vec{u}=(1,1,0)$ و$\\vec{v}=(0,1,1)$؟ ولأي $k$ يكون $(k,2,1)$ عموديًا على $(2,-3,4)$؟', 'What angle do $\\vec{u}=(1,1,0)$ and $\\vec{v}=(0,1,1)$ make? For which $k$ is $(k,2,1)$ perpendicular to $(2,-3,4)$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkadura eskalarra eta moduluak.', 'Producto escalar y módulos.', 'الجداء السلمي والطولان.', 'Dot product and magnitudes.'), math: same('$\\vec{u}\\cdot\\vec{v}=1\\qquad|\\vec{u}|=|\\vec{v}|=\\sqrt{2}$') },
            { text: say('Kosinua eta angelua.', 'Coseno y ángulo.', 'جيب التمام والزاوية.', 'Cosine and angle.'), math: same('$\\cos\\alpha=\\frac{1}{\\sqrt{2}\\cdot\\sqrt{2}}=\\frac{1}{2}\\ \\to\\ \\alpha=60^\\circ$') },
            { text: say('Perpendikularrak: biderkadura eskalarra 0.', 'Perpendiculares: producto escalar 0.', 'متعامدان: الجداء السلمي 0.', 'Perpendicular: dot product 0.'), math: same('$2k-6+4=0\\ \\to\\ k=1$') }
        ],
        takeaway: say('Bi bektoreren angelua $\\cos\\alpha=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|\\,|\\vec{v}|}$ formulatik ateratzen da, $0^\\circ$ eta $180^\\circ$ artean. Bi bektore perpendikularrak dira baldin eta soilik baldin $\\vec{u}\\cdot\\vec{v}=0$.', 'El ángulo de dos vectores sale de $\\cos\\alpha=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|\\,|\\vec{v}|}$, entre $0^\\circ$ y $180^\\circ$. Dos vectores son perpendiculares si y solo si $\\vec{u}\\cdot\\vec{v}=0$.', 'تأتي الزاوية بين متجهين من $\\cos\\alpha=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|\\,|\\vec{v}|}$، بين $0^\\circ$ و$180^\\circ$. ويتعامد متجهان إذا وفقط إذا كان $\\vec{u}\\cdot\\vec{v}=0$.', 'The angle between two vectors comes from $\\cos\\alpha=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|\\,|\\vec{v}|}$, between $0^\\circ$ and $180^\\circ$. Two vectors are perpendicular if and only if $\\vec{u}\\cdot\\vec{v}=0$.'),
        figure: (language) => <AngleFigure language={language} />
    },
    {
        id: 'projection-3d',
        stage: 'dot',
        title: say('Bektore baten proiekzioa espazioan', 'Proyección de un vector en el espacio', 'إسقاط متجه في الفضاء', 'Projecting a vector in space'),
        goal: say('$\\vec{v}$ bektorearen proiekzio eskalarra, $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|}$, eta proiekzio-bektorea aurkitzea $\\vec{u}$ bektorearen gainean.', 'Hallar la proyección escalar $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|}$ y el vector proyección de $\\vec{v}$ sobre $\\vec{u}$.', 'إيجاد الإسقاط السلمي $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|}$ ومتجه إسقاط $\\vec{v}$ على $\\vec{u}$.', 'Find the scalar projection $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|}$ and the vector projection of $\\vec{v}$ onto $\\vec{u}$.'),
        needs: [PROJECTION_PLANE],
        problem: say('Aurkitu $\\vec{v}=(4,1,6)$ bektorearen proiekzioa $\\vec{u}=(1,2,2)$ bektorearen gainean: haren luzera, zeinuarekin, eta proiekzio-bektorea.', 'Halla la proyección de $\\vec{v}=(4,1,6)$ sobre $\\vec{u}=(1,2,2)$: su longitud con signo y el vector proyección.', 'أوجد إسقاط $\\vec{v}=(4,1,6)$ على $\\vec{u}=(1,2,2)$: طوله مع الإشارة ومتجه الإسقاط.', 'Find the projection of $\\vec{v}=(4,1,6)$ onto $\\vec{u}=(1,2,2)$: its signed length and the vector projection.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkadura eskalarra eta $\\vec{u}$ bektorearen modulua.', 'Producto escalar y módulo de $\\vec{u}$.', 'الجداء السلمي وطول $\\vec{u}$.', 'Dot product and magnitude of $\\vec{u}$.'), math: same('$\\begin{gathered}\\vec{u}\\cdot\\vec{v}=4+2+12=18\\\\ |\\vec{u}|=\\sqrt{1+4+4}=3\\end{gathered}$') },
            { text: say('Proiekzio eskalarra: $\\vec{u}$ bektorearen moduluaz zatitu.', 'Proyección escalar: entre el módulo de $\\vec{u}$.', 'الإسقاط السلمي: على طول $\\vec{u}$.', 'Scalar projection: divide by the magnitude of $\\vec{u}$.'), math: same('$\\frac{18}{3}=6$') },
            { text: say('Proiekzio-bektorea: luzera hori $\\vec{u}$ bektorearen norabidean.', 'Vector proyección: esa longitud en la dirección de $\\vec{u}$.', 'متجه الإسقاط: هذا الطول في اتجاه $\\vec{u}$.', 'Vector projection: that length along the direction of $\\vec{u}$.'), math: same('$\\frac{18}{9}\\,\\vec{u}=2\\,(1,2,2)=(2,4,4)$') }
        ],
        takeaway: say('$\\vec{v}$ bektorearen proiekzioak $\\vec{u}$ bektorearen gainean $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|}$ neurtzen du (negatiboa angelua kamutsa bada), eta proiekzio-bektorea $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|^2}\\,\\vec{u}$ da.', 'La proyección de $\\vec{v}$ sobre $\\vec{u}$ mide $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|}$ (negativa si el ángulo es obtuso), y el vector proyección es $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|^2}\\,\\vec{u}$.', 'طول إسقاط $\\vec{v}$ على $\\vec{u}$ هو $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|}$ (سالب إذا كانت الزاوية منفرجة)، ومتجه الإسقاط $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|^2}\\,\\vec{u}$.', 'The projection of $\\vec{v}$ onto $\\vec{u}$ measures $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|}$ (negative if the angle is obtuse), and the vector projection is $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|^2}\\,\\vec{u}$.'),
        figure: (language) => <ProjectionFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 4. The cross product ---------- */
    {
        id: 'cross-product',
        stage: 'cross',
        title: say('Bi bektoreren biderkadura bektoriala', 'El producto vectorial de dos vectores', 'الجداء المتجهي لمتجهين', 'The cross product of two vectors'),
        goal: say('$\\vec{u}\\times\\vec{v}$ kalkulatzea $\\vec{i}$, $\\vec{j}$ eta $\\vec{k}$ dituen determinantearekin, eta haren modulua, norabidea eta noranzkoa jakitea.', 'Calcular $\\vec{u}\\times\\vec{v}$ con el determinante de $\\vec{i}$, $\\vec{j}$ y $\\vec{k}$, y conocer su módulo, su dirección y su sentido.', 'حساب $\\vec{u}\\times\\vec{v}$ بالمحدد الذي فيه $\\vec{i}$ و$\\vec{j}$ و$\\vec{k}$، ومعرفة طوله واتجاهه ومنحاه.', 'Work out $\\vec{u}\\times\\vec{v}$ with the determinant of $\\vec{i}$, $\\vec{j}$ and $\\vec{k}$, and know its magnitude, direction and sense.'),
        problem: say('Kalkulatu $\\vec{u}\\times\\vec{v}$, $\\vec{u}=(2,0,-1)$ eta $\\vec{v}=(-1,2,0)$ izanik, eta egiaztatu bi bektoreekiko perpendikularra dela.', 'Calcula $\\vec{u}\\times\\vec{v}$ para $\\vec{u}=(2,0,-1)$ y $\\vec{v}=(-1,2,0)$, y comprueba que es perpendicular a los dos.', 'احسب $\\vec{u}\\times\\vec{v}$ حيث $\\vec{u}=(2,0,-1)$ و$\\vec{v}=(-1,2,0)$، وتحقق أنه عمودي على المتجهين.', 'Work out $\\vec{u}\\times\\vec{v}$ for $\\vec{u}=(2,0,-1)$ and $\\vec{v}=(-1,2,0)$, and check that it is perpendicular to both.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi determinantea, goian $\\vec{i}$, $\\vec{j}$ eta $\\vec{k}$ dituela.', 'Escribe el determinante con $\\vec{i}$, $\\vec{j}$ y $\\vec{k}$ arriba.', 'اكتب المحدد وفي أعلاه $\\vec{i}$ و$\\vec{j}$ و$\\vec{k}$.', 'Write the determinant with $\\vec{i}$, $\\vec{j}$ and $\\vec{k}$ on top.'), math: same('$\\vec{u}\\times\\vec{v}=\\begin{vmatrix}\\vec{i}&\\vec{j}&\\vec{k}\\\\2&0&-1\\\\-1&2&0\\end{vmatrix}$') },
            { text: say('Garatu lehen errenkadatik; $\\vec{j}$ minus zeinuarekin doa.', 'Desarrolla por la primera fila; la $\\vec{j}$ va con signo menos.', 'انشر حسب الصف الأول؛ يأتي $\\vec{j}$ بإشارة سالبة.', 'Expand along the first row; the $\\vec{j}$ goes with a minus sign.'), math: same('$\\begin{gathered}(0+2)\\,\\vec{i}-(0-1)\\,\\vec{j}+(4-0)\\,\\vec{k}\\\\ =(2,1,4)\\end{gathered}$') },
            { text: say('Egiaztatu biderkadura eskalarrarekin.', 'Comprueba con el producto escalar.', 'تحقق بالجداء السلمي.', 'Check with the dot product.'), math: same('$(2,1,4)\\cdot(2,0,-1)=4+0-4=0$') }
        ],
        takeaway: say('$\\vec{u}\\times\\vec{v}$ bektorea $\\vec{u}$ eta $\\vec{v}$ bektoreekiko perpendikularra da, $|\\vec{u}|\\,|\\vec{v}|\\sin\\alpha$ modulukoa, eta eskuineko eskuaren erregelaren noranzkoa du. Haren koordenatuak $\\vec{i}$, $\\vec{j}$ eta $\\vec{k}$ eta $\\vec{u}$ eta $\\vec{v}$ bektoreen koordenatuak dituen determinantetik ateratzen dira.', '$\\vec{u}\\times\\vec{v}$ es un vector perpendicular a $\\vec{u}$ y a $\\vec{v}$, de módulo $|\\vec{u}|\\,|\\vec{v}|\\sin\\alpha$ y con el sentido de la regla de la mano derecha. Sus coordenadas salen del determinante de $\\vec{i}$, $\\vec{j}$ y $\\vec{k}$ con las de $\\vec{u}$ y $\\vec{v}$.', '$\\vec{u}\\times\\vec{v}$ متجه عمودي على $\\vec{u}$ وعلى $\\vec{v}$، طوله $|\\vec{u}|\\,|\\vec{v}|\\sin\\alpha$ ومنحاه منحى قاعدة اليد اليمنى. وتأتي مركّباته من المحدد الذي فيه $\\vec{i}$ و$\\vec{j}$ و$\\vec{k}$ مع مركّبات $\\vec{u}$ و$\\vec{v}$.', '$\\vec{u}\\times\\vec{v}$ is a vector perpendicular to $\\vec{u}$ and to $\\vec{v}$, of magnitude $|\\vec{u}|\\,|\\vec{v}|\\sin\\alpha$ and with the sense of the right-hand rule. Its coordinates come from the determinant of $\\vec{i}$, $\\vec{j}$ and $\\vec{k}$ with those of $\\vec{u}$ and $\\vec{v}$.'),
        figure: (language) => <CrossFigure language={language} />
    },
    {
        id: 'cross-properties',
        stage: 'cross',
        title: say('Propietateak eta bi bektoreren perpendikularra', 'Propiedades y vector perpendicular a dos', 'الخصائص والمتجه العمودي على متجهين', 'Properties and a vector perpendicular to two'),
        goal: say('Biderkadura bektorialaren propietateak erabiltzea ($\\vec{v}\\times\\vec{u}=-\\,\\vec{u}\\times\\vec{v}$, eta paraleloak $\\vec{0}$ ematen badu) eta emandako biren bektore unitario perpendikularrak aurkitzea.', 'Usar las propiedades del producto vectorial ($\\vec{v}\\times\\vec{u}=-\\,\\vec{u}\\times\\vec{v}$, y paralelos si da $\\vec{0}$) y hallar los vectores unitarios perpendiculares a dos dados.', 'استعمال خصائص الجداء المتجهي ($\\vec{v}\\times\\vec{u}=-\\,\\vec{u}\\times\\vec{v}$، والتوازي إذا أعطى $\\vec{0}$) وإيجاد متجهات الوحدة العمودية على متجهين معلومين.', 'Use the properties of the cross product ($\\vec{v}\\times\\vec{u}=-\\,\\vec{u}\\times\\vec{v}$, and parallel if it gives $\\vec{0}$) and find the unit vectors perpendicular to two given ones.'),
        needs: [UNIT_VECTORS],
        problem: say('Aurkitu $\\vec{u}=(1,0,1)$ eta $\\vec{v}=(0,2,1)$ bektoreekiko perpendikularrak diren bektore unitarioak.', 'Halla los vectores unitarios perpendiculares a $\\vec{u}=(1,0,1)$ y $\\vec{v}=(0,2,1)$.', 'أوجد متجهات الوحدة العمودية على $\\vec{u}=(1,0,1)$ و$\\vec{v}=(0,2,1)$.', 'Find the unit vectors perpendicular to $\\vec{u}=(1,0,1)$ and $\\vec{v}=(0,2,1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkadura bektoriala bi bektoreekiko perpendikularra da.', 'El producto vectorial es perpendicular a los dos.', 'الجداء المتجهي عمودي على المتجهين.', 'The cross product is perpendicular to both.'), math: same('$\\begin{gathered}\\vec{u}\\times\\vec{v}=(0-2)\\,\\vec{i}-(1-0)\\,\\vec{j}+(2-0)\\,\\vec{k}\\\\ =(-2,-1,2)\\end{gathered}$') },
            { text: say('Haren modulua.', 'Su módulo.', 'طوله.', 'Its magnitude.'), math: same('$|\\vec{u}\\times\\vec{v}|=\\sqrt{4+1+4}=3$') },
            { text: say('Zatitu 3 zenbakiaz, eta ez ahaztu aurkakoa.', 'Divide entre 3, y no olvides el opuesto.', 'اقسم على 3، ولا تنسَ المعاكس.', 'Divide by 3, and do not forget the opposite one.'), math: same('$\\pm\\left(-\\frac{2}{3},-\\frac{1}{3},\\frac{2}{3}\\right)$') }
        ],
        takeaway: say('Ordenak garrantzia du: $\\vec{v}\\times\\vec{u}=-\\,\\vec{u}\\times\\vec{v}$. Bi bektore paraleloren biderkadura bektoriala $\\vec{0}$ da. $\\vec{u}$ eta $\\vec{v}$ bektoreekiko perpendikularrak $\\vec{u}\\times\\vec{v}$ bektorearen multiploak dira; bi unitario daude, aurkakoak.', 'El orden importa: $\\vec{v}\\times\\vec{u}=-\\,\\vec{u}\\times\\vec{v}$. El producto vectorial de dos vectores paralelos es $\\vec{0}$. Los vectores perpendiculares a $\\vec{u}$ y a $\\vec{v}$ son los múltiplos de $\\vec{u}\\times\\vec{v}$; hay dos unitarios, opuestos.', 'الترتيب مهم: $\\vec{v}\\times\\vec{u}=-\\,\\vec{u}\\times\\vec{v}$. والجداء المتجهي لمتجهين متوازيين هو $\\vec{0}$. والمتجهات العمودية على $\\vec{u}$ وعلى $\\vec{v}$ هي مضاعفات $\\vec{u}\\times\\vec{v}$؛ ومنها متجها وحدة متعاكسان.', 'The order matters: $\\vec{v}\\times\\vec{u}=-\\,\\vec{u}\\times\\vec{v}$. The cross product of two parallel vectors is $\\vec{0}$. The vectors perpendicular to $\\vec{u}$ and to $\\vec{v}$ are the multiples of $\\vec{u}\\times\\vec{v}$; there are two unit ones, opposite.'),
        figure: (language) => <CrossOrderFigure language={language} />
    },
    {
        id: 'cross-area',
        stage: 'cross',
        title: say('Paralelogramoaren eta triangeluaren azalera', 'Área del paralelogramo y del triángulo', 'مساحة متوازي الأضلاع والمثلث', 'Area of a parallelogram and of a triangle'),
        goal: say('Espazioan azalerak kalkulatzea: $|\\vec{u}\\times\\vec{v}|$ paralelogramoaren azalera da, eta haren erdia, triangeluarena.', 'Calcular áreas en el espacio: $|\\vec{u}\\times\\vec{v}|$ es el área del paralelogramo, y su mitad, la del triángulo.', 'حساب المساحات في الفضاء: $|\\vec{u}\\times\\vec{v}|$ مساحة متوازي الأضلاع، ونصفها مساحة المثلث.', 'Work out areas in space: $|\\vec{u}\\times\\vec{v}|$ is the area of the parallelogram, and half of it, that of the triangle.'),
        problem: say('Aurkitu $A(1,1,0)$, $B(2,1,2)$ eta $C(3,-1,0)$ erpinak dituen triangeluaren azalera.', 'Halla el área del triángulo de vértices $A(1,1,0)$, $B(2,1,2)$ y $C(3,-1,0)$.', 'أوجد مساحة المثلث الذي رؤوسه $A(1,1,0)$ و$B(2,1,2)$ و$C(3,-1,0)$.', 'Find the area of the triangle with vertices $A(1,1,0)$, $B(2,1,2)$ and $C(3,-1,0)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erpin beretik irteten diren bi alde.', 'Dos lados desde el mismo vértice.', 'ضلعان من الرأس نفسه.', 'Two sides from the same vertex.'), math: same('$\\overrightarrow{AB}=(1,0,2)\\qquad\\overrightarrow{AC}=(2,-2,0)$') },
            { text: say('Haien biderkadura bektoriala.', 'Su producto vectorial.', 'جداؤهما المتجهي.', 'Their cross product.'), math: same('$\\begin{gathered}\\overrightarrow{AB}\\times\\overrightarrow{AC}\\\\ =(0+4)\\,\\vec{i}-(0-4)\\,\\vec{j}+(-2-0)\\,\\vec{k}\\\\ =(4,4,-2)\\end{gathered}$') },
            { text: say('Triangelua paralelogramoaren erdia da.', 'El triángulo es la mitad del paralelogramo.', 'المثلث نصف متوازي الأضلاع.', 'The triangle is half the parallelogram.'), math: same('$S=\\frac{1}{2}\\sqrt{16+16+4}=\\frac{6}{2}=3$') }
        ],
        takeaway: say('$|\\vec{u}\\times\\vec{v}|$ modulua $\\vec{u}$ eta $\\vec{v}$ aldeak dituen paralelogramoaren azalera da. $ABC$ triangeluaren azalera $\\frac{1}{2}\\,|\\overrightarrow{AB}\\times\\overrightarrow{AC}|$ da.', 'El módulo $|\\vec{u}\\times\\vec{v}|$ es el área del paralelogramo de lados $\\vec{u}$ y $\\vec{v}$. El área del triángulo $ABC$ es $\\frac{1}{2}\\,|\\overrightarrow{AB}\\times\\overrightarrow{AC}|$.', 'الطول $|\\vec{u}\\times\\vec{v}|$ مساحة متوازي الأضلاع الذي ضلعاه $\\vec{u}$ و$\\vec{v}$. ومساحة المثلث $ABC$ هي $\\frac{1}{2}\\,|\\overrightarrow{AB}\\times\\overrightarrow{AC}|$.', 'The magnitude $|\\vec{u}\\times\\vec{v}|$ is the area of the parallelogram with sides $\\vec{u}$ and $\\vec{v}$. The area of the triangle $ABC$ is $\\frac{1}{2}\\,|\\overrightarrow{AB}\\times\\overrightarrow{AC}|$.'),
        figure: (language) => <TriangleAreaFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 5. The scalar triple product ---------- */
    {
        id: 'mixed-product',
        stage: 'mixed',
        title: say('Hiru bektoreren biderkadura mistoa', 'El producto mixto de tres vectores', 'الجداء المختلط لثلاثة متجهات', 'The scalar triple product of three vectors'),
        goal: say('Biderkadura mistoa, $[\\vec{u},\\vec{v},\\vec{w}]=\\vec{u}\\cdot(\\vec{v}\\times\\vec{w})$, determinante batekin kalkulatzea, eta bektoreen ordena aldatzean nola aldatzen den jakitea.', 'Calcular el producto mixto $[\\vec{u},\\vec{v},\\vec{w}]=\\vec{u}\\cdot(\\vec{v}\\times\\vec{w})$ con un determinante y saber cómo cambia al ordenar los vectores de otra manera.', 'حساب الجداء المختلط $[\\vec{u},\\vec{v},\\vec{w}]=\\vec{u}\\cdot(\\vec{v}\\times\\vec{w})$ بمحدد، ومعرفة كيف يتغير بتغيير ترتيب المتجهات.', 'Work out the scalar triple product $[\\vec{u},\\vec{v},\\vec{w}]=\\vec{u}\\cdot(\\vec{v}\\times\\vec{w})$ with a determinant and know how it changes when the vectors are put in another order.'),
        problem: say('Kalkulatu $[\\vec{u},\\vec{v},\\vec{w}]$, $\\vec{u}=(1,2,0)$, $\\vec{v}=(0,1,3)$ eta $\\vec{w}=(2,0,1)$ izanik. Zenbat da $[\\vec{v},\\vec{u},\\vec{w}]$?', 'Calcula $[\\vec{u},\\vec{v},\\vec{w}]$ con $\\vec{u}=(1,2,0)$, $\\vec{v}=(0,1,3)$ y $\\vec{w}=(2,0,1)$. ¿Cuánto vale $[\\vec{v},\\vec{u},\\vec{w}]$?', 'احسب $[\\vec{u},\\vec{v},\\vec{w}]$ حيث $\\vec{u}=(1,2,0)$ و$\\vec{v}=(0,1,3)$ و$\\vec{w}=(2,0,1)$. وكم يساوي $[\\vec{v},\\vec{u},\\vec{w}]$؟', 'Work out $[\\vec{u},\\vec{v},\\vec{w}]$ with $\\vec{u}=(1,2,0)$, $\\vec{v}=(0,1,3)$ and $\\vec{w}=(2,0,1)$. What is $[\\vec{v},\\vec{u},\\vec{w}]$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hiru errenkaden determinantea da.', 'Es el determinante de las tres filas.', 'إنه محدد الصفوف الثلاثة.', 'It is the determinant of the three rows.'), math: same('$[\\vec{u},\\vec{v},\\vec{w}]=\\begin{vmatrix}1&2&0\\\\0&1&3\\\\2&0&1\\end{vmatrix}$') },
            { text: say('Sarrusen erregela.', 'Regla de Sarrus.', 'قاعدة ساروس.', 'The rule of Sarrus.'), math: same('$1+12+0-0-0-0=13$') },
            { text: say('Bi bektore lekuz aldatzeak zeinua aldatzen du.', 'Cambiar dos vectores de sitio cambia el signo.', 'تبديل موضعي متجهين يغيّر الإشارة.', 'Swapping two vectors changes the sign.'), math: same('$[\\vec{v},\\vec{u},\\vec{w}]=-13$') }
        ],
        takeaway: say('$[\\vec{u},\\vec{v},\\vec{w}]=\\vec{u}\\cdot(\\vec{v}\\times\\vec{w})$ biderkadura mistoa zenbaki bat da: hiru bektoreen koordenatuen determinantea. Bi trukatzen badira, zeinua aldatzen da, eta errotatzen badira, ez: $[\\vec{u},\\vec{v},\\vec{w}]=[\\vec{v},\\vec{w},\\vec{u}]$.', 'El producto mixto $[\\vec{u},\\vec{v},\\vec{w}]=\\vec{u}\\cdot(\\vec{v}\\times\\vec{w})$ es un número: el determinante de las coordenadas de los tres vectores. Cambia de signo si se intercambian dos, y no cambia si se rotan: $[\\vec{u},\\vec{v},\\vec{w}]=[\\vec{v},\\vec{w},\\vec{u}]$.', 'الجداء المختلط $[\\vec{u},\\vec{v},\\vec{w}]=\\vec{u}\\cdot(\\vec{v}\\times\\vec{w})$ عدد: محدد مركّبات المتجهات الثلاثة. تتغير إشارته إذا تبادل اثنان، ولا يتغير إذا دُوِّرت: $[\\vec{u},\\vec{v},\\vec{w}]=[\\vec{v},\\vec{w},\\vec{u}]$.', 'The scalar triple product $[\\vec{u},\\vec{v},\\vec{w}]=\\vec{u}\\cdot(\\vec{v}\\times\\vec{w})$ is a number: the determinant of the coordinates of the three vectors. It changes sign if two are swapped, and it does not change if they are rotated: $[\\vec{u},\\vec{v},\\vec{w}]=[\\vec{v},\\vec{w},\\vec{u}]$.'),
        figure: (language) => <MixedBoxFigure language={language} />
    },
    {
        id: 'mixed-volume',
        stage: 'mixed',
        title: say('Paralelepipedoaren eta tetraedroaren bolumena', 'Volumen del paralelepípedo y del tetraedro', 'حجم متوازي السطوح ورباعي الأوجه', 'Volume of a parallelepiped and of a tetrahedron'),
        goal: say('Bolumenak biderkadura mistoarekin kalkulatzea: $|[\\vec{u},\\vec{v},\\vec{w}]|$ paralelepipedorako, eta haren seirena tetraedrorako.', 'Calcular volúmenes con el producto mixto: $|[\\vec{u},\\vec{v},\\vec{w}]|$ para el paralelepípedo y su sexta parte para el tetraedro.', 'حساب الحجوم بالجداء المختلط: $|[\\vec{u},\\vec{v},\\vec{w}]|$ لمتوازي السطوح، وسدسه لرباعي الأوجه.', 'Work out volumes with the scalar triple product: $|[\\vec{u},\\vec{v},\\vec{w}]|$ for the parallelepiped and a sixth of it for the tetrahedron.'),
        needs: [PYRAMID],
        problem: say('Aurkitu $A(1,0,0)$, $B(3,1,0)$, $C(1,2,1)$ eta $D(3,1,3)$ erpinak dituen tetraedroaren bolumena.', 'Halla el volumen del tetraedro de vértices $A(1,0,0)$, $B(3,1,0)$, $C(1,2,1)$ y $D(3,1,3)$.', 'أوجد حجم رباعي الأوجه الذي رؤوسه $A(1,0,0)$ و$B(3,1,0)$ و$C(1,2,1)$ و$D(3,1,3)$.', 'Find the volume of the tetrahedron with vertices $A(1,0,0)$, $B(3,1,0)$, $C(1,2,1)$ and $D(3,1,3)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$A$ erpinetik irteten diren hiru ertz.', 'Tres aristas desde $A$.', 'ثلاثة أحرف من $A$.', 'Three edges from $A$.'), math: same('$\\begin{gathered}\\overrightarrow{AB}=(2,1,0)\\quad\\overrightarrow{AC}=(0,2,1)\\\\ \\overrightarrow{AD}=(2,1,3)\\end{gathered}$') },
            { text: say('Haien biderkadura mistoa.', 'Su producto mixto.', 'جداؤها المختلط.', 'Their scalar triple product.'), math: same('$\\begin{vmatrix}2&1&0\\\\0&2&1\\\\2&1&3\\end{vmatrix}=12+2+0-0-2-0=12$') },
            { text: say('Tetraedroa paralelepipedoaren seirena da.', 'El tetraedro es la sexta parte del paralelepípedo.', 'رباعي الأوجه سدس متوازي السطوح.', 'The tetrahedron is a sixth of the parallelepiped.'), math: same('$V=\\frac{12}{6}=2$') }
        ],
        takeaway: say('$\\vec{u}$, $\\vec{v}$ eta $\\vec{w}$ ertzak dituen paralelepipedoaren bolumena $|[\\vec{u},\\vec{v},\\vec{w}]|$ da, eta $ABCD$ tetraedroarena $\\frac{1}{6}\\,|[\\overrightarrow{AB},\\overrightarrow{AC},\\overrightarrow{AD}]|$. Balio absolutuak zeinua kentzen du, orientazioa bakarrik adierazten baitu.', 'El volumen del paralelepípedo de aristas $\\vec{u}$, $\\vec{v}$ y $\\vec{w}$ es $|[\\vec{u},\\vec{v},\\vec{w}]|$, y el del tetraedro $ABCD$ es $\\frac{1}{6}\\,|[\\overrightarrow{AB},\\overrightarrow{AC},\\overrightarrow{AD}]|$. El valor absoluto quita el signo, que solo dice la orientación.', 'حجم متوازي السطوح الذي أحرفه $\\vec{u}$ و$\\vec{v}$ و$\\vec{w}$ هو $|[\\vec{u},\\vec{v},\\vec{w}]|$، وحجم رباعي الأوجه $ABCD$ هو $\\frac{1}{6}\\,|[\\overrightarrow{AB},\\overrightarrow{AC},\\overrightarrow{AD}]|$. وتحذف القيمة المطلقة الإشارة، التي لا تدل إلا على التوجيه.', 'The volume of the parallelepiped with edges $\\vec{u}$, $\\vec{v}$ and $\\vec{w}$ is $|[\\vec{u},\\vec{v},\\vec{w}]|$, and that of the tetrahedron $ABCD$ is $\\frac{1}{6}\\,|[\\overrightarrow{AB},\\overrightarrow{AC},\\overrightarrow{AD}]|$. The absolute value removes the sign, which only tells the orientation.'),
        figure: (language) => <TetraFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'coplanar',
        stage: 'mixed',
        title: say('Bektore eta puntu planokideak', 'Vectores y puntos coplanarios', 'المتجهات والنقاط المستوية', 'Coplanar vectors and points'),
        goal: say('Biderkadura mistoarekin erabakitzea hiru bektore edo lau puntu plano berean dauden, eta hori lortzen duen parametroa aurkitzea.', 'Decidir con el producto mixto si tres vectores o cuatro puntos están en un mismo plano, y hallar el parámetro que lo consigue.', 'تقرير هل ثلاثة متجهات أو أربع نقاط تقع في مستوى واحد بواسطة الجداء المختلط، وإيجاد الوسيط الذي يحقق ذلك.', 'Decide with the scalar triple product whether three vectors or four points lie in one plane, and find the parameter that makes it so.'),
        problem: say('$k$ parametroaren zein baliotarako daude plano berean $A(1,0,1)$, $B(2,1,0)$, $C(0,2,1)$ eta $D(k,1,2)$ puntuak?', '¿Para qué valor de $k$ están en un mismo plano los puntos $A(1,0,1)$, $B(2,1,0)$, $C(0,2,1)$ y $D(k,1,2)$?', 'لأي قيمة لـ $k$ تقع النقاط $A(1,0,1)$ و$B(2,1,0)$ و$C(0,2,1)$ و$D(k,1,2)$ في مستوى واحد؟', 'For which value of $k$ do the points $A(1,0,1)$, $B(2,1,0)$, $C(0,2,1)$ and $D(k,1,2)$ lie in one plane?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$A$ puntutik irteten diren hiru bektore.', 'Tres vectores desde $A$.', 'ثلاثة متجهات من $A$.', 'Three vectors from $A$.'), math: same('$\\begin{gathered}\\overrightarrow{AB}=(1,1,-1)\\quad\\overrightarrow{AC}=(-1,2,0)\\\\ \\overrightarrow{AD}=(k-1,1,1)\\end{gathered}$') },
            { text: say('Haien biderkadura mistoa, Sarrusekin.', 'Su producto mixto, con Sarrus.', 'جداؤها المختلط بقاعدة ساروس.', 'Their scalar triple product, with Sarrus.'), math: same('$2+0+1+2(k-1)-0+1=2k+2$') },
            { text: say('Planokideak dira 0 bada.', 'Coplanarios si vale 0.', 'تكون مستوية إذا كان 0.', 'Coplanar if it is 0.'), math: same('$2k+2=0\\ \\to\\ k=-1$') }
        ],
        takeaway: say('Hiru bektore planokideak dira baldin eta soilik baldin $[\\vec{u},\\vec{v},\\vec{w}]=0$: haien kutxa zapalduta dago, bolumenik gabe. $A$, $B$, $C$ eta $D$ lau puntu plano batean daude $[\\overrightarrow{AB},\\overrightarrow{AC},\\overrightarrow{AD}]=0$ bada.', 'Tres vectores son coplanarios si y solo si $[\\vec{u},\\vec{v},\\vec{w}]=0$: su caja está aplastada y no tiene volumen. Cuatro puntos $A$, $B$, $C$ y $D$ están en un plano si $[\\overrightarrow{AB},\\overrightarrow{AC},\\overrightarrow{AD}]=0$.', 'تكون ثلاثة متجهات مستوية إذا وفقط إذا كان $[\\vec{u},\\vec{v},\\vec{w}]=0$: صندوقها منضغط بلا حجم. وتقع أربع نقاط $A$ و$B$ و$C$ و$D$ في مستوى واحد إذا كان $[\\overrightarrow{AB},\\overrightarrow{AC},\\overrightarrow{AD}]=0$.', 'Three vectors are coplanar if and only if $[\\vec{u},\\vec{v},\\vec{w}]=0$: their box is flattened and has no volume. Four points $A$, $B$, $C$ and $D$ lie in one plane if $[\\overrightarrow{AB},\\overrightarrow{AC},\\overrightarrow{AD}]=0$.'),
        figure: (language) => <CoplanarFigure language={language} />,
        figureAfterSteps: true
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const spaceVectorsTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...spaceVectorsLessonTexts[topic.id as SpaceVectorsTopicId], ...spaceVectorsLessonChecks[topic.id as SpaceVectorsTopicId] }))
