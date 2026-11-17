import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { CommitteeFigure, ConditionTableFigure, CountingLaplaceFigure, MoviesVennFigure, OfficeTreeFigure, PetsVennFigure, PodiumFigure, PollBarFigure, ScreeningFigure, ShopsTreeFigure, SpeechesFigure, SurveyTableFigure, TurnsVennFigure, PosteriorBarsFigure, MosaicSocialFigure } from './figures'
import { probabilityBatx2gLessonChecks, type ProbabilityBatx2gTopicId } from './lessonChecks'
import { probabilityBatx2gLessonTexts } from './lessonTexts'

/* ==========================================================================
   Probabilitatea · Batxilergoa 2 · Gizarte Zientziak — stages and lessons.
   The scope follows unit 10 of Santillana 2.º Bachillerato Ciencias
   Sociales (which opens with counting) and unit 10 of Anaya, with the
   style of the Basque university entrance exam: tables and percentages,
   two events with data, total probability and Bayes. Simpler than the
   Ciencias unit (no space of events, no axioms) and with contexts of
   society: polls, shops, health, transport. All the exercises and numbers
   are our own. Notation as in 4. DBH: P(A), \overline{A}, P(A/B), and
   V_{n,k}, VR_{n,k}, P_n, C_{n,k} for counting.
   ========================================================================== */

export type ProbabilityBatx2gStageId = 'counting' | 'events' | 'conditional' | 'bayes'

