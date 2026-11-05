import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { TrianglesTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Triangeluen ebazpena · Batxilergoa 1 · Zientziak — what each lesson
   tells: the new words (definitions), a short explanation, the example as
   an exercise («Another example»), the key words in four languages and, in
   five lessons, «Why does it work?». Plain data so the tests can import
   it; lessons.tsx merges it into the topics. Formulas write \sin and \tan
   in every language (so the shared tests see the same formulas) and
   localizeNames gives each language its names (sen, tg). The examples use
   numbers of their own; angles are rounded to the tenth and lengths to the
   hundredth. Tests in tests/lesson-texts.test.ts and
   tests/triangeluak-batx1z-content.test.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const trianglesLessonTexts: Record<TrianglesTopicId, LessonTexts> = {
    /* ---------- 1. Any angle ---------- */
    'quadrant-ratios': {
        definitions: [
            { term: say('Koadrantea', 'Cuadrante', 'الربع', 'Quadrant'), meaning: say('Ardatzek planoa zatitzen duten lau zatietako bakoitza; lehena 0°-tik 90°-ra doa.', 'Cada una de las cuatro partes en que los ejes dividen el plano; el primero va de 0° a 90°.', 'كل جزء من الأجزاء الأربعة التي يقسم إليها المحوران المستوى؛ الأول من 0° إلى 90°.', 'Each of the four parts into which the axes split the plane; the first goes from 0° to 90°.') }
        ],
        vocabulary: [
            say('zeinua', 'signo', 'الإشارة', 'sign'),
            say('kosinua', 'coseno', 'جيب التمام', 'cosine')
        ],
        explanation: say(
            'α angeluaren arrazoi bat eta haren koadrantea ezagutzen badituzu, besteak $\\sin^2\\alpha+\\cos^2\\alpha=1$ eta $\\tan\\alpha=\\frac{\\sin\\alpha}{\\cos\\alpha}$ erlazioetatik ateratzen dira. Erroak bi zeinu ematen ditu, eta koadranteak bat aukeratzen du. Erradio bateko zirkunferentzian, kosinua puntuaren $x$ da eta sinua $y$: bigarren koadrantean sinua positiboa da eta kosinua negatiboa.',
            'Si conoces una razón de α y su cuadrante, las demás salen de $\\sin^2\\alpha+\\cos^2\\alpha=1$ y de $\\tan\\alpha=\\frac{\\sin\\alpha}{\\cos\\alpha}$. La raíz da dos signos y el cuadrante elige uno. En la circunferencia de radio 1, el coseno es la $x$ del punto y el seno, la $y$: en el segundo cuadrante el seno es positivo y el coseno, negativo.',
            'إذا عرفت نسبة واحدة للزاوية α وربعها، تخرج النسب الأخرى من $\\sin^2\\alpha+\\cos^2\\alpha=1$ ومن $\\tan\\alpha=\\frac{\\sin\\alpha}{\\cos\\alpha}$. يعطي الجذر إشارتين، والربع يختار إحداهما. وفي الدائرة التي نصف قطرها 1 يكون جيب التمام هو $x$ النقطة والجيب هو $y$: في الربع الثاني الجيب موجب وجيب التمام سالب.',
            'If you know one ratio of α and its quadrant, the others come from $\\sin^2\\alpha+\\cos^2\\alpha=1$ and $\\tan\\alpha=\\frac{\\sin\\alpha}{\\cos\\alpha}$. The square root gives two signs and the quadrant picks one. On the circle of radius 1, the cosine is the $x$ of the point and the sine is the $y$: in the second quadrant the sine is positive and the cosine negative.'
        ),
        examplePrompt: say('$\\cos\\alpha=-\\frac{12}{13}$ bada eta α hirugarren koadrantean badago, kalkulatu $\\sin\\alpha$ eta $\\tan\\alpha$.', 'Si $\\cos\\alpha=-\\frac{12}{13}$ y α está en el tercer cuadrante, halla $\\sin\\alpha$ y $\\tan\\alpha$.', 'إذا كان $\\cos\\alpha=-\\frac{12}{13}$ وكانت α في الربع الثالث، فأوجد $\\sin\\alpha$ و$\\tan\\alpha$.', 'If $\\cos\\alpha=-\\frac{12}{13}$ and α is in the third quadrant, find $\\sin\\alpha$ and $\\tan\\alpha$.'),
        example: same('$\\sin\\alpha=-\\frac{5}{13}\\qquad\\tan\\alpha=\\frac{5}{12}$')
    },
    'big-angles': {
        definitions: [
            { term: say('Bira osoa', 'Vuelta completa', 'الدورة الكاملة', 'Full turn'), meaning: say('360°: erradioa bere lekura itzultzen da.', '360°: el radio vuelve a su sitio.', '360°: يعود نصف القطر إلى مكانه.', '360°: the radius comes back to where it started.') },
            { term: say('Angelu negatiboa', 'Ángulo negativo', 'الزاوية السالبة', 'Negative angle'), meaning: say('Erlojuaren orratzen noranzkoan biratuz neurtzen dena.', 'El que se mide girando en el sentido de las agujas del reloj.', 'زاوية تُقاس بالدوران في اتجاه عقارب الساعة.', 'One measured by turning clockwise.') }
        ],
        vocabulary: [
            say('zatidura', 'cociente', 'خارج القسمة', 'quotient'),
            say('hondarra', 'resto', 'الباقي', 'remainder')
        ],
        explanation: say(
            '360° baino handiagoko angelu batek bira osoak eta zerbait gehiago egiten ditu. 360 zenbakiaz zatitzean, $k$ zatidura birak dira, eta hondarra axola duen angelua, α eta $\\alpha+k\\cdot 360°$ puntu berean amaitzen baitira. Angelu negatibo batek alderantziz biratzen du: −60° angelua 300° angeluaren lekuan amaitzen da.',
            'Un ángulo mayor de 360° da vueltas completas y algo más. Al dividirlo entre 360, el cociente $k$ son las vueltas y el resto es el ángulo que importa, porque α y $\\alpha+k\\cdot 360°$ acaban en el mismo punto. Un ángulo negativo gira al revés: −60° acaba donde 300°.',
            'الزاوية الأكبر من 360° تدور دورات كاملة وشيئًا زائدًا. عند قسمتها على 360 يكون خارج القسمة $k$ عدد الدورات ويكون الباقي هو الزاوية المهمة، لأن α و$\\alpha+k\\cdot 360°$ تنتهيان في النقطة نفسها. والزاوية السالبة تدور بالعكس: ⁦−60°⁩ تنتهي حيث تنتهي 300°.',
            'An angle over 360° makes full turns and a bit more. When you divide it by 360, the quotient $k$ is the number of turns and the remainder is the angle that matters, because α and $\\alpha+k\\cdot 360°$ end at the same point. A negative angle turns the other way: −60° ends where 300° does.'
        ),
        examplePrompt: say('Kalkulatu $\\cos(-1500°)$.', 'Calcula $\\cos(-1500°)$.', 'احسب $\\cos(-1500°)$.', 'Work out $\\cos(-1500°)$.'),
        example: same('$-1500°+5\\cdot 360°=300°\\qquad\\cos 300°=\\frac{1}{2}$')
    },
    'related-angles': {
        definitions: [
            { term: say('Angelu osagarriak', 'Ángulos complementarios', 'الزاويتان المتتامتان', 'Complementary angles'), meaning: say('Batuta 90° egiten duten bi angelu: baten sinua bestearen kosinua da.', 'Dos ángulos que suman 90°: el seno de uno es el coseno del otro.', 'زاويتان مجموعهما 90°: جيب إحداهما جيب تمام الأخرى.', 'Two angles that add up to 90°: the sine of one is the cosine of the other.') }
        ],
        vocabulary: [
            say('koadrantea', 'cuadrante', 'الربع', 'quadrant'),
            say('tangentea', 'tangente', 'الظل', 'tangent')
        ],
        explanation: say(
            'Edozein angelu lehen koadrantera eraman daiteke. 180° ± α eta 360° − α angeluekin (azkena −α da), arrazoiak α angeluarenak dira, koadrantearen zeinuarekin. 90° ± α eta 270° ± α angeluekin triangeluak bira-laurden bat egiten du eta katetoak trukatzen dira: sinua kosinu bihurtzen da eta kosinua sinu.',
            'Todo ángulo se puede llevar al primer cuadrante. Con 180° ± α y 360° − α, que es −α, las razones son las de α con el signo del cuadrante. Con 90° ± α y 270° ± α el triángulo gira un cuarto de vuelta y los catetos se cambian: el seno pasa a coseno y el coseno a seno.',
            'يمكن إرجاع أي زاوية إلى الربع الأول. مع 180° ± α و360° − α، أي −α، تكون النسب نسب α بإشارة الربع. ومع 90° ± α و270° ± α يدور المثلث ربع دورة ويتبادل الضلعان القائمان: يصير الجيب جيب تمام وجيب التمام جيبًا.',
            'Any angle can be brought into the first quadrant. With 180° ± α and 360° − α, which is −α, the ratios are those of α with the sign of the quadrant. With 90° ± α and 270° ± α the triangle turns a quarter of a turn and the legs swap: the sine becomes the cosine and the cosine the sine.'
        ),
        cases: [
            { title: same('180° − α'), text: say('Sinu bera; kosinuak eta tangenteak zeinua aldatzen dute.', 'Mismo seno; el coseno y la tangente cambian de signo.', 'الجيب نفسه، ويغيّر جيب التمام والظل إشارتهما.', 'Same sine; the cosine and the tangent change sign.'), math: same('$\\sin(180°-\\alpha)=\\sin\\alpha$') },
            { title: same('−α'), text: say('Kosinu bera; sinuak eta tangenteak zeinua aldatzen dute.', 'Mismo coseno; el seno y la tangente cambian de signo.', 'جيب التمام نفسه، ويغيّر الجيب والظل إشارتهما.', 'Same cosine; the sine and the tangent change sign.'), math: same('$\\cos(-\\alpha)=\\cos\\alpha$') },
            { title: same('90° + α'), text: say('Sinua eta kosinua trukatzen dira, koadrantearen zeinuarekin.', 'El seno y el coseno se intercambian, con el signo del cuadrante.', 'يتبادل الجيب وجيب التمام، بإشارة الربع.', 'The sine and the cosine swap, with the sign of the quadrant.'), math: same('$\\sin(90°+\\alpha)=\\cos\\alpha$') }
        ],
        examplePrompt: say('Adierazi $\\cos 250°$ lehen koadranteko angelu batekin.', 'Expresa $\\cos 250°$ con un ángulo del primer cuadrante.', 'عبّر عن $\\cos 250°$ بزاوية من الربع الأول.', 'Write $\\cos 250°$ using an angle in the first quadrant.'),
        example: same('$\\cos 250°=\\cos(270°-20°)=-\\sin 20°$')
    },
    'inverse-angles': {
        definitions: [
            { term: say('Arku sinua', 'Arco seno', 'قوس الجيب', 'Inverse sine'), meaning: say('Kalkulagailuak (SHIFT sin) sinu baterako ematen duen angelua: beti −90°-tik 90°-ra.', 'El ángulo que da la calculadora (SHIFT sen) para un seno: siempre entre −90° y 90°.', 'الزاوية التي تعطيها الآلة الحاسبة (SHIFT sin) لجيب ما: دائمًا بين ⁦−90°⁩ و90°.', 'The angle the calculator (SHIFT sin) gives for a sine: always between −90° and 90°.') }
        ],
        vocabulary: [
            say('kalkulagailua', 'calculadora', 'الآلة الحاسبة', 'calculator'),
            say('simetrikoak', 'simétricos', 'متناظرتان', 'symmetric')
        ],
        explanation: say(
            'Sinuaren balio baterako bi angelu daude 0°-tik 360°-ra, baina kalkulagailuak bat bakarrik ematen du, −90°-tik 90°-ra. Bestea zirkunferentziatik ateratzen da: sinu bera, α eta 180° − α; kosinu bera, α eta 360° − α; tangente bera, α eta 180° + α. Triangelu batean garrantzitsua da: 150° angeluak eta 30° angeluak sinu bera dute.',
            'Para un valor del seno hay dos ángulos entre 0° y 360°, pero la calculadora solo da uno, entre −90° y 90°. El otro sale de la circunferencia: mismo seno, α y 180° − α; mismo coseno, α y 360° − α; misma tangente, α y 180° + α. En un triángulo importa: 150° tiene el mismo seno que 30°.',
            'لقيمة معيّنة للجيب زاويتان بين 0° و360°، لكن الآلة الحاسبة تعطي واحدة فقط بين ⁦−90°⁩ و90°. والأخرى تخرج من الدائرة: الجيب نفسه لـ α و180° − α، وجيب التمام نفسه لـ α و360° − α، والظل نفسه لـ α و180° + α. وهذا مهم في المثلث: لـ 150° الجيب نفسه الذي لـ 30°.',
            'For one value of the sine there are two angles between 0° and 360°, but the calculator only gives one, between −90° and 90°. The other comes from the circle: same sine, α and 180° − α; same cosine, α and 360° − α; same tangent, α and 180° + α. In a triangle this matters: 150° has the same sine as 30°.'
        ),
        examplePrompt: say('Aurkitu $\\cos\\alpha=-0{,}4$ betetzen duten 0°-tik 360°-rako angeluak.', 'Halla los ángulos entre 0° y 360° con $\\cos\\alpha=-0{,}4$.', 'أوجد الزوايا بين 0° و360° التي فيها $\\cos\\alpha=-0{,}4$.', 'Find the angles between 0° and 360° with $\\cos\\alpha=-0{,}4$.'),
        example: same('$\\alpha_1\\approx 113{,}6°\\qquad\\alpha_2\\approx 246{,}4°$'),
        why: {
            text: say(
                'Zergatik dute sinu bera α eta 180° − α angeluek? Erradio bateko zirkunferentzian, haien bi puntuak simetrikoak dira ardatz bertikalarekiko: altuera berean daude, eta sinua altuera hori da. Haien $x$ aurkakoak dira; beraz, kosinuak ere bai.',
                '¿Por qué tienen el mismo seno α y 180° − α? En la circunferencia de radio 1, sus dos puntos son simétricos respecto del eje vertical: están a la misma altura, y el seno es esa altura. Sus $x$ son opuestas, así que sus cosenos también.',
                'لماذا للزاويتين α و180° − α الجيب نفسه؟ في الدائرة التي نصف قطرها 1 تكون نقطتاهما متناظرتان بالنسبة إلى المحور الرأسي: هما على الارتفاع نفسه، والجيب هو ذلك الارتفاع. أما $x$ لكل منهما فمتعاكسان، وكذلك جيبا التمام.',
                'Why do α and 180° − α have the same sine? On the circle of radius 1, their two points are symmetric about the vertical axis: they are at the same height, and the sine is that height. Their $x$ are opposite, so their cosines are too.'
            ),
            math: same('$\\sin 30°=\\sin 150°=\\frac{1}{2}$')
        }
    },

    /* ---------- 2. Right triangles and the height ---------- */
    'right-review': {
        definitions: [
            { term: say('Triangelu bat ebaztea', 'Resolver un triángulo', 'حل المثلث', 'Solving a triangle'), meaning: say('Haren hiru aldeak eta hiru angeluak aurkitzea.', 'Hallar sus tres lados y sus tres ángulos.', 'إيجاد أضلاعه الثلاثة وزواياه الثلاث.', 'Finding its three sides and its three angles.') }
        ],
        vocabulary: [
            say('hipotenusa', 'hipotenusa', 'الوتر', 'hypotenuse'),
            say('katetoa', 'cateto', 'الضلع القائم', 'leg')
        ],
        explanation: say(
            'Triangelu angeluzuzen batean bi datu nahikoak dira, bat aldea bada. Bi alderekin, hirugarrena Pitagorasekin ateratzen da eta angelu bat arrazoi batekin; alde batekin eta angelu batekin, beste aldeak sinutik, kosinutik edo tangentetik. Bi angelu zorrotzek 90° egiten dute. Errepaso hau triangelu ez-angeluzuzenen barruan erabiltzen da.',
            'En un triángulo rectángulo bastan dos datos si uno es un lado. Con dos lados, el tercero sale de Pitágoras y un ángulo, de una razón; con un lado y un ángulo, los otros lados salen del seno, el coseno o la tangente. Los ángulos agudos suman 90°. Este repaso sirve dentro de los oblicuángulos.',
            'في المثلث القائم يكفي معطيان إذا كان أحدهما ضلعًا. مع ضلعين يخرج الثالث من فيثاغورس والزاوية من نسبة؛ ومع ضلع وزاوية يخرج الضلعان الآخران من الجيب أو جيب التمام أو الظل. ومجموع الزاويتين الحادتين 90°. وهذه المراجعة تفيد داخل المثلثات غير القائمة.',
            'In a right-angled triangle two pieces of data are enough if one is a side. With two sides, the third comes from Pythagoras and an angle from a ratio; with one side and one angle, the other sides come from the sine, the cosine or the tangent. The acute angles add up to 90°. This review is used inside oblique triangles.'
        ),
        examplePrompt: say('ABC triangelua angeluzuzena da A erpinean, $a=50$ cm eta $B=28°$ izanik. Kalkulatu $b$ eta $c$.', 'El triángulo ABC es rectángulo en A, con $a=50$ cm y $B=28°$. Halla $b$ y $c$.', 'المثلث ABC قائم في A، و$a=50$ سم و$B=28°$. أوجد $b$ و$c$.', 'Triangle ABC has a right angle at A, with $a=50$ cm and $B=28°$. Find $b$ and $c$.'),
        example: same('$\\begin{gathered}b=50\\cdot\\sin 28°\\approx 23{,}47\\\\ c=50\\cdot\\cos 28°\\approx 44{,}15\\end{gathered}$')
    },
    'height-strategy': {
        definitions: [
            { term: say('Altuera', 'Altura', 'الارتفاع', 'Height'), meaning: say('Erpin batetik aurkako aldera, edo haren luzapenera, angelu zuzena eginez doan zuzenkia.', 'El segmento que va de un vértice al lado opuesto, o a su prolongación, formando un ángulo recto.', 'القطعة الممتدة من رأس إلى الضلع المقابل أو امتداده، مكوّنة زاوية قائمة.', 'The segment from a vertex to the opposite side, or to its extension, at a right angle.') }
        ],
        vocabulary: [
            say('kanpoan', 'fuera', 'خارج', 'outside'),
            say('angelu kamutsa', 'ángulo obtuso', 'زاوية منفرجة', 'obtuse angle')
        ],
        explanation: say(
            'Triangeluak angelu zuzenik ez badu, altuera bat marrazten da. Bi triangelu angeluzuzen geratzen dira, kateto komun batekin, $h$, eta $h$ idazten da bakoitzean. Oinarriaren mutur bateko angelua kamutsa bada, altuera kanpoan erortzen da, oinarriaren luzapenean, eta kanpoko triangeluan 180° ken angelu hori erabiltzen da.',
            'Si el triángulo no tiene ángulo recto, se traza una altura. Quedan dos triángulos rectángulos con un cateto común, $h$, y se escribe $h$ en cada uno. Si el ángulo de un extremo de la base es obtuso, la altura cae fuera, sobre la prolongación de la base, y en el triángulo de fuera se usa 180° menos ese ángulo.',
            'إذا لم يكن في المثلث زاوية قائمة رسمنا ارتفاعًا. فيبقى مثلثان قائمان لهما ضلع قائم مشترك $h$، ونكتب $h$ في كل منهما. وإذا كانت الزاوية عند أحد طرفي القاعدة منفرجة وقع الارتفاع خارجه على امتداد القاعدة، ونستعمل في المثلث الخارجي 180° ناقص تلك الزاوية.',
            'If the triangle has no right angle, draw a height. That leaves two right-angled triangles with a shared leg, $h$, and you write $h$ in each one. If the angle at one end of the base is obtuse, the height falls outside, on the extension of the base, and in the outer triangle you use 180° minus that angle.'
        ),
        examplePrompt: say('ABC triangeluan $b=8$ cm, $c=5$ cm eta $A=120°$ dira. Kalkulatu B erpinetik ateratako altuera.', 'En el triángulo ABC, $b=8$ cm, $c=5$ cm y $A=120°$. Halla la altura desde B.', 'في المثلث ABC: $b=8$ سم و$c=5$ سم و$A=120°$. أوجد الارتفاع النازل من B.', 'In triangle ABC, $b=8$ cm, $c=5$ cm and $A=120°$. Find the height from B.'),
        example: same('$h=5\\cdot\\sin(180°-120°)\\approx 4{,}33$')
    },

    /* ---------- 3. The sine rule ---------- */
    'sine-rule': {
        definitions: [
            { term: say('Aurkako aldea', 'Lado opuesto', 'الضلع المقابل', 'Opposite side'), meaning: say('Angelu baten parean dagoen aldea: $a$ aldea A angeluaren parean dago.', 'El lado que está enfrente de un ángulo: $a$ está enfrente de A.', 'الضلع الذي يقابل زاوية: $a$ يقابل A.', 'The side across from an angle: $a$ is across from A.') }
        ],
        vocabulary: [
            say('proportzioa', 'proporción', 'التناسب', 'proportion'),
            say('bikotea', 'pareja', 'الثنائي', 'pair')
        ],
        explanation: say(
            'Edozein triangelutan, alde bakoitza zati bere aurkako angeluaren sinua zenbaki bera da. Alde–aurkako angelu bikote bat eta beste datu bat ezagutzen direnean erabiltzen da. Bi angelu eta alde batekin, hirugarren angelua 180°-tik ateratzen da eta alde bakoitza proportzio batetik. Alde handienaren parean angelu handiena dago.',
            'En cualquier triángulo, cada lado entre el seno de su ángulo opuesto da el mismo número. Sirve cuando se conoce una pareja lado–ángulo opuesto y otro dato. Con dos ángulos y un lado, el tercer ángulo sale de 180° y cada lado, de una proporción. A mayor lado se opone mayor ángulo.',
            'في أي مثلث، كل ضلع على جيب الزاوية المقابلة له يعطي العدد نفسه. ونستعملها عندما نعرف ثنائيًا من ضلع وزاوية مقابلة ومعطى آخر. ومع زاويتين وضلع تخرج الزاوية الثالثة من 180° وكل ضلع من التناسب. وأكبر ضلع يقابل أكبر زاوية.',
            'In any triangle, each side divided by the sine of its opposite angle gives the same number. It works when you know a side–opposite angle pair and one more piece of data. With two angles and a side, the third angle comes from 180° and each side from a proportion. The longest side is opposite the largest angle.'
        ),
        examplePrompt: say('ABC triangeluan $A=50°$, $B=62°$ eta $c=9$ m dira. Kalkulatu $a$.', 'En el triángulo ABC, $A=50°$, $B=62°$ y $c=9$ m. Halla $a$.', 'في المثلث ABC: $A=50°$ و$B=62°$ و$c=9$ م. أوجد $a$.', 'In triangle ABC, $A=50°$, $B=62°$ and $c=9$ m. Find $a$.'),
        example: same('$C=68°\\qquad a=\\frac{9\\cdot\\sin 50°}{\\sin 68°}\\approx 7{,}44$'),
        why: {
            text: say(
                'Zergatik funtzionatzen du? C erpinetik ateratako altuerak $b\\cdot\\sin A$ neurtzen du triangelu angeluzuzen batean eta $a\\cdot\\sin B$ bestean. Biak berdinduz eta bi sinuez zatituz, lehen berdintza ateratzen da; beste altuera batekin, bigarrena.',
                '¿Por qué funciona? La altura desde C mide $b\\cdot\\sin A$ en un triángulo rectángulo y $a\\cdot\\sin B$ en el otro. Al igualarlas y dividir entre los dos senos sale la primera igualdad; con otra altura, la segunda.',
                'لماذا تصح؟ الارتفاع النازل من C طوله $b\\cdot\\sin A$ في أحد المثلثين القائمين و$a\\cdot\\sin B$ في الآخر. وبمساواتهما والقسمة على الجيبين نحصل على المساواة الأولى، وبارتفاع آخر على الثانية.',
                'Why does it work? The height from C measures $b\\cdot\\sin A$ in one right-angled triangle and $a\\cdot\\sin B$ in the other. Setting them equal and dividing by both sines gives the first equality; another height gives the second.'
            ),
            math: same('$h=b\\cdot\\sin A=a\\cdot\\sin B$')
        }
    },
    'ambiguous-case': {
        definitions: [
            { term: say('Kasu zalantzazkoa', 'Caso dudoso', 'الحالة الملتبسة', 'Ambiguous case'), meaning: say('Bi alde eta horietako baten aurkako angelua: 0, 1 edo 2 triangelu egon daitezke.', 'Dos lados y el ángulo opuesto a uno de ellos: puede haber 0, 1 o 2 triángulos.', 'ضلعان والزاوية المقابلة لأحدهما: قد يوجد 0 أو 1 أو 2 من المثلثات.', 'Two sides and the angle opposite one of them: there may be 0, 1 or 2 triangles.') }
        ],
        vocabulary: [
            say('konpasa', 'compás', 'الفرجار', 'compass'),
            say('ebaki', 'cortar', 'يقطع', 'cut')
        ],
        explanation: say(
            '$a$, $b$ eta A jakinda, sinuaren teoremak $\\sin B$ ematen du. 1 baino handiagoa bada, ez dago triangelurik. Bestela, bi angeluk dute sinu hori, B eta 180° − B, eta bakoitzak balio du A-rekin batuta 180° baino gutxiago egiten badu. Konpasarekin ikusten da: $a$ aldeak beste zuzena 0, 1 edo 2 puntutan ebakitzen du.',
            'Con $a$, $b$ y A, el teorema de los senos da $\\sin B$. Si sale mayor que 1, no hay triángulo. Si no, hay dos ángulos con ese seno, B y 180° − B, y cada uno vale si con A suma menos de 180°. El compás lo enseña: el lado $a$ corta la otra recta en 0, 1 o 2 puntos.',
            'مع $a$ و$b$ وA تعطي مبرهنة الجيوب $\\sin B$. فإذا كان أكبر من 1 فلا مثلث. وإلا فلزاويتين هذا الجيب، B و180° − B، وتصلح كل منهما إذا كان مجموعها مع A أقل من 180°. ونرى ذلك بالفرجار: الضلع $a$ يقطع المستقيم الآخر في 0 أو 1 أو 2 من النقاط.',
            'With $a$, $b$ and A, the sine rule gives $\\sin B$. If it is greater than 1, there is no triangle. If not, two angles have that sine, B and 180° − B, and each one works if it adds up to less than 180° with A. A compass shows it: the side $a$ cuts the other line at 0, 1 or 2 points.'
        ),
        examplePrompt: say('ABC triangeluan $a=4$ cm, $b=10$ cm eta $A=35°$ dira. Ba al dago triangelurik?', 'En el triángulo ABC, $a=4$ cm, $b=10$ cm y $A=35°$. ¿Hay triángulo?', 'في المثلث ABC: $a=4$ سم و$b=10$ سم و$A=35°$. هل يوجد مثلث؟', 'In triangle ABC, $a=4$ cm, $b=10$ cm and $A=35°$. Is there a triangle?'),
        example: same('$\\sin B=\\frac{10\\cdot\\sin 35°}{4}\\approx 1{,}43>1$'),
        exampleAnswer: say('Ez dago triangelurik: $a$ aldea ez da beste zuzenera iristen.', 'No hay ningún triángulo: el lado $a$ no llega a la otra recta.', 'لا يوجد أي مثلث: الضلع $a$ لا يصل إلى المستقيم الآخر.', 'There is no triangle: the side $a$ does not reach the other line.')
    },
    circumradius: {
        definitions: [
            { term: say('Zirkunferentzia zirkunskribatua', 'Circunferencia circunscrita', 'الدائرة المحيطة', 'Circumscribed circle'), meaning: say('Triangeluaren hiru erpinetatik pasatzen dena; haren zentroa zirkunzentroa da.', 'La que pasa por los tres vértices del triángulo; su centro es el circuncentro.', 'الدائرة المارة برؤوس المثلث الثلاثة، ومركزها مركز الدائرة المحيطة.', 'The circle through the three vertices of the triangle; its centre is the circumcentre.') }
        ],
        vocabulary: [
            say('diametroa', 'diámetro', 'القطر', 'diameter'),
            say('erradioa', 'radio', 'نصف القطر', 'radius')
        ],
        explanation: say(
            'Sinuaren teoremaren hiru zatidurek balio bera dute, eta zenbaki hori zirkunferentzia zirkunskribatuaren $2R$ diametroa da. Alde bat eta haren aurkako angelua jakinda, R kalkulatzen da; R jakinda, alde bakoitza $2R$ bider bere angeluaren sinua da: $a=2R\\cdot\\sin A$.',
            'Las tres razones del teorema de los senos valen lo mismo, y ese número es el diámetro $2R$ de la circunferencia circunscrita. Conociendo un lado y su ángulo opuesto se halla R; conociendo R, cada lado es $2R$ por el seno de su ángulo: $a=2R\\cdot\\sin A$.',
            'النسب الثلاث في مبرهنة الجيوب متساوية، وهذا العدد هو القطر $2R$ للدائرة المحيطة. وبمعرفة ضلع والزاوية المقابلة له نجد R، وبمعرفة R يكون كل ضلع $2R$ في جيب زاويته: $a=2R\\cdot\\sin A$.',
            'The three quotients of the sine rule are equal, and that number is the diameter $2R$ of the circumscribed circle. Knowing a side and its opposite angle you find R; knowing R, each side is $2R$ times the sine of its angle: $a=2R\\cdot\\sin A$.'
        ),
        examplePrompt: say('Triangelu bat 6 cm-ko erradioko zirkunferentzia batean inskribatuta dago, eta $B=48°$. Kalkulatu $b$.', 'Un triángulo está inscrito en una circunferencia de radio 6 cm y $B=48°$. Halla $b$.', 'مثلث محاط بدائرة نصف قطرها 6 سم، و$B=48°$. أوجد $b$.', 'A triangle is inscribed in a circle of radius 6 cm and $B=48°$. Find $b$.'),
        example: same('$b=2\\cdot 6\\cdot\\sin 48°\\approx 8{,}92$'),
        why: {
            text: say(
                'Zergatik da diametroa? Marraztu B-tik BD diametroa. BCD triangelua angeluzuzena da C erpinean, zirkunferentzia-erdia hartzen baitu, eta haren D angeluak A-k beste neurtzen du: biek BC arkua hartzen dute. Beraz, A-ren sinua $a$ katetoa zati $2R$ hipotenusa da.',
                '¿Por qué es el diámetro? Traza desde B el diámetro BD. El triángulo BCD es rectángulo en C, porque abarca media circunferencia, y su ángulo D mide lo mismo que A: los dos abarcan el arco BC. Entonces el seno de A es el cateto $a$ entre la hipotenusa $2R$.',
                'لماذا هو القطر؟ ارسم من B القطر BD. المثلث BCD قائم في C لأنه يحصر نصف الدائرة، وزاويته D تساوي A لأن كلتيهما تحصران القوس BC. إذن جيب A هو الضلع القائم $a$ على الوتر $2R$.',
                'Why is it the diameter? Draw the diameter BD from B. Triangle BCD has a right angle at C, because it spans half the circle, and its angle D equals A: both span the arc BC. So the sine of A is the leg $a$ divided by the hypotenuse $2R$.'
            ),
            math: same('$\\sin A=\\frac{a}{2R}$')
        }
    },

    /* ---------- 4. The cosine rule ---------- */
    'cosine-rule': {
        definitions: [
            { term: say('Tarteko angelua', 'Ángulo comprendido', 'الزاوية المحصورة', 'Included angle'), meaning: say('Bi aldek osatzen duten angelua: A angelua $b$ eta $c$ aldeen artean dago.', 'El ángulo que forman dos lados: A está entre $b$ y $c$.', 'الزاوية التي يكوّنها ضلعان: A محصورة بين $b$ و$c$.', 'The angle that two sides make: A lies between $b$ and $c$.') }
        ],
        vocabulary: [
            say('zuzenketa', 'corrección', 'التصحيح', 'correction'),
            say('Pitagoras', 'Pitágoras', 'فيثاغورس', 'Pythagoras')
        ],
        explanation: say(
            'Bi alde eta haien arteko angelua ezagutzen badira, sinuaren teoremak ez du balio: bikote bat falta da. Kosinuaren teoremak hirugarren aldea ematen du. A = 90° bada, kosinua 0 da eta Pitagoras geratzen da; A zorrotza bada, $a^2$ txikiagoa da $b^2+c^2$ baino; kamutsa bada, handiagoa.',
            'Si se conocen dos lados y el ángulo que forman, el teorema de los senos no sirve: falta una pareja. El teorema del coseno da el tercer lado. Si A = 90°, el coseno vale 0 y queda Pitágoras; si A es agudo, $a^2$ es menor que $b^2+c^2$; si es obtuso, mayor.',
            'إذا عرفنا ضلعين والزاوية بينهما فلا تفيد مبرهنة الجيوب: ينقص ثنائي. ومبرهنة جيب التمام تعطي الضلع الثالث. إذا كانت A = 90° فجيب التمام 0 ويبقى فيثاغورس؛ وإذا كانت A حادة فإن $a^2$ أصغر من $b^2+c^2$، وإذا كانت منفرجة فأكبر.',
            'If you know two sides and the angle between them, the sine rule does not work: a pair is missing. The cosine rule gives the third side. If A = 90°, the cosine is 0 and Pythagoras is left; if A is acute, $a^2$ is less than $b^2+c^2$; if it is obtuse, greater.'
        ),
        examplePrompt: say('ABC triangeluan $a=4$ m, $b=6$ m eta $C=110°$ dira. Kalkulatu $c$.', 'En el triángulo ABC, $a=4$ m, $b=6$ m y $C=110°$. Halla $c$.', 'في المثلث ABC: $a=4$ م و$b=6$ م و$C=110°$. أوجد $c$.', 'In triangle ABC, $a=4$ m, $b=6$ m and $C=110°$. Find $c$.'),
        example: same('$\\begin{gathered}c^2=16+36-48\\cdot\\cos 110°\\approx 68{,}42\\\\ c\\approx 8{,}27\\end{gathered}$'),
        why: {
            text: say(
                'Zergatik funtzionatzen du? C-tik ateratako altuerak $b\\cdot\\sin A$ neurtzen du, eta haren oina A-tik $b\\cdot\\cos A$ distantziara dago. Geratzen den triangelu angeluzuzenean, Pitagorasek beheko berdintza ematen du; garatzean, $\\sin^2 A+\\cos^2 A=1$ erlazioak $b^2+c^2-2bc\\cdot\\cos A$ uzten du.',
                '¿Por qué funciona? La altura desde C mide $b\\cdot\\sin A$ y su pie está a $b\\cdot\\cos A$ de A. En el triángulo rectángulo que queda, Pitágoras da la igualdad de abajo; al desarrollarla, $\\sin^2 A+\\cos^2 A=1$ deja $b^2+c^2-2bc\\cdot\\cos A$.',
                'لماذا تصح؟ الارتفاع النازل من C طوله $b\\cdot\\sin A$ وقدمه على بعد $b\\cdot\\cos A$ من A. وفي المثلث القائم الباقي يعطي فيثاغورس المساواة التي تحت؛ وعند النشر تترك $\\sin^2 A+\\cos^2 A=1$ العبارة $b^2+c^2-2bc\\cdot\\cos A$.',
                'Why does it work? The height from C measures $b\\cdot\\sin A$ and its foot is $b\\cdot\\cos A$ away from A. In the right-angled triangle that is left, Pythagoras gives the equality below; expanding it, $\\sin^2 A+\\cos^2 A=1$ leaves $b^2+c^2-2bc\\cdot\\cos A$.'
            ),
            math: same('$a^2=(b\\cdot\\sin A)^2+(c-b\\cdot\\cos A)^2$')
        }
    },
    'three-sides': {
        definitions: [
            { term: say('Desberdintza triangeluarra', 'Desigualdad triangular', 'المتباينة المثلثية', 'Triangle inequality'), meaning: say('Alde bakoitza beste bien batura baino txikiagoa da.', 'Cada lado es menor que la suma de los otros dos.', 'كل ضلع أصغر من مجموع الضلعين الآخرين.', 'Each side is shorter than the other two added together.') }
        ],
        vocabulary: [
            say('angeluzorrotza', 'acutángulo', 'حاد الزوايا', 'acute'),
            say('angelukamutsa', 'obtusángulo', 'منفرج', 'obtuse')
        ],
        explanation: say(
            'Hiru aldeekin, kosinuaren teorema angeluarentzat askatzen da. Arku kosinuak angelu bakarra ematen du 0°-tik 180°-ra; beraz, hemen ez dago zalantzarik: komeni da angelu handienetik hastea, alde handienaren aurkakotik. Haren kosinuaren zeinuak mota esaten du: positiboa, angeluzorrotza; zero, angeluzuzena; negatiboa, angelukamutsa.',
            'Con los tres lados, el teorema del coseno se despeja para el ángulo. El arco coseno da un único ángulo entre 0° y 180°, así que aquí no hay dudas: conviene empezar por el ángulo mayor, el opuesto al lado mayor. El signo de su coseno dice la clase: positivo, acutángulo; cero, rectángulo; negativo, obtusángulo.',
            'مع الأضلاع الثلاثة نعزل الزاوية في مبرهنة جيب التمام. وقوس جيب التمام يعطي زاوية واحدة بين 0° و180°، فلا التباس هنا: يحسن البدء بأكبر زاوية، المقابلة لأكبر ضلع. وإشارة جيب تمامها تحدد النوع: موجبة، حاد الزوايا؛ صفر، قائم؛ سالبة، منفرج.',
            'With the three sides, the cosine rule is solved for the angle. The inverse cosine gives a single angle between 0° and 180°, so there is no doubt here: it is best to start with the largest angle, the one opposite the longest side. The sign of its cosine tells the type: positive, acute; zero, right-angled; negative, obtuse.'
        ),
        examplePrompt: say('Aldeak 6, 8 eta 11 dituen triangelua angeluzorrotza, angeluzuzena ala angelukamutsa da?', '¿Es acutángulo, rectángulo u obtusángulo el triángulo de lados 6, 8 y 11?', 'هل المثلث الذي أضلاعه 6 و8 و11 حاد الزوايا أم قائم أم منفرج؟', 'Is the triangle with sides 6, 8 and 11 acute, right-angled or obtuse?'),
        example: same('$11^2=121>6^2+8^2=100$'),
        exampleAnswer: say('Angelukamutsa: angelu handienaren kosinua negatiboa da.', 'Obtusángulo: el coseno del ángulo mayor es negativo.', 'منفرج: جيب تمام أكبر زاوية سالب.', 'Obtuse: the cosine of the largest angle is negative.')
    },
    'which-rule': {
        definitions: [
            { term: say('Bikote ezaguna', 'Pareja conocida', 'الثنائي المعروف', 'Known pair'), meaning: say('Alde bat eta haren aurkako angelua, biak ezagunak.', 'Un lado y su ángulo opuesto, los dos conocidos.', 'ضلع والزاوية المقابلة له، وكلاهما معروف.', 'A side and its opposite angle, both known.') }
        ],
        vocabulary: [
            say('datuak', 'datos', 'المعطيات', 'data'),
            say('zorrotza', 'agudo', 'حادة', 'acute')
        ],
        explanation: say(
            'Kalkulatu aurretik, begiratu zer datu dauden. Alde–aurkako angelu bikote bat ezagutzen baduzu, erabili sinuaren teorema; bestela, kosinuarena. Angelu bat sinuekin bilatzean, hasi alde txikienarenetik: zorrotza da ziur eta kalkulagailuak ez du engainatzen. Azken angelua beti 180°-tik ateratzen da.',
            'Antes de calcular, mira qué datos hay. Si conoces una pareja lado–ángulo opuesto, usa el teorema de los senos; si no, el del coseno. Cuando busques un ángulo con los senos, empieza por el del lado menor: seguro que es agudo y la calculadora no engaña. El último ángulo sale siempre de 180°.',
            'قبل الحساب انظر ما المعطيات. إذا عرفت ثنائيًا من ضلع وزاوية مقابلة فاستعمل مبرهنة الجيوب، وإلا فمبرهنة جيب التمام. وعندما تبحث عن زاوية بالجيوب ابدأ بزاوية أصغر ضلع: إنها حادة حتمًا والآلة الحاسبة لا تخدعك. والزاوية الأخيرة تخرج دائمًا من 180°.',
            'Before calculating, look at what data you have. If you know a side–opposite angle pair, use the sine rule; if not, the cosine rule. When you look for an angle with the sines, start with that of the shortest side: it is sure to be acute and the calculator will not mislead you. The last angle always comes from 180°.'
        ),
        cases: [
            { title: say('Bi angelu eta alde bat', 'Dos ángulos y un lado', 'زاويتان وضلع', 'Two angles and a side'), text: say('Hirugarren angelua 180°-tik; aldeak, sinuekin.', 'El tercer ángulo, de 180°; los lados, con los senos.', 'الزاوية الثالثة من 180°، والأضلاع بالجيوب.', 'The third angle from 180°; the sides with the sines.') },
            { title: say('Bi alde eta haien arteko angelua', 'Dos lados y el ángulo que forman', 'ضلعان والزاوية بينهما', 'Two sides and the angle between them'), text: say('Hirugarren aldea kosinuarekin; gero, sinuak.', 'El tercer lado, con el coseno; después, los senos.', 'الضلع الثالث بجيب التمام، ثم الجيوب.', 'The third side with the cosine; then the sines.') },
            { title: say('Hiru alde', 'Tres lados', 'ثلاثة أضلاع', 'Three sides'), text: say('Angeluak kosinuarekin: lehenik handiena.', 'Los ángulos, con el coseno: primero el mayor.', 'الزوايا بجيب التمام: الكبرى أولًا.', 'The angles with the cosine: the largest first.') },
            { title: say('Bi alde eta aurkako angelu bat', 'Dos lados y un ángulo opuesto', 'ضلعان وزاوية مقابلة', 'Two sides and an opposite angle'), text: say('Sinuak, 0, 1 edo 2 triangelu dauden begiratuz.', 'Los senos, mirando si hay 0, 1 o 2 triángulos.', 'الجيوب، مع النظر هل يوجد 0 أو 1 أو 2 من المثلثات.', 'The sines, checking whether there are 0, 1 or 2 triangles.') }
        ],
        examplePrompt: say('ABC triangeluan $A=38°$, $b=12$ m eta $c=15$ m dira. Zein teorema erabiltzen duzu lehenik? Kalkulatu $a$.', 'En el triángulo ABC, $A=38°$, $b=12$ m y $c=15$ m. ¿Qué teorema usas primero? Halla $a$.', 'في المثلث ABC: $A=38°$ و$b=12$ م و$c=15$ م. أي مبرهنة تستعمل أولًا؟ أوجد $a$.', 'In triangle ABC, $A=38°$, $b=12$ m and $c=15$ m. Which rule do you use first? Find $a$.'),
        example: same('$a^2=144+225-360\\cdot\\cos 38°\\ \\to\\ a\\approx 9{,}24$'),
        exampleAnswer: say('Kosinuarena: ez da alde–aurkako angelu bikoterik ezagutzen.', 'El del coseno: no se conoce ninguna pareja lado–ángulo opuesto.', 'مبرهنة جيب التمام: لا نعرف أي ثنائي من ضلع وزاوية مقابلة.', 'The cosine rule: no side–opposite angle pair is known.')
    },

    /* ---------- 5. Areas and problems ---------- */
    heron: {
        definitions: [
            { term: say('Perimetro-erdia', 'Semiperímetro', 'نصف المحيط', 'Semi-perimeter'), meaning: say('Perimetroaren erdia: $s=\\frac{a+b+c}{2}$.', 'La mitad del perímetro: $s=\\frac{a+b+c}{2}$.', 'نصف المحيط: $s=\\frac{a+b+c}{2}$.', 'Half the perimeter: $s=\\frac{a+b+c}{2}$.') }
        ],
        vocabulary: [
            say('azalera', 'área', 'المساحة', 'area'),
            say('perimetroa', 'perímetro', 'المحيط', 'perimeter')
        ],
        explanation: say(
            'Bi alde eta haien arteko angelua ezagutzen badituzu, azalera haien biderkaduraren erdia bider angelu horren sinua da. Hiru aldeak ezagutzen badituzu, Heronen formulak azalera ematen du angelurik kalkulatu gabe: s perimetro-erdia aurkitzen da, s ken alde bakoitzaz biderkatzen da, eta biderkadura horren erroa azalera da.',
            'Si conoces dos lados y el ángulo que forman, el área es la mitad de su producto por el seno de ese ángulo. Si conoces los tres lados, la fórmula de Herón da el área sin calcular ningún ángulo: se halla el semiperímetro s, se multiplica por s menos cada lado y la raíz de ese producto es el área.',
            'إذا عرفت ضلعين والزاوية بينهما فالمساحة نصف جدائهما في جيب تلك الزاوية. وإذا عرفت الأضلاع الثلاثة فصيغة هيرون تعطي المساحة دون حساب أي زاوية: نجد نصف المحيط s ونضربه في s ناقص كل ضلع، وجذر هذا الجداء هو المساحة.',
            'If you know two sides and the angle between them, the area is half their product times the sine of that angle. If you know the three sides, Heron\'s formula gives the area without working out any angle: find the semi-perimeter s, multiply it by s minus each side, and the square root of that product is the area.'
        ),
        examplePrompt: say('Kalkulatu aldeak 5, 6 eta 9 m dituen triangeluaren azalera.', 'Halla el área del triángulo de lados 5, 6 y 9 m.', 'أوجد مساحة المثلث الذي أضلاعه 5 و6 و9 م.', 'Find the area of the triangle with sides 5, 6 and 9 m.'),
        example: same('$s=10\\qquad S=\\sqrt{10\\cdot 5\\cdot 4\\cdot 1}\\approx 14{,}14$'),
        why: {
            text: say(
                'Zergatik funtzionatzen du? Heron $S=\\frac{1}{2}\\,bc\\cdot\\sin A$ formulatik dator, sinua hiru aldeekin idaztean. Probatu aldeak 3, 4 eta 5 dituen triangelu angeluzuzenarekin: $s=6$, eta azalerak kateto bider kateto zati 2 izan behar du.',
                '¿Por qué funciona? Herón sale de $S=\\frac{1}{2}\\,bc\\cdot\\sin A$ al escribir el seno con los tres lados. Pruébala con el triángulo rectángulo de lados 3, 4 y 5: $s=6$, y el área tiene que ser cateto por cateto entre 2.',
                'لماذا تصح؟ تأتي صيغة هيرون من $S=\\frac{1}{2}\\,bc\\cdot\\sin A$ عند كتابة الجيب بالأضلاع الثلاثة. جرّبها على المثلث القائم الذي أضلاعه 3 و4 و5: $s=6$، ويجب أن تكون المساحة الضلع القائم في الآخر على 2.',
                'Why does it work? Heron comes from $S=\\frac{1}{2}\\,bc\\cdot\\sin A$ by writing the sine with the three sides. Try it on the right-angled triangle with sides 3, 4 and 5: $s=6$, and the area must be leg times leg divided by 2.'
            ),
            math: same('$\\sqrt{6\\cdot 3\\cdot 2\\cdot 1}=6=\\frac{3\\cdot 4}{2}$')
        }
    },
    inaccessible: {
        definitions: [
            { term: say('Triangulazioa', 'Triangulación', 'التثليث', 'Triangulation'), meaning: say('Oinarri bat eta haren muturretako angeluak neurtzea, urruneko puntu bat kokatzeko.', 'Medir una base y los ángulos desde sus extremos para situar un punto lejano.', 'قياس قاعدة والزاويتين من طرفيها لتحديد موضع نقطة بعيدة.', 'Measuring a base and the angles from its ends to locate a faraway point.') }
        ],
        vocabulary: [
            say('oinarria', 'base', 'القاعدة', 'base'),
            say('buia', 'boya', 'العوامة', 'buoy')
        ],
        explanation: say(
            'Puntu batera iritsi ezin denean, buia batera edo mendi baten tontorrera adibidez, AB oinarri bat neurtzen da lehorrean, eta haren muturretatik punturako angeluak. Triangeluak bi angelu eta alde bat ditu: hirugarren angelua 180°-tik ateratzen da, eta distantzia bakoitza sinuaren teorematik.',
            'Cuando no se puede llegar a un punto, como una boya o la cima de un monte, se mide una base AB en tierra y, desde sus extremos, los ángulos hacia el punto. El triángulo queda con dos ángulos y un lado: el tercer ángulo sale de 180° y cada distancia, del teorema de los senos.',
            'عندما لا يمكن بلوغ نقطة، مثل عوامة أو قمة جبل، نقيس قاعدة AB على اليابسة والزاويتين من طرفيها نحو النقطة. فيصير للمثلث زاويتان وضلع: الزاوية الثالثة من 180° وكل مسافة من مبرهنة الجيوب.',
            'When you cannot reach a point, such as a buoy or the top of a mountain, you measure a base AB on land and, from its ends, the angles towards the point. The triangle then has two angles and a side: the third angle comes from 180° and each distance from the sine rule.'
        ),
        examplePrompt: say('3 km-ra dauden bi itsasargitatik itsasontzi bat ikusten da, 40° eta 75° angeluekin. Zer distantziara dago lehenengotik?', 'Desde dos faros a 3 km uno de otro se ve un barco con ángulos de 40° y 75°. ¿A qué distancia está del primero?', 'من منارتين المسافة بينهما 3 كم تُرى سفينة بالزاويتين 40° و75°. كم تبعد عن الأولى؟', 'From two lighthouses 3 km apart a ship is seen at angles of 40° and 75°. How far is it from the first one?'),
        example: same('$\\frac{3\\cdot\\sin 75°}{\\sin 65°}\\approx 3{,}20$'),
        exampleAnswer: say('3,20 km inguru: itsasontziko angelua 65° da.', 'A unos 3,20 km: el ángulo en el barco es 65°.', 'نحو 3.20 كم: الزاوية عند السفينة 65°.', 'About 3.20 km: the angle at the ship is 65°.')
    },
    'parallelogram-forces': {
        definitions: [
            { term: say('Erresultantea', 'Resultante', 'المحصلة', 'Resultant'), meaning: say('Bi indarrek batera egiten dutena egiten duen indarra: paralelogramoaren diagonala.', 'La fuerza que hace lo mismo que las dos juntas: la diagonal del paralelogramo.', 'القوة التي تفعل ما تفعله القوتان معًا: قطر متوازي الأضلاع.', 'The force that does the same as the two together: the diagonal of the parallelogram.') }
        ],
        vocabulary: [
            say('diagonala', 'diagonal', 'القطر', 'diagonal'),
            say('indarra', 'fuerza', 'القوة', 'force')
        ],
        explanation: say(
            'Puntu beretik tiratzen duten bi indar paralelogramoaren erregelarekin batzen dira: erresultantea diagonala da. Indarrekin osatzen duen triangeluan, diagonalaren aurkako angelua ez da indarren arteko θ, baizik eta 180° − θ. Horregatik kosinuak zeinua aldatzen du, eta diagonal luzea $d^2=a^2+b^2+2ab\\cdot\\cos\\theta$ da.',
            'Dos fuerzas que tiran del mismo punto se suman con la regla del paralelogramo: la resultante es la diagonal. En el triángulo que forma con las fuerzas, el ángulo opuesto a la diagonal no es el de las fuerzas, θ, sino 180° − θ. Por eso el coseno cambia de signo y la diagonal larga queda $d^2=a^2+b^2+2ab\\cdot\\cos\\theta$.',
            'تُجمع قوتان تشدّان النقطة نفسها بقاعدة متوازي الأضلاع: المحصلة هي القطر. وفي المثلث الذي يكوّنه القطر مع القوتين ليست الزاوية المقابلة للقطر هي θ بين القوتين، بل 180° − θ. لذلك يغيّر جيب التمام إشارته ويصير القطر الطويل $d^2=a^2+b^2+2ab\\cdot\\cos\\theta$.',
            'Two forces pulling on the same point add up with the parallelogram rule: the resultant is the diagonal. In the triangle it makes with the forces, the angle opposite the diagonal is not the angle θ between the forces but 180° − θ. That is why the cosine changes sign and the long diagonal is $d^2=a^2+b^2+2ab\\cdot\\cos\\theta$.'
        ),
        examplePrompt: say('Paralelogramo baten aldeak 8 cm eta 5 cm dira, eta 70° osatzen dute. Kalkulatu diagonal laburra.', 'Un paralelogramo tiene lados de 8 cm y 5 cm que forman 70°. Halla su diagonal corta.', 'متوازي أضلاع ضلعاه 8 سم و5 سم وبينهما 70°. أوجد قطره القصير.', 'A parallelogram has sides of 8 cm and 5 cm that make 70°. Find its short diagonal.'),
        example: same('$d^2=64+25-80\\cdot\\cos 70°\\ \\to\\ d\\approx 7{,}85$')
    }
}
