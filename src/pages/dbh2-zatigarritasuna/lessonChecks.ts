import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Zatigarritasuna · 2. DBH — the typical mistake and the «Check it» question
   of every lesson. Plain data (no JSX) so the tests can import it;
   lessons.tsx merges it into the topics. The questions use new numbers,
   never those of «Let's solve» or of the example, and one of their wrong
   answers is the lesson's typical mistake. ZKH / m.c.d. / GCD change with
   the language, so they go in the words, never inside $…$.
   ========================================================================== */

export type DivisibilityTopicId = 'relation' | 'multiples' | 'divisors' | 'criteria-digit' | 'criteria-sum' | 'criteria-11-7' | 'primes' | 'factorization' | 'gcd' | 'lcm' | 'which' | 'method'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value })

export const divisibilityLessonChecks: Record<DivisibilityTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    relation: {
        mistake: {
            wrong: say('$38\\mathbin{:}7$ zatiketak 5 ematen du; beraz, 38 zenbakia 7 zenbakiaren multiploa da.', '$38\\mathbin{:}7$ da 5, así que 38 es múltiplo de 7.', '$38\\mathbin{:}7$ يعطي 5، إذن 38 مضاعف للعدد 7.', '$38\\mathbin{:}7$ gives 5, so 38 is a multiple of 7.'),
            right: say('Hondarrari begiratu behar zaio: $38=7\\cdot 5+3$. Hondarra 3 da, ez 0: 38 ez da 7 zenbakiaren multiploa.', 'Hay que mirar el resto: $38=7\\cdot 5+3$. El resto es 3, no 0: 38 no es múltiplo de 7.', 'يجب النظر إلى الباقي: $38=7\\cdot 5+3$. الباقي 3 وليس 0: إذن 38 ليس مضاعفًا للعدد 7.', 'Look at the remainder: $38=7\\cdot 5+3$. The remainder is 3, not 0: 38 is not a multiple of 7.')
        },
        check: {
            prompt: say('Zein esaldi dago ondo?', '¿Qué frase es correcta?', 'أيّ جملة صحيحة؟', 'Which sentence is correct?'),
            options: [
                say('6 zenbakia 42 zenbakiaren multiploa da', '6 es múltiplo de 42', '6 مضاعف للعدد 42', '6 is a multiple of 42'),
                say('7 zenbakia 42 zenbakiaren zatitzailea da', '7 es divisor de 42', '7 قاسم للعدد 42', '7 is a divisor of 42'),
                say('42 zenbakia 8 zenbakiaren multiploa da', '42 es múltiplo de 8', '42 مضاعف للعدد 8', '42 is a multiple of 8')
            ],
            correctIndex: 1,
            explanation: say('$42=7\\cdot 6$ eta hondarra 0 da: 7 zenbakia 42 zenbakiaren zatitzailea da. Multiploa handia da, ez txikia; eta $42=8\\cdot 5+2$.', '$42=7\\cdot 6$ y el resto es 0: 7 es divisor de 42. El múltiplo es el grande, no el pequeño; y $42=8\\cdot 5+2$.', '$42=7\\cdot 6$ والباقي 0: إذن 7 قاسم للعدد 42. المضاعف هو الكبير لا الصغير؛ و$42=8\\cdot 5+2$.', '$42=7\\cdot 6$ and the remainder is 0: 7 is a divisor of 42. The multiple is the big one, not the small one; and $42=8\\cdot 5+2$.')
        }
    },
    multiples: {
        mistake: {
            wrong: say('6 zenbakiaren multiploak: $\\mathrm{M}(6)=\\{1,\\ 2,\\ 3,\\ 6\\}$.', 'Los múltiplos de 6 son $\\mathrm{M}(6)=\\{1,\\ 2,\\ 3,\\ 6\\}$.', 'مضاعفات 6 هي $\\mathrm{M}(6)=\\{1,\\ 2,\\ 3,\\ 6\\}$.', 'The multiples of 6 are $\\mathrm{M}(6)=\\{1,\\ 2,\\ 3,\\ 6\\}$.'),
            right: say('Horiek zatitzaileak dira. Multiploak biderkatuz lortzen dira, eta ez dute amaierarik: $\\mathrm{M}(6)=\\{6,\\ 12,\\ 18,\\ 24,\\ \\dots\\}$.', 'Esos son los divisores. Los múltiplos salen multiplicando y no se acaban: $\\mathrm{M}(6)=\\{6,\\ 12,\\ 18,\\ 24,\\ \\dots\\}$.', 'هذه هي القواسم. المضاعفات تأتي من الضرب ولا تنتهي: $\\mathrm{M}(6)=\\{6,\\ 12,\\ 18,\\ 24,\\ \\dots\\}$.', 'Those are the divisors. Multiples come from multiplying and never end: $\\mathrm{M}(6)=\\{6,\\ 12,\\ 18,\\ 24,\\ \\dots\\}$.')
        },
        check: {
            prompt: say('Zein zerrendak ditu 7 zenbakiaren multiploak bakarrik?', '¿Qué lista tiene solo múltiplos de 7?', 'أيّ قائمة فيها مضاعفات للعدد 7 فقط؟', 'Which list has only multiples of 7?'),
            options: [same('$1,\\ 7$'), same('$7,\\ 17,\\ 27$'), same('$14,\\ 35,\\ 63$')],
            correctIndex: 2,
            explanation: say('$14=7\\cdot 2$, $35=7\\cdot 5$ eta $63=7\\cdot 9$. 1 zenbakia zatitzailea da, eta 17 eta 27 zenbakiak 7 zifrarekin amaitzen dira, baina ez dira multiploak.', '$14=7\\cdot 2$, $35=7\\cdot 5$ y $63=7\\cdot 9$. El 1 es un divisor, y 17 y 27 terminan en 7, pero no son múltiplos.', '$14=7\\cdot 2$ و$35=7\\cdot 5$ و$63=7\\cdot 9$. العدد 1 قاسم، و17 و27 ينتهيان بالرقم 7 لكنهما ليسا مضاعفين.', '$14=7\\cdot 2$, $35=7\\cdot 5$ and $63=7\\cdot 9$. 1 is a divisor, and 17 and 27 end in 7 but are not multiples.')
        }
    },
    divisors: {
        mistake: {
            wrong: say('20 zenbakiaren zatitzaileak 2, 4, 5 eta 10 dira.', 'Los divisores de 20 son 2, 4, 5 y 10.', 'قواسم 20 هي 2 و4 و5 و10.', 'The divisors of 20 are 2, 4, 5 and 10.'),
            right: say('1 eta 20 falta dira: zatitzaileak bikoteka datoz, $20=1\\cdot 20=2\\cdot 10=4\\cdot 5$.', 'Faltan 1 y 20: los divisores vienen por parejas, $20=1\\cdot 20=2\\cdot 10=4\\cdot 5$.', 'ينقص 1 و20: القواسم تأتي أزواجًا، $20=1\\cdot 20=2\\cdot 10=4\\cdot 5$.', '1 and 20 are missing: divisors come in pairs, $20=1\\cdot 20=2\\cdot 10=4\\cdot 5$.')
        },
        check: {
            prompt: say('Zenbat zatitzaile ditu 18 zenbakiak?', '¿Cuántos divisores tiene 18?', 'كم قاسمًا للعدد 18؟', 'How many divisors does 18 have?'),
            options: [same('$6$'), same('$4$'), same('$9$')],
            correctIndex: 0,
            explanation: say('$18=1\\cdot 18=2\\cdot 9=3\\cdot 6$: hiru bikote, sei zatitzaile. 1 eta 18 ere zatitzaileak dira.', '$18=1\\cdot 18=2\\cdot 9=3\\cdot 6$: tres parejas, seis divisores. 1 y 18 también son divisores.', '$18=1\\cdot 18=2\\cdot 9=3\\cdot 6$: ثلاثة أزواج، أي ستة قواسم. و1 و18 قاسمان أيضًا.', '$18=1\\cdot 18=2\\cdot 9=3\\cdot 6$: three pairs, six divisors. 1 and 18 are divisors too.')
        }
    },
    'criteria-digit': {
        mistake: {
            wrong: say('3240 ez da 5 zenbakiarekin zatigarria, ez delako 5 zifrarekin amaitzen.', '3240 no es divisible por 5, porque no termina en 5.', '3240 لا يقبل القسمة على 5 لأنه لا ينتهي بالرقم 5.', '3240 is not divisible by 5, because it does not end in 5.'),
            right: say('0 edo 5 zifrarekin amaitzen dena 5 zenbakiarekin zatigarria da. 3240 zenbakia 0 zifrarekin amaitzen da: zatigarria da.', 'Es divisible por 5 lo que termina en 0 o en 5. 3240 termina en 0: sí es divisible.', 'ما ينتهي بالرقم 0 أو 5 يقبل القسمة على 5. والعدد 3240 ينتهي بالرقم 0: إذن يقبلها.', 'Numbers ending in 0 or 5 are divisible by 5. 3240 ends in 0: it is divisible.')
        },
        check: {
            prompt: say('Zein zenbaki da zatigarria 2, 5 eta 10 zenbakiekin, aldi berean?', '¿Qué número es divisible por 2, por 5 y por 10 a la vez?', 'أيّ عدد يقبل القسمة على 2 و5 و10 معًا؟', 'Which number is divisible by 2, 5 and 10 at the same time?'),
            options: [same('$4525$'), same('$5410$'), same('$3052$')],
            correctIndex: 1,
            explanation: say('5410 zenbakia 0 zifrarekin amaitzen da: 10 zenbakiarekin zatigarria da, eta horregatik 2 eta 5 zenbakiekin ere bai. 4525 ez da bikoitia, eta 3052 ez da 0 edo 5 zifrarekin amaitzen.', '5410 termina en 0: es divisible por 10, y por eso también por 2 y por 5. 4525 no es par y 3052 no termina en 0 ni en 5.', 'العدد 5410 ينتهي بالرقم 0: يقبل القسمة على 10، ولذلك على 2 و5 أيضًا. أما 4525 فليس زوجيًا، و3052 لا ينتهي بالرقم 0 ولا 5.', '5410 ends in 0: it is divisible by 10, and so by 2 and 5 as well. 4525 is not even, and 3052 does not end in 0 or 5.')
        }
    },
    'criteria-sum': {
        mistake: {
            wrong: say('237 ez da 3 zenbakiarekin zatigarria, 7 zifrarekin amaitzen delako.', '237 no es divisible por 3, porque termina en 7.', '237 لا يقبل القسمة على 3 لأنه ينتهي بالرقم 7.', '237 is not divisible by 3, because it ends in 7.'),
            right: say('3 zenbakiaren irizpidean zifrak batzen dira: $2+3+7=12$, eta 12 zenbakia 3 zenbakiaren multiploa da. Beraz, 237 zatigarria da.', 'Para el 3 se suman las cifras: $2+3+7=12$, que es múltiplo de 3. Así que 237 sí es divisible.', 'في قاعدة 3 نجمع الأرقام: $2+3+7=12$، و12 مضاعف للعدد 3. إذن 237 يقبل القسمة.', 'For 3 you add the digits: $2+3+7=12$, which is a multiple of 3. So 237 is divisible.')
        },
        check: {
            prompt: say('Zein zenbaki da zatigarria 9 zenbakiarekin?', '¿Qué número es divisible por 9?', 'أيّ عدد يقبل القسمة على 9؟', 'Which number is divisible by 9?'),
            options: [same('$1239$'), same('$5124$'), same('$3618$')],
            correctIndex: 2,
            explanation: say('$3+6+1+8=18$, 9 zenbakiaren multiploa. 1239 zenbakian batura 15 da eta 5124 zenbakian 12: 3 zenbakiaren multiploak dira, ez 9 zenbakiarenak.', '$3+6+1+8=18$, múltiplo de 9. En 1239 la suma es 15 y en 5124 es 12: son múltiplos de 3, no de 9.', '$3+6+1+8=18$ وهو مضاعف للعدد 9. في 1239 المجموع 15 وفي 5124 هو 12: هما مضاعفان للعدد 3 لا للعدد 9.', '$3+6+1+8=18$, a multiple of 9. In 1239 the sum is 15 and in 5124 it is 12: they are multiples of 3, not of 9.')
        }
    },
    'criteria-11-7': {
        mistake: {
            wrong: say('7 zenbakiaren irizpidea 161 zenbakian: $16-1=15$; beraz, ez da zatigarria.', 'Criterio del 7 en 161: $16-1=15$, así que no es divisible.', 'قاعدة 7 في العدد 161: $16-1=15$، إذن لا يقبل القسمة.', 'The rule for 7 on 161: $16-1=15$, so it is not divisible.'),
            right: say('Azken zifraren bikoitza kendu behar da: $16-2=14$, 7 zenbakiaren multiploa. 161 zatigarria da.', 'Hay que restar el doble de la última cifra: $16-2=14$, múltiplo de 7. 161 sí es divisible.', 'يجب طرح ضعف الرقم الأخير: $16-2=14$ وهو مضاعف للعدد 7. إذن 161 يقبل القسمة.', 'You subtract double the last digit: $16-2=14$, a multiple of 7. 161 is divisible.')
        },
        check: {
            prompt: say('4136 zenbakia zatigarria da 11 zenbakiarekin?', '¿Es 4136 divisible por 11?', 'هل يقبل 4136 القسمة على 11؟', 'Is 4136 divisible by 11?'),
            options: [
                say('Bai: $(1+6)-(4+3)=0$', 'Sí: $(1+6)-(4+3)=0$', 'نعم: $(1+6)-(4+3)=0$', 'Yes: $(1+6)-(4+3)=0$'),
                say('Ez: $4+1+3+6=14$', 'No: $4+1+3+6=14$', 'لا: $4+1+3+6=14$', 'No: $4+1+3+6=14$'),
                say('Ez: ez da 1 zifrarekin amaitzen', 'No: no termina en 1', 'لا: لا ينتهي بالرقم 1', 'No: it does not end in 1')
            ],
            correctIndex: 0,
            explanation: say('Posizio bikoitien eta bakoitien baturak kentzen dira, ez batu: $(1+6)-(4+3)=0$. Beraz, $4136=11\\cdot 376$.', 'Se restan las sumas de los lugares pares e impares, no se suman: $(1+6)-(4+3)=0$. Por eso $4136=11\\cdot 376$.', 'نطرح مجموع المواقع الزوجية من مجموع الفردية ولا نجمعهما: $(1+6)-(4+3)=0$. لذلك $4136=11\\cdot 376$.', 'You subtract the sums of the even and odd places, you do not add them: $(1+6)-(4+3)=0$. So $4136=11\\cdot 376$.')
        }
    },
    primes: {
        mistake: {
            wrong: say('51 zenbaki lehena da, bakoitia delako.', '51 es primo, porque es impar.', '51 عدد أولي لأنه فردي.', '51 is prime, because it is odd.'),
            right: say('$51=3\\cdot 17$: bi zatitzaile baino gehiago ditu; beraz, konposatua da.', '$51=3\\cdot 17$: tiene más de dos divisores, así que es compuesto.', '$51=3\\cdot 17$: له أكثر من قاسمين، إذن هو عدد مؤلف.', '$51=3\\cdot 17$: it has more than two divisors, so it is composite.')
        },
        check: {
            prompt: say('Zein zerrendak ditu zenbaki lehenak bakarrik?', '¿Qué lista tiene solo números primos?', 'أيّ قائمة فيها أعداد أولية فقط؟', 'Which list has only prime numbers?'),
            options: [same('$1,\\ 3,\\ 7$'), same('$9,\\ 13,\\ 19$'), same('$2,\\ 13,\\ 29$')],
            correctIndex: 2,
            explanation: say('2, 13 eta 29 zenbakiek bi zatitzaile bakarrik dituzte. 1 ez da lehena, eta $9=3\\cdot 3$.', '2, 13 y 29 solo tienen dos divisores. El 1 no es primo y $9=3\\cdot 3$.', 'للأعداد 2 و13 و29 قاسمان فقط. العدد 1 ليس أوليًا، و$9=3\\cdot 3$.', '2, 13 and 29 have only two divisors. 1 is not prime, and $9=3\\cdot 3$.')
        }
    },
    factorization: {
        mistake: {
            wrong: same('$90=2\\cdot 5\\cdot 9$'),
            right: say('9 ez da lehena: $9=3^{2}$. Beraz, $90=2\\cdot 3^{2}\\cdot 5$.', '9 no es primo: $9=3^{2}$. Así que $90=2\\cdot 3^{2}\\cdot 5$.', '9 ليس أوليًا: $9=3^{2}$. إذن $90=2\\cdot 3^{2}\\cdot 5$.', '9 is not prime: $9=3^{2}$. So $90=2\\cdot 3^{2}\\cdot 5$.')
        },
        check: {
            prompt: say('Nola deskonposatzen da 84 biderkagai lehenetan?', '¿Cómo se descompone 84 en factores primos?', 'كيف يُحلَّل 84 إلى عوامل أولية؟', 'How is 84 written as a product of prime factors?'),
            options: [same('$2\\cdot 6\\cdot 7$'), same('$2^{2}\\cdot 3\\cdot 7$'), same('$2^{2}\\cdot 21$')],
            correctIndex: 1,
            explanation: say('$84=2\\cdot 42=2\\cdot 2\\cdot 21=2^{2}\\cdot 3\\cdot 7$. 6 eta 21 ez dira lehenak.', '$84=2\\cdot 42=2\\cdot 2\\cdot 21=2^{2}\\cdot 3\\cdot 7$. 6 y 21 no son primos.', '$84=2\\cdot 42=2\\cdot 2\\cdot 21=2^{2}\\cdot 3\\cdot 7$. العددان 6 و21 ليسا أوليين.', '$84=2\\cdot 42=2\\cdot 2\\cdot 21=2^{2}\\cdot 3\\cdot 7$. 6 and 21 are not prime.')
        }
    },
    gcd: {
        mistake: {
            wrong: say('$20=2^{2}\\cdot 5$ eta $30=2\\cdot 3\\cdot 5$; beraz, haien ZKH $2^{2}\\cdot 3\\cdot 5=60$ da.', '$20=2^{2}\\cdot 5$ y $30=2\\cdot 3\\cdot 5$, así que su m.c.d. es $2^{2}\\cdot 3\\cdot 5=60$.', '$20=2^{2}\\cdot 5$ و$30=2\\cdot 3\\cdot 5$، إذن ق.م.أ لهما $2^{2}\\cdot 3\\cdot 5=60$.', '$20=2^{2}\\cdot 5$ and $30=2\\cdot 3\\cdot 5$, so their GCD is $2^{2}\\cdot 3\\cdot 5=60$.'),
            right: say('Hori MKT da. ZKHk biderkagai komunak bakarrik hartzen ditu, berretzaile txikienarekin: $2\\cdot 5=10$.', 'Eso es el m.c.m. El m.c.d. lleva solo los factores comunes, con el menor exponente: $2\\cdot 5=10$.', 'هذا هو م.م.أ. أما ق.م.أ فيأخذ العوامل المشتركة فقط بأصغر أس: $2\\cdot 5=10$.', 'That is the LCM. The GCD takes only the common factors, with the smallest exponent: $2\\cdot 5=10$.')
        },
        check: {
            prompt: say('Zein da 36 eta 48 zenbakien ZKH?', '¿Cuál es el m.c.d. de 36 y 48?', 'ما ق.م.أ للعددين 36 و48؟', 'What is the GCD of 36 and 48?'),
            options: [same('$12$'), same('$144$'), same('$6$')],
            correctIndex: 0,
            explanation: say('$36=2^{2}\\cdot 3^{2}$ eta $48=2^{4}\\cdot 3$: komunak, berretzaile txikienarekin, $2^{2}\\cdot 3=12$. 144 MKT da.', '$36=2^{2}\\cdot 3^{2}$ y $48=2^{4}\\cdot 3$: comunes, con el menor exponente, $2^{2}\\cdot 3=12$. 144 es el m.c.m.', '$36=2^{2}\\cdot 3^{2}$ و$48=2^{4}\\cdot 3$: العوامل المشتركة بأصغر أس، $2^{2}\\cdot 3=12$. و144 هو م.م.أ.', '$36=2^{2}\\cdot 3^{2}$ and $48=2^{4}\\cdot 3$: the common factors with the smallest exponent, $2^{2}\\cdot 3=12$. 144 is the LCM.')
        }
    },
    lcm: {
        mistake: {
            wrong: say('6 eta 9 zenbakien MKT: $6\\cdot 9=54$.', 'El m.c.m. de 6 y 9 es $6\\cdot 9=54$.', 'م.م.أ للعددين 6 و9 هو $6\\cdot 9=54$.', 'The LCM of 6 and 9 is $6\\cdot 9=54$.'),
            right: say('Biderkadura da elkarren arteko lehenak direnean bakarrik. $6=2\\cdot 3$ eta $9=3^{2}$: MKT $2\\cdot 3^{2}=18$ da.', 'Solo es el producto si son primos entre sí. $6=2\\cdot 3$ y $9=3^{2}$: el m.c.m. es $2\\cdot 3^{2}=18$.', 'يكون الناتج حاصل الضرب فقط إذا كانا أوليين فيما بينهما. $6=2\\cdot 3$ و$9=3^{2}$: إذن م.م.أ هو $2\\cdot 3^{2}=18$.', 'It is the product only when they are coprime. $6=2\\cdot 3$ and $9=3^{2}$: the LCM is $2\\cdot 3^{2}=18$.')
        },
        check: {
            prompt: say('Zein da 12 eta 20 zenbakien MKT?', '¿Cuál es el m.c.m. de 12 y 20?', 'ما م.م.أ للعددين 12 و20؟', 'What is the LCM of 12 and 20?'),
            options: [same('$240$'), same('$4$'), same('$60$')],
            correctIndex: 2,
            explanation: say('$12=2^{2}\\cdot 3$ eta $20=2^{2}\\cdot 5$: guztiak, berretzaile handienarekin, $2^{2}\\cdot 3\\cdot 5=60$. 240 biderkadura da, eta 4 ZKH.', '$12=2^{2}\\cdot 3$ y $20=2^{2}\\cdot 5$: todos, con el mayor exponente, $2^{2}\\cdot 3\\cdot 5=60$. 240 es el producto y 4, el m.c.d.', '$12=2^{2}\\cdot 3$ و$20=2^{2}\\cdot 5$: كل العوامل بأكبر أس، $2^{2}\\cdot 3\\cdot 5=60$. و240 حاصل الضرب، و4 هو ق.م.أ.', '$12=2^{2}\\cdot 3$ and $20=2^{2}\\cdot 5$: all the factors with the biggest exponent, $2^{2}\\cdot 3\\cdot 5=60$. 240 is the product and 4 is the GCD.')
        }
    },
    which: {
        mistake: {
            wrong: say('24 cm eta 36 cm-ko zintak ahalik eta zati luzeenetan moztu nahi ditut, zati guztiak berdinak: MKT, 72 cm.', 'Quiero cortar cintas de 24 cm y 36 cm en trozos iguales lo más largos posible: m.c.m., 72 cm.', 'أريد قصّ شريطين طولهما 24 سم و36 سم إلى قطع متساوية أطول ما يمكن: م.م.أ، أي 72 سم.', 'I want to cut ribbons of 24 cm and 36 cm into equal pieces, as long as possible: LCM, 72 cm.'),
            right: say('Zati bat ezin da zinta baino luzeagoa izan: banaketa bat da, ZKH. Zatiek 12 cm izango dituzte.', 'Un trozo no puede ser más largo que la cinta: es un reparto, m.c.d. Los trozos medirán 12 cm.', 'لا يمكن أن تكون القطعة أطول من الشريط: إنها قسمة، أي ق.م.أ. طول كل قطعة 12 سم.', 'A piece cannot be longer than the ribbon: it is a sharing problem, GCD. The pieces will be 12 cm long.')
        },
        check: {
            prompt: say('Itsasargi bat 6 segundoan behin pizten da, eta beste bat 10 segundoan behin. Orain batera piztu dira. Zenbat segundo barru egingo dute bat berriro?', 'Un faro se enciende cada 6 segundos y otro cada 10. Ahora se han encendido a la vez. ¿Dentro de cuántos segundos volverán a coincidir?', 'منارة تضيء كل 6 ثوانٍ وأخرى كل 10 ثوانٍ. أضاءتا معًا الآن. بعد كم ثانية تضيئان معًا من جديد؟', 'One lighthouse flashes every 6 seconds and another every 10. They have just flashed together. In how many seconds will they flash together again?'),
            options: [same('$2$'), same('$30$'), same('$60$')],
            correctIndex: 1,
            explanation: say('Berriro bat egitea multiplo komun bat da: 6 eta 10 zenbakien MKT, 30. ZKH (2) datuak baino txikiagoa da, eta 60 ez da txikiena.', 'Volver a coincidir es un múltiplo común: el m.c.m. de 6 y 10, que es 30. El m.c.d. (2) es menor que los datos, y 60 no es el menor.', 'التزامن من جديد مضاعف مشترك: م.م.أ للعددين 6 و10، وهو 30. أما ق.م.أ (2) فأصغر من المعطيات، و60 ليس الأصغر.', 'Flashing together again is a common multiple: the LCM of 6 and 10, which is 30. The GCD (2) is smaller than the data, and 60 is not the smallest.')
        }
    },
    method: {
        mistake: {
            wrong: say('60 cm eta 84 cm-ko gela bat baldosa karratu handienekin estali behar da. Erantzuna: 12.', 'Hay que cubrir un suelo de 60 cm por 84 cm con las baldosas cuadradas más grandes posibles. Respuesta: 12.', 'يجب تغطية أرضية 60 سم في 84 سم بأكبر بلاطات مربعة ممكنة. الجواب: 12.', 'A floor of 60 cm by 84 cm has to be covered with the biggest possible square tiles. Answer: 12.'),
            right: say('Ez amaitu zenbaki batekin: erantzun galderari esaldi batez eta unitateekin. «Baldosa bakoitzak 12 cm-ko aldea izango du».', 'No termines con un número suelto: responde con una frase y con unidades. «Cada baldosa medirá 12 cm de lado».', 'لا تنهِ الحل بعدد وحده: أجب بجملة مع الوحدات. «طول ضلع كل بلاطة 12 سم».', 'Do not finish with a number on its own: answer with a sentence and units. «Each tile will have 12 cm sides».')
        },
        check: {
            prompt: say('24 arkatz eta 40 borragoma ditugu. Ahalik eta sorta berdin gehien egin nahi ditugu, ezer soberan geratu gabe. Zenbat sorta aterako dira?', 'Tenemos 24 lápices y 40 gomas. Queremos hacer el mayor número posible de lotes iguales, sin que sobre nada. ¿Cuántos lotes saldrán?', 'لدينا 24 قلمًا و40 ممحاة. نريد أكبر عدد ممكن من الحزم المتساوية دون أن يبقى شيء. كم حزمة نحصل عليها؟', 'We have 24 pencils and 40 rubbers. We want to make as many equal packs as possible, with nothing left over. How many packs will there be?'),
            options: [same('$8$'), same('$120$'), same('$3$')],
            correctIndex: 0,
            explanation: say('Banaketa bat da, ezer soberan geratu gabe: 24 eta 40 zenbakien ZKH, 8. 8 sorta aterako dira, bakoitza 3 arkatzekin eta 5 borragomarekin.', 'Es un reparto sin que sobre nada: el m.c.d. de 24 y 40, que es 8. Saldrán 8 lotes, cada uno con 3 lápices y 5 gomas.', 'إنها قسمة دون أن يبقى شيء: ق.م.أ للعددين 24 و40، وهو 8. نحصل على 8 حزم، في كل منها 3 أقلام و5 مماحٍ.', 'It is a sharing problem with nothing left over: the GCD of 24 and 40, which is 8. There will be 8 packs, each with 3 pencils and 5 rubbers.')
        }
    }
}
