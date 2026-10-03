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
    { id: 'polyhedra', tone: 'blue', title: { eu: 'Poliedroak', es: 'Poliedros', ar: 'متعددات الأوجه' } },
    { id: 'areas', tone: 'violet', title: { eu: 'Poliedroen azalerak', es: 'Áreas de poliedros', ar: 'مساحات متعددات الأوجه' } },
    { id: 'round', tone: 'mustard', title: { eu: 'Biraketa-gorputzak', es: 'Cuerpos de revolución', ar: 'الأجسام الدورانية' } },
    { id: 'units', tone: 'coral', title: { eu: 'Bolumena eta edukiera', es: 'Volumen y capacidad', ar: 'الحجم والسعة' } },
    { id: 'volume', tone: 'green', title: { eu: 'Gorputzen bolumena', es: 'Volumen de los cuerpos', ar: 'حجوم الأجسام' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })

export const solidsTopics: UnitTopic[] = [
    /* ---------- 1. Polyhedra ---------- */
    {
        id: 'elements',
        stage: 'polyhedra',
        title: say('Poliedroen elementuak', 'Elementos de los poliedros', 'عناصر متعددات الأوجه'),
        goal: say('Poliedro baten aurpegiak, ertzak eta erpinak ezagutzea eta prismak eta piramideak bereiztea.', 'Reconocer las caras, aristas y vértices de un poliedro y distinguir prismas y pirámides.', 'التعرّف إلى أوجه متعدد الأوجه وأحرفه ورؤوسه والتمييز بين المناشير والأهرامات.'),
        explanation: say(
            'Poliedroa poligonoz mugatutako gorputza da. Poligono horiek aurpegiak dira; bi aurpegi elkartzen diren lerroak, ertzak; eta hainbat ertz elkartzen diren puntuak, erpinak. Prismak bi oinarri berdin eta paralelo ditu, eta alboko aurpegiak paralelogramoak dira; oinarriko poligonoak ematen dio izena: prisma triangeluarra, pentagonala… Piramideak oinarri bakarra du, eta alboko aurpegiak erpin batean elkartzen diren triangeluak dira. Oinarriak $n$ alde baditu, prismak $n+2$ aurpegi, $3n$ ertz eta $2n$ erpin ditu; piramideak $n+1$ aurpegi, $2n$ ertz eta $n+1$ erpin. Oinarriak poligono erregularrak eta alboko aurpegiak berdinak badira, prisma edo piramide erregularra da.',
            'Un poliedro es un cuerpo limitado por polígonos. Esos polígonos son las caras; las líneas donde se juntan dos caras, las aristas; y los puntos donde se juntan varias aristas, los vértices. Un prisma tiene dos bases iguales y paralelas, y sus caras laterales son paralelogramos; el polígono de la base le da nombre: prisma triangular, pentagonal… Una pirámide tiene una sola base, y sus caras laterales son triángulos que se juntan en un vértice. Si la base tiene $n$ lados, el prisma tiene $n+2$ caras, $3n$ aristas y $2n$ vértices; la pirámide, $n+1$ caras, $2n$ aristas y $n+1$ vértices. Si las bases son polígonos regulares y las caras laterales iguales, el prisma o la pirámide es regular.',
            'متعدد الأوجه جسم تحدّه مضلعات. هذه المضلعات هي الأوجه؛ والخطوط التي يلتقي عندها وجهان هي الأحرف؛ والنقاط التي تلتقي عندها عدة أحرف هي الرؤوس. للمنشور قاعدتان متطابقتان ومتوازيتان، وأوجهه الجانبية متوازيات أضلاع؛ ويأخذ اسمه من مضلع القاعدة: منشور ثلاثي، خماسي… وللهرم قاعدة واحدة، وأوجهه الجانبية مثلثات تلتقي في رأس واحد. إذا كان للقاعدة $n$ أضلاع فللمنشور $n+2$ وجهًا و$3n$ حرفًا و$2n$ رأسًا؛ وللهرم $n+1$ وجهًا و$2n$ حرفًا و$n+1$ رأسًا. وإذا كانت القاعدتان مضلعين منتظمين والأوجه الجانبية متطابقة كان المنشور أو الهرم منتظمًا.'
        ),
        problem: say('Zenbat aurpegi, ertz eta erpin ditu prisma hexagonal batek? Eta piramide hexagonal batek?', '¿Cuántas caras, aristas y vértices tiene un prisma hexagonal? ¿Y una pirámide hexagonal?', 'كم وجهًا وحرفًا ورأسًا للمنشور السداسي؟ وللهرم السداسي؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hexagonoa: $n=6$ alde.', 'Hexágono: $n=6$ lados.', 'المسدس: $n=6$ أضلاع.') },
            { text: say('Prisma: 6 alboko aurpegi eta 2 oinarri; ertzak 6 + 6 + 6; erpinak 6 + 6.', 'Prisma: 6 caras laterales y 2 bases; aristas 6 + 6 + 6; vértices 6 + 6.', 'المنشور: 6 أوجه جانبية وقاعدتان؛ الأحرف 6 + 6 + 6؛ الرؤوس 6 + 6.'), math: same('$8,\\ 18,\\ 12$') },
            { text: say('Piramidea: 6 triangelu eta oinarria; 6 oinarrian eta 6 erpinera; 6 + 1 erpin.', 'Pirámide: 6 triángulos y la base; 6 aristas en la base y 6 hacia el vértice; 6 + 1 vértices.', 'الهرم: 6 مثلثات والقاعدة؛ 6 أحرف في القاعدة و6 نحو الرأس؛ 6 + 1 رؤوس.'), math: same('$7,\\ 12,\\ 7$') }
        ],
        example: same('$n=5\\ \\to\\ 7,\\ 15,\\ 10\\qquad 6,\\ 10,\\ 6$'),
        takeaway: say('Aurpegiak poligonoak dira, ertzak lerroak eta erpinak puntuak. Prismak bi oinarri, piramideak bat.', 'Las caras son polígonos, las aristas líneas y los vértices puntos. El prisma tiene dos bases; la pirámide, una.', 'الأوجه مضلعات، والأحرف خطوط، والرؤوس نقاط. للمنشور قاعدتان وللهرم قاعدة واحدة.'),
        figure: (language) => <ElementsFigure language={language} />
    },
    {
        id: 'euler',
        stage: 'polyhedra',
        title: say('Eulerren formula', 'La fórmula de Euler', 'صيغة أويلر'),
        goal: say('Poliedro ganbiletan aurpegien, erpinen eta ertzen arteko erlazioa egiaztatzea eta erabiltzea.', 'Comprobar y usar la relación entre caras, vértices y aristas de los poliedros convexos.', 'التحقق من العلاقة بين الأوجه والرؤوس والأحرف في متعددات الأوجه المحدّبة واستعمالها.'),
        explanation: say(
            'Poliedro bat ganbila da edozein aurpegiren planoak poliedro osoa alde batean uzten badu; bestela, ahurra da (zulo edo koska bat du). Poliedro ganbil guztietan Leonhard Eulerrek aurkitutako erlazio hau betetzen da: aurpegiak + erpinak = ertzak + 2. Kuboan: $6+8=12+2$. Formulari esker, bi datu jakinda hirugarrena kalkula daiteke: 12 erpin eta 30 ertz baditu, aurpegiak $30+2-12=20$ dira. Erlazioa betetzen ez bada, gorputz hori ezin da poliedro ganbila izan; egiaztapen ona da zenbaketak berrikusteko.',
            'Un poliedro es convexo si el plano de cualquier cara deja todo el poliedro a un mismo lado; si no, es cóncavo (tiene un hueco o entrante). En todos los poliedros convexos se cumple esta relación, descubierta por Leonhard Euler: caras + vértices = aristas + 2. En el cubo: $6+8=12+2$. Gracias a la fórmula, conociendo dos datos se calcula el tercero: si tiene 12 vértices y 30 aristas, las caras son $30+2-12=20$. Si la relación no se cumple, ese cuerpo no puede ser un poliedro convexo; es una buena comprobación para revisar los recuentos.',
            'يكون متعدد الأوجه محدّبًا إذا ترك مستوى أي وجه الجسمَ كله في جهة واحدة؛ وإلا فهو مقعّر (فيه تجويف أو انبعاج). وفي جميع متعددات الأوجه المحدّبة تتحقق هذه العلاقة التي اكتشفها ليونهارد أويلر: الأوجه + الرؤوس = الأحرف + 2. في المكعب: $6+8=12+2$. وبفضل الصيغة نحسب المعطى الثالث إذا عرفنا اثنين: إذا كان له 12 رأسًا و30 حرفًا فعدد أوجهه $30+2-12=20$. وإذا لم تتحقق العلاقة فلا يمكن أن يكون الجسم متعدد أوجه محدّبًا؛ إنها طريقة جيدة لمراجعة العدّ.'
        ),
        problem: say('Poliedro ganbil batek 9 aurpegi eta 16 ertz ditu. Zenbat erpin ditu?', 'Un poliedro convexo tiene 9 caras y 16 aristas. ¿Cuántos vértices tiene?', 'متعدد أوجه محدّب له 9 أوجه و16 حرفًا. كم رأسًا له؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi formula datuekin.', 'Escribe la fórmula con los datos.', 'اكتب الصيغة بالمعطيات.'), math: say('$9+E=16+2$', '$9+V=16+2$', '$9+V=16+2$') },
            { text: say('Askatu erpinak.', 'Despeja los vértices.', 'استخرج عدد الرؤوس.'), math: same('$18-9=9$') },
            { text: say('Egiaztatu: adibidez, piramide oktogonal bat (9, 16, 9).','Comprueba: por ejemplo, una pirámide octogonal (9, 16, 9).', 'تحقّق: مثلًا هرم ثماني (9، 16، 9).') }
        ],
        example: same('$6+8=12+2\\qquad 20+12=30+2$'),
        takeaway: say('Poliedro ganbiletan: aurpegiak + erpinak = ertzak + 2.', 'En los poliedros convexos: caras + vértices = aristas + 2.', 'في متعددات الأوجه المحدّبة: الأوجه + الرؤوس = الأحرف + 2.'),
        figure: (language) => <EulerFigure language={language} />
    },
    {
        id: 'regular',
        stage: 'polyhedra',
        title: say('Poliedro erregularrak', 'Poliedros regulares', 'متعددات الأوجه المنتظمة'),
        goal: say('Bost poliedro erregularrak ezagutzea eta zergatik ez dagoen besterik azaltzea.', 'Conocer los cinco poliedros regulares y explicar por qué no hay más.', 'معرفة متعددات الأوجه المنتظمة الخمسة وتفسير عدم وجود غيرها.'),
        explanation: say(
            'Poliedro erregular batean aurpegi guztiak poligono erregular berdinak dira, eta erpin guztietan aurpegi kopuru bera elkartzen da. Bost besterik ez daude: tetraedroa (4 triangelu), kuboa (6 karratu), oktaedroa (8 triangelu), dodekaedroa (12 pentagono) eta ikosaedroa (20 triangelu). Zergatik bost? Erpin batean gutxienez hiru aurpegi elkartu behar dira, eta haien angeluen baturak 360° baino txikiagoa izan behar du; 360° izanez gero, laua geratzen da. Triangeluekin 3, 4 edo 5 ($180°$, $240°$, $300°$); karratuekin 3 ($270°$); pentagonoekin 3 ($324°$). Sei triangelu edo hiru hexagono 360° dira, eta ez dago gehiago.',
            'En un poliedro regular todas las caras son polígonos regulares iguales y en todos los vértices se junta el mismo número de caras. Solo hay cinco: tetraedro (4 triángulos), cubo (6 cuadrados), octaedro (8 triángulos), dodecaedro (12 pentágonos) e icosaedro (20 triángulos). ¿Por qué cinco? En un vértice se tienen que juntar al menos tres caras, y la suma de sus ángulos tiene que ser menor que 360°; si es 360°, queda plano. Con triángulos, 3, 4 o 5 ($180°$, $240°$, $300°$); con cuadrados, 3 ($270°$); con pentágonos, 3 ($324°$). Seis triángulos o tres hexágonos suman 360°, y no hay más.',
            'في متعدد الأوجه المنتظم جميع الأوجه مضلعات منتظمة متطابقة، ويلتقي العدد نفسه من الأوجه عند كل رأس. وهي خمسة فقط: رباعي الأوجه (4 مثلثات)، والمكعب (6 مربعات)، وثماني الأوجه (8 مثلثات)، واثنا عشري الأوجه (12 مخمسًا)، وعشريني الأوجه (20 مثلثًا). لماذا خمسة؟ يجب أن يلتقي عند الرأس ثلاثة أوجه على الأقل، ويجب أن يكون مجموع زواياها أقل من 360°؛ فإن كان 360° بقي مستويًا. بالمثلثات 3 أو 4 أو 5 ($180°$، $240°$، $300°$)؛ وبالمربعات 3 ($270°$)؛ وبالمخمسات 3 ($324°$). ستة مثلثات أو ثلاثة مسدسات مجموعها 360°، ولا يوجد غيرها.'
        ),
        problem: say('Zenbat ertz ditu ikosaedroak? (20 triangelu; erpin bakoitzean 5 aurpegi)', '¿Cuántas aristas tiene el icosaedro? (20 triángulos; 5 caras en cada vértice)', 'كم حرفًا لعشريني الأوجه؟ (20 مثلثًا؛ 5 أوجه عند كل رأس)'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zenbatu triangeluen alde guztiak.', 'Cuenta todos los lados de los triángulos.', 'عُدّ جميع أضلاع المثلثات.'), math: same('$20\\cdot 3=60$') },
            { text: say('Ertz bakoitza bi aurpegik partekatzen dute: zatitu 2z.', 'Cada arista la comparten dos caras: divide entre 2.', 'كل حرف مشترك بين وجهين: اقسم على 2.'), math: same('$60\\mathbin{:}2=30$') },
            { text: say('Erpinak: 60 erpin, 5 aurpegitan banatuta.', 'Vértices: 60 esquinas repartidas de 5 en 5.', 'الرؤوس: 60 زاوية موزعة خمسًا خمسًا.'), math: same('$60\\mathbin{:}5=12$') }
        ],
        example: same('$4+4=6+2\\qquad 12+20=30+2$'),
        takeaway: say('Bost poliedro erregular: tetraedroa, kuboa, oktaedroa, dodekaedroa eta ikosaedroa.', 'Cinco poliedros regulares: tetraedro, cubo, octaedro, dodecaedro e icosaedro.', 'خمسة متعددات أوجه منتظمة: رباعي الأوجه، والمكعب، وثماني الأوجه، واثنا عشري الأوجه، وعشريني الأوجه.'),
        figure: (language) => <RegularFigure language={language} />
    },

    /* ---------- 2. Areas of polyhedra ---------- */
    {
        id: 'prism-area',
        stage: 'areas',
        title: say('Prismaren azalera', 'Área del prisma', 'مساحة المنشور'),
        goal: say('Prisma baten garapena marraztea eta alboko azalera eta azalera osoa kalkulatzea.', 'Dibujar el desarrollo de un prisma y calcular su área lateral y total.', 'رسم نشر المنشور وحساب مساحته الجانبية والكلية.'),
        explanation: say(
            'Prisma bat ireki eta mahai gainean zabaltzen badugu, haren garapen laua lortzen dugu: alboko aurpegiek laukizuzen bat osatzen dute, eta bi oinarriak alde banatan geratzen dira. Laukizuzen horren oinarria oinarriaren perimetroa da, eta altuera prismaren altuera. Beraz, alboko azalera $A_L=P\\cdot h$ da, eta azalera osoa $A_T=A_L+2\\cdot A_O$. Ortoedroan sei laukizuzen daude, binaka berdinak: $A_T=2(ab+ac+bc)$. Kuboan sei karratu: $A_T=6l^{2}$. Oinarria poligono erregularra bada, haren azalera perimetroa bider apotema zati bi da.',
            'Si abrimos un prisma y lo extendemos sobre la mesa, obtenemos su desarrollo plano: las caras laterales forman un rectángulo y las dos bases quedan a cada lado. La base de ese rectángulo es el perímetro de la base y su altura, la altura del prisma. Por eso el área lateral es $A_L=P\\cdot h$ y el área total, $A_T=A_L+2\\cdot A_B$. En el ortoedro hay seis rectángulos, iguales dos a dos: $A_T=2(ab+ac+bc)$. En el cubo, seis cuadrados: $A_T=6l^{2}$. Si la base es un polígono regular, su área es el perímetro por la apotema entre dos.',
            'إذا فتحنا المنشور وبسطناه على الطاولة حصلنا على نشره المستوي: تكوّن الأوجه الجانبية مستطيلًا، وتبقى القاعدتان على جانبيه. قاعدة هذا المستطيل محيط القاعدة وارتفاعه ارتفاع المنشور. لذلك المساحة الجانبية $A_L=P\\cdot h$ والمساحة الكلية $A_T=A_L+2\\cdot A_B$. في متوازي المستطيلات ستة مستطيلات متطابقة مثنى مثنى: $A_T=2(ab+ac+bc)$. وفي المكعب ستة مربعات: $A_T=6l^{2}$. وإذا كانت القاعدة مضلعًا منتظمًا فمساحتها المحيط في العامد مقسومًا على اثنين.'
        ),
        problem: say('Ortoedro baten neurriak 4 cm, 3 cm eta 12 cm dira. Kalkulatu azalera osoa.', 'Las dimensiones de un ortoedro son 4 cm, 3 cm y 12 cm. Calcula su área total.', 'أبعاد متوازي مستطيلات 4 سم و3 سم و12 سم. احسب مساحته الكلية.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hiru laukizuzen desberdinak.', 'Los tres rectángulos distintos.', 'المستطيلات الثلاثة المختلفة.'), math: same('$4\\cdot 3=12\\quad 4\\cdot 12=48\\quad 3\\cdot 12=36$') },
            { text: say('Bakoitza bi aldiz dago.', 'Cada uno está dos veces.', 'كل منها مرتان.'), math: same('$2\\cdot (12+48+36)=192$') },
            { text: say('Azalera osoa: 192 cm².', 'Área total: 192 cm².', 'المساحة الكلية: 192 سم².') }
        ],
        example: say('$A_L=P\\cdot h\\qquad A_T=A_L+2A_O$', '$A_L=P\\cdot h\\qquad A_T=A_L+2A_B$', '$A_L=P\\cdot h\\qquad A_T=A_L+2A_B$'),
        takeaway: say('Alboko azalera: perimetroa bider altuera. Gero gehitu bi oinarriak.', 'Área lateral: perímetro por altura. Luego suma las dos bases.', 'المساحة الجانبية: المحيط في الارتفاع. ثم أضف القاعدتين.'),
        figure: (language) => <PrismAreaFigure language={language} />
    },
    {
        id: 'pyramid-area',
        stage: 'areas',
        title: say('Piramidearen azalera', 'Área de la pirámide', 'مساحة الهرم'),
        goal: say('Piramide erregular baten azalera kalkulatzea, apotema Pitagorasekin aurkituz behar denean.', 'Calcular el área de una pirámide regular, hallando la apotema con Pitágoras cuando haga falta.', 'حساب مساحة هرم منتظم، مع إيجاد العامد بفيثاغورس عند الحاجة.'),
        explanation: say(
            'Piramide erregular baten garapena oinarria eta haren inguruko triangelu isoszele berdinak dira. Triangelu horien altuera piramidearen apotema da ($a$); ez da piramidearen altuera ($h$), ez eta oinarriaren apotema ($a\'$) ere. Alboko azalera triangeluen azaleren batura da: $A_L=\\frac{P\\cdot a}{2}$, eta azalera osoa $A_T=A_L+A_O$. Apotema ematen ez badute, triangelu angeluzuzen bat bilatu: altuera eta oinarriaren apotema katetoak dira, eta piramidearen apotema hipotenusa: $a=\\sqrt{h^{2}+a\'^{2}}$. Oinarri karratuan, $a\'$ aldearen erdia da.',
            'El desarrollo de una pirámide regular es la base y, alrededor, triángulos isósceles iguales. La altura de esos triángulos es la apotema de la pirámide ($a$); no es la altura de la pirámide ($h$) ni la apotema de la base ($a\'$). El área lateral es la suma de las áreas de los triángulos: $A_L=\\frac{P\\cdot a}{2}$, y el área total, $A_T=A_L+A_B$. Si no dan la apotema, busca un triángulo rectángulo: la altura y la apotema de la base son los catetos, y la apotema de la pirámide la hipotenusa: $a=\\sqrt{h^{2}+a\'^{2}}$. En una base cuadrada, $a\'$ es la mitad del lado.',
            'نشر الهرم المنتظم هو القاعدة وحولها مثلثات متساوية الساقين متطابقة. ارتفاع هذه المثلثات هو عامد الهرم ($a$)؛ وليس ارتفاع الهرم ($h$) ولا عامد القاعدة ($a\'$). المساحة الجانبية مجموع مساحات المثلثات: $A_L=\\frac{P\\cdot a}{2}$، والمساحة الكلية $A_T=A_L+A_B$. وإذا لم يُعطَ العامد فابحث عن مثلث قائم: الارتفاع وعامد القاعدة ضلعاه القائمان، وعامد الهرم وتره: $a=\\sqrt{h^{2}+a\'^{2}}$. وفي القاعدة المربعة $a\'$ نصف الضلع.'
        ),
        problem: say('Piramide erregular baten oinarria 6 dm-ko aldeko karratua da, eta altuera 4 dm. Kalkulatu azalera osoa.', 'La base de una pirámide regular es un cuadrado de 6 dm de lado y su altura mide 4 dm. Calcula su área total.', 'قاعدة هرم منتظم مربع طول ضلعه 6 دسم وارتفاعه 4 دسم. احسب مساحته الكلية.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Apotema: altuera eta aldearen erdia katetoak dira.', 'Apotema: la altura y medio lado son los catetos.', 'العامد: الارتفاع ونصف الضلع هما الضلعان القائمان.'), math: same('$a=\\sqrt{4^{2}+3^{2}}=5$') },
            { text: say('Lau triangelu.', 'Cuatro triángulos.', 'أربعة مثلثات.'), math: same('$4\\cdot \\frac{6\\cdot 5}{2}=60$') },
            { text: say('Gehitu oinarria.', 'Suma la base.', 'أضف القاعدة.'), math: same('$60+36=96$') }
        ],
        example: say('$A_L=\\frac{P\\cdot a}{2}\\qquad a=\\sqrt{h^{2}+a\'^{2}}$', '$A_L=\\frac{P\\cdot a}{2}\\qquad a=\\sqrt{h^{2}+a\'^{2}}$', '$A_L=\\frac{P\\cdot a}{2}\\qquad a=\\sqrt{h^{2}+a\'^{2}}$'),
        takeaway: say('Alboko azalera: perimetroa bider piramidearen apotema, zati bi. Apotema ≠ altuera.', 'Área lateral: perímetro por apotema de la pirámide entre dos. Apotema ≠ altura.', 'المساحة الجانبية: المحيط في عامد الهرم على اثنين. العامد ≠ الارتفاع.'),
        figure: (language) => <PyramidAreaFigure language={language} />
    },
    {
        id: 'frustum-area',
        stage: 'areas',
        title: say('Piramide-enborraren azalera', 'Área del tronco de pirámide', 'مساحة جذع الهرم'),
        goal: say('Piramide-enbor baten azalera kalkulatzea alboko trapezioak eta bi oinarriak batuz.', 'Calcular el área de un tronco de pirámide sumando los trapecios laterales y las dos bases.', 'حساب مساحة جذع الهرم بجمع أشباه المنحرفات الجانبية والقاعدتين.'),
        explanation: say(
            'Piramide bat oinarriarekiko paralelo den plano batez mozten badugu, behealdean piramide-enborra geratzen da. Bi oinarri ditu, paraleloak baina desberdinak, eta alboko aurpegiak trapezioak dira. Trapezio horien altuera enborraren apotema da. Alboko azalera trapezioen batura da: enbor erregularrean, $A_L=\\frac{(P+P\')\\cdot a}{2}$, bi perimetroak erabiliz. Azalera osoa lortzeko, gehitu bi oinarriak. Apotema ematen ez badute, trapezioan triangelu angeluzuzen bat dago: alboko ertza hipotenusa da, eta katetoetako bat oinarrien aldeen kenduraren erdia.',
            'Si cortamos una pirámide por un plano paralelo a la base, abajo queda un tronco de pirámide. Tiene dos bases, paralelas pero distintas, y sus caras laterales son trapecios. La altura de esos trapecios es la apotema del tronco. El área lateral es la suma de los trapecios: en un tronco regular, $A_L=\\frac{(P+P\')\\cdot a}{2}$, con los dos perímetros. Para el área total, suma las dos bases. Si no dan la apotema, en el trapecio hay un triángulo rectángulo: la arista lateral es la hipotenusa, y uno de los catetos es la mitad de la diferencia de los lados de las bases.',
            'إذا قطعنا الهرم بمستوى موازٍ للقاعدة بقي في الأسفل جذع هرم. له قاعدتان متوازيتان لكنهما مختلفتان، وأوجهه الجانبية أشباه منحرفات. ارتفاع هذه الأشكال هو عامد الجذع. المساحة الجانبية مجموع أشباه المنحرفات: في الجذع المنتظم $A_L=\\frac{(P+P\')\\cdot a}{2}$ باستعمال المحيطين. وللمساحة الكلية أضف القاعدتين. وإذا لم يُعطَ العامد ففي شبه المنحرف مثلث قائم: الحرف الجانبي وتره، وأحد ضلعيه القائمين نصف الفرق بين ضلعي القاعدتين.'
        ),
        problem: say('Piramide-enbor erregular baten oinarriak 20 cm eta 10 cm-ko aldeko karratuak dira, eta alboko ertzak 13 cm. Kalkulatu azalera osoa.', 'Las bases de un tronco de pirámide regular son cuadrados de 20 cm y 10 cm de lado, y las aristas laterales miden 13 cm. Calcula su área total.', 'قاعدتا جذع هرم منتظم مربعان طولا ضلعيهما 20 سم و10 سم، وأحرفه الجانبية 13 سم. احسب مساحته الكلية.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Trapezioaren altuera: katetoa $(20-10)\\mathbin{:}2=5$.', 'Altura del trapecio: cateto $(20-10)\\mathbin{:}2=5$.', 'ارتفاع شبه المنحرف: الضلع القائم $(20-10)\\mathbin{:}2=5$.'), math: same('$\\sqrt{13^{2}-5^{2}}=12$') },
            { text: say('Lau trapezio.', 'Cuatro trapecios.', 'أربعة أشباه منحرفات.'), math: same('$4\\cdot \\frac{(20+10)\\cdot 12}{2}=720$') },
            { text: say('Gehitu bi oinarriak.', 'Suma las dos bases.', 'أضف القاعدتين.'), math: same('$720+400+100=1220$') }
        ],
        example: same('$A_L=\\frac{(P+P\')\\cdot a}{2}$'),
        takeaway: say('Enborra: trapezioak gehi bi oinarri. Apotema trapezioaren altuera da.', 'Tronco: trapecios más dos bases. La apotema es la altura del trapecio.', 'الجذع: أشباه منحرفات مع قاعدتين. العامد ارتفاع شبه المنحرف.'),
        figure: (language) => <FrustumAreaFigure language={language} />
    },

    /* ---------- 3. Bodies of revolution ---------- */
    {
        id: 'cylinder',
        stage: 'round',
        title: say('Zilindroa', 'El cilindro', 'الأسطوانة'),
        goal: say('Zilindroa biraketa-gorputz gisa ulertzea eta haren azalera garapenetik kalkulatzea.', 'Entender el cilindro como cuerpo de revolución y calcular su área a partir del desarrollo.', 'فهم الأسطوانة جسمًا دورانيًا وحساب مساحتها من نشرها.'),
        explanation: say(
            'Biraketa-gorputzak irudi lau bat ardatz baten inguruan biratuz sortzen dira. Laukizuzen bat bere alde baten inguruan biratzen bada, zilindroa sortzen da: ardatza zilindroaren altuera da, eta beste aldeak oinarrien erradioa ematen du. Zilindroaren garapena laukizuzen bat eta bi zirkulu dira. Laukizuzenaren oinarria zirkunferentziaren luzera da, $2\\pi r$, eta altuera zilindroarena. Beraz, $A_L=2\\pi r\\cdot h$ eta $A_T=2\\pi r h+2\\pi r^{2}$. Kalkuluetan $\\pi\\approx 3{,}14$ erabiliko dugu. Kontuz: diametroa ematen badute, erdia hartu erradioa lortzeko.',
            'Los cuerpos de revolución se generan al girar una figura plana alrededor de un eje. Si un rectángulo gira alrededor de uno de sus lados, se genera un cilindro: el eje es la altura del cilindro y el otro lado da el radio de las bases. El desarrollo del cilindro es un rectángulo y dos círculos. La base del rectángulo es la longitud de la circunferencia, $2\\pi r$, y su altura la del cilindro. Por eso $A_L=2\\pi r\\cdot h$ y $A_T=2\\pi r h+2\\pi r^{2}$. En las cuentas usaremos $\\pi\\approx 3{,}14$. Cuidado: si dan el diámetro, toma la mitad para el radio.',
            'تنشأ الأجسام الدورانية بدوران شكل مستوٍ حول محور. إذا دار مستطيل حول أحد أضلاعه نشأت أسطوانة: المحور ارتفاع الأسطوانة، والضلع الآخر يعطي نصف قطر القاعدتين. نشر الأسطوانة مستطيل ودائرتان. قاعدة المستطيل طول محيط الدائرة $2\\pi r$، وارتفاعه ارتفاع الأسطوانة. لذلك $A_L=2\\pi r\\cdot h$ و$A_T=2\\pi r h+2\\pi r^{2}$. سنستعمل في الحسابات $\\pi\\approx 3{,}14$. انتبه: إذا أُعطي القطر فخذ نصفه لنصف القطر.'
        ),
        problem: say('Ur-biltegi zilindriko itxi batek 0,5 m-ko erradioa eta 2 m-ko altuera ditu. Zenbat txapa behar da?', 'Un depósito cilíndrico cerrado tiene 0,5 m de radio y 2 m de altura. ¿Cuánta chapa hace falta?', 'خزان أسطواني مغلق نصف قطره 0.5 م وارتفاعه 2 م. كم يلزم من الصفيح؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Alboko azalera.', 'Área lateral.', 'المساحة الجانبية.'), math: same('$2\\cdot 3{,}14\\cdot 0{,}5\\cdot 2=6{,}28$') },
            { text: say('Bi oinarriak.', 'Las dos bases.', 'القاعدتان.'), math: same('$2\\cdot 3{,}14\\cdot 0{,}5^{2}=1{,}57$') },
            { text: say('Guztira 7,85 m².', 'En total, 7,85 m².', 'المجموع 7.85 م².'), math: same('$6{,}28+1{,}57=7{,}85$') }
        ],
        example: same('$A_L=2\\pi r h\\qquad A_T=2\\pi r h+2\\pi r^{2}$'),
        takeaway: say('Zilindroa: laukizuzen bat ($2\\pi r$ zabal) eta bi zirkulu.', 'Cilindro: un rectángulo ($2\\pi r$ de ancho) y dos círculos.', 'الأسطوانة: مستطيل (عرضه $2\\pi r$) ودائرتان.'),
        figure: (language) => <CylinderFigure language={language} />
    },
    {
        id: 'cone',
        stage: 'round',
        title: say('Konoa eta kono-enborra', 'El cono y el tronco de cono', 'المخروط وجذع المخروط'),
        goal: say('Konoaren elementuak lotzea Pitagorasekin eta konoaren eta kono-enborraren azalera kalkulatzea.', 'Relacionar los elementos del cono con Pitágoras y calcular el área del cono y del tronco de cono.', 'ربط عناصر المخروط بفيثاغورس وحساب مساحة المخروط وجذع المخروط.'),
        explanation: say(
            'Konoa triangelu angeluzuzen bat kateto baten inguruan biratuz sortzen da. Kateto hori altuera da ($h$), beste katetoa oinarriaren erradioa ($r$) eta hipotenusa sortzailea ($g$): $g=\\sqrt{h^{2}+r^{2}}$. Konoaren garapena sektore zirkular bat eta zirkulu bat dira; sektorearen erradioa sortzailea da. Alboko azalera $A_L=\\pi r g$ da, eta azalera osoa $A_T=\\pi r g+\\pi r^{2}$. Kono-enborra trapezio angeluzuzen bat biratuz sortzen da; bi oinarri ditu, $R$ eta $r$ erradiokoak, eta alboko azalera $A_L=\\pi (R+r)\\,g$ da. Haren sortzailea ere Pitagorasekin: $g=\\sqrt{h^{2}+(R-r)^{2}}$.',
            'El cono se genera al girar un triángulo rectángulo alrededor de un cateto. Ese cateto es la altura ($h$), el otro cateto el radio de la base ($r$) y la hipotenusa, la generatriz ($g$): $g=\\sqrt{h^{2}+r^{2}}$. El desarrollo del cono es un sector circular y un círculo; el radio del sector es la generatriz. El área lateral es $A_L=\\pi r g$ y el área total, $A_T=\\pi r g+\\pi r^{2}$. El tronco de cono se genera al girar un trapecio rectángulo; tiene dos bases de radios $R$ y $r$, y su área lateral es $A_L=\\pi (R+r)\\,g$. Su generatriz, también con Pitágoras: $g=\\sqrt{h^{2}+(R-r)^{2}}$.',
            'ينشأ المخروط بدوران مثلث قائم حول أحد ضلعيه القائمين. هذا الضلع هو الارتفاع ($h$)، والضلع الآخر نصف قطر القاعدة ($r$)، والوتر هو الراسم ($g$): $g=\\sqrt{h^{2}+r^{2}}$. نشر المخروط قطاع دائري ودائرة؛ ونصف قطر القطاع هو الراسم. المساحة الجانبية $A_L=\\pi r g$ والمساحة الكلية $A_T=\\pi r g+\\pi r^{2}$. وينشأ جذع المخروط بدوران شبه منحرف قائم؛ له قاعدتان نصفا قطريهما $R$ و$r$، ومساحته الجانبية $A_L=\\pi (R+r)\\,g$. وراسمه أيضًا بفيثاغورس: $g=\\sqrt{h^{2}+(R-r)^{2}}$.'
        ),
        problem: say('Kono batek 6 cm-ko erradioa eta 8 cm-ko altuera ditu. Kalkulatu azalera osoa.', 'Un cono tiene 6 cm de radio y 8 cm de altura. Calcula su área total.', 'مخروط نصف قطره 6 سم وارتفاعه 8 سم. احسب مساحته الكلية.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Sortzailea.', 'Generatriz.', 'الراسم.'), math: same('$g=\\sqrt{8^{2}+6^{2}}=10$') },
            { text: say('Alboko azalera.', 'Área lateral.', 'المساحة الجانبية.'), math: same('$3{,}14\\cdot 6\\cdot 10=188{,}4$') },
            { text: say('Gehitu oinarria.', 'Suma la base.', 'أضف القاعدة.'), math: same('$188{,}4+3{,}14\\cdot 36=301{,}44$') }
        ],
        example: same('$A_L=\\pi r g\\qquad A_L=\\pi (R+r)\\,g$'),
        takeaway: say('Konoa: $g^{2}=h^{2}+r^{2}$ eta $A_L=\\pi r g$. Ez nahastu altuera eta sortzailea.', 'Cono: $g^{2}=h^{2}+r^{2}$ y $A_L=\\pi r g$. No confundas altura y generatriz.', 'المخروط: $g^{2}=h^{2}+r^{2}$ و$A_L=\\pi r g$. لا تخلط بين الارتفاع والراسم.'),
        figure: (language) => <ConeFigure language={language} />
    },
    {
        id: 'sphere',
        stage: 'round',
        title: say('Esfera', 'La esfera', 'الكرة'),
        goal: say('Esferaren, kasketaren eta zona esferikoaren azalera kalkulatzea eta esferaren sekzioak ulertzea.', 'Calcular el área de la esfera, del casquete y de la zona esférica y entender las secciones de la esfera.', 'حساب مساحة الكرة والقبعة والمنطقة الكروية وفهم مقاطع الكرة.'),
        explanation: say(
            'Esfera zirkulu-erdi bat bere diametroaren inguruan biratuz sortzen da. Ezin da garatu (ezin da laua bihurtu hautsi gabe), baina Arkimedesek aurkitu zuen haren azalera zilindro zirkunskribatuaren alboko azalera bezainbestekoa dela: $A=4\\pi r^{2}$, lau zirkulu handi. Esfera bi plano paralelok mozten badute, haien arteko zatia zona esferikoa da; plano bakar batek mozten badu, kasketa esferikoa. Bien azalera zilindroaren banda bera da: $A=2\\pi r h$, $h$ zonaren altuera izanik. Plano batek esfera mozten duenean, sekzioa zirkulua da; zentrotik $d$ distantziara, haren erradioa $\\sqrt{r^{2}-d^{2}}$ da.',
            'La esfera se genera al girar un semicírculo alrededor de su diámetro. No se puede desarrollar (no se puede aplanar sin romperla), pero Arquímedes descubrió que su área es igual al área lateral del cilindro circunscrito: $A=4\\pi r^{2}$, cuatro círculos máximos. Si dos planos paralelos cortan la esfera, la parte entre ellos es una zona esférica; si la corta un solo plano, un casquete esférico. El área de ambos es la de la banda del cilindro: $A=2\\pi r h$, siendo $h$ la altura de la zona. Cuando un plano corta la esfera, la sección es un círculo; a una distancia $d$ del centro, su radio es $\\sqrt{r^{2}-d^{2}}$.',
            'تنشأ الكرة بدوران نصف دائرة حول قطرها. لا يمكن نشرها (لا يمكن جعلها مستوية دون تمزيقها)، لكن أرخميدس اكتشف أن مساحتها تساوي المساحة الجانبية للأسطوانة المحيطة بها: $A=4\\pi r^{2}$، أي أربع دوائر عظمى. إذا قطع الكرةَ مستويان متوازيان فالجزء بينهما منطقة كروية؛ وإذا قطعها مستوٍ واحد فقبعة كروية. ومساحة كلتيهما مساحة شريط الأسطوانة: $A=2\\pi r h$ حيث $h$ ارتفاع المنطقة. وعندما يقطع مستوٍ الكرة يكون المقطع دائرة؛ وعلى بعد $d$ من المركز يكون نصف قطرها $\\sqrt{r^{2}-d^{2}}$.'
        ),
        problem: say('Kalkulatu 10 cm-ko erradioko esfera baten azalera eta 4 cm-ko altuerako zona batena.', 'Calcula el área de una esfera de 10 cm de radio y la de una zona de 4 cm de altura.', 'احسب مساحة كرة نصف قطرها 10 سم ومساحة منطقة ارتفاعها 4 سم.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Esfera osoa.', 'Esfera completa.', 'الكرة كاملة.'), math: same('$4\\cdot 3{,}14\\cdot 10^{2}=1256$') },
            { text: say('Zona: zilindroaren banda.', 'Zona: la banda del cilindro.', 'المنطقة: شريط الأسطوانة.'), math: same('$2\\cdot 3{,}14\\cdot 10\\cdot 4=251{,}2$') }
        ],
        example: same('$A=4\\pi r^{2}\\qquad A=2\\pi r h$'),
        takeaway: say('Esfera: $4\\pi r^{2}$. Zona eta kasketa: $2\\pi r h$.', 'Esfera: $4\\pi r^{2}$. Zona y casquete: $2\\pi r h$.', 'الكرة: $4\\pi r^{2}$. المنطقة والقبعة: $2\\pi r h$.'),
        figure: (language) => <SphereFigure language={language} />
    },

    /* ---------- 4. Volume and capacity ---------- */
    {
        id: 'volume-units',
        stage: 'units',
        title: say('Bolumen-unitateak', 'Unidades de volumen', 'وحدات الحجم'),
        goal: say('Bolumen-unitateak elkarren artean aldatzea, mailaz maila 1000 bider biderkatuz edo zatituz.', 'Pasar de unas unidades de volumen a otras, multiplicando o dividiendo por 1000 en cada escalón.', 'التحويل بين وحدات الحجم بالضرب أو القسمة على 1000 في كل درجة.'),
        explanation: say(
            'Gorputz baten bolumena hartzen duen espazioa da. Unitatea metro kubikoa da (m³): metro bateko ertza duen kuboa. Haren azpimultiploak dm³, cm³ eta mm³ dira, eta multiploak dam³, hm³ eta km³. Dezimetro kubiko batean $10\\cdot 10\\cdot 10=1000$ zentimetro kubiko sartzen dira: luzeran 10 aldiz, zabaleran 10 eta altueran 10. Horregatik, maila bakoitza hurrengoa baino 1000 aldiz handiagoa da: unitate txikiago batera jaisteko, biderkatu 1000z maila bakoitzeko; handiago batera igotzeko, zatitu. Adibidez, $2{,}5\\ \\text{m}^{3}=2500\\ \\text{dm}^{3}$ eta $4500\\ \\text{cm}^{3}=4{,}5\\ \\text{dm}^{3}$.',
            'El volumen de un cuerpo es el espacio que ocupa. La unidad es el metro cúbico (m³): un cubo de un metro de arista. Sus submúltiplos son dm³, cm³ y mm³, y sus múltiplos dam³, hm³ y km³. En un decímetro cúbico caben $10\\cdot 10\\cdot 10=1000$ centímetros cúbicos: 10 a lo largo, 10 a lo ancho y 10 a lo alto. Por eso cada escalón es 1000 veces el siguiente: para bajar a una unidad menor, multiplica por 1000 en cada escalón; para subir, divide. Por ejemplo, $2{,}5\\ \\text{m}^{3}=2500\\ \\text{dm}^{3}$ y $4500\\ \\text{cm}^{3}=4{,}5\\ \\text{dm}^{3}$.',
            'حجم الجسم هو الحيز الذي يشغله. ووحدته المتر المكعب (م³): مكعب طول حرفه متر. وأجزاؤه dm³ وcm³ وmm³، ومضاعفاته dam³ وhm³ وkm³. في الديسيمتر المكعب $10\\cdot 10\\cdot 10=1000$ سنتيمتر مكعب: 10 طولًا و10 عرضًا و10 ارتفاعًا. لذلك كل درجة تساوي 1000 مرة الدرجة التالية: للنزول إلى وحدة أصغر اضرب في 1000 لكل درجة؛ وللصعود اقسم. مثلًا $2{,}5\\ \\text{m}^{3}=2500\\ \\text{dm}^{3}$ و$4500\\ \\text{cm}^{3}=4{,}5\\ \\text{dm}^{3}$.'
        ),
        problem: say('Adierazi 0,3 m³ cm³-tan.', 'Expresa 0,3 m³ en cm³.', 'عبّر عن 0.3 م³ بالسنتيمتر المكعب.'),
        stepsKind: 'steps',
        steps: [
            { text: say('m³-tik cm³-ra bi maila jaisten dira.', 'De m³ a cm³ se bajan dos escalones.', 'من m³ إلى cm³ ننزل درجتين.'), math: same('$1000\\cdot 1000=1\\,000\\,000$') },
            { text: say('Biderkatu.', 'Multiplica.', 'اضرب.'), math: same('$0{,}3\\cdot 1\\,000\\,000=300\\,000$') }
        ],
        example: same('$1\\ \\text{m}^{3}=1000\\ \\text{dm}^{3}=1\\,000\\,000\\ \\text{cm}^{3}$'),
        takeaway: say('Bolumenean maila bakoitza 1000 da: hiru zifra koma bakoitzeko jauzian.', 'En volumen, cada escalón es 1000: tres cifras por salto.', 'في الحجم كل درجة 1000: ثلاثة أرقام لكل قفزة.'),
        figure: (language) => <VolumeUnitsFigure language={language} />
    },
    {
        id: 'capacity',
        stage: 'units',
        title: say('Bolumena eta edukiera', 'Volumen y capacidad', 'الحجم والسعة'),
        goal: say('Bolumen-unitateak eta edukiera-unitateak lotzea: 1 dm³ = 1 L.', 'Relacionar las unidades de volumen con las de capacidad: 1 dm³ = 1 L.', 'ربط وحدات الحجم بوحدات السعة: 1 dm³ = 1 L.'),
        explanation: say(
            'Ontzi baten edukiera barruan har dezakeen likido kopurua da, eta litrotan (L) neurtzen da. Litro bat dezimetro bateko ertza duen kubo bat betetzeko behar den likidoa da: $1\\ \\text{dm}^{3}=1\\ \\text{L}$. Hortik: $1\\ \\text{cm}^{3}=1\\ \\text{mL}$ eta $1\\ \\text{m}^{3}=1000\\ \\text{L}$. Edukiera-unitateak 10ean-10ean doaz (kL, hL, daL, L, dL, cL, mL), bolumenekoak 1000ean-1000ean. Gainera, ur litro batek kilo bat pisatzen du gutxi gorabehera. Euria ere horrela neurtzen da: metro karratu bakoitzeko litro batek milimetro bateko ur-geruza egiten du.',
            'La capacidad de un recipiente es la cantidad de líquido que cabe dentro y se mide en litros (L). Un litro es el líquido necesario para llenar un cubo de un decímetro de arista: $1\\ \\text{dm}^{3}=1\\ \\text{L}$. De ahí: $1\\ \\text{cm}^{3}=1\\ \\text{mL}$ y $1\\ \\text{m}^{3}=1000\\ \\text{L}$. Las unidades de capacidad van de 10 en 10 (kL, hL, daL, L, dL, cL, mL) y las de volumen de 1000 en 1000. Además, un litro de agua pesa aproximadamente un kilo. Así se mide también la lluvia: un litro por metro cuadrado forma una capa de agua de un milímetro.',
            'سعة الإناء كمية السائل التي يمكن أن يحتويها، وتقاس باللتر (L). اللتر هو السائل اللازم لملء مكعب طول حرفه ديسيمتر: $1\\ \\text{dm}^{3}=1\\ \\text{L}$. ومن ذلك: $1\\ \\text{cm}^{3}=1\\ \\text{mL}$ و$1\\ \\text{m}^{3}=1000\\ \\text{L}$. تتدرج وحدات السعة عشرة عشرة (kL، hL، daL، L، dL، cL، mL)، ووحدات الحجم ألفًا ألفًا. ثم إن لتر الماء يزن كيلوغرامًا تقريبًا. وهكذا يقاس المطر أيضًا: لتر على كل متر مربع يكوّن طبقة ماء سُمكها مليمتر.'
        ),
        problem: say('Igerileku batek 12 m × 6 m × 1,5 m neurtzen ditu. Zenbat litro ur sartzen dira?', 'Una piscina mide 12 m × 6 m × 1,5 m. ¿Cuántos litros de agua caben?', 'مسبح أبعاده 12 م × 6 م × 1.5 م. كم لترًا من الماء يسع؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bolumena m³-tan.', 'Volumen en m³.', 'الحجم بالمتر المكعب.'), math: same('$12\\cdot 6\\cdot 1{,}5=108$') },
            { text: say('1 m³ = 1000 L.', '1 m³ = 1000 L.', '1 m³ = 1000 L.'), math: same('$108\\cdot 1000=108\\,000$') }
        ],
        example: same('$1\\ \\text{dm}^{3}=1\\ \\text{L}\\qquad 1\\ \\text{cm}^{3}=1\\ \\text{mL}$'),
        takeaway: say('1 dm³ = 1 L = 1 kg ur. 1 m³ = 1000 L.', '1 dm³ = 1 L = 1 kg de agua. 1 m³ = 1000 L.', '1 dm³ = 1 L = 1 kg من الماء. 1 m³ = 1000 L.'),
        figure: (language) => <CapacityFigure language={language} />
    },
    {
        id: 'cavalieri',
        stage: 'units',
        title: say('Ortoedroa eta Cavalieriren printzipioa', 'El ortoedro y el principio de Cavalieri', 'متوازي المستطيلات ومبدأ كافاليري'),
        goal: say('Ortoedroaren bolumena unitate-kuboak zenbatuz ulertzea eta Cavalieriren printzipioa aplikatzea.', 'Entender el volumen del ortoedro contando cubos unidad y aplicar el principio de Cavalieri.', 'فهم حجم متوازي المستطيلات بعدّ مكعبات الوحدة وتطبيق مبدأ كافاليري.'),
        explanation: say(
            'Ortoedro bat unitate-kuboekin betetzen badugu, beheko geruzan luzera bider zabalera kubo sartzen dira, eta altuera adina geruza daude. Beraz, $V=a\\cdot b\\cdot c$: oinarriaren azalera bider altuera. Kuboan, $V=l^{3}$. Bonaventura Cavalierik printzipio hau eman zuen: bi gorputzek altuera bera badute eta oinarriarekiko paraleloak diren plano guztiek azalera bereko sekzioak sortzen badituzte, bolumen bera dute. Txanpon-pila zuzen batek eta okertu batek bolumen bera dute. Horregatik, prisma zeihar baten bolumena prisma zuzen batena bezala kalkulatzen da, eta formula berak balio du edozein prismatarako.',
            'Si llenamos un ortoedro con cubos unidad, en la capa de abajo caben largo por ancho cubos, y hay tantas capas como la altura. Por eso $V=a\\cdot b\\cdot c$: área de la base por altura. En el cubo, $V=l^{3}$. Bonaventura Cavalieri dio este principio: si dos cuerpos tienen la misma altura y todos los planos paralelos a la base cortan secciones de la misma área, tienen el mismo volumen. Una pila de monedas recta y otra inclinada tienen el mismo volumen. Por eso el volumen de un prisma oblicuo se calcula como el de uno recto, y la misma fórmula vale para cualquier prisma.',
            'إذا ملأنا متوازي مستطيلات بمكعبات الوحدة ففي الطبقة السفلى عدد من المكعبات يساوي الطول في العرض، وعدد الطبقات يساوي الارتفاع. لذلك $V=a\\cdot b\\cdot c$: مساحة القاعدة في الارتفاع. وفي المكعب $V=l^{3}$. وضع بونافنتورا كافاليري هذا المبدأ: إذا كان لجسمين الارتفاع نفسه وكانت جميع المستويات الموازية للقاعدة تقطع منهما مقاطع متساوية المساحة فلهما الحجم نفسه. لكومة نقود مستقيمة وأخرى مائلة الحجم نفسه. لذلك يُحسب حجم المنشور المائل كالمنشور القائم، والصيغة نفسها تصلح لكل منشور.'
        ),
        problem: say('Kaxa batek 25 cm × 20 cm × 16 cm neurtzen ditu. Zein da haren bolumena litrotan?', 'Una caja mide 25 cm × 20 cm × 16 cm. ¿Cuál es su volumen en litros?', 'صندوق أبعاده 25 سم × 20 سم × 16 سم. ما حجمه باللتر؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu hiru neurriak.', 'Multiplica las tres medidas.', 'اضرب الأبعاد الثلاثة.'), math: same('$25\\cdot 20\\cdot 16=8000$') },
            { text: say('1000 cm³ = 1 L.', '1000 cm³ = 1 L.', '1000 cm³ = 1 L.'), math: same('$8000\\mathbin{:}1000=8$') }
        ],
        example: same('$V=a\\cdot b\\cdot c\\qquad V=l^{3}$'),
        takeaway: say('Ortoedroa: luzera · zabalera · altuera. Sekzio berdinak eta altuera bera → bolumen bera.', 'Ortoedro: largo · ancho · alto. Mismas secciones y misma altura → mismo volumen.', 'متوازي المستطيلات: الطول · العرض · الارتفاع. مقاطع متساوية وارتفاع واحد ← حجم واحد.'),
        figure: (language) => <CavalieriFigure language={language} />
    },

    /* ---------- 5. Volumes ---------- */
    {
        id: 'prism-volume',
        stage: 'volume',
        title: say('Prismaren eta zilindroaren bolumena', 'Volumen del prisma y del cilindro', 'حجم المنشور والأسطوانة'),
        goal: say('Prismen eta zilindroen bolumena oinarriaren azalera bider altuera gisa kalkulatzea.', 'Calcular el volumen de prismas y cilindros como área de la base por altura.', 'حساب حجم المناشير والأسطوانات بوصفه مساحة القاعدة في الارتفاع.'),
        explanation: say(
            'Cavalieriren printzipioaren arabera, oinarri bereko azalera eta altuera bera dituzten prisma guztiek ortoedroaren bolumen bera dute. Beraz, edozein prismatan eta zilindrotan: $V=A_O\\cdot h$. Lehenik oinarriaren azalera kalkulatzen da (triangelua, trapezioa, poligono erregularra…), eta gero altuerarekin biderkatzen da. Zilindroan oinarria zirkulua da: $V=\\pi r^{2}h$. Gorputz konposatuetan, zatitu gorputz ezagunetan eta batu (edo kendu, zulo bat badago) bolumenak. Emaitza litrotan eskatzen badute, gogoratu $1\\ \\text{dm}^{3}=1\\ \\text{L}$.',
            'Según el principio de Cavalieri, todos los prismas con base de la misma área e igual altura tienen el volumen del ortoedro. Por eso, en cualquier prisma y cilindro: $V=A_B\\cdot h$. Primero se calcula el área de la base (triángulo, trapecio, polígono regular…) y luego se multiplica por la altura. En el cilindro la base es un círculo: $V=\\pi r^{2}h$. En los cuerpos compuestos, divide en cuerpos conocidos y suma (o resta, si hay un hueco) los volúmenes. Si piden el resultado en litros, recuerda que $1\\ \\text{dm}^{3}=1\\ \\text{L}$.',
            'وفق مبدأ كافاليري، لجميع المناشير التي لقواعدها المساحة نفسها والارتفاع نفسه حجمُ متوازي المستطيلات. لذلك في أي منشور وأسطوانة: $V=A_B\\cdot h$. تُحسب أولًا مساحة القاعدة (مثلث، شبه منحرف، مضلع منتظم…) ثم تُضرب في الارتفاع. وفي الأسطوانة القاعدة دائرة: $V=\\pi r^{2}h$. وفي الأجسام المركبة قسّم إلى أجسام معروفة واجمع الحجوم (أو اطرح إذا كان فيها تجويف). وإذا طُلبت النتيجة باللتر فتذكّر أن $1\\ \\text{dm}^{3}=1\\ \\text{L}$.'
        ),
        problem: say('Lata zilindriko batek 4 cm-ko erradioa eta 10 cm-ko altuera ditu. Zenbat cm³ sartzen dira?', 'Una lata cilíndrica tiene 4 cm de radio y 10 cm de altura. ¿Cuántos cm³ caben?', 'علبة أسطوانية نصف قطرها 4 سم وارتفاعها 10 سم. كم سم³ تسع؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Oinarria: zirkulua.', 'Base: un círculo.', 'القاعدة: دائرة.'), math: same('$3{,}14\\cdot 4^{2}=50{,}24$') },
            { text: say('Bider altuera.', 'Por la altura.', 'في الارتفاع.'), math: same('$50{,}24\\cdot 10=502{,}4$') },
            { text: say('Ia erdi litro: 0,5024 L.', 'Casi medio litro: 0,5024 L.', 'نحو نصف لتر: 0.5024 L.') }
        ],
        example: say('$V=A_O\\cdot h\\qquad V=\\pi r^{2}h$', '$V=A_B\\cdot h\\qquad V=\\pi r^{2}h$', '$V=A_B\\cdot h\\qquad V=\\pi r^{2}h$'),
        takeaway: say('Prisma eta zilindroa: oinarriaren azalera bider altuera.', 'Prisma y cilindro: área de la base por altura.', 'المنشور والأسطوانة: مساحة القاعدة في الارتفاع.'),
        figure: (language) => <PrismVolumeFigure language={language} />
    },
    {
        id: 'pyramid-volume',
        stage: 'volume',
        title: say('Piramidearen eta konoaren bolumena', 'Volumen de la pirámide y del cono', 'حجم الهرم والمخروط'),
        goal: say('Piramideen eta konoen bolumena prisma eta zilindro baten heren gisa kalkulatzea.', 'Calcular el volumen de pirámides y conos como un tercio de un prisma y un cilindro.', 'حساب حجم الأهرامات والمخاريط بوصفه ثلث منشور وأسطوانة.'),
        explanation: say(
            'Piramide bat urez bete eta oinarri eta altuera bereko prisma batera hustuz gero, hiru aldiz egin behar da prisma betetzeko. Beraz, piramidearen bolumena prismaren herena da: $V=\\frac{A_O\\cdot h}{3}$. Gauza bera gertatzen da konoarekin eta zilindroarekin: $V=\\frac{\\pi r^{2}h}{3}$. Kontuz: formulan altuera erabiltzen da, ez apotema edo sortzailea; behar bada, Pitagorasekin kalkulatzen da. Enborren bolumena bi gorputzen kendura da: piramide handia ken moztutako piramide txikia.',
            'Si llenamos de agua una pirámide y la vaciamos en un prisma de igual base y altura, hay que hacerlo tres veces para llenar el prisma. Por eso el volumen de la pirámide es un tercio del del prisma: $V=\\frac{A_B\\cdot h}{3}$. Lo mismo pasa con el cono y el cilindro: $V=\\frac{\\pi r^{2}h}{3}$. Cuidado: en la fórmula va la altura, no la apotema ni la generatriz; si hace falta, se calcula con Pitágoras. El volumen de los troncos es la resta de dos cuerpos: la pirámide grande menos la pequeña que se ha cortado.',
            'إذا ملأنا هرمًا بالماء وأفرغناه في منشور له القاعدة والارتفاع نفسهما فعلينا تكرار ذلك ثلاث مرات لملء المنشور. لذلك حجم الهرم ثلث حجم المنشور: $V=\\frac{A_B\\cdot h}{3}$. والأمر نفسه في المخروط والأسطوانة: $V=\\frac{\\pi r^{2}h}{3}$. انتبه: في الصيغة يدخل الارتفاع لا العامد ولا الراسم؛ وعند الحاجة يُحسب بفيثاغورس. وحجم الجذوع فرق جسمين: الهرم الكبير ناقص الهرم الصغير المقطوع.'
        ),
        problem: say('Kono baten sortzailea 10 cm da eta erradioa 6 cm. Kalkulatu bolumena.', 'La generatriz de un cono mide 10 cm y el radio 6 cm. Calcula su volumen.', 'راسم مخروط 10 سم ونصف قطره 6 سم. احسب حجمه.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Altuera Pitagorasekin.', 'La altura con Pitágoras.', 'الارتفاع بفيثاغورس.'), math: same('$h=\\sqrt{10^{2}-6^{2}}=8$') },
            { text: say('Zilindroaren herena.', 'Un tercio del cilindro.', 'ثلث الأسطوانة.'), math: same('$\\frac{3{,}14\\cdot 36\\cdot 8}{3}=301{,}44$') }
        ],
        example: say('$V=\\frac{A_O\\cdot h}{3}\\qquad V=\\frac{\\pi r^{2}h}{3}$', '$V=\\frac{A_B\\cdot h}{3}\\qquad V=\\frac{\\pi r^{2}h}{3}$', '$V=\\frac{A_B\\cdot h}{3}\\qquad V=\\frac{\\pi r^{2}h}{3}$'),
        takeaway: say('Piramidea eta konoa: prismaren eta zilindroaren herena. Altuera, ez apotema.', 'Pirámide y cono: un tercio del prisma y del cilindro. Altura, no apotema.', 'الهرم والمخروط: ثلث المنشور والأسطوانة. الارتفاع لا العامد.'),
        figure: (language) => <PyramidVolumeFigure language={language} />
    },
    {
        id: 'sphere-volume',
        stage: 'volume',
        title: say('Esferaren bolumena eta problemak', 'Volumen de la esfera y problemas', 'حجم الكرة والمسائل'),
        goal: say('Esferaren bolumena kalkulatzea eta gorputz konposatuen eta eguneroko bolumen-problemak ebaztea.', 'Calcular el volumen de la esfera y resolver problemas de cuerpos compuestos y volúmenes cotidianos.', 'حساب حجم الكرة وحل مسائل الأجسام المركبة والحجوم اليومية.'),
        explanation: say(
            'Arkimedesek erakutsi zuen esferaren bolumena zilindro zirkunskribatuaren bi heren dela: zilindroak $\\pi r^{2}\\cdot 2r=2\\pi r^{3}$ du, eta esferak $V=\\frac{4}{3}\\pi r^{3}$. Erdiesferak erdia du. Problemetan: identifikatu gorputzak, idatzi datuak unitate berean, kalkulatu bolumen bakoitza eta batu edo kendu. Adibidez, kaxa batean bolak sartzen badira, geratzen den hutsunea kaxaren bolumena ken bolen bolumena da. Amaieran, eman emaitza eskatutako unitatean (L, m³…) eta egiaztatu zentzuzkoa dela.',
            'Arquímedes demostró que el volumen de la esfera es dos tercios del de su cilindro circunscrito: el cilindro tiene $\\pi r^{2}\\cdot 2r=2\\pi r^{3}$ y la esfera, $V=\\frac{4}{3}\\pi r^{3}$. La semiesfera tiene la mitad. En los problemas: identifica los cuerpos, escribe los datos en la misma unidad, calcula cada volumen y suma o resta. Por ejemplo, si metemos bolas en una caja, el hueco que queda es el volumen de la caja menos el de las bolas. Al final, da el resultado en la unidad pedida (L, m³…) y comprueba que tiene sentido.',
            'برهن أرخميدس أن حجم الكرة ثلثا حجم الأسطوانة المحيطة بها: للأسطوانة $\\pi r^{2}\\cdot 2r=2\\pi r^{3}$ وللكرة $V=\\frac{4}{3}\\pi r^{3}$. ولنصف الكرة النصف. في المسائل: حدّد الأجسام، واكتب المعطيات بالوحدة نفسها، واحسب كل حجم ثم اجمع أو اطرح. مثلًا إذا وضعنا كرات في صندوق فالفراغ الباقي حجم الصندوق ناقص حجم الكرات. وفي النهاية أعطِ النتيجة بالوحدة المطلوبة (L، m³…) وتحقّق من معقوليتها.'
        ),
        problem: say('Kalkulatu 3 cm-ko erradioko bola baten bolumena.', 'Calcula el volumen de una bola de 3 cm de radio.', 'احسب حجم كرة نصف قطرها 3 سم.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erradioaren kuboa.', 'El cubo del radio.', 'مكعب نصف القطر.'), math: same('$3^{3}=27$') },
            { text: say('Formula.', 'La fórmula.', 'الصيغة.'), math: same('$\\frac{4\\cdot 3{,}14\\cdot 27}{3}=113{,}04$') }
        ],
        example: same('$V=\\frac{4}{3}\\pi r^{3}$'),
        takeaway: say('Esfera: $\\frac{4}{3}\\pi r^{3}$, zilindroaren bi heren. Konposatuak: zatitu, kalkulatu, batu edo kendu.', 'Esfera: $\\frac{4}{3}\\pi r^{3}$, dos tercios del cilindro. Compuestos: divide, calcula, suma o resta.', 'الكرة: $\\frac{4}{3}\\pi r^{3}$، ثلثا الأسطوانة. المركبة: قسّم واحسب واجمع أو اطرح.'),
        figure: (language) => <SphereVolumeFigure language={language} />
    }
]
