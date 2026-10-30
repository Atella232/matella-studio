import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Konbinatoria · 4. DBH akademikoak — diagnostic, guided practice,
   exercise bank and challenges. Exercises follow Santillana Académicas
   unit 13 (factorials, combinatorial numbers, lists of candidates, flags,
   ice creams, oils, clothes for a week) and Anaya Académicas unit 11
   (handshakes, menus, dice and cards, the billiards tournament, prizes,
   the league, paint mixtures, the 5555333 numbers and paths on a grid).
   Every answer is a whole number; thousands are grouped with \, in LaTeX.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })
const n = (value: number) => fraction(value)

export const combinatoricsAkDiagnostic: DiagnosticQuestion[] = [
    {
        id: 6201,
        prompt: say('3 kamiseta eta 2 praka dituzu. Zenbat jantzi desberdin egin ditzakezu (kamiseta bat eta praka batzuk)?', 'Tienes 3 camisetas y 2 pantalones. ¿Cuántos conjuntos distintos (una camiseta y un pantalón) puedes formar?', 'لديك 3 قمصان وبنطالان. كم طقمًا مختلفًا (قميص وبنطال) يمكنك تكوينه؟', 'You have 3 T-shirts and 2 pairs of trousers. How many different outfits (one T-shirt and one pair of trousers) can you make?'),
        options: [same('$5$'), same('$6$'), same('$9$')],
        correctIndex: 1,
        explanation: say('Kamiseta bakoitzarekin 2 praka: $3\\cdot 2=6$.', 'Con cada camiseta, 2 pantalones: $3\\cdot 2=6$.', 'مع كل قميص بنطالان: $3\\cdot 2=6$.', 'With each T-shirt, 2 pairs of trousers: $3\\cdot 2=6$.'),
        topic: 'product'
    },
    {
        id: 6202,
        prompt: say('Zenbat da $5!$?', '¿Cuánto vale $5!$?', 'كم يساوي $5!$؟', 'What is $5!$?'),
        options: [same('$25$'), same('$15$'), same('$120$')],
        correctIndex: 2,
        explanation: same('$5\\cdot 4\\cdot 3\\cdot 2\\cdot 1=120$'),
        topic: 'factorial'
    },
    {
        id: 6203,
        prompt: say('Hiru letrako pasahitzak A, B eta C letrekin, letrak errepika daitezke. Zenbat?', 'Contraseñas de tres letras con A, B y C, pudiendo repetir letras. ¿Cuántas hay?', 'كلمات سر من ثلاثة أحرف بـ A وB وC مع جواز التكرار. كم كلمة؟', 'Passwords of three letters using A, B and C, where letters can be repeated. How many are there?'),
        options: [same('$27$'), same('$6$'), same('$9$')],
        correctIndex: 0,
        explanation: say('Ordena bai eta errepikapena bai: $3^{3}=27$.', 'Con orden y con repetición: $3^{3}=27$.', 'مع الترتيب والتكرار: $3^{3}=27$.', 'With order and with repetition: $3^{3}=27$.'),
        topic: 'with-repetition'
    },
    {
        id: 6204,
        prompt: say('Lasterketa batean 5 korrikalari daude. Zenbat podium desberdin (urrea, zilarra, brontzea)?', 'En una carrera hay 5 corredores. ¿Cuántos podios distintos (oro, plata, bronce) puede haber?', 'في سباق 5 عدّائين. كم منصة تتويج مختلفة (ذهب، فضة، برونز)؟', 'In a race there are 5 runners. How many different podiums (gold, silver, bronze) are possible?'),
        options: [same('$125$'), same('$60$'), same('$10$')],
        correctIndex: 1,
        explanation: say('Ordenak axola du eta ez da errepikatzen: $5\\cdot 4\\cdot 3=60$.', 'Importa el orden y no se repite: $5\\cdot 4\\cdot 3=60$.', 'الترتيب مهم ولا تكرار: $5\\cdot 4\\cdot 3=60$.', 'Order matters, and there is no repetition: $5\\cdot 4\\cdot 3=60$.'),
        topic: 'variations'
    },
    {
        id: 6205,
        prompt: say('Zenbat eratara ordena daitezke 4 liburu apal batean?', '¿De cuántas formas se pueden ordenar 4 libros en una estantería?', 'بكم طريقة يمكن ترتيب 4 كتب على رف؟', 'In how many ways can 4 books be arranged on a shelf?'),
        options: [same('$16$'), same('$4$'), same('$24$')],
        correctIndex: 2,
        explanation: same('$\\text{P}_4=4!=24$'),
        topic: 'permutations'
    },
    {
        id: 6206,
        prompt: say('4 lagunetatik 2 aukeratu behar dira bidaia baterako. Zenbat eratara?', 'Hay que elegir a 2 de 4 amigos para un viaje. ¿De cuántas formas?', 'يجب اختيار 2 من 4 أصدقاء لرحلة. بكم طريقة؟', 'You have to choose 2 of 4 friends for a trip. In how many ways?'),
        options: [same('$6$'), same('$12$'), same('$8$')],
        correctIndex: 0,
        explanation: say('Ordenak ez du axola: $\\frac{4\\cdot 3}{2}=6$.', 'No importa el orden: $\\frac{4\\cdot 3}{2}=6$.', 'الترتيب لا يهم: $\\frac{4\\cdot 3}{2}=6$.', 'Order does not matter: $\\frac{4\\cdot 3}{2}=6$.'),
        topic: 'combinations'
    },
    {
        id: 6207,
        prompt: say('25 ikasleko klase batean 3 ordezkari aukeratu behar dira, kargurik gabe. Zein eredu da?', 'En una clase de 25 hay que elegir 3 delegados, sin cargos. ¿Qué modelo es?', 'في صف من 25 يجب اختيار 3 مندوبين دون مناصب. أي نموذج هذا؟', 'In a class of 25, 3 class representatives have to be chosen, with no roles. What model is this?'),
        options: [say('Aldakuntzak', 'Variaciones', 'تراتيب', 'Arrangements'), say('Permutazioak', 'Permutaciones', 'تباديل', 'Permutations'), say('Konbinazioak', 'Combinaciones', 'توافيق', 'Combinations')],
        correctIndex: 2,
        explanation: say('Kargurik ez dagoenez, ordenak ez du axola eta pertsonak ez dira errepikatzen: $\\text{C}_{25,3}$.', 'Como no hay cargos, el orden no importa y las personas no se repiten: $\\text{C}_{25,3}$.', 'لعدم وجود مناصب لا يهم الترتيب ولا يتكرر الأشخاص: $\\text{C}_{25,3}$.', 'As there are no roles, order does not matter and no one is picked twice: $\\text{C}_{25,3}$.'),
        topic: 'which-model'
    },
    {
        id: 6208,
        prompt: say('Tartagliaren triangeluaren 4. lerroa 1, 4, 6, 4, 1 da. Zenbat da haren batura?', 'La fila 4 del triángulo de Tartaglia es 1, 4, 6, 4, 1. ¿Cuánto suma?', 'الصف 4 من مثلث تارتاليا هو 1، 4، 6، 4، 1. كم مجموعه؟', 'Row 4 of Tartaglia\'s triangle is 1, 4, 6, 4, 1. What is its sum?'),
        options: [same('$10$'), same('$16$'), same('$8$')],
        correctIndex: 1,
        explanation: same('$1+4+6+4+1=16=2^{4}$'),
        topic: 'pascal'
    }
]

