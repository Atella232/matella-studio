import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { BoxPlotFigure, CumulativeFigure, EventsFigure, GroupedFigure, HistogramFigure, MeanTableFigure, MedianTableFigure, MisleadingFigure, PieFigure, QuartilesFigure, SampleFigure, SymmetryFigure, TreeFigure } from '../dbh2-estatistika-v2/figures'
import { TwoDiceFigure } from '../dbh4-akademikoak-probabilitatea/figures'
import { VarianceFigure } from '../dbh4-aplikatuak-estatistika/figures'
import { stats3LessonChecks, type Stats3TopicId } from './lessonChecks'
import { stats3LessonTexts } from './lessonTexts'
import { say, same } from './text'

/* ==========================================================================
   Estatistika eta probabilitatea · 3. DBH — stages and lessons, after
   Santillana 3.º ESO units 13 «Estadística» and 14 «Probabilidad», and
   Anaya 3.º ESO units 13–15 (statistics, parameters, probability). Every
   number and context is original: the books only fix the scope and the
   order. Each lesson names its typical mistake. Medians and quartiles
   follow the textbook rule of ../dbh4-aplikatuak-estatistika/stats.ts.
   ========================================================================== */

export type Stats3StageId = 'data' | 'charts' | 'centre' | 'spread' | 'chance'

export const stats3Stages: UnitStage[] = [
    { id: 'data', tone: 'blue', title: { eu: 'Datuak eta taulak', es: 'Datos y tablas', en: 'Data and tables', ar: 'البيانات والجداول' } },
    { id: 'charts', tone: 'violet', title: { eu: 'Grafikoak', es: 'Gráficos', en: 'Charts', ar: 'المخططات' } },
    { id: 'centre', tone: 'mustard', title: { eu: 'Zentralizazio-neurriak', es: 'Medidas de centralización', en: 'Measures of centre', ar: 'مقاييس النزعة المركزية' } },
    { id: 'spread', tone: 'coral', title: { eu: 'Posizioa eta sakabanaketa', es: 'Posición y dispersión', en: 'Position and spread', ar: 'الموقع والتشتت' } },
    { id: 'chance', tone: 'green', title: { eu: 'Probabilitatea', es: 'Probabilidad', en: 'Probability', ar: 'الاحتمال' } }
]

