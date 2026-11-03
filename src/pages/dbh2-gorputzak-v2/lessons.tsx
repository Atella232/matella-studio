import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import {
    CapacityFigure,
    CavalieriFigure,
    ConeFigure,
    CylinderFigure,
    ElementsFigure,
    EulerFigure,
    FrustumAreaFigure,
    PrismAreaFigure,
    PrismVolumeFigure,
    PyramidAreaFigure,
    PyramidVolumeFigure,
    RegularFigure,
    SphereFigure,
    SphereVolumeFigure,
    VolumeUnitsFigure
} from './figures'
import { solidsLessonChecks, type SolidsTopicId } from './lessonChecks'
import { solidsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Gorputz geometrikoak · 2. DBH — stages and lessons, following Anaya 2.º
   ESO units 11 (Cuerpos geométricos) and 12 (Medida del volumen) and
   Santillana 2.º ESO units 11 (Cuerpos geométricos. Áreas) and 12
   (Volumen): elements of polyhedra, Euler and the regular polyhedra; areas
   of prisms, pyramids and frustums; cylinder, cone and sphere; units of
   volume and capacity with Cavalieri; and the volumes. π ≈ 3,14.
   ========================================================================== */

export type SolidsStageId = 'polyhedra' | 'areas' | 'round' | 'units' | 'volume'

export const solidsStages: UnitStage[] = [
    { id: 'polyhedra', tone: 'blue', title: { eu: 'Poliedroak', es: 'Poliedros', en: 'Polyhedra', ar: 'متعددات الأوجه' } },
    { id: 'areas', tone: 'violet', title: { eu: 'Poliedroen azalerak', es: 'Áreas de poliedros', en: 'Areas of polyhedra', ar: 'مساحات متعددات الأوجه' } },
    { id: 'round', tone: 'mustard', title: { eu: 'Biraketa-gorputzak', es: 'Cuerpos de revolución', en: 'Solids of revolution', ar: 'الأجسام الدورانية' } },
    { id: 'units', tone: 'coral', title: { eu: 'Bolumena eta edukiera', es: 'Volumen y capacidad', en: 'Volume and capacity', ar: 'الحجم والسعة' } },
    { id: 'volume', tone: 'green', title: { eu: 'Gorputzen bolumena', es: 'Volumen de los cuerpos', en: 'Volume of solids', ar: 'حجوم الأجسام' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Polyhedra ---------- */
    {
        id: 'elements',
        stage: 'polyhedra',
        title: say('Poliedroen elementuak', 'Elementos de los poliedros', 'عناصر متعددات الأوجه', 'Elements of polyhedra'),
        goal: say('Poliedro baten aurpegiak, ertzak eta erpinak ezagutzea eta prismak eta piramideak bereiztea.', 'Reconocer las caras, aristas y vértices de un poliedro y distinguir prismas y pirámides.', 'التعرّف إلى أوجه متعدد الأوجه وأحرفه ورؤوسه والتمييز بين المناشير والأهرامات.', 'Recognise the faces, edges and vertices of a polyhedron, and tell prisms and pyramids apart.'),
        problem: say('Zenbat aurpegi, ertz eta erpin ditu prisma hexagonal batek? Eta piramide hexagonal batek?', '¿Cuántas caras, aristas y vértices tiene un prisma hexagonal? ¿Y una pirámide hexagonal?', 'كم وجهًا وحرفًا ورأسًا للمنشور السداسي؟ وللهرم السداسي؟', 'How many faces, edges and vertices does a hexagonal prism have? And a hexagonal pyramid?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hexagonoa: $n=6$ alde.', 'Hexágono: $n=6$ lados.', 'المسدس: $n=6$ أضلاع.', 'Hexagon: $n=6$ sides.') },
            { text: say('Prisma: 6 alboko aurpegi eta 2 oinarri; ertzak 6 + 6 + 6; erpinak 6 + 6.', 'Prisma: 6 caras laterales y 2 bases; aristas 6 + 6 + 6; vértices 6 + 6.', 'المنشور: 6 أوجه جانبية وقاعدتان؛ الأحرف 6 + 6 + 6؛ الرؤوس 6 + 6.', 'Prism: 6 lateral faces and 2 bases; edges 6 + 6 + 6; vertices 6 + 6.'), math: same('$8,\\ 18,\\ 12$') },
            { text: say('Piramidea: 6 triangelu eta oinarria; 6 oinarrian eta 6 erpinera; 6 + 1 erpin.', 'Pirámide: 6 triángulos y la base; 6 aristas en la base y 6 hacia el vértice; 6 + 1 vértices.', 'الهرم: 6 مثلثات والقاعدة؛ 6 أحرف في القاعدة و6 نحو الرأس؛ 6 + 1 رؤوس.', 'Pyramid: 6 triangles and the base; 6 edges on the base and 6 going up to the top vertex; 6 + 1 vertices.'), math: same('$7,\\ 12,\\ 7$') }
        ],
        takeaway: say('Aurpegiak poligonoak dira, ertzak lerroak eta erpinak puntuak. Prismak bi oinarri, piramideak bat.', 'Las caras son polígonos, las aristas líneas y los vértices puntos. El prisma tiene dos bases; la pirámide, una.', 'الأوجه مضلعات، والأحرف خطوط، والرؤوس نقاط. للمنشور قاعدتان وللهرم قاعدة واحدة.', 'Faces are polygons, edges are lines and vertices are points. The prism has two bases; the pyramid has one.'),
        figure: (language) => <ElementsFigure language={language} />
    },
    {
        id: 'euler',
        stage: 'polyhedra',
        title: say('Eulerren formula', 'La fórmula de Euler', 'صيغة أويلر', 'Euler\'s formula'),
        goal: say('Poliedro ganbiletan aurpegien, erpinen eta ertzen arteko erlazioa egiaztatzea eta erabiltzea.', 'Comprobar y usar la relación entre caras, vértices y aristas de los poliedros convexos.', 'التحقق من العلاقة بين الأوجه والرؤوس والأحرف في متعددات الأوجه المحدّبة واستعمالها.', 'Check and use the relationship between the faces, vertices and edges of convex polyhedra.'),
        problem: say('Poliedro ganbil batek 9 aurpegi eta 16 ertz ditu. Zenbat erpin ditu?', 'Un poliedro convexo tiene 9 caras y 16 aristas. ¿Cuántos vértices tiene?', 'متعدد أوجه محدّب له 9 أوجه و16 حرفًا. كم رأسًا له؟', 'A convex polyhedron has 9 faces and 16 edges. How many vertices does it have?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi formula datuekin.', 'Escribe la fórmula con los datos.', 'اكتب الصيغة بالمعطيات.', 'Write the formula with the data.'), math: say('$9+E=16+2$', '$9+V=16+2$', '$9+V=16+2$', '$9+V=16+2$') },
            { text: say('Askatu erpinak.', 'Despeja los vértices.', 'استخرج عدد الرؤوس.', 'Solve for the vertices.'), math: same('$18-9=9$') },
            { text: say('Egiaztatu: adibidez, piramide oktogonal bat (9, 16, 9).','Comprueba: por ejemplo, una pirámide octogonal (9, 16, 9).', 'تحقّق: مثلًا هرم ثماني (9، 16، 9).', 'Check: for example, an octagonal pyramid (9, 16, 9).') }
        ],
        takeaway: say('Poliedro ganbiletan: aurpegiak + erpinak = ertzak + 2.', 'En los poliedros convexos: caras + vértices = aristas + 2.', 'في متعددات الأوجه المحدّبة: الأوجه + الرؤوس = الأحرف + 2.', 'For convex polyhedra: faces + vertices = edges + 2.'),
        figure: (language) => <EulerFigure language={language} />
    },
    {
        id: 'regular',
        stage: 'polyhedra',
        title: say('Poliedro erregularrak', 'Poliedros regulares', 'متعددات الأوجه المنتظمة', 'Regular polyhedra'),
        goal: say('Bost poliedro erregularrak ezagutzea eta zergatik ez dagoen besterik azaltzea.', 'Conocer los cinco poliedros regulares y explicar por qué no hay más.', 'معرفة متعددات الأوجه المنتظمة الخمسة وتفسير عدم وجود غيرها.', 'Know the five regular polyhedra and explain why there are no more.'),
        problem: say('Zenbat ertz ditu ikosaedroak? (20 triangelu; erpin bakoitzean 5 aurpegi)', '¿Cuántas aristas tiene el icosaedro? (20 triángulos; 5 caras en cada vértice)', 'كم حرفًا لعشريني الأوجه؟ (20 مثلثًا؛ 5 أوجه عند كل رأس)', 'How many edges does the icosahedron have? (20 triangles; 5 faces at each vertex)'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zenbatu triangeluen alde guztiak.', 'Cuenta todos los lados de los triángulos.', 'عُدّ جميع أضلاع المثلثات.', 'Count all the sides of the triangles.'), math: same('$20\\cdot 3=60$') },
            { text: say('Ertz bakoitza bi aurpegik partekatzen dute: zatitu 2 zenbakiaz.', 'Cada arista la comparten dos caras: divide entre 2.', 'كل حرف مشترك بين وجهين: اقسم على 2.', 'Each edge is shared by two faces: divide by 2.'), math: same('$60\\mathbin{:}2=30$') },
            { text: say('Erpinak: 60 erpin, 5 aurpegitan banatuta.', 'Vértices: 60 esquinas repartidas de 5 en 5.', 'الرؤوس: 60 زاوية موزعة خمسًا خمسًا.', 'Vertices: 60 corners, grouped in fives.'), math: same('$60\\mathbin{:}5=12$') }
        ],
        takeaway: say('Bost poliedro erregular: tetraedroa, kuboa, oktaedroa, dodekaedroa eta ikosaedroa.', 'Cinco poliedros regulares: tetraedro, cubo, octaedro, dodecaedro e icosaedro.', 'خمسة متعددات أوجه منتظمة: رباعي الأوجه، والمكعب، وثماني الأوجه، واثنا عشري الأوجه، وعشريني الأوجه.', 'Five regular polyhedra: tetrahedron, cube, octahedron, dodecahedron and icosahedron.'),
        figure: (language) => <RegularFigure language={language} />
    },

    /* ---------- 2. Areas of polyhedra ---------- */
    {
        id: 'prism-area',
        stage: 'areas',
        needs: [{ unit: 'dbh1/geometria', topic: 'area-circle', title: { eu: 'Poligono erregularren eta zirkuluaren azalera', es: 'Área de polígonos regulares y del círculo', en: 'Area of regular polygons and of the circle', ar: 'مساحة المضلعات المنتظمة والقرص' } }],
        title: say('Prismaren azalera', 'Área del prisma', 'مساحة المنشور', 'Area of a prism'),
        goal: say('Prisma baten garapena marraztea eta alboko azalera eta azalera osoa kalkulatzea.', 'Dibujar el desarrollo de un prisma y calcular su área lateral y total.', 'رسم نشر المنشور وحساب مساحته الجانبية والكلية.', 'Draw the net of a prism and calculate its lateral and total area.'),
        problem: say('Ortoedro baten neurriak 4 cm, 3 cm eta 12 cm dira. Kalkulatu azalera osoa.', 'Las dimensiones de un ortoedro son 4 cm, 3 cm y 12 cm. Calcula su área total.', 'أبعاد متوازي مستطيلات 4 سم و3 سم و12 سم. احسب مساحته الكلية.', 'The dimensions of a cuboid are 4 cm, 3 cm and 12 cm. Calculate its total area.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hiru laukizuzen desberdinak.', 'Los tres rectángulos distintos.', 'المستطيلات الثلاثة المختلفة.', 'The three different rectangles.'), math: same('$4\\cdot 3=12\\quad 4\\cdot 12=48\\quad 3\\cdot 12=36$') },
            { text: say('Bakoitza bi aldiz dago.', 'Cada uno está dos veces.', 'كل منها مرتان.', 'Each one appears twice.'), math: same('$2\\cdot (12+48+36)=192$') },
            { text: say('Azalera osoa: 192 cm².', 'Área total: 192 cm².', 'المساحة الكلية: 192 سم².', 'Total area: 192 cm².') }
        ],
        takeaway: say('Alboko azalera: perimetroa bider altuera. Gero gehitu bi oinarriak.', 'Área lateral: perímetro por altura. Luego suma las dos bases.', 'المساحة الجانبية: المحيط في الارتفاع. ثم أضف القاعدتين.', 'Lateral area: perimeter times height. Then add the two bases.'),
        figure: (language) => <PrismAreaFigure language={language} />
    },
    {
        id: 'pyramid-area',
        stage: 'areas',
        needs: [{ unit: 'dbh2/teorema-pitagoras', topic: 'hypotenuse', title: { eu: 'Hipotenusa kalkulatu', es: 'Calcular la hipotenusa', en: 'Calculate the hypotenuse', ar: 'حساب الوتر' } }],
        title: say('Piramidearen azalera', 'Área de la pirámide', 'مساحة الهرم', 'Area of a pyramid'),
        goal: say('Piramide erregular baten azalera kalkulatzea, apotema Pitagorasekin aurkituz behar denean.', 'Calcular el área de una pirámide regular, hallando la apotema con Pitágoras cuando haga falta.', 'حساب مساحة هرم منتظم، مع إيجاد العامد بفيثاغورس عند الحاجة.', 'Calculate the area of a regular pyramid, finding the slant height with Pythagoras when needed.'),
        problem: say('Piramide erregular baten oinarria 6 dm-ko aldeko karratua da, eta altuera 4 dm. Kalkulatu azalera osoa.', 'La base de una pirámide regular es un cuadrado de 6 dm de lado y su altura mide 4 dm. Calcula su área total.', 'قاعدة هرم منتظم مربع طول ضلعه 6 دسم وارتفاعه 4 دسم. احسب مساحته الكلية.', 'The base of a regular pyramid is a square with a side of 6 dm, and its height is 4 dm. Calculate its total area.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Apotema: altuera eta aldearen erdia katetoak dira.', 'Apotema: la altura y medio lado son los catetos.', 'العامد: الارتفاع ونصف الضلع هما الضلعان القائمان.', 'Slant height: the height and half a side are the legs.'), math: same('$a=\\sqrt{4^{2}+3^{2}}=5$') },
            { text: say('Lau triangelu.', 'Cuatro triángulos.', 'أربعة مثلثات.', 'Four triangles.'), math: same('$4\\cdot \\frac{6\\cdot 5}{2}=60$') },
            { text: say('Gehitu oinarria.', 'Suma la base.', 'أضف القاعدة.', 'Add the base.'), math: same('$60+36=96$') }
        ],
        takeaway: say('Alboko azalera: perimetroa bider piramidearen apotema, zati bi. Apotema ≠ altuera.', 'Área lateral: perímetro por apotema de la pirámide entre dos. Apotema ≠ altura.', 'المساحة الجانبية: المحيط في عامد الهرم على اثنين. العامد ≠ الارتفاع.', 'Lateral area: perimeter times the slant height of the pyramid, divided by two. Slant height ≠ height.'),
        figure: (language) => <PyramidAreaFigure language={language} />
    },
    {
        id: 'frustum-area',
        stage: 'areas',
        needs: [{ unit: 'dbh2/teorema-pitagoras', topic: 'trapezoid', title: { eu: 'Trapezioak', es: 'Trapecios', en: 'Trapeziums', ar: 'أشباه المنحرف' } }],
        figureAfterSteps: true,
        title: say('Piramide-enborraren azalera', 'Área del tronco de pirámide', 'مساحة جذع الهرم', 'Area of a truncated pyramid'),
        goal: say('Piramide-enbor baten azalera kalkulatzea alboko trapezioak eta bi oinarriak batuz.', 'Calcular el área de un tronco de pirámide sumando los trapecios laterales y las dos bases.', 'حساب مساحة جذع الهرم بجمع أشباه المنحرفات الجانبية والقاعدتين.', 'Calculate the area of a truncated pyramid by adding the lateral trapeziums and the two bases.'),
        problem: say('Piramide-enbor erregular baten oinarriak 20 cm eta 10 cm-ko aldeko karratuak dira, eta alboko ertzak 13 cm. Kalkulatu azalera osoa.', 'Las bases de un tronco de pirámide regular son cuadrados de 20 cm y 10 cm de lado, y las aristas laterales miden 13 cm. Calcula su área total.', 'قاعدتا جذع هرم منتظم مربعان طولا ضلعيهما 20 سم و10 سم، وأحرفه الجانبية 13 سم. احسب مساحته الكلية.', 'The bases of a regular truncated pyramid are squares with sides of 20 cm and 10 cm, and the lateral edges measure 13 cm. Calculate its total area.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Trapezioaren altuera: katetoa $(20-10)\\mathbin{:}2=5$.', 'Altura del trapecio: cateto $(20-10)\\mathbin{:}2=5$.', 'ارتفاع شبه المنحرف: الضلع القائم $(20-10)\\mathbin{:}2=5$.', 'Height of the trapezium: leg $(20-10)\\mathbin{:}2=5$.'), math: same('$\\sqrt{13^{2}-5^{2}}=12$') },
            { text: say('Lau trapezio.', 'Cuatro trapecios.', 'أربعة أشباه منحرفات.', 'Four trapeziums.'), math: same('$4\\cdot \\frac{(20+10)\\cdot 12}{2}=720$') },
            { text: say('Gehitu bi oinarriak.', 'Suma las dos bases.', 'أضف القاعدتين.', 'Add the two bases.'), math: same('$720+400+100=1220$') }
        ],
        takeaway: say('Enborra: trapezioak gehi bi oinarri. Apotema trapezioaren altuera da.', 'Tronco: trapecios más dos bases. La apotema es la altura del trapecio.', 'الجذع: أشباه منحرفات مع قاعدتين. العامد ارتفاع شبه المنحرف.', 'Truncated pyramid: trapeziums plus two bases. The slant height is the height of the trapezium.'),
        figure: (language) => <FrustumAreaFigure language={language} />
    },

    /* ---------- 3. Bodies of revolution ---------- */
    {
        id: 'cylinder',
        stage: 'round',
        needs: [{ unit: 'dbh1/geometria', topic: 'circumference', title: { eu: 'Zirkunferentziaren luzera', es: 'Longitud de la circunferencia', en: 'Length of the circumference', ar: 'طول الدائرة' } }],
        title: say('Zilindroa', 'El cilindro', 'الأسطوانة', 'The cylinder'),
        goal: say('Zilindroa biraketa-gorputz gisa ulertzea eta haren azalera garapenetik kalkulatzea.', 'Entender el cilindro como cuerpo de revolución y calcular su área a partir del desarrollo.', 'فهم الأسطوانة جسمًا دورانيًا وحساب مساحتها من نشرها.', 'Understand the cylinder as a solid of revolution and calculate its area from its net.'),
        problem: say('Ur-biltegi zilindriko itxi batek 0,5 m-ko erradioa eta 2 m-ko altuera ditu. Zenbat txapa behar da?', 'Un depósito cilíndrico cerrado tiene 0,5 m de radio y 2 m de altura. ¿Cuánta chapa hace falta?', 'خزان أسطواني مغلق نصف قطره 0.5 م وارتفاعه 2 م. كم يلزم من الصفيح؟', 'A closed cylindrical tank has a radius of 0.5 m and a height of 2 m. How much sheet metal is needed?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Alboko azalera.', 'Área lateral.', 'المساحة الجانبية.', 'Lateral area.'), math: same('$2\\cdot 3{,}14\\cdot 0{,}5\\cdot 2=6{,}28$') },
            { text: say('Bi oinarriak.', 'Las dos bases.', 'القاعدتان.', 'The two bases.'), math: same('$2\\cdot 3{,}14\\cdot 0{,}5^{2}=1{,}57$') },
            { text: say('Guztira 7,85 m².', 'En total, 7,85 m².', 'المجموع 7.85 م².', 'In total, 7.85 m².'), math: same('$6{,}28+1{,}57=7{,}85$') }
        ],
        takeaway: say('Zilindroa: laukizuzen bat ($2\\pi r$ zabal) eta bi zirkulu.', 'Cilindro: un rectángulo ($2\\pi r$ de ancho) y dos círculos.', 'الأسطوانة: مستطيل (عرضه $2\\pi r$) ودائرتان.', 'Cylinder: a rectangle (with a width of $2\\pi r$) and two circles.'),
        figure: (language) => <CylinderFigure language={language} />
    },
    {
        id: 'cone',
        stage: 'round',
        needs: [{ unit: 'dbh2/teorema-pitagoras', topic: 'hypotenuse', title: { eu: 'Hipotenusa kalkulatu', es: 'Calcular la hipotenusa', en: 'Calculate the hypotenuse', ar: 'حساب الوتر' } }],
        figureAfterSteps: true,
        title: say('Konoa eta kono-enborra', 'El cono y el tronco de cono', 'المخروط وجذع المخروط', 'The cone and the truncated cone'),
        goal: say('Konoaren elementuak lotzea Pitagorasekin eta konoaren eta kono-enborraren azalera kalkulatzea.', 'Relacionar los elementos del cono con Pitágoras y calcular el área del cono y del tronco de cono.', 'ربط عناصر المخروط بفيثاغورس وحساب مساحة المخروط وجذع المخروط.', 'Relate the parts of the cone using Pythagoras\' theorem, and calculate the area of the cone and of the truncated cone.'),
        problem: say('Kono batek 6 cm-ko erradioa eta 8 cm-ko altuera ditu. Kalkulatu azalera osoa.', 'Un cono tiene 6 cm de radio y 8 cm de altura. Calcula su área total.', 'مخروط نصف قطره 6 سم وارتفاعه 8 سم. احسب مساحته الكلية.', 'A cone has a radius of 6 cm and a height of 8 cm. Calculate its total area.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Sortzailea.', 'Generatriz.', 'الراسم.', 'Slant height.'), math: same('$g=\\sqrt{8^{2}+6^{2}}=10$') },
            { text: say('Alboko azalera.', 'Área lateral.', 'المساحة الجانبية.', 'Lateral area.'), math: same('$3{,}14\\cdot 6\\cdot 10=188{,}4$') },
            { text: say('Gehitu oinarria.', 'Suma la base.', 'أضف القاعدة.', 'Add the base.'), math: same('$188{,}4+3{,}14\\cdot 36=301{,}44$') }
        ],
        takeaway: say('Konoa: $g^{2}=h^{2}+r^{2}$ eta $A_L=\\pi r g$. Ez nahastu altuera eta sortzailea.', 'Cono: $g^{2}=h^{2}+r^{2}$ y $A_L=\\pi r g$. No confundas altura y generatriz.', 'المخروط: $g^{2}=h^{2}+r^{2}$ و$A_L=\\pi r g$. لا تخلط بين الارتفاع والراسم.', 'Cone: $g^{2}=h^{2}+r^{2}$ and $A_L=\\pi r g$. Don\'t confuse height and slant height.'),
        figure: (language) => <ConeFigure language={language} />
    },
    {
        id: 'sphere',
        stage: 'round',
        title: say('Esfera', 'La esfera', 'الكرة', 'The sphere'),
        goal: say('Esferaren, kasketaren eta zona esferikoaren azalera kalkulatzea eta esferaren sekzioak ulertzea.', 'Calcular el área de la esfera, del casquete y de la zona esférica y entender las secciones de la esfera.', 'حساب مساحة الكرة والقبعة والمنطقة الكروية وفهم مقاطع الكرة.', 'Calculate the area of the sphere, the spherical cap and the spherical zone, and understand the sections of the sphere.'),
        problem: say('Kalkulatu 10 cm-ko erradioko esfera baten azalera eta 4 cm-ko altuerako zona batena.', 'Calcula el área de una esfera de 10 cm de radio y la de una zona de 4 cm de altura.', 'احسب مساحة كرة نصف قطرها 10 سم ومساحة منطقة ارتفاعها 4 سم.', 'Calculate the area of a sphere with a radius of 10 cm and that of a zone 4 cm high.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Esfera osoa.', 'Esfera completa.', 'الكرة كاملة.', 'Whole sphere.'), math: same('$4\\cdot 3{,}14\\cdot 10^{2}=1256$') },
            { text: say('Zona: zilindroaren banda.', 'Zona: la banda del cilindro.', 'المنطقة: شريط الأسطوانة.', 'Zone: the band of the cylinder.'), math: same('$2\\cdot 3{,}14\\cdot 10\\cdot 4=251{,}2$') }
        ],
        takeaway: say('Esfera: $4\\pi r^{2}$. Zona eta kasketa: $2\\pi r h$.', 'Esfera: $4\\pi r^{2}$. Zona y casquete: $2\\pi r h$.', 'الكرة: $4\\pi r^{2}$. المنطقة والقبعة: $2\\pi r h$.', 'Sphere: $4\\pi r^{2}$. Zone and cap: $2\\pi r h$.'),
        figure: (language) => <SphereFigure language={language} />
    },

    /* ---------- 4. Volume and capacity ---------- */
    {
        id: 'volume-units',
        stage: 'units',
        needs: [{ unit: 'dbh1/geometria', topic: 'units', title: { eu: 'Luzera- eta azalera-unitateak', es: 'Unidades de longitud y superficie', en: 'Units of length and area', ar: 'وحدات الطول والمساحة' } }],
        title: say('Bolumen-unitateak', 'Unidades de volumen', 'وحدات الحجم', 'Units of volume'),
        goal: say('Bolumen-unitateak elkarren artean aldatzea, mailaz maila 1000 bider biderkatuz edo zatituz.', 'Pasar de unas unidades de volumen a otras, multiplicando o dividiendo por 1000 en cada escalón.', 'التحويل بين وحدات الحجم بالضرب أو القسمة على 1000 في كل درجة.', 'Convert between units of volume by multiplying or dividing by 1000 at each step.'),
        problem: say('Adierazi 0,3 m³ cm³-tan.', 'Expresa 0,3 m³ en cm³.', 'عبّر عن 0.3 م³ بالسنتيمتر المكعب.', 'Express 0.3 m³ in cm³.'),
        stepsKind: 'steps',
        steps: [
            { text: say('m³-tik cm³-ra bi maila jaisten dira.', 'De m³ a cm³ se bajan dos escalones.', 'من m³ إلى cm³ ننزل درجتين.', 'Going from m³ to cm³ means going down two steps.'), math: same('$1000\\cdot 1000=1\\,000\\,000$') },
            { text: say('Biderkatu.', 'Multiplica.', 'اضرب.', 'Multiply.'), math: same('$0{,}3\\cdot 1\\,000\\,000=300\\,000$') }
        ],
        takeaway: say('Bolumenean maila bakoitza 1000 da: hiru zifra koma bakoitzeko jauzian.', 'En volumen, cada escalón es 1000: tres cifras por salto.', 'في الحجم كل درجة 1000: ثلاثة أرقام لكل قفزة.', 'For volume, each step is 1000: three places per jump.'),
        figure: (language) => <VolumeUnitsFigure language={language} />
    },
    {
        id: 'capacity',
        stage: 'units',
        title: say('Bolumena eta edukiera', 'Volumen y capacidad', 'الحجم والسعة', 'Volume and capacity'),
        goal: say('Bolumen-unitateak eta edukiera-unitateak lotzea: 1 dm³ = 1 L.', 'Relacionar las unidades de volumen con las de capacidad: 1 dm³ = 1 L.', 'ربط وحدات الحجم بوحدات السعة: 1 dm³ = 1 L.', 'Link units of volume with units of capacity: 1 dm³ = 1 L.'),
        problem: say('Igerileku batek 12 m × 6 m × 1,5 m neurtzen ditu. Zenbat litro ur sartzen dira?', 'Una piscina mide 12 m × 6 m × 1,5 m. ¿Cuántos litros de agua caben?', 'مسبح أبعاده 12 م × 6 م × 1.5 م. كم لترًا من الماء يسع؟', 'A swimming pool measures 12 m × 6 m × 1.5 m. How many litres of water fit in it?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bolumena m³-tan.', 'Volumen en m³.', 'الحجم بالمتر المكعب.', 'Volume in m³.'), math: same('$12\\cdot 6\\cdot 1{,}5=108$') },
            { text: say('1 m³ = 1000 L.', '1 m³ = 1000 L.', '1 m³ = 1000 L.', '1 m³ = 1,000 L.'), math: same('$108\\cdot 1000=108\\,000$') }
        ],
        takeaway: say('1 dm³ = 1 L = 1 kg ur. 1 m³ = 1000 L.', '1 dm³ = 1 L = 1 kg de agua. 1 m³ = 1000 L.', '1 dm³ = 1 L = 1 kg من الماء. 1 m³ = 1000 L.', '1 dm³ = 1 L = 1 kg of water. 1 m³ = 1000 L.'),
        figure: (language) => <CapacityFigure language={language} />
    },
    {
        id: 'cavalieri',
        stage: 'units',
        title: say('Ortoedroa eta Cavalieriren printzipioa', 'El ortoedro y el principio de Cavalieri', 'متوازي المستطيلات ومبدأ كافاليري', 'The cuboid and Cavalieri\'s principle'),
        goal: say('Ortoedroaren bolumena unitate-kuboak zenbatuz ulertzea eta Cavalieriren printzipioa aplikatzea.', 'Entender el volumen del ortoedro contando cubos unidad y aplicar el principio de Cavalieri.', 'فهم حجم متوازي المستطيلات بعدّ مكعبات الوحدة وتطبيق مبدأ كافاليري.', 'Understand the volume of a cuboid by counting unit cubes, and apply Cavalieri\'s principle.'),
        problem: say('Kaxa batek 25 cm × 20 cm × 16 cm neurtzen ditu. Zein da haren bolumena litrotan?', 'Una caja mide 25 cm × 20 cm × 16 cm. ¿Cuál es su volumen en litros?', 'صندوق أبعاده 25 سم × 20 سم × 16 سم. ما حجمه باللتر؟', 'A box measures 25 cm × 20 cm × 16 cm. What is its volume in litres?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu hiru neurriak.', 'Multiplica las tres medidas.', 'اضرب الأبعاد الثلاثة.', 'Multiply the three dimensions.'), math: same('$25\\cdot 20\\cdot 16=8000$') },
            { text: say('1000 cm³ = 1 L.', '1000 cm³ = 1 L.', '1000 cm³ = 1 L.', '1000 cm³ = 1 L.'), math: same('$8000\\mathbin{:}1000=8$') }
        ],
        takeaway: say('Ortoedroa: luzera · zabalera · altuera. Sekzio berdinak eta altuera bera → bolumen bera.', 'Ortoedro: largo · ancho · alto. Mismas secciones y misma altura → mismo volumen.', 'متوازي المستطيلات: الطول · العرض · الارتفاع. مقاطع متساوية وارتفاع واحد ← حجم واحد.', 'Cuboid: length · width · height. Same cross-sections and same height → same volume.'),
        figure: (language) => <CavalieriFigure language={language} />
    },

    /* ---------- 5. Volumes ---------- */
    {
        id: 'prism-volume',
        stage: 'volume',
        needs: [{ unit: 'dbh1/geometria', topic: 'area-triangle', title: { eu: 'Triangeluaren, erronboaren eta trapezioaren azalera', es: 'Área del triángulo, del rombo y del trapecio', en: 'Area of the triangle, the rhombus and the trapezium', ar: 'مساحة المثلث والمعيّن وشبه المنحرف' } }],
        title: say('Prismaren eta zilindroaren bolumena', 'Volumen del prisma y del cilindro', 'حجم المنشور والأسطوانة', 'Volume of prisms and cylinders'),
        goal: say('Prismen eta zilindroen bolumena oinarriaren azalera bider altuera gisa kalkulatzea.', 'Calcular el volumen de prismas y cilindros como área de la base por altura.', 'حساب حجم المناشير والأسطوانات بوصفه مساحة القاعدة في الارتفاع.', 'Calculate the volume of prisms and cylinders as the area of the base times the height.'),
        problem: say('Lata zilindriko batek 4 cm-ko erradioa eta 10 cm-ko altuera ditu. Zenbat cm³ sartzen dira?', 'Una lata cilíndrica tiene 4 cm de radio y 10 cm de altura. ¿Cuántos cm³ caben?', 'علبة أسطوانية نصف قطرها 4 سم وارتفاعها 10 سم. كم سم³ تسع؟', 'A cylindrical can has a radius of 4 cm and a height of 10 cm. How many cm³ does it hold?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Oinarria: zirkulua.', 'Base: un círculo.', 'القاعدة: دائرة.', 'Base: a circle.'), math: same('$3{,}14\\cdot 4^{2}=50{,}24$') },
            { text: say('Bider altuera.', 'Por la altura.', 'في الارتفاع.', 'Times the height.'), math: same('$50{,}24\\cdot 10=502{,}4$') },
            { text: say('Ia erdi litro: 0,5024 L.', 'Casi medio litro: 0,5024 L.', 'نحو نصف لتر: 0.5024 L.', 'Almost half a litre: 0.5024 L.') }
        ],
        takeaway: say('Prisma eta zilindroa: oinarriaren azalera bider altuera.', 'Prisma y cilindro: área de la base por altura.', 'المنشور والأسطوانة: مساحة القاعدة في الارتفاع.', 'Prism and cylinder: area of the base times the height.'),
        figure: (language) => <PrismVolumeFigure language={language} />
    },
    {
        id: 'pyramid-volume',
        stage: 'volume',
        needs: [{ unit: 'dbh2/teorema-pitagoras', topic: 'leg', title: { eu: 'Katetoa kalkulatu', es: 'Calcular un cateto', en: 'Calculate a leg', ar: 'حساب ضلع قائم' } }],
        figureAfterSteps: true,
        title: say('Piramidearen eta konoaren bolumena', 'Volumen de la pirámide y del cono', 'حجم الهرم والمخروط', 'Volume of pyramids and cones'),
        goal: say('Piramideen eta konoen bolumena prisma eta zilindro baten heren gisa kalkulatzea.', 'Calcular el volumen de pirámides y conos como un tercio de un prisma y un cilindro.', 'حساب حجم الأهرامات والمخاريط بوصفه ثلث منشور وأسطوانة.', 'Calculate the volume of pyramids and cones as one third of a prism and a cylinder.'),
        problem: say('Kono baten sortzailea 10 cm da eta erradioa 6 cm. Kalkulatu bolumena.', 'La generatriz de un cono mide 10 cm y el radio 6 cm. Calcula su volumen.', 'راسم مخروط 10 سم ونصف قطره 6 سم. احسب حجمه.', 'The slant height of a cone is 10 cm and its radius is 6 cm. Calculate its volume.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Altuera Pitagorasekin.', 'La altura con Pitágoras.', 'الارتفاع بفيثاغورس.', 'The height, using Pythagoras\' theorem.'), math: same('$h=\\sqrt{10^{2}-6^{2}}=8$') },
            { text: say('Zilindroaren herena.', 'Un tercio del cilindro.', 'ثلث الأسطوانة.', 'A third of the cylinder.'), math: same('$\\frac{3{,}14\\cdot 36\\cdot 8}{3}=301{,}44$') }
        ],
        takeaway: say('Piramidea eta konoa: prismaren eta zilindroaren herena. Altuera, ez apotema.', 'Pirámide y cono: un tercio del prisma y del cilindro. Altura, no apotema.', 'الهرم والمخروط: ثلث المنشور والأسطوانة. الارتفاع لا العامد.', 'Pyramid and cone: one third of the prism and of the cylinder. Height, not apothem.'),
        figure: (language) => <PyramidVolumeFigure language={language} />
    },
    {
        id: 'sphere-volume',
        stage: 'volume',
        figureAfterSteps: true,
        title: say('Esferaren bolumena eta problemak', 'Volumen de la esfera y problemas', 'حجم الكرة والمسائل', 'Volume of the sphere and problem solving'),
        goal: say('Esferaren bolumena kalkulatzea eta gorputz konposatuen eta eguneroko bolumen-problemak ebaztea.', 'Calcular el volumen de la esfera y resolver problemas de cuerpos compuestos y volúmenes cotidianos.', 'حساب حجم الكرة وحل مسائل الأجسام المركبة والحجوم اليومية.', 'Calculate the volume of a sphere and solve problems with composite solids and everyday volumes.'),
        problem: say('Kalkulatu 3 cm-ko erradioko bola baten bolumena.', 'Calcula el volumen de una bola de 3 cm de radio.', 'احسب حجم كرة نصف قطرها 3 سم.', 'Calculate the volume of a ball with a radius of 3 cm.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erradioaren kuboa.', 'El cubo del radio.', 'مكعب نصف القطر.', 'The cube of the radius.'), math: same('$3^{3}=27$') },
            { text: say('Formula.', 'La fórmula.', 'الصيغة.', 'The formula.'), math: same('$\\frac{4\\cdot 3{,}14\\cdot 27}{3}=113{,}04$') }
        ],
        takeaway: say('Esfera: $\\frac{4}{3}\\pi r^{3}$, zilindroaren bi heren. Konposatuak: zatitu, kalkulatu, batu edo kendu.', 'Esfera: $\\frac{4}{3}\\pi r^{3}$, dos tercios del cilindro. Compuestos: divide, calcula, suma o resta.', 'الكرة: $\\frac{4}{3}\\pi r^{3}$، ثلثا الأسطوانة. المركبة: قسّم واحسب واجمع أو اطرح.', 'Sphere: $\\frac{4}{3}\\pi r^{3}$, two thirds of the cylinder. Composite solids: split, calculate, add or subtract.'),
        figure: (language) => <SphereVolumeFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const solidsTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...solidsLessonTexts[topic.id as SolidsTopicId], ...solidsLessonChecks[topic.id as SolidsTopicId] }))
