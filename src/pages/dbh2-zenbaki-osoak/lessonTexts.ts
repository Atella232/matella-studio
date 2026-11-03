import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { IntegerTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Zenbaki osoak · 2. DBH — what each lesson tells: the new words
   (definitions), a short explanation and the example as an exercise
   («Another example», or «Example» in the lessons of facts and rules).
   Plain data so the tests can import it; lessons.tsx merges it into the
   topics. Four lessons that only explained (negatives, absolute value,
   opposite, subtraction) get a «Let's solve» with its steps here. Signed
   numbers always go inside $…$, so they read well in Arabic too; the
   opposite is written −(+7) = −7 in every language (Basque says Aur, the
   others Op). The example uses numbers of its own, never those of «Let's
   solve», of «Check it» or of the typical mistake.
   Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const integerLessonTexts: Record<IntegerTopicId, LessonTexts> = {
    /* ---------- 1. Integers ---------- */
    negatives: {
        vocabulary: [
            say('zenbaki osoa', 'número entero', 'عدد صحيح', 'integer'),
            say('zeinua', 'signo', 'إشارة', 'sign'),
            say('zero azpiko', 'bajo cero', 'تحت الصفر', 'below zero'),
            say('itsas maila', 'nivel del mar', 'مستوى سطح البحر', 'sea level')
        ],
        definitions: [
            {
                term: say('Zenbaki negatiboa', 'Número negativo', 'العدد السالب', 'Negative number'),
                meaning: say('Zero baino txikiagoa den zenbakia; − zeinuarekin idazten da.', 'Un número menor que cero; se escribe con el signo −.', 'عدد أصغر من الصفر، ويُكتب بالإشارة −.', 'A number less than zero; it is written with the − sign.')
            }
        ],
        explanation: say(
            'Egoera batzuk ezin dira zenbaki arruntekin adierazi: zero azpiko tenperaturak, zorrak, sotoak edo sakonerak. Horietarako + zeinua erabiltzen da kopurua zerotik gora dagoenean, eta − zeinua zerotik behera dagoenean. Zor izan, jaitsi edo gastatu bezalako hitzek negatiboak iragartzen dituzte.',
            'Algunas situaciones no se pueden expresar con números naturales: temperaturas bajo cero, deudas, sótanos o profundidades. Para ellas se usa el signo + si la cantidad está por encima de cero y − si está por debajo. Palabras como deber, bajar o gastar anuncian negativos.',
            'بعض المواقف لا يُعبَّر عنها بالأعداد الطبيعية: درجات الحرارة تحت الصفر، والديون، والطوابق تحت الأرض، والأعماق. لذلك نستعمل الإشارة + إذا كانت الكمية فوق الصفر، والإشارة − إذا كانت تحته. وكلمات مثل يَدين وينزل ويُنفق تدل على أعداد سالبة.',
            'Some situations cannot be expressed with natural numbers: temperatures below zero, debts, basements or depths. For these we use the + sign when the amount is above zero and the − sign when it is below. Words such as owe, go down or spend signal negatives.'
        ),
        problem: say(
            'Idatzi zenbaki oso batekin: bigarren sotoan dagoen garaje bat, zero azpiko 5 graduko tenperatura bat eta 300 m-ko igoera bat.',
            'Escribe con un número entero: un garaje en el segundo sótano, una temperatura de 5 grados bajo cero y una subida de 300 m.',
            'اكتب بعدد صحيح: مرآب في الطابق الثاني تحت الأرض، ودرجة حرارة 5 تحت الصفر، وصعود 300 م.',
            'Write with an integer: a garage on the second basement level, a temperature of 5 degrees below zero and a climb of 300 m.'
        ),
        steps: [
            { text: say('Bilatu zentzua ematen duen hitza: sotoa eta zero azpitik behera daude.', 'Busca la palabra que da el sentido: sótano y bajo cero están por debajo.', 'ابحث عن الكلمة التي تعطي الاتجاه: تحت الأرض وتحت الصفر تعنيان الأسفل.', 'Look for the word that gives the direction: basement and below zero are underneath.') },
            { text: say('Zerotik behera: − zeinua.', 'Por debajo de cero: signo −.', 'تحت الصفر: الإشارة −.', 'Below zero: the − sign.'), math: same('$-2\\qquad -5$') },
            { text: say('Igotzea zerotik gora joatea da: + zeinua.', 'Subir es ir por encima: signo +.', 'الصعود فوق الصفر: الإشارة +.', 'Going up is going above: the + sign.'), math: same('$+300$') }
        ],
        examplePrompt: say(
            'Itsaspeko bat 120 m-ko sakoneran dago, eta hegazkin bat 3000 m-ko altueran. Idatzi zenbaki osoekin.',
            'Un submarino está a 120 m de profundidad y un avión vuela a 3000 m de altura. Escríbelo con números enteros.',
            'غوّاصة على عمق 120 م وطائرة على ارتفاع 3000 م. اكتب ذلك بأعداد صحيحة.',
            'A submarine is 120 m deep and a plane is flying 3,000 m high. Write it with integers.'
        ),
        example: same('$-120\\ \\mathrm{m}\\qquad +3000\\ \\mathrm{m}$'),
        exampleAnswer: say('Itsas mailaren azpian, negatiboa; gainean, positiboa.', 'Por debajo del nivel del mar, negativo; por encima, positivo.', 'تحت مستوى سطح البحر سالب، وفوقه موجب.', 'Below sea level, negative; above it, positive.')
    },
    'integer-set': {
        vocabulary: [
            say('zenbakizko zuzena', 'recta numérica', 'خط الأعداد', 'number line'),
            say('zeroa', 'cero', 'الصفر', 'zero'),
            say('positiboa', 'positivo', 'موجب', 'positive')
        ],
        definitions: [
            {
                term: say('Zenbaki osoak (ℤ)', 'Números enteros (ℤ)', 'الأعداد الصحيحة (ℤ)', 'Integers (ℤ)'),
                meaning: say('Positiboak, zeroa eta negatiboak: $\\mathbb{Z}=\\{\\dots,-2,-1,0,+1,+2,\\dots\\}$.', 'Los positivos, el cero y los negativos: $\\mathbb{Z}=\\{\\dots,-2,-1,0,+1,+2,\\dots\\}$.', 'الموجبة والصفر والسالبة: $\\mathbb{Z}=\\{\\dots,-2,-1,0,+1,+2,\\dots\\}$.', 'The positives, zero and the negatives: $\\mathbb{Z}=\\{\\dots,-2,-1,0,+1,+2,\\dots\\}$.')
            }
        ],
        explanation: say(
            'Zenbakizko zuzenean, zeroak zuzena bi zatitan banatzen du: positiboak eskuinean eta negatiboak ezkerrean, distantzia berera.',
            'En la recta numérica, el cero la divide en dos: los positivos a la derecha y los negativos a la izquierda, a la misma distancia.',
            'على خط الأعداد يقسم الصفر الخط إلى قسمين: الموجبة إلى اليمين والسالبة إلى اليسار، على المسافات نفسها.',
            'On the number line, zero splits it in two: the positives to the right and the negatives to the left, at the same distances.'
        ),
        examplePrompt: say('Zein zenbaki oso daude $-4$ eta $+3$ artean?', '¿Qué números enteros hay entre $-4$ y $+3$?', 'ما الأعداد الصحيحة بين $-4$ و$+3$؟', 'Which integers are there between $-4$ and $+3$?'),
        example: same('$-3,\\ -2,\\ -1,\\ 0,\\ +1,\\ +2$'),
        exampleAnswer: say('Sei: hiru negatibo, zeroa eta bi positibo.', 'Seis: tres negativos, el cero y dos positivos.', 'ستة: ثلاثة سالبة والصفر واثنان موجبان.', 'Six: three negatives, zero and two positives.')
    },
    absolute: {
        vocabulary: [
            say('distantzia', 'distancia', 'المسافة', 'distance'),
            say('unitatea', 'unidad', 'وحدة', 'unit')
        ],
        definitions: [
            {
                term: say('Balio absolutua', 'Valor absoluto', 'القيمة المطلقة', 'Absolute value'),
                meaning: say('Zenbakizko zuzenean zenbakitik zerora dagoen distantzia. Barren artean idazten da: $\\lvert -a\\rvert =a$.', 'La distancia del número al cero en la recta. Se escribe entre barras: $\\lvert -a\\rvert =a$.', 'المسافة بين العدد والصفر على الخط، وتُكتب بين خطين: $\\lvert -a\\rvert =a$.', 'The distance from the number to zero on the line. It is written between bars: $\\lvert -a\\rvert =a$.')
            }
        ],
        explanation: say(
            'Zenbakia bera da zeinurik gabe: $\\lvert +b\\rvert =b$ eta $\\lvert -a\\rvert =a$. Distantzia bat denez, ez da inoiz negatiboa, eta zeroarena zero da: $\\lvert 0\\rvert =0$.',
            'Es el propio número sin signo: $\\lvert +b\\rvert =b$ y $\\lvert -a\\rvert =a$. Como es una distancia, nunca es negativo, y el del cero es cero: $\\lvert 0\\rvert =0$.',
            'إنها العدد نفسه دون إشارة: $\\lvert +b\\rvert =b$ و$\\lvert -a\\rvert =a$. ولأنها مسافة فهي ليست سالبة أبدًا، وقيمة الصفر صفر: $\\lvert 0\\rvert =0$.',
            'It is the number itself without its sign: $\\lvert +b\\rvert =b$ and $\\lvert -a\\rvert =a$. Since it is a distance, it is never negative, and that of zero is zero: $\\lvert 0\\rvert =0$.'
        ),
        problem: say('Kalkulatu $\\lvert -9\\rvert$, $\\lvert +6\\rvert$ eta $\\lvert -9\\rvert -\\lvert +6\\rvert$.', 'Calcula $\\lvert -9\\rvert$, $\\lvert +6\\rvert$ y $\\lvert -9\\rvert -\\lvert +6\\rvert$.', 'احسب $\\lvert -9\\rvert$ و$\\lvert +6\\rvert$ و$\\lvert -9\\rvert -\\lvert +6\\rvert$.', 'Work out $\\lvert -9\\rvert$, $\\lvert +6\\rvert$ and $\\lvert -9\\rvert -\\lvert +6\\rvert$.'),
        steps: [
            { text: say('$-9$ zerotik 9 unitatera dago.', '$-9$ está a 9 unidades del cero.', 'يقع $-9$ على بعد 9 وحدات من الصفر.', '$-9$ is 9 units from zero.'), math: same('$\\lvert -9\\rvert =9$') },
            { text: say('$+6$ zerotik 6 unitatera dago.', '$+6$ está a 6 unidades del cero.', 'يقع $+6$ على بعد 6 وحدات من الصفر.', '$+6$ is 6 units from zero.'), math: same('$\\lvert +6\\rvert =6$') },
            { text: say('Egin eragiketa distantziekin.', 'Opera con las distancias.', 'أجرِ العملية على المسافتين.', 'Work with the distances.'), math: same('$9-6=3$') }
        ],
        examplePrompt: say('Zein zenbakik dute 4 balio absolutua?', '¿Qué números tienen valor absoluto 4?', 'ما الأعداد التي قيمتها المطلقة 4؟', 'Which numbers have absolute value 4?'),
        example: same('$\\lvert +4\\rvert =\\lvert -4\\rvert =4$'),
        exampleAnswer: say('Bik: $+4$ eta $-4$, zerotik 4 unitatera, alde banatan.', 'Dos: $+4$ y $-4$, a 4 unidades del cero, uno a cada lado.', 'عددان: $+4$ و$-4$، على بعد 4 وحدات من الصفر، كلٌّ في جهة.', 'Two: $+4$ and $-4$, 4 units from zero, one on each side.')
    },
    opposite: {
        vocabulary: [
            say('zeinua', 'signo', 'الإشارة', 'sign'),
            say('balio absolutua', 'valor absoluto', 'القيمة المطلقة', 'absolute value')
        ],
        definitions: [
            {
                term: say('Aurkakoak', 'Opuestos', 'المتعاكسان', 'Opposites'),
                meaning: say('Zerotik distantzia berera, baina alde banatan dauden bi zenbaki, $+5$ eta $-5$ bezala.', 'Dos números a la misma distancia del cero, pero a lados distintos, como $+5$ y $-5$.', 'عددان على المسافة نفسها من الصفر لكن في جهتين مختلفتين، مثل $+5$ و$-5$.', 'Two numbers the same distance from zero but on different sides, like $+5$ and $-5$.')
            }
        ],
        explanation: say(
            'Aurkakoa kalkulatzeko, zeinua aldatzen da: $-(+a)=-a$ eta $-(-a)=+a$. Aurkakoek balio absolutu bera dute, eta zenbaki bat gehi bere aurkakoa 0 da.',
            'Para calcular el opuesto se cambia el signo: $-(+a)=-a$ y $-(-a)=+a$. Los opuestos tienen el mismo valor absoluto, y un número más su opuesto da 0.',
            'لإيجاد المعاكس نغيّر الإشارة: $-(+a)=-a$ و$-(-a)=+a$. وللمتعاكسين القيمة المطلقة نفسها، والعدد زائد معاكسه يساوي 0.',
            'To find the opposite, change the sign: $-(+a)=-a$ and $-(-a)=+a$. Opposites have the same absolute value, and a number plus its opposite is 0.'
        ),
        problem: say('Idatzi $+7$ eta $-3$ zenbakien aurkakoak, eta egiaztatu zenbaki bakoitza gehi bere aurkakoa 0 dela.', 'Escribe el opuesto de $+7$ y de $-3$, y comprueba que cada número más su opuesto da 0.', 'اكتب معاكس $+7$ ومعاكس $-3$، وتحقّق أن كل عدد زائد معاكسه يساوي 0.', 'Write the opposites of $+7$ and $-3$, and check that each number plus its opposite is 0.'),
        steps: [
            { text: say('Aldatu zeinua.', 'Cambia el signo.', 'غيّر الإشارة.', 'Change the sign.'), math: same('$-(+7)=-7\\qquad -(-3)=+3$') },
            { text: say('Batu zenbaki bakoitza bere aurkakoarekin.', 'Suma cada número con su opuesto.', 'اجمع كل عدد مع معاكسه.', 'Add each number to its opposite.'), math: same('$(+7)+(-7)=0\\qquad (-3)+(+3)=0$') }
        ],
        examplePrompt: say('Zein da $-12$ zenbakiaren aurkakoaren aurkakoa?', '¿Cuál es el opuesto del opuesto de $-12$?', 'ما معاكس معاكس $-12$؟', 'What is the opposite of the opposite of $-12$?'),
        example: same('$\\begin{gathered}-(-12)=+12\\\\-(+12)=-12\\end{gathered}$'),
        exampleAnswer: say('Zenbaki bera da, $-12$: zeinua bi aldiz aldatzeak berdin uzten du.', 'Es el mismo número, $-12$: cambiar el signo dos veces lo deja igual.', 'إنه العدد نفسه $-12$: تغيير الإشارة مرتين يتركه كما هو.', 'It is the same number, $-12$: changing the sign twice leaves it as it was.')
    },
    compare: {
        vocabulary: [
            say('handiagoa', 'mayor que', 'أكبر من', 'greater than'),
            say('txikiagoa', 'menor que', 'أصغر من', 'less than')
        ],
        explanation: say(
            'Zenbakizko zuzenean eskuinen dagoena da handiena. Hortik ateratzen dira lau arau hauek:',
            'En la recta numérica, el que está más a la derecha es el mayor. De ahí salen estas cuatro reglas:',
            'على خط الأعداد يكون العدد الواقع أكثر إلى اليمين هو الأكبر. ومن ذلك تنتج هذه القواعد الأربع:',
            'On the number line, the one furthest to the right is the greater one. Four rules follow from this:'
        ),
        examplePrompt: say('Konparatu $-15$ eta $-9$, eta $-1$ eta $0$.', 'Compara $-15$ y $-9$, y $-1$ y $0$.', 'قارن $-15$ و$-9$، ثم $-1$ و$0$.', 'Compare $-15$ and $-9$, and $-1$ and $0$.'),
        example: same('$-15<-9\\qquad -1<0$'),
        exampleAnswer: say('Negatiboen artean, zerotik hurbilen dagoena da handiena; zeroa edozein negatibo baino handiagoa da.', 'Entre negativos, el más cercano al cero es el mayor; el cero es mayor que cualquier negativo.', 'بين السالبة يكون الأقرب إلى الصفر هو الأكبر، والصفر أكبر من أي سالب.', 'Between negatives, the one closer to zero is greater; zero is greater than any negative.')
    },
    order: {
        vocabulary: [
            say('ordenatu', 'ordenar', 'رتّب', 'order'),
            say('txikienetik handienera', 'de menor a mayor', 'من الأصغر إلى الأكبر', 'from smallest to largest')
        ],
        explanation: say(
            'Zenbaki oso batzuk ordenatzeko, bereizi positiboak, zeroa eta negatiboak, eta ordenatu talde bakoitza. Negatiboen artean, balio absolutu txikiena duena da handiena.',
            'Para ordenar varios enteros, sepáralos en positivos, cero y negativos, y ordena cada grupo. Entre negativos, el de menor valor absoluto es el mayor.',
            'لترتيب عدة أعداد صحيحة افصلها إلى موجبة وصفر وسالبة، ورتّب كل مجموعة. وبين السالبة يكون صاحب القيمة المطلقة الأصغر هو الأكبر.',
            'To order several integers, split them into positives, zero and negatives, and order each group. Between negatives, the one with the smaller absolute value is greater.'
        ),
        examplePrompt: say('Ordenatu txikienetik handienera: $-3$, $+7$, $-12$, $0$, $+2$.', 'Ordena de menor a mayor: $-3$, $+7$, $-12$, $0$, $+2$.', 'رتّب من الأصغر إلى الأكبر: $-3$، $+7$، $-12$، $0$، $+2$.', 'Order from smallest to largest: $-3$, $+7$, $-12$, $0$, $+2$.'),
        example: same('$-12<-3<0<+2<+7$'),
        exampleAnswer: say('Txikienetik handienera: lehenik negatiboak, zerotik urrunenetik hurbilenera.', 'De menor a mayor: primero los negativos, del más lejano al más cercano al cero.', 'من الأصغر إلى الأكبر: السالبة أولًا، من الأبعد عن الصفر إلى الأقرب.', 'From smallest to largest: the negatives first, from the furthest from zero to the closest.')
    },

    /* ---------- 2. Adding and subtracting ---------- */
    add: {
        vocabulary: [
            say('batuketa', 'suma', 'الجمع', 'adding'),
            say('zeinu bera', 'mismo signo', 'الإشارة نفسها', 'same sign'),
            say('zeinu desberdina', 'distinto signo', 'إشارتان مختلفتان', 'different signs')
        ],
        why: {
            text: say(
                'Negatibo bat batzea ezkerrera mugitzea da: $(+5)+(-3)$ 5 aurrera eta 3 atzera egitea da, eta zerotik 2 unitatera geratzen zara. Horregatik, zeinu desberdinekin, balio absolutuak kendu egiten dira, eta gehien «tiratzen» duenaren zeinua irabazten du.',
                'Sumar un negativo es moverse a la izquierda: $(+5)+(-3)$ es avanzar 5 y retroceder 3, y quedas a 2 del cero. Por eso, con signos distintos, se restan los valores absolutos y gana el signo del que «tira» más.',
                'جمع عدد سالب انتقال إلى اليسار: $(+5)+(-3)$ يعني التقدم 5 والرجوع 3، فتبقى على بعد 2 من الصفر. لذلك مع إشارتين مختلفتين نطرح القيمتين المطلقتين وتغلب إشارة العدد الذي «يشدّ» أكثر.',
                'Adding a negative means moving left: $(+5)+(-3)$ is going forward 5 and back 3, so you end up 2 from zero. That is why, with different signs, you subtract the absolute values and the sign of the one that «pulls» harder wins.'
            ),
            math: same('$(+5)+(-3)=+(5-3)=+2$')
        },
        explanation: say(
            'Zuzenean, positibo bat batzea eskuinera mugitzea da, eta negatibo bat batzea, ezkerrera. Zeinuen arabera, bi kasu daude:',
            'En la recta, sumar un positivo es moverse a la derecha, y sumar un negativo, a la izquierda. Según los signos hay dos casos:',
            'على الخط، جمع عدد موجب انتقال إلى اليمين، وجمع عدد سالب انتقال إلى اليسار. وحسب الإشارات هناك حالتان:',
            'On the line, adding a positive means moving right, and adding a negative, moving left. Depending on the signs there are two cases:'
        ),
        examplePrompt: say('Kalkulatu $(-13)+(-6)$ eta $(+15)+(-9)$.', 'Calcula $(-13)+(-6)$ y $(+15)+(-9)$.', 'احسب $(-13)+(-6)$ و$(+15)+(-9)$.', 'Work out $(-13)+(-6)$ and $(+15)+(-9)$.'),
        example: same('$\\begin{gathered}(-13)+(-6)=-(13+6)=-19\\\\(+15)+(-9)=+(15-9)=+6\\end{gathered}$'),
        exampleAnswer: say('Zeinu bera: batu eta zeinua mantendu. Zeinu desberdina: kendu, eta handienaren zeinua.', 'Mismo signo: se suman y queda el signo. Distinto signo: se restan y gana el signo del mayor.', 'الإشارة نفسها: نجمع وتبقى الإشارة. إشارتان مختلفتان: نطرح وتغلب إشارة الأكبر.', 'Same sign: add and keep the sign. Different signs: subtract and the bigger one\'s sign wins.')
    },
    subtract: {
        vocabulary: [
            say('kenketa', 'resta', 'الطرح', 'subtraction'),
            say('aurkakoa', 'opuesto', 'المعاكس', 'opposite')
        ],
        why: {
            text: say(
                'Kentzea batzearen kontrakoa da: $(+5)+(-3)=+2$ bada, $(+2)-(-3)$ kenketak $+5$ zenbakira itzuli behar du. Eta $+2$ zenbakitik $+5$ zenbakira iristeko, $+3$ batu behar da: negatibo bat kentzea haren aurkakoa batzea da.',
                'Restar es lo contrario de sumar: si $(+5)+(-3)=+2$, la resta $(+2)-(-3)$ tiene que volver a $+5$. Y para pasar de $+2$ a $+5$ hay que sumar $+3$: restar un negativo es sumar su opuesto.',
                'الطرح عكس الجمع: إذا كان $(+5)+(-3)=+2$ فإن الطرح $(+2)-(-3)$ يجب أن يعيدنا إلى $+5$. وللانتقال من $+2$ إلى $+5$ نجمع $+3$: فطرح العدد السالب هو جمع معاكسه.',
                'Subtracting undoes adding: if $(+5)+(-3)=+2$, then $(+2)-(-3)$ has to take you back to $+5$. And to get from $+2$ to $+5$ you add $+3$: subtracting a negative is adding its opposite.'
            ),
            math: same('$(+2)-(-3)=(+2)+(+3)=+5$')
        },
        explanation: say(
            'Bi zenbaki oso kentzeko, lehenengoari bigarrenaren aurkakoa batzen zaio: $a-b=a+(-b)$. Horrela kenketa guztiak batuketa bihurtzen dira. Kontuz: negatibo bat kentzea gora egitea da.',
            'Para restar dos enteros, al primero se le suma el opuesto del segundo: $a-b=a+(-b)$. Así toda resta se convierte en una suma. Cuidado: restar un negativo es subir.',
            'لطرح عددين صحيحين نجمع إلى الأول معاكس الثاني: $a-b=a+(-b)$. وهكذا يتحول كل طرح إلى جمع. انتبه: طرح عدد سالب يعني الصعود.',
            'To subtract two integers, add the opposite of the second to the first: $a-b=a+(-b)$. So every subtraction becomes an addition. Careful: subtracting a negative means going up.'
        ),
        problem: say('Kalkulatu $(-2)-(+6)$ eta $(+1)-(-5)$.', 'Calcula $(-2)-(+6)$ y $(+1)-(-5)$.', 'احسب $(-2)-(+6)$ و$(+1)-(-5)$.', 'Work out $(-2)-(+6)$ and $(+1)-(-5)$.'),
        steps: [
            { text: say('Aldatu kenketa aurkakoaren batuketagatik.', 'Cambia la resta por la suma del opuesto.', 'استبدل بالطرح جمعَ المعاكس.', 'Change the subtraction into adding the opposite.'), math: same('$(-2)+(-6)\\qquad (+1)+(+5)$') },
            { text: say('Batu, batuketaren arauekin.', 'Suma con las reglas de la suma.', 'اجمع بقواعد الجمع.', 'Add with the rules for adding.'), math: same('$-8\\qquad +6$') }
        ],
        examplePrompt: say(
            'Goizean $-4$ °C zeuden, eta arratsaldean $+7$ °C. Zenbat igo da tenperatura?',
            'Por la mañana había $-4$ °C y por la tarde, $+7$ °C. ¿Cuánto ha subido la temperatura?',
            'كانت الحرارة صباحًا $-4$ °C ومساءً $+7$ °C. بكم ارتفعت؟',
            'In the morning it was $-4$ °C and in the afternoon $+7$ °C. How much has the temperature gone up?'
        ),
        example: same('$\\begin{aligned}(+7)-(-4)&=(+7)+(+4)\\\\&=+11\\end{aligned}$'),
        exampleAnswer: say('11 gradu igo da: negatibo bat kentzea batzea da.', 'Ha subido 11 grados: restar un negativo es sumar.', 'ارتفعت 11 درجة: طرح السالب جمع.', 'It has gone up 11 degrees: subtracting a negative is adding.')
    },
    shorthand: {
        vocabulary: [
            say('parentesia', 'paréntesis', 'الأقواس', 'brackets'),
            say('modu laburtua', 'forma abreviada', 'الصيغة المختصرة', 'short form')
        ],
        explanation: say(
            'Batuketa eta kenketa kateak errazago kalkulatzeko, parentesiak kendu eta modu laburtuan idazten dira, hiru arau hauekin:',
            'Para calcular cadenas de sumas y restas con más facilidad, se quitan los paréntesis y se escriben en forma abreviada, con estas tres reglas:',
            'لحساب سلاسل الجمع والطرح بسهولة نحذف الأقواس ونكتبها بالصيغة المختصرة، بهذه القواعد الثلاث:',
            'To work out chains of additions and subtractions more easily, remove the brackets and write them in short form, with these three rules:'
        ),
        examplePrompt: say('Idatzi parentesirik gabe eta kalkulatu: $(+6)-(+9)+(-2)-(-8)$.', 'Escribe sin paréntesis y calcula: $(+6)-(+9)+(-2)-(-8)$.', 'اكتب دون أقواس واحسب: $(+6)-(+9)+(-2)-(-8)$.', 'Write without brackets and work out: $(+6)-(+9)+(-2)-(-8)$.'),
        example: same('$\\begin{aligned}&(+6)-(+9)+(-2)-(-8)\\\\&=6-9-2+8\\\\&=14-11=3\\end{aligned}$'),
        exampleAnswer: say('Positiboak: $6+8=14$. Negatiboak: $9+2=11$.', 'Positivos: $6+8=14$. Negativos: $9+2=11$.', 'الموجبة: $6+8=14$. السالبة: $9+2=11$.', 'Positives: $6+8=14$. Negatives: $9+2=11$.')
    },
    brackets: {
        vocabulary: [
            say('parentesia', 'paréntesis', 'الأقواس', 'brackets'),
            say('bidea', 'camino', 'طريق', 'ways')
        ],
        explanation: say(
            'Adierazpenak parentesiak baditu, bi bide daude: lehenik barrukoa egitea, edo parentesiak hasieratik kentzea. Biek emaitza bera ematen dute.',
            'Si la expresión tiene paréntesis, hay dos caminos: hacer primero lo de dentro o quitar los paréntesis desde el principio. Los dos dan el mismo resultado.',
            'إذا احتوى التعبير على أقواس فهناك طريقان: حساب ما بداخلها أولًا، أو حذف الأقواس من البداية. ويعطيان النتيجة نفسها.',
            'If the expression has brackets, there are two ways: work out the inside first, or remove the brackets from the start. Both give the same result.'
        ),
        examplePrompt: say('Kalkulatu $9-(5-8)+(-3+1)$ bi bideetatik.', 'Calcula $9-(5-8)+(-3+1)$ por los dos caminos.', 'احسب $9-(5-8)+(-3+1)$ بالطريقين.', 'Work out $9-(5-8)+(-3+1)$ both ways.'),
        example: same('$\\begin{aligned}9-(-3)+(-2)&=9+3-2\\\\&=10\\\\9-5+8-3+1&=10\\end{aligned}$'),
        exampleAnswer: say('Bi bideek 10 ematen dute.', 'Los dos caminos dan 10.', 'يعطي الطريقان 10.', 'Both ways give 10.')
    },

    /* ---------- 3. Multiplying and dividing ---------- */
    'multiply-divide': {
        vocabulary: [
            say('biderketa', 'multiplicación', 'الضرب', 'multiplication'),
            say('zatiketa', 'división', 'القسمة', 'division'),
            say('zeinuen araua', 'regla de los signos', 'قاعدة الإشارات', 'rule of signs')
        ],
        why: {
            text: say(
                'Begiratu $-2$ zenbakiaren taulari: lehen biderkagaia 1 jaisten den bakoitzean, emaitza 2 igotzen da. Eredua jarraituz, $(-1)\\cdot(-2)$ biderketak $+2$ eman behar du. Zatiketak arau bera du, biderketa desegiten duelako.',
                'Mira la tabla del $-2$: cada vez que el primer factor baja 1, el resultado sube 2. Siguiendo el patrón, $(-1)\\cdot(-2)$ tiene que dar $+2$. La división sigue la misma regla, porque deshace la multiplicación.',
                'انظر إلى جدول $-2$: كلما نقص العامل الأول 1 زاد الناتج 2. وباتباع النمط يجب أن يعطي $(-1)\\cdot(-2)$ العدد $+2$. والقسمة تتبع القاعدة نفسها لأنها تعكس الضرب.',
                'Look at the $-2$ times table: each time the first factor goes down by 1, the result goes up by 2. Following the pattern, $(-1)\\cdot(-2)$ has to be $+2$. Division follows the same rule, because it undoes multiplication.'
            ),
            math: same('$\\begin{aligned}2\\cdot(-2)&=-4\\\\1\\cdot(-2)&=-2\\\\0\\cdot(-2)&=0\\\\(-1)\\cdot(-2)&=+2\\end{aligned}$')
        },
        explanation: say(
            'Zenbaki osoak biderkatzeko eta zatitzeko arau bera erabiltzen da, bi urratsetan:',
            'Para multiplicar y dividir enteros se usa la misma regla, en dos pasos:',
            'في ضرب الأعداد الصحيحة وقسمتها نستعمل القاعدة نفسها، في خطوتين:',
            'To multiply and divide integers, the same rule is used, in two steps:'
        ),
        examplePrompt: say(
            'Kalkulatu $(-6)\\cdot(-7)$, $(+48)\\mathbin{:}(-8)$ eta $(-2)\\cdot(-5)\\cdot(-3)$.',
            'Calcula $(-6)\\cdot(-7)$, $(+48)\\mathbin{:}(-8)$ y $(-2)\\cdot(-5)\\cdot(-3)$.',
            'احسب $(-6)\\cdot(-7)$ و$(+48)\\mathbin{:}(-8)$ و$(-2)\\cdot(-5)\\cdot(-3)$.',
            'Work out $(-6)\\cdot(-7)$, $(+48)\\mathbin{:}(-8)$ and $(-2)\\cdot(-5)\\cdot(-3)$.'
        ),
        example: same('$\\begin{gathered}(-6)\\cdot(-7)=+42\\\\(+48)\\mathbin{:}(-8)=-6\\\\(-2)\\cdot(-5)\\cdot(-3)=-30\\end{gathered}$'),
        exampleAnswer: say('Azkenean hiru negatibo daude, kopuru bakoitia: emaitza negatiboa da.', 'En el último hay tres negativos, un número impar: el resultado es negativo.', 'في الأخير ثلاثة أعداد سالبة، وهو عدد فردي: النتيجة سالبة.', 'The last one has three negatives, an odd number: the result is negative.')
    },
    combined: {
        vocabulary: [
            say('eragiketa konbinatuak', 'operaciones combinadas', 'العمليات المركبة', 'combined operations'),
            say('kako zuzenak', 'corchetes', 'الأقواس المعقوفة', 'square brackets')
        ],
        explanation: say(
            'Eragiketa konbinatuetan ordena hau errespetatu behar da, eta urrats bakoitzean zeinuak zaindu.',
            'En las operaciones combinadas hay que respetar este orden, y en cada paso cuidar los signos.',
            'في العمليات المركبة يجب احترام هذا الترتيب، مع الانتباه للإشارات في كل خطوة.',
            'In combined operations you have to follow this order, and take care with the signs at each step.'
        ),
        examplePrompt: say('Kalkulatu $(-3)\\cdot(+4)-(-10)\\mathbin{:}(+2)$.', 'Calcula $(-3)\\cdot(+4)-(-10)\\mathbin{:}(+2)$.', 'احسب $(-3)\\cdot(+4)-(-10)\\mathbin{:}(+2)$.', 'Work out $(-3)\\cdot(+4)-(-10)\\mathbin{:}(+2)$.'),
        example: same('$\\begin{aligned}&(-3)\\cdot(+4)-(-10)\\mathbin{:}(+2)\\\\&=-12-(-5)\\\\&=-7\\end{aligned}$'),
        exampleAnswer: say('Lehenik biderketa eta zatiketa; gero kenketa: $-12+5=-7$.', 'Primero el producto y el cociente; después la resta: $-12+5=-7$.', 'الضرب والقسمة أولًا ثم الطرح: $-12+5=-7$.', 'First the product and the quotient; then the subtraction: $-12+5=-7$.')
    }
}
