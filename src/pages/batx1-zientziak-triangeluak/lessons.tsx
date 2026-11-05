import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { localizeNames, same, say } from '../dbh4-akademikoak-trigonometria/text'
import {
    AmbiguousFigure,
    CircumcircleFigure,
    CosineRuleFigure,
    ForcesFigure,
    FourCasesFigure,
    HeightStrategyFigure,
    HeronFigure,
    QuadrantSignsFigure,
    QuarterTurnFigure,
    RightReviewFigure,
    SineRuleFigure,
    TriangleKindsFigure,
    TriangulationFigure,
    TurnsFigure,
    TwinAnglesFigure
} from './figures'
import { trianglesLessonChecks, type TrianglesTopicId } from './lessonChecks'
import { trianglesLessonTexts } from './lessonTexts'

/* ==========================================================================
   Triangeluen ebazpena · Batxilergoa 1 · Zientziak — stages and lessons.
   The scope follows unit 4 of Anaya Matemáticas I (ratios of any angle and
   solving triangles) and the triangle half of unit 4 of Santillana 1.º
   Bachillerato Ciencias (the formulas, the radian and the graphs go to the
   next topic). What 4. DBH académicas already taught comes back as a short
   review with «Review first» links; angles beyond 360°, 90° ± α and
   270° ± α, the second angle the calculator does not give, the sine rule
   with 2R, the ambiguous case, the cosine rule, Heron and triangulation are
   new. Inside formulas \sen and \tg are written in each language's names
   (text.ts of 4. DBH); lessonTexts.ts and lessonChecks.ts write \sin and
   \tan and localizeNames turns them into those names.
   ========================================================================== */

export type TrianglesStageId = 'angles' | 'right' | 'sines' | 'cosines' | 'applications'

