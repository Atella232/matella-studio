import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { AxiomsVennFigure, BatteriesFigure, ChooseTwoFigure, ConditionalZoomFigure, DataVennFigure, FourZonesFigure, FrequencyTreeFigure, GymTableFigure, IndependenceMosaicFigure, MachinesTreeFigure, PosteriorFigure, RouletteFigure, TransferFigure, TwelveVennFigure, TwoColourTreeFigure } from './figures'
import { probabilityBatx2LessonChecks, type ProbabilityBatx2TopicId } from './lessonChecks'
import { probabilityBatx2LessonTexts } from './lessonTexts'

/* ==========================================================================
   Probabilitatea · Batxilergoa 2 · Zientziak — stages and lessons. The
   scope follows unit 13 of Santillana 2.º Bachillerato Ciencias and unit
   13 of Anaya Matemáticas II, with the style of the problems of the
   Basque university entrance exam. The first stage is a short review of
   4. DBH académicas (events and Laplace, trees and tables, counting) with
   «Review first» links; the other three are new in 2.º: the algebra of
   events and the axioms, conditional probability and independence, and
   total probability with Bayes. All the exercises and numbers are our
   own. Notation as in 4. DBH: P(A), \overline{A}, P(A/B).
   ========================================================================== */

export type ProbabilityBatx2StageId = 'review' | 'events' | 'conditional' | 'bayes'

