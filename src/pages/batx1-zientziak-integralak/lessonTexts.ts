import type { LessonTexts } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from '../batx1-zientziak-funtzioak/text.ts'
import type { BachIntegralsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Integralak · Batxilergoa 1 · Zientziak — what each lesson tells: the new
   words (definitions), a short explanation, the example as an exercise
   («Another example»), the key words in four languages and, in five
   lessons, «Why does it work?». Plain data so the tests can import it;
   lessons.tsx merges it into the topics and gives each language its
   trigonometric names (\sin is sen in Spanish). The example uses numbers
   of its own, never those of «Let's solve», of «Check it» or of the
   typical mistake. Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

export const bachIntegralsLessonTexts: Record<BachIntegralsTopicId, LessonTexts> = {
    /* ---------- 1. Antiderivatives ---------- */
    primitive: {
        definitions: [
            { term: say('Jatorrizkoa', 'Primitiva', 'الدالة الأصلية', 'Antiderivative'), meaning: say('$F$ funtzio bat, zeinaren deribatua $f$ den: $F\'=f$.', 'Una función $F$ cuya derivada es $f$: $F\'=f$.', 'دالة $F$ مشتقتها $f$: $F\'=f$.', 'A function $F$ whose derivative is $f$: $F\'=f$.') },
            { term: say('Integral mugagabea', 'Integral indefinida', 'التكامل غير المحدد', 'Indefinite integral'), meaning: say('Jatorrizko guztien multzoa, $F(x)+k$, $\\int f(x)\\,dx$ idazten dena.', 'El conjunto de todas las primitivas, $F(x)+k$, que se escribe $\\int f(x)\\,dx$.', 'مجموعة كل الدوال الأصلية $F(x)+k$، وتُكتب $\\int f(x)\\,dx$.', 'The set of all the antiderivatives, $F(x)+k$, written $\\int f(x)\\,dx$.') }
        ],
        vocabulary: [
            say('konstantea', 'constante', 'الثابت', 'constant'),
            say('deribatua', 'derivada', 'المشتقة', 'derivative')
        ],
        explanation: say(
            'Integratzea alderantziz deribatzea da: $F$ funtzio bat bilatzea, zeinaren deribatua $f$ den. $F$ balio badu, $F+5$ edo $F-1$ ere bai, konstante baten deribatua 0 delako. Horregatik jatorrizko guztiak $F(x)+k$ idazten dira, eta $k$ konstantea ez da ahazten.',
            'Integrar es derivar al revés: buscar una función $F$ cuya derivada sea $f$. Si $F$ sirve, también sirve $F+5$ o $F-1$, porque la derivada de una constante es 0. Por eso todas las primitivas se escriben $F(x)+k$, y la constante $k$ no se olvida.',
            'التكامل اشتقاق بالعكس: البحث عن دالة $F$ مشتقتها $f$. وإذا صلحت $F$ صلحت أيضًا $F+5$ أو $F-1$ لأن مشتقة الثابت 0. لذلك تُكتب كل الدوال الأصلية $F(x)+k$، ولا يُنسى الثابت $k$.',
            'Integrating is differentiating backwards: looking for a function $F$ whose derivative is $f$. If $F$ works, so do $F+5$ and $F-1$, because the derivative of a constant is 0. That is why all the antiderivatives are written $F(x)+k$, and the constant $k$ is never left out.'
        ),
        examplePrompt: say('$F(x)=e^x+x^2$ funtzioa $f(x)=e^x+2x$ funtzioaren jatorrizkoa al da?', '¿Es $F(x)=e^x+x^2$ una primitiva de $f(x)=e^x+2x$?', 'هل $F(x)=e^x+x^2$ أصلية لـ $f(x)=e^x+2x$؟', 'Is $F(x)=e^x+x^2$ an antiderivative of $f(x)=e^x+2x$?'),
        example: same('$F\'(x)=e^x+2x=f(x)$'),
        exampleAnswer: say('Bai; eta $e^x+x^2+k$ ere bai, edozein $k$ izanik.', 'Sí; y también $e^x+x^2+k$ para cualquier $k$.', 'نعم، وكذلك $e^x+x^2+k$ لأي $k$.', 'Yes; and so is $e^x+x^2+k$ for any $k$.')
    },
    'power-rule': {
        definitions: [
            { term: say('Berreturaren erregela', 'Regla de la potencia', 'قاعدة القوة', 'Power rule'), meaning: say('$\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+k$, $n\\ne -1$ guztietarako.', '$\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+k$, para todo $n\\ne -1$.', '$\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+k$ لكل $n\\ne -1$.', '$\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+k$, for every $n\\ne -1$.') }
        ],
        vocabulary: [
            say('berretzailea', 'exponente', 'الأس', 'exponent'),
            say('erroa', 'raíz', 'الجذر', 'root')
        ],
        explanation: say(
            '$x$ aldagaiaren berredura bat integratzeko, berretzaileari 1 gehitzen zaio eta berretzaile berriaz zatitzen da. Erro bat edo zatiki bat lehenik berretura gisa idazten dira. Gai bakoitza bere aldetik integratzen da, biderkatzen duten zenbakiak bere horretan geratzen dira, eta amaieran $k$ konstante bakarra gehitzen da.',
            'Para integrar una potencia de $x$ se suma 1 al exponente y se divide entre el exponente nuevo. Una raíz o una fracción se escriben antes como potencia. Cada término se integra por separado, los números que multiplican se quedan, y al final se añade una sola constante $k$.',
            'لتكامل قوة لـ $x$ نضيف 1 إلى الأس ونقسم على الأس الجديد. ونكتب الجذر أو الكسر قوةً أولًا. ونكامل كل حد على حدة، وتبقى الأعداد المضروبة كما هي، وفي النهاية نضيف ثابتًا واحدًا $k$.',
            'To integrate a power of $x$, add 1 to the exponent and divide by the new exponent. A root or a fraction is first written as a power. Each term is integrated on its own, the numbers that multiply stay, and at the end you add a single constant $k$.'
        ),
        examplePrompt: say('Kalkulatu $\\int\\left(\\sqrt{x}+\\frac{1}{x^2}\\right)dx$.', 'Calcula $\\int\\left(\\sqrt{x}+\\frac{1}{x^2}\\right)dx$.', 'احسب $\\int\\left(\\sqrt{x}+\\frac{1}{x^2}\\right)dx$.', 'Work out $\\int\\left(\\sqrt{x}+\\frac{1}{x^2}\\right)dx$.'),
        example: same('$\\begin{aligned}&\\int\\left(x^{\\frac{1}{2}}+x^{-2}\\right)dx\\\\ &=\\frac{2}{3}x^{\\frac{3}{2}}-x^{-1}+k\\end{aligned}$'),
        exampleAnswer: say('Hau da, $\\frac{2}{3}\\sqrt{x^3}-\\frac{1}{x}+k$.', 'Es decir, $\\frac{2}{3}\\sqrt{x^3}-\\frac{1}{x}+k$.', 'أي $\\frac{2}{3}\\sqrt{x^3}-\\frac{1}{x}+k$.', 'That is, $\\frac{2}{3}\\sqrt{x^3}-\\frac{1}{x}+k$.'),
        why: {
            text: say(
                'Zergatik dabil? $\\frac{x^{n+1}}{n+1}$ deribatzean $n+1$ berretzailea jaisten da, izendatzailearekin sinplifikatzen da, eta $x^n$ geratzen da. $n=-1$ kasuan 0 zenbakiaz zatitu beharko litzateke: beste kasu bat da.',
                '¿Por qué funciona? Al derivar $\\frac{x^{n+1}}{n+1}$ baja el exponente $n+1$, que se simplifica con el denominador, y queda $x^n$. Para $n=-1$ habría que dividir entre 0: ese caso es otro.',
                'لماذا ينجح؟ عند اشتقاق $\\frac{x^{n+1}}{n+1}$ ينزل الأس $n+1$ ويُختصر مع المقام فيبقى $x^n$. وفي حالة $n=-1$ تلزم القسمة على 0: إنها حالة أخرى.',
                'Why does it work? Differentiating $\\frac{x^{n+1}}{n+1}$ brings down the exponent $n+1$, which cancels with the denominator, and $x^n$ is left. For $n=-1$ you would divide by 0: that case is different.'
            ),
            math: same('$\\left(\\frac{x^4}{4}\\right)\'=\\frac{4x^3}{4}=x^3$')
        }
    },
    'through-point': {
        definitions: [
            { term: say('Hasierako baldintza', 'Condición inicial', 'الشرط الابتدائي', 'Initial condition'), meaning: say('$F(a)=b$ datu bat, jatorrizko guztien artean bat aukeratzen duena.', 'Un dato $F(a)=b$ que elige una primitiva concreta entre todas.', 'معطى $F(a)=b$ يختار دالة أصلية محددة من بين الجميع.', 'A piece of data $F(a)=b$ that picks one antiderivative among all of them.') }
        ],
        vocabulary: [
            say('puntua', 'punto', 'النقطة', 'point'),
            say('familia', 'familia', 'العائلة', 'family')
        ],
        explanation: say(
            '$F(x)+k$ jatorrizkoek kurba berdinen familia bat osatzen dute, batzuk besteen gainean. Puntu batetik pasatzen dela esaten badizute, haren koordenatuak $F(x)+k$ adierazpenean ordezkatzen dituzu, eta ezezagun bakarreko ekuazio bat ateratzen da, $k$. Balio horrekin jatorrizko zehatz bat geratzen da.',
            'Las primitivas $F(x)+k$ forman una familia de curvas iguales, unas encima de otras. Si te dicen que pasa por un punto, sustituyes sus coordenadas en $F(x)+k$ y sale una ecuación con una sola incógnita, $k$. Con ese valor queda una primitiva concreta.',
            'تشكّل الدوال الأصلية $F(x)+k$ عائلة من منحنيات متطابقة بعضها فوق بعض. وإذا قيل لك إنها تمر بنقطة فعوّض إحداثياتها في $F(x)+k$ فتنتج معادلة بمجهول واحد هو $k$. وبهذه القيمة تبقى دالة أصلية محددة.',
            'The antiderivatives $F(x)+k$ form a family of identical curves, one above another. If you are told it goes through a point, substitute its coordinates into $F(x)+k$ and you get an equation with a single unknown, $k$. With that value one antiderivative is left.'
        ),
        examplePrompt: say('Aurkitu $f(x)=3x^2$ funtzioaren jatorrizkoa, $(2,\\,10)$ puntutik pasatzen dena.', 'Halla la primitiva de $f(x)=3x^2$ que pasa por $(2,\\,10)$.', 'أوجد الدالة الأصلية لـ $f(x)=3x^2$ التي تمر بالنقطة $(2,\\,10)$.', 'Find the antiderivative of $f(x)=3x^2$ that goes through $(2,\\,10)$.'),
        example: same('$\\begin{aligned}&F(x)=x^3+k\\\\ &8+k=10\\ \\to\\ k=2\\end{aligned}$'),
        exampleAnswer: same('$F(x)=x^3+2$')
    },

    /* ---------- 2. Basic integrals ---------- */
    'exp-log': {
        definitions: [
            { term: say('Logaritmo nepertarra', 'Logaritmo neperiano', 'اللوغاريتم الطبيعي', 'Natural logarithm'), meaning: say('$\\ln x$, $e$ oinarriko logaritmoa; haren deribatua $\\frac{1}{x}$ da.', '$\\ln x$, el logaritmo de base $e$; su derivada es $\\frac{1}{x}$.', '$\\ln x$، اللوغاريتم ذو الأساس $e$، ومشتقته $\\frac{1}{x}$.', '$\\ln x$, the logarithm to base $e$; its derivative is $\\frac{1}{x}$.') }
        ],
        vocabulary: [
            say('esponentziala', 'exponencial', 'الأسية', 'exponential'),
            say('balio absolutua', 'valor absoluto', 'القيمة المطلقة', 'absolute value')
        ],
        explanation: say(
            '$e^x$ esponentziala bere deribatua da; beraz, bere jatorrizkoa ere bai. $a^x$ funtzioan $\\ln a$ zenbakiaz zatitu behar da. Eta $\\frac{1}{x}$ zatikia $\\ln x$ funtzioaren deribatua da; $\\ln|x|$ idazten da, balio absolutuarekin, $\\frac{1}{x}$ zatikia $x<0$ denean ere existitzen delako.',
            'La exponencial $e^x$ es su propia derivada, así que también es su propia primitiva. Para $a^x$ hay que dividir entre $\\ln a$. Y $\\frac{1}{x}$ es la derivada de $\\ln x$; se escribe $\\ln|x|$ con valor absoluto porque $\\frac{1}{x}$ existe también para $x<0$.',
            'الدالة الأسية $e^x$ هي مشتقة نفسها، ولذا فهي أصلية نفسها أيضًا. وفي $a^x$ نقسم على $\\ln a$. و$\\frac{1}{x}$ مشتقة $\\ln x$؛ ونكتب $\\ln|x|$ بالقيمة المطلقة لأن $\\frac{1}{x}$ موجودة أيضًا عندما $x<0$.',
            'The exponential $e^x$ is its own derivative, so it is also its own antiderivative. For $a^x$ you divide by $\\ln a$. And $\\frac{1}{x}$ is the derivative of $\\ln x$; you write $\\ln|x|$ with an absolute value because $\\frac{1}{x}$ also exists for $x<0$.'
        ),
        examplePrompt: say('Kalkulatu $\\int\\left(2^x-\\frac{5}{x}\\right)dx$.', 'Calcula $\\int\\left(2^x-\\frac{5}{x}\\right)dx$.', 'احسب $\\int\\left(2^x-\\frac{5}{x}\\right)dx$.', 'Work out $\\int\\left(2^x-\\frac{5}{x}\\right)dx$.'),
        example: same('$\\frac{2^x}{\\ln 2}-5\\ln|x|+k$'),
        exampleAnswer: say('2 oinarriko berredura $\\ln 2$ zenbakiaz zatitzen da.', 'La potencia de base 2 se divide entre $\\ln 2$.', 'تُقسم القوة ذات الأساس 2 على $\\ln 2$.', 'The power with base 2 is divided by $\\ln 2$.')
    },
    trig: {
        vocabulary: [
            say('sinua', 'seno', 'الجيب', 'sine'),
            say('kosinua', 'coseno', 'جيب التمام', 'cosine')
        ],
        explanation: say(
            'Deribatuen taula alderantziz irakurtzen da. $(\\sin x)\'=\\cos x$ denez, kosinuaren jatorrizkoa sinua da. $(\\cos x)\'=-\\sin x$ denez, sinuarena $-\\cos x$ da: hemen agertzen da minus zeinua. Eta $(\\tan x)\'=1+\\tan^2 x$ denez, $1+\\tan^2 x$ adierazpenaren integrala $\\tan x$ da.',
            'Se lee al revés la tabla de derivadas. Como $(\\sin x)\'=\\cos x$, la primitiva del coseno es el seno. Como $(\\cos x)\'=-\\sin x$, la del seno es $-\\cos x$: aquí aparece el signo menos. Y como $(\\tan x)\'=1+\\tan^2 x$, la integral de $1+\\tan^2 x$ es $\\tan x$.',
            'نقرأ جدول المشتقات بالعكس. بما أن $(\\sin x)\'=\\cos x$ فأصلية جيب التمام هي الجيب. وبما أن $(\\cos x)\'=-\\sin x$ فأصلية الجيب هي $-\\cos x$: هنا تظهر إشارة السالب. وبما أن $(\\tan x)\'=1+\\tan^2 x$ فتكامل $1+\\tan^2 x$ هو $\\tan x$.',
            'You read the table of derivatives backwards. As $(\\sin x)\'=\\cos x$, the antiderivative of cosine is sine. As $(\\cos x)\'=-\\sin x$, that of sine is $-\\cos x$: here the minus sign appears. And as $(\\tan x)\'=1+\\tan^2 x$, the integral of $1+\\tan^2 x$ is $\\tan x$.'
        ),
        examplePrompt: say('Kalkulatu $\\int(3\\cos x+1+\\tan^2 x)\\,dx$.', 'Calcula $\\int(3\\cos x+1+\\tan^2 x)\\,dx$.', 'احسب $\\int(3\\cos x+1+\\tan^2 x)\\,dx$.', 'Work out $\\int(3\\cos x+1+\\tan^2 x)\\,dx$.'),
        example: same('$3\\sin x+\\tan x+k$'),
        exampleAnswer: say('Zati bakoitza bere aldetik, eta konstante bakarra.', 'Cada parte por separado, y una sola constante.', 'كل جزء على حدة، وثابت واحد.', 'Each part separately, and a single constant.'),
        why: {
            text: say(
                'Zergatik darama minus zeinua sinuarenak? $-\\cos x$ deribatzen baduzu, $-(-\\sin x)=\\sin x$ ateratzen da. Minusik gabe, $\\cos x$ funtzioaren deribatua $-\\sin x$ litzateke: kontrako zeinua.',
                '¿Por qué lleva signo menos la del seno? Si derivas $-\\cos x$, sale $-(-\\sin x)=\\sin x$. Sin el menos, $\\cos x$ tendría derivada $-\\sin x$: el signo contrario.',
                'لماذا تحمل أصلية الجيب إشارة السالب؟ إذا اشتققت $-\\cos x$ نتج $-(-\\sin x)=\\sin x$. ودون السالب تكون مشتقة $\\cos x$ هي $-\\sin x$: الإشارة المعاكسة.',
                'Why does the antiderivative of sine have a minus sign? If you differentiate $-\\cos x$, you get $-(-\\sin x)=\\sin x$. Without the minus, $\\cos x$ would have the derivative $-\\sin x$: the opposite sign.'
            ),
            math: same('$(-\\cos x)\'=\\sin x$')
        }
    },
    arcs: {
        definitions: [
            { term: say('Karratua osatzea', 'Completar el cuadrado', 'إكمال المربع', 'Completing the square'), meaning: say('$x^2+bx+c$ adierazpena $(x+p)^2+q$ gisa idaztea, falta dena batuz eta kenduz.', 'Escribir $x^2+bx+c$ como $(x+p)^2+q$, sumando y restando lo que falta.', 'كتابة $x^2+bx+c$ على الصورة $(x+p)^2+q$ بإضافة الناقص وطرحه.', 'Writing $x^2+bx+c$ as $(x+p)^2+q$, adding and subtracting what is missing.') }
        ],
        vocabulary: [
            say('arku tangentea', 'arcotangente', 'قوس الظل', 'arctangent'),
            say('izendatzailea', 'denominador', 'المقام', 'denominator')
        ],
        explanation: say(
            'Taulako bi deribatu, alderantziz irakurrita: $\\arctan x$ funtzioarena $\\frac{1}{1+x^2}$ da, eta $\\arcsin x$ funtzioarena $\\frac{1}{\\sqrt{1-x^2}}$. Izendatzailea errorik gabeko $x^2+bx+c$ bada, karratua osatzen da $(x+p)^2+1$ lortu arte, eta $x+p$ adierazpenaren arku tangentea ateratzen da.',
            'Dos derivadas de la tabla, leídas al revés: la de $\\arctan x$ es $\\frac{1}{1+x^2}$ y la de $\\arcsin x$ es $\\frac{1}{\\sqrt{1-x^2}}$. Si el denominador es $x^2+bx+c$ sin raíces, se completa el cuadrado hasta tener $(x+p)^2+1$, y sale una arcotangente de $x+p$.',
            'مشتقتان من الجدول مقروءتان بالعكس: مشتقة $\\arctan x$ هي $\\frac{1}{1+x^2}$ ومشتقة $\\arcsin x$ هي $\\frac{1}{\\sqrt{1-x^2}}$. وإذا كان المقام $x^2+bx+c$ بلا جذور نكمل المربع حتى نحصل على $(x+p)^2+1$، فيظهر قوس ظل $x+p$.',
            'Two derivatives of the table, read backwards: that of $\\arctan x$ is $\\frac{1}{1+x^2}$ and that of $\\arcsin x$ is $\\frac{1}{\\sqrt{1-x^2}}$. If the denominator is $x^2+bx+c$ with no roots, complete the square until you have $(x+p)^2+1$, and an arctangent of $x+p$ comes out.'
        ),
        examplePrompt: say('Kalkulatu $\\int\\frac{dx}{x^2+6x+10}$.', 'Calcula $\\int\\frac{dx}{x^2+6x+10}$.', 'احسب $\\int\\frac{dx}{x^2+6x+10}$.', 'Work out $\\int\\frac{dx}{x^2+6x+10}$.'),
        example: same('$\\begin{aligned}&\\int\\frac{dx}{(x+3)^2+1}\\\\ &=\\arctan(x+3)+k\\end{aligned}$'),
        exampleAnswer: say('$x^2+6x+10=(x+3)^2+1$ delako.', 'Porque $x^2+6x+10=(x+3)^2+1$.', 'لأن $x^2+6x+10=(x+3)^2+1$.', 'Because $x^2+6x+10=(x+3)^2+1$.')
    },

    /* ---------- 3. Composite integrals ---------- */
    'chain-power': {
        definitions: [
            { term: say('Integral konposatua', 'Integral compuesta', 'التكامل المركّب', 'Composite integral'), meaning: say('$\\int u\'\\cdot g(u)\\,dx$ formako integral bat: barrukoaren deribatua kanpoan agertzen da.', 'Una integral de la forma $\\int u\'\\cdot g(u)\\,dx$: la derivada de lo de dentro aparece fuera.', 'تكامل على الصورة $\\int u\'\\cdot g(u)\\,dx$: تظهر مشتقة الداخل في الخارج.', 'An integral of the form $\\int u\'\\cdot g(u)\\,dx$: the derivative of the inside appears outside.') }
        ],
        vocabulary: [
            say('katearen erregela', 'regla de la cadena', 'قاعدة السلسلة', 'chain rule'),
            say('deribatua', 'derivada', 'المشتقة', 'derivative')
        ],
        explanation: say(
            'Katearen erregelak dio $(u^{n+1})\'=(n+1)u^n\\cdot u\'$. Alderantziz irakurrita: integralean $u^n$ eta $u\'$ ere agertzen badira, jatorrizkoa $\\frac{u^{n+1}}{n+1}$ da. Egiaztatu behar da kanpoan barrukoaren deribatua dagoela, zehazki.',
            'La regla de la cadena dice que $(u^{n+1})\'=(n+1)u^n\\cdot u\'$. Leída al revés: si en la integral aparecen $u^n$ y también $u\'$, la primitiva es $\\frac{u^{n+1}}{n+1}$. Hay que comprobar que fuera está exactamente la derivada de lo de dentro.',
            'تقول قاعدة السلسلة إن $(u^{n+1})\'=(n+1)u^n\\cdot u\'$. وبقراءتها بالعكس: إذا ظهر في التكامل $u^n$ وظهر أيضًا $u\'$ فالأصلية هي $\\frac{u^{n+1}}{n+1}$. ويجب التحقق من أن مشتقة الداخل موجودة في الخارج تمامًا.',
            'The chain rule says that $(u^{n+1})\'=(n+1)u^n\\cdot u\'$. Read backwards: if $u^n$ and also $u\'$ appear in the integral, the antiderivative is $\\frac{u^{n+1}}{n+1}$. You must check that exactly the derivative of the inside is outside.'
        ),
        examplePrompt: say('Kalkulatu $\\int 3x^2(x^3-5)^4\\,dx$.', 'Calcula $\\int 3x^2(x^3-5)^4\\,dx$.', 'احسب $\\int 3x^2(x^3-5)^4\\,dx$.', 'Work out $\\int 3x^2(x^3-5)^4\\,dx$.'),
        example: same('$\\begin{aligned}&u=x^3-5,\\ u\'=3x^2\\\\ &\\frac{(x^3-5)^5}{5}+k\\end{aligned}$'),
        exampleAnswer: say('Kanpoan $u\'=3x^2$ dago, zehazki: ez da ezer doitu behar.', 'Fuera está justo $u\'=3x^2$: no hay que ajustar nada.', 'في الخارج $u\'=3x^2$ تمامًا: لا حاجة إلى أي ضبط.', 'Outside there is exactly $u\'=3x^2$: nothing needs adjusting.'),
        why: {
            text: say(
                'Zergatik dabil? $\\frac{(x^2+1)^4}{4}$ katearen erregelarekin deribatzean, 4 jaisten da, sinplifikatzen da, eta barrukoaren deribatua ateratzen da: integralean zegoena, hain zuzen.',
                '¿Por qué funciona? Al derivar $\\frac{(x^2+1)^4}{4}$ con la regla de la cadena baja el 4, se simplifica, y sale la derivada de dentro: justo lo que había en la integral.',
                'لماذا ينجح؟ عند اشتقاق $\\frac{(x^2+1)^4}{4}$ بقاعدة السلسلة ينزل العدد 4 ويُختصر، وتظهر مشتقة الداخل: وهي بالضبط ما كان في التكامل.',
                'Why does it work? Differentiating $\\frac{(x^2+1)^4}{4}$ with the chain rule brings down the 4, which cancels, and the derivative of the inside comes out: exactly what the integral had.'
            ),
            math: same('$\\begin{aligned}&\\left(\\frac{(x^2+1)^4}{4}\\right)\'\\\\ &=(x^2+1)^3\\cdot 2x\\end{aligned}$')
        }
    },
    'chain-exp-log': {
        vocabulary: [
            say('zenbakitzailea', 'numerador', 'البسط', 'numerator'),
            say('izendatzailea', 'denominador', 'المقام', 'denominator')
        ],
        explanation: say(
            'Katearen erregelaren bi kasu, alderantziz. $e^u$ agertzen bada eta kanpoan $u\'$ badago, jatorrizkoa $e^u$ da. Zatiki batean zenbakitzailea izendatzailearen deribatua bada, jatorrizkoa izendatzailearen logaritmoa da: $\\int\\frac{u\'}{u}\\,dx=\\ln|u|+k$.',
            'Dos casos de la regla de la cadena al revés. Si aparece $e^u$ y fuera está $u\'$, la primitiva es $e^u$. Si en una fracción el numerador es la derivada del denominador, la primitiva es el logaritmo del denominador: $\\int\\frac{u\'}{u}\\,dx=\\ln|u|+k$.',
            'حالتان من قاعدة السلسلة بالعكس. إذا ظهر $e^u$ وكان في الخارج $u\'$ فالأصلية $e^u$. وإذا كان البسط في كسر مشتقة المقام فالأصلية لوغاريتم المقام: $\\int\\frac{u\'}{u}\\,dx=\\ln|u|+k$.',
            'Two cases of the chain rule backwards. If $e^u$ appears and $u\'$ is outside, the antiderivative is $e^u$. If in a fraction the numerator is the derivative of the denominator, the antiderivative is the logarithm of the denominator: $\\int\\frac{u\'}{u}\\,dx=\\ln|u|+k$.'
        ),
        examplePrompt: say('Kalkulatu $\\int 2x\\,e^{x^2}\\,dx$.', 'Calcula $\\int 2x\\,e^{x^2}\\,dx$.', 'احسب $\\int 2x\\,e^{x^2}\\,dx$.', 'Work out $\\int 2x\\,e^{x^2}\\,dx$.'),
        example: same('$u=x^2,\\ u\'=2x\\ \\to\\ e^{x^2}+k$'),
        exampleAnswer: say('Kanpoan berretzailearen deribatua dago.', 'Fuera está la derivada del exponente.', 'في الخارج مشتقة الأس.', 'The derivative of the exponent is outside.')
    },
    adjust: {
        definitions: [
            { term: say('Konstante bat doitzea', 'Ajustar una constante', 'ضبط ثابت', 'Adjusting a constant'), meaning: say('Zenbaki berberaz barruan biderkatzea eta kanpoan zatitzea, $u\'$ zehazki ager dadin.', 'Multiplicar dentro y dividir fuera por el mismo número, para que aparezca exactamente $u\'$.', 'الضرب في الداخل والقسمة في الخارج على العدد نفسه ليظهر $u\'$ تمامًا.', 'Multiplying inside and dividing outside by the same number, so that exactly $u\'$ appears.') }
        ],
        vocabulary: [
            say('zenbakia', 'número', 'العدد', 'number'),
            say('aldagaia', 'variable', 'المتغير', 'variable')
        ],
        explanation: say(
            'Batzuetan integrala ia berehalakoa da, baina $u\'$ deribatuari zenbaki bat falta zaio. Barruan zenbaki horrekin biderkatzen da eta kanpoan zatitzen: balioa ez da aldatzen. Aldagai batekin ezin da egin, $x$ bat ez delako integraletik ateratzen zenbaki bat bezala.',
            'A veces la integral es casi inmediata, pero a $u\'$ le falta un número. Se multiplica dentro por ese número y se divide fuera: el valor no cambia. Con una variable no se puede hacer, porque una $x$ no sale de la integral como sale un número.',
            'أحيانًا يكون التكامل شبه مباشر لكن ينقص $u\'$ عدد. نضرب في الداخل في هذا العدد ونقسم في الخارج: لا تتغير القيمة. ولا يصح ذلك مع متغير، لأن $x$ لا تخرج من التكامل كما يخرج العدد.',
            'Sometimes the integral is almost basic, but $u\'$ is missing a number. Multiply inside by that number and divide outside: the value does not change. It cannot be done with a variable, because an $x$ does not come out of the integral the way a number does.'
        ),
        examplePrompt: say('Kalkulatu $\\int(4x+1)^3\\,dx$.', 'Calcula $\\int(4x+1)^3\\,dx$.', 'احسب $\\int(4x+1)^3\\,dx$.', 'Work out $\\int(4x+1)^3\\,dx$.'),
        example: same('$\\begin{aligned}&\\frac{1}{4}\\int 4(4x+1)^3\\,dx\\\\ &=\\frac{(4x+1)^4}{16}+k\\end{aligned}$'),
        exampleAnswer: say('$u\'=4$ deribatuaren 4 zenbakia falta zen.', 'Faltaba el 4 de $u\'=4$.', 'كان ينقص العدد 4 من $u\'=4$.', 'The 4 of $u\'=4$ was missing.')
    },

    /* ---------- 4. The definite integral ---------- */
    rectangles: {
        definitions: [
            { term: say('Integral mugatua', 'Integral definida', 'التكامل المحدد', 'Definite integral'), meaning: say('$\\int_a^b f(x)\\,dx$: $f$ kurbaren azpian, $a$ eta $b$ artean, laukizuzenen baturak hurbiltzen diren zenbakia.', '$\\int_a^b f(x)\\,dx$: el número al que se acercan las sumas de rectángulos bajo $f$ entre $a$ y $b$.', '$\\int_a^b f(x)\\,dx$: العدد الذي تقترب منه مجاميع المستطيلات تحت $f$ بين $a$ و$b$.', '$\\int_a^b f(x)\\,dx$: the number that the sums of rectangles under $f$ between $a$ and $b$ approach.') }
        ],
        vocabulary: [
            say('laukizuzena', 'rectángulo', 'المستطيل', 'rectangle'),
            say('batura', 'suma', 'المجموع', 'sum')
        ],
        explanation: say(
            'Kurbaren azpian oinarri bereko laukizuzenak jartzen dira. Haien azalera erraza da: oinarria bider altuera. Baturak azaleraren hurbilketa bat ematen du; laukizuzenak estuago egiten badira, batura gero eta gehiago hurbiltzen da zenbaki batera. Zenbaki hori integral mugatua da, $\\int_a^b f(x)\\,dx$.',
            'Bajo la curva se ponen rectángulos de la misma base. Su área es fácil: base por altura. La suma da una aproximación del área; si los rectángulos se hacen más estrechos, la suma se acerca cada vez más a un número. Ese número es la integral definida, $\\int_a^b f(x)\\,dx$.',
            'نضع تحت المنحنى مستطيلات لها القاعدة نفسها. ومساحتها سهلة: القاعدة في الارتفاع. ويعطي المجموع تقريبًا للمساحة؛ وإذا ضاقت المستطيلات اقترب المجموع أكثر فأكثر من عدد. ذلك العدد هو التكامل المحدد $\\int_a^b f(x)\\,dx$.',
            'Rectangles with the same base are placed under the curve. Their area is easy: base times height. The sum gives an approximation of the area; if the rectangles get narrower, the sum gets closer and closer to a number. That number is the definite integral, $\\int_a^b f(x)\\,dx$.'
        ),
        examplePrompt: say('Hurbildu $f(x)=x$ zuzenaren azpiko azalera, 0 eta 4 artean, 2 oinarriko 2 laukizuzenekin (altuera eskuinean).', 'Aproxima el área bajo $f(x)=x$ entre 0 y 4 con 2 rectángulos de base 2 (altura a la derecha).', 'قرّب المساحة تحت $f(x)=x$ بين 0 و4 بمستطيلين قاعدة كل منهما 2 (الارتفاع عند اليمين).', 'Approximate the area under $f(x)=x$ between 0 and 4 with 2 rectangles of base 2 (height on the right).'),
        example: same('$\\begin{aligned}&2\\cdot f(2)+2\\cdot f(4)\\\\ &=2\\cdot 2+2\\cdot 4=12\\end{aligned}$'),
        exampleAnswer: say('Batura 12 da; azalera zehatza, triangelu bat, 8 da: laukizuzenak pasatu egiten dira.', 'La suma es 12; el área exacta, un triángulo, es 8: los rectángulos se pasan.', 'المجموع 12، والمساحة الدقيقة لمثلث 8: المستطيلات تزيد عليها.', 'The sum is 12; the exact area, a triangle, is 8: the rectangles overshoot.')
    },
    barrow: {
        definitions: [
            { term: say('Barrow-ren erregela', 'Regla de Barrow', 'قاعدة بارو', 'Barrow\'s rule'), meaning: say('$\\int_a^b f(x)\\,dx=F(b)-F(a)$, $F$ funtzioa $f$ funtzioaren jatorrizko bat izanik.', '$\\int_a^b f(x)\\,dx=F(b)-F(a)$, con $F$ una primitiva de $f$.', '$\\int_a^b f(x)\\,dx=F(b)-F(a)$ حيث $F$ دالة أصلية لـ $f$.', '$\\int_a^b f(x)\\,dx=F(b)-F(a)$, with $F$ an antiderivative of $f$.') }
        ],
        vocabulary: [
            say('integrazio-muga', 'límite de integración', 'حد التكامل', 'limit of integration'),
            say('jatorrizkoa', 'primitiva', 'الدالة الأصلية', 'antiderivative')
        ],
        explanation: say(
            'Integrala laukizuzenekin kalkulatzea luzea da. Barrow-ren erregelak laburtu egiten du: $F$ jatorrizko bat bilatzen da, goiko mugan eta beheko mugan ebaluatzen da, eta kendu egiten dira, $F(b)-F(a)$. Berdin du zein jatorrizko erabili: $k$ konstantea kentzean desagertzen da.',
            'Calcular la integral con rectángulos es largo. La regla de Barrow lo acorta: se busca una primitiva $F$, se evalúa en el límite de arriba y en el de abajo, y se restan, $F(b)-F(a)$. Da igual qué primitiva se use: la constante $k$ se va al restar.',
            'حساب التكامل بالمستطيلات طويل. وقاعدة بارو تختصره: نبحث عن دالة أصلية $F$، ونحسبها عند الحد الأعلى والحد الأدنى ونطرح: $F(b)-F(a)$. ولا يهم أي أصلية نستعمل: يختفي الثابت $k$ عند الطرح.',
            'Working out the integral with rectangles is long. Barrow\'s rule shortens it: find an antiderivative $F$, evaluate it at the top limit and at the bottom one, and subtract, $F(b)-F(a)$. It does not matter which antiderivative you use: the constant $k$ goes away when subtracting.'
        ),
        examplePrompt: say('Kalkulatu $\\int_1^3(2x+1)\\,dx$.', 'Calcula $\\int_1^3(2x+1)\\,dx$.', 'احسب $\\int_1^3(2x+1)\\,dx$.', 'Work out $\\int_1^3(2x+1)\\,dx$.'),
        example: same('$\\left[x^2+x\\right]_1^3=12-2=10$'),
        exampleAnswer: say('Integralak 10 balio du.', 'La integral vale 10.', 'قيمة التكامل 10.', 'The integral is 10.'),
        why: {
            text: say(
                'Zergatik dabil? Izan bedi $A(x)$ azalera, $a$ puntutik $x$ puntura arte. $x$ pixka bat aurreratzen bada, $h$, azalera $f(x)$ altuerako laukizuzen bat handitzen da, gutxi gorabehera: $A\'=f$. Beraz, $A$ funtzioa $f$ funtzioaren jatorrizkoa da, $A(a)=0$ izanik, eta $b$ punturako azalera $F(b)-F(a)$ da.',
                '¿Por qué funciona? Sea $A(x)$ el área desde $a$ hasta $x$. Si $x$ avanza un poco, $h$, el área crece casi un rectángulo de altura $f(x)$: $A\'=f$. Así $A$ es una primitiva de $f$ con $A(a)=0$, y el área hasta $b$ es $F(b)-F(a)$.',
                'لماذا ينجح؟ لتكن $A(x)$ المساحة من $a$ إلى $x$. إذا تقدم $x$ قليلًا بمقدار $h$ زادت المساحة بما يقارب مستطيلًا ارتفاعه $f(x)$: $A\'=f$. إذن $A$ أصلية لـ $f$ مع $A(a)=0$، والمساحة حتى $b$ هي $F(b)-F(a)$.',
                'Why does it work? Let $A(x)$ be the area from $a$ to $x$. If $x$ moves on a little, $h$, the area grows by almost a rectangle of height $f(x)$: $A\'=f$. So $A$ is an antiderivative of $f$ with $A(a)=0$, and the area up to $b$ is $F(b)-F(a)$.'
            ),
            math: same('$A(x+h)-A(x)\\approx f(x)\\cdot h$')
        }
    },
    properties: {
        vocabulary: [
            say('tartea', 'intervalo', 'الفترة', 'interval'),
            say('zeinua', 'signo', 'الإشارة', 'sign')
        ],
        explanation: say(
            'Integral mugatuak zeinudun azalera baten moduan jokatzen du. Tartea puntu batean zatitzen bada, bi integralak batu egiten dira. Mugen ordena aldatzen bada, zeinua aldatzen da, eta bi mugak berdinak badira, 0 da. Baturak banatu egiten dira, eta biderkatzen duten zenbakiak kanpora ateratzen dira.',
            'La integral definida se comporta como un área con signo. Si se parte el intervalo en un punto, las dos integrales se suman. Si se cambian los límites de orden, cambia el signo, y con los dos límites iguales vale 0. Las sumas se reparten y los números que multiplican salen fuera.',
            'يتصرف التكامل المحدد كمساحة ذات إشارة. إذا قُسمت الفترة عند نقطة جُمع التكاملان. وإذا عُكس ترتيب الحدين تغيرت الإشارة، ومع تساوي الحدين يساوي 0. وتتوزع المجاميع وتخرج الأعداد المضروبة.',
            'The definite integral behaves like an area with a sign. If the interval is split at a point, the two integrals add up. If the order of the limits is swapped, the sign changes, and with the two limits equal it is 0. Sums split and the numbers that multiply come out.'
        ),
        examplePrompt: say('$\\int_1^4 g(x)\\,dx=6$ bada, kalkulatu $\\int_1^4 3g(x)\\,dx$ eta $\\int_4^1 g(x)\\,dx$.', 'Si $\\int_1^4 g(x)\\,dx=6$, calcula $\\int_1^4 3g(x)\\,dx$ y $\\int_4^1 g(x)\\,dx$.', 'إذا كان $\\int_1^4 g(x)\\,dx=6$ فاحسب $\\int_1^4 3g(x)\\,dx$ و$\\int_4^1 g(x)\\,dx$.', 'If $\\int_1^4 g(x)\\,dx=6$, work out $\\int_1^4 3g(x)\\,dx$ and $\\int_4^1 g(x)\\,dx$.'),
        example: same('$\\begin{aligned}&\\int_1^4 3g(x)\\,dx=3\\cdot 6=18\\\\ &\\int_4^1 g(x)\\,dx=-6\\end{aligned}$'),
        exampleAnswer: say('3 zenbakia kanpora ateratzen da; mugak alderantzikatzean, zeinua aldatzen da.', 'El 3 sale fuera; al invertir los límites cambia el signo.', 'يخرج العدد 3؛ وعند قلب الحدّين تتغير الإشارة.', 'The 3 comes out; swapping the limits changes the sign.')
    },

    /* ---------- 5. Areas ---------- */
    'area-axis': {
        definitions: [
            { term: say('Barrutia', 'Recinto', 'المنطقة', 'Region'), meaning: say('Kurbak, X ardatzak eta bi zuzen bertikalek mugatutako planoaren zatia.', 'La parte del plano limitada por la curva, el eje X y dos rectas verticales.', 'جزء المستوى المحدود بالمنحنى ومحور X ومستقيمين رأسيين.', 'The part of the plane bounded by the curve, the x-axis and two vertical lines.') }
        ],
        vocabulary: [
            say('azalera', 'área', 'المساحة', 'area'),
            say('ardatza', 'eje', 'المحور', 'axis')
        ],
        explanation: say(
            'Kurba X ardatzaren gainean badago $a$ eta $b$ artean, integral mugatuak barrutiaren azalera neurtzen du, zehazki. Urratsak: mugak aurkitu (ematen ez badituzte, ardatzarekiko ebaki-puntuak), jatorrizko bat bilatu eta Barrow-ren erregela aplikatu. Azalera unitate karratutan ematen da, u².',
            'Si la curva queda por encima del eje X entre $a$ y $b$, la integral definida mide justo el área del recinto. Los pasos: hallar los límites (si no los dan, los cortes con el eje), buscar una primitiva y aplicar la regla de Barrow. El área se da en unidades cuadradas, u².',
            'إذا كان المنحنى فوق محور X بين $a$ و$b$ فإن التكامل المحدد يقيس مساحة المنطقة تمامًا. الخطوات: إيجاد الحدين (وإذا لم يُعطيا فنقطتا التقاطع مع المحور)، ثم البحث عن دالة أصلية وتطبيق قاعدة بارو. وتُعطى المساحة بالوحدات المربعة.',
            'If the curve is above the x-axis between $a$ and $b$, the definite integral measures exactly the area of the region. The steps: find the limits (if they are not given, where the curve meets the axis), find an antiderivative and apply Barrow\'s rule. The area is given in square units.'
        ),
        examplePrompt: say('Aurkitu $f(x)=6x-x^2$ kurbaren eta X ardatzaren arteko azalera.', 'Halla el área entre $f(x)=6x-x^2$ y el eje X.', 'أوجد المساحة بين $f(x)=6x-x^2$ ومحور X.', 'Find the area between $f(x)=6x-x^2$ and the x-axis.'),
        example: same('$\\begin{aligned}&\\left[3x^2-\\frac{x^3}{3}\\right]_0^6\\\\ &=108-72=36\\end{aligned}$'),
        exampleAnswer: say('Ebaki-puntuak 0 eta 6 dira; azalera 36 u² da.', 'Los cortes son 0 y 6; el área es 36 u².', 'نقطتا التقاطع 0 و6، والمساحة 36 وحدة مربعة.', 'The crossings are 0 and 6; the area is 36 square units.')
    },
    'area-sign': {
        definitions: [
            { term: say('Zeinudun azalera', 'Área con signo', 'المساحة ذات الإشارة', 'Signed area'), meaning: say('Integralak neurtzen duena: positiboa X ardatzaren gainean, negatiboa azpian.', 'Lo que mide la integral: positiva sobre el eje X, negativa debajo.', 'ما يقيسه التكامل: موجبة فوق محور X وسالبة تحته.', 'What the integral measures: positive above the x-axis, negative below.') }
        ],
        vocabulary: [
            say('balio absolutua', 'valor absoluto', 'القيمة المطلقة', 'absolute value'),
            say('ebaki-puntua', 'corte', 'نقطة التقاطع', 'crossing')
        ],
        explanation: say(
            'Kurba X ardatzaren azpian dagoen tokian, integrala negatiboa ateratzen da. Kurbak ardatza gurutzatzen badu, goiko eta beheko zatiak kendu egiten dira, eta integralak 0 ere eman dezake. Azalerarako: ebaki-puntuak aurkitu, zati bakoitzean integratu eta balio absolutuak batu.',
            'Donde la curva está bajo el eje X, la integral sale negativa. Si la curva cruza el eje, las partes de arriba y de abajo se restan, y la integral puede dar incluso 0. Para el área: hallar los cortes, integrar en cada trozo y sumar los valores absolutos.',
            'حيث يكون المنحنى تحت محور X يخرج التكامل سالبًا. وإذا عبر المنحنى المحور طُرح الجزء السفلي من العلوي، وقد يعطي التكامل حتى 0. وللمساحة: نجد نقاط التقاطع، ونكامل على كل جزء، ونجمع القيم المطلقة.',
            'Where the curve is below the x-axis, the integral comes out negative. If the curve crosses the axis, the parts above and below cancel, and the integral can even be 0. For the area: find the crossings, integrate on each piece and add the absolute values.'
        ),
        examplePrompt: say('Aurkitu $f(x)=x^3$ kurbaren eta X ardatzaren arteko azalera $[-1,\\,1]$ tartean.', 'Halla el área entre $f(x)=x^3$ y el eje X en $[-1,\\,1]$.', 'أوجد المساحة بين $f(x)=x^3$ ومحور X في $[-1,\\,1]$.', 'Find the area between $f(x)=x^3$ and the x-axis on $[-1,\\,1]$.'),
        example: same('$\\begin{aligned}&\\left|\\int_{-1}^{0}x^3\\,dx\\right|+\\int_0^1 x^3\\,dx\\\\ &=\\frac{1}{4}+\\frac{1}{4}=\\frac{1}{2}\\end{aligned}$'),
        exampleAnswer: say('Azalera $\\frac{1}{2}$ u² da, nahiz eta $\\int_{-1}^{1}x^3\\,dx=0$ izan.', 'El área es $\\frac{1}{2}$ u², aunque $\\int_{-1}^{1}x^3\\,dx=0$.', 'المساحة $\\frac{1}{2}$ وحدة مربعة مع أن $\\int_{-1}^{1}x^3\\,dx=0$.', 'The area is $\\frac{1}{2}$ square units, even though $\\int_{-1}^{1}x^3\\,dx=0$.'),
        why: {
            text: say(
                'Zergatik ateratzen da negatiboa? Ardatzaren azpian $f(x)<0$ da: baturaren laukizuzenek altuera negatiboa dute. Integralak «oinarria bider altuera» batzen du, bere zeinuarekin; azalerak, ordea, beti positiboan neurtzen du.',
                '¿Por qué sale negativa? Bajo el eje, $f(x)<0$: los rectángulos de la suma tienen altura negativa. La integral suma «base por altura» con su signo; el área, en cambio, mide siempre en positivo.',
                'لماذا يخرج سالبًا؟ تحت المحور يكون $f(x)<0$: للمستطيلات في المجموع ارتفاع سالب. والتكامل يجمع «القاعدة في الارتفاع» بإشارتها، أما المساحة فتُقاس دائمًا موجبة.',
                'Why does it come out negative? Below the axis, $f(x)<0$: the rectangles of the sum have a negative height. The integral adds up «base times height» with its sign; the area, on the other hand, is always measured as positive.'
            ),
            math: same('$0{,}5\\cdot f(1)=0{,}5\\cdot(-1)=-0{,}5$')
        }
    },
    'between-curves': {
        definitions: [
            { term: say('Ebaki-puntuak', 'Puntos de corte', 'نقاط التقاطع', 'Crossing points'), meaning: say('$x$ balioak, $f(x)=g(x)$ betetzen den tokian: han hasten eta amaitzen dira barrutiaren zatiak.', 'Los $x$ donde $f(x)=g(x)$: allí empiezan y terminan los trozos del recinto.', 'قيم $x$ التي يكون عندها $f(x)=g(x)$: هناك تبدأ أجزاء المنطقة وتنتهي.', 'The values of $x$ where $f(x)=g(x)$: the pieces of the region start and end there.') }
        ],
        vocabulary: [
            say('kurba', 'curva', 'المنحنى', 'curve'),
            say('muga', 'límite', 'الحد', 'limit')
        ],
        explanation: say(
            'Bi kurben artean, laukizuzen bakoitzaren altuera haien arteko distantzia da: goikoa ken behekoa. Horregatik $f-g$ integratzen da ebaki-puntuen artean. Kurbak tartearen barruan gurutzatzen badira, gurutzatzen diren tokian zatitzen da, han aldatzen delako zein dagoen goian.',
            'Entre dos curvas, la altura de cada rectángulo es la distancia entre ellas: la de arriba menos la de abajo. Por eso se integra $f-g$ entre los cortes. Si las curvas se cruzan dentro del intervalo, se parte en el cruce, porque allí cambia cuál va arriba.',
            'بين منحنيين يكون ارتفاع كل مستطيل المسافة بينهما: الأعلى ناقص الأدنى. لذلك نكامل $f-g$ بين نقاط التقاطع. وإذا تقاطع المنحنيان داخل الفترة نقسم عند التقاطع، لأن الأعلى يتغير هناك.',
            'Between two curves, the height of each rectangle is the distance between them: the top one minus the bottom one. That is why you integrate $f-g$ between the crossings. If the curves cross inside the interval, split at the crossing, because there the one on top changes.'
        ),
        examplePrompt: say('Aurkitu $y=x$ eta $y=x^3$ kurben arteko azalera, $x\\ge 0$ denean.', 'Halla el área entre $y=x$ e $y=x^3$ para $x\\ge 0$.', 'أوجد المساحة بين $y=x$ و$y=x^3$ عندما $x\\ge 0$.', 'Find the area between $y=x$ and $y=x^3$ for $x\\ge 0$.'),
        example: same('$\\int_0^1(x-x^3)\\,dx=\\frac{1}{2}-\\frac{1}{4}=\\frac{1}{4}$'),
        exampleAnswer: say('0 eta 1 puntuetan ebakitzen dira, eta goian $y=x$ dago: azalera $\\frac{1}{4}$ u² da.', 'Se cortan en 0 y 1, y arriba está $y=x$: el área es $\\frac{1}{4}$ u².', 'يتقاطعان عند 0 و1، وفي الأعلى $y=x$: المساحة $\\frac{1}{4}$ وحدة مربعة.', 'They meet at 0 and 1, and $y=x$ is on top: the area is $\\frac{1}{4}$ square units.')
    }
}
