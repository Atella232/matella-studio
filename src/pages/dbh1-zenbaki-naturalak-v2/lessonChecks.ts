import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Zenbaki naturalak · 1. DBH — the typical mistake and the «Check it»
   question of every lesson. Plain data (no JSX) so the tests can import it;
   lessons.tsx merges it into the topics. The questions use new numbers,
   never those of «Let's solve» or of the example, and one of their wrong
   answers is the lesson's typical mistake.
   ========================================================================== */

export type NaturalsTopicId = 'place-value' | 'big-numbers' | 'order' | 'roman' | 'rounding' | 'estimation' | 'add-subtract' | 'multiply' | 'divide' | 'hierarchy' | 'brackets' | 'problems' | 'powers' | 'powers-of-ten'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const naturalsLessonChecks: Record<NaturalsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. The decimal system ---------- */
    'place-value': {
        mistake: {
            wrong: say('5382 zenbakian, 5 zifrak 5 balio du.', 'En 5382, la cifra 5 vale 5.', 'في العدد 5382 قيمة الرقم 5 هي 5.', 'In 5,382, the digit 5 is worth 5.'),
            right: say('5 zifra milakoen tokian dago: $5000$ balio du.', 'El 5 está en las unidades de millar: vale $5000$.', 'الرقم 5 في منزلة الآلاف: قيمته $5000$.', 'The 5 is in the thousands place: it is worth $5000$.')
        },
        check: {
            prompt: say('Zenbat balio du 4 zifrak $24\\,170$ zenbakian?', '¿Cuánto vale la cifra 4 en $24\\,170$?', 'كم قيمة الرقم 4 في $24\\,170$؟', 'What is the digit 4 worth in $24\\,170$?'),
            options: [same('$4000$'), same('$4$'), same('$400$')],
            correctIndex: 0,
            explanation: say('4 zifra milakoen tokian dago: $4\\cdot 1000=4000$.', 'El 4 está en las unidades de millar: $4\\cdot 1000=4000$.', 'الرقم 4 في منزلة الآلاف: $4\\cdot 1000=4000$.', 'The 4 is in the thousands place: $4\\cdot 1000=4000$.')
        }
    },
    'big-numbers': {
        mistake: {
            wrong: say('Bilioi bat mila milioi da.', 'Un billón son mil millones.', 'التريليون يساوي ألف مليون.', 'A trillion is a thousand million.'),
            right: say('Mila milioik 9 zero ditu; bilioi bat milioi bat milioi da, eta 12 zero ditu.', 'Mil millones tiene 9 ceros; un billón es un millón de millones y tiene 12 ceros.', 'ألف مليون (المليار) فيه 9 أصفار؛ أما التريليون فهو مليون مليون وفيه 12 صفرًا.', 'A thousand million (a billion) has 9 zeros; a trillion is a million million and has 12 zeros.')
        },
        check: {
            prompt: say('Nola idazten da «bi milioi eta berrogei mila»?', '¿Cómo se escribe «dos millones cuarenta mil»?', 'كيف يُكتب «مليونان وأربعون ألفًا»؟', 'How do you write «two million forty thousand»?'),
            options: [same('$2\\,400\\,000$'), same('$2\\,040\\,000$'), same('$2\\,000\\,040$')],
            correctIndex: 1,
            explanation: say('Hiruko taldeak: 2 | 040 | 000. Berrogei mila milakoen taldean doa.', 'Grupos de tres: 2 | 040 | 000. Los cuarenta mil van en el grupo de los millares.', 'مجموعات من ثلاثة: 2 | 040 | 000. الأربعون ألفًا في مجموعة الآلاف.', 'Groups of three: 2 | 040 | 000. The forty thousand go in the thousands group.')
        }
    },
    order: {
        mistake: {
            wrong: say('$9999>10\\,000$, zifrak handiagoak direlako.', '$9999>10\\,000$, porque sus cifras son más grandes.', '$9999>10\\,000$ لأن أرقامه أكبر.', '$9999>10\\,000$, because its digits are bigger.'),
            right: say('Lehenik zifra kopurua: $10\\,000$ zenbakiak bost ditu, eta $9999$ zenbakiak lau. Beraz, $9999<10\\,000$.', 'Primero cuenta las cifras: $10\\,000$ tiene cinco y $9999$, cuatro. Por tanto, $9999<10\\,000$.', 'أولًا عُدّ الأرقام: في $10\\,000$ خمسة أرقام وفي $9999$ أربعة. إذن $9999<10\\,000$.', 'First count the digits: $10\\,000$ has five and $9999$ has four. So $9999<10\\,000$.')
        },
        check: {
            prompt: say('Zein da zenbakirik handiena?', '¿Qué número es el mayor?', 'أيّ عدد هو الأكبر؟', 'Which number is the biggest?'),
            options: [same('$70\\,089$'), same('$69\\,998$'), same('$70\\,102$')],
            correctIndex: 2,
            explanation: say('$70\\,089$ eta $70\\,102$ zenbakiek 70 dute hasieran; hirugarren zifran, $1>0$. $69\\,998$ txikiagoa da: bigarren zifra 9 bada ere, lehena 6 da.', '$70\\,089$ y $70\\,102$ empiezan por 70; en la tercera cifra, $1>0$. $69\\,998$ es menor: aunque tenga nueves, empieza por 6.', 'يبدأ $70\\,089$ و$70\\,102$ بـ70؛ وفي الرقم الثالث $1>0$. أما $69\\,998$ فأصغر: يبدأ بـ6 مع أن فيه تسعات.', '$70\\,089$ and $70\\,102$ both start with 70; in the third digit, $1>0$. $69\\,998$ is smaller: it has nines, but it starts with 6.')
        }
    },
    roman: {
        mistake: {
            wrong: say('$\\mathrm{IIII}=4$ eta $\\mathrm{VV}=10$.', '$\\mathrm{IIII}=4$ y $\\mathrm{VV}=10$.', '$\\mathrm{IIII}=4$ و$\\mathrm{VV}=10$.', '$\\mathrm{IIII}=4$ and $\\mathrm{VV}=10$.'),
            right: say('I hiru aldiz errepikatzen da gehienez, eta V ez da errepikatzen: $\\mathrm{IV}=4$ eta $\\mathrm{X}=10$.', 'I se repite como mucho tres veces y V no se repite: $\\mathrm{IV}=4$ y $\\mathrm{X}=10$.', 'يتكرر I ثلاث مرات على الأكثر ولا يتكرر V: $\\mathrm{IV}=4$ و$\\mathrm{X}=10$.', 'I is repeated at most three times and V is never repeated: $\\mathrm{IV}=4$ and $\\mathrm{X}=10$.')
        },
        check: {
            prompt: say('Zein zenbaki da $\\mathrm{XLIX}$?', '¿Qué número es $\\mathrm{XLIX}$?', 'ما العدد $\\mathrm{XLIX}$؟', 'Which number is $\\mathrm{XLIX}$?'),
            options: [same('$71$'), same('$49$'), same('$51$')],
            correctIndex: 1,
            explanation: say('XL kendu egiten da, $50-10=40$, eta IX ere bai, $10-1=9$: $40+9=49$.', 'XL se resta, $50-10=40$, e IX también, $10-1=9$: $40+9=49$.', 'في XL نطرح، $50-10=40$، وكذلك في IX، $10-1=9$: $40+9=49$.', 'XL is a subtraction, $50-10=40$, and so is IX, $10-1=9$: $40+9=49$.')
        }
    },

    /* ---------- 2. Rounding and estimation ---------- */
    rounding: {
        mistake: {
            wrong: say('$7348$ ehunekoetara biribilduta $7400$ da, 8 zifra handia delako.', '$7348$ redondeado a las centenas es $7400$, porque el 8 es grande.', 'تقريب $7348$ إلى المئات هو $7400$ لأن الرقم 8 كبير.', '$7348$ rounded to the nearest hundred is $7400$, because the 8 is big.'),
            right: say('Ondoan eskuinean dagoen zifrak bakarrik balio du, 4 zifrak: $7348$ zenbakia $7300$ zenbakira biribiltzen da.', 'Solo cuenta la cifra que está justo a la derecha, el 4: $7348$ se redondea a $7300$.', 'لا يهم إلا الرقم الذي على اليمين مباشرة، وهو 4: يُقرَّب $7348$ إلى $7300$.', 'Only the digit right next to it counts, the 4: $7348$ rounds to $7300$.')
        },
        check: {
            prompt: say('Biribildu $6951$ ehunekoetara.', 'Redondea $6951$ a las centenas.', 'قرّب $6951$ إلى المئات.', 'Round $6951$ to the nearest hundred.'),
            options: [same('$6900$'), same('$6950$'), same('$7000$')],
            correctIndex: 2,
            explanation: say('Eskuineko zifra 5 da: ehunekoetako 9 zifrari 1 gehitzen zaio, eta bat eraman behar da. Beraz, $7000$.', 'La cifra de la derecha es 5: el 9 de las centenas sube 1 y se lleva una. Queda $7000$.', 'الرقم الذي على اليمين هو 5: نضيف 1 إلى الرقم 9 في المئات فيصير عشرة ونحمل واحدًا. النتيجة $7000$.', 'The digit on the right is 5: the 9 in the hundreds goes up by 1 and you carry one. You get $7000$.')
        }
    },
    estimation: {
        mistake: {
            wrong: say('$52\\cdot 48=596$, eta emaitza ematen dut estimatu gabe.', '$52\\cdot 48=596$, y doy el resultado sin estimarlo.', '$52\\cdot 48=596$، وأكتب النتيجة دون تقدير.', '$52\\cdot 48=596$, and I give the result without estimating it.'),
            right: say('Estimatu lehenik: $50\\cdot 50=2500$; beraz, 596 ezin da izan. Egiazkoa $2496$ da.', 'Estima antes: $50\\cdot 50=2500$, así que 596 no puede ser. El resultado bueno es $2496$.', 'قدّر أولًا: $50\\cdot 50=2500$، فلا يمكن أن تكون النتيجة 596. النتيجة الصحيحة $2496$.', 'Estimate first: $50\\cdot 50=2500$, so 596 cannot be right. The right result is $2496$.')
        },
        check: {
            prompt: say('Estimatu 398 eta 211 zenbakien batura, ehunekoetara biribilduta.', 'Estima la suma de 398 y 211 redondeando a las centenas.', 'قدّر مجموع 398 و211 بالتقريب إلى المئات.', 'Estimate the sum of 398 and 211 by rounding to the nearest hundred.'),
            options: [same('$500$'), same('$600$'), same('$700$')],
            correctIndex: 1,
            explanation: say('398 zenbakia 400 da gutxi gorabehera, eta 211 zenbakia 200: $400+200=600$.', '398 es casi 400 y 211, casi 200: $400+200=600$.', '398 قريب من 400 و211 قريب من 200: $400+200=600$.', '398 is almost 400 and 211 is almost 200: $400+200=600$.')
        }
    },

    /* ---------- 3. Basic operations ---------- */
    'add-subtract': {
        mistake: {
            wrong: say('$900-350=550$ egiaztatzeko, $900+550$ batzen dut.', 'Para comprobar $900-350=550$, sumo $900+550$.', 'للتحقق من $900-350=550$ أجمع $900+550$.', 'To check $900-350=550$, I add $900+550$.'),
            right: say('Kentzailea eta kendura batzen dira: $350+550=900$, kenkizuna.', 'Se suman el sustraendo y la diferencia: $350+550=900$, el minuendo.', 'نجمع المطروح والفرق: $350+550=900$، وهو المطروح منه.', 'You add the subtrahend and the difference: $350+550=900$, the minuend.')
        },
        check: {
            prompt: say('Zein baturak egiaztatzen du $5000-1275=3725$ kenketa?', '¿Qué suma comprueba la resta $5000-1275=3725$?', 'أيّ جمع يتحقق من الطرح $5000-1275=3725$؟', 'Which addition checks the subtraction $5000-1275=3725$?'),
            options: [same('$5000+3725$'), same('$5000+1275$'), same('$1275+3725$')],
            correctIndex: 2,
            explanation: say('Kentzailea gehi kendura kenkizuna da: $1275+3725=5000$.', 'Sustraendo más diferencia da el minuendo: $1275+3725=5000$.', 'المطروح زائد الفرق يساوي المطروح منه: $1275+3725=5000$.', 'Subtrahend plus difference gives the minuend: $1275+3725=5000$.')
        }
    },
    multiply: {
        mistake: {
            wrong: say('$4\\cdot(10+3)=40+3=43$', '$4\\cdot(10+3)=40+3=43$', '$4\\cdot(10+3)=40+3=43$', '$4\\cdot(10+3)=40+3=43$'),
            right: say('Bi batugaiak biderkatu behar dira: $4\\cdot(10+3)=40+12=52$.', 'Hay que multiplicar los dos sumandos: $4\\cdot(10+3)=40+12=52$.', 'يجب ضرب الحدّين كليهما: $4\\cdot(10+3)=40+12=52$.', 'You have to multiply both addends: $4\\cdot(10+3)=40+12=52$.')
        },
        check: {
            prompt: say('Zenbat da $7\\cdot(20+5)$?', '¿Cuánto es $7\\cdot(20+5)$?', 'كم يساوي $7\\cdot(20+5)$؟', 'What is $7\\cdot(20+5)$?'),
            options: [same('$145$'), same('$175$'), same('$140$')],
            correctIndex: 1,
            explanation: say('Banatze-propietatea: $7\\cdot 20+7\\cdot 5=140+35=175$.', 'Propiedad distributiva: $7\\cdot 20+7\\cdot 5=140+35=175$.', 'خاصية التوزيع: $7\\cdot 20+7\\cdot 5=140+35=175$.', 'Distributive property: $7\\cdot 20+7\\cdot 5=140+35=175$.')
        }
    },
    divide: {
        mistake: {
            wrong: say('$50\\mathbin{:}7$ zatiketan, zatidura 6 da eta 8 geratzen dira.', 'En $50\\mathbin{:}7$, el cociente es 6 y sobran 8.', 'في $50\\mathbin{:}7$ خارج القسمة 6 ويبقى 8.', 'In $50\\mathbin{:}7$, the quotient is 6 and 8 are left over.'),
            right: say('Hondarra zatitzailea baino txikiagoa izan behar da: $50=7\\cdot 7+1$; zatidura 7 da eta hondarra 1.', 'El resto tiene que ser menor que el divisor: $50=7\\cdot 7+1$; cociente 7 y resto 1.', 'يجب أن يكون الباقي أصغر من المقسوم عليه: $50=7\\cdot 7+1$؛ خارج القسمة 7 والباقي 1.', 'The remainder has to be smaller than the divisor: $50=7\\cdot 7+1$; quotient 7 and remainder 1.')
        },
        check: {
            prompt: say('Zatiketa batean, zatitzailea 8 da, zatidura 15 eta hondarra 3. Zein da zatikizuna?', 'En una división, el divisor es 8, el cociente 15 y el resto 3. ¿Cuál es el dividendo?', 'في قسمة، المقسوم عليه 8 وخارج القسمة 15 والباقي 3. ما المقسوم؟', 'In a division, the divisor is 8, the quotient is 15 and the remainder is 3. What is the dividend?'),
            options: [same('$120$'), same('$123$'), same('$26$')],
            correctIndex: 1,
            explanation: say('$D=d\\cdot c+r$: $8\\cdot 15+3=123$.', '$D=d\\cdot c+r$: $8\\cdot 15+3=123$.', '$D=d\\cdot c+r$: $8\\cdot 15+3=123$.', '$D=d\\cdot c+r$: $8\\cdot 15+3=123$.')
        }
    },

    /* ---------- 4. Order of operations and word problems ---------- */
    hierarchy: {
        mistake: {
            wrong: say('$10-2\\cdot 3=8\\cdot 3=24$', '$10-2\\cdot 3=8\\cdot 3=24$', '$10-2\\cdot 3=8\\cdot 3=24$', '$10-2\\cdot 3=8\\cdot 3=24$'),
            right: say('Biderketa lehenik: $10-2\\cdot 3=10-6=4$.', 'Primero la multiplicación: $10-2\\cdot 3=10-6=4$.', 'الضرب أولًا: $10-2\\cdot 3=10-6=4$.', 'Multiplication first: $10-2\\cdot 3=10-6=4$.')
        },
        check: {
            prompt: say('Zenbat da $15-12\\mathbin{:}3+2$?', '¿Cuánto es $15-12\\mathbin{:}3+2$?', 'كم يساوي $15-12\\mathbin{:}3+2$؟', 'What is $15-12\\mathbin{:}3+2$?'),
            options: [same('$9$'), same('$3$'), same('$13$')],
            correctIndex: 2,
            explanation: say('Zatiketa lehenik, $12\\mathbin{:}3=4$; gero ezkerretik eskuinera: $15-4+2=13$.', 'Primero la división, $12\\mathbin{:}3=4$; después de izquierda a derecha: $15-4+2=13$.', 'القسمة أولًا، $12\\mathbin{:}3=4$؛ ثم من اليسار إلى اليمين: $15-4+2=13$.', 'Division first, $12\\mathbin{:}3=4$; then from left to right: $15-4+2=13$.')
        }
    },
    brackets: {
        mistake: {
            wrong: say('$20-(5+3)=20-5+3=18$', '$20-(5+3)=20-5+3=18$', '$20-(5+3)=20-5+3=18$', '$20-(5+3)=20-5+3=18$'),
            right: say('Parentesia lehenik: $20-(5+3)=20-8=12$.', 'El paréntesis va primero: $20-(5+3)=20-8=12$.', 'القوس أولًا: $20-(5+3)=20-8=12$.', 'The bracket goes first: $20-(5+3)=20-8=12$.')
        },
        check: {
            prompt: say('Zenbat da $2\\cdot[15-(4+6)]$?', '¿Cuánto es $2\\cdot[15-(4+6)]$?', 'كم يساوي $2\\cdot[15-(4+6)]$؟', 'What is $2\\cdot[15-(4+6)]$?'),
            options: [same('$10$'), same('$34$'), same('$20$')],
            correctIndex: 0,
            explanation: say('Barrutik kanpora: $4+6=10$; $15-10=5$; $2\\cdot 5=10$.', 'De dentro hacia fuera: $4+6=10$; $15-10=5$; $2\\cdot 5=10$.', 'من الداخل إلى الخارج: $4+6=10$؛ $15-10=5$؛ $2\\cdot 5=10$.', 'From the inside out: $4+6=10$; $15-10=5$; $2\\cdot 5=10$.')
        }
    },
    problems: {
        mistake: {
            wrong: say('Erantzuna: 96.', 'Respuesta: 96.', 'الجواب: 96.', 'Answer: 96.'),
            right: say('Zenbaki bat bakarrik ez da erantzuna: «96 aulki behar ditugu».', 'Un número solo no es una respuesta: «Necesitamos 96 sillas».', 'العدد وحده ليس جوابًا: «نحتاج إلى 96 كرسيًا».', 'A number on its own is not an answer: «We need 96 chairs».')
        },
        check: {
            prompt: say('6 kutxa daude, 24 arkatzekin bakoitza, eta 8 ikasleren artean banatzen dira. Zein eragiketak ebazten du?', 'Hay 6 cajas con 24 lápices cada una y se reparten entre 8 alumnos. ¿Qué operación lo resuelve?', 'هناك 6 علب في كل منها 24 قلمًا، تُوزَّع على 8 طلاب. أيّ عملية تحل المسألة؟', 'There are 6 boxes with 24 pencils each, shared among 8 pupils. Which calculation solves it?'),
            options: [same('$6+24\\mathbin{:}8$'), same('$6\\cdot 24\\mathbin{:}8$'), same('$6\\cdot 8\\mathbin{:}24$')],
            correctIndex: 1,
            explanation: say('Lehenik arkatz guztiak, $6\\cdot 24=144$, eta gero banatu: $144\\mathbin{:}8=18$ arkatz ikasle bakoitzeko.', 'Primero todos los lápices, $6\\cdot 24=144$, y luego el reparto: $144\\mathbin{:}8=18$ lápices por alumno.', 'أولًا كل الأقلام، $6\\cdot 24=144$، ثم التوزيع: $144\\mathbin{:}8=18$ قلمًا لكل طالب.', 'First all the pencils, $6\\cdot 24=144$, then the sharing: $144\\mathbin{:}8=18$ pencils per pupil.')
        }
    },

    /* ---------- 5. Powers ---------- */
    powers: {
        mistake: {
            wrong: say('$2^{5}=2\\cdot 5=10$', '$2^{5}=2\\cdot 5=10$', '$2^{5}=2\\cdot 5=10$', '$2^{5}=2\\cdot 5=10$'),
            right: say('Berretzaileak faktoreak zenbatzen ditu: $2^{5}=2\\cdot 2\\cdot 2\\cdot 2\\cdot 2=32$.', 'El exponente cuenta los factores: $2^{5}=2\\cdot 2\\cdot 2\\cdot 2\\cdot 2=32$.', 'الأسّ يعدّ العوامل: $2^{5}=2\\cdot 2\\cdot 2\\cdot 2\\cdot 2=32$.', 'The exponent counts the factors: $2^{5}=2\\cdot 2\\cdot 2\\cdot 2\\cdot 2=32$.')
        },
        check: {
            prompt: say('Zenbat balio du $6^{2}$?', '¿Cuánto vale $6^{2}$?', 'كم تساوي $6^{2}$؟', 'What is $6^{2}$?'),
            options: [same('$12$'), same('$36$'), same('$8$')],
            correctIndex: 1,
            explanation: say('Karratua: 6 bi aldiz biderkatzen da, $6\\cdot 6=36$.', 'Al cuadrado: el 6 se multiplica dos veces, $6\\cdot 6=36$.', 'المربع: نضرب 6 في نفسه مرتين، $6\\cdot 6=36$.', 'Squared: the 6 is multiplied twice, $6\\cdot 6=36$.')
        }
    },
    'powers-of-ten': {
        mistake: {
            wrong: say('$10^{4}=40$', '$10^{4}=40$', '$10^{4}=40$', '$10^{4}=40$'),
            right: say('$10^{4}$ zenbakia 1 eta lau zero da: $10^{4}=10\\,000$.', '$10^{4}$ es un 1 seguido de cuatro ceros: $10^{4}=10\\,000$.', '$10^{4}$ هو 1 متبوعًا بأربعة أصفار: $10^{4}=10\\,000$.', '$10^{4}$ is a 1 followed by four zeros: $10^{4}=10\\,000$.')
        },
        check: {
            prompt: say('Zein zenbaki da $3\\cdot 10^{5}$?', '¿Qué número es $3\\cdot 10^{5}$?', 'ما العدد $3\\cdot 10^{5}$؟', 'Which number is $3\\cdot 10^{5}$?'),
            options: [same('$15$'), same('$30\\,000$'), same('$300\\,000$')],
            correctIndex: 2,
            explanation: say('$10^{5}$ zenbakiak bost zero ditu: $3\\cdot 100\\,000=300\\,000$.', '$10^{5}$ tiene cinco ceros: $3\\cdot 100\\,000=300\\,000$.', 'في $10^{5}$ خمسة أصفار: $3\\cdot 100\\,000=300\\,000$.', '$10^{5}$ has five zeros: $3\\cdot 100\\,000=300\\,000$.')
        }
    }
}
