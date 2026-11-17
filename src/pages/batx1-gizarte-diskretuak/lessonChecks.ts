import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Diskretuak · Batxilergoa 1 · Gizarte Zientziak — the typical mistake and
   the «Check it» question of every lesson. Plain data (no JSX) so the tests
   can import it; lessons.tsx merges it into the topics. The questions use
   new numbers, never those of «Let's solve» or of the example, and one of
   their wrong answers is the lesson's typical mistake.
   ========================================================================== */

export type DiscreteBatx1gTopicId =
    | 'compound' | 'orders'
    | 'random-variable' | 'probability-table' | 'mean-sd' | 'expected-gain'
    | 'galton' | 'is-binomial' | 'binomial-formula' | 'binomial-events' | 'binomial-parameters'
    | 'fit-p' | 'expected-values' | 'good-fit'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const discreteBatx1gLessonChecks: Record<DiscreteBatx1gTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Before you start: compound probability ---------- */
    compound: {
        mistake: {
            wrong: say('Baraja batetik bi karta ateratzen dira, itzuli gabe. Bi bateko: $\\frac{4}{40}\\cdot\\frac{4}{40}$.', 'Se sacan dos cartas de una baraja sin devolverlas. Dos ases: $\\frac{4}{40}\\cdot\\frac{4}{40}$.', 'تُسحب ورقتان من رزمة دون إرجاع. آسان: $\\frac{4}{40}\\cdot\\frac{4}{40}$.', 'Two cards are drawn from a deck without putting them back. Two aces: $\\frac{4}{40}\\cdot\\frac{4}{40}$.'),
            right: say('Lehenengo batekoa atera ondoren, 3 bateko geratzen dira 39 kartatan: $\\frac{4}{40}\\cdot\\frac{3}{39}=\\frac{1}{130}$.', 'Tras sacar el primer as quedan 3 ases en 39 cartas: $\\frac{4}{40}\\cdot\\frac{3}{39}=\\frac{1}{130}$.', 'بعد سحب الآس الأول يبقى 3 آسات في 39 ورقة: $\\frac{4}{40}\\cdot\\frac{3}{39}=\\frac{1}{130}$.', 'After the first ace, 3 aces are left among 39 cards: $\\frac{4}{40}\\cdot\\frac{3}{39}=\\frac{1}{130}$.')
        },
        check: {
            prompt: say('Poltsa batean 2 bola zuri eta 3 beltz daude. Bi ateratzen dira, itzuli gabe. Zein da biak zuriak izateko probabilitatea?', 'Una bolsa tiene 2 bolas blancas y 3 negras. Se sacan dos sin devolverlas. ¿Qué probabilidad hay de que las dos sean blancas?', 'في كيس كرتان بيضاوان و3 سوداء. تُسحب كرتان دون إرجاع. ما احتمال أن تكونا بيضاوين؟', 'A bag has 2 white balls and 3 black ones. Two are drawn without putting them back. What is the probability that both are white?'),
            options: [same('$\\frac{4}{25}$'), same('$\\frac{1}{10}$'), same('$\\frac{2}{5}$')],
            correctIndex: 1,
            explanation: say('Bigarrenean zuri bakarra geratzen da 4 bolatan: $\\frac{2}{5}\\cdot\\frac{1}{4}=\\frac{1}{10}$. $\\frac{4}{25}$ bola itzuliko balitz izango litzateke.', 'En la segunda queda una blanca entre 4 bolas: $\\frac{2}{5}\\cdot\\frac{1}{4}=\\frac{1}{10}$. $\\frac{4}{25}$ sería devolviendo la bola.', 'في السحبة الثانية تبقى كرة بيضاء واحدة بين 4 كرات: $\\frac{2}{5}\\cdot\\frac{1}{4}=\\frac{1}{10}$. و$\\frac{4}{25}$ يكون مع إرجاع الكرة.', 'On the second draw one white is left among 4 balls: $\\frac{2}{5}\\cdot\\frac{1}{4}=\\frac{1}{10}$. $\\frac{4}{25}$ would be with replacement.')
        }
    },
    orders: {
        mistake: {
            wrong: say('Txanpon bat 4 aldiz botatzean, zehazki 2 aurpegi: $0{,}5^4=\\frac{1}{16}$.', 'Al lanzar una moneda 4 veces, exactamente 2 caras: $0{,}5^4=\\frac{1}{16}$.', 'عند رمي قطعة نقود 4 مرات، وجهان بالضبط: $0{,}5^4=\\frac{1}{16}$.', 'Tossing a coin 4 times, exactly 2 heads: $0{,}5^4=\\frac{1}{16}$.'),
            right: say('Hori ordena bakar baten probabilitatea da. $\\binom{4}{2}=6$ ordena daude: $6\\cdot\\frac{1}{16}=\\frac{3}{8}$.', 'Esa es la probabilidad de un solo orden. Hay $\\binom{4}{2}=6$ órdenes: $6\\cdot\\frac{1}{16}=\\frac{3}{8}$.', 'هذا احتمال ترتيب واحد فقط. هناك $\\binom{4}{2}=6$ ترتيبات: $6\\cdot\\frac{1}{16}=\\frac{3}{8}$.', 'That is the probability of just one order. There are $\\binom{4}{2}=6$ orders: $6\\cdot\\frac{1}{16}=\\frac{3}{8}$.')
        },
        check: {
            prompt: say('Txanpon bat 5 aldiz botatzen da. Zenbat ordenatan atera daitezke zehazki 2 aurpegi?', 'Se lanza una moneda 5 veces. ¿En cuántos órdenes pueden salir exactamente 2 caras?', 'تُرمى قطعة نقود 5 مرات. بكم ترتيب يمكن أن يظهر وجهان بالضبط؟', 'A coin is tossed 5 times. In how many orders can exactly 2 heads come up?'),
            options: [same('$20$'), same('$32$'), same('$10$')],
            correctIndex: 2,
            explanation: say('Zein 2 botalditan ateratzen den aurpegia aukeratzen da, ordenarik gabe: $\\binom{5}{2}=10$. 20 ordenarekin zenbatzea da.', 'Se elige en qué 2 lanzamientos sale cara, sin orden: $\\binom{5}{2}=10$. 20 es contar con orden.', 'نختار الرميتين اللتين يظهر فيهما الوجه دون ترتيب: $\\binom{5}{2}=10$. و20 عدّ مع الترتيب.', 'Choose in which 2 tosses heads comes up, with no order: $\\binom{5}{2}=10$. 20 is counting with order.')
        }
    },

    /* ---------- 2. Discrete random variable ---------- */
    'random-variable': {
        mistake: {
            wrong: say('3 txanponen aurpegi kopuruak 4 balio ditu (0, 1, 2, 3); beraz, $P(X=1)=\\frac{1}{4}$.', 'El número de caras de 3 monedas tiene 4 valores (0, 1, 2, 3); por tanto, $P(X=1)=\\frac{1}{4}$.', 'لعدد الأوجه في 3 قطع نقود 4 قيم (0، 1، 2، 3)؛ إذن $P(X=1)=\\frac{1}{4}$.', 'The number of heads of 3 coins has 4 values (0, 1, 2, 3); so $P(X=1)=\\frac{1}{4}$.'),
            right: say('Balioak ez dira berdin probableak: 8 emaitzatik 3 emaitzatan dago aurpegi bakarra, $P(X=1)=\\frac{3}{8}$.', 'Los valores no son igual de probables: una sola cara sale en 3 de los 8 resultados, $P(X=1)=\\frac{3}{8}$.', 'القيم ليست متساوية الاحتمال: يظهر وجه واحد في 3 من النتائج الثماني، $P(X=1)=\\frac{3}{8}$.', 'The values are not equally likely: a single head comes up in 3 of the 8 outcomes, $P(X=1)=\\frac{3}{8}$.')
        },
        check: {
            prompt: say('$X$ aldagaiak 0, 1 eta 2 balio ditu, 0,2; 0,5 eta 0,3 probabilitateekin. Zenbat da $P(X\\ge 1)$?', '$X$ vale 0, 1 o 2 con probabilidades 0,2; 0,5 y 0,3. ¿Cuánto vale $P(X\\ge 1)$?', 'يأخذ $X$ القيم 0 و1 و2 باحتمالات 0.2 و0.5 و0.3. كم يساوي $P(X\\ge 1)$؟', '$X$ is 0, 1 or 2 with probabilities 0.2, 0.5 and 0.3. What is $P(X\\ge 1)$?'),
            options: [same('$0{,}8$'), same('$0{,}5$'), same('$0{,}3$')],
            correctIndex: 0,
            explanation: say('«Gutxienez 1» gertaerak 1 eta 2 balioak biltzen ditu: $0{,}5+0{,}3=0{,}8$.', '«Al menos 1» junta los valores 1 y 2: $0{,}5+0{,}3=0{,}8$.', '«1 على الأقل» يجمع القيمتين 1 و2: $0{,}5+0{,}3=0{,}8$.', '‘At least 1’ puts the values 1 and 2 together: $0{,}5+0{,}3=0{,}8$.')
        }
    },
    'probability-table': {
        mistake: {
            wrong: say('0,5; 0,4 eta 0,3 probabilitateen taula banaketa bat da, bat ere ez baita negatiboa.', 'La tabla de probabilidades 0,5; 0,4 y 0,3 es una distribución, porque ninguna es negativa.', 'جدول الاحتمالات 0.5 و0.4 و0.3 توزيع، لأن أيًّا منها ليس سالبًا.', 'The table of probabilities 0.5, 0.4 and 0.3 is a distribution, because none is negative.'),
            right: say('Gainera 1 egin behar dute batuta, eta hauek $0{,}5+0{,}4+0{,}3=1{,}2$ egiten dute: ez da banaketa bat.', 'Además tienen que sumar 1, y estas suman $0{,}5+0{,}4+0{,}3=1{,}2$: no es una distribución.', 'ويجب أيضًا أن يكون مجموعها 1، وهذه مجموعها $0{,}5+0{,}4+0{,}3=1{,}2$: ليست توزيعًا.', 'They must also add up to 1, and these add up to $0{,}5+0{,}4+0{,}3=1{,}2$: it is not a distribution.')
        },
        check: {
            prompt: say('Zein zerrenda izan daiteke aldagai baten probabilitateak?', '¿Qué lista puede ser la de las probabilidades de una variable?', 'أي قائمة يمكن أن تكون احتمالات متغير؟', 'Which list can be the probabilities of a variable?'),
            options: [same('$0{,}6\\quad 0{,}5\\quad -0{,}1$'), same('$0{,}3\\quad 0{,}3\\quad 0{,}3$'), same('$0{,}2\\quad 0{,}3\\quad 0{,}5$')],
            correctIndex: 2,
            explanation: say('Bakarrik azkenak ditu probabilitate guztiak 0 eta 1 artean eta 1 egiten du batuta. Lehenengoak 1 egiten du, baina negatibo bat du; bigarrenak 0,9 egiten du.', 'Solo la última tiene todas entre 0 y 1 y suma 1. La primera suma 1, pero tiene un negativo; la segunda suma 0,9.', 'الأخيرة وحدها كل قيمها بين 0 و1 ومجموعها 1. الأولى مجموعها 1 لكن فيها سالب، والثانية مجموعها 0.9.', 'Only the last one has them all between 0 and 1 and adds up to 1. The first adds up to 1 but has a negative; the second adds up to 0.9.')
        }
    },
    'mean-sd': {
        mistake: {
            wrong: say('$\\mu=2$ eta $\\sum p_i\\,x_i^2=5$ badira, $\\sigma=\\sqrt{5}$.', 'Si $\\mu=2$ y $\\sum p_i\\,x_i^2=5$, entonces $\\sigma=\\sqrt{5}$.', 'إذا كان $\\mu=2$ و$\\sum p_i\\,x_i^2=5$ فإن $\\sigma=\\sqrt{5}$.', 'If $\\mu=2$ and $\\sum p_i\\,x_i^2=5$, then $\\sigma=\\sqrt{5}$.'),
            right: say('Batez bestekoaren karratua kendu behar da erroa egin aurretik: $\\sigma=\\sqrt{5-2^2}=1$.', 'Hay que restar el cuadrado de la media antes de hacer la raíz: $\\sigma=\\sqrt{5-2^2}=1$.', 'يجب طرح مربع المتوسط قبل أخذ الجذر: $\\sigma=\\sqrt{5-2^2}=1$.', 'The square of the mean has to be subtracted before taking the root: $\\sigma=\\sqrt{5-2^2}=1$.')
        },
        check: {
            prompt: say('$X$ aldagaiak 0, 1, 2 eta 3 balio ditu, 0,2; 0,4; 0,3 eta 0,1 probabilitateekin. Zenbat da $\\mu$?', '$X$ vale 0, 1, 2 o 3 con probabilidades 0,2; 0,4; 0,3 y 0,1. ¿Cuánto vale $\\mu$?', 'يأخذ $X$ القيم 0 و1 و2 و3 باحتمالات 0.2 و0.4 و0.3 و0.1. كم يساوي $\\mu$؟', '$X$ is 0, 1, 2 or 3 with probabilities 0.2, 0.4, 0.3 and 0.1. What is $\\mu$?'),
            options: [same('$1{,}5$'), same('$1{,}3$'), same('$0{,}25$')],
            correctIndex: 1,
            explanation: say('Balio bakoitza bider bere probabilitatea: $0{,}4+0{,}6+0{,}3=1{,}3$. 1,5 balioen batez besteko hutsa da, probabilitateak kontuan hartu gabe.', 'Cada valor por su probabilidad: $0{,}4+0{,}6+0{,}3=1{,}3$. 1,5 es la media de los valores sin pesar las probabilidades.', 'كل قيمة في احتمالها: $0{,}4+0{,}6+0{,}3=1{,}3$. و1.5 متوسط القيم دون وزن الاحتمالات.', 'Each value times its probability: $0{,}4+0{,}6+0{,}3=1{,}3$. 1.5 is the mean of the values without weighting the probabilities.')
        }
    },
    'expected-gain': {
        mistake: {
            wrong: say('Sari nagusia (300 €) txartelaren prezioa (2 €) baino askoz handiagoa denez, jokatzea komeni da.', 'Como el premio gordo (300 €) es mucho mayor que el boleto (2 €), conviene jugar.', 'بما أن الجائزة الكبرى (300 €) أكبر بكثير من ثمن البطاقة (2 €)، فاللعب مربح.', 'Since the top prize (€300) is much bigger than the ticket (€2), it pays to play.'),
            right: say('Sariaren probabilitatea ere kontuan hartu behar da: batez besteko irabazia $\\mu$ da, ken txartelaren prezioa.', 'Hay que pesar el premio con su probabilidad: la ganancia media es $\\mu$ menos el precio del boleto.', 'يجب وزن الجائزة باحتمالها: الربح المتوسط هو $\\mu$ ناقص ثمن البطاقة.', 'The prize has to be weighted by its probability: the mean gain is $\\mu$ minus the price of the ticket.')
        },
        check: {
            prompt: say('100 txartel saltzen dira, bakoitza euro 1. Sari bakarra dago, 80 eurokoa. Zein da jokalariaren batez besteko irabazia?', 'Se venden 100 boletos a 1 € y hay un único premio de 80 €. ¿Cuál es la ganancia media del jugador?', 'تُباع 100 بطاقة بسعر 1 € لكل منها، وهناك جائزة واحدة قدرها 80 €. ما الربح المتوسط للاعب؟', '100 tickets are sold at €1 each and there is a single prize of €80. What is the player\'s mean gain?'),
            options: [same('$79$'), same('$-0{,}2$'), same('$0{,}8$')],
            correctIndex: 1,
            explanation: say('Batez besteko saria $80\\cdot\\frac{1}{100}=0{,}8$ euro da, eta txartelaren prezioa kendu behar zaio: $0{,}8-1=-0{,}2$. 0,8 prezioa kendu gabe ateratzen da.', 'El premio medio es $80\\cdot\\frac{1}{100}=0{,}8$ € y hay que restarle el boleto: $0{,}8-1=-0{,}2$. El 0,8 sale sin restar el precio.', 'الجائزة المتوسطة $80\\cdot\\frac{1}{100}=0{,}8$ € ويجب طرح ثمن البطاقة: $0{,}8-1=-0{,}2$. ونحصل على 0.8 دون طرح الثمن.', 'The mean prize is $80\\cdot\\frac{1}{100}=0{,}8$ euros and the ticket has to be subtracted: $0{,}8-1=-0{,}2$. 0.8 comes out without subtracting the price.')
        }
    },

    /* ---------- 3. The binomial distribution ---------- */
    galton: {
        mistake: {
            wrong: say('4 iltzeko Galtonen tresnan 5 kutxatila daude; beraz, bakoitzak $\\frac{1}{5}$ probabilitatea du.', 'En un aparato de Galton de 4 filas hay 5 casillas; por tanto, cada una tiene probabilidad $\\frac{1}{5}$.', 'في جهاز غالتون ذي 4 صفوف هناك 5 خانات؛ إذن لكل منها احتمال $\\frac{1}{5}$.', 'A Galton board with 4 rows has 5 bins; so each one has probability $\\frac{1}{5}$.'),
            right: say('Erdiko kutxatiletara bide gehiago iristen dira: $\\binom{4}{2}=6$ bide 16 bidetik, eta muturretara bakarra.', 'A las casillas centrales llegan más caminos: $\\binom{4}{2}=6$ de los 16, y a los extremos, uno solo.', 'تصل إلى الخانات الوسطى مسارات أكثر: $\\binom{4}{2}=6$ من 16، وإلى الطرفين مسار واحد فقط.', 'More paths reach the middle bins: $\\binom{4}{2}=6$ of the 16, and only one reaches each end.')
        },
        check: {
            prompt: say('Galtonen tresna batek 5 iltze-errenkada ditu. Zenbat bide iristen dira 2. kutxatilara (bi aldiz eskuinera)?', 'Un aparato de Galton tiene 5 filas de clavos. ¿Cuántos caminos llegan a la casilla 2 (dos veces a la derecha)?', 'لجهاز غالتون 5 صفوف من المسامير. كم مسارًا يصل إلى الخانة 2 (مرتين إلى اليمين)؟', 'A Galton board has 5 rows of pins. How many paths reach bin 2 (right twice)?'),
            options: [same('$5$'), same('$10$'), same('$32$')],
            correctIndex: 1,
            explanation: say('Zein 2 errenkadatan doan eskuinera aukeratzea da: $\\binom{5}{2}=10$. 32 bide guztiak dira, $2^5$.', 'Es elegir en qué 2 filas va a la derecha: $\\binom{5}{2}=10$. 32 son todos los caminos, $2^5$.', 'هو اختيار الصفّين اللذين يتجه فيهما إلى اليمين: $\\binom{5}{2}=10$. و32 هو عدد كل المسارات، $2^5$.', 'It is choosing in which 2 rows it goes right: $\\binom{5}{2}=10$. 32 is all the paths, $2^5$.')
        }
    },
    'is-binomial': {
        mistake: {
            wrong: say('Baraja batetik 3 karta ateratzen dira, itzuli gabe, eta urreak zenbatzen dira: $B(3;\\,0{,}25)$.', 'Se sacan 3 cartas de una baraja sin devolverlas y se cuentan los oros: $B(3;\\,0{,}25)$.', 'تُسحب 3 أوراق من رزمة دون إرجاع وتُعدّ أوراق الذهب: $B(3;\\,0{,}25)$.', 'Three cards are drawn from a deck without putting them back and the golds are counted: $B(3;\\,0{,}25)$.'),
            right: say('Itzuli gabe, karta bakoitzarekin aldatzen da urre bat ateratzeko probabilitatea: ez da binomiala.', 'Sin devolver, la probabilidad de oros cambia con cada carta: no es binomial.', 'دون إرجاع يتغيّر احتمال الذهب مع كل ورقة: ليس ثنائيًّا.', 'Without replacement, the probability of a gold changes with each card: it is not binomial.')
        },
        check: {
            prompt: say('Zein da binomiala?', '¿Cuál es binomial?', 'أيّها ثنائي؟', 'Which one is binomial?'),
            options: [
                say('25 ikasleko klase batetik 5 aukeratu, errepikatu gabe, eta neskak zenbatu.', 'Elegir 5 de una clase de 25 sin repetir y contar las chicas.', 'اختيار 5 من صف فيه 25 دون تكرار وعدّ الفتيات.', 'Choose 5 from a class of 25 without repeating and count the girls.'),
                say('Txanpon bat 10 aldiz bota eta aurpegiak zenbatu.', 'Lanzar una moneda 10 veces y contar las caras.', 'رمي قطعة نقود 10 مرات وعدّ الأوجه.', 'Toss a coin 10 times and count the heads.'),
                say('Dado bat behin bota eta zenbakia idatzi.', 'Lanzar un dado una vez y apuntar el número.', 'رمي نرد مرة واحدة وكتابة العدد.', 'Roll a die once and write down the number.')
            ],
            correctIndex: 1,
            explanation: say('Txanponak 10 proba berdin eta independente ditu, bi emaitzarekin eta $p=0{,}5$: $B(10;\\,0{,}5)$. Klasean errepikatu gabe aukeratzen da, eta dadoak ez ditu arrakastak zenbatzen.', 'La moneda son 10 pruebas iguales e independientes, con dos resultados y $p=0{,}5$: $B(10;\\,0{,}5)$. En la clase se elige sin repetir, y el dado no cuenta éxitos.', 'القطعة 10 محاولات متماثلة ومستقلة، بنتيجتين و$p=0{,}5$: $B(10;\\,0{,}5)$. في الصف يكون الاختيار دون تكرار، والنرد لا يعدّ نجاحات.', 'The coin is 10 equal, independent trials with two outcomes and $p=0{,}5$: $B(10;\\,0{,}5)$. In the class the choice is without repeating, and the die does not count successes.')
        }
    },
    'binomial-formula': {
        mistake: {
            wrong: say('$X\\sim B(5;\\,0{,}25)$ bada, $P(X=2)=0{,}25^2\\cdot 0{,}75^3$.', 'Si $X\\sim B(5;\\,0{,}25)$, $P(X=2)=0{,}25^2\\cdot 0{,}75^3$.', 'إذا كان $X\\sim B(5;\\,0{,}25)$ فإن $P(X=2)=0{,}25^2\\cdot 0{,}75^3$.', 'If $X\\sim B(5;\\,0{,}25)$, $P(X=2)=0{,}25^2\\cdot 0{,}75^3$.'),
            right: say('Ordena bakarra da. Zenbaki konbinatorioa falta da: $P(X=2)=\\binom{5}{2}\\cdot 0{,}25^2\\cdot 0{,}75^3$, 10 aldiz handiagoa.', 'Es un solo orden. Falta el número combinatorio: $P(X=2)=\\binom{5}{2}\\cdot 0{,}25^2\\cdot 0{,}75^3$, 10 veces más.', 'هذا ترتيب واحد. ينقص العدد التوافقي: $P(X=2)=\\binom{5}{2}\\cdot 0{,}25^2\\cdot 0{,}75^3$، أي 10 أضعاف.', 'That is one order only. The binomial coefficient is missing: $P(X=2)=\\binom{5}{2}\\cdot 0{,}25^2\\cdot 0{,}75^3$, 10 times as much.')
        },
        check: {
            prompt: say('$X\\sim B(3;\\,0{,}2)$ bada, zenbat da $P(X=1)$?', 'Si $X\\sim B(3;\\,0{,}2)$, ¿cuánto vale $P(X=1)$?', 'إذا كان $X\\sim B(3;\\,0{,}2)$، فكم يساوي $P(X=1)$؟', 'If $X\\sim B(3;\\,0{,}2)$, what is $P(X=1)$?'),
            options: [same('$0{,}128$'), same('$0{,}2$'), same('$0{,}384$')],
            correctIndex: 2,
            explanation: say('$\\binom{3}{1}\\cdot 0{,}2\\cdot 0{,}8^2=3\\cdot 0{,}128=0{,}384$. 0,128 ordena bakar bat da, 3 zenbakia gabe.', '$\\binom{3}{1}\\cdot 0{,}2\\cdot 0{,}8^2=3\\cdot 0{,}128=0{,}384$. 0,128 es un solo orden, sin el 3.', '$\\binom{3}{1}\\cdot 0{,}2\\cdot 0{,}8^2=3\\cdot 0{,}128=0{,}384$. و0.128 ترتيب واحد بلا العدد 3.', '$\\binom{3}{1}\\cdot 0{,}2\\cdot 0{,}8^2=3\\cdot 0{,}128=0{,}384$. 0.128 is a single order, without the 3.')
        }
    },
    'binomial-events': {
        mistake: {
            wrong: say('$B(6;\\,p)$ banaketan, «2 baino gehiago» gertaera $P(X\\ge 2)$ da.', 'En una $B(6;\\,p)$, «más de 2» es $P(X\\ge 2)$.', 'في $B(6;\\,p)$، «أكثر من 2» هو $P(X\\ge 2)$.', 'In a $B(6;\\,p)$, ‘more than 2’ is $P(X\\ge 2)$.'),
            right: say('«2 baino gehiago» 3 zenbakitik hasten da: $P(X>2)=P(X\\ge 3)=1-P(X\\le 2)$.', '«Más de 2» empieza en 3: $P(X>2)=P(X\\ge 3)=1-P(X\\le 2)$.', '«أكثر من 2» يبدأ من 3: $P(X>2)=P(X\\ge 3)=1-P(X\\le 2)$.', '‘More than 2’ starts at 3: $P(X>2)=P(X\\ge 3)=1-P(X\\le 2)$.')
        },
        check: {
            prompt: say('$X\\sim B(8;\\,p)$. Zer da «gehienez 1»?', '$X\\sim B(8;\\,p)$. ¿Qué es «como mucho 1»?', '$X\\sim B(8;\\,p)$. ما هو «واحد على الأكثر»؟', '$X\\sim B(8;\\,p)$. What is ‘at most 1’?'),
            options: [same('$1-P(X=0)$'), same('$P(X=0)+P(X=1)$'), same('$1-P(X=0)-P(X=1)$')],
            correctIndex: 1,
            explanation: say('«Gehienez 1» 0 edo 1 da. $1-P(X=0)$ «gutxienez 1» da, eta azkena «1 baino gehiago».', '«Como mucho 1» es 0 o 1. $1-P(X=0)$ es «al menos 1», y la última, «más de 1».', '«واحد على الأكثر» هو 0 أو 1. و$1-P(X=0)$ هو «واحد على الأقل»، والأخيرة «أكثر من 1».', '‘At most 1’ is 0 or 1. $1-P(X=0)$ is ‘at least 1’, and the last one, ‘more than 1’.')
        }
    },
    'binomial-parameters': {
        mistake: {
            wrong: say('$X\\sim B(100;\\,0{,}2)$ bada, $\\sigma=100\\cdot 0{,}2\\cdot 0{,}8=16$.', 'Si $X\\sim B(100;\\,0{,}2)$, $\\sigma=100\\cdot 0{,}2\\cdot 0{,}8=16$.', 'إذا كان $X\\sim B(100;\\,0{,}2)$ فإن $\\sigma=100\\cdot 0{,}2\\cdot 0{,}8=16$.', 'If $X\\sim B(100;\\,0{,}2)$, $\\sigma=100\\cdot 0{,}2\\cdot 0{,}8=16$.'),
            right: say('$npq$ bariantza da; desbideratze tipikoa haren erroa da: $\\sigma=\\sqrt{16}=4$.', '$npq$ es la varianza; la desviación típica es su raíz: $\\sigma=\\sqrt{16}=4$.', '$npq$ هو التباين؛ والانحراف المعياري جذره: $\\sigma=\\sqrt{16}=4$.', '$npq$ is the variance; the standard deviation is its root: $\\sigma=\\sqrt{16}=4$.')
        },
        check: {
            prompt: say('$X\\sim B(36;\\,0{,}5)$ bada, zenbat da $\\sigma$?', 'Si $X\\sim B(36;\\,0{,}5)$, ¿cuánto vale $\\sigma$?', 'إذا كان $X\\sim B(36;\\,0{,}5)$، فكم يساوي $\\sigma$؟', 'If $X\\sim B(36;\\,0{,}5)$, what is $\\sigma$?'),
            options: [same('$9$'), same('$18$'), same('$3$')],
            correctIndex: 2,
            explanation: say('$\\sigma=\\sqrt{36\\cdot 0{,}5\\cdot 0{,}5}=\\sqrt{9}=3$. 9 bariantza da, eta 18 batez bestekoa.', '$\\sigma=\\sqrt{36\\cdot 0{,}5\\cdot 0{,}5}=\\sqrt{9}=3$. 9 es la varianza, y 18, la media.', '$\\sigma=\\sqrt{36\\cdot 0{,}5\\cdot 0{,}5}=\\sqrt{9}=3$. و9 هو التباين، و18 المتوسط.', '$\\sigma=\\sqrt{36\\cdot 0{,}5\\cdot 0{,}5}=\\sqrt{9}=3$. 9 is the variance, and 18 the mean.')
        }
    },

    /* ---------- 4. Fitting data to a binomial ---------- */
    'fit-p': {
        mistake: {
            wrong: say('80 hirukotetan batez bestekoa 1,5 da; beraz, $p=\\frac{1{,}5}{80}$.', 'En 80 grupos de tres la media es 1,5; por tanto, $p=\\frac{1{,}5}{80}$.', 'في 80 مجموعة ثلاثية المتوسط 1.5؛ إذن $p=\\frac{1{,}5}{80}$.', 'In 80 groups of three the mean is 1.5; so $p=\\frac{1{,}5}{80}$.'),
            right: say('$n$ talde bakoitzeko proba kopurua da (3), ez talde kopurua: $p=\\frac{1{,}5}{3}=0{,}5$.', '$n$ es el número de pruebas de cada grupo (3), no el número de grupos: $p=\\frac{1{,}5}{3}=0{,}5$.', '$n$ هو عدد المحاولات في كل مجموعة (3) لا عدد المجموعات: $p=\\frac{1{,}5}{3}=0{,}5$.', '$n$ is the number of trials in each group (3), not the number of groups: $p=\\frac{1{,}5}{3}=0{,}5$.')
        },
        check: {
            prompt: say('Datu bakoitza 5 probatako arrakasta kopurua da, eta batez bestekoa 2 da. Zein $p$ du binomialak?', 'Cada dato es el número de éxitos en 5 pruebas, y la media es 2. ¿Qué $p$ tiene la binomial?', 'كل معطى هو عدد النجاحات في 5 محاولات، والمتوسط 2. ما $p$ للتوزيع الثنائي؟', 'Each datum is the number of successes in 5 trials, and the mean is 2. What $p$ does the binomial have?'),
            options: [same('$0{,}4$'), same('$2{,}5$'), same('$0{,}2$')],
            correctIndex: 0,
            explanation: say('$np=\\bar{x}$ denez, $p=\\frac{2}{5}=0{,}4$. 2,5 zatiketa alderantziz egitea da.', 'Como $np=\\bar{x}$, $p=\\frac{2}{5}=0{,}4$. 2,5 es dividir al revés.', 'بما أن $np=\\bar{x}$ فإن $p=\\frac{2}{5}=0{,}4$. و2.5 قسمة معكوسة.', 'Since $np=\\bar{x}$, $p=\\frac{2}{5}=0{,}4$. 2.5 is dividing the other way round.')
        }
    },
    'expected-values': {
        mistake: {
            wrong: say('$B(3;\\,0{,}5)$ eta 80 talderekin, $X=1$ balioaren balio itxarona $\\frac{3}{8}$ da.', 'Con $B(3;\\,0{,}5)$ y 80 grupos, el valor esperado de $X=1$ es $\\frac{3}{8}$.', 'مع $B(3;\\,0{,}5)$ و80 مجموعة، القيمة المتوقعة لـ $X=1$ هي $\\frac{3}{8}$.', 'With $B(3;\\,0{,}5)$ and 80 groups, the expected value for $X=1$ is $\\frac{3}{8}$.'),
            right: say('Hori probabilitatea da. Balio itxarona talde kopurua bider probabilitatea da: $80\\cdot\\frac{3}{8}=30$ talde.', 'Esa es la probabilidad. El valor esperado es el número de grupos por la probabilidad: $80\\cdot\\frac{3}{8}=30$ grupos.', 'هذا هو الاحتمال. القيمة المتوقعة هي عدد المجموعات في الاحتمال: $80\\cdot\\frac{3}{8}=30$ مجموعة.', 'That is the probability. The expected value is the number of groups times the probability: $80\\cdot\\frac{3}{8}=30$ groups.')
        },
        check: {
            prompt: say('64 behaketa dira, eta $B(2;\\,0{,}5)$ banaketarekin alderatzen dira. Zenbat espero dira $X=1$ balioarekin?', 'Son 64 observaciones y se comparan con una $B(2;\\,0{,}5)$. ¿Cuántas se esperan con $X=1$?', 'هناك 64 مشاهدة تُقارن بـ $B(2;\\,0{,}5)$. كم منها يُتوقع أن تكون $X=1$؟', 'There are 64 observations compared with a $B(2;\\,0{,}5)$. How many are expected with $X=1$?'),
            options: [same('$16$'), same('$32$'), same('$0{,}5$')],
            correctIndex: 1,
            explanation: say('$P(X=1)=2\\cdot 0{,}5\\cdot 0{,}5=0{,}5$, eta $64\\cdot 0{,}5=32$. 0,5 probabilitatea bakarrik da, eta 16, $X=0$ balioarena.', '$P(X=1)=2\\cdot 0{,}5\\cdot 0{,}5=0{,}5$, y $64\\cdot 0{,}5=32$. 0,5 es solo la probabilidad, y 16, la de $X=0$.', '$P(X=1)=2\\cdot 0{,}5\\cdot 0{,}5=0{,}5$، و$64\\cdot 0{,}5=32$. و0.5 هو الاحتمال فقط، و16 قيمة $X=0$.', '$P(X=1)=2\\cdot 0{,}5\\cdot 0{,}5=0{,}5$, and $64\\cdot 0{,}5=32$. 0.5 is just the probability, and 16 is the one for $X=0$.')
        }
    },
    'good-fit': {
        mistake: {
            wrong: say('Diferentziak zeinuarekin batuta, $1-3+3-1=0$: doikuntza ezin hobea da.', 'Sumando las diferencias con su signo, $1-3+3-1=0$: el ajuste es perfecto.', 'بجمع الفروق بإشاراتها، $1-3+3-1=0$: المطابقة تامة.', 'Adding the differences with their signs, $1-3+3-1=0$: the fit is perfect.'),
            right: say('Datuak eta itxaronak beti 80 dira, beraz, zeinudun diferentziek beti 0 egiten dute. Balio absolutuak begiratzen dira, eta handiena.', 'Observados y esperados suman siempre 80, así que las diferencias con signo siempre suman 0. Se miran los valores absolutos, y el mayor.', 'مجموع المشاهَدة والمتوقعة دائمًا 80، لذا مجموع الفروق بإشاراتها 0 دائمًا. تُؤخذ القيم المطلقة وأكبرها.', 'Observed and expected always add up to 80, so the signed differences always add up to 0. Look at the absolute values, and the largest.')
        },
        check: {
            prompt: say('200 datu dira, eta diferentziarik handiena 6 da. Doikuntza onartzen da Matellaren arauarekin?', 'Son 200 datos y la mayor diferencia es 6. ¿Se acepta el ajuste con la regla de Matella?', 'هناك 200 معطى وأكبر فرق 6. هل تُقبل المطابقة بقاعدة ماتيلا؟', 'There are 200 data and the largest difference is 6. Is the fit accepted with Matella\'s rule?'),
            options: [
                say('Ez: 6 zenbakia 5 baino handiagoa da.', 'No: 6 es mayor que 5.', 'لا: 6 أكبر من 5.', 'No: 6 is bigger than 5.'),
                say('Bai: 6 guztizkoaren % 3 da.', 'Sí: 6 es el 3 % del total.', 'نعم: 6 هو 3٪ من الكل.', 'Yes: 6 is 3% of the total.'),
                say('Ezin da jakin.', 'No se puede saber.', 'لا يمكن معرفة ذلك.', 'It cannot be told.')
            ],
            correctIndex: 1,
            explanation: say('Araua ehunekoarekin da: $\\frac{6}{200}=0{,}03$, % 3, % 5 baino gutxiago. 5 ez da diferentzia bat, ehuneko bat baizik.', 'La regla va con porcentajes: $\\frac{6}{200}=0{,}03$, el 3 %, menos del 5 %. El 5 no es una diferencia, sino un porcentaje.', 'القاعدة بالنسب المئوية: $\\frac{6}{200}=0{,}03$، أي 3٪، أقل من 5٪. و5 ليس فرقًا بل نسبة مئوية.', 'The rule goes by percentages: $\\frac{6}{200}=0{,}03$, 3%, less than 5%. 5 is not a difference but a percentage.')
        }
    }
}
