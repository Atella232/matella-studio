import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { GeometryIntroTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Planoko geometria · 1. DBH — what each lesson tells: the new words
   (definitions), the key words in four languages (vocabulary), a short
   explanation, the example as an exercise («Another example», or «Example»
   in the lessons of facts) and, in three lessons, «Why does it work?».
   Plain data so the tests can import it; lessons.tsx merges it into the
   topics. The explanation keeps the numbers that its drawing shows (the
   pentagon, the 3-4-5 squares, the 9 cm by 5 cm rectangle, A = 6 · 3).
   Unit changes are worked as products (3,4 · 1000 = 3400 m): the test
   reads 1 km = 1000 m as 1 = 1000. Lessons about names give their example
   in words only. The example uses numbers of its own, never those of «Let's
   solve», of «Check it» or of the typical mistake.
   Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const geometryIntroLessonTexts: Record<GeometryIntroTopicId, LessonTexts> = {
    /* ---------- 1. Lines and angles ---------- */
    lines: {
        vocabulary: [
            say('paraleloak', 'paralelas', 'متوازيان', 'parallel'),
            say('ebakitzaileak', 'secantes', 'متقاطعان', 'intersecting'),
            say('perpendikularrak', 'perpendiculares', 'متعامدان', 'perpendicular')
        ],
        definitions: [
            {
                term: say('Zuzena, zuzerdia eta zuzenkia', 'Recta, semirrecta y segmento', 'المستقيم ونصف المستقيم والقطعة', 'Line, ray and segment'),
                meaning: say('Zuzenak ez du hasierarik ez amaierarik; zuzerdiak hasiera du, baina ez amaiera; zuzenkiak bi mutur ditu.', 'La recta no tiene principio ni fin; la semirrecta tiene principio, pero no fin; el segmento tiene dos extremos.', 'المستقيم لا بداية له ولا نهاية؛ ولنصف المستقيم بداية بلا نهاية؛ وللقطعة طرفان.', 'A line has no beginning and no end; a ray has a beginning but no end; a segment has two ends.')
            }
        ],
        explanation: say(
            'Puntu batek zuzena bi zuzerditan banatzen du, eta bi puntuk zuzenki bat mugatzen dute. Plano batean, bi zuzen paraleloak dira inoiz ebakitzen ez badira, eta ebakitzaileak ebakitzen badira; lau angelu zuzen osatzen badituzte, perpendikularrak dira.',
            'Un punto divide una recta en dos semirrectas, y dos puntos limitan un segmento. En un plano, dos rectas son paralelas si no se cortan nunca, y secantes si se cortan; si forman cuatro ángulos rectos, son perpendiculares.',
            'النقطة تقسم المستقيم إلى نصفي مستقيم، ونقطتان تحدّان قطعة. وفي المستوى يكون المستقيمان متوازيين إذا لم يتقاطعا أبدًا، ومتقاطعين إذا تقاطعا؛ وإذا كوّنا أربع زوايا قائمة فهما متعامدان.',
            'A point splits a line into two rays, and two points mark off a segment. In a plane, two lines are parallel if they never cross, and intersecting if they cross; if they make four right angles, they are perpendicular.'
        ),
        examplePrompt: say('Mapa batean, A eta B kaleak ez dira inoiz gurutzatzen, eta C kaleak A ebakitzen du angelu zuzenean. Nolakoak dira?', 'En un plano, las calles A y B no se cruzan nunca, y la calle C corta a la A en ángulo recto. ¿Cómo son?', 'في خريطة لا يتقاطع الشارعان A وB أبدًا، ويقطع الشارع C الشارع A بزاوية قائمة. كيف هي؟', 'On a map, streets A and B never cross, and street C cuts A at a right angle. What are they like?'),
        example: same('$A\\parallel B\\qquad A\\perp C$'),
        exampleAnswer: say('A eta B paraleloak dira; A eta C, perpendikularrak (angelu zuzenak dituzten ebakitzaileak).', 'A y B son paralelas; A y C, perpendiculares (secantes con ángulos rectos).', 'A وB متوازيان؛ وA وC متعامدان (متقاطعان بزوايا قائمة).', 'A and B are parallel; A and C are perpendicular (intersecting at right angles).')
    },
    angles: {
        vocabulary: [
            say('garraiagailua', 'transportador', 'المنقلة', 'protractor'),
            say('graduak', 'grados', 'الدرجات', 'degrees'),
            say('erpina', 'vértice', 'الرأس', 'vertex')
        ],
        definitions: [
            {
                term: say('Angelua', 'Ángulo', 'الزاوية', 'Angle'),
                meaning: say('Puntu beretik ateratzen diren bi zuzerdiren arteko planoaren zatia; puntua erpina da.', 'La parte del plano entre dos semirrectas que salen del mismo punto, el vértice.', 'جزء المستوى بين نصفي مستقيم يخرجان من النقطة نفسها، وهي الرأس.', 'The part of the plane between two rays that start at the same point, the vertex.')
            }
        ],
        explanation: say(
            'Angeluak graduetan (°) neurtzen dira garraiagailuarekin; angelu osoak 360° neurtzen ditu. Neurriaren arabera, marrazkian bezala: zorrotza (90° baino gutxiago), zuzena (90°), kamutsa (90° eta 180° artean) eta laua (180°).',
            'Los ángulos se miden en grados (°) con el transportador; el ángulo completo mide 360°. Según su medida, como en el dibujo: agudo (menos de 90°), recto (90°), obtuso (entre 90° y 180°) y llano (180°).',
            'تُقاس الزوايا بالدرجات (°) بالمنقلة؛ والزاوية الكاملة 360°. وحسب قياسها، كما في الرسم: حادة (أقل من 90°)، قائمة (90°)، منفرجة (بين 90° و180°)، ومستقيمة (180°).',
            'Angles are measured in degrees (°) with a protractor; a full turn is 360°. By size, as in the drawing: acute (less than 90°), right (90°), obtuse (between 90° and 180°) and straight (180°).'
        ),
        examplePrompt: say('Sailkatu 89°, 91° eta 180°-ko angeluak.', 'Clasifica los ángulos de 89°, 91° y 180°.', 'صنّف الزوايا 89° و91° و180°.', 'Classify the angles of 89°, 91° and 180°.'),
        example: same('$89^{\\circ}\\qquad 91^{\\circ}\\qquad 180^{\\circ}$'),
        exampleAnswer: say('89°: zorrotza. 91°: kamutsa, 90° baino gehiago delako. 180°: laua.', '89°: agudo. 91°: obtuso, porque pasa de 90°. 180°: llano.', '89°: حادة. 91°: منفرجة لأنها تزيد على 90°. 180°: مستقيمة.', '89°: acute. 91°: obtuse, because it is more than 90°. 180°: straight.')
    },
    'angle-pairs': {
        vocabulary: [
            say('erpinez aurkakoak', 'opuestos por el vértice', 'متقابلتان بالرأس', 'vertically opposite'),
            say('ondokoak', 'contiguos', 'متجاورتان', 'adjacent'),
            say('kendu', 'restar', 'اطرح', 'subtract')
        ],
        definitions: [
            {
                term: say('Osagarriak eta betegarriak', 'Complementarios y suplementarios', 'متتامتان ومتكاملتان', 'Complementary and supplementary'),
                meaning: say('Bi angelu osagarriak dira 90° batzen badituzte, eta betegarriak 180° batzen badituzte.', 'Dos ángulos son complementarios si suman 90° y suplementarios si suman 180°.', 'زاويتان متتامتان إذا كان مجموعهما 90°، ومتكاملتان إذا كان 180°.', 'Two angles are complementary if they add up to 90° and supplementary if they add up to 180°.')
            }
        ],
        explanation: say(
            'Angelu baten osagarria aurkitzeko, kendu 90°-tik; betegarria aurkitzeko, kendu 180°-tik. Bi zuzen ebakitzen direnean, erpinez aurkako angeluak berdinak dira, eta ondokoak, betegarriak.',
            'Para hallar el complementario de un ángulo, hay que restarlo de 90°; para el suplementario, de 180°. Cuando dos rectas se cortan, los ángulos opuestos por el vértice son iguales y los contiguos, suplementarios.',
            'لإيجاد متممة زاوية اطرحها من 90°، ولإيجاد مكمّلتها اطرحها من 180°. وعندما يتقاطع مستقيمان تكون الزاويتان المتقابلتان بالرأس متساويتين، والمتجاورتان متكاملتين.',
            'To find the complement of an angle, subtract it from 90°; for the supplement, subtract it from 180°. When two lines cross, vertically opposite angles are equal and adjacent ones are supplementary.'
        ),
        examplePrompt: say('Kalkulatu 72°-ren osagarria eta 96°-ren betegarria.', 'Calcula el complementario de 72° y el suplementario de 96°.', 'احسب متممة 72° ومكمّلة 96°.', 'Work out the complement of 72° and the supplement of 96°.'),
        example: same('$\\begin{gathered}90^{\\circ}-72^{\\circ}=18^{\\circ}\\\\180^{\\circ}-96^{\\circ}=84^{\\circ}\\end{gathered}$'),
        exampleAnswer: say('72°-ren osagarria 18° da; 96°-ren betegarria, 84°.', 'El complementario de 72° es 18°; el suplementario de 96°, 84°.', 'متممة 72° هي 18°؛ ومكمّلة 96° هي 84°.', 'The complement of 72° is 18°; the supplement of 96° is 84°.')
    },

    /* ---------- 2. Polygons, triangles and circles ---------- */
    polygons: {
        vocabulary: [
            say('aldeak', 'lados', 'الأضلاع', 'sides'),
            say('erpinak', 'vértices', 'الرؤوس', 'vertices'),
            say('hexagonoa', 'hexágono', 'المسدس', 'hexagon')
        ],
        definitions: [
            {
                term: say('Poligonoa', 'Polígono', 'المضلع', 'Polygon'),
                meaning: say('Lerro poligonal itxi batek mugatutako planoaren zatia.', 'La parte del plano limitada por una línea poligonal cerrada.', 'جزء المستوى المحدود بخط منكسر مغلق.', 'The part of the plane enclosed by a closed broken line.')
            },
            {
                term: say('Diagonala', 'Diagonal', 'القطر', 'Diagonal'),
                meaning: say('Elkarren ondoan ez dauden bi erpin lotzen dituen zuzenkia.', 'El segmento que une dos vértices no consecutivos.', 'القطعة التي تصل رأسين غير متتاليين.', 'The segment joining two vertices that are not next to each other.')
            },
            {
                term: say('Poligono erregularra', 'Polígono regular', 'المضلع المنتظم', 'Regular polygon'),
                meaning: say('Alde guztiak eta angelu guztiak berdinak dituena.', 'El que tiene todos los lados y todos los ángulos iguales.', 'المضلع الذي كل أضلاعه وكل زواياه متساوية.', 'One with all its sides and all its angles equal.')
            }
        ],
        explanation: say(
            'Poligono baten elementuak aldeak, erpinak, angeluak eta diagonalak dira, marrazkiko pentagonoan bezala. Alde kopuruaren arabera: triangelua (3), laukia (4), pentagonoa (5), hexagonoa (6), heptagonoa (7), oktogonoa (8)…',
            'Los elementos de un polígono son los lados, los vértices, los ángulos y las diagonales, como en el pentágono del dibujo. Según el número de lados: triángulo (3), cuadrilátero (4), pentágono (5), hexágono (6), heptágono (7), octógono (8)…',
            'عناصر المضلع هي الأضلاع والرؤوس والزوايا والأقطار، كما في المخمس المرسوم. وحسب عدد الأضلاع: مثلث (3)، رباعي (4)، مخمس (5)، مسدس (6)، مسبع (7)، مثمن (8)…',
            'The parts of a polygon are its sides, vertices, angles and diagonals, as in the pentagon in the drawing. By the number of sides: triangle (3), quadrilateral (4), pentagon (5), hexagon (6), heptagon (7), octagon (8)…'
        ),
        examplePrompt: say('Zenbat alde, erpin eta angelu ditu oktogono batek? Eta erregularra bada, nolakoak dira?', '¿Cuántos lados, vértices y ángulos tiene un octógono? Y si es regular, ¿cómo son?', 'كم ضلعًا ورأسًا وزاوية للمثمن؟ وإذا كان منتظمًا فكيف تكون؟', 'How many sides, vertices and angles does an octagon have? And if it is regular, what are they like?'),
        example: '',
        exampleAnswer: say('Bakoitzeko zortzi: aldeak, erpinak eta angeluak. Erregularra bada, alde guztiak eta angelu guztiak berdinak dira.', 'Ocho de cada: lados, vértices y ángulos. Si es regular, todos sus lados y todos sus ángulos son iguales.', 'ثمانية من كل منها: أضلاع ورؤوس وزوايا. وإذا كان منتظمًا فكل أضلاعه وكل زواياه متساوية.', 'Eight of each: sides, vertices and angles. If it is regular, all its sides and all its angles are equal.')
    },
    triangles: {
        vocabulary: [
            say('aldeberdina', 'equilátero', 'متساوي الأضلاع', 'equilateral'),
            say('isoszelea', 'isósceles', 'متساوي الساقين', 'isosceles'),
            say('baliokidegabea', 'escaleno', 'مختلف الأضلاع', 'scalene')
        ],
        explanation: say(
            'Triangelu bat bi eratara sailkatzen da. Gainera, haren hiru angeluek beti 180° batzen dituzte, marrazkian bezala: bi ezagututa, hirugarrena kalkulatzen da.',
            'Un triángulo se clasifica de dos formas. Además, sus tres ángulos siempre suman 180°, como en el dibujo: conociendo dos, se calcula el tercero.',
            'يُصنَّف المثلث بطريقتين. ومجموع زواياه الثلاث دائمًا 180°، كما في الرسم: إذا عرفنا اثنتين حسبنا الثالثة.',
            'A triangle is classified in two ways. Also, its three angles always add up to 180°, as in the drawing: knowing two, you can work out the third.'
        ),
        cases: [
            { title: say('Aldeen arabera', 'Según los lados', 'حسب الأضلاع', 'By its sides'), text: say('Aldeberdina: hiru berdin. Isoszelea: bi berdin. Baliokidegabea: bat ere ez.', 'Equilátero: tres iguales. Isósceles: dos. Escaleno: ninguno.', 'متساوي الأضلاع: ثلاثة متساوية. متساوي الساقين: اثنان. مختلف الأضلاع: لا شيء.', 'Equilateral: three equal. Isosceles: two. Scalene: none.') },
            { title: say('Angeluen arabera', 'Según los ángulos', 'حسب الزوايا', 'By its angles'), text: say('Zuzena: angelu zuzen bat. Zorrotza: hiru zorrotz. Kamutsa: kamuts bat.', 'Rectángulo: un ángulo recto. Acutángulo: tres agudos. Obtusángulo: uno obtuso.', 'قائم الزاوية: زاوية قائمة. حاد الزوايا: ثلاث حادة. منفرج الزاوية: زاوية منفرجة.', 'Right-angled: one right angle. Acute-angled: three acute. Obtuse-angled: one obtuse.') }
        ],
        examplePrompt: say('Triangelu isoszele batek 65°-ko bi angelu ditu. Zenbat neurtzen du hirugarrenak?', 'Un triángulo isósceles tiene dos ángulos de 65°. ¿Cuánto mide el tercero?', 'مثلث متساوي الساقين فيه زاويتان قياس كل منهما 65°. كم قياس الثالثة؟', 'An isosceles triangle has two angles of 65°. What is the third?'),
        example: same('$180^{\\circ}-65^{\\circ}-65^{\\circ}=50^{\\circ}$'),
        exampleAnswer: say('Hirugarrenak 50° neurtzen ditu: hiru angeluak zorrotzak dira.', 'El tercero mide 50°: los tres ángulos son agudos.', 'الثالثة 50°: الزوايا الثلاث حادة.', 'The third is 50°: all three angles are acute.'),
        why: {
            text: say(
                'Moztu paperezko triangelu baten hiru izkinak, eta elkartu erpinetatik: lerro zuzen bat osatzen dute, 180°-ko angelu laua. Edozein triangelurekin gertatzen da.',
                'Recorta las tres esquinas de un triángulo de papel y júntalas por los vértices: forman una línea recta, un ángulo llano de 180°. Pasa con cualquier triángulo.',
                'قصّ الزوايا الثلاث لمثلث من الورق واجمعها عند رؤوسها: تكوّن خطًا مستقيمًا، أي زاوية مستقيمة قياسها 180°. ويحدث ذلك مع أي مثلث.',
                'Cut off the three corners of a paper triangle and put them together at their vertices: they make a straight line, a straight angle of 180°. It works with any triangle.'
            )
        }
    },
    'triangle-lines': {
        vocabulary: [
            say('ortozentroa', 'ortocentro', 'ملتقى الارتفاعات', 'orthocentre'),
            say('barizentroa', 'baricentro', 'مركز الثقل', 'centroid'),
            say('zirkunzentroa', 'circuncentro', 'مركز الدائرة المحيطة', 'circumcentre'),
            say('intzentroa', 'incentro', 'مركز الدائرة الداخلية', 'incentre')
        ],
        definitions: [
            {
                term: say('Altuera eta erdibidekoa', 'Altura y mediana', 'الارتفاع والمتوسط', 'Height and median'),
                meaning: say('Altuera erpin batetik aurkako aldera doan zuzenki perpendikularra da; erdibidekoak erpin bat aurkako aldearen erdiko puntuarekin lotzen du.', 'La altura va de un vértice al lado opuesto, perpendicular; la mediana une un vértice con el punto medio del lado opuesto.', 'الارتفاع قطعة عمودية من رأس إلى الضلع المقابل؛ والمتوسط يصل رأسًا بمنتصف الضلع المقابل.', 'The height goes from a vertex to the opposite side, at right angles; the median joins a vertex to the midpoint of the opposite side.')
            },
            {
                term: say('Erdibitzailea eta erdikaria', 'Mediatriz y bisectriz', 'محور القطعة ومنصّف الزاوية', 'Perpendicular and angle bisector'),
                meaning: say('Erdibitzailea alde baten erdiko puntutik doan perpendikularra da; erdikariak angelu bat bi zati berdinetan banatzen du.', 'La mediatriz es la perpendicular por el punto medio de un lado; la bisectriz parte un ángulo en dos iguales.', 'محور القطعة عمودي يمر بمنتصف الضلع؛ ومنصّف الزاوية يقسمها إلى قسمين متساويين.', 'The perpendicular bisector goes through the midpoint of a side at right angles; the angle bisector splits an angle into two equal parts.')
            }
        ],
        explanation: say(
            'Triangelu batek lau zuzen nabarmen mota ditu, eta mota bakoitzeko hirurak puntu batean ebakitzen dira: altuerak, ortozentroan; erdibidekoak, barizentroan; erdibitzaileak, zirkunzentroan; eta erdikariak, intzentroan.',
            'Un triángulo tiene cuatro tipos de rectas notables, y las tres de cada tipo se cortan en un punto: las alturas, en el ortocentro; las medianas, en el baricentro; las mediatrices, en el circuncentro; y las bisectrices, en el incentro.',
            'للمثلث أربعة أنواع من المستقيمات الشهيرة، والثلاثة من كل نوع تتلاقى في نقطة: الارتفاعات في ملتقى الارتفاعات، والمتوسطات في مركز الثقل، ومحاور الأضلاع في مركز الدائرة المحيطة، ومنصّفات الزوايا في مركز الدائرة الداخلية.',
            'A triangle has four kinds of special lines, and the three of each kind meet at one point: the heights at the orthocentre; the medians at the centroid; the perpendicular bisectors at the circumcentre; and the angle bisectors at the incentre.'
        ),
        examplePrompt: say('Zein puntutan ebakitzen dira triangelu baten hiru erdibidekoak? Eta hiru erdikariak?', '¿En qué punto se cortan las tres medianas de un triángulo? ¿Y las tres bisectrices?', 'في أيّ نقطة تتلاقى المتوسطات الثلاثة في مثلث؟ ومنصّفات الزوايا الثلاثة؟', 'At which point do the three medians of a triangle meet? And the three angle bisectors?'),
        example: '',
        exampleAnswer: say('Erdibidekoak, barizentroan; erdikariak, intzentroan.', 'Las medianas, en el baricentro; las bisectrices, en el incentro.', 'المتوسطات في مركز الثقل؛ ومنصّفات الزوايا في مركز الدائرة الداخلية.', 'The medians at the centroid; the angle bisectors at the incentre.')
    },
    quadrilaterals: {
        vocabulary: [
            say('paraleloak', 'paralelos', 'متوازيان', 'parallel'),
            say('oinarriak', 'bases', 'القاعدتان', 'bases'),
            say('erronboa', 'rombo', 'المعين', 'rhombus')
        ],
        explanation: say(
            'Lauki batek lau alde ditu, eta haren angeluek 360° batzen dituzte. Alde paraleloen arabera, marrazkian bezala:',
            'Un cuadrilátero tiene cuatro lados, y sus ángulos suman 360°. Según sus lados paralelos, como en el dibujo:',
            'للرباعي أربعة أضلاع، ومجموع زواياه 360°. وحسب أضلاعه المتوازية، كما في الرسم:',
            'A quadrilateral has four sides, and its angles add up to 360°. By its parallel sides, as in the drawing:'
        ),
        cases: [
            { title: say('Paralelogramoak', 'Paralelogramos', 'متوازيات الأضلاع', 'Parallelograms'), text: say('Bi alde paralelo pare: karratua, laukizuzena, erronboa eta erronboidea.', 'Dos pares de lados paralelos: cuadrado, rectángulo, rombo y romboide.', 'زوجان من الأضلاع المتوازية: المربع والمستطيل والمعين ومتوازي الأضلاع.', 'Two pairs of parallel sides: square, rectangle, rhombus and parallelogram.') },
            { title: say('Trapezioak', 'Trapecios', 'أشباه المنحرف', 'Trapeziums'), text: say('Pare bat bakarrik: oinarriak.', 'Solo un par: las bases.', 'زوج واحد فقط: القاعدتان.', 'Only one pair: the bases.') },
            { title: say('Trapezoideak', 'Trapezoides', 'الرباعيات الأخرى', 'Others'), text: say('Alde paralelorik ez.', 'Ningún lado paralelo.', 'لا أضلاع متوازية.', 'No parallel sides.') }
        ],
        examplePrompt: say('Lauki baten hiru angeluk 80°, 100° eta 95° neurtzen dute. Zenbat neurtzen du laugarrenak?', 'Tres ángulos de un cuadrilátero miden 80°, 100° y 95°. ¿Cuánto mide el cuarto?', 'ثلاث زوايا في رباعي قياساتها 80° و100° و95°. كم قياس الرابعة؟', 'Three angles of a quadrilateral are 80°, 100° and 95°. What is the fourth?'),
        example: same('$360^{\\circ}-80^{\\circ}-100^{\\circ}-95^{\\circ}=85^{\\circ}$'),
        exampleAnswer: say('Laugarren angeluak 85° neurtzen ditu.', 'El cuarto ángulo mide 85°.', 'الزاوية الرابعة 85°.', 'The fourth angle is 85°.'),
        why: {
            text: say(
                'Diagonal batek laukia bi triangelutan banatzen du. Triangelu bakoitzaren angeluek 180° batzen dituzte; beraz, laukiarenek $180^{\\circ}+180^{\\circ}=360^{\\circ}$.',
                'Una diagonal parte el cuadrilátero en dos triángulos. Los ángulos de cada triángulo suman 180°, así que los del cuadrilátero suman $180^{\\circ}+180^{\\circ}=360^{\\circ}$.',
                'القطر يقسم الرباعي إلى مثلثين. ومجموع زوايا كل مثلث 180°، إذن مجموع زوايا الرباعي $180^{\\circ}+180^{\\circ}=360^{\\circ}$.',
                'A diagonal splits the quadrilateral into two triangles. The angles of each triangle add up to 180°, so those of the quadrilateral add up to $180^{\\circ}+180^{\\circ}=360^{\\circ}$.'
            )
        }
    },
    circle: {
        vocabulary: [
            say('erradioa', 'radio', 'نصف القطر', 'radius'),
            say('diametroa', 'diámetro', 'القطر', 'diameter'),
            say('korda', 'cuerda', 'الوتر', 'chord'),
            say('arkua', 'arco', 'القوس', 'arc')
        ],
        definitions: [
            {
                term: say('Zirkunferentzia eta zirkulua', 'Circunferencia y círculo', 'الدائرة والقرص', 'Circumference and circle'),
                meaning: say('Zirkunferentzia zentrotik distantzia berera dauden puntuen lerroa da; zirkulua, hark inguratzen duen gainazala.', 'La circunferencia es la línea de los puntos a la misma distancia del centro; el círculo, la superficie que encierra.', 'الدائرة خط النقاط التي تبعد المسافة نفسها عن المركز؛ والقرص السطح الذي تحيط به.', 'The circumference is the line of points at the same distance from the centre; the circle is the surface it encloses.')
            }
        ],
        explanation: say(
            'Elementuak zentroa, erradioa (zentrotik zirkunferentziara), diametroa (zentrotik pasatzen den korda, erradioaren bikoitza), korda eta arkua dira, marrazkian bezala: $d=2r$.',
            'Sus elementos son el centro, el radio (del centro a la circunferencia), el diámetro (la cuerda que pasa por el centro, el doble del radio), la cuerda y el arco, como en el dibujo: $d=2r$.',
            'عناصرها المركز، ونصف القطر (من المركز إلى الدائرة)، والقطر (الوتر المار بالمركز، ضعف نصف القطر)، والوتر والقوس، كما في الرسم: $d=2r$.',
            'Its parts are the centre, the radius (from the centre to the circumference), the diameter (the chord through the centre, twice the radius), the chord and the arc, as in the drawing: $d=2r$.'
        ),
        examplePrompt: say('Gurpil batek 70 cm-ko diametroa du. Zenbat neurtzen du erradioak?', 'Una rueda tiene 70 cm de diámetro. ¿Cuánto mide su radio?', 'قطر عجلة 70 سم. كم طول نصف قطرها؟', 'A wheel has a 70 cm diameter. How long is its radius?'),
        example: same('$r=70\\mathbin{:}2=35\\ \\mathrm{cm}$'),
        exampleAnswer: say('Erradioa diametroaren erdia da: 35 cm.', 'El radio es la mitad del diámetro: 35 cm.', 'نصف القطر نصف القطر الكامل: 35 سم.', 'The radius is half the diameter: 35 cm.')
    },

    /* ---------- 3. Pythagoras ---------- */
    pythagoras: {
        vocabulary: [
            say('teorema', 'teorema', 'المبرهنة', 'theorem'),
            say('karratua', 'cuadrado', 'المربع', 'square'),
            say('angelu zuzena', 'ángulo recto', 'الزاوية القائمة', 'right angle')
        ],
        definitions: [
            {
                term: say('Katetoak eta hipotenusa', 'Catetos e hipotenusa', 'ضلعا القائمة والوتر', 'Legs and hypotenuse'),
                meaning: say('Triangelu zuzen batean, katetoek angelu zuzena osatzen dute; hipotenusa, alde luzeena, haren aurrean dago.', 'En un triángulo rectángulo, los catetos forman el ángulo recto; la hipotenusa, el lado más largo, está enfrente.', 'في المثلث القائم يكوّن ضلعا القائمة الزاوية القائمة، والوتر هو الضلع الأطول المقابل لها.', 'In a right-angled triangle, the legs make the right angle; the hypotenuse, the longest side, is opposite it.')
            }
        ],
        explanation: say(
            'Pitagorasen teoremak dio hipotenusaren karratua katetoen karratuen baturaren berdina dela: $a^{2}=b^{2}+c^{2}$, marrazkian bezala, $25=9+16$. Alderantziz ere balio du: aldeek betetzen badute, triangelua zuzena da.',
            'El teorema de Pitágoras dice que el cuadrado de la hipotenusa es igual a la suma de los cuadrados de los catetos: $a^{2}=b^{2}+c^{2}$, como en el dibujo, $25=9+16$. También sirve al revés: si los lados la cumplen, el triángulo es rectángulo.',
            'تقول مبرهنة فيثاغورس إن مربع الوتر يساوي مجموع مربعي ضلعي القائمة: $a^{2}=b^{2}+c^{2}$، كما في الرسم $25=9+16$. وتصح بالعكس أيضًا: إذا حققتها الأضلاع فالمثلث قائم الزاوية.',
            'Pythagoras\' theorem says that the square of the hypotenuse equals the sum of the squares of the legs: $a^{2}=b^{2}+c^{2}$, as in the drawing, $25=9+16$. It also works backwards: if the sides satisfy it, the triangle has a right angle.'
        ),
        examplePrompt: say('7, 24 eta 25 cm-ko aldeak dituen triangelua zuzena da?', '¿Es rectángulo un triángulo de lados 7, 24 y 25 cm?', 'هل المثلث الذي أضلاعه 7 و24 و25 سم قائم الزاوية؟', 'Is a triangle with sides 7, 24 and 25 cm right-angled?'),
        example: same('$\\begin{gathered}25^{2}=625\\\\7^{2}+24^{2}=49+576=625\\end{gathered}$'),
        exampleAnswer: say('Bai: bi emaitzak berdinak dira.', 'Sí: los dos resultados son iguales.', 'نعم: النتيجتان متساويتان.', 'Yes: both results are the same.')
    },
    'pythagoras-use': {
        vocabulary: [
            say('erro karratua', 'raíz cuadrada', 'الجذر التربيعي', 'square root'),
            say('katetoa', 'cateto', 'ضلع القائمة', 'leg'),
            say('hipotenusa', 'hipotenusa', 'الوتر', 'hypotenuse')
        ],
        explanation: say(
            'Triangelu zuzen baten bi alde ezagututa, hirugarrena kalkulatzen da:',
            'Conociendo dos lados de un triángulo rectángulo, se calcula el tercero:',
            'إذا عرفنا ضلعين في مثلث قائم الزاوية نحسب الثالث:',
            'Knowing two sides of a right-angled triangle, you can work out the third:'
        ),
        cases: [
            { title: say('Hipotenusa', 'La hipotenusa', 'الوتر', 'The hypotenuse'), text: say('Batu katetoen karratuak, eta egin erro karratua.', 'Suma los cuadrados de los catetos y haz la raíz cuadrada.', 'اجمع مربعي ضلعي القائمة وخذ الجذر التربيعي.', 'Add the squares of the legs and take the square root.'), math: same('$a=\\sqrt{b^{2}+c^{2}}$') },
            { title: say('Katetoa', 'Un cateto', 'ضلع القائمة', 'A leg'), text: say('Kendu hipotenusaren karratuari beste katetoaren karratua, eta egin erroa.', 'Resta al cuadrado de la hipotenusa el del otro cateto y haz la raíz.', 'اطرح من مربع الوتر مربع الضلع الآخر وخذ الجذر.', 'Subtract the square of the other leg from the square of the hypotenuse and take the root.'), math: same('$b=\\sqrt{a^{2}-c^{2}}$') }
        ],
        examplePrompt: say('Hipotenusak 17 cm neurtzen ditu, eta kateto batek 8 cm. Zenbat neurtzen du beste katetoak?', 'La hipotenusa mide 17 cm y un cateto, 8 cm. ¿Cuánto mide el otro cateto?', 'الوتر 17 سم وأحد ضلعي القائمة 8 سم. كم طول الآخر؟', 'The hypotenuse is 17 cm and one leg is 8 cm. How long is the other leg?'),
        example: same('$c=\\sqrt{17^{2}-8^{2}}=\\sqrt{225}=15$'),
        exampleAnswer: say('Beste katetoak 15 cm neurtzen ditu.', 'El otro cateto mide 15 cm.', 'الضلع الآخر 15 سم.', 'The other leg is 15 cm long.')
    },

    /* ---------- 4. Units and perimeters ---------- */
    units: {
        vocabulary: [
            say('metroa', 'metro', 'المتر', 'metre'),
            say('urratsa', 'escalón', 'الدرجة', 'step'),
            say('metro karratua', 'metro cuadrado', 'المتر المربع', 'square metre')
        ],
        explanation: say(
            'Luzerako unitate nagusia metroa da: km, hm, dam, m, dm, cm, mm. Unitate bakoitza hurrengoa baino 10 aldiz handiagoa da: $1\\ \\mathrm{km}=1000\\ \\mathrm{m}$. Azalerakoa metro karratua da, eta unitate bakoitza hurrengoa baino 100 aldiz handiagoa: $1\\ \\mathrm{m}^{2}=100\\ \\mathrm{dm}^{2}$.',
            'La unidad principal de longitud es el metro: km, hm, dam, m, dm, cm, mm. Cada unidad es 10 veces mayor que la siguiente: $1\\ \\mathrm{km}=1000\\ \\mathrm{m}$. La de superficie es el metro cuadrado, y cada unidad es 100 veces mayor que la siguiente: $1\\ \\mathrm{m}^{2}=100\\ \\mathrm{dm}^{2}$.',
            'الوحدة الأساسية للطول هي المتر: km، hm، dam، m، dm، cm، mm. وكل وحدة أكبر من التي تليها 10 مرات: $1\\ \\mathrm{km}=1000\\ \\mathrm{m}$. ووحدة المساحة المتر المربع، وكل وحدة أكبر من التي تليها 100 مرة: $1\\ \\mathrm{m}^{2}=100\\ \\mathrm{dm}^{2}$.',
            'The main unit of length is the metre: km, hm, dam, m, dm, cm, mm. Each unit is 10 times bigger than the next: $1\\ \\mathrm{km}=1000\\ \\mathrm{m}$. The unit of area is the square metre, and each unit is 100 times bigger than the next: $1\\ \\mathrm{m}^{2}=100\\ \\mathrm{dm}^{2}$.'
        ),
        examplePrompt: say('Pasatu 3,4 km metrotara, eta 5 m² dezimetro karratutara.', 'Pasa 3,4 km a metros y 5 m² a decímetros cuadrados.', 'حوّل 3.4 كم إلى أمتار، و5 م² إلى ديسيمترات مربعة.', 'Convert 3.4 km into metres and 5 m² into square decimetres.'),
        example: same('$\\begin{gathered}3{,}4\\cdot 1000=3400\\ \\mathrm{m}\\\\5\\cdot 100=500\\ \\mathrm{dm}^{2}\\end{gathered}$'),
        exampleAnswer: say('km-tik m-ra hiru urrats daude: bider 1000. m²-tik dm²-ra, bat: bider 100.', 'De km a m hay tres escalones: por 1000. De m² a dm², uno: por 100.', 'من كم إلى م ثلاث درجات: في 1000. ومن م² إلى دسم² درجة واحدة: في 100.', 'From km to m there are three steps: times 1,000. From m² to dm², one: times 100.'),
        why: {
            text: say(
                '1 dm-ko aldea duen karratu batean, 10 errenkada daude, bakoitza 1 cm-ko 10 karraturekin: $10\\cdot 10=100$ karratu. Horregatik da azaleran urrats bakoitza 100.',
                'En un cuadrado de 1 dm de lado caben 10 filas de 10 cuadraditos de 1 cm: $10\\cdot 10=100$ cuadraditos. Por eso en superficie cada escalón vale 100.',
                'في مربع طول ضلعه 1 دسم تتسع 10 صفوف في كل منها 10 مربعات صغيرة طول ضلعها 1 سم: $10\\cdot 10=100$ مربع. لذلك كل درجة في المساحة تساوي 100.',
                'A square with 1 dm sides holds 10 rows of 10 little 1 cm squares: $10\\cdot 10=100$ squares. That is why, for area, each step is worth 100.'
            ),
            math: same('$10\\cdot 10=100$')
        }
    },
    perimeter: {
        vocabulary: [
            say('luzera', 'longitud', 'الطول', 'length'),
            say('aldeak', 'lados', 'الأضلاع', 'sides'),
            say('unitatea', 'unidad', 'الوحدة', 'unit')
        ],
        definitions: [
            {
                term: say('Perimetroa', 'Perímetro', 'المحيط', 'Perimeter'),
                meaning: say('Alde guztien luzeren batura.', 'La suma de las longitudes de todos los lados.', 'مجموع أطوال كل الأضلاع.', 'The sum of the lengths of all the sides.')
            }
        ],
        explanation: say(
            'Marrazkiko 9 cm bider 5 cm-ko laukizuzenaren perimetroa $9+5+9+5=28$ cm da. Poligono erregular batean alde guztiak berdinak dira: nahikoa da alde bat alde kopuruaz biderkatzea. Alde guztiak unitate berean.',
            'En el rectángulo del dibujo, de 9 cm por 5 cm, el perímetro es $9+5+9+5=28$ cm. En un polígono regular todos los lados son iguales: basta multiplicar un lado por el número de lados. Todos los lados, en la misma unidad.',
            'محيط المستطيل في الرسم، بعداه 9 سم و5 سم، هو $9+5+9+5=28$ سم. وفي المضلع المنتظم كل الأضلاع متساوية: يكفي ضرب ضلع في عدد الأضلاع. وكل الأضلاع بالوحدة نفسها.',
            'For the 9 cm by 5 cm rectangle in the drawing, the perimeter is $9+5+9+5=28$ cm. In a regular polygon all the sides are equal: just multiply one side by the number of sides. All the sides in the same unit.'
        ),
        examplePrompt: say('Kalkulatu 7 cm-ko aldea duen oktogono erregular baten perimetroa, eta 12, 15 eta 18 cm-ko aldeak dituen triangelu batena.', 'Calcula el perímetro de un octógono regular de 7 cm de lado y el de un triángulo de lados 12, 15 y 18 cm.', 'احسب محيط مثمن منتظم طول ضلعه 7 سم، ومحيط مثلث أضلاعه 12 و15 و18 سم.', 'Work out the perimeter of a regular octagon with 7 cm sides and of a triangle with sides 12, 15 and 18 cm.'),
        example: same('$\\begin{gathered}P=8\\cdot 7=56\\ \\mathrm{cm}\\\\P=12+15+18=45\\ \\mathrm{cm}\\end{gathered}$'),
        exampleAnswer: say('56 cm eta 45 cm.', '56 cm y 45 cm.', '56 سم و45 سم.', '56 cm and 45 cm.')
    },
    circumference: {
        vocabulary: [
            say('pi', 'pi', 'باي', 'pi'),
            say('diametroa', 'diámetro', 'القطر', 'diameter'),
            say('erradioa', 'radio', 'نصف القطر', 'radius')
        ],
        definitions: [
            {
                term: say('π zenbakia', 'El número π', 'العدد π', 'The number π'),
                meaning: say('Edozein zirkunferentziaren luzera zati haren diametroa: $\\pi\\approx 3{,}14$.', 'La longitud de cualquier circunferencia dividida entre su diámetro: $\\pi\\approx 3{,}14$.', 'طول أي دائرة مقسومًا على قطرها: $\\pi\\approx 3{,}14$.', 'The length of any circumference divided by its diameter: $\\pi\\approx 3{,}14$.')
            }
        ],
        explanation: say(
            'Zirkunferentzia baten luzera haren diametroarekin zatitzen bada, beti zenbaki bera ateratzen da, π. Horregatik, luzera π bider diametroa da: $L=\\pi d$, edo, gauza bera dena, $L=2\\pi r$.',
            'Si se divide la longitud de una circunferencia entre su diámetro, siempre sale el mismo número, π. Por eso la longitud es π por el diámetro: $L=\\pi d$, o, lo que es lo mismo, $L=2\\pi r$.',
            'إذا قسمنا طول دائرة على قطرها نحصل دائمًا على العدد نفسه، π (باي). لذلك الطول هو π في القطر: $L=\\pi d$، أو، وهو الشيء نفسه، $L=2\\pi r$.',
            'If you divide the length of a circumference by its diameter, you always get the same number, π. That is why the length is π times the diameter: $L=\\pi d$, or, which is the same, $L=2\\pi r$.'
        ),
        examplePrompt: say('Gurpil batek 30 cm-ko diametroa du. Zenbat egiten du aurrera bira batean?', 'Una rueda tiene 30 cm de diámetro. ¿Cuánto avanza en una vuelta?', 'قطر عجلة 30 سم. كم تتقدم في دورة واحدة؟', 'A wheel has a 30 cm diameter. How far does it go in one turn?'),
        example: same('$L=3{,}14\\cdot 30=94{,}2\\ \\mathrm{cm}$'),
        exampleAnswer: say('Bira bakoitzean 94,2 cm inguru egiten du aurrera: gurpilaren luzera.', 'En cada vuelta avanza unos 94,2 cm: la longitud de la rueda.', 'في كل دورة تتقدم نحو 94.2 سم: طول محيط العجلة.', 'Each turn it goes about 94.2 cm: the length round the wheel.')
    },

    /* ---------- 5. Areas ---------- */
    'area-rectangles': {
        vocabulary: [
            say('oinarria', 'base', 'القاعدة', 'base'),
            say('altuera', 'altura', 'الارتفاع', 'height'),
            say('unitate karratuak', 'unidades cuadradas', 'الوحدات المربعة', 'square units')
        ],
        definitions: [
            {
                term: say('Azalera', 'Área', 'المساحة', 'Area'),
                meaning: say('Irudi batek hartzen duen gainazala; unitate karratutan neurtzen da (cm², m²…).', 'La superficie que ocupa una figura; se mide en unidades cuadradas (cm², m²…).', 'السطح الذي يشغله الشكل؛ ويُقاس بالوحدات المربعة (سم²، م²…).', 'The surface a shape covers; it is measured in square units (cm², m²…).')
            }
        ],
        explanation: say(
            'Laukizuzenaren azalera oinarria bider altuera da: sartzen diren karratutxoak, marrazkian bezala, $6\\cdot 3=18$. Karratuarena, aldea bider aldea. Paralelogramo bat laukizuzen bihurtzen da triangelu bat mugituz: hura ere oinarria bider altuera.',
            'El área del rectángulo es base por altura: los cuadraditos que caben, como en el dibujo, $6\\cdot 3=18$. La del cuadrado, lado por lado. Un paralelogramo se convierte en un rectángulo moviendo un triángulo: también base por altura.',
            'مساحة المستطيل القاعدة في الارتفاع: عدد المربعات الصغيرة التي تتسع فيه، كما في الرسم $6\\cdot 3=18$. ومساحة المربع الضلع في الضلع. ومتوازي الأضلاع يصير مستطيلًا بنقل مثلث: إذن مساحته أيضًا القاعدة في الارتفاع.',
            'The area of a rectangle is base times height: the little squares that fit in, as in the drawing, $6\\cdot 3=18$. A square\'s is side times side. A parallelogram turns into a rectangle by moving a triangle: so it is base times height too.'
        ),
        examplePrompt: say('Kalkulatu 12 m bider 7 m-ko laukizuzen baten azalera, eta 9 m-ko aldea duen karratu batena.', 'Calcula el área de un rectángulo de 12 m por 7 m y la de un cuadrado de 9 m de lado.', 'احسب مساحة مستطيل بعداه 12 م و7 م، ومساحة مربع طول ضلعه 9 م.', 'Work out the area of a 12 m by 7 m rectangle and of a square with 9 m sides.'),
        example: same('$\\begin{gathered}A=12\\cdot 7=84\\ \\mathrm{m}^{2}\\\\A=9^{2}=81\\ \\mathrm{m}^{2}\\end{gathered}$'),
        exampleAnswer: say('84 m² eta 81 m²: azalerak unitate karratuak ditu.', '84 m² y 81 m²: el área lleva unidades cuadradas.', '84 م² و81 م²: المساحة بالوحدات المربعة.', '84 m² and 81 m²: area is in square units.')
    },
    'area-triangle': {
        vocabulary: [
            say('diagonalak', 'diagonales', 'القطران', 'diagonals'),
            say('oinarriak', 'bases', 'القاعدتان', 'bases'),
            say('altuera', 'altura', 'الارتفاع', 'height')
        ],
        explanation: say(
            'Hiru irudiak laukizuzen batetik ateratzen dira, eta horregatik hiru formulak 2 zenbakiarekin zatitzen dira:',
            'Las tres figuras salen de un rectángulo, y por eso las tres fórmulas dividen entre 2:',
            'الأشكال الثلاثة تأتي من مستطيل، ولذلك تقسم الصيغ الثلاث على 2:',
            'All three shapes come from a rectangle, and that is why all three formulas divide by 2:'
        ),
        cases: [
            { title: say('Triangelua', 'Triángulo', 'المثلث', 'Triangle'), text: say('Oinarri eta altuera bereko laukizuzenaren erdia.', 'La mitad del rectángulo de igual base y altura.', 'نصف المستطيل الذي له القاعدة والارتفاع نفسهما.', 'Half the rectangle with the same base and height.'), math: same('$A=\\frac{b\\cdot h}{2}$') },
            { title: say('Erronboa', 'Rombo', 'المعين', 'Rhombus'), text: say('Diagonalen biderkaduraren erdia.', 'La mitad del producto de las diagonales.', 'نصف حاصل ضرب القطرين.', 'Half the product of the diagonals.'), math: same('$A=\\frac{D\\cdot d}{2}$') },
            { title: say('Trapezioa', 'Trapecio', 'شبه المنحرف', 'Trapezium'), text: say('Oinarrien batura bider altuera, zati bi.', 'La suma de las bases por la altura, entre dos.', 'مجموع القاعدتين في الارتفاع، مقسومًا على اثنين.', 'The sum of the bases times the height, divided by two.'), math: same('$A=\\frac{(B+b)\\cdot h}{2}$') }
        ],
        examplePrompt: say('Kalkulatu 16 cm eta 9 cm-ko diagonalak dituen erronbo baten azalera, eta 11 eta 7 cm-ko oinarriak eta 4 cm-ko altuera dituen trapezio batena.', 'Calcula el área de un rombo de diagonales 16 cm y 9 cm y la de un trapecio de bases 11 y 7 cm y altura 4 cm.', 'احسب مساحة معين قطراه 16 سم و9 سم، ومساحة شبه منحرف قاعدتاه 11 و7 سم وارتفاعه 4 سم.', 'Work out the area of a rhombus with diagonals 16 cm and 9 cm and of a trapezium with bases 11 and 7 cm and height 4 cm.'),
        example: same('$\\begin{gathered}A=\\frac{16\\cdot 9}{2}=72\\ \\mathrm{cm}^{2}\\\\A=\\frac{(11+7)\\cdot 4}{2}=36\\ \\mathrm{cm}^{2}\\end{gathered}$'),
        exampleAnswer: say('72 cm² eta 36 cm².', '72 cm² y 36 cm².', '72 سم² و36 سم².', '72 cm² and 36 cm².')
    },
    'area-circle': {
        vocabulary: [
            say('perimetroa', 'perímetro', 'المحيط', 'perimeter'),
            say('zentroa', 'centro', 'المركز', 'centre'),
            say('erradioa', 'radio', 'نصف القطر', 'radius')
        ],
        definitions: [
            {
                term: say('Apotema', 'Apotema', 'العامد', 'Apothem'),
                meaning: say('Poligono erregular baten zentrotik alde baten erdiko puntura doan zuzenkia.', 'El segmento del centro de un polígono regular al punto medio de un lado.', 'القطعة من مركز المضلع المنتظم إلى منتصف أحد أضلاعه.', 'The segment from the centre of a regular polygon to the midpoint of a side.')
            }
        ],
        explanation: say(
            'Poligono erregular bat zentrotik triangelu berdinetan banatzen da; haien altuera apotema da. Horregatik, haren azalera perimetroa bider apotema zati bi da: $A=\\frac{P\\cdot ap}{2}$. Zirkulua alde askoko poligono bat bezalakoa da: $A=\\pi r^{2}$.',
            'Un polígono regular se divide desde el centro en triángulos iguales; su altura es la apotema. Por eso su área es el perímetro por la apotema entre dos: $A=\\frac{P\\cdot ap}{2}$. El círculo es como un polígono de muchísimos lados: $A=\\pi r^{2}$.',
            'يُقسَم المضلع المنتظم من مركزه إلى مثلثات متساوية ارتفاعها العامد. لذلك مساحته المحيط في العامد مقسومًا على 2: $A=\\frac{P\\cdot ap}{2}$. والقرص كمضلع له أضلاع كثيرة جدًا: $A=\\pi r^{2}$.',
            'A regular polygon is split from its centre into equal triangles; their height is the apothem. That is why its area is the perimeter times the apothem divided by two: $A=\\frac{P\\cdot ap}{2}$. A circle is like a polygon with very many sides: $A=\\pi r^{2}$.'
        ),
        examplePrompt: say('Kalkulatu 6 cm-ko aldea eta 5,2 cm-ko apotema dituen hexagono erregular baten azalera, eta 3 cm-ko erradioa duen zirkulu batena.', 'Calcula el área de un hexágono regular de 6 cm de lado y 5,2 cm de apotema, y la de un círculo de 3 cm de radio.', 'احسب مساحة مسدس منتظم طول ضلعه 6 سم وعامده 5.2 سم، ومساحة قرص نصف قطره 3 سم.', 'Work out the area of a regular hexagon with 6 cm sides and a 5.2 cm apothem, and of a circle with a 3 cm radius.'),
        example: same('$\\begin{gathered}A=\\frac{36\\cdot 5{,}2}{2}=93{,}6\\ \\mathrm{cm}^{2}\\\\A=3{,}14\\cdot 3^{2}=28{,}26\\ \\mathrm{cm}^{2}\\end{gathered}$'),
        exampleAnswer: say('Hexagonoaren perimetroa $6\\cdot 6=36$ cm da.', 'El perímetro del hexágono es $6\\cdot 6=36$ cm.', 'محيط المسدس $6\\cdot 6=36$ سم.', 'The perimeter of the hexagon is $6\\cdot 6=36$ cm.')
    }
}
