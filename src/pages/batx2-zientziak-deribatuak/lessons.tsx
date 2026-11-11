import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { localizeNames, same, say } from '../batx1-zientziak-funtzioak/text'
import { AbsoluteFigure, CoefficientsFigure, CornerJoinFigure, ExteriorPointFigure, HigherOrderFigure, ImplicitFigure, InverseFigure, LayersFigure, LogarithmicFigure, ParametersFigure, ReviewTangentFigure, RulesFigure, TableFigure, TangentCurvesFigure } from './figures'
import { bach2DerivativesLessonChecks, type Bach2DerivativesTopicId } from './lessonChecks'
import { bach2DerivativesLessonTexts } from './lessonTexts'

/* ==========================================================================
   Deribatuak · Batxilergoa 2 · Zientziak — stages and lessons. The scope
   follows unit 8 of Santillana 2.º Bachillerato Ciencias (derivability
   with pieces and parameters, the table with the arc functions, tangents
   with conditions) with unit 8 of Anaya Matemáticas II (successive and
   nth derivatives, the derivative of the inverse, implicit and
   logarithmic differentiation). What 1.º Bachillerato already taught
   (the derivative at a point, the tangent and the rules) is one short
   review stage linked to its lessons; the differential is left out, and
   monotony, extremes and optimisation are «Aplicaciones de la derivada»
   (owner, 2026-11-10).
   ========================================================================== */

export type Bach2DerivativesStageId = 'review' | 'derivability' | 'chain' | 'special' | 'tangents'

export const bach2DerivativesStages: UnitStage[] = [
    { id: 'review', tone: 'blue', title: { eu: 'Batxilergoko 1. mailako errepasoa', es: 'Repaso de 1.º de Bachillerato', en: 'Review of 1st Bachillerato', ar: 'مراجعة السنة الأولى من البكالوريا' } },
    { id: 'derivability', tone: 'violet', title: { eu: 'Deribagarritasuna', es: 'Derivabilidad', en: 'Differentiability', ar: 'قابلية الاشتقاق' } },
    { id: 'chain', tone: 'mustard', title: { eu: 'Katearen erregela sakonago', es: 'La regla de la cadena a fondo', en: 'The chain rule in depth', ar: 'قاعدة السلسلة بعمق' } },
    { id: 'special', tone: 'coral', title: { eu: 'Deribatu bereziak', es: 'Derivadas especiales', en: 'Special derivatives', ar: 'مشتقات خاصة' } },
    { id: 'tangents', tone: 'green', title: { eu: 'Zuzen ukitzaileen problemak', es: 'Problemas de tangentes', en: 'Tangent problems', ar: 'مسائل المماسات' } }
]

const DERIVATIVES1 = 'batx1-zientziak/derivadas'
const FUNCTIONS1 = 'batx1-zientziak/funciones'

