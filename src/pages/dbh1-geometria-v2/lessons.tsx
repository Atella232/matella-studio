import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { AnglePairsFigure, AngleTypesFigure, AreaFigure, CircleFigure, LinesFigure, PerimeterFigure, PolygonFigure, PythagorasFigure, QuadrilateralsFigure, TriangleSumFigure, TriangleTypesFigure } from './figures'

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
const dec = (latex: string): LocalizedText => ({ eu: latex, es: latex, ar: latex.replace(/\{,\}/g, '.') })

export const geometryIntroStages: UnitStage[] = [
    { id: 'angles', tone: 'blue', title: { eu: 'Zuzenak eta angeluak', es: 'Rectas y ángulos', ar: 'المستقيمات والزوايا' } },
    { id: 'polygons', tone: 'violet', title: { eu: 'Poligonoak eta zirkulua', es: 'Polígonos y círculo', ar: 'المضلعات والدائرة' } },
    { id: 'pythagoras', tone: 'mustard', title: { eu: 'Pitagorasen teorema', es: 'Teorema de Pitágoras', ar: 'مبرهنة فيثاغورس' } },
    { id: 'perimeters', tone: 'coral', title: { eu: 'Unitateak eta perimetroak', es: 'Unidades y perímetros', ar: 'الوحدات والمحيطات' } },
    { id: 'areas', tone: 'green', title: { eu: 'Azalerak', es: 'Áreas', ar: 'المساحات' } }
]

