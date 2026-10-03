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
    { id: 'polygons', tone: 'blue', title: { eu: 'Poligonoak: diagonalak eta angeluak', es: 'Polígonos: diagonales y ángulos', ar: 'المضلعات: الأقطار والزوايا' } },
    { id: 'triangles', tone: 'violet', title: { eu: 'Triangeluak', es: 'Triángulos', ar: 'المثلثات' } },
    { id: 'quadrilaterals', tone: 'mustard', title: { eu: 'Laukiak eta simetria', es: 'Cuadriláteros y simetría', ar: 'الرباعيات والتناظر' } },
    { id: 'circles', tone: 'coral', title: { eu: 'Zirkunferentzia eta posizioak', es: 'Circunferencia y posiciones', ar: 'الدائرة والأوضاع' } },
    { id: 'areas', tone: 'green', title: { eu: 'Irudi konposatuen azalera', es: 'Áreas de figuras compuestas', ar: 'مساحات الأشكال المركّبة' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })

export const figuresTopics: UnitTopic[] = [
    /* ---------- 1. Polygons ---------- */
    {
        id: 'diagonals',
        stage: 'polygons',
        title: say('Poligono baten diagonalak', 'Las diagonales de un polígono', 'أقطار المضلع'),
        goal: say('Erpin batetik eta poligono osoan zenbat diagonal dauden kalkulatzea.', 'Calcular cuántas diagonales salen de un vértice y cuántas tiene un polígono.', 'حساب عدد الأقطار الخارجة من رأس وعدد أقطار المضلع كله.'),
        explanation: say(
            'Diagonala ondoz ondokoak ez diren bi erpin lotzen dituen zuzenkia da. $n$ aldeko poligono batean, erpin bakoitzetik $n-3$ diagonal ateratzen dira: ezin da bere buruarekin lotu, ezta ondoan dituen bi erpinekin ere (horiek aldeak dira). $n$ erpin daudenez, $n\\cdot(n-3)$ marra lirateke, baina diagonal bakoitza bi aldiz zenbatu da (mutur bakoitzetik behin); beraz, diagonal kopurua $\\frac{n\\cdot(n-3)}{2}$ da. Triangeluak ez du diagonalik: $\\frac{3\\cdot 0}{2}=0$.',
            'Una diagonal es un segmento que une dos vértices no consecutivos. En un polígono de $n$ lados, de cada vértice salen $n-3$ diagonales: no puede unirse consigo mismo ni con sus dos vecinos (eso son lados). Como hay $n$ vértices, saldrían $n\\cdot(n-3)$ trazos, pero cada diagonal se ha contado dos veces (una desde cada extremo); por eso el número de diagonales es $\\frac{n\\cdot(n-3)}{2}$. El triángulo no tiene diagonales: $\\frac{3\\cdot 0}{2}=0$.',
            'القطر قطعة تصل بين رأسين غير متتاليين. في مضلع له $n$ ضلعًا يخرج من كل رأس $n-3$ أقطار: فلا يمكن وصله بنفسه ولا بجاريه (فتلك أضلاع). وبما أن هناك $n$ رأسًا ستكون الخطوط $n\\cdot(n-3)$، لكن كل قطر حُسب مرتين (مرة من كل طرف)؛ لذلك عدد الأقطار $\\frac{n\\cdot(n-3)}{2}$. والمثلث ليس له أقطار: $\\frac{3\\cdot 0}{2}=0$.'
        ),
        problem: say('Zenbat diagonal ditu hexagono batek?', '¿Cuántas diagonales tiene un hexágono?', 'كم قطرًا للمسدس؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erpin batetik: $n-3$.', 'Desde un vértice: $n-3$.', 'من رأس واحد: $n-3$.'), math: same('$6-3=3$') },
            { text: say('Erpin guztietatik, zati bi.', 'Desde todos los vértices, entre dos.', 'من كل الرؤوس، على اثنين.'), math: same('$\\frac{6\\cdot 3}{2}=9$') }
        ],
        example: same('$n=4\\to 2\\qquad n=5\\to 5\\qquad n=6\\to 9\\qquad n=8\\to 20$'),
        takeaway: say('Diagonalak: $\\frac{n\\cdot(n-3)}{2}$. Zati bi, bakoitza bi aldiz zenbatzen delako.', 'Diagonales: $\\frac{n\\cdot(n-3)}{2}$. Entre dos, porque cada una se cuenta dos veces.', 'الأقطار: $\\frac{n\\cdot(n-3)}{2}$. على اثنين لأن كل قطر يُحسب مرتين.'),
        figure: (language) => <DiagonalsFigure language={language} />
    },
    {
        id: 'angle-sum',
        stage: 'polygons',
        title: say('Barne-angeluen batura', 'La suma de los ángulos interiores', 'مجموع الزوايا الداخلية'),
        goal: say('Poligono baten barne-angeluen batura kalkulatzea eta falta den angelu bat aurkitzea.', 'Calcular la suma de los ángulos interiores de un polígono y hallar un ángulo que falta.', 'حساب مجموع الزوايا الداخلية للمضلع وإيجاد زاوية ناقصة.'),
        explanation: say(
            'Erpin bakar batetik diagonal guztiak marrazten badira, $n$ aldeko poligonoa $n-2$ triangelutan banatzen da. Triangelu bakoitzaren angeluek $180^{\\circ}$ egiten dute; beraz, poligonoaren barne-angeluen batura $(n-2)\\cdot 180^{\\circ}$ da: laukian $360^{\\circ}$, pentagonoan $540^{\\circ}$, hexagonoan $720^{\\circ}$. Angelu bat falta bada, kendu ezagunen batura guztizkoari.',
            'Si desde un solo vértice se trazan todas las diagonales, el polígono de $n$ lados queda dividido en $n-2$ triángulos. Los ángulos de cada triángulo suman $180^{\\circ}$; por eso la suma de los ángulos interiores del polígono es $(n-2)\\cdot 180^{\\circ}$: en el cuadrilátero $360^{\\circ}$, en el pentágono $540^{\\circ}$, en el hexágono $720^{\\circ}$. Si falta un ángulo, resta la suma de los conocidos al total.',
            'إذا رُسمت كل الأقطار من رأس واحد انقسم المضلع ذو $n$ ضلعًا إلى $n-2$ مثلثات. مجموع زوايا كل مثلث $180^{\\circ}$؛ لذلك مجموع الزوايا الداخلية للمضلع $(n-2)\\cdot 180^{\\circ}$: في الرباعي $360^{\\circ}$، وفي المخمس $540^{\\circ}$، وفي المسدس $720^{\\circ}$. وإذا نقصت زاوية فاطرح مجموع المعلومة من الكل.'
        ),
        problem: say('Pentagono baten lau angeluak $100^{\\circ}$, $110^{\\circ}$, $120^{\\circ}$ eta $95^{\\circ}$ dira. Zenbat da bosgarrena?', 'Cuatro ángulos de un pentágono miden $100^{\\circ}$, $110^{\\circ}$, $120^{\\circ}$ y $95^{\\circ}$. ¿Cuánto mide el quinto?', 'أربع زوايا من مخمس قياساتها $100^{\\circ}$ و$110^{\\circ}$ و$120^{\\circ}$ و$95^{\\circ}$. كم قياس الخامسة؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batura osoa: $n-2$ triangelu.', 'La suma total: $n-2$ triángulos.', 'المجموع الكلي: $n-2$ مثلثات.'), math: same('$(5-2)\\cdot 180^{\\circ}=540^{\\circ}$') },
            { text: say('Batu ezagunak.', 'Suma los conocidos.', 'اجمع الزوايا المعلومة.'), math: same('$100^{\\circ}+110^{\\circ}+120^{\\circ}+95^{\\circ}=425^{\\circ}$') },
            { text: say('Kendu.', 'Resta.', 'اطرح.'), math: same('$540^{\\circ}-425^{\\circ}=115^{\\circ}$') }
        ],
        example: same('$(4-2)\\cdot 180^{\\circ}=360^{\\circ}\\qquad(6-2)\\cdot 180^{\\circ}=720^{\\circ}$'),
        takeaway: say('Barne-angeluen batura: $(n-2)\\cdot 180^{\\circ}$.', 'Suma de los ángulos interiores: $(n-2)\\cdot 180^{\\circ}$.', 'مجموع الزوايا الداخلية: $(n-2)\\cdot 180^{\\circ}$.'),
        figure: (language) => <AngleSumFigure language={language} />
    },
    {
        id: 'regular-angles',
        stage: 'polygons',
        title: say('Poligono erregularren angeluak', 'Los ángulos de los polígonos regulares', 'زوايا المضلعات المنتظمة'),
        goal: say('Poligono erregular baten barne-angelua eta angelu zentrala kalkulatzea, eta zein poligonok lauzatzen duten jakitea.', 'Calcular el ángulo interior y el ángulo central de un polígono regular y saber qué polígonos embaldosan.', 'حساب الزاوية الداخلية والزاوية المركزية لمضلع منتظم ومعرفة المضلعات التي تُبلِّط.'),
        explanation: say(
            'Poligono erregular batean angelu guztiak berdinak dira; beraz, barne-angelu bakoitza batura zati alde kopurua da: $\\frac{(n-2)\\cdot 180^{\\circ}}{n}$. Pentagono erregularrean $540^{\\circ}\\mathbin{:}5=108^{\\circ}$. Angelu zentrala zentroa eta ondoz ondoko bi erpin lotuz sortzen dena da: zentroaren inguruko $360^{\\circ}$-ak $n$ zati berdinetan banatzen dira, $\\frac{360^{\\circ}}{n}$. Lauza erregularrek zorua hutsunerik gabe estaltzen dute baldin eta barne-angeluak $360^{\\circ}$ zatitzen badu: triangelu aldeberdinak ($60^{\\circ}$), karratuak ($90^{\\circ}$) eta hexagonoak ($120^{\\circ}$) bai; pentagonoak ($108^{\\circ}$) ez.',
            'En un polígono regular todos los ángulos son iguales, así que cada ángulo interior es la suma entre el número de lados: $\\frac{(n-2)\\cdot 180^{\\circ}}{n}$. En el pentágono regular, $540^{\\circ}\\mathbin{:}5=108^{\\circ}$. El ángulo central es el que forman los segmentos que unen el centro con dos vértices consecutivos: los $360^{\\circ}$ alrededor del centro se reparten en $n$ partes iguales, $\\frac{360^{\\circ}}{n}$. Las baldosas regulares cubren el suelo sin huecos si su ángulo interior divide a $360^{\\circ}$: los triángulos equiláteros ($60^{\\circ}$), los cuadrados ($90^{\\circ}$) y los hexágonos ($120^{\\circ}$) sí; los pentágonos ($108^{\\circ}$), no.',
            'في المضلع المنتظم كل الزوايا متساوية، فكل زاوية داخلية تساوي المجموع على عدد الأضلاع: $\\frac{(n-2)\\cdot 180^{\\circ}}{n}$. في المخمس المنتظم $540^{\\circ}\\mathbin{:}5=108^{\\circ}$. والزاوية المركزية هي التي تكوّنها القطعتان الواصلتان بين المركز ورأسين متتاليين: تتوزع $360^{\\circ}$ حول المركز على $n$ أجزاء متساوية، $\\frac{360^{\\circ}}{n}$. وتغطي البلاطات المنتظمة الأرض دون فراغات إذا كانت زاويتها الداخلية تقسم $360^{\\circ}$: المثلثات المتساوية الأضلاع ($60^{\\circ}$) والمربعات ($90^{\\circ}$) والمسدسات ($120^{\\circ}$) نعم؛ والمخمسات ($108^{\\circ}$) لا.'
        ),
        problem: say('Kalkulatu hexagono erregularraren barne-angelua eta angelu zentrala.', 'Calcula el ángulo interior y el ángulo central del hexágono regular.', 'احسب الزاوية الداخلية والزاوية المركزية للمسدس المنتظم.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batura, zati 6.', 'La suma, entre 6.', 'المجموع على 6.'), math: same('$\\frac{(6-2)\\cdot 180^{\\circ}}{6}=\\frac{720^{\\circ}}{6}=120^{\\circ}$') },
            { text: say('Angelu zentrala: $360^{\\circ}$ zati 6.', 'Ángulo central: $360^{\\circ}$ entre 6.', 'الزاوية المركزية: $360^{\\circ}$ على 6.'), math: same('$\\frac{360^{\\circ}}{6}=60^{\\circ}$') },
            { text: say('Hiru hexagono erpin batean: lauzatzen du.', 'Tres hexágonos en un vértice: embaldosa.', 'ثلاثة مسدسات عند رأس: يُبلِّط.'), math: same('$3\\cdot 120^{\\circ}=360^{\\circ}$') }
        ],
        example: same('$\\frac{360^{\\circ}}{5}=72^{\\circ}\\qquad\\frac{540^{\\circ}}{5}=108^{\\circ}$'),
        takeaway: say('Barne-angelua: $\\frac{(n-2)\\cdot 180^{\\circ}}{n}$. Angelu zentrala: $\\frac{360^{\\circ}}{n}$.', 'Ángulo interior: $\\frac{(n-2)\\cdot 180^{\\circ}}{n}$. Ángulo central: $\\frac{360^{\\circ}}{n}$.', 'الزاوية الداخلية: $\\frac{(n-2)\\cdot 180^{\\circ}}{n}$. الزاوية المركزية: $\\frac{360^{\\circ}}{n}$.'),
        figure: (language) => <RegularAnglesFigure language={language} />
    },

    /* ---------- 2. Triangles ---------- */
    {
        id: 'triangle-exists',
        stage: 'triangles',
        title: say('Noiz eraiki daiteke triangelu bat?', '¿Cuándo se puede construir un triángulo?', 'متى يمكن إنشاء مثلث؟'),
        goal: say('Hiru zuzenkirekin edo bi angelurekin triangelu bat eraiki daitekeen erabakitzea.', 'Decidir si con tres segmentos o con dos ángulos se puede construir un triángulo.', 'تحديد ما إذا كان يمكن إنشاء مثلث بثلاث قطع أو بزاويتين.'),
        explanation: say(
            'Hiru makilarekin ez da beti triangelu bat egiten. Alde bakoitzak beste bien batura baino txikiagoa izan behar du: hori da desberdintza triangeluarra. Nahikoa da alde handiena egiaztatzea: 3, 5 eta 7 cm-rekin, $7<3+5=8$, eta triangelua eraiki daiteke; 3, 4 eta 8 cm-rekin, $8>3+4=7$, eta bi alde txikiek ez dute elkar ukitzen. $7=3+4$ bada, aldeak zuzen baten gainean geratzen dira. Angeluekin ere muga bat dago: hirurek $180^{\\circ}$ egin behar dute, beraz bi angeluk $180^{\\circ}$ baino gutxiago batu behar dute ($95^{\\circ}$ eta $88^{\\circ}$-rekin ez da posible).',
            'Con tres palos no siempre se forma un triángulo. Cada lado tiene que ser menor que la suma de los otros dos: es la desigualdad triangular. Basta comprobar el lado mayor: con 3, 5 y 7 cm, $7<3+5=8$, y el triángulo se puede construir; con 3, 4 y 8 cm, $8>3+4=7$, y los dos lados pequeños no llegan a tocarse. Si $7=3+4$, los lados quedan aplastados sobre una recta. Con los ángulos también hay un límite: los tres suman $180^{\\circ}$, así que dos ángulos tienen que sumar menos de $180^{\\circ}$ (con $95^{\\circ}$ y $88^{\\circ}$ no es posible).',
            'لا تكوّن ثلاثة أعواد مثلثًا دائمًا. يجب أن يكون كل ضلع أصغر من مجموع الضلعين الآخرين: هذه هي متباينة المثلث. ويكفي التحقق من الضلع الأكبر: مع 3 و5 و7 سم، $7<3+5=8$، فيمكن إنشاء المثلث؛ ومع 3 و4 و8 سم، $8>3+4=7$، فلا يلتقي الضلعان الصغيران. وإذا كان $7=3+4$ انطبق الضلعان على مستقيم. وللزوايا حدّ أيضًا: مجموع الثلاث $180^{\\circ}$، فيجب أن يكون مجموع زاويتين أقل من $180^{\\circ}$ (مع $95^{\\circ}$ و$88^{\\circ}$ لا يمكن).'
        ),
        problem: say('Triangelu bat eraiki daiteke 4, 6 eta 11 cm-ko zuzenkiekin?', '¿Se puede construir un triángulo con segmentos de 4, 6 y 11 cm?', 'هل يمكن إنشاء مثلث بقطع أطوالها 4 و6 و11 سم؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Alde handiena: 11.', 'El lado mayor: 11.', 'الضلع الأكبر: 11.') },
            { text: say('Batu beste biak.', 'Suma los otros dos.', 'اجمع الآخرين.'), math: same('$4+6=10$') },
            { text: say('$11>10$: ez da eraikitzen.', '$11>10$: no se puede construir.', '$11>10$: لا يمكن إنشاؤه.') }
        ],
        example: same('$7<3+5\\qquad 8>3+4$'),
        takeaway: say('Alde handiena < beste bien batura. Bi angelu < $180^{\\circ}$.', 'Lado mayor < suma de los otros dos. Dos ángulos < $180^{\\circ}$.', 'الضلع الأكبر < مجموع الآخرين. زاويتان < $180^{\\circ}$.'),
        figure: (language) => <TriangleExistsFigure language={language} />
    },
    {
        id: 'side-angle',
        stage: 'triangles',
        title: say('Aldeak eta angeluak', 'Lados y ángulos', 'الأضلاع والزوايا'),
        goal: say('Alde handienaren aurrean angelu handiena dagoela jakitea eta triangelu isoszeleen angeluak kalkulatzea.', 'Saber que frente al lado mayor está el ángulo mayor y calcular los ángulos de un triángulo isósceles.', 'معرفة أن الزاوية الكبرى تقابل الضلع الأكبر وحساب زوايا المثلث المتساوي الساقين.'),
        explanation: say(
            'Triangelu batean, alde handienaren aurrean angelu handiena dago, eta alde txikienaren aurrean, txikiena. Bi alde berdinak badira (isoszelea), haien aurreko bi angeluak ere berdinak dira: oinarriko angeluak. Hiru aldeak berdinak badira (aldeberdina), hiru angeluak berdinak dira: $180^{\\circ}\\mathbin{:}3=60^{\\circ}$, triangeluaren tamaina edozein dela ere. Isoszele batean erpineko angelua $\\hat{A}$ bada, oinarriko bakoitza $(180^{\\circ}-\\hat{A})\\mathbin{:}2$ da.',
            'En un triángulo, frente al lado mayor está el ángulo mayor, y frente al lado menor, el menor. Si dos lados son iguales (isósceles), los dos ángulos opuestos a ellos también son iguales: los ángulos de la base. Si los tres lados son iguales (equilátero), los tres ángulos son iguales: $180^{\\circ}\\mathbin{:}3=60^{\\circ}$, sea cual sea el tamaño del triángulo. En un isósceles, si el ángulo desigual es $\\hat{A}$, cada ángulo de la base es $(180^{\\circ}-\\hat{A})\\mathbin{:}2$.',
            'في المثلث تقابل الزاويةُ الكبرى الضلعَ الأكبر، وتقابل الصغرى الضلعَ الأصغر. وإذا تساوى ضلعان (متساوي الساقين) تساوت الزاويتان المقابلتان لهما: زاويتا القاعدة. وإذا تساوت الأضلاع الثلاثة (متساوي الأضلاع) تساوت الزوايا الثلاث: $180^{\\circ}\\mathbin{:}3=60^{\\circ}$ مهما كان حجم المثلث. وفي متساوي الساقين، إذا كانت زاوية الرأس $\\hat{A}$ فكل زاوية من زاويتي القاعدة تساوي $(180^{\\circ}-\\hat{A})\\mathbin{:}2$.'
        ),
        problem: say('Triangelu isoszele baten erpineko angelua $40^{\\circ}$ da. Zenbat da oinarriko angelu bakoitza?', 'El ángulo desigual de un triángulo isósceles mide $40^{\\circ}$. ¿Cuánto mide cada ángulo de la base?', 'زاوية الرأس في مثلث متساوي الساقين $40^{\\circ}$. كم قياس كل زاوية من زاويتي القاعدة؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kendu $180^{\\circ}$-ri.', 'Réstalo de $180^{\\circ}$.', 'اطرحها من $180^{\\circ}$.'), math: same('$180^{\\circ}-40^{\\circ}=140^{\\circ}$') },
            { text: say('Bi angelu berdin: zati bi.', 'Dos ángulos iguales: entre dos.', 'زاويتان متساويتان: على اثنين.'), math: same('$140^{\\circ}\\mathbin{:}2=70^{\\circ}$') }
        ],
        example: same('$b<a<c\\ \\to\\ \\hat{B}<\\hat{A}<\\hat{C}$'),
        takeaway: say('Alde handiena ↔ angelu handiena. Alde berdinak ↔ angelu berdinak.', 'Lado mayor ↔ ángulo mayor. Lados iguales ↔ ángulos iguales.', 'الضلع الأكبر ↔ الزاوية الكبرى. أضلاع متساوية ↔ زوايا متساوية.'),
        figure: (language) => <SideAngleFigure language={language} />
    },
    {
        id: 'centers',
        stage: 'triangles',
        title: say('Puntu nabarmenak eta zirkunferentziak', 'Puntos notables y circunferencias', 'النقاط المهمة والدوائر'),
        goal: say('Zirkunferentzia zirkunskribatua eta inskribatua ezagutzea eta puntu nabarmenak non dauden jakitea triangelu motaren arabera.', 'Conocer las circunferencias circunscrita e inscrita y saber dónde caen los puntos notables según el tipo de triángulo.', 'معرفة الدائرتين المحيطة والداخلية ومعرفة مواقع النقاط المهمة حسب نوع المثلث.'),
        explanation: say(
            'Erdibitzaileak zirkunzentroan ebakitzen dira, eta puntu hori hiru erpinetatik distantzia berera dago: zentro hori duen zirkunferentzia hiru erpinetatik pasatzen da (zirkunskribatua). Erdikariak inzentroan ebakitzen dira, hiru aldeetatik distantzia berera: hor zentratutako zirkunferentziak hiru aldeak ukitzen ditu barrutik (inskribatua). Zirkunzentroaren lekuak triangelu mota salatzen du: angelu-zorrotzean barruan dago; angeluzuzenean, hipotenusaren erdiko puntuan; angelu-kamutsean, kanpoan. Ortozentroarekin gauza bera gertatzen da, eta angeluzuzenean angelu zuzeneko erpinean dago. Barizentroa eta inzentroa beti daude barruan. Triangelu aldeberdinean lau puntuak bat datoz.',
            'Las mediatrices se cortan en el circuncentro, y ese punto está a la misma distancia de los tres vértices: la circunferencia con ese centro pasa por los tres vértices (circunscrita). Las bisectrices se cortan en el incentro, a la misma distancia de los tres lados: la circunferencia centrada allí toca los tres lados por dentro (inscrita). La posición del circuncentro delata el tipo de triángulo: en el acutángulo está dentro; en el rectángulo, en el punto medio de la hipotenusa; en el obtusángulo, fuera. Con el ortocentro pasa lo mismo, y en el rectángulo está en el vértice del ángulo recto. El baricentro y el incentro siempre están dentro. En el triángulo equilátero los cuatro puntos coinciden.',
            'تتقاطع المحاور في مركز الدائرة المحيطة، وتلك النقطة على البعد نفسه من الرؤوس الثلاثة: فالدائرة التي مركزها هناك تمر بالرؤوس الثلاثة (المحيطة). وتتقاطع المنصفات في مركز الدائرة الداخلية، على البعد نفسه من الأضلاع الثلاثة: فالدائرة التي مركزها هناك تمس الأضلاع الثلاثة من الداخل (الداخلية). ويكشف موقع مركز الدائرة المحيطة نوع المثلث: في الحاد الزوايا داخله؛ وفي القائم في منتصف الوتر؛ وفي المنفرج خارجه. والأمر نفسه مع ملتقى الارتفاعات، وهو في القائم عند رأس الزاوية القائمة. أما مركز الثقل ومركز الدائرة الداخلية فداخل المثلث دائمًا. وفي المثلث المتساوي الأضلاع تنطبق النقاط الأربع.'
        ),
        stepsKind: 'facts',
        steps: [
            { title: say('Zirkunzentroa', 'Circuncentro', 'مركز الدائرة المحيطة'), text: say('Erdibitzaileak. Erpinetatik pasatzen den zirkunferentzia.', 'Mediatrices. Circunferencia que pasa por los vértices.', 'المحاور. دائرة تمر بالرؤوس.') },
            { title: say('Inzentroa', 'Incentro', 'مركز الدائرة الداخلية'), text: say('Erdikariak. Aldeak ukitzen dituen zirkunferentzia.', 'Bisectrices. Circunferencia que toca los lados.', 'المنصفات. دائرة تمس الأضلاع.') },
            { title: say('Non dago?', '¿Dónde cae?', 'أين يقع؟'), text: say('Zorrotza: barruan. Zuzena: hipotenusan. Kamutsa: kanpoan.', 'Acutángulo: dentro. Rectángulo: en la hipotenusa. Obtusángulo: fuera.', 'حاد: داخله. قائم: على الوتر. منفرج: خارجه.') }
        ],
        example: say('Angeluzuzena: zirkunzentroa = hipotenusaren erdia', 'Rectángulo: circuncentro = punto medio de la hipotenusa', 'القائم: مركز الدائرة المحيطة = منتصف الوتر'),
        takeaway: say('Zirkunskribatua erpinetatik; inskribatua aldeak ukituz.', 'Circunscrita, por los vértices; inscrita, tocando los lados.', 'المحيطة تمر بالرؤوس؛ والداخلية تمس الأضلاع.'),
        figure: (language) => <CentersFigure language={language} />
    },

    /* ---------- 3. Quadrilaterals and symmetry ---------- */
    {
        id: 'quad-diagonals',
        stage: 'quadrilaterals',
        title: say('Laukien diagonalak', 'Las diagonales de los cuadriláteros', 'أقطار الرباعيات'),
        goal: say('Lauki bat bere diagonalen propietateen bidez ezagutzea.', 'Reconocer un cuadrilátero por las propiedades de sus diagonales.', 'التعرّف إلى الرباعي من خصائص قطريه.'),
        explanation: say(
            'Laukiak diagonalen bidez ere bereiz daitezke. Paralelogramo guztietan diagonalak beren erdiko puntuan ebakitzen dira. Gainera, laukizuzenean berdinak dira; erronboan, perpendikularrak; eta karratuan, berdinak eta perpendikularrak. Erronboidean ez berdinak ez perpendikularrak. Paralelogramoak ez diren laukietan ere badira kasu bereziak: kometan (trapezoide bat) diagonalak perpendikularrak dira, baina bakarra erdibitzen da; trapezio isoszelean diagonalak berdinak dira. Ariketa polita: bi zuzenki gurutzatu erdian eta lotu muturrak; zuzenkien arabera irudi bat edo beste lortzen da.',
            'Los cuadriláteros también se distinguen por sus diagonales. En todos los paralelogramos las diagonales se cortan en su punto medio. Además, en el rectángulo son iguales; en el rombo, perpendiculares; y en el cuadrado, iguales y perpendiculares. En el romboide no son ni iguales ni perpendiculares. Fuera de los paralelogramos también hay casos especiales: en la cometa (un trapezoide) las diagonales son perpendiculares, pero solo una queda partida por la mitad; en el trapecio isósceles las diagonales son iguales. Un juego: cruza dos segmentos por su mitad y une los extremos; según cómo sean los segmentos, sale una figura u otra.',
            'تتميز الرباعيات بأقطارها أيضًا. في كل متوازيات الأضلاع ينصّف القطران كلٌّ منهما الآخر. وفوق ذلك هما متساويان في المستطيل؛ ومتعامدان في المعيّن؛ ومتساويان ومتعامدان في المربع. وفي متوازي الأضلاع العادي لا متساويان ولا متعامدان. وخارج متوازيات الأضلاع حالات خاصة أيضًا: في الطائرة الورقية (رباعي عام) القطران متعامدان لكن واحدًا منهما فقط يُنصَّف؛ وفي شبه المنحرف المتساوي الساقين القطران متساويان. لعبة: صالِب قطعتين من منتصفيهما وصِل أطرافهما؛ فحسب القطعتين ينتج شكل أو آخر.'
        ),
        stepsKind: 'facts',
        steps: [
            { title: say('Erdian ebakitzen dira', 'Se cortan en el punto medio', 'ينصّف كلٌّ منهما الآخر'), text: say('Paralelogramo guztiak.', 'Todos los paralelogramos.', 'كل متوازيات الأضلاع.') },
            { title: say('Berdinak', 'Iguales', 'متساويان'), text: say('Laukizuzena, karratua eta trapezio isoszelea.', 'Rectángulo, cuadrado y trapecio isósceles.', 'المستطيل والمربع وشبه المنحرف المتساوي الساقين.') },
            { title: say('Perpendikularrak', 'Perpendiculares', 'متعامدان'), text: say('Erronboa, karratua eta kometa.', 'Rombo, cuadrado y cometa.', 'المعيّن والمربع والطائرة الورقية.') }
        ],
        example: say('Erdian + berdinak + perpendikularrak → karratua', 'Punto medio + iguales + perpendiculares → cuadrado', 'التنصيف + التساوي + التعامد ← مربع'),
        takeaway: say('Erdian: paralelogramoa. Berdinak: laukizuzena. Perpendikularrak: erronboa. Biak: karratua.', 'Punto medio: paralelogramo. Iguales: rectángulo. Perpendiculares: rombo. Las dos: cuadrado.', 'التنصيف: متوازي أضلاع. التساوي: مستطيل. التعامد: معيّن. الاثنان: مربع.'),
        figure: (language) => <QuadDiagonalsFigure language={language} />
    },
    {
        id: 'quad-angles',
        stage: 'quadrilaterals',
        title: say('Laukien angeluak', 'Los ángulos de los cuadriláteros', 'زوايا الرباعيات'),
        goal: say('Paralelogramo eta trapezioetan falta diren angeluak kalkulatzea.', 'Calcular los ángulos que faltan en paralelogramos y trapecios.', 'حساب الزوايا الناقصة في متوازيات الأضلاع وأشباه المنحرف.'),
        explanation: say(
            'Edozein laukitan angeluen batura $360^{\\circ}$ da. Paralelogramoetan, aurkako angeluak berdinak dira, eta ondoz ondokoek $180^{\\circ}$ egiten dute (betegarriak dira), alde paraleloen artean daudelako. Beraz, angelu bat jakinda, guztiak dakizkigu: $70^{\\circ}$ bada, besteak $110^{\\circ}$, $70^{\\circ}$ eta $110^{\\circ}$. Trapezioetan, alde ez-paralelo bereko bi angeluek $180^{\\circ}$ egiten dute; trapezio isoszelean, gainera, oinarri bereko angeluak berdinak dira.',
            'En cualquier cuadrilátero los ángulos suman $360^{\\circ}$. En los paralelogramos, los ángulos opuestos son iguales y los consecutivos suman $180^{\\circ}$ (son suplementarios), porque están entre lados paralelos. Así que, sabiendo un ángulo, se saben todos: si uno mide $70^{\\circ}$, los otros miden $110^{\\circ}$, $70^{\\circ}$ y $110^{\\circ}$. En los trapecios, los dos ángulos de un mismo lado no paralelo suman $180^{\\circ}$; en el trapecio isósceles, además, los ángulos de una misma base son iguales.',
            'في أي رباعي مجموع الزوايا $360^{\\circ}$. وفي متوازيات الأضلاع تتساوى الزوايا المتقابلة، ومجموع كل زاويتين متتاليتين $180^{\\circ}$ (متكاملتان) لأنهما بين ضلعين متوازيين. فإذا عرفنا زاوية عرفنا الجميع: إذا كانت $70^{\\circ}$ فالأخريات $110^{\\circ}$ و$70^{\\circ}$ و$110^{\\circ}$. وفي أشباه المنحرف مجموع زاويتي الضلع غير الموازي نفسه $180^{\\circ}$؛ وفي شبه المنحرف المتساوي الساقين تتساوى أيضًا زاويتا القاعدة نفسها.'
        ),
        problem: say('Erronboide baten angelu bat $65^{\\circ}$ da. Zenbat dira besteak?', 'Un ángulo de un romboide mide $65^{\\circ}$. ¿Cuánto miden los otros?', 'زاوية في متوازي أضلاع قياسها $65^{\\circ}$. كم قياس الأخريات؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Aurkakoa, berdina.', 'El opuesto, igual.', 'المقابلة مساوية.'), math: same('$65^{\\circ}$') },
            { text: say('Ondokoak, betegarriak.', 'Los consecutivos, suplementarios.', 'المتتاليتان متكاملتان.'), math: same('$180^{\\circ}-65^{\\circ}=115^{\\circ}$') },
            { text: say('Egiaztatu batura.', 'Comprueba la suma.', 'تحقّق من المجموع.'), math: same('$65^{\\circ}+115^{\\circ}+65^{\\circ}+115^{\\circ}=360^{\\circ}$') }
        ],
        example: same('$70^{\\circ}+110^{\\circ}=180^{\\circ}$'),
        takeaway: say('Paralelogramoa: aurkakoak berdinak, ondokoek $180^{\\circ}$.', 'Paralelogramo: opuestos iguales, consecutivos suman $180^{\\circ}$.', 'متوازي الأضلاع: المتقابلة متساوية والمتتالية مجموعها $180^{\\circ}$.'),
        figure: (language) => <QuadAnglesFigure language={language} />
    },
    {
        id: 'symmetry',
        stage: 'quadrilaterals',
        title: say('Simetria-ardatzak', 'Ejes de simetría', 'محاور التناظر'),
        goal: say('Irudi lau baten simetria-ardatzak aurkitzea eta zenbatzea.', 'Encontrar y contar los ejes de simetría de una figura plana.', 'إيجاد محاور تناظر شكل مستوٍ وعدّها.'),
        explanation: say(
            'Simetria-ardatza irudia bi zati berdinetan banatzen duen zuzena da, ispilu bat bezala: irudia ardatzetik tolestuz gero, bi zatiak bat datoz. Karratuak 4 ardatz ditu (2 erdibideak eta 2 diagonalak); laukizuzenak 2 eta erronboak 2 (laukizuzenean erdibideak, erronboan diagonalak); trapezio isoszeleak eta kometak 1; erronboideak bat ere ez. $n$ aldeko poligono erregular batek $n$ ardatz ditu, eta ondoz ondoko bi ardatzek $\\frac{180^{\\circ}}{n}$ eratzen dute. Zirkuluak infinitu ditu: zentrotik pasatzen den zuzen oro.',
            'Un eje de simetría es una recta que divide la figura en dos partes iguales, como un espejo: si se dobla la figura por el eje, las dos partes coinciden. El cuadrado tiene 4 ejes (las 2 medianas y las 2 diagonales); el rectángulo, 2, y el rombo, 2 (en el rectángulo, las medianas; en el rombo, las diagonales); el trapecio isósceles y la cometa, 1; el romboide, ninguno. Un polígono regular de $n$ lados tiene $n$ ejes, y dos ejes contiguos forman $\\frac{180^{\\circ}}{n}$. El círculo tiene infinitos: cualquier recta que pase por el centro.',
            'محور التناظر مستقيم يقسم الشكل إلى جزأين متطابقين كالمرآة: إذا طُوي الشكل على المحور انطبق الجزآن. للمربع 4 محاور (المستقيمان الواصلان بين منتصفات الأضلاع المتقابلة والقطران)؛ وللمستطيل 2 وللمعيّن 2 (في المستطيل الواصلان بين المنتصفات، وفي المعيّن القطران)؛ ولشبه المنحرف المتساوي الساقين وللطائرة الورقية محور واحد؛ ولمتوازي الأضلاع العادي لا شيء. وللمضلع المنتظم ذي $n$ ضلعًا $n$ محاور، وبين كل محورين متجاورين $\\frac{180^{\\circ}}{n}$. وللدائرة عدد لا نهائي: كل مستقيم يمر بالمركز.'
        ),
        problem: say('Zenbat simetria-ardatz ditu pentagono erregular batek, eta zer angelu eratzen dute ondoz ondoko bik?', '¿Cuántos ejes de simetría tiene un pentágono regular y qué ángulo forman dos contiguos?', 'كم محور تناظر للمخمس المنتظم، وما الزاوية بين محورين متجاورين؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Poligono erregularra: $n$ ardatz.', 'Polígono regular: $n$ ejes.', 'مضلع منتظم: $n$ محاور.'), math: same('$5$') },
            { text: say('Ardatzek $180^{\\circ}$ banatzen dute.', 'Los ejes se reparten $180^{\\circ}$.', 'تتقاسم المحاور $180^{\\circ}$.'), math: same('$180^{\\circ}\\mathbin{:}5=36^{\\circ}$') }
        ],
        example: same('$\\square\\to 4\\qquad\\triangle\\to 3\\qquad\\bigcirc\\to\\infty$'),
        takeaway: say('Erregularra: $n$ ardatz, $\\frac{180^{\\circ}}{n}$-ko tartearekin.', 'Regular: $n$ ejes, separados $\\frac{180^{\\circ}}{n}$.', 'المنتظم: $n$ محاور، بينها $\\frac{180^{\\circ}}{n}$.'),
        figure: (language) => <SymmetryFigure language={language} />
    },

    /* ---------- 4. Circle and positions ---------- */
    {
        id: 'line-circle',
        stage: 'circles',
        title: say('Zuzena eta zirkunferentzia', 'Recta y circunferencia', 'المستقيم والدائرة'),
        goal: say('Zuzen baten eta zirkunferentzia baten posizio erlatiboa zentrorako distantziaren bidez erabakitzea.', 'Decidir la posición relativa de una recta y una circunferencia con la distancia al centro.', 'تحديد الوضع النسبي لمستقيم ودائرة بواسطة البعد عن المركز.'),
        explanation: say(
            'Konparatu zentrotik zuzenerako distantzia $d$ erradioarekin $r$. $d>r$ bada, zuzena kanpokoa da: ez du zirkunferentzia ukitzen. $d=r$ bada, ukitzailea da: puntu bakar batean ukitzen du, eta puntu horretako erradioarekiko perpendikularra da. $d<r$ bada, ebakitzailea da: bi puntutan ebakitzen du, eta haien arteko zatia korda bat da. Zentrotik pasatzen den ebakitzailearen korda diametroa da, kordarik luzeena.',
            'Compara la distancia $d$ del centro a la recta con el radio $r$. Si $d>r$, la recta es exterior: no toca la circunferencia. Si $d=r$, es tangente: la toca en un solo punto y es perpendicular al radio en ese punto. Si $d<r$, es secante: la corta en dos puntos, y el trozo entre ellos es una cuerda. La cuerda de la secante que pasa por el centro es el diámetro, la cuerda más larga.',
            'قارن البعد $d$ من المركز إلى المستقيم بنصف القطر $r$. إذا كان $d>r$ فالمستقيم خارجي: لا يمس الدائرة. وإذا كان $d=r$ فهو مماس: يمسها في نقطة واحدة ويعامد نصف القطر عندها. وإذا كان $d<r$ فهو قاطع: يقطعها في نقطتين، والجزء بينهما وتر. ووتر القاطع المار بالمركز هو القطر، أطول الأوتار.'
        ),
        problem: say('Zirkunferentzia baten erradioa 5 cm da. Nolakoak dira zentrotik 3 cm, 5 cm eta 8 cm-ra dauden zuzenak?', 'Una circunferencia tiene 5 cm de radio. ¿Cómo son las rectas que pasan a 3 cm, 5 cm y 8 cm del centro?', 'نصف قطر دائرة 5 سم. كيف تكون المستقيمات التي تبعد عن المركز 3 سم و5 سم و8 سم؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('3 < 5: ebakitzailea.', '3 < 5: secante.', '3 < 5: قاطع.') },
            { text: say('5 = 5: ukitzailea.', '5 = 5: tangente.', '5 = 5: مماس.') },
            { text: say('8 > 5: kanpokoa.', '8 > 5: exterior.', '8 > 5: خارجي.') }
        ],
        example: same('$d<r\\qquad d=r\\qquad d>r$'),
        takeaway: say('$d<r$ ebakitzailea, $d=r$ ukitzailea, $d>r$ kanpokoa.', '$d<r$ secante, $d=r$ tangente, $d>r$ exterior.', '$d<r$ قاطع، $d=r$ مماس، $d>r$ خارجي.'),
        figure: (language) => <LineCircleFigure language={language} />
    },
    {
        id: 'two-circles',
        stage: 'circles',
        title: say('Bi zirkunferentziaren posizioak', 'Posiciones de dos circunferencias', 'أوضاع دائرتين'),
        goal: say('Bi zirkunferentziaren posizio erlatiboa zentroen arteko distantziaz eta erradioez erabakitzea.', 'Decidir la posición relativa de dos circunferencias con la distancia entre centros y los radios.', 'تحديد الوضع النسبي لدائرتين بالبعد بين المركزين ونصفي القطرين.'),
        explanation: say(
            'Izan bitez $r_1$ eta $r_2$ erradioak ($r_1$ handiena) eta $d$ zentroen arteko distantzia. Konparatu $d$ erradioen baturarekin eta kendurarekin. $d>r_1+r_2$: kanpokoak, ez dira ukitzen. $d=r_1+r_2$: kanpotik ukitzaileak. $r_1-r_2<d<r_1+r_2$: ebakitzaileak, bi puntutan ebakitzen dira. $d=r_1-r_2$: barrutik ukitzaileak. $d<r_1-r_2$: barnekoak, txikia handiaren barruan dago ukitu gabe. $d=0$: zentrokideak.',
            'Sean $r_1$ y $r_2$ los radios ($r_1$ el mayor) y $d$ la distancia entre los centros. Compara $d$ con la suma y con la resta de los radios. $d>r_1+r_2$: exteriores, no se tocan. $d=r_1+r_2$: tangentes exteriores. $r_1-r_2<d<r_1+r_2$: secantes, se cortan en dos puntos. $d=r_1-r_2$: tangentes interiores. $d<r_1-r_2$: interiores, la pequeña está dentro de la grande sin tocarla. $d=0$: concéntricas.',
            'ليكن $r_1$ و$r_2$ نصفي القطرين ($r_1$ الأكبر) و$d$ البعد بين المركزين. قارن $d$ بمجموع نصفي القطرين وبفرقهما. $d>r_1+r_2$: متباعدتان لا تتلامسان. $d=r_1+r_2$: متماستان من الخارج. $r_1-r_2<d<r_1+r_2$: متقاطعتان في نقطتين. $d=r_1-r_2$: متماستان من الداخل. $d<r_1-r_2$: متداخلتان، الصغرى داخل الكبرى دون تماس. $d=0$: متحدتا المركز.'
        ),
        problem: say('Bi zirkunferentziaren erradioak 7 cm eta 4 cm dira, eta zentroak 10 cm-ra daude. Nolakoak dira?', 'Dos circunferencias tienen radios de 7 cm y 4 cm, y sus centros están a 10 cm. ¿Cómo son?', 'نصفا قطري دائرتين 7 سم و4 سم، والبعد بين مركزيهما 10 سم. كيف هما؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batura eta kendura.', 'La suma y la resta.', 'المجموع والفرق.'), math: same('$7+4=11\\qquad 7-4=3$') },
            { text: say('Konparatu $d$.', 'Compara $d$.', 'قارن $d$.'), math: same('$3<10<11$') },
            { text: say('Ebakitzaileak dira.', 'Son secantes.', 'هما متقاطعتان.') }
        ],
        example: same('$d=r_1+r_2\\qquad d=r_1-r_2$'),
        takeaway: say('Konparatu $d$ honekin: $r_1+r_2$ eta $r_1-r_2$.', 'Compara $d$ con $r_1+r_2$ y con $r_1-r_2$.', 'قارن $d$ بـ$r_1+r_2$ وبـ$r_1-r_2$.'),
        figure: (language) => <TwoCirclesFigure language={language} />
    },
    {
        id: 'circle-angles',
        stage: 'circles',
        title: say('Angeluak zirkunferentzian eta irudi zirkularrak', 'Ángulos en la circunferencia y figuras circulares', 'الزوايا في الدائرة والأشكال الدائرية'),
        goal: say('Angelu zentrala eta inskribatua bereiztea eta irudi zirkularrak izendatzea.', 'Distinguir el ángulo central y el inscrito y nombrar las figuras circulares.', 'التمييز بين الزاوية المركزية والمحيطية وتسمية الأشكال الدائرية.'),
        explanation: say(
            'Angelu zentralak erpina zentroan du, eta haren aldeak erradioak dira. Angelu inskribatuak erpina zirkunferentzian du, eta haren aldeak kordak dira. Arku bera hartzen badute, inskribatua zentralaren erdia da: zentrala $100^{\\circ}$ bada, inskribatua $50^{\\circ}$. Diametro baten gaineko angelu inskribatu oro zuzena da, zentrala $180^{\\circ}$ delako. Zirkuluaren zatiek izenak dituzte: sektore zirkularra (bi erradio eta arku bat, pizza-zati bat bezala), segmentu zirkularra (korda bat eta arku bat), koroa zirkularra (zentro bereko bi zirkunferentziaren arteko eraztuna) eta trapezio zirkularra (koroaren zati bat).',
            'El ángulo central tiene el vértice en el centro, y sus lados son radios. El ángulo inscrito tiene el vértice en la circunferencia, y sus lados son cuerdas. Si abarcan el mismo arco, el inscrito mide la mitad que el central: si el central mide $100^{\\circ}$, el inscrito mide $50^{\\circ}$. Todo ángulo inscrito que abarca un diámetro es recto, porque el central mide $180^{\\circ}$. Las partes del círculo tienen nombre: sector circular (dos radios y un arco, como una porción de pizza), segmento circular (una cuerda y un arco), corona circular (el anillo entre dos circunferencias con el mismo centro) y trapecio circular (un trozo de la corona).',
            'رأس الزاوية المركزية في المركز وضلعاها نصفا قطرين. ورأس الزاوية المحيطية على الدائرة وضلعاها وتران. وإذا حصرتا القوس نفسه فالمحيطية نصف المركزية: إذا كانت المركزية $100^{\\circ}$ فالمحيطية $50^{\\circ}$. وكل زاوية محيطية تحصر قطرًا قائمة، لأن المركزية $180^{\\circ}$. ولأجزاء القرص أسماء: القطاع الدائري (نصفا قطرين وقوس، كقطعة بيتزا)، والقطعة الدائرية (وتر وقوس)، والحلقة الدائرية (ما بين دائرتين لهما المركز نفسه)، وشبه المنحرف الدائري (جزء من الحلقة).'
        ),
        problem: say('Angelu inskribatu batek $35^{\\circ}$ ditu. Zenbat ditu arku bera hartzen duen angelu zentralak?', 'Un ángulo inscrito mide $35^{\\circ}$. ¿Cuánto mide el central que abarca el mismo arco?', 'زاوية محيطية قياسها $35^{\\circ}$. كم قياس الزاوية المركزية التي تحصر القوس نفسه؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zentrala inskribatuaren bikoitza da.', 'El central es el doble del inscrito.', 'المركزية ضعف المحيطية.'), math: same('$2\\cdot 35^{\\circ}=70^{\\circ}$') }
        ],
        example: same('$\\hat{P}=\\frac{\\hat{O}}{2}\\qquad 50^{\\circ}=\\frac{100^{\\circ}}{2}$'),
        takeaway: say('Inskribatua = zentrala : 2. Diametroaren gainean: $90^{\\circ}$.', 'Inscrito = central : 2. Sobre un diámetro: $90^{\\circ}$.', 'المحيطية = المركزية : 2. على قطر: $90^{\\circ}$.'),
        figure: (language) => <CircleAnglesFigure language={language} />
    },

    /* ---------- 5. Areas of compound figures ---------- */
    {
        id: 'composite',
        stage: 'areas',
        title: say('Irudi konposatuak', 'Figuras compuestas', 'الأشكال المركّبة'),
        goal: say('Irudi konposatu baten azalera irudi ezagunetan zatituz edo kenduz kalkulatzea.', 'Calcular el área de una figura compuesta descomponiéndola en figuras conocidas o restando.', 'حساب مساحة شكل مركّب بتقسيمه إلى أشكال معروفة أو بالطرح.'),
        explanation: say(
            'Irudi konposatu baten azalera kalkulatzeko, bi bide daude. Batu: zatitu irudia formula ezaguneko zatitan (laukizuzenak, triangeluak, trapezioak, zirkulu-erdiak…) eta batu haien azalerak. Kendu: irudi handiago bat osatu eta kendu soberan dagoena; adibidez, zulo bat duen ohol baten azalera = oholaren azalera − zuloaren azalera. Kontuz neurriekin: zati batzuen neurriak beste aldeetatik atera behar dira, eta unitate karratuak erabili behar dira beti.',
            'Para calcular el área de una figura compuesta hay dos caminos. Sumar: divide la figura en piezas de fórmula conocida (rectángulos, triángulos, trapecios, semicírculos…) y suma sus áreas. Restar: completa una figura mayor y quita lo que sobra; por ejemplo, el área de una tabla con un agujero = área de la tabla − área del agujero. Cuidado con las medidas: algunas hay que deducirlas de los otros lados, y el resultado siempre va en unidades cuadradas.',
            'لحساب مساحة شكل مركّب طريقان. الجمع: قسّم الشكل إلى قطع معروفة الصيغة (مستطيلات ومثلثات وأشباه منحرف وأنصاف دوائر…) واجمع مساحاتها. الطرح: أكمل شكلًا أكبر واحذف الزائد؛ مثلًا مساحة لوح فيه ثقب = مساحة اللوح − مساحة الثقب. انتبه للقياسات: بعضها يُستنتج من الأضلاع الأخرى، والنتيجة بوحدات مربعة دائمًا.'
        ),
        problem: say('L forma: 10 × 6 cm-ko laukizuzen bati 4 × 3 cm-ko laukizuzen bat kendu zaio izkina batean. Zein da azalera?', 'Una L: a un rectángulo de 10 × 6 cm se le ha quitado un rectángulo de 4 × 3 cm en una esquina. ¿Cuál es el área?', 'شكل L: أُزيل من مستطيل 10 × 6 سم مستطيل 4 × 3 سم في ركن. ما المساحة؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Laukizuzen osoa.', 'El rectángulo entero.', 'المستطيل كاملًا.'), math: same('$10\\cdot 6=60$') },
            { text: say('Kendutako zatia.', 'El trozo quitado.', 'القطعة المزالة.'), math: same('$4\\cdot 3=12$') },
            { text: say('Kendu: 48 cm².', 'Resta: 48 cm².', 'اطرح: 48 سم².'), math: same('$60-12=48$') }
        ],
        example: same('$A=A_{1}+A_{2}\\qquad A=A_{1}-A_{2}$'),
        takeaway: say('Zatitu eta batu, edo osatu eta kendu.', 'Divide y suma, o completa y resta.', 'قسّم واجمع، أو أكمل واطرح.'),
        figure: (language) => <CompositeFigure language={language} />
    },
    {
        id: 'sector-ring',
        stage: 'areas',
        title: say('Arkua, sektorea eta koroa', 'Arco, sector y corona', 'القوس والقطاع والحلقة'),
        goal: say('Arku baten luzera eta sektore eta koroa zirkular baten azalera kalkulatzea.', 'Calcular la longitud de un arco y el área de un sector y de una corona circular.', 'حساب طول قوس ومساحة قطاع وحلقة دائرية.'),
        explanation: say(
            'Sektore bat zirkuluaren zati bat da, eta haren angelu zentrala $360^{\\circ}$-ren zati bera. Beraz, arkua zirkunferentziaren zati hori da, $L=\\frac{2\\pi r\\cdot\\alpha}{360}$, eta sektorearen azalera zirkuluaren zati hori, $A=\\frac{\\pi r^{2}\\cdot\\alpha}{360}$: $90^{\\circ}$-ko sektorea zirkuluaren laurdena da. Koroa zirkularraren azalera zirkulu handiaren azalera ken txikiarena da: $A=\\pi\\cdot(R^{2}-r^{2})$. Kontuz: lehenik karratuak, gero kendu; ez kendu erradioak karratu aurretik. Hemen $\\pi\\approx 3{,}14$ erabiltzen dugu.',
            'Un sector es una parte del círculo, la misma parte de $360^{\\circ}$ que su ángulo central. Así que el arco es esa parte de la circunferencia, $L=\\frac{2\\pi r\\cdot\\alpha}{360}$, y el área del sector esa parte del círculo, $A=\\frac{\\pi r^{2}\\cdot\\alpha}{360}$: un sector de $90^{\\circ}$ es un cuarto del círculo. El área de la corona circular es el área del círculo grande menos la del pequeño: $A=\\pi\\cdot(R^{2}-r^{2})$. Cuidado: primero los cuadrados, luego la resta; no restes los radios antes de elevar al cuadrado. Aquí usamos $\\pi\\approx 3{,}14$.',
            'القطاع جزء من القرص، وهو الجزء نفسه من $360^{\\circ}$ الذي تمثله زاويته المركزية. فالقوس هو ذلك الجزء من محيط الدائرة، $L=\\frac{2\\pi r\\cdot\\alpha}{360}$، ومساحة القطاع ذلك الجزء من القرص، $A=\\frac{\\pi r^{2}\\cdot\\alpha}{360}$: قطاع $90^{\\circ}$ ربع القرص. ومساحة الحلقة الدائرية مساحة القرص الكبير ناقص مساحة الصغير: $A=\\pi\\cdot(R^{2}-r^{2})$. انتبه: المربعات أولًا ثم الطرح؛ لا تطرح نصفي القطرين قبل التربيع. نستعمل هنا $\\pi\\approx 3{,}14$.'
        ),
        problem: say('Kalkulatu 10 cm-ko erradioa eta $90^{\\circ}$-ko angelua dituen sektorearen azalera.', 'Calcula el área de un sector de 10 cm de radio y $90^{\\circ}$.', 'احسب مساحة قطاع نصف قطره 10 سم وزاويته $90^{\\circ}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zirkulu osoa.', 'El círculo entero.', 'القرص كاملًا.'), math: same('$3{,}14\\cdot 10^{2}=314$') },
            { text: say('$90^{\\circ}$ laurdena da.', '$90^{\\circ}$ es un cuarto.', '$90^{\\circ}$ ربع.'), math: same('$\\frac{314\\cdot 90}{360}=78{,}5$') }
        ],
        example: same('$3{,}14\\cdot(5^{2}-3^{2})=50{,}24$'),
        takeaway: say('Sektorea eta arkua: zati $\\frac{\\alpha}{360}$. Koroa: $\\pi\\cdot(R^{2}-r^{2})$.', 'Sector y arco: la parte $\\frac{\\alpha}{360}$. Corona: $\\pi\\cdot(R^{2}-r^{2})$.', 'القطاع والقوس: الجزء $\\frac{\\alpha}{360}$. الحلقة: $\\pi\\cdot(R^{2}-r^{2})$.'),
        figure: (language) => <SectorRingFigure language={language} />
    },
    {
        id: 'area-problems',
        stage: 'areas',
        title: say('Azalera- eta perimetro-problemak', 'Problemas de áreas y perímetros', 'مسائل المساحات والمحيطات'),
        goal: say('Eguneroko problemak ebaztea: azalera edo perimetroa behar den erabakiz.', 'Resolver problemas cotidianos decidiendo si hace falta el área o el perímetro.', 'حلّ مسائل يومية بتحديد ما إذا كانت تحتاج إلى المساحة أم المحيط.'),
        explanation: say(
            'Problema baten aurrean, galdetu: inguratu behar da ala estali? Hesia, zinta edo zokalo bat jartzeko, perimetroa (cm, m). Lorategia ereiteko, zorua lauzatzeko edo horma margotzeko, azalera (cm², m²). Lauza kopurua aurkitzeko, zatitu zoruaren azalera lauza baten azaleraz (unitate berean!). Bide edo marko batek irudi bat inguratzen badu, haren azalera kanpoko irudia ken barrukoa da. Prezioak: azalera bider m² bakoitzaren prezioa.',
            'Ante un problema, pregúntate: ¿hay que rodear o cubrir? Para poner una valla, una cinta o un rodapié, el perímetro (cm, m). Para sembrar un jardín, embaldosar un suelo o pintar una pared, el área (cm², m²). Para saber cuántas baldosas, divide el área del suelo entre el área de una baldosa (¡en la misma unidad!). Si un camino o un marco rodea una figura, su área es la figura exterior menos la interior. Precios: el área por el precio de cada m².',
            'أمام أي مسألة اسأل: هل نحيط أم نغطي؟ لوضع سياج أو شريط أو إطار سفلي نحتاج المحيط (سم، م). ولزرع حديقة أو تبليط أرضية أو طلاء جدار نحتاج المساحة (سم²، م²). ولمعرفة عدد البلاطات اقسم مساحة الأرضية على مساحة البلاطة (بالوحدة نفسها!). وإذا أحاط ممر أو إطار بشكل فمساحته هي الشكل الخارجي ناقص الداخلي. الأسعار: المساحة في سعر المتر المربع.'
        ),
        problem: say('5 m × 4 m-ko gela bat 50 cm-ko aldeko lauza karratuekin lauzatu nahi da. Zenbat lauza behar dira?', 'Se quiere embaldosar una habitación de 5 m × 4 m con baldosas cuadradas de 50 cm de lado. ¿Cuántas baldosas hacen falta?', 'نريد تبليط غرفة 5 م × 4 م ببلاطات مربعة طول ضلعها 50 سم. كم بلاطة نحتاج؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Gelaren azalera.', 'El área de la habitación.', 'مساحة الغرفة.'), math: same('$5\\cdot 4=20\\ \\text{m}^{2}$') },
            { text: say('Lauza baten azalera, m²-tan.', 'El área de una baldosa, en m².', 'مساحة البلاطة بالمتر المربع.'), math: same('$0{,}5\\cdot 0{,}5=0{,}25\\ \\text{m}^{2}$') },
            { text: say('Zatitu.', 'Divide.', 'اقسم.'), math: same('$20\\mathbin{:}0{,}25=80$') }
        ],
        example: say('Hesia → perimetroa · Lauzak → azalera', 'Valla → perímetro · Baldosas → área', 'سياج ← محيط · بلاط ← مساحة'),
        takeaway: say('Inguratu: perimetroa. Estali: azalera. Unitate berean!', 'Rodear: perímetro. Cubrir: área. ¡En la misma unidad!', 'الإحاطة: المحيط. التغطية: المساحة. بالوحدة نفسها!'),
        figure: (language) => <AreaProblemsFigure language={language} />
    }
]
