import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { CumulativeFigure, DeviationFigure, SampleFigure } from '../dbh2-estatistika-v2/figures'
import { QuartileRuleFigure } from '../dbh4-akademikoak-estatistika/figures'
import { IntervalsFigure, VariationFigure } from '../dbh4-aplikatuak-estatistika/figures'
import { CentreDotsFigure, GroupedAgesFigure, MissingDatumFigure, OutlierBandFigure, PyramidFigure, SkewnessFigure, StandardScoreFigure, TransformFigure, VarianceTableFigure, WhiskerFigure } from './figures'
import { bachStatsLessonChecks, type BachStatsTopicId } from './lessonChecks'
import { bachStatsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Estatistika unidimentsionala · Batxilergoa 1 · Zientziak — stages and
   lessons. The scope follows unit 13 of Santillana 1.º Bachillerato
   Ciencias (Anaya Matemáticas I has no chapter on one-variable
   statistics). What 4. DBH académicas already taught —tables, centre,
   quartiles, box plot, variance and CV— comes back as a short review with
   «Review first» links; how many intervals, pyramids, the missing value
   with a system, skewness, outliers with x̄ ± 3σ, standard scores and
   transforming the data are new. All the exercises and numbers are our
   own. Percentiles follow the rule of 4. DBH: the position N·k/100; if it
   is not whole, the next datum; if it is, the mean of that datum and the
   next.
   ========================================================================== */

export type BachStatsStageId = 'data' | 'centre' | 'position' | 'spread' | 'interpretation'

export const bachStatsStages: UnitStage[] = [
    { id: 'data', tone: 'blue', title: { eu: 'Datuak eta taulak', es: 'Datos y tablas', en: 'Data and tables', ar: 'البيانات والجداول' } },
    { id: 'centre', tone: 'violet', title: { eu: 'Zentralizazio-neurriak', es: 'Medidas de centralización', en: 'Measures of centre', ar: 'مقاييس النزعة المركزية' } },
    { id: 'position', tone: 'mustard', title: { eu: 'Posizio-neurriak', es: 'Medidas de posición', en: 'Measures of position', ar: 'مقاييس الموضع' } },
    { id: 'spread', tone: 'coral', title: { eu: 'Sakabanatze-neurriak', es: 'Medidas de dispersión', en: 'Measures of spread', ar: 'مقاييس التشتت' } },
    { id: 'interpretation', tone: 'green', title: { eu: 'Interpretatu eta konparatu', es: 'Interpretar y comparar', en: 'Interpret and compare', ar: 'التفسير والمقارنة' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

const need = {
    sampling: { unit: 'dbh4-akademikoak/estadistica', topic: 'sampling', title: { eu: 'Lagina eta laginketa motak', es: 'Muestra y tipos de muestreo', en: 'Sample and types of sampling', ar: 'العيّنة وأنواع المعاينة' } },
    frequencies: { unit: 'dbh4-akademikoak/estadistica', topic: 'frequencies', title: { eu: 'Maiztasun-taulak', es: 'Tablas de frecuencias', en: 'Frequency tables', ar: 'جداول التكرارات' } },
    intervals: { unit: 'dbh4-akademikoak/estadistica', topic: 'intervals', title: { eu: 'Tarteak eta histograma', es: 'Intervalos e histograma', en: 'Intervals and histograms', ar: 'الفئات والمدرّج التكراري' } },
    pie: { unit: 'dbh3/estadistica-probabilidad', topic: 'pie-chart', title: { eu: 'Sektore-diagramak', es: 'Diagramas de sectores', en: 'Pie charts', ar: 'المخططات الدائرية' } },
    mean: { unit: 'dbh4-akademikoak/estadistica', topic: 'mean', title: { eu: 'Batez bestekoa eta haztatua', es: 'Media y media ponderada', en: 'Mean and weighted mean', ar: 'المتوسط والمتوسط المرجّح' } },
    medianMode: { unit: 'dbh4-akademikoak/estadistica', topic: 'median-mode', title: { eu: 'Mediana eta moda', es: 'Mediana y moda', en: 'Median and mode', ar: 'الوسيط والمنوال' } },
    grouped: { unit: 'dbh4-akademikoak/estadistica', topic: 'grouped-centre', title: { eu: 'Datu multzokatuen parametroak', es: 'Parámetros de datos agrupados', en: 'Measures for grouped data', ar: 'مقاييس البيانات المبوّبة' } },
    linearProblems: { unit: 'dbh4-akademikoak/sistemas', topic: 'linear-problems', title: { eu: 'Sistema linealen problemak', es: 'Problemas con sistemas lineales', en: 'Problems with linear systems', ar: 'مسائل بالأنظمة الخطية' } },
    quartiles: { unit: 'dbh4-akademikoak/estadistica', topic: 'quartiles', title: { eu: 'Kuartilak', es: 'Cuartiles', en: 'Quartiles', ar: 'الربيعيات' } },
    percentiles: { unit: 'dbh4-akademikoak/estadistica', topic: 'percentiles', title: { eu: 'Pertzentilak', es: 'Percentiles', en: 'Percentiles', ar: 'المئينات' } },
    boxPlot: { unit: 'dbh4-akademikoak/estadistica', topic: 'box-plot', title: { eu: 'Kutxa-diagrama', es: 'Diagrama de caja y bigotes', en: 'Box-and-whisker plot', ar: 'مخطط الصندوق والشاربين' } },
    meanDeviation: { unit: 'dbh4-akademikoak/estadistica', topic: 'mean-deviation', title: { eu: 'Ibiltartea eta batez besteko desbideratzea', es: 'Recorrido y desviación media', en: 'Range and mean deviation', ar: 'المدى والانحراف المتوسط' } },
    variance: { unit: 'dbh4-akademikoak/estadistica', topic: 'variance', title: { eu: 'Bariantza eta desbideratze tipikoa', es: 'Varianza y desviación típica', en: 'Variance and standard deviation', ar: 'التباين والانحراف المعياري' } },
    cv: { unit: 'dbh4-akademikoak/estadistica', topic: 'cv', title: { eu: 'Aldakuntza-koefizientea', es: 'Coeficiente de variación', en: 'Coefficient of variation', ar: 'معامل الاختلاف' } }
}

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Data and tables ---------- */
    {
        id: 'population-sample',
        stage: 'data',
        title: say('Populazioa, lagina eta aldagaiak', 'Población, muestra y variables', 'المجتمع والعيّنة والمتغيرات', 'Population, sample and variables'),
        goal: say('Populazioa eta lagina bereiztea, eta aldagai estatistikoak sailkatzea: kualitatiboak, kuantitatibo diskretuak eta kuantitatibo jarraituak.', 'Distinguir población y muestra, y clasificar las variables estadísticas en cualitativas, cuantitativas discretas y cuantitativas continuas.', 'التمييز بين المجتمع والعيّنة، وتصنيف المتغيرات الإحصائية إلى نوعية وكمية منفصلة وكمية متصلة.', 'Tell population from sample, and classify statistical variables as qualitative, discrete quantitative or continuous quantitative.'),
        needs: [need.sampling],
        problem: say('900 ikasleko institutu batek jakin nahi du zenbat denbora behar duten goizean iristeko, eta 60 ikasleri galdetu die. Zein da populazioa, zein lagina, eta nolakoa da aldagaia?', 'Un instituto de 900 alumnos quiere saber cuánto tardan en llegar por la mañana y pregunta a 60. ¿Cuál es la población, cuál la muestra y de qué tipo es la variable?', 'تريد مدرسة فيها 900 طالب أن تعرف كم يستغرق طلابها للوصول صباحًا، فسألت 60 منهم. ما المجتمع، وما العيّنة، وما نوع المتغير؟', 'A school with 900 students wants to know how long they take to arrive in the morning and asks 60 of them. What is the population, what is the sample and what kind of variable is it?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Populazioa institutuko ikasle guztiak dira.', 'La población son todos los alumnos del instituto.', 'المجتمع هو كل طلاب المدرسة.', 'The population is all the students of the school.'), math: same('$N=900$') },
            { text: say('Lagina galdetu zaien ikasleak dira.', 'La muestra son los alumnos a los que se pregunta.', 'العيّنة هي الطلاب الذين سُئلوا.', 'The sample is the students who are asked.'), math: same('$n=60$') },
            { text: say('Denbora neurtu egiten da, eta edozein balio har dezake: kuantitatibo jarraitua.', 'El tiempo se mide y puede tomar cualquier valor: cuantitativa continua.', 'يُقاس الزمن ويمكن أن يأخذ أي قيمة: كمي متصل.', 'Time is measured and can take any value: continuous quantitative.') }
        ],
        takeaway: say(
            'Populazioa aztertzen den talde osoa da; lagina, neurtzen den zatia. Aldagai bat kualitatiboa da hitzekin deskribatzen bada, eta kuantitatibo diskretua edo jarraitua zenbakiekin neurtzen bada.',
            'La población es todo el grupo que se estudia; la muestra, la parte que se mide. Una variable es cualitativa si se describe con palabras, y cuantitativa discreta o continua si se mide con números.',
            'المجتمع هو كل المجموعة المدروسة، والعيّنة الجزء الذي يُقاس. ويكون المتغير نوعيًّا إذا وُصف بالكلمات، وكميًّا منفصلًا أو متصلًا إذا قيس بالأعداد.',
            'The population is the whole group studied; the sample, the part that is measured. A variable is qualitative if it is described in words, and discrete or continuous quantitative if it is measured with numbers.'
        ),
        figure: (language) => <SampleFigure language={language} />
    },
    {
        id: 'frequency-tables',
        stage: 'data',
        title: say('Maiztasun absolutuak, erlatiboak eta metatuak', 'Frecuencias absolutas, relativas y acumuladas', 'التكرارات المطلقة والنسبية والمتجمّعة', 'Absolute, relative and cumulative frequencies'),
        goal: say('Maiztasun-taula bat osatzea —$f_i$, $h_i$, $F_i$ eta $H_i$— eta ehunekoen galderei erantzutea.', 'Completar una tabla de frecuencias —$f_i$, $h_i$, $F_i$ y $H_i$— y responder a preguntas con porcentajes.', 'إكمال جدول تكرارات —$f_i$ و$h_i$ و$F_i$ و$H_i$— والإجابة عن أسئلة بالنسب المئوية.', 'Complete a frequency table —$f_i$, $h_i$, $F_i$ and $H_i$— and answer questions with percentages.'),
        needs: [need.frequencies],
        problem: say('20 familiatan autoak zenbatu dira: 0 auto, 3 familia; 1 auto, 9; 2 auto, 6; 3 auto, 2. Osatu taula, eta esan zer ehunekok duen auto bat gehienez.', 'En 20 familias se cuentan los coches: 0 coches, 3 familias; 1 coche, 9; 2 coches, 6; 3 coches, 2. Completa la tabla y di qué porcentaje tiene como mucho un coche.', 'في 20 أسرة عُدّت السيارات: 0 سيارة 3 أسر، وسيارة واحدة 9، وسيارتان 6، و3 سيارات 2. أكمل الجدول وقل ما النسبة المئوية التي لديها سيارة واحدة على الأكثر.', 'In 20 families the cars are counted: 0 cars, 3 families; 1 car, 9; 2 cars, 6; 3 cars, 2. Complete the table and say what percentage has at most one car.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Maiztasun erlatiboa: $h_i=\\frac{f_i}{N}$.', 'Frecuencia relativa: $h_i=\\frac{f_i}{N}$.', 'التكرار النسبي: $h_i=\\frac{f_i}{N}$.', 'Relative frequency: $h_i=\\frac{f_i}{N}$.'), math: same('$h_1=\\frac{3}{20}=0{,}15\\qquad h_2=\\frac{9}{20}=0{,}45$') },
            { text: say('Metatua: balio horretaraino dauden maiztasunak batzen dira.', 'Acumulada: se suman las frecuencias hasta ese valor.', 'المتجمّع: نجمع التكرارات حتى تلك القيمة.', 'Cumulative: add the frequencies up to that value.'), math: same('$F_2=3+9=12$') },
            { text: say('Erlatibo metatua, ehunekotan: % 60.', 'Relativa acumulada, en porcentaje: el 60 %.', 'النسبي المتجمّع بالنسبة المئوية: 60٪.', 'Cumulative relative, as a percentage: 60%.'), math: same('$H_2=\\frac{12}{20}=0{,}6$') }
        ],
        takeaway: say(
            '$f_i$ zenbaki bat da; $h_i=\\frac{f_i}{N}$ zati bat (denak batuta, 1); $F_i$ eta $H_i$ balio horretaraino metatzen dira. Azken $F_i$ zenbakia $N$ da, eta azken $H_i$ zenbakia, 1.',
            '$f_i$ cuenta, $h_i=\\frac{f_i}{N}$ reparte (suman 1) y $F_i$, $H_i$ acumulan hasta ese valor. La última $F_i$ es $N$ y la última $H_i$ es 1.',
            '$f_i$ يَعُدّ، و$h_i=\\frac{f_i}{N}$ يوزّع (مجموعها 1)، و$F_i$ و$H_i$ يتجمّعان حتى تلك القيمة. وآخر $F_i$ هو $N$ وآخر $H_i$ هو 1.',
            '$f_i$ counts, $h_i=\\frac{f_i}{N}$ shares out (they add up to 1), and $F_i$, $H_i$ add up to that value. The last $F_i$ is $N$ and the last $H_i$ is 1.'
        ),
        figure: (language) => <CumulativeFigure language={language} />
    },
    {
        id: 'class-intervals',
        stage: 'data',
        title: say('Tarteak eraikitzea', 'Construir los intervalos', 'بناء الفئات', 'Building the class intervals'),
        goal: say('Datu asko tarteetan multzokatzea: zenbat tarte egin ($\\sqrt{N}$ inguru), zein zabalera eta zein klase-marka.', 'Agrupar muchos datos en intervalos: elegir cuántos (unos $\\sqrt{N}$), su amplitud y sus marcas de clase.', 'تجميع بيانات كثيرة في فئات: اختيار عددها (نحو $\\sqrt{N}$) وطولها ومراكزها.', 'Group many data into intervals: choose how many (about $\\sqrt{N}$), their width and their class marks.'),
        needs: [need.intervals],
        problem: say('40 datu daude, 12 eta 70 artean. Zenbat tarte komeni da egitea, eta zein zabalerakoak?', 'Hay 40 datos entre 12 y 70. ¿Cuántos intervalos conviene hacer y de qué amplitud?', 'هناك 40 بيانًا بين 12 و70. كم فئة يحسن أن نصنع، وما طولها؟', 'There are 40 data between 12 and 70. How many intervals should you make, and how wide?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Tarte kopurua: $\\sqrt{N}$ inguru.', 'Número de intervalos: más o menos $\\sqrt{N}$.', 'عدد الفئات: نحو $\\sqrt{N}$.', 'Number of intervals: about $\\sqrt{N}$.'), math: same('$\\sqrt{40}\\approx 6{,}3\\ \\to\\ 6$') },
            { text: say('Zabalera: ibiltartea zati tarte kopurua, gorantz biribilduta.', 'Amplitud: el recorrido entre el número de intervalos, redondeado hacia arriba.', 'الطول: المدى مقسومًا على عدد الفئات، مقرّبًا إلى الأعلى.', 'Width: the range divided by the number of intervals, rounded up.'), math: same('$\\frac{70-12}{6}\\approx 9{,}7\\ \\to\\ 10$') },
            { text: say('Tarteak datu txikienetik hasita, eta haien klase-markak.', 'Los intervalos, desde el menor dato, y sus marcas de clase.', 'الفئات بدءًا من أصغر بيان، ومراكزها.', 'The intervals, starting at the smallest datum, and their class marks.'), math: same('$[12,22),\\ [22,32),\\ \\ldots,\\ [62,72)$') }
        ],
        takeaway: say(
            '$\\sqrt{N}$ tarte inguru egiten dira, zabalera berekoak, datu txikienetik handienera iristen direnak. Klase-marka erdiko puntua da: $x_i=\\frac{a+b}{2}$.',
            'Se hacen unos $\\sqrt{N}$ intervalos de la misma amplitud, que cubran del menor al mayor dato. La marca de clase es el punto medio: $x_i=\\frac{a+b}{2}$.',
            'نصنع نحو $\\sqrt{N}$ فئة متساوية الطول تغطي من أصغر بيان إلى أكبره. ومركز الفئة هو منتصفها: $x_i=\\frac{a+b}{2}$.',
            'You make about $\\sqrt{N}$ intervals of the same width, covering from the smallest to the largest datum. The class mark is the midpoint: $x_i=\\frac{a+b}{2}$.'
        ),
        figure: (language) => <IntervalsFigure language={language} />
    },
    {
        id: 'charts',
        stage: 'data',
        title: say('Grafiko estatistikoak', 'Gráficos estadísticos', 'الرسوم الإحصائية', 'Statistical charts'),
        goal: say('Aldagai bakoitzari dagokion grafikoa aukeratzea, eta histogramak, sektore-diagramak eta biztanleria-piramideak irakurtzea.', 'Elegir el gráfico adecuado a cada variable y leer histogramas, diagramas de sectores y pirámides de población.', 'اختيار الرسم المناسب لكل متغير، وقراءة المدرّجات التكرارية والمخططات الدائرية والأهرام السكانية.', 'Choose the right chart for each variable and read histograms, pie charts and population pyramids.'),
        needs: [need.pie],
        problem: say('120 pertsonari egindako inkesta batean, 30 pertsonak nahiago dute trena. Zein angelu dagokio sektore-diagraman?', 'En una encuesta a 120 personas, 30 prefieren el tren. ¿Qué ángulo le corresponde en un diagrama de sectores?', 'في استطلاع لـ 120 شخصًا، يفضّل 30 منهم القطار. ما الزاوية التي تقابله في المخطط الدائري؟', 'In a survey of 120 people, 30 prefer the train. What angle does it get in a pie chart?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Trenaren maiztasun erlatiboa.', 'Frecuencia relativa del tren.', 'التكرار النسبي للقطار.', 'Relative frequency of the train.'), math: same('$h=\\frac{30}{120}=0{,}25$') },
            { text: say('Zirkulu osoa $360^\\circ$ da.', 'El círculo entero son $360^\\circ$.', 'الدائرة كاملة $360^\\circ$.', 'The whole circle is $360^\\circ$.'), math: same('$0{,}25\\cdot 360^\\circ=90^\\circ$') },
            { text: say('Trenak zirkuluaren laurdena hartzen du.', 'El tren ocupa un cuarto del círculo.', 'يشغل القطار ربع الدائرة.', 'The train takes up a quarter of the circle.') }
        ],
        takeaway: say(
            'Barrak, aldagai diskretu edo kualitatiboetarako; histograma, tarteetako datuetarako; sektoreak, osoko bat banatzeko: sektore bakoitzaren angelua $h_i\\cdot 360^\\circ$ da.',
            'Barras para variables discretas o cualitativas, histograma para datos en intervalos y sectores para repartir un total: el ángulo de cada sector es $h_i\\cdot 360^\\circ$.',
            'الأعمدة للمتغيرات المنفصلة أو النوعية، والمدرّج التكراري للبيانات المبوّبة، والقطاعات لتوزيع كلٍّ: زاوية كل قطاع $h_i\\cdot 360^\\circ$.',
            'Bars for discrete or qualitative variables, a histogram for data in intervals and sectors to share out a total: the angle of each sector is $h_i\\cdot 360^\\circ$.'
        ),
        figure: (language) => <PyramidFigure language={language} />
    },

    /* ---------- 2. Measures of centre ---------- */
    {
        id: 'centre-measures',
        stage: 'centre',
        title: say('Batez bestekoa, mediana eta moda', 'Media, mediana y moda', 'المتوسط والوسيط والمنوال', 'Mean, median and mode'),
        goal: say('Datu batzuen edo taula baten batez bestekoa, mediana eta moda kalkulatzea, eta bakoitzak zer esaten duen jakitea.', 'Calcular la media, la mediana y la moda de unos datos o de una tabla, y saber qué dice cada una.', 'حساب المتوسط والوسيط والمنوال لبيانات أو لجدول، ومعرفة ما يقوله كل منها.', 'Work out the mean, the median and the mode of some data or a table, and know what each one tells you.'),
        needs: [need.mean, need.medianMode],
        problem: say('20 partidatako golak: 0 gol, 4 partida; 1 gol, 7; 2 gol, 5; 3 gol, 3; 4 gol, 1. Aurkitu batez bestekoa, mediana eta moda.', 'Goles en 20 partidos: 0 goles, 4 partidos; 1 gol, 7; 2 goles, 5; 3 goles, 3; 4 goles, 1. Halla la media, la mediana y la moda.', 'الأهداف في 20 مباراة: 0 هدف في 4 مباريات، وهدف واحد في 7، وهدفان في 5، و3 أهداف في 3، و4 أهداف في 1. أوجد المتوسط والوسيط والمنوال.', 'Goals in 20 matches: 0 goals, 4 matches; 1 goal, 7; 2 goals, 5; 3 goals, 3; 4 goals, 1. Find the mean, the median and the mode.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batez bestekoa: $f_i x_i$ guztien batura zati $N$.', 'Media: la suma de los $f_i x_i$ entre $N$.', 'المتوسط: مجموع $f_i x_i$ مقسومًا على $N$.', 'Mean: the sum of the $f_i x_i$ divided by $N$.'), math: same('$\\bar{x}=\\frac{0\\cdot 4+1\\cdot 7+2\\cdot 5+3\\cdot 3+4\\cdot 1}{20}=1{,}5$') },
            { text: say('Mediana: 10. eta 11. datuak, metatuetan begiratuta (4, 11, 16…).', 'Mediana: los datos 10.º y 11.º, mirando las acumuladas (4, 11, 16…).', 'الوسيط: البيانان العاشر والحادي عشر، في المتجمّعة (4، 11، 16…).', 'Median: the 10th and 11th data, looking at the cumulative ones (4, 11, 16…).'), math: same('$Me=1$') },
            { text: say('Moda: maiztasun handieneko balioa.', 'Moda: el valor más frecuente.', 'المنوال: القيمة الأكثر تكرارًا.', 'Mode: the most frequent value.'), math: same('$Mo=1$') }
        ],
        takeaway: say(
            'Batez bestekoak $\\bar{x}=\\frac{\\sum f_i x_i}{N}$ guztizkoa banatzen du; medianak, $Me$, datuen erdia uzten du alde bakoitzean; moda, $Mo$, gehien errepikatzen den balioa da.',
            'La media $\\bar{x}=\\frac{\\sum f_i x_i}{N}$ reparte el total; la mediana $Me$ deja la mitad de los datos a cada lado; la moda $Mo$ es el valor más repetido.',
            'المتوسط $\\bar{x}=\\frac{\\sum f_i x_i}{N}$ يوزّع المجموع، والوسيط $Me$ يترك نصف البيانات في كل جانب، والمنوال $Mo$ هو القيمة الأكثر تكرارًا.',
            'The mean $\\bar{x}=\\frac{\\sum f_i x_i}{N}$ shares out the total; the median $Me$ leaves half the data on each side; the mode $Mo$ is the most repeated value.'
        ),
        figure: (language) => <CentreDotsFigure language={language} />
    },
    {
        id: 'grouped-centre',
        stage: 'centre',
        title: say('Datu multzokatuen zentralizazioa', 'Centralización con datos agrupados', 'النزعة المركزية للبيانات المبوّبة', 'The centre of grouped data'),
        goal: say('Tarteetan dauden datuen batez bestekoa klase-markekin kalkulatzea, eta tarte modala eta tarte mediana aurkitzea.', 'Calcular con las marcas de clase la media de datos en intervalos, y hallar el intervalo modal y el intervalo mediano.', 'حساب متوسط بيانات مبوّبة بمراكز الفئات، وإيجاد الفئة المنوالية والفئة الوسيطية.', 'Work out the mean of data in intervals with the class marks, and find the modal and median intervals.'),
        needs: [need.grouped],
        problem: say('40 bazkideren adinak: $[20,30)$ 8, $[30,40)$ 14, $[40,50)$ 12, $[50,60)$ 6. Kalkulatu batez bestekoa, eta esan zein den tarte mediana.', 'Edades de 40 socios: $[20,30)$ 8, $[30,40)$ 14, $[40,50)$ 12, $[50,60)$ 6. Calcula la media y di cuál es el intervalo mediano.', 'أعمار 40 عضوًا: $[20,30)$ 8، $[30,40)$ 14، $[40,50)$ 12، $[50,60)$ 6. احسب المتوسط وقل ما الفئة الوسيطية.', 'Ages of 40 members: $[20,30)$ 8, $[30,40)$ 14, $[40,50)$ 12, $[50,60)$ 6. Work out the mean and say which is the median interval.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Klase-markak 25, 35, 45 eta 55 dira.', 'Las marcas de clase son 25, 35, 45 y 55.', 'المراكز هي 25 و35 و45 و55.', 'The class marks are 25, 35, 45 and 55.'), math: same('$\\sum f_i x_i=8\\cdot 25+14\\cdot 35+12\\cdot 45+6\\cdot 55=1560$') },
            { text: say('Batez bestekoa.', 'Media.', 'المتوسط.', 'Mean.'), math: same('$\\bar{x}=\\frac{1560}{40}=39$') },
            { text: say('Metatuak 8, 22, 34, 40: 20. datua $[30,40)$ tartean dago, eta hura da tarte modala ere.', 'Acumuladas 8, 22, 34, 40: el dato 20.º está en $[30,40)$, que es también el intervalo modal.', 'المتجمّعة 8، 22، 34، 40: البيان العشرون في $[30,40)$، وهي أيضًا الفئة المنوالية.', 'Cumulative 8, 22, 34, 40: the 20th datum is in $[30,40)$, which is also the modal interval.'), math: same('$F_2=22>20$') }
        ],
        takeaway: say(
            'Tarteekin, klase-markekin kalkulatzen da, $x_i$: $\\bar{x}=\\frac{\\sum f_i x_i}{N}$ hurbilketa bat da. Tarte mediana $F_i$ metatuak $\\frac{N}{2}$ gainditzen duen lehen tartea da.',
            'Con intervalos se calcula con las marcas de clase $x_i$: $\\bar{x}=\\frac{\\sum f_i x_i}{N}$ es aproximada. El intervalo mediano es el primero cuya $F_i$ pasa de $\\frac{N}{2}$.',
            'مع الفئات نحسب بالمراكز $x_i$: والمتوسط $\\bar{x}=\\frac{\\sum f_i x_i}{N}$ تقريبي. والفئة الوسيطية أول فئة يتجاوز فيها $F_i$ القيمة $\\frac{N}{2}$.',
            'With intervals you calculate with the class marks $x_i$: $\\bar{x}=\\frac{\\sum f_i x_i}{N}$ is approximate. The median interval is the first one whose $F_i$ goes past $\\frac{N}{2}$.'
        ),
        figure: (language) => <GroupedAgesFigure language={language} />
    },
    {
        id: 'missing-datum',
        stage: 'centre',
        title: say('Falta den datua', 'El dato que falta', 'البيان الناقص', 'The missing value'),
        goal: say('Falta den datu bat edo maiztasun bat aurkitzea batez bestekoa jakinda; bi falta badira, sistema bat planteatuz.', 'Hallar un dato o una frecuencia que faltan sabiendo la media; si faltan dos, planteando un sistema.', 'إيجاد بيان أو تكرار ناقص بمعرفة المتوسط؛ وإذا نقص اثنان فبصياغة نظام.', 'Find a missing value or frequency when you know the mean; if two are missing, by setting up a system.'),
        needs: [need.mean, need.linearProblems],
        problem: say('1, 2, 3 eta 4 balioen maiztasunak 3, $x$, $y$ eta 4 dira. 20 datu daude, eta batez bestekoa 2,6 da. Aurkitu $x$ eta $y$.', 'Los valores 1, 2, 3 y 4 tienen frecuencias 3, $x$, $y$ y 4. Hay 20 datos y la media es 2,6. Halla $x$ e $y$.', 'للقيم 1 و2 و3 و4 التكرارات 3 و$x$ و$y$ و4. هناك 20 بيانًا والمتوسط 2.6. أوجد $x$ و$y$.', 'The values 1, 2, 3 and 4 have frequencies 3, $x$, $y$ and 4. There are 20 data and the mean is 2.6. Find $x$ and $y$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Datu kopurua.', 'El número de datos.', 'عدد البيانات.', 'The number of data.'), math: same('$3+x+y+4=20\\ \\to\\ x+y=13$') },
            { text: say('Batez bestekoa.', 'La media.', 'المتوسط.', 'The mean.'), math: same('$\\frac{1\\cdot 3+2x+3y+4\\cdot 4}{20}=2{,}6\\ \\to\\ 2x+3y=33$') },
            { text: say('Ebatzi sistema.', 'Resuelve el sistema.', 'حُلّ النظام.', 'Solve the system.'), math: same('$y=7,\\ x=6$') }
        ],
        takeaway: say(
            'Batez bestekoak batura ematen du: $\\sum f_i x_i=N\\cdot\\bar{x}$. Ezezagun bakarrarekin, ekuazio hori aski da; birekin, $\\sum f_i=N$ gehitzen da eta sistema ebazten da.',
            'La media da la suma: $\\sum f_i x_i=N\\cdot\\bar{x}$. Con una incógnita basta esa ecuación; con dos, se añade $\\sum f_i=N$ y se resuelve el sistema.',
            'المتوسط يعطي المجموع: $\\sum f_i x_i=N\\cdot\\bar{x}$. ومع مجهول واحد تكفي هذه المعادلة، ومع اثنين نضيف $\\sum f_i=N$ ونحل النظام.',
            'The mean gives the sum: $\\sum f_i x_i=N\\cdot\\bar{x}$. With one unknown that equation is enough; with two, you add $\\sum f_i=N$ and solve the system.'
        ),
        figure: (language) => <MissingDatumFigure language={language} />
    },

    /* ---------- 3. Measures of position ---------- */
    {
        id: 'quartiles-percentiles',
        stage: 'position',
        title: say('Kuartilak eta pertzentilak', 'Cuartiles y percentiles', 'الربيعيات والمئينات', 'Quartiles and percentiles'),
        goal: say('Taula baten kuartilak eta pertzentilak kalkulatzea, $N\\cdot\\frac{k}{100}$ posizioa maiztasun metatuetan bilatuz.', 'Calcular los cuartiles y los percentiles de una tabla buscando la posición $N\\cdot\\frac{k}{100}$ en las frecuencias acumuladas.', 'حساب الربيعيات والمئينات لجدول بالبحث عن الموضع $N\\cdot\\frac{k}{100}$ في التكرارات المتجمّعة.', 'Work out the quartiles and percentiles of a table by looking for the position $N\\cdot\\frac{k}{100}$ in the cumulative frequencies.'),
        needs: [need.quartiles, need.percentiles],
        problem: say('30 langileren baja-egunak: 0 egun, 9 langile; 1 egun, 8; 2 egun, 6; 3 egun, 4; 4 egun, 3. Aurkitu $Q_1$, $Q_3$ eta $P_{85}$.', 'Días de baja de 30 trabajadores: 0 días, 9 trabajadores; 1 día, 8; 2 días, 6; 3 días, 4; 4 días, 3. Halla $Q_1$, $Q_3$ y $P_{85}$.', 'أيام الإجازة المرضية لـ 30 عاملًا: 0 يوم لـ 9 عمال، ويوم واحد لـ 8، ويومان لـ 6، و3 أيام لـ 4، و4 أيام لـ 3. أوجد $Q_1$ و$Q_3$ و$P_{85}$.', 'Days off sick of 30 workers: 0 days, 9 workers; 1 day, 8; 2 days, 6; 3 days, 4; 4 days, 3. Find $Q_1$, $Q_3$ and $P_{85}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Metatuak: 9, 17, 23, 27, 30. $Q_1$ kuartilaren posizioa ez da osoa: hurrengo datua hartzen da, 8. datua.', 'Acumuladas: 9, 17, 23, 27, 30. La posición de $Q_1$ no es entera: se toma el dato siguiente, el 8.º.', 'المتجمّعة: 9، 17، 23، 27، 30. موضع $Q_1$ ليس صحيحًا: نأخذ البيان التالي، الثامن.', 'Cumulative: 9, 17, 23, 27, 30. The position of $Q_1$ is not whole: take the next datum, the 8th.'), math: same('$30\\cdot 0{,}25=7{,}5\\ \\to\\ Q_1=0$') },
            { text: say('$Q_3$ kuartilarako, 23. datua.', 'Para $Q_3$, el dato 23.º.', 'لـ $Q_3$ البيان الثالث والعشرون.', 'For $Q_3$, the 23rd datum.'), math: same('$30\\cdot 0{,}75=22{,}5\\ \\to\\ Q_3=2$') },
            { text: say('$P_{85}$ pertzentilerako, 26. datua.', 'Para $P_{85}$, el dato 26.º.', 'لـ $P_{85}$ البيان السادس والعشرون.', 'For $P_{85}$, the 26th datum.'), math: same('$30\\cdot 0{,}85=25{,}5\\ \\to\\ P_{85}=3$') }
        ],
        takeaway: say(
            '$P_k$ pertzentilak 100 datutik $k$ uzten ditu azpian; $Q_1=P_{25}$, $Me=P_{50}$ eta $Q_3=P_{75}$. $N\\cdot\\frac{k}{100}$ kalkulatzen da: osoa ez bada, hurrengo datua; osoa bada, datu horren eta hurrengoaren batez bestekoa.',
            'El percentil $P_k$ deja por debajo $k$ de cada 100 datos; $Q_1=P_{25}$, $Me=P_{50}$ y $Q_3=P_{75}$. Se calcula $N\\cdot\\frac{k}{100}$: si no es entero, el dato siguiente; si es entero, la media de ese dato y el siguiente.',
            'المئين $P_k$ يترك تحته $k$ من كل 100 بيان؛ و$Q_1=P_{25}$ و$Me=P_{50}$ و$Q_3=P_{75}$. نحسب $N\\cdot\\frac{k}{100}$: إن لم يكن صحيحًا فالبيان التالي، وإن كان صحيحًا فمتوسط ذلك البيان والذي يليه.',
            'The percentile $P_k$ leaves $k$ out of every 100 data below it; $Q_1=P_{25}$, $Me=P_{50}$ and $Q_3=P_{75}$. Work out $N\\cdot\\frac{k}{100}$: if it is not whole, the next datum; if it is whole, the mean of that datum and the next.'
        ),
        figure: (language) => <QuartileRuleFigure language={language} />
    },
    {
        id: 'box-plot',
        stage: 'position',
        title: say('Kutxa eta biboteak', 'Caja y bigotes', 'الصندوق والشاربان', 'Box and whiskers'),
        goal: say('Bost zenbakirekin kutxa-diagrama bat egitea eta biboteen arauarekin datu atipikoak aurkitzea.', 'Hacer un diagrama de caja con cinco números y hallar los datos atípicos con la regla de los bigotes.', 'رسم مخطط صندوق بخمسة أعداد وإيجاد القيم الشاذة بقاعدة الشاربين.', 'Draw a box plot from five numbers and find the outliers with the whisker rule.'),
        needs: [need.boxPlot],
        problem: say('Datu batzuetaz badakigu: minimoa 2 da, $Q_1=5$, $Me=7$ eta $Q_3=8$; bi datu handienak 11 eta 15 dira. Ba al dago daturen bat atipikoa? Noraino iristen da eskuineko bibotea?', 'De unos datos se sabe: mínimo 2, $Q_1=5$, $Me=7$ y $Q_3=8$; los dos mayores son 11 y 15. ¿Hay algún dato atípico? ¿Hasta dónde llega el bigote derecho?', 'نعرف عن بيانات: الأصغر 2، و$Q_1=5$، و$Me=7$، و$Q_3=8$؛ وأكبر بيانين 11 و15. هل توجد قيمة شاذة؟ وإلى أين يصل الشارب الأيمن؟', 'For some data we know: minimum 2, $Q_1=5$, $Me=7$ and $Q_3=8$; the two largest are 11 and 15. Is any datum an outlier? How far does the right whisker reach?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kuartil arteko ibiltartea.', 'Rango intercuartílico.', 'المدى الربيعي.', 'Interquartile range.'), math: same('$Q_3-Q_1=8-5=3$') },
            { text: say('Mugak: ibiltartea bider 1,5 alde bakoitzean.', 'Límites: 1,5 veces el rango a cada lado.', 'الحدان: 1.5 مرة المدى في كل جانب.', 'Limits: 1.5 times the range on each side.'), math: same('$5-4{,}5=0{,}5\\qquad 8+4{,}5=12{,}5$') },
            { text: say('15 kanpoan geratzen da: atipikoa da, eta aparte marrazten da. Bibotea 11 daturaino iristen da.', 'El 15 queda fuera: es atípico y se dibuja aparte. El bigote llega hasta el 11.', 'يقع 15 خارجًا: إنه شاذ ويُرسم وحده. ويصل الشارب إلى 11.', '15 lies outside: it is an outlier and is drawn on its own. The whisker reaches 11.'), math: same('$11<12{,}5<15$') }
        ],
        takeaway: say(
            'Kutxa $Q_1$ kuartiletik $Q_3$ kuartilera doa, eta barruko marra $Me$ da. Biboteak $Q_1-1{,}5\\,(Q_3-Q_1)$ eta $Q_3+1{,}5\\,(Q_3-Q_1)$ arteko azken datuetaraino iristen dira; kanpokoak atipikoak dira.',
            'La caja va de $Q_1$ a $Q_3$ y la raya interior es $Me$. Los bigotes llegan hasta el último dato dentro de $Q_1-1{,}5\\,(Q_3-Q_1)$ y $Q_3+1{,}5\\,(Q_3-Q_1)$; lo de fuera es atípico.',
            'يمتد الصندوق من $Q_1$ إلى $Q_3$ وخطه الداخلي $Me$. ويصل الشاربان إلى آخر بيان داخل $Q_1-1{,}5\\,(Q_3-Q_1)$ و$Q_3+1{,}5\\,(Q_3-Q_1)$؛ وما خرج عنهما شاذ.',
            'The box goes from $Q_1$ to $Q_3$ and the line inside is $Me$. The whiskers reach the last datum within $Q_1-1{,}5\\,(Q_3-Q_1)$ and $Q_3+1{,}5\\,(Q_3-Q_1)$; anything beyond is an outlier.'
        ),
        figure: (language) => <WhiskerFigure language={language} />
    },
    {
        id: 'skewness',
        stage: 'position',
        title: say('Simetria eta asimetria', 'Simetría y asimetría', 'التماثل والالتواء', 'Symmetry and skewness'),
        goal: say('Banaketa bat simetrikoa edo asimetrikoa den jakitea, batez bestekoa, mediana eta moda konparatuz eta kutxari begiratuz.', 'Saber si una distribución es simétrica o asimétrica comparando la media, la mediana y la moda, y mirando la caja.', 'معرفة هل التوزيع متماثل أو ملتوٍ بمقارنة المتوسط والوسيط والمنوال وبالنظر إلى الصندوق.', 'Tell whether a distribution is symmetric or skewed by comparing the mean, the median and the mode, and by looking at the box.'),
        needs: [need.medianMode],
        problem: say('Itxaron-denborak (min): $Mo=4$, $Me=6$ eta $\\bar{x}=9$. Simetrikoa al da banaketa?', 'Tiempos de espera (min): $Mo=4$, $Me=6$ y $\\bar{x}=9$. ¿Es simétrica la distribución?', 'أزمنة الانتظار (دقيقة): $Mo=4$ و$Me=6$ و$\\bar{x}=9$. هل التوزيع متماثل؟', 'Waiting times (min): $Mo=4$, $Me=6$ and $\\bar{x}=9$. Is the distribution symmetric?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Konparatu hiru neurriak.', 'Compara las tres medidas.', 'قارن المقاييس الثلاثة.', 'Compare the three measures.'), math: same('$4<6<9$') },
            { text: say('Batez bestekoa balio handien isatserantz doa.', 'La media se va hacia la cola de los valores grandes.', 'يتجه المتوسط نحو ذيل القيم الكبيرة.', 'The mean moves towards the tail of large values.') },
            { text: say('Eskuinetik asimetrikoa da: gutxi batzuek asko itxaroten dute.', 'Es asimétrica por la derecha: unos pocos esperan mucho.', 'ملتوٍ إلى اليمين: قلة ينتظرون كثيرًا.', 'It is skewed to the right: a few people wait a long time.') }
        ],
        takeaway: say(
            '$\\bar{x}\\approx Me\\approx Mo$ bada, banaketa simetrikoa da. $\\bar{x}>Me$ bada, isatsa eskuinean du; $\\bar{x}<Me$ bada, ezkerrean.',
            'Si $\\bar{x}\\approx Me\\approx Mo$, la distribución es simétrica. Si $\\bar{x}>Me$, tiene la cola a la derecha; si $\\bar{x}<Me$, a la izquierda.',
            'إذا كان $\\bar{x}\\approx Me\\approx Mo$ فالتوزيع متماثل. وإذا كان $\\bar{x}>Me$ فذيله إلى اليمين، وإذا كان $\\bar{x}<Me$ فإلى اليسار.',
            'If $\\bar{x}\\approx Me\\approx Mo$, the distribution is symmetric. If $\\bar{x}>Me$, its tail is on the right; if $\\bar{x}<Me$, on the left.'
        ),
        figure: (language) => <SkewnessFigure language={language} />
    },

    /* ---------- 4. Measures of spread ---------- */
    {
        id: 'range-mean-deviation',
        stage: 'spread',
        title: say('Taula baten batez besteko desbideratzea', 'Desviación media de una tabla', 'الانحراف المتوسط لجدول', 'Mean deviation of a table'),
        goal: say('Taula baten ibiltartea eta batez besteko desbideratzea kalkulatzea, eta zergatik behar den balio absolutua ulertzea.', 'Calcular el recorrido y la desviación media de una tabla, y entender por qué hace falta el valor absoluto.', 'حساب المدى والانحراف المتوسط لجدول، وفهم لماذا نحتاج إلى القيمة المطلقة.', 'Work out the range and the mean deviation of a table, and see why the absolute value is needed.'),
        needs: [need.meanDeviation],
        problem: say('10 ikasleren anai-arrebak: 0, 2 ikasle; 1, 5; 2, 2; 3, 1. Aurkitu ibiltartea eta batez besteko desbideratzea.', 'Hermanos de 10 alumnos: 0, 2 alumnos; 1, 5; 2, 2; 3, 1. Halla el recorrido y la desviación media.', 'عدد إخوة 10 طلاب: 0 لطالبين، و1 لـ 5، و2 لطالبين، و3 لطالب واحد. أوجد المدى والانحراف المتوسط.', 'Siblings of 10 students: 0, 2 students; 1, 5; 2, 2; 3, 1. Find the range and the mean deviation.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batez bestekoa. Ibiltartea, $3-0=3$.', 'Media. El recorrido es $3-0=3$.', 'المتوسط. والمدى $3-0=3$.', 'Mean. The range is $3-0=3$.'), math: same('$\\bar{x}=\\frac{0+5+4+3}{10}=1{,}2$') },
            { text: say('Batez bestekoarekiko distantziak, zeinurik gabe.', 'Distancias a la media, sin signo.', 'المسافات عن المتوسط دون إشارة.', 'Distances to the mean, without sign.'), math: same('$|0-1{,}2|=1{,}2,\\ |1-1{,}2|=0{,}2,\\ \\ldots$') },
            { text: say('Batez besteko desbideratzea.', 'Desviación media.', 'الانحراف المتوسط.', 'Mean deviation.'), math: same('$DM=\\frac{2\\cdot 1{,}2+5\\cdot 0{,}2+2\\cdot 0{,}8+1\\cdot 1{,}8}{10}=0{,}68$') }
        ],
        takeaway: say(
            'Ibiltartea datu handiena ken txikiena da. Batez besteko desbideratzea batez bestekoarekiko distantzien batez bestekoa da: $DM=\\frac{\\sum f_i\\,|x_i-\\bar{x}|}{N}$.',
            'El recorrido es el mayor dato menos el menor. La desviación media es la media de las distancias a la media: $DM=\\frac{\\sum f_i\\,|x_i-\\bar{x}|}{N}$.',
            'المدى هو أكبر بيان ناقص أصغره. والانحراف المتوسط هو متوسط المسافات عن المتوسط: $DM=\\frac{\\sum f_i\\,|x_i-\\bar{x}|}{N}$.',
            'The range is the largest datum minus the smallest. The mean deviation is the mean of the distances to the mean: $DM=\\frac{\\sum f_i\\,|x_i-\\bar{x}|}{N}$.'
        ),
        figure: (language) => <DeviationFigure language={language} />
    },
    {
        id: 'variance-sd',
        stage: 'spread',
        title: say('Bariantzaren formula praktikoa', 'La fórmula práctica de la varianza', 'الصيغة العملية للتباين', 'The working formula for the variance'),
        goal: say('Taula baten bariantza eta desbideratze tipikoa kalkulatzea, karratuen batez bestekoa ken batez bestekoaren karratua eginez.', 'Calcular la varianza y la desviación típica de una tabla con la media de los cuadrados menos el cuadrado de la media.', 'حساب التباين والانحراف المعياري لجدول بمتوسط المربعات ناقص مربع المتوسط.', 'Work out the variance and the standard deviation of a table as the mean of the squares minus the square of the mean.'),
        needs: [need.variance],
        problem: say('Kalkulatu taula honen bariantza eta desbideratze tipikoa: 1 (3 aldiz), 2 (4), 3 (2), 4 (1).', 'Calcula la varianza y la desviación típica de la tabla: 1 (3 veces), 2 (4), 3 (2), 4 (1).', 'احسب التباين والانحراف المعياري للجدول: 1 (3 مرات)، 2 (4)، 3 (2)، 4 (1).', 'Work out the variance and the standard deviation of the table: 1 (3 times), 2 (4), 3 (2), 4 (1).'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batez bestekoa.', 'Media.', 'المتوسط.', 'Mean.'), math: same('$\\bar{x}=\\frac{21}{10}=2{,}1$') },
            { text: say('$f_i x_i^2$ guztien batura.', 'La suma de los $f_i x_i^2$.', 'مجموع $f_i x_i^2$.', 'The sum of the $f_i x_i^2$.'), math: same('$3\\cdot 1+4\\cdot 4+2\\cdot 9+1\\cdot 16=53$') },
            { text: say('Bariantza eta desbideratze tipikoa.', 'Varianza y desviación típica.', 'التباين والانحراف المعياري.', 'Variance and standard deviation.'), math: same('$\\sigma^2=\\frac{53}{10}-2{,}1^2=0{,}89\\qquad\\sigma\\approx 0{,}94$') }
        ],
        takeaway: say(
            '$\\sigma^2=\\frac{\\sum f_i x_i^2}{N}-\\bar{x}^2$ eta $\\sigma=\\sqrt{\\sigma^2}$, datuen unitate berean.',
            '$\\sigma^2=\\frac{\\sum f_i x_i^2}{N}-\\bar{x}^2$ y $\\sigma=\\sqrt{\\sigma^2}$, en las mismas unidades que los datos.',
            '$\\sigma^2=\\frac{\\sum f_i x_i^2}{N}-\\bar{x}^2$ و$\\sigma=\\sqrt{\\sigma^2}$ بوحدات البيانات نفسها.',
            '$\\sigma^2=\\frac{\\sum f_i x_i^2}{N}-\\bar{x}^2$ and $\\sigma=\\sqrt{\\sigma^2}$, in the same units as the data.'
        ),
        figure: (language) => <VarianceTableFigure language={language} />
    },
    {
        id: 'coefficient-variation',
        stage: 'spread',
        title: say('Bi banaketa konparatzea', 'Comparar dos distribuciones', 'مقارنة توزيعين', 'Comparing two distributions'),
        goal: say('Batez besteko desberdineko bi banaketaren sakabanatzea aldakuntza-koefizientearekin konparatzea.', 'Comparar la dispersión de dos distribuciones con medias distintas mediante el coeficiente de variación.', 'مقارنة تشتت توزيعين لهما متوسطان مختلفان بمعامل الاختلاف.', 'Compare the spread of two distributions with different means using the coefficient of variation.'),
        needs: [need.cv],
        problem: say('A taldea: $\\bar{x}=50$ kg, $\\sigma=5$ kg. B taldea: $\\bar{x}=20$ kg, $\\sigma=3$ kg. Zein dago sakabanatuago?', 'Grupo A: $\\bar{x}=50$ kg, $\\sigma=5$ kg. Grupo B: $\\bar{x}=20$ kg, $\\sigma=3$ kg. ¿Cuál es más disperso?', 'المجموعة A: $\\bar{x}=50$ كغ، $\\sigma=5$ كغ. المجموعة B: $\\bar{x}=20$ كغ، $\\sigma=3$ كغ. أيهما أكثر تشتتًا؟', 'Group A: $\\bar{x}=50$ kg, $\\sigma=5$ kg. Group B: $\\bar{x}=20$ kg, $\\sigma=3$ kg. Which is more spread out?'),
        stepsKind: 'steps',
        steps: [
            { text: say('A taldearen aldakuntza-koefizientea.', 'Coeficiente de variación de A.', 'معامل اختلاف A.', 'Coefficient of variation of A.'), math: same('$CV_A=\\frac{5}{50}=0{,}1$') },
            { text: say('B taldearena.', 'El de B.', 'معامل B.', 'That of B.'), math: same('$CV_B=\\frac{3}{20}=0{,}15$') },
            { text: say('B sakabanatuagoa da, nahiz eta haren $\\sigma$ txikiagoa izan.', 'B es más disperso, aunque su $\\sigma$ sea menor.', 'B أكثر تشتتًا وإن كان $\\sigma$ له أصغر.', 'B is more spread out, even though its $\\sigma$ is smaller.'), math: same('$0{,}15>0{,}1$') }
        ],
        takeaway: say(
            'Batez besteko desberdinekin sakabanatzeak konparatzeko, $CV=\\frac{\\sigma}{\\bar{x}}$ erabiltzen da, unitaterik gabea: zenbat eta handiagoa, orduan eta sakabanatuago.',
            'Para comparar dispersiones con medias distintas se usa $CV=\\frac{\\sigma}{\\bar{x}}$, que no tiene unidades: cuanto mayor, más dispersos.',
            'لمقارنة التشتت مع متوسطات مختلفة نستعمل $CV=\\frac{\\sigma}{\\bar{x}}$ الذي لا وحدة له: كلما كبر زاد التشتت.',
            'To compare spreads with different means use $CV=\\frac{\\sigma}{\\bar{x}}$, which has no units: the larger it is, the more spread out.'
        ),
        figure: (language) => <VariationFigure language={language} />
    },

    /* ---------- 5. Interpret and compare ---------- */
    {
        id: 'outliers',
        stage: 'interpretation',
        title: say('Datu atipikoak', 'Datos atípicos', 'القيم الشاذة', 'Outliers'),
        goal: say('Datu atipikoak $(\\bar{x}-3\\sigma,\\ \\bar{x}+3\\sigma)$ tartearekin aurkitzea, eta haiekin zer egin jakitea.', 'Detectar datos atípicos con el intervalo $(\\bar{x}-3\\sigma,\\ \\bar{x}+3\\sigma)$ y saber qué hacer con ellos.', 'كشف القيم الشاذة بالمجال $(\\bar{x}-3\\sigma,\\ \\bar{x}+3\\sigma)$ ومعرفة ما نفعل بها.', 'Spot outliers with the interval $(\\bar{x}-3\\sigma,\\ \\bar{x}+3\\sigma)$ and know what to do with them.'),
        needs: [need.boxPlot],
        problem: say('Denbora batzuen batez bestekoa $\\bar{x}=20$ s da, eta $\\sigma=4$ s. Atipikoa al da 33 segundoko denbora bat?', 'Unos tiempos tienen $\\bar{x}=20$ s y $\\sigma=4$ s. ¿Es atípico un tiempo de 33 s?', 'لأزمنة متوسط $\\bar{x}=20$ ث و$\\sigma=4$ ث. هل زمن 33 ث شاذ؟', 'Some times have $\\bar{x}=20$ s and $\\sigma=4$ s. Is a time of 33 s an outlier?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hiru desbideratzeko tartea.', 'El intervalo de tres desviaciones.', 'مجال الانحرافات الثلاثة.', 'The interval of three deviations.'), math: same('$20-3\\cdot 4=8\\qquad 20+3\\cdot 4=32$') },
            { text: say('33 kanpoan geratzen da.', 'El 33 queda fuera.', 'يقع 33 خارجه.', '33 lies outside.'), math: same('$33>32$') },
            { text: say('Atipikoa da: berrikusi behar da, akats bat izan baitaiteke.', 'Es atípico: hay que revisarlo, porque puede ser un error.', 'إنه شاذ: يجب مراجعته لأنه قد يكون خطأ.', 'It is an outlier: check it, because it may be a mistake.') }
        ],
        takeaway: say(
            '$(\\bar{x}-3\\sigma,\\ \\bar{x}+3\\sigma)$ tartetik kanpo dagoen datu bat atipikotzat hartzen da. Kendu aurretik, begiratu akats bat ala benetako kasu bat den.',
            'Un dato fuera de $(\\bar{x}-3\\sigma,\\ \\bar{x}+3\\sigma)$ se considera atípico. Antes de quitarlo, mira si es un error o un caso real.',
            'يُعدّ البيان خارج $(\\bar{x}-3\\sigma,\\ \\bar{x}+3\\sigma)$ شاذًّا. وقبل حذفه انظر هل هو خطأ أم حالة حقيقية.',
            'A datum outside $(\\bar{x}-3\\sigma,\\ \\bar{x}+3\\sigma)$ is taken as an outlier. Before removing it, see whether it is a mistake or a real case.'
        ),
        figure: (language) => <OutlierBandFigure language={language} />
    },
    {
        id: 'standard-scores',
        stage: 'interpretation',
        title: say('Puntuazio tipikoak', 'Puntuaciones típicas', 'الدرجات المعيارية', 'Standard scores'),
        goal: say('Banaketa desberdinetako datuak haien puntuazio tipikoarekin konparatzea, ${z}=\\frac{x-\\bar{x}}{\\sigma}$.', 'Comparar datos de distribuciones distintas con su puntuación típica, ${z}=\\frac{x-\\bar{x}}{\\sigma}$.', 'مقارنة بيانات من توزيعات مختلفة بدرجتها المعيارية ${z}=\\frac{x-\\bar{x}}{\\sigma}$.', 'Compare data from different distributions with their standard score, ${z}=\\frac{x-\\bar{x}}{\\sigma}$.'),
        needs: [need.variance],
        problem: say('Ikasle batek 8 atera du Matematikan (batez bestekoa 7, $\\sigma=2$) eta 7 Hizkuntzan (batez bestekoa 6, $\\sigma=0{,}5$). Zein ikasgaitan nabarmentzen da gehiago?', 'Una alumna saca un 8 en Matemáticas (media 7, $\\sigma=2$) y un 7 en Lengua (media 6, $\\sigma=0{,}5$). ¿En qué asignatura destaca más?', 'نالت طالبة 8 في الرياضيات (المتوسط 7، $\\sigma=2$) و7 في اللغة (المتوسط 6، $\\sigma=0{,}5$). في أي مادة تتميّز أكثر؟', 'A student scores 8 in Maths (mean 7, $\\sigma=2$) and 7 in Language (mean 6, $\\sigma=0{,}5$). In which subject does she stand out more?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Puntuazio tipikoa Matematikan.', 'Puntuación típica en Matemáticas.', 'الدرجة المعيارية في الرياضيات.', 'Standard score in Maths.'), math: same('${z}_M=\\frac{8-7}{2}=0{,}5$') },
            { text: say('Hizkuntzan.', 'En Lengua.', 'في اللغة.', 'In Language.'), math: same('${z}_L=\\frac{7-6}{0{,}5}=2$') },
            { text: say('Hizkuntzan nabarmentzen da gehiago: bere batez bestekoaren gainetik bi desbideratzera dago.', 'Destaca más en Lengua: está dos desviaciones por encima de su media.', 'تتميّز أكثر في اللغة: إنها فوق متوسطها بانحرافين.', 'She stands out more in Language: she is two deviations above its mean.'), math: same('$2>0{,}5$') }
        ],
        takeaway: say(
            '${z}=\\frac{x-\\bar{x}}{\\sigma}$ puntuazio tipikoak esaten du datu bat batez bestekotik zenbat desbideratze tipikora dagoen. Harekin, talde desberdinetako datuak konparatzen dira.',
            'La puntuación típica ${z}=\\frac{x-\\bar{x}}{\\sigma}$ dice a cuántas desviaciones típicas de la media está un dato. Con ella se comparan datos de grupos distintos.',
            'الدرجة المعيارية ${z}=\\frac{x-\\bar{x}}{\\sigma}$ تقول على بعد كم انحراف معياري من المتوسط يقع البيان. وبها نقارن بيانات من مجموعات مختلفة.',
            'The standard score ${z}=\\frac{x-\\bar{x}}{\\sigma}$ tells you how many standard deviations a datum is from the mean. With it you compare data from different groups.'
        ),
        figure: (language) => <StandardScoreFigure language={language} />
    },
    {
        id: 'transform-data',
        stage: 'interpretation',
        title: say('Datuak aldatzea', 'Transformar los datos', 'تحويل البيانات', 'Transforming the data'),
        goal: say('Jakitea nola aldatzen diren batez bestekoa eta desbideratze tipikoa datuei zenbaki bat batzean, datuak biderkatzean edo datu berriak gehitzean.', 'Saber cómo cambian la media y la desviación típica al sumar un número a los datos, al multiplicarlos o al añadir datos nuevos.', 'معرفة كيف يتغير المتوسط والانحراف المعياري عند إضافة عدد إلى البيانات أو ضربها أو إضافة بيانات جديدة.', 'Know how the mean and the standard deviation change when you add a number to the data, multiply them or add new data.'),
        needs: [need.cv],
        problem: say('Tenperatura batzuen batez bestekoa $\\bar{x}=20$ °C da, eta $\\sigma=5$ °C. Fahrenheit gradutan, $F=1{,}8\\,C+32$. Zenbat dira batez bestekoa eta $\\sigma$ °F-tan?', 'Unas temperaturas tienen $\\bar{x}=20$ °C y $\\sigma=5$ °C. En grados Fahrenheit, $F=1{,}8\\,C+32$. ¿Cuánto valen la media y $\\sigma$ en °F?', 'لدرجات حرارة متوسط $\\bar{x}=20$ °C و$\\sigma=5$ °C. وبالفهرنهايت $F=1{,}8\\,C+32$. كم يساوي المتوسط و$\\sigma$ بالفهرنهايت؟', 'Some temperatures have $\\bar{x}=20$ °C and $\\sigma=5$ °C. In degrees Fahrenheit, $F=1{,}8\\,C+32$. What are the mean and $\\sigma$ in °F?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batez bestekoak datuen aldaketa bera jasaten du.', 'La media sufre el mismo cambio que los datos.', 'يخضع المتوسط للتغيير نفسه الذي تخضع له البيانات.', 'The mean undergoes the same change as the data.'), math: same('$1{,}8\\cdot 20+32=68$') },
            { text: say('32 batzeak ez du sakabanatzea aldatzen; 1,8 bider egiteak, bai.', 'Sumar 32 no cambia la dispersión; multiplicar por 1,8, sí.', 'إضافة 32 لا تغيّر التشتت، أما الضرب في 1.8 فيغيّره.', 'Adding 32 does not change the spread; multiplying by 1.8 does.'), math: same('$\\sigma_F=1{,}8\\cdot 5=9$') },
            { text: say('°F-tan: batez bestekoa 68 eta desbideratze tipikoa 9.', 'En °F: media 68 y desviación típica 9.', 'بالفهرنهايت: المتوسط 68 والانحراف المعياري 9.', 'In °F: mean 68 and standard deviation 9.') }
        ],
        takeaway: say(
            '$y=a\\,x+b$ bada, $\\bar{y}=a\\,\\bar{x}+b$ eta $\\sigma_y=|a|\\,\\sigma_x$: batzeak batez bestekoa mugitzen du, baina ez sakabanatzea.',
            'Si $y=a\\,x+b$, entonces $\\bar{y}=a\\,\\bar{x}+b$ y $\\sigma_y=|a|\\,\\sigma_x$: sumar mueve la media pero no la dispersión.',
            'إذا كان $y=a\\,x+b$ فإن $\\bar{y}=a\\,\\bar{x}+b$ و$\\sigma_y=|a|\\,\\sigma_x$: الجمع يحرّك المتوسط لا التشتت.',
            'If $y=a\\,x+b$, then $\\bar{y}=a\\,\\bar{x}+b$ and $\\sigma_y=|a|\\,\\sigma_x$: adding moves the mean but not the spread.'
        ),
        figure: (language) => <TransformFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const bachStatsTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...bachStatsLessonTexts[topic.id as BachStatsTopicId], ...bachStatsLessonChecks[topic.id as BachStatsTopicId] }))
