import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { EquationTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Ekuazioak · 2. DBH — what each lesson tells: the new words (definitions),
   a short explanation, its cases as cards and the example as an exercise
   («Another example», or «Example» in the lessons of facts). Plain data so
   the tests can import it; lessons.tsx merges it into the topics. The
   example uses equations of its own, never those of «Let's solve», of
   «Check it» or of the typical mistake; the test checks that each solution
   it gives satisfies the equation. m.c.m. / MKT / LCM stay in the words.
   Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

/** As in lessonChecks.ts, the Arabic formulas get a decimal point */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const equationLessonTexts: Record<EquationTopicId, LessonTexts> = {
    /* ---------- 1. Equations ---------- */
    meaning: {
        vocabulary: [
            say('ebazpena', 'solución', 'الحل', 'solution'),
            say('bi atalak', 'los dos miembros', 'الطرفان', 'both sides')
        ],
        definitions: [
            {
                term: say('Identitatea', 'Identidad', 'المتطابقة', 'Identity'),
                meaning: say('Letren edozein baliotarako betetzen den berdintza, $2(x+1)=2x+2$ bezala.', 'Una igualdad que se cumple para cualquier valor de las letras, como $2(x+1)=2x+2$.', 'مساواة تتحقق لأي قيمة للحروف، مثل $2(x+1)=2x+2$.', 'An equality that holds for any value of the letters, like $2(x+1)=2x+2$.')
            },
            {
                term: say('Ekuazioa', 'Ecuación', 'المعادلة', 'Equation'),
                meaning: say('Ezezagunaren balio batzuetarako bakarrik betetzen den berdintza: haren ebazpenetarako.', 'Una igualdad que solo se cumple para algunos valores de la incógnita: sus soluciones.', 'مساواة لا تتحقق إلا لبعض قيم المجهول: وهي حلولها.', 'An equality that only holds for some values of the unknown: its solutions.')
            }
        ],
        explanation: say(
            'Balio bat ebazpena den jakiteko, ordeztu ekuazioan eta begiratu bi atalek balio bera ematen duten. Edozein baliorekin berdina ematen badute, identitate bat da.',
            'Para saber si un valor es solución, sustitúyelo en la ecuación y mira si los dos miembros dan lo mismo. Si dan lo mismo con cualquier valor, es una identidad.',
            'لمعرفة هل قيمة ما حل، عوّضها في المعادلة وانظر هل يعطي الطرفان الشيء نفسه. وإذا أعطيا الشيء نفسه مع أي قيمة فهي متطابقة.',
            'To find out whether a value is a solution, substitute it into the equation and see whether both sides give the same result. If they do for any value, it is an identity.'
        ),
        examplePrompt: say('$x=4$ balioa $3x-2=x+6$ ekuazioaren ebazpena da?', '¿Es $x=4$ solución de $3x-2=x+6$?', 'هل $x=4$ حل للمعادلة $3x-2=x+6$؟', 'Is $x=4$ a solution of $3x-2=x+6$?'),
        example: same('$\\begin{gathered}3\\cdot 4-2=10\\\\4+6=10\\end{gathered}$'),
        exampleAnswer: say('Bai: bi atalek 10 ematen dute.', 'Sí: los dos miembros dan 10.', 'نعم: يعطي الطرفان 10.', 'Yes: both sides give 10.')
    },
    elements: {
        vocabulary: [
            say('gaiak pasatu', 'pasar términos', 'نقل الحدود', 'move terms'),
            say('zenbaki bera', 'mismo número', 'العدد نفسه', 'same number')
        ],
        definitions: [
            {
                term: say('Atalak eta gaiak', 'Miembros y términos', 'الطرفان والحدود', 'Sides and terms'),
                meaning: say('Atalak = ikurraren bi aldeak dira; gaiak, atal bakoitzeko batugaiak.', 'Los miembros son los dos lados del signo =; los términos, los sumandos de cada miembro.', 'الطرفان هما جانبا الإشارة =، والحدود هي مجاميع كل طرف.', 'The sides are the two halves on either side of the = sign; the terms are the parts added on each side.')
            },
            {
                term: say('Ezezaguna eta maila', 'Incógnita y grado', 'المجهول والدرجة', 'Unknown and degree'),
                meaning: say('Ezezaguna letra da; maila, haren berretzailerik handiena.', 'La incógnita es la letra; el grado, su mayor exponente.', 'المجهول هو الحرف، والدرجة أكبر أس له.', 'The unknown is the letter; the degree, its highest exponent.')
            },
            {
                term: say('Ekuazio baliokideak', 'Ecuaciones equivalentes', 'المعادلات المتكافئة', 'Equivalent equations'),
                meaning: say('Ebazpen bera duten ekuazioak.', 'Las que tienen la misma solución.', 'المعادلات التي لها الحل نفسه.', 'Equations that have the same solution.')
            }
        ],
        explanation: say(
            'Ekuazio baliokide bat lortzen da bi ataletan zenbaki bera batuz edo kenduz, edo bi atalak 0 ez den zenbaki berarekin biderkatuz edo zatituz. Horregatik pasa daitezke gaiak atal batetik bestera.',
            'Se obtiene una ecuación equivalente sumando o restando el mismo número en los dos miembros, o multiplicándolos o dividiéndolos por el mismo número distinto de 0. Por eso se pueden pasar términos de un miembro a otro.',
            'نحصل على معادلة مكافئة بجمع العدد نفسه أو طرحه في الطرفين، أو بضربهما أو قسمتهما على العدد نفسه غير الصفري. لذلك يمكن نقل الحدود من طرف إلى آخر.',
            'You get an equivalent equation by adding or subtracting the same number on both sides, or by multiplying or dividing both by the same non-zero number. That is why terms can move from one side to the other.'
        ),
        examplePrompt: say('$2x-3=7$ eta $x+4=9$ baliokideak dira?', '¿Son equivalentes $2x-3=7$ y $x+4=9$?', 'هل المعادلتان $2x-3=7$ و$x+4=9$ متكافئتان؟', 'Are $2x-3=7$ and $x+4=9$ equivalent?'),
        example: same('$\\begin{gathered}2x-3=7\\ \\to\\ 2x=10\\ \\to\\ x=5\\\\x+4=9\\ \\to\\ x=5\\end{gathered}$'),
        exampleAnswer: say('Bai: biek $x=5$ ebazpena dute.', 'Sí: las dos tienen la solución $x=5$.', 'نعم: لكلتيهما الحل $x=5$.', 'Yes: both have the solution $x=5$.')
    },
    simple: {
        vocabulary: [
            say('koefizientea', 'coeficiente', 'المعامل', 'coefficient'),
            say('askatu', 'despejar', 'عزل', 'solve for x'),
            say('zeinua', 'signo', 'الإشارة', 'sign')
        ],
        why: {
            text: say(
                'Ekuazio bat balantza bat bezalakoa da: bi plateretatik gauza bera kentzen baduzu, orekan jarraitzen du. $x+5=12$ ekuazioan, bi ataletan 5 kenduta $x=12-5$ geratzen da: badirudi 5 zenbakia beste aldera «pasatzen» dela zeinuz aldatuta, baina bi ataletako kenketa bat da.',
                'Una ecuación es como una balanza: si quitas lo mismo de los dos platos, sigue equilibrada. En $x+5=12$, restar 5 en los dos miembros da $x=12-5$: parece que el 5 «pasa» al otro lado cambiando de signo, pero es una resta en los dos miembros.',
                'المعادلة مثل الميزان: إذا أخذت الشيء نفسه من الكفّتين بقي متوازنًا. في $x+5=12$ يعطي طرح 5 من الطرفين $x=12-5$: يبدو أن 5 «ينتقل» إلى الطرف الآخر ويغيّر إشارته، لكنه في الحقيقة طرح من الطرفين.',
                'An equation is like a balance: if you take the same off both pans, it stays level. In $x+5=12$, subtracting 5 on both sides gives $x=12-5$: it looks as if the 5 «moves» to the other side and changes sign, but it is a subtraction on both sides.'
            ),
            math: same('$\\begin{aligned}x+5&=12\\\\x+5-5&=12-5\\\\x&=7\\end{aligned}$')
        },
        explanation: say(
            'Bildu x duten gaiak atal batean eta zenbakiak bestean: atalez aldatzen den gaiak zeinua aldatzen du. Laburtu bi atalak eta askatu x: x-ren koefizientea zatitzen pasatzen da, bere zeinuarekin.',
            'Agrupa los términos con x en un miembro y los números en el otro: el término que cambia de miembro cambia de signo. Reduce los dos miembros y despeja x: el coeficiente de x pasa dividiendo, con su signo.',
            'اجمع حدود x في طرف والأعداد في الآخر: الحد الذي ينتقل من طرف إلى آخر تتغيّر إشارته. بسّط الطرفين واعزل x: ينتقل معامل x قاسمًا بإشارته.',
            'Group the terms with x on one side and the numbers on the other: a term that changes side changes sign. Simplify both sides and solve for x: the coefficient of x moves across, dividing, with its sign.'
        ),
        examplePrompt: say('Ebatzi $6x+2=3x-13$.', 'Resuelve $6x+2=3x-13$.', 'حلّ $6x+2=3x-13$.', 'Solve $6x+2=3x-13$.'),
        example: same('$\\begin{gathered}6x-3x=-13-2\\\\3x=-15\\ \\to\\ x=-5\\end{gathered}$'),
        exampleAnswer: say('$x=-5$. Egiaztatu: $6\\cdot(-5)+2=-28$ eta $3\\cdot(-5)-13=-28$.', '$x=-5$. Comprueba: $6\\cdot(-5)+2=-28$ y $3\\cdot(-5)-13=-28$.', '$x=-5$. تحقّق: $6\\cdot(-5)+2=-28$ و$3\\cdot(-5)-13=-28$.', '$x=-5$. Check: $6\\cdot(-5)+2=-28$ and $3\\cdot(-5)-13=-28$.')
    },
    brackets: {
        vocabulary: [
            say('banatze-propietatea', 'propiedad distributiva', 'خاصية التوزيع', 'distributive property'),
            say('minus zeinua', 'signo menos', 'إشارة السالب', 'minus sign')
        ],
        explanation: say(
            'Lehenik kendu parentesiak banaketa-propietatearekin. Kontuz minus zeinuarekin: parentesiaren aurrean minus bat badago, barruko gai guztiek zeinua aldatzen dute. Gero bildu, laburtu, askatu x eta egiaztatu.',
            'Primero quita los paréntesis con la propiedad distributiva. Cuidado con el signo menos: si hay un menos delante del paréntesis, todos los términos de dentro cambian de signo. Después agrupa, reduce, despeja x y comprueba.',
            'احذف الأقواس أولًا بخاصية التوزيع. وانتبه لإشارة الناقص: إذا سبق القوسَ ناقصٌ تتغيّر إشارة كل الحدود داخله. ثم اجمع وبسّط واعزل x وتحقّق.',
            'First remove the brackets with the distributive property. Careful with the minus sign: if there is a minus in front of a bracket, every term inside changes sign. Then group, simplify, solve for x and check.'
        ),
        examplePrompt: say('Ebatzi $4(x-1)-2(x+3)=6$.', 'Resuelve $4(x-1)-2(x+3)=6$.', 'حلّ $4(x-1)-2(x+3)=6$.', 'Solve $4(x-1)-2(x+3)=6$.'),
        example: same('$\\begin{gathered}4x-4-2x-6=6\\\\2x=16\\ \\to\\ x=8\\end{gathered}$'),
        exampleAnswer: say('$x=8$. Egiaztatu: $4\\cdot 7-2\\cdot 11=28-22=6$.', '$x=8$. Comprueba: $4\\cdot 7-2\\cdot 11=28-22=6$.', '$x=8$. تحقّق: $4\\cdot 7-2\\cdot 11=28-22=6$.', '$x=8$. Check: $4\\cdot 7-2\\cdot 11=28-22=6$.')
    },
    special: {
        vocabulary: [
            say('ebazpenik gabe', 'sin solución', 'بلا حل', 'no solution'),
            say('infinitu ebazpen', 'infinitas soluciones', 'عدد لا نهائي من الحلول', 'infinitely many solutions')
        ],
        explanation: say(
            'Batzuetan, laburtzean x desagertu egiten da. $0x=5$ bezalako zerbait geratzen bada, ez dago ebazpenik: ezein zenbaki bider 0 ez da 5. $0x=0$ geratzen bada, edozein zenbaki da ebazpena: identitate bat da.',
            'A veces, al reducir, la x desaparece. Si queda algo como $0x=5$, no hay solución: ningún número por 0 da 5. Si queda $0x=0$, cualquier número es solución: es una identidad.',
            'أحيانًا تختفي x عند التبسيط. فإذا بقي شيء مثل $0x=5$ فلا حل: لا عدد مضروبًا في 0 يعطي 5. وإذا بقي $0x=0$ فكل عدد حل: إنها متطابقة.',
            'Sometimes, when you simplify, the x disappears. If you are left with something like $0x=5$, there is no solution: no number times 0 gives 5. If you are left with $0x=0$, every number is a solution: it is an identity.'
        ),
        examplePrompt: say('Zenbat ebazpen ditu $4(x-2)=4x-8$ ekuazioak? Eta $5x+1=5x-3$ ekuazioak?', '¿Cuántas soluciones tiene $4(x-2)=4x-8$? ¿Y $5x+1=5x-3$?', 'كم حلًا للمعادلة $4(x-2)=4x-8$؟ وللمعادلة $5x+1=5x-3$؟', 'How many solutions does $4(x-2)=4x-8$ have? And $5x+1=5x-3$?'),
        example: same('$\\begin{gathered}4x-8=4x-8\\ \\to\\ 0x=0\\\\0x=-4\\end{gathered}$'),
        exampleAnswer: say('Lehenak infinitu: identitate bat da. Bigarrenak, bat ere ez.', 'La primera, infinitas: es una identidad. La segunda, ninguna.', 'الأولى لها حلول لا نهائية: إنها متطابقة. والثانية لا حل لها.', 'The first, infinitely many: it is an identity. The second, none.')
    },

    /* ---------- 2. Denominators ---------- */
    denominators: {
        vocabulary: [
            say('izendatzailea', 'denominador', 'المقام', 'denominator'),
            say('zatikia', 'fracción', 'الكسر', 'fraction')
        ],
        explanation: say(
            'Izendatzaile bat dagoenean, biderkatu bi atalak, gai guztiak, izendatzaile horrekin: zatikirik gabeko ekuazio baliokide bat ateratzen da. Beste modu bat: lehenik askatu zatikia eta gero biderkatu.',
            'Cuando hay un denominador, multiplica los dos miembros, todos los términos, por ese denominador: sale una ecuación equivalente sin fracciones. Otra forma: primero despeja la fracción y después multiplica.',
            'عندما يوجد مقام اضرب الطرفين، كل الحدود، فيه: فتنتج معادلة مكافئة بلا كسور. وطريقة أخرى: اعزل الكسر أولًا ثم اضرب.',
            'When there is a denominator, multiply both sides, every term, by that denominator: you get an equivalent equation with no fractions. Another way: first solve for the fraction, then multiply.'
        ),
        examplePrompt: say('Ebatzi $\\frac{3x}{4}-2=7$.', 'Resuelve $\\frac{3x}{4}-2=7$.', 'حلّ $\\frac{3x}{4}-2=7$.', 'Solve $\\frac{3x}{4}-2=7$.'),
        example: same('$\\begin{gathered}3x-8=28\\\\3x=36\\ \\to\\ x=12\\end{gathered}$'),
        exampleAnswer: say('$x=12$: 2 zenbakia ere 4 zenbakiarekin biderkatzen da.', '$x=12$: también el 2 se multiplica por 4.', '$x=12$: ويُضرب العدد 2 أيضًا في 4.', '$x=12$: the 2 is multiplied by 4 too.')
    },
    lcm: {
        vocabulary: [
            say('zenbakitzailea', 'numerador', 'البسط', 'numerator'),
            say('zatikirik gabe', 'sin fracciones', 'بلا كسور', 'without fractions')
        ],
        explanation: say(
            'Izendatzaile bat baino gehiago daudenean, kalkulatu haien MKT eta biderkatu gai guztiak harekin. Zatiki bakoitzean, MKT zati izendatzaileak esaten du zenbakitzailea zenbatekin biderkatzen den. Horrela, zatikirik gabeko ekuazio bat geratzen da.',
            'Cuando hay varios denominadores, calcula su m.c.m. y multiplica todos los términos por él. En cada fracción, el m.c.m. entre el denominador dice por cuánto se multiplica el numerador. Así queda una ecuación sin fracciones.',
            'عندما توجد عدة مقامات احسب م.م.أ لها واضرب كل الحدود فيه. في كل كسر يبيّن م.م.أ مقسومًا على المقام في كم نضرب البسط. فتبقى معادلة بلا كسور.',
            'When there are several denominators, work out their LCM and multiply every term by it. For each fraction, the LCM divided by the denominator tells you what to multiply the numerator by. That leaves an equation with no fractions.'
        ),
        examplePrompt: say('Ebatzi $\\frac{x}{3}+\\frac{x}{6}=4$.', 'Resuelve $\\frac{x}{3}+\\frac{x}{6}=4$.', 'حلّ $\\frac{x}{3}+\\frac{x}{6}=4$.', 'Solve $\\frac{x}{3}+\\frac{x}{6}=4$.'),
        example: same('$\\begin{gathered}2x+x=24\\\\3x=24\\ \\to\\ x=8\\end{gathered}$'),
        exampleAnswer: say('MKT 6 da: $6\\mathbin{:}3=2$ eta $6\\mathbin{:}6=1$.', 'El m.c.m. es 6: $6\\mathbin{:}3=2$ y $6\\mathbin{:}6=1$.', 'م.م.أ هو 6: $6\\mathbin{:}3=2$ و$6\\mathbin{:}6=1$.', 'The LCM is 6: $6\\mathbin{:}3=2$ and $6\\mathbin{:}6=1$.')
    },
    mixed: {
        vocabulary: [
            say('zenbakitzailea', 'numerador', 'البسط', 'numerator'),
            say('parentesia', 'paréntesis', 'القوس', 'brackets')
        ],
        explanation: say(
            'Zatiki baten zenbakitzaileak gai bat baino gehiago baditu, pentsatu parentesi artean dagoela. Horregatik, zatikiaren aurrean minus bat badago, MKT balioarekin biderkatzean zenbakitzaileko gai guztiek zeinua aldatzen dute.',
            'Si el numerador de una fracción tiene varios términos, piensa que está entre paréntesis. Por eso, si delante de la fracción hay un menos, al multiplicar por el m.c.m. cambian de signo todos los términos del numerador.',
            'إذا كان لبسط الكسر عدة حدود فاعتبره بين قوسين. لذلك إذا سبق الكسرَ ناقصٌ تتغيّر عند الضرب في م.م.أ إشارة كل حدود البسط.',
            'If the numerator of a fraction has several terms, think of it as being in brackets. That is why, if there is a minus in front of the fraction, all the terms of the numerator change sign when you multiply by the LCM.'
        ),
        examplePrompt: say('Ebatzi $\\frac{x+4}{3}-\\frac{x-2}{6}=2$.', 'Resuelve $\\frac{x+4}{3}-\\frac{x-2}{6}=2$.', 'حلّ $\\frac{x+4}{3}-\\frac{x-2}{6}=2$.', 'Solve $\\frac{x+4}{3}-\\frac{x-2}{6}=2$.'),
        example: same('$\\begin{gathered}2(x+4)-(x-2)=12\\\\2x+8-x+2=12\\ \\to\\ x=2\\end{gathered}$'),
        exampleAnswer: say('$x=2$. Egiaztatu: $\\frac{6}{3}-\\frac{0}{6}=2$.', '$x=2$. Comprueba: $\\frac{6}{3}-\\frac{0}{6}=2$.', '$x=2$. تحقّق: $\\frac{6}{3}-\\frac{0}{6}=2$.', '$x=2$. Check: $\\frac{6}{3}-\\frac{0}{6}=2$.')
    },

    /* ---------- 3. Problems ---------- */
    'problem-steps': {
        vocabulary: [
            say('enuntziatua', 'enunciado', 'نص المسألة', 'statement'),
            say('planteatu', 'plantear', 'اكتب المعادلة', 'set up'),
            say('egiaztatu', 'comprobar', 'تحقّق', 'check')
        ],
        why: {
            text: say(
                'Ekuazioa gaizki planteatzen baduzu, haren ebazpenak bete egiten du hala ere, eta ekuazioan egiaztatzeak ez du akatsa agerian uzten. Enuntziatuak bakarrik esaten du zenbakiak galderari erantzuten dion: adin bat ezin da negatiboa izan, adibidez, ezta pertsona kopuru bat hamartarra ere.',
                'Si planteas mal la ecuación, su solución la cumple igual, y comprobarla en la ecuación no descubre el error. Solo el enunciado dice si el número responde a la pregunta: una edad no puede ser negativa, por ejemplo, ni un número de personas puede tener decimales.',
                'إذا أخطأت في كتابة المعادلة فإن حلها يحققها مع ذلك، والتحقق في المعادلة لا يكشف الخطأ. وحده نص المسألة يخبرك إن كان العدد يجيب عن السؤال: فالعمر مثلًا لا يكون سالبًا، وعدد الأشخاص لا يكون عددًا عشريًا.',
                'If you set up the equation wrongly, its solution still satisfies it, and checking it in the equation does not show the mistake. Only the statement tells you whether the number answers the question: an age cannot be negative, for example, and a number of people cannot be a decimal.'
            )
        },
        explanation: say(
            'Buruketa bat ekuazio batekin ebazteko: ulertu enuntziatua eta erabaki zer izango den x; idatzi datuak x-rekin eta planteatu ekuazioa; ebatzi; eta egiaztatu emaitza enuntziatuan, ez ekuazioan bakarrik. Erantzun esaldi batekin.',
            'Para resolver un problema con una ecuación: comprende el enunciado y decide qué será x; escribe los datos con x y plantea la ecuación; resuélvela; y comprueba el resultado en el enunciado, no solo en la ecuación. Responde con una frase.',
            'لحل مسألة بمعادلة: افهم النص وحدّد ما سيكون x، واكتب المعطيات بدلالة x وصُغ المعادلة، ثم حلّها، وتحقّق من النتيجة في النص لا في المعادلة فقط. وأجب بجملة.',
            'To solve a problem with an equation: understand the problem and decide what x will be; write the data with x and set up the equation; solve it; and check the result in the problem, not just in the equation. Answer in a sentence.'
        ),
        examplePrompt: say('Zenbaki baten bikoitzari 7 gehituta, 31 ateratzen da. Zein da zenbakia?', 'El doble de un número más 7 es igual a 31. ¿Qué número es?', 'ضعف عدد مضافًا إليه 7 يساوي 31. ما العدد؟', 'Twice a number plus 7 equals 31. What is the number?'),
        example: same('$\\begin{gathered}2x+7=31\\\\2x=24\\ \\to\\ x=12\\end{gathered}$'),
        exampleAnswer: say('Zenbakia 12 da. Egiaztatu enuntziatuan: $2\\cdot 12+7=31$.', 'El número es 12. Comprueba en el enunciado: $2\\cdot 12+7=31$.', 'العدد هو 12. تحقّق في النص: $2\\cdot 12+7=31$.', 'The number is 12. Check it in the problem: $2\\cdot 12+7=31$.')
    },
    'problems-ages': {
        vocabulary: [
            say('adina', 'edad', 'العمر', 'age'),
            say('prezioa', 'precio', 'السعر', 'price'),
            say('taula', 'tabla', 'الجدول', 'table')
        ],
        explanation: say(
            'Adin-buruketetan taula bat lagungarria da: gaur, duela $n$ urte eta hemendik $n$ urtera; urteak berdin igarotzen dira pertsona guztientzat. Prezio-buruketetan, idatzi gauza bakoitzaren prezioa x-rekin eta batu kopurua bider prezioa.',
            'En los problemas de edades ayuda una tabla con hoy, hace $n$ años y dentro de $n$ años: los años pasan igual para todas las personas. En los de precios, escribe el precio de cada cosa con x y suma cantidad por precio.',
            'في مسائل الأعمار يساعد جدول فيه اليوم وقبل $n$ سنة وبعد $n$ سنة: فالسنوات تمر على الجميع بالتساوي. وفي مسائل الأسعار اكتب سعر كل شيء بدلالة x واجمع الكمية في السعر.',
            'In age problems a table helps, with today, $n$ years ago and in $n$ years: the years go by the same for everyone. In price problems, write the price of each thing with x and add up quantity times price.'
        ),
        examplePrompt: say(
            'Ogitarteko batek zuku batek baino 1,50 € gehiago balio du. 3 ogitarteko eta 2 zuku 13 € dira. Zenbat balio du zukuak?',
            'Un bocadillo cuesta 1,50 € más que un zumo. Por 3 bocadillos y 2 zumos se pagan 13 €. ¿Cuánto cuesta el zumo?',
            'ثمن الشطيرة يزيد 1.50 € على ثمن العصير. ودُفع 13 € مقابل 3 شطائر وعصيرين. كم ثمن العصير؟',
            'A sandwich costs €1.50 more than a juice. 3 sandwiches and 2 juices cost €13. How much is the juice?'
        ),
        example: same('$\\begin{gathered}3(x+1{,}5)+2x=13\\\\5x+4{,}5=13\\ \\to\\ x=1{,}7\\end{gathered}$'),
        exampleAnswer: say('Zukuak 1,70 € balio du, eta ogitartekoak 3,20 €.', 'El zumo cuesta 1,70 € y el bocadillo, 3,20 €.', 'ثمن العصير 1.70 € وثمن الشطيرة 3.20 €.', 'The juice costs €1.70 and the sandwich €3.20.')
    },
    'problems-geometry': {
        vocabulary: [
            say('zenbaki jarraituak', 'números consecutivos', 'الأعداد المتتالية', 'consecutive numbers'),
            say('osoa', 'total', 'الكل', 'whole'),
            say('aldea', 'lado', 'الضلع', 'side')
        ],
        explanation: say(
            'Geometrian, marraztu irudia eta idatzi alde bakoitza x-rekin. Zenbaki jarraituak $x$, $x+1$, $x+2$ dira. Osoaren zatiak badira (heren bat, laurden bat…), x osoa da eta zatiak $\\frac{x}{3}$, $\\frac{x}{4}$…: guztiek osoa osatzen dute.',
            'En geometría, dibuja la figura y escribe cada lado con x. Los números consecutivos son $x$, $x+1$, $x+2$. Si son partes de un total (un tercio, un cuarto…), x es el total y las partes, $\\frac{x}{3}$, $\\frac{x}{4}$…: entre todas forman el total.',
            'في الهندسة ارسم الشكل واكتب كل ضلع بدلالة x. والأعداد المتتالية هي $x$ و$x+1$ و$x+2$. وإذا كانت أجزاء من كل (ثلث، ربع…) فـx هو الكل والأجزاء $\\frac{x}{3}$ و$\\frac{x}{4}$…: ومجموعها هو الكل.',
            'In geometry, draw the figure and write each side with x. Consecutive numbers are $x$, $x+1$, $x+2$. If they are parts of a whole (a third, a quarter…), x is the whole and the parts are $\\frac{x}{3}$, $\\frac{x}{4}$…: together they make the whole.'
        ),
        examplePrompt: say(
            'Anek bere pagaren erdia arropan gastatzen du eta laurdena liburuetan, eta 15 € geratzen zaizkio. Zenbat zen paga?',
            'Ane gasta la mitad de su paga en ropa y la cuarta parte en libros, y le quedan 15 €. ¿Cuánto era la paga?',
            'تنفق آنه نصف مصروفها على الملابس وربعه على الكتب، ويبقى لها 15 €. كم كان المصروف؟',
            'Ane spends half of her pocket money on clothes and a quarter on books, and has €15 left. How much was the pocket money?'
        ),
        example: same('$\\begin{gathered}\\frac{x}{2}+\\frac{x}{4}+15=x\\\\2x+x+60=4x\\ \\to\\ x=60\\end{gathered}$'),
        exampleAnswer: say('Paga 60 € zen: 30 € arropan, 15 € liburuetan, eta 15 € geratzen dira.', 'La paga era de 60 €: 30 € en ropa, 15 € en libros y le quedan 15 €.', 'كان المصروف 60 €: 30 € للملابس و15 € للكتب ويبقى 15 €.', 'It was €60: €30 on clothes, €15 on books and €15 left.')
    },

    /* ---------- 4. Second degree ---------- */
    quadratic: {
        vocabulary: [
            say('ordenatu', 'ordenar', 'رتّب', 'order'),
            say('maila', 'grado', 'الدرجة', 'degree')
        ],
        definitions: [
            {
                term: say('Bigarren mailako ekuazioa', 'Ecuación de segundo grado', 'معادلة الدرجة الثانية', 'Quadratic equation'),
                meaning: say(
                    '$ax^{2}+bx+c=0$ forman idatz daitekeena, $a\\neq 0$ izanik. Bi ebazpen izan ditzake, bat edo bat ere ez.',
                    'La que se puede escribir como $ax^{2}+bx+c=0$, con $a\\neq 0$. Puede tener dos soluciones, una o ninguna.',
                    'المعادلة التي يمكن كتابتها $ax^{2}+bx+c=0$ مع $a\\neq 0$. وقد يكون لها حلان أو حل واحد أو لا حل.',
                    'One that can be written as $ax^{2}+bx+c=0$, with $a\\neq 0$. It can have two solutions, one or none.'
                )
            }
        ],
        explanation: say(
            'Ebatzi aurretik, eraman gai guztiak atal batera, laburtu eta ordenatu mailarik handienetik txikienera. Gero irakurri $a$, $b$ eta $c$, bakoitza bere zeinuarekin.',
            'Antes de resolverla, pasa todos los términos a un miembro, reduce y ordena de mayor a menor grado. Después lee $a$, $b$ y $c$, cada uno con su signo.',
            'قبل حلها انقل كل الحدود إلى طرف واحد وبسّط ورتّب من الدرجة الأعلى إلى الأدنى. ثم اقرأ $a$ و$b$ و$c$ كلًّا بإشارته.',
            'Before solving it, move all the terms to one side, simplify and order them from the highest degree to the lowest. Then read off $a$, $b$ and $c$, each with its sign.'
        ),
        examplePrompt: say('Idatzi forma orokorrean $4x=1-3x^{2}$, eta esan zenbat diren $a$, $b$ eta $c$.', 'Escribe en forma general $4x=1-3x^{2}$ y di cuánto valen $a$, $b$ y $c$.', 'اكتب $4x=1-3x^{2}$ بالصيغة العامة، وبيّن قيم $a$ و$b$ و$c$.', 'Write $4x=1-3x^{2}$ in general form and say what $a$, $b$ and $c$ are.'),
        example: same('$3x^{2}+4x-1=0$'),
        exampleAnswer: say('$a=3$, $b=4$ eta $c=-1$.', '$a=3$, $b=4$ y $c=-1$.', '$a=3$ و$b=4$ و$c=-1$.', '$a=3$, $b=4$ and $c=-1$.')
    },
    incomplete: {
        vocabulary: [
            say('faktore komuna', 'factor común', 'العامل المشترك', 'common factor'),
            say('erro karratua', 'raíz cuadrada', 'الجذر التربيعي', 'square root')
        ],
        why: {
            text: say(
                'Biderkadura batek 0 ematen badu, biderkagaietako batek 0 izan behar du: 0 ez diren bi zenbakik ez dute inoiz 0 ematen biderkatzean. Horregatik, faktore komuna ateratzean, $x(x-4)=0$ bi ekuaziotan banatzen da: $x=0$ edo $x-4=0$.',
                'Si un producto da 0, uno de los factores tiene que ser 0: dos números distintos de 0 nunca dan 0 al multiplicarse. Por eso, al sacar factor común, $x(x-4)=0$ se parte en dos ecuaciones: $x=0$ o $x-4=0$.',
                'إذا كان حاصل الضرب 0 فلا بد أن يكون أحد العاملين 0: فعددان غير صفريين لا يعطيان 0 أبدًا عند ضربهما. لذلك عند إخراج العامل المشترك تنقسم $x(x-4)=0$ إلى معادلتين: $x=0$ أو $x-4=0$.',
                'If a product is 0, one of the factors has to be 0: two numbers that are not 0 never give 0 when multiplied. That is why, after taking out the common factor, $x(x-4)=0$ splits into two equations: $x=0$ or $x-4=0$.'
            ),
            math: same('$\\begin{gathered}x(x-4)=0\\\\x=0\\qquad x=4\\end{gathered}$')
        },
        explanation: say(
            'Ekuazio osatugabe batean gai bat falta da: x duena ($b=0$) edo zenbaki soltea ($c=0$). Formularik gabe ebazten dira:',
            'En una ecuación incompleta falta un término: el de la x ($b=0$) o el número suelto ($c=0$). Se resuelven sin fórmula:',
            'في المعادلة الناقصة يغيب حد: حد x ($b=0$) أو العدد الحر ($c=0$). وتُحل دون صيغة:',
            'In an incomplete equation one term is missing: the x term ($b=0$) or the number on its own ($c=0$). They are solved without the formula:'
        ),
        cases: [
            {
                title: say('x gairik gabe', 'Sin término en x', 'دون حد x', 'No x term'),
                text: say('Askatu $x^{2}$ eta atera erroa: aurkako bi ebazpen, edo bat ere ez zenbakia negatiboa bada.', 'Despeja $x^{2}$ y haz la raíz: dos soluciones opuestas, o ninguna si el número es negativo.', 'اعزل $x^{2}$ وخذ الجذر: حلان متعاكسان، أو لا حل إذا كان العدد سالبًا.', 'Solve for $x^{2}$ and take the root: two opposite solutions, or none if the number is negative.'),
                math: same('$ax^{2}+c=0$')
            },
            {
                title: say('Zenbaki solterik gabe', 'Sin término independiente', 'دون حد مطلق', 'No number term'),
                text: say('Atera x faktore komun gisa: $x=0$, eta parentesia anulatzen duena.', 'Saca x factor común: $x=0$ y la que anula el paréntesis.', 'أخرج x عاملًا مشتركًا: $x=0$ والقيمة التي تجعل القوس صفرًا.', 'Take x out as a common factor: $x=0$ and the value that makes the bracket zero.'),
                math: same('$ax^{2}+bx=0$')
            }
        ],
        examplePrompt: say('Ebatzi $5x^{2}-80=0$ eta $3x^{2}+12x=0$.', 'Resuelve $5x^{2}-80=0$ y $3x^{2}+12x=0$.', 'حلّ $5x^{2}-80=0$ و$3x^{2}+12x=0$.', 'Solve $5x^{2}-80=0$ and $3x^{2}+12x=0$.'),
        example: same('$\\begin{gathered}x^{2}=16\\ \\to\\ x=\\pm 4\\\\3x(x+4)=0\\ \\to\\ x=0,\\ x=-4\\end{gathered}$'),
        exampleAnswer: say('Lehena: $x=4$ eta $x=-4$. Bigarrena: $x=0$ eta $x=-4$.', 'Primera: $x=4$ y $x=-4$. Segunda: $x=0$ y $x=-4$.', 'الأولى: $x=4$ و$x=-4$. الثانية: $x=0$ و$x=-4$.', 'First: $x=4$ and $x=-4$. Second: $x=0$ and $x=-4$.')
    },
    formula: {
        vocabulary: [
            say('erro karratua', 'raíz cuadrada', 'الجذر التربيعي', 'square root'),
            say('ebazpen bikoitza', 'solución doble', 'الحل المضاعف', 'double solution')
        ],
        definitions: [
            {
                term: say('Diskriminatzailea', 'Discriminante', 'المميّز', 'Discriminant'),
                meaning: say('$\\Delta=b^{2}-4ac$, erroaren barrukoa: zenbat ebazpen dauden esaten du.', '$\\Delta=b^{2}-4ac$, lo de dentro de la raíz: dice cuántas soluciones hay.', '$\\Delta=b^{2}-4ac$، ما تحت الجذر: يبيّن عدد الحلول.', '$\\Delta=b^{2}-4ac$, what is under the root: it tells you how many solutions there are.')
            }
        ],
        why: {
            text: say(
                'Formulak $b^{2}-4ac$ adierazpenaren erro karratua hartzen du. Positiboa bada, erroa batu eta kendu egiten da: bi ebazpen. 0 bada, 0 batzea edo kentzea gauza bera da: ebazpen bat. Negatiboa bada, ez dago karratua negatiboa duen zenbakirik: ez dago ebazpenik.',
                'La fórmula toma la raíz cuadrada de $b^{2}-4ac$. Si es positivo, la raíz se suma y se resta: dos soluciones. Si es 0, sumar o restar 0 da lo mismo: una solución. Si es negativo, ningún número al cuadrado da un negativo: no hay solución.',
                'تأخذ الصيغة الجذر التربيعي لـ $b^{2}-4ac$. إذا كان موجبًا نجمع الجذر ونطرحه: حلّان. وإذا كان 0 فجمع 0 أو طرحه سواء: حل واحد. وإذا كان سالبًا فلا يوجد عدد مربعه سالب: لا حل.',
                'The formula takes the square root of $b^{2}-4ac$. If it is positive, the root is added and subtracted: two solutions. If it is 0, adding or subtracting 0 is the same: one solution. If it is negative, no number squared gives a negative: there is no solution.'
            ),
            math: same('$x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$')
        },
        explanation: say(
            '$ax^{2}+bx+c=0$ ekuazioaren ebazpenak formula honekin ateratzen dira: $x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$. Kalkulatu lehenik diskriminatzailea:',
            'Las soluciones de $ax^{2}+bx+c=0$ salen con la fórmula $x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$. Calcula primero el discriminante:',
            'تُستخرج حلول $ax^{2}+bx+c=0$ بالصيغة $x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$. احسب المميّز أولًا:',
            'The solutions of $ax^{2}+bx+c=0$ come from the formula $x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$. Work out the discriminant first:'
        ),
        cases: [
            { title: say('Positiboa', 'Positivo', 'موجب', 'Positive'), text: say('Bi ebazpen.', 'Dos soluciones.', 'حلان.', 'Two solutions.'), math: same('$\\Delta>0$') },
            { title: say('Zero', 'Cero', 'صفر', 'Zero'), text: say('Ebazpen bat (bikoitza).', 'Una solución (doble).', 'حل واحد (مضاعف).', 'One (double) solution.'), math: same('$\\Delta=0$') },
            { title: say('Negatiboa', 'Negativo', 'سالب', 'Negative'), text: say('Ebazpenik ez.', 'Ninguna solución.', 'لا حل.', 'No solution.'), math: same('$\\Delta<0$') }
        ],
        examplePrompt: say('Ebatzi $2x^{2}+x-6=0$.', 'Resuelve $2x^{2}+x-6=0$.', 'حلّ $2x^{2}+x-6=0$.', 'Solve $2x^{2}+x-6=0$.'),
        example: same('$\\begin{gathered}\\Delta=1^{2}-4\\cdot 2\\cdot(-6)=49\\\\x=\\frac{-1\\pm 7}{4}\\ \\to\\ x=\\frac{3}{2},\\ x=-2\\end{gathered}$'),
        exampleAnswer: say('Bi ebazpen, $\\Delta>0$ delako: $x=\\frac{3}{2}$ eta $x=-2$.', 'Dos soluciones, porque $\\Delta>0$: $x=\\frac{3}{2}$ y $x=-2$.', 'حلان، لأن $\\Delta>0$: $x=\\frac{3}{2}$ و$x=-2$.', 'Two solutions, because $\\Delta>0$: $x=\\frac{3}{2}$ and $x=-2$.')
    }
}
