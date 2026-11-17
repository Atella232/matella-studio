import type { LessonTexts } from '../../features/unit-v2/types.ts'
import type { SocLimitsTopicId } from './lessonChecks.ts'
import { plain as say, plainSame as same } from './text.ts'

/* ==========================================================================
   Limiteak eta jarraitutasuna · Batxilergoa 1 · Gizarte Zientziak — what
   each lesson tells: definitions, a short explanation, the example as an
   exercise («Another example») and key words. Plain data so the tests can
   import it. The example uses numbers of its own.
   ========================================================================== */

export const socLimitsLessonTexts: Record<SocLimitsTopicId, LessonTexts> = {
    /* ---------- 1. Limits at infinity ---------- */
    'long-run': {
        definitions: [
            { term: say('Limitea infinituan', 'Límite en el infinito', 'النهاية عند اللانهاية', 'Limit at infinity'), meaning: say('$\\lim_{x\\to+\\infty}f(x)=L$: $x$ nahikoa handia bada, $f(x)$ nahi bezain hurbil dago $L$ baliotik.', '$\\lim_{x\\to+\\infty}f(x)=L$: si $x$ es bastante grande, $f(x)$ queda tan cerca de $L$ como se quiera.', '$\\lim_{x\\to+\\infty}f(x)=L$: إذا كان $x$ كبيرًا بما يكفي كانت $f(x)$ قريبة من $L$ بقدر ما نريد.', '$\\lim_{x\\to+\\infty}f(x)=L$: if $x$ is big enough, $f(x)$ is as close to $L$ as you like.') }
        ],
        vocabulary: [
            say('epe luzera', 'a la larga', 'على المدى البعيد', 'in the long run'),
            say('balio-taula', 'tabla de valores', 'جدول القيم', 'table of values')
        ],
        explanation: say(
            'Funtzio batek epe luzera zer egiten duen ikusteko, $x$ aldagaiari gero eta balio handiagoak ematen zaizkio balio-taula batean. $f(x)$ zenbaki batera hurbiltzen bada, $L$ zenbakira, $\\lim_{x\\to+\\infty}f(x)=L$ idazten da, eta $y=L$ zuzena asintota horizontala da. Gelditu gabe hazten bada, limitea $+\\infty$ da; gelditu gabe jaisten bada, $-\\infty$.',
            'Para ver qué hace una función a la larga, se le dan a $x$ valores cada vez más grandes en una tabla de valores. Si $f(x)$ se acerca a un número $L$, se escribe $\\lim_{x\\to+\\infty}f(x)=L$, y la recta $y=L$ es una asíntota horizontal. Si crece sin parar, el límite es $+\\infty$; si baja sin parar, $-\\infty$.',
            'لمعرفة ما تفعله دالة على المدى البعيد نعطي $x$ قيمًا تكبر أكثر فأكثر في جدول القيم. إذا اقتربت $f(x)$ من عدد $L$ نكتب $\\lim_{x\\to+\\infty}f(x)=L$، ويكون المستقيم $y=L$ مقاربًا أفقيًّا. وإذا تزايدت بلا توقف فالنهاية $+\\infty$، وإذا تناقصت بلا توقف فهي $-\\infty$.',
            'To see what a function does in the long run, give $x$ bigger and bigger values in a table of values. If $f(x)$ approaches a number $L$, you write $\\lim_{x\\to+\\infty}f(x)=L$, and the line $y=L$ is a horizontal asymptote. If it grows without stopping, the limit is $+\\infty$; if it falls without stopping, $-\\infty$.'
        ),
        examplePrompt: say('Kafe bat $T(t)=20+60\\cdot 0{,}9^t$ graduraino hozten da, $t$ minututan. Zein tenperaturatara hurbiltzen da?', 'Un café se enfría según $T(t)=20+60\\cdot 0{,}9^t$ grados, con $t$ en minutos. ¿A qué temperatura se acerca?', 'تبرد قهوة وفق $T(t)=20+60\\cdot 0{,}9^t$ درجة، و$t$ بالدقائق. من أي درجة حرارة تقترب؟', 'A coffee cools as $T(t)=20+60\\cdot 0{,}9^t$ degrees, with $t$ in minutes. What temperature does it approach?'),
        example: same('$T(10)\\approx 40{,}9\\qquad T(50)\\approx 20{,}3$'),
        exampleAnswer: say('Gelaren tenperaturara, 20 gradura: $\\lim_{t\\to+\\infty}T(t)=20$.', 'A la temperatura de la habitación, 20 grados: $\\lim_{t\\to+\\infty}T(t)=20$.', 'من حرارة الغرفة، 20 درجة: $\\lim_{t\\to+\\infty}T(t)=20$.', 'The room temperature, 20 degrees: $\\lim_{t\\to+\\infty}T(t)=20$.')
    },
    'poly-exp': {
        definitions: [
            { term: say('Maila handieneko gaia', 'Término de mayor grado', 'الحد ذو الدرجة الأكبر', 'Highest-degree term'), meaning: say('Berretzaile handiena duen gaia: epe luzera, hark agintzen du.', 'El término con el exponente más alto: a la larga es el que manda.', 'الحد ذو الأس الأكبر: على المدى البعيد هو الذي يحكم.', 'The term with the highest exponent: in the long run it is the one that rules.') }
        ],
        vocabulary: [
            say('maila', 'grado', 'الدرجة', 'degree'),
            say('esponentziala', 'exponencial', 'الأسية', 'exponential')
        ],
        explanation: say(
            '$x$ oso handia denean, polinomio batean maila handieneko gaiak beste guztiek baino askoz gehiago balio du: $\\lim_{x\\to+\\infty}(-2x^3+100x)=-\\infty$, $-2x^3$ gaiak agintzen duelako. $a^x$ esponentzial bat, $a>1$ denean, gelditu gabe hazten da, eta edozein polinomio baino azkarrago; $0<a<1$ denean, 0 baliora hurbiltzen da.',
            'Cuando $x$ es muy grande, en un polinomio el término de mayor grado pesa mucho más que los demás: $\\lim_{x\\to+\\infty}(-2x^3+100x)=-\\infty$ porque manda $-2x^3$. Una exponencial $a^x$ con $a>1$ crece sin parar, y más deprisa que cualquier polinomio; con $0<a<1$ se acerca a 0.',
            'عندما يكون $x$ كبيرًا جدًّا يزن الحد ذو الدرجة الأكبر في الحدودية أكثر بكثير من الحدود الأخرى: $\\lim_{x\\to+\\infty}(-2x^3+100x)=-\\infty$ لأن $-2x^3$ هو الذي يحكم. والأسية $a^x$ مع $a>1$ تتزايد بلا توقف وأسرع من أي حدودية، ومع $0<a<1$ تقترب من 0.',
            'When $x$ is very big, the highest-degree term of a polynomial weighs much more than the others: $\\lim_{x\\to+\\infty}(-2x^3+100x)=-\\infty$ because $-2x^3$ rules. An exponential $a^x$ with $a>1$ grows without stopping, and faster than any polynomial; with $0<a<1$ it approaches 0.'
        ),
        examplePrompt: say('Nora doaz $f(x)=500-3x^2+x$ eta $g(x)=4\\cdot 0{,}5^x$, $x\\to+\\infty$ denean?', '¿Hacia dónde van $f(x)=500-3x^2+x$ y $g(x)=4\\cdot 0{,}5^x$ cuando $x\\to+\\infty$?', 'إلى أين تتجه $f(x)=500-3x^2+x$ و$g(x)=4\\cdot 0{,}5^x$ عندما $x\\to+\\infty$؟', 'Where do $f(x)=500-3x^2+x$ and $g(x)=4\\cdot 0{,}5^x$ go as $x\\to+\\infty$?'),
        example: same('$-3x^2\\ \\to\\ -\\infty\\qquad 0{,}5^x\\ \\to\\ 0$'),
        exampleAnswer: say('$f$ funtzioa $-\\infty$ aldera doa, eta $g$ funtzioa 0 baliora.', '$f$ va a $-\\infty$ y $g$ va a 0.', '$f$ تتجه إلى $-\\infty$ و$g$ تتجه إلى 0.', '$f$ goes to $-\\infty$ and $g$ goes to 0.')
    },
    degrees: {
        definitions: [
            { term: say('Koefiziente nagusia', 'Coeficiente principal', 'المعامل الرئيسي', 'Leading coefficient'), meaning: say('Maila handieneko gaia biderkatzen duen zenbakia.', 'El número que multiplica al término de mayor grado.', 'العدد الذي يضرب الحد ذا الدرجة الأكبر.', 'The number that multiplies the highest-degree term.') }
        ],
        vocabulary: [
            say('maila', 'grado', 'الدرجة', 'degree'),
            say('koefizientea', 'coeficiente', 'المعامل', 'coefficient')
        ],
        explanation: say(
            '$x\\to\\pm\\infty$ denean, polinomioen zatidura batek $\\frac{\\infty}{\\infty}$ ematen du, eta hori indeterminazio bat da: emaitza ez dakigu besterik gabe. Dena berretura handienaz zatitzen da, edo zuzenean alderatzen da: goiko eta beheko maila handieneko gaiek bakarrik dute garrantzia. Adibidez, $\\frac{6x^3-x}{2x^3+5}\\to\\frac{6}{2}=3$.',
            'Si $x\\to\\pm\\infty$, un cociente de polinomios da $\\frac{\\infty}{\\infty}$, que es una indeterminación: no se sabe el resultado sin más. Se divide todo entre la mayor potencia, o se compara directamente: solo cuentan los términos de mayor grado de arriba y de abajo. Por ejemplo, $\\frac{6x^3-x}{2x^3+5}\\to\\frac{6}{2}=3$.',
            'إذا $x\\to\\pm\\infty$ يعطي خارج قسمة حدوديتين $\\frac{\\infty}{\\infty}$، وهي حالة عدم تعيين: لا نعرف النتيجة مباشرة. نقسم كل شيء على أكبر قوة، أو نقارن مباشرة: لا يهم إلا الحدّان ذوا الدرجة الأكبر في البسط والمقام. مثلًا $\\frac{6x^3-x}{2x^3+5}\\to\\frac{6}{2}=3$.',
            'If $x\\to\\pm\\infty$, a quotient of polynomials gives $\\frac{\\infty}{\\infty}$, which is an indeterminate form: you do not know the result straight away. Divide everything by the highest power, or compare directly: only the highest-degree terms on top and below count. For example, $\\frac{6x^3-x}{2x^3+5}\\to\\frac{6}{2}=3$.'
        ),
        examplePrompt: say('Kalkulatu $\\lim_{x\\to+\\infty}\\frac{x^3-2}{4x+7}$.', 'Calcula $\\lim_{x\\to+\\infty}\\frac{x^3-2}{4x+7}$.', 'احسب $\\lim_{x\\to+\\infty}\\frac{x^3-2}{4x+7}$.', 'Work out $\\lim_{x\\to+\\infty}\\frac{x^3-2}{4x+7}$.'),
        example: same('$\\frac{x^3}{4x}=\\frac{x^2}{4}\\ \\to\\ +\\infty$'),
        exampleAnswer: say('Goian maila handiagoa dago: limitea $+\\infty$ da.', 'Arriba hay más grado: el límite es $+\\infty$.', 'درجة البسط أكبر: النهاية $+\\infty$.', 'The top has the higher degree: the limit is $+\\infty$.')
    },

    /* ---------- 2. More cases at infinity ---------- */
    'minus-infinity': {
        definitions: [
            { term: say('Limitea $-\\infty$ aldean', 'Límite en $-\\infty$', 'النهاية عند $-\\infty$', 'Limit at $-\\infty$'), meaning: say('$\\lim_{x\\to-\\infty}f(x)$: $f(x)$ funtzioak zer egiten duen, $x$ negatiboa denean eta balio absolutuan gero eta handiagoa.', '$\\lim_{x\\to-\\infty}f(x)$: lo que hace $f(x)$ cuando $x$ es negativo y cada vez más grande en valor absoluto.', '$\\lim_{x\\to-\\infty}f(x)$: ما تفعله $f(x)$ عندما يكون $x$ سالبًا ويكبر أكثر فأكثر بالقيمة المطلقة.', '$\\lim_{x\\to-\\infty}f(x)$: what $f(x)$ does when $x$ is negative and bigger and bigger in absolute value.') }
        ],
        vocabulary: [
            say('bikoitia', 'par', 'زوجي', 'even'),
            say('bakoitia', 'impar', 'فردي', 'odd')
        ],
        explanation: say(
            '$x\\to-\\infty$ denean, $x$ aldagaiak $-10$, $-100$ edo $-1000$ bezalako balioak hartzen ditu. Trikimailu bat: $\\lim_{x\\to-\\infty}f(x)=\\lim_{x\\to+\\infty}f(-x)$. Maila bikoitia bada, $(-x)^2=x^2$ da eta zeinua ez da aldatzen; bakoitia bada, aldatu egiten da. $a>1$ duten esponentzialak 0 baliora hurbiltzen dira ezkerretik: $y=0$ zuzena asintota da.',
            'Si $x\\to-\\infty$, $x$ toma valores como $-10$, $-100$ o $-1000$. Un truco: $\\lim_{x\\to-\\infty}f(x)=\\lim_{x\\to+\\infty}f(-x)$. Con grado par, $(-x)^2=x^2$ y el signo no cambia; con grado impar, cambia. Las exponenciales con $a>1$ se acercan a 0 por la izquierda: la recta $y=0$ es una asíntota.',
            'إذا $x\\to-\\infty$ يأخذ $x$ قيمًا مثل $-10$ و$-100$ و$-1000$. وهذه حيلة: $\\lim_{x\\to-\\infty}f(x)=\\lim_{x\\to+\\infty}f(-x)$. مع الدرجة الزوجية $(-x)^2=x^2$ ولا تتغير الإشارة، ومع الدرجة الفردية تتغير. والأسيات مع $a>1$ تقترب من 0 من اليسار: المستقيم $y=0$ مقارب.',
            'If $x\\to-\\infty$, $x$ takes values such as $-10$, $-100$ or $-1000$. A trick: $\\lim_{x\\to-\\infty}f(x)=\\lim_{x\\to+\\infty}f(-x)$. With an even degree, $(-x)^2=x^2$ and the sign does not change; with an odd degree, it does. Exponentials with $a>1$ approach 0 on the left: the line $y=0$ is an asymptote.'
        ),
        examplePrompt: say('Kalkulatu $\\lim_{x\\to-\\infty}(2x^4-x^3)$ eta $\\lim_{x\\to-\\infty}\\frac{5x+1}{x^2}$.', 'Calcula $\\lim_{x\\to-\\infty}(2x^4-x^3)$ y $\\lim_{x\\to-\\infty}\\frac{5x+1}{x^2}$.', 'احسب $\\lim_{x\\to-\\infty}(2x^4-x^3)$ و$\\lim_{x\\to-\\infty}\\frac{5x+1}{x^2}$.', 'Work out $\\lim_{x\\to-\\infty}(2x^4-x^3)$ and $\\lim_{x\\to-\\infty}\\frac{5x+1}{x^2}$.'),
        example: same('$2x^4\\ \\to\\ +\\infty\\qquad\\frac{5x}{x^2}=\\frac{5}{x}\\ \\to\\ 0$'),
        exampleAnswer: say('Lehena $+\\infty$ da (maila bikoitia), eta bigarrena 0.', 'El primero es $+\\infty$ (grado par) y el segundo, 0.', 'الأولى $+\\infty$ (درجة زوجية) والثانية 0.', 'The first is $+\\infty$ (even degree) and the second, 0.')
    },
    'roots-infinity': {
        definitions: [
            { term: say('Erro baten maila', 'Grado de una raíz', 'درجة الجذر', 'Degree of a root'), meaning: say('$\\sqrt{x^n}$ adierazpenaren maila $\\frac{n}{2}$ da.', '$\\sqrt{x^n}$ tiene grado $\\frac{n}{2}$.', 'درجة $\\sqrt{x^n}$ هي $\\frac{n}{2}$.', '$\\sqrt{x^n}$ has degree $\\frac{n}{2}$.') }
        ],
        vocabulary: [
            say('erroa', 'raíz', 'الجذر', 'root'),
            say('maila', 'grado', 'الدرجة', 'degree')
        ],
        explanation: say(
            '$x$ oso handia denean, erro baten barruan maila handieneko gaiak bakarrik du garrantzia: $\\sqrt{4x^2+x}$ ia $\\sqrt{4x^2}=2x$ da. Horregatik, $\\sqrt{x^2}$ adierazpenaren maila 1 da, eta $\\sqrt{x}$ adierazpenarena $\\frac{1}{2}$. Maila horiekin alderatzen dira goikoa eta behekoa.',
            'Cuando $x$ es muy grande, dentro de una raíz solo cuenta el término de mayor grado: $\\sqrt{4x^2+x}$ es casi $\\sqrt{4x^2}=2x$. Por eso $\\sqrt{x^2}$ tiene grado 1 y $\\sqrt{x}$, grado $\\frac{1}{2}$. Con esos grados se comparan arriba y abajo.',
            'عندما يكون $x$ كبيرًا جدًّا لا يهم داخل الجذر إلا الحد ذو الدرجة الأكبر: $\\sqrt{4x^2+x}$ تساوي تقريبًا $\\sqrt{4x^2}=2x$. لذلك درجة $\\sqrt{x^2}$ هي 1 ودرجة $\\sqrt{x}$ هي $\\frac{1}{2}$. وبهذه الدرجات نقارن البسط والمقام.',
            'When $x$ is very big, inside a root only the highest-degree term counts: $\\sqrt{4x^2+x}$ is almost $\\sqrt{4x^2}=2x$. That is why $\\sqrt{x^2}$ has degree 1 and $\\sqrt{x}$, degree $\\frac{1}{2}$. With those degrees you compare top and bottom.'
        ),
        examplePrompt: say('Kalkulatu $\\lim_{x\\to+\\infty}\\frac{2x-1}{\\sqrt{x^2+3}}$.', 'Calcula $\\lim_{x\\to+\\infty}\\frac{2x-1}{\\sqrt{x^2+3}}$.', 'احسب $\\lim_{x\\to+\\infty}\\frac{2x-1}{\\sqrt{x^2+3}}$.', 'Work out $\\lim_{x\\to+\\infty}\\frac{2x-1}{\\sqrt{x^2+3}}$.'),
        example: same('$\\frac{2x}{\\sqrt{x^2}}=\\frac{2x}{x}=2$'),
        exampleAnswer: say('Limitea 2 da.', 'El límite es 2.', 'النهاية 2.', 'The limit is 2.')
    },
    'long-models': {
        definitions: [
            { term: say('Batez besteko kostua', 'Coste medio', 'التكلفة المتوسطة', 'Average cost'), meaning: say('$\\frac{C(x)}{x}$: unitate bakoitzak, batez beste, zenbat balio duen.', '$\\frac{C(x)}{x}$: lo que cuesta, de media, cada unidad.', '$\\frac{C(x)}{x}$: ما تكلّفه كل وحدة في المتوسط.', '$\\frac{C(x)}{x}$: what each unit costs on average.') }
        ],
        vocabulary: [
            say('egonkortzen', 'se estabiliza', 'يستقر', 'levels off'),
            say('gastu finkoak', 'gastos fijos', 'التكاليف الثابتة', 'fixed costs')
        ],
        explanation: say(
            'Ekonomiako eta biologiako ereduetan, epe luzera zer gertatzen den jakin nahi da. $x$ unitate egiteko kostu osoa $C(x)=2000+5x$ bada, batez besteko kostua, $\\frac{2000+5x}{x}$, 5 baliora hurbiltzen da: gastu finkoak unitate askoren artean banatzen dira. Sabai bat duen biztanleria limitean egonkortzen da.',
            'En los modelos de economía y de biología interesa qué pasa a largo plazo. Si el coste total de fabricar $x$ unidades es $C(x)=2000+5x$, el coste medio $\\frac{2000+5x}{x}$ se acerca a 5: los gastos fijos se reparten entre muchas unidades. Una población con un techo se estabiliza en el límite.',
            'في نماذج الاقتصاد والأحياء يهمنا ما يحدث على المدى البعيد. إذا كانت التكلفة الكلية لصنع $x$ وحدة هي $C(x)=2000+5x$ فإن التكلفة المتوسطة $\\frac{2000+5x}{x}$ تقترب من 5: تتوزع التكاليف الثابتة على وحدات كثيرة. والسكان الذين لهم سقف يستقرون عند النهاية.',
            'In economics and biology models, what matters is what happens in the long run. If the total cost of making $x$ units is $C(x)=2000+5x$, the average cost $\\frac{2000+5x}{x}$ approaches 5: the fixed costs are shared among many units. A population with a ceiling levels off at the limit.'
        ),
        examplePrompt: say('Aurrezki bat $A(t)=\\frac{1200t+900}{t+3}$ euroraino hazten da. Zein baliotara hurbiltzen da?', 'Unos ahorros crecen según $A(t)=\\frac{1200t+900}{t+3}$ euros. ¿A qué valor se acercan?', 'تنمو مدخرات وفق $A(t)=\\frac{1200t+900}{t+3}$ يورو. من أي قيمة تقترب؟', 'Some savings grow as $A(t)=\\frac{1200t+900}{t+3}$ euros. What value do they approach?'),
        example: same('$\\lim_{t\\to+\\infty}A(t)=\\frac{1200}{1}=1200$'),
        exampleAnswer: say('1200 eurora hurbiltzen dira, baina ez dira inoiz iristen.', 'Se acercan a 1200 €, pero nunca llegan.', 'تقترب من 1200 € لكنها لا تبلغها أبدًا.', 'They approach €1,200, but never reach it.')
    },

    /* ---------- 3. Limits at a point ---------- */
    'one-sided': {
        definitions: [
            { term: say('Alboko limitea', 'Límite lateral', 'النهاية الجانبية', 'One-sided limit'), meaning: say('$\\lim_{x\\to a^-}$: $a$ baliora ezkerretik hurbilduz; $\\lim_{x\\to a^+}$: eskuinetik.', '$\\lim_{x\\to a^-}$: acercándose a $a$ por la izquierda; $\\lim_{x\\to a^+}$: por la derecha.', '$\\lim_{x\\to a^-}$: بالاقتراب من $a$ من اليسار؛ $\\lim_{x\\to a^+}$: من اليمين.', '$\\lim_{x\\to a^-}$: approaching $a$ from the left; $\\lim_{x\\to a^+}$: from the right.') }
        ],
        vocabulary: [
            say('ezkerra', 'izquierda', 'اليسار', 'left'),
            say('eskuina', 'derecha', 'اليمين', 'right'),
            say('zatia', 'trozo', 'الجزء', 'piece')
        ],
        explanation: say(
            '$a$ baliora ezkerretik hurbiltzeko, $a-0{,}1$ edo $a-0{,}01$ bezalako balioak erabiltzen dira, eta $x\\to a^-$ idazten da. Eskuinetik, $x\\to a^+$. Zatika definitutako funtzio batean, alde bakoitzak bere zatia erabiltzen du. Bi alboko limiteek balio bera badute, hori da limitea; bestela, jauzi bat dago, eta ez dago limiterik.',
            'Para acercarse a $a$ por la izquierda se usan valores como $a-0{,}1$ o $a-0{,}01$, y se escribe $x\\to a^-$. Por la derecha, $x\\to a^+$. En una función a trozos, cada lado usa su trozo. Si los dos límites laterales valen lo mismo, ese es el límite; si no, hay un salto y el límite no existe.',
            'للاقتراب من $a$ من اليسار نستعمل قيمًا مثل $a-0{,}1$ أو $a-0{,}01$ ونكتب $x\\to a^-$. ومن اليمين $x\\to a^+$. في الدالة المعرّفة على أجزاء يستعمل كل جانب جزأه. إذا تساوت النهايتان الجانبيتان فتلك هي النهاية، وإلا فهناك قفزة ولا توجد نهاية.',
            'To approach $a$ from the left you use values such as $a-0{,}1$ or $a-0{,}01$, and you write $x\\to a^-$. From the right, $x\\to a^+$. In a piecewise function, each side uses its piece. If the two one-sided limits are equal, that is the limit; if not, there is a jump and the limit does not exist.'
        ),
        examplePrompt: say('Telefono-tarifa bat $T(x)=\\begin{cases}0{,}2x & x<30\\\\ 6+0{,}1(x-30) & x\\ge 30\\end{cases}$ eurokoa da, $x$ minututan. Badago $\\lim_{x\\to 30}T(x)$?', 'Una tarifa telefónica es $T(x)=\\begin{cases}0{,}2x & x<30\\\\ 6+0{,}1(x-30) & x\\ge 30\\end{cases}$ euros por $x$ minutos. ¿Existe $\\lim_{x\\to 30}T(x)$?', 'تعرفة هاتفية هي $T(x)=\\begin{cases}0{,}2x & x<30\\\\ 6+0{,}1(x-30) & x\\ge 30\\end{cases}$ يورو مقابل $x$ دقيقة. هل توجد $\\lim_{x\\to 30}T(x)$؟', 'A phone tariff is $T(x)=\\begin{cases}0{,}2x & x<30\\\\ 6+0{,}1(x-30) & x\\ge 30\\end{cases}$ euros for $x$ minutes. Does $\\lim_{x\\to 30}T(x)$ exist?'),
        example: same('$\\lim_{x\\to 30^-}0{,}2x=6\\qquad\\lim_{x\\to 30^+}(6+0{,}1(x-30))=6$'),
        exampleAnswer: say('Bai: bi alboko limiteak 6 dira; beraz, limitea 6 € da.', 'Sí: los dos laterales valen 6, así que el límite es 6 €.', 'نعم: النهايتان الجانبيتان تساويان 6، إذن النهاية 6 €.', 'Yes: both one-sided limits are 6, so the limit is €6.')
    },
    infinite: {
        definitions: [
            { term: say('Limite infinitua', 'Límite infinito', 'النهاية اللانهائية', 'Infinite limit'), meaning: say('$\\lim_{x\\to a}f(x)=+\\infty$: $f(x)$ gelditu gabe hazten da $x$ aldagaia $a$ baliora hurbiltzean.', '$\\lim_{x\\to a}f(x)=+\\infty$: $f(x)$ crece sin parar al acercarse $x$ a $a$.', '$\\lim_{x\\to a}f(x)=+\\infty$: تتزايد $f(x)$ بلا توقف عند اقتراب $x$ من $a$.', '$\\lim_{x\\to a}f(x)=+\\infty$: $f(x)$ grows without stopping as $x$ approaches $a$.') }
        ],
        vocabulary: [
            say('zeinua', 'signo', 'الإشارة', 'sign'),
            say('infinitua', 'infinito', 'اللانهاية', 'infinity')
        ],
        explanation: say(
            'Ordezkatzean zenbaki bat zati 0 ateratzen bada, adibidez $\\frac{2}{0}$, funtzioa izugarri hazten da. $+\\infty$ ala $-\\infty$ den jakiteko, izendatzailearen zeinua begiratzen da alde bakoitzean: $x=-1{,}01$ denean, $x+1=-0{,}01$ da, eta $\\frac{2}{-0{,}01}=-200$. Bi aldeak bat ez badatoz, ez dago limiterik, baina asintota bertikala bai.',
            'Si al sustituir sale un número entre 0, por ejemplo $\\frac{2}{0}$, la función se dispara. Para saber si va a $+\\infty$ o a $-\\infty$ se mira el signo del denominador a cada lado: con $x=-1{,}01$, $x+1=-0{,}01$ y $\\frac{2}{-0{,}01}=-200$. Si los dos lados no coinciden, no hay límite, pero sí asíntota vertical.',
            'إذا ظهر عند التعويض عدد مقسوم على 0، مثل $\\frac{2}{0}$، تنطلق الدالة بعيدًا. ولمعرفة هل تتجه إلى $+\\infty$ أم إلى $-\\infty$ ننظر إلى إشارة المقام على كل جانب: مع $x=-1{,}01$ يكون $x+1=-0{,}01$ و$\\frac{2}{-0{,}01}=-200$. وإذا لم يتفق الجانبان فلا نهاية، لكن يوجد مقارب رأسي.',
            'If substituting gives a number over 0, for example $\\frac{2}{0}$, the function shoots off. To know whether it goes to $+\\infty$ or $-\\infty$, look at the sign of the denominator on each side: with $x=-1{,}01$, $x+1=-0{,}01$ and $\\frac{2}{-0{,}01}=-200$. If the two sides do not match there is no limit, but there is a vertical asymptote.'
        ),
        examplePrompt: say('Kalkulatu $\\frac{x}{x-4}$ funtzioaren alboko limiteak $x=4$ puntuan.', 'Calcula los límites laterales de $\\frac{x}{x-4}$ en $x=4$.', 'احسب النهايتين الجانبيتين لـ $\\frac{x}{x-4}$ عند $x=4$.', 'Work out the one-sided limits of $\\frac{x}{x-4}$ at $x=4$.'),
        example: same('$\\lim_{x\\to 4^-}\\frac{x}{x-4}=-\\infty\\qquad\\lim_{x\\to 4^+}\\frac{x}{x-4}=+\\infty$'),
        exampleAnswer: say('Ez dago limiterik; $x=4$ asintota bertikala da.', 'No hay límite; $x=4$ es una asíntota vertical.', 'لا توجد نهاية؛ و$x=4$ مقارب رأسي.', 'There is no limit; $x=4$ is a vertical asymptote.')
    },
    'zero-zero': {
        definitions: [
            { term: say('Indeterminazioa', 'Indeterminación', 'عدم التعيين', 'Indeterminate form'), meaning: say('$\\frac{0}{0}$ edo $\\frac{\\infty}{\\infty}$ bezalako adierazpen bat, emaitza esaten ez duena: funtzioa eraldatu behar da.', 'Una expresión como $\\frac{0}{0}$ o $\\frac{\\infty}{\\infty}$ que no dice el resultado: hay que transformar la función.', 'عبارة مثل $\\frac{0}{0}$ أو $\\frac{\\infty}{\\infty}$ لا تحدد النتيجة: يجب تحويل الدالة.', 'An expression such as $\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$ that does not tell the result: the function must be transformed.') }
        ],
        vocabulary: [
            say('faktorizatu', 'factorizar', 'التحليل', 'factorise'),
            say('zuloa', 'agujero', 'الثقب', 'hole')
        ],
        explanation: say(
            '$\\frac{0}{0}$ ateratzeak ez du esan nahi limiterik ez dagoenik. Esan nahi du $a$ zenbakitzailearen eta izendatzailearen erroa dela; beraz, biek dute $(x-a)$ faktorea. Faktorizatu, sinplifikatu eta berriro ordezkatzen da. Funtzioa ez dago $a$ puntuan, baina limitea bai: grafikoak zulo bat du.',
            'Que salga $\\frac{0}{0}$ no quiere decir que no haya límite. Quiere decir que $a$ es raíz del numerador y del denominador, así que los dos tienen el factor $(x-a)$. Se factoriza, se simplifica y se sustituye otra vez. La función no existe en $a$, pero el límite sí: la gráfica tiene un agujero.',
            'ظهور $\\frac{0}{0}$ لا يعني أنه لا توجد نهاية. بل يعني أن $a$ جذر للبسط وللمقام، فلكليهما العامل $(x-a)$. نحلّل ونختصر ثم نعوّض من جديد. الدالة غير معرّفة عند $a$ لكن النهاية موجودة: للرسم ثقب.',
            'Getting $\\frac{0}{0}$ does not mean there is no limit. It means that $a$ is a root of the numerator and of the denominator, so both have the factor $(x-a)$. Factorise, cancel and substitute again. The function does not exist at $a$, but the limit does: the graph has a hole.'
        ),
        examplePrompt: say('Kalkulatu $\\lim_{x\\to -1}\\frac{x^2-1}{x^2+x}$.', 'Calcula $\\lim_{x\\to -1}\\frac{x^2-1}{x^2+x}$.', 'احسب $\\lim_{x\\to -1}\\frac{x^2-1}{x^2+x}$.', 'Work out $\\lim_{x\\to -1}\\frac{x^2-1}{x^2+x}$.'),
        example: same('$\\frac{(x+1)(x-1)}{x(x+1)}=\\frac{x-1}{x}\\ \\to\\ \\frac{-2}{-1}=2$'),
        exampleAnswer: say('Limitea 2 da.', 'El límite es 2.', 'النهاية 2.', 'The limit is 2.')
    },

    /* ---------- 4. Continuity ---------- */
    continuous: {
        definitions: [
            { term: say('Jarraitua puntu batean', 'Continua en un punto', 'متصلة عند نقطة', 'Continuous at a point'), meaning: same('$\\lim_{x\\to a}f(x)=f(a)$') }
        ],
        vocabulary: [
            say('jarraitua', 'continua', 'متصلة', 'continuous'),
            say('arkatza', 'lápiz', 'القلم', 'pencil')
        ],
        explanation: say(
            'Funtzio bat jarraitua da $a$ puntuan, haren grafikoa $a$ puntutik jauzirik eta zulorik gabe pasatzen bada, arkatza altxatu gabe. Hiru gauza egiaztatu behar dira: $f(a)$ badagoela, limitea badagoela (alboko limiteak bat datoz) eta biek balio bera dutela. Polinomioak, esponentzialak eta izendatzailea 0 ez den zatidurak jarraituak dira.',
            'Una función es continua en $a$ si su gráfica pasa por $a$ sin saltos ni agujeros, sin levantar el lápiz. Hay que comprobar tres cosas: que $f(a)$ exista, que exista el límite (los laterales coinciden) y que valgan lo mismo. Los polinomios, las exponenciales y los cocientes donde el denominador no es 0 son continuos.',
            'تكون الدالة متصلة عند $a$ إذا مرّ رسمها بـ $a$ دون قفزات ولا ثقوب، دون رفع القلم. يجب التحقق من ثلاثة أمور: أن توجد $f(a)$، وأن توجد النهاية (تتساوى النهايتان الجانبيتان)، وأن تتساويا. الحدوديات والأسيات وخوارج القسمة حيث لا ينعدم المقام متصلة.',
            'A function is continuous at $a$ if its graph passes through $a$ with no jumps or holes, without lifting the pencil. Three things must be checked: that $f(a)$ exists, that the limit exists (the one-sided limits match) and that they are equal. Polynomials, exponentials and quotients where the denominator is not 0 are continuous.'
        ),
        examplePrompt: say('Jarraitua al da $x=0$ puntuan $g(x)=\\begin{cases}2^x & x<0\\\\ x+2 & x\\ge 0\\end{cases}$ funtzioa?', '¿Es continua en $x=0$ la función $g(x)=\\begin{cases}2^x & x<0\\\\ x+2 & x\\ge 0\\end{cases}$?', 'عند $x=0$، هل الدالة $g(x)=\\begin{cases}2^x & x<0\\\\ x+2 & x\\ge 0\\end{cases}$ متصلة؟', 'At $x=0$, is the function $g(x)=\\begin{cases}2^x & x<0\\\\ x+2 & x\\ge 0\\end{cases}$ continuous?'),
        example: same('$\\lim_{x\\to 0^-}2^x=1\\qquad g(0)=0+2=2$'),
        exampleAnswer: say('Ez: ezkerretik 1 baliora doa, eta $g(0)=2$; jauzi bat dago.', 'No: por la izquierda va a 1 y $g(0)=2$; hay un salto.', 'لا: من اليسار تتجه إلى 1 و$g(0)=2$؛ توجد قفزة.', 'No: from the left it goes to 1 and $g(0)=2$; there is a jump.')
    },
    discontinuities: {
        definitions: [
            { term: say('Etenune gaindigarria', 'Discontinuidad evitable', 'الانقطاع القابل للإزالة', 'Removable discontinuity'), meaning: say('Zulo bat edo lekualdatutako puntu bat: $f(a)$ balioari limitearen balioa emanez konpontzen da.', 'Un agujero o un punto desplazado: se arregla dando a $f(a)$ el valor del límite.', 'ثقب أو نقطة منزاحة: يُصلَح بإعطاء $f(a)$ قيمة النهاية.', 'A hole or a displaced point: it is fixed by giving $f(a)$ the value of the limit.') }
        ],
        vocabulary: [
            say('gaindigarria', 'evitable', 'قابل للإزالة', 'removable'),
            say('jauzia', 'salto', 'القفزة', 'jump')
        ],
        explanation: say(
            'Funtzio bat jarraitua ez bada $a$ puntuan, zer huts egiten duen begiratzen da. Limitea badago, etenunea gaindigarria da: nahikoa da $f(a)$ ondo definitzea. Alboko limiteak badaude baina desberdinak badira, jauzi finitu bat dago; jauziaren tamaina haien kendura da. Alboko limiteren bat infinitua bada, jauzia infinitua da, eta asintota bertikal bat dago.',
            'Si una función no es continua en $a$, se mira qué falla. Si el límite existe, la discontinuidad es evitable: basta con definir bien $f(a)$. Si los laterales existen pero son distintos, hay un salto finito; el tamaño del salto es su diferencia. Si algún lateral es infinito, el salto es infinito y hay una asíntota vertical.',
            'إذا لم تكن الدالة متصلة عند $a$ ننظر فيما يختل. إذا وُجدت النهاية فالانقطاع قابل للإزالة: يكفي تعريف $f(a)$ تعريفًا صحيحًا. وإذا وُجدت النهايتان الجانبيتان واختلفتا فهناك قفزة منتهية، وحجم القفزة هو الفرق بينهما. وإذا كانت إحدى النهايتين الجانبيتين لانهائية فالقفزة لانهائية ويوجد مقارب رأسي.',
            'If a function is not continuous at $a$, look at what fails. If the limit exists, the discontinuity is removable: it is enough to define $f(a)$ properly. If the one-sided limits exist but are different, there is a finite jump; the size of the jump is their difference. If a one-sided limit is infinite, the jump is infinite and there is a vertical asymptote.'
        ),
        examplePrompt: say('Zer etenune du $f(x)=\\frac{x+5}{x^2+5x}$ funtzioak $x=0$ eta $x=-5$ puntuetan?', '¿Qué discontinuidad tiene $f(x)=\\frac{x+5}{x^2+5x}$ en $x=0$ y en $x=-5$?', 'ما نوع انقطاع $f(x)=\\frac{x+5}{x^2+5x}$ عند $x=0$ وعند $x=-5$؟', 'What discontinuity does $f(x)=\\frac{x+5}{x^2+5x}$ have at $x=0$ and at $x=-5$?'),
        example: same('$\\frac{x+5}{x(x+5)}=\\frac{1}{x}$'),
        exampleAnswer: say('$x=0$ puntuan, jauzi infinitua; $x=-5$ puntuan, gaindigarria, limitea $-\\frac{1}{5}$ delako.', 'En $x=0$, salto infinito; en $x=-5$, evitable, porque el límite es $-\\frac{1}{5}$.', 'عند $x=0$ قفزة لانهائية، وعند $x=-5$ انقطاع قابل للإزالة لأن النهاية $-\\frac{1}{5}$.', 'At $x=0$, an infinite jump; at $x=-5$, removable, because the limit is $-\\frac{1}{5}$.')
    },
    parameter: {
        definitions: [
            { term: say('Parametroa', 'Parámetro', 'الوسيط', 'Parameter'), meaning: say('Letra bat, $k$ bezala, aurkitu behar den zenbaki finko bat balio duena.', 'Una letra, como $k$, que vale un número fijo que hay que hallar.', 'حرف مثل $k$ يساوي عددًا ثابتًا يجب إيجاده.', 'A letter, such as $k$, that stands for a fixed number you have to find.') }
        ],
        vocabulary: [
            say('lotura-puntua', 'punto de unión', 'نقطة الوصل', 'joining point'),
            say('tarifa', 'tarifa', 'التعرفة', 'tariff')
        ],
        explanation: say(
            'Tarifa askok prezioa aldatzen dute kopuru jakin batetik aurrera. Zati berria aurrekoa amaitzen den lekuan hasten bada, prezioak ez du jauzirik egiten. Hori lortzeko, lotura-puntuko bi alboko limiteak kalkulatzen dira, parametroa barruan dutela, eta berdindu egiten dira. Horrela, lehen mailako ekuazio bat ateratzen da.',
            'Muchas tarifas cambian de precio a partir de cierta cantidad. Si el trozo nuevo empieza donde acaba el anterior, el precio no salta. Para conseguirlo se calculan los dos límites laterales en el punto de unión, con el parámetro dentro, y se igualan. Así sale una ecuación de primer grado.',
            'كثير من التعرفات تغيّر السعر ابتداءً من كمية معينة. إذا بدأ الجزء الجديد حيث ينتهي السابق فلا يقفز السعر. ولتحقيق ذلك نحسب النهايتين الجانبيتين عند نقطة الوصل والوسيط فيهما، ثم نساويهما. فتنتج معادلة من الدرجة الأولى.',
            'Many tariffs change their price from a certain amount on. If the new piece starts where the previous one ends, the price does not jump. To get that, work out the two one-sided limits at the joining point, with the parameter inside, and set them equal. That gives a linear equation.'
        ),
        examplePrompt: say('Aurkitu $m$, $f(x)=\\begin{cases}x^2+m & x<1\\\\ 4x-1 & x\\ge 1\\end{cases}$ jarraitua izan dadin.', 'Halla $m$ para que $f(x)=\\begin{cases}x^2+m & x<1\\\\ 4x-1 & x\\ge 1\\end{cases}$ sea continua.', 'أوجد $m$ لتكون $f(x)=\\begin{cases}x^2+m & x<1\\\\ 4x-1 & x\\ge 1\\end{cases}$ متصلة.', 'Find $m$ so that $f(x)=\\begin{cases}x^2+m & x<1\\\\ 4x-1 & x\\ge 1\\end{cases}$ is continuous.'),
        example: same('$1+m=4-1\\ \\to\\ m=2$'),
        exampleAnswer: say('$m=2$ denean, zatiak $(1,3)$ puntuan lotzen dira.', 'Con $m=2$ los trozos se unen en $(1,3)$.', 'مع $m=2$ يلتقي الجزآن عند $(1,3)$.', 'With $m=2$ the pieces join at $(1,3)$.')
    },

    /* ---------- 5. Asymptotes and branches ---------- */
    'vertical-horizontal': {
        definitions: [
            { term: say('Asintota', 'Asíntota', 'المقارب', 'Asymptote'), meaning: say('Adar infinitu batean kurba gero eta gehiago hurbiltzen den zuzena.', 'Una recta a la que la curva se acerca cada vez más en una rama infinita.', 'مستقيم يقترب منه المنحنى أكثر فأكثر في فرع لانهائي.', 'A line that the curve gets closer and closer to along an infinite branch.') }
        ],
        vocabulary: [
            say('posizioa', 'posición', 'الموضع', 'position'),
            say('gainetik', 'encima', 'فوق', 'above'),
            say('azpitik', 'debajo', 'تحت', 'below')
        ],
        explanation: say(
            'Zatidura baten asintota bertikalak izendatzailearen erroetan daude, zenbakitzailea anulatzen ez badute. Horizontala $+\\infty$ edo $-\\infty$ aldeko limitea da, zenbaki bat bada. Posizioa jakiteko, $f(x)-L$ adierazpenaren zeinua aztertzen da, $x$ handia denean: positiboa bada, kurba gainetik doa; negatiboa bada, azpitik.',
            'Las asíntotas verticales de un cociente están en las raíces del denominador que no anulan el numerador. La horizontal es el límite en $+\\infty$ o $-\\infty$, si es un número. Para la posición se estudia el signo de $f(x)-L$ con $x$ grande: si es positivo, la curva va por encima; si es negativo, por debajo.',
            'المقاربات الرأسية لخارج القسمة توجد عند جذور المقام التي لا تُعدم البسط. والأفقي هو النهاية عند $+\\infty$ أو $-\\infty$ إذا كانت عددًا. ولمعرفة الموضع ندرس إشارة $f(x)-L$ مع $x$ كبير: إذا كانت موجبة فالمنحنى فوق، وإذا كانت سالبة فهو تحت.',
            'The vertical asymptotes of a quotient are at the roots of the denominator that do not cancel the numerator. The horizontal one is the limit at $+\\infty$ or $-\\infty$, if it is a number. For the position, study the sign of $f(x)-L$ with $x$ big: if it is positive, the curve is above; if it is negative, below.'
        ),
        examplePrompt: say('Aurkitu $g(x)=\\frac{6}{x^2-4}$ funtzioaren asintotak.', 'Halla las asíntotas de $g(x)=\\frac{6}{x^2-4}$.', 'أوجد مقاربات $g(x)=\\frac{6}{x^2-4}$.', 'Find the asymptotes of $g(x)=\\frac{6}{x^2-4}$.'),
        example: same('$x^2-4=0\\ \\to\\ x=\\pm 2\\qquad\\frac{6}{x^2-4}\\ \\to\\ 0$'),
        exampleAnswer: say('Bertikalak, $x=2$ eta $x=-2$; horizontala, $y=0$.', 'Verticales $x=2$ y $x=-2$; horizontal $y=0$.', 'الرأسيان $x=2$ و$x=-2$؛ والأفقي $y=0$.', 'Vertical $x=2$ and $x=-2$; horizontal $y=0$.')
    },
    oblique: {
        definitions: [
            { term: say('Asintota zeiharra', 'Asíntota oblicua', 'المقارب المائل', 'Oblique asymptote'), meaning: say('$y=mx+n$ zuzen bat, $m\\neq 0$ izanik, kurba infinituan hurbiltzen zaiona.', 'Una recta $y=mx+n$ con $m\\neq 0$ a la que se acerca la curva en el infinito.', 'مستقيم $y=mx+n$ مع $m\\neq 0$ يقترب منه المنحنى عند اللانهاية.', 'A line $y=mx+n$ with $m\\neq 0$ that the curve approaches at infinity.') }
        ],
        vocabulary: [
            say('zatiketa', 'división', 'القسمة', 'division'),
            say('zatidura', 'cociente', 'خارج القسمة', 'quotient'),
            say('hondarra', 'resto', 'الباقي', 'remainder')
        ],
        explanation: say(
            'Goian maila bat gehiago dagoenean, infinituko limitea $\\pm\\infty$ da, eta ez dago asintota horizontalik. Baina kurba zuzen inklinatu batera hurbil daiteke. Zenbakitzailea izendatzaileaz zatitzen da: $f(x)=mx+n+\\frac{r}{d(x)}$, eta azken zatikia 0 baliora doa. Zatiki horren zeinuak esaten du kurba gainetik ala azpitik doan.',
            'Cuando arriba hay un grado más, el límite en el infinito es $\\pm\\infty$ y no hay asíntota horizontal. Pero la curva puede acercarse a una recta inclinada. Se divide el numerador entre el denominador: $f(x)=mx+n+\\frac{r}{d(x)}$, y la fracción final tiende a 0. El signo de esa fracción dice si la curva va por encima o por debajo.',
            'عندما تزيد درجة البسط بواحد تكون النهاية عند اللانهاية $\\pm\\infty$ ولا يوجد مقارب أفقي. لكن المنحنى قد يقترب من مستقيم مائل. نقسم البسط على المقام: $f(x)=mx+n+\\frac{r}{d(x)}$، والكسر الأخير يتجه إلى 0. وإشارة هذا الكسر تقول هل المنحنى فوق أم تحت.',
            'When the top has one degree more, the limit at infinity is $\\pm\\infty$ and there is no horizontal asymptote. But the curve can approach a slanted line. Divide the numerator by the denominator: $f(x)=mx+n+\\frac{r}{d(x)}$, and the final fraction tends to 0. The sign of that fraction tells whether the curve is above or below.'
        ),
        examplePrompt: say('Aurkitu $g(x)=\\frac{2x^2+3}{x}$ funtzioaren asintota zeiharra.', 'Halla la asíntota oblicua de $g(x)=\\frac{2x^2+3}{x}$.', 'أوجد المقارب المائل لـ $g(x)=\\frac{2x^2+3}{x}$.', 'Find the oblique asymptote of $g(x)=\\frac{2x^2+3}{x}$.'),
        example: same('$\\frac{2x^2+3}{x}=2x+\\frac{3}{x}$'),
        exampleAnswer: say('Asintota zeiharra $y=2x$ da; gainera, $x=0$ bertikala da.', 'La asíntota oblicua es $y=2x$; además, $x=0$ es vertical.', 'المقارب المائل $y=2x$؛ و$x=0$ مقارب رأسي أيضًا.', 'The oblique asymptote is $y=2x$; also, $x=0$ is vertical.')
    },
    branches: {
        definitions: [
            { term: say('Adar parabolikoa', 'Rama parabólica', 'الفرع المكافئ', 'Parabolic branch'), meaning: say('Adar bat, non $f(x)\\to\\pm\\infty$ den $x\\to\\pm\\infty$ denean, inongo zuzenera hurbildu gabe.', 'Una rama en la que $f(x)\\to\\pm\\infty$ cuando $x\\to\\pm\\infty$, sin acercarse a ninguna recta.', 'فرع تكون فيه $f(x)\\to\\pm\\infty$ عندما $x\\to\\pm\\infty$ دون الاقتراب من أي مستقيم.', 'A branch where $f(x)\\to\\pm\\infty$ as $x\\to\\pm\\infty$, without approaching any line.') }
        ],
        vocabulary: [
            say('adarra', 'rama', 'الفرع', 'branch'),
            say('parabolikoa', 'parabólica', 'مكافئ', 'parabolic')
        ],
        explanation: say(
            'Adar infinitua urrutira doa, asintotarekin edo gabe. Zatitzean 2 mailako edo handiagoko polinomio bat geratzen bada, kurba polinomio horren antzekoa da, ez zuzen batena: adar parabolikoa da. $a>1$ duten esponentzialek ere adar parabolikoa dute eskuinean, eta $y=0$ asintota ezkerrean.',
            'Una rama infinita se va lejos, con asíntota o sin ella. Si al dividir queda un polinomio de grado 2 o más, la curva se parece a ese polinomio y no a una recta: es una rama parabólica. Las exponenciales con $a>1$ también tienen una rama parabólica a la derecha y la asíntota $y=0$ a la izquierda.',
            'الفرع اللانهائي يذهب بعيدًا، بمقارب أو دونه. إذا بقيت بعد القسمة حدودية من الدرجة 2 أو أكثر فالمنحنى يشبه تلك الحدودية لا مستقيمًا: إنه فرع مكافئ. والأسيات مع $a>1$ لها أيضًا فرع مكافئ إلى اليمين والمقارب $y=0$ إلى اليسار.',
            'An infinite branch goes far away, with an asymptote or without one. If dividing leaves a polynomial of degree 2 or more, the curve looks like that polynomial and not like a line: it is a parabolic branch. Exponentials with $a>1$ also have a parabolic branch on the right and the asymptote $y=0$ on the left.'
        ),
        examplePrompt: say('Zer adar infinitu ditu $g(x)=3^x$ funtzioak?', '¿Qué ramas infinitas tiene $g(x)=3^x$?', 'ما الفروع اللانهائية لـ $g(x)=3^x$؟', 'What infinite branches does $g(x)=3^x$ have?'),
        example: same('$\\lim_{x\\to+\\infty}3^x=+\\infty\\qquad\\lim_{x\\to-\\infty}3^x=0$'),
        exampleAnswer: say('Eskuinean, adar parabolikoa; ezkerrean, $y=0$ asintota horizontala.', 'A la derecha, rama parabólica; a la izquierda, asíntota horizontal $y=0$.', 'إلى اليمين فرع مكافئ، وإلى اليسار مقارب أفقي $y=0$.', 'On the right, a parabolic branch; on the left, the horizontal asymptote $y=0$.')
    }
}
