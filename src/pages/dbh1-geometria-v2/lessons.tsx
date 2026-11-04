import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { AnglePairsFigure, AngleTypesFigure, AreaFigure, CircleFigure, LinesFigure, PerimeterFigure, PolygonFigure, PythagorasFigure, QuadrilateralsFigure, TriangleSumFigure, TriangleTypesFigure } from './figures'
import { geometryIntroLessonChecks, type GeometryIntroTopicId } from './lessonChecks'
import { geometryIntroLessonTexts } from './lessonTexts'

/* ==========================================================================
   Geometria · 1. DBH — stages and lessons
   Sequence follows the class textbook (Santillana 1.º ESO, units 9, 10 and
   11, curricular adaptation): lines and angles, polygons, triangles and
   their notable lines, quadrilaterals, the circle, Pythagoras' theorem,
   units, perimeters, the length of the circumference and areas.
   Decimals are written with a comma (a point in Arabic); π ≈ 3,14.
   ========================================================================== */

export type GeometryIntroStageId = 'angles' | 'polygons' | 'pythagoras' | 'perimeters' | 'areas'

/** The same formula in every language, with a decimal point instead of the comma in Arabic */
const dec = (latex: string): LocalizedText => ({ eu: latex, es: latex, en: latex, ar: latex.replace(/\{,\}/g, '.') })

