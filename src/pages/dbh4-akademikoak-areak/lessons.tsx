import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { SectorRingFigure } from '../dbh1-figurak-v2/figures'
import { ConeFigure, PrismVolumeFigure, PyramidAreaFigure, PyramidVolumeFigure, SphereFigure } from '../dbh2-gorputzak-v2/figures'
import { ApothemFigure } from '../dbh2-pitagoras-v2/figures'
import { PlanFigure, ThalesFigure, ThalesPositionFigure, VolumeRatioFigure } from '../dbh4-aplikatuak-antzekotasuna/figures'
import { CompoundSolidFigure } from '../dbh4-aplikatuak-areak/figures'
import { FrustumFigure, RightTheoremsFigure, SegmentFigure } from './figures'
import { areasLessonChecks, type AreasTopicId } from './lessonChecks'
import { areasLessonTexts } from './lessonTexts'

/* ==========================================================================
   Azalerak, bolumenak eta antzekotasuna · 4. DBH akademikoak — stages and
   lessons, following Santillana 4.º Académicas unit 6 (regular polygons
   with the apothem found by Pythagoras, sectors, crowns and segments,
   compound figures, areas of polyhedra and round bodies, volumes and
   compound solids, similar figures with ratio k, k² and k³) and Anaya
   4.º Académicas unit 6 (Thales, similar triangles, the altitude and leg
   theorems, the frustums of cone and pyramid as a difference of similar
   solids, models and scales). It builds on the 4. DBH aplikatuak units on
   areas and on similarity and goes further: segments, spherical zones,
   the right-triangle theorems and the frustums. π ≈ 3,14.
   ========================================================================== */

export type AreasSimilarityStageId = 'plane-areas' | 'solid-areas' | 'volumes' | 'similarity' | 'ratios'

