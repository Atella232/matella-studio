import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { RationalsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Zenbaki arrazionalak · 3. DBH — what each lesson tells: the new words
   (definitions), the key words in four languages (vocabulary), a short
   explanation, its cases, the example as an exercise («Another example»)
   and, in four lessons, «Why does it work?». Plain data so the tests can
   import it; lessons.tsx merges it into the topics. The explanation keeps
   the numbers its drawing shows (3/4, 84/126, 17/6, 1/2 + 1/3, 0,245…);
   the example uses numbers of its own, never those of «Let's solve», of
   «Check it» or of the typical mistake. Arabic writes the decimal point.
   Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const rationalsLessonTexts: Record<RationalsTopicId, LessonTexts> = {
    /* ---------- 1. Fractions and equivalence ---------- */
    'rational-meaning': {
        definitions: [
            {
                term: say('Zenbaki arrazionala', 'Número racional', 'العدد النسبي', 'Rational number'),
                meaning: say('Zatiki gisa idatz daitekeen zenbakia, $\\frac{a}{b}$, $a$ eta $b$ osoak eta $b\\neq 0$ izanik. Haien multzoa $\\mathbb{Q}$ da.', 'Un número que se puede escribir como fracción $\\frac{a}{b}$, con $a$ y $b$ enteros y $b\\neq 0$. Su conjunto es $\\mathbb{Q}$.', 'عدد يمكن كتابته كسرًا $\\frac{a}{b}$ حيث $a$ و$b$ عددان صحيحان و$b\\neq 0$. ومجموعتها $\\mathbb{Q}$.', 'A number that can be written as a fraction $\\frac{a}{b}$, with $a$ and $b$ integers and $b\\neq 0$. Their set is $\\mathbb{Q}$.')
            }
        ],
        vocabulary: [
            say('zenbakitzailea', 'numerador', 'البسط', 'numerator'),
            say('izendatzailea', 'denominador', 'المقام', 'denominator'),
            say('zatiketa', 'división', 'قسمة', 'division'),
            say('zenbaki osoa', 'número entero', 'عدد صحيح', 'integer')
        ],
        explanation: say(
            'Zatiki bat hiru eratara irakurtzen da: oso baten zatiak (4 zatitan banatu eta 3 hartu), zatiketa bat ($3\\div 4=0{,}75$) eta zuzeneko zenbaki bat. Negatiboa izan daiteke: $\\frac{-3}{4}=\\frac{3}{-4}=-\\frac{3}{4}$. Zenbaki osoak ere zatikiak dira: $-2=\\frac{-10}{5}$.',
            'Una fracción se lee de tres maneras: partes de un todo (dividir en 4 partes y tomar 3), una división ($3\\div 4=0{,}75$) y un número de la recta. Puede ser negativa: $\\frac{-3}{4}=\\frac{3}{-4}=-\\frac{3}{4}$. Los números enteros también son fracciones: $-2=\\frac{-10}{5}$.',
            'يُقرأ الكسر بثلاث طرق: أجزاء من كل (التقسيم إلى 4 أجزاء وأخذ 3)، وقسمة ($3\\div 4=0{,}75$)، وعدد على المستقيم. ويمكن أن يكون سالبًا: $\\frac{-3}{4}=\\frac{3}{-4}=-\\frac{3}{4}$. والأعداد الصحيحة كسور أيضًا: $-2=\\frac{-10}{5}$.',
            'A fraction can be read in three ways: parts of a whole (divide into 4 parts and take 3), a division ($3\\div 4=0{,}75$) and a number on the number line. It can be negative: $\\frac{-3}{4}=\\frac{3}{-4}=-\\frac{3}{4}$. Integers are fractions too: $-2=\\frac{-10}{5}$.'
        ),
        examplePrompt: say('Zerrenda honetako zein zenbaki dira arrazionalak: $-7$, $0{,}25$ eta $\\frac{9}{4}$?', '¿Qué números de esta lista son racionales: $-7$, $0{,}25$ y $\\frac{9}{4}$?', 'أيّ أعداد هذه القائمة نسبية: $-7$ و$0{,}25$ و$\\frac{9}{4}$؟', 'Which numbers in this list are rational: $-7$, $0{,}25$ and $\\frac{9}{4}$?'),
        example: same('$-7=\\frac{-7}{1}\\qquad 0{,}25=\\frac{1}{4}\\qquad\\frac{9}{4}=2{,}25$'),
        exampleAnswer: say('Hirurak: hirurak idatz daitezke zatiki gisa.', 'Los tres: todos se pueden escribir como fracción.', 'الثلاثة كلها: يمكن كتابة كل منها كسرًا.', 'All three: each of them can be written as a fraction.')
    },
    equivalent: {
        definitions: [
            {
                term: say('Gurutzeko biderkadurak', 'Productos cruzados', 'حاصلا الضرب التبادلي', 'Cross products'),
                meaning: say('$\\frac{a}{b}$ eta $\\frac{c}{d}$ zatikietan, $a\\cdot d$ eta $b\\cdot c$: zenbakitzaile bakoitza bestearen izendatzaileaz.', 'En $\\frac{a}{b}$ y $\\frac{c}{d}$, $a\\cdot d$ y $b\\cdot c$: cada numerador por el denominador de la otra.', 'في $\\frac{a}{b}$ و$\\frac{c}{d}$ هما $a\\cdot d$ و$b\\cdot c$: كل بسط في مقام الكسر الآخر.', 'In $\\frac{a}{b}$ and $\\frac{c}{d}$, $a\\cdot d$ and $b\\cdot c$: each numerator times the other denominator.')
            }
        ],
        vocabulary: [
            say('balioa', 'valor', 'القيمة', 'value'),
            say('gai ezezaguna', 'término desconocido', 'حد مجهول', 'unknown term'),
            say('zatiki baliokideak', 'fracciones equivalentes', 'كسور متكافئة', 'equivalent fractions')
        ],
        explanation: say(
            'Bi zatiki baliokideak dira balio bera dutenean, $\\frac{3}{4}=\\frac{6}{8}=\\frac{9}{12}$ bezala. Gurutzeko biderkadurekin egiaztatzen da: $\\frac{a}{b}=\\frac{c}{d}$ baldin $a\\cdot d=b\\cdot c$. Horrela gai ezezagun bat ere kalkulatzen da. Zatiki baliokideak lortzeko, biderkatu edo zatitu bi gaiak zenbaki beraz.',
            'Dos fracciones son equivalentes si tienen el mismo valor, como $\\frac{3}{4}=\\frac{6}{8}=\\frac{9}{12}$. Se comprueba con los productos cruzados: $\\frac{a}{b}=\\frac{c}{d}$ si $a\\cdot d=b\\cdot c$. Así también se calcula un término desconocido. Para obtener fracciones equivalentes, multiplica o divide los dos términos por el mismo número.',
            'يتكافأ كسران إذا كانت لهما القيمة نفسها، مثل $\\frac{3}{4}=\\frac{6}{8}=\\frac{9}{12}$. ونتحقق من ذلك بحاصلَي الضرب التبادلي: $\\frac{a}{b}=\\frac{c}{d}$ إذا كان $a\\cdot d=b\\cdot c$. وبذلك نحسب أيضًا حدًّا مجهولًا. وللحصول على كسور متكافئة اضرب الحدين في العدد نفسه أو اقسمهما عليه.',
            'Two fractions are equivalent if they have the same value, like $\\frac{3}{4}=\\frac{6}{8}=\\frac{9}{12}$. You check it with the cross products: $\\frac{a}{b}=\\frac{c}{d}$ if $a\\cdot d=b\\cdot c$. This also lets you work out an unknown term. To get equivalent fractions, multiply or divide both terms by the same number.'
        ),
        examplePrompt: say('Kalkulatu $x$, $\\frac{14}{x}=\\frac{35}{60}$ izan dadin.', 'Calcula $x$ para que $\\frac{14}{x}=\\frac{35}{60}$.', 'احسب $x$ بحيث يكون $\\frac{14}{x}=\\frac{35}{60}$.', 'Work out $x$ so that $\\frac{14}{x}=\\frac{35}{60}$.'),
        example: same('$14\\cdot 60=35\\cdot x\\ \\to\\ x=\\frac{840}{35}=24$'),
        exampleAnswer: same('$x=24$'),
        why: {
            text: say(
                '$\\frac{a}{b}=\\frac{c}{d}$ bada, biderkatu bi aldeak $b\\cdot d$ zenbakiaz: ezkerrean $a\\cdot d$ geratzen da, eta eskuinean $c\\cdot b$. Horregatik dira berdinak gurutzeko biderkadurak.',
                'Si $\\frac{a}{b}=\\frac{c}{d}$, multiplica los dos lados por $b\\cdot d$: a la izquierda queda $a\\cdot d$ y a la derecha $c\\cdot b$. Por eso los productos cruzados son iguales.',
                'إذا كان $\\frac{a}{b}=\\frac{c}{d}$ فاضرب الطرفين في $b\\cdot d$: يبقى في اليسار $a\\cdot d$ وفي اليمين $c\\cdot b$. لذلك يتساوى حاصلا الضرب التبادلي.',
                'If $\\frac{a}{b}=\\frac{c}{d}$, multiply both sides by $b\\cdot d$: on the left you get $a\\cdot d$ and on the right $c\\cdot b$. That is why the cross products are equal.'
            ),
            math: same('$\\frac{3}{4}=\\frac{9}{12}\\ \\to\\ 3\\cdot 12=4\\cdot 9=36$')
        }
    },
    simplify: {
        definitions: [
            {
                term: say('Zatiki laburtezina', 'Fracción irreducible', 'الكسر غير القابل للاختزال', 'Simplest form'),
                meaning: say('Gehiago sinplifika ezin den zatikia: bere gaien z.k.h. 1 da.', 'La que ya no se puede simplificar: el m.c.d. de sus términos es 1.', 'الكسر الذي لا يمكن اختزاله أكثر: القاسم المشترك الأكبر لحديه 1.', 'A fraction that cannot be simplified any further: the GCD of its terms is 1.')
            }
        ],
        vocabulary: [
            say('anplifikatu', 'amplificar', 'التوسيع', 'amplify'),
            say('sinplifikatu', 'simplificar', 'الاختزال', 'simplify'),
            say('zatitzaile komuna', 'divisor común', 'قاسم مشترك', 'common divisor')
        ],
        explanation: say(
            'Anplifikatzea bi gaiak zenbaki beraz biderkatzea da; sinplifikatzea, zatitzaile komun batez zatitzea. Zatiki laburtezinera pauso bakarrean iristeko, zatitu bi gaiak haien z.k.h. zenbakiaz: z.k.h.(84, 126) = 42 denez, $\\frac{84}{126}=\\frac{2}{3}$.',
            'Amplificar es multiplicar los dos términos por el mismo número; simplificar, dividirlos entre un divisor común. Para llegar a la irreducible en un solo paso, divide los dos términos entre su m.c.d.: como m.c.d.(84, 126) = 42, $\\frac{84}{126}=\\frac{2}{3}$.',
            'التوسيع هو ضرب الحدين في العدد نفسه، والاختزال قسمتهما على قاسم مشترك. وللوصول إلى الكسر غير القابل للاختزال بخطوة واحدة اقسم الحدين على قاسمهما المشترك الأكبر: بما أن ق.م.أ.(84، 126) = 42 فإن $\\frac{84}{126}=\\frac{2}{3}$.',
            'Amplifying means multiplying both terms by the same number; simplifying, dividing them by a common divisor. To reach the simplest form in a single step, divide both terms by their GCD: since GCD(84, 126) = 42, $\\frac{84}{126}=\\frac{2}{3}$.'
        ),
        examplePrompt: say('Sinplifikatu $\\frac{90}{150}$ zatiki laburtezinera arte.', 'Simplifica $\\frac{90}{150}$ hasta la fracción irreducible.', 'اختزل $\\frac{90}{150}$ حتى تصل إلى الكسر غير القابل للاختزال.', 'Simplify $\\frac{90}{150}$ to its simplest form.'),
        example: same('$\\frac{90}{150}=\\frac{90\\div 30}{150\\div 30}=\\frac{3}{5}$'),
        exampleAnswer: say('Z.k.h. 30 da: $\\frac{3}{5}$ geratzen da.', 'El m.c.d. es 30: queda $\\frac{3}{5}$.', 'القاسم المشترك الأكبر 30: يبقى $\\frac{3}{5}$.', 'The GCD is 30: you get $\\frac{3}{5}$.')
    },

    /* ---------- 2. Order and the number line ---------- */
    compare: {
        vocabulary: [
            say('izendatzaile komuna', 'común denominador', 'مقام مشترك', 'common denominator'),
            say('balio absolutua', 'valor absoluto', 'القيمة المطلقة', 'absolute value'),
            say('zenbakitzailea', 'numerador', 'البسط', 'numerator')
        ],
        explanation: say(
            'Zatikiak konparatzeko, jarri izendatzaile komuna (izendatzaileen m.k.t.) eta konparatu zenbakitzaileak. Bi lasterbide daude:',
            'Para comparar fracciones, pásalas a común denominador (el m.c.m. de los denominadores) y compara los numeradores. Hay dos atajos:',
            'لمقارنة الكسور وحّدها في مقام مشترك (المضاعف المشترك الأصغر للمقامات) وقارن البسوط. وهناك طريقتان مختصرتان:',
            'To compare fractions, give them a common denominator (the LCM of the denominators) and compare the numerators. There are two shortcuts:'
        ),
        cases: [
            {
                title: say('Zenbakitzaile bera', 'Mismo numerador', 'البسط نفسه', 'Same numerator'),
                text: say('Txikiena izendatzaile handiena duena da.', 'Es menor la de mayor denominador.', 'الأصغر هو صاحب المقام الأكبر.', 'The one with the bigger denominator is the smaller one.'),
                math: same('$\\frac{3}{8}<\\frac{3}{5}$')
            },
            {
                title: say('Negatiboak', 'Negativas', 'الكسور السالبة', 'Negatives'),
                text: say('Zero baino txikiagoak dira, eta haien artean txikiena balio absolutu handiena duena da.', 'Son menores que cero, y entre ellas es menor la de mayor valor absoluto.', 'هي أصغر من الصفر، وبينها يكون الأصغر صاحب القيمة المطلقة الأكبر.', 'They are less than zero, and among them the one with the greater absolute value is the smaller one.'),
                math: same('$-\\frac{3}{4}<-\\frac{2}{3}<0$')
            }
        ],
        examplePrompt: say('Ordenatu txikienetik handienera: $-\\frac{5}{6}$, $\\frac{3}{4}$ eta $-\\frac{7}{9}$.', 'Ordena de menor a mayor: $-\\frac{5}{6}$, $\\frac{3}{4}$ y $-\\frac{7}{9}$.', 'رتّب من الأصغر إلى الأكبر: $-\\frac{5}{6}$ و$\\frac{3}{4}$ و$-\\frac{7}{9}$.', 'Order from smallest to largest: $-\\frac{5}{6}$, $\\frac{3}{4}$ and $-\\frac{7}{9}$.'),
        example: same('$-\\frac{5}{6}=-\\frac{30}{36}\\qquad -\\frac{7}{9}=-\\frac{28}{36}\\qquad\\frac{3}{4}=\\frac{27}{36}$'),
        exampleAnswer: say('$-\\frac{5}{6}<-\\frac{7}{9}<\\frac{3}{4}$: negatiboen artean, $-\\frac{30}{36}$ dago zerotik urrunen.', '$-\\frac{5}{6}<-\\frac{7}{9}<\\frac{3}{4}$: entre las negativas, $-\\frac{30}{36}$ es la más alejada del cero.', '$-\\frac{5}{6}<-\\frac{7}{9}<\\frac{3}{4}$: بين السالبة يكون $-\\frac{30}{36}$ الأبعد عن الصفر.', '$-\\frac{5}{6}<-\\frac{7}{9}<\\frac{3}{4}$: among the negatives, $-\\frac{30}{36}$ is the furthest from zero.')
    },
    line: {
        definitions: [
            {
                term: say('Talesen teorema', 'Teorema de Tales', 'مبرهنة طاليس', 'Thales\' theorem'),
                meaning: say('Zuzen zeihar batean zati berdinak markatu eta paraleloak marrazten badira, zuzenaren tartea ere zati berdinetan geratzen da.', 'Si en una recta oblicua marcas partes iguales y trazas paralelas, el tramo de la recta también queda en partes iguales.', 'إذا علّمت أجزاء متساوية على مستقيم مائل ورسمت مستقيمات موازية، ينقسم المجال على المستقيم أيضًا إلى أجزاء متساوية.', 'If you mark equal parts on a slanted line and draw parallel lines, the segment of the number line is split into equal parts too.')
            }
        ],
        vocabulary: [
            say('zati osoa', 'parte entera', 'الجزء الصحيح', 'whole-number part'),
            say('zatiki propioa', 'fracción propia', 'كسر حقيقي', 'proper fraction'),
            say('ezkerrean', 'izquierda', 'يسار', 'left')
        ],
        explanation: say(
            'Idatzi zatikia zati oso gehi zatiki propio gisa: $\\frac{17}{6}=2+\\frac{5}{6}$, 2 eta 3 artean dago. Zatitu tarte hori 6 zati berdinetan Talesen teoremarekin, eta hartu 5. Negatiboak 0 puntuaren ezkerrean daude: $-\\frac{12}{5}=-2-\\frac{2}{5}$.',
            'Escribe la fracción como parte entera más fracción propia: $\\frac{17}{6}=2+\\frac{5}{6}$ está entre 2 y 3. Divide ese tramo en 6 partes iguales con el teorema de Tales y toma 5. Las negativas van a la izquierda del 0: $-\\frac{12}{5}=-2-\\frac{2}{5}$.',
            'اكتب الكسر جزءًا صحيحًا مع كسر حقيقي: $\\frac{17}{6}=2+\\frac{5}{6}$ يقع بين 2 و3. قسّم هذا المجال إلى 6 أجزاء متساوية بمبرهنة طاليس وخذ 5. والكسور السالبة تقع على يسار الصفر: $-\\frac{12}{5}=-2-\\frac{2}{5}$.',
            'Write the fraction as a whole-number part plus a proper fraction: $\\frac{17}{6}=2+\\frac{5}{6}$ lies between 2 and 3. Split that segment into 6 equal parts with Thales\' theorem and take 5. Negative fractions go to the left of 0: $-\\frac{12}{5}=-2-\\frac{2}{5}$.'
        ),
        examplePrompt: say('Zein bi zenbaki osoren artean dago $-\\frac{23}{4}$, eta nola kokatzen da?', '¿Entre qué dos enteros está $-\\frac{23}{4}$ y cómo se sitúa?', 'بين أي عددين صحيحين يقع $-\\frac{23}{4}$ وكيف نضعه؟', 'Between which two integers is $-\\frac{23}{4}$, and how do you place it?'),
        example: same('$-\\frac{23}{4}=-5-\\frac{3}{4}=-5{,}75$'),
        exampleAnswer: say('$-6$ eta $-5$ artean: zatitu tarte hori 4 zatitan eta hartu 3, $-5$ puntutik ezkerrera.', 'Entre $-6$ y $-5$: divide ese tramo en 4 partes y toma 3 desde el $-5$ hacia la izquierda.', 'بين $-6$ و$-5$: قسّم هذا المجال إلى 4 أجزاء وخذ 3 من $-5$ نحو اليسار.', 'Between $-6$ and $-5$: split that segment into 4 parts and take 3, going left from $-5$.')
    },
    between: {
        definitions: [
            {
                term: say('Dentsitatea', 'Densidad', 'الكثافة', 'Density'),
                meaning: say('Bi zenbaki arrazional desberdinen artean beti dago beste arrazional bat; beraz, infinitu daude haien artean.', 'Entre dos números racionales distintos siempre hay otro racional; por eso entre ellos hay infinitos.', 'بين عددين نسبيين مختلفين يوجد دائمًا عدد نسبي آخر، ولذلك يوجد بينهما عدد لا نهائي منها.', 'Between two different rational numbers there is always another rational number, so there are infinitely many between them.')
            }
        ],
        vocabulary: [
            say('erdiko puntua', 'punto medio', 'نقطة المنتصف', 'midpoint'),
            say('anplifikatu', 'amplificar', 'وسّع', 'amplify'),
            say('izendatzaile bera', 'mismo denominador', 'المقام نفسه', 'same denominator')
        ],
        explanation: say(
            'Bi zatiki desberdinen artean beti dago beste zatiki bat. Bi modu erraz daude hura aurkitzeko. Prozesua amaigabe errepika daitekeenez, bi zatikiren artean infinitu zatiki daude.',
            'Entre dos fracciones distintas siempre hay otra fracción. Hay dos formas fáciles de encontrarla. Como el proceso se puede repetir sin fin, entre dos fracciones hay infinitas fracciones.',
            'بين كسرين مختلفين يوجد دائمًا كسر آخر، وهناك طريقتان سهلتان لإيجاده. ولأن العملية تتكرر بلا نهاية، يوجد بين كسرين عدد لا نهائي من الكسور.',
            'Between two different fractions there is always another fraction. There are two easy ways to find it. As the process can be repeated endlessly, there are infinitely many fractions between two fractions.'
        ),
        cases: [
            {
                title: say('Erdiko puntua', 'El punto medio', 'نقطة المنتصف', 'The midpoint'),
                text: say('Batu biak eta zatitu 2 zenbakiaz.', 'Suma las dos y divide entre 2.', 'اجمع الكسرين واقسم على 2.', 'Add the two and divide by 2.'),
                math: same('$\\frac{1}{2}\\left(\\frac{1}{2}+\\frac{3}{4}\\right)=\\frac{5}{8}$')
            },
            {
                title: say('Anplifikatu', 'Amplificar', 'التوسيع', 'Amplify'),
                text: say('Izendatzaile bera izanik tartean zenbakitzailerik ez badago, biderkatu bi gaiak 10 zenbakiaz.', 'Con el mismo denominador, si no cabe ningún numerador en medio, multiplica los dos términos por 10.', 'مع المقام نفسه، إذا لم يكن بينهما أي بسط فاضرب الحدين في 10.', 'With the same denominator, if no numerator fits in between, multiply both terms by 10.'),
                math: same('$\\frac{2}{5}=\\frac{20}{50}\\qquad\\frac{3}{5}=\\frac{30}{50}\\ \\to\\ \\frac{21}{50}$')
            }
        ],
        examplePrompt: say('Aurkitu $\\frac{2}{9}$ eta $\\frac{1}{3}$ arteko zatiki bat.', 'Encuentra una fracción entre $\\frac{2}{9}$ y $\\frac{1}{3}$.', 'جد كسرًا بين $\\frac{2}{9}$ و$\\frac{1}{3}$.', 'Find a fraction between $\\frac{2}{9}$ and $\\frac{1}{3}$.'),
        example: same('$\\frac{1}{2}\\left(\\frac{2}{9}+\\frac{3}{9}\\right)=\\frac{5}{18}$'),
        exampleAnswer: say('$\\frac{5}{18}$: $\\frac{4}{18}$ eta $\\frac{6}{18}$ zatikien erdian dago.', '$\\frac{5}{18}$: está justo en medio de $\\frac{4}{18}$ y $\\frac{6}{18}$.', '$\\frac{5}{18}$: يقع في المنتصف تمامًا بين $\\frac{4}{18}$ و$\\frac{6}{18}$.', '$\\frac{5}{18}$: it is right in the middle of $\\frac{4}{18}$ and $\\frac{6}{18}$.')
    },

    /* ---------- 3. Operations ---------- */
    'add-sub': {
        vocabulary: [
            say('izendatzaile komuna', 'común denominador', 'مقام مشترك', 'common denominator'),
            say('zenbakitzailea', 'numerador', 'البسط', 'numerator'),
            say('sinplifikatu', 'simplificar', 'بسّط', 'simplify')
        ],
        explanation: say(
            'Izendatzaile bera badute, batu edo kendu zenbakitzaileak eta utzi izendatzailea. Bestela, eraman izendatzaile komunera (m.k.t.): $\\frac{1}{2}+\\frac{1}{3}=\\frac{3}{6}+\\frac{2}{6}=\\frac{5}{6}$. Zenbaki oso bat 1 izendatzailearekin idazten da, eta zeinuak osoetan bezala doaz. Amaitzeko, sinplifikatu.',
            'Con el mismo denominador, se suman o restan los numeradores y se deja el denominador. Si no, se pasan a común denominador (el m.c.m.): $\\frac{1}{2}+\\frac{1}{3}=\\frac{3}{6}+\\frac{2}{6}=\\frac{5}{6}$. Un entero se escribe con denominador 1, y los signos van como en los enteros. Al final, simplifica.',
            'إذا كان المقام واحدًا نجمع البسوط أو نطرحها ونترك المقام. وإلا ننقلها إلى مقام مشترك (المضاعف المشترك الأصغر): $\\frac{1}{2}+\\frac{1}{3}=\\frac{3}{6}+\\frac{2}{6}=\\frac{5}{6}$. ويُكتب العدد الصحيح بالمقام 1، والإشارات كما في الأعداد الصحيحة. وفي النهاية بسّط.',
            'With the same denominator, add or subtract the numerators and keep the denominator. If not, give them a common denominator (the LCM): $\\frac{1}{2}+\\frac{1}{3}=\\frac{3}{6}+\\frac{2}{6}=\\frac{5}{6}$. An integer is written with denominator 1, and the signs work as with integers. At the end, simplify.'
        ),
        examplePrompt: say('Kalkulatu $2-\\frac{3}{4}-\\frac{5}{6}$.', 'Calcula $2-\\frac{3}{4}-\\frac{5}{6}$.', 'احسب $2-\\frac{3}{4}-\\frac{5}{6}$.', 'Work out $2-\\frac{3}{4}-\\frac{5}{6}$.'),
        example: same('$2-\\frac{3}{4}-\\frac{5}{6}=\\frac{24-9-10}{12}=\\frac{5}{12}$'),
        exampleAnswer: say('$\\frac{5}{12}$, eta laburtezina da jada.', '$\\frac{5}{12}$, que ya es irreducible.', '$\\frac{5}{12}$، وهو غير قابل للاختزال.', '$\\frac{5}{12}$, which is already in its simplest form.')
    },
    'mul-div': {
        definitions: [
            {
                term: say('Zatiki baten alderantzizkoa', 'Inversa de una fracción', 'مقلوب الكسر', 'Reciprocal of a fraction'),
                meaning: say('Gaiak lekuz aldatuta dituen zatikia: $\\frac{c}{d}$ zatikiaren alderantzizkoa $\\frac{d}{c}$ da. Bien biderkadura 1 da.', 'La fracción con los términos cambiados de lugar: la inversa de $\\frac{c}{d}$ es $\\frac{d}{c}$. Su producto es 1.', 'الكسر الذي تبادل حداه مكانيهما: مقلوب $\\frac{c}{d}$ هو $\\frac{d}{c}$، وحاصل ضربهما 1.', 'The fraction with its terms swapped: the reciprocal of $\\frac{c}{d}$ is $\\frac{d}{c}$. Their product is 1.')
            }
        ],
        vocabulary: [
            say('biderkatu', 'multiplicar', 'الضرب', 'multiply'),
            say('zatitu', 'dividir', 'القسمة', 'divide'),
            say('zeinuak', 'signos', 'الإشارات', 'signs')
        ],
        explanation: say(
            'Biderkatzeko, zenbakitzaileak elkarren artean eta izendatzaileak elkarren artean: $\\frac{2}{3}\\cdot\\frac{3}{4}=\\frac{6}{12}$. Zatitzeko, biderkatu bigarrenaren alderantzizkoaz: $\\frac{a}{b}\\div\\frac{c}{d}=\\frac{a\\cdot d}{b\\cdot c}$. Zeinuak osoetan bezala. Sinplifikatu biderkatu aurretik: zenbakiak txikiagoak geratzen dira.',
            'Para multiplicar, numeradores entre sí y denominadores entre sí: $\\frac{2}{3}\\cdot\\frac{3}{4}=\\frac{6}{12}$. Para dividir, multiplica por la inversa de la segunda: $\\frac{a}{b}\\div\\frac{c}{d}=\\frac{a\\cdot d}{b\\cdot c}$. Los signos, como en los enteros. Simplifica antes de multiplicar: los números quedan más pequeños.',
            'للضرب نضرب البسطين معًا والمقامين معًا: $\\frac{2}{3}\\cdot\\frac{3}{4}=\\frac{6}{12}$. وللقسمة نضرب في مقلوب الكسر الثاني: $\\frac{a}{b}\\div\\frac{c}{d}=\\frac{a\\cdot d}{b\\cdot c}$. والإشارات كما في الأعداد الصحيحة. اختزل قبل الضرب لتبقى الأعداد أصغر.',
            'To multiply, multiply the numerators together and the denominators together: $\\frac{2}{3}\\cdot\\frac{3}{4}=\\frac{6}{12}$. To divide, multiply by the reciprocal of the second: $\\frac{a}{b}\\div\\frac{c}{d}=\\frac{a\\cdot d}{b\\cdot c}$. Signs work as with integers. Simplify before multiplying: the numbers stay smaller.'
        ),
        examplePrompt: say('Kalkulatu $\\left(-\\frac{6}{7}\\right)\\div\\frac{9}{14}$.', 'Calcula $\\left(-\\frac{6}{7}\\right)\\div\\frac{9}{14}$.', 'احسب $\\left(-\\frac{6}{7}\\right)\\div\\frac{9}{14}$.', 'Work out $\\left(-\\frac{6}{7}\\right)\\div\\frac{9}{14}$.'),
        example: same('$-\\frac{6}{7}\\cdot\\frac{14}{9}=-\\frac{6\\cdot 14}{7\\cdot 9}=-\\frac{4}{3}$'),
        exampleAnswer: say('$-\\frac{4}{3}$: zeinu desberdinak, emaitza negatiboa.', '$-\\frac{4}{3}$: signos distintos, resultado negativo.', '$-\\frac{4}{3}$: إشارتان مختلفتان، فالنتيجة سالبة.', '$-\\frac{4}{3}$: different signs, so the result is negative.'),
        why: {
            text: say(
                '$2\\div\\frac{1}{3}$ eragiketak galdetzen du zenbat heren sartzen diren 2 zenbakian. Unitate bakoitzean 3 heren sartzen dira; beraz, 2 zenbakian 6. Hori $2\\cdot 3$ da: alderantzizkoaz biderkatzea.',
                '$2\\div\\frac{1}{3}$ pregunta cuántos tercios caben en 2. En cada unidad caben 3 tercios, así que en 2 caben 6. Eso es $2\\cdot 3$: multiplicar por la inversa.',
                '$2\\div\\frac{1}{3}$ تسأل: كم ثلثًا يتسع في 2؟ في كل وحدة يتسع 3 أثلاث، إذن في 2 يتسع 6. وهذا هو $2\\cdot 3$: الضرب في المقلوب.',
                '$2\\div\\frac{1}{3}$ asks how many thirds fit into 2. Each unit holds 3 thirds, so 2 holds 6. That is $2\\cdot 3$: multiplying by the reciprocal.'
            ),
            math: same('$2\\div\\frac{1}{3}=2\\cdot 3=6$')
        }
    },
    combined: {
        vocabulary: [
            say('parentesiak', 'paréntesis', 'الأقواس', 'brackets'),
            say('hierarkia', 'jerarquía', 'الأولويات', 'order of operations'),
            say('emaitza', 'resultado', 'النتيجة', 'result')
        ],
        explanation: say(
            'Ordena hau da: lehenik parentesiak (barrutik kanpora), gero biderketak eta zatiketak, eta azkenik batuketak eta kenketak; maila berekoak, ezkerretik eskuinera. Parentesiek emaitza aldatzen dute: $\\frac{3}{2}-\\frac{4}{5}\\cdot\\frac{5}{6}=\\frac{5}{6}$, baina $\\left(\\frac{3}{2}-\\frac{4}{5}\\right)\\cdot\\frac{5}{6}=\\frac{7}{12}$.',
            'El orden es: primero los paréntesis (de dentro hacia fuera), después multiplicaciones y divisiones y, por último, sumas y restas; las del mismo nivel, de izquierda a derecha. Los paréntesis cambian el resultado: $\\frac{3}{2}-\\frac{4}{5}\\cdot\\frac{5}{6}=\\frac{5}{6}$, pero $\\left(\\frac{3}{2}-\\frac{4}{5}\\right)\\cdot\\frac{5}{6}=\\frac{7}{12}$.',
            'الترتيب هو: الأقواس أولًا (من الداخل إلى الخارج)، ثم الضرب والقسمة، وأخيرًا الجمع والطرح؛ وما كان من المستوى نفسه من اليسار إلى اليمين. والأقواس تغيّر النتيجة: $\\frac{3}{2}-\\frac{4}{5}\\cdot\\frac{5}{6}=\\frac{5}{6}$ لكن $\\left(\\frac{3}{2}-\\frac{4}{5}\\right)\\cdot\\frac{5}{6}=\\frac{7}{12}$.',
            'The order is: first brackets (from the inside out), then multiplications and divisions and, last, additions and subtractions; those at the same level, from left to right. Brackets change the result: $\\frac{3}{2}-\\frac{4}{5}\\cdot\\frac{5}{6}=\\frac{5}{6}$, but $\\left(\\frac{3}{2}-\\frac{4}{5}\\right)\\cdot\\frac{5}{6}=\\frac{7}{12}$.'
        ),
        examplePrompt: say('Kalkulatu $\\frac{1}{2}+\\frac{3}{4}\\div\\left(1-\\frac{5}{8}\\right)$.', 'Calcula $\\frac{1}{2}+\\frac{3}{4}\\div\\left(1-\\frac{5}{8}\\right)$.', 'احسب $\\frac{1}{2}+\\frac{3}{4}\\div\\left(1-\\frac{5}{8}\\right)$.', 'Work out $\\frac{1}{2}+\\frac{3}{4}\\div\\left(1-\\frac{5}{8}\\right)$.'),
        example: same('$\\frac{1}{2}+\\frac{3}{4}\\div\\frac{3}{8}=\\frac{1}{2}+2=\\frac{5}{2}$'),
        exampleAnswer: say('$\\frac{5}{2}$: lehenik parentesia, gero zatiketa eta azkenik batuketa.', '$\\frac{5}{2}$: primero el paréntesis, después la división y al final la suma.', '$\\frac{5}{2}$: القوس أولًا، ثم القسمة، وأخيرًا الجمع.', '$\\frac{5}{2}$: first the brackets, then the division and finally the addition.')
    },

    /* ---------- 4. Decimals and the generating fraction ---------- */
    'decimal-kinds': {
        definitions: [
            {
                term: say('Periodoa', 'Periodo', 'الدور', 'Repeating part'),
                meaning: say('Amaigabe errepikatzen den zifra edo zifra taldea: $0{,}\\overline{3}$ zenbakian, 3.', 'La cifra o grupo de cifras decimales que se repite sin fin: en $0{,}\\overline{3}$, el 3.', 'الرقم أو مجموعة الأرقام العشرية التي تتكرر بلا نهاية: في $0{,}\\overline{3}$ هو 3.', 'The digit or group of decimal digits that repeats forever: in $0{,}\\overline{3}$, the 3.')
            },
            {
                term: say('Aurreperiodoa', 'Anteperiodo', 'الجزء غير الدوري', 'Non-repeating part'),
                meaning: say('Komaren ondoren periodoaren aurretik dauden zifrak: $2{,}1\\overline{6}$ zenbakian, 1.', 'Las cifras decimales que van antes del periodo: en $2{,}1\\overline{6}$, el 1.', 'الأرقام العشرية التي تسبق الدور: في $2{,}1\\overline{6}$ هو 1.', 'The decimal digits that come before the repeating part: in $2{,}1\\overline{6}$, the 1.')
            }
        ],
        vocabulary: [
            say('hamartar zehatza', 'decimal exacto', 'عشري منتهٍ', 'terminating decimal'),
            say('periodiko hutsa', 'periódico puro', 'دوري بحت', 'pure recurring'),
            say('periodiko mistoa', 'periódico mixto', 'دوري مختلط', 'mixed recurring')
        ],
        explanation: say(
            'Zenbakitzailea izendatzaileaz zatitzean, hamartar zehatza, periodiko hutsa edo periodiko mistoa ateratzen da. Zatitu gabe ere jakin daiteke: sinplifikatu eta deskonposatu izendatzailea. Guztiak dira arrazionalak; periodorik gabeko infinitu zifra dituen hamartar bat, ez.',
            'Al dividir el numerador entre el denominador sale un decimal exacto, periódico puro o periódico mixto. Se sabe sin dividir: simplifica y descompón el denominador. Todos son racionales; un decimal con infinitas cifras sin periodo, no.',
            'عند قسمة البسط على المقام ينتج عشري منتهٍ أو دوري بحت أو دوري مختلط. ويمكن معرفة ذلك دون قسمة: اختزل الكسر وحلّل المقام. وكلها أعداد نسبية؛ أما العشري ذو الأرقام اللانهائية بلا دور فليس كذلك.',
            'Dividing the numerator by the denominator gives a terminating, pure recurring or mixed recurring decimal. You can tell without dividing: simplify and factorise the denominator. All of them are rational; a decimal with infinitely many digits and no repeating part is not.'
        ),
        cases: [
            {
                title: say('Zehatza', 'Exacto', 'منتهٍ', 'Terminating'),
                text: say('Izendatzaileak 2 eta 5 bakarrik ditu.', 'El denominador solo tiene 2 y 5.', 'في المقام 2 و5 فقط.', 'The denominator has only 2s and 5s.'),
                math: same('$\\frac{7}{4}=1{,}75$')
            },
            {
                title: say('Periodiko hutsa', 'Periódico puro', 'دوري بحت', 'Pure recurring'),
                text: say('Ez du ez 2 ez 5.', 'No tiene ni 2 ni 5.', 'ليس فيه 2 ولا 5.', 'It has neither 2 nor 5.'),
                math: same('$\\frac{5}{3}=1{,}\\overline{6}$')
            },
            {
                title: say('Periodiko mistoa', 'Periódico mixto', 'دوري مختلط', 'Mixed recurring'),
                text: say('2 edo 5 ditu, eta beste faktore bat.', 'Tiene 2 o 5 y otro factor.', 'فيه 2 أو 5 وعامل آخر.', 'It has a 2 or a 5 and another factor.'),
                math: same('$\\frac{1}{6}=0{,}1\\overline{6}$')
            }
        ],
        examplePrompt: say('Zatitu gabe, zer hamartar ematen du $\\frac{21}{60}$ zatikiak?', 'Sin dividir, ¿qué decimal da $\\frac{21}{60}$?', 'دون قسمة، أي عشري يعطي $\\frac{21}{60}$؟', 'Without dividing, what kind of decimal does $\\frac{21}{60}$ give?'),
        example: same('$\\frac{21}{60}=\\frac{7}{20}=\\frac{7}{2^{2}\\cdot 5}=0{,}35$'),
        exampleAnswer: say('Zehatza: sinplifikatu ondoren, izendatzaileak 2 eta 5 bakarrik ditu.', 'Exacto: al simplificar, el denominador solo tiene 2 y 5.', 'منتهٍ: بعد الاختزال لا يبقى في المقام إلا 2 و5.', 'Terminating: once simplified, the denominator has only 2s and 5s.'),
        why: {
            text: say(
                '$10=2\\cdot 5$ delako. Izendatzaileak 2 eta 5 bakarrik baditu, zatikia 10, 100, 1000… izendatzailera anplifika daiteke, eta zatiketa amaitu egiten da.',
                'Porque $10=2\\cdot 5$. Si el denominador solo tiene 2 y 5, la fracción se puede amplificar hasta un denominador 10, 100, 1000…, y la división termina.',
                'لأن $10=2\\cdot 5$. إذا لم يكن في المقام إلا 2 و5 أمكن توسيع الكسر حتى يصير مقامه 10 أو 100 أو 1000…، فتنتهي القسمة.',
                'Because $10=2\\cdot 5$. If the denominator has only 2s and 5s, the fraction can be amplified up to a denominator of 10, 100, 1,000…, and the division ends.'
            ),
            math: same('$\\frac{3}{8}=\\frac{3\\cdot 125}{8\\cdot 125}=\\frac{375}{1000}=0{,}375$')
        }
    },
    'exact-generatrix': {
        definitions: [
            {
                term: say('Zatiki sortzailea', 'Fracción generatriz', 'الكسر المولّد', 'Generating fraction'),
                meaning: say('Zatitzean hamartar jakin bat ematen duen zatiki laburtezina.', 'La fracción irreducible que, al dividir, da un número decimal.', 'الكسر غير القابل للاختزال الذي يعطي عددًا عشريًا عند القسمة.', 'The fraction in simplest form that gives a decimal number when you divide.')
            }
        ],
        vocabulary: [
            say('koma', 'coma', 'الفاصلة', 'decimal point'),
            say('zeroak', 'ceros', 'أصفار', 'zeros'),
            say('hamartarra', 'decimal', 'منزلة عشرية', 'decimal place')
        ],
        explanation: say(
            'Hamartar zehatz baten zatiki sortzaileak komarik gabeko zenbakia du zenbakitzailean, eta 1 bat hamartar adina zerorekin izendatzailean: $0{,}245=\\frac{245}{1000}=\\frac{49}{200}$. Gero, sinplifikatu. Ezkerreko zeroak ez dira goian idazten, baina hamartar gisa zenbatzen dira.',
            'La fracción generatriz de un decimal exacto tiene como numerador el número sin coma y como denominador un 1 con tantos ceros como decimales: $0{,}245=\\frac{245}{1000}=\\frac{49}{200}$. Después, simplifica. Los ceros de la izquierda no se escriben arriba, pero cuentan como decimales.',
            'الكسر المولّد لعشري منتهٍ بسطه العدد دون فاصلة، ومقامه 1 تتبعه أصفار بعدد المنازل العشرية: $0{,}245=\\frac{245}{1000}=\\frac{49}{200}$. ثم بسّط. والأصفار على اليسار لا تُكتب في البسط، لكنها تُعدّ منازل عشرية.',
            'The generating fraction of a terminating decimal has the number without the decimal point as its numerator and a 1 with as many zeros as decimal places as its denominator: $0{,}245=\\frac{245}{1000}=\\frac{49}{200}$. Then simplify. Leading zeros are not written on top, but they count as decimal places.'
        ),
        examplePrompt: say('Idatzi $0{,}0024$ zatiki laburtezin gisa.', 'Escribe $0{,}0024$ como fracción irreducible.', 'اكتب $0{,}0024$ كسرًا غير قابل للاختزال.', 'Write $0{,}0024$ as a fraction in simplest form.'),
        example: same('$0{,}0024=\\frac{24}{10\\,000}=\\frac{3}{1250}$'),
        exampleAnswer: say('$\\frac{3}{1250}$: lau hamartar, lau zero.', '$\\frac{3}{1250}$: cuatro decimales, cuatro ceros.', '$\\frac{3}{1250}$: أربع منازل عشرية، أربعة أصفار.', '$\\frac{3}{1250}$: four decimal places, four zeros.')
    },
    'periodic-generatrix': {
        vocabulary: [
            say('periodoa', 'periodo', 'الدور', 'repeating part'),
            say('aurreperiodoa', 'anteperiodo', 'الجزء غير الدوري', 'non-repeating part'),
            say('bederatziak', 'nueves', 'تسعات', 'nines')
        ],
        explanation: say(
            'Zenbakitzailea: zenbaki osoa, koma eta periodoaren marka gabe, ken periodoaren aurreko zatia. Izendatzailea: 9 bat periodoko zifra bakoitzeko eta 0 bat aurreperiodoko zifra bakoitzeko. Amaitzeko, sinplifikatu.',
            'Numerador: todo el número, sin coma ni marca de periodo, menos la parte anterior al periodo. Denominador: un 9 por cada cifra del periodo y un 0 por cada cifra del anteperiodo. Al final, simplifica.',
            'البسط: العدد كله دون فاصلة ولا علامة دور، ناقص الجزء الذي قبل الدور. والمقام: 9 لكل رقم في الدور، و0 لكل رقم في الجزء غير الدوري. وفي النهاية بسّط.',
            'Numerator: the whole number, without the decimal point or the bar, minus the part before the repeating part. Denominator: a 9 for each digit of the repeating part and a 0 for each digit of the non-repeating part. At the end, simplify.'
        ),
        cases: [
            {
                title: say('Periodiko hutsa', 'Periódico puro', 'دوري بحت', 'Pure recurring'),
                text: say('Aurreperiodorik ez: bederatziak bakarrik.', 'Sin anteperiodo: solo nueves.', 'دون جزء غير دوري: تسعات فقط.', 'No non-repeating part: only nines.'),
                math: same('$0{,}\\overline{27}=\\frac{27}{99}=\\frac{3}{11}$')
            },
            {
                title: say('Periodiko mistoa', 'Periódico mixto', 'دوري مختلط', 'Mixed recurring'),
                text: say('Aurreperiodoarekin: bederatziak eta gero zeroak.', 'Con anteperiodo: nueves y después ceros.', 'مع جزء غير دوري: تسعات ثم أصفار.', 'With a non-repeating part: nines and then zeros.'),
                math: same('$1{,}8\\overline{3}=\\frac{183-18}{90}=\\frac{11}{6}$')
            }
        ],
        examplePrompt: say('Idatzi $2{,}\\overline{6}$ zatiki gisa.', 'Escribe $2{,}\\overline{6}$ como fracción.', 'اكتب $2{,}\\overline{6}$ كسرًا.', 'Write $2{,}\\overline{6}$ as a fraction.'),
        example: same('$2{,}\\overline{6}=\\frac{26-2}{9}=\\frac{24}{9}=\\frac{8}{3}$'),
        exampleAnswer: say('$\\frac{8}{3}$: periodoak zifra bat du eta ez dago aurreperiodorik.', '$\\frac{8}{3}$: el periodo tiene una cifra y no hay anteperiodo.', '$\\frac{8}{3}$: في الدور رقم واحد ولا يوجد جزء غير دوري.', '$\\frac{8}{3}$: the repeating part has one digit and there is no non-repeating part.'),
        why: {
            text: say(
                '$x=0{,}\\overline{3}$ bada, $10x=3{,}\\overline{3}$ da. Bat besteari kentzean periodoa desagertu egiten da: $9x=3$, eta $x=\\frac{3}{9}$. Horregatik agertzen dira bederatziak.',
                'Si $x=0{,}\\overline{3}$, entonces $10x=3{,}\\overline{3}$. Al restarlos, el periodo desaparece: $9x=3$, así que $x=\\frac{3}{9}$. Por eso salen los nueves.',
                'إذا كان $x=0{,}\\overline{3}$ فإن $10x=3{,}\\overline{3}$. وعند طرح أحدهما من الآخر يختفي الدور: $9x=3$، إذن $x=\\frac{3}{9}$. لذلك تظهر التسعات.',
                'If $x=0{,}\\overline{3}$, then $10x=3{,}\\overline{3}$. Subtracting one from the other, the repeating part disappears: $9x=3$, so $x=\\frac{3}{9}$. That is where the nines come from.'
            ),
            math: same('$10x-x=3{,}\\overline{3}-0{,}\\overline{3}=3\\ \\to\\ x=\\frac{3}{9}=\\frac{1}{3}$')
        }
    },

    /* ---------- 5. Problems ---------- */
    'fraction-of': {
        vocabulary: [
            say('kantitatea', 'cantidad', 'كمية', 'quantity'),
            say('biderkadura', 'producto', 'حاصل ضرب', 'product'),
            say('izendatzailea', 'denominador', 'المقام', 'denominator')
        ],
        explanation: say(
            'Kantitate baten $\\frac{a}{b}$ kalkulatzeko, zatitu $b$ zenbakiaz eta biderkatu $a$ zenbakiaz: 120 zenbakiaren $\\frac{3}{8}$ hau da: $120\\div 8\\cdot 3=45$. Zatiki baten zatikia biderkadura bat da: $\\frac{3}{4}$ hartzea $\\frac{2}{3}$ zatikitik $\\frac{3}{4}\\cdot\\frac{2}{3}=\\frac{1}{2}$ da.',
            'Para calcular $\\frac{a}{b}$ de una cantidad, divide entre $b$ y multiplica por $a$: $\\frac{3}{8}$ de 120 es $120\\div 8\\cdot 3=45$. La fracción de una fracción es un producto: $\\frac{3}{4}$ de $\\frac{2}{3}$ es $\\frac{3}{4}\\cdot\\frac{2}{3}=\\frac{1}{2}$.',
            'لحساب $\\frac{a}{b}$ من كمية اقسم على $b$ واضرب في $a$: $\\frac{3}{8}$ من 120 هو $120\\div 8\\cdot 3=45$. وكسر من كسر حاصل ضرب: $\\frac{3}{4}$ من $\\frac{2}{3}$ هو $\\frac{3}{4}\\cdot\\frac{2}{3}=\\frac{1}{2}$.',
            'To work out $\\frac{a}{b}$ of a quantity, divide by $b$ and multiply by $a$: $\\frac{3}{8}$ of 120 is $120\\div 8\\cdot 3=45$. A fraction of a fraction is a product: $\\frac{3}{4}$ of $\\frac{2}{3}$ is $\\frac{3}{4}\\cdot\\frac{2}{3}=\\frac{1}{2}$.'
        ),
        examplePrompt: say('450 L-ko depositu baten $\\frac{2}{3}$ beteta dago, eta ur horren $\\frac{1}{5}$ gastatzen da. Zenbat litro gastatzen dira?', 'Un depósito de 450 L está lleno en sus $\\frac{2}{3}$, y se gasta $\\frac{1}{5}$ de ese agua. ¿Cuántos litros se gastan?', 'خزان سعته 450 لترًا ممتلئ حتى $\\frac{2}{3}$ منه، ويُستهلك $\\frac{1}{5}$ من هذا الماء. كم لترًا يُستهلك؟', 'A 450 L tank is $\\frac{2}{3}$ full, and $\\frac{1}{5}$ of that water is used. How many litres are used?'),
        example: same('$\\frac{1}{5}\\cdot\\frac{2}{3}\\cdot 450=\\frac{2}{15}\\cdot 450=60$'),
        exampleAnswer: say('60 L gastatzen dira, depositu osoaren $\\frac{2}{15}$.', 'Se gastan 60 L, los $\\frac{2}{15}$ del depósito.', 'يُستهلك 60 لترًا، أي $\\frac{2}{15}$ من الخزان.', '60 L are used, $\\frac{2}{15}$ of the tank.')
    },
    remaining: {
        vocabulary: [
            say('gainerakoa', 'lo que queda', 'الباقي', 'what is left'),
            say('osoa', 'total', 'الكل', 'total'),
            say('zatikia', 'fracción', 'الكسر', 'fraction')
        ],
        explanation: say(
            'Zatiki bat «gainerakoarena» denean, geratzen denaren gainean kalkulatzen da, ez osoaren gainean. $\\frac{3}{8}$ jaten bada, $\\frac{5}{8}$ geratzen da; eta gainerakoaren $\\frac{2}{5}$ osoaren $\\frac{2}{5}\\cdot\\frac{5}{8}=\\frac{1}{4}$ da. Azkenean $1-\\frac{3}{8}-\\frac{1}{4}=\\frac{3}{8}$ geratzen da.',
            'Cuando una fracción es «de lo que queda», se calcula sobre lo que queda, no sobre el total. Si se come $\\frac{3}{8}$, queda $\\frac{5}{8}$; y $\\frac{2}{5}$ de lo que queda es $\\frac{2}{5}\\cdot\\frac{5}{8}=\\frac{1}{4}$ del total. Al final queda $1-\\frac{3}{8}-\\frac{1}{4}=\\frac{3}{8}$.',
            'إذا كان الكسر «من الباقي» فإنه يُحسب من الباقي لا من الكل. إذا أُكل $\\frac{3}{8}$ يبقى $\\frac{5}{8}$، و$\\frac{2}{5}$ من الباقي هو $\\frac{2}{5}\\cdot\\frac{5}{8}=\\frac{1}{4}$ من الكل. وفي النهاية يبقى $1-\\frac{3}{8}-\\frac{1}{4}=\\frac{3}{8}$.',
            'When a fraction is “of what is left”, it is worked out from what is left, not from the total. If $\\frac{3}{8}$ is eaten, $\\frac{5}{8}$ is left; and $\\frac{2}{5}$ of what is left is $\\frac{2}{5}\\cdot\\frac{5}{8}=\\frac{1}{4}$ of the total. In the end, $1-\\frac{3}{8}-\\frac{1}{4}=\\frac{3}{8}$ is left.'
        ),
        examplePrompt: say('60 kromotatik $\\frac{1}{4}$ oparitzen dira, eta gero geratzen direnen $\\frac{2}{3}$. Zenbat geratzen dira?', 'De 60 cromos se regala $\\frac{1}{4}$ y después $\\frac{2}{3}$ de los que quedan. ¿Cuántos quedan?', 'من 60 بطاقة يُهدى $\\frac{1}{4}$ ثم $\\frac{2}{3}$ مما بقي. كم بطاقة تبقى؟', 'Out of 60 stickers, $\\frac{1}{4}$ are given away and then $\\frac{2}{3}$ of those left. How many are left?'),
        example: same('$1-\\frac{1}{4}-\\frac{2}{3}\\cdot\\frac{3}{4}=\\frac{1}{4}\\ \\to\\ \\frac{1}{4}\\cdot 60=15$'),
        exampleAnswer: say('15 kromo geratzen dira, osoaren $\\frac{1}{4}$.', 'Quedan 15 cromos, $\\frac{1}{4}$ del total.', 'تبقى 15 بطاقة، أي $\\frac{1}{4}$ من الكل.', '15 stickers are left, $\\frac{1}{4}$ of the total.')
    },
    'whole-from-part': {
        vocabulary: [
            say('osoa', 'total', 'الكل', 'total'),
            say('zatia', 'parte', 'جزء', 'part'),
            say('kantitatea', 'cantidad', 'الكمية', 'quantity')
        ],
        explanation: say(
            'Osoaren $\\frac{a}{b}$ zenbat diren badakizu, zatitu kantitate hori $a$ zenbakiaz $\\frac{1}{b}$ lortzeko, eta biderkatu $b$ zenbakiaz. Bidaia baten $\\frac{3}{8}$ 45 km badira, $\\frac{1}{8}$ 15 km da eta bidaia osoa $15\\cdot 8=120$ km. Zatiki jarraituekin, kalkulatu lehenik ezagutzen den zatiaren zatikia.',
            'Si sabes cuánto son los $\\frac{a}{b}$ del total, divide esa cantidad entre $a$ para tener $\\frac{1}{b}$ y multiplica por $b$. Si los $\\frac{3}{8}$ de un viaje son 45 km, $\\frac{1}{8}$ son 15 km y el viaje entero, $15\\cdot 8=120$ km. Con fracciones sucesivas, halla antes la fracción conocida.',
            'إذا عرفت كم يساوي $\\frac{a}{b}$ من الكل فاقسم هذه الكمية على $a$ لتحصل على $\\frac{1}{b}$ ثم اضرب في $b$. إذا كان $\\frac{3}{8}$ من رحلة يساوي 45 كم فإن $\\frac{1}{8}$ يساوي 15 كم والرحلة كلها $15\\cdot 8=120$ كم. ومع الكسور المتتالية جد أولًا كسر الجزء المعروف.',
            'If you know how much $\\frac{a}{b}$ of the total is, divide that quantity by $a$ to get $\\frac{1}{b}$ and multiply by $b$. If $\\frac{3}{8}$ of a journey is 45 km, $\\frac{1}{8}$ is 15 km and the whole journey is $15\\cdot 8=120$ km. With successive fractions, first find the fraction of the part you know.'
        ),
        examplePrompt: say('Liburu baten $\\frac{5}{9}$ irakurri da eta 64 orrialde falta dira. Zenbat orrialde ditu liburuak?', 'Se han leído $\\frac{5}{9}$ de un libro y faltan 64 páginas. ¿Cuántas páginas tiene?', 'قُرئ $\\frac{5}{9}$ من كتاب وبقيت 64 صفحة. كم صفحة في الكتاب؟', '$\\frac{5}{9}$ of a book has been read and 64 pages are left. How many pages does it have?'),
        example: same('$1-\\frac{5}{9}=\\frac{4}{9}\\ \\to\\ 64\\div 4\\cdot 9=144$'),
        exampleAnswer: say('Liburuak 144 orrialde ditu.', 'El libro tiene 144 páginas.', 'في الكتاب 144 صفحة.', 'The book has 144 pages.')
    }
}
