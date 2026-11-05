import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { AngleSumFigure, SectorRingFigure } from '../dbh1-figurak-v2/figures'
import { PrismAreaFigure, PrismVolumeFigure, PyramidAreaFigure, PyramidVolumeFigure, ConeFigure } from '../dbh2-gorputzak-v2/figures'
import { ClassifyFigure, FormulaFigure, IsoscelesHeightFigure, LadderFigure } from '../dbh2-pitagoras-v2/figures'
import { CompositeAreasFigure, CompoundSolidFigure, PerimeterFigure, PolygonAreasFigure } from './figures'
import { areasVolumesLessonChecks, type AreasVolumesTopicId } from './lessonChecks'
import { areasVolumesLessonTexts } from './lessonTexts'

/* ==========================================================================
   Perimetroak, azalerak eta bolumenak · 4. DBH aplikatuak — stages and
   lessons, following Santillana Aplicadas 4, unit 5 (polygons, triangles,
   Pythagoras, circle, perimeters and areas, solids, areas and volumes)
   and the practical problems of Anaya Aplicadas 4, unit 10 (ladders,
   towers, tanks, wells, cone roofs, compound bodies). It reviews and joins
   what 1. and 2. DBH split in several units, so the lessons lean on
   solving real problems. π ≈ 3,14.
   ========================================================================== */

export type AreasVolumesStageId = 'polygons' | 'pythagoras' | 'plane-areas' | 'solid-areas' | 'volumes'

