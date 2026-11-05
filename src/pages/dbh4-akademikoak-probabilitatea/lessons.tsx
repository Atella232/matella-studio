import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import {
    CoinsTreeFigure,
    CombinationsDeckFigure,
    ConditionalFigure,
    ContingencyTableFigure,
    DeckEventsFigure,
    FairGameFigure,
    FrequencyFigure,
    MaxDiceFigure,
    ProbabilityVennFigure,
    ReplacementFigure,
    TotalTreeFigure,
    TwoDiceFigure,
    TwoDrawTreeFigure,
    UrnDrawsFigure,
    VennNumbersFigure
} from './figures'
import { probabilityAkLessonChecks, type ProbabilityAkTopicId } from './lessonChecks'
import { probabilityAkLessonTexts } from './lessonTexts'

/* ==========================================================================
   Probabilitatea · 4. DBH akademikoak — stages and lessons, following
   Santillana Académicas unit 14 (random experiments, events and their
   operations, relative frequency, the rule of Laplace, properties,
   conditional probability, compound experiments and contingency tables)
   and Anaya Académicas unit 12 (balls numbered 1 to 10, the octahedral
   die, cards with and without replacement, urns that pass a ball on, the
   table of extracurricular activities, combinatorics with three dice and
   fair games).
   ========================================================================== */

export type ProbabilityAkStageId = 'events' | 'probability' | 'compound' | 'conditional' | 'counting'

