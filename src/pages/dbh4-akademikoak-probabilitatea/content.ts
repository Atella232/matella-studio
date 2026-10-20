import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Probabilitatea · 4. DBH akademikoak — diagnostic, guided practice,
   exercise bank and challenges. Exercises follow Santillana Académicas
   unit 14 (the trick die, the eye colours, Jorge and Luisa shooting, the
   glasses and contact lenses, the sum of the probabilities) and Anaya
   Académicas unit 12 (balls numbered 1 to 10, three coins, the octahedral
   die, cards with and without replacement, the urn that passes a ball on,
   the weather, the tennis sets, Lupe's paths, three people in six seats
   and the median of three dice). Answers are probabilities written as a
   fraction or an exact decimal, counts, or money.
   ========================================================================== */

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })
const n = (value: number) => fraction(value)
const f = (numerator: number, denominator: number) => fraction(numerator, denominator)

export const probabilityAkDiagnostic: DiagnosticQuestion[] = [
    {
        id: 6301,
        prompt: say('Zein da esperimentu aleatorioa?', '¿Cuál de estos experimentos es aleatorio?', 'أيّ هذه التجارب عشوائية؟'),
        options: [say('1 aldeko karratu baten diagonala neurtzea', 'Medir la diagonal de un cuadrado de lado 1', 'قياس قطر مربع طول ضلعه 1'), say('Sorta batetik karta bat ateratzea', 'Sacar una carta de una baraja', 'سحب ورقة من مجموعة أوراق'), say('3 erradioko zirkulu baten azalera kalkulatzea', 'Calcular el área de un círculo de radio 3', 'حساب مساحة دائرة نصف قطرها 3')],
        correctIndex: 1,
        explanation: say('Karta ezin da aurreikusi; beste biek beti emaitza bera ematen dute.', 'La carta no se puede predecir; los otros dos dan siempre el mismo resultado.', 'لا يمكن التنبؤ بالورقة، أما الأخريان فتعطيان النتيجة نفسها دائمًا.'),
        topic: 'experiments'
    },
    {
        id: 6302,
        prompt: say('Dado batean, $A=\\{2,4,6\\}$ eta $B=\\{4,5,6\\}$. Zer da $A\\cap B$?', 'En un dado, $A=\\{2,4,6\\}$ y $B=\\{4,5,6\\}$. ¿Qué es $A\\cap B$?', 'في نرد، $A=\\{2,4,6\\}$ و$B=\\{4,5,6\\}$. ما $A\\cap B$؟'),
        options: [same('$\\{4,6\\}$'), same('$\\{2,4,5,6\\}$'), same('$\\{5\\}$')],
        correctIndex: 0,
        explanation: say('Ebakidura: bietan dauden emaitzak, 4 eta 6.', 'Intersección: los resultados que están en los dos, el 4 y el 6.', 'التقاطع: النتائج الموجودة في الاثنين، 4 و6.'),
        topic: 'operations'
    },
    {
        id: 6303,
        prompt: say('Zein da dado batekin 4 baino zenbaki handiagoa ateratzeko probabilitatea?', '¿Cuál es la probabilidad de sacar un número mayor que 4 con un dado?', 'ما احتمال الحصول على عدد أكبر من 4 برمي نرد؟'),
        options: [same('$\\frac{1}{3}$'), same('$\\frac{2}{3}$'), same('$\\frac{1}{2}$')],
        correctIndex: 0,
        explanation: say('Aldekoak 5 eta 6: $\\frac{2}{6}=\\frac{1}{3}$.', 'Favorables, el 5 y el 6: $\\frac{2}{6}=\\frac{1}{3}$.', 'الملائمة 5 و6: $\\frac{2}{6}=\\frac{1}{3}$.'),
        topic: 'laplace'
    },
    {
        id: 6304,
        prompt: say('$P(A)=0{,}35$ bada, zenbat da $P(\\overline{A})$?', 'Si $P(A)=0{,}35$, ¿cuánto vale $P(\\overline{A})$?', 'إذا كان $P(A)=0{,}35$ فكم يساوي $P(\\overline{A})$؟'),
        options: [same('$0{,}35$'), same('$0{,}65$'), same('$1{,}35$')],
        correctIndex: 1,
        explanation: same('$1-0{,}35=0{,}65$'),
        topic: 'properties'
    },
    {
        id: 6305,
        prompt: say('Txanpon bat eta dado bat botatzen dira. Zein da aurpegia eta 6 ateratzeko probabilitatea?', 'Se lanzan una moneda y un dado. ¿Cuál es la probabilidad de sacar cara y 6?', 'تُرمى قطعة نقود ونرد. ما احتمال الحصول على وجه و6؟'),
        options: [same('$\\frac{1}{8}$'), same('$\\frac{2}{3}$'), same('$\\frac{1}{12}$')],
        correctIndex: 2,
        explanation: say('Independenteak: $\\frac{1}{2}\\cdot\\frac{1}{6}=\\frac{1}{12}$.', 'Independientes: $\\frac{1}{2}\\cdot\\frac{1}{6}=\\frac{1}{12}$.', 'مستقلتان: $\\frac{1}{2}\\cdot\\frac{1}{6}=\\frac{1}{12}$.'),
        topic: 'independent'
    },
    {
        id: 6306,
        prompt: say('Kutxa batean 2 bola gorri eta 2 urdin daude. Bi ateratzen dira, itzuli gabe. Zein da bi gorri ateratzeko probabilitatea?', 'Una urna tiene 2 bolas rojas y 2 azules. Se sacan dos sin devolver. ¿Cuál es la probabilidad de dos rojas?', 'في جرّة كرتان حمراوان وكرتان زرقاوان. تُسحب كرتان دون إرجاع. ما احتمال حمراوين؟'),
        options: [same('$\\frac{1}{4}$'), same('$\\frac{1}{6}$'), same('$\\frac{1}{2}$')],
        correctIndex: 1,
        explanation: say('Bigarrenean bola bat gutxiago: $\\frac{2}{4}\\cdot\\frac{1}{3}=\\frac{1}{6}$.', 'En la segunda hay una bola menos: $\\frac{2}{4}\\cdot\\frac{1}{3}=\\frac{1}{6}$.', 'في الثانية كرة أقل: $\\frac{2}{4}\\cdot\\frac{1}{3}=\\frac{1}{6}$.'),
        topic: 'dependent'
    },
    {
        id: 6307,
        prompt: say('Dado bat botatzen da eta bikoitia ateratzen da. Zein da 6 izateko probabilitatea?', 'Se lanza un dado y sale par. ¿Cuál es la probabilidad de que sea un 6?', 'يُرمى نرد ويظهر عدد زوجي. ما احتمال أن يكون 6؟'),
        options: [same('$\\frac{1}{6}$'), same('$\\frac{1}{2}$'), same('$\\frac{1}{3}$')],
        correctIndex: 2,
        explanation: say('Kasu posibleak 2, 4 eta 6 bakarrik: $\\frac{1}{3}$.', 'Los casos posibles son solo 2, 4 y 6: $\\frac{1}{3}$.', 'الحالات الممكنة 2 و4 و6 فقط: $\\frac{1}{3}$.'),
        topic: 'conditional'
    },
    {
        id: 6308,
        prompt: say('Aurpegia ateratzen bada 4 € irabazten dituzu, eta gurutzea ateratzen bada 4 € galtzen. Jokoa…', 'Si sale cara ganas 4 €, y si sale cruz pierdes 4 €. El juego es…', 'إذا ظهر الوجه تربح 4 €، وإذا ظهر الظهر تخسر 4 €. اللعبة…'),
        options: [say('bidezkoa', 'equitativo', 'عادلة'), say('zure aldekoa', 'favorable a ti', 'لصالحك'), say('zure kontrakoa', 'desfavorable para ti', 'ضدك')],
        correctIndex: 0,
        explanation: say('Itxaropena: $4\\cdot\\frac{1}{2}-4\\cdot\\frac{1}{2}=0$.', 'Esperanza: $4\\cdot\\frac{1}{2}-4\\cdot\\frac{1}{2}=0$.', 'الأمل: $4\\cdot\\frac{1}{2}-4\\cdot\\frac{1}{2}=0$.'),
        topic: 'fair-games'
    }
]

