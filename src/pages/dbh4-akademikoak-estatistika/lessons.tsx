import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { DeviationFigure, SymmetryFigure } from '../dbh2-estatistika-v2/figures'
import { CorrelationFigure, GroupedMeanFigure, IntervalsFigure, PercentilesFigure, RegressionFigure, ScatterFigure, VariationFigure } from '../dbh4-aplikatuak-estatistika/figures'
import { GoalsTableFigure, GoalsVarianceFigure, JoinedMeanFigure, QuartileRuleFigure, SamplingFigure, SportBoxFigure } from './figures'

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
    { id: 'data', tone: 'blue', title: { eu: 'Datuak eta taulak', es: 'Datos y tablas', ar: 'البيانات والجداول' } },
    { id: 'centre', tone: 'violet', title: { eu: 'Zentralizazioa', es: 'Centralización', ar: 'النزعة المركزية' } },
    { id: 'position', tone: 'mustard', title: { eu: 'Posizioa', es: 'Posición', ar: 'الموقع' } },
    { id: 'spread', tone: 'coral', title: { eu: 'Sakabanaketa', es: 'Dispersión', ar: 'التشتت' } },
    { id: 'two', tone: 'green', title: { eu: 'Bi aldagai', es: 'Dos variables', ar: 'متغيران' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })

