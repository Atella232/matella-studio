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
    { id: 'data', tone: 'blue', title: { eu: 'Datuak eta grafikoak', es: 'Datos y gráficos', ar: 'البيانات والتمثيلات' } },
    { id: 'centre', tone: 'violet', title: { eu: 'Zentralizazioa eta posizioa', es: 'Centralización y posición', ar: 'النزعة المركزية والموقع' } },
    { id: 'spread', tone: 'mustard', title: { eu: 'Sakabanaketa', es: 'Dispersión', ar: 'التشتت' } },
    { id: 'two', tone: 'coral', title: { eu: 'Bi aldagai', es: 'Dos variables', ar: 'متغيران' } },
    { id: 'chance', tone: 'green', title: { eu: 'Probabilitatea', es: 'Probabilidad', ar: 'الاحتمال' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })

export const statisticsTopics: UnitTopic[] = [
    /* ---------- 1. Data and graphs ---------- */
    {
        id: 'sampling',
        stage: 'data',
        title: say('Populazioa, lagina eta aldagaiak', 'Población, muestra y variables', 'المجتمع والعيّنة والمتغيرات'),
        goal: say('Noiz behar den lagin bat erabakitzea, lagin bat baliozkoa den epaitzea eta aldagaiak sailkatzea.', 'Decidir cuándo hace falta una muestra, juzgar si una muestra es válida y clasificar las variables.', 'تقرير متى نحتاج إلى عيّنة، والحكم على صلاحية عيّنة، وتصنيف المتغيرات.'),
        explanation: say(
            'Estatistikak bi zati ditu. Estatistika deskribatzaileak datuak antolatu, irudikatu eta laburtzen ditu; estatistika inferentzialak lagin baten emaitzetatik populazio osoari buruzko ondorioak ateratzen ditu. Populazioa aztertu nahi diren elementu guztiak dira; lagina, benetan aztertzen den zatia. Lagin bat hartzen da populazioa oso handia delako, denei galdetzea garestiegia delako edo azterketak elementua suntsitzen duelako (pila bat noiz agortzen den neurtzeko, pila erabili egin behar da). Lagina baliozkoa izateko, zoriz aukeratu behar da eta talde guztiak behar bezala ordezkatu: herri bateko hautesleen artean, hauteslerroetatik zoriz aukeratzea baliozkoa da; jaietara joandakoei galdetzea, ez. Aldagaiak kualitatiboak edo kuantitatiboak dira, eta azken hauek diskretuak (zenbatu) edo jarraituak (neurtu).',
            'La estadística tiene dos partes. La estadística descriptiva organiza, representa y resume los datos; la estadística inferencial saca conclusiones sobre toda la población a partir de los resultados de una muestra. La población son todos los elementos que se quieren estudiar; la muestra, la parte que realmente se estudia. Se toma una muestra porque la población es muy grande, porque preguntar a todos es demasiado caro o porque el estudio destruye el elemento (para medir cuánto dura una pila, hay que gastarla). Para que la muestra sea válida, hay que elegirla al azar y representar bien a todos los grupos: entre los electores de un pueblo, elegir al azar en las listas electorales es válido; preguntar a quienes van a las fiestas, no. Las variables son cualitativas o cuantitativas, y estas, discretas (se cuentan) o continuas (se miden).',
            'للإحصاء جزآن. الإحصاء الوصفي ينظّم البيانات ويمثّلها ويلخّصها، والإحصاء الاستدلالي يستخلص نتائج عن المجتمع كله انطلاقًا من نتائج عيّنة. المجتمع هو كل العناصر التي نريد دراستها، والعيّنة هي الجزء الذي ندرسه فعلًا. نأخذ عيّنة لأن المجتمع كبير جدًا، أو لأن سؤال الجميع مكلف جدًا، أو لأن الدراسة تُتلف العنصر (لقياس مدة بطارية يجب استهلاكها). ولتكون العيّنة صالحة يجب اختيارها عشوائيًا وأن تمثّل كل الفئات تمثيلًا جيدًا: بين ناخبي بلدة، الاختيار العشوائي من القوائم الانتخابية صالح، أما سؤال من يحضرون الاحتفالات فلا. والمتغيرات نوعية أو كمية، والكمية منفصلة (تُعَدّ) أو متصلة (تُقاس).'
        ),
        stepsKind: 'facts',
        steps: [
            { title: say('Populazio osoa', 'Toda la población', 'المجتمع كله'), text: say('Mintegi bateko 285 landareak neur daitezke denak: ez da laginik behar.', 'Las 285 plantas de un vivero se pueden medir todas: no hace falta muestra.', 'يمكن قياس نباتات المشتل الـ285 كلها: لا حاجة إلى عيّنة.') },
            { title: say('Lagina derrigorrez', 'Muestra obligada', 'عيّنة لا بدّ منها'), text: say('Pilen iraupena edo torlojuen erresistentzia: azterketak hondatu egiten ditu.', 'La duración de las pilas o la resistencia de los tornillos: el estudio los estropea.', 'مدة البطاريات أو مقاومة البراغي: الدراسة تُتلفها.') },
            { title: say('Lagin baliogabea', 'Muestra no válida', 'عيّنة غير صالحة'), text: say('Alkateak aukeratutako 200 lagun: hautaketa subjektiboa da, ez zorizkoa.', 'Las 200 personas que elige el alcalde: la selección es subjetiva, no al azar.', '200 شخص يختارهم رئيس البلدية: الاختيار ذاتي لا عشوائي.') }
        ],
        example: say('$\\text{lagina}\\subset\\text{populazioa}$', '$\\text{muestra}\\subset\\text{población}$', '$E\\subset P$'),
        takeaway: say('Lagina zoriz eta talde guztiekin: horrela bakarrik balio du populazioaz hitz egiteko.', 'La muestra, al azar y con todos los grupos: solo así sirve para hablar de la población.', 'العيّنة عشوائية ومن كل الفئات: هكذا فقط تصلح للحديث عن المجتمع.'),
        figure: (language) => <SampleFigure language={language} />
    },
    {
        id: 'intervals',
        stage: 'data',
        title: say('Tarteetako taulak', 'Tablas con intervalos', 'الجداول بالفئات'),
        goal: say('Datu asko tarteetan antolatzea: ibiltartea, tarte kopurua, zabalera eta klase-markak.', 'Organizar muchos datos en intervalos: recorrido, número de intervalos, amplitud y marcas de clase.', 'تنظيم بيانات كثيرة في فئات: المدى وعدد الفئات وطولها ومراكزها.'),
        explanation: say(
            'Datu asko daudenean, tarteetan multzokatzen dira. Lehenik ibiltartea kalkulatzen da: $r=\\text{handiena}-\\text{txikiena}$. Gero tarte kopurua erabakitzen da (normalean 6 eta 12 artean) eta $r$ baino handixeagoa den eta tarte kopuruaz zatigarria den $r\'$ zenbaki bat aukeratzen da. Zabalera $r\'$ zati tarte kopurua da. Soberakina ($r\'-r$) bi muturretan banatzen da: horrela tarteak datu txikiena baino zertxobait lehenago hasten dira, eta muga hamartar batean geratzen dira, datu bat ere ez dagoela muga batean. Tarte bakoitzaren klase-marka haren erdia da. Taulan maiztasun absolutua ($f_i$), erlatiboa ($h_i=f_i:N$) eta ehunekoa idazten dira.',
            'Cuando hay muchos datos, se agrupan en intervalos. Primero se calcula el recorrido: $r=\\text{mayor}-\\text{menor}$. Después se decide el número de intervalos (normalmente entre 6 y 12) y se elige un número $r\'$ algo mayor que $r$ y divisible entre el número de intervalos. La amplitud es $r\'$ entre el número de intervalos. El exceso ($r\'-r$) se reparte entre los dos extremos: así los intervalos empiezan un poco antes del dato menor y sus extremos quedan en una cifra decimal, sin que ningún dato caiga en un extremo. La marca de clase de cada intervalo es su punto medio. En la tabla se escriben la frecuencia absoluta ($f_i$), la relativa ($h_i=f_i:N$) y el porcentaje.',
            'عندما تكثر البيانات تُبوَّب في فئات. أولًا نحسب المدى: $r$ = الأكبر − الأصغر. ثم نقرّر عدد الفئات (عادةً بين 6 و12) ونختار عددًا $r\'$ أكبر قليلًا من $r$ ويقبل القسمة على عدد الفئات. طول الفئة هو $r\'$ مقسومًا على عدد الفئات. ويُوزَّع الفائض ($r\'-r$) على الطرفين: هكذا تبدأ الفئات قبل أصغر بيان بقليل، وتقع حدودها عند رقم عشري فلا يقع أي بيان على حدّ. ومركز كل فئة هو منتصفها. ونكتب في الجدول التكرار المطلق ($f_i$) والنسبي ($h_i=f_i:N$) والنسبة المئوية.'
        ),
        problem: say('40 ikasleren altuerak 148 cm-tik 177 cm-ra doaz. Antolatu 6 tartetan.', 'Las alturas de 40 alumnos van de 148 cm a 177 cm. Organízalas en 6 intervalos.', 'تمتد أطوال 40 تلميذًا من 148 سم إلى 177 سم. نظّمها في 6 فئات.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ibiltartea, eta 6z zatigarria den $r\'$.', 'Recorrido, y un $r\'$ divisible entre 6.', 'المدى، و$r\'$ يقبل القسمة على 6.'), math: same('$177-148=29\\ \\to\\ r\'=30$') },
            { text: say('Zabalera.', 'Amplitud.', 'طول الفئة.'), math: same('$30:6=5$') },
            { text: say('Soberakina 1 da: hasi 0,5 lehenago.', 'El exceso es 1: empieza 0,5 antes.', 'الفائض 1: ابدأ قبل 0.5.'), math: same('$147{,}5-152{,}5-\\ldots-177{,}5$') }
        ],
        example: same('$\\frac{147{,}5+152{,}5}{2}=150$'),
        takeaway: say('Ibiltartea, tarte kopurua, zabalera; hasi txikiena baino apur bat lehenago eta kalkulatu klase-markak.', 'Recorrido, número de intervalos, amplitud; empieza un poco antes del menor y calcula las marcas de clase.', 'المدى، عدد الفئات، الطول؛ ابدأ قبل الأصغر بقليل واحسب مراكز الفئات.'),
        figure: (language) => <IntervalsFigure language={language} />
    },
    {
        id: 'charts',
        stage: 'data',
        title: say('Grafiko egokia', 'El gráfico adecuado', 'التمثيل المناسب'),
        goal: say('Aldagai bakoitzerako grafiko egokia aukeratzea eta histograma bat irakurtzea.', 'Elegir el gráfico adecuado para cada variable y leer un histograma.', 'اختيار التمثيل المناسب لكل متغير وقراءة مدرّج تكراري.'),
        explanation: say(
            'Aldagai kualitatiboetarako (hiriak, kirolak) barra-diagrama edo sektore-diagrama erabiltzen da; sektoreetan, angelua $h_i\\cdot 360^{\\circ}$ da. Aldagai kuantitatibo diskretuetarako (seme-alabak, akatsak) barra-diagrama, barra meheekin eta balio bakoitzaren gainean. Datuak tarteetan daudenean, histograma: laukizuzen itsatsiak, oinarria tartea eta altuera maiztasuna (tarte guztiek zabalera bera badute). Klase-marken gaineko puntuak lotuta maiztasun-poligonoa lortzen da. Denboran zehar aldatzen den magnitude baterako (tenperatura, salmentak), lerro-diagrama. Histograma batean ikusten da non pilatzen diren datuak eta banaketa simetrikoa den.',
            'Para las variables cualitativas (ciudades, deportes) se usa el diagrama de barras o el de sectores; en los sectores, el ángulo es $h_i\\cdot 360^{\\circ}$. Para las variables cuantitativas discretas (hijos, errores), el diagrama de barras, con barras finas sobre cada valor. Cuando los datos están en intervalos, el histograma: rectángulos pegados, con base el intervalo y altura la frecuencia (si todos los intervalos tienen la misma amplitud). Uniendo los puntos sobre las marcas de clase se obtiene el polígono de frecuencias. Para una magnitud que cambia con el tiempo (temperatura, ventas), el diagrama de líneas. En un histograma se ve dónde se acumulan los datos y si la distribución es simétrica.',
            'للمتغيرات النوعية (المدن، الرياضات) نستعمل مخطط الأعمدة أو المخطط الدائري؛ وفي القطاعات تكون الزاوية $h_i\\cdot 360^{\\circ}$. وللمتغيرات الكمية المنفصلة (الأبناء، الأخطاء) مخطط الأعمدة بأعمدة رفيعة فوق كل قيمة. وعندما تكون البيانات في فئات نستعمل المدرّج التكراري: مستطيلات متلاصقة، قاعدتها الفئة وارتفاعها التكرار (إذا تساوت أطوال الفئات). وبوصل النقاط فوق مراكز الفئات نحصل على المضلّع التكراري. ولمقدار يتغيّر مع الزمن (الحرارة، المبيعات) المخطط الخطي. وفي المدرّج نرى أين تتجمّع البيانات وهل التوزيع متماثل.'
        ),
        problem: say('30 ikasleren altuerak: $[140,150)$ 3, $[150,160)$ 9, $[160,170)$ 12, $[170,180)$ 6. Zein grafiko? Zer ehuneko dago 160 cm-tik behera?', 'Alturas de 30 alumnos: $[140,150)$ 3, $[150,160)$ 9, $[160,170)$ 12, $[170,180)$ 6. ¿Qué gráfico? ¿Qué porcentaje mide menos de 160 cm?', 'أطوال 30 تلميذًا: $[140,150)$ 3، $[150,160)$ 9، $[160,170)$ 12، $[170,180)$ 6. أي تمثيل؟ ما نسبة من طولهم أقل من 160 سم؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Aldagai jarraitua tarteetan: histograma.', 'Variable continua en intervalos: histograma.', 'متغير متصل في فئات: مدرّج تكراري.') },
            { text: say('160tik behera: lehen bi tarteak.', 'Menos de 160: los dos primeros intervalos.', 'أقل من 160: الفئتان الأوليان.'), math: same('$3+9=12$') },
            { text: say('Ehunekoa.', 'Porcentaje.', 'النسبة المئوية.'), math: same('$\\frac{12}{30}\\cdot 100=40$') }
        ],
        example: same('$0{,}25\\cdot 360^{\\circ}=90^{\\circ}$'),
        takeaway: say('Kualitatiboa: barrak edo sektoreak. Diskretua: barrak. Tarteak: histograma. Denbora: lerroak.', 'Cualitativa: barras o sectores. Discreta: barras. Intervalos: histograma. Tiempo: líneas.', 'نوعي: أعمدة أو قطاعات. منفصل: أعمدة. فئات: مدرّج. زمن: خطوط.'),
        figure: (language) => <HistogramFigure language={language} />
    },

    /* ---------- 2. Centralization and position ---------- */
    {
        id: 'central',
        stage: 'centre',
        title: say('Batez bestekoa, mediana eta moda', 'Media, mediana y moda', 'المتوسط والوسيط والمنوال'),
        goal: say('Taula baten zentralizazio-parametroak kalkulatzea, datuak tarteetan daudenean ere.', 'Calcular los parámetros de centralización de una tabla, también cuando los datos están en intervalos.', 'حساب مقاييس النزعة المركزية لجدول، حتى عندما تكون البيانات في فئات.'),
        explanation: say(
            'Batez bestekoa $\\bar{x}=\\frac{\\sum f_i x_i}{N}$ da: balio bakoitza bider bere maiztasuna, batu eta datu kopuruaz zatitu. Datuak tarteetan badaude, $x_i$ klase-marka da, eta emaitza hurbilketa ona da. Mediana (Me) datuak ordenatuta erdian dagoena da: $N:2$ postua bilatzen da maiztasun metatuetan. Moda (Mo) maiztasun handieneko balioa da; tarteetan, maiztasun handieneko tartea (tarte modala) eta haren klase-marka ematen dira. Kalkulagailu zientifikoak modu estatistikoa du (SD edo STAT): balioak eta maiztasunak sartuta, $\\bar{x}$ zuzenean ematen du.',
            'La media es $\\bar{x}=\\frac{\\sum f_i x_i}{N}$: cada valor por su frecuencia, se suma y se divide entre el número de datos. Si los datos están en intervalos, $x_i$ es la marca de clase, y el resultado es una buena aproximación. La mediana (Me) es el valor que queda en el centro con los datos ordenados: se busca la posición $N:2$ en las frecuencias acumuladas. La moda (Mo) es el valor de mayor frecuencia; en intervalos se da el intervalo de mayor frecuencia (intervalo modal) y su marca de clase. La calculadora científica tiene un modo estadístico (SD o STAT): introduciendo valores y frecuencias, da $\\bar{x}$ directamente.',
            'المتوسط هو $\\bar{x}=\\frac{\\sum f_i x_i}{N}$: كل قيمة في تكرارها ثم الجمع والقسمة على عدد البيانات. وإذا كانت البيانات في فئات فإن $x_i$ هو مركز الفئة، والنتيجة تقريب جيد. والوسيط (Me) هو القيمة التي تبقى في الوسط بعد ترتيب البيانات: نبحث عن الموقع $N:2$ في التكرارات المتجمّعة. والمنوال (Mo) هو القيمة ذات التكرار الأكبر؛ وفي الفئات نعطي الفئة ذات التكرار الأكبر (الفئة المنوالية) ومركزها. وللآلة الحاسبة العلمية وضع إحصائي (SD أو STAT): بإدخال القيم والتكرارات تعطي $\\bar{x}$ مباشرة.'
        ),
        problem: say('40 ikasleren altuerak 6 tartetan, klase-markak 150, 155, 160, 165, 170 eta 175, maiztasunak 2, 5, 10, 12, 8 eta 3. Kalkulatu $\\bar{x}$, Me eta Mo.', 'Alturas de 40 alumnos en 6 intervalos, marcas de clase 150, 155, 160, 165, 170 y 175, frecuencias 2, 5, 10, 12, 8 y 3. Calcula $\\bar{x}$, Me y Mo.', 'أطوال 40 تلميذًا في 6 فئات، مراكزها 150 و155 و160 و165 و170 و175، وتكراراتها 2 و5 و10 و12 و8 و3. احسب $\\bar{x}$ وMe وMo.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batu $f_i x_i$ zutabea.', 'Suma la columna $f_i x_i$.', 'اجمع العمود $f_i x_i$.'), math: same('$\\sum f_i x_i=6540$') },
            { text: say('Zatitu $N$-z.', 'Divide entre $N$.', 'اقسم على $N$.'), math: same('$\\bar{x}=6540:40=163{,}5$') },
            { text: say('Metatuak 2, 7, 17, 29…: 20. eta 21. datuak 165eko tartean. Tarte modala ere bai.', 'Acumuladas 2, 7, 17, 29…: los datos 20.º y 21.º, en el intervalo del 165. También es el modal.', 'المتجمّعة 2، 7، 17، 29…: البيانان 20 و21 في فئة 165. وهي أيضًا المنوالية.'), math: same('$\\text{Me}\\approx\\text{Mo}\\approx 165$') }
        ],
        example: same('$\\frac{68}{40}=1{,}7$'),
        takeaway: say('Batez bestekoa: balio bider maiztasun, batu eta zatitu. Tarteetan, klase-markak erabili.', 'Media: valor por frecuencia, suma y divide. En intervalos, usa las marcas de clase.', 'المتوسط: القيمة في التكرار، اجمع واقسم. وفي الفئات استعمل المراكز.'),
        figure: (language) => <GroupedMeanFigure language={language} />
    },
    {
        id: 'percentiles',
        stage: 'centre',
        title: say('Kuartilak eta pertzentilak', 'Cuartiles y percentiles', 'الربيعيات والمئينات'),
        goal: say('Ehuneko metatuak dituen taula batetik kuartilak eta edozein pertzentil aurkitzea.', 'Hallar los cuartiles y cualquier percentil a partir de una tabla con los porcentajes acumulados.', 'إيجاد الربيعيات وأي مئين انطلاقًا من جدول بالنسب المتجمّعة.'),
        explanation: say(
            'Posizio-parametroek datuak ordenatuta banatzen dituzte. $k$ pertzentilak ($p_k$) datuen % $k$ azpian uzten du; kuartilak $Q_1=p_{25}$, $\\text{Me}=p_{50}$ eta $Q_3=p_{75}$ dira. Datu-zerrenda batean, kalkulatu $N\\cdot\\frac{k}{100}$: zenbaki osoa bada, postu horretako eta hurrengoko datuen batez bestekoa; hamartarra bada, hurrengo postuko datua. Taula batean errazagoa da ehuneko metatuen zutabe bat gehitzea: $p_k$ ehuneko metatuak lehen aldiz $k$ gainditzen duen balioa da. Ehuneko metatua $k$ bera bada, balio hori eta hurrengoaren arteko erdia hartzen da. Adibidez, 90 pertzentilean egoteak esan nahi du % 90ek balio txikiagoa edo berdina dutela.',
            'Los parámetros de posición reparten los datos ordenados. El percentil $k$ ($p_k$) deja por debajo el $k$ % de los datos; los cuartiles son $Q_1=p_{25}$, $\\text{Me}=p_{50}$ y $Q_3=p_{75}$. En una lista de datos, calcula $N\\cdot\\frac{k}{100}$: si es un número entero, la media de los datos de esa posición y la siguiente; si es decimal, el dato de la posición siguiente. En una tabla es más cómodo añadir una columna de porcentajes acumulados: $p_k$ es el primer valor cuyo porcentaje acumulado supera $k$. Si el porcentaje acumulado es justo $k$, se toma el punto medio entre ese valor y el siguiente. Por ejemplo, estar en el percentil 90 significa que el 90 % tiene un valor menor o igual.',
            'تقسم مقاييس الموقع البيانات المرتّبة. المئين $k$ ($p_k$) يترك تحته $k$ % من البيانات، والربيعيات هي $Q_1=p_{25}$ و$\\text{Me}=p_{50}$ و$Q_3=p_{75}$. في قائمة بيانات احسب $N\\cdot\\frac{k}{100}$: إذا كان عددًا صحيحًا فخذ متوسط البيان في ذلك الموقع والذي يليه، وإذا كان عشريًا فخذ البيان في الموقع التالي. وفي الجدول من الأيسر إضافة عمود للنسب المتجمّعة: $p_k$ هو أول قيمة تتجاوز نسبتها المتجمّعة $k$. وإذا كانت النسبة المتجمّعة تساوي $k$ تمامًا أخذنا منتصف تلك القيمة والتي تليها. مثلًا، أن تكون في المئين 90 يعني أن 90 % لديهم قيمة أصغر أو مساوية.'
        ),
        problem: say('25 familiaren autoak: 0 → 3, 1 → 12, 2 → 4, 3 → 4, 4 → 2. Aurkitu $Q_1$, Me, $Q_3$ eta $p_{90}$.', 'Coches de 25 familias: 0 → 3, 1 → 12, 2 → 4, 3 → 4, 4 → 2. Halla $Q_1$, Me, $Q_3$ y $p_{90}$.', 'سيارات 25 أسرة: 0 ← 3، 1 ← 12، 2 ← 4، 3 ← 4، 4 ← 2. أوجد $Q_1$ وMe و$Q_3$ و$p_{90}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Metatuak eta ehunekoak.', 'Acumuladas y porcentajes.', 'المتجمّعة والنسب.'), math: same('$12,\\ 60,\\ 76,\\ 92,\\ 100$') },
            { text: say('25 eta 50 gainditzen dira 1ean; 75, 2an.', 'El 25 y el 50 se superan en el 1; el 75, en el 2.', '25 و50 تُتجاوزان عند 1؛ و75 عند 2.'), math: same('$Q_1=\\text{Me}=1\\qquad Q_3=2$') },
            { text: say('90 gainditzen da 3an.', 'El 90 se supera en el 3.', '90 تُتجاوز عند 3.'), math: same('$p_{90}=3$') }
        ],
        example: same('$14\\cdot\\frac{25}{100}=3{,}5\\ \\to\\ 4$'),
        takeaway: say('Pertzentila: ehuneko metatuak k lehen aldiz gainditzen duen balioa.', 'Percentil: el primer valor cuyo porcentaje acumulado supera k.', 'المئين: أول قيمة تتجاوز نسبتها المتجمّعة k.'),
        figure: (language) => <PercentilesFigure language={language} />
    },
    {
        id: 'box-plot',
        stage: 'centre',
        title: say('Kutxa-diagrama eta datu atipikoak', 'Diagrama de caja y datos atípicos', 'مخطط الصندوق والبيانات الشاذة'),
        goal: say('Kutxa eta bibote diagrama egitea, datu atipikoak bereiztea eta bi banaketa konparatzea.', 'Construir el diagrama de caja y bigotes, separar los datos atípicos y comparar dos distribuciones.', 'بناء مخطط الصندوق والشاربين، وفصل البيانات الشاذة، ومقارنة توزيعين.'),
        explanation: say(
            'Kutxa $Q_1$-etik $Q_3$-ra doa, eta marra bat du medianan; haren luzera $Q_3-Q_1$ da (kuartil arteko ibiltartea). Biboteek ez dute zertan muturretaraino iritsi: gehienez kutxaren luzera bider 1,5 luzatzen dira alde bakoitzera. Muga horien barruan dagoen azken datuan amaitzen dira, eta kanpoan geratzen diren datuak atipikoak dira, izartxo batez markatzen dira. Kutxa estua bada, erdiko % 50 bilduta dago. Bi taldeko diagramak eskala beraren gainean marraztuta, ikusten da zein den homogeneoagoa, zeinek duen mediana handiagoa eta nola dauden banatuta.',
            'La caja va de $Q_1$ a $Q_3$ y tiene una raya en la mediana; su longitud es $Q_3-Q_1$ (el recorrido intercuartílico). Los bigotes no tienen por qué llegar a los extremos: se alargan como mucho 1,5 veces la longitud de la caja hacia cada lado. Terminan en el último dato que queda dentro de esos límites, y los datos que quedan fuera son atípicos y se marcan con un asterisco. Si la caja es estrecha, el 50 % central está agrupado. Dibujando los diagramas de dos grupos sobre la misma escala se ve cuál es más homogéneo, cuál tiene mayor mediana y cómo se reparten.',
            'يمتد الصندوق من $Q_1$ إلى $Q_3$ وفيه خط عند الوسيط، وطوله $Q_3-Q_1$ (المدى الربيعي). ولا يلزم أن يبلغ الشاربان الطرفين: يمتدان على الأكثر 1.5 مرة طول الصندوق في كل جهة. وينتهيان عند آخر بيان داخل هذين الحدّين، والبيانات التي تبقى خارجهما شاذة وتُعلَّم بنجمة. إذا كان الصندوق ضيقًا فالـ50 % الأوسط متجمّع. وبرسم مخططي مجموعتين على المقياس نفسه نرى أيهما أكثر تجانسًا، وأيهما وسيطه أكبر، وكيف تتوزع بياناتهما.'
        ),
        problem: say('14 ikasleren altuerak: 150, 158, 169, 171, 172, 172, 175, 176, 177, 179, 181, 182, 183, 184. Egin kutxa-diagrama.', 'Alturas de 14 alumnos: 150, 158, 169, 171, 172, 172, 175, 176, 177, 179, 181, 182, 183, 184. Haz el diagrama de caja.', 'أطوال 14 تلميذًا: 150، 158، 169، 171، 172، 172، 175، 176، 177، 179، 181، 182، 183، 184. ارسم مخطط الصندوق.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$14\\cdot 0{,}25=3{,}5$ → 4.a; $14:2=7$ → 7.a eta 8.a.', '$14\\cdot 0{,}25=3{,}5$ → 4.º; $14:2=7$ → 7.º y 8.º.', '$14\\cdot 0{,}25=3{,}5$ ← الرابع؛ $14:2=7$ ← السابع والثامن.'), math: same('$Q_1=171\\quad \\text{Me}=175{,}5\\quad Q_3=181$') },
            { text: say('Kutxa bider 1,5.', 'La caja por 1,5.', 'الصندوق في 1.5.'), math: same('$(181-171)\\cdot 1{,}5=15$') },
            { text: say('Mugak 156 eta 196: biboteak 158 eta 184ra; 150 atipikoa.', 'Límites 156 y 196: bigotes hasta 158 y 184; 150 es atípico.', 'الحدّان 156 و196: الشاربان حتى 158 و184؛ و150 شاذ.'), math: same('$171-15=156$') }
        ],
        example: same('$Q_3-Q_1=10$'),
        takeaway: say('Biboteak gehienez kutxa bider 1,5; kanpoan geratzen dena atipikoa da.', 'Bigotes como mucho 1,5 veces la caja; lo que queda fuera es atípico.', 'الشاربان على الأكثر 1.5 مرة الصندوق؛ وما يبقى خارجًا شاذ.'),
        figure: (language) => <WhiskersFigure language={language} />
    },

    /* ---------- 3. Dispersion ---------- */
    {
        id: 'variance',
        stage: 'spread',
        title: say('Bariantza eta desbideratze tipikoa', 'Varianza y desviación típica', 'التباين والانحراف المعياري'),
        goal: say('Datu-zerrenda baten bariantza eta desbideratze tipikoa kalkulatzea eta interpretatzea.', 'Calcular e interpretar la varianza y la desviación típica de una lista de datos.', 'حساب التباين والانحراف المعياري لقائمة بيانات وتفسيرهما.'),
        explanation: say(
            'Desbideratze bakoitza $x_i-\\bar{x}$ da, eta positiboa edo negatiboa izan daiteke; denak batuta, beti 0 ematen dute. Horregatik karratura jasotzen dira. Bariantza desbideratzeen karratuen batez bestekoa da: $\\sigma^2=\\frac{\\sum (x_i-\\bar{x})^2}{N}$. Haren unitateak karratuan daude (cm²), eta horregatik desbideratze tipikoa erabiltzen da, bariantzaren erro karratua: $\\sigma=\\sqrt{\\sigma^2}$, datuen unitate berean. Zenbat eta txikiagoa izan $\\sigma$, orduan eta bilduago daude datuak batez bestekoaren inguruan. Batez besteko bereko bi taldetan, $\\sigma$ txikiena duena homogeneoagoa da.',
            'Cada desviación es $x_i-\\bar{x}$, y puede ser positiva o negativa; sumadas todas, dan siempre 0. Por eso se elevan al cuadrado. La varianza es la media de los cuadrados de las desviaciones: $\\sigma^2=\\frac{\\sum (x_i-\\bar{x})^2}{N}$. Sus unidades están al cuadrado (cm²), y por eso se usa la desviación típica, la raíz cuadrada de la varianza: $\\sigma=\\sqrt{\\sigma^2}$, en las mismas unidades que los datos. Cuanto menor es $\\sigma$, más agrupados están los datos alrededor de la media. En dos grupos con la misma media, el de menor $\\sigma$ es más homogéneo.',
            'كل انحراف هو $x_i-\\bar{x}$، وقد يكون موجبًا أو سالبًا؛ ومجموعها كلها دائمًا 0. لذلك نربّعها. التباين هو متوسط مربعات الانحرافات: $\\sigma^2=\\frac{\\sum (x_i-\\bar{x})^2}{N}$. ووحداته مربّعة (سم²)، لذلك نستعمل الانحراف المعياري، وهو الجذر التربيعي للتباين: $\\sigma=\\sqrt{\\sigma^2}$، بوحدات البيانات نفسها. وكلما صغر $\\sigma$ كانت البيانات أكثر تجمّعًا حول المتوسط. وفي مجموعتين لهما المتوسط نفسه تكون ذات $\\sigma$ الأصغر أكثر تجانسًا.'
        ),
        problem: say('A taldearen notak 4, 6, 7, 8, 10 dira eta B-renak 6, 7, 7, 7, 8. Biek dute 7ko batez bestekoa. Kalkulatu $\\sigma$ bakoitza.', 'Las notas del grupo A son 4, 6, 7, 8, 10 y las del B, 6, 7, 7, 7, 8. Los dos tienen media 7. Calcula cada $\\sigma$.', 'علامات المجموعة أ: 4، 6، 7، 8، 10، وعلامات ب: 6، 7، 7، 7، 8. لكليهما المتوسط 7. احسب $\\sigma$ لكل منهما.'),
        stepsKind: 'steps',
        steps: [
            { text: say('A-ren desbideratzeak eta karratuak.', 'Desviaciones de A y sus cuadrados.', 'انحرافات أ ومربعاتها.'), math: same('$9+1+0+1+9=20$') },
            { text: say('Bariantza eta erroa.', 'Varianza y raíz.', 'التباين والجذر.'), math: same('$\\sigma^2=\\frac{20}{5}=4\\qquad \\sigma=2$') },
            { text: say('B: karratuak 1, 0, 0, 0, 1.', 'B: cuadrados 1, 0, 0, 0, 1.', 'ب: المربعات 1، 0، 0، 0، 1.'), math: same('$\\sigma^2=\\frac{2}{5}=0{,}4$') }
        ],
        example: same('$\\sigma=\\sqrt{0{,}4}\\approx 0{,}63$'),
        takeaway: say('Bariantza: desbideratzeen karratuen batez bestekoa. Desbideratze tipikoa: haren erroa, datuen unitateetan.', 'Varianza: media de los cuadrados de las desviaciones. Desviación típica: su raíz, en las unidades de los datos.', 'التباين: متوسط مربعات الانحرافات. الانحراف المعياري: جذره، بوحدات البيانات.'),
        figure: (language) => <VarianceFigure language={language} />
    },
    {
        id: 'table-sd',
        stage: 'spread',
        title: say('Desbideratze tipikoa taula batetik', 'Desviación típica desde una tabla', 'الانحراف المعياري من جدول'),
        goal: say('Maiztasun-taula baten $\\sigma$ kalkulatzea formula laburrarekin eta kalkulagailuarekin.', 'Calcular la $\\sigma$ de una tabla de frecuencias con la fórmula abreviada y con la calculadora.', 'حساب $\\sigma$ لجدول تكرارات بالصيغة المختصرة وبالآلة الحاسبة.'),
        explanation: say(
            'Taula batean, desbideratze bakoitza kalkulatu beharrean, formula baliokide laburragoa erabiltzen da: $\\sigma^2=\\frac{\\sum f_i x_i^2}{N}-\\bar{x}^2$, hau da, karratuen batez bestekoa ken batez bestekoaren karratua. Horretarako taulari bi zutabe gehitzen zaizkio: $f_i x_i$ (batez bestekorako) eta $f_i x_i^2$ (bariantzarako). Kontuz: $f_i x_i^2$ ez da $(f_i x_i)^2$; $x_i$ bakarrik jasotzen da karratura. Datuak tarteetan badaude, $x_i$ klase-markak dira. Kalkulagailuaren modu estatistikoan, datuak sartu ondoren $\\sigma$ (edo $\\sigma_n$, $x\\sigma_n$) tekla zuzenean erabil daiteke.',
            'En una tabla, en lugar de calcular cada desviación, se usa una fórmula equivalente más corta: $\\sigma^2=\\frac{\\sum f_i x_i^2}{N}-\\bar{x}^2$, es decir, la media de los cuadrados menos el cuadrado de la media. Para ello se añaden a la tabla dos columnas: $f_i x_i$ (para la media) y $f_i x_i^2$ (para la varianza). Cuidado: $f_i x_i^2$ no es $(f_i x_i)^2$; solo se eleva al cuadrado $x_i$. Si los datos están en intervalos, $x_i$ son las marcas de clase. En el modo estadístico de la calculadora, tras introducir los datos, se puede usar directamente la tecla $\\sigma$ (o $\\sigma_n$, $x\\sigma_n$).',
            'في الجدول، بدل حساب كل انحراف، نستعمل صيغة مكافئة أقصر: $\\sigma^2=\\frac{\\sum f_i x_i^2}{N}-\\bar{x}^2$، أي متوسط المربعات ناقص مربع المتوسط. ولذلك نضيف إلى الجدول عمودين: $f_i x_i$ (للمتوسط) و$f_i x_i^2$ (للتباين). انتبه: $f_i x_i^2$ ليس $(f_i x_i)^2$؛ لا يُربَّع إلا $x_i$. وإذا كانت البيانات في فئات فإن $x_i$ مراكز الفئات. وفي الوضع الإحصائي للآلة الحاسبة، بعد إدخال البيانات، يمكن استعمال المفتاح $\\sigma$ (أو $\\sigma_n$، $x\\sigma_n$) مباشرة.'
        ),
        problem: say('Diktaketa bateko akatsak: 0 → 12 ikasle, 1 → 9, 2 → 7, 3 → 6, 4 → 3, 5 → 3. Kalkulatu $\\bar{x}$ eta $\\sigma$.', 'Faltas en un dictado: 0 → 12 alumnos, 1 → 9, 2 → 7, 3 → 6, 4 → 3, 5 → 3. Calcula $\\bar{x}$ y $\\sigma$.', 'أخطاء في إملاء: 0 ← 12 تلميذًا، 1 ← 9، 2 ← 7، 3 ← 6، 4 ← 3، 5 ← 3. احسب $\\bar{x}$ و$\\sigma$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batu zutabeak.', 'Suma las columnas.', 'اجمع العمودين.'), math: same('$\\sum f_i x_i=68\\quad \\sum f_i x_i^2=214$') },
            { text: say('Batez bestekoa.', 'Media.', 'المتوسط.'), math: same('$\\bar{x}=\\frac{68}{40}=1{,}7$') },
            { text: say('Bariantza eta $\\sigma$.', 'Varianza y $\\sigma$.', 'التباين و$\\sigma$.'), math: same('$\\frac{214}{40}-1{,}7^{2}=2{,}46$') }
        ],
        example: same('$\\sqrt{2{,}46}\\approx 1{,}57$'),
        takeaway: say('Bariantza = karratuen batez bestekoa ken batez bestekoaren karratua.', 'Varianza = media de los cuadrados menos el cuadrado de la media.', 'التباين = متوسط المربعات ناقص مربع المتوسط.'),
        figure: (language) => <TableDeviationFigure language={language} />
    },
    {
        id: 'cv',
        stage: 'spread',
        title: say('Aldakuntza-koefizientea', 'Coeficiente de variación', 'معامل الاختلاف'),
        goal: say('Batez besteko oso desberdinak dituzten banaketen sakabanaketa aldakuntza-koefizientearekin konparatzea.', 'Comparar la dispersión de distribuciones con medias muy distintas mediante el coeficiente de variación.', 'مقارنة تشتت توزيعات لها متوسطات مختلفة جدًا بمعامل الاختلاف.'),
        explanation: say(
            '10 g-ko desbideratzea handia da sagu baten pisuan, baina txikia elefante batenean. Batez besteko oso desberdinak dituzten bi banaketa konparatzeko, sakabanaketa erlatiboa neurtzen da: aldakuntza-koefizientea, $\\text{CV}=\\frac{\\sigma}{\\bar{x}}$. Unitaterik gabeko zenbakia da, eta askotan ehunekotan ematen da. CV handiagoa duen banaketak sakabanaketa erlatibo handiagoa du, nahiz eta haren $\\sigma$ txikiagoa izan. Unitate desberdinetako aldagaiak ere konpara daitezke (altuera cm-tan eta pisua kg-tan).',
            'Una desviación de 10 g es grande en el peso de un ratón, pero pequeña en el de un elefante. Para comparar dos distribuciones con medias muy distintas se mide la dispersión relativa: el coeficiente de variación, $\\text{CV}=\\frac{\\sigma}{\\bar{x}}$. Es un número sin unidades, y muchas veces se da en porcentaje. La distribución con mayor CV tiene mayor dispersión relativa, aunque su $\\sigma$ sea menor. También se pueden comparar variables con unidades distintas (altura en cm y peso en kg).',
            'انحراف 10 غ كبير في وزن فأر لكنه صغير في وزن فيل. ولمقارنة توزيعين متوسطاهما مختلفان جدًا نقيس التشتت النسبي: معامل الاختلاف $\\text{CV}=\\frac{\\sigma}{\\bar{x}}$. وهو عدد بلا وحدات، وكثيرًا ما يُعطى نسبة مئوية. والتوزيع ذو CV الأكبر تشتته النسبي أكبر، وإن كان $\\sigma$ له أصغر. ويمكن أيضًا مقارنة متغيرات بوحدات مختلفة (الطول بالسنتيمتر والوزن بالكيلوغرام).'
        ),
        problem: say('A enpresaren hileko gastuak: $\\bar{x}=100\\,000$ €, $\\sigma=12\\,500$ €. B-renak: $\\bar{x}=15\\,000$ €, $\\sigma=2\\,500$ €. Zeinek du aldakuntza erlatibo handiagoa?', 'Gastos mensuales de la empresa A: $\\bar{x}=100\\,000$ €, $\\sigma=12\\,500$ €. Los de B: $\\bar{x}=15\\,000$ €, $\\sigma=2\\,500$ €. ¿Cuál tiene más variación relativa?', 'المصاريف الشهرية للشركة A: $\\bar{x}=100\\,000$ €، $\\sigma=12\\,500$ €. وللشركة B: $\\bar{x}=15\\,000$ €، $\\sigma=2\\,500$ €. أيهما اختلافها النسبي أكبر؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('A enpresa.', 'Empresa A.', 'الشركة A.'), math: same('$\\frac{12\\,500}{100\\,000}=0{,}125$') },
            { text: say('B enpresa.', 'Empresa B.', 'الشركة B.'), math: same('$\\frac{2\\,500}{15\\,000}\\approx 0{,}167$') },
            { text: say('B-k du handiena: % 16,7 inguru, A-ren % 12,5en aurrean.', 'B tiene el mayor: un 16,7 % aproximadamente, frente al 12,5 % de A.', 'لـB الأكبر: نحو 16.7 % مقابل 12.5 % لـA.') }
        ],
        example: same('$\\frac{1{,}57}{1{,}7}\\approx 0{,}92$'),
        takeaway: say('CV = desbideratze tipikoa zati batez bestekoa: sakabanaketa erlatiboa, unitaterik gabe.', 'CV = desviación típica entre media: la dispersión relativa, sin unidades.', 'CV = الانحراف المعياري على المتوسط: التشتت النسبي، بلا وحدات.'),
        figure: (language) => <VariationFigure language={language} />
    },

    /* ---------- 4. Two variables ---------- */
    {
        id: 'scatter',
        stage: 'two',
        title: say('Banaketa bidimentsionalak', 'Distribuciones bidimensionales', 'التوزيعات ثنائية البعد'),
        goal: say('Bi aldagai batera aztertzea eta puntu-hodeia marraztea eta irakurtzea.', 'Estudiar dos variables a la vez y dibujar y leer la nube de puntos.', 'دراسة متغيرين معًا ورسم سحابة النقاط وقراءتها.'),
        explanation: say(
            'Banaketa bidimentsional batean, banako bakoitzari bi aldagai neurtzen zaizkio batera: ikasle bakoitzaren ikasketa-orduak eta nota, egun bakoitzeko eguzki-orduak eta tenperatura. Datuak $(x_i,y_i)$ bikoteak dira, eta planoan irudikatuta puntu-hodeia edo sakabanatze-diagrama lortzen da. Puntuak marra baten inguruan badaude, aldagaien artean korrelazioa dago. Erlazio funtzionalean (karratu baten aldea eta perimetroa) $x$-k $y$ zehazki zehazten du, eta puntuak marra baten gainean daude; erlazio estatistikoan, ez: altuera handiagoak pisu handiagoa ekartzen du normalean, baina ez beti.',
            'En una distribución bidimensional, a cada individuo se le miden dos variables a la vez: las horas de estudio y la nota de cada alumno, las horas de sol y la temperatura de cada día. Los datos son parejas $(x_i,y_i)$, y representadas en el plano forman la nube de puntos o diagrama de dispersión. Si los puntos se agrupan alrededor de una línea, hay correlación entre las variables. En una relación funcional (el lado de un cuadrado y su perímetro) $x$ determina exactamente $y$, y los puntos están sobre una línea; en una relación estadística, no: una mayor altura suele llevar un mayor peso, pero no siempre.',
            'في التوزيع ثنائي البعد يُقاس لكل فرد متغيران معًا: ساعات دراسة كل تلميذ وعلامته، أو ساعات الشمس وحرارة كل يوم. البيانات أزواج $(x_i,y_i)$، وبتمثيلها في المستوى نحصل على سحابة النقاط أو مخطط الانتشار. إذا تجمّعت النقاط حول خط فبين المتغيرين ارتباط. وفي العلاقة الدالية (ضلع مربع ومحيطه) يحدّد $x$ قيمة $y$ تمامًا، وتقع النقاط على خط؛ أما في العلاقة الإحصائية فلا: الطول الأكبر يرافقه غالبًا وزن أكبر، لكن ليس دائمًا.'
        ),
        problem: say('10 ikasleren asteko ikasketa-orduak eta nota: (1, 3), (2, 4), (2, 5), (3, 5), (4, 6), (5, 6), (5, 8), (6, 7), (7, 9), (8, 9). Marraztu hodeia.', 'Horas de estudio semanales y nota de 10 alumnos: (1, 3), (2, 4), (2, 5), (3, 5), (4, 6), (5, 6), (5, 8), (6, 7), (7, 9), (8, 9). Dibuja la nube.', 'ساعات الدراسة الأسبوعية وعلامة 10 تلاميذ: (1, 3)، (2, 4)، (2, 5)، (3, 5)، (4, 6)، (5, 6)، (5, 8)، (6, 7)، (7, 9)، (8, 9). ارسم السحابة.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$X$ ardatzean orduak; $Y$ ardatzean nota.', 'En el eje $X$, las horas; en el eje $Y$, la nota.', 'على المحور $X$ الساعات، وعلى المحور $Y$ العلامة.') },
            { text: say('Ikasle bakoitza puntu bat da.', 'Cada alumno es un punto.', 'كل تلميذ نقطة.'), math: same('$(5,\\ 8)$') },
            { text: say('Puntuak gorantz doan marra baten inguruan: korrelazio positiboa.', 'Los puntos, alrededor de una línea que sube: correlación positiva.', 'النقاط حول خط صاعد: ارتباط موجب.') }
        ],
        example: same('$(x_i,\\ y_i)$'),
        takeaway: say('Banako bakoitza puntu bat da; hodeiaren itxurak esaten du aldagaiak erlazionatuta dauden.', 'Cada individuo es un punto; la forma de la nube dice si las variables están relacionadas.', 'كل فرد نقطة؛ وشكل السحابة يبيّن هل المتغيران مرتبطان.'),
        figure: (language) => <ScatterFigure language={language} />
    },
    {
        id: 'correlation',
        stage: 'two',
        title: say('Korrelazioa', 'Correlación', 'الارتباط'),
        goal: say('Korrelazioa positiboa ala negatiboa den eta sendoa ala ahula den esatea, eta korrelazio-koefizientea esleitzea.', 'Decir si la correlación es positiva o negativa, fuerte o débil, y asignar el coeficiente de correlación.', 'تحديد هل الارتباط موجب أو سالب، قوي أو ضعيف، وإسناد معامل الارتباط.'),
        explanation: say(
            'Korrelazioa positiboa da aldagai bat handitzean bestea ere handitzen bada (hodeia gorantz), eta negatiboa bestea txikitzen bada (beherantz). Sendoa da puntuak marra batetik oso hurbil badaude, eta ahula sakabanatuta badaude. Korrelazio-koefizienteak, $r$, hori guztia zenbaki batean neurtzen du: beti $-1$ eta $1$ artean dago; zeinuak noranzkoa ematen du, eta balio absolutuak indarra. $r=1$ edo $r=-1$ denean, erlazioa funtzionala da (puntu guztiak zuzen batean); $r$ 0tik hurbil badago, ez dago erlazio linealik. Kontuz: korrelazioak ez du kausa adierazten. Herri batean zikoina-habia gehiago eta jaiotza gehiago badaude, herria handiagoa delako da.',
            'La correlación es positiva si al aumentar una variable también aumenta la otra (la nube sube), y negativa si la otra disminuye (baja). Es fuerte si los puntos están muy cerca de una línea, y débil si están dispersos. El coeficiente de correlación, $r$, mide todo eso con un número: siempre está entre $-1$ y $1$; el signo da el sentido y el valor absoluto, la fuerza. Si $r=1$ o $r=-1$, la relación es funcional (todos los puntos en una recta); si $r$ está cerca de 0, no hay relación lineal. Cuidado: la correlación no indica causa. Si en un pueblo hay más nidos de cigüeña y más nacimientos, es porque el pueblo es más grande.',
            'يكون الارتباط موجبًا إذا ازداد أحد المتغيرين عندما يزداد الآخر (السحابة تصعد)، وسالبًا إذا نقص (تهبط). ويكون قويًا إذا كانت النقاط قريبة جدًا من خط، وضعيفًا إذا كانت متشتتة. ومعامل الارتباط $r$ يقيس كل ذلك بعدد: هو دائمًا بين $-1$ و$1$؛ إشارته تعطي الاتجاه وقيمته المطلقة القوة. إذا كان $r=1$ أو $r=-1$ فالعلاقة دالية (كل النقاط على مستقيم)، وإذا كان $r$ قريبًا من 0 فلا علاقة خطية. انتبه: الارتباط لا يدل على السببية. إذا كان في بلدة أعشاش لقالق أكثر ومواليد أكثر، فذلك لأن البلدة أكبر.'
        ),
        stepsKind: 'facts',
        steps: [
            { title: say('Positiboa eta sendoa', 'Positiva y fuerte', 'موجب وقوي'), text: say('Ahurraren neurria eta oinarena: $r$ 1etik hurbil.', 'La medida del palmo y la del pie: $r$ cerca de 1.', 'طول الشبر وطول القدم: $r$ قريب من 1.'), math: same('$r\\approx 0{,}9$') },
            { title: say('Negatiboa', 'Negativa', 'سالب'), text: say('Ikasketa-orduak eta suspentsoak: batak gora, besteak behera.', 'Horas de estudio y suspensos: una sube y la otra baja.', 'ساعات الدراسة والرسوب: أحدهما يصعد والآخر يهبط.'), math: same('$r\\approx -0{,}8$') },
            { title: say('Ia nulua', 'Casi nula', 'شبه منعدم'), text: say('Pisua eta matematikako nota: ez dago erlaziorik.', 'El peso y la nota de matemáticas: no hay relación.', 'الوزن وعلامة الرياضيات: لا علاقة.'), math: same('$r\\approx 0$') }
        ],
        example: same('$-1\\le r\\le 1$'),
        takeaway: say('Zeinuak noranzkoa ematen du; 1etik edo −1etik zenbat eta hurbilago, orduan eta sendoagoa.', 'El signo da el sentido; cuanto más cerca de 1 o de −1, más fuerte.', 'الإشارة تعطي الاتجاه؛ وكلما اقترب من 1 أو −1 كان أقوى.'),
        figure: (language) => <CorrelationFigure language={language} />
    },
    {
        id: 'regression',
        stage: 'two',
        title: say('Erregresio-zuzena eta estimazioak', 'Recta de regresión y estimaciones', 'مستقيم الانحدار والتقديرات'),
        goal: say('Erregresio-zuzena estimazioak egiteko erabiltzea eta estimazio horien fidagarritasuna epaitzea.', 'Usar la recta de regresión para hacer estimaciones y juzgar su fiabilidad.', 'استعمال مستقيم الانحدار لإجراء تقديرات والحكم على موثوقيتها.'),
        explanation: say(
            'Erregresio-zuzena hodeiari hobekien egokitzen zaion zuzena da: puntuen erditik pasatzen da, eta beti batez bestekoen puntutik, $(\\bar{x},\\bar{y})$. Begiz trazatu daiteke, edo kalkulagailuak eman dezake. Haren ekuazioa $\\hat{y}=mx+n$ da, eta $x$ balio baterako $y$ estimatzeko balio du: $x$ ordezkatu eta $\\hat{y}$ kalkulatu. Estimazioa fidagarria da bi baldintza betetzen badira: korrelazioa sendoa izatea ($|r|$ 1etik hurbil) eta $x$ datuen tartearen barruan egotea. Tartetik kanpo (estrapolazioa), joera bera mantentzen den ez dakigu, eta estimazioa ez da fidagarria.',
            'La recta de regresión es la recta que mejor se ajusta a la nube: pasa por en medio de los puntos, y siempre por el punto de las medias, $(\\bar{x},\\bar{y})$. Se puede trazar a ojo o la puede dar la calculadora. Su ecuación es $\\hat{y}=mx+n$, y sirve para estimar $y$ para un valor de $x$: se sustituye $x$ y se calcula $\\hat{y}$. La estimación es fiable si se cumplen dos condiciones: que la correlación sea fuerte ($|r|$ cerca de 1) y que $x$ esté dentro del intervalo de los datos. Fuera del intervalo (extrapolación), no sabemos si se mantiene la misma tendencia, y la estimación no es fiable.',
            'مستقيم الانحدار هو المستقيم الأكثر ملاءمة للسحابة: يمرّ وسط النقاط، ودائمًا بنقطة المتوسطين $(\\bar{x},\\bar{y})$. يمكن رسمه بالعين أو تعطيه الآلة الحاسبة. معادلته $\\hat{y}=mx+n$، وتصلح لتقدير $y$ لقيمة من $x$: نعوّض $x$ ونحسب $\\hat{y}$. ويكون التقدير موثوقًا إذا تحقّق شرطان: أن يكون الارتباط قويًا ($|r|$ قريب من 1) وأن يكون $x$ داخل مجال البيانات. وخارج المجال (الاستقراء الخارجي) لا نعرف هل يستمر الاتجاه نفسه، فلا يكون التقدير موثوقًا.'
        ),
        problem: say('8 egunetan eguzki-orduak ($x$) eta tenperatura maximoa ($y$, °C) neurtu dira, 0 eta 10 ordu artean. Erregresio-zuzena $\\hat{y}=0{,}5x+8$ da. Estimatu tenperatura 7 eguzki-ordurekin.', 'En 8 días se han medido las horas de sol ($x$) y la temperatura máxima ($y$, °C), entre 0 y 10 horas. La recta de regresión es $\\hat{y}=0{,}5x+8$. Estima la temperatura con 7 horas de sol.', 'قيست في 8 أيام ساعات الشمس ($x$) ودرجة الحرارة القصوى ($y$، °C)، بين 0 و10 ساعات. مستقيم الانحدار $\\hat{y}=0{,}5x+8$. قدّر الحرارة مع 7 ساعات شمس.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu $x=7$.', 'Sustituye $x=7$.', 'عوّض $x=7$.'), math: same('$0{,}5\\cdot 7+8=11{,}5$') },
            { text: say('7 datuen tartean dago eta $r\\approx 0{,}87$: fidagarria.', '7 está dentro del intervalo y $r\\approx 0{,}87$: fiable.', '7 داخل المجال و$r\\approx 0{,}87$: موثوق.') },
            { text: say('20 ordurekin: tartetik kanpo (eta egun batek ez ditu 20 ordu eguzki), ez da fidagarria.', 'Con 20 horas: fuera del intervalo (y un día no tiene 20 horas de sol), no es fiable.', 'مع 20 ساعة: خارج المجال (واليوم لا يضم 20 ساعة شمس)، غير موثوق.'), math: same('$0{,}5\\cdot 20+8=18$') }
        ],
        example: same('$760-0{,}0824\\cdot 1000=677{,}6$'),
        takeaway: say('Estimatzeko, ordeztu zuzenean; fidagarria korrelazio sendoarekin eta datuen tartearen barruan.', 'Para estimar, sustituye en la recta; fiable con correlación fuerte y dentro del intervalo de datos.', 'للتقدير عوّض في المستقيم؛ موثوق مع ارتباط قوي وداخل مجال البيانات.'),
        figure: (language) => <RegressionFigure language={language} />
    },

    /* ---------- 5. Probability ---------- */
    {
        id: 'laplace',
        stage: 'chance',
        title: say('Laplace, maiztasuna eta gertaeren bildura', 'Laplace, frecuencia y unión de sucesos', 'لابلاس والتكرار واتحاد الأحداث'),
        goal: say('Probabilitateak Laplaceren erregelarekin eta maiztasun erlatiboarekin kalkulatzea, eta aurkako gertaera eta bildura erabiltzea.', 'Calcular probabilidades con la regla de Laplace y con la frecuencia relativa, y usar el suceso contrario y la unión.', 'حساب الاحتمالات بقاعدة لابلاس وبالتكرار النسبي، واستعمال الحدث المعاكس والاتحاد.'),
        explanation: say(
            'Esperimentu erregular batean (emaitza guztiek aukera bera), Laplaceren erregela: $P(A)=\\frac{\\text{aldeko kasuak}}{\\text{kasu posibleak}}$. Esperimentu irregularretan (txintxetak, opakoa den botila bat), esperimentua askotan errepikatzen da, eta maiztasun erlatiboa probabilitatera hurbiltzen da: 1000 aldiz botata 461 aldiz bola beltza ikusi bada, $P(\\text{beltza})\\approx 0{,}461$. Gertaeren artean: aurkakoa, $P(\\bar{A})=1-P(A)$. Bildura, $A\\cup B$, A edo B (edo biak) gertatzea da. Bateraezinak badira (ezin dira batera gertatu), $P(A\\cup B)=P(A)+P(B)$; bateragarriak badira, bien zatia bi aldiz zenbatzen da eta kendu egin behar da: $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$.',
            'En un experimento regular (todos los resultados con la misma posibilidad), la regla de Laplace: $P(A)=\\frac{\\text{casos favorables}}{\\text{casos posibles}}$. En experimentos irregulares (chinchetas, una botella opaca), se repite el experimento muchas veces y la frecuencia relativa se aproxima a la probabilidad: si en 1000 tiradas se ha visto 461 veces la bola negra, $P(\\text{negra})\\approx 0{,}461$. Entre sucesos: el contrario, $P(\\bar{A})=1-P(A)$. La unión, $A\\cup B$, es que ocurra A o B (o los dos). Si son incompatibles (no pueden ocurrir a la vez), $P(A\\cup B)=P(A)+P(B)$; si son compatibles, la parte común se cuenta dos veces y hay que restarla: $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$.',
            'في التجربة المنتظمة (لكل النتائج الإمكان نفسه) نستعمل قاعدة لابلاس: $P(A)$ = عدد الحالات الملائمة على عدد الحالات الممكنة. وفي التجارب غير المنتظمة (الدبابيس، قارورة معتمة) نكرّر التجربة مرات كثيرة فيقترب التكرار النسبي من الاحتمال: إذا ظهرت الكرة السوداء 461 مرة في 1000 محاولة فإن احتمال السوداء $\\approx 0{,}461$. وبين الأحداث: المعاكس $P(\\bar{A})=1-P(A)$. والاتحاد $A\\cup B$ هو أن يقع A أو B (أو كلاهما). إذا كانا متنافيين (لا يقعان معًا) فإن $P(A\\cup B)=P(A)+P(B)$، وإذا كانا متوافقين فالجزء المشترك يُعدّ مرتين ويجب طرحه: $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$.'
        ),
        problem: say('Dado bat botatzen da. A = «bikoitia», B = «3ren multiploa». Kalkulatu $P(A\\cup B)$.', 'Se lanza un dado. A = «par», B = «múltiplo de 3». Calcula $P(A\\cup B)$.', 'يُرمى نرد. A = «زوجي»، B = «مضاعف 3». احسب $P(A\\cup B)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('A = {2, 4, 6}, B = {3, 6}: bateragarriak, 6 bietan.', 'A = {2, 4, 6}, B = {3, 6}: compatibles, el 6 en los dos.', 'A = {2, 4, 6}، B = {3, 6}: متوافقان، 6 في كليهما.') },
            { text: say('Batu eta kendu bien zatia.', 'Suma y resta la parte común.', 'اجمع واطرح الجزء المشترك.'), math: same('$\\frac{3}{6}+\\frac{2}{6}-\\frac{1}{6}=\\frac{4}{6}$') },
            { text: say('Egiaztatu: {2, 3, 4, 6}.', 'Comprueba: {2, 3, 4, 6}.', 'تحقّق: {2, 3, 4, 6}.'), math: same('$\\frac{4}{6}=\\frac{2}{3}$') }
        ],
        example: same('$0{,}461\\cdot 20\\approx 9$'),
        takeaway: say('Erregularra: Laplace. Irregularra: maiztasun erlatiboa. Bateragarriak: batu eta kendu bien zatia.', 'Regular: Laplace. Irregular: frecuencia relativa. Compatibles: suma y resta la parte común.', 'منتظمة: لابلاس. غير منتظمة: التكرار النسبي. متوافقان: اجمع واطرح المشترك.'),
        figure: (language) => <UnionFigure language={language} />
    },
    {
        id: 'compound',
        stage: 'chance',
        title: say('Esperimentu konposatuak', 'Experiencias compuestas', 'التجارب المركّبة'),
        goal: say('Esperimentu independenteen eta dependenteen probabilitateak zuhaitz-diagrama batekin kalkulatzea.', 'Calcular probabilidades de experiencias independientes y dependientes con un diagrama de árbol.', 'حساب احتمالات التجارب المستقلة والتابعة بمخطط شجري.'),
        explanation: say(
            'Esperimentu konposatu batean, zuhaitz-diagramako adar bakoitzean haren probabilitatea idazten da. Bide baten probabilitatea bere adarren probabilitateen biderkadura da, eta gertaera baten probabilitatea haren bide guztien batura. Esperimentuak independenteak dira lehenengoaren emaitzak bigarrena aldatzen ez badu (bi dado, itzultzen den bola): $P(A\\text{ eta }B)=P(A)\\cdot P(B)$. Dependenteak dira aldatzen badu (bola edo karta itzuli gabe): bigarren adarreko probabilitatea baldintzatua da, $P(B/A)$, eta $P(A\\text{ eta }B)=P(A)\\cdot P(B/A)$. «Gutxienez bat» motako galderetan, erosoagoa da aurkakoa erabiltzea: $1-P(\\text{bat ere ez})$.',
            'En una experiencia compuesta, en cada rama del diagrama de árbol se escribe su probabilidad. La probabilidad de un camino es el producto de las probabilidades de sus ramas, y la de un suceso, la suma de todos sus caminos. Las experiencias son independientes si el resultado de la primera no cambia la segunda (dos dados, una bola que se devuelve): $P(A\\text{ y }B)=P(A)\\cdot P(B)$. Son dependientes si la cambia (bola o carta sin devolver): la probabilidad de la segunda rama es condicionada, $P(B/A)$, y $P(A\\text{ y }B)=P(A)\\cdot P(B/A)$. En las preguntas del tipo «al menos uno», es más cómodo usar el contrario: $1-P(\\text{ninguno})$.',
            'في التجربة المركّبة نكتب على كل فرع من المخطط الشجري احتماله. واحتمال مسار هو حاصل ضرب احتمالات فروعه، واحتمال حدث هو مجموع كل مساراته. وتكون التجارب مستقلة إذا لم تغيّر نتيجة الأولى الثانية (نردان، كرة تُعاد): $P(A\\cap B)=P(A)\\cdot P(B)$. وتكون تابعة إذا غيّرتها (كرة أو ورقة دون إرجاع): احتمال الفرع الثاني مشروط $P(B/A)$، و$P(A\\cap B)=P(A)\\cdot P(B/A)$. وفي أسئلة «على الأقل واحد» يكون استعمال المعاكس أيسر: 1 ناقص احتمال «لا شيء».'
        ),
        problem: say('40 kartako sorta batetik bi karta ateratzen dira, itzuli gabe. Zein da biak ezpatak izateko probabilitatea (10 ezpata daude)?', 'Se sacan dos cartas de una baraja de 40, sin devolver. ¿Cuál es la probabilidad de que las dos sean espadas (hay 10 espadas)?', 'تُسحب ورقتان من مجموعة 40 ورقة دون إرجاع. ما احتمال أن تكون كلتاهما سيوفًا (فيها 10 سيوف)؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehenengoa ezpata.', 'La primera, espada.', 'الأولى سيف.'), math: same('$\\frac{10}{40}$') },
            { text: say('Bigarrena: 9 ezpata geratzen dira 39 kartatan.', 'La segunda: quedan 9 espadas en 39 cartas.', 'الثانية: يبقى 9 سيوف في 39 ورقة.'), math: same('$\\frac{9}{39}$') },
            { text: say('Biderkatu bidea.', 'Multiplica el camino.', 'اضرب المسار.'), math: same('$\\frac{10}{40}\\cdot\\frac{9}{39}=\\frac{3}{52}$') }
        ],
        example: same('$\\frac{1}{2}\\cdot\\frac{1}{3}=\\frac{1}{6}$'),
        takeaway: say('Bide batean biderkatu; bide batzuen artean batu. Itzuli gabe, bigarren adarra aldatu egiten da.', 'En un camino, multiplica; entre varios caminos, suma. Sin devolver, la segunda rama cambia.', 'في المسار الواحد اضرب، وبين المسارات اجمع. ودون إرجاع يتغيّر الفرع الثاني.'),
        figure: (language) => <CardsTreeFigure language={language} />
    },
    {
        id: 'contingency',
        stage: 'chance',
        title: say('Kontingentzia-taulak', 'Tablas de contingencia', 'جداول التوافق'),
        goal: say('Kontingentzia-taula bat osatzea eta haren probabilitate soilak, batera gertatzekoak eta baldintzatuak kalkulatzea.', 'Completar una tabla de contingencia y calcular sus probabilidades simples, conjuntas y condicionadas.', 'إكمال جدول توافق وحساب احتمالاته البسيطة والمشتركة والمشروطة.'),
        explanation: say(
            'Kontingentzia-taula batek populazio bat bi ezaugarriren arabera sailkatzen du, eta guztizkoen errenkada eta zutabe bat ditu. Hiru probabilitate mota irakurtzen dira. Soila: errenkada edo zutabe baten guztizkoa zati guztizko nagusia, $P(\\text{betaurrekoak})=\\frac{300}{1000}$. Batera gertatzekoa: gelaxka bat zati guztizko nagusia, $P(\\text{neska eta betaurrekoak})=\\frac{113}{1000}$. Baldintzatua, $P(A/B)$, «B dela jakinda, A izatea»: kasu posibleak B-renak bakarrik dira, $P(\\text{betaurrekoak}/\\text{neska})=\\frac{113}{400}$. Kontuz ordenarekin: $P(\\text{neska}/\\text{betaurrekoak})=\\frac{113}{300}$ beste gauza bat da.',
            'Una tabla de contingencia clasifica una población según dos características, y tiene una fila y una columna de totales. Se leen tres tipos de probabilidad. Simple: el total de una fila o columna entre el total general, $P(\\text{gafas})=\\frac{300}{1000}$. Conjunta: una casilla entre el total general, $P(\\text{chica y gafas})=\\frac{113}{1000}$. Condicionada, $P(A/B)$, «sabiendo que es B, que sea A»: los casos posibles son solo los de B, $P(\\text{gafas}/\\text{chica})=\\frac{113}{400}$. Cuidado con el orden: $P(\\text{chica}/\\text{gafas})=\\frac{113}{300}$ es otra cosa.',
            'يصنّف جدول التوافق مجتمعًا حسب خاصيتين، وفيه سطر وعمود للمجاميع. ونقرأ منه ثلاثة أنواع من الاحتمال. البسيط: مجموع سطر أو عمود على المجموع العام، احتمال النظارات $\\frac{300}{1000}$. والمشترك: خانة على المجموع العام، احتمال «بنت ونظارات» $\\frac{113}{1000}$. والمشروط $P(A/B)$، «علمًا أنه B، أن يكون A»: الحالات الممكنة هي حالات B فقط، احتمال النظارات علمًا أنها بنت $\\frac{113}{400}$. انتبه إلى الترتيب: احتمال أن تكون بنتًا علمًا أنها بنظارات $\\frac{113}{300}$ شيء آخر.'
        ),
        problem: say('Ikastetxe bateko 1000 ikasleetatik: mutilak 600 (187 betaurrekoekin) eta neskak 400 (113 betaurrekoekin). Ikasle bat zoriz aukeratuta, kalkulatu $P(\\text{betaurrekoak})$ eta, neska dela jakinda, betaurrekoak eramatekoa.', 'De los 1000 alumnos de un centro: chicos 600 (187 con gafas) y chicas 400 (113 con gafas). Eligiendo uno al azar, calcula $P(\\text{gafas})$ y, sabiendo que es chica, la de que lleve gafas.', 'من 1000 تلميذ في مدرسة: الأولاد 600 (187 بنظارات) والبنات 400 (113 بنظارات). إذا اخترنا واحدًا عشوائيًا، احسب احتمال النظارات، واحتمال أن تلبس نظارات علمًا أنها بنت.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Osatu guztizkoak.', 'Completa los totales.', 'أكمل المجاميع.'), math: same('$187+113=300$') },
            { text: say('Soila.', 'Simple.', 'البسيط.'), math: same('$\\frac{300}{1000}=0{,}3$') },
            { text: say('Baldintzatua: neskak bakarrik.', 'Condicionada: solo las chicas.', 'المشروط: البنات فقط.'), math: same('$\\frac{113}{400}=0{,}2825$') }
        ],
        example: same('$\\frac{24}{80}=0{,}3$'),
        takeaway: say('Baldintzatuan, kasu posibleak baldintzaren errenkada edo zutabea bakarrik dira.', 'En la condicionada, los casos posibles son solo la fila o la columna de la condición.', 'في المشروط تكون الحالات الممكنة سطر الشرط أو عموده فقط.'),
        figure: (language) => <ContingencyFigure language={language} />
    }
]
