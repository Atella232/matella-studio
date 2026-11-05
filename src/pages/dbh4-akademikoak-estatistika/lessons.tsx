import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { DeviationFigure, SymmetryFigure } from '../dbh2-estatistika-v2/figures'
import { CorrelationFigure, GroupedMeanFigure, IntervalsFigure, PercentilesFigure, RegressionFigure, ScatterFigure, VariationFigure } from '../dbh4-aplikatuak-estatistika/figures'
import { GoalsTableFigure, GoalsVarianceFigure, JoinedMeanFigure, QuartileRuleFigure, SamplingFigure, SportBoxFigure } from './figures'
import { statisticsAkLessonChecks, type StatisticsAkTopicId } from './lessonChecks'
import { statisticsAkLessonTexts } from './lessonTexts'

/* ==========================================================================
   Estatistika · 4. DBH akademikoak — stages and lessons, following
   Santillana Académicas unit 12 (population and sample, sampling, tables
   with hᵢ, Fᵢ and Hᵢ, charts, mean, median and mode also in intervals,
   quartiles and percentiles, box plot, range, mean deviation, variance,
   σ and CV, two-variable distributions) and Anaya Académicas unit 10
   (clouds of points, correlation, r and the regression line to estimate).
   It reuses the 2. DBH and 4. DBH aplikatuak figures where the data are
   the same and adds the stratified sample, the full table of the goals,
   the joined mean, the quartiles by position, the sport box plot and σ of
   the goals.
   ========================================================================== */

export type StatisticsAkStageId = 'data' | 'centre' | 'position' | 'spread' | 'two'