export const areasSimilarityStages: UnitStage[] = [
    { id: 'plane-areas', tone: 'blue', title: { eu: 'Irudi lauen azalerak', es: 'Áreas de figuras planas', en: 'Areas of plane figures', ar: 'مساحات الأشكال المستوية' } },
    { id: 'solid-areas', tone: 'violet', title: { eu: 'Gorputzen azalerak', es: 'Áreas de los cuerpos', en: 'Areas of solids', ar: 'مساحات الأجسام' } },
    { id: 'volumes', tone: 'mustard', title: { eu: 'Bolumenak', es: 'Volúmenes', en: 'Volumes', ar: 'الحجوم' } },
    { id: 'similarity', tone: 'coral', title: { eu: 'Antzekotasuna', es: 'Semejanza', en: 'Similarity', ar: 'التشابه' } },
    { id: 'ratios', tone: 'green', title: { eu: 'Antzekotasun-arrazoia eta eskalak', es: 'Razón de semejanza y escalas', en: 'Scale factor and scales', ar: 'نسبة التشابه والمقاييس' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Areas of plane figures ---------- */
    {
        id: 'regular-polygons',
        stage: 'plane-areas',
        title: say('Poligono erregularrak eta apotema', 'Polígonos regulares y apotema', 'المضلعات المنتظمة والعامد', 'Regular polygons and the apothem'),
        goal: say('Apotema Pitagorasekin aurkitzea eta poligono erregular baten azalera kalkulatzea.', 'Hallar la apotema con Pitágoras y calcular el área de un polígono regular.', 'إيجاد العامد بفيثاغورس وحساب مساحة مضلع منتظم.', 'Find the apothem using Pythagoras\' theorem and calculate the area of a regular polygon.'),
        needs: [
            { unit: 'dbh3/geometria-plana', topic: 'regular-area', title: { eu: 'Poligono erregularren azalera', es: 'Área de los polígonos regulares', en: 'Area of regular polygons', ar: 'مساحة المضلعات المنتظمة' } }
        ],
        problem: say('Pentagono erregular baten aldea 6 cm da eta erradioa 5,1 cm. Kalkulatu azalera.', 'Un pentágono regular tiene 6 cm de lado y 5,1 cm de radio. Calcula su área.', 'مخمس منتظم طول ضلعه 6 سم ونصف قطره 5.1 سم. احسب مساحته.', 'A regular pentagon has a side of 6 cm and a radius of 5.1 cm. Calculate its area.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Apotema: erradioa hipotenusa, alde-erdia katetoa.', 'Apotema: el radio es la hipotenusa y medio lado un cateto.', 'العامد: نصف القطر هو الوتر ونصف الضلع ضلع قائم.', 'Apothem: the radius is the hypotenuse and half a side is one leg.'), math: same('$a=\\sqrt{5{,}1^{2}-3^{2}}\\approx 4{,}12$') },
            { text: say('Perimetroa.', 'Perímetro.', 'المحيط.', 'Perimeter.'), math: same('$P=5\\cdot 6=30$') },
            { text: say('Azalera: 61,8 cm².', 'Área: 61,8 cm².', 'المساحة: 61.8 سم².', 'Area: 61.8 cm².'), math: same('$A=\\dfrac{30\\cdot 4{,}12}{2}=61{,}8$') }
        ],
        takeaway: say('Erradioa, apotema eta alde-erdia: triangelu angeluzuzena. Azalera: P · a / 2.', 'Radio, apotema y medio lado: un triángulo rectángulo. Área: P · a / 2.', 'نصف القطر والعامد ونصف الضلع: مثلث قائم. المساحة: P · a / 2.', 'Radius, apothem and half a side: a right-angled triangle. Area: P · a / 2.'),
        figure: (language) => <ApothemFigure language={language} />
    },
    {
        id: 'circle-parts',
        stage: 'plane-areas',
        title: say('Arkua, sektorea eta koroa', 'Arco, sector y corona', 'القوس والقطاع والحلقة', 'Arc, sector and annulus'),
        goal: say('Arku baten luzera eta sektore, koroa eta trapezio zirkularren azalera kalkulatzea.', 'Calcular la longitud de un arco y el área de sectores, coronas y trapecios circulares.', 'حساب طول قوس ومساحة القطاعات والحلقات وأشباه المنحرفات الدائرية.', 'Calculate the length of an arc and the area of sectors, annuli and annular sectors.'),
        needs: [
            { unit: 'dbh3/geometria-plana', topic: 'circle-areas', title: { eu: 'Zirkulua eta haren zatiak', es: 'El círculo y sus partes', en: 'The circle and its parts', ar: 'الدائرة وأجزاؤها' } }
        ],
        problem: say('Kalkulatu 4 cm-ko erradioko eta 45°-ko sektore baten azalera eta perimetroa.', 'Calcula el área y el perímetro de un sector de 45° y 4 cm de radio.', 'احسب مساحة ومحيط قطاع قياسه 45° ونصف قطره 4 سم.', 'Calculate the area and perimeter of a sector of 45° with a radius of 4 cm.'),
        stepsKind: 'steps',
        steps: [
            { text: say('45° zirkuluaren zortzirena da.', '45° es la octava parte del círculo.', '45° ثُمن القرص.', '45° is an eighth of the circle.'), math: same('$A=\\dfrac{3{,}14\\cdot 4^{2}}{8}=6{,}28$') },
            { text: say('Arkua.', 'El arco.', 'القوس.', 'The arc.'), math: same('$L=\\dfrac{2\\cdot 3{,}14\\cdot 4}{8}=3{,}14$') },
            { text: say('Perimetroa: arkua gehi bi erradio.', 'Perímetro: el arco más dos radios.', 'المحيط: القوس زائد نصفي قطر.', 'Perimeter: the arc plus two radii.'), math: same('$P=3{,}14+8=11{,}14$') }
        ],
        takeaway: say('Arkua eta sektorea: osoaren n/360. Koroa: π(R² − r²).', 'Arco y sector: n/360 del total. Corona: π(R² − r²).', 'القوس والقطاع: n/360 من الكل. الحلقة: π(R² − r²).', 'Arc and sector: n/360 of the total. Annulus: π(R² − r²).'),
        figure: (language) => <SectorRingFigure language={language} />
    },
    {
        id: 'segments',
        stage: 'plane-areas',
        figureAfterSteps: true,
        title: say('Segmentu zirkularra eta irudi konposatuak', 'Segmento circular y figuras compuestas', 'القطعة الدائرية والأشكال المركّبة', 'Circular segment and composite figures'),
        goal: say('Segmentu zirkularraren eta itzaleztatutako eskualdeen azalera sektoreak eta poligonoak batuz edo kenduz kalkulatzea.', 'Calcular el área del segmento circular y de regiones sombreadas sumando o restando sectores y polígonos.', 'حساب مساحة القطعة الدائرية والمناطق المظلّلة بجمع القطاعات والمضلعات أو طرحها.', 'Calculate the area of a circular segment and of shaded regions by adding or subtracting sectors and polygons.'),
        problem: say('4 cm-ko aldeko karratu batean, aurkako bi erpinetan zentroa duten 4 cm-ko erradioko bi zirkulu-laurden marrazten dira. Kalkulatu sortzen duten hostoaren azalera.', 'En un cuadrado de 4 cm de lado se dibujan dos cuartos de círculo de 4 cm de radio con centro en dos vértices opuestos. Calcula el área de la hoja que forman.', 'في مربع ضلعه 4 سم يُرسم ربعا دائرتين نصف قطرهما 4 سم ومركزاهما رأسان متقابلان. احسب مساحة الورقة التي يكوّنانها.', 'In a square with a side of 4 cm, two quarter circles with a radius of 4 cm are drawn, centred at two opposite corners. Calculate the area of the \'leaf\' they form.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zirkulu-laurdena.', 'El cuarto de círculo.', 'ربع القرص.', 'The quarter circle.'), math: same('$\\dfrac{3{,}14\\cdot 4^{2}}{4}=12{,}56$') },
            { text: say('Segmentua: laurdena ken triangelua.', 'El segmento: el cuarto menos el triángulo.', 'القطعة: الربع ناقص المثلث.', 'The segment: the quarter circle minus the triangle.'), math: same('$12{,}56-8=4{,}56$') },
            { text: say('Hostoa bi segmentu dira: 9,12 cm².', 'La hoja son dos segmentos: 9,12 cm².', 'الورقة قطعتان: 9.12 سم².', 'The leaf is two segments: 9.12 cm².'), math: same('$2\\cdot 4{,}56=9{,}12$') }
        ],
        takeaway: say('Segmentua: sektorea ken triangelua. Konposatuak: banatu eta batu, edo osatu eta kendu.', 'Segmento: sector menos triángulo. Compuestas: descompón y suma, o completa y resta.', 'القطعة: القطاع ناقص المثلث. المركّبة: جزّئ واجمع، أو أكمل واطرح.', 'Segment: sector minus triangle. Composite figures: break down and add, or complete and subtract.'),
        figure: (language) => <SegmentFigure language={language} />
    },

    /* ---------- 2. Areas of solids ---------- */
    {
        id: 'polyhedra-area',
        stage: 'solid-areas',
        title: say('Prismen eta piramideen azalera', 'Área de prismas y pirámides', 'مساحة المنشورات والأهرام', 'Area of prisms and pyramids'),
        goal: say('Prisma eta piramide baten alboko azalera eta azalera osoa kalkulatzea, falta diren neurriak Pitagorasekin aurkituz.', 'Calcular el área lateral y total de prismas y pirámides, hallando con Pitágoras las medidas que faltan.', 'حساب المساحة الجانبية والكلية للمنشورات والأهرام، مع إيجاد الأطوال الناقصة بفيثاغورس.', 'Calculate the lateral and total area of prisms and pyramids, using Pythagoras\' theorem to find the missing measurements.'),
        needs: [
            { unit: 'dbh3/geometria-plana', topic: 'pythagoras-figures', title: { eu: 'Pitagoras irudietan', es: 'Pitágoras en las figuras', en: 'Pythagoras in shapes', ar: 'فيثاغورس في الأشكال' } }
        ],
        problem: say('Piramide karratu baten oinarriaren aldea 6 cm da eta altuera 4 cm. Kalkulatu azalera osoa.', 'Una pirámide cuadrangular tiene 6 cm de lado de la base y 4 cm de altura. Calcula su área total.', 'هرم رباعي ضلع قاعدته 6 سم وارتفاعه 4 سم. احسب مساحته الكلية.', 'A square-based pyramid has a base side of 6 cm and a height of 4 cm. Calculate its total area.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Piramidearen apotema.', 'La apotema de la pirámide.', 'عامد الهرم.', 'The slant height of the pyramid.'), math: same('$a_p=\\sqrt{4^{2}+3^{2}}=5$') },
            { text: say('Alboko azalera.', 'El área lateral.', 'المساحة الجانبية.', 'The lateral area.'), math: same('$A_L=\\dfrac{24\\cdot 5}{2}=60$') },
            { text: say('Gehi oinarria: 96 cm².', 'Más la base: 96 cm².', 'زائد القاعدة: 96 سم².', 'Plus the base: 96 cm².'), math: same('$A_T=60+36=96$') }
        ],
        takeaway: say('Prisma: P · h + 2 oinarri. Piramidea: P · apotema / 2 + oinarria.', 'Prisma: P · h + 2 bases. Pirámide: P · apotema / 2 + base.', 'المنشور: P · h + قاعدتان. الهرم: P · العامد / 2 + القاعدة.', 'Prism: P · h + 2 bases. Pyramid: P · slant height / 2 + base.'),
        figure: (language) => <PyramidAreaFigure language={language} />
    },
    {
        id: 'round-area',
        stage: 'solid-areas',
        title: say('Zilindroaren eta konoaren azalera', 'Área del cilindro y del cono', 'مساحة الأسطوانة والمخروط', 'Area of a cylinder and a cone'),
        goal: say('Zilindroaren eta konoaren azalera kalkulatzea, sortzailea Pitagorasekin aurkituz.', 'Calcular el área del cilindro y del cono, hallando la generatriz con Pitágoras.', 'حساب مساحة الأسطوانة والمخروط مع إيجاد الراسم بفيثاغورس.', 'Calculate the area of a cylinder and a cone, finding the slant height using Pythagoras\' theorem.'),
        problem: say('Kono baten erradioa 3 cm da eta altuera 4 cm. Kalkulatu azalera osoa.', 'Un cono tiene 3 cm de radio y 4 cm de altura. Calcula su área total.', 'مخروط نصف قطره 3 سم وارتفاعه 4 سم. احسب مساحته الكلية.', 'A cone has a radius of 3 cm and a height of 4 cm. Calculate its total area.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Sortzailea.', 'La generatriz.', 'الراسم.', 'The slant height.'), math: same('$g=\\sqrt{4^{2}+3^{2}}=5$') },
            { text: say('Alboko azalera eta oinarria.', 'Área lateral y base.', 'المساحة الجانبية والقاعدة.', 'Lateral area and base.'), math: same('$3{,}14\\cdot 3\\cdot 5=47{,}1\\qquad 3{,}14\\cdot 3^{2}=28{,}26$') },
            { text: say('Batu: 75,36 cm².', 'Suma: 75,36 cm².', 'اجمع: 75.36 سم².', 'Sum: 75.36 cm².'), math: same('$47{,}1+28{,}26=75{,}36$') }
        ],
        takeaway: say('Zilindroa: 2πrh + 2πr². Konoa: πrg + πr², g = √(h² + r²).', 'Cilindro: 2πrh + 2πr². Cono: πrg + πr², g = √(h² + r²).', 'الأسطوانة: 2πrh + 2πr². المخروط: πrg + πr²، g = √(h² + r²).', 'Cylinder: 2πrh + 2πr². Cone: πrg + πr², g = √(h² + r²).'),
        figure: (language) => <ConeFigure language={language} />
    },
    {
        id: 'sphere-area',
        stage: 'solid-areas',
        title: say('Esferaren azalera', 'Área de la esfera', 'مساحة الكرة', 'Area of a sphere'),
        goal: say('Esferaren, esfera-erdiaren eta zona esferikoaren azalera kalkulatzea, eta azaleratik erradioa aurkitzea.', 'Calcular el área de la esfera, de la semiesfera y de la zona esférica, y hallar el radio a partir del área.', 'حساب مساحة الكرة ونصف الكرة والمنطقة الكروية، وإيجاد نصف القطر من المساحة.', 'Calculate the area of a sphere, a hemisphere and a spherical zone, and find the radius from the area.'),
        problem: say('Esfera baten azalera 314 cm² da. Zein da erradioa? Eta 2 cm-ko lodierako zona esferiko baten azalera?', 'Una esfera tiene 314 cm² de área. ¿Cuál es su radio? ¿Y el área de una zona esférica de 2 cm de grosor?', 'مساحة كرة 314 سم². ما نصف قطرها؟ وما مساحة منطقة كروية سمكها 2 سم؟', 'A sphere has an area of 314 cm². What is its radius? And what is the area of a spherical zone 2 cm thick?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatitu 4π-z.', 'Divide entre 4π.', 'اقسم على 4π.', 'Divide by 4π.'), math: same('$r^{2}=314\\mathbin{:}12{,}56=25$') },
            { text: say('Erroa.', 'La raíz.', 'الجذر.', 'The square root.'), math: same('$r=5$') },
            { text: say('Zona: 2πrh.', 'La zona: 2πrh.', 'المنطقة: 2πrh.', 'The zone: 2πrh.'), math: same('$2\\cdot 3{,}14\\cdot 5\\cdot 2=62{,}8$') }
        ],
        takeaway: say('Esfera: 4πr². Zona edo txapela: 2πrh. Esfera-erdi itxia: 3πr².', 'Esfera: 4πr². Zona o casquete: 2πrh. Semiesfera cerrada: 3πr².', 'الكرة: 4πr². المنطقة أو القبعة: 2πrh. نصف الكرة المغلق: 3πr².', 'Sphere: 4πr². Zone or cap: 2πrh. Closed hemisphere: 3πr².'),
        figure: (language) => <SphereFigure language={language} />
    },

    /* ---------- 3. Volumes ---------- */
    {
        id: 'prism-cylinder-volume',
        stage: 'volumes',
        title: say('Prisma eta zilindroa', 'Prisma y cilindro', 'المنشور والأسطوانة', 'Prism and cylinder'),
        goal: say('Prisma eta zilindroen bolumena kalkulatzea eta edukiera litrotan ematea.', 'Calcular el volumen de prismas y cilindros y dar la capacidad en litros.', 'حساب حجم المنشورات والأسطوانات وإعطاء السعة باللترات.', 'Calculate the volume of prisms and cylinders and give the capacity in litres.'),
        problem: say('Ur-depósito zilindriko batek 2 m-ko diametroa eta 3 m-ko altuera ditu. Zenbat litro sartzen dira?', 'Un depósito cilíndrico tiene 2 m de diámetro y 3 m de altura. ¿Cuántos litros caben?', 'خزان أسطواني قطره 2 م وارتفاعه 3 م. كم لترًا يسع؟', 'A cylindrical tank has a diameter of 2 m and a height of 3 m. How many litres does it hold?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erradioa diametroaren erdia da.', 'El radio es la mitad del diámetro.', 'نصف القطر نصف القطر الكامل.', 'The radius is half the diameter.'), math: same('$r=1$') },
            { text: say('Bolumena.', 'El volumen.', 'الحجم.', 'The volume.'), math: same('$V=3{,}14\\cdot 1^{2}\\cdot 3=9{,}42$') },
            { text: say('9,42 m³ = 9420 L.', '9,42 m³ = 9420 L.', '9.42 م³ = 9420 لترًا.', '9.42 m³ = 9,420 L.'), math: same('$9{,}42\\cdot 1000=9420$') }
        ],
        takeaway: say('Prisma eta zilindroa: oinarria bider altuera. 1 dm³ = 1 L.', 'Prisma y cilindro: base por altura. 1 dm³ = 1 L.', 'المنشور والأسطوانة: القاعدة في الارتفاع. 1 dm³ = 1 L.', 'Prism and cylinder: base times height. 1 dm³ = 1 L.'),
        figure: (language) => <PrismVolumeFigure language={language} />
    },
    {
        id: 'pyramid-cone-volume',
        stage: 'volumes',
        title: say('Piramidea eta konoa', 'Pirámide y cono', 'الهرم والمخروط', 'Pyramid and cone'),
        goal: say('Piramide eta konoen bolumena kalkulatzea, altuera apotematik edo sortzailetik aterata.', 'Calcular el volumen de pirámides y conos, sacando la altura de la apotema o de la generatriz.', 'حساب حجم الأهرام والمخاريط باستخراج الارتفاع من العامد أو الراسم.', 'Calculate the volume of pyramids and cones, finding the height from the slant height.'),
        problem: say('Kono baten erradioa 6 cm da eta sortzailea 10 cm. Kalkulatu bolumena.', 'Un cono tiene 6 cm de radio y 10 cm de generatriz. Calcula su volumen.', 'مخروط نصف قطره 6 سم وراسمه 10 سم. احسب حجمه.', 'A cone has a radius of 6 cm and a slant height of 10 cm. Calculate its volume.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Altuera: sortzailea hipotenusa da.', 'La altura: la generatriz es la hipotenusa.', 'الارتفاع: الراسم هو الوتر.', 'The height: the slant height is the hypotenuse.'), math: same('$h=\\sqrt{10^{2}-6^{2}}=8$') },
            { text: say('Oinarria bider altuera zati 3.', 'Base por altura entre 3.', 'القاعدة في الارتفاع على 3.', 'Base times height divided by 3.'), math: same('$V=\\dfrac{3{,}14\\cdot 6^{2}\\cdot 8}{3}=301{,}44$') },
            { text: say('Bolumena: 301,44 cm³.', 'Volumen: 301,44 cm³.', 'الحجم: 301.44 سم³.', 'Volume: 301.44 cm³.') }
        ],
        takeaway: say('Piramidea eta konoa: prismaren eta zilindroaren herena. Altuera, ez apotema.', 'Pirámide y cono: un tercio del prisma y del cilindro. La altura, no la apotema.', 'الهرم والمخروط: ثلث المنشور والأسطوانة. الارتفاع لا العامد.', 'Pyramid and cone: a third of the prism and of the cylinder. The height, not the slant height.'),
        figure: (language) => <PyramidVolumeFigure language={language} />
    },
    {
        id: 'sphere-composite',
        stage: 'volumes',
        title: say('Esfera eta gorputz konposatuak', 'Esfera y cuerpos compuestos', 'الكرة والأجسام المركّبة', 'Sphere and composite solids'),
        goal: say('Esferaren bolumena kalkulatzea eta gorputz konposatuena zatitan banatuz.', 'Calcular el volumen de la esfera y el de cuerpos compuestos descomponiéndolos.', 'حساب حجم الكرة وحجم الأجسام المركّبة بتجزئتها.', 'Calculate the volume of a sphere and of composite solids by breaking them down.'),
        problem: say('Silo bat 3 m-ko erradioko eta 10 m-ko altuerako zilindro bat da, gainean esfera-erdi bat duela. Kalkulatu bolumena.', 'Un silo es un cilindro de 3 m de radio y 10 m de altura con una semiesfera encima. Calcula su volumen.', 'صومعة أسطوانة نصف قطرها 3 م وارتفاعها 10 م وفوقها نصف كرة. احسب حجمها.', 'A silo is a cylinder with a radius of 3 m and a height of 10 m with a hemisphere on top. Calculate its volume.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zilindroa.', 'El cilindro.', 'الأسطوانة.', 'The cylinder.'), math: same('$3{,}14\\cdot 3^{2}\\cdot 10=282{,}6$') },
            { text: say('Esfera-erdia: esferaren erdia.', 'La semiesfera: media esfera.', 'نصف الكرة: نصف الكرة الكاملة.', 'The hemisphere: half a sphere.'), math: same('$\\dfrac{2}{3}\\cdot 3{,}14\\cdot 3^{3}=56{,}52$') },
            { text: say('Batu: 339,12 m³.', 'Suma: 339,12 m³.', 'اجمع: 339.12 م³.', 'Sum: 339.12 m³.'), math: same('$282{,}6+56{,}52=339{,}12$') }
        ],
        takeaway: say('Esfera: 4/3 πr³. Konposatuak: banatu eta batu; zuloak kendu.', 'Esfera: 4/3 πr³. Compuestos: descompón y suma; los huecos se restan.', 'الكرة: 4/3 πr³. المركّبة: جزّئ واجمع؛ والتجاويف تُطرح.', 'Sphere: 4/3 πr³. Composite solids: break down and add; the holes are subtracted.'),
        figure: (language) => <CompoundSolidFigure language={language} />
    },

    /* ---------- 4. Similarity ---------- */
    {
        id: 'thales',
        stage: 'similarity',
        title: say('Talesen teorema', 'Teorema de Tales', 'مبرهنة طاليس', 'Thales\' theorem'),
        goal: say('Talesen teorema erabiltzea zuzen paraleloek mozten dituzten segmentuak kalkulatzeko.', 'Usar el teorema de Tales para calcular segmentos cortados por rectas paralelas.', 'استعمال مبرهنة طاليس لحساب القطع التي تقطعها مستقيمات متوازية.', 'Use Thales\' theorem to calculate line segments cut by parallel lines.'),
        needs: [
            { unit: 'dbh3/geometria-plana', topic: 'thales', title: { eu: 'Talesen teorema', es: 'El teorema de Tales', en: 'Thales\' theorem', ar: 'مبرهنة طاليس' } }
        ],
        problem: say('Hiru zuzen paralelok zuzen bat 4 cm eta 6 cm-ko segmentuetan mozten dute, eta beste bat 5 cm eta x-ko segmentuetan. Kalkulatu x.', 'Tres rectas paralelas cortan una recta en segmentos de 4 cm y 6 cm, y otra en segmentos de 5 cm y x. Calcula x.', 'ثلاثة مستقيمات متوازية تقطع مستقيمًا إلى قطعتين طولاهما 4 سم و6 سم، ومستقيمًا آخر إلى قطعتين 5 سم وx. احسب x.', 'Three parallel lines cut one straight line into segments of 4 cm and 6 cm, and another straight line into segments of 5 cm and x. Calculate x.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Proportzioa.', 'La proporción.', 'التناسب.', 'The proportion.'), math: same('$\\dfrac{4}{5}=\\dfrac{6}{x}$') },
            { text: say('Biderkadura gurutzatua.', 'Producto cruzado.', 'الضرب التبادلي.', 'Cross-multiplication.'), math: same('$4x=30\\ \\to\\ x=7{,}5$') }
        ],
        takeaway: say('Paraleloek mozten dituzten segmentuak proportzionalak dira.', 'Los segmentos que cortan las paralelas son proporcionales.', 'القطع التي تقطعها المتوازيات متناسبة.', 'The segments cut by the parallel lines are proportional.'),
        figure: (language) => <ThalesFigure language={language} />
    },
    {
        id: 'similar-triangles',
        stage: 'similarity',
        title: say('Triangelu antzekoak', 'Triángulos semejantes', 'المثلثات المتشابهة', 'Similar triangles'),
        goal: say('Bi triangelu antzekoak diren erabakitzea irizpideekin eta alde ezezagunak kalkulatzea.', 'Decidir con los criterios si dos triángulos son semejantes y calcular lados desconocidos.', 'الحكم بالمعايير على تشابه مثلثين وحساب أضلاع مجهولة.', 'Decide using the criteria whether two triangles are similar and calculate unknown sides.'),
        needs: [
            { unit: 'dbh3/geometria-plana', topic: 'similar-triangles', title: { eu: 'Triangelu antzekoak', es: 'Triángulos semejantes', en: 'Similar triangles', ar: 'المثلثات المتشابهة' } }
        ],
        problem: say('ABC triangeluan, AB = 12 cm. BC-ren paralelo batek AB D puntuan mozten du, AD = 4 cm izanik, eta AC E puntuan, AE = 5 cm izanik. Zenbat neurtzen du AC-k?', 'En el triángulo ABC, AB = 12 cm. Una paralela a BC corta a AB en D, con AD = 4 cm, y a AC en E, con AE = 5 cm. ¿Cuánto mide AC?', 'في المثلث ABC يكون AB = 12 سم. مستقيم يوازي BC يقطع AB في D حيث AD = 4 سم، ويقطع AC في E حيث AE = 5 سم. كم طول AC؟', 'In triangle ABC, AB = 12 cm. A line parallel to BC cuts AB at D, with AD = 4 cm, and AC at E, with AE = 5 cm. How long is AC?'),
        stepsKind: 'steps',
        steps: [
            { text: say('ADE eta ABC antzekoak dira: Talesen posizioa.', 'ADE y ABC son semejantes: posición de Tales.', 'ADE وABC متشابهان: وضع طاليس.', 'ADE and ABC are similar: Thales\' setup.'), math: same('$k=\\dfrac{12}{4}=3$') },
            { text: say('Biderkatu k-z.', 'Multiplica por k.', 'اضرب في k.', 'Multiply by k.'), math: same('$AC=3\\cdot 5=15$') }
        ],
        takeaway: say('Bi angelu berdin nahikoa dira. Paraleloak triangelu antzekoak sortzen ditu.', 'Bastan dos ángulos iguales. Una paralela forma triángulos semejantes.', 'تكفي زاويتان متساويتان. والمستقيم الموازي يكوّن مثلثين متشابهين.', 'Two equal angles are enough. A parallel line forms similar triangles.'),
        figure: (language) => <ThalesPositionFigure language={language} />
    },
    {
        id: 'right-theorems',
        stage: 'similarity',
        title: say('Altueraren eta katetoaren teoremak', 'Teoremas de la altura y del cateto', 'مبرهنتا الارتفاع والضلع القائم', 'Height and leg theorems'),
        goal: say('Triangelu angeluzuzenean hipotenusarekiko altuera eta katetoak proiekzioetatik kalkulatzea.', 'Calcular en un triángulo rectángulo la altura sobre la hipotenusa y los catetos a partir de las proyecciones.', 'حساب الارتفاع على الوتر والضلعين القائمين من المسقطين في المثلث القائم.', 'Calculate, in a right-angled triangle, the height to the hypotenuse and the legs from the projections.'),
        needs: [
            { unit: 'dbh3/geometria-plana', topic: 'pythagoras', title: { eu: 'Pitagorasen teorema', es: 'El teorema de Pitágoras', en: 'Pythagoras\' theorem', ar: 'مبرهنة فيثاغورس' } }
        ],
        problem: say('Triangelu angeluzuzen batean, katetoen proiekzioak hipotenusan 20 cm eta 22,05 cm dira. Kalkulatu altuera eta kateto txikia.', 'En un triángulo rectángulo, las proyecciones de los catetos sobre la hipotenusa miden 20 cm y 22,05 cm. Calcula la altura y el cateto menor.', 'في مثلث قائم، مسقطا الضلعين القائمين على الوتر 20 سم و22.05 سم. احسب الارتفاع والضلع القائم الأصغر.', 'In a right-angled triangle, the projections of the legs onto the hypotenuse are 20 cm and 22.05 cm. Calculate the height and the shorter leg.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Altueraren teorema.', 'Teorema de la altura.', 'مبرهنة الارتفاع.', 'Height theorem.'), math: same('$h^{2}=20\\cdot 22{,}05=441\\ \\to\\ h=21$') },
            { text: say('Hipotenusa.', 'La hipotenusa.', 'الوتر.', 'The hypotenuse.'), math: same('$a=20+22{,}05=42{,}05$') },
            { text: say('Katetoaren teorema, proiekzio txikiarekin.', 'Teorema del cateto, con la proyección menor.', 'مبرهنة الضلع القائم بالمسقط الأصغر.', 'Leg theorem, with the shorter projection.'), math: same('$c^{2}=42{,}05\\cdot 20=841\\ \\to\\ c=29$') }
        ],
        takeaway: say('Altuera: h² = m · n. Katetoa: b² = a · n, bere proiekzioarekin.', 'Altura: h² = m · n. Cateto: b² = a · n, con su proyección.', 'الارتفاع: h² = m · n. الضلع القائم: b² = a · n بمسقطه.', 'Height: h² = m · n. Leg: b² = a · n, using its projection.'),
        figure: (language) => <RightTheoremsFigure language={language} />
    },

    /* ---------- 5. Ratio of similarity and scales ---------- */
    {
        id: 'ratio-powers',
        stage: 'ratios',
        title: say('Azalerak eta bolumenak: k² eta k³', 'Áreas y volúmenes: k² y k³', 'المساحات والحجوم: k² وk³', 'Areas and volumes: k² and k³'),
        goal: say('Bi irudi edo gorputz antzekoren perimetro, azalera eta bolumenak antzekotasun-arrazoiarekin lotzea.', 'Relacionar perímetros, áreas y volúmenes de figuras y cuerpos semejantes con la razón de semejanza.', 'ربط محيطات ومساحات وحجوم الأشكال والأجسام المتشابهة بنسبة التشابه.', 'Relate the perimeters, areas and volumes of similar figures and solids using the scale factor.'),
        needs: [
            { unit: 'dbh3/geometria-plana', topic: 'scale-areas', title: { eu: 'Perimetroak, azalerak eta eskalak', es: 'Perímetros, áreas y escalas', en: 'Perimeters, areas and scales', ar: 'المحيطات والمساحات والمقاييس' } }
        ],
        problem: say('Bi gorputz antzekoren bolumenak 8 cm³ eta 343 cm³ dira. Zein da antzekotasun-arrazoia? Txikiaren azalera 12 cm² bada, zenbat da handiarena?', 'Dos cuerpos semejantes tienen 8 cm³ y 343 cm³ de volumen. ¿Cuál es la razón de semejanza? Si el área del pequeño es 12 cm², ¿cuánto es la del grande?', 'جسمان متشابهان حجماهما 8 سم³ و343 سم³. ما نسبة التشابه؟ وإذا كانت مساحة الصغير 12 سم² فكم مساحة الكبير؟', 'Two similar solids have volumes of 8 cm³ and 343 cm³. What is the scale factor? If the area of the smaller one is 12 cm², what is the area of the larger one?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bolumenen zatidura k³ da.', 'El cociente de volúmenes es k³.', 'نسبة الحجوم هي k³.', 'The ratio of the volumes is k³.'), math: same('$k^{3}=\\dfrac{343}{8}\\ \\to\\ k=\\dfrac{7}{2}=3{,}5$') },
            { text: say('Azalerak k²-z biderkatzen dira.', 'Las áreas se multiplican por k².', 'المساحات تُضرب في k².', 'The areas are multiplied by k².'), math: same('$12\\cdot 3{,}5^{2}=147$') }
        ],
        takeaway: say('Luzerak × k, azalerak × k², bolumenak × k³.', 'Longitudes × k, áreas × k², volúmenes × k³.', 'الأطوال × k، المساحات × k²، الحجوم × k³.', 'Lengths × k, areas × k², volumes × k³.'),
        figure: (language) => <VolumeRatioFigure language={language} />
    },
    {
        id: 'frustums',
        stage: 'ratios',
        title: say('Kono- eta piramide-enborrak', 'Troncos de cono y de pirámide', 'جذوع المخاريط والأهرام', 'Frustums of cones and pyramids'),
        goal: say('Enbor baten bolumena bi gorputz antzekoren arteko kenketa gisa kalkulatzea.', 'Calcular el volumen de un tronco como la diferencia de dos cuerpos semejantes.', 'حساب حجم الجذع بوصفه فرق جسمين متشابهين.', 'Calculate the volume of a frustum as the difference of two similar solids.'),
        problem: say('Piramide-enbor karratu baten oinarrien aldeak 40 cm eta 16 cm dira, eta altuera 9 cm. Kalkulatu bolumena.', 'Un tronco de pirámide cuadrangular tiene bases de 40 cm y 16 cm de lado y 9 cm de altura. Calcula su volumen.', 'جذع هرم رباعي ضلعا قاعدتيه 40 سم و16 سم وارتفاعه 9 سم. احسب حجمه.', 'A frustum of a square-based pyramid has bases with sides of 40 cm and 16 cm and a height of 9 cm. Calculate its volume.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Piramide txikiaren altuera, antzekotasunez.', 'Altura de la pirámide pequeña, por semejanza.', 'ارتفاع الهرم الصغير بالتشابه.', 'Height of the small pyramid, by similarity.'), math: same('$\\dfrac{x}{16}=\\dfrac{x+9}{40}\\ \\to\\ x=6$') },
            { text: say('Handia ken txikia.', 'La grande menos la pequeña.', 'الكبير ناقص الصغير.', 'The large one minus the small one.'), math: same('$\\dfrac{1600\\cdot 15}{3}-\\dfrac{256\\cdot 6}{3}=8000-512$') },
            { text: say('Bolumena: 7488 cm³.', 'Volumen: 7488 cm³.', 'الحجم: 7488 سم³.', 'Volume: 7,488 cm³.'), math: same('$8000-512=7488$') }
        ],
        takeaway: say('Enborra = gorputz handia − txikia; txikiaren altuera antzekotasunez.', 'Tronco = cuerpo grande − pequeño; la altura del pequeño, por semejanza.', 'الجذع = الجسم الكبير − الصغير؛ وارتفاع الصغير بالتشابه.', 'Frustum = large solid − small solid; the height of the small one, by similarity.'),
        figure: (language) => <FrustumFigure language={language} />
    },
    {
        id: 'models',
        stage: 'ratios',
        title: say('Maketak, planoak eta eskalak', 'Maquetas, planos y escalas', 'المجسّمات والمخططات والمقاييس', 'Scale models, plans and scales'),
        goal: say('Eskala batekin luzerak, azalerak eta bolumenak errealitatera eta alderantziz pasatzea.', 'Pasar longitudes, áreas y volúmenes de una escala a la realidad y al revés.', 'تحويل الأطوال والمساحات والحجوم من المقياس إلى الواقع وبالعكس.', 'Convert lengths, areas and volumes from a scale to reality and the other way round.'),
        needs: [
            { unit: 'dbh3/proporcionalidad', topic: 'scale', title: { eu: 'Eskalak: planoak eta mapak', es: 'Escalas: planos y mapas', en: 'Scales: plans and maps', ar: 'المقاييس: المخططات والخرائط' } }
        ],
        problem: say('1:200 eskalako maketa batean, eraikin batek 15 cm²-ko lurra hartzen du. Zenbat m² hartzen ditu eraikin errealak?', 'En una maqueta a escala 1:200, un edificio ocupa 15 cm² de suelo. ¿Cuántos m² ocupa el edificio real?', 'في مجسّم بمقياس 1:200 يشغل مبنى 15 سم² من الأرض. كم م² يشغل المبنى الحقيقي؟', 'On a model at a scale of 1:200, a building covers 15 cm² of ground. How many m² does the real building cover?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Azalerak n²-z biderkatzen dira.', 'Las áreas se multiplican por n².', 'المساحات تُضرب في n².', 'Areas are multiplied by n².'), math: same('$15\\cdot 200^{2}=600\\,000$') },
            { text: say('cm²-tik m²-ra: zati 10\u00a0000.', 'De cm² a m²: entre 10\u00a0000.', 'من سم² إلى م²: على 10\u00a0000.', 'From cm² to m²: divide by 10,000.'), math: same('$600\\,000\\mathbin{:}10\\,000=60$') }
        ],
        takeaway: say('1:n eskala: luzerak × n, azalerak × n², bolumenak × n³.', 'Escala 1:n: longitudes × n, áreas × n², volúmenes × n³.', 'المقياس 1:n: الأطوال × n، المساحات × n²، الحجوم × n³.', 'Scale 1:n: lengths × n, areas × n², volumes × n³.'),
        figure: (language) => <PlanFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const areasSimilarityTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...areasLessonTexts[topic.id as AreasTopicId], ...areasLessonChecks[topic.id as AreasTopicId] }))
