import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import {
    AngleSumFigure,
    AreaProblemsFigure,
    CentersFigure,
    CircleAnglesFigure,
    CompositeFigure,
    DiagonalsFigure,
    LineCircleFigure,
    QuadAnglesFigure,
    QuadDiagonalsFigure,
    RegularAnglesFigure,
    SectorRingFigure,
    SideAngleFigure,
    SymmetryFigure,
    TriangleExistsFigure,
    TwoCirclesFigure
} from './figures'
import { figuresLessonChecks, type FiguresTopicId } from './lessonChecks'
import { figuresLessonTexts } from './lessonTexts'

/* ==========================================================================
   Irudi lauak · 1. DBH — stages and lessons. The first-year Geometria unit
   already introduces lines, angles, the kinds of polygons, Pythagoras and
   the basic area formulas; this unit goes one step further with the class
   textbooks (Santillana 1.º ESO units 10–11, Anaya units 12–13): diagonals
   and angle sums of polygons, when a triangle can be built and where its
   centres fall, the properties of the diagonals and the symmetry axes of
   quadrilaterals, the relative positions of lines and circles, central and
   inscribed angles, and the areas of compound and circular figures.
   ========================================================================== */

export type FiguresStageId = 'polygons' | 'triangles' | 'quadrilaterals' | 'circles' | 'areas'