export const probabilityAkPractice: PracticeItem[] = [
    /* ---------- Events ---------- */
    {
        id: 1, stage: 'events',
        prompt: say('Bi dado botatzen dira eta batura idazten da. Zenbat oinarrizko gertaera ditu lagin-espazioak?', 'Se lanzan dos dados y se anota la suma. ¿Cuántos sucesos elementales tiene el espacio muestral?', 'يُرمى نردان ويُسجَّل المجموع. كم حدثًا بسيطًا في فضاء العيّنة؟'),
        expected: n(11),
        hint: say('Batura txikiena 2 da eta handiena 12.', 'La menor suma es 2 y la mayor, 12.', 'أصغر مجموع 2 وأكبره 12.'),
        explanation: say('$E=\\{2,3,\\ldots,12\\}$: $12-2+1=11$.', '$E=\\{2,3,\\ldots,12\\}$: $12-2+1=11$.', '$E=\\{2,3,\\ldots,12\\}$: $12-2+1=11$.')
    },
    {
        id: 2, stage: 'events',
        prompt: say('Txanpon bat eta dado bat botatzen dira. Zenbat emaitza ditu lagin-espazioak?', 'Se lanzan una moneda y un dado. ¿Cuántos resultados tiene el espacio muestral?', 'تُرمى قطعة نقود ونرد. كم نتيجة في فضاء العيّنة؟'),
        expected: n(12),
        hint: say('Txanponaren emaitza bakoitzarekin, daduaren 6.', 'Con cada resultado de la moneda, los 6 del dado.', 'مع كل نتيجة للقطعة، النتائج الست للنرد.'),
        explanation: same('$2\\cdot 6=12$')
    },
    {
        id: 3, stage: 'events',
        prompt: say('Poltsa batean 1etik 20ra zenbakitutako bolak daude. $A$ = «4ren multiploa» eta $B$ = «6ren multiploa». Zenbat elementu ditu $A\\cup B$-k?', 'Una bolsa tiene bolas numeradas del 1 al 20. $A$ = «múltiplo de 4» y $B$ = «múltiplo de 6». ¿Cuántos elementos tiene $A\\cup B$?', 'في كيس كرات مرقّمة من 1 إلى 20. $A$ = «مضاعف للعدد 4» و$B$ = «مضاعف للعدد 6». كم عنصرًا في $A\\cup B$؟'),
        expected: n(7),
        hint: say('Idatzi biak; 12 bietan dago.', 'Escribe los dos; el 12 está en ambos.', 'اكتب الاثنين؛ 12 في كليهما.'),
        explanation: say('$A=\\{4,8,12,16,20\\}$, $B=\\{6,12,18\\}$; 12 behin bakarrik: $5+3-1=7$.', '$A=\\{4,8,12,16,20\\}$, $B=\\{6,12,18\\}$; el 12 una sola vez: $5+3-1=7$.', '$A=\\{4,8,12,16,20\\}$، $B=\\{6,12,18\\}$؛ يُعدّ 12 مرة واحدة: $5+3-1=7$.')
    },
    {
        id: 4, stage: 'events',
        prompt: say('40 kartako sorta espainiar batean, zenbat kartak osatzen dute «ez urrea ez irudia» gertaera?', 'En una baraja española de 40 cartas, ¿cuántas cartas forman el suceso «ni oros ni figura»?', 'في مجموعة ورق إسباني من 40 ورقة، كم ورقة تكوّن الحدث «لا ذهب ولا صورة»؟'),
        expected: n(21),
        hint: say('Kendu 10 urreak eta urrea ez diren irudiak.', 'Quita los 10 oros y las figuras que no son de oros.', 'اطرح أوراق الذهب العشر والصور التي ليست من الذهب.'),
        explanation: say('Urrea ez diren irudiak: $3\\cdot 3=9$. Beraz, $40-10-9=21$.', 'Figuras que no son de oros: $3\\cdot 3=9$. Así, $40-10-9=21$.', 'الصور التي ليست من الذهب: $3\\cdot 3=9$. إذن $40-10-9=21$.')
    },

    /* ---------- Probability ---------- */
    {
        id: 5, stage: 'probability',
        prompt: say('Dado oktaedriko batek 1etik 8ra zenbakitutako aurpegiak ditu. Zein da zenbaki lehen bat ateratzeko probabilitatea?', 'Un dado octaédrico tiene las caras numeradas del 1 al 8. ¿Cuál es la probabilidad de sacar un número primo?', 'لنرد ثماني الأوجه وجوه مرقّمة من 1 إلى 8. ما احتمال الحصول على عدد أولي؟'),
        expected: f(1, 2),
        hint: say('Lehenak: 2, 3, 5 eta 7.', 'Primos: 2, 3, 5 y 7.', 'الأعداد الأولية: 2 و3 و5 و7.'),
        explanation: same('$\\frac{4}{8}=\\frac{1}{2}$')
    },
    {
        id: 6, stage: 'probability',
        prompt: say('Bi dado botatzen dira. Zein da batura 9 izateko probabilitatea?', 'Se lanzan dos dados. ¿Cuál es la probabilidad de que la suma sea 9?', 'يُرمى نردان. ما احتمال أن يكون المجموع 9؟'),
        expected: f(1, 9),
        hint: say('Bilatu 9 batzen duten bikoteak 36 laukien artean.', 'Busca los pares que suman 9 entre las 36 casillas.', 'ابحث عن الأزواج التي مجموعها 9 بين الخانات الـ36.'),
        explanation: say('(3,6), (4,5), (5,4), (6,3): $\\frac{4}{36}=\\frac{1}{9}$.', '(3,6), (4,5), (5,4), (6,3): $\\frac{4}{36}=\\frac{1}{9}$.', 'أربعة أزواج: $\\frac{4}{36}=\\frac{1}{9}$.')
    },
    {
        id: 7, stage: 'probability',
        prompt: say('Txintxeta bat 500 aldiz botatzen da, eta 160 aldiz erortzen da punta gora. Estimatu punta behera erortzeko probabilitatea.', 'Una chincheta se lanza 500 veces y cae con la punta hacia arriba 160 veces. Estima la probabilidad de que caiga con la punta hacia abajo.', 'يُرمى دبوس 500 مرة فيسقط ورأسه إلى الأعلى 160 مرة. قدّر احتمال سقوطه ورأسه إلى الأسفل.'),
        expected: f(68, 100),
        hint: say('Punta behera, punta goraren aurkakoa da.', 'Punta abajo es el contrario de punta arriba.', 'الرأس إلى الأسفل معاكس للرأس إلى الأعلى.'),
        explanation: same('$1-\\frac{160}{500}=1-0{,}32=0{,}68$')
    },
    {
        id: 8, stage: 'probability',
        prompt: say('$P(A)=0{,}5$, $P(B)=0{,}4$ eta $P(A\\cup B)=0{,}7$. Kalkulatu $P(A\\cap B)$.', '$P(A)=0{,}5$, $P(B)=0{,}4$ y $P(A\\cup B)=0{,}7$. Calcula $P(A\\cap B)$.', '$P(A)=0{,}5$ و$P(B)=0{,}4$ و$P(A\\cup B)=0{,}7$. احسب $P(A\\cap B)$.'),
        expected: f(2, 10),
        hint: say('Askatu bilduraren formulatik.', 'Despeja de la fórmula de la unión.', 'اعزل من صيغة الاتحاد.'),
        explanation: same('$P(A\\cap B)=0{,}5+0{,}4-0{,}7=0{,}2$')
    },

    /* ---------- Compound experiments ---------- */
    {
        id: 9, stage: 'compound',
        prompt: say('Hiru txanpon botatzen dira. Zein da hiru aurpegi ateratzeko probabilitatea?', 'Se lanzan tres monedas. ¿Cuál es la probabilidad de sacar tres caras?', 'تُرمى ثلاث قطع نقدية. ما احتمال ثلاثة أوجه؟'),
        expected: f(1, 8),
        hint: say('Independenteak dira: biderkatu.', 'Son independientes: multiplica.', 'مستقلة: اضرب.'),
        explanation: same('$\\frac{1}{2}\\cdot\\frac{1}{2}\\cdot\\frac{1}{2}=\\frac{1}{8}$')
    },
    {
        id: 10, stage: 'compound',
        prompt: say('Dado bat bi aldiz botatzen da. Zein da 6rik ez ateratzeko probabilitatea?', 'Se lanza un dado dos veces. ¿Cuál es la probabilidad de que no salga ningún 6?', 'يُرمى نرد مرتين. ما احتمال ألا يظهر أي 6؟'),
        expected: f(25, 36),
        hint: say('Aldi bakoitzean, «ez 6»: $\\frac{5}{6}$.', 'Cada vez, «no 6»: $\\frac{5}{6}$.', 'في كل مرة «ليس 6»: $\\frac{5}{6}$.'),
        explanation: same('$\\frac{5}{6}\\cdot\\frac{5}{6}=\\frac{25}{36}$')
    },
    {
        id: 11, stage: 'compound',
        prompt: say('40 kartako sorta batetik bi karta ateratzen dira, itzuli gabe. Zein da biak batekoak izateko probabilitatea?', 'Se sacan dos cartas de una baraja de 40 sin devolver. ¿Cuál es la probabilidad de que las dos sean ases?', 'تُسحب ورقتان من مجموعة 40 ورقة دون إرجاع. ما احتمال أن تكون كلتاهما آسًا؟'),
        expected: f(1, 130),
        hint: say('Bigarrenean 3 batekoa geratzen dira 39 kartatan.', 'En la segunda quedan 3 ases en 39 cartas.', 'في الثانية يبقى 3 آسات في 39 ورقة.'),
        explanation: same('$\\frac{4}{40}\\cdot\\frac{3}{39}=\\frac{12}{1560}=\\frac{1}{130}$')
    },
    {
        id: 12, stage: 'compound',
        prompt: say('Kutxa batean 4 bola zuri eta 6 beltz daude. Bi ateratzen dira, itzuli gabe. Zein da kolore desberdinekoak izateko probabilitatea?', 'Una urna tiene 4 bolas blancas y 6 negras. Se sacan dos sin devolver. ¿Cuál es la probabilidad de que sean de distinto color?', 'في جرّة 4 كرات بيضاء و6 سوداء. تُسحب كرتان دون إرجاع. ما احتمال أن تكونا مختلفتي اللون؟'),
        expected: f(8, 15),
        hint: say('Bi bide: zuria-beltza eta beltza-zuria.', 'Dos caminos: blanca-negra y negra-blanca.', 'مساران: بيضاء ثم سوداء، وسوداء ثم بيضاء.'),
        explanation: same('$\\frac{4}{10}\\cdot\\frac{6}{9}+\\frac{6}{10}\\cdot\\frac{4}{9}=\\frac{48}{90}=\\frac{8}{15}$')
    },

    /* ---------- Conditional probability ---------- */
    {
        id: 13, stage: 'conditional',
        prompt: say('30 ikasleko gela batean 18 neska eta 12 mutil daude; betaurrekoak 12 neskak eta 5 mutilek eramaten dituzte. Ikasle bat zoriz aukeratuta, zein da betaurrekoak eramateko probabilitatea?', 'En una clase de 30 hay 18 chicas y 12 chicos; llevan gafas 12 chicas y 5 chicos. Elegido al azar un estudiante, ¿cuál es la probabilidad de que lleve gafas?', 'في صف من 30 طالبًا 18 بنتًا و12 ولدًا؛ تلبس النظارات 12 بنتًا و5 أولاد. ما احتمال أن يلبس طالب مختار عشوائيًا نظارات؟'),
        expected: f(17, 30),
        hint: say('Betaurrekoen guztizkoa zati 30.', 'El total de gafas entre 30.', 'مجموع النظارات على 30.'),
        explanation: same('$\\frac{12+5}{30}=\\frac{17}{30}$')
    },
    {
        id: 14, stage: 'conditional',
        prompt: say('Gela batean 18 neska eta 12 mutil daude; betaurrekoak 12 neskak eta 5 mutilek eramaten dituzte. Neska bat zoriz aukeratuta, zein da betaurrekoak eramateko probabilitatea?', 'En una clase hay 18 chicas y 12 chicos; llevan gafas 12 chicas y 5 chicos. Si se elige al azar una chica, ¿cuál es la probabilidad de que lleve gafas?', 'في صف 18 بنتًا و12 ولدًا؛ تلبس النظارات 12 بنتًا و5 أولاد. إذا اختيرت بنت عشوائيًا، فما احتمال أن تلبس نظارات؟'),
        expected: f(2, 3),
        hint: say('Kasu posibleak 18 neskak bakarrik dira.', 'Los casos posibles son solo las 18 chicas.', 'الحالات الممكنة هي البنات الـ18 فقط.'),
        explanation: same('$\\frac{12}{18}=\\frac{2}{3}$')
    },
    {
        id: 15, stage: 'conditional',
        prompt: say('$P(A)=0{,}5$, $P(B)=0{,}4$ eta $P(A\\cap B)=0{,}1$. Kalkulatu $P(A/B)$.', '$P(A)=0{,}5$, $P(B)=0{,}4$ y $P(A\\cap B)=0{,}1$. Calcula $P(A/B)$.', '$P(A)=0{,}5$ و$P(B)=0{,}4$ و$P(A\\cap B)=0{,}1$. احسب $P(A/B)$.'),
        expected: f(1, 4),
        hint: same('$P(A/B)=\\frac{P(A\\cap B)}{P(B)}$'),
        explanation: same('$\\frac{0{,}1}{0{,}4}=0{,}25$')
    },
    {
        id: 16, stage: 'conditional',
        prompt: say('I kutxa: 3 zuri eta 1 beltz. II kutxa: 1 zuri eta 1 beltz. Txanpon batekin kutxa aukeratzen da eta bola bat ateratzen da. Zein da zuria izateko probabilitatea?', 'Urna I: 3 blancas y 1 negra. Urna II: 1 blanca y 1 negra. Se elige la urna lanzando una moneda y se saca una bola. ¿Cuál es la probabilidad de que sea blanca?', 'الجرّة I: 3 بيضاء وواحدة سوداء. الجرّة II: بيضاء وسوداء. تُختار الجرّة برمي قطعة نقود وتُسحب كرة. ما احتمال أن تكون بيضاء؟'),
        expected: f(5, 8),
        hint: say('Batu zurira daramaten bi bideak.', 'Suma los dos caminos que llevan a blanca.', 'اجمع المسارين المؤديين إلى البيضاء.'),
        explanation: same('$\\frac{1}{2}\\cdot\\frac{3}{4}+\\frac{1}{2}\\cdot\\frac{1}{2}=\\frac{3}{8}+\\frac{2}{8}=\\frac{5}{8}$')
    },

    /* ---------- Counting and deciding ---------- */
    {
        id: 17, stage: 'counting',
        prompt: say('40 kartako sorta batetik 2 karta ateratzen dira batera. Zein da biak kopak izateko probabilitatea?', 'Se sacan 2 cartas a la vez de una baraja de 40. ¿Cuál es la probabilidad de que las dos sean copas?', 'تُسحب ورقتان معًا من مجموعة 40 ورقة. ما احتمال أن تكون كلتاهما من الكؤوس؟'),
        expected: f(3, 52),
        hint: say('10 kopetatik 2 aukeratu, 40 kartatik 2en artean.', 'Elegir 2 de las 10 copas, entre elegir 2 de las 40 cartas.', 'اختيار 2 من 10 كؤوس على اختيار 2 من 40 ورقة.'),
        explanation: same('$\\frac{\\text{C}_{10,2}}{\\text{C}_{40,2}}=\\frac{45}{780}=\\frac{3}{52}$')
    },
    {
        id: 18, stage: 'counting',
        prompt: say('Hiru dado botatzen dira. Zein da hirurek gauza bera markatzeko probabilitatea?', 'Se lanzan tres dados. ¿Cuál es la probabilidad de que los tres marquen lo mismo?', 'تُرمى ثلاثة نرود. ما احتمال أن تُظهر الثلاثة العدد نفسه؟'),
        expected: f(1, 36),
        hint: say('Aldeko 6 kasu: 111, 222, …, 666.', '6 casos favorables: 111, 222, …, 666.', '6 حالات ملائمة: 111، 222، …، 666.'),
        explanation: same('$\\frac{6}{216}=\\frac{1}{36}$')
    },
    {
        id: 19, stage: 'counting',
        prompt: say('Bi dado botatzen dira. Zein da puntuazio handiena 5 izateko probabilitatea?', 'Se lanzan dos dados. ¿Cuál es la probabilidad de que la mayor puntuación sea 5?', 'يُرمى نردان. ما احتمال أن تكون أكبر نتيجة 5؟'),
        expected: f(1, 4),
        hint: say('5 artekoak ken 4 artekoak.', 'Hasta 5 menos hasta 4.', 'حتى 5 ناقص حتى 4.'),
        explanation: same('$\\frac{5^{2}-4^{2}}{36}=\\frac{9}{36}=\\frac{1}{4}$')
    },
    {
        id: 20, stage: 'counting',
        prompt: say('Jokatzeko 1 € ordaintzen duzu eta dado bat botatzen duzu: 6 ateratzen bada, 5 € ematen dizkizute. Zein da partida bakoitzeko irabazi itxaropena?', 'Por jugar pagas 1 € y lanzas un dado: si sale 6, te dan 5 €. ¿Cuál es la ganancia esperada por partida?', 'تدفع 1 € لتلعب وترمي نردًا: إذا ظهر 6 تأخذ 5 €. ما الربح المتوقع في كل جولة؟'),
        expected: f(-1, 6),
        hint: say('6 ateratzean irabazia $5-1=4$; bestela, $-1$.', 'Si sale 6 ganas $5-1=4$; si no, $-1$.', 'إذا ظهر 6 تربح $5-1=4$، وإلا $-1$.'),
        explanation: same('$4\\cdot\\frac{1}{6}-1\\cdot\\frac{5}{6}=-\\frac{1}{6}$')
    }
]

