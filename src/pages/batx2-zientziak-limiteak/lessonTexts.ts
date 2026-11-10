import type { LessonTexts } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from '../batx1-zientziak-funtzioak/text.ts'
import type { Bach2LimitsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Limiteak eta jarraitutasuna · Batxilergoa 2 · Zientziak — what each
   lesson tells: the new words (definitions), a short explanation, the
   example as an exercise («Another example»), the key words in four
   languages and, in five lessons, «Why does it work?». Plain data so the
   tests can import it; lessons.tsx merges it into the topics and gives
   \sin and \tan each language's names. The example uses numbers of its
   own, never those of «Let's solve», of «Check it» or of the typical
   mistake. Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

export const bach2LimitsLessonTexts: Record<Bach2LimitsTopicId, LessonTexts> = {
    /* ---------- 1. Review of 1.º ---------- */
    'review-point': {
        definitions: [
            { term: say('Indeterminazioa', 'Indeterminación', 'عدم التعيين', 'Indeterminate form'), meaning: say('$\\frac{0}{0}$ bezalako forma bat: bere emaitza ez da jakiten eragiketa gehiago egin gabe.', 'Una forma como $\\frac{0}{0}$ cuyo resultado no se sabe sin operar más.', 'صورة مثل $\\frac{0}{0}$ لا تُعرف نتيجتها دون حساب إضافي.', 'A form such as $\\frac{0}{0}$ whose result is not known without more work.') }
        ],
        vocabulary: [
            say('ordezkatu', 'sustituir', 'التعويض', 'substitute'),
            say('faktorizatu', 'factorizar', 'التحليل', 'factorise'),
            say('zeinua', 'signo', 'الإشارة', 'sign')
        ],
        explanation: say(
            'Puntu bateko limitea beti ordezkatuz hasten da. Zenbaki bat ateratzen bada, hori da limitea. $\\frac{k}{0}$ ateratzen bada, $k\\neq 0$ izanik, limitea infinitua da: zeinua alde bakoitzean aztertzen da. $\\frac{0}{0}$ ateratzen bada, eragiketak egin behar dira: faktorizatu eta sinplifikatu, edo konjokatuaz biderkatu erroak badaude.',
            'Un límite en un punto empieza siempre sustituyendo. Si sale un número, ese es el límite. Si sale $\\frac{k}{0}$ con $k\\neq 0$, el límite es infinito: se estudia el signo a cada lado. Si sale $\\frac{0}{0}$, hay que operar: factorizar y simplificar, o multiplicar por el conjugado si hay raíces.',
            'تبدأ النهاية عند نقطة دائمًا بالتعويض. إذا ظهر عدد فهو النهاية. وإذا ظهرت $\\frac{k}{0}$ مع $k\\neq 0$ فالنهاية لانهائية: تُدرس الإشارة على كل جانب. وإذا ظهرت $\\frac{0}{0}$ فلا بد من الحساب: التحليل والاختصار، أو الضرب في المرافق إذا وُجدت جذور.',
            'A limit at a point always starts by substituting. If you get a number, that is the limit. If you get $\\frac{k}{0}$ with $k\\neq 0$, the limit is infinite: study the sign on each side. If you get $\\frac{0}{0}$, you must work: factorise and cancel, or multiply by the conjugate if there are roots.'
        ),
        examplePrompt: say('Kalkulatu $\\lim_{x\\to 1}\\frac{\\sqrt{x+3}-2}{x-1}$.', 'Calcula $\\lim_{x\\to 1}\\frac{\\sqrt{x+3}-2}{x-1}$.', 'احسب $\\lim_{x\\to 1}\\frac{\\sqrt{x+3}-2}{x-1}$.', 'Work out $\\lim_{x\\to 1}\\frac{\\sqrt{x+3}-2}{x-1}$.'),
        example: same('$\\begin{gathered}\\frac{x-1}{(x-1)(\\sqrt{x+3}+2)}\\\\ =\\frac{1}{\\sqrt{x+3}+2}\\\\ \\to\\ \\frac{1}{\\sqrt{4}+2}=\\frac{1}{4}\\end{gathered}$'),
        exampleAnswer: say('Erroekin konjokatua erabiltzen da: limitea $\\frac{1}{4}$ da.', 'Con raíces se usa el conjugado: el límite es $\\frac{1}{4}$.', 'مع الجذور نستعمل المرافق: النهاية $\\frac{1}{4}$.', 'With roots you use the conjugate: the limit is $\\frac{1}{4}$.')
    },
    'review-infinity': {
        definitions: [
            { term: say('Konjokatua', 'Conjugado', 'المرافق', 'Conjugate'), meaning: say('$\\sqrt{A}+B$ da $\\sqrt{A}-B$ adierazpenaren konjokatua; biderkatuz gero, erroa desagertzen da: $A-B^2$.', '$\\sqrt{A}+B$ es el conjugado de $\\sqrt{A}-B$; su producto quita la raíz: $A-B^2$.', '$\\sqrt{A}+B$ هو مرافق $\\sqrt{A}-B$؛ وجداؤهما يزيل الجذر: $A-B^2$.', '$\\sqrt{A}+B$ is the conjugate of $\\sqrt{A}-B$; their product removes the root: $A-B^2$.') }
        ],
        vocabulary: [
            say('maila', 'grado', 'الدرجة', 'degree'),
            say('zatidura', 'cociente', 'خارج القسمة', 'quotient')
        ],
        explanation: say(
            'Infinituan, polinomioen zatidura batek ($\\frac{\\infty}{\\infty}$) mailen arabera erabakitzen du: maila handiagoa goian, $\\infty$; behean, 0; bera, koefiziente nagusien zatidura. $\\infty-\\infty$ zatidura bihurtzen da konjokatuaz edo izendatzaile komunarekin. $1^{\\infty}$ forma $e$ zenbakira darama.',
            'En el infinito, un cociente de polinomios ($\\frac{\\infty}{\\infty}$) se decide por los grados: más grado arriba, $\\infty$; abajo, 0; el mismo, el cociente de los coeficientes principales. $\\infty-\\infty$ se convierte en un cociente con el conjugado o con un denominador común. $1^{\\infty}$ lleva al número $e$.',
            'عند اللانهاية يُحسم خارج قسمة حدوديتين ($\\frac{\\infty}{\\infty}$) بالدرجات: درجة أكبر في البسط تعطي $\\infty$، وفي المقام 0، ومع الدرجة نفسها خارج قسمة المعاملين الرئيسيين. وتتحول $\\infty-\\infty$ إلى خارج قسمة بالمرافق أو بتوحيد المقامات. وتقود $1^{\\infty}$ إلى العدد $e$.',
            'At infinity, a quotient of polynomials ($\\frac{\\infty}{\\infty}$) is decided by the degrees: higher degree on top, $\\infty$; below, 0; the same, the quotient of the leading coefficients. $\\infty-\\infty$ becomes a quotient with the conjugate or with a common denominator. $1^{\\infty}$ leads to the number $e$.'
        ),
        examplePrompt: say('Kalkulatu $\\lim_{x\\to+\\infty}\\frac{5x^3-2x}{1-2x^3}$.', 'Calcula $\\lim_{x\\to+\\infty}\\frac{5x^3-2x}{1-2x^3}$.', 'احسب $\\lim_{x\\to+\\infty}\\frac{5x^3-2x}{1-2x^3}$.', 'Work out $\\lim_{x\\to+\\infty}\\frac{5x^3-2x}{1-2x^3}$.'),
        example: same('$\\frac{5x^3}{-2x^3}=-\\frac{5}{2}$'),
        exampleAnswer: say('Maila bera: limitea koefiziente nagusien zatidura da, $-\\frac{5}{2}$.', 'Mismo grado: el límite es el cociente de los coeficientes principales, $-\\frac{5}{2}$.', 'الدرجة نفسها: النهاية هي خارج قسمة المعاملين الرئيسيين، $-\\frac{5}{2}$.', 'Same degree: the limit is the quotient of the leading coefficients, $-\\frac{5}{2}$.')
    },
    'review-continuity': {
        definitions: [
            { term: say('Etenune saihesgarria', 'Discontinuidad evitable', 'انقطاع قابل للإزالة', 'Removable discontinuity'), meaning: say('Limitea badago, baina $f(a)$ ez dago edo beste balio bat du: $f(a)$ limitearen balioarekin ordezkatuz konpontzen da.', 'Existe el límite, pero $f(a)$ no existe o vale otra cosa: se arregla dando a $f(a)$ el valor del límite.', 'توجد النهاية لكن $f(a)$ غير موجودة أو لها قيمة أخرى: يُصلَح بإعطاء $f(a)$ قيمة النهاية.', 'The limit exists, but $f(a)$ does not exist or has another value: it is mended by giving $f(a)$ the value of the limit.') }
        ],
        vocabulary: [
            say('jauzia', 'salto', 'القفزة', 'jump'),
            say('izendatzailea', 'denominador', 'المقام', 'denominator')
        ],
        explanation: say(
            'Funtzio bat jarraitua da $a$ puntuan, arkatza altxatu gabe marraz badaiteke $a$ puntutik igarotzean: $f(a)$ badago, limitea badago eta berdinak dira. Huts egiten badu, hiru etenune mota daude: saihesgarria (limitea dago), jauzi finitukoa (alboko limiteak desberdinak) eta jauzi infinitukoa (alboko limiteren bat infinitua).',
            'Una función es continua en $a$ cuando se puede dibujar sin levantar el lápiz al pasar por $a$: existe $f(a)$, existe el límite y coinciden. Si falla, hay tres tipos de discontinuidad: evitable (hay límite), de salto finito (laterales distintos) y de salto infinito (algún lateral es infinito).',
            'تكون الدالة متصلة عند $a$ إذا أمكن رسمها دون رفع القلم عند المرور بـ $a$: توجد $f(a)$ وتوجد النهاية وتتساويان. وإذا اختل ذلك فهناك ثلاثة أنواع من الانقطاع: القابل للإزالة (توجد نهاية)، والقفزة المنتهية (نهايتان جانبيتان مختلفتان)، والقفزة اللانهائية (إحدى النهايتين لانهائية).',
            'A function is continuous at $a$ when it can be drawn without lifting the pencil as it passes $a$: $f(a)$ exists, the limit exists and they are equal. If it fails, there are three kinds of discontinuity: removable (there is a limit), finite jump (different one-sided limits) and infinite jump (some one-sided limit is infinite).'
        ),
        examplePrompt: say('Sailkatu $g(x)=\\frac{x^2-4x}{x-4}$ funtzioaren etenunea $x=4$ puntuan.', 'Clasifica la discontinuidad de $g(x)=\\frac{x^2-4x}{x-4}$ en $x=4$.', 'صنّف انقطاع $g(x)=\\frac{x^2-4x}{x-4}$ عند $x=4$.', 'Classify the discontinuity of $g(x)=\\frac{x^2-4x}{x-4}$ at $x=4$.'),
        example: same('$\\frac{x(x-4)}{x-4}=x\\ \\to\\ 4$'),
        exampleAnswer: say('Limitea badago (4), baina $g(4)$ ez: etenune saihesgarria.', 'Existe el límite (4), pero no $g(4)$: discontinuidad evitable.', 'النهاية موجودة (4) لكن $g(4)$ غير موجودة: انقطاع قابل للإزالة.', 'The limit exists (4), but $g(4)$ does not: a removable discontinuity.')
    },

    /* ---------- 2. The exact definition ---------- */
    'epsilon-delta': {
        definitions: [
            { term: say('$\\varepsilon$ banda', 'La banda $\\varepsilon$', 'الشريط $\\varepsilon$', 'The $\\varepsilon$ band'), meaning: say('$L-\\varepsilon$ eta $L+\\varepsilon$ arteko altuerak: $L$ baliotik zenbateraino hurbil nahi dugun $f(x)$.', 'Las alturas entre $L-\\varepsilon$ y $L+\\varepsilon$: lo cerca de $L$ que queremos que quede $f(x)$.', 'الارتفاعات بين $L-\\varepsilon$ و$L+\\varepsilon$: مدى القرب من $L$ الذي نريده لـ $f(x)$.', 'The heights between $L-\\varepsilon$ and $L+\\varepsilon$: how close to $L$ we want $f(x)$ to be.') },
            { term: say('$\\delta$ zerrenda', 'La franja $\\delta$', 'الشريحة $\\delta$', 'The $\\delta$ strip'), meaning: say('$x$ balioak, $a-\\delta$ eta $a+\\delta$ artean ($a$ gabe): $a$ baliotik zenbateraino hurbil hartu behar den $x$.', 'Las $x$ entre $a-\\delta$ y $a+\\delta$ (sin $a$): lo cerca de $a$ que hay que tomar $x$.', 'قيم $x$ بين $a-\\delta$ و$a+\\delta$ (دون $a$): مقدار ما يجب أن نأخذ $x$ قريبًا من $a$.', 'The values of $x$ between $a-\\delta$ and $a+\\delta$ (without $a$): how close to $a$ you must take $x$.') }
        ],
        vocabulary: [
            say('distantzia', 'distancia', 'المسافة', 'distance'),
            say('banda', 'banda', 'الشريط', 'band')
        ],
        explanation: say(
            '$f(x)$ funtzioa $L$ baliora doala esateak esan nahi du nahi bezain hurbil jar dezakegula $L$ baliotik. Distantzia bat aukeratzen dugu, $\\varepsilon$, eta beste bat bilatzen dugu, $\\delta$: $x$ aldagaia $\\delta$ baino gutxiagora badago $a$ baliotik ($a$ izan gabe), $f(x)$ funtzioa $\\varepsilon$ baino gutxiagora dago $L$ baliotik. $\\varepsilon$ guztietarako bete behar da.',
            'Decir que $f(x)$ tiende a $L$ es decir que podemos ponerla tan cerca de $L$ como queramos. Elegimos una distancia $\\varepsilon$ y buscamos una distancia $\\delta$: si $x$ está a menos de $\\delta$ de $a$ (sin ser $a$), $f(x)$ está a menos de $\\varepsilon$ de $L$. Tiene que funcionar para todo $\\varepsilon$.',
            'القول إن $f(x)$ تؤول إلى $L$ يعني أننا نستطيع جعلها قريبة من $L$ بقدر ما نريد. نختار مسافة $\\varepsilon$ ونبحث عن مسافة $\\delta$: إذا كان $x$ على بعد أقل من $\\delta$ من $a$ (دون أن يساوي $a$) فإن $f(x)$ على بعد أقل من $\\varepsilon$ من $L$. ويجب أن يصلح ذلك لكل $\\varepsilon$.',
            'Saying that $f(x)$ tends to $L$ means we can make it as close to $L$ as we like. We choose a distance $\\varepsilon$ and look for a distance $\\delta$: if $x$ is less than $\\delta$ away from $a$ (without being $a$), $f(x)$ is less than $\\varepsilon$ away from $L$. It has to work for every $\\varepsilon$.'
        ),
        examplePrompt: say('$\\lim_{x\\to 2}(5x+1)=11$ limitean, aurkitu $\\delta$ handiena, $\\varepsilon=0{,}05$ baliorako balio duena.', 'Para $\\lim_{x\\to 2}(5x+1)=11$, halla el mayor $\\delta$ que sirve con $\\varepsilon=0{,}05$.', 'في النهاية $\\lim_{x\\to 2}(5x+1)=11$، أوجد أكبر $\\delta$ تصلح مع $\\varepsilon=0{,}05$.', 'For $\\lim_{x\\to 2}(5x+1)=11$, find the largest $\\delta$ that works with $\\varepsilon=0{,}05$.'),
        example: same('$\\begin{gathered}|5x+1-11|=5|x-2|<0{,}05\\\\ \\delta=0{,}05\\div 5=0{,}01\\end{gathered}$'),
        exampleAnswer: say('$\\delta\\le 0{,}01$ guztiek balio dute; handiena $\\delta=0{,}01$ da.', 'Sirve cualquier $\\delta\\le 0{,}01$; el mayor es $\\delta=0{,}01$.', 'تصلح كل $\\delta\\le 0{,}01$؛ وأكبرها $\\delta=0{,}01$.', 'Any $\\delta\\le 0{,}01$ works; the largest is $\\delta=0{,}01$.'),
        why: {
            text: say(
                'Zergatik $\\delta=\\frac{\\varepsilon}{3}$? Zuzenaren malda 3 delako: $x$ aldagaiaren urrats bakoitza 3 aldiz handiagoa da altueran. $\\varepsilon$ baino gehiago ez igotzeko, $x$ aldagaiak $\\frac{\\varepsilon}{3}$ bakarrik mugi daiteke.',
                '¿Por qué $\\delta=\\frac{\\varepsilon}{3}$? Porque la recta tiene pendiente 3: cada paso en $x$ se hace tres veces mayor en altura. Para no subir más de $\\varepsilon$, $x$ solo puede moverse $\\frac{\\varepsilon}{3}$.',
                'لماذا $\\delta=\\frac{\\varepsilon}{3}$؟ لأن ميل المستقيم 3: كل خطوة في $x$ تصبح أكبر بثلاث مرات في الارتفاع. وكي لا نرتفع أكثر من $\\varepsilon$ لا يمكن لـ $x$ أن يتحرك إلا $\\frac{\\varepsilon}{3}$.',
                'Why $\\delta=\\frac{\\varepsilon}{3}$? Because the line has slope 3: each step in $x$ becomes three times bigger in height. Not to rise more than $\\varepsilon$, $x$ can only move $\\frac{\\varepsilon}{3}$.'
            ),
            math: same('$\\varepsilon=0{,}6\\ \\to\\ \\delta=0{,}6\\div 3=0{,}2$')
        }
    },
    'infinite-definitions': {
        definitions: [
            { term: say('Limitea infinituan', 'Límite en el infinito', 'النهاية عند اللانهاية', 'Limit at infinity'), meaning: say('$f(x)$ nahi bezain hurbil geratzen da $L$ baliotik $x=K$ batetik aurrera.', '$f(x)$ se queda tan cerca de $L$ como queramos a partir de un $x=K$.', 'تبقى $f(x)$ قريبة من $L$ بقدر ما نريد ابتداءً من $x=K$ ما.', '$f(x)$ stays as close to $L$ as we like from some $x=K$ on.') },
            { term: say('Limite infinitua', 'Límite infinito', 'النهاية اللانهائية', 'Infinite limit'), meaning: say('$f(x)$ funtzioak edozein $M$ altuera gainditzen du $x$ aski hurbil dagoenean $a$ baliotik.', '$f(x)$ supera cualquier altura $M$ cuando $x$ está bastante cerca de $a$.', 'تتجاوز $f(x)$ أي ارتفاع $M$ عندما يكون $x$ قريبًا بما يكفي من $a$.', '$f(x)$ goes above any height $M$ when $x$ is close enough to $a$.') }
        ],
        vocabulary: [
            say('aurrera', 'a partir de', 'ابتداءً من', 'from … on'),
            say('altuera', 'altura', 'الارتفاع', 'height')
        ],
        explanation: say(
            'Infinituan ez dago hurbiltzeko $a$ punturik: $\\delta$ zerrenda «$x=K$ baliotik aurrera» bihurtzen da. Eta limite infinitu batek ez du $L$ baliorik: banda «$M$ baino gorago» bihurtzen da. Ideia bera da: eskatzen duguna une batetik aurrera betetzen da, eskakizuna zein handia izan.',
            'En el infinito no hay un punto $a$ al que acercarse: la franja $\\delta$ se cambia por «a partir de $x=K$». Y un límite infinito no tiene $L$: la banda se cambia por «más alto que $M$». La idea es la misma: lo que pedimos se cumple desde cierto momento en adelante, por exigente que sea.',
            'عند اللانهاية لا توجد نقطة $a$ نقترب منها: تصبح الشريحة $\\delta$ «ابتداءً من $x=K$». والنهاية اللانهائية ليست لها $L$: يصبح الشريط «أعلى من $M$». والفكرة واحدة: ما نطلبه يتحقق ابتداءً من لحظة ما، مهما كان الطلب صعبًا.',
            'At infinity there is no point $a$ to approach: the $\\delta$ strip becomes «from $x=K$ on». And an infinite limit has no $L$: the band becomes «higher than $M$». The idea is the same: what we ask holds from some moment on, however demanding it is.'
        ),
        examplePrompt: say('$\\lim_{x\\to 0}\\frac{1}{x^2}=+\\infty$ dela jakinda, zein $\\delta$ baliok egiten du $\\frac{1}{x^2}>10\\,000$ izatea?', 'Sabiendo que $\\lim_{x\\to 0}\\frac{1}{x^2}=+\\infty$, ¿qué $\\delta$ hace que $\\frac{1}{x^2}>10\\,000$?', 'إذا علمت أن $\\lim_{x\\to 0}\\frac{1}{x^2}=+\\infty$، فأي $\\delta$ تجعل $\\frac{1}{x^2}>10\\,000$؟', 'Knowing that $\\lim_{x\\to 0}\\frac{1}{x^2}=+\\infty$, which $\\delta$ makes $\\frac{1}{x^2}>10\\,000$?'),
        example: same('$\\frac{1}{x^2}>10\\,000\\ \\to\\ x^2<0{,}0001\\ \\to\\ |x|<0{,}01$'),
        exampleAnswer: say('$\\delta=0{,}01$ balio du: $0<|x|<0{,}01$ bada, $\\frac{1}{x^2}$ altuera hori baino gorago dago.', 'Sirve $\\delta=0{,}01$: si $0<|x|<0{,}01$, $\\frac{1}{x^2}$ queda por encima de esa altura.', 'تصلح $\\delta=0{,}01$: إذا كان $0<|x|<0{,}01$ فإن $\\frac{1}{x^2}$ فوق ذلك الارتفاع.', '$\\delta=0{,}01$ works: if $0<|x|<0{,}01$, $\\frac{1}{x^2}$ is above that height.')
    },
    'minus-infinity': {
        definitions: [
            { term: say('Aldagai-aldaketa', 'Cambio de variable', 'تغيير المتغير', 'Change of variable'), meaning: say('$x=-t$: $x\\to-\\infty$ denean, $t\\to+\\infty$.', '$x=-t$: cuando $x\\to-\\infty$, $t\\to+\\infty$.', '$x=-t$: عندما $x\\to-\\infty$ فإن $t\\to+\\infty$.', '$x=-t$: as $x\\to-\\infty$, $t\\to+\\infty$.') }
        ],
        vocabulary: [
            say('negatiboa', 'negativo', 'سالب', 'negative'),
            say('erroak', 'raíces', 'الجذور', 'roots')
        ],
        explanation: say(
            '$x\\to-\\infty$ denean mailek $+\\infty$ aldean bezala agintzen dute, baina zeinuei erreparatu behar zaie. Seguruena $x$ eta $-t$ trukatzea da: horrela $t\\to+\\infty$ eta dena positiboa da. Erro karratu batekin, $\\sqrt{x^2}$ adierazpena $|x|$ da, eta $x$ negatiboa denean $-x$ balio du.',
            'Cuando $x\\to-\\infty$ los grados mandan igual que en $+\\infty$, pero hay que vigilar los signos. Lo más seguro es cambiar $x$ por $-t$: así $t\\to+\\infty$ y todo es positivo. Con una raíz cuadrada, $\\sqrt{x^2}$ es $|x|$, que para $x$ negativo vale $-x$.',
            'عندما $x\\to-\\infty$ تتحكم الدرجات كما عند $+\\infty$، لكن يجب الانتباه للإشارات. والأضمن أن نستبدل بـ $x$ القيمة $-t$: هكذا $t\\to+\\infty$ ويصبح كل شيء موجبًا. ومع الجذور التربيعية تكون $\\sqrt{x^2}$ هي $|x|$، وعندما يكون $x$ سالبًا تساوي $-x$.',
            'As $x\\to-\\infty$ the degrees rule as at $+\\infty$, but you must watch the signs. The safest is to change $x$ into $-t$: then $t\\to+\\infty$ and everything is positive. With a square root, $\\sqrt{x^2}$ is $|x|$, which, for negative $x$, is $-x$.'
        ),
        examplePrompt: say('Kalkulatu $\\lim_{x\\to-\\infty}\\frac{3x}{\\sqrt{4x^2+5}}$.', 'Calcula $\\lim_{x\\to-\\infty}\\frac{3x}{\\sqrt{4x^2+5}}$.', 'احسب $\\lim_{x\\to-\\infty}\\frac{3x}{\\sqrt{4x^2+5}}$.', 'Work out $\\lim_{x\\to-\\infty}\\frac{3x}{\\sqrt{4x^2+5}}$.'),
        example: same('$x=-t\\ \\to\\ \\frac{-3t}{\\sqrt{4t^2+5}}\\ \\to\\ \\frac{-3t}{2t}=-\\frac{3}{2}$'),
        exampleAnswer: say('Limitea $-\\frac{3}{2}$ da; $+\\infty$ aldean $\\frac{3}{2}$ litzateke.', 'El límite es $-\\frac{3}{2}$; en $+\\infty$ sería $\\frac{3}{2}$.', 'النهاية $-\\frac{3}{2}$؛ وعند $+\\infty$ تكون $\\frac{3}{2}$.', 'The limit is $-\\frac{3}{2}$; at $+\\infty$ it would be $\\frac{3}{2}$.')
    },

    /* ---------- 3. Infinities and notable limits ---------- */
    orders: {
        definitions: [
            { term: say('Ordena handiagoko infinitua', 'Infinito de mayor orden', 'لانهاية من رتبة أكبر', 'Infinity of higher order'), meaning: say('$f$ ordena handiagokoa da $g$ baino $\\frac{f}{g}\\to\\infty$ bada; $g\\ll f$ idazten da.', '$f$ es de mayor orden que $g$ si $\\frac{f}{g}\\to\\infty$; se escribe $g\\ll f$.', 'تكون $f$ من رتبة أكبر من $g$ إذا كان $\\frac{f}{g}\\to\\infty$؛ ونكتب $g\\ll f$.', '$f$ is of higher order than $g$ if $\\frac{f}{g}\\to\\infty$; we write $g\\ll f$.') }
        ],
        vocabulary: [
            say('esponentziala', 'exponencial', 'الأسية', 'exponential'),
            say('logaritmoa', 'logaritmo', 'اللوغاريتم', 'logarithm'),
            say('berreketa', 'potencia', 'القوة', 'power')
        ],
        explanation: say(
            '$x\\to+\\infty$ denean, infinitu guztiak ez dira abiadura berean hazten. $a^x$ esponentzial orok, $a>1$ izanik, azkenean irabazten dio edozein berreketari, hasieran atzetik joan arren; eta edozein berreketak irabazten dio logaritmoari. Zatidura batean ordena handienekoak bakarrik du garrantzia.',
            'Cuando $x\\to+\\infty$, no todos los infinitos crecen igual de rápido. Cualquier exponencial $a^x$ con $a>1$ acaba ganando a cualquier potencia, aunque al principio vaya por detrás, y cualquier potencia gana al logaritmo. En un cociente solo cuenta el de mayor orden.',
            'عندما $x\\to+\\infty$ لا تكبر كل اللانهايات بالسرعة نفسها. فكل أسية $a^x$ مع $a>1$ تتفوق في النهاية على أي قوة، ولو تأخرت في البداية، وكل قوة تتفوق على اللوغاريتم. وفي خارج القسمة لا يهم إلا ذو الرتبة الأكبر.',
            'As $x\\to+\\infty$, not all infinities grow equally fast. Any exponential $a^x$ with $a>1$ ends up beating any power, even if it starts behind, and any power beats the logarithm. In a quotient only the one of highest order counts.'
        ),
        examplePrompt: say('Kalkulatu $\\lim_{x\\to+\\infty}\\frac{\\ln x}{\\sqrt{x}}$ eta $\\lim_{x\\to+\\infty}\\frac{x^{10}}{1{,}1^x}$.', 'Calcula $\\lim_{x\\to+\\infty}\\frac{\\ln x}{\\sqrt{x}}$ y $\\lim_{x\\to+\\infty}\\frac{x^{10}}{1{,}1^x}$.', 'احسب $\\lim_{x\\to+\\infty}\\frac{\\ln x}{\\sqrt{x}}$ و$\\lim_{x\\to+\\infty}\\frac{x^{10}}{1{,}1^x}$.', 'Work out $\\lim_{x\\to+\\infty}\\frac{\\ln x}{\\sqrt{x}}$ and $\\lim_{x\\to+\\infty}\\frac{x^{10}}{1{,}1^x}$.'),
        example: same('$\\ln x\\ll\\sqrt{x}\\ \\to\\ 0\\qquad x^{10}\\ll 1{,}1^x\\ \\to\\ 0$'),
        exampleAnswer: say('Bi limiteak 0 dira: beheko infinitua ordena handiagokoa da.', 'Los dos límites valen 0: el de abajo es un infinito de mayor orden.', 'النهايتان تساويان 0: لانهاية المقام من رتبة أكبر.', 'Both limits are 0: the one below is an infinity of higher order.'),
        why: {
            text: say(
                'Zergatik irabazten du esponentzialak? $x$ aldagaiari 1 gehitzean, $x^{10}$ gero eta gutxiago hazten da proportzioan, baina $1{,}1^x$ beti $1{,}1$ zenbakiaz biderkatzen da. Luzera, beti gauza beraz biderkatzeak irabazten du.',
                '¿Por qué gana la exponencial? Al sumar 1 a $x$, $x^{10}$ crece cada vez menos en proporción, pero $1{,}1^x$ siempre se multiplica por $1{,}1$. A la larga, multiplicar siempre por lo mismo gana.',
                'لماذا تتفوق الأسية؟ عند إضافة 1 إلى $x$ تكبر $x^{10}$ نسبيًّا أقل فأقل، أما $1{,}1^x$ فتُضرب دائمًا في $1{,}1$. وعلى المدى الطويل يفوز الضرب الدائم في العدد نفسه.',
                'Why does the exponential win? Adding 1 to $x$, $x^{10}$ grows less and less in proportion, but $1{,}1^x$ is always multiplied by $1{,}1$. In the long run, always multiplying by the same number wins.'
            ),
            math: same('$\\frac{(x+1)^{10}}{x^{10}}\\to 1\\qquad\\frac{1{,}1^{x+1}}{1{,}1^x}=1{,}1$')
        }
    },
    'one-infinity': {
        definitions: [
            { term: say('$1^{\\infty}$ indeterminazioa', 'Indeterminación $1^{\\infty}$', 'عدم التعيين $1^{\\infty}$', 'The $1^{\\infty}$ form'), meaning: say('Berreketa bat: oinarria 1 baliora doa eta berretzailea $\\infty$ aldera.', 'Una potencia cuya base tiende a 1 y cuyo exponente tiende a $\\infty$.', 'قوة يؤول أساسها إلى 1 ويؤول أسها إلى $\\infty$.', 'A power whose base tends to 1 and whose exponent tends to $\\infty$.') }
        ],
        vocabulary: [
            say('oinarria', 'base', 'الأساس', 'base'),
            say('berretzailea', 'exponente', 'الأس', 'exponent')
        ],
        explanation: say(
            'Oinarria 1 baliora hurbiltzen bada eta berretzailea mugarik gabe hazten bada, emaitza ez da begi-bistan ikusten: edozein zenbaki izan daiteke. $e^{\\lim g\\,(f-1)}$ formulak ebazten du. Berdin balio du puntu batean eta infinituan, $f\\to 1$ eta $g\\to\\infty$ bakarrik erabiltzen dituelako.',
            'Si la base se acerca a 1 y el exponente crece sin límite, el resultado no se ve a simple vista: puede dar cualquier número. La fórmula $e^{\\lim g\\,(f-1)}$ lo resuelve. Sirve igual en un punto que en el infinito, porque solo usa que $f\\to 1$ y $g\\to\\infty$.',
            'إذا اقترب الأساس من 1 وكبر الأس بلا حد فالنتيجة لا تُرى بالعين: قد تكون أي عدد. والصيغة $e^{\\lim g\\,(f-1)}$ تحلّها. وتصلح عند نقطة كما عند اللانهاية، لأنها لا تستعمل إلا $f\\to 1$ و$g\\to\\infty$.',
            'If the base approaches 1 and the exponent grows without bound, the result cannot be seen at a glance: it can be any number. The formula $e^{\\lim g\\,(f-1)}$ solves it. It works at a point as well as at infinity, because it only uses $f\\to 1$ and $g\\to\\infty$.'
        ),
        examplePrompt: say('Kalkulatu $\\lim_{x\\to+\\infty}\\left(\\frac{x+4}{x}\\right)^{3x}$.', 'Calcula $\\lim_{x\\to+\\infty}\\left(\\frac{x+4}{x}\\right)^{3x}$.', 'احسب $\\lim_{x\\to+\\infty}\\left(\\frac{x+4}{x}\\right)^{3x}$.', 'Work out $\\lim_{x\\to+\\infty}\\left(\\frac{x+4}{x}\\right)^{3x}$.'),
        example: same('$3x\\left(\\frac{x+4}{x}-1\\right)=3x\\cdot\\frac{4}{x}=12\\ \\to\\ e^{12}$'),
        exampleAnswer: say('Limitea $e^{12}$ da.', 'El límite es $e^{12}$.', 'النهاية $e^{12}$.', 'The limit is $e^{12}$.'),
        why: {
            text: say(
                'Zergatik agertzen da $e$? $(1+u)^{\\frac{1}{u}}\\to e$ delako $u\\to 0$ denean. $f=1+u$ idatziz, berreketa $\\left[(1+u)^{\\frac{1}{u}}\\right]^{u\\,g}$ da, eta berretzailea $u\\,g=g\\,(f-1)$.',
                '¿Por qué aparece $e$? Porque $(1+u)^{\\frac{1}{u}}\\to e$ cuando $u\\to 0$. Escribiendo $f=1+u$, la potencia es $\\left[(1+u)^{\\frac{1}{u}}\\right]^{u\\,g}$, y el exponente $u\\,g=g\\,(f-1)$.',
                'لماذا يظهر $e$؟ لأن $(1+u)^{\\frac{1}{u}}\\to e$ عندما $u\\to 0$. وبكتابة $f=1+u$ تصبح القوة $\\left[(1+u)^{\\frac{1}{u}}\\right]^{u\\,g}$، والأس $u\\,g=g\\,(f-1)$.',
                'Why does $e$ appear? Because $(1+u)^{\\frac{1}{u}}\\to e$ as $u\\to 0$. Writing $f=1+u$, the power is $\\left[(1+u)^{\\frac{1}{u}}\\right]^{u\\,g}$, and the exponent $u\\,g=g\\,(f-1)$.'
            )
        }
    },
    'sine-limit': {
        definitions: [
            { term: say('Radiana', 'Radián', 'الراديان', 'Radian'), meaning: say('Erradioa bezain luzea den arku batek hartzen duen angelua; $\\pi$ radian $180^\\circ$ dira.', 'El ángulo que abarca un arco tan largo como el radio; $\\pi$ radianes son $180^\\circ$.', 'الزاوية التي يحصرها قوس طوله يساوي نصف القطر؛ و$\\pi$ راديان تساوي $180^\\circ$.', 'The angle spanned by an arc as long as the radius; $\\pi$ radians are $180^\\circ$.') }
        ],
        vocabulary: [
            say('sinua', 'seno', 'الجيب', 'sine'),
            say('tangentea', 'tangente', 'الظل', 'tangent')
        ],
        explanation: say(
            '0 inguruan, $x$ radianetan dagoela, angelu baten sinua ia angelua bera da: $\\sin 0{,}1\\approx 0{,}0998$. Horregatik $\\frac{\\sin x}{x}\\to 1$. Ariketetan $\\frac{\\sin u}{u}$ itxura bilatzen da, $u\\to 0$ izanik, behar dena biderkatuz eta zatituz.',
            'Cerca de 0, con $x$ en radianes, el seno de un ángulo es casi igual que el propio ángulo: $\\sin 0{,}1\\approx 0{,}0998$. Por eso $\\frac{\\sin x}{x}\\to 1$. En los ejercicios se busca la forma $\\frac{\\sin u}{u}$ con $u\\to 0$, multiplicando y dividiendo por lo que haga falta.',
            'قرب 0، ومع $x$ بالراديان، يكون الجيب لزاوية مساويًا تقريبًا للزاوية نفسها: $\\sin 0{,}1\\approx 0{,}0998$. لذلك $\\frac{\\sin x}{x}\\to 1$. وفي التمارين نبحث عن الصورة $\\frac{\\sin u}{u}$ مع $u\\to 0$، بالضرب والقسمة على ما يلزم.',
            'Near 0, with $x$ in radians, the sine of an angle is almost the angle itself: $\\sin 0{,}1\\approx 0{,}0998$. That is why $\\frac{\\sin x}{x}\\to 1$. In exercises you look for the shape $\\frac{\\sin u}{u}$ with $u\\to 0$, multiplying and dividing by whatever is needed.'
        ),
        examplePrompt: say('Kalkulatu $\\lim_{x\\to 0}\\frac{\\tan 4x}{3x}$.', 'Calcula $\\lim_{x\\to 0}\\frac{\\tan 4x}{3x}$.', 'احسب $\\lim_{x\\to 0}\\frac{\\tan 4x}{3x}$.', 'Work out $\\lim_{x\\to 0}\\frac{\\tan 4x}{3x}$.'),
        example: same('$\\frac{\\tan 4x}{3x}=\\frac{4}{3}\\cdot\\frac{\\tan 4x}{4x}\\ \\to\\ \\frac{4}{3}$'),
        exampleAnswer: say('$\\frac{\\tan u}{u}\\to 1$ ere bai: limitea $\\frac{4}{3}$ da.', 'También $\\frac{\\tan u}{u}\\to 1$: el límite es $\\frac{4}{3}$.', 'وكذلك $\\frac{\\tan u}{u}\\to 1$: النهاية $\\frac{4}{3}$.', 'Also $\\frac{\\tan u}{u}\\to 1$: the limit is $\\frac{4}{3}$.'),
        why: {
            text: say(
                'Zergatik $\\frac{\\sin x}{x}\\to 1$? 1 erradioko zirkunferentzian, $\\sin x$ zuzenkia $x$ arkua baino laburragoa da, eta arkua $\\tan x$ baino laburragoa. $\\sin x$ adierazpenaz zatituz, $\\frac{x}{\\sin x}$ 1 eta $\\frac{1}{\\cos x}$ artean geratzen da, eta azken hori 1 baliora doa.',
                '¿Por qué $\\frac{\\sin x}{x}\\to 1$? En la circunferencia de radio 1, el segmento $\\sin x$ es más corto que el arco $x$, y este más corto que $\\tan x$. Dividiendo entre $\\sin x$, $\\frac{x}{\\sin x}$ queda entre 1 y $\\frac{1}{\\cos x}$, que tiende a 1.',
                'لماذا $\\frac{\\sin x}{x}\\to 1$؟ في دائرة نصف قطرها 1 تكون القطعة $\\sin x$ أقصر من القوس $x$، والقوس أقصر من $\\tan x$. وبالقسمة على $\\sin x$ تبقى $\\frac{x}{\\sin x}$ بين 1 و$\\frac{1}{\\cos x}$ التي تؤول إلى 1.',
                'Why $\\frac{\\sin x}{x}\\to 1$? On the circle of radius 1, the segment $\\sin x$ is shorter than the arc $x$, and the arc shorter than $\\tan x$. Dividing by $\\sin x$, $\\frac{x}{\\sin x}$ stays between 1 and $\\frac{1}{\\cos x}$, which tends to 1.'
            ),
            math: same('$\\sin x<x<\\tan x$')
        }
    },

    /* ---------- 4. Continuity in depth ---------- */
    interval: {
        definitions: [
            { term: say('Eskuinetik jarraitua', 'Continua por la derecha', 'متصلة من اليمين', 'Continuous from the right'), meaning: say('$\\lim_{x\\to a^+}f(x)=f(a)$; ezkerretik, $x\\to a^-$ hartuz.', '$\\lim_{x\\to a^+}f(x)=f(a)$; por la izquierda, con $x\\to a^-$.', '$\\lim_{x\\to a^+}f(x)=f(a)$؛ ومن اليسار مع $x\\to a^-$.', '$\\lim_{x\\to a^+}f(x)=f(a)$; from the left, with $x\\to a^-$.') }
        ],
        vocabulary: [
            say('muturra', 'extremo', 'الطرف', 'end'),
            say('izate-eremua', 'dominio', 'المجال', 'domain')
        ],
        explanation: say(
            'Tarte ireki batean nahikoa da puntu bakoitzean jarraitua izatea. Tarte itxi baten muturrean alde bakarra dago; beraz, alde horretako alboko limitea eskatzen da. Funtzio elementalak eta haien konbinazioak jarraituak dira beren izate-eremu osoan: arazoak izate-eremua mozten den tokian daude.',
            'En un intervalo abierto basta con ser continua en cada punto. En un extremo de un intervalo cerrado solo existe un lado, así que se pide el límite lateral de ese lado. Las funciones elementales y sus combinaciones son continuas en todo su dominio: los problemas están donde el dominio se corta.',
            'في الفترة المفتوحة يكفي أن تكون الدالة متصلة عند كل نقطة. وعند طرف الفترة المغلقة لا يوجد إلا جانب واحد، لذلك نطلب النهاية الجانبية لذلك الجانب. والدوال الأساسية وتركيباتها متصلة على كل مجالها: المشاكل حيث ينقطع المجال.',
            'On an open interval it is enough to be continuous at each point. At an end of a closed interval there is only one side, so you ask for the one-sided limit on that side. Elementary functions and their combinations are continuous on their whole domain: the problems are where the domain breaks.'
        ),
        examplePrompt: say('Zein tartetan da jarraitua $g(x)=\\frac{\\ln x}{x-2}$ funtzioa?', '¿En qué intervalos es continua $g(x)=\\frac{\\ln x}{x-2}$?', 'على أي فترات تكون $g(x)=\\frac{\\ln x}{x-2}$ متصلة؟', 'On which intervals is $g(x)=\\frac{\\ln x}{x-2}$ continuous?'),
        example: same('$x>0\\qquad x\\neq 2$'),
        exampleAnswer: say('$(0,2)$ eta $(2,+\\infty)$ tarteetan: logaritmoak $x>0$ eskatzen du eta izendatzailea ezin da 0 izan.', 'En $(0,2)$ y en $(2,+\\infty)$: el logaritmo pide $x>0$ y el denominador no puede ser 0.', 'على $(0,2)$ وعلى $(2,+\\infty)$: اللوغاريتم يشترط $x>0$ والمقام لا يمكن أن يكون 0.', 'On $(0,2)$ and on $(2,+\\infty)$: the logarithm needs $x>0$ and the denominator cannot be 0.')
    },
    parameter: {
        definitions: [
            { term: say('Parametroa', 'Parámetro', 'الوسيط', 'Parameter'), meaning: say('Zenbaki finko bat, oraindik ezezaguna, adierazten duen letra; hemen funtzioa jarraitua izateko aukeratzen da.', 'Una letra que vale un número fijo, todavía desconocido; aquí se elige para que la función sea continua.', 'حرف يمثل عددًا ثابتًا لم يُعرف بعد؛ ويُختار هنا لتكون الدالة متصلة.', 'A letter standing for a fixed number, still unknown; here it is chosen so that the function is continuous.') }
        ],
        vocabulary: [
            say('lotunea', 'unión', 'نقطة الالتقاء', 'joining point'),
            say('zatia', 'trozo', 'الجزء', 'piece')
        ],
        explanation: say(
            'Zati bakoitza, bere aldetik, jarraitua da bere tartean. Zalantzazko puntu bakarra lotunea da: han alboko limitea kalkulatu behar da alde bakoitzeko zatiarekin, eta $f$ funtzioaren balioa berdintza daraman zatiarekin. Hirurak berdinak badira, funtzioa jarraitua da.',
            'Cada trozo, por separado, es continuo en su intervalo. El único punto dudoso es la unión: allí hay que calcular el límite lateral con el trozo de cada lado y el valor de $f$ con el trozo que lleva el igual. Si los tres coinciden, la función es continua.',
            'كل جزء متصل وحده على فترته. والنقطة الوحيدة المشكوك فيها هي نقطة الالتقاء: هناك نحسب النهاية الجانبية بجزء كل جانب، وقيمة $f$ بالجزء الذي فيه المساواة. وإذا تساوت القيم الثلاث فالدالة متصلة.',
            'Each piece, on its own, is continuous on its interval. The only doubtful point is the joining point: there you work out the one-sided limit with the piece on each side, and the value of $f$ with the piece that carries the equals sign. If the three are equal, the function is continuous.'
        ),
        examplePrompt: say('Aurkitu $k$, funtzio hau $x=1$ puntuan jarraitua izan dadin: $g(x)=\\begin{cases}\\frac{x^2-1}{x-1} & x<1\\\\ \\ln x+k & x\\ge 1\\end{cases}$', 'Halla $k$ para que esta función sea continua en $x=1$: $g(x)=\\begin{cases}\\frac{x^2-1}{x-1} & x<1\\\\ \\ln x+k & x\\ge 1\\end{cases}$', 'أوجد $k$ لتكون هذه الدالة متصلة عند $x=1$: $g(x)=\\begin{cases}\\frac{x^2-1}{x-1} & x<1\\\\ \\ln x+k & x\\ge 1\\end{cases}$', 'Find $k$ so that this function is continuous at $x=1$: $g(x)=\\begin{cases}\\frac{x^2-1}{x-1} & x<1\\\\ \\ln x+k & x\\ge 1\\end{cases}$'),
        example: same('$\\lim_{x\\to 1^-}(x+1)=2\\qquad\\ln 1+k=k\\ \\to\\ k=2$'),
        exampleAnswer: say('$k=2$ denean, bi aldeak altuera berera iristen dira.', 'Con $k=2$ los dos lados llegan a la misma altura.', 'مع $k=2$ يصل الجانبان إلى الارتفاع نفسه.', 'With $k=2$ both sides reach the same height.')
    },
    'two-parameters': {
        vocabulary: [
            say('sistema', 'sistema', 'النظام', 'system'),
            say('ekuazioa', 'ecuación', 'معادلة', 'equation')
        ],
        explanation: say(
            'Hiru zati badaude, bi lotune daude, eta bakoitzak parametroak dituen ekuazio bat ematen du. Biek batera bi ekuazio eta bi ezezaguneko sistema bat osatzen dute. Sistemak soluzio bat badu, hori da funtzioa jarraitua izateko modu bakarra; ez badu, ez du ezein aukerak balio.',
            'Con tres trozos hay dos uniones, y cada una da una ecuación con los parámetros. Juntas forman un sistema de dos ecuaciones con dos incógnitas. Si el sistema tiene una solución, esa es la única forma de que la función sea continua; si no tiene, ninguna elección sirve.',
            'مع ثلاثة أجزاء توجد نقطتا التقاء، وكل واحدة تعطي معادلة فيها الوسيطان. ومعًا تكوّنان نظامًا من معادلتين بمجهولين. وإذا كان للنظام حل فهو الطريقة الوحيدة لتكون الدالة متصلة؛ وإن لم يكن له حل فلا يصلح أي اختيار.',
            'With three pieces there are two joints, and each gives an equation with the parameters. Together they make a system of two equations in two unknowns. If the system has a solution, that is the only way for the function to be continuous; if not, no choice works.'
        ),
        examplePrompt: say('Aurkitu $m$ eta $n$, funtzio hau $\\mathbb{R}$ osoan jarraitua izan dadin: $g(x)=\\begin{cases}mx & x<2\\\\ x+n & 2\\le x\\le 4\\\\ 2x+m & x>4\\end{cases}$', 'Halla $m$ y $n$ para que esta función sea continua en $\\mathbb{R}$: $g(x)=\\begin{cases}mx & x<2\\\\ x+n & 2\\le x\\le 4\\\\ 2x+m & x>4\\end{cases}$', 'أوجد $m$ و$n$ لتكون هذه الدالة متصلة على $\\mathbb{R}$: $g(x)=\\begin{cases}mx & x<2\\\\ x+n & 2\\le x\\le 4\\\\ 2x+m & x>4\\end{cases}$', 'Find $m$ and $n$ so that this function is continuous on $\\mathbb{R}$: $g(x)=\\begin{cases}mx & x<2\\\\ x+n & 2\\le x\\le 4\\\\ 2x+m & x>4\\end{cases}$'),
        example: same('$\\begin{gathered}2m=2+n\\\\ 4+n=8+m\\\\ m=6,\\ n=10\\end{gathered}$'),
        exampleAnswer: say('$m=6$ eta $n=10$ direnean, grafikoa ez da inon eteten.', 'Con $m=6$ y $n=10$ la gráfica no se corta en ningún punto.', 'مع $m=6$ و$n=10$ لا ينقطع الرسم في أي نقطة.', 'With $m=6$ and $n=10$ the graph does not break anywhere.')
    },

    /* ---------- 5. Theorems on continuous functions ---------- */
    'bolzano-equations': {
        definitions: [
            { term: say('$h=f-g$ funtzioa', 'La función $h=f-g$', 'الدالة $h=f-g$', 'The function $h=f-g$'), meaning: say('Bi funtzioen kenketa: zehazki $f$ eta $g$ ebakitzen diren tokian da zero.', 'La resta de las dos funciones: se anula justo donde $f$ y $g$ se cortan.', 'فرق الدالتين: ينعدم تمامًا حيث تتقاطع $f$ و$g$.', 'The difference of the two functions: it is 0 exactly where $f$ and $g$ cross.') }
        ],
        vocabulary: [
            say('ebaki-puntua', 'punto de corte', 'نقطة التقاطع', 'crossing point'),
            say('zeinua', 'signo', 'الإشارة', 'sign')
        ],
        explanation: say(
            'Funtzio jarraitu bat ezin da negatibotik positibora igaro ardatza zeharkatu gabe. Ekuazio batekin, dena alde batera eramaten da eta zeinu-aldaketa duen tarte bat bilatzen da. Bi kurba ebakitzen direla ikusteko, $h=f-g$ kenketari aplikatzen zaio: $h$ zero den tokian, bi kurbek altuera bera dute.',
            'Una función continua no puede pasar de negativa a positiva sin cruzar el eje. Para una ecuación, se pasa todo a un lado y se busca un intervalo con un cambio de signo. Para ver que dos curvas se cortan, se aplica a la resta $h=f-g$: donde $h$ se anula, las dos curvas tienen la misma altura.',
            'لا تستطيع الدالة المتصلة أن تنتقل من سالبة إلى موجبة دون أن تعبر المحور. ومع المعادلة ننقل كل شيء إلى طرف واحد ونبحث عن فترة فيها تغيّر في الإشارة. ولإثبات أن منحنيين يتقاطعان نطبّقها على الفرق $h=f-g$: حيث تنعدم $h$ يكون للمنحنيين الارتفاع نفسه.',
            'A continuous function cannot go from negative to positive without crossing the axis. For an equation, move everything to one side and look for an interval with a change of sign. To see that two curves cross, apply it to the difference $h=f-g$: where $h$ is 0, the two curves have the same height.'
        ),
        cases: [
            { title: say('Ekuazio bat', 'Una ecuación', 'معادلة', 'An equation'), text: say('Dena alde batera, $h(x)=0$, eta $h$ zeinuz aldatzen den tarte bat.', 'Todo a un lado, $h(x)=0$, y un intervalo donde $h$ cambie de signo.', 'كل شيء في طرف واحد، $h(x)=0$، وفترة تتغير فيها إشارة $h$.', 'Everything on one side, $h(x)=0$, and an interval where $h$ changes sign.'), math: same('$x^3=2-x\\ \\to\\ h(x)=x^3+x-2$') },
            { title: say('Bi kurba', 'Dos curvas', 'منحنيان', 'Two curves'), text: say('$f-g$ zero den tokian ebakitzen dira: Bolzano $h=f-g$ funtzioan.', 'Se cortan donde $f-g$ se anula: Bolzano en $h=f-g$.', 'يتقاطعان حيث تنعدم $f-g$: بولتسانو على $h=f-g$.', 'They cross where $f-g$ is 0: Bolzano on $h=f-g$.') },
            { title: say('Zenbat erro?', '¿Cuántas raíces?', 'كم جذرًا؟', 'How many roots?'), text: say('Zeinu-aldaketa duen tarte bakoitzak gutxienez erro bat ziurtatzen du: hiru aldaketa, gutxienez hiru erro.', 'Cada intervalo con cambio de signo asegura al menos una raíz: tres cambios, al menos tres raíces.', 'كل فترة فيها تغيّر في الإشارة تضمن جذرًا واحدًا على الأقل: ثلاثة تغيّرات، ثلاثة جذور على الأقل.', 'Each interval with a change of sign ensures at least one root: three changes, at least three roots.') }
        ],
        examplePrompt: say('Frogatu $\\ln x=2-x$ ekuazioak soluzio bat duela $(1,2)$ tartean.', 'Demuestra que $\\ln x=2-x$ tiene una solución en $(1,2)$.', 'أثبت أن للمعادلة $\\ln x=2-x$ حلًّا في $(1,2)$.', 'Prove that $\\ln x=2-x$ has a solution in $(1,2)$.'),
        example: same('$\\begin{gathered}h(x)=\\ln x+x-2\\\\ h(1)=-1<0\\\\ h(2)=\\ln 2>0\\end{gathered}$'),
        exampleAnswer: say('$h$ jarraitua da $[1,2]$ tartean eta zeinuz aldatzen da: $c\\in(1,2)$ bat dago $\\ln c=2-c$ izateko.', '$h$ es continua en $[1,2]$ y cambia de signo: hay un $c\\in(1,2)$ con $\\ln c=2-c$.', '$h$ متصلة على $[1,2]$ وتتغير إشارتها: يوجد $c\\in(1,2)$ بحيث $\\ln c=2-c$.', '$h$ is continuous on $[1,2]$ and changes sign: there is a $c\\in(1,2)$ with $\\ln c=2-c$.'),
        why: {
            text: say(
                'Zergatik da egia? $h(a)<0<h(b)$ bada, hartu erdiko puntua: han $h$ zero ez bada, bi tarte erdietako batek zeinu-aldaketa du berriro. Errepikatuz, tarteak $c$ puntu batera txikitzen dira, eta $h$ jarraitua denez, $h(c)=0$.',
                '¿Por qué es cierto? Si $h(a)<0<h(b)$, toma el punto medio: si $h$ no vale 0 allí, uno de los dos medios intervalos vuelve a tener cambio de signo. Repitiendo, los intervalos se encogen hacia un punto $c$, y como $h$ es continua, $h(c)=0$.',
                'لماذا هذا صحيح؟ إذا كان $h(a)<0<h(b)$ فخذ نقطة المنتصف: إن لم تكن $h$ صفرًا هناك ففي إحدى نصفي الفترة تغيّر في الإشارة من جديد. وبالتكرار تنكمش الفترات نحو نقطة $c$، ولأن $h$ متصلة فإن $h(c)=0$.',
                'Why is it true? If $h(a)<0<h(b)$, take the midpoint: if $h$ is not 0 there, one of the two half intervals has a change of sign again. Repeating, the intervals shrink towards a point $c$, and as $h$ is continuous, $h(c)=0$.'
            )
        }
    },
    intermediate: {
        definitions: [
            { term: say('Tarteko balioa', 'Valor intermedio', 'قيمة وسيطة', 'Intermediate value'), meaning: say('$k$ zenbaki bat, $f(a)$ eta $f(b)$ artekoa.', 'Un número $k$ entre $f(a)$ y $f(b)$.', 'عدد $k$ بين $f(a)$ و$f(b)$.', 'A number $k$ between $f(a)$ and $f(b)$.') }
        ],
        vocabulary: [
            say('balio bat hartu', 'tomar un valor', 'تأخذ قيمة', 'take a value'),
            say('artean', 'entre', 'بين', 'between')
        ],
        explanation: say(
            'Funtzio jarraitu bat altuera batean hasi eta beste batean amaitzen bada, tarteko altuera guztietatik igarotzen da: ezin du bat bera ere saltatu. Bolzano da, ardatzaren ordez $y=k$ zuzenarekin. $f(x)=k$ ekuazio batek soluzioa duela ziurtatzeko balio du, ebazten ez badakigu ere.',
            'Si una función continua empieza a una altura y termina a otra, pasa por todas las alturas intermedias: no puede saltarse ninguna. Es Bolzano con la recta $y=k$ en lugar del eje. Sirve para asegurar que una ecuación $f(x)=k$ tiene solución, aunque no sepamos resolverla.',
            'إذا بدأت دالة متصلة عند ارتفاع وانتهت عند آخر فإنها تمر بكل الارتفاعات بينهما: لا تستطيع أن تقفز فوق أي منها. إنها بولتسانو مع المستقيم $y=k$ مكان المحور. وتفيد في ضمان أن للمعادلة $f(x)=k$ حلًّا، ولو لم نعرف حلها.',
            'If a continuous function starts at one height and ends at another, it passes through every height in between: it cannot skip any. It is Bolzano with the line $y=k$ instead of the axis. It helps to ensure that an equation $f(x)=k$ has a solution, even if we cannot solve it.'
        ),
        examplePrompt: say('Soluziorik al du $2^x+x=6$ ekuazioak $[1,3]$ tartean?', '¿Tiene solución $2^x+x=6$ en $[1,3]$?', 'هل للمعادلة $2^x+x=6$ حل في $[1,3]$؟', 'Does $2^x+x=6$ have a solution in $[1,3]$?'),
        example: same('$\\begin{gathered}f(1)=2+1=3\\\\ f(3)=8+3=11\\\\ 3<6<11\\end{gathered}$'),
        exampleAnswer: say('Bai: $f(x)=2^x+x$ jarraitua da, eta 6 zenbakia 3 eta 11 artean dago.', 'Sí: $f(x)=2^x+x$ es continua y 6 está entre 3 y 11.', 'نعم: $f(x)=2^x+x$ متصلة و6 بين 3 و11.', 'Yes: $f(x)=2^x+x$ is continuous and 6 is between 3 and 11.')
    },
    weierstrass: {
        definitions: [
            { term: say('Maximo absolutua', 'Máximo absoluto', 'القيمة العظمى المطلقة', 'Absolute maximum'), meaning: say('$f$ funtzioak tarte osoan hartzen duen baliorik handiena.', 'El mayor valor que toma $f$ en todo el intervalo.', 'أكبر قيمة تأخذها $f$ على الفترة كلها.', 'The largest value that $f$ takes on the whole interval.') },
            { term: say('Tarte itxia', 'Intervalo cerrado', 'الفترة المغلقة', 'Closed interval'), meaning: say('$[a,b]$: bere bi muturrak barne hartzen ditu.', '$[a,b]$: incluye sus dos extremos.', '$[a,b]$: تضم طرفيها.', '$[a,b]$: it includes both its ends.') }
        ],
        vocabulary: [
            say('hartu', 'alcanzar', 'تبلغ', 'reach'),
            say('irekia', 'abierto', 'مفتوحة', 'open')
        ],
        explanation: say(
            'Tarte itxi batean jarraitua den funtzio batek ezin du gorantz ihes egin, ezta bere balio onenera iritsi gabe geratu ere: puntu altuena eta baxuena ditu. Bi gauzak behar dira. $(0,1]$ tartean, $\\frac{1}{x}$ mugarik gabe igotzen da; jauzi batekin, funtzioa altuera batera hurbil daiteke hura ukitu gabe.',
            'Una función continua en un intervalo cerrado no puede escaparse hacia arriba ni quedarse sin llegar a su mejor valor: tiene un punto más alto y uno más bajo. Hacen falta las dos cosas. En $(0,1]$, $\\frac{1}{x}$ sube sin límite; con un salto, la función puede acercarse a una altura sin tocarla.',
            'الدالة المتصلة على فترة مغلقة لا تستطيع أن تهرب إلى الأعلى ولا أن تبقى دون بلوغ أفضل قيمها: لها نقطة هي الأعلى وأخرى هي الأدنى. ويلزم الشرطان معًا. على $(0,1]$ ترتفع $\\frac{1}{x}$ بلا حد؛ ومع قفزة قد تقترب الدالة من ارتفاع دون أن تلمسه.',
            'A function continuous on a closed interval cannot escape upwards or stop short of its best value: it has a highest and a lowest point. Both conditions are needed. On $(0,1]$, $\\frac{1}{x}$ rises without bound; with a jump, the function can approach a height without touching it.'
        ),
        examplePrompt: say('$h(x)=\\begin{cases}x & 0\\le x<1\\\\ 0 & 1\\le x\\le 2\\end{cases}$ funtzioak maximo absolutua hartzen al du $[0,2]$ tartean?', '¿Alcanza $h(x)=\\begin{cases}x & 0\\le x<1\\\\ 0 & 1\\le x\\le 2\\end{cases}$ un máximo absoluto en $[0,2]$?', 'هل تبلغ $h(x)=\\begin{cases}x & 0\\le x<1\\\\ 0 & 1\\le x\\le 2\\end{cases}$ قيمة عظمى مطلقة على $[0,2]$؟', 'Does $h(x)=\\begin{cases}x & 0\\le x<1\\\\ 0 & 1\\le x\\le 2\\end{cases}$ reach an absolute maximum on $[0,2]$?'),
        example: same('$\\lim_{x\\to 1^-}h(x)=1\\qquad h(1)=0$'),
        exampleAnswer: say('Ez: 1 baliora hurbiltzen da, baina ez da inoiz iristen. Jarraitutasunak huts egiten du $x=1$ puntuan.', 'No: se acerca a 1 sin llegar nunca. Falla la continuidad en $x=1$.', 'لا: تقترب من 1 دون أن تبلغها أبدًا. ويختل الاتصال عند $x=1$.', 'No: it approaches 1 without ever reaching it. Continuity fails at $x=1$.')
    }
}
