import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { IntegerIntroTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Zenbaki osoak · 1. DBH — what each lesson tells: the new words
   (definitions), the key words in four languages (vocabulary), a short
   explanation, the example as an exercise («Another example», or «Example»
   in the lessons of facts) and, in three lessons, «Why does it work?».
   Plain data so the tests can import it; lessons.tsx merges it into the
   topics. Signed numbers always go inside $…$, so they read well in Arabic
   too; the opposite is Aur in Basque and Arabic and Op in Spanish and
   English, as in the steps. The explanation keeps the numbers that its
   drawing shows (the lift, −4 and +5 on the line, −6 < −2, the counters,
   the brackets). The example uses numbers of its own, never those of «Let's
   solve», of «Check it» or of the typical mistake.
   Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const integerIntroLessonTexts: Record<IntegerIntroTopicId, LessonTexts> = {
    /* ---------- 1. Meaning ---------- */
    negatives: {
        vocabulary: [
            say('zeinua', 'signo', 'الإشارة', 'sign'),
            say('zero azpitik', 'bajo cero', 'تحت الصفر', 'below zero'),
            say('sotoa', 'sótano', 'الطابق تحت الأرض', 'basement')
        ],
        definitions: [
            {
                term: say('Zenbaki negatiboa', 'Número negativo', 'العدد السالب', 'Negative number'),
                meaning: say('Zero baino txikiagoa den zenbakia; − zeinuarekin idazten da.', 'Un número menor que cero; se escribe con el signo −.', 'عدد أصغر من الصفر، ويُكتب بالإشارة −.', 'A number less than zero; it is written with the − sign.')
            }
        ],
        explanation: say(
            'Egunero entzuten ditugu honelako esaldiak: «autoa bigarren sotoan dago», «zero azpitik lau gradu daude» edo «160 euro zor ditut». Zero baino kantitate txikiagoak dira: − zeinuarekin idazten dira. Zero baino handiagoak positiboak dira, + zeinuarekin.',
            'Cada día oímos frases como «el coche está en el segundo sótano», «hace cuatro grados bajo cero» o «debo 160 euros». Son cantidades menores que cero: se escriben con el signo −. Las mayores que cero son positivas, con el signo +.',
            'نسمع كل يوم جملًا مثل «السيارة في الطابق الثاني تحت الأرض» و«الحرارة أربع درجات تحت الصفر» و«عليّ دَين 160 يورو». هذه كميات أصغر من الصفر وتُكتب بالإشارة −. أما الأكبر من الصفر فموجبة وتُكتب بالإشارة +.',
            'Every day we hear sentences like «the car is in the second basement», «it is four degrees below zero» or «I owe 160 euros». These amounts are less than zero: they are written with the − sign. Those greater than zero are positive, with the + sign.'
        ),
        examplePrompt: say(
            'Idatzi zenbaki oso batekin: 45 metroko sakoneran dagoen leize bat, 12 euroko irabazia eta zero azpitik 7 graduko tenperatura.',
            'Escribe con un número entero: una cueva a 45 m de profundidad, una ganancia de 12 € y una temperatura de 7 grados bajo cero.',
            'اكتب بعدد صحيح: كهف على عمق 45 م، وربح 12 يورو، ودرجة حرارة 7 تحت الصفر.',
            'Write with an integer: a cave 45 m deep, a profit of €12 and a temperature of 7 degrees below zero.'
        ),
        example: same('$-45\\ \\mathrm{m}\\qquad +12\\ \\text{€}\\qquad -7\\,^{\\circ}\\mathrm{C}$'),
        exampleAnswer: say('Sakonera eta zero azpitik: negatiboak. Irabaztea: positiboa.', 'Profundidad y bajo cero: negativos. Ganar: positivo.', 'العمق وتحت الصفر: سالبان. الربح: موجب.', 'Depth and below zero: negative. Winning money: positive.')
    },
    'integer-set': {
        vocabulary: [
            say('igogailua', 'ascensor', 'المصعد', 'lift'),
            say('solairua', 'planta', 'الطابق', 'floor'),
            say('zeroa', 'cero', 'الصفر', 'zero')
        ],
        definitions: [
            {
                term: say('Zenbaki osoak (ℤ)', 'Números enteros (ℤ)', 'الأعداد الصحيحة (ℤ)', 'Integers (ℤ)'),
                meaning: say('Positiboak, zeroa eta negatiboak: $\\mathbb{Z}=\\{\\dots,-2,-1,0,+1,+2,\\dots\\}$.', 'Los positivos, el cero y los negativos: $\\mathbb{Z}=\\{\\dots,-2,-1,0,+1,+2,\\dots\\}$.', 'الموجبة والصفر والسالبة: $\\mathbb{Z}=\\{\\dots,-2,-1,0,+1,+2,\\dots\\}$.', 'The positives, zero and the negatives: $\\mathbb{Z}=\\{\\dots,-2,-1,0,+1,+2,\\dots\\}$.')
            }
        ],
        explanation: say(
            'Positiboak + zeinua duten zenbaki naturalak dira; zeinurik gabe ere idazten dira: $+5=5$. Zeroa ez da ez positiboa ez negatiboa. Marrazkiko igogailuan, solairuak positiboak dira, beheko solairua 0 da eta sotoak negatiboak.',
            'Los positivos son los naturales con el signo +; también se escriben sin él: $+5=5$. El cero no es ni positivo ni negativo. En el ascensor del dibujo, las plantas son positivas, la planta baja es el 0 y los sótanos son negativos.',
            'الأعداد الموجبة هي الأعداد الطبيعية بالإشارة +، وتُكتب أيضًا دونها: $+5=5$. والصفر ليس موجبًا ولا سالبًا. وفي مصعد الرسم الطوابق العليا موجبة، والطابق الأرضي هو 0، والطوابق تحت الأرض سالبة.',
            'The positives are the natural numbers with the + sign; they can also be written without it: $+5=5$. Zero is neither positive nor negative. In the lift in the drawing, the floors are positive, the ground floor is 0 and the basements are negative.'
        ),
        examplePrompt: say('Zein zenbaki oso daude $-3$ eta $+4$ artean?', '¿Qué números enteros hay entre $-3$ y $+4$?', 'ما الأعداد الصحيحة بين $-3$ و$+4$؟', 'Which integers are there between $-3$ and $+4$?'),
        example: same('$-2,\\ -1,\\ 0,\\ +1,\\ +2,\\ +3$'),
        exampleAnswer: say('Sei: bi negatibo, zeroa eta hiru positibo.', 'Seis: dos negativos, el cero y tres positivos.', 'ستة: عددان سالبان والصفر وثلاثة موجبة.', 'Six: two negatives, zero and three positives.')
    },

    /* ---------- 2. The number line ---------- */
    'number-line': {
        vocabulary: [
            say('unitateak', 'unidades', 'الوحدات', 'units'),
            say('ezkerra', 'izquierda', 'اليسار', 'left'),
            say('eskuina', 'derecha', 'اليمين', 'right')
        ],
        definitions: [
            {
                term: say('Jatorria', 'Origen', 'الأصل', 'Origin'),
                meaning: say('Zuzeneko 0 puntua: positiboak eta negatiboak bereizten ditu.', 'El punto del 0 en la recta: separa los positivos de los negativos.', 'نقطة الصفر على المستقيم: تفصل الموجبة عن السالبة.', 'The point 0 on the line: it separates the positives from the negatives.')
            }
        ],
        explanation: say(
            'Zenbaki naturalen zuzena ezkerrera luzatzen da. Zeroa jatorria da; positiboak eskuinean daude eta negatiboak ezkerrean, distantzia berera. Marrazkian, $-4$ zenbakia 0 zenbakitik 4 unitatera dago ezkerrean, eta $+5$, 5 unitatera eskuinean.',
            'La recta de los naturales se alarga hacia la izquierda. El cero es el origen; los positivos van a la derecha y los negativos a la izquierda, a la misma distancia. En el dibujo, $-4$ está 4 unidades a la izquierda del 0 y $+5$, 5 a la derecha.',
            'يمتد مستقيم الأعداد الطبيعية نحو اليسار. الصفر هو الأصل؛ الموجبة إلى اليمين والسالبة إلى اليسار، على المسافات نفسها. في الرسم يقع $-4$ على بعد 4 وحدات يسار الصفر، و$+5$ على بعد 5 وحدات يمينه.',
            'The line of the natural numbers is extended to the left. Zero is the origin; the positives go to the right and the negatives to the left, at the same distances. In the drawing, $-4$ is 4 units to the left of 0 and $+5$ is 5 to the right.'
        ),
        examplePrompt: say('Zenbaki bat 0 zenbakitik 3 unitatera dago ezkerrean, eta beste bat 6 unitatera eskuinean. Zein dira? Zein da handiagoa?', 'Un número está 3 unidades a la izquierda del 0 y otro, 6 a la derecha. ¿Cuáles son? ¿Cuál es mayor?', 'عدد على بعد 3 وحدات يسار الصفر وآخر على بعد 6 وحدات يمينه. ما هما؟ وأيهما أكبر؟', 'One number is 3 units to the left of 0 and another is 6 to the right. Which are they? Which is bigger?'),
        example: same('$-3<+6$'),
        exampleAnswer: say('$-3$ eta $+6$: eskuinekoa, $+6$, da handiagoa.', '$-3$ y $+6$: el de la derecha, $+6$, es el mayor.', '$-3$ و$+6$: الذي على اليمين، $+6$، هو الأكبر.', '$-3$ and $+6$: the one on the right, $+6$, is bigger.')
    },
    compare: {
        vocabulary: [
            say('termometroa', 'termómetro', 'ميزان الحرارة', 'thermometer'),
            say('handiagoa', 'mayor', 'أكبر', 'bigger'),
            say('positiboa', 'positivo', 'موجب', 'positive')
        ],
        explanation: say(
            'Zuzenean, eskuinerago dagoena da handiagoa. Horregatik edozein positibo da edozein negatibo baino handiagoa, eta zeroa negatibo guztiak baino handiagoa da. Termometroan ere bai: $-2$ °C ez da $-6$ °C bezain hotza; beraz, $-6<-2$.',
            'En la recta, es mayor el que está más a la derecha. Por eso cualquier positivo es mayor que cualquier negativo, y el cero es mayor que todos los negativos. En el termómetro también: $-2$ °C no es tan frío como $-6$ °C, así que $-6<-2$.',
            'على المستقيم يكون الأكبر هو الذي يقع أكثر إلى اليمين. لذلك كل عدد موجب أكبر من أي عدد سالب، والصفر أكبر من كل الأعداد السالبة. وفي ميزان الحرارة أيضًا: $-2$ °C ليست باردة مثل $-6$ °C، إذن $-6<-2$.',
            'On the line, the one further to the right is bigger. That is why any positive is bigger than any negative, and zero is bigger than all the negatives. On a thermometer too: $-2$ °C is not as cold as $-6$ °C, so $-6<-2$.'
        ),
        examplePrompt: say('Konparatu: $-9$ eta $-4$; $0$ eta $-11$; $+12$ eta $-15$.', 'Compara: $-9$ y $-4$; $0$ y $-11$; $+12$ y $-15$.', 'قارن: $-9$ و$-4$؛ $0$ و$-11$؛ $+12$ و$-15$.', 'Compare: $-9$ and $-4$; $0$ and $-11$; $+12$ and $-15$.'),
        example: same('$\\begin{gathered}-9<-4\\qquad 0>-11\\\\+12>-15\\end{gathered}$'),
        exampleAnswer: say('Zuzenean eskuinerago dagoena da handiagoa: negatiboetan, 0 zenbakitik hurbilena.', 'El de la derecha en la recta es el mayor: entre negativos, el más cercano al 0.', 'الأكبر هو الذي على اليمين في المستقيم: وبين السالبة هو الأقرب إلى الصفر.', 'The one on the right of the line is bigger: between negatives, the one closest to 0.')
    },
    order: {
        vocabulary: [
            say('txikienetik handienera', 'de menor a mayor', 'من الأصغر إلى الأكبر', 'from smallest to largest'),
            say('taldeak', 'grupos', 'مجموعات', 'groups')
        ],
        explanation: say(
            'Zenbaki osoak ordenatzeko, pentsatu zuzenean non geratuko liratekeen: ezkerretik eskuinera irakurrita, txikienetik handienera doaz. Laguntzen du hiru taldetan banatzeak: negatiboak, zeroa eta positiboak.',
            'Para ordenar enteros, piensa cómo quedarían en la recta: leídos de izquierda a derecha, van de menor a mayor. Ayuda separarlos en tres grupos: negativos, cero y positivos.',
            'لترتيب الأعداد الصحيحة فكّر في مواقعها على المستقيم: إذا قرأتها من اليسار إلى اليمين تكون من الأصغر إلى الأكبر. ويفيد تقسيمها إلى ثلاث مجموعات: السالبة والصفر والموجبة.',
            'To order integers, think where they would be on the line: read from left to right, they go from smallest to largest. It helps to split them into three groups: negatives, zero and positives.'
        ),
        examplePrompt: say('Ordenatu handienetik txikienera: $-14$, $+5$, $-1$, $+20$, $-7$.', 'Ordena de mayor a menor: $-14$, $+5$, $-1$, $+20$, $-7$.', 'رتّب من الأكبر إلى الأصغر: $-14$، $+5$، $-1$، $+20$، $-7$.', 'Order from largest to smallest: $-14$, $+5$, $-1$, $+20$, $-7$.'),
        example: same('$+20>+5>-1>-7>-14$'),
        exampleAnswer: say('Handienetik txikienera: lehenik positiboak, 0 zenbakitik urrunenetik hasita; gero negatiboak, hurbilenetik hasita.', 'De mayor a menor: primero los positivos, del más alejado del 0; después los negativos, del más cercano.', 'من الأكبر إلى الأصغر: الموجبة أولًا بدءًا بالأبعد عن الصفر؛ ثم السالبة بدءًا بالأقرب.', 'From largest to smallest: the positives first, starting with the furthest from 0; then the negatives, starting with the closest.')
    },

    /* ---------- 3. Absolute value and opposite ---------- */
    absolute: {
        vocabulary: [
            say('distantzia', 'distancia', 'المسافة', 'distance'),
            say('zeinua', 'signo', 'الإشارة', 'sign'),
            say('unitateak', 'unidades', 'الوحدات', 'units')
        ],
        definitions: [
            {
                term: say('Balio absolutua', 'Valor absoluto', 'القيمة المطلقة', 'Absolute value'),
                meaning: say('Zenbaki batetik zerora dagoen distantzia, unitatetan. Bi barra artean idazten da: $\\lvert a\\rvert$.', 'La distancia, en unidades, de un número al cero. Se escribe entre dos barras: $\\lvert a\\rvert$.', 'المسافة بالوحدات بين العدد والصفر. وتُكتب بين خطين عموديين: $\\lvert a\\rvert$.', 'The distance, in units, from a number to zero. It is written between two bars: $\\lvert a\\rvert$.')
            }
        ],
        explanation: say(
            'Balio absolutua zenbakia bera da, zeinurik gabe. Distantzia bat denez, ez da inoiz negatiboa. Marrazkian, $-3$ zenbakia zerotik 3 unitatera dago, eta $+5$, 5 unitatera.',
            'El valor absoluto es el mismo número sin su signo. Como es una distancia, nunca es negativo. En el dibujo, $-3$ está a 3 unidades del cero y $+5$, a 5.',
            'القيمة المطلقة هي العدد نفسه دون إشارته. ولأنها مسافة فهي ليست سالبة أبدًا. في الرسم يقع $-3$ على بعد 3 وحدات من الصفر، و$+5$ على بعد 5 وحدات.',
            'The absolute value is the same number without its sign. Since it is a distance, it is never negative. In the drawing, $-3$ is 3 units from zero and $+5$ is 5 units away.'
        ),
        examplePrompt: say('Kalkulatu $\\lvert -14\\rvert$, $\\lvert +9\\rvert$ eta $\\lvert 0\\rvert$.', 'Calcula $\\lvert -14\\rvert$, $\\lvert +9\\rvert$ y $\\lvert 0\\rvert$.', 'احسب $\\lvert -14\\rvert$ و$\\lvert +9\\rvert$ و$\\lvert 0\\rvert$.', 'Work out $\\lvert -14\\rvert$, $\\lvert +9\\rvert$ and $\\lvert 0\\rvert$.'),
        example: same('$\\begin{gathered}\\lvert -14\\rvert =14\\qquad \\lvert +9\\rvert =9\\\\\\lvert 0\\rvert =0\\end{gathered}$'),
        exampleAnswer: say('Zeinua kentzen da: zerora dagoen distantzia da.', 'Se quita el signo: es la distancia al cero.', 'نحذف الإشارة: إنها المسافة إلى الصفر.', 'Drop the sign: it is the distance to zero.')
    },
    opposite: {
        vocabulary: [
            say('ispilua', 'espejo', 'المرآة', 'mirror'),
            say('zeinua', 'signo', 'الإشارة', 'sign'),
            say('balio absolutua', 'valor absoluto', 'القيمة المطلقة', 'absolute value')
        ],
        definitions: [
            {
                term: say('Zenbaki aurkakoak', 'Números opuestos', 'العددان المتعاكسان', 'Opposite numbers'),
                meaning: say('Zerotik distantzia berera daude, baina alde banatan: $+5$ eta $-5$.', 'Están a la misma distancia del cero, pero a lados distintos: $+5$ y $-5$.', 'على البعد نفسه من الصفر لكن في جهتين مختلفتين: $+5$ و$-5$.', 'They are the same distance from zero, but on different sides: $+5$ and $-5$.')
            }
        ],
        explanation: say(
            'Aurkakoa lortzeko zeinua aldatzen da, zeroan jarritako ispilu batean bezala. Aurkakoek balio absolutu bera dute. Euskaraz Aur idazten da: $\\mathrm{Aur}(+5)=-5$.',
            'Para obtener el opuesto se cambia el signo, como en un espejo colocado en el cero. Los opuestos tienen el mismo valor absoluto. Se escribe Op: $\\mathrm{Op}(+5)=-5$.',
            'للحصول على المعاكس نغيّر الإشارة، كما في مرآة موضوعة عند الصفر. وللمتعاكسين القيمة المطلقة نفسها. ونكتب: $\\mathrm{Aur}(+5)=-5$.',
            'To get the opposite, change the sign, as in a mirror placed at zero. Opposites have the same absolute value. It is written Op: $\\mathrm{Op}(+5)=-5$.'
        ),
        examplePrompt: say('Idatzi $-13$ eta $+21$ zenbakien aurkakoak.', 'Escribe el opuesto de $-13$ y el de $+21$.', 'اكتب معاكس $-13$ ومعاكس $+21$.', 'Write the opposite of $-13$ and of $+21$.'),
        example: say('$\\begin{gathered}\\mathrm{Aur}(-13)=+13\\\\\\mathrm{Aur}(+21)=-21\\end{gathered}$', '$\\begin{gathered}\\mathrm{Op}(-13)=+13\\\\\\mathrm{Op}(+21)=-21\\end{gathered}$', '$\\begin{gathered}\\mathrm{Aur}(-13)=+13\\\\\\mathrm{Aur}(+21)=-21\\end{gathered}$', '$\\begin{gathered}\\mathrm{Op}(-13)=+13\\\\\\mathrm{Op}(+21)=-21\\end{gathered}$'),
        exampleAnswer: say('Zeinua aldatzen da; balio absolutua, 13 eta 21, ez da aldatzen.', 'Se cambia el signo; el valor absoluto, 13 y 21, no cambia.', 'نغيّر الإشارة؛ أما القيمة المطلقة، 13 و21، فلا تتغير.', 'The sign changes; the absolute value, 13 and 21, does not.')
    },
    'compare-absolute': {
        vocabulary: [
            say('balio absolutua', 'valor absoluto', 'القيمة المطلقة', 'absolute value'),
            say('hurbil', 'cerca', 'أقرب', 'close')
        ],
        explanation: say(
            'Zuzena marraztu gabe ere konpara daitezke zenbaki osoak. Bi positiboren artean, balio absolutu handiena duena da handiagoa; bi negatiboren artean, balio absolutu txikiena duena, zerotik hurbilago dagoelako. Zeinu desberdinekin, positiboa da handiagoa.',
            'Sin dibujar la recta también se pueden comparar enteros. Entre dos positivos, es mayor el de mayor valor absoluto; entre dos negativos, el de menor valor absoluto, porque está más cerca del cero. Con signos distintos, el positivo es el mayor.',
            'يمكن مقارنة الأعداد الصحيحة دون رسم المستقيم. بين عددين موجبين يكون الأكبر صاحب القيمة المطلقة الأكبر؛ وبين عددين سالبين صاحب القيمة المطلقة الأصغر، لأنه أقرب إلى الصفر. ومع إشارتين مختلفتين يكون الموجب هو الأكبر.',
            'You can also compare integers without drawing the line. Between two positives, the one with the bigger absolute value is bigger; between two negatives, the one with the smaller absolute value, because it is closer to zero. With different signs, the positive is bigger.'
        ),
        examplePrompt: say('Konparatu balio absolutuarekin: $-21$ eta $-12$; $+30$ eta $+29$.', 'Compara con el valor absoluto: $-21$ y $-12$; $+30$ y $+29$.', 'قارن بالقيمة المطلقة: $-21$ و$-12$؛ $+30$ و$+29$.', 'Compare using the absolute value: $-21$ and $-12$; $+30$ and $+29$.'),
        example: same('$\\begin{gathered}\\lvert -21\\rvert >\\lvert -12\\rvert \\ \\to\\ -21<-12\\\\+30>+29\\end{gathered}$'),
        exampleAnswer: say('Negatiboetan, balio absolutu txikienak irabazten du; positiboetan, handienak.', 'Entre negativos gana el de menor valor absoluto; entre positivos, el de mayor.', 'بين السالبة يغلب صاحب القيمة المطلقة الأصغر؛ وبين الموجبة صاحب الأكبر.', 'Between negatives, the smaller absolute value wins; between positives, the bigger one.'),
        why: {
            text: say(
                'Balio absolutu handiagoa duen negatibo bat zerotik urrunago dago, ezkerrerago. Diruarekin pentsatu: 15 euro zor izatea 5 euro zor izatea baino okerragoa da. Horregatik $-15$ zenbakia $-5$ baino txikiagoa da.',
                'Un negativo con mayor valor absoluto está más lejos del cero, más a la izquierda. Piénsalo con dinero: deber 15 € es peor que deber 5 €. Por eso $-15$ es menor que $-5$.',
                'العدد السالب ذو القيمة المطلقة الأكبر أبعد عن الصفر، أي أكثر إلى اليسار. فكّر في المال: أن تكون مدينًا بـ15 يورو أسوأ من أن تكون مدينًا بـ5 يورو. لذلك $-15$ أصغر من $-5$.',
                'A negative with a bigger absolute value is further from zero, further to the left. Think of money: owing €15 is worse than owing €5. That is why $-15$ is smaller than $-5$.'
            ),
            math: same('$-15<-5$')
        }
    },

    /* ---------- 4. Adding and subtracting ---------- */
    'add-same': {
        vocabulary: [
            say('zeinu bera', 'mismo signo', 'الإشارة نفسها', 'same sign'),
            say('zor', 'deber', 'مدين', 'owe')
        ],
        explanation: say(
            'Bi zenbaki osok zeinu bera badute, haien balio absolutuak batzen dira eta zeinu bera jartzen da. Pentsatu diruarekin: 3 euro badituzu eta 2 ematen dizkizute, 5 dituzu; 4 euro zor badituzu eta beste 1, 5 euro zor dituzu, marrazkiko zuzenean bezala.',
            'Si dos enteros tienen el mismo signo, se suman sus valores absolutos y se deja el mismo signo. Piénsalo con dinero: si tienes 3 € y te dan 2 €, tienes 5 €; si debes 4 € y debes 1 € más, debes 5 €, como en la recta del dibujo.',
            'إذا كانت للعددين الإشارة نفسها نجمع قيمتيهما المطلقتين ونضع الإشارة نفسها. فكّر في المال: إذا كان معك 3 يورو وأعطوك 2، صار معك 5؛ وإذا كنت مدينًا بـ4 يورو ثم بيورو آخر، صرت مدينًا بـ5، كما على مستقيم الرسم.',
            'If two integers have the same sign, add their absolute values and keep the same sign. Think of money: if you have €3 and you are given €2, you have €5; if you owe €4 and owe €1 more, you owe €5, as on the line in the drawing.'
        ),
        examplePrompt: say('Kalkulatu $(-12)+(-9)$ eta $(+16)+(+7)$.', 'Calcula $(-12)+(-9)$ y $(+16)+(+7)$.', 'احسب $(-12)+(-9)$ و$(+16)+(+7)$.', 'Work out $(-12)+(-9)$ and $(+16)+(+7)$.'),
        example: same('$\\begin{gathered}(-12)+(-9)=-21\\\\(+16)+(+7)=+23\\end{gathered}$'),
        exampleAnswer: say('$12+9$ eta $16+7$ batzen dira, eta emaitza bakoitzak bere batugaien zeinua darama.', 'Se suman $12+9$ y $16+7$, y cada resultado lleva el signo de sus sumandos.', 'نجمع $12+9$ و$16+7$، وتأخذ كل نتيجة إشارة حدّيها.', 'You add $12+9$ and $16+7$, and each result takes the sign of its addends.')
    },
    'add-different': {
        vocabulary: [
            say('zeinu desberdina', 'distinto signo', 'إشارتان مختلفتان', 'different signs'),
            say('zorra', 'deuda', 'الدَّين', 'debt'),
            say('aurkakoak', 'opuestos', 'المتعاكسان', 'opposites')
        ],
        explanation: say(
            'Zeinu desberdina badute, balio absolutu handienari txikiena kentzen zaio, eta balio absolutu handiena duenaren zeinua jartzen da. Diruarekin, marrazkian bezala: 5 euro badituzu eta 3 zor badituzu, zorra ordaintzean 2 euro geratzen zaizkizu.',
            'Si tienen distinto signo, al mayor valor absoluto se le resta el menor y se pone el signo del que tiene mayor valor absoluto. Con dinero, como en el dibujo: si tienes 5 € y debes 3 €, al pagar la deuda te quedan 2 €.',
            'إذا اختلفت الإشارتان نطرح القيمة المطلقة الصغرى من الكبرى ونضع إشارة صاحب القيمة المطلقة الأكبر. ومع المال، كما في الرسم: إذا كان معك 5 يورو وعليك دَين 3 يورو، يبقى معك 2 يورو بعد تسديد الدَّين.',
            'If they have different signs, subtract the smaller absolute value from the bigger one and use the sign of the one with the bigger absolute value. With money, as in the drawing: if you have €5 and owe €3, after paying the debt you have €2 left.'
        ),
        examplePrompt: say('Kalkulatu $(+14)+(-20)$ eta $(-11)+(+18)$.', 'Calcula $(+14)+(-20)$ y $(-11)+(+18)$.', 'احسب $(+14)+(-20)$ و$(-11)+(+18)$.', 'Work out $(+14)+(-20)$ and $(-11)+(+18)$.'),
        example: same('$\\begin{gathered}(+14)+(-20)=-6\\\\(-11)+(+18)=+7\\end{gathered}$'),
        exampleAnswer: say('$20-14=6$, eta negatiboak irabazten du; $18-11=7$, eta positiboak irabazten du.', '$20-14=6$ y gana el negativo; $18-11=7$ y gana el positivo.', '$20-14=6$ ويغلب السالب؛ $18-11=7$ ويغلب الموجب.', '$20-14=6$ and the negative wins; $18-11=7$ and the positive wins.')
    },
    subtract: {
        vocabulary: [
            say('kenketa', 'resta', 'الطرح', 'subtraction'),
            say('aurkakoa', 'opuesto', 'المعاكس', 'opposite')
        ],
        explanation: say(
            'Bi zenbaki oso kentzeko, lehenengoari bigarrenaren aurkakoa batzen zaio: kenketa batuketa bihurtzen da, marrazkian bezala, $(+5)-(+2)=(+5)+(-2)$. Kontuz: negatibo bat kentzea positibo bat batzea da.',
            'Para restar dos enteros, al primero se le suma el opuesto del segundo: la resta se convierte en una suma, como en el dibujo, $(+5)-(+2)=(+5)+(-2)$. Cuidado: restar un negativo es sumar un positivo.',
            'لطرح عددين صحيحين نجمع إلى الأول معاكس الثاني: فيتحول الطرح إلى جمع، كما في الرسم، $(+5)-(+2)=(+5)+(-2)$. انتبه: طرح عدد سالب هو جمع عدد موجب.',
            'To subtract two integers, add the opposite of the second to the first: the subtraction becomes an addition, as in the drawing, $(+5)-(+2)=(+5)+(-2)$. Careful: subtracting a negative is adding a positive.'
        ),
        examplePrompt: say('Urpekari bat $-12$ metrotan dago, eta kaio bat $+15$ metrotan hegan. Zenbat metro daude haien artean?', 'Un buzo está a $-12$ m y una gaviota vuela a $+15$ m. ¿Cuántos metros los separan?', 'غوّاص على $-12$ م ونورس يطير على $+15$ م. كم مترًا بينهما؟', 'A diver is at $-12$ m and a seagull is flying at $+15$ m. How many metres apart are they?'),
        example: same('$\\begin{aligned}(+15)-(-12)&=(+15)+(+12)\\\\&=+27\\end{aligned}$'),
        exampleAnswer: say('27 metro daude haien artean: negatibo bat kentzea batzea da.', 'Los separan 27 m: restar un negativo es sumar.', 'بينهما 27 م: طرح السالب جمع.', 'They are 27 m apart: subtracting a negative is adding.'),
        why: {
            text: say(
                'Kentzea batzearen kontrakoa da: $(+7)+(-4)=+3$ bada, $(+3)-(-4)$ kenketak $+7$ zenbakira itzuli behar du. Eta $+3$ zenbakitik $+7$ zenbakira iristeko, $+4$ batu behar da: negatibo bat kentzea haren aurkakoa batzea da.',
                'Restar es lo contrario de sumar: si $(+7)+(-4)=+3$, la resta $(+3)-(-4)$ tiene que volver a $+7$. Y para pasar de $+3$ a $+7$ hay que sumar $+4$: restar un negativo es sumar su opuesto.',
                'الطرح عكس الجمع: إذا كان $(+7)+(-4)=+3$ فإن الطرح $(+3)-(-4)$ يجب أن يعيدنا إلى $+7$. وللانتقال من $+3$ إلى $+7$ نجمع $+4$: فطرح العدد السالب هو جمع معاكسه.',
                'Subtracting undoes adding: if $(+7)+(-4)=+3$, then $(+3)-(-4)$ has to take you back to $+7$. And to get from $+3$ to $+7$ you add $+4$: subtracting a negative is adding its opposite.'
            ),
            math: same('$\\begin{aligned}(+3)-(-4)&=(+3)+(+4)\\\\&=+7\\end{aligned}$')
        }
    },
    brackets: {
        vocabulary: [
            say('parentesia', 'paréntesis', 'القوس', 'bracket'),
            say('zeinuak', 'signos', 'الإشارات', 'signs')
        ],
        explanation: say(
            'Errazago kalkulatzeko parentesiak kentzen dira, aurrean duten zeinuaren arabera, marrazkian bezala. Gero, batu positiboak alde batetik eta negatiboak bestetik, eta kendu emaitzak.',
            'Para calcular con más facilidad se quitan los paréntesis, según el signo que llevan delante, como en el dibujo. Después, suma los positivos por un lado y los negativos por otro, y resta los resultados.',
            'لتسهيل الحساب نحذف الأقواس حسب الإشارة التي قبلها، كما في الرسم. ثم اجمع الموجبة وحدها والسالبة وحدها، واطرح النتيجتين.',
            'To make the calculation easier, remove the brackets according to the sign in front of them, as in the drawing. Then add up the positives on one side and the negatives on the other, and subtract the results.'
        ),
        cases: [
            { title: say('Aurrean + badago', 'Con + delante', 'إذا سبقته +', 'With + in front'), text: say('Barruko zeinuak ez dira aldatzen.', 'Los signos de dentro no cambian.', 'لا تتغير الإشارات داخل القوس.', 'The signs inside do not change.'), math: same('$+(-5+3-2)=-5+3-2$') },
            { title: say('Aurrean − badago', 'Con − delante', 'إذا سبقته −', 'With − in front'), text: say('Barruko zeinu guztiak aldatzen dira.', 'Cambian todos los signos de dentro.', 'تتغير كل الإشارات داخل القوس.', 'Every sign inside changes.'), math: same('$-(-5+3-2)=+5-3+2$') }
        ],
        examplePrompt: say('Kendu parentesiak eta kalkulatu: $12-(6-9)+(-4)$.', 'Quita los paréntesis y calcula: $12-(6-9)+(-4)$.', 'احذف الأقواس واحسب: $12-(6-9)+(-4)$.', 'Remove the brackets and work out: $12-(6-9)+(-4)$.'),
        example: same('$\\begin{aligned}&12-(6-9)+(-4)\\\\&=12-6+9-4\\\\&=21-10=11\\end{aligned}$'),
        exampleAnswer: say('Positiboak: $12+9=21$. Negatiboak: $6+4=10$. Emaitza: $21-10=11$.', 'Positivos: $12+9=21$. Negativos: $6+4=10$. Resultado: $21-10=11$.', 'الموجبة: $12+9=21$. السالبة: $6+4=10$. النتيجة: $21-10=11$.', 'Positives: $12+9=21$. Negatives: $6+4=10$. Result: $21-10=11$.')
    },

    /* ---------- 5. Multiplying and dividing ---------- */
    multiply: {
        vocabulary: [
            say('zeinuen araua', 'regla de los signos', 'قاعدة الإشارات', 'sign rule'),
            say('balio absolutuak', 'valores absolutos', 'القيمتان المطلقتان', 'absolute values')
        ],
        explanation: say(
            'Bi zenbaki oso biderkatzeko, biderkatu haien balio absolutuak eta jarri zeinua: + biek zeinu bera badute, eta − zeinu desberdinak badituzte. Marrazkiko taulak zeinuen araua laburtzen du.',
            'Para multiplicar dos enteros, multiplica sus valores absolutos y pon el signo: + si los dos tienen el mismo signo, y − si tienen signos distintos. La tabla del dibujo resume la regla de los signos.',
            'لضرب عددين صحيحين اضرب قيمتيهما المطلقتين وضع الإشارة: + إذا كانت لهما الإشارة نفسها، و− إذا اختلفت إشارتاهما. ويلخّص جدول الرسم قاعدة الإشارات.',
            'To multiply two integers, multiply their absolute values and write the sign: + if both have the same sign, and − if they have different signs. The table in the drawing sums up the sign rule.'
        ),
        examplePrompt: say('Kalkulatu $(-7)\\cdot(-6)$ eta $(+9)\\cdot(-4)$.', 'Calcula $(-7)\\cdot(-6)$ y $(+9)\\cdot(-4)$.', 'احسب $(-7)\\cdot(-6)$ و$(+9)\\cdot(-4)$.', 'Work out $(-7)\\cdot(-6)$ and $(+9)\\cdot(-4)$.'),
        example: same('$\\begin{gathered}(-7)\\cdot(-6)=+42\\\\(+9)\\cdot(-4)=-36\\end{gathered}$'),
        exampleAnswer: say('Zeinu bera: +. Zeinu desberdinak: −.', 'Mismo signo: +. Signos distintos: −.', 'الإشارة نفسها: +. إشارتان مختلفتان: −.', 'Same sign: +. Different signs: −.'),
        why: {
            text: say(
                'Begiratu $-3$ zenbakiaren taulari: $(-3)\\cdot 1=-3$, $(-3)\\cdot 0=0$. Bigarren biderkagaia 1 jaisten den bakoitzean, emaitza 3 igotzen da. Patroiak jarraitzen badu, $(-3)\\cdot(-1)=+3$: minus bider minus, plus.',
                'Mira la tabla del $-3$: $(-3)\\cdot 1=-3$, $(-3)\\cdot 0=0$. Cada vez que el segundo factor baja 1, el resultado sube 3. Si sigue el patrón, $(-3)\\cdot(-1)=+3$: menos por menos, más.',
                'انظر إلى جدول $-3$: $(-3)\\cdot 1=-3$، $(-3)\\cdot 0=0$. كلما نقص العامل الثاني 1 زادت النتيجة 3. وإذا استمر النمط فإن $(-3)\\cdot(-1)=+3$: سالب في سالب يعطي موجبًا.',
                'Look at the $-3$ times table: $(-3)\\cdot 1=-3$, $(-3)\\cdot 0=0$. Each time the second factor goes down by 1, the result goes up by 3. If the pattern goes on, $(-3)\\cdot(-1)=+3$: minus times minus is plus.'
            ),
            math: same('$\\begin{gathered}(-3)\\cdot 1=-3\\\\(-3)\\cdot 0=0\\\\(-3)\\cdot(-1)=+3\\end{gathered}$')
        }
    },
    divide: {
        vocabulary: [
            say('alderantzizkoa', 'inversa', 'العكسية', 'inverse'),
            say('zeinuen araua', 'regla de los signos', 'قاعدة الإشارات', 'sign rule'),
            say('zehatza', 'exacta', 'تامة', 'exact')
        ],
        explanation: say(
            'Zatiketan biderketaren zeinuen arau bera erabiltzen da: balio absolutuak zatitzen dira (zatiketa zehatza denean) eta zeinua jartzen da. Biderketaren alderantzizko eragiketa denez, falta den zenbaki bat aurkitzeko ere balio du.',
            'En la división se usa la misma regla de los signos que en la multiplicación: se dividen los valores absolutos (cuando la división es exacta) y se pone el signo. Como es la operación inversa de la multiplicación, sirve también para encontrar un número que falta.',
            'في القسمة نستعمل قاعدة الإشارات نفسها التي في الضرب: نقسم القيمتين المطلقتين (حين تكون القسمة تامة) ونضع الإشارة. ولأنها العملية العكسية للضرب فهي تفيد أيضًا في إيجاد عدد ناقص.',
            'Division uses the same sign rule as multiplication: divide the absolute values (when the division is exact) and write the sign. Since it is the inverse operation of multiplication, it also helps you find a missing number.'
        ),
        examplePrompt: say('Kalkulatu $(-63)\\mathbin{:}(+9)$, eta aurkitu falta den zenbakia: $(-6)\\cdot\\square=+54$.', 'Calcula $(-63)\\mathbin{:}(+9)$ y halla el número que falta: $(-6)\\cdot\\square=+54$.', 'احسب $(-63)\\mathbin{:}(+9)$ وأوجد العدد الناقص: $(-6)\\cdot\\square=+54$.', 'Work out $(-63)\\mathbin{:}(+9)$ and find the missing number: $(-6)\\cdot\\square=+54$.'),
        example: same('$\\begin{gathered}(-63)\\mathbin{:}(+9)=-7\\\\\\square=(+54)\\mathbin{:}(-6)=-9\\end{gathered}$'),
        exampleAnswer: say('Zeinu desberdinak: −. Egiaztapena: $(-6)\\cdot(-9)=+54$.', 'Signos distintos: −. Comprobación: $(-6)\\cdot(-9)=+54$.', 'إشارتان مختلفتان: −. التحقق: $(-6)\\cdot(-9)=+54$.', 'Different signs: −. Check: $(-6)\\cdot(-9)=+54$.')
    }
}