export const probabilityAkStages: UnitStage[] = [
    { id: 'events', tone: 'blue', title: { eu: 'Gertaerak', es: 'Sucesos', en: 'Events', ar: 'الأحداث' } },
    { id: 'probability', tone: 'violet', title: { eu: 'Probabilitatea', es: 'Probabilidad', en: 'Probability', ar: 'الاحتمال' } },
    { id: 'compound', tone: 'mustard', title: { eu: 'Esperientzia konposatuak', es: 'Experiencias compuestas', en: 'Compound experiments', ar: 'التجارب المركّبة' } },
    { id: 'conditional', tone: 'coral', title: { eu: 'Baldintzatua', es: 'Condicionada', en: 'Conditional', ar: 'الاحتمال المشروط' } },
    { id: 'counting', tone: 'green', title: { eu: 'Zenbatu eta erabaki', es: 'Contar y decidir', en: 'Count and decide', ar: 'العدّ والقرار' } }
]

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Events ---------- */
    {
        id: 'experiments',
        stage: 'events',
        figureAfterSteps: true,
        title: say('Esperimentu aleatorioak eta lagin-espazioa', 'Experimentos aleatorios y espacio muestral', 'التجارب العشوائية وفضاء العيّنة', 'Random experiments and sample space'),
        goal: say('Esperimentu aleatorioak eta deterministak bereiztea, eta lagin-espazioa idaztea.', 'Distinguir experimentos aleatorios y deterministas, y escribir el espacio muestral.', 'التمييز بين التجارب العشوائية والحتمية، وكتابة فضاء العيّنة.', 'Distinguish random and deterministic experiments, and write the sample space.'),
        needs: [
            { unit: 'dbh3/estadistica-probabilidad', topic: 'events', title: { eu: 'Ausazko esperimentuak eta gertaerak', es: 'Experimentos aleatorios y sucesos', en: 'Random experiments and events', ar: 'التجارب العشوائية والأحداث' } },
            { unit: 'dbh4-akademikoak/combinatoria', topic: 'tree', title: { eu: 'Zuhaitz-diagramak', es: 'Diagramas de árbol', en: 'Tree diagrams', ar: 'المخططات الشجرية' } }
        ],
        problem: say('Hiru txanpon botatzen ditugu. Idatzi lagin-espazioa. Zenbat oinarrizko gertaera ditu? Zeintzuk osatzen dute «gutxienez bi aurpegi» gertaera?', 'Lanzamos tres monedas. Escribe el espacio muestral. ¿Cuántos sucesos elementales tiene? ¿Cuáles forman el suceso «al menos dos caras»?', 'نرمي ثلاث قطع نقدية. اكتب فضاء العيّنة. كم حدثًا بسيطًا فيه؟ وما الأحداث البسيطة التي تكوّن الحدث «وجهان على الأقل»؟', 'We toss three coins. Write the sample space. How many elementary events does it have? Which of them make up the event “at least two heads”?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Txanpon bakoitza C edo +: hiru mailako zuhaitza.', 'Cada moneda, C o +: un árbol de tres niveles.', 'كل قطعة C أو +: شجرة من ثلاثة مستويات.', 'Each coin, C or +: a tree with three levels.'), math: same('$2\\cdot 2\\cdot 2=8$') },
            { text: say('Ibili adarrak ordenan: $\\text{CCC}$, $\\text{CC+}$, $\\text{C+C}$, $\\text{C++}$, $\\text{+CC}$, $\\text{+C+}$, $\\text{++C}$, $\\text{+++}$.', 'Recorre las ramas en orden: $\\text{CCC}$, $\\text{CC+}$, $\\text{C+C}$, $\\text{C++}$, $\\text{+CC}$, $\\text{+C+}$, $\\text{++C}$, $\\text{+++}$.', 'امشِ على الفروع بالترتيب: $\\text{CCC}$، $\\text{CC+}$، $\\text{C+C}$، $\\text{C++}$، $\\text{+CC}$، $\\text{+C+}$، $\\text{++C}$، $\\text{+++}$.', 'Go through the branches in order: $\\text{CCC}$, $\\text{CC+}$, $\\text{C+C}$, $\\text{C++}$, $\\text{+CC}$, $\\text{+C+}$, $\\text{++C}$, $\\text{+++}$.') },
            { text: say('Gutxienez bi aurpegi: 8 kasutatik 4.', 'Al menos dos caras: 4 de los 8.', 'وجهان على الأقل: 4 من 8.', 'At least two heads: 4 of the 8.'), math: same('$\\{\\text{CCC},\\text{CC+},\\text{C+C},\\text{+CC}\\}$') }
        ],
        takeaway: say('Aleatorioa: ezin da aurreikusi. Lagin-espazioa: emaitza guztiak; gertaera: haien zati bat.', 'Aleatorio: no se puede predecir. Espacio muestral: todos los resultados; suceso: una parte de ellos.', 'عشوائية: لا يمكن التنبؤ بها. فضاء العيّنة: كل النتائج؛ والحدث: جزء منها.', 'Random: it cannot be predicted. Sample space: all the outcomes; event: some of them.'),
        figure: (language) => <CoinsTreeFigure language={language} />
    },
    {
        id: 'operations',
        stage: 'events',
        title: say('Gertaeren arteko eragiketak', 'Operaciones con sucesos', 'العمليات على الأحداث', 'Operations with events'),
        goal: say('Gertaeren bildura, ebakidura eta aurkakoa kalkulatzea.', 'Calcular la unión, la intersección y el contrario de sucesos.', 'حساب اتحاد الأحداث وتقاطعها والحدث المعاكس.', 'Calculate the union, the intersection and the complementary event.'),
        needs: [
            { unit: 'dbh4-akademikoak/numeros-reales', topic: 'interval-ops', title: { eu: 'Tarteen bildura eta ebakidura', es: 'Unión e intersección de intervalos', en: 'Union and intersection of intervals', ar: 'اتحاد الفترات وتقاطعها' } }
        ],
        problem: say('Poltsa batean 10 bola daude, 1 eta 10 arteko zenbakiekin. Bat ateratzen dugu. $A$ = «zenbaki lehena» eta $B$ = «3 zenbakiaren multiploa». Deskribatu $A\\cup B$, $A\\cap B$ eta $\\overline{A}$.', 'Una bolsa tiene 10 bolas numeradas del 1 al 10. Sacamos una. $A$ = «número primo» y $B$ = «múltiplo de 3». Describe $A\\cup B$, $A\\cap B$ y $\\overline{A}$.', 'في كيس 10 كرات مرقّمة من 1 إلى 10. نسحب واحدة. $A$ = «عدد أولي» و$B$ = «مضاعف للعدد 3». صِف $A\\cup B$ و$A\\cap B$ و$\\overline{A}$.', 'A bag has 10 balls numbered from 1 to 10. We take one out. $A$ = “prime number” and $B$ = “multiple of 3”. Describe $A\\cup B$, $A\\cap B$ and $\\overline{A}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi gertaera bakoitza.', 'Escribe cada suceso.', 'اكتب كل حدث.', 'Write down each event.'), math: same('$A=\\{2,3,5,7\\}\\quad B=\\{3,6,9\\}$') },
            { text: say('Bildura: denak, 3 zenbakia errepikatu gabe.', 'Unión: todos, sin repetir el 3.', 'الاتحاد: الكل دون تكرار 3.', 'Union: all of them, without repeating 3.'), math: same('$A\\cup B=\\{2,3,5,6,7,9\\}$') },
            { text: say('Ebakidura: $A\\cap B=\\{3\\}$. Aurkakoa: lehenak ez direnak.', 'Intersección: $A\\cap B=\\{3\\}$. Contrario: los que no son primos.', 'التقاطع: $A\\cap B=\\{3\\}$. المعاكس: الأعداد غير الأولية.', 'Intersection: $A\\cap B=\\{3\\}$. Complementary event: the ones that are not prime.'), math: same('$\\overline{A}=\\{1,4,6,8,9,10\\}$') }
        ],
        takeaway: say('Bildura: «edo». Ebakidura: «eta». Aurkakoa: «ez».', 'Unión: «o». Intersección: «y». Contrario: «no».', 'الاتحاد: «أو». التقاطع: «و». المعاكس: «لا».', 'Union: “or”. Intersection: “and”. Complementary event: “not”.'),
        figure: (language) => <VennNumbersFigure language={language} />
    },
    {
        id: 'compatible',
        stage: 'events',
        title: say('Gertaera bateragarriak eta bateraezinak', 'Sucesos compatibles e incompatibles', 'الأحداث المتوافقة والمتنافية', 'Compatible and mutually exclusive events'),
        goal: say('Gertaera bateragarriak, bateraezinak eta aurkakoak ezagutzea, eta De Morganen legeak erabiltzea.', 'Reconocer sucesos compatibles, incompatibles y contrarios, y usar las leyes de De Morgan.', 'التعرّف على الأحداث المتوافقة والمتنافية والمتعاكسة، واستعمال قانونَي دي مورغان.', 'Recognise compatible, mutually exclusive and complementary events, and use De Morgan\'s laws.'),
        problem: say('Sorta espainiar batetik karta bat ateratzen da. $A$ = «batekoa», $B$ = «bastoiak» eta $C$ = «irudia». Zein bikote dira bateragarriak? Zenbat kartak osatzen dute «ez batekoa ez irudia» gertaera?', 'Se saca una carta de una baraja española. $A$ = «as», $B$ = «bastos» y $C$ = «figura». ¿Qué pares son compatibles? ¿Cuántas cartas forman el suceso «ni as ni figura»?', 'تُسحب ورقة من ورق اللعب الإسباني. $A$ = «آس» و$B$ = «عصي» و$C$ = «صورة». أي الأزواج متوافقة؟ وكم ورقة تكوّن الحدث «لا آس ولا صورة»؟', 'A card is drawn from a Spanish deck. $A$ = “ace”, $B$ = “clubs” and $C$ = “court card”. Which pairs are compatible? How many cards make up the event “neither ace nor court card”?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$A$ eta $B$: bastoien batekoa bietan dago. $B$ eta $C$ ere bai: bastoien irudiak.', '$A$ y $B$: el as de bastos está en los dos. $B$ y $C$ también: las figuras de bastos.', '$A$ و$B$: آس العصي فيهما. وكذلك $B$ و$C$: صور العصي.', '$A$ and $B$: the ace of clubs is in both. $B$ and $C$ too: the court cards of clubs.'), math: same('$A\\cap B\\neq\\varnothing$') },
            { text: say('$A$ eta $C$: ez dago batekoa eta irudia den kartarik.', '$A$ y $C$: ninguna carta es as y figura.', '$A$ و$C$: لا توجد ورقة هي آس وصورة معًا.', '$A$ and $C$: no card is both an ace and a court card.'), math: same('$A\\cap C=\\varnothing$') },
            { text: say('Ez batekoa ez irudia: kendu 4 batekoak eta 12 irudiak.', 'Ni as ni figura: quita 4 ases y 12 figuras.', 'لا آس ولا صورة: اطرح 4 آسات و12 صورة.', 'Neither ace nor court card: remove 4 aces and 12 court cards.'), math: same('$40-4-12=24$') }
        ],
        takeaway: say('Bateragarriak: emaitzaren bat partekatzen dute. Bateraezinak: ebakidura hutsa. Aurkakoak: bateraezinak, eta biek $E$ betetzen dute.', 'Compatibles: comparten algún resultado. Incompatibles: intersección vacía. Contrarios: incompatibles y entre los dos llenan $E$.', 'متوافقان: يشتركان في نتيجة. متنافيان: التقاطع فارغ. متعاكسان: متنافيان ويملآن معًا $E$.', 'Compatible: they share some outcome. Mutually exclusive: the intersection is empty. Complementary: mutually exclusive, and together they fill $E$.'),
        figure: (language) => <DeckEventsFigure language={language} />
    },

    /* ---------- 2. Probability ---------- */
    {
        id: 'frequency',
        stage: 'probability',
        figureAfterSteps: true,
        title: say('Maiztasun erlatiboa eta probabilitatea', 'Frecuencia relativa y probabilidad', 'التكرار النسبي والاحتمال', 'Relative frequency and probability'),
        goal: say('Probabilitateak maiztasun erlatiboarekin estimatzea eta zenbaki handien legea ulertzea.', 'Estimar probabilidades con la frecuencia relativa y entender la ley de los grandes números.', 'تقدير الاحتمالات بالتكرار النسبي وفهم قانون الأعداد الكبيرة.', 'Estimate probabilities using relative frequency and understand the law of large numbers.'),
        needs: [
            { unit: 'dbh4-akademikoak/estadistica', topic: 'frequencies', title: { eu: 'Maiztasun-taulak', es: 'Tablas de frecuencias', en: 'Frequency tables', ar: 'جداول التكرارات' } }
        ],
        problem: say('Txintxeta bat 1000 aldiz botatzen da, eta 380 aldiz erortzen da punta gora. Estimatu punta gora eta punta behera erortzeko probabilitateak. Zenbat aldiz espero duzu punta gora 250 jaurtiketatan?', 'Se lanza una chincheta 1000 veces y cae con la punta hacia arriba 380 veces. Estima la probabilidad de punta arriba y la de punta abajo. ¿Cuántas veces esperas punta arriba en 250 lanzamientos?', 'يُرمى دبوس 1000 مرة فيسقط ورأسه إلى الأعلى 380 مرة. قدّر احتمال سقوطه ورأسه إلى الأعلى وإلى الأسفل. كم مرة تنتظر الرأس إلى الأعلى في 250 رمية؟', 'A drawing pin is tossed 1,000 times and lands point up 380 times. Estimate the probability of landing point up and the probability of landing point down. How many times would you expect point up in 250 throws?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Punta goraren maiztasun erlatiboa.', 'Frecuencia relativa de punta arriba.', 'التكرار النسبي للرأس إلى الأعلى.', 'Relative frequency of point up.'), math: same('$\\frac{380}{1000}=0{,}38$') },
            { text: say('Punta behera aurkakoa da.', 'Punta abajo es el contrario.', 'الرأس إلى الأسفل هو المعاكس.', 'Point down is the complementary event.'), math: same('$1-0{,}38=0{,}62$') },
            { text: say('Aurreikuspena 250 jaurtiketarako.', 'Predicción para 250 lanzamientos.', 'التنبؤ لـ250 رمية.', 'Prediction for 250 throws.'), math: same('$0{,}38\\cdot 250=95$') }
        ],
        takeaway: say('Errepikapen asko: maiztasun erlatiboa probabilitatera hurbiltzen da.', 'Muchas repeticiones: la frecuencia relativa se acerca a la probabilidad.', 'تكرارات كثيرة: يقترب التكرار النسبي من الاحتمال.', 'Many repetitions: the relative frequency gets closer to the probability.'),
        figure: (language) => <FrequencyFigure language={language} />
    },
    {
        id: 'laplace',
        stage: 'probability',
        figureAfterSteps: true,
        title: say('Laplaceren erregela', 'La regla de Laplace', 'قاعدة لابلاس', 'Laplace\'s rule'),
        goal: say('Esperimentu erregularretan probabilitateak kalkulatzea, aldeko kasuak eta kasu posibleak zenbatuta.', 'Calcular probabilidades en experimentos regulares contando casos favorables y posibles.', 'حساب الاحتمالات في التجارب المنتظمة بعدّ الحالات الملائمة والممكنة.', 'Calculate probabilities in regular experiments by counting favourable and possible outcomes.'),
        needs: [
            { unit: 'dbh3/estadistica-probabilidad', topic: 'laplace', title: { eu: 'Laplaceren erregela', es: 'La regla de Laplace', en: 'Laplace’s rule', ar: 'قاعدة لابلاس' } }
        ],
        problem: say('Bi dado botatzen ditugu. Kalkulatu batura 7 izateko probabilitatea eta 11 izatekoa. Zergatik ez da $\\frac{1}{11}$?', 'Lanzamos dos dados. Calcula la probabilidad de que la suma sea 7 y la de que sea 11. ¿Por qué no es $\\frac{1}{11}$?', 'نرمي نردين. احسب احتمال أن يكون المجموع 7 واحتمال أن يكون 11. لماذا لا يساوي $\\frac{1}{11}$؟', 'We roll two dice. Calculate the probability that the sum is 7 and the probability that it is 11. Why is it not $\\frac{1}{11}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kasu posibleak: taulako bikoteak.', 'Casos posibles: los pares de la tabla.', 'الحالات الممكنة: أزواج الجدول.', 'Possible outcomes: the pairs in the table.'), math: same('$6\\cdot 6=36$') },
            { text: say('7 batura: 6 lauki.', 'Suma 7: 6 casillas.', 'المجموع 7: ست خانات.', 'Sum of 7: 6 cells.'), math: same('$\\frac{6}{36}=\\frac{1}{6}$') },
            { text: say('11 batura: 2 lauki bakarrik. 11 baturak ez dira ekiprobableak.', 'Suma 11: solo 2 casillas. Las 11 sumas no son equiprobables.', 'المجموع 11: خانتان فقط. المجاميع الـ11 ليست متساوية الاحتمال.', 'Sum of 11: only 2 cells. The 11 sums are not equally likely.'), math: same('$\\frac{2}{36}=\\frac{1}{18}$') }
        ],
        takeaway: say('Laplace kasu ekiprobableekin bakarrik: aldekoak zati posibleak.', 'Laplace solo con casos equiprobables: favorables entre posibles.', 'لابلاس مع الحالات المتساوية الاحتمال فقط: الملائمة على الممكنة.', 'Laplace\'s rule only works with equally likely outcomes: favourable divided by possible.'),
        figure: (language) => <TwoDiceFigure language={language} />
    },
    {
        id: 'properties',
        stage: 'probability',
        title: say('Probabilitatearen propietateak', 'Propiedades de la probabilidad', 'خصائص الاحتمال', 'Properties of probability'),
        goal: say('Aurkako gertaera eta bilduraren probabilitatea erabiltzea, esperimentu irregularretan ere.', 'Usar el suceso contrario y la probabilidad de la unión, también en experimentos irregulares.', 'استعمال الحدث المعاكس واحتمال الاتحاد، حتى في التجارب غير المنتظمة.', 'Use the complementary event and the probability of the union, also in irregular experiments.'),
        problem: say('Gazte talde batean, $A$ = «futbolean jokatzen du» eta $B$ = «saskibaloian jokatzen du». Badakigu $P(A\\cup B)=0{,}7$, $P(A\\cap B)=0{,}12$ eta $P(\\overline{A})=0{,}74$ direla. Kalkulatu $P(B)$.', 'En un grupo de jóvenes, $A$ = «juega al fútbol» y $B$ = «juega al baloncesto». Se sabe que $P(A\\cup B)=0{,}7$, $P(A\\cap B)=0{,}12$ y $P(\\overline{A})=0{,}74$. Calcula $P(B)$.', 'في مجموعة من الشباب، $A$ = «يلعب كرة القدم» و$B$ = «يلعب كرة السلة». نعلم أن $P(A\\cup B)=0{,}7$ و$P(A\\cap B)=0{,}12$ و$P(\\overline{A})=0{,}74$. احسب $P(B)$.', 'In a group of young people, $A$ = “plays football” and $B$ = “plays basketball”. It is known that $P(A\\cup B)=0{,}7$, $P(A\\cap B)=0{,}12$ and $P(\\overline{A})=0{,}74$. Calculate $P(B)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehenik $P(A)$, aurkakoarekin.', 'Primero $P(A)$, con el contrario.', 'أولًا $P(A)$ بالمعاكس.', 'First find $P(A)$, using the complementary event.'), math: same('$P(A)=1-0{,}74=0{,}26$') },
            { text: say('Idatzi bilduraren formula.', 'Escribe la fórmula de la unión.', 'اكتب صيغة الاتحاد.', 'Write the formula for the union.'), math: same('$0{,}7=0{,}26+P(B)-0{,}12$') },
            { text: say('Askatu.', 'Despeja.', 'اعزل المجهول.', 'Solve for x.'), math: same('$P(B)=0{,}7-0{,}26+0{,}12=0{,}56$') }
        ],
        takeaway: say('Aurkakoa: 1 ken. Bildura: batu eta kendu ebakidura.', 'Contrario: 1 menos. Unión: suma y resta la intersección.', 'المعاكس: 1 ناقص. الاتحاد: اجمع واطرح التقاطع.', 'Complementary event: 1 minus it. Union: add, then subtract the intersection.'),
        figure: (language) => <ProbabilityVennFigure language={language} />
    },

    /* ---------- 3. Compound experiments ---------- */
    {
        id: 'independent',
        stage: 'compound',
        figureAfterSteps: true,
        title: say('Esperientzia independenteak', 'Experiencias independientes', 'التجارب المستقلة', 'Independent experiments'),
        goal: say('Esperientzia konposatu independenteen probabilitateak biderkatuz kalkulatzea.', 'Calcular probabilidades de experiencias compuestas independientes multiplicando.', 'حساب احتمالات التجارب المركّبة المستقلة بالضرب.', 'Calculate probabilities of independent compound experiments by multiplying.'),
        needs: [
            { unit: 'dbh3/estadistica-probabilidad', topic: 'compound', title: { eu: 'Esperimentu konposatuak', es: 'Experimentos compuestos', en: 'Compound experiments', ar: 'التجارب المركّبة' } }
        ],
        problem: say('40 kartako sorta espainiar batetik 3 karta ateratzen dira, bakoitza itzuliz hurrengoa atera aurretik. Kalkulatu 1.ean batekoa eta 2.ean eta 3.ean irudia ateratzeko probabilitatea, eta batekorik ez ateratzekoa.', 'Se extraen 3 cartas de una baraja española de 40, devolviendo cada carta antes de sacar la siguiente. Calcula la probabilidad de as en la 1.ª y figura en la 2.ª y la 3.ª, y la de no sacar ningún as.', 'تُسحب 3 أوراق من ورق اللعب الإسباني (40 ورقة) مع إرجاع كل ورقة قبل سحب التالية. احسب احتمال آس في الأولى وصورة في الثانية والثالثة، واحتمال عدم سحب أي آس.', 'Three cards are drawn from a 40-card Spanish deck, returning each card before drawing the next one. Calculate the probability of an ace on the 1st draw and a court card on the 2nd and 3rd, and the probability of not drawing any ace.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Karta bat: 40 kartatik 4 batekoa eta 12 irudi.', 'Una carta: 4 ases y 12 figuras de 40.', 'ورقة واحدة: 4 آسات و12 صورة من 40.', 'One card: 4 aces and 12 court cards out of 40.'), math: same('$\\frac{4}{40}=\\frac{1}{10}\\qquad\\frac{12}{40}=\\frac{3}{10}$') },
            { text: say('Itzulita: biderkatu.', 'Con devolución: multiplica.', 'مع الإرجاع: اضرب.', 'With replacement: multiply.'), math: same('$\\frac{1}{10}\\cdot\\frac{3}{10}\\cdot\\frac{3}{10}=\\frac{9}{1000}$') },
            { text: say('Batekorik ez: hiru aldiz «ez batekoa».', 'Ningún as: tres veces «no as».', 'لا آس: ثلاث مرات «ليس آسًا».', 'No ace: three times “not an ace”.'), math: same('$\\left(\\frac{9}{10}\\right)^{3}=\\frac{729}{1000}$') }
        ],
        takeaway: say('Independenteak: biderkatu. «Gutxienez bat» = 1 − «bat ere ez».', 'Independientes: multiplica. «Al menos uno» = 1 − «ninguno».', 'مستقلة: اضرب. «واحد على الأقل» = 1 − «لا شيء».', 'Independent: multiply. “At least one” = 1 − “none”.'),
        figure: (language) => <ReplacementFigure language={language} />
    },
    {
        id: 'dependent',
        stage: 'compound',
        figureAfterSteps: true,
        title: say('Mendeko esperientziak', 'Experiencias dependientes', 'التجارب التابعة', 'Dependent experiments'),
        goal: say('Itzuli gabeko ateratzeen probabilitateak kalkulatzea, bigarrena lehenengoaren araberakoa denean.', 'Calcular probabilidades de extracciones sin devolución, en las que la segunda depende de la primera.', 'حساب احتمالات السحب دون إرجاع، حيث تتعلّق الثانية بالأولى.', 'Calculate probabilities for draws without replacement, where the second depends on the first.'),
        problem: say('Kutxa batean 5 bola beltz eta 3 zuri daude. Hiru bola ateratzen ditugu, itzuli gabe. Zein da hirurak zuriak izateko probabilitatea? Eta beltzak?', 'Una urna contiene 5 bolas negras y 3 blancas. Extraemos tres bolas sin devolverlas. ¿Cuál es la probabilidad de que las tres sean blancas? ¿Y negras?', 'في جرّة 5 كرات سوداء و3 بيضاء. نسحب ثلاث كرات دون إرجاع. ما احتمال أن تكون الثلاث بيضاء؟ وسوداء؟', 'An urn contains 5 black balls and 3 white balls. We draw three balls without replacing them. What is the probability that all three are white? And black?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zuriak: aldi bakoitzean zuri bat eta bola bat gutxiago.', 'Blancas: cada vez una blanca y una bola menos.', 'البيضاء: كل مرة بيضاء أقل وكرة أقل.', 'White: each time, one fewer white ball and one fewer ball in total.'), math: same('$\\frac{3}{8}\\cdot\\frac{2}{7}\\cdot\\frac{1}{6}=\\frac{6}{336}$') },
            { text: say('Sinplifikatu.', 'Simplifica.', 'اختصر.', 'Simplify.'), math: same('$\\frac{6}{336}=\\frac{1}{56}$') },
            { text: say('Beltzak, berdin.', 'Negras, igual.', 'السوداء بالطريقة نفسها.', 'Black: the same way.'), math: same('$\\frac{5}{8}\\cdot\\frac{4}{7}\\cdot\\frac{3}{6}=\\frac{60}{336}=\\frac{5}{28}$') }
        ],
        takeaway: say('Itzuli gabe: izendatzailea jaitsi egiten da, eta faktore bakoitza aurrekoaren araberakoa da.', 'Sin devolver: el denominador baja y cada factor depende de lo anterior.', 'دون إرجاع: ينقص المقام ويتعلّق كل عامل بما قبله.', 'Without replacement: the denominator goes down and each factor depends on the one before.'),
        figure: (language) => <UrnDrawsFigure language={language} />
    },
    {
        id: 'trees',
        stage: 'compound',
        figureAfterSteps: true,
        title: say('Zuhaitz-diagramak', 'Diagramas de árbol', 'المخططات الشجرية', 'Tree diagrams'),
        goal: say('Esperientzia konposatu bat zuhaitz batean antolatzea eta gertaera baten bideak batzea.', 'Organizar una experiencia compuesta en un árbol y sumar los caminos de un suceso.', 'تنظيم تجربة مركّبة في شجرة وجمع مسارات حدث.', 'Organise a compound experiment in a tree diagram and add up the paths of an event.'),
        needs: [
            { unit: 'dbh4-akademikoak/combinatoria', topic: 'tree', title: { eu: 'Zuhaitz-diagramak', es: 'Diagramas de árbol', en: 'Tree diagrams', ar: 'المخططات الشجرية' } }
        ],
        problem: say('Kutxa batean 3 bola gorri eta 2 berde daude. Bi ateratzen ditugu, itzuli gabe. Kalkulatu bi gorri ateratzeko probabilitatea eta kolore bakoitzeko bat ateratzekoa.', 'Una urna tiene 3 bolas rojas y 2 verdes. Sacamos dos sin devolver. Calcula la probabilidad de sacar dos rojas y la de sacar una de cada color.', 'في جرّة 3 كرات حمراء وكرتان خضراوان. نسحب كرتين دون إرجاع. احسب احتمال سحب حمراوين واحتمال سحب واحدة من كل لون.', 'An urn has 3 red balls and 2 green ones. We draw two without replacement. Calculate the probability of drawing two reds and the probability of drawing one of each colour.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bi gorri: bide bakarra.', 'Dos rojas: un solo camino.', 'حمراوان: مسار واحد.', 'Two reds: only one path.'), math: same('$\\frac{3}{5}\\cdot\\frac{2}{4}=\\frac{6}{20}=\\frac{3}{10}$') },
            { text: say('Kolore bakoitzeko bat: bi bide.', 'Una de cada color: dos caminos.', 'واحدة من كل لون: مساران.', 'One of each colour: two paths.'), math: same('$\\frac{3}{5}\\cdot\\frac{2}{4}+\\frac{2}{5}\\cdot\\frac{3}{4}=\\frac{12}{20}$') },
            { text: say('Sinplifikatu eta egiaztatu bi berdeekin.', 'Simplifica y comprueba con las dos verdes.', 'اختصر وتحقّق بالخضراوين.', 'Simplify, and check using the two greens.'), math: same('$\\frac{12}{20}=\\frac{3}{5}\\qquad\\frac{3}{10}+\\frac{3}{5}+\\frac{1}{10}=1$') }
        ],
        takeaway: say('Bide batean, biderkatu; bideen artean, batu. Zuhaitz osoa batuta 1.', 'Por un camino, multiplica; entre caminos, suma. Todo el árbol suma 1.', 'في المسار اضرب، وبين المسارات اجمع. ومجموع الشجرة كلها 1.', 'Along one path, multiply; between paths, add. The whole tree adds up to 1.'),
        figure: (language) => <TwoDrawTreeFigure language={language} />
    },

    /* ---------- 4. Conditional probability ---------- */
    {
        id: 'contingency',
        stage: 'conditional',
        figureAfterSteps: true,
        title: say('Kontingentzia-taulak', 'Tablas de contingencia', 'جداول التوافق', 'Contingency tables'),
        goal: say('Sarrera bikoitzeko taula bat osatzea eta haren probabilitate soilak eta ebakidurakoak irakurtzea.', 'Completar una tabla de doble entrada y leer en ella probabilidades simples y de intersección.', 'إكمال جدول ذي مدخلين وقراءة الاحتمالات البسيطة واحتمالات التقاطع فيه.', 'Complete a two-way table and read simple and intersection probabilities from it.'),
        needs: [
            { unit: 'dbh4-akademikoak/estadistica', topic: 'frequencies', title: { eu: 'Maiztasun-taulak', es: 'Tablas de frecuencias', en: 'Frequency tables', ar: 'جداول التكرارات' } }
        ],
        problem: say('Ikastetxe batean 1000 ikasle daude: 600 DBHkoak eta 400 Batxilergokoak. Jantokia DBHko 240 ikaslek eta Batxilergoko 100 ikaslek erabiltzen dute. Osatu taula eta kalkulatu zoriz aukeratutako ikasle batek jantokia erabiltzeko probabilitatea, eta DBHkoa izan eta jantokia ez erabiltzekoa.', 'En un centro hay 1000 estudiantes: 600 de ESO y 400 de Bachillerato. Usan el comedor 240 de ESO y 100 de Bachillerato. Completa la tabla y calcula la probabilidad de que un estudiante elegido al azar use el comedor, y la de que sea de ESO y no lo use.', 'في مدرسة 1000 طالب: 600 في الإعدادي و400 في البكالوريا. يستعمل المطعم 240 من الإعدادي و100 من البكالوريا. أكمل الجدول واحسب احتمال أن يستعمل طالب مختار عشوائيًا المطعم، واحتمال أن يكون من الإعدادي ولا يستعمله.', 'In a school there are 1,000 students: 600 in ESO and 400 in upper secondary. 240 ESO students and 100 upper secondary students use the canteen. Complete the table and calculate the probability that a student chosen at random uses the canteen, and the probability that they are in ESO and do not use it.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Osatu: jantokiaren guztizkoa, $240+100=340$, eta jantokirik gabeko DBHkoak.', 'Completa: el total del comedor, $240+100=340$, y los de ESO sin comedor.', 'أكمل: مجموع المطعم $240+100=340$، وطلاب الإعدادي دون مطعم.', 'Complete it: the canteen total, $240+100=340$, and the ESO students who do not use the canteen.'), math: same('$600-240=360$') },
            { text: say('Probabilitate soila.', 'Probabilidad simple.', 'احتمال بسيط.', 'Simple probability.'), math: same('$\\frac{340}{1000}=0{,}34$') },
            { text: say('Ebakidura: gelaxka bat.', 'Intersección: una casilla.', 'التقاطع: خانة واحدة.', 'Intersection: one cell.'), math: same('$\\frac{360}{1000}=0{,}36$') }
        ],
        takeaway: say('Guztizkoa zati guztizko nagusia: soila. Gelaxka zati guztizko nagusia: ebakidura.', 'Total entre total general: simple. Casilla entre total general: intersección.', 'مجموع على المجموع العام: بسيط. خانة على المجموع العام: تقاطع.', 'Total divided by the grand total: simple. Cell divided by the grand total: intersection.'),
        figure: (language) => <ContingencyTableFigure language={language} />
    },
    {
        id: 'conditional',
        stage: 'conditional',
        figureAfterSteps: true,
        title: say('Probabilitate baldintzatua', 'Probabilidad condicionada', 'الاحتمال المشروط', 'Conditional probability'),
        goal: say('$P(A/B)$ taula batean eta formularekin kalkulatzea, eta bi gertaera independenteak diren erabakitzea.', 'Calcular $P(A/B)$ en una tabla y con la fórmula, y decidir si dos sucesos son independientes.', 'حساب $P(A/B)$ في جدول وبالصيغة، وتقرير ما إذا كان حدثان مستقلين.', 'Calculate $P(A/B)$ from a table and with the formula, and decide whether two events are independent.'),
        problem: say('100 pertsonari egindako inkesta batean: 60 gizon (40 maskotarekin) eta 40 emakume (25 maskotarekin). $A$ = «maskota du» eta $M$ = «emakumea». Kalkulatu $P(A/M)$ eta $P(M/A)$. $A$ eta $M$ independenteak dira?', 'En una encuesta a 100 personas: 60 hombres (40 con mascota) y 40 mujeres (25 con mascota). Sean $A$ = «tiene mascota» y $M$ = «mujer». Calcula $P(A/M)$ y $P(M/A)$. ¿Son $A$ y $M$ independientes?', 'في استطلاع لـ100 شخص: 60 رجلًا (40 منهم مع حيوان أليف) و40 امرأة (25 منهن مع حيوان أليف). ليكن $A$ = «لديه حيوان أليف» و$M$ = «امرأة». احسب $P(A/M)$ و$P(M/A)$. هل $A$ و$M$ مستقلان؟', 'In a survey of 100 people: 60 men (40 with a pet) and 40 women (25 with a pet). Let $A$ = “has a pet” and $M$ = “woman”. Calculate $P(A/M)$ and $P(M/A)$. Are $A$ and $M$ independent?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Emakumea dela jakinda: 40 emakumeak bakarrik.', 'Sabiendo que es mujer: solo las 40 mujeres.', 'علمًا أنها امرأة: النساء الأربعون فقط.', 'Knowing the person is a woman: only the 40 women.'), math: same('$P(A/M)=\\frac{25}{40}=0{,}625$') },
            { text: say('Maskota duela jakinda: maskota duten 65 pertsonak.', 'Sabiendo que tiene mascota: las 65 con mascota.', 'علمًا أن لديه حيوانًا أليفًا: الـ65 أصحاب الحيوانات.', 'Knowing the person has a pet: the 65 with pets.'), math: same('$P(M/A)=\\frac{25}{65}=\\frac{5}{13}$') },
            { text: say('Konparatu $P(A)$-rekin: ez dira independenteak.', 'Compara con $P(A)$: no son independientes.', 'قارن بـ$P(A)$: ليسا مستقلين.', 'Compare with $P(A)$: they are not independent.'), math: same('$P(A)=\\frac{65}{100}=0{,}65$') }
        ],
        takeaway: say('Baldintzatua: kasu posibleak baldintzarenak bakarrik dira.', 'Condicionada: los casos posibles son solo los de la condición.', 'المشروط: الحالات الممكنة هي حالات الشرط فقط.', 'Conditional probability: the possible outcomes are only those in the condition.'),
        figure: (language) => <ConditionalFigure language={language} />
    },
    {
        id: 'total',
        stage: 'conditional',
        figureAfterSteps: true,
        title: say('Probabilitate osoa', 'Probabilidad total', 'الاحتمال الكلي', 'Total probability'),
        goal: say('Zuhaitz bateko bide batzuetatik iristen den azken emaitza baten probabilitatea kalkulatzea, eta atzerantz arrazoitzea.', 'Calcular la probabilidad de un resultado final al que se llega por varios caminos de un árbol, y razonar hacia atrás.', 'حساب احتمال نتيجة نهائية نصل إليها عبر عدة مسارات في شجرة، والاستدلال إلى الوراء.', 'Calculate the probability of a final outcome that can be reached by several paths in a tree, and reason backwards.'),
        problem: say('Dado bat botatzen dugu. 1 edo 2 ateratzen bada, I kutxatik bola bat ateratzen dugu (2 gorri eta 3 urdin); bestela, II kutxatik (4 gorri eta 1 urdin). Kalkulatu gorria ateratzeko probabilitatea. Gorria atera bada, zein da I kutxatik etortzeko probabilitatea?', 'Lanzamos un dado. Si sale 1 o 2, sacamos una bola de la urna I (2 rojas y 3 azules); si no, de la urna II (4 rojas y 1 azul). Calcula la probabilidad de sacar roja. Si ha salido roja, ¿cuál es la probabilidad de que viniera de la urna I?', 'نرمي نردًا. إذا ظهر 1 أو 2 نسحب كرة من الجرّة I (حمراوان و3 زرقاء)، وإلا فمن الجرّة II (4 حمراء وواحدة زرقاء). احسب احتمال سحب كرة حمراء. وإذا خرجت حمراء، فما احتمال أن تكون من الجرّة I؟', 'We roll a die. If it shows 1 or 2, we draw a ball from urn I (2 red and 3 blue); otherwise, from urn II (4 red and 1 blue). Calculate the probability of drawing a red ball. If a red ball was drawn, what is the probability that it came from urn I?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehen etapa: kutxa.', 'Primera etapa: la urna.', 'المرحلة الأولى: الجرّة.', 'First stage: the urn.'), math: same('$P(\\text{I})=\\frac{2}{6}\\qquad P(\\text{II})=\\frac{4}{6}$') },
            { text: say('Batu gorrian amaitzen diren bi bideak.', 'Suma los dos caminos que acaban en roja.', 'اجمع المسارين المنتهيين بالحمراء.', 'Add the two paths that end in red.'), math: same('$\\frac{2}{6}\\cdot\\frac{2}{5}+\\frac{4}{6}\\cdot\\frac{4}{5}=\\frac{20}{30}=\\frac{2}{3}$') },
            { text: say('Atzerantz: I kutxaren bidea zati guztizkoa.', 'Hacia atrás: el camino de la urna I entre el total.', 'إلى الوراء: مسار الجرّة I على الكلي.', 'Backwards: the path through urn I divided by the total.'), math: same('$\\frac{4}{30}:\\frac{20}{30}=\\frac{1}{5}$') }
        ],
        takeaway: say('Probabilitate osoa: batu emaitzara daramaten bide guztiak.', 'Probabilidad total: suma todos los caminos que llevan al resultado.', 'الاحتمال الكلي: اجمع كل المسارات المؤدية إلى النتيجة.', 'Total probability: add all the paths that lead to the outcome.'),
        figure: (language) => <TotalTreeFigure language={language} />
    },

    /* ---------- 5. Counting and deciding ---------- */
    {
        id: 'with-combinations',
        stage: 'counting',
        figureAfterSteps: true,
        title: say('Konbinatoria eta Laplaceren erregela', 'Combinatoria y regla de Laplace', 'التوافيق وقاعدة لابلاس', 'Combinatorics and Laplace\'s rule'),
        goal: say('Aldeko kasuak eta kasu posibleak aldakuntzekin eta konbinazioekin zenbatzea.', 'Contar casos favorables y posibles con variaciones y combinaciones.', 'عدّ الحالات الملائمة والممكنة بالتراتيب والتوافيق.', 'Count favourable and possible outcomes using arrangements and combinations.'),
        needs: [
            { unit: 'dbh4-akademikoak/combinatoria', topic: 'combinations', title: { eu: 'Konbinazioak', es: 'Combinaciones', en: 'Combinations', ar: 'التوافيق' } }
        ],
        problem: say('40 kartako sorta batetik 3 karta ateratzen dira batera. Kalkulatu bi eratara hirurak urreak izateko probabilitatea (10 urre daude).', 'Se sacan 3 cartas a la vez de una baraja de 40. Calcula de dos formas la probabilidad de que las tres sean oros (hay 10 oros).', 'تُسحب 3 أوراق معًا من مجموعة 40 ورقة. احسب بطريقتين احتمال أن تكون الثلاث من الذهب (هناك 10 أوراق ذهب).', 'Three cards are drawn at once from a 40-card deck. Calculate in two ways the probability that all three are coins (there are 10 cards of coins).'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kasu posibleak eta aldekoak.', 'Casos posibles y favorables.', 'الحالات الممكنة والملائمة.', 'Possible and favourable outcomes.'), math: same('$\\text{C}_{40,3}=9880\\qquad\\text{C}_{10,3}=120$') },
            { text: say('Laplace.', 'Laplace.', 'لابلاس.', 'Laplace\'s rule.'), math: same('$\\frac{120}{9\\,880}=\\frac{3}{247}$') },
            { text: say('Biderkadurarekin, itzuli gabe.', 'Con el producto, sin devolver.', 'بالضرب دون إرجاع.', 'Using the product, without replacement.'), math: same('$\\frac{10}{40}\\cdot\\frac{9}{39}\\cdot\\frac{8}{38}=\\frac{720}{59\\,280}=\\frac{3}{247}$') }
        ],
        takeaway: say('Aldekoak eta posibleak, berdin zenbatuta: konbinazioak ordenak axola ez badu.', 'Favorables y posibles, contados igual: combinaciones si el orden no importa.', 'الملائمة والممكنة تُعدّ بالطريقة نفسها: توافيق إذا لم يهم الترتيب.', 'Favourable and possible outcomes, counted the same way: combinations if order does not matter.'),
        figure: (language) => <CombinationsDeckFigure language={language} />
    },
    {
        id: 'several-dice',
        stage: 'counting',
        title: say('Hainbat dado', 'Varios dados', 'عدة نرود', 'Several dice'),
        goal: say('Hainbat daduren kasuak arretaz zenbatzea, ordenak kontuan hartuta.', 'Contar con cuidado los casos de varios dados, teniendo en cuenta los órdenes.', 'عدّ حالات عدة نرود بعناية مع مراعاة الترتيبات.', 'Count the outcomes of several dice carefully, taking the order into account.'),
        needs: [
            { unit: 'dbh4-akademikoak/combinatoria', topic: 'with-repetition', title: { eu: 'Errepikapenezko aldakuntzak', es: 'Variaciones con repetición', en: 'Arrangements with repetition', ar: 'التراتيب مع التكرار' } }
        ],
        problem: say('Hiru dado botatzen ditugu. Kalkulatu puntuazio handiena 4 izateko probabilitatea eta hiru puntuazioak desberdinak izatekoa.', 'Lanzamos tres dados. Calcula la probabilidad de que la mayor puntuación sea 4 y la de que las tres puntuaciones sean distintas.', 'نرمي ثلاثة نرود. احسب احتمال أن تكون أكبر نتيجة 4، واحتمال أن تكون النتائج الثلاث مختلفة.', 'We roll three dice. Calculate the probability that the highest score is 4 and the probability that all three scores are different.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kasu posibleak.', 'Casos posibles.', 'الحالات الممكنة.', 'Possible outcomes.'), math: same('$6^{3}=216$') },
            { text: say('Handiena 4: 4 artekoak ken 3 artekoak.', 'Mayor 4: hasta 4 menos hasta 3.', 'الأكبر 4: حتى 4 ناقص حتى 3.', 'Highest 4: up to 4 minus up to 3.'), math: same('$\\frac{4^{3}-3^{3}}{216}=\\frac{37}{216}$') },
            { text: say('Denak desberdinak: aldakuntzak.', 'Todas distintas: variaciones.', 'كلها مختلفة: تراتيب.', 'All different: arrangements.'), math: same('$\\frac{6\\cdot 5\\cdot 4}{216}=\\frac{120}{216}=\\frac{5}{9}$') }
        ],
        takeaway: say('Hainbat dadorekin, zerrenda ordenatuak zenbatzen dira: 6 ordena desberdinak badira, 3 bi berdin badaude.', 'Con varios dados cuentan las listas ordenadas: 6 órdenes si son distintas, 3 si hay dos iguales.', 'مع عدة نرود تُعدّ القوائم المرتّبة: 6 ترتيبات إذا كانت مختلفة، و3 إذا تساوت اثنتان.', 'With several dice, count the ordered lists: 6 orders if all are different, 3 if two are the same.'),
        figure: (language) => <MaxDiceFigure language={language} />
    },
    {
        id: 'fair-games',
        stage: 'counting',
        figureAfterSteps: true,
        title: say('Itxaropena eta joko bidezkoak', 'Esperanza y juegos equitativos', 'الأمل الرياضي والألعاب العادلة', 'Expected value and fair games'),
        goal: say('Joko baten irabazi itxaropena kalkulatzea eta bidezkoa den erabakitzea.', 'Calcular la ganancia esperada de un juego y decidir si es equitativo.', 'حساب الربح المتوقع للعبة وتقرير ما إذا كانت عادلة.', 'Calculate the expected gain of a game and decide whether it is fair.'),
        needs: [
            { unit: 'dbh4-akademikoak/estadistica', topic: 'mean', title: { eu: 'Batez bestekoa eta haztatua', es: 'Media y media ponderada', en: 'Mean and weighted mean', ar: 'المتوسط والمتوسط المرجّح' } }
        ],
        problem: say('Dado bat botatzen da: 1 edo 2 ateratzen bada 6 € irabazten dituzu, eta beste zenbaki bat ateratzen bada 3 € galtzen dituzu. Jokoa bidezkoa da? Eta 9 € irabaziko bazenitu?', 'Se lanza un dado: si sale 1 o 2 ganas 6 €, y si sale otro número pierdes 3 €. ¿Es equitativo el juego? ¿Y si ganaras 9 €?', 'يُرمى نرد: إذا ظهر 1 أو 2 تربح 6 €، وإذا ظهر عدد آخر تخسر 3 €. هل اللعبة عادلة؟ وماذا لو ربحت 9 €؟', 'A die is rolled: if it shows 1 or 2, you win €6; if it shows any other number, you lose €3. Is the game fair? And what if you won €9?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Probabilitateak: irabazi 2/6, galdu 4/6.', 'Probabilidades: ganar 2/6, perder 4/6.', 'الاحتمالات: الربح 2/6 والخسارة 4/6.', 'Probabilities: win 2/6, lose 4/6.'), math: same('$\\frac{2}{6}+\\frac{4}{6}=1$') },
            { text: say('Itxaropena: 0, bidezkoa.', 'Esperanza: 0, equitativo.', 'الأمل: 0، عادلة.', 'Expected value: 0, so the game is fair.'), math: same('$6\\cdot\\frac{2}{6}-3\\cdot\\frac{4}{6}=2-2=0$') },
            { text: say('9 €-rekin, jokalariaren alde.', 'Con 9 €, favorable al jugador.', 'مع 9 € لصالح اللاعب.', 'With €9, the game favours the player.'), math: same('$9\\cdot\\frac{2}{6}-3\\cdot\\frac{4}{6}=3-2=1$') }
        ],
        takeaway: say('Itxaropena = irabazia bider probabilitatea, batuta. Bidezkoa: itxaropena 0.', 'Esperanza = suma de ganancia por probabilidad. Equitativo: esperanza 0.', 'الأمل = مجموع الربح في الاحتمال. عادلة: الأمل 0.', 'Expected value = sum of gain times probability. Fair: expected value 0.'),
        figure: (language) => <FairGameFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const probabilityAkTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...probabilityAkLessonTexts[topic.id as ProbabilityAkTopicId], ...probabilityAkLessonChecks[topic.id as ProbabilityAkTopicId] }))
