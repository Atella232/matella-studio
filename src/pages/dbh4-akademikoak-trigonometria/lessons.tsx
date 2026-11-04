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
import { localizeNames, same, say } from './text'
import { trigonometryLessonChecks, type TrigonometryTopicId } from './lessonChecks'
import { trigonometryLessonTexts } from './lessonTexts'

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
    { id: 'ratios', tone: 'blue', title: { eu: 'Angelu zorrotz baten arrazoiak', es: 'Razones de un ángulo agudo', en: 'Ratios of an acute angle', ar: 'نسب الزاوية الحادة' } },
    { id: 'identities', tone: 'violet', title: { eu: 'Oinarrizko erlazioak', es: 'Relaciones fundamentales', en: 'Fundamental relationships', ar: 'العلاقات الأساسية' } },
    { id: 'solving', tone: 'mustard', title: { eu: 'Triangelu angeluzuzenak', es: 'Triángulos rectángulos', en: 'Right-angled triangles', ar: 'المثلثات القائمة' } },
    { id: 'problems', tone: 'coral', title: { eu: 'Altuerak, distantziak eta azalerak', es: 'Alturas, distancias y áreas', en: 'Heights, distances and areas', ar: 'الارتفاعات والمسافات والمساحات' } },
    { id: 'circle', tone: 'green', title: { eu: 'Zirkunferentzia goniometrikoa', es: 'La circunferencia goniométrica', en: 'The unit circle', ar: 'الدائرة المثلثية' } }
]

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Ratios of an acute angle ---------- */
    {
        id: 'right-ratios',
        stage: 'ratios',
        title: say('Sinua, kosinua eta tangentea', 'Seno, coseno y tangente', 'الجيب وجيب التمام والظل', 'Sine, cosine and tangent'),
        goal: say('Triangelu angeluzuzen bateko angelu zorrotz baten hiru arrazoi trigonometrikoak kalkulatzea.', 'Calcular las tres razones trigonométricas de un ángulo agudo en un triángulo rectángulo.', 'حساب النسب المثلثية الثلاث لزاوية حادة في مثلث قائم.', 'Calculate the three trigonometric ratios of an acute angle in a right-angled triangle.'),
        needs: [
            { unit: 'dbh3/geometria-plana', topic: 'pythagoras', title: { eu: 'Pitagorasen teorema', es: 'El teorema de Pitágoras', en: 'Pythagoras\' theorem', ar: 'مبرهنة فيثاغورس' } }
        ],
        problem: say('Triangelu angeluzuzen baten katetoak 8 cm eta 15 cm dira. Kalkulatu 8 cm-ko katetoaren aurkako α angeluaren arrazoiak.', 'Los catetos de un triángulo rectángulo miden 8 cm y 15 cm. Calcula las razones del ángulo α opuesto al cateto de 8 cm.', 'ضلعا مثلث قائم 8 سم و15 سم. احسب نسب الزاوية α المقابلة للضلع 8 سم.', 'The legs of a right-angled triangle measure 8 cm and 15 cm. Calculate the ratios of the angle α opposite the 8 cm leg.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hipotenusa, Pitagorasekin.', 'La hipotenusa, con Pitágoras.', 'الوتر بفيثاغورس.', 'The hypotenuse, using Pythagoras.'), math: same('$\\sqrt{8^{2}+15^{2}}=17$') },
            { text: say('Sinua eta kosinua.', 'Seno y coseno.', 'الجيب وجيب التمام.', 'Sine and cosine.'), math: same('$\\sen\\alpha=\\dfrac{8}{17}\\approx 0{,}47$') },
            { text: say('Kosinua: 15/17 ≈ 0,88.', 'Coseno: 15/17 ≈ 0,88.', 'جيب التمام: 15/17 ≈ 0.88.', 'Cosine: 15/17 ≈ 0.88.'), math: same('$\\cos\\alpha=\\dfrac{15}{17}\\approx 0{,}88$') },
            { text: say('Tangentea: aurkakoa zati ondokoa.', 'Tangente: opuesto entre contiguo.', 'الظل: المقابل على المجاور.', 'Tangent: opposite divided by adjacent.'), math: same('$\\tg\\alpha=\\dfrac{8}{15}\\approx 0{,}53$') }
        ],
        takeaway: say('Sinua: aurkakoa / hipotenusa. Kosinua: ondokoa / hipotenusa. Tangentea: aurkakoa / ondokoa.', 'Seno: opuesto / hipotenusa. Coseno: contiguo / hipotenusa. Tangente: opuesto / contiguo.', 'الجيب: المقابل / الوتر. جيب التمام: المجاور / الوتر. الظل: المقابل / المجاور.', 'Sine: opposite / hypotenuse. Cosine: adjacent / hypotenuse. Tangent: opposite / adjacent.'),
        figure: (language) => <RatiosFigure language={language} />
    },
    {
        id: 'ratio-properties',
        stage: 'ratios',
        title: say('Arrazoiak ez daude tamainaren mende', 'Las razones no dependen del tamaño', 'النسب لا تتوقف على الحجم', 'The ratios do not depend on size'),
        goal: say('Arrazoiak angeluaren mende bakarrik daudela ulertzea, haien mugak ezagutzea eta angelu osagarriak erabiltzea.', 'Entender que las razones solo dependen del ángulo, conocer sus límites y usar los ángulos complementarios.', 'فهم أن النسب تتوقف على الزاوية فقط، ومعرفة حدودها، واستعمال الزاويتين المتتامّتين.', 'Understand that the ratios depend only on the angle, know their limits and use complementary angles.'),
        needs: [
            { unit: 'dbh4-akademikoak/areas-volumenes-semejanza', topic: 'similar-triangles', title: { eu: 'Triangelu antzekoak', es: 'Triángulos semejantes', en: 'Similar triangles', ar: 'المثلثات المتشابهة' } }
        ],
        problem: say('$\\sen 35°\\approx 0{,}57$, $\\cos 35°\\approx 0{,}82$ eta $\\tg 35°\\approx 0{,}70$ jakinda, kalkulatu 55°-ren arrazoiak.', 'Sabiendo que $\\sen 35°\\approx 0{,}57$, $\\cos 35°\\approx 0{,}82$ y $\\tg 35°\\approx 0{,}70$, calcula las razones de 55°.', 'علمًا أن $\\sen 35°\\approx 0{,}57$ و$\\cos 35°\\approx 0{,}82$ و$\\tg 35°\\approx 0{,}70$، احسب نسب الزاوية 55°.', 'Knowing that $\\sin 35°\\approx 0{,}57$, $\\cos 35°\\approx 0{,}82$ and $\\tan 35°\\approx 0{,}70$, calculate the ratios of 55°.'),
        stepsKind: 'steps',
        steps: [
            { text: say('55° eta 35° osagarriak dira.', '55° y 35° son complementarios.', '55° و35° متتامّتان.', '55° and 35° are complementary.'), math: same('$55°=90°-35°$') },
            { text: say('Sinua eta kosinua trukatzen dira.', 'El seno y el coseno se intercambian.', 'يتبادل الجيب وجيب التمام.', 'Sine and cosine swap.'), math: same('$\\sen 55°=\\cos 35°\\approx 0{,}82$') },
            { text: say('Kosinua.', 'El coseno.', 'جيب التمام.', 'The cosine.'), math: same('$\\cos 55°=\\sen 35°\\approx 0{,}57$') },
            { text: say('Tangentea alderantzizkoa da.', 'La tangente es la inversa.', 'الظل هو المقلوب.', 'The tangent is the reciprocal.'), math: same('$\\tg 55°=\\dfrac{1}{0{,}70}\\approx 1{,}43$') }
        ],
        takeaway: say('Angelu bera, arrazoi berak. Sinua eta kosinua 0 eta 1 artean. Osagarriek sinua eta kosinua trukatzen dituzte.', 'Mismo ángulo, mismas razones. Seno y coseno entre 0 y 1. Los complementarios intercambian seno y coseno.', 'الزاوية نفسها، النسب نفسها. الجيب وجيب التمام بين 0 و1. والمتتامّتان تتبادلان الجيب وجيب التمام.', 'Same angle, same ratios. Sine and cosine between 0 and 1. Complementary angles swap sine and cosine.'),
        figure: (language) => <SimilarRatiosFigure language={language} />
    },
    {
        id: 'notable-angles',
        stage: 'ratios',
        title: say('30°, 45° eta 60°', '30°, 45° y 60°', '30° و45° و60°', '30°, 45° and 60°'),
        goal: say('30°, 45° eta 60°-ren arrazoien balio zehatzak ateratzea eta erabiltzea.', 'Obtener y usar los valores exactos de las razones de 30°, 45° y 60°.', 'استخراج القيم المضبوطة لنسب 30° و45° و60° واستعمالها.', 'Find and use the exact values of the ratios of 30°, 45° and 60°.'),
        needs: [
            { unit: 'dbh4-akademikoak/potencias-radicales', topic: 'rationalize-square', title: { eu: 'Erro karratu bat izendatzailean', es: 'Una raíz cuadrada en el denominador', en: 'A square root in the denominator', ar: 'جذر تربيعي في المقام' } }
        ],
        problem: say('Kometa baten haria tenk dago eta lurrarekin 60° osatzen ditu. Kometa 5 m-ko altueran badago, zenbat neurtzen du hariak?', 'El hilo tenso de una cometa forma 60° con el suelo. Si la cometa está a 5 m de altura, ¿cuánto mide el hilo?', 'خيط طائرة ورقية مشدود يصنع زاوية 60° مع الأرض. إذا كانت الطائرة على ارتفاع 5 م، فكم طول الخيط؟', 'The taut string of a kite makes 60° with the ground. If the kite is 5 m high, how long is the string?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Altuera aurkako katetoa da eta haria hipotenusa.', 'La altura es el cateto opuesto y el hilo la hipotenusa.', 'الارتفاع هو المقابل والخيط هو الوتر.', 'The height is the opposite side and the string is the hypotenuse.'), math: same('$\\sen 60°=\\dfrac{5}{x}$') },
            { text: say('Balio zehatza ordezkatu.', 'Sustituye el valor exacto.', 'عوّض بالقيمة المضبوطة.', 'Substitute the exact value.'), math: same('$\\dfrac{\\sqrt{3}}{2}=\\dfrac{5}{x}$') },
            { text: say('Askatu: 5,77 m inguru.', 'Despeja: unos 5,77 m.', 'استخرج x: نحو 5.77 م.', 'Solve for it: about 5.77 m.'), math: same('$x=\\dfrac{10}{\\sqrt{3}}\\approx 5{,}77$') }
        ],
        takeaway: say('45°: karratu-erdia. 30° eta 60°: triangelu aldeberdin-erdia. Balio zehatzak √2 eta √3 erroekin.', '45°: medio cuadrado. 30° y 60°: medio triángulo equilátero. Valores exactos con √2 y √3.', '45°: نصف مربع. 30° و60°: نصف مثلث متساوي الأضلاع. القيم المضبوطة بـ √2 و√3.', '45°: half a square. 30° and 60°: half an equilateral triangle. Exact values with √2 and √3.'),
        figure: (language) => <NotableAnglesFigure language={language} />
    },

    /* ---------- 2. Fundamental relations ---------- */
    {
        id: 'fundamental',
        stage: 'identities',
        title: say('Oinarrizko erlazioak', 'Relaciones fundamentales', 'العلاقات الأساسية', 'Fundamental relationships'),
        goal: say('$\\sen^{2}\\alpha+\\cos^{2}\\alpha=1$ eta $\\tg\\alpha=\\frac{\\sen\\alpha}{\\cos\\alpha}$ ulertzea eta erabiltzea.', 'Entender y usar $\\sen^{2}\\alpha+\\cos^{2}\\alpha=1$ y $\\tg\\alpha=\\frac{\\sen\\alpha}{\\cos\\alpha}$.', 'فهم $\\sen^{2}\\alpha+\\cos^{2}\\alpha=1$ و$\\tg\\alpha=\\frac{\\sen\\alpha}{\\cos\\alpha}$ واستعمالهما.', 'Understand and use $\\sin^{2}\\alpha+\\cos^{2}\\alpha=1$ and $\\tan\\alpha=\\frac{\\sin\\alpha}{\\cos\\alpha}$.'),
        needs: [
            { unit: 'dbh3/geometria-plana', topic: 'pythagoras', title: { eu: 'Pitagorasen teorema', es: 'El teorema de Pitágoras', en: 'Pythagoras\' theorem', ar: 'مبرهنة فيثاغورس' } }
        ],
        problem: say('$\\alpha$ zorrotza da eta $\\sen\\alpha=0{,}6$. Kalkulatu $\\cos\\alpha$ eta $\\tg\\alpha$.', '$\\alpha$ es agudo y $\\sen\\alpha=0{,}6$. Calcula $\\cos\\alpha$ y $\\tg\\alpha$.', '$\\alpha$ حادة و$\\sen\\alpha=0{,}6$. احسب $\\cos\\alpha$ و$\\tg\\alpha$.', '$\\alpha$ is acute and $\\sin\\alpha=0{,}6$. Calculate $\\cos\\alpha$ and $\\tan\\alpha$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Oinarrizko erlazioa.', 'La relación fundamental.', 'العلاقة الأساسية.', 'The fundamental relation.'), math: same('$\\cos^{2}\\alpha=1-0{,}6^{2}=0{,}64$') },
            { text: say('Erro positiboa.', 'La raíz positiva.', 'الجذر الموجب.', 'The positive root.'), math: same('$\\cos\\alpha=0{,}8$') },
            { text: say('Tangentea: sinua zati kosinua.', 'Tangente: seno entre coseno.', 'الظل: الجيب على جيب التمام.', 'Tangent: sine divided by cosine.'), math: same('$\\tg\\alpha=\\dfrac{0{,}6}{0{,}8}=0{,}75$') }
        ],
        takeaway: say('Sinuaren karratua gehi kosinuaren karratua = 1. Tangentea = sinua / kosinua.', 'Seno al cuadrado más coseno al cuadrado = 1. Tangente = seno / coseno.', 'مربع الجيب زائد مربع جيب التمام = 1. الظل = الجيب / جيب التمام.', 'Sine squared plus cosine squared = 1. Tangent = sine / cosine.'),
        figure: (language) => <FundamentalFigure language={language} />
    },
    {
        id: 'one-ratio',
        stage: 'identities',
        figureAfterSteps: true,
        title: say('Arrazoi batetik besteetara', 'De una razón a las demás', 'من نسبة إلى النسب الأخرى', 'From one ratio to the others'),
        goal: say('Tangentea edo arrazoi bat zatiki gisa emanda, beste biak modu zehatzean kalkulatzea.', 'Calcular de forma exacta las otras dos razones cuando dan la tangente u otra razón como fracción.', 'حساب النسبتين الأخريين بدقة عندما يُعطى الظل أو نسبة أخرى في صورة كسر.', 'Calculate the other two ratios exactly when the tangent or another ratio is given as a fraction.'),
        problem: say('$\\alpha$ zorrotza da eta $\\tg\\alpha=2{,}4$. Kalkulatu $\\cos\\alpha$ eta $\\sen\\alpha$.', '$\\alpha$ es agudo y $\\tg\\alpha=2{,}4$. Calcula $\\cos\\alpha$ y $\\sen\\alpha$.', '$\\alpha$ حادة و$\\tg\\alpha=2{,}4$. احسب $\\cos\\alpha$ و$\\sen\\alpha$.', '$\\alpha$ is acute and $\\tan\\alpha=2{,}4$. Calculate $\\cos\\alpha$ and $\\sin\\alpha$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('1 + tangentearen karratua.', '1 más la tangente al cuadrado.', '1 زائد مربع الظل.', '1 plus the tangent squared.'), math: same('$1+2{,}4^{2}=6{,}76$') },
            { text: say('Kosinua: 6,76 zenbakiaren erroaren alderantzizkoa.', 'Coseno: el inverso de la raíz de 6,76.', 'جيب التمام: مقلوب جذر 6.76.', 'Cosine: the reciprocal of the square root of 6.76.'), math: same('$\\cos\\alpha=\\dfrac{1}{2{,}6}=\\dfrac{5}{13}$') },
            { text: say('Sinua: tangentea bider kosinua.', 'Seno: tangente por coseno.', 'الجيب: الظل في جيب التمام.', 'Sine: tangent times cosine.'), math: same('$\\sen\\alpha=\\dfrac{12}{5}\\cdot\\dfrac{5}{13}=\\dfrac{12}{13}$') }
        ],
        takeaway: say('Tangentetik: lehenik kosinua, gero sinua. Edo marraztu triangelua eta osatu Pitagorasekin.', 'Desde la tangente: primero el coseno, luego el seno. O dibuja el triángulo y complétalo con Pitágoras.', 'من الظل: جيب التمام أولًا ثم الجيب. أو ارسم المثلث وأكمله بفيثاغورس.', 'From the tangent: first the cosine, then the sine. Or draw the triangle and complete it using Pythagoras.'),
        figure: (language) => <OneRatioFigure language={language} />
    },
    {
        id: 'calculator',
        stage: 'identities',
        title: say('Kalkulagailua trigonometrian', 'La calculadora en trigonometría', 'الآلة الحاسبة في حساب المثلثات', 'The calculator in trigonometry'),
        goal: say('Angelu baten arrazoiak eta arrazoi baten angelua kalkulagailuarekin lortzea, gradu, minutu eta segundoetan ere.', 'Obtener con la calculadora las razones de un ángulo y el ángulo de una razón, también en grados, minutos y segundos.', 'الحصول بالآلة الحاسبة على نسب زاوية وعلى زاوية نسبة، وبالدرجات والدقائق والثواني أيضًا.', 'Use the calculator to find the ratios of an angle and the angle from a ratio, also in degrees, minutes and seconds.'),
        problem: say('$\\cos\\alpha=0{,}42$ bada, aurkitu $\\alpha$ gradu, minutu eta segundotan.', 'Si $\\cos\\alpha=0{,}42$, halla $\\alpha$ en grados, minutos y segundos.', 'إذا كان $\\cos\\alpha=0{,}42$، فأوجد $\\alpha$ بالدرجات والدقائق والثواني.', 'If $\\cos\\alpha=0{,}42$, find $\\alpha$ in degrees, minutes and seconds.'),
        stepsKind: 'steps',
        steps: [
            { text: say('SHIFT cos 0,42.', 'SHIFT cos 0,42.', 'SHIFT cos 0.42.', 'SHIFT cos 0.42.'), math: same('$\\alpha\\approx 65{,}165°$') },
            { text: say('Minutuak: zati hamartarra bider 60.', 'Minutos: la parte decimal por 60.', 'الدقائق: الجزء العشري في 60.', 'Minutes: the decimal part times 60.'), math: same('$0{,}165\\cdot 60\\approx 9{,}92$') },
            { text: say('Segundoak: berriz bider 60.', 'Segundos: otra vez por 60.', 'الثواني: مرة أخرى في 60.', 'Seconds: multiply by 60 again.'), math: same('$0{,}92\\cdot 60\\approx 55$') },
            { text: say('Emaitza.', 'Resultado.', 'النتيجة.', 'Result.'), math: same('$\\alpha\\approx 65°\\,9\'\\,55\'\'$') }
        ],
        takeaway: say('DEG modua. sin, cos, tan: angelutik arrazoira. SHIFT: arrazoitik angelura. Minutuak eta segundoak: bider 60.', 'Modo DEG. sin, cos, tan: del ángulo a la razón. SHIFT: de la razón al ángulo. Minutos y segundos: por 60.', 'وضع DEG. sin وcos وtan: من الزاوية إلى النسبة. SHIFT: من النسبة إلى الزاوية. الدقائق والثواني: في 60.', 'DEG mode. sin, cos, tan: from the angle to the ratio. SHIFT: from the ratio to the angle. Minutes and seconds: multiply by 60.'),
        figure: (language) => <CalculatorFigure language={language} />
    },

    /* ---------- 3. Solving right triangles ---------- */
    {
        id: 'two-sides',
        stage: 'solving',
        figureAfterSteps: true,
        title: say('Bi alde ezagututa', 'Conociendo dos lados', 'بمعرفة ضلعين', 'Knowing two sides'),
        goal: say('Bi alde ezagututa triangelu angeluzuzen bat ebaztea: hirugarren aldea eta bi angelu zorrotzak.', 'Resolver un triángulo rectángulo conociendo dos lados: el tercer lado y los dos ángulos agudos.', 'حل مثلث قائم بمعرفة ضلعين: الضلع الثالث والزاويتين الحادتين.', 'Solve a right-angled triangle when two sides are known: find the third side and the two acute angles.'),
        needs: [
            { unit: 'dbh3/geometria-plana', topic: 'pythagoras-problems', title: { eu: 'Problemak Pitagorasekin', es: 'Problemas con Pitágoras', en: 'Problems with Pythagoras', ar: 'مسائل بفيثاغورس' } }
        ],
        problem: say('Triangelu angeluzuzen baten katetoak 5 cm eta 12 cm dira. Ebatzi triangelua.', 'Los catetos de un triángulo rectángulo miden 5 cm y 12 cm. Resuelve el triángulo.', 'الضلعان القائمان لمثلث قائم 5 سم و12 سم. حلّ المثلث.', 'The legs of a right-angled triangle measure 5 cm and 12 cm. Solve the triangle.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hipotenusa.', 'La hipotenusa.', 'الوتر.', 'The hypotenuse.'), math: same('$a=\\sqrt{5^{2}+12^{2}}=13$') },
            { text: say('Bi katetoekin: tangentea.', 'Con los dos catetos: la tangente.', 'بالضلعين القائمين: الظل.', 'With the two legs: the tangent.'), math: same('$\\tg\\alpha=\\dfrac{5}{12}\\to\\alpha\\approx 22{,}6°$') },
            { text: say('Beste angelua.', 'El otro ángulo.', 'الزاوية الأخرى.', 'The other angle.'), math: same('$\\beta\\approx 90°-22{,}6°=67{,}4°$') }
        ],
        takeaway: say('Hirugarren aldea: Pitagoras. Angelu bat: bi aldeak lotzen dituen arrazoia eta SHIFT. Bestea: 90° ken.', 'Tercer lado: Pitágoras. Un ángulo: la razón que une los dos lados y SHIFT. El otro: 90° menos.', 'الضلع الثالث: فيثاغورس. زاوية: النسبة التي تربط الضلعين وSHIFT. والأخرى: 90° ناقص.', 'Third side: Pythagoras. One angle: the ratio linking the two sides, then SHIFT. The other: 90° minus it.'),
        figure: (language) => <SolveRightFigure language={language} given="two-sides" />
    },
    {
        id: 'side-angle',
        stage: 'solving',
        figureAfterSteps: true,
        title: say('Alde bat eta angelu bat ezagututa', 'Conociendo un lado y un ángulo', 'بمعرفة ضلع وزاوية', 'Knowing one side and one angle'),
        goal: say('Alde bat eta angelu zorrotz bat ezagututa triangelu angeluzuzen bat ebaztea.', 'Resolver un triángulo rectángulo conociendo un lado y un ángulo agudo.', 'حل مثلث قائم بمعرفة ضلع وزاوية حادة.', 'Solve a right-angled triangle when one side and one acute angle are known.'),
        problem: say('Triangelu angeluzuzen batean angelu zorrotz bat 37° da eta haren aurkako katetoa 87 m. Ebatzi triangelua.', 'En un triángulo rectángulo un ángulo agudo mide 37° y su cateto opuesto 87 m. Resuelve el triángulo.', 'في مثلث قائم زاوية حادة قياسها 37° والضلع المقابل لها 87 م. حلّ المثلث.', 'In a right-angled triangle, one acute angle is 37° and its opposite side is 87 m. Solve the triangle.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Beste angelua.', 'El otro ángulo.', 'الزاوية الأخرى.', 'The other angle.'), math: same('$\\beta=90°-37°=53°$') },
            { text: say('Hipotenusa, sinuarekin.', 'La hipotenusa, con el seno.', 'الوتر بالجيب.', 'The hypotenuse, using the sine.'), math: same('$a=\\dfrac{87}{\\sen 37°}\\approx 144{,}56$') },
            { text: say('Beste katetoa, tangentearekin.', 'El otro cateto, con la tangente.', 'الضلع الآخر بالظل.', 'The other leg, using the tangent.'), math: same('$c=\\dfrac{87}{\\tg 37°}\\approx 115{,}45$') }
        ],
        takeaway: say('Aukeratu ezaguna eta ezezaguna lotzen dituen arrazoia. Zenbakitzailean: biderkatu. Izendatzailean: zatitu.', 'Elige la razón que une el dato y la incógnita. En el numerador: multiplica. En el denominador: divide.', 'اختر النسبة التي تربط المعطى بالمجهول. في البسط: اضرب. في المقام: اقسم.', 'Choose the ratio that links the given value and the unknown. In the numerator: multiply. In the denominator: divide.'),
        figure: (language) => <SolveRightFigure language={language} given="side-angle" />
    },
    {
        id: 'elevation',
        stage: 'solving',
        figureAfterSteps: true,
        title: say('Goratze- eta beheratze-angeluak', 'Ángulos de elevación y de depresión', 'زاويتا الارتفاع والانخفاض', 'Angles of elevation and depression'),
        goal: say('Altuerak eta distantziak kalkulatzea goratze- eta beheratze-angeluekin.', 'Calcular alturas y distancias con ángulos de elevación y de depresión.', 'حساب الارتفاعات والمسافات بزاويتي الارتفاع والانخفاض.', 'Calculate heights and distances using angles of elevation and depression.'),
        problem: say('Zuhaitz batetik 20 m-ra gaude eta haren goialdea 40°-ko goratze-angeluarekin ikusten dugu. Zein da zuhaitzaren altuera?', 'Estamos a 20 m de un árbol y vemos su copa con un ángulo de elevación de 40°. ¿Qué altura tiene el árbol?', 'نحن على بعد 20 م من شجرة ونرى قمتها بزاوية ارتفاع 40°. ما ارتفاع الشجرة؟', 'We are 20 m from a tree and see its top at an angle of elevation of 40°. How tall is the tree?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Altuera aurkakoa da eta 20 m ondokoa.', 'La altura es el opuesto y los 20 m el contiguo.', 'الارتفاع هو المقابل و20 م المجاور.', 'The height is the opposite side and the 20 m is the adjacent side.'), math: same('$\\tg 40°=\\dfrac{h}{20}$') },
            { text: say('Askatu: 16,78 m inguru.', 'Despeja: unos 16,78 m.', 'استخرج h: نحو 16.78 م.', 'Solve for it: about 16.78 m.'), math: same('$h=20\\cdot\\tg 40°\\approx 16{,}78$') }
        ],
        takeaway: say('Goratzea: begiratu gora. Beheratzea: begiratu behera. Altuera eta distantzia horizontala: tangentea.', 'Elevación: mirar hacia arriba. Depresión: hacia abajo. Altura y distancia horizontal: la tangente.', 'الارتفاع: النظر إلى الأعلى. الانخفاض: إلى الأسفل. الارتفاع والمسافة الأفقية: الظل.', 'Elevation: look up. Depression: look down. Height and horizontal distance: the tangent.'),
        figure: (language) => <ElevationFigure language={language} />
    },

    /* ---------- 4. Heights, distances and areas ---------- */
    {
        id: 'double-observation',
        stage: 'problems',
        title: say('Behaketa bikoitza', 'La doble observación', 'الرصد المزدوج', 'Two observations'),
        goal: say('Oinarrira iritsi ezin denean altuera bat kalkulatzea, bi puntutatik neurtutako bi angeluekin.', 'Calcular una altura cuando no se puede llegar al pie, con dos ángulos medidos desde dos puntos.', 'حساب ارتفاع لا يمكن بلوغ قاعدته بزاويتين مقيستين من نقطتين.', 'Calculate a height when you cannot reach the base, using two angles measured from two points.'),
        needs: [
            { unit: 'dbh4-akademikoak/sistemas', topic: 'equalization', title: { eu: 'Berdinketa-metodoa', es: 'Método de igualación', en: 'Equating method', ar: 'طريقة المساواة' } }
        ],
        problem: say('Zuhaitz baten goialdea 50°-ko angeluarekin ikusten da; 10 m urrundu ondoren, 25°-koarekin. Kalkulatu zuhaitzaren altuera.', 'La copa de un árbol se ve con un ángulo de 50°; tras alejarse 10 m, con uno de 25°. Calcula la altura del árbol.', 'تُرى قمة شجرة بزاوية 50°، وبعد الابتعاد 10 م بزاوية 25°. احسب ارتفاع الشجرة.', 'The top of a tree is seen at an angle of 50°; after moving 10 m further away, at an angle of 25°. Calculate the height of the tree.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bi triangelu, bi ekuazio.', 'Dos triángulos, dos ecuaciones.', 'مثلثان ومعادلتان.', 'Two triangles, two equations.'), math: same('$y=x\\cdot\\tg 50°$') },
            { text: say('Urruneko puntutik.', 'Desde el punto lejano.', 'من النقطة البعيدة.', 'From the far point.'), math: same('$y=(x+10)\\cdot\\tg 25°$') },
            { text: say('Berdindu eta askatu x.', 'Iguala y despeja x.', 'ساوِ واستخرج x.', 'Set them equal and solve for x.'), math: same('$0{,}7255\\,x=4{,}663\\to x\\approx 6{,}43$') },
            { text: say('Altuera: 7,66 m inguru.', 'Altura: unos 7,66 m.', 'الارتفاع: نحو 7.66 م.', 'Height: about 7.66 m.'), math: same('$y\\approx 6{,}43\\cdot 1{,}1918\\approx 7{,}66$') }
        ],
        takeaway: say('Bi angelu eta haien arteko distantzia: bi ekuazio, bi ezezagun (distantzia eta altuera).', 'Dos ángulos y la distancia entre ellos: dos ecuaciones, dos incógnitas (distancia y altura).', 'زاويتان والمسافة بينهما: معادلتان ومجهولان (المسافة والارتفاع).', 'Two angles and the distance between them: two equations, two unknowns (distance and height).'),
        figure: (language) => <DoubleObservationFigure language={language} />
    },
    {
        id: 'oblique',
        stage: 'problems',
        figureAfterSteps: true,
        title: say('Triangelu ez-angeluzuzenak altuerarekin', 'Triángulos oblicuángulos con la altura', 'المثلثات غير القائمة بالارتفاع', 'Oblique triangles using a height'),
        goal: say('Triangelu ez-angeluzuzen bat ebaztea, altuera marraztuz bi triangelu angeluzuzenetan banatuta.', 'Resolver un triángulo oblicuángulo dividiéndolo en dos triángulos rectángulos con una altura.', 'حل مثلث غير قائم بتقسيمه إلى مثلثين قائمين بواسطة ارتفاع.', 'Solve an oblique triangle by splitting it into two right-angled triangles with a height.'),
        problem: say('ABC triangeluan $AB=37$ cm, $AC=50$ cm eta $A=32°$. Kalkulatu BC.', 'En el triángulo ABC, $AB=37$ cm, $AC=50$ cm y $A=32°$. Calcula BC.', 'في المثلث ABC: $AB=37$ سم و$AC=50$ سم و$A=32°$. احسب BC.', 'In triangle ABC, $AB=37$ cm, $AC=50$ cm and $A=32°$. Calculate BC.'),
        stepsKind: 'steps',
        steps: [
            { text: say('B-tiko altuera.', 'La altura desde B.', 'الارتفاع من B.', 'The height from B.'), math: same('$h=37\\cdot\\sen 32°\\approx 19{,}61$') },
            { text: say('Altuerak AC zatitzen du.', 'La altura parte AC.', 'الارتفاع يقسم AC.', 'The height cuts AC.'), math: same('$37\\cdot\\cos 32°\\approx 31{,}38$') },
            { text: say('Gainerako zatia.', 'El trozo que queda.', 'الجزء الباقي.', 'The remaining piece.'), math: same('$50-31{,}38=18{,}62$') },
            { text: say('Pitagoras: 27,04 cm inguru.', 'Pitágoras: unos 27,04 cm.', 'فيثاغورس: نحو 27.04 سم.', 'Pythagoras: about 27.04 cm.'), math: same('$BC\\approx 27{,}04$') }
        ],
        takeaway: say('Angelu zuzenik ez? Marraztu altuera: bi triangelu angeluzuzen.', '¿Sin ángulo recto? Traza una altura: dos triángulos rectángulos.', 'لا زاوية قائمة؟ ارسم ارتفاعًا: مثلثان قائمان.', 'No right angle? Draw a height: two right-angled triangles.'),
        figure: (language) => <ObliqueFigure language={language} />
    },
    {
        id: 'trig-area',
        stage: 'problems',
        figureAfterSteps: true,
        title: say('Azalerak trigonometriarekin', 'Áreas con trigonometría', 'المساحات بحساب المثلثات', 'Areas with trigonometry'),
        goal: say('Triangeluen, paralelogramoen eta poligono erregularren azalerak arrazoi trigonometrikoekin kalkulatzea.', 'Calcular áreas de triángulos, paralelogramos y polígonos regulares con las razones trigonométricas.', 'حساب مساحات المثلثات ومتوازيات الأضلاع والمضلعات المنتظمة بالنسب المثلثية.', 'Calculate the areas of triangles, parallelograms and regular polygons using trigonometric ratios.'),
        needs: [
            { unit: 'dbh3/geometria-plana', topic: 'polygon-areas', title: { eu: 'Poligonoen azalerak', es: 'Áreas de polígonos', en: 'Areas of polygons', ar: 'مساحات المضلعات' } }
        ],
        problem: say('Triangelu baten bi aldeak 6 cm eta 9 cm dira, eta haien arteko angelua 50°. Kalkulatu azalera.', 'Dos lados de un triángulo miden 6 cm y 9 cm y forman un ángulo de 50°. Calcula su área.', 'ضلعان في مثلث طولاهما 6 سم و9 سم والزاوية بينهما 50°. احسب مساحته.', 'Two sides of a triangle measure 6 cm and 9 cm and form an angle of 50°. Calculate its area.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Altuera, sinuarekin.', 'La altura, con el seno.', 'الارتفاع بالجيب.', 'The height, using the sine.'), math: same('$h=6\\cdot\\sen 50°\\approx 4{,}60$') },
            { text: say('Oinarria bider altuera zati 2: 20,68 cm² inguru.', 'Base por altura entre 2: unos 20,68 cm².', 'القاعدة في الارتفاع على 2: نحو 20.68 سم².', 'Base times height divided by 2: about 20.68 cm².'), math: same('$\\dfrac{9\\cdot 6\\cdot\\sen 50°}{2}\\approx 20{,}68$') }
        ],
        takeaway: say('Bi alde eta haien arteko angelua: azalera = ½ · b · c · sinua.', 'Dos lados y el ángulo que forman: área = ½ · b · c · seno.', 'ضلعان والزاوية بينهما: المساحة = ½ · b · c · الجيب.', 'Two sides and the angle between them: area = ½ · b · c · sine.'),
        figure: (language) => <TrigAreaFigure language={language} />
    },

    /* ---------- 5. The unit circle ---------- */
    {
        id: 'unit-circle',
        stage: 'circle',
        figureAfterSteps: true,
        title: say('Edozein angeluren arrazoiak', 'Razones de cualquier ángulo', 'نسب أي زاوية', 'Ratios of any angle'),
        goal: say('0° eta 360° arteko angeluen arrazoiak zirkunferentzia goniometrikoan irakurtzea eta haien zeinuak jakitea.', 'Leer en la circunferencia goniométrica las razones de ángulos entre 0° y 360° y conocer sus signos.', 'قراءة نسب الزوايا بين 0° و360° في الدائرة المثلثية ومعرفة إشاراتها.', 'Read the ratios of angles between 0° and 360° on the unit circle, and know their signs.'),
        problem: say('$\\sen\\alpha=0{,}6$ eta $\\alpha$ II. koadrantean dago. Kalkulatu $\\cos\\alpha$ eta $\\tg\\alpha$.', '$\\sen\\alpha=0{,}6$ y $\\alpha$ está en el II cuadrante. Calcula $\\cos\\alpha$ y $\\tg\\alpha$.', '$\\sen\\alpha=0{,}6$ و$\\alpha$ في الربع الثاني. احسب $\\cos\\alpha$ و$\\tg\\alpha$.', '$\\sin\\alpha=0{,}6$ and $\\alpha$ is in the second quadrant. Calculate $\\cos\\alpha$ and $\\tan\\alpha$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Oinarrizko erlazioa.', 'La relación fundamental.', 'العلاقة الأساسية.', 'The fundamental relation.'), math: same('$\\cos^{2}\\alpha=1-0{,}36=0{,}64$') },
            { text: say('II. koadrantean kosinua negatiboa da.', 'En el II cuadrante el coseno es negativo.', 'في الربع الثاني جيب التمام سالب.', 'In the second quadrant the cosine is negative.'), math: same('$\\cos\\alpha=-0{,}8$') },
            { text: say('Tangentea.', 'La tangente.', 'الظل.', 'The tangent.'), math: same('$\\tg\\alpha=\\dfrac{0{,}6}{-0{,}8}=-0{,}75$') }
        ],
        takeaway: say('Kosinua abzisa da eta sinua ordenatua. I: dena +. II: sinua +. III: tangentea +. IV: kosinua +.', 'El coseno es la abscisa y el seno la ordenada. I: todo +. II: seno +. III: tangente +. IV: coseno +.', 'جيب التمام هو الفاصلة والجيب هو الترتيب. الأول: الكل +. الثاني: الجيب +. الثالث: الظل +. الرابع: جيب التمام +.', 'The cosine is the x-coordinate and the sine is the y-coordinate. I: all +. II: sine +. III: tangent +. IV: cosine +.'),
        figure: (language) => <UnitCircleFigure language={language} />
    },
    {
        id: 'reduction',
        stage: 'circle',
        title: say('Angelu erlazionatuak', 'Ángulos relacionados', 'الزوايا المرتبطة', 'Related angles'),
        goal: say('Edozein angeluren arrazoiak lehen koadranteko angelu baten arrazoietara laburtzea.', 'Reducir las razones de cualquier ángulo a las de un ángulo del primer cuadrante.', 'إرجاع نسب أي زاوية إلى نسب زاوية من الربع الأول.', 'Reduce the ratios of any angle to those of an angle in the first quadrant.'),
        problem: say('Kalkulatu $\\tg 315°$-ren balio zehatza.', 'Calcula el valor exacto de $\\tg 315°$.', 'احسب القيمة المضبوطة لـ $\\tg 315°$.', 'Calculate the exact value of $\\tan 315°$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('315° IV. koadrantean dago.', '315° está en el IV cuadrante.', '315° في الربع الرابع.', '315° is in the fourth quadrant.'), math: same('$315°=360°-45°$') },
            { text: say('Sinua aldatu, kosinua ez.', 'Cambia el seno, no el coseno.', 'يتغير الجيب لا جيب التمام.', 'Only the sine changes sign, not the cosine.'), math: same('$\\sen 315°=-\\dfrac{\\sqrt{2}}{2}$') },
            { text: say('Tangentea: −1.', 'Tangente: −1.', 'الظل: −1.', 'Tangent: −1.'), math: same('$\\tg 315°=-\\tg 45°=-1$') }
        ],
        takeaway: say('Murriztu lehen koadrantera: balio absolutu bera, zeinua koadrantearena. Buelta osoak kendu.', 'Reduce al primer cuadrante: mismo valor absoluto, el signo del cuadrante. Quita las vueltas completas.', 'أرجِع إلى الربع الأول: القيمة المطلقة نفسها وإشارة الربع. واحذف الدورات الكاملة.', 'Reduce to the first quadrant: same absolute value, and the sign of the quadrant. Remove the full turns.'),
        figure: (language) => <RelatedAnglesFigure language={language} />
    },
    {
        id: 'radians',
        stage: 'circle',
        title: say('Radiana', 'El radián', 'الراديان', 'The radian'),
        goal: say('Angeluak gradutik radianera eta radianetik gradura pasatzea.', 'Pasar ángulos de grados a radianes y de radianes a grados.', 'تحويل الزوايا من الدرجات إلى الراديان ومن الراديان إلى الدرجات.', 'Convert angles from degrees to radians and from radians to degrees.'),
        needs: [
            { unit: 'dbh4-akademikoak/areas-volumenes-semejanza', topic: 'circle-parts', title: { eu: 'Arkua, sektorea eta koroa', es: 'Arco, sector y corona', en: 'Arc, sector and annulus', ar: 'القوس والقطاع والحلقة' } }
        ],
        problem: say('Pasa 150° radianetara: π-ren funtzioan eta hamartar gisa.', 'Pasa 150° a radianes: en función de π y en forma decimal.', 'حوّل 150° إلى الراديان: بدلالة π وفي صورة عشرية.', 'Convert 150° to radians: in terms of π and as a decimal.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu π/180 zatikiaz.', 'Multiplica por π/180.', 'اضرب في π/180.', 'Multiply by π/180.'), math: same('$150\\cdot\\dfrac{\\pi}{180}=\\dfrac{5\\pi}{6}$') },
            { text: say('Hamartar gisa.', 'En forma decimal.', 'في صورة عشرية.', 'As a decimal.'), math: same('$\\dfrac{5\\pi}{6}\\approx 2{,}62$') }
        ],
        takeaway: say('180° = π rad. Radianetara: bider π/180. Graduetara: bider 180/π.', '180° = π rad. A radianes: por π/180. A grados: por 180/π.', '180° = π rad. إلى الراديان: في π/180. إلى الدرجات: في 180/π.', '180° = π rad. To radians: multiply by π/180. To degrees: multiply by 180/π.'),
        figure: (language) => <RadianFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts), with sen and tg where the language says so */
export const trigonometryTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...localizeNames(trigonometryLessonTexts[topic.id as TrigonometryTopicId]), ...localizeNames(trigonometryLessonChecks[topic.id as TrigonometryTopicId]) }))