export const probabilityBatx2Stages: UnitStage[] = [
    { id: 'review', tone: 'blue', title: { eu: 'Hasi aurretik: 4. DBHko errepasoa', es: 'Antes de empezar: repaso de 4.º', en: 'Before you start: review of 4th ESO', ar: 'قبل أن تبدأ: مراجعة الصف الرابع' } },
    { id: 'events', tone: 'violet', title: { eu: 'Gertaeren aljebra', es: 'Álgebra de sucesos', en: 'Algebra of events', ar: 'جبر الأحداث' } },
    { id: 'conditional', tone: 'mustard', title: { eu: 'Baldintzatua eta independentzia', es: 'Condicionada e independencia', en: 'Conditional probability and independence', ar: 'الاحتمال المشروط والاستقلال' } },
    { id: 'bayes', tone: 'coral', title: { eu: 'Probabilitate osoa eta Bayes', es: 'Probabilidad total y Bayes', en: 'Total probability and Bayes', ar: 'الاحتمال الكلي وبايز' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** «Review first»: lessons of 4. DBH académicas that the new ones build on */
const need = {
    experiments: { unit: 'dbh4-akademikoak/probabilidad', topic: 'experiments', title: { eu: 'Esperimentu aleatorioak eta lagin-espazioa', es: 'Experimentos aleatorios y espacio muestral', en: 'Random experiments and sample space', ar: 'التجارب العشوائية وفضاء العيّنة' } },
    operations: { unit: 'dbh4-akademikoak/probabilidad', topic: 'operations', title: { eu: 'Gertaeren arteko eragiketak', es: 'Operaciones con sucesos', en: 'Operations with events', ar: 'العمليات على الأحداث' } },
    compatible: { unit: 'dbh4-akademikoak/probabilidad', topic: 'compatible', title: { eu: 'Gertaera bateragarriak eta bateraezinak', es: 'Sucesos compatibles e incompatibles', en: 'Compatible and mutually exclusive events', ar: 'الأحداث المتوافقة والمتنافية' } },
    laplace: { unit: 'dbh4-akademikoak/probabilidad', topic: 'laplace', title: { eu: 'Laplaceren erregela', es: 'La regla de Laplace', en: 'Laplace\'s rule', ar: 'قاعدة لابلاس' } },
    properties: { unit: 'dbh4-akademikoak/probabilidad', topic: 'properties', title: { eu: 'Probabilitatearen propietateak', es: 'Propiedades de la probabilidad', en: 'Properties of probability', ar: 'خصائص الاحتمال' } },
    independent: { unit: 'dbh4-akademikoak/probabilidad', topic: 'independent', title: { eu: 'Esperientzia independenteak', es: 'Experiencias independientes', en: 'Independent experiments', ar: 'التجارب المستقلة' } },
    dependent: { unit: 'dbh4-akademikoak/probabilidad', topic: 'dependent', title: { eu: 'Mendeko esperientziak', es: 'Experiencias dependientes', en: 'Dependent experiments', ar: 'التجارب التابعة' } },
    trees: { unit: 'dbh4-akademikoak/probabilidad', topic: 'trees', title: { eu: 'Zuhaitz-diagramak', es: 'Diagramas de árbol', en: 'Tree diagrams', ar: 'المخططات الشجرية' } },
    contingency: { unit: 'dbh4-akademikoak/probabilidad', topic: 'contingency', title: { eu: 'Kontingentzia-taulak', es: 'Tablas de contingencia', en: 'Contingency tables', ar: 'جداول التوافق' } },
    conditional: { unit: 'dbh4-akademikoak/probabilidad', topic: 'conditional', title: { eu: 'Probabilitate baldintzatua', es: 'Probabilidad condicionada', en: 'Conditional probability', ar: 'الاحتمال المشروط' } },
    total: { unit: 'dbh4-akademikoak/probabilidad', topic: 'total', title: { eu: 'Probabilitate osoa', es: 'Probabilidad total', en: 'Total probability', ar: 'الاحتمال الكلي' } },
    withCombinations: { unit: 'dbh4-akademikoak/probabilidad', topic: 'with-combinations', title: { eu: 'Konbinatoria eta Laplaceren erregela', es: 'Combinatoria y regla de Laplace', en: 'Combinatorics and Laplace\'s rule', ar: 'التوافيق وقاعدة لابلاس' } },
    combinations: { unit: 'dbh4-akademikoak/combinatoria', topic: 'combinations', title: { eu: 'Konbinazioak', es: 'Combinaciones', en: 'Combinations', ar: 'التوافيق' } }
}

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Before you start: review of 4. DBH ---------- */
    {
        id: 'review-events',
        stage: 'review',
        title: say('Gertaerak eta Laplaceren erregela', 'Sucesos y regla de Laplace', 'الأحداث وقاعدة لابلاس', 'Events and Laplace\'s rule'),
        goal: say('Lagin-espazioa, bildura, ebakidura eta aurkakoa errepasatzea, eta probabilitateak Laplaceren erregelarekin kalkulatzea.', 'Repasar el espacio muestral, la unión, la intersección y el contrario, y calcular probabilidades con la regla de Laplace.', 'مراجعة فضاء العيّنة والاتحاد والتقاطع والحدث المعاكس، وحساب الاحتمالات بقاعدة لابلاس.', 'Review the sample space, the union, the intersection and the complement, and work out probabilities with Laplace\'s rule.'),
        needs: [need.experiments, need.operations, need.laplace],
        problem: say('12 aurpegiko dado bat botatzen da; aurpegiek 1 eta 12 arteko zenbakiak dituzte. $A$ = «3 zenbakiaren multiploa» eta $B$ = «8 baino handiagoa». Kalkulatu $P(A\\cup B)$.', 'Se lanza un dado de 12 caras numeradas del 1 al 12. $A$ = «múltiplo de 3» y $B$ = «mayor que 8». Calcula $P(A\\cup B)$.', 'يُرمى نرد له 12 وجهًا مرقّمة من 1 إلى 12. $A$ = «مضاعف للعدد 3» و$B$ = «أكبر من 8». احسب $P(A\\cup B)$.', 'A 12-sided die numbered 1 to 12 is rolled. $A$ = «multiple of 3» and $B$ = «greater than 8». Work out $P(A\\cup B)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi bi gertaerak multzo gisa.', 'Escribe los dos sucesos como conjuntos.', 'اكتب الحدثين في صورة مجموعتين.', 'Write the two events as sets.'), math: same('$A=\\{3,6,9,12\\}\\qquad B=\\{9,10,11,12\\}$') },
            { text: say('Bildurak biak elkartzen ditu, 9 eta 12 errepikatu gabe.', 'La unión junta los dos, sin repetir el 9 y el 12.', 'يجمع الاتحاد الحدثين دون تكرار 9 و12.', 'The union puts the two together, without repeating 9 and 12.'), math: same('$A\\cup B=\\{3,6,9,10,11,12\\}$') },
            { text: say('Laplace: aldeko kasuak zati kasu posibleak.', 'Laplace: casos favorables entre casos posibles.', 'لابلاس: الحالات الملائمة على الحالات الممكنة.', 'Laplace: favourable cases over possible cases.'), math: same('$P(A\\cup B)=\\frac{6}{12}=\\frac{1}{2}$') }
        ],
        takeaway: say(
            'Emaitza guztiak berdin probableak direnean, $P(A)$ aldeko kasuak zati kasu posibleak da. Bildura «edo» da; ebakidura, «eta»; aurkakoa, «ez».',
            'Cuando todos los resultados son igual de probables, $P(A)$ es casos favorables entre casos posibles. La unión es «o»; la intersección, «y»; el contrario, «no».',
            'عندما تكون كل النتائج متساوية الاحتمال، فإن $P(A)$ هو الحالات الملائمة على الحالات الممكنة. الاتحاد «أو»، والتقاطع «و»، والمعاكس «لا».',
            'When all the outcomes are equally likely, $P(A)$ is favourable cases over possible cases. The union is ‘or’; the intersection, ‘and’; the complement, ‘not’.'
        ),
        figureAfterSteps: true,
        figure: (language) => <TwelveVennFigure language={language} />
    },
    {
        id: 'review-compound',
        stage: 'review',
        title: say('Zuhaitzak eta taulak', 'Árboles y tablas', 'الأشجار والجداول', 'Trees and tables'),
        goal: say('Bi ateratzeko zuhaitzak errepasatzea, itzulita eta itzuli gabe, eta sarrera bikoitzeko taula batean probabilitateak irakurtzea.', 'Repasar los árboles de dos extracciones, con y sin devolución, y leer probabilidades en una tabla de doble entrada.', 'مراجعة أشجار السحبتين، مع الإرجاع ودونه، وقراءة الاحتمالات في جدول ذي مدخلين.', 'Review the trees of two draws, with and without replacement, and read probabilities in a two-way table.'),
        needs: [need.trees, need.dependent, need.contingency],
        problem: say('Kutxa batean 4 bola zuri eta 2 bola beltz daude. Bi ateratzen dira, itzuli gabe. Zein da biak kolore berekoak izateko probabilitatea?', 'Una urna tiene 4 bolas blancas y 2 negras. Se sacan dos sin devolver. ¿Cuál es la probabilidad de que las dos sean del mismo color?', 'في جرّة 4 كرات بيضاء وكرتان سوداوان. تُسحب كرتان دون إرجاع. ما احتمال أن تكونا من اللون نفسه؟', 'An urn has 4 white balls and 2 black ones. Two are drawn without replacement. What is the probability that both are the same colour?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehen ateratzea: 6 bola daude.', 'Primera extracción: hay 6 bolas.', 'السحبة الأولى: هناك 6 كرات.', 'First draw: there are 6 balls.'), math: same('$\\frac{4}{6}\\qquad\\frac{2}{6}$') },
            { text: say('Itzuli gabe, bigarrenean 5 bola geratzen dira. Bide bakoitzean biderkatu.', 'Sin devolver, en la segunda quedan 5 bolas. Multiplica en cada camino.', 'دون إرجاع تبقى 5 كرات في السحبة الثانية. اضرب في كل مسار.', 'Without replacement, 5 balls are left for the second draw. Multiply along each path.'), math: same('$\\frac{4}{6}\\cdot\\frac{3}{5}=\\frac{12}{30}\\qquad\\frac{2}{6}\\cdot\\frac{1}{5}=\\frac{2}{30}$') },
            { text: say('Batu kolore bereko bi bideak.', 'Suma los dos caminos del mismo color.', 'اجمع المسارين من اللون نفسه.', 'Add the two paths of the same colour.'), math: same('$\\frac{12}{30}+\\frac{2}{30}=\\frac{14}{30}=\\frac{7}{15}$') }
        ],
        takeaway: say(
            'Zuhaitzaren bide batean biderkatu egiten da, eta bideen artean, batu. Itzuli gabe, bigarren adarra aldatu egiten da. Taula batean, barruko lauki bakoitza ebakidura bat da.',
            'En un camino del árbol se multiplica, y entre caminos, se suma. Sin devolución, la segunda rama cambia. En una tabla, cada casilla interior es una intersección.',
            'في مسار الشجرة نضرب، وبين المسارات نجمع. ودون إرجاع يتغيّر الفرع الثاني. وفي الجدول كل خانة داخلية تقاطع.',
            'Along a path of the tree you multiply, and between paths you add. Without replacement, the second branch changes. In a table, each inner cell is an intersection.'
        ),
        figureAfterSteps: true,
        figure: (language) => <TwoColourTreeFigure language={language} />
    },
    {
        id: 'review-counting',
        stage: 'review',
        title: say('Kasuak konbinatoriarekin zenbatzea', 'Contar casos con combinatoria', 'عدّ الحالات بالتوافيق', 'Counting cases with combinatorics'),
        goal: say('Aldeko kasuak eta kasu posibleak konbinazioekin eta aldakuntzekin nola zenbatzen diren errepasatzea, Laplaceren erregela erabiltzeko.', 'Repasar cómo se cuentan casos favorables y posibles con combinaciones y variaciones para usar la regla de Laplace.', 'مراجعة كيفية عدّ الحالات الملائمة والممكنة بالتوافيق والتراتيب لاستعمال قاعدة لابلاس.', 'Review how favourable and possible cases are counted with combinations and arrangements to use Laplace\'s rule.'),
        needs: [need.withCombinations, need.combinations],
        problem: say('6 neska eta 4 mutileko talde batetik 2 pertsona aukeratzen dira zoriz, bidaia baterako. Zein da biak neskak izateko probabilitatea?', 'De un grupo de 6 chicas y 4 chicos se eligen 2 personas al azar para un viaje. ¿Cuál es la probabilidad de que sean dos chicas?', 'من مجموعة فيها 6 فتيات و4 فتيان يُختار شخصان عشوائيًّا لرحلة. ما احتمال أن تكونا فتاتين؟', 'From a group of 6 girls and 4 boys, 2 people are chosen at random for a trip. What is the probability that they are two girls?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kasu posibleak: 10 pertsonatik 2 aukeratzea, ordenarik gabe.', 'Casos posibles: elegir 2 de 10, sin orden.', 'الحالات الممكنة: اختيار 2 من 10 دون ترتيب.', 'Possible cases: choose 2 of 10, with no order.'), math: same('$C_{10,2}=\\binom{10}{2}=45$') },
            { text: say('Aldeko kasuak: 6 nesketatik 2.', 'Casos favorables: 2 de las 6 chicas.', 'الحالات الملائمة: 2 من الفتيات الست.', 'Favourable cases: 2 of the 6 girls.'), math: same('$C_{6,2}=\\binom{6}{2}=15$') },
            { text: say('Laplace.', 'Laplace.', 'لابلاس.', 'Laplace.'), math: same('$P=\\frac{15}{45}=\\frac{1}{3}$') }
        ],
        takeaway: say(
            'Batera hainbat aukeratzen direnean eta ordenak axola ez duenean, kasuak konbinazioekin zenbatzen dira: aldekoak eta posibleak irizpide berarekin.',
            'Cuando se eligen varios a la vez y el orden no importa, los casos se cuentan con combinaciones: favorables y posibles, con el mismo criterio.',
            'عندما يُختار عدة عناصر معًا ولا يهم الترتيب، تُعدّ الحالات بالتوافيق: الملائمة والممكنة بالمعيار نفسه.',
            'When several are chosen at once and the order does not matter, the cases are counted with combinations: favourable and possible, with the same method.'
        ),
        figure: (language) => <ChooseTwoFigure language={language} />
    },

    /* ---------- 2. Algebra of events ---------- */
    {
        id: 'event-space',
        stage: 'events',
        title: say('Gertaeren espazioa', 'El espacio de sucesos', 'فضاء الأحداث', 'The space of events'),
        goal: say('Gertaera elementalak eta konposatuak bereiztea, esperimentu baten gertaera guztiak zenbatzea eta gertaeren sistema oso bat ezagutzea.', 'Distinguir sucesos elementales y compuestos, contar todos los sucesos de un experimento y reconocer un sistema completo de sucesos.', 'التمييز بين الأحداث البسيطة والمركّبة، وعدّ كل أحداث تجربة، والتعرّف على نظام تام من الأحداث.', 'Tell elementary from compound events, count all the events of an experiment and recognise a partition of the sample space.'),
        needs: [need.experiments],
        problem: say('Erruleta batek 5 sektore berdin ditu, 1 eta 5 arteko zenbakiekin. Zenbat gertaera ditu? $A=\\{1,2\\}$, $B=\\{3,4\\}$ eta $C=\\{5\\}$ gertaerek sistema oso bat osatzen dute?', 'Una ruleta tiene 5 sectores iguales numerados del 1 al 5. ¿Cuántos sucesos tiene? ¿Forman $A=\\{1,2\\}$, $B=\\{3,4\\}$ y $C=\\{5\\}$ un sistema completo?', 'لعجلة حظ 5 قطاعات متساوية مرقّمة من 1 إلى 5. كم حدثًا لها؟ وهل تكوّن $A=\\{1,2\\}$ و$B=\\{3,4\\}$ و$C=\\{5\\}$ نظامًا تامًّا؟', 'A spinner has 5 equal sectors numbered 1 to 5. How many events does it have? Do $A=\\{1,2\\}$, $B=\\{3,4\\}$ and $C=\\{5\\}$ form a partition?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lagin-espazioak 5 emaitza ditu: gertaera elementalak.', 'El espacio muestral tiene 5 resultados: los sucesos elementales.', 'لفضاء العيّنة 5 نتائج: هي الأحداث البسيطة.', 'The sample space has 5 outcomes: the elementary events.'), math: same('$E=\\{1,2,3,4,5\\}$') },
            { text: say('Gertaera bakoitza $E$ multzoaren azpimultzo bat da: emaitza bakoitza barruan dago edo ez.', 'Cada suceso es un subconjunto de $E$: cada resultado está o no está.', 'كل حدث مجموعة جزئية من $E$: كل نتيجة إما داخله وإما لا.', 'Each event is a subset of $E$: each outcome is either in it or not.'), math: same('$2^5=32$') },
            { text: say('$A$, $B$ eta $C$ gertaerek ez dute emaitzarik partekatzen, eta hirurek batera $E$ osatzen dute: sistema osoa da.', '$A$, $B$ y $C$ no comparten resultados y entre los tres forman $E$: son un sistema completo.', 'لا تشترك $A$ و$B$ و$C$ في أي نتيجة، ومعًا تكوّن $E$: إنها نظام تام.', '$A$, $B$ and $C$ share no outcomes and together they make up $E$: they are a partition.'), math: same('$A\\cup B\\cup C=E$') }
        ],
        takeaway: say(
            '$n$ emaitzarekin $2^n$ gertaera daude, ezinezkoa $\\varnothing$ eta ziurra $E$ barne. Gertaera batzuek sistema osoa osatzen dute binaka bateraezinak badira eta haien bildura $E$ bada.',
            'Con $n$ resultados hay $2^n$ sucesos, contando el imposible $\\varnothing$ y el seguro $E$. Unos sucesos forman un sistema completo si son incompatibles dos a dos y su unión es $E$.',
            'مع $n$ نتيجة هناك $2^n$ حدثًا، ومنها المستحيل $\\varnothing$ والأكيد $E$. وتكوّن أحداث نظامًا تامًّا إذا كانت متنافية مثنى مثنى واتحادها $E$.',
            'With $n$ outcomes there are $2^n$ events, counting the impossible one $\\varnothing$ and the certain one $E$. Some events form a partition if they are pairwise mutually exclusive and their union is $E$.'
        ),
        figure: (language) => <RouletteFigure language={language} />
    },
    {
        id: 'event-algebra',
        stage: 'events',
        title: say('Gertaeren diferentzia eta De Morganen legeak', 'Diferencia de sucesos y leyes de De Morgan', 'فرق الأحداث وقانونا دي مورغان', 'Difference of events and De Morgan\'s laws'),
        goal: say('$A-B$ diferentzia eta De Morganen legeak erabiltzea, eta Venn diagrama baten zona bakoitza eragiketekin deskribatzea.', 'Usar la diferencia $A-B$ y las leyes de De Morgan, y describir cada zona de un diagrama de Venn con operaciones.', 'استعمال الفرق $A-B$ وقانوني دي مورغان، ووصف كل منطقة من مخطط فن بالعمليات.', 'Use the difference $A-B$ and De Morgan\'s laws, and describe each zone of a Venn diagram with operations.'),
        needs: [need.operations, need.compatible],
        problem: say('Dado bat botatzen da. $A$ = «bikoitia» eta $B$ = «3 baino handiagoa». Kalkulatu $A-B$ eta $\\overline{A\\cup B}$, eta egiaztatu $\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$ dela.', 'Se lanza un dado. $A$ = «par» y $B$ = «mayor que 3». Calcula $A-B$ y $\\overline{A\\cup B}$, y comprueba que $\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$.', 'يُرمى نرد. $A$ = «زوجي» و$B$ = «أكبر من 3». احسب $A-B$ و$\\overline{A\\cup B}$، وتحقّق من أن $\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$.', 'A die is rolled. $A$ = «even» and $B$ = «greater than 3». Work out $A-B$ and $\\overline{A\\cup B}$, and check that $\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$A-B$: $A$ gertaerakoak, $B$ gertaeran ez daudenak.', '$A-B$: los de $A$ que no están en $B$.', '$A-B$: عناصر $A$ التي ليست في $B$.', '$A-B$: those in $A$ that are not in $B$.'), math: same('$A-B=A\\cap\\overline{B}=\\{2\\}$') },
            { text: say('Bilduraren aurkakoa: ez $A$ gertaeran ez $B$ gertaeran ez dagoena.', 'El contrario de la unión: lo que no está ni en $A$ ni en $B$.', 'معاكس الاتحاد: ما ليس في $A$ ولا في $B$.', 'The complement of the union: what is neither in $A$ nor in $B$.'), math: same('$\\overline{A\\cup B}=\\{1,3\\}$') },
            { text: say('Aurkakoekin: $\\overline{A}=\\{1,3,5\\}$ eta $\\overline{B}=\\{1,2,3\\}$.', 'Con los contrarios: $\\overline{A}=\\{1,3,5\\}$ y $\\overline{B}=\\{1,2,3\\}$.', 'بالمعاكسين: $\\overline{A}=\\{1,3,5\\}$ و$\\overline{B}=\\{1,2,3\\}$.', 'With the complements: $\\overline{A}=\\{1,3,5\\}$ and $\\overline{B}=\\{1,2,3\\}$.'), math: same('$\\overline{A}\\cap\\overline{B}=\\{1,3\\}$') }
        ],
        takeaway: say(
            '$A-B=A\\cap\\overline{B}$. De Morgan: $\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$ eta $\\overline{A\\cap B}=\\overline{A}\\cup\\overline{B}$; ukatzean, bildura ebakidura bihurtzen da, eta alderantziz.',
            '$A-B=A\\cap\\overline{B}$. De Morgan: $\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$ y $\\overline{A\\cap B}=\\overline{A}\\cup\\overline{B}$; al negar, la unión pasa a intersección y al revés.',
            '$A-B=A\\cap\\overline{B}$. دي مورغان: $\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$ و$\\overline{A\\cap B}=\\overline{A}\\cup\\overline{B}$؛ عند النفي يصير الاتحاد تقاطعًا والعكس.',
            '$A-B=A\\cap\\overline{B}$. De Morgan: $\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$ and $\\overline{A\\cap B}=\\overline{A}\\cup\\overline{B}$; when you negate, the union becomes an intersection and the other way round.'
        ),
        figure: (language) => <FourZonesFigure language={language} />
    },
    {
        id: 'axioms',
        stage: 'events',
        title: say('Probabilitatearen axiomak eta haien ondorioak', 'Axiomas de la probabilidad y sus consecuencias', 'بديهيات الاحتمال ونتائجها', 'The axioms of probability and their consequences'),
        goal: say('Kolmogorov-en hiru axiomak ezagutzea eta haietatik probabilitatearen propietateak ateratzea: aurkakoa, bildura, diferentzia eta inklusioa.', 'Conocer los tres axiomas de Kolmogórov y deducir de ellos las propiedades de la probabilidad: contrario, unión, diferencia e inclusión.', 'معرفة بديهيات كولموغوروف الثلاث واستنتاج خصائص الاحتمال منها: المعاكس والاتحاد والفرق والاحتواء.', 'Know Kolmogorov\'s three axioms and derive from them the properties of probability: complement, union, difference and inclusion.'),
        needs: [need.properties],
        problem: say('Badakigu $P(A)=0{,}6$, $P(B)=0{,}35$ eta $P(A\\cap B)=0{,}15$ direla. Kalkulatu $P(A\\cup B)$, $P(A-B)$ eta $P(\\overline{A})$.', 'Se sabe que $P(A)=0{,}6$, $P(B)=0{,}35$ y $P(A\\cap B)=0{,}15$. Calcula $P(A\\cup B)$, $P(A-B)$ y $P(\\overline{A})$.', 'نعلم أن $P(A)=0{,}6$ و$P(B)=0{,}35$ و$P(A\\cap B)=0{,}15$. احسب $P(A\\cup B)$ و$P(A-B)$ و$P(\\overline{A})$.', 'We know that $P(A)=0{,}6$, $P(B)=0{,}35$ and $P(A\\cap B)=0{,}15$. Work out $P(A\\cup B)$, $P(A-B)$ and $P(\\overline{A})$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bildura: ebakidura kendu egiten da, bi aldiz zenbatzen baitzen.', 'Unión: se resta la intersección, que se contaba dos veces.', 'الاتحاد: نطرح التقاطع لأنه حُسب مرتين.', 'Union: subtract the intersection, which was counted twice.'), math: same('$P(A\\cup B)=0{,}6+0{,}35-0{,}15=0{,}8$') },
            { text: say('Diferentzia: $A$ gertaeraren zatia, $B$ gertaeran ez dagoena.', 'Diferencia: la parte de $A$ que no está en $B$.', 'الفرق: جزء $A$ الذي ليس في $B$.', 'Difference: the part of $A$ that is not in $B$.'), math: same('$P(A-B)=0{,}6-0{,}15=0{,}45$') },
            { text: say('Aurkakoa.', 'Contrario.', 'المعاكس.', 'Complement.'), math: same('$P(\\overline{A})=1-0{,}6=0{,}4$') }
        ],
        takeaway: say(
            'Axiomak: $P(A)\\ge 0$, $P(E)=1$ eta, $A$ eta $B$ bateraezinak badira, $P(A\\cup B)=P(A)+P(B)$. Haietatik ateratzen dira $P(\\overline{A})=1-P(A)$, $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$ eta $P(A-B)=P(A)-P(A\\cap B)$.',
            'Axiomas: $P(A)\\ge 0$, $P(E)=1$ y, si $A$ y $B$ son incompatibles, $P(A\\cup B)=P(A)+P(B)$. De ellos salen $P(\\overline{A})=1-P(A)$, $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$ y $P(A-B)=P(A)-P(A\\cap B)$.',
            'البديهيات: $P(A)\\ge 0$ و$P(E)=1$، وإذا كان $A$ و$B$ متنافيين فإن $P(A\\cup B)=P(A)+P(B)$. ومنها نستنتج $P(\\overline{A})=1-P(A)$ و$P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$ و$P(A-B)=P(A)-P(A\\cap B)$.',
            'Axioms: $P(A)\\ge 0$, $P(E)=1$ and, if $A$ and $B$ are mutually exclusive, $P(A\\cup B)=P(A)+P(B)$. From them come $P(\\overline{A})=1-P(A)$, $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$ and $P(A-B)=P(A)-P(A\\cap B)$.'
        ),
        figureAfterSteps: true,
        figure: (language) => <AxiomsVennFigure language={language} />
    },
    {
        id: 'from-data',
        stage: 'events',
        title: say('Probabilitateak beste batzuetatik abiatuta', 'Probabilidades a partir de otras', 'احتمالات انطلاقًا من احتمالات أخرى', 'Probabilities from other probabilities'),
        goal: say('Venn diagrama baten lau zonak hiru daturekin betetzea, eta haiekin edozein probabilitate kalkulatzea, unibertsitatera sartzeko probetako problemetan bezala.', 'Rellenar las cuatro zonas de un diagrama de Venn con tres datos y calcular con ellas cualquier probabilidad, como en los problemas de selectividad.', 'ملء المناطق الأربع لمخطط فن بثلاث معطيات، وحساب أي احتمال بها، كما في مسائل امتحان الدخول إلى الجامعة.', 'Fill in the four zones of a Venn diagram with three data and use them to work out any probability, as in university entrance exam problems.'),
        problem: say('Badakigu $P(A)=0{,}3$, $P(B)=0{,}6$ eta $P(\\overline{A}\\cup\\overline{B})=0{,}9$ direla. Kalkulatu $P(A\\cup B)$ eta $P(\\overline{A}\\cap\\overline{B})$.', 'Se sabe que $P(A)=0{,}3$, $P(B)=0{,}6$ y $P(\\overline{A}\\cup\\overline{B})=0{,}9$. Calcula $P(A\\cup B)$ y $P(\\overline{A}\\cap\\overline{B})$.', 'نعلم أن $P(A)=0{,}3$ و$P(B)=0{,}6$ و$P(\\overline{A}\\cup\\overline{B})=0{,}9$. احسب $P(A\\cup B)$ و$P(\\overline{A}\\cap\\overline{B})$.', 'We know that $P(A)=0{,}3$, $P(B)=0{,}6$ and $P(\\overline{A}\\cup\\overline{B})=0{,}9$. Work out $P(A\\cup B)$ and $P(\\overline{A}\\cap\\overline{B})$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('De Morgan: $\\overline{A}\\cup\\overline{B}$ gertaera $A\\cap B$ gertaeraren aurkakoa da.', 'De Morgan: $\\overline{A}\\cup\\overline{B}$ es el contrario de $A\\cap B$.', 'دي مورغان: $\\overline{A}\\cup\\overline{B}$ هو معاكس $A\\cap B$.', 'De Morgan: $\\overline{A}\\cup\\overline{B}$ is the complement of $A\\cap B$.'), math: same('$P(A\\cap B)=1-0{,}9=0{,}1$') },
            { text: say('Bildura.', 'Unión.', 'الاتحاد.', 'Union.'), math: same('$P(A\\cup B)=0{,}3+0{,}6-0{,}1=0{,}8$') },
            { text: say('Ez $A$ ez $B$: bilduraren aurkakoa.', 'Ni $A$ ni $B$: el contrario de la unión.', 'لا $A$ ولا $B$: معاكس الاتحاد.', 'Neither $A$ nor $B$: the complement of the union.'), math: same('$P(\\overline{A}\\cap\\overline{B})=1-0{,}8=0{,}2$') }
        ],
        takeaway: say(
            'Hiru daturekin Venn diagramaren lau zonak betetzen dira: $A$ bakarrik, biak, $B$ bakarrik eta bat ere ez, eta denek 1 batzen dute. Gero, edozein gertaera bere zonen batura da.',
            'Con tres datos se rellenan las cuatro zonas del Venn: solo $A$, los dos, solo $B$ y ninguno, que suman 1. Después, cualquier suceso es la suma de sus zonas.',
            'بثلاث معطيات تُملأ المناطق الأربع لمخطط فن: $A$ وحده، وكلاهما، و$B$ وحده، ولا أحد منهما، ومجموعها 1. ثم يكون أي حدث مجموع مناطقه.',
            'With three data you fill in the four zones of the Venn diagram: only $A$, both, only $B$ and neither, which add up to 1. Then any event is the sum of its zones.'
        ),
        figureAfterSteps: true,
        figure: (language) => <DataVennFigure language={language} />
    },

    /* ---------- 3. Conditional probability and independence ---------- */
    {
        id: 'conditional',
        stage: 'conditional',
        title: say('Probabilitate baldintzatua, formularekin', 'La probabilidad condicionada, con fórmula', 'الاحتمال المشروط بالصيغة', 'Conditional probability with the formula'),
        goal: say('$P(A/B)=\\frac{P(A\\cap B)}{P(B)}$ probabilitateetatik kalkulatzea, ez bakarrik zenbaketetatik, eta $P(B/A)$ probabilitatearekin ez nahastea.', 'Calcular $P(A/B)=\\frac{P(A\\cap B)}{P(B)}$ a partir de probabilidades, no solo de recuentos, y no confundirla con $P(B/A)$.', 'حساب $P(A/B)=\\frac{P(A\\cap B)}{P(B)}$ انطلاقًا من الاحتمالات لا من العدّ فقط، وعدم الخلط بينه وبين $P(B/A)$.', 'Work out $P(A/B)=\\frac{P(A\\cap B)}{P(B)}$ from probabilities, not only from counts, and not mix it up with $P(B/A)$.'),
        needs: [need.conditional],
        problem: say('Institutu batean, ikasleen % 40 xake-klubekoa da ($A$), % 20 betaurrekoduna da ($B$) eta % 12 biak dira. Kalkulatu $P(B/A)$ eta $P(A/B)$.', 'En un instituto, el 40 % de los alumnos es del club de ajedrez ($A$), el 20 % lleva gafas ($B$) y el 12 % cumple las dos cosas. Calcula $P(B/A)$ y $P(A/B)$.', 'في مدرسة، 40٪ من الطلاب في نادي الشطرنج ($A$)، و20٪ يلبسون نظارات ($B$)، و12٪ يجمعون الأمرين. احسب $P(B/A)$ و$P(A/B)$.', 'At a school, 40% of the students are in the chess club ($A$), 20% wear glasses ($B$) and 12% do both. Work out $P(B/A)$ and $P(A/B)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$A$ jakiteak lagin-espazioa $A$ gertaerara murrizten du: $P(A)$ zenbakiaz zatitzen da.', 'Saber $A$ reduce el espacio muestral a $A$: se divide entre $P(A)$.', 'معرفة $A$ تختزل فضاء العيّنة إلى $A$: نقسم على $P(A)$.', 'Knowing $A$ shrinks the sample space to $A$: divide by $P(A)$.'), math: same('$P(B/A)=\\frac{P(A\\cap B)}{P(A)}=\\frac{0{,}12}{0{,}4}=0{,}3$') },
            { text: say('Alderantziz, $P(B)$ zenbakiaz zatitzen da.', 'Al revés, se divide entre $P(B)$.', 'وبالعكس نقسم على $P(B)$.', 'The other way round, divide by $P(B)$.'), math: same('$P(A/B)=\\frac{0{,}12}{0{,}2}=0{,}6$') },
            { text: say('Bi baldintzatuak desberdinak dira.', 'Las dos condicionadas son distintas.', 'الاحتمالان المشروطان مختلفان.', 'The two conditional probabilities are different.'), math: same('$0{,}3\\neq 0{,}6$') }
        ],
        takeaway: say(
            '$P(A/B)=\\frac{P(A\\cap B)}{P(B)}$, $P(B)>0$ bada: baldintza osoko berria da. $P(A/B)$ eta $P(B/A)$ probabilitateek zenbakitzaile bera dute, baina izendatzaile desberdina.',
            '$P(A/B)=\\frac{P(A\\cap B)}{P(B)}$, con $P(B)>0$: la condición es el nuevo total. $P(A/B)$ y $P(B/A)$ tienen el mismo numerador y distinto denominador.',
            '$P(A/B)=\\frac{P(A\\cap B)}{P(B)}$ مع $P(B)>0$: الشرط هو الكل الجديد. ولـ$P(A/B)$ و$P(B/A)$ البسط نفسه ومقامان مختلفان.',
            '$P(A/B)=\\frac{P(A\\cap B)}{P(B)}$, with $P(B)>0$: the condition is the new total. $P(A/B)$ and $P(B/A)$ have the same numerator and a different denominator.'
        ),
        figure: (language) => <ConditionalZoomFigure language={language} />
    },
    {
        id: 'product-rule',
        stage: 'conditional',
        title: say('Biderkaduraren erregela', 'La regla del producto', 'قاعدة الضرب', 'The multiplication rule'),
        goal: say('Hainbat gertaera jarraian gertatzeko probabilitatea baldintzatuak biderkatuz kalkulatzea, $P(A\\cap B)=P(A)\\cdot P(B/A)$, hiru gertaerarekin ere.', 'Calcular la probabilidad de que ocurran varios sucesos seguidos multiplicando condicionadas, $P(A\\cap B)=P(A)\\cdot P(B/A)$, también con tres sucesos.', 'حساب احتمال وقوع عدة أحداث متتالية بضرب الاحتمالات المشروطة، $P(A\\cap B)=P(A)\\cdot P(B/A)$، ومع ثلاثة أحداث أيضًا.', 'Work out the probability of several events happening one after another by multiplying conditional probabilities, $P(A\\cap B)=P(A)\\cdot P(B/A)$, also with three events.'),
        needs: [need.dependent],
        problem: say('Kutxa batean 10 pila daude, eta horietatik 3 agortuta daude. Hiru hartzen dira, itzuli gabe. Zein da bat ere agortuta ez egoteko probabilitatea?', 'En una caja hay 10 pilas y 3 están gastadas. Se cogen tres sin devolver. ¿Cuál es la probabilidad de que ninguna esté gastada?', 'في صندوق 10 بطاريات، منها 3 فارغة. تؤخذ ثلاث دون إرجاع. ما احتمال ألّا تكون أي منها فارغة؟', 'A box holds 10 batteries, and 3 of them are flat. Three are taken without replacement. What is the probability that none is flat?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehena ona da: 10 piletatik 7.', 'La primera es buena: 7 de 10.', 'الأولى جيدة: 7 من 10.', 'The first is good: 7 out of 10.'), math: same('$P(B_1)=\\frac{7}{10}$') },
            { text: say('Lehena ona dela jakinda, 9 piletatik 6 on geratzen dira; gero, 8 piletatik 5.', 'Sabiendo que la primera es buena, quedan 6 buenas de 9; y después, 5 de 8.', 'إذا علمنا أن الأولى جيدة، تبقى 6 جيدة من 9، ثم 5 من 8.', 'Given that the first is good, 6 good ones are left out of 9; and then, 5 out of 8.'), math: same('$P(B_2/B_1)=\\frac{6}{9}\\qquad P(B_3/B_1\\cap B_2)=\\frac{5}{8}$') },
            { text: say('Biderkatu egiten dira.', 'Se multiplican.', 'نضربها.', 'Multiply them.'), math: same('$\\frac{7}{10}\\cdot\\frac{6}{9}\\cdot\\frac{5}{8}=\\frac{210}{720}=\\frac{7}{24}$') }
        ],
        takeaway: say(
            '$P(A\\cap B)=P(A)\\cdot P(B/A)$ eta $P(A\\cap B\\cap C)=P(A)\\cdot P(B/A)\\cdot P(C/A\\cap B)$: urrats bakoitza biderkatzen da, lehen gertatu dena jakinda. Zuhaitzaren bide bakoitzean egiten dena da.',
            '$P(A\\cap B)=P(A)\\cdot P(B/A)$ y $P(A\\cap B\\cap C)=P(A)\\cdot P(B/A)\\cdot P(C/A\\cap B)$: cada paso se multiplica sabiendo lo que ya ha pasado. Es lo que se hace en cada camino del árbol.',
            '$P(A\\cap B)=P(A)\\cdot P(B/A)$ و$P(A\\cap B\\cap C)=P(A)\\cdot P(B/A)\\cdot P(C/A\\cap B)$: تُضرب كل خطوة مع العلم بما حدث قبلها. وهذا ما نفعله في كل مسار من الشجرة.',
            '$P(A\\cap B)=P(A)\\cdot P(B/A)$ and $P(A\\cap B\\cap C)=P(A)\\cdot P(B/A)\\cdot P(C/A\\cap B)$: each step is multiplied knowing what has already happened. It is what you do along each path of the tree.'
        ),
        figure: (language) => <BatteriesFigure language={language} />
    },
    {
        id: 'independence',
        stage: 'conditional',
        title: say('Gertaera independenteak', 'Sucesos independientes', 'الأحداث المستقلة', 'Independent events'),
        goal: say('Bi gertaera independenteak diren egiaztatzea $P(A\\cap B)=P(A)\\cdot P(B)$ probarekin, independenteak eta bateraezinak ez nahastea, eta independentzia «gutxienez bat» kalkulatzeko erabiltzea.', 'Comprobar si dos sucesos son independientes con la prueba $P(A\\cap B)=P(A)\\cdot P(B)$, no confundir independientes con incompatibles y usar la independencia para «al menos uno».', 'التحقق من استقلال حدثين باختبار $P(A\\cap B)=P(A)\\cdot P(B)$، وعدم الخلط بين المستقلة والمتنافية، واستعمال الاستقلال في «واحد على الأقل».', 'Check whether two events are independent with the test $P(A\\cap B)=P(A)\\cdot P(B)$, not mix up independent with mutually exclusive, and use independence for ‘at least one’.'),
        needs: [need.independent, need.conditional],
        problem: say('$P(A)=0{,}5$, $P(B)=0{,}3$ eta $P(A\\cup B)=0{,}65$ dira. $A$ eta $B$ independenteak dira? Eta bateraezinak?', '$P(A)=0{,}5$, $P(B)=0{,}3$ y $P(A\\cup B)=0{,}65$. ¿Son $A$ y $B$ independientes? ¿Y incompatibles?', '$P(A)=0{,}5$ و$P(B)=0{,}3$ و$P(A\\cup B)=0{,}65$. هل $A$ و$B$ مستقلان؟ وهل هما متنافيان؟', '$P(A)=0{,}5$, $P(B)=0{,}3$ and $P(A\\cup B)=0{,}65$. Are $A$ and $B$ independent? Are they mutually exclusive?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehenik, ebakidura.', 'Primero, la intersección.', 'أولًا التقاطع.', 'First, the intersection.'), math: same('$P(A\\cap B)=0{,}5+0{,}3-0{,}65=0{,}15$') },
            { text: say('Biderkaduraren proba: berdinak dira, beraz independenteak dira.', 'Prueba del producto: son iguales, así que son independientes.', 'اختبار الضرب: متساويان، إذن هما مستقلان.', 'The product test: they are equal, so they are independent.'), math: same('$P(A)\\cdot P(B)=0{,}5\\cdot 0{,}3=0{,}15$') },
            { text: say('Ez dira bateraezinak: ebakidura ez da 0.', 'No son incompatibles: la intersección no es 0.', 'ليسا متنافيين: التقاطع ليس 0.', 'They are not mutually exclusive: the intersection is not 0.'), math: same('$P(A\\cap B)=0{,}15\\neq 0$') }
        ],
        takeaway: say(
            '$A$ eta $B$ independenteak dira $P(A\\cap B)=P(A)\\cdot P(B)$ bada, hau da, $P(A/B)=P(A)$ bada. Orduan, $\\overline{A}$ eta $\\overline{B}$ ere independenteak dira. Bateraezinak beste gauza bat da: $P(A\\cap B)=0$.',
            '$A$ y $B$ son independientes si $P(A\\cap B)=P(A)\\cdot P(B)$, que es lo mismo que $P(A/B)=P(A)$. Entonces también lo son $\\overline{A}$ y $\\overline{B}$. Incompatibles es otra cosa: $P(A\\cap B)=0$.',
            'يكون $A$ و$B$ مستقلين إذا كان $P(A\\cap B)=P(A)\\cdot P(B)$، أي $P(A/B)=P(A)$. وعندئذ يكون $\\overline{A}$ و$\\overline{B}$ مستقلين أيضًا. أما التنافي فشيء آخر: $P(A\\cap B)=0$.',
            '$A$ and $B$ are independent if $P(A\\cap B)=P(A)\\cdot P(B)$, which is the same as $P(A/B)=P(A)$. Then $\\overline{A}$ and $\\overline{B}$ are independent too. Mutually exclusive is something else: $P(A\\cap B)=0$.'
        ),
        figure: (language) => <IndependenceMosaicFigure language={language} />
    },
    {
        id: 'percent-tables',
        stage: 'conditional',
        title: say('Taulak ehunekoetatik abiatuta', 'Tablas a partir de porcentajes', 'جداول انطلاقًا من النسب المئوية', 'Tables built from percentages'),
        goal: say('Sarrera bikoitzeko taula bat ehunekoetatik eta baldintzatuetatik eraikitzea, eta «… bada, zein probabilitate…?», «… edo …» eta «ez … ez …» galderei erantzutea.', 'Construir una tabla de doble entrada a partir de porcentajes y condicionadas, y responder a «si…, ¿qué probabilidad…?», «… o …» y «ni… ni…».', 'بناء جدول ذي مدخلين من النسب المئوية والاحتمالات المشروطة، والإجابة عن «إذا كان…، فما احتمال…؟» و«… أو …» و«لا … ولا …».', 'Build a two-way table from percentages and conditional data, and answer «if…, what is the probability…?», «… or …» and «neither… nor…».'),
        needs: [need.contingency],
        problem: say('Gimnasio bateko bazkideen % 60 goizez joaten da ($M$), eta gainerakoak arratsaldez. Goizekoen % 30 igeri egiten du ($N$); arratsaldekoen % 50. Igeri egiten duen bazkide bat aukeratuta, zein da goizez joateko probabilitatea?', 'El 60 % de los socios de un gimnasio va por la mañana ($M$) y el resto, por la tarde. De los de mañana, el 30 % nada ($N$); de los de tarde, el 50 %. Elegido un socio que nada, ¿qué probabilidad hay de que vaya por la mañana?', '60٪ من أعضاء نادٍ رياضي يذهبون صباحًا ($M$)، والباقون مساءً. من الصباحيين يسبح 30٪ ($N$)، ومن المسائيين 50٪. إذا اختير عضو يسبح، فما احتمال أن يذهب صباحًا؟', '60% of the members of a gym go in the morning ($M$) and the rest in the afternoon. Of the morning ones, 30% swim ($N$); of the afternoon ones, 50%. If a member who swims is chosen, what is the probability that they go in the morning?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Imajinatu 100 bazkide: 60 goizez eta 40 arratsaldez.', 'Imagina 100 socios: 60 por la mañana y 40 por la tarde.', 'تخيّل 100 عضو: 60 صباحًا و40 مساءً.', 'Imagine 100 members: 60 in the morning and 40 in the afternoon.') },
            { text: say('Igeri egiten dute 60 bazkideen % 30 eta 40 bazkideen % 50.', 'Nadan el 30 % de 60 y el 50 % de 40.', 'يسبح 30٪ من الستين و50٪ من الأربعين.', '30% of the 60 swim, and 50% of the 40.'), math: same('$0{,}3\\cdot 60=18\\qquad 0{,}5\\cdot 40=20$') },
            { text: say('Baldintzatua: laukia zati $N$ zutabearen guztizkoa.', 'Condicionada: la casilla entre el total de la columna $N$.', 'المشروط: الخانة على مجموع العمود $N$.', 'Conditional: the cell over the total of column $N$.'), math: same('$P(M/N)=\\frac{18}{18+20}=\\frac{18}{38}=\\frac{9}{19}$') }
        ],
        takeaway: say(
            'Imajinatu 100 (edo 1000) banako eta bete taula: «… direnen» ehunekoak haien errenkadan aplikatzen dira, ez guztizkoan. Gero, probabilitate bakoitza lauki bat edo laukien batura da, bere guztizkoaz zatituta.',
            'Imagina 100 (o 1000) individuos y rellena la tabla: los porcentajes «de los que…» se aplican sobre su fila, no sobre el total. Después, cada probabilidad es una casilla o una suma de casillas entre su total.',
            'تخيّل 100 (أو 1000) فرد واملأ الجدول: نسب «من الذين…» تُطبَّق على سطرها لا على الكل. ثم يكون كل احتمال خانة أو مجموع خانات على مجموعها.',
            'Imagine 100 (or 1000) individuals and fill in the table: the percentages «of those who…» apply to their row, not to the total. Then each probability is a cell or a sum of cells over its total.'
        ),
        figureAfterSteps: true,
        figure: (language) => <GymTableFigure language={language} />
    },

    /* ---------- 4. Total probability and Bayes ---------- */
    {
        id: 'total-probability',
        stage: 'bayes',
        title: say('Probabilitate osoaren teorema', 'Teorema de la probabilidad total', 'مبرهنة الاحتمال الكلي', 'The law of total probability'),
        goal: say('$B$ gertaera baten probabilitatea kalkulatzea, $B$ hainbat kausatatik etor daitekeenean eta kausek sistema oso bat osatzen dutenean.', 'Calcular la probabilidad de un suceso $B$ que puede llegar por varias causas que forman un sistema completo.', 'حساب احتمال حدث $B$ يمكن أن يأتي من عدة أسباب تكوّن نظامًا تامًّا.', 'Work out the probability of an event $B$ that can come about through several causes that form a partition.'),
        needs: [need.total],
        problem: say('Lantegi batek hiru makina ditu: $A_1$ makinak piezen % 50 egiten du; $A_2$ makinak, % 30; eta $A_3$ makinak, % 20. Haien piezen % 2, % 3 eta % 5 akastunak dira. Zein da pieza bat akastuna ($D$) izateko probabilitatea?', 'Una fábrica tiene tres máquinas: $A_1$ hace el 50 % de las piezas; $A_2$, el 30 %, y $A_3$, el 20 %. Son defectuosas el 2 %, el 3 % y el 5 % de sus piezas. ¿Qué probabilidad hay de que una pieza sea defectuosa ($D$)?', 'لمصنع ثلاث آلات: تصنع $A_1$ 50٪ من القطع، و$A_2$ 30٪، و$A_3$ 20٪. والمعيب من قطعها 2٪ و3٪ و5٪. ما احتمال أن تكون قطعة معيبة ($D$)؟', 'A factory has three machines: $A_1$ makes 50% of the parts; $A_2$, 30%; and $A_3$, 20%. 2%, 3% and 5% of their parts are faulty. What is the probability that a part is faulty ($D$)?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hiru makinek sistema osoa osatzen dute: pieza bakoitza bakar batetik dator.', 'Las tres máquinas forman un sistema completo: cada pieza sale de una sola.', 'تكوّن الآلات الثلاث نظامًا تامًّا: كل قطعة تخرج من آلة واحدة.', 'The three machines form a partition: each part comes from exactly one.'), math: same('$0{,}5+0{,}3+0{,}2=1$') },
            { text: say('Zuhaitzaren bide bakoitza: kausa bider akatsa, kausa jakinda.', 'Cada camino del árbol: la causa por el defecto sabiendo la causa.', 'كل مسار في الشجرة: السبب في العيب مع العلم بالسبب.', 'Each path of the tree: the cause times the fault given the cause.'), math: same('$0{,}5\\cdot 0{,}02=0{,}01\\qquad 0{,}3\\cdot 0{,}03=0{,}009\\qquad 0{,}2\\cdot 0{,}05=0{,}01$') },
            { text: say('Hiru bideak batzen dira.', 'Se suman los tres caminos.', 'نجمع المسارات الثلاثة.', 'Add the three paths.'), math: same('$P(D)=0{,}01+0{,}009+0{,}01=0{,}029$') }
        ],
        takeaway: say(
            '$A_1,\\ldots,A_n$ sistema osoa bada, $P(B)=P(A_1)\\cdot P(B/A_1)+\\cdots+P(A_n)\\cdot P(B/A_n)$: $B$ gertaeran amaitzen diren zuhaitzaren bide guztien batura.',
            'Si $A_1,\\ldots,A_n$ es un sistema completo, $P(B)=P(A_1)\\cdot P(B/A_1)+\\cdots+P(A_n)\\cdot P(B/A_n)$: la suma de todos los caminos del árbol que acaban en $B$.',
            'إذا كان $A_1,\\ldots,A_n$ نظامًا تامًّا فإن $P(B)=P(A_1)\\cdot P(B/A_1)+\\cdots+P(A_n)\\cdot P(B/A_n)$: مجموع كل مسارات الشجرة المنتهية في $B$.',
            'If $A_1,\\ldots,A_n$ is a partition, $P(B)=P(A_1)\\cdot P(B/A_1)+\\cdots+P(A_n)\\cdot P(B/A_n)$: the sum of all the paths of the tree that end in $B$.'
        ),
        figureAfterSteps: true,
        figure: (language) => <MachinesTreeFigure language={language} />
    },
    {
        id: 'bayes',
        stage: 'bayes',
        title: say('Bayesen teorema', 'Teorema de Bayes', 'مبرهنة بايز', 'Bayes\' theorem'),
        goal: say('Baldintzari buelta ematea: emaitza jakinda kausa bakoitzaren probabilitatea kalkulatzea, $P(A_i/B)$, eta a priori eta a posteriori probabilitateak bereiztea.', 'Dar la vuelta a la condición: calcular la probabilidad de cada causa sabiendo el resultado, $P(A_i/B)$, y distinguir probabilidades a priori y a posteriori.', 'قلب الشرط: حساب احتمال كل سبب مع العلم بالنتيجة، $P(A_i/B)$، والتمييز بين الاحتمالات القبلية والبعدية.', 'Turn the condition round: work out the probability of each cause given the outcome, $P(A_i/B)$, and tell prior from posterior probabilities.'),
        problem: say('Hiru makinen lantegian (piezen % 50, % 30 eta % 20, eta haien % 2, % 3 eta % 5 akastunak), pieza akastun bat aurkitu da. Zein da $A_3$ makinatik etortzeko probabilitatea?', 'En la fábrica de las tres máquinas (el 50 %, el 30 % y el 20 % de las piezas, con el 2 %, el 3 % y el 5 % defectuosas), aparece una pieza defectuosa. ¿Qué probabilidad hay de que venga de $A_3$?', 'في مصنع الآلات الثلاث (50٪ و30٪ و20٪ من القطع، والمعيب منها 2٪ و3٪ و5٪) وُجدت قطعة معيبة. ما احتمال أن تكون من $A_3$؟', 'In the factory with the three machines (50%, 30% and 20% of the parts, with 2%, 3% and 5% faulty), a faulty part turns up. What is the probability that it comes from $A_3$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Probabilitate osoa, izendatzailea.', 'La probabilidad total, el denominador.', 'الاحتمال الكلي هو المقام.', 'The total probability, the denominator.'), math: same('$P(D)=0{,}029$') },
            { text: say('$A_3$ makinaren bidea zati $D$ gertaeran amaitzen diren bide guztiak.', 'El camino de $A_3$ entre todos los que acaban en $D$.', 'مسار $A_3$ على كل المسارات المنتهية في $D$.', 'The path of $A_3$ over all those that end in $D$.'), math: same('$P(A_3/D)=\\frac{P(A_3)\\cdot P(D/A_3)}{P(D)}=\\frac{0{,}01}{0{,}029}=\\frac{10}{29}$') },
            { text: say('A priori, $A_3$ makinak % 20 egiten zuen; pieza akastuna dela jakinda, ia % 34 izatera igotzen da.', 'A priori, $A_3$ hacía el 20 %; sabiendo que la pieza falla, sube a casi el 34 %.', 'قبليًّا كانت $A_3$ تصنع 20٪؛ ومع العلم أن القطعة معيبة يرتفع إلى نحو 34٪.', 'A priori, $A_3$ made 20%; knowing that the part is faulty, it rises to almost 34%.'), math: same('$\\frac{10}{29}\\approx 0{,}34$') }
        ],
        takeaway: say(
            'Bayes: $P(A_i/B)=\\frac{P(A_i)\\cdot P(B/A_i)}{P(B)}$, $P(B)$ probabilitate osoarekin. $P(A_i)$ a priori probabilitatea da; $P(A_i/B)$, a posteriori probabilitatea, $B$ jakin ondoren.',
            'Bayes: $P(A_i/B)=\\frac{P(A_i)\\cdot P(B/A_i)}{P(B)}$, con $P(B)$ por la probabilidad total. $P(A_i)$ es la probabilidad a priori; $P(A_i/B)$, la a posteriori, después de saber $B$.',
            'بايز: $P(A_i/B)=\\frac{P(A_i)\\cdot P(B/A_i)}{P(B)}$، و$P(B)$ بالاحتمال الكلي. $P(A_i)$ هو الاحتمال القبلي، و$P(A_i/B)$ البعدي بعد معرفة $B$.',
            'Bayes: $P(A_i/B)=\\frac{P(A_i)\\cdot P(B/A_i)}{P(B)}$, with $P(B)$ from the total probability. $P(A_i)$ is the prior probability; $P(A_i/B)$, the posterior, after knowing $B$.'
        ),
        figureAfterSteps: true,
        figure: (language) => <PosteriorFigure language={language} />
    },
    {
        id: 'diagnostic-tests',
        stage: 'bayes',
        title: say('Proba diagnostikoak', 'Pruebas diagnósticas', 'الاختبارات التشخيصية', 'Diagnostic tests'),
        goal: say('Bayes proba mediko batekin erabiltzea: sentikortasuna eta positibo faltsuak ulertzea, eta zergatik gaixotasun arraro batean positibo bat ez den ia ziurra.', 'Usar Bayes con una prueba médica: entender la sensibilidad, los falsos positivos y por qué en una enfermedad rara un positivo no es casi seguro.', 'استعمال بايز مع اختبار طبي: فهم الحساسية والإيجابيات الكاذبة، ولماذا لا تكون النتيجة الإيجابية في مرض نادر شبه مؤكدة.', 'Use Bayes with a medical test: understand sensitivity, false positives and why, for a rare disease, a positive result is not almost certain.'),
        problem: say('Biztanleen % 1 gaixotasun batek ($E$) jota dago. Proba batean, gaixoen % 99 positibo ateratzen da, eta osasuntsuen % 1 ere bai. Norbait positibo ateratzen bada, zein da gaixo egoteko probabilitatea?', 'Una enfermedad ($E$) la tiene el 1 % de la población. Una prueba da positivo en el 99 % de los enfermos y en el 1 % de los sanos. Si a alguien le da positivo, ¿qué probabilidad hay de que esté enfermo?', 'مرض ($E$) يصيب 1٪ من السكان. يعطي اختبار نتيجة إيجابية لدى 99٪ من المرضى و1٪ من الأصحاء. إذا كانت نتيجة شخص إيجابية، فما احتمال أن يكون مريضًا؟', 'A disease ($E$) affects 1% of the population. A test is positive in 99% of the sick and in 1% of the healthy. If someone tests positive, what is the probability that they are ill?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Imajinatu 10 000 pertsona: 100 gaixo eta 9900 osasuntsu.', 'Imagina 10 000 personas: 100 enfermas y 9900 sanas.', 'تخيّل 10 000 شخص: 100 مريض و9900 سليم.', 'Imagine 10,000 people: 100 ill and 9,900 healthy.'), math: same('$0{,}01\\cdot 10\\,000=100$') },
            { text: say('Positiboak: gaixoen % 99 eta osasuntsuen % 1.', 'Positivos: el 99 % de los enfermos y el 1 % de los sanos.', 'الإيجابيون: 99٪ من المرضى و1٪ من الأصحاء.', 'Positives: 99% of the ill and 1% of the healthy.'), math: same('$0{,}99\\cdot 100=99\\qquad 0{,}01\\cdot 9900=99$') },
            { text: say('198 positiboetatik 99 bakarrik daude gaixo.', 'De los 198 positivos, solo 99 están enfermos.', 'من الإيجابيين الـ 198 هناك 99 مريضًا فقط.', 'Of the 198 positives, only 99 are ill.'), math: same('$P(E/+)=\\frac{99}{198}=\\frac{1}{2}$') }
        ],
        takeaway: say(
            'Gaixotasuna arraroa bada, osasuntsu askoren positibo faltsuak gaixo gutxien positiboak bezainbeste izan daitezke. Horregatik, $P(E/+)$ txikia izan daiteke proba oso ona izanda ere: a priori probabilitateak agintzen du.',
            'Si la enfermedad es rara, los falsos positivos de los muchos sanos pueden ser tantos como los positivos de los pocos enfermos. Por eso $P(E/+)$ puede ser pequeña aunque la prueba sea muy buena: la probabilidad a priori manda.',
            'إذا كان المرض نادرًا، فقد تساوي الإيجابيات الكاذبة لدى الأصحاء الكثيرين إيجابيات المرضى القليلين. لذلك قد يكون $P(E/+)$ صغيرًا ولو كان الاختبار جيدًا جدًّا: الاحتمال القبلي هو الحاسم.',
            'If the disease is rare, the false positives of the many healthy people can be as many as the positives of the few ill ones. That is why $P(E/+)$ can be small even when the test is very good: the prior probability rules.'
        ),
        figureAfterSteps: true,
        figure: (language) => <FrequencyTreeFigure language={language} />
    },
    {
        id: 'two-stage',
        stage: 'bayes',
        title: say('Bi denboratako esperimentuak', 'Experimentos en dos tiempos', 'تجارب على مرحلتين', 'Two-stage experiments'),
        goal: say('Lehen urratsak bigarrena aldatzen duen problemak ebaztea —bola bat kutxa batetik bestera pasatzea, kutxa bat aukeratu eta bi bola ateratzea—, probabilitate osoarekin eta Bayesekin.', 'Resolver problemas en los que el primer paso cambia el segundo —pasar una bola de una urna a otra, elegir una urna y sacar dos bolas— con la probabilidad total y Bayes.', 'حل مسائل تغيّر فيها الخطوة الأولى الثانية —نقل كرة من جرّة إلى أخرى، أو اختيار جرّة وسحب كرتين— بالاحتمال الكلي وبايز.', 'Solve problems in which the first step changes the second —moving a ball from one urn to another, choosing an urn and drawing two balls— with total probability and Bayes.'),
        problem: say('I kutxak 3 bola zuri eta beltz 1 ditu; II kutxak, 2 zuri eta 2 beltz. Bola bat I kutxatik II kutxara pasatzen da, eta gero bola bat ateratzen da II kutxatik. Zein da zuria izateko probabilitatea? Zuria atera bada, zein da pasatutakoa beltza izateko probabilitatea?', 'La urna I tiene 3 bolas blancas y 1 negra; la urna II, 2 blancas y 2 negras. Se pasa una bola de I a II y después se saca una bola de II. ¿Probabilidad de que sea blanca? Si ha salido blanca, ¿probabilidad de que la bola pasada fuera negra?', 'في الجرّة I ثلاث كرات بيضاء وكرة سوداء، وفي الجرّة II كرتان بيضاوان وكرتان سوداوان. تُنقل كرة من I إلى II ثم تُسحب كرة من II. ما احتمال أن تكون بيضاء؟ وإذا خرجت بيضاء، فما احتمال أن تكون الكرة المنقولة سوداء؟', 'Urn I has 3 white balls and 1 black one; urn II, 2 white and 2 black. A ball is moved from I to II and then a ball is drawn from II. What is the probability that it is white? If it was white, what is the probability that the ball moved was black?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zuria pasatzen bada (4 bolatik 3), II kutxak 5 bolatik 3 zuri ditu; beltza pasatzen bada (4 bolatik 1), 5 bolatik 2 zuri.', 'Si pasa blanca (3 de 4), II queda con 3 blancas de 5; si pasa negra (1 de 4), con 2 blancas de 5.', 'إذا انتقلت بيضاء (3 من 4) صار في II ثلاث بيضاء من 5؛ وإذا انتقلت سوداء (1 من 4) صار فيها بيضاوان من 5.', 'If a white one moves (3 out of 4), II has 3 white out of 5; if a black one moves (1 out of 4), 2 white out of 5.'), math: same('$\\frac{3}{4}\\cdot\\frac{3}{5}=\\frac{9}{20}\\qquad\\frac{1}{4}\\cdot\\frac{2}{5}=\\frac{2}{20}$') },
            { text: say('Zuriaren probabilitate osoa.', 'Probabilidad total de blanca.', 'الاحتمال الكلي للبيضاء.', 'Total probability of white.'), math: same('$\\frac{9}{20}+\\frac{2}{20}=\\frac{11}{20}$') },
            { text: say('Bayes: «beltza pasatzen da» bidea zati guztizkoa.', 'Bayes: el camino «pasa negra» entre el total.', 'بايز: مسار «تنتقل سوداء» على الكلي.', 'Bayes: the path ‘a black one moves’ over the total.'), math: same('$\\frac{2}{20}\\div\\frac{11}{20}=\\frac{2}{11}$') }
        ],
        takeaway: say(
            'Lehen urratsak bigarrenaren osaera aldatzen duenean, zuhaitz bat egiten da, lehen urratsaren aukera bakoitzeko adar batekin. Azken probabilitatea osoa da, eta «amaiera jakinda, zer gertatu zen lehenik?» galdera Bayes da.',
            'Cuando el primer paso cambia la composición del segundo, se hace un árbol con una rama por cada posibilidad del primer paso. La probabilidad final es la total, y la pregunta «sabiendo el final, ¿qué pasó primero?» es Bayes.',
            'عندما تغيّر الخطوة الأولى تركيب الثانية نرسم شجرة فيها فرع لكل إمكانية من الخطوة الأولى. الاحتمال النهائي هو الكلي، وسؤال «مع العلم بالنهاية، ماذا حدث أولًا؟» هو بايز.',
            'When the first step changes the composition of the second, you draw a tree with one branch for each possibility of the first step. The final probability is the total one, and the question «knowing the end, what happened first?» is Bayes.'
        ),
        figure: (language) => <TransferFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const probabilityBatx2Topics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...probabilityBatx2LessonTexts[topic.id as ProbabilityBatx2TopicId], ...probabilityBatx2LessonChecks[topic.id as ProbabilityBatx2TopicId] }))
