import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { ComplexTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Zenbaki konplexuak · Batxilergoa 1 · Zientziak — what each lesson tells:
   the new words (definitions), a short explanation, the example as an
   exercise («Another example»), the key words in four languages, «Why
   does it work?» in five lessons and the cases in three. Plain data so
   the tests can import it; lessons.tsx merges it into the topics.
   Formulas write \sin in every language (so the shared tests see the same
   formulas) and localizeNames gives each language its name. The examples
   use numbers of their own. Tests in tests/lesson-texts.test.ts and
   tests/konplexuak-batx1z-content.test.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const complexLessonTexts: Record<ComplexTopicId, LessonTexts> = {
    /* ---------- 1. New numbers ---------- */
    'imaginary-unit': {
        definitions: [
            { term: say('Unitate irudikaria', 'Unidad imaginaria', 'الوحدة التخيلية', 'Imaginary unit'), meaning: say('$i$ zenbakia, karratua $-1$ duena: $i^2=-1$.', 'El número $i$ cuyo cuadrado es $-1$: $i^2=-1$.', 'العدد $i$ الذي مربعه $-1$: $i^2=-1$.', 'The number $i$ whose square is $-1$: $i^2=-1$.') }
        ],
        vocabulary: [
            say('irudikari hutsa', 'imaginario puro', 'تخيلي صرف', 'purely imaginary'),
            say('erro karratua', 'raíz cuadrada', 'الجذر التربيعي', 'square root')
        ],
        explanation: say(
            'Zenbaki erreal baten karratua ez da inoiz negatiboa; beraz, $x^2=-9$ ekuazioak ez du soluzio errealik. Zenbaki berri bat asmatzen da, $i$ unitate irudikaria, $i^2=-1$ betetzen duena. Horrela, zenbaki negatibo bakoitzak bi erro karratu ditu: $\\sqrt{-16}=4i$, eta baita $-4i$ ere. $i$ unitatearen multiplo errealei irudikari huts esaten zaie.',
            'El cuadrado de un número real nunca es negativo, así que $x^2=-9$ no tiene solución real. Se inventa un número nuevo, la unidad imaginaria $i$, que cumple $i^2=-1$. Así, cada número negativo tiene dos raíces cuadradas: $\\sqrt{-16}=4i$, y también $-4i$. Los múltiplos reales de $i$ se llaman imaginarios puros.',
            'مربع العدد الحقيقي لا يكون سالبًا أبدًا، لذلك ليس للمعادلة $x^2=-9$ حل حقيقي. فنبتكر عددًا جديدًا هو الوحدة التخيلية $i$ التي تحقق $i^2=-1$. وهكذا يكون لكل عدد سالب جذران تربيعيان: $\\sqrt{-16}=4i$ وكذلك $-4i$. وتُسمّى المضاعفات الحقيقية لـ $i$ أعدادًا تخيلية صرفة.',
            'The square of a real number is never negative, so $x^2=-9$ has no real solution. A new number is invented, the imaginary unit $i$, with $i^2=-1$. Then every negative number has two square roots: $\\sqrt{-16}=4i$, and also $-4i$. The real multiples of $i$ are called purely imaginary.'
        ),
        examplePrompt: say('Ebatzi $x^2+49=0$ ekuazioa.', 'Resuelve $x^2+49=0$.', 'حُلّ $x^2+49=0$.', 'Solve $x^2+49=0$.'),
        example: same('$x^2=-49\\qquad x=\\pm\\sqrt{-49}=\\pm 7i$')
    },
    'binomial-form': {
        definitions: [
            { term: say('Zenbaki konplexua', 'Número complejo', 'العدد المركب', 'Complex number'), meaning: say('$a+bi$ erako zenbakia, $a$ eta $b$ errealak izanik; denen multzoa $\\mathbb{C}$ da.', 'Un número $a+bi$ con $a$ y $b$ reales; el conjunto de todos es $\\mathbb{C}$.', 'عدد من الشكل $a+bi$ حيث $a$ و$b$ حقيقيان؛ ومجموعتها كلها $\\mathbb{C}$.', 'A number $a+bi$ with $a$ and $b$ real; the set of all of them is $\\mathbb{C}$.') },
            { term: say('Konjokatua', 'Conjugado', 'المرافق', 'Conjugate'), meaning: say('$a-bi$ zenbakia: zati erreal bera, eta zati irudikaria zeinuz aldatuta.', 'El número $a-bi$: la misma parte real y la imaginaria cambiada de signo.', 'العدد $a-bi$: الجزء الحقيقي نفسه والجزء التخيلي بإشارة معاكسة.', 'The number $a-bi$: the same real part and the imaginary part with its sign changed.') }
        ],
        vocabulary: [
            say('zati erreala', 'parte real', 'الجزء الحقيقي', 'real part'),
            say('aurkakoa', 'opuesto', 'المعاكس', 'opposite')
        ],
        explanation: say(
            'Zenbaki konplexu batek zenbaki erreal bat eta irudikari huts bat batzen ditu: $a+bi$. $a$ zenbakia zati erreala da, eta $b$, zati irudikaria ($i$ gabe). Bi zenbakik izen berezia dute: aurkakoak, $-a-bi$, bi zeinuak aldatzen ditu; konjokatuak, $a-bi$, zati irudikariarena bakarrik.',
            'Un número complejo junta un número real y un imaginario puro: $a+bi$. El número $a$ es la parte real y $b$, la parte imaginaria (sin la $i$). Dos números tienen nombre propio: el opuesto, $-a-bi$, cambia los dos signos; el conjugado, $a-bi$, solo el de la parte imaginaria.',
            'العدد المركب يجمع عددًا حقيقيًا وعددًا تخيليًا صرفًا: $a+bi$. العدد $a$ هو الجزء الحقيقي و$b$ هو الجزء التخيلي (من دون $i$). ولعددين اسم خاص: المعاكس $-a-bi$ يغيّر الإشارتين، والمرافق $a-bi$ يغيّر إشارة الجزء التخيلي فقط.',
            'A complex number puts together a real number and a purely imaginary one: $a+bi$. The number $a$ is the real part and $b$ the imaginary part (without the $i$). Two numbers have their own name: the opposite, $-a-bi$, changes both signs; the conjugate, $a-bi$, only that of the imaginary part.'
        ),
        cases: [
            { title: say('Zenbaki errealak', 'Números reales', 'الأعداد الحقيقية', 'Real numbers'), text: say('$b=0$ bada, zenbakia erreala da: errealak konplexuen barruan daude.', 'Si $b=0$, el número es real: los reales están dentro de los complejos.', 'إذا كان $b=0$ فالعدد حقيقي: الأعداد الحقيقية داخل الأعداد المركبة.', 'If $b=0$, the number is real: the reals are inside the complex numbers.'), math: same('$5=5+0i$') },
            { title: say('Irudikari hutsak', 'Imaginarios puros', 'التخيلية الصرفة', 'Purely imaginary'), text: say('$a=0$ eta $b\\neq 0$ badira, irudikari hutsa da.', 'Si $a=0$ y $b\\neq 0$, es imaginario puro.', 'إذا كان $a=0$ و$b\\neq 0$ فهو تخيلي صرف.', 'If $a=0$ and $b\\neq 0$, it is purely imaginary.'), math: same('$-3i=0-3i$') },
            { title: say('Bi zenbaki berdinak', 'Dos números iguales', 'عددان متساويان', 'Two equal numbers'), text: say('Zati erreal bera eta zati irudikari bera dituzte.', 'Tienen la misma parte real y la misma parte imaginaria.', 'لهما الجزء الحقيقي نفسه والجزء التخيلي نفسه.', 'They have the same real part and the same imaginary part.'), math: same('$a+bi=4-i\\ \\to\\ a=4,\\ b=-1$') }
        ],
        examplePrompt: say('Idatzi $4-3i$ zenbakiaren aurkakoa eta konjokatua.', 'Escribe el opuesto y el conjugado de $4-3i$.', 'اكتب معاكس $4-3i$ ومرافقه.', 'Write the opposite and the conjugate of $4-3i$.'),
        example: same('$-(4-3i)=-4+3i\\qquad\\overline{4-3i}=4+3i$')
    },
    'complex-plane': {
        definitions: [
            { term: say('Afixua', 'Afijo', 'الصورة', 'Affix'), meaning: say('$(a,\\ b)$ puntua, $a+bi$ zenbakia irudikatzen duena.', 'El punto $(a,\\ b)$ que representa al número $a+bi$.', 'النقطة $(a,\\ b)$ التي تمثل العدد $a+bi$.', 'The point $(a,\\ b)$ that stands for the number $a+bi$.') }
        ],
        vocabulary: [
            say('ardatz erreala', 'eje real', 'المحور الحقيقي', 'real axis'),
            say('simetrikoa', 'simétrico', 'متناظر', 'symmetric')
        ],
        explanation: say(
            'Zenbaki konplexu bakoitza planoko puntu bat da: zati erreala ardatz horizontalean, ardatz errealean, eta zati irudikaria ardatz bertikalean, ardatz irudikarian. Errealak ardatz horizontalean daude, eta irudikari hutsak bertikalean. Puntu hori bektore bat ere bada: horregatik, konplexuak batzea bektoreak batzea da.',
            'Cada número complejo es un punto del plano: la parte real en el eje horizontal, el eje real, y la imaginaria en el vertical, el eje imaginario. Los reales quedan sobre el eje horizontal y los imaginarios puros sobre el vertical. Ese punto es también un vector: por eso, sumar complejos es sumar vectores.',
            'كل عدد مركب نقطة في المستوى: الجزء الحقيقي على المحور الأفقي، وهو المحور الحقيقي، والجزء التخيلي على العمودي، وهو المحور التخيلي. وتقع الأعداد الحقيقية على المحور الأفقي والتخيلية الصرفة على العمودي. وهذه النقطة متجه أيضًا، ولذلك فجمع الأعداد المركبة هو جمع متجهات.',
            'Each complex number is a point of the plane: the real part on the horizontal axis, the real axis, and the imaginary part on the vertical one, the imaginary axis. The reals lie on the horizontal axis and the purely imaginary numbers on the vertical one. That point is also a vector: that is why adding complex numbers is adding vectors.'
        ),
        examplePrompt: say('Non dago $-1+4i$ zenbakiaren afixua? Eta haren aurkakoarena?', '¿Dónde está el afijo de $-1+4i$? ¿Y el de su opuesto?', 'أين صورة $-1+4i$؟ وأين صورة معاكسه؟', 'Where is the affix of $-1+4i$? And that of its opposite?'),
        example: same('$-1+4i\\ \\to\\ (-1,\\ 4)\\qquad 1-4i\\ \\to\\ (1,\\ -4)$')
    },
    /* ---------- 2. Operations ---------- */
    'add-multiply': {
        definitions: [
            { term: say('Konplexuen batuketa', 'Suma de complejos', 'جمع الأعداد المركبة', 'Sum of complex numbers'), meaning: say('Zati errealak batzen dira, eta zati irudikariak ere bai: bektoreen batuketa da.', 'Se suman las partes reales y las partes imaginarias: es la suma de vectores.', 'تُجمع الأجزاء الحقيقية والأجزاء التخيلية: إنه جمع المتجهات.', 'The real parts are added and so are the imaginary parts: it is the sum of vectors.') }
        ],
        vocabulary: [
            say('biderkadura', 'producto', 'الضرب', 'product'),
            say('paralelogramoa', 'paralelogramo', 'متوازي الأضلاع', 'parallelogram')
        ],
        explanation: say(
            'Batzeko edo kentzeko, zati erreala zati errealarekin eta irudikaria irudikariarekin egiten da: bektoreak batzea bezala da, paralelogramoaren erregelarekin. Biderkatzeko, $(a+b)(c+d)$ bezala banatzen da, eta azkenean $i^2$ bakoitzaren ordez $-1$ jartzen da. Horrela, bi konplexuren biderkadurak $a+bi$ forma du berriro.',
            'Para sumar o restar, se opera la parte real con la real y la imaginaria con la imaginaria: es como sumar vectores, con la regla del paralelogramo. Para multiplicar, se reparte como en $(a+b)(c+d)$, y al final cada $i^2$ se cambia por $-1$. Así, el producto de dos complejos vuelve a tener la forma $a+bi$.',
            'للجمع أو الطرح نجري العملية على الجزء الحقيقي مع الحقيقي والتخيلي مع التخيلي: كأننا نجمع متجهات بقاعدة متوازي الأضلاع. وللضرب نوزّع كما في $(a+b)(c+d)$، وفي النهاية نضع مكان كل $i^2$ العدد $-1$. وهكذا يعود جداء عددين مركبين إلى الشكل $a+bi$.',
            'To add or subtract, work the real part with the real part and the imaginary with the imaginary: it is like adding vectors, with the parallelogram rule. To multiply, expand as in $(a+b)(c+d)$, and at the end replace each $i^2$ with $-1$. So the product of two complex numbers has the form $a+bi$ again.'
        ),
        examplePrompt: say('Kalkulatu $(5-2i)\\cdot(1+4i)$.', 'Calcula $(5-2i)\\cdot(1+4i)$.', 'احسب $(5-2i)\\cdot(1+4i)$.', 'Work out $(5-2i)\\cdot(1+4i)$.'),
        example: same('$5+20i-2i-8i^2=13+18i$')
    },
    division: {
        vocabulary: [
            say('izendatzailea', 'denominador', 'المقام', 'denominator'),
            say('zenbakitzailea', 'numerador', 'البسط', 'numerator')
        ],
        explanation: say(
            'Ezin da zatitu zatiz zati. Trikimailua arrazionalizatzean bezalakoa da: zatikia, goian eta behean, izendatzailearen konjokatuaz biderkatzen da. Behean zenbaki erreal bat geratzen da eta goian konplexu bat; beraz, nahikoa da zati bakoitza erreal horrekin zatitzea. Emaitza $a+bi$ forman idazten da.',
            'No se puede dividir parte a parte. El truco es el mismo que al racionalizar: se multiplica la fracción, arriba y abajo, por el conjugado del denominador. Abajo queda un número real y arriba un complejo, así que basta dividir cada parte entre ese real. El resultado se escribe en la forma $a+bi$.',
            'لا يمكن القسمة جزءًا على جزء. والحيلة كما في الإنطاق: نضرب الكسر، بسطه ومقامه، في مرافق المقام. فيبقى في المقام عدد حقيقي وفي البسط عدد مركب، ويكفي أن نقسم كل جزء على ذلك العدد الحقيقي. وتُكتب النتيجة بالشكل $a+bi$.',
            'You cannot divide part by part. The trick is the same as when rationalising: multiply the fraction, top and bottom, by the conjugate of the denominator. A real number is left at the bottom and a complex one at the top, so it is enough to divide each part by that real number. The result is written in the form $a+bi$.'
        ),
        examplePrompt: say('Kalkulatu $\\frac{4+2i}{1-i}$.', 'Calcula $\\frac{4+2i}{1-i}$.', 'احسب $\\frac{4+2i}{1-i}$.', 'Work out $\\frac{4+2i}{1-i}$.'),
        example: same('$\\frac{(4+2i)(1+i)}{2}=\\frac{2+6i}{2}=1+3i$'),
        why: {
            text: say(
                'Zergatik funtzionatzen du? Zenbaki bat bider haren konjokatua erreala da beti: $(a+bi)(a-bi)=a^2-b^2i^2=a^2+b^2$. Goian eta behean gauza beraz biderkatzean, zatikia ez da aldatzen, eta izendatzailetik $i$ desagertzen da.',
                '¿Por qué funciona? Un número por su conjugado da siempre un real: $(a+bi)(a-bi)=a^2-b^2i^2=a^2+b^2$. Al multiplicar arriba y abajo por lo mismo, la fracción no cambia, y la $i$ desaparece del denominador.',
                'لماذا تصح؟ العدد في مرافقه يعطي دائمًا عددًا حقيقيًا: $(a+bi)(a-bi)=a^2-b^2i^2=a^2+b^2$. وبضرب البسط والمقام في الشيء نفسه لا يتغير الكسر، وتختفي $i$ من المقام.',
                'Why does it work? A number times its conjugate is always real: $(a+bi)(a-bi)=a^2-b^2i^2=a^2+b^2$. Multiplying top and bottom by the same thing does not change the fraction, and the $i$ disappears from the denominator.'
            ),
            math: same('$(3-4i)(3+4i)=9+16=25$')
        }
    },
    'powers-of-i': {
        vocabulary: [
            say('hondarra', 'resto', 'الباقي', 'remainder'),
            say('berretzailea', 'exponente', 'الأس', 'exponent')
        ],
        explanation: say(
            '$i$ zenbakiaz behin eta berriz biderkatzean, lau balio baino ez dira ateratzen: $i$, $-1$, $-i$ eta 1, eta berriz hasieratik. Horregatik, berretura handi baterako nahikoa da berretzailea zati 4 egitea eta hondarra begiratzea: 0 bada, 1; 1 bada, $i$; 2 bada, $-1$; eta 3 bada, $-i$.',
            'Al multiplicar por $i$ una y otra vez salen solo cuatro valores: $i$, $-1$, $-i$ y 1, y vuelta a empezar. Por eso, para una potencia grande basta dividir el exponente entre 4 y mirar el resto: si es 0, la potencia vale 1; si es 1, $i$; si es 2, $-1$; y si es 3, $-i$.',
            'عند الضرب في $i$ مرة بعد مرة تظهر أربع قيم فقط: $i$ و$-1$ و$-i$ و1، ثم تبدأ من جديد. لذلك يكفي للقوة الكبيرة أن نقسم الأس على 4 وننظر إلى الباقي: إذا كان 0 فالقوة 1، وإذا كان 1 فهي $i$، وإذا كان 2 فهي $-1$، وإذا كان 3 فهي $-i$.',
            'Multiplying by $i$ again and again gives only four values: $i$, $-1$, $-i$ and 1, and then it starts again. That is why, for a large power, it is enough to divide the exponent by 4 and look at the remainder: if it is 0, the power is 1; if 1, $i$; if 2, $-1$; and if 3, $-i$.'
        ),
        examplePrompt: say('Kalkulatu $i^{35}$.', 'Calcula $i^{35}$.', 'احسب $i^{35}$.', 'Work out $i^{35}$.'),
        example: same('$35=4\\cdot 8+3\\ \\to\\ i^{35}=-i$'),
        why: {
            text: say(
                'Zergatik funtzionatzen du? $i^4=i^2\\cdot i^2=(-1)(-1)=1$ denez, lau $i$ faktore bakoitzak 1 bat osatzen du, eta ez du ezer aldatzen. Soberan geratzen direnak bakarrik zenbatzen dira: 4 zenbakiaz zatitzearen hondarra.',
                '¿Por qué funciona? Como $i^4=i^2\\cdot i^2=(-1)(-1)=1$, cada cuatro factores $i$ forman un 1, que no cambia nada. Solo cuentan los que sobran: el resto de la división entre 4.',
                'لماذا تصح؟ لأن $i^4=i^2\\cdot i^2=(-1)(-1)=1$، فكل أربعة عوامل $i$ تكوّن 1 لا يغيّر شيئًا. ولا يُحسب إلا ما يتبقى: باقي القسمة على 4.',
                'Why does it work? Since $i^4=i^2\\cdot i^2=(-1)(-1)=1$, every four factors $i$ make a 1, which changes nothing. Only the ones left over count: the remainder of the division by 4.'
            ),
            math: same('$i^{4k+r}=(i^4)^k\\cdot i^r=i^r$')
        }
    },
    'quadratic-complex': {
        definitions: [
            { term: say('Diskriminatzailea', 'Discriminante', 'المميز', 'Discriminant'), meaning: say('Erroaren barruko $\\Delta=b^2-4ac$ zenbakia; haren zeinuak soluzio errealak zenbat diren esaten du.', 'El número $\\Delta=b^2-4ac$ de dentro de la raíz; su signo dice cuántas soluciones reales hay.', 'العدد $\\Delta=b^2-4ac$ الذي تحت الجذر؛ وإشارته تبيّن عدد الحلول الحقيقية.', 'The number $\\Delta=b^2-4ac$ inside the root; its sign tells how many real solutions there are.') }
        ],
        vocabulary: [
            say('konjokatuak', 'conjugadas', 'مترافقان', 'conjugate'),
            say('koefizienteak', 'coeficientes', 'المعاملات', 'coefficients')
        ],
        explanation: say(
            'Betiko formularekin, diskriminatzailea negatiboa bada, haren erroa zenbaki irudikaria da. Orduan ekuazioak bi soluzio konplexu ditu, bata bestearen konjokatua. Koefizienteak errealak badira, soluzio konplexuak beti bikoteka agertzen dira. $\\mathbb{C}$ multzoan, bigarren mailako ekuazio batek beti du soluzioa.',
            'Con la fórmula de siempre, si el discriminante es negativo, su raíz es un número imaginario. Entonces la ecuación tiene dos soluciones complejas, una conjugada de la otra. Si los coeficientes son reales, las soluciones complejas van siempre por parejas. En $\\mathbb{C}$, una ecuación de segundo grado siempre tiene solución.',
            'بالصيغة المعتادة، إذا كان المميز سالبًا فجذره عدد تخيلي. وعندئذ يكون للمعادلة حلّان مركبان مترافقان. وإذا كانت المعاملات حقيقية فالحلول المركبة تأتي دائمًا أزواجًا. وفي $\\mathbb{C}$ يكون لمعادلة الدرجة الثانية حل دائمًا.',
            'With the usual formula, if the discriminant is negative, its root is an imaginary number. Then the equation has two complex solutions, each the conjugate of the other. If the coefficients are real, the complex solutions always come in pairs. In $\\mathbb{C}$, a second-degree equation always has a solution.'
        ),
        cases: [
            { title: say('Diskriminatzaile positiboa', 'Discriminante positivo', 'مميز موجب', 'Positive discriminant'), text: say('Bi soluzio erreal desberdin.', 'Dos soluciones reales distintas.', 'حلّان حقيقيان مختلفان.', 'Two different real solutions.'), math: same('$x^2-5x+6=0\\ \\to\\ x=2,\\ x=3$') },
            { title: say('Diskriminatzaile nulua', 'Discriminante nulo', 'مميز معدوم', 'Zero discriminant'), text: say('Soluzio erreal bikoitz bat.', 'Una solución real doble.', 'حل حقيقي مضاعف.', 'One double real solution.'), math: same('$x^2-6x+9=0\\ \\to\\ x=3$') },
            { title: say('Diskriminatzaile negatiboa', 'Discriminante negativo', 'مميز سالب', 'Negative discriminant'), text: say('Bi soluzio konplexu konjokatu.', 'Dos soluciones complejas conjugadas.', 'حلّان مركبان مترافقان.', 'Two conjugate complex solutions.'), math: same('$x^2+4x+8=0\\ \\to\\ x=-2\\pm 2i$') }
        ],
        examplePrompt: say('Ebatzi $x^2+6x+10=0$ ekuazioa.', 'Resuelve $x^2+6x+10=0$.', 'حُلّ $x^2+6x+10=0$.', 'Solve $x^2+6x+10=0$.'),
        example: same('$\\Delta=36-40=-4\\qquad x=\\frac{-6\\pm 2i}{2}=-3\\pm i$')
    },

    /* ---------- 3. Polar form ---------- */
    'modulus-argument': {
        definitions: [
            { term: say('Modulua', 'Módulo', 'الطويلة', 'Modulus'), meaning: say('Afixutik jatorrirako distantzia: $|a+bi|=\\sqrt{a^2+b^2}$.', 'La distancia del afijo al origen: $|a+bi|=\\sqrt{a^2+b^2}$.', 'المسافة من الصورة إلى الأصل: $|a+bi|=\\sqrt{a^2+b^2}$.', 'The distance from the affix to the origin: $|a+bi|=\\sqrt{a^2+b^2}$.') },
            { term: say('Argumentua', 'Argumento', 'العمدة', 'Argument'), meaning: say('Afixuaren bektoreak ardatz erreal positiboarekin egiten duen angelua, 0° eta 360° artean.', 'El ángulo que forma el vector del afijo con el semieje real positivo, entre 0° y 360°.', 'الزاوية التي يصنعها متجه الصورة مع نصف المحور الحقيقي الموجب، بين 0° و360°.', 'The angle between the vector of the affix and the positive real half-axis, between 0° and 360°.') }
        ],
        vocabulary: [
            say('koadrantea', 'cuadrante', 'الربع', 'quadrant'),
            say('distantzia', 'distancia', 'المسافة', 'distance')
        ],
        explanation: say(
            'Konplexu bat jatorritik haren afixura doan geziaren bidez ere eman daiteke: haren luzera modulua da, eta ardatz errealarekin egiten duen angelua, argumentua. Modulua Pitagorasen bidez ateratzen da. Argumenturako, kalkulagailuak −90° eta 90° arteko angelu bat ematen du; afixuaren koadrantearen arabera, 180° edo 360° batu behar zaizkio.',
            'Un complejo también se puede dar por la flecha que va del origen a su afijo: su longitud es el módulo y su ángulo con el eje real, el argumento. El módulo sale por Pitágoras. Para el argumento, la calculadora da un ángulo entre −90° y 90°; según el cuadrante del afijo, hay que sumarle 180° o 360°.',
            'يمكن أيضًا تحديد العدد المركب بالسهم الذي يذهب من الأصل إلى صورته: طوله هو الطويلة، وزاويته مع المحور الحقيقي هي العمدة. تُحسب الطويلة بمبرهنة فيثاغورس. أما العمدة فتعطي الآلة الحاسبة زاوية بين −90° و90°، وبحسب ربع الصورة نضيف إليها 180° أو 360°.',
            'A complex number can also be given by the arrow from the origin to its affix: its length is the modulus and its angle with the real axis is the argument. The modulus comes from Pythagoras. For the argument, the calculator gives an angle between −90° and 90°; depending on the quadrant of the affix, you add 180° or 360°.'
        ),
        cases: [
            { title: say('Lehen koadrantea', 'Primer cuadrante', 'الربع الأول', 'First quadrant'), text: say('$3+4i$ zenbakian, kalkulagailuaren angelua bere horretan balio du.', 'Para $3+4i$, el ángulo de la calculadora vale tal cual.', 'في $3+4i$ تصلح زاوية الآلة الحاسبة كما هي.', 'For $3+4i$, the calculator\'s angle works as it is.'), math: same('$\\alpha\\approx 53{,}13°$') },
            { title: say('Bigarren eta hirugarren koadranteak', 'Segundo y tercer cuadrante', 'الربعان الثاني والثالث', 'Second and third quadrants'), text: say('$-3+4i$ zenbakian, 180° batzen zaizkio kalkulagailuaren angeluari.', 'Para $-3+4i$, se suma 180° al ángulo de la calculadora.', 'في $-3+4i$ نضيف 180° إلى زاوية الآلة الحاسبة.', 'For $-3+4i$, add 180° to the calculator\'s angle.'), math: same('$\\alpha\\approx -53{,}13°+180°=126{,}87°$') },
            { title: say('Laugarren koadrantea', 'Cuarto cuadrante', 'الربع الرابع', 'Fourth quadrant'), text: say('$3-4i$ zenbakian, 360° batzen zaizkio.', 'Para $3-4i$, se suma 360°.', 'في $3-4i$ نضيف 360°.', 'For $3-4i$, add 360°.'), math: same('$\\alpha\\approx -53{,}13°+360°=306{,}87°$') }
        ],
        examplePrompt: say('Aurkitu $-2-2i$ zenbakiaren modulua eta argumentua.', 'Halla el módulo y el argumento de $-2-2i$.', 'أوجد طويلة $-2-2i$ وعمدته.', 'Find the modulus and the argument of $-2-2i$.'),
        example: same('$|-2-2i|=\\sqrt{8}=2\\sqrt{2}\\qquad\\alpha=225°$')
    },
    'polar-binomial': {
        definitions: [
            { term: say('Forma polarra', 'Forma polar', 'الشكل القطبي', 'Polar form'), meaning: say('Modulua eta argumentua emanez idatzitako konplexua: $r_\\alpha$.', 'El complejo dado por su módulo y su argumento: $r_\\alpha$.', 'العدد المركب المعطى بطويلته وعمدته: $r_\\alpha$.', 'The complex number given by its modulus and its argument: $r_\\alpha$.') },
            { term: say('Forma trigonometrikoa', 'Forma trigonométrica', 'الشكل المثلثي', 'Trigonometric form'), meaning: say('Bera, $r(\\cos\\alpha+i\\sin\\alpha)$ gisa idatzita.', 'La misma, escrita como $r(\\cos\\alpha+i\\sin\\alpha)$.', 'الشكل نفسه مكتوبًا $r(\\cos\\alpha+i\\sin\\alpha)$.', 'The same, written as $r(\\cos\\alpha+i\\sin\\alpha)$.') }
        ],
        vocabulary: [
            say('kosinua', 'coseno', 'جيب التمام', 'cosine'),
            say('sinua', 'seno', 'الجيب', 'sine')
        ],
        explanation: say(
            'Forma polarrak modulua eta argumentua ematen ditu: $2_{60°}$ jatorritik 2 unitatera dagoen eta 60° angelua duen konplexua da. Forma binomikora itzultzeko triangeluaren trigonometria erabiltzen da: zati erreala $r\\cos\\alpha$ da, eta irudikaria $r\\sin\\alpha$. Horregatik $r(\\cos\\alpha+i\\sin\\alpha)$ ere idazten da.',
            'La forma polar da el módulo y el argumento: $2_{60°}$ es el complejo a distancia 2 del origen y con ángulo 60°. Para volver a la forma binómica se usa la trigonometría del triángulo: la parte real es $r\\cos\\alpha$ y la imaginaria, $r\\sin\\alpha$. Por eso también se escribe $r(\\cos\\alpha+i\\sin\\alpha)$.',
            'الشكل القطبي يعطي الطويلة والعمدة: $2_{60°}$ هو العدد المركب الذي يبعد 2 عن الأصل وزاويته 60°. وللعودة إلى الشكل الجبري نستعمل حساب المثلثات: الجزء الحقيقي $r\\cos\\alpha$ والتخيلي $r\\sin\\alpha$. ولذلك يُكتب أيضًا $r(\\cos\\alpha+i\\sin\\alpha)$.',
            'The polar form gives the modulus and the argument: $2_{60°}$ is the complex number at distance 2 from the origin and with angle 60°. To go back to the binomial form, use the trigonometry of the triangle: the real part is $r\\cos\\alpha$ and the imaginary part $r\\sin\\alpha$. That is why it is also written $r(\\cos\\alpha+i\\sin\\alpha)$.'
        ),
        examplePrompt: say('Idatzi $1+i$ forma polarrean.', 'Escribe $1+i$ en forma polar.', 'اكتب $1+i$ بالشكل القطبي.', 'Write $1+i$ in polar form.'),
        example: same('$|1+i|=\\sqrt{2}\\qquad 1+i=\\sqrt{2}_{45°}$')
    },

    /* ---------- 4. Turns and powers ---------- */
    'product-quotient': {
        vocabulary: [
            say('moduluak', 'módulos', 'الطويلات', 'moduli'),
            say('argumentuak', 'argumentos', 'العُمَد', 'arguments')
        ],
        explanation: say(
            'Forma binomikoan biderkatzea eta zatitzea lan handia da; forma polarrean, oso erraza. Biderkatzean, moduluak biderkatu eta argumentuak batu egiten dira. Zatitzean, moduluak zatitu eta argumentuak kendu egiten dira. Emaitzak 360° gainditzen baditu, bira bat kentzen zaio.',
            'En forma binómica, multiplicar y dividir cuesta; en forma polar es muy sencillo. Al multiplicar, los módulos se multiplican y los argumentos se suman. Al dividir, los módulos se dividen y los argumentos se restan. Si el resultado se pasa de 360°, se le resta una vuelta.',
            'الضرب والقسمة في الشكل الجبري متعبان، وفي الشكل القطبي سهلان جدًا. عند الضرب تُضرب الطويلات وتُجمع العُمَد. وعند القسمة تُقسم الطويلات وتُطرح العُمَد. وإذا تجاوزت النتيجة 360° نطرح منها دورة.',
            'In binomial form, multiplying and dividing take work; in polar form they are very easy. To multiply, the moduli multiply and the arguments add. To divide, the moduli divide and the arguments subtract. If the result goes past 360°, take away a turn.'
        ),
        examplePrompt: say('Kalkulatu $5_{200°}\\cdot 3_{250°}$.', 'Calcula $5_{200°}\\cdot 3_{250°}$.', 'احسب $5_{200°}\\cdot 3_{250°}$.', 'Work out $5_{200°}\\cdot 3_{250°}$.'),
        example: same('$15_{450°}=15_{90°}=15i$'),
        why: {
            text: say(
                'Zergatik funtzionatzen du? Biderkatu bi forma trigonometrikoak: zati erreala $\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta$ da, hau da, $\\cos(\\alpha+\\beta)$, eta irudikaria $\\sin(\\alpha+\\beta)$. Batuketaren formulak dira.',
                '¿Por qué funciona? Multiplica las dos formas trigonométricas: la parte real queda $\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta$, que es $\\cos(\\alpha+\\beta)$, y la imaginaria, $\\sin(\\alpha+\\beta)$. Son las fórmulas de la suma.',
                'لماذا تصح؟ اضرب الشكلين المثلثيين: يصير الجزء الحقيقي $\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta$، أي $\\cos(\\alpha+\\beta)$، والتخيلي $\\sin(\\alpha+\\beta)$. إنها صيغ المجموع.',
                'Why does it work? Multiply the two trigonometric forms: the real part is $\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta$, which is $\\cos(\\alpha+\\beta)$, and the imaginary part $\\sin(\\alpha+\\beta)$. They are the sum formulas.'
            ),
            math: same('$\\begin{gathered}(\\cos\\alpha+i\\sin\\alpha)(\\cos\\beta+i\\sin\\beta)\\\\ =\\cos(\\alpha+\\beta)+i\\sin(\\alpha+\\beta)\\end{gathered}$')
        }
    },
    rotations: {
        definitions: [
            { term: say('Biraketa', 'Giro', 'الدوران', 'Rotation'), meaning: say('Puntu bakoitza zentro baten inguruan angelu berean mugitzen duen higidura, zentrorako distantzia aldatu gabe.', 'Un movimiento que lleva cada punto un mismo ángulo alrededor de un centro, sin cambiar su distancia a él.', 'حركة تنقل كل نقطة بالزاوية نفسها حول مركز دون أن تتغير مسافتها عنه.', 'A movement that takes every point through the same angle about a centre, without changing its distance to it.') }
        ],
        vocabulary: [
            say('jatorria', 'origen', 'الأصل', 'origin'),
            say('angelua', 'ángulo', 'الزاوية', 'angle')
        ],
        explanation: say(
            '1 moduluko konplexu batez biderkatzeak ez du modulua aldatzen, baina haren argumentua batzen du: afixua jatorriaren inguruan biratzen da. Horregatik $i$ zenbakiak, $1_{90°}$ baita, 90° biratzen du, eta $-1$ zenbakiak bira erdia ematen du. 60° biratzeko, $1_{60°}$ zenbakiaz biderkatzen da. Modulua 1 ez bada, gainera luzatu egiten da.',
            'Multiplicar por un complejo de módulo 1 no cambia el módulo, pero suma su argumento: el afijo gira alrededor del origen. Por eso $i$, que es $1_{90°}$, gira 90°, y $-1$ da media vuelta. Para girar 60°, se multiplica por $1_{60°}$. Si el módulo no es 1, además se estira.',
            'الضرب في عدد مركب طويلته 1 لا يغيّر الطويلة، لكنه يضيف عمدته: فتدور الصورة حول الأصل. لذلك فإن $i$، وهو $1_{90°}$، يدوّر 90°، و$-1$ يدوّر نصف دورة. وللدوران 60° نضرب في $1_{60°}$. وإذا لم تكن الطويلة 1 فإنه يمدّ أيضًا.',
            'Multiplying by a complex number of modulus 1 does not change the modulus, but it adds its argument: the affix turns about the origin. That is why $i$, which is $1_{90°}$, turns 90°, and $-1$ makes half a turn. To turn 60°, multiply by $1_{60°}$. If the modulus is not 1, it also stretches.'
        ),
        examplePrompt: say('Biratu $(1,\\ 5)$ puntua 90° jatorriaren inguruan.', 'Gira el punto $(1,\\ 5)$ 90° alrededor del origen.', 'دوّر النقطة $(1,\\ 5)$ بزاوية 90° حول الأصل.', 'Turn the point $(1,\\ 5)$ through 90° about the origin.'),
        example: same('$(1+5i)\\cdot i=-5+i\\ \\to\\ (-5,\\ 1)$')
    },
    'de-moivre': {
        definitions: [
            { term: say('Moivreren formula', 'Fórmula de Moivre', 'صيغة دي موافر', 'De Moivre\'s formula'), meaning: say('Forma polarreko konplexu bat berretzeko erregela: modulua berretu eta argumentua biderkatu.', 'La regla para elevar un complejo en forma polar: se eleva el módulo y se multiplica el argumento.', 'قاعدة رفع عدد مركب في الشكل القطبي إلى قوة: نرفع الطويلة ونضرب العمدة.', 'The rule for raising a complex number in polar form to a power: raise the modulus and multiply the argument.') }
        ],
        vocabulary: [
            say('berretura', 'potencia', 'القوة', 'power'),
            say('bira', 'vuelta', 'دورة', 'turn')
        ],
        explanation: say(
            'Forma binomikoan $(1+i)^8$ kalkulatzeko, zortzi aldiz biderkatu beharko litzateke. Forma polarrean erregela bat nahikoa da: modulua berretzailera jasotzen da, eta argumentua bider berretzailea egiten da. Argumentuak 360° gainditzen baditu, bira osoak kentzen zaizkio.',
            'Para elevar $(1+i)^8$ en forma binómica habría que multiplicar ocho veces. En polar basta una regla: el módulo se eleva a la potencia y el argumento se multiplica por el exponente. Si el argumento se pasa de 360°, se le quitan vueltas enteras.',
            'لحساب $(1+i)^8$ بالشكل الجبري يجب أن نضرب ثماني مرات. أما في الشكل القطبي فتكفي قاعدة واحدة: تُرفع الطويلة إلى القوة وتُضرب العمدة في الأس. وإذا تجاوزت العمدة 360° نطرح منها دورات كاملة.',
            'To work out $(1+i)^8$ in binomial form you would have to multiply eight times. In polar form one rule is enough: the modulus is raised to the power and the argument is multiplied by the exponent. If the argument goes past 360°, take away whole turns.'
        ),
        examplePrompt: say('Kalkulatu $(1-i)^4$.', 'Calcula $(1-i)^4$.', 'احسب $(1-i)^4$.', 'Work out $(1-i)^4$.'),
        example: same('$1-i=\\sqrt{2}_{315°}\\qquad(\\sqrt{2}_{315°})^4=4_{1260°}=4_{180°}=-4$'),
        why: {
            text: say(
                'Zergatik funtzionatzen du? Berretura bat biderkadura errepikatua da: $r_\\alpha\\cdot r_\\alpha\\cdot\\ldots\\cdot r_\\alpha$. Biderkatzean, $n$ moduluak biderkatu egiten dira, $r^n$, eta $n$ argumentuak batu, $n\\alpha$.',
                '¿Por qué funciona? Una potencia es un producto repetido: $r_\\alpha\\cdot r_\\alpha\\cdot\\ldots\\cdot r_\\alpha$. Al multiplicar, los $n$ módulos se multiplican, $r^n$, y los $n$ argumentos se suman, $n\\alpha$.',
                'لماذا تصح؟ القوة جداء مكرر: $r_\\alpha\\cdot r_\\alpha\\cdot\\ldots\\cdot r_\\alpha$. وعند الضرب تُضرب الطويلات الـ $n$ فنحصل على $r^n$، وتُجمع العُمَد الـ $n$ فنحصل على $n\\alpha$.',
                'Why does it work? A power is a repeated product: $r_\\alpha\\cdot r_\\alpha\\cdot\\ldots\\cdot r_\\alpha$. When multiplying, the $n$ moduli multiply, $r^n$, and the $n$ arguments add, $n\\alpha$.'
            ),
            math: same('$(r_\\alpha)^3=r_\\alpha\\cdot r_\\alpha\\cdot r_\\alpha=(r^3)_{3\\alpha}$')
        }
    },

    /* ---------- 5. Roots ---------- */
    'nth-roots': {
        definitions: [
            { term: say('Erro n-garrena', 'Raíz n-ésima', 'الجذر النوني', 'n-th root'), meaning: say('$w$ zenbaki bat, $w^n={z}$ betetzen duena.', 'Un número $w$ que cumple $w^n={z}$.', 'عدد $w$ يحقق $w^n={z}$.', 'A number $w$ such that $w^n={z}$.') }
        ],
        vocabulary: [
            say('erro kubikoak', 'raíces cúbicas', 'الجذور التكعيبية', 'cube roots'),
            say('bira', 'vuelta', 'دورة', 'turn')
        ],
        explanation: say(
            '0 ez den zenbaki konplexu batek ez du erro $n$-garren bakarra: $n$ ditu. Guztiek modulu bera dute, moduluaren erro $n$-garrena. Haien argumentuak argumentuari bira osoak batu eta $n$ zenbakiaz zatituta ateratzen dira: $\\alpha$, $\\alpha+360°$, $\\alpha+720°$… Horregatik, ondoz ondoko bi erro $\\frac{360°}{n}$ banatzen dira.',
            'Un número complejo distinto de 0 no tiene una raíz $n$-ésima, sino $n$. Todas tienen el mismo módulo, la raíz $n$-ésima del módulo. Sus argumentos salen de dividir entre $n$ el argumento más vueltas enteras: $\\alpha$, $\\alpha+360°$, $\\alpha+720°$… Por eso dos raíces seguidas se separan $\\frac{360°}{n}$.',
            'العدد المركب غير المعدوم ليس له جذر واحد من الرتبة $n$ بل $n$ جذرًا. ولها كلها الطويلة نفسها، وهي الجذر من الرتبة $n$ للطويلة. وتخرج عُمَدها بقسمة العمدة مضافًا إليها دورات كاملة على $n$: $\\alpha$ و$\\alpha+360°$ و$\\alpha+720°$… لذلك تفصل بين كل جذرين متتاليين $\\frac{360°}{n}$.',
            'A complex number other than 0 does not have one $n$-th root, but $n$. They all have the same modulus, the $n$-th root of the modulus. Their arguments come from dividing by $n$ the argument plus whole turns: $\\alpha$, $\\alpha+360°$, $\\alpha+720°$… That is why two roots in a row are $\\frac{360°}{n}$ apart.'
        ),
        examplePrompt: say('Aurkitu $9_{100°}$ zenbakiaren erro karratuak.', 'Halla las raíces cuadradas de $9_{100°}$.', 'أوجد الجذرين التربيعيين لـ $9_{100°}$.', 'Find the square roots of $9_{100°}$.'),
        example: same('$3_{50°}\\qquad 3_{230°}$'),
        why: {
            text: say(
                'Zergatik funtzionatzen du? $r_\\alpha$ zenbakia $r_{\\alpha+360°}$ ere bada, eta $r_{\\alpha+720°}$…: zenbaki bera, bira gehiagorekin. $n$ zenbakiaz zatitzean, bira bakoitzak argumentu desberdin bat ematen du, $k=n$ denean lehena errepikatzen den arte.',
                '¿Por qué funciona? $r_\\alpha$ es también $r_{\\alpha+360°}$, $r_{\\alpha+720°}$…: el mismo número con vueltas de más. Al dividir entre $n$, cada vuelta da un argumento distinto, hasta que con $k=n$ se repite el primero.',
                'لماذا تصح؟ العدد $r_\\alpha$ هو أيضًا $r_{\\alpha+360°}$ و$r_{\\alpha+720°}$…: العدد نفسه بدورات زائدة. وعند القسمة على $n$ تعطي كل دورة عمدة مختلفة، حتى يتكرر الأول عندما $k=n$.',
                'Why does it work? $r_\\alpha$ is also $r_{\\alpha+360°}$, $r_{\\alpha+720°}$…: the same number with extra turns. Dividing by $n$, each turn gives a different argument, until the first one repeats with $k=n$.'
            ),
            math: same('$(2_{150°})^3=8_{450°}=8_{90°}$')
        }
    },
    'roots-polygons': {
        definitions: [
            { term: say('Unitatearen erroak', 'Raíces de la unidad', 'جذور الواحد', 'Roots of unity'), meaning: say('${z}^n=1$ ekuazioaren soluzioak: erpin bat 1 puntuan duen poligono erregular baten erpinak.', 'Las soluciones de ${z}^n=1$: los vértices de un polígono regular con un vértice en 1.', 'حلول ${z}^n=1$: رؤوس مضلع منتظم أحد رؤوسه 1.', 'The solutions of ${z}^n=1$: the vertices of a regular polygon with a vertex at 1.') }
        ],
        vocabulary: [
            say('erpinak', 'vértices', 'الرؤوس', 'vertices'),
            say('poligono erregularra', 'polígono regular', 'مضلع منتظم', 'regular polygon')
        ],
        explanation: say(
            'Erro $n$-garren guztiek modulu bera dute; beraz, jatorrian zentratutako zirkunferentzia batean daude. Haien argumentuak beti $\\frac{360°}{n}$ banatzen direnez, distantzia berean banatuta geratzen dira: poligono erregular baten erpinak dira. Erro laugarrenek karratu bat osatzen dute; seigarrenek, hexagono bat.',
            'Todas las raíces $n$-ésimas tienen el mismo módulo, así que están en una circunferencia centrada en el origen. Como sus argumentos se separan siempre $\\frac{360°}{n}$, quedan repartidas a la misma distancia: son los vértices de un polígono regular. Las raíces cuartas forman un cuadrado; las sextas, un hexágono.',
            'للجذور من الرتبة $n$ كلها الطويلة نفسها، فهي على دائرة مركزها الأصل. ولأن عُمَدها تفصل بينها دائمًا $\\frac{360°}{n}$ فإنها تتوزع على مسافات متساوية: إنها رؤوس مضلع منتظم. فالجذور الرابعة تشكّل مربعًا، والسادسة سداسيًا.',
            'All the $n$-th roots have the same modulus, so they lie on a circle centred at the origin. As their arguments are always $\\frac{360°}{n}$ apart, they are evenly spread: they are the vertices of a regular polygon. The fourth roots make a square; the sixth roots, a hexagon.'
        ),
        examplePrompt: say('Aurkitu 1 zenbakiaren erro laugarrenak.', 'Halla las raíces cuartas de 1.', 'أوجد الجذور الرابعة للعدد 1.', 'Find the fourth roots of 1.'),
        example: same('$1\\qquad i\\qquad -1\\qquad -i$')
    },
    'binomial-equations': {
        definitions: [
            { term: say('Ekuazio binomikoa', 'Ecuación binómica', 'معادلة ذات حدين', 'Binomial equation'), meaning: say('${z}^n=w$ erako ekuazioa, bi gai baino ez dituena.', 'Una ecuación de la forma ${z}^n=w$, con solo dos términos.', 'معادلة من الشكل ${z}^n=w$ لها حدّان فقط.', 'An equation of the form ${z}^n=w$, with only two terms.') }
        ],
        vocabulary: [
            say('soluzioak', 'soluciones', 'الحلول', 'solutions'),
            say('konjokatuak', 'conjugadas', 'مترافقة', 'conjugate')
        ],
        explanation: say(
            'Zenbaki errealetan, ${z}^4=16$ ekuazioak bi soluzio baino ez ditu, 2 eta −2. $\\mathbb{C}$ multzoan lau ditu: 16 zenbakiaren erro laugarrenak, hau da, 2, $2i$, $-2$ eta $-2i$. Oro har, ${z}^n=w$ ekuazioak $n$ soluzio ditu, eta $w$ erreala bada, errealak ez diren soluzioak konjokatuak dira, bikoteka.',
            'En los reales, ${z}^4=16$ solo tiene dos soluciones, 2 y −2. En $\\mathbb{C}$ tiene cuatro: las raíces cuartas de 16, que son 2, $2i$, $-2$ y $-2i$. En general, ${z}^n=w$ tiene $n$ soluciones y, si $w$ es real, las que no son reales van por parejas de conjugadas.',
            'في الأعداد الحقيقية ليس للمعادلة ${z}^4=16$ إلا حلّان، 2 و−2. وفي $\\mathbb{C}$ لها أربعة حلول: الجذور الرابعة لـ 16، وهي 2 و$2i$ و$-2$ و$-2i$. وعمومًا للمعادلة ${z}^n=w$ عدد $n$ من الحلول، وإذا كان $w$ حقيقيًا فالحلول غير الحقيقية تأتي أزواجًا مترافقة.',
            'In the reals, ${z}^4=16$ has only two solutions, 2 and −2. In $\\mathbb{C}$ it has four: the fourth roots of 16, which are 2, $2i$, $-2$ and $-2i$. In general, ${z}^n=w$ has $n$ solutions and, if $w$ is real, the ones that are not real come in conjugate pairs.'
        ),
        examplePrompt: say('Ebatzi ${z}^4=-16$ ekuazioa.', 'Resuelve ${z}^4=-16$.', 'حُلّ ${z}^4=-16$.', 'Solve ${z}^4=-16$.'),
        example: same('$2_{45°}\\qquad 2_{135°}\\qquad 2_{225°}\\qquad 2_{315°}$')
    }
}