const TANGENT1 = { unit: DERIVATIVES1, topic: 'tangent', title: { eu: 'Zuzen ukitzailea eta zuzen normala', es: 'Recta tangente y recta normal', en: 'Tangent and normal lines', ar: 'المماس والمستقيم العمودي' } }
const CHAIN1 = { unit: DERIVATIVES1, topic: 'chain', title: { eu: 'Katearen erregela', es: 'La regla de la cadena', en: 'The chain rule', ar: 'قاعدة السلسلة' } }
const EXP_LOG1 = { unit: DERIVATIVES1, topic: 'exp-log', title: { eu: 'Esponentzialak eta logaritmoak', es: 'Exponenciales y logaritmos', en: 'Exponentials and logarithms', ar: 'الدوال الأسية واللوغاريتمية' } }
const PIECEWISE1 = { unit: DERIVATIVES1, topic: 'piecewise-derivable', title: { eu: 'Zatika definitutako funtzio deribagarriak', es: 'Funciones a trozos derivables', en: 'Differentiable piecewise functions', ar: 'دوال معرّفة على أجزاء قابلة للاشتقاق' } }
const CONDITIONS1 = { unit: DERIVATIVES1, topic: 'tangent-conditions', title: { eu: 'Baldintzak dituzten zuzen ukitzaileak', es: 'Tangentes con condiciones', en: 'Tangents with conditions', ar: 'مماسات بشروط' } }

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Review of 1.º ---------- */
    {
        id: 'review-tangent',
        stage: 'review',
        title: say('Deribatua eta zuzen ukitzailea: errepasoa', 'Derivada y recta tangente: repaso', 'المشتقة والمماس: مراجعة', 'Derivative and tangent line: review'),
        goal: say('1. mailan ikasitakoa gogoratzea: $f\'(a)$ zuzen ukitzailearen malda da, eta harekin zuzen ukitzailea eta normala idazten dira.', 'Recordar lo de 1.º: $f\'(a)$ es la pendiente de la tangente, y con ella se escriben la tangente y la normal.', 'تذكّر ما دُرس في السنة الأولى: $f\'(a)$ ميل المماس، وبه نكتب المماس والمستقيم العمودي.', 'Recall the first year: $f\'(a)$ is the slope of the tangent, and with it you write the tangent and the normal.'),
        needs: [
            { unit: DERIVATIVES1, topic: 'derivative-point', title: { eu: 'Deribatua puntu batean', es: 'Derivada en un punto', en: 'The derivative at a point', ar: 'المشتقة عند نقطة' } },
            TANGENT1
        ],
        problem: say('Idatzi $f(x)=x^3-2x$ funtzioaren zuzen ukitzailea eta normala $x=1$ puntuan.', 'Escribe la recta tangente y la normal a $f(x)=x^3-2x$ en $x=1$.', 'اكتب المماس والمستقيم العمودي للدالة $f(x)=x^3-2x$ عند $x=1$.', 'Write the tangent and the normal to $f(x)=x^3-2x$ at $x=1$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Puntua eta malda.', 'El punto y la pendiente.', 'النقطة والميل.', 'The point and the slope.'), math: same('$\\begin{gathered}f(1)=1-2=-1\\\\ f\'(x)=3x^2-2\\\\ f\'(1)=1\\end{gathered}$') },
            { text: say('Zuzen ukitzailea.', 'La tangente.', 'المماس.', 'The tangent.'), math: same('$y+1=x-1\\ \\to\\ y=x-2$') },
            { text: say('Normalaren malda $-1$ da.', 'La normal tiene pendiente $-1$.', 'ميل العمودي $-1$.', 'The normal has slope $-1$.'), math: same('$y+1=-(x-1)\\ \\to\\ y=-x$') }
        ],
        takeaway: say('$f\'(a)$ zuzen ukitzailearen malda da: $y-f(a)=f\'(a)(x-a)$. Normala perpendikularra da puntu berean, eta haren malda $-\\frac{1}{f\'(a)}$ da.', '$f\'(a)$ es la pendiente de la tangente: $y-f(a)=f\'(a)(x-a)$. La normal es perpendicular en el mismo punto, con pendiente $-\\frac{1}{f\'(a)}$.', '$f\'(a)$ ميل المماس: $y-f(a)=f\'(a)(x-a)$. والعمودي متعامد معه في النقطة نفسها، وميله $-\\frac{1}{f\'(a)}$.', '$f\'(a)$ is the slope of the tangent: $y-f(a)=f\'(a)(x-a)$. The normal is perpendicular at the same point, with slope $-\\frac{1}{f\'(a)}$.'),
        figure: (language) => <ReviewTangentFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'review-rules',
        stage: 'review',
        title: say('Deribazio-erregelak: errepasoa', 'Reglas de derivación: repaso', 'قواعد الاشتقاق: مراجعة', 'Rules of differentiation: review'),
        goal: say('Biderkaduraren, zatiduraren eta katearen erregelak gogoratzea, eta funtzio bakoitzean zein erabili ikustea.', 'Recordar las reglas del producto, del cociente y de la cadena, y ver cuál toca en cada función.', 'تذكّر قواعد الجداء وخارج القسمة والسلسلة، ومعرفة أيها يناسب كل دالة.', 'Recall the product, quotient and chain rules, and see which one each function needs.'),
        needs: [
            { unit: DERIVATIVES1, topic: 'product', title: { eu: 'Biderkaduraren deribatua', es: 'Derivada del producto', en: 'The product rule', ar: 'مشتقة الجداء' } },
            { unit: DERIVATIVES1, topic: 'quotient', title: { eu: 'Zatiduraren deribatua', es: 'Derivada del cociente', en: 'The quotient rule', ar: 'مشتقة خارج القسمة' } },
            CHAIN1
        ],
        problem: say('Deribatu $f(x)=x^2\\,e^{3x}$.', 'Deriva $f(x)=x^2\\,e^{3x}$.', 'اشتق $f(x)=x^2\\,e^{3x}$.', 'Differentiate $f(x)=x^2\\,e^{3x}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkadura bat da: $u=x^2$ eta $v=e^{3x}$.', 'Es un producto: $u=x^2$ y $v=e^{3x}$.', 'إنه جداء: $u=x^2$ و$v=e^{3x}$.', 'It is a product: $u=x^2$ and $v=e^{3x}$.'), math: same('$u\'=2x\\qquad v\'=3e^{3x}$') },
            { text: say('Biderkaduraren erregela.', 'La regla del producto.', 'قاعدة الجداء.', 'The product rule.'), math: same('$f\'(x)=2x\\,e^{3x}+3x^2\\,e^{3x}$') },
            { text: say('Atera faktore komuna.', 'Saca factor común.', 'أخرج العامل المشترك.', 'Take out the common factor.'), math: same('$f\'(x)=x\\,e^{3x}(2+3x)$') }
        ],
        takeaway: say('Biderkadura: $(uv)\'=u\'v+uv\'$. Zatidura: $\\left(\\frac{u}{v}\\right)\'=\\frac{u\'v-uv\'}{v^2}$. Katea: $(f(g(x)))\'=f\'(g(x))\\cdot g\'(x)$.', 'Producto: $(uv)\'=u\'v+uv\'$. Cociente: $\\left(\\frac{u}{v}\\right)\'=\\frac{u\'v-uv\'}{v^2}$. Cadena: $(f(g(x)))\'=f\'(g(x))\\cdot g\'(x)$.', 'الجداء: $(uv)\'=u\'v+uv\'$. خارج القسمة: $\\left(\\frac{u}{v}\\right)\'=\\frac{u\'v-uv\'}{v^2}$. السلسلة: $(f(g(x)))\'=f\'(g(x))\\cdot g\'(x)$.', 'Product: $(uv)\'=u\'v+uv\'$. Quotient: $\\left(\\frac{u}{v}\\right)\'=\\frac{u\'v-uv\'}{v^2}$. Chain: $(f(g(x)))\'=f\'(g(x))\\cdot g\'(x)$.'),
        figure: (language) => <RulesFigure language={language} />
    },

    /* ---------- 2. Differentiability ---------- */
    {
        id: 'corners',
        stage: 'derivability',
        title: say('Deribagarria bada, jarraitua da', 'Derivable implica continua', 'قابلية الاشتقاق تقتضي الاتصال', 'Differentiable implies continuous'),
        goal: say('Lotune batean deribagarritasuna aztertzea: lehenik jarraitutasuna eta gero alboko deribatuak, jarraitua izatea nahikoa ez dela jakinda.', 'Estudiar la derivabilidad en una unión: primero la continuidad y después las derivadas laterales, sabiendo que ser continua no basta.', 'دراسة قابلية الاشتقاق عند نقطة الالتقاء: الاتصال أولًا ثم المشتقتان الجانبيتان، مع العلم أن الاتصال وحده لا يكفي.', 'Study differentiability at a joint: first continuity and then the one-sided derivatives, knowing that being continuous is not enough.'),
        needs: [
            { unit: DERIVATIVES1, topic: 'one-sided-derivatives', title: { eu: 'Alboko deribatuak eta puntak', es: 'Derivadas laterales y picos', en: 'One-sided derivatives and corners', ar: 'المشتقتان الجانبيتان والزوايا' } },
            { unit: DERIVATIVES1, topic: 'derivable-continuous', title: { eu: 'Deribagarritasuna eta jarraitutasuna', es: 'Derivabilidad y continuidad', en: 'Differentiability and continuity', ar: 'الاشتقاق والاتصال' } }
        ],
        problem: say('Deribagarria al da funtzio hau $x=1$ puntuan? $f(x)=\\begin{cases}x^2 & x<1\\\\ 3x-2 & x\\ge 1\\end{cases}$', '¿Es derivable en $x=1$ esta función? $f(x)=\\begin{cases}x^2 & x<1\\\\ 3x-2 & x\\ge 1\\end{cases}$', 'هل هذه الدالة قابلة للاشتقاق عند $x=1$؟ $f(x)=\\begin{cases}x^2 & x<1\\\\ 3x-2 & x\\ge 1\\end{cases}$', 'Is this function differentiable at $x=1$? $f(x)=\\begin{cases}x^2 & x<1\\\\ 3x-2 & x\\ge 1\\end{cases}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Jarraitutasuna: bi zatiek 1 balio dute.', 'Continuidad: los dos trozos valen 1.', 'الاتصال: قيمة الجزأين 1.', 'Continuity: both pieces are worth 1.'), math: same('$1^2=1\\qquad 3\\cdot 1-2=1$') },
            { text: say('Alboko deribatuak.', 'Las derivadas laterales.', 'المشتقتان الجانبيتان.', 'The one-sided derivatives.'), math: same('$f\'(1^-)=2\\qquad f\'(1^+)=3$') },
            { text: say('Desberdinak dira: jarraitua da, baina punta bat du, eta ez da deribagarria 1 puntuan.', 'Son distintas: es continua, pero tiene un pico y no es derivable en 1.', 'إنهما مختلفتان: الدالة متصلة لكن فيها زاوية، فهي غير قابلة للاشتقاق عند 1.', 'They differ: it is continuous, but it has a corner and is not differentiable at 1.') }
        ],
        takeaway: say('Deribagarria bada, jarraitua da; alderantziz, ez: funtzio jarraitu batek punta bat izan dezake. Lotune batean, lehenik jarraitutasuna eta gero $f\'(a^-)=f\'(a^+)$.', 'Si es derivable, es continua; al revés no: una función continua puede tener un pico. En una unión, primero la continuidad y después $f\'(a^-)=f\'(a^+)$.', 'إذا كانت قابلة للاشتقاق فهي متصلة، والعكس غير صحيح: قد يكون للدالة المتصلة زاوية. عند نقطة الالتقاء نتحقق أولًا من الاتصال ثم من $f\'(a^-)=f\'(a^+)$.', 'If it is differentiable, it is continuous; not the other way round: a continuous function can have a corner. At a joint, first continuity and then $f\'(a^-)=f\'(a^+)$.'),
        figure: (language) => <CornerJoinFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'absolute',
        stage: 'derivability',
        title: say('Balio absolutua eta zatiak', 'Valor absoluto y trozos', 'القيمة المطلقة والأجزاء', 'Absolute value and pieces'),
        goal: say('Balio absolutua duen funtzio bat zatika idaztea eta zein puntutan ez den deribagarria aurkitzea.', 'Escribir a trozos una función con valor absoluto y hallar en qué puntos no es derivable.', 'كتابة دالة فيها قيمة مطلقة على أجزاء وإيجاد النقاط التي لا تكون فيها قابلة للاشتقاق.', 'Write a function with an absolute value in pieces and find the points where it is not differentiable.'),
        needs: [
            { unit: FUNCTIONS1, topic: 'absolute', title: { eu: 'Funtzio baten balio absolutua', es: 'Valor absoluto de una función', en: 'Absolute value of a function', ar: 'القيمة المطلقة لدالة' } },
            PIECEWISE1
        ],
        problem: say('Zein puntutan ez da deribagarria $f(x)=|x^2-4|$?', '¿Dónde no es derivable $f(x)=|x^2-4|$?', 'أين تكون $f(x)=|x^2-4|$ غير قابلة للاشتقاق؟', 'Where is $f(x)=|x^2-4|$ not differentiable?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Barrukoa zero da $x=-2$ eta $x=2$ puntuetan: idatzi zatika.', 'Lo de dentro se anula en $x=-2$ y $x=2$: escríbela a trozos.', 'ينعدم ما بالداخل عند $x=-2$ و$x=2$: اكتبها على أجزاء.', 'The inside is 0 at $x=-2$ and $x=2$: write it in pieces.'), math: same('$f(x)=\\begin{cases}x^2-4 & |x|\\ge 2\\\\ 4-x^2 & |x|<2\\end{cases}$') },
            { text: say('$x=2$ puntuan, alboko deribatuak.', 'En $x=2$, las derivadas laterales.', 'عند $x=2$، المشتقتان الجانبيتان.', 'At $x=2$, the one-sided derivatives.'), math: same('$\\begin{gathered}f\'(2^-)=-2\\cdot 2=-4\\\\ f\'(2^+)=2\\cdot 2=4\\end{gathered}$') },
            { text: say('Simetriagatik, gauza bera gertatzen da $x=-2$ puntuan: bi puntak daude, eta beste puntu guztietan deribagarria da.', 'Por simetría, pasa lo mismo en $x=-2$: hay dos picos, y en el resto es derivable.', 'وبالتناظر يحدث الأمر نفسه عند $x=-2$: توجد زاويتان، وهي قابلة للاشتقاق في باقي النقاط.', 'By symmetry, the same happens at $x=-2$: there are two corners, and everywhere else it is differentiable.') }
        ],
        takeaway: say('$|g(x)|$ zatika idazten da: $g\\ge 0$ den tokian bere horretan, eta $g<0$ den tokian zeinua aldatuta. $g$ zero den puntuetan alboko deribatuak begiratzen dira: maldak zeinua aldatzen badu, punta bat dago.', '$|g(x)|$ se escribe a trozos: igual donde $g\\ge 0$ y cambiada de signo donde $g<0$. En los puntos donde $g$ se anula se miran las derivadas laterales: si la pendiente cambia de signo, hay un pico.', 'تُكتب $|g(x)|$ على أجزاء: كما هي حيث $g\\ge 0$، وبإشارة معكوسة حيث $g<0$. وعند النقاط التي تنعدم فيها $g$ ننظر إلى المشتقتين الجانبيتين: إذا تغيرت إشارة الميل فهناك زاوية.', '$|g(x)|$ is written in pieces: unchanged where $g\\ge 0$ and with its sign changed where $g<0$. At the points where $g$ is 0, look at the one-sided derivatives: if the slope changes sign, there is a corner.'),
        figure: (language) => <AbsoluteFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'parameters',
        stage: 'derivability',
        title: say('Parametroak deribagarritasunerako', 'Parámetros para que sea derivable', 'وسيطات لقابلية الاشتقاق', 'Parameters for differentiability'),
        goal: say('Zatika definitutako funtzio bat lotunean deribagarria izateko parametroak aurkitzea: ekuazio bat balioekin eta beste bat maldekin.', 'Hallar los parámetros para que una función a trozos sea derivable en la unión: una ecuación con los valores y otra con las pendientes.', 'إيجاد الوسيطات لتكون دالة معرّفة على أجزاء قابلة للاشتقاق عند نقطة الالتقاء: معادلة بالقيم وأخرى بالميول.', 'Find the parameters for a piecewise function to be differentiable at the joint: one equation with the values and another with the slopes.'),
        needs: [
            PIECEWISE1,
            { unit: 'batx2-zientziak/limites-continuidad', topic: 'two-parameters', title: { eu: 'Bi parametro: sistema bat', es: 'Dos parámetros: un sistema', en: 'Two parameters: a system', ar: 'وسيطان: نظام معادلات' } }
        ],
        problem: say('Aurkitu $a$ eta $b$, funtzio hau $x=1$ puntuan deribagarria izan dadin: $f(x)=\\begin{cases}x^2+ax & x\\le 1\\\\ b\\ln x+3 & x>1\\end{cases}$', 'Halla $a$ y $b$ para que esta función sea derivable en $x=1$: $f(x)=\\begin{cases}x^2+ax & x\\le 1\\\\ b\\ln x+3 & x>1\\end{cases}$', 'أوجد $a$ و$b$ لتكون هذه الدالة قابلة للاشتقاق عند $x=1$: $f(x)=\\begin{cases}x^2+ax & x\\le 1\\\\ b\\ln x+3 & x>1\\end{cases}$', 'Find $a$ and $b$ so that this function is differentiable at $x=1$: $f(x)=\\begin{cases}x^2+ax & x\\le 1\\\\ b\\ln x+3 & x>1\\end{cases}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Jarraitua 1 puntuan: balio bera.', 'Continua en 1: el mismo valor.', 'متصلة عند 1: القيمة نفسها.', 'Continuous at 1: the same value.'), math: same('$\\begin{gathered}1+a=b\\ln 1+3\\\\ 1+a=3\\ \\to\\ a=2\\end{gathered}$') },
            { text: say('Deribagarria 1 puntuan: malda bera.', 'Derivable en 1: la misma pendiente.', 'قابلة للاشتقاق عند 1: الميل نفسه.', 'Differentiable at 1: the same slope.'), math: same('$2\\cdot 1+a=\\frac{b}{1}\\ \\to\\ b=4$') },
            { text: say('$a=2$ eta $b=4$ direnean, deribagarria da $x=1$ puntuan, eta $f\'(1)=4$.', 'Con $a=2$ y $b=4$ es derivable en $x=1$, y $f\'(1)=4$.', 'مع $a=2$ و$b=4$ تكون قابلة للاشتقاق عند $x=1$، و$f\'(1)=4$.', 'With $a=2$ and $b=4$ it is differentiable at $x=1$, and $f\'(1)=4$.') }
        ],
        takeaway: say('Lotune batean bi baldintza: balio bera (jarraitutasuna) eta malda bera (alboko deribatu berdinak). Bi parametrorekin bi ekuazio ateratzen dira: sistema bat.', 'En una unión, dos condiciones: el mismo valor (continuidad) y la misma pendiente (derivadas laterales iguales). Con dos parámetros salen dos ecuaciones: un sistema.', 'عند نقطة الالتقاء شرطان: القيمة نفسها (الاتصال) والميل نفسه (مشتقتان جانبيتان متساويتان). ومع وسيطين نحصل على معادلتين: نظام.', 'At a joint, two conditions: the same value (continuity) and the same slope (equal one-sided derivatives). With two parameters you get two equations: a system.'),
        figure: (language) => <ParametersFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 3. The chain rule in depth ---------- */
    {
        id: 'three-layers',
        stage: 'chain',
        title: say('Hiru geruzako funtzioak', 'Funciones de tres capas', 'دوال من ثلاث طبقات', 'Functions with three layers'),
        goal: say('Hiru geruzako funtzio konposatuak deribatzea, geruza bakoitzeko faktore bat idatziz.', 'Derivar funciones compuestas de tres capas, escribiendo un factor por cada capa.', 'اشتقاق دوال مركبة من ثلاث طبقات بكتابة عامل لكل طبقة.', 'Differentiate composite functions with three layers, writing one factor per layer.'),
        needs: [
            CHAIN1,
            { unit: FUNCTIONS1, topic: 'composition', title: { eu: 'Funtzioen konposizioa', es: 'Composición de funciones', en: 'Composition of functions', ar: 'تركيب الدوال' } }
        ],
        problem: say('Deribatu $f(x)=\\sin^2(3x)$.', 'Deriva $f(x)=\\sin^2(3x)$.', 'اشتق $f(x)=\\sin^2(3x)$.', 'Differentiate $f(x)=\\sin^2(3x)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hiru geruza, kanpotik barrura: karratua, sinua eta $3x$.', 'Tres capas, de fuera adentro: el cuadrado, el seno y $3x$.', 'ثلاث طبقات من الخارج إلى الداخل: المربع، والجيب، و$3x$.', 'Three layers, from outside in: the square, the sine and $3x$.'), math: same('$f(x)=\\left(\\sin(3x)\\right)^2$') },
            { text: say('Deribatu geruza bakoitza, barrukoa bere horretan utzita, eta biderkatu.', 'Deriva cada capa dejando dentro lo que tiene, y multiplica.', 'اشتق كل طبقة مع ترك ما بداخلها كما هو، ثم اضرب.', 'Differentiate each layer leaving what is inside as it is, and multiply.'), math: same('$\\begin{gathered}f\'(x)=2\\sin(3x)\\\\ \\cdot\\cos(3x)\\cdot 3\\end{gathered}$') },
            { text: say('Ordenatu.', 'Ordena.', 'رتّب.', 'Tidy up.'), math: same('$f\'(x)=6\\sin(3x)\\cos(3x)$') }
        ],
        takeaway: say('Geruza asko daudenean, katearen erregela kanpotik barrura aplikatzen da: geruza bakoitzaren deribatua, barrukoan ebaluatuta, bider hurrengoarena, $x$ iritsi arte.', 'Con varias capas, la regla de la cadena se aplica de fuera adentro: la derivada de cada capa, evaluada en lo que tiene dentro, por la de la siguiente, hasta llegar a $x$.', 'مع عدة طبقات تُطبَّق قاعدة السلسلة من الخارج إلى الداخل: مشتقة كل طبقة مقيَّمة عند ما بداخلها، في مشتقة الطبقة التالية، حتى نصل إلى $x$.', 'With several layers, the chain rule goes from outside in: the derivative of each layer, evaluated at what is inside, times that of the next, until you reach $x$.'),
        figure: (language) => <LayersFigure language={language} />
    },
    {
        id: 'composite-table',
        stage: 'chain',
        title: say('Funtzio konposatuen taula', 'La tabla de las compuestas', 'جدول الدوال المركبة', 'The table of composite functions'),
        goal: say('Konposatuen taula erabiltzea: kanpoko funtzioa ezagutu, bere errenkada $u$ aldagaiarekin idatzi eta $u\'$ biderkatu.', 'Usar la tabla de las compuestas: reconocer la función de fuera, escribir su fila con $u$ y multiplicar por $u\'$.', 'استعمال جدول الدوال المركبة: تعرّف الدالة الخارجية، واكتب سطرها بـ $u$ واضرب في $u\'$.', 'Use the table of composite functions: recognise the outer function, write its row with $u$ and multiply by $u\'$.'),
        needs: [
            EXP_LOG1,
            { unit: DERIVATIVES1, topic: 'trig', title: { eu: 'Trigonometrikoak eta arkuak', es: 'Trigonométricas y arcos', en: 'Trigonometric and arc functions', ar: 'الدوال المثلثية ودوال القوس' } }
        ],
        problem: say('Deribatu $f(x)=\\arctan(x^2)$.', 'Deriva $f(x)=\\arctan(x^2)$.', 'اشتق $f(x)=\\arctan(x^2)$.', 'Differentiate $f(x)=\\arctan(x^2)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$\\arctan u$ da, $u=x^2$ izanik.', 'Es $\\arctan u$ con $u=x^2$.', 'إنها $\\arctan u$ مع $u=x^2$.', 'It is $\\arctan u$ with $u=x^2$.'), math: same('$\\begin{gathered}(\\arctan u)\'=\\frac{u\'}{1+u^2}\\\\ u\'=2x\\end{gathered}$') },
            { text: say('Ordezkatu $u$ eta $u\'$.', 'Sustituye $u$ y $u\'$.', 'عوّض $u$ و$u\'$.', 'Substitute $u$ and $u\'$.'), math: same('$f\'(x)=\\frac{2x}{1+x^4}$') },
            { text: say('Adibidez, $x=1$ puntuan malda 1 da.', 'Por ejemplo, en $x=1$ la pendiente es 1.', 'مثلًا، الميل عند $x=1$ يساوي 1.', 'For example, at $x=1$ the slope is 1.'), math: same('$f\'(1)=\\frac{2}{1+1}=1$') }
        ],
        takeaway: say('Taulako deribatu bakoitzak bere bertsio konposatua du: $x$ ordez $u$ idazten da eta $u\'$ biderkatzen da. Adibidez, $(e^u)\'=e^u\\,u\'$ eta $(\\ln u)\'=\\frac{u\'}{u}$.', 'Cada derivada de la tabla tiene su versión compuesta: se escribe $u$ en lugar de $x$ y se multiplica por $u\'$. Por ejemplo, $(e^u)\'=e^u\\,u\'$ y $(\\ln u)\'=\\frac{u\'}{u}$.', 'لكل مشتقة في الجدول صيغتها المركبة: نكتب $u$ مكان $x$ ونضرب في $u\'$. مثلًا $(e^u)\'=e^u\\,u\'$ و$(\\ln u)\'=\\frac{u\'}{u}$.', 'Each derivative in the table has its composite version: write $u$ instead of $x$ and multiply by $u\'$. For example, $(e^u)\'=e^u\\,u\'$ and $(\\ln u)\'=\\frac{u\'}{u}$.'),
        figure: (language) => <TableFigure language={language} />
    },
    {
        id: 'higher-order',
        stage: 'chain',
        title: say('Ondoz ondoko deribatuak eta n ordenakoa', 'Derivadas sucesivas y de orden n', 'المشتقات المتتالية والمشتقة من الرتبة n', 'Successive and nth derivatives'),
        goal: say('Ondoz ondoko deribatuak kalkulatzea eta haien patroitik $n$ ordenako deribatua idaztea.', 'Calcular derivadas sucesivas y escribir la derivada de orden $n$ a partir de su patrón.', 'حساب المشتقات المتتالية وكتابة المشتقة من الرتبة $n$ انطلاقًا من نمطها.', 'Work out successive derivatives and write the $n$th derivative from their pattern.'),
        needs: [
            { unit: 'batx1-zientziak/sucesiones', topic: 'terms', title: { eu: 'Gaiak eta gai orokorra', es: 'Términos y término general', en: 'Terms and general term', ar: 'الحدود والحد العام' } }
        ],
        problem: say('Aurkitu $f^{(n)}(x)$, $f(x)=\\frac{1}{x+1}$ bada.', 'Halla $f^{(n)}(x)$ si $f(x)=\\frac{1}{x+1}$.', 'أوجد $f^{(n)}(x)$ إذا كانت $f(x)=\\frac{1}{x+1}$.', 'Find $f^{(n)}(x)$ if $f(x)=\\frac{1}{x+1}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi $f(x)=(x+1)^{-1}$ eta deribatu hainbat aldiz.', 'Escribe $f(x)=(x+1)^{-1}$ y deriva varias veces.', 'اكتب $f(x)=(x+1)^{-1}$ واشتق عدة مرات.', 'Write $f(x)=(x+1)^{-1}$ and differentiate several times.'), math: same('$\\begin{gathered}f\'(x)=-(x+1)^{-2}\\\\ f\'\'(x)=2(x+1)^{-3}\\\\ f\'\'\'(x)=-6(x+1)^{-4}\\end{gathered}$') },
            { text: say('Patroia: zeinua txandakatzen da, aurreko zenbakia $n!$ da eta berretzailea $-(n+1)$.', 'El patrón: el signo alterna, el número de delante es $n!$ y el exponente, $-(n+1)$.', 'النمط: تتناوب الإشارة، والعدد في المقدمة $n!$ والأس $-(n+1)$.', 'The pattern: the sign alternates, the number in front is $n!$ and the exponent is $-(n+1)$.'), math: same('$f^{(n)}(x)=\\frac{(-1)^n\\,n!}{(x+1)^{n+1}}$') },
            { text: say('Egiaztatu $n=3$ kasuan: $3!=6$ eta zeinua negatiboa da.', 'Comprueba con $n=3$: $3!=6$ y el signo es negativo.', 'تحقّق مع $n=3$: $3!=6$ والإشارة سالبة.', 'Check with $n=3$: $3!=6$ and the sign is negative.'), math: same('$\\frac{(-1)^3\\cdot 6}{(x+1)^4}=\\frac{-6}{(x+1)^4}$') }
        ],
        takeaway: say('Ondoz ondoko deribatuak aurrekoa berriro deribatuz lortzen dira: $f\'\'$, $f\'\'\'$, $f^{(4)}$… $n$ ordenakoa aurkitzeko, lehenengoak kalkulatu, patroia bilatu (zeinua, koefizientea, berretzailea) eta egiaztatu.', 'Las derivadas sucesivas se obtienen derivando otra vez la anterior: $f\'\'$, $f\'\'\'$, $f^{(4)}$… Para la de orden $n$ se calculan las primeras, se busca el patrón (signo, coeficiente, exponente) y se comprueba.', 'نحصل على المشتقات المتتالية باشتقاق السابقة من جديد: $f\'\'$ و$f\'\'\'$ و$f^{(4)}$… وللمشتقة من الرتبة $n$ نحسب الأولى ونبحث عن النمط (الإشارة، المعامل، الأس) ثم نتحقق.', 'Successive derivatives come from differentiating the previous one again: $f\'\'$, $f\'\'\'$, $f^{(4)}$… For the $n$th, work out the first ones, look for the pattern (sign, coefficient, exponent) and check it.'),
        figure: (language) => <HigherOrderFigure language={language} />
    },

    /* ---------- 4. Special derivatives ---------- */
    {
        id: 'inverse',
        stage: 'special',
        title: say('Alderantzizko funtzioaren deribatua', 'Derivada de la función inversa', 'مشتقة الدالة العكسية', 'The derivative of the inverse function'),
        goal: say('Alderantzizko funtzioaren deribatua puntu batean kalkulatzea, alderantzizkoa idatzi gabe.', 'Calcular la derivada de la función inversa en un punto sin escribir la inversa.', 'حساب مشتقة الدالة العكسية عند نقطة دون كتابة الدالة العكسية.', 'Work out the derivative of the inverse function at a point without writing the inverse.'),
        needs: [
            { unit: FUNCTIONS1, topic: 'inverse-function', title: { eu: 'Alderantzizko funtzioa kalkulatzea', es: 'Calcular la función inversa', en: 'Finding the inverse function', ar: 'إيجاد الدالة العكسية' } },
            { unit: FUNCTIONS1, topic: 'inverse-graph', title: { eu: 'Alderantzizkoaren grafikoa eta adarrak', es: 'La gráfica de la inversa y las ramas', en: 'The graph of the inverse and branches', ar: 'رسم الدالة العكسية والفروع' } }
        ],
        problem: say('$f(x)=x^3+x$ funtzioak alderantzizkoa du. Kalkulatu $(f^{-1})\'(2)$.', '$f(x)=x^3+x$ tiene inversa. Calcula $(f^{-1})\'(2)$.', 'للدالة $f(x)=x^3+x$ دالة عكسية. احسب $(f^{-1})\'(2)$.', '$f(x)=x^3+x$ has an inverse. Work out $(f^{-1})\'(2)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bilatu $f(a)=2$ betetzen duen $a$.', 'Busca el $a$ con $f(a)=2$.', 'ابحث عن $a$ بحيث $f(a)=2$.', 'Look for the $a$ with $f(a)=2$.'), math: same('$a^3+a=2\\ \\to\\ a=1$') },
            { text: say('$f$ funtzioaren malda $a=1$ puntuan.', 'La pendiente de $f$ en $a=1$.', 'ميل $f$ عند $a=1$.', 'The slope of $f$ at $a=1$.'), math: same('$f\'(x)=3x^2+1\\qquad f\'(1)=4$') },
            { text: say('Alderantzizkoak alderantzizko malda du.', 'La inversa tiene la pendiente inversa.', 'للدالة العكسية الميل المقلوب.', 'The inverse has the reciprocal slope.'), math: same('$(f^{-1})\'(2)=\\frac{1}{f\'(1)}=\\frac{1}{4}$') }
        ],
        takeaway: say('$f(a)=b$ eta $f\'(a)\\neq 0$ badira, $(f^{-1})\'(b)=\\frac{1}{f\'(a)}$: alderantzizkoaren grafikoa $y=x$ zuzenarekiko simetrikoa da, eta zuzen ukitzaile simetrikoak alderantzizko malda du.', 'Si $f(a)=b$ y $f\'(a)\\neq 0$, $(f^{-1})\'(b)=\\frac{1}{f\'(a)}$: la gráfica de la inversa es simétrica respecto a $y=x$, y la tangente simétrica tiene la pendiente inversa.', 'إذا كان $f(a)=b$ و$f\'(a)\\neq 0$ فإن $(f^{-1})\'(b)=\\frac{1}{f\'(a)}$: رسم الدالة العكسية متناظر بالنسبة إلى $y=x$، وللمماس المتناظر الميل المقلوب.', 'If $f(a)=b$ and $f\'(a)\\neq 0$, $(f^{-1})\'(b)=\\frac{1}{f\'(a)}$: the graph of the inverse is symmetric about $y=x$, and the symmetric tangent has the reciprocal slope.'),
        figure: (language) => <InverseFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'implicit',
        stage: 'special',
        title: say('Deribazio inplizitua', 'Derivación implícita', 'الاشتقاق الضمني', 'Implicit differentiation'),
        goal: say('Ekuazio batek emandako kurba baten malda kalkulatzea, $y$ askatu gabe.', 'Calcular la pendiente de una curva dada por una ecuación sin despejar $y$.', 'حساب ميل منحنى معطى بمعادلة دون استخراج $y$.', 'Work out the slope of a curve given by an equation without solving for $y$.'),
        needs: [
            { unit: 'batx1-zientziak/conicas', topic: 'circle-equation', title: { eu: 'Zirkunferentziaren ekuazioa', es: 'Ecuación de la circunferencia', en: 'Equation of a circle', ar: 'معادلة الدائرة' } },
            CHAIN1
        ],
        problem: say('Aurkitu $x^2+y^2=25$ zirkunferentziaren zuzen ukitzailea $(3,4)$ puntuan.', 'Halla la tangente a la circunferencia $x^2+y^2=25$ en el punto $(3,4)$.', 'أوجد مماس الدائرة $x^2+y^2=25$ عند النقطة $(3,4)$.', 'Find the tangent to the circle $x^2+y^2=25$ at the point $(3,4)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Deribatu bi aldeak $x$ aldagaiarekiko; $y$ aldagaia $x$ aldagaiaren funtzio bat da.', 'Deriva los dos lados respecto a $x$; $y$ es una función de $x$.', 'اشتق الطرفين بالنسبة إلى $x$؛ إن $y$ دالة في $x$.', 'Differentiate both sides with respect to $x$; $y$ is a function of $x$.'), math: same('$2x+2y\\,y\'=0$') },
            { text: say('Askatu $y\'$ eta ordezkatu puntua.', 'Despeja $y\'$ y sustituye el punto.', 'استخرج $y\'$ وعوّض النقطة.', 'Solve for $y\'$ and substitute the point.'), math: same('$y\'=-\\frac{x}{y}=-\\frac{3}{4}$') },
            { text: say('Zuzen ukitzailea.', 'La tangente.', 'المماس.', 'The tangent.'), math: same('$y-4=-\\frac{3}{4}(x-3)$') }
        ],
        takeaway: say('Ekuazio batean $x$ eta $y$ nahastuta badaude, bi aldeak $x$ aldagaiarekiko deribatzen dira, eta $y$ duen zerbait deribatzen den bakoitzean $y\'$ biderkatzen da (katearen erregela). Gero $y\'$ askatzen da.', 'Si $x$ e $y$ están mezcladas en una ecuación, se derivan los dos lados respecto a $x$ y, cada vez que se deriva algo con $y$, se multiplica por $y\'$ (regla de la cadena). Después se despeja $y\'$.', 'إذا اختلط $x$ و$y$ في معادلة نشتق الطرفين بالنسبة إلى $x$، وكلما اشتققنا شيئًا فيه $y$ نضرب في $y\'$ (قاعدة السلسلة). ثم نستخرج $y\'$.', 'If $x$ and $y$ are mixed in an equation, differentiate both sides with respect to $x$ and, every time you differentiate something with $y$, multiply by $y\'$ (chain rule). Then solve for $y\'$.'),
        figure: (language) => <ImplicitFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'logarithmic',
        stage: 'special',
        title: say('Deribazio logaritmikoa', 'Derivación logarítmica', 'الاشتقاق اللوغاريتمي', 'Logarithmic differentiation'),
        goal: say('Oinarrian eta berretzailean $x$ duten funtzioak deribatzea, logaritmoak hartuz.', 'Derivar funciones con $x$ en la base y en el exponente tomando logaritmos.', 'اشتقاق دوال فيها $x$ في الأساس وفي الأس بأخذ اللوغاريتم.', 'Differentiate functions with $x$ in the base and in the exponent by taking logarithms.'),
        needs: [EXP_LOG1],
        problem: say('Deribatu $f(x)=x^x$, $x>0$ izanik.', 'Deriva $f(x)=x^x$ para $x>0$.', 'اشتق $f(x)=x^x$ حيث $x>0$.', 'Differentiate $f(x)=x^x$ for $x>0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hartu logaritmoak: berretzailea jaisten da.', 'Toma logaritmos: el exponente baja.', 'خذ اللوغاريتم: ينزل الأس.', 'Take logarithms: the exponent comes down.'), math: same('$\\ln f(x)=x\\ln x$') },
            { text: say('Deribatu bi aldeak.', 'Deriva los dos lados.', 'اشتق الطرفين.', 'Differentiate both sides.'), math: same('$\\frac{f\'(x)}{f(x)}=\\ln x+1$') },
            { text: say('Askatu, $f(x)$ biderkatuz.', 'Despeja multiplicando por $f(x)$.', 'استخرجها بالضرب في $f(x)$.', 'Solve for it by multiplying by $f(x)$.'), math: same('$f\'(x)=x^x(\\ln x+1)$') }
        ],
        takeaway: say('$f(x)^{g(x)}$ funtzio batean logaritmoak hartzen dira, $\\ln y=g(x)\\ln f(x)$, inplizitua bezala deribatzen da ($\\frac{y\'}{y}$ ezkerrean), eta $y\'$ askatzen da $y$ biderkatuz.', 'Con $f(x)^{g(x)}$ se toman logaritmos, $\\ln y=g(x)\\ln f(x)$, se deriva como implícita ($\\frac{y\'}{y}$ a la izquierda) y se despeja $y\'$ multiplicando por $y$.', 'مع $f(x)^{g(x)}$ نأخذ اللوغاريتم، $\\ln y=g(x)\\ln f(x)$، ونشتق اشتقاقًا ضمنيًّا ($\\frac{y\'}{y}$ في اليسار)، ثم نستخرج $y\'$ بالضرب في $y$.', 'With $f(x)^{g(x)}$, take logarithms, $\\ln y=g(x)\\ln f(x)$, differentiate implicitly ($\\frac{y\'}{y}$ on the left) and solve for $y\'$ by multiplying by $y$.'),
        figure: (language) => <LogarithmicFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 5. Tangent problems ---------- */
    {
        id: 'coefficients',
        stage: 'tangents',
        title: say('Koefizienteak zuzen ukitzailetik', 'Coeficientes a partir de la tangente', 'المعاملات من المماس', 'Coefficients from the tangent'),
        goal: say('Funtzio baten koefizienteak aurkitzea, puntu bateko zuzen ukitzailea jakinda.', 'Hallar los coeficientes de una función sabiendo su tangente en un punto.', 'إيجاد معاملات دالة بمعرفة مماسها عند نقطة.', 'Find the coefficients of a function knowing its tangent at a point.'),
        needs: [TANGENT1, CONDITIONS1],
        problem: say('Aurkitu $a$ eta $b$, $f(x)=ax^3+bx$ funtzioaren zuzen ukitzailea $x=1$ puntuan $y=5x-2$ izan dadin.', 'Halla $a$ y $b$ para que la tangente a $f(x)=ax^3+bx$ en $x=1$ sea $y=5x-2$.', 'أوجد $a$ و$b$ ليكون مماس $f(x)=ax^3+bx$ عند $x=1$ هو $y=5x-2$.', 'Find $a$ and $b$ so that the tangent to $f(x)=ax^3+bx$ at $x=1$ is $y=5x-2$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ukitze-puntua zuzenean dago: $f(1)=5-2=3$.', 'El punto de tangencia está en la recta: $f(1)=5-2=3$.', 'نقطة التماس تقع على المستقيم: $f(1)=5-2=3$.', 'The point of tangency is on the line: $f(1)=5-2=3$.'), math: same('$a+b=3$') },
            { text: say('Malda 5 da: $f\'(1)=5$.', 'La pendiente es 5: $f\'(1)=5$.', 'الميل 5: $f\'(1)=5$.', 'The slope is 5: $f\'(1)=5$.'), math: same('$\\begin{gathered}f\'(x)=3ax^2+b\\\\ 3a+b=5\\end{gathered}$') },
            { text: say('Ebatzi sistema.', 'Resuelve el sistema.', 'حلّ النظام.', 'Solve the system.'), math: same('$2a=2\\ \\to\\ a=1,\\ b=2$') }
        ],
        takeaway: say('$x_0$ puntuko zuzen ukitzaileak bi datu ematen ditu: balioa, $f(x_0)$, zuzenean irakurtzen dena, eta malda, $f\'(x_0)$. Datu bakoitza koefizienteekin idatzitako ekuazio bat da.', 'La tangente en $x_0$ da dos datos: el valor $f(x_0)$, que se lee en la recta, y la pendiente $f\'(x_0)$. Cada dato es una ecuación con los coeficientes.', 'يعطي المماس عند $x_0$ معلومتين: القيمة $f(x_0)$ التي تُقرأ على المستقيم، والميل $f\'(x_0)$. وكل معلومة معادلة في المعاملات.', 'The tangent at $x_0$ gives two facts: the value $f(x_0)$, read on the line, and the slope $f\'(x_0)$. Each fact is an equation in the coefficients.'),
        figure: (language) => <CoefficientsFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'exterior-point',
        stage: 'tangents',
        title: say('Kanpoko puntu batetik zuzen ukitzaileak', 'Tangentes desde un punto exterior', 'المماسات من نقطة خارجية', 'Tangents from an exterior point'),
        goal: say('Kurbatik kanpoko puntu batetik igarotzen diren zuzen ukitzaileak aurkitzea.', 'Hallar las tangentes que pasan por un punto que no está en la curva.', 'إيجاد المماسات التي تمر بنقطة لا تقع على المنحنى.', 'Find the tangents that pass through a point that is not on the curve.'),
        needs: [TANGENT1, CONDITIONS1],
        problem: say('Aurkitu $f(x)=x^2$ funtzioaren zuzen ukitzaileak, $P(1,-3)$ puntutik igarotzen direnak.', 'Halla las tangentes a $f(x)=x^2$ que pasan por el punto $P(1,-3)$.', 'أوجد مماسات $f(x)=x^2$ التي تمر بالنقطة $P(1,-3)$.', 'Find the tangents to $f(x)=x^2$ that pass through the point $P(1,-3)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ukitze-puntua ezezaguna da, $(c,c^2)$, eta han malda $2c$ da.', 'El punto de tangencia es desconocido, $(c,c^2)$, y allí la pendiente es $2c$.', 'نقطة التماس مجهولة، $(c,c^2)$، والميل عندها $2c$.', 'The point of tangency is unknown, $(c,c^2)$, and the slope there is $2c$.'), math: same('$y-c^2=2c(x-c)$') },
            { text: say('Zuzenak $P$ puntutik igaro behar du: ordezkatu $x=1$ eta $y=-3$.', 'La recta pasa por $P$: sustituye $x=1$ e $y=-3$.', 'المستقيم يمر بالنقطة $P$: عوّض $x=1$ و$y=-3$.', 'The line passes through $P$: substitute $x=1$ and $y=-3$.'), math: same('$\\begin{gathered}-3-c^2=2c(1-c)\\\\ c^2-2c-3=0\\end{gathered}$') },
            { text: say('Bi soluzio, bi zuzen ukitzaile.', 'Dos soluciones, dos tangentes.', 'حلّان، مماسان.', 'Two solutions, two tangents.'), math: same('$\\begin{gathered}c=3\\ \\to\\ y=6x-9\\\\ c=-1\\ \\to\\ y=-2x-1\\end{gathered}$') }
        ],
        takeaway: say('Puntua kurban ez badago, ukitze-puntua ezezagun bat da, $c$. $c$ puntuko zuzen ukitzailea idazten da, emandako puntutik igarotzera behartzen da eta $c$ ebazten da: soluzio bakoitza zuzen ukitzaile bat da.', 'Si el punto no está en la curva, el punto de tangencia es una incógnita $c$. Se escribe la tangente en $c$, se obliga a pasar por el punto dado y se resuelve en $c$: cada solución es una tangente.', 'إذا لم تكن النقطة على المنحنى فنقطة التماس مجهول $c$. نكتب المماس عند $c$، ونفرض مروره بالنقطة المعطاة، ونحل في $c$: كل حل مماس.', 'If the point is not on the curve, the point of tangency is an unknown $c$. Write the tangent at $c$, force it through the given point and solve for $c$: each solution is a tangent.'),
        figure: (language) => <ExteriorPointFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'tangent-curves',
        stage: 'tangents',
        title: say('Bi kurba elkarren ukitzaile', 'Dos curvas tangentes entre sí', 'منحنيان متماسّان', 'Two curves tangent to each other'),
        goal: say('Bi kurba elkarren ukitzaile izateko baldintzak idaztea eta parametroak aurkitzea.', 'Escribir las condiciones para que dos curvas sean tangentes y hallar los parámetros.', 'كتابة شرطي تماس منحنيين وإيجاد الوسيطات.', 'Write the conditions for two curves to be tangent and find the parameters.'),
        needs: [CONDITIONS1, EXP_LOG1],
        problem: say('Aurkitu $k$, $y=kx$ zuzena $y=e^x$ kurbaren ukitzailea izan dadin.', 'Halla $k$ para que la recta $y=kx$ sea tangente a la curva $y=e^x$.', 'أوجد $k$ ليكون المستقيم $y=kx$ مماسًّا للمنحنى $y=e^x$.', 'Find $k$ so that the line $y=kx$ is tangent to the curve $y=e^x$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ukitze-puntuan, $c$, altuera bera eta malda bera.', 'En el punto de contacto $c$, la misma altura y la misma pendiente.', 'عند نقطة التماس $c$: الارتفاع نفسه والميل نفسه.', 'At the point of contact $c$, the same height and the same slope.'), math: same('$e^c=kc\\qquad e^c=k$') },
            { text: say('Ordezkatu bigarrena lehenengoan.', 'Sustituye la segunda en la primera.', 'عوّض الثانية في الأولى.', 'Substitute the second into the first.'), math: same('$k=kc\\ \\to\\ c=1$') },
            { text: say('Beraz, $k=e$: $y=ex$ zuzenak $e^x$ ukitzen du $(1,e)$ puntuan.', 'Así, $k=e$: la recta $y=ex$ toca a $e^x$ en $(1,e)$.', 'إذن $k=e$: يمسّ المستقيم $y=ex$ المنحنى $e^x$ عند $(1,e)$.', 'So $k=e$: the line $y=ex$ touches $e^x$ at $(1,e)$.') }
        ],
        takeaway: say('Bi kurba $x=c$ puntuan ukitzaileak dira, han ebakitzen badira eta malda bera badute: $f(c)=g(c)$ eta $f\'(c)=g\'(c)$. Ezezagunak $c$ puntua eta parametroak dira.', 'Dos curvas son tangentes en $x=c$ si se cortan allí y tienen la misma pendiente: $f(c)=g(c)$ y $f\'(c)=g\'(c)$. Las incógnitas son el punto $c$ y los parámetros.', 'يتماسّ منحنيان عند $x=c$ إذا تقاطعا هناك وكان لهما الميل نفسه: $f(c)=g(c)$ و$f\'(c)=g\'(c)$. والمجاهيل هي النقطة $c$ والوسيطات.', 'Two curves are tangent at $x=c$ if they meet there and have the same slope: $f(c)=g(c)$ and $f\'(c)=g\'(c)$. The unknowns are the point $c$ and the parameters.'),
        figure: (language) => <TangentCurvesFigure language={language} />,
        figureAfterSteps: true
    }
]

export const bach2DerivativesTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...localizeNames({ ...bach2DerivativesLessonTexts[topic.id as Bach2DerivativesTopicId], ...bach2DerivativesLessonChecks[topic.id as Bach2DerivativesTopicId] }) }))
