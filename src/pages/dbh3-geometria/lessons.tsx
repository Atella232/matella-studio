import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { AngleSumFigure, CentersFigure, CircleAnglesFigure, RegularAnglesFigure, SectorRingFigure } from '../dbh1-figurak-v2/figures'
import { ApothemFigure, HypotenuseFigure, IsoscelesHeightFigure, LadderFigure } from '../dbh2-pitagoras-v2/figures'
import { CriteriaFigure, RatiosFigure, ThalesFigure } from '../dbh4-aplikatuak-antzekotasuna/figures'
import { PolygonAreasFigure } from '../dbh4-aplikatuak-areak/figures'
import { AngleBisectorFigure, PerpendicularBisectorFigure } from './figures'
import { geometry3LessonChecks, type Geometry3TopicId } from './lessonChecks'
import { geometry3LessonTexts } from './lessonTexts'
import { say, same } from './text'

/* ==========================================================================
   Planoko geometria · 3. DBH — stages and lessons, following Santillana
   3.º ESO unit 8 «Geometría plana» (loci, angles in polygons and in the
   circle, notable lines of a triangle, Pythagoras, areas, circular
   figures) and Anaya 3.º ESO unit 10 «Problemas métricos en el plano»
   (Pythagoras, similarity and Thales, areas). Every number and context is
   original: the books only fix the scope and the order. Each lesson names
   its typical mistake.
   ========================================================================== */

export type Geometry3StageId = 'angles' | 'loci' | 'pythagoras' | 'areas' | 'similarity'

