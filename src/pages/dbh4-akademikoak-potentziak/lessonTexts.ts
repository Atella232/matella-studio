import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { PowersTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Berreturak, erroak eta logaritmoak · 4. DBH akademikoak — what each lesson
   tells: the new words (definitions), a short explanation, its cases, the
   example as an exercise («Another example»), the key words in four
   languages and, in four lessons, «Why does it work?». Plain data so the
   tests can import it; lessons.tsx merges it into the topics. The example
   uses numbers of its own, never those of «Let's solve», of «Check it» or
   of the typical mistake. Arabic writes the decimal point ({,} becomes .).
   Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const powersLessonTexts: Record<PowersTopicId, LessonTexts> = {
    /* ---------- 1. Powers ---------- */
    'integer-powers': {
        definitions: [
            {
                term: say('Alderantzizkoa', 'Inverso', 'المقلوب', 'Reciprocal'),
                meaning: say('Zenbaki batekin biderkatuta 1 ematen duen zenbakia: $a$ zenbakiarena $\\frac{1}{a}$ da.', 'El número que, multiplicado por otro, da 1: el inverso de $a$ es $\\frac{1}{a}$.', 'العدد الذي إذا ضُرب في عدد آخر أعطى 1: مقلوب $a$ هو $\\frac{1}{a}$.', 'The number that gives 1 when multiplied by another: the reciprocal of $a$ is $\\frac{1}{a}$.')
            }
        ],
        vocabulary: [
            say('oinarria', 'base', 'الأساس', 'base'),
            say('berretzailea', 'exponente', 'الأس', 'exponent'),
            say('bakoitia', 'impar', 'فردي', 'odd')
        ],
        explanation: say(
            'Oinarria negatiboa bada, berretzaile bikoitiak emaitza positiboa ematen du, eta bakoitiak, negatiboa: $(-2)^{4}=16$, baina $(-2)^{5}=-32$. Kontuz: $-2^{4}=-16$ berreturan, berretzaileak 2 zenbakiari bakarrik eragiten dio. Gainera, $a^{0}=1$ ($a\\neq 0$ bada), eta berretzaile negatiboak alderantzizkoa ematen du.',
            'Si la base es negativa, un exponente par da un resultado positivo, y uno impar, negativo: $(-2)^{4}=16$, pero $(-2)^{5}=-32$. Cuidado: en $-2^{4}=-16$ el exponente solo afecta al 2. Además, $a^{0}=1$ (con $a\\neq 0$) y el exponente negativo da el inverso.',
            'إذا كان الأساس سالبًا فالأس الزوجي يعطي نتيجة موجبة والأس الفردي نتيجة سالبة: $(-2)^{4}=16$ لكن $(-2)^{5}=-32$. انتبه: في $-2^{4}=-16$ يؤثر الأس في العدد 2 وحده. كذلك $a^{0}=1$ (إذا كان $a\\neq 0$)، والأس السالب يعطي المقلوب.',
            'If the base is negative, an even exponent gives a positive result and an odd one a negative result: $(-2)^{4}=16$, but $(-2)^{5}=-32$. Careful: in $-2^{4}=-16$ the exponent only acts on the 2. Also, $a^{0}=1$ (when $a\\neq 0$), and a negative exponent gives the reciprocal.'
        ),
        cases: [
            { title: say('Zero berretzailea', 'Exponente cero', 'الأس صفر', 'Zero exponent'), text: say('0 ez den edozein oinarrik 1 ematen du.', 'Cualquier base distinta de 0 da 1.', 'كل أساس غير الصفر يعطي 1.', 'Any base other than 0 gives 1.'), math: same('$a^{0}=1$') },
            { title: say('Berretzaile negatiboa', 'Exponente negativo', 'الأس السالب', 'Negative exponent'), text: say('Berretzaile positiboko berreturaren alderantzizkoa da.', 'Es el inverso de la potencia con exponente positivo.', 'هو مقلوب القوة ذات الأس الموجب.', 'It is the reciprocal of the power with a positive exponent.'), math: same('$a^{-n}=\\frac{1}{a^{n}}$') },
            { title: say('Zatiki bat', 'Una fracción', 'كسر', 'A fraction'), text: say('Buelta eman zatikiari, eta berretzailea positibo bihurtzen da.', 'Se da la vuelta a la fracción y el exponente pasa a ser positivo.', 'نقلب الكسر فيصير الأس موجبًا.', 'Turn the fraction upside down and the exponent becomes positive.'), math: same('$\\left(\\frac{a}{b}\\right)^{-n}=\\left(\\frac{b}{a}\\right)^{n}$') }
        ],
        examplePrompt: say('Kalkulatu $(-5)^{-2}$ eta $\\left(\\frac{1}{3}\\right)^{-4}$.', 'Calcula $(-5)^{-2}$ y $\\left(\\frac{1}{3}\\right)^{-4}$.', 'احسب $(-5)^{-2}$ و$\\left(\\frac{1}{3}\\right)^{-4}$.', 'Work out $(-5)^{-2}$ and $\\left(\\frac{1}{3}\\right)^{-4}$.'),
        example: same('$\\begin{gathered}(-5)^{-2}=\\frac{1}{(-5)^{2}}=\\frac{1}{25}\\\\ \\left(\\frac{1}{3}\\right)^{-4}=3^{4}=81\\end{gathered}$'),
        exampleAnswer: say('$\\frac{1}{25}$ eta $81$: berretzaile negatiboak buelta ematen dio oinarriari.', '$\\frac{1}{25}$ y $81$: el exponente negativo da la vuelta a la base.', '$\\frac{1}{25}$ و$81$: الأس السالب يقلب الأساس.', '$\\frac{1}{25}$ and $81$: the negative exponent turns the base upside down.'),
        why: {
            text: say(
                'Begiratu 2 zenbakiaren berreturei: berretzailea 1 jaisten den bakoitzean, emaitza 2 zenbakiaz zatitzen da. $2^{1}=2$ berreturatik $2^{0}=1$ berreturara pasatzen da, eta gero $2^{-1}=\\frac{1}{2}$ eta $2^{-2}=\\frac{1}{4}$ berreturetara. Berretzaileak kenduz ere ateratzen da: $\\frac{a^{3}}{a^{3}}=1$ da, eta $a^{3-3}=a^{0}$.',
                'Mira las potencias de 2: cada vez que el exponente baja 1, el resultado se divide entre 2. De $2^{1}=2$ se pasa a $2^{0}=1$, y después a $2^{-1}=\\frac{1}{2}$ y $2^{-2}=\\frac{1}{4}$. También sale restando exponentes: $\\frac{a^{3}}{a^{3}}=1$, y es $a^{3-3}=a^{0}$.',
                'انظر إلى قوى العدد 2: كلما نقص الأس 1 قُسمت النتيجة على 2. من $2^{1}=2$ ننتقل إلى $2^{0}=1$، ثم إلى $2^{-1}=\\frac{1}{2}$ و$2^{-2}=\\frac{1}{4}$. ويظهر ذلك أيضًا بطرح الأسس: $\\frac{a^{3}}{a^{3}}=1$، وهو $a^{3-3}=a^{0}$.',
                'Look at the powers of 2: each time the exponent goes down by 1, the result is divided by 2. From $2^{1}=2$ you go to $2^{0}=1$, then to $2^{-1}=\\frac{1}{2}$ and $2^{-2}=\\frac{1}{4}$. Subtracting exponents gives it too: $\\frac{a^{3}}{a^{3}}=1$, and it is $a^{3-3}=a^{0}$.'
            ),
            math: same('$\\frac{2^{3}}{2^{3}}=2^{3-3}=2^{0}=1$')
        }
    },
    'power-rules': {
        vocabulary: [
            say('faktorizatu', 'factorizar', 'حلّل', 'factorise'),
            say('zenbaki lehenak', 'números primos', 'الأعداد الأولية', 'prime numbers'),
            say('berretzailea', 'exponente', 'الأس', 'exponent')
        ],
        explanation: say(
            'Oinarri bera dutenean, berreturak berretzaileekin egiten dira. Berretzaile bera dutenean, oinarriak elkar daitezke: $a^{n}\\cdot b^{n}=(a\\cdot b)^{n}$. Oinarriak desberdinak badira, faktorizatu lehenik zenbaki lehenetan ($12=2^{2}\\cdot 3$) eta bildu zenbaki lehen bakoitzaren berretzaileak. Berretzaile negatiboek arau berberak betetzen dituzte.',
            'Con la misma base, las potencias se operan con los exponentes. Con el mismo exponente, se pueden juntar las bases: $a^{n}\\cdot b^{n}=(a\\cdot b)^{n}$. Si las bases son distintas, factorízalas primero en números primos ($12=2^{2}\\cdot 3$) y agrupa los exponentes de cada primo. Los exponentes negativos siguen las mismas reglas.',
            'مع الأساس نفسه نجري العمليات على الأسس. ومع الأس نفسه يمكن جمع الأساسات: $a^{n}\\cdot b^{n}=(a\\cdot b)^{n}$. وإذا اختلفت الأساسات حلّلها أولًا إلى أعداد أولية ($12=2^{2}\\cdot 3$) واجمع أسس كل عدد أولي. والأسس السالبة تتبع القواعد نفسها.',
            'With the same base, you operate with the exponents. With the same exponent, you can put the bases together: $a^{n}\\cdot b^{n}=(a\\cdot b)^{n}$. If the bases are different, first factorise them into prime numbers ($12=2^{2}\\cdot 3$) and group the exponents of each prime. Negative exponents follow the same rules.'
        ),
        cases: [
            { title: say('Biderkadura', 'Producto', 'الضرب', 'Product'), text: say('Berretzaileak batzen dira.', 'Se suman los exponentes.', 'تُجمع الأسس.', 'Add the exponents.'), math: same('$a^{m}\\cdot a^{n}=a^{m+n}$') },
            { title: say('Zatidura', 'Cociente', 'القسمة', 'Quotient'), text: say('Berretzaileak kentzen dira.', 'Se restan los exponentes.', 'تُطرح الأسس.', 'Subtract the exponents.'), math: same('$a^{m}\\div a^{n}=a^{m-n}$') },
            { title: say('Berreturaren berretura', 'Potencia de potencia', 'قوة القوة', 'Power of a power'), text: say('Berretzaileak biderkatzen dira.', 'Se multiplican los exponentes.', 'تُضرب الأسس.', 'Multiply the exponents.'), math: same('$(a^{m})^{n}=a^{m\\cdot n}$') }
        ],
        examplePrompt: say('Sinplifikatu $\\frac{6^{2}\\cdot 3^{-1}}{2^{3}}$.', 'Simplifica $\\frac{6^{2}\\cdot 3^{-1}}{2^{3}}$.', 'بسّط $\\frac{6^{2}\\cdot 3^{-1}}{2^{3}}$.', 'Simplify $\\frac{6^{2}\\cdot 3^{-1}}{2^{3}}$.'),
        example: same('$\\begin{aligned}\\frac{2^{2}\\cdot 3^{2}\\cdot 3^{-1}}{2^{3}}&=2^{2-3}\\cdot 3^{2-1}\\\\&=\\frac{3}{2}\\end{aligned}$'),
        exampleAnswer: say('$\\frac{3}{2}$: 2 zenbakitik $2^{-1}$ geratzen da, eta 3 zenbakitik, $3^{1}$.', '$\\frac{3}{2}$: del 2 queda $2^{-1}$, y del 3, $3^{1}$.', '$\\frac{3}{2}$: يبقى من 2 العامل $2^{-1}$، ومن 3 العامل $3^{1}$.', '$\\frac{3}{2}$: from the 2s, $2^{-1}$ is left, and from the 3s, $3^{1}$.')
    },
    scientific: {
        definitions: [
            {
                term: say('Idazkera zientifikoa', 'Notación científica', 'الترميز العلمي', 'Scientific notation'),
                meaning: say('Zenbaki bat $a\\cdot 10^{n}$ gisa idaztea, $1\\le a<10$ eta $n$ osoa izanik.', 'Escribir un número como $a\\cdot 10^{n}$, con $1\\le a<10$ y $n$ entero.', 'كتابة العدد على صورة $a\\cdot 10^{n}$ حيث $1\\le a<10$ و$n$ صحيح.', 'Writing a number as $a\\cdot 10^{n}$, with $1\\le a<10$ and $n$ an integer.')
            }
        ],
        vocabulary: [
            say('berretzailea', 'exponente', 'الأس', 'exponent'),
            say('zenbaki oso handiak', 'números muy grandes', 'أعداد كبيرة جدًا', 'very large numbers')
        ],
        explanation: say(
            'Zenbaki oso handi edo oso txikietarako da: Lurretik Eguzkirako distantzia $1{,}49\\cdot 10^{8}$ km da. Biderkatzeko, zenbakiak biderkatu eta berretzaileak batu; zatitzeko, zenbakiak zatitu eta berretzaileak kendu. Batzeko edo kentzeko, lehenik berretzaile bera. Amaieran, egokitu $a$ 1 eta 10 artean.',
            'Sirve para números muy grandes o muy pequeños: la distancia de la Tierra al Sol es $1{,}49\\cdot 10^{8}$ km. Para multiplicar, se multiplican los números y se suman los exponentes; para dividir, se dividen y se restan. Para sumar o restar, primero el mismo exponente. Al final se ajusta $a$ entre 1 y 10.',
            'يستعمل للأعداد الكبيرة جدًا أو الصغيرة جدًا: المسافة بين الأرض والشمس $1{,}49\\cdot 10^{8}$ كم. للضرب نضرب الأعداد ونجمع الأسس، وللقسمة نقسم ونطرح. وللجمع أو الطرح نوحّد الأس أولًا. وفي النهاية نعدّل $a$ ليكون بين 1 و10.',
            'It is for very large or very small numbers: the distance from the Earth to the Sun is $1{,}49\\cdot 10^{8}$ km. To multiply, multiply the numbers and add the exponents; to divide, divide them and subtract. To add or subtract, first use the same exponent. At the end, adjust $a$ to lie between 1 and 10.'
        ),
        examplePrompt: say('Kalkulatu $3{,}2\\cdot 10^{5}+4{,}5\\cdot 10^{4}$.', 'Calcula $3{,}2\\cdot 10^{5}+4{,}5\\cdot 10^{4}$.', 'احسب $3{,}2\\cdot 10^{5}+4{,}5\\cdot 10^{4}$.', 'Work out $3{,}2\\cdot 10^{5}+4{,}5\\cdot 10^{4}$.'),
        example: same('$\\begin{aligned}32\\cdot 10^{4}+4{,}5\\cdot 10^{4}&=36{,}5\\cdot 10^{4}\\\\&=3{,}65\\cdot 10^{5}\\end{aligned}$'),
        exampleAnswer: say('Batzeko, berretzaile bera jarri behar da lehenik: $3{,}65\\cdot 10^{5}$.', 'Para sumar, primero el mismo exponente: $3{,}65\\cdot 10^{5}$.', 'للجمع نوحّد الأس أولًا: $3{,}65\\cdot 10^{5}$.', 'To add, first the same exponent: $3{,}65\\cdot 10^{5}$.')
    },

    /* ---------- 2. Radicals ---------- */
    roots: {
        definitions: [
            {
                term: say('$n$ indizeko erroa', 'Raíz $n$-ésima', 'الجذر ذو الدليل $n$', 'The $n$th root'),
                meaning: say('$\\sqrt[n]{a}=b$ da $b^{n}=a$ bada. $n$ indizea da, eta $a$, errokizuna.', '$\\sqrt[n]{a}=b$ si $b^{n}=a$. $n$ es el índice y $a$, el radicando.', '$\\sqrt[n]{a}=b$ إذا كان $b^{n}=a$. $n$ هو الدليل و$a$ ما تحت الجذر.', '$\\sqrt[n]{a}=b$ if $b^{n}=a$. $n$ is the index and $a$ is the radicand.')
            }
        ],
        vocabulary: [
            say('indizea', 'índice', 'الدليل', 'index'),
            say('errokizuna', 'radicando', 'ما تحت الجذر', 'radicand'),
            say('bikoitia', 'par', 'زوجي', 'even')
        ],
        explanation: say(
            'Indizea bakoitia bada, erro bakarra dago, errokizunaren zeinu berarekin: $\\sqrt[3]{-8}=-2$. Bikoitia bada eta errokizuna positiboa, aurkako bi erro daude: $\\sqrt[4]{81}=\\pm 3$; normalean positiboa idazten da. Indize bikoitia eta errokizun negatiboa: ez dago erro errealik. Kalkulatzeko, idatzi errokizuna berretura gisa.',
            'Si el índice es impar, hay una sola raíz, con el signo del radicando: $\\sqrt[3]{-8}=-2$. Si es par y el radicando es positivo, hay dos raíces opuestas: $\\sqrt[4]{81}=\\pm 3$; normalmente se escribe la positiva. Índice par y radicando negativo: no hay raíz real. Para calcularla, escribe el radicando como potencia.',
            'إذا كان الدليل فرديًا فهناك جذر واحد له إشارة ما تحت الجذر: $\\sqrt[3]{-8}=-2$. وإذا كان زوجيًا وما تحت الجذر موجبًا فهناك جذران متعاكسان: $\\sqrt[4]{81}=\\pm 3$؛ وعادةً نكتب الموجب. دليل زوجي وما تحت الجذر سالب: لا يوجد جذر حقيقي. للحساب اكتب ما تحت الجذر على صورة قوة.',
            'If the index is odd, there is only one root, with the sign of the radicand: $\\sqrt[3]{-8}=-2$. If it is even and the radicand is positive, there are two opposite roots: $\\sqrt[4]{81}=\\pm 3$; usually the positive one is written. Even index and negative radicand: there is no real root. To work it out, write the radicand as a power.'
        ),
        examplePrompt: say('Kalkulatu $\\sqrt[3]{-125}$, $\\sqrt[4]{16}$ eta $\\sqrt[6]{-64}$.', 'Calcula $\\sqrt[3]{-125}$, $\\sqrt[4]{16}$ y $\\sqrt[6]{-64}$.', 'احسب $\\sqrt[3]{-125}$ و$\\sqrt[4]{16}$ و$\\sqrt[6]{-64}$.', 'Work out $\\sqrt[3]{-125}$, $\\sqrt[4]{16}$ and $\\sqrt[6]{-64}$.'),
        example: same('$\\begin{gathered}\\sqrt[3]{(-5)^{3}}=-5\\qquad\\sqrt[4]{2^{4}}=\\pm 2\\\\ \\sqrt[6]{-64}\\notin\\mathbb{R}\\end{gathered}$'),
        exampleAnswer: say('Azkena ez dago: seigarren berretura bat ere ez da negatiboa.', 'La última no existe: ninguna potencia sexta es negativa.', 'الأخير غير موجود: لا توجد قوة سادسة سالبة.', 'The last one does not exist: no sixth power is negative.')
    },
    fractional: {
        vocabulary: [
            say('izendatzailea', 'denominador', 'المقام', 'denominator'),
            say('zenbakitzailea', 'numerador', 'البسط', 'numerator'),
            say('indizea', 'índice', 'الدليل', 'index')
        ],
        explanation: say(
            'Erradikal bat berretura gisa idatz daiteke: $\\sqrt[n]{a^{m}}=a^{\\frac{m}{n}}$. Izendatzailea indizea da, eta zenbakitzailea, errokizunaren berretzailea: $\\sqrt{5}=5^{\\frac{1}{2}}$. Horrela, erradikalekin berreturen propietateak erabil daitezke. Kalkulatzeko, atera lehenik erroa: $8^{\\frac{2}{3}}=(\\sqrt[3]{8})^{2}=4$.',
            'Un radical se puede escribir como potencia: $\\sqrt[n]{a^{m}}=a^{\\frac{m}{n}}$. El denominador es el índice, y el numerador, el exponente del radicando: $\\sqrt{5}=5^{\\frac{1}{2}}$. Así, con los radicales se usan las propiedades de las potencias. Para calcular, saca primero la raíz: $8^{\\frac{2}{3}}=(\\sqrt[3]{8})^{2}=4$.',
            'يمكن كتابة الجذر على صورة قوة: $\\sqrt[n]{a^{m}}=a^{\\frac{m}{n}}$. المقام هو الدليل والبسط هو أس ما تحت الجذر: $\\sqrt{5}=5^{\\frac{1}{2}}$. وهكذا نستعمل خصائص القوى مع الجذور. للحساب استخرج الجذر أولًا: $8^{\\frac{2}{3}}=(\\sqrt[3]{8})^{2}=4$.',
            'A radical can be written as a power: $\\sqrt[n]{a^{m}}=a^{\\frac{m}{n}}$. The denominator is the index, and the numerator is the exponent of the radicand: $\\sqrt{5}=5^{\\frac{1}{2}}$. So the properties of powers work with radicals. To work one out, take the root first: $8^{\\frac{2}{3}}=(\\sqrt[3]{8})^{2}=4$.'
        ),
        examplePrompt: say('Kalkulatu $27^{\\frac{2}{3}}$ eta $16^{-\\frac{1}{4}}$.', 'Calcula $27^{\\frac{2}{3}}$ y $16^{-\\frac{1}{4}}$.', 'احسب $27^{\\frac{2}{3}}$ و$16^{-\\frac{1}{4}}$.', 'Work out $27^{\\frac{2}{3}}$ and $16^{-\\frac{1}{4}}$.'),
        example: same('$\\begin{gathered}27^{\\frac{2}{3}}=(\\sqrt[3]{27})^{2}=3^{2}=9\\\\ 16^{-\\frac{1}{4}}=\\frac{1}{\\sqrt[4]{16}}=\\frac{1}{2}\\end{gathered}$'),
        exampleAnswer: say('$9$ eta $\\frac{1}{2}$: lehenik erroa, gero berretura.', '$9$ y $\\frac{1}{2}$: primero la raíz, después la potencia.', '$9$ و$\\frac{1}{2}$: الجذر أولًا ثم القوة.', '$9$ and $\\frac{1}{2}$: first the root, then the power.'),
        why: {
            text: say(
                'Berreturaren berreturaren arauarekin, $\\left(a^{\\frac{1}{2}}\\right)^{2}=a^{\\frac{1}{2}\\cdot 2}=a^{1}=a$. Beraz, $a^{\\frac{1}{2}}$ ber bi eginda $a$ ematen duen zenbakia da: haren erro karratua. Era berean, $a^{\\frac{1}{n}}$ $n$ indizeko erroa da.',
                'Con la regla de la potencia de una potencia, $\\left(a^{\\frac{1}{2}}\\right)^{2}=a^{\\frac{1}{2}\\cdot 2}=a^{1}=a$. Así que $a^{\\frac{1}{2}}$ es el número que, al cuadrado, da $a$: su raíz cuadrada. Del mismo modo, $a^{\\frac{1}{n}}$ es la raíz de índice $n$.',
                'بقاعدة قوة القوة: $\\left(a^{\\frac{1}{2}}\\right)^{2}=a^{\\frac{1}{2}\\cdot 2}=a^{1}=a$. إذن $a^{\\frac{1}{2}}$ هو العدد الذي مربعه $a$: أي جذره التربيعي. وبالطريقة نفسها $a^{\\frac{1}{n}}$ هو الجذر ذو الدليل $n$.',
                'By the power of a power rule, $\\left(a^{\\frac{1}{2}}\\right)^{2}=a^{\\frac{1}{2}\\cdot 2}=a^{1}=a$. So $a^{\\frac{1}{2}}$ is the number whose square is $a$: its square root. In the same way, $a^{\\frac{1}{n}}$ is the root with index $n$.'
            ),
            math: same('$\\left(9^{\\frac{1}{2}}\\right)^{2}=9^{1}=9$')
        }
    },
    equivalent: {
        definitions: [
            {
                term: say('Erradikal baliokideak', 'Radicales equivalentes', 'جذور متكافئة', 'Equivalent radicals'),
                meaning: say('Berretzaile zatiki bera dutenak: $\\sqrt[6]{2^{4}}=2^{\\frac{4}{6}}=2^{\\frac{2}{3}}=\\sqrt[3]{2^{2}}$.', 'Los que tienen el mismo exponente fraccionario: $\\sqrt[6]{2^{4}}=2^{\\frac{4}{6}}=2^{\\frac{2}{3}}=\\sqrt[3]{2^{2}}$.', 'الجذور التي لها الأس الكسري نفسه: $\\sqrt[6]{2^{4}}=2^{\\frac{4}{6}}=2^{\\frac{2}{3}}=\\sqrt[3]{2^{2}}$.', 'Radicals with the same fractional exponent: $\\sqrt[6]{2^{4}}=2^{\\frac{4}{6}}=2^{\\frac{2}{3}}=\\sqrt[3]{2^{2}}$.')
            }
        ],
        vocabulary: [
            say('indize komuna', 'índice común', 'الدليل المشترك', 'common index'),
            say('errokizuna', 'radicando', 'ما تحت الجذر', 'radicand')
        ],
        explanation: say(
            'Indizea eta errokizunaren berretzailea zenbaki berberaz zatitzen badira, erradikala sinplifikatzen da; biderkatzen badira, baliokide bat lortzen da. Indize desberdineko erradikalak konparatzeko edo biderkatzeko, indize komunera eramaten dira, indizeen m.k.t.-ra: $\\sqrt{2}=\\sqrt[6]{8}$ eta $\\sqrt[3]{3}=\\sqrt[6]{9}$; beraz, $\\sqrt[3]{3}$ da handiagoa.',
            'Si se dividen el índice y el exponente del radicando por el mismo número, el radical se simplifica; si se multiplican, se obtiene uno equivalente. Para comparar o multiplicar radicales de distinto índice, se reducen a índice común, el m.c.m. de los índices: $\\sqrt{2}=\\sqrt[6]{8}$ y $\\sqrt[3]{3}=\\sqrt[6]{9}$, así que $\\sqrt[3]{3}$ es mayor.',
            'إذا قسمنا الدليل وأس ما تحت الجذر على العدد نفسه يُبسَّط الجذر، وإذا ضربناهما نحصل على جذر متكافئ. ولمقارنة جذور مختلفة الدليل أو ضربها نوحّدها إلى دليل مشترك هو م.م.أ. الأدلة: $\\sqrt{2}=\\sqrt[6]{8}$ و$\\sqrt[3]{3}=\\sqrt[6]{9}$، إذن $\\sqrt[3]{3}$ أكبر.',
            'If you divide the index and the exponent of the radicand by the same number, the radical simplifies; if you multiply them, you get an equivalent one. To compare or multiply radicals with different indices, bring them to a common index, the LCM of the indices: $\\sqrt{2}=\\sqrt[6]{8}$ and $\\sqrt[3]{3}=\\sqrt[6]{9}$, so $\\sqrt[3]{3}$ is greater.'
        ),
        examplePrompt: say('Sinplifikatu $\\sqrt[10]{3^{4}}$, eta ordenatu $\\sqrt{3}$ eta $\\sqrt[3]{5}$.', 'Simplifica $\\sqrt[10]{3^{4}}$ y ordena $\\sqrt{3}$ y $\\sqrt[3]{5}$.', 'بسّط $\\sqrt[10]{3^{4}}$ ورتّب $\\sqrt{3}$ و$\\sqrt[3]{5}$.', 'Simplify $\\sqrt[10]{3^{4}}$ and order $\\sqrt{3}$ and $\\sqrt[3]{5}$.'),
        example: same('$\\begin{gathered}\\sqrt[10]{3^{4}}=\\sqrt[5]{3^{2}}\\\\ \\sqrt{3}=\\sqrt[6]{27}>\\sqrt[6]{25}=\\sqrt[3]{5}\\end{gathered}$'),
        exampleAnswer: say('$\\sqrt[5]{9}$, eta $\\sqrt{3}>\\sqrt[3]{5}$, $27>25$ delako.', '$\\sqrt[5]{9}$, y $\\sqrt{3}>\\sqrt[3]{5}$ porque $27>25$.', '$\\sqrt[5]{9}$، و$\\sqrt{3}>\\sqrt[3]{5}$ لأن $27>25$.', '$\\sqrt[5]{9}$, and $\\sqrt{3}>\\sqrt[3]{5}$ because $27>25$.')
    },

    /* ---------- 3. Operations with radicals ---------- */
    extract: {
        vocabulary: [
            say('zatidura', 'cociente', 'خارج القسمة', 'quotient'),
            say('hondarra', 'resto', 'الباقي', 'remainder'),
            say('faktorizatu', 'factoriza', 'حلّل', 'factorise')
        ],
        explanation: say(
            'Faktore bat errotik ateratzeko, haren berretzaileak indizera iritsi behar du. Faktorizatu errokizuna eta zatitu berretzaile bakoitza indizeaz: zatidura kanpora ateratzen da, eta hondarra barruan geratzen da: $\\sqrt{72}=\\sqrt{2^{3}\\cdot 3^{2}}=2\\cdot 3\\sqrt{2}=6\\sqrt{2}$. Faktore bat sartzeko, indizera jasotzen da: $2\\sqrt[3]{5}=\\sqrt[3]{40}$.',
            'Para sacar un factor de una raíz, su exponente tiene que llegar al índice. Factoriza el radicando y divide cada exponente entre el índice: el cociente sale fuera y el resto se queda dentro: $\\sqrt{72}=\\sqrt{2^{3}\\cdot 3^{2}}=2\\cdot 3\\sqrt{2}=6\\sqrt{2}$. Para introducir un factor, se eleva al índice: $2\\sqrt[3]{5}=\\sqrt[3]{40}$.',
            'لإخراج عامل من الجذر يجب أن يبلغ أسه الدليل. حلّل ما تحت الجذر واقسم كل أس على الدليل: يخرج خارج القسمة ويبقى الباقي في الداخل: $\\sqrt{72}=\\sqrt{2^{3}\\cdot 3^{2}}=2\\cdot 3\\sqrt{2}=6\\sqrt{2}$. ولإدخال عامل نرفعه إلى الدليل: $2\\sqrt[3]{5}=\\sqrt[3]{40}$.',
            'To take a factor out of a root, its exponent has to reach the index. Factorise the radicand and divide each exponent by the index: the quotient comes out and the remainder stays inside: $\\sqrt{72}=\\sqrt{2^{3}\\cdot 3^{2}}=2\\cdot 3\\sqrt{2}=6\\sqrt{2}$. To bring a factor in, raise it to the index: $2\\sqrt[3]{5}=\\sqrt[3]{40}$.'
        ),
        examplePrompt: say('Atera faktoreak $\\sqrt[3]{250}$ errotik, eta sartu faktorea $3\\sqrt{2}$ erroan.', 'Saca factores de $\\sqrt[3]{250}$ e introduce el factor en $3\\sqrt{2}$.', 'أخرج العوامل من $\\sqrt[3]{250}$ وأدخل العامل في $3\\sqrt{2}$.', 'Take the factors out of $\\sqrt[3]{250}$ and bring the factor into $3\\sqrt{2}$.'),
        example: same('$\\begin{gathered}\\sqrt[3]{2\\cdot 5^{3}}=5\\sqrt[3]{2}\\\\ 3\\sqrt{2}=\\sqrt{3^{2}\\cdot 2}=\\sqrt{18}\\end{gathered}$'),
        exampleAnswer: say('$5\\sqrt[3]{2}$ eta $\\sqrt{18}$.', '$5\\sqrt[3]{2}$ y $\\sqrt{18}$.', '$5\\sqrt[3]{2}$ و$\\sqrt{18}$.', '$5\\sqrt[3]{2}$ and $\\sqrt{18}$.')
    },
    'add-radicals': {
        definitions: [
            {
                term: say('Erradikal antzekoak', 'Radicales semejantes', 'جذور متشابهة', 'Like radicals'),
                meaning: say('Indize eta errokizun bera dutenak, $3\\sqrt{2}$ eta $-5\\sqrt{2}$ bezala.', 'Los que tienen el mismo índice y el mismo radicando, como $3\\sqrt{2}$ y $-5\\sqrt{2}$.', 'الجذور التي لها الدليل نفسه وما تحت الجذر نفسه، مثل $3\\sqrt{2}$ و$-5\\sqrt{2}$.', 'Radicals with the same index and the same radicand, like $3\\sqrt{2}$ and $-5\\sqrt{2}$.')
            }
        ],
        vocabulary: [
            say('koefizientea', 'coeficiente', 'المعامل', 'coefficient'),
            say('errokizuna', 'radicando', 'ما تحت الجذر', 'radicand')
        ],
        explanation: say(
            'Erradikal antzekoak bakarrik batzen dira, haien koefizienteak batuz: $12\\sqrt{5}-9\\sqrt{5}=3\\sqrt{5}$. Askotan antzekoak dira faktoreak atera ondoren: $\\sqrt{18}+\\sqrt{50}-2\\sqrt{8}=3\\sqrt{2}+5\\sqrt{2}-4\\sqrt{2}=4\\sqrt{2}$. Kontuz: $\\sqrt{2}+\\sqrt{3}$ ezin da batu.',
            'Solo se suman los radicales semejantes, sumando sus coeficientes: $12\\sqrt{5}-9\\sqrt{5}=3\\sqrt{5}$. Muchas veces lo son después de sacar factores: $\\sqrt{18}+\\sqrt{50}-2\\sqrt{8}=3\\sqrt{2}+5\\sqrt{2}-4\\sqrt{2}=4\\sqrt{2}$. Cuidado: $\\sqrt{2}+\\sqrt{3}$ no se puede sumar.',
            'لا تُجمع إلا الجذور المتشابهة، بجمع معاملاتها: $12\\sqrt{5}-9\\sqrt{5}=3\\sqrt{5}$. وكثيرًا ما تصبح متشابهة بعد إخراج العوامل: $\\sqrt{18}+\\sqrt{50}-2\\sqrt{8}=3\\sqrt{2}+5\\sqrt{2}-4\\sqrt{2}=4\\sqrt{2}$. انتبه: لا يمكن جمع $\\sqrt{2}+\\sqrt{3}$.',
            'Only like radicals can be added, by adding their coefficients: $12\\sqrt{5}-9\\sqrt{5}=3\\sqrt{5}$. They often become alike after taking out factors: $\\sqrt{18}+\\sqrt{50}-2\\sqrt{8}=3\\sqrt{2}+5\\sqrt{2}-4\\sqrt{2}=4\\sqrt{2}$. Careful: $\\sqrt{2}+\\sqrt{3}$ cannot be added.'
        ),
        examplePrompt: say('Kalkulatu $\\sqrt{20}+3\\sqrt{45}-\\sqrt{80}$.', 'Calcula $\\sqrt{20}+3\\sqrt{45}-\\sqrt{80}$.', 'احسب $\\sqrt{20}+3\\sqrt{45}-\\sqrt{80}$.', 'Work out $\\sqrt{20}+3\\sqrt{45}-\\sqrt{80}$.'),
        example: same('$2\\sqrt{5}+9\\sqrt{5}-4\\sqrt{5}=7\\sqrt{5}$'),
        exampleAnswer: say('Faktoreak atera ondoren, hirurak antzekoak dira: $7\\sqrt{5}$.', 'Después de sacar factores, los tres son semejantes: $7\\sqrt{5}$.', 'بعد إخراج العوامل تصير الثلاثة متشابهة: $7\\sqrt{5}$.', 'After taking out factors, all three are alike: $7\\sqrt{5}$.')
    },
    'multiply-radicals': {
        vocabulary: [
            say('indize komuna', 'índice común', 'الدليل المشترك', 'common index'),
            say('errokizuna', 'radicando', 'ما تحت الجذر', 'radicand')
        ],
        explanation: say(
            'Indize bera dutenean, errokizunak biderkatzen edo zatitzen dira: $\\sqrt[n]{a}\\cdot\\sqrt[n]{b}=\\sqrt[n]{a\\cdot b}$. Indize desberdinak badituzte, lehenik indize komunera eramaten dira: $\\sqrt{2}\\cdot\\sqrt[3]{3}=\\sqrt[6]{8\\cdot 9}=\\sqrt[6]{72}$.',
            'Con el mismo índice, se multiplican o se dividen los radicandos: $\\sqrt[n]{a}\\cdot\\sqrt[n]{b}=\\sqrt[n]{a\\cdot b}$. Con índices distintos, primero se reducen a índice común: $\\sqrt{2}\\cdot\\sqrt[3]{3}=\\sqrt[6]{8\\cdot 9}=\\sqrt[6]{72}$.',
            'مع الدليل نفسه نضرب ما تحت الجذرين أو نقسمه: $\\sqrt[n]{a}\\cdot\\sqrt[n]{b}=\\sqrt[n]{a\\cdot b}$. ومع أدلة مختلفة نوحّدها أولًا إلى دليل مشترك: $\\sqrt{2}\\cdot\\sqrt[3]{3}=\\sqrt[6]{8\\cdot 9}=\\sqrt[6]{72}$.',
            'With the same index, multiply or divide the radicands: $\\sqrt[n]{a}\\cdot\\sqrt[n]{b}=\\sqrt[n]{a\\cdot b}$. With different indices, first bring them to a common index: $\\sqrt{2}\\cdot\\sqrt[3]{3}=\\sqrt[6]{8\\cdot 9}=\\sqrt[6]{72}$.'
        ),
        cases: [
            { title: say('Berretura', 'Potencia', 'القوة', 'Power'), text: say('Errokizuna berretzen da.', 'Se eleva el radicando.', 'نرفع ما تحت الجذر إلى القوة.', 'Raise the radicand to the power.'), math: same('$(\\sqrt[3]{5})^{2}=\\sqrt[3]{25}$') },
            { title: say('Erro baten erroa', 'Raíz de una raíz', 'جذر الجذر', 'Root of a root'), text: say('Indizeak biderkatzen dira.', 'Se multiplican los índices.', 'تُضرب الأدلة.', 'Multiply the indices.'), math: same('$\\sqrt[3]{\\sqrt{10}}=\\sqrt[6]{10}$') }
        ],
        examplePrompt: say('Kalkulatu $\\sqrt{6}\\cdot\\sqrt{15}$ eta $\\frac{\\sqrt[3]{40}}{\\sqrt[3]{5}}$.', 'Calcula $\\sqrt{6}\\cdot\\sqrt{15}$ y $\\frac{\\sqrt[3]{40}}{\\sqrt[3]{5}}$.', 'احسب $\\sqrt{6}\\cdot\\sqrt{15}$ و$\\frac{\\sqrt[3]{40}}{\\sqrt[3]{5}}$.', 'Work out $\\sqrt{6}\\cdot\\sqrt{15}$ and $\\frac{\\sqrt[3]{40}}{\\sqrt[3]{5}}$.'),
        example: same('$\\begin{gathered}\\sqrt{6\\cdot 15}=\\sqrt{90}=3\\sqrt{10}\\\\ \\sqrt[3]{\\frac{40}{5}}=\\sqrt[3]{8}=2\\end{gathered}$'),
        exampleAnswer: say('$3\\sqrt{10}$ eta $2$.', '$3\\sqrt{10}$ y $2$.', '$3\\sqrt{10}$ و$2$.', '$3\\sqrt{10}$ and $2$.')
    },

    /* ---------- 4. Rationalizing ---------- */
    'rationalize-square': {
        definitions: [
            {
                term: say('Arrazionalizatu', 'Racionalizar', 'إنطاق المقام', 'Rationalise'),
                meaning: say('Izendatzailean errorik ez duen zatiki baliokide bat idaztea.', 'Escribir una fracción equivalente sin raíces en el denominador.', 'كتابة كسر مكافئ لا جذور في مقامه.', 'To write an equivalent fraction with no roots in the denominator.')
            }
        ],
        vocabulary: [
            say('izendatzailea', 'denominador', 'المقام', 'denominator'),
            say('zenbakitzailea', 'numerador', 'البسط', 'numerator')
        ],
        explanation: say(
            'Izendatzailean $\\sqrt{b}$ badago, biderkatu zenbakitzailea eta izendatzailea $\\sqrt{b}$ erroaz: $\\frac{a}{\\sqrt{b}}=\\frac{a\\sqrt{b}}{b}$, $\\sqrt{b}\\cdot\\sqrt{b}=b$ delako. Zatikia ez da aldatzen: $\\frac{\\sqrt{b}}{\\sqrt{b}}=1$ zatikiaz biderkatzen da. Izendatzailea $c\\sqrt{b}$ bada, nahikoa da $\\sqrt{b}$ erroaz biderkatzea. Amaieran, sinplifikatu.',
            'Si en el denominador hay $\\sqrt{b}$, multiplica el numerador y el denominador por $\\sqrt{b}$: $\\frac{a}{\\sqrt{b}}=\\frac{a\\sqrt{b}}{b}$, porque $\\sqrt{b}\\cdot\\sqrt{b}=b$. La fracción no cambia: se multiplica por $\\frac{\\sqrt{b}}{\\sqrt{b}}=1$. Si el denominador es $c\\sqrt{b}$, basta multiplicar por $\\sqrt{b}$. Al final, simplifica.',
            'إذا كان في المقام $\\sqrt{b}$ فاضرب البسط والمقام في $\\sqrt{b}$: $\\frac{a}{\\sqrt{b}}=\\frac{a\\sqrt{b}}{b}$، لأن $\\sqrt{b}\\cdot\\sqrt{b}=b$. ولا يتغيّر الكسر: نضربه في $\\frac{\\sqrt{b}}{\\sqrt{b}}=1$. وإذا كان المقام $c\\sqrt{b}$ يكفي الضرب في $\\sqrt{b}$. وفي النهاية بسّط.',
            'If there is $\\sqrt{b}$ in the denominator, multiply the numerator and the denominator by $\\sqrt{b}$: $\\frac{a}{\\sqrt{b}}=\\frac{a\\sqrt{b}}{b}$, because $\\sqrt{b}\\cdot\\sqrt{b}=b$. The fraction does not change: you multiply by $\\frac{\\sqrt{b}}{\\sqrt{b}}=1$. If the denominator is $c\\sqrt{b}$, multiplying by $\\sqrt{b}$ is enough. At the end, simplify.'
        ),
        examplePrompt: say('Arrazionalizatu $\\frac{10}{3\\sqrt{5}}$.', 'Racionaliza $\\frac{10}{3\\sqrt{5}}$.', 'أنطق مقام $\\frac{10}{3\\sqrt{5}}$.', 'Rationalise $\\frac{10}{3\\sqrt{5}}$.'),
        example: same('$\\frac{10\\sqrt{5}}{3\\cdot 5}=\\frac{2\\sqrt{5}}{3}$'),
        exampleAnswer: say('Nahikoa da $\\sqrt{5}$ erroaz biderkatzea; 3 zenbakia ez da behar.', 'Basta multiplicar por $\\sqrt{5}$; el 3 no hace falta.', 'يكفي الضرب في $\\sqrt{5}$؛ لا حاجة إلى العدد 3.', 'Multiplying by $\\sqrt{5}$ is enough; the 3 is not needed.')
    },
    'rationalize-index': {
        vocabulary: [
            say('berretzailea', 'exponente', 'الأس', 'exponent'),
            say('indizea', 'índice', 'الدليل', 'index')
        ],
        explanation: say(
            'Izendatzailea $\\sqrt[n]{b^{m}}$ bada, $m<n$ izanik, biderkatu goian eta behean $\\sqrt[n]{b^{n-m}}$ erroaz: osatu berretzailea indizeraino, $\\sqrt[n]{b^{m}}\\cdot\\sqrt[n]{b^{n-m}}=\\sqrt[n]{b^{n}}=b$ delako. Adibidez, $\\frac{5}{\\sqrt[3]{2}}=\\frac{5\\sqrt[3]{2^{2}}}{2}=\\frac{5\\sqrt[3]{4}}{2}$. Errokizuna berretura ez bada, faktorizatu lehenik.',
            'Si el denominador es $\\sqrt[n]{b^{m}}$, con $m<n$, multiplica arriba y abajo por $\\sqrt[n]{b^{n-m}}$: completa el exponente hasta el índice, porque $\\sqrt[n]{b^{m}}\\cdot\\sqrt[n]{b^{n-m}}=\\sqrt[n]{b^{n}}=b$. Por ejemplo, $\\frac{5}{\\sqrt[3]{2}}=\\frac{5\\sqrt[3]{2^{2}}}{2}=\\frac{5\\sqrt[3]{4}}{2}$. Si el radicando no es una potencia, factorízalo antes.',
            'إذا كان المقام $\\sqrt[n]{b^{m}}$ حيث $m<n$ فاضرب البسط والمقام في $\\sqrt[n]{b^{n-m}}$: أكمل الأس حتى الدليل، لأن $\\sqrt[n]{b^{m}}\\cdot\\sqrt[n]{b^{n-m}}=\\sqrt[n]{b^{n}}=b$. مثلًا $\\frac{5}{\\sqrt[3]{2}}=\\frac{5\\sqrt[3]{2^{2}}}{2}=\\frac{5\\sqrt[3]{4}}{2}$. وإذا لم يكن ما تحت الجذر قوة فحلّله أولًا.',
            'If the denominator is $\\sqrt[n]{b^{m}}$, with $m<n$, multiply top and bottom by $\\sqrt[n]{b^{n-m}}$: complete the exponent up to the index, because $\\sqrt[n]{b^{m}}\\cdot\\sqrt[n]{b^{n-m}}=\\sqrt[n]{b^{n}}=b$. For example, $\\frac{5}{\\sqrt[3]{2}}=\\frac{5\\sqrt[3]{2^{2}}}{2}=\\frac{5\\sqrt[3]{4}}{2}$. If the radicand is not a power, factorise it first.'
        ),
        examplePrompt: say('Arrazionalizatu $\\frac{9}{\\sqrt[4]{3}}$.', 'Racionaliza $\\frac{9}{\\sqrt[4]{3}}$.', 'أنطق مقام $\\frac{9}{\\sqrt[4]{3}}$.', 'Rationalise $\\frac{9}{\\sqrt[4]{3}}$.'),
        example: same('$\\begin{aligned}\\frac{9\\sqrt[4]{3^{3}}}{\\sqrt[4]{3^{4}}}&=\\frac{9\\sqrt[4]{27}}{3}\\\\&=3\\sqrt[4]{27}\\end{aligned}$'),
        exampleAnswer: say('$3^{3}$ falta zen $3^{4}$ berreturara iristeko: $3\\sqrt[4]{27}$.', 'Faltaba $3^{3}$ para llegar a $3^{4}$: $3\\sqrt[4]{27}$.', 'كان ينقص $3^{3}$ للوصول إلى $3^{4}$: $3\\sqrt[4]{27}$.', '$3^{3}$ was missing to reach $3^{4}$: $3\\sqrt[4]{27}$.')
    },
    conjugate: {
        definitions: [
            {
                term: say('Konjokatua', 'Conjugado', 'المرافق', 'Conjugate'),
                meaning: say('Adierazpen bera, erdiko zeinua aldatuta: $\\sqrt{3}-\\sqrt{2}$ adierazpenarena $\\sqrt{3}+\\sqrt{2}$ da.', 'La misma expresión con el signo del medio cambiado: el de $\\sqrt{3}-\\sqrt{2}$ es $\\sqrt{3}+\\sqrt{2}$.', 'العبارة نفسها مع تغيير الإشارة في الوسط: مرافق $\\sqrt{3}-\\sqrt{2}$ هو $\\sqrt{3}+\\sqrt{2}$.', 'The same expression with the middle sign changed: the conjugate of $\\sqrt{3}-\\sqrt{2}$ is $\\sqrt{3}+\\sqrt{2}$.')
            }
        ],
        vocabulary: [
            say('karratuen kenketa', 'diferencia de cuadrados', 'فرق مربعين', 'difference of squares'),
            say('izendatzailea', 'denominador', 'المقام', 'denominator')
        ],
        explanation: say(
            'Izendatzailea erroak dituen batura edo kenketa bat bada, $a+\\sqrt{b}$ bezala, biderkatu goian eta behean haren konjokatuaz. Batura bider kenketa karratuen kenketa da, $(x+y)(x-y)=x^{2}-y^{2}$, eta erroak desagertzen dira: $(\\sqrt{3}-\\sqrt{2})(\\sqrt{3}+\\sqrt{2})=3-2=1$.',
            'Si el denominador es una suma o una resta con raíces, como $a+\\sqrt{b}$, multiplica arriba y abajo por su conjugado. Suma por diferencia es diferencia de cuadrados, $(x+y)(x-y)=x^{2}-y^{2}$, y las raíces desaparecen: $(\\sqrt{3}-\\sqrt{2})(\\sqrt{3}+\\sqrt{2})=3-2=1$.',
            'إذا كان المقام مجموعًا أو فرقًا فيه جذور مثل $a+\\sqrt{b}$ فاضرب البسط والمقام في مرافقه. حاصل ضرب المجموع في الفرق هو فرق مربعين، $(x+y)(x-y)=x^{2}-y^{2}$، فتختفي الجذور: $(\\sqrt{3}-\\sqrt{2})(\\sqrt{3}+\\sqrt{2})=3-2=1$.',
            'If the denominator is a sum or a difference with roots, like $a+\\sqrt{b}$, multiply top and bottom by its conjugate. A sum times a difference is a difference of squares, $(x+y)(x-y)=x^{2}-y^{2}$, and the roots disappear: $(\\sqrt{3}-\\sqrt{2})(\\sqrt{3}+\\sqrt{2})=3-2=1$.'
        ),
        examplePrompt: say('Arrazionalizatu $\\frac{6}{\\sqrt{7}+1}$.', 'Racionaliza $\\frac{6}{\\sqrt{7}+1}$.', 'أنطق مقام $\\frac{6}{\\sqrt{7}+1}$.', 'Rationalise $\\frac{6}{\\sqrt{7}+1}$.'),
        example: same('$\\frac{6(\\sqrt{7}-1)}{7-1}=\\sqrt{7}-1$'),
        exampleAnswer: say('Izendatzailea $7-1=6$ da, eta goiko 6 zenbakiarekin sinplifikatzen da.', 'El denominador queda $7-1=6$ y se simplifica con el 6 de arriba.', 'يصير المقام $7-1=6$ ويُختزل مع العدد 6 في البسط.', 'The denominator becomes $7-1=6$ and cancels with the 6 on top.')
    },

    /* ---------- 5. Logarithms ---------- */
    'log-definition': {
        definitions: [
            {
                term: say('Logaritmoa', 'Logaritmo', 'اللوغاريتم', 'Logarithm'),
                meaning: say('$\\log_a b=x$ da $a^{x}=b$ bada: $a$ oinarria zenbatera jaso behar den $b$ lortzeko.', '$\\log_a b=x$ si $a^{x}=b$: el exponente al que hay que elevar la base $a$ para obtener $b$.', '$\\log_a b=x$ إذا كان $a^{x}=b$: الأس الذي نرفع إليه الأساس $a$ لنحصل على $b$.', '$\\log_a b=x$ if $a^{x}=b$: the exponent you raise the base $a$ to in order to get $b$.')
            }
        ],
        vocabulary: [
            say('oinarria', 'base', 'الأساس', 'base'),
            say('berretzailea', 'exponente', 'الأس', 'exponent'),
            say('hamartarra', 'decimal', 'العشري', 'common')
        ],
        explanation: say(
            'Oinarria positiboa eta 1 ez dena da, eta $b$ positiboa izan behar da: ez dago 0 zenbakiaren ezta negatiboen logaritmorik. Adibidez, $\\log_2 32=5$, $2^{5}=32$ delako. Beti $\\log_a 1=0$ eta $\\log_a a=1$. Logaritmo hamartarrak, $\\log$, 10 oinarria du, eta nepertarrak, $\\ln$, $e\\approx 2{,}718$ oinarria.',
            'La base es positiva y distinta de 1, y $b$ tiene que ser positivo: no hay logaritmos de 0 ni de negativos. Por ejemplo, $\\log_2 32=5$ porque $2^{5}=32$. Siempre $\\log_a 1=0$ y $\\log_a a=1$. El logaritmo decimal, $\\log$, tiene base 10, y el neperiano, $\\ln$, base $e\\approx 2{,}718$.',
            'الأساس موجب ولا يساوي 1، ويجب أن يكون $b$ موجبًا: لا لوغاريتم للصفر ولا للأعداد السالبة. مثلًا $\\log_2 32=5$ لأن $2^{5}=32$. ودائمًا $\\log_a 1=0$ و$\\log_a a=1$. اللوغاريتم العشري $\\log$ أساسه 10، والطبيعي $\\ln$ أساسه $e\\approx 2{,}718$.',
            'The base is positive and not 1, and $b$ must be positive: there are no logarithms of 0 or of negative numbers. For example, $\\log_2 32=5$ because $2^{5}=32$. Always $\\log_a 1=0$ and $\\log_a a=1$. The common logarithm, $\\log$, has base 10, and the natural one, $\\ln$, has base $e\\approx 2{,}718$.'
        ),
        examplePrompt: say('Kalkulatu $\\log_3 81$ eta $\\log_2 0{,}125$, eta aurkitu $b$, $\\log_b 49=2$ bada.', 'Calcula $\\log_3 81$ y $\\log_2 0{,}125$, y halla $b$ si $\\log_b 49=2$.', 'احسب $\\log_3 81$ و$\\log_2 0{,}125$، وجد $b$ إذا كان $\\log_b 49=2$.', 'Work out $\\log_3 81$ and $\\log_2 0{,}125$, and find $b$ if $\\log_b 49=2$.'),
        example: same('$\\begin{gathered}3^{4}=81\\ \\to\\ \\log_3 81=4\\\\ 2^{-3}=0{,}125\\ \\to\\ \\log_2 0{,}125=-3\\\\ b^{2}=49\\ \\to\\ b=7\\end{gathered}$'),
        exampleAnswer: say('$4$, $-3$ eta $b=7$ (oinarria positiboa da).', '$4$, $-3$ y $b=7$ (la base es positiva).', '$4$ و$-3$ و$b=7$ (الأساس موجب).', '$4$, $-3$ and $b=7$ (the base is positive).')
    },
    'log-properties': {
        vocabulary: [
            say('biderkadura', 'producto', 'الضرب', 'product'),
            say('zatidura', 'cociente', 'القسمة', 'quotient'),
            say('batura', 'suma', 'الجمع', 'sum')
        ],
        explanation: say(
            'Logaritmoak berretzaileak direnez, berreturen propietateak betetzen dituzte: biderkadura batura bihurtzen da, zatidura kenketa eta berretura biderkadura. Adibidez, $\\log 2+\\log 50=\\log 100=2$. Kontuz: $\\log(x+y)$ ez da $\\log x+\\log y$.',
            'Como los logaritmos son exponentes, cumplen las propiedades de las potencias: el producto se convierte en suma, el cociente en resta y la potencia en producto. Por ejemplo, $\\log 2+\\log 50=\\log 100=2$. Cuidado: $\\log(x+y)$ no es $\\log x+\\log y$.',
            'لأن اللوغاريتمات أسس فهي تحقق خصائص القوى: يتحوّل الضرب إلى جمع، والقسمة إلى طرح، والقوة إلى ضرب. مثلًا $\\log 2+\\log 50=\\log 100=2$. انتبه: $\\log(x+y)$ لا يساوي $\\log x+\\log y$.',
            'Since logarithms are exponents, they follow the properties of powers: a product becomes a sum, a quotient a difference and a power a product. For example, $\\log 2+\\log 50=\\log 100=2$. Careful: $\\log(x+y)$ is not $\\log x+\\log y$.'
        ),
        cases: [
            { title: say('Biderkadura', 'Producto', 'الضرب', 'Product'), text: say('Logaritmoen batura.', 'La suma de los logaritmos.', 'مجموع اللوغاريتمين.', 'The sum of the logarithms.'), math: same('$\\log_a(x\\cdot y)=\\log_a x+\\log_a y$') },
            { title: say('Zatidura', 'Cociente', 'القسمة', 'Quotient'), text: say('Logaritmoen kenketa.', 'La resta de los logaritmos.', 'الفرق بين اللوغاريتمين.', 'The difference of the logarithms.'), math: same('$\\log_a\\frac{x}{y}=\\log_a x-\\log_a y$') },
            { title: say('Berretura', 'Potencia', 'القوة', 'Power'), text: say('Berretzailea bider logaritmoa.', 'El exponente por el logaritmo.', 'الأس مضروبًا في اللوغاريتم.', 'The exponent times the logarithm.'), math: same('$\\log_a x^{n}=n\\cdot\\log_a x$') }
        ],
        examplePrompt: say('Kalkulatu $\\log_6 4+\\log_6 9$ eta $\\log_2 40-\\log_2 5$.', 'Calcula $\\log_6 4+\\log_6 9$ y $\\log_2 40-\\log_2 5$.', 'احسب $\\log_6 4+\\log_6 9$ و$\\log_2 40-\\log_2 5$.', 'Work out $\\log_6 4+\\log_6 9$ and $\\log_2 40-\\log_2 5$.'),
        example: same('$\\begin{gathered}\\log_6(4\\cdot 9)=\\log_6 36=2\\\\ \\log_2\\frac{40}{5}=\\log_2 8=3\\end{gathered}$'),
        exampleAnswer: say('$2$ eta $3$.', '$2$ y $3$.', '$2$ و$3$.', '$2$ and $3$.'),
        why: {
            text: say(
                'Idatzi $x=a^{m}$ eta $y=a^{n}$, hau da, $\\log_a x=m$ eta $\\log_a y=n$. Orduan $x\\cdot y=a^{m+n}$, beraz $\\log_a(x\\cdot y)=m+n$: bi logaritmoen batura. Oinarri bereko berreturen araua da, logaritmoekin irakurrita.',
                'Escribe $x=a^{m}$ e $y=a^{n}$, es decir, $\\log_a x=m$ y $\\log_a y=n$. Entonces $x\\cdot y=a^{m+n}$, así que $\\log_a(x\\cdot y)=m+n$: la suma de los dos logaritmos. Es la regla de las potencias de igual base, leída con logaritmos.',
                'اكتب $x=a^{m}$ و$y=a^{n}$، أي $\\log_a x=m$ و$\\log_a y=n$. عندئذ $x\\cdot y=a^{m+n}$، إذن $\\log_a(x\\cdot y)=m+n$: مجموع اللوغاريتمين. إنها قاعدة القوى ذات الأساس نفسه مقروءة باللوغاريتمات.',
                'Write $x=a^{m}$ and $y=a^{n}$, that is, $\\log_a x=m$ and $\\log_a y=n$. Then $x\\cdot y=a^{m+n}$, so $\\log_a(x\\cdot y)=m+n$: the sum of the two logarithms. It is the rule for powers with the same base, read with logarithms.'
            ),
            math: same('$\\log_2(4\\cdot 8)=\\log_2 32=5=2+3$')
        }
    },
    'change-base': {
        vocabulary: [
            say('kalkulagailua', 'calculadora', 'الآلة الحاسبة', 'calculator'),
            say('oinarria', 'base', 'الأساس', 'base')
        ],
        explanation: say(
            'Kalkulagailuak bi logaritmo ditu: $\\log$ (10 oinarria) eta $\\ln$ ($e$ oinarria). Beste oinarri baterako, oinarri-aldaketa erabiltzen da: $\\log_a b=\\frac{\\log b}{\\log a}$. Adibidez, $\\log_5 20=\\frac{\\log 20}{\\log 5}\\approx 1{,}861$; zentzuzkoa da, $5<20<25$ denez 1 eta 2 artean baitago. $2^{x}=10$ bezalako ekuazioak ere ebazten ditu: $x=\\log_2 10$.',
            'La calculadora tiene dos logaritmos: $\\log$ (base 10) y $\\ln$ (base $e$). Para otra base se usa el cambio de base: $\\log_a b=\\frac{\\log b}{\\log a}$. Por ejemplo, $\\log_5 20=\\frac{\\log 20}{\\log 5}\\approx 1{,}861$; es razonable, porque $5<20<25$ y por eso está entre 1 y 2. También resuelve ecuaciones como $2^{x}=10$: $x=\\log_2 10$.',
            'في الآلة الحاسبة لوغاريتمان: $\\log$ (الأساس 10) و$\\ln$ (الأساس $e$). ولأساس آخر نستعمل تغيير الأساس: $\\log_a b=\\frac{\\log b}{\\log a}$. مثلًا $\\log_5 20=\\frac{\\log 20}{\\log 5}\\approx 1{,}861$؛ وهذا معقول لأن $5<20<25$ فهو بين 1 و2. ويحل أيضًا معادلات مثل $2^{x}=10$: $x=\\log_2 10$.',
            'The calculator has two logarithms: $\\log$ (base 10) and $\\ln$ (base $e$). For any other base, use the change of base: $\\log_a b=\\frac{\\log b}{\\log a}$. For example, $\\log_5 20=\\frac{\\log 20}{\\log 5}\\approx 1{,}861$; it makes sense, because $5<20<25$, so it lies between 1 and 2. It also solves equations such as $2^{x}=10$: $x=\\log_2 10$.'
        ),
        examplePrompt: say('Kalkulatu $\\log_4 100$ kalkulagailuarekin, eta egiaztatu emaitza.', 'Calcula $\\log_4 100$ con la calculadora y comprueba el resultado.', 'احسب $\\log_4 100$ بالآلة الحاسبة وتحقّق من النتيجة.', 'Work out $\\log_4 100$ on the calculator and check the result.'),
        example: same('$\\begin{gathered}\\log_4 100=\\frac{2}{\\log 4}\\approx 3{,}32\\\\ 4^{3}<100<4^{4}\\end{gathered}$'),
        exampleAnswer: say('3 eta 4 artean dago, $64<100<256$ delako.', 'Está entre 3 y 4, porque $64<100<256$.', 'يقع بين 3 و4 لأن $64<100<256$.', 'It lies between 3 and 4, because $64<100<256$.'),
        why: {
            text: say(
                '$x=\\log_a b$ bada, $a^{x}=b$ da. Hartu logaritmo hamartarrak bi aldeetan: $\\log a^{x}=\\log b$, hau da, $x\\cdot\\log a=\\log b$. Askatu $x$: $x=\\frac{\\log b}{\\log a}$. Horregatik kalkulatzen da edozein logaritmo bi logaritmo hamartarrekin.',
                'Si $x=\\log_a b$, entonces $a^{x}=b$. Toma logaritmos decimales en los dos lados: $\\log a^{x}=\\log b$, es decir, $x\\cdot\\log a=\\log b$. Despeja $x$: $x=\\frac{\\log b}{\\log a}$. Por eso cualquier logaritmo se calcula con dos logaritmos decimales.',
                'إذا كان $x=\\log_a b$ فإن $a^{x}=b$. خذ اللوغاريتم العشري للطرفين: $\\log a^{x}=\\log b$، أي $x\\cdot\\log a=\\log b$. اعزل $x$: $x=\\frac{\\log b}{\\log a}$. لذلك يُحسب أي لوغاريتم بلوغاريتمين عشريين.',
                'If $x=\\log_a b$, then $a^{x}=b$. Take common logarithms of both sides: $\\log a^{x}=\\log b$, that is, $x\\cdot\\log a=\\log b$. Solve for $x$: $x=\\frac{\\log b}{\\log a}$. That is why any logarithm can be worked out with two common logarithms.'
            )
        }
    }
}
