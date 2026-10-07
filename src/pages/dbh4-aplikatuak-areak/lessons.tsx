import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { AngleSumFigure, SectorRingFigure } from '../dbh1-figurak-v2/figures'
import { PrismAreaFigure, PrismVolumeFigure, PyramidAreaFigure, PyramidVolumeFigure, ConeFigure } from '../dbh2-gorputzak-v2/figures'
import { ClassifyFigure, FormulaFigure, IsoscelesHeightFigure, LadderFigure } from '../dbh2-pitagoras-v2/figures'
import { CompositeAreasFigure, CompoundSolidFigure, PerimeterFigure, PolygonAreasFigure } from './figures'

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
    { id: 'polygons', tone: 'blue', title: { eu: 'Poligonoak eta perimetroak', es: 'Polígonos y perímetros', ar: 'المضلعات والمحيطات' } },
    { id: 'pythagoras', tone: 'violet', title: { eu: 'Pitagorasen teorema', es: 'Teorema de Pitágoras', ar: 'مبرهنة فيثاغورس' } },
    { id: 'plane-areas', tone: 'mustard', title: { eu: 'Irudi lauen azalerak', es: 'Áreas de figuras planas', ar: 'مساحات الأشكال المستوية' } },
    { id: 'solid-areas', tone: 'coral', title: { eu: 'Gorputzen azalerak', es: 'Áreas de los cuerpos', ar: 'مساحات الأجسام' } },
    { id: 'volumes', tone: 'green', title: { eu: 'Bolumenak', es: 'Volúmenes', ar: 'الحجوم' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })

