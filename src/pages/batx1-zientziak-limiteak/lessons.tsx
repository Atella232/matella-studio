import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { same, say } from '../batx1-zientziak-funtzioak/text'
import { ContinuityFigure } from '../dbh4-aplikatuak-funtzioak/figures'
import { ApproachFigure, AsymptotesFigure, BolzanoFigure, ContinuousJoinFigure, FormsFigure, HoleFigure, ObliqueFigure, OneSidedFigure, TendsFigure, VerticalAsymptoteFigure } from './figures'
import { bachLimitsLessonChecks, type BachLimitsTopicId } from './lessonChecks'
import { bachLimitsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Limiteak eta jarraitutasuna · Batxilergoa 1 · Zientziak — stages and
   lessons. The scope follows unit 9 of Santillana 1.º Bachillerato
   Ciencias, in its order (limits at a point and at infinity with their
   indeterminate forms, asymptotes, continuity and Bolzano), with unit 11
   of Anaya Matemáticas I (one-sided limits of piecewise functions,
   infinite branches of rational functions). Limits of sequences and the
   number e come from Sucesiones; discontinuities and asymptotes of
   hyperbolas from 4. DBH académicas; they are linked as «Review first».
   ========================================================================== */

export type BachLimitsStageId = 'point' | 'calculus' | 'infinity' | 'asymptotes' | 'continuity'

export const bachLimitsStages: UnitStage[] = [
    { id: 'point', tone: 'blue', title: { eu: 'Limitea puntu batean', es: 'Límite en un punto', en: 'The limit at a point', ar: 'النهاية عند نقطة' } },
    { id: 'calculus', tone: 'violet', title: { eu: 'Limiteak puntu batean kalkulatzea', es: 'Calcular límites en un punto', en: 'Working out limits at a point', ar: 'حساب النهايات عند نقطة' } },
    { id: 'infinity', tone: 'mustard', title: { eu: 'Limiteak infinituan', es: 'Límites en el infinito', en: 'Limits at infinity', ar: 'النهايات عند اللانهاية' } },
    { id: 'asymptotes', tone: 'coral', title: { eu: 'Asintotak', es: 'Asíntotas', en: 'Asymptotes', ar: 'المقاربات' } },
    { id: 'continuity', tone: 'green', title: { eu: 'Jarraitutasuna', es: 'Continuidad', en: 'Continuity', ar: 'الاتصال' } }
]

const SEQUENCES = 'batx1-zientziak/sucesiones'
const FUNCTIONS = 'batx1-zientziak/funciones'

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. The limit at a point ---------- */
    {
        id: 'idea',
        stage: 'point',
        title: say('Limitearen ideia', 'La idea de límite', 'فكرة النهاية', 'The idea of a limit'),
        goal: say('Funtzio baten limitea puntu batean ulertzea, balio-taula batekin, eta $f(a)$ balioarekin ez nahastea.', 'Entender el límite de una función en un punto con una tabla de valores, sin confundirlo con $f(a)$.', 'فهم نهاية دالة عند نقطة بجدول قيم دون خلطها بـ $f(a)$.', 'Understand the limit of a function at a point with a table of values, without mixing it up with $f(a)$.'),
        needs: [
            { unit: SEQUENCES, topic: 'converge', title: { eu: 'Zenbaki batera hurbiltzen den segida', es: 'Una sucesión que se acerca a un número', en: 'A sequence that approaches a number', ar: 'متتالية تقترب من عدد' } },
            { unit: 'batx1-zientziak/numeros-reales', topic: 'neighbourhoods', title: { eu: 'Inguruneak', es: 'Entornos', en: 'Neighbourhoods', ar: 'الجوارات' } }
        ],
        problem: say('$f(x)=x+1$ da $x\\neq 2$ denean, eta $f(2)=5$. Zenbat da $\\lim_{x\\to 2}f(x)$?', 'Sea $f(x)=x+1$ si $x\\neq 2$ y $f(2)=5$. ¿Cuánto vale $\\lim_{x\\to 2}f(x)$?', 'لتكن $f(x)=x+1$ إذا كان $x\\neq 2$ و$f(2)=5$. كم تساوي $\\lim_{x\\to 2}f(x)$؟', 'Let $f(x)=x+1$ if $x\\neq 2$ and $f(2)=5$. What is $\\lim_{x\\to 2}f(x)$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ezkerretik hurbildu.', 'Acércate por la izquierda.', 'اقترب من اليسار.', 'Approach from the left.'), math: same('$f(1{,}9)=2{,}9\\qquad f(1{,}99)=2{,}99$') },
            { text: say('Eskuinetik hurbildu.', 'Acércate por la derecha.', 'اقترب من اليمين.', 'Approach from the right.'), math: same('$f(2{,}1)=3{,}1\\qquad f(2{,}01)=3{,}01$') },
            { text: say('Bi aldeak 3 baliora doaz, nahiz eta $f(2)=5$ izan.', 'Los dos lados van a 3, aunque $f(2)=5$.', 'يتجه الجانبان إلى 3 مع أن $f(2)=5$.', 'Both sides go to 3, even though $f(2)=5$.'), math: same('$\\lim_{x\\to 2}f(x)=3$') }
        ],
        takeaway: say('$\\lim_{x\\to a}f(x)$ limiteak $x$ aldagaia $a$ baliotik hurbil dagoenean $f(x)$ funtzioak zer egiten duen esaten du, bi aldeetatik. Ez du axola $f(a)$ zer den, edo existitzen ez bada.', '$\\lim_{x\\to a}f(x)$ dice qué hace $f(x)$ cuando $x$ está cerca de $a$, por los dos lados. No importa lo que valga $f(a)$, ni si existe.', '$\\lim_{x\\to a}f(x)$ تقول ماذا تفعل $f(x)$ عندما يكون $x$ قرب $a$ من الجانبين. ولا تهم قيمة $f(a)$ ولا وجودها.', '$\\lim_{x\\to a}f(x)$ tells what $f(x)$ does when $x$ is near $a$, from both sides. It does not matter what $f(a)$ is, or whether it exists.'),
        figure: (language) => <ApproachFigure language={language} />
    },
    {
        id: 'one-sided',
        stage: 'point',
        title: say('Alboko limiteak', 'Límites laterales', 'النهايتان الجانبيتان', 'One-sided limits'),
        goal: say('Ezkerreko eta eskuineko limiteak kalkulatzea, batez ere zatika definitutako funtzioetan, eta limitea dagoen erabakitzea.', 'Calcular los límites por la izquierda y por la derecha, sobre todo en funciones a trozos, y decidir si existe el límite.', 'حساب النهايتين من اليسار ومن اليمين، خاصة في الدوال المعرّفة على أجزاء، وتحديد هل توجد النهاية.', 'Work out the limits from the left and from the right, above all in piecewise functions, and decide whether the limit exists.'),
        needs: [
            { unit: FUNCTIONS, topic: 'piecewise', title: { eu: 'Zatika definitutako funtzioak marraztea', es: 'Dibujar funciones a trozos', en: 'Drawing piecewise functions', ar: 'رسم الدوال المعرّفة على أجزاء' } }
        ],
        problem: say('Kalkulatu $x=1$ puntuko alboko limiteak funtzio honetan: $f(x)=\\begin{cases}x^2 & x<1\\\\ 3-x & x\\ge 1\\end{cases}$', 'Halla los límites laterales en $x=1$ de esta función: $f(x)=\\begin{cases}x^2 & x<1\\\\ 3-x & x\\ge 1\\end{cases}$', 'أوجد النهايتين الجانبيتين عند $x=1$ لهذه الدالة: $f(x)=\\begin{cases}x^2 & x<1\\\\ 3-x & x\\ge 1\\end{cases}$', 'Find the one-sided limits at $x=1$ of this function: $f(x)=\\begin{cases}x^2 & x<1\\\\ 3-x & x\\ge 1\\end{cases}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ezkerretik, lehen zatia.', 'Por la izquierda, el primer trozo.', 'من اليسار، الجزء الأول.', 'From the left, the first piece.'), math: same('$\\lim_{x\\to 1^-}x^2=1$') },
            { text: say('Eskuinetik, bigarren zatia.', 'Por la derecha, el segundo trozo.', 'من اليمين، الجزء الثاني.', 'From the right, the second piece.'), math: same('$\\lim_{x\\to 1^+}(3-x)=2$') },
            { text: say('Ez datoz bat: funtzioak jauzi egiten du, eta ez dago limiterik.', 'No coinciden: la función salta y no hay límite.', 'لا تتساويان: الدالة تقفز ولا توجد نهاية.', 'They do not match: the function jumps and there is no limit.') }
        ],
        takeaway: say('Limitea $a$ puntuan bi alboko limiteak berdinak direnean bakarrik dago: $\\lim_{x\\to a^-}f(x)=\\lim_{x\\to a^+}f(x)$.', 'El límite en $a$ existe solo si los dos límites laterales coinciden: $\\lim_{x\\to a^-}f(x)=\\lim_{x\\to a^+}f(x)$.', 'لا توجد النهاية عند $a$ إلا إذا تساوت النهايتان الجانبيتان: $\\lim_{x\\to a^-}f(x)=\\lim_{x\\to a^+}f(x)$.', 'The limit at $a$ exists only if the two one-sided limits are equal: $\\lim_{x\\to a^-}f(x)=\\lim_{x\\to a^+}f(x)$.'),
        figure: (language) => <OneSidedFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'infinite',
        stage: 'point',
        title: say('Limite infinituak', 'Límites infinitos', 'النهايات اللانهائية', 'Infinite limits'),
        goal: say('$\\frac{k}{0}$ motako limiteak kalkulatzea, alde bakoitzeko zeinua aztertuz, eta asintota bertikalak aurkitzea.', 'Calcular límites del tipo $\\frac{k}{0}$ estudiando el signo a cada lado, y encontrar asíntotas verticales.', 'حساب نهايات من النوع $\\frac{k}{0}$ بدراسة الإشارة على كل جانب، وإيجاد المقاربات الرأسية.', 'Work out limits of the kind $\\frac{k}{0}$ by studying the sign on each side, and find vertical asymptotes.'),
        needs: [
            { unit: SEQUENCES, topic: 'infinite-limits', title: { eu: 'Infinitura doa edo oszilatzen du', es: 'Tiende a infinito u oscila', en: 'Goes to infinity or oscillates', ar: 'تتجه إلى اللانهاية أو تتذبذب' } },
            { unit: 'dbh4-akademikoak/funciones-polinomicas-racionales', topic: 'hyperbola-shift', title: { eu: 'Hiperbolen lekualdaketak', es: 'Traslaciones de hipérbolas', en: 'Translations of hyperbolas', ar: 'انسحابات القطوع الزائدة' } }
        ],
        problem: say('Kalkulatu $\\lim_{x\\to 2}\\frac{3}{x-2}$.', 'Calcula $\\lim_{x\\to 2}\\frac{3}{x-2}$.', 'احسب $\\lim_{x\\to 2}\\frac{3}{x-2}$.', 'Work out $\\lim_{x\\to 2}\\frac{3}{x-2}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordezkatuz gero, $\\frac{3}{0}$: limite infinitua.', 'Al sustituir sale $\\frac{3}{0}$: límite infinito.', 'بالتعويض نجد $\\frac{3}{0}$: نهاية لانهائية.', 'Substituting gives $\\frac{3}{0}$: an infinite limit.') },
            { text: say('Ezkerrean $x-2<0$; eskuinean $x-2>0$.', 'A la izquierda $x-2<0$; a la derecha $x-2>0$.', 'إلى اليسار $x-2<0$، وإلى اليمين $x-2>0$.', 'To the left $x-2<0$; to the right $x-2>0$.'), math: same('$\\lim_{x\\to 2^-}\\frac{3}{x-2}=-\\infty\\qquad\\lim_{x\\to 2^+}\\frac{3}{x-2}=+\\infty$') },
            { text: say('Ez dago limiterik, baina $x=2$ asintota bertikala da.', 'No hay límite, pero $x=2$ es una asíntota vertical.', 'لا توجد نهاية، لكن $x=2$ مقارب رأسي.', 'There is no limit, but $x=2$ is a vertical asymptote.') }
        ],
        takeaway: say('$\\frac{k}{0}$ ateratzen bada, $k\\neq 0$ izanik, limitea $+\\infty$ edo $-\\infty$ da alde bakoitzean, izendatzailearen zeinuaren arabera; $x=a$ asintota bertikala da.', 'Si sale $\\frac{k}{0}$ con $k\\neq 0$, el límite es $+\\infty$ o $-\\infty$ a cada lado, según el signo del denominador; $x=a$ es una asíntota vertical.', 'إذا ظهرت $\\frac{k}{0}$ مع $k\\neq 0$ فالنهاية $+\\infty$ أو $-\\infty$ على كل جانب حسب إشارة المقام، و$x=a$ مقارب رأسي.', 'If $\\frac{k}{0}$ appears with $k\\neq 0$, the limit is $+\\infty$ or $-\\infty$ on each side, according to the sign of the denominator; $x=a$ is a vertical asymptote.'),
        figure: (language) => <VerticalAsymptoteFigure language={language} />
    },

    /* ---------- 2. Working out limits at a point ---------- */
    {
        id: 'substitute',
        stage: 'calculus',
        title: say('Ordezkatu eta infinituekin kalkulatu', 'Sustituir y operar con infinitos', 'التعويض والحساب مع اللانهاية', 'Substituting and working with infinity'),
        goal: say('Funtzio jarraituen limiteak ordezkatuz kalkulatzea, infinituekin eragiketak egitea eta indeterminazioak ezagutzea.', 'Calcular límites de funciones continuas sustituyendo, operar con infinitos y reconocer las indeterminaciones.', 'حساب نهايات الدوال المتصلة بالتعويض، والحساب مع اللانهاية، والتعرف على حالات عدم التعيين.', 'Work out limits of continuous functions by substituting, operate with infinity and recognise the indeterminate forms.'),
        needs: [
            { unit: FUNCTIONS, topic: 'domain', title: { eu: 'Izate-eremua: baldintza guztiak batera', es: 'Dominio: todas las condiciones a la vez', en: 'Domain: every condition at once', ar: 'المجال: كل الشروط معًا' } }
        ],
        problem: say('Kalkulatu $\\lim_{x\\to 3}\\frac{x^2+1}{x-1}$.', 'Calcula $\\lim_{x\\to 3}\\frac{x^2+1}{x-1}$.', 'احسب $\\lim_{x\\to 3}\\frac{x^2+1}{x-1}$.', 'Work out $\\lim_{x\\to 3}\\frac{x^2+1}{x-1}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izendatzailea ez da 0 puntu horretan: funtzioa jarraitua da.', 'El denominador no se anula en 3: la función es continua ahí.', 'لا ينعدم المقام عند 3: الدالة متصلة هناك.', 'The denominator is not 0 at 3: the function is continuous there.') },
            { text: say('Ordezkatu.', 'Sustituye.', 'عوّض.', 'Substitute.'), math: same('$\\frac{3^2+1}{3-1}=\\frac{10}{2}=5$') },
            { text: say('Indeterminaziorik ez: limitea 5 da.', 'No hay indeterminación: el límite es 5.', 'لا عدم تعيين: النهاية 5.', 'No indeterminate form: the limit is 5.') }
        ],
        takeaway: say('Funtzioa jarraitua bada, ordezkatu. $\\frac{k}{\\infty}=0$ eta $k+\\infty=\\infty$ badakigu; $\\frac{0}{0}$, $\\frac{\\infty}{\\infty}$, $\\infty-\\infty$, $0\\cdot\\infty$ eta $1^{\\infty}$ indeterminazioak dira.', 'Si la función es continua, sustituye. $\\frac{k}{\\infty}=0$ y $k+\\infty=\\infty$ se saben; $\\frac{0}{0}$, $\\frac{\\infty}{\\infty}$, $\\infty-\\infty$, $0\\cdot\\infty$ y $1^{\\infty}$ son indeterminaciones.', 'إذا كانت الدالة متصلة فعوّض. $\\frac{k}{\\infty}=0$ و$k+\\infty=\\infty$ معلومتان؛ أما $\\frac{0}{0}$ و$\\frac{\\infty}{\\infty}$ و$\\infty-\\infty$ و$0\\cdot\\infty$ و$1^{\\infty}$ فحالات عدم تعيين.', 'If the function is continuous, substitute. $\\frac{k}{\\infty}=0$ and $k+\\infty=\\infty$ are known; $\\frac{0}{0}$, $\\frac{\\infty}{\\infty}$, $\\infty-\\infty$, $0\\cdot\\infty$ and $1^{\\infty}$ are indeterminate.'),
        figure: (language) => <FormsFigure language={language} />
    },
    {
        id: 'zero-zero',
        stage: 'calculus',
        title: say('Zero zati zero: faktorizatu', 'Cero entre cero: factorizar', 'صفر على صفر: التحليل', 'Zero over zero: factorising'),
        goal: say('$\\frac{0}{0}$ indeterminazioa polinomioen zatiduretan ebaztea, faktorizatuz eta faktore komuna sinplifikatuz.', 'Resolver la indeterminación $\\frac{0}{0}$ en cocientes de polinomios factorizando y simplificando el factor común.', 'حل حالة عدم التعيين $\\frac{0}{0}$ في خوارج قسمة الحدوديات بالتحليل واختصار العامل المشترك.', 'Resolve the indeterminate form $\\frac{0}{0}$ in quotients of polynomials by factorising and cancelling the common factor.'),
        needs: [
            { unit: 'dbh4-akademikoak/polinomios-fracciones', topic: 'factorize', title: { eu: 'Polinomioak faktorizatzea', es: 'Factorizar polinomios', en: 'Factorising polynomials', ar: 'تحليل الحدوديات' } },
            { unit: 'dbh4-akademikoak/polinomios-fracciones', topic: 'simplify', title: { eu: 'Zatiki aljebraikoak sinplifikatzea', es: 'Simplificar fracciones algebraicas', en: 'Simplifying algebraic fractions', ar: 'تبسيط الكسور الجبرية' } }
        ],
        problem: say('Kalkulatu $\\lim_{x\\to 3}\\frac{x^2-9}{x^2-3x}$.', 'Calcula $\\lim_{x\\to 3}\\frac{x^2-9}{x^2-3x}$.', 'احسب $\\lim_{x\\to 3}\\frac{x^2-9}{x^2-3x}$.', 'Work out $\\lim_{x\\to 3}\\frac{x^2-9}{x^2-3x}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordezkatuz gero, $\\frac{0}{0}$.', 'Al sustituir sale $\\frac{0}{0}$.', 'بالتعويض نجد $\\frac{0}{0}$.', 'Substituting gives $\\frac{0}{0}$.'), math: same('$\\frac{9-9}{9-9}$') },
            { text: say('Faktorizatu eta sinplifikatu $x-3$.', 'Factoriza y simplifica $x-3$.', 'حلّل واختصر $x-3$.', 'Factorise and cancel $x-3$.'), math: same('$\\frac{(x-3)(x+3)}{x(x-3)}=\\frac{x+3}{x}$') },
            { text: say('Ordezkatu berriro.', 'Vuelve a sustituir.', 'عوّض من جديد.', 'Substitute again.'), math: same('$\\frac{3+3}{3}=2$') }
        ],
        takeaway: say('$\\frac{0}{0}$ ateratzen bada, $(x-a)$ bi polinomioen faktorea da: faktorizatu, sinplifikatu eta ordezkatu berriro.', 'Si sale $\\frac{0}{0}$, $(x-a)$ es factor de los dos polinomios: factoriza, simplifica y vuelve a sustituir.', 'إذا ظهرت $\\frac{0}{0}$ فإن $(x-a)$ عامل في الحدوديتين: حلّل واختصر ثم عوّض من جديد.', 'If $\\frac{0}{0}$ appears, $(x-a)$ is a factor of both polynomials: factorise, cancel and substitute again.'),
        figure: (language) => <HoleFigure language={language} kind="factor" />,
        figureAfterSteps: true
    },
    {
        id: 'roots',
        stage: 'calculus',
        title: say('Erroak: konjokatuaz biderkatu', 'Raíces: multiplicar por el conjugado', 'الجذور: الضرب في المرافق', 'Roots: multiplying by the conjugate'),
        goal: say('Erroak dituen $\\frac{0}{0}$ indeterminazioa ebaztea, konjokatuaz biderkatuz.', 'Resolver la indeterminación $\\frac{0}{0}$ con raíces multiplicando por el conjugado.', 'حل حالة عدم التعيين $\\frac{0}{0}$ مع الجذور بالضرب في المرافق.', 'Resolve the indeterminate form $\\frac{0}{0}$ with roots by multiplying by the conjugate.'),
        needs: [
            { unit: 'dbh4-akademikoak/potencias-radicales', topic: 'conjugate', title: { eu: 'Konjokatua', es: 'El conjugado', en: 'The conjugate', ar: 'المرافق' } }
        ],
        problem: say('Kalkulatu $\\lim_{x\\to 4}\\frac{\\sqrt{x}-2}{x-4}$.', 'Calcula $\\lim_{x\\to 4}\\frac{\\sqrt{x}-2}{x-4}$.', 'احسب $\\lim_{x\\to 4}\\frac{\\sqrt{x}-2}{x-4}$.', 'Work out $\\lim_{x\\to 4}\\frac{\\sqrt{x}-2}{x-4}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordezkatuz gero, $\\frac{0}{0}$. Biderkatu goian eta behean $\\sqrt{x}+2$ adierazpenaz.', 'Sale $\\frac{0}{0}$. Multiplica arriba y abajo por $\\sqrt{x}+2$.', 'تظهر $\\frac{0}{0}$. اضرب البسط والمقام في $\\sqrt{x}+2$.', 'It gives $\\frac{0}{0}$. Multiply top and bottom by $\\sqrt{x}+2$.') },
            { text: say('Goian, batura bider kendura.', 'Arriba, suma por diferencia.', 'في البسط مجموع في فرق.', 'On top, sum times difference.'), math: same('$\\frac{x-4}{(x-4)(\\sqrt{x}+2)}=\\frac{1}{\\sqrt{x}+2}$') },
            { text: say('Ordezkatu berriro.', 'Vuelve a sustituir.', 'عوّض من جديد.', 'Substitute again.'), math: same('$\\frac{1}{\\sqrt{4}+2}=\\frac{1}{4}$') }
        ],
        takeaway: say('Erroekin $\\frac{0}{0}$ ateratzen bada, biderkatu eta zatitu konjokatuaz: $(\\sqrt{A}-b)(\\sqrt{A}+b)=A-b^2$ eginda, erroa desagertzen da.', 'Si sale $\\frac{0}{0}$ con raíces, multiplica y divide por el conjugado: con $(\\sqrt{A}-b)(\\sqrt{A}+b)=A-b^2$ desaparece la raíz.', 'إذا ظهرت $\\frac{0}{0}$ مع الجذور فاضرب واقسم على المرافق: مع $(\\sqrt{A}-b)(\\sqrt{A}+b)=A-b^2$ يختفي الجذر.', 'If $\\frac{0}{0}$ comes with roots, multiply and divide by the conjugate: with $(\\sqrt{A}-b)(\\sqrt{A}+b)=A-b^2$ the root disappears.'),
        figure: (language) => <HoleFigure language={language} kind="root" />,
        figureAfterSteps: true
    },

    /* ---------- 3. Limits at infinity ---------- */
    {
        id: 'degrees',
        stage: 'infinity',
        title: say('Polinomioen zatidurak infinituan', 'Cocientes de polinomios en el infinito', 'خوارج قسمة الحدوديات عند اللانهاية', 'Quotients of polynomials at infinity'),
        goal: say('Polinomioen zatiduren limitea kalkulatzea $x\\to\\pm\\infty$ denean, mailak konparatuz.', 'Calcular el límite de cocientes de polinomios cuando $x\\to\\pm\\infty$ comparando los grados.', 'حساب نهاية خوارج قسمة الحدوديات عندما $x\\to\\pm\\infty$ بمقارنة الدرجات.', 'Work out the limit of quotients of polynomials as $x\\to\\pm\\infty$ by comparing the degrees.'),
        needs: [
            { unit: SEQUENCES, topic: 'quotient-limits', title: { eu: 'Polinomioen zatiduraren limitea', es: 'Límite de un cociente de polinomios', en: 'Limit of a quotient of polynomials', ar: 'نهاية خارج قسمة كثيرتي حدود' } }
        ],
        problem: say('Kalkulatu $\\lim_{x\\to+\\infty}\\frac{3x^2-x}{x^2+5}$.', 'Calcula $\\lim_{x\\to+\\infty}\\frac{3x^2-x}{x^2+5}$.', 'احسب $\\lim_{x\\to+\\infty}\\frac{3x^2-x}{x^2+5}$.', 'Work out $\\lim_{x\\to+\\infty}\\frac{3x^2-x}{x^2+5}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$\\frac{\\infty}{\\infty}$ da: indeterminazioa.', 'Es $\\frac{\\infty}{\\infty}$: una indeterminación.', 'إنها $\\frac{\\infty}{\\infty}$: حالة عدم تعيين.', 'It is $\\frac{\\infty}{\\infty}$: an indeterminate form.') },
            { text: say('Maila handieneko gaiek agintzen dute.', 'Mandan los términos de mayor grado.', 'تتحكم الحدود ذات الدرجة الكبرى.', 'The terms of highest degree rule.'), math: same('$\\frac{3x^2}{x^2}=3$') },
            { text: say('Maila bera: koefizienteen zatidura.', 'Mismo grado: el cociente de los coeficientes.', 'الدرجة نفسها: خارج قسمة المعاملين.', 'Same degree: the quotient of the coefficients.'), math: same('$\\lim_{x\\to+\\infty}\\frac{3x^2-x}{x^2+5}=3$') }
        ],
        takeaway: say('$x\\to\\pm\\infty$ denean, konparatu mailak: goikoa txikiagoa, 0; berdinak, gai nagusien koefizienteen zatidura; goikoa handiagoa, $\\pm\\infty$.', 'Cuando $x\\to\\pm\\infty$, compara los grados: arriba menor, 0; iguales, el cociente de los coeficientes principales; arriba mayor, $\\pm\\infty$.', 'عندما $x\\to\\pm\\infty$ قارن الدرجات: البسط أصغر، 0؛ متساويتان، خارج قسمة المعاملين الرئيسيين؛ البسط أكبر، $\\pm\\infty$.', 'As $x\\to\\pm\\infty$, compare the degrees: top lower, 0; equal, the quotient of the leading coefficients; top higher, $\\pm\\infty$.'),
        figure: (language) => <TendsFigure language={language} kind="degrees" />
    },
    {
        id: 'infinity-minus',
        stage: 'infinity',
        title: say('Infinitu ken infinitu', 'Infinito menos infinito', 'لانهاية ناقص لانهاية', 'Infinity minus infinity'),
        goal: say('$\\infty-\\infty$ indeterminazioa ebaztea, izendatzaile komunera eramanez edo konjokatuaz biderkatuz.', 'Resolver la indeterminación $\\infty-\\infty$ con denominador común o multiplicando por el conjugado.', 'حل حالة عدم التعيين $\\infty-\\infty$ بتوحيد المقامات أو بالضرب في المرافق.', 'Resolve the indeterminate form $\\infty-\\infty$ with a common denominator or by multiplying by the conjugate.'),
        needs: [
            { unit: 'dbh4-akademikoak/potencias-radicales', topic: 'conjugate', title: { eu: 'Konjokatua', es: 'El conjugado', en: 'The conjugate', ar: 'المرافق' } }
        ],
        problem: say('Kalkulatu $\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+6x}-x\\right)$', 'Calcula $\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+6x}-x\\right)$', 'احسب $\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+6x}-x\\right)$', 'Work out $\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+6x}-x\\right)$'),
        stepsKind: 'steps',
        steps: [
            { text: say('$\\infty-\\infty$ da. Biderkatu eta zatitu konjokatuaz.', 'Es $\\infty-\\infty$. Multiplica y divide por el conjugado.', 'إنها $\\infty-\\infty$. اضرب واقسم على المرافق.', 'It is $\\infty-\\infty$. Multiply and divide by the conjugate.') },
            { text: say('Kendura zatidura bihurtzen da.', 'La resta se convierte en un cociente.', 'يصبح الفرق خارج قسمة.', 'The difference becomes a quotient.'), math: same('$\\frac{x^2+6x-x^2}{\\sqrt{x^2+6x}+x}=\\frac{6x}{\\sqrt{x^2+6x}+x}$') },
            { text: say('Maila bera: behean $\\sqrt{x^2}+x=2x$ bezala.', 'Mismo grado: abajo es como $\\sqrt{x^2}+x=2x$.', 'الدرجة نفسها: المقام مثل $\\sqrt{x^2}+x=2x$.', 'Same degree: the bottom is like $\\sqrt{x^2}+x=2x$.'), math: same('$\\frac{6x}{2x}=3$') }
        ],
        takeaway: say('$\\infty-\\infty$ ez da 0: zatikiekin, izendatzaile komuna; erroekin, konjokatua. Kendura zatidura bihurtzen da, eta mailak konparatzen dira.', '$\\infty-\\infty$ no es 0: con fracciones, denominador común; con raíces, el conjugado. La resta se vuelve un cociente y se comparan los grados.', '$\\infty-\\infty$ ليست 0: مع الكسور نوحّد المقامات، ومع الجذور نستعمل المرافق. يصبح الفرق خارج قسمة ونقارن الدرجات.', '$\\infty-\\infty$ is not 0: with fractions, a common denominator; with roots, the conjugate. The difference becomes a quotient and you compare the degrees.'),
        figure: (language) => <TendsFigure language={language} kind="conjugate" />
    },
    {
        id: 'e-limits',
        stage: 'infinity',
        title: say('Bat infinitura berretuta eta e zenbakia', 'Uno elevado a infinito y el número e', 'واحد أس لانهاية والعدد e', 'One to the power of infinity and the number e'),
        goal: say('$1^{\\infty}$ indeterminazioa $e$ zenbakiarekin ebaztea.', 'Resolver la indeterminación $1^{\\infty}$ con el número $e$.', 'حل حالة عدم التعيين $1^{\\infty}$ بالعدد $e$.', 'Resolve the indeterminate form $1^{\\infty}$ with the number $e$.'),
        needs: [
            { unit: SEQUENCES, topic: 'e-number', title: { eu: 'e zenbakia', es: 'El número e', en: 'The number e', ar: 'العدد e' } }
        ],
        problem: say('Kalkulatu $\\lim_{x\\to+\\infty}\\left(1+\\frac{3}{x}\\right)^{x}$.', 'Calcula $\\lim_{x\\to+\\infty}\\left(1+\\frac{3}{x}\\right)^{x}$.', 'احسب $\\lim_{x\\to+\\infty}\\left(1+\\frac{3}{x}\\right)^{x}$.', 'Work out $\\lim_{x\\to+\\infty}\\left(1+\\frac{3}{x}\\right)^{x}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Oinarria 1 baliora doa eta berretzailea $\\infty$ aldera: $1^{\\infty}$.', 'La base va a 1 y el exponente a $\\infty$: $1^{\\infty}$.', 'الأساس يؤول إلى 1 والأس إلى $\\infty$: $1^{\\infty}$.', 'The base goes to 1 and the exponent to $\\infty$: $1^{\\infty}$.') },
            { text: say('Erabili $e^{\\lim g(x)\\,(f(x)-1)}$.', 'Usa $e^{\\lim g(x)\\,(f(x)-1)}$.', 'استعمل $e^{\\lim g(x)\\,(f(x)-1)}$.', 'Use $e^{\\lim g(x)\\,(f(x)-1)}$.'), math: same('$x\\cdot\\left(1+\\frac{3}{x}-1\\right)=x\\cdot\\frac{3}{x}=3$') },
            { text: say('Limitea $e^3$ da.', 'El límite es $e^3$.', 'النهاية $e^3$.', 'The limit is $e^3$.'), math: same('$e^3\\approx 20{,}09$') }
        ],
        takeaway: say('$f(x)\\to 1$ eta $g(x)\\to\\infty$ badira, $\\lim f(x)^{g(x)}=e^{\\lim g(x)\\,(f(x)-1)}$. $1^{\\infty}$ ez da 1.', 'Si $f(x)\\to 1$ y $g(x)\\to\\infty$, $\\lim f(x)^{g(x)}=e^{\\lim g(x)\\,(f(x)-1)}$. $1^{\\infty}$ no es 1.', 'إذا كانت $f(x)\\to 1$ و$g(x)\\to\\infty$ فإن $\\lim f(x)^{g(x)}=e^{\\lim g(x)\\,(f(x)-1)}$. و$1^{\\infty}$ ليست 1.', 'If $f(x)\\to 1$ and $g(x)\\to\\infty$, $\\lim f(x)^{g(x)}=e^{\\lim g(x)\\,(f(x)-1)}$. $1^{\\infty}$ is not 1.'),
        figure: (language) => <TendsFigure language={language} kind="e" />
    },

    /* ---------- 4. Asymptotes ---------- */
    {
        id: 'vertical-horizontal',
        stage: 'asymptotes',
        title: say('Asintota bertikalak eta horizontalak', 'Asíntotas verticales y horizontales', 'المقاربات الرأسية والأفقية', 'Vertical and horizontal asymptotes'),
        goal: say('Funtzio baten asintota bertikalak eta horizontalak limiteekin aurkitzea, eta kurba haien gainetik edo azpitik dagoen esatea.', 'Hallar con límites las asíntotas verticales y horizontales de una función y decir si la curva va por encima o por debajo.', 'إيجاد المقاربات الرأسية والأفقية لدالة بالنهايات وتحديد هل يمر المنحنى فوقها أو تحتها.', 'Find the vertical and horizontal asymptotes of a function with limits, and say whether the curve goes above or below them.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones-polinomicas-racionales', topic: 'hyperbola-shift', title: { eu: 'Hiperbolen lekualdaketak', es: 'Traslaciones de hipérbolas', en: 'Translations of hyperbolas', ar: 'انسحابات القطوع الزائدة' } }
        ],
        problem: say('Aurkitu $f(x)=\\frac{2x+1}{x-3}$ funtzioaren asintotak eta kurbaren posizioa.', 'Halla las asíntotas de $f(x)=\\frac{2x+1}{x-3}$ y la posición de la curva.', 'أوجد مقاربات $f(x)=\\frac{2x+1}{x-3}$ وموضع المنحنى.', 'Find the asymptotes of $f(x)=\\frac{2x+1}{x-3}$ and the position of the curve.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izendatzailea 0 da $x=3$ puntuan, eta zenbakitzailea ez: asintota bertikala.', 'El denominador se anula en $x=3$ y el numerador no: asíntota vertical.', 'ينعدم المقام عند $x=3$ ولا ينعدم البسط: مقارب رأسي.', 'The denominator is 0 at $x=3$ and the numerator is not: vertical asymptote.'), math: same('$x=3$') },
            { text: say('Maila bera: asintota horizontala.', 'Mismo grado: asíntota horizontal.', 'الدرجة نفسها: مقارب أفقي.', 'Same degree: horizontal asymptote.'), math: same('$\\lim_{x\\to\\pm\\infty}\\frac{2x+1}{x-3}=2\\ \\to\\ y=2$') },
            { text: say('Posizioa: $f(x)-2$ adierazpenaren zeinua. $x>3$ denean gainetik doa, eta $x<3$ denean azpitik.', 'Posición: el signo de $f(x)-2$. Con $x>3$ va por encima y con $x<3$, por debajo.', 'الموضع: إشارة $f(x)-2$. مع $x>3$ يمر فوق ومع $x<3$ تحت.', 'Position: the sign of $f(x)-2$. With $x>3$ it goes above and with $x<3$, below.'), math: same('$f(x)-2=\\frac{7}{x-3}$') }
        ],
        takeaway: say('Asintota bertikalak: limite infinituak $x\\to a$ denean. Asintota horizontalak: limite finituak $x\\to\\pm\\infty$ denean. Kurbak asintota horizontala moztu dezake erdiko zatian.', 'Asíntotas verticales: límites infinitos cuando $x\\to a$. Asíntotas horizontales: límites finitos cuando $x\\to\\pm\\infty$. La curva puede cortar la horizontal en la parte central.', 'المقاربات الرأسية: نهايات لانهائية عندما $x\\to a$. والأفقية: نهايات منتهية عندما $x\\to\\pm\\infty$. وقد يقطع المنحنى المقارب الأفقي في الجزء الأوسط.', 'Vertical asymptotes: infinite limits as $x\\to a$. Horizontal asymptotes: finite limits as $x\\to\\pm\\infty$. The curve can cut the horizontal one in the middle part.'),
        figure: (language) => <AsymptotesFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'oblique',
        stage: 'asymptotes',
        title: say('Asintota zeiharrak', 'Asíntotas oblicuas', 'المقاربات المائلة', 'Oblique asymptotes'),
        goal: say('Funtzio arrazional baten asintota zeiharra zatiketaz aurkitzea, goiko maila behekoa baino bat handiagoa denean.', 'Hallar la asíntota oblicua de una función racional dividiendo, cuando el grado de arriba es uno más que el de abajo.', 'إيجاد المقارب المائل لدالة كسرية بالقسمة عندما تزيد درجة البسط على درجة المقام بواحد.', 'Find the oblique asymptote of a rational function by dividing, when the top degree is one more than the bottom one.'),
        needs: [
            { unit: 'dbh4-akademikoak/polinomios-fracciones', topic: 'long-division', title: { eu: 'Polinomioen zatiketa', es: 'División de polinomios', en: 'Polynomial division', ar: 'قسمة الحدوديات' } }
        ],
        problem: say('Aurkitu $f(x)=\\frac{x^2+1}{x-1}$ funtzioaren asintota zeiharra.', 'Halla la asíntota oblicua de $f(x)=\\frac{x^2+1}{x-1}$.', 'أوجد المقارب المائل لـ $f(x)=\\frac{x^2+1}{x-1}$.', 'Find the oblique asymptote of $f(x)=\\frac{x^2+1}{x-1}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Goian 2 maila, behean 1: asintota zeiharra dago.', 'Arriba grado 2 y abajo 1: hay asíntota oblicua.', 'في البسط الدرجة 2 وفي المقام 1: يوجد مقارب مائل.', 'Degree 2 on top and 1 below: there is an oblique asymptote.') },
            { text: say('Zatitu.', 'Divide.', 'اقسم.', 'Divide.'), math: same('$\\frac{x^2+1}{x-1}=x+1+\\frac{2}{x-1}$') },
            { text: say('Zatidura asintota da.', 'El cociente es la asíntota.', 'خارج القسمة هو المقارب.', 'The quotient is the asymptote.'), math: same('$y=x+1$') }
        ],
        takeaway: say('Goiko maila behekoa baino bat handiagoa bada, asintota zeiharra zatiketaren zatidura da: $y=mx+n$.', 'Si el grado de arriba es uno más que el de abajo, la asíntota oblicua es el cociente de la división: $y=mx+n$.', 'إذا زادت درجة البسط على درجة المقام بواحد فالمقارب المائل هو خارج القسمة: $y=mx+n$.', 'If the top degree is one more than the bottom one, the oblique asymptote is the quotient of the division: $y=mx+n$.'),
        figure: (language) => <ObliqueFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'branches',
        stage: 'asymptotes',
        title: say('Funtzio arrazionalen adar infinituak', 'Ramas infinitas de las funciones racionales', 'الفروع اللانهائية للدوال الكسرية', 'Infinite branches of rational functions'),
        goal: say('Funtzio arrazional baten adar infinituak mailetatik ezagutzea, eta zuloak eta asintotak bereiztea.', 'Reconocer por los grados las ramas infinitas de una función racional y distinguir agujeros de asíntotas.', 'التعرف على الفروع اللانهائية لدالة كسرية من الدرجات، والتمييز بين الثقوب والمقاربات.', 'Recognise from the degrees the infinite branches of a rational function, and tell holes from asymptotes.'),
        needs: [
            { unit: SEQUENCES, topic: 'quotient-limits', title: { eu: 'Polinomioen zatiduraren limitea', es: 'Límite de un cociente de polinomios', en: 'Limit of a quotient of polynomials', ar: 'نهاية خارج قسمة كثيرتي حدود' } }
        ],
        problem: say('Zer adar infinitu ditu $f(x)=\\frac{x^3}{x-2}$ funtzioak?', '¿Qué ramas infinitas tiene $f(x)=\\frac{x^3}{x-2}$?', 'ما الفروع اللانهائية لـ $f(x)=\\frac{x^3}{x-2}$؟', 'What infinite branches does $f(x)=\\frac{x^3}{x-2}$ have?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x=2$ puntuan $\\frac{8}{0}$: asintota bertikala.', 'En $x=2$ sale $\\frac{8}{0}$: asíntota vertical.', 'عند $x=2$ نجد $\\frac{8}{0}$: مقارب رأسي.', 'At $x=2$ it gives $\\frac{8}{0}$: vertical asymptote.'), math: same('$x=2$') },
            { text: say('Goian 3 maila, behean 1: bi maila gehiago.', 'Arriba grado 3 y abajo 1: dos grados más.', 'في البسط الدرجة 3 وفي المقام 1: درجتان أكثر.', 'Degree 3 on top and 1 below: two degrees more.'), math: same('$\\frac{x^3}{x}=x^2$') },
            { text: say('Adar parabolikoak: ez du ez asintota horizontalik ez zeiharrik.', 'Ramas parabólicas: no tiene asíntota horizontal ni oblicua.', 'فروع شلجمية: ليس لها مقارب أفقي ولا مائل.', 'Parabolic branches: it has no horizontal or oblique asymptote.') }
        ],
        takeaway: say('Mailen aldeak esaten du adarra: goian txikiagoa, $y=0$; berdinak, horizontala; bat gehiago, zeiharra; bi edo gehiago, parabolikoa. $\\frac{0}{0}$ ematen duen zeroa zuloa da, ez asintota.', 'La diferencia de grados dice la rama: arriba menor, $y=0$; iguales, horizontal; uno más, oblicua; dos o más, parabólica. Un cero que da $\\frac{0}{0}$ es un agujero, no una asíntota.', 'فرق الدرجات يحدد الفرع: البسط أصغر، $y=0$؛ متساويتان، أفقي؛ واحدة أكثر، مائل؛ اثنتان أو أكثر، شلجمي. والصفر الذي يعطي $\\frac{0}{0}$ ثقب لا مقارب.', 'The difference of degrees tells the branch: top lower, $y=0$; equal, horizontal; one more, oblique; two or more, parabolic. A zero that gives $\\frac{0}{0}$ is a hole, not an asymptote.')
    },

    /* ---------- 5. Continuity ---------- */
    {
        id: 'continuous',
        stage: 'continuity',
        title: say('Funtzio jarraitua puntu batean', 'Función continua en un punto', 'الدالة المتصلة عند نقطة', 'A function continuous at a point'),
        goal: say('Funtzio bat puntu batean jarraitua den aztertzea, eta zatika definitutako funtzio batean parametro bat aurkitzea jarraitua izan dadin.', 'Estudiar si una función es continua en un punto y hallar un parámetro para que una función a trozos sea continua.', 'دراسة اتصال دالة عند نقطة، وإيجاد وسيط لتكون دالة معرّفة على أجزاء متصلة.', 'Study whether a function is continuous at a point, and find a parameter so that a piecewise function is continuous.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones', topic: 'piecewise-continuity', title: { eu: 'Zatien arteko jarraitutasuna', es: 'Continuidad entre trozos', en: 'Continuity between pieces', ar: 'الاتصال بين الأجزاء' } }
        ],
        problem: say('Aurkitu $k$, $f(x)=\\begin{cases}x^2+k & x<2\\\\ 3x-1 & x\\ge 2\\end{cases}$ funtzioa $x=2$ puntuan jarraitua izan dadin.', 'Halla $k$ para que $f(x)=\\begin{cases}x^2+k & x<2\\\\ 3x-1 & x\\ge 2\\end{cases}$ sea continua en $x=2$.', 'أوجد $k$ لتكون $f(x)=\\begin{cases}x^2+k & x<2\\\\ 3x-1 & x\\ge 2\\end{cases}$ متصلة عند $x=2$.', 'Find $k$ so that $f(x)=\\begin{cases}x^2+k & x<2\\\\ 3x-1 & x\\ge 2\\end{cases}$ is continuous at $x=2$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Eskuineko zatiak ematen ditu balioa eta eskuineko limitea.', 'El trozo de la derecha da el valor y el límite por la derecha.', 'الجزء الأيمن يعطي القيمة والنهاية من اليمين.', 'The right-hand piece gives the value and the right-hand limit.'), math: same('$f(2)=3\\cdot 2-1=5$') },
            { text: say('Ezkerreko limitea.', 'Límite por la izquierda.', 'النهاية من اليسار.', 'Limit from the left.'), math: same('$\\lim_{x\\to 2^-}(x^2+k)=4+k$') },
            { text: say('Berdindu, jauzirik egon ez dadin.', 'Iguala para que no haya salto.', 'ساوِ كي لا توجد قفزة.', 'Set them equal so that there is no jump.'), math: same('$4+k=5\\ \\to\\ k=1$') }
        ],
        takeaway: say('$f$ funtzioa $a$ puntuan jarraitua da $\\lim_{x\\to a}f(x)=f(a)$ bada: balioa egon, limitea egon eta biak berdinak izan.', '$f$ es continua en $a$ si $\\lim_{x\\to a}f(x)=f(a)$: existe el valor, existe el límite y son iguales.', 'تكون $f$ متصلة عند $a$ إذا كانت $\\lim_{x\\to a}f(x)=f(a)$: توجد القيمة وتوجد النهاية وتتساويان.', '$f$ is continuous at $a$ if $\\lim_{x\\to a}f(x)=f(a)$: the value exists, the limit exists and they are equal.'),
        figure: (language) => <ContinuousJoinFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'discontinuities',
        stage: 'continuity',
        title: say('Etenune motak', 'Tipos de discontinuidad', 'أنواع الانقطاع', 'Kinds of discontinuity'),
        goal: say('Etenune bat gaindigarria, jauzi finitua edo jauzi infinitua den sailkatzea, alboko limiteekin.', 'Clasificar una discontinuidad como evitable, de salto finito o de salto infinito con los límites laterales.', 'تصنيف الانقطاع إلى قابل للإزالة أو قفزة منتهية أو قفزة لانهائية بالنهايتين الجانبيتين.', 'Classify a discontinuity as removable, finite jump or infinite jump with the one-sided limits.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones', topic: 'discontinuities', title: { eu: 'Jarraitutasuna eta etenuneak', es: 'Continuidad y discontinuidades', en: 'Continuity and discontinuities', ar: 'الاتصال والانقطاعات' } },
            { unit: FUNCTIONS, topic: 'floor', title: { eu: 'Zati osoa eta zati hamartarra', es: 'Parte entera y parte decimal', en: 'Integer part and fractional part', ar: 'الجزء الصحيح والجزء الكسري' } }
        ],
        problem: say('Sailkatu $f(x)=\\frac{x^2-x}{x^2-1}$ funtzioaren etenuneak.', 'Clasifica las discontinuidades de $f(x)=\\frac{x^2-x}{x^2-1}$.', 'صنّف انقطاعات $f(x)=\\frac{x^2-x}{x^2-1}$.', 'Classify the discontinuities of $f(x)=\\frac{x^2-x}{x^2-1}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ez dago definituta $x=1$ eta $x=-1$ puntuetan.', 'No está definida en $x=1$ ni en $x=-1$.', 'غير معرّفة عند $x=1$ ولا عند $x=-1$.', 'It is not defined at $x=1$ or at $x=-1$.'), math: same('$\\frac{x(x-1)}{(x-1)(x+1)}=\\frac{x}{x+1}$') },
            { text: say('$x=1$ puntuan, $\\frac{0}{0}$ eta limitea $\\frac{1}{2}$: gaindigarria.', 'En $x=1$, $\\frac{0}{0}$ y límite $\\frac{1}{2}$: evitable.', 'عند $x=1$ نجد $\\frac{0}{0}$ والنهاية $\\frac{1}{2}$: قابل للإزالة.', 'At $x=1$, $\\frac{0}{0}$ and limit $\\frac{1}{2}$: removable.') },
            { text: say('$x=-1$ puntuan, $\\frac{-1}{0}$: jauzi infinitua, asintota bertikala.', 'En $x=-1$, $\\frac{-1}{0}$: salto infinito, asíntota vertical.', 'عند $x=-1$ نجد $\\frac{-1}{0}$: قفزة لانهائية، مقارب رأسي.', 'At $x=-1$, $\\frac{-1}{0}$: infinite jump, vertical asymptote.') }
        ],
        takeaway: say('Alboko limiteak berdinak eta finituak: gaindigarria. Finituak eta desberdinak: jauzi finitua. Bat infinitua: jauzi infinitua.', 'Laterales iguales y finitos: evitable. Finitos y distintos: salto finito. Alguno infinito: salto infinito.', 'جانبيتان متساويتان ومنتهيتان: قابل للإزالة. منتهيتان ومختلفتان: قفزة منتهية. إحداهما لانهائية: قفزة لانهائية.', 'One-sided limits equal and finite: removable. Finite and different: finite jump. One infinite: infinite jump.'),
        figure: (language) => <ContinuityFigure language={language} />
    },
    {
        id: 'bolzano',
        stage: 'continuity',
        title: say('Bolzanoren teorema', 'El teorema de Bolzano', 'مبرهنة بولتسانو', 'Bolzano\'s theorem'),
        goal: say('Bolzanoren teorema erabiltzea tarte batean ekuazio baten soluzio bat dagoela frogatzeko, eta funtzioa jarraitua dela egiaztatzea.', 'Usar el teorema de Bolzano para demostrar que una ecuación tiene una solución en un intervalo, comprobando que la función es continua.', 'استعمال مبرهنة بولتسانو لإثبات أن لمعادلة حلًّا في مجال، مع التحقق من اتصال الدالة.', 'Use Bolzano\'s theorem to show that an equation has a solution in an interval, checking that the function is continuous.'),
        needs: [
            { unit: 'batx1-zientziak/ecuaciones-inecuaciones', topic: 'high-degree', title: { eu: 'Hiru mailako edo handiagoko ekuazioak', es: 'Ecuaciones de grado tres o más', en: 'Equations of degree three or more', ar: 'معادلات الدرجة الثالثة فما فوق' } }
        ],
        problem: say('Frogatu $x^3+x-3=0$ ekuazioak soluzio bat duela 1 eta 2 artean.', 'Demuestra que $x^3+x-3=0$ tiene una solución entre 1 y 2.', 'برهن أن للمعادلة $x^3+x-3=0$ حلًّا بين 1 و2.', 'Show that $x^3+x-3=0$ has a solution between 1 and 2.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$f(x)=x^3+x-3$ polinomio bat da: jarraitua $[1,2]$ tartean.', '$f(x)=x^3+x-3$ es un polinomio: continua en $[1,2]$.', '$f(x)=x^3+x-3$ حدودية: متصلة على $[1,2]$.', '$f(x)=x^3+x-3$ is a polynomial: continuous on $[1,2]$.') },
            { text: say('Muturretako zeinuak.', 'Signos en los extremos.', 'الإشارتان عند الطرفين.', 'Signs at the ends.'), math: same('$f(1)=-1<0\\qquad f(2)=7>0$') },
            { text: say('Bolzanoren arabera, $c\\in(1,2)$ bat dago, $f(c)=0$ duena.', 'Por Bolzano, existe $c\\in(1,2)$ con $f(c)=0$.', 'حسب بولتسانو يوجد $c\\in(1,2)$ بحيث $f(c)=0$.', 'By Bolzano, there is $c\\in(1,2)$ with $f(c)=0$.') }
        ],
        takeaway: say('$f$ jarraitua bada $[a,b]$ tartean eta $f(a)\\cdot f(b)<0$ bada, gutxienez erro bat dago $(a,b)$ tartean. Jarraitutasunik gabe, ez du ezer ziurtatzen.', 'Si $f$ es continua en $[a,b]$ y $f(a)\\cdot f(b)<0$, hay al menos una raíz en $(a,b)$. Sin continuidad, no asegura nada.', 'إذا كانت $f$ متصلة على $[a,b]$ و$f(a)\\cdot f(b)<0$ فيوجد جذر واحد على الأقل في $(a,b)$. ودون اتصال لا تضمن شيئًا.', 'If $f$ is continuous on $[a,b]$ and $f(a)\\cdot f(b)<0$, there is at least one root in $(a,b)$. Without continuity, it guarantees nothing.'),
        figure: (language) => <BolzanoFigure language={language} />,
        figureAfterSteps: true
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const bachLimitsTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...bachLimitsLessonTexts[topic.id as BachLimitsTopicId], ...bachLimitsLessonChecks[topic.id as BachLimitsTopicId] }))