export const figuresStages: UnitStage[] = [
    { id: 'polygons', tone: 'blue', title: { eu: 'Poligonoak: diagonalak eta angeluak', es: 'Polígonos: diagonales y ángulos', en: 'Polygons: diagonals and angles.', ar: 'المضلعات: الأقطار والزوايا' } },
    { id: 'triangles', tone: 'violet', title: { eu: 'Triangeluak', es: 'Triángulos', en: 'Triangles', ar: 'المثلثات' } },
    { id: 'quadrilaterals', tone: 'mustard', title: { eu: 'Laukiak eta simetria', es: 'Cuadriláteros y simetría', en: 'Quadrilaterals and symmetry.', ar: 'الرباعيات والتناظر' } },
    { id: 'circles', tone: 'coral', title: { eu: 'Zirkunferentzia eta posizioak', es: 'Circunferencia y posiciones', en: 'Circumference and positions.', ar: 'الدائرة والأوضاع' } },
    { id: 'areas', tone: 'green', title: { eu: 'Irudi konposatuen azalera', es: 'Áreas de figuras compuestas', en: 'Areas of compound shapes.', ar: 'مساحات الأشكال المركّبة' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Polygons ---------- */
    {
        id: 'diagonals',
        stage: 'polygons',
        title: say('Poligono baten diagonalak', 'Las diagonales de un polígono', 'أقطار المضلع', 'The diagonals of a polygon'),
        goal: say('Erpin batetik eta poligono osoan zenbat diagonal dauden kalkulatzea.', 'Calcular cuántas diagonales salen de un vértice y cuántas tiene un polígono.', 'حساب عدد الأقطار الخارجة من رأس وعدد أقطار المضلع كله.', 'Work out how many diagonals come out of a vertex and how many a polygon has.'),
        needs: [{ unit: 'dbh1/geometria', topic: 'polygons', title: { eu: 'Poligonoak', es: 'Polígonos', en: 'Polygons', ar: 'المضلعات' } }],
        problem: say('Zenbat diagonal ditu hexagono batek?', '¿Cuántas diagonales tiene un hexágono?', 'كم قطرًا للمسدس؟', 'How many diagonals does a hexagon have?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erpin batetik: $n-3$.', 'Desde un vértice: $n-3$.', 'من رأس واحد: $n-3$.', 'From one vertex: $n-3$.'), math: same('$6-3=3$') },
            { text: say('Erpin guztietatik, zati bi.', 'Desde todos los vértices, entre dos.', 'من كل الرؤوس، على اثنين.', 'From all the vertices, then divide by two.'), math: same('$\\frac{6\\cdot 3}{2}=9$') }
        ],
        takeaway: say('Diagonalak: $\\frac{n\\cdot(n-3)}{2}$. Zati bi, bakoitza bi aldiz zenbatzen delako.', 'Diagonales: $\\frac{n\\cdot(n-3)}{2}$. Entre dos, porque cada una se cuenta dos veces.', 'الأقطار: $\\frac{n\\cdot(n-3)}{2}$. على اثنين لأن كل قطر يُحسب مرتين.', 'Diagonals: $\\frac{n\\cdot(n-3)}{2}$. Divide by two, because each one is counted twice.'),
        figureAfterSteps: true,
        figure: (language) => <DiagonalsFigure language={language} />
    },
    {
        id: 'angle-sum',
        stage: 'polygons',
        title: say('Barne-angeluen batura', 'La suma de los ángulos interiores', 'مجموع الزوايا الداخلية', 'The sum of the interior angles'),
        goal: say('Poligono baten barne-angeluen batura kalkulatzea eta falta den angelu bat aurkitzea.', 'Calcular la suma de los ángulos interiores de un polígono y hallar un ángulo que falta.', 'حساب مجموع الزوايا الداخلية للمضلع وإيجاد زاوية ناقصة.', 'Work out the sum of the interior angles of a polygon and find a missing angle.'),
        needs: [{ unit: 'dbh1/geometria', topic: 'triangles', title: { eu: 'Triangeluak', es: 'Triángulos', en: 'Triangles', ar: 'المثلثات' } }],
        problem: say('Pentagono baten lau angeluak $100^{\\circ}$, $110^{\\circ}$, $120^{\\circ}$ eta $95^{\\circ}$ dira. Zenbat da bosgarrena?', 'Cuatro ángulos de un pentágono miden $100^{\\circ}$, $110^{\\circ}$, $120^{\\circ}$ y $95^{\\circ}$. ¿Cuánto mide el quinto?', 'أربع زوايا من مخمس قياساتها $100^{\\circ}$ و$110^{\\circ}$ و$120^{\\circ}$ و$95^{\\circ}$. كم قياس الخامسة؟', 'Four angles of a pentagon measure $100^{\\circ}$, $110^{\\circ}$, $120^{\\circ}$ and $95^{\\circ}$. What is the fifth angle?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batura osoa: $n-2$ triangelu.', 'La suma total: $n-2$ triángulos.', 'المجموع الكلي: $n-2$ مثلثات.', 'The total sum: $n-2$ triangles.'), math: same('$(5-2)\\cdot 180^{\\circ}=540^{\\circ}$') },
            { text: say('Batu ezagunak.', 'Suma los conocidos.', 'اجمع الزوايا المعلومة.', 'Add the known angles.'), math: same('$100^{\\circ}+110^{\\circ}+120^{\\circ}+95^{\\circ}=425^{\\circ}$') },
            { text: say('Kendu.', 'Resta.', 'اطرح.', 'Subtract.'), math: same('$540^{\\circ}-425^{\\circ}=115^{\\circ}$') }
        ],
        takeaway: say('Barne-angeluen batura: $(n-2)\\cdot 180^{\\circ}$.', 'Suma de los ángulos interiores: $(n-2)\\cdot 180^{\\circ}$.', 'مجموع الزوايا الداخلية: $(n-2)\\cdot 180^{\\circ}$.', 'Sum of the interior angles: $(n-2)\\cdot 180^{\\circ}$.'),
        figure: (language) => <AngleSumFigure language={language} />
    },
    {
        id: 'regular-angles',
        stage: 'polygons',
        title: say('Poligono erregularren angeluak', 'Los ángulos de los polígonos regulares', 'زوايا المضلعات المنتظمة', 'The angles of regular polygons'),
        goal: say('Poligono erregular baten barne-angelua eta angelu zentrala kalkulatzea, eta zein poligonok lauzatzen duten jakitea.', 'Calcular el ángulo interior y el ángulo central de un polígono regular y saber qué polígonos embaldosan.', 'حساب الزاوية الداخلية والزاوية المركزية لمضلع منتظم ومعرفة المضلعات التي تُبلِّط.', 'Work out the interior angle and the central angle of a regular polygon, and know which polygons tile.'),
        problem: say('Kalkulatu hexagono erregularraren barne-angelua eta angelu zentrala.', 'Calcula el ángulo interior y el ángulo central del hexágono regular.', 'احسب الزاوية الداخلية والزاوية المركزية للمسدس المنتظم.', 'Work out the interior angle and the central angle of a regular hexagon.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batura, zati 6.', 'La suma, entre 6.', 'المجموع على 6.', 'The sum divided by 6.'), math: same('$\\frac{(6-2)\\cdot 180^{\\circ}}{6}=\\frac{720^{\\circ}}{6}=120^{\\circ}$') },
            { text: say('Angelu zentrala: $360^{\\circ}$ zati 6.', 'Ángulo central: $360^{\\circ}$ entre 6.', 'الزاوية المركزية: $360^{\\circ}$ على 6.', 'Central angle: $360^{\\circ}$ divided by 6.'), math: same('$\\frac{360^{\\circ}}{6}=60^{\\circ}$') },
            { text: say('Hiru hexagono erpin batean: lauzatzen du.', 'Tres hexágonos en un vértice: embaldosa.', 'ثلاثة مسدسات عند رأس: يُبلِّط.', 'Three hexagons at a vertex: they tile.'), math: same('$3\\cdot 120^{\\circ}=360^{\\circ}$') }
        ],
        takeaway: say('Barne-angelua: $\\frac{(n-2)\\cdot 180^{\\circ}}{n}$. Angelu zentrala: $\\frac{360^{\\circ}}{n}$.', 'Ángulo interior: $\\frac{(n-2)\\cdot 180^{\\circ}}{n}$. Ángulo central: $\\frac{360^{\\circ}}{n}$.', 'الزاوية الداخلية: $\\frac{(n-2)\\cdot 180^{\\circ}}{n}$. الزاوية المركزية: $\\frac{360^{\\circ}}{n}$.', 'Interior angle: $\\frac{(n-2)\\cdot 180^{\\circ}}{n}$. Central angle: $\\frac{360^{\\circ}}{n}$.'),
        figureAfterSteps: true,
        figure: (language) => <RegularAnglesFigure language={language} />
    },

    /* ---------- 2. Triangles ---------- */
    {
        id: 'triangle-exists',
        stage: 'triangles',
        title: say('Noiz eraiki daiteke triangelu bat?', '¿Cuándo se puede construir un triángulo?', 'متى يمكن إنشاء مثلث؟', 'When can you build a triangle?'),
        goal: say('Hiru zuzenkirekin edo bi angelurekin triangelu bat eraiki daitekeen erabakitzea.', 'Decidir si con tres segmentos o con dos ángulos se puede construir un triángulo.', 'تحديد ما إذا كان يمكن إنشاء مثلث بثلاث قطع أو بزاويتين.', 'Decide whether a triangle can be built from three segments or from two angles.'),
        needs: [{ unit: 'dbh1/geometria', topic: 'triangles', title: { eu: 'Triangeluak', es: 'Triángulos', en: 'Triangles', ar: 'المثلثات' } }],
        problem: say('Triangelu bat eraiki daiteke 4, 6 eta 11 cm-ko zuzenkiekin?', '¿Se puede construir un triángulo con segmentos de 4, 6 y 11 cm?', 'هل يمكن إنشاء مثلث بقطع أطوالها 4 و6 و11 سم؟', 'Can you build a triangle with segments of 4, 6 and 11 cm?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Alde handiena: 11.', 'El lado mayor: 11.', 'الضلع الأكبر: 11.', 'The longest side: 11.') },
            { text: say('Batu beste biak.', 'Suma los otros dos.', 'اجمع الآخرين.', 'Add the other two.'), math: same('$4+6=10$') },
            { text: say('$11>10$: ez da eraikitzen.', '$11>10$: no se puede construir.', '$11>10$: لا يمكن إنشاؤه.', '$11>10$: it cannot be built.') }
        ],
        takeaway: say('Alde handiena < beste bien batura. Bi angelu < $180^{\\circ}$.', 'Lado mayor < suma de los otros dos. Dos ángulos < $180^{\\circ}$.', 'الضلع الأكبر < مجموع الآخرين. زاويتان < $180^{\\circ}$.', 'Longest side < sum of the other two. Two angles < $180^{\\circ}$.'),
        figure: (language) => <TriangleExistsFigure language={language} />
    },
    {
        id: 'side-angle',
        stage: 'triangles',
        title: say('Aldeak eta angeluak', 'Lados y ángulos', 'الأضلاع والزوايا', 'Sides and angles'),
        goal: say('Alde handienaren aurrean angelu handiena dagoela jakitea eta triangelu isoszeleen angeluak kalkulatzea.', 'Saber que frente al lado mayor está el ángulo mayor y calcular los ángulos de un triángulo isósceles.', 'معرفة أن الزاوية الكبرى تقابل الضلع الأكبر وحساب زوايا المثلث المتساوي الساقين.', 'Know that the largest angle is opposite the longest side, and work out the angles of an isosceles triangle.'),
        needs: [{ unit: 'dbh1/geometria', topic: 'triangles', title: { eu: 'Triangeluak', es: 'Triángulos', en: 'Triangles', ar: 'المثلثات' } }],
        problem: say('Triangelu isoszele baten erpineko angelua $40^{\\circ}$ da. Zenbat da oinarriko angelu bakoitza?', 'El ángulo desigual de un triángulo isósceles mide $40^{\\circ}$. ¿Cuánto mide cada ángulo de la base?', 'زاوية الرأس في مثلث متساوي الساقين $40^{\\circ}$. كم قياس كل زاوية من زاويتي القاعدة؟', 'The unequal angle of an isosceles triangle measures $40^{\\circ}$. What is each base angle?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kendu $180^{\\circ}$-ri.', 'Réstalo de $180^{\\circ}$.', 'اطرحها من $180^{\\circ}$.', 'Subtract it from $180^{\\circ}$.'), math: same('$180^{\\circ}-40^{\\circ}=140^{\\circ}$') },
            { text: say('Bi angelu berdin: zati bi.', 'Dos ángulos iguales: entre dos.', 'زاويتان متساويتان: على اثنين.', 'Two equal angles: divide by two.'), math: same('$140^{\\circ}\\mathbin{:}2=70^{\\circ}$') }
        ],
        takeaway: say('Alde handiena ↔ angelu handiena. Alde berdinak ↔ angelu berdinak.', 'Lado mayor ↔ ángulo mayor. Lados iguales ↔ ángulos iguales.', 'الضلع الأكبر ↔ الزاوية الكبرى. أضلاع متساوية ↔ زوايا متساوية.', 'Longest side ↔ largest angle. Equal sides ↔ equal angles.'),
        figure: (language) => <SideAngleFigure language={language} />
    },
    {
        id: 'centers',
        stage: 'triangles',
        title: say('Puntu nabarmenak eta zirkunferentziak', 'Puntos notables y circunferencias', 'النقاط المهمة والدوائر', 'Special points and circles'),
        goal: say('Zirkunferentzia zirkunskribatua eta inskribatua ezagutzea eta puntu nabarmenak non dauden jakitea triangelu motaren arabera.', 'Conocer las circunferencias circunscrita e inscrita y saber dónde caen los puntos notables según el tipo de triángulo.', 'معرفة الدائرتين المحيطة والداخلية ومعرفة مواقع النقاط المهمة حسب نوع المثلث.', 'Know the circumscribed and inscribed circles, and know where the special points fall depending on the type of triangle.'),
        needs: [{ unit: 'dbh1/geometria', topic: 'triangle-lines', title: { eu: 'Triangelu motak eta zuzen nabarmenak', es: 'Tipos de triángulos y rectas notables', en: 'Types of triangles and special lines', ar: 'أنواع المثلثات والمستقيمات المهمة' } }],
        stepsKind: 'facts',
        steps: [
            { title: say('Zirkunzentroa', 'Circuncentro', 'مركز الدائرة المحيطة', 'Circumcentre'), text: say('Erdibitzaileak. Erpinetatik pasatzen den zirkunferentzia.', 'Mediatrices. Circunferencia que pasa por los vértices.', 'المحاور. دائرة تمر بالرؤوس.', 'Perpendicular bisectors. A circle that passes through the vertices.') },
            { title: say('Inzentroa', 'Incentro', 'مركز الدائرة الداخلية', 'Incentre'), text: say('Erdikariak. Aldeak ukitzen dituen zirkunferentzia.', 'Bisectrices. Circunferencia que toca los lados.', 'المنصفات. دائرة تمس الأضلاع.', 'Angle bisectors. A circle that touches the sides.') },
            { title: say('Non dago?', '¿Dónde cae?', 'أين يقع؟', 'Where does it lie?'), text: say('Zorrotza: barruan. Zuzena: hipotenusan. Kamutsa: kanpoan.', 'Acutángulo: dentro. Rectángulo: en la hipotenusa. Obtusángulo: fuera.', 'حاد: داخله. قائم: على الوتر. منفرج: خارجه.', 'Acute-angled: inside. Right-angled: on the hypotenuse. Obtuse-angled: outside.') }
        ],
        takeaway: say('Zirkunskribatua erpinetatik; inskribatua aldeak ukituz.', 'Circunscrita, por los vértices; inscrita, tocando los lados.', 'المحيطة تمر بالرؤوس؛ والداخلية تمس الأضلاع.', 'Circumscribed, through the vertices; inscribed, touching the sides.'),
        figure: (language) => <CentersFigure language={language} />
    },

    /* ---------- 3. Quadrilaterals and symmetry ---------- */
    {
        id: 'quad-diagonals',
        stage: 'quadrilaterals',
        title: say('Laukien diagonalak', 'Las diagonales de los cuadriláteros', 'أقطار الرباعيات', 'The diagonals of quadrilaterals'),
        goal: say('Lauki bat bere diagonalen propietateen bidez ezagutzea.', 'Reconocer un cuadrilátero por las propiedades de sus diagonales.', 'التعرّف إلى الرباعي من خصائص قطريه.', 'Recognise a quadrilateral from the properties of its diagonals.'),
        needs: [{ unit: 'dbh1/geometria', topic: 'quadrilaterals', title: { eu: 'Laukiak', es: 'Cuadriláteros', en: 'Quadrilaterals', ar: 'الرباعيات' } }],
        stepsKind: 'facts',
        steps: [
            { title: say('Erdian ebakitzen dira', 'Se cortan en el punto medio', 'ينصّف كلٌّ منهما الآخر', 'They cut each other at the midpoint.'), text: say('Paralelogramo guztiak.', 'Todos los paralelogramos.', 'كل متوازيات الأضلاع.', 'All parallelograms.') },
            { title: say('Berdinak', 'Iguales', 'متساويان', 'Equal'), text: say('Laukizuzena, karratua eta trapezio isoszelea.', 'Rectángulo, cuadrado y trapecio isósceles.', 'المستطيل والمربع وشبه المنحرف المتساوي الساقين.', 'Rectangle, square and isosceles trapezium.') },
            { title: say('Perpendikularrak', 'Perpendiculares', 'متعامدان', 'Perpendicular'), text: say('Erronboa, karratua eta kometa.', 'Rombo, cuadrado y cometa.', 'المعيّن والمربع والطائرة الورقية.', 'Rhombus, square and kite.') }
        ],
        takeaway: say('Erdian: paralelogramoa. Berdinak: laukizuzena. Perpendikularrak: erronboa. Biak: karratua.', 'Punto medio: paralelogramo. Iguales: rectángulo. Perpendiculares: rombo. Las dos: cuadrado.', 'التنصيف: متوازي أضلاع. التساوي: مستطيل. التعامد: معيّن. الاثنان: مربع.', 'Midpoint: parallelogram. Equal: rectangle. Perpendicular: rhombus. Both: square.'),
        figure: (language) => <QuadDiagonalsFigure language={language} />
    },
    {
        id: 'quad-angles',
        stage: 'quadrilaterals',
        title: say('Laukien angeluak', 'Los ángulos de los cuadriláteros', 'زوايا الرباعيات', 'The angles of quadrilaterals'),
        goal: say('Paralelogramo eta trapezioetan falta diren angeluak kalkulatzea.', 'Calcular los ángulos que faltan en paralelogramos y trapecios.', 'حساب الزوايا الناقصة في متوازيات الأضلاع وأشباه المنحرف.', 'Calculate the missing angles in parallelograms and trapeziums.'),
        needs: [{ unit: 'dbh1/geometria', topic: 'angle-pairs', title: { eu: 'Angelu osagarriak eta betegarriak', es: 'Ángulos complementarios y suplementarios', en: 'Complementary and supplementary angles', ar: 'الزوايا المتتامة والمتكاملة' } }],
        problem: say('Erronboide baten angelu bat $65^{\\circ}$ da. Zenbat dira besteak?', 'Un ángulo de un romboide mide $65^{\\circ}$. ¿Cuánto miden los otros?', 'زاوية في متوازي أضلاع قياسها $65^{\\circ}$. كم قياس الأخريات؟', 'One angle of a rhomboid measures $65^{\\circ}$. How big are the other angles?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Aurkakoa, berdina.', 'El opuesto, igual.', 'المقابلة مساوية.', 'The opposite one is equal.'), math: same('$65^{\\circ}$') },
            { text: say('Ondokoak, betegarriak.', 'Los consecutivos, suplementarios.', 'المتتاليتان متكاملتان.', 'The consecutive ones are supplementary.'), math: same('$180^{\\circ}-65^{\\circ}=115^{\\circ}$') },
            { text: say('Egiaztatu batura.', 'Comprueba la suma.', 'تحقّق من المجموع.', 'Check the sum.'), math: same('$65^{\\circ}+115^{\\circ}+65^{\\circ}+115^{\\circ}=360^{\\circ}$') }
        ],
        takeaway: say('Paralelogramoa: aurkakoak berdinak, ondokoek $180^{\\circ}$.', 'Paralelogramo: opuestos iguales, consecutivos suman $180^{\\circ}$.', 'متوازي الأضلاع: المتقابلة متساوية والمتتالية مجموعها $180^{\\circ}$.', 'Parallelogram: opposite angles equal, consecutive ones add up to $180^{\\circ}$.'),
        figure: (language) => <QuadAnglesFigure language={language} />
    },
    {
        id: 'symmetry',
        stage: 'quadrilaterals',
        title: say('Simetria-ardatzak', 'Ejes de simetría', 'محاور التناظر', 'Lines of symmetry'),
        goal: say('Irudi lau baten simetria-ardatzak aurkitzea eta zenbatzea.', 'Encontrar y contar los ejes de simetría de una figura plana.', 'إيجاد محاور تناظر شكل مستوٍ وعدّها.', 'Find and count the lines of symmetry of a plane shape.'),
        problem: say('Zenbat simetria-ardatz ditu pentagono erregular batek, eta zer angelu eratzen dute ondoz ondoko bik?', '¿Cuántos ejes de simetría tiene un pentágono regular y qué ángulo forman dos contiguos?', 'كم محور تناظر للمخمس المنتظم، وما الزاوية بين محورين متجاورين؟', 'How many lines of symmetry does a regular pentagon have, and what angle do two adjacent ones form?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Poligono erregularra: $n$ ardatz.', 'Polígono regular: $n$ ejes.', 'مضلع منتظم: $n$ محاور.', 'Regular polygon: $n$ lines of symmetry.'), math: same('$5$') },
            { text: say('Ardatzek $180^{\\circ}$ banatzen dute.', 'Los ejes se reparten $180^{\\circ}$.', 'تتقاسم المحاور $180^{\\circ}$.', 'The lines share $180^{\\circ}$ between them.'), math: same('$180^{\\circ}\\mathbin{:}5=36^{\\circ}$') }
        ],
        takeaway: say('Erregularra: $n$ ardatz, $\\frac{180^{\\circ}}{n}$-ko tartearekin.', 'Regular: $n$ ejes, separados $\\frac{180^{\\circ}}{n}$.', 'المنتظم: $n$ محاور، بينها $\\frac{180^{\\circ}}{n}$.', 'Regular: $n$ lines of symmetry, separated by $\\frac{180^{\\circ}}{n}$.'),
        figureAfterSteps: true,
        figure: (language) => <SymmetryFigure language={language} />
    },

    /* ---------- 4. Circle and positions ---------- */
    {
        id: 'line-circle',
        stage: 'circles',
        title: say('Zuzena eta zirkunferentzia', 'Recta y circunferencia', 'المستقيم والدائرة', 'Straight line and circle'),
        goal: say('Zuzen baten eta zirkunferentzia baten posizio erlatiboa zentrorako distantziaren bidez erabakitzea.', 'Decidir la posición relativa de una recta y una circunferencia con la distancia al centro.', 'تحديد الوضع النسبي لمستقيم ودائرة بواسطة البعد عن المركز.', 'Work out how a straight line and a circle are positioned relative to each other, using the distance to the centre.'),
        needs: [{ unit: 'dbh1/geometria', topic: 'circle', title: { eu: 'Zirkunferentzia eta zirkulua', es: 'Circunferencia y círculo', en: 'Circumference and circle', ar: 'الدائرة والقرص' } }],
        problem: say('Zirkunferentzia baten erradioa 5 cm da. Nolakoak dira zentrotik 3 cm, 5 cm eta 8 cm-ra dauden zuzenak?', 'Una circunferencia tiene 5 cm de radio. ¿Cómo son las rectas que pasan a 3 cm, 5 cm y 8 cm del centro?', 'نصف قطر دائرة 5 سم. كيف تكون المستقيمات التي تبعد عن المركز 3 سم و5 سم و8 سم؟', 'A circle has a radius of 5 cm. What kind of straight lines are 3 cm, 5 cm and 8 cm from the centre?'),
        stepsKind: 'steps',
        steps: [
            { text: say('3 < 5: ebakitzailea.', '3 < 5: secante.', '3 < 5: قاطع.', '3 < 5: secant.') },
            { text: say('5 = 5: ukitzailea.', '5 = 5: tangente.', '5 = 5: مماس.', '5 = 5: tangent.') },
            { text: say('8 > 5: kanpokoa.', '8 > 5: exterior.', '8 > 5: خارجي.', '8 > 5: external.') }
        ],
        takeaway: say('$d<r$ ebakitzailea, $d=r$ ukitzailea, $d>r$ kanpokoa.', '$d<r$ secante, $d=r$ tangente, $d>r$ exterior.', '$d<r$ قاطع، $d=r$ مماس، $d>r$ خارجي.', '$d<r$ secant, $d=r$ tangent, $d>r$ external.'),
        figure: (language) => <LineCircleFigure language={language} />
    },
    {
        id: 'two-circles',
        stage: 'circles',
        title: say('Bi zirkunferentziaren posizioak', 'Posiciones de dos circunferencias', 'أوضاع دائرتين', 'Positions of two circles'),
        goal: say('Bi zirkunferentziaren posizio erlatiboa zentroen arteko distantziaz eta erradioez erabakitzea.', 'Decidir la posición relativa de dos circunferencias con la distancia entre centros y los radios.', 'تحديد الوضع النسبي لدائرتين بالبعد بين المركزين ونصفي القطرين.', 'Work out how two circles are positioned relative to each other, using the distance between their centres and their radii.'),
        needs: [{ unit: 'dbh1/geometria', topic: 'circle', title: { eu: 'Zirkunferentzia eta zirkulua', es: 'Circunferencia y círculo', en: 'Circumference and circle', ar: 'الدائرة والقرص' } }],
        problem: say('Bi zirkunferentziaren erradioak 7 cm eta 4 cm dira, eta zentroak 10 cm-ra daude. Nolakoak dira?', 'Dos circunferencias tienen radios de 7 cm y 4 cm, y sus centros están a 10 cm. ¿Cómo son?', 'نصفا قطري دائرتين 7 سم و4 سم، والبعد بين مركزيهما 10 سم. كيف هما؟', 'Two circles have radii of 7 cm and 4 cm, and their centres are 10 cm apart. How are they positioned?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batura eta kendura.', 'La suma y la resta.', 'المجموع والفرق.', 'The sum and the difference.'), math: same('$7+4=11\\qquad 7-4=3$') },
            { text: say('Konparatu $d$.', 'Compara $d$.', 'قارن $d$.', 'Compare $d$.'), math: same('$3<10<11$') },
            { text: say('Ebakitzaileak dira.', 'Son secantes.', 'هما متقاطعتان.', 'They are secant.') }
        ],
        takeaway: say('Konparatu $d$ honekin: $r_1+r_2$ eta $r_1-r_2$.', 'Compara $d$ con $r_1+r_2$ y con $r_1-r_2$.', 'قارن $d$ بـ$r_1+r_2$ وبـ$r_1-r_2$.', 'Compare $d$ with $r_1+r_2$ and with $r_1-r_2$.'),
        figure: (language) => <TwoCirclesFigure language={language} />
    },
    {
        id: 'circle-angles',
        stage: 'circles',
        title: say('Angeluak zirkunferentzian eta irudi zirkularrak', 'Ángulos en la circunferencia y figuras circulares', 'الزوايا في الدائرة والأشكال الدائرية', 'Angles in a circle and circular shapes'),
        goal: say('Angelu zentrala eta inskribatua bereiztea eta irudi zirkularrak izendatzea.', 'Distinguir el ángulo central y el inscrito y nombrar las figuras circulares.', 'التمييز بين الزاوية المركزية والمحيطية وتسمية الأشكال الدائرية.', 'Distinguish between the central angle and the inscribed angle, and name the circular shapes.'),
        needs: [{ unit: 'dbh1/geometria', topic: 'circle', title: { eu: 'Zirkunferentzia eta zirkulua', es: 'Circunferencia y círculo', en: 'Circumference and circle', ar: 'الدائرة والقرص' } }],
        problem: say('Angelu inskribatu batek $35^{\\circ}$ ditu. Zenbat ditu arku bera hartzen duen angelu zentralak?', 'Un ángulo inscrito mide $35^{\\circ}$. ¿Cuánto mide el central que abarca el mismo arco?', 'زاوية محيطية قياسها $35^{\\circ}$. كم قياس الزاوية المركزية التي تحصر القوس نفسه؟', 'An inscribed angle measures $35^{\\circ}$. How big is the central angle that spans the same arc?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zentrala inskribatuaren bikoitza da.', 'El central es el doble del inscrito.', 'المركزية ضعف المحيطية.', 'The central angle is twice the inscribed angle.'), math: same('$2\\cdot 35^{\\circ}=70^{\\circ}$') }
        ],
        takeaway: say('Inskribatua = zentrala : 2. Diametroaren gainean: $90^{\\circ}$.', 'Inscrito = central : 2. Sobre un diámetro: $90^{\\circ}$.', 'المحيطية = المركزية : 2. على قطر: $90^{\\circ}$.', 'Inscribed = central : 2. On a diameter: $90^{\\circ}$.'),
        figure: (language) => <CircleAnglesFigure language={language} />
    },

    /* ---------- 5. Areas of compound figures ---------- */
    {
        id: 'composite',
        stage: 'areas',
        title: say('Irudi konposatuak', 'Figuras compuestas', 'الأشكال المركّبة', 'Composite shapes'),
        goal: say('Irudi konposatu baten azalera irudi ezagunetan zatituz edo kenduz kalkulatzea.', 'Calcular el área de una figura compuesta descomponiéndola en figuras conocidas o restando.', 'حساب مساحة شكل مركّب بتقسيمه إلى أشكال معروفة أو بالطرح.', 'Calculate the area of a composite shape by splitting it into known shapes or by subtracting.'),
        needs: [{ unit: 'dbh1/geometria', topic: 'area-rectangles', title: { eu: 'Paralelogramoen azalera', es: 'Área de los paralelogramos', en: 'Area of parallelograms', ar: 'مساحة متوازيات الأضلاع' } }],
        problem: say('L forma: 10 × 6 cm-ko laukizuzen bati 4 × 3 cm-ko laukizuzen bat kendu zaio izkina batean. Zein da azalera?', 'Una L: a un rectángulo de 10 × 6 cm se le ha quitado un rectángulo de 4 × 3 cm en una esquina. ¿Cuál es el área?', 'شكل L: أُزيل من مستطيل 10 × 6 سم مستطيل 4 × 3 سم في ركن. ما المساحة؟', 'An L-shape: a rectangle of 10 × 6 cm has had a 4 × 3 cm rectangle taken from one corner. What is the area?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Laukizuzen osoa.', 'El rectángulo entero.', 'المستطيل كاملًا.', 'The whole rectangle.'), math: same('$10\\cdot 6=60$') },
            { text: say('Kendutako zatia.', 'El trozo quitado.', 'القطعة المزالة.', 'The piece removed.'), math: same('$4\\cdot 3=12$') },
            { text: say('Kendu: 48 cm².', 'Resta: 48 cm².', 'اطرح: 48 سم².', 'Subtract: 48 cm².'), math: same('$60-12=48$') }
        ],
        takeaway: say('Zatitu eta batu, edo osatu eta kendu.', 'Divide y suma, o completa y resta.', 'قسّم واجمع، أو أكمل واطرح.', 'Split and add, or complete and subtract.'),
        figureAfterSteps: true,
        figure: (language) => <CompositeFigure language={language} />
    },
    {
        id: 'sector-ring',
        stage: 'areas',
        title: say('Arkua, sektorea eta koroa', 'Arco, sector y corona', 'القوس والقطاع والحلقة', 'Arc, sector and annulus'),
        goal: say('Arku baten luzera eta sektore eta koroa zirkular baten azalera kalkulatzea.', 'Calcular la longitud de un arco y el área de un sector y de una corona circular.', 'حساب طول قوس ومساحة قطاع وحلقة دائرية.', 'Calculate the length of an arc and the area of a sector and of an annulus.'),
        needs: [{ unit: 'dbh1/geometria', topic: 'area-circle', title: { eu: 'Poligono erregularren eta zirkuluaren azalera', es: 'Área de polígonos regulares y del círculo', en: 'Area of regular polygons and of the circle', ar: 'مساحة المضلعات المنتظمة والقرص' } }],
        problem: say('Kalkulatu 10 cm-ko erradioa eta $90^{\\circ}$-ko angelua dituen sektorearen azalera.', 'Calcula el área de un sector de 10 cm de radio y $90^{\\circ}$.', 'احسب مساحة قطاع نصف قطره 10 سم وزاويته $90^{\\circ}$.', 'Calculate the area of a sector with a radius of 10 cm and an angle of $90^{\\circ}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zirkulu osoa.', 'El círculo entero.', 'القرص كاملًا.', 'The whole circle.'), math: same('$3{,}14\\cdot 10^{2}=314$') },
            { text: say('$90^{\\circ}$ laurdena da.', '$90^{\\circ}$ es un cuarto.', '$90^{\\circ}$ ربع.', '$90^{\\circ}$ is a quarter.'), math: same('$\\frac{314\\cdot 90}{360}=78{,}5$') }
        ],
        takeaway: say('Sektorea eta arkua: zati $\\frac{\\alpha}{360}$. Koroa: $\\pi\\cdot(R^{2}-r^{2})$.', 'Sector y arco: la parte $\\frac{\\alpha}{360}$. Corona: $\\pi\\cdot(R^{2}-r^{2})$.', 'القطاع والقوس: الجزء $\\frac{\\alpha}{360}$. الحلقة: $\\pi\\cdot(R^{2}-r^{2})$.', 'Sector and arc: the fraction $\\frac{\\alpha}{360}$. Annulus: $\\pi\\cdot(R^{2}-r^{2})$.'),
        figure: (language) => <SectorRingFigure language={language} />
    },
    {
        id: 'area-problems',
        stage: 'areas',
        title: say('Azalera- eta perimetro-problemak', 'Problemas de áreas y perímetros', 'مسائل المساحات والمحيطات', 'Area and perimeter problems'),
        goal: say('Eguneroko problemak ebaztea: azalera edo perimetroa behar den erabakiz.', 'Resolver problemas cotidianos decidiendo si hace falta el área o el perímetro.', 'حلّ مسائل يومية بتحديد ما إذا كانت تحتاج إلى المساحة أم المحيط.', 'Solve everyday problems by deciding whether you need the area or the perimeter.'),
        needs: [{ unit: 'dbh1/geometria', topic: 'perimeter', title: { eu: 'Poligonoen perimetroa', es: 'Perímetro de polígonos', en: 'Perimeter of polygons', ar: 'محيط المضلعات' } }],
        problem: say('5 m × 4 m-ko gela bat 50 cm-ko aldeko lauza karratuekin lauzatu nahi da. Zenbat lauza behar dira?', 'Se quiere embaldosar una habitación de 5 m × 4 m con baldosas cuadradas de 50 cm de lado. ¿Cuántas baldosas hacen falta?', 'نريد تبليط غرفة 5 م × 4 م ببلاطات مربعة طول ضلعها 50 سم. كم بلاطة نحتاج؟', 'You want to tile a room measuring 5 m × 4 m with square tiles of side 50 cm. How many tiles do you need?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Gelaren azalera.', 'El área de la habitación.', 'مساحة الغرفة.', 'The area of the room.'), math: same('$5\\cdot 4=20\\ \\text{m}^{2}$') },
            { text: say('Lauza baten azalera, m²-tan.', 'El área de una baldosa, en m².', 'مساحة البلاطة بالمتر المربع.', 'The area of one tile, in m².'), math: same('$0{,}5\\cdot 0{,}5=0{,}25\\ \\text{m}^{2}$') },
            { text: say('Zatitu.', 'Divide.', 'اقسم.', 'Divide.'), math: same('$20\\mathbin{:}0{,}25=80$') }
        ],
        takeaway: say('Inguratu: perimetroa. Estali: azalera. Unitate berean!', 'Rodear: perímetro. Cubrir: área. ¡En la misma unidad!', 'الإحاطة: المحيط. التغطية: المساحة. بالوحدة نفسها!', 'Go round: perimeter. Cover: area. Use the same unit!'),
        figureAfterSteps: true,
        figure: (language) => <AreaProblemsFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const figuresTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...figuresLessonTexts[topic.id as FiguresTopicId], ...figuresLessonChecks[topic.id as FiguresTopicId] }))
