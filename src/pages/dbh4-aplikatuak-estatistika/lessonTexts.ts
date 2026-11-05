import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { StatisticsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Estatistika eta probabilitatea · 4. DBH aplikatuak — what each lesson
   tells: the new words (definitions), a short explanation, its cases and
   the example as an exercise («Another example»; the ones about the kind
   of sample, of relationship or of correlation answer in words), with the
   key words in four languages and, in three lessons, «Why does it work?».
   Plain data so the tests can import it; lessons.tsx merges it into the
   topics. Almost every drawing shows the «Let's solve» of its lesson (the
   40 heights, the 25 families' cars, the 14 heights of the box, the two
   groups of marks, the spelling table, the two firms, the study hours, the
   sun line, the die, the spades and the 1000 students), so those drawings
   wait after the steps and the texts here use numbers of their own.
   ========================================================================== */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

export const statisticsLessonTexts: Record<StatisticsTopicId, LessonTexts> = {
    /* ---------- 1. Data and graphs ---------- */
    sampling: {
        definitions: [
            {
                term: say('Populazioa', 'Población', 'المجتمع', 'Population'),
                meaning: say('Aztertu nahi diren elementu guztiak.', 'Todos los elementos que se quieren estudiar.', 'كل العناصر التي نريد دراستها.', 'All the elements you want to study.')
            },
            {
                term: say('Lagina', 'Muestra', 'العيّنة', 'Sample'),
                meaning: say('Populazioaren zati bat, benetan aztertzen dena.', 'La parte de la población que se estudia de verdad.', 'جزء المجتمع الذي ندرسه فعلًا.', 'The part of the population that is actually studied.')
            }
        ],
        vocabulary: [
            say('diskretua', 'discreta', 'منفصل', 'discrete'),
            say('zoriz', 'al azar', 'عشوائيًا', 'at random'),
            say('aldagai kualitatiboa', 'variable cualitativa', 'متغير نوعي', 'qualitative variable'),
            say('aldagai jarraitua', 'variable continua', 'متغير متصل', 'continuous variable')
        ],
        explanation: say(
            'Lagin bat hartzen da populazioa oso handia denean, denei galdetzea garestiegia denean edo azterketak elementua suntsitzen duenean. Balio dezan, zoriz aukeratu behar da, eta talde guztiak egon behar dute. Aldagaiak kualitatiboak edo kuantitatiboak dira; kuantitatiboak, diskretuak (zenbatu egiten dira) edo jarraituak (neurtu egiten dira).',
            'Se toma una muestra cuando la población es muy grande, cuando preguntar a todos es demasiado caro o cuando el estudio destruye el elemento. Para que sirva, hay que elegirla al azar y que estén todos los grupos. Las variables son cualitativas o cuantitativas; las cuantitativas, discretas (se cuentan) o continuas (se miden).',
            'نأخذ عيّنة عندما يكون المجتمع كبيرًا جدًا، أو يكون سؤال الجميع مكلفًا جدًا، أو تُتلف الدراسة العنصر. ولكي تصلح يجب اختيارها عشوائيًا وأن تحضر فيها كل الفئات. والمتغيرات نوعية أو كمية؛ والكمية منفصلة (تُعَدّ) أو متصلة (تُقاس).',
            'A sample is taken when the population is very large, when asking everyone costs too much or when the study destroys the item. To be useful, it must be chosen at random and include every group. Variables are qualitative or quantitative; quantitative ones are discrete (counted) or continuous (measured).'
        ),
        cases: [
            { title: say('Zoriz', 'Al azar', 'عشوائيًا', 'At random'), text: say('Torloju-fabrika batean, txanda bakoitzean zoriz aukeratzea baliozkoa da; astelehen goizekoak bakarrik begiratzea, ez.', 'En una fábrica de tornillos, elegir al azar en cada turno es válido; mirar solo los del lunes por la mañana, no.', 'في مصنع براغٍ، الاختيار العشوائي في كل وردية صالح؛ أما فحص براغي صباح الاثنين فقط فلا.', 'In a screw factory, choosing at random on every shift is valid; checking only Monday morning\'s screws is not.') },
            { title: say('Aldagai motak', 'Tipos de variable', 'أنواع المتغيرات', 'Kinds of variable'), text: say('Begien kolorea: aldagai kualitatiboa. Anai-arreba kopurua: diskretua. Altuera: aldagai jarraitua.', 'Color de ojos: variable cualitativa. Número de hermanos: discreta. Altura: variable continua.', 'لون العينين: متغير نوعي. عدد الإخوة: منفصل. الطول: متغير متصل.', 'Eye colour: qualitative variable. Number of siblings: discrete. Height: continuous variable.') }
        ],
        examplePrompt: say('Lagina ala populazio osoa? a) Fabrika bateko bonbillen iraupena. b) Gela bateko 25 ikasleen nota.', '¿Muestra o toda la población? a) La duración de las bombillas de una fábrica. b) La nota de los 25 alumnos de una clase.', 'عيّنة أم المجتمع كله؟ أ) مدة مصابيح مصنع. ب) علامة تلاميذ قسم عددهم 25.', 'Sample or the whole population? a) How long a factory\'s light bulbs last. b) The marks of the 25 students in a class.'),
        example: '',
        exampleAnswer: say('a) Lagina: azterketak bonbillak gastatzen ditu. b) Populazio osoa: gutxi dira, eta denak azter daitezke.', 'a) Muestra: el estudio gasta las bombillas. b) Toda la población: son pocos y se pueden estudiar todos.', 'أ) عيّنة: الدراسة تستهلك المصابيح. ب) المجتمع كله: العدد قليل ويمكن دراستهم جميعًا.', 'a) A sample: the study uses up the bulbs. b) The whole population: there are few, and all of them can be studied.')
    },
    intervals: {
        definitions: [
            {
                term: say('Ibiltartea', 'Recorrido', 'المدى', 'Range'),
                meaning: say('Datu handiena ken txikiena: $r$.', 'El dato mayor menos el menor: $r$.', 'أكبر بيان ناقص أصغرها: $r$.', 'The largest value minus the smallest: $r$.')
            },
            {
                term: say('Klase-marka', 'Marca de clase', 'مركز الفئة', 'Class mark'),
                meaning: say('Tarte baten erdiko puntua; tarte horretako datu guztien ordez erabiltzen da.', 'El punto medio de un intervalo; representa a todos sus datos.', 'منتصف الفئة؛ يمثّل كل بياناتها.', 'The midpoint of an interval; it stands for all its data.')
            }
        ],
        vocabulary: [
            say('tartea', 'intervalo', 'الفئة', 'interval'),
            say('zabalera', 'amplitud', 'طول الفئة', 'class width'),
            say('maiztasun absolutua', 'frecuencia absoluta', 'التكرار المطلق', 'absolute frequency'),
            say('soberakina', 'exceso', 'الفائض', 'excess')
        ],
        explanation: say(
            'Datu asko daudenean, tarteetan multzokatzen dira. Kalkulatu ibiltartea, erabaki tarte kopurua eta aukeratu $r^{\\prime}$ bat, $r$ baino handixeagoa eta kopuru horrekin zatigarria: zabalera zatidura da. Banatu soberakina, $r^{\\prime}-r$, bi muturretan, datu bat ere mugan gera ez dadin.',
            'Con muchos datos se agrupan en intervalos. Calcula el recorrido, decide el número de intervalos y elige un $r^{\\prime}$ algo mayor que $r$ y divisible entre ese número: la amplitud es el cociente. Reparte el exceso, $r^{\\prime}-r$, entre los dos extremos, para que ningún dato caiga en un borde.',
            'عندما تكثر البيانات تُبوَّب في فئات. احسب المدى، وقرّر عدد الفئات، واختر $r^{\\prime}$ أكبر قليلًا من $r$ ويقبل القسمة على ذلك العدد: طول الفئة هو ناتج القسمة. ووزّع الفائض $r^{\\prime}-r$ على الطرفين كي لا يقع أي بيان على حدّ.',
            'With a lot of data, group them into intervals. Work out the range, decide the number of intervals and choose an $r^{\\prime}$ a little bigger than $r$ and divisible by that number: the class width is the quotient. Share the excess, $r^{\\prime}-r$, between the two ends, so that no value falls on a boundary.'
        ),
        cases: [
            { title: say('Zabalera', 'Amplitud', 'طول الفئة', 'Class width'), text: say('$k$ tarterekin:', 'Con $k$ intervalos:', 'مع $k$ فئات:', 'With $k$ intervals:'), math: same('$a=\\frac{r^{\\prime}}{k}$') },
            { title: say('Maiztasun erlatiboa', 'Frecuencia relativa', 'التكرار النسبي', 'Relative frequency'), text: say('Maiztasun absolutua zati datu kopurua; bider 100, ehunekoa.', 'La frecuencia absoluta entre el número de datos; por 100, el porcentaje.', 'التكرار المطلق على عدد البيانات؛ وفي 100 النسبة المئوية.', 'The absolute frequency divided by the number of data; times 100, the percentage.'), math: same('$h_i=\\frac{f_i}{N}$') }
        ],
        examplePrompt: say('50 txakurren pisuak 6 kg eta 33 kg artean daude. Antolatu 7 tartetan: zabalera eta lehen tartea.', 'Los pesos de 50 perros van de 6 kg a 33 kg. Organízalos en 7 intervalos: amplitud y primer intervalo.', 'تمتد أوزان 50 كلبًا من 6 كغ إلى 33 كغ. نظّمها في 7 فئات: الطول والفئة الأولى.', 'The weights of 50 dogs go from 6 kg to 33 kg. Organise them into 7 intervals: class width and first interval.'),
        example: same('$\\begin{gathered}33-6=27\\ \\to\\ r^{\\prime}=28\\\\ 28\\div 7=4\\qquad [5{,}5;\\ 9{,}5)\\end{gathered}$'),
        exampleAnswer: say('Zabalera 4; soberakina 1 da, beraz, lehen tartea 5,5 kg-tik 9,5 kg-ra doa.', 'Amplitud 4; el exceso es 1, así que el primero va de 5,5 kg a 9,5 kg.', 'الطول 4؛ والفائض 1، فالفئة الأولى من 5.5 كغ إلى 9.5 كغ.', 'Width 4; the excess is 1, so the first one goes from 5.5 kg to 9.5 kg.')
    },
    charts: {
        vocabulary: [
            say('histograma', 'histograma', 'المدرّج التكراري', 'histogram'),
            say('sektore-diagrama', 'diagrama de sectores', 'المخطط الدائري', 'pie chart'),
            say('maiztasun-poligonoa', 'polígono de frecuencias', 'المضلّع التكراري', 'frequency polygon'),
            say('lerro-diagrama', 'diagrama de líneas', 'المخطط الخطي', 'line graph')
        ],
        explanation: say(
            'Aukeratu grafikoa aldagaiaren arabera. Kualitatiboa: barrak edo sektore-diagrama, $h_i\\cdot 360^{\\circ}$ angeluarekin. Diskretua: barra meheak balio bakoitzaren gainean. Tarteetan: histograma, laukizuzen itsatsiekin; klase-marken gaineko puntuak lotuta, maiztasun-poligonoa. Denboran zehar aldatzen bada: lerro-diagrama.',
            'Elige el gráfico según la variable. Cualitativa: barras o diagrama de sectores, con el ángulo $h_i\\cdot 360^{\\circ}$. Discreta: barras finas sobre cada valor. En intervalos: histograma, con rectángulos pegados; uniendo los puntos sobre las marcas de clase sale el polígono de frecuencias. Si cambia con el tiempo: diagrama de líneas.',
            'اختر التمثيل حسب المتغير. النوعي: أعمدة أو المخطط الدائري بزاوية $h_i\\cdot 360^{\\circ}$. المنفصل: أعمدة رفيعة فوق كل قيمة. الفئات: المدرّج التكراري بمستطيلات متلاصقة؛ وبوصل النقاط فوق مراكز الفئات نحصل على المضلّع التكراري. وإذا تغيّر مع الزمن: المخطط الخطي.',
            'Choose the graph by the kind of variable. Qualitative: a bar chart or a pie chart, with angle $h_i\\cdot 360^{\\circ}$. Discrete: thin bars over each value. In intervals: a histogram, with touching rectangles; joining the points above the class marks gives the frequency polygon. If it changes over time: a line graph.'
        ),
        cases: [
            { title: say('Sektoreak', 'Sectores', 'القطاعات', 'Pie chart'), text: say('Gelaren % 15 bizikletaz doa:', 'Un 15 % de la clase va en bici:', '15٪ من القسم يأتون بالدراجة:', '15% of the class cycle:'), math: same('$0{,}15\\cdot 360^{\\circ}=54^{\\circ}$') },
            { title: say('Histograma', 'Histograma', 'المدرّج', 'Histogram'), text: say('Laukizuzen bakoitzaren altuera haren tartearen maiztasuna da, tarteek zabalera bera badute.', 'La altura de cada rectángulo es la frecuencia de su intervalo, si todos tienen la misma amplitud.', 'ارتفاع كل مستطيل هو تكرار فئته، إذا تساوت أطوال الفئات.', 'The height of each rectangle is the frequency of its interval, if they all have the same width.') }
        ],
        examplePrompt: say('Inkesta batean galdetutako 40 lagunetatik 14 futbolzaleak dira. Zer grafiko erabiliko zenuke, eta zer angelu dagokio futbolari?', 'En una encuesta a 40 personas, 14 prefieren el fútbol. ¿Qué gráfico usarías y qué ángulo le toca al fútbol?', 'في استطلاع لـ40 شخصًا، يفضّل 14 كرة القدم. أيّ تمثيل تستعمل، وما زاوية كرة القدم؟', 'In a survey of 40 people, 14 prefer football. Which graph would you use, and what angle does football get?'),
        example: same('$\\frac{14}{40}\\cdot 360^{\\circ}=126^{\\circ}$'),
        exampleAnswer: say('Sektore-diagrama, aldagaia kualitatiboa delako: 126°.', 'Diagrama de sectores, porque la variable es cualitativa: 126°.', 'المخطط الدائري لأن المتغير نوعي: 126°.', 'A pie chart, because the variable is qualitative: 126°.')
    },
    /* ---------- 2. Centralization and position ---------- */
    central: {
        definitions: [
            {
                term: say('Maiztasun metatua', 'Frecuencia acumulada', 'التكرار المتجمّع', 'Cumulative frequency'),
                meaning: say('Balio horretaraino maiztasun guztien batura.', 'La suma de las frecuencias hasta ese valor.', 'مجموع التكرارات حتى تلك القيمة.', 'The sum of the frequencies up to that value.')
            }
        ],
        vocabulary: [
            say('batez bestekoa', 'media', 'المتوسط', 'mean'),
            say('mediana', 'mediana', 'الوسيط', 'median'),
            say('moda', 'moda', 'المنوال', 'mode'),
            say('tarte modala', 'intervalo modal', 'الفئة المنوالية', 'modal class')
        ],
        explanation: say(
            'Batez bestekoa $\\bar{x}=\\frac{\\sum f_i x_i}{N}$ da: balio bakoitza bider bere maiztasuna, batu eta datu kopuruaz zatitu; tarteetan, $x_i$ klase-marka da. Mediana erdiko datua da: bilatu $\\frac{N}{2}$ postua maiztasun metatuetan. Moda maiztasun handieneko balioa edo tartea da.',
            'La media es $\\bar{x}=\\frac{\\sum f_i x_i}{N}$: cada valor por su frecuencia, se suma y se divide entre el número de datos; en intervalos, $x_i$ es la marca de clase. La mediana es el dato central: busca la posición $\\frac{N}{2}$ en las frecuencias acumuladas. La moda es el valor, o el intervalo, de mayor frecuencia.',
            'المتوسط $\\bar{x}=\\frac{\\sum f_i x_i}{N}$: كل قيمة في تكرارها، ثم نجمع ونقسم على عدد البيانات؛ وفي الفئات $x_i$ هو مركز الفئة. والوسيط هو البيان الأوسط: ابحث عن الموقع $\\frac{N}{2}$ في التكرارات المتجمّعة. والمنوال هو القيمة أو الفئة ذات التكرار الأكبر.',
            'The mean is $\\bar{x}=\\frac{\\sum f_i x_i}{N}$: multiply each value by its frequency, add up and divide by the number of data; in intervals, $x_i$ is the class mark. The median is the middle value: look for position $\\frac{N}{2}$ in the cumulative frequencies. The mode is the value, or interval, with the highest frequency.'
        ),
        cases: [
            { title: say('Kalkulagailua', 'Calculadora', 'الآلة الحاسبة', 'Calculator'), text: say('Modu estatistikoan (SD edo STAT), balioak eta maiztasunak sartuta, $\\bar{x}$ zuzenean ematen du.', 'En modo estadístico (SD o STAT), introduciendo valores y frecuencias, da $\\bar{x}$ directamente.', 'في الوضع الإحصائي (SD أو STAT) تعطي $\\bar{x}$ مباشرة بعد إدخال القيم والتكرارات.', 'In statistics mode (SD or STAT), after entering the values and frequencies, it gives $\\bar{x}$ directly.') },
            { title: say('Tarte modala', 'Intervalo modal', 'الفئة المنوالية', 'Modal class'), text: say('Tarteetan, moda maiztasun handieneko tartea eta haren klase-marka dira.', 'En intervalos, la moda es el intervalo de mayor frecuencia y su marca de clase.', 'في الفئات، المنوال هو الفئة ذات التكرار الأكبر ومركزها.', 'In intervals, the mode is the interval with the highest frequency and its class mark.') }
        ],
        examplePrompt: say('20 ikasleren anai-arrebak: 0 → 4, 1 → 9, 2 → 5, 3 → 2. Kalkulatu batez bestekoa, mediana eta moda.', 'Hermanos de 20 alumnos: 0 → 4, 1 → 9, 2 → 5, 3 → 2. Calcula la media, la mediana y la moda.', 'عدد إخوة 20 تلميذًا: 0 ← 4، 1 ← 9، 2 ← 5، 3 ← 2. احسب المتوسط والوسيط والمنوال.', 'Siblings of 20 students: 0 → 4, 1 → 9, 2 → 5, 3 → 2. Work out the mean, the median and the mode.'),
        example: same('$\\bar{x}=\\frac{0+9+10+6}{20}=1{,}25$'),
        exampleAnswer: say('Batez bestekoa 1,25; mediana eta moda, 1: metatuak 4 eta 13 dira, eta 10. eta 11. datuak 1 dira.', 'Media 1,25; mediana y moda, 1: las acumuladas son 4 y 13, y los datos 10.º y 11.º valen 1.', 'المتوسط 1.25؛ والوسيط والمنوال 1: المتجمّعة 4 و13، والبيانان العاشر والحادي عشر يساويان 1.', 'Mean 1.25; median and mode, 1: the cumulative frequencies are 4 and 13, and the 10th and 11th values are 1.')
    },
    percentiles: {
        definitions: [
            {
                term: say('Pertzentila', 'Percentil', 'المئين', 'Percentile'),
                meaning: say('$p_k$ pertzentilak datuen % $k$ uzten du azpian.', 'El percentil $p_k$ deja por debajo el $k$ % de los datos.', 'المئين $p_k$ يترك تحته $k$ % من البيانات.', 'The percentile $p_k$ has $k$% of the data below it.')
            }
        ],
        vocabulary: [
            say('kuartila', 'cuartil', 'الربيعي', 'quartile'),
            say('postua', 'posición', 'الموقع', 'position'),
            say('ehuneko metatua', 'porcentaje acumulado', 'النسبة المتجمّعة', 'cumulative percentage')
        ],
        explanation: say(
            'Kuartilek datu ordenatuak lau zati berdinetan banatzen dituzte: $Q_1=p_{25}$, $\\text{Me}=p_{50}$ eta $Q_3=p_{75}$. Taula batean, gehitu ehuneko metatuak: $p_k$ ehuneko metatuak $k$ lehen aldiz gainditzen duen balioa da. $k$ bera bada, hartu balio horren eta hurrengoaren arteko erdia.',
            'Los cuartiles parten los datos ordenados en cuatro partes iguales: $Q_1=p_{25}$, $\\text{Me}=p_{50}$ y $Q_3=p_{75}$. En una tabla, añade los porcentajes acumulados: $p_k$ es el primer valor cuyo porcentaje acumulado supera $k$. Si coincide justo con $k$, toma el punto medio entre ese valor y el siguiente.',
            'تقسم الربيعيات البيانات المرتّبة إلى أربعة أجزاء متساوية: $Q_1=p_{25}$ و$\\text{Me}=p_{50}$ و$Q_3=p_{75}$. وفي الجدول أضف عمود النسبة المتجمّعة: $p_k$ هو أول قيمة تتجاوز نسبتها المتجمّعة $k$. وإذا ساوت $k$ تمامًا فخذ منتصف تلك القيمة والتي تليها.',
            'Quartiles split the ordered data into four equal parts: $Q_1=p_{25}$, $\\text{Me}=p_{50}$ and $Q_3=p_{75}$. In a table, add the cumulative percentages: $p_k$ is the first value whose cumulative percentage goes above $k$. If it equals $k$ exactly, take the midpoint between that value and the next.'
        ),
        cases: [
            { title: say('Zerrenda batean', 'En una lista', 'في قائمة', 'In a list'), text: say('Kalkulatu $N\\cdot\\frac{k}{100}$: hamartarra bada, hurrengo postuko datua; osoa bada, datu horren eta hurrengoaren batez bestekoa.', 'Calcula $N\\cdot\\frac{k}{100}$: si sale decimal, el dato de la posición siguiente; si es entero, la media de ese dato y el siguiente.', 'احسب $N\\cdot\\frac{k}{100}$: إذا كان عشريًا فالبيان في الموقع التالي؛ وإذا كان صحيحًا فمتوسط ذلك البيان والذي يليه.', 'Work out $N\\cdot\\frac{k}{100}$: if it is a decimal, take the value in the next position; if it is whole, the mean of that value and the next.') },
            { title: say('Irakurtzea', 'Leerlo', 'القراءة', 'Reading it'), text: say('90 pertzentilean egoteak esan nahi du % 90 batek balio txikiagoa edo berdina duela.', 'Estar en el percentil 90 significa que el 90 % tiene un valor menor o igual.', 'أن تكون في المئين 90 يعني أن 90٪ لهم قيمة أصغر أو مساوية.', 'Being in the 90th percentile means that 90% have a value less than or equal to yours.') }
        ],
        examplePrompt: say('10 korrikalariren denborak, minututan: 21, 23, 24, 24, 26, 27, 29, 30, 32, 35. Aurkitu $Q_1$ eta $p_{70}$.', 'Tiempos, en minutos, de 10 corredores: 21, 23, 24, 24, 26, 27, 29, 30, 32, 35. Halla $Q_1$ y $p_{70}$.', 'أزمنة 10 عدّائين بالدقائق: 21، 23، 24، 24، 26، 27، 29، 30، 32، 35. أوجد $Q_1$ و$p_{70}$.', 'Times, in minutes, of 10 runners: 21, 23, 24, 24, 26, 27, 29, 30, 32, 35. Find $Q_1$ and $p_{70}$.'),
        example: same('$\\begin{gathered}10\\cdot 0{,}25=2{,}5\\ \\to\\ Q_1=24\\\\ 10\\cdot 0{,}7=7\\\\ p_{70}=\\frac{29+30}{2}=29{,}5\\end{gathered}$'),
        exampleAnswer: say('$Q_1=24$, 3. datua; $p_{70}=29{,}5$, 7. eta 8. datuen erdia.', '$Q_1=24$, el 3.er dato; $p_{70}=29{,}5$, la media del 7.º y el 8.º.', '$Q_1=24$ البيان الثالث؛ و$p_{70}=29{,}5$ متوسط السابع والثامن.', '$Q_1=24$, the 3rd value; $p_{70}=29{,}5$, the mean of the 7th and 8th.')
    },
    'box-plot': {
        definitions: [
            {
                term: say('Datu atipikoa', 'Dato atípico', 'بيان شاذ', 'Outlier'),
                meaning: say('Biboteetatik kanpo geratzen den datua; izartxo batez markatzen da.', 'Un dato que queda fuera de los bigotes; se marca con un asterisco.', 'بيان يقع خارج الشاربين؛ ويُعلَّم بنجمة.', 'A value outside the whiskers; it is marked with an asterisk.')
            },
            {
                term: say('Kuartil arteko ibiltartea', 'Recorrido intercuartílico', 'المدى الربيعي', 'Interquartile range'),
                meaning: say('Kutxaren luzera: $Q_3-Q_1$.', 'La longitud de la caja: $Q_3-Q_1$.', 'طول الصندوق: $Q_3-Q_1$.', 'The length of the box: $Q_3-Q_1$.')
            }
        ],
        vocabulary: [
            say('kutxa', 'caja', 'الصندوق', 'box'),
            say('biboteak', 'bigotes', 'الشاربان', 'whiskers'),
            say('mediana', 'mediana', 'الوسيط', 'median'),
            say('homogeneoa', 'homogéneo', 'متجانس', 'homogeneous')
        ],
        explanation: say(
            'Kutxa $Q_1$ kuartiletik $Q_3$ kuartilera doa, eta marra bat du medianan. Biboteak gehienez kutxa bider 1,5 luzatzen dira alde bakoitzera, eta muga horren barruko azken datuan amaitzen dira; kanpoan geratzen dena atipikoa da. Bi talde eskala berean, kutxa estuena talde homogeneoenarena da.',
            'La caja va de $Q_1$ a $Q_3$, con una raya en la mediana. Los bigotes se alargan como mucho 1,5 veces la caja hacia cada lado y terminan en el último dato dentro de ese límite; lo que queda fuera es atípico. Con dos grupos en la misma escala, la caja más estrecha es la del grupo más homogéneo.',
            'يمتد الصندوق من $Q_1$ إلى $Q_3$ وفيه خط عند الوسيط. ويمتد الشاربان على الأكثر 1.5 مرة طول الصندوق في كل جهة، وينتهيان عند آخر بيان داخل هذا الحدّ؛ وما يبقى خارجه شاذ. ومع مجموعتين على المقياس نفسه، الصندوق الأضيق للمجموعة المتجانسة أكثر.',
            'The box goes from $Q_1$ to $Q_3$, with a line at the median. The whiskers reach at most 1.5 times the box on each side and end at the last value inside that limit; anything outside is an outlier. With two groups on the same scale, the narrower box belongs to the more homogeneous group.'
        ),
        cases: [
            { title: say('Mugak', 'Límites', 'الحدّان', 'Limits'), text: say('Biboteak ez dira hauetatik pasatzen:', 'Los bigotes no pasan de:', 'لا يتجاوز الشاربان:', 'The whiskers go no further than:'), math: same('$Q_1-1{,}5\\,(Q_3-Q_1)\\qquad Q_3+1{,}5\\,(Q_3-Q_1)$') },
            { title: say('Erdiko % 50', 'El 50 % central', 'الـ50٪ الأوسط', 'The middle 50%'), text: say('Kutxaren barruan datuen erdia dago: estua bada, bilduta daude.', 'Dentro de la caja está la mitad de los datos: si es estrecha, están agrupados.', 'داخل الصندوق نصف البيانات: إذا كان ضيقًا فهي متجمّعة.', 'Half of the data are inside the box: if it is narrow, they are close together.') }
        ],
        examplePrompt: say('Talde batean, $Q_1=40$, $\\text{Me}=46$ eta $Q_3=52$. Noraino irits daitezke biboteak? Atipikoa da 75 balioa?', 'Un grupo tiene $Q_1=40$, $\\text{Me}=46$ y $Q_3=52$. ¿Hasta dónde pueden llegar los bigotes? ¿Es atípico un dato de 75?', 'لمجموعة $Q_1=40$ و$\\text{Me}=46$ و$Q_3=52$. إلى أين يمكن أن يصل الشاربان؟ هل البيان 75 شاذ؟', 'A group has $Q_1=40$, $\\text{Me}=46$ and $Q_3=52$. How far can the whiskers reach? Is a value of 75 an outlier?'),
        example: same('$\\begin{gathered}1{,}5\\cdot(52-40)=18\\\\ 40-18=22\\qquad 52+18=70\\end{gathered}$'),
        exampleAnswer: say('Biboteak 22 eta 70 artean: 75 kanpoan dago, atipikoa da.', 'Los bigotes, entre 22 y 70: el 75 queda fuera, es atípico.', 'الشاربان بين 22 و70: البيان 75 خارجهما، فهو شاذ.', 'The whiskers, between 22 and 70: 75 is outside, so it is an outlier.')
    },
    /* ---------- 3. Spread ---------- */
    variance: {
        vocabulary: [
            say('bariantza', 'varianza', 'التباين', 'variance'),
            say('desbideratze tipikoa', 'desviación típica', 'الانحراف المعياري', 'standard deviation'),
            say('desbideratzea', 'desviación', 'الانحراف', 'deviation'),
            say('karratua', 'cuadrado', 'المربعات', 'square')
        ],
        explanation: say(
            'Desbideratzeak, $x_i-\\bar{x}$, batuta beti 0 ematen dute; horregatik jasotzen dira karratura. Bariantza karratu horien batez bestekoa da: $\\sigma^2=\\frac{\\sum (x_i-\\bar{x})^2}{N}$. Desbideratze tipikoa haren erroa da, $\\sigma=\\sqrt{\\sigma^2}$, datuen unitateetan. Zenbat eta txikiagoa $\\sigma$, orduan eta bilduago daude datuak batez bestekoaren inguruan.',
            'Las desviaciones $x_i-\\bar{x}$ sumadas dan siempre 0, por eso se elevan al cuadrado. La varianza es la media de esos cuadrados: $\\sigma^2=\\frac{\\sum (x_i-\\bar{x})^2}{N}$. La desviación típica es su raíz, $\\sigma=\\sqrt{\\sigma^2}$, en las unidades de los datos. Cuanto menor es $\\sigma$, más agrupados están los datos alrededor de la media.',
            'مجموع الانحرافات $x_i-\\bar{x}$ دائمًا 0، لذلك نربّعها. والتباين هو متوسط تلك المربعات: $\\sigma^2=\\frac{\\sum (x_i-\\bar{x})^2}{N}$. والانحراف المعياري جذره $\\sigma=\\sqrt{\\sigma^2}$، بوحدات البيانات. وكلما صغر $\\sigma$ كانت البيانات أكثر تجمّعًا حول المتوسط.',
            'The deviations $x_i-\\bar{x}$ always add up to 0, so they are squared. The variance is the mean of those squares: $\\sigma^2=\\frac{\\sum (x_i-\\bar{x})^2}{N}$. The standard deviation is its square root, $\\sigma=\\sqrt{\\sigma^2}$, in the units of the data. The smaller $\\sigma$, the closer the data are to the mean.'
        ),
        cases: [
            { title: say('Unitateak', 'Unidades', 'الوحدات', 'Units'), text: say('Datuak cm-tan badaude, bariantza cm²-tan dago, eta $\\sigma$ cm-tan.', 'Si los datos están en cm, la varianza está en cm² y $\\sigma$, en cm.', 'إذا كانت البيانات بالسنتيمتر فالتباين بالسنتيمتر المربع و$\\sigma$ بالسنتيمتر.', 'If the data are in cm, the variance is in cm² and $\\sigma$ in cm.') },
            { title: say('Konparatu', 'Comparar', 'المقارنة', 'Comparing'), text: say('Batez besteko berarekin, $\\sigma$ txikiena duen taldea homogeneoagoa da.', 'Con la misma media, el grupo de menor $\\sigma$ es más homogéneo.', 'مع المتوسط نفسه، المجموعة ذات $\\sigma$ الأصغر أكثر تجانسًا.', 'With the same mean, the group with the smaller $\\sigma$ is more homogeneous.') }
        ],
        why: {
            text: say(
                'Desbideratze positiboak eta negatiboak konpentsatu egiten dira: 2, 5 eta 8 datuetan, batez bestekoa 5 izanik, 0 ematen dute eta ez dute ezer esaten. Karratuan denak positiboak dira, eta handiek pisu handiagoa dute.',
                'Las desviaciones positivas y negativas se compensan: en 2, 5 y 8, de media 5, suman 0 y no dicen nada. Al cuadrado son todas positivas, y las grandes pesan más.',
                'تتعادل الانحرافات الموجبة والسالبة: في 2 و5 و8، ومتوسطها 5، مجموعها 0 فلا تقول شيئًا. وبعد التربيع تصير كلها موجبة، والكبيرة منها تزن أكثر.',
                'Positive and negative deviations cancel out: for 2, 5 and 8, with mean 5, they add up to 0 and say nothing. Squared, they are all positive, and the big ones count more.'
            ),
            math: same('$(2-5)+(5-5)+(8-5)=0$')
        },
        examplePrompt: say('Kalkulatu 3, 5, 6, 9 eta 12 datuen bariantza eta desbideratze tipikoa; batez bestekoa 7 da.', 'Calcula la varianza y la desviación típica de 3, 5, 6, 9 y 12, que tienen media 7.', 'احسب التباين والانحراف المعياري للبيانات 3 و5 و6 و9 و12، ومتوسطها 7.', 'Work out the variance and the standard deviation of 3, 5, 6, 9 and 12, whose mean is 7.'),
        example: same('$\\begin{gathered}16+4+1+4+25=50\\\\ \\sigma^2=\\frac{50}{5}=10\\qquad \\sigma=\\sqrt{10}\\approx 3{,}16\\end{gathered}$'),
        exampleAnswer: say('Desbideratzeak $-4$, $-2$, $-1$, $2$ eta $5$ dira: $\\sigma\\approx 3{,}16$.', 'Las desviaciones son $-4$, $-2$, $-1$, $2$ y $5$: $\\sigma\\approx 3{,}16$.', 'الانحرافات $-4$ و$-2$ و$-1$ و$2$ و$5$: $\\sigma\\approx 3{,}16$.', 'The deviations are $-4$, $-2$, $-1$, $2$ and $5$: $\\sigma\\approx 3{,}16$.')
    },
    'table-sd': {
        vocabulary: [
            say('zutabea', 'columna', 'العمود', 'column'),
            say('kalkulagailua', 'calculadora', 'الآلة الحاسبة', 'calculator'),
            say('tekla', 'tecla', 'المفتاح', 'key')
        ],
        explanation: say(
            'Taula batean laburragoa da $\\sigma^2=\\frac{\\sum f_i x_i^2}{N}-\\bar{x}^2$ erabiltzea: karratuen batez bestekoa ken batez bestekoaren karratua. Gehitu taulari $f_i x_i$ eta $f_i x_i^2$ zutabeak; tarteetan, $x_i$ klase-marka da. Modu estatistikoan, kalkulagailuak $\\sigma$ tekla batekin ematen du.',
            'En una tabla es más corto usar $\\sigma^2=\\frac{\\sum f_i x_i^2}{N}-\\bar{x}^2$: la media de los cuadrados menos el cuadrado de la media. Añade a la tabla las columnas $f_i x_i$ y $f_i x_i^2$; en intervalos, $x_i$ es la marca de clase. En modo estadístico, la calculadora da $\\sigma$ con una tecla.',
            'في الجدول من الأقصر استعمال $\\sigma^2=\\frac{\\sum f_i x_i^2}{N}-\\bar{x}^2$: متوسط المربعات ناقص مربع المتوسط. أضف إلى الجدول العمودين $f_i x_i$ و$f_i x_i^2$؛ وفي الفئات $x_i$ مركز الفئة. وفي الوضع الإحصائي تعطي الآلة الحاسبة $\\sigma$ بمفتاح واحد.',
            'In a table it is shorter to use $\\sigma^2=\\frac{\\sum f_i x_i^2}{N}-\\bar{x}^2$: the mean of the squares minus the square of the mean. Add the columns $f_i x_i$ and $f_i x_i^2$ to the table; in intervals, $x_i$ is the class mark. In statistics mode, the calculator gives $\\sigma$ with one key.'
        ),
        cases: [
            { title: say('Kontuz', 'Cuidado', 'انتبه', 'Careful'), text: say('$x_i$ bakarrik jasotzen da karratura: $f_i=3$ eta $x_i=4$ badira,', 'Solo se eleva al cuadrado $x_i$: con $f_i=3$ y $x_i=4$,', 'لا يُربَّع إلا $x_i$: مع $f_i=3$ و$x_i=4$،', 'Only $x_i$ is squared: with $f_i=3$ and $x_i=4$,'), math: same('$3\\cdot 4^{2}=48$') },
            { title: say('Kalkulagailua', 'Calculadora', 'الآلة الحاسبة', 'Calculator'), text: say('SD edo STAT moduan, sartu balioak eta maiztasunak, eta sakatu $\\sigma$ (edo $\\sigma_n$).', 'En modo SD o STAT, introduce valores y frecuencias y pulsa $\\sigma$ (o $\\sigma_n$).', 'في الوضع SD أو STAT أدخل القيم والتكرارات واضغط $\\sigma$ (أو $\\sigma_n$).', 'In SD or STAT mode, enter the values and frequencies and press $\\sigma$ (or $\\sigma_n$).') }
        ],
        examplePrompt: say('10 partidatako golak: 0 → 2, 1 → 4, 2 → 3, 3 → 1. Kalkulatu $\\bar{x}$ eta $\\sigma$.', 'Goles en 10 partidos: 0 → 2, 1 → 4, 2 → 3, 3 → 1. Calcula $\\bar{x}$ y $\\sigma$.', 'الأهداف في 10 مباريات: 0 ← 2، 1 ← 4، 2 ← 3، 3 ← 1. احسب $\\bar{x}$ و$\\sigma$.', 'Goals in 10 matches: 0 → 2, 1 → 4, 2 → 3, 3 → 1. Work out $\\bar{x}$ and $\\sigma$.'),
        example: same('$\\begin{gathered}\\bar{x}=\\frac{13}{10}=1{,}3\\\\ \\frac{25}{10}-1{,}3^{2}=0{,}81\\\\ \\sigma=\\sqrt{0{,}81}=0{,}9\\end{gathered}$'),
        exampleAnswer: say('Zutabeak: $\\sum f_i x_i=13$ eta $\\sum f_i x_i^2=25$; $\\sigma=0{,}9$ gol.', 'Columnas: $\\sum f_i x_i=13$ y $\\sum f_i x_i^2=25$; $\\sigma=0{,}9$ goles.', 'العمودان: $\\sum f_i x_i=13$ و$\\sum f_i x_i^2=25$؛ $\\sigma=0{,}9$ هدف.', 'Columns: $\\sum f_i x_i=13$ and $\\sum f_i x_i^2=25$; $\\sigma=0{,}9$ goals.')
    },
    cv: {
        definitions: [
            {
                term: say('Aldakuntza-koefizientea', 'Coeficiente de variación', 'معامل الاختلاف', 'Coefficient of variation'),
                meaning: say('Desbideratze tipikoa zati batez bestekoa: $\\text{CV}=\\frac{\\sigma}{\\bar{x}}$.', 'La desviación típica entre la media: $\\text{CV}=\\frac{\\sigma}{\\bar{x}}$.', 'الانحراف المعياري على المتوسط: $\\text{CV}=\\frac{\\sigma}{\\bar{x}}$.', 'The standard deviation divided by the mean: $\\text{CV}=\\frac{\\sigma}{\\bar{x}}$.')
            }
        ],
        vocabulary: [
            say('sakabanaketa erlatiboa', 'dispersión relativa', 'التشتت النسبي', 'relative spread'),
            say('unitaterik gabe', 'sin unidades', 'بلا وحدات', 'without units'),
            say('ehunekoa', 'porcentaje', 'نسبة مئوية', 'percentage')
        ],
        explanation: say(
            '10 g-ko desbideratzea handia da sagu batean eta txikia elefante batean. Batez besteko oso desberdinak dituzten banaketak konparatzeko, sakabanaketa erlatiboa erabiltzen da: aldakuntza-koefizientea unitaterik gabeko zenbakia da, askotan ehunekotan. CV handiagoa, sakabanaketa erlatibo handiagoa, nahiz eta haren $\\sigma$ txikiagoa izan.',
            'Una desviación de 10 g es grande en un ratón y pequeña en un elefante. Para comparar distribuciones con medias muy distintas se usa la dispersión relativa: el coeficiente de variación es un número sin unidades, a menudo en porcentaje. A mayor CV, mayor dispersión relativa, aunque su $\\sigma$ sea menor.',
            'انحراف 10 غ كبير في فأر وصغير في فيل. ولمقارنة توزيعات متوسطاتها مختلفة جدًا نستعمل التشتت النسبي: معامل الاختلاف عدد بلا وحدات، وكثيرًا ما يُعطى نسبة مئوية. كلما كبر CV كبر التشتت النسبي، وإن كان $\\sigma$ أصغر.',
            'A deviation of 10 g is large for a mouse and small for an elephant. To compare distributions with very different means, use the relative spread: the coefficient of variation is a number without units, often given as a percentage. The larger the CV, the larger the relative spread, even if its $\\sigma$ is smaller.'
        ),
        cases: [
            { title: say('Unitate desberdinak', 'Unidades distintas', 'وحدات مختلفة', 'Different units'), text: say('Altuera: $\\bar{x}=160$ cm eta $\\sigma=8$ cm. Pisua: $\\bar{x}=55$ kg eta $\\sigma=5{,}5$ kg. Pisuak aldakuntza handiagoa du:', 'Altura: $\\bar{x}=160$ cm y $\\sigma=8$ cm. Peso: $\\bar{x}=55$ kg y $\\sigma=5{,}5$ kg. El peso varía más:', 'الطول: $\\bar{x}=160$ سم و$\\sigma=8$ سم. الوزن: $\\bar{x}=55$ كغ و$\\sigma=5{,}5$ كغ. الوزن أكثر تغيرًا:', 'Height: $\\bar{x}=160$ cm and $\\sigma=8$ cm. Weight: $\\bar{x}=55$ kg and $\\sigma=5{,}5$ kg. Weight varies more:'), math: same('$\\frac{8}{160}=0{,}05\\qquad \\frac{5{,}5}{55}=0{,}1$') },
            { title: say('Ehunekotan', 'En porcentaje', 'نسبة مئوية', 'As a percentage'), text: say('Bider 100: % 5 eta % 10.', 'Por 100: el 5 % y el 10 %.', 'في 100: 5٪ و10٪.', 'Times 100: 5% and 10%.') }
        ],
        examplePrompt: say('Torloju txikiek 20 mm neurtzen dute batez beste, $\\sigma=0{,}6$ mm izanik, eta handiek 80 mm, $\\sigma=1{,}6$ mm izanik. Zeintzuek dute aldakuntza handiagoa?', 'Los tornillos pequeños miden de media 20 mm con $\\sigma=0{,}6$ mm, y los grandes, 80 mm con $\\sigma=1{,}6$ mm. ¿Cuáles varían más?', 'متوسط طول البراغي الصغيرة 20 مم مع $\\sigma=0{,}6$ مم، والكبيرة 80 مم مع $\\sigma=1{,}6$ مم. أيّها أكثر تغيرًا؟', 'Small screws are 20 mm long on average with $\\sigma=0{,}6$ mm, and large ones 80 mm with $\\sigma=1{,}6$ mm. Which vary more?'),
        example: same('$\\frac{0{,}6}{20}=0{,}03\\qquad \\frac{1{,}6}{80}=0{,}02$'),
        exampleAnswer: say('Txikiek: % 3, handien % 2 ondoan, nahiz eta haien $\\sigma$ txikiagoa izan.', 'Los pequeños: un 3 % frente a un 2 %, aunque su $\\sigma$ sea menor.', 'الصغيرة: 3٪ مقابل 2٪، وإن كان $\\sigma$ لها أصغر.', 'The small ones: 3% against 2%, even though their $\\sigma$ is smaller.')
    },
    /* ---------- 4. Two variables ---------- */
    scatter: {
        definitions: [
            {
                term: say('Puntu-hodeia', 'Nube de puntos', 'سحابة النقاط', 'Scatter plot'),
                meaning: say('$(x_i,\\,y_i)$ bikoteak planoan marraztuta; sakabanatze-diagrama ere deitzen zaio.', 'Las parejas $(x_i,\\,y_i)$ dibujadas en el plano; también se llama diagrama de dispersión.', 'الأزواج $(x_i,\\,y_i)$ مرسومة في المستوى؛ وتسمى أيضًا مخطط الانتشار.', 'The pairs $(x_i,\\,y_i)$ drawn on the plane; it is also called a scatter diagram.')
            }
        ],
        vocabulary: [
            say('bidimentsionala', 'bidimensional', 'ثنائي البعد', 'bivariate'),
            say('banakoa', 'individuo', 'فرد', 'individual'),
            say('erlazio funtzionala', 'relación funcional', 'العلاقة الدالية', 'functional relationship'),
            say('korrelazioa', 'correlación', 'ارتباط', 'correlation')
        ],
        explanation: say(
            'Banaketa bidimentsional batean, banako bakoitzari bi aldagai neurtzen zaizkio, eta bakoitza $(x_i,\\,y_i)$ puntu bat da. Hodeia marra baten inguruan biltzen bada, korrelazioa dago. Erlazio funtzionalean, $x$ aldagaiak $y$ zehazki erabakitzen du, eta puntuak marraren gainean daude; erlazio estatistikoan, hurbiltzen bakarrik dira.',
            'En una distribución bidimensional se miden dos variables a cada individuo, y cada uno es un punto $(x_i,\\,y_i)$. Si la nube se agrupa alrededor de una línea, hay correlación. En una relación funcional, $x$ determina $y$ exactamente y los puntos caen sobre la línea; en una relación estadística, solo se acercan a ella.',
            'في التوزيع ثنائي البعد يُقاس لكل فرد متغيران، وكل فرد نقطة $(x_i,\\,y_i)$. إذا تجمّعت السحابة حول خط فهناك ارتباط. وفي العلاقة الدالية يحدّد $x$ قيمة $y$ تمامًا فتقع النقاط على الخط؛ أما في العلاقة الإحصائية فتقترب منه فقط.',
            'In a bivariate distribution two variables are measured on each individual, and each one is a point $(x_i,\\,y_i)$. If the cloud clusters around a line, there is correlation. In a functional relationship, $x$ determines $y$ exactly and the points lie on the line; in a statistical relationship, they only come close to it.'
        ),
        cases: [
            { title: say('Funtzionala', 'Funcional', 'دالية', 'Functional'), text: say('Karratu baten aldea eta perimetroa:', 'El lado de un cuadrado y su perímetro:', 'ضلع مربع ومحيطه:', 'The side of a square and its perimeter:'), math: same('$y=4x$') },
            { title: say('Estatistikoa', 'Estadística', 'إحصائية', 'Statistical'), text: say('Altuera eta pisua: altuera handiagoak pisu handiagoa ekartzen du normalean, baina ez beti.', 'La altura y el peso: más altura suele llevar más peso, pero no siempre.', 'الطول والوزن: الطول الأكبر يرافقه غالبًا وزن أكبر، لكن ليس دائمًا.', 'Height and weight: being taller usually goes with weighing more, but not always.') }
        ],
        examplePrompt: say('Funtzionala ala estatistikoa? a) Gasolina-litroak eta ordaintzen dena. b) Lo-orduak eta azterketako nota.', '¿Funcional o estadística? a) Los litros de gasolina y lo que se paga. b) Las horas de sueño y la nota del examen.', 'دالية أم إحصائية؟ أ) لترات الوقود وما يُدفع. ب) ساعات النوم وعلامة الامتحان.', 'Functional or statistical? a) Litres of petrol and what you pay. b) Hours of sleep and the exam mark.'),
        example: '',
        exampleAnswer: say('a) Funtzionala: litroaren prezioak erabakitzen du zenbat ordaindu. b) Estatistikoa: eragina du, baina ez du nota erabakitzen.', 'a) Funcional: el precio del litro fija lo que pagas. b) Estadística: influye, pero no decide la nota.', 'أ) دالية: سعر اللتر يحدّد ما تدفعه. ب) إحصائية: تؤثّر لكنها لا تحدّد العلامة.', 'a) Functional: the price per litre fixes what you pay. b) Statistical: it has an effect, but it does not decide the mark.')
    },
    correlation: {
        vocabulary: [
            say('korrelazioa', 'correlación', 'الارتباط', 'correlation'),
            say('korrelazio-koefizientea', 'coeficiente de correlación', 'معامل الارتباط', 'correlation coefficient'),
            say('sendoa', 'fuerte', 'قوي', 'strong'),
            say('ahula', 'débil', 'ضعيف', 'weak')
        ],
        explanation: say(
            'Korrelazioa positiboa da bi aldagaiak batera handitzen badira, eta negatiboa bata handitzean bestea txikitzen bada; sendoa, puntuak marra batetik hurbil badaude, eta ahula, sakabanatuta badaude. Korrelazio-koefizientea, $r$, $-1$ eta $1$ artean dago: zeinuak noranzkoa ematen du, eta balio absolutuak indarra.',
            'La correlación es positiva si las dos variables crecen a la vez y negativa si una crece y la otra baja; fuerte si los puntos están cerca de una línea y débil si están dispersos. El coeficiente de correlación, $r$, está entre $-1$ y $1$: el signo da el sentido y su valor absoluto, la fuerza.',
            'يكون الارتباط موجبًا إذا ازداد المتغيران معًا، وسالبًا إذا ازداد أحدهما ونقص الآخر؛ وقويًا إذا كانت النقاط قريبة من خط، وضعيفًا إذا كانت متشتتة. ومعامل الارتباط $r$ بين $-1$ و$1$: إشارته تعطي الاتجاه وقيمته المطلقة القوة.',
            'The correlation is positive if both variables go up together and negative if one goes up while the other goes down; strong if the points are close to a line and weak if they are spread out. The correlation coefficient, $r$, is between $-1$ and $1$: its sign gives the direction and its absolute value, the strength.'
        ),
        cases: [
            { title: say('Funtzionala', 'Funcional', 'دالية', 'Functional'), text: say('Puntu guztiak zuzen batean:', 'Todos los puntos en una recta:', 'كل النقاط على مستقيم:', 'All the points on a straight line:'), math: same('$r=1\\qquad r=-1$') },
            { title: say('Ia nulua', 'Casi nula', 'شبه منعدم', 'Almost zero'), text: say('$r$ 0 zenbakitik hurbil: ez dago erlazio linealik.', '$r$ cerca de 0: no hay relación lineal.', '$r$ قريب من 0: لا علاقة خطية.', '$r$ close to 0: there is no linear relationship.') },
            { title: say('Ez da kausa', 'No es causa', 'ليس سببًا', 'Not a cause'), text: say('Zikoina-habia gehiago eta jaiotza gehiago: herria handiagoa delako, ez zikoinengatik.', 'Más nidos de cigüeña y más nacimientos: es porque el pueblo es más grande, no por las cigüeñas.', 'أعشاش لقالق أكثر ومواليد أكثر: لأن البلدة أكبر، لا بسبب اللقالق.', 'More stork nests and more births: it is because the town is bigger, not because of the storks.') }
        ],
        examplePrompt: say('Esleitu $r=0{,}05$, $r=-0{,}95$ eta $r=0{,}85$: etxebizitza baten metroak eta prezioa; tenperatura eta saldutako berokiak; oin-neurria eta nota.', 'Asigna $r=0{,}05$, $r=-0{,}95$ y $r=0{,}85$ a: metros y precio de un piso; temperatura y abrigos vendidos; número de pie y nota.', 'انسب $r=0{,}05$ و$r=-0{,}95$ و$r=0{,}85$ إلى: مساحة شقة وثمنها؛ الحرارة والمعاطف المبيعة؛ مقاس القدم والعلامة.', 'Match $r=0{,}05$, $r=-0{,}95$ and $r=0{,}85$ to: a flat\'s size and price; temperature and coats sold; shoe size and mark.'),
        example: '',
        exampleAnswer: say('$r=0{,}85$: metroak eta prezioa; $r=-0{,}95$: tenperatura eta berokiak, negatiboa eta sendoa; $r=0{,}05$: oina eta nota, erlaziorik gabe.', '$r=0{,}85$: metros y precio; $r=-0{,}95$: temperatura y abrigos, negativa y fuerte; $r=0{,}05$: pie y nota, sin relación.', '$r=0{,}85$: المساحة والثمن؛ $r=-0{,}95$: الحرارة والمعاطف، سالب وقوي؛ $r=0{,}05$: القدم والعلامة، بلا علاقة.', '$r=0{,}85$: size and price; $r=-0{,}95$: temperature and coats, negative and strong; $r=0{,}05$: shoe size and mark, no relationship.')
    },
    regression: {
        definitions: [
            {
                term: say('Estrapolazioa', 'Extrapolación', 'الاستقراء الخارجي', 'Extrapolation'),
                meaning: say('Datuen tartetik kanpo estimatzea.', 'Estimar fuera del intervalo de los datos.', 'التقدير خارج مجال البيانات.', 'Estimating outside the range of the data.')
            }
        ],
        vocabulary: [
            say('erregresio-zuzena', 'recta de regresión', 'مستقيم الانحدار', 'regression line'),
            say('estimazioa', 'estimación', 'التقدير', 'estimate'),
            say('fidagarria', 'fiable', 'موثوق', 'reliable'),
            say('joera', 'tendencia', 'الاتجاه', 'trend')
        ],
        explanation: say(
            'Erregresio-zuzena hodeiari hobekien egokitzen zaiona da, eta beti $(\\bar{x},\\,\\bar{y})$ puntutik pasatzen da. Haren ekuazioak, $\\hat{y}=mx+n$, estimatzeko balio du: ordeztu $x$ eta kalkulatu $\\hat{y}$. Estimazioa fidagarria da korrelazioa sendoa bada eta $x$ datuen tartearen barruan badago.',
            'La recta de regresión es la que mejor se ajusta a la nube y pasa siempre por $(\\bar{x},\\,\\bar{y})$. Su ecuación, $\\hat{y}=mx+n$, sirve para estimar: sustituye $x$ y calcula $\\hat{y}$. La estimación es fiable si la correlación es fuerte y $x$ está dentro del intervalo de los datos.',
            'مستقيم الانحدار هو الأكثر ملاءمة للسحابة، ويمر دائمًا بـ$(\\bar{x},\\,\\bar{y})$. ومعادلته $\\hat{y}=mx+n$ تصلح للتقدير: عوّض $x$ واحسب $\\hat{y}$. ويكون التقدير موثوقًا إذا كان الارتباط قويًا وكان $x$ داخل مجال البيانات.',
            'The regression line is the one that best fits the cloud, and it always passes through $(\\bar{x},\\,\\bar{y})$. Its equation, $\\hat{y}=mx+n$, is used to estimate: substitute $x$ and work out $\\hat{y}$. The estimate is reliable if the correlation is strong and $x$ is inside the range of the data.'
        ),
        cases: [
            { title: say('Fidagarria', 'Fiable', 'موثوق', 'Reliable'), text: say('$|r|$ 1 zenbakitik hurbil eta $x$ datuen barruan.', '$|r|$ cerca de 1 y $x$ dentro de los datos.', '$|r|$ قريب من 1 و$x$ داخل البيانات.', '$|r|$ close to 1 and $x$ inside the data.') },
            { title: say('Estrapolazioa', 'Extrapolación', 'الاستقراء الخارجي', 'Extrapolation'), text: say('Tartetik kanpo joera alda daiteke: estimazioa ez da fidagarria.', 'Fuera del intervalo, la tendencia puede cambiar: la estimación no es fiable.', 'خارج المجال قد يتغير الاتجاه: التقدير غير موثوق.', 'Outside the range, the trend may change: the estimate is not reliable.') }
        ],
        examplePrompt: say('150 eta 190 cm arteko altuerekin, pisuaren zuzena $\\hat{y}=0{,}9x-90$ da, eta $r=0{,}8$. Estimatu pisua 170 cm-rako eta 120 cm-rako.', 'Con alturas entre 150 y 190 cm, la recta del peso es $\\hat{y}=0{,}9x-90$ y $r=0{,}8$. Estima el peso para 170 cm y para 120 cm.', 'بأطوال بين 150 و190 سم، مستقيم الوزن $\\hat{y}=0{,}9x-90$ و$r=0{,}8$. قدّر الوزن عند 170 سم وعند 120 سم.', 'With heights between 150 and 190 cm, the weight line is $\\hat{y}=0{,}9x-90$ and $r=0{,}8$. Estimate the weight for 170 cm and for 120 cm.'),
        example: same('$\\begin{gathered}0{,}9\\cdot 170-90=63\\\\ 0{,}9\\cdot 120-90=18\\end{gathered}$'),
        exampleAnswer: say('170 cm-rekin, 63 kg inguru: fidagarria. 120 cm-rekin 18 kg ateratzen da, baina tartetik kanpo dago: ez da fidagarria.', 'Con 170 cm, unos 63 kg: fiable. Con 120 cm sale 18 kg, pero está fuera del intervalo: no es fiable.', 'عند 170 سم نحو 63 كغ: موثوق. وعند 120 سم نحصل على 18 كغ، لكنه خارج المجال: غير موثوق.', 'For 170 cm, about 63 kg: reliable. For 120 cm you get 18 kg, but it is outside the range: not reliable.')
    },
    /* ---------- 5. Probability ---------- */
    laplace: {
        definitions: [
            {
                term: say('Gertaera bateragarriak', 'Sucesos compatibles', 'حدثان متوافقان', 'Compatible events'),
                meaning: say('Batera gerta daitezkeenak; bateraezinak, ezin direnak.', 'Los que pueden ocurrir a la vez; los incompatibles, no.', 'حدثان يمكن أن يقعا معًا؛ والمتنافيان لا.', 'Events that can happen at the same time; incompatible ones cannot.')
            }
        ],
        vocabulary: [
            say('bildura', 'unión', 'الاتحاد', 'union'),
            say('ebakidura', 'intersección', 'التقاطع', 'intersection'),
            say('bateraezinak', 'incompatibles', 'متنافيان', 'incompatible'),
            say('aurkakoa', 'contrario', 'المعاكس', 'complementary event')
        ],
        explanation: say(
            'Esperimentu erregular batean Laplaceren erregela erabiltzen da: aldeko kasuak zati kasu posibleak. Irregularra bada, askotan errepikatzen da eta maiztasun erlatiboa hartzen da. Aurkako gertaera: $P(\\bar{A})=1-P(A)$. Bildura, $A\\cup B$, A edo B gertatzea da; bateragarriak badira, bien zatia bi aldiz zenbatzen da eta kendu egin behar da.',
            'En un experimento regular se usa la regla de Laplace: casos favorables entre casos posibles. Si es irregular, se repite muchas veces y se toma la frecuencia relativa. El suceso contrario: $P(\\bar{A})=1-P(A)$. La unión, $A\\cup B$, es que ocurra A o B; si son compatibles, la parte común se cuenta dos veces y hay que restarla.',
            'في التجربة المنتظمة نستعمل قاعدة لابلاس: عدد الحالات الملائمة على عدد الحالات الممكنة. وإذا كانت غير منتظمة نكرّرها مرات كثيرة ونأخذ التكرار النسبي. والحدث المعاكس: $P(\\bar{A})=1-P(A)$. والاتحاد $A\\cup B$ هو أن يقع A أو B؛ وإذا كانا متوافقين فالجزء المشترك يُعدّ مرتين ويجب طرحه.',
            'In a regular experiment, use Laplace\'s rule: favourable cases divided by possible cases. If it is irregular, repeat it many times and take the relative frequency. The complementary event: $P(\\bar{A})=1-P(A)$. The union, $A\\cup B$, means A or B happens; if they are compatible, the common part is counted twice and must be subtracted.'
        ),
        cases: [
            { title: say('Bateraezinak', 'Incompatibles', 'متنافيان', 'Incompatible'), text: say('Ezin dira batera gertatu:', 'No pueden ocurrir a la vez:', 'لا يقعان معًا:', 'They cannot happen together:'), math: same('$P(A\\cup B)=P(A)+P(B)$') },
            { title: say('Bateragarriak', 'Compatibles', 'متوافقان', 'Compatible'), text: say('Kendu ebakidura:', 'Resta la intersección:', 'اطرح التقاطع:', 'Subtract the intersection:'), math: same('$P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$') },
            { title: say('Maiztasuna', 'Frecuencia', 'التكرار', 'Frequency'), text: say('1000 jaurtiketatan 461 bola beltz:', 'En 1000 tiradas, 461 bolas negras:', 'في 1000 محاولة ظهرت 461 كرة سوداء:', 'In 1,000 draws, 461 black balls:'), math: same('$P\\approx 0{,}461$') }
        ],
        why: {
            text: say(
                '$P(A)$ eta $P(B)$ batzean, bietan dagoena bi aldiz zenbatzen da. 40 kartako sorta batean 10 urre eta 12 irudi daude, eta 3 urrezko irudiak dira: urreak edo irudiak 19 karta dira, ez 22.',
                'Al sumar $P(A)$ y $P(B)$, lo que está en los dos se cuenta dos veces. En una baraja de 40 hay 10 oros y 12 figuras, y 3 son figuras de oros: oros o figuras son 19 cartas, no 22.',
                'عند جمع $P(A)$ و$P(B)$ يُعدّ ما في الاثنين مرتين. في مجموعة من 40 ورقة 10 أوراق ذهب و12 صورة، و3 منها صور ذهب: الذهب أو الصور 19 ورقة لا 22.',
                'When you add $P(A)$ and $P(B)$, what is in both is counted twice. A 40-card deck has 10 coins and 12 face cards, and 3 are coin face cards: coins or face cards make 19 cards, not 22.'
            ),
            math: same('$10+12-3=19$')
        },
        examplePrompt: say('Kutxa batean 12 bola daude, 1 zenbakitik 12 zenbakira zenbakituta. Zein da zenbaki bikoiti bat edo 9 baino handiago bat ateratzeko probabilitatea?', 'Una urna tiene 12 bolas numeradas del 1 al 12. ¿Qué probabilidad hay de sacar un número par o mayor que 9?', 'في صندوق 12 كرة مرقّمة من 1 إلى 12. ما احتمال سحب عدد زوجي أو أكبر من 9؟', 'A box has 12 balls numbered from 1 to 12. What is the probability of drawing an even number or one greater than 9?'),
        example: same('$\\frac{6}{12}+\\frac{3}{12}-\\frac{2}{12}=\\frac{7}{12}$'),
        exampleAnswer: say('10 eta 12 bi gertaeretan daude: bi aldiz zenbatu dira, eta behin kendu behar dira.', 'El 10 y el 12 están en los dos sucesos: se han contado dos veces y hay que restarlos una.', '10 و12 في الحدثين: عُدّا مرتين فيجب طرحهما مرة.', '10 and 12 are in both events: they were counted twice, so subtract them once.')
    },
    compound: {
        vocabulary: [
            say('zuhaitz-diagrama', 'diagrama de árbol', 'المخطط الشجري', 'tree diagram'),
            say('adarra', 'rama', 'فرع', 'branch'),
            say('bidea', 'camino', 'مسار', 'path'),
            say('itzuli gabe', 'sin devolver', 'دون إرجاع', 'without replacement')
        ],
        explanation: say(
            'Zuhaitz-diagrama batean, adar bakoitzak bere probabilitatea darama. Bide batena haren adarren biderkadura da, eta gertaera batena, haren bideen batura. Itzuli gabe, bigarren adarra aldatu egiten da: probabilitate baldintzatua da, $P(B/A)$. «Gutxienez bat» kalkulatzeko, erosoagoa da aurkakoa: bat ken bat ere ez izateko probabilitatea.',
            'En un diagrama de árbol, cada rama lleva su probabilidad. La de un camino es el producto de sus ramas, y la de un suceso, la suma de sus caminos. Sin devolver, la segunda rama cambia: es una probabilidad condicionada, $P(B/A)$. Para «al menos uno», es más cómodo usar el contrario: uno menos la probabilidad de ninguno.',
            'في المخطط الشجري يحمل كل فرع احتماله. واحتمال مسار هو حاصل ضرب فروعه، واحتمال حدث هو مجموع مساراته. ودون إرجاع يتغير الفرع الثاني: إنه احتمال مشروط $P(B/A)$. ولحساب «على الأقل واحد» يكون المعاكس أيسر: واحد ناقص احتمال «لا شيء».',
            'In a tree diagram, each branch carries its probability. The probability of a path is the product of its branches, and that of an event, the sum of its paths. Without replacement, the second branch changes: it is a conditional probability, $P(B/A)$. For «at least one», it is easier to use the complement: one minus the probability of none.'
        ),
        cases: [
            { title: say('Independenteak', 'Independientes', 'مستقلة', 'Independent'), text: say('Bi dado, edo itzultzen den bola:', 'Dos dados, o una bola que se devuelve:', 'نردان، أو كرة تُعاد:', 'Two dice, or a ball that is put back:'), math: same('$P(A\\cap B)=P(A)\\cdot P(B)$') },
            { title: say('Dependenteak', 'Dependientes', 'تابعة', 'Dependent'), text: say('Itzuli gabe:', 'Sin devolver:', 'دون إرجاع:', 'Without replacement:'), math: same('$P(A\\cap B)=P(A)\\cdot P(B/A)$') }
        ],
        why: {
            text: say(
                'Lehen adarra aldien erdian gertatzen bada eta, horietatik, bigarrena herenean, bide osoa erdiaren herenean gertatzen da: zatiki baten zatikia biderkadura bat da.',
                'Si la primera rama ocurre la mitad de las veces y, de esas, la segunda ocurre un tercio, el camino completo ocurre un tercio de la mitad: la fracción de una fracción es un producto.',
                'إذا وقع الفرع الأول في نصف المرات، ووقع الثاني في ثلث تلك المرات، فالمسار كله يقع في ثلث النصف: كسر من كسر هو حاصل ضرب.',
                'If the first branch happens half of the time and, of those, the second happens a third of the time, the whole path happens a third of a half: a fraction of a fraction is a product.'
            ),
            math: same('$\\frac{1}{2}\\cdot\\frac{1}{3}=\\frac{1}{6}$')
        },
        examplePrompt: say('Poltsa batean 5 bola gorri eta 3 urdin daude. Bi ateratzen dira, itzuli gabe. Zein da gutxienez bat urdina izateko probabilitatea?', 'Una bolsa tiene 5 bolas rojas y 3 azules. Se sacan dos sin devolver. ¿Qué probabilidad hay de que al menos una sea azul?', 'في كيس 5 كرات حمراء و3 زرقاء. تُسحب كرتان دون إرجاع. ما احتمال أن تكون واحدة على الأقل زرقاء؟', 'A bag has 5 red balls and 3 blue ones. Two are drawn without replacement. What is the probability that at least one is blue?'),
        example: same('$\\begin{gathered}\\frac{5}{8}\\cdot\\frac{4}{7}=\\frac{5}{14}\\\\ 1-\\frac{5}{14}=\\frac{9}{14}\\end{gathered}$'),
        exampleAnswer: say('$\\frac{9}{14}$: laburragoa da aurkakoarekin, «urdinik ez».', '$\\frac{9}{14}$: es más corto con el contrario, «ninguna azul».', '$\\frac{9}{14}$: الطريق أقصر بالمعاكس «لا زرقاء».', '$\\frac{9}{14}$: it is shorter with the complement, «no blue».')
    },
    contingency: {
        definitions: [
            {
                term: say('Probabilitate baldintzatua', 'Probabilidad condicionada', 'الاحتمال المشروط', 'Conditional probability'),
                meaning: say('$P(A/B)$: A gertatzeko probabilitatea, B gertatu dela jakinda.', '$P(A/B)$: la de A sabiendo que ha ocurrido B.', '$P(A/B)$: احتمال A علمًا أن B قد وقع.', '$P(A/B)$: the probability of A given that B has happened.')
            }
        ],
        vocabulary: [
            say('kontingentzia-taula', 'tabla de contingencia', 'جدول التوافق', 'contingency table'),
            say('guztizkoa', 'total', 'المجموع', 'total'),
            say('gelaxka', 'casilla', 'خانة', 'cell'),
            say('errenkada', 'fila', 'سطر', 'row')
        ],
        explanation: say(
            'Kontingentzia-taula batek populazio bat bi ezaugarriren arabera sailkatzen du, guztizkoen errenkada eta zutabe batekin. Soila: guztizko bat zati guztizko nagusia. Batera gertatzekoa: gelaxka bat zati guztizko nagusia. Baldintzatua, $P(A/B)$: B dela jakinda, kasu posibleak B-renak bakarrik dira. Kontuz ordenarekin: $P(A/B)$ eta $P(B/A)$ desberdinak dira.',
            'Una tabla de contingencia clasifica una población según dos características, con una fila y una columna de totales. Simple: un total entre el total general. Conjunta: una casilla entre el total general. Condicionada, $P(A/B)$: sabiendo que es B, los casos posibles son solo los de B. Cuidado con el orden: $P(A/B)$ y $P(B/A)$ son distintas.',
            'يصنّف جدول التوافق مجتمعًا حسب خاصيتين، وفيه سطر وعمود للمجاميع. البسيط: مجموع على المجموع العام. والمشترك: خانة على المجموع العام. والمشروط $P(A/B)$: علمًا أنه B، الحالات الممكنة هي حالات B فقط. انتبه إلى الترتيب: $P(A/B)$ و$P(B/A)$ مختلفان.',
            'A contingency table sorts a population by two features, with a row and a column of totals. Simple: a total divided by the grand total. Joint: a cell divided by the grand total. Conditional, $P(A/B)$: given that it is B, the possible cases are only those of B. Mind the order: $P(A/B)$ and $P(B/A)$ are different.'
        ),
        cases: [
            { title: say('Soila', 'Simple', 'البسيط', 'Simple'), text: say('Errenkada edo zutabe baten guztizkoa, guztizko nagusiaz zatituta.', 'El total de una fila o columna, dividido entre el total general.', 'مجموع سطر أو عمود مقسومًا على المجموع العام.', 'The total of a row or column, divided by the grand total.') },
            { title: say('Baldintzatua', 'Condicionada', 'المشروط', 'Conditional'), text: say('Gelaxka, baldintzaren guztizkoaz zatituta: errenkada edo zutabe hori bakarrik.', 'La casilla, dividida entre el total de la condición: solo esa fila o columna.', 'الخانة مقسومة على مجموع الشرط: ذلك السطر أو العمود فقط.', 'The cell, divided by the total of the condition: only that row or column.') }
        ],
        examplePrompt: say('80 bazkideko klub batean, 50 futbolean aritzen dira, eta haietatik 20 tenisean ere bai. Zein da futbolari batek tenisean aritzeko probabilitatea?', 'En un club de 80 socios, 50 juegan al fútbol y 20 de ellos también al tenis. ¿Qué probabilidad hay de que un futbolista juegue al tenis?', 'في نادٍ من 80 عضوًا يلعب 50 كرة القدم، و20 منهم يلعبون التنس أيضًا. ما احتمال أن يلعب لاعب كرة القدم التنس؟', 'In a club of 80 members, 50 play football and 20 of them also play tennis. What is the probability that a footballer plays tennis?'),
        example: same('$\\frac{20}{50}=0{,}4$'),
        exampleAnswer: say('0,4: kasu posibleak futbolean aritzen diren 50 bazkideak bakarrik dira; batera gertatzekoa $\\frac{20}{80}=0{,}25$ litzateke.', '0,4: los casos posibles son solo los 50 que juegan al fútbol; la conjunta sería $\\frac{20}{80}=0{,}25$.', '0.4: الحالات الممكنة هي الأعضاء الـ50 الذين يلعبون كرة القدم فقط؛ والمشترك $\\frac{20}{80}=0{,}25$.', '0.4: the possible cases are only the 50 who play football; the joint one would be $\\frac{20}{80}=0{,}25$.')
    }
}
