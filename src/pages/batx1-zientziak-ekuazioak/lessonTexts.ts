import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { BachEquationsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Ekuazioak eta inekuazioak · Batxilergoa 1 · Zientziak — what each lesson
   tells: the new words (definitions), a short explanation, the example as
   an exercise («Another example»), the key words in four languages and, in
   four lessons, «Why does it work?». Plain data so the tests can import
   it; lessons.tsx merges it into the topics. The example uses numbers of
   its own, never those of «Let's solve», of «Check it» or of the typical
   mistake. False solutions are never written as x = …: the test checks
   that every x = … of an example solves its equation. Tests in
   tests/lesson-texts.test.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const bachEquationsLessonTexts: Record<BachEquationsTopicId, LessonTexts> = {
    /* ---------- 1. Polynomials ---------- */
    'ruffini-roots': {
        definitions: [
            { term: say('Erroa', 'Raíz', 'الجذر', 'Root'), meaning: say('$a$ zenbaki bat, $P(a)=0$ betetzen duena.', 'Un número $a$ que cumple $P(a)=0$.', 'العدد $a$ الذي يحقق $P(a)=0$.', 'A number $a$ with $P(a)=0$.') }
        ],
        vocabulary: [
            say('gai askea', 'término independiente', 'الحد الثابت', 'constant term'),
            say('zatitzailea', 'divisor', 'القواسم', 'divisor')
        ],
        explanation: say(
            'Koefiziente osoko polinomio batek $a$ erro osoa badu, $a$ zenbakiak gai askea zatitzen du. Horregatik, zatitzaile horiek Ruffinirekin probatzen dira: hondarra 0 denean, $P(x)=(x-a)\\cdot C(x)$, eta $C(x)$ zatidurarekin jarraitzen da, maila bat gutxiago duena. $n$ mailako polinomio batek gehienez $n$ erro ditu.',
            'Si un polinomio con coeficientes enteros tiene una raíz entera $a$, entonces $a$ divide al término independiente. Por eso se prueban esos divisores con Ruffini: cuando el resto es 0, $P(x)=(x-a)\\cdot C(x)$ y se sigue con el cociente $C(x)$, que tiene un grado menos. Un polinomio de grado $n$ tiene como mucho $n$ raíces.',
            'إذا كان لحدودية معاملاتها صحيحة جذر صحيح $a$ فإن $a$ يقسم الحد الثابت. لذلك نجرب هذه القواسم بروفيني: عندما يكون الباقي 0 يكون $P(x)=(x-a)\\cdot C(x)$ ونتابع مع خارج القسمة $C(x)$ الذي تنقص درجته واحدًا. وللحدودية من الدرجة $n$ على الأكثر $n$ جذرًا.',
            'If a polynomial with integer coefficients has an integer root $a$, then $a$ divides the constant term. That is why those divisors are tried with Ruffini: when the remainder is 0, $P(x)=(x-a)\\cdot C(x)$ and you carry on with the quotient $C(x)$, one degree lower. A polynomial of degree $n$ has at most $n$ roots.'
        ),
        examplePrompt: say('Aurkitu $x^3+4x^2+x-6$ polinomioaren erro osoak.', 'Halla las raíces enteras de $x^3+4x^2+x-6$.', 'أوجد الجذور الصحيحة للحدودية $x^3+4x^2+x-6$.', 'Find the integer roots of $x^3+4x^2+x-6$.'),
        example: same('$\\begin{gathered}x^3+4x^2+x-6\\\\ =(x-1)(x+2)(x+3)\\end{gathered}$'),
        exampleAnswer: say('$x=1$, $x=-2$ eta $x=-3$.', '$x=1$, $x=-2$ y $x=-3$.', '$x=1$ و$x=-2$ و$x=-3$.', '$x=1$, $x=-2$ and $x=-3$.'),
        why: {
            text: say(
                'Zergatik zatitzen du erro oso batek gai askea? $a$ zenbakia $x^3-2x^2-5x+6$ polinomioaren erroa bada, $a^3-2a^2-5a=-6$ da, hau da, $a\\cdot(a^2-2a-5)=-6$. Parentesia zenbaki osoa da; beraz, $a$ zenbakia 6 zenbakiaren zatitzailea da.',
                '¿Por qué una raíz entera divide al término independiente? Si $a$ es raíz de $x^3-2x^2-5x+6$, entonces $a^3-2a^2-5a=-6$, es decir, $a\\cdot(a^2-2a-5)=-6$. El paréntesis es un número entero, así que $a$ es un divisor de 6.',
                'لماذا يقسم الجذر الصحيح الحد الثابت؟ إذا كان $a$ جذرًا للحدودية $x^3-2x^2-5x+6$ فإن $a^3-2a^2-5a=-6$، أي $a\\cdot(a^2-2a-5)=-6$. وما بين القوسين عدد صحيح، إذن $a$ قاسم للعدد 6.',
                'Why does an integer root divide the constant term? If $a$ is a root of $x^3-2x^2-5x+6$, then $a^3-2a^2-5a=-6$, that is, $a\\cdot(a^2-2a-5)=-6$. The bracket is a whole number, so $a$ is a divisor of 6.'
            ),
            math: same('$3\\cdot(3^2-2\\cdot 3-5)=-6$')
        }
    },
    'factorize-high': {
        definitions: [
            { term: say('Polinomio laburtezina', 'Polinomio irreducible', 'حدودية غير قابلة للتحليل', 'Irreducible polynomial'), meaning: say('Maila txikiagoko faktoreetan deskonposatu ezin den polinomioa; adibidez, $x^2+1$.', 'Un polinomio que no se puede descomponer en factores de menor grado; por ejemplo, $x^2+1$.', 'حدودية لا يمكن تحليلها إلى عوامل من درجة أصغر، مثل $x^2+1$.', 'A polynomial that cannot be broken into factors of lower degree; for example, $x^2+1$.') }
        ],
        vocabulary: [
            say('faktore komuna', 'factor común', 'العامل المشترك', 'common factor'),
            say('diskriminatzailea', 'discriminante', 'المميز', 'discriminant')
        ],
        explanation: say(
            'Maila handiko polinomio bat faktorizatzeko, ordena bat dago: lehenik, faktore komuna ateratzen da, gai guztiek $x$ badute; gero, erroak bilatzen dira Ruffinirekin; eta azken bigarren mailako faktorea formularekin ebazten da. Diskriminatzailea negatiboa bada, $x^2+1$ polinomioarena bezala, laburtezina da eta ez da gehiago deskonposatzen.',
            'Para factorizar un polinomio de grado alto se sigue un orden: primero se saca factor común si todos los términos llevan $x$; después se buscan raíces con Ruffini; y el último factor de grado 2 se resuelve con la fórmula. Si su discriminante es negativo, como el de $x^2+1$, es irreducible y no se descompone más.',
            'لتحليل حدودية من درجة عالية نتبع ترتيبًا: أولًا نُخرج العامل المشترك إذا كان في كل الحدود $x$، ثم نبحث عن الجذور بروفيني، ونحل آخر عامل من الدرجة الثانية بالصيغة. وإذا كان مميزه سالبًا، مثل مميز $x^2+1$، فهو غير قابل للتحليل ولا يتحلل أكثر.',
            'To factorise a high-degree polynomial, follow an order: first take out a common factor if every term has $x$; then look for roots with Ruffini; and solve the last degree-2 factor with the formula. If its discriminant is negative, as with $x^2+1$, it is irreducible and does not break down any further.'
        ),
        examplePrompt: say('Faktorizatu $x^5-x^4+x^3-x^2$.', 'Factoriza $x^5-x^4+x^3-x^2$.', 'حلّل $x^5-x^4+x^3-x^2$.', 'Factorise $x^5-x^4+x^3-x^2$.'),
        example: same('$x^5-x^4+x^3-x^2=x^2(x-1)(x^2+1)$'),
        exampleAnswer: say('$x^2(x-1)(x^2+1)$; $x^2+1$ polinomioak ez du erro errealik.', '$x^2(x-1)(x^2+1)$; $x^2+1$ no tiene raíces reales.', '$x^2(x-1)(x^2+1)$؛ ليس لـ $x^2+1$ جذور حقيقية.', '$x^2(x-1)(x^2+1)$; $x^2+1$ has no real roots.')
    },
    'algebraic-fractions': {
        definitions: [
            { term: say('Debekatutako balioa', 'Valor prohibido', 'القيمة الممنوعة', 'Excluded value'), meaning: say('Izendatzailea anulatzen duen $x$ balio bat: han zatikia ez dago.', 'Un valor de $x$ que anula el denominador: ahí la fracción no existe.', 'قيمة لـ $x$ تعدم المقام: عندها لا يوجد الكسر.', 'A value of $x$ that makes the denominator zero: there the fraction does not exist.') }
        ],
        vocabulary: [
            say('izendatzailea', 'denominador', 'المقام', 'denominator'),
            say('sinplifikatu', 'simplificar', 'بسّط', 'simplify')
        ],
        explanation: say(
            'Zatiki aljebraiko bat sinplifikatzeko, zenbakitzailea eta izendatzailea faktorizatzen dira, eta faktore komunak ezabatzen dira. Batu edo kentzeko, izendatzaile komunera eramaten dira izendatzaileen m.k.t.-arekin, zenbakiekin bezala. Izendatzaileren bat anulatzen duten balioak kanpoan geratzen dira: $\\frac{1}{x-2}$ zatikian, $x=2$ balioa.',
            'Una fracción algebraica se simplifica factorizando el numerador y el denominador y eliminando los factores comunes. Para sumar o restar, se reducen a común denominador con el m.c.m. de los denominadores, como con los números. Los valores que anulan algún denominador quedan fuera: en $\\frac{1}{x-2}$, el valor $x=2$.',
            'نبسّط الكسر الجبري بتحليل البسط والمقام وحذف العوامل المشتركة. وللجمع أو الطرح نوحّد المقامات بالمضاعف المشترك الأصغر للمقامات، كما مع الأعداد. والقيم التي تعدم أحد المقامات تبقى خارجًا: في $\\frac{1}{x-2}$ القيمة $x=2$.',
            'An algebraic fraction is simplified by factorising the numerator and the denominator and cancelling the common factors. To add or subtract, bring them to a common denominator with the LCM of the denominators, as with numbers. The values that make a denominator zero are left out: in $\\frac{1}{x-2}$, the value $x=2$.'
        ),
        examplePrompt: say('Kalkulatu $\\frac{2}{x}+\\frac{3}{x+1}$.', 'Calcula $\\frac{2}{x}+\\frac{3}{x+1}$.', 'احسب $\\frac{2}{x}+\\frac{3}{x+1}$.', 'Work out $\\frac{2}{x}+\\frac{3}{x+1}$.'),
        example: same('$\\frac{2(x+1)+3x}{x(x+1)}=\\frac{5x+2}{x(x+1)}$'),
        exampleAnswer: say('$\\frac{5x+2}{x(x+1)}$, $x\\neq 0$ eta $x\\neq -1$ izanda.', '$\\frac{5x+2}{x(x+1)}$, con $x\\neq 0$ y $x\\neq -1$.', '$\\frac{5x+2}{x(x+1)}$ مع $x\\neq 0$ و$x\\neq -1$.', '$\\frac{5x+2}{x(x+1)}$, with $x\\neq 0$ and $x\\neq -1$.')
    },

    /* ---------- 2. Polynomial and rational equations ---------- */
    'high-degree': {
        definitions: [
            { term: say('Erro bikoitza', 'Raíz doble', 'الجذر المضاعف', 'Double root'), meaning: say('Bi faktoretan agertzen den erroa: $(x-1)^2$ adierazpenean, $x=1$ bikoitza da.', 'Una raíz que aparece en dos factores: en $(x-1)^2$, $x=1$ es doble.', 'جذر يظهر في عاملين: في $(x-1)^2$ يكون $x=1$ مضاعفًا.', 'A root that appears in two factors: in $(x-1)^2$, $x=1$ is double.') }
        ],
        vocabulary: [
            say('biderkadura', 'producto', 'الجداء', 'product'),
            say('faktorizatu', 'factorizar', 'حلّل', 'factorise')
        ],
        explanation: say(
            'Hiru mailako edo handiagoko ekuazio polinomiko bat faktorizatuz ebazten da: faktore komuna ateraz, gaiak taldekatuz edo Ruffinirekin. Gero, biderkadura bat 0 da bere faktoreren bat 0 bada bakarrik. $n$ mailako ekuazio batek gehienez $n$ soluzio ditu; erro bikoitz bat bi aldiz kontatzen da.',
            'Una ecuación polinómica de grado tres o más se resuelve factorizando: sacando factor común, agrupando términos o con Ruffini. Después se usa que un producto vale 0 solo si vale 0 alguno de sus factores. Una ecuación de grado $n$ tiene como mucho $n$ soluciones; una raíz doble cuenta dos veces.',
            'تُحل المعادلة الحدودية من الدرجة الثالثة فما فوق بالتحليل: بإخراج عامل مشترك أو بتجميع الحدود أو بروفيني. ثم نستعمل أن الجداء يساوي 0 فقط إذا ساوى 0 أحدُ عوامله. وللمعادلة من الدرجة $n$ على الأكثر $n$ حلًّا، والجذر المضاعف يُعدّ مرتين.',
            'A polynomial equation of degree three or more is solved by factorising: taking out a common factor, grouping terms or with Ruffini. Then you use that a product is 0 only if one of its factors is 0. An equation of degree $n$ has at most $n$ solutions; a double root counts twice.'
        ),
        examplePrompt: say('Ebatzi $x^4-5x^3+6x^2=0$.', 'Resuelve $x^4-5x^3+6x^2=0$.', 'حُلّ $x^4-5x^3+6x^2=0$.', 'Solve $x^4-5x^3+6x^2=0$.'),
        example: same('$x^2(x-2)(x-3)=0$'),
        exampleAnswer: say('$x=0$ (bikoitza), $x=2$ eta $x=3$.', '$x=0$ (doble), $x=2$ y $x=3$.', '$x=0$ (مضاعف) و$x=2$ و$x=3$.', '$x=0$ (double), $x=2$ and $x=3$.')
    },
    'change-variable': {
        definitions: [
            { term: say('Ekuazio bikarratua', 'Ecuación bicuadrada', 'المعادلة الثنائية التربيع', 'Biquadratic equation'), meaning: say('$ax^4+bx^2+c=0$ motako ekuazioa: $t=x^2$ eginda, bigarren mailakoa da.', 'Una ecuación del tipo $ax^4+bx^2+c=0$: con $t=x^2$ pasa a ser de segundo grado.', 'معادلة من النوع $ax^4+bx^2+c=0$: مع $t=x^2$ تصير من الدرجة الثانية.', 'An equation of the form $ax^4+bx^2+c=0$: with $t=x^2$ it becomes second-degree.') }
        ],
        vocabulary: [
            say('aldaketa', 'cambio', 'التغيير', 'change'),
            say('erro kubikoa', 'raíz cúbica', 'الجذر التكعيبي', 'cube root')
        ],
        explanation: say(
            '$ax^4+bx^2+c=0$ edo $ax^6+bx^3+c=0$ ekuazioetan, $t=x^2$ edo $t=x^3$ aldaketak bigarren mailako ekuazio bat ematen du. Gero aldaketa desegiten da: $x^2=t$ ekuazioak bi soluzio ditu $t>0$ bada, eta bat ere ez $t<0$ bada; $x^3=t$ ekuazioak beti bat du, $t$ zenbakiaren erro kubikoa.',
            'En $ax^4+bx^2+c=0$ o en $ax^6+bx^3+c=0$, el cambio $t=x^2$ o $t=x^3$ da una ecuación de segundo grado. Después se deshace el cambio: $x^2=t$ tiene dos soluciones si $t>0$ y ninguna si $t<0$; $x^3=t$ tiene siempre una, la raíz cúbica de $t$.',
            'في $ax^4+bx^2+c=0$ أو $ax^6+bx^3+c=0$ يعطي التغيير $t=x^2$ أو $t=x^3$ معادلة من الدرجة الثانية. ثم نعكس التغيير: للمعادلة $x^2=t$ حلّان إذا كان $t>0$ ولا حل إذا كان $t<0$، وللمعادلة $x^3=t$ حل واحد دائمًا هو الجذر التكعيبي لـ $t$.',
            'In $ax^4+bx^2+c=0$ or $ax^6+bx^3+c=0$, the change $t=x^2$ or $t=x^3$ gives a second-degree equation. Then you undo the change: $x^2=t$ has two solutions if $t>0$ and none if $t<0$; $x^3=t$ always has one, the cube root of $t$.'
        ),
        examplePrompt: say('Ebatzi $x^4-10x^2+9=0$.', 'Resuelve $x^4-10x^2+9=0$.', 'حُلّ $x^4-10x^2+9=0$.', 'Solve $x^4-10x^2+9=0$.'),
        example: same('$t^2-10t+9=0\\ \\to\\ t=1,\\ t=9$'),
        exampleAnswer: same('$x=\\pm 1,\\ x=\\pm 3$'),
        why: {
            text: say(
                'Zergatik ez du $t$ negatibo batek soluziorik ematen $t=x^2$ denean? $x^2$ ez delako inoiz negatiboa: $x^2=-4$ ekuazioak ez du soluzio errealik. Aldiz, $x^3$ negatiboa izan daiteke: $x^3=-8$ ekuazioak $x=-2$ ematen du.',
                '¿Por qué un $t$ negativo no da soluciones con $t=x^2$? Porque $x^2$ nunca es negativo: $x^2=-4$ no tiene solución real. En cambio, $x^3$ sí puede ser negativo: $x^3=-8$ da $x=-2$.',
                'لماذا لا يعطي $t$ السالب حلولًا مع $t=x^2$؟ لأن $x^2$ ليس سالبًا أبدًا: ليس للمعادلة $x^2=-4$ حل حقيقي. أما $x^3$ فيمكن أن يكون سالبًا: تعطي $x^3=-8$ الحل $x=-2$.',
                'Why does a negative $t$ give no solutions with $t=x^2$? Because $x^2$ is never negative: $x^2=-4$ has no real solution. On the other hand, $x^3$ can be negative: $x^3=-8$ gives $x=-2$.'
            ),
            math: same('$(-2)^3=-8$')
        }
    },
    'rational-equations': {
        definitions: [
            { term: say('Soluzio faltsua', 'Solución falsa', 'الحل الزائف', 'False solution'), meaning: say('Ebaztean ateratzen den baina hasierako ekuazioa betetzen ez duen balioa.', 'Un valor que sale al resolver pero no cumple la ecuación de partida.', 'قيمة تظهر أثناء الحل لكنها لا تحقق المعادلة الأصلية.', 'A value that comes out while solving but does not satisfy the starting equation.') }
        ],
        vocabulary: [
            say('m.k.t.', 'm.c.m.', 'المضاعف المشترك الأصغر', 'LCM'),
            say('baztertu', 'descartar', 'استبعاد', 'discard')
        ],
        explanation: say(
            'Izendatzaileak kentzeko, ekuazio osoa bere m.k.t.-az biderkatzen da. Geratzen den ekuazioak hasierako ekuazioaren izendatzaileren bat anulatzen duten soluzioak izan ditzake: faltsuak dira, eta baztertzen dira. Horregatik, amaitzean, soluzio bakoitza hasierako ekuazioan egiaztatzen da.',
            'Para quitar los denominadores se multiplica toda la ecuación por su m.c.m. La ecuación que queda puede tener soluciones que anulan algún denominador de la ecuación de partida: esas son falsas y se descartan. Por eso, al terminar, se comprueba cada solución en la ecuación original.',
            'لإزالة المقامات نضرب المعادلة كلها في المضاعف المشترك الأصغر لمقاماتها. وقد تكون للمعادلة الناتجة حلول تعدم أحد مقامات المعادلة الأصلية: هذه حلول زائفة ويجب استبعادها. لذلك نتحقق في النهاية من كل حل في المعادلة الأصلية.',
            'To clear the denominators, multiply the whole equation by their LCM. The equation you get may have solutions that make a denominator of the starting equation zero: those are false and are discarded. That is why, at the end, you check each solution in the original equation.'
        ),
        examplePrompt: say('Ebatzi $\\frac{x}{x+2}+\\frac{4}{x^2-4}=\\frac{1}{x-2}$.', 'Resuelve $\\frac{x}{x+2}+\\frac{4}{x^2-4}=\\frac{1}{x-2}$.', 'حُلّ $\\frac{x}{x+2}+\\frac{4}{x^2-4}=\\frac{1}{x-2}$.', 'Solve $\\frac{x}{x+2}+\\frac{4}{x^2-4}=\\frac{1}{x-2}$.'),
        example: same('$\\begin{gathered}x(x-2)+4=x+2\\\\ \\to\\ x^2-3x+2=0\\end{gathered}$'),
        exampleAnswer: say('$x=1$; $2$ zenbakiak izendatzaile bat anulatzen du.', '$x=1$; el $2$ anula un denominador.', '$x=1$؛ أما $2$ فيعدم أحد المقامات.', '$x=1$; $2$ makes a denominator zero.')
    },

    /* ---------- 3. Radicals and absolute value ---------- */
    'radical-equations': {
        definitions: [
            { term: say('Ekuazio irrazionala', 'Ecuación irracional', 'المعادلة الجذرية', 'Radical equation'), meaning: say('Ezezaguna erro baten barruan duen ekuazioa, $\\sqrt{3x}=x$ bezala.', 'Una ecuación con la incógnita dentro de una raíz, como $\\sqrt{3x}=x$.', 'معادلة فيها المجهول داخل جذر، مثل $\\sqrt{3x}=x$.', 'An equation with the unknown inside a root, such as $\\sqrt{3x}=x$.') }
        ],
        vocabulary: [
            say('isolatu', 'aislar', 'اعزل', 'isolate'),
            say('karratura jaso', 'elevar al cuadrado', 'ربّع', 'square')
        ],
        explanation: say(
            'Erroak dituen ekuazio bat ebazteko, erro bat atal batean isolatzen da, eta bi atalak karratura jasotzen dira. Beste erro bat geratzen bada, prozesua errepikatzen da. Karratura jasotzean, hasierako ekuazioa betetzen ez duten soluzioak ager daitezke; beraz, guztiak hasierako ekuazioan egiaztatzen dira.',
            'Para resolver una ecuación con radicales se aísla un radical en un miembro y se elevan al cuadrado los dos miembros. Si queda otro radical, se repite el proceso. Elevar al cuadrado puede añadir soluciones que no cumplen la ecuación de partida, así que todas se comprueban en la ecuación original.',
            'لحل معادلة فيها جذور نعزل جذرًا في طرف ونربّع الطرفين. وإذا بقي جذر آخر نكرر العملية. وقد يضيف التربيع حلولًا لا تحقق المعادلة الأصلية، لذلك نتحقق منها كلها في المعادلة الأصلية.',
            'To solve an equation with radicals, isolate one radical on one side and square both sides. If another radical is left, repeat the process. Squaring can add solutions that do not satisfy the starting equation, so you check them all in the original equation.'
        ),
        examplePrompt: say('Ebatzi $\\sqrt{2x+3}=x$.', 'Resuelve $\\sqrt{2x+3}=x$.', 'حُلّ $\\sqrt{2x+3}=x$.', 'Solve $\\sqrt{2x+3}=x$.'),
        example: same('$2x+3=x^2\\ \\to\\ x^2-2x-3=0$'),
        exampleAnswer: say('$x=3$; $-1$ ez da soluzioa, $\\sqrt{1}\\neq -1$ baita.', '$x=3$; el $-1$ no vale, porque $\\sqrt{1}\\neq -1$.', '$x=3$؛ أما $-1$ فليس حلًّا لأن $\\sqrt{1}\\neq -1$.', '$x=3$; $-1$ does not work, because $\\sqrt{1}\\neq -1$.'),
        why: {
            text: say(
                'Zergatik agertzen dira soluzio faltsuak? $a=b$ ekuaziotik $a^2=b^2$ ekuaziora pasatzen delako, eta hori $a=-b$ denean ere betetzen da. $\\sqrt{x+3}=x+1$ karratura jasotzean, $-\\sqrt{x+3}=x+1$ ere ebazten da, eta haren soluzioak sartu egiten dira.',
                '¿Por qué aparecen soluciones falsas? Porque de $a=b$ se pasa a $a^2=b^2$, que también se cumple si $a=-b$. Al elevar al cuadrado $\\sqrt{x+3}=x+1$, también se resuelve $-\\sqrt{x+3}=x+1$, y sus soluciones se cuelan.',
                'لماذا تظهر حلول زائفة؟ لأننا ننتقل من $a=b$ إلى $a^2=b^2$، وهذه تتحقق أيضًا إذا كان $a=-b$. فعند تربيع $\\sqrt{x+3}=x+1$ نحل معها $-\\sqrt{x+3}=x+1$، فتتسلل حلولها.',
                'Why do false solutions appear? Because you go from $a=b$ to $a^2=b^2$, which also holds if $a=-b$. Squaring $\\sqrt{x+3}=x+1$ also solves $-\\sqrt{x+3}=x+1$, and its solutions sneak in.'
            ),
            math: same('$(\\sqrt{4})^2=(-\\sqrt{4})^2=4$')
        }
    },
    'absolute-equations': {
        definitions: [
            { term: say('Balio absolutua', 'Valor absoluto', 'القيمة المطلقة', 'Absolute value'), meaning: say('$|a|$ zenbakia $a$ zenbakitik 0 zenbakira dagoen distantzia da: $|a|=a$, $a\\ge 0$ bada, eta $|a|=-a$, $a<0$ bada.', '$|a|$ es la distancia de $a$ a 0: $|a|=a$ si $a\\ge 0$, y $|a|=-a$ si $a<0$.', '$|a|$ هي المسافة من $a$ إلى 0: $|a|=a$ إذا كان $a\\ge 0$، و$|a|=-a$ إذا كان $a<0$.', '$|a|$ is the distance from $a$ to 0: $|a|=a$ if $a\\ge 0$, and $|a|=-a$ if $a<0$.') }
        ],
        vocabulary: [
            say('kasua', 'caso', 'الحالة', 'case'),
            say('distantzia', 'distancia', 'المسافة', 'distance')
        ],
        explanation: say(
            '$|A|=c$ ekuazioa, $c>0$ izanda, bi kasutan banatzen da, $A=c$ eta $A=-c$, $A$ zenbakia 0 zenbakitik $c$ distantziara dagoelako. $c<0$ bada, ez du soluziorik: balio absolutua ez da inoiz negatiboa. Eta $|A|=|B|$ ekuazioa $A=B$ eta $A=-B$ kasuetan banatzen da.',
            'La ecuación $|A|=c$, con $c>0$, se separa en dos casos, $A=c$ y $A=-c$, porque $A$ está a distancia $c$ del 0. Si $c<0$, no tiene solución: un valor absoluto nunca es negativo. Y $|A|=|B|$ se separa en $A=B$ y $A=-B$.',
            'تنقسم المعادلة $|A|=c$ مع $c>0$ إلى حالتين، $A=c$ و$A=-c$، لأن $A$ على مسافة $c$ من 0. وإذا كان $c<0$ فلا حل لها: القيمة المطلقة ليست سالبة أبدًا. وتنقسم $|A|=|B|$ إلى $A=B$ و$A=-B$.',
            'The equation $|A|=c$, with $c>0$, splits into two cases, $A=c$ and $A=-c$, because $A$ is at distance $c$ from 0. If $c<0$, it has no solution: an absolute value is never negative. And $|A|=|B|$ splits into $A=B$ and $A=-B$.'
        ),
        examplePrompt: say('Ebatzi $|x+1|=|x-5|$.', 'Resuelve $|x+1|=|x-5|$.', 'حُلّ $|x+1|=|x-5|$.', 'Solve $|x+1|=|x-5|$.'),
        example: same('$x+1=-(x-5)\\ \\to\\ 2x=4$'),
        exampleAnswer: say('$x=2$; $x+1=x-5$ kasuak ez du soluziorik.', '$x=2$; el caso $x+1=x-5$ no tiene solución.', '$x=2$؛ والحالة $x+1=x-5$ ليس لها حل.', '$x=2$; the case $x+1=x-5$ has no solution.')
    },

    /* ---------- 4. Exponential and logarithmic equations ---------- */
    'exponential-equations': {
        definitions: [
            { term: say('Ekuazio esponentziala', 'Ecuación exponencial', 'المعادلة الأسية', 'Exponential equation'), meaning: say('Ezezaguna berretzaile batean duen ekuazioa, $7^x=10$ bezala.', 'Una ecuación con la incógnita en un exponente, como $7^x=10$.', 'معادلة فيها المجهول في أس، مثل $7^x=10$.', 'An equation with the unknown in an exponent, such as $7^x=10$.') }
        ],
        vocabulary: [
            say('oinarria', 'base', 'الأساس', 'base'),
            say('berretzailea', 'exponente', 'الأس', 'exponent')
        ],
        explanation: say(
            'Bi atalak oinarri bereko berretura gisa idatz badaitezke, berretzaileak berdintzen dira: $9^x=27$ ekuazioa $3^{2x}=3^3$ da; beraz, $2x=3$. Bestela, bi ataletan logaritmoak hartzen dira, eta $\\log a^x=x\\log a$ propietateak ezezaguna berretzailetik jaisten du.',
            'Si los dos miembros se pueden escribir como potencias de la misma base, se igualan los exponentes: $9^x=27$ es $3^{2x}=3^3$, así que $2x=3$. Si no, se toman logaritmos en los dos miembros, y la propiedad $\\log a^x=x\\log a$ baja la incógnita del exponente.',
            'إذا أمكن كتابة الطرفين قوتين للأساس نفسه نساوي الأسس: $9^x=27$ هي $3^{2x}=3^3$، إذن $2x=3$. وإلا نأخذ اللوغاريتم في الطرفين، فتُنزل الخاصية $\\log a^x=x\\log a$ المجهول من الأس.',
            'If both sides can be written as powers of the same base, set the exponents equal: $9^x=27$ is $3^{2x}=3^3$, so $2x=3$. If not, take logarithms on both sides, and the property $\\log a^x=x\\log a$ brings the unknown down from the exponent.'
        ),
        examplePrompt: say('Ebatzi $5^x=40$ logaritmoekin.', 'Resuelve $5^x=40$ con logaritmos.', 'حُلّ $5^x=40$ باللوغاريتمات.', 'Solve $5^x=40$ using logarithms.'),
        example: same('$x=\\frac{\\log 40}{\\log 5}\\approx 2{,}29$'),
        exampleAnswer: same('$x\\approx 2{,}29$')
    },
    'exponential-change': {
        vocabulary: [
            say('positiboa', 'positivo', 'موجب', 'positive'),
            say('berretura', 'potencia', 'القوة', 'power')
        ],
        explanation: say(
            '$a^{2x}$ eta $a^x$ agertzen direnean, $t=a^x$ aldaketak bigarren mailako ekuazio bihurtzen du, $a^{2x}=t^2$ delako. Aldaketa desegitean, $a^x=t$ ekuazioak $t>0$ bada bakarrik du soluzioa, oinarri positiboko berretura bat ez baita inoiz negatiboa edo zero.',
            'Cuando aparecen $a^{2x}$ y $a^x$, el cambio $t=a^x$ convierte la ecuación en una de segundo grado, porque $a^{2x}=t^2$. Al deshacer el cambio, $a^x=t$ solo tiene solución si $t>0$, ya que una potencia de base positiva nunca es negativa ni cero.',
            'عندما تظهر $a^{2x}$ و$a^x$ يحوّل التغيير $t=a^x$ المعادلة إلى معادلة من الدرجة الثانية، لأن $a^{2x}=t^2$. وعند عكس التغيير يكون لـ $a^x=t$ حل فقط إذا كان $t>0$، لأن القوة التي أساسها موجب ليست سالبة ولا صفرًا أبدًا.',
            'When $a^{2x}$ and $a^x$ appear, the change $t=a^x$ turns the equation into a second-degree one, because $a^{2x}=t^2$. When you undo the change, $a^x=t$ only has a solution if $t>0$, since a power with a positive base is never negative or zero.'
        ),
        examplePrompt: say('Ebatzi $9^{x}-4\\cdot 3^{x}+3=0$.', 'Resuelve $9^{x}-4\\cdot 3^{x}+3=0$.', 'حُلّ $9^{x}-4\\cdot 3^{x}+3=0$.', 'Solve $9^{x}-4\\cdot 3^{x}+3=0$.'),
        example: same('$t^2-4t+3=0\\ \\to\\ t=1,\\ t=3$'),
        exampleAnswer: same('$x=0,\\ x=1$')
    },
    'log-equations': {
        definitions: [
            { term: say('Eremua', 'Dominio', 'المجال', 'Domain'), meaning: say('Logaritmo guztiak existitzen diren $x$ balioak: haien argumentuek positiboak izan behar dute.', 'Los valores de $x$ para los que existen todos los logaritmos: sus argumentos tienen que ser positivos.', 'قيم $x$ التي توجد عندها كل اللوغاريتمات: يجب أن يكون كل وسيط موجبًا.', 'The values of $x$ for which all the logarithms exist: their arguments have to be positive.') }
        ],
        vocabulary: [
            say('argumentua', 'argumento', 'الوسيط', 'argument'),
            say('positiboa', 'positivo', 'موجب', 'positive')
        ],
        explanation: say(
            'Logaritmoen propietateekin, ekuazioa $\\log A=\\log B$ edo $\\log A=c$ moduan uzten da. Orduan $A=B$, edo $A=10^c$. Baina logaritmo bat bere argumentua positiboa bada bakarrik dago: amaieran, hasierako ekuazioaren argumenturen bat negatibo edo zero egiten duten soluzioak baztertzen dira.',
            'Con las propiedades de los logaritmos se deja la ecuación como $\\log A=\\log B$ o como $\\log A=c$. Entonces $A=B$, o $A=10^c$. Pero un logaritmo solo existe si su argumento es positivo: al final se descartan las soluciones que hacen negativo o cero algún argumento de la ecuación de partida.',
            'بخصائص اللوغاريتمات نكتب المعادلة على الصورة $\\log A=\\log B$ أو $\\log A=c$. عندئذ $A=B$ أو $A=10^c$. لكن اللوغاريتم لا يوجد إلا إذا كان وسيطه موجبًا: في النهاية نستبعد الحلول التي تجعل أحد وسائط المعادلة الأصلية سالبًا أو صفرًا.',
            'With the properties of logarithms, leave the equation as $\\log A=\\log B$ or as $\\log A=c$. Then $A=B$, or $A=10^c$. But a logarithm only exists if its argument is positive: at the end, discard the solutions that make an argument of the starting equation negative or zero.'
        ),
        examplePrompt: say('Ebatzi $2\\log x=\\log(x+6)$.', 'Resuelve $2\\log x=\\log(x+6)$.', 'حُلّ $2\\log x=\\log(x+6)$.', 'Solve $2\\log x=\\log(x+6)$.'),
        example: same('$\\log x^2=\\log(x+6)\\ \\to\\ x^2-x-6=0$'),
        exampleAnswer: say('$x=3$; $-2$ ez da onartzen, $\\log(-2)$ ez baitago.', '$x=3$; el $-2$ no vale, porque $\\log(-2)$ no existe.', '$x=3$؛ أما $-2$ فلا يصلح لأن $\\log(-2)$ غير موجود.', '$x=3$; $-2$ does not work, because $\\log(-2)$ does not exist.')
    },

    /* ---------- 5. Inequalities ---------- */
    'polynomial-inequalities': {
        definitions: [
            { term: say('Zeinuen taula', 'Tabla de signos', 'جدول الإشارات', 'Sign table'), meaning: say('Faktore bakoitzak zuzenaren tarte bakoitzean duen zeinua erakusten duen taula; biderkaduraren zeinua zeinuak biderkatuz ateratzen da.', 'Un cuadro con el signo de cada factor en cada tramo de la recta; el del producto sale de multiplicar los signos.', 'جدول فيه إشارة كل عامل في كل مجال من المستقيم، وإشارة الجداء تنتج من ضرب الإشارات.', 'A table with the sign of each factor on each stretch of the line; the sign of the product comes from multiplying the signs.') }
        ],
        vocabulary: [
            say('tartea', 'intervalo', 'المجال', 'interval'),
            say('zeinua', 'signo', 'الإشارة', 'sign')
        ],
        explanation: say(
            '$P(x)>0$ ebazteko, $P(x)$ faktorizatzen da, eta haren erroak zuzenean jartzen dira: zeinua aldatzen ez den tarteetan zatitzen dute zuzena. Zeinuen taula batean, faktore bakoitzaren zeinua jartzen da tarte bakoitzean, eta biderkatu egiten dira. Soluzioa eskatutako zeinua duten tarteak dira.',
            'Para resolver $P(x)>0$ se factoriza $P(x)$ y sus raíces se colocan en la recta: la parten en intervalos en los que el signo no cambia. En una tabla de signos se pone el de cada factor en cada intervalo y se multiplican. La solución son los intervalos con el signo pedido.',
            'لحل $P(x)>0$ نحلّل $P(x)$ ونضع جذورها على المستقيم: فتقسمه إلى مجالات لا تتغير فيها الإشارة. وفي جدول الإشارات نضع إشارة كل عامل في كل مجال ثم نضربها. والحل هو المجالات ذات الإشارة المطلوبة.',
            'To solve $P(x)>0$, factorise $P(x)$ and place its roots on the line: they cut it into intervals where the sign does not change. In a sign table, write the sign of each factor in each interval and multiply them. The solution is the intervals with the sign asked for.'
        ),
        examplePrompt: say('Ebatzi $x^2(x-3)\\le 0$.', 'Resuelve $x^2(x-3)\\le 0$.', 'حُلّ $x^2(x-3)\\le 0$.', 'Solve $x^2(x-3)\\le 0$.'),
        example: same('$x^2\\ge 0\\ \\to\\ x-3\\le 0$'),
        exampleAnswer: say('$(-\\infty,3]$: $x^2$ faktoreak ez du zeinua aldatzen.', '$(-\\infty,3]$: el factor $x^2$ no cambia el signo.', '$(-\\infty,3]$: العامل $x^2$ لا يغيّر الإشارة.', '$(-\\infty,3]$: the factor $x^2$ does not change the sign.')
    },
    'rational-inequalities': {
        vocabulary: [
            say('zatidura', 'cociente', 'خارج القسمة', 'quotient'),
            say('izendatzailea', 'denominador', 'المقام', 'denominator')
        ],
        explanation: say(
            '$\\frac{P(x)}{Q(x)}\\ge 0$ inekuazio arrazional bat zeinuen taula batekin ebazten da: $P$ eta $Q$ polinomioen erroak zuzenean jartzen dira, eta zatiduraren zeinua aztertzen da tarte bakoitzean. $P$ polinomioaren erroak sartzen dira desberdintza $\\ge$ edo $\\le$ bada; $Q$ polinomioarenak inoiz ez, izendatzailea anulatzen dutelako.',
            'Una inecuación racional $\\frac{P(x)}{Q(x)}\\ge 0$ se resuelve con una tabla de signos: se colocan en la recta las raíces de $P$ y de $Q$, y se estudia el signo del cociente en cada tramo. Las raíces de $P$ entran si la desigualdad es $\\ge$ o $\\le$; las de $Q$ nunca, porque anulan el denominador.',
            'تُحل المتراجحة الكسرية $\\frac{P(x)}{Q(x)}\\ge 0$ بجدول إشارات: نضع على المستقيم جذور $P$ وجذور $Q$، وندرس إشارة خارج القسمة في كل مجال. تدخل جذور $P$ إذا كانت المتراجحة $\\ge$ أو $\\le$، أما جذور $Q$ فلا تدخل أبدًا لأنها تعدم المقام.',
            'A rational inequality $\\frac{P(x)}{Q(x)}\\ge 0$ is solved with a sign table: place the roots of $P$ and of $Q$ on the line, and study the sign of the quotient on each stretch. The roots of $P$ are included if the inequality is $\\ge$ or $\\le$; those of $Q$ never, because they make the denominator zero.'
        ),
        examplePrompt: say('Ebatzi $\\frac{x+3}{x-5}<0$.', 'Resuelve $\\frac{x+3}{x-5}<0$.', 'حُلّ $\\frac{x+3}{x-5}<0$.', 'Solve $\\frac{x+3}{x-5}<0$.'),
        example: same('$\\frac{-}{-}=+\\qquad\\frac{+}{-}=-\\qquad\\frac{+}{+}=+$'),
        exampleAnswer: say('$(-3,5)$: erdiko tartean bakarrik da negatiboa.', '$(-3,5)$: solo es negativo en el tramo del medio.', '$(-3,5)$: يكون سالبًا في المجال الأوسط فقط.', '$(-3,5)$: it is only negative on the middle stretch.'),
        why: {
            text: say(
                'Zergatik ez da izendatzaileaz biderkatzen? Negatiboa bada, desberdintzak noranzkoa aldatzen duelako. $\\frac{x-1}{x+2}\\ge 0$ inekuazioan, $x+2$ adierazpenaz biderkatzean $x-1\\ge 0$ ateratzen da, eta $x<-2$ balioak galtzen dira, non zatidura ere positiboa den.',
                '¿Por qué no se multiplica por el denominador? Porque si es negativo, la desigualdad cambia de sentido. En $\\frac{x-1}{x+2}\\ge 0$, multiplicar por $x+2$ da $x-1\\ge 0$ y se pierden los $x<-2$, donde el cociente también es positivo.',
                'لماذا لا نضرب في المقام؟ لأنه إذا كان سالبًا تغيّر المتراجحة اتجاهها. في $\\frac{x-1}{x+2}\\ge 0$ يعطي الضرب في $x+2$ المتراجحة $x-1\\ge 0$، فتضيع قيم $x<-2$ التي يكون فيها خارج القسمة موجبًا أيضًا.',
                'Why not multiply by the denominator? Because if it is negative, the inequality changes direction. In $\\frac{x-1}{x+2}\\ge 0$, multiplying by $x+2$ gives $x-1\\ge 0$ and you lose the $x<-2$, where the quotient is positive too.'
            ),
            math: same('$\\frac{-4-1}{-4+2}=\\frac{5}{2}>0$')
        }
    },
    'absolute-inequalities': {
        definitions: [
            { term: say('Zuzenerdia', 'Semirrecta', 'نصف المستقيم', 'Half-line'), meaning: say('Mutur bat infinituan duen tartea, $(3,+\\infty)$ bezala.', 'Un intervalo con un extremo en el infinito, como $(3,+\\infty)$.', 'مجال أحد طرفيه في اللانهاية، مثل $(3,+\\infty)$.', 'An interval with one end at infinity, such as $(3,+\\infty)$.') }
        ],
        vocabulary: [
            say('distantzia', 'distancia', 'المسافة', 'distance'),
            say('tartea', 'intervalo', 'المجال', 'interval')
        ],
        explanation: say(
            '$|A|$ zenbakia $A$ zenbakitik 0 zenbakira dagoen distantzia denez, $|A|<c$ inekuazioak 0 zenbakitik $c$ baino gertuago egotea eskatzen du: $-c<A<c$, tarte bakarra. Aldiz, $|A|>c$ inekuazioak urrun egotea eskatzen du: $A<-c$ edo $A>c$, bi zuzenerdi. $c$ negatiboa bada, $|A|<c$ inekuazioak ez du soluziorik, eta $|A|>c$ zenbaki guztiek betetzen dute.',
            'Como $|A|$ es la distancia de $A$ a 0, $|A|<c$ pide estar a menos de $c$ del 0: $-c<A<c$, un solo intervalo. En cambio, $|A|>c$ pide estar lejos: $A<-c$ o $A>c$, dos semirrectas. Si $c$ es negativo, $|A|<c$ no tiene solución y $|A|>c$ la cumple todo número.',
            'بما أن $|A|$ هي المسافة من $A$ إلى 0، فإن $|A|<c$ تطلب أن تكون على بعد أقل من $c$ عن 0: $-c<A<c$، أي مجال واحد. أما $|A|>c$ فتطلب البعد: $A<-c$ أو $A>c$، أي نصفا مستقيم. وإذا كان $c$ سالبًا فليس لـ $|A|<c$ حل، وكل عدد يحقق $|A|>c$.',
            'Since $|A|$ is the distance from $A$ to 0, $|A|<c$ asks for being less than $c$ from 0: $-c<A<c$, a single interval. On the other hand, $|A|>c$ asks for being far away: $A<-c$ or $A>c$, two half-lines. If $c$ is negative, $|A|<c$ has no solution and every number satisfies $|A|>c$.'
        ),
        examplePrompt: say('Ebatzi $|x+2|\\ge 3$.', 'Resuelve $|x+2|\\ge 3$.', 'حُلّ $|x+2|\\ge 3$.', 'Solve $|x+2|\\ge 3$.'),
        example: same('$x+2\\le -3\\qquad x+2\\ge 3$'),
        exampleAnswer: same('$(-\\infty,-5]\\cup[1,+\\infty)$')
    },
    'inequality-systems': {
        definitions: [
            { term: say('Inekuazio-sistema', 'Sistema de inecuaciones', 'نظام متراجحات', 'System of inequalities'), meaning: say('Aldi berean bete behar diren zenbait inekuazio: soluzioa haien soluzioen ebakidura da.', 'Varias inecuaciones que se tienen que cumplir a la vez: su solución es la intersección de las soluciones.', 'عدة متراجحات يجب أن تتحقق معًا: حلها تقاطع حلولها.', 'Several inequalities that have to hold at once: its solution is the intersection of their solutions.') }
        ],
        vocabulary: [
            say('ebakidura', 'intersección', 'التقاطع', 'intersection'),
            say('baldintza', 'condición', 'الشرط', 'condition')
        ],
        explanation: say(
            'Ezezagun bakarreko inekuazio-sistema batean, inekuazio bakoitza bere aldetik ebazten da, eta sistemaren soluzioa zati komuna da: tarteen ebakidura. Problema batean, gainera, testuinguruaren baldintzak gehitzen dira, luzera edo prezio bat positiboa izatea, adibidez.',
            'En un sistema de inecuaciones con una incógnita, cada inecuación se resuelve por separado, y la solución del sistema es la parte común: la intersección de los intervalos. En un problema, además, se añaden las condiciones del contexto, como que una longitud o un precio sean positivos.',
            'في نظام متراجحات بمجهول واحد تُحل كل متراجحة على حدة، وحل النظام هو الجزء المشترك: تقاطع المجالات. وفي المسائل نضيف أيضًا شرط السياق، مثل أن يكون الطول أو السعر موجبًا.',
            'In a system of inequalities with one unknown, each inequality is solved separately, and the solution of the system is the common part: the intersection of the intervals. In a problem, you also add the conditions of the context, such as a length or a price being positive.'
        ),
        examplePrompt: say('Ebatzi $3x-6>0$ eta $x^2\\le 16$ inekuazioen sistema.', 'Resuelve el sistema $3x-6>0$ y $x^2\\le 16$.', 'حُلّ النظام $3x-6>0$ و$x^2\\le 16$.', 'Solve the system $3x-6>0$ and $x^2\\le 16$.'),
        example: same('$x>2\\qquad -4\\le x\\le 4$'),
        exampleAnswer: same('$(2,4]$')
    }
}