export const combinatoricsAkPractice: PracticeItem[] = [
    /* ---------- Counting ---------- */
    {
        id: 1, stage: 'counting',
        prompt: say('Bilera batera 8 europar eta 11 japoniar doaz, eta europar bakoitzak japoniar bakoitzari ematen dio eskua. Zenbat eskuemate?', 'A una reunión van 8 europeos y 11 japoneses, y cada europeo da la mano a cada japonés. ¿Cuántos apretones de manos hay?', 'إلى اجتماع يحضر 8 أوروبيين و11 يابانيًا، ويصافح كل أوروبي كل ياباني. كم مصافحة؟', '8 Europeans and 11 Japanese people go to a meeting, and each European shakes hands with each Japanese person. How many handshakes are there?'),
        expected: n(88),
        hint: say('Europar bakoitzak 11 eskuemate.', 'Cada europeo da 11 apretones.', 'كل أوروبي يصافح 11 مرة.', 'Each European shakes hands 11 times.'),
        explanation: same('$8\\cdot 11=88$')
    },
    {
        id: 2, stage: 'counting',
        prompt: say('Dado bat botatzen da, 40 kartako sorta batetik karta bat ateratzen da eta txanpon bat botatzen da. Zenbat emaitza?', 'Se lanza un dado, se saca una carta de una baraja de 40 y se lanza una moneda. ¿Cuántos resultados hay?', 'يُرمى نرد وتُسحب ورقة من مجموعة 40 ورقة وتُرمى قطعة نقود. كم نتيجة؟', 'A die is rolled, a card is drawn from a pack of 40 cards, and a coin is tossed. How many outcomes are there?'),
        expected: n(480),
        hint: say('Hiru erabaki «eta» bidez: biderkatu.', 'Tres decisiones unidas con «y»: multiplica.', 'ثلاثة قرارات مربوطة بـ«و»: اضرب.', 'Three decisions joined by “and”: multiply.'),
        explanation: same('$6\\cdot 40\\cdot 2=480$')
    },
    {
        id: 3, stage: 'counting',
        prompt: say('Kalkulatu $\\frac{9!}{7!}$.', 'Calcula $\\frac{9!}{7!}$.', 'احسب $\\frac{9!}{7!}$.', 'Calculate $\\frac{9!}{7!}$.'),
        expected: n(72),
        hint: same('$9!=9\\cdot 8\\cdot 7!$'),
        explanation: same('$\\frac{9!}{7!}=9\\cdot 8=72$')
    },
    {
        id: 4, stage: 'counting',
        prompt: say('3 kamiseta, 4 praka eta 2 zapatila pare dituzu. Zenbat jantzi oso?', 'Tienes 3 camisetas, 4 pantalones y 2 pares de zapatillas. ¿Cuántos conjuntos completos?', 'لديك 3 قمصان و4 بناطيل وزوجان من الأحذية. كم طقمًا كاملًا؟', 'You have 3 T-shirts, 4 pairs of trousers and 2 pairs of trainers. How many complete outfits are there?'),
        expected: n(24),
        hint: say('Biderkatu hiru aukera kopuruak.', 'Multiplica los tres números de opciones.', 'اضرب أعداد الخيارات الثلاثة.', 'Multiply the three numbers of options.'),
        explanation: same('$3\\cdot 4\\cdot 2=24$')
    },

    /* ---------- Variations ---------- */
    {
        id: 5, stage: 'variations',
        prompt: say('Zenbat hiru zifrako zenbaki egin daitezke 1, 2, 3, 4 zifrekin, errepikatuz?', '¿Cuántos números de tres cifras se pueden formar con 1, 2, 3, 4, repitiendo?', 'كم عددًا من ثلاثة أرقام يمكن تكوينه بالأرقام 1، 2، 3، 4 مع التكرار؟', 'How many three-digit numbers can be made using 1, 2, 3 and 4, with repetition allowed?'),
        expected: n(64),
        hint: say('Lauki bakoitzean 4 aukera.', 'En cada casilla, 4 opciones.', 'في كل خانة 4 خيارات.', 'In each slot, 4 options.'),
        explanation: same('$\\text{VR}_{4,3}=4^{3}=64$')
    },
    {
        id: 6, stage: 'variations',
        prompt: say('8 korrikalari daude. Zenbat eratara bana daitezke urrea, zilarra eta brontzea?', 'Hay 8 corredores. ¿De cuántas formas se pueden repartir el oro, la plata y el bronce?', 'هناك 8 عدّائين. بكم طريقة يمكن توزيع الذهب والفضة والبرونز؟', 'There are 8 runners. In how many ways can gold, silver and bronze be awarded?'),
        expected: n(336),
        hint: say('Ordenak axola du; korrikalari batek domina bakarra.', 'Importa el orden; cada corredor, una sola medalla.', 'الترتيب مهم؛ كل عدّاء ميدالية واحدة.', 'Order matters; each runner gets only one medal.'),
        explanation: same('$\\text{V}_{8,3}=8\\cdot 7\\cdot 6=336$')
    },
    {
        id: 7, stage: 'variations',
        prompt: say('Zenbat lau zifrako zenbaki daude (zifrak errepika daitezke, baina ez da 0z hasten)?', '¿Cuántos números de cuatro cifras hay (se pueden repetir cifras, pero no empiezan por 0)?', 'كم عددًا من أربعة أرقام هناك (يجوز التكرار لكن لا يبدأ بـ0)؟', 'How many four-digit numbers are there (digits can be repeated, but they cannot start with 0)?'),
        expected: n(9000),
        hint: say('Lehen laukian 9 aukera; beste guztietan 10.', 'En la primera casilla 9 opciones; en las demás, 10.', 'في الخانة الأولى 9 خيارات، وفي البقية 10.', 'In the first slot, 9 options; in the others, 10.'),
        explanation: same('$9\\cdot 10\\cdot 10\\cdot 10=9\\,000$')
    },
    {
        id: 8, stage: 'variations',
        prompt: say('Liga batean 20 talde daude, eta bakoitzak beste guztien aurka jokatzen du etxean eta kanpoan. Zenbat partida?', 'En una liga hay 20 equipos, y cada uno juega contra todos los demás en casa y fuera. ¿Cuántos partidos hay?', 'في دوري 20 فريقًا، ويلعب كل فريق ضد كل الفرق ذهابًا وإيابًا. كم مباراة؟', 'In a league there are 20 teams, and each one plays against all the others at home and away. How many matches are there?'),
        expected: n(380),
        hint: say('A–B eta B–A partida desberdinak dira.', 'A–B y B–A son partidos distintos.', 'A–B وB–A مباراتان مختلفتان.', 'A–B and B–A are different matches.'),
        explanation: same('$\\text{V}_{20,2}=20\\cdot 19=380$')
    },

    /* ---------- Permutations ---------- */
    {
        id: 9, stage: 'permutations',
        prompt: say('Zenbat eratara ordena daitezke 5 liburu apal batean?', '¿De cuántas formas se pueden ordenar 5 libros en una estantería?', 'بكم طريقة يمكن ترتيب 5 كتب على رف؟', 'In how many ways can 5 books be arranged on a shelf?'),
        expected: n(120),
        hint: same('$\\text{P}_5=5!$'),
        explanation: same('$5\\cdot 4\\cdot 3\\cdot 2\\cdot 1=120$')
    },
    {
        id: 10, stage: 'permutations',
        prompt: say('6 lagun ilaran jartzen dira, eta bi elkarren ondoan egon nahi dute. Zenbat eratara?', '6 amigos se ponen en fila, y dos de ellos quieren ir juntos. ¿De cuántas formas?', 'يقف 6 أصدقاء في صف، ويريد اثنان منهم أن يتجاورا. بكم طريقة؟', '6 friends line up, and two of them want to stand together. In how many ways?'),
        expected: n(240),
        hint: say('Bikotea bloke bat da: 5 elementu, eta gero blokea barrutik.', 'La pareja es un bloque: 5 elementos, y luego el bloque por dentro.', 'الزوج كتلة: 5 عناصر، ثم الكتلة من الداخل.', 'The pair is one block: 5 items, then the block inside.'),
        explanation: same('$2\\cdot 5!=2\\cdot 120=240$')
    },
    {
        id: 11, stage: 'permutations',
        prompt: say('Zenbat anagrama ditu CASA hitzak?', '¿Cuántos anagramas tiene la palabra CASA?', 'كم جناسًا لكلمة CASA؟', 'How many anagrams does the word CASA have?'),
        expected: n(12),
        hint: say('A bi aldiz dago.', 'La A está dos veces.', 'الحرف A مكرر مرتين.', 'The A appears twice.'),
        explanation: same('$\\frac{4!}{2!}=\\frac{24}{2}=12$')
    },
    {
        id: 12, stage: 'permutations',
        prompt: say('5 lagun mahai biribil baten inguruan esertzen dira. Zenbat eratara, biraketak berdinak direla kontuan hartuta?', '5 amigos se sientan alrededor de una mesa redonda. ¿De cuántas formas, si los giros cuentan como iguales?', 'يجلس 5 أصدقاء حول طاولة مستديرة. بكم طريقة إذا عُدّت الدورانات متماثلة؟', '5 friends sit around a round table. In how many ways, if rotations count as the same?'),
        expected: n(24),
        hint: say('Finkatu bat eta ordenatu beste lauak.', 'Fija a uno y ordena a los otros cuatro.', 'ثبّت واحدًا ورتّب الأربعة الآخرين.', 'Fix one person and arrange the other four.'),
        explanation: same('$(5-1)!=4!=24$')
    },

    /* ---------- Combinations ---------- */
    {
        id: 13, stage: 'combinations',
        prompt: say('8 margo-pote desberdin daude. Zenbat bi koloreko nahasketa (kantitate berdinetan)?', 'Hay 8 botes de pintura de colores distintos. ¿Cuántas mezclas de dos colores (en cantidades iguales)?', 'هناك 8 علب طلاء بألوان مختلفة. كم خلطة من لونين (بكميات متساوية)؟', 'There are 8 pots of paint in different colours. How many mixtures of two colours (in equal amounts) are there?'),
        expected: n(28),
        hint: say('Ordenak ez du axola: zatitu $2!$-z.', 'El orden no importa: divide entre $2!$.', 'الترتيب لا يهم: اقسم على $2!$.', 'Order does not matter: divide by $2!$.'),
        explanation: same('$\\text{C}_{8,2}=\\frac{8\\cdot 7}{2}=28$')
    },
    {
        id: 14, stage: 'combinations',
        prompt: say('Espazioko 6 puntutatik, ez dago hiru lerrokaturik ez lau plano berean. Zenbat plano igarotzen dira haietako hirutatik?', 'De 6 puntos del espacio no hay tres alineados ni cuatro en el mismo plano. ¿Cuántos planos pasan por tres de ellos?', 'من 6 نقاط في الفضاء لا تقع ثلاث على استقامة ولا أربع في مستوى واحد. كم مستوى يمر بثلاث منها؟', 'Of 6 points in space, no three are in a straight line and no four are on the same plane. How many planes pass through three of them?'),
        expected: n(20),
        hint: say('Plano bat 3 puntuk zehazten dute, ordenarik gabe.', 'Un plano lo determinan 3 puntos, sin orden.', 'يحدّد المستوى 3 نقاط دون ترتيب.', 'Three points determine a plane, and order does not matter.'),
        explanation: same('$\\text{C}_{6,3}=\\frac{6\\cdot 5\\cdot 4}{3\\cdot 2\\cdot 1}=20$')
    },
    {
        id: 15, stage: 'combinations',
        prompt: say('Kalkulatu $\\binom{15}{13}$.', 'Calcula $\\binom{15}{13}$.', 'احسب $\\binom{15}{13}$.', 'Calculate $\\binom{15}{13}$.'),
        expected: n(105),
        hint: say('Simetria: $\\binom{15}{13}=\\binom{15}{2}$.', 'Simetría: $\\binom{15}{13}=\\binom{15}{2}$.', 'التماثل: $\\binom{15}{13}=\\binom{15}{2}$.', 'Symmetry: $\\binom{15}{13}=\\binom{15}{2}$.'),
        explanation: same('$\\frac{15\\cdot 14}{2}=105$')
    },
    {
        id: 16, stage: 'combinations',
        prompt: say('Zenbat da Tartagliaren triangeluaren 7. lerroko zenbakien batura?', '¿Cuánto suman los números de la fila 7 del triángulo de Tartaglia?', 'كم مجموع أعداد الصف 7 من مثلث تارتاليا؟', 'What is the sum of the numbers in row 7 of Tartaglia\'s triangle?'),
        expected: n(128),
        hint: say('$n$. lerroak $2^{n}$ batzen du.', 'La fila $n$ suma $2^{n}$.', 'مجموع الصف $n$ هو $2^{n}$.', 'Row $n$ sums to $2^{n}$.'),
        explanation: same('$2^{7}=128$')
    },

    /* ---------- Problems ---------- */
    {
        id: 17, stage: 'problems',
        prompt: say('Zenbat diagonal ditu dekagono batek?', '¿Cuántas diagonales tiene un decágono?', 'كم قطرًا للمضلع العشاري؟', 'How many diagonals does a decagon have?'),
        expected: n(35),
        hint: say('Erpin bikoteak ken aldeak, edo $\\frac{n(n-3)}{2}$.', 'Parejas de vértices menos lados, o $\\frac{n(n-3)}{2}$.', 'أزواج الرؤوس ناقص الأضلاع، أو $\\frac{n(n-3)}{2}$.', 'Pairs of vertices minus sides, or $\\frac{n(n-3)}{2}$.'),
        explanation: same('$\\frac{10\\cdot 7}{2}=35$')
    },
    {
        id: 18, stage: 'problems',
        prompt: say('Sare batean, A-tik B-ra 4 urrats eskuinera eta 2 gora daude. Zenbat bide?', 'En una cuadrícula, de A a B hay 4 pasos a la derecha y 2 hacia arriba. ¿Cuántos caminos?', 'في شبكة، من A إلى B هناك 4 خطوات يمينًا وخطوتان أعلى. كم مسارًا؟', 'On a grid, from A to B there are 4 steps to the right and 2 steps up. How many paths are there?'),
        expected: n(15),
        hint: say('6 urratsetatik aukeratu zein 2 diren gora.', 'De los 6 pasos, elige cuáles 2 son hacia arriba.', 'من الخطوات الست اختر أي اثنتين إلى الأعلى.', 'Of the 6 steps, choose which 2 are up.'),
        explanation: same('$\\text{C}_{6,2}=\\frac{6\\cdot 5}{2}=15$')
    },
    {
        id: 19, stage: 'problems',
        prompt: say('7 laguneko talde batean lehendakaria, idazkaria eta diruzaina aukeratu behar dira. Zenbat eratara?', 'En un grupo de 7 personas hay que elegir presidente, secretario y tesorero. ¿De cuántas formas?', 'في مجموعة من 7 أشخاص يجب اختيار رئيس وأمين سر وأمين صندوق. بكم طريقة؟', 'In a group of 7 people, a president, a secretary and a treasurer have to be chosen. In how many ways?'),
        expected: n(210),
        hint: say('Karguak desberdinak dira: ordenak axola du.', 'Los cargos son distintos: importa el orden.', 'المناصب مختلفة: الترتيب مهم.', 'The posts are different: order matters.'),
        explanation: same('$\\text{V}_{7,3}=7\\cdot 6\\cdot 5=210$')
    },
    {
        id: 20, stage: 'problems',
        prompt: say('6 mutil eta 5 neska daude. 2 mutil eta 2 neskako batzordea egin nahi da. Zenbat eratara?', 'Hay 6 chicos y 5 chicas. Se quiere una comisión de 2 chicos y 2 chicas. ¿De cuántas formas?', 'هناك 6 أولاد و5 بنات. نريد لجنة من ولدين وبنتين. بكم طريقة؟', 'There are 6 boys and 5 girls. A committee of 2 boys and 2 girls is wanted. In how many ways?'),
        expected: n(150),
        hint: say('Mutilen konbinazioak bider nesken konbinazioak.', 'Combinaciones de chicos por combinaciones de chicas.', 'توافيق الأولاد في توافيق البنات.', 'Combinations of boys times combinations of girls.'),
        explanation: same('$\\text{C}_{6,2}\\cdot\\text{C}_{5,2}=15\\cdot 10=150$')
    }
]

