import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import {
    CalculatorFigure,
    DoubleObservationFigure,
    ElevationFigure,
    FundamentalFigure,
    NotableAnglesFigure,
    ObliqueFigure,
    OneRatioFigure,
    RadianFigure,
    RatiosFigure,
    RelatedAnglesFigure,
    SimilarRatiosFigure,
    SolveRightFigure,
    TrigAreaFigure,
    UnitCircleFigure
} from './figures'
import { same, say } from './text'

/* ==========================================================================
   Trigonometria · 4. DBH akademikoak — stages and lessons, following Anaya
   4.º Académicas unit 7 (the ratios of an acute angle, the fundamental
   relations, the calculator, solving right and oblique triangles with the
   altitude, the double observation, the unit circle, angles of any measure
   and the radian) and Santillana 4.º Académicas unit 7 (radians, the
   notable angles 30°, 45° and 60°, one ratio from another, the related
   angles 180° − α, 180° + α and 360° − α, heights and distances). Inside
   formulas \sen and \tg are written in each language's names (text.ts).
   ========================================================================== */

export type TrigonometryStageId = 'ratios' | 'identities' | 'solving' | 'problems' | 'circle'

export const trigonometryStages: UnitStage[] = [
    { id: 'ratios', tone: 'blue', title: { eu: 'Angelu zorrotz baten arrazoiak', es: 'Razones de un ángulo agudo', ar: 'نسب الزاوية الحادة' } },
    { id: 'identities', tone: 'violet', title: { eu: 'Oinarrizko erlazioak', es: 'Relaciones fundamentales', ar: 'العلاقات الأساسية' } },
    { id: 'solving', tone: 'mustard', title: { eu: 'Triangelu angeluzuzenak', es: 'Triángulos rectángulos', ar: 'المثلثات القائمة' } },
    { id: 'problems', tone: 'coral', title: { eu: 'Altuerak, distantziak eta azalerak', es: 'Alturas, distancias y áreas', ar: 'الارتفاعات والمسافات والمساحات' } },
    { id: 'circle', tone: 'green', title: { eu: 'Zirkunferentzia goniometrikoa', es: 'La circunferencia goniométrica', ar: 'الدائرة المثلثية' } }
]

