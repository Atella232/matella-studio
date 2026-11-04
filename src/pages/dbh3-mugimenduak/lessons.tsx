import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { HomothetyFigure } from '../dbh4-aplikatuak-antzekotasuna/figures'
import { MotionFigure } from './figures'
import { motions3LessonChecks, type Motions3TopicId } from './lessonChecks'
import { motions3LessonTexts } from './lessonTexts'
import { say, same } from './text'

/* ==========================================================================
   Planoko mugimenduak · 3. DBH — stages and lessons, following Santillana
   3.º ESO unit 9 «Movimientos en el plano» (vectors, translations,
   rotations, symmetries, homotheties) and Anaya 3.º ESO unit 12
   «Transformaciones geométricas» (movements, composition, friezes,
   rosettes and tessellations). Every number and context is original: the
   books only fix the scope and the order. Each lesson names its typical
   mistake.
   ========================================================================== */

export type Motions3StageId = 'vectors' | 'translations' | 'rotations' | 'reflections' | 'patterns'

export const motions3Stages: UnitStage[] = [
    { id: 'vectors', tone: 'blue', title: { eu: 'Bektoreak', es: 'Vectores', en: 'Vectors', ar: 'المتجهات' } },
    { id: 'translations', tone: 'violet', title: { eu: 'Lekualdaketak', es: 'Traslaciones', en: 'Translations', ar: 'الانسحابات' } },
    { id: 'rotations', tone: 'mustard', title: { eu: 'Biraketak', es: 'Giros', en: 'Rotations', ar: 'الدورانات' } },
    { id: 'reflections', tone: 'coral', title: { eu: 'Simetriak', es: 'Simetrías', en: 'Reflections', ar: 'التناظرات' } },
    { id: 'patterns', tone: 'green', title: { eu: 'Frisoak eta mosaikoak', es: 'Frisos y mosaicos', en: 'Friezes and tilings', ar: 'الأفاريز والتبليطات' } }
]

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Vectors ---------- */
    {
        id: 'vector-components',
        stage: 'vectors',
        figureAfterSteps: true,
        title: say('Bektoreak eta haien osagaiak', 'Vectores y sus componentes', 'المتجهات ومركّباتها', 'Vectors and their components'),
        goal: say('Bektore baten osagaiak bi puntutatik kalkulatzea.', 'Calcular las componentes de un vector a partir de dos puntos.', 'حساب مركّبتي متجه انطلاقًا من نقطتين.', 'Work out the components of a vector from two points.'),
        needs: [{ unit: 'dbh2/funciones', topic: 'coordinates', title: { eu: 'Koordenatuak eta koadranteak', es: 'Coordenadas y cuadrantes', en: 'Coordinates and quadrants', ar: 'الإحداثيات والأرباع' } }],
        problem: say('$A=(1,1)$ eta $B=(5,4)$. Zeintzuk dira $\\vec{AB}$ bektorearen osagaiak?', '$A=(1,1)$ y $B=(5,4)$. ¿Cuáles son las componentes de $\\vec{AB}$?', '$A=(1,1)$ و$B=(5,4)$. ما مركّبتا $\\vec{AB}$؟', '$A=(1,1)$ and $B=(5,4)$. What are the components of $\\vec{AB}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Muturra ken jatorria.', 'Extremo menos origen.', 'النهاية ناقص البداية.', 'End minus start.'), math: same('$(5-1,\\ 4-1)$') },
            { text: say('Emaitza.', 'Resultado.', 'النتيجة.', 'Result.'), math: same('$\\vec{AB}=(4,3)$') }
        ],
        takeaway: same('$\\vec{AB}=(x_{2}-x_{1},\\ y_{2}-y_{1})$'),
        figure: (language) => <MotionFigure language={language} kind="components" />
    },
    {
        id: 'vector-modulus',
        stage: 'vectors',
        title: say('Bektore baten modulua', 'El módulo de un vector', 'طول المتجه', 'The length of a vector'),
        goal: say('Bektore baten luzera Pitagorasekin kalkulatzea.', 'Calcular la longitud de un vector con Pitágoras.', 'حساب طول متجه بفيثاغورس.', 'Work out the length of a vector with Pythagoras.'),
        needs: [{ unit: 'dbh3/geometria-plana', topic: 'pythagoras', title: { eu: 'Pitagorasen teorema', es: 'El teorema de Pitágoras', en: 'Pythagoras\' theorem', ar: 'مبرهنة فيثاغورس' } }],
        problem: say('Zein da $\\vec{v}=(-6,8)$ bektorearen modulua?', '¿Cuál es el módulo de $\\vec{v}=(-6,8)$?', 'ما طول $\\vec{v}=(-6,8)$؟', 'What is the length of $\\vec{v}=(-6,8)$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Karratuak.', 'Los cuadrados.', 'المربعان.', 'The squares.'), math: same('$(-6)^{2}+8^{2}=36+64=100$') },
            { text: say('Erroa.', 'La raíz.', 'الجذر.', 'The root.'), math: same('$\\sqrt{100}=10$') }
        ],
        takeaway: same('$|\\vec{v}|=\\sqrt{a^{2}+b^{2}}$'),
        figure: (language) => <MotionFigure language={language} kind="components" />
    },
    {
        id: 'vector-sum',
        stage: 'vectors',
        title: say('Bektoreen batura', 'Suma de vectores', 'جمع المتجهات', 'Adding vectors'),
        goal: say('Bi bektore osagaiz osagai eta grafikoki batzea.', 'Sumar dos vectores componente a componente y gráficamente.', 'جمع متجهين مركّبة بمركّبة وبيانيًا.', 'Add two vectors component by component and on a drawing.'),
        problem: same('$\\vec{u}=(3,1),\\ \\vec{v}=(1,3)$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batu osagaiak.', 'Suma las componentes.', 'اجمع المركّبات.', 'Add the components.'), math: same('$\\vec{u}+\\vec{v}=(4,4)$') }
        ],
        takeaway: same('$(a,b)+(c,d)=(a+c,\\ b+d)$'),
        figure: (language) => <MotionFigure language={language} kind="sum" />
    },
    /* ---------- 2. Translations ---------- */
    {
        id: 'translation',
        stage: 'translations',
        figureAfterSteps: true,
        title: say('Lekualdaketak', 'Traslaciones', 'الانسحابات', 'Translations'),
        goal: say('Irudi bat bektore batekin lekualdatzea.', 'Trasladar una figura con un vector.', 'نقل شكل بمتجه.', 'Translate a shape by a vector.'),
        problem: say('$P=(3,2)$ puntua $\\vec{v}=(4,2)$ bektorearekin lekualdatzen da. Non dago $P^{\\prime}$?', 'El punto $P=(3,2)$ se traslada con $\\vec{v}=(4,2)$. ¿Dónde queda $P^{\\prime}$?', 'تُنقل النقطة $P=(3,2)$ بالمتجه $\\vec{v}=(4,2)$. أين تقع $P^{\\prime}$؟', 'The point $P=(3,2)$ is translated by $\\vec{v}=(4,2)$. Where is $P^{\\prime}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('4 eskuinera eta 2 gora.', '4 a la derecha y 2 hacia arriba.', '4 يمينًا و2 إلى الأعلى.', '4 to the right and 2 up.'), math: same('$(3+4,\\ 2+2)=(7,4)$') }
        ],
        takeaway: say('Puntu GUZTIAK bektore berarekin: $P^{\\prime}=P+\\vec{v}$.', 'TODOS los puntos con el mismo vector: $P^{\\prime}=P+\\vec{v}$.', 'كل النقاط بالمتجه نفسه: $P^{\\prime}=P+\\vec{v}$.', 'EVERY point by the same vector: $P^{\\prime}=P+\\vec{v}$.'),
        figure: (language) => <MotionFigure language={language} kind="translation" />
    },
    {
        id: 'translation-coordinates',
        stage: 'translations',
        title: say('Lekualdaketak koordenatuetan', 'Traslaciones en coordenadas', 'الانسحابات بالإحداثيات', 'Translations in coordinates'),
        goal: say('Puntu baten irudia eta lekualdaketaren bektorea koordenatuekin kalkulatzea.', 'Calcular la imagen de un punto y el vector de una traslación con coordenadas.', 'حساب صورة نقطة ومتجه الانسحاب بالإحداثيات.', 'Work out the image of a point and the vector of a translation with coordinates.'),
        problem: say('$A=(-2,5)$ puntuaren irudia $A^{\\prime}=(3,1)$ da. Zein da bektorea?', 'La imagen de $A=(-2,5)$ es $A^{\\prime}=(3,1)$. ¿Cuál es el vector?', 'صورة $A=(-2,5)$ هي $A^{\\prime}=(3,1)$. ما المتجه؟', 'The image of $A=(-2,5)$ is $A^{\\prime}=(3,1)$. What is the vector?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Irudia ken puntua.', 'Imagen menos punto.', 'الصورة ناقص النقطة.', 'Image minus point.'), math: same('$(3-(-2),\\ 1-5)=(5,-4)$') }
        ],
        takeaway: same('$(x,y)\\to(x+a,\\ y+b)$'),
        figure: (language) => <MotionFigure language={language} kind="coordinates" />
    },
    {
        id: 'translation-composition',
        stage: 'translations',
        title: say('Lekualdaketak elkarren segidan', 'Traslaciones seguidas', 'انسحابات متتالية', 'One translation after another'),
        goal: say('Bi lekualdaketa bakar batekin ordeztea.', 'Sustituir dos traslaciones por una sola.', 'استبدال انسحابين بانسحاب واحد.', 'Replace two translations with a single one.'),
        problem: say('$(3,-2)$ bektorearekin eta gero $(2,3)$ bektorearekin lekualdatzen da. Zein bektore bakarrek egiten du gauza bera?', 'Se traslada con $(3,-2)$ y después con $(2,3)$. ¿Qué vector solo hace lo mismo?', 'ننقل بـ$(3,-2)$ ثم بـ$(2,3)$. أي متجه واحد يفعل الشيء نفسه؟', 'You translate by $(3,-2)$ and then by $(2,3)$. Which single vector does the same?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batu bektoreak.', 'Suma los vectores.', 'اجمع المتجهين.', 'Add the vectors.'), math: same('$(3+2,\\ -2+3)=(5,1)$') }
        ],
        takeaway: say('$\\vec{u}$ eta gero $\\vec{v}$ = $\\vec{u}+\\vec{v}$', '$\\vec{u}$ y después $\\vec{v}$ = $\\vec{u}+\\vec{v}$', '$\\vec{u}$ ثم $\\vec{v}$ = $\\vec{u}+\\vec{v}$', '$\\vec{u}$ then $\\vec{v}$ = $\\vec{u}+\\vec{v}$'),
        figure: (language) => <MotionFigure language={language} kind="two-translations" />
    },
    /* ---------- 3. Rotations ---------- */
    {
        id: 'rotation',
        stage: 'rotations',
        title: say('Biraketak', 'Giros', 'الدورانات', 'Rotations'),
        goal: say('Irudi bat zentro baten inguruan angelu batez biratzea.', 'Girar una figura alrededor de un centro un ángulo dado.', 'تدوير شكل حول مركز بزاوية معطاة.', 'Rotate a shape about a centre by a given angle.'),
        problem: say('$P$ puntua $O$ zentrotik 5 cm-ra dago. 90° biratu ondoren, zein distantziatara dago $P^{\\prime}$ zentrotik?', 'El punto $P$ está a 5 cm del centro $O$. Tras un giro de 90°, ¿a qué distancia del centro está $P^{\\prime}$?', 'النقطة $P$ على بعد 5 سم من المركز $O$. بعد دوران 90° على أي بعد من المركز تقع $P^{\\prime}$؟', 'The point $P$ is 5 cm from the centre $O$. After a 90° rotation, how far from the centre is $P^{\\prime}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biraketak zentrorako distantzia gordetzen du.', 'El giro conserva la distancia al centro.', 'يحافظ الدوران على البعد عن المركز.', 'A rotation keeps the distance to the centre.'), math: same('$OP^{\\prime}=OP=5$') }
        ],
        takeaway: say('Biraketa = ZENTROA + ANGELUA; $OP^{\\prime}=OP$.', 'Giro = CENTRO + ÁNGULO; $OP^{\\prime}=OP$.', 'الدوران = المركز + الزاوية؛ $OP^{\\prime}=OP$.', 'Rotation = CENTRE + ANGLE; $OP^{\\prime}=OP$.'),
        figure: (language) => <MotionFigure language={language} kind="rotation" />
    },
    {
        id: 'rotation-coordinates',
        stage: 'rotations',
        title: say('Biraketak koordenatuetan', 'Giros en coordenadas', 'الدورانات بالإحداثيات', 'Rotations in coordinates'),
        goal: say('Jatorriaren inguruko 90°, 180° eta 270°-ko biraketak koordenatuekin egitea.', 'Hacer giros de 90°, 180° y 270° alrededor del origen con coordenadas.', 'إجراء دورانات 90° و180° و270° حول الأصل بالإحداثيات.', 'Do rotations of 90°, 180° and 270° about the origin with coordinates.'),
        problem: say('$P=(3,2)$ jatorriaren inguruan 90° biratzen da. Non dago $P^{\\prime}$?', '$P=(3,2)$ gira 90° alrededor del origen. ¿Dónde queda $P^{\\prime}$?', 'تدور $P=(3,2)$ بزاوية 90° حول الأصل. أين تقع $P^{\\prime}$؟', '$P=(3,2)$ is rotated 90° about the origin. Where is $P^{\\prime}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Trukatu eta aldatu lehenengoaren zeinua.', 'Intercambia y cambia el signo de la primera.', 'بادِل وغيّر إشارة الأول.', 'Swap and change the sign of the first.'), math: same('$(-2,3)$') },
            { text: say('Egiaztatu distantzia.', 'Comprueba la distancia.', 'تحقّق من البعد.', 'Check the distance.'), math: same('$3^{2}+2^{2}=13=(-2)^{2}+3^{2}$') }
        ],
        takeaway: same('$90°$: $(x,y)\\to(-y,x)$'),
        figure: (language) => <MotionFigure language={language} kind="rotation-coordinates" />
    },
    {
        id: 'central-symmetry',
        stage: 'rotations',
        title: say('Simetria zentrala eta errosetoiak', 'Simetría central y rosetones', 'التناظر المركزي والزخارف الدائرية', 'Central symmetry and rosettes'),
        goal: say('Simetria zentrala 180°-ko biraketa gisa ezagutzea eta irudi baten biraketa-ordena aurkitzea.', 'Reconocer la simetría central como un giro de 180° y hallar el orden de giro de una figura.', 'التعرّف على التناظر المركزي كدوران 180° وإيجاد رتبة دوران شكل.', 'See central symmetry as a 180° rotation and find the order of rotation of a shape.'),
        problem: say('$P=(4,-1)$ eta $O=(1,1)$. Zein da $P$ puntuaren simetrikoa $O$ puntuarekiko?', '$P=(4,-1)$ y $O=(1,1)$. ¿Cuál es el simétrico de $P$ respecto a $O$?', '$P=(4,-1)$ و$O=(1,1)$. ما نظير $P$ بالنسبة إلى $O$؟', '$P=(4,-1)$ and $O=(1,1)$. What is the image of $P$ in the point $O$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$O$ erdiko puntua da: $P^{\\prime}=2O-P$.', '$O$ es el punto medio: $P^{\\prime}=2O-P$.', '$O$ المنتصف: $P^{\\prime}=2O-P$.', '$O$ is the midpoint: $P^{\\prime}=2O-P$.'), math: same('$(2-4,\\ 2+1)=(-2,3)$') }
        ],
        takeaway: say('Simetria zentrala = 180° biraketa: $P^{\\prime}=2O-P$.', 'Simetría central = giro de 180°: $P^{\\prime}=2O-P$.', 'التناظر المركزي = دوران 180°: $P^{\\prime}=2O-P$.', 'Central symmetry = rotation by 180°: $P^{\\prime}=2O-P$.'),
        figure: (language) => <MotionFigure language={language} kind="central" />
    },
    /* ---------- 4. Reflections ---------- */
    {
        id: 'axial-symmetry',
        stage: 'reflections',
        title: say('Simetria axiala', 'Simetría axial', 'التناظر المحوري', 'Reflection'),
        goal: say('Irudi bat ardatz batekiko islatzea eta irudi baten simetria-ardatzak aurkitzea.', 'Reflejar una figura respecto a un eje y encontrar los ejes de simetría de una figura.', 'عكس شكل بالنسبة إلى محور وإيجاد محاور تناظر شكل.', 'Reflect a shape in an axis and find the axes of symmetry of a shape.'),
        needs: [{ unit: 'dbh3/geometria-plana', topic: 'perpendicular-bisector', title: { eu: 'Segmentu baten erdibitzailea', es: 'La mediatriz de un segmento', en: 'The perpendicular bisector', ar: 'المنصّف العمودي لقطعة' } }],
        problem: say('$P=(5,2)$ eta ardatza $x=3$ zuzena. Non dago $P^{\\prime}$?', '$P=(5,2)$ y el eje es la recta $x=3$. ¿Dónde queda $P^{\\prime}$?', '$P=(5,2)$ والمحور المستقيم $x=3$. أين تقع $P^{\\prime}$؟', '$P=(5,2)$ and the axis is the line $x=3$. Where is $P^{\\prime}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$P$ ardatzetik 2 unitatera dago eskuinean.', '$P$ está 2 unidades a la derecha del eje.', '$P$ على بعد وحدتين يمين المحور.', '$P$ is 2 units to the right of the axis.') },
            { text: say('$P^{\\prime}$ 2 unitatera ezkerrean.', '$P^{\\prime}$, 2 unidades a la izquierda.', '$P^{\\prime}$ على بعد وحدتين يساره.', '$P^{\\prime}$, 2 units to the left.'), math: same('$P^{\\prime}=(1,2)$') }
        ],
        takeaway: say('Ardatza $PP^{\\prime}$ segmentuaren ERDIBITZAILEA da.', 'El eje es la MEDIATRIZ de $PP^{\\prime}$.', 'المحور هو المنصّف العمودي لـ$PP^{\\prime}$.', 'The axis is the PERPENDICULAR BISECTOR of $PP^{\\prime}$.'),
        figure: (language) => <MotionFigure language={language} kind="axial" />
    },
    {
        id: 'reflection-coordinates',
        stage: 'reflections',
        title: say('Simetriak koordenatuetan', 'Simetrías en coordenadas', 'التناظرات بالإحداثيات', 'Reflections in coordinates'),
        goal: say('Ardatz koordenatuekiko eta $y=x$ zuzenarekiko simetriak egitea.', 'Hacer simetrías respecto a los ejes de coordenadas y a la recta $y=x$.', 'إجراء التناظرات بالنسبة إلى محوري الإحداثيات والمستقيم $y=x$.', 'Reflect in the coordinate axes and in the line $y=x$.'),
        needs: [{ unit: 'dbh2/funciones', topic: 'coordinates', title: { eu: 'Koordenatuak eta koadranteak', es: 'Coordenadas y cuadrantes', en: 'Coordinates and quadrants', ar: 'الإحداثيات والأرباع' } }],
        problem: say('Zein da $(3,3)$ puntuaren simetrikoa X ardatzarekiko?', '¿Cuál es el simétrico de $(3,3)$ respecto al eje X?', 'ما نظير $(3,3)$ بالنسبة إلى محور X؟', 'What is the image of $(3,3)$ in the X axis?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$y$ koordenatuaren zeinua aldatu.', 'Cambia el signo de la $y$.', 'غيّر إشارة $y$.', 'Change the sign of $y$.'), math: same('$(3,-3)$') }
        ],
        takeaway: say('X ardatza: $(x,y)\\to(x,-y)$. Y ardatza: $(x,y)\\to(-x,y)$.', 'Eje X: $(x,y)\\to(x,-y)$. Eje Y: $(x,y)\\to(-x,y)$.', 'محور X: $(x,y)\\to(x,-y)$. محور Y: $(x,y)\\to(-x,y)$.', 'X axis: $(x,y)\\to(x,-y)$. Y axis: $(x,y)\\to(-x,y)$.'),
        figure: (language) => <MotionFigure language={language} kind="reflection-coordinates" />
    },
    {
        id: 'two-mirrors',
        stage: 'reflections',
        title: say('Bi simetria elkarren segidan', 'Dos simetrías seguidas', 'تناظران متتاليان', 'Two reflections in a row'),
        goal: say('Bi simetria axialen konposizioa ezagutzea: lekualdaketa edo biraketa.', 'Reconocer la composición de dos simetrías axiales: traslación o giro.', 'التعرّف على تركيب تناظرين محوريين: انسحاب أو دوران.', 'Recognise two reflections in a row: a translation or a rotation.'),
        problem: say('$x=-2$ eta $x=1$ ardatzekiko simetriak elkarren segidan egiten dira. Zein mugimendu da?', 'Se hacen seguidas las simetrías de ejes $x=-2$ y $x=1$. ¿Qué movimiento es?', 'نجري التناظرين بالمحورين $x=-2$ و$x=1$ متتاليين. أي حركة هي؟', 'You reflect in $x=-2$ and then in $x=1$. Which movement is it?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ardatzen arteko distantzia.', 'Distancia entre los ejes.', 'المسافة بين المحورين.', 'Distance between the axes.'), math: same('$1-(-2)=3$') },
            { text: say('Lekualdaketa, bikoitza eskuinera.', 'Traslación del doble, a la derecha.', 'انسحاب بالضعف إلى اليمين.', 'A translation of twice that, to the right.'), math: same('$\\vec{v}=(6,0)$') }
        ],
        takeaway: say('Paraleloak: lekualdaketa $2d$. Ebakitzaileak: biraketa $2\\alpha$.', 'Paralelos: traslación $2d$. Secantes: giro $2\\alpha$.', 'متوازيان: انسحاب $2d$. متقاطعان: دوران $2\\alpha$.', 'Parallel: translation $2d$. Crossing: rotation $2\\alpha$.'),
        figure: (language) => <MotionFigure language={language} kind="two-mirrors" />
    },
    /* ---------- 5. Patterns ---------- */
    {
        id: 'friezes',
        stage: 'patterns',
        title: say('Frisoak', 'Frisos', 'الأفاريز', 'Friezes'),
        goal: say('Friso bat motibo bat eta lekualdaketa bat bezala ikustea.', 'Ver un friso como un motivo y una traslación.', 'رؤية الإفريز كنقش وانسحاب.', 'See a frieze as one motif and a translation.'),
        problem: say('Friso batek 3 cm-ko motiboak ditu, 5 cm-ko bektorearekin. Zenbat neurtzen du 8 motiboko frisoak?', 'Un friso tiene motivos de 3 cm con un vector de 5 cm. ¿Cuánto mide un friso de 8 motivos?', 'إفريز نقوشه بعرض 3 سم والمتجه 5 سم. كم طول إفريز من 8 نقوش؟', 'A frieze has 3 cm motifs with a 5 cm vector. How long is a frieze of 8 motifs?'),
        stepsKind: 'steps',
        steps: [
            { text: say('7 jauzi eta azken motiboa.', '7 saltos y el último motivo.', '7 قفزات والنقش الأخير.', '7 jumps and the last motif.'), math: same('$7\\cdot 5+3=38$') }
        ],
        takeaway: say('Frisoa = MOTIBOA + LEKUALDAKETA.', 'Friso = MOTIVO + TRASLACIÓN.', 'الإفريز = نقش + انسحاب.', 'Frieze = MOTIF + TRANSLATION.'),
        figure: (language) => <MotionFigure language={language} kind="frieze" />
    },
    {
        id: 'tessellations',
        stage: 'patterns',
        title: say('Mosaikoak', 'Mosaicos', 'التبليطات', 'Tilings'),
        goal: say('Zein poligono erregularrek estaltzen duten planoa hutsunerik gabe jakitea.', 'Saber qué polígonos regulares cubren el plano sin huecos.', 'معرفة أي المضلعات المنتظمة تغطي المستوى دون فراغات.', 'Know which regular polygons cover the plane with no gaps.'),
        needs: [{ unit: 'dbh3/geometria-plana', topic: 'regular-polygons', title: { eu: 'Poligono erregularren angeluak', es: 'Ángulos de los polígonos regulares', en: 'Angles of regular polygons', ar: 'زوايا المضلعات المنتظمة' } }],
        problem: say('Pentagono erregularrek planoa estaltzen al dute?', '¿Los pentágonos regulares cubren el plano?', 'هل تغطي الخماسيات المنتظمة المستوى؟', 'Do regular pentagons tile the plane?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Barne-angelua.', 'Ángulo interior.', 'الزاوية الداخلية.', 'Interior angle.'), math: same('$180°-72°=108°$') },
            { text: say('360 ez da 108 zenbakiaren multiploa: hutsune bat geratzen da.', '360 no es múltiplo de 108: queda un hueco.', '360 ليس مضاعفًا لـ108: يبقى فراغ.', '360 is not a multiple of 108: a gap is left.'), math: same('$360°-3\\cdot 108°=36°$') }
        ],
        takeaway: say('Erpin batean: angeluen batura = $360°$.', 'En un vértice: suma de ángulos = $360°$.', 'عند رأس: مجموع الزوايا = $360°$.', 'At a vertex: sum of the angles = $360°$.'),
        figure: (language) => <MotionFigure language={language} kind="tessellation" />
    },
    {
        id: 'homothety',
        stage: 'patterns',
        title: say('Homoteziak', 'Homotecias', 'التحاكي', 'Enlargements'),
        goal: say('Irudi bat zentro batetik arrazoi batekin handitu edo txikitzea.', 'Ampliar o reducir una figura desde un centro con una razón.', 'تكبير شكل أو تصغيره من مركز بنسبة.', 'Enlarge or reduce a shape from a centre with a factor.'),
        needs: [{ unit: 'dbh3/geometria-plana', topic: 'similar-triangles', title: { eu: 'Triangelu antzekoak', es: 'Triángulos semejantes', en: 'Similar triangles', ar: 'المثلثات المتشابهة' } }],
        problem: say('$P=(2,-3)$ eta homotezia jatorrian, $k=3$. Non dago $P^{\\prime}$?', '$P=(2,-3)$ y la homotecia de centro el origen y $k=3$. ¿Dónde queda $P^{\\prime}$?', '$P=(2,-3)$ والتحاكي مركزه الأصل و$k=3$. أين تقع $P^{\\prime}$؟', '$P=(2,-3)$ and the enlargement from the origin with $k=3$. Where is $P^{\\prime}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu koordenatuak.', 'Multiplica las coordenadas.', 'اضرب الإحداثيين.', 'Multiply the coordinates.'), math: same('$(3\\cdot 2,\\ 3\\cdot(-3))=(6,-9)$') }
        ],
        takeaway: same("$\\vec{OP^{\\prime}}=k\\cdot\\vec{OP}$"),
        figure: (language) => <HomothetyFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const motions3Topics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...motions3LessonTexts[topic.id as Motions3TopicId], ...motions3LessonChecks[topic.id as Motions3TopicId] }))