export const geometry3Stages: UnitStage[] = [
    { id: 'angles', tone: 'blue', title: { eu: 'Angeluak', es: 'Ángulos', en: 'Angles', ar: 'الزوايا' } },
    { id: 'loci', tone: 'violet', title: { eu: 'Leku geometrikoak', es: 'Lugares geométricos', en: 'Loci', ar: 'المحلات الهندسية' } },
    { id: 'pythagoras', tone: 'mustard', title: { eu: 'Pitagoras', es: 'Pitágoras', en: 'Pythagoras', ar: 'فيثاغورس' } },
    { id: 'areas', tone: 'coral', title: { eu: 'Azalerak', es: 'Áreas', en: 'Areas', ar: 'المساحات' } },
    { id: 'similarity', tone: 'green', title: { eu: 'Antzekotasuna', es: 'Semejanza', en: 'Similarity', ar: 'التشابه' } }
]

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Angles ---------- */
    {
        id: 'polygon-angles',
        stage: 'angles',
        title: say('Poligonoen angeluak', 'Ángulos de los polígonos', 'زوايا المضلعات', 'Angles of polygons'),
        goal: say('Poligono baten barne-angeluen batura kalkulatzea.', 'Calcular la suma de los ángulos interiores de un polígono.', 'حساب مجموع الزوايا الداخلية لمضلع.', 'Work out the sum of the interior angles of a polygon.'),
        problem: say('Pentagono baten lau angeluk 100°, 110°, 95° eta 120° neurtzen dute. Zenbat da bosgarrena?', 'Cuatro ángulos de un pentágono miden 100°, 110°, 95° y 120°. ¿Cuánto mide el quinto?', 'أربع زوايا لخماسي قياساتها 100° و110° و95° و120°. كم قياس الخامسة؟', 'Four angles of a pentagon measure 100°, 110°, 95° and 120°. How big is the fifth?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Angeluen batura.', 'Suma de los ángulos.', 'مجموع الزوايا.', 'Sum of the angles.'), math: same('$(5-2)\\cdot 180°=540°$') },
            { text: say('Kendu ezagunak.', 'Resta los conocidos.', 'اطرح المعلومة.', 'Subtract the known ones.'), math: same('$540°-425°=115°$') }
        ],
        takeaway: say('Barnekoak: $(n-2)\\cdot 180°$. Kanpokoak: $360°$.', 'Interiores: $(n-2)\\cdot 180°$. Exteriores: $360°$.', 'الداخلية: $(n-2)\\cdot 180°$. الخارجية: $360°$.', 'Interior: $(n-2)\\cdot 180°$. Exterior: $360°$.'),
        figure: (language) => <AngleSumFigure language={language} />
    },
    {
        id: 'regular-polygons',
        stage: 'angles',
        title: say('Poligono erregularren angeluak', 'Ángulos de los polígonos regulares', 'زوايا المضلعات المنتظمة', 'Angles of regular polygons'),
        goal: say('Poligono erregular baten barne-angelua, kanpo-angelua eta angelu zentrala kalkulatzea.', 'Calcular el ángulo interior, el exterior y el central de un polígono regular.', 'حساب الزاوية الداخلية والخارجية والمركزية لمضلع منتظم.', 'Work out the interior, exterior and central angle of a regular polygon.'),
        problem: say('Zenbat neurtzen du oktogono erregular baten barne-angeluak?', '¿Cuánto mide el ángulo interior de un octógono regular?', 'كم قياس الزاوية الداخلية لمثمن منتظم؟', 'How big is the interior angle of a regular octagon?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kanpo-angelua.', 'Ángulo exterior.', 'الزاوية الخارجية.', 'Exterior angle.'), math: same('$360°\\div 8=45°$') },
            { text: say('Barnekoa, osagarria.', 'El interior, su suplementario.', 'الداخلية مكمّلتها.', 'The interior one, its supplement.'), math: same('$180°-45°=135°$') }
        ],
        takeaway: say('Zentrala = kanpokoa = $\\frac{360°}{n}$; barnekoa = $180°-\\frac{360°}{n}$.', 'Central = exterior = $\\frac{360°}{n}$; interior = $180°-\\frac{360°}{n}$.', 'المركزية = الخارجية = $\\frac{360°}{n}$؛ الداخلية = $180°-\\frac{360°}{n}$.', 'Central = exterior = $\\frac{360°}{n}$; interior = $180°-\\frac{360°}{n}$.'),
        figure: (language) => <RegularAnglesFigure language={language} />
    },
    {
        id: 'circle-angles',
        stage: 'angles',
        title: say('Angeluak zirkunferentzian', 'Ángulos en la circunferencia', 'الزوايا في الدائرة', 'Angles in a circle'),
        goal: say('Angelu inskribatua angelu zentralaren erdia dela erabiltzea.', 'Usar que el ángulo inscrito es la mitad del central.', 'استعمال أن الزاوية المحيطية نصف المركزية.', 'Use the fact that an inscribed angle is half the central angle.'),
        problem: say('Angelu zentral batek 130° neurtzen du. Zenbat arku bera hartzen duen inskribatuak?', 'Un ángulo central mide 130°. ¿Cuánto mide el inscrito que abarca el mismo arco?', 'زاوية مركزية قياسها 130°. كم قياس المحيطية التي تحصر القوس نفسه؟', 'A central angle measures 130°. How big is the inscribed angle on the same arc?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erdia.', 'La mitad.', 'النصف.', 'Half.'), math: same('$130°\\div 2=65°$') }
        ],
        takeaway: say('Inskribatua: $\\beta=\\frac{\\alpha}{2}$, $\\alpha$ zentrala izanik.', 'Inscrito: $\\beta=\\frac{\\alpha}{2}$, con $\\alpha$ el central.', 'المحيطية: $\\beta=\\frac{\\alpha}{2}$، حيث $\\alpha$ المركزية.', 'Inscribed: $\\beta=\\frac{\\alpha}{2}$, where $\\alpha$ is the central angle.'),
        figure: (language) => <CircleAnglesFigure language={language} />
    },
    /* ---------- 2. Loci ---------- */
    {
        id: 'perpendicular-bisector',
        stage: 'loci',
        title: say('Segmentu baten erdibitzailea', 'La mediatriz de un segmento', 'المنصّف العمودي لقطعة', 'The perpendicular bisector'),
        goal: say('Bi puntutatik distantzia berera dauden puntuak ezagutzea.', 'Reconocer los puntos que están a la misma distancia de dos puntos.', 'التعرّف على النقاط المتساوية البعد عن نقطتين.', 'Recognise the points that are the same distance from two points.'),
        problem: say('$A=(1,2)$ eta $B=(7,2)$. Zein zuzen da haien erdibitzailea?', '$A=(1,2)$ y $B=(7,2)$. ¿Qué recta es su mediatriz?', '$A=(1,2)$ و$B=(7,2)$. ما المنصّف العمودي؟', '$A=(1,2)$ and $B=(7,2)$. Which line is their perpendicular bisector?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erdiko puntua.', 'El punto medio.', 'المنتصف.', 'The midpoint.'), math: same('$\\left(\\frac{1+7}{2},2\\right)=(4,2)$') },
            { text: say('Segmentua horizontala da: erdibitzailea bertikala.', 'El segmento es horizontal: la mediatriz es vertical.', 'القطعة أفقية: المنصّف عمودي.', 'The segment is horizontal: the bisector is vertical.'), math: same('$x=4$') }
        ],
        takeaway: say('Erdibitzailea: $PA=PB$ betetzen duten puntuak.', 'Mediatriz: los puntos con $PA=PB$.', 'المنصّف العمودي: النقاط التي فيها $PA=PB$.', 'Perpendicular bisector: the points with $PA=PB$.'),
        figure: (language) => <PerpendicularBisectorFigure language={language} />
    },
    {
        id: 'angle-bisector',
        stage: 'loci',
        title: say('Angelu baten erdikaria', 'La bisectriz de un ángulo', 'منصّف الزاوية', 'The angle bisector'),
        goal: say('Angelu baten bi aldeetatik distantzia berera dauden puntuak ezagutzea.', 'Reconocer los puntos que están a la misma distancia de los dos lados de un ángulo.', 'التعرّف على النقاط المتساوية البعد عن ضلعي زاوية.', 'Recognise the points that are the same distance from the two sides of an angle.'),
        problem: say('Angelu batek 76° neurtzen du. Zenbat neurtzen du erdikariak sortzen dituen angelu bakoitzak?', 'Un ángulo mide 76°. ¿Cuánto mide cada ángulo que forma su bisectriz?', 'زاوية قياسها 76°. كم قياس كل زاوية يكوّنها منصّفها؟', 'An angle measures 76°. How big is each angle its bisector makes?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erdibitu.', 'Divide entre dos.', 'اقسم على اثنين.', 'Halve it.'), math: same('$76°\\div 2=38°$') }
        ],
        takeaway: say('Erdikaria: bi ALDEETATIK distantzia berera.', 'Bisectriz: a la misma distancia de los dos LADOS.', 'المنصّف: على البعد نفسه من الضلعين.', 'Bisector: the same distance from both SIDES.'),
        figure: (language) => <AngleBisectorFigure language={language} />
    },
    {
        id: 'notable-points',
        stage: 'loci',
        title: say('Triangeluaren puntu nabarmenak', 'Puntos notables del triángulo', 'النقاط الشهيرة في المثلث', 'Notable points of a triangle'),
        goal: say('Zirkunzentroa, inzentroa, barizentroa eta ortozentroa bereiztea.', 'Distinguir circuncentro, incentro, baricentro y ortocentro.', 'التمييز بين مركز الدائرة المحيطة والمحاطة ومركز الثقل وملتقى الارتفاعات.', 'Tell the circumcentre, incentre, centroid and orthocentre apart.'),
        problem: say('Mediana batek 12 cm neurtzen du. Zein distantziatara dago barizentroa erpinetik?', 'Una mediana mide 12 cm. ¿A qué distancia del vértice está el baricentro?', 'متوسط طوله 12 سم. على أي بعد من الرأس يقع مركز الثقل؟', 'A median is 12 cm long. How far from the vertex is the centroid?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Medianaren bi heren.', 'Dos tercios de la mediana.', 'ثلثا المتوسط.', 'Two thirds of the median.'), math: same('$\\frac{2}{3}\\cdot 12=8$') }
        ],
        takeaway: say('Erdibitzaileak, erdikariak, medianak, altuerak: lau PUNTU.', 'Mediatrices, bisectrices, medianas, alturas: cuatro PUNTOS.', 'منصّفات عمودية، منصّفات زوايا، متوسطات، ارتفاعات: أربع نقاط.', 'Bisectors, angle bisectors, medians, altitudes: four POINTS.'),
        figure: (language) => <CentersFigure language={language} />
    },
    /* ---------- 3. Pythagoras ---------- */
    {
        id: 'pythagoras',
        stage: 'pythagoras',
        title: say('Pitagorasen teorema', 'El teorema de Pitágoras', 'مبرهنة فيثاغورس', 'Pythagoras\' theorem'),
        goal: say('Triangelu zuzen baten alde ezezaguna kalkulatzea.', 'Calcular el lado desconocido de un triángulo rectángulo.', 'حساب الضلع المجهول في مثلث قائم.', 'Work out the unknown side of a right triangle.'),
        needs: [{ unit: 'dbh2/teorema-pitagoras', topic: 'formula', title: { eu: 'Teoremaren formula', es: 'La fórmula del teorema', en: 'The theorem\'s formula', ar: 'صيغة النظرية' } }],
        problem: say('Triangelu zuzen baten hipotenusak 13 cm eta kateto batek 5 cm neurtzen dute. Zenbat bestea?', 'En un triángulo rectángulo la hipotenusa mide 13 cm y un cateto 5 cm. ¿Cuánto mide el otro?', 'في مثلث قائم الوتر 13 سم وضلع قائم 5 سم. كم الآخر؟', 'In a right triangle the hypotenuse is 13 cm and one leg is 5 cm. How long is the other?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Katetoa: kendu.', 'Cateto: resta.', 'الضلع القائم: اطرح.', 'A leg: subtract.'), math: same('$b^{2}=13^{2}-5^{2}=169-25=144$') },
            { text: say('Atera erroa.', 'Saca la raíz.', 'خذ الجذر.', 'Take the root.'), math: same('$b=\\sqrt{144}=12$') }
        ],
        takeaway: same('$a^{2}=b^{2}+c^{2}$'),
        figure: (language) => <HypotenuseFigure language={language} />
    },
    {
        id: 'pythagoras-figures',
        stage: 'pythagoras',
        title: say('Pitagoras irudietan', 'Pitágoras en las figuras', 'فيثاغورس في الأشكال', 'Pythagoras in shapes'),
        goal: say('Triangelu zuzenak aurkitzea irudi lauetan: altuerak, diagonalak eta apotemak.', 'Encontrar triángulos rectángulos en figuras planas: alturas, diagonales y apotemas.', 'إيجاد مثلثات قائمة في الأشكال المستوية: الارتفاعات والأقطار والعوامد.', 'Find right triangles inside plane shapes: heights, diagonals and apothems.'),
        needs: [{ unit: 'dbh2/teorema-pitagoras', topic: 'triangle-height', title: { eu: 'Triangelu isoszele eta aldeberdinen altuera', es: 'La altura de triángulos isósceles y equiláteros', en: 'The height of isosceles and equilateral triangles', ar: 'ارتفاع المثلث المتساوي الساقين والمتساوي الأضلاع' } }],
        problem: say('Triangelu isoszele baten alde berdinek 10 cm eta oinarriak 12 cm neurtzen dute. Zenbat da altuera?', 'Un triángulo isósceles tiene los lados iguales de 10 cm y la base de 12 cm. ¿Cuánto mide la altura?', 'مثلث متساوي الساقين ساقاه 10 سم وقاعدته 12 سم. كم ارتفاعه؟', 'An isosceles triangle has equal sides of 10 cm and a base of 12 cm. How tall is it?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Oinarriaren erdia: 6 cm.', 'Media base: 6 cm.', 'نصف القاعدة: 6 سم.', 'Half the base: 6 cm.') },
            { text: say('Altuera, kateto bat.', 'La altura, un cateto.', 'الارتفاع ضلع قائم.', 'The height, a leg.'), math: same('$h=\\sqrt{10^{2}-6^{2}}=\\sqrt{64}=8$') }
        ],
        takeaway: say('Bilatu triangelu ZUZENA: $h=\\sqrt{l^{2}-(b\\div 2)^{2}}$.', 'Busca el triángulo RECTÁNGULO: $h=\\sqrt{l^{2}-(b\\div 2)^{2}}$.', 'ابحث عن المثلث القائم: $h=\\sqrt{l^{2}-(b\\div 2)^{2}}$.', 'Look for the RIGHT triangle: $h=\\sqrt{l^{2}-(b\\div 2)^{2}}$.'),
        figure: (language) => <IsoscelesHeightFigure language={language} />
    },
    {
        id: 'pythagoras-problems',
        stage: 'pythagoras',
        title: say('Problemak Pitagorasekin', 'Problemas con Pitágoras', 'مسائل بفيثاغورس', 'Problems with Pythagoras'),
        goal: say('Eguneroko egoeretan eta planoan distantziak kalkulatzea.', 'Calcular distancias en situaciones cotidianas y en el plano.', 'حساب المسافات في مواقف يومية وفي المستوى.', 'Work out distances in everyday situations and on the plane.'),
        needs: [{ unit: 'dbh2/funciones', topic: 'coordinates', title: { eu: 'Koordenatuak eta koadranteak', es: 'Coordenadas y cuadrantes', en: 'Coordinates and quadrants', ar: 'الإحداثيات والأرباع' } }],
        problem: say('10 m-ko eskailera bat horman jarri da, oina hormatik 6 m-ra. Zein altueratara iristen da?', 'Una escalera de 10 m se apoya en la pared con el pie a 6 m de ella. ¿A qué altura llega?', 'سلّم طوله 10 م مستند إلى جدار وقدمه على بعد 6 م منه. إلى أي ارتفاع يصل؟', 'A 10 m ladder leans on a wall with its foot 6 m from it. How high does it reach?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Eskailera: hipotenusa.', 'La escalera: hipotenusa.', 'السلّم: الوتر.', 'The ladder: hypotenuse.'), math: same('$h=\\sqrt{10^{2}-6^{2}}=\\sqrt{64}=8$') }
        ],
        takeaway: same('$d=\\sqrt{(x_{2}-x_{1})^{2}+(y_{2}-y_{1})^{2}}$'),
        figure: (language) => <LadderFigure language={language} />
    },
    /* ---------- 4. Areas ---------- */
    {
        id: 'polygon-areas',
        stage: 'areas',
        title: say('Poligonoen azalerak', 'Áreas de polígonos', 'مساحات المضلعات', 'Areas of polygons'),
        goal: say('Triangelu, paralelogramo, trapezio eta erronboaren azalerak kalkulatzea.', 'Calcular el área de triángulos, paralelogramos, trapecios y rombos.', 'حساب مساحات المثلث ومتوازي الأضلاع وشبه المنحرف والمعيّن.', 'Work out the areas of triangles, parallelograms, trapeziums and rhombuses.'),
        problem: say('Trapezio baten oinarriak 10 cm eta 6 cm dira, eta altuera 5 cm. Zein da azalera?', 'Un trapecio tiene bases de 10 cm y 6 cm y altura de 5 cm. ¿Cuál es su área?', 'شبه منحرف قاعدتاه 10 سم و6 سم وارتفاعه 5 سم. ما مساحته؟', 'A trapezium has bases of 10 cm and 6 cm and a height of 5 cm. What is its area?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Formula.', 'Fórmula.', 'الصيغة.', 'Formula.'), math: same('$\\frac{(10+6)\\cdot 5}{2}=40$') }
        ],
        takeaway: say('Triangelua: $\\frac{b\\cdot h}{2}$. Trapezioa: $\\frac{(B+b)\\cdot h}{2}$.', 'Triángulo: $\\frac{b\\cdot h}{2}$. Trapecio: $\\frac{(B+b)\\cdot h}{2}$.', 'المثلث: $\\frac{b\\cdot h}{2}$. شبه المنحرف: $\\frac{(B+b)\\cdot h}{2}$.', 'Triangle: $\\frac{b\\cdot h}{2}$. Trapezium: $\\frac{(B+b)\\cdot h}{2}$.'),
        figure: (language) => <PolygonAreasFigure language={language} />
    },
    {
        id: 'regular-area',
        stage: 'areas',
        title: say('Poligono erregularren azalera', 'Área de los polígonos regulares', 'مساحة المضلعات المنتظمة', 'Area of regular polygons'),
        goal: say('Perimetroa eta apotema erabiliz azalera kalkulatzea.', 'Calcular el área con el perímetro y la apotema.', 'حساب المساحة بالمحيط والعامد.', 'Work out the area with the perimeter and the apothem.'),
        needs: [{ unit: 'dbh2/teorema-pitagoras', topic: 'apothem', title: { eu: 'Poligono erregularren apotema', es: 'La apotema de los polígonos regulares', en: 'The apothem of regular polygons', ar: 'عامد المضلعات المنتظمة' } }],
        problem: say('Pentagono erregular baten aldeak 8 cm eta apotemak 5,5 cm neurtzen dute. Zein da azalera?', 'Un pentágono regular tiene lado 8 cm y apotema 5,5 cm. ¿Cuál es su área?', 'خماسي منتظم ضلعه 8 سم وعامده 5.5 سم. ما مساحته؟', 'A regular pentagon has side 8 cm and apothem 5.5 cm. What is its area?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Perimetroa.', 'Perímetro.', 'المحيط.', 'Perimeter.'), math: same('$P=5\\cdot 8=40$') },
            { text: say('Azalera.', 'Área.', 'المساحة.', 'Area.'), math: same('$\\frac{40\\cdot 5{,}5}{2}=110$') }
        ],
        takeaway: same('$A=\\frac{P\\cdot a}{2}$'),
        figure: (language) => <ApothemFigure language={language} />
    },
    {
        id: 'circle-areas',
        stage: 'areas',
        title: say('Zirkulua eta haren zatiak', 'El círculo y sus partes', 'الدائرة وأجزاؤها', 'The circle and its parts'),
        goal: say('Zirkunferentziaren luzera, arkua, zirkuluaren azalera, sektorea eta koroa kalkulatzea.', 'Calcular la longitud de la circunferencia, el arco, el área del círculo, el sector y la corona.', 'حساب محيط الدائرة والقوس ومساحة الدائرة والقطاع والحلقة.', 'Work out the circumference, an arc, the area of a circle, a sector and an annulus.'),
        problem: say('Zein da 6 cm-ko erradioa eta 60°-ko angelua dituen sektorearen azalera?', '¿Cuál es el área de un sector de radio 6 cm y 60°?', 'ما مساحة قطاع نصف قطره 6 سم وزاويته 60°؟', 'What is the area of a sector of radius 6 cm and 60°?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zirkulu osoa.', 'El círculo entero.', 'الدائرة كاملة.', 'The whole circle.'), math: same('$\\pi\\cdot 6^{2}=36\\pi$') },
            { text: say('Seiren bat: $60°$ zati $360°$.', 'Un sexto: $60°$ entre $360°$.', 'السدس: $60°$ على $360°$.', 'A sixth: $60°$ out of $360°$.'), math: same('$\\frac{36\\pi}{6}=6\\pi\\approx 18{,}84$') }
        ],
        takeaway: say('Sektorea = $\\pi r^{2}\\cdot\\frac{\\alpha}{360°}$', 'Sector = $\\pi r^{2}\\cdot\\frac{\\alpha}{360°}$', 'القطاع = $\\pi r^{2}\\cdot\\frac{\\alpha}{360°}$', 'Sector = $\\pi r^{2}\\cdot\\frac{\\alpha}{360°}$'),
        figure: (language) => <SectorRingFigure language={language} />
    },
    /* ---------- 5. Similarity ---------- */
    {
        id: 'thales',
        stage: 'similarity',
        title: say('Talesen teorema', 'El teorema de Tales', 'مبرهنة طاليس', 'Thales\' theorem'),
        goal: say('Paralelo batzuek ebakitako segmentu proportzionalak kalkulatzea.', 'Calcular segmentos proporcionales cortados por rectas paralelas.', 'حساب القطع المتناسبة التي تقطعها مستقيمات متوازية.', 'Work out proportional segments cut off by parallel lines.'),
        needs: [{ unit: 'dbh3/proporcionalidad', topic: 'proportion', title: { eu: 'Laugarren proportzionala', es: 'Cuarta proporcional', en: 'The fourth proportional', ar: 'الرابع المتناسب' } }],
        problem: say('$AB=4$, $BC=6$ eta $A^{\\prime}B^{\\prime}=6$. Zenbat da $B^{\\prime}C^{\\prime}$?', '$AB=4$, $BC=6$ y $A^{\\prime}B^{\\prime}=6$. ¿Cuánto mide $B^{\\prime}C^{\\prime}$?', '$AB=4$ و$BC=6$ و$A^{\\prime}B^{\\prime}=6$. كم $B^{\\prime}C^{\\prime}$؟', '$AB=4$, $BC=6$ and $A^{\\prime}B^{\\prime}=6$. How long is $B^{\\prime}C^{\\prime}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Proportzioa.', 'La proporción.', 'التناسب.', 'The proportion.'), math: same('$\\frac{4}{6}=\\frac{6}{x}$') },
            { text: say('Biderketa gurutzatua.', 'Producto cruzado.', 'الضرب التبادلي.', 'Cross-multiply.'), math: same('$x=\\frac{6\\cdot 6}{4}=9$') }
        ],
        takeaway: same("$\\frac{AB}{A^{\\prime}B^{\\prime}}=\\frac{BC}{B^{\\prime}C^{\\prime}}$"),
        figure: (language) => <ThalesFigure language={language} />
    },
    {
        id: 'similar-triangles',
        stage: 'similarity',
        title: say('Triangelu antzekoak', 'Triángulos semejantes', 'المثلثات المتشابهة', 'Similar triangles'),
        goal: say('Bi triangelu antzekoak diren jakitea eta antzekotasun-arrazoia erabiltzea.', 'Saber si dos triángulos son semejantes y usar la razón de semejanza.', 'معرفة ما إذا كان مثلثان متشابهين واستعمال نسبة التشابه.', 'Tell whether two triangles are similar and use the scale factor.'),
        needs: [{ unit: 'dbh3/proporcionalidad', topic: 'ratio', title: { eu: 'Arrazoia eta proportzioa', es: 'Razón y proporción', en: 'Ratio and proportion', ar: 'النسبة والتناسب' } }],
        problem: say('Triangelu batek 3, 4 eta 5 cm-ko aldeak ditu. Antzeko batek 12 cm-ko alde handiena du. Zenbat da alde txikiena?', 'Un triángulo tiene lados de 3, 4 y 5 cm. Uno semejante tiene el lado mayor de 12 cm. ¿Cuánto mide su lado menor?', 'مثلث أضلاعه 3 و4 و5 سم. ومثلث مشابه أطول أضلاعه 12 سم. كم أصغر أضلاعه؟', 'A triangle has sides of 3, 4 and 5 cm. A similar one has a longest side of 12 cm. How long is its shortest side?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Arrazoia: alde handienak.', 'La razón: los lados mayores.', 'النسبة: الضلعان الأكبران.', 'The factor: the longest sides.'), math: same('$k=\\frac{12}{5}=2{,}4$') },
            { text: say('Alde txikiena.', 'El lado menor.', 'الضلع الأصغر.', 'The shortest side.'), math: same('$3\\cdot 2{,}4=7{,}2$') }
        ],
        takeaway: same("$k=\\frac{a^{\\prime}}{a}=\\frac{b^{\\prime}}{b}=\\frac{c^{\\prime}}{c}$"),
        figure: (language) => <CriteriaFigure language={language} />
    },
    {
        id: 'scale-areas',
        stage: 'similarity',
        title: say('Perimetroak, azalerak eta eskalak', 'Perímetros, áreas y escalas', 'المحيطات والمساحات والمقاييس', 'Perimeters, areas and scales'),
        goal: say('Irudi antzekoen perimetroen eta azaleren arrazoia jakitea.', 'Conocer la razón de los perímetros y de las áreas de figuras semejantes.', 'معرفة نسبة المحيطات والمساحات في الأشكال المتشابهة.', 'Know the ratio of the perimeters and the areas of similar shapes.'),
        needs: [{ unit: 'dbh3/proporcionalidad', topic: 'scale', title: { eu: 'Eskalak: planoak eta mapak', es: 'Escalas: planos y mapas', en: 'Scales: plans and maps', ar: 'المقاييس: المخططات والخرائط' } }],
        problem: say('Lauki batek 20 cm² ditu. Antzeko batek aldeak hiru aldiz handiagoak ditu. Zenbat da haren azalera?', 'Un cuadrilátero mide 20 cm². Otro semejante tiene los lados tres veces mayores. ¿Cuál es su área?', 'رباعي مساحته 20 سم². ورباعي مشابه أضلاعه أكبر ثلاث مرات. ما مساحته؟', 'A quadrilateral has an area of 20 cm². A similar one has sides three times as long. What is its area?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Azaleren arrazoia.', 'Razón de las áreas.', 'نسبة المساحتين.', 'Ratio of the areas.'), math: same('$k^{2}=3^{2}=9$') },
            { text: say('Azalera.', 'Área.', 'المساحة.', 'Area.'), math: same('$20\\cdot 9=180$') }
        ],
        takeaway: say('Perimetroak: $k$. Azalerak: $k^{2}$.', 'Perímetros: $k$. Áreas: $k^{2}$.', 'المحيطات: $k$. المساحات: $k^{2}$.', 'Perimeters: $k$. Areas: $k^{2}$.'),
        figure: (language) => <RatiosFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const geometry3Topics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...geometry3LessonTexts[topic.id as Geometry3TopicId], ...geometry3LessonChecks[topic.id as Geometry3TopicId] }))
