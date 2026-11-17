import type { LessonTexts } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from '../batx1-zientziak-funtzioak/text.ts'
import type { Bach2gIntegralsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Integralak · Batxilergoa 2 · Gizarte Zientziak — what each lesson tells:
   the new words, a short explanation, the example as an exercise with
   numbers of its own, the key words and, in three lessons, «Why does it
   work?». Plain data so the tests can import it.
   ========================================================================== */

export const bach2gIntegralsLessonTexts: Record<Bach2gIntegralsTopicId, LessonTexts> = {
    /* ---------- 1. Antiderivatives ---------- */
    primitive: {
        definitions: [
            { term: say('Jatorrizkoa', 'Primitiva', 'الدالة الأصلية', 'Antiderivative'), meaning: say('$F$ funtzioa, $F\'=f$ betetzen duena.', 'Una función $F$ con $F\'=f$.', 'دالة $F$ تحقق $F\'=f$.', 'A function $F$ with $F\'=f$.') },
            { term: say('Integral mugagabea', 'Integral indefinida', 'التكامل غير المحدد', 'Indefinite integral'), meaning: say('Jatorrizko guztien multzoa: $F(x)+C$.', 'El conjunto de todas las primitivas: $F(x)+C$.', 'مجموعة كل الدوال الأصلية: $F(x)+C$.', 'The set of all antiderivatives: $F(x)+C$.') }
        ],
        vocabulary: [
            say('konstantea', 'constante', 'الثابت', 'constant'),
            say('desegin', 'deshacer', 'يلغي', 'undo')
        ],
        explanation: say(
            'Integratzeak deribatzea desegiten du: $f$ ematen badigute, deribatuta $f$ ematen duen funtzio bat bilatzen dugu. Konstante batek deribatzean zero ematen duenez, jatorrizko asko daude, eta denak $+C$ batean biltzen dira.',
            'Integrar sirve para deshacer la derivada: si nos dan $f$, buscamos una función que al derivar dé $f$. Como una constante al derivar da cero, hay muchas primitivas, y todas se recogen en un $+C$.',
            'التكامل يلغي الاشتقاق: إذا أُعطينا $f$ نبحث عن دالة مشتقتها $f$. وبما أن مشتقة الثابت صفر فهناك دوال أصلية كثيرة، وكلها تُجمع في $+C$.',
            'Integrating is how you undo the derivative: if we are given $f$, we look for a function whose derivative is $f$. As a constant differentiates to zero, there are many antiderivatives, and all of them are gathered in a $+C$.'
        ),
        examplePrompt: say('$G(x)=e^{x}+x^2$ funtzioa $g(x)=e^{x}+2x$ funtzioaren jatorrizkoa al da?', '¿Es $G(x)=e^{x}+x^2$ una primitiva de $g(x)=e^{x}+2x$?', 'هل $G(x)=e^{x}+x^2$ دالة أصلية لـ $g(x)=e^{x}+2x$؟', 'Is $G(x)=e^{x}+x^2$ an antiderivative of $g(x)=e^{x}+2x$?'),
        example: same("$G'(x)=e^{x}+2x=g(x)$"),
        exampleAnswer: say('Bai; jatorrizko guztiak $e^{x}+x^2+C$ dira.', 'Sí; todas son $e^{x}+x^2+C$.', 'نعم؛ وكلها $e^{x}+x^2+C$.', 'Yes; all of them are $e^{x}+x^2+C$.'),
        why: {
            text: say(
                'Zergatik $+C$? Bi jatorrizkoren kenketak zero deribatua du, beraz konstante bat da: $F_1-F_2=C$. Horregatik, jatorrizko bat ezagututa, beste guztiak $F+C$ dira.',
                '¿Por qué $+C$? La resta de dos primitivas tiene derivada cero, así que es una constante: $F_1-F_2=C$. Por eso, conocida una primitiva, todas las demás son $F+C$.',
                'لماذا $+C$؟ الفرق بين دالتين أصليتين مشتقته صفر، فهو ثابت: $F_1-F_2=C$. لذلك إذا عُرفت دالة أصلية فكل البقية $F+C$.',
                'Why $+C$? The difference of two antiderivatives has derivative zero, so it is a constant: $F_1-F_2=C$. That is why, once one antiderivative is known, all the others are $F+C$.'
            )
        }
    },
    powers: {
        definitions: [
            { term: say('Berreturaren erregela', 'Regla de la potencia', 'قاعدة القوة', 'Power rule'), meaning: say('$\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+C$, $n\\ne -1$ denean.', '$\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+C$ si $n\\ne -1$.', '$\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+C$ إذا $n\\ne -1$.', '$\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+C$ if $n\\ne -1$.') }
        ],
        vocabulary: [
            say('berretzailea', 'exponente', 'الأس', 'exponent'),
            say('erroak', 'raíces', 'الجذور', 'roots')
        ],
        explanation: say(
            'Deribatzean berretzailea bat jaisten da; integratzean, bat igo eta berretzaile berriaz zatitzen da. Erroak berretura gisa idazten dira: $\\sqrt{x}=x^{1/2}$. Gai bakoitza bere aldetik integratzen da, eta azkenean $C$ bakarra jartzen da.',
            'Al derivar, el exponente baja uno; al integrar, sube uno y se divide entre el nuevo exponente. Las raíces se escriben como potencias: $\\sqrt{x}=x^{1/2}$. Cada término se integra por su lado y al final se pone una sola $C$.',
            'عند الاشتقاق ينقص الأس واحدًا، وعند التكامل يزيد واحدًا ونقسم على الأس الجديد. والجذور تُكتب قوى: $\\sqrt{x}=x^{1/2}$. ويُكامل كل حد على حدة، ثم نضع $C$ واحدًا في النهاية.',
            'When differentiating, the exponent goes down one; when integrating, it goes up one and you divide by the new exponent. Roots are written as powers: $\\sqrt{x}=x^{1/2}$. Each term is integrated on its own and a single $C$ goes at the end.'
        ),
        examplePrompt: say('Kalkulatu $\\int 3\\sqrt{x}\\,dx$.', 'Calcula $\\int 3\\sqrt{x}\\,dx$.', 'احسب $\\int 3\\sqrt{x}\\,dx$.', 'Work out $\\int 3\\sqrt{x}\\,dx$.'),
        example: same('$3\\cdot\\frac{x^{3/2}}{3/2}=2x^{3/2}$'),
        exampleAnswer: say('$2x\\sqrt{x}+C$.', '$2x\\sqrt{x}+C$.', '$2x\\sqrt{x}+C$.', '$2x\\sqrt{x}+C$.')
    },
    'exp-log': {
        definitions: [
            { term: say('Logaritmo nepertarra', 'Logaritmo neperiano', 'اللوغاريتم الطبيعي', 'Natural logarithm'), meaning: say('$\\ln x$: haren deribatua $\\frac{1}{x}$ da.', '$\\ln x$: su derivada es $\\frac{1}{x}$.', '$\\ln x$: مشتقته $\\frac{1}{x}$.', '$\\ln x$: its derivative is $\\frac{1}{x}$.') }
        ],
        vocabulary: [
            say('balio absolutua', 'valor absoluto', 'القيمة المطلقة', 'absolute value'),
            say('salbuespena', 'excepción', 'الاستثناء', 'exception')
        ],
        explanation: say(
            '$e^{x}$ bakarra da: bere deribatua eta bere jatorrizkoa bera dira. $\\frac{1}{x}=x^{-1}$ salbuespena da: berreturaren erregelak zero zati zero emango luke, eta jatorrizkoa logaritmoa da. Balio absolutuari esker, $x<0$ denean ere balio du.',
            '$e^{x}$ es única: su derivada y su primitiva son ella misma. $\\frac{1}{x}=x^{-1}$ es la excepción: la regla de la potencia daría dividir entre cero, y la primitiva es el logaritmo. Gracias al valor absoluto sirve también con $x<0$.',
            '$e^{x}$ فريدة: مشتقتها ودالتها الأصلية هي نفسها. و$\\frac{1}{x}=x^{-1}$ هي الاستثناء: قاعدة القوة تعطي قسمة على صفر، والدالة الأصلية هي اللوغاريتم. وبفضل القيمة المطلقة تصلح أيضًا مع $x<0$.',
            '$e^{x}$ is unique: its derivative and its antiderivative are itself. $\\frac{1}{x}=x^{-1}$ is the exception: the power rule would divide by zero, and the antiderivative is the logarithm. Thanks to the absolute value it also works for $x<0$.'
        ),
        examplePrompt: say('Kalkulatu $\\int\\left(5e^{x}-\\frac{2}{x}\\right)dx$.', 'Calcula $\\int\\left(5e^{x}-\\frac{2}{x}\\right)dx$.', 'احسب $\\int\\left(5e^{x}-\\frac{2}{x}\\right)dx$.', 'Work out $\\int\\left(5e^{x}-\\frac{2}{x}\\right)dx$.'),
        example: same('$5e^{x}-2\\ln|x|$'),
        exampleAnswer: say('$5e^{x}-2\\ln|x|+C$.', '$5e^{x}-2\\ln|x|+C$.', '$5e^{x}-2\\ln|x|+C$.', '$5e^{x}-2\\ln|x|+C$.')
    },

    /* ---------- 2. Compound immediate integrals ---------- */
    'power-chain': {
        definitions: [
            { term: say('Berehalako integral konposatua', 'Integral inmediata compuesta', 'تكامل فوري مركب', 'Compound immediate integral'), meaning: say('Barruko funtzio bat eta haren deribatua biderkatuta dituen integrala.', 'Una integral que lleva una función de dentro multiplicada por su derivada.', 'تكامل فيه دالة داخلية مضروبة في مشتقتها.', 'An integral with an inside function multiplied by its derivative.') }
        ],
        vocabulary: [
            say('barrukoa', 'de dentro', 'الداخل', 'inside'),
            say('doitu', 'ajustar', 'نعدّل', 'adjust')
        ],
        explanation: say(
            'Katearen erregela atzekoz aurrera erabiltzen da. Barrukoaren deribatua kanpoan badago, barrukoa letra bakar bat balitz bezala integratzen da. Zenbaki bat falta bada, doitu: biderkatu eta zatitu zenbaki horrekin.',
            'Es la regla de la cadena al revés. Si la derivada de dentro está fuera, lo de dentro se integra como si fuera una sola letra. Si falta un número, hay que ajustar: multiplica y divide por ese número.',
            'إنها قاعدة السلسلة معكوسة. إذا كانت مشتقة الداخل في الخارج نكامل الداخل كأنه حرف واحد. وإذا نقص عدد فإننا نعدّل: نضرب ونقسم على ذلك العدد.',
            'It is the chain rule backwards. If the derivative of the inside is outside, the inside is integrated as if it were a single letter. If a number is missing, adjust: multiply and divide by that number.'
        ),
        examplePrompt: say('Kalkulatu $\\int x(x^2-3)^5\\,dx$.', 'Calcula $\\int x(x^2-3)^5\\,dx$.', 'احسب $\\int x(x^2-3)^5\\,dx$.', 'Work out $\\int x(x^2-3)^5\\,dx$.'),
        example: same('$\\frac{1}{2}\\int 2x(x^2-3)^5\\,dx=\\frac{(x^2-3)^6}{12}$'),
        exampleAnswer: say('$\\frac{(x^2-3)^6}{12}+C$.', '$\\frac{(x^2-3)^6}{12}+C$.', '$\\frac{(x^2-3)^6}{12}+C$.', '$\\frac{(x^2-3)^6}{12}+C$.')
    },
    'log-exp-chain': {
        definitions: [
            { term: say('Deribatua zati funtzioa', 'Derivada entre función', 'المشتقة على الدالة', 'Derivative over function'), meaning: say('$\\frac{f\'}{f}$ itxura: haren jatorrizkoa $\\ln|f|$ da.', 'La forma $\\frac{f\'}{f}$: su primitiva es $\\ln|f|$.', 'الشكل $\\frac{f\'}{f}$: دالته الأصلية $\\ln|f|$.', 'The form $\\frac{f\'}{f}$: its antiderivative is $\\ln|f|$.') }
        ],
        vocabulary: [
            say('zenbakitzailea', 'numerador', 'البسط', 'numerator'),
            say('berretzailea', 'exponente', 'الأس', 'exponent')
        ],
        explanation: say(
            'Zatiki batean, zenbakitzailea izendatzailearen deribatua bada (edo zenbaki batean bereizten bada), jatorrizkoa logaritmoa da. Esponentzial batean, berretzailearen deribatua aurrean badago, jatorrizkoa esponentziala bera da.',
            'En una fracción, si el numerador es la derivada del denominador (o se diferencia en un número), la primitiva es un logaritmo. En una exponencial, si delante está la derivada del exponente, la primitiva es la propia exponencial.',
            'في الكسر، إذا كان البسط مشتقة المقام (أو يختلف عنها بعدد) فالدالة الأصلية لوغاريتم. وفي الأسية، إذا كانت مشتقة الأس في الأمام فالدالة الأصلية هي الأسية نفسها.',
            'In a fraction, if the numerator is the derivative of the denominator (or differs from it by a number), the antiderivative is a logarithm. In an exponential, if the derivative of the exponent is in front, the antiderivative is the exponential itself.'
        ),
        examplePrompt: say('Kalkulatu $\\int\\frac{x}{x^2+4}\\,dx$.', 'Calcula $\\int\\frac{x}{x^2+4}\\,dx$.', 'احسب $\\int\\frac{x}{x^2+4}\\,dx$.', 'Work out $\\int\\frac{x}{x^2+4}\\,dx$.'),
        example: same('$\\frac{1}{2}\\int\\frac{2x}{x^2+4}\\,dx=\\frac{1}{2}\\ln(x^2+4)$'),
        exampleAnswer: say('$\\frac{1}{2}\\ln(x^2+4)+C$.', '$\\frac{1}{2}\\ln(x^2+4)+C$.', '$\\frac{1}{2}\\ln(x^2+4)+C$.', '$\\frac{1}{2}\\ln(x^2+4)+C$.')
    },
    condition: {
        definitions: [
            { term: say('Hasierako baldintza', 'Condición inicial', 'الشرط الابتدائي', 'Initial condition'), meaning: say('Funtzioaren balio ezagun bat, $F(a)=b$, $C$ zehazten duena.', 'Un valor conocido de la función, $F(a)=b$, que fija la $C$.', 'قيمة معلومة للدالة $F(a)=b$ تحدد $C$.', 'A known value of the function, $F(a)=b$, which fixes $C$.') }
        ],
        vocabulary: [
            say('familia', 'familia', 'العائلة', 'family'),
            say('ordezkatu', 'sustituir', 'عوّض', 'substitute')
        ],
        explanation: say(
            'Jatorrizko-familia batean kurba guztiak paraleloak dira: $C$ aldatzean gora edo behera mugitzen dira. Puntu bat ematen badigute, haren koordenatuak ordezkatu eta $C$ ebazten da: familia osotik kurba bakarra geratzen da.',
            'En una familia de primitivas todas las curvas son paralelas: al cambiar $C$ suben o bajan. Si nos dan un punto, se pueden sustituir sus coordenadas y se despeja $C$: de toda la familia queda una sola curva.',
            'في عائلة الدوال الأصلية كل المنحنيات متوازية: تصعد أو تنزل عند تغيير $C$. وإذا أُعطينا نقطة نعوّض إحداثياتها ونستخرج $C$: فلا يبقى من العائلة إلا منحنى واحد.',
            'In a family of antiderivatives all the curves are parallel: changing $C$ moves them up or down. If we are given a point, substitute its coordinates and solve for $C$: only one curve of the whole family remains.'
        ),
        examplePrompt: say('$G\'(x)=6x^2$ eta $G(0)=-4$. Aurkitu $G$.', '$G\'(x)=6x^2$ y $G(0)=-4$. Halla $G$.', '$G\'(x)=6x^2$ و$G(0)=-4$. أوجد $G$.', '$G\'(x)=6x^2$ and $G(0)=-4$. Find $G$.'),
        example: same('$G(x)=2x^3+C\\qquad C=-4$'),
        exampleAnswer: say('$G(x)=2x^3-4$.', '$G(x)=2x^3-4$.', '$G(x)=2x^3-4$.', '$G(x)=2x^3-4$.')
    },

    /* ---------- 3. The definite integral ---------- */
    rectangles: {
        definitions: [
            { term: say('Integral mugatua', 'Integral definida', 'التكامل المحدد', 'Definite integral'), meaning: say('$\\int_a^b f(x)\\,dx$: laukizuzen gero eta estuagoen baturaren limitea.', '$\\int_a^b f(x)\\,dx$: el límite de la suma de rectángulos cada vez más estrechos.', '$\\int_a^b f(x)\\,dx$: نهاية مجموع مستطيلات تضيق شيئًا فشيئًا.', '$\\int_a^b f(x)\\,dx$: the limit of the sum of narrower and narrower rectangles.') }
        ],
        vocabulary: [
            say('zabalera', 'anchura', 'العرض', 'width'),
            say('hurbilketa', 'aproximación', 'التقريب', 'approximation')
        ],
        explanation: say(
            'Kurbaren azpiko azalera ez dakigunez, laukizuzenekin betetzen da: oinarria tartearen zati bat eta altuera funtzioaren balioa. Laukizuzen gehiago eta estuagoak hartuz gero, hurbilketa hobea da; limitean, azalera zehatza.',
            'Como no sabemos el área bajo la curva, la llenamos de rectángulos: la base es un trozo del intervalo y la altura, el valor de la función. Con más rectángulos y más estrechos la aproximación es mejor; en el límite, el área exacta.',
            'بما أننا لا نعرف المساحة تحت المنحنى نملؤها بمستطيلات: القاعدة جزء من الفترة والارتفاع قيمة الدالة. وبمستطيلات أكثر وأضيق يتحسن التقريب، وفي النهاية تكون المساحة الدقيقة.',
            'As we do not know the area under the curve, we fill it with rectangles: the base is a piece of the interval and the height is the value of the function. With more and narrower rectangles the approximation is better; in the limit, the exact area.'
        ),
        examplePrompt: say('Hurbildu $y=2x$ zuzenaren azpiko azalera $[0,3]$ tartean, eskuineko altuera duten 3 laukizuzenekin.', 'Aproxima el área bajo $y=2x$ en $[0,3]$ con 3 rectángulos de altura por la derecha.', 'قرّب المساحة تحت $y=2x$ على $[0,3]$ بثلاثة مستطيلات بارتفاع الطرف الأيمن.', 'Approximate the area under $y=2x$ on $[0,3]$ with 3 rectangles of right-hand height.'),
        example: same('$1\\cdot(2+4+6)=12$'),
        exampleAnswer: say('12; azalera zehatza 9 da.', '12; el área exacta es 9.', '12؛ والمساحة الدقيقة 9.', '12; the exact area is 9.')
    },
    barrow: {
        definitions: [
            { term: say('Barrow-en erregela', 'Regla de Barrow', 'قاعدة بارو', "Barrow's rule"), meaning: say('$\\int_a^b f(x)\\,dx=F(b)-F(a)$, $F$ jatorrizko bat izanik.', '$\\int_a^b f(x)\\,dx=F(b)-F(a)$, con $F$ una primitiva.', '$\\int_a^b f(x)\\,dx=F(b)-F(a)$ حيث $F$ دالة أصلية.', '$\\int_a^b f(x)\\,dx=F(b)-F(a)$, with $F$ an antiderivative.') }
        ],
        vocabulary: [
            say('mugak', 'límites', 'الحد', 'limits'),
            say('kenketa', 'resta', 'الطرح', 'subtraction')
        ],
        explanation: say(
            'Barrow-en erregelak laukizuzenak saihesten ditu: jatorrizko bat aurkitu, goiko mugan eta beheko mugan kalkulatu eta kendu. $C$ ez da behar, kenketan desagertzen delako. Ordena garrantzitsua da: goikoa ken behekoa.',
            'La regla de Barrow evita los rectángulos: se busca una primitiva, se calcula en el límite de arriba y en el de abajo y se restan. La $C$ no hace falta, porque desaparece en la resta. El orden importa: arriba menos abajo.',
            'تختصر قاعدة بارو المستطيلات: نجد دالة أصلية ونحسبها عند الحد العلوي والسفلي ونطرح. ولا حاجة إلى $C$ لأنه يختفي في الطرح. والترتيب مهم: العلوي ناقص السفلي.',
            "Barrow's rule avoids rectangles: find an antiderivative, work it out at the top and bottom limits and subtract. No $C$ is needed, because it disappears in the subtraction. The order matters: top minus bottom."
        ),
        examplePrompt: say('Kalkulatu $\\int_0^2 3x^2\\,dx$.', 'Calcula $\\int_0^2 3x^2\\,dx$.', 'احسب $\\int_0^2 3x^2\\,dx$.', 'Work out $\\int_0^2 3x^2\\,dx$.'),
        example: same('$F(x)=x^3\\qquad F(2)-F(0)=8$'),
        exampleAnswer: say('8.', '8.', '8.', '8.'),
        why: {
            text: say(
                'Zergatik $F(b)-F(a)$? $a$ puntutik $x$ punturako azalerak, $A(x)$, $f$ deribatua du. Beraz, $A$ jatorrizko bat da: $A(x)=F(x)-F(a)$, eta $x=b$ denean, $F(b)-F(a)$.',
                '¿Por qué $F(b)-F(a)$? El área desde $a$ hasta $x$, $A(x)$, tiene derivada $f$. Así que $A$ es una primitiva: $A(x)=F(x)-F(a)$, y en $x=b$ da $F(b)-F(a)$.',
                'لماذا $F(b)-F(a)$؟ المساحة من $a$ إلى $x$ أي $A(x)$ مشتقتها $f$. إذن $A$ دالة أصلية: $A(x)=F(x)-F(a)$، وعند $x=b$ تساوي $F(b)-F(a)$.',
                'Why $F(b)-F(a)$? The area from $a$ to $x$, $A(x)$, has derivative $f$. So $A$ is an antiderivative: $A(x)=F(x)-F(a)$, and at $x=b$ it gives $F(b)-F(a)$.'
            )
        }
    },
    properties: {
        definitions: [
            { term: say('Linealtasuna', 'Linealidad', 'الخطية', 'Linearity'), meaning: say('$\\int(kf+g)=k\\int f+\\int g$: konstanteak kanpora eta baturak bereizita.', '$\\int(kf+g)=k\\int f+\\int g$: las constantes fuera y las sumas por separado.', '$\\int(kf+g)=k\\int f+\\int g$: الثوابت خارجًا والمجاميع منفصلة.', '$\\int(kf+g)=k\\int f+\\int g$: constants outside and sums separately.') }
        ],
        vocabulary: [
            say('tarteak', 'intervalos', 'الفترتين', 'intervals'),
            say('trukatu', 'cambiar', 'تبديل', 'swap')
        ],
        explanation: say(
            'Integral mugatuak tarteak batzen ditu: $[a,c]$ eta $[c,b]$ tarteak elkartuz $[a,b]$ lortzen da. Mugak trukatzean zeinua aldatzen da, kenketa alderantziz egiten delako. Muga berdinekin, zero.',
            'La integral definida suma intervalos: juntando $[a,c]$ y $[c,b]$ se obtiene $[a,b]$. Al cambiar los límites cambia el signo, porque la resta se hace al revés. Con límites iguales, cero.',
            'يجمع التكامل المحدد الفترات: بضم الفترتين $[a,c]$ و$[c,b]$ نحصل على $[a,b]$. وعند تبديل الحدين تتغير الإشارة لأن الطرح يصير معكوسًا. ومع حدين متساويين يكون صفرًا.',
            'The definite integral adds intervals: joining $[a,c]$ and $[c,b]$ gives $[a,b]$. Swapping the limits changes the sign, because the subtraction goes the other way. With equal limits, zero.'
        ),
        examplePrompt: say('$\\int_1^5 g(x)\\,dx=7$ bada, zenbat da $\\int_1^5 3g(x)\\,dx$?', 'Si $\\int_1^5 g(x)\\,dx=7$, ¿cuánto vale $\\int_1^5 3g(x)\\,dx$?', 'إذا كان $\\int_1^5 g(x)\\,dx=7$ فكم يساوي $\\int_1^5 3g(x)\\,dx$؟', 'If $\\int_1^5 g(x)\\,dx=7$, what is $\\int_1^5 3g(x)\\,dx$?'),
        example: same('$3\\cdot 7=21$'),
        exampleAnswer: say('21.', '21.', '21.', '21.')
    },

    /* ---------- 4. Areas ---------- */
    'area-axis': {
        definitions: [
            { term: say('Kurba azpiko azalera', 'Área bajo la curva', 'المساحة تحت المنحنى', 'Area under the curve'), meaning: say('Kurbak, $X$ ardatzak eta bi zuzen bertikalek mugatutako eskualdea.', 'La región limitada por la curva, el eje $X$ y dos rectas verticales.', 'المنطقة المحصورة بين المنحنى ومحور $X$ ومستقيمين عموديين.', 'The region enclosed by the curve, the $X$ axis and two vertical lines.') }
        ],
        vocabulary: [
            say('eskualdea', 'región', 'المنطقة', 'region'),
            say('mugatu', 'limitada', 'المحصورة', 'enclosed')
        ],
        explanation: say(
            'Kurba ardatzaren gainean badago, azalera eta integrala gauza bera dira. Lehenik ebaki-puntuak bilatzen dira (mugak ematen ez badituzte), gero jatorrizkoa, eta azkenik Barrow. Azalera beti positiboa da.',
            'Si la curva está encima del eje, el área y la integral son lo mismo. Primero se buscan los cortes (si no dan los límites), después la primitiva y al final Barrow. El área de la región limitada siempre es positiva.',
            'إذا كان المنحنى فوق المحور فالمساحة والتكامل شيء واحد. نبحث أولًا عن نقاط التقاطع (إن لم تُعطَ الحدود)، ثم الدالة الأصلية، وأخيرًا بارو. ومساحة المنطقة المحصورة موجبة دائمًا.',
            'If the curve is above the axis, the area and the integral are the same thing. First look for the intercepts (if the limits are not given), then the antiderivative and finally Barrow. The area of the enclosed region is always positive.'
        ),
        examplePrompt: say('Kalkulatu $y=x^2$ kurbaren azpiko azalera $[0,3]$ tartean.', 'Calcula el área bajo $y=x^2$ en $[0,3]$.', 'احسب المساحة تحت $y=x^2$ على $[0,3]$.', 'Work out the area under $y=x^2$ on $[0,3]$.'),
        example: same('$\\left[\\frac{x^3}{3}\\right]_0^3=9$'),
        exampleAnswer: say('9 unitate karratu.', '9 unidades cuadradas.', '9 وحدات مربعة.', '9 square units.')
    },
    'area-sign': {
        definitions: [
            { term: say('Integralaren zeinua', 'Signo de la integral', 'إشارة التكامل', 'Sign of the integral'), meaning: say('Ardatzaren azpiko zatiek integral negatiboa ematen dute.', 'Las partes bajo el eje dan una integral negativa.', 'الأجزاء تحت المحور تعطي تكاملًا سالبًا.', 'The parts below the axis give a negative integral.') }
        ],
        vocabulary: [
            say('zatitu', 'partir', 'نقسم', 'split'),
            say('negatiboa', 'negativo', 'سالبًا', 'negative')
        ],
        explanation: say(
            'Integralak ardatzaren azpian dagoena negatibo zenbatzen du, eta beraz zatiak elkarren artean deuseztatu daitezke. Azalera lortzeko, zatitu tartea ebaki-puntuetan, integratu zati bakoitza eta batu balio absolutuak.',
            'La integral cuenta como negativo lo que está bajo el eje, así que los trozos se pueden anular entre sí. Para el área, hay que partir el intervalo en los cortes, integrar cada trozo y sumar los valores absolutos.',
            'يحسب التكامل ما تحت المحور سالبًا، لذا قد تلغي الأجزاء بعضها بعضًا. وللمساحة نقسم الفترة عند نقاط التقاطع ونكامل كل جزء ونجمع القيم المطلقة.',
            'The integral counts what is below the axis as negative, so the pieces can cancel each other. For the area, split the interval at the intercepts, integrate each piece and add the absolute values.'
        ),
        examplePrompt: say('Kalkulatu $\\int_{-1}^1 x^3\\,dx$ eta azalera.', 'Calcula $\\int_{-1}^1 x^3\\,dx$ y el área.', 'احسب $\\int_{-1}^1 x^3\\,dx$ والمساحة.', 'Work out $\\int_{-1}^1 x^3\\,dx$ and the area.'),
        example: same('$\\int_{-1}^1 x^3\\,dx=0\\qquad A=\\frac{1}{4}+\\frac{1}{4}=\\frac{1}{2}$'),
        exampleAnswer: say('Integrala 0 da, baina azalera $\\frac{1}{2}$.', 'La integral es 0, pero el área es $\\frac{1}{2}$.', 'التكامل 0 لكن المساحة $\\frac{1}{2}$.', 'The integral is 0, but the area is $\\frac{1}{2}$.')
    },
    between: {
        definitions: [
            { term: say('Bi kurben arteko azalera', 'Área entre dos curvas', 'المساحة بين منحنيين', 'Area between two curves'), meaning: say('$\\int_a^b(f-g)\\,dx$, $f$ goian eta $a$, $b$ ebaki-puntuak izanik.', '$\\int_a^b(f-g)\\,dx$, con $f$ arriba y $a$, $b$ los cortes.', '$\\int_a^b(f-g)\\,dx$ حيث $f$ في الأعلى و$a$ و$b$ نقطتا التقاطع.', '$\\int_a^b(f-g)\\,dx$, with $f$ on top and $a$, $b$ where they meet.') }
        ],
        vocabulary: [
            say('goikoa', 'de arriba', 'الأعلى', 'top'),
            say('behekoa', 'de abajo', 'الأدنى', 'bottom')
        ],
        explanation: say(
            'Bi kurben arteko azalerarako, lehenik non mozten diren ebazten da: $f(x)=g(x)$. Gero goikoa ken behekoa integratzen da. Zein den goikoa jakiteko, nahikoa da tarteko puntu bat probatzea.',
            'Para el área entre dos curvas, primero se resuelve dónde se cortan: $f(x)=g(x)$. Después se integra la de arriba menos la de abajo. Para saber cuál es la de arriba basta probar un punto del intervalo.',
            'للمساحة بين منحنيين نحل أولًا أين يتقاطعان: $f(x)=g(x)$. ثم نكامل الأعلى ناقص الأدنى. ولمعرفة أيهما الأعلى يكفي تجريب نقطة من الفترة.',
            'For the area between two curves, first solve where they meet: $f(x)=g(x)$. Then integrate the top one minus the bottom one. To know which is on top, trying one point of the interval is enough.'
        ),
        examplePrompt: say('Kalkulatu $y=4$ eta $y=x^2$ kurben arteko azalera.', 'Calcula el área entre $y=4$ e $y=x^2$.', 'احسب المساحة بين $y=4$ و$y=x^2$.', 'Work out the area between $y=4$ and $y=x^2$.'),
        example: same('$\\int_{-2}^2(4-x^2)\\,dx=\\frac{32}{3}$'),
        exampleAnswer: say('$\\frac{32}{3}$ unitate karratu.', '$\\frac{32}{3}$ unidades cuadradas.', '$\\frac{32}{3}$ وحدة مربعة.', '$\\frac{32}{3}$ square units.')
    },

    /* ---------- 5. In economics ---------- */
    'cost-from-marginal': {
        definitions: [
            { term: say('Kostu finkoa', 'Coste fijo', 'التكلفة الثابتة', 'Fixed cost'), meaning: say('Ezer ekoitzi gabe ere ordaintzen dena: $C(0)$.', 'Lo que se paga aunque no se produzca nada: $C(0)$.', 'ما يُدفع حتى دون إنتاج: $C(0)$.', 'What is paid even with no production: $C(0)$.') }
        ],
        vocabulary: [
            say('alokairua', 'alquiler', 'الإيجار', 'rent'),
            say('produkzioa', 'producción', 'الإنتاج', 'production')
        ],
        explanation: say(
            'Enpresek askotan badakite unitate bakoitzak zenbat kostatzen duen ($C\'$), baina kostu osoa nahi dute. Integratuz $C$ itzultzen da, konstante bat gutxienez; konstante hori kostu finkoa da: alokairua, makinak… produkzioa zero denean ere ordaintzen dena.',
            'Las empresas a menudo saben lo que cuesta cada unidad ($C\'$), pero quieren el coste total. Al integrar se vuelve a $C$, salvo una constante; esa constante es el coste fijo: alquiler, máquinas… lo que se paga aunque la producción sea cero.',
            'كثيرًا ما تعرف الشركات تكلفة كل وحدة ($C\'$) لكنها تريد التكلفة الكلية. وبالتكامل نعود إلى $C$ إلا ثابتًا، وهذا الثابت هو التكلفة الثابتة: الإيجار والآلات… ما يُدفع حتى لو كان الإنتاج صفرًا.',
            'Firms often know what each unit costs ($C\'$), but they want the total cost. Integrating gets back to $C$, up to a constant; that constant is the fixed cost: rent, machines… what is paid even when production is zero.'
        ),
        examplePrompt: say('$C\'(x)=3x^2+4$ eta kostu finkoa 50 euro. Idatzi $C(x)$.', '$C\'(x)=3x^2+4$ y el coste fijo es 50 €. Escribe $C(x)$.', '$C\'(x)=3x^2+4$ والتكلفة الثابتة 50 €. اكتب $C(x)$.', '$C\'(x)=3x^2+4$ and the fixed cost is €50. Write $C(x)$.'),
        example: same('$C(x)=x^3+4x+K\\qquad K=50$'),
        exampleAnswer: say('$C(x)=x^3+4x+50$.', '$C(x)=x^3+4x+50$.', '$C(x)=x^3+4x+50$.', '$C(x)=x^3+4x+50$.'),
        why: {
            text: say(
                'Zergatik da konstantea kostu finkoa? $x=0$ ordezkatuz, $x$ duten gai guztiak zero dira eta $C(0)=K$ geratzen da: ekoizten ez denean kostatzen dena.',
                '¿Por qué la constante es el coste fijo? Al sustituir $x=0$, todos los términos con $x$ son cero y queda $C(0)=K$: lo que cuesta sin producir.',
                'لماذا الثابت هو التكلفة الثابتة؟ بتعويض $x=0$ تنعدم كل الحدود التي فيها $x$ ويبقى $C(0)=K$: ما يكلّف دون إنتاج.',
                'Why is the constant the fixed cost? Substituting $x=0$, every term with $x$ is zero and $C(0)=K$ is left: what it costs without producing.'
            )
        }
    },
    accumulated: {
        definitions: [
            { term: say('Erritmoa', 'Ritmo', 'الوتيرة', 'Rate'), meaning: say('Denbora-unitate bakoitzeko kopurua: salmentak hilean, biztanleak urtean.', 'La cantidad por unidad de tiempo: ventas al mes, habitantes al año.', 'الكمية لكل وحدة زمن: مبيعات في الشهر، سكان في السنة.', 'The amount per unit of time: sales a month, inhabitants a year.') }
        ],
        vocabulary: [
            say('pilatu', 'acumular', 'يتراكم', 'pile up'),
            say('unitateak', 'unidades', 'الوحدات', 'units')
        ],
        explanation: say(
            'Erritmo bat konstantea bada, guztira pilatutakoa erritmoa bider denbora da. Erritmoa aldatzen bada, kurbaren azpiko azalera da: integrala. Unitateak ere biderkatzen dira: mila produktu hilean bider hilabeteak.',
            'Si un ritmo es constante, lo que se llega a acumular es ritmo por tiempo. Si el ritmo cambia, es el área bajo la curva: la integral. Las unidades también se multiplican: miles de productos al mes por meses.',
            'إذا كانت الوتيرة ثابتة فما يتراكم هو الوتيرة في الزمن. وإذا تغيرت الوتيرة فهو المساحة تحت المنحنى: التكامل. والوحدات تُضرب أيضًا: آلاف المنتجات في الشهر في الأشهر.',
            'If a rate is constant, what piles up is rate times time. If the rate changes, it is the area under the curve: the integral. The units multiply too: thousands of products a month times months.'
        ),
        examplePrompt: say('Herri batek $p(t)=0{,}6t$ mila biztanle irabazten ditu urtean. Zenbat irabazten ditu 5 urtetan?', 'Un pueblo gana $p(t)=0{,}6t$ miles de habitantes al año. ¿Cuántos gana en 5 años?', 'تكسب بلدة $p(t)=0{,}6t$ ألف ساكن في السنة. كم تكسب في 5 سنوات؟', 'A town gains $p(t)=0{,}6t$ thousand inhabitants a year. How many does it gain in 5 years?'),
        example: same('$\\int_0^5 0{,}6t\\,dt=0{,}3\\cdot 25=7{,}5$'),
        exampleAnswer: say('7500 biztanle.', '7500 habitantes.', '7500 ساكن.', '7,500 inhabitants.')
    },
    'income-from-marginal': {
        definitions: [
            { term: say('Diru-sarreren igoera', 'Aumento del ingreso', 'زيادة الإيراد', 'Rise in income'), meaning: say('$\\int_a^b I\'(x)\\,dx=I(b)-I(a)$: $a$ unitatetik $b$ unitatera gehitzen dena.', '$\\int_a^b I\'(x)\\,dx=I(b)-I(a)$: lo que se añade al pasar de $a$ a $b$ unidades.', '$\\int_a^b I\'(x)\\,dx=I(b)-I(a)$: ما يُضاف عند الانتقال من $a$ إلى $b$ وحدة.', '$\\int_a^b I\'(x)\\,dx=I(b)-I(a)$: what is added going from $a$ to $b$ units.') }
        ],
        vocabulary: [
            say('igoera', 'aumento', 'الزيادة', 'rise'),
            say('saldu', 'vender', 'البيع', 'sell')
        ],
        explanation: say(
            '$I\'$ jakinda, diru-sarrerak bi modutan kalkulatzen dira. Osoak: integratu eta $I(0)=0$ erabili, ezer saldu gabe ez baita ezer sartzen. Tarte bateko igoera: integral mugatua, Barrow-en erregelarekin.',
            'Sabiendo $I\'$, los ingresos se calculan de dos maneras. Los totales: integra y usa $I(0)=0$, porque sin vender no entra nada. El aumento en un tramo: la integral definida, con la regla de Barrow.',
            'بمعرفة $I\'$ يُحسب الإيراد بطريقتين. الكلي: كامل واستعمل $I(0)=0$ لأنه دون البيع لا يدخل شيء. والزيادة في شريحة: التكامل المحدد بقاعدة بارو.',
            'Knowing $I\'$, income is worked out in two ways. The total: integrate and use $I(0)=0$, because if you do not sell anything nothing comes in. The rise over a stretch: the definite integral, with Barrow\'s rule.'
        ),
        examplePrompt: say('$I\'(x)=60-4x$ bada, zein dira 10 unitate saltzean diru-sarrera osoak?', 'Si $I\'(x)=60-4x$, ¿cuánto se ingresa en total al vender 10 unidades?', 'إذا كانت $I\'(x)=60-4x$ فما الإيراد الكلي عند بيع 10 وحدات؟', 'If $I\'(x)=60-4x$, what is the total income when selling 10 units?'),
        example: same('$I(x)=60x-2x^2\\qquad I(10)=600-200=400$'),
        exampleAnswer: say('400 euro.', '400 €.', '400 €.', '€400.')
    }
}