export const trianglesStages: UnitStage[] = [
    { id: 'angles', tone: 'blue', title: { eu: 'Edozein angelu', es: 'Cualquier ángulo', en: 'Any angle', ar: 'أي زاوية' } },
    { id: 'right', tone: 'violet', title: { eu: 'Angeluzuzenak eta altuera', es: 'Rectángulos y altura', en: 'Right triangles and heights', ar: 'القائمة والارتفاع' } },
    { id: 'sines', tone: 'mustard', title: { eu: 'Sinuaren teorema', es: 'Teorema de los senos', en: 'The sine rule', ar: 'مبرهنة الجيوب' } },
    { id: 'cosines', tone: 'coral', title: { eu: 'Kosinuaren teorema', es: 'Teorema del coseno', en: 'The cosine rule', ar: 'مبرهنة جيب التمام' } },
    { id: 'applications', tone: 'green', title: { eu: 'Azalerak eta problemak', es: 'Áreas y problemas', en: 'Areas and problems', ar: 'المساحات والمسائل' } }
]

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Any angle ---------- */
    {
        id: 'quadrant-ratios',
        stage: 'angles',
        figureAfterSteps: true,
        title: say('Arrazoiak lau koadranteetan', 'Razones en los cuatro cuadrantes', 'النسب في الأرباع الأربعة', 'Ratios in the four quadrants'),
        goal: say('Arrazoi bat eta koadrantea jakinda, beste arrazoiak kalkulatzea, zeinu egokiarekin.', 'Calcular las demás razones conociendo una y el cuadrante, con el signo correcto.', 'حساب النسب الأخرى بمعرفة نسبة واحدة والربع، بالإشارة الصحيحة.', 'Work out the other ratios from one ratio and the quadrant, with the right sign.'),
        needs: [
            { unit: 'dbh4-akademikoak/trigonometria', topic: 'one-ratio', title: { eu: 'Arrazoi batetik besteetara', es: 'De una razón a las demás', en: 'From one ratio to the others', ar: 'من نسبة إلى النسب الأخرى' } },
            { unit: 'dbh4-akademikoak/trigonometria', topic: 'unit-circle', title: { eu: 'Edozein angeluren arrazoiak', es: 'Razones de cualquier ángulo', en: 'Ratios of any angle', ar: 'نسب أي زاوية' } }
        ],
        problem: say('$\\sen\\alpha=\\frac{3}{5}$ da, eta α bigarren koadrantean dago. Kalkulatu $\\cos\\alpha$ eta $\\tg\\alpha$.', 'Sabemos que $\\sen\\alpha=\\frac{3}{5}$ y que α está en el segundo cuadrante. Calcula $\\cos\\alpha$ y $\\tg\\alpha$.', 'نعلم أن $\\sen\\alpha=\\frac{3}{5}$ وأن α في الربع الثاني. احسب $\\cos\\alpha$ و$\\tg\\alpha$.', 'We know that $\\sin\\alpha=\\frac{3}{5}$ and that α is in the second quadrant. Work out $\\cos\\alpha$ and $\\tan\\alpha$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Oinarrizko erlazioak balio absolutua ematen du.', 'La relación fundamental da el valor absoluto.', 'تعطي العلاقة الأساسية القيمة المطلقة.', 'The fundamental identity gives the absolute value.'), math: same('$\\cos^2\\alpha=1-\\frac{9}{25}=\\frac{16}{25}$') },
            { text: say('Bigarren koadrantean kosinua negatiboa da.', 'En el segundo cuadrante el coseno es negativo.', 'جيب التمام سالب في الربع الثاني.', 'In the second quadrant the cosine is negative.'), math: same('$\\cos\\alpha=-\\frac{4}{5}$') },
            { text: say('Tangentea sinua zati kosinua da.', 'La tangente es el seno entre el coseno.', 'الظل هو الجيب على جيب التمام.', 'The tangent is the sine divided by the cosine.'), math: same('$\\tg\\alpha=\\frac{3}{5}\\div\\left(-\\frac{4}{5}\\right)=-\\frac{3}{4}$') }
        ],
        takeaway: say('$\\sen^2\\alpha+\\cos^2\\alpha=1$ erlazioak balioa ematen du; koadranteak, zeinua.', '$\\sen^2\\alpha+\\cos^2\\alpha=1$ da el valor; el cuadrante, el signo.', '$\\sen^2\\alpha+\\cos^2\\alpha=1$ تعطي القيمة، والربع يعطي الإشارة.', '$\\sin^2\\alpha+\\cos^2\\alpha=1$ gives the value; the quadrant gives the sign.'),
        figure: (language) => <QuadrantSignsFigure language={language} />
    },
    {
        id: 'big-angles',
        stage: 'angles',
        title: say('360° baino handiagoko angeluak eta negatiboak', 'Ángulos mayores de 360° y negativos', 'زوايا أكبر من 360° وزوايا سالبة', 'Angles over 360° and negative angles'),
        goal: say('Edozein angelu 0°-tik 360°-rako tartera eramatea, bira osoak kenduz, eta haren arrazoiak kalkulatzea.', 'Llevar cualquier ángulo al intervalo de 0° a 360° quitando vueltas completas, y calcular sus razones.', 'إرجاع أي زاوية إلى المجال من 0° إلى 360° بحذف الدورات الكاملة، وحساب نسبها.', 'Bring any angle into the range 0° to 360° by taking away full turns, and work out its ratios.'),
        needs: [
            { unit: 'dbh4-akademikoak/trigonometria', topic: 'reduction', title: { eu: 'Angelu erlazionatuak', es: 'Ángulos relacionados', en: 'Related angles', ar: 'الزوايا المرتبطة' } }
        ],
        problem: say('Kalkulatu $\\sen 1230°$.', 'Calcula $\\sen 1230°$.', 'احسب $\\sen 1230°$.', 'Work out $\\sin 1230°$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatitu 1230 zati 360: zatidura 3 da.', 'Divide 1230 entre 360: el cociente es 3.', 'اقسم 1230 على 360: خارج القسمة 3.', 'Divide 1230 by 360: the quotient is 3.'), math: same('$1230°=3\\cdot 360°+150°$') },
            { text: say('Hiru bira eta 150°: 150°-ren posizio bera.', 'Tres vueltas y 150°: la misma posición que 150°.', 'ثلاث دورات و150°: موضع 150° نفسه.', 'Three turns and 150°: the same position as 150°.'), math: same('$\\sen 1230°=\\sen 150°$') },
            { text: say('150° = 180° − 30°, eta sinua ez da aldatzen.', '150° = 180° − 30°, y el seno no cambia.', '150° = 180° − 30°، والجيب لا يتغير.', '150° = 180° − 30°, and the sine does not change.'), math: same('$\\sen 150°=\\sen 30°=\\frac{1}{2}$') }
        ],
        takeaway: say('Bira osoak kentzean arrazoiak ez dira aldatzen: $\\sen(\\alpha+k\\cdot 360°)=\\sen\\alpha$.', 'Quitar vueltas enteras no cambia las razones: $\\sen(\\alpha+k\\cdot 360°)=\\sen\\alpha$.', 'حذف الدورات الكاملة لا يغيّر النسب: $\\sen(\\alpha+k\\cdot 360°)=\\sen\\alpha$.', 'Taking away whole turns does not change the ratios: $\\sin(\\alpha+k\\cdot 360°)=\\sin\\alpha$.'),
        figure: (language) => <TurnsFigure language={language} />
    },
    {
        id: 'related-angles',
        stage: 'angles',
        title: say('Lehen koadrantera eramatea', 'Reducir al primer cuadrante', 'الإرجاع إلى الربع الأول', 'Reducing to the first quadrant'),
        goal: say('90° ± α, 180° ± α, 270° ± α eta −α angeluen arrazoiak α-renekin adieraztea.', 'Expresar las razones de 90° ± α, 180° ± α, 270° ± α y −α con las de α.', 'التعبير عن نسب 90° ± α و180° ± α و270° ± α و−α بنسب α.', 'Write the ratios of 90° ± α, 180° ± α, 270° ± α and −α using those of α.'),
        needs: [
            { unit: 'dbh4-akademikoak/trigonometria', topic: 'ratio-properties', title: { eu: 'Arrazoiak ez daude tamainaren mende', es: 'Las razones no dependen del tamaño', en: 'The ratios do not depend on size', ar: 'النسب لا تتوقف على الحجم' } }
        ],
        problem: say('$\\sen 25°\\approx 0{,}4226$ eta $\\cos 25°\\approx 0{,}9063$ jakinda, kalkulatu 115°-ren arrazoiak.', 'Sabiendo que $\\sen 25°\\approx 0{,}4226$ y $\\cos 25°\\approx 0{,}9063$, calcula las razones de 115°.', 'علمًا أن $\\sen 25°\\approx 0{,}4226$ و$\\cos 25°\\approx 0{,}9063$، احسب نسب الزاوية 115°.', 'Knowing that $\\sin 25°\\approx 0{,}4226$ and $\\cos 25°\\approx 0{,}9063$, work out the ratios of 115°.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi 115° 90° gehi angelu bat bezala.', 'Escribe 115° como 90° más un ángulo.', 'اكتب 115° على صورة 90° زائد زاوية.', 'Write 115° as 90° plus an angle.'), math: same('$115°=90°+25°$') },
            { text: say('90°-rekin sinua eta kosinua trukatzen dira.', 'Con 90° el seno y el coseno se intercambian.', 'مع 90° يتبادل الجيب وجيب التمام.', 'With 90° the sine and the cosine swap.'), math: same('$\\sen 115°=\\cos 25°\\approx 0{,}9063$') },
            { text: say('Bigarren koadrantean kosinua negatiboa da.', 'En el segundo cuadrante el coseno es negativo.', 'جيب التمام سالب في الربع الثاني.', 'In the second quadrant the cosine is negative.'), math: same('$\\cos 115°=-\\sen 25°\\approx -0{,}4226$') },
            { text: say('Tangentea, zatiketaz.', 'La tangente, dividiendo.', 'الظل بالقسمة.', 'The tangent, by dividing.'), math: same('$\\tg 115°=-\\frac{\\cos 25°}{\\sen 25°}\\approx -2{,}14$') }
        ],
        takeaway: say('180° ± α eta 360° − α angeluekin arrazoiak izen bera du; 90° ± α eta 270° ± α angeluekin sinua kosinu bihurtzen da. Zeinua, koadrantearena.', 'Con 180° ± α y 360° − α la razón no cambia de nombre; con 90° ± α y 270° ± α el seno pasa a coseno. El signo, el del cuadrante.', 'مع 180° ± α و360° − α لا يتغير اسم النسبة، ومع 90° ± α و270° ± α يصير الجيب جيب تمام. والإشارة إشارة الربع.', 'With 180° ± α and 360° − α the ratio keeps its name; with 90° ± α and 270° ± α the sine becomes the cosine. The sign is that of the quadrant.'),
        figure: (language) => <QuarterTurnFigure language={language} />
    },
    {
        id: 'inverse-angles',
        stage: 'angles',
        figureAfterSteps: true,
        title: say('Kalkulagailua eta beste angelua', 'La calculadora y el otro ángulo', 'الآلة الحاسبة والزاوية الأخرى', 'The calculator and the other angle'),
        goal: say('Arrazoi jakin bat duten 0°-tik 360°-rako bi angeluak aurkitzea, kalkulagailuak bat bakarrik ematen duela jakinda.', 'Hallar los dos ángulos entre 0° y 360° que tienen una razón dada, sabiendo que la calculadora solo da uno.', 'إيجاد الزاويتين بين 0° و360° اللتين لهما نسبة معطاة، مع العلم أن الآلة الحاسبة تعطي واحدة فقط.', 'Find the two angles between 0° and 360° with a given ratio, knowing that the calculator only gives one.'),
        needs: [
            { unit: 'dbh4-akademikoak/trigonometria', topic: 'calculator', title: { eu: 'Kalkulagailua trigonometrian', es: 'La calculadora en trigonometría', en: 'The calculator in trigonometry', ar: 'الآلة الحاسبة في حساب المثلثات' } }
        ],
        problem: say('Aurkitu $\\sen\\alpha=0{,}6$ betetzen duten 0°-tik 360°-rako angeluak.', 'Halla los ángulos entre 0° y 360° que cumplen $\\sen\\alpha=0{,}6$.', 'أوجد الزوايا بين 0° و360° التي تحقق $\\sen\\alpha=0{,}6$.', 'Find the angles between 0° and 360° with $\\sin\\alpha=0{,}6$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('SHIFT sin: kalkulagailuak angelu bat ematen du.', 'SHIFT sen: la calculadora da un ángulo.', 'SHIFT sin: تعطي الآلة الحاسبة زاوية واحدة.', 'SHIFT sin: the calculator gives one angle.'), math: same('$\\alpha_1\\approx 36{,}9°$') },
            { text: say('Sinua bigarren koadrantean ere positiboa da.', 'El seno también es positivo en el segundo cuadrante.', 'الجيب موجب أيضًا في الربع الثاني.', 'The sine is positive in the second quadrant too.'), math: same('$\\alpha_2\\approx 180°-36{,}9°=143{,}1°$') },
            { text: say('Biek sinu bera dute.', 'Los dos tienen el mismo seno.', 'للزاويتين الجيب نفسه.', 'Both have the same sine.'), math: same('$\\sen 143{,}1°\\approx 0{,}6$') }
        ],
        takeaway: say('Sinu bera: α eta 180° − α. Kosinu bera: α eta 360° − α. Tangente bera: α eta 180° + α.', 'Mismo seno: α y 180° − α. Mismo coseno: α y 360° − α. Misma tangente: α y 180° + α.', 'الجيب نفسه: α و180° − α. وجيب التمام نفسه: α و360° − α. والظل نفسه: α و180° + α.', 'Same sine: α and 180° − α. Same cosine: α and 360° − α. Same tangent: α and 180° + α.'),
        figure: (language) => <TwinAnglesFigure language={language} />
    },

    /* ---------- 2. Right triangles and the height ---------- */
    {
        id: 'right-review',
        stage: 'right',
        figureAfterSteps: true,
        title: say('Triangelu angeluzuzenak ebaztea', 'Resolver triángulos rectángulos', 'حل المثلثات القائمة', 'Solving right-angled triangles'),
        goal: say('Bi daturekin (horietako bat aldea) triangelu angeluzuzen bat ebaztea gogoratzea, triangelu ez-angeluzuzenen barruan erabiltzeko.', 'Repasar cómo se resuelve un triángulo rectángulo con dos datos, uno de ellos un lado, para usarlo dentro de los oblicuángulos.', 'مراجعة حل مثلث قائم بمعطيين أحدهما ضلع، لاستعماله داخل المثلثات غير القائمة.', 'Review how to solve a right-angled triangle from two pieces of data, one of them a side, to use it inside oblique triangles.'),
        needs: [
            { unit: 'dbh4-akademikoak/trigonometria', topic: 'two-sides', title: { eu: 'Bi alde ezagututa', es: 'Conociendo dos lados', en: 'Knowing two sides', ar: 'بمعرفة ضلعين' } },
            { unit: 'dbh4-akademikoak/trigonometria', topic: 'side-angle', title: { eu: 'Alde bat eta angelu bat ezagututa', es: 'Conociendo un lado y un ángulo', en: 'Knowing one side and one angle', ar: 'بمعرفة ضلع وزاوية' } }
        ],
        problem: say('ABC triangelua angeluzuzena da A erpinean, eta katetoak $b=20$ cm eta $c=21$ cm dira. Ebatzi.', 'El triángulo ABC es rectángulo en A y sus catetos miden $b=20$ cm y $c=21$ cm. Resuélvelo.', 'المثلث ABC قائم في A، وضلعاه القائمان $b=20$ سم و$c=21$ سم. حُلّه.', 'Triangle ABC has a right angle at A and its legs measure $b=20$ cm and $c=21$ cm. Solve it.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hipotenusa, Pitagorasekin.', 'La hipotenusa, con Pitágoras.', 'الوتر بفيثاغورس.', 'The hypotenuse, using Pythagoras.'), math: same('$a=\\sqrt{20^2+21^2}=29$') },
            { text: say('B angeluaren aurkakoa b da, eta ondokoa c.', 'El opuesto a B es b y el contiguo, c.', 'الضلع المقابل لـ B هو b والمجاور c.', 'The side opposite B is b and the adjacent one is c.'), math: same('$\\tg B=\\frac{20}{21}\\ \\to\\ B\\approx 43{,}6°$') },
            { text: say('Bi angelu zorrotzek 90° egiten dute.', 'Los dos ángulos agudos suman 90°.', 'مجموع الزاويتين الحادتين 90°.', 'The two acute angles add up to 90°.'), math: same('$C\\approx 90°-43{,}6°=46{,}4°$') }
        ],
        takeaway: say('Ebaztea hiru aldeak eta hiru angeluak aurkitzea da. Angeluzuzenean bi datu nahikoak dira, bat aldea bada: Pitagoras, arrazoi bat eta $B+C=90°$.', 'Resolver es hallar los tres lados y los tres ángulos. En un rectángulo bastan dos datos si uno es un lado: Pitágoras, una razón y $B+C=90°$.', 'الحل إيجاد الأضلاع الثلاثة والزوايا الثلاث. في المثلث القائم يكفي معطيان إذا كان أحدهما ضلعًا: فيثاغورس ونسبة و$B+C=90°$.', 'Solving means finding the three sides and the three angles. In a right-angled triangle two pieces of data are enough if one is a side: Pythagoras, a ratio and $B+C=90°$.'),
        figure: (language) => <RightReviewFigure language={language} />
    },
    {
        id: 'height-strategy',
        stage: 'right',
        title: say('Altueraren estrategia', 'La estrategia de la altura', 'استراتيجية الارتفاع', 'The height strategy'),
        goal: say('Triangelu ez-angeluzuzen bat ebaztea, altuera bat marraztuz bi triangelu angeluzuzenetan banatuta, altuera kanpoan erortzen denean ere.', 'Resolver un triángulo oblicuángulo trazando una altura que lo parte en dos rectángulos, también cuando la altura cae fuera.', 'حل مثلث غير قائم برسم ارتفاع يقسمه إلى مثلثين قائمين، حتى عندما يقع الارتفاع خارجه.', 'Solve an oblique triangle by drawing a height that splits it into two right-angled triangles, even when the height falls outside.'),
        needs: [
            { unit: 'dbh4-akademikoak/trigonometria', topic: 'oblique', title: { eu: 'Triangelu ez-angeluzuzenak altuerarekin', es: 'Triángulos oblicuángulos con la altura', en: 'Oblique triangles using a height', ar: 'المثلثات غير القائمة بالارتفاع' } }
        ],
        problem: say('ABC triangeluan $c=10$ cm, $A=30°$ eta $B=45°$ dira. Kalkulatu C erpinetik ateratako altuera eta $b$ aldea.', 'En el triángulo ABC, $c=10$ cm, $A=30°$ y $B=45°$. Halla la altura desde C y el lado $b$.', 'في المثلث ABC: $c=10$ سم و$A=30°$ و$B=45°$. أوجد الارتفاع النازل من C والضلع $b$.', 'In triangle ABC, $c=10$ cm, $A=30°$ and $B=45°$. Find the height from C and the side $b$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Altuerak AB bi zatitan banatzen du; bakoitza bere triangelu angeluzuzenean.', 'La altura parte AB en dos trozos, cada uno en su triángulo rectángulo.', 'يقسم الارتفاع AB إلى جزأين، كل منهما في مثلثه القائم.', 'The height splits AB into two pieces, each in its own right-angled triangle.'), math: same('$AH=\\frac{h}{\\tg 30°}\\qquad HB=\\frac{h}{\\tg 45°}$') },
            { text: say('Bi zatiek $c$ egiten dute.', 'Los dos trozos suman $c$.', 'مجموع الجزأين $c$.', 'The two pieces add up to $c$.'), math: same('$\\frac{h}{\\tg 30°}+\\frac{h}{\\tg 45°}=10\\ \\to\\ h\\approx 3{,}66$') },
            { text: say('$b$ aldea, A angeluaren sinuarekin.', 'El lado $b$, con el seno de A.', 'الضلع $b$ بجيب A.', 'The side $b$, using the sine of A.'), math: same('$b=\\frac{h}{\\sen 30°}\\approx 7{,}32$') }
        ],
        takeaway: say('Altuera batek triangelua altuera hori partekatzen duten bi angeluzuzenetan banatzen du. Oinarriko angelu bat kamutsa bada, altuera kanpoan erortzen da eta $180°$ ken angelu hori erabiltzen da.', 'Una altura parte el triángulo en dos rectángulos que la comparten. Si un ángulo de la base es obtuso, la altura cae fuera y se usa $180°$ menos ese ángulo.', 'يقسم الارتفاع المثلث إلى مثلثين قائمين يشتركان فيه. وإذا كانت زاوية من القاعدة منفرجة وقع الارتفاع خارجه واستعملنا $180°$ ناقص تلك الزاوية.', 'A height splits the triangle into two right-angled triangles that share it. If an angle on the base is obtuse, the height falls outside and you use $180°$ minus that angle.'),
        figure: (language) => <HeightStrategyFigure language={language} />
    },

    /* ---------- 3. The sine rule ---------- */
    {
        id: 'sine-rule',
        stage: 'sines',
        title: say('Sinuaren teorema', 'El teorema de los senos', 'مبرهنة الجيوب', 'The sine rule'),
        goal: say('Sinuaren teorema erabiltzea bi angelu eta alde bat ezagutzen diren triangelu bat ebazteko.', 'Usar el teorema de los senos para resolver un triángulo del que se conocen dos ángulos y un lado.', 'استعمال مبرهنة الجيوب لحل مثلث نعرف منه زاويتين وضلعًا.', 'Use the sine rule to solve a triangle when two angles and one side are known.'),
        needs: [
            { unit: 'batx1-zientziak/resolucion-triangulos', topic: 'height-strategy', title: { eu: 'Altueraren estrategia', es: 'La estrategia de la altura', en: 'The height strategy', ar: 'استراتيجية الارتفاع' } }
        ],
        problem: say('ABC triangeluan $a=12$ cm, $B=40°$ eta $C=75°$ dira. Ebatzi.', 'En el triángulo ABC, $a=12$ cm, $B=40°$ y $C=75°$. Resuélvelo.', 'في المثلث ABC: $a=12$ سم و$B=40°$ و$C=75°$. حُلّه.', 'In triangle ABC, $a=12$ cm, $B=40°$ and $C=75°$. Solve it.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hirugarren angelua, 180°-tik.', 'El tercer ángulo, de 180°.', 'الزاوية الثالثة من 180°.', 'The third angle, from 180°.'), math: same('$A=180°-40°-75°=65°$') },
            { text: say('$b$ aldea, $a$ eta A bikotearekin.', 'El lado $b$, con la pareja $a$ y A.', 'الضلع $b$ بالثنائي $a$ وA.', 'The side $b$, using the pair $a$ and A.'), math: same('$b=\\frac{12\\cdot\\sen 40°}{\\sen 65°}\\approx 8{,}51$') },
            { text: say('$c$ aldea, berdin.', 'El lado $c$, igual.', 'الضلع $c$ بالطريقة نفسها.', 'The side $c$, the same way.'), math: same('$c=\\frac{12\\cdot\\sen 75°}{\\sen 65°}\\approx 12{,}79$') }
        ],
        takeaway: say('Alde bakoitza zati bere aurkako angeluaren sinua beti berdina da: $\\frac{a}{\\sen A}=\\frac{b}{\\sen B}=\\frac{c}{\\sen C}$.', 'Cada lado entre el seno de su ángulo opuesto da lo mismo: $\\frac{a}{\\sen A}=\\frac{b}{\\sen B}=\\frac{c}{\\sen C}$.', 'كل ضلع على جيب الزاوية المقابلة له يعطي العدد نفسه: $\\frac{a}{\\sen A}=\\frac{b}{\\sen B}=\\frac{c}{\\sen C}$.', 'Each side divided by the sine of its opposite angle gives the same number: $\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}$.'),
        figure: (language) => <SineRuleFigure language={language} />
    },
    {
        id: 'ambiguous-case',
        stage: 'sines',
        figureAfterSteps: true,
        title: say('Kasu zalantzazkoa', 'El caso dudoso', 'الحالة الملتبسة', 'The ambiguous case'),
        goal: say('Bi alde eta horietako baten aurkako angeluak triangelurik ez, bat edo bi ematen dituzten jakitea.', 'Saber si dos lados y el ángulo opuesto a uno de ellos dan ningún triángulo, uno o dos.', 'معرفة ما إذا كان ضلعان والزاوية المقابلة لأحدهما يعطيان لا مثلث أو مثلثًا أو مثلثين.', 'Tell whether two sides and the angle opposite one of them give no triangle, one or two.'),
        needs: [
            { unit: 'batx1-zientziak/resolucion-triangulos', topic: 'inverse-angles', title: { eu: 'Kalkulagailua eta beste angelua', es: 'La calculadora y el otro ángulo', en: 'The calculator and the other angle', ar: 'الآلة الحاسبة والزاوية الأخرى' } }
        ],
        problem: say('ABC triangeluan $a=6$ cm, $b=8$ cm eta $A=40°$ dira. Zenbat triangelu daude? Kalkulatu B.', 'En el triángulo ABC, $a=6$ cm, $b=8$ cm y $A=40°$. ¿Cuántos triángulos hay? Halla B.', 'في المثلث ABC: $a=6$ سم و$b=8$ سم و$A=40°$. كم مثلثًا يوجد؟ أوجد B.', 'In triangle ABC, $a=6$ cm, $b=8$ cm and $A=40°$. How many triangles are there? Find B.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Sinuaren teorema, B angeluarentzat.', 'El teorema de los senos, para B.', 'مبرهنة الجيوب لإيجاد B.', 'The sine rule, for B.'), math: same('$\\sen B=\\frac{8\\cdot\\sen 40°}{6}\\approx 0{,}857$') },
            { text: say('Bi angeluk dute sinu hori.', 'Dos ángulos tienen ese seno.', 'لزاويتين هذا الجيب.', 'Two angles have that sine.'), math: same('$B_1\\approx 59{,}0°\\qquad B_2\\approx 121{,}0°$') },
            { text: say('Biak sartzen dira A angeluarekin: bi triangelu.', 'Los dos caben con A: dos triángulos.', 'كلتاهما تتسعان مع A: مثلثان.', 'Both fit with A: two triangles.'), math: same('$40°+121{,}0°<180°$') }
        ],
        takeaway: say('Bi alde eta baten aurkako angelua: $\\sen B>1$ bada, triangelurik ez; bi angeluak A-rekin sartzen badira, bi; kamutsa sartzen ez bada, bat.', 'Dos lados y el ángulo opuesto a uno: si $\\sen B>1$, ningún triángulo; si los dos ángulos caben con A, dos; si el obtuso no cabe, uno.', 'ضلعان والزاوية المقابلة لأحدهما: إذا كان $\\sen B>1$ فلا مثلث؛ وإذا اتسعت الزاويتان مع A فمثلثان؛ وإذا لم تتسع المنفرجة فمثلث واحد.', 'Two sides and the angle opposite one: if $\\sin B>1$, no triangle; if both angles fit with A, two; if the obtuse one does not fit, one.'),
        figure: (language) => <AmbiguousFigure language={language} />
    },
    {
        id: 'circumradius',
        stage: 'sines',
        title: say('Zirkunferentzia zirkunskribatua', 'La circunferencia circunscrita', 'الدائرة المحيطة', 'The circumscribed circle'),
        goal: say('Sinuaren teoremaren zatidura komuna zirkunferentzia zirkunskribatuaren diametroa dela jakitea, eta haren erradioa kalkulatzeko erabiltzea.', 'Saber que el cociente común del teorema de los senos es el diámetro de la circunferencia circunscrita y usarlo para hallar su radio.', 'معرفة أن النسبة المشتركة في مبرهنة الجيوب هي قطر الدائرة المحيطة، واستعمالها لإيجاد نصف قطرها.', 'Know that the common quotient of the sine rule is the diameter of the circumscribed circle, and use it to find its radius.'),
        needs: [
            { unit: 'dbh3/geometria-plana', topic: 'notable-points', title: { eu: 'Triangeluaren puntu nabarmenak', es: 'Puntos notables del triángulo', en: 'Notable points of a triangle', ar: 'النقاط الشهيرة في المثلث' } },
            { unit: 'dbh3/geometria-plana', topic: 'circle-angles', title: { eu: 'Angeluak zirkunferentzian', es: 'Ángulos en la circunferencia', en: 'Angles in a circle', ar: 'الزوايا في الدائرة' } }
        ],
        problem: say('Triangelu batean $a=10$ cm eta $A=30°$ dira. Zenbat da zirkunferentzia zirkunskribatuaren erradioa?', 'En un triángulo, $a=10$ cm y $A=30°$. ¿Cuánto mide el radio de la circunferencia circunscrita?', 'في مثلث: $a=10$ سم و$A=30°$. كم نصف قطر الدائرة المحيطة؟', 'In a triangle, $a=10$ cm and $A=30°$. What is the radius of the circumscribed circle?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Sinuaren teoremaren zatidura.', 'El cociente del teorema de los senos.', 'نسبة مبرهنة الجيوب.', 'The quotient of the sine rule.'), math: same('$\\frac{a}{\\sen A}=\\frac{10}{\\sen 30°}=20$') },
            { text: say('Zenbaki hori diametroa da.', 'Ese número es el diámetro.', 'هذا العدد هو القطر.', 'That number is the diameter.'), math: same('$2R=20\\ \\to\\ R=10$') }
        ],
        takeaway: say('$\\frac{a}{\\sen A}=\\frac{b}{\\sen B}=\\frac{c}{\\sen C}=2R$: hiru erpinetatik pasatzen den zirkunferentziaren diametroa.', '$\\frac{a}{\\sen A}=\\frac{b}{\\sen B}=\\frac{c}{\\sen C}=2R$: el diámetro de la circunferencia que pasa por los tres vértices.', '$\\frac{a}{\\sen A}=\\frac{b}{\\sen B}=\\frac{c}{\\sen C}=2R$: قطر الدائرة المارة بالرؤوس الثلاثة.', '$\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}=2R$: the diameter of the circle through the three vertices.'),
        figure: (language) => <CircumcircleFigure language={language} />
    },

    /* ---------- 4. The cosine rule ---------- */
    {
        id: 'cosine-rule',
        stage: 'cosines',
        title: say('Kosinuaren teorema', 'El teorema del coseno', 'مبرهنة جيب التمام', 'The cosine rule'),
        goal: say('Triangelu baten hirugarren aldea kalkulatzea, bi alde eta haien arteko angelua jakinda, kosinuaren teoremarekin.', 'Hallar el tercer lado de un triángulo conocidos dos lados y el ángulo que forman, con el teorema del coseno.', 'إيجاد الضلع الثالث في مثلث بمعرفة ضلعين والزاوية بينهما، بمبرهنة جيب التمام.', 'Find the third side of a triangle from two sides and the angle between them, with the cosine rule.'),
        needs: [
            { unit: 'dbh3/geometria-plana', topic: 'pythagoras', title: { eu: 'Pitagorasen teorema', es: 'El teorema de Pitágoras', en: 'Pythagoras\' theorem', ar: 'مبرهنة فيثاغورس' } }
        ],
        problem: say('ABC triangeluan $b=5$ cm, $c=8$ cm eta $A=60°$ dira. Kalkulatu $a$.', 'En el triángulo ABC, $b=5$ cm, $c=8$ cm y $A=60°$. Halla $a$.', 'في المثلث ABC: $b=5$ سم و$c=8$ سم و$A=60°$. أوجد $a$.', 'In triangle ABC, $b=5$ cm, $c=8$ cm and $A=60°$. Find $a$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bi alde eta haien arteko angelua: kosinua.', 'Dos lados y el ángulo que forman: el coseno.', 'ضلعان والزاوية بينهما: جيب التمام.', 'Two sides and the angle between them: the cosine.'), math: same('$a^2=b^2+c^2-2bc\\cdot\\cos A$') },
            { text: say('Ordezkatu: $\\cos 60°=0{,}5$.', 'Sustituye: $\\cos 60°=0{,}5$.', 'عوّض: $\\cos 60°=0{,}5$.', 'Substitute: $\\cos 60°=0{,}5$.'), math: same('$a^2=25+64-80\\cdot 0{,}5=49$') },
            { text: say('Erro karratua.', 'La raíz cuadrada.', 'الجذر التربيعي.', 'The square root.'), math: same('$a=7$') }
        ],
        takeaway: say('$a^2=b^2+c^2-2bc\\cdot\\cos A$: Pitagoras zuzenketa batekin. A kamutsa bada, kosinua negatiboa da eta zuzenketak batu egiten du.', '$a^2=b^2+c^2-2bc\\cdot\\cos A$: Pitágoras con una corrección. Si A es obtuso, el coseno es negativo y la corrección suma.', '$a^2=b^2+c^2-2bc\\cdot\\cos A$: فيثاغورس مع تصحيح. وإذا كانت A منفرجة كان جيب التمام سالبًا وأضاف التصحيح.', '$a^2=b^2+c^2-2bc\\cdot\\cos A$: Pythagoras with a correction. If A is obtuse, the cosine is negative and the correction adds.'),
        figure: (language) => <CosineRuleFigure language={language} />
    },
    {
        id: 'three-sides',
        stage: 'cosines',
        title: say('Hiru aldeak ezagututa', 'Conociendo los tres lados', 'بمعرفة الأضلاع الثلاثة', 'Knowing the three sides'),
        goal: say('Triangelu baten angeluak hiru aldeetatik kalkulatzea, eta angeluzorrotza, angeluzuzena ala angelukamutsa den jakitea.', 'Hallar los ángulos de un triángulo a partir de sus tres lados y saber si es acutángulo, rectángulo u obtusángulo.', 'إيجاد زوايا مثلث من أضلاعه الثلاثة ومعرفة هل هو حاد الزوايا أم قائم أم منفرج.', 'Find the angles of a triangle from its three sides and tell whether it is acute, right-angled or obtuse.'),
        needs: [
            { unit: 'batx1-zientziak/resolucion-triangulos', topic: 'cosine-rule', title: { eu: 'Kosinuaren teorema', es: 'El teorema del coseno', en: 'The cosine rule', ar: 'مبرهنة جيب التمام' } }
        ],
        problem: say('Triangelu baten aldeak $a=7$, $b=5$ eta $c=3$ dira. Kalkulatu haren angeluak.', 'Los lados de un triángulo miden $a=7$, $b=5$ y $c=3$. Halla sus ángulos.', 'أضلاع مثلث $a=7$ و$b=5$ و$c=3$. أوجد زواياه.', 'The sides of a triangle are $a=7$, $b=5$ and $c=3$. Find its angles.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Angelu handiena, alde handienaren parean.', 'El ángulo mayor, frente al lado mayor.', 'أكبر زاوية مقابل أكبر ضلع.', 'The largest angle, opposite the longest side.'), math: same('$\\cos A=\\frac{5^2+3^2-7^2}{2\\cdot 5\\cdot 3}=-\\frac{1}{2}\\ \\to\\ A=120°$') },
            { text: say('B angelua, berdin.', 'El ángulo B, igual.', 'الزاوية B بالطريقة نفسها.', 'The angle B, the same way.'), math: same('$\\cos B=\\frac{7^2+3^2-5^2}{2\\cdot 7\\cdot 3}=\\frac{33}{42}\\ \\to\\ B\\approx 38{,}2°$') },
            { text: say('Hirugarrena, 180°-tik.', 'El tercero, de 180°.', 'الثالثة من 180°.', 'The third, from 180°.'), math: same('$C\\approx 180°-120°-38{,}2°=21{,}8°$') }
        ],
        takeaway: say('$\\cos A=\\frac{b^2+c^2-a^2}{2bc}$. Negatiboa bada, A kamutsa da. $a\\ge b+c$ bada, ez dago triangelurik.', '$\\cos A=\\frac{b^2+c^2-a^2}{2bc}$. Si es negativo, A es obtuso. Si $a\\ge b+c$, no hay triángulo.', '$\\cos A=\\frac{b^2+c^2-a^2}{2bc}$. إذا كان سالبًا فالزاوية A منفرجة. وإذا كان $a\\ge b+c$ فلا مثلث.', '$\\cos A=\\frac{b^2+c^2-a^2}{2bc}$. If it is negative, A is obtuse. If $a\\ge b+c$, there is no triangle.'),
        figure: (language) => <TriangleKindsFigure language={language} />
    },
    {
        id: 'which-rule',
        stage: 'cosines',
        title: say('Triangelu bat ebazteko ordena', 'El orden para resolver un triángulo', 'ترتيب حل المثلث', 'The order for solving a triangle'),
        goal: say('Datuen arabera teorema aukeratzea eta triangelu oso bat ebaztea, kasu zalantzazkoan erori gabe.', 'Elegir el teorema según los datos y resolver un triángulo completo sin caer en el caso dudoso.', 'اختيار المبرهنة حسب المعطيات وحل مثلث كامل دون الوقوع في الحالة الملتبسة.', 'Choose the rule from the data and solve a whole triangle without falling into the ambiguous case.'),
        problem: say('ABC triangeluan $a=9$ cm, $b=6$ cm eta $C=50°$ dira. Ebatzi.', 'En el triángulo ABC, $a=9$ cm, $b=6$ cm y $C=50°$. Resuélvelo.', 'في المثلث ABC: $a=9$ سم و$b=6$ سم و$C=50°$. حُلّه.', 'In triangle ABC, $a=9$ cm, $b=6$ cm and $C=50°$. Solve it.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bi alde eta haien arteko angelua: kosinua, $c$ aldearentzat.', 'Dos lados y el ángulo que forman: el coseno, para $c$.', 'ضلعان والزاوية بينهما: جيب التمام لإيجاد $c$.', 'Two sides and the angle between them: the cosine, for $c$.'), math: same('$c^2=81+36-108\\cdot\\cos 50°\\ \\to\\ c\\approx 6{,}90$') },
            { text: say('Alde txikienaren angelua, sinuekin: zorrotza da ziur.', 'El ángulo del lado menor, con los senos: seguro que es agudo.', 'زاوية أصغر ضلع بالجيوب: إنها حادة حتمًا.', 'The angle of the shortest side, with the sines: it is sure to be acute.'), math: same('$\\sen B=\\frac{6\\cdot\\sen 50°}{6{,}90}\\ \\to\\ B\\approx 41{,}8°$') },
            { text: say('Hirugarrena, 180°-tik.', 'El tercero, de 180°.', 'الثالثة من 180°.', 'The third, from 180°.'), math: same('$A\\approx 180°-50°-41{,}8°=88{,}2°$') }
        ],
        takeaway: say('Bi angelu eta alde bat: sinuak. Bi alde eta haien arteko angelua, edo hiru alde: kosinua. Sinuekin, kalkulatu lehenik alde txikienaren angelua, beti zorrotza baita.', 'Dos ángulos y un lado: senos. Dos lados y el ángulo que forman, o tres lados: coseno. Con senos, halla primero el ángulo del lado menor, que siempre es agudo.', 'زاويتان وضلع: الجيوب. ضلعان والزاوية بينهما، أو ثلاثة أضلاع: جيب التمام. ومع الجيوب أوجد أولًا زاوية أصغر ضلع لأنها حادة دائمًا.', 'Two angles and a side: sines. Two sides and the angle between them, or three sides: cosine. With the sines, find the angle of the shortest side first, because it is always acute.'),
        figure: (language) => <FourCasesFigure language={language} />
    },

    /* ---------- 5. Areas and problems ---------- */
    {
        id: 'heron',
        stage: 'applications',
        title: say('Azalera sinuarekin eta Heronekin', 'El área con el seno y con Herón', 'المساحة بالجيب وبصيغة هيرون', 'The area with the sine and with Heron'),
        goal: say('Triangelu baten azalera kalkulatzea bi alde eta haien arteko angeluarekin, edo hiru aldeekin (Heronen formula).', 'Calcular el área de un triángulo con dos lados y el ángulo que forman, o con los tres lados (fórmula de Herón).', 'حساب مساحة مثلث بضلعين والزاوية بينهما، أو بالأضلاع الثلاثة (صيغة هيرون).', 'Work out the area of a triangle from two sides and the angle between them, or from the three sides (Heron\'s formula).'),
        needs: [
            { unit: 'dbh4-akademikoak/trigonometria', topic: 'trig-area', title: { eu: 'Azalerak trigonometriarekin', es: 'Áreas con trigonometría', en: 'Areas with trigonometry', ar: 'المساحات بحساب المثلثات' } }
        ],
        problem: say('Kalkulatu aldeak 13, 14 eta 15 cm dituen triangeluaren azalera.', 'Halla el área del triángulo de lados 13, 14 y 15 cm.', 'أوجد مساحة المثلث الذي أضلاعه 13 و14 و15 سم.', 'Find the area of the triangle with sides 13, 14 and 15 cm.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Perimetro-erdia.', 'El semiperímetro.', 'نصف المحيط.', 'The semi-perimeter.'), math: same('$s=\\frac{13+14+15}{2}=21$') },
            { text: say('Heronen formula: s bider s ken alde bakoitza.', 'Fórmula de Herón: s por s menos cada lado.', 'صيغة هيرون: s في s ناقص كل ضلع.', 'Heron\'s formula: s times s minus each side.'), math: same('$S=\\sqrt{21\\cdot 8\\cdot 7\\cdot 6}=84$') }
        ],
        takeaway: say('Bi alde eta haien arteko angelua: $S=\\frac{1}{2}\\,bc\\cdot\\sen A$. Hiru aldeak: $S=\\sqrt{s(s-a)(s-b)(s-c)}$, s perimetro-erdia izanik.', 'Con dos lados y el ángulo que forman: $S=\\frac{1}{2}\\,bc\\cdot\\sen A$. Con los tres lados: $S=\\sqrt{s(s-a)(s-b)(s-c)}$, con s el semiperímetro.', 'بضلعين والزاوية بينهما: $S=\\frac{1}{2}\\,bc\\cdot\\sen A$. وبالأضلاع الثلاثة: $S=\\sqrt{s(s-a)(s-b)(s-c)}$ حيث s نصف المحيط.', 'With two sides and the angle between them: $S=\\frac{1}{2}\\,bc\\cdot\\sin A$. With the three sides: $S=\\sqrt{s(s-a)(s-b)(s-c)}$, where s is the semi-perimeter.'),
        figure: (language) => <HeronFigure language={language} />
    },
    {
        id: 'inaccessible',
        stage: 'applications',
        title: say('Iritsi ezin diren distantziak', 'Distancias inaccesibles', 'المسافات التي لا يمكن بلوغها', 'Distances you cannot reach'),
        goal: say('Iritsi ezin den puntu baterako distantzia kalkulatzea, oinarri bat eta bi angelu neurtuta (triangulazioa).', 'Calcular la distancia a un punto al que no se puede llegar midiendo una base y dos ángulos (triangulación).', 'حساب المسافة إلى نقطة لا يمكن بلوغها بقياس قاعدة وزاويتين (التثليث).', 'Work out the distance to a point you cannot reach by measuring a base and two angles (triangulation).'),
        needs: [
            { unit: 'dbh4-akademikoak/trigonometria', topic: 'double-observation', title: { eu: 'Behaketa bikoitza', es: 'La doble observación', en: 'Two observations', ar: 'الرصد المزدوج' } }
        ],
        problem: say('A eta B puntuak 200 m-ra daude. Haietatik E buia ikusten da, $A=62°$ eta $B=48°$ angeluekin. Zer distantziara dago A-tik?', 'Desde A y B, a 200 m uno de otro, se ve una boya E con $A=62°$ y $B=48°$. ¿A qué distancia está de A?', 'من A وB، والمسافة بينهما 200 م، تُرى عوامة E بالزاويتين $A=62°$ و$B=48°$. كم تبعد عن A؟', 'From A and B, 200 m apart, a buoy E is seen with $A=62°$ and $B=48°$. How far is it from A?'),
        stepsKind: 'steps',
        steps: [
            { text: say('E-ko angelua, 180°-tik.', 'El ángulo en E, de 180°.', 'الزاوية عند E من 180°.', 'The angle at E, from 180°.'), math: same('$E=180°-62°-48°=70°$') },
            { text: say('AE aldea B-ren parean dago.', 'AE está enfrente de B.', 'الضلع AE مقابل B.', 'AE is opposite B.'), math: same('$AE=\\frac{200\\cdot\\sen 48°}{\\sen 70°}\\approx 158{,}17$') }
        ],
        takeaway: say('Neurtutako oinarri bat eta haren muturretako bi angeluak nahikoak dira: hirugarren angelua 180°-tik ateratzen da, eta distantziak, sinuaren teorematik.', 'Una base medida y los dos ángulos de sus extremos bastan: el tercer ángulo sale de 180° y las distancias, del teorema de los senos.', 'تكفي قاعدة مقيسة والزاويتان عند طرفيها: الزاوية الثالثة من 180° والمسافات من مبرهنة الجيوب.', 'A measured base and the two angles at its ends are enough: the third angle comes from 180° and the distances from the sine rule.'),
        figure: (language) => <TriangulationFigure language={language} />
    },
    {
        id: 'parallelogram-forces',
        stage: 'applications',
        title: say('Paralelogramoak eta indarrak', 'Paralelogramos y fuerzas', 'متوازيات الأضلاع والقوى', 'Parallelograms and forces'),
        goal: say('Paralelogramo baten diagonalak eta bi indarren erresultantea kalkulatzea, kosinuaren teoremarekin.', 'Calcular las diagonales de un paralelogramo y la resultante de dos fuerzas con el teorema del coseno.', 'حساب قطري متوازي أضلاع ومحصلة قوتين بمبرهنة جيب التمام.', 'Work out the diagonals of a parallelogram and the resultant of two forces with the cosine rule.'),
        needs: [
            { unit: 'dbh4-akademikoak/vectores-rectas', topic: 'vector-operations', title: { eu: 'Bektoreekin eragiketak', es: 'Operaciones con vectores', en: 'Operations with vectors', ar: 'العمليات على المتجهات' } }
        ],
        problem: say('30 N eta 40 N-eko bi indarrek 60°-ko angelua osatzen dute. Zenbatekoa da erresultantea?', 'Dos fuerzas de 30 N y 40 N forman un ángulo de 60°. ¿Cuánto mide la resultante?', 'قوتان مقدارهما 30 N و40 N بينهما زاوية 60°. كم مقدار المحصلة؟', 'Two forces of 30 N and 40 N make an angle of 60°. How big is the resultant?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erresultantea diagonala da; haren triangeluan angelua 180° ken 60° da.', 'La resultante es la diagonal; en su triángulo, el ángulo es 180° menos 60°.', 'المحصلة هي القطر، والزاوية في مثلثها 180° ناقص 60°.', 'The resultant is the diagonal; in its triangle the angle is 180° minus 60°.'), math: same('$180°-60°=120°$') },
            { text: say('Kosinuaren teorema.', 'El teorema del coseno.', 'مبرهنة جيب التمام.', 'The cosine rule.'), math: same('$R^2=30^2+40^2-2\\cdot 30\\cdot 40\\cdot\\cos 120°=3700$') },
            { text: say('Erro karratua: 60,83 N inguru.', 'La raíz: unos 60,83 N.', 'الجذر: نحو 60.83 N.', 'The square root: about 60.83 N.'), math: same('$R\\approx 60{,}83$') }
        ],
        takeaway: say('θ angelua osatzen duten $a$ eta $b$ aldeko paralelogramoaren diagonal luzea: $d^2=a^2+b^2+2ab\\cdot\\cos\\theta$, triangeluan 180° − θ baitago.', 'La diagonal larga de un paralelogramo de lados $a$ y $b$ que forman θ: $d^2=a^2+b^2+2ab\\cdot\\cos\\theta$, porque en su triángulo está 180° − θ.', 'القطر الطويل لمتوازي أضلاع ضلعاه $a$ و$b$ بينهما θ: $d^2=a^2+b^2+2ab\\cdot\\cos\\theta$، لأن الزاوية في مثلثه 180° − θ.', 'The long diagonal of a parallelogram with sides $a$ and $b$ that make θ: $d^2=a^2+b^2+2ab\\cdot\\cos\\theta$, because its triangle has 180° − θ.'),
        figure: (language) => <ForcesFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts), in each language's names */
export const trianglesTopics: UnitTopic[] = baseTopics.map((topic) => ({
    ...topic,
    ...localizeNames(trianglesLessonTexts[topic.id as TrianglesTopicId]),
    ...localizeNames(trianglesLessonChecks[topic.id as TrianglesTopicId])
}))
