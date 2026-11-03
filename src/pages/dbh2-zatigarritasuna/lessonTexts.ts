import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { DivisibilityTopicId } from './lessonChecks.ts'
import { notation } from './notation.ts'

/* ==========================================================================
   Zatigarritasuna · 2. DBH — what each lesson tells: the new words
   (definitions), a short explanation and the example as an exercise
   («Another example», or «Example» in the lessons of facts). Plain data so
   the tests can import it; lessons.tsx merges it into the topics. Formulas
   use notation() (Zat, ZKH, MKT in Basque and Arabic; Div, m.c.d., m.c.m.
   in Spanish; Div, GCD, LCM in English), and in the words each language
   names them its own way. The example uses numbers of its own, never those
   of «Let's solve», of «Check it» or of the typical mistake.
   Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

export const divisibilityLessonTexts: Record<DivisibilityTopicId, LessonTexts> = {
    /* ---------- 1. Multiples and divisors ---------- */
    relation: {
        vocabulary: [
            say('hondarra', 'resto', 'الباقي', 'remainder'),
            say('zatiketa', 'división', 'القسمة', 'division')
        ],
        definitions: [
            {
                term: say('Multiploa', 'Múltiplo', 'المضاعف', 'Multiple'),
                meaning: say('$a$ zenbakia $b$ zenbakiaren multiploa da, $a\\mathbin{:}b$ zatiketa zehatza bada (hondarra 0).', '$a$ es múltiplo de $b$ si la división $a\\mathbin{:}b$ es exacta (resto 0).', '$a$ مضاعف لـ$b$ إذا كانت القسمة $a\\mathbin{:}b$ تامة (الباقي 0).', '$a$ is a multiple of $b$ if the division $a\\mathbin{:}b$ is exact (remainder 0).')
            },
            {
                term: say('Zatitzailea', 'Divisor', 'القاسم', 'Divisor'),
                meaning: say('$b$ zenbakia $a$ zenbakiaren zatitzailea da, $a$ zehazki zatitzen badu.', '$b$ es divisor de $a$ si divide a $a$ de forma exacta.', '$b$ قاسم لـ$a$ إذا قسم $a$ قسمة تامة.', '$b$ is a divisor of $a$ if it divides $a$ exactly.')
            }
        ],
        explanation: say(
            'Bi hitzek erlazio bera esaten dute, zatigarritasuna: $a$ zenbakia $b$ zenbakiaren multiploa bada, $b$ zenbakia $a$ zenbakiaren zatitzailea da. Jakiteko, zatitu: hondarra 0 bada, erlazioa dago; bestela, ez.',
            'Las dos palabras dicen la misma relación, la de divisibilidad: si $a$ es múltiplo de $b$, $b$ es divisor de $a$. Para saberlo, divide: si el resto es 0, hay relación; si no, no.',
            'الكلمتان تعبّران عن العلاقة نفسها، قابلية القسمة: إذا كان $a$ مضاعفًا لـ$b$ فإن $b$ قاسم لـ$a$. ولمعرفة ذلك اقسم: إذا كان الباقي 0 فهناك علاقة، وإلا فلا.',
            'The two words describe the same relation, divisibility: if $a$ is a multiple of $b$, then $b$ is a divisor of $a$. To find out, divide: if the remainder is 0, there is a relation; if not, there is not.'
        ),
        examplePrompt: say('91 zenbakia 7 zenbakiaren multiploa da? Eta 93?', '¿Es 91 múltiplo de 7? ¿Y 93?', 'هل 91 مضاعف لـ7؟ وماذا عن 93؟', 'Is 91 a multiple of 7? And 93?'),
        example: say('$\\begin{gathered}91=7\\cdot 13\\\\93=7\\cdot 13+2\\end{gathered}$', '$\\begin{gathered}91=7\\cdot 13\\\\93=7\\cdot 13+2\\end{gathered}$', '$\\begin{gathered}91=7\\cdot 13\\\\93=7\\cdot 13+2\\end{gathered}$', '$\\begin{gathered}91=7\\cdot 13\\\\93=7\\cdot 13+2\\end{gathered}$'),
        exampleAnswer: say('91 bai (hondarra 0): 7 zenbakia 91 zenbakiaren zatitzailea da. 93 ez (hondarra 2).', '91 sí (resto 0): 7 es divisor de 91. 93 no (resto 2).', '91 نعم (الباقي 0): فـ7 قاسم لـ91. أما 93 فلا (الباقي 2).', '91 yes (remainder 0): 7 is a divisor of 91. 93 no (remainder 2).')
    },
    multiples: {
        vocabulary: [
            say('multiplo komunak', 'múltiplos comunes', 'المضاعفات المشتركة', 'common multiples'),
            say('zerrenda', 'lista', 'القائمة', 'list')
        ],
        definitions: [
            {
                term: say('Zenbaki baten multiploak', 'Múltiplos de un número', 'مضاعفات عدد', 'Multiples of a number'),
                meaning: say('1, 2, 3… zenbakiekin biderkatuta ateratzen direnak. $\\mathrm{M}(a)$ idazten dira, eta infinituak dira.', 'Los que salen al multiplicarlo por 1, 2, 3… Se escriben $\\mathrm{M}(a)$ y son infinitos.', 'ما ينتج عن ضربه في 1، 2، 3… وتُكتب $\\mathrm{M}(a)$ وهي غير منتهية.', 'What you get by multiplying it by 1, 2, 3… They are written $\\mathrm{M}(a)$ and are infinite.')
            }
        ],
        explanation: say(
            '0 ere zenbaki guztien multiploa da ($a\\cdot 0=0$), baina zerrendetan multiplo positiboak idazten dira: lehena zenbakia bera da. Bi zenbakiren multiplo komunak bi zerrendetan agertzen direnak dira.',
            'El 0 también es múltiplo de todos los números ($a\\cdot 0=0$), pero en las listas se escriben los múltiplos positivos: el primero es el propio número. Los múltiplos comunes de dos números son los que aparecen en las dos listas.',
            'الصفر أيضًا مضاعف لكل الأعداد ($a\\cdot 0=0$)، لكننا نكتب في القوائم المضاعفات الموجبة: أولها العدد نفسه. والمضاعفات المشتركة لعددين هي التي تظهر في القائمتين.',
            '0 is also a multiple of every number ($a\\cdot 0=0$), but the lists show the positive multiples: the first one is the number itself. The common multiples of two numbers are the ones in both lists.'
        ),
        examplePrompt: say(
            'Idatzi 9 eta 15 zenbakien lehen multiploak. Zein da multiplo komun txikiena?',
            'Escribe los primeros múltiplos de 9 y de 15. ¿Cuál es el menor múltiplo común?',
            'اكتب المضاعفات الأولى لـ9 ولـ15. ما أصغر مضاعف مشترك؟',
            'Write the first multiples of 9 and of 15. Which is the smallest common multiple?'
        ),
        example: say(
            '$\\begin{gathered}\\mathrm{M}(9)=\\{9,\\ 18,\\ 27,\\ 36,\\ 45,\\ \\dots\\}\\\\\\mathrm{M}(15)=\\{15,\\ 30,\\ 45,\\ 60,\\ \\dots\\}\\end{gathered}$',
            '$\\begin{gathered}\\mathrm{M}(9)=\\{9,\\ 18,\\ 27,\\ 36,\\ 45,\\ \\dots\\}\\\\\\mathrm{M}(15)=\\{15,\\ 30,\\ 45,\\ 60,\\ \\dots\\}\\end{gathered}$',
            '$\\begin{gathered}\\mathrm{M}(9)=\\{9,\\ 18,\\ 27,\\ 36,\\ 45,\\ \\dots\\}\\\\\\mathrm{M}(15)=\\{15,\\ 30,\\ 45,\\ 60,\\ \\dots\\}\\end{gathered}$',
            '$\\begin{gathered}\\mathrm{M}(9)=\\{9,\\ 18,\\ 27,\\ 36,\\ 45,\\ \\dots\\}\\\\\\mathrm{M}(15)=\\{15,\\ 30,\\ 45,\\ 60,\\ \\dots\\}\\end{gathered}$'
        ),
        exampleAnswer: say('Multiplo komun txikiena 45 da.', 'El menor múltiplo común es 45.', 'أصغر مضاعف مشترك هو 45.', 'The smallest common multiple is 45.')
    },
    divisors: {
        vocabulary: [
            say('bikotea', 'pareja', 'زوج', 'pair'),
            say('zatitu', 'dividir', 'قسمة', 'divide')
        ],
        definitions: [
            {
                term: say('Zenbaki baten zatitzaileak', 'Divisores de un número', 'قواسم عدد', 'Divisors of a number'),
                meaning: say('Zehazki zatitzen dutenak. $\\mathrm{Zat}(a)$ idazten dira: finituak dira, 1 zenbakitik zenbakia beraraino.', 'Los que lo dividen de forma exacta. Se escriben $\\mathrm{Div}(a)$: son finitos, del 1 al propio número.', 'الأعداد التي تقسمه قسمة تامة. وتُكتب $\\mathrm{Zat}(a)$: وهي منتهية، من 1 إلى العدد نفسه.', 'The numbers that divide it exactly. They are written $\\mathrm{Div}(a)$: there are finitely many, from 1 to the number itself.')
            }
        ],
        explanation: say(
            'Denak aurkitzeko, zatitu 1, 2, 3… zenbakiekin eta idatzi zatitzaileak bikoteka; bikoteko bi zenbakiak elkartzen direnean, amaitu duzu.',
            'Para encontrarlos todos, divide entre 1, 2, 3… y anota los divisores por parejas; cuando los dos números de la pareja se encuentran, has terminado.',
            'لإيجادها كلها اقسم على 1، 2، 3… واكتب القواسم أزواجًا؛ وعندما يلتقي عددا الزوج تكون قد انتهيت.',
            'To find them all, divide by 1, 2, 3… and write the divisors in pairs; when the two numbers of a pair meet, you have finished.'
        ),
        examplePrompt: say('Aurkitu 45 zenbakiaren zatitzaile guztiak.', 'Encuentra todos los divisores de 45.', 'أوجد كل قواسم 45.', 'Find all the divisors of 45.'),
        example: notation('$\\begin{gathered}45=1\\cdot 45=3\\cdot 15=5\\cdot 9\\\\@DIV(45)=\\{1,3,5,9,15,45\\}\\end{gathered}$'),
        exampleAnswer: say('6 zatitzaile ditu: hiru bikote.', 'Tiene 6 divisores: tres parejas.', 'له 6 قواسم: ثلاثة أزواج.', 'It has 6 divisors: three pairs.')
    },

    /* ---------- 2. Divisibility rules ---------- */
    'criteria-digit': {
        vocabulary: [
            say('azken zifra', 'última cifra', 'الرقم الأخير', 'last digit'),
            say('zatigarria', 'divisible', 'قابل للقسمة', 'divisible')
        ],
        definitions: [
            {
                term: say('Zatigarritasun-irizpidea', 'Criterio de divisibilidad', 'قاعدة قابلية القسمة', 'Divisibility rule'),
                meaning: say('Zatiketa egin gabe, zenbaki bat beste batekin zatigarria den esaten duen araua.', 'Una regla que dice, sin hacer la división, si un número es divisible por otro.', 'قاعدة تبيّن، دون إجراء القسمة، هل يقبل عدد القسمة على آخر.', 'A rule that tells you, without dividing, whether one number is divisible by another.')
            }
        ],
        why: {
            text: say(
                'Zenbaki oro bere hamarrekoak bider 10 gehi azken zifra da: $345=34\\cdot 10+5$. 10 zenbakia 2, 5 eta 10 zenbakien multiploa denez, $34\\cdot 10$ zatia beti zati daiteke haien artean. Azken zifrari begiratzea besterik ez da geratzen.',
                'Todo número es sus decenas por 10 más su última cifra: $345=34\\cdot 10+5$. Como 10 es múltiplo de 2, de 5 y de 10, la parte $34\\cdot 10$ siempre se puede dividir entre ellos. Solo queda mirar la última cifra.',
                'كل عدد يساوي عشراته مضروبة في 10 زائد رقمه الأخير: $345=34\\cdot 10+5$. وبما أن 10 من مضاعفات 2 و5 و10، فإن الجزء $34\\cdot 10$ يقبل القسمة عليها دائمًا. ولا يبقى إلا النظر إلى الرقم الأخير.',
                'Every number is its tens times 10 plus its last digit: $345=34\\cdot 10+5$. Since 10 is a multiple of 2, 5 and 10, the part $34\\cdot 10$ can always be divided by them. Only the last digit is left to look at.'
            )
        },
        explanation: say(
            '2, 5 eta 10 zenbakietarako nahikoa da azken zifrari begiratzea. 10 zenbakiarekin zatigarria dena 2 eta 5 zenbakiekin ere zatigarria da.',
            'Para 2, 5 y 10 basta con mirar la última cifra. Lo que es divisible por 10 también lo es por 2 y por 5.',
            'بالنسبة إلى 2 و5 و10 يكفي النظر إلى الرقم الأخير. وما يقبل القسمة على 10 يقبلها على 2 و5 أيضًا.',
            'For 2, 5 and 10, you only need to look at the last digit. Anything divisible by 10 is also divisible by 2 and by 5.'
        ),
        examplePrompt: say('2, 5 eta 10 zenbakietatik, zeinekin da zatigarria 4385?', '¿Por cuáles de 2, 5 y 10 es divisible 4385?', 'على أي من 2 و5 و10 يقبل 4385 القسمة؟', 'Which of 2, 5 and 10 is 4,385 divisible by?'),
        example: say('$4385\\mathbin{:}5=877$', '$4385\\mathbin{:}5=877$', '$4385\\mathbin{:}5=877$', '$4385\\mathbin{:}5=877$'),
        exampleAnswer: say('5 zenbakiarekin bakarrik: 5 zifran amaitzen da. Ez da bikoitia; beraz, ez da zatigarria 2 eta 10 zenbakiekin.', 'Solo por 5: termina en 5. No es par, así que no es divisible por 2 ni por 10.', 'على 5 فقط: آخر رقم فيه 5. وليس زوجيًا، فلا يقبل القسمة على 2 ولا على 10.', 'Only by 5: it ends in 5. It is not even, so it is not divisible by 2 or 10.')
    },
    'criteria-sum': {
        vocabulary: [
            say('zifren batura', 'suma de las cifras', 'مجموع الأرقام', 'sum of the digits'),
            say('zatigarria', 'divisible', 'قابل للقسمة', 'divisible')
        ],
        why: {
            text: say(
                '$10=9+1$ eta $100=99+1$ direlako. Horrela, $234$ zenbakian, ehunekoek eta hamarrekoek 9 zenbakiaren (eta 3 zenbakiaren) multiploa den zati bat ematen dute, eta zifren batura geratzen da soberan. Batura hori 9 edo 3 zenbakiarekin zati badaiteke, zenbakia ere bai.',
                'Porque $10=9+1$ y $100=99+1$. Así, en $234$, las centenas y las decenas dan una parte que es múltiplo de 9 (y de 3), y sobra justo la suma de las cifras. Si esa suma se puede dividir entre 9 o entre 3, el número también.',
                'لأن $10=9+1$ و$100=99+1$. لذلك في $234$ تعطي المئات والعشرات جزءًا من مضاعفات 9 (و3)، ويبقى بالضبط مجموع الأرقام. فإذا قبل هذا المجموع القسمة على 9 أو على 3 قبلها العدد أيضًا.',
                'Because $10=9+1$ and $100=99+1$. So in $234$ the hundreds and the tens give a part that is a multiple of 9 (and of 3), and what is left over is exactly the sum of the digits. If that sum can be divided by 9 or by 3, so can the number.'
            ),
            math: '$234=2\\cdot 99+3\\cdot 9+(2+3+4)$'
        },
        explanation: say(
            '3 eta 9 zenbakietarako ez da nahikoa azken zifra: zifra guztiak batu behar dira. Batura handia bada, haren zifrak berriro batu daitezke. 9 zenbakiarekin zatigarria dena 3 zenbakiarekin ere zatigarria da.',
            'Para 3 y 9 no basta con la última cifra: hay que sumar todas las cifras. Si la suma es grande, se pueden volver a sumar sus cifras. Lo que es divisible por 9 también lo es por 3.',
            'بالنسبة إلى 3 و9 لا يكفي الرقم الأخير: يجب جمع كل الأرقام. وإذا كان المجموع كبيرًا يمكن جمع أرقامه من جديد. وما يقبل القسمة على 9 يقبلها على 3 أيضًا.',
            'For 3 and 9 the last digit is not enough: you have to add up all the digits. If the sum is big, you can add its digits again. Anything divisible by 9 is also divisible by 3.'
        ),
        examplePrompt: say('7524 zenbakia 3 zenbakiarekin zatigarria da? Eta 9 zenbakiarekin?', '¿Es 7524 divisible por 3? ¿Y por 9?', 'هل يقبل 7524 القسمة على 3؟ وعلى 9؟', 'Is 7,524 divisible by 3? And by 9?'),
        example: say('$7+5+2+4=18$', '$7+5+2+4=18$', '$7+5+2+4=18$', '$7+5+2+4=18$'),
        exampleAnswer: say('Biekin: 18 zenbakia 9 eta 3 zenbakien multiploa da.', 'Por los dos: 18 es múltiplo de 9 y de 3.', 'على كليهما: 18 مضاعف لـ9 ولـ3.', 'By both: 18 is a multiple of 9 and of 3.')
    },
    'criteria-11-7': {
        vocabulary: [
            say('posizioa', 'posición', 'الموقع', 'position'),
            say('bikoitza', 'doble', 'الضعف', 'double'),
            say('kendu', 'restar', 'اطرح', 'subtract')
        ],
        explanation: say(
            'Irizpide luzeagoak dira, baina zenbaki handiekin ere balio dute. 11 zenbakirako, zifrak posizioka bereizten dira; 7 zenbakirako, azken zifra kentzen da eta haren bikoitza kentzen zaio geratzen den zenbakiari.',
            'Son criterios más largos, pero sirven también con números grandes. Para el 11, las cifras se separan según su posición; para el 7, se quita la última cifra y se resta su doble al número que queda.',
            'هاتان القاعدتان أطول، لكنهما تصلحان للأعداد الكبيرة أيضًا. في قاعدة 11 تُفصل الأرقام حسب موقع كل رقم؛ وفي قاعدة 7 يُحذف الرقم الأخير ويُطرح ضعفه من العدد الباقي.',
            'These rules are longer, but they also work with big numbers. For 11, the digits are split by position; for 7, you remove the last digit and subtract its double from the number that is left.'
        ),
        examplePrompt: say('5291 zenbakia 11 zenbakiarekin zatigarria da? Eta 343 zenbakia 7 zenbakiarekin?', '¿Es 5291 divisible por 11? ¿Y 343 por 7?', 'هل يقبل 5291 القسمة على 11؟ وهل يقبل 343 القسمة على 7؟', 'Is 5,291 divisible by 11? And 343 by 7?'),
        example: say('$\\begin{gathered}(5+9)-(2+1)=11\\\\34-2\\cdot 3=28\\end{gathered}$', '$\\begin{gathered}(5+9)-(2+1)=11\\\\34-2\\cdot 3=28\\end{gathered}$', '$\\begin{gathered}(5+9)-(2+1)=11\\\\34-2\\cdot 3=28\\end{gathered}$', '$\\begin{gathered}(5+9)-(2+1)=11\\\\34-2\\cdot 3=28\\end{gathered}$'),
        exampleAnswer: say('Biak: 11 zenbakia 11 zenbakiaren multiploa da, eta 28 zenbakia 7 zenbakiarena.', 'Los dos: 11 es múltiplo de 11, y 28 es múltiplo de 7.', 'كلاهما: 11 مضاعف لـ11، و28 مضاعف لـ7.', 'Both: 11 is a multiple of 11, and 28 is a multiple of 7.')
    },

    /* ---------- 3. Primes and factorisation ---------- */
    primes: {
        vocabulary: [
            say('zatitzailea', 'divisor', 'القاسم', 'divisor'),
            say('Eratostenesen bahea', 'criba de Eratóstenes', 'غربال إراتوستينس', 'sieve of Eratosthenes')
        ],
        definitions: [
            {
                term: say('Zenbaki lehena', 'Número primo', 'العدد الأولي', 'Prime number'),
                meaning: say('Bi zatitzaile bakarrik dituena: 1 eta zenbakia bera.', 'El que solo tiene dos divisores: 1 y el propio número.', 'العدد الذي له قاسمان فقط: 1 والعدد نفسه.', 'One that has only two divisors: 1 and the number itself.')
            },
            {
                term: say('Zenbaki konposatua', 'Número compuesto', 'العدد المؤلف', 'Composite number'),
                meaning: say('Bi zatitzaile baino gehiago dituena.', 'El que tiene más de dos divisores.', 'العدد الذي له أكثر من قاسمين.', 'One that has more than two divisors.')
            }
        ],
        explanation: say(
            '1 zenbakiak zatitzaile bakarra du; beraz, ez da ez lehena ez konposatua. 2 da zenbaki lehen bikoiti bakarra. Eratostenesen baheak 100 arteko lehenak aurkitzen laguntzen du.',
            'El 1 solo tiene un divisor, así que no es ni primo ni compuesto. El 2 es el único primo par. La criba de Eratóstenes ayuda a encontrar los primos hasta 100.',
            'للعدد 1 قاسم واحد، فهو ليس أوليًا ولا مؤلفًا. والعدد 2 هو العدد الأولي الزوجي الوحيد. ويساعد غربال إراتوستينس على إيجاد الأعداد الأولية حتى 100.',
            '1 has only one divisor, so it is neither prime nor composite. 2 is the only even prime. The Sieve of Eratosthenes helps you find the primes up to 100.'
        ),
        examplePrompt: say('87 lehena da? Eta 89?', '¿Es primo 87? ¿Y 89?', 'هل 87 عدد أولي؟ وماذا عن 89؟', 'Is 87 prime? And 89?'),
        example: notation('$\\begin{gathered}87=3\\cdot 29\\\\@DIV(89)=\\{1,89\\}\\end{gathered}$'),
        exampleAnswer: say('87 konposatua da (zifren batura 15: 3 zenbakiarekin zatigarria). 89 lehena da.', '87 es compuesto (sus cifras suman 15: divisible por 3). 89 es primo.', '87 مؤلف (مجموع أرقامه 15: يقبل القسمة على 3). و89 أولي.', '87 is composite (its digits add up to 15: divisible by 3). 89 is prime.')
    },
    factorization: {
        vocabulary: [
            say('biderkagai lehena', 'factor primo', 'العامل الأولي', 'prime factor'),
            say('berreturak', 'potencias', 'القوى', 'powers'),
            say('zatidura', 'cociente', 'خارج القسمة', 'quotient')
        ],
        explanation: say(
            'Zenbaki konposatu oro lehenen biderkadura gisa idatz daiteke, eta modu bakarrean. Zatitu lehen txikienarekin (erabili irizpideak), gero zatidura, eta horrela 1 lortu arte. Biderkagai errepikatuak berretura gisa idazten dira.',
            'Todo número compuesto se puede escribir como producto de primos, y de una única forma. Divide entre el menor primo posible (usa los criterios), después el cociente, y así hasta llegar a 1. Los factores repetidos se escriben como potencias.',
            'يمكن كتابة كل عدد مؤلف حاصلَ ضرب أعداد أولية، وبطريقة واحدة. اقسم على أصغر عدد أولي ممكن (استعمل القواعد)، ثم اقسم الناتج، وهكذا حتى تصل إلى 1. وتُكتب العوامل المكررة قوى.',
            'Every composite number can be written as a product of primes, in only one way. Divide by the smallest prime you can (use the rules), then the quotient, and so on until you reach 1. Repeated factors are written as powers.'
        ),
        examplePrompt: say('Deskonposatu 252 biderkagai lehenetan.', 'Descompón 252 en factores primos.', 'حلّل 252 إلى عوامل أولية.', 'Write 252 as a product of prime factors.'),
        example: say('$252=2^{2}\\cdot 3^{2}\\cdot 7$', '$252=2^{2}\\cdot 3^{2}\\cdot 7$', '$252=2^{2}\\cdot 3^{2}\\cdot 7$', '$252=2^{2}\\cdot 3^{2}\\cdot 7$'),
        exampleAnswer: say(
            '$252\\mathbin{:}2=126$, $126\\mathbin{:}2=63$, $63\\mathbin{:}3=21$ eta $21\\mathbin{:}3=7$.',
            '$252\\mathbin{:}2=126$, $126\\mathbin{:}2=63$, $63\\mathbin{:}3=21$ y $21\\mathbin{:}3=7$.',
            '$252\\mathbin{:}2=126$ و$126\\mathbin{:}2=63$ و$63\\mathbin{:}3=21$ و$21\\mathbin{:}3=7$.',
            '$252\\mathbin{:}2=126$, $126\\mathbin{:}2=63$, $63\\mathbin{:}3=21$ and $21\\mathbin{:}3=7$.'
        )
    },
    gcd: {
        vocabulary: [
            say('zatitzaile komunak', 'divisores comunes', 'القواسم المشتركة', 'common divisors'),
            say('berretzailea', 'exponente', 'الأس', 'exponent')
        ],
        definitions: [
            {
                term: say('Zatitzaile komunetako handiena (ZKH)', 'Máximo común divisor (m.c.d.)', 'القاسم المشترك الأكبر (ق.م.أ)', 'Greatest common divisor (GCD)'),
                meaning: say('Bi zenbakiren edo gehiagoren zatitzaile komunetatik handiena.', 'El mayor de los divisores comunes de dos o más números.', 'أكبر القواسم المشتركة لعددين أو أكثر.', 'The largest of the common divisors of two or more numbers.')
            }
        ],
        why: {
            text: say(
                'Zatitzaile komun batek bi zenbakietan sartu behar du. $12=2^{2}\\cdot 3$ eta $18=2\\cdot 3^{2}$ zenbakietan, gehienez 2 bat eraman dezake (18 zenbakiak bakarra du) eta 3 bat (12 zenbakiak bakarra du). Horregatik, faktore komun bakoitza berretzaile txikienarekin hartzen da.',
                'Un divisor común tiene que caber en los dos números. En $12=2^{2}\\cdot 3$ y $18=2\\cdot 3^{2}$ puede llevar como mucho un 2 (el 18 solo tiene uno) y un 3 (el 12 solo tiene uno). Por eso se toma cada factor común con el menor exponente.',
                'القاسم المشترك يجب أن يدخل في العددين معًا. في $12=2^{2}\\cdot 3$ و$18=2\\cdot 3^{2}$ يمكنه أن يحمل 2 واحدًا على الأكثر (لأن في 18 واحدًا فقط) و3 واحدًا (لأن في 12 واحدًا فقط). لذلك نأخذ كل عامل مشترك بأصغر أس.',
                'A common divisor has to fit into both numbers. In $12=2^{2}\\cdot 3$ and $18=2\\cdot 3^{2}$ it can carry at most one 2 (18 has only one) and one 3 (12 has only one). That is why each common factor is taken with its smallest exponent.'
            ),
            math: notation('$@GCD(12,18)=2\\cdot 3=6$')
        },
        explanation: say(
            'Zenbaki txikiekin, idatzi zatitzaileen zerrendak eta hartu komunetatik handiena. Zenbaki handiekin, deskonposatu biderkagai lehenetan eta biderkatu biderkagai komunak, berretzaile txikienarekin. Inoiz ez da zenbakirik txikiena baino handiagoa.',
            'Con números pequeños, escribe las listas de divisores y toma el mayor de los comunes. Con números grandes, descompón en factores primos y multiplica los factores comunes con el menor exponente. Nunca es mayor que el menor de los números.',
            'مع الأعداد الصغيرة اكتب قوائم القواسم وخذ أكبر المشترك منها. ومع الأعداد الكبيرة حلّل إلى عوامل أولية واضرب العوامل المشتركة بأصغر أس. ولا يكون أبدًا أكبر من أصغر الأعداد.',
            'With small numbers, write the lists of divisors and take the largest common one. With big numbers, write them as products of primes and multiply the common factors with the smallest exponent. It is never bigger than the smallest of the numbers.'
        ),
        examplePrompt: say('Kalkulatu 30 eta 45 zenbakien ZKH.', 'Calcula el m.c.d. de 30 y 45.', 'احسب ق.م.أ للعددين 30 و45.', 'Work out the GCD of 30 and 45.'),
        example: notation('$\\begin{gathered}30=2\\cdot 3\\cdot 5\\qquad 45=3^{2}\\cdot 5\\\\@GCD(30,45)=3\\cdot 5=15\\end{gathered}$'),
        exampleAnswer: say('ZKH 15 da: biderkagai komunak, 3 eta 5, berretzaile txikienarekin.', 'El m.c.d. es 15: los factores comunes, 3 y 5, con el menor exponente.', 'ق.م.أ هو 15: العاملان المشتركان 3 و5 بأصغر أس.', 'The GCD is 15: the common factors, 3 and 5, with the smallest exponent.')
    },
    lcm: {
        vocabulary: [
            say('multiplo komunak', 'múltiplos comunes', 'المضاعفات المشتركة', 'common multiples'),
            say('lehen erlatiboak', 'primos entre sí', 'أوليان فيما بينهما', 'coprime')
        ],
        definitions: [
            {
                term: say('Multiplo komunetako txikiena (MKT)', 'Mínimo común múltiplo (m.c.m.)', 'المضاعف المشترك الأصغر (م.م.أ)', 'Least common multiple (LCM)'),
                meaning: say('Bi zenbakiren edo gehiagoren multiplo komunetatik txikiena, 0 kontatu gabe.', 'El menor de los múltiplos comunes de dos o más números, sin contar el 0.', 'أصغر المضاعفات المشتركة لعددين أو أكثر، دون احتساب 0.', 'The smallest of the common multiples of two or more numbers, not counting 0.')
            }
        ],
        why: {
            text: say(
                'Multiplo komun batek zenbaki bakoitzaren faktore guztiak eraman behar ditu barruan. $12=2^{2}\\cdot 3$ eramateko $2^{2}$ behar du, eta $18=2\\cdot 3^{2}$ eramateko $3^{2}$. Horregatik, faktore bakoitza, komuna izan ala ez, berretzaile handienarekin hartzen da.',
                'Un múltiplo común tiene que llevar dentro todos los factores de cada número. Para llevar $12=2^{2}\\cdot 3$ necesita $2^{2}$, y para llevar $18=2\\cdot 3^{2}$ necesita $3^{2}$. Por eso se toma cada factor, común o no, con el mayor exponente.',
                'المضاعف المشترك يجب أن يحمل في داخله كل عوامل كل عدد. ليحمل $12=2^{2}\\cdot 3$ يحتاج إلى $2^{2}$، وليحمل $18=2\\cdot 3^{2}$ يحتاج إلى $3^{2}$. لذلك نأخذ كل عامل، مشتركًا أو غير مشترك، بأكبر أس.',
                'A common multiple has to carry all the factors of each number. To carry $12=2^{2}\\cdot 3$ it needs $2^{2}$, and to carry $18=2\\cdot 3^{2}$ it needs $3^{2}$. That is why each factor, common or not, is taken with its greatest exponent.'
            ),
            math: notation('$@LCM(12,18)=2^{2}\\cdot 3^{2}=36$')
        },
        explanation: say(
            'Zenbaki txikiekin, idatzi multiploen zerrendak. Zenbaki handiekin, deskonposatu eta biderkatu biderkagai komunak eta ez-komunak, bakoitza berretzaile handienarekin. Bi zenbakiren ZKH 1 bada, elkarren arteko lehenak dira, eta haien MKT biderkadura da.',
            'Con números pequeños, escribe las listas de múltiplos. Con números grandes, descompón y multiplica los factores comunes y no comunes, cada uno con su mayor exponente. Si el m.c.d. de dos números es 1, son primos entre sí y su m.c.m. es su producto.',
            'مع الأعداد الصغيرة اكتب قوائم المضاعفات. ومع الأعداد الكبيرة حلّل واضرب العوامل المشتركة وغير المشتركة، كل منها بأكبر أس. وإذا كان ق.م.أ لعددين 1 فهما أوليان فيما بينهما، ويكون م.م.أ حاصل ضربهما.',
            'With small numbers, write the lists of multiples. With big numbers, factorise and multiply the common and non-common factors, each with its largest exponent. If the GCD of two numbers is 1, they are coprime and their LCM is their product.'
        ),
        examplePrompt: say('Kalkulatu 18 eta 30 zenbakien MKT.', 'Calcula el m.c.m. de 18 y 30.', 'احسب م.م.أ للعددين 18 و30.', 'Work out the LCM of 18 and 30.'),
        example: notation('$\\begin{gathered}18=2\\cdot 3^{2}\\qquad 30=2\\cdot 3\\cdot 5\\\\@LCM(18,30)=2\\cdot 3^{2}\\cdot 5=90\\end{gathered}$'),
        exampleAnswer: say('MKT 90 da: biderkagai guztiak, berretzaile handienarekin.', 'El m.c.m. es 90: todos los factores, con el mayor exponente.', 'م.م.أ هو 90: كل العوامل بأكبر أس.', 'The LCM is 90: all the factors, with the largest exponent.')
    },

    /* ---------- 4. Problems ---------- */
    which: {
        vocabulary: [
            say('banatu', 'repartir', 'التقسيم', 'share'),
            say('berriro bat etorri', 'volver a coincidir', 'يلتقيان مجددًا', 'coincide again')
        ],
        explanation: say(
            'Buruketa bat hasi aurretik, galdetu zeure buruari: kopuruak zati berdinetan banatu behar ditut (zatitzaileak: ZKH), ala zerbait berriro noiz etorriko den batera bilatzen ari naiz (multiploak: MKT)? Galderako hitzek laguntzen dute. ZKH datuak baino txikiagoa da; MKT, handiagoa.',
            'Antes de empezar un problema, pregúntate: ¿tengo que repartir en partes iguales (divisores: m.c.d.) o busco cuándo algo volverá a coincidir (múltiplos: m.c.m.)? Las palabras de la pregunta ayudan. El m.c.d. sale menor que los datos; el m.c.m., mayor.',
            'قبل أن تبدأ المسألة اسأل نفسك: هل عليّ التقسيم إلى أجزاء متساوية (قواسم: ق.م.أ) أم أبحث عن متى يتكرر حدث ما معًا (مضاعفات: م.م.أ)؟ وكلمات السؤال تساعد. ويكون ق.م.أ أصغر من المعطيات، وم.م.أ أكبر منها.',
            'Before you start a problem, ask yourself: do I have to share into equal parts (divisors: GCD) or am I looking for when something will coincide again (multiples: LCM)? The words of the question help. The GCD comes out smaller than the data; the LCM, bigger.'
        ),
        examplePrompt: say(
            'Arotz batek 120 cm eta 150 cm-ko listoiak ditu, eta zati berdinetan moztu nahi ditu, ahalik eta luzeenak, ezer soberan geratu gabe. Zenbat izango da zati bakoitza?',
            'Un carpintero tiene listones de 120 cm y 150 cm y quiere cortarlos en trozos iguales, lo más largos posible, sin que sobre nada. ¿Cuánto medirá cada trozo?',
            'لدى نجّار ألواح طولها 120 سم و150 سم، ويريد قطعها إلى قطع متساوية بأطول ما يمكن دون أن يبقى شيء. كم طول كل قطعة؟',
            'A carpenter has strips of 120 cm and 150 cm and wants to cut them into equal pieces, as long as possible, with nothing left over. How long will each piece be?'
        ),
        example: notation('$@GCD(120,150)=30$'),
        exampleAnswer: say('Zati berdinetan banatzea da: ZKH. Zati bakoitzak 30 cm izango ditu.', 'Es un reparto en partes iguales: m.c.d. Cada trozo medirá 30 cm.', 'إنه تقسيم إلى أجزاء متساوية: ق.م.أ. وطول كل قطعة 30 سم.', 'It is sharing into equal parts: GCD. Each piece will be 30 cm.')
    },
    method: {
        vocabulary: [
            say('urratsa', 'paso', 'خطوة', 'step'),
            say('interpretatu', 'interpretar', 'فسّر', 'interpret'),
            say('unitateak', 'unidades', 'الوحدات', 'units')
        ],
        explanation: say(
            'Jarraitu lau urratsak: erabaki ZKH ala MKT behar den, faktorizatu, kalkulatu eta interpretatu emaitza, esaldi batekin eta unitateekin.',
            'Sigue los cuatro pasos: decide si hace falta el m.c.d. o el m.c.m., factoriza, calcula e interpreta el resultado con una frase y con unidades.',
            'اتبع الخطوات الأربع: قرّر هل تحتاج إلى ق.م.أ أم م.م.أ، ثم حلّل، ثم احسب، ثم فسّر النتيجة بجملة وبالوحدات.',
            'Follow the four steps: decide whether you need the GCD or the LCM, factorise, calculate, and interpret the result in a sentence with units.'
        ),
        examplePrompt: say(
            'Bola batzuek 4 mm, 6 mm eta 8 mm dituzte. Kolore bakoitzeko ilarekin, zein da hirurak bat datozen luzera txikiena?',
            'Unas bolas miden 4 mm, 6 mm y 8 mm. Con hileras de cada color, ¿cuál es la menor longitud en la que coinciden las tres?',
            'أقطار بعض الكرات 4 مم و6 مم و8 مم. بصفوف من كل لون، ما أصغر طول تتطابق فيه الصفوف الثلاثة؟',
            'Some beads measure 4 mm, 6 mm and 8 mm. With rows of each colour, what is the shortest length at which all three match up?'
        ),
        example: notation('$@LCM(4,6,8)=2^{3}\\cdot 3=24\\ \\text{mm}$'),
        exampleAnswer: say('MKT bat da: ilarak 24 mm-tan datoz bat lehen aldiz.', 'Es un m.c.m.: las hileras coinciden por primera vez a los 24 mm.', 'إنه م.م.أ: تتطابق الصفوف أول مرة عند 24 مم.', 'It is an LCM: the rows match up for the first time at 24 mm.')
    }
}