export const probabilityBatx2gStages: UnitStage[] = [
    { id: 'counting', tone: 'blue', title: { eu: 'Zenbatzen ikasi', es: 'Aprender a contar', en: 'Learning to count', ar: 'تعلّم العدّ' } },
    { id: 'events', tone: 'violet', title: { eu: 'Gertaerak eta Laplace', es: 'Sucesos y Laplace', en: 'Events and Laplace', ar: 'الأحداث ولابلاس' } },
    { id: 'conditional', tone: 'mustard', title: { eu: 'Taulak eta baldintzatua', es: 'Tablas y condicionada', en: 'Tables and conditional probability', ar: 'الجداول والاحتمال المشروط' } },
    { id: 'bayes', tone: 'coral', title: { eu: 'Probabilitate osoa eta Bayes', es: 'Probabilidad total y Bayes', en: 'Total probability and Bayes', ar: 'الاحتمال الكلي وبايز' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** «Review first»: lessons of 4. DBH académicas that the new ones build on */
const prob = 'dbh4-akademikoak/probabilidad'
const comb = 'dbh4-akademikoak/combinatoria'
const need = {
    variations: { unit: comb, topic: 'variations', title: { eu: 'Aldakuntzak', es: 'Variaciones', en: 'Arrangements', ar: 'التراتيب' } },
    withRepetition: { unit: comb, topic: 'with-repetition', title: { eu: 'Errepikapenezko aldakuntzak', es: 'Variaciones con repetición', en: 'Arrangements with repetition', ar: 'التراتيب مع التكرار' } },
    factorial: { unit: comb, topic: 'factorial', title: { eu: 'Faktoriala', es: 'El factorial', en: 'The factorial', ar: 'المضروب' } },
    permutations: { unit: comb, topic: 'permutations', title: { eu: 'Permutazioak', es: 'Permutaciones', en: 'Permutations', ar: 'التباديل' } },
    combinations: { unit: comb, topic: 'combinations', title: { eu: 'Konbinazioak', es: 'Combinaciones', en: 'Combinations', ar: 'التوافيق' } },
    experiments: { unit: prob, topic: 'experiments', title: { eu: 'Esperimentu aleatorioak eta lagin-espazioa', es: 'Experimentos aleatorios y espacio muestral', en: 'Random experiments and sample space', ar: 'التجارب العشوائية وفضاء العيّنة' } },
    operations: { unit: prob, topic: 'operations', title: { eu: 'Gertaeren arteko eragiketak', es: 'Operaciones con sucesos', en: 'Operations with events', ar: 'العمليات على الأحداث' } },
    compatible: { unit: prob, topic: 'compatible', title: { eu: 'Gertaera bateragarriak eta bateraezinak', es: 'Sucesos compatibles e incompatibles', en: 'Compatible and mutually exclusive events', ar: 'الأحداث المتوافقة والمتنافية' } },
    frequency: { unit: prob, topic: 'frequency', title: { eu: 'Maiztasun erlatiboa eta probabilitatea', es: 'Frecuencia relativa y probabilidad', en: 'Relative frequency and probability', ar: 'التكرار النسبي والاحتمال' } },
    laplace: { unit: prob, topic: 'laplace', title: { eu: 'Laplaceren erregela', es: 'La regla de Laplace', en: 'Laplace\'s rule', ar: 'قاعدة لابلاس' } },
    properties: { unit: prob, topic: 'properties', title: { eu: 'Probabilitatearen propietateak', es: 'Propiedades de la probabilidad', en: 'Properties of probability', ar: 'خصائص الاحتمال' } },
    independent: { unit: prob, topic: 'independent', title: { eu: 'Esperientzia independenteak', es: 'Experiencias independientes', en: 'Independent experiments', ar: 'التجارب المستقلة' } },
    dependent: { unit: prob, topic: 'dependent', title: { eu: 'Mendeko esperientziak', es: 'Experiencias dependientes', en: 'Dependent experiments', ar: 'التجارب التابعة' } },
    trees: { unit: prob, topic: 'trees', title: { eu: 'Zuhaitz-diagramak', es: 'Diagramas de árbol', en: 'Tree diagrams', ar: 'المخططات الشجرية' } },
    contingency: { unit: prob, topic: 'contingency', title: { eu: 'Kontingentzia-taulak', es: 'Tablas de contingencia', en: 'Contingency tables', ar: 'جداول التوافق' } },
    conditional: { unit: prob, topic: 'conditional', title: { eu: 'Probabilitate baldintzatua', es: 'Probabilidad condicionada', en: 'Conditional probability', ar: 'الاحتمال المشروط' } },
    total: { unit: prob, topic: 'total', title: { eu: 'Probabilitate osoa', es: 'Probabilidad total', en: 'Total probability', ar: 'الاحتمال الكلي' } },
    withCombinations: { unit: prob, topic: 'with-combinations', title: { eu: 'Konbinatoria eta Laplaceren erregela', es: 'Combinatoria y regla de Laplace', en: 'Combinatorics and Laplace\'s rule', ar: 'التوافيق وقاعدة لابلاس' } }
}

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Learning to count ---------- */
    {
        id: 'variations',
        stage: 'counting',
        title: say('Aldakuntzak', 'Variaciones', 'التراتيب', 'Arrangements'),
        goal: say('Ordenak axola duenean zenbatzea: aldakuntzak, errepikapenik gabe eta errepikapenarekin.', 'Contar cuando el orden importa: variaciones sin repetición y con repetición.', 'العدّ عندما يهم الترتيب: التراتيب دون تكرار ومع التكرار.', 'Count when the order matters: arrangements without and with repetition.'),
        needs: [need.variations, need.withRepetition],
        problem: say('12 bazkideko elkarte batek lehendakaria, idazkaria eta diruzaina aukeratu behar ditu. Zenbat modutan egin daiteke?', 'Una asociación de 12 socios debe elegir presidente, secretario y tesorero. ¿De cuántas formas puede hacerlo?', 'يجب على جمعية من 12 عضوًا أن تختار رئيسًا وأمينًا للسر وأمينًا للصندوق. بكم طريقة يمكن ذلك؟', 'An association of 12 members has to choose a president, a secretary and a treasurer. In how many ways can it do it?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kargu bakoitza desberdina da: ordenak axola du. Pertsona batek ezin ditu bi kargu izan.', 'Cada cargo es distinto: el orden importa. Una persona no puede tener dos cargos.', 'كل منصب مختلف: الترتيب مهم. ولا يمكن لشخص أن يشغل منصبين.', 'Each post is different: the order matters. One person cannot hold two posts.') },
            { text: say('Lehendakaria 12 artean, idazkaria geratzen diren 11 artean eta diruzaina 10 artean.', 'Presidente entre 12, secretario entre los 11 que quedan y tesorero entre 10.', 'الرئيس من بين 12، وأمين السر من بين 11 الباقين، وأمين الصندوق من بين 10.', 'President among 12, secretary among the 11 left and treasurer among 10.'), math: same('$V_{12,3}=12\\cdot 11\\cdot 10=1320$') }
        ],
        takeaway: say(
            '$n$ elementutatik $k$ ordenatuta aukeratzean, errepikatu gabe: $V_{n,k}=n\\cdot(n-1)\\cdots$, $k$ faktore. Errepika badaiteke: $VR_{n,k}=n^k$.',
            'Al elegir $k$ de $n$ en orden y sin repetir: $V_{n,k}=n\\cdot(n-1)\\cdots$, con $k$ factores. Si se puede repetir: $VR_{n,k}=n^k$.',
            'عند اختيار $k$ من $n$ بترتيب ودون تكرار: $V_{n,k}=n\\cdot(n-1)\\cdots$ بعدد $k$ من العوامل. وإذا جاز التكرار: $VR_{n,k}=n^k$.',
            'When you choose $k$ of $n$ in order and without repeating: $V_{n,k}=n\\cdot(n-1)\\cdots$, with $k$ factors. If repeating is allowed: $VR_{n,k}=n^k$.'
        ),
        figure: (language) => <PodiumFigure language={language} />
    },
    {
        id: 'permutations',
        stage: 'counting',
        title: say('Permutazioak', 'Permutaciones', 'التباديل', 'Permutations'),
        goal: say('Elementu guztiak ordenatzeko moduak zenbatzea faktorialarekin.', 'Contar las formas de ordenar todos los elementos con el factorial.', 'عدّ طرق ترتيب كل العناصر باستعمال المضروب.', 'Count the ways of putting all the elements in order with the factorial.'),
        needs: [need.factorial, need.permutations],
        problem: say('5 hautagaik hitzaldi bana emango dute, bata bestearen atzetik. Zenbat ordenatan egin daiteke?', '5 candidatos darán un mitin cada uno, uno detrás de otro. ¿En cuántos órdenes puede hacerse?', 'سيلقي 5 مرشحين خطابًا لكل منهم، واحدًا بعد الآخر. بكم ترتيبًا يمكن ذلك؟', '5 candidates will each give a speech, one after the other. In how many orders can it be done?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bost hautagaiak ordenatzen dira, guztiak eta errepikatu gabe: permutazio bat da.', 'Se ordenan los cinco candidatos, todos y sin repetir: es una permutación.', 'يُرتَّب المرشحون الخمسة كلهم دون تكرار: إنه تبديل.', 'All five candidates are put in order without repeating: it is a permutation.') },
            { text: say('Lehen tokirako 5 aukera, bigarrenerako 4, eta horrela azkenera arte.', 'Para el primer turno hay 5 opciones, para el segundo 4, y así hasta el último.', 'للدور الأول 5 خيارات، وللثاني 4، وهكذا حتى الأخير.', 'There are 5 choices for the first turn, 4 for the second, and so on to the last.'), math: same('$P_5=5!=5\\cdot 4\\cdot 3\\cdot 2\\cdot 1=120$') }
        ],
        takeaway: say(
            '$n$ elementu guztiak ordenatzeko $P_n=n!$ modu daude. Permutazio bat $n$ elementuren aldakuntza bat da, $k=n$ izanik.',
            'Hay $P_n=n!$ formas de ordenar los $n$ elementos. Una permutación es una variación de $n$ elementos con $k=n$.',
            'هناك $P_n=n!$ طريقة لترتيب العناصر $n$ كلها. والتبديل ترتيب لـ $n$ عنصرًا مع $k=n$.',
            'There are $P_n=n!$ ways of putting the $n$ elements in order. A permutation is an arrangement of $n$ elements with $k=n$.'
        ),
        figure: (language) => <SpeechesFigure language={language} />
    },
    {
        id: 'combinations',
        stage: 'counting',
        title: say('Konbinazioak', 'Combinaciones', 'التوافيق', 'Combinations'),
        goal: say('Ordenak axola ez duenean zenbatzea: batzordeak, taldeak eta loteriak.', 'Contar cuando el orden no importa: comisiones, equipos y loterías.', 'العدّ عندما لا يهم الترتيب: اللجان والفرق واليانصيب.', 'Count when the order does not matter: committees, teams and lotteries.'),
        needs: [need.combinations],
        problem: say('10 bizilagunen artean 3 pertsonako batzorde bat osatu behar da. Zenbat batzorde desberdin daude?', 'Hay que formar una comisión de 3 personas entre 10 vecinos. ¿Cuántas comisiones distintas hay?', 'يجب تكوين لجنة من 3 أشخاص من بين 10 جيران. كم لجنة مختلفة توجد؟', 'A committee of 3 people has to be formed from 10 neighbours. How many different committees are there?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordenarekin, $V_{10,3}$ zerrenda leudeke.', 'Con orden, habría $V_{10,3}$ listas.', 'مع الترتيب ستكون هناك $V_{10,3}$ قائمة.', 'With order, there would be $V_{10,3}$ lists.'), math: same('$V_{10,3}=10\\cdot 9\\cdot 8=720$') },
            { text: say('Batzorde bakoitza $3!$ aldiz zenbatu da, kide berak ordena desberdinetan.', 'Cada comisión se ha contado $3!$ veces, los mismos miembros en distinto orden.', 'كل لجنة حُسبت $3!$ مرات، الأعضاء أنفسهم بترتيب مختلف.', 'Each committee has been counted $3!$ times, the same members in a different order.'), math: same('$C_{10,3}=\\frac{720}{6}=120$') }
        ],
        takeaway: say(
            'Ordenak axola ez badu, konbinazioak dira: $C_{n,k}=\\binom{n}{k}=\\frac{V_{n,k}}{k!}$.',
            'Si el orden no importa, son combinaciones: $C_{n,k}=\\binom{n}{k}=\\frac{V_{n,k}}{k!}$.',
            'إذا لم يهم الترتيب فهي توافيق: $C_{n,k}=\\binom{n}{k}=\\frac{V_{n,k}}{k!}$.',
            'If the order does not matter, they are combinations: $C_{n,k}=\\binom{n}{k}=\\frac{V_{n,k}}{k!}$.'
        ),
        figure: (language) => <CommitteeFigure language={language} />
    },
    {
        id: 'counting-laplace',
        stage: 'counting',
        title: say('Laplace konbinatoriarekin', 'Laplace con combinatoria', 'لابلاس مع التوافيق', 'Laplace with counting'),
        goal: say('Zozketa baten probabilitatea kalkulatzea, kasu aldekoak eta posibleak irizpide berarekin zenbatuta.', 'Calcular la probabilidad de un sorteo contando los casos favorables y posibles con el mismo criterio.', 'حساب احتمال قرعة بعدّ الحالات الملائمة والممكنة بالمعيار نفسه.', 'Work out the probability of a draw, counting the favourable and the possible cases in the same way.'),
        needs: [need.laplace, need.withCombinations],
        problem: say('7 emakume eta 5 gizoneko talde batean, 3 pertsonako batzorde bat zozketatzen da. Zein da hirurak emakumeak izateko probabilitatea?', 'En un grupo de 7 mujeres y 5 hombres se sortea una comisión de 3 personas. ¿Qué probabilidad hay de que las tres sean mujeres?', 'في مجموعة من 7 نساء و5 رجال تُجرى قرعة للجنة من 3 أشخاص. ما احتمال أن يكون الثلاثة نساء؟', 'In a group of 7 women and 5 men, a committee of 3 people is drawn by lot. What is the probability that all three are women?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kasu posibleak: 12 pertsonatik 3, ordenarik gabe.', 'Casos posibles: 3 de las 12 personas, sin orden.', 'الحالات الممكنة: 3 من 12 شخصًا دون ترتيب.', 'Possible cases: 3 of the 12 people, with no order.'), math: same('$C_{12,3}=\\frac{12\\cdot 11\\cdot 10}{6}=220$') },
            { text: say('Aldeko kasuak: 7 emakumeetatik 3.', 'Casos favorables: 3 de las 7 mujeres.', 'الحالات الملائمة: 3 من النساء السبع.', 'Favourable cases: 3 of the 7 women.'), math: same('$C_{7,3}=\\frac{7\\cdot 6\\cdot 5}{6}=35$') },
            { text: say('Laplace.', 'Laplace.', 'لابلاس.', 'Laplace.'), math: same('$P=\\frac{35}{220}=\\frac{7}{44}$') }
        ],
        takeaway: say(
            'Zozketa batean emaitza guztiak berdin probableak dira: $P(A)$ aldeko kasuak zati kasu posibleak da, biak irizpide berarekin zenbatuta (biak ordenarekin edo biak gabe).',
            'En un sorteo todos los resultados son igual de probables: $P(A)$ es casos favorables entre posibles, contados con el mismo criterio (los dos con orden o los dos sin él).',
            'في القرعة تكون كل النتائج متساوية الاحتمال: $P(A)$ هو الحالات الملائمة على الممكنة، محسوبة بالمعيار نفسه (كلاهما بترتيب أو كلاهما دونه).',
            'In a draw all the outcomes are equally likely: $P(A)$ is favourable cases over possible cases, both counted in the same way (both with order or both without).'
        ),
        figure: (language) => <CountingLaplaceFigure language={language} />
    },

    /* ---------- 2. Events and Laplace ---------- */
    {
        id: 'events',
        stage: 'events',
        title: say('Gertaerak eta eragiketak', 'Sucesos y operaciones', 'الأحداث والعمليات', 'Events and operations'),
        goal: say('Gertaerak multzo gisa idaztea eta bildura, ebakidura eta aurkakoa egitea, De Morganen legeekin.', 'Escribir sucesos como conjuntos y hacer la unión, la intersección y el contrario, con las leyes de De Morgan.', 'كتابة الأحداث في صورة مجموعات وإجراء الاتحاد والتقاطع والمعاكس، مع قانوني دي مورغان.', 'Write events as sets and work out the union, the intersection and the complement, with De Morgan\'s laws.'),
        needs: [need.experiments, need.operations, need.compatible],
        problem: say('Bulego batek 10 txanda ditu, 1 eta 10 arteko zenbakiekin. Txanda bat zoriz ateratzen da. $A$ = «txanda bikoitia» eta $B$ = «6 baino handiagoa». Idatzi $A\\cup B$, $A\\cap B$ eta $\\overline{A}$.', 'Una oficina reparte 10 turnos numerados del 1 al 10 y sale uno al azar. $A$ = «turno par» y $B$ = «mayor que 6». Escribe $A\\cup B$, $A\\cap B$ y $\\overline{A}$.', 'يوزّع مكتب 10 أدوار مرقّمة من 1 إلى 10 ويُسحب دور عشوائيًّا. $A$ = «دور زوجي» و$B$ = «أكبر من 6». اكتب $A\\cup B$ و$A\\cap B$ و$\\overline{A}$.', 'An office hands out 10 turns numbered 1 to 10 and one is drawn at random. $A$ = «even turn» and $B$ = «greater than 6». Write $A\\cup B$, $A\\cap B$ and $\\overline{A}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi bi gertaerak multzo gisa.', 'Escribe los dos sucesos como conjuntos.', 'اكتب الحدثين في صورة مجموعتين.', 'Write the two events as sets.'), math: same('$A=\\{2,4,6,8,10\\}\\qquad B=\\{7,8,9,10\\}$') },
            { text: say('Bildura «edo» da, eta ebakidura «eta».', 'La unión es «o», y la intersección, «y».', 'الاتحاد «أو»، والتقاطع «و».', 'The union is ‘or’, and the intersection, ‘and’.'), math: same('$A\\cup B=\\{2,4,6,7,8,9,10\\}\\qquad A\\cap B=\\{8,10\\}$') },
            { text: say('Aurkakoa: $A$ ez dena.', 'El contrario: lo que no es $A$.', 'المعاكس: ما ليس $A$.', 'The complement: what is not $A$.'), math: same('$\\overline{A}=\\{1,3,5,7,9\\}$') }
        ],
        takeaway: say(
            '$A\\cup B$: $A$ edo $B$. $A\\cap B$: biak. $\\overline{A}$: $A$ ez. De Morgan: $\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$ (ez bata ez bestea) eta $\\overline{A\\cap B}=\\overline{A}\\cup\\overline{B}$.',
            '$A\\cup B$: $A$ o $B$. $A\\cap B$: los dos. $\\overline{A}$: no $A$. De Morgan: $\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$ (ni uno ni otro) y $\\overline{A\\cap B}=\\overline{A}\\cup\\overline{B}$.',
            '$A\\cup B$: $A$ أو $B$. و$A\\cap B$: كلاهما. و$\\overline{A}$: ليس $A$. دي مورغان: $\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$ (لا هذا ولا ذاك) و$\\overline{A\\cap B}=\\overline{A}\\cup\\overline{B}$.',
            '$A\\cup B$: $A$ or $B$. $A\\cap B$: both. $\\overline{A}$: not $A$. De Morgan: $\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$ (neither one nor the other) and $\\overline{A\\cap B}=\\overline{A}\\cup\\overline{B}$.'
        ),
        figureAfterSteps: true,
        figure: (language) => <TurnsVennFigure language={language} />
    },
    {
        id: 'frequency',
        stage: 'events',
        title: say('Maiztasuna eta Laplace', 'Frecuencia y Laplace', 'التكرار ولابلاس', 'Frequency and Laplace'),
        goal: say('Inkesta baten maiztasun erlatiboarekin probabilitate bat estimatzea, eta Laplace noiz erabil daitekeen jakitea.', 'Estimar una probabilidad con la frecuencia relativa de una encuesta y saber cuándo se puede usar Laplace.', 'تقدير احتمال بالتكرار النسبي لاستطلاع، ومعرفة متى يمكن استعمال لابلاس.', 'Estimate a probability with the relative frequency of a poll, and know when Laplace can be used.'),
        needs: [need.frequency, need.laplace],
        problem: say('Auzo batean 400 pertsonari galdetu zaie, eta horietatik 260 proposamen baten alde daude. Estimatu bizilagun bat zoriz aukeratuta proposamena babesteko probabilitatea, eta ez babesteko probabilitatea.', 'En un barrio se ha preguntado a 400 personas y 260 apoyan una propuesta. Estima la probabilidad de que un vecino elegido al azar la apoye, y la de que no la apoye.', 'سُئل 400 شخص في حي، فأيّد 260 منهم اقتراحًا. قدّر احتمال أن يؤيده جار يُختار عشوائيًّا، واحتمال ألّا يؤيده.', 'In a neighbourhood 400 people were asked and 260 support a proposal. Estimate the probability that a neighbour chosen at random supports it, and that they do not.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Babesaren maiztasun erlatiboa.', 'Frecuencia relativa del apoyo.', 'التكرار النسبي للتأييد.', 'Relative frequency of support.'), math: same('$f_r=\\frac{260}{400}=0{,}65$') },
            { text: say('Inkesta handia denez, maiztasuna probabilitatearen estimazio ona da.', 'Como la encuesta es grande, la frecuencia es una buena estimación de la probabilidad.', 'بما أن الاستطلاع كبير فالتكرار تقدير جيد للاحتمال.', 'As the poll is large, the frequency is a good estimate of the probability.'), math: same('$P(A)\\approx 0{,}65$') },
            { text: say('Aurkakoa: 1 ken.', 'El contrario: 1 menos.', 'المعاكس: 1 ناقص.', 'The complement: 1 minus.'), math: same('$P(\\overline{A})\\approx 1-0{,}65=0{,}35$') }
        ],
        takeaway: say(
            'Emaitzak berdin probableak direnean, Laplace: aldekoak zati posibleak. Bestela (iritziak, ohiturak), probabilitatea errepikapen askoren maiztasun erlatiboarekin estimatzen da: zenbat eta datu gehiago, orduan eta hurbilago.',
            'Si los resultados son igual de probables, Laplace: favorables entre posibles. Si no (opiniones, hábitos), la probabilidad se estima con la frecuencia relativa de muchas repeticiones: cuantos más datos, más cerca.',
            'إذا كانت النتائج متساوية الاحتمال فلابلاس: الملائمة على الممكنة. وإلا (الآراء والعادات) يُقدَّر الاحتمال بالتكرار النسبي لتكرارات كثيرة: كلما زادت البيانات اقترب.',
            'If the outcomes are equally likely, Laplace: favourable over possible. If not (opinions, habits), the probability is estimated with the relative frequency of many repetitions: the more data, the closer.'
        ),
        figure: (language) => <PollBarFigure language={language} />
    },
    {
        id: 'union',
        stage: 'events',
        title: say('Bildura eta aurkakoa', 'La unión y el contrario', 'الاتحاد والمعاكس', 'The union and the complement'),
        goal: say('$P(A\\cup B)$ eta $P(\\overline{A})$ propietateekin kalkulatzea: ebakidura behin bakarrik zenbatzen da.', 'Calcular $P(A\\cup B)$ y $P(\\overline{A})$ con las propiedades: la intersección se cuenta una sola vez.', 'حساب $P(A\\cup B)$ و$P(\\overline{A})$ بالخصائص: يُحسب التقاطع مرة واحدة فقط.', 'Work out $P(A\\cup B)$ and $P(\\overline{A})$ with the properties: the intersection is counted only once.'),
        needs: [need.properties],
        problem: say('Herri bateko etxeetatik, % 45 txakurdunak dira ($A$), % 30 katudunak ($B$) eta % 12 biak dituztenak. Zein da etxe batek txakurra edo katua izateko probabilitatea? Eta bat ere ez izatekoa?', 'En un pueblo, el 45 % de las casas tiene perro ($A$), el 30 % gato ($B$) y el 12 % las dos cosas. ¿Qué probabilidad hay de que una casa tenga perro o gato? ¿Y de que no tenga ninguno?', 'في قرية، 45 % من البيوت فيها كلب ($A$) و30 % فيها قطة ($B$) و12 % فيها الاثنان. ما احتمال أن يكون في بيت كلب أو قطة؟ وما احتمال ألّا يكون فيه أيٌّ منهما؟', 'In a village, 45% of the homes have a dog ($A$), 30% a cat ($B$) and 12% both. What is the probability that a home has a dog or a cat? And that it has neither?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biak dituzten etxeak bi aldiz zenbatzen dira batzean: kendu behin.', 'Las casas con los dos se cuentan dos veces al sumar: réstalas una vez.', 'البيوت التي فيها الاثنان تُحسب مرتين عند الجمع: اطرحها مرة.', 'Homes with both are counted twice when you add: take them away once.'), math: same('$P(A\\cup B)=0{,}45+0{,}3-0{,}12=0{,}63$') },
            { text: say('«Bat ere ez» bilduraren aurkakoa da (De Morgan).', '«Ninguno» es el contrario de la unión (De Morgan).', '«لا شيء منهما» هو معاكس الاتحاد (دي مورغان).', '‘Neither’ is the complement of the union (De Morgan).'), math: same('$P(\\overline{A}\\cap\\overline{B})=1-0{,}63=0{,}37$') }
        ],
        takeaway: say(
            '$P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$, eta bateraezinak badira, ebakidura 0 da. $P(\\overline{A})=1-P(A)$.',
            '$P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$, y si son incompatibles, la intersección es 0. $P(\\overline{A})=1-P(A)$.',
            '$P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$، وإذا كانا متنافيين فالتقاطع 0. و$P(\\overline{A})=1-P(A)$.',
            '$P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$, and if they are mutually exclusive, the intersection is 0. $P(\\overline{A})=1-P(A)$.'
        ),
        figureAfterSteps: true,
        figure: (language) => <PetsVennFigure language={language} />
    },
    {
        id: 'two-events',
        stage: 'events',
        title: say('Bi gertaera datuekin', 'Dos sucesos con datos', 'حدثان مع معطيات', 'Two events with data'),
        goal: say('Hiru datutik Venn diagramako lau zonak betetzea: «$A$ bai eta $B$ ez», «bat bakarrik» eta «bat ere ez».', 'Rellenar las cuatro zonas del diagrama de Venn a partir de tres datos: «$A$ y no $B$», «solo uno» y «ninguno».', 'ملء المناطق الأربع لمخطط فن انطلاقًا من ثلاث معطيات: «$A$ وليس $B$» و«واحد فقط» و«لا شيء».', 'Fill in the four zones of the Venn diagram from three data: ‘$A$ and not $B$’, ‘only one’ and ‘neither’.'),
        needs: [need.properties, need.compatible],
        problem: say('Hiri bateko biztanleen artean, $P(A)=0{,}6$ zinemara joaten da, $P(B)=0{,}5$ antzokira, eta $P(A\\cup B)=0{,}8$. Kalkulatu $P(A\\cap B)$, $P(A\\cap\\overline{B})$ eta bietako batera bakarrik joateko probabilitatea.', 'Entre los habitantes de una ciudad, $P(A)=0{,}6$ va al cine, $P(B)=0{,}5$ al teatro y $P(A\\cup B)=0{,}8$. Calcula $P(A\\cap B)$, $P(A\\cap\\overline{B})$ y la probabilidad de ir solo a uno de los dos.', 'بين سكان مدينة، $P(A)=0{,}6$ يذهب إلى السينما، و$P(B)=0{,}5$ إلى المسرح، و$P(A\\cup B)=0{,}8$. احسب $P(A\\cap B)$ و$P(A\\cap\\overline{B})$ واحتمال الذهاب إلى واحد فقط منهما.', 'Among the people of a city, $P(A)=0{,}6$ go to the cinema, $P(B)=0{,}5$ to the theatre and $P(A\\cup B)=0{,}8$. Work out $P(A\\cap B)$, $P(A\\cap\\overline{B})$ and the probability of going to only one of the two.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ebakidura, bilduraren formulatik.', 'La intersección, de la fórmula de la unión.', 'التقاطع من صيغة الاتحاد.', 'The intersection, from the formula of the union.'), math: same('$P(A\\cap B)=0{,}6+0{,}5-0{,}8=0{,}3$') },
            { text: say('«$A$ bai eta $B$ ez»: $A$ ken ebakidura.', '«$A$ y no $B$»: $A$ menos la intersección.', '«$A$ وليس $B$»: $A$ ناقص التقاطع.', '‘$A$ and not $B$’: $A$ minus the intersection.'), math: same('$P(A\\cap\\overline{B})=0{,}6-0{,}3=0{,}3$') },
            { text: say('«Bat bakarrik»: bildura ken ebakidura.', '«Solo uno»: la unión menos la intersección.', '«واحد فقط»: الاتحاد ناقص التقاطع.', '‘Only one’: the union minus the intersection.'), math: same('$0{,}8-0{,}3=0{,}5$') }
        ],
        takeaway: say(
            'Hiru datu nahikoak dira lau zonak betetzeko. $P(A\\cap\\overline{B})=P(A)-P(A\\cap B)$; «bat bakarrik» $=P(A\\cup B)-P(A\\cap B)$; «bat ere ez» $=1-P(A\\cup B)$.',
            'Tres datos bastan para rellenar las cuatro zonas. $P(A\\cap\\overline{B})=P(A)-P(A\\cap B)$; «solo uno» $=P(A\\cup B)-P(A\\cap B)$; «ninguno» $=1-P(A\\cup B)$.',
            'تكفي ثلاث معطيات لملء المناطق الأربع. $P(A\\cap\\overline{B})=P(A)-P(A\\cap B)$؛ «واحد فقط» $=P(A\\cup B)-P(A\\cap B)$؛ «لا شيء» $=1-P(A\\cup B)$.',
            'Three data are enough to fill in the four zones. $P(A\\cap\\overline{B})=P(A)-P(A\\cap B)$; ‘only one’ $=P(A\\cup B)-P(A\\cap B)$; ‘neither’ $=1-P(A\\cup B)$.'
        ),
        figureAfterSteps: true,
        figure: (language) => <MoviesVennFigure language={language} />
    },

    /* ---------- 3. Tables and conditional probability ---------- */
    {
        id: 'tables',
        stage: 'conditional',
        title: say('Kontingentzia-taulak', 'Tablas de contingencia', 'جداول التوافق', 'Contingency tables'),
        goal: say('Inkesta baten taula osatzea eta haren laukietan ebakidurak eta guztizkoak irakurtzea.', 'Completar la tabla de una encuesta y leer en sus casillas intersecciones y totales.', 'إكمال جدول استطلاع وقراءة التقاطعات والمجاميع في خاناته.', 'Complete the table of a poll and read intersections and totals in its cells.'),
        needs: [need.contingency],
        problem: say('Garraioari buruzko inkesta batean 200 pertsonari galdetu zaie: 120 gazteak dira, 90 autobusez ibiltzen dira eta 70 gazteak dira eta autobusez ibiltzen dira. Osatu taula eta kalkulatu pertsona bat heldua izateko eta autoz ibiltzeko probabilitatea.', 'En una encuesta sobre transporte a 200 personas, 120 son jóvenes, 90 van en autobús y 70 son jóvenes que van en autobús. Completa la tabla y calcula la probabilidad de que una persona sea adulta y vaya en coche.', 'في استطلاع حول النقل شمل 200 شخص، 120 منهم شباب، و90 يتنقلون بالحافلة، و70 شباب يتنقلون بالحافلة. أكمل الجدول واحسب احتمال أن يكون شخص بالغًا ويتنقل بالسيارة.', 'In a transport poll of 200 people, 120 are young, 90 travel by bus and 70 are young people who travel by bus. Complete the table and work out the probability that a person is an adult and travels by car.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Gazteen errenkada: autoz, 120 ken 70.', 'Fila de jóvenes: en coche, 120 menos 70.', 'صف الشباب: بالسيارة 120 ناقص 70.', 'Young row: by car, 120 minus 70.'), math: same('$120-70=50$') },
            { text: say('Autobusaren zutabea: helduak, 90 ken 70. Helduak guztira, 200 ken 120.', 'Columna del autobús: adultos, 90 menos 70. Adultos en total, 200 menos 120.', 'عمود الحافلة: البالغون 90 ناقص 70. والبالغون إجمالًا 200 ناقص 120.', 'Bus column: adults, 90 minus 70. Adults in all, 200 minus 120.'), math: same('$90-70=20\\qquad 200-120=80$') },
            { text: say('Helduak autoz: 80 ken 20. Ebakidura bat da, guztizkoaren gainean.', 'Adultos en coche: 80 menos 20. Es una intersección, sobre el total.', 'البالغون بالسيارة: 80 ناقص 20. إنه تقاطع على الكل.', 'Adults by car: 80 minus 20. It is an intersection, over the total.'), math: same('$\\frac{80-20}{200}=\\frac{60}{200}=0{,}3$') }
        ],
        takeaway: say(
            'Taula batean barruko lauki bakoitza ebakidura bat da, eta ertzetakoak guztizkoak. Errenkada eta zutabe bakoitzak batu egiten du; lauki bat beteta, besteak kenketaz ateratzen dira.',
            'En una tabla, cada casilla interior es una intersección y las de los bordes son totales. Cada fila y columna suma; con una casilla llena, las demás salen restando.',
            'في الجدول كل خانة داخلية تقاطع، وخانات الحواف مجاميع. كل صف وعمود يُجمع، وبملء خانة تخرج البقية بالطرح.',
            'In a table, each inner cell is an intersection and those on the edges are totals. Each row and column adds up; with one cell filled, the others come out by subtracting.'
        ),
        figureAfterSteps: true,
        figure: (language) => <SurveyTableFigure language={language} />
    },
    {
        id: 'conditional',
        stage: 'conditional',
        title: say('Probabilitate baldintzatua', 'Probabilidad condicionada', 'الاحتمال المشروط', 'Conditional probability'),
        goal: say('$P(A/B)$ taula batean irakurtzea eta formularekin kalkulatzea: baldintza osoko berria da.', 'Leer $P(A/B)$ en una tabla y calcularla con la fórmula: la condición es el nuevo total.', 'قراءة $P(A/B)$ في جدول وحسابه بالصيغة: الشرط هو الكل الجديد.', 'Read $P(A/B)$ in a table and work it out with the formula: the condition is the new total.'),
        needs: [need.conditional],
        problem: say('Erreferendum baterako inkesta batean 500 pertsona daude: 300 emakume dira, eta horietatik 180 emakumek «bai» bozkatuko dute; guztira, 260 pertsonak bozkatuko dute «bai». Kalkulatu $P(S/M)$ eta $P(M/S)$, $S$ = «bai» eta $M$ = «emakumea» izanik.', 'En una encuesta para un referéndum hay 500 personas: 300 son mujeres, 180 de ellas votarán «sí» y en total votarán «sí» 260. Calcula $P(S/M)$ y $P(M/S)$, con $S$ = «sí» y $M$ = «mujer».', 'في استطلاع لاستفتاء 500 شخص: 300 منهم نساء، ستصوّت 180 منهن بـ«نعم»، وإجمالًا سيصوّت 260 بـ«نعم». احسب $P(S/M)$ و$P(M/S)$، حيث $S$ = «نعم» و$M$ = «امرأة».', 'In a referendum poll there are 500 people: 300 are women, 180 of them will vote ‘yes’ and in all 260 will vote ‘yes’. Work out $P(S/M)$ and $P(M/S)$, with $S$ = ‘yes’ and $M$ = ‘woman’.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$P(S/M)$: emakumeen artean bakarrik begiratzen da. Emakumeak dira osoko berria.', '$P(S/M)$: solo se mira entre las mujeres. Las mujeres son el nuevo total.', '$P(S/M)$: ننظر بين النساء فقط. النساء هن الكل الجديد.', '$P(S/M)$: you only look among the women. The women are the new total.'), math: same('$P(S/M)=\\frac{180}{300}=0{,}6$') },
            { text: say('$P(M/S)$: orain «bai» bozkatzen dutenak dira osoko berria.', '$P(M/S)$: ahora el nuevo total son los que votan «sí».', '$P(M/S)$: الآن الكل الجديد هم المصوّتون بـ«نعم».', '$P(M/S)$: now the new total is those who vote ‘yes’.'), math: same('$P(M/S)=\\frac{180}{260}=\\frac{9}{13}$') }
        ],
        takeaway: say(
            '$P(A/B)=\\frac{P(A\\cap B)}{P(B)}$: $B$ gertatu dela jakinda, $B$ da osoko berria. Oro har, $P(A/B)\\neq P(B/A)$.',
            '$P(A/B)=\\frac{P(A\\cap B)}{P(B)}$: sabiendo que ha ocurrido $B$, $B$ es el nuevo total. En general, $P(A/B)\\neq P(B/A)$.',
            '$P(A/B)=\\frac{P(A\\cap B)}{P(B)}$: مع العلم بوقوع $B$ يصبح $B$ هو الكل الجديد. وعمومًا $P(A/B)\\neq P(B/A)$.',
            '$P(A/B)=\\frac{P(A\\cap B)}{P(B)}$: knowing that $B$ has happened, $B$ is the new total. In general, $P(A/B)\\neq P(B/A)$.'
        ),
        figure: (language) => <ConditionTableFigure language={language} />
    },
    {
        id: 'independence',
        stage: 'conditional',
        title: say('Gertaera independenteak', 'Sucesos independientes', 'الأحداث المستقلة', 'Independent events'),
        goal: say('Bi gertaera independenteak diren egiaztatzea biderkaduraren probarekin, eta independentea eta bateraezina ez nahastea.', 'Comprobar si dos sucesos son independientes con la prueba del producto, y no confundir independiente con incompatible.', 'التحقق من استقلال حدثين باختبار الجداء، وعدم الخلط بين المستقل والمتنافي.', 'Check whether two events are independent with the product test, and not mix up independent with mutually exclusive.'),
        needs: [need.independent, need.conditional],
        problem: say('Denda bateko bezeroetatik, % 40 online erosleak dira ($A$), % 25 gazteak, 30 urtetik beherakoak ($B$), eta % 10 biak. Independenteak dira $A$ eta $B$?', 'El 40 % de los clientes de una tienda compra online ($A$), el 25 % tiene menos de 30 años ($B$) y el 10 % cumple las dos cosas. ¿Son independientes $A$ y $B$?', '40 % من زبائن متجر يشترون عبر الإنترنت ($A$)، و25 % أعمارهم أقل من 30 سنة ($B$)، و10 % يجمعون الأمرين. هل $A$ و$B$ مستقلان؟', '40% of a shop\'s customers buy online ($A$), 25% are under 30 ($B$) and 10% are both. Are $A$ and $B$ independent?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu bi probabilitateak.', 'Multiplica las dos probabilidades.', 'اضرب الاحتمالين.', 'Multiply the two probabilities.'), math: same('$P(A)\\cdot P(B)=0{,}4\\cdot 0{,}25=0{,}1$') },
            { text: say('Ebakiduraren berdina da: independenteak dira. Baldintzak ez du ezer aldatzen.', 'Es igual a la intersección: son independientes. La condición no cambia nada.', 'يساوي التقاطع: إنهما مستقلان. الشرط لا يغيّر شيئًا.', 'It equals the intersection: they are independent. The condition changes nothing.'), math: same('$P(A/B)=\\frac{0{,}1}{0{,}25}=0{,}4=P(A)$') }
        ],
        takeaway: say(
            '$A$ eta $B$ independenteak dira $P(A\\cap B)=P(A)\\cdot P(B)$ bada, hau da, $P(A/B)=P(A)$. Bateraezinak ($P(A\\cap B)=0$) eta probabilitate positibokoak badira, ez dira independenteak.',
            '$A$ y $B$ son independientes si $P(A\\cap B)=P(A)\\cdot P(B)$, es decir, si $P(A/B)=P(A)$. Si son incompatibles ($P(A\\cap B)=0$) y con probabilidades positivas, no son independientes.',
            'يكون $A$ و$B$ مستقلين إذا كان $P(A\\cap B)=P(A)\\cdot P(B)$، أي $P(A/B)=P(A)$. وإذا كانا متنافيين ($P(A\\cap B)=0$) باحتمالين موجبين فليسا مستقلين.',
            '$A$ and $B$ are independent if $P(A\\cap B)=P(A)\\cdot P(B)$, that is, if $P(A/B)=P(A)$. If they are mutually exclusive ($P(A\\cap B)=0$) with positive probabilities, they are not independent.'
        ),
        figure: (language) => <MosaicSocialFigure language={language} />
    },
    {
        id: 'trees',
        stage: 'conditional',
        title: say('Zuhaitzak eta biderkaduraren erregela', 'Árboles y regla del producto', 'الأشجار وقاعدة الجداء', 'Trees and the product rule'),
        goal: say('Bi urratseko aukeraketak zuhaitz batekin ebaztea, itzuli gabe: bidean biderkatu, bideen artean batu.', 'Resolver elecciones en dos pasos con un árbol, sin devolución: en un camino se multiplica, entre caminos se suma.', 'حل الاختيارات على خطوتين بشجرة دون إرجاع: نضرب في المسار ونجمع بين المسارات.', 'Solve two-step choices with a tree, without replacement: multiply along a path, add between paths.'),
        needs: [need.trees, need.dependent],
        problem: say('Bulego batean 6 emakume eta 4 gizon daude. Bi pertsona aukeratzen dira zoriz ikastaro baterako. Zein da emakume bat eta gizon bat izateko probabilitatea?', 'En una oficina hay 6 mujeres y 4 hombres. Se eligen dos personas al azar para un curso. ¿Qué probabilidad hay de que sean una mujer y un hombre?', 'في مكتب 6 نساء و4 رجال. يُختار شخصان عشوائيًّا لدورة. ما احتمال أن يكونا امرأة ورجلًا؟', 'In an office there are 6 women and 4 men. Two people are chosen at random for a course. What is the probability that they are one woman and one man?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bi bide daude: emakumea eta gero gizona, edo gizona eta gero emakumea. Bigarrenean 9 pertsona geratzen dira.', 'Hay dos caminos: mujer y luego hombre, u hombre y luego mujer. En el segundo quedan 9 personas.', 'هناك مساران: امرأة ثم رجل، أو رجل ثم امرأة. في الاختيار الثاني يبقى 9 أشخاص.', 'There are two paths: woman then man, or man then woman. For the second choice 9 people are left.'), math: same('$\\frac{6}{10}\\cdot\\frac{4}{9}=\\frac{24}{90}\\qquad\\frac{4}{10}\\cdot\\frac{6}{9}=\\frac{24}{90}$') },
            { text: say('Batu bi bideak.', 'Suma los dos caminos.', 'اجمع المسارين.', 'Add the two paths.'), math: same('$\\frac{24}{90}+\\frac{24}{90}=\\frac{48}{90}=\\frac{8}{15}$') }
        ],
        takeaway: say(
            'Biderkaduraren erregela: $P(A\\cap B)=P(A)\\cdot P(B/A)$. Zuhaitzean, adarrak baldintzatuak dira: bidean biderkatu eta bideen artean batu.',
            'Regla del producto: $P(A\\cap B)=P(A)\\cdot P(B/A)$. En el árbol las ramas son condicionadas: se multiplica en el camino y se suma entre caminos.',
            'قاعدة الجداء: $P(A\\cap B)=P(A)\\cdot P(B/A)$. في الشجرة الفروع مشروطة: نضرب في المسار ونجمع بين المسارات.',
            'Product rule: $P(A\\cap B)=P(A)\\cdot P(B/A)$. In the tree the branches are conditional: multiply along the path and add between paths.'
        ),
        figureAfterSteps: true,
        figure: (language) => <OfficeTreeFigure language={language} />
    },

    /* ---------- 4. Total probability and Bayes ---------- */
    {
        id: 'total',
        stage: 'bayes',
        title: say('Probabilitate osoa', 'Probabilidad total', 'الاحتمال الكلي', 'Total probability'),
        goal: say('Hainbat jatorritatik iristen den gertaera baten probabilitatea kalkulatzea: bide guztiak batuz.', 'Calcular la probabilidad de un suceso al que se llega por varios orígenes, sumando todos los caminos.', 'حساب احتمال حدث يُوصَل إليه من عدة مصادر بجمع كل المسارات.', 'Work out the probability of an event that can be reached from several sources, by adding all the paths.'),
        needs: [need.total, need.trees],
        problem: say('Online denda batek hiru biltegitatik bidaltzen ditu eskaerak: % 45 A biltegitik, % 35 B biltegitik eta % 20 C biltegitik. Itzultzen diren eskaerak % 4, % 2 eta % 10 dira, hurrenez hurren. Zein da eskaera bat itzultzeko probabilitatea?', 'Una tienda online envía sus pedidos desde tres almacenes: el 45 % desde A, el 35 % desde B y el 20 % desde C. Se devuelven el 4 %, el 2 % y el 10 % de sus pedidos, respectivamente. ¿Qué probabilidad hay de que un pedido se devuelva?', 'يرسل متجر إلكتروني طلباته من ثلاثة مستودعات: 45 % من A و35 % من B و20 % من C. ويُعاد 4 % و2 % و10 % من طلباتها على الترتيب. ما احتمال أن يُعاد طلب؟', 'An online shop sends its orders from three warehouses: 45% from A, 35% from B and 20% from C. 4%, 2% and 10% of their orders are returned, respectively. What is the probability that an order is returned?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biltegi bakoitzetik «itzulita» adarrera dagoen bidea: biderkatu.', 'El camino de cada almacén a «devuelto»: multiplica.', 'المسار من كل مستودع إلى «مُعاد»: اضرب.', 'The path from each warehouse to ‘returned’: multiply.'), math: same('$0{,}45\\cdot 0{,}04=0{,}018\\qquad 0{,}35\\cdot 0{,}02=0{,}007\\qquad 0{,}2\\cdot 0{,}1=0{,}02$') },
            { text: say('Batu hiru bideak.', 'Suma los tres caminos.', 'اجمع المسارات الثلاثة.', 'Add the three paths.'), math: same('$P(D)=0{,}018+0{,}007+0{,}02=0{,}045$') }
        ],
        takeaway: say(
            '$A_1,\\dots,A_n$ gertaerek sistema oso bat osatzen badute (bateraezinak eta denen artean dena), $P(D)=P(A_1)\\,P(D/A_1)+\\dots+P(A_n)\\,P(D/A_n)$.',
            'Si $A_1,\\dots,A_n$ forman un sistema completo (incompatibles y entre todos el total), $P(D)=P(A_1)\\,P(D/A_1)+\\dots+P(A_n)\\,P(D/A_n)$.',
            'إذا كوّنت $A_1,\\dots,A_n$ نظامًا تامًّا (متنافية ومعًا الكل)، فإن $P(D)=P(A_1)\\,P(D/A_1)+\\dots+P(A_n)\\,P(D/A_n)$.',
            'If $A_1,\\dots,A_n$ form a partition (mutually exclusive and together the whole), $P(D)=P(A_1)\\,P(D/A_1)+\\dots+P(A_n)\\,P(D/A_n)$.'
        ),
        figureAfterSteps: true,
        figure: (language) => <ShopsTreeFigure language={language} />
    },
    {
        id: 'bayes',
        stage: 'bayes',
        title: say('Bayesen teorema', 'El teorema de Bayes', 'مبرهنة بايز', 'Bayes\' theorem'),
        goal: say('Emaitza jakinda, jatorri bakoitzaren probabilitatea kalkulatzea: bide bat zati probabilitate osoa.', 'Sabiendo el resultado, calcular la probabilidad de cada origen: un camino entre la probabilidad total.', 'مع العلم بالنتيجة، حساب احتمال كل مصدر: مسار على الاحتمال الكلي.', 'Knowing the result, work out the probability of each source: one path over the total probability.'),
        needs: [need.total, need.conditional],
        problem: say('Aurreko dendan, eskaera bat itzuli egin da. Zein da C biltegitik etortzeko probabilitatea?', 'En la tienda anterior, un pedido ha sido devuelto. ¿Qué probabilidad hay de que viniera del almacén C?', 'في المتجر السابق أُعيد طلب. ما احتمال أن يكون قد جاء من المستودع C؟', 'In the shop before, an order has been returned. What is the probability that it came from warehouse C?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Osoko berria «itzulita» da: $P(D)=0{,}045$.', 'El nuevo total es «devuelto»: $P(D)=0{,}045$.', 'الكل الجديد هو «مُعاد»: $P(D)=0{,}045$.', 'The new total is ‘returned’: $P(D)=0{,}045$.') },
            { text: say('C biltegiaren bidea zati guztizkoa.', 'El camino del almacén C entre el total.', 'مسار المستودع C على الكل.', 'The path of warehouse C over the total.'), math: same('$P(C/D)=\\frac{0{,}02}{0{,}045}=\\frac{4}{9}$') }
        ],
        takeaway: say(
            'Bayes: $P(A_i/D)=\\frac{P(A_i)\\,P(D/A_i)}{P(D)}$. $P(A_i)$ a priori probabilitateak dira; $P(A_i/D)$, a posteriori: $D$ ikusi ondoren aldatzen dira.',
            'Bayes: $P(A_i/D)=\\frac{P(A_i)\\,P(D/A_i)}{P(D)}$. Las $P(A_i)$ son las probabilidades a priori; las $P(A_i/D)$, a posteriori: cambian después de ver $D$.',
            'بايز: $P(A_i/D)=\\frac{P(A_i)\\,P(D/A_i)}{P(D)}$. الاحتمالات $P(A_i)$ قبلية، و$P(A_i/D)$ بعدية: تتغيّر بعد رؤية $D$.',
            'Bayes: $P(A_i/D)=\\frac{P(A_i)\\,P(D/A_i)}{P(D)}$. The $P(A_i)$ are the prior probabilities; the $P(A_i/D)$, the posterior ones: they change after seeing $D$.'
        ),
        figure: (language) => <PosteriorBarsFigure language={language} />
    },
    {
        id: 'screening',
        stage: 'bayes',
        title: say('Proba medikoak', 'Pruebas médicas', 'الفحوص الطبية', 'Medical tests'),
        goal: say('Proba baten positibo batek zer esan nahi duen ulertzea: positibo faltsuak eta gaixotasunaren prebalentzia.', 'Entender qué significa un positivo en una prueba: falsos positivos y prevalencia de la enfermedad.', 'فهم معنى النتيجة الإيجابية في فحص: الإيجابيات الكاذبة وانتشار المرض.', 'Understand what a positive in a test means: false positives and how common the illness is.'),
        needs: [need.total],
        problem: say('Biztanleen % 2 gaixo dago. Proba batean, gaixoen artean % 95 positibo ateratzen dira, eta osasuntsuen artean, % 5. Proba positiboa izan bada, zein da gaixo egoteko probabilitatea?', 'Una enfermedad afecta al 2 % de la población. Una prueba da positivo en el 95 % de los enfermos y en el 5 % de los sanos. Si la prueba ha dado positivo, ¿qué probabilidad hay de estar enfermo?', 'يصيب مرض 2 % من السكان. يعطي فحص نتيجة إيجابية لدى 95 % من المرضى و5 % من الأصحاء. إذا كانت النتيجة إيجابية، فما احتمال أن يكون الشخص مريضًا؟', 'An illness affects 2% of the population. A test is positive in 95% of the ill and in 5% of the healthy. If the test is positive, what is the probability of being ill?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Pentsatu 10 000 pertsonatan: 200 gaixo, eta horietatik 190 positibo.', 'Piensa en 10 000 personas: 200 enfermas, y de ellas 190 dan positivo.', 'فكّر في ⁦10 000⁩ شخص: 200 مريض، منهم 190 نتيجتهم إيجابية.', 'Think of 10,000 people: 200 ill, and 190 of them test positive.'), math: same('$0{,}02\\cdot 0{,}95=0{,}019$') },
            { text: say('9800 osasuntsu, eta horietatik 490 positibo faltsu.', '9800 sanas, y de ellas 490 falsos positivos.', '9800 سليم، منهم 490 إيجابي كاذب.', '9800 healthy, and 490 of them false positives.'), math: same('$0{,}98\\cdot 0{,}05=0{,}049$') },
            { text: say('Bayes: positibo guztien artean, gaixoak.', 'Bayes: entre todos los positivos, los enfermos.', 'بايز: المرضى بين كل الإيجابيين.', 'Bayes: the ill among all the positives.'), math: same('$P(E/+)=\\frac{0{,}019}{0{,}019+0{,}049}=\\frac{19}{68}$') }
        ],
        takeaway: say(
            'Gaixotasuna arraroa bada, positibo gehienak faltsuak izan daitezke, proba ona izanda ere: $P(E/+)$ askoz txikiagoa izan daiteke $P(+/E)$ baino. Pertsona kopuru batekin pentsatzeak argitzen du.',
            'Si la enfermedad es rara, la mayoría de los positivos pueden ser falsos aunque la prueba sea buena: $P(E/+)$ puede ser mucho menor que $P(+/E)$. Pensar en un número de personas lo aclara.',
            'إذا كان المرض نادرًا فقد تكون معظم النتائج الإيجابية كاذبة حتى لو كان الفحص جيدًا: قد يكون $P(E/+)$ أصغر بكثير من $P(+/E)$. والتفكير في عدد من الأشخاص يوضّح ذلك.',
            'If the illness is rare, most positives can be false even with a good test: $P(E/+)$ can be much smaller than $P(+/E)$. Thinking of a number of people makes it clear.'
        ),
        figure: (language) => <ScreeningFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const probabilityBatx2gTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...probabilityBatx2gLessonTexts[topic.id as ProbabilityBatx2gTopicId], ...probabilityBatx2gLessonChecks[topic.id as ProbabilityBatx2gTopicId] }))
