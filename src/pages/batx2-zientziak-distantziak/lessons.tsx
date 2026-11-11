import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { AngleLinePlaneFigure, AngleLinesFigure, AnglePlanesFigure, CommonPerpendicularFigure, MediatorPlaneFigure, ParallelLinesFigure, ParallelPlanesFigure, PointLineFigure, PointPlaneFigure, ProjectLinePlaneFigure, ProjectPointLineFigure, ProjectPointPlaneFigure, SkewDistanceFigure, SymmetricLineFigure, SymmetricPlaneFigure } from './figures'
import { anglesDistancesLessonChecks, type AnglesDistancesTopicId } from './lessonChecks'
import { anglesDistancesLessonTexts } from './lessonTexts'

/* ==========================================================================
   Angeluak eta distantziak · Batxilergoa 2 · Zientziak — stages and
   lessons. The scope follows unit 6 of Santillana 2.º Bachillerato
   Ciencias (the class book) and unit 6 of Anaya Matemáticas II: angles
   (two lines, a line and a plane, two planes), orthogonal projections,
   symmetric points and the mediator plane, the distance from a point to
   a plane and to a line, and the distance between lines, with the common
   perpendicular. The sphere is left out (owner's choice, 2026-11-11: it
   is not in the País Vasco EBAU). Areas and volumes were done in
   Espazioko bektoreak; equations and positions in Zuzenak eta planoak.
   ========================================================================== */

export type AnglesDistancesStageId = 'angles' | 'projections' | 'symmetric' | 'point-distances' | 'line-distances'

