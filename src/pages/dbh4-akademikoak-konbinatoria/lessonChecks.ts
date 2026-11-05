import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Konbinatoria · 4. DBH akademikoak — the typical mistake and the «Check
   it» question of every lesson. Plain data (no JSX) so the tests can
   import it; lessons.tsx merges it into the topics.
   ========================================================================== */

export type CombinatoricsAkTopicId = 'tree' | 'product' | 'factorial' | 'with-repetition' | 'variations' | 'conditions' | 'permutations' | 'restricted' | 'repeated' | 'combinations' | 'binomial' | 'pascal' | 'which-model' | 'geometry' | 'committees'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const combinatoricsAkLessonChecks: Record<CombinatoricsAkTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    tree: {
        mistake: {
            wrong: say('3 alkandora eta 2 galtzarekin $3+2=5$ jantzi daude.', 'Con 3 camisas y 2 pantalones hay $3+2=5$ conjuntos.', 'مع 3 قمصان و2 بنطالين توجد $3+2=5$ أطقم.', 'With 3 shirts and 2 pairs of trousers there are $3+2=5$ outfits.'),
            right: say('Alkandora bakoitzetik 2 adar ateratzen dira: $3\\cdot 2=6$ jantzi.', 'De cada camisa salen 2 ramas: $3\\cdot 2=6$ conjuntos.', 'من كل قميص يخرج فرعان: $3\\cdot 2=6$ أطقم.', 'Each shirt gives 2 branches: $3\\cdot 2=6$ outfits.')
        },
        check: {
            prompt: say('Txanpon bat hiru aldiz botatzen da. Zenbat emaitza daude?', 'Se lanza una moneda tres veces. ¿Cuántos resultados hay?', 'تُرمى قطعة نقدية ثلاث مرات. كم نتيجة ممكنة؟', 'A coin is tossed three times. How many outcomes are there?'),
            options: [same('$8$'), same('$6$'), same('$3$')],
            correctIndex: 0,
            explanation: same('$2\\cdot 2\\cdot 2=8$')
        }
    },
    product: {
        mistake: {
            wrong: say('A puntutik C puntura joateko, 3 bide daude B puntutik edo 4 D puntutik; beraz, $3\\cdot 4=12$.', 'Para ir de A a C hay 3 caminos por B o 4 por D, así que $3\\cdot 4=12$.', 'للذهاب من A إلى C توجد 3 طرق عبر B أو 4 عبر D، إذن $3\\cdot 4=12$.', 'To go from A to C there are 3 roads through B or 4 through D, so $3\\cdot 4=12$.'),
            right: say('«Edo» da, ez «eta»: batu egiten da, $3+4=7$.', 'Es «o», no «y»: se suma, $3+4=7$.', 'إنها «أو» لا «و»: نجمع، $3+4=7$.', 'It is «or», not «and»: add, $3+4=7$.')
        },
        check: {
            prompt: say('Izozki batek 6 zapore eta 3 kukurutxo mota ditu. Zenbat izozki daude zapore bakarrekoak?', 'Una heladería tiene 6 sabores y 3 tipos de cucurucho. ¿Cuántos helados de un sabor hay?', 'محل مثلجات فيه 6 نكهات و3 أنواع من الأقماع. كم مثلجة بنكهة واحدة يوجد؟', 'An ice-cream shop has 6 flavours and 3 kinds of cone. How many one-flavour ice creams are there?'),
            options: [same('$9$'), same('$18$'), same('$3$')],
            correctIndex: 1,
            explanation: same('$6\\cdot 3=18$')
        }
    },
    factorial: {
        mistake: {
            wrong: same('$\\frac{6!}{3!}=2!$'),
            right: say('Faktorialak ez dira horrela zatitzen: $\\frac{6!}{3!}=6\\cdot 5\\cdot 4=120$.', 'Los factoriales no se dividen así: $\\frac{6!}{3!}=6\\cdot 5\\cdot 4=120$.', 'المضاريب لا تُقسم هكذا: $\\frac{6!}{3!}=6\\cdot 5\\cdot 4=120$.', 'Factorials do not divide like that: $\\frac{6!}{3!}=6\\cdot 5\\cdot 4=120$.')
        },
        check: {
            prompt: say('Zenbat da $0!$?', '¿Cuánto vale $0!$?', 'ما قيمة $0!$؟', 'What is $0!$?'),
            options: [same('$1$'), same('$0$'), say('Ez dago definituta', 'No está definido', 'غير معرّف', 'It is not defined')],
            correctIndex: 0,
            explanation: say('Hitzarmenez, $0!=1$.', 'Por convenio, $0!=1$.', 'اصطلاحًا $0!=1$.', 'By agreement, $0!=1$.')
        }
    },
    'with-repetition': {
        mistake: {
            wrong: say('1, 2 eta 3 zifrekin (errepikatuz) 4 zifrako $4^{3}=64$ zenbaki daude.', 'Los números de 4 cifras con las cifras 1, 2 y 3 (repitiendo) son $4^{3}=64$.', 'الأعداد من 4 أرقام بالأرقام 1 و2 و3 (مع التكرار) عددها $4^{3}=64$.', 'The 4-digit numbers with the digits 1, 2 and 3 (repeating) are $4^{3}=64$.'),
            right: say('Oinarria aukerak dira eta berretzailea laukiak: $3^{4}=81$.', 'La base son las opciones y el exponente, las casillas: $3^{4}=81$.', 'الأساس هو الخيارات والأس هو الخانات: $3^{4}=81$.', 'The base is the options and the exponent the slots: $3^{4}=81$.')
        },
        check: {
            prompt: say('Zenbat emaitza daude dado bat 3 aldiz botatzean?', '¿Cuántos resultados hay al lanzar un dado 3 veces?', 'كم نتيجة عند رمي نرد 3 مرات؟', 'How many outcomes are there when a dice is thrown 3 times?'),
            options: [same('$18$'), same('$120$'), same('$216$')],
            correctIndex: 2,
            explanation: same('$6^{3}=216$')
        }
    },
    variations: {
        mistake: {
            wrong: say('Urrea, zilarra eta brontzea 8 korrikalariren artean banatzeko, $8^{3}=512$ era.', 'Para dar oro, plata y bronce entre 8 corredores hay $8^{3}=512$ formas.', 'لتوزيع الذهب والفضة والبرونز على 8 عدائين توجد $8^{3}=512$ طريقة.', 'To give gold, silver and bronze among 8 runners there are $8^{3}=512$ ways.'),
            right: say('Korrikalari batek ezin ditu bi domina irabazi: $8\\cdot 7\\cdot 6=336$.', 'Un corredor no puede ganar dos medallas: $8\\cdot 7\\cdot 6=336$.', 'لا يمكن لعداء أن يفوز بميداليتين: $8\\cdot 7\\cdot 6=336$.', 'A runner cannot win two medals: $8\\cdot 7\\cdot 6=336$.')
        },
        check: {
            prompt: say('Zenbat da $\\text{V}_{6,2}$?', '¿Cuánto vale $\\text{V}_{6,2}$?', 'ما قيمة $\\text{V}_{6,2}$؟', 'What is $\\text{V}_{6,2}$?'),
            options: [same('$30$'), same('$36$'), same('$15$')],
            correctIndex: 0,
            explanation: same('$6\\cdot 5=30$')
        }
    },
    conditions: {
        mistake: {
            wrong: say('Bi zifrako $10\\cdot 10=100$ zenbaki daude.', 'Hay $10\\cdot 10=100$ números de dos cifras.', 'توجد $10\\cdot 10=100$ عدد من رقمين.', 'There are $10\\cdot 10=100$ two-digit numbers.'),
            right: say('0 zifra ezin da lehena izan: $9\\cdot 10=90$.', 'El 0 no puede ser la primera cifra: $9\\cdot 10=90$.', 'لا يمكن أن يكون 0 الرقم الأول: $9\\cdot 10=90$.', '0 cannot be the first digit: $9\\cdot 10=90$.')
        },
        check: {
            prompt: say('Zenbat bi zifra desberdineko zenbaki daude?', '¿Cuántos números de dos cifras distintas hay?', 'كم عددًا من رقمين مختلفين يوجد؟', 'How many two-digit numbers with different digits are there?'),
            options: [same('$90$'), same('$81$'), same('$72$')],
            correctIndex: 1,
            explanation: say('Lehena 1 eta 9 artean (9); bigarrena, beste 9 zifretako bat.', 'La primera, del 1 al 9 (9); la segunda, una de las otras 9.', 'الأول من 1 إلى 9 (9)، والثاني أحد الأرقام التسعة الأخرى.', 'The first, 1 to 9 (9); the second, one of the other 9.')
        }
    },
    permutations: {
        mistake: {
            wrong: say('4 liburu ordenatzeko erak $4\\cdot 4=16$ dira.', 'Las formas de ordenar 4 libros son $4\\cdot 4=16$.', 'طرق ترتيب 4 كتب هي $4\\cdot 4=16$.', 'The ways of ordering 4 books are $4\\cdot 4=16$.'),
            right: say('Liburu bakoitza behin bakarrik jartzen da: $4!=4\\cdot 3\\cdot 2\\cdot 1=24$.', 'Cada libro solo se coloca una vez: $4!=4\\cdot 3\\cdot 2\\cdot 1=24$.', 'كل كتاب يوضع مرة واحدة فقط: $4!=4\\cdot 3\\cdot 2\\cdot 1=24$.', 'Each book goes in only once: $4!=4\\cdot 3\\cdot 2\\cdot 1=24$.')
        },
        check: {
            prompt: say('Zenbat anagrama ditu LIBRO hitzak?', '¿Cuántos anagramas tiene la palabra LIBRO?', 'كم ترتيبًا لأحرف الكلمة LIBRO؟', 'How many anagrams does the word LIBRO have?'),
            options: [same('$25$'), same('$120$'), same('$60$')],
            correctIndex: 1,
            explanation: same('$5!=120$')
        }
    },
    restricted: {
        mistake: {
            wrong: say('4 pertsonaren artean A eta B batera joan behar badira, $3!=6$ era daude.', 'Si A y B van juntos entre 4 personas, hay $3!=6$ formas.', 'إذا كان A وB معًا بين 4 أشخاص توجد $3!=6$ طرق.', 'If A and B go together among 4 people, there are $3!=6$ ways.'),
            right: say('Blokea barrutik ordenatzea falta da, AB edo BA: $2\\cdot 3!=12$.', 'Falta ordenar el bloque por dentro, AB o BA: $2\\cdot 3!=12$.', 'ينقص ترتيب الكتلة من الداخل، AB أو BA: $2\\cdot 3!=12$.', 'You still have to order the block inside, AB or BA: $2\\cdot 3!=12$.')
        },
        check: {
            prompt: say('5 pertsonako ilara batean, batek lehena izan behar du. Zenbat eratara?', 'En una fila de 5 personas, una tiene que ir la primera. ¿De cuántas formas?', 'في صف من 5 أشخاص يجب أن يكون أحدهم الأول. بكم طريقة؟', 'In a row of 5 people, one must go first. In how many ways?'),
            options: [same('$120$'), same('$96$'), same('$24$')],
            correctIndex: 2,
            explanation: same('$4!=24$')
        }
    },
    repeated: {
        mistake: {
            wrong: say('1, 1, 2 zifrekin osatzen diren zenbakiak $3!=6$ dira.', 'Los números que se forman con 1, 1, 2 son $3!=6$.', 'الأعداد المكوّنة من 1 و1 و2 عددها $3!=6$.', 'The numbers made with 1, 1, 2 are $3!=6$.'),
            right: say('Bi batekoak trukatzeak ez du zenbaki berririk ematen: $\\frac{3!}{2!}=3$, hau da, 112, 121 eta 211.', 'Cambiar los dos unos no da un número nuevo: $\\frac{3!}{2!}=3$, es decir, 112, 121 y 211.', 'تبديل الواحدين لا يعطي عددًا جديدًا: $\\frac{3!}{2!}=3$، أي 112 و121 و211.', 'Swapping the two ones gives no new number: $\\frac{3!}{2!}=3$, that is, 112, 121 and 211.')
        },
        check: {
            prompt: say('4 jaurtiketatan, zenbat ordena daude 3 aurpegi eta gurutze 1 ateratzeko?', '¿Cuántos órdenes hay para sacar 3 caras y 1 cruz en 4 lanzamientos?', 'كم ترتيبًا للحصول على 3 وجوه وكتابة واحدة في 4 رميات؟', 'How many orders are there for getting 3 heads and 1 tail in 4 tosses?'),
            options: [same('$4$'), same('$24$'), same('$6$')],
            correctIndex: 0,
            explanation: same('$\\frac{4!}{3!}=4$')
        }
    },
    combinations: {
        mistake: {
            wrong: say('6 ikasletik 2 ordezkari aukeratzeko, $6\\cdot 5=30$ era daude.', 'Para elegir 2 delegados de 6 alumnos hay $6\\cdot 5=30$ formas.', 'لاختيار مندوبين اثنين من 6 تلاميذ توجد $6\\cdot 5=30$ طريقة.', 'To choose 2 delegates from 6 pupils there are $6\\cdot 5=30$ ways.'),
            right: say('Ana eta Luis eta Luis eta Ana bikote bera da: $\\frac{6\\cdot 5}{2}=15$.', 'Ana y Luis es el mismo par que Luis y Ana: $\\frac{6\\cdot 5}{2}=15$.', 'الزوج (أحمد، علي) هو نفسه (علي، أحمد): $\\frac{6\\cdot 5}{2}=15$.', 'Ana and Luis is the same pair as Luis and Ana: $\\frac{6\\cdot 5}{2}=15$.')
        },
        check: {
            prompt: say('Zenbat 3 kartako esku atera daitezke 7 kartatik?', '¿Cuántas manos de 3 cartas se pueden sacar de 7 cartas?', 'كم يدًا من 3 أوراق يمكن سحبها من 7 أوراق؟', 'How many 3-card hands can be drawn from 7 cards?'),
            options: [same('$210$'), same('$35$'), same('$21$')],
            correctIndex: 1,
            explanation: same('$\\frac{7\\cdot 6\\cdot 5}{3\\cdot 2\\cdot 1}=35$')
        }
    },
    binomial: {
        mistake: {
            wrong: same('$\\binom{9}{0}=0$'),
            right: say('Ezer ez aukeratzeko era bakarra dago: $\\binom{9}{0}=1$.', 'Hay una sola forma de no elegir nada: $\\binom{9}{0}=1$.', 'توجد طريقة واحدة لعدم اختيار شيء: $\\binom{9}{0}=1$.', 'There is one way of choosing nothing: $\\binom{9}{0}=1$.')
        },
        check: {
            prompt: say('Zenbat da $\\binom{20}{19}$?', '¿Cuánto vale $\\binom{20}{19}$?', 'ما قيمة $\\binom{20}{19}$؟', 'What is $\\binom{20}{19}$?'),
            options: [same('$1$'), same('$380$'), same('$20$')],
            correctIndex: 2,
            explanation: say('Simetriaz, $\\binom{20}{1}=20$.', 'Por simetría, $\\binom{20}{1}=20$.', 'بالتناظر $\\binom{20}{1}=20$.', 'By symmetry, $\\binom{20}{1}=20$.')
        }
    },
    pascal: {
        mistake: {
            wrong: say('Triangeluaren 5. errenkadaren batura $5^{2}=25$ da.', 'La suma de la fila 5 del triángulo es $5^{2}=25$.', 'مجموع الصف 5 من المثلث $5^{2}=25$.', 'The sum of row 5 of the triangle is $5^{2}=25$.'),
            right: say('$2^{5}=32$ da: 1, 5, 10, 10, 5, 1.', 'Es $2^{5}=32$: 1, 5, 10, 10, 5, 1.', 'إنه $2^{5}=32$: 1، 5، 10، 10، 5، 1.', 'It is $2^{5}=32$: 1, 5, 10, 10, 5, 1.')
        },
        check: {
            prompt: say('Zein zenbaki doa hurrengo errenkadan 6 eta 4 zenbakien azpian?', '¿Qué número va en la fila siguiente debajo de 6 y 4?', 'ما العدد الذي يأتي في الصف التالي تحت 6 و4؟', 'Which number goes in the next row under 6 and 4?'),
            options: [same('$10$'), same('$24$'), same('$2$')],
            correctIndex: 0,
            explanation: same('$6+4=10$')
        }
    },
    'which-model': {
        mistake: {
            wrong: say('10 pertsonatik 3 kideko batzorde bat $\\text{V}_{10,3}$ da.', 'Una comisión de 3 personas de 10 son $\\text{V}_{10,3}$.', 'لجنة من 3 أشخاص من 10 هي $\\text{V}_{10,3}$.', 'A committee of 3 people out of 10 is $\\text{V}_{10,3}$.'),
            right: say('Batzorde batean ordenak ez du axola: $\\text{C}_{10,3}=120$.', 'En una comisión el orden no importa: $\\text{C}_{10,3}=120$.', 'في اللجنة لا يهم الترتيب: $\\text{C}_{10,3}=120$.', 'In a committee the order does not matter: $\\text{C}_{10,3}=120$.')
        },
        check: {
            prompt: say('Zein ereduk zenbatzen ditu 4 zifra desberdineko zenbakiak, 1 eta 9 arteko zifrekin osatuak?', '¿Qué modelo cuenta los números de 4 cifras distintas formados con las cifras del 1 al 9?', 'أيّ نموذج يعدّ الأعداد ذات 4 أرقام مختلفة المكوّنة من الأرقام 1 إلى 9؟', 'Which model counts the 4-digit numbers with different digits made from 1 to 9?'),
            options: [same('$\\text{V}_{9,4}$'), same('$\\text{VR}_{9,4}$'), same('$\\text{C}_{9,4}$')],
            correctIndex: 0,
            explanation: say('Ordenak axola du eta ez da errepikatzen: aldakuntzak.', 'Importa el orden y no se repite: variaciones.', 'الترتيب مهم ولا تكرار: تراتيب.', 'Order matters and nothing repeats: arrangements.')
        }
    },
    geometry: {
        mistake: {
            wrong: say('Pentagono batek $\\binom{5}{2}=10$ diagonal ditu.', 'Un pentágono tiene $\\binom{5}{2}=10$ diagonales.', 'للخماسي $\\binom{5}{2}=10$ أقطار.', 'A pentagon has $\\binom{5}{2}=10$ diagonals.'),
            right: say('5 aldeak kendu behar dira: $10-5=5$ diagonal.', 'Hay que quitar los 5 lados: $10-5=5$ diagonales.', 'يجب حذف الأضلاع الخمسة: $10-5=5$ أقطار.', 'You must take away the 5 sides: $10-5=5$ diagonals.')
        },
        check: {
            prompt: say('Zenbat zuzen zehazten dituzte lerrokatu gabeko 7 puntuk?', '¿Cuántas rectas determinan 7 puntos sin tres alineados?', 'كم مستقيمًا تحدد 7 نقاط لا تقع ثلاث منها على استقامة؟', 'How many lines do 7 points, no three in line, determine?'),
            options: [same('$42$'), same('$21$'), same('$14$')],
            correctIndex: 1,
            explanation: same('$\\frac{7\\cdot 6}{2}=21$')
        }
    },
    committees: {
        mistake: {
            wrong: say('4 mutiletatik 1 eta 3 nesketatik 1 aukeratzeko, $4+3=7$ bikote daude.', 'Para elegir 1 chico de 4 y 1 chica de 3 hay $4+3=7$ parejas.', 'لاختيار فتى من 4 وفتاة من 3 توجد $4+3=7$ أزواج.', 'To choose 1 boy out of 4 and 1 girl out of 3 there are $4+3=7$ pairs.'),
            right: say('Mutila «eta» neska da: biderkatu egiten da, $4\\cdot 3=12$.', 'Es chico «y» chica: se multiplica, $4\\cdot 3=12$.', 'إنه فتى «و» فتاة: نضرب، $4\\cdot 3=12$.', 'It is a boy «and» a girl: multiply, $4\\cdot 3=12$.')
        },
        check: {
            prompt: say('8 laguneko talde batean, zenbat eratara aukeratzen dira lehendakaria eta, besteen artean, 2 bokaleko batzorde bat?', 'En un grupo de 8, ¿de cuántas formas se eligen un presidente y, entre los demás, una comisión de 2 vocales?', 'في مجموعة من 8، بكم طريقة نختار رئيسًا ولجنة من عضوين من الباقين؟', 'In a group of 8, in how many ways can you choose a chair and, from the rest, a committee of 2 members?'),
            options: [same('$336$'), same('$56$'), same('$168$')],
            correctIndex: 2,
            explanation: same('$8\\cdot 21=168$')
        }
    }
}
