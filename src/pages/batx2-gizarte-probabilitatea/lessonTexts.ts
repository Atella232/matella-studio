import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { ProbabilityBatx2gTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Probabilitatea · Batxilergoa 2 · Gizarte Zientziak — what each lesson
   tells: the new words, a short explanation, the example as an exercise
   («Another example»), the key words in four languages and, in several
   lessons, «Why does it work?». Plain data so the tests can import it;
   lessons.tsx merges it into the topics. The example uses numbers of its
   own, never those of «Let's solve», of «Check it» or of the mistake.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const probabilityBatx2gLessonTexts: Record<ProbabilityBatx2gTopicId, LessonTexts> = {
    /* ---------- 1. Learning to count ---------- */
    variations: {
        definitions: [
            { term: say('Aldakuntza', 'Variación', 'الترتيب', 'Arrangement'), meaning: say('$n$ elementutatik $k$ aukeratzeko modu bat, ordenak axola duela.', 'Una forma de elegir $k$ elementos de $n$ en la que el orden importa.', 'طريقة لاختيار $k$ عنصرًا من $n$ يكون فيها الترتيب مهمًّا.', 'A way of choosing $k$ elements out of $n$ in which the order matters.') }
        ],
        vocabulary: [
            say('ordena', 'orden', 'الترتيب', 'order'),
            say('errepikatu', 'repetir', 'التكرار', 'repeat')
        ],
        explanation: say(
            'Zenbatu aurretik, egin bi galdera. Ordenak axola du? (kargu, txanda edo posizio desberdinak badaude, bai). Elementu bera errepika daiteke? Ordenarekin eta errepikatu gabe, aldakuntzak dira: aukera bakoitza aurrekoa baino bat gutxiago. Errepika badaiteke, toki guztietan $n$ aukera.',
            'Antes de contar, haz dos preguntas. ¿Importa el orden? (sí, si hay cargos, turnos o puestos distintos). ¿Se puede repetir un elemento? Con orden y sin repetir son variaciones: cada elección tiene una opción menos que la anterior. Si se puede repetir, hay $n$ opciones en cada puesto.',
            'قبل العدّ اطرح سؤالين. هل يهم الترتيب؟ (نعم إذا كانت هناك مناصب أو أدوار أو مراكز مختلفة). هل يمكن تكرار عنصر؟ مع الترتيب ودون تكرار فهي تراتيب: كل اختيار فيه خيار أقل من السابق. وإذا جاز التكرار ففي كل مركز $n$ خيارات.',
            'Before counting, ask two questions. Does the order matter? (yes, if there are different posts, turns or places). Can an element be repeated? With order and without repeating they are arrangements: each choice has one option fewer than the one before. If repeating is allowed, there are $n$ options in each place.'
        ),
        examplePrompt: say('5 letrako alfabeto batekin, zenbat 3 letrako kode egin daitezke, letrak errepika badaitezke?', '¿Cuántos códigos de 3 letras se forman con un alfabeto de 5 letras si se pueden repetir?', 'كم رمزًا من 3 أحرف يمكن تكوينه من أبجدية من 5 أحرف إذا جاز التكرار؟', 'How many 3-letter codes can be made from an alphabet of 5 letters if letters can be repeated?'),
        example: same('$VR_{5,3}=5^3=125$'),
        exampleAnswer: say('125 kode: hiru tokietako bakoitzean 5 aukera.', '125 códigos: 5 opciones en cada uno de los tres puestos.', '125 رمزًا: 5 خيارات في كل مركز من المراكز الثلاثة.', '125 codes: 5 options in each of the three places.'),
        why: {
            text: say('Lehen tokia betetzeko modu bakoitzak bigarrena betetzeko modu guztiak ditu: zuhaitz baten adarrak bezala biderkatzen dira. Errepikatu gabe, aukeratutakoa ez dago jada.', 'Cada forma de llenar el primer puesto se combina con todas las del segundo: se multiplican, como las ramas de un árbol. Sin repetir, el elegido ya no está.', 'كل طريقة لملء المركز الأول تقترن بكل طرق ملء الثاني: تُضرب مثل فروع الشجرة. ودون تكرار لا يعود المختار متاحًا.', 'Each way of filling the first place goes with every way of filling the second: they multiply, like the branches of a tree. Without repeating, the one chosen is gone.')
        }
    },
    permutations: {
        definitions: [
            { term: say('Faktoriala', 'Factorial', 'المضروب', 'Factorial'), meaning: say('$n!=n\\cdot(n-1)\\cdots 2\\cdot 1$, 1 eta $n$ arteko zenbaki guztien biderkadura.', '$n!=n\\cdot(n-1)\\cdots 2\\cdot 1$, el producto de todos los números del 1 al $n$.', '$n!=n\\cdot(n-1)\\cdots 2\\cdot 1$، جداء كل الأعداد من 1 إلى $n$.', '$n!=n\\cdot(n-1)\\cdots 2\\cdot 1$, the product of all the numbers from 1 to $n$.') }
        ],
        vocabulary: [
            say('permutazioa', 'permutación', 'التبديل', 'permutation'),
            say('ordenatu', 'ordenar', 'ترتيب', 'put in order')
        ],
        explanation: say(
            'Elementu guztiak ordenatzen direnean, errepikatu gabe, permutazio bat da. Lehen tokirako $n$ aukera daude, bigarrenerako $n-1$, eta azkenerako bakarra. Biderkadura hori faktoriala da: $n!$. Azkar hazten da: 10 elementuk milioika ordena dituzte.',
            'Cuando se ordenan todos los elementos sin repetir, es una permutación. Para el primer puesto hay $n$ opciones, para el segundo $n-1$, y para el último una sola. Ese producto es el factorial: $n!$. Crece muy deprisa: 10 elementos tienen millones de órdenes.',
            'عندما تُرتَّب كل العناصر دون تكرار يكون ذلك تبديلًا. للمركز الأول $n$ خيارات، وللثاني $n-1$، وللأخير خيار واحد. وهذا الجداء هو المضروب: $n!$. وهو ينمو بسرعة كبيرة: لـ 10 عناصر ملايين الترتيبات.',
            'When all the elements are put in order without repeating, it is a permutation. There are $n$ options for the first place, $n-1$ for the second, and only one for the last. That product is the factorial: $n!$. It grows very fast: 10 elements have millions of orders.'
        ),
        examplePrompt: say('Zenbat modutan eser daitezke 4 lagun 4 eserlekutan?', '¿De cuántas formas se pueden sentar 4 amigos en 4 butacas?', 'بكم طريقة يمكن أن يجلس 4 أصدقاء على 4 مقاعد؟', 'In how many ways can 4 friends sit in 4 seats?'),
        example: same('$P_4=4!=24$'),
        exampleAnswer: say('24 modu.', '24 formas.', '24 طريقة.', '24 ways.')
    },
    combinations: {
        definitions: [
            { term: say('Konbinazioa', 'Combinación', 'التوفيقة', 'Combination'), meaning: say('$n$ elementutatik $k$ aukeratzeko modu bat, ordenak axola ez duela: talde bat, ez zerrenda bat.', 'Una forma de elegir $k$ elementos de $n$ en la que el orden no importa: un grupo, no una lista.', 'طريقة لاختيار $k$ عنصرًا من $n$ لا يهم فيها الترتيب: مجموعة لا قائمة.', 'A way of choosing $k$ elements out of $n$ in which the order does not matter: a group, not a list.') }
        ],
        vocabulary: [
            say('batzordea', 'comisión', 'اللجنة', 'committee'),
            say('taldea', 'grupo', 'المجموعة', 'group')
        ],
        explanation: say(
            'Batzorde, talde edo zozketa batean, kide berek talde bera osatzen dute edozein ordenatan. Lehenik ordenarekin zenbatzen da ($V_{n,k}$), eta gero zati $k!$ egiten da, talde bakoitza $k!$ zerrendatan agertzen delako.',
            'En una comisión, un grupo o un sorteo, los mismos miembros forman el mismo grupo en cualquier orden. Primero se cuenta con orden ($V_{n,k}$) y después se divide entre $k!$, porque cada grupo aparece en $k!$ listas.',
            'في اللجنة أو المجموعة أو القرعة يكوّن الأعضاء أنفسهم المجموعة نفسها بأي ترتيب. نعدّ أولًا مع الترتيب ($V_{n,k}$) ثم نقسم على $k!$ لأن كل مجموعة تظهر في $k!$ قائمة.',
            'In a committee, a group or a draw, the same members make the same group in any order. First count with order ($V_{n,k}$) and then divide by $k!$, because each group appears in $k!$ lists.'
        ),
        examplePrompt: say('Menu batek 6 postreetatik 2 aukeratzen uzten du. Zenbat aukeraketa daude?', 'Un menú deja elegir 2 postres de 6. ¿Cuántas elecciones hay?', 'تسمح قائمة طعام باختيار حلويين من 6. كم اختيارًا هناك؟', 'A menu lets you choose 2 desserts out of 6. How many choices are there?'),
        example: same('$C_{6,2}=\\frac{6\\cdot 5}{2}=15$'),
        exampleAnswer: say('15 aukeraketa.', '15 elecciones.', '15 اختيارًا.', '15 choices.'),
        why: {
            text: say('3 pertsonako batzorde bakoitza $3!=6$ zerrenda desberdinetan agertzen da (ABC, ACB, BAC…). Zerrendak zati 6 eginda, talde bakoitza behin zenbatzen da.', 'Cada comisión de 3 aparece en $3!=6$ listas distintas (ABC, ACB, BAC…). Al dividir las listas entre 6, cada grupo se cuenta una vez.', 'كل لجنة من 3 تظهر في $3!=6$ قوائم مختلفة (ABC وACB وBAC…). وبقسمة القوائم على 6 تُحسب كل مجموعة مرة واحدة.', 'Each committee of 3 appears in $3!=6$ different lists (ABC, ACB, BAC…). Dividing the lists by 6 counts each group once.')
        }
    },
    'counting-laplace': {
        definitions: [
            { term: say('Zozketa', 'Sorteo', 'القرعة', 'Draw'), meaning: say('Emaitza guztiek aukera bera duten aukeraketa: Laplace erabil daiteke.', 'Una elección en la que todos los resultados tienen la misma oportunidad: se puede usar Laplace.', 'اختيار تتساوى فيه فرص كل النتائج: يمكن استعمال لابلاس.', 'A choice in which every outcome has the same chance: Laplace can be used.') }
        ],
        vocabulary: [
            say('aldeko kasuak', 'casos favorables', 'الحالات الملائمة', 'favourable cases'),
            say('kasu posibleak', 'casos posibles', 'الحالات الممكنة', 'possible cases')
        ],
        explanation: say(
            'Zozketa batean, Laplaceren erregela erabiltzen da: aldeko kasuak zati kasu posibleak. Kasuak asko direnean, konbinatoriarekin zenbatzen dira. Garrantzitsua: aldeko kasuak eta kasu posibleak irizpide berarekin zenbatu, biak ordenarekin edo biak ordenarik gabe.',
            'En un sorteo se usa la regla de Laplace: casos favorables entre casos posibles. Cuando los casos son muchos, se cuentan con combinatoria. Lo importante: contar los favorables y los posibles con el mismo criterio, los dos con orden o los dos sin orden.',
            'في القرعة نستعمل قاعدة لابلاس: الحالات الملائمة على الحالات الممكنة. وعندما تكثر الحالات تُعدّ بالتوافيق. والمهم: عدّ الحالات الملائمة والممكنة بالمعيار نفسه، كلاهما بترتيب أو كلاهما دونه.',
            'In a draw you use Laplace\'s rule: favourable cases over possible cases. When there are many cases, they are counted with combinatorics. What matters: count the favourable and the possible cases in the same way, both with order or both without.'
        ),
        examplePrompt: say('9 pertsonatik 5 pertsonak ingelesez hitz egiten dute. 2 zozketatzen dira. Zein da biek ingelesez hitz egiteko probabilitatea?', 'De 9 personas, 5 hablan inglés. Se sortean 2. ¿Qué probabilidad hay de que las dos hablen inglés?', 'من 9 أشخاص يتكلم 5 الإنجليزية. تُجرى قرعة لاثنين. ما احتمال أن يتكلم الاثنان الإنجليزية؟', 'Of 9 people, 5 speak English. 2 are drawn. What is the probability that both speak English?'),
        example: same('$\\frac{C_{5,2}}{C_{9,2}}=\\frac{10}{36}=\\frac{5}{18}$'),
        exampleAnswer: say('Probabilitatea $\\frac{5}{18}$ da.', 'La probabilidad es $\\frac{5}{18}$.', 'الاحتمال $\\frac{5}{18}$.', 'The probability is $\\frac{5}{18}$.')
    },

    /* ---------- 2. Events and Laplace ---------- */
    events: {
        definitions: [
            { term: say('Gertaera', 'Suceso', 'الحدث', 'Event'), meaning: say('Esperimentu aleatorio baten emaitzen multzo bat.', 'Un conjunto de resultados de un experimento aleatorio.', 'مجموعة من نتائج تجربة عشوائية.', 'A set of outcomes of a random experiment.') },
            { term: say('Bateraezinak', 'Incompatibles', 'متنافيان', 'Mutually exclusive'), meaning: say('Batera gertatu ezin diren bi gertaera: $A\\cap B=\\varnothing$.', 'Dos sucesos que no pueden ocurrir a la vez: $A\\cap B=\\varnothing$.', 'حدثان لا يمكن أن يقعا معًا: $A\\cap B=\\varnothing$.', 'Two events that cannot happen together: $A\\cap B=\\varnothing$.') }
        ],
        vocabulary: [
            say('bildura', 'unión', 'الاتحاد', 'union'),
            say('ebakidura', 'intersección', 'التقاطع', 'intersection'),
            say('aurkakoa', 'contrario', 'المعاكس', 'complement')
        ],
        explanation: say(
            'Inkesta batean, gertaerak galderak dira: «autoa du», «gaztea da». $A\\cup B$ bildura gertatzen da bat gutxienez betetzen bada; $A\\cap B$ ebakidura, biak betetzen badira; $\\overline{A}$ aurkakoa, $A$ betetzen ez bada. Venn diagrama batek lau zona ditu.',
            'En una encuesta, los sucesos son preguntas: «tiene coche», «es joven». La unión $A\\cup B$ ocurre si se cumple al menos uno; la intersección $A\\cap B$, si se cumplen los dos; el contrario $\\overline{A}$, si no se cumple $A$. Un diagrama de Venn tiene cuatro zonas.',
            'في الاستطلاع تكون الأحداث أسئلة: «لديه سيارة» و«شاب». يقع الاتحاد $A\\cup B$ إذا تحقق واحد على الأقل، والتقاطع $A\\cap B$ إذا تحقق الاثنان، والمعاكس $\\overline{A}$ إذا لم يتحقق $A$. ولمخطط فن أربع مناطق.',
            'In a poll, events are questions: ‘has a car’, ‘is young’. The union $A\\cup B$ happens if at least one holds; the intersection $A\\cap B$, if both hold; the complement $\\overline{A}$, if $A$ does not hold. A Venn diagram has four zones.'
        ),
        examplePrompt: say('Dado bat botatzen da. $A$ = «bikoitia» eta $B$ = «3 baino handiagoa». Idatzi $A\\cap B$.', 'Se lanza un dado. $A$ = «par» y $B$ = «mayor que 3». Escribe $A\\cap B$.', 'يُرمى نرد. $A$ = «زوجي» و$B$ = «أكبر من 3». اكتب $A\\cap B$.', 'A die is rolled. $A$ = «even» and $B$ = «greater than 3». Write $A\\cap B$.'),
        example: same('$A\\cap B=\\{4,6\\}$'),
        exampleAnswer: say('4 eta 6 bakarrik dira bikoitiak eta 3 baino handiagoak.', 'Solo el 4 y el 6 son pares y mayores que 3.', 'العددان 4 و6 وحدهما زوجيان وأكبر من 3.', 'Only 4 and 6 are even and greater than 3.')
    },
    frequency: {
        definitions: [
            { term: say('Maiztasun erlatiboa', 'Frecuencia relativa', 'التكرار النسبي', 'Relative frequency'), meaning: say('Gertaera zenbat aldiz gertatu den zati errepikapen kopurua.', 'Las veces que ha ocurrido el suceso entre el número de repeticiones.', 'عدد مرات وقوع الحدث على عدد التكرارات.', 'The number of times the event happened divided by the number of repetitions.') }
        ],
        vocabulary: [
            say('estimazioa', 'estimación', 'التقدير', 'estimate'),
            say('inkesta', 'encuesta', 'الاستطلاع', 'poll')
        ],
        explanation: say(
            'Dado edo zozketa batean, emaitzak berdin probableak dira eta Laplace erabiltzen da. Iritzi edo ohitura batean ez: probabilitatea inkesta baten maiztasun erlatiboarekin estimatzen da. Zenbat eta pertsona gehiagori galdetu, orduan eta estimazio hobea (zenbaki handien legea).',
            'En un dado o un sorteo los resultados son igual de probables y se usa Laplace. En una opinión o un hábito no: la probabilidad se estima con la frecuencia relativa de una encuesta. Cuantas más personas se pregunten, mejor es la estimación (ley de los grandes números).',
            'في النرد أو القرعة تكون النتائج متساوية الاحتمال ونستعمل لابلاس. أما في رأي أو عادة فلا: يُقدَّر الاحتمال بالتكرار النسبي لاستطلاع. وكلما سُئل أشخاص أكثر كان التقدير أفضل (قانون الأعداد الكبيرة).',
            'With a die or a draw the outcomes are equally likely and Laplace is used. With an opinion or a habit they are not: the probability is estimated with the relative frequency of a poll. The more people asked, the better the estimate (law of large numbers).'
        ),
        examplePrompt: say('Tren bat 250 egunetatik 30 egunetan iritsi da berandu. Estimatu berandu iristeko probabilitatea.', 'Un tren ha llegado tarde 30 de 250 días. Estima la probabilidad de que llegue tarde.', 'تأخر قطار 30 يومًا من 250. قدّر احتمال أن يتأخر.', 'A train has been late on 30 of 250 days. Estimate the probability that it is late.'),
        example: same('$\\frac{30}{250}=0{,}12$'),
        exampleAnswer: say('$0{,}12$ inguru: egunen % 12.', 'Unos $0{,}12$: el 12 % de los días.', 'نحو $0{,}12$: أي 12 % من الأيام.', 'About $0{,}12$: 12% of the days.')
    },
    union: {
        vocabulary: [
            say('bateragarriak', 'compatibles', 'متوافقان', 'compatible'),
            say('propietatea', 'propiedad', 'الخاصية', 'property')
        ],
        explanation: say(
            'Bi gertaera bateragarriak direnean, $P(A)$ eta $P(B)$ batzean, biak betetzen dituztenak bi aldiz zenbatzen dira: horregatik kentzen da ebakidura behin. Bateraezinak badira, batzea nahikoa da. Propietate hauekin ez da Venn diagramarik marraztu behar, baina laguntzen du.',
            'Cuando dos sucesos son compatibles, al sumar $P(A)$ y $P(B)$ los que cumplen los dos se cuentan dos veces: por eso se resta una vez la intersección. Si son incompatibles, basta con sumar. Con estas propiedades no hace falta dibujar el diagrama de Venn, pero ayuda.',
            'عندما يكون الحدثان متوافقين، فعند جمع $P(A)$ و$P(B)$ يُحسب من يحقق الاثنين مرتين: لذلك نطرح التقاطع مرة. وإذا كانا متنافيين يكفي الجمع. وبهذه الخاصية لا يلزم رسم مخطط فن، لكنه يساعد.',
            'When two events are compatible, adding $P(A)$ and $P(B)$ counts twice those who meet both: that is why the intersection is taken away once. If they are mutually exclusive, adding is enough. With these properties there is no need to draw the Venn diagram, but it helps.'
        ),
        examplePrompt: say('$P(A)=0{,}5$, $P(B)=0{,}4$ eta $P(A\\cap B)=0{,}15$. Zenbat da $P(\\overline{A}\\cap\\overline{B})$?', '$P(A)=0{,}5$, $P(B)=0{,}4$ y $P(A\\cap B)=0{,}15$. ¿Cuánto vale $P(\\overline{A}\\cap\\overline{B})$?', '$P(A)=0{,}5$ و$P(B)=0{,}4$ و$P(A\\cap B)=0{,}15$. كم يساوي $P(\\overline{A}\\cap\\overline{B})$؟', '$P(A)=0{,}5$, $P(B)=0{,}4$ and $P(A\\cap B)=0{,}15$. What is $P(\\overline{A}\\cap\\overline{B})$?'),
        example: same('$1-(0{,}5+0{,}4-0{,}15)=0{,}25$'),
        exampleAnswer: say('Ez $A$ ez $B$: $0{,}25$.', 'Ni $A$ ni $B$: $0{,}25$.', 'لا $A$ ولا $B$: $0{,}25$.', 'Neither $A$ nor $B$: $0{,}25$.'),
        why: {
            text: say('Venn diagraman, $P(A)$ eta $P(B)$ batzean, erdiko zona bi aldiz sartzen da. Behin kenduta, zona bakoitza behin geratzen da.', 'En el diagrama de Venn, al sumar $P(A)$ y $P(B)$ la zona del medio entra dos veces. Al restarla una vez, cada zona queda contada una vez.', 'في مخطط فن، عند جمع $P(A)$ و$P(B)$ تدخل المنطقة الوسطى مرتين. وبطرحها مرة تُحسب كل منطقة مرة واحدة.', 'In the Venn diagram, adding $P(A)$ and $P(B)$ puts the middle zone in twice. Taking it away once leaves each zone counted once.')
        }
    },
    'two-events': {
        definitions: [
            { term: say('Bat bakarrik', 'Solo uno', 'واحد فقط', 'Only one'), meaning: say('$A$ bai eta $B$ ez, edo $B$ bai eta $A$ ez: Venn diagramaren bi alboko zonak.', '$A$ y no $B$, o $B$ y no $A$: las dos zonas laterales del diagrama de Venn.', '$A$ وليس $B$، أو $B$ وليس $A$: المنطقتان الجانبيتان في مخطط فن.', '$A$ and not $B$, or $B$ and not $A$: the two side zones of the Venn diagram.') }
        ],
        vocabulary: [
            say('zona', 'zona', 'المنطقة', 'zone'),
            say('datua', 'dato', 'معطى', 'data')
        ],
        explanation: say(
            'Hautaprobetan, sarri hiru datu ematen dira ($P(A)$, $P(B)$ eta bildura edo ebakidura) eta beste zona bat eskatzen da. Lehenik ebakidura kalkulatzen da; gero, kenketaz, gainerako zonak: «$A$ bakarrik», «$B$ bakarrik» eta «bat ere ez». Lau zonek 1 egiten dute batuta.',
            'En la selectividad se suelen dar tres datos ($P(A)$, $P(B)$ y la unión o la intersección) y se pide otra zona. Primero se calcula la intersección; después, restando, las demás zonas: «solo $A$», «solo $B$» y «ninguno». Las cuatro zonas suman 1.',
            'في امتحان الدخول للجامعة تُعطى عادة ثلاث معطيات ($P(A)$ و$P(B)$ والاتحاد أو التقاطع) ويُطلب منطقة أخرى. نحسب التقاطع أولًا، ثم بالطرح بقية المناطق: «$A$ فقط» و«$B$ فقط» و«لا شيء». ومجموع المناطق الأربع 1.',
            'In the university entrance exam three data are often given ($P(A)$, $P(B)$ and the union or the intersection) and another zone is asked for. First work out the intersection; then, by subtracting, the other zones: ‘only $A$’, ‘only $B$’ and ‘neither’. The four zones add up to 1.'
        ),
        examplePrompt: say('$P(A)=0{,}7$ eta $P(A\\cap B)=0{,}25$. Zenbat da $P(A\\cap\\overline{B})$?', '$P(A)=0{,}7$ y $P(A\\cap B)=0{,}25$. ¿Cuánto vale $P(A\\cap\\overline{B})$?', '$P(A)=0{,}7$ و$P(A\\cap B)=0{,}25$. كم يساوي $P(A\\cap\\overline{B})$؟', '$P(A)=0{,}7$ and $P(A\\cap B)=0{,}25$. What is $P(A\\cap\\overline{B})$?'),
        example: same('$0{,}7-0{,}25=0{,}45$'),
        exampleAnswer: say('«$A$ bakarrik» zona: $0{,}45$.', 'La zona «solo $A$»: $0{,}45$.', 'منطقة «$A$ فقط»: $0{,}45$.', 'The ‘only $A$’ zone: $0{,}45$.')
    },

    /* ---------- 3. Tables and conditional probability ---------- */
    tables: {
        definitions: [
            { term: say('Kontingentzia-taula', 'Tabla de contingencia', 'جدول التوافق', 'Contingency table'), meaning: say('Bi ezaugarriren arabera (adina eta garraioa, adibidez) sailkatutako pertsonen zenbaketa duen taula.', 'Tabla con el recuento de personas clasificadas según dos características (edad y transporte, por ejemplo).', 'جدول فيه عدد الأشخاص مصنّفين حسب صفتين (العمر والنقل مثلًا).', 'A table with the count of people sorted by two features (age and transport, for example).') }
        ],
        vocabulary: [
            say('errenkada', 'fila', 'الصف', 'row'),
            say('zutabea', 'columna', 'العمود', 'column'),
            say('guztizkoa', 'total', 'المجموع', 'total')
        ],
        explanation: say(
            'Inkestetan, datuak taula batean antolatzen dira: errenkadetan ezaugarri bat eta zutabeetan bestea. Barruko laukiak bi ezaugarriak dituzten pertsonak dira (ebakidurak); ertzekoak, errenkada edo zutabearen guztizkoa. Probabilitate bat lauki bat zati guztizko nagusia da.',
            'En las encuestas, los datos se ordenan en una tabla: una característica en las filas y otra en las columnas. Las casillas interiores son las personas con las dos características (intersecciones); las de los bordes, el total de la fila o columna. Una probabilidad es una casilla entre el total general.',
            'في الاستطلاعات تُرتَّب البيانات في جدول: صفة في الصفوف وأخرى في الأعمدة. الخانات الداخلية هي الأشخاص الذين لهم الصفتان (تقاطعات)، وخانات الحواف مجموع الصف أو العمود. والاحتمال خانة على المجموع العام.',
            'In polls, the data are arranged in a table: one feature in the rows and another in the columns. The inner cells are the people with both features (intersections); those on the edges, the total of the row or column. A probability is a cell over the grand total.'
        ),
        examplePrompt: say('50 ikasletatik 30 neskak dira, eta horietatik 18 neskak kirola egiten dute. Zein da ikasle bat neska izateko eta kirolik ez egiteko probabilitatea?', 'De 50 alumnos, 30 son chicas y 18 de ellas hacen deporte. ¿Qué probabilidad hay de que un alumno sea chica y no haga deporte?', 'من 50 طالبًا، 30 فتاة، تمارس 18 منهن الرياضة. ما احتمال أن يكون طالب فتاة لا تمارس الرياضة؟', 'Of 50 students, 30 are girls and 18 of them do sport. What is the probability that a student is a girl who does no sport?'),
        example: same('$\\frac{30-18}{50}=\\frac{12}{50}=0{,}24$'),
        exampleAnswer: say('12 neskak ez dute kirolik egiten: $0{,}24$.', '12 chicas no hacen deporte: $0{,}24$.', '12 فتاة لا تمارس الرياضة: $0{,}24$.', '12 girls do no sport: $0{,}24$.')
    },
    conditional: {
        definitions: [
            { term: say('Probabilitate baldintzatua', 'Probabilidad condicionada', 'الاحتمال المشروط', 'Conditional probability'), meaning: say('$P(A/B)$: $A$ gertatzeko probabilitatea, $B$ gertatu dela jakinda.', '$P(A/B)$: la probabilidad de $A$ sabiendo que ha ocurrido $B$.', '$P(A/B)$: احتمال $A$ مع العلم بوقوع $B$.', '$P(A/B)$: the probability of $A$ knowing that $B$ has happened.') }
        ],
        vocabulary: [
            say('baldintza', 'condición', 'الشرط', 'condition'),
            say('osoko berria', 'nuevo total', 'الكل الجديد', 'new total')
        ],
        explanation: say(
            '$B$ gertatu dela badakigu, $B$ ez diren kasuak desagertzen dira: $B$ da osoko berria. Taula batean, $B$-ren errenkada edo zutabea bakarrik begiratzen da. Formulan, ebakidura zati baldintzaren probabilitatea. Kontuz: $P(A/B)$ eta $P(B/A)$ desberdinak dira, osoko berria aldatzen delako.',
            'Si sabemos que ha ocurrido $B$, desaparecen los casos que no son $B$: $B$ es el nuevo total. En una tabla se mira solo la fila o columna de $B$. En la fórmula, la intersección entre la probabilidad de la condición. Cuidado: $P(A/B)$ y $P(B/A)$ son distintas, porque cambia el nuevo total.',
            'إذا علمنا بوقوع $B$ تختفي الحالات التي ليست $B$: يصبح $B$ الكل الجديد. في الجدول ننظر فقط إلى صف $B$ أو عموده. وفي الصيغة: التقاطع على احتمال الشرط. انتبه: $P(A/B)$ و$P(B/A)$ مختلفان لأن الكل الجديد يتغيّر.',
            'If we know that $B$ has happened, the cases that are not $B$ disappear: $B$ is the new total. In a table you look only at the row or column of $B$. In the formula, the intersection over the probability of the condition. Careful: $P(A/B)$ and $P(B/A)$ are different, because the new total changes.'
        ),
        examplePrompt: say('80 bezerotatik 50 bezerok txartelarekin ordaintzen dute, eta horietatik 20 bezerok 60 urte baino gehiago dituzte. Zein da $P$(60 urtetik gora / txartela)?', 'De 80 clientes, 50 pagan con tarjeta y 20 de ellos tienen más de 60 años. ¿Cuánto vale $P$(más de 60 / tarjeta)?', 'من 80 زبونًا، يدفع 50 بالبطاقة، و20 منهم تزيد أعمارهم على 60 سنة. كم يساوي $P$(أكثر من 60 / بطاقة)؟', 'Of 80 customers, 50 pay by card and 20 of them are over 60. What is $P$(over 60 / card)?'),
        example: same('$\\frac{20}{50}=0{,}4$'),
        exampleAnswer: say('Txartelarekin ordaintzen dutenak dira osoko berria: $0{,}4$.', 'Los que pagan con tarjeta son el nuevo total: $0{,}4$.', 'من يدفعون بالبطاقة هم الكل الجديد: $0{,}4$.', 'Those who pay by card are the new total: $0{,}4$.'),
        why: {
            text: say('Probabilitateak osoko baten zatiak dira. $B$ jakitean, osokoa $B$ da; $A$-tik $B$ barruan dagoen zatia $A\\cap B$ da. Zatiketak zati hori $B$-ren gainean neurtzen du.', 'Las probabilidades son partes de un total. Al saber $B$, el total es $B$; la parte de $A$ que está dentro de $B$ es $A\\cap B$. La división mide esa parte sobre $B$.', 'الاحتمالات أجزاء من كل. عند العلم بـ $B$ يصبح الكل $B$، وجزء $A$ الواقع داخل $B$ هو $A\\cap B$. والقسمة تقيس ذلك الجزء نسبةً إلى $B$.', 'Probabilities are parts of a whole. Once $B$ is known, the whole is $B$; the part of $A$ inside $B$ is $A\\cap B$. The division measures that part against $B$.')
        }
    },
    independence: {
        definitions: [
            { term: say('Independenteak', 'Independientes', 'مستقلان', 'Independent'), meaning: say('Bata gertatzeak bestearen probabilitatea aldatzen ez duen bi gertaera.', 'Dos sucesos en los que que ocurra uno no cambia la probabilidad del otro.', 'حدثان لا يغيّر وقوع أحدهما احتمال الآخر.', 'Two events where one happening does not change the probability of the other.') }
        ],
        vocabulary: [
            say('biderkadura', 'producto', 'الجداء', 'product'),
            say('mendekoak', 'dependientes', 'تابعان', 'dependent')
        ],
        explanation: say(
            'Bi gertaera independenteak dira baldintzak ezer aldatzen ez badu: $P(A/B)=P(A)$. Egiaztatzeko modurik errazena biderkadura da: $P(A)\\cdot P(B)$ ebakiduraren berdina bada, independenteak dira; bestela, mendekoak. Inkesta batean, ezaugarri batek bestea ez duela azaltzen esan nahi du.',
            'Dos sucesos son independientes si la condición no cambia nada: $P(A/B)=P(A)$. La forma más fácil de comprobarlo es el producto: si $P(A)\\cdot P(B)$ es igual a la intersección, son independientes; si no, dependientes. En una encuesta significa que una característica no explica la otra.',
            'يكون الحدثان مستقلين إذا لم يغيّر الشرط شيئًا: $P(A/B)=P(A)$. وأسهل طريقة للتحقق هي الجداء: إذا ساوى $P(A)\\cdot P(B)$ التقاطع فهما مستقلان، وإلا فتابعان. وفي الاستطلاع يعني ذلك أن صفة لا تفسّر الأخرى.',
            'Two events are independent if the condition changes nothing: $P(A/B)=P(A)$. The easiest way to check is the product: if $P(A)\\cdot P(B)$ equals the intersection, they are independent; if not, dependent. In a poll it means that one feature does not explain the other.'
        ),
        examplePrompt: say('$P(A)=0{,}5$, $P(B)=0{,}6$ eta $P(A\\cap B)=0{,}35$. Independenteak dira?', '$P(A)=0{,}5$, $P(B)=0{,}6$ y $P(A\\cap B)=0{,}35$. ¿Son independientes?', '$P(A)=0{,}5$ و$P(B)=0{,}6$ و$P(A\\cap B)=0{,}35$. هل هما مستقلان؟', '$P(A)=0{,}5$, $P(B)=0{,}6$ and $P(A\\cap B)=0{,}35$. Are they independent?'),
        example: same('$0{,}5\\cdot 0{,}6=0{,}3\\neq 0{,}35$'),
        exampleAnswer: say('Ez: biderkadurak ez du ebakidura ematen. Mendekoak dira.', 'No: el producto no da la intersección. Son dependientes.', 'لا: الجداء لا يعطي التقاطع. إنهما تابعان.', 'No: the product does not give the intersection. They are dependent.'),
        why: {
            text: say('$P(A\\cap B)=P(B)\\cdot P(A/B)$ beti betetzen da. Independenteak badira, $P(A/B)=P(A)$, eta orduan ebakidura $P(A)\\cdot P(B)$ da.', 'Siempre se cumple $P(A\\cap B)=P(B)\\cdot P(A/B)$. Si son independientes, $P(A/B)=P(A)$, y entonces la intersección es $P(A)\\cdot P(B)$.', 'دائمًا $P(A\\cap B)=P(B)\\cdot P(A/B)$. وإذا كانا مستقلين فإن $P(A/B)=P(A)$، فيكون التقاطع $P(A)\\cdot P(B)$.', '$P(A\\cap B)=P(B)\\cdot P(A/B)$ always holds. If they are independent, $P(A/B)=P(A)$, and then the intersection is $P(A)\\cdot P(B)$.')
        }
    },
    trees: {
        definitions: [
            { term: say('Biderkaduraren erregela', 'Regla del producto', 'قاعدة الجداء', 'Product rule'), meaning: say('$P(A\\cap B)=P(A)\\cdot P(B/A)$: bigarren adarra baldintzatua da.', '$P(A\\cap B)=P(A)\\cdot P(B/A)$: la segunda rama es condicionada.', '$P(A\\cap B)=P(A)\\cdot P(B/A)$: الفرع الثاني مشروط.', '$P(A\\cap B)=P(A)\\cdot P(B/A)$: the second branch is conditional.') }
        ],
        vocabulary: [
            say('adarra', 'rama', 'الفرع', 'branch'),
            say('bidea', 'camino', 'المسار', 'path')
        ],
        explanation: say(
            'Zuhaitz batean, lehen adarrek lehen urratsaren probabilitateak dituzte, eta bigarrenek, lehenengoa gertatu dela jakinda (baldintzatuak). Itzuli gabe aukeratzean, bigarren urratsean elementu bat gutxiago dago. Bide baten probabilitatea bere adarren biderkadura da; gertaera batena, bere bideen batura.',
            'En un árbol, las primeras ramas llevan las probabilidades del primer paso, y las segundas, las de saber que ha ocurrido el primero (condicionadas). Al elegir sin devolución, en el segundo paso hay un elemento menos. La probabilidad de un camino es el producto de sus ramas; la de un suceso, la suma de sus caminos.',
            'في الشجرة تحمل الفروع الأولى احتمالات الخطوة الأولى، والثانية احتمالات مع العلم بوقوع الأولى (مشروطة). وعند الاختيار دون إرجاع ينقص عنصر في الخطوة الثانية. احتمال المسار جداء فروعه، واحتمال الحدث مجموع مساراته.',
            'In a tree, the first branches carry the probabilities of the first step, and the second ones, those of knowing that the first has happened (conditional). When choosing without replacement, there is one element fewer in the second step. The probability of a path is the product of its branches; that of an event, the sum of its paths.'
        ),
        examplePrompt: say('8 bonbillako sorta batean 2 hondatuta daude. 2 probatzen dira itzuli gabe. Zein da biak onak izateko probabilitatea?', 'Un lote de 8 bombillas tiene 2 fundidas. Se prueban 2 sin devolver. ¿Qué probabilidad hay de que las dos sean buenas?', 'في دفعة من 8 مصابيح 2 تالفان. يُجرَّب اثنان دون إرجاع. ما احتمال أن يكون الاثنان سليمين؟', 'A batch of 8 bulbs has 2 broken ones. 2 are tested without replacement. What is the probability that both are good?'),
        example: same('$\\frac{6}{8}\\cdot\\frac{5}{7}=\\frac{30}{56}=\\frac{15}{28}$'),
        exampleAnswer: say('Probabilitatea $\\frac{15}{28}$ da.', 'La probabilidad es $\\frac{15}{28}$.', 'الاحتمال $\\frac{15}{28}$.', 'The probability is $\\frac{15}{28}$.')
    },

    /* ---------- 4. Total probability and Bayes ---------- */
    total: {
        definitions: [
            { term: say('Sistema osoa', 'Sistema completo', 'النظام التام', 'Partition'), meaning: say('Binaka bateraezinak diren eta denen artean osoko guztia osatzen duten gertaerak.', 'Sucesos incompatibles dos a dos que entre todos forman el total.', 'أحداث متنافية مثنى مثنى تكوّن معًا الكل.', 'Pairwise mutually exclusive events that together make up the whole.') }
        ],
        vocabulary: [
            say('jatorria', 'origen', 'المصدر', 'source'),
            say('haztatua', 'ponderada', 'مرجّح', 'weighted')
        ],
        explanation: say(
            'Gertaera bat hainbat jatorritatik etor daitekeenean (biltegiak, eskualdeak, taldeak), jatorri bakoitzaren bidea kalkulatzen da: jatorriaren probabilitatea bider gertaerarena jatorri horretan. Probabilitate osoa bide horien batura da: tasen batez besteko haztatua, ez batez besteko hutsa.',
            'Cuando un suceso puede venir de varios orígenes (almacenes, zonas, grupos), se calcula el camino de cada origen: la probabilidad del origen por la del suceso en ese origen. La probabilidad total es la suma de esos caminos: una media ponderada de las tasas, no la media sin más.',
            'عندما يمكن أن يأتي حدث من عدة مصادر (مستودعات أو مناطق أو مجموعات) نحسب مسار كل مصدر: احتمال المصدر في احتمال الحدث في ذلك المصدر. والاحتمال الكلي مجموع هذه المسارات: متوسط مرجّح للنسب لا متوسط بسيط.',
            'When an event can come from several sources (warehouses, areas, groups), you work out the path of each source: the probability of the source times that of the event in that source. The total probability is the sum of those paths: a weighted mean of the rates, not the plain mean.'
        ),
        examplePrompt: say('Bezeroetatik % 55 eskudirutan ordaintzen dute eta % 45 txartelarekin. Eskupekoa uzten dutenak: lehenengoen artean % 30, eta bigarrenen artean % 50. Zein da $P$(eskupekoa)?', 'El 55 % de los clientes paga en efectivo y el 45 % con tarjeta; dejan propina el 30 % y el 50 %, respectivamente. ¿Cuánto vale $P$(propina)?', '55 % من الزبائن يدفعون نقدًا و45 % بالبطاقة؛ ويترك البقشيش 30 % و50 % منهم على الترتيب. كم يساوي $P$(بقشيش)؟', '55% of the customers pay in cash and 45% by card; 30% and 50% of them leave a tip, respectively. What is $P$(tip)?'),
        example: same('$0{,}55\\cdot 0{,}3+0{,}45\\cdot 0{,}5=0{,}39$'),
        exampleAnswer: say('Bezeroetatik % 39 uzten dute eskupekoa.', 'Deja propina el 39 % de los clientes.', 'يترك البقشيش 39 % من الزبائن.', '39% of the customers leave a tip.')
    },
    bayes: {
        definitions: [
            { term: say('A posteriori probabilitatea', 'Probabilidad a posteriori', 'الاحتمال البعدي', 'Posterior probability'), meaning: say('Jatorri baten probabilitatea, emaitza ikusi ondoren: $P(A_i/D)$.', 'La probabilidad de un origen después de ver el resultado: $P(A_i/D)$.', 'احتمال مصدر بعد رؤية النتيجة: $P(A_i/D)$.', 'The probability of a source after seeing the result: $P(A_i/D)$.') }
        ],
        vocabulary: [
            say('a priori', 'a priori', 'قبلي', 'prior'),
            say('emaitza', 'resultado', 'النتيجة', 'result')
        ],
        explanation: say(
            'Bayesek galdera alderantziz egiten du: emaitza ($D$) ikusi dugu eta jatorria zein den galdetzen dugu. Osoko berria $D$ da, hau da, probabilitate osoa; zenbakitzailea jatorri horren bidea da. Gehien ekoizten duen jatorria ez da beti a posteriori probableena.',
            'Bayes hace la pregunta al revés: hemos visto el resultado ($D$) y preguntamos de qué origen viene. El nuevo total es $D$, es decir, la probabilidad total; el numerador es el camino de ese origen. El origen que más produce no siempre es el más probable a posteriori.',
            'يطرح بايز السؤال بالعكس: رأينا النتيجة ($D$) ونسأل من أي مصدر جاءت. الكل الجديد هو $D$ أي الاحتمال الكلي، والبسط مسار ذلك المصدر. والمصدر الأكثر إنتاجًا ليس دائمًا الأكثر احتمالًا بعديًّا.',
            'Bayes asks the question the other way round: we have seen the result ($D$) and ask which source it comes from. The new total is $D$, that is, the total probability; the numerator is the path of that source. The source that produces most is not always the most likely one afterwards.'
        ),
        examplePrompt: say('Eskaeren % 25 presazkoak dira. Berandu iristen dira presazkoen % 20 eta besteen % 4. Berandu iritsi bada, zein da presazkoa izateko probabilitatea?', 'El 25 % de los pedidos es urgente. Llegan tarde el 20 % de los urgentes y el 4 % del resto. Si uno llega tarde, ¿probabilidad de que sea urgente?', '25 % من الطلبات مستعجلة. يتأخر 20 % من المستعجلة و4 % من غيرها. إذا تأخر طلب، فما احتمال أن يكون مستعجلًا؟', '25% of the orders are urgent. 20% of the urgent ones and 4% of the others arrive late. If an order arrives late, what is the probability that it is urgent?'),
        example: same('$\\frac{0{,}25\\cdot 0{,}2}{0{,}25\\cdot 0{,}2+0{,}75\\cdot 0{,}04}=\\frac{5}{8}$'),
        exampleAnswer: say('$\\frac{5}{8}$: presazkoak gutxi izan arren, berandu iritsitakoen gehiengoa dira.', '$\\frac{5}{8}$: aunque los urgentes son pocos, son la mayoría de los que llegan tarde.', '$\\frac{5}{8}$: رغم قلة المستعجلة فهي أغلب المتأخرة.', '$\\frac{5}{8}$: although urgent orders are few, they are most of the late ones.'),
        why: {
            text: say('$A_i\\cap D$ bidea bi modutan idatz daiteke: $P(A_i)\\,P(D/A_i)$ eta $P(D)\\,P(A_i/D)$. Biak berdinduta eta $P(D)$ zatituta, Bayesen formula ateratzen da.', 'El camino $A_i\\cap D$ se puede escribir de dos formas: $P(A_i)\\,P(D/A_i)$ y $P(D)\\,P(A_i/D)$. Al igualarlas y dividir entre $P(D)$ sale la fórmula de Bayes.', 'يمكن كتابة المسار $A_i\\cap D$ بطريقتين: $P(A_i)\\,P(D/A_i)$ و$P(D)\\,P(A_i/D)$. وبمساواتهما والقسمة على $P(D)$ تخرج صيغة بايز.', 'The path $A_i\\cap D$ can be written in two ways: $P(A_i)\\,P(D/A_i)$ and $P(D)\\,P(A_i/D)$. Setting them equal and dividing by $P(D)$ gives Bayes\' formula.')
        }
    },
    screening: {
        definitions: [
            { term: say('Prebalentzia', 'Prevalencia', 'نسبة الانتشار', 'Prevalence'), meaning: say('Biztanleen artean gaixotasuna dutenen proportzioa: a priori probabilitatea.', 'La proporción de la población que tiene la enfermedad: la probabilidad a priori.', 'نسبة المصابين بالمرض بين السكان: الاحتمال القبلي.', 'The share of the population that has the illness: the prior probability.') },
            { term: say('Positibo faltsua', 'Falso positivo', 'إيجابي كاذب', 'False positive'), meaning: say('Gaixo ez dagoen pertsona baten emaitza positiboa.', 'Un resultado positivo en una persona que no está enferma.', 'نتيجة إيجابية لشخص غير مريض.', 'A positive result in a person who is not ill.') }
        ],
        vocabulary: [
            say('proba', 'prueba', 'الفحص', 'test'),
            say('osasuntsua', 'sano', 'سليم', 'healthy')
        ],
        explanation: say(
            'Proba batek bi akats mota ditu: gaixo batzuetan negatiboa ematen du eta osasuntsu batzuetan positiboa. Gaixotasuna arraroa bada, osasuntsuak hainbeste dira ezen haien positibo faltsuak gaixoen positiboak baino gehiago izan baitaitezke. Horregatik, bigarren proba bat egiten da.',
            'Una prueba falla de dos maneras: da negativo en algunos enfermos y positivo en algunos sanos. Si la enfermedad es rara, los sanos son tantos que sus falsos positivos pueden superar a los positivos de los enfermos. Por eso se repite la prueba.',
            'يخطئ الفحص بطريقتين: يعطي نتيجة سلبية لبعض المرضى وإيجابية لبعض الأصحاء. وإذا كان المرض نادرًا فالأصحاء كثيرون جدًّا حتى إن إيجابياتهم الكاذبة قد تفوق إيجابيات المرضى. لذلك يُعاد الفحص.',
            'A test fails in two ways: it is negative in some ill people and positive in some healthy ones. If the illness is rare, the healthy are so many that their false positives can outnumber the positives of the ill. That is why the test is repeated.'
        ),
        examplePrompt: say('Biztanleen % 10 gaixo dago. Proba positiboa da gaixoen artean % 90, eta osasuntsuen artean % 10. Zenbat da $P(E/+)$?', 'Está enfermo el 10 % de la población. La prueba da positivo en el 90 % de los enfermos y en el 10 % de los sanos. ¿Cuánto vale $P(E/+)$?', 'المريض 10 % من السكان. يعطي الفحص نتيجة إيجابية لدى 90 % من المرضى و10 % من الأصحاء. كم يساوي $P(E/+)$؟', '10% of the population is ill. The test is positive in 90% of the ill and in 10% of the healthy. What is $P(E/+)$?'),
        example: same('$\\frac{0{,}1\\cdot 0{,}9}{0{,}1\\cdot 0{,}9+0{,}9\\cdot 0{,}1}=\\frac{1}{2}$'),
        exampleAnswer: say('Positiboen erdia bakarrik dago gaixo.', 'Solo la mitad de los positivos está enferma.', 'نصف الإيجابيين فقط مرضى.', 'Only half of the positives are ill.')
    }
}