export const areasVolumesStages: UnitStage[] = [
    { id: 'polygons', tone: 'blue', title: { eu: 'Poligonoak eta perimetroak', es: 'Polígonos y perímetros', en: 'Polygons and perimeters', ar: 'المضلعات والمحيطات' } },
    { id: 'pythagoras', tone: 'violet', title: { eu: 'Pitagorasen teorema', es: 'Teorema de Pitágoras', en: 'Pythagoras\' theorem', ar: 'مبرهنة فيثاغورس' } },
    { id: 'plane-areas', tone: 'mustard', title: { eu: 'Irudi lauen azalerak', es: 'Áreas de figuras planas', en: 'Areas of plane figures', ar: 'مساحات الأشكال المستوية' } },
    { id: 'solid-areas', tone: 'coral', title: { eu: 'Gorputzen azalerak', es: 'Áreas de los cuerpos', en: 'Areas of solids', ar: 'مساحات الأجسام' } },
    { id: 'volumes', tone: 'green', title: { eu: 'Bolumenak', es: 'Volúmenes', en: 'Volumes', ar: 'الحجوم' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Polygons and perimeters ---------- */
    {
        id: 'angles',
        stage: 'polygons',
        needs: [{ unit: 'dbh3/geometria-plana', topic: 'polygon-angles', title: { eu: 'Poligonoen angeluak', es: 'Ángulos de los polígonos', en: 'Angles of polygons', ar: 'زوايا المضلعات' } }],
        title: say('Poligonoen angeluak', 'Ángulos de los polígonos', 'زوايا المضلعات', 'Angles of polygons'),
        goal: say('Poligono baten barne-angeluen batura kalkulatzea eta poligono erregular baten angelua aurkitzea.', 'Calcular la suma de los ángulos interiores de un polígono y hallar el ángulo de un polígono regular.', 'حساب مجموع الزوايا الداخلية لمضلع وإيجاد زاوية المضلع المنتظم.', 'Calculate the sum of the interior angles of a polygon and find the angle of a regular polygon.'),
        problem: say('Zenbat batzen dute eneagono baten barne-angeluek? Eta zenbat neurtzen du eneagono erregular baten angelu bakoitzak?', '¿Cuánto suman los ángulos interiores de un eneágono? ¿Y cuánto mide cada ángulo de un eneágono regular?', 'كم مجموع الزوايا الداخلية للمضلع التساعي؟ وكم قياس كل زاوية في التساعي المنتظم؟', 'What do the interior angles of a nonagon add up to? And how big is each angle of a regular nonagon?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Eneagonoak 9 alde ditu: 7 triangelu.', 'El eneágono tiene 9 lados: 7 triángulos.', 'للتساعي 9 أضلاع: 7 مثلثات.', 'The nonagon has 9 sides: 7 triangles.'), math: same('$180\\cdot (9-2)=1260$') },
            { text: say('Erregularra bada, 9 angelu berdin.', 'Si es regular, 9 ángulos iguales.', 'إذا كان منتظمًا فله 9 زوايا متساوية.', 'If it is regular, 9 equal angles.'), math: same('$1260\\mathbin{:}9=140$') }
        ],
        takeaway: say('Barne-angeluen batura: 180° bider (aldeak ken 2). Erregularrean, zatitu alde kopuruaz.', 'Suma de ángulos interiores: 180° por (lados menos 2). En el regular, divide entre el número de lados.', 'مجموع الزوايا الداخلية: 180° في (الأضلاع ناقص 2). وفي المنتظم اقسم على عدد الأضلاع.', 'Sum of interior angles: 180° times (sides minus 2). For a regular polygon, divide by the number of sides.'),
        figure: (language) => <AngleSumFigure language={language} />
    },
    {
        id: 'triangles',
        stage: 'polygons',
        title: say('Triangeluak', 'Triángulos', 'المثلثات', 'Triangles'),
        goal: say('Triangeluak aldeen eta angeluen arabera sailkatzea, aldeekin bakarrik ere bai.', 'Clasificar los triángulos según sus lados y sus ángulos, también solo con los lados.', 'تصنيف المثلثات حسب أضلاعها وزواياها، وحتى بالأضلاع وحدها.', 'Classify triangles by their sides and their angles, also using only the sides.'),
        problem: say('Triangelu baten aldeak 6 cm, 8 cm eta 11 cm dira. Nolakoa da angeluen arabera?', 'Los lados de un triángulo miden 6 cm, 8 cm y 11 cm. ¿Cómo es según sus ángulos?', 'أضلاع مثلث 6 سم و8 سم و11 سم. ما نوعه حسب زواياه؟', 'The sides of a triangle measure 6 cm, 8 cm and 11 cm. What type is it by its angles?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Alde handienaren karratua.', 'Cuadrado del lado mayor.', 'مربع الضلع الأكبر.', 'Square of the longest side.'), math: same('$11^{2}=121$') },
            { text: say('Beste bien karratuen batura.', 'Suma de los cuadrados de los otros dos.', 'مجموع مربعي الضلعين الآخرين.', 'Sum of the squares of the other two.'), math: same('$6^{2}+8^{2}=100$') },
            { text: say('121 > 100: kamutsa da (eta eskalenoa).', '121 > 100: es obtusángulo (y escaleno).', '121 > 100: منفرج (ومختلف الأضلاع).', '121 > 100: it is obtuse-angled (and scalene).') }
        ],
        takeaway: say('Konparatu alde handienaren karratua beste bien karratuen baturarekin: berdin, zuzena; handiago, kamutsa; txikiago, zorrotza.', 'Compara el cuadrado del lado mayor con la suma de los otros dos cuadrados: igual, rectángulo; mayor, obtusángulo; menor, acutángulo.', 'قارن مربع الضلع الأكبر بمجموع المربعين الآخرين: يساوي، قائم؛ أكبر، منفرج؛ أصغر، حادّ.', 'Compare the square of the longest side with the sum of the other two squares: equal, right-angled; bigger, obtuse-angled; smaller, acute-angled.'),
        figure: (language) => <ClassifyFigure language={language} />
    },
    {
        id: 'perimeters',
        stage: 'polygons',
        title: say('Perimetroak eta zirkunferentzia', 'Perímetros y circunferencia', 'المحيطات والدائرة', 'Perimeters and circumference'),
        goal: say('Poligonoen perimetroa eta zirkunferentziaren eta arku baten luzera kalkulatzea.', 'Calcular el perímetro de los polígonos y la longitud de la circunferencia y de un arco.', 'حساب محيط المضلعات وطول الدائرة وطول القوس.', 'Calculate the perimeters of polygons and the lengths of a circle\'s circumference and of an arc.'),
        problem: say('Bizikleta baten gurpilak 35 cm-ko erradioa du. Zenbat metro egiten ditu 100 bira ematen baditu?', 'La rueda de una bicicleta tiene 35 cm de radio. ¿Cuántos metros recorre si da 100 vueltas?', 'نصف قطر عجلة دراجة 35 سم. كم مترًا تقطع إذا دارت 100 دورة؟', 'A bicycle wheel has a radius of 35 cm. How many metres does it travel in 100 turns?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bira baten luzera.', 'Longitud de una vuelta.', 'طول دورة واحدة.', 'Distance covered in one turn.'), math: same('$2\\cdot 3{,}14\\cdot 35=219{,}8$') },
            { text: say('100 bira, cm-tan.', '100 vueltas, en cm.', '100 دورة بالسنتيمتر.', '100 turns, in cm.'), math: same('$219{,}8\\cdot 100=21\\,980$') },
            { text: say('Metrotan: 219,8 m.', 'En metros: 219,8 m.', 'بالمتر: 219.8 م.', 'In metres: 219.8 m.') }
        ],
        takeaway: say('Zirkunferentzia: 2πr. Arkua: zirkunferentzia bider angelua zati 360.', 'Circunferencia: 2πr. Arco: la circunferencia por el ángulo entre 360.', 'الدائرة: 2πr. القوس: الدائرة في الزاوية على 360.', 'Circumference: 2πr. Arc: the circumference times the angle, divided by 360.'),
        figure: (language) => <PerimeterFigure language={language} />
    },

    /* ---------- 2. Pythagoras ---------- */
    {
        id: 'right-triangles',
        stage: 'pythagoras',
        needs: [{ unit: 'dbh3/geometria-plana', topic: 'pythagoras', title: { eu: 'Pitagorasen teorema', es: 'El teorema de Pitágoras', en: 'Pythagoras\' theorem', ar: 'مبرهنة فيثاغورس' } }],
        title: say('Hipotenusa eta katetoak', 'Hipotenusa y catetos', 'الوتر والضلعان القائمان', 'Hypotenuse and legs'),
        goal: say('Triangelu angeluzuzen baten alde bat kalkulatzea beste biak ezagututa.', 'Calcular un lado de un triángulo rectángulo conociendo los otros dos.', 'حساب ضلع في مثلث قائم بمعرفة الضلعين الآخرين.', 'Calculate one side of a right-angled triangle when you know the other two.'),
        problem: say('Triangelu angeluzuzen baten hipotenusak 8 cm neurtzen ditu eta kateto batek 5 cm. Kalkulatu beste katetoa.', 'La hipotenusa de un triángulo rectángulo mide 8 cm y un cateto 5 cm. Calcula el otro cateto.', 'وتر مثلث قائم 8 سم وأحد ضلعيه القائمين 5 سم. احسب الضلع الآخر.', 'The hypotenuse of a right-angled triangle is 8 cm and one leg is 5 cm. Calculate the other leg.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hipotenusaren karratuari kendu katetoarena.', 'Al cuadrado de la hipotenusa réstale el del cateto.', 'اطرح من مربع الوتر مربع الضلع.', 'Subtract the square of the leg from the square of the hypotenuse.'), math: same('$64-25=39$') },
            { text: say('Atera erroa eta hurbildu.', 'Saca la raíz y aproxima.', 'استخرج الجذر وقرّب.', 'Take the square root and round.'), math: same('$c=\\sqrt{39}\\approx 6{,}24$') }
        ],
        takeaway: say('Hipotenusa: batu karratuak. Katetoa: kendu karratuak. Gero, erro karratua.', 'Hipotenusa: suma los cuadrados. Cateto: resta los cuadrados. Después, raíz cuadrada.', 'الوتر: اجمع المربعين. الضلع القائم: اطرح المربعين. ثم الجذر التربيعي.', 'Hypotenuse: add the squares. Leg: subtract the squares. Then take the square root.'),
        figure: (language) => <FormulaFigure language={language} />
    },
    {
        id: 'heights',
        stage: 'pythagoras',
        needs: [{ unit: 'dbh3/geometria-plana', topic: 'pythagoras-figures', title: { eu: 'Pitagoras irudietan', es: 'Pitágoras en las figuras', en: 'Pythagoras in shapes', ar: 'فيثاغورس في الأشكال' } }],
        title: say('Altuerak eta apotemak', 'Alturas y apotemas', 'الارتفاعات والعوامد', 'Heights and apothems'),
        goal: say('Triangelu isoszele eta aldeberdinen altuera eta hexagono erregularraren apotema Pitagorasekin kalkulatzea.', 'Calcular con Pitágoras la altura de triángulos isósceles y equiláteros y la apotema del hexágono regular.', 'حساب ارتفاع المثلثات متساوية الساقين والأضلاع وعامد المسدس المنتظم بفيثاغورس.', 'Use Pythagoras to calculate the height of isosceles and equilateral triangles and the apothem of a regular hexagon.'),
        problem: say('Kalkulatu 10 cm-ko aldeko triangelu aldeberdin baten altuera.', 'Calcula la altura de un triángulo equilátero de 10 cm de lado.', 'احسب ارتفاع مثلث متساوي الأضلاع طول ضلعه 10 سم.', 'Calculate the height of an equilateral triangle with a side of 10 cm.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hipotenusa 10, kateto bat oinarriaren erdia, 5.', 'Hipotenusa 10, un cateto media base, 5.', 'الوتر 10، وأحد الضلعين نصف القاعدة 5.', 'Hypotenuse 10, one leg half the base: 5.') },
            { text: say('Kendu karratuak.', 'Resta los cuadrados.', 'اطرح المربعين.', 'Subtract the squares.'), math: same('$h^{2}=100-25=75$') },
            { text: say('Atera erroa.', 'Saca la raíz.', 'استخرج الجذر.', 'Take the square root.'), math: same('$h=\\sqrt{75}\\approx 8{,}66$') }
        ],
        takeaway: say('Bilatu triangelu angeluzuzena: altuera eta apotema katetoak dira; aldea, hipotenusa.', 'Busca el triángulo rectángulo: la altura y la apotema son catetos; el lado, la hipotenusa.', 'ابحث عن المثلث القائم: الارتفاع والعامد ضلعان قائمان؛ والضلع هو الوتر.', 'Find the right-angled triangle: the height and the apothem are the legs; the side is the hypotenuse.'),
        figure: (language) => <IsoscelesHeightFigure language={language} />
    },
    {
        id: 'applications',
        stage: 'pythagoras',
        needs: [{ unit: 'dbh3/geometria-plana', topic: 'pythagoras-problems', title: { eu: 'Problemak Pitagorasekin', es: 'Problemas con Pitágoras', en: 'Problems with Pythagoras', ar: 'مسائل بفيثاغورس' } }],
        title: say('Pitagoras problemetan', 'Pitágoras en problemas', 'فيثاغورس في المسائل', 'Pythagoras in problems'),
        goal: say('Eguneroko egoeretan triangelu angeluzuzena ikustea eta Pitagoras aplikatzea.', 'Ver el triángulo rectángulo en situaciones cotidianas y aplicar Pitágoras.', 'رؤية المثلث القائم في مواقف يومية وتطبيق فيثاغورس.', 'Spot the right-angled triangle in everyday situations and apply Pythagoras\' theorem.'),
        problem: say('2,5 m-ko eskailera bat hormaren kontra dago, eta oina hormatik 0,7 m-ra. Zer altueratan ukitzen du horma?', 'Una escalera de 2,5 m está apoyada en la pared con el pie a 0,7 m de ella. ¿A qué altura toca la pared?', 'سلّم طوله 2.5 م مستند إلى جدار وقاعدته على بعد 0.7 م منه. على أي ارتفاع يلمس الجدار؟', 'A 2.5 m ladder leans against a wall with its foot 0.7 m from it. How high up the wall does it reach?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Eskailera hipotenusa da.', 'La escalera es la hipotenusa.', 'السلّم هو الوتر.', 'The ladder is the hypotenuse.'), math: same('$2{,}5^{2}-0{,}7^{2}=5{,}76$') },
            { text: say('Atera erroa.', 'Saca la raíz.', 'استخرج الجذر.', 'Take the square root.'), math: same('$\\sqrt{5{,}76}=2{,}4$') },
            { text: say('2,4 m-ko altueran ukitzen du.', 'Toca la pared a 2,4 m de altura.', 'يلمس الجدار على ارتفاع 2.4 م.', 'It reaches the wall at a height of 2.4 m.') }
        ],
        takeaway: say('Marraztu, markatu angelu zuzena eta bilatu hipotenusa: angelu zuzenaren aurrean dago.', 'Dibuja, marca el ángulo recto y busca la hipotenusa: está enfrente del ángulo recto.', 'ارسم وحدّد الزاوية القائمة وابحث عن الوتر: إنه مقابل الزاوية القائمة.', 'Draw it, mark the right angle and find the hypotenuse: it is opposite the right angle.'),
        figure: (language) => <LadderFigure language={language} />
    },

    /* ---------- 3. Areas of plane figures ---------- */
    {
        id: 'polygon-areas',
        stage: 'plane-areas',
        needs: [{ unit: 'dbh3/geometria-plana', topic: 'polygon-areas', title: { eu: 'Poligonoen azalerak', es: 'Áreas de polígonos', en: 'Areas of polygons', ar: 'مساحات المضلعات' } }],
        title: say('Poligonoen azalerak', 'Áreas de polígonos', 'مساحات المضلعات', 'Areas of polygons'),
        goal: say('Triangeluaren, laukien, trapezioaren eta poligono erregularren azalerak kalkulatzea.', 'Calcular el área del triángulo, los cuadriláteros, el trapecio y los polígonos regulares.', 'حساب مساحة المثلث والرباعيات وشبه المنحرف والمضلعات المنتظمة.', 'Calculate the area of triangles, quadrilaterals, trapeziums and regular polygons.'),
        problem: say('Heptagono erregular baten aldeak 5 cm neurtzen ditu eta apotemak 5,2 cm. Kalkulatu azalera.', 'Un heptágono regular tiene 5 cm de lado y 5,2 cm de apotema. Calcula su área.', 'مضلع سباعي منتظم طول ضلعه 5 سم وعامده 5.2 سم. احسب مساحته.', 'A regular heptagon has a side of 5 cm and an apothem of 5.2 cm. Calculate its area.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Perimetroa.', 'Perímetro.', 'المحيط.', 'Perimeter.'), math: same('$P=7\\cdot 5=35$') },
            { text: say('Perimetroa bider apotema zati bi.', 'Perímetro por apotema entre dos.', 'المحيط في العامد على اثنين.', 'Perimeter times apothem, divided by two.'), math: same('$\\dfrac{35\\cdot 5{,}2}{2}=91$') },
            { text: say('Azalera: 91 cm².', 'Área: 91 cm².', 'المساحة: 91 سم².', 'Area: 91 cm².') }
        ],
        takeaway: say('Triangelua eta erronboa: erdia. Trapezioa: oinarrien batezbestekoa bider altuera. Erregularra: perimetroa bider apotema zati bi.', 'Triángulo y rombo: la mitad. Trapecio: media de las bases por la altura. Regular: perímetro por apotema entre dos.', 'المثلث والمعيّن: النصف. شبه المنحرف: متوسط القاعدتين في الارتفاع. المنتظم: المحيط في العامد على اثنين.', 'Triangle and rhombus: half. Trapezium: the mean of the bases times the height. Regular polygon: perimeter times apothem, divided by two.'),
        figure: (language) => <PolygonAreasFigure language={language} />
    },
    {
        id: 'circle-areas',
        stage: 'plane-areas',
        needs: [{ unit: 'dbh3/geometria-plana', topic: 'circle-areas', title: { eu: 'Zirkulua eta haren zatiak', es: 'El círculo y sus partes', en: 'The circle and its parts', ar: 'الدائرة وأجزاؤها' } }],
        title: say('Zirkulua, sektorea eta koroa', 'Círculo, sector y corona', 'القرص والقطاع والحلقة', 'Circle, sector and annulus'),
        goal: say('Zirkuluaren, sektore zirkularraren eta koroa zirkularraren azalerak kalkulatzea.', 'Calcular el área del círculo, del sector circular y de la corona circular.', 'حساب مساحة القرص والقطاع الدائري والحلقة الدائرية.', 'Calculate the area of a circle, a sector and an annulus.'),
        problem: say('Lorategi zirkular batek 65 m-ko erradioa du, eta inguruan 15 m-ko zabalerako bide bat du barrualdetik. Kalkulatu bidearen azalera.', 'Un jardín circular tiene 65 m de radio y, por dentro del borde, un camino de 15 m de ancho. Calcula el área del camino.', 'حديقة دائرية نصف قطرها 65 م، وعلى حافتها من الداخل ممر عرضه 15 م. احسب مساحة الممر.', 'A circular garden has a radius of 65 m, and inside its edge there is a path 15 m wide. Calculate the area of the path.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Barruko erradioa.', 'Radio interior.', 'نصف القطر الداخلي.', 'Inner radius.'), math: same('$65-15=50$') },
            { text: say('Koroa: handia ken txikia.', 'Corona: el grande menos el pequeño.', 'الحلقة: الكبرى ناقص الصغرى.', 'Annulus: the big one minus the small one.'), math: same('$3{,}14\\cdot (65^{2}-50^{2})=5416{,}5$') },
            { text: say('Bidea: 5416,5 m².', 'Camino: 5416,5 m².', 'الممر: 5416.5 م².', 'Path: 5416.5 m².') }
        ],
        takeaway: say('Zirkulua: πr². Sektorea: zirkulua bider angelua zati 360. Koroa: handia ken txikia.', 'Círculo: πr². Sector: el círculo por el ángulo entre 360. Corona: el grande menos el pequeño.', 'القرص: πr². القطاع: القرص في الزاوية على 360. الحلقة: الكبرى ناقص الصغرى.', 'Circle: πr². Sector: the circle times the angle, divided by 360. Annulus: the big one minus the small one.'),
        figure: (language) => <SectorRingFigure language={language} />
    },
    {
        id: 'composite',
        stage: 'plane-areas',
        figureAfterSteps: true,
        title: say('Irudi konposatuak', 'Figuras compuestas', 'الأشكال المركّبة', 'Composite shapes'),
        goal: say('Irudi konposatuen eta itzaleztatutako eskualdeen azalera zatitan banatuz edo kenduz kalkulatzea.', 'Calcular el área de figuras compuestas y de regiones sombreadas descomponiendo o restando.', 'حساب مساحة الأشكال المركّبة والمناطق المظلّلة بالتجزئة أو الطرح.', 'Calculate the area of compound shapes and shaded regions by splitting them up or subtracting.'),
        problem: say('Leiho bat 4 dm zabal eta 3 dm altuko laukizuzena da, eta gainean zirkulu-erdi bat du. Zenbat beira behar da?', 'Una ventana es un rectángulo de 4 dm de ancho y 3 dm de alto con un semicírculo encima. ¿Cuánto cristal hace falta?', 'نافذة مستطيل عرضه 4 دسم وارتفاعه 3 دسم وفوقه نصف قرص. كم يلزم من الزجاج؟', 'A window is a rectangle 4 dm wide and 3 dm high with a semicircle on top. How much glass is needed?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Laukizuzena.', 'Rectángulo.', 'المستطيل.', 'Rectangle.'), math: same('$4\\cdot 3=12$') },
            { text: say('Zirkulu-erdia: erradioa 2.', 'Semicírculo: radio 2.', 'نصف القرص: نصف القطر 2.', 'Semicircle: radius 2.'), math: same('$\\dfrac{3{,}14\\cdot 2^{2}}{2}=6{,}28$') },
            { text: say('Batu: 18,28 dm².', 'Suma: 18,28 dm².', 'اجمع: 18.28 دسم².', 'Sum: 18.28 dm².'), math: same('$12+6{,}28=18{,}28$') }
        ],
        takeaway: say('Banatu eta batu, edo osatu eta kendu. Itzaleztatua: handia ken zuria.', 'Descompón y suma, o completa y resta. Sombreado: el grande menos el blanco.', 'جزّئ واجمع، أو أكمل واطرح. المظلّل: الكبير ناقص الأبيض.', 'Split and add, or complete and subtract. Shaded: the big one minus the white one.'),
        figure: (language) => <CompositeAreasFigure language={language} />
    },

    /* ---------- 4. Areas of solids ---------- */
    {
        id: 'prism-area',
        stage: 'solid-areas',
        title: say('Prismaren azalera', 'Área del prisma', 'مساحة المنشور', 'Area of a prism'),
        goal: say('Prismaren garapena erabiliz alboko azalera eta azalera osoa kalkulatzea.', 'Calcular el área lateral y total de un prisma a partir de su desarrollo.', 'حساب المساحة الجانبية والكلية للمنشور من نشره.', 'Calculate the lateral area and total surface area of a prism from its net.'),
        problem: say('Prisma hexagonal erregular baten oinarriak 3 cm-ko aldea eta 2,6 cm-ko apotema ditu, eta altuera 7 cm da. Kalkulatu azalera osoa.', 'Un prisma hexagonal regular tiene una base de 3 cm de lado y 2,6 cm de apotema, y 7 cm de altura. Calcula su área total.', 'منشور سداسي منتظم ضلع قاعدته 3 سم وعامدها 2.6 سم وارتفاعه 7 سم. احسب مساحته الكلية.', 'A regular hexagonal prism has a base with a side of 3 cm and an apothem of 2.6 cm, and a height of 7 cm. Calculate its total surface area.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Alboko azalera: 6 laukizuzen.', 'Área lateral: 6 rectángulos.', 'المساحة الجانبية: 6 مستطيلات.', 'Lateral area: 6 rectangles.'), math: same('$6\\cdot 3\\cdot 7=126$') },
            { text: say('Oinarri bat.', 'Una base.', 'قاعدة واحدة.', 'One base.'), math: same('$\\dfrac{18\\cdot 2{,}6}{2}=23{,}4$') },
            { text: say('Guztira, bi oinarri: 172,8 cm².', 'Total, con dos bases: 172,8 cm².', 'المجموع بقاعدتين: 172.8 سم².', 'Total, with two bases: 172.8 cm².'), math: same('$126+2\\cdot 23{,}4=172{,}8$') }
        ],
        takeaway: say('Prisma: perimetroa bider altuera, gehi bi oinarri.', 'Prisma: perímetro por altura, más las dos bases.', 'المنشور: المحيط في الارتفاع، مع القاعدتين.', 'Prism: perimeter times height, plus the two bases.'),
        figure: (language) => <PrismAreaFigure language={language} />
    },
    {
        id: 'pyramid-area',
        stage: 'solid-areas',
        figureAfterSteps: true,
        title: say('Piramidearen azalera', 'Área de la pirámide', 'مساحة الهرم', 'Area of a pyramid'),
        goal: say('Piramide erregular baten azalera kalkulatzea, apotema Pitagorasekin aurkituz behar denean.', 'Calcular el área de una pirámide regular, hallando la apotema con Pitágoras cuando haga falta.', 'حساب مساحة الهرم المنتظم مع إيجاد العامد بفيثاغورس عند الحاجة.', 'Calculate the area of a regular pyramid, finding the slant height with Pythagoras when needed.'),
        problem: say('Piramide erregular baten oinarria 10 cm-ko aldeko karratua da eta altuera 12 cm. Kalkulatu azalera osoa.', 'La base de una pirámide regular es un cuadrado de 10 cm de lado y su altura mide 12 cm. Calcula su área total.', 'قاعدة هرم منتظم مربع طول ضلعه 10 سم وارتفاعه 12 سم. احسب مساحته الكلية.', 'The base of a regular pyramid is a square with a side of 10 cm, and its height is 12 cm. Calculate its total surface area.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Apotema: altuera eta aldearen erdia katetoak.', 'Apotema: la altura y medio lado son los catetos.', 'العامد: الارتفاع ونصف الضلع هما الضلعان القائمان.', 'Slant height: the height and half a side are the legs.'), math: same('$\\sqrt{12^{2}+5^{2}}=13$') },
            { text: say('Lau triangelu.', 'Cuatro triángulos.', 'أربعة مثلثات.', 'Four triangles.'), math: same('$\\dfrac{40\\cdot 13}{2}=260$') },
            { text: say('Gehitu oinarria: 360 cm².', 'Suma la base: 360 cm².', 'أضف القاعدة: 360 سم².', 'Add the base: 360 cm².'), math: same('$260+100=360$') }
        ],
        takeaway: say('Piramidea: perimetroa bider apotema zati bi, gehi oinarria. Apotema ≠ altuera.', 'Pirámide: perímetro por apotema entre dos, más la base. Apotema ≠ altura.', 'الهرم: المحيط في العامد على اثنين، مع القاعدة. العامد ≠ الارتفاع.', 'Pyramid: perimeter times slant height, divided by two, plus the base. Slant height ≠ height.'),
        figure: (language) => <PyramidAreaFigure language={language} />
    },
    {
        id: 'round-area',
        stage: 'solid-areas',
        title: say('Zilindroa, konoa eta esfera', 'Cilindro, cono y esfera', 'الأسطوانة والمخروط والكرة', 'Cylinder, cone and sphere'),
        goal: say('Biraketa-gorputzen azalerak kalkulatzea: zilindroa, konoa eta esfera.', 'Calcular las áreas de los cuerpos de revolución: cilindro, cono y esfera.', 'حساب مساحات الأجسام الدورانية: الأسطوانة والمخروط والكرة.', 'Calculate the areas of solids of revolution: cylinder, cone and sphere.'),
        problem: say('Kono batek 10 cm-ko erradioa eta 20 cm-ko sortzailea ditu. Kalkulatu azalera osoa.', 'Un cono tiene 10 cm de radio y 20 cm de generatriz. Calcula su área total.', 'مخروط نصف قطره 10 سم وراسمه 20 سم. احسب مساحته الكلية.', 'A cone has a radius of 10 cm and a slant height of 20 cm. Calculate its total surface area.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Alboko azalera.', 'Área lateral.', 'المساحة الجانبية.', 'Lateral area.'), math: same('$3{,}14\\cdot 10\\cdot 20=628$') },
            { text: say('Oinarria.', 'Base.', 'القاعدة.', 'Base.'), math: same('$3{,}14\\cdot 10^{2}=314$') },
            { text: say('Guztira: 942 cm².', 'Total: 942 cm².', 'المجموع: 942 سم².', 'Total: 942 cm².'), math: same('$628+314=942$') }
        ],
        takeaway: say('Zilindroa: 2πrh. Konoa: πrg. Esfera: 4πr². Gero gehitu oinarriak.', 'Cilindro: 2πrh. Cono: πrg. Esfera: 4πr². Luego suma las bases.', 'الأسطوانة: 2πrh. المخروط: πrg. الكرة: 4πr². ثم أضف القواعد.', 'Cylinder: 2πrh. Cone: πrg. Sphere: 4πr². Then add the bases.'),
        figure: (language) => <ConeFigure language={language} />
    },

    /* ---------- 5. Volumes ---------- */
    {
        id: 'prism-volume',
        stage: 'volumes',
        title: say('Prismaren eta zilindroaren bolumena', 'Volumen del prisma y del cilindro', 'حجم المنشور والأسطوانة', 'Volume of prisms and cylinders'),
        goal: say('Prismen eta zilindroen bolumena kalkulatzea eta litrotan adieraztea.', 'Calcular el volumen de prismas y cilindros y expresarlo en litros.', 'حساب حجم المناشير والأسطوانات والتعبير عنه باللترات.', 'Calculate the volume of prisms and cylinders and express it in litres.'),
        problem: say('Igerileku batek 12 m luze, 5,6 m zabal eta 2 m sakon ditu. Ur m³-ak 0,80 € balio badu, zenbat kostatuko da betetzea?', 'Una piscina mide 12 m de largo, 5,6 m de ancho y 2 m de profundidad. Si el m³ de agua cuesta 0,80 €, ¿cuánto costará llenarla?', 'مسبح طوله 12 م وعرضه 5.6 م وعمقه 2 م. إذا كان المتر المكعب من الماء بـ 0.80 €، فكم يكلّف ملؤه؟', 'A swimming pool is 12 m long, 5.6 m wide and 2 m deep. If a cubic metre of water costs €0.80, how much will it cost to fill it?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bolumena.', 'Volumen.', 'الحجم.', 'Volume.'), math: same('$12\\cdot 5{,}6\\cdot 2=134{,}4$') },
            { text: say('Kostua.', 'Coste.', 'التكلفة.', 'Cost.'), math: same('$134{,}4\\cdot 0{,}8=107{,}52$') },
            { text: say('107,52 € kostatuko da.', 'Costará 107,52 €.', 'سيكلّف 107.52 €.', 'It will cost €107.52.') }
        ],
        takeaway: say('Prisma eta zilindroa: oinarria bider altuera. 1 dm³ = 1 L eta 1 m³ = 1000 L.', 'Prisma y cilindro: base por altura. 1 dm³ = 1 L y 1 m³ = 1000 L.', 'المنشور والأسطوانة: القاعدة في الارتفاع. 1 dm³ = 1 L و1 m³ = 1000 L.', 'Prism and cylinder: base times height. 1 dm³ = 1 L and 1 m³ = 1000 L.'),
        figure: (language) => <PrismVolumeFigure language={language} />
    },
    {
        id: 'pyramid-volume',
        stage: 'volumes',
        title: say('Piramidearen eta konoaren bolumena', 'Volumen de la pirámide y del cono', 'حجم الهرم والمخروط', 'Volume of pyramids and cones'),
        goal: say('Piramideen eta konoen bolumena kalkulatzea, prisma edo zilindroaren herena dela jakinda.', 'Calcular el volumen de pirámides y conos sabiendo que es un tercio del prisma o del cilindro.', 'حساب حجم الأهرامات والمخاريط بمعرفة أنه ثلث المنشور أو الأسطوانة.', 'Calculate the volume of pyramids and cones, knowing that it is a third of the prism or the cylinder.'),
        problem: say('Kono batek 3 cm-ko erradioa eta 12 cm-ko altuera ditu. Zenbat mL sartzen dira?', 'Un cono tiene 3 cm de radio y 12 cm de altura. ¿Cuántos mL caben?', 'مخروط نصف قطره 3 سم وارتفاعه 12 سم. كم مليلترًا يسع؟', 'A cone has a radius of 3 cm and a height of 12 cm. How many mL does it hold?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Oinarria.', 'Base.', 'القاعدة.', 'Base.'), math: same('$3{,}14\\cdot 3^{2}=28{,}26$') },
            { text: say('Bider altuera, zati 3.', 'Por la altura, entre 3.', 'في الارتفاع، على 3.', 'Times the height, divided by 3.'), math: same('$\\dfrac{28{,}26\\cdot 12}{3}=113{,}04$') },
            { text: say('113,04 cm³ = 113,04 mL.', '113,04 cm³ = 113,04 mL.', '113.04 سم³ = 113.04 مل.', '113.04 cm³ = 113.04 mL.') }
        ],
        takeaway: say('Piramidea eta konoa: oinarria bider altuera, zati 3.', 'Pirámide y cono: base por altura, entre 3.', 'الهرم والمخروط: القاعدة في الارتفاع، على 3.', 'Pyramid and cone: base times height, divided by 3.'),
        figure: (language) => <PyramidVolumeFigure language={language} />
    },
    {
        id: 'compound',
        stage: 'volumes',
        figureAfterSteps: true,
        title: say('Esfera eta gorputz konposatuak', 'Esfera y cuerpos compuestos', 'الكرة والأجسام المركّبة', 'Sphere and composite solids'),
        goal: say('Esferaren bolumena kalkulatzea eta gorputz konposatuen bolumena zatien bolumenak batuz edo kenduz aurkitzea.', 'Calcular el volumen de la esfera y hallar el de cuerpos compuestos sumando o restando volúmenes.', 'حساب حجم الكرة وإيجاد حجم الأجسام المركّبة بجمع الحجوم أو طرحها.', 'Calculate the volume of a sphere and find the volume of compound solids by adding or subtracting volumes.'),
        problem: say('Izozki-kono batek 3 cm-ko erradioa eta 12 cm-ko altuera ditu, eta gainean esfera-erdi bat. Zenbat izozki dauka?', 'Un cucurucho tiene 3 cm de radio y 12 cm de altura, con una semiesfera de helado encima. ¿Cuánto helado contiene?', 'مخروط مثلّجة نصف قطره 3 سم وارتفاعه 12 سم وفوقه نصف كرة. كم فيه من المثلّجات؟', 'An ice cream cone has a radius of 3 cm and a height of 12 cm, with a hemisphere of ice cream on top. How much ice cream does it hold?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Konoa.', 'Cono.', 'المخروط.', 'Cone.'), math: same('$\\dfrac{3{,}14\\cdot 9\\cdot 12}{3}=113{,}04$') },
            { text: say('Esfera-erdia.', 'Semiesfera.', 'نصف الكرة.', 'Hemisphere.'), math: same('$\\dfrac{2\\cdot 3{,}14\\cdot 27}{3}=56{,}52$') },
            { text: say('Batu: 169,56 cm³ = 169,56 mL.', 'Suma: 169,56 cm³ = 169,56 mL.', 'اجمع: 169.56 سم³ = 169.56 مل.', 'Sum: 169.56 cm³ = 169.56 mL.'), math: same('$113{,}04+56{,}52=169{,}56$') }
        ],
        takeaway: say('Esfera: 4πr³ zati 3. Gorputz konposatuak: banatu, kalkulatu eta batu edo kendu.', 'Esfera: 4πr³ entre 3. Cuerpos compuestos: descompón, calcula y suma o resta.', 'الكرة: 4πr³ على 3. الأجسام المركّبة: جزّئ واحسب واجمع أو اطرح.', 'Sphere: 4πr³ divided by 3. Compound solids: split, calculate and add or subtract.'),
        figure: (language) => <CompoundSolidFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const areasVolumesTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...areasVolumesLessonTexts[topic.id as AreasVolumesTopicId], ...areasVolumesLessonChecks[topic.id as AreasVolumesTopicId] }))
