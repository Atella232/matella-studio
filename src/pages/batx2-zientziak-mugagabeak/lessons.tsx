import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { localizeNames, same, say } from '../batx1-zientziak-funtzioak/text'
import { ArcsComposedFigure, ChangeFigure, ChooseMethodFigure, ComplexRootsFigure, ComposedTableFigure, ConditionsFigure, DivisionFigure, DoubleRootFigure, ImmediateTableFigure, LogPartsFigure, PartsFigure, PartsTableFigure, RootsChangeFigure, SimpleRootsFigure, TrigPowersFigure } from './figures'
import { bach2IndefiniteLessonChecks, type Bach2IndefiniteTopicId } from './lessonChecks'
import { bach2IndefiniteLessonTexts } from './lessonTexts'

/* ==========================================================================
   Integral mugagabeak · Batxilergoa 2 · Zientziak — stages and lessons.
   The scope follows unit 11 of Santillana 2.º Bachillerato Ciencias (the
   class book) and unit 11 of Anaya Matemáticas II, in Santillana's order:
   a short review of what 1.º already has (basic and composite integrals,
   now also composite trigonometric functions and arcs), integration by
   parts, rational integrals, substitution, and choosing the method with
   problems that give conditions. The review links to the lessons of 1.º
   (Integralak) as «Review first»; the definite integral, Barrow's rule,
   areas and volumes are the next topic (Integral mugatua).
   ========================================================================== */

export type Bach2IndefiniteStageId = 'review' | 'parts' | 'rational' | 'substitution' | 'strategy'

export const bach2IndefiniteStages: UnitStage[] = [
    { id: 'review', tone: 'blue', title: { eu: 'Berehalakoak errepasatzen', es: 'Repaso de inmediatas', en: 'Reviewing basic integrals', ar: 'مراجعة التكاملات المباشرة' } },
    { id: 'parts', tone: 'violet', title: { eu: 'Zatikako integrazioa', es: 'Integración por partes', en: 'Integration by parts', ar: 'التكامل بالتجزئة' } },
    { id: 'rational', tone: 'mustard', title: { eu: 'Integral arrazionalak', es: 'Integrales racionales', en: 'Rational integrals', ar: 'التكاملات الكسرية' } },
    { id: 'substitution', tone: 'coral', title: { eu: 'Aldagai-aldaketa', es: 'Cambio de variable', en: 'Substitution', ar: 'تغيير المتغير' } },
    { id: 'strategy', tone: 'green', title: { eu: 'Metodoa eta baldintzak', es: 'Método y condiciones', en: 'Method and conditions', ar: 'الطريقة والشروط' } }
]