export const combinatoricsAkChallenges: ChallengeItem[] = [
    /* ---------- Counting ---------- */
    {
        id: 101, stage: 'counting', points: 10, context: 'starter',
        prompt: say('Hiru dado botatzen dira: gorria, berdea eta urdina. Zenbat emaitza desberdin?', 'Se lanzan tres dados: rojo, verde y azul. ¿Cuántos resultados distintos hay?', 'تُرمى ثلاثة نرود: أحمر وأخضر وأزرق. كم نتيجة مختلفة؟', 'Three dice (red, green and blue) are rolled. How many different outcomes are there?'),
        expected: n(216),
        hint: say('Dado bakoitzak 6 emaitza.', 'Cada dado, 6 resultados.', 'لكل نرد 6 نتائج.', 'Each die: 6 outcomes.'),
        explanation: same('$6\\cdot 6\\cdot 6=216$')
    },
    {
        id: 102, stage: 'counting', points: 20, context: 'advanced',
        prompt: say('Sinplifikatu eta kalkulatu $\\frac{12!}{10!\\cdot 2!}$.', 'Simplifica y calcula $\\frac{12!}{10!\\cdot 2!}$.', 'اختصر واحسب $\\frac{12!}{10!\\cdot 2!}$.', 'Simplify and calculate $\\frac{12!}{10!\\cdot 2!}$.'),
        expected: n(66),
        hint: same('$12!=12\\cdot 11\\cdot 10!$'),
        explanation: same('$\\frac{12\\cdot 11}{2}=66$')
    },
    {
        id: 103, stage: 'counting', points: 30, context: 'master',
        prompt: say('Álvarok eta Javierrek billar-txapelketa bat jokatzen dute: irabazlea jarraian bi partida edo guztira hiru irabazten dituena da. Zenbat garapen posible ditu txapelketak?', 'Álvaro y Javier juegan un torneo de billar: gana quien consiga dos partidas seguidas o tres en total. ¿Cuántos desarrollos posibles tiene el torneo?', 'يلعب ألفارو وخابيير دورة بلياردو: يفوز من يربح مباراتين متتاليتين أو ثلاثًا إجمالًا. كم مسارًا ممكنًا للدورة؟', 'Álvaro and Javier play a billiards tournament: the winner is whoever wins two games in a row or three games in total. How many possible sequences of games does the tournament have?'),
        expected: n(10),
        hint: say('Egin zuhaitza A-k irabazten duen lehen partidatik; gero simetria.', 'Haz el árbol desde que A gana la primera partida; después, simetría.', 'ارسم الشجرة بدءًا من فوز A بالمباراة الأولى، ثم استعمل التماثل.', 'Draw the tree starting with A winning the first game; then use symmetry.'),
        explanation: say('A-tik hasita: AA, AJJ, AJAA, AJAJA, AJAJJ. J-tik beste 5: $2\\cdot 5=10$.', 'Empezando por A: AA, AJJ, AJAA, AJAJA, AJAJJ. Por J, otros 5: $2\\cdot 5=10$.', 'بدءًا بـA: AA، AJJ، AJAA، AJAJA، AJAJJ. وبـJ خمسة أخرى: $2\\cdot 5=10$.', 'Starting with A: AA, AJJ, AJAA, AJAJA, AJAJJ. Starting with J, another 5: $2\\cdot 5=10$.')
    },

    /* ---------- Variations ---------- */
    {
        id: 104, stage: 'variations', points: 10, context: 'starter',
        prompt: say('Byte bat 8 bitez osatuta dago, bakoitza 0 edo 1. Zenbat byte desberdin daude?', 'Un byte tiene 8 bits, cada uno 0 o 1. ¿Cuántos bytes distintos hay?', 'يتكوّن البايت من 8 بتات، كل منها 0 أو 1. كم بايتًا مختلفًا؟', 'A byte has 8 bits, each one 0 or 1. How many different bytes are there?'),
        expected: n(256),
        hint: say('Ordena bai eta errepikapena bai.', 'Con orden y con repetición.', 'مع الترتيب والتكرار.', 'With order and with repetition.'),
        explanation: same('$\\text{VR}_{2,8}=2^{8}=256$')
    },
    {
        id: 105, stage: 'variations', points: 20, context: 'advanced',
        prompt: say('Zenbat hiru zifrako zenbaki bikoiti daude zifrak errepikatu gabe?', '¿Cuántos números pares de tres cifras hay sin repetir cifras?', 'كم عددًا زوجيًا من ثلاثة أرقام دون تكرار الأرقام؟', 'How many even three-digit numbers are there with no repeated digits?'),
        expected: n(328),
        hint: say('Bi kasu: 0an amaitzen dira ala 2, 4, 6, 8an.', 'Dos casos: acaban en 0 o en 2, 4, 6, 8.', 'حالتان: تنتهي بـ0 أو بـ2، 4، 6، 8.', 'Two cases: they end in 0, or they end in 2, 4, 6 or 8.'),
        explanation: say('0an amaituta: $9\\cdot 8=72$. Beste lau zifretan: $4\\cdot 8\\cdot 8=256$. Guztira $72+256=328$.', 'Acabados en 0: $9\\cdot 8=72$. En las otras cuatro cifras: $4\\cdot 8\\cdot 8=256$. En total $72+256=328$.', 'المنتهية بـ0: $9\\cdot 8=72$. وبالأرقام الأربعة الأخرى: $4\\cdot 8\\cdot 8=256$. المجموع $72+256=328$.', 'Ending in 0: $9\\cdot 8=72$. Ending in one of the other four digits: $4\\cdot 8\\cdot 8=256$. In total: $72+256=328$.')
    },
    {
        id: 106, stage: 'variations', points: 30, context: 'master',
        prompt: say('1, 2, 3, 4, 5 zifrekin, errepikatu gabe, zenbat hiru zifrako zenbaki dira 300 baino handiagoak?', 'Con las cifras 1, 2, 3, 4, 5, sin repetir, ¿cuántos números de tres cifras son mayores que 300?', 'بالأرقام 1، 2، 3، 4، 5 دون تكرار، كم عددًا من ثلاثة أرقام أكبر من 300؟', 'Using the digits 1, 2, 3, 4 and 5, with no repetition, how many three-digit numbers are greater than 300?'),
        expected: n(36),
        hint: say('Lehen zifra 3, 4 edo 5 izan behar da.', 'La primera cifra tiene que ser 3, 4 o 5.', 'يجب أن يكون الرقم الأول 3 أو 4 أو 5.', 'The first digit has to be 3, 4 or 5.'),
        explanation: same('$3\\cdot 4\\cdot 3=36$')
    },

    /* ---------- Permutations ---------- */
    {
        id: 107, stage: 'permutations', points: 10, context: 'starter',
        prompt: say('Zenbat eratara jar daitezke 7 pertsona ilara batean?', '¿De cuántas formas se pueden colocar 7 personas en una fila?', 'بكم طريقة يمكن ترتيب 7 أشخاص في صف؟', 'In how many ways can 7 people be arranged in a line?'),
        expected: n(5040),
        hint: same('$\\text{P}_7=7!$'),
        explanation: same('$7!=5\\,040$')
    },
    {
        id: 108, stage: 'permutations', points: 20, context: 'advanced',
        prompt: say('Zenbat anagrama ditu PAPAYA hitzak?', '¿Cuántos anagramas tiene la palabra PAPAYA?', 'كم جناسًا لكلمة PAPAYA؟', 'How many anagrams does the word PAPAYA have?'),
        expected: n(60),
        hint: say('P bi aldiz eta A hiru aldiz.', 'La P está dos veces y la A tres.', 'P مرتين وA ثلاث مرات.', 'The P appears twice and the A three times.'),
        explanation: same('$\\frac{6!}{2!\\cdot 3!}=\\frac{720}{12}=60$')
    },
    {
        id: 109, stage: 'permutations', points: 30, context: 'master',
        prompt: say('4 mutil eta 3 neska ilaran jarri behar dira, mutilak eta neskak tartekatuta. Zenbat eratara?', 'Hay que colocar en fila a 4 chicos y 3 chicas, alternando chicos y chicas. ¿De cuántas formas?', 'يجب ترتيب 4 أولاد و3 بنات في صف بالتناوب. بكم طريقة؟', '4 boys and 3 girls have to line up, alternating boys and girls. In how many ways?'),
        expected: n(144),
        hint: say('Eskema bakarra: mutila, neska, mutila… Gero ordenatu taldeak.', 'Solo hay un esquema: chico, chica, chico… Después ordena cada grupo.', 'نمط واحد فقط: ولد، بنت، ولد… ثم رتّب كل مجموعة.', 'There is only one pattern: boy, girl, boy… Then arrange each group.'),
        explanation: same('$4!\\cdot 3!=24\\cdot 6=144$')
    },

    /* ---------- Combinations ---------- */
    {
        id: 110, stage: 'combinations', points: 10, context: 'starter',
        prompt: say('Festa batean 12 lagunek elkarri eskua ematen diote, bikote bakoitzak behin. Zenbat eskuemate?', 'En una fiesta, 12 personas se dan la mano, cada pareja una vez. ¿Cuántos apretones hay?', 'في حفلة يتصافح 12 شخصًا، كل زوج مرة. كم مصافحة؟', 'At a party, 12 people shake hands, each pair once. How many handshakes are there?'),
        expected: n(66),
        hint: say('Bikoteak, ordenarik gabe.', 'Parejas, sin orden.', 'أزواج دون ترتيب.', 'Pairs, with no order.'),
        explanation: same('$\\text{C}_{12,2}=\\frac{12\\cdot 11}{2}=66$')
    },
    {
        id: 111, stage: 'combinations', points: 20, context: 'advanced',
        prompt: say('Loteria batean 49 zenbakitatik 6 aukeratzen dira. Zenbat konbinazio desberdin daude?', 'En una lotería se eligen 6 números de 49. ¿Cuántas combinaciones distintas hay?', 'في يانصيب نختار 6 أعداد من 49. كم توفيقًا مختلفًا؟', 'In a lottery, 6 numbers are chosen from 49. How many different combinations are there?'),
        expected: n(13983816),
        hint: say('Ordenak ez du axola: $\\text{C}_{49,6}$.', 'No importa el orden: $\\text{C}_{49,6}$.', 'الترتيب لا يهم: $\\text{C}_{49,6}$.', 'Order does not matter: $\\text{C}_{49,6}$.'),
        explanation: same('$\\frac{49\\cdot 48\\cdot 47\\cdot 46\\cdot 45\\cdot 44}{6\\cdot 5\\cdot 4\\cdot 3\\cdot 2\\cdot 1}=13\\,983\\,816$')
    },
    {
        id: 112, stage: 'combinations', points: 30, context: 'master',
        prompt: say('Pizza batek 6 osagai posible ditu. Zenbat pizza desberdin egin daitezke gutxienez osagai batekin?', 'Una pizza tiene 6 ingredientes posibles. ¿Cuántas pizzas distintas se pueden hacer con al menos un ingrediente?', 'للبيتزا 6 مكوّنات ممكنة. كم بيتزا مختلفة يمكن صنعها بمكوّن واحد على الأقل؟', 'A pizza can have 6 possible toppings. How many different pizzas can be made with at least one topping?'),
        expected: n(63),
        hint: say('Osagai bakoitza sartu ala ez: $2^{6}$, ken osagairik gabekoa.', 'Cada ingrediente entra o no: $2^{6}$, menos la que no tiene ninguno.', 'كل مكوّن يدخل أو لا: $2^{6}$ ناقص التي بلا مكوّنات.', 'Each topping is either in or out: $2^{6}$, minus the pizza with no toppings.'),
        explanation: same('$2^{6}-1=63$')
    },

    /* ---------- Problems ---------- */
    {
        id: 113, stage: 'problems', points: 10, context: 'starter',
        prompt: say('Zenbat diagonal ditu hexagono batek?', '¿Cuántas diagonales tiene un hexágono?', 'كم قطرًا للمسدس؟', 'How many diagonals does a hexagon have?'),
        expected: n(9),
        hint: same('$\\frac{n(n-3)}{2}$'),
        explanation: same('$\\frac{6\\cdot 3}{2}=9$')
    },
    {
        id: 114, stage: 'problems', points: 20, context: 'advanced',
        prompt: say('Sare batean, A-tik B-ra 6 urrats eskuinera eta 4 gora daude. Zenbat bide?', 'En una cuadrícula, de A a B hay 6 pasos a la derecha y 4 hacia arriba. ¿Cuántos caminos?', 'في شبكة، من A إلى B هناك 6 خطوات يمينًا و4 أعلى. كم مسارًا؟', 'On a grid, from A to B there are 6 steps to the right and 4 steps up. How many paths are there?'),
        expected: n(210),
        hint: say('10 urratsetatik aukeratu zein 4 diren gora.', 'De los 10 pasos, elige cuáles 4 son hacia arriba.', 'من الخطوات العشر اختر أي أربع إلى الأعلى.', 'Of the 10 steps, choose which 4 are up.'),
        explanation: same('$\\text{C}_{10,4}=\\frac{10\\cdot 9\\cdot 8\\cdot 7}{4\\cdot 3\\cdot 2\\cdot 1}=210$')
    },
    {
        id: 115, stage: 'problems', points: 30, context: 'master',
        prompt: say('6 mutil eta 5 neska daude. 4 laguneko batzorde batean gutxienez bi neska egon behar dira. Zenbat batzorde?', 'Hay 6 chicos y 5 chicas. En una comisión de 4 tiene que haber al menos dos chicas. ¿Cuántas comisiones hay?', 'هناك 6 أولاد و5 بنات. في لجنة من 4 يجب أن تكون بنتان على الأقل. كم لجنة؟', 'There are 6 boys and 5 girls. A committee of 4 must have at least two girls. How many committees are there?'),
        expected: n(215),
        hint: say('Hiru kasu: 2, 3 edo 4 neska. Zenbatu bakoitza eta batu.', 'Tres casos: 2, 3 o 4 chicas. Cuenta cada uno y suma.', 'ثلاث حالات: 2 أو 3 أو 4 بنات. عُدّ كلًا منها واجمع.', 'Three cases: 2, 3 or 4 girls. Count each one and add.'),
        explanation: same('$10\\cdot 15+10\\cdot 6+5=150+60+5=215$')
    }
]