export const probabilityAkChallenges: ChallengeItem[] = [
    /* ---------- Events ---------- */
    {
        id: 101, stage: 'events', points: 10, context: 'starter',
        prompt: say('Bi txanpon eta dado bat botatzen dira. Zenbat emaitza ditu lagin-espazioak?', 'Se lanzan dos monedas y un dado. ¿Cuántos resultados tiene el espacio muestral?', 'تُرمى قطعتا نقود ونرد. كم نتيجة في فضاء العيّنة؟'),
        expected: n(24),
        hint: say('Biderkatu emaitza kopuruak.', 'Multiplica los números de resultados.', 'اضرب أعداد النتائج.'),
        explanation: same('$2\\cdot 2\\cdot 6=24$')
    },
    {
        id: 102, stage: 'events', points: 20, context: 'advanced',
        prompt: say('Poltsa batean 1etik 30era zenbakitutako bolak daude. $A$ = «2ren multiploa» eta $B$ = «3ren multiploa». Zenbat bolak osatzen dute «ez 2ren ez 3ren multiploa» gertaera?', 'Una bolsa tiene bolas numeradas del 1 al 30. $A$ = «múltiplo de 2» y $B$ = «múltiplo de 3». ¿Cuántas bolas forman el suceso «ni múltiplo de 2 ni de 3»?', 'في كيس كرات مرقّمة من 1 إلى 30. $A$ = «مضاعف للعدد 2» و$B$ = «مضاعف للعدد 3». كم كرة تكوّن الحدث «ليس مضاعفًا لـ2 ولا لـ3»؟'),
        expected: n(10),
        hint: say('De Morgan: $\\overline{A}\\cap\\overline{B}=\\overline{A\\cup B}$. Zenbatu bildura lehenik; 6ren multiploak bietan daude.', 'De Morgan: $\\overline{A}\\cap\\overline{B}=\\overline{A\\cup B}$. Cuenta primero la unión; los múltiplos de 6 están en los dos.', 'دي مورغان: $\\overline{A}\\cap\\overline{B}=\\overline{A\\cup B}$. عُدّ الاتحاد أولًا؛ مضاعفات 6 في الاثنين.'),
        explanation: say('$A\\cup B$: $15+10-5=20$ bola. Aurkakoa: $30-20=10$.', '$A\\cup B$: $15+10-5=20$ bolas. El contrario: $30-20=10$.', '$A\\cup B$: $15+10-5=20$ كرة. والمعاكس: $30-20=10$.')
    },
    {
        id: 103, stage: 'events', points: 30, context: 'master',
        prompt: say('Hiru txanpon botatzen dira. $A$ = «lehena aurpegia» eta $B$ = «gutxienez bi aurpegi». Zenbat elementu ditu $A\\cup B$-k?', 'Se lanzan tres monedas. $A$ = «la primera es cara» y $B$ = «al menos dos caras». ¿Cuántos elementos tiene $A\\cup B$?', 'تُرمى ثلاث قطع نقدية. $A$ = «الأولى وجه» و$B$ = «وجهان على الأقل». كم عنصرًا في $A\\cup B$؟'),
        expected: n(5),
        hint: say('Idatzi $A$ eta $B$, eta bilatu $A\\cap B$.', 'Escribe $A$ y $B$, y busca $A\\cap B$.', 'اكتب $A$ و$B$ وابحث عن $A\\cap B$.'),
        explanation: say('$A=\\{\\text{CCC},\\text{CC+},\\text{C+C},\\text{C++}\\}$, $B=\\{\\text{CCC},\\text{CC+},\\text{C+C},\\text{+CC}\\}$; komunak 3: $4+4-3=5$.', '$A=\\{\\text{CCC},\\text{CC+},\\text{C+C},\\text{C++}\\}$, $B=\\{\\text{CCC},\\text{CC+},\\text{C+C},\\text{+CC}\\}$; comunes, 3: $4+4-3=5$.', '$A=\\{\\text{CCC},\\text{CC+},\\text{C+C},\\text{C++}\\}$، $B=\\{\\text{CCC},\\text{CC+},\\text{C+C},\\text{+CC}\\}$؛ المشتركة 3: $4+4-3=5$.')
    },

    /* ---------- Probability ---------- */
    {
        id: 104, stage: 'probability', points: 10, context: 'starter',
        prompt: say('Poltsa batean 4 bola gorri, 3 urdin eta 5 berde daude. Zein da gorria ez den bola bat ateratzeko probabilitatea?', 'En una bolsa hay 4 bolas rojas, 3 azules y 5 verdes. ¿Cuál es la probabilidad de sacar una bola que no sea roja?', 'في كيس 4 كرات حمراء و3 زرقاء و5 خضراء. ما احتمال سحب كرة ليست حمراء؟'),
        expected: f(2, 3),
        hint: say('Aurkakoa: 1 ken gorria.', 'Contrario: 1 menos roja.', 'المعاكس: 1 ناقص الحمراء.'),
        explanation: same('$1-\\frac{4}{12}=\\frac{8}{12}=\\frac{2}{3}$')
    },
    {
        id: 105, stage: 'probability', points: 20, context: 'advanced',
        prompt: say('Dado bat trukatuta dago: 6a beste zenbaki bakoitza baino bi aldiz gehiagotan ateratzen da, eta beste bostak ekiprobableak dira. Zein da 6 ateratzeko probabilitatea?', 'Un dado está trucado: el 6 sale el doble de veces que cada uno de los otros números, que son equiprobables. ¿Cuál es la probabilidad de sacar un 6?', 'نرد مغشوش: يظهر 6 ضعف مرات كل عدد من الأعداد الأخرى، وهي متساوية الاحتمال. ما احتمال الحصول على 6؟'),
        expected: f(2, 7),
        hint: say('Beste zenbaki bakoitzari $p$ deitu: $P(6)=2p$, eta denak batuta 1.', 'Llama $p$ a cada uno de los otros: $P(6)=2p$, y todos suman 1.', 'سمِّ احتمال كل عدد آخر $p$: $P(6)=2p$، والمجموع 1.'),
        explanation: say('$5p+2p=1$, beraz $p=\\frac{1}{7}$ eta $P(6)=\\frac{2}{7}$.', '$5p+2p=1$, así que $p=\\frac{1}{7}$ y $P(6)=\\frac{2}{7}$.', '$5p+2p=1$، إذن $p=\\frac{1}{7}$ و$P(6)=\\frac{2}{7}$.')
    },
    {
        id: 106, stage: 'probability', points: 30, context: 'master',
        prompt: say('Bi dado botatzen dira. Zein da batura 8 izateko edo bi zenbaki berdin ateratzeko probabilitatea?', 'Se lanzan dos dados. ¿Cuál es la probabilidad de que la suma sea 8 o de que salgan dos números iguales?', 'يُرمى نردان. ما احتمال أن يكون المجموع 8 أو أن يظهر عددان متساويان؟'),
        expected: f(5, 18),
        hint: say('Bateragarriak dira: (4,4) bietan dago.', 'Son compatibles: el (4,4) está en los dos.', 'متوافقان: (4,4) في كليهما.'),
        explanation: same('$\\frac{5}{36}+\\frac{6}{36}-\\frac{1}{36}=\\frac{10}{36}=\\frac{5}{18}$')
    },

    /* ---------- Compound experiments ---------- */
    {
        id: 107, stage: 'compound', points: 10, context: 'starter',
        prompt: say('Txanpon bat eta bi dado botatzen dira. Zein da aurpegia eta bi sei ateratzeko probabilitatea?', 'Se lanzan una moneda y dos dados. ¿Cuál es la probabilidad de sacar cara y dos seises?', 'تُرمى قطعة نقود ونردان. ما احتمال الحصول على وجه وستّتين؟'),
        expected: f(1, 72),
        hint: say('Hiru esperientzia independente.', 'Tres experiencias independientes.', 'ثلاث تجارب مستقلة.'),
        explanation: same('$\\frac{1}{2}\\cdot\\frac{1}{6}\\cdot\\frac{1}{6}=\\frac{1}{72}$')
    },
    {
        id: 108, stage: 'compound', points: 20, context: 'advanced',
        prompt: say('Jorgek jaurtiketen % 68 asmatzen ditu eta Luisak % 75. Bakoitzak behin jaurtitzen du. Zein da gutxienez batek asmatzeko probabilitatea?', 'Jorge acierta el 68 % de sus tiros y Luisa el 75 %. Tiran una vez cada uno. ¿Cuál es la probabilidad de que acierte al menos uno?', 'يصيب خورخي 68 % من رمياته ولويسا 75 %. يرمي كل منهما مرة. ما احتمال أن يصيب أحدهما على الأقل؟'),
        expected: f(92, 100),
        hint: say('Aurkakoa: biek huts egitea.', 'El contrario: que fallen los dos.', 'المعاكس: أن يخطئ الاثنان.'),
        explanation: same('$1-0{,}32\\cdot 0{,}25=1-0{,}08=0{,}92$')
    },
    {
        id: 109, stage: 'compound', points: 30, context: 'master',
        prompt: say('Gutxienez zenbat aldiz bota behar da dado bat, gutxienez 6 bat ateratzeko probabilitatea $\\frac{1}{2}$ baino handiagoa izan dadin?', '¿Cuántas veces hay que lanzar un dado, como mínimo, para que la probabilidad de sacar al menos un 6 sea mayor que $\\frac{1}{2}$?', 'كم مرة على الأقل يجب رمي نرد ليصبح احتمال الحصول على 6 مرة على الأقل أكبر من $\\frac{1}{2}$؟'),
        expected: n(4),
        hint: say('$n$ jaurtiketatan: $1-\\left(\\frac{5}{6}\\right)^{n}$. Probatu $n=3$ eta $n=4$.', 'En $n$ lanzamientos: $1-\\left(\\frac{5}{6}\\right)^{n}$. Prueba $n=3$ y $n=4$.', 'في $n$ رمية: $1-\\left(\\frac{5}{6}\\right)^{n}$. جرّب $n=3$ و$n=4$.'),
        explanation: say('$1-\\left(\\frac{5}{6}\\right)^{3}\\approx 0{,}42$ eta $1-\\left(\\frac{5}{6}\\right)^{4}\\approx 0{,}52$: 4 jaurtiketa behar dira.', '$1-\\left(\\frac{5}{6}\\right)^{3}\\approx 0{,}42$ y $1-\\left(\\frac{5}{6}\\right)^{4}\\approx 0{,}52$: hacen falta 4 lanzamientos.', '$1-\\left(\\frac{5}{6}\\right)^{3}\\approx 0{,}42$ و$1-\\left(\\frac{5}{6}\\right)^{4}\\approx 0{,}52$: يلزم 4 رميات.')
    },

    /* ---------- Conditional probability ---------- */
    {
        id: 110, stage: 'conditional', points: 10, context: 'starter',
        prompt: say('200 pertsonari egindako inkesta batean, 120 emakume dira; kirola 80 emakumek eta 30 gizonek egiten dute. Kirola egiten duen pertsona bat zoriz aukeratuta, zein da emakumea izateko probabilitatea?', 'En una encuesta a 200 personas, 120 son mujeres; hacen deporte 80 mujeres y 30 hombres. Elegida al azar una persona que hace deporte, ¿cuál es la probabilidad de que sea mujer?', 'في استطلاع لـ200 شخص، 120 امرأة؛ تمارس الرياضة 80 امرأة و30 رجلًا. إذا اختير عشوائيًا شخص يمارس الرياضة، فما احتمال أن يكون امرأة؟'),
        expected: f(8, 11),
        hint: say('Kasu posibleak: kirola egiten duten 110ak.', 'Casos posibles: los 110 que hacen deporte.', 'الحالات الممكنة: الـ110 الذين يمارسون الرياضة.'),
        explanation: same('$\\frac{80}{80+30}=\\frac{80}{110}=\\frac{8}{11}$')
    },
    {
        id: 111, stage: 'conditional', points: 20, context: 'advanced',
        prompt: say('Hiri batean egunen % 30ean euria egiten du. Euria egiten badu, auto-ilara egoteko probabilitatea 0,6 da; bestela, 0,2. Zein da edozein egunetan auto-ilara egoteko probabilitatea?', 'En una ciudad llueve el 30 % de los días. Si llueve, la probabilidad de atasco es 0,6; si no, 0,2. ¿Cuál es la probabilidad de que haya atasco un día cualquiera?', 'في مدينة تمطر 30 % من الأيام. إذا أمطرت فاحتمال الازدحام 0.6، وإلا 0.2. ما احتمال وجود ازدحام في يوم ما؟'),
        expected: f(32, 100),
        hint: say('Batu auto-ilarara daramaten bi bideak.', 'Suma los dos caminos que llevan a atasco.', 'اجمع المسارين المؤديين إلى الازدحام.'),
        explanation: same('$0{,}3\\cdot 0{,}6+0{,}7\\cdot 0{,}2=0{,}18+0{,}14=0{,}32$')
    },
    {
        id: 112, stage: 'conditional', points: 30, context: 'master',
        prompt: say('Hiri batean egunen % 30ean euria egiten du. Euria egiten badu, auto-ilara egoteko probabilitatea 0,6 da; bestela, 0,2. Gaur auto-ilara dago. Zein da euria egiteko probabilitatea?', 'En una ciudad llueve el 30 % de los días. Si llueve, la probabilidad de atasco es 0,6; si no, 0,2. Hoy hay atasco. ¿Cuál es la probabilidad de que esté lloviendo?', 'في مدينة تمطر 30 % من الأيام. إذا أمطرت فاحتمال الازدحام 0.6، وإلا 0.2. اليوم هناك ازدحام. ما احتمال أن تكون تمطر؟'),
        expected: f(9, 16),
        hint: say('Euriaren bidea zati auto-ilararen probabilitate osoa.', 'El camino de la lluvia entre la probabilidad total de atasco.', 'مسار المطر على الاحتمال الكلي للازدحام.'),
        explanation: same('$\\frac{0{,}18}{0{,}32}=\\frac{18}{32}=\\frac{9}{16}$')
    },

    /* ---------- Counting and deciding ---------- */
    {
        id: 113, stage: 'counting', points: 10, context: 'starter',
        prompt: say('Zozketa batek 500 txartel saltzen ditu 2 €-an, eta 600 €-ko sari bakarra du. Zein da txartel bat erostearen irabazi itxaropena?', 'Una rifa vende 500 papeletas a 2 € y tiene un único premio de 600 €. ¿Cuál es la ganancia esperada al comprar una papeleta?', 'يبيع سحب 500 بطاقة بسعر 2 € وله جائزة واحدة قيمتها 600 €. ما الربح المتوقع عند شراء بطاقة؟'),
        expected: f(-8, 10),
        hint: say('Saria bider haren probabilitatea, ken txartelaren prezioa.', 'El premio por su probabilidad, menos el precio de la papeleta.', 'الجائزة في احتمالها ناقص سعر البطاقة.'),
        explanation: same('$600\\cdot\\frac{1}{500}-2=1{,}2-2=-0{,}8$')
    },
    {
        id: 114, stage: 'counting', points: 20, context: 'advanced',
        prompt: say('Hiru pertsona (A, B eta C) zoriz esertzen dira ilarako 6 aulkitan. Zein da A eta B elkarren ondoan geratzeko probabilitatea?', 'Tres personas (A, B y C) se sientan al azar en 6 asientos en fila. ¿Cuál es la probabilidad de que A y B queden juntas?', 'يجلس ثلاثة أشخاص (A وB وC) عشوائيًا على 6 مقاعد في صف. ما احتمال أن يجلس A وB متجاورين؟'),
        expected: f(1, 3),
        hint: say('Posibleak: $\\text{V}_{6,3}$. Aldekoak: 5 bikote ondoan, 2 ordena eta C-rentzat 4 aulki.', 'Posibles: $\\text{V}_{6,3}$. Favorables: 5 pares de asientos contiguos, 2 órdenes y 4 asientos para C.', 'الممكنة: $\\text{V}_{6,3}$. الملائمة: 5 أزواج مقاعد متجاورة وترتيبان و4 مقاعد لـC.'),
        explanation: same('$\\frac{5\\cdot 2\\cdot 4}{6\\cdot 5\\cdot 4}=\\frac{40}{120}=\\frac{1}{3}$')
    },
    {
        id: 115, stage: 'counting', points: 30, context: 'master',
        prompt: say('Hiru dado botatzen dira. Zein da erdiko puntuazioa (ordenatu ondoren) 2 izateko probabilitatea?', 'Se lanzan tres dados. ¿Cuál es la probabilidad de que la puntuación mediana (una vez ordenadas) sea 2?', 'تُرمى ثلاثة نرود. ما احتمال أن تكون النتيجة الوسطى (بعد الترتيب) 2؟'),
        expected: f(5, 27),
        hint: say('Mediana $\\le k$ gutxienez bi dado $\\le k$ direnean. Kalkulatu $k=2$ eta $k=1$, eta kendu.', 'La mediana es $\\le k$ cuando al menos dos dados son $\\le k$. Calcula para $k=2$ y $k=1$, y resta.', 'يكون الوسيط $\\le k$ عندما يكون نردان على الأقل $\\le k$. احسب لـ$k=2$ و$k=1$ واطرح.'),
        explanation: say('Gutxienez bi $\\le 2$: $3\\cdot 2^{2}\\cdot 4+2^{3}=56$. Gutxienez bi $\\le 1$: $3\\cdot 1\\cdot 5+1=16$. $\\frac{56-16}{216}=\\frac{40}{216}=\\frac{5}{27}$.', 'Al menos dos $\\le 2$: $3\\cdot 2^{2}\\cdot 4+2^{3}=56$. Al menos dos $\\le 1$: $3\\cdot 1\\cdot 5+1=16$. $\\frac{56-16}{216}=\\frac{40}{216}=\\frac{5}{27}$.', 'اثنان على الأقل $\\le 2$: $3\\cdot 2^{2}\\cdot 4+2^{3}=56$. اثنان على الأقل $\\le 1$: $3\\cdot 1\\cdot 5+1=16$. $\\frac{56-16}{216}=\\frac{40}{216}=\\frac{5}{27}$.')
    }
]

