import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { ContinuityFigure } from '../dbh4-aplikatuak-funtzioak/figures'
import { BranchesFigure, DegreesFigure, FishFarmFigure, HorizontalFigure, InfiniteFigure, JoinFigure, JumpFigure, LongRunFigure, MinusInfinityFigure, PolyExpFigure, RootsInfinityFigure, SlantFigure, TariffFigure, ZeroHoleFigure } from './figures'
import { socLimitsLessonChecks, type SocLimitsTopicId } from './lessonChecks'
import { socLimitsLessonTexts } from './lessonTexts'
import { same, say } from './text'

/* ==========================================================================
   Limiteak eta jarraitutasuna · Batxilergoa 1 · Gizarte Zientziak — stages
   and lessons. The scope follows unit 6 «Límites» of the current Anaya
   Matemáticas aplicadas a las CCSS I (Suma Piezas), in its order: what a
   function does in the long run (polynomials, exponentials, quotients by
   degrees, x → −∞, roots and models), limits at a point (one-sided,
   infinite, 0/0), continuity (the types of discontinuity and a parameter
   that joins the pieces) and infinite branches (asymptotes and parabolic
   branches). The owner left out Bolzano and the number e. Lessons and
   drawings are this unit's own; the types of discontinuity reuse the
   4. DBH aplikatuak figure.
   ========================================================================== */

export type SocLimitsStageId = 'infinity' | 'more-infinity' | 'point' | 'continuity' | 'asymptotes'

export const socLimitsStages: UnitStage[] = [
    { id: 'infinity', tone: 'blue', title: { eu: 'Limiteak infinituan', es: 'Límites en el infinito', en: 'Limits at infinity', ar: 'النهايات عند اللانهاية' } },
    { id: 'more-infinity', tone: 'violet', title: { eu: 'Infinituan, kasu gehiago', es: 'Más casos en el infinito', en: 'More cases at infinity', ar: 'حالات أخرى عند اللانهاية' } },
    { id: 'point', tone: 'mustard', title: { eu: 'Limiteak puntu batean', es: 'Límites en un punto', en: 'Limits at a point', ar: 'النهايات عند نقطة' } },
    { id: 'continuity', tone: 'coral', title: { eu: 'Jarraitutasuna', es: 'Continuidad', en: 'Continuity', ar: 'الاتصال' } },
    { id: 'asymptotes', tone: 'green', title: { eu: 'Asintotak eta adarrak', es: 'Asíntotas y ramas', en: 'Asymptotes and branches', ar: 'المقاربات والفروع' } }
]

