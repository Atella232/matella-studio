import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import {
    BoxPlotFigure,
    CumulativeFigure,
    DeviationFigure,
    DoubleTableFigure,
    EventsFigure,
    GroupedFigure,
    HistogramFigure,
    MeanTableFigure,
    MedianTableFigure,
    MisleadingFigure,
    PieFigure,
    QuartilesFigure,
    SampleFigure,
    SymmetryFigure,
    TreeFigure
} from './figures'
import { statisticsLessonChecks, type StatisticsTopicId } from './lessonChecks'
import { statisticsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Estatistika eta probabilitatea · 2. DBH — stages and lessons, following
   Anaya 2.º ESO units 14 (Estadística: tables and graphs, centralization,
   dispersion, position, double-entry tables) and 15 (Azar y probabilidad:
   events, regular and irregular devices, trees and tables), and Santillana
   2.º ESO unit 14 (cumulative frequencies, graphs, parameters, Laplace).
   It builds on the 1. DBH unit (frequency tables, bar and pie charts, mean,
   median, mode, range and Laplace) and goes further: cumulative and grouped
   frequencies, histograms, parameters from a table, mean deviation,
   quartiles and box plots, complementary events, trees and double tables.
   ========================================================================== */

export type StatisticsStageId = 'tables' | 'graphs' | 'centre' | 'spread' | 'chance'

export const statisticsStages: UnitStage[] = [
    { id: 'tables', tone: 'blue', title: { eu: 'Datuak eta taulak', es: 'Datos y tablas', en: 'Data and tables', ar: 'البيانات والجداول' } },
    { id: 'graphs', tone: 'violet', title: { eu: 'Grafikoak', es: 'Gráficos', en: 'Charts', ar: 'التمثيلات البيانية' } },
    { id: 'centre', tone: 'mustard', title: { eu: 'Zentralizazio-parametroak', es: 'Parámetros de centralización', en: 'Measures of central tendency', ar: 'مقاييس النزعة المركزية' } },
    { id: 'spread', tone: 'coral', title: { eu: 'Sakabanaketa eta posizioa', es: 'Dispersión y posición', en: 'Spread and position', ar: 'التشتت والموقع' } },
    { id: 'chance', tone: 'green', title: { eu: 'Zoria eta probabilitatea', es: 'Azar y probabilidad', en: 'Chance and probability', ar: 'الصدفة والاحتمال' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Data and tables ---------- */
    {
        id: 'sample',
        stage: 'tables',
        title: say('Lagina eta aldagaiak', 'Muestra y variables', 'العيّنة والمتغيرات', 'Sample and variables'),
        goal: say('Noiz behar den lagin bat erabakitzea, lagin adierazgarria aukeratzea eta aldagaiak sailkatzea.', 'Decidir cuándo hace falta una muestra, elegir una muestra representativa y clasificar las variables.', 'تقرير متى نحتاج إلى عيّنة، واختيار عيّنة ممثِّلة، وتصنيف المتغيرات.', 'Decide when a sample is needed, choose a representative sample and classify the variables.'),
        stepsKind: 'facts',
        steps: [
            { title: say('Populazio osoa', 'Toda la población', 'المجتمع كله', 'The whole population'), text: say('Taldea txikia denean: klaseko 25 ikasleak, diskoko abestiak.', 'Cuando el grupo es pequeño: los 25 alumnos de la clase, las canciones de un disco.', 'عندما تكون المجموعة صغيرة: تلاميذ القسم الخمسة والعشرون، أغاني ألبوم.', 'When the group is small: the 25 students in the class, the songs on an album.') },
            { title: say('Lagina', 'Muestra', 'العيّنة', 'Sample'), text: say('Taldea handia denean: hiriko 250 biztanle, zoriz aukeratuta.', 'Cuando el grupo es grande: 250 habitantes de la ciudad, elegidos al azar.', 'عندما تكون المجموعة كبيرة: 250 من سكان المدينة مختارون عشوائيًا.', 'When the group is large: 250 residents of the city, chosen at random.') },
            { title: say('Lagin alboratua', 'Muestra sesgada', 'عيّنة متحيّزة', 'Biased sample'), text: say('Talde bakar bati galdetzea: emaitzak ez du populazioa ordezkatzen.', 'Preguntar a un solo grupo: el resultado no representa a la población.', 'سؤال فئة واحدة فقط: لا تمثّل النتيجة المجتمع.', 'Asking just one group: the result does not represent the population.') }
        ],
        takeaway: say('Lagina adierazgarria izan behar da: zoriz eta talde guztiekin.', 'La muestra tiene que ser representativa: al azar y con todos los grupos.', 'يجب أن تكون العيّنة ممثِّلة: عشوائية ومن كل الفئات.', 'The sample must be representative: chosen at random and including all the groups.'),
        figure: (language) => <SampleFigure language={language} />
    },
    {
        id: 'cumulative',
        stage: 'tables',
        needs: [{ unit: 'dbh1/estadistica', topic: 'frequencies', title: { eu: 'Maiztasun absolutua eta erlatiboa', es: 'Frecuencia absoluta y relativa', en: 'Absolute and relative frequency', ar: 'التكرار المطلق والنسبي' } }],
        figureAfterSteps: true,
        title: say('Maiztasun metatuak', 'Frecuencias acumuladas', 'التكرارات المتجمّعة', 'Cumulative frequencies'),
        goal: say('Maiztasun absolutu eta erlatibo metatuak kalkulatzea eta «zenbat gutxiago» galderei erantzutea.', 'Calcular las frecuencias absolutas y relativas acumuladas y responder preguntas de «cuántos como mucho».', 'حساب التكرارات المطلقة والنسبية المتجمّعة والإجابة عن أسئلة «كم على الأكثر».', 'Calculate the cumulative absolute and relative frequencies and answer “at most how many” questions.'),
        problem: say('Udan irakurritako liburuak: 0 liburu → 3 ikasle, 1 → 6, 2 → 5, 3 → 4, 4 → 2. Kalkulatu $F_i$ eta $H_i$.', 'Libros leídos en verano: 0 libros → 3 alumnos, 1 → 6, 2 → 5, 3 → 4, 4 → 2. Calcula $F_i$ y $H_i$.', 'الكتب المقروءة في الصيف: 0 كتب ← 3 تلاميذ، 1 ← 6، 2 ← 5، 3 ← 4، 4 ← 2. احسب $F_i$ و$H_i$.', 'Books read in summer: 0 books → 3 students, 1 → 6, 2 → 5, 3 → 4, 4 → 2. Calculate $F_i$ and $H_i$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Metatu: aurreko $F_i$ gehi errenkada honetako $f_i$.', 'Acumula: la $F_i$ anterior más la $f_i$ de esta fila.', 'اجمع تراكميًا: $F_i$ السابق زائد $f_i$ هذا السطر.', 'Add up: the previous $F_i$ plus the $f_i$ of this row.'), math: same('$3,\\ 9,\\ 14,\\ 18,\\ 20$') },
            { text: say('Azkena $N$ da: 20 ikasle.', 'La última es $N$: 20 alumnos.', 'الأخير هو $N$: 20 تلميذًا.', 'The last one is $N$: 20 students.') },
            { text: say('Zatitu bakoitza 20z.', 'Divide cada una entre 20.', 'اقسم كلًّا منها على 20.', 'Divide each one by 20.'), math: same('$0{,}15,\\ 0{,}45,\\ 0{,}7,\\ 0{,}9,\\ 1$') }
        ],
        takeaway: say('Metatua: zenbat datu dauden balio horretaraino. Azkena datu kopurua da; erlatibo metatuaren azkena, 1.', 'Acumulada: cuántos datos hay hasta ese valor. La última es el número de datos; la última relativa acumulada, 1.', 'المتجمّع: كم بيانًا حتى تلك القيمة. الأخير هو عدد البيانات، وآخر متجمّع نسبي هو 1.', 'Cumulative: how many data values there are up to that value. The last one is the number of data values; the last cumulative relative frequency is 1.'),
        figure: (language) => <CumulativeFigure language={language} />
    },
    {
        id: 'grouped',
        stage: 'tables',
        figureAfterSteps: true,
        title: say('Datu multzokatuak', 'Datos agrupados', 'البيانات المبوّبة', 'Grouped data'),
        goal: say('Datu asko edo jarraituak tartetan multzokatzea eta klase-markak kalkulatzea.', 'Agrupar en intervalos muchos datos o datos continuos y calcular las marcas de clase.', 'تبويب البيانات الكثيرة أو المتصلة في فئات وحساب مراكز الفئات.', 'Group many data values or continuous data into intervals and calculate the class marks.'),
        problem: say('30 ikasleren altuerak (cm) tartetan: $[140,150)$ 3, $[150,160)$ 9, $[160,170)$ 12, $[170,180)$ 6. Zein dira klase-markak? Zenbat ikaslek neurtzen dute 160 cm baino gutxiago?', 'Alturas (cm) de 30 alumnos en intervalos: $[140,150)$ 3, $[150,160)$ 9, $[160,170)$ 12, $[170,180)$ 6. ¿Cuáles son las marcas de clase? ¿Cuántos miden menos de 160 cm?', 'أطوال 30 تلميذًا (سم) في فئات: $[140,150)$ 3، $[150,160)$ 9، $[160,170)$ 12، $[170,180)$ 6. ما مراكز الفئات؟ كم تلميذًا طوله أقل من 160 سم؟', 'Heights (cm) of 30 students in intervals: $[140,150)$ 3, $[150,160)$ 9, $[160,170)$ 12, $[170,180)$ 6. What are the class marks? How many are less than 160 cm tall?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Klase-marka: muturren erdia.', 'Marca de clase: la mitad de los extremos.', 'مركز الفئة: نصف مجموع الطرفين.', 'Class mark: half the sum of the two ends.'), math: same('$\\frac{140+150}{2}=145$') },
            { text: say('Besteak, 10na aurrera.', 'Las demás, de 10 en 10.', 'والبقية بخطوة 10.', 'The others go up in steps of 10.'), math: same('$145,\\ 155,\\ 165,\\ 175$') },
            { text: say('160 baino gutxiago: lehen bi tarteak.', 'Menos de 160: los dos primeros intervalos.', 'أقل من 160: الفئتان الأوليان.', 'Under 160: the first two intervals.'), math: same('$3+9=12$') }
        ],
        takeaway: say('Tarte batean beheko muturra sartzen da eta goikoa ez. Klase-marka: bi muturren erdia.', 'En un intervalo entra el extremo inferior y no el superior. Marca de clase: la mitad de los dos extremos.', 'في الفئة يدخل الطرف الأدنى ولا يدخل الأعلى. مركز الفئة: منتصف الطرفين.', 'An interval includes the lower end but not the upper end. Class mark: half the sum of the two ends.'),
        figure: (language) => <GroupedFigure language={language} />
    },

    /* ---------- 2. Graphs ---------- */
    {
        id: 'histogram',
        stage: 'graphs',
        title: say('Histograma eta maiztasun-poligonoa', 'Histograma y polígono de frecuencias', 'المدرّج التكراري والمضلّع التكراري', 'Histogram and frequency polygon'),
        goal: say('Datu multzokatuen histograma eta maiztasun-poligonoa egitea eta irakurtzea.', 'Construir y leer el histograma y el polígono de frecuencias de datos agrupados.', 'بناء المدرّج التكراري والمضلّع التكراري للبيانات المبوّبة وقراءتهما.', 'Build and read the histogram and the frequency polygon of grouped data.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ardatz horizontalean, tarteen mugak (140, 150, 160…); bertikalean, maiztasunak.', 'En el eje horizontal, los límites de los intervalos (140, 150, 160…); en el vertical, las frecuencias.', 'على المحور الأفقي حدود الفئات (140، 150، 160…)، وعلى الرأسي التكرارات.', 'On the horizontal axis, the interval limits (140, 150, 160…); on the vertical axis, the frequencies.') },
            { text: say('Tarte bakoitzean, bere maiztasunaren altuerako laukizuzena, hutsunerik gabe.', 'En cada intervalo, un rectángulo con la altura de su frecuencia, sin huecos.', 'في كل فئة مستطيل ارتفاعه تكرارها، بلا فراغات.', 'For each interval, a rectangle with the height of its frequency, with no gaps.'), math: same('$3,\\ 9,\\ 12,\\ 6$') },
            { text: say('Poligonoa: lotu klase-marken gaineko puntuak.', 'Polígono: une los puntos sobre las marcas de clase.', 'المضلّع: صِل النقاط فوق مراكز الفئات.', 'Polygon: join the points above the class marks.'), math: same('$(145,3),\\ (155,9)\\ldots$') }
        ],
        takeaway: say('Histograma: laukizuzen itsatsiak. Poligonoa: klase-marken gaineko puntuak lotuta.', 'Histograma: rectángulos pegados. Polígono: los puntos sobre las marcas de clase unidos.', 'المدرّج: مستطيلات متلاصقة. المضلّع: نقاط فوق مراكز الفئات موصولة.', 'Histogram: touching rectangles. Polygon: the points above the class marks, joined.'),
        figure: (language) => <HistogramFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'pie',
        stage: 'graphs',
        needs: [{ unit: 'dbh2/proporcionalidad', topic: 'percent-forms', title: { eu: 'Ehunekoa hamartar gisa', es: 'El porcentaje como decimal', en: 'Percentages as decimals', ar: 'النسبة المئوية عددًا عشريًا' } }],
        figureAfterSteps: true,
        title: say('Sektore-diagramak eta ehunekoak', 'Diagramas de sectores y porcentajes', 'المخططات الدائرية والنسب المئوية', 'Pie charts and percentages'),
        goal: say('Ehunekoetatik angeluak kalkulatzea eta, alderantziz, angelu batetik zenbat datu diren jakitea.', 'Calcular ángulos a partir de porcentajes y, al revés, saber cuántos datos son a partir de un ángulo.', 'حساب الزوايا انطلاقًا من النسب المئوية، وبالعكس معرفة عدد البيانات انطلاقًا من زاوية.', 'Calculate angles from percentages and, the other way round, find how many data values an angle represents.'),
        problem: say('40 ikasleri nola etortzen diren galdetu zaie: % 45 oinez, % 30 autobusez, % 15 autoz eta % 10 bizikletaz. Kalkulatu angeluak. Zenbat etortzen dira autobusez?', 'Se ha preguntado a 40 alumnos cómo vienen: 45 % a pie, 30 % en autobús, 15 % en coche y 10 % en bici. Calcula los ángulos. ¿Cuántos vienen en autobús?', 'سُئل 40 تلميذًا كيف يأتون: 45 % مشيًا، و30 % بالحافلة، و15 % بالسيارة، و10 % بالدراجة. احسب الزوايا. كم تلميذًا يأتي بالحافلة؟', '40 students were asked how they come to school: 45% on foot, 30% by bus, 15% by car and 10% by bike. Calculate the angles. How many come by bus?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ehuneko bakoitza bider 3,6°; autobusa: 108°.', 'Cada porcentaje por 3,6°; autobús: 108°.', 'كل نسبة في 3.6°؛ الحافلة: 108°.', 'Multiply each percentage by 3.6°; bus: 108°.'), math: same('$45\\cdot 3{,}6=162$') },
            { text: say('Besteak: 54° eta 36°. Egiaztatu batura.', 'Los demás: 54° y 36°. Comprueba la suma.', 'والباقيتان: 54° و36°. تحقّق من المجموع.', 'The others: 54° and 36°. Check the total.'), math: same('$162+108+54+36=360$') },
            { text: say('Autobusez: 40ren % 30.', 'En autobús: el 30 % de 40.', 'بالحافلة: 30 % من 40.', 'By bus: 30% of 40.'), math: same('$0{,}3\\cdot 40=12$') }
        ],
        takeaway: say('% 1 = 3,6°. Angelua zati 360 maiztasun erlatiboa da.', '1 % = 3,6°. El ángulo entre 360 es la frecuencia relativa.', '1 % = 3.6°. والزاوية على 360 هي التكرار النسبي.', '1% = 3.6°. The angle divided by 360 is the relative frequency.'),
        figure: (language) => <PieFigure language={language} />
    },
    {
        id: 'misleading',
        stage: 'graphs',
        title: say('Grafikoak irakurtzen: tranpak', 'Leer gráficos: trampas', 'قراءة التمثيلات: الفخاخ', 'Reading charts: traps'),
        goal: say('Grafiko engainagarriak ezagutzea eta grafiko bati buruzko galderak arretaz erantzutea.', 'Reconocer gráficos engañosos y responder con cuidado preguntas sobre un gráfico.', 'التعرّف إلى التمثيلات المضلِّلة والإجابة بعناية عن أسئلة حول تمثيل بياني.', 'Recognise misleading charts and answer questions about a chart carefully.'),
        stepsKind: 'facts',
        steps: [
            { title: say('Ardatza ez da 0tik hasten', 'El eje no empieza en 0', 'المحور لا يبدأ من 0', 'The axis does not start at 0'), text: say('3000tik 3200era igotzea % 7 besterik ez da, baina ardatza 2900etik hasten bada, barra hirukoitza dirudi.', 'Pasar de 3000 a 3200 es solo un 7 %, pero si el eje empieza en 2900, la barra parece el triple.', 'الانتقال من 3000 إلى 3200 زيادة 7 % فقط، لكن إذا بدأ المحور من 2900 بدا العمود ثلاثة أضعاف.', 'Going from 3000 to 3200 is only 7%, but if the axis starts at 2900, the bar looks three times as tall.'), math: same('$\\frac{200}{3000}\\approx 0{,}07$') },
            { title: say('Irudi handituak', 'Dibujos agrandados', 'رسوم مكبَّرة', 'Enlarged drawings'), text: say('Bidoi baten altuera bikoizten bada, bolumena 8 aldiz handiagoa dirudi.', 'Si se duplica la altura de un bidón, su volumen parece 8 veces mayor.', 'إذا ضوعف ارتفاع برميل بدا حجمه أكبر بثماني مرات.', 'If you double the height of a barrel, its volume looks 8 times bigger.'), math: same('$2^{3}=8$') },
            { title: say('Ehunekoen batura', 'Suma de porcentajes', 'مجموع النسب', 'Adding up percentages'), text: say('Sektoreek % 38, % 22 eta % 40 badute, ondo dago: 100.', 'Si los sectores son 38 %, 22 % y 40 %, está bien: 100.', 'إذا كانت القطاعات 38 % و22 % و40 % فهو صحيح: 100.', 'If the sectors are 38%, 22% and 40%, that is fine: it adds up to 100.'), math: same('$38+22+40=100$') }
        ],
        takeaway: say('Begiratu beti ardatzak eta eskala; kalkulatu benetako aldaketa.', 'Mira siempre los ejes y la escala; calcula el cambio real.', 'انظر دائمًا إلى المحاور والمقياس، واحسب التغيّر الحقيقي.', 'Always look at the axes and the scale; work out the real change.'),
        figure: (language) => <MisleadingFigure language={language} />
    },

    /* ---------- 3. Centralization ---------- */
    {
        id: 'mean-table',
        stage: 'centre',
        needs: [{ unit: 'dbh1/estadistica', topic: 'mean', title: { eu: 'Batez bestekoa', es: 'La media', en: 'The mean', ar: 'المتوسط الحسابي' } }],
        figureAfterSteps: true,
        title: say('Batez bestekoa taula batetik', 'La media desde una tabla', 'المتوسط من جدول', 'The mean from a table'),
        goal: say('Maiztasun-taula baten batez bestekoa kalkulatzea, datu multzokatuekin ere bai.', 'Calcular la media de una tabla de frecuencias, también con datos agrupados.', 'حساب متوسط جدول تكرارات، وكذلك للبيانات المبوّبة.', 'Calculate the mean from a frequency table, including grouped data.'),
        problem: say('Kalkulatu irakurritako liburuen batez bestekoa: 0 → 3, 1 → 6, 2 → 5, 3 → 4, 4 → 2.', 'Calcula la media de libros leídos: 0 → 3, 1 → 6, 2 → 5, 3 → 4, 4 → 2.', 'احسب متوسط الكتب المقروءة: 0 ← 3، 1 ← 6، 2 ← 5، 3 ← 4، 4 ← 2.', 'Calculate the mean number of books read: 0 → 3, 1 → 6, 2 → 5, 3 → 4, 4 → 2.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zutabe berria: $x_i\\cdot f_i$.', 'Columna nueva: $x_i\\cdot f_i$.', 'عمود جديد: $x_i\\cdot f_i$.', 'New column: $x_i\\cdot f_i$.'), math: same('$0,\\ 6,\\ 10,\\ 12,\\ 8$') },
            { text: say('Batu zutabea.', 'Suma la columna.', 'اجمع العمود.', 'Add up the column.'), math: same('$0+6+10+12+8=36$') },
            { text: say('Zatitu $N=20$-z.', 'Divide entre $N=20$.', 'اقسم على $N=20$.', 'Divide by $N=20$.'), math: same('$\\bar{x}=\\frac{36}{20}=1{,}8$') }
        ],
        takeaway: say('Batez bestekoa: balio bakoitza bider bere maiztasuna, batu eta zati datu kopurua. Multzokatuta, klase-markekin.', 'Media: cada valor por su frecuencia, suma y divide entre el número de datos. Agrupados, con las marcas de clase.', 'المتوسط: كل قيمة في تكرارها، ثم الجمع والقسمة على عدد البيانات. وفي المبوّبة بمراكز الفئات.', 'Mean: multiply each value by its frequency, add up and divide by the number of data values. Grouped data: use the class marks.'),
        figure: (language) => <MeanTableFigure language={language} />
    },
    {
        id: 'median-table',
        stage: 'centre',
        needs: [{ unit: 'dbh1/estadistica', topic: 'median-mode', title: { eu: 'Mediana eta moda', es: 'Mediana y moda', en: 'Median and mode', ar: 'الوسيط والمنوال' } }],
        figureAfterSteps: true,
        title: say('Mediana eta moda taula batetik', 'Mediana y moda desde una tabla', 'الوسيط والمنوال من جدول', 'Median and mode from a table'),
        goal: say('Maiztasun metatuak erabiliz mediana aurkitzea eta moda (edo modak) ezagutzea.', 'Encontrar la mediana con las frecuencias acumuladas y reconocer la moda (o las modas).', 'إيجاد الوسيط بالتكرارات المتجمّعة والتعرّف إلى المنوال (أو المنوالات).', 'Find the median using the cumulative frequencies and recognise the mode (or modes).'),
        problem: say('Familia bakoitzeko seme-alabak: 0 → 2, 1 → 5, 2 → 8, 3 → 6, 4 → 3 ($N=24$). Aurkitu mediana eta moda.', 'Hijos por familia: 0 → 2, 1 → 5, 2 → 8, 3 → 6, 4 → 3 ($N=24$). Halla la mediana y la moda.', 'عدد الأبناء في كل أسرة: 0 ← 2، 1 ← 5، 2 ← 8، 3 ← 6، 4 ← 3 ($N=24$). أوجد الوسيط والمنوال.', 'Children per family: 0 → 2, 1 → 5, 2 → 8, 3 → 6, 4 → 3 ($N=24$). Find the median and the mode.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Maiztasun metatuak.', 'Frecuencias acumuladas.', 'التكرارات المتجمّعة.', 'Cumulative frequencies.'), math: same('$2,\\ 7,\\ 15,\\ 21,\\ 24$') },
            { text: say('$N$ bikoitia: 12. eta 13. datuak. Biak $F_i=15$-en barruan: 2.', '$N$ par: datos 12.º y 13.º. Los dos caen dentro de $F_i=15$: 2.', '$N$ زوجي: البيانان 12 و13. كلاهما ضمن $F_i=15$: أي 2.', '$N$ is even: the 12th and 13th values. Both fall within $F_i=15$: 2.'), math: same('$\\frac{2+2}{2}=2$') },
            { text: say('Moda: maiztasun handiena, 8.', 'Moda: la mayor frecuencia, 8.', 'المنوال: أكبر تكرار، 8.', 'Mode: the highest frequency, 8.'), math: say('$\\text{Mo}=2$', '$\\text{Mo}=2$', '$\\text{Mo}=2$', '$\\text{Mo}=2$') }
        ],
        takeaway: say('Mediana: kalkulatu erdiko postua eta bilatu metatuetan. Moda: maiztasun handiena duen balioa.', 'Mediana: calcula la posición central y búscala en las acumuladas. Moda: el valor de mayor frecuencia.', 'الوسيط: احسب الموقع الأوسط وابحث عنه في المتجمّعة. المنوال: القيمة ذات التكرار الأكبر.', 'Median: calculate the middle position and look for it in the cumulative frequencies. Mode: the value with the highest frequency.'),
        figure: (language) => <MedianTableFigure language={language} />
    },
    {
        id: 'symmetry',
        stage: 'centre',
        title: say('Batez bestekoa ala mediana?', '¿Media o mediana?', 'المتوسط أم الوسيط؟', 'Mean or median?'),
        goal: say('Banaketa simetrikoak eta asimetrikoak bereiztea eta muturreko balioek batez bestekoan duten eragina ikustea.', 'Distinguir distribuciones simétricas y asimétricas y ver el efecto de los valores extremos en la media.', 'التمييز بين التوزيعات المتماثلة وغير المتماثلة ورؤية أثر القيم المتطرفة في المتوسط.', 'Tell apart symmetric and asymmetric distributions and see how extreme values affect the mean.'),
        problem: say('Soldatak (€): 1200, 1200, 1200, 1200, 6000. Kalkulatu batez bestekoa eta mediana. Zeinek ordezkatzen ditu hobeto?', 'Sueldos (€): 1200, 1200, 1200, 1200, 6000. Calcula la media y la mediana. ¿Cuál los representa mejor?', 'الرواتب (€): 1200، 1200، 1200، 1200، 6000. احسب المتوسط والوسيط. أيهما يمثّلها أفضل؟', 'Salaries (€): 1200, 1200, 1200, 1200, 6000. Calculate the mean and the median. Which one represents them better?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batez bestekoa.', 'Media.', 'المتوسط.', 'Mean.'), math: same('$\\frac{4\\cdot 1200+6000}{5}=2160$') },
            { text: say('Mediana: erdiko datua (3.a).', 'Mediana: el dato central (el 3.º).', 'الوسيط: البيان الأوسط (الثالث).', 'Median: the central value (the 3rd).'), math: say('$\\text{Me}=1200$', '$\\text{Me}=1200$', '$\\text{Me}=1200$', '$\\text{Med}=1200$') },
            { text: say('Inork ez du 2160 € irabazten: mediana da ordezkari hobea.', 'Nadie gana 2160 €: la mediana representa mejor.', 'لا أحد يتقاضى 2160 €: الوسيط يمثّل أفضل.', 'Nobody earns €2160: the median represents the data better.') }
        ],
        takeaway: say('Simetrikoa: batez bestekoa ≈ mediana. Muturreko balioekin, mediana fidagarriagoa.', 'Simétrica: media ≈ mediana. Con valores extremos, la mediana es más fiable.', 'المتماثل: المتوسط ≈ الوسيط. ومع القيم المتطرفة يكون الوسيط أوثق.', 'Symmetric: mean ≈ median. With extreme values, the median is more reliable.'),
        figure: (language) => <SymmetryFigure language={language} />
    },

    /* ---------- 4. Dispersion and position ---------- */
    {
        id: 'deviation',
        stage: 'spread',
        needs: [{ unit: 'dbh2/numeros-enteros', topic: 'absolute', title: { eu: 'Balio absolutua', es: 'Valor absoluto', en: 'Absolute value', ar: 'القيمة المطلقة' } }],
        figureAfterSteps: true,
        title: say('Ibiltartea eta batez besteko desbideratzea', 'Recorrido y desviación media', 'المدى والانحراف المتوسط', 'Range and mean deviation'),
        goal: say('Datuen sakabanaketa ibiltartearekin eta batez besteko desbideratzearekin neurtzea.', 'Medir la dispersión de los datos con el recorrido y la desviación media.', 'قياس تشتت البيانات بالمدى والانحراف المتوسط.', 'Measure how spread out the data are using the range and the mean deviation.'),
        problem: say('Kalkulatu 4, 6, 7, 8, 10 noten ibiltartea eta batez besteko desbideratzea.', 'Calcula el recorrido y la desviación media de las notas 4, 6, 7, 8, 10.', 'احسب المدى والانحراف المتوسط للعلامات 4، 6، 7، 8، 10.', 'Calculate the range and the mean deviation of the marks 4, 6, 7, 8, 10.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ibiltartea: 10 − 4 = 6. Batez bestekoa:', 'Recorrido: 10 − 4 = 6. Media:', 'المدى: 10 − 4 = 6. المتوسط:', 'Range: 10 − 4 = 6. Mean:'), math: same('$\\frac{4+6+7+8+10}{5}=7$') },
            { text: say('Distantziak 7ra.', 'Distancias a 7.', 'المسافات عن 7.', 'Distances to 7.'), math: same('$3,\\ 1,\\ 0,\\ 1,\\ 3$') },
            { text: say('Distantzien batez bestekoa.', 'Media de las distancias.', 'متوسط المسافات.', 'Mean of the distances.'), math: same('$\\frac{3+1+0+1+3}{5}=1{,}6$') }
        ],
        takeaway: say('Ibiltartea: handiena − txikiena. DM: batez bestekoarekiko distantzien batez bestekoa.', 'Recorrido: mayor − menor. DM: media de las distancias a la media.', 'المدى: الأكبر − الأصغر. DM: متوسط المسافات عن المتوسط.', 'Range: largest − smallest. MD: the mean of the distances to the mean.'),
        figure: (language) => <DeviationFigure language={language} />
    },
    {
        id: 'quartiles',
        stage: 'spread',
        figureAfterSteps: true,
        title: say('Kuartilak', 'Cuartiles', 'الربيعيات', 'Quartiles'),
        goal: say('Ordenatutako datuak lau zati berdinetan banatzen dituzten kuartilak kalkulatzea.', 'Calcular los cuartiles, que dividen los datos ordenados en cuatro partes iguales.', 'حساب الربيعيات التي تقسم البيانات المرتّبة إلى أربعة أجزاء متساوية.', 'Calculate the quartiles, which divide the ordered data into four equal parts.'),
        problem: say('Aurkitu mediana eta kuartilak: 13, 12, 15, 19, 12, 12, 13, 14, 15, 14, 13, 18, 17, 9, 8.', 'Halla la mediana y los cuartiles de: 13, 12, 15, 19, 12, 12, 13, 14, 15, 14, 13, 18, 17, 9, 8.', 'أوجد الوسيط والربيعيات لـ: 13، 12، 15، 19، 12، 12، 13، 14، 15، 14، 13، 18، 17، 9، 8.', 'Find the median and the quartiles of: 13, 12, 15, 19, 12, 12, 13, 14, 15, 14, 13, 18, 17, 9, 8.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordenatu 15 datuak: 8, 9, 12, 12, 12, 13, 13, 13, 14, 14, 15, 15, 17, 18, 19.', 'Ordena los 15 datos: 8, 9, 12, 12, 12, 13, 13, 13, 14, 14, 15, 15, 17, 18, 19.', 'رتّب البيانات الخمسة عشر: 8، 9، 12، 12، 12، 13، 13، 13، 14، 14، 15، 15، 17، 18، 19.', 'Put the 15 values in order: 8, 9, 12, 12, 12, 13, 13, 13, 14, 14, 15, 15, 17, 18, 19.') },
            { text: say('Mediana: 8. datua.', 'Mediana: el dato 8.º.', 'الوسيط: البيان الثامن.', 'Median: the 8th value.'), math: same('$\\text{Me}=13$') },
            { text: say('Beheko 7 datuen erdikoa (4.a) eta goiko 7en erdikoa (12.a).', 'El central de los 7 de abajo (el 4.º) y el de los 7 de arriba (el 12.º).', 'أوسط البيانات السبعة الدنيا (الرابع) وأوسط السبعة العليا (الثاني عشر).', 'The middle one of the lower 7 (the 4th) and the middle one of the upper 7 (the 12th).'), math: same('$Q_1=12\\qquad Q_3=15$') }
        ],
        takeaway: say('$Q_1$, Me eta $Q_3$: datuen % 25, % 50 eta % 75 haien azpian.', '$Q_1$, Me y $Q_3$: el 25 %, el 50 % y el 75 % de los datos por debajo.', '$Q_1$ وMe و$Q_3$: تحتها 25 % و50 % و75 % من البيانات.', '$Q_1$, Med and $Q_3$: 25%, 50% and 75% of the data below.'),
        figure: (language) => <QuartilesFigure language={language} />
    },
    {
        id: 'box-plot',
        stage: 'spread',
        title: say('Kutxa-diagrama', 'Diagrama de caja y bigotes', 'مخطط الصندوق', 'Box-and-whisker plot'),
        goal: say('Bost zenbakiko laburpenarekin kutxa-diagrama egitea eta irakurtzea.', 'Construir y leer un diagrama de caja y bigotes con el resumen de cinco números.', 'بناء مخطط الصندوق وقراءته بملخّص الأعداد الخمسة.', 'Build and read a box plot using the five-number summary.'),
        problem: say('30 ikasleren noten kutxa-diagraman: txikiena 1, $Q_1=3{,}5$, $\\text{Me}=5$, $Q_3=6$, handiena 9. Interpretatu.', 'En el diagrama de caja de las notas de 30 alumnos: mínimo 1, $Q_1=3{,}5$, $\\text{Me}=5$, $Q_3=6$, máximo 9. Interprétalo.', 'في مخطط صندوق علامات 30 تلميذًا: الأصغر 1، $Q_1=3{,}5$، $\\text{Me}=5$، $Q_3=6$، الأكبر 9. فسّره.', 'In the box plot of the marks of 30 students: minimum 1, $Q_1=3{,}5$, $\\text{Med}=5$, $Q_3=6$, maximum 9. Interpret it.'),
        stepsKind: 'steps',
        steps: [
            { text: say('% 25ek 1 eta 3,5 artean atera dute; beste % 25ek 3,5 eta 5 artean.', 'Un 25 % ha sacado entre 1 y 3,5; otro 25 %, entre 3,5 y 5.', '25 % حصلوا على ما بين 1 و3.5، و25 % آخرون بين 3.5 و5.', '25% got between 1 and 3.5; another 25%, between 3.5 and 5.') },
            { text: say('Beste % 25 5 eta 6 artean (zati laburrena: bilduen dauden notak), eta azken % 25 6 eta 9 artean.', 'Otro 25 % entre 5 y 6 (la parte más corta: las notas más agrupadas), y el último 25 % entre 6 y 9.', 'و25 % بين 5 و6 (أقصر جزء: العلامات الأكثر تجمّعًا)، وآخر 25 % بين 6 و9.', 'Another 25% between 5 and 6 (the shortest part: the most tightly grouped marks), and the last 25% between 6 and 9.') },
            { text: say('Erdiak gainditu du: $\\text{Me}=5$. Ibiltartea eta kutxaren luzera:', 'La mitad ha aprobado: $\\text{Me}=5$. Recorrido y longitud de la caja:', 'نصفهم نجحوا: $\\text{Me}=5$. المدى وطول الصندوق:', 'Half have passed: $\\text{Med}=5$. Range and length of the box:'), math: same('$9-1=8\\qquad 6-3{,}5=2{,}5$') }
        ],
        takeaway: say('Kutxa: $Q_1$-etik $Q_3$-ra, marra medianan; biboteak muturretaraino. Zati bakoitzean % 25.', 'Caja: de $Q_1$ a $Q_3$, raya en la mediana; bigotes hasta los extremos. En cada parte, el 25 %.', 'الصندوق: من $Q_1$ إلى $Q_3$ وخط عند الوسيط، والشاربان حتى الطرفين. في كل جزء 25 %.', 'Box: from $Q_1$ to $Q_3$, line at the median; whiskers to the ends. In each part, 25%.'),
        figure: (language) => <BoxPlotFigure language={language} />
    },

    /* ---------- 5. Chance and probability ---------- */
    {
        id: 'events',
        stage: 'chance',
        needs: [{ unit: 'dbh1/estadistica', topic: 'laplace', title: { eu: 'Laplaceren erregela', es: 'La regla de Laplace', en: 'Laplace\'s rule', ar: 'قاعدة لابلاس' } }],
        figureAfterSteps: true,
        title: say('Gertaerak eta aurkako gertaera', 'Sucesos y suceso contrario', 'الأحداث والحدث المعاكس', 'Events and complementary events'),
        goal: say('Gertaerak lagin-espazioaren zati gisa idaztea, aurkako gertaeraren probabilitatea kalkulatzea eta gailu erregularrak eta irregularrak bereiztea.', 'Escribir sucesos como partes del espacio muestral, calcular la probabilidad del suceso contrario y distinguir instrumentos regulares e irregulares.', 'كتابة الأحداث أجزاءً من فضاء العيّنة، وحساب احتمال الحدث المعاكس، والتمييز بين الأدوات المنتظمة وغير المنتظمة.', 'Write events as parts of the sample space, calculate the probability of the complementary event and tell apart fair and unfair objects.'),
        problem: say('Poltsa batean 1etik 10era zenbakitutako bolak daude. A = «3ren multiploa». Idatzi A eta $\\bar{A}$, eta kalkulatu haien probabilitateak.', 'En una bolsa hay bolas numeradas del 1 al 10. A = «múltiplo de 3». Escribe A y $\\bar{A}$ y calcula sus probabilidades.', 'في كيس كرات مرقّمة من 1 إلى 10. A = «مضاعف للعدد 3». اكتب A و$\\bar{A}$ واحسب احتماليهما.', 'A bag contains balls numbered 1 to 10. A = “multiple of 3”. Write A and $\\bar{A}$ and calculate their probabilities.'),
        stepsKind: 'steps',
        steps: [
            { text: say('A gertaera.', 'El suceso A.', 'الحدث A.', 'Event A.'), math: same('$A=\\{3,6,9\\}\\qquad P(A)=\\frac{3}{10}$') },
            { text: say('Aurkakoa: gainerako zazpiak.', 'El contrario: los otros siete.', 'المعاكس: السبعة الباقية.', 'The complementary event: the other seven.'), math: same('$\\bar{A}=\\{1,2,4,5,7,8,10\\}$') },
            { text: say('Egiaztatu formularekin.', 'Comprueba con la fórmula.', 'تحقّق بالصيغة.', 'Check with the formula.'), math: same('$1-\\frac{3}{10}=\\frac{7}{10}$') }
        ],
        takeaway: say('$P(\\bar{A})=1-P(A)$. Gailu irregularretan, probabilitatea maiztasun erlatiboz hurbiltzen da.', '$P(\\bar{A})=1-P(A)$. En instrumentos irregulares, la probabilidad se aproxima con la frecuencia relativa.', '$P(\\bar{A})=1-P(A)$. وفي الأدوات غير المنتظمة يُقرَّب الاحتمال بالتكرار النسبي.', '$P(\\bar{A})=1-P(A)$. For unfair objects, the probability is estimated using the relative frequency.'),
        figure: (language) => <EventsFigure language={language} />
    },
    {
        id: 'tree',
        stage: 'chance',
        needs: [{ unit: 'dbh1/estadistica', topic: 'laplace', title: { eu: 'Laplaceren erregela', es: 'La regla de Laplace', en: 'Laplace\'s rule', ar: 'قاعدة لابلاس' } }],
        figureAfterSteps: true,
        title: say('Zuhaitz-diagramak eta taulak', 'Diagramas de árbol y tablas', 'المخططات الشجرية والجداول', 'Tree diagrams and tables'),
        goal: say('Esperimentu konposatuen emaitza guztiak zuhaitz edo taula batekin zenbatzea eta probabilitateak kalkulatzea.', 'Contar todos los resultados de experimentos compuestos con un árbol o una tabla y calcular probabilidades.', 'عدّ كل نتائج التجارب المركّبة بشجرة أو جدول وحساب الاحتمالات.', 'Count all the outcomes of compound experiments using a tree or a table, and calculate probabilities.'),
        problem: say('Hiru txanpon botatzen dira. Zein da aurpegi bakarra ateratzeko probabilitatea? Eta gutxienez aurpegi bat?', 'Se lanzan tres monedas. ¿Cuál es la probabilidad de obtener una sola cara? ¿Y al menos una cara?', 'تُرمى ثلاث قطع نقود. ما احتمال الحصول على وجه واحد فقط؟ وعلى وجه واحد على الأقل؟', 'Three coins are tossed. What is the probability of getting exactly one head? And at least one head?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zuhaitza: 2 adar, gero 2, gero 2.', 'Árbol: 2 ramas, luego 2, luego 2.', 'الشجرة: فرعان ثم فرعان ثم فرعان.', 'Tree: 2 branches, then 2, then 2.'), math: same('$2\\cdot 2\\cdot 2=8$') },
            { text: say('Aurpegi bakarra: AXX, XAX, XXA.', 'Una sola cara: C++, +C+, ++C.', 'وجه واحد فقط: C++، +C+، ++C.', 'Exactly one head: HTT, THT, TTH.'), math: same('$P=\\frac{3}{8}$') },
            { text: say('Gutxienez bat: «aurpegirik ez»-ren aurkakoa.', 'Al menos una: el contrario de «ninguna cara».', 'وجه على الأقل: معاكس «لا وجه».', 'At least one: the complementary event of “no heads”.'), math: same('$1-\\frac{1}{8}=\\frac{7}{8}$') }
        ],
        takeaway: say('Zuhaitzak edo taulak emaitza guztiak erakusten ditu. Gero, aldekoak zati posibleak.', 'El árbol o la tabla muestran todos los resultados. Luego, favorables entre posibles.', 'الشجرة أو الجدول يُظهران كل النتائج. ثم الملائمة على الممكنة.', 'The tree or the table shows all the outcomes. Then, favourable outcomes divided by possible outcomes.'),
        figure: (language) => <TreeFigure language={language} />
    },
    {
        id: 'double-table',
        stage: 'chance',
        needs: [{ unit: 'dbh1/estadistica', topic: 'laplace', title: { eu: 'Laplaceren erregela', es: 'La regla de Laplace', en: 'Laplace\'s rule', ar: 'قاعدة لابلاس' } }],
        figureAfterSteps: true,
        title: say('Sarrera bikoitzeko taulak', 'Tablas de doble entrada', 'الجداول ذات المدخلين', 'Two-way tables'),
        goal: say('Bi ezaugarri batera dituzten taulak irakurtzea, osatzea eta haietatik probabilitateak kalkulatzea.', 'Leer y completar tablas con dos características a la vez y calcular probabilidades a partir de ellas.', 'قراءة جداول تجمع خاصيتين معًا وإكمالها وحساب الاحتمالات منها.', 'Read and complete tables with two characteristics at the same time and calculate probabilities from them.'),
        problem: say('Animalien babesleku batean: katu osasuntsuak 12, txakur osasuntsuak 17, katu gaixoak 4, txakur gaixoak 7. Animalia bat zoriz hartuta, zein da txakurra izateko probabilitatea? Eta, gaixorik dagoela jakinda, katua izatekoa?', 'En un refugio de animales: gatos sanos 12, perros sanos 17, gatos enfermos 4, perros enfermos 7. Tomando uno al azar, ¿cuál es la probabilidad de que sea perro? ¿Y, sabiendo que está enfermo, de que sea gato?', 'في ملجأ للحيوانات: قطط سليمة 12، كلاب سليمة 17، قطط مريضة 4، كلاب مريضة 7. إذا أخذنا حيوانًا عشوائيًا، ما احتمال أن يكون كلبًا؟ وعلمًا أنه مريض، ما احتمال أن يكون قطًّا؟', 'In an animal shelter: 12 healthy cats, 17 healthy dogs, 4 sick cats, 7 sick dogs. Taking one at random, what is the probability that it is a dog? And, given that it is sick, what is the probability that it is a cat?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Guztizkoak: 24 txakur, 11 gaixo eta 40 animalia.', 'Totales: 24 perros, 11 enfermos y 40 animales.', 'المجاميع: 24 كلبًا و11 مريضًا و40 حيوانًا.', 'Totals: 24 dogs, 11 sick animals and 40 animals.'), math: same('$12+17+4+7=40$') },
            { text: say('Txakurra: 40tik 24.', 'Perro: 24 de 40.', 'كلب: 24 من 40.', 'Dog: 24 out of 40.'), math: same('$P=\\frac{24}{40}=\\frac{3}{5}$') },
            { text: say('Gaixorik dagoela jakinda: 11 kasu posible, 4 katu.', 'Sabiendo que está enfermo: 11 casos posibles, 4 gatos.', 'علمًا أنه مريض: 11 حالة ممكنة، منها 4 قطط.', 'Given that it is sick: 11 possible outcomes, 4 are cats.'), math: same('$P=\\frac{4}{11}$') }
        ],
        takeaway: say('Begiratu ondo kasu posibleak: denak ala errenkada edo zutabe bat bakarrik?', 'Mira bien los casos posibles: ¿todos o solo una fila o columna?', 'انتبه إلى الحالات الممكنة: الكل أم سطر أو عمود فقط؟', 'Look carefully at the possible outcomes: all of them, or only one row or column?'),
        figure: (language) => <DoubleTableFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const statisticsTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...statisticsLessonTexts[topic.id as StatisticsTopicId], ...statisticsLessonChecks[topic.id as StatisticsTopicId] }))