export const statisticsAkStages: UnitStage[] = [
    { id: 'data', tone: 'blue', title: { eu: 'Datuak eta taulak', es: 'Datos y tablas', en: 'Data and tables', ar: 'البيانات والجداول' } },
    { id: 'centre', tone: 'violet', title: { eu: 'Zentralizazioa', es: 'Centralización', en: 'Central tendency', ar: 'النزعة المركزية' } },
    { id: 'position', tone: 'mustard', title: { eu: 'Posizioa', es: 'Posición', en: 'Position', ar: 'الموقع' } },
    { id: 'spread', tone: 'coral', title: { eu: 'Sakabanaketa', es: 'Dispersión', en: 'Spread', ar: 'التشتت' } },
    { id: 'two', tone: 'green', title: { eu: 'Bi aldagai', es: 'Dos variables', en: 'Two variables', ar: 'متغيران' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Data and tables ---------- */
    {
        id: 'sampling',
        stage: 'data',
        figureAfterSteps: true,
        title: say('Lagina eta laginketa motak', 'Muestra y tipos de muestreo', 'العيّنة وأنواع المعاينة', 'Sample and types of sampling'),
        goal: say('Lagin bat noiz behar den erabakitzea eta zorizko, sistematiko eta geruzakako laginketak egitea.', 'Decidir cuándo hace falta una muestra y hacer muestreos aleatorios, sistemáticos y estratificados.', 'تقرير متى نحتاج إلى عيّنة، وإجراء معاينات عشوائية ومنتظمة وطبقية.', 'Decide when a sample is needed and carry out random, systematic and stratified sampling.'),
        needs: [
            { unit: 'dbh3/estadistica-probabilidad', topic: 'population-sample', title: { eu: 'Populazioa, lagina eta aldagaiak', es: 'Población, muestra y variables', en: 'Population, sample and variables', ar: 'المجتمع والعيّنة والمتغيّرات' } },
            { unit: 'dbh3/proporcionalidad', topic: 'direct-share', title: { eu: 'Banaketa zuzenki proportzionala', es: 'Reparto directamente proporcional', en: 'Sharing in direct proportion', ar: 'التوزيع الطردي' } }
        ],
        problem: say('Ikastetxe batek 600 ikasle ditu: 180 1. mailan, 150 2.ean, 140 3.ean eta 130 4.ean. 60 ikasleko lagin geruzatua egin nahi da. Zenbat ikasle maila bakoitzetik?', 'Un instituto tiene 600 alumnos: 180 en 1.º, 150 en 2.º, 140 en 3.º y 130 en 4.º. Se quiere una muestra estratificada de 60. ¿Cuántos alumnos de cada curso?', 'في مدرسة 600 تلميذ: 180 في الأول، 150 في الثاني، 140 في الثالث، 130 في الرابع. نريد عيّنة طبقية من 60. كم تلميذًا من كل صف؟', 'A secondary school has 600 students: 180 in 1st year, 150 in 2nd year, 140 in 3rd year and 130 in 4th year. They want a stratified sample of 60. How many students from each year group?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Laginaren zatia: 600 ikasletatik 60.', 'La fracción de la muestra: 60 de 600.', 'كسر العيّنة: 60 من 600.', 'The sampling fraction: 60 out of 600.'), math: same('$\\frac{60}{600}=0{,}1$') },
            { text: say('Biderkatu maila bakoitzeko ikasleak.', 'Multiplica los alumnos de cada curso.', 'اضرب تلاميذ كل صف.', 'Multiply the students in each year group by that fraction.'), math: same('$0{,}1\\cdot 180=18\\qquad 0{,}1\\cdot 150=15$') },
            { text: say('Egiaztatu batura.', 'Comprueba la suma.', 'تحقّق من المجموع.', 'Check the sum.'), math: same('$18+15+14+13=60$') }
        ],
        takeaway: say('Geruzakakoan, geruza bakoitzak bere tamainaren proportzioan; sistematikoan, k-tik k-ra.', 'En el estratificado, cada estrato en proporción a su tamaño; en el sistemático, de k en k.', 'في الطبقية كل طبقة بنسبة حجمها؛ وفي المنتظمة عنصر كل k.', 'In stratified sampling, each stratum in proportion to its size; in systematic sampling, every k-th one.'),
        figure: (language) => <SamplingFigure language={language} />
    },
    {
        id: 'frequencies',
        stage: 'data',
        figureAfterSteps: true,
        title: say('Maiztasun-taulak', 'Tablas de frecuencias', 'جداول التكرارات', 'Frequency tables'),
        goal: say('Maiztasun absolutuak, erlatiboak eta metatuak kalkulatzea eta taula oso bat osatzea.', 'Calcular frecuencias absolutas, relativas y acumuladas, y completar una tabla.', 'حساب التكرارات المطلقة والنسبية والمتجمّعة، وإكمال جدول.', 'Calculate absolute, relative and cumulative frequencies, and complete a table.'),
        needs: [
            { unit: 'dbh3/estadistica-probabilidad', topic: 'frequency-table', title: { eu: 'Maiztasun-taulak', es: 'Tablas de frecuencias', en: 'Frequency tables', ar: 'جداول التكرارات' } }
        ],
        problem: say('30 partidatako golak: 0 → 6 partida, 1 → 7, 2 → 8, 3 → 6, 4 → 2, 5 → 1. Zein ehunekotan sartu dira 2 gol edo gutxiago?', 'Goles en 30 partidos: 0 → 6 partidos, 1 → 7, 2 → 8, 3 → 6, 4 → 2, 5 → 1. ¿En qué porcentaje se marcaron 2 goles o menos?', 'الأهداف في 30 مباراة: 0 ← 6 مباريات، 1 ← 7، 2 ← 8، 3 ← 6، 4 ← 2، 5 ← 1. في أي نسبة سُجّل هدفان أو أقل؟', 'Goals in 30 matches: 0 → 6 matches, 1 → 7, 2 → 8, 3 → 6, 4 → 2, 5 → 1. In what percentage of matches were 2 goals or fewer scored?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Metatu maiztasunak.', 'Acumula las frecuencias.', 'اجمع التكرارات تراكميًا.', 'Accumulate the frequencies.'), math: same('$F_3=6+7+8=21$') },
            { text: say('Zatitu $N$-z.', 'Divide entre $N$.', 'اقسم على $N$.', 'Divide by $N$.'), math: same('$H_3=\\frac{21}{30}=0{,}7$') },
            { text: say('Ehunekotan: % 70.', 'En porcentaje: el 70 %.', 'بالنسبة المئوية: 70 %.', 'As a percentage: 70%.'), math: same('$0{,}7\\cdot 100=70$') }
        ],
        takeaway: say('h = f zati N; F eta H metatzen dira, eta azkenak N eta 1 dira.', 'h = f entre N; F y H se acumulan, y las últimas son N y 1.', 'h = f على N؛ وF وH تتراكمان، وآخرهما N و1.', 'h = f divided by N; F and H accumulate, and the last ones are N and 1.'),
        figure: (language) => <GoalsTableFigure language={language} />
    },
    {
        id: 'intervals',
        stage: 'data',
        figureAfterSteps: true,
        title: say('Tarteak eta histograma', 'Intervalos e histograma', 'الفئات والمدرّج التكراري', 'Intervals and histograms'),
        goal: say('Datu jarraituak tarteetan antolatzea, klase-markak kalkulatzea eta grafiko egokia aukeratzea.', 'Agrupar datos continuos en intervalos, calcular las marcas de clase y elegir el gráfico adecuado.', 'تبويب البيانات المتصلة في فئات، وحساب مراكزها، واختيار التمثيل المناسب.', 'Group continuous data into intervals, calculate the class midpoints and choose the right chart.'),
        needs: [
            { unit: 'dbh3/estadistica-probabilidad', topic: 'grouped-data', title: { eu: 'Tarteetan multzokatutako datuak', es: 'Datos agrupados en intervalos', en: 'Data grouped in intervals', ar: 'البيانات المجمّعة في فترات' } },
            { unit: 'dbh3/estadistica-probabilidad', topic: 'bar-histogram', title: { eu: 'Barra-diagramak eta histogramak', es: 'Diagramas de barras e histogramas', en: 'Bar charts and histograms', ar: 'مخططات الأعمدة والمدرّجات التكرارية' } }
        ],
        problem: say('40 ikasleren altuerak 148 cm-tik 177 cm-ra doaz. 6 tarte egin nahi dira. Zein zabalera eta zein lehen tarte?', 'Las alturas de 40 alumnos van de 148 cm a 177 cm. Se quieren 6 intervalos. ¿Qué amplitud y qué primer intervalo?', 'تمتد أطوال 40 تلميذًا من 148 سم إلى 177 سم. نريد 6 فئات. ما الطول وما الفئة الأولى؟', 'The heights of 40 students go from 148 cm to 177 cm. You want 6 intervals. What is the width, and what is the first interval?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ibiltartea eta 6 zenbakiarekin zatigarria den $r\'$.', 'Recorrido y un $r\'$ divisible entre 6.', 'المدى و$r\'$ يقبل القسمة على 6.', 'Range and an $r\'$ divisible by 6.'), math: same('$177-148=29\\ \\to\\ r\'=30$') },
            { text: say('Zabalera.', 'Amplitud.', 'طول الفئة.', 'Width.'), math: same('$30:6=5$') },
            { text: say('Soberakina bi muturretan: hasi 0,5 lehenago.', 'El exceso, en los dos extremos: empieza 0,5 antes.', 'الفائض على الطرفين: ابدأ قبل 0.5.', 'The excess, at both ends: it starts 0.5 earlier.'), math: same('$[147{,}5;\\ 152{,}5)$') }
        ],
        takeaway: say('Zabalera = r′ zati tarte kopurua; klase-marka = tartearen erdia; tarteetan, histograma.', 'Amplitud = r′ entre el número de intervalos; marca de clase = centro; en intervalos, histograma.', 'الطول = r′ على عدد الفئات؛ المركز = المنتصف؛ وفي الفئات مدرّج تكراري.', 'Width = r′ divided by the number of intervals; class mark = middle; for intervals, histogram.'),
        figure: (language) => <IntervalsFigure language={language} />
    },

    /* ---------- 2. Centralization ---------- */
    {
        id: 'mean',
        stage: 'centre',
        figureAfterSteps: true,
        title: say('Batez bestekoa eta haztatua', 'Media y media ponderada', 'المتوسط والمتوسط المرجّح', 'Mean and weighted mean'),
        goal: say('Taula baten batez bestekoa kalkulatzea, taldeak batzea eta falta den datu bat aurkitzea.', 'Calcular la media de una tabla, juntar grupos y hallar un dato que falta.', 'حساب متوسط جدول، ودمج مجموعات، وإيجاد بيان ناقص.', 'Calculate the mean of a table, combine groups and find a missing data value.'),
        needs: [
            { unit: 'dbh3/estadistica-probabilidad', topic: 'mean', title: { eu: 'Batez besteko aritmetikoa', es: 'La media aritmética', en: 'The mean', ar: 'المتوسط الحسابي' } }
        ],
        problem: say('A taldeak 20 ikasle ditu eta batez bestekoa 6,5 da; B taldeak 30 ikasle ditu eta batez bestekoa 7,2. Zein da 50 ikasleen batez bestekoa?', 'El grupo A tiene 20 alumnos con media 6,5 y el B, 30 con media 7,2. ¿Cuál es la media de los 50 alumnos?', 'في المجموعة A عشرون تلميذًا متوسطهم 6.5، وفي B ثلاثون متوسطهم 7.2. ما متوسط التلاميذ الخمسين؟', 'Group A has 20 students with a mean of 6.5, and group B has 30 with a mean of 7.2. What is the mean of all 50 students?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Talde bakoitzeko notak batuta.', 'La suma de las notas de cada grupo.', 'مجموع علامات كل مجموعة.', 'The sum of the marks in each group.'), math: same('$20\\cdot 6{,}5=130\\qquad 30\\cdot 7{,}2=216$') },
            { text: say('Batu eta zatitu ikasle guztiez.', 'Suma y divide entre todos los alumnos.', 'اجمع واقسم على كل التلاميذ.', 'Add up and divide by all the students.'), math: same('$\\frac{130+216}{50}=6{,}92$') },
            { text: say('6,85 baino gehiago: B-k pisu handiagoa du.', 'Más que 6,85: B pesa más.', 'أكثر من 6.85: وزن B أكبر.', 'More than 6.85: group B has more weight.') }
        ],
        takeaway: say('Batura = N bider batez bestekoa: horrela batzen dira taldeak eta aurkitzen dira falta diren datuak.', 'Suma = N por la media: así se juntan grupos y se hallan los datos que faltan.', 'المجموع = N في المتوسط: هكذا تُدمج المجموعات وتوجد البيانات الناقصة.', 'Sum = N times the mean: that is how you combine groups and find missing data.'),
        figure: (language) => <JoinedMeanFigure language={language} />
    },
    {
        id: 'median-mode',
        stage: 'centre',
        title: say('Mediana eta moda', 'Mediana y moda', 'الوسيط والمنوال', 'Median and mode'),
        goal: say('Taula baten mediana eta moda aurkitzea eta zein parametrok ordezkatzen dituen hobeto datuak erabakitzea.', 'Hallar la mediana y la moda de una tabla y decidir qué parámetro representa mejor los datos.', 'إيجاد وسيط جدول ومنواله، وتقرير أي مقياس يمثّل البيانات أفضل.', 'Find the median and mode of a table, and decide which measure represents the data best.'),
        needs: [
            { unit: 'dbh3/estadistica-probabilidad', topic: 'median', title: { eu: 'Mediana', es: 'La mediana', en: 'The median', ar: 'الوسيط' } },
            { unit: 'dbh3/estadistica-probabilidad', topic: 'mode', title: { eu: 'Moda eta neurrien konparazioa', es: 'La moda y comparar medidas', en: 'The mode and comparing measures', ar: 'المنوال ومقارنة المقاييس' } }
        ],
        problem: say('Enpresa txiki batean 4 langilek 1200 € irabazten dituzte eta zuzendariak 6000 €. Kalkulatu batez bestekoa eta mediana. Zeinek ordezkatzen du hobeto?', 'En una empresa pequeña 4 empleados ganan 1200 € y la directora 6000 €. Calcula la media y la mediana. ¿Cuál representa mejor?', 'في شركة صغيرة يكسب 4 موظفين 1200 € وتكسب المديرة 6000 €. احسب المتوسط والوسيط. أيهما يمثّل أفضل؟', 'In a small company, 4 employees earn €1,200 and the director earns €6,000. Calculate the mean and the median. Which one represents the data better?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batez bestekoa.', 'Media.', 'المتوسط.', 'Mean.'), math: same('$\\frac{4\\cdot 1200+6000}{5}=2160$') },
            { text: say('Mediana: 3. datua.', 'Mediana: el dato 3.º.', 'الوسيط: البيان الثالث.', 'Median: the 3rd value.'), math: same('$\\text{Me}=1200$') },
            { text: say('Inork ez du 2160 € irabazten: medianak hobeto ordezkatzen du.', 'Nadie gana 2160 €: la mediana representa mejor.', 'لا أحد يكسب 2160 €: الوسيط يمثّل أفضل.', 'No one earns €2,160: the median represents the data better.') }
        ],
        takeaway: say('Mediana metatuetan bilatzen da; atipikoak daudenean, batez bestekoa baino hobea da.', 'La mediana se busca en las acumuladas; con atípicos, es mejor que la media.', 'يُبحث عن الوسيط في المتجمّعة؛ ومع الشواذ يكون أفضل من المتوسط.', 'You find the median from the cumulative frequencies; with outliers, it is better than the mean.'),
        figure: (language) => <SymmetryFigure language={language} />
    },
    {
        id: 'grouped-centre',
        stage: 'centre',
        title: say('Datu multzokatuen parametroak', 'Parámetros de datos agrupados', 'مقاييس البيانات المبوّبة', 'Measures for grouped data'),
        goal: say('Tarteetan dauden datuen batez bestekoa kalkulatzea eta tarte modala eta mediana-tartea aurkitzea.', 'Calcular la media de datos en intervalos y hallar el intervalo modal y el intervalo mediano.', 'حساب متوسط بيانات في فئات، وإيجاد الفئة المنوالية والفئة الوسيطية.', 'Calculate the mean of data in intervals, and find the modal interval and the median interval.'),
        needs: [
            { unit: 'dbh3/estadistica-probabilidad', topic: 'grouped-data', title: { eu: 'Tarteetan multzokatutako datuak', es: 'Datos agrupados en intervalos', en: 'Data grouped in intervals', ar: 'البيانات المجمّعة في فترات' } }
        ],
        problem: say('Itxaron-denborak (min): $[0,15)$ 6, $[15,30)$ 3, $[30,45)$ 5, $[45,60)$ 6. Kalkulatu $\\bar{x}$ eta aurkitu mediana-tartea.', 'Tiempos de espera (min): $[0,15)$ 6, $[15,30)$ 3, $[30,45)$ 5, $[45,60)$ 6. Calcula $\\bar{x}$ y halla el intervalo mediano.', 'أزمنة الانتظار (دقيقة): $[0,15)$ 6، $[15,30)$ 3، $[30,45)$ 5، $[45,60)$ 6. احسب $\\bar{x}$ وأوجد الفئة الوسيطية.', 'Waiting times (min): $[0,15)$ 6, $[15,30)$ 3, $[30,45)$ 5, $[45,60)$ 6. Calculate $\\bar{x}$ and find the median interval.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Klase-markak 7,5; 22,5; 37,5; 52,5.', 'Marcas de clase 7,5; 22,5; 37,5; 52,5.', 'المراكز 7.5؛ 22.5؛ 37.5؛ 52.5.', 'Class marks 7.5; 22.5; 37.5; 52.5.'), math: same('$\\sum f_i x_i=615$') },
            { text: say('Batez bestekoa.', 'Media.', 'المتوسط.', 'Mean.'), math: same('$\\bar{x}=\\frac{615}{20}=30{,}75$') },
            { text: say('Metatuak 6, 9, 14, 20: 10. datua hirugarren tartean. Bi tarte modal.', 'Acumuladas 6, 9, 14, 20: el dato 10.º, en el tercer intervalo. Dos intervalos modales.', 'المتجمّعة 6، 9، 14، 20: البيان العاشر في الفئة الثالثة. فئتان منواليتان.', 'Cumulative frequencies 6, 9, 14, 20: the 10th value is in the third interval. Two modal intervals.'), math: same('$[30,45)$') }
        ],
        takeaway: say('Tarteetan, klase-markekin kalkulatu; tarte modala eta mediana-tartea taulan bertan ikusten dira.', 'En intervalos, calcula con las marcas de clase; el intervalo modal y el mediano se ven en la tabla.', 'في الفئات احسب بالمراكز؛ والفئة المنوالية والوسيطية تُريان في الجدول.', 'With intervals, calculate using the class marks; the modal and median intervals can be seen in the table.'),
        figure: (language) => <GroupedMeanFigure language={language} />
    },

    /* ---------- 3. Position ---------- */
    {
        id: 'quartiles',
        stage: 'position',
        title: say('Kuartilak', 'Cuartiles', 'الربيعيات', 'Quartiles'),
        goal: say('Datu-zerrenda baten kuartilak postuen erregelarekin kalkulatzea eta kuartil arteko ibiltartea aurkitzea.', 'Calcular los cuartiles de una lista de datos con la regla de las posiciones y hallar el recorrido intercuartílico.', 'حساب ربيعيات قائمة بيانات بقاعدة المواقع وإيجاد المدى الربيعي.', 'Calculate the quartiles of a list of data using the position rule, and find the interquartile range.'),
        needs: [
            { unit: 'dbh3/estadistica-probabilidad', topic: 'range-quartiles', title: { eu: 'Ibiltartea eta kuartilak', es: 'Recorrido y cuartiles', en: 'Range and quartiles', ar: 'المدى والربيعيات' } }
        ],
        problem: say('12 ikasleren asteko kirol-orduak: 2, 3, 3, 4, 5, 5, 6, 7, 7, 8, 9, 15. Kalkulatu kuartilak eta RIC.', 'Horas de deporte semanales de 12 alumnos: 2, 3, 3, 4, 5, 5, 6, 7, 7, 8, 9, 15. Calcula los cuartiles y el RIC.', 'ساعات الرياضة الأسبوعية لـ12 تلميذًا: 2، 3، 3، 4، 5، 5، 6، 7، 7، 8، 9، 15. احسب الربيعيات والمدى الربيعي.', 'Weekly hours of sport for 12 students: 2, 3, 3, 4, 5, 5, 6, 7, 7, 8, 9, 15. Calculate the quartiles and the IQR.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$12\\cdot 0{,}25=3$, osoa: 3. eta 4. datuak.', '$12\\cdot 0{,}25=3$, entero: datos 3.º y 4.º.', '$12\\cdot 0{,}25=3$، صحيح: البيانان الثالث والرابع.', '$12\\cdot 0{,}25=3$, a whole number: values 3rd and 4th.'), math: same('$Q_1=\\frac{3+4}{2}=3{,}5$') },
            { text: say('6. eta 7. datuak; 9. eta 10. datuak.', 'Datos 6.º y 7.º; datos 9.º y 10.º.', 'البيانان السادس والسابع؛ والتاسع والعاشر.', 'Values 6th and 7th; values 9th and 10th.'), math: same('$\\text{Me}=5{,}5\\qquad Q_3=7{,}5$') },
            { text: say('Kuartil arteko ibiltartea.', 'Recorrido intercuartílico.', 'المدى الربيعي.', 'Interquartile range.'), math: same('$7{,}5-3{,}5=4$') }
        ],
        takeaway: say('Postua N·k/100: osoa bada, bi daturen erdia; hamartarra bada, hurrengo datua.', 'Posición N·k/100: si es entera, la media de dos datos; si es decimal, el dato siguiente.', 'الموقع N·k/100: إذا كان صحيحًا فمتوسط بيانين، وإذا كان عشريًا فالبيان التالي.', 'Position N·k/100: if it is a whole number, the mean of two values; if it is a decimal, the next value.'),
        figure: (language) => <QuartileRuleFigure language={language} />
    },
    {
        id: 'percentiles',
        stage: 'position',
        title: say('Pertzentilak', 'Percentiles', 'المئينات', 'Percentiles'),
        goal: say('Maiztasun-taula batetik edozein pertzentil aurkitzea eta pertzentil bat interpretatzea.', 'Hallar cualquier percentil a partir de una tabla de frecuencias e interpretar un percentil.', 'إيجاد أي مئين من جدول تكرارات وتفسير مئين.', 'Find any percentile from a frequency table, and interpret a percentile.'),
        needs: [
            { unit: 'dbh4-akademikoak/numeros-reales', topic: 'percent-basics', title: { eu: 'Ehunekoak', es: 'Porcentajes', en: 'Percentages', ar: 'النسب المئوية' } }
        ],
        problem: say('25 familiaren autoak: 0 → 3, 1 → 12, 2 → 4, 3 → 4, 4 → 2. Aurkitu $p_{30}$ eta $p_{85}$.', 'Coches de 25 familias: 0 → 3, 1 → 12, 2 → 4, 3 → 4, 4 → 2. Halla $p_{30}$ y $p_{85}$.', 'سيارات 25 أسرة: 0 ← 3، 1 ← 12، 2 ← 4، 3 ← 4، 4 ← 2. أوجد $p_{30}$ و$p_{85}$.', 'Cars in 25 families: 0 → 3, 1 → 12, 2 → 4, 3 → 4, 4 → 2. Find $p_{30}$ and $p_{85}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ehuneko metatuak.', 'Porcentajes acumulados.', 'النسب المتجمّعة.', 'Cumulative percentages.'), math: same('$12,\\ 60,\\ 76,\\ 92,\\ 100$') },
            { text: say('30 gainditzen da 1 balioan.', 'El 30 se supera en el 1.', '30 تُتجاوز عند 1.', '30 is first exceeded at 1.'), math: same('$p_{30}=1$') },
            { text: say('85 gainditzen da 3 balioan.', 'El 85 se supera en el 3.', '85 تُتجاوز عند 3.', '85 is first exceeded at 3.'), math: same('$p_{85}=3$') }
        ],
        takeaway: say('Pertzentila: ehuneko metatuak k lehen aldiz gainditzen duen balioa.', 'Percentil: el primer valor cuyo porcentaje acumulado supera k.', 'المئين: أول قيمة تتجاوز نسبتها المتجمّعة k.', 'Percentile: the first value whose cumulative percentage exceeds k.'),
        figure: (language) => <PercentilesFigure language={language} />
    },
    {
        id: 'box-plot',
        stage: 'position',
        figureAfterSteps: true,
        title: say('Kutxa-diagrama', 'Diagrama de caja y bigotes', 'مخطط الصندوق والشاربين', 'Box-and-whisker plot'),
        goal: say('Kutxa-diagrama egitea, datu atipikoak bereiztea eta diagrama bat irakurtzea.', 'Construir el diagrama de caja, separar los datos atípicos y leer un diagrama.', 'بناء مخطط الصندوق، وفصل البيانات الشاذة، وقراءة مخطط.', 'Draw a box plot, separate out the outliers, and read a box plot.'),
        needs: [
            { unit: 'dbh3/estadistica-probabilidad', topic: 'box-plot', title: { eu: 'Kutxa-diagrama', es: 'El diagrama de caja', en: 'The box plot', ar: 'مخطط الصندوق' } }
        ],
        problem: say('Kirol-orduetan $Q_1=3{,}5$, $\\text{Me}=5{,}5$ eta $Q_3=7{,}5$ dira, eta datuak 2 eta 15 artean daude. Marraztu kutxa-diagrama.', 'En las horas de deporte $Q_1=3{,}5$, $\\text{Me}=5{,}5$ y $Q_3=7{,}5$, y los datos van de 2 a 15. Dibuja el diagrama de caja.', 'في ساعات الرياضة $Q_1=3{,}5$ و$\\text{Me}=5{,}5$ و$Q_3=7{,}5$، وتمتد البيانات من 2 إلى 15. ارسم مخطط الصندوق.', 'For the sport hours, $Q_1=3{,}5$, $\\text{Med}=5{,}5$ and $Q_3=7{,}5$, and the data go from 2 to 15. Draw the box plot.'),
        stepsKind: 'steps',
        steps: [
            { text: say('RIC eta haren 1,5 aldiz.', 'El RIC y 1,5 veces el RIC.', 'المدى الربيعي و1.5 مرة منه.', 'The IQR and 1.5 times the IQR.'), math: same('$7{,}5-3{,}5=4\\qquad 1{,}5\\cdot 4=6$') },
            { text: say('Mugak: behekoa $3{,}5-6=-2{,}5$; goikoa:', 'Límites: el inferior, $3{,}5-6=-2{,}5$; el superior:', 'الحدّان: السفلي $3{,}5-6=-2{,}5$؛ والعلوي:', 'Limits: the lower one, $3{,}5-6=-2{,}5$; the upper one:'), math: same('$7{,}5+6=13{,}5$') },
            { text: say('Biboteak 2 eta 9 balioetaraino; 15 atipikoa da.', 'Bigotes hasta 2 y 9; el 15 es atípico.', 'الشاربان حتى 2 و9؛ و15 شاذ.', 'Whiskers go to 2 and 9; 15 is an outlier.') }
        ],
        takeaway: say('Biboteak gehienez 1,5·RIC; kanpoan geratzen dena atipikoa da.', 'Bigotes como mucho 1,5·RIC; lo que queda fuera es atípico.', 'الشاربان على الأكثر 1.5·RIC؛ وما يبقى خارجًا شاذ.', 'Whiskers at most 1.5·IQR; anything outside is an outlier.'),
        figure: (language) => <SportBoxFigure language={language} />
    },

    /* ---------- 4. Dispersion ---------- */
    {
        id: 'mean-deviation',
        stage: 'spread',
        figureAfterSteps: true,
        title: say('Ibiltartea eta batez besteko desbideratzea', 'Recorrido y desviación media', 'المدى والانحراف المتوسط', 'Range and mean deviation'),
        goal: say('Ibiltartea eta batez besteko desbideratzea kalkulatzea eta bi taldetan zein den homogeneoagoa esatea.', 'Calcular el recorrido y la desviación media y decir cuál de dos grupos es más homogéneo.', 'حساب المدى والانحراف المتوسط وتحديد أي مجموعتين أكثر تجانسًا.', 'Calculate the range and the mean deviation, and say which of two groups is more consistent.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones-polinomicas-racionales', topic: 'absolute-linear', title: { eu: 'Zuzen baten balio absolutua', es: 'Valor absoluto de una recta', en: 'Absolute value of a straight line', ar: 'القيمة المطلقة لمستقيم' } }
        ],
        problem: say('Kalkulatu 4, 6, 7, 8, 10 datuen ibiltartea eta batez besteko desbideratzea.', 'Calcula el recorrido y la desviación media de los datos 4, 6, 7, 8, 10.', 'احسب المدى والانحراف المتوسط للبيانات 4، 6، 7، 8، 10.', 'Calculate the range and the mean deviation of the data 4, 6, 7, 8, 10.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ibiltartea eta batez bestekoa.', 'Recorrido y media.', 'المدى والمتوسط.', 'Range and mean.'), math: same('$10-4=6\\qquad \\bar{x}=\\frac{35}{5}=7$') },
            { text: say('Batez bestekorako distantziak.', 'Distancias a la media.', 'المسافات عن المتوسط.', 'Distances from the mean.'), math: same('$3+1+0+1+3=8$') },
            { text: say('Zatitu $N$-z.', 'Divide entre $N$.', 'اقسم على $N$.', 'Divide by $N$.'), math: same('$\\text{DM}=\\frac{8}{5}=1{,}6$') }
        ],
        takeaway: say('DM: distantzien batez bestekoa, balio absolutuan; txikiagoa, homogeneoagoa.', 'DM: la media de las distancias, en valor absoluto; menor, más homogéneo.', 'DM: متوسط المسافات بالقيمة المطلقة؛ الأصغر أكثر تجانسًا.', 'MD: the mean of the distances, taken as absolute values; the smaller, the more consistent.'),
        figure: (language) => <DeviationFigure language={language} />
    },
    {
        id: 'variance',
        stage: 'spread',
        figureAfterSteps: true,
        title: say('Bariantza eta desbideratze tipikoa', 'Varianza y desviación típica', 'التباين والانحراف المعياري', 'Variance and standard deviation'),
        goal: say('Taula baten bariantza eta desbideratze tipikoa formula laburrarekin kalkulatzea.', 'Calcular la varianza y la desviación típica de una tabla con la fórmula abreviada.', 'حساب تباين جدول وانحرافه المعياري بالصيغة المختصرة.', 'Calculate the variance and the standard deviation of a table using the shortcut formula.'),
        needs: [
            { unit: 'dbh3/estadistica-probabilidad', topic: 'variance', title: { eu: 'Bariantza eta desbideratze tipikoa', es: 'Varianza y desviación típica', en: 'Variance and standard deviation', ar: 'التباين والانحراف المعياري' } }
        ],
        problem: say('30 partidatako golak: 0 → 6, 1 → 7, 2 → 8, 3 → 6, 4 → 2, 5 → 1. Kalkulatu $\\sigma^2$ eta $\\sigma$.', 'Goles en 30 partidos: 0 → 6, 1 → 7, 2 → 8, 3 → 6, 4 → 2, 5 → 1. Calcula $\\sigma^2$ y $\\sigma$.', 'الأهداف في 30 مباراة: 0 ← 6، 1 ← 7، 2 ← 8، 3 ← 6، 4 ← 2، 5 ← 1. احسب $\\sigma^2$ و$\\sigma$.', 'Goals in 30 matches: 0 → 6, 1 → 7, 2 → 8, 3 → 6, 4 → 2, 5 → 1. Calculate $\\sigma^2$ and $\\sigma$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batu zutabeak.', 'Suma las columnas.', 'اجمع العمودين.', 'Add up the columns.'), math: same('$\\sum f_i x_i=54\\qquad \\sum f_i x_i^2=150$') },
            { text: say('Batez bestekoa.', 'Media.', 'المتوسط.', 'Mean.'), math: same('$\\bar{x}=\\frac{54}{30}=1{,}8$') },
            { text: say('Bariantza eta erroa.', 'Varianza y raíz.', 'التباين والجذر.', 'Variance and square root.'), math: same('$\\frac{150}{30}-1{,}8^{2}=1{,}76\\qquad \\sigma\\approx 1{,}33$') }
        ],
        takeaway: say('σ² = karratuen batez bestekoa ken batez bestekoaren karratua; σ, haren erroa.', 'σ² = media de los cuadrados menos el cuadrado de la media; σ, su raíz.', 'σ² = متوسط المربعات ناقص مربع المتوسط؛ وσ جذره.', 'σ² = mean of the squares minus the square of the mean; σ, its square root.'),
        figure: (language) => <GoalsVarianceFigure language={language} />
    },
    {
        id: 'cv',
        stage: 'spread',
        figureAfterSteps: true,
        title: say('Aldakuntza-koefizientea', 'Coeficiente de variación', 'معامل الاختلاف', 'Coefficient of variation'),
        goal: say('Batez besteko edo unitate desberdineko banaketen sakabanaketa aldakuntza-koefizientearekin konparatzea.', 'Comparar con el coeficiente de variación la dispersión de distribuciones con medias o unidades distintas.', 'مقارنة تشتت توزيعات ذات متوسطات أو وحدات مختلفة بمعامل الاختلاف.', 'Use the coefficient of variation to compare the spread of distributions with different means or units.'),
        needs: [
            { unit: 'dbh4-akademikoak/numeros-reales', topic: 'percent-basics', title: { eu: 'Ehunekoak', es: 'Porcentajes', en: 'Percentages', ar: 'النسب المئوية' } }
        ],
        problem: say('A enpresaren hileko gastuak: $\\bar{x}=100\\,000$ €, $\\sigma=12\\,500$ €. B-renak: $\\bar{x}=15\\,000$ €, $\\sigma=2500$ €. Zeinek du sakabanaketa erlatibo handiagoa?', 'Gastos mensuales de la empresa A: $\\bar{x}=100\\,000$ €, $\\sigma=12\\,500$ €. Los de B: $\\bar{x}=15\\,000$ €, $\\sigma=2500$ €. ¿Cuál tiene más dispersión relativa?', 'المصاريف الشهرية للشركة A: $\\bar{x}=100\\,000$ €، $\\sigma=12\\,500$ €. وللشركة B: $\\bar{x}=15\\,000$ €، $\\sigma=2500$ €. أيهما تشتته النسبي أكبر؟', 'Monthly costs of company A: €$\\bar{x}=100\\,000$ and €$\\sigma=12\\,500$. Company B: €$\\bar{x}=15\\,000$ and €$\\sigma=2\\,500$. Which one has more relative spread?'),
        stepsKind: 'steps',
        steps: [
            { text: say('A enpresa.', 'Empresa A.', 'الشركة A.', 'Company A.'), math: same('$\\frac{12\\,500}{100\\,000}=0{,}125$') },
            { text: say('B enpresa.', 'Empresa B.', 'الشركة B.', 'Company B.'), math: same('$\\frac{2\\,500}{15\\,000}\\approx 0{,}167$') },
            { text: say('B-k: % 16,7 inguru (A-k, % 12,5), nahiz eta haren $\\sigma$ txikiagoa izan.', 'B: un 16,7 % aproximadamente, frente al 12,5 % de A, aunque su $\\sigma$ sea menor.', 'B: نحو 16.7 % مقابل 12.5 % لـA، رغم أن $\\sigma$ لها أصغر.', 'B: about 16.7%, compared with 12.5% for A, even though its $\\sigma$ is smaller.') }
        ],
        takeaway: say('CV = σ zati batez bestekoa: CV txikiagoa, banaketa homogeneoagoa.', 'CV = σ entre la media: menor CV, distribución más homogénea.', 'CV = σ على المتوسط: CV أصغر يعني توزيعًا أكثر تجانسًا.', 'CV = σ divided by the mean: the smaller the CV, the more consistent the distribution.'),
        figure: (language) => <VariationFigure language={language} />
    },

    /* ---------- 5. Two variables ---------- */
    {
        id: 'scatter',
        stage: 'two',
        figureAfterSteps: true,
        title: say('Puntu-hodeiak', 'Nubes de puntos', 'سحب النقاط', 'Scatter plots'),
        goal: say('Banaketa bidimentsional bat puntu-hodei gisa irudikatzea eta erlazio funtzionala eta estatistikoa bereiztea.', 'Representar una distribución bidimensional como nube de puntos y distinguir la relación funcional de la estadística.', 'تمثيل توزيع ثنائي البعد سحابةَ نقاط، والتمييز بين العلاقة الدالية والإحصائية.', 'Show a two-variable distribution as a scatter plot, and tell a functional relationship apart from a statistical one.'),
        needs: [
            { unit: 'dbh3/funciones-lineales', topic: 'function-concept', title: { eu: 'Funtzio baten kontzeptua', es: 'Concepto de función', en: 'What a function is', ar: 'مفهوم الدالة' } }
        ],
        problem: say('10 ikasleren asteko ikasketa-orduak eta nota: (1, 3), (2, 4), (2, 5), (3, 5), (4, 6), (5, 6), (5, 8), (6, 7), (7, 9), (8, 9). Zein erlazio dago?', 'Horas de estudio semanales y nota de 10 alumnos: (1, 3), (2, 4), (2, 5), (3, 5), (4, 6), (5, 6), (5, 8), (6, 7), (7, 9), (8, 9). ¿Qué relación hay?', 'ساعات الدراسة الأسبوعية وعلامة 10 تلاميذ: (1, 3)، (2, 4)، (2, 5)، (3, 5)، (4, 6)، (5, 6)، (5, 8)، (6, 7)، (7, 9)، (8, 9). ما العلاقة؟', 'Weekly study hours and marks of 10 students: (1, 3), (2, 4), (2, 5), (3, 5), (4, 6), (5, 6), (5, 8), (6, 7), (7, 9), (8, 9). What kind of relationship is there?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$X$ ardatzean orduak; $Y$ ardatzean nota.', 'En el eje $X$, las horas; en el eje $Y$, la nota.', 'على المحور $X$ الساعات، وعلى المحور $Y$ العلامة.', 'On the $X$-axis, the hours; on the $Y$-axis, the mark.') },
            { text: say('5 orduko bi ikaslek nota desberdinak dituzte: ez da funtzionala.', 'Dos alumnos de 5 horas tienen notas distintas: no es funcional.', 'تلميذان بـ5 ساعات لهما علامتان مختلفتان: ليست دالية.', 'Two students who study 5 hours have different marks: it is not a functional relationship.'), math: same('$(5,\\ 6)\\qquad (5,\\ 8)$') },
            { text: say('Puntuak gorantz doan zuzen baten inguruan: estatistikoa eta lineala.', 'Los puntos, alrededor de una recta que sube: estadística y lineal.', 'النقاط حول مستقيم صاعد: إحصائية وخطية.', 'The points are around a rising straight line: statistical and linear.') }
        ],
        takeaway: say('Funtzionala: puntuak lerroaren gainean. Estatistikoa: lerroaren inguruan.', 'Funcional: los puntos sobre la línea. Estadística: alrededor de la línea.', 'دالية: النقاط على الخط. إحصائية: حول الخط.', 'Functional: the points lie on the line. Statistical: the points are around the line.'),
        figure: (language) => <ScatterFigure language={language} />
    },
    {
        id: 'correlation',
        stage: 'two',
        title: say('Korrelazioa eta r', 'Correlación y r', 'الارتباط وr', 'Correlation and r'),
        goal: say('Korrelazioaren zeinua eta indarra epaitzea eta hodei bakoitzari bere korrelazio-koefizientea esleitzea.', 'Juzgar el signo y la fuerza de la correlación y asignar a cada nube su coeficiente de correlación.', 'الحكم على إشارة الارتباط وقوته، وإسناد معامل الارتباط المناسب لكل سحابة.', 'Judge the sign and strength of the correlation, and match each cloud to its correlation coefficient.'),
        stepsKind: 'facts',
        steps: [
            { title: say('Positiboa eta sendoa', 'Positiva y fuerte', 'موجب وقوي', 'Positive and strong'), text: say('Hodei estua gorantz.', 'Nube estrecha que sube.', 'سحابة ضيقة صاعدة.', 'Narrow cloud, going up.'), math: same('$r\\approx 0{,}98$') },
            { title: say('Negatiboa eta sendoa', 'Negativa y fuerte', 'سالب وقوي', 'Negative and strong'), text: say('Hodei estua beherantz.', 'Nube estrecha que baja.', 'سحابة ضيقة هابطة.', 'Narrow cloud, going down.'), math: same('$r\\approx -0{,}98$') },
            { title: say('Ahula edo nulua', 'Débil o nula', 'ضعيف أو منعدم', 'Weak or none'), text: say('Hodei zabala gorantz, edo biribila.', 'Nube ancha que sube, o redonda.', 'سحابة عريضة صاعدة، أو مستديرة.', 'Wide cloud going up, or round.'), math: same('$r\\approx 0{,}59\\qquad r\\approx 0{,}06$') }
        ],
        takeaway: say('Zeinua: noranzkoa. |r|: indarra. Korrelazioa ez da kausa.', 'Signo: sentido. |r|: fuerza. Correlación no es causa.', 'الإشارة: الاتجاه. |r|: القوة. الارتباط ليس سببًا.', 'Sign: direction. |r|: strength. Correlation is not causation.'),
        figure: (language) => <CorrelationFigure language={language} />
    },
    {
        id: 'regression',
        stage: 'two',
        title: say('Erregresio-zuzena', 'Recta de regresión', 'مستقيم الانحدار', 'Regression line'),
        goal: say('Erregresio-zuzena batez bestekoen puntutik idaztea, estimazioak egitea eta haien fidagarritasuna epaitzea.', 'Escribir la recta de regresión desde el punto de las medias, hacer estimaciones y juzgar su fiabilidad.', 'كتابة مستقيم الانحدار من نقطة المتوسطين، وإجراء تقديرات والحكم على موثوقيتها.', 'Write the regression line from the point of means, make estimates and judge how reliable they are.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones-polinomicas-racionales', topic: 'line-equation', title: { eu: 'Zuzenaren ekuazioa', es: 'La ecuación de la recta', en: 'The equation of the straight line', ar: 'معادلة المستقيم' } }
        ],
        problem: say('8 egunetan, eguzki-orduen batez bestekoa $\\bar{x}=6$ da eta tenperatura maximoarena $\\bar{y}=11$ °C. Erregresio-zuzenaren malda 0,5 da. Idatzi zuzena eta estimatu tenperatura 9 eguzki-ordurekin.', 'En 8 días, la media de las horas de sol es $\\bar{x}=6$ y la de la temperatura máxima, $\\bar{y}=11$ °C. La pendiente de la recta de regresión es 0,5. Escribe la recta y estima la temperatura con 9 horas de sol.', 'في 8 أيام، متوسط ساعات الشمس $\\bar{x}=6$ ومتوسط الحرارة القصوى $\\bar{y}=11$ °C. ميل مستقيم الانحدار 0.5. اكتب المستقيم وقدّر الحرارة مع 9 ساعات شمس.', 'Over 8 days, the mean sunshine hours is $\\bar{x}=6$ and the mean maximum temperature is $\\bar{y}=11$ °C. The slope of the regression line is 0.5. Write the line and estimate the temperature with 9 hours of sunshine.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batez bestekoen puntutik.', 'Por el punto de las medias.', 'من نقطة المتوسطين.', 'Through the point of means.'), math: same('$\\hat{y}-11=0{,}5\\,(x-6)$') },
            { text: say('Askatu $\\hat{y}$.', 'Despeja $\\hat{y}$.', 'اعزل $\\hat{y}$.', 'Solve for $\\hat{y}$.'), math: same('$\\hat{y}=0{,}5x+8$') },
            { text: say('Ordeztu $x=9$: datuen tartean, fidagarria.', 'Sustituye $x=9$: dentro del intervalo, fiable.', 'عوّض $x=9$: داخل المجال، موثوق.', 'Substitute $x=9$: it is within the range, so it is reliable.'), math: same('$0{,}5\\cdot 9+8=12{,}5$') }
        ],
        takeaway: say('Zuzena (x̄, ȳ) puntutik pasatzen da; estimatu korrelazio sendoarekin eta datuen tartearen barruan.', 'La recta pasa por (x̄, ȳ); estima con correlación fuerte y dentro del intervalo de datos.', 'المستقيم يمرّ بـ(x̄, ȳ)؛ قدّر مع ارتباط قوي وداخل مجال البيانات.', 'The line passes through (x̄, ȳ). Estimate with strong correlation and within the range of the data.'),
        figure: (language) => <RegressionFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const statisticsAkTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...statisticsAkLessonTexts[topic.id as StatisticsAkTopicId], ...statisticsAkLessonChecks[topic.id as StatisticsAkTopicId] }))