export const areasVolumesTopics: UnitTopic[] = [
    /* ---------- 1. Polygons and perimeters ---------- */
    {
        id: 'angles',
        stage: 'polygons',
        title: say('Poligonoen angeluak', 'Ángulos de los polígonos', 'زوايا المضلعات'),
        goal: say('Poligono baten barne-angeluen batura kalkulatzea eta poligono erregular baten angelua aurkitzea.', 'Calcular la suma de los ángulos interiores de un polígono y hallar el ángulo de un polígono regular.', 'حساب مجموع الزوايا الداخلية لمضلع وإيجاد زاوية المضلع المنتظم.'),
        explanation: say(
            'Poligonoa zuzenki-zati itxiz mugatutako irudi laua da. Elementuak: aldeak, erpinak, angeluak eta diagonalak (ondoz ondokoak ez diren bi erpin lotzen dituzten zuzenkiak). Erpin batetik diagonal guztiak marrazten baditugu, $n$ aldeko poligonoa $n-2$ triangelutan banatzen da, eta triangelu bakoitzaren angeluek $180°$ batzen dute. Horregatik, barne-angeluen batura $180°\\cdot (n-2)$ da. Poligono bat erregularra da alde guztiak berdinak (aldeberdina) eta angelu guztiak berdinak (angeluberdina) baditu; orduan angelu bakoitza batura zati $n$ da. Adibidez, hexagono erregularrean $720°\\mathbin{:}6=120°$.',
            'Un polígono es una figura plana limitada por segmentos que forman una línea cerrada. Sus elementos son los lados, los vértices, los ángulos y las diagonales (segmentos que unen dos vértices no consecutivos). Si desde un vértice trazamos todas las diagonales, un polígono de $n$ lados queda dividido en $n-2$ triángulos, y los ángulos de cada triángulo suman $180°$. Por eso la suma de los ángulos interiores es $180°\\cdot (n-2)$. Un polígono es regular si tiene todos los lados iguales (equilátero) y todos los ángulos iguales (equiángulo); entonces cada ángulo es la suma entre $n$. Por ejemplo, en el hexágono regular, $720°\\mathbin{:}6=120°$.',
            'المضلع شكل مستوٍ تحدّه قطع مستقيمة تكوّن خطًا مغلقًا. عناصره الأضلاع والرؤوس والزوايا والأقطار (قطع تصل بين رأسين غير متتاليين). إذا رسمنا من رأس واحد جميع الأقطار انقسم المضلع ذو $n$ أضلاع إلى $n-2$ مثلثًا، ومجموع زوايا كل مثلث $180°$. لذلك مجموع الزوايا الداخلية $180°\\cdot (n-2)$. ويكون المضلع منتظمًا إذا تساوت جميع أضلاعه (متساوي الأضلاع) وجميع زواياه (متساوي الزوايا)؛ وحينها كل زاوية هي المجموع مقسومًا على $n$. مثلًا في المسدس المنتظم $720°\\mathbin{:}6=120°$.'
        ),
        problem: say('Zenbat batzen dute eneagono baten barne-angeluek? Eta zenbat neurtzen du eneagono erregular baten angelu bakoitzak?', '¿Cuánto suman los ángulos interiores de un eneágono? ¿Y cuánto mide cada ángulo de un eneágono regular?', 'كم مجموع الزوايا الداخلية للمضلع التساعي؟ وكم قياس كل زاوية في التساعي المنتظم؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Eneagonoak 9 alde ditu: 7 triangelu.', 'El eneágono tiene 9 lados: 7 triángulos.', 'للتساعي 9 أضلاع: 7 مثلثات.'), math: same('$180\\cdot (9-2)=1260$') },
            { text: say('Erregularra bada, 9 angelu berdin.', 'Si es regular, 9 ángulos iguales.', 'إذا كان منتظمًا فله 9 زوايا متساوية.'), math: same('$1260\\mathbin{:}9=140$') }
        ],
        example: same('$180°\\cdot (n-2)$'),
        takeaway: say('Barne-angeluen batura: 180° bider (aldeak ken 2). Erregularrean, zatitu alde kopuruaz.', 'Suma de ángulos interiores: 180° por (lados menos 2). En el regular, divide entre el número de lados.', 'مجموع الزوايا الداخلية: 180° في (الأضلاع ناقص 2). وفي المنتظم اقسم على عدد الأضلاع.'),
        figure: (language) => <AngleSumFigure language={language} />
    },
    {
        id: 'triangles',
        stage: 'polygons',
        title: say('Triangeluak', 'Triángulos', 'المثلثات'),
        goal: say('Triangeluak aldeen eta angeluen arabera sailkatzea, aldeekin bakarrik ere bai.', 'Clasificar los triángulos según sus lados y sus ángulos, también solo con los lados.', 'تصنيف المثلثات حسب أضلاعها وزواياها، وحتى بالأضلاع وحدها.'),
        explanation: say(
            'Aldeen arabera, triangelu bat aldeberdina da (hiru alde berdin), isoszelea (bi alde berdin) edo eskalenoa (hiru alde desberdin). Angeluen arabera, angeluzuzena da (angelu zuzen bat), kamutsa (angelu kamuts bat) edo zorrotza (hiru angelu zorrotz). Hiru aldeak bakarrik ezagutzen baditugu, aldatu angelu zuzenaren proba: konparatu alde handienaren karratua beste bien karratuen baturarekin. Berdinak badira, angeluzuzena da; handiagoa bada, kamutsa; txikiagoa bada, zorrotza. Gainera, triangelua osatzeko alde bakoitzak beste bien batura baino txikiagoa izan behar du.',
            'Según sus lados, un triángulo es equilátero (tres lados iguales), isósceles (dos lados iguales) o escaleno (tres lados distintos). Según sus ángulos, es rectángulo (un ángulo recto), obtusángulo (un ángulo obtuso) o acutángulo (tres ángulos agudos). Si solo conocemos los tres lados, hay una prueba: compara el cuadrado del lado mayor con la suma de los cuadrados de los otros dos. Si son iguales, es rectángulo; si es mayor, obtusángulo; si es menor, acutángulo. Además, para que exista el triángulo cada lado tiene que ser menor que la suma de los otros dos.',
            'حسب الأضلاع يكون المثلث متساوي الأضلاع (ثلاثة أضلاع متساوية) أو متساوي الساقين (ضلعان متساويان) أو مختلف الأضلاع (ثلاثة أضلاع مختلفة). وحسب الزوايا يكون قائمًا (زاوية قائمة) أو منفرجًا (زاوية منفرجة) أو حادًّا (ثلاث زوايا حادة). إذا عرفنا الأضلاع الثلاثة فقط فهناك اختبار: قارن مربع الضلع الأكبر بمجموع مربعي الضلعين الآخرين. إن تساويا فهو قائم؛ وإن كان أكبر فمنفرج؛ وإن كان أصغر فحادّ. ثم إنه لكي يوجد المثلث يجب أن يكون كل ضلع أصغر من مجموع الضلعين الآخرين.'
        ),
        problem: say('Triangelu baten aldeak 6 cm, 8 cm eta 11 cm dira. Nolakoa da angeluen arabera?', 'Los lados de un triángulo miden 6 cm, 8 cm y 11 cm. ¿Cómo es según sus ángulos?', 'أضلاع مثلث 6 سم و8 سم و11 سم. ما نوعه حسب زواياه؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Alde handienaren karratua.', 'Cuadrado del lado mayor.', 'مربع الضلع الأكبر.'), math: same('$11^{2}=121$') },
            { text: say('Beste bien karratuen batura.', 'Suma de los cuadrados de los otros dos.', 'مجموع مربعي الضلعين الآخرين.'), math: same('$6^{2}+8^{2}=100$') },
            { text: say('121 > 100: kamutsa da (eta eskalenoa).', '121 > 100: es obtusángulo (y escaleno).', '121 > 100: منفرج (ومختلف الأضلاع).') }
        ],
        example: same('$a^{2}\\gtrless b^{2}+c^{2}$'),
        takeaway: say('Konparatu alde handienaren karratua beste bien karratuen baturarekin: berdin, zuzena; handiago, kamutsa; txikiago, zorrotza.', 'Compara el cuadrado del lado mayor con la suma de los otros dos cuadrados: igual, rectángulo; mayor, obtusángulo; menor, acutángulo.', 'قارن مربع الضلع الأكبر بمجموع المربعين الآخرين: يساوي، قائم؛ أكبر، منفرج؛ أصغر، حادّ.'),
        figure: (language) => <ClassifyFigure language={language} />
    },
    {
        id: 'perimeters',
        stage: 'polygons',
        title: say('Perimetroak eta zirkunferentzia', 'Perímetros y circunferencia', 'المحيطات والدائرة'),
        goal: say('Poligonoen perimetroa eta zirkunferentziaren eta arku baten luzera kalkulatzea.', 'Calcular el perímetro de los polígonos y la longitud de la circunferencia y de un arco.', 'حساب محيط المضلعات وطول الدائرة وطول القوس.'),
        explanation: say(
            'Poligono baten perimetroa haren aldeen luzeren batura da; poligono erregularrean, $P=n\\cdot l$. Zirkunferentzia zentrotik distantzia berera dauden puntuek osatzen duten lerro kurbatu itxia da; zirkulua, berriz, zirkunferentziak mugatzen duen gainazala. Zirkunferentzia guztietan luzera eta diametroaren arteko zatidura berdina da, $\\pi\\approx 3{,}14$; beraz, luzera $L=2\\pi r$ da. Arku bat zirkunferentziaren zati bat da: $n°$-ko angelu zentralari dagokion arkuaren luzera $\\dfrac{2\\pi r\\cdot n}{360}$ da. Adibidez, 90°-ko arkua zirkunferentziaren laurdena da.',
            'El perímetro de un polígono es la suma de las longitudes de sus lados; en un polígono regular, $P=n\\cdot l$. La circunferencia es la línea curva cerrada formada por los puntos que están a la misma distancia del centro; el círculo es la superficie que limita. En todas las circunferencias el cociente entre la longitud y el diámetro es el mismo, $\\pi\\approx 3{,}14$; por eso la longitud es $L=2\\pi r$. Un arco es un trozo de la circunferencia: el arco que corresponde a un ángulo central de $n°$ mide $\\dfrac{2\\pi r\\cdot n}{360}$. Por ejemplo, el arco de 90° es la cuarta parte de la circunferencia.',
            'محيط المضلع مجموع أطوال أضلاعه؛ وفي المضلع المنتظم $P=n\\cdot l$. الدائرة خط منحنٍ مغلق مكوّن من النقاط التي تبعد المسافة نفسها عن المركز؛ والقرص هو السطح الذي تحدّه. في جميع الدوائر يكون خارج قسمة الطول على القطر هو نفسه $\\pi\\approx 3{,}14$؛ لذلك الطول $L=2\\pi r$. والقوس جزء من الدائرة: طول القوس المقابل لزاوية مركزية قياسها $n°$ هو $\\dfrac{2\\pi r\\cdot n}{360}$. مثلًا قوس 90° ربع الدائرة.'
        ),
        problem: say('Bizikleta baten gurpilak 35 cm-ko erradioa du. Zenbat metro egiten ditu 100 bira ematen baditu?', 'La rueda de una bicicleta tiene 35 cm de radio. ¿Cuántos metros recorre si da 100 vueltas?', 'نصف قطر عجلة دراجة 35 سم. كم مترًا تقطع إذا دارت 100 دورة؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bira baten luzera.', 'Longitud de una vuelta.', 'طول دورة واحدة.'), math: same('$2\\cdot 3{,}14\\cdot 35=219{,}8$') },
            { text: say('100 bira, cm-tan.', '100 vueltas, en cm.', '100 دورة بالسنتيمتر.'), math: same('$219{,}8\\cdot 100=21\\,980$') },
            { text: say('Metrotan: 219,8 m.', 'En metros: 219,8 m.', 'بالمتر: 219.8 م.') }
        ],
        example: same('$L=2\\pi r$'),
        takeaway: say('Zirkunferentzia: 2πr. Arkua: zirkunferentzia bider angelua zati 360.', 'Circunferencia: 2πr. Arco: la circunferencia por el ángulo entre 360.', 'الدائرة: 2πr. القوس: الدائرة في الزاوية على 360.'),
        figure: (language) => <PerimeterFigure language={language} />
    },

    /* ---------- 2. Pythagoras ---------- */
    {
        id: 'right-triangles',
        stage: 'pythagoras',
        title: say('Hipotenusa eta katetoak', 'Hipotenusa y catetos', 'الوتر والضلعان القائمان'),
        goal: say('Triangelu angeluzuzen baten alde bat kalkulatzea beste biak ezagututa.', 'Calcular un lado de un triángulo rectángulo conociendo los otros dos.', 'حساب ضلع في مثلث قائم بمعرفة الضلعين الآخرين.'),
        explanation: say(
            'Triangelu angeluzuzen batean angelu zuzenaren aurkako aldea hipotenusa da ($a$), luzeena, eta beste biak katetoak ($b$ eta $c$). Pitagorasen teoremak dio hipotenusaren karratua katetoen karratuen batura dela: $a^{2}=b^{2}+c^{2}$. Hipotenusa kalkulatzeko, batu katetoen karratuak eta atera erro karratua. Kateto bat kalkulatzeko, hipotenusaren karratuari kendu beste katetoaren karratua eta atera erroa. Erroa zehatza ez bada, hurbildu ehunenetara. Egiaztapen azkarra: hipotenusak katetoak baino luzeagoa izan behar du beti.',
            'En un triángulo rectángulo, el lado opuesto al ángulo recto es la hipotenusa ($a$), el más largo, y los otros dos son los catetos ($b$ y $c$). El teorema de Pitágoras dice que el cuadrado de la hipotenusa es la suma de los cuadrados de los catetos: $a^{2}=b^{2}+c^{2}$. Para calcular la hipotenusa, suma los cuadrados de los catetos y saca la raíz cuadrada. Para calcular un cateto, al cuadrado de la hipotenusa réstale el cuadrado del otro cateto y saca la raíz. Si la raíz no es exacta, aproxima a las centésimas. Comprobación rápida: la hipotenusa tiene que ser siempre más larga que los catetos.',
            'في المثلث القائم يسمّى الضلع المقابل للزاوية القائمة الوتر ($a$)، وهو الأطول، والضلعان الآخران هما الضلعان القائمان ($b$ و$c$). تنص مبرهنة فيثاغورس على أن مربع الوتر يساوي مجموع مربعي الضلعين القائمين: $a^{2}=b^{2}+c^{2}$. لحساب الوتر اجمع مربعي الضلعين القائمين واستخرج الجذر التربيعي. ولحساب ضلع قائم اطرح من مربع الوتر مربع الضلع الآخر واستخرج الجذر. وإذا لم يكن الجذر تامًّا فقرّب إلى الأجزاء من مئة. تحقق سريع: يجب أن يكون الوتر دائمًا أطول من الضلعين القائمين.'
        ),
        problem: say('Triangelu angeluzuzen baten hipotenusak 8 cm neurtzen ditu eta kateto batek 5 cm. Kalkulatu beste katetoa.', 'La hipotenusa de un triángulo rectángulo mide 8 cm y un cateto 5 cm. Calcula el otro cateto.', 'وتر مثلث قائم 8 سم وأحد ضلعيه القائمين 5 سم. احسب الضلع الآخر.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hipotenusaren karratuari kendu katetoarena.', 'Al cuadrado de la hipotenusa réstale el del cateto.', 'اطرح من مربع الوتر مربع الضلع.'), math: same('$64-25=39$') },
            { text: say('Atera erroa eta hurbildu.', 'Saca la raíz y aproxima.', 'استخرج الجذر وقرّب.'), math: same('$c=\\sqrt{39}\\approx 6{,}24$') }
        ],
        example: same('$a^{2}=b^{2}+c^{2}$'),
        takeaway: say('Hipotenusa: batu karratuak. Katetoa: kendu karratuak. Gero, erro karratua.', 'Hipotenusa: suma los cuadrados. Cateto: resta los cuadrados. Después, raíz cuadrada.', 'الوتر: اجمع المربعين. الضلع القائم: اطرح المربعين. ثم الجذر التربيعي.'),
        figure: (language) => <FormulaFigure language={language} />
    },
    {
        id: 'heights',
        stage: 'pythagoras',
        title: say('Altuerak eta apotemak', 'Alturas y apotemas', 'الارتفاعات والعوامد'),
        goal: say('Triangelu isoszele eta aldeberdinen altuera eta hexagono erregularraren apotema Pitagorasekin kalkulatzea.', 'Calcular con Pitágoras la altura de triángulos isósceles y equiláteros y la apotema del hexágono regular.', 'حساب ارتفاع المثلثات متساوية الساقين والأضلاع وعامد المسدس المنتظم بفيثاغورس.'),
        explanation: say(
            'Irudi askotan triangelu angeluzuzen bat ezkutatuta dago. Triangelu isoszele edo aldeberdin batean, altuerak oinarria erdibitzen du: alde berdina hipotenusa da, eta katetoak altuera eta oinarriaren erdia. Beraz, $h=\\sqrt{l^{2}-(b/2)^{2}}$. Hexagono erregularrean, erradioa aldearen berdina da; apotema (zentrotik alde baten erdiraino doan zuzenkia) katetoa da, eta beste katetoa aldearen erdia: $a=\\sqrt{l^{2}-(l/2)^{2}}$. Laukizuzenaren diagonala ere hipotenusa da, eta erronboan diagonalen erdiak katetoak dira eta aldea hipotenusa.',
            'En muchas figuras hay un triángulo rectángulo escondido. En un triángulo isósceles o equilátero, la altura divide la base en dos mitades: el lado igual es la hipotenusa y los catetos son la altura y media base. Por tanto, $h=\\sqrt{l^{2}-(b/2)^{2}}$. En el hexágono regular, el radio es igual al lado; la apotema (el segmento del centro al punto medio de un lado) es un cateto, y el otro cateto es medio lado: $a=\\sqrt{l^{2}-(l/2)^{2}}$. La diagonal del rectángulo también es una hipotenusa, y en el rombo las semidiagonales son los catetos y el lado la hipotenusa.',
            'في كثير من الأشكال مثلث قائم مخفي. في المثلث متساوي الساقين أو متساوي الأضلاع يقسم الارتفاع القاعدة نصفين: الضلع المتساوي هو الوتر، والضلعان القائمان هما الارتفاع ونصف القاعدة. إذن $h=\\sqrt{l^{2}-(b/2)^{2}}$. وفي المسدس المنتظم نصف القطر يساوي الضلع؛ والعامد (القطعة من المركز إلى منتصف ضلع) ضلع قائم، والضلع القائم الآخر نصف الضلع: $a=\\sqrt{l^{2}-(l/2)^{2}}$. وقطر المستطيل وتر أيضًا، وفي المعيّن نصفا القطرين ضلعان قائمان والضلع وتر.'
        ),
        problem: say('Kalkulatu 10 cm-ko aldeko triangelu aldeberdin baten altuera.', 'Calcula la altura de un triángulo equilátero de 10 cm de lado.', 'احسب ارتفاع مثلث متساوي الأضلاع طول ضلعه 10 سم.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hipotenusa 10, kateto bat oinarriaren erdia, 5.', 'Hipotenusa 10, un cateto media base, 5.', 'الوتر 10، وأحد الضلعين نصف القاعدة 5.') },
            { text: say('Kendu karratuak.', 'Resta los cuadrados.', 'اطرح المربعين.'), math: same('$h^{2}=100-25=75$') },
            { text: say('Atera erroa.', 'Saca la raíz.', 'استخرج الجذر.'), math: same('$h=\\sqrt{75}\\approx 8{,}66$') }
        ],
        example: same('$h^{2}=l^{2}-(l/2)^{2}$'),
        takeaway: say('Bilatu triangelu angeluzuzena: altuera eta apotema katetoak dira; aldea, hipotenusa.', 'Busca el triángulo rectángulo: la altura y la apotema son catetos; el lado, la hipotenusa.', 'ابحث عن المثلث القائم: الارتفاع والعامد ضلعان قائمان؛ والضلع هو الوتر.'),
        figure: (language) => <IsoscelesHeightFigure language={language} />
    },
    {
        id: 'applications',
        stage: 'pythagoras',
        title: say('Pitagoras problemetan', 'Pitágoras en problemas', 'فيثاغورس في المسائل'),
        goal: say('Eguneroko egoeretan triangelu angeluzuzena ikustea eta Pitagoras aplikatzea.', 'Ver el triángulo rectángulo en situaciones cotidianas y aplicar Pitágoras.', 'رؤية المثلث القائم في مواقف يومية وتطبيق فيثاغورس.'),
        explanation: say(
            'Problema askotan triangelu angeluzuzena irudia marraztean agertzen da. Hormaren kontra jarritako eskailera batean, eskailera hipotenusa da, eta katetoak horma eta lurra. Bi eraikinen arteko distantzian, altueren kendura kateto bat da. Telebista baten «hazbeteak» pantailaren diagonala dira. Pausoak: 1) marraztu eskema eta markatu angelu zuzena; 2) identifikatu hipotenusa (angelu zuzenaren aurkakoa); 3) jarri unitate berean datu guztiak; 4) aplikatu teorema eta egiaztatu emaitza zentzuzkoa dela.',
            'En muchos problemas el triángulo rectángulo aparece al dibujar la situación. En una escalera apoyada en la pared, la escalera es la hipotenusa y los catetos son la pared y el suelo. En la distancia entre las azoteas de dos edificios, la diferencia de alturas es un cateto. Las «pulgadas» de un televisor son la diagonal de la pantalla. Pasos: 1) dibuja un esquema y marca el ángulo recto; 2) identifica la hipotenusa (la opuesta al ángulo recto); 3) pon todos los datos en la misma unidad; 4) aplica el teorema y comprueba que el resultado es razonable.',
            'في كثير من المسائل يظهر المثلث القائم عند رسم الموقف. في سلّم مستند إلى جدار يكون السلّم الوتر والضلعان القائمان الجدار والأرض. وفي المسافة بين سطحي بنايتين يكون فرق الارتفاعين ضلعًا قائمًا. و«بوصات» التلفاز هي قطر الشاشة. الخطوات: 1) ارسم مخططًا وحدّد الزاوية القائمة؛ 2) حدّد الوتر (المقابل للزاوية القائمة)؛ 3) ضع جميع المعطيات بالوحدة نفسها؛ 4) طبّق المبرهنة وتحقق من أن النتيجة معقولة.'
        ),
        problem: say('2,5 m-ko eskailera bat hormaren kontra dago, eta oina hormatik 0,7 m-ra. Zer altueratan ukitzen du horma?', 'Una escalera de 2,5 m está apoyada en la pared con el pie a 0,7 m de ella. ¿A qué altura toca la pared?', 'سلّم طوله 2.5 م مستند إلى جدار وقاعدته على بعد 0.7 م منه. على أي ارتفاع يلمس الجدار؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Eskailera hipotenusa da.', 'La escalera es la hipotenusa.', 'السلّم هو الوتر.'), math: same('$2{,}5^{2}-0{,}7^{2}=5{,}76$') },
            { text: say('Atera erroa.', 'Saca la raíz.', 'استخرج الجذر.'), math: same('$\\sqrt{5{,}76}=2{,}4$') },
            { text: say('2,4 m-ko altueran ukitzen du.', 'Toca la pared a 2,4 m de altura.', 'يلمس الجدار على ارتفاع 2.4 م.') }
        ],
        example: same('$2{,}5^{2}=x^{2}+0{,}7^{2}$'),
        takeaway: say('Marraztu, markatu angelu zuzena eta bilatu hipotenusa: angelu zuzenaren aurrean dago.', 'Dibuja, marca el ángulo recto y busca la hipotenusa: está enfrente del ángulo recto.', 'ارسم وحدّد الزاوية القائمة وابحث عن الوتر: إنه مقابل الزاوية القائمة.'),
        figure: (language) => <LadderFigure language={language} />
    },

    /* ---------- 3. Areas of plane figures ---------- */
    {
        id: 'polygon-areas',
        stage: 'plane-areas',
        title: say('Poligonoen azalerak', 'Áreas de polígonos', 'مساحات المضلعات'),
        goal: say('Triangeluaren, laukien, trapezioaren eta poligono erregularren azalerak kalkulatzea.', 'Calcular el área del triángulo, los cuadriláteros, el trapecio y los polígonos regulares.', 'حساب مساحة المثلث والرباعيات وشبه المنحرف والمضلعات المنتظمة.'),
        explanation: say(
            'Azalera irudi batek hartzen duen gainazala da, eta unitate karratuetan neurtzen da (cm², m²…). Laukizuzena: $A=b\\cdot h$; karratua: $A=l^{2}$; paralelogramoa (erronboidea): $A=b\\cdot h$. Triangelua paralelogramo baten erdia da: $A=\\dfrac{b\\cdot h}{2}$. Erronboa bi diagonalek osatutako laukizuzenaren erdia da: $A=\\dfrac{D\\cdot d}{2}$. Trapezioa: $A=\\dfrac{(B+b)\\cdot h}{2}$. Poligono erregular bat $n$ triangelu berdinetan banatzen da, eta haien altuera apotema da: $A=\\dfrac{P\\cdot a}{2}$. Kontuz unitateekin: datu guztiak unitate berean jarri behar dira.',
            'El área es la superficie que ocupa una figura y se mide en unidades cuadradas (cm², m²…). Rectángulo: $A=b\\cdot h$; cuadrado: $A=l^{2}$; paralelogramo (romboide): $A=b\\cdot h$. El triángulo es la mitad de un paralelogramo: $A=\\dfrac{b\\cdot h}{2}$. El rombo es la mitad del rectángulo que forman sus diagonales: $A=\\dfrac{D\\cdot d}{2}$. Trapecio: $A=\\dfrac{(B+b)\\cdot h}{2}$. Un polígono regular se divide en $n$ triángulos iguales cuya altura es la apotema: $A=\\dfrac{P\\cdot a}{2}$. Cuidado con las unidades: todos los datos en la misma unidad.',
            'المساحة هي السطح الذي يشغله الشكل، وتقاس بالوحدات المربعة (سم²، م²…). المستطيل: $A=b\\cdot h$؛ المربع: $A=l^{2}$؛ متوازي الأضلاع: $A=b\\cdot h$. المثلث نصف متوازي أضلاع: $A=\\dfrac{b\\cdot h}{2}$. المعيّن نصف المستطيل الذي يكوّنه قطراه: $A=\\dfrac{D\\cdot d}{2}$. شبه المنحرف: $A=\\dfrac{(B+b)\\cdot h}{2}$. ويقسم المضلع المنتظم إلى $n$ مثلثات متطابقة ارتفاعها العامد: $A=\\dfrac{P\\cdot a}{2}$. انتبه إلى الوحدات: جميع المعطيات بالوحدة نفسها.'
        ),
        problem: say('Heptagono erregular baten aldeak 5 cm neurtzen ditu eta apotemak 5,2 cm. Kalkulatu azalera.', 'Un heptágono regular tiene 5 cm de lado y 5,2 cm de apotema. Calcula su área.', 'مضلع سباعي منتظم طول ضلعه 5 سم وعامده 5.2 سم. احسب مساحته.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Perimetroa.', 'Perímetro.', 'المحيط.'), math: same('$P=7\\cdot 5=35$') },
            { text: say('Perimetroa bider apotema zati bi.', 'Perímetro por apotema entre dos.', 'المحيط في العامد على اثنين.'), math: same('$\\dfrac{35\\cdot 5{,}2}{2}=91$') },
            { text: say('Azalera: 91 cm².', 'Área: 91 cm².', 'المساحة: 91 سم².') }
        ],
        example: same('$A=\\dfrac{P\\cdot a}{2}$'),
        takeaway: say('Triangelua eta erronboa: erdia. Trapezioa: oinarrien batezbestekoa bider altuera. Erregularra: perimetroa bider apotema zati bi.', 'Triángulo y rombo: la mitad. Trapecio: media de las bases por la altura. Regular: perímetro por apotema entre dos.', 'المثلث والمعيّن: النصف. شبه المنحرف: متوسط القاعدتين في الارتفاع. المنتظم: المحيط في العامد على اثنين.'),
        figure: (language) => <PolygonAreasFigure language={language} />
    },
    {
        id: 'circle-areas',
        stage: 'plane-areas',
        title: say('Zirkulua, sektorea eta koroa', 'Círculo, sector y corona', 'القرص والقطاع والحلقة'),
        goal: say('Zirkuluaren, sektore zirkularraren eta koroa zirkularraren azalerak kalkulatzea.', 'Calcular el área del círculo, del sector circular y de la corona circular.', 'حساب مساحة القرص والقطاع الدائري والحلقة الدائرية.'),
        explanation: say(
            'Zirkuluaren azalera $A=\\pi r^{2}$ da. Sektore zirkularra bi erradiok eta arku batek mugatutako zirkulu-zatia da: $n°$-ko sektorearen azalera $\\dfrac{\\pi r^{2}\\cdot n}{360}$ da, hau da, zirkuluaren zati proportzionala. Koroa zirkularra zentro bereko bi zirkunferentziek mugatzen dute: handiaren azalerari txikiarena kentzen zaio, $A=\\pi (R^{2}-r^{2})$. Azalera ezagututa erradioa kalkula daiteke: zatitu $\\pi$-z eta atera erro karratua. Kontuz: diametroa ematen badute, erdia hartu.',
            'El área del círculo es $A=\\pi r^{2}$. Un sector circular es la parte del círculo limitada por dos radios y un arco: el área de un sector de $n°$ es $\\dfrac{\\pi r^{2}\\cdot n}{360}$, es decir, la parte proporcional del círculo. La corona circular está limitada por dos circunferencias con el mismo centro: al área del grande se le resta la del pequeño, $A=\\pi (R^{2}-r^{2})$. Conociendo el área se puede calcular el radio: divide entre $\\pi$ y saca la raíz cuadrada. Cuidado: si dan el diámetro, toma la mitad.',
            'مساحة القرص $A=\\pi r^{2}$. القطاع الدائري جزء القرص المحدود بنصفي قطر وقوس: مساحة قطاع قياسه $n°$ هي $\\dfrac{\\pi r^{2}\\cdot n}{360}$، أي الجزء المتناسب من القرص. والحلقة الدائرية تحدّها دائرتان لهما المركز نفسه: نطرح مساحة الصغرى من مساحة الكبرى، $A=\\pi (R^{2}-r^{2})$. وبمعرفة المساحة يمكن حساب نصف القطر: اقسم على $\\pi$ واستخرج الجذر التربيعي. انتبه: إذا أُعطي القطر فخذ نصفه.'
        ),
        problem: say('Lorategi zirkular batek 65 m-ko erradioa du, eta inguruan 15 m-ko zabalerako bide bat du barrualdetik. Kalkulatu bidearen azalera.', 'Un jardín circular tiene 65 m de radio y, por dentro del borde, un camino de 15 m de ancho. Calcula el área del camino.', 'حديقة دائرية نصف قطرها 65 م، وعلى حافتها من الداخل ممر عرضه 15 م. احسب مساحة الممر.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Barruko erradioa.', 'Radio interior.', 'نصف القطر الداخلي.'), math: same('$65-15=50$') },
            { text: say('Koroa: handia ken txikia.', 'Corona: el grande menos el pequeño.', 'الحلقة: الكبرى ناقص الصغرى.'), math: same('$3{,}14\\cdot (65^{2}-50^{2})=5416{,}5$') },
            { text: say('Bidea: 5416,5 m².', 'Camino: 5416,5 m².', 'الممر: 5416.5 م².') }
        ],
        example: same('$A=\\pi r^{2}$'),
        takeaway: say('Zirkulua: πr². Sektorea: zirkulua bider angelua zati 360. Koroa: handia ken txikia.', 'Círculo: πr². Sector: el círculo por el ángulo entre 360. Corona: el grande menos el pequeño.', 'القرص: πr². القطاع: القرص في الزاوية على 360. الحلقة: الكبرى ناقص الصغرى.'),
        figure: (language) => <SectorRingFigure language={language} />
    },
    {
        id: 'composite',
        stage: 'plane-areas',
        title: say('Irudi konposatuak', 'Figuras compuestas', 'الأشكال المركّبة'),
        goal: say('Irudi konposatuen eta itzaleztatutako eskualdeen azalera zatitan banatuz edo kenduz kalkulatzea.', 'Calcular el área de figuras compuestas y de regiones sombreadas descomponiendo o restando.', 'حساب مساحة الأشكال المركّبة والمناطق المظلّلة بالتجزئة أو الطرح.'),
        explanation: say(
            'Irudi konposatu baten azalera kalkulatzeko, bi bide daude. Batu: irudia azalera ezaguneko zatitan banatu (laukizuzenak, triangeluak, zirkulu-erdiak…) eta haien azalerak batu. Kendu: irudia irudi handiago bat bezala ikusi, eta kanpoan geratzen diren zatiak kendu. Itzaleztatutako eskualdeetan bigarren bidea erabiltzen da askotan: karratu baten barruan zirkulu bat badago, izkinen azalera karratua ken zirkulua da. Perimetroa ere eska dezakete: orduan ingurua bakarrik zenbatzen da, barruko marrak ez.',
            'Para calcular el área de una figura compuesta hay dos caminos. Sumar: descomponer la figura en partes de área conocida (rectángulos, triángulos, semicírculos…) y sumar sus áreas. Restar: ver la figura como una figura mayor y quitarle las partes que sobran. En las regiones sombreadas se usa mucho el segundo camino: si dentro de un cuadrado hay un círculo, el área de las esquinas es el cuadrado menos el círculo. También pueden pedir el perímetro: entonces solo se cuenta el contorno, no las líneas interiores.',
            'لحساب مساحة شكل مركّب طريقان. الجمع: جزّئ الشكل إلى أجزاء معروفة المساحة (مستطيلات ومثلثات وأنصاف أقراص…) واجمع مساحاتها. الطرح: انظر إلى الشكل كأنه شكل أكبر واطرح الأجزاء الزائدة. وفي المناطق المظلّلة يُستعمل الطريق الثاني كثيرًا: إذا كان داخل مربع قرص فمساحة الزوايا هي المربع ناقص القرص. وقد يُطلب المحيط أيضًا: وحينها يُعدّ الإطار الخارجي فقط لا الخطوط الداخلية.'
        ),
        problem: say('Leiho bat 4 dm zabal eta 3 dm altuko laukizuzena da, eta gainean zirkulu-erdi bat du. Zenbat beira behar da?', 'Una ventana es un rectángulo de 4 dm de ancho y 3 dm de alto con un semicírculo encima. ¿Cuánto cristal hace falta?', 'نافذة مستطيل عرضه 4 دسم وارتفاعه 3 دسم وفوقه نصف قرص. كم يلزم من الزجاج؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Laukizuzena.', 'Rectángulo.', 'المستطيل.'), math: same('$4\\cdot 3=12$') },
            { text: say('Zirkulu-erdia: erradioa 2.', 'Semicírculo: radio 2.', 'نصف القرص: نصف القطر 2.'), math: same('$\\dfrac{3{,}14\\cdot 2^{2}}{2}=6{,}28$') },
            { text: say('Batu: 18,28 dm².', 'Suma: 18,28 dm².', 'اجمع: 18.28 دسم².'), math: same('$12+6{,}28=18{,}28$') }
        ],
        example: same('$4^{2}-3{,}14\\cdot 2^{2}$'),
        takeaway: say('Banatu eta batu, edo osatu eta kendu. Itzaleztatua: handia ken zuria.', 'Descompón y suma, o completa y resta. Sombreado: el grande menos el blanco.', 'جزّئ واجمع، أو أكمل واطرح. المظلّل: الكبير ناقص الأبيض.'),
        figure: (language) => <CompositeAreasFigure language={language} />
    },

    /* ---------- 4. Areas of solids ---------- */
    {
        id: 'prism-area',
        stage: 'solid-areas',
        title: say('Prismaren azalera', 'Área del prisma', 'مساحة المنشور'),
        goal: say('Prismaren garapena erabiliz alboko azalera eta azalera osoa kalkulatzea.', 'Calcular el área lateral y total de un prisma a partir de su desarrollo.', 'حساب المساحة الجانبية والكلية للمنشور من نشره.'),
        explanation: say(
            'Gorputz geometrikoak poliedroak (aurpegi lauak: prismak eta piramideak) eta biraketa-gorputzak (zilindroa, konoa eta esfera) dira. Prisma batek bi oinarri berdin eta paralelo ditu, eta alboko aurpegiak laukizuzenak dira (prisma zuzenean). Garapenean alboko aurpegiek laukizuzen bakarra osatzen dute: oinarria oinarriaren perimetroa da eta altuera prismarena. Horregatik $A_L=P\\cdot h$ eta $A_T=A_L+2A_B$. Kuboan: $A_T=6l^{2}$. Ortoedroan: $A_T=2(ab+ac+bc)$. Oinarria poligono erregularra bada, haren azalera $\\dfrac{P\\cdot a}{2}$ da.',
            'Los cuerpos geométricos son poliedros (caras planas: prismas y pirámides) y cuerpos de revolución (cilindro, cono y esfera). Un prisma tiene dos bases iguales y paralelas, y sus caras laterales son rectángulos (en el prisma recto). En el desarrollo, las caras laterales forman un solo rectángulo: su base es el perímetro de la base y su altura, la del prisma. Por eso $A_L=P\\cdot h$ y $A_T=A_L+2A_B$. En el cubo: $A_T=6l^{2}$. En el ortoedro: $A_T=2(ab+ac+bc)$. Si la base es un polígono regular, su área es $\\dfrac{P\\cdot a}{2}$.',
            'الأجسام الهندسية متعددات أوجه (أوجه مستوية: المناشير والأهرامات) وأجسام دورانية (الأسطوانة والمخروط والكرة). للمنشور قاعدتان متطابقتان ومتوازيتان، وأوجهه الجانبية مستطيلات (في المنشور القائم). في النشر تكوّن الأوجه الجانبية مستطيلًا واحدًا: قاعدته محيط القاعدة وارتفاعه ارتفاع المنشور. لذلك $A_L=P\\cdot h$ و$A_T=A_L+2A_B$. في المكعب: $A_T=6l^{2}$. وفي متوازي المستطيلات: $A_T=2(ab+ac+bc)$. وإذا كانت القاعدة مضلعًا منتظمًا فمساحتها $\\dfrac{P\\cdot a}{2}$.'
        ),
        problem: say('Prisma hexagonal erregular baten oinarriak 3 cm-ko aldea eta 2,6 cm-ko apotema ditu, eta altuera 7 cm da. Kalkulatu azalera osoa.', 'Un prisma hexagonal regular tiene una base de 3 cm de lado y 2,6 cm de apotema, y 7 cm de altura. Calcula su área total.', 'منشور سداسي منتظم ضلع قاعدته 3 سم وعامدها 2.6 سم وارتفاعه 7 سم. احسب مساحته الكلية.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Alboko azalera: 6 laukizuzen.', 'Área lateral: 6 rectángulos.', 'المساحة الجانبية: 6 مستطيلات.'), math: same('$6\\cdot 3\\cdot 7=126$') },
            { text: say('Oinarri bat.', 'Una base.', 'قاعدة واحدة.'), math: same('$\\dfrac{18\\cdot 2{,}6}{2}=23{,}4$') },
            { text: say('Guztira, bi oinarri: 172,8 cm².', 'Total, con dos bases: 172,8 cm².', 'المجموع بقاعدتين: 172.8 سم².'), math: same('$126+2\\cdot 23{,}4=172{,}8$') }
        ],
        example: same('$A_L=P\\cdot h$'),
        takeaway: say('Prisma: perimetroa bider altuera, gehi bi oinarri.', 'Prisma: perímetro por altura, más las dos bases.', 'المنشور: المحيط في الارتفاع، مع القاعدتين.'),
        figure: (language) => <PrismAreaFigure language={language} />
    },
    {
        id: 'pyramid-area',
        stage: 'solid-areas',
        title: say('Piramidearen azalera', 'Área de la pirámide', 'مساحة الهرم'),
        goal: say('Piramide erregular baten azalera kalkulatzea, apotema Pitagorasekin aurkituz behar denean.', 'Calcular el área de una pirámide regular, hallando la apotema con Pitágoras cuando haga falta.', 'حساب مساحة الهرم المنتظم مع إيجاد العامد بفيثاغورس عند الحاجة.'),
        explanation: say(
            'Piramide batek oinarri bakarra du, eta alboko aurpegiak erpin batean elkartzen diren triangeluak dira. Piramide erregularrean triangelu horiek isoszeleak eta berdinak dira, eta haien altuera piramidearen apotema da ($a_p$). Alboko azalera: $A_L=\\dfrac{P\\cdot a_p}{2}$; azalera osoa: $A_T=A_L+A_B$. Ez nahastu piramidearen altuera ($h$) eta apotema: apotema hipotenusa da, eta katetoak altuera eta oinarriaren apotema (oinarri karratuan, aldearen erdia): $a_p=\\sqrt{h^{2}+(l/2)^{2}}$.',
            'Una pirámide tiene una sola base, y sus caras laterales son triángulos que se juntan en un vértice. En la pirámide regular esos triángulos son isósceles e iguales, y su altura es la apotema de la pirámide ($a_p$). Área lateral: $A_L=\\dfrac{P\\cdot a_p}{2}$; área total: $A_T=A_L+A_B$. No confundas la altura de la pirámide ($h$) con la apotema: la apotema es la hipotenusa y los catetos son la altura y la apotema de la base (en una base cuadrada, medio lado): $a_p=\\sqrt{h^{2}+(l/2)^{2}}$.',
            'للهرم قاعدة واحدة، وأوجهه الجانبية مثلثات تلتقي في رأس. في الهرم المنتظم تكون هذه المثلثات متساوية الساقين ومتطابقة، وارتفاعها عامد الهرم ($a_p$). المساحة الجانبية: $A_L=\\dfrac{P\\cdot a_p}{2}$؛ والمساحة الكلية: $A_T=A_L+A_B$. لا تخلط بين ارتفاع الهرم ($h$) وعامده: العامد هو الوتر، والضلعان القائمان هما الارتفاع وعامد القاعدة (في القاعدة المربعة نصف الضلع): $a_p=\\sqrt{h^{2}+(l/2)^{2}}$.'
        ),
        problem: say('Piramide erregular baten oinarria 10 cm-ko aldeko karratua da eta altuera 12 cm. Kalkulatu azalera osoa.', 'La base de una pirámide regular es un cuadrado de 10 cm de lado y su altura mide 12 cm. Calcula su área total.', 'قاعدة هرم منتظم مربع طول ضلعه 10 سم وارتفاعه 12 سم. احسب مساحته الكلية.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Apotema: altuera eta aldearen erdia katetoak.', 'Apotema: la altura y medio lado son los catetos.', 'العامد: الارتفاع ونصف الضلع هما الضلعان القائمان.'), math: same('$\\sqrt{12^{2}+5^{2}}=13$') },
            { text: say('Lau triangelu.', 'Cuatro triángulos.', 'أربعة مثلثات.'), math: same('$\\dfrac{40\\cdot 13}{2}=260$') },
            { text: say('Gehitu oinarria: 360 cm².', 'Suma la base: 360 cm².', 'أضف القاعدة: 360 سم².'), math: same('$260+100=360$') }
        ],
        example: same('$A_L=\\dfrac{P\\cdot a_p}{2}$'),
        takeaway: say('Piramidea: perimetroa bider apotema zati bi, gehi oinarria. Apotema ≠ altuera.', 'Pirámide: perímetro por apotema entre dos, más la base. Apotema ≠ altura.', 'الهرم: المحيط في العامد على اثنين، مع القاعدة. العامد ≠ الارتفاع.'),
        figure: (language) => <PyramidAreaFigure language={language} />
    },
    {
        id: 'round-area',
        stage: 'solid-areas',
        title: say('Zilindroa, konoa eta esfera', 'Cilindro, cono y esfera', 'الأسطوانة والمخروط والكرة'),
        goal: say('Biraketa-gorputzen azalerak kalkulatzea: zilindroa, konoa eta esfera.', 'Calcular las áreas de los cuerpos de revolución: cilindro, cono y esfera.', 'حساب مساحات الأجسام الدورانية: الأسطوانة والمخروط والكرة.'),
        explanation: say(
            'Zilindroaren garapena laukizuzen bat eta bi zirkulu dira; laukizuzenaren oinarria zirkunferentzia da: $A_L=2\\pi r h$ eta $A_T=2\\pi r(h+r)$. Konoaren garapena sektore zirkular bat eta zirkulu bat dira; sektorearen erradioa sortzailea da ($g$): $A_L=\\pi r g$ eta $A_T=\\pi r(g+r)$. Sortzailea, altuera eta erradioa triangelu angeluzuzen bat dira: $g=\\sqrt{h^{2}+r^{2}}$. Esfera ezin da garatu, baina haren azalera lau zirkulu handi da: $A=4\\pi r^{2}$. Ontzi irekietan (estalkirik gabe), kendu oinarri bat.',
            'El desarrollo del cilindro es un rectángulo y dos círculos; la base del rectángulo es la circunferencia: $A_L=2\\pi r h$ y $A_T=2\\pi r(h+r)$. El desarrollo del cono es un sector circular y un círculo; el radio del sector es la generatriz ($g$): $A_L=\\pi r g$ y $A_T=\\pi r(g+r)$. La generatriz, la altura y el radio forman un triángulo rectángulo: $g=\\sqrt{h^{2}+r^{2}}$. La esfera no se puede desarrollar, pero su área es cuatro círculos máximos: $A=4\\pi r^{2}$. En recipientes abiertos (sin tapa), quita una base.',
            'نشر الأسطوانة مستطيل ودائرتان؛ وقاعدة المستطيل محيط الدائرة: $A_L=2\\pi r h$ و$A_T=2\\pi r(h+r)$. ونشر المخروط قطاع دائري ودائرة؛ ونصف قطر القطاع هو الراسم ($g$): $A_L=\\pi r g$ و$A_T=\\pi r(g+r)$. يكوّن الراسم والارتفاع ونصف القطر مثلثًا قائمًا: $g=\\sqrt{h^{2}+r^{2}}$. ولا يمكن نشر الكرة، لكن مساحتها أربع دوائر عظمى: $A=4\\pi r^{2}$. وفي الأوعية المفتوحة (بلا غطاء) احذف قاعدة.'
        ),
        problem: say('Kono batek 10 cm-ko erradioa eta 20 cm-ko sortzailea ditu. Kalkulatu azalera osoa.', 'Un cono tiene 10 cm de radio y 20 cm de generatriz. Calcula su área total.', 'مخروط نصف قطره 10 سم وراسمه 20 سم. احسب مساحته الكلية.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Alboko azalera.', 'Área lateral.', 'المساحة الجانبية.'), math: same('$3{,}14\\cdot 10\\cdot 20=628$') },
            { text: say('Oinarria.', 'Base.', 'القاعدة.'), math: same('$3{,}14\\cdot 10^{2}=314$') },
            { text: say('Guztira: 942 cm².', 'Total: 942 cm².', 'المجموع: 942 سم².'), math: same('$628+314=942$') }
        ],
        example: same('$A_L=\\pi r g$'),
        takeaway: say('Zilindroa: 2πrh. Konoa: πrg. Esfera: 4πr². Gero gehitu oinarriak.', 'Cilindro: 2πrh. Cono: πrg. Esfera: 4πr². Luego suma las bases.', 'الأسطوانة: 2πrh. المخروط: πrg. الكرة: 4πr². ثم أضف القواعد.'),
        figure: (language) => <ConeFigure language={language} />
    },

    /* ---------- 5. Volumes ---------- */
    {
        id: 'prism-volume',
        stage: 'volumes',
        title: say('Prismaren eta zilindroaren bolumena', 'Volumen del prisma y del cilindro', 'حجم المنشور والأسطوانة'),
        goal: say('Prismen eta zilindroen bolumena kalkulatzea eta litrotan adieraztea.', 'Calcular el volumen de prismas y cilindros y expresarlo en litros.', 'حساب حجم المناشير والأسطوانات والتعبير عنه باللترات.'),
        explanation: say(
            'Gorputz baten bolumena hartzen duen espazioa da, eta unitate kubikoetan neurtzen da (cm³, m³…). Prismak eta zilindroak sekzio berdina dute behetik gora; horregatik bolumena oinarriaren azalera bider altuera da: $V=A_B\\cdot h$. Ortoedroan $V=a\\cdot b\\cdot c$, kuboan $V=l^{3}$, eta zilindroan $V=\\pi r^{2}h$. Edukiera litrotan neurtzen da: $1\\ \\text{dm}^{3}=1\\ \\text{L}$, $1\\ \\text{m}^{3}=1000\\ \\text{L}$ eta $1\\ \\text{cm}^{3}=1\\ \\text{mL}$. Bolumen-unitateetan maila bakoitza 1000 da.',
            'El volumen de un cuerpo es el espacio que ocupa y se mide en unidades cúbicas (cm³, m³…). Los prismas y los cilindros tienen la misma sección de abajo arriba; por eso su volumen es el área de la base por la altura: $V=A_B\\cdot h$. En el ortoedro, $V=a\\cdot b\\cdot c$; en el cubo, $V=l^{3}$; y en el cilindro, $V=\\pi r^{2}h$. La capacidad se mide en litros: $1\\ \\text{dm}^{3}=1\\ \\text{L}$, $1\\ \\text{m}^{3}=1000\\ \\text{L}$ y $1\\ \\text{cm}^{3}=1\\ \\text{mL}$. En las unidades de volumen cada escalón es 1000.',
            'حجم الجسم هو الحيز الذي يشغله، ويقاس بالوحدات المكعبة (سم³، م³…). للمناشير والأسطوانات المقطع نفسه من الأسفل إلى الأعلى؛ لذلك حجمها مساحة القاعدة في الارتفاع: $V=A_B\\cdot h$. في متوازي المستطيلات $V=a\\cdot b\\cdot c$، وفي المكعب $V=l^{3}$، وفي الأسطوانة $V=\\pi r^{2}h$. وتقاس السعة باللتر: $1\\ \\text{dm}^{3}=1\\ \\text{L}$ و$1\\ \\text{m}^{3}=1000\\ \\text{L}$ و$1\\ \\text{cm}^{3}=1\\ \\text{mL}$. وفي وحدات الحجم كل درجة 1000.'
        ),
        problem: say('Igerileku batek 12 m luze, 5,6 m zabal eta 2 m sakon ditu. Ur m³-ak 0,80 € balio badu, zenbat kostatuko da betetzea?', 'Una piscina mide 12 m de largo, 5,6 m de ancho y 2 m de profundidad. Si el m³ de agua cuesta 0,80 €, ¿cuánto costará llenarla?', 'مسبح طوله 12 م وعرضه 5.6 م وعمقه 2 م. إذا كان المتر المكعب من الماء بـ 0.80 €، فكم يكلّف ملؤه؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bolumena.', 'Volumen.', 'الحجم.'), math: same('$12\\cdot 5{,}6\\cdot 2=134{,}4$') },
            { text: say('Kostua.', 'Coste.', 'التكلفة.'), math: same('$134{,}4\\cdot 0{,}8=107{,}52$') },
            { text: say('107,52 € kostatuko da.', 'Costará 107,52 €.', 'سيكلّف 107.52 €.') }
        ],
        example: same('$V=A_B\\cdot h$'),
        takeaway: say('Prisma eta zilindroa: oinarria bider altuera. 1 dm³ = 1 L eta 1 m³ = 1000 L.', 'Prisma y cilindro: base por altura. 1 dm³ = 1 L y 1 m³ = 1000 L.', 'المنشور والأسطوانة: القاعدة في الارتفاع. 1 dm³ = 1 L و1 m³ = 1000 L.'),
        figure: (language) => <PrismVolumeFigure language={language} />
    },
    {
        id: 'pyramid-volume',
        stage: 'volumes',
        title: say('Piramidearen eta konoaren bolumena', 'Volumen de la pirámide y del cono', 'حجم الهرم والمخروط'),
        goal: say('Piramideen eta konoen bolumena kalkulatzea, prisma edo zilindroaren herena dela jakinda.', 'Calcular el volumen de pirámides y conos sabiendo que es un tercio del prisma o del cilindro.', 'حساب حجم الأهرامات والمخاريط بمعرفة أنه ثلث المنشور أو الأسطوانة.'),
        explanation: say(
            'Oinarri eta altuera bereko piramide bat eta prisma bat hartzen baditugu, piramidearekin hiru aldiz bete behar da prisma. Horregatik piramidearen bolumena prismaren herena da: $V=\\dfrac{A_B\\cdot h}{3}$. Gauza bera gertatzen da konoarekin eta zilindroarekin: $V=\\dfrac{\\pi r^{2}h}{3}$. Kontuz: formulan altuera ($h$) doa, ez apotema edo sortzailea. Sortzailea ematen badute, kalkulatu altuera Pitagorasekin: $h=\\sqrt{g^{2}-r^{2}}$.',
            'Si tomamos una pirámide y un prisma con la misma base y la misma altura, hay que llenar el prisma tres veces con la pirámide. Por eso el volumen de la pirámide es un tercio del del prisma: $V=\\dfrac{A_B\\cdot h}{3}$. Lo mismo pasa con el cono y el cilindro: $V=\\dfrac{\\pi r^{2}h}{3}$. Cuidado: en la fórmula va la altura ($h$), no la apotema ni la generatriz. Si dan la generatriz, calcula la altura con Pitágoras: $h=\\sqrt{g^{2}-r^{2}}$.',
            'إذا أخذنا هرمًا ومنشورًا لهما القاعدة نفسها والارتفاع نفسه، فيجب ملء المنشور ثلاث مرات بالهرم. لذلك حجم الهرم ثلث حجم المنشور: $V=\\dfrac{A_B\\cdot h}{3}$. والأمر نفسه في المخروط والأسطوانة: $V=\\dfrac{\\pi r^{2}h}{3}$. انتبه: في الصيغة الارتفاع ($h$) لا العامد ولا الراسم. وإذا أُعطي الراسم فاحسب الارتفاع بفيثاغورس: $h=\\sqrt{g^{2}-r^{2}}$.'
        ),
        problem: say('Kono batek 3 cm-ko erradioa eta 12 cm-ko altuera ditu. Zenbat mL sartzen dira?', 'Un cono tiene 3 cm de radio y 12 cm de altura. ¿Cuántos mL caben?', 'مخروط نصف قطره 3 سم وارتفاعه 12 سم. كم مليلترًا يسع؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Oinarria.', 'Base.', 'القاعدة.'), math: same('$3{,}14\\cdot 3^{2}=28{,}26$') },
            { text: say('Bider altuera, zati 3.', 'Por la altura, entre 3.', 'في الارتفاع، على 3.'), math: same('$\\dfrac{28{,}26\\cdot 12}{3}=113{,}04$') },
            { text: say('113,04 cm³ = 113,04 mL.', '113,04 cm³ = 113,04 mL.', '113.04 سم³ = 113.04 مل.') }
        ],
        example: same('$V=\\dfrac{A_B\\cdot h}{3}$'),
        takeaway: say('Piramidea eta konoa: oinarria bider altuera, zati 3.', 'Pirámide y cono: base por altura, entre 3.', 'الهرم والمخروط: القاعدة في الارتفاع، على 3.'),
        figure: (language) => <PyramidVolumeFigure language={language} />
    },
    {
        id: 'compound',
        stage: 'volumes',
        title: say('Esfera eta gorputz konposatuak', 'Esfera y cuerpos compuestos', 'الكرة والأجسام المركّبة'),
        goal: say('Esferaren bolumena kalkulatzea eta gorputz konposatuen bolumena zatien bolumenak batuz edo kenduz aurkitzea.', 'Calcular el volumen de la esfera y hallar el de cuerpos compuestos sumando o restando volúmenes.', 'حساب حجم الكرة وإيجاد حجم الأجسام المركّبة بجمع الحجوم أو طرحها.'),
        explanation: say(
            'Esferaren bolumena $V=\\dfrac{4}{3}\\pi r^{3}$ da; esfera-erdiarena, erdia: $\\dfrac{2}{3}\\pi r^{3}$. Benetako objektu asko gorputz ezagunez osatuta daude: izozki-kono bat konoa gehi esfera-erdia da; silo bat zilindroa gehi bi esfera-erdi; teilatu konikoko dorre bat zilindroa gehi konoa. Bolumena kalkulatzeko, banatu zatitan eta batu haien bolumenak. Hutsuneak badaude (zilindro baten barruan kono bat, zulo bat…), kendu. Azken urratsa: adierazi emaitza eskatzen duten unitatean, adibidez litrotan.',
            'El volumen de la esfera es $V=\\dfrac{4}{3}\\pi r^{3}$; el de la semiesfera, la mitad: $\\dfrac{2}{3}\\pi r^{3}$. Muchos objetos reales están formados por cuerpos conocidos: un cucurucho es un cono más una semiesfera; un silo, un cilindro más dos semiesferas; una torre con tejado cónico, un cilindro más un cono. Para calcular el volumen, descompón en partes y suma sus volúmenes. Si hay huecos (un cono dentro de un cilindro, un agujero…), réstalos. Último paso: expresa el resultado en la unidad que piden, por ejemplo en litros.',
            'حجم الكرة $V=\\dfrac{4}{3}\\pi r^{3}$؛ وحجم نصف الكرة نصفه: $\\dfrac{2}{3}\\pi r^{3}$. كثير من الأشياء الحقيقية مكوّنة من أجسام معروفة: المثلّجة مخروط زائد نصف كرة؛ والصومعة أسطوانة زائد نصفي كرة؛ والبرج ذو السقف المخروطي أسطوانة زائد مخروط. لحساب الحجم جزّئ إلى أجزاء واجمع حجومها. وإذا كانت هناك فراغات (مخروط داخل أسطوانة، ثقب…) فاطرحها. الخطوة الأخيرة: عبّر عن النتيجة بالوحدة المطلوبة، مثلًا باللترات.'
        ),
        problem: say('Izozki-kono batek 3 cm-ko erradioa eta 12 cm-ko altuera ditu, eta gainean esfera-erdi bat. Zenbat izozki dauka?', 'Un cucurucho tiene 3 cm de radio y 12 cm de altura, con una semiesfera de helado encima. ¿Cuánto helado contiene?', 'مخروط مثلّجة نصف قطره 3 سم وارتفاعه 12 سم وفوقه نصف كرة. كم فيه من المثلّجات؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Konoa.', 'Cono.', 'المخروط.'), math: same('$\\dfrac{3{,}14\\cdot 9\\cdot 12}{3}=113{,}04$') },
            { text: say('Esfera-erdia.', 'Semiesfera.', 'نصف الكرة.'), math: same('$\\dfrac{2\\cdot 3{,}14\\cdot 27}{3}=56{,}52$') },
            { text: say('Batu: 169,56 cm³ = 169,56 mL.', 'Suma: 169,56 cm³ = 169,56 mL.', 'اجمع: 169.56 سم³ = 169.56 مل.'), math: same('$113{,}04+56{,}52=169{,}56$') }
        ],
        example: same('$V=\\dfrac{4}{3}\\pi r^{3}$'),
        takeaway: say('Esfera: 4πr³ zati 3. Gorputz konposatuak: banatu, kalkulatu eta batu edo kendu.', 'Esfera: 4πr³ entre 3. Cuerpos compuestos: descompón, calcula y suma o resta.', 'الكرة: 4πr³ على 3. الأجسام المركّبة: جزّئ واحسب واجمع أو اطرح.'),
        figure: (language) => <CompoundSolidFigure language={language} />
    }
]