export const anglesDistancesStages: UnitStage[] = [
    { id: 'angles', tone: 'blue', title: { eu: 'Angeluak', es: 'Ángulos', en: 'Angles', ar: 'الزوايا' } },
    { id: 'projections', tone: 'violet', title: { eu: 'Proiekzioak', es: 'Proyecciones', en: 'Projections', ar: 'المساقط' } },
    { id: 'symmetric', tone: 'mustard', title: { eu: 'Simetrikoak', es: 'Simétricos', en: 'Symmetric points', ar: 'النظائر' } },
    { id: 'point-distances', tone: 'coral', title: { eu: 'Puntu baten distantzia', es: 'Distancia de un punto', en: 'Distance from a point', ar: 'مسافة نقطة' } },
    { id: 'line-distances', tone: 'green', title: { eu: 'Zuzenen arteko distantzia', es: 'Distancia entre rectas', en: 'Distance between lines', ar: 'المسافة بين المستقيمات' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

const LINE_ANGLE = { unit: 'batx1-zientziak/geometria-analitica', topic: 'line-angle', title: { eu: 'Bi zuzenen angelua', es: 'Ángulo de dos rectas', en: 'The angle of two lines', ar: 'زاوية مستقيمين' } }
const POINT_LINE_2D = { unit: 'batx1-zientziak/geometria-analitica', topic: 'point-line', title: { eu: 'Puntu batetik zuzen baterako distantzia', es: 'Distancia de un punto a una recta', en: 'Distance from a point to a line', ar: 'المسافة من نقطة إلى مستقيم' } }
const PARALLEL_LINES_2D = { unit: 'batx1-zientziak/geometria-analitica', topic: 'parallel-lines', title: { eu: 'Bi zuzen paraleloren arteko distantzia', es: 'Distancia entre dos rectas paralelas', en: 'Distance between two parallel lines', ar: 'المسافة بين مستقيمين متوازيين' } }
const REFLECTION_2D = { unit: 'batx1-zientziak/geometria-analitica', topic: 'reflection', title: { eu: 'Puntu baten simetrikoa zuzen batekiko', es: 'Simétrico de un punto respecto de una recta', en: 'Reflecting a point in a line', ar: 'نظير نقطة بالنسبة إلى مستقيم' } }
const MIDPOINT_SYMMETRIC = { unit: 'batx2-zientziak/vectores-espacio', topic: 'midpoint-symmetric', title: { eu: 'Erdiko puntua eta simetrikoa espazioan', es: 'Punto medio y simétrico en el espacio', en: 'Midpoint and symmetric point in space', ar: 'المنتصف والنظيرة في الفضاء' } }
const ANGLE_3D = { unit: 'batx2-zientziak/vectores-espacio', topic: 'angle-3d', title: { eu: 'Angelua eta perpendikulartasuna', es: 'Ángulo y perpendicularidad', en: 'Angle and perpendicularity', ar: 'الزاوية والتعامد' } }
const PROJECTION_3D = { unit: 'batx2-zientziak/vectores-espacio', topic: 'projection-3d', title: { eu: 'Bektore baten proiekzioa espazioan', es: 'Proyección de un vector en el espacio', en: 'Projecting a vector in space', ar: 'إسقاط متجه في الفضاء' } }
const CROSS_AREA = { unit: 'batx2-zientziak/vectores-espacio', topic: 'cross-area', title: { eu: 'Paralelogramoaren eta triangeluaren azalera', es: 'Área del paralelogramo y del triángulo', en: 'Area of a parallelogram and of a triangle', ar: 'مساحة متوازي الأضلاع والمثلث' } }
const MIXED_VOLUME = { unit: 'batx2-zientziak/vectores-espacio', topic: 'mixed-volume', title: { eu: 'Paralelepipedoaren eta tetraedroaren bolumena', es: 'Volumen del paralelepípedo y del tetraedro', en: 'Volume of a parallelepiped and of a tetrahedron', ar: 'حجم متوازي السطوح ورباعي الأوجه' } }
const PLANE_GENERAL = { unit: 'batx2-zientziak/rectas-planos', topic: 'plane-general', title: { eu: 'Ekuazio orokorra eta bektore normala', es: 'Ecuación general y vector normal', en: 'General equation and normal vector', ar: 'المعادلة العامة والمتجه الناظمي' } }
const LINES_CROSS = { unit: 'batx2-zientziak/rectas-planos', topic: 'lines-cross', title: { eu: 'Ebakitzen dira ala gurutzatzen?', es: '¿Se cortan o se cruzan?', en: 'Intersecting or skew?', ar: 'متقاطعان أم متخالفان؟' } }
const LINE_PLANE_POINT = { unit: 'batx2-zientziak/rectas-planos', topic: 'line-plane-point', title: { eu: 'Zuzenaren eta planoaren ebaki-puntua', es: 'Punto de corte de recta y plano', en: 'Where a line meets a plane', ar: 'نقطة تقاطع المستقيم والمستوى' } }
const LINE_PLANE_POSITION = { unit: 'batx2-zientziak/rectas-planos', topic: 'line-plane-position', title: { eu: 'Zuzenaren eta planoaren posizioa', es: 'Posición de recta y plano', en: 'Position of a line and a plane', ar: 'وضع المستقيم والمستوى' } }
const TWO_PLANES = { unit: 'batx2-zientziak/rectas-planos', topic: 'two-planes', title: { eu: 'Bi planoren posizioa', es: 'Posición de dos planos', en: 'Position of two planes', ar: 'وضع مستويين' } }

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Angles ---------- */
    {
        id: 'angle-lines',
        stage: 'angles',
        title: say('Bi zuzenen angelua', 'Ángulo de dos rectas', 'زاوية مستقيمين', 'The angle of two lines'),
        goal: say('Espazioko bi zuzenen angelua kalkulatzea haien norabideekin, ebakitzen ez badira ere.', 'Calcular el ángulo de dos rectas del espacio con sus directores, aunque no se corten.', 'حساب زاوية مستقيمين في الفضاء باتجاهيهما ولو لم يتقاطعا.', 'Work out the angle of two lines in space from their directions, even if they do not meet.'),
        needs: [LINE_ANGLE, ANGLE_3D],
        problem: say('Zer angelu osatzen dute $r$: $(1,0,2)+t(1,1,0)$ eta $s$: $(0,3,1)+\\lambda(1,0,1)$ zuzenek?', '¿Qué ángulo forman $r$: $(1,0,2)+t(1,1,0)$ y $s$: $(0,3,1)+\\lambda(1,0,1)$?', 'ما الزاوية بين $r$: ‏$(1,0,2)+t(1,1,0)$ و$s$: ‏$(0,3,1)+\\lambda(1,0,1)$؟', 'What angle do $r$: $(1,0,2)+t(1,1,0)$ and $s$: $(0,3,1)+\\lambda(1,0,1)$ form?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Norabideen biderkadura eskalarra.', 'El producto escalar de los directores.', 'الجداء السلمي للاتجاهين.', 'The dot product of the directions.'), math: same('$(1,1,0)\\cdot(1,0,1)=1$') },
            { text: say('Moduluak.', 'Los módulos.', 'الطولان.', 'The magnitudes.'), math: same('$|\\vec{u}|=|\\vec{v}|=\\sqrt{2}$') },
            { text: say('Kosinua, balio absolutuarekin.', 'El coseno, con valor absoluto.', 'جيب التمام بالقيمة المطلقة.', 'The cosine, with absolute value.'), math: same('$\\cos\\alpha=\\frac{1}{\\sqrt{2}\\cdot\\sqrt{2}}=\\frac{1}{2}\\ \\to\\ \\alpha=60^\\circ$') }
        ],
        takeaway: say('$\\cos\\alpha=\\frac{|\\vec{u}\\cdot\\vec{v}|}{|\\vec{u}|\\,|\\vec{v}|}$: angelua $0^\\circ$ eta $90^\\circ$ artean dago. $\\vec{u}\\cdot\\vec{v}=0$ bada, zuzenak perpendikularrak dira, ebakitzen ez badira ere.', '$\\cos\\alpha=\\frac{|\\vec{u}\\cdot\\vec{v}|}{|\\vec{u}|\\,|\\vec{v}|}$: el ángulo está entre $0^\\circ$ y $90^\\circ$. Si $\\vec{u}\\cdot\\vec{v}=0$, las rectas son perpendiculares, aunque no se corten.', '$\\cos\\alpha=\\frac{|\\vec{u}\\cdot\\vec{v}|}{|\\vec{u}|\\,|\\vec{v}|}$: الزاوية بين $0^\\circ$ و$90^\\circ$. وإذا كان $\\vec{u}\\cdot\\vec{v}=0$ فالمستقيمان متعامدان ولو لم يتقاطعا.', '$\\cos\\alpha=\\frac{|\\vec{u}\\cdot\\vec{v}|}{|\\vec{u}|\\,|\\vec{v}|}$: the angle is between $0^\\circ$ and $90^\\circ$. If $\\vec{u}\\cdot\\vec{v}=0$, the lines are perpendicular, even if they do not meet.'),
        figure: (language) => <AngleLinesFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'angle-line-plane',
        stage: 'angles',
        title: say('Zuzenaren eta planoaren angelua', 'Ángulo de recta y plano', 'زاوية المستقيم والمستوى', 'The angle of a line and a plane'),
        goal: say('Zuzen baten eta plano baten angelua kalkulatzea, norabidearekin eta normalarekin, sinua erabiliz.', 'Calcular el ángulo de una recta y un plano con el director y el normal, usando el seno.', 'حساب زاوية مستقيم ومستوى بالاتجاه والناظم باستعمال الجيب.', 'Work out the angle of a line and a plane from the direction and the normal, using the sine.'),
        needs: [ANGLE_3D, PLANE_GENERAL],
        problem: say('$r$ zuzenaren norabidea $(1,0,1)$ da eta $\\pi$: $x+y=5$. Zer angelu osatzen dute?', '$r$ tiene dirección $(1,0,1)$ y $\\pi$: $x+y=5$. ¿Qué ángulo forman?', 'اتجاه $r$ هو $(1,0,1)$ و$\\pi$: ‏$x+y=5$. ما الزاوية بينهما؟', '$r$ has direction $(1,0,1)$ and $\\pi$: $x+y=5$. What angle do they form?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Normala eta biderkadura eskalarra.', 'El normal y el producto escalar.', 'الناظم والجداء السلمي.', 'The normal and the dot product.'), math: same('$\\vec{n}=(1,1,0)\\qquad\\vec{u}\\cdot\\vec{n}=1$') },
            { text: say('Sinua, ez kosinua.', 'El seno, no el coseno.', 'الجيب لا جيب التمام.', 'The sine, not the cosine.'), math: same('$\\sin\\alpha=\\frac{1}{\\sqrt{2}\\cdot\\sqrt{2}}=\\frac{1}{2}$') },
            { text: say('Angelua.', 'El ángulo.', 'الزاوية.', 'The angle.'), math: same('$\\alpha=30^\\circ$') }
        ],
        takeaway: say('$\\sin\\alpha=\\frac{|\\vec{u}\\cdot\\vec{n}|}{|\\vec{u}|\\,|\\vec{n}|}$. Formula bi bektoreen kosinuarena da, baina normalarekiko angelua osagarria denez, sinua ematen du.', '$\\sin\\alpha=\\frac{|\\vec{u}\\cdot\\vec{n}|}{|\\vec{u}|\\,|\\vec{n}|}$. La fórmula es la del coseno de dos vectores, pero como el ángulo con el normal es el complementario, da el seno.', '$\\sin\\alpha=\\frac{|\\vec{u}\\cdot\\vec{n}|}{|\\vec{u}|\\,|\\vec{n}|}$. الصيغة صيغة جيب تمام متجهين، لكن لأن الزاوية مع الناظم متممة فهي تعطي الجيب.', '$\\sin\\alpha=\\frac{|\\vec{u}\\cdot\\vec{n}|}{|\\vec{u}|\\,|\\vec{n}|}$. The formula is the cosine of two vectors, but as the angle with the normal is the complement, it gives the sine.'),
        figure: (language) => <AngleLinePlaneFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'angle-planes',
        stage: 'angles',
        title: say('Bi planoren angelua', 'Ángulo de dos planos', 'زاوية مستويين', 'The angle of two planes'),
        goal: say('Bi planoren angelua kalkulatzea haien normalekin, eta perpendikularrak izateko parametroa aurkitzea.', 'Calcular el ángulo de dos planos con sus normales y hallar el parámetro que los hace perpendiculares.', 'حساب زاوية مستويين بناظميهما وإيجاد الوسيط الذي يجعلهما متعامدين.', 'Work out the angle of two planes from their normals and find the parameter that makes them perpendicular.'),
        needs: [PLANE_GENERAL, TWO_PLANES],
        problem: say('Zer angelu osatzen dute $\\pi_1$: $x+y=1$ eta $\\pi_2$: $y+{z}=2$ planoek?', '¿Qué ángulo forman $\\pi_1$: $x+y=1$ y $\\pi_2$: $y+{z}=2$?', 'ما الزاوية بين $\\pi_1$: ‏$x+y=1$ و$\\pi_2$: ‏$y+{z}=2$؟', 'What angle do $\\pi_1$: $x+y=1$ and $\\pi_2$: $y+{z}=2$ form?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Normalak.', 'Los normales.', 'الناظمان.', 'The normals.'), math: same('$\\vec{n}_1=(1,1,0)\\qquad\\vec{n}_2=(0,1,1)$') },
            { text: say('Biderkadura eskalarra eta moduluak.', 'Producto escalar y módulos.', 'الجداء السلمي والطولان.', 'Dot product and magnitudes.'), math: same('$\\vec{n}_1\\cdot\\vec{n}_2=1\\qquad|\\vec{n}_1|=|\\vec{n}_2|=\\sqrt{2}$') },
            { text: say('Kosinua eta angelua.', 'Coseno y ángulo.', 'جيب التمام والزاوية.', 'Cosine and angle.'), math: same('$\\cos\\alpha=\\frac{1}{2}\\ \\to\\ \\alpha=60^\\circ$') }
        ],
        takeaway: say('$\\cos\\alpha=\\frac{|\\vec{n}_1\\cdot\\vec{n}_2|}{|\\vec{n}_1|\\,|\\vec{n}_2|}$. Planoak perpendikularrak dira $\\vec{n}_1\\cdot\\vec{n}_2=0$ bada.', '$\\cos\\alpha=\\frac{|\\vec{n}_1\\cdot\\vec{n}_2|}{|\\vec{n}_1|\\,|\\vec{n}_2|}$. Los planos son perpendiculares si $\\vec{n}_1\\cdot\\vec{n}_2=0$.', '$\\cos\\alpha=\\frac{|\\vec{n}_1\\cdot\\vec{n}_2|}{|\\vec{n}_1|\\,|\\vec{n}_2|}$. ويكون المستويان متعامدين إذا كان $\\vec{n}_1\\cdot\\vec{n}_2=0$.', '$\\cos\\alpha=\\frac{|\\vec{n}_1\\cdot\\vec{n}_2|}{|\\vec{n}_1|\\,|\\vec{n}_2|}$. The planes are perpendicular if $\\vec{n}_1\\cdot\\vec{n}_2=0$.'),
        figure: (language) => <AnglePlanesFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 2. Projections ---------- */
    {
        id: 'project-point-plane',
        stage: 'projections',
        title: say('Puntu baten proiekzioa plano batean', 'Proyección de un punto sobre un plano', 'مسقط نقطة على مستوى', 'Projecting a point on a plane'),
        goal: say('Puntu batetik plano batera jaisten den perpendikularraren oina aurkitzea.', 'Hallar el pie de la perpendicular que baja de un punto a un plano.', 'إيجاد مسقط العمودي النازل من نقطة إلى مستوى.', 'Find the foot of the perpendicular dropped from a point to a plane.'),
        needs: [LINE_PLANE_POINT, PLANE_GENERAL],
        problem: say('Aurkitu $P(3,1,4)$ puntuaren proiekzioa $\\pi$: $x+y+{z}=2$ planoan.', 'Halla la proyección de $P(3,1,4)$ sobre $\\pi$: $x+y+{z}=2$.', 'أوجد مسقط $P(3,1,4)$ على $\\pi$: ‏$x+y+{z}=2$.', 'Find the projection of $P(3,1,4)$ on $\\pi$: $x+y+{z}=2$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$P$ puntutik normalaren norabidean doan zuzena.', 'La recta por $P$ con la dirección del normal.', 'المستقيم المار بـ $P$ باتجاه الناظم.', 'The line through $P$ in the direction of the normal.'), math: same('$(3+t,1+t,4+t)$') },
            { text: say('Ordezkatu planoan.', 'Sustituye en el plano.', 'عوّض في المستوى.', 'Put it into the plane.'), math: same('$8+3t=2\\ \\to\\ t=-2$') },
            { text: say('$t$ zuzenean.', 'El $t$ en la recta.', 'ضع $t$ في المستقيم.', 'The $t$ in the line.'), math: same('$M=(3-2,1-2,4-2)=(1,-1,2)$') }
        ],
        takeaway: say('Proiekzioa $M$ oina da: $P+t\\,\\vec{n}$ zuzena planoarekin ebakitzen da. $t$ ez da puntua: zuzenean jarri behar da.', 'La proyección es el pie $M$: se corta la recta $P+t\\,\\vec{n}$ con el plano. El $t$ no es el punto: hay que llevarlo a la recta.', 'المسقط هو $M$: نقاطع المستقيم $P+t\\,\\vec{n}$ مع المستوى. و$t$ ليست النقطة: يجب وضعها في المستقيم.', 'The projection is the foot $M$: meet the line $P+t\\,\\vec{n}$ with the plane. The $t$ is not the point: put it back into the line.'),
        figure: (language) => <ProjectPointPlaneFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'project-point-line',
        stage: 'projections',
        title: say('Puntu baten proiekzioa zuzen batean', 'Proyección de un punto sobre una recta', 'مسقط نقطة على مستقيم', 'Projecting a point on a line'),
        goal: say('Zuzeneko punturik hurbilena aurkitzea, puntutik pasatzen den plano perpendikularrarekin.', 'Hallar el punto de la recta más cercano, con el plano perpendicular que pasa por el punto.', 'إيجاد أقرب نقطة من المستقيم بالمستوى العمودي المار بالنقطة.', 'Find the closest point of the line, with the perpendicular plane through the point.'),
        needs: [PROJECTION_3D, LINE_PLANE_POINT],
        problem: say('Aurkitu $P(2,3,1)$ puntuaren proiekzioa $r$: $(1,0,0)+t(1,1,0)$ zuzenean.', 'Halla la proyección de $P(2,3,1)$ sobre $r$: $(1,0,0)+t(1,1,0)$.', 'أوجد مسقط $P(2,3,1)$ على $r$: ‏$(1,0,0)+t(1,1,0)$.', 'Find the projection of $P(2,3,1)$ on $r$: $(1,0,0)+t(1,1,0)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$P$ puntutik pasatzen den plano perpendikularra: normala $\\vec{u}$.', 'El plano perpendicular por $P$: normal $\\vec{u}$.', 'المستوى العمودي المار بـ $P$: ناظمه $\\vec{u}$.', 'The perpendicular plane through $P$: normal $\\vec{u}$.'), math: same('$(x-2)+(y-3)=0\\ \\to\\ x+y=5$') },
            { text: say('Ordezkatu zuzena.', 'Sustituye la recta.', 'عوّض المستقيم.', 'Put the line in.'), math: same('$(1+t)+t=5\\ \\to\\ t=2$') },
            { text: say('Oina.', 'El pie.', 'المسقط.', 'The foot.'), math: same('$M=(1+2,2,0)=(3,2,0)$') }
        ],
        takeaway: say('$P$ puntutik pasatzen den eta $\\vec{u}$ normala duen planoak zuzena $M$ puntuan ebakitzen du: zuzeneko punturik hurbilena $P$ puntutik.', 'El plano por $P$ con normal $\\vec{u}$ corta a la recta en $M$: el punto de la recta más cercano a $P$.', 'المستوى المار بـ $P$ وناظمه $\\vec{u}$ يقطع المستقيم في $M$: أقرب نقطة منه إلى $P$.', 'The plane through $P$ with normal $\\vec{u}$ meets the line at $M$: the point of the line closest to $P$.'),
        figure: (language) => <ProjectPointLineFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'project-line-plane',
        stage: 'projections',
        title: say('Zuzen baten proiekzioa plano batean', 'Proyección de una recta sobre un plano', 'مسقط مستقيم على مستوى', 'Projecting a line on a plane'),
        goal: say('Zuzen baten proiekzioa plano batean aurkitzea, haren bi puntu proiektatuz.', 'Hallar la proyección de una recta sobre un plano proyectando dos de sus puntos.', 'إيجاد مسقط مستقيم على مستوى بإسقاط نقطتين منه.', 'Find the projection of a line on a plane by projecting two of its points.'),
        needs: [LINE_PLANE_POSITION],
        problem: say('Proiektatu $r$: $(1,0,3)+t(1,1,-1)$ zuzena ${z}=0$ planoan.', 'Proyecta $r$: $(1,0,3)+t(1,1,-1)$ sobre el plano ${z}=0$.', 'أسقط $r$: ‏$(1,0,3)+t(1,1,-1)$ على المستوى ${z}=0$.', 'Project $r$: $(1,0,3)+t(1,1,-1)$ on the plane ${z}=0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bi puntu: $t=0$ eta $t=1$.', 'Dos puntos: $t=0$ y $t=1$.', 'نقطتان: $t=0$ و$t=1$.', 'Two points: $t=0$ and $t=1$.'), math: same('$A(1,0,3)\\qquad B(2,1,2)$') },
            { text: say('Lurrean proiektatzean, ${z}=0$.', 'Al proyectar en el suelo, ${z}=0$.', 'عند الإسقاط على الأرض، ${z}=0$.', 'Projecting on the floor, ${z}=0$.'), math: same('$A\'(1,0,0)\\qquad B\'(2,1,0)$') },
            { text: say('Haietatik pasatzen den zuzena.', 'La recta que pasa por ellos.', 'المستقيم المار بهما.', 'The line through them.'), math: same('$(x,y,{z})=(1,0,0)+t\\,(1,1,0)$') }
        ],
        takeaway: say('Zuzen baten proiekzioa haren bi punturen proiekzioetatik pasatzen den zuzena da. Zuzena planoarekiko perpendikularra bada, puntu bat geratzen da.', 'La proyección de una recta es la recta que pasa por las proyecciones de dos de sus puntos. Si la recta es perpendicular al plano, queda un punto.', 'مسقط المستقيم هو المستقيم المار بمسقطي نقطتين منه. وإذا كان المستقيم عموديًا على المستوى تبقى نقطة.', 'The projection of a line is the line through the projections of two of its points. If the line is perpendicular to the plane, a point is left.'),
        figure: (language) => <ProjectLinePlaneFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 3. Symmetric points ---------- */
    {
        id: 'symmetric-plane',
        stage: 'symmetric',
        title: say('Simetrikoa plano batekiko', 'Simétrico respecto de un plano', 'النظيرة بالنسبة إلى مستوى', 'Symmetric point in a plane'),
        goal: say('Puntu baten simetrikoa plano batekiko aurkitzea, proiekzioa erdiko puntu gisa erabiliz.', 'Hallar el simétrico de un punto respecto de un plano usando la proyección como punto medio.', 'إيجاد نظيرة نقطة بالنسبة إلى مستوى باستعمال المسقط منتصفًا.', 'Find the symmetric of a point in a plane, using the projection as the midpoint.'),
        needs: [MIDPOINT_SYMMETRIC],
        problem: say('Aurkitu $P(4,3,-1)$ puntuaren simetrikoa $\\pi$: $x+y=1$ planoarekiko.', 'Halla el simétrico de $P(4,3,-1)$ respecto de $\\pi$: $x+y=1$.', 'أوجد نظيرة $P(4,3,-1)$ بالنسبة إلى $\\pi$: ‏$x+y=1$.', 'Find the symmetric of $P(4,3,-1)$ with respect to $\\pi$: $x+y=1$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zuzen perpendikularra eta planoa.', 'Recta perpendicular y plano.', 'المستقيم العمودي والمستوى.', 'Perpendicular line and plane.'), math: same('$(4+t)+(3+t)=1\\ \\to\\ t=-3$') },
            { text: say('$M$ oina.', 'El pie $M$.', 'المسقط $M$.', 'The foot $M$.'), math: same('$M=(4-3,3-3,-1)=(1,0,-1)$') },
            { text: say('$P\'=2M-P$.', '$P\'=2M-P$.', '$P\'=2M-P$.', '$P\'=2M-P$.'), math: same('$\\begin{gathered}P\'=(2-4,0-3,-2+1)\\\\ =(-2,-3,-1)\\end{gathered}$') }
        ],
        takeaway: say('Simetrikoa: lehenik $M$ proiekzioa, gero $P\'=2M-P$. $M$ puntua $P$ eta $P\'$ puntuen erdian geratzen da.', 'El simétrico: primero la proyección $M$, después $P\'=2M-P$. $M$ queda en medio de $P$ y $P\'$.', 'النظيرة: أولًا المسقط $M$ ثم $P\'=2M-P$. وتقع $M$ في منتصف $P$ و$P\'$.', 'The symmetric point: first the projection $M$, then $P\'=2M-P$. $M$ is halfway between $P$ and $P\'$.'),
        figure: (language) => <SymmetricPlaneFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'symmetric-line',
        stage: 'symmetric',
        title: say('Simetrikoa zuzen batekiko', 'Simétrico respecto de una recta', 'النظيرة بالنسبة إلى مستقيم', 'Symmetric point in a line'),
        goal: say('Puntu baten simetrikoa zuzen batekiko aurkitzea, zuzeneko proiekzioarekin.', 'Hallar el simétrico de un punto respecto de una recta con la proyección sobre la recta.', 'إيجاد نظيرة نقطة بالنسبة إلى مستقيم بمسقطها عليه.', 'Find the symmetric of a point in a line with the projection on the line.'),
        needs: [REFLECTION_2D, MIDPOINT_SYMMETRIC],
        problem: say('Aurkitu $P(4,1,0)$ puntuaren simetrikoa $r$: $(t,1,t)$ zuzenarekiko.', 'Halla el simétrico de $P(4,1,0)$ respecto de $r$: $(t,1,t)$.', 'أوجد نظيرة $P(4,1,0)$ بالنسبة إلى $r$: ‏$(t,1,t)$.', 'Find the symmetric of $P(4,1,0)$ with respect to $r$: $(t,1,t)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$P$ puntutik pasatzen den plano perpendikularra.', 'El plano perpendicular por $P$.', 'المستوى العمودي المار بـ $P$.', 'The perpendicular plane through $P$.'), math: same('$x+{z}=4\\ \\to\\ t+t=4\\ \\to\\ t=2$') },
            { text: say('$M$ oina.', 'El pie $M$.', 'المسقط $M$.', 'The foot $M$.'), math: same('$M=(2,1,2)$') },
            { text: say('$P\'=2M-P$.', '$P\'=2M-P$.', '$P\'=2M-P$.', '$P\'=2M-P$.'), math: same('$P\'=(4-4,2-1,4-0)=(0,1,4)$') }
        ],
        takeaway: say('Zuzen batekiko simetrikoa: $M$ oina plano perpendikularrarekin, eta $P\'=2M-P$.', 'El simétrico respecto de una recta: el pie $M$ con el plano perpendicular, y $P\'=2M-P$.', 'النظيرة بالنسبة إلى مستقيم: المسقط $M$ بالمستوى العمودي، ثم $P\'=2M-P$.', 'The symmetric point in a line: the foot $M$ with the perpendicular plane, and $P\'=2M-P$.'),
        figure: (language) => <SymmetricLineFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'mediator-plane',
        stage: 'symmetric',
        title: say('Plano erdikaria', 'Plano mediador', 'المستوى المنصِّف', 'The mediator plane'),
        goal: say('Bi puntutatik distantzia berera dauden puntuen planoa idaztea.', 'Escribir el plano de los puntos que están a la misma distancia de dos puntos.', 'كتابة مستوى النقاط التي تبعد البعد نفسه عن نقطتين.', 'Write the plane of the points at the same distance from two points.'),
        needs: [MIDPOINT_SYMMETRIC, PLANE_GENERAL],
        problem: say('Aurkitu $A(1,2,3)$ eta $B(3,0,1)$ puntuen plano erdikaria.', 'Halla el plano mediador de $A(1,2,3)$ y $B(3,0,1)$.', 'أوجد المستوى المنصِّف لـ $A(1,2,3)$ و$B(3,0,1)$.', 'Find the mediator plane of $A(1,2,3)$ and $B(3,0,1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erdiko puntua eta $\\overrightarrow{AB}$.', 'Punto medio y $\\overrightarrow{AB}$.', 'المنتصف و$\\overrightarrow{AB}$.', 'Midpoint and $\\overrightarrow{AB}$.'), math: same('$M=(2,1,2)\\qquad\\overrightarrow{AB}=(2,-2,-2)$') },
            { text: say('Normala sinplifikatuta.', 'El normal simplificado.', 'الناظم مبسَّطًا.', 'The normal simplified.'), math: same('$x-y-{z}+D=0$') },
            { text: say('$M$ puntuarekin, $D$.', 'Con $M$, la $D$.', 'وبـ $M$ نجد $D$.', 'With $M$, the $D$.'), math: same('$2-1-2+D=0\\ \\to\\ D=1$') }
        ],
        takeaway: say('Plano erdikaria $AB$ zuzenkiaren erdiko puntutik pasatzen da, eta $\\overrightarrow{AB}$ du normala. Haren puntuak $A$ eta $B$ puntuetatik distantzia berera daude.', 'El plano mediador pasa por el punto medio de $AB$ y tiene normal $\\overrightarrow{AB}$. Sus puntos están a la misma distancia de $A$ y de $B$.', 'المستوى المنصِّف يمر بمنتصف $AB$ وناظمه $\\overrightarrow{AB}$. ونقاطه تبعد البعد نفسه عن $A$ و$B$.', 'The mediator plane goes through the midpoint of $AB$ and has normal $\\overrightarrow{AB}$. Its points are the same distance from $A$ and $B$.'),
        figure: (language) => <MediatorPlaneFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 4. Distance from a point ---------- */
    {
        id: 'point-plane',
        stage: 'point-distances',
        title: say('Puntu batetik plano baterako distantzia', 'Distancia de un punto a un plano', 'المسافة من نقطة إلى مستوى', 'Distance from a point to a plane'),
        goal: say('Puntu batetik plano baterako distantzia formula batekin kalkulatzea, oina aurkitu gabe.', 'Calcular la distancia de un punto a un plano con una fórmula, sin hallar el pie.', 'حساب المسافة من نقطة إلى مستوى بصيغة دون إيجاد المسقط.', 'Work out the distance from a point to a plane with a formula, without finding the foot.'),
        needs: [POINT_LINE_2D],
        problem: say('Zein da $P(3,3,1)$ puntutik $\\pi$: $2x+2y+{z}-4=0$ planorako distantzia?', '¿Cuál es la distancia de $P(3,3,1)$ a $\\pi$: $2x+2y+{z}-4=0$?', 'ما المسافة من $P(3,3,1)$ إلى $\\pi$: ‏$2x+2y+{z}-4=0$؟', 'What is the distance from $P(3,3,1)$ to $\\pi$: $2x+2y+{z}-4=0$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordezkatu puntua ekuazioan.', 'Sustituye el punto en la ecuación.', 'عوّض النقطة في المعادلة.', 'Put the point into the equation.'), math: same('$6+6+1-4=9$') },
            { text: say('Normalaren modulua.', 'El módulo del normal.', 'طول الناظم.', 'The magnitude of the normal.'), math: same('$\\sqrt{4+4+1}=3$') },
            { text: say('Zatitu, balio absolutuarekin.', 'Divide, con valor absoluto.', 'اقسم بالقيمة المطلقة.', 'Divide, with absolute value.'), math: same('$d=\\frac{9}{3}=3$') }
        ],
        takeaway: say('$d(P,\\pi)=\\frac{|Ax_0+By_0+C{z}_0+D|}{\\sqrt{A^2+B^2+C^2}}$: ordezkatu, balio absolutua eta normalaren moduluaz zatitu.', '$d(P,\\pi)=\\frac{|Ax_0+By_0+C{z}_0+D|}{\\sqrt{A^2+B^2+C^2}}$: sustituir, valor absoluto y dividir entre el módulo del normal.', '$d(P,\\pi)=\\frac{|Ax_0+By_0+C{z}_0+D|}{\\sqrt{A^2+B^2+C^2}}$: عوّض وخذ القيمة المطلقة واقسم على طول الناظم.', '$d(P,\\pi)=\\frac{|Ax_0+By_0+C{z}_0+D|}{\\sqrt{A^2+B^2+C^2}}$: substitute, absolute value and divide by the magnitude of the normal.'),
        figure: (language) => <PointPlaneFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'parallel-planes',
        stage: 'point-distances',
        title: say('Plano paraleloak eta zuzen paraleloa', 'Planos paralelos y recta paralela', 'المستويات المتوازية والمستقيم الموازي', 'Parallel planes and a parallel line'),
        goal: say('Bi plano paraleloren arteko distantzia eta plano baten paraleloa den zuzen batena kalkulatzea.', 'Calcular la distancia entre dos planos paralelos y la de una recta paralela a un plano.', 'حساب المسافة بين مستويين متوازيين ومسافة مستقيم موازٍ لمستوى.', 'Work out the distance between two parallel planes and from a line parallel to a plane.'),
        needs: [PARALLEL_LINES_2D, TWO_PLANES],
        problem: say('Zein da $\\pi_1$: $x+2y-2{z}=3$ eta $\\pi_2$: $2x+4y-4{z}=18$ planoen arteko distantzia?', '¿Cuál es la distancia entre $\\pi_1$: $x+2y-2{z}=3$ y $\\pi_2$: $2x+4y-4{z}=18$?', 'ما المسافة بين $\\pi_1$: ‏$x+2y-2{z}=3$ و$\\pi_2$: ‏$2x+4y-4{z}=18$؟', 'What is the distance between $\\pi_1$: $x+2y-2{z}=3$ and $\\pi_2$: $2x+4y-4{z}=18$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Normal bera: zatitu $\\pi_2$ 2 zenbakiaz.', 'El mismo normal: divide $\\pi_2$ entre 2.', 'الناظم نفسه: اقسم $\\pi_2$ على 2.', 'The same normal: divide $\\pi_2$ by 2.'), math: same('$x+2y-2{z}=9$') },
            { text: say('Normalaren modulua.', 'El módulo del normal.', 'طول الناظم.', 'The magnitude of the normal.'), math: same('$\\sqrt{1+4+4}=3$') },
            { text: say('Distantzia.', 'La distancia.', 'المسافة.', 'The distance.'), math: same('$d=\\frac{|9-3|}{3}=2$') }
        ],
        takeaway: say('Plano paraleloak, normal berarekin idatzita: $d=\\frac{|d_2-d_1|}{|\\vec{n}|}$. Plano baten paraleloa den zuzena: haren edozein puntutik planorako distantzia.', 'Planos paralelos, escritos con el mismo normal: $d=\\frac{|d_2-d_1|}{|\\vec{n}|}$. Recta paralela a un plano: la distancia de cualquiera de sus puntos al plano.', 'مستويان متوازيان مكتوبان بالناظم نفسه: $d=\\frac{|d_2-d_1|}{|\\vec{n}|}$. ومستقيم موازٍ لمستوى: مسافة أي نقطة منه إلى المستوى.', 'Parallel planes, written with the same normal: $d=\\frac{|d_2-d_1|}{|\\vec{n}|}$. A line parallel to a plane: the distance from any of its points to the plane.'),
        figure: (language) => <ParallelPlanesFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'point-line',
        stage: 'point-distances',
        title: say('Puntu batetik zuzen baterako distantzia', 'Distancia de un punto a una recta', 'المسافة من نقطة إلى مستقيم', 'Distance from a point to a line'),
        goal: say('Puntu batetik zuzen baterako distantzia biderkadura bektorialarekin kalkulatzea.', 'Calcular la distancia de un punto a una recta con el producto vectorial.', 'حساب المسافة من نقطة إلى مستقيم بالجداء المتجهي.', 'Work out the distance from a point to a line with the cross product.'),
        needs: [CROSS_AREA, POINT_LINE_2D],
        problem: say('Zein da $P(2,3,4)$ puntutik $x$ ardatzerako distantzia?', '¿Cuál es la distancia de $P(2,3,4)$ al eje $x$?', 'ما المسافة من $P(2,3,4)$ إلى المحور $x$؟', 'What is the distance from $P(2,3,4)$ to the $x$ axis?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$A=(0,0,0)$ eta $\\vec{u}=(1,0,0)$.', '$A=(0,0,0)$ y $\\vec{u}=(1,0,0)$.', '$A=(0,0,0)$ و$\\vec{u}=(1,0,0)$.', '$A=(0,0,0)$ and $\\vec{u}=(1,0,0)$.'), math: same('$\\overrightarrow{AP}=(2,3,4)$') },
            { text: say('Biderkadura bektoriala.', 'El producto vectorial.', 'الجداء المتجهي.', 'The cross product.'), math: same('$\\overrightarrow{AP}\\times\\vec{u}=(0,4,-3)$') },
            { text: say('Azalera zati oinarria.', 'Área entre base.', 'المساحة على القاعدة.', 'Area divided by base.'), math: same('$d=\\frac{\\sqrt{16+9}}{1}=5$') }
        ],
        takeaway: say('$d(P,r)=\\frac{|\\overrightarrow{AP}\\times\\vec{u}|}{|\\vec{u}|}$: paralelogramoaren altuera. $A$ zuzeneko edozein puntu izan daiteke.', '$d(P,r)=\\frac{|\\overrightarrow{AP}\\times\\vec{u}|}{|\\vec{u}|}$: la altura del paralelogramo. $A$ puede ser cualquier punto de la recta.', '$d(P,r)=\\frac{|\\overrightarrow{AP}\\times\\vec{u}|}{|\\vec{u}|}$: ارتفاع متوازي الأضلاع. ويمكن أن تكون $A$ أي نقطة من المستقيم.', '$d(P,r)=\\frac{|\\overrightarrow{AP}\\times\\vec{u}|}{|\\vec{u}|}$: the height of the parallelogram. $A$ can be any point of the line.'),
        figure: (language) => <PointLineFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 5. Distance between lines ---------- */
    {
        id: 'parallel-lines',
        stage: 'line-distances',
        title: say('Zuzen paraleloen arteko distantzia', 'Distancia entre rectas paralelas', 'المسافة بين مستقيمين متوازيين', 'Distance between parallel lines'),
        goal: say('Bi zuzen paraleloren arteko distantzia kalkulatzea, puntu batetik zuzen baterako distantziarekin.', 'Calcular la distancia entre dos rectas paralelas con la de un punto a una recta.', 'حساب المسافة بين مستقيمين متوازيين بمسافة نقطة إلى مستقيم.', 'Work out the distance between two parallel lines with the distance from a point to a line.'),
        needs: [PARALLEL_LINES_2D],
        problem: say('$r$ zuzena ${z}$ ardatza da, eta $s$: $(3,4,1)+\\lambda(0,0,2)$. Zein da haien distantzia?', '$r$ es el eje ${z}$ y $s$: $(3,4,1)+\\lambda(0,0,2)$. ¿Cuál es su distancia?', '$r$ هو المحور ${z}$ و$s$: ‏$(3,4,1)+\\lambda(0,0,2)$. ما المسافة بينهما؟', '$r$ is the ${z}$ axis and $s$: $(3,4,1)+\\lambda(0,0,2)$. What is their distance?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Paraleloak: $(0,0,2)=2\\,(0,0,1)$.', 'Paralelas: $(0,0,2)=2\\,(0,0,1)$.', 'متوازيان: $(0,0,2)=2\\,(0,0,1)$.', 'Parallel: $(0,0,2)=2\\,(0,0,1)$.'), math: same('$B=(3,4,1)\\qquad\\overrightarrow{AB}=(3,4,1)$') },
            { text: say('Biderkadura bektoriala, $\\vec{u}=(0,0,1)$ norabidearekin.', 'Producto vectorial con $\\vec{u}=(0,0,1)$.', 'الجداء المتجهي مع $\\vec{u}=(0,0,1)$.', 'Cross product with $\\vec{u}=(0,0,1)$.'), math: same('$\\overrightarrow{AB}\\times\\vec{u}=(4,-3,0)$') },
            { text: say('Distantzia.', 'La distancia.', 'المسافة.', 'The distance.'), math: same('$d=\\frac{\\sqrt{16+9}}{1}=5$') }
        ],
        takeaway: say('Bi zuzen paraleloren distantzia: haietako baten $B$ puntutik bestera, $\\frac{|\\overrightarrow{AB}\\times\\vec{u}|}{|\\vec{u}|}$.', 'La distancia entre dos rectas paralelas: de un punto $B$ de una a la otra, $\\frac{|\\overrightarrow{AB}\\times\\vec{u}|}{|\\vec{u}|}$.', 'المسافة بين مستقيمين متوازيين: من نقطة $B$ من أحدهما إلى الآخر، $\\frac{|\\overrightarrow{AB}\\times\\vec{u}|}{|\\vec{u}|}$.', 'The distance between two parallel lines: from a point $B$ of one to the other, $\\frac{|\\overrightarrow{AB}\\times\\vec{u}|}{|\\vec{u}|}$.'),
        figure: (language) => <ParallelLinesFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'skew-distance',
        stage: 'line-distances',
        title: say('Gurutzatzen diren zuzenen distantzia', 'Distancia entre rectas que se cruzan', 'المسافة بين مستقيمين متخالفين', 'Distance between skew lines'),
        goal: say('Gurutzatzen diren bi zuzenen arteko distantzia kalkulatzea, kutxa baten bolumena zati oinarria eginez.', 'Calcular la distancia entre dos rectas que se cruzan como volumen de una caja entre su base.', 'حساب المسافة بين مستقيمين متخالفين بحجم صندوق على قاعدته.', 'Work out the distance between two skew lines as the volume of a box divided by its base.'),
        needs: [MIXED_VOLUME, LINES_CROSS],
        problem: say('$r$ zuzena $x$ ardatza da, eta $s$: $(0,1,2)+\\lambda(0,1,0)$. Zein da haien distantzia?', '$r$ es el eje $x$ y $s$: $(0,1,2)+\\lambda(0,1,0)$. ¿Cuál es su distancia?', '$r$ هو المحور $x$ و$s$: ‏$(0,1,2)+\\lambda(0,1,0)$. ما المسافة بينهما؟', '$r$ is the $x$ axis and $s$: $(0,1,2)+\\lambda(0,1,0)$. What is their distance?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Datuak.', 'Los datos.', 'المعطيات.', 'The data.'), math: same('$\\overrightarrow{AB}=(0,1,2)\\qquad\\vec{u}\\times\\vec{v}=(0,0,1)$') },
            { text: say('Biderkadura mistoa: bolumena.', 'El producto mixto: el volumen.', 'الجداء المختلط: الحجم.', 'The triple product: the volume.'), math: same('$[\\overrightarrow{AB},\\vec{u},\\vec{v}]=(0,1,2)\\cdot(0,0,1)=2$') },
            { text: say('Zati oinarria.', 'Entre la base.', 'على القاعدة.', 'Divided by the base.'), math: same('$d=\\frac{2}{1}=2$') }
        ],
        takeaway: say('$d(r,s)=\\frac{|[\\overrightarrow{AB},\\vec{u},\\vec{v}]|}{|\\vec{u}\\times\\vec{v}|}$: kutxaren bolumena zati oinarriaren azalera. Biderkadura mistoa 0 bada, zuzenak ebakitzen dira.', '$d(r,s)=\\frac{|[\\overrightarrow{AB},\\vec{u},\\vec{v}]|}{|\\vec{u}\\times\\vec{v}|}$: volumen de la caja entre el área de la base. Si el producto mixto es 0, las rectas se cortan.', '$d(r,s)=\\frac{|[\\overrightarrow{AB},\\vec{u},\\vec{v}]|}{|\\vec{u}\\times\\vec{v}|}$: حجم الصندوق على مساحة القاعدة. وإذا كان الجداء المختلط 0 فالمستقيمان متقاطعان.', '$d(r,s)=\\frac{|[\\overrightarrow{AB},\\vec{u},\\vec{v}]|}{|\\vec{u}\\times\\vec{v}|}$: volume of the box divided by the area of the base. If the triple product is 0, the lines meet.'),
        figure: (language) => <SkewDistanceFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'common-perpendicular',
        stage: 'line-distances',
        title: say('Perpendikular komuna', 'La perpendicular común', 'العمودي المشترك', 'The common perpendicular'),
        goal: say('Gurutzatzen diren bi zuzenen punturik hurbilenak eta haien perpendikular komuna aurkitzea.', 'Hallar los puntos más cercanos de dos rectas que se cruzan y su perpendicular común.', 'إيجاد أقرب نقطتين من مستقيمين متخالفين وعمودهما المشترك.', 'Find the closest points of two skew lines and their common perpendicular.'),
        needs: [LINES_CROSS],
        problem: say('$r$: $(t,0,0)$ eta $s$: $(0,1+\\lambda,2)$. Aurkitu punturik hurbilenak.', '$r$: $(t,0,0)$ y $s$: $(0,1+\\lambda,2)$. Halla los puntos más cercanos.', '$r$: ‏$(t,0,0)$ و$s$: ‏$(0,1+\\lambda,2)$. أوجد أقرب نقطتين.', '$r$: $(t,0,0)$ and $s$: $(0,1+\\lambda,2)$. Find the closest points.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Puntu orokorrak eta $\\overrightarrow{PQ}$.', 'Puntos genéricos y $\\overrightarrow{PQ}$.', 'النقطتان العامتان و$\\overrightarrow{PQ}$.', 'General points and $\\overrightarrow{PQ}$.'), math: same('$\\overrightarrow{PQ}=(-t,1+\\lambda,2)$') },
            { text: say('Biekiko perpendikularra.', 'Perpendicular a los dos.', 'عمودي على الاثنين.', 'Perpendicular to both.'), math: same('$\\begin{gathered}\\overrightarrow{PQ}\\cdot(1,0,0)=-t=0\\\\ \\overrightarrow{PQ}\\cdot(0,1,0)=1+\\lambda=0\\end{gathered}$') },
            { text: say('Puntuak eta distantzia.', 'Los puntos y la distancia.', 'النقطتان والمسافة.', 'The points and the distance.'), math: same('$P(0,0,0)\\qquad Q(0,0,2)\\qquad|\\overrightarrow{PQ}|=2$') }
        ],
        takeaway: say('Perpendikular komuna $P$ eta $Q$ puntuetatik pasatzen da, $\\overrightarrow{PQ}\\cdot\\vec{u}=0$ eta $\\overrightarrow{PQ}\\cdot\\vec{v}=0$ direnean. $|\\overrightarrow{PQ}|$ zuzenen arteko distantzia da.', 'La perpendicular común pasa por $P$ y $Q$, con $\\overrightarrow{PQ}\\cdot\\vec{u}=0$ y $\\overrightarrow{PQ}\\cdot\\vec{v}=0$. $|\\overrightarrow{PQ}|$ es la distancia entre las rectas.', 'العمودي المشترك يمر بـ $P$ و$Q$ حيث $\\overrightarrow{PQ}\\cdot\\vec{u}=0$ و$\\overrightarrow{PQ}\\cdot\\vec{v}=0$. و$|\\overrightarrow{PQ}|$ هي المسافة بين المستقيمين.', 'The common perpendicular goes through $P$ and $Q$, with $\\overrightarrow{PQ}\\cdot\\vec{u}=0$ and $\\overrightarrow{PQ}\\cdot\\vec{v}=0$. $|\\overrightarrow{PQ}|$ is the distance between the lines.'),
        figure: (language) => <CommonPerpendicularFigure language={language} />,
        figureAfterSteps: true
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const anglesDistancesTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...anglesDistancesLessonTexts[topic.id as AnglesDistancesTopicId], ...anglesDistancesLessonChecks[topic.id as AnglesDistancesTopicId] }))
