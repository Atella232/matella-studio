import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { HistogramFigure, SampleFigure } from '../dbh2-estatistika-v2/figures'
import {
    CardsTreeFigure,
    ContingencyFigure,
    CorrelationFigure,
    GroupedMeanFigure,
    IntervalsFigure,
    PercentilesFigure,
    RegressionFigure,
    ScatterFigure,
    TableDeviationFigure,
    UnionFigure,
    VarianceFigure,
    VariationFigure,
    WhiskersFigure
} from './figures'
import { statisticsLessonChecks, type StatisticsTopicId } from './lessonChecks'
import { statisticsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Estatistika eta probabilitatea · 4. DBH aplikatuak — stages and lessons,
   following Santillana Aplicadas unit 9 (population and sample, tables and
   graphs, centralization and dispersion, two-variable distributions,
   relative frequency, Laplace, union of events, conditional probability)
   and Anaya Aplicadas units 11 (tables in intervals, x̄ and σ, C.V.,
   percentiles, box plots, sampling), 12 (correlation and regression) and
   13 (Laplace, trees, contingency tables). It builds on the 2. DBH unit
   (cumulative and grouped frequencies, mean deviation, quartiles) and goes
   on to variance and standard deviation, the coefficient of variation,
   percentiles, outliers, two variables and dependent experiments.
   ========================================================================== */

export type StatisticsStageId = 'data' | 'centre' | 'spread' | 'two' | 'chance'

export const statisticsStages: UnitStage[] = [
    { id: 'data', tone: 'blue', title: { eu: 'Datuak eta grafikoak', es: 'Datos y gráficos', en: 'Data and charts', ar: 'البيانات والتمثيلات' } },
    { id: 'centre', tone: 'violet', title: { eu: 'Zentralizazioa eta posizioa', es: 'Centralización y posición', en: 'Central tendency and position', ar: 'النزعة المركزية والموقع' } },
    { id: 'spread', tone: 'mustard', title: { eu: 'Sakabanaketa', es: 'Dispersión', en: 'Spread', ar: 'التشتت' } },
    { id: 'two', tone: 'coral', title: { eu: 'Bi aldagai', es: 'Dos variables', en: 'Two variables', ar: 'متغيران' } },
    { id: 'chance', tone: 'green', title: { eu: 'Probabilitatea', es: 'Probabilidad', en: 'Probability', ar: 'الاحتمال' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Data and graphs ---------- */
    {
        id: 'sampling',
        stage: 'data',
        needs: [{ unit: 'dbh3/estadistica-probabilidad', topic: 'population-sample', title: { eu: 'Populazioa, lagina eta aldagaiak', es: 'Población, muestra y variables', en: 'Population, sample and variables', ar: 'المجتمع والعيّنة والمتغيّرات' } }],
        title: say('Populazioa, lagina eta aldagaiak', 'Población, muestra y variables', 'المجتمع والعيّنة والمتغيرات', 'Population, sample and variables'),
        goal: say('Noiz behar den lagin bat erabakitzea, lagin bat baliozkoa den epaitzea eta aldagaiak sailkatzea.', 'Decidir cuándo hace falta una muestra, juzgar si una muestra es válida y clasificar las variables.', 'تقرير متى نحتاج إلى عيّنة، والحكم على صلاحية عيّنة، وتصنيف المتغيرات.', 'Decide when a sample is needed, judge whether a sample is valid and classify the variables.'),
        stepsKind: 'facts',
        steps: [
            { title: say('Populazio osoa', 'Toda la población', 'المجتمع كله', 'The whole population'), text: say('Mintegi bateko 285 landareak neur daitezke denak: ez da laginik behar.', 'Las 285 plantas de un vivero se pueden medir todas: no hace falta muestra.', 'يمكن قياس نباتات المشتل الـ285 كلها: لا حاجة إلى عيّنة.', 'All 285 plants in a nursery can be measured: no sample is needed.') },
            { title: say('Lagina derrigorrez', 'Muestra obligada', 'عيّنة لا بدّ منها', 'Sample required'), text: say('Pilen iraupena edo torlojuen erresistentzia: azterketak hondatu egiten ditu.', 'La duración de las pilas o la resistencia de los tornillos: el estudio los estropea.', 'مدة البطاريات أو مقاومة البراغي: الدراسة تُتلفها.', 'The battery life or the strength of screws: the study destroys them.') },
            { title: say('Lagin baliogabea', 'Muestra no válida', 'عيّنة غير صالحة', 'Invalid sample'), text: say('Alkateak aukeratutako 200 lagun: hautaketa subjektiboa da, ez zorizkoa.', 'Las 200 personas que elige el alcalde: la selección es subjetiva, no al azar.', '200 شخص يختارهم رئيس البلدية: الاختيار ذاتي لا عشوائي.', 'The 200 people chosen by the mayor: the selection is subjective, not random.') }
        ],
        takeaway: say('Lagina zoriz eta talde guztiekin: horrela bakarrik balio du populazioaz hitz egiteko.', 'La muestra, al azar y con todos los grupos: solo así sirve para hablar de la población.', 'العيّنة عشوائية ومن كل الفئات: هكذا فقط تصلح للحديث عن المجتمع.', 'A sample that is random and includes all groups: only then can it tell us about the population.'),
        figure: (language) => <SampleFigure language={language} />
    },
    {
        id: 'intervals',
        stage: 'data',
        needs: [{ unit: 'dbh3/estadistica-probabilidad', topic: 'grouped-data', title: { eu: 'Tarteetan multzokatutako datuak', es: 'Datos agrupados en intervalos', en: 'Data grouped in intervals', ar: 'البيانات المجمّعة في فترات' } }],
        figureAfterSteps: true,
        title: say('Tarteetako taulak', 'Tablas con intervalos', 'الجداول بالفئات', 'Tables with intervals'),
        goal: say('Datu asko tarteetan antolatzea: ibiltartea, tarte kopurua, zabalera eta klase-markak.', 'Organizar muchos datos en intervalos: recorrido, número de intervalos, amplitud y marcas de clase.', 'تنظيم بيانات كثيرة في فئات: المدى وعدد الفئات وطولها ومراكزها.', 'Organise a lot of data into intervals: range, number of intervals, class width and class marks.'),
        problem: say('40 ikasleren altuerak 148 cm-tik 177 cm-ra doaz. Antolatu 6 tartetan.', 'Las alturas de 40 alumnos van de 148 cm a 177 cm. Organízalas en 6 intervalos.', 'تمتد أطوال 40 تلميذًا من 148 سم إلى 177 سم. نظّمها في 6 فئات.', 'The heights of 40 students range from 148 cm to 177 cm. Organise them into 6 intervals.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ibiltartea, eta 6 zenbakiarekin zatigarria den $r\'$.', 'Recorrido, y un $r\'$ divisible entre 6.', 'المدى، و$r\'$ يقبل القسمة على 6.', 'Range, and an $r\'$ divisible by 6.'), math: same('$177-148=29\\ \\to\\ r\'=30$') },
            { text: say('Zabalera.', 'Amplitud.', 'طول الفئة.', 'Width.'), math: same('$30:6=5$') },
            { text: say('Soberakina 1 da: hasi 0,5 lehenago.', 'El exceso es 1: empieza 0,5 antes.', 'الفائض 1: ابدأ قبل 0.5.', 'The excess is 1: it starts 0.5 earlier.'), math: same('$147{,}5-152{,}5-\\ldots-177{,}5$') }
        ],
        takeaway: say('Ibiltartea, tarte kopurua, zabalera; hasi txikiena baino apur bat lehenago eta kalkulatu klase-markak.', 'Recorrido, número de intervalos, amplitud; empieza un poco antes del menor y calcula las marcas de clase.', 'المدى، عدد الفئات، الطول؛ ابدأ قبل الأصغر بقليل واحسب مراكز الفئات.', 'Range, number of intervals, class width; start a little before the smallest value and calculate the class marks.'),
        figure: (language) => <IntervalsFigure language={language} />
    },
    {
        id: 'charts',
        stage: 'data',
        title: say('Grafiko egokia', 'El gráfico adecuado', 'التمثيل المناسب', 'The right graph'),
        goal: say('Aldagai bakoitzerako grafiko egokia aukeratzea eta histograma bat irakurtzea.', 'Elegir el gráfico adecuado para cada variable y leer un histograma.', 'اختيار التمثيل المناسب لكل متغير وقراءة مدرّج تكراري.', 'Choose the right graph for each variable and read a histogram.'),
        problem: say('30 ikasleren altuerak: $[140,150)$ 3, $[150,160)$ 9, $[160,170)$ 12, $[170,180)$ 6. Zein grafiko? Zer ehuneko dago 160 cm-tik behera?', 'Alturas de 30 alumnos: $[140,150)$ 3, $[150,160)$ 9, $[160,170)$ 12, $[170,180)$ 6. ¿Qué gráfico? ¿Qué porcentaje mide menos de 160 cm?', 'أطوال 30 تلميذًا: $[140,150)$ 3، $[150,160)$ 9، $[160,170)$ 12، $[170,180)$ 6. أي تمثيل؟ ما نسبة من طولهم أقل من 160 سم؟', 'Heights of 30 students: $[140,150)$ 3, $[150,160)$ 9, $[160,170)$ 12, $[170,180)$ 6. Which graph? What percentage are under 160 cm tall?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Aldagai jarraitua tarteetan: histograma.', 'Variable continua en intervalos: histograma.', 'متغير متصل في فئات: مدرّج تكراري.', 'Continuous variable in intervals: histogram.') },
            { text: say('160 baino gutxiago: lehen bi tarteak.', 'Menos de 160: los dos primeros intervalos.', 'أقل من 160: الفئتان الأوليان.', 'Under 160: the first two intervals.'), math: same('$3+9=12$') },
            { text: say('Ehunekoa.', 'Porcentaje.', 'النسبة المئوية.', 'Percentage.'), math: same('$\\frac{12}{30}\\cdot 100=40$') }
        ],
        takeaway: say('Kualitatiboa: barrak edo sektoreak. Diskretua: barrak. Tarteak: histograma. Denbora: lerroak.', 'Cualitativa: barras o sectores. Discreta: barras. Intervalos: histograma. Tiempo: líneas.', 'نوعي: أعمدة أو قطاعات. منفصل: أعمدة. فئات: مدرّج. زمن: خطوط.', 'Qualitative: bar chart or pie chart. Discrete: bar chart. Intervals: histogram. Time: line graph.'),
        figure: (language) => <HistogramFigure language={language} />
    },

    /* ---------- 2. Centralization and position ---------- */
    {
        id: 'central',
        stage: 'centre',
        figureAfterSteps: true,
        title: say('Batez bestekoa, mediana eta moda', 'Media, mediana y moda', 'المتوسط والوسيط والمنوال', 'Mean, median and mode'),
        goal: say('Taula baten zentralizazio-parametroak kalkulatzea, datuak tarteetan daudenean ere.', 'Calcular los parámetros de centralización de una tabla, también cuando los datos están en intervalos.', 'حساب مقاييس النزعة المركزية لجدول، حتى عندما تكون البيانات في فئات.', 'Calculate the measures of central tendency from a table, including when the data are in intervals.'),
        problem: say('40 ikasleren altuerak 6 tartetan, klase-markak 150, 155, 160, 165, 170 eta 175, maiztasunak 2, 5, 10, 12, 8 eta 3. Kalkulatu $\\bar{x}$, Me eta Mo.', 'Alturas de 40 alumnos en 6 intervalos, marcas de clase 150, 155, 160, 165, 170 y 175, frecuencias 2, 5, 10, 12, 8 y 3. Calcula $\\bar{x}$, Me y Mo.', 'أطوال 40 تلميذًا في 6 فئات، مراكزها 150 و155 و160 و165 و170 و175، وتكراراتها 2 و5 و10 و12 و8 و3. احسب $\\bar{x}$ وMe وMo.', 'Heights of 40 students in 6 intervals, class marks 150, 155, 160, 165, 170 and 175, frequencies 2, 5, 10, 12, 8 and 3. Calculate $\\bar{x}$, Med and Mo.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batu $f_i x_i$ zutabea.', 'Suma la columna $f_i x_i$.', 'اجمع العمود $f_i x_i$.', 'Add up the column $f_i x_i$.'), math: same('$\\sum f_i x_i=6540$') },
            { text: say('Zatitu $N$-z.', 'Divide entre $N$.', 'اقسم على $N$.', 'Divide by $N$.'), math: same('$\\bar{x}=6540:40=163{,}5$') },
            { text: say('Metatuak 2, 7, 17, 29…: 20. eta 21. datuak 165 klase-marka duen tartean. Tarte modala ere bai.', 'Acumuladas 2, 7, 17, 29…: los datos 20.º y 21.º, en el intervalo del 165. También es el modal.', 'المتجمّعة 2، 7، 17، 29…: البيانان 20 و21 في فئة 165. وهي أيضًا المنوالية.', 'Cumulative: 2, 7, 17, 29…: the 20th and 21st data are in the 165 class. It is also the modal class.'), math: same('$\\text{Me}\\approx\\text{Mo}\\approx 165$') }
        ],
        takeaway: say('Batez bestekoa: balio bider maiztasun, batu eta zatitu. Tarteetan, klase-markak erabili.', 'Media: valor por frecuencia, suma y divide. En intervalos, usa las marcas de clase.', 'المتوسط: القيمة في التكرار، اجمع واقسم. وفي الفئات استعمل المراكز.', 'Mean: value times frequency, add and divide. For intervals, use the class marks.'),
        figure: (language) => <GroupedMeanFigure language={language} />
    },
    {
        id: 'percentiles',
        stage: 'centre',
        needs: [{ unit: 'dbh3/estadistica-probabilidad', topic: 'range-quartiles', title: { eu: 'Ibiltartea eta kuartilak', es: 'Recorrido y cuartiles', en: 'Range and quartiles', ar: 'المدى والربيعيات' } }],
        figureAfterSteps: true,
        title: say('Kuartilak eta pertzentilak', 'Cuartiles y percentiles', 'الربيعيات والمئينات', 'Quartiles and percentiles'),
        goal: say('Ehuneko metatuak dituen taula batetik kuartilak eta edozein pertzentil aurkitzea.', 'Hallar los cuartiles y cualquier percentil a partir de una tabla con los porcentajes acumulados.', 'إيجاد الربيعيات وأي مئين انطلاقًا من جدول بالنسب المتجمّعة.', 'Find the quartiles and any percentile from a table of cumulative percentages.'),
        problem: say('25 familiaren autoak: 0 → 3, 1 → 12, 2 → 4, 3 → 4, 4 → 2. Aurkitu $Q_1$, Me, $Q_3$ eta $p_{90}$.', 'Coches de 25 familias: 0 → 3, 1 → 12, 2 → 4, 3 → 4, 4 → 2. Halla $Q_1$, Me, $Q_3$ y $p_{90}$.', 'سيارات 25 أسرة: 0 ← 3، 1 ← 12، 2 ← 4، 3 ← 4، 4 ← 2. أوجد $Q_1$ وMe و$Q_3$ و$p_{90}$.', 'Cars owned by 25 families: 0 → 3, 1 → 12, 2 → 4, 3 → 4, 4 → 2. Find $Q_1$, Med, $Q_3$ and $p_{90}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Metatuak eta ehunekoak.', 'Acumuladas y porcentajes.', 'المتجمّعة والنسب.', 'Cumulative counts and percentages.'), math: same('$12,\\ 60,\\ 76,\\ 92,\\ 100$') },
            { text: say('25 eta 50 gainditzen dira 1 balioan; 75, 2 balioan.', 'El 25 y el 50 se superan en el 1; el 75, en el 2.', '25 و50 تُتجاوزان عند 1؛ و75 عند 2.', 'The 25 and 50 are passed at 1; the 75 at 2.'), math: same('$Q_1=\\text{Me}=1\\qquad Q_3=2$') },
            { text: say('90 gainditzen da 3 balioan.', 'El 90 se supera en el 3.', '90 تُتجاوز عند 3.', 'The 90 is passed at 3.'), math: same('$p_{90}=3$') }
        ],
        takeaway: say('Pertzentila: ehuneko metatuak k lehen aldiz gainditzen duen balioa.', 'Percentil: el primer valor cuyo porcentaje acumulado supera k.', 'المئين: أول قيمة تتجاوز نسبتها المتجمّعة k.', 'Percentile: the first value whose cumulative percentage exceeds k.'),
        figure: (language) => <PercentilesFigure language={language} />
    },
    {
        id: 'box-plot',
        stage: 'centre',
        figureAfterSteps: true,
        title: say('Kutxa-diagrama eta datu atipikoak', 'Diagrama de caja y datos atípicos', 'مخطط الصندوق والبيانات الشاذة', 'Box plot and outliers'),
        goal: say('Kutxa eta bibote diagrama egitea, datu atipikoak bereiztea eta bi banaketa konparatzea.', 'Construir el diagrama de caja y bigotes, separar los datos atípicos y comparar dos distribuciones.', 'بناء مخطط الصندوق والشاربين، وفصل البيانات الشاذة، ومقارنة توزيعين.', 'Construct the box plot, separate the outliers and compare two distributions.'),
        problem: say('14 ikasleren altuerak: 150, 158, 169, 171, 172, 172, 175, 176, 177, 179, 181, 182, 183, 184. Egin kutxa-diagrama.', 'Alturas de 14 alumnos: 150, 158, 169, 171, 172, 172, 175, 176, 177, 179, 181, 182, 183, 184. Haz el diagrama de caja.', 'أطوال 14 تلميذًا: 150، 158، 169، 171، 172، 172، 175، 176، 177، 179، 181، 182، 183، 184. ارسم مخطط الصندوق.', 'Heights of 14 students: 150, 158, 169, 171, 172, 172, 175, 176, 177, 179, 181, 182, 183, 184. Draw the box plot.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$14\\cdot 0{,}25=3{,}5$ → 4.a; $14:2=7$ → 7.a eta 8.a.', '$14\\cdot 0{,}25=3{,}5$ → 4.º; $14:2=7$ → 7.º y 8.º.', '$14\\cdot 0{,}25=3{,}5$ ← الرابع؛ $14:2=7$ ← السابع والثامن.', '$14\\cdot 0{,}25=3{,}5$ → 4th; $14:2=7$ → 7th and 8th.'), math: same('$Q_1=171\\quad \\text{Me}=175{,}5\\quad Q_3=181$') },
            { text: say('Kutxa bider 1,5.', 'La caja por 1,5.', 'الصندوق في 1.5.', 'The box times 1.5.'), math: same('$(181-171)\\cdot 1{,}5=15$') },
            { text: say('Mugak 156 eta 196: biboteak 158 eta 184 balioetaraino; 150 atipikoa.', 'Límites 156 y 196: bigotes hasta 158 y 184; 150 es atípico.', 'الحدّان 156 و196: الشاربان حتى 158 و184؛ و150 شاذ.', 'Limits 156 and 196: whiskers up to 158 and 184; 150 is an outlier.'), math: same('$171-15=156$') }
        ],
        takeaway: say('Biboteak gehienez kutxa bider 1,5; kanpoan geratzen dena atipikoa da.', 'Bigotes como mucho 1,5 veces la caja; lo que queda fuera es atípico.', 'الشاربان على الأكثر 1.5 مرة الصندوق؛ وما يبقى خارجًا شاذ.', 'Whiskers at most 1.5 times the box; anything outside is an outlier.'),
        figure: (language) => <WhiskersFigure language={language} />
    },

    /* ---------- 3. Dispersion ---------- */
    {
        id: 'variance',
        stage: 'spread',
        needs: [{ unit: 'dbh3/estadistica-probabilidad', topic: 'variance', title: { eu: 'Bariantza eta desbideratze tipikoa', es: 'Varianza y desviación típica', en: 'Variance and standard deviation', ar: 'التباين والانحراف المعياري' } }],
        figureAfterSteps: true,
        title: say('Bariantza eta desbideratze tipikoa', 'Varianza y desviación típica', 'التباين والانحراف المعياري', 'Variance and standard deviation'),
        goal: say('Datu-zerrenda baten bariantza eta desbideratze tipikoa kalkulatzea eta interpretatzea.', 'Calcular e interpretar la varianza y la desviación típica de una lista de datos.', 'حساب التباين والانحراف المعياري لقائمة بيانات وتفسيرهما.', 'Calculate and interpret the variance and standard deviation of a list of data.'),
        problem: say('A taldearen notak 4, 6, 7, 8, 10 dira eta B-renak 6, 7, 7, 7, 8. Bien batez bestekoa 7 da. Kalkulatu $\\sigma$ bakoitza.', 'Las notas del grupo A son 4, 6, 7, 8, 10 y las del B, 6, 7, 7, 7, 8. Los dos tienen media 7. Calcula cada $\\sigma$.', 'علامات المجموعة أ: 4، 6، 7، 8، 10، وعلامات ب: 6، 7، 7، 7، 8. لكليهما المتوسط 7. احسب $\\sigma$ لكل منهما.', 'Group A\'s marks are 4, 6, 7, 8, 10 and B\'s are 6, 7, 7, 7, 8. Both have a mean of 7. Calculate each $\\sigma$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('A-ren desbideratzeak eta karratuak.', 'Desviaciones de A y sus cuadrados.', 'انحرافات أ ومربعاتها.', 'A\'s deviations and their squares.'), math: same('$9+1+0+1+9=20$') },
            { text: say('Bariantza eta erroa.', 'Varianza y raíz.', 'التباين والجذر.', 'Variance and square root.'), math: same('$\\sigma^2=\\frac{20}{5}=4\\qquad \\sigma=2$') },
            { text: say('B: karratuak 1, 0, 0, 0, 1.', 'B: cuadrados 1, 0, 0, 0, 1.', 'ب: المربعات 1، 0، 0، 0، 1.', 'B: squares 1, 0, 0, 0, 1.'), math: same('$\\sigma^2=\\frac{2}{5}=0{,}4$') }
        ],
        takeaway: say('Bariantza: desbideratzeen karratuen batez bestekoa. Desbideratze tipikoa: haren erroa, datuen unitateetan.', 'Varianza: media de los cuadrados de las desviaciones. Desviación típica: su raíz, en las unidades de los datos.', 'التباين: متوسط مربعات الانحرافات. الانحراف المعياري: جذره، بوحدات البيانات.', 'Variance: mean of the squared deviations. Standard deviation: its square root, in the units of the data.'),
        figure: (language) => <VarianceFigure language={language} />
    },
    {
        id: 'table-sd',
        stage: 'spread',
        figureAfterSteps: true,
        title: say('Desbideratze tipikoa taula batetik', 'Desviación típica desde una tabla', 'الانحراف المعياري من جدول', 'Standard deviation from a table'),
        goal: say('Maiztasun-taula baten $\\sigma$ kalkulatzea formula laburrarekin eta kalkulagailuarekin.', 'Calcular la $\\sigma$ de una tabla de frecuencias con la fórmula abreviada y con la calculadora.', 'حساب $\\sigma$ لجدول تكرارات بالصيغة المختصرة وبالآلة الحاسبة.', 'Calculate $\\sigma$ of a frequency table using the shortcut formula and the calculator.'),
        problem: say('Diktaketa bateko akatsak: 0 → 12 ikasle, 1 → 9, 2 → 7, 3 → 6, 4 → 3, 5 → 3. Kalkulatu $\\bar{x}$ eta $\\sigma$.', 'Faltas en un dictado: 0 → 12 alumnos, 1 → 9, 2 → 7, 3 → 6, 4 → 3, 5 → 3. Calcula $\\bar{x}$ y $\\sigma$.', 'أخطاء في إملاء: 0 ← 12 تلميذًا، 1 ← 9، 2 ← 7، 3 ← 6، 4 ← 3، 5 ← 3. احسب $\\bar{x}$ و$\\sigma$.', 'Spelling mistakes in a dictation: 0 → 12 students, 1 → 9, 2 → 7, 3 → 6, 4 → 3, 5 → 3. Calculate $\\bar{x}$ and $\\sigma$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batu zutabeak.', 'Suma las columnas.', 'اجمع العمودين.', 'Add up the columns.'), math: same('$\\sum f_i x_i=68\\quad \\sum f_i x_i^2=214$') },
            { text: say('Batez bestekoa.', 'Media.', 'المتوسط.', 'Mean.'), math: same('$\\bar{x}=\\frac{68}{40}=1{,}7$') },
            { text: say('Bariantza eta $\\sigma$.', 'Varianza y $\\sigma$.', 'التباين و$\\sigma$.', 'Variance and $\\sigma$.'), math: same('$\\frac{214}{40}-1{,}7^{2}=2{,}46$') }
        ],
        takeaway: say('Bariantza = karratuen batez bestekoa ken batez bestekoaren karratua.', 'Varianza = media de los cuadrados menos el cuadrado de la media.', 'التباين = متوسط المربعات ناقص مربع المتوسط.', 'Variance = mean of the squares minus the square of the mean.'),
        figure: (language) => <TableDeviationFigure language={language} />
    },
    {
        id: 'cv',
        stage: 'spread',
        figureAfterSteps: true,
        title: say('Aldakuntza-koefizientea', 'Coeficiente de variación', 'معامل الاختلاف', 'Coefficient of variation'),
        goal: say('Batez besteko oso desberdinak dituzten banaketen sakabanaketa aldakuntza-koefizientearekin konparatzea.', 'Comparar la dispersión de distribuciones con medias muy distintas mediante el coeficiente de variación.', 'مقارنة تشتت توزيعات لها متوسطات مختلفة جدًا بمعامل الاختلاف.', 'Compare the spread of distributions with very different means using the coefficient of variation.'),
        problem: say('A enpresaren hileko gastuak: $\\bar{x}=100\\,000$ €, $\\sigma=12\\,500$ €. B-renak: $\\bar{x}=15\\,000$ €, $\\sigma=2500$ €. Zeinek du aldakuntza erlatibo handiagoa?', 'Gastos mensuales de la empresa A: $\\bar{x}=100\\,000$ €, $\\sigma=12\\,500$ €. Los de B: $\\bar{x}=15\\,000$ €, $\\sigma=2500$ €. ¿Cuál tiene más variación relativa?', 'المصاريف الشهرية للشركة A: $\\bar{x}=100\\,000$ €، $\\sigma=12\\,500$ €. وللشركة B: $\\bar{x}=15\\,000$ €، $\\sigma=2500$ €. أيهما اختلافها النسبي أكبر؟', 'Monthly costs of company A: $\\bar{x}=100\\,000$ €, $\\sigma=12\\,500$ €. Company B\'s: $\\bar{x}=15\\,000$ €, $\\sigma=2500$ €. Which has more relative variation?'),
        stepsKind: 'steps',
        steps: [
            { text: say('A enpresa.', 'Empresa A.', 'الشركة A.', 'Company A.'), math: same('$\\frac{12\\,500}{100\\,000}=0{,}125$') },
            { text: say('B enpresa.', 'Empresa B.', 'الشركة B.', 'Company B.'), math: same('$\\frac{2500}{15\\,000}\\approx 0{,}167$') },
            { text: say('B-k du handiena: % 16,7 inguru; A-k, % 12,5.', 'B tiene el mayor: un 16,7 % aproximadamente, frente al 12,5 % de A.', 'لـB الأكبر: نحو 16.7 % مقابل 12.5 % لـA.', 'B has the larger one: about 16.7%, compared with 12.5% for A.') }
        ],
        takeaway: say('CV = desbideratze tipikoa zati batez bestekoa: sakabanaketa erlatiboa, unitaterik gabe.', 'CV = desviación típica entre media: la dispersión relativa, sin unidades.', 'CV = الانحراف المعياري على المتوسط: التشتت النسبي، بلا وحدات.', 'CV = standard deviation divided by mean: the relative spread, with no units.'),
        figure: (language) => <VariationFigure language={language} />
    },

    /* ---------- 4. Two variables ---------- */
    {
        id: 'scatter',
        stage: 'two',
        figureAfterSteps: true,
        title: say('Banaketa bidimentsionalak', 'Distribuciones bidimensionales', 'التوزيعات ثنائية البعد', 'Two-variable distributions'),
        goal: say('Bi aldagai batera aztertzea eta puntu-hodeia marraztea eta irakurtzea.', 'Estudiar dos variables a la vez y dibujar y leer la nube de puntos.', 'دراسة متغيرين معًا ورسم سحابة النقاط وقراءتها.', 'Study two variables at the same time and draw and read the scatter plot.'),
        problem: say('10 ikasleren asteko ikasketa-orduak eta nota: (1, 3), (2, 4), (2, 5), (3, 5), (4, 6), (5, 6), (5, 8), (6, 7), (7, 9), (8, 9). Marraztu hodeia.', 'Horas de estudio semanales y nota de 10 alumnos: (1, 3), (2, 4), (2, 5), (3, 5), (4, 6), (5, 6), (5, 8), (6, 7), (7, 9), (8, 9). Dibuja la nube.', 'ساعات الدراسة الأسبوعية وعلامة 10 تلاميذ: (1, 3)، (2, 4)، (2, 5)، (3, 5)، (4, 6)، (5, 6)، (5, 8)، (6, 7)، (7, 9)، (8, 9). ارسم السحابة.', 'Weekly study hours and marks of 10 students: (1, 3), (2, 4), (2, 5), (3, 5), (4, 6), (5, 6), (5, 8), (6, 7), (7, 9), (8, 9). Draw the scatter plot.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$X$ ardatzean orduak; $Y$ ardatzean nota.', 'En el eje $X$, las horas; en el eje $Y$, la nota.', 'على المحور $X$ الساعات، وعلى المحور $Y$ العلامة.', 'On the $X$-axis, the hours; on the $Y$-axis, the mark.') },
            { text: say('Ikasle bakoitza puntu bat da.', 'Cada alumno es un punto.', 'كل تلميذ نقطة.', 'Each student is one point.'), math: same('$(5,\\ 8)$') },
            { text: say('Puntuak gorantz doan marra baten inguruan: korrelazio positiboa.', 'Los puntos, alrededor de una línea que sube: correlación positiva.', 'النقاط حول خط صاعد: ارتباط موجب.', 'The points lie around a rising line: positive correlation.') }
        ],
        takeaway: say('Banako bakoitza puntu bat da; hodeiaren itxurak esaten du aldagaiak erlazionatuta dauden.', 'Cada individuo es un punto; la forma de la nube dice si las variables están relacionadas.', 'كل فرد نقطة؛ وشكل السحابة يبيّن هل المتغيران مرتبطان.', 'Each individual is a point; the shape of the cloud shows whether the variables are related.'),
        figure: (language) => <ScatterFigure language={language} />
    },
    {
        id: 'correlation',
        stage: 'two',
        title: say('Korrelazioa', 'Correlación', 'الارتباط', 'Correlation'),
        goal: say('Korrelazioa positiboa ala negatiboa den eta sendoa ala ahula den esatea, eta korrelazio-koefizientea esleitzea.', 'Decir si la correlación es positiva o negativa, fuerte o débil, y asignar el coeficiente de correlación.', 'تحديد هل الارتباط موجب أو سالب، قوي أو ضعيف، وإسناد معامل الارتباط.', 'Say whether the correlation is positive or negative, strong or weak, and find the correlation coefficient.'),
        stepsKind: 'facts',
        steps: [
            { title: say('Positiboa eta sendoa', 'Positiva y fuerte', 'موجب وقوي', 'Positive and strong'), text: say('Ahurraren neurria eta oinarena: $r$ 1 baliotik hurbil.', 'La medida del palmo y la del pie: $r$ cerca de 1.', 'طول الشبر وطول القدم: $r$ قريب من 1.', 'Hand span and foot length: $r$ close to 1.'), math: same('$r\\approx 0{,}9$') },
            { title: say('Negatiboa', 'Negativa', 'سالب', 'Negative'), text: say('Ikasketa-orduak eta suspentsoak: batak gora, besteak behera.', 'Horas de estudio y suspensos: una sube y la otra baja.', 'ساعات الدراسة والرسوب: أحدهما يصعد والآخر يهبط.', 'Study hours and failed subjects: one goes up, the other goes down.'), math: same('$r\\approx -0{,}8$') },
            { title: say('Ia nulua', 'Casi nula', 'شبه منعدم', 'Almost zero'), text: say('Pisua eta matematikako nota: ez dago erlaziorik.', 'El peso y la nota de matemáticas: no hay relación.', 'الوزن وعلامة الرياضيات: لا علاقة.', 'Weight and maths mark: there is no relationship.'), math: same('$r\\approx 0$') }
        ],
        takeaway: say('Zeinuak noranzkoa ematen du; 1 edo −1 baliotik zenbat eta hurbilago, orduan eta sendoagoa.', 'El signo da el sentido; cuanto más cerca de 1 o de −1, más fuerte.', 'الإشارة تعطي الاتجاه؛ وكلما اقترب من 1 أو −1 كان أقوى.', 'The sign gives the direction; the closer to 1 or −1, the stronger.'),
        figure: (language) => <CorrelationFigure language={language} />
    },
    {
        id: 'regression',
        stage: 'two',
        needs: [{ unit: 'dbh4-aplikatuak/grafica-funcion', topic: 'affine', title: { eu: 'Funtzio linealak eta konstanteak', es: 'Funciones lineales y constantes', en: 'Linear and constant functions', ar: 'الدوال الخطية والثابتة' } }],
        figureAfterSteps: true,
        title: say('Erregresio-zuzena eta estimazioak', 'Recta de regresión y estimaciones', 'مستقيم الانحدار والتقديرات', 'Regression line and estimates'),
        goal: say('Erregresio-zuzena estimazioak egiteko erabiltzea eta estimazio horien fidagarritasuna epaitzea.', 'Usar la recta de regresión para hacer estimaciones y juzgar su fiabilidad.', 'استعمال مستقيم الانحدار لإجراء تقديرات والحكم على موثوقيتها.', 'Use the regression line to make estimates and judge how reliable they are.'),
        problem: say('8 egunetan eguzki-orduak ($x$) eta tenperatura maximoa ($y$, °C) neurtu dira, 0 eta 10 ordu artean. Erregresio-zuzena $\\hat{y}=0{,}5x+8$ da. Estimatu tenperatura 7 eguzki-ordurekin.', 'En 8 días se han medido las horas de sol ($x$) y la temperatura máxima ($y$, °C), entre 0 y 10 horas. La recta de regresión es $\\hat{y}=0{,}5x+8$. Estima la temperatura con 7 horas de sol.', 'قيست في 8 أيام ساعات الشمس ($x$) ودرجة الحرارة القصوى ($y$، °C)، بين 0 و10 ساعات. مستقيم الانحدار $\\hat{y}=0{,}5x+8$. قدّر الحرارة مع 7 ساعات شمس.', 'Over 8 days, the hours of sunshine ($x$) and the maximum temperature ($y$, °C) were recorded, with sunshine from 0 to 10 hours. The regression line is $\\hat{y}=0{,}5x+8$. Estimate the temperature with 7 hours of sunshine.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu $x=7$.', 'Sustituye $x=7$.', 'عوّض $x=7$.', 'Substitute $x=7$.'), math: same('$0{,}5\\cdot 7+8=11{,}5$') },
            { text: say('7 datuen tartean dago eta $r\\approx 0{,}87$: fidagarria.', '7 está dentro del intervalo y $r\\approx 0{,}87$: fiable.', '7 داخل المجال و$r\\approx 0{,}87$: موثوق.', '7 is within the range and $r\\approx 0{,}87$: reliable.') },
            { text: say('20 ordurekin: tartetik kanpo (eta egun batek ez ditu 20 ordu eguzki), ez da fidagarria.', 'Con 20 horas: fuera del intervalo (y un día no tiene 20 horas de sol), no es fiable.', 'مع 20 ساعة: خارج المجال (واليوم لا يضم 20 ساعة شمس)، غير موثوق.', 'With 20 hours: outside the range (and a day does not have 20 hours of sunshine), so it is not reliable.'), math: same('$0{,}5\\cdot 20+8=18$') }
        ],
        takeaway: say('Estimatzeko, ordeztu zuzenean; fidagarria korrelazio sendoarekin eta datuen tartearen barruan.', 'Para estimar, sustituye en la recta; fiable con correlación fuerte y dentro del intervalo de datos.', 'للتقدير عوّض في المستقيم؛ موثوق مع ارتباط قوي وداخل مجال البيانات.', 'To estimate, substitute into the line; reliable with strong correlation and within the range of the data.'),
        figure: (language) => <RegressionFigure language={language} />
    },

    /* ---------- 5. Probability ---------- */
    {
        id: 'laplace',
        stage: 'chance',
        figureAfterSteps: true,
        title: say('Laplace, maiztasuna eta gertaeren bildura', 'Laplace, frecuencia y unión de sucesos', 'لابلاس والتكرار واتحاد الأحداث', 'Laplace, frequency and union of events'),
        goal: say('Probabilitateak Laplaceren erregelarekin eta maiztasun erlatiboarekin kalkulatzea, eta aurkako gertaera eta bildura erabiltzea.', 'Calcular probabilidades con la regla de Laplace y con la frecuencia relativa, y usar el suceso contrario y la unión.', 'حساب الاحتمالات بقاعدة لابلاس وبالتكرار النسبي، واستعمال الحدث المعاكس والاتحاد.', 'Calculate probabilities using Laplace\'s rule and relative frequency, and use the complementary event and the union.'),
        problem: say('Dado bat botatzen da. A = «bikoitia», B = «3 zenbakiaren multiploa». Kalkulatu $P(A\\cup B)$.', 'Se lanza un dado. A = «par», B = «múltiplo de 3». Calcula $P(A\\cup B)$.', 'يُرمى نرد. A = «زوجي»، B = «مضاعف 3». احسب $P(A\\cup B)$.', 'A die is rolled. A = ‘even’, B = ‘multiple of 3’. Calculate $P(A\\cup B)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('A = {2, 4, 6}, B = {3, 6}: bateragarriak, 6 bietan.', 'A = {2, 4, 6}, B = {3, 6}: compatibles, el 6 en los dos.', 'A = {2, 4, 6}، B = {3, 6}: متوافقان، 6 في كليهما.', 'A = {2, 4, 6}, B = {3, 6}: compatible, with 6 in both.') },
            { text: say('Batu eta kendu bien zatia.', 'Suma y resta la parte común.', 'اجمع واطرح الجزء المشترك.', 'Add and subtract the common part.'), math: same('$\\frac{3}{6}+\\frac{2}{6}-\\frac{1}{6}=\\frac{4}{6}$') },
            { text: say('Egiaztatu: {2, 3, 4, 6}.', 'Comprueba: {2, 3, 4, 6}.', 'تحقّق: {2, 3, 4, 6}.', 'Check: {2, 3, 4, 6}.'), math: same('$\\frac{4}{6}=\\frac{2}{3}$') }
        ],
        takeaway: say('Erregularra: Laplace. Irregularra: maiztasun erlatiboa. Bateragarriak: batu eta kendu bien zatia.', 'Regular: Laplace. Irregular: frecuencia relativa. Compatibles: suma y resta la parte común.', 'منتظمة: لابلاس. غير منتظمة: التكرار النسبي. متوافقان: اجمع واطرح المشترك.', 'Regular: Laplace. Irregular: relative frequency. Compatible: add and subtract the common part.'),
        figure: (language) => <UnionFigure language={language} />
    },
    {
        id: 'compound',
        stage: 'chance',
        needs: [{ unit: 'dbh3/estadistica-probabilidad', topic: 'compound', title: { eu: 'Esperimentu konposatuak', es: 'Experimentos compuestos', en: 'Compound experiments', ar: 'التجارب المركّبة' } }],
        figureAfterSteps: true,
        title: say('Esperimentu konposatuak', 'Experiencias compuestas', 'التجارب المركّبة', 'Compound experiments'),
        goal: say('Esperimentu independenteen eta dependenteen probabilitateak zuhaitz-diagrama batekin kalkulatzea.', 'Calcular probabilidades de experiencias independientes y dependientes con un diagrama de árbol.', 'حساب احتمالات التجارب المستقلة والتابعة بمخطط شجري.', 'Calculate probabilities for independent and dependent experiments using a tree diagram.'),
        problem: say('40 kartako sorta batetik bi karta ateratzen dira, itzuli gabe. Zein da biak ezpatak izateko probabilitatea (10 ezpata daude)?', 'Se sacan dos cartas de una baraja de 40, sin devolver. ¿Cuál es la probabilidad de que las dos sean espadas (hay 10 espadas)?', 'تُسحب ورقتان من مجموعة 40 ورقة دون إرجاع. ما احتمال أن تكون كلتاهما سيوفًا (فيها 10 سيوف)؟', 'Two cards are drawn from a 40-card deck, without replacement. What is the probability that both are swords (there are 10 swords)?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehenengoa ezpata.', 'La primera, espada.', 'الأولى سيف.', 'The first one is a sword.'), math: same('$\\frac{10}{40}$') },
            { text: say('Bigarrena: 9 ezpata geratzen dira 39 kartatan.', 'La segunda: quedan 9 espadas en 39 cartas.', 'الثانية: يبقى 9 سيوف في 39 ورقة.', 'The second: 9 swords are left in 39 cards.'), math: same('$\\frac{9}{39}$') },
            { text: say('Biderkatu bidea.', 'Multiplica el camino.', 'اضرب المسار.', 'Multiply along the path.'), math: same('$\\frac{10}{40}\\cdot\\frac{9}{39}=\\frac{3}{52}$') }
        ],
        takeaway: say('Bide batean biderkatu; bide batzuen artean batu. Itzuli gabe, bigarren adarra aldatu egiten da.', 'En un camino, multiplica; entre varios caminos, suma. Sin devolver, la segunda rama cambia.', 'في المسار الواحد اضرب، وبين المسارات اجمع. ودون إرجاع يتغيّر الفرع الثاني.', 'On one path, multiply; across several paths, add. Without replacement, the second branch changes.'),
        figure: (language) => <CardsTreeFigure language={language} />
    },
    {
        id: 'contingency',
        stage: 'chance',
        figureAfterSteps: true,
        title: say('Kontingentzia-taulak', 'Tablas de contingencia', 'جداول التوافق', 'Contingency tables'),
        goal: say('Kontingentzia-taula bat osatzea eta haren probabilitate soilak, batera gertatzekoak eta baldintzatuak kalkulatzea.', 'Completar una tabla de contingencia y calcular sus probabilidades simples, conjuntas y condicionadas.', 'إكمال جدول توافق وحساب احتمالاته البسيطة والمشتركة والمشروطة.', 'Complete a contingency table and calculate its simple, joint and conditional probabilities.'),
        problem: say('Ikastetxe bateko 1000 ikasleetatik: mutilak 600 (187 betaurrekoekin) eta neskak 400 (113 betaurrekoekin). Ikasle bat zoriz aukeratuta, kalkulatu $P(\\text{betaurrekoak})$ eta, neska dela jakinda, betaurrekoak eramatekoa.', 'De los 1000 alumnos de un centro: chicos 600 (187 con gafas) y chicas 400 (113 con gafas). Eligiendo uno al azar, calcula $P(\\text{gafas})$ y, sabiendo que es chica, la de que lleve gafas.', 'من 1000 تلميذ في مدرسة: الأولاد 600 (187 بنظارات) والبنات 400 (113 بنظارات). إذا اخترنا واحدًا عشوائيًا، احسب احتمال النظارات، واحتمال أن تلبس نظارات علمًا أنها بنت.', 'Of the 1,000 students at a school: 600 boys (187 with glasses) and 400 girls (113 with glasses). Choosing one at random, calculate $P(\\text{glasses})$ and, knowing it is a girl, the probability that she wears glasses.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Osatu guztizkoak.', 'Completa los totales.', 'أكمل المجاميع.', 'Complete the totals.'), math: same('$187+113=300$') },
            { text: say('Soila.', 'Simple.', 'البسيط.', 'Simple.'), math: same('$\\frac{300}{1000}=0{,}3$') },
            { text: say('Baldintzatua: neskak bakarrik.', 'Condicionada: solo las chicas.', 'المشروط: البنات فقط.', 'Conditional: only the girls.'), math: same('$\\frac{113}{400}=0{,}2825$') }
        ],
        takeaway: say('Baldintzatuan, kasu posibleak baldintzaren errenkada edo zutabea bakarrik dira.', 'En la condicionada, los casos posibles son solo la fila o la columna de la condición.', 'في المشروط تكون الحالات الممكنة سطر الشرط أو عموده فقط.', 'For conditional probability, the possible cases are only the row or column of the condition.'),
        figure: (language) => <ContingencyFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const statisticsTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...statisticsLessonTexts[topic.id as StatisticsTopicId], ...statisticsLessonChecks[topic.id as StatisticsTopicId] }))
