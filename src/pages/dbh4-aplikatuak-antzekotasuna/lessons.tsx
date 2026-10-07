import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import {
    CriteriaFigure,
    DivideFigure,
    HomothetyFigure,
    MirrorFigure,
    PlanFigure,
    RatiosFigure,
    ScaleFigure,
    ShadowFigure,
    SightFigure,
    SimilarFiguresFigure,
    ThalesFigure,
    ThalesPositionFigure,
    VolumeRatioFigure
} from './figures'

/* ==========================================================================
   Antzekotasuna · 4. DBH aplikatuak — stages and lessons, following
   Santillana Aplicadas 4, unit 6 (Semejanza. Aplicaciones: Thales and
   dividing segments, similar figures and triangles, homothety, ratios of
   perimeters and areas, scales) and the similarity part of Anaya Aplicadas
   4, unit 10 (volumes of similar bodies, heights by shadows, mirrors and
   lines of sight).
   ========================================================================== */

export type SimilarityStageId = 'thales' | 'similarity' | 'ratios' | 'scales' | 'heights'

export const similarityStages: UnitStage[] = [
    { id: 'thales', tone: 'blue', title: { eu: 'Talesen teorema', es: 'Teorema de Tales', ar: 'مبرهنة طاليس' } },
    { id: 'similarity', tone: 'violet', title: { eu: 'Irudi antzekoak', es: 'Figuras semejantes', ar: 'الأشكال المتشابهة' } },
    { id: 'ratios', tone: 'mustard', title: { eu: 'Perimetroak, azalerak eta bolumenak', es: 'Perímetros, áreas y volúmenes', ar: 'المحيطات والمساحات والحجوم' } },
    { id: 'scales', tone: 'coral', title: { eu: 'Eskalak', es: 'Escalas', ar: 'المقاييس' } },
    { id: 'heights', tone: 'green', title: { eu: 'Altuerak eta distantziak', es: 'Alturas y distancias', ar: 'الارتفاعات والمسافات' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })

export const similarityTopics: UnitTopic[] = [
    /* ---------- 1. Thales ---------- */
    {
        id: 'thales',
        stage: 'thales',
        title: say('Talesen teorema', 'El teorema de Tales', 'مبرهنة طاليس'),
        goal: say('Zuzen paraleloek bi zuzenetan mozten dituzten zuzenki-zatiak proportzionalak direla erabiltzea.', 'Usar que los segmentos que determinan unas rectas paralelas sobre dos rectas son proporcionales.', 'استعمال أن القطع التي تحدّدها مستقيمات متوازية على مستقيمين متناسبة.'),
        explanation: say(
            'Bi zuzen, $r$ eta $s$, zuzen paralelo batzuek mozten badituzte, $r$ zuzenean sortzen diren zuzenki-zatiak eta $s$ zuzenean sortzen direnak proportzionalak dira: $\\dfrac{a}{a\'}=\\dfrac{b}{b\'}$. Hori da Talesen teorema. Proportzio horretan zati bat ezezaguna bada, gurutzeko biderkadurarekin aurkitzen da: $\\dfrac{3}{4}=\\dfrac{4{,}5}{x}$ bada, $3x=4\\cdot 4{,}5$ eta $x=6$. Kontuz zuzenki-zatiak behar bezala parekatzearekin: zuzen bereko bi zatiak zatikiaren goian eta behean, edo parekoak bata bestearen ondoan, baina beti ordena berean.',
            'Si dos rectas $r$ y $s$ son cortadas por varias rectas paralelas, los segmentos que se forman en $r$ y los que se forman en $s$ son proporcionales: $\\dfrac{a}{a\'}=\\dfrac{b}{b\'}$. Es el teorema de Tales. Si en esa proporción un segmento es desconocido, se halla con el producto en cruz: si $\\dfrac{3}{4}=\\dfrac{4{,}5}{x}$, entonces $3x=4\\cdot 4{,}5$ y $x=6$. Cuidado al emparejar los segmentos: los de una misma recta arriba y abajo de la fracción, o los correspondientes uno junto a otro, pero siempre en el mismo orden.',
            'إذا قطعت مستقيمات متوازية مستقيمين $r$ و$s$ فإن القطع المتكوّنة على $r$ والقطع المتكوّنة على $s$ متناسبة: $\\dfrac{a}{a\'}=\\dfrac{b}{b\'}$. هذه مبرهنة طاليس. وإذا كانت قطعة مجهولة في هذا التناسب نجدها بالضرب التبادلي: إذا كان $\\dfrac{3}{4}=\\dfrac{4{,}5}{x}$ فإن $3x=4\\cdot 4{,}5$ و$x=6$. انتبه عند مقابلة القطع: قطع المستقيم نفسه فوق الكسر وتحته، أو القطع المتقابلة جنبًا إلى جنب، لكن دائمًا بالترتيب نفسه.'
        ),
        problem: say('Paraleloek $r$ zuzenean 3 cm eta 3,5 cm-ko zatiak mozten dituzte, eta $s$ zuzenean 4 cm eta x. Kalkulatu x.', 'Unas paralelas cortan en la recta $r$ segmentos de 3 cm y 3,5 cm, y en la recta $s$, de 4 cm y x. Calcula x.', 'تقطع متوازيات على المستقيم $r$ قطعتين 3 سم و3.5 سم، وعلى $s$ قطعتين 4 سم وx. احسب x.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi proportzioa.', 'Escribe la proporción.', 'اكتب التناسب.'), math: same('$\\dfrac{3}{4}=\\dfrac{3{,}5}{x}$') },
            { text: say('Gurutzeko biderkadura.', 'Producto en cruz.', 'الضرب التبادلي.'), math: same('$x=\\dfrac{4\\cdot 3{,}5}{3}\\approx 4{,}67$') }
        ],
        example: same('$\\dfrac{a}{a\'}=\\dfrac{b}{b\'}$'),
        takeaway: say('Paraleloek bi zuzenetan mozten dituzten zatiak proportzionalak dira.', 'Las paralelas cortan dos rectas en segmentos proporcionales.', 'المتوازيات تقطع مستقيمين في قطع متناسبة.'),
        figure: (language) => <ThalesFigure language={language} />
    },
    {
        id: 'divide',
        stage: 'thales',
        title: say('Zuzenki bat zatitzea', 'Dividir un segmento', 'تقسيم قطعة'),
        goal: say('Zuzenki bat zati berdinetan edo zati proportzionaletan banatzea Talesen teorema erabiliz.', 'Dividir un segmento en partes iguales o en partes proporcionales usando el teorema de Tales.', 'تقسيم قطعة إلى أجزاء متساوية أو متناسبة باستعمال مبرهنة طاليس.'),
        explanation: say(
            'Zuzenki bat, AB, $n$ zati berdinetan banatzeko, ez da neurtu behar: A puntutik beste zuzen erdizuzen bat marrazten da, eta haren gainean $n$ zati berdin markatzen dira konpasarekin. Azken marka B-rekin lotzen da, eta beste marketatik lotura horren paraleloak marrazten dira: AB zati berdinetan geratzen da. Zati proportzionaletan banatzeko (adibidez 2, 3 eta 5 neurrien proportzionaletan), erdizuzenean 2, 3 eta 5 luzerak markatzen dira jarraian, eta gauza bera egiten da. Kalkuluz: zatiak $\\dfrac{2}{10}$, $\\dfrac{3}{10}$ eta $\\dfrac{5}{10}$ dira AB-ren.',
            'Para dividir un segmento AB en $n$ partes iguales no hace falta medir: desde A se traza otra semirrecta y sobre ella se marcan con el compás $n$ trozos iguales. Se une la última marca con B y desde las otras marcas se trazan paralelas a esa unión: AB queda dividido en partes iguales. Para dividirlo en partes proporcionales (por ejemplo a 2, 3 y 5), se marcan sobre la semirrecta longitudes 2, 3 y 5 seguidas y se hace lo mismo. Con cuentas: las partes son $\\dfrac{2}{10}$, $\\dfrac{3}{10}$ y $\\dfrac{5}{10}$ de AB.',
            'لتقسيم قطعة AB إلى $n$ أجزاء متساوية لا داعي للقياس: نرسم من A نصف مستقيم آخر ونعلّم عليه بالفرجار $n$ أجزاء متساوية. نصل العلامة الأخيرة بـ B، ونرسم من العلامات الأخرى موازيات لهذا الخط: فتنقسم AB إلى أجزاء متساوية. ولتقسيمها إلى أجزاء متناسبة (مثلًا مع 2 و3 و5) نعلّم على نصف المستقيم أطوالًا 2 و3 و5 متتالية ونفعل الشيء نفسه. وبالحساب: الأجزاء هي $\\dfrac{2}{10}$ و$\\dfrac{3}{10}$ و$\\dfrac{5}{10}$ من AB.'
        ),
        problem: say('Banatu 15 cm-ko zuzenki bat 1, 3 eta 5 zenbakien zati proportzionaletan. Zenbat neurtzen du zati handienak?', 'Divide un segmento de 15 cm en partes proporcionales a 1, 3 y 5. ¿Cuánto mide la parte mayor?', 'قسّم قطعة طولها 15 سم إلى أجزاء متناسبة مع 1 و3 و5. كم طول الجزء الأكبر؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zati guztiak batera.', 'Todas las partes juntas.', 'الأجزاء كلها معًا.'), math: same('$1+3+5=9$') },
            { text: say('Zati handiena: 9tik 5.', 'La parte mayor: 5 de 9.', 'الجزء الأكبر: 5 من 9.'), math: same('$\\dfrac{15\\cdot 5}{9}\\approx 8{,}33$') }
        ],
        example: same('$AB\\mathbin{:}n$'),
        takeaway: say('Marraztu erdizuzen bat, markatu zati berdinak eta marraztu paraleloak.', 'Traza una semirrecta, marca trozos iguales y traza paralelas.', 'ارسم نصف مستقيم وعلّم أجزاء متساوية وارسم متوازيات.'),
        figure: (language) => <DivideFigure language={language} />
    },
    {
        id: 'thales-position',
        stage: 'thales',
        title: say('Triangeluak Tales posizioan', 'Triángulos en posición de Tales', 'مثلثات في وضع طاليس'),
        goal: say('Tales posizioan dauden triangeluak ezagutzea eta haien alde ezezagunak kalkulatzea.', 'Reconocer triángulos en posición de Tales y calcular sus lados desconocidos.', 'التعرّف إلى المثلثات في وضع طاليس وحساب أضلاعها المجهولة.'),
        explanation: say(
            'Bi triangelu Tales posizioan daude angelu bat partekatzen badute eta angelu horren aurkako aldeak paraleloak badira. Triangelu handiaren barruan txiki bat dago, erpin berarekin. Orduan, aldeak proportzionalak dira: $\\dfrac{AB}{AB\'}=\\dfrac{AC}{AC\'}=\\dfrac{BC}{B\'C\'}$. Kontuz: AB aldea osoa da, ez AB-tik B\' -raino dagoen zatia bakarrik. Adibidez, $AB\'=6$ eta $B\'B=6$ badira, $AB=12$ da, eta $B\'C\'=5$ bada, $BC=10$.',
            'Dos triángulos están en posición de Tales si comparten un ángulo y los lados opuestos a ese ángulo son paralelos. Hay un triángulo pequeño dentro del grande, con el mismo vértice. Entonces sus lados son proporcionales: $\\dfrac{AB}{AB\'}=\\dfrac{AC}{AC\'}=\\dfrac{BC}{B\'C\'}$. Cuidado: AB es el lado entero, no solo el trozo que va de B\' a B. Por ejemplo, si $AB\'=6$ y $B\'B=6$, entonces $AB=12$, y si $B\'C\'=5$, $BC=10$.',
            'يكون مثلثان في وضع طاليس إذا اشتركا في زاوية وكان الضلعان المقابلان لها متوازيين. يوجد مثلث صغير داخل الكبير له الرأس نفسه. حينها تكون الأضلاع متناسبة: $\\dfrac{AB}{AB\'}=\\dfrac{AC}{AC\'}=\\dfrac{BC}{B\'C\'}$. انتبه: AB هو الضلع كاملًا لا القطعة من B\' إلى B فقط. مثلًا إذا كان $AB\'=6$ و$B\'B=6$ فإن $AB=12$، وإذا كان $B\'C\'=5$ فإن $BC=10$.'
        ),
        problem: say('Tales posizioan dauden bi triangelutan, $AB\'=4$, $B\'B=6$ eta $B\'C\'=3$. Kalkulatu BC.', 'En dos triángulos en posición de Tales, $AB\'=4$, $B\'B=6$ y $B\'C\'=3$. Calcula BC.', 'في مثلثين في وضع طاليس $AB\'=4$ و$B\'B=6$ و$B\'C\'=3$. احسب BC.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Alde osoa.', 'El lado entero.', 'الضلع كاملًا.'), math: same('$AB=4+6=10$') },
            { text: say('Proportzioa.', 'Proporción.', 'التناسب.'), math: same('$\\dfrac{10}{4}=\\dfrac{BC}{3}$') },
            { text: say('BC = 7,5.', 'BC = 7,5.', 'BC = 7.5.'), math: same('$BC=\\dfrac{10\\cdot 3}{4}=7{,}5$') }
        ],
        example: same('$\\dfrac{AB}{AB\'}=\\dfrac{BC}{B\'C\'}$'),
        takeaway: say('Angelu berbera eta alde paraleloak: aldeak proportzionalak. Erabili alde osoak.', 'Ángulo común y lados paralelos: lados proporcionales. Usa los lados enteros.', 'زاوية مشتركة وضلعان متوازيان: أضلاع متناسبة. استعمل الأضلاع كاملة.'),
        figure: (language) => <ThalesPositionFigure language={language} />
    },

    /* ---------- 2. Similar figures ---------- */
    {
        id: 'similar-figures',
        stage: 'similarity',
        title: say('Irudi antzekoak', 'Figuras semejantes', 'الأشكال المتشابهة'),
        goal: say('Bi irudi antzekoak diren erabakitzea eta antzekotasun-arrazoia kalkulatzea eta erabiltzea.', 'Decidir si dos figuras son semejantes y calcular y usar la razón de semejanza.', 'تقرير ما إذا كان شكلان متشابهين وحساب نسبة التشابه واستعمالها.'),
        explanation: say(
            'Bi irudi antzekoak dira forma bera badute eta tamainaz bakarrik desberdinak badira: haien alde homologoak (parekoak) proportzionalak dira eta angelu homologoak berdinak. Alde homologoen arteko zatidura antzekotasun-arrazoia da, $r$. $r>1$ bada, irudia handitu egin da; $r<1$ bada, txikitu. Bi irudi poligonoak badira, alde guztiak eta angelu guztiak egiaztatu behar dira: laukizuzen guztiek angelu berdinak dituzte, baina ez dira antzekoak aldeak proportzionalak ez badira. Karratu guztiak antzekoak dira, baita zirkulu guztiak eta poligono erregular berdinak ere.',
            'Dos figuras son semejantes si tienen la misma forma y solo se diferencian en el tamaño: sus lados homólogos (correspondientes) son proporcionales y sus ángulos homólogos, iguales. El cociente entre lados homólogos es la razón de semejanza, $r$. Si $r>1$, la figura se ha ampliado; si $r<1$, se ha reducido. En los polígonos hay que comprobar todos los lados y todos los ángulos: todos los rectángulos tienen los ángulos iguales, pero no son semejantes si los lados no son proporcionales. Todos los cuadrados son semejantes, igual que todos los círculos y los polígonos regulares con el mismo número de lados.',
            'يكون شكلان متشابهين إذا كان لهما الشكل نفسه واختلفا في الحجم فقط: أضلاعهما المتناظرة متناسبة وزواياهما المتناظرة متساوية. خارج قسمة الضلعين المتناظرين هو نسبة التشابه $r$. إذا كان $r>1$ فقد كُبّر الشكل؛ وإذا كان $r<1$ فقد صُغّر. وفي المضلعات يجب التحقق من جميع الأضلاع وجميع الزوايا: كل المستطيلات زواياها متساوية، لكنها ليست متشابهة إذا لم تكن أضلاعها متناسبة. وكل المربعات متشابهة، وكذلك كل الدوائر والمضلعات المنتظمة ذات العدد نفسه من الأضلاع.'
        ),
        problem: say('Laukizuzen batek 4 cm eta 8 cm neurtzen ditu; beste batek 4,8 cm eta 9,6 cm. Antzekoak dira? Zein da arrazoia?', 'Un rectángulo mide 4 cm por 8 cm y otro 4,8 cm por 9,6 cm. ¿Son semejantes? ¿Cuál es la razón?', 'مستطيل بعداه 4 سم و8 سم وآخر 4.8 سم و9.6 سم. هل هما متشابهان؟ ما النسبة؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Konparatu alde homologoak.', 'Compara los lados homólogos.', 'قارن الأضلاع المتناظرة.'), math: same('$\\dfrac{4{,}8}{4}=1{,}2\\qquad \\dfrac{9{,}6}{8}=1{,}2$') },
            { text: say('Zatidura bera: antzekoak dira, $r=1{,}2$.', 'Mismo cociente: son semejantes, $r=1{,}2$.', 'خارج القسمة نفسه: متشابهان، $r=1{,}2$.') }
        ],
        example: same('$r=\\dfrac{a\'}{a}$'),
        takeaway: say('Antzekoak: angelu berdinak eta alde proportzionalak. Zatidura arrazoia da.', 'Semejantes: ángulos iguales y lados proporcionales. El cociente es la razón.', 'متشابهان: زوايا متساوية وأضلاع متناسبة. خارج القسمة هو النسبة.'),
        figure: (language) => <SimilarFiguresFigure language={language} />
    },
    {
        id: 'criteria',
        stage: 'similarity',
        title: say('Triangeluen irizpideak', 'Criterios de semejanza de triángulos', 'معايير تشابه المثلثات'),
        goal: say('Hiru irizpideetako bat erabiliz bi triangelu antzekoak direla erabakitzea.', 'Decidir con uno de los tres criterios si dos triángulos son semejantes.', 'تقرير تشابه مثلثين بأحد المعايير الثلاثة.'),
        explanation: say(
            'Triangeluetan ez da dena egiaztatu behar; nahikoa da irizpide hauetako bat: 1) bi angelu berdinak dituzte (hirugarrena ere berdina da, angeluek $180°$ batzen baitute); 2) bi alde proportzionalak dituzte eta haien arteko angelua berdina; 3) hiru aldeak proportzionalak dituzte. Hiru aldeak konparatzeko, ordenatu bi triangeluetako aldeak txikienetik handienera eta zatitu binaka: zatidura guztiak berdinak badira, antzekoak dira. Triangelu angeluzuzen bitan, angelu zorrotz bat berdina izatea nahikoa da.',
            'En los triángulos no hace falta comprobarlo todo; basta uno de estos criterios: 1) tienen dos ángulos iguales (el tercero también lo es, porque los ángulos suman $180°$); 2) tienen dos lados proporcionales y el ángulo que forman, igual; 3) tienen los tres lados proporcionales. Para comparar los tres lados, ordena los lados de los dos triángulos de menor a mayor y divide dos a dos: si todos los cocientes son iguales, son semejantes. En dos triángulos rectángulos basta con que un ángulo agudo sea igual.',
            'في المثلثات لا يلزم التحقق من كل شيء؛ يكفي أحد هذه المعايير: 1) لهما زاويتان متساويتان (والثالثة أيضًا لأن مجموع الزوايا $180°$)؛ 2) لهما ضلعان متناسبان والزاوية المحصورة بينهما متساوية؛ 3) أضلاعهما الثلاثة متناسبة. لمقارنة الأضلاع الثلاثة رتّب أضلاع المثلثين من الأصغر إلى الأكبر واقسم مثنى مثنى: إن تساوت كل النسب فهما متشابهان. وفي مثلثين قائمين يكفي تساوي زاوية حادة.'
        ),
        problem: say('Triangelu baten aldeak 10, 12 eta 16 dira, eta beste batenak 12,5, 15 eta 20. Antzekoak dira?', 'Un triángulo tiene lados 10, 12 y 16 y otro 12,5, 15 y 20. ¿Son semejantes?', 'أضلاع مثلث 10 و12 و16 وأضلاع آخر 12.5 و15 و20. هل هما متشابهان؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatitu aldeak ordenan.', 'Divide los lados en orden.', 'اقسم الأضلاع بالترتيب.'), math: same('$\\dfrac{10}{12{,}5}=\\dfrac{12}{15}=\\dfrac{16}{20}=0{,}8$') },
            { text: say('Hiru aldeak proportzionalak: antzekoak dira.', 'Los tres lados proporcionales: son semejantes.', 'الأضلاع الثلاثة متناسبة: متشابهان.') }
        ],
        example: same('$\\dfrac{a}{a\'}=\\dfrac{b}{b\'}=\\dfrac{c}{c\'}$'),
        takeaway: say('Bi angelu berdin; edo bi alde proportzional eta angelua; edo hiru alde proportzional.', 'Dos ángulos iguales; o dos lados proporcionales y el ángulo; o tres lados proporcionales.', 'زاويتان متساويتان؛ أو ضلعان متناسبان والزاوية؛ أو ثلاثة أضلاع متناسبة.'),
        figure: (language) => <CriteriaFigure language={language} />
    },
    {
        id: 'homothety',
        stage: 'similarity',
        title: say('Homotezia', 'Homotecia', 'التحاكي'),
        goal: say('Zentro eta arrazoi bateko homotezia batekin irudi antzekoak marraztea eta kalkulatzea.', 'Dibujar y calcular figuras semejantes con una homotecia de centro y razón dados.', 'رسم أشكال متشابهة وحسابها بتحاكٍ له مركز ونسبة معلومان.'),
        explanation: say(
            'Homotezia irudi antzekoak marrazteko modu bat da. Puntu bat aukeratzen da, O zentroa, eta irudiaren puntu bakoitza, A, O-rekin lotzen da. Erdizuzen horren gainean A\' puntua kokatzen da, $OA\'=r\\cdot OA$ izan dadin. $r$ homoteziaren arrazoia da: $r=2$ bada, irudia bikoiztu egiten da; $r=0{,}5$ bada, erdira txikitzen da. Lortutako irudia hasierakoaren antzekoa da, $r$ arrazoiarekin, eta haren aldeak hasierakoen paraleloak dira. Antzekoak diren eta alde paraleloak dituzten bi irudi beti dira homotetikoak.',
            'La homotecia es una forma de dibujar figuras semejantes. Se elige un punto O, el centro, y se une cada punto A de la figura con O. Sobre esa semirrecta se coloca el punto A\' de modo que $OA\'=r\\cdot OA$. $r$ es la razón de la homotecia: si $r=2$, la figura se duplica; si $r=0{,}5$, se reduce a la mitad. La figura obtenida es semejante a la inicial con razón $r$, y sus lados son paralelos a los iniciales. Dos figuras semejantes con los lados paralelos son siempre homotéticas.',
            'التحاكي طريقة لرسم أشكال متشابهة. نختار نقطة O هي المركز، ونصل كل نقطة A من الشكل بـ O. وعلى نصف المستقيم نضع النقطة A\' بحيث $OA\'=r\\cdot OA$. و$r$ نسبة التحاكي: إذا كان $r=2$ يتضاعف الشكل؛ وإذا كان $r=0{,}5$ يصغر إلى النصف. الشكل الناتج مشابه للأصلي بنسبة $r$، وأضلاعه موازية للأضلاع الأصلية. والشكلان المتشابهان ذوا الأضلاع المتوازية متحاكيان دائمًا.'
        ),
        problem: say('O zentroko homotezia batean, $OA=3$ cm eta $OA\'=7{,}5$ cm. Zein da arrazoia? A-tik B-ra 2 cm badaude, zenbat A\'-tik B\'-ra?', 'En una homotecia de centro O, $OA=3$ cm y $OA\'=7{,}5$ cm. ¿Cuál es la razón? Si de A a B hay 2 cm, ¿cuánto hay de A\' a B\'?', 'في تحاكٍ مركزه O، $OA=3$ سم و$OA\'=7{,}5$ سم. ما النسبة؟ إذا كان من A إلى B سنتيمتران فكم من A\' إلى B\'؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Arrazoia.', 'Razón.', 'النسبة.'), math: same('$r=\\dfrac{7{,}5}{3}=2{,}5$') },
            { text: say('Aldeak ere r bider.', 'Los lados, también por r.', 'الأضلاع أيضًا في r.'), math: same('$2\\cdot 2{,}5=5$') }
        ],
        example: same("$OA'=r\\cdot OA$"),
        takeaway: say('Homotezia: zentro bat eta arrazoi bat. Irudia antzekoa da, alde paraleloekin.', 'Homotecia: un centro y una razón. La imagen es semejante, con lados paralelos.', 'التحاكي: مركز ونسبة. والصورة مشابهة بأضلاع متوازية.'),
        figure: (language) => <HomothetyFigure language={language} />
    },

    /* ---------- 3. Perimeters, areas and volumes ---------- */
    {
        id: 'perimeter-ratio',
        stage: 'ratios',
        title: say('Perimetroen arrazoia', 'Razón de los perímetros', 'نسبة المحيطات'),
        goal: say('Irudi antzekoen perimetroen eta luzera guztien arrazoia antzekotasun-arrazoia dela erabiltzea.', 'Usar que la razón de los perímetros y de todas las longitudes de figuras semejantes es la razón de semejanza.', 'استعمال أن نسبة المحيطات وكل الأطوال في الأشكال المتشابهة هي نسبة التشابه.'),
        explanation: say(
            'Bi irudi antzekoak badira $r$ arrazoiarekin, haien luzera guztiak $r$ bider handitzen edo txikitzen dira: aldeak, diagonalak, altuerak, erradioak… eta baita perimetroa ere, aldeen batura baita: $\\dfrac{P\'}{P}=r$. Adibidez, hexagono baten aldea 3 cm eta beste hexagono erregular batena 0,5 cm badira, perimetroen arrazoia $3\\mathbin{:}0{,}5=6$ da. Zirkunferentzietan ere bai: erradioa hirukoizten bada, luzera hirukoizten da.',
            'Si dos figuras son semejantes con razón $r$, todas sus longitudes quedan multiplicadas por $r$: lados, diagonales, alturas, radios… y también el perímetro, que es la suma de los lados: $\\dfrac{P\'}{P}=r$. Por ejemplo, si un hexágono regular tiene 3 cm de lado y otro 0,5 cm, la razón de sus perímetros es $3\\mathbin{:}0{,}5=6$. Igual en las circunferencias: si el radio se triplica, la longitud se triplica.',
            'إذا كان شكلان متشابهين بنسبة $r$ فإن جميع أطوالهما تُضرب في $r$: الأضلاع والأقطار والارتفاعات وأنصاف الأقطار… وكذلك المحيط لأنه مجموع الأضلاع: $\\dfrac{P\'}{P}=r$. مثلًا إذا كان ضلع مسدس منتظم 3 سم وضلع آخر 0.5 سم فإن نسبة محيطيهما $3\\mathbin{:}0{,}5=6$. وكذلك في الدوائر: إذا تضاعف نصف القطر ثلاث مرات تضاعف الطول ثلاث مرات.'
        ),
        problem: say('Triangelu baten perimetroa 24 cm da. Zein da 1,5 arrazoiko triangelu antzeko baten perimetroa?', 'Un triángulo tiene 24 cm de perímetro. ¿Cuál es el perímetro de uno semejante de razón 1,5?', 'محيط مثلث 24 سم. ما محيط مثلث مشابه نسبته 1.5؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Perimetroa ere r bider.', 'El perímetro, también por r.', 'المحيط أيضًا في r.'), math: same('$24\\cdot 1{,}5=36$') }
        ],
        example: same("$\\dfrac{P'}{P}=r$"),
        takeaway: say('Luzera guztiak, perimetroa barne, r bider.', 'Todas las longitudes, también el perímetro, por r.', 'كل الأطوال، ومنها المحيط، في r.'),
        figure: (language) => <RatiosFigure language={language} />
    },
    {
        id: 'area-ratio',
        stage: 'ratios',
        title: say('Azaleren arrazoia', 'Razón de las áreas', 'نسبة المساحات'),
        goal: say('Irudi antzekoen azaleren arrazoia antzekotasun-arrazoiaren karratua dela erabiltzea.', 'Usar que la razón de las áreas de figuras semejantes es el cuadrado de la razón de semejanza.', 'استعمال أن نسبة مساحات الأشكال المتشابهة هي مربع نسبة التشابه.'),
        explanation: say(
            'Azalera bi luzeraren biderkadura da (oinarria eta altuera, adibidez), eta bi luzerak $r$ bider hazten dira. Horregatik, irudi antzekoen azaleren arrazoia $r^{2}$ da: $\\dfrac{A\'}{A}=r^{2}$. Karratu baten aldea bikoizten bada, azalera laukoizten da; hirukoizten bada, bederatzi bider handiagoa da. Alderantziz, azaleren arrazoia ezagututa, luzeren arrazoia haren erro karratua da: azalerak 16 bider handiagoak badira, aldeak 4 bider dira.',
            'El área es el producto de dos longitudes (la base y la altura, por ejemplo), y las dos crecen $r$ veces. Por eso la razón de las áreas de figuras semejantes es $r^{2}$: $\\dfrac{A\'}{A}=r^{2}$. Si el lado de un cuadrado se duplica, el área se cuadruplica; si se triplica, se hace nueve veces mayor. Al revés, conociendo la razón de las áreas, la de las longitudes es su raíz cuadrada: si las áreas son 16 veces mayores, los lados lo son 4 veces.',
            'المساحة جداء طولين (القاعدة والارتفاع مثلًا)، وكلاهما يكبر $r$ مرة. لذلك نسبة مساحات الأشكال المتشابهة $r^{2}$: $\\dfrac{A\'}{A}=r^{2}$. إذا تضاعف ضلع مربع تضاعفت مساحته أربع مرات؛ وإذا تضاعف ثلاث مرات صارت المساحة تسعة أضعاف. وبالعكس، إذا عرفنا نسبة المساحات فنسبة الأطوال جذرها التربيعي: إذا كانت المساحات أكبر 16 مرة فالأضلاع أكبر 4 مرات.'
        ),
        problem: say('Bi poligono antzekoren perimetroen arrazoia 2 da, eta handiaren azalera 120 cm². Zein da txikiaren azalera?', 'La razón de los perímetros de dos polígonos semejantes es 2 y el área del mayor, 120 cm². ¿Cuál es el área del menor?', 'نسبة محيطي مضلعين متشابهين 2 ومساحة الأكبر 120 سم². ما مساحة الأصغر؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Azaleren arrazoia.', 'Razón de las áreas.', 'نسبة المساحات.'), math: same('$r^{2}=2^{2}=4$') },
            { text: say('Zatitu.', 'Divide.', 'اقسم.'), math: same('$120\\mathbin{:}4=30$') }
        ],
        example: same("$\\dfrac{A'}{A}=r^{2}$"),
        takeaway: say('Azalerak r² bider. Aldea bikoiztu: azalera lau bider.', 'Las áreas, por r². Lado doble: área cuatro veces.', 'المساحات في r². ضلع مضاعف: مساحة أربعة أضعاف.'),
        figure: (language) => <RatiosFigure language={language} />
    },
    {
        id: 'volume-ratio',
        stage: 'ratios',
        title: say('Bolumenen arrazoia', 'Razón de los volúmenes', 'نسبة الحجوم'),
        goal: say('Gorputz antzekoen bolumenen arrazoia antzekotasun-arrazoiaren kuboa dela erabiltzea.', 'Usar que la razón de los volúmenes de cuerpos semejantes es el cubo de la razón de semejanza.', 'استعمال أن نسبة حجوم الأجسام المتشابهة هي مكعب نسبة التشابه.'),
        explanation: say(
            'Bi gorputz antzekoak badira $r$ arrazoiarekin, haien ertzak $r$ bider hazten dira, haien azalerak $r^{2}$ bider, eta haien bolumenak $r^{3}$ bider: $\\dfrac{V\'}{V}=r^{3}$. Kubo baten ertza bikoizten bada, 8 kubo txiki sartzen dira barruan; hirukoizten bada, 27. Horregatik, maketa batek errealitatean baino askoz bolumen txikiagoa du: 1:10 eskalako maketa batean, bolumena 1000 aldiz txikiagoa da.',
            'Si dos cuerpos son semejantes con razón $r$, sus aristas se multiplican por $r$, sus áreas por $r^{2}$ y sus volúmenes por $r^{3}$: $\\dfrac{V\'}{V}=r^{3}$. Si la arista de un cubo se duplica, dentro caben 8 cubos pequeños; si se triplica, 27. Por eso una maqueta tiene un volumen mucho menor que el real: en una maqueta a escala 1:10, el volumen es 1000 veces menor.',
            'إذا كان جسمان متشابهين بنسبة $r$ فإن أحرفهما تُضرب في $r$ ومساحاتهما في $r^{2}$ وحجومهما في $r^{3}$: $\\dfrac{V\'}{V}=r^{3}$. إذا تضاعف حرف مكعب اتسع لثمانية مكعبات صغيرة؛ وإذا تضاعف ثلاث مرات اتسع لـ 27. لذلك حجم المجسّم أصغر بكثير من الحقيقي: في مجسّم بمقياس 1:10 يكون الحجم أصغر بـ 1000 مرة.'
        ),
        problem: say('Kaxa batek 2 L hartzen ditu. Zenbat hartuko ditu ertz guztiak 1,5 aldiz luzeagoak dituen kaxa antzeko batek?', 'Una caja tiene 2 L de capacidad. ¿Cuánto cabrá en una caja semejante con todas las aristas 1,5 veces más largas?', 'سعة صندوق 2 L. كم يسع صندوق مشابه كل أحرفه أطول بـ 1.5 مرة؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bolumenen arrazoia.', 'Razón de los volúmenes.', 'نسبة الحجوم.'), math: same('$1{,}5^{3}=3{,}375$') },
            { text: say('Biderkatu.', 'Multiplica.', 'اضرب.'), math: same('$2\\cdot 3{,}375=6{,}75$') }
        ],
        example: same("$\\dfrac{V'}{V}=r^{3}$"),
        takeaway: say('Luzerak r, azalerak r², bolumenak r³.', 'Longitudes r, áreas r², volúmenes r³.', 'الأطوال r، والمساحات r²، والحجوم r³.'),
        figure: (language) => <VolumeRatioFigure language={language} />
    },

    /* ---------- 4. Scales ---------- */
    {
        id: 'scale',
        stage: 'scales',
        title: say('Eskala eta mapak', 'Escala y mapas', 'المقياس والخرائط'),
        goal: say('Mapa edo plano bateko distantziak errealitatekoetara eta alderantziz igarotzea eskala erabiliz.', 'Pasar distancias de un mapa o plano a la realidad y al revés usando la escala.', 'تحويل المسافات من الخريطة أو المخطط إلى الواقع وبالعكس باستعمال المقياس.'),
        explanation: say(
            'Mapak eta planoak errealitatearen antzeko irudiak dira. Eskala $1\\mathbin{:}n$ moduan idazten da: mapako unitate batek errealitateko $n$ unitate adierazten ditu, edozein unitate izanda ere. 1:50 000 eskalan, mapako 1 cm errealitateko 50 000 cm dira, hau da, 500 m. Errealitateko distantzia kalkulatzeko, biderkatu mapakoa $n$-z; mapakoa kalkulatzeko, zatitu errealitatekoa $n$-z. Azkenean, igaro emaitza unitate egoki batera: $100\\,000$ cm = 1 km. Eskala grafikoa zuzenki bat da, haren luzera errealitatean zenbat den adierazten duena.',
            'Los mapas y los planos son figuras semejantes a la realidad. La escala se escribe $1\\mathbin{:}n$: una unidad del mapa representa $n$ unidades reales, sea cual sea la unidad. A escala 1:50 000, 1 cm del mapa son 50 000 cm reales, es decir, 500 m. Para hallar una distancia real, multiplica la del mapa por $n$; para la del mapa, divide la real entre $n$. Al final, pasa el resultado a una unidad adecuada: $100\\,000$ cm = 1 km. La escala gráfica es un segmento que indica cuánto vale su longitud en la realidad.',
            'الخرائط والمخططات أشكال مشابهة للواقع. يُكتب المقياس $1\\mathbin{:}n$: وحدة واحدة في الخريطة تمثل $n$ وحدات حقيقية، أيًّا كانت الوحدة. بمقياس 1:50 000 يكون 1 سم في الخريطة 50 000 سم في الواقع، أي 500 م. لإيجاد مسافة حقيقية اضرب مسافة الخريطة في $n$؛ ولمسافة الخريطة اقسم الحقيقية على $n$. وفي النهاية حوّل النتيجة إلى وحدة مناسبة: $100\\,000$ سم = 1 كم. والمقياس الخطي قطعة تبيّن كم يساوي طولها في الواقع.'
        ),
        problem: say('1:300 000 eskalako mapa batean, bi herri 4 cm-ra daude. Zenbat km daude benetan?', 'En un mapa a escala 1:300 000, dos pueblos están a 4 cm. ¿A cuántos km están en realidad?', 'في خريطة بمقياس 1:300 000 تبعد قريتان 4 سم. كم كيلومترًا تبعدان في الواقع؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu n-z.', 'Multiplica por n.', 'اضرب في n.'), math: same('$4\\cdot 300\\,000=1\\,200\\,000$') },
            { text: say('cm-tik km-ra: zatitu 100 000z.', 'De cm a km: divide entre 100 000.', 'من سم إلى كم: اقسم على 100 000.'), math: same('$1\\,200\\,000\\mathbin{:}100\\,000=12$') }
        ],
        example: same('$1\\mathbin{:}n$'),
        takeaway: say('Errealitatea = mapa bider n. Gero aldatu unitatea.', 'Realidad = mapa por n. Después cambia la unidad.', 'الواقع = الخريطة في n. ثم غيّر الوحدة.'),
        figure: (language) => <ScaleFigure language={language} />
    },
    {
        id: 'find-scale',
        stage: 'scales',
        title: say('Eskala aurkitzea', 'Hallar la escala', 'إيجاد المقياس'),
        goal: say('Mapako eta errealitateko distantzia ezagututa eskala kalkulatzea.', 'Calcular la escala conociendo una distancia en el mapa y en la realidad.', 'حساب المقياس بمعرفة مسافة في الخريطة وفي الواقع.'),
        explanation: say(
            'Eskala aurkitzeko, jarri bi distantziak unitate berean eta zatitu errealitatekoa mapakoaz: $n=\\dfrac{\\text{errealitatea}}{\\text{mapa}}$. Adibidez, 5 km mapan 1 cm badira, $5\\ \\text{km}=500\\,000$ cm, eta eskala 1:500 000 da. Unitate berean jartzea da urratsik garrantzitsuena: km eta cm nahasten badira, eskala ez da zuzena. Maketa eta handitzeetan ere bai: 17,5 cm-ko maketak 350 cm-ko armairua adierazten badu, $350\\mathbin{:}17{,}5=20$, eta eskala 1:20 da.',
            'Para hallar la escala, pon las dos distancias en la misma unidad y divide la real entre la del mapa: $n=\\dfrac{\\text{realidad}}{\\text{mapa}}$. Por ejemplo, si 5 km son 1 cm en el mapa, $5\\ \\text{km}=500\\,000$ cm y la escala es 1:500 000. Ponerlas en la misma unidad es el paso más importante: si mezclas km y cm, la escala sale mal. En maquetas también: si una maqueta de 17,5 cm representa un armario de 350 cm, $350\\mathbin{:}17{,}5=20$ y la escala es 1:20.',
            'لإيجاد المقياس ضع المسافتين بالوحدة نفسها واقسم الحقيقية على مسافة الخريطة: $n=\\dfrac{\\text{الواقع}}{\\text{الخريطة}}$. مثلًا إذا كانت 5 كم تساوي 1 سم في الخريطة فإن $5\\ \\text{km}=500\\,000$ سم والمقياس 1:500 000. وضعهما بالوحدة نفسها أهم خطوة: إذا خلطت الكيلومتر بالسنتيمتر خرج المقياس خاطئًا. وفي المجسّمات أيضًا: إذا مثّل مجسّم طوله 17.5 سم خزانة طولها 350 سم فإن $350\\mathbin{:}17{,}5=20$ والمقياس 1:20.'
        ),
        problem: say('Mapa batean 6,2 cm-k 372 km adierazten dituzte. Zein da eskala?', 'En un mapa, 6,2 cm representan 372 km. ¿Cuál es la escala?', 'في خريطة تمثل 6.2 سم مسافة 372 كم. ما المقياس؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Unitate berean.', 'En la misma unidad.', 'بالوحدة نفسها.'), math: same('$372\\ \\text{km}=37\\,200\\,000\\ \\text{cm}$') },
            { text: say('Zatitu.', 'Divide.', 'اقسم.'), math: same('$37\\,200\\,000\\mathbin{:}6{,}2=6\\,000\\,000$') },
            { text: say('Eskala 1:6 000 000.', 'Escala 1:6 000 000.', 'المقياس 1:6 000 000.') }
        ],
        example: same('$n=\\dfrac{\\text{real}}{\\text{mapa}}$'),
        takeaway: say('Unitate berean jarri eta zatitu: errealitatea zati mapa.', 'Misma unidad y divide: realidad entre mapa.', 'الوحدة نفسها ثم اقسم: الواقع على الخريطة.'),
        figure: (language) => <ScaleFigure language={language} />
    },
    {
        id: 'plans',
        stage: 'scales',
        title: say('Planoak eta maketak', 'Planos y maquetas', 'المخططات والمجسّمات'),
        goal: say('Planoetako azalerak eta maketetako bolumenak eskalarekin kalkulatzea.', 'Calcular áreas en planos y volúmenes en maquetas con la escala.', 'حساب المساحات في المخططات والحجوم في المجسّمات بالمقياس.'),
        explanation: say(
            'Eskala luzerei aplikatzen zaie. Plano batean azalera bat neurtzen bada, ez da nahikoa $n$-z biderkatzea: azalerak $n^{2}$ bider handiagoak dira errealitatean. 1:100 eskalako plano batean, 20 cm²-ko gela batek errealitatean $20\\cdot 10\\,000=200\\,000$ cm² ditu, hau da, 20 m². Errazagoa da lehenik luzerak igarotzea (5 cm → 5 m, 4 cm → 4 m) eta gero azalera kalkulatzea. Maketetan, bolumenak $n^{3}$ bider handiagoak dira errealitatean.',
            'La escala se aplica a las longitudes. Si en un plano se mide un área, no basta con multiplicar por $n$: las áreas son $n^{2}$ veces mayores en la realidad. En un plano a escala 1:100, una habitación de 20 cm² tiene en realidad $20\\cdot 10\\,000=200\\,000$ cm², es decir, 20 m². Es más fácil pasar primero las longitudes (5 cm → 5 m, 4 cm → 4 m) y después calcular el área. En las maquetas, los volúmenes son $n^{3}$ veces mayores en la realidad.',
            'المقياس يطبَّق على الأطوال. إذا قيست مساحة في مخطط فلا يكفي الضرب في $n$: المساحات أكبر $n^{2}$ مرة في الواقع. في مخطط بمقياس 1:100 تكون غرفة مساحتها 20 سم² في الواقع $20\\cdot 10\\,000=200\\,000$ سم²، أي 20 م². والأسهل تحويل الأطوال أولًا (5 سم → 5 م، 4 سم → 4 م) ثم حساب المساحة. وفي المجسّمات تكون الحجوم أكبر $n^{3}$ مرة في الواقع.'
        ),
        problem: say('1:50 eskalako plano batean, gela batek 8 cm × 6 cm neurtzen ditu. Zein da benetako azalera m²-tan?', 'En un plano a escala 1:50, una habitación mide 8 cm × 6 cm. ¿Cuál es su área real en m²?', 'في مخطط بمقياس 1:50 تقيس غرفة 8 سم × 6 سم. ما مساحتها الحقيقية بالمتر المربع؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Luzerak.', 'Longitudes.', 'الأطوال.'), math: same('$8\\cdot 50=400\\quad 6\\cdot 50=300$') },
            { text: say('Metrotan: 4 m eta 3 m.', 'En metros: 4 m y 3 m.', 'بالمتر: 4 م و3 م.'), math: same('$4\\cdot 3=12$') }
        ],
        example: same('$A_{\\text{real}}=n^{2}\\cdot A$'),
        takeaway: say('Lehenik luzerak igaro, gero azalera. Azalerak n² bider, bolumenak n³ bider.', 'Primero pasa las longitudes, luego el área. Áreas por n², volúmenes por n³.', 'حوّل الأطوال أولًا ثم المساحة. المساحات في n² والحجوم في n³.'),
        figure: (language) => <PlanFigure language={language} />
    },

    /* ---------- 5. Heights and distances ---------- */
    {
        id: 'shadows',
        stage: 'heights',
        title: say('Itzalak', 'Sombras', 'الظلال'),
        goal: say('Altuera bat itzalen bidez kalkulatzea, triangelu antzekoak erabiliz.', 'Calcular una altura mediante las sombras, usando triángulos semejantes.', 'حساب ارتفاع بواسطة الظلال باستعمال مثلثات متشابهة.'),
        explanation: say(
            'Eguzki-izpiak paraleloak dira. Horregatik, une berean, objektu bertikal batek eta haren itzalak osatzen duten triangelu angeluzuzena beste edozein objektu bertikalen triangeluaren antzekoa da: angelu zuzena eta izpien angelua berdinak dira. Ondorioz, altuerak eta itzalak proportzionalak dira: $\\dfrac{x}{\\text{itzala}}=\\dfrac{\\text{makila}}{\\text{makilaren itzala}}$. Horrela neurtu zuen Talesek Keopsen piramidearen altuera. Kontuz: datu guztiak unitate berean eta une berean hartu behar dira.',
            'Los rayos del sol son paralelos. Por eso, en un mismo momento, el triángulo rectángulo que forman un objeto vertical y su sombra es semejante al de cualquier otro objeto vertical: el ángulo recto y el de los rayos son iguales. En consecuencia, alturas y sombras son proporcionales: $\\dfrac{x}{\\text{sombra}}=\\dfrac{\\text{palo}}{\\text{sombra del palo}}$. Así midió Tales la altura de la pirámide de Keops. Cuidado: todos los datos en la misma unidad y en el mismo momento.',
            'أشعة الشمس متوازية. لذلك في اللحظة نفسها يكون المثلث القائم الذي يكوّنه جسم عمودي وظله مشابهًا لمثلث أي جسم عمودي آخر: الزاوية القائمة وزاوية الأشعة متساويتان. وبالتالي تتناسب الارتفاعات والظلال: $\\dfrac{x}{\\text{الظل}}=\\dfrac{\\text{العصا}}{\\text{ظل العصا}}$. هكذا قاس طاليس ارتفاع هرم خوفو. انتبه: كل المعطيات بالوحدة نفسها وفي اللحظة نفسها.'
        ),
        problem: say('1,5 m-ko makila batek 2 m-ko itzala du, eta zuhaitz batek, une berean, 12 m-koa. Zenbat neurtzen du zuhaitzak?', 'Un palo de 1,5 m da una sombra de 2 m y un árbol, en el mismo momento, una de 12 m. ¿Cuánto mide el árbol?', 'عصا طولها 1.5 م ظلها 2 م، وشجرة ظلها في اللحظة نفسها 12 م. كم طول الشجرة؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Proportzioa.', 'Proporción.', 'التناسب.'), math: same('$\\dfrac{x}{12}=\\dfrac{1{,}5}{2}$') },
            { text: say('Askatu.', 'Despeja.', 'اعزل.'), math: same('$x=\\dfrac{12\\cdot 1{,}5}{2}=9$') }
        ],
        example: same('$\\dfrac{x}{12}=\\dfrac{1{,}5}{2}$'),
        takeaway: say('Une berean, altuerak eta itzalak proportzionalak dira.', 'En el mismo momento, alturas y sombras son proporcionales.', 'في اللحظة نفسها تتناسب الارتفاعات والظلال.'),
        figure: (language) => <ShadowFigure language={language} />
    },
    {
        id: 'mirror',
        stage: 'heights',
        title: say('Ispilua', 'El espejo', 'المرآة'),
        goal: say('Lurrean jarritako ispilu baten bidez altuera bat kalkulatzea.', 'Calcular una altura con un espejo colocado en el suelo.', 'حساب ارتفاع بمرآة موضوعة على الأرض.'),
        explanation: say(
            'Ispilu bat lurrean jartzen bada eta pertsona bat atzera egiten badu eraikinaren goiko puntua ispiluan ikusi arte, argiak angelu berarekin egiten du talka eta islatzen da. Bi triangelu angeluzuzen sortzen dira, antzekoak: pertsonarena (begien altuera eta ispilurainoko distantzia) eta eraikinarena (altuera ezezaguna eta eraikinetik ispilurainoko distantzia). Beraz: $\\dfrac{x}{\\text{eraikinerainoko distantzia}}=\\dfrac{\\text{begien altuera}}{\\text{pertsonarainoko distantzia}}$. Kontuz: pertsonaren altueran begiena erabiltzen da, ez burukoa.',
            'Si se pone un espejo en el suelo y una persona retrocede hasta ver en él lo alto de un edificio, la luz llega y se refleja con el mismo ángulo. Se forman dos triángulos rectángulos semejantes: el de la persona (altura de los ojos y distancia al espejo) y el del edificio (altura desconocida y distancia del edificio al espejo). Por tanto: $\\dfrac{x}{\\text{distancia al edificio}}=\\dfrac{\\text{altura de los ojos}}{\\text{distancia a la persona}}$. Cuidado: de la persona se usa la altura de los ojos, no la de la cabeza.',
            'إذا وُضعت مرآة على الأرض وتراجع شخص حتى يرى فيها أعلى مبنى، فإن الضوء يسقط وينعكس بالزاوية نفسها. يتكوّن مثلثان قائمان متشابهان: مثلث الشخص (ارتفاع عينيه وبعده عن المرآة) ومثلث المبنى (الارتفاع المجهول وبعد المبنى عن المرآة). إذن: $\\dfrac{x}{\\text{البعد إلى المبنى}}=\\dfrac{\\text{ارتفاع العينين}}{\\text{البعد إلى الشخص}}$. انتبه: من الشخص يؤخذ ارتفاع العينين لا الرأس.'
        ),
        problem: say('Ispilu bat eraikin batetik 15 m-ra dago. Pertsona batek, begiak 1,6 m-ra dituela, ispilutik 2 m-ra ikusten du eraikinaren goialdea. Zenbat neurtzen du eraikinak?', 'Un espejo está a 15 m de un edificio. Una persona con los ojos a 1,6 m ve lo alto del edificio estando a 2 m del espejo. ¿Cuánto mide el edificio?', 'مرآة على بعد 15 م من مبنى. يرى شخص عيناه على ارتفاع 1.6 م أعلى المبنى وهو على بعد 2 م من المرآة. كم ارتفاع المبنى؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Proportzioa.', 'Proporción.', 'التناسب.'), math: same('$\\dfrac{x}{15}=\\dfrac{1{,}6}{2}$') },
            { text: say('Askatu.', 'Despeja.', 'اعزل.'), math: same('$x=\\dfrac{15\\cdot 1{,}6}{2}=12$') }
        ],
        example: same('$\\dfrac{x}{15}=\\dfrac{1{,}6}{2}$'),
        takeaway: say('Ispiluan, angelu berdinak: triangelu antzekoak. Erabili begien altuera.', 'En el espejo, ángulos iguales: triángulos semejantes. Usa la altura de los ojos.', 'في المرآة زوايا متساوية: مثلثات متشابهة. استعمل ارتفاع العينين.'),
        figure: (language) => <MirrorFigure language={language} />
    },
    {
        id: 'sight',
        stage: 'heights',
        title: say('Ikus-lerroa eta distantziak', 'Línea de visión y distancias', 'خط النظر والمسافات'),
        goal: say('Ikus-lerro batek sortzen dituen triangelu antzekoekin altuerak eta distantziak kalkulatzea.', 'Calcular alturas y distancias con los triángulos semejantes que forma una línea de visión.', 'حساب الارتفاعات والمسافات بالمثلثات المتشابهة التي يكوّنها خط النظر.'),
        explanation: say(
            'Pertsona batek zutoin baten punta eta eraikin baten goialdea lerro berean ikusten baditu, begietatik abiatzen den ikus-lerroak bi triangelu sortzen ditu Tales posizioan. Bien oinarria begien altueran dagoen lerro horizontala da. Triangelu txikiaren altuera zutoina ken begien altuera da; handiarena, eraikina ken begien altuera. Beraz, lehenik kalkulatu altuera-diferentzia, eta azkenean gehitu begien altuera. Errekaren zabalera edo iristen ez den beste distantzia bat neurtzeko ere triangelu antzeko bikote bat marrazten da.',
            'Si una persona ve alineados la punta de un poste y lo alto de un edificio, la línea de visión que sale de sus ojos forma dos triángulos en posición de Tales. La base de los dos es la línea horizontal a la altura de los ojos. La altura del triángulo pequeño es el poste menos la altura de los ojos; la del grande, el edificio menos la altura de los ojos. Así que primero calcula esa diferencia de alturas y al final suma la altura de los ojos. Para medir el ancho de un río u otra distancia inaccesible también se dibuja una pareja de triángulos semejantes.',
            'إذا رأى شخص رأس عمود وأعلى مبنى على استقامة واحدة فإن خط النظر الخارج من عينيه يكوّن مثلثين في وضع طاليس. قاعدة كليهما الخط الأفقي على ارتفاع العينين. ارتفاع المثلث الصغير هو العمود ناقص ارتفاع العينين؛ وارتفاع الكبير المبنى ناقص ارتفاع العينين. لذلك احسب أولًا فرق الارتفاع، وفي النهاية أضف ارتفاع العينين. ولقياس عرض نهر أو مسافة أخرى يتعذّر الوصول إليها نرسم أيضًا زوجًا من المثلثات المتشابهة.'
        ),
        problem: say('Begiak 1,5 m-ra dituen pertsona bat 3 m-ko zutoin batetik 4 m-ra dago, eta zutoinaren punta eta 20 m-ra dagoen eraikin baten goialdea lerrokatuta ikusten ditu. Zenbat neurtzen du eraikinak?', 'Una persona con los ojos a 1,5 m está a 4 m de un poste de 3 m y ve alineados la punta del poste y lo alto de un edificio que está a 20 m. ¿Cuánto mide el edificio?', 'شخص عيناه على ارتفاع 1.5 م يقف على بعد 4 م من عمود طوله 3 م، ويرى رأس العمود وأعلى مبنى على بعد 20 م على استقامة واحدة. كم ارتفاع المبنى؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Triangelu txikia: $3-1{,}5=1{,}5$ altuera eta 4 oinarria.', 'Triángulo pequeño: altura $3-1{,}5=1{,}5$ y base 4.', 'المثلث الصغير: الارتفاع $3-1{,}5=1{,}5$ والقاعدة 4.') },
            { text: say('Triangelu handia.', 'Triángulo grande.', 'المثلث الكبير.'), math: same('$\\dfrac{20\\cdot 1{,}5}{4}=7{,}5$') },
            { text: say('Gehitu begien altuera.', 'Suma la altura de los ojos.', 'أضف ارتفاع العينين.'), math: same('$7{,}5+1{,}5=9$') }
        ],
        example: same('$\\dfrac{y}{20}=\\dfrac{1{,}5}{4}$'),
        takeaway: say('Kendu begien altuera, egin proportzioa eta gehitu berriro.', 'Resta la altura de los ojos, haz la proporción y vuelve a sumarla.', 'اطرح ارتفاع العينين واكتب التناسب ثم أضفه من جديد.'),
        figure: (language) => <SightFigure language={language} />
    }
]