export const geometryIntroTopics: UnitTopic[] = [
    {
        id: 'lines',
        stage: 'angles',
        title: { eu: 'Zuzenak, zuzerdiak eta zuzenkiak', es: 'Rectas, semirrectas y segmentos', ar: 'المستقيمات وأنصافها والقطع' },
        goal: {
            eu: 'Zuzena, zuzerdia eta zuzenkia bereiztea eta bi zuzenen posizioak ezagutzea.',
            es: 'Distinguir recta, semirrecta y segmento y conocer las posiciones de dos rectas.',
            ar: 'التمييز بين المستقيم ونصفه والقطعة ومعرفة أوضاع مستقيمين.'
        },
        explanation: {
            eu: 'Zuzena norabide bakarrean jarraitzen duen puntu-segida infinitua da: ez du ez hasierarik ez amaierarik. Puntu batek zuzena bi zuzerditan banatzen du: zuzerdiak hasiera du baina ez amaiera. Zuzenkia bi puntuk mugatutako zuzen-zatia da. Plano batean bi zuzen paraleloak izan daitezke (ez dira inoiz elkartzen) edo ebakitzaileak (puntu batean elkartzen dira); ebakitzaileek lau angelu zuzen osatzen badituzte, perpendikularrak dira.',
            es: 'Una recta es una sucesión infinita de puntos en una misma dirección: no tiene principio ni fin. Un punto divide la recta en dos semirrectas: la semirrecta tiene principio pero no fin. Un segmento es la parte de recta limitada por dos puntos. En un plano, dos rectas pueden ser paralelas (no se cortan nunca) o secantes (se cortan en un punto); si las secantes forman cuatro ángulos rectos, son perpendiculares.',
            ar: 'المستقيم تتابع لا نهائي من النقاط في اتجاه واحد: لا بداية له ولا نهاية. والنقطة تقسم المستقيم إلى نصفي مستقيم: لنصف المستقيم بداية وليس له نهاية. والقطعة جزء من المستقيم يحدّه نقطتان. في المستوي يكون المستقيمان متوازيين (لا يتقاطعان أبدًا) أو متقاطعين (يتقاطعان في نقطة)؛ وإذا كوّن المتقاطعان أربع زوايا قائمة فهما متعامدان.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Zuzena', es: 'Recta', ar: 'المستقيم' }, text: { eu: 'Bi norabideetan infinitua. Letra xehez izendatzen da: r, s.', es: 'Infinita en los dos sentidos. Se nombra con letra minúscula: r, s.', ar: 'لا نهائي في الاتجاهين. يُسمّى بحرف صغير: r، s.' } },
            { title: { eu: 'Zuzenkia', es: 'Segmento', ar: 'القطعة' }, text: { eu: 'Bi mutur ditu: AB. Neur daiteke.', es: 'Tiene dos extremos: AB. Se puede medir.', ar: 'لها طرفان: AB. ويمكن قياسها.' } },
            { title: { eu: 'Posizioak', es: 'Posiciones', ar: 'الأوضاع' }, text: { eu: 'Paraleloak, ebakitzaileak edo perpendikularrak.', es: 'Paralelas, secantes o perpendiculares.', ar: 'متوازيان أو متقاطعان أو متعامدان.' } }
        ],
        example: '$r\\parallel s\\qquad r\\perp t$',
        takeaway: {
            eu: 'Zuzenkia bakarrik neur daiteke: zuzenak eta zuzerdiak ez dute amaierarik.',
            es: 'Solo el segmento se puede medir: la recta y la semirrecta no terminan.',
            ar: 'القطعة وحدها تُقاس: المستقيم ونصفه لا ينتهيان.'
        },
        figure: (language) => <LinesFigure language={language} />
    },
    {
        id: 'angles',
        stage: 'angles',
        title: { eu: 'Angeluak eta haien neurria', es: 'Los ángulos y su medida', ar: 'الزوايا وقياسها' },
        goal: {
            eu: 'Angelu baten elementuak ezagutzea eta angeluak neurriaren arabera sailkatzea.',
            es: 'Conocer los elementos de un ángulo y clasificar los ángulos según su medida.',
            ar: 'معرفة عناصر الزاوية وتصنيف الزوايا حسب قياسها.'
        },
        explanation: {
            eu: 'Angelua puntu berean hasten diren bi zuzerdik mugatutako planoaren zatia da. Puntua erpina da, eta zuzerdiak aldeak. Angeluak graduetan (°) neurtzen dira garraiagailuarekin: angelu osoak 360° ditu. Neurriaren arabera: zorrotza (90° baino gutxiago), zuzena (90°), kamutsa (90° eta 180° artean), laua (180°) eta osoa (360°).',
            es: 'Un ángulo es la parte del plano limitada por dos semirrectas que parten del mismo punto. El punto es el vértice y las semirrectas, los lados. Los ángulos se miden en grados (°) con el transportador: el ángulo completo mide 360°. Según su medida: agudo (menos de 90°), recto (90°), obtuso (entre 90° y 180°), llano (180°) y completo (360°).',
            ar: 'الزاوية جزء من المستوي يحدّه نصفا مستقيم ينطلقان من النقطة نفسها. النقطة هي الرأس، ونصفا المستقيم هما الضلعان. تُقاس الزوايا بالدرجات (°) بالمنقلة: الزاوية الكاملة 360°. وحسب قياسها: حادة (أقل من 90°)، وقائمة (90°)، ومنفرجة (بين 90° و180°)، ومستقيمة (180°)، وكاملة (360°).'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Zorrotza', es: 'Agudo', ar: 'حادة' }, text: { eu: 'Zuzena baino txikiagoa.', es: 'Menor que un recto.', ar: 'أصغر من القائمة.' }, math: '$0^{\\circ}<\\alpha<90^{\\circ}$' },
            { title: { eu: 'Zuzena', es: 'Recto', ar: 'قائمة' }, text: { eu: 'Laukitxo batez markatzen da.', es: 'Se marca con un cuadradito.', ar: 'تُعلَّم بمربع صغير.' }, math: '$\\alpha=90^{\\circ}$' },
            { title: { eu: 'Kamutsa', es: 'Obtuso', ar: 'منفرجة' }, text: { eu: 'Zuzena baino handiagoa eta laua baino txikiagoa.', es: 'Mayor que un recto y menor que un llano.', ar: 'أكبر من القائمة وأصغر من المستقيمة.' }, math: '$90^{\\circ}<\\alpha<180^{\\circ}$' },
            { title: { eu: 'Laua', es: 'Llano', ar: 'مستقيمة' }, text: { eu: 'Bi aldeek zuzen bat osatzen dute.', es: 'Los dos lados forman una recta.', ar: 'الضلعان يكوّنان مستقيمًا.' }, math: '$\\alpha=180^{\\circ}$' }
        ],
        example: { eu: '$45^{\\circ}\\ \\text{zorrotza}\\qquad 120^{\\circ}\\ \\text{kamutsa}$', es: '$45^{\\circ}\\ \\text{agudo}\\qquad 120^{\\circ}\\ \\text{obtuso}$', ar: '$45^{\\circ}<90^{\\circ}<120^{\\circ}$' },
        takeaway: {
            eu: 'Konparatu beti 90°-rekin eta 180°-rekin.',
            es: 'Compara siempre con 90° y con 180°.',
            ar: 'قارن دائمًا بـ 90° و180°.'
        },
        figure: (language) => <AngleTypesFigure language={language} />
    },
    {
        id: 'angle-pairs',
        stage: 'angles',
        title: { eu: 'Angelu osagarriak eta betegarriak', es: 'Ángulos complementarios y suplementarios', ar: 'الزوايا المتتامة والمتكاملة' },
        goal: {
            eu: 'Angelu baten osagarria eta betegarria kalkulatzea, eta erpinez aurkakoak ezagutzea.',
            es: 'Calcular el complementario y el suplementario de un ángulo y reconocer los opuestos por el vértice.',
            ar: 'حساب المتممة والمكملة لزاوية ومعرفة الزاويتين المتقابلتين بالرأس.'
        },
        explanation: {
            eu: 'Bi angelu osagarriak dira batuta 90° ematen badute, eta betegarriak batuta 180° ematen badute. Bi zuzen ebakitzen direnean, erpinez aurkako angeluak berdinak dira, eta ondoz ondokoak betegarriak.',
            es: 'Dos ángulos son complementarios si suman 90° y suplementarios si suman 180°. Cuando dos rectas se cortan, los ángulos opuestos por el vértice son iguales y los contiguos son suplementarios.',
            ar: 'تكون زاويتان متتامتين إذا كان مجموعهما 90°، ومتكاملتين إذا كان مجموعهما 180°. وعندما يتقاطع مستقيمان تكون الزاويتان المتقابلتان بالرأس متساويتين، والمتجاورتان متكاملتين.'
        },
        problem: { eu: 'Kalkulatu 35°-ko angeluaren osagarria eta betegarria.', es: 'Calcula el complementario y el suplementario de un ángulo de 35°.', ar: 'احسب المتممة والمكملة لزاوية قياسها 35°.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Osagarria: kendu 90°-ri.', es: 'Complementario: réstalo de 90°.', ar: 'المتممة: اطرحها من 90°.' }, math: '$90^{\\circ}-35^{\\circ}=55^{\\circ}$' },
            { text: { eu: 'Betegarria: kendu 180°-ri.', es: 'Suplementario: réstalo de 180°.', ar: 'المكملة: اطرحها من 180°.' }, math: '$180^{\\circ}-35^{\\circ}=145^{\\circ}$' },
            { title: { eu: 'Kontuz', es: 'Cuidado', ar: 'انتبه' }, text: { eu: 'Kamuts batek ez du osagarririk: 90° baino gehiago da.', es: 'Un obtuso no tiene complementario: ya pasa de 90°.', ar: 'الزاوية المنفرجة ليس لها متممة: فهي تتجاوز 90°.' } }
        ],
        example: '$\\begin{gathered}60^{\\circ}+30^{\\circ}=90^{\\circ}\\\\120^{\\circ}+60^{\\circ}=180^{\\circ}\\end{gathered}$',
        takeaway: {
            eu: 'Osagarriak: 90°. Betegarriak: 180°.',
            es: 'Complementarios: 90°. Suplementarios: 180°.',
            ar: 'المتتامتان: 90°. المتكاملتان: 180°.'
        },
        figure: (language) => <AnglePairsFigure language={language} />
    },
    {
        id: 'polygons',
        stage: 'polygons',
        title: { eu: 'Poligonoak', es: 'Polígonos', ar: 'المضلعات' },
        goal: {
            eu: 'Poligono baten elementuak ezagutzea eta poligonoak alde kopuruaren arabera izendatzea.',
            es: 'Conocer los elementos de un polígono y nombrar los polígonos según su número de lados.',
            ar: 'معرفة عناصر المضلع وتسمية المضلعات حسب عدد أضلاعها.'
        },
        explanation: {
            eu: 'Poligonoa zuzenki-lerro itxi batek mugatutako planoaren zatia da. Elementuak: aldeak, erpinak, angeluak eta diagonalak (ondoz ondokoak ez diren bi erpin lotzen dituzten zuzenkiak). Alde kopuruaren arabera: triangelua (3), laukia (4), pentagonoa (5), hexagonoa (6), heptagonoa (7), oktogonoa (8)… Alde eta angelu guztiak berdinak dituena poligono erregularra da.',
            es: 'Un polígono es la parte del plano limitada por una línea poligonal cerrada. Sus elementos son los lados, los vértices, los ángulos y las diagonales (segmentos que unen dos vértices no consecutivos). Según el número de lados: triángulo (3), cuadrilátero (4), pentágono (5), hexágono (6), heptágono (7), octógono (8)… Si tiene todos los lados y ángulos iguales, es un polígono regular.',
            ar: 'المضلع جزء من المستوي يحدّه خط مضلعي مغلق. عناصره: الأضلاع والرؤوس والزوايا والأقطار (قطع تصل رأسين غير متتاليين). وحسب عدد الأضلاع: مثلث (3)، رباعي (4)، مخمس (5)، مسدس (6)، مسبع (7)، مثمن (8)… وإذا كانت كل أضلاعه وزواياه متساوية فهو مضلع منتظم.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Elementuak', es: 'Elementos', ar: 'العناصر' }, text: { eu: 'Poligono batek adina alde, erpin eta angelu ditu.', es: 'Un polígono tiene tantos lados como vértices y ángulos.', ar: 'للمضلع عدد من الأضلاع يساوي عدد رؤوسه وزواياه.' } },
            { title: { eu: 'Erregularrak', es: 'Regulares', ar: 'المنتظمة' }, text: { eu: 'Alde berdinak eta angelu berdinak: triangelu aldeberdina, karratua, hexagono erregularra.', es: 'Lados iguales y ángulos iguales: triángulo equilátero, cuadrado, hexágono regular.', ar: 'أضلاع متساوية وزوايا متساوية: المثلث المتساوي الأضلاع والمربع والمسدس المنتظم.' } },
            { title: { eu: 'Ganbilak eta ahurrak', es: 'Convexos y cóncavos', ar: 'المحدبة والمقعرة' }, text: { eu: 'Ahur batek 180° baino gehiagoko angelu bat du gutxienez.', es: 'Uno cóncavo tiene al menos un ángulo de más de 180°.', ar: 'للمضلع المقعر زاوية واحدة على الأقل أكبر من 180°.' } }
        ],
        example: { eu: '$5\\ \\text{alde}\\to\\ \\text{pentagonoa}$', es: '$5\\ \\text{lados}\\to\\ \\text{pentágono}$', ar: '$5\\to$ مخمس' },
        takeaway: {
            eu: 'Aldeak = erpinak = angeluak.',
            es: 'Lados = vértices = ángulos.',
            ar: 'الأضلاع = الرؤوس = الزوايا.'
        },
        figure: (language) => <PolygonFigure language={language} />
    },
    {
        id: 'triangles',
        stage: 'polygons',
        title: { eu: 'Triangeluak', es: 'Triángulos', ar: 'المثلثات' },
        goal: {
            eu: 'Triangeluak aldeen eta angeluen arabera sailkatzea eta angeluen batura erabiltzea.',
            es: 'Clasificar triángulos según sus lados y sus ángulos y usar la suma de sus ángulos.',
            ar: 'تصنيف المثلثات حسب أضلاعها وزواياها واستعمال مجموع زواياها.'
        },
        explanation: {
            eu: 'Aldeen arabera, triangelu bat aldeberdina (hiru alde berdin), isoszelea (bi berdin) edo eskalenoa (guztiak desberdinak) da. Angeluen arabera, angeluzuzena (angelu zuzen bat), angelu-zorrotza (hiru zorrotz) edo angelu-kamutsa (kamuts bat). Edozein triangeluren hiru angeluen batura 180° da; horregatik, bi angelu ezagututa hirugarrena kalkula daiteke.',
            es: 'Según sus lados, un triángulo es equilátero (tres lados iguales), isósceles (dos iguales) o escaleno (todos distintos). Según sus ángulos, es rectángulo (un ángulo recto), acutángulo (tres agudos) u obtusángulo (uno obtuso). Los tres ángulos de cualquier triángulo suman 180°; por eso, conociendo dos, se calcula el tercero.',
            ar: 'حسب الأضلاع يكون المثلث متساوي الأضلاع (ثلاثة أضلاع متساوية) أو متساوي الساقين (ضلعان متساويان) أو مختلف الأضلاع. وحسب الزوايا يكون قائم الزاوية (زاوية قائمة) أو حاد الزوايا (ثلاث زوايا حادة) أو منفرج الزاوية (زاوية منفرجة). ومجموع زوايا أي مثلث 180°؛ لذلك إذا عرفنا زاويتين نحسب الثالثة.'
        },
        problem: { eu: 'Triangelu baten bi angeluak 50° eta 70° dira. Zenbat da hirugarrena?', es: 'Dos ángulos de un triángulo miden 50° y 70°. ¿Cuánto mide el tercero?', ar: 'زاويتان في مثلث قياسهما 50° و70°. كم قياس الثالثة؟' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Batu ezagunak.', es: 'Suma los conocidos.', ar: 'اجمع المعلومتين.' }, math: '$50^{\\circ}+70^{\\circ}=120^{\\circ}$' },
            { text: { eu: 'Kendu 180°-ri.', es: 'Réstalo de 180°.', ar: 'اطرح من 180°.' }, math: '$180^{\\circ}-120^{\\circ}=60^{\\circ}$' },
            { text: { eu: 'Hiru angeluak zorrotzak dira: angelu-zorrotza da.', es: 'Los tres ángulos son agudos: es acutángulo.', ar: 'الزوايا الثلاث حادة: إنه حاد الزوايا.' } }
        ],
        example: '$90^{\\circ}+30^{\\circ}+60^{\\circ}=180^{\\circ}$',
        takeaway: {
            eu: 'Triangelu baten angeluak: beti 180°.',
            es: 'Los ángulos de un triángulo: siempre 180°.',
            ar: 'زوايا المثلث: دائمًا 180°.'
        },
        figure: (language) => <TriangleSumFigure language={language} />
    },
    {
        id: 'triangle-lines',
        stage: 'polygons',
        title: { eu: 'Triangelu motak eta zuzen nabarmenak', es: 'Tipos de triángulos y rectas notables', ar: 'أنواع المثلثات والمستقيمات المهمة' },
        goal: {
            eu: 'Triangelu baten altuerak, erdibidekoak, erdibitzaileak eta erdikariak ezagutzea.',
            es: 'Conocer las alturas, medianas, mediatrices y bisectrices de un triángulo.',
            ar: 'معرفة ارتفاعات المثلث ومتوسطاته ومحاوره ومنصفات زواياه.'
        },
        explanation: {
            eu: 'Triangelu batek lau zuzen nabarmen mota ditu, eta mota bakoitzeko hiru zuzenak puntu batean elkartzen dira. Altuera erpin batetik aurkako aldera doan zuzenki perpendikularra da (ortozentroa). Erdibidekoak erpin bat aurkako aldearen erdiko puntuarekin lotzen du (barizentroa). Erdibitzailea alde baten erdiko puntutik doan perpendikularra da (zirkunzentroa). Erdikariak angelu bat bi zati berdinetan banatzen du (inzentroa).',
            es: 'Un triángulo tiene cuatro tipos de rectas notables, y las tres de cada tipo se cortan en un punto. La altura es el segmento perpendicular desde un vértice al lado opuesto (ortocentro). La mediana une un vértice con el punto medio del lado opuesto (baricentro). La mediatriz es la perpendicular por el punto medio de un lado (circuncentro). La bisectriz divide un ángulo en dos partes iguales (incentro).',
            ar: 'للمثلث أربعة أنواع من المستقيمات المهمة، وتتقاطع الثلاثة من كل نوع في نقطة. الارتفاع قطعة عمودية من رأس إلى الضلع المقابل (ملتقى الارتفاعات). والمتوسط يصل رأسًا بمنتصف الضلع المقابل (مركز الثقل). والمحور عمود على الضلع في منتصفه (مركز الدائرة المحيطة). ومنصف الزاوية يقسمها إلى جزأين متساويين (مركز الدائرة الداخلية).'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Altuerak', es: 'Alturas', ar: 'الارتفاعات' }, text: { eu: 'Erpinetik aurkako aldera, perpendikular. Ortozentroa.', es: 'Del vértice al lado opuesto, perpendicular. Ortocentro.', ar: 'من الرأس إلى الضلع المقابل عموديًا. ملتقى الارتفاعات.' } },
            { title: { eu: 'Erdibidekoak', es: 'Medianas', ar: 'المتوسطات' }, text: { eu: 'Erpinetik aurkako aldearen erdira. Barizentroa.', es: 'Del vértice al punto medio del lado opuesto. Baricentro.', ar: 'من الرأس إلى منتصف الضلع المقابل. مركز الثقل.' } },
            { title: { eu: 'Erdibitzaileak', es: 'Mediatrices', ar: 'المحاور' }, text: { eu: 'Aldearen erdian, perpendikular. Zirkunzentroa.', es: 'Perpendicular por el punto medio de cada lado. Circuncentro.', ar: 'عمودية في منتصف كل ضلع. مركز الدائرة المحيطة.' } },
            { title: { eu: 'Erdikariak', es: 'Bisectrices', ar: 'المنصفات' }, text: { eu: 'Angelua bitan banatzen dute. Inzentroa.', es: 'Dividen cada ángulo en dos iguales. Incentro.', ar: 'تقسم كل زاوية إلى نصفين. مركز الدائرة الداخلية.' } }
        ],
        example: { eu: '$\\text{altuerak}\\to\\text{ortozentroa}$', es: '$\\text{alturas}\\to\\text{ortocentro}$', ar: '$h\\to H$' },
        takeaway: {
            eu: 'Mota bakoitzeko hiru zuzenak puntu bakar batean elkartzen dira.',
            es: 'Las tres rectas de cada tipo se cortan en un único punto.',
            ar: 'تتقاطع المستقيمات الثلاثة من كل نوع في نقطة واحدة.'
        },
        figure: (language) => <TriangleTypesFigure language={language} />
    },
    {
        id: 'quadrilaterals',
        stage: 'polygons',
        title: { eu: 'Laukiak', es: 'Cuadriláteros', ar: 'الرباعيات' },
        goal: {
            eu: 'Laukiak sailkatzea: paralelogramoak, trapezioak eta trapezoideak.',
            es: 'Clasificar cuadriláteros: paralelogramos, trapecios y trapezoides.',
            ar: 'تصنيف الرباعيات: متوازيات الأضلاع وأشباه المنحرف والرباعيات غير المنتظمة.'
        },
        explanation: {
            eu: 'Laukiak lau alde ditu, eta haren angeluen batura 360° da. Aurkako aldeak paraleloak bikoteka badira, paralelogramoa da: karratua (lau alde berdin eta lau angelu zuzen), laukizuzena (angelu zuzenak), erronboa (lau alde berdin) eta erronboidea. Bi alde paralelo bakarrik baditu, trapezioa da; bat ere ez, trapezoidea.',
            es: 'Un cuadrilátero tiene cuatro lados y sus ángulos suman 360°. Si los lados opuestos son paralelos dos a dos, es un paralelogramo: cuadrado (cuatro lados iguales y cuatro ángulos rectos), rectángulo (ángulos rectos), rombo (cuatro lados iguales) y romboide. Si solo tiene dos lados paralelos, es un trapecio; si no tiene ninguno, un trapezoide.',
            ar: 'للرباعي أربعة أضلاع، ومجموع زواياه 360°. إذا كان كل ضلعين متقابلين متوازيين فهو متوازي أضلاع: المربع (أربعة أضلاع متساوية وأربع زوايا قائمة)، والمستطيل (زوايا قائمة)، والمعيّن (أربعة أضلاع متساوية)، ومتوازي الأضلاع العام. وإذا كان فيه ضلعان متوازيان فقط فهو شبه منحرف، وإن لم يكن فيه أي منهما فهو رباعي غير منتظم.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Paralelogramoak', es: 'Paralelogramos', ar: 'متوازيات الأضلاع' }, text: { eu: 'Karratua, laukizuzena, erronboa, erronboidea.', es: 'Cuadrado, rectángulo, rombo, romboide.', ar: 'المربع، المستطيل، المعيّن، متوازي الأضلاع.' } },
            { title: { eu: 'Trapezioak', es: 'Trapecios', ar: 'أشباه المنحرف' }, text: { eu: 'Bi alde paralelo bakarrik (oinarriak).', es: 'Solo dos lados paralelos (las bases).', ar: 'ضلعان متوازيان فقط (القاعدتان).' } },
            { title: { eu: 'Angeluak', es: 'Ángulos', ar: 'الزوايا' }, text: { eu: 'Edozein laukitan batura 360°.', es: 'En cualquier cuadrilátero suman 360°.', ar: 'مجموعها 360° في أي رباعي.' }, math: '$90^{\\circ}\\cdot 4=360^{\\circ}$' }
        ],
        example: '$110^{\\circ}+70^{\\circ}+110^{\\circ}+70^{\\circ}=360^{\\circ}$',
        takeaway: {
            eu: 'Karratua laukizuzena eta erronboa da aldi berean.',
            es: 'El cuadrado es a la vez rectángulo y rombo.',
            ar: 'المربع مستطيل ومعيّن في الوقت نفسه.'
        },
        figure: (language) => <QuadrilateralsFigure language={language} />
    },
    {
        id: 'circle',
        stage: 'polygons',
        title: { eu: 'Zirkunferentzia eta zirkulua', es: 'Circunferencia y círculo', ar: 'الدائرة والقرص' },
        goal: {
            eu: 'Zirkunferentzia eta zirkulua bereiztea eta haien elementuak ezagutzea.',
            es: 'Distinguir circunferencia y círculo y conocer sus elementos.',
            ar: 'التمييز بين الدائرة والقرص ومعرفة عناصرهما.'
        },
        explanation: {
            eu: 'Zirkunferentzia zentrotik distantzia berera dauden puntuek osatzen duten lerro kurbatu itxia da. Zirkulua zirkunferentziak mugatzen duen planoaren zatia da (ertza eta barrualdea). Elementuak: zentroa, erradioa (zentrotik zirkunferentziara), diametroa (zentrotik igarotzen den korda; erradioa bider bi), korda eta arkua.',
            es: 'La circunferencia es la línea curva cerrada formada por los puntos que están a la misma distancia del centro. El círculo es la parte del plano limitada por la circunferencia (el borde y el interior). Elementos: centro, radio (del centro a la circunferencia), diámetro (cuerda que pasa por el centro; el doble del radio), cuerda y arco.',
            ar: 'الدائرة خط منحنٍ مغلق نقاطه على البعد نفسه من المركز. والقرص جزء المستوي الذي تحدّه الدائرة (الحافة والداخل). العناصر: المركز، ونصف القطر (من المركز إلى الدائرة)، والقطر (وتر يمر بالمركز، ويساوي ضعف نصف القطر)، والوتر، والقوس.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Diametroa', es: 'Diámetro', ar: 'القطر' }, text: { eu: 'Erradioaren bikoitza.', es: 'El doble del radio.', ar: 'ضعف نصف القطر.' }, math: '$d=2r$' },
            { title: { eu: 'Korda eta arkua', es: 'Cuerda y arco', ar: 'الوتر والقوس' }, text: { eu: 'Korda: bi puntu lotzen dituen zuzenkia. Arkua: bi puntuen arteko zirkunferentzia-zatia.', es: 'Cuerda: segmento que une dos puntos. Arco: trozo de circunferencia entre dos puntos.', ar: 'الوتر: قطعة تصل نقطتين. القوس: جزء الدائرة بين نقطتين.' } }
        ],
        example: '$r=4\\ \\text{cm}\\ \\to\\ d=8\\ \\text{cm}$',
        takeaway: {
            eu: 'Zirkunferentzia lerroa da; zirkulua, gainazala.',
            es: 'La circunferencia es una línea; el círculo, una superficie.',
            ar: 'الدائرة خط؛ والقرص سطح.'
        },
        figure: (language) => <CircleFigure language={language} />
    },
    {
        id: 'pythagoras',
        stage: 'pythagoras',
        title: { eu: 'Pitagorasen teorema', es: 'El teorema de Pitágoras', ar: 'مبرهنة فيثاغورس' },
        goal: {
            eu: 'Pitagorasen teorema ulertzea eta triangelu bat angeluzuzena den egiaztatzea.',
            es: 'Comprender el teorema de Pitágoras y comprobar si un triángulo es rectángulo.',
            ar: 'فهم مبرهنة فيثاغورس والتحقق مما إذا كان مثلث قائم الزاوية.'
        },
        explanation: {
            eu: 'Triangelu angeluzuzen batean, angelu zuzena osatzen duten aldeak katetoak dira, eta aurkako aldea (luzeena) hipotenusa. Pitagorasen teoremak dio hipotenusaren karratua katetoen karratuen batura dela: $a^{2}=b^{2}+c^{2}$. Alderantziz ere balio du: aldeek berdintza hori betetzen badute, triangelua angeluzuzena da.',
            es: 'En un triángulo rectángulo, los lados que forman el ángulo recto son los catetos, y el lado opuesto (el más largo), la hipotenusa. El teorema de Pitágoras dice que el cuadrado de la hipotenusa es igual a la suma de los cuadrados de los catetos: $a^{2}=b^{2}+c^{2}$. También sirve al revés: si los lados cumplen esa igualdad, el triángulo es rectángulo.',
            ar: 'في المثلث القائم الزاوية يسمّى الضلعان اللذان يكوّنان الزاوية القائمة الضلعين القائمين، والضلع المقابل (الأطول) الوتر. تقول مبرهنة فيثاغورس إن مربع الوتر يساوي مجموع مربعي الضلعين القائمين: $a^{2}=b^{2}+c^{2}$. وهي صحيحة بالعكس أيضًا: إذا حققت الأضلاع هذه المساواة فالمثلث قائم الزاوية.'
        },
        problem: { eu: 'Angeluzuzena al da 6, 8 eta 10 cm-ko aldeak dituen triangelua?', es: '¿Es rectángulo un triángulo de lados 6, 8 y 10 cm?', ar: 'هل المثلث الذي أضلاعه 6 و8 و10 سم قائم الزاوية؟' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Alde luzeena hipotenusa izango litzateke: 10.', es: 'El lado más largo sería la hipotenusa: 10.', ar: 'الضلع الأطول سيكون الوتر: 10.' }, math: '$10^{2}=100$' },
            { text: { eu: 'Batu beste bien karratuak.', es: 'Suma los cuadrados de los otros dos.', ar: 'اجمع مربعي الضلعين الآخرين.' }, math: '$6^{2}+8^{2}=36+64=100$' },
            { text: { eu: 'Berdinak dira: angeluzuzena da.', es: 'Son iguales: es rectángulo.', ar: 'متساويان: إنه قائم الزاوية.' } }
        ],
        example: '$5^{2}=3^{2}+4^{2}\\ \\to\\ 25=9+16$',
        takeaway: {
            eu: 'Hipotenusa beti alde luzeena da, angelu zuzenaren aurrean.',
            es: 'La hipotenusa es siempre el lado más largo, frente al ángulo recto.',
            ar: 'الوتر دائمًا الضلع الأطول، مقابل الزاوية القائمة.'
        },
        figure: (language) => <PythagorasFigure language={language} />
    },
    {
        id: 'pythagoras-use',
        stage: 'pythagoras',
        title: { eu: 'Alde bat kalkulatzea Pitagorasekin', es: 'Calcular un lado con Pitágoras', ar: 'حساب ضلع بفيثاغورس' },
        goal: {
            eu: 'Triangelu angeluzuzen baten hipotenusa edo katetoa kalkulatzea.',
            es: 'Calcular la hipotenusa o un cateto de un triángulo rectángulo.',
            ar: 'حساب الوتر أو ضلع قائم في مثلث قائم الزاوية.'
        },
        explanation: {
            eu: 'Triangelu angeluzuzen baten bi alde ezagututa, hirugarrena kalkula daiteke. Hipotenusa bilatzeko, batu katetoen karratuak eta atera erro karratua. Katetoa bilatzeko, kendu hipotenusaren karratuari beste katetoaren karratua eta atera erro karratua.',
            es: 'Conociendo dos lados de un triángulo rectángulo, se calcula el tercero. Para la hipotenusa, suma los cuadrados de los catetos y haz la raíz cuadrada. Para un cateto, resta al cuadrado de la hipotenusa el cuadrado del otro cateto y haz la raíz cuadrada.',
            ar: 'إذا عرفنا ضلعين في مثلث قائم الزاوية نحسب الثالث. للوتر: اجمع مربعي الضلعين القائمين وخذ الجذر التربيعي. ولضلع قائم: اطرح من مربع الوتر مربع الضلع القائم الآخر وخذ الجذر التربيعي.'
        },
        problem: { eu: 'Katetoak 5 cm eta 12 cm dira. Zenbat da hipotenusa?', es: 'Los catetos miden 5 cm y 12 cm. ¿Cuánto mide la hipotenusa?', ar: 'الضلعان القائمان 5 سم و12 سم. كم طول الوتر؟' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Karratuak batu.', es: 'Suma los cuadrados.', ar: 'اجمع المربعين.' }, math: '$5^{2}+12^{2}=25+144=169$' },
            { text: { eu: 'Erro karratua.', es: 'Raíz cuadrada.', ar: 'الجذر التربيعي.' }, math: '$\\sqrt{169}=13$' },
            { text: { eu: 'Hipotenusa 13 cm da.', es: 'La hipotenusa mide 13 cm.', ar: 'طول الوتر 13 سم.' } }
        ],
        example: '$c=\\sqrt{10^{2}-6^{2}}=\\sqrt{64}=8$',
        takeaway: {
            eu: 'Hipotenusa: batu. Katetoa: kendu. Amaieran, erro karratua.',
            es: 'Hipotenusa: suma. Cateto: resta. Al final, raíz cuadrada.',
            ar: 'الوتر: اجمع. الضلع القائم: اطرح. وفي النهاية الجذر التربيعي.'
        }
    },
    {
        id: 'units',
        stage: 'perimeters',
        title: { eu: 'Luzera- eta azalera-unitateak', es: 'Unidades de longitud y superficie', ar: 'وحدات الطول والمساحة' },
        goal: {
            eu: 'Luzera- eta azalera-unitateen artean aldatzea.',
            es: 'Cambiar entre unidades de longitud y de superficie.',
            ar: 'التحويل بين وحدات الطول والمساحة.'
        },
        explanation: {
            eu: 'Luzera-unitate nagusia metroa (m) da: km, hm, dam, m, dm, cm, mm. Unitate bakoitza hurrengo txikiagoa baino 10 aldiz handiagoa da: urrats bat behera, bider 10; gora, zati 10. Azalera-unitate nagusia metro karratua (m²) da, eta unitate bakoitza hurrengoa baino 100 aldiz handiagoa: urrats bakoitzeko, bider edo zati 100.',
            es: 'La unidad principal de longitud es el metro (m): km, hm, dam, m, dm, cm, mm. Cada unidad es 10 veces mayor que la siguiente: un escalón hacia abajo, por 10; hacia arriba, entre 10. La unidad principal de superficie es el metro cuadrado (m²), y cada unidad es 100 veces mayor que la siguiente: por cada escalón, por o entre 100.',
            ar: 'الوحدة الأساسية للطول هي المتر (م): كم، هكم، دكم، م، دسم، سم، مم. كل وحدة أكبر من التالية بـ 10 مرات: درجة إلى الأسفل ×10، وإلى الأعلى ÷10. والوحدة الأساسية للمساحة المتر المربع (م²)، وكل وحدة أكبر من التالية بـ 100 مرة: لكل درجة ×100 أو ÷100.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Luzera', es: 'Longitud', ar: 'الطول' }, text: { eu: 'Urrats bakoitza: × edo : 10.', es: 'Cada escalón: × o : 10.', ar: 'كل درجة: × أو : 10.' }, math: dec('$3{,}5\\ \\text{m}=350\\ \\text{cm}$') },
            { title: { eu: 'Azalera', es: 'Superficie', ar: 'المساحة' }, text: { eu: 'Urrats bakoitza: × edo : 100.', es: 'Cada escalón: × o : 100.', ar: 'كل درجة: × أو : 100.' }, math: { eu: '$\\begin{gathered}2\\ \\text{m}^{2}\\\\=20{.}000\\ \\text{cm}^{2}\\end{gathered}$', es: '$\\begin{gathered}2\\ \\text{m}^{2}\\\\=20{.}000\\ \\text{cm}^{2}\\end{gathered}$', ar: '$\\begin{gathered}2\\ \\text{m}^{2}\\\\=20\\,000\\ \\text{cm}^{2}\\end{gathered}$' } }
        ],
        example: { eu: '$\\begin{gathered}1\\ \\text{km}=1{.}000\\ \\text{m}\\\\1\\ \\text{m}^{2}=100\\ \\text{dm}^{2}\\end{gathered}$', es: '$\\begin{gathered}1\\ \\text{km}=1{.}000\\ \\text{m}\\\\1\\ \\text{m}^{2}=100\\ \\text{dm}^{2}\\end{gathered}$', ar: '$\\begin{gathered}1\\ \\text{km}=1\\,000\\ \\text{m}\\\\1\\ \\text{m}^{2}=100\\ \\text{dm}^{2}\\end{gathered}$' },
        takeaway: {
            eu: 'Luzerak: 10ez 10. Azalerak: 100ez 100.',
            es: 'Longitudes: de 10 en 10. Superficies: de 100 en 100.',
            ar: 'الأطوال: من 10 إلى 10. المساحات: من 100 إلى 100.'
        }
    },
    {
        id: 'perimeter',
        stage: 'perimeters',
        title: { eu: 'Poligonoen perimetroa', es: 'Perímetro de polígonos', ar: 'محيط المضلعات' },
        goal: {
            eu: 'Poligono baten perimetroa kalkulatzea.',
            es: 'Calcular el perímetro de un polígono.',
            ar: 'حساب محيط مضلع.'
        },
        explanation: {
            eu: 'Poligono baten perimetroa bere alde guztien luzeren batura da. Poligono erregularretan, alde guztiak berdinak direnez, nahikoa da alde bat bider alde kopurua. Perimetroa luzera bat da: unitate berean eman behar dira alde guztiak.',
            es: 'El perímetro de un polígono es la suma de las longitudes de todos sus lados. En los polígonos regulares, como todos los lados son iguales, basta multiplicar un lado por el número de lados. El perímetro es una longitud: todos los lados tienen que estar en la misma unidad.',
            ar: 'محيط المضلع مجموع أطوال كل أضلاعه. وفي المضلعات المنتظمة، بما أن الأضلاع متساوية، يكفي ضرب ضلع في عدد الأضلاع. والمحيط طول: يجب أن تكون كل الأضلاع بالوحدة نفسها.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Laukizuzena', es: 'Rectángulo', ar: 'المستطيل' }, text: { eu: 'Bi luzera eta bi zabalera.', es: 'Dos largos y dos anchos.', ar: 'طولان وعرضان.' }, math: '$\\begin{gathered}P=2\\cdot 8+2\\cdot 5\\\\=26\\end{gathered}$' },
            { title: { eu: 'Poligono erregularra', es: 'Polígono regular', ar: 'المضلع المنتظم' }, text: { eu: 'Aldea bider alde kopurua: hexagonoa, 6 cm-ko aldea.', es: 'Lado por número de lados: hexágono de lado 6 cm.', ar: 'الضلع في عدد الأضلاع: مسدس ضلعه 6 سم.' }, math: '$P=6\\cdot 6=36$' }
        ],
        example: '$P=5+7+9=21\\ \\text{cm}$',
        takeaway: {
            eu: 'Perimetroa = alde guztiak batuta.',
            es: 'Perímetro = todos los lados sumados.',
            ar: 'المحيط = مجموع كل الأضلاع.'
        },
        figure: (language) => <PerimeterFigure language={language} />
    },
    {
        id: 'circumference',
        stage: 'perimeters',
        title: { eu: 'Zirkunferentziaren luzera', es: 'Longitud de la circunferencia', ar: 'طول الدائرة' },
        goal: {
            eu: 'Zirkunferentzia baten luzera kalkulatzea π erabiliz.',
            es: 'Calcular la longitud de una circunferencia usando π.',
            ar: 'حساب طول دائرة باستعمال π.'
        },
        explanation: {
            eu: 'Edozein zirkunferentziaren luzera zati bere diametroa beti zenbaki bera da: π (pi), gutxi gorabehera 3,14. Horregatik, zirkunferentziaren luzera $L=2\\pi r$ edo $L=\\pi d$ da.',
            es: 'La longitud de cualquier circunferencia dividida entre su diámetro es siempre el mismo número: π (pi), aproximadamente 3,14. Por eso la longitud de la circunferencia es $L=2\\pi r$ o $L=\\pi d$.',
            ar: 'طول أي دائرة مقسومًا على قطرها هو دائمًا العدد نفسه: π (باي)، وهو تقريبًا 3.14. لذلك طول الدائرة $L=2\\pi r$ أو $L=\\pi d$.'
        },
        problem: { eu: 'Kalkulatu 5 cm-ko erradioa duen zirkunferentziaren luzera.', es: 'Calcula la longitud de una circunferencia de 5 cm de radio.', ar: 'احسب طول دائرة نصف قطرها 5 سم.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Idatzi formula.', es: 'Escribe la fórmula.', ar: 'اكتب الصيغة.' }, math: '$L=2\\pi r$' },
            { text: { eu: 'Ordeztu: π ≈ 3,14 eta r = 5.', es: 'Sustituye: π ≈ 3,14 y r = 5.', ar: 'عوّض: π ≈ 3.14 وr = 5.' }, math: dec('$L=2\\cdot 3{,}14\\cdot 5=31{,}4$') },
            { text: { eu: 'Luzera 31,4 cm da gutxi gorabehera.', es: 'Mide aproximadamente 31,4 cm.', ar: 'طولها تقريبًا 31.4 سم.' } }
        ],
        example: dec('$d=10\\ \\to\\ L=3{,}14\\cdot 10=31{,}4$'),
        takeaway: {
            eu: 'L = 2 · π · r: erradioaren bikoitza bider π.',
            es: 'L = 2 · π · r: el doble del radio por π.',
            ar: 'L = 2 · π · r: ضعف نصف القطر في π.'
        }
    },
    {
        id: 'area-rectangles',
        stage: 'areas',
        title: { eu: 'Paralelogramoen azalera', es: 'Área de los paralelogramos', ar: 'مساحة متوازيات الأضلاع' },
        goal: {
            eu: 'Karratuaren, laukizuzenaren eta paralelogramoaren azalera kalkulatzea.',
            es: 'Calcular el área del cuadrado, del rectángulo y del paralelogramo.',
            ar: 'حساب مساحة المربع والمستطيل ومتوازي الأضلاع.'
        },
        explanation: {
            eu: 'Azalera figura batek hartzen duen gainazala da, eta unitate karratuetan neurtzen da (cm², m²…). Laukizuzen baten azalera oinarria bider altuera da: zenbat lauki txiki sartzen diren. Karratuarena, aldea bider aldea. Paralelogramo bat laukizuzen bihur daiteke triangelu bat mugituz: haren azalera ere oinarria bider altuera da.',
            es: 'El área es la superficie que ocupa una figura y se mide en unidades cuadradas (cm², m²…). El área de un rectángulo es base por altura: cuántos cuadraditos caben. La del cuadrado, lado por lado. Un paralelogramo se convierte en un rectángulo moviendo un triángulo: su área también es base por altura.',
            ar: 'المساحة هي السطح الذي يشغله الشكل، وتُقاس بوحدات مربعة (سم²، م²…). مساحة المستطيل القاعدة في الارتفاع: عدد المربعات الصغيرة التي تتسع فيه. ومساحة المربع الضلع في الضلع. ومتوازي الأضلاع يتحوّل إلى مستطيل بنقل مثلث: فمساحته أيضًا القاعدة في الارتفاع.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Laukizuzena', es: 'Rectángulo', ar: 'المستطيل' }, text: { eu: 'Oinarria · altuera.', es: 'Base · altura.', ar: 'القاعدة · الارتفاع.' }, math: '$A=8\\cdot 5=40$' },
            { title: { eu: 'Karratua', es: 'Cuadrado', ar: 'المربع' }, text: { eu: 'Aldea · aldea.', es: 'Lado · lado.', ar: 'الضلع · الضلع.' }, math: '$A=6^{2}=36$' },
            { title: { eu: 'Paralelogramoa', es: 'Paralelogramo', ar: 'متوازي الأضلاع' }, text: { eu: 'Oinarria · altuera (ez alde okerra).', es: 'Base · altura (no el lado inclinado).', ar: 'القاعدة · الارتفاع (لا الضلع المائل).' }, math: '$A=10\\cdot 4=40$' }
        ],
        example: '$A=b\\cdot h\\qquad A=l^{2}$',
        takeaway: {
            eu: 'Azalerak unitate karratuak ditu: cm², m².',
            es: 'El área lleva unidades cuadradas: cm², m².',
            ar: 'للمساحة وحدات مربعة: سم²، م².'
        },
        figure: (language) => <AreaFigure language={language} />
    },
    {
        id: 'area-triangle',
        stage: 'areas',
        title: { eu: 'Triangeluaren, erronboaren eta trapezioaren azalera', es: 'Área del triángulo, del rombo y del trapecio', ar: 'مساحة المثلث والمعيّن وشبه المنحرف' },
        goal: {
            eu: 'Triangeluaren, erronboaren eta trapezioaren azalera kalkulatzea.',
            es: 'Calcular el área del triángulo, del rombo y del trapecio.',
            ar: 'حساب مساحة المثلث والمعيّن وشبه المنحرف.'
        },
        explanation: {
            eu: 'Triangelu bat oinarri eta altuera bereko laukizuzenaren erdia da: $A=\\frac{b\\cdot h}{2}$. Erronboaren azalera diagonalen biderkaduraren erdia da: $A=\\frac{D\\cdot d}{2}$. Trapezioarena, oinarrien batura bider altuera, zati bi: $A=\\frac{(B+b)\\cdot h}{2}$.',
            es: 'Un triángulo es la mitad del rectángulo de igual base y altura: $A=\\frac{b\\cdot h}{2}$. El área del rombo es la mitad del producto de sus diagonales: $A=\\frac{D\\cdot d}{2}$. La del trapecio, la suma de las bases por la altura, entre dos: $A=\\frac{(B+b)\\cdot h}{2}$.',
            ar: 'المثلث نصف المستطيل الذي له القاعدة والارتفاع نفسهما: $A=\\frac{b\\cdot h}{2}$. ومساحة المعيّن نصف حاصل ضرب قطريه: $A=\\frac{D\\cdot d}{2}$. ومساحة شبه المنحرف مجموع القاعدتين في الارتفاع مقسومًا على اثنين: $A=\\frac{(B+b)\\cdot h}{2}$.'
        },
        problem: { eu: 'Kalkulatu 10 cm-ko oinarria eta 6 cm-ko altuera dituen triangeluaren azalera.', es: 'Calcula el área de un triángulo de 10 cm de base y 6 cm de altura.', ar: 'احسب مساحة مثلث قاعدته 10 سم وارتفاعه 6 سم.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Oinarria bider altuera.', es: 'Base por altura.', ar: 'القاعدة في الارتفاع.' }, math: '$10\\cdot 6=60$' },
            { text: { eu: 'Zati bi.', es: 'Entre dos.', ar: 'على اثنين.' }, math: '$60\\mathbin{:}2=30$' },
            { text: { eu: 'Azalera 30 cm² da.', es: 'El área es 30 cm².', ar: 'المساحة 30 سم².' } }
        ],
        example: '$\\frac{8\\cdot 6}{2}=24\\qquad \\frac{(9+5)\\cdot 4}{2}=28$',
        takeaway: {
            eu: 'Triangelua: laukizuzenaren erdia. Ez ahaztu zati bi.',
            es: 'Triángulo: la mitad del rectángulo. No olvides dividir entre dos.',
            ar: 'المثلث: نصف المستطيل. لا تنسَ القسمة على اثنين.'
        }
    },
    {
        id: 'area-circle',
        stage: 'areas',
        title: { eu: 'Poligono erregularren eta zirkuluaren azalera', es: 'Área de polígonos regulares y del círculo', ar: 'مساحة المضلعات المنتظمة والقرص' },
        goal: {
            eu: 'Poligono erregular baten eta zirkulu baten azalera kalkulatzea.',
            es: 'Calcular el área de un polígono regular y la de un círculo.',
            ar: 'حساب مساحة مضلع منتظم ومساحة قرص.'
        },
        explanation: {
            eu: 'Poligono erregular bat zentrotik triangelu berdinetan bana daiteke. Triangelu horien altuera apotema da (zentrotik alde baten erdira). Horregatik, haren azalera perimetroa bider apotema zati bi da: $A=\\frac{P\\cdot ap}{2}$. Zirkulua alde asko dituen poligono erregular bat bezalakoa da, eta haren azalera $A=\\pi r^{2}$ da.',
            es: 'Un polígono regular se divide desde el centro en triángulos iguales. La altura de esos triángulos es la apotema (del centro al punto medio de un lado). Por eso su área es el perímetro por la apotema entre dos: $A=\\frac{P\\cdot ap}{2}$. El círculo es como un polígono regular de muchísimos lados, y su área es $A=\\pi r^{2}$.',
            ar: 'يُقسم المضلع المنتظم من المركز إلى مثلثات متساوية. وارتفاع هذه المثلثات هو العامد (من المركز إلى منتصف ضلع). لذلك مساحته المحيط في العامد مقسومًا على اثنين: $A=\\frac{P\\cdot ap}{2}$. والقرص كمضلع منتظم ذي أضلاع كثيرة جدًا، ومساحته $A=\\pi r^{2}$.'
        },
        problem: { eu: 'Kalkulatu 10 cm-ko erradioa duen zirkuluaren azalera.', es: 'Calcula el área de un círculo de 10 cm de radio.', ar: 'احسب مساحة قرص نصف قطره 10 سم.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Formula.', es: 'Fórmula.', ar: 'الصيغة.' }, math: '$A=\\pi r^{2}$' },
            { text: { eu: 'Ordeztu eta kalkulatu.', es: 'Sustituye y calcula.', ar: 'عوّض واحسب.' }, math: dec('$A=3{,}14\\cdot 10^{2}=314$') },
            { text: { eu: 'Azalera 314 cm² da gutxi gorabehera.', es: 'El área es aproximadamente 314 cm².', ar: 'المساحة تقريبًا 314 سم².' } }
        ],
        example: '$\\frac{30\\cdot 4}{2}=60$',
        takeaway: {
            eu: 'Zirkulua: π bider erradioa karratu (ez bikoitza).',
            es: 'Círculo: π por el radio al cuadrado (no por el doble).',
            ar: 'القرص: π في مربع نصف القطر (لا في ضعفه).'
        }
    }
]
