import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Zatigarritasuna · 1. DBH — the typical mistake and the «Check it»
   question of every lesson. Plain data (no JSX) so the tests can import it;
   lessons.tsx merges it into the topics. The questions use new numbers,
   never those of «Let's solve» or of the example, and one of their wrong
   answers is the lesson's typical mistake. ZKH / m.c.d. / GCD (and ق.م.أ
   in Arabic) go in the words, never inside $…$: the formulas are the same
   in every language.
   ========================================================================== */

export type DivisibilityIntroTopicId = 'relation' | 'multiples' | 'divisors' | 'criteria-digit' | 'criteria-sum' | 'primes' | 'factorization' | 'divisor-table' | 'gcd' | 'lcm' | 'which' | 'method'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const divisibilityIntroLessonChecks: Record<DivisibilityIntroTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Multiples and divisors ---------- */
    relation: {
        mistake: {
            wrong: say('$43\\mathbin{:}8$ zatiketak 5 ematen du; beraz, 43 zenbakia 8 zenbakiaren multiploa da.', '$43\\mathbin{:}8$ da 5, así que 43 es múltiplo de 8.', '$43\\mathbin{:}8$ يعطي 5، إذن 43 مضاعف لـ8.', '$43\\mathbin{:}8$ gives 5, so 43 is a multiple of 8.'),
            right: say('Begiratu hondarrari: $43=8\\cdot 5+3$. Ez da 0; beraz, 43 ez da 8 zenbakiaren multiploa.', 'Mira el resto: $43=8\\cdot 5+3$. No es 0, así que 43 no es múltiplo de 8.', 'انظر إلى الباقي: $43=8\\cdot 5+3$. ليس 0، إذن 43 ليس مضاعفًا لـ8.', 'Look at the remainder: $43=8\\cdot 5+3$. It is not 0, so 43 is not a multiple of 8.')
        },
        check: {
            prompt: say('Zein esaldi da zuzena?', '¿Qué frase es correcta?', 'أيّ جملة صحيحة؟', 'Which sentence is right?'),
            options: [
                say('9 zenbakia 54 zenbakiaren zatitzailea da.', '9 es divisor de 54.', '9 قاسم لـ54.', '9 is a divisor of 54.'),
                say('54 zenbakia 9 zenbakiaren zatitzailea da.', '54 es divisor de 9.', '54 قاسم لـ9.', '54 is a divisor of 9.'),
                say('9 zenbakia 54 zenbakiaren multiploa da.', '9 es múltiplo de 54.', '9 مضاعف لـ54.', '9 is a multiple of 54.')
            ],
            correctIndex: 0,
            explanation: say('$54=9\\cdot 6$: zatiketa zehatza da. 9 zenbakia 54 zenbakiaren zatitzailea da, eta 54 zenbakia 9 zenbakiaren multiploa.', '$54=9\\cdot 6$: la división es exacta. 9 es divisor de 54, y 54 es múltiplo de 9.', '$54=9\\cdot 6$: القسمة تامة. فالعدد 9 قاسم لـ54، و54 مضاعف لـ9.', '$54=9\\cdot 6$: the division is exact. 9 is a divisor of 54, and 54 is a multiple of 9.')
        }
    },
    multiples: {
        mistake: {
            wrong: say('8 zenbakiaren multiploak $\\mathrm{M}(8)=\\{1,\\ 2,\\ 4,\\ 8\\}$ dira.', 'Los múltiplos de 8 son $\\mathrm{M}(8)=\\{1,\\ 2,\\ 4,\\ 8\\}$.', 'مضاعفات 8 هي $\\mathrm{M}(8)=\\{1,\\ 2,\\ 4,\\ 8\\}$.', 'The multiples of 8 are $\\mathrm{M}(8)=\\{1,\\ 2,\\ 4,\\ 8\\}$.'),
            right: say('Horiek zatitzaileak dira. Multiploak biderkatuz ateratzen dira, eta ez dira amaitzen: $\\mathrm{M}(8)=\\{8,\\ 16,\\ 24,\\ 32,\\ \\dots\\}$.', 'Esos son los divisores. Los múltiplos salen multiplicando y no se acaban: $\\mathrm{M}(8)=\\{8,\\ 16,\\ 24,\\ 32,\\ \\dots\\}$.', 'هذه هي القواسم. المضاعفات نحصل عليها بالضرب ولا تنتهي: $\\mathrm{M}(8)=\\{8,\\ 16,\\ 24,\\ 32,\\ \\dots\\}$.', 'Those are the divisors. Multiples come from multiplying and never end: $\\mathrm{M}(8)=\\{8,\\ 16,\\ 24,\\ 32,\\ \\dots\\}$.')
        },
        check: {
            prompt: say('Zein zerrendak ditu 6 zenbakiaren multiploak bakarrik?', '¿Qué lista tiene solo múltiplos de 6?', 'أيّ قائمة فيها مضاعفات 6 فقط؟', 'Which list has only multiples of 6?'),
            options: [same('$1,\\ 2,\\ 3,\\ 6$'), same('$12,\\ 30,\\ 42$'), same('$6,\\ 16,\\ 26$')],
            correctIndex: 1,
            explanation: say('$12=6\\cdot 2$, $30=6\\cdot 5$ eta $42=6\\cdot 7$. Lehen zerrenda zatitzaileak dira, eta 16 eta 26 ez dira 6 zenbakiaren multiploak.', '$12=6\\cdot 2$, $30=6\\cdot 5$ y $42=6\\cdot 7$. La primera lista son divisores, y 16 y 26 no son múltiplos de 6.', '$12=6\\cdot 2$ و$30=6\\cdot 5$ و$42=6\\cdot 7$. القائمة الأولى قواسم، و16 و26 ليسا مضاعفين لـ6.', '$12=6\\cdot 2$, $30=6\\cdot 5$ and $42=6\\cdot 7$. The first list is divisors, and 16 and 26 are not multiples of 6.')
        }
    },
    divisors: {
        mistake: {
            wrong: say('28 zenbakiaren zatitzaileak 2, 4, 7 eta 14 dira.', 'Los divisores de 28 son 2, 4, 7 y 14.', 'قواسم 28 هي 2 و4 و7 و14.', 'The divisors of 28 are 2, 4, 7 and 14.'),
            right: say('1 eta 28 falta dira: zatitzaileak bikoteka datoz, $28=1\\cdot 28=2\\cdot 14=4\\cdot 7$.', 'Faltan 1 y 28: los divisores vienen por parejas, $28=1\\cdot 28=2\\cdot 14=4\\cdot 7$.', 'ينقص 1 و28: القواسم تأتي أزواجًا، $28=1\\cdot 28=2\\cdot 14=4\\cdot 7$.', '1 and 28 are missing: divisors come in pairs, $28=1\\cdot 28=2\\cdot 14=4\\cdot 7$.')
        },
        check: {
            prompt: say('Zenbat zatitzaile ditu 16 zenbakiak?', '¿Cuántos divisores tiene 16?', 'كم قاسمًا للعدد 16؟', 'How many divisors does 16 have?'),
            options: [same('$5$'), same('$3$'), same('$4$')],
            correctIndex: 0,
            explanation: say('$16=1\\cdot 16=2\\cdot 8=4\\cdot 4$: 1, 2, 4, 8 eta 16. Bost dira (4 zenbakia behin bakarrik zenbatzen da).', '$16=1\\cdot 16=2\\cdot 8=4\\cdot 4$: 1, 2, 4, 8 y 16. Son cinco (el 4 cuenta una sola vez).', '$16=1\\cdot 16=2\\cdot 8=4\\cdot 4$: 1 و2 و4 و8 و16. خمسة قواسم (العدد 4 يُعدّ مرة واحدة).', '$16=1\\cdot 16=2\\cdot 8=4\\cdot 4$: 1, 2, 4, 8 and 16. That is five (the 4 counts only once).')
        }
    },

    /* ---------- 2. Divisibility rules ---------- */
    'criteria-digit': {
        mistake: {
            wrong: say('$1570$ ez da 5 zenbakiarekin zatigarria, ez delako 5 zifran amaitzen.', '$1570$ no es divisible por 5, porque no acaba en 5.', '$1570$ لا يقبل القسمة على 5 لأنه لا ينتهي بـ5.', '$1570$ is not divisible by 5, because it does not end in 5.'),
            right: say('5 zenbakiarekin zatigarria da 0 edo 5 zifran amaitzen dena: $1570$ zenbakia zatigarria da.', 'Es divisible por 5 lo que acaba en 0 o en 5: $1570$ sí lo es.', 'يقبل القسمة على 5 كل عدد ينتهي بـ0 أو 5: إذن $1570$ يقبلها.', 'Anything ending in 0 or 5 is divisible by 5: $1570$ is.')
        },
        check: {
            prompt: say('Zein zenbaki da zatigarria 2 eta 5 zenbakiekin aldi berean?', '¿Qué número es divisible por 2 y por 5 a la vez?', 'أيّ عدد يقبل القسمة على 2 وعلى 5 معًا؟', 'Which number is divisible by both 2 and 5?'),
            options: [same('$3455$'), same('$2468$'), same('$6010$')],
            correctIndex: 2,
            explanation: say('2 eta 5 zenbakiekin batera zatigarria izateko, 0 zifran amaitu behar du: $6010$.', 'Para ser divisible por 2 y por 5 a la vez tiene que acabar en 0: $6010$.', 'ليقبل القسمة على 2 و5 معًا يجب أن ينتهي بـ0: $6010$.', 'To be divisible by 2 and 5 at once it has to end in 0: $6010$.')
        }
    },
    'criteria-sum': {
        mistake: {
            wrong: say('417 ez da 3 zenbakiarekin zatigarria, 7 zifran amaitzen delako.', '417 no es divisible por 3, porque acaba en 7.', '417 لا يقبل القسمة على 3 لأنه ينتهي بـ7.', '417 is not divisible by 3, because it ends in 7.'),
            right: say('3 zenbakiarentzat zifrak batzen dira: $4+1+7=12$, 3 zenbakiaren multiploa. Zatigarria da.', 'Para el 3 se suman las cifras: $4+1+7=12$, múltiplo de 3. Sí es divisible.', 'للعدد 3 نجمع الأرقام: $4+1+7=12$، وهو مضاعف لـ3. إذن يقبل القسمة.', 'For 3 you add the digits: $4+1+7=12$, a multiple of 3. It is divisible.')
        },
        check: {
            prompt: say('Zein zenbaki da zatigarria 9 zenbakiarekin?', '¿Qué número es divisible por 9?', 'أيّ عدد يقبل القسمة على 9؟', 'Which number is divisible by 9?'),
            options: [same('$3912$'), same('$5122$'), same('$4815$')],
            correctIndex: 2,
            explanation: say('$4+8+1+5=18$, 9 zenbakiaren multiploa. $3912$ zenbakian batura 15 da: 3 zenbakiarekin bai, baina 9 zenbakiarekin ez.', '$4+8+1+5=18$, múltiplo de 9. En $3912$ la suma es 15: divisible por 3, pero no por 9.', '$4+8+1+5=18$ وهو مضاعف لـ9. أما في $3912$ فالمجموع 15: يقبل القسمة على 3 لا على 9.', '$4+8+1+5=18$, a multiple of 9. In $3912$ the sum is 15: divisible by 3, but not by 9.')
        }
    },

    /* ---------- 3. Primes and factorisation ---------- */
    primes: {
        mistake: {
            wrong: say('57 lehena da, bakoitia delako.', '57 es primo, porque es impar.', '57 عدد أولي لأنه فردي.', '57 is prime, because it is odd.'),
            right: say('$57=3\\cdot 19$: bi zatitzaile baino gehiago ditu; beraz, konposatua da.', '$57=3\\cdot 19$: tiene más de dos divisores, así que es compuesto.', '$57=3\\cdot 19$: له أكثر من قاسمين، إذن هو مؤلف.', '$57=3\\cdot 19$: it has more than two divisors, so it is composite.')
        },
        check: {
            prompt: say('Zein zerrendak ditu zenbaki lehenak bakarrik?', '¿Qué lista tiene solo números primos?', 'أيّ قائمة فيها أعداد أولية فقط؟', 'Which list has only prime numbers?'),
            options: [same('$1,\\ 5,\\ 11$'), same('$2,\\ 17,\\ 23$'), same('$9,\\ 13,\\ 29$')],
            correctIndex: 1,
            explanation: say('1 ez da lehena (zatitzaile bakarra du), eta $9=3\\cdot 3$ konposatua da. 2, 17 eta 23 zenbakiek bi zatitzaile dituzte.', 'El 1 no es primo (tiene un solo divisor) y $9=3\\cdot 3$ es compuesto. 2, 17 y 23 tienen dos divisores.', 'العدد 1 ليس أوليًا (له قاسم واحد)، و$9=3\\cdot 3$ مؤلف. أما 2 و17 و23 فلكل منها قاسمان.', '1 is not prime (it has only one divisor) and $9=3\\cdot 3$ is composite. 2, 17 and 23 have two divisors.')
        }
    },
    factorization: {
        mistake: {
            wrong: say('$126=2\\cdot 7\\cdot 9$', '$126=2\\cdot 7\\cdot 9$', '$126=2\\cdot 7\\cdot 9$', '$126=2\\cdot 7\\cdot 9$'),
            right: say('9 ez da lehena: $9=3^{2}$. Beraz, $126=2\\cdot 3^{2}\\cdot 7$.', '9 no es primo: $9=3^{2}$. Así que $126=2\\cdot 3^{2}\\cdot 7$.', '9 ليس أوليًا: $9=3^{2}$. إذن $126=2\\cdot 3^{2}\\cdot 7$.', '9 is not prime: $9=3^{2}$. So $126=2\\cdot 3^{2}\\cdot 7$.')
        },
        check: {
            prompt: say('Nola deskonposatzen da 60 biderkagai lehenetan?', '¿Cómo se descompone 60 en factores primos?', 'كيف يُحلَّل 60 إلى عوامل أولية؟', 'How is 60 broken into prime factors?'),
            options: [same('$2^{2}\\cdot 15$'), same('$2\\cdot 5\\cdot 6$'), same('$2^{2}\\cdot 3\\cdot 5$')],
            correctIndex: 2,
            explanation: say('15 eta 6 ez dira lehenak. $60=2\\cdot 2\\cdot 3\\cdot 5=2^{2}\\cdot 3\\cdot 5$.', '15 y 6 no son primos. $60=2\\cdot 2\\cdot 3\\cdot 5=2^{2}\\cdot 3\\cdot 5$.', '15 و6 ليسا أوليين. $60=2\\cdot 2\\cdot 3\\cdot 5=2^{2}\\cdot 3\\cdot 5$.', '15 and 6 are not prime. $60=2\\cdot 2\\cdot 3\\cdot 5=2^{2}\\cdot 3\\cdot 5$.')
        }
    },
    'divisor-table': {
        mistake: {
            wrong: say('$12=2^{2}\\cdot 3$ zenbakiaren zatitzaileak 1, 2, 3, 4 eta 12 dira.', 'Los divisores de $12=2^{2}\\cdot 3$ son 1, 2, 3, 4 y 12.', 'قواسم $12=2^{2}\\cdot 3$ هي 1 و2 و3 و4 و12.', 'The divisors of $12=2^{2}\\cdot 3$ are 1, 2, 3, 4 and 12.'),
            right: say('Taulak $2\\cdot 3=6$ ere ematen du: zatitzaileak 1, 2, 3, 4, 6 eta 12 dira.', 'La tabla también da $2\\cdot 3=6$: los divisores son 1, 2, 3, 4, 6 y 12.', 'يعطي الجدول أيضًا $2\\cdot 3=6$: القواسم هي 1 و2 و3 و4 و6 و12.', 'The table also gives $2\\cdot 3=6$: the divisors are 1, 2, 3, 4, 6 and 12.')
        },
        check: {
            prompt: say('Zenbat zatitzaile ditu $24=2^{3}\\cdot 3$ zenbakiak?', '¿Cuántos divisores tiene $24=2^{3}\\cdot 3$?', 'كم قاسمًا للعدد $24=2^{3}\\cdot 3$؟', 'How many divisors does $24=2^{3}\\cdot 3$ have?'),
            options: [same('$8$'), same('$6$'), same('$4$')],
            correctIndex: 0,
            explanation: say('Taulak lauko 2 errenkada ditu: 1, 2, 4, 8 eta 3, 6, 12, 24. 8 zatitzaile dira.', 'La tabla tiene 2 filas de 4: 1, 2, 4, 8 y 3, 6, 12, 24. Son 8 divisores.', 'في الجدول صفّان من 4: 1، 2، 4، 8 و3، 6، 12، 24. إذن 8 قواسم.', 'The table has 2 rows of 4: 1, 2, 4, 8 and 3, 6, 12, 24. That is 8 divisors.')
        }
    },

    /* ---------- 4. GCD and LCM ---------- */
    gcd: {
        mistake: {
            wrong: say('$8=2^{3}$ eta $12=2^{2}\\cdot 3$; beraz, haien ZKH $2^{3}\\cdot 3=24$ da.', '$8=2^{3}$ y $12=2^{2}\\cdot 3$, así que su m.c.d. es $2^{3}\\cdot 3=24$.', '$8=2^{3}$ و$12=2^{2}\\cdot 3$، إذن ق.م.أ لهما $2^{3}\\cdot 3=24$.', '$8=2^{3}$ and $12=2^{2}\\cdot 3$, so their GCD is $2^{3}\\cdot 3=24$.'),
            right: say('Hori MKT da. ZKHk biderkagai komunak bakarrik hartzen ditu, berretzaile txikienarekin: $2^{2}=4$.', 'Eso es el m.c.m. El m.c.d. lleva solo los factores comunes, con el menor exponente: $2^{2}=4$.', 'هذا هو م.م.أ. أما ق.م.أ فيأخذ العوامل المشتركة فقط بأصغر أس: $2^{2}=4$.', 'That is the LCM. The GCD takes only the common factors, with the smallest exponent: $2^{2}=4$.')
        },
        check: {
            prompt: say('Zein da 16 eta 40 zenbakien ZKH?', '¿Cuál es el m.c.d. de 16 y 40?', 'ما ق.م.أ للعددين 16 و40؟', 'What is the GCD of 16 and 40?'),
            options: [same('$80$'), same('$8$'), same('$4$')],
            correctIndex: 1,
            explanation: say('$16=2^{4}$ eta $40=2^{3}\\cdot 5$. Komuna 2 da, berretzaile txikienarekin: $2^{3}=8$.', '$16=2^{4}$ y $40=2^{3}\\cdot 5$. Común es el 2, con el menor exponente: $2^{3}=8$.', '$16=2^{4}$ و$40=2^{3}\\cdot 5$. العامل المشترك 2 بأصغر أس: $2^{3}=8$.', '$16=2^{4}$ and $40=2^{3}\\cdot 5$. The common factor is 2, with the smallest exponent: $2^{3}=8$.')
        }
    },
    lcm: {
        mistake: {
            wrong: say('4 eta 10 zenbakien MKT $4\\cdot 10=40$ da.', 'El m.c.m. de 4 y 10 es $4\\cdot 10=40$.', 'م.م.أ للعددين 4 و10 هو $4\\cdot 10=40$.', 'The LCM of 4 and 10 is $4\\cdot 10=40$.'),
            right: say('Biderkadura da biderkagai komunik ez dutenean bakarrik. $4=2^{2}$ eta $10=2\\cdot 5$: MKT $2^{2}\\cdot 5=20$ da.', 'Solo es el producto si no tienen factores comunes. $4=2^{2}$ y $10=2\\cdot 5$: el m.c.m. es $2^{2}\\cdot 5=20$.', 'يكون حاصل الضرب فقط إذا لم تكن بينهما عوامل مشتركة. $4=2^{2}$ و$10=2\\cdot 5$: م.م.أ هو $2^{2}\\cdot 5=20$.', 'It is the product only if they have no common factors. $4=2^{2}$ and $10=2\\cdot 5$: the LCM is $2^{2}\\cdot 5=20$.')
        },
        check: {
            prompt: say('Zein da 8 eta 14 zenbakien MKT?', '¿Cuál es el m.c.m. de 8 y 14?', 'ما م.م.أ للعددين 8 و14؟', 'What is the LCM of 8 and 14?'),
            options: [same('$112$'), same('$56$'), same('$2$')],
            correctIndex: 1,
            explanation: say('$8=2^{3}$ eta $14=2\\cdot 7$. Guztiak, berretzaile handienarekin: $2^{3}\\cdot 7=56$.', '$8=2^{3}$ y $14=2\\cdot 7$. Todos, con el mayor exponente: $2^{3}\\cdot 7=56$.', '$8=2^{3}$ و$14=2\\cdot 7$. كل العوامل بأكبر أس: $2^{3}\\cdot 7=56$.', '$8=2^{3}$ and $14=2\\cdot 7$. All of them, with the biggest exponent: $2^{3}\\cdot 7=56$.')
        }
    },

    /* ---------- 5. Problems ---------- */
    which: {
        mistake: {
            wrong: say('30 cm eta 45 cm-ko bi soka zati berdinetan moztu nahi ditut, ahalik eta luzeenak: MKT, 90 cm.', 'Quiero cortar dos cuerdas de 30 cm y 45 cm en trozos iguales lo más largos posible: m.c.m., 90 cm.', 'أريد قطع حبلين طولهما 30 سم و45 سم إلى قطع متساوية أطول ما يمكن: م.م.أ، 90 سم.', 'I want to cut two ropes of 30 cm and 45 cm into equal pieces as long as possible: LCM, 90 cm.'),
            right: say('Zati bat ezin da soka baino luzeagoa izan: banaketa bat da, ZKH. Zatiek 15 cm neurtuko dute.', 'Un trozo no puede ser más largo que la cuerda: es un reparto, m.c.d. Los trozos medirán 15 cm.', 'لا يمكن أن تكون القطعة أطول من الحبل: هذا توزيع، ق.م.أ. ستكون كل قطعة 15 سم.', 'A piece cannot be longer than the rope: it is a sharing problem, GCD. The pieces will be 15 cm long.')
        },
        check: {
            prompt: say('20 sagar eta 30 udare ditugu. Erretilu berdinak egin nahi ditugu, ahalik eta fruta gehienekin eta nahastu gabe. Zer behar dugu?', 'Hay 20 manzanas y 30 peras. Queremos hacer bandejas iguales, con el mayor número posible de frutas y sin mezclar. ¿Qué necesitamos?', 'لدينا 20 تفاحة و30 إجاصة. نريد صواني متساوية، فيها أكبر عدد ممكن من الفاكهة ودون خلط. ماذا نحتاج؟', 'There are 20 apples and 30 pears. We want equal trays, with as many fruits as possible and without mixing. What do we need?'),
            options: [say('MKT', 'El m.c.m.', 'م.م.أ', 'The LCM'), say('ZKH', 'El m.c.d.', 'ق.م.أ', 'The GCD'), say('Biak', 'Los dos', 'كلاهما', 'Both')],
            correctIndex: 1,
            explanation: say('Fruta banatzen dugu, soberan utzi gabe: ZKH. Erretilu bakoitzean 10 fruta.', 'Repartimos fruta sin que sobre: m.c.d. En cada bandeja, 10 frutas.', 'نوزّع الفاكهة دون أن يبقى شيء: ق.م.أ. في كل صينية 10 حبات.', 'We share fruit with nothing left over: GCD. Each tray has 10 fruits.')
        }
    },
    method: {
        mistake: {
            wrong: say('Bi argik 6 eta 9 segundoro egiten dute keinu. Erantzuna: 18.', 'Dos luces parpadean cada 6 y cada 9 segundos. Respuesta: 18.', 'ضوءان يومضان كل 6 ثوانٍ وكل 9 ثوانٍ. الجواب: 18.', 'Two lights blink every 6 and every 9 seconds. Answer: 18.'),
            right: say('Erantzun esaldi batez eta unitateekin: «18 segundo barru egingo dute keinu berriro batera».', 'Responde con una frase y con unidades: «Vuelven a parpadear a la vez dentro de 18 segundos».', 'أجب بجملة مع الوحدات: «يومضان معًا من جديد بعد 18 ثانية».', 'Answer with a sentence and with units: «They blink together again in 18 seconds».')
        },
        check: {
            prompt: say('18 arkatz eta 30 borragoma ditugu. Ahalik eta sorta berdin gehien egin nahi ditugu, ezer soberan utzi gabe. Zenbat sorta aterako dira?', 'Tenemos 18 lápices y 30 gomas. Queremos hacer el mayor número posible de lotes iguales, sin que sobre nada. ¿Cuántos lotes saldrán?', 'لدينا 18 قلمًا و30 ممحاة. نريد أكبر عدد ممكن من الحِزم المتساوية دون أن يبقى شيء. كم حزمة سنحصل عليها؟', 'We have 18 pencils and 30 rubbers. We want as many equal packs as possible, with nothing left over. How many packs will there be?'),
            options: [same('$90$'), same('$6$'), same('$3$')],
            correctIndex: 1,
            explanation: say('Banaketa bat da: ZKH. $18=2\\cdot 3^{2}$ eta $30=2\\cdot 3\\cdot 5$; beraz, $2\\cdot 3=6$ sorta, bakoitza 3 arkatz eta 5 borragomarekin.', 'Es un reparto: m.c.d. $18=2\\cdot 3^{2}$ y $30=2\\cdot 3\\cdot 5$, así que salen $2\\cdot 3=6$ lotes, cada uno con 3 lápices y 5 gomas.', 'إنه توزيع: ق.م.أ. $18=2\\cdot 3^{2}$ و$30=2\\cdot 3\\cdot 5$، إذن $2\\cdot 3=6$ حزم، في كل منها 3 أقلام و5 مماحٍ.', 'It is a sharing problem: GCD. $18=2\\cdot 3^{2}$ and $30=2\\cdot 3\\cdot 5$, so there are $2\\cdot 3=6$ packs, each with 3 pencils and 5 rubbers.')
        }
    }
}
