import type { LessonTexts } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from '../batx1-zientziak-funtzioak/text.ts'
import type { Bach2gLimitsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Limiteak eta jarraitutasuna · Batxilergoa 2 · Gizarte Zientziak — what
   each lesson tells: the new words (definitions), a short explanation,
   the example as an exercise («Another example»), the key words in four
   languages and, in four lessons, «Why does it work?». Plain data so the
   tests can import it; lessons.tsx merges it into the topics. The example
   uses numbers of its own, never those of «Let's solve», of «Check it» or
   of the typical mistake. Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

export const bach2gLimitsLessonTexts: Record<Bach2gLimitsTopicId, LessonTexts> = {
    /* ---------- 1. The graph and infinity ---------- */
    branches: {
        definitions: [
            { term: say('Alboko limitea', 'Límite lateral', 'النهاية الجانبية', 'One-sided limit'), meaning: say('$x$ aldagaia $a$ baliora alde batetik bakarrik hurbiltzean $f$ hurbiltzen den balioa: $a^-$ ezkerretik, $a^+$ eskuinetik.', 'El valor al que se acerca $f$ cuando $x$ se acerca a $a$ por un solo lado: $a^-$ por la izquierda, $a^+$ por la derecha.', 'القيمة التي تقترب منها $f$ عندما يقترب $x$ من $a$ من جهة واحدة: $a^-$ من اليسار و$a^+$ من اليمين.', 'The value $f$ approaches as $x$ approaches $a$ from one side only: $a^-$ from the left, $a^+$ from the right.') }
        ],
        vocabulary: [
            say('kurba', 'curva', 'المنحنى', 'curve'),
            say('zuzena', 'recta', 'المستقيم', 'line'),
            say('ezkerra', 'izquierda', 'اليسار', 'left')
        ],
        explanation: say(
            'Limiteak grafikoan irakurtzen dira: $x$ ezkerrerantz edo eskuinerantz urruntzen denean, kurba zein altueratara hurbiltzen den begiratzen da. Puntu batean, alde bakoitza bere aldetik: kurba altuera batera hurbil daiteke edo gora edo behera joan mugarik gabe. Limitea ez da zertan lortu behar: hurbiltzea nahikoa da.',
            'Los límites se leen en la gráfica: cuando $x$ se aleja hacia la izquierda o la derecha, se mira a qué altura se acerca la curva. En un punto, cada lado por separado: la curva puede acercarse a una altura o subir o bajar sin fin. El límite no tiene por qué alcanzarse: basta con acercarse.',
            'تُقرأ النهايات على التمثيل البياني: عندما يبتعد $x$ نحو اليسار أو اليمين ننظر إلى الارتفاع الذي يقترب منه المنحنى. وعند نقطة يُنظر إلى كل جانب وحده: قد يقترب المنحنى من ارتفاع ما أو يصعد أو ينزل بلا حد. ولا يلزم بلوغ النهاية: يكفي الاقتراب منها.',
            'Limits are read on the graph: as $x$ moves far to the left or right, look at the height the curve approaches. At a point, each side on its own: the curve may approach a height or rise or fall without end. The limit need not be reached: getting close is enough.'
        ),
        examplePrompt: say('Irakurri $g(x)=\\frac{x}{x+1}$ funtzioaren limiteak grafikoan: $\\pm\\infty$ aldera eta $-1$ zenbakiaren alde bakoitzean.', 'Lee en la gráfica los límites de $g(x)=\\frac{x}{x+1}$: hacia $\\pm\\infty$ y a cada lado de $-1$.', 'اقرأ على التمثيل البياني نهايات $g(x)=\\frac{x}{x+1}$: نحو $\\pm\\infty$ وعلى جانبي $-1$.', 'Read on the graph the limits of $g(x)=\\frac{x}{x+1}$: towards $\\pm\\infty$ and on each side of $-1$.'),
        example: same('$\\begin{gathered}\\lim_{x\\to\\pm\\infty}g(x)=1\\\\ \\lim_{x\\to-1^-}g(x)=+\\infty\\\\ \\lim_{x\\to-1^+}g(x)=-\\infty\\end{gathered}$'),
        exampleAnswer: say('Muturretan $y=1$ zuzenera hurbiltzen da; $x=-1$ zuzenaren ondoan, ezkerrean gora eta eskuinean behera doa.', 'En los extremos se pega a la recta $y=1$; junto a $x=-1$, sube por la izquierda y baja por la derecha.', 'عند الطرفين يقترب من المستقيم $y=1$؛ وقرب $x=-1$ يصعد من اليسار وينزل من اليمين.', 'At the ends it hugs the line $y=1$; next to $x=-1$, it rises on the left and falls on the right.')
    },
    'infinity-arithmetic': {
        definitions: [
            { term: say('Zeinuen araua', 'Regla de los signos', 'قاعدة الإشارات', 'Rule of signs'), meaning: say('Biderkatzean eta zatitzean, zeinu berdinek $+$ ematen dute eta desberdinek $-$; infinituarekin ere bai.', 'Al multiplicar y dividir, signos iguales dan $+$ y distintos dan $-$; también con el infinito.', 'عند الضرب والقسمة تعطي الإشارتان المتماثلتان $+$ والمختلفتان $-$؛ ومع اللانهاية أيضًا.', 'When multiplying and dividing, equal signs give $+$ and different ones $-$; with infinity too.') }
        ],
        vocabulary: [
            say('batura', 'suma', 'المجموع', 'sum'),
            say('biderkadura', 'producto', 'الجداء', 'product'),
            say('zatidura', 'cociente', 'خارج القسمة', 'quotient')
        ],
        explanation: say(
            'Funtzio batzuen limiteak ezagutzen badira, haien batura, biderkadura edo zatiduraren limitea eragiketa bera eginez lortzen da. Infinituak oso zenbaki handi bat bezala jokatzen du: zenbaki bat gehituz gero ez da aldatzen, zenbaki batez biderkatuz infinitua da, eta zenbaki bat infinituaz zatituz 0 ateratzen da.',
            'Si se conocen los límites de unas funciones, el de su suma, producto o cociente se obtiene haciendo la misma operación. El infinito se porta como un número enorme: sumarle un número no lo cambia, multiplicado por un número sigue siendo infinito y un número dividido entre infinito da 0.',
            'إذا عُرفت نهايات بعض الدوال فإن نهاية مجموعها أو جدائها أو خارج قسمتها تُنال بإجراء العملية نفسها. وتتصرف اللانهاية كعدد ضخم جدًا: إضافة عدد إليها لا تغيّرها، وضربها في عدد يبقيها لانهاية، وقسمة عدد عليها تعطي 0.',
            'If the limits of some functions are known, the limit of their sum, product or quotient is found by doing the same operation. Infinity behaves like a huge number: adding a number does not change it, multiplied by a number it is still infinite, and a number divided by infinity gives 0.'
        ),
        examplePrompt: say('$x\\to+\\infty$ denean, $p(x)\\to-\\infty$ eta $q(x)\\to 5$. Zein da $p\\cdot q$ eta $\\frac{q}{p}$ funtzioen limitea?', 'Cuando $x\\to+\\infty$, $p(x)\\to-\\infty$ y $q(x)\\to 5$. ¿Cuál es el límite de $p\\cdot q$ y de $\\frac{q}{p}$?', 'عندما $x\\to+\\infty$ يكون $p(x)\\to-\\infty$ و$q(x)\\to 5$. ما نهاية $p\\cdot q$ و$\\frac{q}{p}$؟', 'As $x\\to+\\infty$, $p(x)\\to-\\infty$ and $q(x)\\to 5$. What is the limit of $p\\cdot q$ and of $\\frac{q}{p}$?'),
        example: same('$(-\\infty)\\cdot 5=-\\infty\\qquad\\frac{5}{-\\infty}=0$'),
        exampleAnswer: say('Biderkadura $-\\infty$ baliora doa eta zatidura 0 baliora.', 'El producto tiende a $-\\infty$ y el cociente a 0.', 'الجداء يؤول إلى $-\\infty$ وخارج القسمة إلى 0.', 'The product tends to $-\\infty$ and the quotient to 0.')
    },
    indeterminate: {
        definitions: [
            { term: say('Indeterminazioa', 'Indeterminación', 'عدم التعيين', 'Indeterminate form'), meaning: say('Emaitza zuzenean ematen ez duen forma: funtzio batzuekin zenbaki bat da, beste batzuekin 0 edo $\\infty$.', 'Una forma que no da el resultado directamente: con unas funciones sale un número, con otras 0 o $\\infty$.', 'صورة لا تعطي النتيجة مباشرة: مع بعض الدوال تعطي عددًا ومع غيرها 0 أو $\\infty$.', 'A form that does not give the result directly: with some functions it is a number, with others 0 or $\\infty$.') }
        ],
        vocabulary: [
            say('forma', 'forma', 'الصورة', 'form'),
            say('emaitza', 'resultado', 'النتيجة', 'result')
        ],
        explanation: say(
            'Batzuetan ordezkatzean ateratzen den formak ez du emaitza esaten. $\\infty-\\infty$ adibidez: $x^2-x$ baliora doa $+\\infty$ aldera, baina $(x+3)-x$ baliora 3. Forma horiek indeterminazioak dira eta adierazpena aldatu behar da (faktorizatu, konjokatua, $e$ zenbakia…). Gainerakoek emaitza zuzenean ematen dute.',
            'A veces la forma que sale al sustituir no dice el resultado. Por ejemplo $\\infty-\\infty$: $x^2-x$ tiende a $+\\infty$, pero $(x+3)-x$ tiende a 3. Esas formas son indeterminaciones y hay que transformar la expresión (factorizar, conjugado, número $e$…). Las demás dan el resultado directamente.',
            'أحيانًا لا تخبر الصورة الناتجة عن التعويض بالنتيجة. مثلًا $\\infty-\\infty$: ‏$x^2-x$ تؤول إلى $+\\infty$ لكن $(x+3)-x$ تؤول إلى 3. هذه الصور حالات عدم تعيين ويجب تحويل العبارة (التحليل، المرافق، العدد $e$…). أما البقية فتعطي النتيجة مباشرة.',
            'Sometimes the form you get by substituting does not tell the result. For example $\\infty-\\infty$: $x^2-x$ tends to $+\\infty$, but $(x+3)-x$ tends to 3. Those forms are indeterminate and the expression has to be transformed (factorise, conjugate, the number $e$…). The others give the result directly.'
        ),
        cases: [
            { title: say('Indeterminazioak', 'Indeterminaciones', 'حالات عدم التعيين', 'Indeterminate'), text: say('Zazpi forma: eragiketak egin behar dira.', 'Siete formas: hay que operar.', 'سبع صور: يجب الحساب.', 'Seven forms: you must work.'), math: same('$\\infty-\\infty\\quad 0\\cdot\\infty\\quad\\frac{0}{0}\\quad\\frac{\\infty}{\\infty}\\quad 1^{\\infty}\\quad\\infty^{0}\\quad 0^{0}$') },
            { title: say('Ez dira indeterminazioak', 'No son indeterminaciones', 'ليست حالات عدم تعيين', 'Not indeterminate'), text: say('Emaitza zuzenean dute.', 'Tienen el resultado directo.', 'لها نتيجة مباشرة.', 'They have a direct result.'), math: same('$\\frac{k}{0}=\\pm\\infty\\quad\\frac{0}{\\infty}=0\\quad\\infty\\cdot\\infty=\\infty\\quad 0^{\\infty}=0$') }
        ],
        examplePrompt: say('$x\\to 0$ denean, $p\\to 0$ eta $q\\to+\\infty$. Indeterminazioak al dira $p\\cdot q$, $\\frac{p}{q}$ eta $q^{p}$?', 'Cuando $x\\to 0$, $p\\to 0$ y $q\\to+\\infty$. ¿Son indeterminaciones $p\\cdot q$, $\\frac{p}{q}$ y $q^{p}$?', 'عندما $x\\to 0$ يكون $p\\to 0$ و$q\\to+\\infty$. هل $p\\cdot q$ و$\\frac{p}{q}$ و$q^{p}$ حالات عدم تعيين؟', 'As $x\\to 0$, $p\\to 0$ and $q\\to+\\infty$. Are $p\\cdot q$, $\\frac{p}{q}$ and $q^{p}$ indeterminate?'),
        example: same('$0\\cdot\\infty\\qquad\\frac{0}{\\infty}=0\\qquad\\infty^{0}$'),
        exampleAnswer: say('$p\\cdot q$ eta $q^{p}$ indeterminazioak dira; $\\frac{p}{q}$ ez: 0 baliora doa.', '$p\\cdot q$ y $q^{p}$ son indeterminaciones; $\\frac{p}{q}$ no: tiende a 0.', '$p\\cdot q$ و$q^{p}$ حالتا عدم تعيين؛ أما $\\frac{p}{q}$ فلا: تؤول إلى 0.', '$p\\cdot q$ and $q^{p}$ are indeterminate; $\\frac{p}{q}$ is not: it tends to 0.')
    },

    /* ---------- 2. Limits at infinity ---------- */
    degrees: {
        definitions: [
            { term: say('Koefiziente nagusia', 'Coeficiente principal', 'المعامل الرئيسي', 'Leading coefficient'), meaning: say('Maila handieneko gaiaren zenbakia: $3x^2-x$ polinomioan, 3.', 'El número del término de mayor grado: en $3x^2-x$, el 3.', 'عدد الحد ذي الدرجة الأكبر: في $3x^2-x$ هو 3.', 'The number of the term of highest degree: in $3x^2-x$, the 3.') }
        ],
        vocabulary: [
            say('maila', 'grado', 'الدرجة', 'degree'),
            say('polinomioa', 'polinomio', 'الحدودية', 'polynomial'),
            say('gaia', 'término', 'الحد', 'term')
        ],
        explanation: say(
            '$x$ oso handia denean, maila handieneko gaia besteak baino askoz handiagoa da: hark erabakitzen du. Polinomio batean, haren zeinuak ematen du $+\\infty$ edo $-\\infty$. Zatidura batean goiko eta beheko gai nagusiak alderatzen dira: maila handiagoa goian, infinitua; behean, 0; bera, koefizienteen zatidura.',
            'Cuando $x$ es muy grande, el término de mayor grado es muchísimo mayor que los demás: es el que decide. En un polinomio, su signo da $+\\infty$ o $-\\infty$. En un cociente se comparan los términos principales de arriba y abajo: más grado arriba, infinito; abajo, 0; el mismo, el cociente de los coeficientes.',
            'عندما يكون $x$ كبيرًا جدًا يكون الحد ذو الدرجة الأكبر أكبر بكثير من غيره: هو الذي يقرّر. في الحدودية تعطي إشارته $+\\infty$ أو $-\\infty$. وفي خارج القسمة نقارن الحدّين الرئيسيين في البسط والمقام: درجة أكبر في البسط لانهاية، وفي المقام 0، والدرجة نفسها خارج قسمة المعاملين.',
            'When $x$ is very large, the term of highest degree is far larger than the others: it decides. In a polynomial, its sign gives $+\\infty$ or $-\\infty$. In a quotient the leading terms on top and below are compared: higher degree on top, infinity; below, 0; the same, the quotient of the coefficients.'
        ),
        cases: [
            { title: say('Goian maila handiagoa', 'Más grado arriba', 'درجة أكبر في البسط', 'Higher degree on top'), text: say('Limitea $\\pm\\infty$ da.', 'El límite es $\\pm\\infty$.', 'النهاية $\\pm\\infty$.', 'The limit is $\\pm\\infty$.'), math: same('$\\frac{x^3}{5x^2}\\ \\to\\ +\\infty$') },
            { title: say('Maila bera', 'Mismo grado', 'الدرجة نفسها', 'Same degree'), text: say('Koefiziente nagusien zatidura.', 'El cociente de los coeficientes principales.', 'خارج قسمة المعاملين الرئيسيين.', 'The quotient of the leading coefficients.'), math: same('$\\frac{6x^2}{3x^2}=2$') },
            { title: say('Behean maila handiagoa', 'Más grado abajo', 'درجة أكبر في المقام', 'Higher degree below'), text: say('Limitea 0 da.', 'El límite es 0.', 'النهاية 0.', 'The limit is 0.'), math: same('$\\frac{7x}{x^2}\\ \\to\\ 0$') }
        ],
        examplePrompt: say('Enpresa baten batez besteko kostua $\\frac{5x^2+800}{x^2+40}$ da, $x$ unitate eginda. Zenbatera hurbiltzen da produkzioa asko handitzean?', 'El coste medio de una empresa es $\\frac{5x^2+800}{x^2+40}$ con $x$ unidades. ¿A cuánto se acerca cuando la producción crece mucho?', 'متوسط تكلفة شركة هو $\\frac{5x^2+800}{x^2+40}$ عند إنتاج $x$ وحدة. إلى أي قيمة يقترب عندما يكبر الإنتاج كثيرًا؟', 'A firm\'s average cost is $\\frac{5x^2+800}{x^2+40}$ with $x$ units. What does it approach when production grows a lot?'),
        example: same('$\\lim_{x\\to+\\infty}\\frac{5x^2+800}{x^2+40}=\\frac{5}{1}=5$'),
        exampleAnswer: say('Maila bera: 5 eurora hurbiltzen da unitateko.', 'Mismo grado: se acerca a 5 € por unidad.', 'الدرجة نفسها: يقترب من 5 € للوحدة.', 'Same degree: it approaches €5 per unit.'),
        why: {
            text: say(
                'Zergatik agintzen du maila handienak? Zatitu dena $x$ aldagaiaren berretura handienaz: gainerako gaiak $\\frac{k}{x}$ edo $\\frac{k}{x^2}$ bihurtzen dira, eta $x\\to\\infty$ denean 0 baliora doaz. Koefiziente nagusiak bakarrik geratzen dira.',
                '¿Por qué manda el mayor grado? Divide todo entre la mayor potencia de $x$: los demás términos se convierten en $\\frac{k}{x}$ o $\\frac{k}{x^2}$, que tienden a 0 cuando $x\\to\\infty$. Solo quedan los coeficientes principales.',
                'لماذا تتحكم الدرجة الأكبر؟ اقسم كل شيء على أكبر قوة لـ $x$: تصير الحدود الأخرى $\\frac{k}{x}$ أو $\\frac{k}{x^2}$ وتؤول إلى 0 عندما $x\\to\\infty$. ولا يبقى إلا المعاملان الرئيسيان.',
                'Why does the highest degree rule? Divide everything by the highest power of $x$: the other terms become $\\frac{k}{x}$ or $\\frac{k}{x^2}$, which tend to 0 as $x\\to\\infty$. Only the leading coefficients are left.'
            ),
            math: same('$\\frac{4x^2-3x}{2x^2+1}=\\frac{4-\\frac{3}{x}}{2+\\frac{1}{x^2}}\\ \\to\\ \\frac{4}{2}$')
        }
    },
    conjugate: {
        definitions: [
            { term: say('Konjokatua', 'Conjugado', 'المرافق', 'Conjugate'), meaning: say('$\\sqrt{A}+B$ da $\\sqrt{A}-B$ adierazpenaren konjokatua; biderkatuz gero, erroa desagertzen da: $A-B^2$.', '$\\sqrt{A}+B$ es el conjugado de $\\sqrt{A}-B$; su producto quita la raíz: $A-B^2$.', '$\\sqrt{A}+B$ هو مرافق $\\sqrt{A}-B$؛ وجداؤهما يزيل الجذر: $A-B^2$.', '$\\sqrt{A}+B$ is the conjugate of $\\sqrt{A}-B$; their product removes the root: $A-B^2$.') }
        ],
        vocabulary: [
            say('erroa', 'raíz', 'الجذر', 'root'),
            say('izendatzaile komuna', 'denominador común', 'المقام المشترك', 'common denominator')
        ],
        explanation: say(
            'Bi gai oso handi kentzen direnean, emaitza edozein izan daiteke. Erro bat badago, konjokatuaz biderkatu eta zatitzen da: goian erroa desagertzen da eta zatidura bat geratzen da, mailak alderatuz ebazten dena. Zatiki biren kenketa bada, izendatzaile komuna jartzen da.',
            'Cuando se restan dos términos muy grandes, el resultado puede ser cualquiera. Si hay una raíz, se multiplica y divide por el conjugado: arriba desaparece la raíz y queda un cociente, que se resuelve comparando grados. Si es una resta de dos fracciones, se pone denominador común.',
            'عندما نطرح حدّين كبيرين جدًا قد تكون النتيجة أي شيء. إذا وُجد جذر نضرب ونقسم على المرافق: يختفي الجذر من البسط ويبقى خارج قسمة يُحل بمقارنة الدرجات. وإذا كان طرح كسرين نوحّد المقامات.',
            'When two very large terms are subtracted, the result can be anything. If there is a root, multiply and divide by the conjugate: the root disappears on top and a quotient is left, solved by comparing degrees. If it is a difference of two fractions, use a common denominator.'
        ),
        examplePrompt: say('Kalkulatu $\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+10x}-x\\right)$.', 'Calcula $\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+10x}-x\\right)$.', 'احسب $\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+10x}-x\\right)$.', 'Work out $\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+10x}-x\\right)$.'),
        example: same('$\\frac{10x}{\\sqrt{x^2+10x}+x}\\ \\to\\ \\frac{10x}{2x}=5$'),
        exampleAnswer: say('Konjokatuarekin, limitea 5 da.', 'Con el conjugado, el límite es 5.', 'بالمرافق تكون النهاية 5.', 'With the conjugate, the limit is 5.'),
        why: {
            text: say(
                'Zergatik ez da 0? $\\sqrt{x^2+4x}$ ez da $x$: apur bat handiagoa da, eta alde hori ez da desagertzen. $(x+2)^2=x^2+4x+4$ denez, $\\sqrt{x^2+4x}$ ia $x+2$ da; beraz, kenketa 2 inguruan geratzen da.',
                '¿Por qué no es 0? $\\sqrt{x^2+4x}$ no es $x$: es un poco mayor, y esa diferencia no desaparece. Como $(x+2)^2=x^2+4x+4$, $\\sqrt{x^2+4x}$ es casi $x+2$; por eso la resta se queda cerca de 2.',
                'لماذا ليست 0؟ $\\sqrt{x^2+4x}$ ليست $x$: إنها أكبر قليلًا، وذلك الفرق لا يختفي. وبما أن $(x+2)^2=x^2+4x+4$ فإن $\\sqrt{x^2+4x}$ تكاد تساوي $x+2$؛ لذلك يبقى الفرق قريبًا من 2.',
                'Why is it not 0? $\\sqrt{x^2+4x}$ is not $x$: it is a little larger, and that difference does not vanish. Since $(x+2)^2=x^2+4x+4$, $\\sqrt{x^2+4x}$ is almost $x+2$; so the difference stays close to 2.'
            )
        }
    },
    'number-e': {
        definitions: [
            { term: say('$e$ zenbakia', 'El número $e$', 'العدد $e$', 'The number $e$'), meaning: say('$\\left(1+\\frac{1}{n}\\right)^{n}$ adierazpenaren limitea: $e\\approx 2{,}718$.', 'El límite de $\\left(1+\\frac{1}{n}\\right)^{n}$: $e\\approx 2{,}718$.', 'نهاية $\\left(1+\\frac{1}{n}\\right)^{n}$: ‏$e\\approx 2{,}718$.', 'The limit of $\\left(1+\\frac{1}{n}\\right)^{n}$: $e\\approx 2{,}718$.') }
        ],
        vocabulary: [
            say('oinarria', 'base', 'الأساس', 'base'),
            say('berretzailea', 'exponente', 'الأس', 'exponent'),
            say('interes konposatua', 'interés compuesto', 'الفائدة المركبة', 'compound interest')
        ],
        explanation: say(
            'Oinarria 1 baliora eta berretzailea infinitura doazenean, ez da 1: oinarriko gehigarri txikia berretzaile handi batean pilatzen da. Interes konposatuan gertatzen da: interesa gero eta maizago kapitalizatzean, $e$ zenbakia agertzen da. Kalkulatzeko: $\\lim f^{g}=e^{\\lim g\\,(f-1)}$.',
            'Cuando la base tiende a 1 y el exponente a infinito, no sale 1: el pequeño exceso de la base se acumula en un exponente enorme. Pasa en el interés compuesto: al capitalizar cada vez más a menudo aparece el número $e$. Para calcularlo: $\\lim f^{g}=e^{\\lim g\\,(f-1)}$.',
            'عندما يؤول الأساس إلى 1 والأس إلى اللانهاية لا تكون النتيجة 1: تتراكم الزيادة الصغيرة في الأساس في أس ضخم. ويحدث هذا في الفائدة المركبة: عند الرسملة بتكرار أكبر فأكبر يظهر العدد $e$. وللحساب: $\\lim f^{g}=e^{\\lim g\\,(f-1)}$.',
            'When the base tends to 1 and the exponent to infinity, the result is not 1: the small excess of the base piles up in a huge exponent. It happens with compound interest: compounding more and more often brings in the number $e$. To work it out: $\\lim f^{g}=e^{\\lim g\\,(f-1)}$.'
        ),
        examplePrompt: say('Banku batek % 5 ematen du urtean, $n$ alditan kapitalizatuta: $\\left(1+\\frac{0{,}05}{n}\\right)^{n}$. Zein da limitea $n\\to+\\infty$ denean?', 'Un banco da un 5 % anual capitalizado $n$ veces: $\\left(1+\\frac{0{,}05}{n}\\right)^{n}$. ¿Cuál es el límite cuando $n\\to+\\infty$?', 'يعطي مصرف 5 % سنويًا مع رسملة $n$ مرة: $\\left(1+\\frac{0{,}05}{n}\\right)^{n}$. ما النهاية عندما $n\\to+\\infty$؟', 'A bank pays 5 % a year compounded $n$ times: $\\left(1+\\frac{0{,}05}{n}\\right)^{n}$. What is the limit as $n\\to+\\infty$?'),
        example: same('$e^{\\lim n\\cdot\\frac{0{,}05}{n}}=e^{0{,}05}\\approx 1{,}0513$'),
        exampleAnswer: say('$e^{0{,}05}$: euro bakoitza 1,0513 euro bihurtzen da gehienez urtebetean.', '$e^{0{,}05}$: cada euro se convierte como mucho en 1,0513 € en un año.', '$e^{0{,}05}$: يصبح كل يورو 1.0513 € على الأكثر في سنة.', '$e^{0{,}05}$: each euro becomes at most €1.0513 in a year.'),
        why: {
            text: say(
                'Zergatik $e^{g\\,(f-1)}$? $f=1+h$ bada, $h$ txiki-txikia izanik, $(1+h)^{g}$ adierazpena $\\left[(1+h)^{\\frac{1}{h}}\\right]^{g\\,h}$ bezala idatz daiteke. Kortxeteen barrukoa $e$ baliora doa, eta berretzailea $g\\,h=g\\,(f-1)$ da.',
                '¿Por qué $e^{g\\,(f-1)}$? Si $f=1+h$ con $h$ pequeñísimo, $(1+h)^{g}$ se puede escribir como $\\left[(1+h)^{\\frac{1}{h}}\\right]^{g\\,h}$. Lo de dentro del corchete tiende a $e$, y el exponente es $g\\,h=g\\,(f-1)$.',
                'لماذا $e^{g\\,(f-1)}$؟ إذا كان $f=1+h$ مع $h$ صغير جدًا فيمكن كتابة $(1+h)^{g}$ على الصورة $\\left[(1+h)^{\\frac{1}{h}}\\right]^{g\\,h}$. ما داخل القوسين يؤول إلى $e$، والأس هو $g\\,h=g\\,(f-1)$.',
                'Why $e^{g\\,(f-1)}$? If $f=1+h$ with $h$ very small, $(1+h)^{g}$ can be written as $\\left[(1+h)^{\\frac{1}{h}}\\right]^{g\\,h}$. The inside of the bracket tends to $e$, and the exponent is $g\\,h=g\\,(f-1)$.'
            )
        }
    },

    /* ---------- 3. Limits at a point ---------- */
    'one-sided': {
        definitions: [
            { term: say('Funtzio zatikatua', 'Función a trozos', 'دالة متعددة الأجزاء', 'Piecewise function'), meaning: say('Tarte bakoitzean adierazpen bat duen funtzioa; tarteak aldatzen diren tokiak aldaketa-puntuak dira.', 'Una función con una expresión en cada intervalo; donde cambian los intervalos están los puntos de cambio.', 'دالة لها عبارة في كل فترة؛ وحيث تتغير الفترات توجد نقاط التغيّر.', 'A function with one expression on each interval; where the intervals change are the points of change.') }
        ],
        vocabulary: [
            say('ordezkatu', 'sustituir', 'التعويض', 'substitute'),
            say('zatia', 'trozo', 'الجزء', 'piece'),
            say('eskuina', 'derecha', 'اليمين', 'right')
        ],
        explanation: say(
            'Funtzio jarraitu ezagun batean, puntuko limitea ordezkatuz lortzen da. Funtzio zatikatu batean, aldaketa-puntuan zati bakoitzak alde bat agintzen du: alboko limite bakoitza bere zatiarekin kalkulatzen da. Biak berdinak badira, hori da limitea; bestela, ez dago limiterik.',
            'En una función conocida y continua, el límite en un punto se obtiene sustituyendo. En una función a trozos, en el punto de cambio cada trozo manda en un lado: cada límite lateral se calcula con su trozo. Si coinciden, ese es el límite; si no, no existe.',
            'في دالة معروفة ومتصلة تُنال النهاية عند نقطة بالتعويض. وفي الدالة متعددة الأجزاء يتحكم كل جزء في جانب عند نقطة التغيّر: تُحسب كل نهاية جانبية بجزئها. إذا تساوتا فتلك هي النهاية؛ وإلا فلا توجد.',
            'In a familiar continuous function, the limit at a point is found by substituting. In a piecewise function, at the point of change each piece rules one side: each one-sided limit is worked out with its own piece. If they agree, that is the limit; if not, it does not exist.'
        ),
        examplePrompt: say('$g(x)=\\begin{cases}3x & x<4\\\\ x^2-4 & x\\ge 4\\end{cases}$. Badago $\\lim_{x\\to 4}g(x)$?', '$g(x)=\\begin{cases}3x & x<4\\\\ x^2-4 & x\\ge 4\\end{cases}$. ¿Existe $\\lim_{x\\to 4}g(x)$?', '$g(x)=\\begin{cases}3x & x<4\\\\ x^2-4 & x\\ge 4\\end{cases}$. هل توجد $\\lim_{x\\to 4}g(x)$؟', '$g(x)=\\begin{cases}3x & x<4\\\\ x^2-4 & x\\ge 4\\end{cases}$. Does $\\lim_{x\\to 4}g(x)$ exist?'),
        example: same('$\\lim_{x\\to 4^-}3x=12\\qquad\\lim_{x\\to 4^+}(x^2-4)=12$'),
        exampleAnswer: say('Alboko limiteak berdinak dira: limitea 12 da.', 'Los laterales coinciden: el límite es 12.', 'النهايتان الجانبيتان متساويتان: النهاية 12.', 'The one-sided limits agree: the limit is 12.')
    },
    'k-zero': {
        definitions: [
            { term: say('Asintota bertikala', 'Asíntota vertical', 'المقارب الرأسي', 'Vertical asymptote'), meaning: say('$x=a$ zuzena, alboko limiteren bat infinitua denean: kurba hari hurbiltzen zaio gora edo behera.', 'La recta $x=a$ cuando algún límite lateral es infinito: la curva se pega a ella subiendo o bajando.', 'المستقيم $x=a$ عندما تكون إحدى النهايتين الجانبيتين لانهائية: يلتصق به المنحنى صاعدًا أو نازلًا.', 'The line $x=a$ when some one-sided limit is infinite: the curve hugs it going up or down.') }
        ],
        vocabulary: [
            say('izendatzailea', 'denominador', 'المقام', 'denominator'),
            say('zeinua', 'signo', 'الإشارة', 'sign')
        ],
        explanation: say(
            'Zenbaki bat oso zenbaki txiki batez zatitzean, emaitza oso handia da: $\\frac{k}{0}$ ez da indeterminazioa, infinitua baizik. Zeinua jakiteko, $a$ baino apur bat txikiagoa eta apur bat handiagoa den zenbaki bat ordezkatzen da. Bi aldeetan zeinu bera badute, limitea $+\\infty$ edo $-\\infty$ da; bestela, ez dago.',
            'Al dividir un número entre otro muy pequeño, el resultado es enorme: $\\frac{k}{0}$ no es indeterminación, es infinito. Para saber el signo se sustituye un número un poco menor y otro un poco mayor que $a$. Si los dos lados tienen el mismo signo, el límite es $+\\infty$ o $-\\infty$; si no, no existe.',
            'عند قسمة عدد على عدد صغير جدًا تكون النتيجة ضخمة: $\\frac{k}{0}$ ليست عدم تعيين بل لانهاية. ولمعرفة الإشارة نعوّض عددًا أصغر قليلًا من $a$ وآخر أكبر قليلًا. إذا كانت للجانبين الإشارة نفسها فالنهاية $+\\infty$ أو $-\\infty$؛ وإلا فلا توجد.',
            'Dividing a number by a very small one gives something huge: $\\frac{k}{0}$ is not indeterminate, it is infinite. To know the sign, substitute a number a little smaller and one a little larger than $a$. If both sides have the same sign, the limit is $+\\infty$ or $-\\infty$; if not, it does not exist.'
        ),
        examplePrompt: say('Kalkulatu $\\lim_{x\\to 5}\\frac{2}{(x-5)^2}$.', 'Calcula $\\lim_{x\\to 5}\\frac{2}{(x-5)^2}$.', 'احسب $\\lim_{x\\to 5}\\frac{2}{(x-5)^2}$.', 'Work out $\\lim_{x\\to 5}\\frac{2}{(x-5)^2}$.'),
        example: same('$\\frac{2}{0^+}=+\\infty$'),
        exampleAnswer: say('Karratua beti positiboa da: bi aldeetan $+\\infty$, beraz limitea $+\\infty$ da.', 'El cuadrado es siempre positivo: $+\\infty$ por los dos lados, así que el límite es $+\\infty$.', 'المربع موجب دائمًا: $+\\infty$ من الجانبين، فالنهاية $+\\infty$.', 'The square is always positive: $+\\infty$ on both sides, so the limit is $+\\infty$.')
    },
    'zero-zero': {
        definitions: [
            { term: say('Faktorizatu', 'Factorizar', 'التحليل', 'Factorise'), meaning: say('Polinomio bat biderkadura gisa idaztea; $a$ erroa bada, $x-a$ faktorea du.', 'Escribir un polinomio como un producto; si $a$ es raíz, lleva el factor $x-a$.', 'كتابة الحدودية على صورة جداء؛ وإذا كان $a$ جذرًا ففيها العامل $x-a$.', 'Write a polynomial as a product; if $a$ is a root, it has the factor $x-a$.') }
        ],
        vocabulary: [
            say('sinplifikatu', 'simplificar', 'الاختصار', 'cancel'),
            say('faktorea', 'factor', 'العامل', 'factor')
        ],
        explanation: say(
            '$\\frac{0}{0}$ ateratzen bada, goiko eta beheko adierazpenek $x-a$ faktorea dute. Faktorizatzen dira, $x-a$ sinplifikatzen da eta berriro ordezkatzen da. Erroak badaude, konjokatuaz biderkatu eta zatitzen da, eta $x-a$ agertzen da sinplifikatzeko.',
            'Si sale $\\frac{0}{0}$, las expresiones de arriba y de abajo llevan el factor $x-a$. Se factorizan, se simplifica $x-a$ y se vuelve a sustituir. Si hay raíces, se multiplica y divide por el conjugado, y aparece el $x-a$ que se simplifica.',
            'إذا ظهرت $\\frac{0}{0}$ ففي عبارتي البسط والمقام العامل $x-a$. نحلّلهما ونختصر $x-a$ ونعوّض من جديد. وإذا وُجدت جذور نضرب ونقسم على المرافق، فيظهر $x-a$ الذي نختصره.',
            'If you get $\\frac{0}{0}$, the expressions on top and below both carry the factor $x-a$. Factorise them, cancel $x-a$ and substitute again. If there are roots, multiply and divide by the conjugate, and the $x-a$ to cancel appears.'
        ),
        cases: [
            { title: say('Polinomioak', 'Polinomios', 'الحدوديات', 'Polynomials'), text: say('Faktorizatu eta sinplifikatu $x-a$.', 'Factoriza y simplifica $x-a$.', 'حلّل واختصر $x-a$.', 'Factorise and cancel $x-a$.'), math: same('$\\frac{x^2-9}{x-3}=x+3$') },
            { title: say('Erroak', 'Raíces', 'الجذور', 'Roots'), text: say('Biderkatu eta zatitu konjokatuaz.', 'Multiplica y divide por el conjugado.', 'اضرب واقسم على المرافق.', 'Multiply and divide by the conjugate.'), math: same('$(\\sqrt{x}-3)(\\sqrt{x}+3)=x-9$') }
        ],
        examplePrompt: say('Kalkulatu $\\lim_{x\\to 25}\\frac{x-25}{\\sqrt{x}-5}$.', 'Calcula $\\lim_{x\\to 25}\\frac{x-25}{\\sqrt{x}-5}$.', 'احسب $\\lim_{x\\to 25}\\frac{x-25}{\\sqrt{x}-5}$.', 'Work out $\\lim_{x\\to 25}\\frac{x-25}{\\sqrt{x}-5}$.'),
        example: same('$\\frac{(x-25)(\\sqrt{x}+5)}{x-25}=\\sqrt{x}+5\\ \\to\\ 10$'),
        exampleAnswer: say('Konjokatuarekin $\\sqrt{x}+5$ geratzen da: limitea 10 da.', 'Con el conjugado queda $\\sqrt{x}+5$: el límite es 10.', 'بالمرافق يبقى $\\sqrt{x}+5$: النهاية 10.', 'With the conjugate, $\\sqrt{x}+5$ is left: the limit is 10.')
    },

    /* ---------- 4. Continuity ---------- */
    continuous: {
        definitions: [
            { term: say('Funtzio jarraitua', 'Función continua', 'الدالة المتصلة', 'Continuous function'), meaning: say('Arkatza altxatu gabe marraz daitekeen funtzioa: puntu bakoitzean $f(a)=\\lim_{x\\to a}f(x)$.', 'La que se dibuja sin levantar el lápiz: en cada punto $f(a)=\\lim_{x\\to a}f(x)$.', 'دالة تُرسم دون رفع القلم: عند كل نقطة $f(a)=\\lim_{x\\to a}f(x)$.', 'One drawn without lifting the pencil: at each point $f(a)=\\lim_{x\\to a}f(x)$.') }
        ],
        vocabulary: [
            say('baldintzak', 'condiciones', 'الشروط', 'conditions'),
            say('aldaketa-puntua', 'punto de cambio', 'نقطة التغيّر', 'point of change')
        ],
        explanation: say(
            'Puntu batean jarraitua izateko hiru gauza behar dira: $f(a)$ egotea, limitea egotea (alboko limiteak berdinak) eta biak berdinak izatea. Polinomioak beti dira jarraituak, eta zatidurak izendatzailea 0 ez den tokian. Funtzio zatikatuetan, aldaketa-puntuak bakarrik aztertu behar dira.',
            'Para ser continua en un punto hacen falta tres cosas: que exista $f(a)$, que exista el límite (laterales iguales) y que los dos coincidan. Los polinomios son siempre continuos, y los cocientes donde el denominador no se anula. En las funciones a trozos, solo hay que estudiar los puntos de cambio.',
            'لتكون الدالة متصلة عند نقطة يلزم ثلاثة أمور: أن توجد $f(a)$، وأن توجد النهاية (نهايتان جانبيتان متساويتان)، وأن تتساويا. الحدوديات متصلة دائمًا، وخوارج القسمة حيث لا ينعدم المقام. وفي الدوال متعددة الأجزاء لا ندرس إلا نقاط التغيّر.',
            'To be continuous at a point three things are needed: $f(a)$ exists, the limit exists (equal one-sided limits) and both are equal. Polynomials are always continuous, and quotients wherever the denominator is not 0. In piecewise functions, only the points of change need studying.'
        ),
        examplePrompt: say('Jarraitua al da $h(x)=\\begin{cases}x^2-3 & x\\le 3\\\\ 2x & x>3\\end{cases}$ funtzioa $x=3$ puntuan?', '¿Es continua $h(x)=\\begin{cases}x^2-3 & x\\le 3\\\\ 2x & x>3\\end{cases}$ en $x=3$?', 'هل $h(x)=\\begin{cases}x^2-3 & x\\le 3\\\\ 2x & x>3\\end{cases}$ متصلة عند $x=3$؟', 'Is $h(x)=\\begin{cases}x^2-3 & x\\le 3\\\\ 2x & x>3\\end{cases}$ continuous at $x=3$?'),
        example: same('$h(3)=9-3=6\\qquad\\lim_{x\\to 3^+}2x=6$'),
        exampleAnswer: say('$h(3)$, ezkerreko limitea eta eskuinekoa 6 dira: jarraitua da.', '$h(3)$, el límite por la izquierda y el de la derecha valen 6: es continua.', '$h(3)$ والنهايتان اليسرى واليمنى تساوي 6: متصلة.', '$h(3)$, the left-hand limit and the right-hand one are 6: it is continuous.')
    },
    discontinuities: {
        definitions: [
            { term: say('Etenune saihesgarria', 'Discontinuidad evitable', 'انقطاع قابل للإزالة', 'Removable discontinuity'), meaning: say('Limitea badago, baina $f(a)$ ez dago edo beste balio bat du: zulo bat da.', 'Existe el límite, pero $f(a)$ no existe o vale otra cosa: es un agujero.', 'توجد النهاية لكن $f(a)$ غير موجودة أو لها قيمة أخرى: إنه ثقب.', 'The limit exists, but $f(a)$ does not exist or has another value: it is a hole.') },
            { term: say('Jauzi finitua', 'Salto finito', 'القفزة المنتهية', 'Finite jump'), meaning: say('Alboko limiteak zenbakiak dira, baina desberdinak: kurba altuera batetik bestera jauzten da.', 'Los laterales son números, pero distintos: la curva salta de una altura a otra.', 'النهايتان الجانبيتان عددان مختلفان: يقفز المنحنى من ارتفاع إلى آخر.', 'The one-sided limits are numbers, but different: the curve jumps from one height to another.') }
        ],
        vocabulary: [
            say('zuloa', 'agujero', 'الثقب', 'hole'),
            say('jauzi infinitua', 'salto infinito', 'القفزة اللانهائية', 'infinite jump')
        ],
        explanation: say(
            'Funtzio bat jarraitua ez denean, alboko limiteek esaten dute zer gertatzen den. Berdinak badira, zulo bat dago: etenune saihesgarria, puntu bat jarriz konpontzen dena. Zenbaki desberdinak badira, jauzi finitua dago. Infinituren bat badago, jauzi infinitua eta asintota bertikala.',
            'Cuando una función no es continua, los límites laterales dicen qué pasa. Si coinciden, hay un agujero: discontinuidad evitable, que se arregla poniendo un punto. Si son números distintos, hay un salto finito. Si alguno es infinito, salto infinito y asíntota vertical.',
            'عندما لا تكون الدالة متصلة تخبرنا النهايتان الجانبيتان بما يحدث. إذا تساوتا فهناك ثقب: انقطاع قابل للإزالة يُصلح بوضع نقطة. وإذا كانتا عددين مختلفين فهناك قفزة منتهية. وإذا كانت إحداهما لانهائية فقفزة لانهائية ومقارب رأسي.',
            'When a function is not continuous, the one-sided limits tell what happens. If they agree, there is a hole: a removable discontinuity, mended by putting a point in. If they are different numbers, there is a finite jump. If one is infinite, an infinite jump and a vertical asymptote.'
        ),
        examplePrompt: say('Sailkatu $g(x)=\\begin{cases}x+5 & x<1\\\\ 4x & x\\ge 1\\end{cases}$ funtzioaren etenunea $x=1$ puntuan.', 'Clasifica la discontinuidad de $g(x)=\\begin{cases}x+5 & x<1\\\\ 4x & x\\ge 1\\end{cases}$ en $x=1$.', 'صنّف انقطاع $g(x)=\\begin{cases}x+5 & x<1\\\\ 4x & x\\ge 1\\end{cases}$ عند $x=1$.', 'Classify the discontinuity of $g(x)=\\begin{cases}x+5 & x<1\\\\ 4x & x\\ge 1\\end{cases}$ at $x=1$.'),
        example: same('$\\lim_{x\\to 1^-}(x+5)=6\\qquad\\lim_{x\\to 1^+}4x=4$'),
        exampleAnswer: say('Alboko limiteak 6 eta 4 dira: jauzi finitua, 2 unitatekoa.', 'Los laterales son 6 y 4: salto finito, de 2 unidades.', 'النهايتان الجانبيتان 6 و4: قفزة منتهية مقدارها 2.', 'The one-sided limits are 6 and 4: a finite jump of 2 units.')
    },
    parameter: {
        definitions: [
            { term: say('Parametroa', 'Parámetro', 'الوسيط', 'Parameter'), meaning: say('Formulako letra bat ($a$, $b$, $k$…), zenbaki bat da baina oraindik ez dakiguna.', 'Una letra de la fórmula ($a$, $b$, $k$…) que es un número que aún no sabemos.', 'حرف في الصيغة ($a$، $b$، $k$…) يمثل عددًا لا نعرفه بعد.', 'A letter in the formula ($a$, $b$, $k$…) standing for a number we do not know yet.') }
        ],
        vocabulary: [
            say('lotunea', 'unión', 'نقطة الالتقاء', 'joint'),
            say('ekuazioa', 'ecuación', 'المعادلة', 'equation'),
            say('sistema', 'sistema', 'الجملة', 'system')
        ],
        explanation: say(
            'Zati bakoitza bere tartean jarraitua bada, lotuneak bakarrik aztertzen dira. Lotune bakoitzean, ezkerreko limitea, eskuinekoa eta $f(a)$ berdindu behar dira: ekuazio bat. Parametro bakarra badago, ekuazio bat nahikoa da. Bi badaude, bi lotune egon ohi dira eta bi ekuazioko sistema ebazten da.',
            'Si cada trozo es continuo en su intervalo, solo se estudian las uniones. En cada unión hay que igualar el límite por la izquierda, el de la derecha y $f(a)$: una ecuación. Con un solo parámetro basta una ecuación. Con dos, suele haber dos uniones y se resuelve un sistema de dos ecuaciones.',
            'إذا كان كل جزء متصلًا على فترته فلا ندرس إلا نقاط الالتقاء. وعند كل نقطة التقاء نساوي النهاية اليسرى واليمنى و$f(a)$: معادلة. ومع وسيط واحد تكفي معادلة. ومع وسيطين تكون عادةً نقطتا التقاء ونحل جملة من معادلتين.',
            'If each piece is continuous on its interval, only the joints are studied. At each joint, the left-hand limit, the right-hand one and $f(a)$ must be set equal: one equation. With a single parameter one equation is enough. With two, there are usually two joints and a system of two equations is solved.'
        ),
        examplePrompt: say('Aurkitu $m$ eta $n$, funtzio hau $\\mathbb{R}$ osoan jarraitua izan dadin: $g(x)=\\begin{cases}mx & x<1\\\\ x^2+n & 1\\le x\\le 3\\\\ 6x & x>3\\end{cases}$', 'Halla $m$ y $n$ para que esta función sea continua en $\\mathbb{R}$: $g(x)=\\begin{cases}mx & x<1\\\\ x^2+n & 1\\le x\\le 3\\\\ 6x & x>3\\end{cases}$', 'أوجد $m$ و$n$ لتكون هذه الدالة متصلة على $\\mathbb{R}$: $g(x)=\\begin{cases}mx & x<1\\\\ x^2+n & 1\\le x\\le 3\\\\ 6x & x>3\\end{cases}$', 'Find $m$ and $n$ so that this function is continuous on $\\mathbb{R}$: $g(x)=\\begin{cases}mx & x<1\\\\ x^2+n & 1\\le x\\le 3\\\\ 6x & x>3\\end{cases}$'),
        example: same('$\\begin{gathered}9+n=18\\ \\to\\ n=9\\\\ m=1+n=10\\end{gathered}$'),
        exampleAnswer: say('Lehenik $x=3$ lotunea ($n$ bakarrik): $n=9$; gero $x=1$: $m=10$.', 'Primero la unión de $x=3$ (solo $n$): $n=9$; después $x=1$: $m=10$.', 'أولًا نقطة الالتقاء $x=3$ (فيها $n$ وحدها): $n=9$؛ ثم $x=1$: ‏$m=10$.', 'First the joint at $x=3$ (only $n$): $n=9$; then $x=1$: $m=10$.')
    },

    /* ---------- 5. In economy and society ---------- */
    'long-run': {
        definitions: [
            { term: say('Batez besteko kostua', 'Coste medio', 'متوسط التكلفة', 'Average cost'), meaning: say('Unitate bakoitzaren kostua: kostu osoa zati unitate kopurua, $\\frac{C(x)}{x}$.', 'Lo que cuesta cada unidad: el coste total entre el número de unidades, $\\frac{C(x)}{x}$.', 'تكلفة كل وحدة: التكلفة الكلية مقسومة على عدد الوحدات، $\\frac{C(x)}{x}$.', 'What each unit costs: the total cost divided by the number of units, $\\frac{C(x)}{x}$.') },
            { term: say('Epe luzera', 'A largo plazo', 'على المدى الطويل', 'In the long run'), meaning: say('Denbora (edo produkzioa) asko handitzean: $t\\to+\\infty$ limitea.', 'Cuando el tiempo (o la producción) crece mucho: el límite cuando $t\\to+\\infty$.', 'عندما يكبر الزمن (أو الإنتاج) كثيرًا: النهاية عندما $t\\to+\\infty$.', 'When time (or production) grows a lot: the limit as $t\\to+\\infty$.') }
        ],
        vocabulary: [
            say('biztanleria', 'población', 'السكان', 'population'),
            say('joera', 'tendencia', 'الاتجاه', 'trend'),
            say('egonkortu', 'estabilizar', 'يستقر', 'level off')
        ],
        explanation: say(
            'Gizarte eta ekonomiako eredu askok denborarekin aldatzen diren magnitudeak deskribatzen dituzte. Epe luzera zer gertatzen den jakiteko, $t\\to+\\infty$ limitea kalkulatzen da. Zenbaki bat bada, magnitudea egonkortu egiten da; 0 bada, desagertzen doa; infinitua bada, mugarik gabe hazten da. Emaitza beti bere unitateekin interpretatzen da.',
            'Muchos modelos de sociedad y economía describen magnitudes que cambian con el tiempo. Para saber qué pasa a largo plazo se calcula el límite cuando $t\\to+\\infty$. Si es un número, la magnitud se estabiliza; si es 0, se va apagando; si es infinito, crece sin límite. El resultado se interpreta siempre con sus unidades.',
            'كثير من نماذج المجتمع والاقتصاد تصف مقادير تتغير مع الزمن. ولمعرفة ما يحدث على المدى الطويل نحسب النهاية عندما $t\\to+\\infty$. إذا كانت عددًا فالمقدار يستقر؛ وإذا كانت 0 فإنه يتلاشى؛ وإذا كانت لانهاية فإنه يكبر بلا حد. وتُفسَّر النتيجة دائمًا بوحداتها.',
            'Many models of society and economy describe quantities that change over time. To know what happens in the long run, work out the limit as $t\\to+\\infty$. If it is a number, the quantity levels off; if it is 0, it dies away; if it is infinite, it grows without limit. The result is always read with its units.'
        ),
        examplePrompt: say('Fabrika batek $C(x)=1500+8x$ euro gastatzen ditu $x$ unitate egiteko. Zenbatera hurbiltzen da batez besteko kostua produkzioa asko handitzean?', 'Una fábrica gasta $C(x)=1500+8x$ euros en hacer $x$ unidades. ¿A cuánto se acerca el coste medio cuando la producción crece mucho?', 'ينفق مصنع $C(x)=1500+8x$ يورو لإنتاج $x$ وحدة. إلى أي قيمة يقترب متوسط التكلفة عندما يكبر الإنتاج كثيرًا؟', 'A factory spends $C(x)=1500+8x$ euros to make $x$ units. What does the average cost approach when production grows a lot?'),
        example: same('$\\lim_{x\\to+\\infty}\\frac{1500+8x}{x}=8$'),
        exampleAnswer: say('8 eurora unitateko: kostu finkoa unitate askotan banatzen da eta ia ez da nabaritzen.', 'A 8 € por unidad: el coste fijo se reparte entre muchas unidades y casi no se nota.', 'إلى 8 € للوحدة: تتوزع التكلفة الثابتة على وحدات كثيرة فلا تكاد تُلاحظ.', 'To €8 per unit: the fixed cost is shared among many units and is hardly noticed.'),
        why: {
            text: say(
                'Zergatik hurbiltzen da batez besteko kostua unitateko kostura? $\\frac{1500+8x}{x}=\\frac{1500}{x}+8$. Kostu finkoaren zatia, $\\frac{1500}{x}$, gero eta txikiagoa da unitate gehiago egin ahala; unitateko kostua, 8, ez da aldatzen.',
                '¿Por qué el coste medio se acerca al coste por unidad? $\\frac{1500+8x}{x}=\\frac{1500}{x}+8$. La parte del coste fijo, $\\frac{1500}{x}$, es cada vez más pequeña al hacer más unidades; el coste por unidad, 8, no cambia.',
                'لماذا يقترب متوسط التكلفة من تكلفة الوحدة؟ $\\frac{1500+8x}{x}=\\frac{1500}{x}+8$. حصة التكلفة الثابتة $\\frac{1500}{x}$ تصغر كلما أُنتجت وحدات أكثر؛ أما تكلفة الوحدة 8 فلا تتغير.',
                'Why does the average cost approach the cost per unit? $\\frac{1500+8x}{x}=\\frac{1500}{x}+8$. The share of the fixed cost, $\\frac{1500}{x}$, gets smaller as more units are made; the cost per unit, 8, does not change.'
            )
        }
    },
    brackets: {
        definitions: [
            { term: say('Tartea', 'Tramo', 'الشريحة', 'Bracket'), meaning: say('Kontsumo edo errenta tarte bat, bere prezioarekin: adibidez, 0 eta 10 m³ artean.', 'Un intervalo de consumo o de renta con su propio precio: por ejemplo, de 0 a 10 m³.', 'فترة استهلاك أو دخل لها سعرها: مثلًا من 0 إلى 10 m³.', 'An interval of use or income with its own price: for example, from 0 to 10 m³.') }
        ],
        vocabulary: [
            say('tarifa', 'tarifa', 'التعريفة', 'tariff'),
            say('jauzia', 'salto', 'القفزة', 'jump'),
            say('kontsumoa', 'consumo', 'الاستهلاك', 'use')
        ],
        explanation: say(
            'Ura, argia, aparkalekuak edo zergak tarteka ordaintzen dira askotan: tarte bakoitzak bere formula du. Hori funtzio zatikatu bat da. Tarte-aldaketa batean alboko limiteak desberdinak badira, faktura bat-batean igotzen edo jaisten da: jauzi finitua. Jauziaren tamaina alboko limiteen kenketa da.',
            'El agua, la luz, los aparcamientos o los impuestos se pagan a menudo por tramos: cada tramo tiene su fórmula. Eso es una función a trozos. Si en un cambio de tramo los laterales son distintos, la factura sube o baja de golpe: un salto finito. El tamaño del salto es la diferencia de los laterales.',
            'كثيرًا ما يُدفع الماء والكهرباء والمواقف والضرائب حسب الشرائح: لكل شريحة صيغتها. وهذه دالة متعددة الأجزاء. وإذا اختلفت النهايتان الجانبيتان عند تغيّر الشريحة ترتفع الفاتورة أو تنخفض فجأة: قفزة منتهية. وحجم القفزة هو فرق النهايتين.',
            'Water, electricity, parking or taxes are often paid by brackets: each bracket has its formula. That is a piecewise function. If at a change of bracket the one-sided limits differ, the bill goes up or down all at once: a finite jump. The size of the jump is the difference of the one-sided limits.'
        ),
        examplePrompt: say('Aparkaleku batek $f(t)=\\begin{cases}3t & 0<t\\le 2\\\\ 2t+4 & t>2\\end{cases}$ euro kobratzen ditu, $t$ ordutan. Jauzirik al dago $t=2$ puntuan?', 'Un aparcamiento cobra $f(t)=\\begin{cases}3t & 0<t\\le 2\\\\ 2t+4 & t>2\\end{cases}$ euros, con $t$ en horas. ¿Hay salto en $t=2$?', 'يتقاضى موقف سيارات $f(t)=\\begin{cases}3t & 0<t\\le 2\\\\ 2t+4 & t>2\\end{cases}$ يورو، حيث $t$ بالساعات. هل توجد قفزة عند $t=2$؟', 'A car park charges $f(t)=\\begin{cases}3t & 0<t\\le 2\\\\ 2t+4 & t>2\\end{cases}$ euros, with $t$ in hours. Is there a jump at $t=2$?'),
        example: same('$f(2)=6\\qquad\\lim_{t\\to 2^+}(2t+4)=8$'),
        exampleAnswer: say('Bai: 2 euroko jauzia. Bi ordu baino apur bat gehiago egoteak 2 euro gehiago balio du.', 'Sí: un salto de 2 €. Quedarse un poco más de dos horas cuesta 2 € más.', 'نعم: قفزة مقدارها 2 €. البقاء أكثر قليلًا من ساعتين يكلّف 2 € إضافية.', 'Yes: a jump of €2. Staying a little over two hours costs €2 more.')
    },
    'fair-tariff': {
        definitions: [
            { term: say('Kuota finkoa', 'Cuota fija', 'الحصة الثابتة', 'Fixed charge'), meaning: say('Kontsumoa edozein dela ere ordaintzen den zatia: formulan $x$ gabeko gaia.', 'La parte que se paga se consuma lo que se consuma: el término sin $x$ de la fórmula.', 'الجزء الذي يُدفع مهما كان الاستهلاك: الحد الخالي من $x$ في الصيغة.', 'The part paid whatever the use: the term without $x$ in the formula.') }
        ],
        vocabulary: [
            say('prezioa', 'precio', 'السعر', 'price'),
            say('tartea', 'tramo', 'الشريحة', 'bracket'),
            say('ezezaguna', 'incógnita', 'المجهول', 'unknown')
        ],
        explanation: say(
            'Tarifa zuzen batek ez du bat-bateko igoerarik izan behar tarte batetik bestera igarotzean. Horretarako, aldaketa-puntu bakoitzean bi tarteek balio bera eman behar dute: ezkerreko formula eta eskuinekoa berdintzen dira. Ekuazio horrek ematen du ezezaguna: kuota finkoa, unitateko prezioa edo tarte baten muga.',
            'Una tarifa justa no debe subir de golpe al pasar de un tramo a otro. Para eso, en cada punto de cambio los dos tramos deben dar el mismo valor: se igualan la fórmula de la izquierda y la de la derecha. Esa ecuación da la incógnita: la cuota fija, el precio por unidad o el límite de un tramo.',
            'التعريفة العادلة لا ينبغي أن ترتفع فجأة عند الانتقال من شريحة إلى أخرى. ولذلك يجب أن تعطي الشريحتان القيمة نفسها عند كل نقطة تغيّر: نساوي صيغة اليسار بصيغة اليمين. وتعطي تلك المعادلة المجهول: الحصة الثابتة أو سعر الوحدة أو حد الشريحة.',
            'A fair tariff should not rise all at once on passing from one bracket to another. For that, at each point of change both brackets must give the same value: the left formula and the right one are set equal. That equation gives the unknown: the fixed charge, the price per unit or the edge of a bracket.'
        ),
        examplePrompt: say('Argi-tarifa bat $f(x)=\\begin{cases}0{,}2x & 0\\le x\\le 300\\\\ px+15 & x>300\\end{cases}$ eurokoa da, $x$ kWh-tan. Zein $p$ prezioarekin ez dago jauzirik?', 'Una tarifa de luz es $f(x)=\\begin{cases}0{,}2x & 0\\le x\\le 300\\\\ px+15 & x>300\\end{cases}$ euros, con $x$ en kWh. ¿Con qué precio $p$ no hay salto?', 'تعريفة كهرباء هي $f(x)=\\begin{cases}0{,}2x & 0\\le x\\le 300\\\\ px+15 & x>300\\end{cases}$ يورو، حيث $x$ بالكيلوواط ساعة. بأي سعر $p$ لا توجد قفزة؟', 'An electricity tariff is $f(x)=\\begin{cases}0{,}2x & 0\\le x\\le 300\\\\ px+15 & x>300\\end{cases}$ euros, with $x$ in kWh. With which price $p$ is there no jump?'),
        example: same('$0{,}2\\cdot 300=300p+15\\ \\to\\ p=0{,}15$'),
        exampleAnswer: say('$p=0{,}15$ euro kWh bakoitzeko: 300 kWh-tan bi tarteek 60 euro ematen dute.', '$p=0{,}15$ € por kWh: en 300 kWh los dos tramos dan 60 €.', '$p=0{,}15$ € لكل كيلوواط ساعة: عند 300 kWh تعطي الشريحتان 60 €.', '$p=0{,}15$ euros per kWh: at 300 kWh both brackets give €60.')
    }
}