const INTEGRALS_1 = 'batx1-zientziak/integrales'
const DERIVATIVES_1 = 'batx1-zientziak/derivadas'
const EQUATIONS_1 = 'batx1-zientziak/ecuaciones-inecuaciones'
const TRIGONOMETRY_1 = 'batx1-zientziak/funciones-trigonometricas'
const POLYNOMIALS_4 = 'dbh4-akademikoak/polinomios-fracciones'

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Review: basic and composite integrals ---------- */
    {
        id: 'table',
        stage: 'review',
        title: say('Integral berehalakoen taula', 'La tabla de integrales inmediatas', 'جدول التكاملات المباشرة', 'The table of basic integrals'),
        goal: say('1. mailako taula gogoratzea, eta integralak baturak banatzen dituela eta konstanteak ateratzen dituela.', 'Recordar la tabla de 1.º y que la integral reparte las sumas y saca las constantes.', 'تذكّر جدول السنة الأولى، وأن التكامل يوزّع المجاميع ويُخرج الثوابت.', 'Remember the table from 1.º, and that the integral splits sums and takes constants out.'),
        needs: [
            { unit: INTEGRALS_1, topic: 'power-rule', title: { eu: 'Berredura baten integrala', es: 'Integral de una potencia', en: 'Integral of a power', ar: 'تكامل القوة' } },
            { unit: INTEGRALS_1, topic: 'exp-log', title: { eu: 'Esponentzialak eta logaritmoak', es: 'Exponenciales y logaritmos', en: 'Exponentials and logarithms', ar: 'الدوال الأسية واللوغاريتمية' } },
            { unit: INTEGRALS_1, topic: 'trig', title: { eu: 'Integral trigonometrikoak', es: 'Integrales trigonométricas', en: 'Trigonometric integrals', ar: 'التكاملات المثلثية' } }
        ],
        problem: say('Kalkulatu $\\int\\left(6x^2-\\frac{4}{x}+3e^x\\right)dx$.', 'Calcula $\\int\\left(6x^2-\\frac{4}{x}+3e^x\\right)dx$.', 'احسب $\\int\\left(6x^2-\\frac{4}{x}+3e^x\\right)dx$.', 'Work out $\\int\\left(6x^2-\\frac{4}{x}+3e^x\\right)dx$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Gai bakoitza bere aldetik; zenbakiak kanpora ateratzen dira.', 'Cada término por separado; los números salen fuera.', 'كل حد على حدة، وتخرج الأعداد.', 'Each term on its own; the numbers come out.'), math: same('$\\int 6x^2\\,dx=2x^3$') },
            { text: say('Zatikiak logaritmo bat ematen du.', 'La fracción da un logaritmo.', 'الكسر يعطي لوغاريتمًا.', 'The fraction gives a logarithm.'), math: same('$\\int\\frac{4}{x}\\,dx=4\\ln|x|$') },
            { text: say('Emaitza, konstante bakarrarekin.', 'El resultado, con una sola constante.', 'النتيجة بثابت واحد.', 'The result, with a single constant.'), math: same('$2x^3-4\\ln|x|+3e^x+k$') }
        ],
        takeaway: say('$\\int(f+g)\\,dx=\\int f\\,dx+\\int g\\,dx$ eta $\\int c\\cdot f\\,dx=c\\int f\\,dx$. 1. mailako taularekin (berreturak, $e^x$, $\\frac{1}{x}$, sinua, kosinua, arkuak) gaiz gai integratzen da.', '$\\int(f+g)\\,dx=\\int f\\,dx+\\int g\\,dx$ y $\\int c\\cdot f\\,dx=c\\int f\\,dx$. Con la tabla de 1.º (potencias, $e^x$, $\\frac{1}{x}$, seno, coseno, arcos) se integra término a término.', '$\\int(f+g)\\,dx=\\int f\\,dx+\\int g\\,dx$ و$\\int c\\cdot f\\,dx=c\\int f\\,dx$. وبجدول السنة الأولى (القوى، $e^x$، $\\frac{1}{x}$، الجيب، جيب التمام، دوال القوس) نكامل حدًّا حدًّا.', '$\\int(f+g)\\,dx=\\int f\\,dx+\\int g\\,dx$ and $\\int c\\cdot f\\,dx=c\\int f\\,dx$. With the table from 1.º (powers, $e^x$, $\\frac{1}{x}$, sine, cosine, arcs) you integrate term by term.'),
        figure: (language) => <ImmediateTableFigure language={language} />
    },
    {
        id: 'composed',
        stage: 'review',
        title: say('Integral konposatuak', 'Integrales compuestas', 'التكاملات المركّبة', 'Composite integrals'),
        goal: say('Kanpoan $u\'$ deribatua eta barruan $u$ funtzioa ezagutzea, eta $u$ aldagaia $x$ balitz bezala integratzea, sinuarekin eta kosinuarekin ere.', 'Reconocer fuera $u\'$ y dentro una función de $u$, e integrar como si $u$ fuera $x$, también con seno y coseno.', 'التعرف على $u\'$ في الخارج ودالة لـ $u$ في الداخل، والتكامل كأن $u$ هي $x$، ومع الجيب وجيب التمام أيضًا.', 'Recognise $u\'$ outside and a function of $u$ inside, and integrate as if $u$ were $x$, with sine and cosine too.'),
        needs: [
            { unit: INTEGRALS_1, topic: 'chain-power', title: { eu: 'Berredura konposatuak', es: 'Potencias compuestas', en: 'Composite powers', ar: 'القوى المركّبة' } },
            { unit: INTEGRALS_1, topic: 'chain-exp-log', title: { eu: 'Esponentzial eta logaritmo konposatuak', es: 'Exponencial y logaritmo compuestos', en: 'Composite exponentials and logarithms', ar: 'الأسية واللوغاريتم المركّبان' } },
            { unit: INTEGRALS_1, topic: 'adjust', title: { eu: 'Konstanteak doitzea', es: 'Ajustar constantes', en: 'Adjusting constants', ar: 'ضبط الثوابت' } }
        ],
        problem: say('Kalkulatu $\\int 6x^2\\cos(2x^3)\\,dx$.', 'Calcula $\\int 6x^2\\cos(2x^3)\\,dx$.', 'احسب $\\int 6x^2\\cos(2x^3)\\,dx$.', 'Work out $\\int 6x^2\\cos(2x^3)\\,dx$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Barruan $u=2x^3$ dago, eta kanpoan haren deribatua.', 'Dentro está $u=2x^3$ y fuera su derivada.', 'في الداخل $u=2x^3$ وفي الخارج مشتقتها.', 'Inside is $u=2x^3$, and its derivative is outside.'), math: same('$u\'=6x^2$') },
            { text: say('Kosinuaren taula da, $x$ aldagaiaren ordez $u$ duela.', 'Es la tabla del coseno con $u$ en lugar de $x$.', 'إنه جدول جيب التمام مع $u$ بدل $x$.', 'It is the cosine row of the table, with $u$ instead of $x$.'), math: same('$\\int u\'\\cos u\\,dx=\\sin u$') },
            { text: say('Emaitza.', 'El resultado.', 'النتيجة.', 'The result.'), math: same('$\\sin(2x^3)+k$') }
        ],
        takeaway: say('Integratzen dena $f(u)\\cdot u\'$ bada, integrala $F(u)+k$ da. Adibidez, $\\int u\'\\sin u\\,dx=-\\cos u+k$ eta $\\int\\frac{u\'}{\\cos^2 u}\\,dx=\\tan u+k$.', 'Si lo que se integra es $f(u)\\cdot u\'$, la integral es $F(u)+k$. Por ejemplo, $\\int u\'\\sin u\\,dx=-\\cos u+k$ y $\\int\\frac{u\'}{\\cos^2 u}\\,dx=\\tan u+k$.', 'إذا كان ما نكامله $f(u)\\cdot u\'$ فالتكامل $F(u)+k$. مثلًا $\\int u\'\\sin u\\,dx=-\\cos u+k$ و$\\int\\frac{u\'}{\\cos^2 u}\\,dx=\\tan u+k$.', 'If what you integrate is $f(u)\\cdot u\'$, the integral is $F(u)+k$. For example, $\\int u\'\\sin u\\,dx=-\\cos u+k$ and $\\int\\frac{u\'}{\\cos^2 u}\\,dx=\\tan u+k$.'),
        figure: (language) => <ComposedTableFigure language={language} />
    },
    {
        id: 'composed-arcs',
        stage: 'review',
        title: say('Arku tangente eta arku sinu konposatuak', 'Arcotangente y arcoseno compuestos', 'قوس الظل وقوس الجيب المركّبان', 'Composite arctangent and arcsine'),
        goal: say('$\\frac{1}{a^2+x^2}$ eta $\\frac{1}{\\sqrt{a^2-x^2}}$ adierazpenak $\\frac{u\'}{1+u^2}$ eta $\\frac{u\'}{\\sqrt{1-u^2}}$ formara eramatea, $a^2$ faktore komun gisa ateraz.', 'Llevar $\\frac{1}{a^2+x^2}$ y $\\frac{1}{\\sqrt{a^2-x^2}}$ a la forma $\\frac{u\'}{1+u^2}$ y $\\frac{u\'}{\\sqrt{1-u^2}}$ sacando factor común $a^2$.', 'تحويل $\\frac{1}{a^2+x^2}$ و$\\frac{1}{\\sqrt{a^2-x^2}}$ إلى الشكل $\\frac{u\'}{1+u^2}$ و$\\frac{u\'}{\\sqrt{1-u^2}}$ بإخراج $a^2$ عاملًا مشتركًا.', 'Turn $\\frac{1}{a^2+x^2}$ and $\\frac{1}{\\sqrt{a^2-x^2}}$ into the form $\\frac{u\'}{1+u^2}$ and $\\frac{u\'}{\\sqrt{1-u^2}}$ by taking $a^2$ out as a common factor.'),
        needs: [
            { unit: INTEGRALS_1, topic: 'arcs', title: { eu: 'Arku tangentea eta arku sinua', es: 'Arcotangente y arcoseno', en: 'Arctangent and arcsine', ar: 'قوس الظل وقوس الجيب' } }
        ],
        problem: say('Kalkulatu $\\int\\frac{dx}{9+x^2}$.', 'Calcula $\\int\\frac{dx}{9+x^2}$.', 'احسب $\\int\\frac{dx}{9+x^2}$.', 'Work out $\\int\\frac{dx}{9+x^2}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Atera 9 faktore komun gisa, $1+u^2$ izateko.', 'Saca factor común 9 para tener $1+u^2$.', 'أخرج 9 عاملًا مشتركًا لتحصل على $1+u^2$.', 'Take 9 out as a common factor to get $1+u^2$.'), math: same('$\\frac{1}{9+x^2}=\\frac{1}{9}\\cdot\\frac{1}{1+\\left(\\frac{x}{3}\\right)^2}$') },
            { text: say('$u=\\frac{x}{3}$ bada, $u\'=\\frac{1}{3}$: biderkatu barruan $\\frac{1}{3}$ zenbakiaz eta kanpoan 3 zenbakiaz.', 'Con $u=\\frac{x}{3}$ es $u\'=\\frac{1}{3}$: multiplica dentro por $\\frac{1}{3}$ y fuera por 3.', 'مع $u=\\frac{x}{3}$ يكون $u\'=\\frac{1}{3}$: اضرب في $\\frac{1}{3}$ في الداخل وفي 3 في الخارج.', 'With $u=\\frac{x}{3}$, $u\'=\\frac{1}{3}$: multiply by $\\frac{1}{3}$ inside and by 3 outside.'), math: same('$\\frac{3}{9}\\int\\frac{u\'}{1+u^2}\\,dx$') },
            { text: say('Emaitza.', 'El resultado.', 'النتيجة.', 'The result.'), math: same('$\\frac{1}{3}\\arctan\\frac{x}{3}+k$') }
        ],
        takeaway: say('$\\int\\frac{u\'}{1+u^2}\\,dx=\\arctan u+k$ eta $\\int\\frac{u\'}{\\sqrt{1-u^2}}\\,dx=\\arcsin u+k$. 1 zenbakiaren ordez $a^2$ badago: $\\int\\frac{dx}{a^2+x^2}=\\frac{1}{a}\\arctan\\frac{x}{a}+k$.', '$\\int\\frac{u\'}{1+u^2}\\,dx=\\arctan u+k$ y $\\int\\frac{u\'}{\\sqrt{1-u^2}}\\,dx=\\arcsin u+k$. Con $a^2$ en lugar de 1: $\\int\\frac{dx}{a^2+x^2}=\\frac{1}{a}\\arctan\\frac{x}{a}+k$.', '$\\int\\frac{u\'}{1+u^2}\\,dx=\\arctan u+k$ و$\\int\\frac{u\'}{\\sqrt{1-u^2}}\\,dx=\\arcsin u+k$. ومع $a^2$ بدل 1: $\\int\\frac{dx}{a^2+x^2}=\\frac{1}{a}\\arctan\\frac{x}{a}+k$.', '$\\int\\frac{u\'}{1+u^2}\\,dx=\\arctan u+k$ and $\\int\\frac{u\'}{\\sqrt{1-u^2}}\\,dx=\\arcsin u+k$. With $a^2$ instead of 1: $\\int\\frac{dx}{a^2+x^2}=\\frac{1}{a}\\arctan\\frac{x}{a}+k$.'),
        figure: (language) => <ArcsComposedFigure language={language} />
    },

    /* ---------- 2. Integration by parts ---------- */
    {
        id: 'by-parts',
        stage: 'parts',
        title: say('Zatikako integrazioaren formula', 'La fórmula de partes', 'صيغة التكامل بالتجزئة', 'The by-parts formula'),
        goal: say('Biderkadura bat $\\int u\\,dv=uv-\\int v\\,du$ formularekin integratzea, deribatzean sinplifikatzen den faktorea $u$ gisa hartuta.', 'Integrar un producto con $\\int u\\,dv=uv-\\int v\\,du$, eligiendo como $u$ el factor que se simplifica al derivar.', 'تكامل جداء بالصيغة $\\int u\\,dv=uv-\\int v\\,du$، باختيار العامل الذي يبسط عند الاشتقاق ليكون $u$.', 'Integrate a product with $\\int u\\,dv=uv-\\int v\\,du$, choosing as $u$ the factor that gets simpler when differentiated.'),
        needs: [
            { unit: DERIVATIVES_1, topic: 'product', title: { eu: 'Biderkaduraren deribatua', es: 'Derivada del producto', en: 'The product rule', ar: 'مشتقة الجداء' } }
        ],
        problem: say('Kalkulatu $\\int xe^x\\,dx$.', 'Calcula $\\int xe^x\\,dx$.', 'احسب $\\int xe^x\\,dx$.', 'Work out $\\int xe^x\\,dx$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Aukeratu $u=x$, deribatzean sinplifikatzen delako, eta $dv=e^x\\,dx$.', 'Elige $u=x$, que se simplifica al derivar, y $dv=e^x\\,dx$.', 'اختر $u=x$ لأنها تبسط عند الاشتقاق، و$dv=e^x\\,dx$.', 'Choose $u=x$, which gets simpler when differentiated, and $dv=e^x\\,dx$.'), math: same('$\\begin{aligned}&u=x\\qquad du=dx\\\\ &dv=e^x\\,dx\\qquad v=e^x\\end{aligned}$') },
            { text: say('Aplikatu formula.', 'Aplica la fórmula.', 'طبّق الصيغة.', 'Apply the formula.'), math: same('$\\int xe^x\\,dx=xe^x-\\int e^x\\,dx$') },
            { text: say('Integral berria berehalakoa da.', 'La integral nueva es inmediata.', 'التكامل الجديد مباشر.', 'The new integral is a basic one.'), math: same('$xe^x-e^x+k=e^x(x-1)+k$') }
        ],
        takeaway: say('$\\int u\\,dv=uv-\\int v\\,du$. $u$ gisa deribatzean sinplifikatzen dena hartzen da (polinomio bat, logaritmo bat), eta $dv$ gisa integratzen dakiguna ($e^x$, sinua, kosinua).', '$\\int u\\,dv=uv-\\int v\\,du$. Como $u$ se toma lo que se simplifica al derivar (un polinomio, un logaritmo) y como $dv$ lo que se sabe integrar ($e^x$, seno, coseno).', '$\\int u\\,dv=uv-\\int v\\,du$. نأخذ $u$ ما يبسط بالاشتقاق (كثير حدود أو لوغاريتم)، و$dv$ ما نعرف تكامله ($e^x$ أو الجيب أو جيب التمام).', '$\\int u\\,dv=uv-\\int v\\,du$. As $u$ take what gets simpler when differentiated (a polynomial, a logarithm), and as $dv$ what you know how to integrate ($e^x$, sine, cosine).'),
        figure: (language) => <PartsFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'parts-twice',
        stage: 'parts',
        title: say('Bi aldiz zatika eta integral ziklikoak', 'Partes dos veces y cíclicas', 'التجزئة مرتين والتكاملات الدورية', 'Twice by parts and cyclic integrals'),
        goal: say('Zatikako integrazioa errepikatzea polinomioa 2. mailakoa denean, eta $I$ askatzea integrala berriro agertzen denean.', 'Repetir partes cuando el polinomio es de grado 2, y despejar $I$ cuando la integral vuelve a aparecer.', 'تكرار التجزئة عندما يكون كثير الحدود من الدرجة 2، وإيجاد $I$ عندما يعود التكامل للظهور.', 'Repeat parts when the polynomial has degree 2, and solve for $I$ when the integral comes back.'),
        problem: say('Kalkulatu $\\int x^2e^x\\,dx$.', 'Calcula $\\int x^2e^x\\,dx$.', 'احسب $\\int x^2e^x\\,dx$.', 'Work out $\\int x^2e^x\\,dx$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$u=x^2$ eta $dv=e^x\\,dx$.', '$u=x^2$ y $dv=e^x\\,dx$.', '$u=x^2$ و$dv=e^x\\,dx$.', '$u=x^2$ and $dv=e^x\\,dx$.'), math: same('$\\int x^2e^x\\,dx=x^2e^x-\\int 2xe^x\\,dx$') },
            { text: say('Berriro zatika, $u=2x$ hartuta.', 'Otra vez por partes, con $u=2x$.', 'بالتجزئة مرة أخرى مع $u=2x$.', 'By parts again, with $u=2x$.'), math: same('$\\int 2xe^x\\,dx=2xe^x-2e^x$') },
            { text: say('Elkartu dena.', 'Junta todo.', 'اجمع كل شيء.', 'Put it all together.'), math: same('$e^x(x^2-2x+2)+k$') }
        ],
        takeaway: say('Zatika aplikatzen den bakoitzean polinomioaren maila bat jaisten da. Hasierako integrala berriro agertzen bada, $I$ deitzen zaio eta ekuazio batean bezala askatzen da. Bi aldietan faktore mota bera hartzen da $u$ gisa.', 'Cada vez que se aplica partes, el grado del polinomio baja uno. Si vuelve a salir la integral de partida, se llama $I$ y se despeja como en una ecuación. Las dos veces se toma como $u$ el mismo tipo de factor.', 'في كل مرة نطبّق فيها التجزئة تنزل درجة كثير الحدود واحدًا. وإذا عاد التكامل الأصلي نسمّيه $I$ ونجده كما في معادلة. ونأخذ $u$ من النوع نفسه في المرتين.', 'Each time you apply parts, the degree of the polynomial goes down by one. If the starting integral comes back, call it $I$ and solve for it as in an equation. Both times take the same kind of factor as $u$.'),
        figure: (language) => <PartsTableFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'log-arcs',
        stage: 'parts',
        title: say('Logaritmoak eta arkuak zatika', 'Logaritmos y arcos por partes', 'اللوغاريتمات ودوال القوس بالتجزئة', 'Logarithms and arcs by parts'),
        goal: say('$\\ln x$, $\\arctan x$ edo $\\ln(ax+b)$ zatika integratzea $dv=dx$ hartuta: beste faktorea 1 da.', 'Integrar $\\ln x$, $\\arctan x$ o $\\ln(ax+b)$ por partes con $dv=dx$: el otro factor es 1.', 'تكامل $\\ln x$ أو $\\arctan x$ أو $\\ln(ax+b)$ بالتجزئة مع $dv=dx$: العامل الآخر هو 1.', 'Integrate $\\ln x$, $\\arctan x$ or $\\ln(ax+b)$ by parts with $dv=dx$: the other factor is 1.'),
        problem: say('Kalkulatu $\\int\\ln x\\,dx$.', 'Calcula $\\int\\ln x\\,dx$.', 'احسب $\\int\\ln x\\,dx$.', 'Work out $\\int\\ln x\\,dx$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ez da biderkadurarik ikusten: beste faktorea 1 da.', 'No se ve ningún producto: el otro factor es 1.', 'لا يظهر جداء: العامل الآخر هو 1.', 'No product is visible: the other factor is 1.'), math: same('$\\begin{aligned}&u=\\ln x\\qquad du=\\frac{1}{x}\\,dx\\\\ &dv=dx\\qquad v=x\\end{aligned}$') },
            { text: say('Aplikatu formula.', 'Aplica la fórmula.', 'طبّق الصيغة.', 'Apply the formula.'), math: same('$x\\ln x-\\int x\\cdot\\frac{1}{x}\\,dx$') },
            { text: say('$\\int 1\\,dx$ geratzen da.', 'Queda $\\int 1\\,dx$.', 'يبقى $\\int 1\\,dx$.', 'What is left is $\\int 1\\,dx$.'), math: same('$x\\ln x-x+k$') }
        ],
        takeaway: say('Logaritmoa eta arkuak ez daude taulan, baina haien deribatuak bai: $u$ gisa hartzen dira, $dv=dx$ dela. Horrela, $\\int\\ln x\\,dx=x\\ln x-x+k$.', 'El logaritmo y los arcos no están en la tabla, pero sus derivadas sí: se toman como $u$, con $dv=dx$. Así, $\\int\\ln x\\,dx=x\\ln x-x+k$.', 'اللوغاريتم ودوال القوس ليست في الجدول لكن مشتقاتها فيه: نأخذها $u$ مع $dv=dx$. وهكذا $\\int\\ln x\\,dx=x\\ln x-x+k$.', 'The logarithm and the arcs are not in the table, but their derivatives are: take them as $u$, with $dv=dx$. So $\\int\\ln x\\,dx=x\\ln x-x+k$.'),
        figure: (language) => <LogPartsFigure language={language} />
    },

    /* ---------- 3. Rational integrals ---------- */
    {
        id: 'division',
        stage: 'rational',
        title: say('Lehenik, zatiketa', 'Primero, la división', 'القسمة أولًا', 'First, divide'),
        goal: say('Zenbakitzailearen maila izendatzailearena bezainbestekoa edo handiagoa bada, zatitzea: $\\frac{P}{Q}=C+\\frac{R}{Q}$, eta gero zati bakoitza integratzea.', 'Si el grado del numerador es mayor o igual que el del denominador, dividir: $\\frac{P}{Q}=C+\\frac{R}{Q}$, y después integrar cada parte.', 'إذا كانت درجة البسط أكبر من درجة المقام أو تساويها فاقسم: $\\frac{P}{Q}=C+\\frac{R}{Q}$، ثم كامل كل جزء.', 'If the degree of the numerator is at least that of the denominator, divide: $\\frac{P}{Q}=C+\\frac{R}{Q}$, then integrate each part.'),
        needs: [
            { unit: POLYNOMIALS_4, topic: 'long-division', title: { eu: 'Polinomioen zatiketa', es: 'División de polinomios', en: 'Polynomial division', ar: 'قسمة الحدوديات' } }
        ],
        problem: say('Kalkulatu $\\int\\frac{x^2+3}{x-1}\\,dx$.', 'Calcula $\\int\\frac{x^2+3}{x-1}\\,dx$.', 'احسب $\\int\\frac{x^2+3}{x-1}\\,dx$.', 'Work out $\\int\\frac{x^2+3}{x-1}\\,dx$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatitu: 2. maila 1. mailaz.', 'Divide: grado 2 entre grado 1.', 'اقسم: الدرجة 2 على الدرجة 1.', 'Divide: degree 2 by degree 1.'), math: same('$x^2+3=(x-1)(x+1)+4$') },
            { text: say('Idatzi zatidura gehi hondarra zati zatitzailea.', 'Escribe cociente más resto entre divisor.', 'اكتب خارج القسمة زائد الباقي على المقسوم عليه.', 'Write quotient plus remainder over divisor.'), math: same('$\\frac{x^2+3}{x-1}=x+1+\\frac{4}{x-1}$') },
            { text: say('Integratu gai bakoitza: $\\frac{4}{x-1}$ zatikia $\\frac{A}{x-a}$ formakoa da.', 'Integra cada término: $\\frac{4}{x-1}$ es de la forma $\\frac{A}{x-a}$.', 'كامل كل حد: $\\frac{4}{x-1}$ من الشكل $\\frac{A}{x-a}$.', 'Integrate each term: $\\frac{4}{x-1}$ has the form $\\frac{A}{x-a}$.'), math: same('$\\frac{x^2}{2}+x+4\\ln|x-1|+k$') }
        ],
        takeaway: say('$P$ zenbakitzailearen maila $Q$ izendatzailearena bezainbestekoa edo handiagoa bada, zatitu egiten da: $\\frac{P}{Q}=C+\\frac{R}{Q}$. $C$ zatidura polinomio bat da, eta $\\frac{A}{x-a}$ zatikiak $A\\ln|x-a|$ ematen du.', 'Si el grado de $P$ es mayor o igual que el de $Q$, se divide: $\\frac{P}{Q}=C+\\frac{R}{Q}$. El cociente $C$ es un polinomio, y $\\frac{A}{x-a}$ da $A\\ln|x-a|$.', 'إذا كانت درجة $P$ أكبر من درجة $Q$ أو تساويها نقسم: $\\frac{P}{Q}=C+\\frac{R}{Q}$. خارج القسمة $C$ كثير حدود، و$\\frac{A}{x-a}$ يعطي $A\\ln|x-a|$.', 'If the degree of $P$ is at least that of $Q$, divide: $\\frac{P}{Q}=C+\\frac{R}{Q}$. The quotient $C$ is a polynomial, and $\\frac{A}{x-a}$ gives $A\\ln|x-a|$.'),
        figure: (language) => <DivisionFigure language={language} />
    },
    {
        id: 'simple-roots',
        stage: 'rational',
        title: say('Erro erreal bakunak', 'Raíces reales simples', 'جذور حقيقية بسيطة', 'Simple real roots'),
        goal: say('Izendatzaileak erro erreal desberdinak baditu, zatiki sinpleetan banatzea, $\\frac{A}{x-a}+\\frac{B}{x-b}$, eta $A$ eta $B$ aurkitzea.', 'Si el denominador tiene raíces reales distintas, descomponer en fracciones simples $\\frac{A}{x-a}+\\frac{B}{x-b}$ y hallar $A$ y $B$.', 'إذا كان للمقام جذور حقيقية مختلفة، نفكك إلى كسور بسيطة $\\frac{A}{x-a}+\\frac{B}{x-b}$ ونجد $A$ و$B$.', 'If the denominator has different real roots, split into partial fractions $\\frac{A}{x-a}+\\frac{B}{x-b}$ and find $A$ and $B$.'),
        needs: [
            { unit: EQUATIONS_1, topic: 'factorize-high', title: { eu: 'Maila handiko polinomioak faktorizatzea', es: 'Factorizar polinomios de grado alto', en: 'Factorising higher-degree polynomials', ar: 'تحليل حدوديات الدرجات العليا' } }
        ],
        problem: say('Kalkulatu $\\int\\frac{x+5}{x^2+x-2}\\,dx$.', 'Calcula $\\int\\frac{x+5}{x^2+x-2}\\,dx$.', 'احسب $\\int\\frac{x+5}{x^2+x-2}\\,dx$.', 'Work out $\\int\\frac{x+5}{x^2+x-2}\\,dx$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izendatzailearen erroak: 1 eta $-2$.', 'Raíces del denominador: 1 y $-2$.', 'جذرا المقام: 1 و$-2$.', 'Roots of the denominator: 1 and $-2$.'), math: same('$x^2+x-2=(x-1)(x+2)$') },
            { text: say('Zatiki bat erro bakoitzeko.', 'Una fracción por cada raíz.', 'كسر لكل جذر.', 'One fraction for each root.'), math: same('$\\frac{x+5}{x^2+x-2}=\\frac{A}{x-1}+\\frac{B}{x+2}$') },
            { text: say('Kendu izendatzaileak, eta eman $x$ aldagaiari erro bakoitzaren balioa.', 'Quita denominadores y da a $x$ el valor de cada raíz.', 'احذف المقامات وأعطِ $x$ قيمة كل جذر.', 'Clear the denominators and give $x$ the value of each root.'), math: same('$\\begin{aligned}&x+5=A(x+2)+B(x-1)\\\\ &x=1\\ \\to\\ A=2\\\\ &x=-2\\ \\to\\ B=-1\\end{aligned}$') },
            { text: say('Zatiki bakoitzak logaritmo bat ematen du.', 'Cada fracción da un logaritmo.', 'كل كسر يعطي لوغاريتمًا.', 'Each fraction gives a logarithm.'), math: same('$2\\ln|x-1|-\\ln|x+2|+k$') }
        ],
        takeaway: say('$a$ eta $b$ erro erreal bakunak badira: $\\frac{R}{Q}=\\frac{A}{x-a}+\\frac{B}{x-b}$, eta integrala $A\\ln|x-a|+B\\ln|x-b|+k$ da. $A$ eta $B$ ateratzeko, $x$ aldagaiari erro bakoitzaren balioa ematen zaio.', 'Con raíces reales simples $a$ y $b$: $\\frac{R}{Q}=\\frac{A}{x-a}+\\frac{B}{x-b}$, y la integral es $A\\ln|x-a|+B\\ln|x-b|+k$. $A$ y $B$ salen dando a $x$ el valor de cada raíz.', 'مع جذرين حقيقيين بسيطين $a$ و$b$: $\\frac{R}{Q}=\\frac{A}{x-a}+\\frac{B}{x-b}$، والتكامل $A\\ln|x-a|+B\\ln|x-b|+k$. ونجد $A$ و$B$ بإعطاء $x$ قيمة كل جذر.', 'With simple real roots $a$ and $b$: $\\frac{R}{Q}=\\frac{A}{x-a}+\\frac{B}{x-b}$, and the integral is $A\\ln|x-a|+B\\ln|x-b|+k$. You get $A$ and $B$ by giving $x$ the value of each root.'),
        figure: (language) => <SimpleRootsFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'double-roots',
        stage: 'rational',
        title: say('Erro anizkoitzak', 'Raíces múltiples', 'الجذور المتكررة', 'Repeated roots'),
        goal: say('$a$ erroa bikoitza bada, bi zatiki jartzea, $\\frac{A}{x-a}+\\frac{B}{(x-a)^2}$; bigarrena berretura gisa integratzen da.', 'Si una raíz $a$ es doble, poner dos fracciones, $\\frac{A}{x-a}+\\frac{B}{(x-a)^2}$; la segunda se integra como una potencia.', 'إذا كان الجذر $a$ مضاعفًا نضع كسرين، $\\frac{A}{x-a}+\\frac{B}{(x-a)^2}$، ونكامل الثاني كقوة.', 'If a root $a$ is double, write two fractions, $\\frac{A}{x-a}+\\frac{B}{(x-a)^2}$; the second one is integrated as a power.'),
        problem: say('Kalkulatu $\\int\\frac{2x+1}{(x-1)^2}\\,dx$.', 'Calcula $\\int\\frac{2x+1}{(x-1)^2}\\,dx$.', 'احسب $\\int\\frac{2x+1}{(x-1)^2}\\,dx$.', 'Work out $\\int\\frac{2x+1}{(x-1)^2}\\,dx$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x=1$ erro bikoitza da: bi zatiki.', 'Raíz doble $x=1$: dos fracciones.', 'الجذر المضاعف $x=1$: كسران.', 'Double root $x=1$: two fractions.'), math: same('$\\frac{2x+1}{(x-1)^2}=\\frac{A}{x-1}+\\frac{B}{(x-1)^2}$') },
            { text: say('Kendu izendatzaileak: $2x+1=A(x-1)+B$.', 'Quita denominadores: $2x+1=A(x-1)+B$.', 'احذف المقامات: $2x+1=A(x-1)+B$.', 'Clear the denominators: $2x+1=A(x-1)+B$.'), math: same('$\\begin{aligned}&x=1\\ \\to\\ B=3\\\\ &x=0\\ \\to\\ A=2\\end{aligned}$') },
            { text: say('Bigarrena berretura bat da: $\\int(x-1)^{-2}\\,dx=-\\frac{1}{x-1}$.', 'La segunda es una potencia: $\\int(x-1)^{-2}\\,dx=-\\frac{1}{x-1}$.', 'الثاني قوة: $\\int(x-1)^{-2}\\,dx=-\\frac{1}{x-1}$.', 'The second one is a power: $\\int(x-1)^{-2}\\,dx=-\\frac{1}{x-1}$.'), math: same('$2\\ln|x-1|-\\frac{3}{x-1}+k$') }
        ],
        takeaway: say('$a$ erro bikoitzak $\\frac{A}{x-a}+\\frac{B}{(x-a)^2}$ eskatzen du, eta hirukoitz batek hiru zatiki. $\\int\\frac{B}{(x-a)^2}\\,dx=-\\frac{B}{x-a}+k$: ez da logaritmo bat.', 'Una raíz doble $a$ pide $\\frac{A}{x-a}+\\frac{B}{(x-a)^2}$, y una triple, tres fracciones. $\\int\\frac{B}{(x-a)^2}\\,dx=-\\frac{B}{x-a}+k$: no es un logaritmo.', 'الجذر المضاعف $a$ يتطلب $\\frac{A}{x-a}+\\frac{B}{(x-a)^2}$، والثلاثي ثلاثة كسور. و$\\int\\frac{B}{(x-a)^2}\\,dx=-\\frac{B}{x-a}+k$: ليس لوغاريتمًا.', 'A double root $a$ needs $\\frac{A}{x-a}+\\frac{B}{(x-a)^2}$, and a triple one, three fractions. $\\int\\frac{B}{(x-a)^2}\\,dx=-\\frac{B}{x-a}+k$: it is not a logarithm.'),
        figure: (language) => <DoubleRootFigure language={language} />
    },
    {
        id: 'no-roots',
        stage: 'rational',
        title: say('Erro errealik gabeko izendatzailea', 'Denominador sin raíces reales', 'مقام بلا جذور حقيقية', 'A denominator with no real roots'),
        goal: say('Izendatzailea erro errealik gabeko 2. mailakoa bada, logaritmo bat ($\\frac{u\'}{u}$) eta arku tangente bat bereiztea, karratua osatuz.', 'Si el denominador es de grado 2 sin raíces reales, separar un logaritmo ($\\frac{u\'}{u}$) y una arcotangente completando el cuadrado.', 'إذا كان المقام من الدرجة 2 بلا جذور حقيقية، نفصل لوغاريتمًا ($\\frac{u\'}{u}$) وقوس ظل بإكمال المربع.', 'If the denominator has degree 2 and no real roots, separate a logarithm ($\\frac{u\'}{u}$) and an arctangent by completing the square.'),
        needs: [
            { unit: INTEGRALS_1, topic: 'arcs', title: { eu: 'Arku tangentea eta arku sinua', es: 'Arcotangente y arcoseno', en: 'Arctangent and arcsine', ar: 'قوس الظل وقوس الجيب' } }
        ],
        problem: say('Kalkulatu $\\int\\frac{2x+5}{x^2+2x+5}\\,dx$.', 'Calcula $\\int\\frac{2x+5}{x^2+2x+5}\\,dx$.', 'احسب $\\int\\frac{2x+5}{x^2+2x+5}\\,dx$.', 'Work out $\\int\\frac{2x+5}{x^2+2x+5}\\,dx$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ez du erro errealik. Bilatu goian behekoaren deribatua, $2x+2$.', 'No tiene raíces reales. Busca arriba la derivada de abajo, $2x+2$.', 'لا جذور حقيقية له. ابحث في الأعلى عن مشتقة الأسفل $2x+2$.', 'It has no real roots. Look for the derivative of the bottom, $2x+2$, on top.'), math: same('$\\begin{aligned}&\\frac{2x+5}{x^2+2x+5}\\\\ &=\\frac{2x+2}{x^2+2x+5}+\\frac{3}{x^2+2x+5}\\end{aligned}$') },
            { text: say('Lehenengoa $\\frac{u\'}{u}$ da: logaritmo bat.', 'La primera es $\\frac{u\'}{u}$: un logaritmo.', 'الأول $\\frac{u\'}{u}$: لوغاريتم.', 'The first one is $\\frac{u\'}{u}$: a logarithm.'), math: same('$\\begin{aligned}&\\int\\frac{2x+2}{x^2+2x+5}\\,dx\\\\ &=\\ln(x^2+2x+5)\\end{aligned}$') },
            { text: say('Bigarrenean, osatu karratua.', 'En la segunda, completa el cuadrado.', 'في الثاني أكمل المربع.', 'In the second one, complete the square.'), math: same('$\\begin{aligned}&x^2+2x+5=(x+1)^2+4\\\\ &\\int\\frac{3\\,dx}{(x+1)^2+4}\\\\ &=\\frac{3}{2}\\arctan\\frac{x+1}{2}\\end{aligned}$') },
            { text: say('Elkartu biak.', 'Junta las dos.', 'اجمع الاثنين.', 'Put the two together.'), math: same('$\\begin{aligned}&\\ln(x^2+2x+5)\\\\ &+\\frac{3}{2}\\arctan\\frac{x+1}{2}+k\\end{aligned}$') }
        ],
        takeaway: say('$Q$ izendatzaileak erro errealik ez badu, zenbakitzailea ($Q$ funtzioaren deribatua) gehi zenbaki bat gisa idazten da. Lehen zatiak $\\ln Q$ ematen du, eta bigarrenak, karratua osatuta, arku tangente bat.', 'Si $Q$ no tiene raíces reales, el numerador se escribe como (derivada de $Q$) más un número. La primera parte da $\\ln Q$ y la segunda, completando el cuadrado, una arcotangente.', 'إذا لم تكن لـ $Q$ جذور حقيقية نكتب البسط على صورة (مشتقة $Q$) زائد عدد. الجزء الأول يعطي $\\ln Q$، والثاني بإكمال المربع يعطي قوس ظل.', 'If $Q$ has no real roots, write the numerator as (derivative of $Q$) plus a number. The first part gives $\\ln Q$ and the second, completing the square, an arctangent.'),
        figure: (language) => <ComplexRootsFigure language={language} />
    },

    /* ---------- 4. Substitution ---------- */
    {
        id: 'change',
        stage: 'substitution',
        title: say('Aldaketaren metodoa', 'El método del cambio', 'طريقة تغيير المتغير', 'The substitution method'),
        goal: say('Integratzen denaren zati bat $t$ letraz ordezkatzea, $dx$ ere aldatzea eta amaieran aldaketa desegitea.', 'Cambiar una parte del integrando por $t$, cambiar también $dx$ y deshacer el cambio al final.', 'تعويض جزء مما نكامله بـ $t$، وتغيير $dx$ أيضًا، ثم التراجع عن التعويض في النهاية.', 'Replace part of what you integrate with $t$, change $dx$ too, and undo the change at the end.'),
        needs: [
            { unit: DERIVATIVES_1, topic: 'chain', title: { eu: 'Katearen erregela', es: 'La regla de la cadena', en: 'The chain rule', ar: 'قاعدة السلسلة' } }
        ],
        problem: say('Kalkulatu $\\int\\frac{(\\ln x)^3}{x}\\,dx$.', 'Calcula $\\int\\frac{(\\ln x)^3}{x}\\,dx$.', 'احسب $\\int\\frac{(\\ln x)^3}{x}\\,dx$.', 'Work out $\\int\\frac{(\\ln x)^3}{x}\\,dx$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Aukeratu $t$: bere deribatuarekin batera agertzen dena.', 'Elige $t$: lo que aparece junto a su derivada.', 'اختر $t$: ما يظهر مع مشتقته.', 'Choose $t$: what appears together with its derivative.'), math: same('$t=\\ln x\\qquad dt=\\frac{1}{x}\\,dx$') },
            { text: say('Dena $t$ letraz, $dx$ ere bai.', 'Todo en $t$, también $dx$.', 'كل شيء بـ $t$ وكذلك $dx$.', 'Everything in $t$, $dx$ too.'), math: same('$\\int t^3\\,dt=\\frac{t^4}{4}$') },
            { text: say('Desegin aldaketa.', 'Deshaz el cambio.', 'تراجع عن التعويض.', 'Undo the change.'), math: same('$\\frac{(\\ln x)^4}{4}+k$') }
        ],
        takeaway: say('Hiru urrats: $t=g(x)$ aukeratu eta $dt=g\'(x)\\,dx$ kalkulatu; integral osoa $t$ letraz idatzi, $x$ bat ere gabe; integratu eta $x$ aldagaira itzuli. Integral konposatuak buruz egindako aldaketak dira.', 'Tres pasos: elegir $t=g(x)$ y calcular $dt=g\'(x)\\,dx$; escribir toda la integral en $t$, sin ninguna $x$; integrar y volver a $x$. Las integrales compuestas son cambios hechos de cabeza.', 'ثلاث خطوات: اختر $t=g(x)$ واحسب $dt=g\'(x)\\,dx$؛ اكتب التكامل كله بـ $t$ دون أي $x$؛ كامل وعُد إلى $x$. والتكاملات المركّبة تعويضات نجريها ذهنيًّا.', 'Three steps: choose $t=g(x)$ and work out $dt=g\'(x)\\,dx$; write the whole integral in $t$, with no $x$ left; integrate and go back to $x$. Composite integrals are substitutions done in your head.'),
        figure: (language) => <ChangeFigure language={language} />
    },
    {
        id: 'roots-exp',
        stage: 'substitution',
        title: say('Erroak eta esponentzialak', 'Raíces y exponenciales', 'الجذور والدوال الأسية', 'Roots and exponentials'),
        goal: say('Erro bat $t=\\sqrt{x}$ aldaketarekin kentzea (edo $t^2=x+a$), eta esponentzial bat $t=e^x$ aldaketarekin: integrala arrazional bihurtzen da.', 'Quitar una raíz con $t=\\sqrt{x}$ (o $t^2=x+a$) y una exponencial con $t=e^x$: la integral se vuelve racional.', 'إزالة جذر بالتعويض $t=\\sqrt{x}$ (أو $t^2=x+a$) وإزالة دالة أسية بـ $t=e^x$: يصبح التكامل كسريًّا.', 'Remove a root with $t=\\sqrt{x}$ (or $t^2=x+a$) and an exponential with $t=e^x$: the integral becomes rational.'),
        problem: say('Kalkulatu $\\int\\frac{dx}{1+\\sqrt{x}}$.', 'Calcula $\\int\\frac{dx}{1+\\sqrt{x}}$.', 'احسب $\\int\\frac{dx}{1+\\sqrt{x}}$.', 'Work out $\\int\\frac{dx}{1+\\sqrt{x}}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kendu erroa.', 'Quita la raíz.', 'أزل الجذر.', 'Remove the root.'), math: same('$t=\\sqrt{x}\\qquad x=t^2\\qquad dx=2t\\,dt$') },
            { text: say('Arrazional bat geratzen da: zatitu.', 'Queda una racional: divide.', 'يبقى تكامل كسري: اقسم.', 'A rational one is left: divide.'), math: same('$\\int\\frac{2t}{1+t}\\,dt=\\int\\left(2-\\frac{2}{1+t}\\right)dt$') },
            { text: say('Integratu eta desegin aldaketa.', 'Integra y deshaz el cambio.', 'كامل وتراجع عن التعويض.', 'Integrate and undo the change.'), math: same('$\\begin{aligned}&2t-2\\ln(1+t)\\\\ &=2\\sqrt{x}-2\\ln(1+\\sqrt{x})+k\\end{aligned}$') }
        ],
        takeaway: say('$x+a$ adierazpenaren erro bat $t^2=x+a$ aldaketak kentzen du; baturetan $e^x$ badago, $t=e^x$ aldaketak, $dx=\\frac{dt}{t}$ dela. Bi kasuetan integral arrazional bat geratzen da.', 'Una raíz de $x+a$ la quita el cambio $t^2=x+a$; con $e^x$ en sumas, el cambio $t=e^x$, con $dx=\\frac{dt}{t}$. En los dos casos queda una integral racional.', 'جذر $x+a$ يزيله التعويض $t^2=x+a$؛ ومع $e^x$ في مجاميع التعويض $t=e^x$ مع $dx=\\frac{dt}{t}$. وفي الحالتين يبقى تكامل كسري.', 'A root of $x+a$ is removed by the change $t^2=x+a$; with $e^x$ in sums, by the change $t=e^x$, with $dx=\\frac{dt}{t}$. In both cases a rational integral is left.'),
        figure: (language) => <RootsChangeFigure language={language} />
    },
    {
        id: 'trig-powers',
        stage: 'substitution',
        title: say('Sinuaren eta kosinuaren berreturak', 'Potencias de seno y coseno', 'قوى الجيب وجيب التمام', 'Powers of sine and cosine'),
        goal: say('$\\sin^n x$ eta $\\cos^n x$ integratzea: berretzaile bakoitiarekin, $t=\\cos x$ edo $t=\\sin x$ aldaketa; bikoitiarekin, angelu bikoitza.', 'Integrar $\\sin^n x$ y $\\cos^n x$: con exponente impar, un cambio $t=\\cos x$ o $t=\\sin x$; con exponente par, el ángulo doble.', 'تكامل $\\sin^n x$ و$\\cos^n x$: مع أس فردي تعويض $t=\\cos x$ أو $t=\\sin x$؛ ومع أس زوجي ضعف الزاوية.', 'Integrate $\\sin^n x$ and $\\cos^n x$: with an odd exponent, a change $t=\\cos x$ or $t=\\sin x$; with an even exponent, the double angle.'),
        needs: [
            { unit: TRIGONOMETRY_1, topic: 'double-angle', title: { eu: 'Angelu bikoitza', es: 'El ángulo doble', en: 'The double angle', ar: 'ضعف الزاوية' } }
        ],
        problem: say('Kalkulatu $\\int\\sin^3 x\\,dx$.', 'Calcula $\\int\\sin^3 x\\,dx$.', 'احسب $\\int\\sin^3 x\\,dx$.', 'Work out $\\int\\sin^3 x\\,dx$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Berretzaile bakoitia: bereizi $\\sin x$ bat, eta erabili $\\sin^2 x=1-\\cos^2 x$.', 'Exponente impar: separa un $\\sin x$ y usa $\\sin^2 x=1-\\cos^2 x$.', 'أس فردي: افصل $\\sin x$ واستعمل $\\sin^2 x=1-\\cos^2 x$.', 'Odd exponent: take one $\\sin x$ apart and use $\\sin^2 x=1-\\cos^2 x$.'), math: same('$\\int(1-\\cos^2 x)\\sin x\\,dx$') },
            { text: say('$t=\\cos x$ aldaketa, $dt=-\\sin x\\,dx$ dela.', 'Cambio $t=\\cos x$, con $dt=-\\sin x\\,dx$.', 'التعويض $t=\\cos x$ مع $dt=-\\sin x\\,dx$.', 'The change $t=\\cos x$, with $dt=-\\sin x\\,dx$.'), math: same('$-\\int(1-t^2)\\,dt=-t+\\frac{t^3}{3}$') },
            { text: say('Desegin aldaketa.', 'Deshaz el cambio.', 'تراجع عن التعويض.', 'Undo the change.'), math: same('$-\\cos x+\\frac{\\cos^3 x}{3}+k$') }
        ],
        takeaway: say('Berretzaile bakoitia: faktore bat bereizi eta gainerakoa bestera eraman $\\sin^2 x+\\cos^2 x=1$ erabiliz; gero $t=\\cos x$ edo $t=\\sin x$. Bikoitia: $\\sin^2 x=\\frac{1-\\cos 2x}{2}$ eta $\\cos^2 x=\\frac{1+\\cos 2x}{2}$.', 'Exponente impar: se separa un factor y el resto se pasa al otro con $\\sin^2 x+\\cos^2 x=1$; luego $t=\\cos x$ o $t=\\sin x$. Par: $\\sin^2 x=\\frac{1-\\cos 2x}{2}$ y $\\cos^2 x=\\frac{1+\\cos 2x}{2}$.', 'أس فردي: نفصل عاملًا ونحوّل الباقي إلى الآخر بـ $\\sin^2 x+\\cos^2 x=1$، ثم $t=\\cos x$ أو $t=\\sin x$. أس زوجي: $\\sin^2 x=\\frac{1-\\cos 2x}{2}$ و$\\cos^2 x=\\frac{1+\\cos 2x}{2}$.', 'Odd exponent: take one factor apart and turn the rest into the other with $\\sin^2 x+\\cos^2 x=1$; then $t=\\cos x$ or $t=\\sin x$. Even: $\\sin^2 x=\\frac{1-\\cos 2x}{2}$ and $\\cos^2 x=\\frac{1+\\cos 2x}{2}$.'),
        figure: (language) => <TrigPowersFigure language={language} />
    },

    /* ---------- 5. Method and conditions ---------- */
    {
        id: 'choose',
        stage: 'strategy',
        title: say('Zein metodo aukeratu', 'Qué método elegir', 'أيّ طريقة نختار', 'Which method to choose'),
        goal: say('Kalkulatu aurretik erabakitzea integral bat berehalakoa, konposatua, zatikakoa, arrazionala edo aldagai-aldaketakoa den.', 'Decidir, antes de calcular, si una integral es inmediata, compuesta, por partes, racional o de cambio de variable.', 'أن نقرر قبل الحساب هل التكامل مباشر أو مركّب أو بالتجزئة أو كسري أو بتغيير المتغير.', 'Decide, before working it out, whether an integral is basic, composite, by parts, rational or a substitution.'),
        problem: say('Zein metodo balio du bakoitzarentzat? $\\int xe^{x^2}\\,dx$, $\\int xe^x\\,dx$ eta $\\int\\frac{dx}{x^2-4}$.', '¿Qué método sirve para cada una? $\\int xe^{x^2}\\,dx$, $\\int xe^x\\,dx$ y $\\int\\frac{dx}{x^2-4}$.', 'أيّ طريقة تصلح لكل منها؟ $\\int xe^{x^2}\\,dx$ و$\\int xe^x\\,dx$ و$\\int\\frac{dx}{x^2-4}$.', 'Which method works for each one? $\\int xe^{x^2}\\,dx$, $\\int xe^x\\,dx$ and $\\int\\frac{dx}{x^2-4}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehenengoan kanpoan dago $x^2$ adierazpenaren deribatua (2 bat falta da): konposatua.', 'En la primera, fuera está la derivada de $x^2$ (falta un 2): compuesta.', 'في الأول توجد مشتقة $x^2$ في الخارج (ينقص 2): مركّب.', 'In the first one, the derivative of $x^2$ is outside (a 2 is missing): composite.'), math: same('$\\int xe^{x^2}\\,dx=\\frac{1}{2}e^{x^2}+k$') },
            { text: say('Bigarrena polinomio bat bider esponentzial bat da, barrukoaren deribaturik gabe: zatika, $u=x$ hartuta.', 'La segunda es un polinomio por una exponencial, sin la derivada de dentro: por partes, con $u=x$.', 'الثاني كثير حدود في دالة أسية دون مشتقة الداخل: بالتجزئة مع $u=x$.', 'The second one is a polynomial times an exponential, without the derivative of the inside: by parts, with $u=x$.'), math: same('$\\int xe^x\\,dx=e^x(x-1)+k$') },
            { text: say('Hirugarrena polinomioen zatidura bat da, 2 eta $-2$ erroekin: arrazionala.', 'La tercera es un cociente de polinomios con raíces 2 y $-2$: racional.', 'الثالث خارج قسمة كثيرَي حدود بجذرين 2 و$-2$: كسري.', 'The third one is a quotient of polynomials with roots 2 and $-2$: rational.'), math: same('$\\int\\frac{dx}{x^2-4}=\\frac{1}{4}\\ln\\left|\\frac{x-2}{x+2}\\right|+k$') }
        ],
        takeaway: say('Galdetu ordenan: taulan dago? Kanpoan dago barrukoaren deribatua? (konposatua edo aldaketa). Polinomio bat bider $e^x$, sinua, kosinua edo logaritmoa da? (zatika). Polinomioen zatidura da? (arrazionala).', 'Pregunta en orden: ¿está en la tabla? ¿Está fuera la derivada de lo de dentro? (compuesta o cambio). ¿Es un polinomio por $e^x$, seno, coseno o logaritmo? (partes). ¿Es un cociente de polinomios? (racional).', 'اسأل بالترتيب: هل هو في الجدول؟ هل مشتقة الداخل في الخارج؟ (مركّب أو تعويض). هل هو كثير حدود في $e^x$ أو جيب أو جيب تمام أو لوغاريتم؟ (بالتجزئة). هل هو خارج قسمة كثيرَي حدود؟ (كسري).', 'Ask in order: is it in the table? Is the derivative of the inside outside? (composite or substitution). Is it a polynomial times $e^x$, sine, cosine or a logarithm? (by parts). Is it a quotient of polynomials? (rational).'),
        figure: (language) => <ChooseMethodFigure language={language} />
    },
    {
        id: 'conditions',
        stage: 'strategy',
        title: say('Baldintzak dituzten jatorrizkoak', 'Primitivas con condiciones', 'دوال أصلية بشروط', 'Antiderivatives with conditions'),
        goal: say('Funtzio zehatza aurkitzea haren bigarren deribatua eta bi datu ematen direnean, edo deribatua eta puntu bat: integratze bakoitzak konstante bat dakar.', 'Hallar la función exacta cuando se dan su derivada segunda y dos datos, o su derivada y un punto: cada integración trae una constante.', 'إيجاد الدالة بالضبط عندما تُعطى مشتقتها الثانية ومعلومتان، أو مشتقتها ونقطة: كل تكامل يجلب ثابتًا.', 'Find the exact function when you are given its second derivative and two facts, or its derivative and a point: each integration brings a constant.'),
        needs: [
            { unit: INTEGRALS_1, topic: 'through-point', title: { eu: 'Puntu batetik pasatzen den jatorrizkoa', es: 'Primitiva que pasa por un punto', en: 'An antiderivative through a point', ar: 'دالة أصلية تمر بنقطة' } }
        ],
        problem: say('Aurkitu $f$, $f\'\'(x)=6x-2$ bada, $x=1$ puntuko malda 3 bada eta grafikoak $(1,\\,5)$ puntutik pasatzen badu.', 'Halla $f$ si $f\'\'(x)=6x-2$, la pendiente en $x=1$ es 3 y la gráfica pasa por $(1,\\,5)$.', 'أوجد $f$ إذا كان $f\'\'(x)=6x-2$ والميل عند $x=1$ يساوي 3 والمنحنى يمر بالنقطة $(1,\\,5)$.', 'Find $f$ if $f\'\'(x)=6x-2$, the slope at $x=1$ is 3 and the graph goes through $(1,\\,5)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Integratu behin: $k_1$ agertzen da.', 'Integra una vez: aparece $k_1$.', 'كامل مرة: يظهر $k_1$.', 'Integrate once: $k_1$ appears.'), math: same('$f\'(x)=3x^2-2x+k_1$') },
            { text: say('Maldak $k_1$ finkatzen du.', 'La pendiente fija $k_1$.', 'الميل يحدد $k_1$.', 'The slope fixes $k_1$.'), math: same('$f\'(1)=1+k_1=3\\ \\to\\ k_1=2$') },
            { text: say('Integratu berriro, eta erabili puntua.', 'Integra otra vez y usa el punto.', 'كامل مرة أخرى واستعمل النقطة.', 'Integrate again and use the point.'), math: same('$\\begin{aligned}&f(x)=x^3-x^2+2x+k_2\\\\ &f(1)=2+k_2=5\\ \\to\\ k_2=3\\end{aligned}$') }
        ],
        takeaway: say('Integratze bakoitzak konstante bat gehitzen du: $f\'\'$ emanda, bi datu behar dira, bat $k_1$ konstanterako (malda bat) eta beste bat $k_2$ konstanterako (puntu bat). Emaitza funtzio bakarra da: $f(x)=x^3-x^2+2x+3$.', 'Cada integración añade una constante: con $f\'\'$ hacen falta dos datos, uno para $k_1$ (una pendiente) y otro para $k_2$ (un punto). La respuesta es una sola función: $f(x)=x^3-x^2+2x+3$.', 'كل تكامل يضيف ثابتًا: مع $f\'\'$ تلزم معلومتان، واحدة لـ $k_1$ (ميل) وأخرى لـ $k_2$ (نقطة). والجواب دالة واحدة: $f(x)=x^3-x^2+2x+3$.', 'Each integration adds a constant: with $f\'\'$ you need two facts, one for $k_1$ (a slope) and one for $k_2$ (a point). The answer is a single function: $f(x)=x^3-x^2+2x+3$.'),
        figure: (language) => <ConditionsFigure language={language} />,
        figureAfterSteps: true
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts), in each language's trigonometric names */
export const bach2IndefiniteTopics: UnitTopic[] = baseTopics.map((topic) => ({
    ...topic,
    ...localizeNames(bach2IndefiniteLessonTexts[topic.id as Bach2IndefiniteTopicId]),
    ...localizeNames(bach2IndefiniteLessonChecks[topic.id as Bach2IndefiniteTopicId])
}))