export const statisticsAkTopics: UnitTopic[] = [
    /* ---------- 1. Data and tables ---------- */
    {
        id: 'sampling',
        stage: 'data',
        title: say('Lagina eta laginketa motak', 'Muestra y tipos de muestreo', 'العيّنة وأنواع المعاينة'),
        goal: say('Lagin bat noiz behar den erabakitzea eta zorizko, sistematiko eta geruzakako laginketak egitea.', 'Decidir cuándo hace falta una muestra y hacer muestreos aleatorios, sistemáticos y estratificados.', 'تقرير متى نحتاج إلى عيّنة، وإجراء معاينات عشوائية ومنتظمة وطبقية.'),
        explanation: say(
            'Populazioa aztertu nahi diren elementu guztiak dira; lagina, benetan aztertzen den zatia, eta haren tamaina $n$. Lagin bat hartzen da populazioa handiegia delako, garestiegia delako edo azterketak elementua hondatzen duelako. Laginak adierazgarria izan behar du, eta horretarako zoriz aukeratzen da. Zorizko laginketa sinplean, elementu guztiek aukera bera dute (zozketa bat). Laginketa sistematikoan, $k=N:n$ kalkulatzen da, lehen elementua zoriz aukeratzen da lehen $k$-en artean eta, gero, $k$-tik $k$-ra hartzen dira. Geruzakako laginketan, populazioa taldetan (geruzetan) banatzen da, eta geruza bakoitzetik bere tamainaren proportzioko zatia hartzen da: $n_i=n\\cdot\\frac{N_i}{N}$. Aldagaiak kualitatiboak edo kuantitatiboak dira, eta azken hauek diskretuak edo jarraituak.',
            'La población son todos los elementos que se quieren estudiar; la muestra, la parte que realmente se estudia, y su tamaño es $n$. Se toma una muestra porque la población es demasiado grande, demasiado cara o porque el estudio estropea el elemento. La muestra tiene que ser representativa, y para eso se elige al azar. En el muestreo aleatorio simple todos los elementos tienen la misma posibilidad (un sorteo). En el muestreo sistemático se calcula $k=N:n$, se elige al azar el primer elemento entre los $k$ primeros y después se toman de $k$ en $k$. En el muestreo estratificado la población se divide en grupos (estratos) y de cada estrato se toma una parte proporcional a su tamaño: $n_i=n\\cdot\\frac{N_i}{N}$. Las variables son cualitativas o cuantitativas, y estas, discretas o continuas.',
            'المجتمع هو كل العناصر التي نريد دراستها، والعيّنة هي الجزء الذي ندرسه فعلًا، وحجمها $n$. نأخذ عيّنة لأن المجتمع كبير جدًا أو مكلف جدًا أو لأن الدراسة تُتلف العنصر. ويجب أن تكون العيّنة ممثِّلة، ولذلك تُختار عشوائيًا. في المعاينة العشوائية البسيطة لكل العناصر الإمكان نفسه (قرعة). وفي المعاينة المنتظمة نحسب $k=N:n$، ونختار العنصر الأول عشوائيًا بين أول $k$ عناصر، ثم نأخذ عنصرًا كل $k$. وفي المعاينة الطبقية نقسم المجتمع إلى فئات (طبقات) ونأخذ من كل طبقة جزءًا متناسبًا مع حجمها: $n_i=n\\cdot\\frac{N_i}{N}$. والمتغيرات نوعية أو كمية، والكمية منفصلة أو متصلة.'
        ),
        problem: say('Ikastetxe batek 600 ikasle ditu: 180 1. mailan, 150 2.ean, 140 3.ean eta 130 4.ean. 60 ikasleko lagin geruzatua egin nahi da. Zenbat ikasle maila bakoitzetik?', 'Un instituto tiene 600 alumnos: 180 en 1.º, 150 en 2.º, 140 en 3.º y 130 en 4.º. Se quiere una muestra estratificada de 60. ¿Cuántos alumnos de cada curso?', 'في مدرسة 600 تلميذ: 180 في الأول، 150 في الثاني، 140 في الثالث، 130 في الرابع. نريد عيّنة طبقية من 60. كم تلميذًا من كل صف؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Laginaren zatia: 60 600etik.', 'La fracción de la muestra: 60 de 600.', 'كسر العيّنة: 60 من 600.'), math: same('$\\frac{60}{600}=0{,}1$') },
            { text: say('Biderkatu maila bakoitzeko ikasleak.', 'Multiplica los alumnos de cada curso.', 'اضرب تلاميذ كل صف.'), math: same('$0{,}1\\cdot 180=18\\qquad 0{,}1\\cdot 150=15$') },
            { text: say('Egiaztatu batura.', 'Comprueba la suma.', 'تحقّق من المجموع.'), math: same('$18+15+14+13=60$') }
        ],
        example: same('$k=\\frac{600}{60}=10$'),
        takeaway: say('Geruzakakoan, geruza bakoitzak bere tamainaren proportzioan; sistematikoan, k-tik k-ra.', 'En el estratificado, cada estrato en proporción a su tamaño; en el sistemático, de k en k.', 'في الطبقية كل طبقة بنسبة حجمها؛ وفي المنتظمة عنصر كل k.'),
        figure: (language) => <SamplingFigure language={language} />
    },
    {
        id: 'frequencies',
        stage: 'data',
        title: say('Maiztasun-taulak', 'Tablas de frecuencias', 'جداول التكرارات'),
        goal: say('Maiztasun absolutuak, erlatiboak eta metatuak kalkulatzea eta taula oso bat osatzea.', 'Calcular frecuencias absolutas, relativas y acumuladas, y completar una tabla.', 'حساب التكرارات المطلقة والنسبية والمتجمّعة، وإكمال جدول.'),
        explanation: say(
            'Balio bakoitzaren maiztasun absolutua, $f_i$, zenbat aldiz agertzen den da; denak batuta, $N$. Maiztasun erlatiboa $h_i=\\frac{f_i}{N}$ da, eta denak batuta 1 ematen dute (ehunekotan, 100). Maiztasun absolutu metatua, $F_i$, balio horren eta aurrekoen maiztasunen batura da; azkena $N$ da. Maiztasun erlatibo metatua $H_i=\\frac{F_i}{N}$ da, eta azkena 1. Metatuek galdera hauei erantzuten diete: «zenbat datu dira 2 edo gutxiago?». Taula bat osatzeko, erlazio horiek erabiltzen dira atzeraka: $f_i=F_i-F_{i-1}$, $f_i=h_i\\cdot N$ edo, $h_i$ guztien batura 1 dela jakinda, $N$ aurkitzeko ekuazio bat.',
            'La frecuencia absoluta de cada valor, $f_i$, es el número de veces que aparece; sumadas todas, $N$. La frecuencia relativa es $h_i=\\frac{f_i}{N}$, y sumadas todas dan 1 (en porcentaje, 100). La frecuencia absoluta acumulada, $F_i$, es la suma de las frecuencias de ese valor y los anteriores; la última es $N$. La frecuencia relativa acumulada es $H_i=\\frac{F_i}{N}$, y la última es 1. Las acumuladas responden a preguntas como «¿cuántos datos son 2 o menos?». Para completar una tabla se usan esas relaciones al revés: $f_i=F_i-F_{i-1}$, $f_i=h_i\\cdot N$ o, sabiendo que la suma de las $h_i$ es 1, una ecuación para hallar $N$.',
            'التكرار المطلق لكل قيمة $f_i$ هو عدد مرات ظهورها، ومجموعها كلها $N$. والتكرار النسبي $h_i=\\frac{f_i}{N}$، ومجموعها 1 (وبالنسبة المئوية 100). والتكرار المطلق المتجمّع $F_i$ هو مجموع تكرارات تلك القيمة وما قبلها، وآخره $N$. والتكرار النسبي المتجمّع $H_i=\\frac{F_i}{N}$، وآخره 1. وتجيب المتجمّعة عن أسئلة مثل «كم بيانًا قيمته 2 أو أقل؟». ولإكمال جدول نستعمل هذه العلاقات بالعكس: $f_i=F_i-F_{i-1}$ و$f_i=h_i\\cdot N$، أو معادلة لإيجاد $N$ لأن مجموع $h_i$ يساوي 1.'
        ),
        problem: say('30 partidatako golak: 0 → 6 partida, 1 → 7, 2 → 8, 3 → 6, 4 → 2, 5 → 1. Zein ehunekotan sartu dira 2 gol edo gutxiago?', 'Goles en 30 partidos: 0 → 6 partidos, 1 → 7, 2 → 8, 3 → 6, 4 → 2, 5 → 1. ¿En qué porcentaje se marcaron 2 goles o menos?', 'الأهداف في 30 مباراة: 0 ← 6 مباريات، 1 ← 7، 2 ← 8، 3 ← 6، 4 ← 2، 5 ← 1. في أي نسبة سُجّل هدفان أو أقل؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Metatu maiztasunak.', 'Acumula las frecuencias.', 'اجمع التكرارات تراكميًا.'), math: same('$F_3=6+7+8=21$') },
            { text: say('Zatitu $N$-z.', 'Divide entre $N$.', 'اقسم على $N$.'), math: same('$H_3=\\frac{21}{30}=0{,}7$') },
            { text: say('Ehunekotan: % 70.', 'En porcentaje: el 70 %.', 'بالنسبة المئوية: 70 %.'), math: same('$0{,}7\\cdot 100=70$') }
        ],
        example: same('$h_i=\\frac{f_i}{N}$'),
        takeaway: say('h = f zati N; F eta H metatzen dira, eta azkenak N eta 1 dira.', 'h = f entre N; F y H se acumulan, y las últimas son N y 1.', 'h = f على N؛ وF وH تتراكمان، وآخرهما N و1.'),
        figure: (language) => <GoalsTableFigure language={language} />
    },
    {
        id: 'intervals',
        stage: 'data',
        title: say('Tarteak eta histograma', 'Intervalos e histograma', 'الفئات والمدرّج التكراري'),
        goal: say('Datu jarraituak tarteetan antolatzea, klase-markak kalkulatzea eta grafiko egokia aukeratzea.', 'Agrupar datos continuos en intervalos, calcular las marcas de clase y elegir el gráfico adecuado.', 'تبويب البيانات المتصلة في فئات، وحساب مراكزها، واختيار التمثيل المناسب.'),
        explanation: say(
            'Aldagai jarraituetan edo balio asko dituztenetan, datuak tarteetan multzokatzen dira, normalean zabalera berekoak eta $[a,b)$ moduan idatziak (ezkerrekoa barne, eskuinekoa ez). Ibiltartea $r=\\text{handiena}-\\text{txikiena}$ da; tarte kopurua aukeratu, $r$ baino handixeagoa eta zatigarria den $r\'$ hartu eta zabalera $r\'$ zati tarte kopurua da. Klase-marka tartearen erdia da, $x_i=\\frac{a+b}{2}$, eta kalkuluetan tarteko datu guztien ordezkaria da. Grafikoei dagokienez: kualitatiboetan, barrak edo sektoreak ($h_i\\cdot 360^{\\circ}$); diskretuetan, barrak; tarteetan, histograma (laukizuzen itsatsiak) eta maiztasun-poligonoa, klase-marken gaineko puntuak lotuta.',
            'En las variables continuas o con muchos valores, los datos se agrupan en intervalos, normalmente de la misma amplitud y escritos como $[a,b)$ (el izquierdo incluido, el derecho no). El recorrido es $r=\\text{mayor}-\\text{menor}$; se elige el número de intervalos, se toma un $r\'$ algo mayor que $r$ y divisible, y la amplitud es $r\'$ entre el número de intervalos. La marca de clase es el centro del intervalo, $x_i=\\frac{a+b}{2}$, y en los cálculos representa a todos los datos del intervalo. En cuanto a los gráficos: en las cualitativas, barras o sectores ($h_i\\cdot 360^{\\circ}$); en las discretas, barras; en intervalos, el histograma (rectángulos pegados) y el polígono de frecuencias, uniendo los puntos sobre las marcas de clase.',
            'في المتغيرات المتصلة أو الكثيرة القيم تُبوَّب البيانات في فئات، عادةً متساوية الطول ومكتوبة $[a,b)$ (الطرف الأيسر داخل والأيمن لا). المدى $r$ = الأكبر − الأصغر؛ نختار عدد الفئات ونأخذ $r\'$ أكبر قليلًا من $r$ ويقبل القسمة، فيكون طول الفئة $r\'$ على عدد الفئات. ومركز الفئة منتصفها $x_i=\\frac{a+b}{2}$، ويمثّل في الحسابات كل بياناتها. أما التمثيلات: في النوعية أعمدة أو قطاعات ($h_i\\cdot 360^{\\circ}$)، وفي المنفصلة أعمدة، وفي الفئات المدرّج التكراري (مستطيلات متلاصقة) والمضلّع التكراري بوصل النقاط فوق المراكز.'
        ),
        problem: say('40 ikasleren altuerak 148 cm-tik 177 cm-ra doaz. 6 tarte egin nahi dira. Zein zabalera eta zein lehen tarte?', 'Las alturas de 40 alumnos van de 148 cm a 177 cm. Se quieren 6 intervalos. ¿Qué amplitud y qué primer intervalo?', 'تمتد أطوال 40 تلميذًا من 148 سم إلى 177 سم. نريد 6 فئات. ما الطول وما الفئة الأولى؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ibiltartea eta 6z zatigarria den $r\'$.', 'Recorrido y un $r\'$ divisible entre 6.', 'المدى و$r\'$ يقبل القسمة على 6.'), math: same('$177-148=29\\ \\to\\ r\'=30$') },
            { text: say('Zabalera.', 'Amplitud.', 'طول الفئة.'), math: same('$30:6=5$') },
            { text: say('Soberakina bi muturretan: hasi 0,5 lehenago.', 'El exceso, en los dos extremos: empieza 0,5 antes.', 'الفائض على الطرفين: ابدأ قبل 0.5.'), math: same('$[147{,}5;\\ 152{,}5)$') }
        ],
        example: same('$\\frac{147{,}5+152{,}5}{2}=150$'),
        takeaway: say('Zabalera = r′ zati tarte kopurua; klase-marka = tartearen erdia; tarteetan, histograma.', 'Amplitud = r′ entre el número de intervalos; marca de clase = centro; en intervalos, histograma.', 'الطول = r′ على عدد الفئات؛ المركز = المنتصف؛ وفي الفئات مدرّج تكراري.'),
        figure: (language) => <IntervalsFigure language={language} />
    },

    /* ---------- 2. Centralization ---------- */
    {
        id: 'mean',
        stage: 'centre',
        title: say('Batez bestekoa eta haztatua', 'Media y media ponderada', 'المتوسط والمتوسط المرجّح'),
        goal: say('Taula baten batez bestekoa kalkulatzea, taldeak batzea eta falta den datu bat aurkitzea.', 'Calcular la media de una tabla, juntar grupos y hallar un dato que falta.', 'حساب متوسط جدول، ودمج مجموعات، وإيجاد بيان ناقص.'),
        explanation: say(
            'Batez bestekoa $\\bar{x}=\\frac{\\sum f_i x_i}{N}$ da. Haren bidez datu guztien batura ezagutzen da: $\\sum x_i=N\\cdot\\bar{x}$. Horrek bi aplikazio ditu. Lehena, talde batzuk batzea: bi taldeen batez bestekoa ez da beren batez bestekoen erdia, baizik eta batez besteko haztatua, $\\bar{x}=\\frac{n_1\\bar{x}_1+n_2\\bar{x}_2}{n_1+n_2}$; talde handienaren batez bestekotik hurbilago geratzen da. Bigarrena, falta den datu bat aurkitzea: batura osoa $N\\cdot\\bar{x}$ da, eta ezagutzen diren datuak kenduta, falta dena geratzen da. Batez besteko haztatua erabiltzen da nota bateko azterketek pisu desberdina dutenean ere.',
            'La media es $\\bar{x}=\\frac{\\sum f_i x_i}{N}$. Con ella se conoce la suma de todos los datos: $\\sum x_i=N\\cdot\\bar{x}$. Eso tiene dos aplicaciones. La primera, juntar grupos: la media de dos grupos no es el punto medio de sus medias, sino la media ponderada, $\\bar{x}=\\frac{n_1\\bar{x}_1+n_2\\bar{x}_2}{n_1+n_2}$; queda más cerca de la media del grupo más numeroso. La segunda, hallar un dato que falta: la suma total es $N\\cdot\\bar{x}$, y quitando los datos conocidos queda el que falta. La media ponderada se usa también cuando los exámenes de una nota pesan distinto.',
            'المتوسط هو $\\bar{x}=\\frac{\\sum f_i x_i}{N}$. وبه نعرف مجموع كل البيانات: $\\sum x_i=N\\cdot\\bar{x}$. ولذلك تطبيقان. الأول دمج مجموعات: متوسط مجموعتين ليس منتصف متوسطيهما، بل المتوسط المرجّح $\\bar{x}=\\frac{n_1\\bar{x}_1+n_2\\bar{x}_2}{n_1+n_2}$، ويكون أقرب إلى متوسط المجموعة الأكبر. والثاني إيجاد بيان ناقص: المجموع الكلي $N\\cdot\\bar{x}$، وبطرح البيانات المعروفة يبقى الناقص. ويُستعمل المتوسط المرجّح أيضًا عندما تختلف أوزان امتحانات علامة ما.'
        ),
        problem: say('A taldeak 20 ikasle ditu, 6,5eko batez bestekoarekin, eta B taldeak 30, 7,2koarekin. Zein da 50 ikasleen batez bestekoa?', 'El grupo A tiene 20 alumnos con media 6,5 y el B, 30 con media 7,2. ¿Cuál es la media de los 50 alumnos?', 'في المجموعة A عشرون تلميذًا متوسطهم 6.5، وفي B ثلاثون متوسطهم 7.2. ما متوسط التلاميذ الخمسين؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Talde bakoitzeko notak batuta.', 'La suma de las notas de cada grupo.', 'مجموع علامات كل مجموعة.'), math: same('$20\\cdot 6{,}5=130\\qquad 30\\cdot 7{,}2=216$') },
            { text: say('Batu eta zatitu ikasle guztiez.', 'Suma y divide entre todos los alumnos.', 'اجمع واقسم على كل التلاميذ.'), math: same('$\\frac{130+216}{50}=6{,}92$') },
            { text: say('6,85 baino gehiago: B-k pisu handiagoa du.', 'Más que 6,85: B pesa más.', 'أكثر من 6.85: وزن B أكبر.') }
        ],
        example: same('$4\\cdot 7-(5+7+8)=8$'),
        takeaway: say('Batura = N bider batez bestekoa: horrela batzen dira taldeak eta aurkitzen dira falta diren datuak.', 'Suma = N por la media: así se juntan grupos y se hallan los datos que faltan.', 'المجموع = N في المتوسط: هكذا تُدمج المجموعات وتوجد البيانات الناقصة.'),
        figure: (language) => <JoinedMeanFigure language={language} />
    },
    {
        id: 'median-mode',
        stage: 'centre',
        title: say('Mediana eta moda', 'Mediana y moda', 'الوسيط والمنوال'),
        goal: say('Taula baten mediana eta moda aurkitzea eta zein parametrok ordezkatzen dituen hobeto datuak erabakitzea.', 'Hallar la mediana y la moda de una tabla y decidir qué parámetro representa mejor los datos.', 'إيجاد وسيط جدول ومنواله، وتقرير أي مقياس يمثّل البيانات أفضل.'),
        explanation: say(
            'Mediana (Me), datuak ordenatuta, erdian geratzen dena da. $N$ bakoitia bada, $\\frac{N+1}{2}$ postuko datua; bikoitia bada, $\\frac{N}{2}$ eta $\\frac{N}{2}+1$ postuen batez bestekoa. Taula batean, postu horiek maiztasun metatuetan bilatzen dira. Moda (Mo) maiztasun handieneko balioa da; bat baino gehiago egon daitezke (bimodala). Batez bestekoak datu guztiak erabiltzen ditu, eta horregatik muturreko balio batek (atipiko batek) asko mugitzen du; medianak ez du ia aldatzen. Banaketa simetrikoetan $\\bar{x}$, Me eta Mo antzekoak dira; asimetrikoetan, batez bestekoa isatsaren aldera mugitzen da, eta mediana ordezkari hobea da (soldatak, etxebizitzen prezioak).',
            'La mediana (Me), con los datos ordenados, es la que queda en el centro. Si $N$ es impar, el dato de la posición $\\frac{N+1}{2}$; si es par, la media de las posiciones $\\frac{N}{2}$ y $\\frac{N}{2}+1$. En una tabla esas posiciones se buscan en las frecuencias acumuladas. La moda (Mo) es el valor de mayor frecuencia; puede haber más de una (bimodal). La media usa todos los datos, y por eso un valor extremo (un atípico) la mueve mucho; la mediana apenas cambia. En las distribuciones simétricas $\\bar{x}$, Me y Mo son parecidas; en las asimétricas la media se desplaza hacia la cola, y la mediana representa mejor (sueldos, precios de viviendas).',
            'الوسيط (Me)، بعد ترتيب البيانات، هو الذي يبقى في الوسط. إذا كان $N$ فرديًا فهو البيان في الموقع $\\frac{N+1}{2}$، وإذا كان زوجيًا فمتوسط الموقعين $\\frac{N}{2}$ و$\\frac{N}{2}+1$. وفي الجدول نبحث عن هذين الموقعين في التكرارات المتجمّعة. والمنوال (Mo) هو القيمة ذات التكرار الأكبر، وقد يكون أكثر من واحد (ثنائي المنوال). المتوسط يستعمل كل البيانات، لذلك تحرّكه قيمة متطرفة (شاذة) كثيرًا، أما الوسيط فلا يكاد يتغيّر. في التوزيعات المتماثلة تتقارب $\\bar{x}$ وMe وMo، وفي غير المتماثلة ينزاح المتوسط نحو الذيل ويكون الوسيط ممثّلًا أفضل (الرواتب، أسعار المساكن).'
        ),
        problem: say('Enpresa txiki batean 4 langilek 1200 € irabazten dituzte eta zuzendariak 6000 €. Kalkulatu batez bestekoa eta mediana. Zeinek ordezkatzen du hobeto?', 'En una empresa pequeña 4 empleados ganan 1200 € y la directora 6000 €. Calcula la media y la mediana. ¿Cuál representa mejor?', 'في شركة صغيرة يكسب 4 موظفين 1200 € وتكسب المديرة 6000 €. احسب المتوسط والوسيط. أيهما يمثّل أفضل؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batez bestekoa.', 'Media.', 'المتوسط.'), math: same('$\\frac{4\\cdot 1200+6000}{5}=2160$') },
            { text: say('Mediana: 3. datua.', 'Mediana: el dato 3.º.', 'الوسيط: البيان الثالث.'), math: same('$\\text{Me}=1200$') },
            { text: say('Inork ez du 2160 € irabazten: medianak hobeto ordezkatzen du.', 'Nadie gana 2160 €: la mediana representa mejor.', 'لا أحد يكسب 2160 €: الوسيط يمثّل أفضل.') }
        ],
        example: same('$\\frac{30}{2}=15$'),
        takeaway: say('Mediana metatuetan bilatzen da; atipikoak daudenean, batez bestekoa baino hobea da.', 'La mediana se busca en las acumuladas; con atípicos, es mejor que la media.', 'يُبحث عن الوسيط في المتجمّعة؛ ومع الشواذ يكون أفضل من المتوسط.'),
        figure: (language) => <SymmetryFigure language={language} />
    },
    {
        id: 'grouped-centre',
        stage: 'centre',
        title: say('Datu multzokatuen parametroak', 'Parámetros de datos agrupados', 'مقاييس البيانات المبوّبة'),
        goal: say('Tarteetan dauden datuen batez bestekoa kalkulatzea eta tarte modala eta mediana-tartea aurkitzea.', 'Calcular la media de datos en intervalos y hallar el intervalo modal y el intervalo mediano.', 'حساب متوسط بيانات في فئات، وإيجاد الفئة المنوالية والفئة الوسيطية.'),
        explanation: say(
            'Datuak tarteetan daudenean, ez dakigu datu bakoitza zehazki zein den. Horregatik tarte bakoitzeko datu guztiak haren klase-markan daudela onartzen da: $\\bar{x}=\\frac{\\sum f_i x_i}{N}$, $x_i$ klase-marka izanik. Emaitza hurbilketa bat da. Tarte modala maiztasun handiena duena da (zabalera berekoak badira), eta moda gisa haren klase-marka ematen da; bi tarte berdinduta badaude, banaketa bimodala da. Mediana-tartea $\\frac{N}{2}$ datua duena da: $F_i$ metatuak $\\frac{N}{2}$ lehen aldiz gainditzen edo berdintzen duen tartea. Mediana gisa haren klase-marka eman daiteke.',
            'Cuando los datos están en intervalos, no sabemos exactamente cuál es cada dato. Por eso se admite que todos los datos de cada intervalo están en su marca de clase: $\\bar{x}=\\frac{\\sum f_i x_i}{N}$, siendo $x_i$ la marca de clase. El resultado es una aproximación. El intervalo modal es el de mayor frecuencia (si tienen la misma amplitud), y como moda se da su marca de clase; si dos intervalos empatan, la distribución es bimodal. El intervalo mediano es el que contiene el dato $\\frac{N}{2}$: el intervalo en el que la acumulada $F_i$ alcanza o supera por primera vez $\\frac{N}{2}$. Como mediana se puede dar su marca de clase.',
            'عندما تكون البيانات في فئات لا نعرف كل بيان بدقة. لذلك نقبل أن كل بيانات الفئة موجودة في مركزها: $\\bar{x}=\\frac{\\sum f_i x_i}{N}$، حيث $x_i$ مركز الفئة. والنتيجة تقريب. والفئة المنوالية هي ذات التكرار الأكبر (إذا تساوت الأطوال)، ونعطي مركزها منوالًا؛ وإذا تعادلت فئتان فالتوزيع ثنائي المنوال. والفئة الوسيطية هي التي تحوي البيان $\\frac{N}{2}$: الفئة التي يبلغ فيها المتجمّع $F_i$ القيمة $\\frac{N}{2}$ أو يتجاوزها لأول مرة. ويمكن إعطاء مركزها وسيطًا.'
        ),
        problem: say('Itxaron-denborak (min): $[0,15)$ 6, $[15,30)$ 3, $[30,45)$ 5, $[45,60)$ 6. Kalkulatu $\\bar{x}$ eta aurkitu mediana-tartea.', 'Tiempos de espera (min): $[0,15)$ 6, $[15,30)$ 3, $[30,45)$ 5, $[45,60)$ 6. Calcula $\\bar{x}$ y halla el intervalo mediano.', 'أزمنة الانتظار (دقيقة): $[0,15)$ 6، $[15,30)$ 3، $[30,45)$ 5، $[45,60)$ 6. احسب $\\bar{x}$ وأوجد الفئة الوسيطية.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Klase-markak 7,5; 22,5; 37,5; 52,5.', 'Marcas de clase 7,5; 22,5; 37,5; 52,5.', 'المراكز 7.5؛ 22.5؛ 37.5؛ 52.5.'), math: same('$\\sum f_i x_i=615$') },
            { text: say('Batez bestekoa.', 'Media.', 'المتوسط.'), math: same('$\\bar{x}=\\frac{615}{20}=30{,}75$') },
            { text: say('Metatuak 6, 9, 14, 20: 10. datua hirugarren tartean. Bi tarte modal.', 'Acumuladas 6, 9, 14, 20: el dato 10.º, en el tercer intervalo. Dos intervalos modales.', 'المتجمّعة 6، 9، 14، 20: البيان العاشر في الفئة الثالثة. فئتان منواليتان.'), math: same('$[30,45)$') }
        ],
        example: same('$\\frac{30+45}{2}=37{,}5$'),
        takeaway: say('Tarteetan, klase-markekin kalkulatu; tarte modala eta mediana-tartea taulan bertan ikusten dira.', 'En intervalos, calcula con las marcas de clase; el intervalo modal y el mediano se ven en la tabla.', 'في الفئات احسب بالمراكز؛ والفئة المنوالية والوسيطية تُريان في الجدول.'),
        figure: (language) => <GroupedMeanFigure language={language} />
    },

    /* ---------- 3. Position ---------- */
    {
        id: 'quartiles',
        stage: 'position',
        title: say('Kuartilak', 'Cuartiles', 'الربيعيات'),
        goal: say('Datu-zerrenda baten kuartilak postuen erregelarekin kalkulatzea eta kuartil arteko ibiltartea aurkitzea.', 'Calcular los cuartiles de una lista de datos con la regla de las posiciones y hallar el recorrido intercuartílico.', 'حساب ربيعيات قائمة بيانات بقاعدة المواقع وإيجاد المدى الربيعي.'),
        explanation: say(
            'Kuartilek datu ordenatuak lau zati berdinetan banatzen dituzte: $Q_1$-en azpian datuen % 25 dago, Me-ren azpian % 50 eta $Q_3$-ren azpian % 75. Kalkulatzeko, ordenatu datuak eta kalkulatu postua: $N\\cdot\\frac{k}{100}$ ($k=25$, 50 edo 75). Zenbaki osoa bada, postu horretako eta hurrengoko datuen batez bestekoa hartzen da; hamartarra bada, goiko postuko datua. Kuartil arteko ibiltartea $\\text{RIC}=Q_3-Q_1$ da: erdiko datuen % 50 hartzen duen tartearen zabalera. Ibiltartearekin ez bezala, muturreko balio batek ez du aldatzen.',
            'Los cuartiles dividen los datos ordenados en cuatro partes iguales: por debajo de $Q_1$ está el 25 % de los datos, por debajo de Me el 50 % y por debajo de $Q_3$ el 75 %. Para calcularlos, ordena los datos y calcula la posición: $N\\cdot\\frac{k}{100}$ ($k=25$, 50 o 75). Si es un número entero, se toma la media de los datos de esa posición y la siguiente; si es decimal, el dato de la posición superior. El recorrido intercuartílico es $\\text{RIC}=Q_3-Q_1$: la anchura del intervalo que ocupa el 50 % central de los datos. A diferencia del recorrido, un valor extremo no lo cambia.',
            'تقسم الربيعيات البيانات المرتّبة إلى أربعة أجزاء متساوية: تحت $Q_1$ يقع 25 % من البيانات، وتحت Me يقع 50 %، وتحت $Q_3$ يقع 75 %. لحسابها رتّب البيانات واحسب الموقع: $N\\cdot\\frac{k}{100}$ ($k=25$ أو 50 أو 75). إذا كان عددًا صحيحًا نأخذ متوسط البيان في ذلك الموقع والذي يليه، وإذا كان عشريًا نأخذ البيان في الموقع الأعلى. والمدى الربيعي $\\text{RIC}=Q_3-Q_1$: عرض المجال الذي يشغله الـ50 % الأوسط من البيانات. وخلافًا للمدى لا تغيّره قيمة متطرفة.'
        ),
        problem: say('12 ikasleren asteko kirol-orduak: 2, 3, 3, 4, 5, 5, 6, 7, 7, 8, 9, 15. Kalkulatu kuartilak eta RIC.', 'Horas de deporte semanales de 12 alumnos: 2, 3, 3, 4, 5, 5, 6, 7, 7, 8, 9, 15. Calcula los cuartiles y el RIC.', 'ساعات الرياضة الأسبوعية لـ12 تلميذًا: 2، 3، 3، 4، 5، 5، 6، 7، 7، 8، 9، 15. احسب الربيعيات والمدى الربيعي.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$12\\cdot 0{,}25=3$, osoa: 3. eta 4. datuak.', '$12\\cdot 0{,}25=3$, entero: datos 3.º y 4.º.', '$12\\cdot 0{,}25=3$، صحيح: البيانان الثالث والرابع.'), math: same('$Q_1=\\frac{3+4}{2}=3{,}5$') },
            { text: say('6. eta 7. datuak; 9. eta 10. datuak.', 'Datos 6.º y 7.º; datos 9.º y 10.º.', 'البيانان السادس والسابع؛ والتاسع والعاشر.'), math: same('$\\text{Me}=5{,}5\\qquad Q_3=7{,}5$') },
            { text: say('Kuartil arteko ibiltartea.', 'Recorrido intercuartílico.', 'المدى الربيعي.'), math: same('$7{,}5-3{,}5=4$') }
        ],
        example: same('$15\\cdot 0{,}25=3{,}75\\ \\to\\ 4$'),
        takeaway: say('Postua N·k/100: osoa bada, bi daturen erdia; hamartarra bada, hurrengo datua.', 'Posición N·k/100: si es entera, la media de dos datos; si es decimal, el dato siguiente.', 'الموقع N·k/100: إذا كان صحيحًا فمتوسط بيانين، وإذا كان عشريًا فالبيان التالي.'),
        figure: (language) => <QuartileRuleFigure language={language} />
    },
    {
        id: 'percentiles',
        stage: 'position',
        title: say('Pertzentilak', 'Percentiles', 'المئينات'),
        goal: say('Maiztasun-taula batetik edozein pertzentil aurkitzea eta pertzentil bat interpretatzea.', 'Hallar cualquier percentil a partir de una tabla de frecuencias e interpretar un percentil.', 'إيجاد أي مئين من جدول تكرارات وتفسير مئين.'),
        explanation: say(
            '$k$ pertzentilak, $p_k$, datuen % $k$ uzten du azpian. Kuartilak pertzentil bereziak dira: $Q_1=p_{25}$, $\\text{Me}=p_{50}$, $Q_3=p_{75}$. Maiztasun-taula batean, gehitu ehuneko metatuen zutabea ($100\\cdot H_i$): $p_k$ ehuneko metatuak $k$ lehen aldiz gainditzen duen balioa da. Ehuneko metatua $k$ bera bada, balio hori eta hurrengoaren erdia hartzen da. Interpretazioa: haur baten pisua 80 pertzentilean badago, bere adineko haurren % 80k gutxiago edo berdin pisatzen dute, eta % 20k gehiago. Pertzentilak oso erabiliak dira haurren hazkundean eta azterketa-emaitzetan.',
            'El percentil $k$, $p_k$, deja por debajo el $k$ % de los datos. Los cuartiles son percentiles especiales: $Q_1=p_{25}$, $\\text{Me}=p_{50}$, $Q_3=p_{75}$. En una tabla de frecuencias, añade la columna de porcentajes acumulados ($100\\cdot H_i$): $p_k$ es el primer valor cuyo porcentaje acumulado supera $k$. Si el porcentaje acumulado es justo $k$, se toma el punto medio entre ese valor y el siguiente. Interpretación: si el peso de un bebé está en el percentil 80, el 80 % de los bebés de su edad pesa lo mismo o menos, y el 20 % pesa más. Los percentiles se usan mucho en el crecimiento infantil y en los resultados de exámenes.',
            'المئين $k$ أي $p_k$ يترك تحته $k$ % من البيانات. والربيعيات مئينات خاصة: $Q_1=p_{25}$ و$\\text{Me}=p_{50}$ و$Q_3=p_{75}$. في جدول التكرارات أضف عمود النسب المتجمّعة ($100\\cdot H_i$): $p_k$ هو أول قيمة تتجاوز نسبتها المتجمّعة $k$. وإذا كانت النسبة المتجمّعة تساوي $k$ تمامًا أخذنا منتصف تلك القيمة والتي تليها. التفسير: إذا كان وزن رضيع في المئين 80 فإن 80 % من رضّع عمره يزنون مثله أو أقل، و20 % يزنون أكثر. وتُستعمل المئينات كثيرًا في نموّ الأطفال وفي نتائج الامتحانات.'
        ),
        problem: say('25 familiaren autoak: 0 → 3, 1 → 12, 2 → 4, 3 → 4, 4 → 2. Aurkitu $p_{30}$ eta $p_{85}$.', 'Coches de 25 familias: 0 → 3, 1 → 12, 2 → 4, 3 → 4, 4 → 2. Halla $p_{30}$ y $p_{85}$.', 'سيارات 25 أسرة: 0 ← 3، 1 ← 12، 2 ← 4، 3 ← 4، 4 ← 2. أوجد $p_{30}$ و$p_{85}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ehuneko metatuak.', 'Porcentajes acumulados.', 'النسب المتجمّعة.'), math: same('$12,\\ 60,\\ 76,\\ 92,\\ 100$') },
            { text: say('30 gainditzen da 1ean.', 'El 30 se supera en el 1.', '30 تُتجاوز عند 1.'), math: same('$p_{30}=1$') },
            { text: say('85 gainditzen da 3an.', 'El 85 se supera en el 3.', '85 تُتجاوز عند 3.'), math: same('$p_{85}=3$') }
        ],
        example: same('$\\frac{15}{25}\\cdot 100=60$'),
        takeaway: say('Pertzentila: ehuneko metatuak k lehen aldiz gainditzen duen balioa.', 'Percentil: el primer valor cuyo porcentaje acumulado supera k.', 'المئين: أول قيمة تتجاوز نسبتها المتجمّعة k.'),
        figure: (language) => <PercentilesFigure language={language} />
    },
    {
        id: 'box-plot',
        stage: 'position',
        title: say('Kutxa-diagrama', 'Diagrama de caja y bigotes', 'مخطط الصندوق والشاربين'),
        goal: say('Kutxa-diagrama egitea, datu atipikoak bereiztea eta diagrama bat irakurtzea.', 'Construir el diagrama de caja, separar los datos atípicos y leer un diagrama.', 'بناء مخطط الصندوق، وفصل البيانات الشاذة، وقراءة مخطط.'),
        explanation: say(
            'Kutxa-diagramak bost zenbakiren laburpena erakusten du. Kutxa $Q_1$-etik $Q_3$-ra doa, eta marra bat du medianan. Biboteak kutxatik ateratzen dira, baina gehienez $1{,}5\\cdot\\text{RIC}$ luzeran: barruko mugak $Q_1-1{,}5\\cdot\\text{RIC}$ eta $Q_3+1{,}5\\cdot\\text{RIC}$ dira. Bibote bakoitza muga horien barruan dagoen azken datuan amaitzen da; kanpoan geratzen diren datuak atipikoak dira eta izartxo batez markatzen dira. Diagramak bost zati ditu, bakoitzean datuen % 25 inguru: zati luze batek datu sakabanatuak esan nahi du, ez datu gehiago. Medianak kutxa erdibitzen ez badu, banaketa asimetrikoa da.',
            'El diagrama de caja muestra un resumen de cinco números. La caja va de $Q_1$ a $Q_3$ y tiene una raya en la mediana. Los bigotes salen de la caja, pero como mucho con una longitud de $1{,}5\\cdot\\text{RIC}$: los límites son $Q_1-1{,}5\\cdot\\text{RIC}$ y $Q_3+1{,}5\\cdot\\text{RIC}$. Cada bigote termina en el último dato que queda dentro de esos límites; los datos que quedan fuera son atípicos y se marcan con un asterisco. Cada uno de los cuatro tramos lleva más o menos el 25 % de los datos: un tramo largo significa datos dispersos, no más datos. Si la mediana no parte la caja por la mitad, la distribución es asimétrica.',
            'يعرض مخطط الصندوق ملخصًا من خمسة أعداد. يمتد الصندوق من $Q_1$ إلى $Q_3$ وفيه خط عند الوسيط. ويخرج الشاربان من الصندوق، لكن بطول أقصاه $1{,}5\\cdot\\text{RIC}$: الحدّان هما $Q_1-1{,}5\\cdot\\text{RIC}$ و$Q_3+1{,}5\\cdot\\text{RIC}$. وينتهي كل شارب عند آخر بيان داخل الحدّين، والبيانات التي تبقى خارجهما شاذة وتُعلَّم بنجمة. وكل جزء من الأجزاء الأربعة يضم نحو 25 % من البيانات: الجزء الطويل يعني بيانات متشتتة لا بيانات أكثر. وإذا لم يقسم الوسيط الصندوق نصفين فالتوزيع غير متماثل.'
        ),
        problem: say('Kirol-orduetan $Q_1=3{,}5$, $\\text{Me}=5{,}5$ eta $Q_3=7{,}5$ dira, eta datuak 2tik 15era doaz. Marraztu kutxa-diagrama.', 'En las horas de deporte $Q_1=3{,}5$, $\\text{Me}=5{,}5$ y $Q_3=7{,}5$, y los datos van de 2 a 15. Dibuja el diagrama de caja.', 'في ساعات الرياضة $Q_1=3{,}5$ و$\\text{Me}=5{,}5$ و$Q_3=7{,}5$، وتمتد البيانات من 2 إلى 15. ارسم مخطط الصندوق.'),
        stepsKind: 'steps',
        steps: [
            { text: say('RIC eta haren 1,5 aldiz.', 'El RIC y 1,5 veces el RIC.', 'المدى الربيعي و1.5 مرة منه.'), math: same('$7{,}5-3{,}5=4\\qquad 1{,}5\\cdot 4=6$') },
            { text: say('Mugak: behekoa $3{,}5-6=-2{,}5$; goikoa:', 'Límites: el inferior, $3{,}5-6=-2{,}5$; el superior:', 'الحدّان: السفلي $3{,}5-6=-2{,}5$؛ والعلوي:'), math: same('$7{,}5+6=13{,}5$') },
            { text: say('Biboteak 2 eta 9ra; 15 atipikoa da.', 'Bigotes hasta 2 y 9; el 15 es atípico.', 'الشاربان حتى 2 و9؛ و15 شاذ.') }
        ],
        example: same('$1{,}5\\cdot 4=6$'),
        takeaway: say('Biboteak gehienez 1,5·RIC; kanpoan geratzen dena atipikoa da.', 'Bigotes como mucho 1,5·RIC; lo que queda fuera es atípico.', 'الشاربان على الأكثر 1.5·RIC؛ وما يبقى خارجًا شاذ.'),
        figure: (language) => <SportBoxFigure language={language} />
    },

    /* ---------- 4. Dispersion ---------- */
    {
        id: 'mean-deviation',
        stage: 'spread',
        title: say('Ibiltartea eta batez besteko desbideratzea', 'Recorrido y desviación media', 'المدى والانحراف المتوسط'),
        goal: say('Ibiltartea eta batez besteko desbideratzea kalkulatzea eta bi taldetan zein den homogeneoagoa esatea.', 'Calcular el recorrido y la desviación media y decir cuál de dos grupos es más homogéneo.', 'حساب المدى والانحراف المتوسط وتحديد أي مجموعتين أكثر تجانسًا.'),
        explanation: say(
            'Zentralizazio-parametroak ez dira nahikoak: 4, 6, 7, 8, 10 eta 7, 7, 7, 7, 7 zerrendek batez besteko bera dute, baina bigarrena guztiz bilduta dago. Sakabanatze-parametroek datuak zenbat urruntzen diren neurtzen dute. Ibiltartea $\\text{handiena}-\\text{txikiena}$ da: erraza, baina bi daturen araberakoa bakarrik. Batez besteko desbideratzea datu bakoitzaren batez bestekorako distantzien batez bestekoa da: $\\text{DM}=\\frac{\\sum f_i\\,|x_i-\\bar{x}|}{N}$. Balio absolutua behar da: desbideratzeak zeinuarekin batuta, beti 0 ematen dute. Zenbat eta txikiagoa izan DM, orduan eta homogeneoagoak dira datuak.',
            'Los parámetros de centralización no bastan: las listas 4, 6, 7, 8, 10 y 7, 7, 7, 7, 7 tienen la misma media, pero la segunda está totalmente agrupada. Los parámetros de dispersión miden cuánto se alejan los datos. El recorrido es $\\text{mayor}-\\text{menor}$: es fácil, pero solo depende de dos datos. La desviación media es la media de las distancias de cada dato a la media: $\\text{DM}=\\frac{\\sum f_i\\,|x_i-\\bar{x}|}{N}$. Hace falta el valor absoluto: las desviaciones sumadas con su signo dan siempre 0. Cuanto menor es la DM, más homogéneos son los datos.',
            'مقاييس النزعة المركزية لا تكفي: القائمتان 4، 6، 7، 8، 10 و7، 7، 7، 7، 7 لهما المتوسط نفسه، لكن الثانية متجمّعة تمامًا. ومقاييس التشتت تقيس مقدار ابتعاد البيانات. المدى = الأكبر − الأصغر: سهل، لكنه يتعلق ببيانين فقط. والانحراف المتوسط هو متوسط مسافات البيانات عن المتوسط: $\\text{DM}=\\frac{\\sum f_i\\,|x_i-\\bar{x}|}{N}$. ونحتاج إلى القيمة المطلقة: فالانحرافات بإشاراتها مجموعها دائمًا 0. وكلما صغر DM كانت البيانات أكثر تجانسًا.'
        ),
        problem: say('Kalkulatu 4, 6, 7, 8, 10 datuen ibiltartea eta batez besteko desbideratzea.', 'Calcula el recorrido y la desviación media de los datos 4, 6, 7, 8, 10.', 'احسب المدى والانحراف المتوسط للبيانات 4، 6، 7، 8، 10.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ibiltartea eta batez bestekoa.', 'Recorrido y media.', 'المدى والمتوسط.'), math: same('$10-4=6\\qquad \\bar{x}=\\frac{35}{5}=7$') },
            { text: say('Batez bestekorako distantziak.', 'Distancias a la media.', 'المسافات عن المتوسط.'), math: same('$3+1+0+1+3=8$') },
            { text: say('Zatitu $N$-z.', 'Divide entre $N$.', 'اقسم على $N$.'), math: same('$\\text{DM}=\\frac{8}{5}=1{,}6$') }
        ],
        example: same('$|4-7|=3$'),
        takeaway: say('DM: distantzien batez bestekoa, balio absolutuan; txikiagoa, homogeneoagoa.', 'DM: la media de las distancias, en valor absoluto; menor, más homogéneo.', 'DM: متوسط المسافات بالقيمة المطلقة؛ الأصغر أكثر تجانسًا.'),
        figure: (language) => <DeviationFigure language={language} />
    },
    {
        id: 'variance',
        stage: 'spread',
        title: say('Bariantza eta desbideratze tipikoa', 'Varianza y desviación típica', 'التباين والانحراف المعياري'),
        goal: say('Taula baten bariantza eta desbideratze tipikoa formula laburrarekin kalkulatzea.', 'Calcular la varianza y la desviación típica de una tabla con la fórmula abreviada.', 'حساب تباين جدول وانحرافه المعياري بالصيغة المختصرة.'),
        explanation: say(
            'Bariantzak, balio absolutuaren ordez, desbideratzeak karratura jasotzen ditu: $\\sigma^2=\\frac{\\sum f_i(x_i-\\bar{x})^2}{N}$. Garatuz gero, formula laburragoa lortzen da: $\\sigma^2=\\frac{\\sum f_i x_i^2}{N}-\\bar{x}^2$, karratuen batez bestekoa ken batez bestekoaren karratua. Taulari $f_i x_i$ eta $f_i x_i^2$ zutabeak gehitzen zaizkio. Bariantzaren unitateak karratuan daudenez, desbideratze tipikoa erabiltzen da: $\\sigma=\\sqrt{\\sigma^2}$, datuen unitateetan. Banaketa askotan, datuen bi heren inguru $(\\bar{x}-\\sigma,\\ \\bar{x}+\\sigma)$ tartean daude. Kalkulagailuaren modu estatistikoak $\\sigma$ zuzenean ematen du ($\\sigma_n$ tekla).',
            'La varianza, en lugar del valor absoluto, eleva las desviaciones al cuadrado: $\\sigma^2=\\frac{\\sum f_i(x_i-\\bar{x})^2}{N}$. Desarrollando se obtiene una fórmula más corta: $\\sigma^2=\\frac{\\sum f_i x_i^2}{N}-\\bar{x}^2$, la media de los cuadrados menos el cuadrado de la media. A la tabla se le añaden las columnas $f_i x_i$ y $f_i x_i^2$. Como las unidades de la varianza están al cuadrado, se usa la desviación típica: $\\sigma=\\sqrt{\\sigma^2}$, en las unidades de los datos. En muchas distribuciones, unos dos tercios de los datos están en el intervalo $(\\bar{x}-\\sigma,\\ \\bar{x}+\\sigma)$. El modo estadístico de la calculadora da $\\sigma$ directamente (tecla $\\sigma_n$).',
            'التباين، بدل القيمة المطلقة، يربّع الانحرافات: $\\sigma^2=\\frac{\\sum f_i(x_i-\\bar{x})^2}{N}$. وبالنشر نحصل على صيغة أقصر: $\\sigma^2=\\frac{\\sum f_i x_i^2}{N}-\\bar{x}^2$، أي متوسط المربعات ناقص مربع المتوسط. ونضيف إلى الجدول العمودين $f_i x_i$ و$f_i x_i^2$. ولأن وحدات التباين مربّعة نستعمل الانحراف المعياري $\\sigma=\\sqrt{\\sigma^2}$ بوحدات البيانات. وفي توزيعات كثيرة يقع نحو ثلثي البيانات في المجال $(\\bar{x}-\\sigma,\\ \\bar{x}+\\sigma)$. والوضع الإحصائي للآلة الحاسبة يعطي $\\sigma$ مباشرة (المفتاح $\\sigma_n$).'
        ),
        problem: say('30 partidatako golak: 0 → 6, 1 → 7, 2 → 8, 3 → 6, 4 → 2, 5 → 1. Kalkulatu $\\sigma^2$ eta $\\sigma$.', 'Goles en 30 partidos: 0 → 6, 1 → 7, 2 → 8, 3 → 6, 4 → 2, 5 → 1. Calcula $\\sigma^2$ y $\\sigma$.', 'الأهداف في 30 مباراة: 0 ← 6، 1 ← 7، 2 ← 8، 3 ← 6، 4 ← 2، 5 ← 1. احسب $\\sigma^2$ و$\\sigma$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batu zutabeak.', 'Suma las columnas.', 'اجمع العمودين.'), math: same('$\\sum f_i x_i=54\\qquad \\sum f_i x_i^2=150$') },
            { text: say('Batez bestekoa.', 'Media.', 'المتوسط.'), math: same('$\\bar{x}=\\frac{54}{30}=1{,}8$') },
            { text: say('Bariantza eta erroa.', 'Varianza y raíz.', 'التباين والجذر.'), math: same('$\\frac{150}{30}-1{,}8^{2}=1{,}76\\qquad \\sigma\\approx 1{,}33$') }
        ],
        example: same('$\\sqrt{1{,}76}\\approx 1{,}33$'),
        takeaway: say('σ² = karratuen batez bestekoa ken batez bestekoaren karratua; σ, haren erroa.', 'σ² = media de los cuadrados menos el cuadrado de la media; σ, su raíz.', 'σ² = متوسط المربعات ناقص مربع المتوسط؛ وσ جذره.'),
        figure: (language) => <GoalsVarianceFigure language={language} />
    },
    {
        id: 'cv',
        stage: 'spread',
        title: say('Aldakuntza-koefizientea', 'Coeficiente de variación', 'معامل الاختلاف'),
        goal: say('Batez besteko edo unitate desberdineko banaketen sakabanaketa aldakuntza-koefizientearekin konparatzea.', 'Comparar con el coeficiente de variación la dispersión de distribuciones con medias o unidades distintas.', 'مقارنة تشتت توزيعات ذات متوسطات أو وحدات مختلفة بمعامل الاختلاف.'),
        explanation: say(
            '$\\sigma$ batek ez du esaten ezer bere batez bestekoa ezagutu gabe: 2 kg-ko $\\sigma$ handia da jaioberrien pisuetan, eta txikia helduen pisuetan. Aldakuntza-koefizientea sakabanaketa erlatiboa da: $\\text{CV}=\\frac{\\sigma}{\\bar{x}}$, unitaterik gabea eta askotan ehunekotan. Bi banaketa konparatzeko, CV txikiena duena da homogeneoena (edo erregularrena). Unitate desberdinetako aldagaiak ere konpara daitezke, eta batez besteko oso desberdinak dituzten taldeak. Kontuz: batez bestekoa 0tik hurbil badago, CV-k ez du zentzurik.',
            'Una $\\sigma$ no dice nada sin conocer su media: una $\\sigma$ de 2 kg es grande en los pesos de recién nacidos y pequeña en los de adultos. El coeficiente de variación es la dispersión relativa: $\\text{CV}=\\frac{\\sigma}{\\bar{x}}$, sin unidades y muchas veces en porcentaje. Para comparar dos distribuciones, la de menor CV es la más homogénea (o regular). También se pueden comparar variables con unidades distintas, y grupos con medias muy diferentes. Cuidado: si la media está cerca de 0, el CV no tiene sentido.',
            '$\\sigma$ وحده لا يقول شيئًا دون معرفة المتوسط: $\\sigma$ قدره 2 كغ كبير في أوزان المواليد وصغير في أوزان البالغين. ومعامل الاختلاف هو التشتت النسبي: $\\text{CV}=\\frac{\\sigma}{\\bar{x}}$، بلا وحدات وكثيرًا ما يُعطى نسبة مئوية. ولمقارنة توزيعين يكون ذو CV الأصغر هو الأكثر تجانسًا (أو انتظامًا). ويمكن أيضًا مقارنة متغيرات بوحدات مختلفة، ومجموعات متوسطاتها مختلفة جدًا. انتبه: إذا كان المتوسط قريبًا من 0 فلا معنى لـCV.'
        ),
        problem: say('A enpresaren hileko gastuak: $\\bar{x}=100\\,000$ €, $\\sigma=12\\,500$ €. B-renak: $\\bar{x}=15\\,000$ €, $\\sigma=2\\,500$ €. Zeinek du sakabanaketa erlatibo handiagoa?', 'Gastos mensuales de la empresa A: $\\bar{x}=100\\,000$ €, $\\sigma=12\\,500$ €. Los de B: $\\bar{x}=15\\,000$ €, $\\sigma=2\\,500$ €. ¿Cuál tiene más dispersión relativa?', 'المصاريف الشهرية للشركة A: $\\bar{x}=100\\,000$ €، $\\sigma=12\\,500$ €. وللشركة B: $\\bar{x}=15\\,000$ €، $\\sigma=2\\,500$ €. أيهما تشتته النسبي أكبر؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('A enpresa.', 'Empresa A.', 'الشركة A.'), math: same('$\\frac{12\\,500}{100\\,000}=0{,}125$') },
            { text: say('B enpresa.', 'Empresa B.', 'الشركة B.'), math: same('$\\frac{2\\,500}{15\\,000}\\approx 0{,}167$') },
            { text: say('B-k: % 16,7 inguru, A-ren % 12,5en aurrean, nahiz eta haren $\\sigma$ txikiagoa izan.', 'B: un 16,7 % aproximadamente, frente al 12,5 % de A, aunque su $\\sigma$ sea menor.', 'B: نحو 16.7 % مقابل 12.5 % لـA، رغم أن $\\sigma$ لها أصغر.') }
        ],
        example: same('$\\frac{1{,}33}{1{,}8}\\approx 0{,}74$'),
        takeaway: say('CV = σ zati batez bestekoa: CV txikiagoa, banaketa homogeneoagoa.', 'CV = σ entre la media: menor CV, distribución más homogénea.', 'CV = σ على المتوسط: CV أصغر يعني توزيعًا أكثر تجانسًا.'),
        figure: (language) => <VariationFigure language={language} />
    },

    /* ---------- 5. Two variables ---------- */
    {
        id: 'scatter',
        stage: 'two',
        title: say('Puntu-hodeiak', 'Nubes de puntos', 'سحب النقاط'),
        goal: say('Banaketa bidimentsional bat puntu-hodei gisa irudikatzea eta erlazio funtzionala eta estatistikoa bereiztea.', 'Representar una distribución bidimensional como nube de puntos y distinguir la relación funcional de la estadística.', 'تمثيل توزيع ثنائي البعد سحابةَ نقاط، والتمييز بين العلاقة الدالية والإحصائية.'),
        explanation: say(
            'Banaketa bidimentsional batean, banako bakoitzari bi aldagai neurtzen zaizkio: $(x_i,y_i)$ bikoteak. Bikote bakoitza planoko puntu bat da, eta guztiek puntu-hodeia osatzen dute. Erlazio funtzionalean, $x$-k $y$ zehazki ematen du formula baten bidez (karratuaren aldea eta perimetroa, $y=4x$), eta puntuak lerro baten gainean daude. Erlazio estatistikoan, $x$-k $y$-ren joera adierazten du, ez balio zehatza: ikasketa-ordu gehiagok nota hobea dakar normalean. Hodeiak lerro zuzen baten itxura badu, korrelazio lineala dago; puntuak alde guztietan sakabanatuta badaude, ez dago erlaziorik. Bi aldagai erlazionatuta egon daitezke modu ez-linealean ere (hiperbola baten inguruan, adibidez).',
            'En una distribución bidimensional a cada individuo se le miden dos variables: las parejas $(x_i,y_i)$. Cada pareja es un punto del plano, y todos juntos forman la nube de puntos. En una relación funcional, $x$ da exactamente $y$ mediante una fórmula (el lado de un cuadrado y su perímetro, $y=4x$), y los puntos están sobre una línea. En una relación estadística, $x$ indica la tendencia de $y$, no su valor exacto: más horas de estudio suelen llevar a una nota mejor. Si la nube tiene forma de recta, hay correlación lineal; si los puntos están dispersos por todas partes, no hay relación. Dos variables pueden estar relacionadas también de forma no lineal (alrededor de una hipérbola, por ejemplo).',
            'في التوزيع ثنائي البعد يُقاس لكل فرد متغيران: الأزواج $(x_i,y_i)$. وكل زوج نقطة في المستوى، ومجموعها يكوّن سحابة النقاط. في العلاقة الدالية يعطي $x$ قيمة $y$ تمامًا بصيغة (ضلع المربع ومحيطه $y=4x$)، وتقع النقاط على خط. وفي العلاقة الإحصائية يدل $x$ على اتجاه $y$ لا على قيمته الدقيقة: ساعات دراسة أكثر تؤدي عادةً إلى علامة أفضل. إذا كان شكل السحابة مستقيمًا فهناك ارتباط خطي، وإذا كانت النقاط متشتتة في كل مكان فلا علاقة. وقد يرتبط متغيران أيضًا بشكل غير خطي (حول قطع زائد مثلًا).'
        ),
        problem: say('10 ikasleren asteko ikasketa-orduak eta nota: (1, 3), (2, 4), (2, 5), (3, 5), (4, 6), (5, 6), (5, 8), (6, 7), (7, 9), (8, 9). Zein erlazio dago?', 'Horas de estudio semanales y nota de 10 alumnos: (1, 3), (2, 4), (2, 5), (3, 5), (4, 6), (5, 6), (5, 8), (6, 7), (7, 9), (8, 9). ¿Qué relación hay?', 'ساعات الدراسة الأسبوعية وعلامة 10 تلاميذ: (1, 3)، (2, 4)، (2, 5)، (3, 5)، (4, 6)، (5, 6)، (5, 8)، (6, 7)، (7, 9)، (8, 9). ما العلاقة؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('$X$ ardatzean orduak; $Y$ ardatzean nota.', 'En el eje $X$, las horas; en el eje $Y$, la nota.', 'على المحور $X$ الساعات، وعلى المحور $Y$ العلامة.') },
            { text: say('5 orduko bi ikaslek nota desberdinak dituzte: ez da funtzionala.', 'Dos alumnos de 5 horas tienen notas distintas: no es funcional.', 'تلميذان بـ5 ساعات لهما علامتان مختلفتان: ليست دالية.'), math: same('$(5,\\ 6)\\qquad (5,\\ 8)$') },
            { text: say('Puntuak gorantz doan zuzen baten inguruan: estatistikoa eta lineala.', 'Los puntos, alrededor de una recta que sube: estadística y lineal.', 'النقاط حول مستقيم صاعد: إحصائية وخطية.') }
        ],
        example: same('$y=4x$'),
        takeaway: say('Funtzionala: puntuak lerroaren gainean. Estatistikoa: lerroaren inguruan.', 'Funcional: los puntos sobre la línea. Estadística: alrededor de la línea.', 'دالية: النقاط على الخط. إحصائية: حول الخط.'),
        figure: (language) => <ScatterFigure language={language} />
    },
    {
        id: 'correlation',
        stage: 'two',
        title: say('Korrelazioa eta r', 'Correlación y r', 'الارتباط وr'),
        goal: say('Korrelazioaren zeinua eta indarra epaitzea eta hodei bakoitzari bere korrelazio-koefizientea esleitzea.', 'Juzgar el signo y la fuerza de la correlación y asignar a cada nube su coeficiente de correlación.', 'الحكم على إشارة الارتباط وقوته، وإسناد معامل الارتباط المناسب لكل سحابة.'),
        explanation: say(
            'Korrelazioa positiboa da $x$ handitzean $y$ ere handitzen bada, eta negatiboa $y$ txikitzen bada. Sendoa da puntuak zuzenetik hurbil badaude, eta ahula urrun badaude. Korrelazio-koefizienteak, $r$, zenbaki batean laburtzen du: $-1\\le r\\le 1$. Zeinuak noranzkoa ematen du; $|r|$-k, indarra: $|r|=1$ funtzionala da (puntu guztiak zuzen batean), $|r|$ 1etik hurbil sendoa, 0,5 inguruan ahula, eta 0tik hurbil ez dago korrelazio linealik. Korrelazioak ez du kausalitatea frogatzen: bi aldagaiak hirugarren baten araberakoak izan daitezke (izozkiak eta erredurak, biak udaren ondorioz).',
            'La correlación es positiva si al aumentar $x$ también aumenta $y$, y negativa si $y$ disminuye. Es fuerte si los puntos están cerca de la recta, y débil si están lejos. El coeficiente de correlación, $r$, lo resume en un número: $-1\\le r\\le 1$. El signo da el sentido; $|r|$, la fuerza: $|r|=1$ es funcional (todos los puntos en una recta), $|r|$ cerca de 1 es fuerte, alrededor de 0,5 débil, y cerca de 0 no hay correlación lineal. La correlación no prueba la causalidad: las dos variables pueden depender de una tercera (los helados y las quemaduras, ambos por el verano).',
            'يكون الارتباط موجبًا إذا ازداد $y$ عندما يزداد $x$، وسالبًا إذا نقص $y$. ويكون قويًا إذا كانت النقاط قريبة من المستقيم، وضعيفًا إذا كانت بعيدة. ومعامل الارتباط $r$ يلخّص ذلك في عدد: $-1\\le r\\le 1$. الإشارة تعطي الاتجاه و$|r|$ القوة: $|r|=1$ دالية (كل النقاط على مستقيم)، و$|r|$ القريب من 1 قوي، وحول 0.5 ضعيف، وقرب 0 لا ارتباط خطي. والارتباط لا يثبت السببية: قد يتعلق المتغيران بمتغير ثالث (المثلّجات والحروق الشمسية، كلاهما بسبب الصيف).'
        ),
        stepsKind: 'facts',
        steps: [
            { title: say('Positiboa eta sendoa', 'Positiva y fuerte', 'موجب وقوي'), text: say('Hodei estua gorantz.', 'Nube estrecha que sube.', 'سحابة ضيقة صاعدة.'), math: same('$r\\approx 0{,}98$') },
            { title: say('Negatiboa eta sendoa', 'Negativa y fuerte', 'سالب وقوي'), text: say('Hodei estua beherantz.', 'Nube estrecha que baja.', 'سحابة ضيقة هابطة.'), math: same('$r\\approx -0{,}98$') },
            { title: say('Ahula edo nulua', 'Débil o nula', 'ضعيف أو منعدم'), text: say('Hodei zabala gorantz, edo biribila.', 'Nube ancha que sube, o redonda.', 'سحابة عريضة صاعدة، أو مستديرة.'), math: same('$r\\approx 0{,}59\\qquad r\\approx 0{,}06$') }
        ],
        example: same('$-1\\le r\\le 1$'),
        takeaway: say('Zeinua: noranzkoa. |r|: indarra. Korrelazioa ez da kausa.', 'Signo: sentido. |r|: fuerza. Correlación no es causa.', 'الإشارة: الاتجاه. |r|: القوة. الارتباط ليس سببًا.'),
        figure: (language) => <CorrelationFigure language={language} />
    },
    {
        id: 'regression',
        stage: 'two',
        title: say('Erregresio-zuzena', 'Recta de regresión', 'مستقيم الانحدار'),
        goal: say('Erregresio-zuzena batez bestekoen puntutik idaztea, estimazioak egitea eta haien fidagarritasuna epaitzea.', 'Escribir la recta de regresión desde el punto de las medias, hacer estimaciones y juzgar su fiabilidad.', 'كتابة مستقيم الانحدار من نقطة المتوسطين، وإجراء تقديرات والحكم على موثوقيتها.'),
        explanation: say(
            'Erregresio-zuzena hodeiari hobekien egokitzen zaion zuzena da, eta beti batez bestekoen puntutik pasatzen da, $(\\bar{x},\\bar{y})$. Haren malda $m$ ezagututa (kalkulagailuak ematen du), puntu-malda ekuazioa idazten da: $\\hat{y}-\\bar{y}=m\\,(x-\\bar{x})$. Maldaren zeinua eta $r$-rena bat datoz. $x$ balio baterako $y$ estimatzeko, ordezkatu $x$ zuzenean. Estimazioa fidagarria da korrelazioa sendoa denean ($|r|$ 1etik hurbil) eta $x$ datuen tartearen barruan dagoenean; tartetik kanpo (estrapolazioa) joera aldatu daiteke. Korrelazio ahularekin, estimazioa oso zehaztugabea da.',
            'La recta de regresión es la recta que mejor se ajusta a la nube, y siempre pasa por el punto de las medias, $(\\bar{x},\\bar{y})$. Conociendo su pendiente $m$ (la da la calculadora), se escribe la ecuación punto-pendiente: $\\hat{y}-\\bar{y}=m\\,(x-\\bar{x})$. El signo de la pendiente y el de $r$ coinciden. Para estimar $y$ para un valor de $x$, se sustituye $x$ en la recta. La estimación es fiable cuando la correlación es fuerte ($|r|$ cerca de 1) y $x$ está dentro del intervalo de los datos; fuera del intervalo (extrapolación) la tendencia puede cambiar. Con correlación débil, la estimación es muy imprecisa.',
            'مستقيم الانحدار هو المستقيم الأكثر ملاءمة للسحابة، ويمرّ دائمًا بنقطة المتوسطين $(\\bar{x},\\bar{y})$. وبمعرفة ميله $m$ (تعطيه الآلة الحاسبة) نكتب معادلة النقطة والميل: $\\hat{y}-\\bar{y}=m\\,(x-\\bar{x})$. وإشارة الميل وإشارة $r$ متطابقتان. ولتقدير $y$ لقيمة من $x$ نعوّض $x$ في المستقيم. ويكون التقدير موثوقًا عندما يكون الارتباط قويًا ($|r|$ قريب من 1) و$x$ داخل مجال البيانات؛ وخارج المجال (الاستقراء الخارجي) قد يتغيّر الاتجاه. ومع ارتباط ضعيف يكون التقدير غير دقيق إطلاقًا.'
        ),
        problem: say('8 egunetan, eguzki-orduen batez bestekoa $\\bar{x}=6$ da eta tenperatura maximoarena $\\bar{y}=11$ °C. Erregresio-zuzenaren malda 0,5 da. Idatzi zuzena eta estimatu tenperatura 9 eguzki-ordurekin.', 'En 8 días, la media de las horas de sol es $\\bar{x}=6$ y la de la temperatura máxima, $\\bar{y}=11$ °C. La pendiente de la recta de regresión es 0,5. Escribe la recta y estima la temperatura con 9 horas de sol.', 'في 8 أيام، متوسط ساعات الشمس $\\bar{x}=6$ ومتوسط الحرارة القصوى $\\bar{y}=11$ °C. ميل مستقيم الانحدار 0.5. اكتب المستقيم وقدّر الحرارة مع 9 ساعات شمس.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batez bestekoen puntutik.', 'Por el punto de las medias.', 'من نقطة المتوسطين.'), math: same('$\\hat{y}-11=0{,}5\\,(x-6)$') },
            { text: say('Askatu $\\hat{y}$.', 'Despeja $\\hat{y}$.', 'اعزل $\\hat{y}$.'), math: same('$\\hat{y}=0{,}5x+8$') },
            { text: say('Ordeztu $x=9$: datuen tartean, fidagarria.', 'Sustituye $x=9$: dentro del intervalo, fiable.', 'عوّض $x=9$: داخل المجال، موثوق.'), math: same('$0{,}5\\cdot 9+8=12{,}5$') }
        ],
        example: same('$0{,}5\\cdot 6+8=11$'),
        takeaway: say('Zuzena (x̄, ȳ) puntutik pasatzen da; estimatu korrelazio sendoarekin eta datuen tartearen barruan.', 'La recta pasa por (x̄, ȳ); estima con correlación fuerte y dentro del intervalo de datos.', 'المستقيم يمرّ بـ(x̄, ȳ)؛ قدّر مع ارتباط قوي وداخل مجال البيانات.'),
        figure: (language) => <RegressionFigure language={language} />
    }
]
