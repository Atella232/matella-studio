import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import { notation } from '../dbh2-zatigarritasuna/notation.ts'
import type { DivisibilityIntroTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Zatigarritasuna · 1. DBH — what each lesson tells: the new words
   (definitions), the key words in four languages (vocabulary), a short
   explanation, the example as an exercise («Another example», or «Example»
   in the lessons of facts) and, in a few lessons, «Why does it work?».
   Plain data so the tests can import it; lessons.tsx merges it into the
   topics. Formulas use notation() (Zat, ZKH, MKT in Basque and Arabic; Div,
   m.c.d., m.c.m. in Spanish; Div, GCD, LCM in English), and in the words
   each language names them its own way. The explanation keeps the numbers
   that its drawing shows (18 pencils, jumps of 3 and of 2, the rectangles
   of 18, the swimming days of Ana and Eva, the buses). The example uses
   numbers of its own, never those of «Let's solve», of «Check it» or of the
   typical mistake. Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const divisibilityIntroLessonTexts: Record<DivisibilityIntroTopicId, LessonTexts> = {
    /* ---------- 1. Multiples and divisors ---------- */
    relation: {
        vocabulary: [
            say('hondarra', 'resto', 'الباقي', 'remainder'),
            say('zatiketa zehatza', 'división exacta', 'القسمة التامة', 'exact division'),
            say('zatigarria', 'divisible', 'يقبل القسمة', 'divisible')
        ],
        definitions: [
            {
                term: say('Multiploa', 'Múltiplo', 'المضاعف', 'Multiple'),
                meaning: say('$a$ zenbakia $b$ zenbakiaren multiploa da, $a\\mathbin{:}b$ zatiketa zehatza bada (hondarra 0).', '$a$ es múltiplo de $b$ si la división $a\\mathbin{:}b$ es exacta (resto 0).', '$a$ مضاعف لـ$b$ إذا كانت القسمة $a\\mathbin{:}b$ تامة (الباقي 0).', '$a$ is a multiple of $b$ if the division $a\\mathbin{:}b$ is exact (remainder 0).')
            },
            {
                term: say('Zatitzailea', 'Divisor', 'القاسم', 'Divisor'),
                meaning: say('$b$ zenbakia $a$ zenbakiaren zatitzailea da, hura zehazki zatitzen badu.', '$b$ es divisor de $a$ si lo divide de forma exacta.', '$b$ قاسم لـ$a$ إذا قسمه قسمة تامة.', '$b$ is a divisor of $a$ if it divides it exactly.')
            }
        ],
        explanation: say(
            '18 arkatz poltsa berdinetan gorde nahi ditugu, bat ere soberan utzi gabe. 3 poltsatan bai (6 bakoitzean), baina 4 poltsatan ez: 2 geratzen dira. Hondarra 0 bada, zatiketa zehatza da: 18 zenbakia 3 zenbakiaren multiploa da, eta 3 zenbakia 18 zenbakiaren zatitzailea.',
            'Queremos guardar 18 lápices en bolsas iguales, sin que sobre ninguno. En 3 bolsas se puede (6 en cada una), pero en 4 no: sobran 2. Si el resto es 0, la división es exacta: 18 es múltiplo de 3, y 3 es divisor de 18.',
            'نريد أن نضع 18 قلمًا في أكياس متساوية دون أن يبقى أي قلم. في 3 أكياس يمكن ذلك (6 في كل كيس)، أما في 4 فلا: يبقى 2. إذا كان الباقي 0 فالقسمة تامة: 18 مضاعف لـ3، و3 قاسم لـ18.',
            'We want to put 18 pencils into equal bags, with none left over. In 3 bags it works (6 in each), but in 4 it does not: 2 are left over. If the remainder is 0, the division is exact: 18 is a multiple of 3, and 3 is a divisor of 18.'
        ),
        examplePrompt: say('75 zenbakia 5 zenbakiaren multiploa da? Eta 7 zenbakiarena?', '¿Es 75 múltiplo de 5? ¿Y de 7?', 'هل 75 مضاعف لـ5؟ وهل هو مضاعف لـ7؟', 'Is 75 a multiple of 5? And of 7?'),
        example: same('$\\begin{gathered}75=5\\cdot 15\\\\75=7\\cdot 10+5\\end{gathered}$'),
        exampleAnswer: say('5 zenbakiarena bai (hondarra 0): 5 zenbakia 75 zenbakiaren zatitzailea da. 7 zenbakiarena ez (hondarra 5).', 'De 5 sí (resto 0): 5 es divisor de 75. De 7 no (resto 5).', 'لـ5 نعم (الباقي 0): فـ5 قاسم لـ75. ولـ7 لا (الباقي 5).', 'Of 5, yes (remainder 0): 5 is a divisor of 75. Of 7, no (remainder 5).')
    },
    multiples: {
        vocabulary: [
            say('infinituak', 'infinitos', 'غير منتهية', 'infinite'),
            say('zerrenda', 'lista', 'القائمة', 'list'),
            say('jauziak', 'saltos', 'القفزات', 'jumps')
        ],
        definitions: [
            {
                term: say('Zenbaki baten multiploak', 'Múltiplos de un número', 'مضاعفات عدد', 'Multiples of a number'),
                meaning: say('1, 2, 3… zenbakiekin biderkatuta ateratzen direnak. $\\mathrm{M}(a)$ idazten dira, eta infinituak dira.', 'Los que salen al multiplicarlo por 1, 2, 3… Se escriben $\\mathrm{M}(a)$ y son infinitos.', 'ما ينتج عن ضربه في 1، 2، 3… وتُكتب $\\mathrm{M}(a)$ وهي غير منتهية.', 'What you get by multiplying it by 1, 2, 3… They are written $\\mathrm{M}(a)$ and are infinite.')
            }
        ],
        explanation: say(
            'Denda batean tenis pilotak hiruko potoetan saltzen dituzte: 3, 6, 9, 12… pilota eros daitezke. Horiek 3 zenbakiaren multiploak dira, zuzeneko jauzi berdinak. Zerrenda ez da inoiz amaitzen. 0 ere multiploa da, baina zerrendak zenbakia beraren hasten dira.',
            'En una tienda venden pelotas de tenis en botes de 3: se pueden comprar 3, 6, 9, 12… pelotas. Son los múltiplos de 3, saltos iguales en la recta. La lista no se acaba nunca. El 0 también es múltiplo, pero las listas empiezan por el propio número.',
            'في متجر تُباع كرات التنس في علب من 3: يمكن شراء 3، 6، 9، 12… كرة. هذه مضاعفات 3، قفزات متساوية على المستقيم. والقائمة لا تنتهي أبدًا. والصفر مضاعف أيضًا، لكن القوائم تبدأ بالعدد نفسه.',
            'A shop sells tennis balls in tubes of 3: you can buy 3, 6, 9, 12… balls. Those are the multiples of 3, equal jumps on the line. The list never ends. 0 is a multiple too, but the lists start with the number itself.'
        ),
        examplePrompt: say('Idatzi 11 zenbakiaren lehen bost multiploak.', 'Escribe los cinco primeros múltiplos de 11.', 'اكتب المضاعفات الخمسة الأولى للعدد 11.', 'Write the first five multiples of 11.'),
        example: same('$\\mathrm{M}(11)=\\{11,22,33,44,55,\\dots\\}$'),
        exampleAnswer: say('11 zenbakia 1, 2, 3, 4 eta 5 zenbakiekin biderkatzen da; zerrendak ez du amaierarik.', 'Se multiplica 11 por 1, 2, 3, 4 y 5; la lista sigue sin fin.', 'نضرب 11 في 1، 2، 3، 4، 5؛ والقائمة تستمر بلا نهاية.', '11 is multiplied by 1, 2, 3, 4 and 5; the list goes on for ever.')
    },
    divisors: {
        vocabulary: [
            say('bikoteak', 'parejas', 'الأزواج', 'pairs'),
            say('laukizuzena', 'rectángulo', 'المستطيل', 'rectangle'),
            say('hondarra', 'resto', 'الباقي', 'remainder')
        ],
        definitions: [
            {
                term: say('Zenbaki baten zatitzaileak', 'Divisores de un número', 'قواسم عدد', 'Divisors of a number'),
                meaning: say('Zehazki zatitzen duten zenbakiak. $\\mathrm{Zat}(a)$ idazten dira, eta ez dira infinituak.', 'Los números que lo dividen de forma exacta. Se escriben $\\mathrm{Div}(a)$ y no son infinitos.', 'الأعداد التي تقسمه قسمة تامة. وتُكتب $\\mathrm{Zat}(a)$ وهي ليست غير منتهية.', 'The numbers that divide it exactly. They are written $\\mathrm{Div}(a)$ and are not infinite.')
            }
        ],
        explanation: say(
            'Zatitzaile guztiak aurkitzeko, zatitu 1, 2, 3… zenbakiekin, eta gorde hondarra 0 ematen dutenak. Bikoteka datoz: $18=2\\cdot 9$ denez, 2 eta 9 zenbakiak 18 zenbakiaren zatitzaileak dira, marrazkiko laukizuzenen aldeak bezala. Bikoteak errepikatzen direnean, amaitu duzu.',
            'Para encontrar todos los divisores, divide entre 1, 2, 3… y quédate con los de resto 0. Vienen por parejas: como $18=2\\cdot 9$, 2 y 9 son divisores de 18, como los lados de los rectángulos del dibujo. Cuando las parejas se repiten, has terminado.',
            'لإيجاد كل القواسم اقسم على 1، 2، 3… واحتفظ بالتي يكون باقيها 0. وهي تأتي أزواجًا: بما أن $18=2\\cdot 9$ فإن 2 و9 قاسمان لـ18، مثل أضلاع المستطيلات في الرسم. وحين تتكرر الأزواج تكون قد انتهيت.',
            'To find all the divisors, divide by 1, 2, 3… and keep the ones with remainder 0. They come in pairs: since $18=2\\cdot 9$, 2 and 9 are divisors of 18, like the sides of the rectangles in the drawing. When the pairs repeat, you have finished.'
        ),
        examplePrompt: say('Idatzi 30 zenbakiaren zatitzaile guztiak.', 'Escribe todos los divisores de 30.', 'اكتب كل قواسم 30.', 'Write all the divisors of 30.'),
        example: notation('$\\begin{gathered}30=1\\cdot 30=2\\cdot 15\\\\30=3\\cdot 10=5\\cdot 6\\\\@DIV(30)=\\{1,2,3,5,6,10,15,30\\}\\end{gathered}$'),
        exampleAnswer: say('Zortzi zatitzaile, lau bikotetan. 5 eta 6 zenbakien artean gurutzatzen dira: amaitu duzu.', 'Ocho divisores, en cuatro parejas. Entre 5 y 6 se cruzan: has terminado.', 'ثمانية قواسم في أربعة أزواج. وبين 5 و6 تتقاطع الأزواج: انتهيت.', 'Eight divisors, in four pairs. Between 5 and 6 they cross over: you have finished.'),
        why: {
            text: say(
                '2 zenbakiak 18 zatitzen badu, zatidurak, 9 zenbakiak, ere zatitzen du: $18=2\\cdot 9$ «9 zenbakiko 2 talde» edo «2 zenbakiko 9 talde» irakur daiteke. Horregatik zatitzaile bakoitzak bere bikotea dakar, eta nahikoa da gurutzatu arte probatzea.',
                'Si 2 divide a 18, el cociente, 9, también lo divide: $18=2\\cdot 9$ se puede leer como «2 grupos de 9» o «9 grupos de 2». Por eso cada divisor trae a su pareja, y basta con probar hasta que se crucen.',
                'إذا قسم 2 العدد 18 فإن خارج القسمة 9 يقسمه أيضًا: يمكن قراءة $18=2\\cdot 9$ «مجموعتان من 9» أو «9 مجموعات من 2». لذلك يأتي كل قاسم مع زوجه، ويكفي أن نجرّب حتى تتقاطع الأزواج.',
                'If 2 divides 18, the quotient, 9, divides it too: $18=2\\cdot 9$ can be read as «2 groups of 9» or «9 groups of 2». That is why each divisor brings its partner, and it is enough to try until they cross over.'
            ),
            math: same('$18=2\\cdot 9=9\\cdot 2$')
        }
    },

    /* ---------- 2. Divisibility rules ---------- */
    'criteria-digit': {
        vocabulary: [
            say('azken zifra', 'última cifra', 'الرقم الأخير', 'last digit'),
            say('bikoitiak', 'pares', 'الزوجية', 'even')
        ],
        definitions: [
            {
                term: say('Zatigarritasun-irizpidea', 'Criterio de divisibilidad', 'قاعدة قابلية القسمة', 'Divisibility rule'),
                meaning: say('Zatiketa egin gabe, zenbaki bat beste batekin zatigarria den jakiteko araua.', 'Una regla para saber, sin hacer la división, si un número es divisible por otro.', 'قاعدة لمعرفة هل يقبل عدد القسمة على آخر دون إجراء القسمة.', 'A rule for knowing, without dividing, whether a number is divisible by another.')
            }
        ],
        explanation: say(
            'Atleta batek biko jauziak egiten ditu: 2, 4, 6, 8, 10, 12… Azken zifra beti errepikatzen da (2, 4, 6, 8, 0). Horregatik, zenbaki bat 2, 5 edo 10 zenbakiekin zatigarria den jakiteko, nahikoa da azken zifrari begiratzea, zatitu gabe.',
            'Un atleta avanza a saltos de 2: 2, 4, 6, 8, 10, 12… La última cifra siempre se repite (2, 4, 6, 8, 0). Por eso, para saber si un número es divisible por 2, por 5 o por 10, basta mirar su última cifra, sin dividir.',
            'يتقدّم رياضي بقفزات من 2: 2، 4، 6، 8، 10، 12… والرقم الأخير يتكرر دائمًا (2، 4، 6، 8، 0). لذلك لمعرفة هل يقبل العدد القسمة على 2 أو 5 أو 10 يكفي النظر إلى رقمه الأخير دون قسمة.',
            'An athlete moves forward in jumps of 2: 2, 4, 6, 8, 10, 12… The last digit always repeats (2, 4, 6, 8, 0). That is why, to know whether a number is divisible by 2, by 5 or by 10, it is enough to look at its last digit, without dividing.'
        ),
        examplePrompt: say('$7350$ zenbakia zatigarria da 2, 5 eta 10 zenbakiekin?', '¿Es $7350$ divisible por 2, por 5 y por 10?', 'هل يقبل $7350$ القسمة على 2 و5 و10؟', 'Is $7350$ divisible by 2, by 5 and by 10?'),
        example: same('$7350\\ \\to\\ 2\\ \\checkmark\\quad 5\\ \\checkmark\\quad 10\\ \\checkmark$'),
        exampleAnswer: say('0 zifran amaitzen da: hiru zenbakiekin zatigarria da.', 'Acaba en 0: es divisible por los tres.', 'ينتهي بـ0: يقبل القسمة على الثلاثة.', 'It ends in 0: it is divisible by all three.')
    },
    'criteria-sum': {
        vocabulary: [
            say('zifren batura', 'suma de las cifras', 'مجموع الأرقام', 'sum of the digits'),
            say('multiploa', 'múltiplo', 'المضاعف', 'multiple')
        ],
        explanation: say(
            'Igel batek hiruko jauziak egiten ditu: 3, 6, 9, 12, 15, 18, 21… Azken zifra ez da errepikatzen, baina zifren batura beti da 3 zenbakiaren multiploa ($1+5=6$, $2+1=3$). 3 eta 9 zenbakientzat zifra guztiak batzen dira.',
            'Una rana salta de 3 en 3: 3, 6, 9, 12, 15, 18, 21… La última cifra no se repite, pero la suma de las cifras siempre es múltiplo de 3 ($1+5=6$, $2+1=3$). Para el 3 y el 9 se suman todas las cifras.',
            'يقفز ضفدع 3 في كل مرة: 3، 6، 9، 12، 15، 18، 21… الرقم الأخير لا يتكرر، لكن مجموع الأرقام مضاعف لـ3 دائمًا ($1+5=6$، $2+1=3$). وللعددين 3 و9 نجمع كل الأرقام.',
            'A frog jumps 3 at a time: 3, 6, 9, 12, 15, 18, 21… The last digit does not repeat, but the sum of the digits is always a multiple of 3 ($1+5=6$, $2+1=3$). For 3 and 9 you add up all the digits.'
        ),
        examplePrompt: say('$2754$ zenbakia zatigarria da 3 zenbakiarekin? Eta 9 zenbakiarekin?', '¿Es $2754$ divisible por 3? ¿Y por 9?', 'هل يقبل $2754$ القسمة على 3؟ وعلى 9؟', 'Is $2754$ divisible by 3? And by 9?'),
        example: same('$2+7+5+4=18\\ \\to\\ 3\\ \\checkmark\\quad 9\\ \\checkmark$'),
        exampleAnswer: say('18 zenbakia 9 zenbakiaren multiploa da (eta 3 zenbakiarena ere bai): $2754$ zatigarria da bi zenbakiekin.', '18 es múltiplo de 9 (y de 3): $2754$ es divisible por los dos.', '18 مضاعف لـ9 (ولـ3): إذن $2754$ يقبل القسمة على كليهما.', '18 is a multiple of 9 (and of 3): $2754$ is divisible by both.'),
        why: {
            text: say(
                'Hamarreko bakoitza $9+1$ da, eta ehuneko bakoitza $99+1$. Bederatziak kentzen badituzu, 9 zenbakiaren (eta 3 zenbakiaren) multiploak baitira jada, zifra bakoitzetik zifra bera bakarrik geratzen da: horregatik nahikoa da zifren batura begiratzea.',
                'Cada decena es $9+1$ y cada centena, $99+1$. Si quitas los nueves, que ya son múltiplos de 9 (y de 3), de cada cifra queda solo ella misma: por eso basta mirar la suma de las cifras.',
                'كل عشرة هي $9+1$، وكل مئة هي $99+1$. وإذا حذفت التسعات، وهي مضاعفات لـ9 (ولـ3)، يبقى من كل رقم الرقم نفسه فقط: لذلك يكفي النظر إلى مجموع الأرقام.',
                'Each ten is $9+1$ and each hundred is $99+1$. If you take away the nines, which are already multiples of 9 (and of 3), only the digit itself is left from each digit: that is why the sum of the digits is enough.'
            ),
            math: same('$54=5\\cdot 9+(5+4)$')
        }
    },

    /* ---------- 3. Primes and factorisation ---------- */
    primes: {
        vocabulary: [
            say('bahea', 'criba', 'الغربال', 'sieve'),
            say('ratatu', 'tachar', 'الشطب', 'cross out')
        ],
        definitions: [
            {
                term: say('Zenbaki lehena', 'Número primo', 'العدد الأولي', 'Prime number'),
                meaning: say('Bi zatitzaile bakarrik dituena: 1 eta bera.', 'El que tiene solo dos divisores: 1 y él mismo.', 'العدد الذي له قاسمان فقط: 1 والعدد نفسه.', 'One that has only two divisors: 1 and itself.')
            },
            {
                term: say('Zenbaki konposatua', 'Número compuesto', 'العدد المؤلف', 'Composite number'),
                meaning: say('Bi zatitzaile baino gehiago dituena.', 'El que tiene más de dos divisores.', 'العدد الذي له أكثر من قاسمين.', 'One that has more than two divisors.')
            }
        ],
        explanation: say(
            'Saskibaloi talde bateko 5 jokalariek 1 edo 5 laguneko talde berdinak bakarrik egin ditzakete: 5 lehena da. 8 libururekin 1, 2, 4 edo 8 liburuko taldeak egin daitezke: 8 konposatua da. 1 zenbakiak zatitzaile bakarra du: ez lehena ez konposatua.',
            'Los 5 jugadores de un equipo de baloncesto solo pueden hacer grupos iguales de 1 o de 5: el 5 es primo. Con 8 libros se pueden hacer grupos de 1, 2, 4 u 8: el 8 es compuesto. El 1 tiene un solo divisor: ni primo ni compuesto.',
            'لاعبو فريق كرة السلة الخمسة لا يستطيعون تكوين مجموعات متساوية إلا من 1 أو من 5: إذن 5 أولي. ومع 8 كتب يمكن تكوين مجموعات من 1 أو 2 أو 4 أو 8: إذن 8 مؤلف. أما 1 فله قاسم واحد: ليس أوليًا ولا مؤلفًا.',
            'The 5 players of a basketball team can only make equal groups of 1 or of 5: 5 is prime. With 8 books you can make groups of 1, 2, 4 or 8: 8 is composite. 1 has only one divisor: it is neither prime nor composite.'
        ),
        examplePrompt: say('91 zenbakia lehena da? Eta 97?', '¿Es primo 91? ¿Y 97?', 'هل 91 عدد أولي؟ وماذا عن 97؟', 'Is 91 prime? And 97?'),
        example: same('$91=7\\cdot 13$'),
        exampleAnswer: say('91 konposatua da: 7 eta 13 zatitzaileak ditu. 97 lehena da: ez 2 zenbakiak, ez 3 zenbakiak, ez 5 zenbakiak, ez 7 zenbakiak ez dute zatitzen.', '91 es compuesto: tiene los divisores 7 y 13. 97 es primo: no lo divide ni 2, ni 3, ni 5, ni 7.', '91 مؤلف: من قواسمه 7 و13. أما 97 فأولي: لا يقسمه 2 ولا 3 ولا 5 ولا 7.', '91 is composite: it has the divisors 7 and 13. 97 is prime: neither 2, 3, 5 nor 7 divides it.')
    },
    factorization: {
        vocabulary: [
            say('berreturak', 'potencias', 'القوى', 'powers'),
            say('zatidura', 'cociente', 'خارج القسمة', 'quotient'),
            say('deskonposatu', 'descomponer', 'التحليل', 'break down')
        ],
        definitions: [
            {
                term: say('Biderkagai lehenak', 'Factores primos', 'العوامل الأولية', 'Prime factors'),
                meaning: say('Elkarren artean biderkatuta zenbakia ematen duten zenbaki lehenak.', 'Los números primos que, multiplicados entre sí, dan el número.', 'الأعداد الأولية التي إذا ضُربت معًا أعطت العدد.', 'The prime numbers that, multiplied together, give the number.')
            }
        ],
        explanation: say(
            'Zenbaki konposatu oro lehenen biderkadura gisa idatz daiteke. Idatzi zenbakia marra baten ezkerrean, eta zatitu ahalik eta lehen txikienarekin (2, 3, 5, 7…). Idatzi zatidura azpian, eta jarraitu 1 lortu arte. Errepikatutako biderkagaiak berreturetan doaz.',
            'Todo número compuesto se puede escribir como producto de primos. Escribe el número a la izquierda de una raya y divide entre el menor primo posible (2, 3, 5, 7…). Escribe el cociente debajo y sigue hasta llegar a 1. Los factores repetidos van en potencias.',
            'كل عدد مؤلف يمكن كتابته حاصل ضرب أعداد أولية. اكتب العدد يسار خط، واقسمه على أصغر عدد أولي ممكن (2، 3، 5، 7…). اكتب خارج القسمة تحته وتابع حتى تصل إلى 1. والعوامل المتكررة تُكتب قوى.',
            'Every composite number can be written as a product of primes. Write the number to the left of a line and divide by the smallest prime you can (2, 3, 5, 7…). Write the quotient underneath and keep going until you reach 1. Repeated factors go in powers.'
        ),
        examplePrompt: say('Deskonposatu 120 biderkagai lehenetan.', 'Descompón 120 en factores primos.', 'حلّل 120 إلى عوامل أولية.', 'Break 120 down into prime factors.'),
        example: same('$120=2\\cdot 2\\cdot 2\\cdot 3\\cdot 5=2^{3}\\cdot 3\\cdot 5$'),
        exampleAnswer: say('Hiru aldiz zatitzen da 2 zenbakiaz (120, 60, 30 → 15), gero 3 zenbakiaz eta 5 zenbakiaz.', 'Se divide tres veces entre 2 (120, 60, 30 → 15), luego entre 3 y entre 5.', 'نقسم على 2 ثلاث مرات (120، 60، 30 ← 15)، ثم على 3 وعلى 5.', 'You divide by 2 three times (120, 60, 30 → 15), then by 3 and by 5.')
    },
    'divisor-table': {
        vocabulary: [
            say('taula', 'tabla', 'الجدول', 'table'),
            say('errenkada', 'fila', 'الصف', 'row')
        ],
        explanation: say(
            'Zenbaki handiekin, zatiketa asko behar dira zatitzaileak aurkitzeko. Laburragoa da deskonposatzea eta biderkagaiak taula batean konbinatzea: lehen errenkadan, 1 eta lehen zenbaki lehenaren berreturak; hurrengo errenkada bakoitza lehena da, bigarrenaren berretura batez biderkatuta.',
            'Con números grandes hacen falta muchas divisiones para encontrar los divisores. Es más corto descomponer y combinar los factores en una tabla: en la primera fila, el 1 y las potencias del primer primo; cada fila siguiente es la primera multiplicada por una potencia del segundo.',
            'مع الأعداد الكبيرة نحتاج إلى قسمات كثيرة لإيجاد القواسم. والأقصر أن نحلّل ونركّب العوامل في جدول: في الصف الأول 1 وقوى العدد الأولي الأول؛ وكل صف تالٍ هو الصف الأول مضروبًا في قوة للعدد الثاني.',
            'With large numbers you need lots of divisions to find the divisors. It is quicker to break the number down and combine the factors in a table: in the first row, 1 and the powers of the first prime; each next row is the first one multiplied by a power of the second.'
        ),
        examplePrompt: say('Aurkitu 50 zenbakiaren zatitzaileak taula batekin: $50=2\\cdot 5^{2}$.', 'Encuentra los divisores de 50 con una tabla: $50=2\\cdot 5^{2}$.', 'أوجد قواسم 50 بجدول: $50=2\\cdot 5^{2}$.', 'Find the divisors of 50 with a table: $50=2\\cdot 5^{2}$.'),
        example: notation('$\\begin{gathered}1\\quad 2\\\\5\\quad 10\\\\25\\quad 50\\\\@DIV(50)=\\{1,2,5,10,25,50\\}\\end{gathered}$'),
        exampleAnswer: say('Lehen errenkada: 1 eta 2. 5 zenbakiaz eta $5^{2}=25$ zenbakiaz biderkatuta, beste bi errenkadak: 6 zatitzaile.', 'Primera fila: 1 y 2. Por 5 y por $5^{2}=25$ salen las otras dos filas: 6 divisores.', 'الصف الأول: 1 و2. وبالضرب في 5 وفي $5^{2}=25$ نحصل على الصفين الآخرين: 6 قواسم.', 'First row: 1 and 2. Times 5 and times $5^{2}=25$ give the other two rows: 6 divisors.'),
        why: {
            text: say(
                '$36=2^{2}\\cdot 3^{2}$ zenbakiaren zatitzaile batek biko eta hiruko zenbakiak bakarrik izan ditzake: zero, bat edo bi biko, eta zero, bat edo bi hiruko. Taulak konbinazio guztiak probatzen ditu: 3 aukera bider 3 aukera, 9 zatitzaile.',
                'Un divisor de $36=2^{2}\\cdot 3^{2}$ solo puede llevar doses y treses: cero, uno o dos doses, y cero, uno o dos treses. La tabla prueba todas las combinaciones: 3 maneras por 3 maneras, 9 divisores.',
                'قاسم $36=2^{2}\\cdot 3^{2}$ لا يحوي إلا العددين 2 و3: صفرًا أو واحدًا أو اثنين من العدد 2، وصفرًا أو واحدًا أو اثنين من العدد 3. والجدول يجرّب كل التركيبات: 3 طرق في 3 طرق، أي 9 قواسم.',
                'A divisor of $36=2^{2}\\cdot 3^{2}$ can only contain twos and threes: zero, one or two twos, and zero, one or two threes. The table tries every combination: 3 ways times 3 ways, 9 divisors.'
            ),
            math: same('$3\\cdot 3=9$')
        }
    },

    /* ---------- 4. GCD and LCM ---------- */
    gcd: {
        vocabulary: [
            say('zatitzaile komunak', 'divisores comunes', 'القواسم المشتركة', 'common divisors'),
            say('berretzailea', 'exponente', 'الأس', 'exponent'),
            say('biderkagai lehenak', 'factores primos', 'العوامل الأولية', 'prime factors')
        ],
        definitions: [
            {
                term: say('Zatitzaile komunetako handiena (ZKH)', 'Máximo común divisor (m.c.d.)', 'القاسم المشترك الأكبر (ق.م.أ)', 'Greatest common divisor (GCD)'),
                meaning: say('Bi zenbakiren edo gehiagoren zatitzaile komunetatik handiena.', 'El mayor de los divisores comunes de dos o más números.', 'أكبر القواسم المشتركة لعددين أو أكثر.', 'The biggest of the common divisors of two or more numbers.')
            }
        ],
        explanation: say(
            'Bi zenbakiren zatitzaile komunak bi zerrendetan daudenak dira, eta haietako handiena haien ZKH da. Zenbaki handiekin, deskonposatu biderkagai lehenetan eta biderkatu biderkagai komunak, bakoitza berretzaile txikienarekin.',
            'Los divisores comunes de dos números son los que están en las dos listas, y el mayor de ellos es su m.c.d. Con números grandes, descompón en factores primos y multiplica los factores comunes, cada uno con el menor exponente.',
            'القواسم المشتركة لعددين هي الموجودة في القائمتين، وأكبرها هو ق.م.أ لهما. ومع الأعداد الكبيرة حلّل إلى عوامل أولية واضرب العوامل المشتركة، كلًّا بأصغر أس.',
            'The common divisors of two numbers are the ones in both lists, and the biggest of them is their GCD. With large numbers, break them down into prime factors and multiply the common factors, each with its smallest exponent.'
        ),
        examplePrompt: say('Kalkulatu 30 eta 45 zenbakien ZKH.', 'Calcula el m.c.d. de 30 y 45.', 'احسب ق.م.أ للعددين 30 و45.', 'Work out the GCD of 30 and 45.'),
        example: notation('$\\begin{gathered}30=2\\cdot 3\\cdot 5\\qquad 45=3^{2}\\cdot 5\\\\@GCD(30,45)=3\\cdot 5=15\\end{gathered}$'),
        exampleAnswer: say('Komunak 3 eta 5 dira, bakoitza bere berretzaile txikienarekin.', 'Comunes son el 3 y el 5, cada uno con su menor exponente.', 'العاملان المشتركان 3 و5، كلٌّ بأصغر أس.', 'The common ones are 3 and 5, each with its smallest exponent.')
    },
    lcm: {
        vocabulary: [
            say('multiplo komunak', 'múltiplos comunes', 'المضاعفات المشتركة', 'common multiples'),
            say('berretzailea', 'exponente', 'الأس', 'exponent'),
            say('bat etorri', 'coincidir', 'تلتقيان', 'meet')
        ],
        definitions: [
            {
                term: say('Multiplo komunetako txikiena (MKT)', 'Mínimo común múltiplo (m.c.m.)', 'المضاعف المشترك الأصغر (م.م.أ)', 'Least common multiple (LCM)'),
                meaning: say('Bi zenbakiren edo gehiagoren multiplo komunetatik txikiena (0 kontatu gabe).', 'El menor de los múltiplos comunes de dos o más números (sin contar el 0).', 'أصغر المضاعفات المشتركة لعددين أو أكثر (دون عدّ الصفر).', 'The smallest of the common multiples of two or more numbers (not counting 0).')
            }
        ],
        explanation: say(
            'Anak 2 egunean behin egiten du igeri, eta Evak 3 egunean behin: 6., 12., 18.… egunetan etortzen dira bat, 2 eta 3 zenbakien multiplo komunetan. Txikiena, 6, haien MKT da. Zenbaki handiekin, deskonposatu eta biderkatu biderkagai komunak eta ez-komunak, bakoitza berretzaile handienarekin.',
            'Ana nada cada 2 días y Eva cada 3: coinciden los días 6, 12, 18…, los múltiplos comunes de 2 y 3. El menor, 6, es su m.c.m. Con números grandes, descompón y multiplica los factores comunes y no comunes, cada uno con el mayor exponente.',
            'تسبح آنا كل يومين وإيفا كل 3 أيام: تلتقيان في الأيام 6، 12، 18…، وهي المضاعفات المشتركة لـ2 و3. وأصغرها 6 هو م.م.أ لهما. ومع الأعداد الكبيرة حلّل واضرب العوامل المشتركة وغير المشتركة، كلًّا بأكبر أس.',
            'Ana swims every 2 days and Eva every 3: they meet on days 6, 12, 18…, the common multiples of 2 and 3. The smallest, 6, is their LCM. With large numbers, break them down and multiply the common and the other factors, each with its biggest exponent.'
        ),
        examplePrompt: say('Kalkulatu 12 eta 15 zenbakien MKT.', 'Calcula el m.c.m. de 12 y 15.', 'احسب م.م.أ للعددين 12 و15.', 'Work out the LCM of 12 and 15.'),
        example: notation('$\\begin{gathered}12=2^{2}\\cdot 3\\qquad 15=3\\cdot 5\\\\@LCM(12,15)=2^{2}\\cdot 3\\cdot 5=60\\end{gathered}$'),
        exampleAnswer: say('Biderkagai guztiak, 2, 3 eta 5, bakoitza bere berretzaile handienarekin.', 'Todos los factores, 2, 3 y 5, cada uno con su mayor exponente.', 'كل العوامل، 2 و3 و5، كلٌّ بأكبر أس.', 'All the factors, 2, 3 and 5, each with its biggest exponent.')
    },

    /* ---------- 5. Problems ---------- */
    which: {
        vocabulary: [
            say('banatu', 'repartir', 'نوزّع', 'share'),
            say('bat etorri', 'coincidir', 'الالتقاء', 'meet'),
            say('autobusa', 'autobús', 'الحافلة', 'bus')
        ],
        explanation: say(
            'Kalkulatu aurretik, galdetu zeure buruari: zati edo talde berdinetan banatu behar da? Orduan zatitzaileak bilatzen dituzu: ZKH. Noiz etorriko den zerbait berriro bat, marrazkiko autobusak bezala? Orduan multiploak bilatzen dituzu: MKT.',
            'Antes de calcular, pregúntate: ¿hay que repartir en partes o grupos iguales? Entonces buscas divisores: m.c.d. ¿Buscas cuándo algo vuelve a coincidir, como los autobuses del dibujo? Entonces buscas múltiplos: m.c.m.',
            'قبل الحساب اسأل نفسك: هل علينا أن نوزّع في أجزاء أو مجموعات متساوية؟ عندها تبحث عن القواسم: ق.م.أ. وهل تبحث عن موعد التقاء شيئين من جديد، مثل الحافلتين في الرسم؟ عندها تبحث عن المضاعفات: م.م.أ.',
            'Before working anything out, ask yourself: do we have to share into equal parts or groups? Then you are looking for divisors: GCD. Are you looking for when things meet again, like the buses in the drawing? Then you are looking for multiples: LCM.'
        ),
        examplePrompt: say('Itsasargi bat 8 segundoro pizten da, eta beste bat 12 segundoro. Zenbatero pizten dira batera?', 'Un faro se enciende cada 8 segundos y otro cada 12. ¿Cada cuánto se encienden a la vez?', 'منارة تضيء كل 8 ثوانٍ وأخرى كل 12 ثانية. كل كم ثانية تضيئان معًا؟', 'One lighthouse flashes every 8 seconds and another every 12. How often do they flash together?'),
        example: notation('$@LCM(8,12)=24$'),
        exampleAnswer: say('Noiz etorriko diren berriro bat bilatzen dugu: MKT. 24 segundoro pizten dira batera.', 'Buscamos cuándo vuelven a coincidir: m.c.m. Se encienden juntos cada 24 segundos.', 'نبحث عن موعد التقائهما من جديد: م.م.أ. تضيئان معًا كل 24 ثانية.', 'We are looking for when they meet again: LCM. They flash together every 24 seconds.')
    },
    method: {
        vocabulary: [
            say('urratsak', 'pasos', 'الخطوات', 'steps'),
            say('unitateak', 'unidades', 'الوحدات', 'units')
        ],
        explanation: say(
            'Jarraitu lau urrats: erabaki ZKH ala MKT behar den; deskonposatu datuak (edo idatzi zerrendak); kalkulatu; eta erantzun esaldi batez eta unitateekin. Behean ZKH buruketa bat duzu ebatzita; beste adibidean MKT behar da.',
            'Sigue cuatro pasos: decide si hace falta el m.c.d. o el m.c.m.; descompón los datos (o escribe las listas); calcula; y responde con una frase y con unidades. Abajo tienes resuelto un problema de m.c.d.; en el otro ejemplo hace falta el m.c.m.',
            'اتبع أربع خطوات: قرّر هل نحتاج إلى ق.م.أ أم م.م.أ؛ حلّل المعطيات (أو اكتب القوائم)؛ احسب؛ ثم أجب بجملة مع الوحدات. في الأسفل مسألة محلولة عن ق.م.أ؛ وفي المثال الآخر نحتاج إلى م.م.أ.',
            'Follow four steps: decide whether you need the GCD or the LCM; break the data down (or write the lists); work it out; and answer with a sentence and with units. Below there is a solved GCD problem; the other example needs the LCM.'
        ),
        examplePrompt: say('Hiru itsasontzi portutik ateratzen dira 4, 5 eta 7 egunean behin. Gaur batera atera dira. Zenbat egun barru aterako dira berriro batera?', 'Tres barcos salen del puerto cada 4, 5 y 7 días. Hoy han salido juntos. ¿Dentro de cuántos días volverán a coincidir?', 'تخرج ثلاث سفن من الميناء كل 4 و5 و7 أيام. خرجت اليوم معًا. بعد كم يومًا تلتقي من جديد؟', 'Three boats leave the port every 4, 5 and 7 days. Today they left together. In how many days will they leave together again?'),
        example: notation('$\\begin{gathered}4=2^{2}\\quad 5\\quad 7\\\\@LCM(4,5,7)=2^{2}\\cdot 5\\cdot 7=140\\end{gathered}$'),
        exampleAnswer: say('Erantzuna: 140 egun barru aterako dira berriro batera.', 'Respuesta: volverán a salir juntos dentro de 140 días.', 'الجواب: ستخرج معًا من جديد بعد 140 يومًا.', 'Answer: they will leave together again in 140 days.')
    }
}
