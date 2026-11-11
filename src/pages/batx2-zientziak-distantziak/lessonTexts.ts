import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { AnglesDistancesTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Angeluak eta distantziak · Batxilergoa 2 · Zientziak — what each lesson
   tells: the new words (definitions), a short explanation, the example
   as an exercise («Another example»), the key words in four languages
   and, in five lessons, «Why does it work?». Plain data so the tests can
   import it; lessons.tsx merges it into the topics. The example uses
   numbers of its own. Formulas never start with a bare z (the Basque
   suffix test would read it as a suffix): {z} is the same.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const anglesDistancesLessonTexts: Record<AnglesDistancesTopicId, LessonTexts> = {
    /* ---------- 1. Angles ---------- */
    'angle-lines': {
        definitions: [
            { term: say('Bi zuzenen angelua', 'Ángulo de dos rectas', 'زاوية مستقيمين', 'Angle of two lines'), meaning: say('Haien norabideek osatzen duten angelu txikiena, $0^\\circ$ eta $90^\\circ$ artean.', 'El menor ángulo que forman sus directores, entre $0^\\circ$ y $90^\\circ$.', 'أصغر زاوية بين اتجاهيهما، بين $0^\\circ$ و$90^\\circ$.', 'The smallest angle between their directions, from $0^\\circ$ to $90^\\circ$.') }
        ],
        vocabulary: [
            say('norabidea', 'director', 'الاتجاه', 'direction'),
            say('balio absolutua', 'valor absoluto', 'القيمة المطلقة', 'absolute value')
        ],
        explanation: say(
            'Bi zuzenen angelua haien $\\vec{u}$ eta $\\vec{v}$ norabideena da, ebakitzen ez badira ere. Biderkadura eskalarrak kosinua ematen du; balio absolutua hartzen da, angelua $0^\\circ$ eta $90^\\circ$ artean egon dadin. $\\vec{u}\\cdot\\vec{v}=0$ bada, perpendikularrak dira.',
            'El ángulo de dos rectas es el de sus directores $\\vec{u}$ y $\\vec{v}$, aunque no se corten. El producto escalar da el coseno; se toma el valor absoluto para que el ángulo quede entre $0^\\circ$ y $90^\\circ$. Si $\\vec{u}\\cdot\\vec{v}=0$, son perpendiculares.',
            'زاوية مستقيمين هي زاوية اتجاهيهما $\\vec{u}$ و$\\vec{v}$ ولو لم يتقاطعا. يعطي الجداء السلمي جيب التمام، ونأخذ القيمة المطلقة لتبقى الزاوية بين $0^\\circ$ و$90^\\circ$. وإذا كان $\\vec{u}\\cdot\\vec{v}=0$ فهما متعامدان.',
            'The angle of two lines is the angle of their directions $\\vec{u}$ and $\\vec{v}$, even if they do not meet. The dot product gives the cosine; take the absolute value so the angle stays between $0^\\circ$ and $90^\\circ$. If $\\vec{u}\\cdot\\vec{v}=0$, they are perpendicular.'
        ),
        examplePrompt: say('Zer angelu osatzen dute $(1,-2,2)$ eta $(2,2,1)$ norabideak dituzten zuzenek?', '¿Qué ángulo forman las rectas de directores $(1,-2,2)$ y $(2,2,1)$?', 'ما الزاوية بين المستقيمين ذوي الاتجاهين $(1,-2,2)$ و$(2,2,1)$؟', 'What angle do the lines with directions $(1,-2,2)$ and $(2,2,1)$ form?'),
        example: same('$(1,-2,2)\\cdot(2,2,1)=2-4+2=0$'),
        exampleAnswer: say('Perpendikularrak dira: $90^\\circ$.', 'Son perpendiculares: $90^\\circ$.', 'متعامدان: $90^\\circ$.', 'They are perpendicular: $90^\\circ$.')
    },
    'angle-line-plane': {
        definitions: [
            { term: say('Zuzenaren eta planoaren angelua', 'Ángulo de recta y plano', 'زاوية المستقيم والمستوى', 'Angle of line and plane'), meaning: say('Zuzenak planoko bere proiekzioarekin osatzen duen angelua.', 'El ángulo que forma la recta con su proyección sobre el plano.', 'الزاوية بين المستقيم ومسقطه على المستوى.', 'The angle between the line and its projection on the plane.') }
        ],
        vocabulary: [
            say('sinua', 'seno', 'الجيب', 'sine'),
            say('osagarria', 'complementario', 'المتممة', 'complement')
        ],
        explanation: say(
            'Planoak ez du norabide bakarra, baina bai $\\vec{n}$ normala. $\\vec{u}$ eta $\\vec{n}$ bektoreen angelua planoarekikoaren osagarria da; horregatik, formula bera sinua da: $\\sin\\alpha=\\frac{|\\vec{u}\\cdot\\vec{n}|}{|\\vec{u}|\\,|\\vec{n}|}$. $\\vec{u}\\cdot\\vec{n}=0$ bada, angelua $0^\\circ$ da.',
            'El plano no tiene una sola dirección, pero sí el normal $\\vec{n}$. El ángulo entre $\\vec{u}$ y $\\vec{n}$ es el complementario del ángulo con el plano; por eso la misma fórmula da el seno: $\\sin\\alpha=\\frac{|\\vec{u}\\cdot\\vec{n}|}{|\\vec{u}|\\,|\\vec{n}|}$. Si $\\vec{u}\\cdot\\vec{n}=0$, el ángulo es $0^\\circ$.',
            'ليس للمستوى اتجاه واحد، لكن له الناظم $\\vec{n}$. الزاوية بين $\\vec{u}$ و$\\vec{n}$ متممة للزاوية مع المستوى؛ لذلك تعطي الصيغة نفسها الجيب: $\\sin\\alpha=\\frac{|\\vec{u}\\cdot\\vec{n}|}{|\\vec{u}|\\,|\\vec{n}|}$. وإذا كان $\\vec{u}\\cdot\\vec{n}=0$ فالزاوية $0^\\circ$.',
            'A plane has no single direction, but it has the normal $\\vec{n}$. The angle between $\\vec{u}$ and $\\vec{n}$ is the complement of the angle with the plane; so the same formula gives the sine: $\\sin\\alpha=\\frac{|\\vec{u}\\cdot\\vec{n}|}{|\\vec{u}|\\,|\\vec{n}|}$. If $\\vec{u}\\cdot\\vec{n}=0$, the angle is $0^\\circ$.'
        ),
        examplePrompt: say('$r$ zuzenaren norabidea $(2,1,2)$ da eta $\\pi$: ${z}=-4$. Zer angelu osatzen dute?', '$r$ tiene dirección $(2,1,2)$ y $\\pi$: ${z}=-4$. ¿Qué ángulo forman?', 'اتجاه $r$ هو $(2,1,2)$ و$\\pi$: ‏${z}=-4$. ما الزاوية بينهما؟', '$r$ has direction $(2,1,2)$ and $\\pi$: ${z}=-4$. What angle do they form?'),
        example: same('$\\sin\\alpha=\\frac{2}{3\\cdot 1}=\\frac{2}{3}$'),
        exampleAnswer: same('$\\alpha\\approx 41{,}81^\\circ$'),
        why: {
            text: say(
                'Zuzena, haren proiekzioa eta normala plano berean daude, eta normala proiekzioarekiko perpendikularra da. Beraz, normalarekiko $\\beta$ angeluak eta planoarekiko $\\alpha$ angeluak $90^\\circ$ batzen dute, eta $\\sin\\alpha=\\cos\\beta$.',
                'La recta, su proyección y el normal están en un mismo plano, y el normal es perpendicular a la proyección. Así, el ángulo $\\beta$ con el normal y el ángulo $\\alpha$ con el plano suman $90^\\circ$, y $\\sin\\alpha=\\cos\\beta$.',
                'المستقيم ومسقطه والناظم في مستوى واحد، والناظم عمودي على المسقط. لذا مجموع الزاوية $\\beta$ مع الناظم والزاوية $\\alpha$ مع المستوى $90^\\circ$، و$\\sin\\alpha=\\cos\\beta$.',
                'The line, its projection and the normal lie in one plane, and the normal is perpendicular to the projection. So the angle $\\beta$ with the normal and the angle $\\alpha$ with the plane add up to $90^\\circ$, and $\\sin\\alpha=\\cos\\beta$.'
            ),
            math: same('$\\alpha+\\beta=90^\\circ\\ \\to\\ \\sin\\alpha=\\cos\\beta$')
        }
    },
    'angle-planes': {
        definitions: [
            { term: say('Bi planoren angelua', 'Ángulo de dos planos', 'زاوية مستويين', 'Angle of two planes'), meaning: say('Haien normalek osatzen duten angelu txikiena.', 'El menor ángulo que forman sus normales.', 'أصغر زاوية بين ناظميهما.', 'The smallest angle between their normals.') }
        ],
        vocabulary: [
            say('normalak', 'normales', 'الناظمين', 'normals'),
            say('perpendikularrak', 'perpendiculares', 'متعامدين', 'perpendicular')
        ],
        explanation: say(
            'Bi planoren angelua haien normalena da: $\\cos\\alpha=\\frac{|\\vec{n}_1\\cdot\\vec{n}_2|}{|\\vec{n}_1|\\,|\\vec{n}_2|}$, balio absolutuarekin. Planoak perpendikularrak dira normalak perpendikularrak badira, $\\vec{n}_1\\cdot\\vec{n}_2=0$; horrela aurkitzen da parametro bat.',
            'El ángulo de dos planos es el de sus normales: $\\cos\\alpha=\\frac{|\\vec{n}_1\\cdot\\vec{n}_2|}{|\\vec{n}_1|\\,|\\vec{n}_2|}$, con valor absoluto. Los planos son perpendiculares si lo son sus normales, $\\vec{n}_1\\cdot\\vec{n}_2=0$; así se halla un parámetro.',
            'زاوية مستويين هي زاوية ناظميهما: $\\cos\\alpha=\\frac{|\\vec{n}_1\\cdot\\vec{n}_2|}{|\\vec{n}_1|\\,|\\vec{n}_2|}$ بالقيمة المطلقة. ويكون المستويان متعامدين إذا تعامد ناظماهما، $\\vec{n}_1\\cdot\\vec{n}_2=0$؛ وهكذا نجد وسيطًا.',
            'The angle of two planes is the angle of their normals: $\\cos\\alpha=\\frac{|\\vec{n}_1\\cdot\\vec{n}_2|}{|\\vec{n}_1|\\,|\\vec{n}_2|}$, with absolute value. The planes are perpendicular if their normals are, $\\vec{n}_1\\cdot\\vec{n}_2=0$; that is how a parameter is found.'
        ),
        examplePrompt: say('Aurkitu $a$, $ax+y-{z}=4$ eta $2x+3y+5{z}=7$ perpendikularrak izan daitezen.', 'Halla $a$ para que $ax+y-{z}=4$ y $2x+3y+5{z}=7$ sean perpendiculares.', 'أوجد $a$ ليكون $ax+y-{z}=4$ و$2x+3y+5{z}=7$ متعامدين.', 'Find $a$ so that $ax+y-{z}=4$ and $2x+3y+5{z}=7$ are perpendicular.'),
        example: same('$\\vec{n}_1\\cdot\\vec{n}_2=2a+3-5=0$'),
        exampleAnswer: same('$a=1$')
    },

    /* ---------- 2. Projections ---------- */
    'project-point-plane': {
        definitions: [
            { term: say('Proiekzio ortogonala', 'Proyección ortogonal', 'المسقط العمودي', 'Orthogonal projection'), meaning: say('$P$ puntutik planora jaisten den perpendikularraren $M$ oina.', 'El pie $M$ de la perpendicular que baja de $P$ al plano.', 'المسقط $M$ للعمودي النازل من $P$ إلى المستوى.', 'The foot $M$ of the perpendicular dropped from $P$ to the plane.') }
        ],
        vocabulary: [
            say('oina', 'pie', 'المسقط', 'foot'),
            say('perpendikularra', 'perpendicular', 'العمودي', 'perpendicular')
        ],
        explanation: say(
            'Planoarekiko perpendikularra den zuzenak normalaren norabidea du. $P+t\\,\\vec{n}$ zuzena, $P$ puntutik pasatzen dena, planoaren ekuazioan ordezkatzen da: $t$ ateratzen da, eta $t$ hori zuzenean jarrita $M$ oina.',
            'La recta perpendicular al plano tiene la dirección del normal. La recta $P+t\\,\\vec{n}$, que pasa por $P$, se sustituye en la ecuación del plano: sale $t$, y con ese $t$ en la recta, el pie $M$.',
            'المستقيم العمودي على المستوى اتجاهه الناظم. نعوّض المستقيم $P+t\\,\\vec{n}$ المار بـ $P$ في معادلة المستوى: نحصل على $t$، وبوضع $t$ هذه في المستقيم نحصل على المسقط $M$.',
            'The line perpendicular to the plane has the direction of the normal. The line $P+t\\,\\vec{n}$, through $P$, is put into the equation of the plane: you get $t$, and with that $t$ in the line, the foot $M$.'
        ),
        examplePrompt: say('Aurkitu $P(5,2,0)$ puntuaren proiekzioa $\\pi$: $2x+y=2$ planoan.', 'Halla la proyección de $P(5,2,0)$ sobre $\\pi$: $2x+y=2$.', 'أوجد مسقط $P(5,2,0)$ على $\\pi$: ‏$2x+y=2$.', 'Find the projection of $P(5,2,0)$ on $\\pi$: $2x+y=2$.'),
        example: same('$2(5+2t)+(2+t)=2\\ \\to\\ 5t=-10$'),
        exampleAnswer: same('$M=(1,0,0)$')
    },
    'project-point-line': {
        vocabulary: [
            say('oina', 'pie', 'المسقط', 'foot'),
            say('ebakitzen', 'corta', 'يقطع', 'meets')
        ],
        explanation: say(
            '$P$ puntutik pasatzen den eta $r$ zuzenarekiko perpendikularra den planoa idazten da: haren normala zuzenaren $\\vec{u}$ norabidea da. Plano horrek zuzena ebakitzen duen puntua $M$ oina da, $P$ puntutik hurbilen dagoen zuzeneko puntua.',
            'Se escribe el plano que pasa por $P$ y es perpendicular a $r$: su normal es el director $\\vec{u}$ de la recta. El punto donde ese plano corta a la recta es el pie $M$, el punto de la recta más cercano a $P$.',
            'نكتب المستوى المار بـ $P$ والعمودي على $r$: ناظمه هو اتجاه المستقيم $\\vec{u}$. والنقطة التي يقطع فيها هذا المستوى المستقيمَ هي المسقط $M$، أقرب نقطة من المستقيم إلى $P$.',
            'Write the plane through $P$ perpendicular to $r$: its normal is the direction $\\vec{u}$ of the line. The point where that plane meets the line is the foot $M$, the point of the line closest to $P$.'
        ),
        examplePrompt: say('Aurkitu $P(0,4,2)$ puntuaren proiekzioa $r$: $(t,0,t)$ zuzenean.', 'Halla la proyección de $P(0,4,2)$ sobre $r$: $(t,0,t)$.', 'أوجد مسقط $P(0,4,2)$ على $r$: ‏$(t,0,t)$.', 'Find the projection of $P(0,4,2)$ on $r$: $(t,0,t)$.'),
        example: same('$x+{z}=2\\ \\to\\ t+t=2\\ \\to\\ t=1$'),
        exampleAnswer: same('$M=(1,0,1)$')
    },
    'project-line-plane': {
        vocabulary: [
            say('proiekzioa', 'proyección', 'المسقط', 'projection'),
            say('bi puntu', 'dos puntos', 'نقطتين', 'two points')
        ],
        explanation: say(
            'Zuzen baten proiekzioa haren puntuen proiekzioz osatuta dago. Nahikoa da bi puntu proiektatzea eta haietatik pasatzen den zuzena idaztea. Zuzena planoarekiko perpendikularra bada, proiekzioa puntu bakarra da.',
            'La proyección de una recta está formada por las proyecciones de sus puntos. Basta con proyectar dos puntos y escribir la recta que pasa por ellos. Si la recta es perpendicular al plano, la proyección es un solo punto.',
            'مسقط المستقيم مكوّن من مساقط نقاطه. يكفي إسقاط نقطتين وكتابة المستقيم المار بهما. وإذا كان المستقيم عموديًا على المستوى فالمسقط نقطة واحدة.',
            'The projection of a line is made of the projections of its points. It is enough to project two points and write the line through them. If the line is perpendicular to the plane, the projection is a single point.'
        ),
        examplePrompt: say('Proiektatu $r$: $(3,1,2)+t(1,2,0)$ zuzena $x=0$ planoan.', 'Proyecta $r$: $(3,1,2)+t(1,2,0)$ sobre el plano $x=0$.', 'أسقط $r$: ‏$(3,1,2)+t(1,2,0)$ على المستوى $x=0$.', 'Project $r$: $(3,1,2)+t(1,2,0)$ on the plane $x=0$.'),
        example: same('$(3+t,1+2t,2)\\ \\to\\ (0,1+2t,2)$'),
        exampleAnswer: same('$(x,y,{z})=(0,1,2)+t\\,(0,1,0)$')
    },

    /* ---------- 3. Symmetric points ---------- */
    'symmetric-plane': {
        definitions: [
            { term: say('Simetrikoa planoarekiko', 'Simétrico respecto de un plano', 'النظيرة بالنسبة إلى مستوى', 'Symmetric point in a plane'), meaning: say('Planoaren beste aldean, distantzia berera dagoen $P\'$ puntua.', 'El punto $P\'$ al otro lado del plano, a la misma distancia.', 'النقطة $P\'$ في الجهة الأخرى من المستوى وعلى البعد نفسه.', 'The point $P\'$ on the other side of the plane, at the same distance.') }
        ],
        vocabulary: [
            say('erdiko puntua', 'punto medio', 'المنتصف', 'midpoint'),
            say('ispilua', 'espejo', 'مرآة', 'mirror')
        ],
        explanation: say(
            'Planoa ispilu bat da. Lehenik $P$ puntuaren $M$ proiekzioa aurkitzen da; $M$ hori $P$ eta $P\'$ puntuen erdiko puntua da. Beraz, $P\'=2M-P$: koordenatu bakoitzean, $M$ bider 2 ken $P$.',
            'El plano es un espejo. Primero se halla la proyección $M$ de $P$; ese $M$ es el punto medio de $P$ y $P\'$. Así, $P\'=2M-P$: en cada coordenada, 2 por $M$ menos $P$.',
            'المستوى مرآة. نجد أولًا مسقط $P$ وهو $M$؛ و$M$ هي منتصف $P$ و$P\'$. لذا $P\'=2M-P$: في كل مركّبة، 2 في $M$ ناقص $P$.',
            'The plane is a mirror. First find the projection $M$ of $P$; that $M$ is the midpoint of $P$ and $P\'$. So $P\'=2M-P$: in each coordinate, 2 times $M$ minus $P$.'
        ),
        examplePrompt: say('Aurkitu $P(0,0,6)$ puntuaren simetrikoa $\\pi$: $x+y+{z}=3$ planoarekiko.', 'Halla el simétrico de $P(0,0,6)$ respecto de $\\pi$: $x+y+{z}=3$.', 'أوجد نظيرة $P(0,0,6)$ بالنسبة إلى $\\pi$: ‏$x+y+{z}=3$.', 'Find the symmetric of $P(0,0,6)$ with respect to $\\pi$: $x+y+{z}=3$.'),
        example: same('$t+t+6+t=3\\ \\to\\ t=-1\\ \\to\\ M=(-1,-1,5)$'),
        exampleAnswer: same('$P\'=(-2,-2,4)$'),
        why: {
            text: say(
                '$P$ eta $P\'$ puntuak normalaren zuzen berean daude eta planotik distantzia berera, bakoitza alde batean. Beraz, $M$ oina erdiko puntua da: $M=\\frac{P+P\'}{2}$, eta hortik $P\'$ askatzen da.',
                '$P$ y $P\'$ están en la misma recta normal y a la misma distancia del plano, uno a cada lado. Por eso el pie $M$ es el punto medio: $M=\\frac{P+P\'}{2}$, y de ahí se despeja $P\'$.',
                '$P$ و$P\'$ على المستقيم العمودي نفسه وعلى البعد نفسه من المستوى، كل منهما في جهة. لذا المسقط $M$ هو المنتصف: $M=\\frac{P+P\'}{2}$، ومنه نعزل $P\'$.',
                '$P$ and $P\'$ are on the same normal line and the same distance from the plane, one on each side. So the foot $M$ is the midpoint: $M=\\frac{P+P\'}{2}$, and $P\'$ follows.'
            ),
            math: same('$M=\\frac{P+P\'}{2}\\ \\to\\ P\'=2M-P$')
        }
    },
    'symmetric-line': {
        vocabulary: [
            say('erdiko puntua', 'punto medio', 'المنتصف', 'midpoint'),
            say('zuzenkia', 'segmento', 'القطعة', 'segment')
        ],
        explanation: say(
            'Zuzen batekiko simetrikoa planoarekikoa bezala aurkitzen da: lehenik $M$ proiekzioa, $P$ puntutik pasatzen den plano perpendikularrarekin. $M$ hori $PP\'$ zuzenkiaren erdiko puntua da, eta $P\'=2M-P$.',
            'El simétrico respecto de una recta se halla como el del plano: primero la proyección $M$, con el plano perpendicular que pasa por $P$. Ese $M$ es el punto medio del segmento $PP\'$, y $P\'=2M-P$.',
            'نجد النظيرة بالنسبة إلى مستقيم كما مع المستوى: أولًا المسقط $M$ بالمستوى العمودي المار بـ $P$. و$M$ هي منتصف القطعة $PP\'$، و$P\'=2M-P$.',
            'The symmetric in a line is found like the one in a plane: first the projection $M$, with the perpendicular plane through $P$. That $M$ is the midpoint of the segment $PP\'$, and $P\'=2M-P$.'
        ),
        examplePrompt: say('Aurkitu $P(0,3,3)$ puntuaren simetrikoa $x$ ardatzarekiko.', 'Halla el simétrico de $P(0,3,3)$ respecto del eje $x$.', 'أوجد نظيرة $P(0,3,3)$ بالنسبة إلى المحور $x$.', 'Find the symmetric of $P(0,3,3)$ with respect to the $x$ axis.'),
        example: same('$M=(0,0,0)\\qquad P\'=2M-P$'),
        exampleAnswer: same('$P\'=(0,-3,-3)$')
    },
    'mediator-plane': {
        definitions: [
            { term: say('Plano erdikaria', 'Plano mediador', 'المستوى المنصِّف', 'Mediator plane'), meaning: say('$A$ eta $B$ puntuetatik distantzia berera dauden puntuen planoa.', 'El plano de los puntos que están a la misma distancia de $A$ y de $B$.', 'مستوى النقاط التي تبعد البعد نفسه عن $A$ و$B$.', 'The plane of the points at the same distance from $A$ and $B$.') }
        ],
        vocabulary: [
            say('erdiko puntua', 'punto medio', 'المنتصف', 'midpoint'),
            say('normala', 'normal', 'الناظم', 'normal')
        ],
        explanation: say(
            '$AB$ zuzenkiaren plano erdikaria haren erdiko puntutik pasatzen da, eta $\\overrightarrow{AB}$ du normala. Haren puntu guztiak $A$ eta $B$ puntuetatik distantzia berera daude: simetriaren ispilua da.',
            'El plano mediador del segmento $AB$ pasa por su punto medio y tiene normal $\\overrightarrow{AB}$. Todos sus puntos están a la misma distancia de $A$ y de $B$: es el espejo de la simetría.',
            'المستوى المنصِّف للقطعة $AB$ يمر بمنتصفها وناظمه $\\overrightarrow{AB}$. وكل نقاطه تبعد البعد نفسه عن $A$ و$B$: إنه مرآة التناظر.',
            'The mediator plane of the segment $AB$ goes through its midpoint and has normal $\\overrightarrow{AB}$. All its points are the same distance from $A$ and $B$: it is the mirror of the symmetry.'
        ),
        examplePrompt: say('Aurkitu $A(0,0,0)$ eta $B(4,0,2)$ puntuen plano erdikaria.', 'Halla el plano mediador de $A(0,0,0)$ y $B(4,0,2)$.', 'أوجد المستوى المنصِّف لـ $A(0,0,0)$ و$B(4,0,2)$.', 'Find the mediator plane of $A(0,0,0)$ and $B(4,0,2)$.'),
        example: same('$M=(2,0,1)\\qquad 2x+{z}+D=0\\ \\to\\ D=-5$'),
        exampleAnswer: same('$2x+{z}-5=0$')
    },

    /* ---------- 4. Distance from a point ---------- */
    'point-plane': {
        vocabulary: [
            say('distantzia', 'distancia', 'المسافة', 'distance'),
            say('balio absolutua', 'valor absoluto', 'القيمة المطلقة', 'absolute value')
        ],
        explanation: say(
            '$P$ puntutik planorako distantzia $P$ eta $M$ oinaren artekoa da. Ez da oina kalkulatu behar: puntua ekuazioan ordezkatu, balio absolutua hartu eta normalaren moduluaz zatitu: $d=\\frac{|Ax_0+By_0+C{z}_0+D|}{\\sqrt{A^2+B^2+C^2}}$.',
            'La distancia de $P$ al plano es la de $P$ a su pie $M$. No hace falta hallar el pie: se sustituye el punto en la ecuación, se toma el valor absoluto y se divide entre el módulo del normal: $d=\\frac{|Ax_0+By_0+C{z}_0+D|}{\\sqrt{A^2+B^2+C^2}}$.',
            'المسافة من $P$ إلى المستوى هي المسافة من $P$ إلى مسقطها $M$. ولا حاجة لإيجاد المسقط: نعوّض النقطة في المعادلة ونأخذ القيمة المطلقة ونقسم على طول الناظم: $d=\\frac{|Ax_0+By_0+C{z}_0+D|}{\\sqrt{A^2+B^2+C^2}}$.',
            'The distance from $P$ to the plane is the distance from $P$ to its foot $M$. The foot is not needed: put the point into the equation, take the absolute value and divide by the magnitude of the normal: $d=\\frac{|Ax_0+By_0+C{z}_0+D|}{\\sqrt{A^2+B^2+C^2}}$.'
        ),
        examplePrompt: say('Zein da $P(1,0,2)$ puntutik $\\pi$: $3x+4{z}=1$ planorako distantzia?', '¿Cuál es la distancia de $P(1,0,2)$ a $\\pi$: $3x+4{z}=1$?', 'ما المسافة من $P(1,0,2)$ إلى $\\pi$: ‏$3x+4{z}=1$؟', 'What is the distance from $P(1,0,2)$ to $\\pi$: $3x+4{z}=1$?'),
        example: same('$\\frac{|3+8-1|}{\\sqrt{9+16}}=\\frac{10}{5}=2$'),
        exampleAnswer: same('$d=2$'),
        why: {
            text: say(
                '$\\overrightarrow{AP}$ bektorea normalean proiektatzen da, $A$ planoko puntu bat izanik: proiekzio horren luzera da distantzia. $\\vec{n}\\cdot\\overrightarrow{AP}$ garatzean ekuazioko zenbakia ateratzen da, eta $|\\vec{n}|$ zenbakiaz zatitzen da.',
                'Se proyecta $\\overrightarrow{AP}$ sobre el normal, con $A$ un punto del plano: la longitud de esa proyección es la distancia. Al desarrollar $\\vec{n}\\cdot\\overrightarrow{AP}$ sale el número de la ecuación, y se divide entre $|\\vec{n}|$.',
                'نُسقط $\\overrightarrow{AP}$ على الناظم، حيث $A$ نقطة من المستوى: طول هذا المسقط هو المسافة. وعند نشر $\\vec{n}\\cdot\\overrightarrow{AP}$ يخرج عدد المعادلة، ثم نقسم على $|\\vec{n}|$.',
                'Project $\\overrightarrow{AP}$ on the normal, with $A$ a point of the plane: the length of that projection is the distance. Expanding $\\vec{n}\\cdot\\overrightarrow{AP}$ gives the number of the equation, and you divide by $|\\vec{n}|$.'
            ),
            math: same('$d=\\frac{|\\vec{n}\\cdot\\overrightarrow{AP}|}{|\\vec{n}|}$')
        }
    },
    'parallel-planes': {
        vocabulary: [
            say('paraleloak', 'paralelos', 'متوازيين', 'parallel'),
            say('normal bera', 'mismo normal', 'الناظم نفسه', 'same normal')
        ],
        explanation: say(
            'Bi plano paraleloren distantzia batetik besterako edozein punturena da. Normal bera badute, $Ax+By+C{z}=d_1$ eta $Ax+By+C{z}=d_2$, distantzia $\\frac{|d_2-d_1|}{|\\vec{n}|}$ da. Zuzen bat planoaren paraleloa bada, haren puntu baten distantzia hartzen da.',
            'La distancia entre dos planos paralelos es la de cualquier punto de uno al otro. Si tienen el mismo normal, $Ax+By+C{z}=d_1$ y $Ax+By+C{z}=d_2$, la distancia es $\\frac{|d_2-d_1|}{|\\vec{n}|}$. Si una recta es paralela a un plano, se toma la distancia de uno de sus puntos.',
            'المسافة بين مستويين متوازيين هي مسافة أي نقطة من أحدهما إلى الآخر. وإذا كان لهما الناظم نفسه، $Ax+By+C{z}=d_1$ و$Ax+By+C{z}=d_2$، فالمسافة $\\frac{|d_2-d_1|}{|\\vec{n}|}$. وإذا كان مستقيم موازيًا لمستوى نأخذ مسافة إحدى نقاطه.',
            'The distance between two parallel planes is the distance from any point of one to the other. If they have the same normal, $Ax+By+C{z}=d_1$ and $Ax+By+C{z}=d_2$, the distance is $\\frac{|d_2-d_1|}{|\\vec{n}|}$. If a line is parallel to a plane, take the distance of one of its points.'
        ),
        examplePrompt: say('Zein da $r$: $(1,1,1)+t(1,-1,0)$ zuzenetik $\\pi$: $x+y+{z}=6$ planorako distantzia?', '¿Cuál es la distancia de $r$: $(1,1,1)+t(1,-1,0)$ a $\\pi$: $x+y+{z}=6$?', 'ما المسافة من $r$: ‏$(1,1,1)+t(1,-1,0)$ إلى $\\pi$: ‏$x+y+{z}=6$؟', 'What is the distance from $r$: $(1,1,1)+t(1,-1,0)$ to $\\pi$: $x+y+{z}=6$?'),
        example: same('$\\vec{u}\\cdot\\vec{n}=0\\qquad d=\\frac{|1+1+1-6|}{\\sqrt{3}}=\\frac{3}{\\sqrt{3}}$'),
        exampleAnswer: same('$d=\\sqrt{3}$')
    },
    'point-line': {
        vocabulary: [
            say('paralelogramoa', 'paralelogramo', 'متوازي الأضلاع', 'parallelogram'),
            say('altuera', 'altura', 'الارتفاع', 'height')
        ],
        explanation: say(
            '$\\overrightarrow{AP}$ eta $\\vec{u}$ bektoreek paralelogramo bat osatzen dute; haren azalera $|\\overrightarrow{AP}\\times\\vec{u}|$ da. Oinarria $|\\vec{u}|$ denez, altuera $P$ puntutik zuzenerako distantzia da: $d(P,r)=\\frac{|\\overrightarrow{AP}\\times\\vec{u}|}{|\\vec{u}|}$.',
            '$\\overrightarrow{AP}$ y $\\vec{u}$ forman un paralelogramo de área $|\\overrightarrow{AP}\\times\\vec{u}|$. Como la base mide $|\\vec{u}|$, la altura es la distancia de $P$ a la recta: $d(P,r)=\\frac{|\\overrightarrow{AP}\\times\\vec{u}|}{|\\vec{u}|}$.',
            '$\\overrightarrow{AP}$ و$\\vec{u}$ يكوّنان متوازي أضلاع مساحته $|\\overrightarrow{AP}\\times\\vec{u}|$. وبما أن القاعدة طولها $|\\vec{u}|$ فالارتفاع هو المسافة من $P$ إلى المستقيم: $d(P,r)=\\frac{|\\overrightarrow{AP}\\times\\vec{u}|}{|\\vec{u}|}$.',
            '$\\overrightarrow{AP}$ and $\\vec{u}$ make a parallelogram of area $|\\overrightarrow{AP}\\times\\vec{u}|$. As the base is $|\\vec{u}|$, the height is the distance from $P$ to the line: $d(P,r)=\\frac{|\\overrightarrow{AP}\\times\\vec{u}|}{|\\vec{u}|}$.'
        ),
        examplePrompt: say('Zein da $P(1,1,3)$ puntutik $r$: $(1,0,0)+t(0,1,1)$ zuzenerako distantzia?', '¿Cuál es la distancia de $P(1,1,3)$ a $r$: $(1,0,0)+t(0,1,1)$?', 'ما المسافة من $P(1,1,3)$ إلى $r$: ‏$(1,0,0)+t(0,1,1)$؟', 'What is the distance from $P(1,1,3)$ to $r$: $(1,0,0)+t(0,1,1)$?'),
        example: same('$(0,1,3)\\times(0,1,1)=(-2,0,0)\\qquad d=\\frac{2}{\\sqrt{2}}$'),
        exampleAnswer: same('$d=\\sqrt{2}$'),
        why: {
            text: say(
                'Paralelogramoaren azalera oinarria bider altuera da. Biderkadura bektorialaren moduluak azalera ematen du, eta oinarria norabidearen modulua da; beraz, altuera azalera zati oinarria da.',
                'El área de un paralelogramo es base por altura. El módulo del producto vectorial da el área, y la base es el módulo del director; así, la altura es el área entre la base.',
                'مساحة متوازي الأضلاع القاعدة في الارتفاع. وطول الجداء المتجهي يعطي المساحة، والقاعدة هي طول متجه التوجيه؛ لذا الارتفاع هو المساحة على القاعدة.',
                'The area of a parallelogram is base times height. The magnitude of the cross product gives the area, and the base is the magnitude of the direction; so the height is the area divided by the base.'
            ),
            math: same('$S=|\\vec{u}|\\cdot h\\ \\to\\ h=\\frac{S}{|\\vec{u}|}$')
        }
    },

    /* ---------- 5. Distance between lines ---------- */
    'parallel-lines': {
        vocabulary: [
            say('paraleloak', 'paralelas', 'متوازيان', 'parallel'),
            say('distantzia', 'distancia', 'المسافة', 'distance')
        ],
        explanation: say(
            'Bi zuzen paraleloren arteko distantzia beti berdina da: batetik besterako edozein punturena. $B$ puntu bat hartzen da $s$ zuzenean, eta haren distantzia $r$ zuzenera kalkulatzen da: $\\frac{|\\overrightarrow{AB}\\times\\vec{u}|}{|\\vec{u}|}$.',
            'La distancia entre dos rectas paralelas es siempre la misma: la de cualquier punto de una a la otra. Se toma un punto $B$ de $s$ y se calcula su distancia a $r$: $\\frac{|\\overrightarrow{AB}\\times\\vec{u}|}{|\\vec{u}|}$.',
            'المسافة بين مستقيمين متوازيين ثابتة: مسافة أي نقطة من أحدهما إلى الآخر. نأخذ نقطة $B$ من $s$ ونحسب مسافتها إلى $r$: $\\frac{|\\overrightarrow{AB}\\times\\vec{u}|}{|\\vec{u}|}$.',
            'The distance between two parallel lines is always the same: from any point of one to the other. Take a point $B$ of $s$ and work out its distance to $r$: $\\frac{|\\overrightarrow{AB}\\times\\vec{u}|}{|\\vec{u}|}$.'
        ),
        examplePrompt: say('$r$: $(1,1,0)+t(1,0,0)$ eta $s$: $(0,1,2)+\\lambda(-1,0,0)$. Zein da haien distantzia?', '$r$: $(1,1,0)+t(1,0,0)$ y $s$: $(0,1,2)+\\lambda(-1,0,0)$. ¿Cuál es su distancia?', '$r$: ‏$(1,1,0)+t(1,0,0)$ و$s$: ‏$(0,1,2)+\\lambda(-1,0,0)$. ما المسافة بينهما؟', '$r$: $(1,1,0)+t(1,0,0)$ and $s$: $(0,1,2)+\\lambda(-1,0,0)$. What is their distance?'),
        example: same('$(-1,0,2)\\times(1,0,0)=(0,2,0)\\qquad d=\\frac{2}{1}$'),
        exampleAnswer: same('$d=2$')
    },
    'skew-distance': {
        vocabulary: [
            say('bolumena', 'volumen', 'الحجم', 'volume'),
            say('oinarria', 'base', 'القاعدة', 'base')
        ],
        explanation: say(
            'Gurutzatzen diren zuzenetan, $\\overrightarrow{AB}$, $\\vec{u}$ eta $\\vec{v}$ bektoreek kutxa bat osatzen dute. Bolumena $|[\\overrightarrow{AB},\\vec{u},\\vec{v}]|$ da, eta oinarria $|\\vec{u}\\times\\vec{v}|$; altuera da distantzia: $d(r,s)=\\frac{|[\\overrightarrow{AB},\\vec{u},\\vec{v}]|}{|\\vec{u}\\times\\vec{v}|}$.',
            'En rectas que se cruzan, $\\overrightarrow{AB}$, $\\vec{u}$ y $\\vec{v}$ forman una caja. Su volumen es $|[\\overrightarrow{AB},\\vec{u},\\vec{v}]|$ y su base $|\\vec{u}\\times\\vec{v}|$; la altura es la distancia: $d(r,s)=\\frac{|[\\overrightarrow{AB},\\vec{u},\\vec{v}]|}{|\\vec{u}\\times\\vec{v}|}$.',
            'في المستقيمين المتخالفين يكوّن $\\overrightarrow{AB}$ و$\\vec{u}$ و$\\vec{v}$ صندوقًا. حجمه $|[\\overrightarrow{AB},\\vec{u},\\vec{v}]|$ وقاعدته $|\\vec{u}\\times\\vec{v}|$؛ والارتفاع هو المسافة: $d(r,s)=\\frac{|[\\overrightarrow{AB},\\vec{u},\\vec{v}]|}{|\\vec{u}\\times\\vec{v}|}$.',
            'For skew lines, $\\overrightarrow{AB}$, $\\vec{u}$ and $\\vec{v}$ make a box. Its volume is $|[\\overrightarrow{AB},\\vec{u},\\vec{v}]|$ and its base $|\\vec{u}\\times\\vec{v}|$; the height is the distance: $d(r,s)=\\frac{|[\\overrightarrow{AB},\\vec{u},\\vec{v}]|}{|\\vec{u}\\times\\vec{v}|}$.'
        ),
        examplePrompt: say('$r$: $(1,0,0)+t(0,1,1)$ eta $s$: $\\lambda(1,1,0)$. Zein da haien distantzia?', '$r$: $(1,0,0)+t(0,1,1)$ y $s$: $\\lambda(1,1,0)$. ¿Cuál es su distancia?', '$r$: ‏$(1,0,0)+t(0,1,1)$ و$s$: ‏$\\lambda(1,1,0)$. ما المسافة بينهما؟', '$r$: $(1,0,0)+t(0,1,1)$ and $s$: $\\lambda(1,1,0)$. What is their distance?'),
        example: same('$\\vec{u}\\times\\vec{v}=(-1,1,-1)\\qquad[\\overrightarrow{AB},\\vec{u},\\vec{v}]=1$'),
        exampleAnswer: same('$d=\\frac{1}{\\sqrt{3}}=\\frac{\\sqrt{3}}{3}$'),
        why: {
            text: say(
                'Kutxaren oinarria $\\vec{u}$ eta $\\vec{v}$ bektoreen paralelogramoa da, bi zuzenen paraleloa den plano batean. Altuera plano horrekiko perpendikularra da, eta zuzen batetik besterainoko bide laburrena da.',
                'La base de la caja es el paralelogramo de $\\vec{u}$ y $\\vec{v}$, en un plano paralelo a las dos rectas. La altura es perpendicular a ese plano, y es el camino más corto de una recta a la otra.',
                'قاعدة الصندوق متوازي أضلاع $\\vec{u}$ و$\\vec{v}$ في مستوى موازٍ للمستقيمين. والارتفاع عمودي على هذا المستوى، وهو أقصر طريق من مستقيم إلى الآخر.',
                'The base of the box is the parallelogram of $\\vec{u}$ and $\\vec{v}$, in a plane parallel to both lines. The height is perpendicular to that plane, and it is the shortest way from one line to the other.'
            ),
            math: same('$V=S\\cdot h\\ \\to\\ h=\\frac{V}{S}$')
        }
    },
    'common-perpendicular': {
        definitions: [
            { term: say('Perpendikular komuna', 'Perpendicular común', 'العمودي المشترك', 'Common perpendicular'), meaning: say('Gurutzatzen diren bi zuzenak ebakitzen dituen eta biekiko perpendikularra den zuzena.', 'La recta que corta a dos rectas que se cruzan y es perpendicular a las dos.', 'المستقيم الذي يقطع مستقيمين متخالفين ويعامدهما.', 'The line that meets two skew lines and is perpendicular to both.') }
        ],
        vocabulary: [
            say('puntu orokorra', 'punto genérico', 'نقطة عامة', 'general point'),
            say('hurbilenak', 'más cercanos', 'الأقرب', 'closest')
        ],
        explanation: say(
            'Zuzen bakoitzaren puntu orokor bat hartzen da, $P$ eta $Q$, bakoitza bere parametroarekin. $\\overrightarrow{PQ}$ bi norabideekiko perpendikularra izan behar da: bi ekuazio, bi ezezagun. $P$ eta $Q$ puntu hurbilenak dira, eta $|\\overrightarrow{PQ}|$ distantzia.',
            'Se toma un punto genérico de cada recta, $P$ y $Q$, cada uno con su parámetro. $\\overrightarrow{PQ}$ tiene que ser perpendicular a los dos directores: dos ecuaciones, dos incógnitas. $P$ y $Q$ son los puntos más cercanos, y $|\\overrightarrow{PQ}|$ la distancia.',
            'نأخذ نقطة عامة من كل مستقيم، $P$ و$Q$، لكل منهما وسيطه. يجب أن يكون $\\overrightarrow{PQ}$ عموديًا على الاتجاهين: معادلتان ومجهولان. $P$ و$Q$ هما النقطتان الأقرب، و$|\\overrightarrow{PQ}|$ المسافة.',
            'Take a general point of each line, $P$ and $Q$, each with its own parameter. $\\overrightarrow{PQ}$ has to be perpendicular to both directions: two equations, two unknowns. $P$ and $Q$ are the closest points, and $|\\overrightarrow{PQ}|$ is the distance.'
        ),
        examplePrompt: say('Aurkitu $r$: $(t,0,1)$ eta $s$: $(0,\\lambda,-2)$ zuzenen puntu hurbilenak.', 'Halla los puntos más cercanos de $r$: $(t,0,1)$ y $s$: $(0,\\lambda,-2)$.', 'أوجد أقرب نقطتين من $r$: ‏$(t,0,1)$ و$s$: ‏$(0,\\lambda,-2)$.', 'Find the closest points of $r$: $(t,0,1)$ and $s$: $(0,\\lambda,-2)$.'),
        example: same('$\\overrightarrow{PQ}=(-t,\\lambda,-3)\\qquad t=0,\\ \\lambda=0$'),
        exampleAnswer: same('$P(0,0,1)\\qquad Q(0,0,-2)$')
    }
}
