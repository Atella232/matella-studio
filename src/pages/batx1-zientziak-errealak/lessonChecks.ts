import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Zenbaki errealak · Batxilergoa 1 · Zientziak — the typical mistake and the
   «Check it» question of every lesson. Plain data (no JSX) so the tests can
   import it; lessons.tsx merges it into the topics. The questions use new
   numbers, never those of «Let's solve» or of the example, and one of their
   wrong answers is the lesson's typical mistake.
   ========================================================================== */

export type BachRealsTopicId =
    | 'sets' | 'irrational-proof' | 'exact-line'
    | 'interval-sets' | 'absolute-value' | 'neighbourhoods'
    | 'significant' | 'relative' | 'scientific-errors'
    | 'radical-ops' | 'rationalize' | 'logarithms' | 'log-unknown'
    | 'combinatorial' | 'newton'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const bachRealsLessonChecks: Record<BachRealsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Real numbers ---------- */
    sets: {
        mistake: {
            wrong: same('$\\{1,2\\}\\cap\\{2,3\\}=\\{1,2,3\\}$'),
            right: say('Hori bildura da. Ebakidura elementu komunak dira: $\\{1,2\\}\\cap\\{2,3\\}=\\{2\\}$.', 'Eso es la unión. La intersección son los elementos comunes: $\\{1,2\\}\\cap\\{2,3\\}=\\{2\\}$.', 'هذا هو الاتحاد. التقاطع هو العناصر المشتركة: $\\{1,2\\}\\cap\\{2,3\\}=\\{2\\}$.', 'That is the union. The intersection is the common elements: $\\{1,2\\}\\cap\\{2,3\\}=\\{2\\}$.')
        },
        check: {
            prompt: say('$C=\\{-2,0,3\\}$ eta $D=\\{0,3,7\\}$ badira, zer da $C\\cap D$?', 'Si $C=\\{-2,0,3\\}$ y $D=\\{0,3,7\\}$, ¿qué es $C\\cap D$?', 'إذا كانت $C=\\{-2,0,3\\}$ و$D=\\{0,3,7\\}$ فما $C\\cap D$؟', 'If $C=\\{-2,0,3\\}$ and $D=\\{0,3,7\\}$, what is $C\\cap D$?'),
            options: [same('$\\{0,3\\}$'), same('$\\{-2,0,3,7\\}$'), same('$\\{-2\\}$')],
            correctIndex: 0,
            explanation: say('Bi multzoetan dauden elementuak: 0 eta 3.', 'Los elementos que están en los dos conjuntos: el 0 y el 3.', 'العناصر الموجودة في المجموعتين: 0 و3.', 'The elements that are in both sets: 0 and 3.')
        }
    },
    'irrational-proof': {
        mistake: {
            wrong: same('$\\sqrt{2}=1{,}4142$'),
            right: say('Hori hurbilketa bat da: $\\sqrt{2}$ zenbakiak infinitu zifra ditu periodorik gabe, eta zatiki batek ere ez du 2 ematen karratura berretzean.', 'Eso es una aproximación: $\\sqrt{2}$ tiene infinitas cifras sin periodo, y ninguna fracción da 2 al elevarla al cuadrado.', 'هذا تقريب: للعدد $\\sqrt{2}$ أرقام لا نهائية بلا دورة، ولا يوجد كسر مربعه 2.', 'That is an approximation: $\\sqrt{2}$ has infinitely many digits with no repeating block, and no fraction gives 2 when squared.')
        },
        check: {
            prompt: say('Zenbaki hauetatik, zein da irrazionala?', '¿Cuál de estos números es irracional?', 'أيّ هذه الأعداد غير نسبي؟', 'Which of these numbers is irrational?'),
            options: [same('$\\sqrt{12}$'), same('$\\sqrt{\\frac{9}{4}}$'), same('$1{,}\\overline{41}$')],
            correctIndex: 0,
            explanation: say('$\\sqrt{12}=2\\sqrt{3}$, eta $\\sqrt{3}$ irrazionala da. $\\sqrt{\\frac{9}{4}}=\\frac{3}{2}$ da, eta $1{,}\\overline{41}$ periodikoa: biak arrazionalak.', '$\\sqrt{12}=2\\sqrt{3}$, y $\\sqrt{3}$ es irracional. $\\sqrt{\\frac{9}{4}}=\\frac{3}{2}$ y $1{,}\\overline{41}$ es periódico: los dos son racionales.', '$\\sqrt{12}=2\\sqrt{3}$، و$\\sqrt{3}$ غير نسبي. أما $\\sqrt{\\frac{9}{4}}=\\frac{3}{2}$ و$1{,}\\overline{41}$ الدوري فكلاهما نسبي.', '$\\sqrt{12}=2\\sqrt{3}$, and $\\sqrt{3}$ is irrational. $\\sqrt{\\frac{9}{4}}=\\frac{3}{2}$ and $1{,}\\overline{41}$ recurs: both are rational.')
        }
    },
    'exact-line': {
        mistake: {
            wrong: same('$\\sqrt{6^2+8^2}=6+8$'),
            right: say('Batura baten erroa ez da erroen batura: $\\sqrt{6^2+8^2}=\\sqrt{100}=10$, ez 14.', 'La raíz de una suma no es la suma de las raíces: $\\sqrt{6^2+8^2}=\\sqrt{100}=10$, no 14.', 'جذر المجموع ليس مجموع الجذرين: $\\sqrt{6^2+8^2}=\\sqrt{100}=10$ وليس 14.', 'The root of a sum is not the sum of the roots: $\\sqrt{6^2+8^2}=\\sqrt{100}=10$, not 14.')
        },
        check: {
            prompt: say('Zein katetorekin marrazten da $\\sqrt{29}$?', '¿Con qué catetos se dibuja $\\sqrt{29}$?', 'بأيّ ضلعين قائمين يُرسم $\\sqrt{29}$؟', 'Which legs give $\\sqrt{29}$?'),
            options: [say('$27$ eta $2$', '$27$ y $2$', '$27$ و$2$', '$27$ and $2$'), say('$5$ eta $2$', '$5$ y $2$', '$5$ و$2$', '$5$ and $2$'), say('$4$ eta $3$', '$4$ y $3$', '$4$ و$3$', '$4$ and $3$')],
            correctIndex: 1,
            explanation: say('$5^2+2^2=25+4=29$, beraz hipotenusak $\\sqrt{29}$ neurtzen du.', '$5^2+2^2=25+4=29$, así que la hipotenusa mide $\\sqrt{29}$.', '$5^2+2^2=25+4=29$، إذن طول الوتر $\\sqrt{29}$.', '$5^2+2^2=25+4=29$, so the hypotenuse is $\\sqrt{29}$.')
        }
    },

    /* ---------- 2. Intervals and absolute value ---------- */
    'interval-sets': {
        mistake: {
            wrong: same('$x>6\\ \\to\\ [6,+\\infty]$'),
            right: say('6 ez dago barruan, eta infinitua ez da zenbaki bat: $x>6$ desberdintza $(6,+\\infty)$ da.', 'El 6 no entra y el infinito no es un número: $x>6$ es $(6,+\\infty)$.', 'العدد 6 غير داخل، واللانهاية ليست عددًا: $x>6$ هي $(6,+\\infty)$.', '6 is not included and infinity is not a number: $x>6$ is $(6,+\\infty)$.')
        },
        check: {
            prompt: say('Zein tarte da $x\\le -3$?', '¿Qué intervalo es $x\\le -3$?', 'ما الفترة $x\\le -3$؟', 'Which interval is $x\\le -3$?'),
            options: [same('$[-\\infty,-3]$'), same('$(-\\infty,-3]$'), same('$(-\\infty,-3)$')],
            correctIndex: 1,
            explanation: say('$-3$ barruan dago (kortxetea), eta infinituak beti parentesia darama.', 'El $-3$ entra (corchete) y el infinito siempre lleva paréntesis.', '$-3$ داخل (قوس معقوف)، واللانهاية دائمًا بقوس.', '$-3$ is included (square bracket) and infinity always takes a round bracket.')
        }
    },
    'absolute-value': {
        mistake: {
            wrong: same('$|x|=4\\ \\to\\ x=4$'),
            right: say('Bi zenbakik dute 4 balio absolutua: $x=4$ eta $x=-4$.', 'Hay dos números de valor absoluto 4: $x=4$ y $x=-4$.', 'هناك عددان قيمتهما المطلقة 4: $x=4$ و$x=-4$.', 'Two numbers have absolute value 4: $x=4$ and $x=-4$.')
        },
        check: {
            prompt: say('Zer distantzia dago $-3$ eta $5$ artean?', '¿Qué distancia hay entre $-3$ y $5$?', 'ما المسافة بين $-3$ و$5$؟', 'How far apart are $-3$ and $5$?'),
            options: [same('$2$'), same('$8$'), same('$-8$')],
            correctIndex: 1,
            explanation: say('$|5-(-3)|=8$: distantzia ez da inoiz negatiboa.', '$|5-(-3)|=8$: una distancia nunca es negativa.', '$|5-(-3)|=8$: المسافة لا تكون سالبة أبدًا.', '$|5-(-3)|=8$: a distance is never negative.')
        }
    },
    neighbourhoods: {
        mistake: {
            wrong: same('$|x-5|<1\\ \\to\\ x<6$'),
            right: say('Beste aldea ahaztu da: $|x-5|<1$ desberdintza $4<x<6$ da, hau da, $(4,6)$.', 'Se olvida el otro lado: $|x-5|<1$ es $4<x<6$, es decir, $(4,6)$.', 'نُسي الجانب الآخر: $|x-5|<1$ هي $4<x<6$، أي $(4,6)$.', 'The other side is forgotten: $|x-5|<1$ is $4<x<6$, that is, $(4,6)$.')
        },
        check: {
            prompt: say('Zein da $|x+1|<3$ desberdintzaren soluzioa?', '¿Qué conjunto es la solución de $|x+1|<3$?', 'ما مجموعة حلول $|x+1|<3$؟', 'What is the solution set of $|x+1|<3$?'),
            options: [same('$(-4,2)$'), same('$(-\\infty,2)$'), same('$(-2,4)$')],
            correctIndex: 0,
            explanation: say('$-3<x+1<3$; kendu 1: $-4<x<2$.', '$-3<x+1<3$; resta 1: $-4<x<2$.', '$-3<x+1<3$؛ اطرح 1: $-4<x<2$.', '$-3<x+1<3$; subtract 1: $-4<x<2$.')
        }
    },

    /* ---------- 3. Approximations and errors ---------- */
    significant: {
        mistake: {
            wrong: say('$0{,}0072$: lau zifra esanguratsu', '$0{,}0072$: cuatro cifras significativas', '$0{,}0072$: أربعة أرقام معنوية', '$0{,}0072$: four significant figures'),
            right: say('Ezkerreko zeroak ez dira kontatzen: $0{,}0072$ zenbakiak bi zifra esanguratsu ditu, 7 eta 2.', 'Los ceros de la izquierda no cuentan: $0{,}0072$ tiene dos cifras significativas, el 7 y el 2.', 'الأصفار على اليسار لا تُحسب: للعدد $0{,}0072$ رقمان معنويان هما 7 و2.', 'Zeros on the left do not count: $0{,}0072$ has two significant figures, 7 and 2.')
        },
        check: {
            prompt: say('Biribildu $8{,}9653$ hiru zifra esanguratsutara.', 'Redondea $8{,}9653$ a tres cifras significativas.', 'قرّب $8{,}9653$ إلى ثلاثة أرقام معنوية.', 'Round $8{,}9653$ to three significant figures.'),
            options: [same('$8{,}97$'), same('$8{,}96$'), same('$9{,}00$')],
            correctIndex: 0,
            explanation: say('Laugarren zifra 5 da: hirugarrena igo egiten da, $8{,}97$.', 'La cuarta cifra es un 5: la tercera sube, $8{,}97$.', 'الرقم الرابع 5: فيزيد الثالث، $8{,}97$.', 'The fourth figure is a 5: the third goes up, $8{,}97$.')
        }
    },
    relative: {
        mistake: {
            wrong: say('1 mm-ko errorea beti da txikia', 'Un error de 1 mm siempre es pequeño', 'الخطأ بمقدار 1 مم صغير دائمًا', 'An error of 1 mm is always small'),
            right: say('Neurriaren araberakoa da: 3 mm-ko torloju batean, %33 da.', 'Depende de la medida: en un tornillo de 3 mm es un 33 %.', 'يتوقف ذلك على القياس: في برغي طوله 3 مم يساوي 33 %.', 'It depends on the measurement: on a 3 mm screw it is 33%.')
        },
        check: {
            prompt: say('Zein neurketa da zehatzena?', '¿Qué medida es la más precisa?', 'أيّ القياسات أدق؟', 'Which measurement is the most precise?'),
            options: [say('50 m, 1 m-ko errorearekin', '50 m con error de 1 m', '50 م بخطأ 1 م', '50 m with an error of 1 m'), say('8 cm, 1 cm-ko errorearekin', '8 cm con error de 1 cm', '8 سم بخطأ 1 سم', '8 cm with an error of 1 cm'), say('200 g, 10 g-ko errorearekin', '200 g con error de 10 g', '200 غ بخطأ 10 غ', '200 g with an error of 10 g')],
            correctIndex: 0,
            explanation: say('Errore erlatiboak: $\\frac{1}{50}=2\\,\\%$, $\\frac{1}{8}=12{,}5\\,\\%$ eta $\\frac{10}{200}=5\\,\\%$.', 'Errores relativos: $\\frac{1}{50}=2\\,\\%$, $\\frac{1}{8}=12{,}5\\,\\%$ y $\\frac{10}{200}=5\\,\\%$.', 'الأخطاء النسبية: $\\frac{1}{50}=2\\,\\%$ و$\\frac{1}{8}=12{,}5\\,\\%$ و$\\frac{10}{200}=5\\,\\%$.', 'Relative errors: $\\frac{1}{50}=2\\,\\%$, $\\frac{1}{8}=12{,}5\\,\\%$ and $\\frac{10}{200}=5\\,\\%$.')
        }
    },
    'scientific-errors': {
        mistake: {
            wrong: same('$2\\cdot 10^{4}+3\\cdot 10^{3}=5\\cdot 10^{7}$'),
            right: say('Batzeko berretzaile bera behar da: $20\\cdot 10^{3}+3\\cdot 10^{3}=23\\cdot 10^{3}=2{,}3\\cdot 10^{4}$.', 'Para sumar hace falta el mismo exponente: $20\\cdot 10^{3}+3\\cdot 10^{3}=23\\cdot 10^{3}=2{,}3\\cdot 10^{4}$.', 'للجمع يلزم الأس نفسه: $20\\cdot 10^{3}+3\\cdot 10^{3}=23\\cdot 10^{3}=2{,}3\\cdot 10^{4}$.', 'To add you need the same exponent: $20\\cdot 10^{3}+3\\cdot 10^{3}=23\\cdot 10^{3}=2{,}3\\cdot 10^{4}$.')
        },
        check: {
            prompt: say('Zenbat da $(8\\cdot 10^{-3})\\cdot(5\\cdot 10^{7})$?', '¿Cuánto es $(8\\cdot 10^{-3})\\cdot(5\\cdot 10^{7})$?', 'كم يساوي $(8\\cdot 10^{-3})\\cdot(5\\cdot 10^{7})$؟', 'What is $(8\\cdot 10^{-3})\\cdot(5\\cdot 10^{7})$?'),
            options: [same('$4\\cdot 10^{5}$'), same('$4\\cdot 10^{4}$'), same('$40\\cdot 10^{-21}$')],
            correctIndex: 0,
            explanation: say('$8\\cdot 5=40$ eta $10^{-3+7}=10^{4}$: $40\\cdot 10^{4}=4\\cdot 10^{5}$.', '$8\\cdot 5=40$ y $10^{-3+7}=10^{4}$: $40\\cdot 10^{4}=4\\cdot 10^{5}$.', '$8\\cdot 5=40$ و$10^{-3+7}=10^{4}$: $40\\cdot 10^{4}=4\\cdot 10^{5}$.', '$8\\cdot 5=40$ and $10^{-3+7}=10^{4}$: $40\\cdot 10^{4}=4\\cdot 10^{5}$.')
        }
    },

    /* ---------- 4. Radicals and logarithms ---------- */
    'radical-ops': {
        mistake: {
            wrong: same('$\\sqrt{9}+\\sqrt{16}=\\sqrt{25}$'),
            right: say('Errokizunak ez dira batzen: $\\sqrt{9}+\\sqrt{16}=3+4=7$, eta $\\sqrt{25}=5$.', 'Los radicandos no se suman: $\\sqrt{9}+\\sqrt{16}=3+4=7$, y $\\sqrt{25}=5$.', 'لا يُجمع ما تحت الجذرين: $\\sqrt{9}+\\sqrt{16}=3+4=7$، و$\\sqrt{25}=5$.', 'The radicands are not added: $\\sqrt{9}+\\sqrt{16}=3+4=7$, and $\\sqrt{25}=5$.')
        },
        check: {
            prompt: say('Zenbat da $\\sqrt{28}+\\sqrt{63}$?', '¿Cuánto es $\\sqrt{28}+\\sqrt{63}$?', 'كم يساوي $\\sqrt{28}+\\sqrt{63}$؟', 'What is $\\sqrt{28}+\\sqrt{63}$?'),
            options: [same('$\\sqrt{91}$'), same('$6\\sqrt{7}$'), same('$5\\sqrt{7}$')],
            correctIndex: 2,
            explanation: say('$\\sqrt{28}=2\\sqrt{7}$ eta $\\sqrt{63}=3\\sqrt{7}$: antzekoak dira, $5\\sqrt{7}$.', '$\\sqrt{28}=2\\sqrt{7}$ y $\\sqrt{63}=3\\sqrt{7}$: son semejantes, $5\\sqrt{7}$.', '$\\sqrt{28}=2\\sqrt{7}$ و$\\sqrt{63}=3\\sqrt{7}$: متشابهان، $5\\sqrt{7}$.', '$\\sqrt{28}=2\\sqrt{7}$ and $\\sqrt{63}=3\\sqrt{7}$: they are like radicals, $5\\sqrt{7}$.')
        }
    },
    rationalize: {
        mistake: {
            wrong: same('$\\frac{1}{\\sqrt{3}+1}=\\frac{\\sqrt{3}+1}{2}$'),
            right: say('Konjokatuak zeinua aldatzen du: $\\frac{1}{\\sqrt{3}+1}=\\frac{\\sqrt{3}-1}{2}$.', 'El conjugado cambia el signo: $\\frac{1}{\\sqrt{3}+1}=\\frac{\\sqrt{3}-1}{2}$.', 'المرافق يغيّر الإشارة: $\\frac{1}{\\sqrt{3}+1}=\\frac{\\sqrt{3}-1}{2}$.', 'The conjugate changes the sign: $\\frac{1}{\\sqrt{3}+1}=\\frac{\\sqrt{3}-1}{2}$.')
        },
        check: {
            prompt: say('Zenbat da $\\frac{2}{\\sqrt{5}-1}$, arrazionalizatuta?', '¿Cuánto es $\\frac{2}{\\sqrt{5}-1}$ racionalizado?', 'ما $\\frac{2}{\\sqrt{5}-1}$ بعد إنطاق مقامه؟', 'What is $\\frac{2}{\\sqrt{5}-1}$ once rationalised?'),
            options: [same('$\\frac{\\sqrt{5}-1}{2}$'), same('$\\frac{\\sqrt{5}+1}{2}$'), same('$\\frac{2\\sqrt{5}}{5}$')],
            correctIndex: 1,
            explanation: say('Biderkatu goian eta behean $\\sqrt{5}+1$ konjokatuaz: izendatzailea $5-1=4$ da, eta $\\frac{2(\\sqrt{5}+1)}{4}=\\frac{\\sqrt{5}+1}{2}$.', 'Multiplica arriba y abajo por el conjugado $\\sqrt{5}+1$: el denominador es $5-1=4$, y $\\frac{2(\\sqrt{5}+1)}{4}=\\frac{\\sqrt{5}+1}{2}$.', 'اضرب البسط والمقام في المرافق $\\sqrt{5}+1$: يصير المقام $5-1=4$، و$\\frac{2(\\sqrt{5}+1)}{4}=\\frac{\\sqrt{5}+1}{2}$.', 'Multiply top and bottom by the conjugate $\\sqrt{5}+1$: the denominator is $5-1=4$, and $\\frac{2(\\sqrt{5}+1)}{4}=\\frac{\\sqrt{5}+1}{2}$.')
        }
    },
    logarithms: {
        mistake: {
            wrong: same('$\\log(5+5)=\\log 5+\\log 5$'),
            right: say('Propietatea biderkadurarena da, ez baturarena: $\\log(5\\cdot 5)=\\log 5+\\log 5$, baina $\\log(5+5)=\\log 10=1$.', 'La propiedad es del producto, no de la suma: $\\log(5\\cdot 5)=\\log 5+\\log 5$, pero $\\log(5+5)=\\log 10=1$.', 'الخاصية للضرب لا للجمع: $\\log(5\\cdot 5)=\\log 5+\\log 5$، لكن $\\log(5+5)=\\log 10=1$.', 'The property is for a product, not a sum: $\\log(5\\cdot 5)=\\log 5+\\log 5$, but $\\log(5+5)=\\log 10=1$.')
        },
        check: {
            prompt: say('Zenbat da $\\log_2 16-\\log_2 4$?', '¿Cuánto vale $\\log_2 16-\\log_2 4$?', 'كم يساوي $\\log_2 16-\\log_2 4$؟', 'What is $\\log_2 16-\\log_2 4$?'),
            options: [same('$2$'), same('$\\log_2 12$'), same('$4$')],
            correctIndex: 0,
            explanation: say('$\\log_2 16=4$ eta $\\log_2 4=2$: $4-2=2$. Edo $\\log_2\\frac{16}{4}=\\log_2 4=2$.', '$\\log_2 16=4$ y $\\log_2 4=2$: $4-2=2$. O bien $\\log_2\\frac{16}{4}=\\log_2 4=2$.', '$\\log_2 16=4$ و$\\log_2 4=2$: $4-2=2$. أو $\\log_2\\frac{16}{4}=\\log_2 4=2$.', '$\\log_2 16=4$ and $\\log_2 4=2$: $4-2=2$. Or $\\log_2\\frac{16}{4}=\\log_2 4=2$.')
        }
    },
    'log-unknown': {
        mistake: {
            wrong: same('$\\log_3 x=2\\ \\to\\ x=\\frac{2}{3}$'),
            right: say('Logaritmoa berretzaile bat da: $\\log_3 x=2$ esan nahi du $x=3^2=9$.', 'El logaritmo es un exponente: $\\log_3 x=2$ significa $x=3^2=9$.', 'اللوغاريتم أس: $\\log_3 x=2$ تعني $x=3^2=9$.', 'The logarithm is an exponent: $\\log_3 x=2$ means $x=3^2=9$.')
        },
        check: {
            prompt: say('Ebatzi $\\log_x 64=3$.', 'Resuelve $\\log_x 64=3$.', 'حُلّ $\\log_x 64=3$.', 'Solve $\\log_x 64=3$.'),
            options: [same('$8$'), same('$192$'), same('$4$')],
            correctIndex: 2,
            explanation: say('$x^3=64$, beraz $x=\\sqrt[3]{64}=4$.', '$x^3=64$, luego $x=\\sqrt[3]{64}=4$.', '$x^3=64$، إذن $x=\\sqrt[3]{64}=4$.', '$x^3=64$, so $x=\\sqrt[3]{64}=4$.')
        }
    },

    /* ---------- 5. The binomial theorem ---------- */
    combinatorial: {
        mistake: {
            wrong: same('$\\binom{6}{2}=\\frac{6}{2}=3$'),
            right: say('Ez da zatiketa bat: $\\binom{6}{2}=\\frac{6\\cdot 5}{2\\cdot 1}=15$.', 'No es una división: $\\binom{6}{2}=\\frac{6\\cdot 5}{2\\cdot 1}=15$.', 'ليس قسمة: $\\binom{6}{2}=\\frac{6\\cdot 5}{2\\cdot 1}=15$.', 'It is not a division: $\\binom{6}{2}=\\frac{6\\cdot 5}{2\\cdot 1}=15$.')
        },
        check: {
            prompt: say('Zenbat da $\\binom{8}{3}$?', '¿Cuánto vale $\\binom{8}{3}$?', 'كم يساوي $\\binom{8}{3}$؟', 'What is $\\binom{8}{3}$?'),
            options: [same('$24$'), same('$56$'), same('$336$')],
            correctIndex: 1,
            explanation: same('$\\frac{8\\cdot 7\\cdot 6}{3\\cdot 2\\cdot 1}=\\frac{336}{6}=56$')
        }
    },
    newton: {
        mistake: {
            wrong: same('$(x+3)^2=x^2+9$'),
            right: say('Erdiko gaia falta da: $(x+3)^2=x^2+6x+9$, $\\binom{2}{1}=2$ delako.', 'Falta el término del medio: $(x+3)^2=x^2+6x+9$, porque $\\binom{2}{1}=2$.', 'ينقص الحد الأوسط: $(x+3)^2=x^2+6x+9$ لأن $\\binom{2}{1}=2$.', 'The middle term is missing: $(x+3)^2=x^2+6x+9$, because $\\binom{2}{1}=2$.')
        },
        check: {
            prompt: say('Zein da $x$ gaiaren koefizientea $(x+2)^3$ garatzean?', '¿Cuál es el coeficiente de $x$ al desarrollar $(x+2)^3$?', 'ما معامل $x$ عند نشر $(x+2)^3$؟', 'What is the coefficient of $x$ when you expand $(x+2)^3$?'),
            options: [same('$12$'), same('$6$'), same('$3$')],
            correctIndex: 0,
            explanation: say('$x$ duen gaia: $\\binom{3}{2}x\\cdot 2^2=3\\cdot 4x=12x$.', 'El término con $x$: $\\binom{3}{2}x\\cdot 2^2=3\\cdot 4x=12x$.', 'الحد الذي فيه $x$: $\\binom{3}{2}x\\cdot 2^2=3\\cdot 4x=12x$.', 'The term with $x$: $\\binom{3}{2}x\\cdot 2^2=3\\cdot 4x=12x$.')
        }
    }
}
