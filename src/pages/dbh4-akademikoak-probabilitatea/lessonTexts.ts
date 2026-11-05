import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { ProbabilityAkTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Probabilitatea · 4. DBH akademikoak — what each lesson tells: a short
   explanation, the example as an exercise («Another example»), the key
   words in four languages and, in three lessons, «Why does it work?».
   Plain data so the tests can import it; lessons.tsx merges it into the
   topics. Basque writes the per cent sign first (% 70); Arabic writes the
   decimal point ({,} becomes .).
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const probabilityAkLessonTexts: Record<ProbabilityAkTopicId, LessonTexts> = {
    /* ---------- 1. Events ---------- */
    experiments: {
        vocabulary: [
            say('ausazko esperimentua', 'experimento aleatorio', 'تجربة عشوائية', 'random experiment'),
            say('lagin-espazioa', 'espacio muestral', 'فضاء العيّنة', 'sample space'),
            say('gertaera', 'suceso', 'حدث', 'event')
        ],
        explanation: say(
            'Esperimentu bat ausazkoa da emaitza aurretik jakin ezin bada, posible guztiak ezagutu arren. Lagin-espazioa, $E$, emaitza guztien multzoa da; bakoitza gertaera elemental bat da. Gertaera bat $E$ multzoaren azpimultzo bat da. Esperimentu konposatuetan $E$ idazteko, erabili zuhaitz bat edo taula bat.',
            'Un experimento es aleatorio si no se puede saber el resultado antes de hacerlo, aunque se conozcan todos los posibles. El espacio muestral, $E$, es el conjunto de todos los resultados; cada uno es un suceso elemental. Un suceso es un subconjunto de $E$. Para escribir $E$ en experimentos compuestos, usa un árbol o una tabla.',
            'تكون التجربة عشوائية إذا لم يمكن معرفة نتيجتها مسبقًا مع معرفة كل النتائج الممكنة. وفضاء العيّنة $E$ هو مجموعة كل النتائج، وكل نتيجة حدث بسيط. والحدث مجموعة جزئية من $E$. ولكتابة $E$ في التجارب المركّبة استعمل شجرة أو جدولًا.',
            'An experiment is random if you cannot know the outcome beforehand, even though you know all the possible ones. The sample space, $E$, is the set of all outcomes; each one is an elementary event. An event is a subset of $E$. To write $E$ for compound experiments, use a tree or a table.'
        ),
        examplePrompt: say('Dado bat eta txanpon bat botatzen dira. Zenbat gertaera elemental daude? Idatzi «aurpegia eta zenbaki bikoitia» gertaera.', 'Se lanzan un dado y una moneda. ¿Cuántos sucesos elementales hay? Escribe el suceso «cara y número par».', 'يُرمى نرد وقطعة نقدية. كم حدثًا بسيطًا يوجد؟ اكتب الحدث «وجه وعدد زوجي».', 'A dice and a coin are thrown. How many elementary events are there? Write the event «heads and an even number».'),
        example: same('$\\begin{gathered}6\\cdot 2=12\\\\ \\{\\text{C}2,\\ \\text{C}4,\\ \\text{C}6\\}\\end{gathered}$'),
        exampleAnswer: say('Dadoaren aurpegi bakoitza C edo + aukerarekin elkartzen da: 12 emaitza.', 'Cada cara del dado se junta con C o +: 12 resultados.', 'كل وجه من النرد يقترن بـ C أو +: 12 نتيجة.', 'Each face of the dice goes with C or +: 12 outcomes.')
    },
    operations: {
        vocabulary: [
            say('bildura', 'unión', 'الاتحاد', 'union'),
            say('ebakidura', 'intersección', 'التقاطع', 'intersection'),
            say('aurkako gertaera', 'suceso contrario', 'الحدث المعاكس', 'complementary event')
        ],
        explanation: say(
            '$A\\cup B$ bildura gertatzen da $A$ edo $B$ (edo biak) gertatzen badira; $A\\cap B$ ebakidura, biak batera gertatzen badira. Aurkako gertaera, $\\overline{A}$, $A$ gertatzen ez denean gertatzen da: $A$ multzoan ez dauden $E$ multzoko emaitzak dira. Beti $A\\cup\\overline{A}=E$, eta $A\\cap\\overline{A}$ gertaera ezinezkoa da, $\\varnothing$.',
            'La unión $A\\cup B$ ocurre si ocurre $A$ o $B$ (o los dos); la intersección $A\\cap B$, si ocurren los dos a la vez. El suceso contrario, $\\overline{A}$, ocurre cuando no ocurre $A$: son los resultados de $E$ que no están en $A$. Siempre $A\\cup\\overline{A}=E$, y $A\\cap\\overline{A}$ es el suceso imposible, $\\varnothing$.',
            'يقع الاتحاد $A\\cup B$ إذا وقع $A$ أو $B$ (أو كلاهما)، والتقاطع $A\\cap B$ إذا وقعا معًا. والحدث المعاكس $\\overline{A}$ يقع عندما لا يقع $A$: هو نتائج $E$ التي ليست في $A$. ودائمًا $A\\cup\\overline{A}=E$، و$A\\cap\\overline{A}$ هو الحدث المستحيل $\\varnothing$.',
            'The union $A\\cup B$ happens if $A$ or $B$ (or both) happen; the intersection $A\\cap B$, if both happen at once. The complementary event, $\\overline{A}$, happens when $A$ does not: it is the outcomes of $E$ that are not in $A$. Always $A\\cup\\overline{A}=E$, and $A\\cap\\overline{A}$ is the impossible event, $\\varnothing$.'
        ),
        examplePrompt: say('Dado bat botatzen da. $A$ = «bikoitia» eta $B$ = «3 baino handiagoa». Idatzi $A\\cup B$, $A\\cap B$ eta $\\overline{B}$.', 'Se lanza un dado. $A$ = «par» y $B$ = «mayor que 3». Escribe $A\\cup B$, $A\\cap B$ y $\\overline{B}$.', 'يُرمى نرد. $A$ = «زوجي» و$B$ = «أكبر من 3». اكتب $A\\cup B$ و$A\\cap B$ و$\\overline{B}$.', 'A dice is thrown. $A$ = «even» and $B$ = «greater than 3». Write $A\\cup B$, $A\\cap B$ and $\\overline{B}$.'),
        example: same('$\\begin{gathered}A\\cup B=\\{2,4,5,6\\}\\qquad A\\cap B=\\{4,6\\}\\\\ \\overline{B}=\\{1,2,3\\}\\end{gathered}$'),
        exampleAnswer: say('Bildurak biak elkartzen ditu; ebakidurak, komunak bakarrik.', 'La unión junta los dos; la intersección, solo los comunes.', 'الاتحاد يجمع الحدثين، والتقاطع المشترك فقط.', 'The union puts both together; the intersection, only the shared ones.')
    },
    compatible: {
        vocabulary: [
            say('bateragarriak', 'compatibles', 'متوافقان', 'compatible'),
            say('bateraezinak', 'incompatibles', 'متنافيان', 'mutually exclusive')
        ],
        explanation: say(
            'Bi gertaera bateraezinak dira batera gerta ezin badira: $A\\cap B=\\varnothing$. Batera gerta badaitezke, bateragarriak dira. Gertaera bat eta haren aurkakoa beti dira bateraezinak, eta biek $E$ osatzen dute, baina bi bateraezin ez dira zertan aurkakoak izan. De Morganen legeek «ez… ez…» esaldietan laguntzen dute: $\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$.',
            'Dos sucesos son incompatibles si no pueden ocurrir a la vez: $A\\cap B=\\varnothing$. Si pueden ocurrir juntos, son compatibles. Un suceso y su contrario siempre son incompatibles, y juntos forman $E$, pero dos incompatibles no tienen por qué ser contrarios. Las leyes de De Morgan ayudan con «ni… ni…»: $\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$.',
            'يكون الحدثان متنافيين إذا لم يمكن وقوعهما معًا: $A\\cap B=\\varnothing$. وإذا أمكن وقوعهما معًا فهما متوافقان. والحدث ومعاكسه متنافيان دائمًا ومعًا يشكّلان $E$، لكن المتنافيين ليسا بالضرورة متعاكسين. وقانونا دي مورغان يساعدان مع «لا… ولا…»: $\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$.',
            'Two events are mutually exclusive if they cannot happen at once: $A\\cap B=\\varnothing$. If they can happen together, they are compatible. An event and its complement are always mutually exclusive, and together they make $E$, but two mutually exclusive events need not be complements. De Morgan\'s laws help with «neither… nor…»: $\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$.'
        ),
        examplePrompt: say('Dado bat botatzen da. Bateragarriak dira «6 ateratzea» eta «bikoitia ateratzea»? Eta «1 ateratzea» eta «4 baino gehiago ateratzea»?', 'Se lanza un dado. ¿Son compatibles «sacar 6» y «sacar par»? ¿Y «sacar 1» y «sacar más de 4»?', 'يُرمى نرد. هل «ظهور 6» و«ظهور عدد زوجي» متوافقان؟ وهل «ظهور 1» و«ظهور أكثر من 4»؟', 'A dice is thrown. Are «getting 6» and «getting an even number» compatible? And «getting 1» and «getting more than 4»?'),
        example: same('$\\begin{gathered}\\{6\\}\\cap\\{2,4,6\\}=\\{6\\}\\\\ \\{1\\}\\cap\\{5,6\\}=\\varnothing\\end{gathered}$'),
        exampleAnswer: say('Lehenengoak bateragarriak dira; bigarrenak, bateraezinak (baina ez aurkakoak).', 'Los primeros son compatibles; los segundos, incompatibles (pero no contrarios).', 'الأولان متوافقان، والآخران متنافيان (لكنهما ليسا متعاكسين).', 'The first pair are compatible; the second, mutually exclusive (but not complements).')
    },

    /* ---------- 2. Probability ---------- */
    frequency: {
        vocabulary: [
            say('maiztasun erlatiboa', 'frecuencia relativa', 'التكرار النسبي', 'relative frequency'),
            say('probabilitatea', 'probabilidad', 'الاحتمال', 'probability')
        ],
        explanation: say(
            'Esperimentu bat askotan errepikatzen bada, gertaera baten maiztasun erlatiboa, $\\frac{f}{N}$, zenbaki baten inguruan egonkortzen da: haren probabilitatea. Horregatik, kalkulatu ezin denean, errepikapen askorekin estimatzen da. Eta alderantziz: probabilitatearekin, batez beste zenbat aldiz gertatuko den aurresaten da, $N\\cdot P$.',
            'Si un experimento se repite muchas veces, la frecuencia relativa de un suceso, $\\frac{f}{N}$, se estabiliza alrededor de un número: su probabilidad. Por eso, cuando no se puede calcular, se estima con muchas repeticiones. Y al revés: con la probabilidad se predice cuántas veces ocurrirá de media, $N\\cdot P$.',
            'إذا كُرّرت تجربة مرات كثيرة يستقر التكرار النسبي لحدث $\\frac{f}{N}$ حول عدد: هو احتماله. لذلك عندما لا يمكن حسابه نقدّره بتكرارات كثيرة. وبالعكس: بالاحتمال نتنبأ بعدد مرات وقوعه في المتوسط $N\\cdot P$.',
            'If an experiment is repeated many times, the relative frequency of an event, $\\frac{f}{N}$, settles around a number: its probability. So, when it cannot be worked out, it is estimated with many repetitions. And the other way round: the probability predicts how many times it will happen on average, $N\\cdot P$.'
        ),
        examplePrompt: say('Dado trukatu batek 6 ematen du 1000 jaurtiketatik 230 aldiz. Estimatu $P(6)$ eta zenbat sei espero dituzun 600 jaurtiketatan.', 'Un dado trucado da 6 en 230 de 1000 lanzamientos. Estima $P(6)$ y cuántos seises esperas en 600 lanzamientos.', 'نرد مغشوش يعطي 6 في 230 من 1000 رمية. قدّر $P(6)$ وكم ستة تتوقع في 600 رمية.', 'A loaded dice gives 6 in 230 of 1,000 throws. Estimate $P(6)$ and how many sixes you expect in 600 throws.'),
        example: same('$\\begin{gathered}\\frac{230}{1000}=0{,}23\\\\ 0{,}23\\cdot 600=138\\end{gathered}$'),
        exampleAnswer: say('138 sei inguru; dado arrunt batekin 100 inguru izango lirateke.', 'Unos 138 seises; con un dado normal serían unos 100.', 'نحو 138 ستة؛ ومع نرد عادي نحو 100.', 'About 138 sixes; with a normal dice it would be about 100.')
    },
    laplace: {
        vocabulary: [
            say('Laplaceren erregela', 'regla de Laplace', 'قاعدة لابلاس', 'Laplace\'s rule'),
            say('aldeko kasuak', 'casos favorables', 'الحالات الملائمة', 'favourable cases'),
            say('kasu posibleak', 'casos posibles', 'الحالات الممكنة', 'possible cases')
        ],
        explanation: say(
            'Emaitza guztiak berdin probableak badira, gertaera baten probabilitatea aldeko kasuen kopurua zati kasu posibleena da (Laplaceren erregela). Aurretik, egiaztatu berdin probableak direla: bi daduren baturak ez dira, baina 36 bikoteak bai. Beti $0\\le P(A)\\le 1$.',
            'Si todos los resultados son igual de probables, la probabilidad de un suceso es el número de casos favorables entre el de casos posibles (regla de Laplace). Antes, comprueba que lo son: las sumas de dos dados no lo son, pero los 36 pares sí. Siempre $0\\le P(A)\\le 1$.',
            'إذا كانت كل النتائج متساوية الاحتمال فاحتمال حدث هو عدد الحالات الملائمة على عدد الحالات الممكنة (قاعدة لابلاس). وتحقّق أولًا من تساويها: مجاميع نردين ليست متساوية الاحتمال، لكن الأزواج الـ 36 كذلك. ودائمًا $0\\le P(A)\\le 1$.',
            'If all the outcomes are equally likely, the probability of an event is the number of favourable cases over the number of possible cases (Laplace\'s rule). First check that they are: the sums of two dice are not, but the 36 pairs are. Always $0\\le P(A)\\le 1$.'
        ),
        examplePrompt: say('3 bola gorri, 5 urdin eta 2 zuri dituen poltsa batetik bat ateratzen da. Kalkulatu urdina izateko probabilitatea, eta gorria ez izatekoa.', 'De una bolsa con 3 bolas rojas, 5 azules y 2 blancas se saca una. Calcula la probabilidad de que sea azul y la de que no sea roja.', 'من كيس فيه 3 كرات حمراء و5 زرقاء و2 بيضاء تُسحب كرة. احسب احتمال أن تكون زرقاء واحتمال ألا تكون حمراء.', 'From a bag with 3 red, 5 blue and 2 white balls, one is drawn. Work out the probability that it is blue and that it is not red.'),
        example: same('$\\begin{gathered}\\frac{5}{10}=\\frac{1}{2}\\\\ 1-\\frac{3}{10}=\\frac{7}{10}\\end{gathered}$'),
        exampleAnswer: say('10 kasu posible: 5 aldeko urdinarentzat eta 7 «ez gorria» gertaerarentzat.', '10 casos posibles: 5 favorables para azul y 7 para «no roja».', '10 حالات ممكنة: 5 ملائمة للزرقاء و7 لـ «ليست حمراء».', '10 possible cases: 5 favourable for blue and 7 for «not red».')
    },
    properties: {
        vocabulary: [
            say('gertaera ziurra', 'suceso seguro', 'الحدث الأكيد', 'certain event'),
            say('gertaera ezinezkoa', 'suceso imposible', 'الحدث المستحيل', 'impossible event')
        ],
        explanation: say(
            'Gertaera ziurraren probabilitatea 1 da, ezinezkoarena 0, eta aurkakoarena $P(\\overline{A})=1-P(A)$. $A$ eta $B$ bateraezinak badira, $P(A\\cup B)=P(A)+P(B)$; bateragarriak badira, bi aldiz batu den komuna kendu behar da: $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$.',
            'La probabilidad del suceso seguro es 1, la del suceso imposible 0, y la del contrario $P(\\overline{A})=1-P(A)$. Si $A$ y $B$ son incompatibles, $P(A\\cup B)=P(A)+P(B)$; si son compatibles, hay que restar lo común, que se ha sumado dos veces: $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$.',
            'احتمال الحدث الأكيد 1، واحتمال الحدث المستحيل 0، واحتمال المعاكس $P(\\overline{A})=1-P(A)$. إذا كان $A$ و$B$ متنافيين فإن $P(A\\cup B)=P(A)+P(B)$، وإذا كانا متوافقين فيجب طرح المشترك الذي جُمع مرتين: $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$.',
            'The probability of the certain event is 1, that of the impossible event 0, and that of the complement $P(\\overline{A})=1-P(A)$. If $A$ and $B$ are mutually exclusive, $P(A\\cup B)=P(A)+P(B)$; if they are compatible, subtract the shared part, which was added twice: $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$.'
        ),
        examplePrompt: say('$P(A)=0{,}5$, $P(B)=0{,}4$ eta $P(A\\cap B)=0{,}2$ badira, kalkulatu $P(A\\cup B)$ eta $P(\\overline{A\\cup B})$.', 'Si $P(A)=0{,}5$, $P(B)=0{,}4$ y $P(A\\cap B)=0{,}2$, calcula $P(A\\cup B)$ y $P(\\overline{A\\cup B})$.', 'إذا كان $P(A)=0{,}5$ و$P(B)=0{,}4$ و$P(A\\cap B)=0{,}2$ فاحسب $P(A\\cup B)$ و$P(\\overline{A\\cup B})$.', 'If $P(A)=0{,}5$, $P(B)=0{,}4$ and $P(A\\cap B)=0{,}2$, work out $P(A\\cup B)$ and $P(\\overline{A\\cup B})$.'),
        example: same('$\\begin{gathered}0{,}5+0{,}4-0{,}2=0{,}7\\\\ 1-0{,}7=0{,}3\\end{gathered}$'),
        exampleAnswer: say('% 30 ez dago ez $A$ multzoan ez $B$ multzoan.', 'El 30 % no está ni en $A$ ni en $B$.', '30 % ليست في $A$ ولا في $B$.', '30% is in neither $A$ nor $B$.'),
        why: {
            text: say(
                '$P(A)$ eta $P(B)$ batzean, bietan dauden emaitzak bi aldiz zenbatzen dira: behin $A$ multzoan eta beste behin $B$ multzoan. Horregatik kentzen da behin $P(A\\cap B)$. Bateraezinak badira, ez dago ezer komunik, eta ez da ezer kentzen.',
                'Al sumar $P(A)$ y $P(B)$, los resultados que están en los dos se cuentan dos veces: una en $A$ y otra en $B$. Por eso se resta una vez $P(A\\cap B)$. Si son incompatibles, no hay nada en común y no se resta nada.',
                'عند جمع $P(A)$ و$P(B)$ تُعدّ النتائج الموجودة في الاثنين مرتين: مرة في $A$ ومرة في $B$. لذلك نطرح $P(A\\cap B)$ مرة واحدة. وإذا كانا متنافيين فلا شيء مشترك ولا نطرح شيئًا.',
                'Adding $P(A)$ and $P(B)$ counts the outcomes that are in both twice: once in $A$ and once in $B$. That is why $P(A\\cap B)$ is subtracted once. If they are mutually exclusive, nothing is shared and nothing is subtracted.'
            )
        }
    },

    /* ---------- 3. Compound experiments ---------- */
    independent: {
        vocabulary: [
            say('independenteak', 'independientes', 'مستقلة', 'independent'),
            say('itzulita', 'con devolución', 'مع الإرجاع', 'with replacement')
        ],
        explanation: say(
            'Bi esperientzia independenteak dira baten emaitzak bestearen probabilitateak aldatzen ez baditu: bi dado botatzea, edo bi karta ateratzea lehena itzulita. Orduan, biak gertatzeko probabilitatea biderkadura da: $P(A\\cap B)=P(A)\\cdot P(B)$. «Gutxienez bat» hobeto kalkulatzen da aurkakoarekin.',
            'Dos experiencias son independientes si el resultado de una no cambia las probabilidades de la otra: lanzar dos dados, o sacar dos cartas con devolución de la primera. Entonces la probabilidad de que ocurran las dos cosas es el producto: $P(A\\cap B)=P(A)\\cdot P(B)$. «Al menos uno» se calcula mejor con el contrario.',
            'تكون تجربتان مستقلتين إذا لم تغيّر نتيجة إحداهما احتمالات الأخرى: رمي نردين، أو سحب ورقتين مع الإرجاع. عندئذ احتمال وقوع الأمرين معًا هو الجداء: $P(A\\cap B)=P(A)\\cdot P(B)$. و«واحد على الأقل» يُحسب أفضل بالمعاكس.',
            'Two experiments are independent if the result of one does not change the probabilities of the other: throwing two dice, or drawing two cards with replacement. Then the probability of both happening is the product: $P(A\\cap B)=P(A)\\cdot P(B)$. «At least one» is better worked out with the complement.'
        ),
        examplePrompt: say('Txanpon bat 4 aldiz botatzen da. Zein da gutxienez aurpegi bat ateratzeko probabilitatea?', 'Se lanza una moneda 4 veces. ¿Cuál es la probabilidad de sacar al menos una cara?', 'تُرمى قطعة نقدية 4 مرات. ما احتمال ظهور وجه واحد على الأقل؟', 'A coin is tossed 4 times. What is the probability of getting at least one head?'),
        example: same('$1-\\left(\\frac{1}{2}\\right)^{4}=1-\\frac{1}{16}=\\frac{15}{16}$'),
        exampleAnswer: say('Aurpegirik ez: $\\frac{1}{16}$; gutxienez bat, gainerakoa.', 'Ninguna cara: $\\frac{1}{16}$; al menos una, el resto.', 'لا وجه: $\\frac{1}{16}$؛ ووجه على الأقل: الباقي.', 'No heads: $\\frac{1}{16}$; at least one, the rest.')
    },
    dependent: {
        vocabulary: [
            say('mendekoak', 'dependientes', 'تابعة', 'dependent'),
            say('itzuli gabe', 'sin devolución', 'دون إرجاع', 'without replacement')
        ],
        explanation: say(
            'Itzuli gabe ateratzen bada, bigarren ateraldia lehenaren mendekoa da: kasu posibleak aldatzen dira, eta batzuetan aldekoak ere bai. Orduan, lehenaren probabilitatea biderkatzen da bigarrenarenaz, gertatutakoa jakinda: $P(A\\cap B)=P(A)\\cdot P(B/A)$. Urrats bakoitzean, kendu atera den bola.',
            'Si se saca sin devolución, la segunda extracción depende de la primera: cambian los casos posibles y, a veces, los favorables. Entonces se multiplica la probabilidad de la primera por la de la segunda sabiendo lo que ha pasado: $P(A\\cap B)=P(A)\\cdot P(B/A)$. En cada paso, quita la bola que ya ha salido.',
            'إذا كان السحب دون إرجاع فالسحبة الثانية تابعة للأولى: تتغير الحالات الممكنة وأحيانًا الملائمة. عندئذ نضرب احتمال الأولى في احتمال الثانية مع معرفة ما حدث: $P(A\\cap B)=P(A)\\cdot P(B/A)$. وفي كل خطوة احذف الكرة التي خرجت.',
            'If you draw without replacement, the second draw depends on the first: the possible cases change and, sometimes, the favourable ones. Then multiply the probability of the first by that of the second knowing what happened: $P(A\\cap B)=P(A)\\cdot P(B/A)$. At each step, take out the ball already drawn.'
        ),
        examplePrompt: say('40 kartako sorta batetik bi karta ateratzen dira, itzuli gabe. Zein da biak urreak izateko probabilitatea (10 daude)?', 'De una baraja de 40 se sacan dos cartas sin devolución. ¿Cuál es la probabilidad de que las dos sean oros (hay 10)?', 'تُسحب ورقتان من رزمة من 40 دون إرجاع. ما احتمال أن تكونا من الذهب (يوجد 10)؟', 'Two cards are drawn from a pack of 40 without replacement. What is the probability that both are coins (there are 10)?'),
        example: same('$\\frac{10}{40}\\cdot\\frac{9}{39}=\\frac{90}{1560}=\\frac{3}{52}$'),
        exampleAnswer: say('Lehen urrearen ondoren 9 urre eta 39 karta geratzen dira.', 'Tras el primer oro quedan 9 oros y 39 cartas.', 'بعد الورقة الأولى من الذهب يبقى 9 من الذهب و39 ورقة.', 'After the first coin card, 9 coins and 39 cards are left.')
    },
    trees: {
        vocabulary: [
            say('zuhaitz-diagrama', 'diagrama de árbol', 'مخطط الشجرة', 'tree diagram'),
            say('bidea', 'camino', 'المسار', 'path')
        ],
        explanation: say(
            'Zuhaitz-diagrama batean, adar bakoitzak bere probabilitatea darama, eta puntu beretik ateratzen diren adarrek 1 ematen dute batuta. Bide baten probabilitatea bere adarren biderkadura da. Gertaera bat hainbat bidetatik lortzen bada, haien probabilitateak batu egiten dira. Egiaztatzeko, bide guztiek batera 1 ematen dute.',
            'En un diagrama de árbol, cada rama lleva su probabilidad, y las ramas que salen de un mismo punto suman 1. La probabilidad de un camino es el producto de sus ramas. Si un suceso se consigue por varios caminos, se suman sus probabilidades. Para comprobar, todos los caminos juntos suman 1.',
            'في مخطط الشجرة يحمل كل فرع احتماله، ومجموع الفروع الخارجة من النقطة نفسها 1. واحتمال المسار جداء فروعه. وإذا تحقق حدث عبر عدة مسارات تُجمع احتمالاتها. وللتحقق: مجموع كل المسارات 1.',
            'In a tree diagram, each branch carries its probability, and the branches leaving the same point add up to 1. The probability of a path is the product of its branches. If an event is reached by several paths, their probabilities are added. To check, all the paths together add up to 1.'
        ),
        examplePrompt: say('Kutxa batek 4 bola gorri eta beltz 1 ditu. Bi ateratzen dira, itzuli gabe. Zein da beltza ateratzeko probabilitatea?', 'Una urna tiene 4 bolas rojas y 1 negra. Se sacan dos sin devolver. ¿Cuál es la probabilidad de que salga la negra?', 'جرّة فيها 4 كرات حمراء وكرة سوداء. تُسحب كرتان دون إرجاع. ما احتمال خروج السوداء؟', 'An urn has 4 red balls and 1 black one. Two are drawn without replacement. What is the probability that the black one comes out?'),
        example: same('$\\frac{1}{5}+\\frac{4}{5}\\cdot\\frac{1}{4}=\\frac{2}{5}$'),
        exampleAnswer: say('Bi bide: beltza lehena, edo gorria eta gero beltza.', 'Dos caminos: negra la primera, o roja y después negra.', 'مساران: السوداء أولًا، أو حمراء ثم سوداء.', 'Two paths: black first, or red and then black.')
    },

    /* ---------- 4. Conditional probability ---------- */
    contingency: {
        vocabulary: [
            say('kontingentzia-taula', 'tabla de contingencia', 'جدول التوافق', 'two-way table'),
            say('guztira', 'total', 'المجموع', 'total')
        ],
        explanation: say(
            'Kontingentzia-taula batek indibiduoak bi ezaugarriren arabera sailkatzen ditu, errenkaden eta zutabeen guztirakoekin. Barneko lauki bakoitza ebakidura bat da, eta guztirakoek probabilitate sinpleak ematen dituzte. Batuketekin eta kenketekin osatzen da, eta probabilitateak guztira orokorraz zatituta ateratzen dira.',
            'Una tabla de contingencia clasifica a los individuos según dos características, con el total de filas y columnas. Cada casilla interior es una intersección, y los totales dan las probabilidades simples. Se completa con sumas y restas, y las probabilidades salen dividiendo entre el total general.',
            'يصنّف جدول التوافق الأفراد حسب صفتين مع مجموع الصفوف والأعمدة. وكل خانة داخلية تقاطع، والمجاميع تعطي الاحتمالات البسيطة. ويُكمل بالجمع والطرح، وتُستخرج الاحتمالات بالقسمة على المجموع الكلي.',
            'A two-way table sorts the individuals by two features, with the totals of rows and columns. Each inner cell is an intersection, and the totals give the simple probabilities. It is completed with additions and subtractions, and the probabilities come from dividing by the grand total.'
        ),
        examplePrompt: say('200 pertsonatik, 120 hirikoak dira; hiriko 50 eta herriko 30 kirola egiten dute. Zein da zoriz aukeratutako pertsona batek kirola egiteko probabilitatea?', 'De 200 personas, 120 son de ciudad; 50 de ciudad y 30 de pueblo hacen deporte. ¿Qué probabilidad hay de que una persona al azar haga deporte?', 'من 200 شخص، 120 من المدينة؛ ويمارس الرياضة 50 من المدينة و30 من القرية. ما احتمال أن يمارس شخص مختار عشوائيًا الرياضة؟', 'Of 200 people, 120 live in town; 50 from town and 30 from villages do sport. What is the probability that a person chosen at random does sport?'),
        example: same('$\\frac{50+30}{200}=0{,}4$'),
        exampleAnswer: say('Kirolaren zutabearen guztirakoa 80 da, 200 pertsonatik.', 'El total de la columna del deporte es 80, de 200.', 'مجموع عمود الرياضة 80 من 200.', 'The total of the sport column is 80, out of 200.')
    },
    conditional: {
        vocabulary: [
            say('baldintzapeko probabilitatea', 'probabilidad condicionada', 'الاحتمال المشروط', 'conditional probability'),
            say('independenteak', 'independientes', 'مستقلة', 'independent')
        ],
        explanation: say(
            '$B$ gertatu dela jakinda $A$ gertaeraren probabilitatea $P(A/B)=\\frac{P(A\\cap B)}{P(B)}$ da: taulan, $B$ errenkada edo zutabea bakarrik begiratzen da. Oro har, $P(A/B)$ eta $P(B/A)$ desberdinak dira. $P(A/B)=P(A)$ bada, $B$ jakiteak ez du ezer aldatzen: $A$ eta $B$ independenteak dira.',
            'La probabilidad de $A$ sabiendo que ha ocurrido $B$ es $P(A/B)=\\frac{P(A\\cap B)}{P(B)}$: en la tabla, solo se mira la fila o la columna de $B$. En general, $P(A/B)$ y $P(B/A)$ son distintas. Si $P(A/B)=P(A)$, saber $B$ no cambia nada: $A$ y $B$ son independientes.',
            'احتمال $A$ مع العلم بوقوع $B$ هو $P(A/B)=\\frac{P(A\\cap B)}{P(B)}$: في الجدول ننظر إلى صف $B$ أو عموده فقط. وعمومًا $P(A/B)$ و$P(B/A)$ مختلفان. وإذا كان $P(A/B)=P(A)$ فمعرفة $B$ لا تغيّر شيئًا: $A$ و$B$ مستقلان.',
            'The probability of $A$ knowing that $B$ has happened is $P(A/B)=\\frac{P(A\\cap B)}{P(B)}$: in the table, look only at the row or column of $B$. In general, $P(A/B)$ and $P(B/A)$ are different. If $P(A/B)=P(A)$, knowing $B$ changes nothing: $A$ and $B$ are independent.'
        ),
        examplePrompt: say('$P(A\\cap B)=0{,}15$ eta $P(B)=0{,}6$ badira, kalkulatu $P(A/B)$.', 'Si $P(A\\cap B)=0{,}15$ y $P(B)=0{,}6$, calcula $P(A/B)$.', 'إذا كان $P(A\\cap B)=0{,}15$ و$P(B)=0{,}6$ فاحسب $P(A/B)$.', 'If $P(A\\cap B)=0{,}15$ and $P(B)=0{,}6$, work out $P(A/B)$.'),
        example: same('$P(A/B)=\\frac{0{,}15}{0{,}6}=0{,}25$'),
        exampleAnswer: say('$B$ barruan, lau alditik behin $A$ ere gertatzen da.', 'Dentro de $B$, una de cada cuatro veces ocurre también $A$.', 'داخل $B$ يقع $A$ أيضًا مرة من كل أربع.', 'Within $B$, one time in four $A$ happens too.'),
        why: {
            text: say(
                '$B$ gertatu dela jakiteak kasu posibleak $B$ multzokoetara murrizten ditu. Haietatik, $A$ multzoan ere daudenak dira aldekoak: $A\\cap B$. Horregatik zatitzen da $P(A\\cap B)$ zati $P(B)$, ez zati 1.',
                'Saber que ha ocurrido $B$ reduce los casos posibles a los de $B$. De ellos, son favorables los que también están en $A$: $A\\cap B$. Por eso se divide $P(A\\cap B)$ entre $P(B)$, y no entre 1.',
                'معرفة وقوع $B$ تحصر الحالات الممكنة في حالات $B$. ومنها الملائمة هي الموجودة في $A$ أيضًا: $A\\cap B$. لذلك نقسم $P(A\\cap B)$ على $P(B)$ لا على 1.',
                'Knowing that $B$ has happened cuts the possible cases down to those of $B$. Of them, the favourable ones are those also in $A$: $A\\cap B$. That is why $P(A\\cap B)$ is divided by $P(B)$, not by 1.'
            )
        }
    },
    total: {
        vocabulary: [
            say('probabilitate osoa', 'probabilidad total', 'الاحتمال الكلي', 'total probability'),
            say('bidea', 'camino', 'المسار', 'path')
        ],
        explanation: say(
            'Emaitza bat hainbat bidetatik lor badaiteke (hainbat kutxa, makina edo taldetatik), haren probabilitate osoa bideen batura da: $P(B)=P(A_1)\\cdot P(B/A_1)+P(A_2)\\cdot P(B/A_2)$. Atzerantz joateko (nondik etorri zen), bide bat zatitzen da guztirakoaz.',
            'Si un resultado se puede alcanzar por varios caminos (desde varias urnas, máquinas o grupos), su probabilidad total es la suma de los caminos: $P(B)=P(A_1)\\cdot P(B/A_1)+P(A_2)\\cdot P(B/A_2)$. Para ir hacia atrás (de dónde vino), se divide un camino entre el total.',
            'إذا أمكن الوصول إلى نتيجة عبر عدة مسارات (من عدة جرار أو آلات أو مجموعات) فاحتمالها الكلي مجموع المسارات: $P(B)=P(A_1)\\cdot P(B/A_1)+P(A_2)\\cdot P(B/A_2)$. وللرجوع إلى الوراء (من أين جاءت) نقسم مسارًا على المجموع.',
            'If an outcome can be reached by several paths (from several urns, machines or groups), its total probability is the sum of the paths: $P(B)=P(A_1)\\cdot P(B/A_1)+P(A_2)\\cdot P(B/A_2)$. To go backwards (where it came from), divide one path by the total.'
        ),
        examplePrompt: say('A makinak piezen % 70 egiten du, % 2 akastunekin, eta B makinak % 30, % 5 akastunekin. Piezen zer ehuneko da akastuna?', 'Una máquina A hace el 70 % de las piezas, con un 2 % defectuosas, y la B el 30 %, con un 5 %. ¿Qué porcentaje de piezas es defectuoso?', 'الآلة A تصنع 70 % من القطع منها 2 % معيبة، والآلة B تصنع 30 % منها 5 % معيبة. ما نسبة القطع المعيبة؟', 'Machine A makes 70% of the parts, with 2% faulty, and B 30%, with 5%. What percentage of the parts is faulty?'),
        example: same('$0{,}7\\cdot 0{,}02+0{,}3\\cdot 0{,}05=0{,}029$'),
        exampleAnswer: say('Piezen % 2,9 akastunak dira.', 'El 2,9 % de las piezas es defectuoso.', '2.9 % من القطع معيبة.', '2.9% of the parts are faulty.')
    },

    /* ---------- 5. Counting and deciding ---------- */
    'with-combinations': {
        vocabulary: [
            say('kasu posibleak', 'casos posibles', 'الحالات الممكنة', 'possible cases'),
            say('aldeko kasuak', 'casos favorables', 'الحالات الملائمة', 'favourable cases')
        ],
        explanation: say(
            'Kasu asko daudenean, konbinatoriarekin zenbatzen dira, eta gero Laplaceren erregela aplikatzen da. Hainbat elementu batera ateratzen badira, ordenak ez du axola: kasu posibleak eta aldekoak konbinazioekin. Itzuli gabeko probabilitateen biderkadurarekin gauza bera ateratzen da.',
            'Cuando hay muchos casos, se cuentan con combinatoria y después se aplica la regla de Laplace. Si se sacan varios elementos a la vez, el orden no importa: casos posibles y favorables con combinaciones. Sale lo mismo que con el producto de probabilidades sin devolución.',
            'عندما تكثر الحالات نعدّها بالتحليل التوافقي ثم نطبّق قاعدة لابلاس. وإذا سُحبت عدة عناصر معًا فالترتيب غير مهم: الحالات الممكنة والملائمة بالتوافيق. والنتيجة نفسها بجداء الاحتمالات دون إرجاع.',
            'When there are many cases, count them with combinatorics and then apply Laplace\'s rule. If several elements are drawn at once, the order does not matter: possible and favourable cases with combinations. It gives the same as the product of probabilities without replacement.'
        ),
        examplePrompt: say('12 ikasleko gela batean 5 neska dira. 2 zoriz aukeratzen dira. Zein da biak neskak izateko probabilitatea?', 'En una clase de 12 alumnos, 5 son chicas. Se eligen 2 al azar. ¿Cuál es la probabilidad de que sean dos chicas?', 'في صف من 12 تلميذًا 5 فتيات. يُختار اثنان عشوائيًا. ما احتمال أن تكونا فتاتين؟', 'In a class of 12 pupils, 5 are girls. 2 are chosen at random. What is the probability that both are girls?'),
        example: same('$\\frac{\\text{C}_{5,2}}{\\text{C}_{12,2}}=\\frac{10}{66}=\\frac{5}{33}$'),
        exampleAnswer: say('Biderkadurarekin: $\\frac{5}{12}\\cdot\\frac{4}{11}=\\frac{20}{132}=\\frac{5}{33}$.', 'Con el producto: $\\frac{5}{12}\\cdot\\frac{4}{11}=\\frac{20}{132}=\\frac{5}{33}$.', 'بالجداء: $\\frac{5}{12}\\cdot\\frac{4}{11}=\\frac{20}{132}=\\frac{5}{33}$.', 'With the product: $\\frac{5}{12}\\cdot\\frac{4}{11}=\\frac{20}{132}=\\frac{5}{33}$.')
    },
    'several-dice': {
        vocabulary: [
            say('dadoa', 'dado', 'النرد', 'dice'),
            say('puntuazioa', 'puntuación', 'النتيجة', 'score')
        ],
        explanation: say(
            '$n$ dadorekin $6^{n}$ emaitza daude, guztiak berdin probableak. «Puntuaziorik handiena $k$» lortzeko, zenbatu «denak $\\le k$» ken «denak $\\le k-1$»: $k^{n}-(k-1)^{n}$. «Denak desberdinak» lortzeko, aldakuntzak: $6\\cdot 5\\cdot 4\\cdots$. Eta «gutxienez sei bat» lortzeko, aurkakoa: $1-\\left(\\frac{5}{6}\\right)^{n}$.',
            'Con $n$ dados hay $6^{n}$ resultados, todos igual de probables. Para «la mayor puntuación es $k$», cuenta «todas $\\le k$» menos «todas $\\le k-1$»: $k^{n}-(k-1)^{n}$. Para «todas distintas», variaciones: $6\\cdot 5\\cdot 4\\cdots$. Y para «al menos un seis», el contrario: $1-\\left(\\frac{5}{6}\\right)^{n}$.',
            'مع $n$ نردًا توجد $6^{n}$ نتيجة كلها متساوية الاحتمال. ولـ «أكبر نتيجة $k$» عدّ «كلها $\\le k$» ناقص «كلها $\\le k-1$»: $k^{n}-(k-1)^{n}$. ولـ «كلها مختلفة» التراتيب: $6\\cdot 5\\cdot 4\\cdots$. ولـ «ستة واحدة على الأقل» المعاكس: $1-\\left(\\frac{5}{6}\\right)^{n}$.',
            'With $n$ dice there are $6^{n}$ outcomes, all equally likely. For «the highest score is $k$», count «all $\\le k$» minus «all $\\le k-1$»: $k^{n}-(k-1)^{n}$. For «all different», arrangements: $6\\cdot 5\\cdot 4\\cdots$. And for «at least one six», the complement: $1-\\left(\\frac{5}{6}\\right)^{n}$.'
        ),
        examplePrompt: say('Bi dado botatzen dira. Zein da gutxienez sei bat ateratzeko probabilitatea?', 'Se lanzan dos dados. ¿Cuál es la probabilidad de sacar al menos un seis?', 'يُرمى نردان. ما احتمال ظهور ستة واحدة على الأقل؟', 'Two dice are thrown. What is the probability of getting at least one six?'),
        example: same('$1-\\frac{5}{6}\\cdot\\frac{5}{6}=1-\\frac{25}{36}=\\frac{11}{36}$'),
        exampleAnswer: say('Seirik ez: $\\frac{25}{36}$; gutxienez bat, gainerakoa.', 'Ningún seis: $\\frac{25}{36}$; al menos uno, el resto.', 'لا ستة: $\\frac{25}{36}$؛ وستة على الأقل: الباقي.', 'No six: $\\frac{25}{36}$; at least one, the rest.')
    },
    'fair-games': {
        vocabulary: [
            say('itxaropena', 'esperanza', 'الأمل', 'expected value'),
            say('joko bidezkoa', 'juego equitativo', 'لعبة عادلة', 'fair game')
        ],
        explanation: say(
            'Joko baten itxaropena partida bakoitzeko batez besteko irabazia da: irabazi (edo galera, ken zeinuarekin) bakoitza bider bere probabilitatea, eta dena batuta. Itxaropena 0 bada, jokoa bidezkoa da; positiboa bada, jokalariaren alde dago; negatiboa bada, bankaren alde. Loteriek itxaropen negatiboa dute.',
            'La esperanza de un juego es la ganancia media por partida: cada ganancia (o pérdida, con signo menos) por su probabilidad, y todo sumado. Si la esperanza es 0, el juego es equitativo; si es positiva, favorece al jugador; si es negativa, a la banca. Las loterías tienen esperanza negativa.',
            'الأمل الرياضي للعبة هو متوسط الربح في الجولة: كل ربح (أو خسارة بإشارة سالبة) في احتماله ثم الجمع. إذا كان الأمل 0 فاللعبة عادلة، وإذا كان موجبًا فهي لصالح اللاعب، وإذا كان سالبًا فلصالح البنك. وللياناصيب أمل سالب.',
            'The expected value of a game is the average gain per round: each gain (or loss, with a minus sign) times its probability, all added up. If the expected value is 0, the game is fair; if it is positive, it favours the player; if negative, the bank. Lotteries have a negative expected value.'
        ),
        examplePrompt: say('Zozketa batek 500 txartel saltzen ditu, bakoitza 2 €, eta sari bakarra dago: 600 €. Zein da txartel baten itxaropena?', 'Una rifa vende 500 boletos a 2 €, y hay un premio de 600 €. ¿Cuál es la esperanza de un boleto?', 'يانصيب يبيع 500 تذكرة بـ 2 €، وفيه جائزة 600 €. ما الأمل الرياضي للتذكرة الواحدة؟', 'A raffle sells 500 tickets at €2, and there is one prize of €600. What is the expected value of a ticket?'),
        example: same('$600\\cdot\\frac{1}{500}-2=-0{,}8$'),
        exampleAnswer: say('Batez beste, 0,80 € galtzen dira txartel bakoitzeko: ez da bidezkoa.', 'De media se pierden 0,80 € por boleto: no es equitativo.', 'في المتوسط نخسر 0.80 € في كل تذكرة: ليست عادلة.', 'On average you lose €0.80 per ticket: it is not fair.'),
        why: {
            text: say(
                'Askotan jokatzen bada, emaitza bakoitza bere probabilitatearen antzeko partida-proportzio batean ateratzen da. Horrela, irabazi osoa irabazi bider probabilitate gisa banatzen da: itxaropena partida bakoitzean batez beste irabazten dena da.',
                'Si se juega muchas veces, cada resultado sale en una proporción de partidas parecida a su probabilidad. Así, la ganancia total se reparte como cada ganancia por su probabilidad: la esperanza es lo que se gana de media en cada partida.',
                'إذا لُعبت اللعبة مرات كثيرة تظهر كل نتيجة في نسبة من الجولات قريبة من احتمالها. وهكذا يتوزع الربح الكلي على كل ربح في احتماله: الأمل هو ما يُربح في المتوسط في كل جولة.',
                'If you play many times, each outcome comes up in a share of rounds close to its probability. So the total gain splits into each gain times its probability: the expected value is what you win on average per round.'
            )
        }
    }
}