const FUNCTIONS = 'batx1-gizarte/funciones'
const EXPONENTIAL = 'batx1-gizarte/funciones-exponenciales'
const POLYNOMIALS = 'dbh4-akademikoak/polinomios-fracciones'

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Limits at infinity ---------- */
    {
        id: 'long-run',
        stage: 'infinity',
        title: say('Epe luzera', 'A largo plazo', 'على المدى البعيد', 'In the long run'),
        goal: say('Funtzio batek $x$ gelditu gabe handitzean zer egiten duen balio-taula batekin estimatzea, eta limite gisa idaztea.', 'Estimar con una tabla qué hace una función cuando $x$ crece sin parar, y escribirlo como límite.', 'تقدير ما تفعله دالة عندما يكبر $x$ بلا توقف بجدول قيم، وكتابة ذلك على صورة نهاية.', 'Estimate with a table what a function does when $x$ grows without stopping, and write it as a limit.'),
        needs: [
            { unit: 'dbh4-aplikatuak/funciones', topic: 'tendency', title: { eu: 'Funtzio baten joera', es: 'Tendencia de una función', en: 'Trend of a function', ar: 'اتجاه الدالة' } },
            { unit: FUNCTIONS, topic: 'average-cost', title: { eu: 'Batez besteko kostua eta hiperbola lekualdatuak', es: 'Coste medio e hipérbolas trasladadas', en: 'Average cost and shifted hyperbolas', ar: 'التكلفة المتوسطة والقطوع الزائدة المنسحبة' } }
        ],
        problem: say('Aplikazio baten erabiltzaileak, milakotan, $U(t)=\\frac{8t}{t+2}$ dira, $t$ hilabetetan. Zer gertatzen da epe luzera?', 'Los usuarios de una aplicación, en miles, son $U(t)=\\frac{8t}{t+2}$, con $t$ en meses. ¿Qué pasa a la larga?', 'عدد مستخدمي تطبيق بالآلاف هو $U(t)=\\frac{8t}{t+2}$، و$t$ بالأشهر. ماذا يحدث على المدى البعيد؟', 'The users of an app, in thousands, are $U(t)=\\frac{8t}{t+2}$, with $t$ in months. What happens in the long run?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Eman $t$ aldagaiari gero eta balio handiagoak.', 'Da a $t$ valores cada vez más grandes.', 'أعطِ $t$ قيمًا تكبر أكثر فأكثر.', 'Give $t$ bigger and bigger values.'), math: same('$U(10)=\\frac{80}{12}\\approx 6{,}67\\qquad U(100)=\\frac{800}{102}\\approx 7{,}84$') },
            { text: say('$t=1000$ denean, ia 8.', 'Con $t=1000$, ya casi 8.', 'مع $t=1000$ تقارب 8.', 'With $t=1000$, almost 8.'), math: same('$U(1000)=\\frac{8000}{1002}\\approx 7{,}98$') },
            { text: say('8000 erabiltzailera hurbiltzen da, iritsi gabe.', 'Se acerca a 8000 usuarios, sin llegar.', 'يقترب من 8000 مستخدم دون أن يبلغه.', 'It approaches 8,000 users, without reaching it.'), math: same('$\\lim_{t\\to+\\infty}U(t)=8$') }
        ],
        takeaway: say('$\\lim_{x\\to+\\infty}f(x)=L$: $x$ handitzean, $f(x)$ funtzioa $L$ baliora hurbiltzen da. $+\\infty$ edo $-\\infty$ aldera ere joan daiteke, edo limiterik ez izan.', '$\\lim_{x\\to+\\infty}f(x)=L$: al crecer $x$, $f(x)$ se acerca a $L$. También puede ir a $+\\infty$ o a $-\\infty$, o no tener límite.', '$\\lim_{x\\to+\\infty}f(x)=L$: عندما يكبر $x$ تقترب $f(x)$ من $L$. وقد تتجه أيضًا إلى $+\\infty$ أو $-\\infty$، أو لا تكون لها نهاية.', '$\\lim_{x\\to+\\infty}f(x)=L$: as $x$ grows, $f(x)$ approaches $L$. It can also go to $+\\infty$ or $-\\infty$, or have no limit.'),
        figure: (language) => <LongRunFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'poly-exp',
        stage: 'infinity',
        title: say('Polinomioak eta esponentzialak infinituan', 'Polinomios y exponenciales en el infinito', 'الحدوديات والأسيات عند اللانهاية', 'Polynomials and exponentials at infinity'),
        goal: say('Polinomio bat edo esponentzial bat nora doan jakitea $x\\to+\\infty$ denean, taularik egin gabe.', 'Saber hacia dónde va un polinomio o una exponencial cuando $x\\to+\\infty$, sin hacer tablas.', 'معرفة إلى أين تتجه حدودية أو أسية عندما $x\\to+\\infty$ دون جداول.', 'Know where a polynomial or an exponential goes as $x\\to+\\infty$, without tables.'),
        needs: [{ unit: EXPONENTIAL, topic: 'exp-graph', title: { eu: 'Funtzio esponentziala', es: 'La función exponencial', en: 'The exponential function', ar: 'الدالة الأسية' } }],
        problem: say('Zer egiten dute epe luzera $f(x)=x^3-6x^2$ eta $g(x)=2^x$ funtzioek? Zeinek hazten du gehiago?', '¿Qué hacen a la larga $f(x)=x^3-6x^2$ y $g(x)=2^x$? ¿Cuál crece más?', 'ماذا تفعل $f(x)=x^3-6x^2$ و$g(x)=2^x$ على المدى البعيد؟ أيهما تنمو أكثر؟', 'What do $f(x)=x^3-6x^2$ and $g(x)=2^x$ do in the long run? Which grows more?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Polinomioan, maila handieneko gaiak agintzen du, hasieran jaitsi arren.', 'En el polinomio manda el término de mayor grado, aunque al principio baje.', 'في الحدودية يحكم الحد ذو الدرجة الأكبر، حتى لو نزلت في البداية.', 'In the polynomial the highest-degree term rules, even if it falls at first.'), math: same('$f(4)=-32\\qquad f(10)=400$') },
            { text: say('Biak $+\\infty$ aldera doaz.', 'Los dos van a $+\\infty$.', 'كلتاهما تتجه إلى $+\\infty$.', 'Both go to $+\\infty$.'), math: same('$\\lim_{x\\to+\\infty}(x^3-6x^2)=+\\infty\\qquad\\lim_{x\\to+\\infty}2^x=+\\infty$') },
            { text: say('Esponentzialak irabazten du epe luzera.', 'La exponencial gana a la larga.', 'الأسية تفوز على المدى البعيد.', 'The exponential wins in the long run.'), math: same('$2^{10}=1024>400$') }
        ],
        takeaway: say('Polinomio bat $+\\infty$ edo $-\\infty$ aldera doa, maila handieneko gaiaren zeinuaren arabera. $a^x$ funtzioa $+\\infty$ aldera doa $a>1$ bada, eta 0 baliora $0<a<1$ bada; esponentzialak edozein polinomio gainditzen du.', 'Un polinomio va a $+\\infty$ o a $-\\infty$, según el signo de su término de mayor grado. $a^x$ va a $+\\infty$ si $a>1$ y a 0 si $0<a<1$; la exponencial gana a cualquier polinomio.', 'تتجه الحدودية إلى $+\\infty$ أو $-\\infty$ حسب إشارة حدها ذي الدرجة الأكبر. و$a^x$ تتجه إلى $+\\infty$ إذا $a>1$ وإلى 0 إذا $0<a<1$؛ والأسية تتفوق على أي حدودية.', 'A polynomial goes to $+\\infty$ or $-\\infty$, according to the sign of its highest-degree term. $a^x$ goes to $+\\infty$ if $a>1$ and to 0 if $0<a<1$; the exponential beats any polynomial.'),
        figure: (language) => <PolyExpFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'degrees',
        stage: 'infinity',
        title: say('Zatidurak infinituan: mailak', 'Cocientes en el infinito: los grados', 'خوارج القسمة عند اللانهاية: الدرجات', 'Quotients at infinity: the degrees'),
        goal: say('Polinomioen zatidura baten infinituko limitea kalkulatzea, mailak alderatuz.', 'Calcular el límite en el infinito de un cociente de polinomios comparando los grados.', 'حساب نهاية خارج قسمة حدوديتين عند اللانهاية بمقارنة الدرجات.', 'Work out the limit at infinity of a quotient of polynomials by comparing the degrees.'),
        needs: [{ unit: FUNCTIONS, topic: 'inverse-prop', title: { eu: 'Alderantzizko proportzionaltasuna', es: 'Proporcionalidad inversa', en: 'Inverse proportion', ar: 'التناسب العكسي' } }],
        problem: say('Kalkulatu $\\lim_{x\\to+\\infty}\\frac{2x^2+1}{x^2+3}$ eta $\\lim_{x\\to+\\infty}\\frac{5x}{x^2+1}$.', 'Calcula $\\lim_{x\\to+\\infty}\\frac{2x^2+1}{x^2+3}$ y $\\lim_{x\\to+\\infty}\\frac{5x}{x^2+1}$.', 'احسب $\\lim_{x\\to+\\infty}\\frac{2x^2+1}{x^2+3}$ و$\\lim_{x\\to+\\infty}\\frac{5x}{x^2+1}$.', 'Work out $\\lim_{x\\to+\\infty}\\frac{2x^2+1}{x^2+3}$ and $\\lim_{x\\to+\\infty}\\frac{5x}{x^2+1}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$\\frac{\\infty}{\\infty}$ ateratzen da: alderatu mailak.', 'Sale $\\frac{\\infty}{\\infty}$: compara los grados.', 'نجد $\\frac{\\infty}{\\infty}$: قارن الدرجات.', 'You get $\\frac{\\infty}{\\infty}$: compare the degrees.') },
            { text: say('Maila bera: koefiziente nagusien zatidura.', 'Mismo grado: el cociente de los coeficientes principales.', 'الدرجة نفسها: خارج قسمة المعاملين الرئيسيين.', 'Same degree: the quotient of the leading coefficients.'), math: same('$\\frac{2x^2+1}{x^2+3}\\ \\to\\ \\frac{2}{1}=2$') },
            { text: say('Behean maila handiagoa: 0 baliora doa.', 'Más grado abajo: va a 0.', 'درجة المقام أكبر: تتجه إلى 0.', 'Higher degree below: it goes to 0.'), math: same('$\\frac{5x}{x^2+1}\\ \\to\\ 0$') }
        ],
        takeaway: say('$\\frac{P(x)}{Q(x)}$, $x\\to\\pm\\infty$ denean: $P$ polinomioaren maila handiagoa bada, $\\pm\\infty$; $Q$ polinomioarena bada, 0; maila bera badute, koefiziente nagusien zatidura.', '$\\frac{P(x)}{Q(x)}$ con $x\\to\\pm\\infty$: si $P$ tiene más grado, $\\pm\\infty$; si lo tiene $Q$, 0; con el mismo grado, el cociente de los coeficientes principales.', '$\\frac{P(x)}{Q(x)}$ مع $x\\to\\pm\\infty$: إذا كانت درجة $P$ أكبر فالنهاية $\\pm\\infty$، وإذا كانت درجة $Q$ أكبر فهي 0، ومع الدرجة نفسها خارج قسمة المعاملين الرئيسيين.', '$\\frac{P(x)}{Q(x)}$ with $x\\to\\pm\\infty$: if $P$ has the higher degree, $\\pm\\infty$; if $Q$ has it, 0; with the same degree, the quotient of the leading coefficients.'),
        figure: (language) => <DegreesFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 2. More cases at infinity ---------- */
    {
        id: 'minus-infinity',
        stage: 'more-infinity',
        title: say('Minus infiniturantz', 'Hacia menos infinito', 'نحو سالب اللانهاية', 'Towards minus infinity'),
        goal: say('$x\\to-\\infty$ denean limiteak kalkulatzea: polinomioak, zatidurak eta esponentzialak.', 'Calcular límites cuando $x\\to-\\infty$: polinomios, cocientes y exponenciales.', 'حساب النهايات عندما $x\\to-\\infty$: الحدوديات وخوارج القسمة والأسيات.', 'Work out limits as $x\\to-\\infty$: polynomials, quotients and exponentials.'),
        needs: [{ unit: EXPONENTIAL, topic: 'exp-graph', title: { eu: 'Funtzio esponentziala', es: 'La función exponencial', en: 'The exponential function', ar: 'الدالة الأسية' } }],
        problem: say('Kalkulatu, $x\\to-\\infty$ denean: $f(x)=x^3-4x$, $g(x)=2^x$ eta $h(x)=\\frac{3x^2}{x^2+1}$.', 'Calcula cuando $x\\to-\\infty$: $f(x)=x^3-4x$, $g(x)=2^x$ y $h(x)=\\frac{3x^2}{x^2+1}$.', 'احسب عندما $x\\to-\\infty$: ‏$f(x)=x^3-4x$ و$g(x)=2^x$ و$h(x)=\\frac{3x^2}{x^2+1}$.', 'Work out as $x\\to-\\infty$: $f(x)=x^3-4x$, $g(x)=2^x$ and $h(x)=\\frac{3x^2}{x^2+1}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Maila bakoitia eta $x$ negatiboa: kuboa negatiboa da.', 'Grado impar y $x$ negativo: el cubo es negativo.', 'درجة فردية و$x$ سالب: المكعب سالب.', 'Odd degree and negative $x$: the cube is negative.'), math: same('$\\lim_{x\\to-\\infty}(x^3-4x)=-\\infty$') },
            { text: say('$a>1$ duen esponentziala, ezkerrean, 0 baliora hurbiltzen da.', 'Una exponencial con $a>1$, a la izquierda, se acerca a 0.', 'الأسية مع $a>1$ تقترب من 0 إلى اليسار.', 'An exponential with $a>1$ approaches 0 on the left.'), math: same('$2^{-10}=\\frac{1}{1024}$') },
            { text: say('Maila bera: koefizienteen zatidura, $+\\infty$ aldean bezala.', 'Mismo grado: el cociente de los coeficientes, igual que en $+\\infty$.', 'الدرجة نفسها: خارج قسمة المعاملين كما عند $+\\infty$.', 'Same degree: the quotient of the coefficients, as at $+\\infty$.'), math: same('$\\lim_{x\\to-\\infty}\\frac{3x^2}{x^2+1}=3$') }
        ],
        takeaway: say('$x\\to-\\infty$ denean, aldatu $x$, $-x$ jarrita, eta kalkulatu $+\\infty$ aldean. Maila handieneko gaiaren zeinua maila bikoitia ala bakoitia den araberakoa da; $a^x\\to 0$, $a>1$ bada.', 'Si $x\\to-\\infty$, cambia $x$ por $-x$ y calcula en $+\\infty$. El signo del término de mayor grado depende de si el grado es par o impar; $a^x\\to 0$ si $a>1$.', 'إذا $x\\to-\\infty$ فاستبدل $x$ بـ $-x$ واحسب عند $+\\infty$. وإشارة الحد ذي الدرجة الأكبر تتعلق بكون الدرجة زوجية أو فردية؛ و$a^x\\to 0$ إذا $a>1$.', 'If $x\\to-\\infty$, swap $x$ for $-x$ and work at $+\\infty$. The sign of the highest-degree term depends on whether the degree is even or odd; $a^x\\to 0$ if $a>1$.'),
        figure: (language) => <MinusInfinityFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'roots-infinity',
        stage: 'more-infinity',
        title: say('Erroak infinituan', 'Raíces en el infinito', 'الجذور عند اللانهاية', 'Roots at infinity'),
        goal: say('Erroak dituzten infinituko limiteak kalkulatzea, haien maila kontatuz.', 'Calcular límites en el infinito con raíces, contando su grado.', 'حساب النهايات عند اللانهاية مع الجذور بعدّ درجتها.', 'Work out limits at infinity with roots, by counting their degree.'),
        needs: [{ unit: FUNCTIONS, topic: 'root', title: { eu: 'Erro-funtzioak', es: 'Funciones raíz', en: 'Root functions', ar: 'دوال الجذر' } }],
        problem: say('Kalkulatu $\\lim_{x\\to+\\infty}\\frac{\\sqrt{9x^2+4}}{x+1}$ eta $\\lim_{x\\to+\\infty}\\frac{\\sqrt{x}}{x+5}$.', 'Calcula $\\lim_{x\\to+\\infty}\\frac{\\sqrt{9x^2+4}}{x+1}$ y $\\lim_{x\\to+\\infty}\\frac{\\sqrt{x}}{x+5}$.', 'احسب $\\lim_{x\\to+\\infty}\\frac{\\sqrt{9x^2+4}}{x+1}$ و$\\lim_{x\\to+\\infty}\\frac{\\sqrt{x}}{x+5}$.', 'Work out $\\lim_{x\\to+\\infty}\\frac{\\sqrt{9x^2+4}}{x+1}$ and $\\lim_{x\\to+\\infty}\\frac{\\sqrt{x}}{x+5}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x$ oso handia denean, $\\sqrt{9x^2+4}$ ia $\\sqrt{9x^2}$ da: 1 mailakoa.', 'Para $x$ muy grande, $\\sqrt{9x^2+4}$ es casi $\\sqrt{9x^2}$: grado 1.', 'عندما يكون $x$ كبيرًا جدًّا تساوي $\\sqrt{9x^2+4}$ تقريبًا $\\sqrt{9x^2}$: الدرجة 1.', 'For very big $x$, $\\sqrt{9x^2+4}$ is almost $\\sqrt{9x^2}$: degree 1.'), math: same('$\\sqrt{9x^2}=3x$') },
            { text: say('Maila bera goian eta behean.', 'Mismo grado arriba y abajo.', 'الدرجة نفسها في البسط والمقام.', 'Same degree on top and below.'), math: same('$\\frac{3x}{x}=3$') },
            { text: say('$\\sqrt{x}$ adierazpenaren maila $\\frac{1}{2}$ da, 1 baino txikiagoa: 0 baliora doa.', '$\\sqrt{x}$ tiene grado $\\frac{1}{2}$, menor que 1: va a 0.', 'درجة $\\sqrt{x}$ هي $\\frac{1}{2}$، أصغر من 1: تتجه إلى 0.', '$\\sqrt{x}$ has degree $\\frac{1}{2}$, less than 1: it goes to 0.'), math: same('$\\frac{\\sqrt{x}}{x+5}\\ \\to\\ 0$') }
        ],
        takeaway: say('Erro karratu batek maila erdira eramaten du: $\\sqrt{ax^2+\\ldots}$ adierazpenak $\\sqrt{a}\\cdot x$ bezala jokatzen du. Gero, mailak alderatzen dira, polinomioen zatidura batean bezala.', 'Una raíz cuadrada divide el grado entre 2: $\\sqrt{ax^2+\\ldots}$ se porta como $\\sqrt{a}\\cdot x$. Después se comparan los grados como en un cociente de polinomios.', 'الجذر التربيعي يقسم الدرجة على 2: ‏$\\sqrt{ax^2+\\ldots}$ تسلك سلوك $\\sqrt{a}\\cdot x$. ثم نقارن الدرجات كما في خارج قسمة حدوديتين.', 'A square root halves the degree: $\\sqrt{ax^2+\\ldots}$ behaves like $\\sqrt{a}\\cdot x$. Then compare the degrees as in a quotient of polynomials.'),
        figure: (language) => <RootsInfinityFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'long-models',
        stage: 'more-infinity',
        title: say('Epe luzeko ereduak', 'Modelos a largo plazo', 'نماذج المدى البعيد', 'Long-run models'),
        goal: say('Eredu baten infinituko limitea interpretatzea: biztanleria, kostu edo prezio bat non egonkortzen den.', 'Interpretar el límite en el infinito de un modelo: hacia dónde se estabiliza una población, un coste o un precio.', 'تفسير نهاية نموذج عند اللانهاية: أين يستقر عدد سكان أو تكلفة أو سعر.', 'Interpret the limit at infinity of a model: where a population, a cost or a price levels off.'),
        needs: [{ unit: FUNCTIONS, topic: 'average-cost', title: { eu: 'Batez besteko kostua eta hiperbola lekualdatuak', es: 'Coste medio e hipérbolas trasladadas', en: 'Average cost and shifted hyperbolas', ar: 'التكلفة المتوسطة والقطوع الزائدة المنسحبة' } }],
        problem: say('Arrain-haztegi batek $P(t)=\\frac{3000t+500}{t+1}$ arrain ditu $t$ hilabeteren buruan. Zenbat zeuden hasieran? Non egonkortzen da?', 'Una piscifactoría tiene $P(t)=\\frac{3000t+500}{t+1}$ peces a los $t$ meses. ¿Cuántos había al principio? ¿Hacia dónde se estabiliza?', 'في مزرعة أسماك $P(t)=\\frac{3000t+500}{t+1}$ سمكة بعد $t$ شهر. كم كان عددها في البداية؟ وأين يستقر؟', 'A fish farm has $P(t)=\\frac{3000t+500}{t+1}$ fish after $t$ months. How many were there at the start? Where does it level off?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hasieran, $t=0$.', 'Al principio, $t=0$.', 'في البداية $t=0$.', 'At the start, $t=0$.'), math: same('$P(0)=\\frac{500}{1}=500$') },
            { text: say('Epe luzera, maila bera.', 'A la larga, mismo grado.', 'على المدى البعيد، الدرجة نفسها.', 'In the long run, same degree.'), math: same('$\\lim_{t\\to+\\infty}P(t)=\\frac{3000}{1}=3000$') },
            { text: say('Biztanleria 3000 arrain inguruan egonkortzen da, eta ez du inoiz gainditzen.', 'La población se estabiliza en unos 3000 peces y nunca los pasa.', 'يستقر عدد الأسماك عند نحو 3000 ولا يتجاوزه أبدًا.', 'The population levels off at about 3,000 fish and never passes it.'), math: same('$P(9)=\\frac{27\\,500}{10}=2750$') }
        ],
        takeaway: say('Eredu batean, $\\lim_{t\\to+\\infty}f(t)$ epe luzeko balioa da: egonkortzen den biztanleria edo unitateko kostua. $y=L$ zuzena asintota horizontala da.', 'En un modelo, $\\lim_{t\\to+\\infty}f(t)$ es el valor a largo plazo: la población que se estabiliza o el coste por unidad. La recta $y=L$ es la asíntota horizontal.', 'في النموذج تكون $\\lim_{t\\to+\\infty}f(t)$ القيمة على المدى البعيد: عدد السكان الذي يستقر أو تكلفة الوحدة. والمستقيم $y=L$ هو المقارب الأفقي.', 'In a model, $\\lim_{t\\to+\\infty}f(t)$ is the long-run value: the population that levels off or the cost per unit. The line $y=L$ is the horizontal asymptote.'),
        figure: (language) => <FishFarmFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 3. Limits at a point ---------- */
    {
        id: 'one-sided',
        stage: 'point',
        title: say('Alboko limiteak', 'Límites laterales', 'النهايتان الجانبيتان', 'One-sided limits'),
        goal: say('Zatika definitutako funtzio baten ezkerreko eta eskuineko limiteak kalkulatzea, eta limitea dagoen erabakitzea.', 'Calcular los límites por la izquierda y por la derecha de una función a trozos y decidir si existe el límite.', 'حساب النهايتين من اليسار ومن اليمين لدالة معرّفة على أجزاء وتحديد هل توجد النهاية.', 'Work out the limits from the left and from the right of a piecewise function and decide whether the limit exists.'),
        needs: [{ unit: FUNCTIONS, topic: 'piecewise', title: { eu: 'Zatika definitutako funtzioak', es: 'Funciones definidas a trozos', en: 'Piecewise functions', ar: 'الدوال المعرّفة على أجزاء' } }],
        problem: say('Aurkitu $f(x)=\\begin{cases}x^2-1 & x<2\\\\ x+3 & x\\ge 2\\end{cases}$ funtzioaren alboko limiteak $x=2$ puntuan.', 'Halla los límites laterales en $x=2$ de $f(x)=\\begin{cases}x^2-1 & x<2\\\\ x+3 & x\\ge 2\\end{cases}$.', 'أوجد النهايتين الجانبيتين عند $x=2$ للدالة $f(x)=\\begin{cases}x^2-1 & x<2\\\\ x+3 & x\\ge 2\\end{cases}$.', 'Find the one-sided limits at $x=2$ of $f(x)=\\begin{cases}x^2-1 & x<2\\\\ x+3 & x\\ge 2\\end{cases}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ezkerretik, lehen zatia.', 'Por la izquierda, el primer trozo.', 'من اليسار، الجزء الأول.', 'From the left, the first piece.'), math: same('$\\lim_{x\\to 2^-}(x^2-1)=3$') },
            { text: say('Eskuinetik, bigarren zatia.', 'Por la derecha, el segundo trozo.', 'من اليمين، الجزء الثاني.', 'From the right, the second piece.'), math: same('$\\lim_{x\\to 2^+}(x+3)=5$') },
            { text: say('Ez datoz bat: funtzioak 2 unitateko jauzia egiten du, eta ez dago limiterik 2 puntuan.', 'No coinciden: la función salta 2 unidades y no hay límite en 2.', 'لا تتساويان: تقفز الدالة وحدتين ولا توجد نهاية عند 2.', 'They do not match: the function jumps 2 units and there is no limit at 2.') }
        ],
        takeaway: say('$a$ puntuko limitea bi alboko limiteak bat datozenean bakarrik dago: $\\lim_{x\\to a^-}f(x)=\\lim_{x\\to a^+}f(x)$.', 'El límite en $a$ existe solo si los dos límites laterales coinciden: $\\lim_{x\\to a^-}f(x)=\\lim_{x\\to a^+}f(x)$.', 'لا توجد النهاية عند $a$ إلا إذا تساوت النهايتان الجانبيتان: $\\lim_{x\\to a^-}f(x)=\\lim_{x\\to a^+}f(x)$.', 'The limit at $a$ exists only if the two one-sided limits are equal: $\\lim_{x\\to a^-}f(x)=\\lim_{x\\to a^+}f(x)$.'),
        figure: (language) => <JumpFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'infinite',
        stage: 'point',
        title: say('Limite infinituak puntu batean', 'Límites infinitos en un punto', 'النهايات اللانهائية عند نقطة', 'Infinite limits at a point'),
        goal: say('$\\frac{k}{0}$ motako limiteak kalkulatzea, alde bakoitzeko zeinua aztertuz.', 'Calcular límites del tipo $\\frac{k}{0}$ estudiando el signo a cada lado.', 'حساب نهايات من النوع $\\frac{k}{0}$ بدراسة الإشارة على كل جانب.', 'Work out limits of the kind $\\frac{k}{0}$ by studying the sign on each side.'),
        needs: [{ unit: FUNCTIONS, topic: 'inverse-prop', title: { eu: 'Alderantzizko proportzionaltasuna', es: 'Proporcionalidad inversa', en: 'Inverse proportion', ar: 'التناسب العكسي' } }],
        problem: say('Kalkulatu $\\lim_{x\\to -1}\\frac{2}{x+1}$ eta $\\lim_{x\\to 3}\\frac{1}{(x-3)^2}$.', 'Calcula $\\lim_{x\\to -1}\\frac{2}{x+1}$ y $\\lim_{x\\to 3}\\frac{1}{(x-3)^2}$.', 'احسب $\\lim_{x\\to -1}\\frac{2}{x+1}$ و$\\lim_{x\\to 3}\\frac{1}{(x-3)^2}$.', 'Work out $\\lim_{x\\to -1}\\frac{2}{x+1}$ and $\\lim_{x\\to 3}\\frac{1}{(x-3)^2}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordezkatzean $\\frac{2}{0}$ ateratzen da: emaitza mugarik gabe hazten da.', 'Al sustituir sale $\\frac{2}{0}$: el resultado crece sin límite.', 'بالتعويض نجد $\\frac{2}{0}$: يكبر الناتج بلا حد.', 'Substituting gives $\\frac{2}{0}$: the result grows without bound.') },
            { text: say('Begiratu zeinua alde bakoitzean.', 'Mira el signo a cada lado.', 'انظر إلى الإشارة على كل جانب.', 'Look at the sign on each side.'), math: same('$\\lim_{x\\to -1^-}\\frac{2}{x+1}=-\\infty\\qquad\\lim_{x\\to -1^+}\\frac{2}{x+1}=+\\infty$') },
            { text: say('Behean karratu bat badago, bi aldeak positiboak dira.', 'Con un cuadrado abajo, los dos lados son positivos.', 'مع مربع في المقام يكون الجانبان موجبين.', 'With a square below, both sides are positive.'), math: same('$\\lim_{x\\to 3}\\frac{1}{(x-3)^2}=+\\infty$') }
        ],
        takeaway: say('$\\frac{k}{0}$ ateratzen bada, $k\\neq 0$ izanik, alboko limite bakoitza $+\\infty$ edo $-\\infty$ da, zeinuaren arabera; $x=a$ zuzena asintota bertikala da.', 'Si sale $\\frac{k}{0}$ con $k\\neq 0$, cada límite lateral es $+\\infty$ o $-\\infty$ según el signo; la recta $x=a$ es una asíntota vertical.', 'إذا ظهرت $\\frac{k}{0}$ مع $k\\neq 0$ فكل نهاية جانبية $+\\infty$ أو $-\\infty$ حسب الإشارة؛ والمستقيم $x=a$ مقارب رأسي.', 'If $\\frac{k}{0}$ appears with $k\\neq 0$, each one-sided limit is $+\\infty$ or $-\\infty$ according to the sign; the line $x=a$ is a vertical asymptote.'),
        figure: (language) => <InfiniteFigure language={language} />
    },
    {
        id: 'zero-zero',
        stage: 'point',
        title: say('Zero zati zero', 'Cero entre cero', 'صفر على صفر', 'Zero over zero'),
        goal: say('$\\frac{0}{0}$ indeterminazioa ebaztea, faktorizatuz eta sinplifikatuz.', 'Resolver la indeterminación $\\frac{0}{0}$ factorizando y simplificando.', 'حل حالة عدم التعيين $\\frac{0}{0}$ بالتحليل والاختصار.', 'Resolve the indeterminate form $\\frac{0}{0}$ by factorising and cancelling.'),
        needs: [{ unit: POLYNOMIALS, topic: 'factorize', title: { eu: 'Polinomioak faktorizatzea', es: 'Factorizar polinomios', en: 'Factorising polynomials', ar: 'تحليل الحدوديات' } }],
        problem: say('Kalkulatu $\\lim_{x\\to 2}\\frac{x^2+x-6}{x-2}$.', 'Calcula $\\lim_{x\\to 2}\\frac{x^2+x-6}{x-2}$.', 'احسب $\\lim_{x\\to 2}\\frac{x^2+x-6}{x-2}$.', 'Work out $\\lim_{x\\to 2}\\frac{x^2+x-6}{x-2}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordezkatzean $\\frac{0}{0}$ ateratzen da.', 'Al sustituir sale $\\frac{0}{0}$.', 'بالتعويض نجد $\\frac{0}{0}$.', 'Substituting gives $\\frac{0}{0}$.'), math: same('$\\frac{4+2-6}{2-2}$') },
            { text: say('Faktorizatu eta sinplifikatu $x-2$.', 'Factoriza y simplifica $x-2$.', 'حلّل واختصر $x-2$.', 'Factorise and cancel $x-2$.'), math: same('$\\frac{(x-2)(x+3)}{x-2}=x+3$') },
            { text: say('Ordezkatu berriro.', 'Vuelve a sustituir.', 'عوّض من جديد.', 'Substitute again.'), math: same('$2+3=5$') }
        ],
        takeaway: say('$\\frac{0}{0}$ ateratzen bada, $(x-a)$ faktorea goian eta behean dago: faktorizatu, sinplifikatu eta ordezkatu berriro. Grafikoak zulo bat du.', 'Si sale $\\frac{0}{0}$, $(x-a)$ divide arriba y abajo: factoriza, simplifica y vuelve a sustituir. La gráfica tiene un agujero.', 'إذا ظهرت $\\frac{0}{0}$ فإن $(x-a)$ عامل في البسط والمقام: حلّل واختصر ثم عوّض من جديد. للرسم ثقب.', 'If $\\frac{0}{0}$ appears, $(x-a)$ divides the top and the bottom: factorise, cancel and substitute again. The graph has a hole.'),
        figure: (language) => <ZeroHoleFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 4. Continuity ---------- */
    {
        id: 'continuous',
        stage: 'continuity',
        title: say('Funtzio jarraitua', 'Función continua', 'الدالة المتصلة', 'Continuous function'),
        goal: say('Funtzio bat puntu batean jarraitua den egiaztatzea, hiru baldintzekin.', 'Comprobar si una función es continua en un punto con las tres condiciones.', 'التحقق هل الدالة متصلة عند نقطة بالشروط الثلاثة.', 'Check whether a function is continuous at a point with the three conditions.'),
        needs: [{ unit: 'dbh4-aplikatuak/funciones', topic: 'continuity', title: { eu: 'Funtzio jarraituak eta etenak', es: 'Funciones continuas y discontinuas', en: 'Continuous and discontinuous functions', ar: 'الدوال المتصلة والمنفصلة' } }],
        problem: say('Jarraitua al da $x=1$ puntuan $f(x)=\\begin{cases}x^2+1 & x\\le 1\\\\ 3x-1 & x>1\\end{cases}$ funtzioa?', '¿Es continua en $x=1$ la función $f(x)=\\begin{cases}x^2+1 & x\\le 1\\\\ 3x-1 & x>1\\end{cases}$?', 'هل الدالة $f(x)=\\begin{cases}x^2+1 & x\\le 1\\\\ 3x-1 & x>1\\end{cases}$ متصلة عند $x=1$؟', 'Is the function $f(x)=\\begin{cases}x^2+1 & x\\le 1\\\\ 3x-1 & x>1\\end{cases}$ continuous at $x=1$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$f(1)$ badago: erabili $\\le$ daraman zatia.', '$f(1)$ existe: usa el trozo con $\\le$.', '$f(1)$ موجودة: استعمل الجزء الذي فيه $\\le$.', '$f(1)$ exists: use the piece with $\\le$.'), math: same('$f(1)=1^2+1=2$') },
            { text: say('Alboko limiteak.', 'Los límites laterales.', 'النهايتان الجانبيتان.', 'The one-sided limits.'), math: same('$\\lim_{x\\to 1^-}(x^2+1)=2\\qquad\\lim_{x\\to 1^+}(3x-1)=2$') },
            { text: say('Hiru balioak bat datoz: jarraitua da 1 puntuan.', 'Los tres valores coinciden: es continua en 1.', 'القيم الثلاث متساوية: الدالة متصلة عند 1.', 'The three values match: it is continuous at 1.') }
        ],
        takeaway: say('$f$ funtzioa jarraitua da $a$ puntuan, $f(a)$ badago, $\\lim_{x\\to a}f(x)$ badago, eta biak berdinak badira. Arkatza altxatu gabe marrazten da.', '$f$ es continua en $a$ si existe $f(a)$, existe $\\lim_{x\\to a}f(x)$ y los dos son iguales. Se dibuja sin levantar el lápiz.', 'تكون $f$ متصلة عند $a$ إذا وُجدت $f(a)$ ووُجدت $\\lim_{x\\to a}f(x)$ وتساوتا. وتُرسم دون رفع القلم.', '$f$ is continuous at $a$ if $f(a)$ exists, $\\lim_{x\\to a}f(x)$ exists and both are equal. It is drawn without lifting the pencil.'),
        figure: (language) => <JoinFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'discontinuities',
        stage: 'continuity',
        title: say('Etenune motak', 'Tipos de discontinuidad', 'أنواع الانقطاع', 'Kinds of discontinuity'),
        goal: say('Etenune bat sailkatzea: gaindigarria, jauzi finitukoa edo jauzi infinitukoa.', 'Clasificar una discontinuidad: evitable, de salto finito o de salto infinito.', 'تصنيف الانقطاع: قابل للإزالة أو قفزة منتهية أو قفزة لانهائية.', 'Classify a discontinuity: removable, finite jump or infinite jump.'),
        needs: [{ unit: 'dbh4-aplikatuak/funciones', topic: 'continuity', title: { eu: 'Funtzio jarraituak eta etenak', es: 'Funciones continuas y discontinuas', en: 'Continuous and discontinuous functions', ar: 'الدوال المتصلة والمنفصلة' } }],
        problem: say('Sailkatu funtzio bakoitzaren etenunea: $f(x)=\\frac{x^2-9}{x-3}$, $x=3$ puntuan; $g(x)=\\begin{cases}x & x<1\\\\ x+2 & x\\ge 1\\end{cases}$, $x=1$ puntuan; eta $h(x)=\\frac{1}{x-4}$, $x=4$ puntuan.', 'Clasifica la discontinuidad de cada función: $f(x)=\\frac{x^2-9}{x-3}$ en $x=3$, $g(x)=\\begin{cases}x & x<1\\\\ x+2 & x\\ge 1\\end{cases}$ en $x=1$ y $h(x)=\\frac{1}{x-4}$ en $x=4$.', 'صنّف انقطاع كل دالة: $f(x)=\\frac{x^2-9}{x-3}$ عند $x=3$، و$g(x)=\\begin{cases}x & x<1\\\\ x+2 & x\\ge 1\\end{cases}$ عند $x=1$، و$h(x)=\\frac{1}{x-4}$ عند $x=4$.', 'Classify the discontinuity of each function: $f(x)=\\frac{x^2-9}{x-3}$ at $x=3$, $g(x)=\\begin{cases}x & x<1\\\\ x+2 & x\\ge 1\\end{cases}$ at $x=1$ and $h(x)=\\frac{1}{x-4}$ at $x=4$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$f$: $f(3)$ ez dago, baina limitea bai. Gaindigarria.', '$f$: no existe $f(3)$, pero el límite sí. Evitable.', '$f$: ‏$f(3)$ غير موجودة لكن النهاية موجودة. قابل للإزالة.', '$f$: $f(3)$ does not exist, but the limit does. Removable.'), math: same('$\\frac{(x-3)(x+3)}{x-3}=x+3\\ \\to\\ 6$') },
            { text: say('$g$: alboko limiteak desberdinak eta finituak dira. Jauzi finitua.', '$g$: los laterales son distintos y finitos. Salto finito.', '$g$: النهايتان الجانبيتان مختلفتان ومنتهيتان. قفزة منتهية.', '$g$: the one-sided limits are different and finite. Finite jump.'), math: same('$\\lim_{x\\to 1^-}x=1\\qquad\\lim_{x\\to 1^+}(x+2)=3$') },
            { text: say('$h$: alboko limite bat infinitua da. Jauzi infinitua.', '$h$: un lateral es infinito. Salto infinito.', '$h$: إحدى النهايتين الجانبيتين لانهائية. قفزة لانهائية.', '$h$: a one-sided limit is infinite. Infinite jump.'), math: same('$\\lim_{x\\to 4^+}\\frac{1}{x-4}=+\\infty$') }
        ],
        takeaway: say('Gaindigarria: limitea badago, baina ez dator bat $f(a)$ balioarekin, edo $f(a)$ ez dago. Jauzi finitua: alboko limiteak zenbaki desberdinak dira. Jauzi infinitua: alboko limiteren bat $\\pm\\infty$ da.', 'Evitable: el límite existe pero no coincide con $f(a)$ o $f(a)$ no existe. Salto finito: los laterales son números distintos. Salto infinito: algún lateral es $\\pm\\infty$.', 'قابل للإزالة: النهاية موجودة لكنها لا تساوي $f(a)$ أو $f(a)$ غير موجودة. قفزة منتهية: النهايتان الجانبيتان عددان مختلفان. قفزة لانهائية: إحدى النهايتين الجانبيتين $\\pm\\infty$.', 'Removable: the limit exists but does not match $f(a)$, or $f(a)$ does not exist. Finite jump: the one-sided limits are different numbers. Infinite jump: a one-sided limit is $\\pm\\infty$.'),
        figure: (language) => <ContinuityFigure language={language} />
    },
    {
        id: 'parameter',
        stage: 'continuity',
        title: say('Zatiak parametro batekin lotzea', 'Unir los trozos con un parámetro', 'وصل الأجزاء بوسيط', 'Joining the pieces with a parameter'),
        goal: say('Zatika definitutako funtzio bat jarraitua izateko parametroaren balioa aurkitzea, baita tarifa batean ere.', 'Hallar el valor de un parámetro para que una función a trozos sea continua, también en una tarifa.', 'إيجاد قيمة الوسيط لتكون الدالة المعرّفة على أجزاء متصلة، وكذلك في تعرفة.', 'Find the value of a parameter so that a piecewise function is continuous, also in a tariff.'),
        needs: [{ unit: FUNCTIONS, topic: 'piecewise-model', title: { eu: 'Enuntziatutik zatikako funtziora', es: 'Del enunciado a la función a trozos', en: 'From the statement to the piecewise function', ar: 'من نص المسألة إلى الدالة المعرّفة على أجزاء' } }],
        problem: say('Urak $C(x)=\\begin{cases}2x & 0\\le x\\le 10\\\\ 1{,}5x+k & x>10\\end{cases}$ euro balio du, $x$ metro kubikorengatik. Zer $k$ baliok saihesten du jauzia 10 metro kubikotan?', 'El agua cuesta $C(x)=\\begin{cases}2x & 0\\le x\\le 10\\\\ 1{,}5x+k & x>10\\end{cases}$ euros por $x$ metros cúbicos. ¿Qué valor de $k$ evita un salto en los 10 metros cúbicos?', 'يكلّف الماء $C(x)=\\begin{cases}2x & 0\\le x\\le 10\\\\ 1{,}5x+k & x>10\\end{cases}$ يورو مقابل $x$ متر مكعب. ما قيمة $k$ التي تمنع القفزة عند 10 أمتار مكعبة؟', 'Water costs $C(x)=\\begin{cases}2x & 0\\le x\\le 10\\\\ 1{,}5x+k & x>10\\end{cases}$ euros for $x$ cubic metres. Which value of $k$ avoids a jump at 10 cubic metres?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ezkerretik, lehen zatia.', 'Por la izquierda, el primer trozo.', 'من اليسار، الجزء الأول.', 'From the left, the first piece.'), math: same('$\\lim_{x\\to 10^-}2x=20$') },
            { text: say('Eskuinetik, bigarrena.', 'Por la derecha, el segundo.', 'من اليمين، الثاني.', 'From the right, the second.'), math: same('$\\lim_{x\\to 10^+}(1{,}5x+k)=15+k$') },
            { text: say('Berdindu biak.', 'Iguala los dos.', 'ساوِ بينهما.', 'Set them equal.'), math: same('$15+k=20\\ \\to\\ k=5$') }
        ],
        takeaway: say('Zatika definitutako funtzio bat lotura-puntuan jarraitua izan dadin, berdindu ezkerreko limitea, eskuineko limitea eta $f(a)$, eta askatu parametroa.', 'Para que una función a trozos sea continua en el punto de unión, iguala el límite por la izquierda, el límite por la derecha y $f(a)$, y despeja el parámetro.', 'لتكون الدالة المعرّفة على أجزاء متصلة عند نقطة الوصل ساوِ بين النهاية من اليسار والنهاية من اليمين و$f(a)$، ثم اعزل الوسيط.', 'For a piecewise function to be continuous at the joining point, set the limit from the left, the limit from the right and $f(a)$ equal, and solve for the parameter.'),
        figure: (language) => <TariffFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 5. Asymptotes and branches ---------- */
    {
        id: 'vertical-horizontal',
        stage: 'asymptotes',
        title: say('Asintota bertikalak eta horizontalak', 'Asíntotas verticales y horizontales', 'المقاربات الرأسية والأفقية', 'Vertical and horizontal asymptotes'),
        goal: say('Zatidura baten asintota bertikalak eta horizontalak aurkitzea, eta kurba nondik doan jakitea.', 'Hallar las asíntotas verticales y horizontales de un cociente y saber por dónde va la curva.', 'إيجاد المقاربات الرأسية والأفقية لخارج قسمة ومعرفة موضع المنحنى.', 'Find the vertical and horizontal asymptotes of a quotient and know where the curve runs.'),
        needs: [{ unit: FUNCTIONS, topic: 'average-cost', title: { eu: 'Batez besteko kostua eta hiperbola lekualdatuak', es: 'Coste medio e hipérbolas trasladadas', en: 'Average cost and shifted hyperbolas', ar: 'التكلفة المتوسطة والقطوع الزائدة المنسحبة' } }],
        problem: say('Aurkitu $f(x)=\\frac{3x-2}{x+1}$ funtzioaren asintotak, eta kurbak horizontalarekiko duen posizioa.', 'Halla las asíntotas de $f(x)=\\frac{3x-2}{x+1}$ y la posición de la curva respecto de la horizontal.', 'أوجد مقاربات $f(x)=\\frac{3x-2}{x+1}$ وموضع المنحنى بالنسبة إلى المقارب الأفقي.', 'Find the asymptotes of $f(x)=\\frac{3x-2}{x+1}$ and the position of the curve with respect to the horizontal one.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bertikala, izendatzailea anulatzen den lekuan (zenbakitzailea ez).', 'Vertical donde se anula el denominador (y no el numerador).', 'الرأسي حيث ينعدم المقام (لا البسط).', 'Vertical where the denominator is 0 (and the numerator is not).'), math: same('$x+1=0\\ \\to\\ x=-1$') },
            { text: say('Horizontala: infinituko limitea.', 'Horizontal: el límite en el infinito.', 'الأفقي: النهاية عند اللانهاية.', 'Horizontal: the limit at infinity.'), math: same('$\\lim_{x\\to\\pm\\infty}\\frac{3x-2}{x+1}=3$') },
            { text: say('Kendu asintota: $x>-1$ denean negatiboa da (azpitik); $x<-1$ denean, positiboa (gainetik).', 'Resta la asíntota: si $x>-1$ es negativo (debajo); si $x<-1$, positivo (encima).', 'اطرح المقارب: إذا $x>-1$ فهو سالب (تحت)، وإذا $x<-1$ فهو موجب (فوق).', 'Subtract the asymptote: if $x>-1$ it is negative (below); if $x<-1$, positive (above).'), math: same('$f(x)-3=\\frac{-5}{x+1}$') }
        ],
        takeaway: say('$x=a$ asintota bertikala da $x\\to a$ denean $f(x)\\to\\pm\\infty$ bada; $y=L$ horizontala da $x\\to\\pm\\infty$ denean $f(x)\\to L$ bada. $f(x)-L$ adierazpenaren zeinuak esaten du kurba gainetik ala azpitik doan.', '$x=a$ es asíntota vertical si $f(x)\\to\\pm\\infty$ cuando $x\\to a$; $y=L$ es horizontal si $f(x)\\to L$ cuando $x\\to\\pm\\infty$. El signo de $f(x)-L$ dice si la curva va por encima o por debajo.', '$x=a$ مقارب رأسي إذا $f(x)\\to\\pm\\infty$ عندما $x\\to a$، و$y=L$ أفقي إذا $f(x)\\to L$ عندما $x\\to\\pm\\infty$. وإشارة $f(x)-L$ تقول هل المنحنى فوق أم تحت.', '$x=a$ is a vertical asymptote if $f(x)\\to\\pm\\infty$ as $x\\to a$; $y=L$ is horizontal if $f(x)\\to L$ as $x\\to\\pm\\infty$. The sign of $f(x)-L$ tells whether the curve is above or below.'),
        figure: (language) => <HorizontalFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'oblique',
        stage: 'asymptotes',
        title: say('Asintota zeiharrak', 'Asíntotas oblicuas', 'المقاربات المائلة', 'Oblique asymptotes'),
        goal: say('Goian maila bat gehiago duen zatidura baten asintota zeiharra aurkitzea.', 'Hallar la asíntota oblicua de un cociente con un grado más arriba.', 'إيجاد المقارب المائل لخارج قسمة تزيد درجة بسطه بواحد.', 'Find the oblique asymptote of a quotient with one degree more on top.'),
        needs: [{ unit: POLYNOMIALS, topic: 'long-division', title: { eu: 'Polinomioen zatiketa', es: 'División de polinomios', en: 'Polynomial division', ar: 'قسمة الحدوديات' } }],
        problem: say('Aurkitu $f(x)=\\frac{x^2+x-1}{x-1}$ funtzioaren asintotak.', 'Halla las asíntotas de $f(x)=\\frac{x^2+x-1}{x-1}$.', 'أوجد مقاربات $f(x)=\\frac{x^2+x-1}{x-1}$.', 'Find the asymptotes of $f(x)=\\frac{x^2+x-1}{x-1}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bertikala.', 'Vertical.', 'الرأسي.', 'Vertical.'), math: same('$x-1=0\\ \\to\\ x=1$') },
            { text: say('Goian maila bat gehiago: zatitu.', 'Un grado más arriba: divide.', 'درجة زائدة في البسط: اقسم.', 'One degree more on top: divide.'), math: same('$\\frac{x^2+x-1}{x-1}=x+2+\\frac{1}{x-1}$') },
            { text: say('Hondarra 0 baliora doa: zeiharra zatidura da.', 'El resto va a 0: la oblicua es el cociente.', 'الباقي يتجه إلى 0: المائل هو خارج القسمة.', 'The remainder goes to 0: the oblique one is the quotient.'), math: same('$y=x+2$') }
        ],
        takeaway: say('Zenbakitzaileak izendatzaileak baino maila bat gehiago badu, zatitu: $y=mx+n$ zatidura asintota zeiharra da, hondarra zati zatitzailea 0 baliora doalako.', 'Si el numerador tiene un grado más que el denominador, divide: el cociente $y=mx+n$ es la asíntota oblicua, porque el resto entre el divisor tiende a 0.', 'إذا زادت درجة البسط على درجة المقام بواحد فاقسم: خارج القسمة $y=mx+n$ هو المقارب المائل، لأن الباقي على المقسوم عليه يتجه إلى 0.', 'If the numerator has one degree more than the denominator, divide: the quotient $y=mx+n$ is the oblique asymptote, because the remainder over the divisor tends to 0.'),
        figure: (language) => <SlantFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'branches',
        stage: 'asymptotes',
        title: say('Adar parabolikoak', 'Ramas parabólicas', 'الفروع المكافئة', 'Parabolic branches'),
        goal: say('Asintotarik gabeko adar infinituak ezagutzea, eta funtzio baten adar guztiak deskribatzea.', 'Reconocer las ramas infinitas sin asíntota y describir todas las ramas de una función.', 'التعرف على الفروع اللانهائية دون مقارب ووصف كل فروع الدالة.', 'Recognise the infinite branches with no asymptote and describe all the branches of a function.'),
        needs: [{ unit: EXPONENTIAL, topic: 'exp-graph', title: { eu: 'Funtzio esponentziala', es: 'La función exponencial', en: 'The exponential function', ar: 'الدالة الأسية' } }],
        problem: say('Deskribatu $f(x)=\\frac{x^3+1}{x}$ funtzioaren adar infinituak.', 'Describe las ramas infinitas de $f(x)=\\frac{x^3+1}{x}$.', 'صِف الفروع اللانهائية لـ $f(x)=\\frac{x^3+1}{x}$.', 'Describe the infinite branches of $f(x)=\\frac{x^3+1}{x}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bertikala $x=0$ zuzenean.', 'Vertical en $x=0$.', 'رأسي عند $x=0$.', 'Vertical at $x=0$.'), math: same('$\\lim_{x\\to 0^+}\\frac{x^3+1}{x}=+\\infty$') },
            { text: say('Goian bi maila gehiago: ez horizontala, ez zeiharra.', 'Dos grados más arriba: ni horizontal ni oblicua.', 'درجتان زائدتان في البسط: لا أفقي ولا مائل.', 'Two degrees more on top: neither horizontal nor oblique.'), math: same('$\\frac{x^3+1}{x}=x^2+\\frac{1}{x}$') },
            { text: say('$y=x^2$ parabolaren antzekoa da: adar parabolikoak bi aldeetan.', 'Se parece a $y=x^2$: ramas parabólicas a los dos lados.', 'تشبه $y=x^2$: فرعان مكافئان على الجانبين.', 'It looks like $y=x^2$: parabolic branches on both sides.'), math: same('$\\lim_{x\\to\\pm\\infty}f(x)=+\\infty$') }
        ],
        takeaway: say('Asintotarik gabeko adar infinitua adar parabolikoa da: 2 mailako edo handiagoko polinomioekin gertatzen da, goian bi maila gehiago dituzten zatidurekin, eta $a^x$ funtzioarekin $+\\infty$ aldean, $a>1$ bada.', 'Una rama infinita sin asíntota es una rama parabólica: pasa con los polinomios de grado 2 o más, con los cocientes con dos grados más arriba y con $a^x$ en $+\\infty$ si $a>1$.', 'الفرع اللانهائي دون مقارب فرع مكافئ: يحدث مع الحدوديات من الدرجة 2 أو أكثر، ومع خوارج القسمة التي تزيد درجة بسطها باثنتين، ومع $a^x$ عند $+\\infty$ إذا $a>1$.', 'An infinite branch with no asymptote is a parabolic branch: it happens with polynomials of degree 2 or more, with quotients with two degrees more on top and with $a^x$ at $+\\infty$ if $a>1$.'),
        figure: (language) => <BranchesFigure language={language} />,
        figureAfterSteps: true
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const socLimitsTopics: UnitTopic[] = baseTopics.map((topic) => ({
    ...topic,
    ...socLimitsLessonTexts[topic.id as SocLimitsTopicId],
    ...socLimitsLessonChecks[topic.id as SocLimitsTopicId]
}))
