import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Zenbaki errealak · 4. DBH aplikatuak — the typical mistake and the
   «Check it» question of every lesson. Plain data (no JSX) so the tests can
   import it; lessons.tsx merges it into the topics. The questions use new
   numbers, never those of «Let's solve» or of the example, and one of their
   wrong answers is the lesson's typical mistake. Decimals always go inside
   $…$, so English and Arabic get their decimal point. Tests in
   tests/lesson-checks.test.ts.
   ========================================================================== */

export type RealsTopicId = 'fraction-amount' | 'fraction-ops' | 'powers' | 'decimal-kinds' | 'exact-to-fraction' | 'periodic-to-fraction' | 'irrational' | 'number-sets' | 'real-line' | 'intervals' | 'rounding' | 'errors' | 'scientific' | 'scientific-ops' | 'roots' | 'radical-simplify' | 'radical-ops'

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

export const realsLessonChecks: Record<RealsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Rational numbers ---------- */
    'fraction-amount': {
        mistake: {
            wrong: say('90 zenbakiaren $\\frac{2}{3}$ hau da: $90\\div 2\\cdot 3=135$.', '$\\frac{2}{3}$ de 90 es $90\\div 2\\cdot 3=135$.', '$\\frac{2}{3}$ من 90 هو $90\\div 2\\cdot 3=135$.', '$\\frac{2}{3}$ of 90 is $90\\div 2\\cdot 3=135$.'),
            right: say('Izendatzaileaz zatitzen da eta zenbakitzaileaz biderkatzen: $90\\div 3\\cdot 2=60$.', 'Se divide entre el denominador y se multiplica por el numerador: $90\\div 3\\cdot 2=60$.', 'نقسم على المقام ونضرب في البسط: $90\\div 3\\cdot 2=60$.', 'You divide by the denominator and multiply by the numerator: $90\\div 3\\cdot 2=60$.')
        },
        check: {
            prompt: say('Zenbat da $240$ zenbakiaren $\\frac{3}{8}$?', '¿Cuánto es $\\frac{3}{8}$ de $240$?', 'كم يساوي $\\frac{3}{8}$ من $240$؟', 'What is $\\frac{3}{8}$ of $240$?'),
            options: [same('$640$'), same('$90$'), same('$80$')],
            correctIndex: 1,
            explanation: say('Izendatzaileaz zatitu eta zenbakitzaileaz biderkatu: $240\\div 8=30$ eta $30\\cdot 3=90$.', 'Divide entre el denominador y multiplica por el numerador: $240\\div 8=30$ y $30\\cdot 3=90$.', 'اقسم على المقام واضرب في البسط: $240\\div 8=30$ و$30\\cdot 3=90$.', 'Divide by the denominator and multiply by the numerator: $240\\div 8=30$ and $30\\cdot 3=90$.')
        }
    },
    'fraction-ops': {
        mistake: {
            wrong: same('$\\frac{1}{2}+\\frac{1}{3}=\\frac{2}{5}$'),
            right: say('Lehenik izendatzaile komuna: $\\frac{1}{2}+\\frac{1}{3}=\\frac{3}{6}+\\frac{2}{6}=\\frac{5}{6}$.', 'Primero un denominador común: $\\frac{1}{2}+\\frac{1}{3}=\\frac{3}{6}+\\frac{2}{6}=\\frac{5}{6}$.', 'أولًا مقام مشترك: $\\frac{1}{2}+\\frac{1}{3}=\\frac{3}{6}+\\frac{2}{6}=\\frac{5}{6}$.', 'First a common denominator: $\\frac{1}{2}+\\frac{1}{3}=\\frac{3}{6}+\\frac{2}{6}=\\frac{5}{6}$.')
        },
        check: {
            prompt: say('Kalkulatu $\\frac{2}{3}+\\frac{1}{4}$.', 'Calcula $\\frac{2}{3}+\\frac{1}{4}$.', 'احسب $\\frac{2}{3}+\\frac{1}{4}$.', 'Calculate $\\frac{2}{3}+\\frac{1}{4}$.'),
            options: [same('$\\frac{3}{7}$'), same('$\\frac{2}{12}$'), same('$\\frac{11}{12}$')],
            correctIndex: 2,
            explanation: say('Izendatzaile komuna 12 da: $\\frac{8}{12}+\\frac{3}{12}=\\frac{11}{12}$.', 'El denominador común es 12: $\\frac{8}{12}+\\frac{3}{12}=\\frac{11}{12}$.', 'المقام المشترك 12: $\\frac{8}{12}+\\frac{3}{12}=\\frac{11}{12}$.', 'The common denominator is 12: $\\frac{8}{12}+\\frac{3}{12}=\\frac{11}{12}$.')
        }
    },
    powers: {
        mistake: {
            wrong: same('$3^{-2}=-9$'),
            right: say('Berretzaile negatiboak ez du emaitza negatibo bihurtzen; alderantzizkoa adierazten du: $3^{-2}=\\frac{1}{3^{2}}=\\frac{1}{9}$.', 'El exponente negativo no hace negativo el resultado: indica el inverso, $3^{-2}=\\frac{1}{3^{2}}=\\frac{1}{9}$.', 'الأس السالب لا يجعل النتيجة سالبة، بل يدل على المقلوب: $3^{-2}=\\frac{1}{3^{2}}=\\frac{1}{9}$.', 'A negative exponent does not make the result negative: it means the reciprocal, $3^{-2}=\\frac{1}{3^{2}}=\\frac{1}{9}$.')
        },
        check: {
            prompt: say('Kalkulatu $\\left(\\frac{3}{4}\\right)^{-2}$.', 'Calcula $\\left(\\frac{3}{4}\\right)^{-2}$.', 'احسب $\\left(\\frac{3}{4}\\right)^{-2}$.', 'Calculate $\\left(\\frac{3}{4}\\right)^{-2}$.'),
            options: [same('$\\frac{16}{9}$'), same('$-\\frac{9}{16}$'), same('$\\frac{9}{16}$')],
            correctIndex: 0,
            explanation: say('Eman buelta zatikiari eta berretzailea positibo bihurtzen da: $\\left(\\frac{4}{3}\\right)^{2}=\\frac{16}{9}$.', 'Da la vuelta a la fracción y el exponente pasa a positivo: $\\left(\\frac{4}{3}\\right)^{2}=\\frac{16}{9}$.', 'اقلب الكسر فيصير الأس موجبًا: $\\left(\\frac{4}{3}\\right)^{2}=\\frac{16}{9}$.', 'Turn the fraction upside down and the exponent becomes positive: $\\left(\\frac{4}{3}\\right)^{2}=\\frac{16}{9}$.')
        }
    },
    /* ---------- 2. Decimals and fractions ---------- */
    'decimal-kinds': {
        mistake: {
            wrong: say('$0{,}4\\overline{7}$ periodiko hutsa da, periodoa duelako.', '$0{,}4\\overline{7}$ es periódico puro, porque tiene periodo.', '$0{,}4\\overline{7}$ دوري بحت لأن له دورًا.', '$0{,}4\\overline{7}$ is pure recurring, because it has a recurring part.'),
            right: say('Komaren eta periodoaren artean $4$ dago, aurreperiodoa: periodiko mistoa da.', 'Entre la coma y el periodo está el $4$, el anteperiodo: es periódico mixto.', 'بين الفاصلة والدور يوجد $4$، وهو ما قبل الدور: إنه دوري مختلط.', 'Between the decimal point and the recurring part there is a $4$, the non-recurring part: it is mixed recurring.')
        },
        check: {
            prompt: say('Zein zatikik ematen du hamartar zehatz bat?', '¿Qué fracción da un decimal exacto?', 'أيّ كسر يعطي عددًا عشريًا منتهيًا؟', 'Which fraction gives a terminating decimal?'),
            options: [same('$\\frac{5}{12}$'), same('$\\frac{7}{20}$'), same('$\\frac{4}{15}$')],
            correctIndex: 1,
            explanation: say('$20=2^{2}\\cdot 5$: 2 eta 5 bakarrik, beraz zehatza da, $\\frac{7}{20}=0{,}35$. $12$ eta $15$ zenbakiek 3 faktorea dute.', '$20=2^{2}\\cdot 5$: solo 2 y 5, así que es exacto, $\\frac{7}{20}=0{,}35$. $12$ y $15$ tienen el factor 3.', '$20=2^{2}\\cdot 5$: فيه 2 و5 فقط، فهو منتهٍ، $\\frac{7}{20}=0{,}35$. أما $12$ و$15$ ففيهما العامل 3.', '$20=2^{2}\\cdot 5$: only 2 and 5, so it terminates, $\\frac{7}{20}=0{,}35$. $12$ and $15$ have the factor 3.')
        }
    },
    'exact-to-fraction': {
        mistake: {
            wrong: same('$0{,}08=\\frac{8}{10}$'),
            right: say('$0{,}08$ zenbakiak bi hamartar ditu: bi zero, $\\frac{8}{100}=\\frac{2}{25}$.', '$0{,}08$ tiene dos decimales: dos ceros, $\\frac{8}{100}=\\frac{2}{25}$.', 'للعدد $0{,}08$ منزلتان عشريتان: صفران، $\\frac{8}{100}=\\frac{2}{25}$.', '$0{,}08$ has two decimal places: two zeros, $\\frac{8}{100}=\\frac{2}{25}$.')
        },
        check: {
            prompt: say('Idatzi $1{,}25$ zatiki laburtezin gisa.', 'Escribe $1{,}25$ como fracción irreducible.', 'اكتب $1{,}25$ كسرًا غير قابل للاختزال.', 'Write $1{,}25$ as a fraction in its simplest form.'),
            options: [same('$\\frac{125}{10}$'), same('$\\frac{25}{100}$'), same('$\\frac{5}{4}$')],
            correctIndex: 2,
            explanation: say('Bi hamartar, bi zero: $\\frac{125}{100}$. Sinplifikatu 25 zenbakiaz: $\\frac{5}{4}$.', 'Dos decimales, dos ceros: $\\frac{125}{100}$. Simplifica entre 25: $\\frac{5}{4}$.', 'منزلتان عشريتان، صفران: $\\frac{125}{100}$. بسّط بالقسمة على 25: $\\frac{5}{4}$.', 'Two decimal places, two zeros: $\\frac{125}{100}$. Simplify by 25: $\\frac{5}{4}$.')
        }
    },
    'periodic-to-fraction': {
        mistake: {
            wrong: same('$0{,}\\overline{4}=\\frac{4}{10}$'),
            right: say('Periodoak bederatziak eskatzen ditu, ez zeroak: $0{,}\\overline{4}=\\frac{4}{9}$. $\\frac{4}{10}$ zatikia $0{,}4$ da.', 'El periodo pide nueves, no ceros: $0{,}\\overline{4}=\\frac{4}{9}$. $\\frac{4}{10}$ es $0{,}4$.', 'الدور يحتاج إلى تسعات لا أصفار: $0{,}\\overline{4}=\\frac{4}{9}$. أما $\\frac{4}{10}$ فهو $0{,}4$.', 'The recurring part needs nines, not zeros: $0{,}\\overline{4}=\\frac{4}{9}$. $\\frac{4}{10}$ is $0{,}4$.')
        },
        check: {
            prompt: say('Zein da $0{,}\\overline{27}$ hamartarraren zatiki sortzailea?', '¿Cuál es la fracción generatriz de $0{,}\\overline{27}$?', 'ما الكسر المولّد للعدد $0{,}\\overline{27}$؟', 'What is the generating fraction of $0{,}\\overline{27}$?'),
            options: [same('$\\frac{27}{100}$'), same('$\\frac{3}{11}$'), same('$\\frac{27}{90}$')],
            correctIndex: 1,
            explanation: say('Periodoak bi zifra ditu: bi bederatzi. $\\frac{27}{99}=\\frac{3}{11}$.', 'El periodo tiene dos cifras: dos nueves. $\\frac{27}{99}=\\frac{3}{11}$.', 'في الدور رقمان: تسعتان. $\\frac{27}{99}=\\frac{3}{11}$.', 'The recurring part has two digits: two nines. $\\frac{27}{99}=\\frac{3}{11}$.')
        }
    },
    /* ---------- 3. Irrational numbers and the real line ---------- */
    irrational: {
        mistake: {
            wrong: say('$0{,}\\overline{12}$ irrazionala da, zifra hamartar infinitu dituelako.', '$0{,}\\overline{12}$ es irracional, porque tiene infinitas cifras decimales.', '$0{,}\\overline{12}$ غير نسبي لأن له عددًا لا نهائيًا من الأرقام العشرية.', '$0{,}\\overline{12}$ is irrational, because it has infinitely many decimal places.'),
            right: say('Periodoa du, beraz arrazionala da: $0{,}\\overline{12}=\\frac{12}{99}=\\frac{4}{33}$. Irrazionala infinitua eta periodorik gabea da.', 'Tiene periodo, así que es racional: $0{,}\\overline{12}=\\frac{12}{99}=\\frac{4}{33}$. Irracional es infinito y sin periodo.', 'له دور، فهو نسبي: $0{,}\\overline{12}=\\frac{12}{99}=\\frac{4}{33}$. غير النسبي لا نهائي وبلا دور.', 'It has a recurring part, so it is rational: $0{,}\\overline{12}=\\frac{12}{99}=\\frac{4}{33}$. An irrational number is infinite and never recurs.')
        },
        check: {
            prompt: say('Zenbaki hauetatik, zein da irrazionala?', '¿Cuál de estos números es irracional?', 'أيّ هذه الأعداد غير نسبي؟', 'Which of these numbers is irrational?'),
            options: [same('$\\sqrt{81}$'), same('$2{,}\\overline{5}$'), same('$\\sqrt{50}$')],
            correctIndex: 2,
            explanation: say('50 ez da karratu perfektua: $\\sqrt{50}=7{,}0710\\ldots$, periodorik gabe. $\\sqrt{81}=9$ eta $2{,}\\overline{5}$ periodikoa arrazionalak dira.', '50 no es cuadrado perfecto: $\\sqrt{50}=7{,}0710\\ldots$, sin periodo. $\\sqrt{81}=9$ y el periódico $2{,}\\overline{5}$ son racionales.', '50 ليس مربعًا كاملًا: $\\sqrt{50}=7{,}0710\\ldots$ بلا دور. أما $\\sqrt{81}=9$ والدوري $2{,}\\overline{5}$ فنسبيان.', '50 is not a perfect square: $\\sqrt{50}=7{,}0710\\ldots$, with no recurring part. $\\sqrt{81}=9$ and the recurring $2{,}\\overline{5}$ are rational.')
        }
    },
    'number-sets': {
        mistake: {
            wrong: say('$\\frac{10}{5}$ ez da osoa, zatiki bat delako.', '$\\frac{10}{5}$ no es entero, porque es una fracción.', '$\\frac{10}{5}$ ليس عددًا صحيحًا لأنه كسر.', '$\\frac{10}{5}$ is not an integer, because it is a fraction.'),
            right: say('Zatiki bat zenbaki oso bat izan daiteke: $\\frac{10}{5}=2\\in\\mathbb{N}$, eta $\\mathbb{Z}$, $\\mathbb{Q}$ eta $\\mathbb{R}$ multzoetan ere badago.', 'Una fracción puede ser un entero: $\\frac{10}{5}=2\\in\\mathbb{N}$, y también está en $\\mathbb{Z}$, $\\mathbb{Q}$ y $\\mathbb{R}$.', 'قد يكون الكسر عددًا صحيحًا: $\\frac{10}{5}=2\\in\\mathbb{N}$، وهو أيضًا في $\\mathbb{Z}$ و$\\mathbb{Q}$ و$\\mathbb{R}$.', 'A fraction can be an integer: $\\frac{10}{5}=2\\in\\mathbb{N}$, and it is also in $\\mathbb{Z}$, $\\mathbb{Q}$ and $\\mathbb{R}$.')
        },
        check: {
            prompt: say('Zein multzotakoa da $-7$?', '¿A qué conjuntos pertenece $-7$?', 'إلى أيّ المجموعات ينتمي $-7$؟', 'Which sets does $-7$ belong to?'),
            options: [
                say('$\\mathbb{Z}$ multzoari bakarrik', 'Solo a $\\mathbb{Z}$', 'إلى $\\mathbb{Z}$ فقط', 'Only $\\mathbb{Z}$'),
                say('$\\mathbb{Z}$, $\\mathbb{Q}$ eta $\\mathbb{R}$', '$\\mathbb{Z}$, $\\mathbb{Q}$ y $\\mathbb{R}$', '$\\mathbb{Z}$ و$\\mathbb{Q}$ و$\\mathbb{R}$', '$\\mathbb{Z}$, $\\mathbb{Q}$ and $\\mathbb{R}$'),
                say('$\\mathbb{N}$, $\\mathbb{Z}$, $\\mathbb{Q}$ eta $\\mathbb{R}$', '$\\mathbb{N}$, $\\mathbb{Z}$, $\\mathbb{Q}$ y $\\mathbb{R}$', '$\\mathbb{N}$ و$\\mathbb{Z}$ و$\\mathbb{Q}$ و$\\mathbb{R}$', '$\\mathbb{N}$, $\\mathbb{Z}$, $\\mathbb{Q}$ and $\\mathbb{R}$')
            ],
            correctIndex: 1,
            explanation: say('Osoa da, baina ez naturala, negatiboa delako. Oso guztiak arrazionalak eta errealak dira.', 'Es entero, pero no natural, porque es negativo. Todos los enteros son racionales y reales.', 'هو عدد صحيح لكنه ليس طبيعيًا لأنه سالب. وكل الأعداد الصحيحة نسبية وحقيقية.', 'It is an integer, but not a natural number, because it is negative. Every integer is rational and real.')
        }
    },
    'real-line': {
        mistake: {
            wrong: say('$-\\frac{3}{4}>-\\frac{1}{2}$, $\\frac{3}{4}>\\frac{1}{2}$ delako.', '$-\\frac{3}{4}>-\\frac{1}{2}$, porque $\\frac{3}{4}>\\frac{1}{2}$.', '$-\\frac{3}{4}>-\\frac{1}{2}$ لأن $\\frac{3}{4}>\\frac{1}{2}$.', '$-\\frac{3}{4}>-\\frac{1}{2}$, because $\\frac{3}{4}>\\frac{1}{2}$.'),
            right: say('Negatiboetan, zerotik hurbilen dagoena da handiena: $-0{,}75<-0{,}5$, beraz $-\\frac{3}{4}<-\\frac{1}{2}$.', 'Entre negativos es mayor el más cercano al 0: $-0{,}75<-0{,}5$, así que $-\\frac{3}{4}<-\\frac{1}{2}$.', 'بين الأعداد السالبة يكون الأقرب إلى الصفر هو الأكبر: $-0{,}75<-0{,}5$، إذن $-\\frac{3}{4}<-\\frac{1}{2}$.', 'Between negatives, the one closest to 0 is the greater: $-0{,}75<-0{,}5$, so $-\\frac{3}{4}<-\\frac{1}{2}$.')
        },
        check: {
            prompt: say('Zein ordena da zuzena?', '¿Qué orden es correcto?', 'أيّ ترتيب صحيح؟', 'Which order is right?'),
            options: [same('$\\sqrt{2}<-\\frac{3}{2}<1{,}5$'), same('$-\\frac{3}{2}<1{,}5<\\sqrt{2}$'), same('$-\\frac{3}{2}<\\sqrt{2}<1{,}5$')],
            correctIndex: 2,
            explanation: say('Idatzi hamartar gisa: $-1{,}5<1{,}414\\ldots<1{,}5$.', 'Escríbelos como decimales: $-1{,}5<1{,}414\\ldots<1{,}5$.', 'اكتبها أعدادًا عشرية: $-1{,}5<1{,}414\\ldots<1{,}5$.', 'Write them as decimals: $-1{,}5<1{,}414\\ldots<1{,}5$.')
        }
    },
    intervals: {
        mistake: {
            wrong: say('$x\\ge 4$ honela idazten da: $[4,\\,+\\infty]$.', '$x\\ge 4$ se escribe $[4,\\,+\\infty]$.', '$x\\ge 4$ تُكتب $[4,\\,+\\infty]$.', '$x\\ge 4$ is written $[4,\\,+\\infty]$.'),
            right: say('Infinitua ez da zenbaki bat eta ez dago inoiz barne: $[4,\\,+\\infty)$.', 'El infinito no es un número y nunca está incluido: $[4,\\,+\\infty)$.', 'اللانهاية ليست عددًا ولا تكون داخلة أبدًا: $[4,\\,+\\infty)$.', 'Infinity is not a number and is never included: $[4,\\,+\\infty)$.')
        },
        check: {
            prompt: say('Zein tarte da $-1\\le x<5$?', '¿Qué intervalo es $-1\\le x<5$?', 'ما الفترة $-1\\le x<5$؟', 'Which interval is $-1\\le x<5$?'),
            options: [same('$(-1,\\,5]$'), same('$[-1,\\,5)$'), same('$[-1,\\,5]$')],
            correctIndex: 1,
            explanation: say('$-1$ barne dago ($\\le$): kortxetea. $5$ kanpo dago ($<$): parentesia.', 'El $-1$ está incluido ($\\le$): corchete. El $5$ no ($<$): paréntesis.', '$-1$ داخل ($\\le$): قوس معقوف. و$5$ خارج ($<$): قوس عادي.', '$-1$ is included ($\\le$): square bracket. $5$ is not ($<$): round bracket.')
        }
    },
    /* ---------- 4. Approximations and scientific notation ---------- */
    rounding: {
        mistake: {
            wrong: say('$4{,}96$ hamarrenetara biribiltzean $4{,}10$ ateratzen da.', 'Redondear $4{,}96$ a las décimas da $4{,}10$.', 'تقريب $4{,}96$ إلى الأعشار يعطي $4{,}10$.', 'Rounding $4{,}96$ to one decimal place gives $4{,}10$.'),
            right: say('9 zifrari 1 gehitzean, bat eraman behar da: $4{,}96\\to 5{,}0$.', 'Al sumar 1 al 9 te llevas una: $4{,}96\\to 5{,}0$.', 'عند إضافة 1 إلى 9 نحمل واحدًا: $4{,}96\\to 5{,}0$.', 'Adding 1 to the 9 carries one: $4{,}96\\to 5{,}0$.')
        },
        check: {
            prompt: say('Biribildu $7{,}3849$ ehunenetara.', 'Redondea $7{,}3849$ a las centésimas.', 'قرّب $7{,}3849$ إلى الأجزاء من مئة.', 'Round $7{,}3849$ to two decimal places.'),
            options: [same('$7{,}39$'), same('$7{,}38$'), same('$7{,}40$')],
            correctIndex: 1,
            explanation: say('Kentzen den lehen zifra 4 da, 5 baino txikiagoa: $7{,}38$ geratzen da. Ez biribildu bi aldiz ($7{,}385\\to 7{,}39$).', 'La primera cifra suprimida es un 4, menor que 5: queda $7{,}38$. No redondees dos veces ($7{,}385\\to 7{,}39$).', 'أول رقم محذوف هو 4، وهو أصغر من 5: يبقى $7{,}38$. لا تقرّب مرتين ($7{,}385\\to 7{,}39$).', 'The first digit dropped is a 4, less than 5: it stays $7{,}38$. Do not round twice ($7{,}385\\to 7{,}39$).')
        }
    },
    errors: {
        mistake: {
            wrong: same('$E_a=3{,}8-4=-0{,}2$'),
            right: say('Errore absolutua balio absolutuan doa, ez da inoiz negatiboa: $E_a=|3{,}8-4|=0{,}2$.', 'El error absoluto va en valor absoluto, nunca es negativo: $E_a=|3{,}8-4|=0{,}2$.', 'الخطأ المطلق يؤخذ بالقيمة المطلقة فلا يكون سالبًا أبدًا: $E_a=|3{,}8-4|=0{,}2$.', 'The absolute error is taken as an absolute value, so it is never negative: $E_a=|3{,}8-4|=0{,}2$.')
        },
        check: {
            prompt: say('Benetako pisua $50$ g da eta balantzak $48$ g ematen ditu. Zein da errore erlatiboa?', 'El peso real es $50$ g y la báscula marca $48$ g. ¿Cuál es el error relativo?', 'الوزن الحقيقي $50$ غ والميزان يُظهر $48$ غ. ما الخطأ النسبي؟', 'The true weight is $50$ g and the scale shows $48$ g. What is the relative error?'),
            options: [say('$2$ g', '$2$ g', '$2$ غ', '$2$ g'), same('$0{,}04$'), same('$0{,}042$')],
            correctIndex: 1,
            explanation: say('$E_a=2$ g eta balio errealaz zatitzen da: $\\frac{2}{50}=0{,}04$, hau da, % 4. Ez zatitu hurbilketaz.', '$E_a=2$ g y se divide entre el valor real: $\\frac{2}{50}=0{,}04$, el 4 %. No dividas entre la aproximación.', '$E_a=2$ غ ونقسم على القيمة الحقيقية: $\\frac{2}{50}=0{,}04$ أي 4٪. لا تقسم على التقريب.', '$E_a=2$ g, divided by the true value: $\\frac{2}{50}=0{,}04$, that is 4%. Do not divide by the approximation.')
        }
    },
    scientific: {
        mistake: {
            wrong: same('$0{,}0034=3{,}4\\cdot 10^{3}$'),
            right: say('Zenbaki txiki batek berretzaile negatiboa du: $0{,}0034=3{,}4\\cdot 10^{-3}$.', 'Un número pequeño lleva exponente negativo: $0{,}0034=3{,}4\\cdot 10^{-3}$.', 'العدد الصغير أسّه سالب: $0{,}0034=3{,}4\\cdot 10^{-3}$.', 'A small number has a negative exponent: $0{,}0034=3{,}4\\cdot 10^{-3}$.')
        },
        check: {
            prompt: say('Nola idazten da $0{,}00067$ idazkera zientifikoan?', '¿Cómo se escribe $0{,}00067$ en notación científica?', 'كيف يُكتب $0{,}00067$ بالترميز العلمي؟', 'How is $0{,}00067$ written in scientific notation?'),
            options: [same('$6{,}7\\cdot 10^{4}$'), same('$67\\cdot 10^{-5}$'), same('$6{,}7\\cdot 10^{-4}$')],
            correctIndex: 2,
            explanation: say('Koma 6 zifraren atzean: 4 jauzi eskuinera, beraz berretzailea $-4$ da. $67$ zenbakiak bi zifra ditu komaren aurretik.', 'La coma detrás del 6: 4 saltos a la derecha, así que el exponente es $-4$. $67$ tiene dos cifras delante de la coma.', 'الفاصلة بعد الرقم 6: 4 قفزات إلى اليمين، فالأس $-4$. أما $67$ ففيه رقمان قبل الفاصلة.', 'The decimal point after the 6: 4 places to the right, so the exponent is $-4$. $67$ has two digits before the point.')
        }
    },
    'scientific-ops': {
        mistake: {
            wrong: same('$(2\\cdot 10^{4})\\cdot(3\\cdot 10^{5})=6\\cdot 10^{20}$'),
            right: say('10 oinarriko berreturak berretzaileak batuz biderkatzen dira: $6\\cdot 10^{9}$.', 'Las potencias de 10 se multiplican sumando los exponentes: $6\\cdot 10^{9}$.', 'قوى 10 تُضرب بجمع الأسس: $6\\cdot 10^{9}$.', 'Powers of 10 are multiplied by adding the exponents: $6\\cdot 10^{9}$.')
        },
        check: {
            prompt: say('Kalkulatu $(8\\cdot 10^{6})\\div(2\\cdot 10^{-2})$.', 'Calcula $(8\\cdot 10^{6})\\div(2\\cdot 10^{-2})$.', 'احسب $(8\\cdot 10^{6})\\div(2\\cdot 10^{-2})$.', 'Calculate $(8\\cdot 10^{6})\\div(2\\cdot 10^{-2})$.'),
            options: [same('$4\\cdot 10^{8}$'), same('$4\\cdot 10^{4}$'), same('$4\\cdot 10^{-3}$')],
            correctIndex: 0,
            explanation: say('$8\\div 2=4$ eta berretzaileak kendu: $6-(-2)=8$.', '$8\\div 2=4$ y resta los exponentes: $6-(-2)=8$.', '$8\\div 2=4$ واطرح الأسس: $6-(-2)=8$.', '$8\\div 2=4$, and subtract the exponents: $6-(-2)=8$.')
        }
    },
    /* ---------- 5. Roots and radicals ---------- */
    roots: {
        mistake: {
            wrong: same('$\\sqrt[4]{-16}=-2$'),
            right: say('Indizea bikoitia denean, negatibo batek ez du erro errealik: $(-2)^{4}=16$, ez $-16$.', 'Con índice par, un negativo no tiene raíz real: $(-2)^{4}=16$, no $-16$.', 'إذا كان الدليل زوجيًا فلا جذر حقيقي للعدد السالب: $(-2)^{4}=16$ وليس $-16$.', 'With an even index, a negative number has no real root: $(-2)^{4}=16$, not $-16$.')
        },
        check: {
            prompt: say('Kalkulatu $16^{\\frac{3}{4}}$.', 'Calcula $16^{\\frac{3}{4}}$.', 'احسب $16^{\\frac{3}{4}}$.', 'Calculate $16^{\\frac{3}{4}}$.'),
            options: [same('$12$'), same('$2$'), same('$8$')],
            correctIndex: 2,
            explanation: say('$16=2^{4}$, beraz $(2^{4})^{\\frac{3}{4}}=2^{3}=8$. Ez biderkatu 16 zenbakia $\\frac{3}{4}$ zatikiaz.', '$16=2^{4}$, así que $(2^{4})^{\\frac{3}{4}}=2^{3}=8$. No multipliques 16 por $\\frac{3}{4}$.', '$16=2^{4}$، إذن $(2^{4})^{\\frac{3}{4}}=2^{3}=8$. لا تضرب 16 في $\\frac{3}{4}$.', '$16=2^{4}$, so $(2^{4})^{\\frac{3}{4}}=2^{3}=8$. Do not multiply 16 by $\\frac{3}{4}$.')
        }
    },
    'radical-simplify': {
        mistake: {
            wrong: same('$\\sqrt{50}=25\\sqrt{2}$'),
            right: say('$5^{2}$ bikotetik 5 bat ateratzen da: $\\sqrt{50}=\\sqrt{5^{2}\\cdot 2}=5\\sqrt{2}$.', 'De la pareja $5^{2}$ sale un 5: $\\sqrt{50}=\\sqrt{5^{2}\\cdot 2}=5\\sqrt{2}$.', 'من الزوج $5^{2}$ يخرج 5: $\\sqrt{50}=\\sqrt{5^{2}\\cdot 2}=5\\sqrt{2}$.', 'From the pair $5^{2}$ one 5 comes out: $\\sqrt{50}=\\sqrt{5^{2}\\cdot 2}=5\\sqrt{2}$.')
        },
        check: {
            prompt: say('Atera faktoreak $\\sqrt{45}$ errotik.', 'Extrae factores de $\\sqrt{45}$.', 'أخرج العوامل من $\\sqrt{45}$.', 'Take the factors out of $\\sqrt{45}$.'),
            options: [same('$9\\sqrt{5}$'), same('$3\\sqrt{5}$'), same('$5\\sqrt{3}$')],
            correctIndex: 1,
            explanation: say('$45=3^{2}\\cdot 5$: $3^{2}$ bikotetik 3 bat ateratzen da, $3\\sqrt{5}$.', '$45=3^{2}\\cdot 5$: de la pareja $3^{2}$ sale un 3, $3\\sqrt{5}$.', '$45=3^{2}\\cdot 5$: من الزوج $3^{2}$ يخرج 3، $3\\sqrt{5}$.', '$45=3^{2}\\cdot 5$: from the pair $3^{2}$ one 3 comes out, $3\\sqrt{5}$.')
        }
    },
    'radical-ops': {
        mistake: {
            wrong: same('$\\sqrt{2}+\\sqrt{3}=\\sqrt{5}$'),
            right: say('$\\sqrt{2}$ eta $\\sqrt{3}$ ez dira antzekoak: batuketa horrela uzten da, $\\sqrt{2}+\\sqrt{3}$.', '$\\sqrt{2}$ y $\\sqrt{3}$ no son semejantes: la suma se deja así, $\\sqrt{2}+\\sqrt{3}$.', '$\\sqrt{2}$ و$\\sqrt{3}$ ليسا متشابهين: يبقى المجموع كما هو، $\\sqrt{2}+\\sqrt{3}$.', '$\\sqrt{2}$ and $\\sqrt{3}$ are not like radicals: the sum stays as it is, $\\sqrt{2}+\\sqrt{3}$.')
        },
        check: {
            prompt: say('Kalkulatu $\\sqrt{8}+\\sqrt{18}$.', 'Calcula $\\sqrt{8}+\\sqrt{18}$.', 'احسب $\\sqrt{8}+\\sqrt{18}$.', 'Calculate $\\sqrt{8}+\\sqrt{18}$.'),
            options: [same('$\\sqrt{26}$'), same('$6\\sqrt{2}$'), same('$5\\sqrt{2}$')],
            correctIndex: 2,
            explanation: say('Lehenik atera faktoreak: $2\\sqrt{2}+3\\sqrt{2}$. Orain antzekoak dira: $5\\sqrt{2}$.', 'Primero extrae factores: $2\\sqrt{2}+3\\sqrt{2}$. Ahora son semejantes: $5\\sqrt{2}$.', 'أخرج العوامل أولًا: $2\\sqrt{2}+3\\sqrt{2}$. صارا متشابهين: $5\\sqrt{2}$.', 'First take the factors out: $2\\sqrt{2}+3\\sqrt{2}$. Now they are like radicals: $5\\sqrt{2}$.')
        }
    }
}
