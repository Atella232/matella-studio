import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { BarChartFigure, DiceFigure, FrequencyTableFigure, LineChartFigure, MeanFigure, PieChartFigure, PopulationFigure } from './figures'
import { statisticsIntroLessonChecks, type StatisticsIntroTopicId } from './lessonChecks'
import { statisticsIntroLessonTexts } from './lessonTexts'

/* ==========================================================================
   Estatistika · 1. DBH — stages and lessons
   Sequence follows Anaya 1.º ESO unit 15 (statistical study, frequency
   tables, graphs, parameters) and Santillana 1.º ESO unit 14 (random
   experiments, sample space, events, relative frequency and Laplace's
   rule). The class survey on favourite sports runs through the unit.
   Decimals with a comma (a point in Arabic).
   ========================================================================== */

export type StatisticsIntroStageId = 'data' | 'tables' | 'graphs' | 'parameters' | 'probability'

const dec = (latex: string): LocalizedText => ({ eu: latex, es: latex, en: latex, ar: latex.replace(/\{,\}/g, '.') })

export const statisticsIntroStages: UnitStage[] = [
    { id: 'data', tone: 'blue', title: { eu: 'Datuak eta aldagaiak', es: 'Datos y variables', en: 'Data and variables', ar: 'البيانات والمتغيرات' } },
    { id: 'tables', tone: 'violet', title: { eu: 'Maiztasun-taulak', es: 'Tablas de frecuencias', en: 'Frequency tables', ar: 'جداول التكرارات' } },
    { id: 'graphs', tone: 'mustard', title: { eu: 'Grafikoak', es: 'Gráficos', en: 'Charts', ar: 'التمثيلات البيانية' } },
    { id: 'parameters', tone: 'coral', title: { eu: 'Parametroak', es: 'Parámetros', en: 'Summary measures', ar: 'المقاييس' } },
    { id: 'probability', tone: 'green', title: { eu: 'Probabilitatea', es: 'Probabilidad', en: 'Probability', ar: 'الاحتمال' } }
]

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    {
        id: 'study',
        stage: 'data',
        title: { eu: 'Azterketa estatistiko bat', es: 'Un estudio estadístico', en: 'A statistical study', ar: 'دراسة إحصائية' },
        goal: {
            eu: 'Populazioa, lagina eta banakoa bereiztea eta azterketa baten urratsak ezagutzea.',
            es: 'Distinguir población, muestra e individuo y conocer los pasos de un estudio.',
            en: 'Distinguish population, sample and individual, and know the steps of a study.',
            ar: 'التمييز بين المجتمع والعيّنة والفرد ومعرفة خطوات الدراسة.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Populazioa', es: 'Población', en: 'Population', ar: 'المجتمع' }, text: { eu: 'Ikastetxeko ikasle guztiak.', es: 'Todos los alumnos del instituto.', en: 'All the students at the school.', ar: 'كل تلاميذ المدرسة.' } },
            { title: { eu: 'Lagina', es: 'Muestra', en: 'Sample', ar: 'العيّنة' }, text: { eu: 'Maila bakoitzeko 20 ikasle, zoriz aukeratuta.', es: '20 alumnos de cada curso, elegidos al azar.', en: '20 students from each year group, chosen at random.', ar: '20 تلميذًا من كل صف مختارون عشوائيًا.' } },
            { title: { eu: 'Banakoa', es: 'Individuo', en: 'Individual', ar: 'الفرد' }, text: { eu: 'Ikasle bakoitza.', es: 'Cada alumno.', en: 'Each student.', ar: 'كل تلميذ.' } }
        ],
        takeaway: {
            eu: 'Lagina populazioaren zati bat da, eta ondo ordezkatu behar du.',
            es: 'La muestra es una parte de la población y tiene que representarla bien.',
            en: 'The sample is part of the population and has to represent it well.',
            ar: 'العيّنة جزء من المجتمع ويجب أن تمثّله جيدًا.'
        },
        figure: (language) => <PopulationFigure language={language} />
    },
    {
        id: 'variables',
        stage: 'data',
        title: { eu: 'Aldagai estatistikoak', es: 'Variables estadísticas', en: 'Statistical variables', ar: 'المتغيرات الإحصائية' },
        goal: {
            eu: 'Aldagai kualitatiboak eta kuantitatiboak (diskretuak eta jarraituak) bereiztea.',
            es: 'Distinguir variables cualitativas y cuantitativas (discretas y continuas).',
            en: 'Distinguish qualitative and quantitative variables (discrete and continuous).',
            ar: 'التمييز بين المتغيرات النوعية والكمية (المنفصلة والمتصلة).'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Kualitatiboa', es: 'Cualitativa', en: 'Qualitative', ar: 'نوعي' }, text: { eu: 'Ezaugarri bat: kirola, kolorea, jatorria.', es: 'Una cualidad: deporte, color, origen.', en: 'A quality: sport, colour, origin.', ar: 'صفة: الرياضة، اللون، الأصل.' } },
            { title: { eu: 'Kuantitatibo diskretua', es: 'Cuantitativa discreta', en: 'Discrete quantitative', ar: 'كمي منفصل' }, text: { eu: 'Zenbatu egiten da: anai-arrebak, oinetako-zenbakia.', es: 'Se cuenta: hermanos, número de pie.', en: 'Counted: siblings, shoe size.', ar: 'يُعَدّ: الإخوة، مقاس الحذاء.' } },
            { title: { eu: 'Kuantitatibo jarraitua', es: 'Cuantitativa continua', en: 'Continuous quantitative', ar: 'كمي متصل' }, text: { eu: 'Neurtu egiten da: altuera, denbora, pisua.', es: 'Se mide: altura, tiempo, peso.', en: 'Measured: height, time, weight.', ar: 'يُقاس: الطول، الزمن، الوزن.' } }
        ],
        takeaway: {
            eu: 'Zenbatu → diskretua. Neurtu → jarraitua. Zenbakirik ez → kualitatiboa.',
            es: 'Se cuenta → discreta. Se mide → continua. Sin números → cualitativa.',
            en: 'Counted → discrete. Measured → continuous. No numbers → qualitative.',
            ar: 'يُعَدّ ← منفصل. يُقاس ← متصل. بلا أعداد ← نوعي.'
        }
    },
    {
        id: 'frequencies',
        stage: 'tables',
        title: { eu: 'Maiztasun absolutua eta erlatiboa', es: 'Frecuencia absoluta y relativa', en: 'Absolute and relative frequency', ar: 'التكرار المطلق والنسبي' },
        goal: {
            eu: 'Maiztasun absolutua, erlatiboa eta ehunekoa kalkulatzea.',
            es: 'Calcular la frecuencia absoluta, la relativa y el porcentaje.',
            en: 'Calculate the absolute frequency, the relative frequency and the percentage.',
            ar: 'حساب التكرار المطلق والنسبي والنسبة المئوية.'
        },
        needs: [{ unit: 'dbh1/proporcionalidad', topic: 'percent-meaning', title: { eu: 'Ehunekoaren esanahia', es: 'Qué es un porcentaje', en: 'What is a percentage?', ar: 'معنى النسبة المئوية' } }],
        problem: { eu: '20 ikasletatik 8 ikaslek futbola nahiago dute. Kalkulatu maiztasun erlatiboa eta ehunekoa.', es: 'De 20 alumnos, 8 prefieren el fútbol. Calcula la frecuencia relativa y el porcentaje.', en: 'Of 20 students, 8 prefer football. Calculate the relative frequency and the percentage.', ar: 'من 20 تلميذًا يفضّل 8 كرة القدم. احسب التكرار النسبي والنسبة المئوية.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Maiztasun absolutua: 8. Datu kopurua: N = 20.', es: 'Frecuencia absoluta: 8. Número de datos: N = 20.', en: 'Absolute frequency: 8. Number of values: N = 20.', ar: 'التكرار المطلق: 8. عدد البيانات: N = 20.' } },
            { text: { eu: 'Maiztasun erlatiboa: zatitu N-z.', es: 'Frecuencia relativa: divide entre N.', en: 'Relative frequency: divide by N.', ar: 'التكرار النسبي: اقسم على N.' }, math: dec('$h=8\\mathbin{:}20=0{,}4$') },
            { text: { eu: 'Ehunekoa: bider 100.', es: 'Porcentaje: por 100.', en: 'Percentage: multiply by 100.', ar: 'النسبة المئوية: في 100.' }, math: dec('$0{,}4\\cdot 100=40$') }
        ],
        takeaway: {
            eu: 'Maiztasun erlatibo guztiek 1 dute batuta; ehunekoek, 100.',
            es: 'Todas las frecuencias relativas suman 1; los porcentajes, 100.',
            en: 'All the relative frequencies add up to 1; the percentages, to 100.',
            ar: 'مجموع كل التكرارات النسبية 1، ومجموع النسب المئوية 100.'
        }
    },
    {
        id: 'table',
        stage: 'tables',
        title: { eu: 'Maiztasun-taula egitea', es: 'Construir una tabla de frecuencias', en: 'Building a frequency table', ar: 'بناء جدول تكرارات' },
        goal: {
            eu: 'Datu-zerrenda batetik maiztasun-taula osatzea.',
            es: 'Completar una tabla de frecuencias a partir de una lista de datos.',
            en: 'Complete a frequency table from a list of data.',
            ar: 'إكمال جدول تكرارات انطلاقًا من قائمة بيانات.'
        },
        problem: { eu: 'Anai-arreba kopurua: 1, 2, 0, 1, 1, 3, 2, 1, 0, 1. Egin taula.', es: 'Número de hermanos: 1, 2, 0, 1, 1, 3, 2, 1, 0, 1. Haz la tabla.', en: 'Number of siblings: 1, 2, 0, 1, 1, 3, 2, 1, 0, 1. Make the table.', ar: 'عدد الإخوة: 1، 2، 0، 1، 1، 3، 2، 1، 0، 1. أنشئ الجدول.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Balioak: 0, 1, 2, 3.', es: 'Valores: 0, 1, 2, 3.', en: 'Values: 0, 1, 2, 3.', ar: 'القيم: 0، 1، 2، 3.' } },
            { text: { eu: 'Zenbatu: 0 → 2, 1 → 5, 2 → 2, 3 → 1.', es: 'Cuenta: 0 → 2, 1 → 5, 2 → 2, 3 → 1.', en: 'Count: 0 → 2, 1 → 5, 2 → 2, 3 → 1.', ar: 'عُدّ: 0 ← 2، 1 ← 5، 2 ← 2، 3 ← 1.' }, math: '$2+5+2+1=10$' },
            { text: { eu: 'Maiztasun erlatiboak: zati 10.', es: 'Frecuencias relativas: entre 10.', en: 'Relative frequencies: divide by 10.', ar: 'التكرارات النسبية: على 10.' }, math: dec('$0{,}2+0{,}5+0{,}2+0{,}1=1$') }
        ],
        takeaway: {
            eu: 'Egiaztatu beti fᵢ-en batura datu kopurua dela.',
            es: 'Comprueba siempre que la suma de las fᵢ es el número de datos.',
            en: 'Always check that the sum of the fᵢ is the number of values.',
            ar: 'تحقّق دائمًا من أن مجموع fᵢ يساوي عدد البيانات.'
        },
        figure: (language) => <FrequencyTableFigure language={language} />
    },
    {
        id: 'bar-chart',
        stage: 'graphs',
        title: { eu: 'Barra-diagramak', es: 'Diagramas de barras', en: 'Bar charts', ar: 'مخططات الأعمدة' },
        goal: {
            eu: 'Barra-diagrama bat egitea eta irakurtzea.',
            es: 'Construir y leer un diagrama de barras.',
            en: 'Build and read a bar chart.',
            ar: 'بناء مخطط أعمدة وقراءته.'
        },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Marraztu bi ardatzak eta aukeratu eskala.', es: 'Dibuja los dos ejes y elige la escala.', en: 'Draw the two axes and choose the scale.', ar: 'ارسم المحورين واختر المقياس.' } },
            { text: { eu: 'Balio bakoitzeko, marraztu bere maiztasunaren altuerako barra.', es: 'Para cada valor, dibuja una barra con la altura de su frecuencia.', en: 'For each value, draw a bar with the height of its frequency.', ar: 'لكل قيمة ارسم عمودًا ارتفاعه تكرارها.' } },
            { text: { eu: 'Jarri izenburua eta ardatzen izenak.', es: 'Pon título y nombre a los ejes.', en: 'Add a title and label the axes.', ar: 'ضع عنوانًا واسمًا للمحورين.' } }
        ],
        takeaway: {
            eu: 'Barra altuena = modarik gabe ere ikusten da zein den gehien errepikatzen dena.',
            es: 'La barra más alta muestra de un vistazo el valor que más se repite.',
            en: 'The tallest bar shows at a glance the value that appears most often.',
            ar: 'العمود الأعلى يُظهر فورًا القيمة الأكثر تكرارًا.'
        },
        figure: (language) => <BarChartFigure language={language} />
    },
    {
        id: 'pie-chart',
        stage: 'graphs',
        title: { eu: 'Sektore-diagramak', es: 'Diagramas de sectores', en: 'Pie charts', ar: 'المخططات الدائرية' },
        goal: {
            eu: 'Sektore-diagrama bateko angeluak kalkulatzea.',
            es: 'Calcular los ángulos de un diagrama de sectores.',
            en: 'Calculate the angles of a pie chart.',
            ar: 'حساب زوايا مخطط دائري.'
        },
        needs: [{ unit: 'dbh1/proporcionalidad', topic: 'direct-unit', title: { eu: 'Unitatera laburtzea', es: 'Reducción a la unidad', en: 'Unitary method', ar: 'الإرجاع إلى الوحدة' } }],
        problem: { eu: '20 ikasletatik 5 ikaslek saskibaloia nahiago dute. Zenbat gradu ditu bere sektoreak?', es: 'De 20 alumnos, 5 prefieren el baloncesto. ¿Cuántos grados mide su sector?', en: 'Of 20 students, 5 prefer basketball. How many degrees does its sector measure?', ar: 'من 20 تلميذًا يفضّل 5 كرة السلة. كم درجة قطاعها؟' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Pertsona bakoitzeko gradua: 360 zati 20.', es: 'Grados por persona: 360 entre 20.', en: 'Degrees per person: 360 divided by 20.', ar: 'درجات كل شخص: 360 على 20.' }, math: '$360\\mathbin{:}20=18$' },
            { text: { eu: 'Bider maiztasuna.', es: 'Por la frecuencia.', en: 'Multiply by the frequency.', ar: 'في التكرار.' }, math: '$5\\cdot 18=90$' },
            { text: { eu: 'Sektoreak 90° ditu: zirkuluaren laurdena.', es: 'El sector mide 90°: un cuarto del círculo.', en: 'The sector measures 90°: a quarter of the circle.', ar: 'القطاع 90°: ربع الدائرة.' } }
        ],
        takeaway: {
            eu: 'Angelu guztiek 360° dute batuta.',
            es: 'Todos los ángulos suman 360°.',
            en: 'All the angles add up to 360°.',
            ar: 'مجموع كل الزوايا 360°.'
        },
        figureAfterSteps: true,
        figure: (language) => <PieChartFigure language={language} />
    },
    {
        id: 'line-chart',
        stage: 'graphs',
        title: { eu: 'Lerro-diagramak', es: 'Diagramas de líneas', en: 'Line charts', ar: 'المخططات الخطية' },
        goal: {
            eu: 'Denboran aldatzen diren datuak lerro-diagrama batean irudikatzea eta irakurtzea.',
            es: 'Representar y leer datos que cambian con el tiempo en un diagrama de líneas.',
            en: 'Draw and read data that change over time on a line chart.',
            ar: 'تمثيل بيانات تتغيّر مع الزمن بمخطط خطي وقراءتها.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Igotzen da', es: 'Sube', en: 'Goes up', ar: 'يصعد' }, text: { eu: 'Asteazkenetik ostiralera tenperatura igo da.', es: 'Del miércoles al viernes la temperatura sube.', en: 'From Wednesday to Friday, the temperature goes up.', ar: 'من الأربعاء إلى الجمعة ترتفع الحرارة.' }, math: '$15\\to 21$' },
            { title: { eu: 'Maximoa', es: 'Máximo', en: 'Maximum', ar: 'القيمة العظمى' }, text: { eu: 'Punturik altuena: ostirala, 21°.', es: 'El punto más alto: el viernes, 21°.', en: 'The highest point: Friday, 21°.', ar: 'أعلى نقطة: الجمعة، 21°.' } }
        ],
        takeaway: {
            eu: 'Lerro-diagramak aldaketak erakusten ditu: igoerak eta jaitsierak.',
            es: 'El diagrama de líneas muestra cambios: subidas y bajadas.',
            en: 'The line chart shows changes: rises and falls.',
            ar: 'المخطط الخطي يُظهر التغيّرات: الصعود والنزول.'
        },
        figure: (language) => <LineChartFigure language={language} />
    },
    {
        id: 'mean',
        stage: 'parameters',
        title: { eu: 'Batez bestekoa', es: 'La media', en: 'The mean', ar: 'المتوسط الحسابي' },
        goal: {
            eu: 'Datu-multzo baten batez bestekoa kalkulatzea.',
            es: 'Calcular la media de un conjunto de datos.',
            en: 'Calculate the mean of a data set.',
            ar: 'حساب متوسط مجموعة بيانات.'
        },
        needs: [{ unit: 'dbh1/numeros-decimales', topic: 'divide-natural', title: { eu: 'Zatiketa hamartarra: zatitzailea zenbaki arrunta', es: 'División decimal: divisor natural', en: 'Decimal division: natural-number divisor', ar: 'القسمة العشرية: المقسوم عليه عدد طبيعي' } }],
        problem: { eu: 'Kalkulatu nota hauen batez bestekoa: 5, 7, 7, 8, 9, 6.', es: 'Calcula la media de estas notas: 5, 7, 7, 8, 9, 6.', en: 'Calculate the mean of these marks: 5, 7, 7, 8, 9, 6.', ar: 'احسب متوسط هذه العلامات: 5، 7، 7، 8، 9، 6.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Batu datu guztiak.', es: 'Suma todos los datos.', en: 'Add up all the values.', ar: 'اجمع كل البيانات.' }, math: '$5+7+7+8+9+6=42$' },
            { text: { eu: 'Zatitu datu kopuruaz.', es: 'Divide entre el número de datos.', en: 'Divide by the number of values.', ar: 'اقسم على عدد البيانات.' }, math: '$42\\mathbin{:}6=7$' }
        ],
        takeaway: {
            eu: 'Batez bestekoa = batura : zenbat datu.',
            es: 'Media = suma : cuántos datos.',
            en: 'Mean = sum : number of values.',
            ar: 'المتوسط = المجموع : عدد البيانات.'
        },
        figureAfterSteps: true,
        figure: (language) => <MeanFigure language={language} />
    },
    {
        id: 'median-mode',
        stage: 'parameters',
        title: { eu: 'Mediana eta moda', es: 'Mediana y moda', en: 'Median and mode', ar: 'الوسيط والمنوال' },
        goal: {
            eu: 'Datu-multzo baten mediana eta moda aurkitzea.',
            es: 'Encontrar la mediana y la moda de un conjunto de datos.',
            en: 'Find the median and the mode of a data set.',
            ar: 'إيجاد الوسيط والمنوال لمجموعة بيانات.'
        },
        needs: [{ unit: 'dbh1/zenbaki-naturalak', topic: 'order', title: { eu: 'Ordenatu eta zuzenean kokatu', es: 'Ordenar y situar en la recta', en: 'Ordering and placing on the number line', ar: 'الترتيب والتمثيل على المستقيم' } }],
        problem: { eu: 'Aurkitu mediana eta moda: 3, 7, 5, 7, 9.', es: 'Halla la mediana y la moda de: 3, 7, 5, 7, 9.', en: 'Find the median and the mode of: 3, 7, 5, 7, 9.', ar: 'أوجد الوسيط والمنوال لـ: 3، 7، 5، 7، 9.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Ordenatu datuak.', es: 'Ordena los datos.', en: 'Sort the values.', ar: 'رتّب البيانات.' }, math: '$3,\\ 5,\\ 7,\\ 7,\\ 9$' },
            { text: { eu: 'Erdikoa (hirugarrena): mediana.', es: 'El del centro (el tercero): la mediana.', en: 'The middle one (the third): the median.', ar: 'الأوسط (الثالث): الوسيط.' }, math: '$\\text{Me}=7$' },
            { text: { eu: 'Gehien errepikatzen dena: moda.', es: 'El que más se repite: la moda.', en: 'The one that appears most often: the mode.', ar: 'الأكثر تكرارًا: المنوال.' }, math: '$\\text{Mo}=7$' }
        ],
        takeaway: {
            eu: 'Mediana: lehenik ordenatu. Moda: gehien errepikatzen dena.',
            es: 'Mediana: primero ordena. Moda: la que más se repite.',
            en: 'Median: sort the values first. Mode: the one that appears most often.',
            ar: 'الوسيط: رتّب أولًا. المنوال: الأكثر تكرارًا.'
        }
    },
    {
        id: 'range',
        stage: 'parameters',
        title: { eu: 'Ibiltartea', es: 'El rango', en: 'The range', ar: 'المدى' },
        goal: {
            eu: 'Datuen ibiltartea kalkulatzea eta sakabanaketa ulertzea.',
            es: 'Calcular el rango de los datos y entender la dispersión.',
            en: 'Calculate the range of the data and understand the spread.',
            ar: 'حساب مدى البيانات وفهم التشتت.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'A taldea', es: 'Grupo A', en: 'Group A', ar: 'المجموعة أ' }, text: { eu: 'Notak 6, 7, 7, 8: x̄ = 7, ibiltartea 2.', es: 'Notas 6, 7, 7, 8: x̄ = 7, rango 2.', en: 'Marks 6, 7, 7, 8: x̄ = 7, range 2.', ar: 'العلامات 6، 7، 7، 8: x̄ = 7، المدى 2.' }, math: '$8-6=2$' },
            { title: { eu: 'B taldea', es: 'Grupo B', en: 'Group B', ar: 'المجموعة ب' }, text: { eu: 'Notak 3, 7, 8, 10: x̄ = 7, ibiltartea 7.', es: 'Notas 3, 7, 8, 10: x̄ = 7, rango 7.', en: 'Marks 3, 7, 8, 10: x̄ = 7, range 7.', ar: 'العلامات 3، 7، 8، 10: x̄ = 7، المدى 7.' }, math: '$10-3=7$' }
        ],
        takeaway: {
            eu: 'Ibiltartea = handiena − txikiena.',
            es: 'Rango = mayor − menor.',
            en: 'Range = largest − smallest.',
            ar: 'المدى = الأكبر − الأصغر.'
        }
    },
    {
        id: 'random',
        stage: 'probability',
        title: { eu: 'Esperimentu aleatorioak eta gertaerak', es: 'Experimentos aleatorios y sucesos', en: 'Random experiments and events', ar: 'التجارب العشوائية والأحداث' },
        goal: {
            eu: 'Esperimentu aleatorioak ezagutzea eta haien lagin-espazioa eta gertaerak idaztea.',
            es: 'Reconocer experimentos aleatorios y escribir su espacio muestral y sus sucesos.',
            en: 'Recognise random experiments and write down their sample space and events.',
            ar: 'التعرّف إلى التجارب العشوائية وكتابة فضاء عيّنتها وأحداثها.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Lagin-espazioa', es: 'Espacio muestral', en: 'Sample space', ar: 'فضاء العيّنة' }, text: { eu: 'Dado bat jaurtitzean.', es: 'Al lanzar un dado.', en: 'When you roll a die.', ar: 'عند رمي نرد.' }, math: '$E=\\{1,2,3,4,5,6\\}$' },
            { title: { eu: 'Gertaera', es: 'Suceso', en: 'Event', ar: 'الحدث' }, text: { eu: '«Bikoitia ateratzea».', es: '«Sacar par».', en: '“Rolling an even number”.', ar: '«الحصول على عدد زوجي».' }, math: '$A=\\{2,4,6\\}$' },
            { title: { eu: 'Ziurra eta ezinezkoa', es: 'Seguro e imposible', en: 'Certain and impossible', ar: 'أكيد ومستحيل' }, text: { eu: '«7 baino gutxiago ateratzea» ziurra da; «7 ateratzea», ezinezkoa.', es: '«Sacar menos de 7» es seguro; «sacar un 7», imposible.', en: '“Rolling less than 7” is certain; “rolling a 7” is impossible.', ar: '«الحصول على أقل من 7» أكيد؛ و«الحصول على 7» مستحيل.' } }
        ],
        takeaway: {
            eu: 'Aleatorioa: ezin da aurreikusi. Lagin-espazioa: emaitza posible guztiak.',
            es: 'Aleatorio: no se puede prever. Espacio muestral: todos los resultados posibles.',
            en: 'Random: it cannot be predicted. Sample space: all the possible results.',
            ar: 'العشوائي: لا يمكن توقّعه. فضاء العيّنة: كل النتائج الممكنة.'
        },
        figure: (language) => <DiceFigure language={language} />
    },
    {
        id: 'laplace',
        stage: 'probability',
        title: { eu: 'Laplaceren erregela', es: 'La regla de Laplace', en: 'Laplace\'s rule', ar: 'قاعدة لابلاس' },
        goal: {
            eu: 'Gertaera baten probabilitatea Laplaceren erregelarekin kalkulatzea.',
            es: 'Calcular la probabilidad de un suceso con la regla de Laplace.',
            en: 'Calculate the probability of an event using Laplace\'s rule.',
            ar: 'حساب احتمال حدث بقاعدة لابلاس.'
        },
        needs: [{ unit: 'dbh1/zatikiak', topic: 'what', title: { eu: 'Zatikiak: zenbakitzailea eta izendatzailea', es: 'La fracción: numerador y denominador', en: 'The fraction: numerator and denominator', ar: 'الكسر: البسط والمقام' } }],
        problem: { eu: 'Poltsa batean 3 bola gorri eta 5 urdin daude. Zein da gorri bat ateratzeko probabilitatea?', es: 'En una bolsa hay 3 bolas rojas y 5 azules. ¿Cuál es la probabilidad de sacar una roja?', en: 'In a bag there are 3 red balls and 5 blue ones. What is the probability of drawing a red one?', ar: 'في كيس 3 كرات حمراء و5 زرقاء. ما احتمال سحب كرة حمراء؟' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Kasu posibleak: bola guztiak.', es: 'Casos posibles: todas las bolas.', en: 'Possible cases: all the balls.', ar: 'الحالات الممكنة: كل الكرات.' }, math: '$3+5=8$' },
            { text: { eu: 'Aldeko kasuak: bola gorriak.', es: 'Casos favorables: las rojas.', en: 'Favourable cases: the red ones.', ar: 'الحالات الملائمة: الكرات الحمراء.' }, math: '$3$' },
            { text: { eu: 'Zatitu.', es: 'Divide.', en: 'Divide.', ar: 'اقسم.' }, math: dec('$P=\\frac{3}{8}=0{,}375$') }
        ],
        takeaway: {
            eu: 'P = aldeko kasuak : kasu posibleak.',
            es: 'P = casos favorables : casos posibles.',
            en: 'P = favourable cases : possible cases.',
            ar: 'P = الحالات الملائمة : الحالات الممكنة.'
        }
    },
    {
        id: 'frequency-probability',
        stage: 'probability',
        title: { eu: 'Maiztasuna eta probabilitatea', es: 'Frecuencia y probabilidad', en: 'Frequency and probability', ar: 'التكرار والاحتمال' },
        goal: {
            eu: 'Maiztasun erlatiboaren eta probabilitatearen arteko lotura ulertzea.',
            es: 'Entender la relación entre la frecuencia relativa y la probabilidad.',
            en: 'Understand the relationship between relative frequency and probability.',
            ar: 'فهم العلاقة بين التكرار النسبي والاحتمال.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Gutxitan', es: 'Pocas veces', en: 'A few times', ar: 'مرات قليلة' }, text: { eu: 'Emaitzak asko alda daitezke.', es: 'Los resultados pueden variar mucho.', en: 'The results can vary a lot.', ar: 'قد تتغيّر النتائج كثيرًا.' }, math: dec('$\\frac{7}{10}=0{,}7$') },
            { title: { eu: 'Askotan', es: 'Muchas veces', en: 'Many times', ar: 'مرات كثيرة' }, text: { eu: 'Maiztasuna probabilitatera hurbiltzen da.', es: 'La frecuencia se acerca a la probabilidad.', en: 'The frequency gets closer to the probability.', ar: 'يقترب التكرار من الاحتمال.' }, math: dec('$\\frac{497}{1\\,000}\\approx 0{,}5$') }
        ],
        takeaway: {
            eu: 'Zenbat eta saiakera gehiago, orduan eta hurbilago probabilitatetik.',
            es: 'Cuantas más pruebas, más cerca de la probabilidad.',
            en: 'The more trials, the closer to the probability.',
            ar: 'كلما زادت التجارب اقتربنا من الاحتمال.'
        }
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const statisticsIntroTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...statisticsIntroLessonTexts[topic.id as StatisticsIntroTopicId], ...statisticsIntroLessonChecks[topic.id as StatisticsIntroTopicId] }))
