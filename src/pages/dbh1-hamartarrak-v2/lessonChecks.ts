import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Zenbaki hamartarrak · 1. DBH — the typical mistake and the «Check it»
   question of every lesson. Plain data (no JSX) so the tests can import it;
   lessons.tsx merges it into the topics. The questions use new numbers,
   never those of «Let's solve» or of the example, and one of their wrong
   answers is the lesson's typical mistake. say() writes the decimal point
   in the Arabic formulas.
   ========================================================================== */

export type DecimalsTopicId = 'decimal-units' | 'place-value' | 'read-write' | 'compare' | 'line' | 'between' | 'decimal-fraction' | 'fraction-division' | 'rounding' | 'add-sub' | 'multiply' | 'powers-of-ten' | 'divide-natural' | 'divide-decimal' | 'problems'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const decimalsLessonChecks: Record<DecimalsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. The structure of decimals ---------- */
    'decimal-units': {
        mistake: {
            wrong: say('Hamarren bat ehunen bat baino txikiagoa da, 10 gutxiago delako 100 baino.', 'Una décima es más pequeña que una centésima, porque 10 es menos que 100.', 'العُشر أصغر من الجزء من مئة، لأن 10 أقل من 100.', 'A tenth is smaller than a hundredth, because 10 is less than 100.'),
            right: say('Alderantziz: ehunena unitatea 100 zatitan da, zati txikiagoak. $0{,}1>0{,}01$.', 'Al revés: la centésima es la unidad en 100 partes, más pequeñas. $0{,}1>0{,}01$.', 'بالعكس: الجزء من مئة هو الوحدة مقسومة إلى 100 جزء أصغر. $0{,}1>0{,}01$.', 'The other way round: a hundredth is the unit split into 100 smaller parts. $0{,}1>0{,}01$.')
        },
        check: {
            prompt: say('Zenbat milaren dira 3 ehunen?', '¿Cuántas milésimas son 3 centésimas?', 'كم جزءًا من ألف في 3 أجزاء من مئة؟', 'How many thousandths are 3 hundredths?'),
            options: [same('$30$'), same('$300$'), same('$3$')],
            correctIndex: 0,
            explanation: say('Ehunen bakoitza 10 milaren da: $3\\cdot 10=30$.', 'Cada centésima son 10 milésimas: $3\\cdot 10=30$.', 'كل جزء من مئة يساوي 10 أجزاء من ألف: $3\\cdot 10=30$.', 'Each hundredth is 10 thousandths: $3\\cdot 10=30$.')
        }
    },
    'place-value': {
        mistake: {
            wrong: say('$3{,}52$ zenbakian, 2 zifrak 2 unitate balio ditu.', 'En $3{,}52$, el 2 vale 2 unidades.', 'في $3{,}52$ قيمة الرقم 2 هي وحدتان.', 'In $3{,}52$, the 2 is worth 2 units.'),
            right: say('2 zifra ehunenetan dago: $0{,}02$ balio du.', 'El 2 está en las centésimas: vale $0{,}02$.', 'الرقم 2 في منزلة الأجزاء من مئة: قيمته $0{,}02$.', 'The 2 is in the hundredths: it is worth $0{,}02$.')
        },
        check: {
            prompt: say('Zenbat balio du 7 zifrak $15{,}478$ zenbakian?', '¿Cuánto vale el 7 en $15{,}478$?', 'كم قيمة الرقم 7 في $15{,}478$؟', 'What is the 7 worth in $15{,}478$?'),
            options: [same('$0{,}7$'), same('$0{,}07$'), same('$7$')],
            correctIndex: 1,
            explanation: say('7 zifra bigarren zifra hamartarra da, ehunenena: $0{,}07$.', 'El 7 es la segunda cifra decimal, la de las centésimas: $0{,}07$.', 'الرقم 7 هو الرقم العشري الثاني، منزلة الأجزاء من مئة: $0{,}07$.', 'The 7 is the second decimal digit, the hundredths: $0{,}07$.')
        }
    },
    'read-write': {
        mistake: {
            wrong: say('«Zazpi ehunen» $0{,}7$ idazten da.', '«Siete centésimas» se escribe $0{,}7$.', '«سبعة أجزاء من مئة» تُكتب $0{,}7$.', '«Seven hundredths» is written $0{,}7$.'),
            right: say('Ehunenak: bi zifra hamartar. Zazpi ehunen $0{,}07$ da.', 'Centésimas: dos cifras decimales. Siete centésimas es $0{,}07$.', 'الأجزاء من مئة: رقمان عشريان. سبعة أجزاء من مئة هي $0{,}07$.', 'Hundredths: two decimal places. Seven hundredths is $0{,}07$.')
        },
        check: {
            prompt: say('Nola irakurtzen da $2{,}35$?', '¿Cómo se lee $2{,}35$?', 'كيف يُقرأ $2{,}35$؟', 'How is $2{,}35$ read?'),
            options: [
                say('Bi unitate eta hogeita hamabost ehunen', 'Dos unidades y treinta y cinco centésimas', 'وحدتان وخمسة وثلاثون جزءًا من مئة', 'Two units and thirty-five hundredths'),
                say('Bi unitate eta hogeita hamabost hamarren', 'Dos unidades y treinta y cinco décimas', 'وحدتان وخمسة وثلاثون عُشرًا', 'Two units and thirty-five tenths'),
                say('Berrehun eta hogeita hamabost', 'Doscientos treinta y cinco', 'مئتان وخمسة وثلاثون', 'Two hundred and thirty-five')
            ],
            correctIndex: 0,
            explanation: say('Azken zifra ehunenetan dago: «hogeita hamabost ehunen».', 'La última cifra está en las centésimas: «treinta y cinco centésimas».', 'آخر رقم في منزلة الأجزاء من مئة: «خمسة وثلاثون جزءًا من مئة».', 'The last digit is in the hundredths: «thirty-five hundredths».')
        }
    },

    /* ---------- 2. Order and the number line ---------- */
    compare: {
        mistake: {
            wrong: say('$0{,}45>0{,}5$, 45 handiagoa delako 5 baino.', '$0{,}45>0{,}5$, porque 45 es mayor que 5.', '$0{,}45>0{,}5$ لأن 45 أكبر من 5.', '$0{,}45>0{,}5$, because 45 is bigger than 5.'),
            right: say('Hamarrenak konparatzen dira: 4 < 5; beraz, $0{,}45<0{,}5$ (hau da, $0{,}45<0{,}50$).', 'Se comparan las décimas: 4 < 5, así que $0{,}45<0{,}5$ (es como $0{,}45<0{,}50$).', 'نقارن الأعشار: 4 < 5، إذن $0{,}45<0{,}5$ (أي $0{,}45<0{,}50$).', 'Compare the tenths: 4 < 5, so $0{,}45<0{,}5$ (it is like $0{,}45<0{,}50$).')
        },
        check: {
            prompt: say('Zein zenbaki da handiena?', '¿Qué número es el mayor?', 'أيّ عدد هو الأكبر؟', 'Which number is the biggest?'),
            options: [same('$1{,}09$'), same('$1{,}9$'), same('$1{,}089$')],
            correctIndex: 1,
            explanation: say('Hamarrenetan: 9 > 0. $1{,}9=1{,}900$ da handiena.', 'En las décimas: 9 > 0. $1{,}9=1{,}900$ es el mayor.', 'في الأعشار: 9 > 0. إذن $1{,}9=1{,}900$ هو الأكبر.', 'In the tenths: 9 > 0. $1{,}9=1{,}900$ is the biggest.')
        }
    },
    line: {
        mistake: {
            wrong: say('$0{,}9$ zenbakia $1{,}2$ zenbakiaren eskuinean dago, 9 handiagoa delako 2 baino.', '$0{,}9$ está a la derecha de $1{,}2$, porque 9 es mayor que 2.', 'يقع $0{,}9$ يمين $1{,}2$ لأن 9 أكبر من 2.', '$0{,}9$ is to the right of $1{,}2$, because 9 is bigger than 2.'),
            right: say('Lehenik zati osoa: $0{,}9<1$ eta $1{,}2>1$. $0{,}9$ zenbakia 1 zenbakiaren ezkerrean dago, eta $1{,}2$ eskuinean.', 'Primero la parte entera: $0{,}9<1$ y $1{,}2>1$. $0{,}9$ está a la izquierda del 1, y $1{,}2$, a la derecha.', 'أولًا الجزء الصحيح: $0{,}9<1$ و$1{,}2>1$. يقع $0{,}9$ يسار 1، و$1{,}2$ يمينه.', 'Whole part first: $0{,}9<1$ and $1{,}2>1$. $0{,}9$ is to the left of 1, and $1{,}2$ to the right.')
        },
        check: {
            prompt: say('$3{,}4$ eta $3{,}5$ arteko tartea 10 zatitan banatuta dago. Zein zenbaki dago hirugarren markan?', 'Entre $3{,}4$ y $3{,}5$, el tramo está dividido en 10 partes. ¿Qué número marca la tercera?', 'القطعة بين $3{,}4$ و$3{,}5$ مقسومة إلى 10 أجزاء. ما العدد عند العلامة الثالثة؟', 'Between $3{,}4$ and $3{,}5$, the stretch is split into 10 parts. Which number is at the third mark?'),
            options: [same('$3{,}43$'), same('$3{,}7$'), same('$3{,}403$')],
            correctIndex: 0,
            explanation: say('Marka bakoitza ehunen bat da: $3{,}4+3\\cdot 0{,}01=3{,}43$.', 'Cada marca es una centésima: $3{,}4+3\\cdot 0{,}01=3{,}43$.', 'كل علامة جزء من مئة: $3{,}4+3\\cdot 0{,}01=3{,}43$.', 'Each mark is a hundredth: $3{,}4+3\\cdot 0{,}01=3{,}43$.')
        }
    },
    between: {
        mistake: {
            wrong: say('$1{,}2$ eta $1{,}8$ zenbakien erdiko puntua $1{,}2+1{,}8=3$ da.', 'El punto medio de $1{,}2$ y $1{,}8$ es $1{,}2+1{,}8=3$.', 'نقطة المنتصف بين $1{,}2$ و$1{,}8$ هي $1{,}2+1{,}8=3$.', 'The halfway point of $1{,}2$ and $1{,}8$ is $1{,}2+1{,}8=3$.'),
            right: say('Batura 2 zenbakiarekin zatitu behar da: $(1{,}2+1{,}8)\\mathbin{:}2=1{,}5$.', 'Hay que dividir la suma entre 2: $(1{,}2+1{,}8)\\mathbin{:}2=1{,}5$.', 'يجب قسمة المجموع على 2: $(1{,}2+1{,}8)\\mathbin{:}2=1{,}5$.', 'You have to divide the sum by 2: $(1{,}2+1{,}8)\\mathbin{:}2=1{,}5$.')
        },
        check: {
            prompt: say('Zein zenbaki dago $5{,}1$ eta $5{,}2$ artean?', '¿Qué número está entre $5{,}1$ y $5{,}2$?', 'أيّ عدد يقع بين $5{,}1$ و$5{,}2$؟', 'Which number is between $5{,}1$ and $5{,}2$?'),
            options: [same('$5{,}15$'), same('$5{,}3$'), same('$5{,}01$')],
            correctIndex: 0,
            explanation: say('Zero bana gehituta, $5{,}10$ eta $5{,}20$: $5{,}15$ haien artean dago.', 'Con un cero más, $5{,}10$ y $5{,}20$: $5{,}15$ está entre ellos.', 'بإضافة صفر: $5{,}10$ و$5{,}20$، و$5{,}15$ يقع بينهما.', 'With one more zero, $5{,}10$ and $5{,}20$: $5{,}15$ is between them.')
        }
    },

    /* ---------- 3. Fractions and rounding ---------- */
    'decimal-fraction': {
        mistake: {
            wrong: say('$0{,}9=\\frac{9}{100}$', '$0{,}9=\\frac{9}{100}$', '$0{,}9=\\frac{9}{100}$', '$0{,}9=\\frac{9}{100}$'),
            right: say('Zifra hamartar bat, zero bat: $0{,}9=\\frac{9}{10}$.', 'Una cifra decimal, un cero: $0{,}9=\\frac{9}{10}$.', 'رقم عشري واحد، صفر واحد: $0{,}9=\\frac{9}{10}$.', 'One decimal place, one zero: $0{,}9=\\frac{9}{10}$.')
        },
        check: {
            prompt: say('Zein zatiki hamartar da $0{,}036$?', '¿Qué fracción decimal es $0{,}036$?', 'ما الكسر العشري المساوي لـ$0{,}036$؟', 'Which decimal fraction is $0{,}036$?'),
            options: [same('$\\frac{36}{100}$'), same('$\\frac{36}{1000}$'), same('$\\frac{36}{10}$')],
            correctIndex: 1,
            explanation: say('Hiru zifra hamartar, hiru zero: $\\frac{36}{1000}$.', 'Tres cifras decimales, tres ceros: $\\frac{36}{1000}$.', 'ثلاثة أرقام عشرية، ثلاثة أصفار: $\\frac{36}{1000}$.', 'Three decimal places, three zeros: $\\frac{36}{1000}$.')
        }
    },
    'fraction-division': {
        mistake: {
            wrong: say('$\\frac{2}{3}=0{,}6$', '$\\frac{2}{3}=0{,}6$', '$\\frac{2}{3}=0{,}6$', '$\\frac{2}{3}=0{,}6$'),
            right: say('6 zifra amaierarik gabe errepikatzen da: $\\frac{2}{3}=0{,}666\\ldots=0{,}\\overline{6}$.', 'El 6 se repite sin fin: $\\frac{2}{3}=0{,}666\\ldots=0{,}\\overline{6}$.', 'يتكرر 6 بلا نهاية: $\\frac{2}{3}=0{,}666\\ldots=0{,}\\overline{6}$.', 'The 6 repeats for ever: $\\frac{2}{3}=0{,}666\\ldots=0{,}\\overline{6}$.')
        },
        check: {
            prompt: say('Zein zatikik ematen du hamartar zehatz bat?', '¿Qué fracción da un decimal exacto?', 'أيّ كسر يعطي عددًا عشريًا منتهيًا؟', 'Which fraction gives a terminating decimal?'),
            options: [same('$\\frac{1}{6}$'), same('$\\frac{3}{4}$'), same('$\\frac{5}{3}$')],
            correctIndex: 1,
            explanation: say('$3\\mathbin{:}4=0{,}75$: hondarra 0 da. Besteek, $0{,}1666\\ldots$ eta $1{,}666\\ldots$, ez dute amaierarik.', '$3\\mathbin{:}4=0{,}75$: el resto llega a 0. Las otras, $0{,}1666\\ldots$ y $1{,}666\\ldots$, no terminan.', '$3\\mathbin{:}4=0{,}75$: يصل الباقي إلى 0. أما الآخران، $0{,}1666\\ldots$ و$1{,}666\\ldots$، فلا ينتهيان.', '$3\\mathbin{:}4=0{,}75$: the remainder reaches 0. The others, $0{,}1666\\ldots$ and $1{,}666\\ldots$, never end.')
        }
    },
    rounding: {
        mistake: {
            wrong: say('$3{,}96$ hamarrenetara biribilduta $3{,}10$ da.', '$3{,}96$ redondeado a las décimas es $3{,}10$.', 'تقريب $3{,}96$ إلى الأعشار هو $3{,}10$.', '$3{,}96$ rounded to the nearest tenth is $3{,}10$.'),
            right: say('9 zifra 10 bihurtzen da, eta bat eramaten da: $3{,}96$ zenbakia $4{,}0$ zenbakira biribiltzen da.', 'El 9 pasa a 10 y se lleva una: $3{,}96$ se redondea a $4{,}0$.', 'يصير 9 عشرة ونحمل واحدًا: يُقرَّب $3{,}96$ إلى $4{,}0$.', 'The 9 becomes 10 and you carry one: $3{,}96$ rounds to $4{,}0$.')
        },
        check: {
            prompt: say('Biribildu $7{,}348$ ehunenetara.', 'Redondea $7{,}348$ a las centésimas.', 'قرّب $7{,}348$ إلى الأجزاء من مئة.', 'Round $7{,}348$ to the nearest hundredth.'),
            options: [same('$7{,}35$'), same('$7{,}34$'), same('$7{,}3$')],
            correctIndex: 0,
            explanation: say('Milarenak 8 dira, 5 edo gehiago: ehunenak 4 zifratik 5 zifrara igotzen dira.', 'Las milésimas son 8, 5 o más: las centésimas suben de 4 a 5.', 'الأجزاء من ألف 8، أي 5 أو أكثر: ترتفع الأجزاء من مئة من 4 إلى 5.', 'The thousandths are 8, 5 or more: the hundredths go up from 4 to 5.')
        }
    },

    /* ---------- 4. Add, subtract and multiply ---------- */
    'add-sub': {
        mistake: {
            wrong: say('$4{,}5+2{,}36=2{,}81$', '$4{,}5+2{,}36=2{,}81$', '$4{,}5+2{,}36=2{,}81$', '$4{,}5+2{,}36=2{,}81$'),
            right: say('Koma komaren azpian: $4{,}50+2{,}36=6{,}86$.', 'Coma bajo coma: $4{,}50+2{,}36=6{,}86$.', 'الفاصلة تحت الفاصلة: $4{,}50+2{,}36=6{,}86$.', 'Decimal point under decimal point: $4{,}50+2{,}36=6{,}86$.')
        },
        check: {
            prompt: say('Zenbat da $6-1{,}25$?', '¿Cuánto es $6-1{,}25$?', 'كم يساوي $6-1{,}25$؟', 'What is $6-1{,}25$?'),
            options: [same('$4{,}75$'), same('$5{,}25$'), same('$4{,}85$')],
            correctIndex: 0,
            explanation: say('Zeroekin beteta: $6{,}00-1{,}25=4{,}75$.', 'Rellenando con ceros: $6{,}00-1{,}25=4{,}75$.', 'بإضافة الأصفار: $6{,}00-1{,}25=4{,}75$.', 'Filling in with zeros: $6{,}00-1{,}25=4{,}75$.')
        }
    },
    multiply: {
        mistake: {
            wrong: say('$0{,}3\\cdot 0{,}2=0{,}6$', '$0{,}3\\cdot 0{,}2=0{,}6$', '$0{,}3\\cdot 0{,}2=0{,}6$', '$0{,}3\\cdot 0{,}2=0{,}6$'),
            right: say('Guztira bi zifra hamartar daude: $0{,}3\\cdot 0{,}2=0{,}06$.', 'Hay dos cifras decimales en total: $0{,}3\\cdot 0{,}2=0{,}06$.', 'في المجموع رقمان عشريان: $0{,}3\\cdot 0{,}2=0{,}06$.', 'There are two decimal places in all: $0{,}3\\cdot 0{,}2=0{,}06$.')
        },
        check: {
            prompt: say('Zenbat da $1{,}2\\cdot 0{,}04$?', '¿Cuánto es $1{,}2\\cdot 0{,}04$?', 'كم يساوي $1{,}2\\cdot 0{,}04$؟', 'What is $1{,}2\\cdot 0{,}04$?'),
            options: [same('$0{,}48$'), same('$0{,}048$'), same('$4{,}8$')],
            correctIndex: 1,
            explanation: say('$12\\cdot 4=48$, eta 1 + 2 = 3 zifra hamartar: $0{,}048$.', '$12\\cdot 4=48$, y 1 + 2 = 3 cifras decimales: $0{,}048$.', '$12\\cdot 4=48$، و1 + 2 = 3 أرقام عشرية: $0{,}048$.', '$12\\cdot 4=48$, and 1 + 2 = 3 decimal places: $0{,}048$.')
        }
    },
    'powers-of-ten': {
        mistake: {
            wrong: say('$3{,}5\\cdot 10=3{,}50$', '$3{,}5\\cdot 10=3{,}50$', '$3{,}5\\cdot 10=3{,}50$', '$3{,}5\\cdot 10=3{,}50$'),
            right: say('Hamartarretan ez da zero bat gehitzen: koma toki bat eskuinera doa. $3{,}5\\cdot 10=35$.', 'En los decimales no se añade un cero: la coma va un lugar a la derecha. $3{,}5\\cdot 10=35$.', 'في الأعداد العشرية لا نضيف صفرًا: تنتقل الفاصلة منزلة إلى اليمين. $3{,}5\\cdot 10=35$.', 'With decimals you do not add a zero: the decimal point moves one place to the right. $3{,}5\\cdot 10=35$.')
        },
        check: {
            prompt: say('Zenbat da $46{,}2\\mathbin{:}100$?', '¿Cuánto es $46{,}2\\mathbin{:}100$?', 'كم يساوي $46{,}2\\mathbin{:}100$؟', 'What is $46{,}2\\mathbin{:}100$?'),
            options: [same('$4620$'), same('$0{,}462$'), same('$4{,}62$')],
            correctIndex: 1,
            explanation: say('Zatitzean, koma bi toki ezkerrera: $0{,}462$.', 'Al dividir, la coma dos lugares a la izquierda: $0{,}462$.', 'عند القسمة تنتقل الفاصلة منزلتين إلى اليسار: $0{,}462$.', 'Dividing, the decimal point moves two places to the left: $0{,}462$.')
        }
    },

    /* ---------- 5. Divisions and problems ---------- */
    'divide-natural': {
        mistake: {
            wrong: say('$7\\mathbin{:}4$ zatiketan, zatidura 1 da eta 3 geratzen dira: ezin da jarraitu.', 'En $7\\mathbin{:}4$, el cociente es 1 y sobran 3: no se puede seguir.', 'في $7\\mathbin{:}4$ الناتج 1 ويبقى 3: لا يمكن المتابعة.', 'In $7\\mathbin{:}4$, the quotient is 1 and 3 are left: you cannot go on.'),
            right: say('Zero bat jaitsi eta koma jartzen da: $7\\mathbin{:}4=1{,}75$.', 'Se baja un cero y se pone la coma: $7\\mathbin{:}4=1{,}75$.', 'ننزل صفرًا ونضع الفاصلة: $7\\mathbin{:}4=1{,}75$.', 'Bring down a zero and put in the decimal point: $7\\mathbin{:}4=1{,}75$.')
        },
        check: {
            prompt: say('Zenbat da $13\\mathbin{:}5$?', '¿Cuánto es $13\\mathbin{:}5$?', 'كم يساوي $13\\mathbin{:}5$؟', 'What is $13\\mathbin{:}5$?'),
            options: [same('$2{,}6$'), same('$2{,}3$'), same('$26$')],
            correctIndex: 0,
            explanation: say('$13\\mathbin{:}5$: 2, eta 3 geratzen dira; zero bat jaitsita, $30\\mathbin{:}5=6$. Beraz, $2{,}6$.', '$13\\mathbin{:}5$ da 2 y sobran 3; bajando un cero, $30\\mathbin{:}5=6$. Así, $2{,}6$.', '$13\\mathbin{:}5$ يعطي 2 ويبقى 3؛ وبإنزال صفر، $30\\mathbin{:}5=6$. إذن $2{,}6$.', '$13\\mathbin{:}5$ gives 2 with 3 left over; bringing down a zero, $30\\mathbin{:}5=6$. So $2{,}6$.')
        }
    },
    'divide-decimal': {
        mistake: {
            wrong: say('$4{,}8\\mathbin{:}0{,}6=4{,}8\\mathbin{:}6=0{,}8$', '$4{,}8\\mathbin{:}0{,}6=4{,}8\\mathbin{:}6=0{,}8$', '$4{,}8\\mathbin{:}0{,}6=4{,}8\\mathbin{:}6=0{,}8$', '$4{,}8\\mathbin{:}0{,}6=4{,}8\\mathbin{:}6=0{,}8$'),
            right: say('Biak 10 zenbakiaz biderkatu behar dira: $48\\mathbin{:}6=8$.', 'Hay que multiplicar los dos por 10: $48\\mathbin{:}6=8$.', 'يجب ضرب الاثنين في 10: $48\\mathbin{:}6=8$.', 'Both have to be multiplied by 10: $48\\mathbin{:}6=8$.')
        },
        check: {
            prompt: say('Zenbat da $2{,}4\\mathbin{:}0{,}3$?', '¿Cuánto es $2{,}4\\mathbin{:}0{,}3$?', 'كم يساوي $2{,}4\\mathbin{:}0{,}3$؟', 'What is $2{,}4\\mathbin{:}0{,}3$?'),
            options: [same('$0{,}8$'), same('$80$'), same('$8$')],
            correctIndex: 2,
            explanation: say('Biak 10 zenbakiaz: $24\\mathbin{:}3=8$.', 'Los dos por 10: $24\\mathbin{:}3=8$.', 'الاثنان في 10: $24\\mathbin{:}3=8$.', 'Both times 10: $24\\mathbin{:}3=8$.')
        }
    },
    problems: {
        mistake: {
            wrong: say('$2+3\\cdot 0{,}5=2{,}5$', '$2+3\\cdot 0{,}5=2{,}5$', '$2+3\\cdot 0{,}5=2{,}5$', '$2+3\\cdot 0{,}5=2{,}5$'),
            right: say('Biderketa lehenik: $2+3\\cdot 0{,}5=2+1{,}5=3{,}5$.', 'Primero la multiplicación: $2+3\\cdot 0{,}5=2+1{,}5=3{,}5$.', 'الضرب أولًا: $2+3\\cdot 0{,}5=2+1{,}5=3{,}5$.', 'Multiplication first: $2+3\\cdot 0{,}5=2+1{,}5=3{,}5$.')
        },
        check: {
            prompt: say('Zenbat da $8-2\\cdot 1{,}5$?', '¿Cuánto es $8-2\\cdot 1{,}5$?', 'كم يساوي $8-2\\cdot 1{,}5$؟', 'What is $8-2\\cdot 1{,}5$?'),
            options: [same('$9$'), same('$5$'), same('$6{,}5$')],
            correctIndex: 1,
            explanation: say('Biderketa lehenik: $2\\cdot 1{,}5=3$; gero, $8-3=5$.', 'Primero la multiplicación: $2\\cdot 1{,}5=3$; después, $8-3=5$.', 'الضرب أولًا: $2\\cdot 1{,}5=3$؛ ثم $8-3=5$.', 'Multiplication first: $2\\cdot 1{,}5=3$; then $8-3=5$.')
        }
    }
}