export const geometryIntroStages: UnitStage[] = [
    { id: 'angles', tone: 'blue', title: { eu: 'Zuzenak eta angeluak', es: 'Rectas y ángulos', en: 'Straight lines and angles.', ar: 'المستقيمات والزوايا' } },
    { id: 'polygons', tone: 'violet', title: { eu: 'Poligonoak eta zirkulua', es: 'Polígonos y círculo', en: 'Polygons and circle.', ar: 'المضلعات والدائرة' } },
    { id: 'pythagoras', tone: 'mustard', title: { eu: 'Pitagorasen teorema', es: 'Teorema de Pitágoras', en: 'Pythagoras\' theorem', ar: 'مبرهنة فيثاغورس' } },
    { id: 'perimeters', tone: 'coral', title: { eu: 'Unitateak eta perimetroak', es: 'Unidades y perímetros', en: 'Units and perimeters.', ar: 'الوحدات والمحيطات' } },
    { id: 'areas', tone: 'green', title: { eu: 'Azalerak', es: 'Áreas', en: 'Areas', ar: 'المساحات' } }
]

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    {
        id: 'lines',
        stage: 'angles',
        title: { eu: 'Zuzenak, zuzerdiak eta zuzenkiak', es: 'Rectas, semirrectas y segmentos', en: 'Straight lines, rays and line segments', ar: 'المستقيمات وأنصافها والقطع' },
        goal: {
            eu: 'Zuzena, zuzerdia eta zuzenkia bereiztea eta bi zuzenen posizioak ezagutzea.',
            es: 'Distinguir recta, semirrecta y segmento y conocer las posiciones de dos rectas.',
            en: 'Tell apart a straight line, a ray and a line segment, and know the positions of two straight lines.',
            ar: 'التمييز بين المستقيم ونصفه والقطعة ومعرفة أوضاع مستقيمين.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Zuzena', es: 'Recta', en: 'Straight line', ar: 'المستقيم' }, text: { eu: 'Bi norabideetan infinitua. Letra xehez izendatzen da: r, s.', es: 'Infinita en los dos sentidos. Se nombra con letra minúscula: r, s.', en: 'Infinite in both directions. It is named with a lowercase letter: r, s.', ar: 'لا نهائي في الاتجاهين. يُسمّى بحرف صغير: r، s.' } },
            { title: { eu: 'Zuzenkia', es: 'Segmento', en: 'Line segment', ar: 'القطعة' }, text: { eu: 'Bi mutur ditu: AB. Neur daiteke.', es: 'Tiene dos extremos: AB. Se puede medir.', en: 'It has two endpoints: AB. It can be measured.', ar: 'لها طرفان: AB. ويمكن قياسها.' } },
            { title: { eu: 'Posizioak', es: 'Posiciones', en: 'Positions', ar: 'الأوضاع' }, text: { eu: 'Paraleloak, ebakitzaileak edo perpendikularrak.', es: 'Paralelas, secantes o perpendiculares.', en: 'Parallel, intersecting or perpendicular.', ar: 'متوازيان أو متقاطعان أو متعامدان.' } }
        ],
        takeaway: {
            eu: 'Zuzenkia bakarrik neur daiteke: zuzenak eta zuzerdiak ez dute amaierarik.',
            es: 'Solo el segmento se puede medir: la recta y la semirrecta no terminan.',
            en: 'Only the line segment can be measured: the straight line and the ray do not end.',
            ar: 'القطعة وحدها تُقاس: المستقيم ونصفه لا ينتهيان.'
        },
        figure: (language) => <LinesFigure language={language} />
    },
    {
        id: 'angles',
        stage: 'angles',
        title: { eu: 'Angeluak eta haien neurria', es: 'Los ángulos y su medida', en: 'Angles and their measure', ar: 'الزوايا وقياسها' },
        goal: {
            eu: 'Angelu baten elementuak ezagutzea eta angeluak neurriaren arabera sailkatzea.',
            es: 'Conocer los elementos de un ángulo y clasificar los ángulos según su medida.',
            en: 'Know the parts of an angle and classify angles by their size.',
            ar: 'معرفة عناصر الزاوية وتصنيف الزوايا حسب قياسها.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Zorrotza', es: 'Agudo', en: 'Acute', ar: 'حادة' }, text: { eu: 'Zuzena baino txikiagoa.', es: 'Menor que un recto.', en: 'Less than a right angle.', ar: 'أصغر من القائمة.' }, math: '$0^{\\circ}<\\alpha<90^{\\circ}$' },
            { title: { eu: 'Zuzena', es: 'Recto', en: 'Right', ar: 'قائمة' }, text: { eu: 'Laukitxo batez markatzen da.', es: 'Se marca con un cuadradito.', en: 'It is marked with a little square.', ar: 'تُعلَّم بمربع صغير.' }, math: '$\\alpha=90^{\\circ}$' },
            { title: { eu: 'Kamutsa', es: 'Obtuso', en: 'Obtuse', ar: 'منفرجة' }, text: { eu: 'Zuzena baino handiagoa eta laua baino txikiagoa.', es: 'Mayor que un recto y menor que un llano.', en: 'Greater than a right angle and less than a straight angle.', ar: 'أكبر من القائمة وأصغر من المستقيمة.' }, math: '$90^{\\circ}<\\alpha<180^{\\circ}$' },
            { title: { eu: 'Laua', es: 'Llano', en: 'Straight', ar: 'مستقيمة' }, text: { eu: 'Bi aldeek zuzen bat osatzen dute.', es: 'Los dos lados forman una recta.', en: 'The two sides form a straight line.', ar: 'الضلعان يكوّنان مستقيمًا.' }, math: '$\\alpha=180^{\\circ}$' }
        ],
        takeaway: {
            eu: 'Konparatu beti 90°-rekin eta 180°-rekin.',
            es: 'Compara siempre con 90° y con 180°.',
            en: 'Always compare with 90° and with 180°.',
            ar: 'قارن دائمًا بـ 90° و180°.'
        },
        figure: (language) => <AngleTypesFigure language={language} />
    },
    {
        id: 'angle-pairs',
        stage: 'angles',
        title: { eu: 'Angelu osagarriak eta betegarriak', es: 'Ángulos complementarios y suplementarios', en: 'Complementary and supplementary angles', ar: 'الزوايا المتتامة والمتكاملة' },
        goal: {
            eu: 'Angelu baten osagarria eta betegarria kalkulatzea, eta erpinez aurkakoak ezagutzea.',
            es: 'Calcular el complementario y el suplementario de un ángulo y reconocer los opuestos por el vértice.',
            en: 'Calculate the complementary and supplementary angles of an angle and recognise vertically opposite angles.',
            ar: 'حساب المتممة والمكملة لزاوية ومعرفة الزاويتين المتقابلتين بالرأس.'
        },
        problem: { eu: 'Kalkulatu 35°-ko angeluaren osagarria eta betegarria.', es: 'Calcula el complementario y el suplementario de un ángulo de 35°.', en: 'Calculate the complementary and supplementary angles of a 35° angle.', ar: 'احسب المتممة والمكملة لزاوية قياسها 35°.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Osagarria: kendu 90°-ri.', es: 'Complementario: réstalo de 90°.', en: 'Complementary: subtract it from 90°.', ar: 'المتممة: اطرحها من 90°.' }, math: '$90^{\\circ}-35^{\\circ}=55^{\\circ}$' },
            { text: { eu: 'Betegarria: kendu 180°-ri.', es: 'Suplementario: réstalo de 180°.', en: 'Supplementary: subtract it from 180°.', ar: 'المكملة: اطرحها من 180°.' }, math: '$180^{\\circ}-35^{\\circ}=145^{\\circ}$' },
            { title: { eu: 'Kontuz', es: 'Cuidado', en: 'Be careful', ar: 'انتبه' }, text: { eu: 'Kamuts batek ez du osagarririk: 90° baino gehiago da.', es: 'Un obtuso no tiene complementario: ya pasa de 90°.', en: 'An obtuse angle has no complementary angle: it is already over 90°.', ar: 'الزاوية المنفرجة ليس لها متممة: فهي تتجاوز 90°.' } }
        ],
        takeaway: {
            eu: 'Osagarriak: 90°. Betegarriak: 180°.',
            es: 'Complementarios: 90°. Suplementarios: 180°.',
            en: 'Complementary: 90°. Supplementary: 180°.',
            ar: 'المتتامتان: 90°. المتكاملتان: 180°.'
        },
        figureAfterSteps: true,
        figure: (language) => <AnglePairsFigure language={language} />
    },
    {
        id: 'polygons',
        stage: 'polygons',
        title: { eu: 'Poligonoak', es: 'Polígonos', en: 'Polygons', ar: 'المضلعات' },
        goal: {
            eu: 'Poligono baten elementuak ezagutzea eta poligonoak alde kopuruaren arabera izendatzea.',
            es: 'Conocer los elementos de un polígono y nombrar los polígonos según su número de lados.',
            en: 'Know the parts of a polygon and name polygons by their number of sides.',
            ar: 'معرفة عناصر المضلع وتسمية المضلعات حسب عدد أضلاعها.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Elementuak', es: 'Elementos', en: 'Parts', ar: 'العناصر' }, text: { eu: 'Poligono batek adina alde, erpin eta angelu ditu.', es: 'Un polígono tiene tantos lados como vértices y ángulos.', en: 'A polygon has as many sides as vertices and angles.', ar: 'للمضلع عدد من الأضلاع يساوي عدد رؤوسه وزواياه.' } },
            { title: { eu: 'Erregularrak', es: 'Regulares', en: 'Regular', ar: 'المنتظمة' }, text: { eu: 'Alde berdinak eta angelu berdinak: triangelu aldeberdina, karratua, hexagono erregularra.', es: 'Lados iguales y ángulos iguales: triángulo equilátero, cuadrado, hexágono regular.', en: 'Equal sides and equal angles: equilateral triangle, square, regular hexagon.', ar: 'أضلاع متساوية وزوايا متساوية: المثلث المتساوي الأضلاع والمربع والمسدس المنتظم.' } },
            { title: { eu: 'Ganbilak eta ahurrak', es: 'Convexos y cóncavos', en: 'Convex and concave', ar: 'المحدبة والمقعرة' }, text: { eu: 'Ahur batek 180° baino gehiagoko angelu bat du gutxienez.', es: 'Uno cóncavo tiene al menos un ángulo de más de 180°.', en: 'A concave one has at least one angle of more than 180°.', ar: 'للمضلع المقعر زاوية واحدة على الأقل أكبر من 180°.' } }
        ],
        takeaway: {
            eu: 'Aldeak = erpinak = angeluak.',
            es: 'Lados = vértices = ángulos.',
            en: 'Sides = vertices = angles.',
            ar: 'الأضلاع = الرؤوس = الزوايا.'
        },
        figure: (language) => <PolygonFigure language={language} />
    },
    {
        id: 'triangles',
        stage: 'polygons',
        title: { eu: 'Triangeluak', es: 'Triángulos', en: 'Triangles', ar: 'المثلثات' },
        goal: {
            eu: 'Triangeluak aldeen eta angeluen arabera sailkatzea eta angeluen batura erabiltzea.',
            es: 'Clasificar triángulos según sus lados y sus ángulos y usar la suma de sus ángulos.',
            en: 'Classify triangles by their sides and their angles, and use the sum of their angles.',
            ar: 'تصنيف المثلثات حسب أضلاعها وزواياها واستعمال مجموع زواياها.'
        },
        problem: { eu: 'Triangelu baten bi angeluak 50° eta 70° dira. Zenbat da hirugarrena?', es: 'Dos ángulos de un triángulo miden 50° y 70°. ¿Cuánto mide el tercero?', en: 'Two angles of a triangle measure 50° and 70°. How big is the third one?', ar: 'زاويتان في مثلث قياسهما 50° و70°. كم قياس الثالثة؟' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Batu ezagunak.', es: 'Suma los conocidos.', en: 'Add the known angles.', ar: 'اجمع المعلومتين.' }, math: '$50^{\\circ}+70^{\\circ}=120^{\\circ}$' },
            { text: { eu: 'Kendu 180°-ri.', es: 'Réstalo de 180°.', en: 'Subtract it from 180°.', ar: 'اطرح من 180°.' }, math: '$180^{\\circ}-120^{\\circ}=60^{\\circ}$' },
            { text: { eu: 'Hiru angeluak zorrotzak dira: angelu-zorrotza da.', es: 'Los tres ángulos son agudos: es acutángulo.', en: 'All three angles are acute: it is acute-angled.', ar: 'الزوايا الثلاث حادة: إنه حاد الزوايا.' } }
        ],
        takeaway: {
            eu: 'Triangelu baten angeluak: beti 180°.',
            es: 'Los ángulos de un triángulo: siempre 180°.',
            en: 'The angles of a triangle: always 180°.',
            ar: 'زوايا المثلث: دائمًا 180°.'
        },
        figure: (language) => <TriangleSumFigure language={language} />
    },
    {
        id: 'triangle-lines',
        stage: 'polygons',
        title: { eu: 'Triangelu motak eta zuzen nabarmenak', es: 'Tipos de triángulos y rectas notables', en: 'Types of triangles and special lines', ar: 'أنواع المثلثات والمستقيمات المهمة' },
        goal: {
            eu: 'Triangelu baten altuerak, erdibidekoak, erdibitzaileak eta erdikariak ezagutzea.',
            es: 'Conocer las alturas, medianas, mediatrices y bisectrices de un triángulo.',
            en: 'Know the altitudes, medians, perpendicular bisectors and angle bisectors of a triangle.',
            ar: 'معرفة ارتفاعات المثلث ومتوسطاته ومحاوره ومنصفات زواياه.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Altuerak', es: 'Alturas', en: 'Altitudes', ar: 'الارتفاعات' }, text: { eu: 'Erpinetik aurkako aldera, perpendikular. Ortozentroa.', es: 'Del vértice al lado opuesto, perpendicular. Ortocentro.', en: 'From the vertex to the opposite side, perpendicular. Orthocentre.', ar: 'من الرأس إلى الضلع المقابل عموديًا. ملتقى الارتفاعات.' } },
            { title: { eu: 'Erdibidekoak', es: 'Medianas', en: 'Medians', ar: 'المتوسطات' }, text: { eu: 'Erpinetik aurkako aldearen erdira. Barizentroa.', es: 'Del vértice al punto medio del lado opuesto. Baricentro.', en: 'From the vertex to the midpoint of the opposite side. Centroid.', ar: 'من الرأس إلى منتصف الضلع المقابل. مركز الثقل.' } },
            { title: { eu: 'Erdibitzaileak', es: 'Mediatrices', en: 'Perpendicular bisectors', ar: 'المحاور' }, text: { eu: 'Aldearen erdian, perpendikular. Zirkunzentroa.', es: 'Perpendicular por el punto medio de cada lado. Circuncentro.', en: 'Perpendicular through the midpoint of each side. Circumcentre.', ar: 'عمودية في منتصف كل ضلع. مركز الدائرة المحيطة.' } },
            { title: { eu: 'Erdikariak', es: 'Bisectrices', en: 'Angle bisectors', ar: 'المنصفات' }, text: { eu: 'Angelua bitan banatzen dute. Inzentroa.', es: 'Dividen cada ángulo en dos iguales. Incentro.', en: 'They divide each angle into two equal parts. Incentre.', ar: 'تقسم كل زاوية إلى نصفين. مركز الدائرة الداخلية.' } }
        ],
        takeaway: {
            eu: 'Mota bakoitzeko hiru zuzenak puntu bakar batean elkartzen dira.',
            es: 'Las tres rectas de cada tipo se cortan en un único punto.',
            en: 'The three lines of each type meet at a single point.',
            ar: 'تتقاطع المستقيمات الثلاثة من كل نوع في نقطة واحدة.'
        },
        figure: (language) => <TriangleTypesFigure language={language} />
    },
    {
        id: 'quadrilaterals',
        stage: 'polygons',
        title: { eu: 'Laukiak', es: 'Cuadriláteros', en: 'Quadrilaterals', ar: 'الرباعيات' },
        goal: {
            eu: 'Laukiak sailkatzea: paralelogramoak, trapezioak eta trapezoideak.',
            es: 'Clasificar cuadriláteros: paralelogramos, trapecios y trapezoides.',
            en: 'Classify quadrilaterals: parallelograms, trapeziums and trapezoids.',
            ar: 'تصنيف الرباعيات: متوازيات الأضلاع وأشباه المنحرف والرباعيات غير المنتظمة.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Paralelogramoak', es: 'Paralelogramos', en: 'Parallelograms', ar: 'متوازيات الأضلاع' }, text: { eu: 'Karratua, laukizuzena, erronboa, erronboidea.', es: 'Cuadrado, rectángulo, rombo, romboide.', en: 'Square, rectangle, rhombus, rhomboid.', ar: 'المربع، المستطيل، المعيّن، متوازي الأضلاع.' } },
            { title: { eu: 'Trapezioak', es: 'Trapecios', en: 'Trapeziums', ar: 'أشباه المنحرف' }, text: { eu: 'Bi alde paralelo bakarrik (oinarriak).', es: 'Solo dos lados paralelos (las bases).', en: 'Only two parallel sides (the bases).', ar: 'ضلعان متوازيان فقط (القاعدتان).' } },
            { title: { eu: 'Angeluak', es: 'Ángulos', en: 'Angles', ar: 'الزوايا' }, text: { eu: 'Edozein laukitan batura 360°.', es: 'En cualquier cuadrilátero suman 360°.', en: 'In any quadrilateral they add up to 360°.', ar: 'مجموعها 360° في أي رباعي.' }, math: '$90^{\\circ}\\cdot 4=360^{\\circ}$' }
        ],
        takeaway: {
            eu: 'Karratua laukizuzena eta erronboa da aldi berean.',
            es: 'El cuadrado es a la vez rectángulo y rombo.',
            en: 'A square is both a rectangle and a rhombus.',
            ar: 'المربع مستطيل ومعيّن في الوقت نفسه.'
        },
        figure: (language) => <QuadrilateralsFigure language={language} />
    },
    {
        id: 'circle',
        stage: 'polygons',
        title: { eu: 'Zirkunferentzia eta zirkulua', es: 'Circunferencia y círculo', en: 'Circumference and circle', ar: 'الدائرة والقرص' },
        goal: {
            eu: 'Zirkunferentzia eta zirkulua bereiztea eta haien elementuak ezagutzea.',
            es: 'Distinguir circunferencia y círculo y conocer sus elementos.',
            en: 'Tell apart a circumference and a circle, and know their parts.',
            ar: 'التمييز بين الدائرة والقرص ومعرفة عناصرهما.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Diametroa', es: 'Diámetro', en: 'Diameter', ar: 'القطر' }, text: { eu: 'Erradioaren bikoitza.', es: 'El doble del radio.', en: 'Twice the radius.', ar: 'ضعف نصف القطر.' }, math: '$d=2r$' },
            { title: { eu: 'Korda eta arkua', es: 'Cuerda y arco', en: 'Chord and arc.', ar: 'الوتر والقوس' }, text: { eu: 'Korda: bi puntu lotzen dituen zuzenkia. Arkua: bi puntuen arteko zirkunferentzia-zatia.', es: 'Cuerda: segmento que une dos puntos. Arco: trozo de circunferencia entre dos puntos.', en: 'Chord: line segment that joins two points. Arc: part of the circumference between two points.', ar: 'الوتر: قطعة تصل نقطتين. القوس: جزء الدائرة بين نقطتين.' } }
        ],
        takeaway: {
            eu: 'Zirkunferentzia lerroa da; zirkulua, gainazala.',
            es: 'La circunferencia es una línea; el círculo, una superficie.',
            en: 'The circumference is a line; the circle is a surface.',
            ar: 'الدائرة خط؛ والقرص سطح.'
        },
        figure: (language) => <CircleFigure language={language} />
    },
    {
        id: 'pythagoras',
        stage: 'pythagoras',
        title: { eu: 'Pitagorasen teorema', es: 'El teorema de Pitágoras', en: 'Pythagoras\' theorem', ar: 'مبرهنة فيثاغورس' },
        goal: {
            eu: 'Pitagorasen teorema ulertzea eta triangelu bat angeluzuzena den egiaztatzea.',
            es: 'Comprender el teorema de Pitágoras y comprobar si un triángulo es rectángulo.',
            en: 'Understand Pythagoras\' theorem and check whether a triangle is right-angled.',
            ar: 'فهم مبرهنة فيثاغورس والتحقق مما إذا كان مثلث قائم الزاوية.'
        },
        needs: [{ unit: 'dbh1/zenbaki-naturalak', topic: 'powers', title: { eu: 'Berreturak', es: 'Las potencias', en: 'Powers', ar: 'القوى' } }],
        problem: { eu: 'Angeluzuzena al da 6, 8 eta 10 cm-ko aldeak dituen triangelua?', es: '¿Es rectángulo un triángulo de lados 6, 8 y 10 cm?', en: 'Is a triangle with sides 6, 8 and 10 cm right-angled?', ar: 'هل المثلث الذي أضلاعه 6 و8 و10 سم قائم الزاوية؟' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Alde luzeena hipotenusa izango litzateke: 10.', es: 'El lado más largo sería la hipotenusa: 10.', en: 'The longest side would be the hypotenuse: 10.', ar: 'الضلع الأطول سيكون الوتر: 10.' }, math: '$10^{2}=100$' },
            { text: { eu: 'Batu beste bien karratuak.', es: 'Suma los cuadrados de los otros dos.', en: 'Add the squares of the other two.', ar: 'اجمع مربعي الضلعين الآخرين.' }, math: '$6^{2}+8^{2}=36+64=100$' },
            { text: { eu: 'Berdinak dira: angeluzuzena da.', es: 'Son iguales: es rectángulo.', en: 'They are equal: it is right-angled.', ar: 'متساويان: إنه قائم الزاوية.' } }
        ],
        takeaway: {
            eu: 'Hipotenusa beti alde luzeena da, angelu zuzenaren aurrean.',
            es: 'La hipotenusa es siempre el lado más largo, frente al ángulo recto.',
            en: 'The hypotenuse is always the longest side, opposite the right angle.',
            ar: 'الوتر دائمًا الضلع الأطول، مقابل الزاوية القائمة.'
        },
        figure: (language) => <PythagorasFigure language={language} />
    },
    {
        id: 'pythagoras-use',
        stage: 'pythagoras',
        title: { eu: 'Alde bat kalkulatzea Pitagorasekin', es: 'Calcular un lado con Pitágoras', en: 'Calculate a side with Pythagoras', ar: 'حساب ضلع بفيثاغورس' },
        goal: {
            eu: 'Triangelu angeluzuzen baten hipotenusa edo katetoa kalkulatzea.',
            es: 'Calcular la hipotenusa o un cateto de un triángulo rectángulo.',
            en: 'Calculate the hypotenuse or a leg of a right-angled triangle.',
            ar: 'حساب الوتر أو ضلع قائم في مثلث قائم الزاوية.'
        },
        problem: { eu: 'Katetoak 5 cm eta 12 cm dira. Zenbat da hipotenusa?', es: 'Los catetos miden 5 cm y 12 cm. ¿Cuánto mide la hipotenusa?', en: 'The legs measure 5 cm and 12 cm. How long is the hypotenuse?', ar: 'الضلعان القائمان 5 سم و12 سم. كم طول الوتر؟' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Karratuak batu.', es: 'Suma los cuadrados.', en: 'Add the squares.', ar: 'اجمع المربعين.' }, math: '$5^{2}+12^{2}=25+144=169$' },
            { text: { eu: 'Erro karratua.', es: 'Raíz cuadrada.', en: 'Square root.', ar: 'الجذر التربيعي.' }, math: '$\\sqrt{169}=13$' },
            { text: { eu: 'Hipotenusa 13 cm da.', es: 'La hipotenusa mide 13 cm.', en: 'The hypotenuse is 13 cm.', ar: 'طول الوتر 13 سم.' } }
        ],
        takeaway: {
            eu: 'Hipotenusa: batu. Katetoa: kendu. Amaieran, erro karratua.',
            es: 'Hipotenusa: suma. Cateto: resta. Al final, raíz cuadrada.',
            en: 'Hypotenuse: add. Leg: subtract. At the end, take the square root.',
            ar: 'الوتر: اجمع. الضلع القائم: اطرح. وفي النهاية الجذر التربيعي.'
        }
    },
    {
        id: 'units',
        stage: 'perimeters',
        title: { eu: 'Luzera- eta azalera-unitateak', es: 'Unidades de longitud y superficie', en: 'Units of length and area', ar: 'وحدات الطول والمساحة' },
        goal: {
            eu: 'Luzera- eta azalera-unitateen artean aldatzea.',
            es: 'Cambiar entre unidades de longitud y de superficie.',
            en: 'Convert between units of length and of area.',
            ar: 'التحويل بين وحدات الطول والمساحة.'
        },
        needs: [{ unit: 'dbh1/numeros-decimales', topic: 'powers-of-ten', title: { eu: '10, 100 eta 1000 zenbakiez biderkatu eta zatitu', es: 'Multiplicar y dividir por 10, 100 y 1000', en: 'Multiplying and dividing by 10, 100 and 1000', ar: 'الضرب والقسمة على 10 و100 و1000' } }],
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Luzera', es: 'Longitud', en: 'Length', ar: 'الطول' }, text: { eu: 'Urrats bakoitza: × edo : 10.', es: 'Cada escalón: × o : 10.', en: 'Each step: × or : 10.', ar: 'كل درجة: × أو : 10.' }, math: dec('$3{,}5\\ \\text{m}=350\\ \\text{cm}$') },
            { title: { eu: 'Azalera', es: 'Superficie', en: 'Area', ar: 'المساحة' }, text: { eu: 'Urrats bakoitza: × edo : 100.', es: 'Cada escalón: × o : 100.', en: 'Each step: × or : 100.', ar: 'كل درجة: × أو : 100.' }, math: { eu: '$\\begin{gathered}2\\ \\text{m}^{2}\\\\=20\\,000\\ \\text{cm}^{2}\\end{gathered}$', es: '$\\begin{gathered}2\\ \\text{m}^{2}\\\\=20\\,000\\ \\text{cm}^{2}\\end{gathered}$', en: '$\\begin{gathered}2\\ \\text{m}^{2}\\\\=20\\,000\\ \\text{cm}^{2}\\end{gathered}$', ar: '$\\begin{gathered}2\\ \\text{m}^{2}\\\\=20\\,000\\ \\text{cm}^{2}\\end{gathered}$' } }
        ],
        takeaway: {
            eu: 'Luzerak: urrats bakoitzean 10. Azalerak: urrats bakoitzean 100.',
            es: 'Longitudes: de 10 en 10. Superficies: de 100 en 100.',
            en: 'Lengths: in steps of 10. Areas: in steps of 100.',
            ar: 'الأطوال: من 10 إلى 10. المساحات: من 100 إلى 100.'
        }
    },
    {
        id: 'perimeter',
        stage: 'perimeters',
        title: { eu: 'Poligonoen perimetroa', es: 'Perímetro de polígonos', en: 'Perimeter of polygons', ar: 'محيط المضلعات' },
        goal: {
            eu: 'Poligono baten perimetroa kalkulatzea.',
            es: 'Calcular el perímetro de un polígono.',
            en: 'Calculate the perimeter of a polygon.',
            ar: 'حساب محيط مضلع.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Laukizuzena', es: 'Rectángulo', en: 'Rectangle', ar: 'المستطيل' }, text: { eu: 'Bi luzera eta bi zabalera.', es: 'Dos largos y dos anchos.', en: 'Two lengths and two widths.', ar: 'طولان وعرضان.' }, math: '$\\begin{gathered}P=2\\cdot 8+2\\cdot 5\\\\=26\\end{gathered}$' },
            { title: { eu: 'Poligono erregularra', es: 'Polígono regular', en: 'Regular polygon', ar: 'المضلع المنتظم' }, text: { eu: 'Aldea bider alde kopurua: hexagonoa, 6 cm-ko aldea.', es: 'Lado por número de lados: hexágono de lado 6 cm.', en: 'Side × number of sides: hexagon with side 6 cm.', ar: 'الضلع في عدد الأضلاع: مسدس ضلعه 6 سم.' }, math: '$P=6\\cdot 6=36$' }
        ],
        takeaway: {
            eu: 'Perimetroa = alde guztiak batuta.',
            es: 'Perímetro = todos los lados sumados.',
            en: 'Perimeter = all the sides added together.',
            ar: 'المحيط = مجموع كل الأضلاع.'
        },
        figure: (language) => <PerimeterFigure language={language} />
    },
    {
        id: 'circumference',
        stage: 'perimeters',
        title: { eu: 'Zirkunferentziaren luzera', es: 'Longitud de la circunferencia', en: 'Length of the circumference', ar: 'طول الدائرة' },
        goal: {
            eu: 'Zirkunferentzia baten luzera kalkulatzea π erabiliz.',
            es: 'Calcular la longitud de una circunferencia usando π.',
            en: 'Calculate the length of a circumference using π.',
            ar: 'حساب طول دائرة باستعمال π.'
        },
        needs: [{ unit: 'dbh1/numeros-decimales', topic: 'multiply', title: { eu: 'Hamartarrak biderkatu', es: 'Multiplicar decimales', en: 'Multiplying decimals', ar: 'ضرب الأعداد العشرية' } }],
        problem: { eu: 'Kalkulatu 5 cm-ko erradioa duen zirkunferentziaren luzera.', es: 'Calcula la longitud de una circunferencia de 5 cm de radio.', en: 'Calculate the length of a circumference with a radius of 5 cm.', ar: 'احسب طول دائرة نصف قطرها 5 سم.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Idatzi formula.', es: 'Escribe la fórmula.', en: 'Write the formula.', ar: 'اكتب الصيغة.' }, math: '$L=2\\pi r$' },
            { text: { eu: 'Ordeztu: π ≈ 3,14 eta r = 5.', es: 'Sustituye: π ≈ 3,14 y r = 5.', en: 'Substitute: π ≈ 3.14 and r = 5.', ar: 'عوّض: π ≈ 3.14 وr = 5.' }, math: dec('$L=2\\cdot 3{,}14\\cdot 5=31{,}4$') },
            { text: { eu: 'Luzera 31,4 cm da gutxi gorabehera.', es: 'Mide aproximadamente 31,4 cm.', en: 'It measures about 31.4 cm.', ar: 'طولها تقريبًا 31.4 سم.' } }
        ],
        takeaway: {
            eu: 'L = 2 · π · r: erradioaren bikoitza bider π.',
            es: 'L = 2 · π · r: el doble del radio por π.',
            en: 'L = 2 · π · r: twice the radius times π.',
            ar: 'L = 2 · π · r: ضعف نصف القطر في π.'
        }
    },
    {
        id: 'area-rectangles',
        stage: 'areas',
        title: { eu: 'Paralelogramoen azalera', es: 'Área de los paralelogramos', en: 'Area of parallelograms', ar: 'مساحة متوازيات الأضلاع' },
        goal: {
            eu: 'Karratuaren, laukizuzenaren eta paralelogramoaren azalera kalkulatzea.',
            es: 'Calcular el área del cuadrado, del rectángulo y del paralelogramo.',
            en: 'Calculate the area of the square, the rectangle and the parallelogram.',
            ar: 'حساب مساحة المربع والمستطيل ومتوازي الأضلاع.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Laukizuzena', es: 'Rectángulo', en: 'Rectangle', ar: 'المستطيل' }, text: { eu: 'Oinarria · altuera.', es: 'Base · altura.', en: 'Base · height.', ar: 'القاعدة · الارتفاع.' }, math: '$A=8\\cdot 5=40$' },
            { title: { eu: 'Karratua', es: 'Cuadrado', en: 'Square', ar: 'المربع' }, text: { eu: 'Aldea · aldea.', es: 'Lado · lado.', en: 'Side · side.', ar: 'الضلع · الضلع.' }, math: '$A=6^{2}=36$' },
            { title: { eu: 'Paralelogramoa', es: 'Paralelogramo', en: 'Parallelogram', ar: 'متوازي الأضلاع' }, text: { eu: 'Oinarria · altuera (ez alde okerra).', es: 'Base · altura (no el lado inclinado).', en: 'Base · height (not the slanted side).', ar: 'القاعدة · الارتفاع (لا الضلع المائل).' }, math: '$A=10\\cdot 4=40$' }
        ],
        takeaway: {
            eu: 'Azalerak unitate karratuak ditu: cm², m².',
            es: 'El área lleva unidades cuadradas: cm², m².',
            en: 'Area uses square units: cm², m².',
            ar: 'للمساحة وحدات مربعة: سم²، م².'
        },
        figure: (language) => <AreaFigure language={language} />
    },
    {
        id: 'area-triangle',
        stage: 'areas',
        title: { eu: 'Triangeluaren, erronboaren eta trapezioaren azalera', es: 'Área del triángulo, del rombo y del trapecio', en: 'Area of the triangle, the rhombus and the trapezium', ar: 'مساحة المثلث والمعيّن وشبه المنحرف' },
        goal: {
            eu: 'Triangeluaren, erronboaren eta trapezioaren azalera kalkulatzea.',
            es: 'Calcular el área del triángulo, del rombo y del trapecio.',
            en: 'Calculate the area of the triangle, the rhombus and the trapezium.',
            ar: 'حساب مساحة المثلث والمعيّن وشبه المنحرف.'
        },
        problem: { eu: 'Kalkulatu 10 cm-ko oinarria eta 6 cm-ko altuera dituen triangeluaren azalera.', es: 'Calcula el área de un triángulo de 10 cm de base y 6 cm de altura.', en: 'Calculate the area of a triangle with a base of 10 cm and a height of 6 cm.', ar: 'احسب مساحة مثلث قاعدته 10 سم وارتفاعه 6 سم.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Oinarria bider altuera.', es: 'Base por altura.', en: 'Base times height.', ar: 'القاعدة في الارتفاع.' }, math: '$10\\cdot 6=60$' },
            { text: { eu: 'Zati bi.', es: 'Entre dos.', en: 'Divided by two.', ar: 'على اثنين.' }, math: '$60\\mathbin{:}2=30$' },
            { text: { eu: 'Azalera 30 cm² da.', es: 'El área es 30 cm².', en: 'The area is 30 cm².', ar: 'المساحة 30 سم².' } }
        ],
        takeaway: {
            eu: 'Triangelua: laukizuzenaren erdia. Ez ahaztu zati bi.',
            es: 'Triángulo: la mitad del rectángulo. No olvides dividir entre dos.',
            en: 'Triangle: half the rectangle. Don\'t forget to divide by two.',
            ar: 'المثلث: نصف المستطيل. لا تنسَ القسمة على اثنين.'
        }
    },
    {
        id: 'area-circle',
        stage: 'areas',
        title: { eu: 'Poligono erregularren eta zirkuluaren azalera', es: 'Área de polígonos regulares y del círculo', en: 'Area of regular polygons and of the circle', ar: 'مساحة المضلعات المنتظمة والقرص' },
        goal: {
            eu: 'Poligono erregular baten eta zirkulu baten azalera kalkulatzea.',
            es: 'Calcular el área de un polígono regular y la de un círculo.',
            en: 'Calculate the area of a regular polygon and of a circle.',
            ar: 'حساب مساحة مضلع منتظم ومساحة قرص.'
        },
        needs: [{ unit: 'dbh1/zenbaki-naturalak', topic: 'powers', title: { eu: 'Berreturak', es: 'Las potencias', en: 'Powers', ar: 'القوى' } }],
        problem: { eu: 'Kalkulatu 10 cm-ko erradioa duen zirkuluaren azalera.', es: 'Calcula el área de un círculo de 10 cm de radio.', en: 'Calculate the area of a circle with a radius of 10 cm.', ar: 'احسب مساحة قرص نصف قطره 10 سم.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Formula.', es: 'Fórmula.', en: 'Formula', ar: 'الصيغة.' }, math: '$A=\\pi r^{2}$' },
            { text: { eu: 'Ordeztu eta kalkulatu.', es: 'Sustituye y calcula.', en: 'Substitute and calculate.', ar: 'عوّض واحسب.' }, math: dec('$A=3{,}14\\cdot 10^{2}=314$') },
            { text: { eu: 'Azalera 314 cm² da gutxi gorabehera.', es: 'El área es aproximadamente 314 cm².', en: 'The area is about 314 cm².', ar: 'المساحة تقريبًا 314 سم².' } }
        ],
        takeaway: {
            eu: 'Zirkulua: π bider erradioa karratu (ez bikoitza).',
            es: 'Círculo: π por el radio al cuadrado (no por el doble).',
            en: 'Circle: π times the radius squared (not twice the radius).',
            ar: 'القرص: π في مربع نصف القطر (لا في ضعفه).'
        }
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const geometryIntroTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...geometryIntroLessonTexts[topic.id as GeometryIntroTopicId], ...geometryIntroLessonChecks[topic.id as GeometryIntroTopicId] }))
