import type { LessonTexts } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from '../batx1-zientziak-funtzioak/text.ts'
import type { BachLimitsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Limiteak eta jarraitutasuna · Batxilergoa 1 · Zientziak — what each
   lesson tells: the new words (definitions), a short explanation, the
   example as an exercise («Another example»), the key words in four
   languages and, in five lessons, «Why does it work?». Plain data so the
   tests can import it; lessons.tsx merges it into the topics. The example
   uses numbers of its own, never those of «Let's solve», of «Check it» or
   of the typical mistake. Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

export const bachLimitsLessonTexts: Record<BachLimitsTopicId, LessonTexts> = {
    /* ---------- 1. The limit at a point ---------- */
    idea: {
        definitions: [
            { term: say('Limitea', 'Límite', 'النهاية', 'Limit'), meaning: say('$\\lim_{x\\to a}f(x)=L$: $x$ aldagaia $a$ baliora hurbiltzean, $f(x)$ nahi bezain hurbil dago $L$ baliotik.', '$\\lim_{x\\to a}f(x)=L$: al acercar $x$ a $a$, $f(x)$ queda tan cerca de $L$ como se quiera.', '$\\lim_{x\\to a}f(x)=L$: عند اقتراب $x$ من $a$ تقترب $f(x)$ من $L$ بقدر ما نريد.', '$\\lim_{x\\to a}f(x)=L$: as $x$ approaches $a$, $f(x)$ gets as close to $L$ as you like.') }
        ],
        vocabulary: [
            say('hurbildu', 'acercarse', 'يقترب', 'approach'),
            say('balio-taula', 'tabla de valores', 'جدول القيم', 'table of values')
        ],
        explanation: say(
            '$\\lim_{x\\to a}f(x)=L$ esan nahi du $f(x)$ funtzioa $L$ baliora hurbiltzen dela $x$ aldagaia $a$ baliora hurbiltzean, bi aldeetatik. $a$ puntuaren ondoan begiratzen da, inoiz ez $a$ puntuan: limitea egon daiteke $f(a)$ ez badago edo beste balio bat badu. Balio-taula batek laguntzen du ikusten.',
            '$\\lim_{x\\to a}f(x)=L$ quiere decir que $f(x)$ se acerca a $L$ cuando $x$ se acerca a $a$, por los dos lados. Se mira cerca de $a$, nunca en $a$: el límite puede existir aunque $f(a)$ no exista o valga otra cosa. Una tabla de valores ayuda a verlo.',
            '$\\lim_{x\\to a}f(x)=L$ تعني أن $f(x)$ تقترب من $L$ عندما يقترب $x$ من $a$ من الجانبين. ننظر قرب $a$ لا عند $a$: قد توجد النهاية حتى لو لم توجد $f(a)$ أو كانت لها قيمة أخرى. ويساعد جدول القيم على رؤية ذلك.',
            '$\\lim_{x\\to a}f(x)=L$ means that $f(x)$ approaches $L$ as $x$ approaches $a$, from both sides. You look near $a$, never at $a$: the limit can exist even if $f(a)$ does not exist or has another value. A table of values helps to see it.'
        ),
        examplePrompt: say('Estimatu $\\lim_{x\\to 1}\\frac{x^3-1}{x-1}$, $x=0{,}99$ eta $x=1{,}01$ erabiliz.', 'Estima $\\lim_{x\\to 1}\\frac{x^3-1}{x-1}$ con $x=0{,}99$ y $x=1{,}01$.', 'قدّر $\\lim_{x\\to 1}\\frac{x^3-1}{x-1}$ باستعمال $x=0{,}99$ و$x=1{,}01$.', 'Estimate $\\lim_{x\\to 1}\\frac{x^3-1}{x-1}$ with $x=0{,}99$ and $x=1{,}01$.'),
        example: same('$f(0{,}99)=2{,}9701\\qquad f(1{,}01)=3{,}0301$'),
        exampleAnswer: say('Bi aldeak 3 baliora hurbiltzen dira: limitea 3 da, nahiz eta $f(1)$ ez egon.', 'Los dos lados se acercan a 3: el límite es 3, aunque $f(1)$ no existe.', 'يقترب الجانبان من 3: النهاية 3 مع أن $f(1)$ غير موجودة.', 'Both sides approach 3: the limit is 3, even though $f(1)$ does not exist.')
    },
    'one-sided': {
        definitions: [
            { term: say('Alboko limitea', 'Límite lateral', 'النهاية الجانبية', 'One-sided limit'), meaning: say('$\\lim_{x\\to a^-}$: $a$ baliora ezkerretik hurbilduz; $\\lim_{x\\to a^+}$: eskuinetik.', '$\\lim_{x\\to a^-}$: acercándose a $a$ por la izquierda; $\\lim_{x\\to a^+}$: por la derecha.', '$\\lim_{x\\to a^-}$: الاقتراب من $a$ من اليسار؛ $\\lim_{x\\to a^+}$: من اليمين.', '$\\lim_{x\\to a^-}$: approaching $a$ from the left; $\\lim_{x\\to a^+}$: from the right.') }
        ],
        vocabulary: [
            say('ezkerra', 'izquierda', 'اليسار', 'left'),
            say('eskuina', 'derecha', 'اليمين', 'right'),
            say('zatia', 'trozo', 'الجزء', 'piece')
        ],
        explanation: say(
            'Zatika definitutako funtzio batean, mutur bakoitzeko zatia erabiltzen da: ezkerretik, ezkerreko zatia; eskuinetik, eskuinekoa. Limitea bi alboko limiteak berdinak direnean bakarrik dago, eta orduan haien balioa du. Desberdinak badira, funtzioak jauzi egiten du eta ez dago limiterik.',
            'En una función a trozos, cada lado usa su trozo: por la izquierda, el de la izquierda; por la derecha, el de la derecha. El límite existe solo si los dos límites laterales coinciden, y entonces vale lo mismo que ellos. Si son distintos, la función da un salto y no hay límite.',
            'في الدالة المعرّفة على أجزاء يستعمل كل جانب جزأه: من اليسار الجزء الأيسر، ومن اليمين الجزء الأيمن. ولا توجد النهاية إلا إذا تساوت النهايتان الجانبيتان، وتكون قيمتها قيمتهما. وإذا اختلفتا فالدالة تقفز ولا توجد نهاية.',
            'In a piecewise function, each side uses its piece: from the left, the left piece; from the right, the right one. The limit exists only if the two one-sided limits are equal, and then it has their value. If they are different, the function jumps and there is no limit.'
        ),
        examplePrompt: say('$g(x)=\\begin{cases}2x+1 & x<2\\\\ x^2+1 & x\\ge 2\\end{cases}$ bada, ba al dago $\\lim_{x\\to 2}g(x)$?', 'Si $g(x)=\\begin{cases}2x+1 & x<2\\\\ x^2+1 & x\\ge 2\\end{cases}$, ¿existe $\\lim_{x\\to 2}g(x)$?', 'إذا كانت $g(x)=\\begin{cases}2x+1 & x<2\\\\ x^2+1 & x\\ge 2\\end{cases}$، فهل توجد $\\lim_{x\\to 2}g(x)$؟', 'If $g(x)=\\begin{cases}2x+1 & x<2\\\\ x^2+1 & x\\ge 2\\end{cases}$, does $\\lim_{x\\to 2}g(x)$ exist?'),
        example: same('$\\lim_{x\\to 2^-}(2x+1)=5\\qquad\\lim_{x\\to 2^+}(x^2+1)=5$'),
        exampleAnswer: say('Bai: bi alboko limiteak 5 dira; beraz, $\\lim_{x\\to 2}g(x)=5$.', 'Sí: los dos laterales valen 5, así que $\\lim_{x\\to 2}g(x)=5$.', 'نعم: النهايتان الجانبيتان تساويان 5، إذن $\\lim_{x\\to 2}g(x)=5$.', 'Yes: both one-sided limits are 5, so $\\lim_{x\\to 2}g(x)=5$.')
    },
    infinite: {
        definitions: [
            { term: say('Asintota bertikala', 'Asíntota vertical', 'المقارب الرأسي', 'Vertical asymptote'), meaning: say('$x=a$ zuzena, $f(x)\\to\\pm\\infty$ bada $x$ aldagaia $a$ baliora hurbiltzean.', 'La recta $x=a$ cuando $f(x)\\to\\pm\\infty$ al acercarse $x$ a $a$.', 'المستقيم $x=a$ عندما $f(x)\\to\\pm\\infty$ باقتراب $x$ من $a$.', 'The line $x=a$ when $f(x)\\to\\pm\\infty$ as $x$ approaches $a$.') }
        ],
        vocabulary: [
            say('zeinua', 'signo', 'الإشارة', 'sign'),
            say('infinitua', 'infinito', 'اللانهاية', 'infinity')
        ],
        explanation: say(
            'Ordezkatzean $\\frac{k}{0}$ ateratzen bada, $k\\neq 0$ izanik, limitea infinitua da: zatidura mugarik gabe hazten da. Zeinua alde bakoitzean aztertzen da: $\\lim_{x\\to a^-}$ eta $\\lim_{x\\to a^+}$ desberdinak izan daitezke, $-\\infty$ eta $+\\infty$. Kasu horretan, $x=a$ asintota bertikala da.',
            'Si al sustituir sale $\\frac{k}{0}$ con $k\\neq 0$, el límite es infinito: el cociente crece sin límite. El signo se estudia en cada lado: $\\lim_{x\\to a^-}$ y $\\lim_{x\\to a^+}$ pueden ser distintos, $-\\infty$ y $+\\infty$. En ese caso, $x=a$ es una asíntota vertical.',
            'إذا حصلنا عند التعويض على $\\frac{k}{0}$ مع $k\\neq 0$ فالنهاية لانهائية: يكبر خارج القسمة بلا حد. وتُدرس الإشارة في كل جانب: قد تختلف $\\lim_{x\\to a^-}$ و$\\lim_{x\\to a^+}$، فتكونان $-\\infty$ و$+\\infty$. وفي هذه الحالة يكون $x=a$ مقاربًا رأسيًّا.',
            'If substituting gives $\\frac{k}{0}$ with $k\\neq 0$, the limit is infinite: the quotient grows without bound. The sign is studied on each side: $\\lim_{x\\to a^-}$ and $\\lim_{x\\to a^+}$ can be different, $-\\infty$ and $+\\infty$. In that case, $x=a$ is a vertical asymptote.'
        ),
        examplePrompt: say('Kalkulatu $\\lim_{x\\to -1}\\frac{2}{(x+1)^2}$.', 'Calcula $\\lim_{x\\to -1}\\frac{2}{(x+1)^2}$.', 'احسب $\\lim_{x\\to -1}\\frac{2}{(x+1)^2}$.', 'Work out $\\lim_{x\\to -1}\\frac{2}{(x+1)^2}$.'),
        example: same('$(x+1)^2>0\\ \\to\\ \\lim_{x\\to -1}\\frac{2}{(x+1)^2}=+\\infty$'),
        exampleAnswer: say('Bi aldeetan izendatzailea positiboa eta oso txikia da: $+\\infty$. $x=-1$ zuzena asintota bertikala da.', 'Por los dos lados el denominador es positivo y muy pequeño: $+\\infty$. La recta $x=-1$ es una asíntota vertical.', 'من الجانبين يكون المقام موجبًا وصغيرًا جدًّا: $+\\infty$. والمستقيم $x=-1$ مقارب رأسي.', 'On both sides the denominator is positive and very small: $+\\infty$. The line $x=-1$ is a vertical asymptote.'),
        why: {
            text: say(
                'Zergatik hazten da hainbeste? $x$ aldagaia 2 baliotik oso hurbil dagoenean, izendatzailea txikia da, eta zenbat eta txikiagoa izendatzailea, orduan eta handiagoa zatidura.',
                '¿Por qué crece tanto? Cuando $x$ está muy cerca de 2, el denominador es pequeño, y cuanto más pequeño el denominador, más grande el cociente.',
                'لماذا يكبر كثيرًا؟ عندما يكون $x$ قريبًا جدًّا من 2 يكون المقام صغيرًا، وكلما صغر المقام كبر خارج القسمة.',
                'Why does it grow so much? When $x$ is very close to 2, the denominator is small, and the smaller the denominator, the larger the quotient.'
            ),
            math: same('$x=2{,}001\\ \\to\\ \\frac{3}{x-2}=3\\div 0{,}001=3000$')
        }
    },

    /* ---------- 2. Working out limits at a point ---------- */
    substitute: {
        definitions: [
            { term: say('Indeterminazioa', 'Indeterminación', 'حالة عدم التعيين', 'Indeterminate form'), meaning: say('$\\frac{0}{0}$ edo $\\infty-\\infty$ bezalako forma bat, limitearen balioa esaten ez duena: adierazpena aldatu behar da.', 'Una forma como $\\frac{0}{0}$ o $\\infty-\\infty$ que no dice el valor del límite: hay que transformar la expresión.', 'صورة مثل $\\frac{0}{0}$ أو $\\infty-\\infty$ لا تحدد قيمة النهاية: يجب تحويل العبارة.', 'A form such as $\\frac{0}{0}$ or $\\infty-\\infty$ that does not tell the value of the limit: the expression must be transformed.') }
        ],
        vocabulary: [
            say('ordezkatu', 'sustituir', 'التعويض', 'substitute'),
            say('jarraitua', 'continua', 'متصلة', 'continuous')
        ],
        explanation: say(
            'Funtzioa $a$ puntuan jarraitua bada (polinomioak, zatidurak, erroak… existitzen diren lekuan), limitea ordezkatuz kalkulatzen da. Infinituekin honela egiten da: $k+\\infty=\\infty$, $k\\cdot\\infty=\\pm\\infty$ $k\\neq 0$ bada, eta $\\frac{k}{\\infty}=0$. $\\frac{0}{0}$, $\\frac{\\infty}{\\infty}$, $\\infty-\\infty$, $0\\cdot\\infty$ eta $1^{\\infty}$ indeterminazioak dira.',
            'Si la función es continua en $a$ (polinomios, cocientes, raíces… donde existen), el límite se calcula sustituyendo. Con infinitos se opera así: $k+\\infty=\\infty$, $k\\cdot\\infty=\\pm\\infty$ si $k\\neq 0$, y $\\frac{k}{\\infty}=0$. Las formas $\\frac{0}{0}$, $\\frac{\\infty}{\\infty}$, $\\infty-\\infty$, $0\\cdot\\infty$ y $1^{\\infty}$ son indeterminaciones.',
            'إذا كانت الدالة متصلة عند $a$ (الحدوديات وخوارج القسمة والجذور حيث توجد) تُحسب النهاية بالتعويض. ومع اللانهاية نعمل هكذا: $k+\\infty=\\infty$، و$k\\cdot\\infty=\\pm\\infty$ إذا كان $k\\neq 0$، و$\\frac{k}{\\infty}=0$. أما الصور $\\frac{0}{0}$ و$\\frac{\\infty}{\\infty}$ و$\\infty-\\infty$ و$0\\cdot\\infty$ و$1^{\\infty}$ فهي حالات عدم تعيين.',
            'If the function is continuous at $a$ (polynomials, quotients, roots… where they exist), the limit is worked out by substituting. With infinities: $k+\\infty=\\infty$, $k\\cdot\\infty=\\pm\\infty$ if $k\\neq 0$, and $\\frac{k}{\\infty}=0$. The forms $\\frac{0}{0}$, $\\frac{\\infty}{\\infty}$, $\\infty-\\infty$, $0\\cdot\\infty$ and $1^{\\infty}$ are indeterminate.'
        ),
        examplePrompt: say('Kalkulatu $\\lim_{x\\to 0}\\left(\\frac{1}{x^2}+4\\right)$.', 'Calcula $\\lim_{x\\to 0}\\left(\\frac{1}{x^2}+4\\right)$.', 'احسب $\\lim_{x\\to 0}\\left(\\frac{1}{x^2}+4\\right)$.', 'Work out $\\lim_{x\\to 0}\\left(\\frac{1}{x^2}+4\\right)$.'),
        example: same('$\\frac{1}{x^2}\\to+\\infty\\ \\to\\ +\\infty+4=+\\infty$'),
        exampleAnswer: say('Infinitu bati zenbaki bat batuta, infinitua: $+\\infty$.', 'Un infinito más un número sigue siendo infinito: $+\\infty$.', 'لانهاية زائد عدد تبقى لانهاية: $+\\infty$.', 'Infinity plus a number is still infinity: $+\\infty$.')
    },
    'zero-zero': {
        vocabulary: [
            say('faktorizatu', 'factorizar', 'حلّل', 'factorise'),
            say('sinplifikatu', 'simplificar', 'اختصر', 'simplify'),
            say('zuloa', 'agujero', 'الثقب', 'hole')
        ],
        explanation: say(
            'Bi polinomioren zatidura batean $\\frac{0}{0}$ ateratzen bada, $a$ bien erroa da: biek dute $(x-a)$ faktorea. Faktorizatu, sinplifikatu faktore hori eta ordezkatu berriro. Grafikoan, $x=a$ puntuan zulo bat dago, eta limitea zuloaren altuera da.',
            'Si en un cociente de polinomios sale $\\frac{0}{0}$, $a$ es raíz de los dos: ambos tienen el factor $(x-a)$. Se factoriza, se simplifica ese factor y se vuelve a sustituir. En la gráfica hay un agujero en $x=a$, y el límite es la altura del agujero.',
            'إذا حصلنا في خارج قسمة حدوديتين على $\\frac{0}{0}$ فإن $a$ جذر لكلتيهما: لكل منهما العامل $(x-a)$. نحلّل ونختصر هذا العامل ونعوّض من جديد. وفي الرسم ثقب عند $x=a$، والنهاية هي ارتفاع الثقب.',
            'If a quotient of polynomials gives $\\frac{0}{0}$, $a$ is a root of both: both have the factor $(x-a)$. Factorise, cancel that factor and substitute again. On the graph there is a hole at $x=a$, and the limit is the height of the hole.'
        ),
        examplePrompt: say('Kalkulatu $\\lim_{x\\to -2}\\frac{x^2+5x+6}{x+2}$.', 'Calcula $\\lim_{x\\to -2}\\frac{x^2+5x+6}{x+2}$.', 'احسب $\\lim_{x\\to -2}\\frac{x^2+5x+6}{x+2}$.', 'Work out $\\lim_{x\\to -2}\\frac{x^2+5x+6}{x+2}$.'),
        example: same('$\\frac{(x+2)(x+3)}{x+2}=x+3\\ \\to\\ -2+3=1$'),
        exampleAnswer: say('Limitea 1 da.', 'El límite es 1.', 'النهاية 1.', 'The limit is 1.'),
        why: {
            text: say(
                'Zergatik ezaba daiteke $x-3$? Limiteak $x$ aldagaia 3 baliotik hurbil begiratzen du, inoiz ez 3 puntuan: han $x-3\\neq 0$ da, eta faktorea arazorik gabe sinplifikatzen da.',
                '¿Por qué se puede tachar $x-3$? El límite mira $x$ cerca de 3, nunca en 3: ahí $x-3\\neq 0$ y el factor se simplifica sin problema.',
                'لماذا يمكن حذف $x-3$؟ تنظر النهاية إلى $x$ قرب 3 لا عند 3: هناك $x-3\\neq 0$ ويُختصر العامل بلا مشكلة.',
                'Why can $x-3$ be cancelled? The limit looks at $x$ near 3, never at 3: there $x-3\\neq 0$ and the factor cancels without trouble.'
            )
        }
    },
    roots: {
        definitions: [
            { term: say('Konjokatua', 'Conjugado', 'المرافق', 'Conjugate'), meaning: say('$\\sqrt{A}-b$ adierazpenarena $\\sqrt{A}+b$ da; haien biderkadura $A-b^2$ da.', 'El de $\\sqrt{A}-b$ es $\\sqrt{A}+b$; su producto es $A-b^2$.', 'مرافق $\\sqrt{A}-b$ هو $\\sqrt{A}+b$، وجداؤهما $A-b^2$.', 'The conjugate of $\\sqrt{A}-b$ is $\\sqrt{A}+b$; their product is $A-b^2$.') }
        ],
        vocabulary: [
            say('erroa', 'raíz', 'الجذر', 'root'),
            say('biderkatu', 'multiplicar', 'الضرب', 'multiply')
        ],
        explanation: say(
            '$\\frac{0}{0}$ erroekin ateratzen bada, ezin da zuzenean faktorizatu. Goian eta behean konjokatuaz biderkatzen da: batura bider kendurak erroa kentzen du, eta $(x-a)$ faktorea agertzen da. Hori sinplifikatu, eta ordezkatu berriro.',
            'Si $\\frac{0}{0}$ sale con raíces, no se puede factorizar directamente. Se multiplica arriba y abajo por el conjugado: la suma por diferencia quita la raíz y aparece el factor $(x-a)$. Se simplifica y se vuelve a sustituir.',
            'إذا ظهرت $\\frac{0}{0}$ مع الجذور فلا يمكن التحليل مباشرة. نضرب البسط والمقام في المرافق: المجموع في الفرق يزيل الجذر ويظهر العامل $(x-a)$. ثم نختصر ونعوّض من جديد.',
            'If $\\frac{0}{0}$ comes with roots, you cannot factorise directly. Multiply top and bottom by the conjugate: sum times difference removes the root and the factor $(x-a)$ appears. Cancel it and substitute again.'
        ),
        examplePrompt: say('Kalkulatu $\\lim_{x\\to 0}\\frac{\\sqrt{x+9}-3}{x}$.', 'Calcula $\\lim_{x\\to 0}\\frac{\\sqrt{x+9}-3}{x}$.', 'احسب $\\lim_{x\\to 0}\\frac{\\sqrt{x+9}-3}{x}$.', 'Work out $\\lim_{x\\to 0}\\frac{\\sqrt{x+9}-3}{x}$.'),
        example: same('$\\frac{x}{x(\\sqrt{x+9}+3)}=\\frac{1}{\\sqrt{x+9}+3}\\ \\to\\ \\frac{1}{6}$'),
        exampleAnswer: say('Limitea $\\frac{1}{6}$ da.', 'El límite es $\\frac{1}{6}$.', 'النهاية $\\frac{1}{6}$.', 'The limit is $\\frac{1}{6}$.')
    },

    /* ---------- 3. Limits at infinity ---------- */
    degrees: {
        vocabulary: [
            say('maila', 'grado', 'الدرجة', 'degree'),
            say('gai nagusia', 'término principal', 'الحد الرئيسي', 'leading term')
        ],
        explanation: say(
            '$x\\to\\pm\\infty$ denean, polinomio batean maila handieneko gaiak agintzen du. Zatidura batean, mailak konparatzen dira: goikoa txikiagoa bada, limitea 0 da; berdinak badira, gai nagusien koefizienteen zatidura; goikoa handiagoa bada, $\\pm\\infty$, gai nagusien zatidurak ematen duen zeinuarekin.',
            'Cuando $x\\to\\pm\\infty$, en un polinomio manda el término de mayor grado. En un cociente se comparan los grados: si el de arriba es menor, el límite es 0; si son iguales, el cociente de los coeficientes de los términos principales; si el de arriba es mayor, $\\pm\\infty$, con el signo del cociente de los términos principales.',
            'عندما $x\\to\\pm\\infty$ يتحكم في الحدودية الحد ذو الدرجة الكبرى. وفي خارج القسمة نقارن الدرجات: إذا كانت درجة البسط أصغر فالنهاية 0، وإذا تساوتا فهي خارج قسمة معاملي الحدين الرئيسيين، وإذا كانت أكبر فالنهاية $\\pm\\infty$ بإشارة خارج قسمة الحدين الرئيسيين.',
            'As $x\\to\\pm\\infty$, the term of highest degree rules a polynomial. In a quotient, compare the degrees: if the top one is smaller, the limit is 0; if they are equal, the quotient of the coefficients of the leading terms; if the top one is larger, $\\pm\\infty$, with the sign of the quotient of the leading terms.'
        ),
        examplePrompt: say('Kalkulatu $\\lim_{x\\to-\\infty}\\frac{2x^3+1}{x^2-4}$.', 'Calcula $\\lim_{x\\to-\\infty}\\frac{2x^3+1}{x^2-4}$.', 'احسب $\\lim_{x\\to-\\infty}\\frac{2x^3+1}{x^2-4}$.', 'Work out $\\lim_{x\\to-\\infty}\\frac{2x^3+1}{x^2-4}$.'),
        example: same('$\\frac{2x^3}{x^2}=2x\\ \\to\\ -\\infty$'),
        exampleAnswer: say('Goiko maila handiagoa da, eta $2x$ negatiboa da $x\\to-\\infty$ denean: $-\\infty$.', 'El grado de arriba es mayor, y $2x$ es negativo cuando $x\\to-\\infty$: $-\\infty$.', 'درجة البسط أكبر، و$2x$ سالب عندما $x\\to-\\infty$: إذن $-\\infty$.', 'The top degree is larger, and $2x$ is negative as $x\\to-\\infty$: $-\\infty$.'),
        why: {
            text: say(
                'Zergatik balio dute gai nagusiek bakarrik? Goian eta behean $x^2$ zenbakiaz zatituta, gainerako gaiak $\\frac{1}{x}$ edo $\\frac{5}{x^2}$ bihurtzen dira, eta horiek 0 baliora doaz.',
                '¿Por qué solo cuentan los términos principales? Dividiendo arriba y abajo entre $x^2$, los demás términos se convierten en $\\frac{1}{x}$ o $\\frac{5}{x^2}$, que tienden a 0.',
                'لماذا لا تهم إلا الحدود الرئيسية؟ بقسمة البسط والمقام على $x^2$ تصبح الحدود الأخرى $\\frac{1}{x}$ أو $\\frac{5}{x^2}$ وتؤول إلى 0.',
                'Why do only the leading terms count? Dividing top and bottom by $x^2$, the other terms become $\\frac{1}{x}$ or $\\frac{5}{x^2}$, which tend to 0.'
            ),
            math: same('$\\frac{3x^2-x}{x^2+5}=\\frac{3-\\frac{1}{x}}{1+\\frac{5}{x^2}}\\ \\to\\ \\frac{3-0}{1+0}=3$')
        }
    },
    'infinity-minus': {
        vocabulary: [
            say('izendatzaile komuna', 'denominador común', 'المقام المشترك', 'common denominator'),
            say('konjokatua', 'conjugado', 'المرافق', 'conjugate'),
            say('kendura', 'resta', 'الفرق', 'difference')
        ],
        explanation: say(
            '$\\infty-\\infty$ indeterminazio bat da. Zatikiekin, izendatzaile komunera eramaten dira; erroekin, konjokatuaz biderkatu eta zatitzen da, kendura zatidura bihur dadin. Gero mailak konparatzen dira.',
            '$\\infty-\\infty$ es una indeterminación. Con fracciones, se pasan a denominador común; con raíces, se multiplica y se divide por el conjugado, para que la resta se convierta en un cociente. Después se comparan los grados.',
            '$\\infty-\\infty$ حالة عدم تعيين. مع الكسور نوحّد المقامات، ومع الجذور نضرب ونقسم على المرافق كي يصبح الفرق خارج قسمة. ثم نقارن الدرجات.',
            '$\\infty-\\infty$ is an indeterminate form. With fractions, bring them to a common denominator; with roots, multiply and divide by the conjugate, so that the difference becomes a quotient. Then compare the degrees.'
        ),
        examplePrompt: say('Kalkulatu $\\lim_{x\\to+\\infty}\\left(\\frac{x^2}{x-1}-x\\right)$.', 'Calcula $\\lim_{x\\to+\\infty}\\left(\\frac{x^2}{x-1}-x\\right)$.', 'احسب $\\lim_{x\\to+\\infty}\\left(\\frac{x^2}{x-1}-x\\right)$.', 'Work out $\\lim_{x\\to+\\infty}\\left(\\frac{x^2}{x-1}-x\\right)$.'),
        example: same('$\\frac{x^2-x(x-1)}{x-1}=\\frac{x}{x-1}\\ \\to\\ 1$'),
        exampleAnswer: say('Izendatzaile komunarekin, maila bereko zatidura bat ateratzen da: limitea 1 da.', 'Con denominador común sale un cociente de igual grado: el límite es 1.', 'بتوحيد المقامات نحصل على خارج قسمة بالدرجة نفسها: النهاية 1.', 'With a common denominator you get a quotient of equal degrees: the limit is 1.')
    },
    'e-limits': {
        definitions: [
            { term: say('e zenbakia', 'Número e', 'العدد e', 'The number e'), meaning: say('$e\\approx 2{,}718$, $\\left(1+\\frac{1}{x}\\right)^{x}$ adierazpenaren limitea $x\\to+\\infty$ denean.', '$e\\approx 2{,}718$, el límite de $\\left(1+\\frac{1}{x}\\right)^{x}$ cuando $x\\to+\\infty$.', '$e\\approx 2{,}718$، نهاية $\\left(1+\\frac{1}{x}\\right)^{x}$ عندما $x\\to+\\infty$.', '$e\\approx 2{,}718$, the limit of $\\left(1+\\frac{1}{x}\\right)^{x}$ as $x\\to+\\infty$.') }
        ],
        vocabulary: [
            say('oinarria', 'base', 'الأساس', 'base'),
            say('berretzailea', 'exponente', 'الأس', 'exponent')
        ],
        explanation: say(
            'Oinarria 1 baliora eta berretzailea $\\infty$ aldera doazenean, $1^{\\infty}$ indeterminazioa agertzen da. $e$ zenbakiarekin ebazten da: $\\lim f(x)^{g(x)}=e^{\\lim g(x)\\,(f(x)-1)}$. Segidetan $\\left(1+\\frac{1}{n}\\right)^{n}\\to e$ zen ideia bera da.',
            'Si la base tiende a 1 y el exponente a $\\infty$, aparece la indeterminación $1^{\\infty}$. Se resuelve con el número $e$: $\\lim f(x)^{g(x)}=e^{\\lim g(x)\\,(f(x)-1)}$. Es la misma idea que $\\left(1+\\frac{1}{n}\\right)^{n}\\to e$ en las sucesiones.',
            'إذا آل الأساس إلى 1 والأس إلى $\\infty$ ظهرت حالة عدم التعيين $1^{\\infty}$. وتُحل بالعدد $e$: $\\lim f(x)^{g(x)}=e^{\\lim g(x)\\,(f(x)-1)}$. إنها الفكرة نفسها التي رأيناها في المتتاليات: $\\left(1+\\frac{1}{n}\\right)^{n}\\to e$.',
            'If the base tends to 1 and the exponent to $\\infty$, the indeterminate form $1^{\\infty}$ appears. It is solved with the number $e$: $\\lim f(x)^{g(x)}=e^{\\lim g(x)\\,(f(x)-1)}$. It is the same idea as $\\left(1+\\frac{1}{n}\\right)^{n}\\to e$ in sequences.'
        ),
        examplePrompt: say('Kalkulatu $\\lim_{x\\to+\\infty}\\left(\\frac{x+2}{x}\\right)^{4x}$.', 'Calcula $\\lim_{x\\to+\\infty}\\left(\\frac{x+2}{x}\\right)^{4x}$.', 'احسب $\\lim_{x\\to+\\infty}\\left(\\frac{x+2}{x}\\right)^{4x}$.', 'Work out $\\lim_{x\\to+\\infty}\\left(\\frac{x+2}{x}\\right)^{4x}$.'),
        example: same('$e^{\\lim 4x\\cdot\\frac{2}{x}}=e^8$'),
        exampleAnswer: say('$\\frac{x+2}{x}-1=\\frac{2}{x}$ denez, limitea $e^8$ da.', 'Como $\\frac{x+2}{x}-1=\\frac{2}{x}$, el límite es $e^8$.', 'لأن $\\frac{x+2}{x}-1=\\frac{2}{x}$ فالنهاية $e^8$.', 'Since $\\frac{x+2}{x}-1=\\frac{2}{x}$, the limit is $e^8$.')
    },

    /* ---------- 4. Asymptotes ---------- */
    'vertical-horizontal': {
        definitions: [
            { term: say('Asintota horizontala', 'Asíntota horizontal', 'المقارب الأفقي', 'Horizontal asymptote'), meaning: say('$y=L$ zuzena, $f(x)\\to L$ bada $x\\to\\pm\\infty$ denean.', 'La recta $y=L$ si $f(x)\\to L$ cuando $x\\to\\pm\\infty$.', 'المستقيم $y=L$ إذا كانت $f(x)\\to L$ عندما $x\\to\\pm\\infty$.', 'The line $y=L$ if $f(x)\\to L$ as $x\\to\\pm\\infty$.') }
        ],
        vocabulary: [
            say('posizioa', 'posición', 'الموضع', 'position'),
            say('gainetik', 'por encima', 'فوق', 'above'),
            say('azpitik', 'por debajo', 'تحت', 'below')
        ],
        explanation: say(
            'Asintota bertikala dago, $x=a$, $f(x)\\to\\pm\\infty$ bada $x\\to a$ denean: arrazionaletan, izendatzailea anulatzen den eta zenbakitzailea anulatzen ez den lekuan. Asintota horizontala, $y=L$, $f(x)\\to L$ bada $x\\to\\pm\\infty$ denean. Kurbaren posizioa $f(x)-L$ adierazpenaren zeinuarekin ikusten da.',
            'Hay asíntota vertical $x=a$ si $f(x)\\to\\pm\\infty$ cuando $x\\to a$: en las racionales, donde se anula el denominador y no el numerador. Hay asíntota horizontal $y=L$ si $f(x)\\to L$ cuando $x\\to\\pm\\infty$. La posición de la curva se ve con el signo de $f(x)-L$.',
            'يوجد مقارب رأسي $x=a$ إذا كانت $f(x)\\to\\pm\\infty$ عندما $x\\to a$: وفي الدوال الكسرية حيث ينعدم المقام ولا ينعدم البسط. ويوجد مقارب أفقي $y=L$ إذا كانت $f(x)\\to L$ عندما $x\\to\\pm\\infty$. ويُعرف موضع المنحنى من إشارة $f(x)-L$.',
            'There is a vertical asymptote $x=a$ if $f(x)\\to\\pm\\infty$ as $x\\to a$: in rational functions, where the denominator is zero and the numerator is not. There is a horizontal asymptote $y=L$ if $f(x)\\to L$ as $x\\to\\pm\\infty$. The position of the curve comes from the sign of $f(x)-L$.'
        ),
        examplePrompt: say('Aurkitu $g(x)=\\frac{3}{x^2-1}$ funtzioaren asintotak.', 'Halla las asíntotas de $g(x)=\\frac{3}{x^2-1}$.', 'أوجد مقاربات $g(x)=\\frac{3}{x^2-1}$.', 'Find the asymptotes of $g(x)=\\frac{3}{x^2-1}$.'),
        example: same('$x^2-1=0\\ \\to\\ x=\\pm 1\\qquad\\lim_{x\\to\\pm\\infty}g(x)=0$'),
        exampleAnswer: say('Asintota bertikalak $x=1$ eta $x=-1$; horizontala $y=0$.', 'Asíntotas verticales $x=1$ y $x=-1$; horizontal, $y=0$.', 'المقاربان الرأسيان $x=1$ و$x=-1$، والأفقي $y=0$.', 'Vertical asymptotes $x=1$ and $x=-1$; horizontal, $y=0$.')
    },
    oblique: {
        definitions: [
            { term: say('Asintota zeiharra', 'Asíntota oblicua', 'المقارب المائل', 'Oblique asymptote'), meaning: say('$y=mx+n$ zuzena, $m\\neq 0$, kurba hari itsasten zaionean $x\\to\\pm\\infty$ denean.', 'La recta $y=mx+n$, con $m\\neq 0$, a la que se pega la curva cuando $x\\to\\pm\\infty$.', 'المستقيم $y=mx+n$ مع $m\\neq 0$ الذي يلتصق به المنحنى عندما $x\\to\\pm\\infty$.', 'The line $y=mx+n$, with $m\\neq 0$, that the curve hugs as $x\\to\\pm\\infty$.') }
        ],
        vocabulary: [
            say('zatiketa', 'división', 'القسمة', 'division'),
            say('zatidura', 'cociente', 'خارج القسمة', 'quotient'),
            say('hondarra', 'resto', 'الباقي', 'remainder')
        ],
        explanation: say(
            'Goiko maila behekoa baino bat handiagoa bada, kurba $y=mx+n$ zuzen bati itsasten zaio: asintota zeiharra. Zatiketa eginez lortzen da: zatidura zuzena da, eta hondarra zati zatitzailea 0 aldera doa. Beste modu batean: $m=\\lim\\frac{f(x)}{x}$ eta $n=\\lim(f(x)-mx)$.',
            'Si el grado de arriba es uno más que el de abajo, la curva se pega a una recta $y=mx+n$: la asíntota oblicua. Se obtiene con la división: el cociente es la recta, y el resto entre el divisor tiende a 0. También: $m=\\lim\\frac{f(x)}{x}$ y $n=\\lim(f(x)-mx)$.',
            'إذا زادت درجة البسط على درجة المقام بواحد التصق المنحنى بمستقيم $y=mx+n$: المقارب المائل. ونحصل عليه بالقسمة: خارج القسمة هو المستقيم، والباقي على المقسوم عليه يؤول إلى 0. أو: $m=\\lim\\frac{f(x)}{x}$ و$n=\\lim(f(x)-mx)$.',
            'If the top degree is one more than the bottom one, the curve hugs a line $y=mx+n$: the oblique asymptote. Do the division to get it: the quotient is the line, and the remainder over the divisor tends to 0. Also: $m=\\lim\\frac{f(x)}{x}$ and $n=\\lim(f(x)-mx)$.'
        ),
        examplePrompt: say('Aurkitu $g(x)=\\frac{2x^2-3x}{x+1}$ funtzioaren asintota zeiharra.', 'Halla la asíntota oblicua de $g(x)=\\frac{2x^2-3x}{x+1}$.', 'أوجد المقارب المائل لـ $g(x)=\\frac{2x^2-3x}{x+1}$.', 'Find the oblique asymptote of $g(x)=\\frac{2x^2-3x}{x+1}$.'),
        example: same('$\\frac{2x^2-3x}{x+1}=2x-5+\\frac{5}{x+1}$'),
        exampleAnswer: say('Asintota zeiharra $y=2x-5$ da.', 'La asíntota oblicua es $y=2x-5$.', 'المقارب المائل هو $y=2x-5$.', 'The oblique asymptote is $y=2x-5$.'),
        why: {
            text: say(
                'Zergatik da zatidura asintota? $f(x)=x+1+\\frac{2}{x-1}$ da, eta $\\frac{2}{x-1}\\to 0$: urrun, kurbak eta $y=x+1$ zuzenak ia bat egiten dute.',
                '¿Por qué el cociente es la asíntota? $f(x)=x+1+\\frac{2}{x-1}$, y $\\frac{2}{x-1}\\to 0$: lejos, la curva y la recta $y=x+1$ casi coinciden.',
                'لماذا يكون خارج القسمة هو المقارب؟ $f(x)=x+1+\\frac{2}{x-1}$ و$\\frac{2}{x-1}\\to 0$: بعيدًا يكاد المنحنى يتطابق مع المستقيم $y=x+1$.',
                'Why is the quotient the asymptote? $f(x)=x+1+\\frac{2}{x-1}$, and $\\frac{2}{x-1}\\to 0$: far away, the curve and the line $y=x+1$ almost match.'
            )
        }
    },
    branches: {
        vocabulary: [
            say('adarra', 'rama', 'الفرع', 'branch'),
            say('parabolikoa', 'parabólica', 'شلجمي', 'parabolic')
        ],
        explanation: say(
            'Funtzio arrazional batean, $x\\to\\pm\\infty$ denean dituen adarrak zenbakitzailearen eta izendatzailearen mailen arteko aldearen araberakoak dira. Asintota bertikalak zenbakitzailea anulatzen ez duten izendatzailearen zeroetan daude.',
            'En una función racional, las ramas cuando $x\\to\\pm\\infty$ dependen de la diferencia de grados entre el numerador y el denominador. Las asíntotas verticales están en los ceros del denominador que no anulan el numerador.',
            'في الدالة الكسرية تتوقف الفروع عندما $x\\to\\pm\\infty$ على الفرق بين درجتي البسط والمقام. والمقاربات الرأسية عند أصفار المقام التي لا تعدم البسط.',
            'In a rational function, the branches as $x\\to\\pm\\infty$ depend on the difference between the degrees of the numerator and the denominator. The vertical asymptotes are at the zeros of the denominator that do not make the numerator zero.'
        ),
        cases: [
            { title: say('Goian maila txikiagoa', 'Arriba, menor grado', 'درجة البسط أصغر', 'Lower degree on top'), text: say('Asintota horizontala $y=0$.', 'Asíntota horizontal $y=0$.', 'مقارب أفقي $y=0$.', 'Horizontal asymptote $y=0$.') },
            { title: say('Maila bera', 'Mismo grado', 'الدرجة نفسها', 'Same degree'), text: say('Asintota horizontala, gai nagusien koefizienteen zatidura.', 'Asíntota horizontal: el cociente de los coeficientes principales.', 'مقارب أفقي: خارج قسمة المعاملين الرئيسيين.', 'Horizontal asymptote: the quotient of the leading coefficients.') },
            { title: say('Goian maila bat gehiago', 'Arriba, un grado más', 'درجة البسط أكبر بواحد', 'One degree more on top'), text: say('Asintota zeiharra.', 'Asíntota oblicua.', 'مقارب مائل.', 'Oblique asymptote.') },
            { title: say('Goian bi maila gehiago edo gehiago', 'Arriba, dos o más grados más', 'درجة البسط أكبر باثنين أو أكثر', 'Two or more degrees more on top'), text: say('Adar parabolikoa: ez da inolako zuzeni hurbiltzen.', 'Rama parabólica: no se acerca a ninguna recta.', 'فرع شلجمي: لا يقترب من أي مستقيم.', 'Parabolic branch: it does not approach any line.') }
        ],
        examplePrompt: say('Zer adar eta asintota ditu $g(x)=\\frac{x^2-4}{x^2+x}$ funtzioak?', '¿Qué ramas y asíntotas tiene $g(x)=\\frac{x^2-4}{x^2+x}$?', 'ما فروع $g(x)=\\frac{x^2-4}{x^2+x}$ ومقارباتها؟', 'What branches and asymptotes does $g(x)=\\frac{x^2-4}{x^2+x}$ have?'),
        example: same('$x^2+x=x(x+1)\\qquad\\lim_{x\\to\\pm\\infty}g(x)=1$'),
        exampleAnswer: say('Asintota bertikalak $x=0$ eta $x=-1$; maila bera denez, asintota horizontala $y=1$.', 'Asíntotas verticales $x=0$ y $x=-1$; como tienen el mismo grado, asíntota horizontal $y=1$.', 'مقاربان رأسيان $x=0$ و$x=-1$؛ ولأن الدرجة نفسها فالمقارب الأفقي $y=1$.', 'Vertical asymptotes $x=0$ and $x=-1$; as the degrees are equal, horizontal asymptote $y=1$.')
    },

    /* ---------- 5. Continuity ---------- */
    continuous: {
        definitions: [
            { term: say('Funtzio jarraitua', 'Función continua', 'الدالة المتصلة', 'Continuous function'), meaning: say('$a$ puntuan jarraitua da $\\lim_{x\\to a}f(x)=f(a)$ bada.', 'Es continua en $a$ si $\\lim_{x\\to a}f(x)=f(a)$.', 'تكون متصلة عند $a$ إذا كانت $\\lim_{x\\to a}f(x)=f(a)$.', 'It is continuous at $a$ if $\\lim_{x\\to a}f(x)=f(a)$.') }
        ],
        vocabulary: [
            say('zatia', 'trozo', 'الجزء', 'piece'),
            say('jauzia', 'salto', 'القفزة', 'jump')
        ],
        explanation: say(
            'Funtzio bat $a$ puntuan jarraitua izateko, hiru gauza behar dira: $f(a)$ egotea, limitea egotea eta biak berdinak izatea. Funtzio elementalak jarraituak dira beren izate-eremuan. Zatika definitutako funtzioetan, lotune bakoitza aztertu behar da: alboko limiteek eta funtzioaren balioak bat etorri behar dute.',
            'Una función es continua en $a$ si se cumplen tres cosas: existe $f(a)$, existe el límite y los dos son iguales. Las funciones elementales son continuas en su dominio. En las funciones a trozos hay que estudiar cada unión: los límites laterales y el valor de la función tienen que coincidir.',
            'تكون الدالة متصلة عند $a$ إذا تحققت ثلاثة أمور: توجد $f(a)$، وتوجد النهاية، وتتساويان. والدوال الأساسية متصلة في مجالها. وفي الدوال المعرّفة على أجزاء ندرس كل نقطة التقاء: يجب أن تتساوى النهايتان الجانبيتان وقيمة الدالة.',
            'A function is continuous at $a$ if three things hold: $f(a)$ exists, the limit exists and they are equal. Elementary functions are continuous on their domain. In piecewise functions each joint must be studied: the one-sided limits and the value of the function must match.'
        ),
        examplePrompt: say('Jarraitua al da 0 puntuan $g(x)=\\begin{cases}\\frac{x^2+3x}{x} & x\\neq 0\\\\ 3 & x=0\\end{cases}$?', '¿Es continua en 0 la función $g(x)=\\begin{cases}\\frac{x^2+3x}{x} & x\\neq 0\\\\ 3 & x=0\\end{cases}$?', 'هل الدالة $g(x)=\\begin{cases}\\frac{x^2+3x}{x} & x\\neq 0\\\\ 3 & x=0\\end{cases}$ متصلة عند 0؟', 'Is $g(x)=\\begin{cases}\\frac{x^2+3x}{x} & x\\neq 0\\\\ 3 & x=0\\end{cases}$ continuous at 0?'),
        example: same('$\\lim_{x\\to 0}\\frac{x^2+3x}{x}=\\lim_{x\\to 0}(x+3)=3=g(0)$'),
        exampleAnswer: say('Bai: limitea 3 da, $g(0)$ bezala.', 'Sí: el límite vale 3, igual que $g(0)$.', 'نعم: النهاية 3 مثل $g(0)$.', 'Yes: the limit is 3, the same as $g(0)$.')
    },
    discontinuities: {
        vocabulary: [
            say('zuloa', 'agujero', 'الثقب', 'hole'),
            say('jauzia', 'salto', 'القفزة', 'jump')
        ],
        explanation: say(
            'Funtzio bat jarraitua ez denean, etenune mota alboko limiteek esaten dute. Biak berdinak eta finituak badira, gaindigarria da: zulo bat edo lekuz kanpoko puntu bat. Finituak baina desberdinak badira, jauzi finitua. Bat infinitua bada, jauzi infinitua: asintota bertikala.',
            'Cuando una función no es continua, el tipo de discontinuidad lo dicen los límites laterales. Si son iguales y finitos, es evitable: un agujero o un punto fuera de su sitio. Si son finitos pero distintos, salto finito. Si alguno es infinito, salto infinito: una asíntota vertical.',
            'عندما لا تكون الدالة متصلة تحدد النهايتان الجانبيتان نوع الانقطاع. إذا كانتا متساويتين ومنتهيتين فهو قابل للإزالة: ثقب أو نقطة في غير مكانها. وإذا كانتا منتهيتين ومختلفتين فقفزة منتهية. وإذا كانت إحداهما لانهائية فقفزة لانهائية: مقارب رأسي.',
            'When a function is not continuous, the one-sided limits tell the kind of discontinuity. If they are equal and finite, it is removable: a hole or a point out of place. If they are finite but different, a finite jump. If one is infinite, an infinite jump: a vertical asymptote.'
        ),
        cases: [
            { title: say('Gaindigarria', 'Evitable', 'قابل للإزالة', 'Removable'), text: say('Limitea badago, baina $f(a)$ ez dago edo desberdina da.', 'El límite existe, pero $f(a)$ no existe o es distinto.', 'النهاية موجودة لكن $f(a)$ غير موجودة أو مختلفة.', 'The limit exists, but $f(a)$ does not exist or is different.') },
            { title: say('Jauzi finitua', 'Salto finito', 'قفزة منتهية', 'Finite jump'), text: say('Alboko limiteak finituak eta desberdinak dira.', 'Los límites laterales son finitos y distintos.', 'النهايتان الجانبيتان منتهيتان ومختلفتان.', 'The one-sided limits are finite and different.') },
            { title: say('Jauzi infinitua', 'Salto infinito', 'قفزة لانهائية', 'Infinite jump'), text: say('Alboko limiteren bat infinitua da.', 'Algún límite lateral es infinito.', 'إحدى النهايتين الجانبيتين لانهائية.', 'One of the one-sided limits is infinite.') }
        ],
        examplePrompt: say('Zer etenune du $E(x)$ funtzioak $x=2$ puntuan?', '¿Qué discontinuidad tiene $E(x)$ en $x=2$?', 'ما نوع انقطاع $E(x)$ عند $x=2$؟', 'What discontinuity does $E(x)$ have at $x=2$?'),
        example: same('$\\lim_{x\\to 2^-}E(x)=1\\qquad\\lim_{x\\to 2^+}E(x)=2$'),
        exampleAnswer: say('Jauzi finitua: alboko limiteak badaude, baina desberdinak dira.', 'Salto finito: los laterales existen, pero son distintos.', 'قفزة منتهية: النهايتان الجانبيتان موجودتان لكنهما مختلفتان.', 'Finite jump: the one-sided limits exist, but they are different.')
    },
    bolzano: {
        definitions: [
            { term: say('Bolzanoren teorema', 'Teorema de Bolzano', 'مبرهنة بولتسانو', 'Bolzano\'s theorem'), meaning: say('$f$ jarraitua bada $[a,b]$ tartean eta $f(a)$ eta $f(b)$ zeinu desberdinekoak badira, $c\\in(a,b)$ bat dago, $f(c)=0$ duena.', 'Si $f$ es continua en $[a,b]$ y $f(a)$ y $f(b)$ tienen distinto signo, hay un $c\\in(a,b)$ con $f(c)=0$.', 'إذا كانت $f$ متصلة على $[a,b]$ وكان لـ $f(a)$ و$f(b)$ إشارتان مختلفتان فيوجد $c\\in(a,b)$ بحيث $f(c)=0$.', 'If $f$ is continuous on $[a,b]$ and $f(a)$ and $f(b)$ have different signs, there is a $c\\in(a,b)$ with $f(c)=0$.') }
        ],
        vocabulary: [
            say('erroa', 'raíz', 'الجذر', 'root'),
            say('tartea', 'intervalo', 'المجال', 'interval'),
            say('zeinua', 'signo', 'الإشارة', 'sign')
        ],
        explanation: say(
            'Bolzanoren teoremak ziurtatzen du tarte batean erro bat dagoela, kalkulatu gabe: funtzioa jarraitua izan behar da, eta muturretan zeinu desberdina izan. Ez du esaten zenbat erro dauden, ezta non dagoen zehazki. Funtzioa jarraitua ez bada, ezin da erabili.',
            'El teorema de Bolzano asegura que hay una raíz en un intervalo sin calcularla: la función tiene que ser continua y cambiar de signo en los extremos. No dice cuántas raíces hay ni dónde está exactamente. Si la función no es continua, no se puede usar.',
            'تضمن مبرهنة بولتسانو وجود جذر في مجال دون حسابه: يجب أن تكون الدالة متصلة وأن تتغير إشارتها بين الطرفين. ولا تقول كم جذرًا هناك ولا أين يقع بالضبط. وإذا لم تكن الدالة متصلة فلا يمكن استعمالها.',
            'Bolzano\'s theorem guarantees a root in an interval without working it out: the function must be continuous and change sign between the ends. It does not say how many roots there are or exactly where. If the function is not continuous, it cannot be used.'
        ),
        examplePrompt: say('Ba al du $x^3-3x+1=0$ ekuazioak soluziorik $(0,1)$ tartean?', '¿Tiene $x^3-3x+1=0$ alguna solución en $(0,1)$?', 'هل للمعادلة $x^3-3x+1=0$ حل في $(0,1)$؟', 'Does $x^3-3x+1=0$ have a solution in $(0,1)$?'),
        example: same('$f(0)=1>0\\qquad f(1)=-1<0$'),
        exampleAnswer: say('Bai: polinomioa jarraitua da eta zeinua aldatzen du; beraz, erro bat dago 0 eta 1 artean.', 'Sí: el polinomio es continuo y cambia de signo, así que hay una raíz entre 0 y 1.', 'نعم: الحدودية متصلة وتتغير إشارتها، إذن يوجد جذر بين 0 و1.', 'Yes: the polynomial is continuous and changes sign, so there is a root between 0 and 1.'),
        why: {
            text: say(
                'Zergatik funtzionatzen du? X ardatzaren azpian hasi eta gainean amaitzen den grafiko jarraitu batek ezin du ardatzaren gainetik jauzi egin: moztu egin behar du.',
                '¿Por qué funciona? Una gráfica continua que empieza por debajo del eje X y acaba por encima no puede saltar el eje: tiene que cruzarlo.',
                'لماذا تعمل؟ الرسم المتصل الذي يبدأ تحت محور X وينتهي فوقه لا يمكنه أن يقفز فوق المحور: لا بد أن يقطعه.',
                'Why does it work? A continuous graph that starts below the x-axis and ends above it cannot jump over the axis: it has to cross it.'
            )
        }
    }
}
