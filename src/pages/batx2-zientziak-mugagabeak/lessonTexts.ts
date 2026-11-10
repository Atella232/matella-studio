import type { LessonTexts } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from '../batx1-zientziak-funtzioak/text.ts'
import type { Bach2IndefiniteTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Integral mugagabeak · Batxilergoa 2 · Zientziak — what each lesson
   tells: the new words (definitions), a short explanation, the example as
   an exercise («Another example»), the key words in four languages and, in
   six lessons, «Why does it work?». Plain data so the tests can import it;
   lessons.tsx merges it into the topics and gives each language its
   trigonometric names (\sin is sen in Spanish). The example uses numbers
   of its own, never those of «Let's solve», of «Check it» or of the
   typical mistake. Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

export const bach2IndefiniteLessonTexts: Record<Bach2IndefiniteTopicId, LessonTexts> = {
    /* ---------- 1. Review ---------- */
    table: {
        definitions: [
            { term: say('Integral berehalakoa', 'Integral inmediata', 'التكامل المباشر', 'Basic integral'), meaning: say('Deribatuen taulan zuzenean irakurtzen den integrala, alderantziz irakurrita.', 'Una integral que se lee directamente en la tabla de derivadas, al revés.', 'تكامل يُقرأ مباشرة في جدول المشتقات بالعكس.', 'An integral you read straight from the table of derivatives, backwards.') }
        ],
        vocabulary: [
            say('konstantea', 'constante', 'الثابت', 'constant'),
            say('logaritmoa', 'logaritmo', 'اللوغاريتم', 'logarithm')
        ],
        explanation: say(
            'Integratzea deribatua desegitea da; beraz, 1. mailako taula alderantziz irakurtzen da. Batura baten integrala integralen batura da, eta biderkatzen duten zenbakiak kanpora ateratzen dira. Gai bakoitza bere aldetik integratzen da, eta amaieran $k$ konstante bakarra jartzen da. Deribatuz egiaztatzen da.',
            'Integrar es deshacer la derivada, así que la tabla de 1.º se lee al revés. La integral de una suma es la suma de las integrales, y los números que multiplican salen fuera. Cada término se integra por separado y al final se pone una sola constante $k$. Se comprueba derivando.',
            'التكامل عكس الاشتقاق، لذلك نقرأ جدول السنة الأولى بالعكس. تكامل المجموع هو مجموع التكاملات، والأعداد المضروبة تخرج. نكامل كل حد على حدة، ونضع في النهاية ثابتًا واحدًا $k$. ونتحقق بالاشتقاق.',
            'Integrating undoes the derivative, so the table from 1.º is read backwards. The integral of a sum is the sum of the integrals, and the numbers that multiply come out. Each term is integrated on its own, and at the end a single constant $k$ is added. You check by differentiating.'
        ),
        examplePrompt: say('Kalkulatu $\\int\\left(5\\cos x+\\frac{2}{1+x^2}\\right)dx$.', 'Calcula $\\int\\left(5\\cos x+\\frac{2}{1+x^2}\\right)dx$.', 'احسب $\\int\\left(5\\cos x+\\frac{2}{1+x^2}\\right)dx$.', 'Work out $\\int\\left(5\\cos x+\\frac{2}{1+x^2}\\right)dx$.'),
        example: same('$5\\sin x+2\\arctan x+k$'),
        exampleAnswer: say('Deribatuz gero, berriro $5\\cos x+\\frac{2}{1+x^2}$ ateratzen da.', 'Al derivar sale otra vez $5\\cos x+\\frac{2}{1+x^2}$.', 'وبالاشتقاق نحصل من جديد على $5\\cos x+\\frac{2}{1+x^2}$.', 'Differentiating gives $5\\cos x+\\frac{2}{1+x^2}$ again.'),
        why: {
            text: say(
                'Zergatik egin daiteke gaiz gai? Deribatzea ere gaiz gai egiten da: $(F+G)\'=F\'+G\'$ eta $(c\\cdot F)\'=c\\cdot F\'$. $F$ eta $G$ funtzioak $f$ eta $g$ funtzioen jatorrizkoak badira, $F+G$ funtzioa $f+g$ funtzioarena da.',
                '¿Por qué se puede término a término? Derivar también se hace término a término: $(F+G)\'=F\'+G\'$ y $(c\\cdot F)\'=c\\cdot F\'$. Si $F$ y $G$ son primitivas de $f$ y $g$, $F+G$ lo es de $f+g$.',
                'لماذا يصح حدًّا حدًّا؟ الاشتقاق أيضًا يتم حدًّا حدًّا: $(F+G)\'=F\'+G\'$ و$(c\\cdot F)\'=c\\cdot F\'$. فإذا كانت $F$ و$G$ أصليتين لـ $f$ و$g$ فإن $F+G$ أصلية لـ $f+g$.',
                'Why can you go term by term? Differentiating also goes term by term: $(F+G)\'=F\'+G\'$ and $(c\\cdot F)\'=c\\cdot F\'$. If $F$ and $G$ are antiderivatives of $f$ and $g$, $F+G$ is one of $f+g$.'
            )
        }
    },
    composed: {
        definitions: [
            { term: say('Integral konposatua', 'Integral compuesta', 'التكامل المركّب', 'Composite integral'), meaning: say('$f(u)\\cdot u\'$ formako funtzio baten integrala, $u$ funtzioa $x$ aldagaiaren funtzio bat izanik: katearen erregela alderantziz.', 'La de una función de la forma $f(u)\\cdot u\'$, con $u$ función de $x$: la regla de la cadena al revés.', 'تكامل دالة من الشكل $f(u)\\cdot u\'$ حيث $u$ دالة لـ $x$: قاعدة السلسلة بالعكس.', 'The integral of a function of the form $f(u)\\cdot u\'$, with $u$ a function of $x$: the chain rule backwards.') }
        ],
        vocabulary: [
            say('deribatua', 'derivada', 'المشتقة', 'derivative'),
            say('kosinua', 'coseno', 'جيب التمام', 'cosine')
        ],
        explanation: say(
            'Integral konposatu batean $u$ funtzio bat dago barruan, eta haren $u\'$ deribatua kanpoan biderkatzen. Orduan $u$ aldagaia $x$ balitz bezala integratzen da, taula berarekin: $u$ aldagaiaren kosinuak $u$ aldagaiaren sinua ematen du. $u\'$ deribatuari zenbaki bat falta bazaio, barruan biderkatu eta kanpoan zatituz doitzen da.',
            'En una integral compuesta hay una función $u$ dentro y su derivada $u\'$ multiplicando fuera. Entonces se integra como si $u$ fuera $x$, con la misma tabla: el coseno de $u$ da el seno de $u$. Si a $u\'$ le falta un número, se ajusta multiplicando dentro y dividiendo fuera.',
            'في التكامل المركّب توجد دالة $u$ في الداخل ومشتقتها $u\'$ مضروبة في الخارج. عندئذ نكامل كأن $u$ هي $x$ بالجدول نفسه: جيب تمام $u$ يعطي جيب $u$. وإذا نقص $u\'$ عدد نضبطه بالضرب في الداخل والقسمة في الخارج.',
            'In a composite integral there is a function $u$ inside and its derivative $u\'$ multiplying outside. Then you integrate as if $u$ were $x$, with the same table: the cosine of $u$ gives the sine of $u$. If $u\'$ is missing a number, adjust by multiplying inside and dividing outside.'
        ),
        examplePrompt: say('Kalkulatu $\\int\\frac{3}{\\cos^2(3x+1)}\\,dx$.', 'Calcula $\\int\\frac{3}{\\cos^2(3x+1)}\\,dx$.', 'احسب $\\int\\frac{3}{\\cos^2(3x+1)}\\,dx$.', 'Work out $\\int\\frac{3}{\\cos^2(3x+1)}\\,dx$.'),
        example: same('$\\tan(3x+1)+k$'),
        exampleAnswer: say('Kanpoko 3 zenbakia $u=3x+1$ funtzioaren deribatua da.', 'El 3 de fuera es la derivada de $u=3x+1$.', 'العدد 3 في الخارج هو مشتقة $u=3x+1$.', 'The 3 outside is the derivative of $u=3x+1$.'),
        why: {
            text: say(
                'Zergatik dabil? Katearen erregelagatik: $F(u)$ funtzioaren deribatua $F\'(u)\\cdot u\'=f(u)\\cdot u\'$ da. Integratzeak urrats hori desegiten du, $u\'$ kanpoan badago.',
                '¿Por qué funciona? Por la regla de la cadena: la derivada de $F(u)$ es $F\'(u)\\cdot u\'=f(u)\\cdot u\'$. Integrar deshace ese paso, siempre que $u\'$ esté fuera.',
                'لماذا ينجح؟ بسبب قاعدة السلسلة: مشتقة $F(u)$ هي $F\'(u)\\cdot u\'=f(u)\\cdot u\'$. والتكامل يعكس هذه الخطوة ما دام $u\'$ في الخارج.',
                'Why does it work? Because of the chain rule: the derivative of $F(u)$ is $F\'(u)\\cdot u\'=f(u)\\cdot u\'$. Integrating undoes that step, as long as $u\'$ is outside.'
            )
        }
    },
    'composed-arcs': {
        vocabulary: [
            say('karratua', 'cuadrado', 'المربع', 'square'),
            say('faktore komuna', 'factor común', 'عامل مشترك', 'common factor')
        ],
        explanation: say(
            'Izendatzailea $a^2+x^2$ bada, $a^2$ faktore komun gisa ateratzen da eta $1+\\left(\\frac{x}{a}\\right)^2$ geratzen da: $u=\\frac{x}{a}$ zatikiaren karratua, beraz arku tangente bat. $a^2-x^2$ adierazpenaren erroarekin berdin egiten da, baina arku sinu bat ateratzen da. Amaieran konstantea doitzen da, $u\'=\\frac{1}{a}$ delako.',
            'Si el denominador es $a^2+x^2$, se saca $a^2$ factor común y queda $1+\\left(\\frac{x}{a}\\right)^2$: el cuadrado de $u=\\frac{x}{a}$, y por tanto una arcotangente. Con una raíz de $a^2-x^2$ se hace igual, pero sale un arcoseno. Al final se ajusta la constante, porque $u\'=\\frac{1}{a}$.',
            'إذا كان المقام $a^2+x^2$ نخرج $a^2$ عاملًا مشتركًا فيبقى $1+\\left(\\frac{x}{a}\\right)^2$: مربع $u=\\frac{x}{a}$، إذن قوس ظل. ومع جذر $a^2-x^2$ نفعل الشيء نفسه لكن يخرج قوس جيب. وفي النهاية نضبط الثابت لأن $u\'=\\frac{1}{a}$.',
            'If the denominator is $a^2+x^2$, take $a^2$ out as a common factor and $1+\\left(\\frac{x}{a}\\right)^2$ is left: the square of $u=\\frac{x}{a}$, so an arctangent. With a root of $a^2-x^2$ you do the same, but an arcsine comes out. At the end adjust the constant, because $u\'=\\frac{1}{a}$.'
        ),
        examplePrompt: say('Kalkulatu $\\int\\frac{dx}{\\sqrt{4-x^2}}$.', 'Calcula $\\int\\frac{dx}{\\sqrt{4-x^2}}$.', 'احسب $\\int\\frac{dx}{\\sqrt{4-x^2}}$.', 'Work out $\\int\\frac{dx}{\\sqrt{4-x^2}}$.'),
        example: same('$\\arcsin\\frac{x}{2}+k$'),
        exampleAnswer: say('4 zenbakia errotik ateratzean $\\frac{1}{2}$ ateratzen da, eta hori da, hain zuzen, $u\'$.', 'Al sacar el 4 de la raíz sale $\\frac{1}{2}$, que es justo $u\'$.', 'عند إخراج 4 من الجذر يخرج $\\frac{1}{2}$، وهو بالضبط $u\'$.', 'Taking the 4 out of the root gives $\\frac{1}{2}$, which is exactly $u\'$.')
    },

    /* ---------- 2. Integration by parts ---------- */
    'by-parts': {
        definitions: [
            { term: say('Zatikako integrazioa', 'Integración por partes', 'التكامل بالتجزئة', 'Integration by parts'), meaning: say('Biderkadura bat integratzeko metodoa: $\\int u\\,dv=uv-\\int v\\,du$.', 'Método para integrar un producto: $\\int u\\,dv=uv-\\int v\\,du$.', 'طريقة لتكامل جداء: $\\int u\\,dv=uv-\\int v\\,du$.', 'A method for integrating a product: $\\int u\\,dv=uv-\\int v\\,du$.') },
            { term: say('Diferentziala', 'Diferencial', 'التفاضل', 'Differential'), meaning: say('$du=u\'\\,dx$: $u$ funtzioaren deribatua bider $dx$.', '$du=u\'\\,dx$: la derivada de $u$ multiplicada por $dx$.', '$du=u\'\\,dx$: مشتقة $u$ مضروبة في $dx$.', '$du=u\'\\,dx$: the derivative of $u$ times $dx$.') }
        ],
        vocabulary: [
            say('biderkadura', 'producto', 'الجداء', 'product'),
            say('faktorea', 'factor', 'العامل', 'factor')
        ],
        explanation: say(
            'Biderkadura baten deribatutik dator, $(uv)\'=u\'v+uv\'$: integratu eta askatzean $\\int u\\,dv=uv-\\int v\\,du$ geratzen da. Faktore bat $u$ da, deribatzen dena, eta bestea $dv$, integratzen dena. Aukera ona da integral berria, $\\int v\\,du$, hasierakoa baino errazagoa bada.',
            'Sale de la derivada de un producto, $(uv)\'=u\'v+uv\'$: al integrar y despejar queda $\\int u\\,dv=uv-\\int v\\,du$. Un factor es $u$, que se deriva, y el otro es $dv$, que se integra. La elección es buena si la integral nueva, $\\int v\\,du$, es más fácil que la de partida.',
            'تأتي من مشتقة الجداء $(uv)\'=u\'v+uv\'$: بالتكامل ثم العزل يبقى $\\int u\\,dv=uv-\\int v\\,du$. أحد العاملين $u$ ونشتقه، والآخر $dv$ ونكامله. ويكون الاختيار جيدًا إذا كان التكامل الجديد $\\int v\\,du$ أسهل من الأصلي.',
            'It comes from the derivative of a product, $(uv)\'=u\'v+uv\'$: integrating and rearranging gives $\\int u\\,dv=uv-\\int v\\,du$. One factor is $u$, which is differentiated, and the other is $dv$, which is integrated. The choice is good if the new integral, $\\int v\\,du$, is easier than the starting one.'
        ),
        examplePrompt: say('Kalkulatu $\\int x\\cos x\\,dx$.', 'Calcula $\\int x\\cos x\\,dx$.', 'احسب $\\int x\\cos x\\,dx$.', 'Work out $\\int x\\cos x\\,dx$.'),
        example: same('$\\begin{aligned}&x\\sin x-\\int\\sin x\\,dx\\\\ &=x\\sin x+\\cos x+k\\end{aligned}$'),
        exampleAnswer: say('$u=x$ eta $dv=\\cos x\\,dx$ hartuta, $v=\\sin x$.', 'Con $u=x$ y $dv=\\cos x\\,dx$, es $v=\\sin x$.', 'مع $u=x$ و$dv=\\cos x\\,dx$ يكون $v=\\sin x$.', 'With $u=x$ and $dv=\\cos x\\,dx$, $v=\\sin x$.'),
        why: {
            text: say(
                'Zergatik dabil? Integratu $(uv)\'=u\'v+uv\'$ berdintzaren bi aldeak: $uv=\\int v\\,du+\\int u\\,dv$ geratzen da. Nahikoa da $\\int v\\,du$ beste aldera eramatea.',
                '¿Por qué funciona? Integra los dos lados de $(uv)\'=u\'v+uv\'$: queda $uv=\\int v\\,du+\\int u\\,dv$. Basta pasar $\\int v\\,du$ al otro lado.',
                'لماذا ينجح؟ كامل طرفي $(uv)\'=u\'v+uv\'$ فيبقى $uv=\\int v\\,du+\\int u\\,dv$. ويكفي نقل $\\int v\\,du$ إلى الطرف الآخر.',
                'Why does it work? Integrate both sides of $(uv)\'=u\'v+uv\'$: you get $uv=\\int v\\,du+\\int u\\,dv$. Then move $\\int v\\,du$ to the other side.'
            )
        }
    },
    'parts-twice': {
        definitions: [
            { term: say('Integral ziklikoa', 'Integral cíclica', 'التكامل الدوري', 'Cyclic integral'), meaning: say('Bi aldiz zatika aplikatu ondoren berriro agertzen den integrala: ezezagun bat bezala askatzen da.', 'Una integral que, tras aplicar partes dos veces, vuelve a aparecer: se despeja como una incógnita.', 'تكامل يعود للظهور بعد تطبيق التجزئة مرتين: نجده كمجهول.', 'An integral that comes back after using parts twice: you solve for it like an unknown.') }
        ],
        vocabulary: [
            say('maila', 'grado', 'الدرجة', 'degree'),
            say('ekuazioa', 'ecuación', 'معادلة', 'equation')
        ],
        explanation: say(
            'Polinomioa 2. mailakoa bada, behin ez da nahikoa: integral berriak $x$ du oraindik, eta zatika berriro aplikatzen da. $e^x$ bider sinu batekin, bat ere ez da sinplifikatzen: bi urratsen ondoren hasierako integrala, $I$, berriro ateratzen da. Orduan beste aldera eramaten da eta askatu egiten da, ekuazio batean bezala.',
            'Si el polinomio es de grado 2, una vez no basta: la integral nueva todavía tiene $x$, y se aplica partes otra vez. Con $e^x$ por un seno, ninguno se simplifica: tras dos pasos vuelve a salir la integral de partida, $I$. Entonces se pasa al otro lado y se despeja, como en una ecuación.',
            'إذا كان كثير الحدود من الدرجة 2 فمرة واحدة لا تكفي: التكامل الجديد ما زال فيه $x$ فنطبّق التجزئة مرة أخرى. ومع $e^x$ في جيب لا يبسط أيّ منهما: بعد خطوتين يعود التكامل الأصلي $I$. عندئذ ننقله إلى الطرف الآخر ونجده كما في معادلة.',
            'If the polynomial has degree 2, once is not enough: the new integral still has $x$, and you use parts again. With $e^x$ times a sine, neither gets simpler: after two steps the starting integral, $I$, comes back. Then you move it to the other side and solve, as in an equation.'
        ),
        examplePrompt: say('Kalkulatu $I=\\int e^x\\cos x\\,dx$.', 'Calcula $I=\\int e^x\\cos x\\,dx$.', 'احسب $I=\\int e^x\\cos x\\,dx$.', 'Work out $I=\\int e^x\\cos x\\,dx$.'),
        example: same('$\\begin{aligned}&I=e^x\\sin x+e^x\\cos x-I\\\\ &I=\\frac{e^x(\\sin x+\\cos x)}{2}+k\\end{aligned}$'),
        exampleAnswer: say('Bi aldietan $u$ trigonometrikoa izan da.', 'Las dos veces, $u$ fue la trigonométrica.', 'في المرتين كانت $u$ هي الدالة المثلثية.', 'Both times, $u$ was the trigonometric one.'),
        why: {
            text: say(
                'Zergatik jaisten da maila? $x^n$ deribatzean $nx^{n-1}$ geratzen da, eta $e^x$ berdin geratzen da integratzean. $n$ urratsen ondoren polinomioa zenbaki bat da, eta azken integrala berehalakoa.',
                '¿Por qué baja el grado? Al derivar $x^n$ queda $nx^{n-1}$, mientras que $e^x$ sigue igual al integrar. Tras $n$ pasos el polinomio es un número y la última integral es inmediata.',
                'لماذا تنزل الدرجة؟ عند اشتقاق $x^n$ يبقى $nx^{n-1}$، بينما تبقى $e^x$ كما هي عند التكامل. وبعد $n$ خطوات يصير كثير الحدود عددًا ويصير آخر تكامل مباشرًا.',
                'Why does the degree go down? Differentiating $x^n$ leaves $nx^{n-1}$, while $e^x$ stays the same when integrated. After $n$ steps the polynomial is a number and the last integral is a basic one.'
            )
        }
    },
    'log-arcs': {
        vocabulary: [
            say('logaritmoa', 'logaritmo', 'اللوغاريتم', 'logarithm'),
            say('arku tangentea', 'arcotangente', 'قوس الظل', 'arctangent')
        ],
        explanation: say(
            'Logaritmoak, arku sinuak eta arku tangenteak ez dute jatorrizkorik taulan, baina haien deribatuak errazak dira. Horregatik $u$ gisa hartzen dira, eta gainerakoa, $dx$ bakarrik izanda ere, $dv$ da. Integral berria berehalakoa edo arrazionala izan ohi da: $\\ln x$ funtzioarekin, $v$ funtzioaren $x$ aldagaia $\\frac{1}{x}$ zatikiarekin sinplifikatzen da.',
            'El logaritmo, el arcoseno y la arcotangente no tienen primitiva en la tabla, pero sus derivadas son sencillas. Por eso se toman como $u$, y el resto, aunque sea solo $dx$, es $dv$. La integral nueva suele ser inmediata o racional: con $\\ln x$, la $x$ de $v$ se simplifica con $\\frac{1}{x}$.',
            'ليس للوغاريتم وقوس الجيب وقوس الظل أصلية في الجدول، لكن مشتقاتها بسيطة. لذلك نأخذها $u$، والباقي $dv$ ولو كان $dx$ وحده. وغالبًا ما يكون التكامل الجديد مباشرًا أو كسريًّا: مع $\\ln x$ تُختصر $x$ التي في $v$ مع $\\frac{1}{x}$.',
            'The logarithm, the arcsine and the arctangent have no antiderivative in the table, but their derivatives are simple. So they are taken as $u$, and the rest, even if it is only $dx$, is $dv$. The new integral is usually basic or rational: with $\\ln x$, the $x$ of $v$ cancels with $\\frac{1}{x}$.'
        ),
        examplePrompt: say('Kalkulatu $\\int\\arctan x\\,dx$.', 'Calcula $\\int\\arctan x\\,dx$.', 'احسب $\\int\\arctan x\\,dx$.', 'Work out $\\int\\arctan x\\,dx$.'),
        example: same('$\\begin{aligned}&x\\arctan x-\\int\\frac{x}{1+x^2}\\,dx\\\\ &=x\\arctan x\\\\ &\\quad-\\frac{1}{2}\\ln(1+x^2)+k\\end{aligned}$'),
        exampleAnswer: say('$u=\\arctan x$ eta $dv=dx$ hartuta; integral berria $\\frac{u\'}{u}$ formakoa da.', 'Con $u=\\arctan x$ y $dv=dx$; la integral nueva es de la forma $\\frac{u\'}{u}$.', 'مع $u=\\arctan x$ و$dv=dx$؛ والتكامل الجديد من الشكل $\\frac{u\'}{u}$.', 'With $u=\\arctan x$ and $dv=dx$; the new integral has the form $\\frac{u\'}{u}$.')
    },

    /* ---------- 3. Rational integrals ---------- */
    division: {
        definitions: [
            { term: say('Funtzio arrazionala', 'Función racional', 'الدالة الكسرية', 'Rational function'), meaning: say('Bi polinomioren zatidura, $\\frac{P(x)}{Q(x)}$.', 'Un cociente de dos polinomios, $\\frac{P(x)}{Q(x)}$.', 'خارج قسمة كثيرَي حدود $\\frac{P(x)}{Q(x)}$.', 'A quotient of two polynomials, $\\frac{P(x)}{Q(x)}$.') }
        ],
        vocabulary: [
            say('zatidura', 'cociente', 'خارج القسمة', 'quotient'),
            say('hondarra', 'resto', 'الباقي', 'remainder')
        ],
        explanation: say(
            'Integral arrazionala polinomioen zatidura baten integrala da. Zenbakitzailearen maila izendatzailearena bezainbestekoa edo handiagoa bada, lehenik zatitu egiten da: polinomio bat geratzen da, berehalakoa dena, gehi zatiki bat, zenbakitzailea maila txikiagokoa duena. Zatiki hori da hurrengo ikasgaietan banatzen dena.',
            'Una integral racional es la de un cociente de polinomios. Si el numerador tiene grado mayor o igual que el denominador, primero se divide: queda un polinomio, que es inmediato, más una fracción con el numerador de grado menor. Esa fracción es la que se descompone en las lecciones siguientes.',
            'التكامل الكسري تكامل خارج قسمة كثيرَي حدود. إذا كانت درجة البسط أكبر من درجة المقام أو تساويها نقسم أولًا: يبقى كثير حدود تكامله مباشر، زائد كسر درجة بسطه أصغر. وهذا الكسر هو الذي نفككه في الدروس التالية.',
            'A rational integral is the integral of a quotient of polynomials. If the numerator has degree greater than or equal to the denominator, divide first: a polynomial is left, which is basic, plus a fraction whose numerator has a lower degree. That fraction is the one split up in the next lessons.'
        ),
        examplePrompt: say('Kalkulatu $\\int\\frac{2x+5}{x+2}\\,dx$.', 'Calcula $\\int\\frac{2x+5}{x+2}\\,dx$.', 'احسب $\\int\\frac{2x+5}{x+2}\\,dx$.', 'Work out $\\int\\frac{2x+5}{x+2}\\,dx$.'),
        example: same('$\\begin{aligned}&\\int\\left(2+\\frac{1}{x+2}\\right)dx\\\\ &=2x+\\ln|x+2|+k\\end{aligned}$'),
        exampleAnswer: say('Zatidura 2 da, eta hondarra 1; $x=0$ emanda egiaztatzen da: $5=2\\cdot 2+1$.', 'El cociente es 2 y el resto, 1; con $x=0$ se comprueba: $5=2\\cdot 2+1$.', 'خارج القسمة 2 والباقي 1؛ ونتحقق بـ $x=0$: $5=2\\cdot 2+1$.', 'The quotient is 2 and the remainder is 1; $x=0$ checks it: $5=2\\cdot 2+1$.')
    },
    'simple-roots': {
        definitions: [
            { term: say('Zatiki sinpleak', 'Fracciones simples', 'الكسور البسيطة', 'Partial fractions'), meaning: say('$\\frac{A}{x-a}$ bezalako zatikiak, goian zenbaki bat eta behean izendatzailearen erro bat dutenak; haietan banatzen da zatiki arrazional bat.', 'Fracciones como $\\frac{A}{x-a}$, con un número arriba y una raíz del denominador abajo, en las que se parte una fracción racional.', 'كسور مثل $\\frac{A}{x-a}$ فيها عدد في الأعلى وجذر للمقام في الأسفل، ونفكك إليها الكسر الكسري.', 'Fractions like $\\frac{A}{x-a}$, with a number on top and a root of the denominator below, into which a rational fraction is split.') }
        ],
        vocabulary: [
            say('erroa', 'raíz', 'الجذر', 'root'),
            say('izendatzailea', 'denominador', 'المقام', 'denominator')
        ],
        explanation: say(
            'Izendatzailea erro erreal desberdinekin faktorizatzen bada, zatikia $\\frac{A}{x-a}$ zatiki baten batura da, erro bakoitzeko bat. $A$ eta $B$ aurkitzeko, izendatzaileak kendu eta $x$ aldagaiari erro bakoitzaren balioa ematen zaio: aldi bakoitzean batugai bat anulatzen da. Zatiki bakoitza logaritmo gisa integratzen da.',
            'Si el denominador se factoriza con raíces reales distintas, la fracción es la suma de una fracción $\\frac{A}{x-a}$ por cada raíz. Para hallar $A$ y $B$ se quitan denominadores y se da a $x$ el valor de cada raíz: cada vez se anula un sumando. Cada fracción se integra como un logaritmo.',
            'إذا تحلّل المقام بجذور حقيقية مختلفة فالكسر مجموع كسر $\\frac{A}{x-a}$ لكل جذر. ولإيجاد $A$ و$B$ نحذف المقامات ونعطي $x$ قيمة كل جذر: في كل مرة ينعدم حدّ. ونكامل كل كسر كلوغاريتم.',
            'If the denominator factorises with different real roots, the fraction is the sum of one fraction $\\frac{A}{x-a}$ for each root. To find $A$ and $B$, clear the denominators and give $x$ the value of each root: each time one term vanishes. Each fraction is integrated as a logarithm.'
        ),
        examplePrompt: say('Kalkulatu $\\int\\frac{6}{x^2-9}\\,dx$.', 'Calcula $\\int\\frac{6}{x^2-9}\\,dx$.', 'احسب $\\int\\frac{6}{x^2-9}\\,dx$.', 'Work out $\\int\\frac{6}{x^2-9}\\,dx$.'),
        example: same('$\\begin{aligned}&\\int\\left(\\frac{1}{x-3}-\\frac{1}{x+3}\\right)dx\\\\ &=\\ln|x-3|-\\ln|x+3|+k\\end{aligned}$'),
        exampleAnswer: say('Erroak 3 eta $-3$ dira; $A=1$ eta $B=-1$.', 'Las raíces son 3 y $-3$; $A=1$ y $B=-1$.', 'الجذران 3 و$-3$؛ $A=1$ و$B=-1$.', 'The roots are 3 and $-3$; $A=1$ and $B=-1$.'),
        why: {
            text: say(
                'Zergatik balio du balioak emateak? Izendatzaileak kentzean, polinomioen berdintza bat geratzen da, edozein $x$ baliorako betetzen dena. $x$ erro bat bada, beste zatikiaren batugaia 0 da, eta ezezagun bakarra geratzen da.',
                '¿Por qué sirve dar valores? Al quitar denominadores queda una igualdad de polinomios que vale para todo $x$. Si $x$ es una raíz, el sumando de la otra fracción vale 0 y queda una sola incógnita.',
                'لماذا يفيد إعطاء القيم؟ بعد حذف المقامات تبقى مساواة بين كثيرَي حدود صحيحة لكل $x$. وإذا كان $x$ جذرًا ينعدم حدّ الكسر الآخر ويبقى مجهول واحد.',
                'Why does giving values work? Clearing the denominators leaves an equality of polynomials that holds for every $x$. If $x$ is a root, the term of the other fraction is 0 and a single unknown is left.'
            )
        }
    },
    'double-roots': {
        definitions: [
            { term: say('Erro bikoitza', 'Raíz doble', 'الجذر المضاعف', 'Double root'), meaning: say('Faktorizatzean bi aldiz agertzen den $a$ erroa: faktorea $(x-a)^2$ da.', 'Una raíz $a$ que aparece dos veces al factorizar: el factor es $(x-a)^2$.', 'جذر $a$ يظهر مرتين عند التحليل: العامل $(x-a)^2$.', 'A root $a$ that appears twice when factorising: the factor is $(x-a)^2$.') }
        ],
        vocabulary: [
            say('berretura', 'potencia', 'القوة', 'power'),
            say('logaritmoa', 'logaritmo', 'اللوغاريتم', 'logarithm')
        ],
        explanation: say(
            'Izendatzailea faktorizatzean $(x-a)^2$ ateratzen bada, $\\frac{A}{x-a}$ zatiki bakarra ez da nahikoa: bi jartzen dira, $(x-a)$ adierazpenaren berretura bakoitzeko bat. Lehenengoak logaritmo bat ematen du, eta bigarrena berretura bat da, $-\\frac{B}{x-a}$ integrala duena. $A$ aurkitzeko, eman $x$ aldagaiari beste edozein balio.',
            'Si al factorizar el denominador sale $(x-a)^2$, una sola fracción $\\frac{A}{x-a}$ no basta: se ponen dos, una con cada potencia de $(x-a)$. La primera da un logaritmo y la segunda es una potencia, cuya integral es $-\\frac{B}{x-a}$. Para hallar $A$, da a $x$ cualquier otro valor.',
            'إذا ظهر $(x-a)^2$ عند تحليل المقام فلا يكفي كسر واحد $\\frac{A}{x-a}$: نضع كسرين، واحدًا لكل قوة من $(x-a)$. الأول يعطي لوغاريتمًا، والثاني قوة تكاملها $-\\frac{B}{x-a}$. ولإيجاد $A$ أعطِ $x$ أي قيمة أخرى.',
            'If factorising the denominator gives $(x-a)^2$, a single fraction $\\frac{A}{x-a}$ is not enough: write two, one for each power of $(x-a)$. The first gives a logarithm and the second is a power, whose integral is $-\\frac{B}{x-a}$. To find $A$, give $x$ any other value.'
        ),
        examplePrompt: say('Kalkulatu $\\int\\frac{x}{(x+2)^2}\\,dx$.', 'Calcula $\\int\\frac{x}{(x+2)^2}\\,dx$.', 'احسب $\\int\\frac{x}{(x+2)^2}\\,dx$.', 'Work out $\\int\\frac{x}{(x+2)^2}\\,dx$.'),
        example: same('$\\begin{aligned}&\\int\\left(\\frac{1}{x+2}-\\frac{2}{(x+2)^2}\\right)dx\\\\ &=\\ln|x+2|+\\frac{2}{x+2}+k\\end{aligned}$'),
        exampleAnswer: say('$x=-2$ emanda, $B=-2$; $x=0$ emanda, $A=1$.', 'Con $x=-2$ sale $B=-2$; con $x=0$, $A=1$.', 'مع $x=-2$ يخرج $B=-2$، ومع $x=0$ يخرج $A=1$.', 'With $x=-2$ you get $B=-2$; with $x=0$, $A=1$.')
    },
    'no-roots': {
        definitions: [
            { term: say('Polinomio laburtezina', 'Polinomio irreducible', 'كثير حدود غير قابل للتحليل', 'Irreducible polynomial'), meaning: say('Erro errealik gabeko 2. mailako polinomioa: haren diskriminatzailea negatiboa da, eta ez da faktorizatzen.', 'Un polinomio de grado 2 sin raíces reales: su discriminante es negativo y no se factoriza.', 'كثير حدود من الدرجة 2 بلا جذور حقيقية: مميّزه سالب ولا يتحلل.', 'A degree 2 polynomial with no real roots: its discriminant is negative and it does not factorise.') }
        ],
        vocabulary: [
            say('karratua', 'cuadrado', 'المربع', 'square'),
            say('arku tangentea', 'arcotangente', 'قوس الظل', 'arctangent')
        ],
        explanation: say(
            'Izendatzailea 2. mailakoa bada eta erro errealik ez badu, ez da banatzen. Zenbakitzailea bitan zatitzen da: izendatzailearen deribatua, logaritmo bat ematen duena, eta zenbaki bat, karratua osatu ondoren arku tangente bat ematen duena. Zenbakitzailea dagoeneko zenbaki bat bada, arku tangentea bakarrik dago.',
            'Si el denominador es de grado 2 y no tiene raíces reales, no se descompone. Se parte el numerador en dos: la derivada del denominador, que da un logaritmo, y un número, que da una arcotangente después de completar el cuadrado. Si el numerador ya es un número, solo hay arcotangente.',
            'إذا كان المقام من الدرجة 2 بلا جذور حقيقية فلا يتفكك. نقسم البسط إلى جزأين: مشتقة المقام وتعطي لوغاريتمًا، وعدد يعطي قوس ظل بعد إكمال المربع. وإذا كان البسط عددًا أصلًا فلا يوجد إلا قوس الظل.',
            'If the denominator has degree 2 and no real roots, it does not split. Split the numerator in two: the derivative of the denominator, which gives a logarithm, and a number, which gives an arctangent after completing the square. If the numerator is already a number, there is only an arctangent.'
        ),
        examplePrompt: say('Kalkulatu $\\int\\frac{dx}{x^2-6x+10}$.', 'Calcula $\\int\\frac{dx}{x^2-6x+10}$.', 'احسب $\\int\\frac{dx}{x^2-6x+10}$.', 'Work out $\\int\\frac{dx}{x^2-6x+10}$.'),
        example: same('$\\begin{aligned}&\\int\\frac{dx}{(x-3)^2+1}\\\\ &=\\arctan(x-3)+k\\end{aligned}$'),
        exampleAnswer: say('Zenbakitzailea zenbaki bat da: arku tangentea bakarrik.', 'El numerador es un número: solo arcotangente.', 'البسط عدد: قوس ظل فقط.', 'The numerator is a number: only an arctangent.')
    },

    /* ---------- 4. Substitution ---------- */
    change: {
        definitions: [
            { term: say('Aldagai-aldaketa', 'Cambio de variable', 'تغيير المتغير', 'Substitution'), meaning: say('Integratzen denaren $g(x)$ zati bat letra berri batez ordezkatzea, $t=g(x)$, $dt=g\'(x)\\,dx$ dela.', 'Sustituir una parte $g(x)$ del integrando por una letra nueva, $t=g(x)$, con $dt=g\'(x)\\,dx$.', 'تعويض جزء $g(x)$ مما نكامله بحرف جديد $t=g(x)$ مع $dt=g\'(x)\\,dx$.', 'Replacing a part $g(x)$ of what you integrate with a new letter, $t=g(x)$, with $dt=g\'(x)\\,dx$.') }
        ],
        vocabulary: [
            say('letra', 'letra', 'حرف', 'letter'),
            say('deribatua', 'derivada', 'المشتقة', 'derivative')
        ],
        explanation: say(
            'Integralean $g(x)$ funtzio bat eta haren deribatua agertzen badira, $t=g(x)$ deitzen zaio. Orduan $dt=g\'(x)\\,dx$, eta integral osoa $t$ letraz idazten da: ezin da $x$ bat ere geratu. $t$ letraz integratzen da, eta amaieran aldaketa desegiten da, berriro $g(x)$ jarrita $t$ letraren ordez.',
            'Si en la integral aparece una función $g(x)$ y también su derivada, se llama $t=g(x)$. Entonces $dt=g\'(x)\\,dx$ y la integral se escribe entera en $t$: no puede quedar ninguna $x$. Se integra en $t$ y al final se deshace el cambio, poniendo otra vez $g(x)$ en lugar de $t$.',
            'إذا ظهرت في التكامل دالة $g(x)$ ومشتقتها أيضًا نسمّي $t=g(x)$. عندئذ $dt=g\'(x)\\,dx$ ونكتب التكامل كله بـ $t$: لا يبقى أي $x$. نكامل بـ $t$ وفي النهاية نتراجع عن التعويض بوضع $g(x)$ مكان $t$ من جديد.',
            'If a function $g(x)$ and its derivative both appear in the integral, call $t=g(x)$. Then $dt=g\'(x)\\,dx$ and the whole integral is written in $t$: no $x$ can be left. Integrate in $t$ and at the end undo the change, putting $g(x)$ back in place of $t$.'
        ),
        examplePrompt: say('Kalkulatu $\\int\\frac{e^x}{(e^x+1)^2}\\,dx$.', 'Calcula $\\int\\frac{e^x}{(e^x+1)^2}\\,dx$.', 'احسب $\\int\\frac{e^x}{(e^x+1)^2}\\,dx$.', 'Work out $\\int\\frac{e^x}{(e^x+1)^2}\\,dx$.'),
        example: same('$\\begin{aligned}&t=e^x+1\\qquad\\int\\frac{dt}{t^2}=-\\frac{1}{t}\\\\ &=-\\frac{1}{e^x+1}+k\\end{aligned}$'),
        exampleAnswer: say('$dt=e^x\\,dx$ da, hain zuzen zenbakitzailea.', 'Es $dt=e^x\\,dx$, justo el numerador.', 'إن $dt=e^x\\,dx$ هو البسط بالضبط.', 'It is $dt=e^x\\,dx$, exactly the numerator.'),
        why: {
            text: say(
                'Zergatik dabil? Katearen erregela da alderantziz: $F\'=f$ bada, $F(g(x))$ funtzioaren deribatua $f(g(x))\\cdot g\'(x)$ da. $t=g(x)$ aldaketak biderkadura hori ikusarazi besterik ez du egiten.',
                '¿Por qué funciona? Es la regla de la cadena al revés: si $F\'=f$, la derivada de $F(g(x))$ es $f(g(x))\\cdot g\'(x)$. El cambio $t=g(x)$ solo hace visible ese producto.',
                'لماذا ينجح؟ إنه قاعدة السلسلة بالعكس: إذا كان $F\'=f$ فمشتقة $F(g(x))$ هي $f(g(x))\\cdot g\'(x)$. والتعويض $t=g(x)$ يُظهر هذا الجداء فقط.',
                'Why does it work? It is the chain rule backwards: if $F\'=f$, the derivative of $F(g(x))$ is $f(g(x))\\cdot g\'(x)$. The change $t=g(x)$ only makes that product visible.'
            )
        }
    },
    'roots-exp': {
        definitions: [
            { term: say('Integral irrazionala', 'Integral irracional', 'التكامل غير الكسري', 'Irrational integral'), meaning: say('$x$ aldagaiaren erroak dituen integrala; aldagai-aldaketa batek arrazional bihurtzen du.', 'Una integral con raíces de $x$, que un cambio de variable vuelve racional.', 'تكامل فيه جذور لـ $x$، يحوّله تغيير المتغير إلى تكامل كسري.', 'An integral with roots of $x$, which a substitution turns into a rational one.') }
        ],
        vocabulary: [
            say('erroa', 'raíz', 'الجذر', 'root'),
            say('esponentziala', 'exponencial', 'الأسية', 'exponential')
        ],
        explanation: say(
            'Integral batzuk ez dira konposatuak, baina aldaketa batek arrazional bihurtzen ditu. $\\sqrt{x+a}$ badago, $t^2=x+a$ hartzen da: erroa desagertu egiten da, eta $dx=2t\\,dt$. Baturetan $e^x$ badago, $t=e^x$ eta $dx=\\frac{dt}{t}$. Gero arrazionala integratzen da, eta aldaketa desegiten da.',
            'Algunas integrales no son compuestas, pero un cambio las vuelve racionales. Con $\\sqrt{x+a}$ se toma $t^2=x+a$: la raíz desaparece y $dx=2t\\,dt$. Con sumas de $e^x$ se toma $t=e^x$ y $dx=\\frac{dt}{t}$. Después se integra la racional y se deshace el cambio.',
            'بعض التكاملات ليست مركّبة، لكن تعويضًا يجعلها كسرية. مع $\\sqrt{x+a}$ نأخذ $t^2=x+a$: يختفي الجذر و$dx=2t\\,dt$. ومع مجاميع فيها $e^x$ نأخذ $t=e^x$ و$dx=\\frac{dt}{t}$. ثم نكامل الكسري ونتراجع عن التعويض.',
            'Some integrals are not composite, but a change makes them rational. With $\\sqrt{x+a}$ take $t^2=x+a$: the root disappears and $dx=2t\\,dt$. With sums of $e^x$ take $t=e^x$ and $dx=\\frac{dt}{t}$. Then integrate the rational one and undo the change.'
        ),
        examplePrompt: say('Kalkulatu $\\int\\frac{dx}{e^x+1}$.', 'Calcula $\\int\\frac{dx}{e^x+1}$.', 'احسب $\\int\\frac{dx}{e^x+1}$.', 'Work out $\\int\\frac{dx}{e^x+1}$.'),
        example: same('$\\begin{aligned}&\\int\\frac{dt}{t(t+1)}\\\\ &=\\ln t-\\ln(t+1)\\\\ &=x-\\ln(e^x+1)+k\\end{aligned}$'),
        exampleAnswer: say('$t=e^x$ hartuta; $\\frac{1}{t(t+1)}$ zatikia zatiki sinpleetan banatzen da.', 'Con $t=e^x$; $\\frac{1}{t(t+1)}$ se parte en fracciones simples.', 'مع $t=e^x$؛ ونفكك $\\frac{1}{t(t+1)}$ إلى كسور بسيطة.', 'With $t=e^x$; $\\frac{1}{t(t+1)}$ is split into partial fractions.')
    },
    'trig-powers': {
        definitions: [
            { term: say('Angelu bikoitza', 'Ángulo doble', 'ضعف الزاوية', 'Double angle'), meaning: say('$\\cos 2x=\\cos^2 x-\\sin^2 x$ formula; hartatik ateratzen dira $\\sin^2 x$ eta $\\cos^2 x$, karraturik gabe.', 'La fórmula $\\cos 2x=\\cos^2 x-\\sin^2 x$; de ella salen $\\sin^2 x$ y $\\cos^2 x$ sin cuadrados.', 'الصيغة $\\cos 2x=\\cos^2 x-\\sin^2 x$؛ ومنها نحصل على $\\sin^2 x$ و$\\cos^2 x$ بلا تربيع.', 'The formula $\\cos 2x=\\cos^2 x-\\sin^2 x$; from it come $\\sin^2 x$ and $\\cos^2 x$ without squares.') }
        ],
        vocabulary: [
            say('bakoitia', 'impar', 'فردي', 'odd'),
            say('bikoitia', 'par', 'زوجي', 'even')
        ],
        explanation: say(
            'Sinuaren berretura bat ez da $x^n$ bezala integratzen, deribatua falta delako. Berretzailea bakoitia bada, faktore bat bereizten da eta gainerakoa bestearekin idazten da: aldaketa batek polinomio bihurtzen du. Bikoitia bada, berretzailea angelu bikoitzaren formulekin jaisten da.',
            'Una potencia de seno no se integra como $x^n$, porque falta la derivada. Si el exponente es impar, se separa un factor y el resto se escribe con el otro: un cambio la vuelve un polinomio. Si es par, se baja el exponente con las fórmulas del ángulo doble.',
            'قوة الجيب لا تُكامل مثل $x^n$ لأن المشتقة ناقصة. إذا كان الأس فرديًّا نفصل عاملًا ونكتب الباقي بالآخر: فيجعلها تعويض كثير حدود. وإذا كان زوجيًّا ننزل الأس بصيغ ضعف الزاوية.',
            'A power of sine is not integrated like $x^n$, because the derivative is missing. If the exponent is odd, take one factor apart and write the rest with the other function: a change turns it into a polynomial. If it is even, bring the exponent down with the double-angle formulas.'
        ),
        cases: [
            { title: say('Berretzaile bakoitia', 'Exponente impar', 'أس فردي', 'Odd exponent'), text: say('Bereizi faktore bat, eta idatzi gainerakoa bestearekin, $\\sin^2 x+\\cos^2 x=1$ erabiliz. Gero, $t=\\cos x$ edo $t=\\sin x$.', 'Separa un factor y escribe el resto con el otro, usando $\\sin^2 x+\\cos^2 x=1$. Después, $t=\\cos x$ o $t=\\sin x$.', 'افصل عاملًا واكتب الباقي بالآخر مستعملًا $\\sin^2 x+\\cos^2 x=1$. ثم $t=\\cos x$ أو $t=\\sin x$.', 'Take one factor apart and write the rest with the other, using $\\sin^2 x+\\cos^2 x=1$. Then $t=\\cos x$ or $t=\\sin x$.') },
            { title: say('Berretzaile bikoitia', 'Exponente par', 'أس زوجي', 'Even exponent'), text: say('Jaitsi maila $\\sin^2 x=\\frac{1-\\cos 2x}{2}$ edo $\\cos^2 x=\\frac{1+\\cos 2x}{2}$ erabiliz.', 'Baja el grado con $\\sin^2 x=\\frac{1-\\cos 2x}{2}$ o $\\cos^2 x=\\frac{1+\\cos 2x}{2}$.', 'أنزل الدرجة بـ $\\sin^2 x=\\frac{1-\\cos 2x}{2}$ أو $\\cos^2 x=\\frac{1+\\cos 2x}{2}$.', 'Bring the degree down with $\\sin^2 x=\\frac{1-\\cos 2x}{2}$ or $\\cos^2 x=\\frac{1+\\cos 2x}{2}$.') },
            { title: say('Karratuen kenketaren erroa', 'Raíz de una resta de cuadrados', 'جذر فرق مربعين', 'Root of a difference of squares'), text: say('$\\sqrt{a^2-x^2}$ badago, $x=a\\sin t$ aldaketak kentzen du, $a^2-a^2\\sin^2 t=a^2\\cos^2 t$ delako.', 'Con $\\sqrt{a^2-x^2}$, el cambio $x=a\\sin t$ la quita, porque $a^2-a^2\\sin^2 t=a^2\\cos^2 t$.', 'مع $\\sqrt{a^2-x^2}$ يزيله التعويض $x=a\\sin t$ لأن $a^2-a^2\\sin^2 t=a^2\\cos^2 t$.', 'With $\\sqrt{a^2-x^2}$, the change $x=a\\sin t$ removes it, because $a^2-a^2\\sin^2 t=a^2\\cos^2 t$.') }
        ],
        examplePrompt: say('Kalkulatu $\\int\\cos^2 x\\,dx$.', 'Calcula $\\int\\cos^2 x\\,dx$.', 'احسب $\\int\\cos^2 x\\,dx$.', 'Work out $\\int\\cos^2 x\\,dx$.'),
        example: same('$\\begin{aligned}&\\int\\frac{1+\\cos 2x}{2}\\,dx\\\\ &=\\frac{x}{2}+\\frac{\\sin 2x}{4}+k\\end{aligned}$'),
        exampleAnswer: say('Berretzaile bikoitia: angelu bikoitza.', 'Exponente par: ángulo doble.', 'أس زوجي: ضعف الزاوية.', 'Even exponent: the double angle.')
    },

    /* ---------- 5. Method and conditions ---------- */
    choose: {
        definitions: [
            { term: say('Integrakizuna', 'Integrando', 'المُكامَل', 'Integrand'), meaning: say('Integratzen den funtzioa: $\\int f(x)\\,dx$ integralean, $f(x)$ da.', 'La función que se integra: en $\\int f(x)\\,dx$, es $f(x)$.', 'الدالة التي نكاملها: في $\\int f(x)\\,dx$ هي $f(x)$.', 'The function being integrated: in $\\int f(x)\\,dx$, it is $f(x)$.') }
        ],
        vocabulary: [
            say('metodoa', 'método', 'الطريقة', 'method'),
            say('polinomioa', 'polinomio', 'كثير الحدود', 'polynomial')
        ],
        explanation: say(
            'Kalkulatu aurretik, begiratu integrakizunaren formari. Taulan badago, edo kanpoan barrukoaren deribatua badago, berehalakoa edo konposatua da. Polinomio bat bider esponentzial bat, sinu bat edo logaritmo bat bada, zatika doa. Polinomioen zatidura bat bada, arrazionala da. Ezer egokitzen ez bada, saiatu aldaketa batekin.',
            'Antes de calcular, mira la forma del integrando. Si está en la tabla, o fuera está la derivada de lo de dentro, es inmediata o compuesta. Si es un polinomio por una exponencial, un seno o un logaritmo, va por partes. Si es un cociente de polinomios, es racional. Si nada encaja, prueba un cambio.',
            'قبل الحساب انظر إلى شكل المُكامَل. إذا كان في الجدول، أو كانت مشتقة الداخل في الخارج، فهو مباشر أو مركّب. وإذا كان كثير حدود في دالة أسية أو جيب أو لوغاريتم فبالتجزئة. وإذا كان خارج قسمة كثيرَي حدود فهو كسري. وإن لم يناسب شيء فجرّب تعويضًا.',
            'Before working anything out, look at the shape of the integrand. If it is in the table, or the derivative of the inside is outside, it is basic or composite. If it is a polynomial times an exponential, a sine or a logarithm, it goes by parts. If it is a quotient of polynomials, it is rational. If nothing fits, try a change.'
        ),
        examplePrompt: say('Zein metodo balio du $\\int x\\ln x\\,dx$ integralerako?', '¿Qué método sirve para $\\int x\\ln x\\,dx$?', 'أيّ طريقة تصلح لـ $\\int x\\ln x\\,dx$؟', 'Which method works for $\\int x\\ln x\\,dx$?'),
        example: same('$\\frac{x^2}{2}\\ln x-\\frac{x^2}{4}+k$'),
        exampleAnswer: say('Zatika, $u=\\ln x$ eta $dv=x\\,dx$ hartuta: logaritmoa $u$ da.', 'Por partes, con $u=\\ln x$ y $dv=x\\,dx$: el logaritmo va como $u$.', 'بالتجزئة مع $u=\\ln x$ و$dv=x\\,dx$: اللوغاريتم هو $u$.', 'By parts, with $u=\\ln x$ and $dv=x\\,dx$: the logarithm is $u$.')
    },
    conditions: {
        definitions: [
            { term: say('Hasierako baldintza', 'Condición inicial', 'الشرط الابتدائي', 'Initial condition'), meaning: say('Datu bat, $f(1)=5$ edo $f\'(1)=3$ bezalakoa, integrazio-konstante bat finkatzen duena.', 'Un dato, como $f(1)=5$ o $f\'(1)=3$, que fija una constante de integración.', 'معلومة مثل $f(1)=5$ أو $f\'(1)=3$ تحدد ثابت تكامل.', 'A fact, such as $f(1)=5$ or $f\'(1)=3$, that fixes a constant of integration.') }
        ],
        vocabulary: [
            say('malda', 'pendiente', 'الميل', 'slope'),
            say('puntua', 'punto', 'النقطة', 'point')
        ],
        explanation: say(
            'Integral mugagabe batek funtzio familia bat ematen du. Bakarra hautatzeko, konstante adina datu behar dira: bat $f\'$ ematen badute, eta bi $f\'\'$ ematen badute. Malda bat $f\'$ funtzioan erabiltzen da, eta puntu bat $f$ funtzioan. Zuzen ukitzaileak bi datuak batera ematen ditu.',
            'Una integral indefinida da una familia de funciones. Para quedarse con una hacen falta tantos datos como constantes: uno si se da $f\'$ y dos si se da $f\'\'$. Una pendiente se usa en $f\'$ y un punto en $f$. La recta tangente da los dos datos a la vez.',
            'التكامل غير المحدد يعطي عائلة من الدوال. ولاختيار واحدة تلزم معلومات بعدد الثوابت: واحدة إذا أُعطيت $f\'$ واثنتان إذا أُعطيت $f\'\'$. يُستعمل الميل في $f\'$ والنقطة في $f$. والمستقيم المماس يعطي المعلومتين معًا.',
            'An indefinite integral gives a family of functions. To keep only one, you need as many facts as constants: one if you are given $f\'$ and two if you are given $f\'\'$. A slope is used in $f\'$ and a point in $f$. The tangent line gives both facts at once.'
        ),
        examplePrompt: say('Aurkitu $f$, $f\'(x)=xe^x$ eta $f(0)=4$ badira.', 'Halla $f$ si $f\'(x)=xe^x$ y $f(0)=4$.', 'أوجد $f$ إذا كان $f\'(x)=xe^x$ و$f(0)=4$.', 'Find $f$ if $f\'(x)=xe^x$ and $f(0)=4$.'),
        example: same('$\\begin{aligned}&f(x)=e^x(x-1)+k\\\\ &f(0)=-1+k=4\\\\ &k=5\\end{aligned}$'),
        exampleAnswer: say('Hau da, $f(x)=e^x(x-1)+5$.', 'Es decir, $f(x)=e^x(x-1)+5$.', 'أي $f(x)=e^x(x-1)+5$.', 'That is, $f(x)=e^x(x-1)+5$.')
    }
}