export const probabilityAkExerciseBank: ExerciseSection[] = [
    {
        id: 'events',
        title: say('Gertaerak', 'Sucesos', 'الأحداث'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Esan aleatorioa ala determinista den: a) txanpon bat botatzea; b) itsasoaren mailan ura irakiten den tenperatura neurtzea; c) loteriako zenbaki saritua.', 'Di si es aleatorio o determinista: a) lanzar una moneda; b) medir la temperatura a la que hierve el agua al nivel del mar; c) el número premiado de la lotería.', 'قل إن كانت التجربة عشوائية أو حتمية: أ) رمي قطعة نقود؛ ب) قياس درجة غليان الماء عند مستوى سطح البحر؛ ج) الرقم الفائز في اليانصيب.'), solution: say('a) Aleatorioa. b) Determinista: 100 °C. c) Aleatorioa.', 'a) Aleatorio. b) Determinista: 100 °C. c) Aleatorio.', 'أ) عشوائية. ب) حتمية: 100 °C. ج) عشوائية.') },
            { id: 2, difficulty: 'easy', question: say('Dado bat botatzen dugu eta emaitza 3z zatitzearen hondarra idazten dugu. Zenbat oinarrizko gertaera ditu lagin-espazioak?', 'Lanzamos un dado y anotamos el resto de dividir el resultado entre 3. ¿Cuántos sucesos elementales tiene el espacio muestral?', 'نرمي نردًا ونسجّل باقي قسمة النتيجة على 3. كم حدثًا بسيطًا في فضاء العيّنة؟'), solution: say('$E=\\{0,1,2\\}$: 3 oinarrizko gertaera.', '$E=\\{0,1,2\\}$: 3 sucesos elementales.', '$E=\\{0,1,2\\}$: 3 أحداث بسيطة.'), answer: { expected: n(3) } },
            { id: 3, difficulty: 'easy', question: say('1etik 10era zenbakitutako bolak: $A$ = «bikoitia», $B$ = «6 baino handiagoa». Idatzi $A\\cup B$ eta $A\\cap B$. Zenbat elementu ditu $A\\cup B$-k?', 'Bolas numeradas del 1 al 10: $A$ = «par», $B$ = «mayor que 6». Escribe $A\\cup B$ y $A\\cap B$. ¿Cuántos elementos tiene $A\\cup B$?', 'كرات مرقّمة من 1 إلى 10: $A$ = «زوجي»، $B$ = «أكبر من 6». اكتب $A\\cup B$ و$A\\cap B$. كم عنصرًا في $A\\cup B$؟'), solution: say('$A\\cup B=\\{2,4,6,7,8,9,10\\}$, 7 elementu; $A\\cap B=\\{8,10\\}$.', '$A\\cup B=\\{2,4,6,7,8,9,10\\}$, 7 elementos; $A\\cap B=\\{8,10\\}$.', '$A\\cup B=\\{2,4,6,7,8,9,10\\}$، 7 عناصر؛ $A\\cap B=\\{8,10\\}$.'), answer: { expected: n(7) } },
            { id: 4, difficulty: 'medium', question: say('40 kartako sorta batean, $A$ = «kopak» eta $B$ = «irudia». Zenbat karta ditu $A\\cup B$-k?', 'En una baraja de 40, $A$ = «copas» y $B$ = «figura». ¿Cuántas cartas tiene $A\\cup B$?', 'في مجموعة 40 ورقة، $A$ = «كؤوس» و$B$ = «صورة». كم ورقة في $A\\cup B$؟'), solution: say('Kopen 3 irudiak bietan daude: $10+12-3=19$.', 'Las 3 figuras de copas están en los dos: $10+12-3=19$.', 'صور الكؤوس الثلاث في الاثنين: $10+12-3=19$.'), answer: { expected: n(19) } },
            { id: 5, difficulty: 'medium', question: say('Bi dado botatzen ditugu eta puntuazio txikiena idazten dugu. 36 laukietatik zenbatetan da txikiena 1?', 'Lanzamos dos dados y anotamos la menor puntuación. ¿En cuántas de las 36 casillas la menor es 1?', 'نرمي نردين ونسجّل أصغر نتيجة. في كم خانة من الخانات الـ36 يكون الأصغر 1؟'), solution: say('1aren errenkada eta zutabea, (1,1) behin: $6+6-1=11$.', 'La fila y la columna del 1, con el (1,1) una vez: $6+6-1=11$.', 'سطر 1 وعموده، مع (1,1) مرة واحدة: $6+6-1=11$.'), answer: { expected: n(11) } },
            { id: 6, difficulty: 'medium', question: say('Hiru txanpon botatzen dira. $A$ = «justu bi aurpegi». Zenbat elementu ditu $\\overline{A}$-k?', 'Se lanzan tres monedas. $A$ = «exactamente dos caras». ¿Cuántos elementos tiene $\\overline{A}$?', 'تُرمى ثلاث قطع نقدية. $A$ = «وجهان بالضبط». كم عنصرًا في $\\overline{A}$؟'), solution: say('$A=\\{\\text{CC+},\\text{C+C},\\text{+CC}\\}$; aurkakoa: $8-3=5$.', '$A=\\{\\text{CC+},\\text{C+C},\\text{+CC}\\}$; el contrario: $8-3=5$.', '$A=\\{\\text{CC+},\\text{C+C},\\text{+CC}\\}$؛ والمعاكس: $8-3=5$.'), answer: { expected: n(5) } },
            { id: 7, difficulty: 'medium', question: say('Dado bat botatzean, «bikoitia» eta «3ren multiploa» bateragarriak dira? Eta «1» eta «bikoitia»?', 'Al lanzar un dado, ¿son compatibles «par» y «múltiplo de 3»? ¿Y «sacar 1» y «par»?', 'عند رمي نرد، هل «زوجي» و«مضاعف للعدد 3» متوافقان؟ وماذا عن «1» و«زوجي»؟'), solution: say('Bateragarriak: 6a bietan. Bateraezinak: 1 bakoitia da.', 'Compatibles: el 6 está en los dos. Incompatibles: el 1 es impar.', 'متوافقان: 6 في الاثنين. متنافيان: 1 عدد فردي.') },
            { id: 8, difficulty: 'hard', question: say('Dado gorri bat eta berde bat botatzen ditugu eta (gorria, berdea) idazten dugu. $A$ = «batura 7», $B$ = «gorria 3». Zenbat elementu ditu $A\\cup B$-k?', 'Lanzamos un dado rojo y uno verde y anotamos (rojo, verde). $A$ = «suma 7», $B$ = «el rojo es 3». ¿Cuántos elementos tiene $A\\cup B$?', 'نرمي نردًا أحمر وآخر أخضر ونسجّل (الأحمر، الأخضر). $A$ = «المجموع 7»، $B$ = «الأحمر 3». كم عنصرًا في $A\\cup B$؟'), solution: say('6 eta 6 elementu; (3,4) bietan: $6+6-1=11$.', '6 y 6 elementos; el (3,4) está en los dos: $6+6-1=11$.', '6 و6 عناصر؛ (3,4) في الاثنين: $6+6-1=11$.'), answer: { expected: n(11) } },
            { id: 9, difficulty: 'hard', question: say('Egiaztatu De Morganen legea dado batekin: $A=\\{1,2,3\\}$, $B=\\{2,4,6\\}$. Kalkulatu $\\overline{A\\cup B}$ eta $\\overline{A}\\cap\\overline{B}$.', 'Comprueba la ley de De Morgan con un dado: $A=\\{1,2,3\\}$, $B=\\{2,4,6\\}$. Calcula $\\overline{A\\cup B}$ y $\\overline{A}\\cap\\overline{B}$.', 'تحقّق من قانون دي مورغان بنرد: $A=\\{1,2,3\\}$، $B=\\{2,4,6\\}$. احسب $\\overline{A\\cup B}$ و$\\overline{A}\\cap\\overline{B}$.'), solution: same('$A\\cup B=\\{1,2,3,4,6\\}$, $\\overline{A\\cup B}=\\{5\\}$; $\\overline{A}=\\{4,5,6\\}$, $\\overline{B}=\\{1,3,5\\}$, $\\overline{A}\\cap\\overline{B}=\\{5\\}$.') },
            { id: 10, difficulty: 'hard', question: say('Esperimentu batek 3 oinarrizko gertaera ditu, $\\{a,b,c\\}$. Zenbat gertaera desberdin osa daitezke, $\\varnothing$ eta $E$ barne?', 'Un experimento tiene 3 sucesos elementales, $\\{a,b,c\\}$. ¿Cuántos sucesos distintos se pueden formar, contando $\\varnothing$ y $E$?', 'لتجربة 3 أحداث بسيطة $\\{a,b,c\\}$. كم حدثًا مختلفًا يمكن تكوينه، بما فيها $\\varnothing$ و$E$؟'), solution: say('Elementu bakoitza sartu ala ez: $2^{3}=8$.', 'Cada elemento, dentro o fuera: $2^{3}=8$.', 'كل عنصر داخل أو خارج: $2^{3}=8$.'), answer: { expected: n(8) } }
        ]
    },
    {
        id: 'probability',
        title: say('Probabilitatea', 'Probabilidad', 'الاحتمال'),
        items: [
            { id: 11, difficulty: 'easy', question: say('40 kartako sorta batetik karta bat ateratzen da. Zein da urrea izateko probabilitatea?', 'Se saca una carta de una baraja de 40. ¿Cuál es la probabilidad de que sea de oros?', 'تُسحب ورقة من مجموعة 40 ورقة. ما احتمال أن تكون من الذهب؟'), solution: same('$\\frac{10}{40}=\\frac{1}{4}=0{,}25$'), answer: { expected: f(1, 4) } },
            { id: 12, difficulty: 'easy', question: say('Poltsa batean 3 bola zuri, 5 beltz eta 2 berde daude. Zein da berdea ateratzeko probabilitatea?', 'En una bolsa hay 3 bolas blancas, 5 negras y 2 verdes. ¿Cuál es la probabilidad de sacar verde?', 'في كيس 3 كرات بيضاء و5 سوداء و2 خضراء. ما احتمال سحب خضراء؟'), solution: same('$\\frac{2}{10}=0{,}2$'), answer: { expected: f(1, 5) } },
            { id: 13, difficulty: 'easy', question: say('$P(A)=0{,}3$ bada, zenbat da $P(\\overline{A})$?', 'Si $P(A)=0{,}3$, ¿cuánto vale $P(\\overline{A})$?', 'إذا كان $P(A)=0{,}3$ فكم يساوي $P(\\overline{A})$؟'), solution: same('$1-0{,}3=0{,}7$'), answer: { expected: f(7, 10) } },
            { id: 14, difficulty: 'medium', question: say('Txanpon bat 400 aldiz botatzen da eta 212 aldiz ateratzen da aurpegia. Zein da aurpegiaren maiztasun erlatiboa?', 'Una moneda se lanza 400 veces y sale cara 212 veces. ¿Cuál es la frecuencia relativa de cara?', 'تُرمى قطعة نقود 400 مرة فيظهر الوجه 212 مرة. ما التكرار النسبي للوجه؟'), solution: same('$\\frac{212}{400}=0{,}53$'), answer: { expected: f(53, 100) } },
            { id: 15, difficulty: 'medium', question: say('Bi dado botatzen dira. Zein da batura 5 baino txikiagoa izateko probabilitatea?', 'Se lanzan dos dados. ¿Cuál es la probabilidad de que la suma sea menor que 5?', 'يُرمى نردان. ما احتمال أن يكون المجموع أصغر من 5؟'), solution: say('2 batura: 1 lauki; 3: 2; 4: 3. $\\frac{1+2+3}{36}=\\frac{6}{36}=\\frac{1}{6}$.', 'Suma 2: 1 casilla; 3: 2; 4: 3. $\\frac{1+2+3}{36}=\\frac{6}{36}=\\frac{1}{6}$.', 'المجموع 2: خانة؛ 3: خانتان؛ 4: ثلاث. $\\frac{1+2+3}{36}=\\frac{6}{36}=\\frac{1}{6}$.'), answer: { expected: f(1, 6) } },
            { id: 16, difficulty: 'medium', question: say('Dado trukatu batean $P(1)=P(2)=P(3)=0{,}1$, $P(4)=0{,}4$ eta $P(5)=P(6)$. Kalkulatu $P(6)$.', 'En un dado trucado, $P(1)=P(2)=P(3)=0{,}1$, $P(4)=0{,}4$ y $P(5)=P(6)$. Calcula $P(6)$.', 'في نرد مغشوش $P(1)=P(2)=P(3)=0{,}1$ و$P(4)=0{,}4$ و$P(5)=P(6)$. احسب $P(6)$.'), solution: say('Geratzen dena: $1-0{,}7=0{,}3$, bitan banatuta: $0{,}3:2=0{,}15$.', 'Lo que queda: $1-0{,}7=0{,}3$, repartido entre dos: $0{,}3:2=0{,}15$.', 'الباقي: $1-0{,}7=0{,}3$، يُقسم على اثنين: $0{,}3:2=0{,}15$.'), answer: { expected: f(15, 100) } },
            { id: 17, difficulty: 'medium', question: say('$P(A)=0{,}45$ eta $P(B)=0{,}3$, eta $A$ eta $B$ bateraezinak dira. Kalkulatu $P(\\overline{A\\cup B})$.', '$P(A)=0{,}45$ y $P(B)=0{,}3$, y $A$ y $B$ son incompatibles. Calcula $P(\\overline{A\\cup B})$.', '$P(A)=0{,}45$ و$P(B)=0{,}3$، و$A$ و$B$ متنافيان. احسب $P(\\overline{A\\cup B})$.'), solution: same('$P(A\\cup B)=0{,}45+0{,}3=0{,}75$; $1-0{,}75=0{,}25$'), answer: { expected: f(1, 4) } },
            { id: 18, difficulty: 'hard', question: say('Institutu batean ikasleen % 48 mutilak dira. Guztien % 30ek futbolean jokatzen du, eta % 12 mutila da eta futbolean jokatzen du. Zein da ikasle bat mutila izateko edo futbolean jokatzeko probabilitatea?', 'En un instituto, el 48 % son chicos. El 30 % de todos juega al fútbol, y el 12 % es chico y juega al fútbol. ¿Cuál es la probabilidad de que un estudiante sea chico o juegue al fútbol?', 'في معهد 48 % أولاد. ويلعب 30 % من الجميع كرة القدم، و12 % أولاد يلعبون كرة القدم. ما احتمال أن يكون طالب ولدًا أو يلعب كرة القدم؟'), solution: same('$0{,}48+0{,}3-0{,}12=0{,}66$'), answer: { expected: f(66, 100) } },
            { id: 19, difficulty: 'hard', question: say('Bi dado botatzen dira. Zein da puntuazioen biderkadura bikoitia izateko probabilitatea?', 'Se lanzan dos dados. ¿Cuál es la probabilidad de que el producto de las puntuaciones sea par?', 'يُرمى نردان. ما احتمال أن يكون حاصل ضرب النتيجتين زوجيًا؟'), solution: say('Aurkakoa: biak bakoitiak, $3\\cdot 3=9$ lauki. $1-\\frac{9}{36}=\\frac{27}{36}=\\frac{3}{4}$.', 'El contrario: las dos impares, $3\\cdot 3=9$ casillas. $1-\\frac{9}{36}=\\frac{27}{36}=\\frac{3}{4}$.', 'المعاكس: كلاهما فردي، $3\\cdot 3=9$ خانات. $1-\\frac{9}{36}=\\frac{27}{36}=\\frac{3}{4}$.'), answer: { expected: f(3, 4) } },
            { id: 20, difficulty: 'hard', question: say('Gela batean $P(\\text{mutila})=0{,}625$. 12 neska badaude, zenbat ikasle daude guztira?', 'En una clase, $P(\\text{chico})=0{,}625$. Si hay 12 chicas, ¿cuántos estudiantes hay en total?', 'في صف احتمال اختيار ولد 0.625. إذا كان فيه 12 بنتًا، فكم طالبًا فيه؟'), solution: say('Neskak: $1-0{,}625=0{,}375$. $12:0{,}375=32$ ikasle.', 'Chicas: $1-0{,}625=0{,}375$. $12:0{,}375=32$ estudiantes.', 'البنات: $1-0{,}625=0{,}375$. $12:0{,}375=32$ طالبًا.'), answer: { expected: n(32) } }
        ]
    },
    {
        id: 'compound',
        title: say('Esperientzia konposatuak', 'Experiencias compuestas', 'التجارب المركّبة'),
        items: [
            { id: 21, difficulty: 'easy', question: say('Bi txanpon botatzen dira. Zein da bi gurutze ateratzeko probabilitatea?', 'Se lanzan dos monedas. ¿Cuál es la probabilidad de sacar dos cruces?', 'تُرمى قطعتا نقود. ما احتمال ظهرين؟'), solution: same('$\\frac{1}{2}\\cdot\\frac{1}{2}=\\frac{1}{4}$'), answer: { expected: f(1, 4) } },
            { id: 22, difficulty: 'easy', question: say('Txanpon bat eta dado bat botatzen dira. Zein da gurutzea eta zenbaki bikoitia ateratzeko probabilitatea?', 'Se lanzan una moneda y un dado. ¿Cuál es la probabilidad de sacar cruz y número par?', 'تُرمى قطعة نقود ونرد. ما احتمال ظهرٍ وعدد زوجي؟'), solution: same('$\\frac{1}{2}\\cdot\\frac{3}{6}=\\frac{1}{4}$'), answer: { expected: f(1, 4) } },
            { id: 23, difficulty: 'easy', question: say('Sorta batetik bi karta ateratzen dira, lehena itzulita. Zein da bi urre ateratzeko probabilitatea?', 'Se sacan dos cartas de una baraja de 40, devolviendo la primera. ¿Cuál es la probabilidad de sacar dos oros?', 'تُسحب ورقتان من مجموعة 40 مع إرجاع الأولى. ما احتمال ورقتي ذهب؟'), solution: same('$\\frac{10}{40}\\cdot\\frac{10}{40}=\\frac{1}{16}$'), answer: { expected: f(1, 16) } },
            { id: 24, difficulty: 'medium', question: say('4 txanpon botatzen dira. Zein da gutxienez aurpegi bat ateratzeko probabilitatea?', 'Se lanzan 4 monedas. ¿Cuál es la probabilidad de sacar al menos una cara?', 'تُرمى 4 قطع نقدية. ما احتمال وجه واحد على الأقل؟'), solution: same('$1-\\left(\\frac{1}{2}\\right)^{4}=1-\\frac{1}{16}=\\frac{15}{16}$'), answer: { expected: f(15, 16) } },
            { id: 25, difficulty: 'medium', question: say('Kutxa batean 3 bola gorri eta 2 berde daude. Bi ateratzen dira, itzuli gabe. Zein da bi berde ateratzeko probabilitatea?', 'Una urna tiene 3 bolas rojas y 2 verdes. Se sacan dos sin devolver. ¿Cuál es la probabilidad de sacar dos verdes?', 'في جرّة 3 كرات حمراء وكرتان خضراوان. تُسحب كرتان دون إرجاع. ما احتمال خضراوين؟'), solution: same('$\\frac{2}{5}\\cdot\\frac{1}{4}=\\frac{2}{20}=\\frac{1}{10}$'), answer: { expected: f(1, 10) } },
            { id: 26, difficulty: 'medium', question: say('Hiru karta ateratzen dira, itzuli gabe. Zein da hirurak bastoiak izateko probabilitatea?', 'Se sacan tres cartas sin devolver. ¿Cuál es la probabilidad de que las tres sean bastos?', 'تُسحب ثلاث أوراق دون إرجاع. ما احتمال أن تكون الثلاث من العصي؟'), solution: same('$\\frac{10}{40}\\cdot\\frac{9}{39}\\cdot\\frac{8}{38}=\\frac{720}{59\\,280}=\\frac{3}{247}$'), answer: { expected: f(3, 247) } },
            { id: 27, difficulty: 'medium', question: say('Kutxa batean 5 bola beltz eta 3 zuri daude. Bi ateratzen dira, itzuli gabe. Zein da bigarrena zuria izateko probabilitatea?', 'Una urna tiene 5 bolas negras y 3 blancas. Se sacan dos sin devolver. ¿Cuál es la probabilidad de que la segunda sea blanca?', 'في جرّة 5 كرات سوداء و3 بيضاء. تُسحب كرتان دون إرجاع. ما احتمال أن تكون الثانية بيضاء؟'), solution: say('Bi bide: $\\frac{5}{8}\\cdot\\frac{3}{7}+\\frac{3}{8}\\cdot\\frac{2}{7}=\\frac{21}{56}=\\frac{3}{8}$, lehenengoaren bera.', 'Dos caminos: $\\frac{5}{8}\\cdot\\frac{3}{7}+\\frac{3}{8}\\cdot\\frac{2}{7}=\\frac{21}{56}=\\frac{3}{8}$, igual que la primera.', 'مساران: $\\frac{5}{8}\\cdot\\frac{3}{7}+\\frac{3}{8}\\cdot\\frac{2}{7}=\\frac{21}{56}=\\frac{3}{8}$، مثل الأولى.'), answer: { expected: f(3, 8) } },
            { id: 28, difficulty: 'hard', question: say('Saskibaloi-jokalari batek jaurtiketa libreen % 75 sartzen ditu. Bi jaurtitzen ditu. Zein da justu bat sartzeko probabilitatea?', 'Un jugador de baloncesto encesta el 75 % de sus tiros libres. Lanza dos. ¿Cuál es la probabilidad de que enceste exactamente uno?', 'يسجّل لاعب كرة سلة 75 % من رمياته الحرة. يرمي رميتين. ما احتمال أن يسجّل واحدة بالضبط؟'), solution: say('Bi bide: sartu-huts eta huts-sartu. $2\\cdot 0{,}75\\cdot 0{,}25=0{,}375$.', 'Dos caminos: encesta-falla y falla-encesta. $2\\cdot 0{,}75\\cdot 0{,}25=0{,}375$.', 'مساران: يسجّل ثم يخطئ، ويخطئ ثم يسجّل. $2\\cdot 0{,}75\\cdot 0{,}25=0{,}375$.'), answer: { expected: f(3, 8) } },
            { id: 29, difficulty: 'hard', question: say('Txintxeta bat punta gora erortzen da 0,3 probabilitatearekin. Bi botatzen dira. Zein da modu desberdinean erortzeko probabilitatea?', 'Una chincheta cae con la punta hacia arriba con probabilidad 0,3. Se lanzan dos. ¿Cuál es la probabilidad de que caigan de distinta forma?', 'يسقط دبوس ورأسه إلى الأعلى باحتمال 0.3. يُرمى دبوسان. ما احتمال أن يسقطا بشكلين مختلفين؟'), solution: same('$0{,}3\\cdot 0{,}7+0{,}7\\cdot 0{,}3=0{,}42$'), answer: { expected: f(42, 100) } },
            { id: 30, difficulty: 'hard', question: say('Andresek set bakoitza 0,6 probabilitatearekin irabazten du. Hiru setetik onenera jokatzen dute (bi irabazten dituenak irabazten du). Zein da hirugarren set bat egoteko probabilitatea?', 'Andrés gana cada set con probabilidad 0,6. Juegan al mejor de tres sets (gana quien gane dos). ¿Cuál es la probabilidad de que haya un tercer set?', 'يربح أندريس كل مجموعة باحتمال 0.6. يلعبان أفضل ثلاث مجموعات (يفوز من يربح مجموعتين). ما احتمال وجود مجموعة ثالثة؟'), solution: say('Aurkakoa: bi set berak irabaztea. $1-0{,}6^{2}-0{,}4^{2}=1-0{,}36-0{,}16=0{,}48$.', 'El contrario: que uno gane los dos primeros. $1-0{,}6^{2}-0{,}4^{2}=1-0{,}36-0{,}16=0{,}48$.', 'المعاكس: أن يربح أحدهما المجموعتين الأوليين. $1-0{,}6^{2}-0{,}4^{2}=1-0{,}36-0{,}16=0{,}48$.'), answer: { expected: f(48, 100) } }
        ]
    },
    {
        id: 'conditional',
        title: say('Probabilitate baldintzatua', 'Probabilidad condicionada', 'الاحتمال المشروط'),
        items: [
            { id: 31, difficulty: 'easy', question: say('Dado bat botatzen da eta 3 baino handiagoa ateratzen da. Zein da bikoitia izateko probabilitatea?', 'Se lanza un dado y sale un número mayor que 3. ¿Cuál es la probabilidad de que sea par?', 'يُرمى نرد ويظهر عدد أكبر من 3. ما احتمال أن يكون زوجيًا؟'), solution: say('Kasu posibleak 4, 5, 6; bikoitiak 4 eta 6: $\\frac{2}{3}$.', 'Casos posibles 4, 5, 6; pares el 4 y el 6: $\\frac{2}{3}$.', 'الحالات الممكنة 4 و5 و6؛ والزوجية 4 و6: $\\frac{2}{3}$.'), answer: { expected: f(2, 3) } },
            { id: 32, difficulty: 'easy', question: say('Talde batean 60 gizon daude (20k erretzen dute) eta 40 emakume (10ek erretzen dute). Zein da zoriz aukeratutako pertsona batek erretzeko probabilitatea?', 'En un grupo hay 60 hombres (20 fuman) y 40 mujeres (10 fuman). ¿Cuál es la probabilidad de que una persona elegida al azar fume?', 'في مجموعة 60 رجلًا (20 يدخّنون) و40 امرأة (10 يدخّنّ). ما احتمال أن يدخّن شخص مختار عشوائيًا؟'), solution: same('$\\frac{20+10}{100}=0{,}3$'), answer: { expected: f(3, 10) } },
            { id: 33, difficulty: 'easy', question: say('Talde batean 60 gizon daude (20k erretzen dute) eta 40 emakume (10ek erretzen dute). Emakume bat zoriz aukeratuta, zein da erretzeko probabilitatea?', 'En un grupo hay 60 hombres (20 fuman) y 40 mujeres (10 fuman). Elegida al azar una mujer, ¿cuál es la probabilidad de que fume?', 'في مجموعة 60 رجلًا (20 يدخّنون) و40 امرأة (10 يدخّنّ). إذا اختيرت امرأة عشوائيًا، فما احتمال أن تدخّن؟'), solution: same('$\\frac{10}{40}=0{,}25$'), answer: { expected: f(1, 4) } },
            { id: 34, difficulty: 'medium', question: say('Talde batean 60 gizon daude (20k erretzen dute) eta 40 emakume (10ek erretzen dute). Erretzen duen pertsona bat zoriz aukeratuta, zein da gizona izateko probabilitatea?', 'En un grupo hay 60 hombres (20 fuman) y 40 mujeres (10 fuman). Elegida al azar una persona que fuma, ¿cuál es la probabilidad de que sea hombre?', 'في مجموعة 60 رجلًا (20 يدخّنون) و40 امرأة (10 يدخّنّ). إذا اختير عشوائيًا شخص يدخّن، فما احتمال أن يكون رجلًا؟'), solution: same('$\\frac{20}{30}=\\frac{2}{3}$'), answer: { expected: f(2, 3) } },
            { id: 35, difficulty: 'medium', question: say('$P(A)=0{,}5$, $P(B)=0{,}6$ eta $P(A\\cap B)=0{,}3$. Kalkulatu $P(A/B)$. $A$ eta $B$ independenteak dira?', '$P(A)=0{,}5$, $P(B)=0{,}6$ y $P(A\\cap B)=0{,}3$. Calcula $P(A/B)$. ¿Son $A$ y $B$ independientes?', '$P(A)=0{,}5$ و$P(B)=0{,}6$ و$P(A\\cap B)=0{,}3$. احسب $P(A/B)$. هل $A$ و$B$ مستقلان؟'), solution: say('$P(A/B)=\\frac{0{,}3}{0{,}6}=0{,}5=P(A)$: bai, independenteak dira.', '$P(A/B)=\\frac{0{,}3}{0{,}6}=0{,}5=P(A)$: sí, son independientes.', '$P(A/B)=\\frac{0{,}3}{0{,}6}=0{,}5=P(A)$: نعم، مستقلان.'), answer: { expected: f(1, 2) } },
            { id: 36, difficulty: 'medium', question: say('Bi karta ateratzen dira, itzuli gabe. Lehena errege bat izan bada, zein da bigarrena ere errege izateko probabilitatea?', 'Se sacan dos cartas sin devolver. Si la primera ha sido un rey, ¿cuál es la probabilidad de que la segunda también sea rey?', 'تُسحب ورقتان دون إرجاع. إذا كانت الأولى ملكًا، فما احتمال أن تكون الثانية ملكًا أيضًا؟'), solution: say('3 errege geratzen dira 39 kartatan: $\\frac{3}{39}=\\frac{1}{13}$.', 'Quedan 3 reyes en 39 cartas: $\\frac{3}{39}=\\frac{1}{13}$.', 'يبقى 3 ملوك في 39 ورقة: $\\frac{3}{39}=\\frac{1}{13}$.'), answer: { expected: f(1, 13) } },
            { id: 37, difficulty: 'medium', question: say('Talde bateko % 52 neskak dira. Nesken % 30ek eta mutilen % 20k lentillak eramaten dituzte. Zein da pertsona batek lentillak eramateko probabilitatea?', 'El 52 % de un grupo son chicas. Llevan lentillas el 30 % de las chicas y el 20 % de los chicos. ¿Cuál es la probabilidad de que una persona lleve lentillas?', '52 % من مجموعة بنات. تلبس العدسات 30 % من البنات و20 % من الأولاد. ما احتمال أن يلبس شخص عدسات؟'), solution: same('$0{,}52\\cdot 0{,}3+0{,}48\\cdot 0{,}2=0{,}156+0{,}096=0{,}252$'), answer: { expected: f(252, 1000) } },
            { id: 38, difficulty: 'hard', question: say('A kutxa: 3 zuri eta 1 beltz. B kutxa: 1 beltz. A-tik bola bat zoriz B-ra pasatzen da, nahasi eta B-tik bola bat ateratzen da. Zein da zuria izateko probabilitatea?', 'Urna A: 3 blancas y 1 negra. Urna B: 1 negra. Se pasa al azar una bola de A a B, se remueve y se saca una bola de B. ¿Cuál es la probabilidad de que sea blanca?', 'الجرّة A: 3 بيضاء وواحدة سوداء. الجرّة B: سوداء واحدة. تُنقل كرة عشوائيًا من A إلى B، ثم تُخلط وتُسحب كرة من B. ما احتمال أن تكون بيضاء؟'), solution: say('Zuria pasatzen bada, B-n zuri bat eta beltz bat: $\\frac{3}{4}\\cdot\\frac{1}{2}+\\frac{1}{4}\\cdot 0=\\frac{3}{8}$.', 'Si pasa una blanca, en B hay una blanca y una negra: $\\frac{3}{4}\\cdot\\frac{1}{2}+\\frac{1}{4}\\cdot 0=\\frac{3}{8}$.', 'إذا نُقلت بيضاء صار في B بيضاء وسوداء: $\\frac{3}{4}\\cdot\\frac{1}{2}+\\frac{1}{4}\\cdot 0=\\frac{3}{8}$.'), answer: { expected: f(3, 8) } },
            { id: 39, difficulty: 'hard', question: say('Gaur eguzkia badago, bihar ere egoteko probabilitatea $\\frac{3}{4}$ da; gaur hodeitsu badago, bihar ere hodeitsu egoteko probabilitatea $\\frac{2}{3}$. Gaur, ostirala, eguzkia dago. Zein da igandean eguzkia egoteko probabilitatea?', 'Si hoy hace sol, la probabilidad de que mañana también haga sol es $\\frac{3}{4}$; si hoy está nublado, la de que mañana siga nublado es $\\frac{2}{3}$. Hoy, viernes, hace sol. ¿Cuál es la probabilidad de que el domingo haga sol?', 'إذا كان الجو اليوم مشمسًا فاحتمال أن يكون غدًا مشمسًا أيضًا $\\frac{3}{4}$، وإذا كان غائمًا فاحتمال أن يبقى غدًا غائمًا $\\frac{2}{3}$. اليوم الجمعة مشمس. ما احتمال أن يكون الأحد مشمسًا؟'), solution: say('Larunbata eguzkitsu edo hodeitsu: $\\frac{3}{4}\\cdot\\frac{3}{4}+\\frac{1}{4}\\cdot\\frac{1}{3}=\\frac{9}{16}+\\frac{1}{12}=\\frac{31}{48}$.', 'El sábado, sol o nublado: $\\frac{3}{4}\\cdot\\frac{3}{4}+\\frac{1}{4}\\cdot\\frac{1}{3}=\\frac{9}{16}+\\frac{1}{12}=\\frac{31}{48}$.', 'السبت مشمس أو غائم: $\\frac{3}{4}\\cdot\\frac{3}{4}+\\frac{1}{4}\\cdot\\frac{1}{3}=\\frac{9}{16}+\\frac{1}{12}=\\frac{31}{48}$.'), answer: { expected: f(31, 48) } },
            { id: 40, difficulty: 'hard', question: say('Lantegi batean, A makinak piezen % 60 egiten du eta B-k % 40. A-renen % 2 eta B-renen % 5 akastunak dira. Pieza bat akastuna bada, zein da A-k egin izanaren probabilitatea?', 'En una fábrica, la máquina A hace el 60 % de las piezas y la B el 40 %. Son defectuosas el 2 % de las de A y el 5 % de las de B. Si una pieza es defectuosa, ¿cuál es la probabilidad de que la hiciera la A?', 'في مصنع تصنع الآلة A 60 % من القطع والآلة B 40 %. المعيب 2 % من قطع A و5 % من قطع B. إذا كانت قطعة معيبة، فما احتمال أن تكون A صنعتها؟'), solution: same('$0{,}6\\cdot 0{,}02+0{,}4\\cdot 0{,}05=0{,}012+0{,}02=0{,}032$; $\\frac{0{,}012}{0{,}032}=0{,}375$'), answer: { expected: f(3, 8) } }
        ]
    },
    {
        id: 'counting',
        title: say('Zenbatu eta erabaki', 'Contar y decidir', 'العدّ والقرار'),
        items: [
            { id: 41, difficulty: 'easy', question: say('Hiru dado botatzen dira. Zenbat kasu posible daude?', 'Se lanzan tres dados. ¿Cuántos casos posibles hay?', 'تُرمى ثلاثة نرود. كم حالة ممكنة؟'), solution: same('$6^{3}=216$'), answer: { expected: n(216) } },
            { id: 42, difficulty: 'easy', question: say('Zozketa batek 1000 txartel saltzen ditu 1 €-an, eta 600 €-ko sari bat du. Zein da txartel bakoitzaren irabazi itxaropena?', 'Una rifa vende 1000 papeletas a 1 € y tiene un premio de 600 €. ¿Cuál es la ganancia esperada de cada papeleta?', 'يبيع سحب 1000 بطاقة بسعر 1 € وله جائزة قيمتها 600 €. ما الربح المتوقع لكل بطاقة؟'), solution: same('$600\\cdot\\frac{1}{1000}-1=0{,}6-1=-0{,}4$'), answer: { expected: f(-4, 10) } },
            { id: 43, difficulty: 'easy', question: say('Poltsa batean 3 bola gorri eta 2 urdin daude. 2 ateratzen dira batera. Zein da biak gorriak izateko probabilitatea? (Erabili konbinazioak.)', 'Una bolsa tiene 3 bolas rojas y 2 azules. Se sacan 2 a la vez. ¿Cuál es la probabilidad de que las dos sean rojas? (Usa combinaciones.)', 'في كيس 3 كرات حمراء وكرتان زرقاوان. تُسحب كرتان معًا. ما احتمال أن تكونا حمراوين؟ (استعمل التوافيق.)'), solution: same('$\\frac{\\text{C}_{3,2}}{\\text{C}_{5,2}}=\\frac{3}{10}$'), answer: { expected: f(3, 10) } },
            { id: 44, difficulty: 'medium', question: say('Bost lagun zoriz esertzen dira jarraian dauden bost butakatan. Zein da Alberto eta Julia elkarren ondoan geratzeko probabilitatea?', 'Cinco amigos se sientan al azar en cinco butacas seguidas. ¿Cuál es la probabilidad de que Alberto y Julia queden juntos?', 'يجلس خمسة أصدقاء عشوائيًا على خمسة مقاعد متتالية. ما احتمال أن يجلس ألبرتو وخوليا متجاورين؟'), solution: say('Posibleak: $5!=120$. Aldekoak: 4 bikote ondoan, 2 ordena eta besteentzat $3!$: $4\\cdot 2\\cdot 6=48$. $\\frac{48}{120}=\\frac{2}{5}$.', 'Posibles: $5!=120$. Favorables: 4 pares contiguos, 2 órdenes y $3!$ para los demás: $4\\cdot 2\\cdot 6=48$. $\\frac{48}{120}=\\frac{2}{5}$.', 'الممكنة: $5!=120$. الملائمة: 4 أزواج متجاورة وترتيبان و$3!$ للبقية: $4\\cdot 2\\cdot 6=48$. $\\frac{48}{120}=\\frac{2}{5}$.'), answer: { expected: f(2, 5) } },
            { id: 45, difficulty: 'medium', question: say('Bi dado botatzen dira. Zein da puntuazio handiena 3 izateko probabilitatea?', 'Se lanzan dos dados. ¿Cuál es la probabilidad de que la mayor puntuación sea 3?', 'يُرمى نردان. ما احتمال أن تكون أكبر نتيجة 3؟'), solution: same('$\\frac{3^{2}-2^{2}}{36}=\\frac{5}{36}$'), answer: { expected: f(5, 36) } },
            { id: 46, difficulty: 'medium', question: say('Hiru dado botatzen dira. Zein da justu bi sei ateratzeko probabilitatea?', 'Se lanzan tres dados. ¿Cuál es la probabilidad de sacar exactamente dos seises?', 'تُرمى ثلاثة نرود. ما احتمال الحصول على ستّتين بالضبط؟'), solution: say('Sei ez den dadoa: 3 leku eta 5 balio. $\\frac{3\\cdot 5}{216}=\\frac{15}{216}=\\frac{5}{72}$.', 'El dado que no es seis: 3 lugares y 5 valores. $\\frac{3\\cdot 5}{216}=\\frac{15}{216}=\\frac{5}{72}$.', 'النرد الذي ليس ستة: 3 أماكن و5 قيم. $\\frac{3\\cdot 5}{216}=\\frac{15}{216}=\\frac{5}{72}$.'), answer: { expected: f(5, 72) } },
            { id: 47, difficulty: 'medium', question: say('Kutxa batean 4 bola gorri, 5 berde eta 1 urdin daude. 3 ateratzen dira batera. Zein da gorri bat eta bi berde ateratzeko probabilitatea?', 'Una urna tiene 4 bolas rojas, 5 verdes y 1 azul. Se sacan 3 a la vez. ¿Cuál es la probabilidad de 1 roja y 2 verdes?', 'في جرّة 4 كرات حمراء و5 خضراء وواحدة زرقاء. تُسحب 3 معًا. ما احتمال حمراء واحدة وخضراوين؟'), solution: same('$\\frac{\\text{C}_{4,1}\\cdot\\text{C}_{5,2}}{\\text{C}_{10,3}}=\\frac{4\\cdot 10}{120}=\\frac{1}{3}$'), answer: { expected: f(1, 3) } },
            { id: 48, difficulty: 'hard', question: say('Lupe P-tik R-ra doa sare batean: 6 urrats eskuinera eta 4 gora, zoriz aukeratutako bide labur batetik. Q puntua P-tik 5 eskuinera eta 2 gora dago. Zein da Q-tik pasatzeko probabilitatea?', 'Lupe va de P a R en una cuadrícula: 6 pasos a la derecha y 4 hacia arriba, por un camino corto elegido al azar. Q está 5 pasos a la derecha y 2 arriba de P. ¿Cuál es la probabilidad de que pase por Q?', 'تذهب لوبي من P إلى R في شبكة: 6 خطوات إلى اليمين و4 إلى الأعلى، عبر مسار قصير مختار عشوائيًا. تقع Q على بعد 5 خطوات يمينًا وخطوتين إلى الأعلى من P. ما احتمال أن تمرّ بـQ؟'), solution: say('Bide guztiak: $\\text{C}_{10,4}=210$. P-tik Q-ra $\\text{C}_{7,2}=21$ eta Q-tik R-ra $\\text{C}_{3,2}=3$: $\\frac{21\\cdot 3}{210}=\\frac{63}{210}=0{,}3$.', 'Todos los caminos: $\\text{C}_{10,4}=210$. De P a Q, $\\text{C}_{7,2}=21$, y de Q a R, $\\text{C}_{3,2}=3$: $\\frac{21\\cdot 3}{210}=\\frac{63}{210}=0{,}3$.', 'كل المسارات: $\\text{C}_{10,4}=210$. من P إلى Q $\\text{C}_{7,2}=21$، ومن Q إلى R $\\text{C}_{3,2}=3$: $\\frac{21\\cdot 3}{210}=\\frac{63}{210}=0{,}3$.'), answer: { expected: f(3, 10) } },
            { id: 49, difficulty: 'hard', question: say('Hiru dado botatzen dira. Zein da puntuazio handiena 6 izateko probabilitatea?', 'Se lanzan tres dados. ¿Cuál es la probabilidad de que la mayor puntuación sea 6?', 'تُرمى ثلاثة نرود. ما احتمال أن تكون أكبر نتيجة 6؟'), solution: say('Aurkakoa: seirik ez, $5^{3}=125$. $\\frac{216-125}{216}=\\frac{91}{216}$.', 'El contrario: ningún seis, $5^{3}=125$. $\\frac{216-125}{216}=\\frac{91}{216}$.', 'المعاكس: لا ستة، $5^{3}=125$. $\\frac{216-125}{216}=\\frac{91}{216}$.'), answer: { expected: f(91, 216) } },
            { id: 50, difficulty: 'hard', question: say('Joko bat: bi dado botatzen dituzu; batura 7 bada $x$ € irabazten dituzu, eta bestela 1 € galtzen. Zenbat izan behar du $x$-k jokoa bidezkoa izan dadin?', 'Un juego: lanzas dos dados; si la suma es 7 ganas $x$ €, y si no pierdes 1 €. ¿Cuánto debe valer $x$ para que el juego sea equitativo?', 'لعبة: ترمي نردين؛ إذا كان المجموع 7 تربح $x$ €، وإلا تخسر 1 €. كم يجب أن تكون $x$ لتكون اللعبة عادلة؟'), solution: say('$x\\cdot\\frac{1}{6}-1\\cdot\\frac{5}{6}=0$, beraz $x=5$.', '$x\\cdot\\frac{1}{6}-1\\cdot\\frac{5}{6}=0$, así que $x=5$.', '$x\\cdot\\frac{1}{6}-1\\cdot\\frac{5}{6}=0$، إذن $x=5$.'), answer: { expected: n(5) } }
        ]
    }
]