export const trigonometryTopics: UnitTopic[] = [
    /* ---------- 1. Ratios of an acute angle ---------- */
    {
        id: 'right-ratios',
        stage: 'ratios',
        title: say('Sinua, kosinua eta tangentea', 'Seno, coseno y tangente', 'الجيب وجيب التمام والظل'),
        goal: say('Triangelu angeluzuzen bateko angelu zorrotz baten hiru arrazoi trigonometrikoak kalkulatzea.', 'Calcular las tres razones trigonométricas de un ángulo agudo en un triángulo rectángulo.', 'حساب النسب المثلثية الثلاث لزاوية حادة في مثلث قائم.'),
        explanation: say(
            'Triangelu angeluzuzen batean, $\\alpha$ angelu zorrotzaren aldean bi katetoak bereizten ditugu: aurkakoa (angeluaren parean dagoena) eta ondokoa (angeluaren alboan dagoena); hirugarren aldea hipotenusa da. Hiru arrazoi trigonometrikoak zatiketa hauek dira: $\\sen\\alpha=\\dfrac{\\text{aurkakoa}}{\\text{hipotenusa}}$, $\\cos\\alpha=\\dfrac{\\text{ondokoa}}{\\text{hipotenusa}}$ eta $\\tg\\alpha=\\dfrac{\\text{aurkakoa}}{\\text{ondokoa}}$. 3, 4 eta 5eko triangeluan, 3ko katetoaren aurkako angeluarentzat: $\\sen\\alpha=0{,}6$, $\\cos\\alpha=0{,}8$ eta $\\tg\\alpha=0{,}75$. Alde bat falta bada, Pitagorasekin aurkitzen da lehenik. Kontuz: beste angelu zorrotzarentzat aurkakoa eta ondokoa trukatu egiten dira.',
            'En un triángulo rectángulo distinguimos, respecto de un ángulo agudo $\\alpha$, dos catetos: el opuesto (enfrente del ángulo) y el contiguo (junto al ángulo); el tercer lado es la hipotenusa. Las tres razones trigonométricas son estos cocientes: $\\sen\\alpha=\\dfrac{\\text{opuesto}}{\\text{hipotenusa}}$, $\\cos\\alpha=\\dfrac{\\text{contiguo}}{\\text{hipotenusa}}$ y $\\tg\\alpha=\\dfrac{\\text{opuesto}}{\\text{contiguo}}$. En el triángulo de lados 3, 4 y 5, para el ángulo opuesto al cateto 3: $\\sen\\alpha=0{,}6$, $\\cos\\alpha=0{,}8$ y $\\tg\\alpha=0{,}75$. Si falta un lado, primero se halla con Pitágoras. Cuidado: para el otro ángulo agudo, el opuesto y el contiguo se intercambian.',
            'في المثلث القائم نميّز بالنسبة إلى زاوية حادة $\\alpha$ ضلعين قائمين: المقابل (أمام الزاوية) والمجاور (بجانب الزاوية)؛ والضلع الثالث هو الوتر. والنسب المثلثية الثلاث هي هذه القسمات: $\\sen\\alpha=\\dfrac{\\text{opp}}{\\text{hyp}}$ و$\\cos\\alpha=\\dfrac{\\text{adj}}{\\text{hyp}}$ و$\\tg\\alpha=\\dfrac{\\text{opp}}{\\text{adj}}$، حيث opp المقابل وadj المجاور وhyp الوتر. في المثلث الذي أضلاعه 3 و4 و5، للزاوية المقابلة للضلع 3: $\\sen\\alpha=0{,}6$ و$\\cos\\alpha=0{,}8$ و$\\tg\\alpha=0{,}75$. وإذا نقص ضلع فإننا نجده أولًا بفيثاغورس. انتبه: بالنسبة إلى الزاوية الحادة الأخرى يتبادل المقابل والمجاور.'
        ),
        problem: say('Triangelu angeluzuzen baten katetoak 8 cm eta 15 cm dira. Kalkulatu 8 cm-ko katetoaren aurkako α angeluaren arrazoiak.', 'Los catetos de un triángulo rectángulo miden 8 cm y 15 cm. Calcula las razones del ángulo α opuesto al cateto de 8 cm.', 'ضلعا مثلث قائم 8 سم و15 سم. احسب نسب الزاوية α المقابلة للضلع 8 سم.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hipotenusa, Pitagorasekin.', 'La hipotenusa, con Pitágoras.', 'الوتر بفيثاغورس.'), math: same('$\\sqrt{8^{2}+15^{2}}=17$') },
            { text: say('Sinua eta kosinua.', 'Seno y coseno.', 'الجيب وجيب التمام.'), math: same('$\\sen\\alpha=\\dfrac{8}{17}\\approx 0{,}47$') },
            { text: say('Kosinua: 15/17 ≈ 0,88.', 'Coseno: 15/17 ≈ 0,88.', 'جيب التمام: 15/17 ≈ 0.88.'), math: same('$\\cos\\alpha=\\dfrac{15}{17}\\approx 0{,}88$') },
            { text: say('Tangentea: aurkakoa zati ondokoa.', 'Tangente: opuesto entre contiguo.', 'الظل: المقابل على المجاور.'), math: same('$\\tg\\alpha=\\dfrac{8}{15}\\approx 0{,}53$') }
        ],
        example: same('$\\sen\\alpha=\\dfrac{3}{5}$'),
        takeaway: say('Sinua: aurkakoa / hipotenusa. Kosinua: ondokoa / hipotenusa. Tangentea: aurkakoa / ondokoa.', 'Seno: opuesto / hipotenusa. Coseno: contiguo / hipotenusa. Tangente: opuesto / contiguo.', 'الجيب: المقابل / الوتر. جيب التمام: المجاور / الوتر. الظل: المقابل / المجاور.'),
        figure: (language) => <RatiosFigure language={language} />
    },
    {
        id: 'ratio-properties',
        stage: 'ratios',
        title: say('Arrazoiak ez daude tamainaren mende', 'Las razones no dependen del tamaño', 'النسب لا تتوقف على الحجم'),
        goal: say('Arrazoiak angeluaren mende bakarrik daudela ulertzea, haien mugak ezagutzea eta angelu osagarriak erabiltzea.', 'Entender que las razones solo dependen del ángulo, conocer sus límites y usar los ángulos complementarios.', 'فهم أن النسب تتوقف على الزاوية فقط، ومعرفة حدودها، واستعمال الزاويتين المتتامّتين.'),
        explanation: say(
            'Angelu zorrotz bera duten triangelu angeluzuzen guztiak antzekoak dira; beraz, haien aldeen arteko zatiketak berdinak dira: 3-4-5, 6-8-10 eta 9-12-15 triangeluetan $\\sen\\alpha=\\frac{3}{5}=\\frac{6}{10}=\\frac{9}{15}=0{,}6$. Arrazoiak angeluaren mende daude, ez triangeluaren tamainaren mende. Katetoak hipotenusa baino txikiagoak direnez, $0<\\sen\\alpha<1$ eta $0<\\cos\\alpha<1$; tangenteak, berriz, edozein balio positibo izan dezake. Angelua handitzean sinua eta tangentea handitzen dira eta kosinua txikitzen da. Triangeluaren beste angelu zorrotza $90°-\\alpha$ da, eta haren aurkakoa $\\alpha$-ren ondokoa da: $\\sen(90°-\\alpha)=\\cos\\alpha$, $\\cos(90°-\\alpha)=\\sen\\alpha$ eta $\\tg(90°-\\alpha)=\\dfrac{1}{\\tg\\alpha}$.',
            'Todos los triángulos rectángulos con el mismo ángulo agudo son semejantes; por eso los cocientes entre sus lados son iguales: en los triángulos 3-4-5, 6-8-10 y 9-12-15, $\\sen\\alpha=\\frac{3}{5}=\\frac{6}{10}=\\frac{9}{15}=0{,}6$. Las razones dependen del ángulo, no del tamaño del triángulo. Como los catetos son menores que la hipotenusa, $0<\\sen\\alpha<1$ y $0<\\cos\\alpha<1$; la tangente, en cambio, puede tomar cualquier valor positivo. Al crecer el ángulo, el seno y la tangente crecen y el coseno disminuye. El otro ángulo agudo del triángulo es $90°-\\alpha$, y su opuesto es el contiguo de $\\alpha$: $\\sen(90°-\\alpha)=\\cos\\alpha$, $\\cos(90°-\\alpha)=\\sen\\alpha$ y $\\tg(90°-\\alpha)=\\dfrac{1}{\\tg\\alpha}$.',
            'كل المثلثات القائمة التي لها الزاوية الحادة نفسها متشابهة؛ لذلك تتساوى قسمات أضلاعها: في المثلثات 3-4-5 و6-8-10 و9-12-15، $\\sen\\alpha=\\frac{3}{5}=\\frac{6}{10}=\\frac{9}{15}=0{,}6$. فالنسب تتوقف على الزاوية لا على حجم المثلث. وبما أن الضلعين القائمين أصغر من الوتر فإن $0<\\sen\\alpha<1$ و$0<\\cos\\alpha<1$؛ أما الظل فيمكن أن يأخذ أي قيمة موجبة. وكلما كبرت الزاوية كبر الجيب والظل وصغر جيب التمام. والزاوية الحادة الأخرى في المثلث هي $90°-\\alpha$، ومقابلها هو مجاور $\\alpha$: $\\sen(90°-\\alpha)=\\cos\\alpha$ و$\\cos(90°-\\alpha)=\\sen\\alpha$ و$\\tg(90°-\\alpha)=\\dfrac{1}{\\tg\\alpha}$.'
        ),
        problem: say('$\\sen 35°\\approx 0{,}57$, $\\cos 35°\\approx 0{,}82$ eta $\\tg 35°\\approx 0{,}70$ jakinda, kalkulatu 55°-ren arrazoiak.', 'Sabiendo que $\\sen 35°\\approx 0{,}57$, $\\cos 35°\\approx 0{,}82$ y $\\tg 35°\\approx 0{,}70$, calcula las razones de 55°.', 'علمًا أن $\\sen 35°\\approx 0{,}57$ و$\\cos 35°\\approx 0{,}82$ و$\\tg 35°\\approx 0{,}70$، احسب نسب الزاوية 55°.'),
        stepsKind: 'steps',
        steps: [
            { text: say('55° eta 35° osagarriak dira.', '55° y 35° son complementarios.', '55° و35° متتامّتان.'), math: same('$55°=90°-35°$') },
            { text: say('Sinua eta kosinua trukatzen dira.', 'El seno y el coseno se intercambian.', 'يتبادل الجيب وجيب التمام.'), math: same('$\\sen 55°=\\cos 35°\\approx 0{,}82$') },
            { text: say('Kosinua.', 'El coseno.', 'جيب التمام.'), math: same('$\\cos 55°=\\sen 35°\\approx 0{,}57$') },
            { text: say('Tangentea alderantzizkoa da.', 'La tangente es la inversa.', 'الظل هو المقلوب.'), math: same('$\\tg 55°=\\dfrac{1}{0{,}70}\\approx 1{,}43$') }
        ],
        example: same('$\\sen(90°-\\alpha)=\\cos\\alpha$'),
        takeaway: say('Angelu bera, arrazoi berak. Sinua eta kosinua 0 eta 1 artean. Osagarriek sinua eta kosinua trukatzen dituzte.', 'Mismo ángulo, mismas razones. Seno y coseno entre 0 y 1. Los complementarios intercambian seno y coseno.', 'الزاوية نفسها، النسب نفسها. الجيب وجيب التمام بين 0 و1. والمتتامّتان تتبادلان الجيب وجيب التمام.'),
        figure: (language) => <SimilarRatiosFigure language={language} />
    },
    {
        id: 'notable-angles',
        stage: 'ratios',
        title: say('30°, 45° eta 60°', '30°, 45° y 60°', '30° و45° و60°'),
        goal: say('30°, 45° eta 60°-ren arrazoien balio zehatzak ateratzea eta erabiltzea.', 'Obtener y usar los valores exactos de las razones de 30°, 45° y 60°.', 'استخراج القيم المضبوطة لنسب 30° و45° و60° واستعمالها.'),
        explanation: say(
            'Hiru angelu hauen arrazoiak kalkulagailurik gabe lortzen dira. 1eko aldeko karratu bat diagonalaz erditzean, 45°-ko triangelu bat geratzen da, 1eko katetoekin eta $\\sqrt{2}$-ko hipotenusarekin: $\\sen 45°=\\cos 45°=\\frac{1}{\\sqrt{2}}=\\frac{\\sqrt{2}}{2}$ eta $\\tg 45°=1$. 2ko aldeko triangelu aldeberdin bat altueraz erditzean, angeluak 30°, 60° eta 90° dira, eta aldeak 1, $\\sqrt{3}$ eta 2: $\\sen 30°=\\frac{1}{2}$, $\\cos 30°=\\frac{\\sqrt{3}}{2}$, $\\tg 30°=\\frac{\\sqrt{3}}{3}$; eta 60° osagarria denez, $\\sen 60°=\\frac{\\sqrt{3}}{2}$, $\\cos 60°=\\frac{1}{2}$, $\\tg 60°=\\sqrt{3}$. Eragiketetan erabili balio zehatzak eta hurbildu amaieran: $\\sqrt{2}/2\\approx 0{,}71$ eta $\\sqrt{3}/2\\approx 0{,}87$.',
            'Las razones de estos tres ángulos se obtienen sin calculadora. Al partir por la diagonal un cuadrado de lado 1 queda un triángulo de 45° con catetos 1 e hipotenusa $\\sqrt{2}$: $\\sen 45°=\\cos 45°=\\frac{1}{\\sqrt{2}}=\\frac{\\sqrt{2}}{2}$ y $\\tg 45°=1$. Al partir por la altura un triángulo equilátero de lado 2, los ángulos son 30°, 60° y 90°, y los lados 1, $\\sqrt{3}$ y 2: $\\sen 30°=\\frac{1}{2}$, $\\cos 30°=\\frac{\\sqrt{3}}{2}$, $\\tg 30°=\\frac{\\sqrt{3}}{3}$; y como 60° es su complementario, $\\sen 60°=\\frac{\\sqrt{3}}{2}$, $\\cos 60°=\\frac{1}{2}$, $\\tg 60°=\\sqrt{3}$. Opera con los valores exactos y aproxima al final: $\\sqrt{2}/2\\approx 0{,}71$ y $\\sqrt{3}/2\\approx 0{,}87$.',
            'تُستخرج نسب هذه الزوايا الثلاث دون آلة حاسبة. عند قسمة مربع ضلعه 1 بقطره ينتج مثلث زاويته 45° ضلعاه القائمان 1 ووتره $\\sqrt{2}$: $\\sen 45°=\\cos 45°=\\frac{1}{\\sqrt{2}}=\\frac{\\sqrt{2}}{2}$ و$\\tg 45°=1$. وعند قسمة مثلث متساوي الأضلاع ضلعه 2 بارتفاعه تكون الزوايا 30° و60° و90° والأضلاع 1 و$\\sqrt{3}$ و2: $\\sen 30°=\\frac{1}{2}$ و$\\cos 30°=\\frac{\\sqrt{3}}{2}$ و$\\tg 30°=\\frac{\\sqrt{3}}{3}$؛ وبما أن 60° متممتها فإن $\\sen 60°=\\frac{\\sqrt{3}}{2}$ و$\\cos 60°=\\frac{1}{2}$ و$\\tg 60°=\\sqrt{3}$. احسب بالقيم المضبوطة وقرّب في النهاية: $\\sqrt{2}/2\\approx 0{,}71$ و$\\sqrt{3}/2\\approx 0{,}87$.'
        ),
        problem: say('Kometa baten haria tenk dago eta lurrarekin 60° osatzen ditu. Kometa 5 m-ko altueran badago, zenbat neurtzen du hariak?', 'El hilo tenso de una cometa forma 60° con el suelo. Si la cometa está a 5 m de altura, ¿cuánto mide el hilo?', 'خيط طائرة ورقية مشدود يصنع زاوية 60° مع الأرض. إذا كانت الطائرة على ارتفاع 5 م، فكم طول الخيط؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Altuera aurkako katetoa da eta haria hipotenusa.', 'La altura es el cateto opuesto y el hilo la hipotenusa.', 'الارتفاع هو المقابل والخيط هو الوتر.'), math: same('$\\sen 60°=\\dfrac{5}{x}$') },
            { text: say('Balio zehatza ordezkatu.', 'Sustituye el valor exacto.', 'عوّض بالقيمة المضبوطة.'), math: same('$\\dfrac{\\sqrt{3}}{2}=\\dfrac{5}{x}$') },
            { text: say('Askatu: 5,77 m inguru.', 'Despeja: unos 5,77 m.', 'استخرج x: نحو 5.77 م.'), math: same('$x=\\dfrac{10}{\\sqrt{3}}\\approx 5{,}77$') }
        ],
        example: same('$\\sen 30°=\\dfrac{1}{2}$'),
        takeaway: say('45°: karratu-erdia. 30° eta 60°: triangelu aldeberdin-erdia. Balio zehatzak √2 eta √3-rekin.', '45°: medio cuadrado. 30° y 60°: medio triángulo equilátero. Valores exactos con √2 y √3.', '45°: نصف مربع. 30° و60°: نصف مثلث متساوي الأضلاع. القيم المضبوطة بـ √2 و√3.'),
        figure: (language) => <NotableAnglesFigure language={language} />
    },

    /* ---------- 2. Fundamental relations ---------- */
    {
        id: 'fundamental',
        stage: 'identities',
        title: say('Oinarrizko erlazioak', 'Relaciones fundamentales', 'العلاقات الأساسية'),
        goal: say('$\\sen^{2}\\alpha+\\cos^{2}\\alpha=1$ eta $\\tg\\alpha=\\frac{\\sen\\alpha}{\\cos\\alpha}$ ulertzea eta erabiltzea.', 'Entender y usar $\\sen^{2}\\alpha+\\cos^{2}\\alpha=1$ y $\\tg\\alpha=\\frac{\\sen\\alpha}{\\cos\\alpha}$.', 'فهم $\\sen^{2}\\alpha+\\cos^{2}\\alpha=1$ و$\\tg\\alpha=\\frac{\\sen\\alpha}{\\cos\\alpha}$ واستعمالهما.'),
        explanation: say(
            'Hartu 1eko hipotenusa duen triangelu angeluzuzen bat. Orduan katetoak $\\sen\\alpha$ (aurkakoa) eta $\\cos\\alpha$ (ondokoa) dira, eta Pitagorasek $\\sen^{2}\\alpha+\\cos^{2}\\alpha=1$ ematen du: edozein angelurentzat betetzen den oinarrizko erlazioa da. Gainera, $\\tg\\alpha=\\dfrac{\\text{aurkakoa}}{\\text{ondokoa}}=\\dfrac{\\sen\\alpha}{\\cos\\alpha}$. Lehena $\\cos^{2}\\alpha$-z zatituz hirugarren bat ateratzen da: $\\tg^{2}\\alpha+1=\\dfrac{1}{\\cos^{2}\\alpha}$. Erlazio hauekin arrazoi bat ezagututa beste biak kalkula daitezke. Adibidez, $\\sen\\alpha=0{,}6$ bada, $\\cos^{2}\\alpha=1-0{,}36=0{,}64$, $\\cos\\alpha=0{,}8$ eta $\\tg\\alpha=0{,}75$. Angelua zorrotza denean erroaren balio positiboa hartzen da.',
            'Toma un triángulo rectángulo de hipotenusa 1. Entonces los catetos son $\\sen\\alpha$ (el opuesto) y $\\cos\\alpha$ (el contiguo), y Pitágoras da $\\sen^{2}\\alpha+\\cos^{2}\\alpha=1$: es la relación fundamental, válida para cualquier ángulo. Además, $\\tg\\alpha=\\dfrac{\\text{opuesto}}{\\text{contiguo}}=\\dfrac{\\sen\\alpha}{\\cos\\alpha}$. Dividiendo la primera entre $\\cos^{2}\\alpha$ sale una tercera: $\\tg^{2}\\alpha+1=\\dfrac{1}{\\cos^{2}\\alpha}$. Con estas relaciones, conociendo una razón se calculan las otras dos. Por ejemplo, si $\\sen\\alpha=0{,}6$, $\\cos^{2}\\alpha=1-0{,}36=0{,}64$, $\\cos\\alpha=0{,}8$ y $\\tg\\alpha=0{,}75$. Cuando el ángulo es agudo, se toma el valor positivo de la raíz.',
            'خذ مثلثًا قائمًا وتره 1. عندئذ يكون الضلعان القائمان $\\sen\\alpha$ (المقابل) و$\\cos\\alpha$ (المجاور)، وتعطي فيثاغورس $\\sen^{2}\\alpha+\\cos^{2}\\alpha=1$: إنها العلاقة الأساسية، وتصح لكل زاوية. وكذلك $\\tg\\alpha=\\dfrac{\\sen\\alpha}{\\cos\\alpha}$ لأن الظل هو المقابل على المجاور. وبقسمة الأولى على $\\cos^{2}\\alpha$ نحصل على ثالثة: $\\tg^{2}\\alpha+1=\\dfrac{1}{\\cos^{2}\\alpha}$. وبهذه العلاقات نحسب النسبتين الأخريين إذا عرفنا واحدة. مثلًا، إذا كان $\\sen\\alpha=0{,}6$ فإن $\\cos^{2}\\alpha=1-0{,}36=0{,}64$ و$\\cos\\alpha=0{,}8$ و$\\tg\\alpha=0{,}75$. وعندما تكون الزاوية حادة نأخذ القيمة الموجبة للجذر.'
        ),
        problem: say('$\\alpha$ zorrotza da eta $\\sen\\alpha=0{,}6$. Kalkulatu $\\cos\\alpha$ eta $\\tg\\alpha$.', '$\\alpha$ es agudo y $\\sen\\alpha=0{,}6$. Calcula $\\cos\\alpha$ y $\\tg\\alpha$.', '$\\alpha$ حادة و$\\sen\\alpha=0{,}6$. احسب $\\cos\\alpha$ و$\\tg\\alpha$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Oinarrizko erlazioa.', 'La relación fundamental.', 'العلاقة الأساسية.'), math: same('$\\cos^{2}\\alpha=1-0{,}6^{2}=0{,}64$') },
            { text: say('Erro positiboa.', 'La raíz positiva.', 'الجذر الموجب.'), math: same('$\\cos\\alpha=0{,}8$') },
            { text: say('Tangentea: sinua zati kosinua.', 'Tangente: seno entre coseno.', 'الظل: الجيب على جيب التمام.'), math: same('$\\tg\\alpha=\\dfrac{0{,}6}{0{,}8}=0{,}75$') }
        ],
        example: same('$\\sen^{2}\\alpha+\\cos^{2}\\alpha=1$'),
        takeaway: say('Sinuaren karratua gehi kosinuaren karratua = 1. Tangentea = sinua / kosinua.', 'Seno al cuadrado más coseno al cuadrado = 1. Tangente = seno / coseno.', 'مربع الجيب زائد مربع جيب التمام = 1. الظل = الجيب / جيب التمام.'),
        figure: (language) => <FundamentalFigure language={language} />
    },
    {
        id: 'one-ratio',
        stage: 'identities',
        title: say('Arrazoi batetik besteetara', 'De una razón a las demás', 'من نسبة إلى النسب الأخرى'),
        goal: say('Tangentea edo arrazoi bat zatiki gisa emanda, beste biak modu zehatzean kalkulatzea.', 'Calcular de forma exacta las otras dos razones cuando dan la tangente u otra razón como fracción.', 'حساب النسبتين الأخريين بدقة عندما يُعطى الظل أو نسبة أخرى في صورة كسر.'),
        explanation: say(
            'Tangentea ematen dutenean, erabili $1+\\tg^{2}\\alpha=\\dfrac{1}{\\cos^{2}\\alpha}$: kosinua lortzen da, eta gero $\\sen\\alpha=\\tg\\alpha\\cdot\\cos\\alpha$. Adibidez, $\\tg\\alpha=2{,}4$ bada, $1+5{,}76=6{,}76$, $\\cos^{2}\\alpha=\\frac{1}{6{,}76}$ eta $\\cos\\alpha=\\frac{1}{2{,}6}=\\frac{5}{13}$. Beste bide bat triangelua marraztea da: $\\tg\\alpha=\\frac{12}{5}$ denez, hartu 12ko aurkako katetoa eta 5eko ondokoa; Pitagorasekin hipotenusa $\\sqrt{25+144}=13$ da, eta $\\sen\\alpha=\\frac{12}{13}$, $\\cos\\alpha=\\frac{5}{13}$. Arrazoia zatiki edo erro gisa ematen badute, ez pasa hamartarretara: eragin zatikiekin eta erroekin, eta sinplifikatu. Zorrotza ez bada, zeinua koadranteak erabakitzen du (azken etapa).',
            'Cuando dan la tangente, usa $1+\\tg^{2}\\alpha=\\dfrac{1}{\\cos^{2}\\alpha}$: sale el coseno, y después $\\sen\\alpha=\\tg\\alpha\\cdot\\cos\\alpha$. Por ejemplo, si $\\tg\\alpha=2{,}4$, $1+5{,}76=6{,}76$, $\\cos^{2}\\alpha=\\frac{1}{6{,}76}$ y $\\cos\\alpha=\\frac{1}{2{,}6}=\\frac{5}{13}$. Otro camino es dibujar el triángulo: como $\\tg\\alpha=\\frac{12}{5}$, toma cateto opuesto 12 y contiguo 5; con Pitágoras la hipotenusa es $\\sqrt{25+144}=13$, y $\\sen\\alpha=\\frac{12}{13}$, $\\cos\\alpha=\\frac{5}{13}$. Si la razón viene como fracción o con raíces, no pases a decimales: opera con fracciones y raíces, y simplifica. Si el ángulo no es agudo, el signo lo decide el cuadrante (última etapa).',
            'عندما يُعطى الظل استعمل $1+\\tg^{2}\\alpha=\\dfrac{1}{\\cos^{2}\\alpha}$: نجد جيب التمام، ثم $\\sen\\alpha=\\tg\\alpha\\cdot\\cos\\alpha$. مثلًا، إذا كان $\\tg\\alpha=2{,}4$ فإن $1+5{,}76=6{,}76$ و$\\cos^{2}\\alpha=\\frac{1}{6{,}76}$ و$\\cos\\alpha=\\frac{1}{2{,}6}=\\frac{5}{13}$. وطريقة أخرى هي رسم المثلث: بما أن $\\tg\\alpha=\\frac{12}{5}$ نأخذ المقابل 12 والمجاور 5؛ وبفيثاغورس يكون الوتر $\\sqrt{25+144}=13$، و$\\sen\\alpha=\\frac{12}{13}$ و$\\cos\\alpha=\\frac{5}{13}$. وإذا أُعطيت النسبة كسرًا أو بجذور فلا تنتقل إلى الأعداد العشرية: احسب بالكسور والجذور وبسّط. وإذا لم تكن الزاوية حادة فإن الربع يحدد الإشارة (المرحلة الأخيرة).'
        ),
        problem: say('$\\alpha$ zorrotza da eta $\\tg\\alpha=2{,}4$. Kalkulatu $\\cos\\alpha$ eta $\\sen\\alpha$.', '$\\alpha$ es agudo y $\\tg\\alpha=2{,}4$. Calcula $\\cos\\alpha$ y $\\sen\\alpha$.', '$\\alpha$ حادة و$\\tg\\alpha=2{,}4$. احسب $\\cos\\alpha$ و$\\sen\\alpha$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('1 + tangentearen karratua.', '1 más la tangente al cuadrado.', '1 زائد مربع الظل.'), math: same('$1+2{,}4^{2}=6{,}76$') },
            { text: say('Kosinua: 6,76-ren erroaren alderantzizkoa.', 'Coseno: el inverso de la raíz de 6,76.', 'جيب التمام: مقلوب جذر 6.76.'), math: same('$\\cos\\alpha=\\dfrac{1}{2{,}6}=\\dfrac{5}{13}$') },
            { text: say('Sinua: tangentea bider kosinua.', 'Seno: tangente por coseno.', 'الجيب: الظل في جيب التمام.'), math: same('$\\sen\\alpha=\\dfrac{12}{5}\\cdot\\dfrac{5}{13}=\\dfrac{12}{13}$') }
        ],
        example: same('$1+\\tg^{2}\\alpha=\\dfrac{1}{\\cos^{2}\\alpha}$'),
        takeaway: say('Tangentetik: lehenik kosinua, gero sinua. Edo marraztu triangelua eta osatu Pitagorasekin.', 'Desde la tangente: primero el coseno, luego el seno. O dibuja el triángulo y complétalo con Pitágoras.', 'من الظل: جيب التمام أولًا ثم الجيب. أو ارسم المثلث وأكمله بفيثاغورس.'),
        figure: (language) => <OneRatioFigure language={language} />
    },
    {
        id: 'calculator',
        stage: 'identities',
        title: say('Kalkulagailua trigonometrian', 'La calculadora en trigonometría', 'الآلة الحاسبة في حساب المثلثات'),
        goal: say('Angelu baten arrazoiak eta arrazoi baten angelua kalkulagailuarekin lortzea, gradu, minutu eta segundoetan ere.', 'Obtener con la calculadora las razones de un ángulo y el ángulo de una razón, también en grados, minutos y segundos.', 'الحصول بالآلة الحاسبة على نسب زاوية وعلى زاوية نسبة، وبالدرجات والدقائق والثواني أيضًا.'),
        explanation: say(
            'Ziurtatu kalkulagailua DEG moduan dagoela (graduak). Angelutik arrazoira: sakatu sin, cos edo tan eta angelua; adibidez $\\tg 22°\\approx 0{,}404$. Angelu sexagesimalak gradu, minutu eta segundotan ematen dira, $1°=60\'$ eta $1\'=60\'\'$ izanik; idazteko erabili ° ′ ″ tekla. Arrazoitik angelura: SHIFT eta tekla bera ($\\sin^{-1}$, $\\cos^{-1}$, $\\tan^{-1}$); $\\cos\\alpha=0{,}42$ bada, $\\alpha\\approx 65{,}17°$. Gradu hamartarrak gradu, minutu eta segundotara pasatzeko, biderkatu zati hamartarra 60z bi aldiz: $0{,}165\\cdot 60\\approx 9{,}92$, 9 minutu; $0{,}92\\cdot 60\\approx 55$ segundo; hau da, $65°\\,9\'\\,55\'\'$. Gorde balioak memorian eta hurbildu amaieran soilik.',
            'Asegúrate de que la calculadora está en modo DEG (grados). Del ángulo a la razón: pulsa sin, cos o tan y el ángulo; por ejemplo, $\\tg 22°\\approx 0{,}404$. Los ángulos sexagesimales se dan en grados, minutos y segundos, con $1°=60\'$ y $1\'=60\'\'$; para escribirlos usa la tecla ° ′ ″. De la razón al ángulo: SHIFT y la misma tecla ($\\sin^{-1}$, $\\cos^{-1}$, $\\tan^{-1}$); si $\\cos\\alpha=0{,}42$, $\\alpha\\approx 65{,}17°$. Para pasar grados decimales a grados, minutos y segundos, multiplica la parte decimal por 60 dos veces: $0{,}165\\cdot 60\\approx 9{,}92$, 9 minutos; $0{,}92\\cdot 60\\approx 55$ segundos; es decir, $65°\\,9\'\\,55\'\'$. Guarda los valores en la memoria y redondea solo al final.',
            'تأكد من أن الآلة الحاسبة بوضع DEG (الدرجات). من الزاوية إلى النسبة: اضغط sin أو cos أو tan ثم الزاوية؛ مثلًا $\\tg 22°\\approx 0{,}404$. وتُعطى الزوايا الستينية بالدرجات والدقائق والثواني، حيث $1°=60\'$ و$1\'=60\'\'$؛ ولكتابتها استعمل المفتاح ° ′ ″. من النسبة إلى الزاوية: SHIFT والمفتاح نفسه ($\\sin^{-1}$ و$\\cos^{-1}$ و$\\tan^{-1}$)؛ إذا كان $\\cos\\alpha=0{,}42$ فإن $\\alpha\\approx 65{,}17°$. ولتحويل الدرجات العشرية إلى درجات ودقائق وثوانٍ اضرب الجزء العشري في 60 مرتين: $0{,}165\\cdot 60\\approx 9{,}92$، أي 9 دقائق؛ و$0{,}92\\cdot 60\\approx 55$ ثانية؛ أي $65°\\,9\'\\,55\'\'$. احفظ القيم في الذاكرة ولا تقرّب إلا في النهاية.'
        ),
        problem: say('$\\cos\\alpha=0{,}42$ bada, aurkitu $\\alpha$ gradu, minutu eta segundotan.', 'Si $\\cos\\alpha=0{,}42$, halla $\\alpha$ en grados, minutos y segundos.', 'إذا كان $\\cos\\alpha=0{,}42$، فأوجد $\\alpha$ بالدرجات والدقائق والثواني.'),
        stepsKind: 'steps',
        steps: [
            { text: say('SHIFT cos 0,42.', 'SHIFT cos 0,42.', 'SHIFT cos 0.42.'), math: same('$\\alpha\\approx 65{,}165°$') },
            { text: say('Minutuak: zati hamartarra bider 60.', 'Minutos: la parte decimal por 60.', 'الدقائق: الجزء العشري في 60.'), math: same('$0{,}165\\cdot 60\\approx 9{,}92$') },
            { text: say('Segundoak: berriz bider 60.', 'Segundos: otra vez por 60.', 'الثواني: مرة أخرى في 60.'), math: same('$0{,}92\\cdot 60\\approx 55$') },
            { text: say('Emaitza.', 'Resultado.', 'النتيجة.'), math: same('$\\alpha\\approx 65°\\,9\'\\,55\'\'$') }
        ],
        example: same("$1°=60'$"),
        takeaway: say('DEG modua. sin, cos, tan: angelutik arrazoira. SHIFT: arrazoitik angelura. Minutuak eta segundoak: bider 60.', 'Modo DEG. sin, cos, tan: del ángulo a la razón. SHIFT: de la razón al ángulo. Minutos y segundos: por 60.', 'وضع DEG. sin وcos وtan: من الزاوية إلى النسبة. SHIFT: من النسبة إلى الزاوية. الدقائق والثواني: في 60.'),
        figure: (language) => <CalculatorFigure language={language} />
    },

    /* ---------- 3. Solving right triangles ---------- */
    {
        id: 'two-sides',
        stage: 'solving',
        title: say('Bi alde ezagututa', 'Conociendo dos lados', 'بمعرفة ضلعين'),
        goal: say('Bi alde ezagututa triangelu angeluzuzen bat ebaztea: hirugarren aldea eta bi angelu zorrotzak.', 'Resolver un triángulo rectángulo conociendo dos lados: el tercer lado y los dos ángulos agudos.', 'حل مثلث قائم بمعرفة ضلعين: الضلع الثالث والزاويتين الحادتين.'),
        explanation: say(
            'Triangelu bat ebaztea haren hiru aldeak eta hiru angeluak aurkitzea da. Angeluzuzenean angelu bat 90° da beti, eta beste biak osagarriak dira: $\\alpha+\\beta=90°$. Bi alde ezagutzen direnean, hirugarrena Pitagorasekin ateratzen da, eta angelu bat bi alde horiek lotzen dituen arrazoiarekin: bi katetoekin tangentea, katetoa eta hipotenusarekin sinua edo kosinua. Gero SHIFT teklarekin angelua lortzen da, eta bestea $90°$-tik kenduz. Adibidez, 5 eta 12ko katetoekin: $a=13$, $\\tg\\alpha=\\frac{5}{12}$, $\\alpha\\approx 22{,}6°$ eta $\\beta\\approx 67{,}4°$. Egiaztapena: angelu handienaren aurrean alde handiena dago.',
            'Resolver un triángulo es hallar sus tres lados y sus tres ángulos. En el rectángulo un ángulo mide siempre 90° y los otros dos son complementarios: $\\alpha+\\beta=90°$. Si se conocen dos lados, el tercero sale con Pitágoras, y un ángulo con la razón que relaciona esos dos lados: con los dos catetos, la tangente; con un cateto y la hipotenusa, el seno o el coseno. Después SHIFT da el ángulo, y el otro se obtiene restando de $90°$. Por ejemplo, con catetos 5 y 12: $a=13$, $\\tg\\alpha=\\frac{5}{12}$, $\\alpha\\approx 22{,}6°$ y $\\beta\\approx 67{,}4°$. Comprobación: frente al ángulo mayor está el lado mayor.',
            'حل المثلث هو إيجاد أضلاعه الثلاثة وزواياه الثلاث. في المثلث القائم تكون إحدى الزوايا 90° دائمًا والأخريان متتامّتان: $\\alpha+\\beta=90°$. وإذا عُرف ضلعان فإن الثالث يُحسب بفيثاغورس، والزاوية بالنسبة التي تربط هذين الضلعين: بالضلعين القائمين الظل، وبضلع قائم والوتر الجيب أو جيب التمام. ثم يعطي SHIFT الزاوية، والأخرى نطرحها من $90°$. مثلًا، بضلعين قائمين 5 و12: $a=13$ و$\\tg\\alpha=\\frac{5}{12}$ و$\\alpha\\approx 22{,}6°$ و$\\beta\\approx 67{,}4°$. للتحقق: أمام الزاوية الكبرى يقع الضلع الأكبر.'
        ),
        problem: say('Triangelu angeluzuzen baten katetoak 5 cm eta 12 cm dira. Ebatzi triangelua.', 'Los catetos de un triángulo rectángulo miden 5 cm y 12 cm. Resuelve el triángulo.', 'الضلعان القائمان لمثلث قائم 5 سم و12 سم. حلّ المثلث.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hipotenusa.', 'La hipotenusa.', 'الوتر.'), math: same('$a=\\sqrt{5^{2}+12^{2}}=13$') },
            { text: say('Bi katetoekin: tangentea.', 'Con los dos catetos: la tangente.', 'بالضلعين القائمين: الظل.'), math: same('$\\tg\\alpha=\\dfrac{5}{12}\\to\\alpha\\approx 22{,}6°$') },
            { text: say('Beste angelua.', 'El otro ángulo.', 'الزاوية الأخرى.'), math: same('$\\beta\\approx 90°-22{,}6°=67{,}4°$') }
        ],
        example: same('$\\alpha+\\beta=90°$'),
        takeaway: say('Hirugarren aldea: Pitagoras. Angelu bat: bi aldeak lotzen dituen arrazoia eta SHIFT. Bestea: 90° ken.', 'Tercer lado: Pitágoras. Un ángulo: la razón que une los dos lados y SHIFT. El otro: 90° menos.', 'الضلع الثالث: فيثاغورس. زاوية: النسبة التي تربط الضلعين وSHIFT. والأخرى: 90° ناقص.'),
        figure: (language) => <SolveRightFigure language={language} given="two-sides" />
    },
    {
        id: 'side-angle',
        stage: 'solving',
        title: say('Alde bat eta angelu bat ezagututa', 'Conociendo un lado y un ángulo', 'بمعرفة ضلع وزاوية'),
        goal: say('Alde bat eta angelu zorrotz bat ezagututa triangelu angeluzuzen bat ebaztea.', 'Resolver un triángulo rectángulo conociendo un lado y un ángulo agudo.', 'حل مثلث قائم بمعرفة ضلع وزاوية حادة.'),
        explanation: say(
            'Beste angelu zorrotza berehala ateratzen da: $90°-\\alpha$. Alde bat lortzeko, aukeratu ezaguna eta bilatzen duzuna lotzen dituen arrazoia, eta askatu: aurkakoa eta hipotenusa, sinua; ondokoa eta hipotenusa, kosinua; bi katetoak, tangentea. 37°-ko angeluarekin eta 87 m-ko aurkako katetoarekin: $\\sen 37°=\\frac{87}{a}$, beraz $a=\\frac{87}{\\sen 37°}\\approx 144{,}56$ m; eta $\\tg 37°=\\frac{87}{c}$, beraz $c=\\frac{87}{\\tg 37°}\\approx 115{,}45$ m. Ezezaguna zenbakitzailean badago, biderkatu; izendatzailean badago, zatitu. Hirugarren aldea Pitagorasekin egiazta daiteke, baina hobe da datuetatik zuzenean kalkulatzea, hurbiltze-akatsak ez metatzeko.',
            'El otro ángulo agudo sale enseguida: $90°-\\alpha$. Para un lado, elige la razón que une el lado conocido y el buscado, y despeja: opuesto e hipotenusa, el seno; contiguo e hipotenusa, el coseno; los dos catetos, la tangente. Con un ángulo de 37° y el cateto opuesto de 87 m: $\\sen 37°=\\frac{87}{a}$, así que $a=\\frac{87}{\\sen 37°}\\approx 144{,}56$ m; y $\\tg 37°=\\frac{87}{c}$, así que $c=\\frac{87}{\\tg 37°}\\approx 115{,}45$ m. Si la incógnita está en el numerador, multiplica; si está en el denominador, divide. El tercer lado puede comprobarse con Pitágoras, pero conviene calcularlo directamente de los datos para no acumular errores de redondeo.',
            'الزاوية الحادة الأخرى تُستخرج مباشرة: $90°-\\alpha$. ولإيجاد ضلع اختر النسبة التي تربط الضلع المعلوم بالمطلوب ثم استخرجه: المقابل والوتر، الجيب؛ المجاور والوتر، جيب التمام؛ الضلعان القائمان، الظل. بزاوية 37° وضلع مقابل 87 م: $\\sen 37°=\\frac{87}{a}$، إذن $a=\\frac{87}{\\sen 37°}\\approx 144{,}56$ م؛ و$\\tg 37°=\\frac{87}{c}$، إذن $c=\\frac{87}{\\tg 37°}\\approx 115{,}45$ م. إذا كان المجهول في البسط فاضرب، وإذا كان في المقام فاقسم. ويمكن التحقق من الضلع الثالث بفيثاغورس، لكن الأفضل حسابه من المعطيات مباشرة كي لا تتراكم أخطاء التقريب.'
        ),
        problem: say('Triangelu angeluzuzen batean angelu zorrotz bat 37° da eta haren aurkako katetoa 87 m. Ebatzi triangelua.', 'En un triángulo rectángulo un ángulo agudo mide 37° y su cateto opuesto 87 m. Resuelve el triángulo.', 'في مثلث قائم زاوية حادة قياسها 37° والضلع المقابل لها 87 م. حلّ المثلث.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Beste angelua.', 'El otro ángulo.', 'الزاوية الأخرى.'), math: same('$\\beta=90°-37°=53°$') },
            { text: say('Hipotenusa, sinuarekin.', 'La hipotenusa, con el seno.', 'الوتر بالجيب.'), math: same('$a=\\dfrac{87}{\\sen 37°}\\approx 144{,}56$') },
            { text: say('Beste katetoa, tangentearekin.', 'El otro cateto, con la tangente.', 'الضلع الآخر بالظل.'), math: same('$c=\\dfrac{87}{\\tg 37°}\\approx 115{,}45$') }
        ],
        example: same('$a=\\dfrac{87}{\\sen 37°}$'),
        takeaway: say('Aukeratu ezaguna eta ezezaguna lotzen dituen arrazoia. Zenbakitzailean: biderkatu. Izendatzailean: zatitu.', 'Elige la razón que une el dato y la incógnita. En el numerador: multiplica. En el denominador: divide.', 'اختر النسبة التي تربط المعطى بالمجهول. في البسط: اضرب. في المقام: اقسم.'),
        figure: (language) => <SolveRightFigure language={language} given="side-angle" />
    },
    {
        id: 'elevation',
        stage: 'solving',
        title: say('Goratze- eta beheratze-angeluak', 'Ángulos de elevación y de depresión', 'زاويتا الارتفاع والانخفاض'),
        goal: say('Altuerak eta distantziak kalkulatzea goratze- eta beheratze-angeluekin.', 'Calcular alturas y distancias con ángulos de elevación y de depresión.', 'حساب الارتفاعات والمسافات بزاويتي الارتفاع والانخفاض.'),
        explanation: say(
            'Goratze-angelua horizontalaren eta goian dagoen objektu baterako ikus-lerroaren artean dago; beheratze-angelua, horizontalaren eta behean dagoen objektu baterako ikus-lerroaren artean. Bi kasuetan triangelu angeluzuzen bat osatzen da, altuera bertikalarekin eta distantzia horizontalarekin katetoak izanik, eta tangentea da gehien erabiltzen den arrazoia. Zuhaitz batetik 20 m-ra goialdea 40°-ko angeluarekin ikusten bada, $h=20\\cdot\\tg 40°\\approx 16{,}78$ m. 50 m-ko itsasargi batetik txalupa bat 30°-ko beheratze-angeluarekin ikusten bada, $\\tg 30°=\\frac{50}{d}$ eta $d=\\frac{50}{\\tg 30°}\\approx 86{,}60$ m. Begien altuera ematen badute, gehitu amaieran.',
            'El ángulo de elevación está entre la horizontal y la visual hacia un objeto situado más arriba; el de depresión, entre la horizontal y la visual hacia un objeto situado más abajo. En ambos casos se forma un triángulo rectángulo cuyos catetos son la altura vertical y la distancia horizontal, y la razón más usada es la tangente. Si a 20 m de un árbol se ve la copa con un ángulo de 40°, $h=20\\cdot\\tg 40°\\approx 16{,}78$ m. Si desde un faro de 50 m se ve una barca con un ángulo de depresión de 30°, $\\tg 30°=\\frac{50}{d}$ y $d=\\frac{50}{\\tg 30°}\\approx 86{,}60$ m. Si dan la altura de los ojos, súmala al final.',
            'زاوية الارتفاع بين الأفقي وخط النظر نحو جسم أعلى؛ وزاوية الانخفاض بين الأفقي وخط النظر نحو جسم أسفل. وفي الحالتين يتكوّن مثلث قائم ضلعاه القائمان الارتفاع العمودي والمسافة الأفقية، والنسبة الأكثر استعمالًا هي الظل. إذا رُئيت قمة شجرة من بُعد 20 م بزاوية 40° فإن $h=20\\cdot\\tg 40°\\approx 16{,}78$ م. وإذا رُئي قارب من منارة ارتفاعها 50 م بزاوية انخفاض 30° فإن $\\tg 30°=\\frac{50}{d}$ و$d=\\frac{50}{\\tg 30°}\\approx 86{,}60$ م. وإذا أُعطي ارتفاع العينين فأضفه في النهاية.'
        ),
        problem: say('Zuhaitz batetik 20 m-ra gaude eta haren goialdea 40°-ko goratze-angeluarekin ikusten dugu. Zein da zuhaitzaren altuera?', 'Estamos a 20 m de un árbol y vemos su copa con un ángulo de elevación de 40°. ¿Qué altura tiene el árbol?', 'نحن على بعد 20 م من شجرة ونرى قمتها بزاوية ارتفاع 40°. ما ارتفاع الشجرة؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Altuera aurkakoa da eta 20 m ondokoa.', 'La altura es el opuesto y los 20 m el contiguo.', 'الارتفاع هو المقابل و20 م المجاور.'), math: same('$\\tg 40°=\\dfrac{h}{20}$') },
            { text: say('Askatu: 16,78 m inguru.', 'Despeja: unos 16,78 m.', 'استخرج h: نحو 16.78 م.'), math: same('$h=20\\cdot\\tg 40°\\approx 16{,}78$') }
        ],
        example: same('$h=d\\cdot\\tg\\alpha$'),
        takeaway: say('Goratzea: begiratu gora. Beheratzea: begiratu behera. Altuera eta distantzia horizontala: tangentea.', 'Elevación: mirar hacia arriba. Depresión: hacia abajo. Altura y distancia horizontal: la tangente.', 'الارتفاع: النظر إلى الأعلى. الانخفاض: إلى الأسفل. الارتفاع والمسافة الأفقية: الظل.'),
        figure: (language) => <ElevationFigure language={language} />
    },

    /* ---------- 4. Heights, distances and areas ---------- */
    {
        id: 'double-observation',
        stage: 'problems',
        title: say('Behaketa bikoitza', 'La doble observación', 'الرصد المزدوج'),
        goal: say('Oinarrira iritsi ezin denean altuera bat kalkulatzea, bi puntutatik neurtutako bi angeluekin.', 'Calcular una altura cuando no se puede llegar al pie, con dos ángulos medidos desde dos puntos.', 'حساب ارتفاع لا يمكن بلوغ قاعدته بزاويتين مقيستين من نقطتين.'),
        explanation: say(
            'Ibai baten beste aldean dagoen zuhaitz baten altuera neurtzeko, ezin da haren oinarrirainoko distantzia neurtu. Bi neurketa egiten dira: puntu batetik goialdea 50°-ko angeluarekin ikusten da; 10 m atzera eginda, 25°-koarekin. Bi ezezagun daude, altuera $y$ eta lehen puntutiko distantzia $x$, eta triangelu angeluzuzen bakoitzak ekuazio bat ematen du: $y=x\\cdot\\tg 50°$ eta $y=(x+10)\\cdot\\tg 25°$. Berdinduz: $x\\cdot 1{,}1918=(x+10)\\cdot 0{,}4663$, $0{,}7255\\,x=4{,}663$, $x\\approx 6{,}43$ m eta $y\\approx 7{,}66$ m. Teknika bera balio du mendi, eraikin edo dorre batentzat: bi angelu, haien arteko distantzia, eta bi ekuazioko sistema bat.',
            'Para medir la altura de un árbol al otro lado de un río no se puede medir la distancia hasta su pie. Se hacen dos mediciones: desde un punto se ve la copa con un ángulo de 50°; alejándose 10 m, con uno de 25°. Hay dos incógnitas, la altura $y$ y la distancia $x$ desde el primer punto, y cada triángulo rectángulo da una ecuación: $y=x\\cdot\\tg 50°$ e $y=(x+10)\\cdot\\tg 25°$. Igualando: $x\\cdot 1{,}1918=(x+10)\\cdot 0{,}4663$, $0{,}7255\\,x=4{,}663$, $x\\approx 6{,}43$ m e $y\\approx 7{,}66$ m. La misma técnica sirve para una montaña, un edificio o una torre: dos ángulos, la distancia entre ellos y un sistema de dos ecuaciones.',
            'لقياس ارتفاع شجرة على الضفة الأخرى من نهر لا يمكن قياس المسافة إلى قاعدتها. فنقوم بقياسين: من نقطة نرى القمة بزاوية 50°، وبعد الابتعاد 10 م نراها بزاوية 25°. هناك مجهولان، الارتفاع $y$ والمسافة $x$ من النقطة الأولى، وكل مثلث قائم يعطي معادلة: $y=x\\cdot\\tg 50°$ و$y=(x+10)\\cdot\\tg 25°$. وبالمساواة: $x\\cdot 1{,}1918=(x+10)\\cdot 0{,}4663$ و$0{,}7255\\,x=4{,}663$ و$x\\approx 6{,}43$ م و$y\\approx 7{,}66$ م. والطريقة نفسها تصلح لجبل أو مبنى أو برج: زاويتان والمسافة بينهما ونظام من معادلتين.'
        ),
        problem: say('Zuhaitz baten goialdea 50°-ko angeluarekin ikusten da; 10 m urrundu ondoren, 25°-koarekin. Kalkulatu zuhaitzaren altuera.', 'La copa de un árbol se ve con un ángulo de 50°; tras alejarse 10 m, con uno de 25°. Calcula la altura del árbol.', 'تُرى قمة شجرة بزاوية 50°، وبعد الابتعاد 10 م بزاوية 25°. احسب ارتفاع الشجرة.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bi triangelu, bi ekuazio.', 'Dos triángulos, dos ecuaciones.', 'مثلثان ومعادلتان.'), math: same('$y=x\\cdot\\tg 50°$') },
            { text: say('Urruneko puntutik.', 'Desde el punto lejano.', 'من النقطة البعيدة.'), math: same('$y=(x+10)\\cdot\\tg 25°$') },
            { text: say('Berdindu eta askatu x.', 'Iguala y despeja x.', 'ساوِ واستخرج x.'), math: same('$0{,}7255\\,x=4{,}663\\to x\\approx 6{,}43$') },
            { text: say('Altuera: 7,66 m inguru.', 'Altura: unos 7,66 m.', 'الارتفاع: نحو 7.66 م.'), math: same('$y\\approx 6{,}43\\cdot 1{,}1918\\approx 7{,}66$') }
        ],
        example: same('$y=x\\cdot\\tg\\alpha$'),
        takeaway: say('Bi angelu eta haien arteko distantzia: bi ekuazio, bi ezezagun (distantzia eta altuera).', 'Dos ángulos y la distancia entre ellos: dos ecuaciones, dos incógnitas (distancia y altura).', 'زاويتان والمسافة بينهما: معادلتان ومجهولان (المسافة والارتفاع).'),
        figure: (language) => <DoubleObservationFigure language={language} />
    },
    {
        id: 'oblique',
        stage: 'problems',
        title: say('Triangelu ez-angeluzuzenak altuerarekin', 'Triángulos oblicuángulos con la altura', 'المثلثات غير القائمة بالارتفاع'),
        goal: say('Triangelu ez-angeluzuzen bat ebaztea, altuera marraztuz bi triangelu angeluzuzenetan banatuta.', 'Resolver un triángulo oblicuángulo dividiéndolo en dos triángulos rectángulos con una altura.', 'حل مثلث غير قائم بتقسيمه إلى مثلثين قائمين بواسطة ارتفاع.'),
        explanation: say(
            'Triangelu batek angelu zuzenik ez badu, marraztu altuera bat: bi triangelu angeluzuzen sortzen dira, eta bakoitzean arrazoiak erabil daitezke. Ondo aukeratu: altuerak angelu ezagun bat zatitu behar ez du, eta ezagutzen den aldea triangelu angeluzuzen baten hipotenusa izatea komeni da. $AB=37$, $AC=50$ eta $A=32°$ dituen triangeluan, $B$-tik altuera marraztuta: $h=37\\cdot\\sen 32°\\approx 19{,}61$ eta $AH=37\\cdot\\cos 32°\\approx 31{,}38$; beraz $HC=50-31{,}38=18{,}62$, eta Pitagorasekin $BC\\approx 27{,}04$. Bi angelu eta haien arteko aldea ematen badituzte, altuerak bi ekuazio ematen ditu, behaketa bikoitzean bezala.',
            'Si un triángulo no tiene ángulo recto, traza una altura: aparecen dos triángulos rectángulos y en cada uno se pueden usar las razones. Elige bien: la altura no debe partir un ángulo conocido, y conviene que el lado conocido sea la hipotenusa de un triángulo rectángulo. En el triángulo con $AB=37$, $AC=50$ y $A=32°$, trazando la altura desde $B$: $h=37\\cdot\\sen 32°\\approx 19{,}61$ y $AH=37\\cdot\\cos 32°\\approx 31{,}38$; por tanto $HC=50-31{,}38=18{,}62$, y con Pitágoras $BC\\approx 27{,}04$. Si dan dos ángulos y el lado entre ellos, la altura da dos ecuaciones, como en la doble observación.',
            'إذا لم يكن في المثلث زاوية قائمة فارسم ارتفاعًا: يظهر مثلثان قائمان ويمكن استعمال النسب في كل منهما. أحسن الاختيار: لا يجب أن يقسم الارتفاع زاوية معلومة، ومن الأفضل أن يكون الضلع المعلوم وتر مثلث قائم. في المثلث الذي فيه $AB=37$ و$AC=50$ و$A=32°$، برسم الارتفاع من $B$: $h=37\\cdot\\sen 32°\\approx 19{,}61$ و$AH=37\\cdot\\cos 32°\\approx 31{,}38$؛ إذن $HC=50-31{,}38=18{,}62$، وبفيثاغورس $BC\\approx 27{,}04$. وإذا أُعطيت زاويتان والضلع بينهما فإن الارتفاع يعطي معادلتين كما في الرصد المزدوج.'
        ),
        problem: say('ABC triangeluan $AB=37$ cm, $AC=50$ cm eta $A=32°$. Kalkulatu BC.', 'En el triángulo ABC, $AB=37$ cm, $AC=50$ cm y $A=32°$. Calcula BC.', 'في المثلث ABC: $AB=37$ سم و$AC=50$ سم و$A=32°$. احسب BC.'),
        stepsKind: 'steps',
        steps: [
            { text: say('B-tiko altuera.', 'La altura desde B.', 'الارتفاع من B.'), math: same('$h=37\\cdot\\sen 32°\\approx 19{,}61$') },
            { text: say('Altuerak AC zatitzen du.', 'La altura parte AC.', 'الارتفاع يقسم AC.'), math: same('$37\\cdot\\cos 32°\\approx 31{,}38$') },
            { text: say('Gainerako zatia.', 'El trozo que queda.', 'الجزء الباقي.'), math: same('$50-31{,}38=18{,}62$') },
            { text: say('Pitagoras: 27,04 cm inguru.', 'Pitágoras: unos 27,04 cm.', 'فيثاغورس: نحو 27.04 سم.'), math: same('$BC\\approx 27{,}04$') }
        ],
        example: same('$h=c\\cdot\\sen A$'),
        takeaway: say('Angelu zuzenik ez? Marraztu altuera: bi triangelu angeluzuzen.', '¿Sin ángulo recto? Traza una altura: dos triángulos rectángulos.', 'لا زاوية قائمة؟ ارسم ارتفاعًا: مثلثان قائمان.'),
        figure: (language) => <ObliqueFigure language={language} />
    },
    {
        id: 'trig-area',
        stage: 'problems',
        title: say('Azalerak trigonometriarekin', 'Áreas con trigonometría', 'المساحات بحساب المثلثات'),
        goal: say('Triangeluen, paralelogramoen eta poligono erregularren azalerak arrazoi trigonometrikoekin kalkulatzea.', 'Calcular áreas de triángulos, paralelogramos y polígonos regulares con las razones trigonométricas.', 'حساب مساحات المثلثات ومتوازيات الأضلاع والمضلعات المنتظمة بالنسب المثلثية.'),
        explanation: say(
            'Triangelu baten bi alde $b$ eta $c$ eta haien arteko $A$ angelua ezagutzen badira, $c$ aldeak eta altuerak triangelu angeluzuzen bat osatzen dute: $h=c\\cdot\\sen A$. Beraz, $\\text{Azalera}=\\dfrac{b\\cdot h}{2}=\\dfrac{1}{2}\\cdot b\\cdot c\\cdot\\sen A$. 6 eta 9ko aldeekin eta 50°-ko angeluarekin: $\\frac{1}{2}\\cdot 9\\cdot 6\\cdot\\sen 50°\\approx 20{,}68$. Paralelogramo bat bi triangelu berdin dira: $\\text{Azalera}=a\\cdot b\\cdot\\sen\\alpha$. $n$ aldeko poligono erregularrean, zentroko angelua $\\frac{360°}{n}$ da, eta apotemak erdibitzen du: $\\tg\\frac{180°}{n}=\\frac{l/2}{\\text{ap}}$. 6 cm-ko aldeko pentagonoan, $\\text{ap}=\\frac{3}{\\tg 36°}\\approx 4{,}13$ eta azalera $\\approx 61{,}94$ cm².',
            'Si se conocen dos lados $b$ y $c$ de un triángulo y el ángulo $A$ que forman, el lado $c$ y la altura forman un triángulo rectángulo: $h=c\\cdot\\sen A$. Por tanto, $\\text{Área}=\\dfrac{b\\cdot h}{2}=\\dfrac{1}{2}\\cdot b\\cdot c\\cdot\\sen A$. Con lados 6 y 9 y un ángulo de 50°: $\\frac{1}{2}\\cdot 9\\cdot 6\\cdot\\sen 50°\\approx 20{,}68$. Un paralelogramo son dos triángulos iguales: $\\text{Área}=a\\cdot b\\cdot\\sen\\alpha$. En un polígono regular de $n$ lados, el ángulo central es $\\frac{360°}{n}$ y la apotema lo divide por la mitad: $\\tg\\frac{180°}{n}=\\frac{l/2}{\\text{ap}}$. En el pentágono de 6 cm de lado, $\\text{ap}=\\frac{3}{\\tg 36°}\\approx 4{,}13$ y el área $\\approx 61{,}94$ cm².',
            'إذا عُرف ضلعان $b$ و$c$ في مثلث والزاوية $A$ بينهما، فإن الضلع $c$ والارتفاع يكوّنان مثلثًا قائمًا: $h=c\\cdot\\sen A$. إذن المساحة $S=\\dfrac{b\\cdot h}{2}=\\dfrac{1}{2}\\cdot b\\cdot c\\cdot\\sen A$. بضلعين 6 و9 وزاوية 50°: $\\frac{1}{2}\\cdot 9\\cdot 6\\cdot\\sen 50°\\approx 20{,}68$. ومتوازي الأضلاع مثلثان متطابقان: $S=a\\cdot b\\cdot\\sen\\alpha$. وفي المضلع المنتظم ذي $n$ ضلعًا تكون الزاوية المركزية $\\frac{360°}{n}$ والعامد ينصّفها: $\\tg\\frac{180°}{n}=\\frac{l/2}{a_p}$. في المخمس الذي ضلعه 6 سم، $a_p=\\frac{3}{\\tg 36°}\\approx 4{,}13$ والمساحة $\\approx 61{,}94$ سم².'
        ),
        problem: say('Triangelu baten bi aldeak 6 cm eta 9 cm dira, eta haien arteko angelua 50°. Kalkulatu azalera.', 'Dos lados de un triángulo miden 6 cm y 9 cm y forman un ángulo de 50°. Calcula su área.', 'ضلعان في مثلث طولاهما 6 سم و9 سم والزاوية بينهما 50°. احسب مساحته.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Altuera, sinuarekin.', 'La altura, con el seno.', 'الارتفاع بالجيب.'), math: same('$h=6\\cdot\\sen 50°\\approx 4{,}60$') },
            { text: say('Oinarria bider altuera zati 2: 20,68 cm² inguru.', 'Base por altura entre 2: unos 20,68 cm².', 'القاعدة في الارتفاع على 2: نحو 20.68 سم².'), math: same('$\\dfrac{9\\cdot 6\\cdot\\sen 50°}{2}\\approx 20{,}68$') }
        ],
        example: same('$\\dfrac{1}{2}\\,b\\,c\\,\\sen A$'),
        takeaway: say('Bi alde eta haien arteko angelua: azalera = ½ · b · c · sinua.', 'Dos lados y el ángulo que forman: área = ½ · b · c · seno.', 'ضلعان والزاوية بينهما: المساحة = ½ · b · c · الجيب.'),
        figure: (language) => <TrigAreaFigure language={language} />
    },

    /* ---------- 5. The unit circle ---------- */
    {
        id: 'unit-circle',
        stage: 'circle',
        title: say('Edozein angeluren arrazoiak', 'Razones de cualquier ángulo', 'نسب أي زاوية'),
        goal: say('0° eta 360° arteko angeluen arrazoiak zirkunferentzia goniometrikoan irakurtzea eta haien zeinuak jakitea.', 'Leer en la circunferencia goniométrica las razones de ángulos entre 0° y 360° y conocer sus signos.', 'قراءة نسب الزوايا بين 0° و360° في الدائرة المثلثية ومعرفة إشاراتها.'),
        explanation: say(
            'Zirkunferentzia goniometrikoak 1eko erradioa du eta zentroa jatorrian. Angelu bat ardatz positibotik neurtzen da, erlojuaren orratzen aurkako noranzkoan; haren aldeak zirkunferentzia $P(x,y)$ puntuan mozten du. Orduan $\\cos\\alpha=x$, $\\sen\\alpha=y$ eta $\\tg\\alpha=\\dfrac{y}{x}$, angelu zorrotzetan bezala, baina orain zeinuekin. I. koadrantean dena positiboa da; II.ean sinua bakarrik; III.ean tangentea bakarrik; IV.ean kosinua bakarrik. Angelu bereziak: $\\sen 90°=1$, $\\cos 180°=-1$, $\\sen 270°=-1$; $\\tg 90°$ eta $\\tg 270°$ ez dira existitzen ($x=0$). $\\sen^{2}\\alpha+\\cos^{2}\\alpha=1$ betetzen da beti; erroa ateratzean, koadranteak erabakitzen du zeinua.',
            'La circunferencia goniométrica tiene radio 1 y centro en el origen. Un ángulo se mide desde el semieje positivo de abscisas, en sentido contrario a las agujas del reloj; su lado corta la circunferencia en un punto $P(x,y)$. Entonces $\\cos\\alpha=x$, $\\sen\\alpha=y$ y $\\tg\\alpha=\\dfrac{y}{x}$, como en los ángulos agudos, pero ahora con signo. En el I cuadrante todo es positivo; en el II, solo el seno; en el III, solo la tangente; en el IV, solo el coseno. Ángulos especiales: $\\sen 90°=1$, $\\cos 180°=-1$, $\\sen 270°=-1$; $\\tg 90°$ y $\\tg 270°$ no existen ($x=0$). Siempre se cumple $\\sen^{2}\\alpha+\\cos^{2}\\alpha=1$; al sacar la raíz, el cuadrante decide el signo.',
            'نصف قطر الدائرة المثلثية 1 ومركزها الأصل. تُقاس الزاوية من نصف محور الفواصل الموجب عكس اتجاه عقارب الساعة؛ ويقطع ضلعها الدائرة في نقطة $P(x,y)$. عندئذ $\\cos\\alpha=x$ و$\\sen\\alpha=y$ و$\\tg\\alpha=\\dfrac{y}{x}$، كما في الزوايا الحادة لكن بالإشارة الآن. في الربع الأول كل النسب موجبة؛ وفي الثاني الجيب فقط؛ وفي الثالث الظل فقط؛ وفي الرابع جيب التمام فقط. زوايا خاصة: $\\sen 90°=1$ و$\\cos 180°=-1$ و$\\sen 270°=-1$؛ و$\\tg 90°$ و$\\tg 270°$ غير موجودين ($x=0$). وتتحقق دائمًا $\\sen^{2}\\alpha+\\cos^{2}\\alpha=1$؛ وعند استخراج الجذر يحدد الربع الإشارة.'
        ),
        problem: say('$\\sen\\alpha=0{,}6$ eta $\\alpha$ II. koadrantean dago. Kalkulatu $\\cos\\alpha$ eta $\\tg\\alpha$.', '$\\sen\\alpha=0{,}6$ y $\\alpha$ está en el II cuadrante. Calcula $\\cos\\alpha$ y $\\tg\\alpha$.', '$\\sen\\alpha=0{,}6$ و$\\alpha$ في الربع الثاني. احسب $\\cos\\alpha$ و$\\tg\\alpha$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Oinarrizko erlazioa.', 'La relación fundamental.', 'العلاقة الأساسية.'), math: same('$\\cos^{2}\\alpha=1-0{,}36=0{,}64$') },
            { text: say('II. koadrantean kosinua negatiboa da.', 'En el II cuadrante el coseno es negativo.', 'في الربع الثاني جيب التمام سالب.'), math: same('$\\cos\\alpha=-0{,}8$') },
            { text: say('Tangentea.', 'La tangente.', 'الظل.'), math: same('$\\tg\\alpha=\\dfrac{0{,}6}{-0{,}8}=-0{,}75$') }
        ],
        example: same('$P(\\cos\\alpha,\\ \\sen\\alpha)$'),
        takeaway: say('Kosinua abzisa da eta sinua ordenatua. I: dena +. II: sinua +. III: tangentea +. IV: kosinua +.', 'El coseno es la abscisa y el seno la ordenada. I: todo +. II: seno +. III: tangente +. IV: coseno +.', 'جيب التمام هو الفاصلة والجيب هو الترتيب. الأول: الكل +. الثاني: الجيب +. الثالث: الظل +. الرابع: جيب التمام +.'),
        figure: (language) => <UnitCircleFigure language={language} />
    },
    {
        id: 'reduction',
        stage: 'circle',
        title: say('Angelu erlazionatuak', 'Ángulos relacionados', 'الزوايا المرتبطة'),
        goal: say('Edozein angeluren arrazoiak lehen koadranteko angelu baten arrazoietara laburtzea.', 'Reducir las razones de cualquier ángulo a las de un ángulo del primer cuadrante.', 'إرجاع نسب أي زاوية إلى نسب زاوية من الربع الأول.'),
        explanation: say(
            'Zirkunferentzia goniometrikoan, $\\alpha$, $180°-\\alpha$, $180°+\\alpha$ eta $360°-\\alpha$ angeluen puntuak simetrikoak dira: haien arrazoiek balio absolutu bera dute, eta zeinua koadranteak ematen du. Angelu osagarriak ($180°-\\alpha$): $\\sen(180°-\\alpha)=\\sen\\alpha$ eta $\\cos(180°-\\alpha)=-\\cos\\alpha$. $180°$ desberdina dutenak: $\\sen(180°+\\alpha)=-\\sen\\alpha$, $\\cos(180°+\\alpha)=-\\cos\\alpha$ eta tangentea berdina. Aurkakoak ($360°-\\alpha$ edo $-\\alpha$): $\\sen(-\\alpha)=-\\sen\\alpha$ eta $\\cos(-\\alpha)=\\cos\\alpha$. Adibidez, $\\sen 150°=\\sen 30°=\\frac{1}{2}$ eta $\\cos 210°=-\\cos 30°=-\\frac{\\sqrt{3}}{2}$. 360° baino handiagoak: kendu buelta osoak; $1837°=5\\cdot 360°+37°$, beraz 1837°-k eta 37°-k arrazoi berak dituzte.',
            'En la circunferencia goniométrica, los puntos de los ángulos $\\alpha$, $180°-\\alpha$, $180°+\\alpha$ y $360°-\\alpha$ son simétricos: sus razones tienen el mismo valor absoluto y el signo lo da el cuadrante. Suplementarios ($180°-\\alpha$): $\\sen(180°-\\alpha)=\\sen\\alpha$ y $\\cos(180°-\\alpha)=-\\cos\\alpha$. Que se diferencian en $180°$: $\\sen(180°+\\alpha)=-\\sen\\alpha$, $\\cos(180°+\\alpha)=-\\cos\\alpha$ y la tangente igual. Opuestos ($360°-\\alpha$ o $-\\alpha$): $\\sen(-\\alpha)=-\\sen\\alpha$ y $\\cos(-\\alpha)=\\cos\\alpha$. Por ejemplo, $\\sen 150°=\\sen 30°=\\frac{1}{2}$ y $\\cos 210°=-\\cos 30°=-\\frac{\\sqrt{3}}{2}$. Mayores de 360°: quita las vueltas completas; $1837°=5\\cdot 360°+37°$, así que 1837° y 37° tienen las mismas razones.',
            'في الدائرة المثلثية تكون نقاط الزوايا $\\alpha$ و$180°-\\alpha$ و$180°+\\alpha$ و$360°-\\alpha$ متناظرة: لنسبها القيمة المطلقة نفسها والإشارة يحددها الربع. المتكاملتان ($180°-\\alpha$): $\\sen(180°-\\alpha)=\\sen\\alpha$ و$\\cos(180°-\\alpha)=-\\cos\\alpha$. اللتان تختلفان بـ $180°$: $\\sen(180°+\\alpha)=-\\sen\\alpha$ و$\\cos(180°+\\alpha)=-\\cos\\alpha$ والظل نفسه. المتعاكستان ($360°-\\alpha$ أو $-\\alpha$): $\\sen(-\\alpha)=-\\sen\\alpha$ و$\\cos(-\\alpha)=\\cos\\alpha$. مثلًا، $\\sen 150°=\\sen 30°=\\frac{1}{2}$ و$\\cos 210°=-\\cos 30°=-\\frac{\\sqrt{3}}{2}$. وأكبر من 360°: احذف الدورات الكاملة؛ $1837°=5\\cdot 360°+37°$، إذن لـ 1837° و37° النسب نفسها.'
        ),
        problem: say('Kalkulatu $\\tg 315°$-ren balio zehatza.', 'Calcula el valor exacto de $\\tg 315°$.', 'احسب القيمة المضبوطة لـ $\\tg 315°$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('315° IV. koadrantean dago.', '315° está en el IV cuadrante.', '315° في الربع الرابع.'), math: same('$315°=360°-45°$') },
            { text: say('Sinua aldatu, kosinua ez.', 'Cambia el seno, no el coseno.', 'يتغير الجيب لا جيب التمام.'), math: same('$\\sen 315°=-\\dfrac{\\sqrt{2}}{2}$') },
            { text: say('Tangentea: −1.', 'Tangente: −1.', 'الظل: −1.'), math: same('$\\tg 315°=-\\tg 45°=-1$') }
        ],
        example: same('$\\sen(180°-\\alpha)=\\sen\\alpha$'),
        takeaway: say('Murriztu lehen koadrantera: balio absolutu bera, zeinua koadrantearena. Buelta osoak kendu.', 'Reduce al primer cuadrante: mismo valor absoluto, el signo del cuadrante. Quita las vueltas completas.', 'أرجِع إلى الربع الأول: القيمة المطلقة نفسها وإشارة الربع. واحذف الدورات الكاملة.'),
        figure: (language) => <RelatedAnglesFigure language={language} />
    },
    {
        id: 'radians',
        stage: 'circle',
        title: say('Radiana', 'El radián', 'الراديان'),
        goal: say('Angeluak gradutik radianera eta radianetik gradura pasatzea.', 'Pasar ángulos de grados a radianes y de radianes a grados.', 'تحويل الزوايا من الدرجات إلى الراديان ومن الراديان إلى الدرجات.'),
        explanation: say(
            'Radian bat zentroko angelu bat da, haren arkuak erradioaren luzera bera duenean. Zirkunferentzia osoak $2\\pi r$ neurtzen duenez, buelta osoa $2\\pi$ radian da: $360°=2\\pi$ rad, hau da, $180°=\\pi$ rad. Beraz, $1\\text{ rad}=\\frac{180°}{\\pi}\\approx 57{,}3°$, 60° baino zertxobait gutxiago. Gradutik radianera, biderkatu $\\frac{\\pi}{180}$-z: $150°=\\frac{150\\pi}{180}=\\frac{5\\pi}{6}\\approx 2{,}62$ rad. Radianetik gradura, biderkatu $\\frac{180}{\\pi}$-z: $\\frac{3\\pi}{4}$ rad $=\\frac{3\\cdot 180°}{4}=135°$. Angelu ohikoak: $90°=\\frac{\\pi}{2}$, $60°=\\frac{\\pi}{3}$, $45°=\\frac{\\pi}{4}$, $30°=\\frac{\\pi}{6}$. Kalkulagailuan RAD modua erabil daiteke zuzenean radianekin lan egiteko.',
            'Un radián es el ángulo central cuyo arco mide lo mismo que el radio. Como la circunferencia completa mide $2\\pi r$, una vuelta entera son $2\\pi$ radianes: $360°=2\\pi$ rad, es decir, $180°=\\pi$ rad. Por tanto, $1\\text{ rad}=\\frac{180°}{\\pi}\\approx 57{,}3°$, algo menos de 60°. De grados a radianes, multiplica por $\\frac{\\pi}{180}$: $150°=\\frac{150\\pi}{180}=\\frac{5\\pi}{6}\\approx 2{,}62$ rad. De radianes a grados, multiplica por $\\frac{180}{\\pi}$: $\\frac{3\\pi}{4}$ rad $=\\frac{3\\cdot 180°}{4}=135°$. Ángulos habituales: $90°=\\frac{\\pi}{2}$, $60°=\\frac{\\pi}{3}$, $45°=\\frac{\\pi}{4}$, $30°=\\frac{\\pi}{6}$. En la calculadora, el modo RAD permite trabajar directamente en radianes.',
            'الراديان هو الزاوية المركزية التي يساوي طول قوسها نصف القطر. وبما أن طول الدائرة كلها $2\\pi r$ فإن الدورة الكاملة $2\\pi$ راديان: $360°=2\\pi$ rad، أي $180°=\\pi$ rad. إذن $1\\text{ rad}=\\frac{180°}{\\pi}\\approx 57{,}3°$، أقل بقليل من 60°. من الدرجات إلى الراديان اضرب في $\\frac{\\pi}{180}$: $150°=\\frac{150\\pi}{180}=\\frac{5\\pi}{6}\\approx 2{,}62$ rad. ومن الراديان إلى الدرجات اضرب في $\\frac{180}{\\pi}$: $\\frac{3\\pi}{4}$ rad $=\\frac{3\\cdot 180°}{4}=135°$. زوايا مألوفة: $90°=\\frac{\\pi}{2}$ و$60°=\\frac{\\pi}{3}$ و$45°=\\frac{\\pi}{4}$ و$30°=\\frac{\\pi}{6}$. وفي الآلة الحاسبة يسمح وضع RAD بالعمل بالراديان مباشرة.'
        ),
        problem: say('Pasa 150° radianetara: π-ren funtzioan eta hamartar gisa.', 'Pasa 150° a radianes: en función de π y en forma decimal.', 'حوّل 150° إلى الراديان: بدلالة π وفي صورة عشرية.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu π/180-z.', 'Multiplica por π/180.', 'اضرب في π/180.'), math: same('$150\\cdot\\dfrac{\\pi}{180}=\\dfrac{5\\pi}{6}$') },
            { text: say('Hamartar gisa.', 'En forma decimal.', 'في صورة عشرية.'), math: same('$\\dfrac{5\\pi}{6}\\approx 2{,}62$') }
        ],
        example: same('$180°=\\pi\\text{ rad}$'),
        takeaway: say('180° = π rad. Radianetara: bider π/180. Graduetara: bider 180/π.', '180° = π rad. A radianes: por π/180. A grados: por 180/π.', '180° = π rad. إلى الراديان: في π/180. إلى الدرجات: في 180/π.'),
        figure: (language) => <RadianFigure language={language} />
    }
]
