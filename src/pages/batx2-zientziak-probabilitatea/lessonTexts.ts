import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { ProbabilityBatx2TopicId } from './lessonChecks.ts'

/* ==========================================================================
   Probabilitatea · Batxilergoa 2 · Zientziak — what each lesson tells: the
   new words (definitions), a short explanation, the example as an
   exercise («Another example»), the key words in four languages and, in
   most of the new lessons, «Why does it work?». Plain data so the tests
   can import it; lessons.tsx merges it into the topics. The example uses
   numbers of its own, never those of «Let's solve», of «Check it» or of
   the typical mistake.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const probabilityBatx2LessonTexts: Record<ProbabilityBatx2TopicId, LessonTexts> = {
    /* ---------- 1. Before you start: review of 4. DBH ---------- */
    'review-events': {
        definitions: [
            { term: say('Lagin-espazioa', 'Espacio muestral', 'فضاء العيّنة', 'Sample space'), meaning: say('Esperimentu aleatorio baten emaitza posible guztien $E$ multzoa.', 'El conjunto $E$ de todos los resultados posibles de un experimento aleatorio.', 'المجموعة $E$ لكل النتائج الممكنة لتجربة عشوائية.', 'The set $E$ of all the possible outcomes of a random experiment.') }
        ],
        vocabulary: [
            say('bildura', 'unión', 'الاتحاد', 'union'),
            say('ebakidura', 'intersección', 'التقاطع', 'intersection'),
            say('aurkakoa', 'contrario', 'المعاكس', 'complement')
        ],
        explanation: say(
            'Gertaera bat $E$ lagin-espazioko emaitzen multzo bat da. $A\\cup B$ bildura gertatzen da $A$ edo $B$ gertatzen bada; $A\\cap B$ ebakidura, biak gertatzen badira; eta $\\overline{A}$ aurkakoa, $A$ gertatzen ez bada. Emaitza guztiak berdin probableak badira, Laplaceren erregelak $P(A)$ ematen du: aldeko kasuak zati kasu posibleak.',
            'Un suceso es un conjunto de resultados del espacio muestral $E$. La unión $A\\cup B$ ocurre si ocurre $A$ o $B$; la intersección $A\\cap B$, si ocurren los dos, y el contrario $\\overline{A}$, si no ocurre $A$. Si todos los resultados son igual de probables, la regla de Laplace da $P(A)$ como casos favorables entre casos posibles.',
            'الحدث مجموعة من نتائج فضاء العيّنة $E$. يقع الاتحاد $A\\cup B$ إذا وقع $A$ أو $B$، ويقع التقاطع $A\\cap B$ إذا وقعا معًا، ويقع المعاكس $\\overline{A}$ إذا لم يقع $A$. وإذا كانت كل النتائج متساوية الاحتمال، فإن قاعدة لابلاس تعطي $P(A)$: الحالات الملائمة على الحالات الممكنة.',
            'An event is a set of outcomes of the sample space $E$. The union $A\\cup B$ happens if $A$ or $B$ happens; the intersection $A\\cap B$, if both happen; and the complement $\\overline{A}$, if $A$ does not happen. If all the outcomes are equally likely, Laplace\'s rule gives $P(A)$ as favourable cases over possible cases.'
        ),
        examplePrompt: say('Dado arrunt bat botatzen da. $A$ = «bikoitia» eta $B$ = «3 baino txikiagoa». Zenbat da $P(A\\cap B)$?', 'Se lanza un dado normal. $A$ = «par» y $B$ = «menor que 3». ¿Cuánto vale $P(A\\cap B)$?', 'يُرمى نرد عادي. $A$ = «زوجي» و$B$ = «أصغر من 3». كم يساوي $P(A\\cap B)$؟', 'An ordinary die is rolled. $A$ = «even» and $B$ = «less than 3». What is $P(A\\cap B)$?'),
        example: same('$A\\cap B=\\{2\\}\\qquad P(A\\cap B)=\\frac{1}{6}$'),
        exampleAnswer: say('2 zenbakia bakarrik da bikoitia eta 3 baino txikiagoa.', 'Solo el 2 es par y menor que 3.', 'العدد 2 وحده زوجي وأصغر من 3.', 'Only 2 is even and less than 3.')
    },
    'review-compound': {
        definitions: [
            { term: say('Itzuli gabe', 'Sin devolución', 'دون إرجاع', 'Without replacement'), meaning: say('Ateratako bola ez da kutxara itzultzen: hurrengo ateratzean bola bat gutxiago dago, eta adarrak aldatu egiten dira.', 'La bola sacada no vuelve a la urna: en la siguiente extracción hay una menos y las ramas cambian.', 'لا تعود الكرة المسحوبة إلى الجرّة: في السحبة التالية تنقص كرة وتتغيّر الفروع.', 'The ball drawn does not go back into the urn: in the next draw there is one fewer and the branches change.') }
        ],
        vocabulary: [
            say('bidea', 'camino', 'المسار', 'path'),
            say('adarra', 'rama', 'الفرع', 'branch'),
            say('sarrera bikoitzeko taula', 'tabla de doble entrada', 'جدول ذو مدخلين', 'two-way table')
        ],
        explanation: say(
            'Bi urratseko esperimentu batean, zuhaitzak adar bakoitzean urrats horren probabilitatea jartzen du. Bide baten probabilitatea bere adarren biderkadura da, eta gertaera batena, bere bideen batura. Itzuli gabe, bigarren urratsean bola bat gutxiago dago. Sarrera bikoitzeko taula batek gauza bera antolatzen du zenbaketekin.',
            'En un experimento de dos pasos, el árbol pone en cada rama la probabilidad de ese paso. La probabilidad de un camino es el producto de sus ramas, y la de un suceso, la suma de sus caminos. Sin devolución, el segundo paso tiene una bola menos. Una tabla de doble entrada organiza lo mismo con recuentos.',
            'في تجربة من خطوتين تضع الشجرة على كل فرع احتمال تلك الخطوة. واحتمال المسار هو جداء فروعه، واحتمال الحدث مجموع مساراته. ودون إرجاع تنقص كرة في الخطوة الثانية. والجدول ذو المدخلين ينظّم الشيء نفسه بالعدّ.',
            'In a two-step experiment, the tree puts on each branch the probability of that step. The probability of a path is the product of its branches, and that of an event, the sum of its paths. Without replacement, the second step has one ball fewer. A two-way table organises the same thing with counts.'
        ),
        examplePrompt: say('Kutxa batek 3 bola gorri eta berde 1 ditu. Bi ateratzen dira, itzulita. Zein da biak gorriak izateko probabilitatea?', 'Una urna tiene 3 bolas rojas y 1 verde. Se sacan dos con devolución. ¿Cuál es la probabilidad de que las dos sean rojas?', 'في جرّة 3 كرات حمراء وكرة خضراء. تُسحب كرتان مع الإرجاع. ما احتمال أن تكونا حمراوين؟', 'An urn has 3 red balls and 1 green one. Two are drawn with replacement. What is the probability that both are red?'),
        example: same('$\\frac{3}{4}\\cdot\\frac{3}{4}=\\frac{9}{16}$'),
        exampleAnswer: say('Itzulita, bigarren adarra lehenengoaren berdina da.', 'Con devolución, la segunda rama es igual que la primera.', 'مع الإرجاع يكون الفرع الثاني مثل الأول.', 'With replacement, the second branch is the same as the first.')
    },
    'review-counting': {
        definitions: [
            { term: say('Konbinazioa', 'Combinación', 'التوفيقة', 'Combination'), meaning: say('$n$ elementutatik $k$ aukeratzeko modu bat, ordenak axola ez duela; $C_{n,k}=\\frac{n!}{k!\\,(n-k)!}$ daude.', 'Una forma de elegir $k$ elementos de $n$ sin que importe el orden; hay $C_{n,k}=\\frac{n!}{k!\\,(n-k)!}$.', 'طريقة لاختيار $k$ عنصرًا من $n$ دون أن يهم الترتيب، وعددها $C_{n,k}=\\frac{n!}{k!\\,(n-k)!}$.', 'A way of choosing $k$ elements out of $n$ where the order does not matter; there are $C_{n,k}=\\frac{n!}{k!\\,(n-k)!}$.') }
        ],
        vocabulary: [
            say('ordena', 'orden', 'الترتيب', 'order'),
            say('aldeko kasuak', 'casos favorables', 'الحالات الملائمة', 'favourable cases'),
            say('kasu posibleak', 'casos posibles', 'الحالات الممكنة', 'possible cases')
        ],
        explanation: say(
            'Emaitzak asko direnean, ez dira banan-banan idazten: zenbatu egiten dira. Batera hainbat aukeratzen badira eta ordenak axola ez badu, kasuak konbinazioak dira; ordenak axola badu, aldakuntzak. Aldekoak eta posibleak irizpide berarekin zenbatzen dira. Urratsez urrats ere biderka daiteke, itzuli gabeko zuhaitz batean bezala.',
            'Cuando los resultados son muchos, no se escriben uno a uno: se cuentan. Si se eligen varios a la vez y el orden no importa, los casos son combinaciones; si el orden importa, variaciones. Favorables y posibles se cuentan con el mismo criterio. También se puede multiplicar paso a paso, como en un árbol sin devolución.',
            'عندما تكثر النتائج لا تُكتب واحدة واحدة بل تُعدّ. فإذا اختير عدة عناصر معًا ولم يهم الترتيب فالحالات توافيق، وإذا هم الترتيب فتراتيب. وتُعدّ الملائمة والممكنة بالمعيار نفسه. ويمكن أيضًا الضرب خطوة خطوة كما في شجرة دون إرجاع.',
            'When there are many outcomes, they are not written one by one: they are counted. If several are chosen at once and the order does not matter, the cases are combinations; if the order matters, arrangements. Favourable and possible cases are counted with the same method. You can also multiply step by step, as in a tree without replacement.'
        ),
        examplePrompt: say('Kutxa batean 5 bonbilla on eta 3 erre daude. 2 hartzen dira zoriz. Zein da biak erreta egoteko probabilitatea?', 'En una caja hay 5 bombillas buenas y 3 fundidas. Se cogen 2 al azar. ¿Qué probabilidad hay de que las dos estén fundidas?', 'في صندوق 5 مصابيح سليمة و3 محروقة. يؤخذ مصباحان عشوائيًّا. ما احتمال أن يكونا محروقين؟', 'A box holds 5 good bulbs and 3 burnt-out ones. 2 are taken at random. What is the probability that both are burnt out?'),
        example: same('$\\frac{C_{3,2}}{C_{8,2}}=\\frac{3}{28}$'),
        exampleAnswer: say('Urratsez urrats gauza bera ateratzen da: $\\frac{3}{8}\\cdot\\frac{2}{7}=\\frac{6}{56}=\\frac{3}{28}$.', 'Paso a paso sale lo mismo: $\\frac{3}{8}\\cdot\\frac{2}{7}=\\frac{6}{56}=\\frac{3}{28}$.', 'وخطوة خطوة نحصل على النتيجة نفسها: $\\frac{3}{8}\\cdot\\frac{2}{7}=\\frac{6}{56}=\\frac{3}{28}$.', 'Step by step you get the same: $\\frac{3}{8}\\cdot\\frac{2}{7}=\\frac{6}{56}=\\frac{3}{28}$.'),
        why: {
            text: say('Zergatik ateratzen da zuhaitzarekin bezala? Ordenarik gabeko bikoteak zenbatzea ordenatuak zenbatzea eta 2 zenbakiaz zatitzea da, goian eta behean: 2 hori desagertu egiten da.', '¿Por qué sale lo mismo que con el árbol? Contar parejas sin orden es contar las ordenadas y dividir entre 2, arriba y abajo: ese 2 se va.', 'لماذا نحصل على نتيجة الشجرة نفسها؟ عدّ الأزواج دون ترتيب هو عدّ المرتّبة والقسمة على 2 في البسط والمقام: فيختفي ذلك العدد 2.', 'Why does it give the same as the tree? Counting pairs without order is counting the ordered ones and dividing by 2, top and bottom: that 2 cancels out.'),
            math: same('$\\frac{6\\cdot 5}{10\\cdot 9}=\\frac{30}{90}=\\frac{1}{3}$')
        }
    },

    /* ---------- 2. Algebra of events ---------- */
    'event-space': {
        definitions: [
            { term: say('Gertaera elementala', 'Suceso elemental', 'الحدث البسيط', 'Elementary event'), meaning: say('Emaitza bakarra duen gertaera bat, $\\{3\\}$ adibidez.', 'Un suceso con un solo resultado, como $\\{3\\}$.', 'حدث له نتيجة واحدة، مثل $\\{3\\}$.', 'An event with a single outcome, such as $\\{3\\}$.') },
            { term: say('Gertaeren sistema osoa', 'Sistema completo de sucesos', 'نظام تام من الأحداث', 'Partition of the sample space'), meaning: say('Binaka bateraezinak diren gertaera batzuk, haien bildura $E$ lagin-espazio osoa dela.', 'Unos sucesos incompatibles dos a dos cuya unión es todo el espacio muestral $E$.', 'أحداث متنافية مثنى مثنى واتحادها فضاء العيّنة $E$ كله.', 'Some pairwise mutually exclusive events whose union is the whole sample space $E$.') }
        ],
        vocabulary: [
            say('gertaera ziurra', 'suceso seguro', 'الحدث الأكيد', 'certain event'),
            say('gertaera ezinezkoa', 'suceso imposible', 'الحدث المستحيل', 'impossible event'),
            say('azpimultzoa', 'subconjunto', 'مجموعة جزئية', 'subset')
        ],
        explanation: say(
            'Gertaera bat $E$ lagin-espazioaren edozein azpimultzo da: elementalek emaitza bakarra dute, eta konposatuek, hainbat. Gertaerak dira, halaber, ezinezkoa, $\\varnothing$, eta ziurra, $E$. Emaitza bakoitza gertaera batean egon daitekeenez edo ez, $n$ emaitzarekin $2^n$ gertaera daude. Sistema oso batek $E$ elkar zapaltzen ez diren zatitan banatzen du.',
            'Un suceso es cualquier subconjunto del espacio muestral $E$: los elementales tienen un solo resultado y los compuestos, varios. También son sucesos el imposible, $\\varnothing$, y el seguro, $E$. Como cada resultado puede estar o no en un suceso, con $n$ resultados hay $2^n$ sucesos. Un sistema completo reparte $E$ en trozos que no se pisan.',
            'الحدث أي مجموعة جزئية من فضاء العيّنة $E$: للبسيطة نتيجة واحدة، وللمركّبة عدة نتائج. ومن الأحداث أيضًا المستحيل $\\varnothing$ والأكيد $E$. ولأن كل نتيجة إما أن تكون في الحدث أو لا، فمع $n$ نتيجة هناك $2^n$ حدثًا. والنظام التام يقسم $E$ إلى قطع لا تتداخل.',
            'An event is any subset of the sample space $E$: elementary events have a single outcome and compound ones, several. The impossible event, $\\varnothing$, and the certain one, $E$, are events too. As each outcome can be in an event or not, with $n$ outcomes there are $2^n$ events. A partition shares $E$ out into pieces that do not overlap.'
        ),
        examplePrompt: say('Bi txanpon botatzen dira. Zenbat gertaera ditu esperimentuak?', 'Se lanzan dos monedas. ¿Cuántos sucesos tiene el experimento?', 'تُرمى قطعتا نقود. كم حدثًا للتجربة؟', 'Two coins are tossed. How many events does the experiment have?'),
        example: same('$2^4=16$'),
        exampleAnswer: say('Lagin-espazioak 4 emaitza ditu: aurpegia edo gurutzea txanpon bakoitzean.', 'El espacio muestral tiene 4 resultados: cara o cruz en cada moneda.', 'لفضاء العيّنة 4 نتائج: وجه أو ظهر في كل قطعة.', 'The sample space has 4 outcomes: heads or tails on each coin.'),
        why: {
            text: say('Zergatik $2^n$? Gertaera bat osatzeko, emaitzaz emaitza erabakitzen da barruan dagoen ala ez: bi aukera, $n$ aldiz.', '¿Por qué $2^n$? Para formar un suceso se decide, resultado a resultado, si entra o no: dos opciones, $n$ veces.', 'لماذا $2^n$؟ لتكوين حدث نقرّر نتيجةً نتيجةً هل تدخل أم لا: خياران $n$ مرة.', 'Why $2^n$? To make up an event you decide, outcome by outcome, whether it goes in or not: two options, $n$ times.'),
            math: same('$\\underbrace{2\\cdot 2\\cdots 2}_{n}=2^n$')
        }
    },
    'event-algebra': {
        definitions: [
            { term: say('Gertaeren diferentzia', 'Diferencia de sucesos', 'فرق حدثين', 'Difference of events'), meaning: say('$A-B$ gertaera «$A$ gertatzen da eta $B$ ez» da: $A-B=A\\cap\\overline{B}$.', '$A-B$ es el suceso «ocurre $A$ y no ocurre $B$»: $A-B=A\\cap\\overline{B}$.', '$A-B$ هو الحدث «يقع $A$ ولا يقع $B$»: $A-B=A\\cap\\overline{B}$.', '$A-B$ is the event ‘$A$ happens and $B$ does not’: $A-B=A\\cap\\overline{B}$.') },
            { term: say('De Morganen legeak', 'Leyes de De Morgan', 'قانونا دي مورغان', 'De Morgan\'s laws'), meaning: say('Bildura baten aurkakoa aurkakoen ebakidura da, eta ebakidura baten aurkakoa, aurkakoen bildura.', 'El contrario de una unión es la intersección de los contrarios, y el de una intersección, la unión de los contrarios.', 'معاكس الاتحاد هو تقاطع المعاكسات، ومعاكس التقاطع هو اتحاد المعاكسات.', 'The complement of a union is the intersection of the complements, and that of an intersection, the union of the complements.') }
        ],
        vocabulary: [
            say('zona', 'zona', 'منطقة', 'zone'),
            say('Venn diagrama', 'diagrama de Venn', 'مخطط فن', 'Venn diagram')
        ],
        explanation: say(
            'Bi gertaerek $E$ lau zonatan zatitzen dute: lehena bakarrik, biak, bigarrena bakarrik eta bat ere ez. Zona bakoitza ebakidura bat da, $A\\cap\\overline{B}$ bezala. $A-B$ diferentzia zona hori bera da, «$A$ bakarrik». De Morganen legeek nola ukatu esaten dute: «ez bata ez bestea» bilduraren aurkakoa da.',
            'Dos sucesos parten $E$ en cuatro zonas: solo el primero, los dos, solo el segundo y ninguno. Cada zona es una intersección, como $A\\cap\\overline{B}$. La diferencia $A-B$ es justo esa zona, «solo $A$». Las leyes de De Morgan dicen cómo negar: «ni uno ni otro» es el contrario de la unión.',
            'يقسم حدثان $E$ إلى أربع مناطق: الأول وحده، وكلاهما، والثاني وحده، ولا أحد منهما. وكل منطقة تقاطع، مثل $A\\cap\\overline{B}$. والفرق $A-B$ هو تلك المنطقة بالضبط، «$A$ وحده». ويقول قانونا دي مورغان كيف ننفي: «لا هذا ولا ذاك» هو معاكس الاتحاد.',
            'Two events split $E$ into four zones: only the first, both, only the second and neither. Each zone is an intersection, like $A\\cap\\overline{B}$. The difference $A-B$ is exactly that zone, ‘only $A$’. De Morgan\'s laws say how to negate: ‘neither one nor the other’ is the complement of the union.'
        ),
        examplePrompt: say('10 karta daude, 1 eta 10 arteko zenbakiekin. $A$ = «bakoitia» eta $B$ = «5 baino txikiagoa». Zein kartak osatzen dute $\\overline{A\\cap B}$?', 'Hay 10 cartas numeradas del 1 al 10. $A$ = «impar» y $B$ = «menor que 5». ¿Qué cartas forman $\\overline{A\\cap B}$?', 'هناك 10 أوراق مرقّمة من 1 إلى 10. $A$ = «فردي» و$B$ = «أصغر من 5». ما الأوراق التي تكوّن $\\overline{A\\cap B}$؟', 'There are 10 cards numbered 1 to 10. $A$ = «odd» and $B$ = «less than 5». Which cards make up $\\overline{A\\cap B}$?'),
        example: same('$\\overline{A\\cap B}=\\{2,4,5,6,7,8,9,10\\}$'),
        exampleAnswer: say('$A\\cap B=\\{1,3\\}$: beste karta guztiak dira.', '$A\\cap B=\\{1,3\\}$: son todas las demás.', '$A\\cap B=\\{1,3\\}$: إنها كل الأوراق الأخرى.', '$A\\cap B=\\{1,3\\}$: they are all the others.'),
        why: {
            text: say('Zergatik betetzen da De Morgan? Venn diagraman, $\\overline{A\\cup B}$ bi zirkuluetatik kanpoko zona da. $\\overline{A}\\cap\\overline{B}$ ere bai: $A$ gertaeratik kanpo eta, aldi berean, $B$ gertaeratik kanpo.', '¿Por qué funciona De Morgan? En el Venn, $\\overline{A\\cup B}$ es la zona de fuera de los dos círculos. $\\overline{A}\\cap\\overline{B}$ también: fuera de $A$ y, a la vez, fuera de $B$.', 'لماذا يصحّ دي مورغان؟ في مخطط فن، $\\overline{A\\cup B}$ هو المنطقة خارج الدائرتين. و$\\overline{A}\\cap\\overline{B}$ كذلك: خارج $A$ وفي الوقت نفسه خارج $B$.', 'Why does De Morgan work? In the Venn diagram, $\\overline{A\\cup B}$ is the zone outside both circles. So is $\\overline{A}\\cap\\overline{B}$: outside $A$ and, at the same time, outside $B$.')
        }
    },
    axioms: {
        definitions: [
            { term: say('Kolmogorov-en axiomak', 'Axiomas de Kolmogórov', 'بديهيات كولموغوروف', 'Kolmogorov\'s axioms'), meaning: say('Abiapuntuko hiru arauak: probabilitate bat ere ez da negatiboa, $P(E)=1$, eta bateraezinen bildurarena batura da.', 'Las tres reglas de partida: ninguna probabilidad es negativa, $P(E)=1$ y la de una unión de incompatibles es la suma.', 'القواعد الثلاث الأولى: لا احتمال سالب، و$P(E)=1$، واحتمال اتحاد أحداث متنافية هو المجموع.', 'The three starting rules: no probability is negative, $P(E)=1$, and that of a union of mutually exclusive events is the sum.') },
            { term: say('Inklusioa', 'Inclusión', 'الاحتواء', 'Inclusion'), meaning: say('$A\\subset B$ bada, $A$ gertaerako emaitza guztiak $B$ gertaeran daude, eta orduan $P(A)\\le P(B)$.', 'Si $A\\subset B$, todo resultado de $A$ está en $B$, y entonces $P(A)\\le P(B)$.', 'إذا كان $A\\subset B$ فكل نتيجة من $A$ موجودة في $B$، وعندئذ $P(A)\\le P(B)$.', 'If $A\\subset B$, every outcome of $A$ is in $B$, and then $P(A)\\le P(B)$.') }
        ],
        vocabulary: [
            say('axioma', 'axioma', 'بديهية', 'axiom'),
            say('propietatea', 'propiedad', 'الخصائص', 'property'),
            say('bateraezinak', 'incompatibles', 'متنافيان', 'mutually exclusive')
        ],
        explanation: say(
            'Probabilitateak zenbaki bat esleitzen dio gertaera bakoitzari, eta zenbaki horrek hiru axioma betetzen ditu. Gainerako guztia haietatik frogatzen da: aurkakoaren araua, ezinezkoa 0 dela, probabilitate bat ere ez dela 1 baino handiagoa, eta bilduraren eta diferentziaren formulak. Emaitzak berdin probableak ez direnean ere balio dute.',
            'La probabilidad asigna a cada suceso un número que cumple tres axiomas. Todo lo demás se demuestra a partir de ellos: la regla del contrario, que el imposible vale 0, que ninguna probabilidad pasa de 1 y las fórmulas de la unión y de la diferencia. Valen también cuando los resultados no son igual de probables.',
            'يُسند الاحتمال إلى كل حدث عددًا يحقق ثلاث بديهيات. وكل ما عدا ذلك يُبرهن انطلاقًا منها: قاعدة المعاكس، وأن المستحيل يساوي 0، وأن لا احتمال يتجاوز 1، وصيغتا الاتحاد والفرق. وهي صالحة أيضًا عندما لا تكون النتائج متساوية الاحتمال.',
            'Probability gives each event a number that satisfies three axioms. Everything else is proved from them: the complement rule, that the impossible event is 0, that no probability goes above 1, and the formulas for the union and the difference. They also hold when the outcomes are not equally likely.'
        ),
        examplePrompt: say('$P(A)=0{,}7$, $P(B)=0{,}5$ eta $P(A\\cup B)=0{,}9$ badira, zenbat da $P(A\\cap B)$?', 'Si $P(A)=0{,}7$, $P(B)=0{,}5$ y $P(A\\cup B)=0{,}9$, ¿cuánto vale $P(A\\cap B)$?', 'إذا كان $P(A)=0{,}7$ و$P(B)=0{,}5$ و$P(A\\cup B)=0{,}9$، فكم يساوي $P(A\\cap B)$؟', 'If $P(A)=0{,}7$, $P(B)=0{,}5$ and $P(A\\cup B)=0{,}9$, what is $P(A\\cap B)$?'),
        example: same('$P(A\\cap B)=0{,}7+0{,}5-0{,}9=0{,}3$'),
        exampleAnswer: say('Bilduraren formulatik ebakidura askatzen da.', 'Se despeja la intersección de la fórmula de la unión.', 'نعزل التقاطع من صيغة الاتحاد.', 'Solve the union formula for the intersection.'),
        why: {
            text: say('Zergatik $P(\\overline{A})=1-P(A)$? $A$ eta $\\overline{A}$ bateraezinak dira, eta biek batera $E$ osatzen dute. Hirugarren eta bigarren axiomen arabera, haien probabilitateek $P(E)=1$ batzen dute.', '¿Por qué $P(\\overline{A})=1-P(A)$? $A$ y $\\overline{A}$ son incompatibles y juntos forman $E$. Por el tercer axioma y el segundo, sus probabilidades suman $P(E)=1$.', 'لماذا $P(\\overline{A})=1-P(A)$؟ $A$ و$\\overline{A}$ متنافيان ومعًا يكوّنان $E$. وبالبديهيتين الثالثة والثانية يكون مجموع احتماليهما $P(E)=1$.', 'Why is $P(\\overline{A})=1-P(A)$? $A$ and $\\overline{A}$ are mutually exclusive and together they make up $E$. By the third and the second axioms, their probabilities add up to $P(E)=1$.'),
            math: same('$P(A)+P(\\overline{A})=1$')
        }
    },
    'from-data': {
        vocabulary: [
            say('datua', 'dato', 'معطى', 'data'),
            say('zona', 'zona', 'منطقة', 'zone'),
            say('De Morgan', 'De Morgan', 'دي مورغان', 'De Morgan')
        ],
        explanation: say(
            'Problema askok ez dute zenbatzeko kasurik ematen, probabilitateak baizik: $P(A)$, $P(B)$ eta hirugarren datu bat, batzuetan aurkako batean edo De Morganen lege batean ezkutatuta. Metodo segurua datuak Venn diagramara eramatea da: lehenik ebakidura, gero $A$ bakarrik eta $B$ bakarrik, eta 1 arte falta dena kanpoko zona da.',
            'Muchos problemas no dan casos que contar, sino probabilidades: $P(A)$, $P(B)$ y un tercer dato, a veces escondido en un contrario o en una ley de De Morgan. El método seguro es pasar los datos al Venn: primero la intersección, después solo $A$ y solo $B$, y lo que falta hasta 1 es la zona de fuera.',
            'كثير من المسائل لا تعطي حالات للعدّ بل احتمالات: $P(A)$ و$P(B)$ ومعطى ثالثًا، مخبّأً أحيانًا في معاكس أو في أحد قانوني دي مورغان. والطريقة الآمنة نقل المعطيات إلى مخطط فن: أولًا التقاطع، ثم $A$ وحده و$B$ وحده، وما ينقص حتى 1 هو المنطقة الخارجية.',
            'Many problems give no cases to count, but probabilities: $P(A)$, $P(B)$ and a third piece of data, sometimes hidden in a complement or in one of De Morgan\'s laws. The safe method is to put the data into the Venn diagram: first the intersection, then only $A$ and only $B$, and what is missing up to 1 is the outer zone.'
        ),
        examplePrompt: say('$P(A)=0{,}5$, $P(B)=0{,}25$ eta $P(A\\cap B)=0{,}1$ badira, zenbat da $P(\\overline{A}\\cap B)$?', 'Si $P(A)=0{,}5$, $P(B)=0{,}25$ y $P(A\\cap B)=0{,}1$, ¿cuánto vale $P(\\overline{A}\\cap B)$?', 'إذا كان $P(A)=0{,}5$ و$P(B)=0{,}25$ و$P(A\\cap B)=0{,}1$، فكم يساوي $P(\\overline{A}\\cap B)$؟', 'If $P(A)=0{,}5$, $P(B)=0{,}25$ and $P(A\\cap B)=0{,}1$, what is $P(\\overline{A}\\cap B)$?'),
        example: same('$P(\\overline{A}\\cap B)=0{,}25-0{,}1=0{,}15$'),
        exampleAnswer: say('«$B$ bakarrik» zona da.', 'Es la zona «solo $B$».', 'إنها منطقة «$B$ وحده».', 'It is the zone ‘only $B$’.')
    },

    /* ---------- 3. Conditional probability and independence ---------- */
    conditional: {
        definitions: [
            { term: say('Probabilitate baldintzatua', 'Probabilidad condicionada', 'الاحتمال المشروط', 'Conditional probability'), meaning: say('$A$ gertaeraren probabilitatea, $B$ gertatu dela jakinda: $P(A/B)=\\frac{P(A\\cap B)}{P(B)}$, $P(B)>0$ bada.', 'La probabilidad de $A$ sabiendo que ha ocurrido $B$: $P(A/B)=\\frac{P(A\\cap B)}{P(B)}$, si $P(B)>0$.', 'احتمال $A$ مع العلم أن $B$ وقع: $P(A/B)=\\frac{P(A\\cap B)}{P(B)}$ إذا كان $P(B)>0$.', 'The probability of $A$ given that $B$ has happened: $P(A/B)=\\frac{P(A\\cap B)}{P(B)}$, if $P(B)>0$.') }
        ],
        vocabulary: [
            say('baldintza', 'condición', 'الشرط', 'condition'),
            say('izendatzailea', 'denominador', 'المقام', 'denominator'),
            say('jakinda', 'sabiendo que', 'مع العلم', 'given that')
        ],
        explanation: say(
            '$B$ gertatu dela jakiteak aldatu egiten du gerta daitekeena: $B$ gertaerako emaitzak bakarrik geratzen dira, eta horiek dira osoko berria. Horregatik, $P(A/B)$ probabilitateak zati komuna $P(B)$ zenbakiaz zatitzen du, ez 1 zenbakiaz. Zenbaketekin, taula batean bezala da: lauki komuna zati $B$ gertaeraren guztizkoa.',
            'Saber que ha ocurrido $B$ cambia lo que puede pasar: solo quedan los resultados de $B$, que pasa a ser el nuevo total. Por eso $P(A/B)$ divide la parte común entre $P(B)$, no entre 1. Con recuentos es lo mismo que en una tabla: la casilla común entre el total de $B$.',
            'معرفة أن $B$ وقع تغيّر ما يمكن أن يحدث: لا تبقى إلا نتائج $B$، فتصير هي الكل الجديد. لذلك يقسم $P(A/B)$ الجزء المشترك على $P(B)$ لا على 1. وبالعدّ يشبه ذلك ما في الجدول: الخانة المشتركة على مجموع $B$.',
            'Knowing that $B$ has happened changes what can happen: only the outcomes of $B$ are left, and they become the new total. That is why $P(A/B)$ divides the common part by $P(B)$, not by 1. With counts it is the same as in a table: the common cell over the total of $B$.'
        ),
        examplePrompt: say('$P(A)=0{,}6$, $P(B)=0{,}8$ eta $P(A\\cap B)=0{,}4$ badira, zenbat da $P(A/B)$?', 'Si $P(A)=0{,}6$, $P(B)=0{,}8$ y $P(A\\cap B)=0{,}4$, ¿cuánto vale $P(A/B)$?', 'إذا كان $P(A)=0{,}6$ و$P(B)=0{,}8$ و$P(A\\cap B)=0{,}4$، فكم يساوي $P(A/B)$؟', 'If $P(A)=0{,}6$, $P(B)=0{,}8$ and $P(A\\cap B)=0{,}4$, what is $P(A/B)$?'),
        example: same('$P(A/B)=\\frac{0{,}4}{0{,}8}=0{,}5$'),
        exampleAnswer: say('Alderantziz beste bat litzateke: $P(B/A)=\\frac{0{,}4}{0{,}6}$.', 'Al revés sería otra: $P(B/A)=\\frac{0{,}4}{0{,}6}$.', 'وبالعكس يكون احتمالًا آخر: $P(B/A)=\\frac{0{,}4}{0{,}6}$.', 'The other way round it would be a different one: $P(B/A)=\\frac{0{,}4}{0{,}6}$.'),
        why: {
            text: say('Zergatik zatitzen da $P(B)$ zenbakiaz? $B$ barruan, probabilitateek 1 batu behar dute, lagin-espazio berri batean bezala. $P(B)$ zenbakiaz zatitzea horixe da, eta horregatik $P(B/B)=1$.', '¿Por qué se divide entre $P(B)$? Dentro de $B$, las probabilidades tienen que sumar 1, como en un espacio muestral nuevo. Dividir entre $P(B)$ es justo eso, y por eso $P(B/B)=1$.', 'لماذا نقسم على $P(B)$؟ داخل $B$ يجب أن يكون مجموع الاحتمالات 1، كما في فضاء عيّنة جديد. والقسمة على $P(B)$ هي ذلك بالضبط، ولذلك $P(B/B)=1$.', 'Why divide by $P(B)$? Inside $B$, the probabilities have to add up to 1, as in a new sample space. Dividing by $P(B)$ is exactly that, and that is why $P(B/B)=1$.')
        }
    },
    'product-rule': {
        definitions: [
            { term: say('Biderkaduraren erregela', 'Regla del producto', 'قاعدة الضرب', 'Multiplication rule'), meaning: say('Baldintzatutik askatuta: $P(A\\cap B)=P(A)\\cdot P(B/A)$; gertaera gehiagorekin, baldintzatuak kateatzen dira.', 'Despejando de la condicionada: $P(A\\cap B)=P(A)\\cdot P(B/A)$; con más sucesos, se encadenan las condicionadas.', 'بعزلها من المشروط: $P(A\\cap B)=P(A)\\cdot P(B/A)$؛ ومع أحداث أكثر تتسلسل الاحتمالات المشروطة.', 'Solving the conditional formula: $P(A\\cap B)=P(A)\\cdot P(B/A)$; with more events, the conditional probabilities are chained.') }
        ],
        vocabulary: [
            say('jarraian', 'seguidos', 'متتالية', 'one after another'),
            say('urratsa', 'paso', 'خطوة', 'step'),
            say('itzuli gabe', 'sin devolver', 'دون إرجاع', 'without replacement')
        ],
        explanation: say(
            'Baldintzatuaren formulak alderantziz ere balio du: $P(A)$ eta $P(B/A)$ ezagutzen badira, biderkatu egiten da. Hiru gertaera edo gehiagorekin, baldintzatuak kateatzen dira, bakoitza aurreko guztia jakinda. Zuhaitz baten adarrak baldintzatu horiexek dira, eta horregatik biderkatzen da bide batean zehar.',
            'La fórmula de la condicionada también sirve al revés: si se conocen $P(A)$ y $P(B/A)$, se multiplica. Con tres o más sucesos se encadenan las condicionadas, cada una sabiendo todo lo anterior. Las ramas de un árbol son justamente esas condicionadas, y por eso se multiplica a lo largo de un camino.',
            'تصلح صيغة الاحتمال المشروط بالعكس أيضًا: إذا عُلم $P(A)$ و$P(B/A)$ نضرب. ومع ثلاثة أحداث أو أكثر تتسلسل الاحتمالات المشروطة، كل منها مع العلم بكل ما سبق. وفروع الشجرة هي تلك الاحتمالات المشروطة بالضبط، ولذلك نضرب على طول المسار.',
            'The conditional formula also works the other way round: if you know $P(A)$ and $P(B/A)$, you multiply. With three or more events the conditional probabilities are chained, each one knowing everything before it. The branches of a tree are exactly those conditional probabilities, and that is why you multiply along a path.'
        ),
        examplePrompt: say('40 kartako sorta batean 4 bateko daude. Bi ateratzen dira, itzuli gabe. Zein da bi bateko ateratzeko probabilitatea?', 'De una baraja de 40 cartas con 4 ases se sacan dos sin devolver. ¿Qué probabilidad hay de sacar dos ases?', 'من رزمة من 40 ورقة فيها 4 آسات تُسحب ورقتان دون إرجاع. ما احتمال سحب آسين؟', 'Two cards are drawn without replacement from a 40-card pack with 4 aces. What is the probability of drawing two aces?'),
        example: same('$\\frac{4}{40}\\cdot\\frac{3}{39}=\\frac{12}{1560}=\\frac{1}{130}$'),
        exampleAnswer: say('Oso txikia: 100 aldiz behin baino gutxiago.', 'Muy poco: menos de una vez de cada 100.', 'صغير جدًّا: أقل من مرة واحدة من كل 100.', 'Very little: less than once in 100.'),
        why: {
            text: say('Zergatik biderkatzen da? $A$ gertatzen den aldi guztietatik, $P(B/A)$ zati bat $B$ ere badira. Zati baten zatia biderkadura bat da.', '¿Por qué se multiplica? De todas las veces que ocurre $A$, una fracción $P(B/A)$ son también de $B$. Una fracción de una fracción es un producto.', 'لماذا نضرب؟ من كل المرات التي يقع فيها $A$، يكون كسر $P(B/A)$ منها من $B$ أيضًا. وكسر من كسر جداء.', 'Why multiply? Of all the times $A$ happens, a fraction $P(B/A)$ are also times of $B$. A fraction of a fraction is a product.')
        }
    },
    independence: {
        definitions: [
            { term: say('Gertaera independenteak', 'Sucesos independientes', 'الأحداث المستقلة', 'Independent events'), meaning: say('Bat gertatu dela jakiteak ez du bestearen probabilitatea aldatzen: $P(A\\cap B)=P(A)\\cdot P(B)$.', 'Saber que ha ocurrido uno no cambia la probabilidad del otro: $P(A\\cap B)=P(A)\\cdot P(B)$.', 'معرفة وقوع أحدهما لا تغيّر احتمال الآخر: $P(A\\cap B)=P(A)\\cdot P(B)$.', 'Knowing that one has happened does not change the probability of the other: $P(A\\cap B)=P(A)\\cdot P(B)$.') }
        ],
        vocabulary: [
            say('bateraezinak', 'incompatibles', 'متنافيان', 'mutually exclusive'),
            say('gutxienez bat', 'al menos uno', 'واحد على الأقل', 'at least one'),
            say('biderkaduraren proba', 'prueba del producto', 'اختبار الضرب', 'product test')
        ],
        explanation: say(
            'Bi gertaera independenteak dira bata jakiteak bestea aldatzen ez badu: $P(A/B)=P(A)$; biderkatuta, biderkaduraren proba ateratzen da. Ez da bateraezinak izatea: $A$ eta $B$ batera gerta ezin badaitezke, $B$ jakiteak $A$ ezinezko bihurtzen du, eta oso mendekoak dira. Independenteekin, «gutxienez bat» aurkakotik ateratzen da: $1-P(\\overline{A})\\cdot P(\\overline{B})$.',
            'Dos sucesos son independientes si saber uno no cambia el otro: $P(A/B)=P(A)$; multiplicando, sale la prueba del producto. No es lo mismo que incompatibles: si $A$ y $B$ no pueden ocurrir a la vez, saber $B$ hace imposible $A$, así que dependen mucho. Con independientes, «al menos uno» sale del contrario: $1-P(\\overline{A})\\cdot P(\\overline{B})$.',
            'يكون حدثان مستقلين إذا كانت معرفة أحدهما لا تغيّر الآخر: $P(A/B)=P(A)$؛ وبالضرب نحصل على اختبار الضرب. وليس هذا هو التنافي: إذا لم يمكن أن يقع $A$ و$B$ معًا، فمعرفة $B$ تجعل $A$ مستحيلًا، فهما تابعان جدًّا. ومع المستقلين نحسب «واحد على الأقل» من المعاكس: $1-P(\\overline{A})\\cdot P(\\overline{B})$.',
            'Two events are independent if knowing one does not change the other: $P(A/B)=P(A)$; multiplying out gives the product test. It is not the same as mutually exclusive: if $A$ and $B$ cannot happen together, knowing $B$ makes $A$ impossible, so they depend a lot. With independent events, ‘at least one’ comes from the complement: $1-P(\\overline{A})\\cdot P(\\overline{B})$.'
        ),
        examplePrompt: say('Bi arkularik aldi berean jaurtitzen dute, modu independentean: batek 0,8 probabilitatearekin asmatzen du, eta besteak 0,6 probabilitatearekin. Zein da gutxienez batek asmatzeko probabilitatea?', 'Dos arqueros tiran a la vez, de forma independiente: uno acierta con probabilidad 0,8 y el otro, con 0,6. ¿Qué probabilidad hay de que acierte al menos uno?', 'يرمي راميان معًا بشكل مستقل: يصيب أحدهما باحتمال 0.8 والآخر باحتمال 0.6. ما احتمال أن يصيب واحد على الأقل؟', 'Two archers shoot at the same time, independently: one hits with probability 0.8 and the other with 0.6. What is the probability that at least one hits?'),
        example: same('$1-0{,}2\\cdot 0{,}4=1-0{,}08=0{,}92$'),
        exampleAnswer: say('Biek huts egiten dute $0{,}2\\cdot 0{,}4$ probabilitatearekin.', 'Fallan los dos con probabilidad $0{,}2\\cdot 0{,}4$.', 'يخطئ كلاهما باحتمال $0{,}2\\cdot 0{,}4$.', 'Both miss with probability $0{,}2\\cdot 0{,}4$.'),
        why: {
            text: say('Zergatik ezin dira bi bateraezin independenteak izan? $P(A)$ eta $P(B)$ positiboak badira, haien biderkadura ere positiboa da, eta ezin da $P(A\\cap B)=0$ zenbakiaren berdina izan.', '¿Por qué dos incompatibles no pueden ser independientes? Si $P(A)$ y $P(B)$ son positivas, su producto también lo es, y no puede ser igual a $P(A\\cap B)=0$.', 'لماذا لا يمكن لحدثين متنافيين أن يكونا مستقلين؟ إذا كان $P(A)$ و$P(B)$ موجبين فجداؤهما موجب أيضًا، ولا يمكن أن يساوي $P(A\\cap B)=0$.', 'Why can two mutually exclusive events not be independent? If $P(A)$ and $P(B)$ are positive, their product is positive too, and it cannot equal $P(A\\cap B)=0$.')
        }
    },
    'percent-tables': {
        definitions: [
            { term: say('Ehuneko baldintzatua', 'Porcentaje condicionado', 'نسبة مئوية مشروطة', 'Conditional percentage'), meaning: say('«… direnen» ehuneko bat: taularen errenkada baten gainean kalkulatzen da, ez guztizkoaren gainean; probabilitate baldintzatu bat da.', 'Un porcentaje «de los que…»: se calcula sobre una fila de la tabla, no sobre el total; es una probabilidad condicionada.', 'نسبة «من الذين…»: تُحسب على سطر من الجدول لا على الكل، وهي احتمال مشروط.', 'A percentage «of those who…»: it is worked out on a row of the table, not on the total; it is a conditional probability.') }
        ],
        vocabulary: [
            say('errenkada', 'fila', 'السطر', 'row'),
            say('zutabea', 'columna', 'العمود', 'column'),
            say('guztizkoa', 'total', 'المجموع', 'total')
        ],
        explanation: say(
            'Problemek datuak ehunekotan ematen dituzte askotan, eta batzuk baldintzatuak dira: «goizez doazenen % 30». Seguruena 100 banako imajinatzea eta sarrera bikoitzeko taula eraikitzea da. Ehuneko baldintzatu bat bere errenkadaren gainean aplikatzen da. Taula beteta, «… bada», «edo» eta «ez … ez …» zuzenean irakurtzen dira.',
            'Los problemas suelen dar los datos en porcentajes, y algunos son condicionados: «de los que van por la mañana, el 30 %». Lo más seguro es imaginar 100 individuos y construir la tabla de doble entrada. Un porcentaje condicionado se aplica sobre su fila. Con la tabla llena, «si…», «o» y «ni… ni…» se leen directamente.',
            'كثيرًا ما تعطي المسائل المعطيات بالنسب المئوية، وبعضها مشروط: «من الذين يذهبون صباحًا 30٪». والأضمن أن نتخيّل 100 فرد ونبني الجدول ذا المدخلين. وتُطبَّق النسبة المشروطة على سطرها. ومع امتلاء الجدول تُقرأ «إذا…» و«أو» و«لا… ولا…» مباشرة.',
            'Problems often give the data as percentages, and some of them are conditional: «of those who go in the morning, 30%». The safest thing is to imagine 100 individuals and build the two-way table. A conditional percentage applies to its row. With the table filled in, «if…», «or» and «neither… nor…» are read off directly.'
        ),
        examplePrompt: say('Talde bateko % 70 ingelesez mintzatzen da, eta horien % 20 frantsesez ere bai. Taldearen zer ehuneko mintzatzen da bi hizkuntzetan?', 'El 70 % de un grupo habla inglés y, de ellos, el 20 % habla también francés. ¿Qué porcentaje del grupo habla los dos idiomas?', '70٪ من مجموعة يتكلمون الإنجليزية، ومن هؤلاء 20٪ يتكلمون الفرنسية أيضًا. ما النسبة المئوية من المجموعة التي تتكلم اللغتين؟', '70% of a group speak English and, of them, 20% also speak French. What percentage of the group speaks both languages?'),
        example: same('$0{,}2\\cdot 70=14$'),
        exampleAnswer: say('Taldearen % 14.', 'El 14 % del grupo.', '14٪ من المجموعة.', '14% of the group.')
    },

    /* ---------- 4. Total probability and Bayes ---------- */
    'total-probability': {
        definitions: [
            { term: say('Probabilitate osoaren teorema', 'Teorema de la probabilidad total', 'مبرهنة الاحتمال الكلي', 'Law of total probability'), meaning: say('$A_1,\\ldots,A_n$ gertaerek sistema osoa osatzen badute, $P(B)=\\sum P(A_i)\\cdot P(B/A_i)$.', 'Si $A_1,\\ldots,A_n$ forman un sistema completo, $P(B)=\\sum P(A_i)\\cdot P(B/A_i)$.', 'إذا كوّنت $A_1,\\ldots,A_n$ نظامًا تامًّا فإن $P(B)=\\sum P(A_i)\\cdot P(B/A_i)$.', 'If $A_1,\\ldots,A_n$ form a partition, $P(B)=\\sum P(A_i)\\cdot P(B/A_i)$.') }
        ],
        vocabulary: [
            say('kausa', 'causa', 'السبب', 'cause'),
            say('sistema osoa', 'sistema completo', 'نظام تام', 'partition'),
            say('bidea', 'camino', 'المسار', 'path')
        ],
        explanation: say(
            'Batzuetan $B$ emaitza bat hainbat bidetatik irits daiteke: lehen makinatik, bigarrenetik edo hirugarrenetik. Kausa horiek sistema osoa osatzen badute, $B$ zati bateraezinetan banatzen da, $B\\cap A_i$, eta haren probabilitatea zatien batura da. Zati bakoitza zuhaitzaren bide bat da: $P(A_i)\\cdot P(B/A_i)$.',
            'A veces un resultado $B$ puede llegar por varias vías: de la máquina 1, de la 2 o de la 3. Si esas causas forman un sistema completo, $B$ se parte en trozos incompatibles, $B\\cap A_i$, y su probabilidad es la suma de los trozos. Cada trozo es un camino del árbol: $P(A_i)\\cdot P(B/A_i)$.',
            'قد تصل نتيجة $B$ أحيانًا من عدة طرق: من الآلة 1 أو 2 أو 3. فإذا كوّنت هذه الأسباب نظامًا تامًّا، انقسم $B$ إلى قطع متنافية $B\\cap A_i$، واحتماله مجموع القطع. وكل قطعة مسار في الشجرة: $P(A_i)\\cdot P(B/A_i)$.',
            'Sometimes an outcome $B$ can come about in several ways: from machine 1, 2 or 3. If those causes form a partition, $B$ splits into mutually exclusive pieces, $B\\cap A_i$, and its probability is the sum of the pieces. Each piece is a path of the tree: $P(A_i)\\cdot P(B/A_i)$.'
        ),
        examplePrompt: say('Bi kutxatako bat aukeratzen da zoriz: I kutxak 5 bolatik 3 gorri ditu, eta II kutxak, 4 bolatik gorri 1. Zein da gorria ateratzeko probabilitatea?', 'Se elige al azar una de dos urnas: la I tiene 3 rojas de 5, y la II, 1 roja de 4. ¿Probabilidad de sacar roja?', 'تُختار عشوائيًّا إحدى جرّتين: في الأولى 3 حمراء من 5، وفي الثانية حمراء واحدة من 4. ما احتمال سحب حمراء؟', 'One of two urns is chosen at random: urn I has 3 red out of 5, and urn II, 1 red out of 4. What is the probability of red?'),
        example: same('$\\frac{1}{2}\\cdot\\frac{3}{5}+\\frac{1}{2}\\cdot\\frac{1}{4}=\\frac{3}{10}+\\frac{1}{8}=\\frac{17}{40}$'),
        exampleAnswer: say('Kutxek pisu bera dute: bide bakoitza $\\frac{1}{2}$ zatikiarekin hasten da.', 'Las urnas pesan lo mismo: cada camino empieza por $\\frac{1}{2}$.', 'للجرّتين الوزن نفسه: كل مسار يبدأ بـ $\\frac{1}{2}$.', 'The urns weigh the same: each path starts with $\\frac{1}{2}$.'),
        why: {
            text: say('Zergatik batzen dira? $B\\cap A_i$ zatiek ez dute elkar zapaltzen, kausak bateraezinak direlako, eta denek batera $B$ osatzen dute. Hirugarren axiomaren arabera batzen dira, eta zati bakoitza biderkadura bat da biderkaduraren erregelaren arabera.', '¿Por qué se suman? Los trozos $B\\cap A_i$ no se pisan, porque las causas son incompatibles, y juntos forman $B$. Por el tercer axioma se suman, y cada trozo es un producto por la regla del producto.', 'لماذا نجمع؟ القطع $B\\cap A_i$ لا تتداخل لأن الأسباب متنافية، ومعًا تكوّن $B$. فبالبديهية الثالثة نجمعها، وكل قطعة جداء بقاعدة الضرب.', 'Why add? The pieces $B\\cap A_i$ do not overlap, because the causes are mutually exclusive, and together they make up $B$. By the third axiom they add, and each piece is a product by the multiplication rule.')
        }
    },
    bayes: {
        definitions: [
            { term: say('A priori probabilitatea', 'Probabilidad a priori', 'الاحتمال القبلي', 'Prior probability'), meaning: say('Kausa bakoitzarena, emaitza jakin aurretik: $P(A_i)$.', 'La de cada causa antes de saber el resultado: $P(A_i)$.', 'احتمال كل سبب قبل معرفة النتيجة: $P(A_i)$.', 'That of each cause before knowing the outcome: $P(A_i)$.') },
            { term: say('A posteriori probabilitatea', 'Probabilidad a posteriori', 'الاحتمال البعدي', 'Posterior probability'), meaning: say('Kausa bakoitzarena, $B$ gertatu dela jakin ondoren: $P(A_i/B)$.', 'La de cada causa después de saber que ha ocurrido $B$: $P(A_i/B)$.', 'احتمال كل سبب بعد معرفة أن $B$ وقع: $P(A_i/B)$.', 'That of each cause after knowing that $B$ has happened: $P(A_i/B)$.') }
        ],
        vocabulary: [
            say('kausa', 'causa', 'السبب', 'cause'),
            say('emaitza', 'resultado', 'النتيجة', 'outcome')
        ],
        explanation: say(
            'Probabilitate osoa kausetatik emaitzara doa. Bayesek bidea alderantziz egiten du: $B$ gertatu dela jakinda, zein kausatatik dator? Kausa horren bidea hartzen da, eta $B$ gertaerara daramaten bide guztien baturaz zatitzen da. A posteriori probabilitateek ere 1 batzen dute, baina $B$ kontuan hartzen dute jada.',
            'La probabilidad total va de las causas al resultado. Bayes hace el camino al revés: sabiendo que ha ocurrido $B$, ¿de qué causa viene? Se toma el camino de esa causa y se divide entre la suma de todos los caminos que llevan a $B$. Las probabilidades a posteriori también suman 1, pero ya tienen en cuenta $B$.',
            'ينتقل الاحتمال الكلي من الأسباب إلى النتيجة. أما بايز فيسلك الطريق بالعكس: مع العلم أن $B$ وقع، من أي سبب جاء؟ نأخذ مسار ذلك السبب ونقسمه على مجموع كل المسارات المؤدية إلى $B$. ومجموع الاحتمالات البعدية 1 أيضًا، لكنها تأخذ $B$ في الحسبان.',
            'Total probability goes from the causes to the outcome. Bayes goes the other way: knowing that $B$ has happened, which cause does it come from? Take the path of that cause and divide it by the sum of all the paths that lead to $B$. The posterior probabilities also add up to 1, but they already take $B$ into account.'
        ),
        examplePrompt: say('Klase batean, % 40 autobusez dator, eta horien % 5 berandu iristen da; besteen % 10. Bat berandu iristen bada, zein da autobusez etorri izanaren probabilitatea?', 'En una clase, el 40 % viene en autobús y llega tarde el 5 % de ellos; de los demás, el 10 %. Si uno llega tarde, ¿probabilidad de que viniera en autobús?', 'في صف يأتي 40٪ بالحافلة ويتأخر 5٪ منهم، ومن الباقين 10٪. إذا تأخّر أحدهم، فما احتمال أنه جاء بالحافلة؟', 'In a class, 40% come by bus and 5% of them arrive late; of the rest, 10%. If one arrives late, what is the probability that they came by bus?'),
        example: same('$\\frac{0{,}4\\cdot 0{,}05}{0{,}4\\cdot 0{,}05+0{,}6\\cdot 0{,}1}=\\frac{0{,}02}{0{,}08}=0{,}25$'),
        exampleAnswer: say('A priori 0,4 zen; berandu iristen dela jakinda, 0,25 izatera jaisten da.', 'A priori era 0,4; sabiendo que llega tarde, baja a 0,25.', 'قبليًّا كان 0.4، ومع العلم أنه تأخّر ينخفض إلى 0.25.', 'A priori it was 0.4; knowing that they are late, it drops to 0.25.'),
        why: {
            text: say('Nondik dator formula? $P(A_i\\cap B)$ bi eratara idaztetik, biderkaduraren erregelarekin: $P(B)\\cdot P(A_i/B)=P(A_i)\\cdot P(B/A_i)$. $P(A_i/B)$ askatuta, Bayes ateratzen da.', '¿De dónde sale la fórmula? De escribir $P(A_i\\cap B)$ de dos maneras con la regla del producto: $P(B)\\cdot P(A_i/B)=P(A_i)\\cdot P(B/A_i)$. Despejando $P(A_i/B)$ sale Bayes.', 'من أين تأتي الصيغة؟ من كتابة $P(A_i\\cap B)$ بطريقتين بقاعدة الضرب: $P(B)\\cdot P(A_i/B)=P(A_i)\\cdot P(B/A_i)$. وبعزل $P(A_i/B)$ نحصل على بايز.', 'Where does the formula come from? From writing $P(A_i\\cap B)$ in two ways with the multiplication rule: $P(B)\\cdot P(A_i/B)=P(A_i)\\cdot P(B/A_i)$. Solving for $P(A_i/B)$ gives Bayes.')
        }
    },
    'diagnostic-tests': {
        definitions: [
            { term: say('Sentikortasuna', 'Sensibilidad', 'الحساسية', 'Sensitivity'), meaning: say('Proba positibo ateratzeko probabilitatea, pertsona gaixo dagoenean: $P(+/E)$.', 'La probabilidad de que la prueba dé positivo en una persona enferma: $P(+/E)$.', 'احتمال أن تكون نتيجة الاختبار إيجابية لدى شخص مريض: $P(+/E)$.', 'The probability that the test is positive in a person who is ill: $P(+/E)$.') },
            { term: say('Positibo faltsua', 'Falso positivo', 'إيجابي كاذب', 'False positive'), meaning: say('Pertsona osasuntsu batean ateratako positibo bat; haren probabilitatea $P(+/\\overline{E})$ da.', 'Un positivo en una persona sana; su probabilidad es $P(+/\\overline{E})$.', 'نتيجة إيجابية لدى شخص سليم، واحتمالها $P(+/\\overline{E})$.', 'A positive in a healthy person; its probability is $P(+/\\overline{E})$.') },
            { term: say('Prebalentzia', 'Prevalencia', 'معدل الانتشار', 'Prevalence'), meaning: say('Gaixotasuna duen biztanleriaren zatia: $P(E)$, a priori probabilitatea.', 'La parte de la población que tiene la enfermedad: $P(E)$, la probabilidad a priori.', 'نسبة السكان المصابين بالمرض: $P(E)$، أي الاحتمال القبلي.', 'The part of the population that has the disease: $P(E)$, the prior probability.') }
        ],
        vocabulary: [
            say('positiboa', 'positivo', 'إيجابي', 'positive'),
            say('osasuntsua', 'sano', 'سليم', 'healthy'),
            say('gaixoa', 'enfermo', 'مريض', 'ill')
        ],
        explanation: say(
            'Proba mediko bat ez da perfektua: batzuetan huts egiten du gaixoekin, eta batzuetan positibo ateratzen da osasuntsuetan. Pazienteari $P(E/+)$ interesatzen zaio, eta hori Bayes da. Pertsona asko imajinatuta, formularik gabe ikusten da: osasuntsuak oso-oso asko badira, positibo faltsuen ehuneko txiki batek ere positiboen taldea betetzen du.',
            'Una prueba médica no es perfecta: a veces falla con enfermos y a veces da positivo en sanos. Al paciente le interesa $P(E/+)$, y eso es Bayes. Imaginando muchas personas se ve sin fórmulas: si los sanos son muchísimos, hasta un pequeño porcentaje de falsos positivos llena el grupo de los positivos.',
            'الاختبار الطبي ليس كاملًا: يخطئ أحيانًا مع المرضى ويعطي أحيانًا نتيجة إيجابية لدى الأصحاء. وما يهم المريض هو $P(E/+)$، وهذا هو بايز. وبتخيّل أشخاص كثيرين نرى ذلك دون صيغ: إذا كان الأصحاء كثيرين جدًّا، فحتى نسبة صغيرة من الإيجابيات الكاذبة تملأ مجموعة الإيجابيين.',
            'A medical test is not perfect: sometimes it misses ill people and sometimes it is positive in healthy ones. What matters to the patient is $P(E/+)$, and that is Bayes. Imagining many people shows it without formulas: if the healthy are very many, even a small percentage of false positives fills up the group of positives.'
        ),
        examplePrompt: say('Proba bera izanda (% 99 eta % 1), zenbat da $P(E/+)$ biztanleen % 10 gaixo badago?', 'Con la misma prueba (99 % y 1 %), ¿cuánto vale $P(E/+)$ si la enfermedad la tiene el 10 % de la población?', 'بالاختبار نفسه (99٪ و1٪)، كم يساوي $P(E/+)$ إذا كان 10٪ من السكان مرضى؟', 'With the same test (99% and 1%), what is $P(E/+)$ if 10% of the population has the disease?'),
        example: same('$\\frac{0{,}1\\cdot 0{,}99}{0{,}1\\cdot 0{,}99+0{,}9\\cdot 0{,}01}=\\frac{0{,}099}{0{,}108}=\\frac{11}{12}$'),
        exampleAnswer: say('Ia 0,92: gaixo gehiagorekin, positibo bat askoz fidagarriagoa da.', 'Casi 0,92: con más enfermos, un positivo es mucho más fiable.', 'نحو 0.92: مع مرضى أكثر تصبح النتيجة الإيجابية أوثق بكثير.', 'Almost 0.92: with more ill people, a positive is much more reliable.'),
        why: {
            text: say('Zergatik hain gutxi? Gaixo bakoitzeko 99 osasuntsu daude. 9900 osasuntsuen % 1 hartuta, 99 positibo faltsu daude, probak detektatzen dituen 99 gaixoak bezainbeste.', '¿Por qué tan poco? Por cada enfermo hay 99 sanos. El 1 % de los 9900 sanos son 99 falsos positivos, tantos como los 99 enfermos que la prueba detecta.', 'لماذا هو قليل إلى هذا الحد؟ مقابل كل مريض هناك 99 سليمًا. و1٪ من الأصحاء الـ 9900 يساوي 99 إيجابيًّا كاذبًا، بعدد المرضى الـ 99 الذين يكشفهم الاختبار.', 'Why so little? For each ill person there are 99 healthy ones. 1% of the 9,900 healthy people is 99 false positives, as many as the 99 ill people the test detects.')
        }
    },
    'two-stage': {
        vocabulary: [
            say('lehen urratsa', 'primer paso', 'الخطوة الأولى', 'first step'),
            say('osaera', 'composición', 'التركيب', 'composition'),
            say('adarra', 'rama', 'الفرع', 'branch')
        ],
        explanation: say(
            'Problema askotan, lehen urratsa ez da emandako kausa bat, bigarrena aldatzen duen esperimentu bat baizik: bola bat pasatzen da, kutxa bat aukeratzen da edo erabakitzen duen dado bat botatzen da. Gakoa da lehen urratsaren emaitza bakoitzerako idaztea nola geratzen den bigarrena. Gero probabilitate osoa aplikatzen da eta, atzerantz galdetzen bada, Bayes.',
            'En muchos problemas, el primer paso no es una causa dada, sino un experimento que cambia el segundo: se pasa una bola, se elige una urna o se tira un dado que decide. La clave es escribir, para cada resultado del primer paso, cómo queda el segundo. Después se aplica la probabilidad total y, si se pregunta hacia atrás, Bayes.',
            'في كثير من المسائل لا تكون الخطوة الأولى سببًا معطى، بل تجربة تغيّر الثانية: تُنقل كرة، أو تُختار جرّة، أو يُرمى نرد يقرّر. والمفتاح أن نكتب لكل نتيجة من الخطوة الأولى كيف تصير الثانية. ثم نطبّق الاحتمال الكلي، وإذا كان السؤال إلى الوراء فبايز.',
            'In many problems, the first step is not a given cause, but an experiment that changes the second: a ball is moved, an urn is chosen or a die is rolled to decide. The key is to write, for each result of the first step, what the second one looks like. Then apply total probability and, if the question goes backwards, Bayes.'
        ),
        examplePrompt: say('I kutxa: 2 zuri eta 2 beltz; II kutxa: 3 zuri eta beltz 1. Bat zoriz aukeratu, eta bi bola ateratzen dira itzuli gabe. Zein da bi beltz ateratzeko probabilitatea?', 'Urna I: 2 blancas y 2 negras; urna II: 3 blancas y 1 negra. Se elige una al azar y se sacan dos bolas sin devolver. ¿Probabilidad de dos negras?', 'الجرّة I: كرتان بيضاوان وكرتان سوداوان؛ الجرّة II: 3 بيضاء وسوداء واحدة. تُختار إحداهما عشوائيًّا وتُسحب كرتان دون إرجاع. ما احتمال سوداوين؟', 'Urn I: 2 white and 2 black; urn II: 3 white and 1 black. One is chosen at random and two balls are drawn without replacement. Probability of two black?'),
        example: same('$\\frac{1}{2}\\cdot\\frac{2}{4}\\cdot\\frac{1}{3}+\\frac{1}{2}\\cdot 0=\\frac{1}{12}$'),
        exampleAnswer: say('II kutxarekin ezinezkoa da: beltz bakarra du.', 'Con la urna II es imposible: solo tiene una negra.', 'مع الجرّة II هذا مستحيل: فيها سوداء واحدة فقط.', 'With urn II it is impossible: it has only one black ball.')
    }
}