const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Data and tables ---------- */
    {
        id: 'population-sample',
        stage: 'data',
        title: say('Populazioa, lagina eta aldagaiak', 'Población, muestra y variables', 'المجتمع والعيّنة والمتغيّرات', 'Population, sample and variables'),
        goal: say('Azterketa estatistiko bateko populazioa, lagina eta aldagai mota bereiztea.', 'Distinguir población, muestra y tipo de variable en un estudio estadístico.', 'التمييز بين المجتمع والعيّنة ونوع المتغيّر في دراسة إحصائية.', 'Tell apart the population, the sample and the kind of variable in a statistical study.'),
        problem: say('Ikastetxe batean 600 ikasle daude, eta horietako 60 ikasleri galdetu zaie zenbat ordu lo egiten duten. Zein da lagina, eta zer motatako aldagaia da?', 'En un centro de 600 alumnos se pregunta a 60 cuántas horas duermen. ¿Cuál es la muestra y de qué tipo es la variable?', 'في مدرسة فيها 600 طالب سُئل 60 منهم عن عدد ساعات نومهم. ما العيّنة وما نوع المتغيّر؟', 'In a school of 600 pupils, 60 are asked how many hours they sleep. What is the sample, and what kind of variable is it?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Populazioa: 600 ikasle. Lagina: galdetutako 60 ikasleak.', 'Población: los 600 alumnos. Muestra: los 60 a los que se pregunta.', 'المجتمع: 600 طالب. العيّنة: الطلاب الـ60 المسؤولون.', 'Population: the 600 pupils. Sample: the 60 who are asked.') },
            { text: say('Orduak zenbakiak dira, eta edozein balio izan daiteke: kuantitatibo jarraitua.', 'Las horas son números y pueden tomar cualquier valor: cuantitativa continua.', 'الساعات أعداد وقد تأخذ أي قيمة: كمّي متصل.', 'Hours are numbers and can take any value: quantitative continuous.'), math: same('$\\frac{60}{600}=\\frac{1}{10}$') }
        ],
        takeaway: say('Lagina: AUSAZ eta behar bezain HANDIA.', 'Muestra: al AZAR y lo bastante GRANDE.', 'العيّنة: عشوائية وكبيرة بما يكفي.', 'Sample: at RANDOM and LARGE enough.'),
        figure: (language) => <SampleFigure language={language} />
    },
    {
        id: 'frequency-table',
        stage: 'data',
        title: say('Maiztasun-taulak', 'Tablas de frecuencias', 'جداول التكرارات', 'Frequency tables'),
        goal: say('Maiztasun absolutuak, erlatiboak eta metatuak kalkulatzea.', 'Calcular frecuencias absolutas, relativas y acumuladas.', 'حساب التكرارات المطلقة والنسبية والمتجمّعة.', 'Work out absolute, relative and cumulative frequencies.'),
        problem: say('Hogei ikasleri galdetu zaie zenbat anai-arreba dituzten: 0 → 4, 1 → 9, 2 → 5, 3 → 2. Zein da 1 balioaren maiztasun erlatiboa eta metatua?', 'Se pregunta a veinte alumnos cuántos hermanos tienen: 0 → 4, 1 → 9, 2 → 5, 3 → 2. ¿Cuáles son la frecuencia relativa y la acumulada del valor 1?', 'سُئل عشرون طالبًا عن عدد إخوتهم: 0 ← 4، 1 ← 9، 2 ← 5، 3 ← 2. ما التكرار النسبي والمتجمّع للقيمة 1؟', 'Twenty pupils are asked how many siblings they have: 0 → 4, 1 → 9, 2 → 5, 3 → 2. What are the relative and the cumulative frequency of the value 1?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erlatiboa.', 'Relativa.', 'النسبي.', 'Relative.'), math: same('$h=\\frac{9}{20}=0{,}45$') },
            { text: say('Metatua: 0 eta 1 balioak.', 'Acumulada: los valores 0 y 1.', 'المتجمّع: القيمتان 0 و1.', 'Cumulative: the values 0 and 1.'), math: same('$F=4+9=13$') }
        ],
        takeaway: same('$h_{i}=\\frac{f_{i}}{N}$'),
        figure: (language) => <CumulativeFigure language={language} />
    },
    {
        id: 'grouped-data',
        stage: 'data',
        figureAfterSteps: true,
        title: say('Tarteetan multzokatutako datuak', 'Datos agrupados en intervalos', 'البيانات المجمّعة في فترات', 'Data grouped in intervals'),
        goal: say('Datu jarraituak tarteetan biltzea eta klase-marka kalkulatzea.', 'Agrupar datos continuos en intervalos y calcular la marca de clase.', 'تجميع البيانات المتصلة في فترات وحساب مركز الفئة.', 'Group continuous data in intervals and work out the class midpoint.'),
        needs: [{ unit: 'dbh3/potencias-raices', topic: 'intervals', title: { eu: 'Tarteak', es: 'Intervalos', en: 'Intervals', ar: 'الفترات' } }],
        problem: say('Zein tartetan sartzen da 160 cm-ko altuera, $[150,160)$ ala $[160,170)$? Eta zein da tarte horren klase-marka?', '¿En qué intervalo entra una altura de 160 cm, $[150,160)$ o $[160,170)$? ¿Y cuál es la marca de clase de ese intervalo?', 'في أي فترة يقع طول 160 سم، $[150,160)$ أم $[160,170)$؟ وما مركز تلك الفئة؟', 'Which interval does a height of 160 cm go into, $[150,160)$ or $[160,170)$? And what is the class midpoint of that interval?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Parentesi karratuak muturra barne hartzen du.', 'El corchete incluye el extremo.', 'القوس المربّع يشمل الطرف.', 'The square bracket includes the end.'), math: same('$160\\in[160,170)$') },
            { text: say('Klase-marka.', 'Marca de clase.', 'مركز الفئة.', 'Class midpoint.'), math: same('$\\frac{160+170}{2}=165$') }
        ],
        takeaway: say('Klase-marka: $\\frac{a+b}{2}$, tartearen ERDIA.', 'Marca de clase: $\\frac{a+b}{2}$, el MEDIO del intervalo.', 'مركز الفئة: $\\frac{a+b}{2}$، منتصف الفترة.', 'Class midpoint: $\\frac{a+b}{2}$, the MIDDLE of the interval.'),
        figure: (language) => <GroupedFigure language={language} />
    },
    /* ---------- 2. Charts ---------- */
    {
        id: 'bar-histogram',
        stage: 'charts',
        title: say('Barra-diagramak eta histogramak', 'Diagramas de barras e histogramas', 'مخططات الأعمدة والمدرّجات التكرارية', 'Bar charts and histograms'),
        goal: say('Aldagai bakoitzerako grafiko egokia aukeratzea eta irakurtzea.', 'Elegir y leer el gráfico adecuado para cada variable.', 'اختيار المخطط المناسب لكل متغيّر وقراءته.', 'Choose and read the right chart for each variable.'),
        needs: [{ unit: 'dbh2/estadistica-probabilidad', topic: 'grouped', title: { eu: 'Datu multzokatuak', es: 'Datos agrupados', en: 'Grouped data', ar: 'البيانات المبوّبة' } }],
        problem: say('Histograma batean $[10,20)$ tarteko laukizuzenak 8 balio du, eta $[20,30)$ tartekoak 12. Zenbat datu daude 10 eta 30 artean?', 'En un histograma, el rectángulo de $[10,20)$ mide 8 y el de $[20,30)$ mide 12. ¿Cuántos datos hay entre 10 y 30?', 'في مدرّج تكراري ارتفاع مستطيل $[10,20)$ هو 8 ومستطيل $[20,30)$ هو 12. كم بيانًا بين 10 و30؟', 'In a histogram the rectangle for $[10,20)$ is 8 high and the one for $[20,30)$ is 12. How many data are there between 10 and 30?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batu bi maiztasunak.', 'Suma las dos frecuencias.', 'اجمع التكرارين.', 'Add the two frequencies.'), math: same('$8+12=20$') }
        ],
        takeaway: say('Barrak: BEREIZITA. Histograma: ELKARREN ONDOAN.', 'Barras: SEPARADAS. Histograma: PEGADOS.', 'الأعمدة: منفصلة. المدرّج: متلاصق.', 'Bars: APART. Histogram: TOUCHING.'),
        figure: (language) => <HistogramFigure language={language} />
    },
    {
        id: 'pie-chart',
        stage: 'charts',
        title: say('Sektore-diagramak', 'Diagramas de sectores', 'المخططات الدائرية', 'Pie charts'),
        goal: say('Sektore baten angelua kalkulatzea maiztasunetik.', 'Calcular el ángulo de un sector a partir de la frecuencia.', 'حساب زاوية القطاع من التكرار.', 'Work out the angle of a sector from the frequency.'),
        needs: [{ unit: 'dbh3/proporcionalidad', topic: 'percent-index', title: { eu: 'Ehunekoak eta aldakuntza-indizea', es: 'Porcentajes e índice de variación', en: 'Percentages and the index of change', ar: 'النسب المئوية ومؤشر التغيّر' } }],
        problem: say('40 ikasletik 14 bizikletan etortzen dira. Zenbat gradu ditu bizikletaren sektoreak?', 'De 40 alumnos, 14 vienen en bici. ¿Cuántos grados mide el sector de la bici?', 'من بين 40 طالبًا يأتي 14 بالدراجة. كم درجة قطاع الدراجة؟', 'Of 40 pupils, 14 come by bike. How many degrees is the bike sector?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Maiztasun erlatiboa bider 360°.', 'Frecuencia relativa por 360°.', 'التكرار النسبي في 360°.', 'Relative frequency times 360°.'), math: same('$\\frac{14}{40}\\cdot 360=126$') }
        ],
        takeaway: say('Angelua = $\\frac{f}{N}\\cdot 360°$.', 'Ángulo = $\\frac{f}{N}\\cdot 360°$.', 'الزاوية = $\\frac{f}{N}\\cdot 360°$.', 'Angle = $\\frac{f}{N}\\cdot 360°$.'),
        figure: (language) => <PieFigure language={language} />
    },
    {
        id: 'reading-charts',
        stage: 'charts',
        title: say('Grafikoak kritikoki irakurri', 'Leer gráficos con sentido crítico', 'قراءة المخططات بعين ناقدة', 'Reading charts critically'),
        goal: say('Grafiko engainagarriak ezagutzea.', 'Reconocer gráficos engañosos.', 'التعرّف على المخططات المضلِّلة.', 'Spot misleading charts.'),
        problem: say('Grafiko batean salmentak igo dira: lehen 96 ziren eta orain 100, eta barra bat bestea baino hiru aldiz altuagoa ikusten da. Zenbat igo dira ehunekotan?', 'En un gráfico las ventas pasan de 96 a 100 y una barra se ve el triple de alta que la otra. ¿Cuánto han subido en porcentaje?', 'في مخطط ترتفع المبيعات من 96 إلى 100 ويبدو عمود أعلى من الآخر بثلاث مرات. كم ارتفعت بالنسبة المئوية؟', 'On a chart sales go from 96 to 100 and one bar looks three times as tall as the other. By what percentage have they risen?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Igoera zati hasierakoa.', 'La subida entre lo inicial.', 'الزيادة على القيمة الابتدائية.', 'The rise over the starting value.'), math: same('$\\frac{4}{96}\\cdot 100\\approx 4{,}2$') },
            { text: say('Ardatza ez da 0 balioan hasten: hiru aldiz altuagoa ikusten da, baina % 4 inguru da.', 'El eje no empieza en 0: se ve el triple, pero es un 4 % aproximadamente.', 'المحور لا يبدأ من 0: يبدو ثلاثة أضعاف لكنه نحو 4 %.', 'The axis does not start at 0: it looks three times as tall, but it is about 4%.') }
        ],
        takeaway: say('Begiratu ARDATZA: 0 balioan hasten al da?', 'Mira el EJE: ¿empieza en 0?', 'انظر إلى المحور: هل يبدأ من 0؟', 'Look at the AXIS: does it start at 0?'),
        figure: (language) => <MisleadingFigure language={language} />
    },
    /* ---------- 3. Measures of centre ---------- */
    {
        id: 'mean',
        stage: 'centre',
        title: say('Batez besteko aritmetikoa', 'La media aritmética', 'المتوسط الحسابي', 'The mean'),
        goal: say('Datu-zerrenda baten eta maiztasun-taula baten batez bestekoa kalkulatzea.', 'Calcular la media de una lista de datos y de una tabla de frecuencias.', 'حساب متوسط قائمة بيانات وجدول تكرارات.', 'Work out the mean of a list of data and of a frequency table.'),
        problem: say('Taula: $x_{i}=1,2,3$ eta $f_{i}=4,5,1$. Zein da batez bestekoa?', 'Tabla: $x_{i}=1,2,3$ y $f_{i}=4,5,1$. ¿Cuál es la media?', 'الجدول: $x_{i}=1,2,3$ و$f_{i}=4,5,1$. ما المتوسط؟', 'Table: $x_{i}=1,2,3$ and $f_{i}=4,5,1$. What is the mean?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu eta batu.', 'Multiplica y suma.', 'اضرب واجمع.', 'Multiply and add.'), math: same('$1\\cdot 4+2\\cdot 5+3\\cdot 1=17$') },
            { text: say('Zatitu $N$ zenbakiaz.', 'Divide entre $N$.', 'اقسم على $N$.', 'Divide by $N$.'), math: same('$\\frac{17}{10}=1{,}7$') }
        ],
        takeaway: same('$\\bar{x}=\\frac{\\Sigma x_{i}f_{i}}{N}$'),
        figure: (language) => <MeanTableFigure language={language} />
    },
    {
        id: 'median',
        stage: 'centre',
        title: say('Mediana', 'La mediana', 'الوسيط', 'The median'),
        goal: say('Datuak ordenatu eta erdiko balioa aurkitzea.', 'Ordenar los datos y encontrar el valor central.', 'ترتيب البيانات وإيجاد القيمة الوسطى.', 'Sort the data and find the middle value.'),
        problem: say('Datuak: $7,\\ 2,\\ 9,\\ 4,\\ 6,\\ 3$. Zein da mediana?', 'Datos: $7,\\ 2,\\ 9,\\ 4,\\ 6,\\ 3$. ¿Cuál es la mediana?', 'البيانات: $7,\\ 2,\\ 9,\\ 4,\\ 6,\\ 3$. ما الوسيط؟', 'Data: $7,\\ 2,\\ 9,\\ 4,\\ 6,\\ 3$. What is the median?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordenatu.', 'Ordena.', 'رتّب.', 'Sort.'), math: same('$2,\\ 3,\\ 4,\\ 6,\\ 7,\\ 9$') },
            { text: say('Sei datu: erdiko bien batez bestekoa.', 'Seis datos: la media de los dos centrales.', 'ستة بيانات: متوسط البيانين الأوسطين.', 'Six data: the mean of the two middle ones.'), math: same('$\\frac{4+6}{2}=5$') }
        ],
        takeaway: say('Lehenik ORDENATU, gero ERDIKOA.', 'Primero ORDENA, después el CENTRAL.', 'رتّب أولًا ثم خذ الأوسط.', 'First SORT, then the MIDDLE one.'),
        figure: (language) => <MedianTableFigure language={language} />
    },
    {
        id: 'mode',
        stage: 'centre',
        title: say('Moda eta neurrien konparazioa', 'La moda y comparar medidas', 'المنوال ومقارنة المقاييس', 'The mode and comparing measures'),
        goal: say('Moda aurkitzea eta zentralizazio-neurri egokiena aukeratzea.', 'Encontrar la moda y elegir la medida de centralización más adecuada.', 'إيجاد المنوال واختيار مقياس النزعة المركزية الأنسب.', 'Find the mode and choose the most suitable measure of centre.'),
        needs: [{ unit: 'dbh2/estadistica-probabilidad', topic: 'symmetry', title: { eu: 'Batez bestekoa ala mediana?', es: '¿Media o mediana?', en: 'Mean or median?', ar: 'المتوسط أم الوسيط؟' } }],
        problem: say('Oinetakoen neurriak: 38 → 3, 39 → 7, 40 → 5, 41 → 2. Zein da moda?', 'Tallas de zapato: 38 → 3, 39 → 7, 40 → 5, 41 → 2. ¿Cuál es la moda?', 'مقاسات الأحذية: 38 ← 3، 39 ← 7، 40 ← 5، 41 ← 2. ما المنوال؟', 'Shoe sizes: 38 → 3, 39 → 7, 40 → 5, 41 → 2. What is the mode?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Maiztasun handiena 7 da.', 'La mayor frecuencia es 7.', 'أكبر تكرار 7.', 'The highest frequency is 7.') },
            { text: say('Moda balioa da, ez maiztasuna.', 'La moda es el valor, no la frecuencia.', 'المنوال هو القيمة لا التكرار.', 'The mode is the value, not the frequency.'), math: same('$Mo=39$') }
        ],
        takeaway: say('Moda: GEHIEN errepikatzen den BALIOA.', 'Moda: el VALOR que MÁS se repite.', 'المنوال: القيمة الأكثر تكرارًا.', 'Mode: the VALUE that repeats MOST.'),
        figure: (language) => <SymmetryFigure language={language} />
    },
    /* ---------- 4. Position and spread ---------- */
    {
        id: 'range-quartiles',
        stage: 'spread',
        title: say('Ibiltartea eta kuartilak', 'Recorrido y cuartiles', 'المدى والربيعيات', 'Range and quartiles'),
        goal: say('Ibiltartea eta kuartilak kalkulatzea.', 'Calcular el recorrido y los cuartiles.', 'حساب المدى والربيعيات.', 'Work out the range and the quartiles.'),
        needs: [{ unit: 'dbh2/estadistica-probabilidad', topic: 'median-table', title: { eu: 'Mediana eta moda taula batetik', es: 'Mediana y moda desde una tabla', en: 'Median and mode from a table', ar: 'الوسيط والمنوال من جدول' } }],
        problem: say('Datu ordenatuak: $3,\\ 5,\\ 6,\\ 8,\\ 9,\\ 11,\\ 12,\\ 15$. Kalkulatu ibiltartea eta $Q_{1}$.', 'Datos ordenados: $3,\\ 5,\\ 6,\\ 8,\\ 9,\\ 11,\\ 12,\\ 15$. Calcula el recorrido y $Q_{1}$.', 'بيانات مرتّبة: $3,\\ 5,\\ 6,\\ 8,\\ 9,\\ 11,\\ 12,\\ 15$. احسب المدى و$Q_{1}$.', 'Sorted data: $3,\\ 5,\\ 6,\\ 8,\\ 9,\\ 11,\\ 12,\\ 15$. Work out the range and $Q_{1}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ibiltartea.', 'Recorrido.', 'المدى.', 'Range.'), math: same('$15-3=12$') },
            { text: say('$\\frac{8}{4}=2$ osoa da: 2. eta 3. datuak.', '$\\frac{8}{4}=2$ es entero: datos 2.º y 3.º', '$\\frac{8}{4}=2$ صحيح: البيانان الثاني والثالث.', '$\\frac{8}{4}=2$ is whole: the 2nd and 3rd data.'), math: same('$Q_{1}=\\frac{5+6}{2}=5{,}5$') }
        ],
        takeaway: say('Ibiltartea: HANDIENA − TXIKIENA. $Q_{1}$: $\\frac{N}{4}$.', 'Recorrido: MAYOR − MENOR. $Q_{1}$: $\\frac{N}{4}$.', 'المدى: الأكبر − الأصغر. $Q_{1}$: $\\frac{N}{4}$.', 'Range: LARGEST − SMALLEST. $Q_{1}$: $\\frac{N}{4}$.'),
        figure: (language) => <QuartilesFigure language={language} />
    },
    {
        id: 'box-plot',
        stage: 'spread',
        title: say('Kutxa-diagrama', 'El diagrama de caja', 'مخطط الصندوق', 'The box plot'),
        goal: say('Kutxa-diagrama bat irakurtzea eta marraztea.', 'Leer y dibujar un diagrama de caja y bigotes.', 'قراءة مخطط الصندوق ورسمه.', 'Read and draw a box plot.'),
        needs: [{ unit: 'dbh2/estadistica-probabilidad', topic: 'quartiles', title: { eu: 'Kuartilak', es: 'Cuartiles', en: 'Quartiles', ar: 'الربيعيات' } }],
        problem: say('Kutxa-diagrama batean: txikiena 4, $Q_{1}=7$, mediana 10, $Q_{3}=15$, handiena 20. Zein da kuartil arteko ibiltartea? Datuen zer ehuneko daude 7 eta 15 artean?', 'En un diagrama de caja: mínimo 4, $Q_{1}=7$, mediana 10, $Q_{3}=15$, máximo 20. ¿Cuál es el rango intercuartílico? ¿Qué porcentaje de datos hay entre 7 y 15?', 'في مخطط صندوق: الأصغر 4، $Q_{1}=7$، الوسيط 10، $Q_{3}=15$، الأكبر 20. ما المدى الربيعي؟ وما نسبة البيانات بين 7 و15؟', 'In a box plot: minimum 4, $Q_{1}=7$, median 10, $Q_{3}=15$, maximum 20. What is the interquartile range? What percentage of the data lie between 7 and 15?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kutxaren luzera.', 'Longitud de la caja.', 'طول الصندوق.', 'Length of the box.'), math: same('$15-7=8$') },
            { text: say('Kutxak datuen erdia dauka: % 50.', 'La caja tiene la mitad de los datos: el 50 %.', 'الصندوق يحوي نصف البيانات: 50 %.', 'The box holds half the data: 50%.') }
        ],
        takeaway: say('Kutxa: $Q_{1}$ → $Q_{3}$, datuen % 50.', 'Caja: $Q_{1}$ → $Q_{3}$, el 50 % de los datos.', 'الصندوق: $Q_{1}$ ← $Q_{3}$، 50 % من البيانات.', 'Box: $Q_{1}$ → $Q_{3}$, 50% of the data.'),
        figure: (language) => <BoxPlotFigure language={language} />
    },
    {
        id: 'variance',
        stage: 'spread',
        title: say('Bariantza eta desbideratze tipikoa', 'Varianza y desviación típica', 'التباين والانحراف المعياري', 'Variance and standard deviation'),
        goal: say('Datuak batez bestekoarekiko nola sakabanatzen diren neurtzea.', 'Medir cuánto se separan los datos de la media.', 'قياس مدى ابتعاد البيانات عن المتوسط.', 'Measure how far the data are from the mean.'),
        needs: [{ unit: 'dbh2/estadistica-probabilidad', topic: 'deviation', title: { eu: 'Ibiltartea eta batez besteko desbideratzea', es: 'Recorrido y desviación media', en: 'Range and mean deviation', ar: 'المدى والانحراف المتوسط' } }, { unit: 'dbh3/potencias-raices', topic: 'roots', title: { eu: 'Erro karratuak eta kuboak', es: 'Raíces cuadradas y cúbicas', en: 'Square and cube roots', ar: 'الجذور التربيعية والتكعيبية' } }],
        problem: say('Datuak: $2,\\ 4,\\ 6,\\ 8,\\ 10$. Kalkulatu bariantza eta desbideratze tipikoa.', 'Datos: $2,\\ 4,\\ 6,\\ 8,\\ 10$. Calcula la varianza y la desviación típica.', 'البيانات: $2,\\ 4,\\ 6,\\ 8,\\ 10$. احسب التباين والانحراف المعياري.', 'Data: $2,\\ 4,\\ 6,\\ 8,\\ 10$. Work out the variance and the standard deviation.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batez bestekoa.', 'Media.', 'المتوسط.', 'Mean.'), math: same('$\\frac{30}{5}=6$') },
            { text: say('Distantzien karratuak.', 'Cuadrados de las distancias.', 'مربعات المسافات.', 'Squares of the distances.'), math: same('$16+4+0+4+16=40$') },
            { text: say('Bariantza eta erroa.', 'Varianza y raíz.', 'التباين والجذر.', 'Variance and root.'), math: same('$\\frac{40}{5}=8\\ \\to\\ \\sigma=\\sqrt{8}\\approx 2{,}83$') }
        ],
        takeaway: same('$\\sigma=\\sqrt{\\frac{\\Sigma(x_{i}-\\bar{x})^{2}}{N}}$'),
        figure: (language) => <VarianceFigure language={language} />
    },
    /* ---------- 5. Probability ---------- */
    {
        id: 'events',
        stage: 'chance',
        title: say('Ausazko esperimentuak eta gertaerak', 'Experimentos aleatorios y sucesos', 'التجارب العشوائية والأحداث', 'Random experiments and events'),
        goal: say('Lagin-espazioa eta gertaerak idaztea.', 'Escribir el espacio muestral y los sucesos.', 'كتابة فضاء العيّنة والأحداث.', 'Write down the sample space and events.'),
        problem: say('Dado bat jaurtitzen da. $A$: «4 baino handiagoa». Idatzi $A$ eta $\\bar{A}$.', 'Se lanza un dado. $A$: «mayor que 4». Escribe $A$ y $\\bar{A}$.', 'يُرمى نرد. $A$: «أكبر من 4». اكتب $A$ و$\\bar{A}$.', 'A die is rolled. $A$: «greater than 4». Write $A$ and $\\bar{A}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lagin-espazioa.', 'Espacio muestral.', 'فضاء العيّنة.', 'Sample space.'), math: same('$E=\\{1,2,3,4,5,6\\}$') },
            { text: say('Gertaera eta aurkakoa.', 'Suceso y contrario.', 'الحدث ومتمّمه.', 'Event and complement.'), math: same('$A=\\{5,6\\},\\ \\bar{A}=\\{1,2,3,4\\}$') }
        ],
        takeaway: say('$\\bar{A}$: $A$ GERTATZEN EZ DENEAN.', '$\\bar{A}$: cuando NO ocurre $A$.', '$\\bar{A}$: عندما لا يقع $A$.', '$\\bar{A}$: when $A$ does NOT happen.'),
        figure: (language) => <EventsFigure language={language} />
    },
    {
        id: 'laplace',
        stage: 'chance',
        title: say('Laplaceren erregela', 'La regla de Laplace', 'قاعدة لابلاس', 'Laplace’s rule'),
        goal: say('Probabilitateak kalkulatzea emaitza berdin probableekin.', 'Calcular probabilidades con resultados igual de probables.', 'حساب الاحتمالات مع نتائج متساوية الاحتمال.', 'Work out probabilities with equally likely outcomes.'),
        needs: [{ unit: 'dbh2/estadistica-probabilidad', topic: 'events', title: { eu: 'Gertaerak eta aurkako gertaera', es: 'Sucesos y suceso contrario', en: 'Events and complementary events', ar: 'الأحداث والحدث المعاكس' } }],
        problem: say('Poltsa batean 12 bola daude: 5 gorri, 4 urdin eta 3 berde. Zein da bola ez-gorri bat ateratzeko probabilitatea?', 'En una bolsa hay 12 bolas: 5 rojas, 4 azules y 3 verdes. ¿Cuál es la probabilidad de sacar una bola que no sea roja?', 'في كيس 12 كرة: 5 حمراء و4 زرقاء و3 خضراء. ما احتمال سحب كرة ليست حمراء؟', 'A bag holds 12 balls: 5 red, 4 blue and 3 green. What is the probability of drawing a ball that is not red?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Gorria.', 'Roja.', 'حمراء.', 'Red.'), math: same('$P(R)=\\frac{5}{12}$') },
            { text: say('Aurkakoa.', 'Contrario.', 'المتمّم.', 'Complement.'), math: same('$1-\\frac{5}{12}=\\frac{7}{12}$') }
        ],
        takeaway: say('P = ALDEKOAK : POSIBLEAK, 0 eta 1 artean.', 'P = FAVORABLES : POSIBLES, entre 0 y 1.', 'الاحتمال = المواتية ÷ الممكنة، بين 0 و1.', 'P = FAVOURABLE ÷ POSSIBLE, between 0 and 1.'),
        figure: (language) => <TwoDiceFigure language={language} />
    },
    {
        id: 'compound',
        stage: 'chance',
        title: say('Esperimentu konposatuak', 'Experimentos compuestos', 'التجارب المركّبة', 'Compound experiments'),
        goal: say('Zuhaitz-diagramekin bi urratseko probabilitateak kalkulatzea.', 'Calcular probabilidades de dos pasos con diagramas de árbol.', 'حساب احتمالات خطوتين بمخططات الشجرة.', 'Work out two-step probabilities with tree diagrams.'),
        needs: [{ unit: 'dbh2/estadistica-probabilidad', topic: 'tree', title: { eu: 'Zuhaitz-diagramak eta taulak', es: 'Diagramas de árbol y tablas', en: 'Tree diagrams and tables', ar: 'المخططات الشجرية والجداول' } }, { unit: 'dbh3/numeros-racionales', topic: 'mul-div', title: { eu: 'Biderketa eta zatiketa', es: 'Multiplicación y división', en: 'Multiplication and division', ar: 'الضرب والقسمة' } }],
        problem: say('Poltsa batean 3 bola gorri eta 2 urdin daude. Bi atera dira, itzuli gabe. Zein da biak gorriak izateko probabilitatea?', 'En una bolsa hay 3 bolas rojas y 2 azules. Se sacan dos sin devolver. ¿Cuál es la probabilidad de que las dos sean rojas?', 'في كيس 3 كرات حمراء و2 زرقاوان. تُسحب كرتان دون إرجاع. ما احتمال أن تكونا حمراوين؟', 'A bag holds 3 red balls and 2 blue ones. Two are drawn without putting back. What is the probability that both are red?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehenengoa gorria.', 'La primera roja.', 'الأولى حمراء.', 'First one red.'), math: same('$\\frac{3}{5}$') },
            { text: say('Bigarrena gorria: 4 bola geratzen dira, 2 gorri.', 'La segunda roja: quedan 4 bolas, 2 rojas.', 'الثانية حمراء: تبقى 4 كرات منها 2 حمراوان.', 'Second one red: 4 balls left, 2 red.'), math: same('$\\frac{3}{5}\\cdot\\frac{2}{4}=\\frac{6}{20}=\\frac{3}{10}$') }
        ],
        takeaway: say('Bide batean: BIDERKATU. Bideen artean: BATU.', 'En un camino: MULTIPLICA. Entre caminos: SUMA.', 'في المسار: اضرب. بين المسارات: اجمع.', 'Along a path: MULTIPLY. Across paths: ADD.'),
        figure: (language) => <TreeFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const stats3Topics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...stats3LessonTexts[topic.id as Stats3TopicId], ...stats3LessonChecks[topic.id as Stats3TopicId] }))