export const combinatoricsAkExerciseBank: ExerciseSection[] = [
    {
        id: 'counting',
        title: say('Zenbatzen', 'Contar', 'العدّ', 'Counting'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Bi txanpon botatzen dira. Egin zuhaitza eta zenbatu emaitzak.', 'Se lanzan dos monedas. Haz el árbol y cuenta los resultados.', 'تُرمى قطعتا نقود. ارسم الشجرة وعُدّ النتائج.', 'Two coins are tossed. Draw the tree and count the outcomes.'), solution: say('Aurpegia-aurpegia, aurpegia-gurutzea, gurutzea-aurpegia, gurutzea-gurutzea: $2\\cdot 2=4$.', 'Cara-cara, cara-cruz, cruz-cara, cruz-cruz: $2\\cdot 2=4$.', 'وجه-وجه، وجه-ظهر، ظهر-وجه، ظهر-ظهر: $2\\cdot 2=4$.', 'Heads-heads, heads-tails, tails-heads, tails-tails: $2\\cdot 2=4$.'), answer: { expected: n(4) } },
            { id: 2, difficulty: 'easy', question: say('Taberna batean 5 ogitarteko eta 8 edari daude. Zenbat menu?', 'En un bar hay 5 bocadillos y 8 bebidas. ¿Cuántos menús?', 'في مقهى 5 شطائر و8 مشروبات. كم وجبة؟', 'A bar has 5 sandwiches and 8 drinks. How many menus can be made?'), solution: same('$5\\cdot 8=40$'), answer: { expected: n(40) } },
            { id: 3, difficulty: 'easy', question: say('Kalkulatu $6!$.', 'Calcula $6!$.', 'احسب $6!$.', 'Calculate $6!$.'), solution: same('$6\\cdot 5\\cdot 4\\cdot 3\\cdot 2\\cdot 1=720$'), answer: { expected: n(720) } },
            { id: 4, difficulty: 'medium', question: say('Hiru dado (gorria, berdea, urdina) eta txanpon bat botatzen dira. Zenbat emaitza?', 'Se lanzan tres dados (rojo, verde, azul) y una moneda. ¿Cuántos resultados?', 'تُرمى ثلاثة نرود (أحمر، أخضر، أزرق) وقطعة نقود. كم نتيجة؟', 'Three dice (red, green and blue) are rolled and a coin is tossed. How many outcomes are there?'), solution: same('$6\\cdot 6\\cdot 6\\cdot 2=432$'), answer: { expected: n(432) } },
            { id: 5, difficulty: 'medium', question: say('Kalkulatu $\\frac{10!}{8!}$.', 'Calcula $\\frac{10!}{8!}$.', 'احسب $\\frac{10!}{8!}$.', 'Calculate $\\frac{10!}{8!}$.'), solution: same('$10\\cdot 9=90$'), answer: { expected: n(90) } },
            { id: 6, difficulty: 'medium', question: say('Ebatzi $\\frac{(n+1)!}{n!}=12$.', 'Resuelve $\\frac{(n+1)!}{n!}=12$.', 'حلّ $\\frac{(n+1)!}{n!}=12$.', 'Solve $\\frac{(n+1)!}{n!}=12$.'), solution: say('Zatiketa $n+1$ da: $n+1=12$, beraz $n=11$.', 'El cociente es $n+1$: $n+1=12$, luego $n=11$.', 'الناتج هو $n+1$: $n+1=12$، إذن $n=11$.', 'The quotient is $n+1$: $n+1=12$, so $n=11$.'), answer: { expected: n(11) } },
            { id: 7, difficulty: 'medium', question: say('8 europarrek eta 11 japoniarrek eskua ematen dute egunero bi aldiz (iristean eta joatean), 3 egunez. Zenbat eskuemate guztira?', '8 europeos y 11 japoneses se dan la mano dos veces al día (al llegar y al irse) durante 3 días. ¿Cuántos apretones en total?', 'يتصافح 8 أوروبيين و11 يابانيًا مرتين يوميًا (عند الوصول والمغادرة) مدة 3 أيام. كم مصافحة إجمالًا؟', '8 Europeans and 11 Japanese people shake hands twice a day (on arriving and on leaving) for 3 days. How many handshakes are there in total?'), solution: same('$88\\cdot 2\\cdot 3=528$'), answer: { expected: n(528) } },
            { id: 8, difficulty: 'hard', question: say('Bi lagunek partida bat jokatzen dute hiru partidatik onenera (bi irabazten dituenak irabazten du). Zenbat garapen posible daude?', 'Dos amigos juegan al mejor de tres partidas (gana quien gane dos). ¿Cuántos desarrollos posibles hay?', 'يلعب صديقان أفضل ثلاث مباريات (يفوز من يربح اثنتين). كم مسارًا ممكنًا؟', 'Two friends play a best-of-three match (whoever wins two games wins). How many possible sequences of games are there?'), solution: say('AA, ABA, ABB, BB, BAB, BAA: 6 garapen.', 'AA, ABA, ABB, BB, BAB, BAA: 6 desarrollos.', 'AA، ABA، ABB، BB، BAB، BAA: 6 مسارات.', 'AA, ABA, ABB, BB, BAB, BAA: 6 sequences.'), answer: { expected: n(6) } },
            { id: 9, difficulty: 'hard', question: say('Kalkulatu $\\frac{8!}{6!\\cdot 2!}$.', 'Calcula $\\frac{8!}{6!\\cdot 2!}$.', 'احسب $\\frac{8!}{6!\\cdot 2!}$.', 'Calculate $\\frac{8!}{6!\\cdot 2!}$.'), solution: same('$\\frac{8\\cdot 7}{2}=28$'), answer: { expected: n(28) } },
            { id: 10, difficulty: 'hard', question: say('Zenbat zero ditu $10!$ zenbakiak amaieran?', '¿Cuántos ceros tiene $10!$ al final?', 'كم صفرًا في نهاية $10!$؟', 'How many zeros are at the end of $10!$?'), solution: say('$10!=3\\,628\\,800$: bi zero, $2\\cdot 5$ eta $10$ faktoreetatik datozenak.', '$10!=3\\,628\\,800$: dos ceros, que vienen de los factores $2\\cdot 5$ y $10$.', '$10!=3\\,628\\,800$: صفران يأتيان من العوامل $2\\cdot 5$ و$10$.', '$10!=3\\,628\\,800$: two zeros, which come from the factors $2\\cdot 5$ and $10$.'), answer: { expected: n(2) } }
        ]
    },
    {
        id: 'variations',
        title: say('Aldakuntzak', 'Variaciones', 'التراتيب', 'Arrangements'),
        items: [
            { id: 11, difficulty: 'easy', question: say('Dado bat 4 aldiz botatzen da, eta ordenak axola du. Zenbat emaitza?', 'Se lanza un dado 4 veces, e importa el orden. ¿Cuántos resultados?', 'يُرمى نرد 4 مرات والترتيب مهم. كم نتيجة؟', 'A die is rolled 4 times, and order matters. How many outcomes are there?'), solution: same('$6^{4}=1\\,296$'), answer: { expected: n(1296) } },
            { id: 12, difficulty: 'easy', question: say('10 liburutatik «Urrezko luma» eta «Zilarrezko luma» sariak banatu behar dira. Zenbat eratara?', 'Entre 10 libros hay que repartir los premios «Pluma de Oro» y «Pluma de Plata». ¿De cuántas formas?', 'يجب توزيع جائزتي «الريشة الذهبية» و«الريشة الفضية» على 10 كتب. بكم طريقة؟', 'The prizes “Golden Pen” and “Silver Pen” have to be given out among 10 books. In how many ways?'), solution: same('$\\text{V}_{10,2}=10\\cdot 9=90$'), answer: { expected: n(90) } },
            { id: 13, difficulty: 'easy', question: say('7 kolorerekin hiru marrako banderak egiten dira, eta kolore bat errepika daiteke. Zenbat bandera?', 'Con 7 colores se hacen banderas de tres franjas, y se puede repetir color. ¿Cuántas banderas?', 'بسبعة ألوان نصنع أعلامًا من ثلاثة أشرطة، ويجوز تكرار اللون. كم علمًا؟', 'With 7 colours, flags with three stripes are made, and a colour can be repeated. How many flags are there?'), solution: same('$7^{3}=343$'), answer: { expected: n(343) } },
            { id: 14, difficulty: 'medium', question: say('Aurreko banderak, kolorerik errepikatu gabe.', 'Las banderas anteriores, sin repetir color.', 'الأعلام السابقة دون تكرار اللون.', 'The same flags as before, but without repeating a colour.'), solution: same('$\\text{V}_{7,3}=7\\cdot 6\\cdot 5=210$'), answer: { expected: n(210) } },
            { id: 15, difficulty: 'medium', question: say('Kiniela batean 14 partida daude, eta bakoitzean 1, X edo 2 idazten da. Zenbat kiniela desberdin?', 'En una quiniela hay 14 partidos, y en cada uno se escribe 1, X o 2. ¿Cuántas quinielas distintas hay?', 'في ورقة مراهنة 14 مباراة، ونكتب في كل منها 1 أو X أو 2. كم ورقة مختلفة؟', 'A football pools coupon has 14 matches, and for each one you write 1, X or 2. How many different coupons are there?'), solution: same('$3^{14}=4\\,782\\,969$'), answer: { expected: n(4782969) } },
            { id: 16, difficulty: 'medium', question: say('1etik 6rako zifrekin, zenbat lau zifra desberdineko zenbaki?', 'Con las cifras del 1 al 6, ¿cuántos números de cuatro cifras distintas?', 'بالأرقام من 1 إلى 6، كم عددًا من أربعة أرقام مختلفة؟', 'Using the digits from 1 to 6, how many four-digit numbers have all different digits?'), solution: same('$\\text{V}_{6,4}=6\\cdot 5\\cdot 4\\cdot 3=360$'), answer: { expected: n(360) } },
            { id: 17, difficulty: 'medium', question: say('Hiru zonako diana bat 6 kolorerekin margotu nahi da, zona bakoitza kolore desberdin batez. Zenbat eratara?', 'Se quiere pintar una diana de tres zonas con 6 colores, cada zona de un color distinto. ¿De cuántas formas?', 'نريد طلاء هدف من ثلاث مناطق بستة ألوان، كل منطقة بلون مختلف. بكم طريقة؟', 'A target with three zones is to be painted with 6 colours, each zone a different colour. In how many ways can this be done?'), solution: same('$6\\cdot 5\\cdot 4=120$'), answer: { expected: n(120) } },
            { id: 18, difficulty: 'hard', question: say('Zenbat lau zifrako zenbakik dute gutxienez zifra errepikatu bat?', '¿Cuántos números de cuatro cifras tienen al menos una cifra repetida?', 'كم عددًا من أربعة أرقام فيه رقم مكرر واحد على الأقل؟', 'How many four-digit numbers have at least one repeated digit?'), solution: say('Guztiak $9\\cdot 10^{3}=9\\,000$; errepikatu gabe $9\\cdot 9\\cdot 8\\cdot 7=4\\,536$. Kendu: $9\\,000-4\\,536=4\\,464$.', 'Todos son $9\\cdot 10^{3}=9\\,000$; sin repetir, $9\\cdot 9\\cdot 8\\cdot 7=4\\,536$. Resta: $9\\,000-4\\,536=4\\,464$.', 'الكل $9\\cdot 10^{3}=9\\,000$؛ ودون تكرار $9\\cdot 9\\cdot 8\\cdot 7=4\\,536$. اطرح: $9\\,000-4\\,536=4\\,464$.', 'In total there are $9\\cdot 10^{3}=9\\,000$; without repetition there are $9\\cdot 9\\cdot 8\\cdot 7=4\\,536$. Subtract: $9\\,000-4\\,536=4\\,464$.'), answer: { expected: n(4464) } },
            { id: 19, difficulty: 'hard', question: say('Matrikula batek 4 zifra eta 20 kontsonanteetatik 3 letra ditu (errepika daitezke). Zenbat matrikula?', 'Una matrícula tiene 4 cifras y 3 letras de entre 20 consonantes (pueden repetirse). ¿Cuántas matrículas hay?', 'لوحة سيارة فيها 4 أرقام و3 أحرف من 20 حرفًا ساكنًا (يجوز التكرار). كم لوحة؟', 'A number plate has 4 digits and 3 letters chosen from 20 consonants (they can be repeated). How many number plates are there?'), solution: same('$10^{4}\\cdot 20^{3}=80\\,000\\,000$'), answer: { expected: n(80000000) } },
            { id: 20, difficulty: 'hard', question: say('$\\text{V}_{n,2}=56$ bada, zenbat da $n$?', 'Si $\\text{V}_{n,2}=56$, ¿cuánto vale $n$?', 'إذا كان $\\text{V}_{n,2}=56$، فكم قيمة $n$؟', 'If $\\text{V}_{n,2}=56$, what is $n$?'), solution: say('$n(n-1)=56=8\\cdot 7$, beraz $n=8$.', '$n(n-1)=56=8\\cdot 7$, luego $n=8$.', '$n(n-1)=56=8\\cdot 7$، إذن $n=8$.', '$n(n-1)=56=8\\cdot 7$, so $n=8$.'), answer: { expected: n(8) } }
        ]
    },
    {
        id: 'permutations',
        title: say('Permutazioak', 'Permutaciones', 'التباديل', 'Permutations'),
        items: [
            { id: 21, difficulty: 'easy', question: say('Zenbat eratara ordena daitezke 4 argazki horma batean, ilaran?', '¿De cuántas formas se pueden ordenar 4 fotos en fila en una pared?', 'بكم طريقة يمكن ترتيب 4 صور في صف على جدار؟', 'In how many ways can 4 photos be arranged in a row on a wall?'), solution: same('$4!=24$'), answer: { expected: n(24) } },
            { id: 22, difficulty: 'easy', question: say('Zenbat anagrama ditu AMOR hitzak?', '¿Cuántos anagramas tiene la palabra AMOR?', 'كم جناسًا لكلمة AMOR؟', 'How many anagrams does the word AMOR have?'), solution: same('$4!=24$'), answer: { expected: n(24) } },
            { id: 23, difficulty: 'easy', question: say('8 hautagaiko zerrenda bat ordenatu behar da. Zenbat zerrenda posible?', 'Hay que ordenar una lista de 8 candidatos. ¿Cuántas listas posibles?', 'يجب ترتيب قائمة من 8 مرشحين. كم قائمة ممكنة؟', 'A list of 8 candidates has to be put in order. How many possible lists are there?'), solution: same('$\\text{P}_8=8!=40\\,320$'), answer: { expected: n(40320) } },
            { id: 24, difficulty: 'medium', question: say('Zenbat anagrama ditu PERRO hitzak?', '¿Cuántos anagramas tiene la palabra PERRO?', 'كم جناسًا لكلمة PERRO؟', 'How many anagrams does the word PERRO have?'), solution: same('$\\frac{5!}{2!}=\\frac{120}{2}=60$'), answer: { expected: n(60) } },
            { id: 25, difficulty: 'medium', question: say('6 lagun mahai biribil batean esertzen dira (biraketak berdinak). Zenbat eratara?', '6 amigos se sientan en una mesa redonda (los giros son iguales). ¿De cuántas formas?', 'يجلس 6 أصدقاء حول طاولة مستديرة (الدورانات متماثلة). بكم طريقة؟', '6 friends sit at a round table (rotations count as the same). In how many ways?'), solution: same('$(6-1)!=5!=120$'), answer: { expected: n(120) } },
            { id: 26, difficulty: 'medium', question: say('5 liburu apal batean ordenatzen dira, baina hiztegiak lehena izan behar du. Zenbat eratara?', 'Se ordenan 5 libros en una estantería, pero el diccionario tiene que ir el primero. ¿De cuántas formas?', 'تُرتَّب 5 كتب على رف، لكن يجب أن يكون القاموس أولًا. بكم طريقة؟', '5 books are arranged on a shelf, but the dictionary has to go first. In how many ways?'), solution: same('$4!=24$'), answer: { expected: n(24) } },
            { id: 27, difficulty: 'medium', question: say('Txanpon bat 5 aldiz botatzen da. Zenbat ordenatan atera daitezke 2 aurpegi eta 3 gurutze?', 'Se lanza una moneda 5 veces. ¿En cuántos órdenes pueden salir 2 caras y 3 cruces?', 'تُرمى قطعة نقود 5 مرات. بكم ترتيب يظهر وجهان و3 ظهور؟', 'A coin is tossed 5 times. In how many orders can 2 heads and 3 tails come up?'), solution: same('$\\frac{5!}{2!\\cdot 3!}=\\frac{120}{12}=10$'), answer: { expected: n(10) } },
            { id: 28, difficulty: 'hard', question: say('6 lagun ilaran jartzen dira, baina bi ez dute elkarren ondoan egon nahi. Zenbat eratara?', '6 amigos se ponen en fila, pero dos no quieren estar juntos. ¿De cuántas formas?', 'يقف 6 أصدقاء في صف، لكن اثنين لا يريدان التجاور. بكم طريقة؟', '6 friends line up, but two of them do not want to stand together. In how many ways?'), solution: say('Guztiak ken elkarrekin: $720-2\\cdot 120=480$.', 'Todos menos juntos: $720-2\\cdot 120=480$.', 'الكل ناقص المتجاورين: $720-2\\cdot 120=480$.', 'All of them, minus the ones where they stand together: $720-2\\cdot 120=480$.'), answer: { expected: n(480) } },
            { id: 29, difficulty: 'hard', question: say('5555333 zifrekin egindako 35 zenbakiak batzen dira. Zenbat da batura?', 'Se suman los 35 números formados con las cifras 5555333. ¿Cuánto vale la suma?', 'نجمع الأعداد الـ35 المكوّنة بالأرقام 5555333. كم المجموع؟', 'The 35 numbers formed with the digits 5555333 are added together. What is the sum?'), solution: say('Zutabe bakoitzean 20 bost eta 15 hiru: $20\\cdot 5+15\\cdot 3=145$. Beraz $145\\cdot 1\\,111\\,111=161\\,111\\,095$.', 'En cada columna hay 20 cincos y 15 treses: $20\\cdot 5+15\\cdot 3=145$. Así, $145\\cdot 1\\,111\\,111=161\\,111\\,095$.', 'في كل عمود 20 خمسة و15 ثلاثة: $20\\cdot 5+15\\cdot 3=145$. إذن $145\\cdot 1\\,111\\,111=161\\,111\\,095$.', 'In each column there are 20 fives and 15 threes: $20\\cdot 5+15\\cdot 3=145$. So $145\\cdot 1\\,111\\,111=161\\,111\\,095$.'), answer: { expected: n(161111095) } },
            { id: 30, difficulty: 'hard', question: say('Zenbat anagrama ditu MATEMATICA hitzak?', '¿Cuántos anagramas tiene la palabra MATEMATICA?', 'كم جناسًا لكلمة MATEMATICA؟', 'How many anagrams does the word MATEMATICA have?'), solution: say('M bi aldiz, A hiru aldiz eta T bi aldiz: $\\frac{10!}{2!\\cdot 3!\\cdot 2!}=\\frac{3\\,628\\,800}{24}=151\\,200$.', 'M dos veces, A tres veces y T dos veces: $\\frac{10!}{2!\\cdot 3!\\cdot 2!}=\\frac{3\\,628\\,800}{24}=151\\,200$.', 'M مرتين وA ثلاث مرات وT مرتين: $\\frac{10!}{2!\\cdot 3!\\cdot 2!}=\\frac{3\\,628\\,800}{24}=151\\,200$.', 'M twice, A three times and T twice: $\\frac{10!}{2!\\cdot 3!\\cdot 2!}=\\frac{3\\,628\\,800}{24}=151\\,200$.'), answer: { expected: n(151200) } }
        ]
    },
    {
        id: 'combinations',
        title: say('Konbinazioak', 'Combinaciones', 'التوافيق', 'Combinations'),
        items: [
            { id: 31, difficulty: 'easy', question: say('Planoko 6 puntutatik, ez dago hiru lerrokaturik. Zenbat zuzen igarotzen dira haietako bitatik?', 'De 6 puntos del plano no hay tres alineados. ¿Cuántas rectas pasan por dos de ellos?', 'من 6 نقاط في المستوى لا تقع ثلاث على استقامة. كم مستقيمًا يمر بنقطتين منها؟', 'Of 6 points on a plane, no three are in a straight line. How many straight lines pass through two of them?'), solution: same('$\\text{C}_{6,2}=\\frac{6\\cdot 5}{2}=15$'), answer: { expected: n(15) } },
            { id: 32, difficulty: 'easy', question: say('Kalkulatu $\\binom{7}{1}$, $\\binom{7}{0}$ eta $\\binom{7}{7}$.', 'Calcula $\\binom{7}{1}$, $\\binom{7}{0}$ y $\\binom{7}{7}$.', 'احسب $\\binom{7}{1}$ و$\\binom{7}{0}$ و$\\binom{7}{7}$.', 'Calculate $\\binom{7}{1}$, $\\binom{7}{0}$ and $\\binom{7}{7}$.'), solution: same('$\\binom{7}{1}=7\\qquad \\binom{7}{0}=\\binom{7}{7}=1$') },
            { id: 33, difficulty: 'easy', question: say('Idatzi Tartagliaren triangeluaren 5. lerroa.', 'Escribe la fila 5 del triángulo de Tartaglia.', 'اكتب الصف 5 من مثلث تارتاليا.', 'Write row 5 of Tartaglia\'s triangle.'), solution: same('$1,\\ 5,\\ 10,\\ 10,\\ 5,\\ 1$') },
            { id: 34, difficulty: 'medium', question: say('8 kolorerekin, zenbat lau koloreko nahasketa?', 'Con 8 colores, ¿cuántas mezclas de cuatro colores?', 'بثمانية ألوان، كم خلطة من أربعة ألوان؟', 'With 8 colours, how many mixtures of four colours can be made?'), solution: same('$\\text{C}_{8,4}=\\frac{8\\cdot 7\\cdot 6\\cdot 5}{4\\cdot 3\\cdot 2\\cdot 1}=70$'), answer: { expected: n(70) } },
            { id: 35, difficulty: 'medium', question: say('Kalkulatu $\\binom{11}{6}+\\binom{11}{7}$.', 'Calcula $\\binom{11}{6}+\\binom{11}{7}$.', 'احسب $\\binom{11}{6}+\\binom{11}{7}$.', 'Calculate $\\binom{11}{6}+\\binom{11}{7}$.'), solution: say('Triangeluaren erregelaz, $\\binom{12}{7}=\\binom{12}{5}=792$.', 'Por la regla del triángulo, $\\binom{12}{7}=\\binom{12}{5}=792$.', 'بقاعدة المثلث $\\binom{12}{7}=\\binom{12}{5}=792$.', 'By the triangle rule, $\\binom{12}{7}=\\binom{12}{5}=792$.'), answer: { expected: n(792) } },
            { id: 36, difficulty: 'medium', question: say('Izozki-denda batean 6 zapore daude. Zenbat izozki bi zapore desberdinekin?', 'En una heladería hay 6 sabores. ¿Cuántos helados de dos sabores distintos?', 'في محل مثلجات 6 نكهات. كم مثلّجة بنكهتين مختلفتين؟', 'An ice cream parlour has 6 flavours. How many ice creams with two different flavours are there?'), solution: same('$\\text{C}_{6,2}=15$'), answer: { expected: n(15) } },
            { id: 37, difficulty: 'medium', question: say('7 lagunetatik 3 joango dira bidaia batera. Zenbat talde posible?', 'De 7 amigos, 3 irán de viaje. ¿Cuántos grupos posibles?', 'من 7 أصدقاء سيسافر 3. كم مجموعة ممكنة؟', 'Of 7 friends, 3 will go on a trip. How many possible groups are there?'), solution: same('$\\text{C}_{7,3}=\\frac{7\\cdot 6\\cdot 5}{6}=35$'), answer: { expected: n(35) } },
            { id: 38, difficulty: 'hard', question: say('$\\binom{n}{2}=45$ bada, zenbat da $n$?', 'Si $\\binom{n}{2}=45$, ¿cuánto vale $n$?', 'إذا كان $\\binom{n}{2}=45$، فكم قيمة $n$؟', 'If $\\binom{n}{2}=45$, what is $n$?'), solution: say('$n(n-1)=90=10\\cdot 9$, beraz $n=10$.', '$n(n-1)=90=10\\cdot 9$, luego $n=10$.', '$n(n-1)=90=10\\cdot 9$، إذن $n=10$.', '$n(n-1)=90=10\\cdot 9$, so $n=10$.'), answer: { expected: n(10) } },
            { id: 39, difficulty: 'hard', question: say('Zenbat azpimultzo ditu 10 elementuko multzo batek (hutsa eta osoa barne)?', '¿Cuántos subconjuntos tiene un conjunto de 10 elementos (incluidos el vacío y el total)?', 'كم مجموعة جزئية لمجموعة من 10 عناصر (بما فيها الخالية والكلية)؟', 'How many subsets does a set of 10 elements have (including the empty set and the whole set)?'), solution: say('10. lerroaren batura: $2^{10}=1\\,024$.', 'La suma de la fila 10: $2^{10}=1\\,024$.', 'مجموع الصف 10: $2^{10}=1\\,024$.', 'The sum of row 10: $2^{10}=1\\,024$.'), answer: { expected: n(1024) } },
            { id: 40, difficulty: 'hard', question: say('5 osagai daude. Zenbat pizza egin daitezke gutxienez osagai batekin?', 'Hay 5 ingredientes. ¿Cuántas pizzas se pueden hacer con al menos un ingrediente?', 'هناك 5 مكوّنات. كم بيتزا يمكن صنعها بمكوّن واحد على الأقل؟', 'There are 5 toppings. How many pizzas can be made with at least one topping?'), solution: same('$2^{5}-1=31$'), answer: { expected: n(31) } }
        ]
    },
    {
        id: 'problems',
        title: say('Problemak', 'Problemas', 'مسائل', 'Problems'),
        items: [
            { id: 41, difficulty: 'easy', question: say('Zein eredu? a) 5 liburu ordenatu. b) 5 liburutatik 2 aukeratu oparitzeko. c) 3 letrako pasahitzak A, B, C letrekin, errepikatuz.', '¿Qué modelo? a) Ordenar 5 libros. b) Elegir 2 de 5 libros para regalar. c) Contraseñas de 3 letras con A, B, C, repitiendo.', 'أي نموذج؟ أ) ترتيب 5 كتب. ب) اختيار كتابين من 5 للإهداء. ج) كلمات سر من 3 أحرف بـ A وB وC مع التكرار.', 'Which model? a) Arranging 5 books. b) Choosing 2 of 5 books to give away. c) Passwords of 3 letters using A, B and C, with repetition.'), solution: say('a) $\\text{P}_5=120$. b) $\\text{C}_{5,2}=10$. c) $\\text{VR}_{3,3}=27$.', 'a) $\\text{P}_5=120$. b) $\\text{C}_{5,2}=10$. c) $\\text{VR}_{3,3}=27$.', 'أ) $\\text{P}_5=120$. ب) $\\text{C}_{5,2}=10$. ج) $\\text{VR}_{3,3}=27$.', 'a) $\\text{P}_5=120$. b) $\\text{C}_{5,2}=10$. c) $\\text{VR}_{3,3}=27$.') },
            { id: 42, difficulty: 'easy', question: say('Zenbat diagonal ditu pentagono batek?', '¿Cuántas diagonales tiene un pentágono?', 'كم قطرًا للمخمس؟', 'How many diagonals does a pentagon have?'), solution: same('$\\frac{5\\cdot 2}{2}=5$'), answer: { expected: n(5) } },
            { id: 43, difficulty: 'easy', question: say('Sare batean, A-tik B-ra 2 urrats eskuinera eta 2 gora daude. Zenbat bide?', 'En una cuadrícula, de A a B hay 2 pasos a la derecha y 2 hacia arriba. ¿Cuántos caminos?', 'في شبكة، من A إلى B خطوتان يمينًا وخطوتان أعلى. كم مسارًا؟', 'On a grid, from A to B there are 2 steps to the right and 2 steps up. How many paths are there?'), solution: same('$\\text{C}_{4,2}=\\frac{4\\cdot 3}{2}=6$'), answer: { expected: n(6) } },
            { id: 44, difficulty: 'medium', question: say('Sare batean, A-tik B-ra 6 urrats eskuinera eta 3 gora daude. Zenbat bide?', 'En una cuadrícula, de A a B hay 6 pasos a la derecha y 3 hacia arriba. ¿Cuántos caminos?', 'في شبكة، من A إلى B ست خطوات يمينًا وثلاث أعلى. كم مسارًا؟', 'On a grid, from A to B there are 6 steps to the right and 3 steps up. How many paths are there?'), solution: same('$\\text{C}_{9,3}=\\frac{9\\cdot 8\\cdot 7}{6}=84$'), answer: { expected: n(84) } },
            { id: 45, difficulty: 'medium', question: say('10 lagunetatik lehendakaria, idazkaria eta diruzaina aukeratu behar dira. Zenbat eratara?', 'De 10 personas hay que elegir presidente, secretario y tesorero. ¿De cuántas formas?', 'من 10 أشخاص يجب اختيار رئيس وأمين سر وأمين صندوق. بكم طريقة؟', 'From 10 people, a president, a secretary and a treasurer have to be chosen. In how many ways?'), solution: same('$\\text{V}_{10,3}=10\\cdot 9\\cdot 8=720$'), answer: { expected: n(720) } },
            { id: 46, difficulty: 'medium', question: say('5 oliba motatatik, olio bat mota bakar batekin edo bi motarekin egiten da. Zenbat olio desberdin?', 'Con 5 tipos de aceituna, un aceite se hace con un solo tipo o con dos tipos. ¿Cuántos aceites distintos?', 'بخمسة أنواع من الزيتون يُصنع زيت بنوع واحد أو بنوعين. كم زيتًا مختلفًا؟', 'Using 5 varieties of olive, an oil is made from one variety or from two. How many different oils are there?'), solution: same('$\\text{C}_{5,1}+\\text{C}_{5,2}=5+10=15$'), answer: { expected: n(15) } },
            { id: 47, difficulty: 'medium', question: say('9 jokalaritatik 5eko taldea egin behar da, eta kapitaina beti dago. Zenbat talde?', 'De 9 jugadores hay que formar un equipo de 5, y el capitán siempre está. ¿Cuántos equipos?', 'من 9 لاعبين يجب تكوين فريق من 5، والقائد موجود دائمًا. كم فريقًا؟', 'From 9 players, a team of 5 has to be chosen, and the captain is always in it. How many teams are there?'), solution: say('Kapitaina finkatuta, beste 8etatik 4: $\\text{C}_{8,4}=70$.', 'Con el capitán fijo, 4 de los otros 8: $\\text{C}_{8,4}=70$.', 'مع تثبيت القائد، 4 من الثمانية الآخرين: $\\text{C}_{8,4}=70$.', 'With the captain fixed, 4 of the other 8: $\\text{C}_{8,4}=70$.'), answer: { expected: n(70) } },
            { id: 48, difficulty: 'hard', question: say('4 mutil eta 3 neska daude. 3 laguneko batzorde batean gutxienez mutil bat egon behar da. Zenbat batzorde?', 'Hay 4 chicos y 3 chicas. En una comisión de 3 tiene que haber al menos un chico. ¿Cuántas comisiones?', 'هناك 4 أولاد و3 بنات. في لجنة من 3 يجب أن يكون ولد واحد على الأقل. كم لجنة؟', 'There are 4 boys and 3 girls. A committee of 3 must have at least one boy. How many committees are there?'), solution: say('Guztiak ken neskak bakarrik: $\\text{C}_{7,3}-\\text{C}_{3,3}=35-1=34$.', 'Todas menos las de solo chicas: $\\text{C}_{7,3}-\\text{C}_{3,3}=35-1=34$.', 'الكل ناقص لجان البنات فقط: $\\text{C}_{7,3}-\\text{C}_{3,3}=35-1=34$.', 'All of them except the ones with only girls: $\\text{C}_{7,3}-\\text{C}_{3,3}=35-1=34$.'), answer: { expected: n(34) } },
            { id: 49, difficulty: 'hard', question: say('Planoko 10 puntutatik 4 lerrokatuta daude, eta ez dago beste hiru lerrokaturik. Zenbat zuzen?', 'De 10 puntos del plano, 4 están alineados y no hay otros tres alineados. ¿Cuántas rectas hay?', 'من 10 نقاط في المستوى 4 على استقامة واحدة، ولا ثلاث أخرى على استقامة. كم مستقيمًا؟', 'Of 10 points on a plane, 4 are in a straight line and no other three are in a straight line. How many lines are there?'), solution: say('$\\text{C}_{10,2}=45$, baina lerrokatuen $\\text{C}_{4,2}=6$ zuzenak bakarra dira: $45-6+1=40$.', '$\\text{C}_{10,2}=45$, pero las $\\text{C}_{4,2}=6$ rectas de los alineados son una sola: $45-6+1=40$.', '$\\text{C}_{10,2}=45$، لكن المستقيمات $\\text{C}_{4,2}=6$ للنقاط المستقيمة مستقيم واحد: $45-6+1=40$.', '$\\text{C}_{10,2}=45$, but the $\\text{C}_{4,2}=6$ pairs of aligned points give one single line: $45-6+1=40$.'), answer: { expected: n(40) } },
            { id: 50, difficulty: 'hard', question: say('Cristinak 10 kamiseta eta 3 praka ditu. Astean, egun bakoitzean kamiseta desberdin bat janzten du, eta prakak errepika ditzake. Zenbat era astea janzteko?', 'Cristina tiene 10 camisetas y 3 pantalones. Cada día de la semana se pone una camiseta distinta, y puede repetir pantalón. ¿De cuántas formas puede vestirse la semana?', 'لدى كريستينا 10 قمصان و3 بناطيل. ترتدي كل يوم من الأسبوع قميصًا مختلفًا ويمكنها تكرار البنطال. بكم طريقة ترتدي ملابس الأسبوع؟', 'Cristina has 10 T-shirts and 3 pairs of trousers. Each day of the week she wears a different T-shirt, and she can repeat a pair of trousers. In how many ways can she dress for the week?'), solution: same('$\\text{V}_{10,7}\\cdot 3^{7}=604\\,800\\cdot 2\\,187=1\\,322\\,697\\,600$'), answer: { expected: n(1322697600) } }
        ]
    }
]
