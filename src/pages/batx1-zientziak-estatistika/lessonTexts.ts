import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { BachStatsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Estatistika unidimentsionala · Batxilergoa 1 · Zientziak — what each
   lesson tells: the new words (definitions), a short explanation, the
   example as an exercise («Another example»), the key words in four
   languages and, in five lessons, «Why does it work?». Plain data so the
   tests can import it; lessons.tsx merges it into the topics. The example
   uses numbers of its own, never those of «Let's solve», of «Check it» or
   of the typical mistake. Rounded results go with ≈ and as many decimals
   as they are rounded to. A formula that starts with z is written {z}, so
   the Basque suffix test does not read it as a glued «-z».
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const bachStatsLessonTexts: Record<BachStatsTopicId, LessonTexts> = {
    /* ---------- 1. Data and tables ---------- */
    'population-sample': {
        definitions: [
            { term: say('Populazioa', 'Población', 'المجتمع', 'Population'), meaning: say('Zerbait aztertu nahi den banako guztiak.', 'Todos los individuos sobre los que se quiere estudiar algo.', 'كل الأفراد الذين نريد دراسة شيء عنهم.', 'All the individuals you want to study something about.') },
            { term: say('Lagina', 'Muestra', 'العيّنة', 'Sample'), meaning: say('Populazioaren zati bat, hura ordezkatzeko aukeratua; neurtzen dena.', 'Una parte de la población, elegida para que la represente, que es la que se mide.', 'جزء من المجتمع يُختار ليمثّله، وهو الذي يُقاس.', 'A part of the population, chosen to represent it, which is the part that is measured.') }
        ],
        vocabulary: [
            say('kualitatiboa', 'cualitativa', 'نوعي', 'qualitative'),
            say('diskretua', 'discreta', 'منفصل', 'discrete'),
            say('jarraitua', 'continua', 'متصل', 'continuous')
        ],
        explanation: say(
            'Azterketa estatistiko batek populazio bateko aldagai bat neurtzen du. Populazioa oso handia denean, edo neurtzea garestia denean, lagin bat aztertzen da, eta ordezkagarria izan behar du. Aldagaia kualitatiboa da ezaugarriak hartzen baditu, eta kuantitatiboa zenbakiak hartzen baditu: diskretua balio solteak badira, jarraitua tarte bateko edozein balio har badezake.',
            'Un estudio estadístico mide una variable en una población. Cuando la población es muy grande, o medirla es caro, se estudia una muestra, que tiene que ser representativa. La variable es cualitativa si toma cualidades, y cuantitativa si toma números: discreta si son valores sueltos, continua si puede valer cualquier número de un intervalo.',
            'تقيس الدراسة الإحصائية متغيرًا في مجتمع. وعندما يكون المجتمع كبيرًا جدًّا أو يكون قياسه مكلفًا ندرس عيّنة، ويجب أن تكون ممثِّلة. ويكون المتغير نوعيًّا إذا أخذ صفات، وكميًّا إذا أخذ أعدادًا: منفصلًا إذا كانت قيمًا متفرقة، ومتصلًا إذا أمكن أن يأخذ أي عدد من مجال.',
            'A statistical study measures a variable in a population. When the population is very large, or measuring it is expensive, you study a sample, which has to be representative. The variable is qualitative if it takes qualities, and quantitative if it takes numbers: discrete if they are separate values, continuous if it can take any number in an interval.'
        ),
        examplePrompt: say('Nolakoa da aldagai bakoitza: anai-arreba kopurua, odol-taldea eta altuera?', '¿De qué tipo es cada variable: el número de hermanos, el grupo sanguíneo y la estatura?', 'ما نوع كل متغير: عدد الإخوة، وفصيلة الدم، والطول؟', 'What type is each variable: the number of siblings, the blood group and height?'),
        example: '',
        exampleAnswer: say('Anai-arreba kopurua: kuantitatibo diskretua. Odol-taldea: kualitatiboa. Altuera: kuantitatibo jarraitua.', 'Número de hermanos: cuantitativa discreta. Grupo sanguíneo: cualitativa. Estatura: cuantitativa continua.', 'عدد الإخوة: كمي منفصل. فصيلة الدم: نوعي. الطول: كمي متصل.', 'Number of siblings: discrete quantitative. Blood group: qualitative. Height: continuous quantitative.')
    },
    'frequency-tables': {
        definitions: [
            { term: say('Maiztasun erlatiboa', 'Frecuencia relativa', 'التكرار النسبي', 'Relative frequency'), meaning: say('Balio batek osotik hartzen duen zatia: $h_i=\\frac{f_i}{N}$; 100 bider eginda, ehuneko bat da.', 'La parte del total que tiene un valor: $h_i=\\frac{f_i}{N}$; multiplicada por 100, es un porcentaje.', 'الجزء الذي تأخذه قيمة من الكل: $h_i=\\frac{f_i}{N}$؛ وإذا ضُرب في 100 صار نسبة مئوية.', 'The part of the total that has a value: $h_i=\\frac{f_i}{N}$; multiplied by 100, it is a percentage.') },
            { term: say('Maiztasun metatua', 'Frecuencia acumulada', 'التكرار المتجمّع', 'Cumulative frequency'), meaning: say('Zenbat datu diren balio bat baino txikiagoak edo berdinak: $F_i$, eta erlatiboan, $H_i$.', 'Cuántos datos son menores o iguales que un valor: $F_i$, y en relativa, $H_i$.', 'عدد البيانات الأصغر من قيمة أو المساوية لها: $F_i$، وبالنسبي $H_i$.', 'How many data are less than or equal to a value: $F_i$, and as a relative frequency, $H_i$.') }
        ],
        vocabulary: [
            say('ehunekoa', 'porcentaje', 'النسبة المئوية', 'percentage'),
            say('taula', 'tabla', 'الجدول', 'table')
        ],
        explanation: say(
            'Maiztasun absolutuak, $f_i$, balio bakoitza zenbat aldiz agertzen den zenbatzen du, eta erlatiboak, $h_i$, osotik zer zati den. Metatuek aurreko guztiak batzen dituzte: $F_i$ zenbakiak balio horretaraino zenbat datu dauden esaten du, eta $H_i$ zenbakiak, zer zati. $H_i$ ehunekotan emanda, «zer ehunekok du gehienez bi?» bezalako galderei erantzuten zaie.',
            'La frecuencia absoluta $f_i$ cuenta cuántas veces sale cada valor, y la relativa $h_i$ dice qué parte del total es. Las acumuladas suman todas las anteriores: $F_i$ da cuántos datos hay hasta ese valor, y $H_i$, qué parte. Con $H_i$ en porcentaje se responde a preguntas como «¿qué porcentaje tiene como mucho dos?».',
            'يعدّ التكرار المطلق $f_i$ كم مرة تظهر كل قيمة، ويقول التكرار النسبي $h_i$ ما الجزء من الكل. والمتجمّعة تجمع كل ما قبلها: $F_i$ يعطي عدد البيانات حتى تلك القيمة، و$H_i$ الجزء. وبكتابة $H_i$ نسبة مئوية نجيب عن أسئلة مثل «ما النسبة التي لديها اثنان على الأكثر؟».',
            'The absolute frequency $f_i$ counts how many times each value appears, and the relative one $h_i$ says what part of the total it is. Cumulative frequencies add up all the earlier ones: $F_i$ gives how many data there are up to that value, and $H_i$, what part. With $H_i$ as a percentage you answer questions like «what percentage has at most two?».'
        ),
        examplePrompt: say('25 ikasle: liburu 1, 4 ikasle; 2 liburu, 10; 3 liburu, 8; 4 liburu, 3. Zer zatik irakurtzen ditu 2 liburu gehienez?', 'Con 25 alumnos: 1 libro, 4 alumnos; 2 libros, 10; 3 libros, 8; 4 libros, 3. ¿Qué parte lee como mucho 2 libros?', 'مع 25 طالبًا: كتاب واحد لـ 4 طلاب، وكتابان لـ 10، و3 كتب لـ 8، و4 كتب لـ 3. ما الجزء الذي يقرأ كتابين على الأكثر؟', 'With 25 students: 1 book, 4 students; 2 books, 10; 3 books, 8; 4 books, 3. What part reads at most 2 books?'),
        example: same('$H_2=\\frac{4+10}{25}=\\frac{14}{25}=0{,}56$'),
        exampleAnswer: say('Ikasleen % 56.', 'El 56 % de los alumnos.', '56٪ من الطلاب.', '56% of the students.')
    },
    'class-intervals': {
        definitions: [
            { term: say('Zabalera', 'Amplitud', 'طول الفئة', 'Width'), meaning: say('Tarte bakoitzaren luzera: $b-a$, $[a,b)$ tartean.', 'La longitud de cada intervalo: $b-a$ en $[a,b)$.', 'طول كل فئة: $b-a$ في $[a,b)$.', 'The length of each interval: $b-a$ in $[a,b)$.') },
            { term: say('Klase-marka', 'Marca de clase', 'مركز الفئة', 'Class mark'), meaning: say('Tartearen erdiko puntua; tarteko datu guztien ordezkaria da.', 'El punto medio del intervalo, que representa a todos sus datos.', 'منتصف الفئة، وهو يمثّل كل بياناتها.', 'The midpoint of the interval, which stands for all its data.') }
        ],
        vocabulary: [
            say('ibiltartea', 'recorrido', 'المدى', 'range'),
            say('tartea', 'intervalo', 'الفئة', 'interval')
        ],
        explanation: say(
            'Datu desberdin askorekin, balioz balioko taula bat ez da ondo irakurtzen: $[a,b)$ tarteetan multzokatzen dira, ezkerretik itxiak eta eskuinetik irekiak. Arau praktiko bat $\\sqrt{N}$ tarte inguru egitea da. Zabalera ibiltartea —datu handiena ken txikiena— tarte kopuruaz zatituta ateratzen da, eta gorantz biribiltzen da, denak sar daitezen.',
            'Con muchos datos distintos, una tabla valor a valor no se lee bien: se agrupan en intervalos $[a,b)$, cerrados por la izquierda y abiertos por la derecha. Se suelen hacer unos $\\sqrt{N}$. La amplitud sale de dividir el recorrido, el mayor dato menos el menor, entre el número de intervalos, redondeando hacia arriba para que quepan todos.',
            'مع بيانات كثيرة مختلفة لا يُقرأ جدول قيمة بقيمة جيدًا: فنجمعها في فئات $[a,b)$ مغلقة من اليسار ومفتوحة من اليمين. وقاعدة عملية أن نصنع نحو $\\sqrt{N}$ فئة. ويخرج الطول بقسمة المدى، أي أكبر بيان ناقص أصغره، على عدد الفئات، ويُقرّب إلى الأعلى لتتسع لكل البيانات.',
            'With many different data, a value-by-value table is hard to read: they are grouped into intervals $[a,b)$, closed on the left and open on the right. A practical rule is to make about $\\sqrt{N}$ intervals. The width comes from dividing the range, the largest datum minus the smallest, by the number of intervals, rounded up so that they all fit.'
        ),
        examplePrompt: say('90 datu daude, 3 eta 50 artean. Zenbat tarte, eta zein zabalerakoak?', 'Se tienen 90 datos entre 3 y 50. ¿Cuántos intervalos y de qué amplitud?', 'لدينا 90 بيانًا بين 3 و50. كم فئة، وما طولها؟', 'You have 90 data between 3 and 50. How many intervals, and how wide?'),
        example: same('$\\sqrt{90}\\approx 9{,}5\\ \\to\\ 9\\qquad\\frac{50-3}{9}\\approx 5{,}2\\ \\to\\ 6$'),
        exampleAnswer: say('6 zabalerako 9 tarte, 3 zenbakitik hasita: $[3,9),\\ [9,15),\\ \\ldots,\\ [51,57)$.', '9 intervalos de amplitud 6, desde el 3: $[3,9),\\ [9,15),\\ \\ldots,\\ [51,57)$.', '9 فئات طولها 6 بدءًا من 3: $[3,9),\\ [9,15),\\ \\ldots,\\ [51,57)$.', '9 intervals of width 6, starting at 3: $[3,9),\\ [9,15),\\ \\ldots,\\ [51,57)$.')
    },
    charts: {
        definitions: [
            { term: say('Histograma', 'Histograma', 'المدرّج التكراري', 'Histogram'), meaning: say('Tarteen gaineko barra itsatsiak; zabalera berdinekin, altuera maiztasuna da.', 'Barras pegadas sobre los intervalos; con amplitudes iguales, la altura es la frecuencia.', 'أعمدة متلاصقة فوق الفئات؛ ومع أطوال متساوية يكون الارتفاع هو التكرار.', 'Bars side by side over the intervals; with equal widths, the height is the frequency.') },
            { term: say('Biztanleria-piramidea', 'Pirámide de población', 'الهرم السكاني', 'Population pyramid'), meaning: say('Bi histograma horizontal, gizonak alde batean eta emakumeak bestean, adinak behetik gora.', 'Dos histogramas horizontales, hombres a un lado y mujeres al otro, con las edades de abajo arriba.', 'مدرّجان أفقيان، الرجال في جانب والنساء في الآخر، والأعمار من الأسفل إلى الأعلى.', 'Two horizontal histograms, men on one side and women on the other, with ages from the bottom up.') }
        ],
        vocabulary: [
            say('sektore-diagrama', 'diagrama de sectores', 'المخطط الدائري', 'pie chart'),
            say('barrak', 'barras', 'الأعمدة', 'bars'),
            say('angelua', 'ángulo', 'الزاوية', 'angle')
        ],
        explanation: say(
            'Grafiko bakoitza aldagai mota baterako da. Barrak, kualitatibo eta diskretuetarako; histograma, tarteetako datuetarako; maiztasun-poligonoak barren goialdeko erdiko puntuak lotzen ditu. Sektore-diagramak osoko bat banatzen du: sektore bakoitzak $h_i\\cdot 360^\\circ$ neurtzen du. Biztanleria-piramide batek bi talde konparatzen ditu aldi berean.',
            'Cada gráfico sirve para un tipo de variable. Las barras, para cualitativas y discretas; el histograma, para datos en intervalos; el polígono de frecuencias une los puntos medios de lo alto de las barras. El diagrama de sectores reparte un total: cada sector mide $h_i\\cdot 360^\\circ$. Una pirámide de población compara dos grupos a la vez.',
            'لكل رسم نوع متغير. الأعمدة للنوعية والمنفصلة، والمدرّج التكراري للبيانات المبوّبة، ومضلّع التكرارات يصل منتصفات رؤوس الأعمدة. والمخطط الدائري يوزّع كلًّا: كل قطاع قياسه $h_i\\cdot 360^\\circ$. والهرم السكاني يقارن مجموعتين معًا.',
            'Each chart is for one type of variable. Bars, for qualitative and discrete ones; the histogram, for data in intervals; the frequency polygon joins the midpoints of the tops of the bars. A pie chart shares out a total: each sector measures $h_i\\cdot 360^\\circ$. A population pyramid compares two groups at once.'
        ),
        examplePrompt: say('$72^\\circ$ angeluko sektore batean 18 pertsona daude. Zenbat pertsona daude guztira?', 'En un sector de $72^\\circ$ hay 18 personas. ¿Cuántas personas hay en total?', 'في قطاع زاويته $72^\\circ$ يوجد 18 شخصًا. كم شخصًا في المجموع؟', 'A sector of $72^\\circ$ holds 18 people. How many people are there in all?'),
        example: same('$h=\\frac{72}{360}=0{,}2\\qquad N=\\frac{18}{0{,}2}=90$'),
        exampleAnswer: say('90 pertsona.', '90 personas.', '90 شخصًا.', '90 people.')
    },

    /* ---------- 2. Measures of centre ---------- */
    'centre-measures': {
        definitions: [
            { term: say('Mediana', 'Mediana', 'الوسيط', 'Median'), meaning: say('Ordenatutako datuen erdiko balioa: erdiak txikiagoak edo berdinak dira, eta beste erdiak, handiagoak edo berdinak.', 'El valor central de los datos ordenados: la mitad son menores o iguales y la otra mitad, mayores o iguales.', 'القيمة الوسطى للبيانات المرتبة: نصفها أصغر أو مساوٍ ونصفها الآخر أكبر أو مساوٍ.', 'The middle value of the ordered data: half are less than or equal to it and the other half, greater than or equal.') }
        ],
        vocabulary: [
            say('batez bestekoa', 'media', 'المتوسط', 'mean'),
            say('moda', 'moda', 'المنوال', 'mode'),
            say('metatua', 'acumulada', 'المتجمّع', 'cumulative')
        ],
        explanation: say(
            'Batez bestekoa zati berdinetako banaketa da: taula batekin, $\\bar{x}=\\frac{\\sum f_i x_i}{N}$. Medianarako, datuak ordenatu eta erdikoa hartzen da; $N$ bikoitia bada, erdiko bien batez bestekoa. Taula batean, maiztasun metatuekin bilatzen da. Moda maiztasun handieneko balioa da, eta bat baino gehiago egon daitezke.',
            'La media es el reparto a partes iguales: con una tabla, $\\bar{x}=\\frac{\\sum f_i x_i}{N}$. Para la mediana se ordenan los datos y se toma el central; si $N$ es par, la media de los dos centrales. En una tabla se busca con las frecuencias acumuladas. La moda es el valor de mayor frecuencia, y puede haber más de una.',
            'المتوسط توزيع بالتساوي: مع جدول $\\bar{x}=\\frac{\\sum f_i x_i}{N}$. وللوسيط نرتب البيانات ونأخذ الأوسط؛ وإذا كان $N$ زوجيًّا فمتوسط الأوسطين. وفي الجدول نبحث عنه بالتكرارات المتجمّعة. والمنوال القيمة الأكثر تكرارًا، وقد يكون أكثر من واحد.',
            'The mean is sharing out equally: with a table, $\\bar{x}=\\frac{\\sum f_i x_i}{N}$. For the median, order the data and take the middle one; if $N$ is even, the mean of the two middle ones. In a table you find it with the cumulative frequencies. The mode is the value with the highest frequency, and there can be more than one.'
        ),
        examplePrompt: say('Aurkitu 3, 8, 5, 6, 9, 5 datuen batez bestekoa eta mediana.', 'Halla la media y la mediana de 3, 8, 5, 6, 9, 5.', 'أوجد متوسط ووسيط 3، 8، 5، 6، 9، 5.', 'Find the mean and the median of 3, 8, 5, 6, 9, 5.'),
        example: same('$\\bar{x}=\\frac{36}{6}=6\\qquad Me=\\frac{5+6}{2}=5{,}5$'),
        exampleAnswer: say('Batez bestekoa 6, mediana 5,5 eta moda 5.', 'Media 6, mediana 5,5 y moda 5.', 'المتوسط 6 والوسيط 5.5 والمنوال 5.', 'Mean 6, median 5.5 and mode 5.')
    },
    'grouped-centre': {
        vocabulary: [
            say('klase-marka', 'marca de clase', 'مركز الفئة', 'class mark'),
            say('tarte modala', 'intervalo modal', 'الفئة المنوالية', 'modal interval'),
            say('tarte mediana', 'intervalo mediano', 'الفئة الوسيطية', 'median interval')
        ],
        explanation: say(
            'Tarteak bakarrik ezagutzen badira, datu bakoitza bere tartearen klase-markan dagoela onartzen da. Orduan, batez bestekoa taula batekin bezala kalkulatzen da, markekin, eta emaitza hurbilketa bat da. Tarte modala maiztasun handienekoa da, eta tarte mediana, maiztasun metatuak $\\frac{N}{2}$ gainditzen duen lehena.',
            'Si solo se conocen los intervalos, se supone que cada dato está en la marca de clase de su intervalo. Entonces la media se calcula como con una tabla, con las marcas, y el resultado es aproximado. El intervalo modal es el de mayor frecuencia y el intervalo mediano, el primero cuya frecuencia acumulada pasa de $\\frac{N}{2}$.',
            'إذا لم نعرف إلا الفئات نفترض أن كل بيان عند مركز فئته. فيُحسب المتوسط كما مع الجدول بالمراكز، والنتيجة تقريبية. والفئة المنوالية هي الأكثر تكرارًا، والفئة الوسيطية أول فئة يتجاوز تكرارها المتجمّع $\\frac{N}{2}$.',
            'If only the intervals are known, each datum is taken to sit at the class mark of its interval. Then the mean is worked out as with a table, using the marks, and the result is approximate. The modal interval is the one with the highest frequency, and the median interval is the first whose cumulative frequency goes past $\\frac{N}{2}$.'
        ),
        examplePrompt: say('25 kutxaren pisuak (kg): $[0,4)$ 5, $[4,8)$ 12, $[8,12)$ 8. Kalkulatu batez bestekoa.', 'Pesos de 25 cajas (kg): $[0,4)$ 5, $[4,8)$ 12, $[8,12)$ 8. Calcula la media.', 'أوزان 25 صندوقًا (كغ): $[0,4)$ 5، $[4,8)$ 12، $[8,12)$ 8. احسب المتوسط.', 'Weights of 25 boxes (kg): $[0,4)$ 5, $[4,8)$ 12, $[8,12)$ 8. Work out the mean.'),
        example: same('$\\bar{x}=\\frac{5\\cdot 2+12\\cdot 6+8\\cdot 10}{25}=\\frac{162}{25}=6{,}48$'),
        exampleAnswer: say('6,48 kg inguru; tarte modala $[4,8)$ da.', 'Unos 6,48 kg; el intervalo modal es $[4,8)$.', 'نحو 6.48 كغ؛ والفئة المنوالية $[4,8)$.', 'About 6.48 kg; the modal interval is $[4,8)$.')
    },
    'missing-datum': {
        vocabulary: [
            say('batura', 'suma', 'المجموع', 'sum'),
            say('sistema', 'sistema', 'النظام', 'system'),
            say('maiztasuna', 'frecuencia', 'التكرار', 'frequency')
        ],
        explanation: say(
            'Batez bestekoa ezagutzen bada, datu guztien batura ezagutzen da: $\\sum f_i x_i=N\\cdot\\bar{x}$. Datu bat falta bada, berdintza hori ezezagun bateko ekuazio bat da. Bi maiztasun falta badira, beste ekuazio bat behar da, datu kopuruarena, $\\sum f_i=N$, eta bi ekuazioko sistema bat geratzen da.',
            'Si se conoce la media, se conoce la suma de todos los datos: $\\sum f_i x_i=N\\cdot\\bar{x}$. Con un dato que falta, esa igualdad es una ecuación con una incógnita. Si faltan dos frecuencias, hace falta otra ecuación, la del número de datos, $\\sum f_i=N$, y queda un sistema de dos ecuaciones.',
            'إذا عرفنا المتوسط عرفنا مجموع كل البيانات: $\\sum f_i x_i=N\\cdot\\bar{x}$. ومع بيان ناقص تكون هذه المساواة معادلة بمجهول واحد. وإذا نقص تكراران احتجنا إلى معادلة أخرى هي عدد البيانات $\\sum f_i=N$، فيبقى نظام من معادلتين.',
            'If you know the mean, you know the sum of all the data: $\\sum f_i x_i=N\\cdot\\bar{x}$. With one missing value, that equality is an equation in one unknown. If two frequencies are missing, you need another equation, the number of data, $\\sum f_i=N$, and you get a system of two equations.'
        ),
        examplePrompt: say('Ikasle baten notak 6, 7, 5 eta 8 dira. Zer nota behar du bosgarren azterketan batez bestekoa 7 izateko?', 'Una alumna tiene de notas 6, 7, 5 y 8. ¿Qué nota necesita en el quinto examen para tener de media 7?', 'علامات طالبة 6 و7 و5 و8. ما العلامة التي تحتاجها في الامتحان الخامس ليصير متوسطها 7؟', 'A student has marks of 6, 7, 5 and 8. What mark does she need in the fifth exam to have a mean of 7?'),
        example: same('$5\\cdot 7=35\\qquad 35-26=9$'),
        exampleAnswer: say('9 bat.', 'Un 9.', 'علامة 9.', 'A 9.'),
        why: {
            text: say(
                'Zergatik ematen du batez bestekoak batura? $\\bar{x}=\\frac{\\sum f_i x_i}{N}$ bada, $N$ zenbakiaz biderkatuta $\\sum f_i x_i=N\\cdot\\bar{x}$ lortzen da. Banatzea bezala da: 4 lagunek batez beste 6 € badituzte, guztien artean 24 € dituzte.',
                '¿Por qué la media da la suma? Si $\\bar{x}=\\frac{\\sum f_i x_i}{N}$, multiplicando por $N$ se obtiene $\\sum f_i x_i=N\\cdot\\bar{x}$. Es como repartir: si 4 amigos tienen de media 6 €, entre todos tienen 24 €.',
                'لماذا يعطي المتوسط المجموع؟ إذا كان $\\bar{x}=\\frac{\\sum f_i x_i}{N}$ فبالضرب في $N$ نحصل على $\\sum f_i x_i=N\\cdot\\bar{x}$. إنه كالتوزيع: إذا كان مع 4 أصدقاء 6 € في المتوسط فمعهم معًا 24 €.',
                'Why does the mean give the sum? If $\\bar{x}=\\frac{\\sum f_i x_i}{N}$, multiplying by $N$ gives $\\sum f_i x_i=N\\cdot\\bar{x}$. It is like sharing out: if 4 friends have €6 on average, together they have €24.'
            ),
            math: same('$4\\cdot 6=24$')
        }
    },

    /* ---------- 3. Measures of position ---------- */
    'quartiles-percentiles': {
        definitions: [
            { term: say('Pertzentila', 'Percentil', 'المئين', 'Percentile'), meaning: say('$P_k$ balioa: 100 datutik $k$ azpian uzten dituena.', 'El valor $P_k$ que deja por debajo $k$ de cada 100 datos.', 'القيمة $P_k$ التي تترك تحتها $k$ من كل 100 بيان.', 'The value $P_k$ that leaves $k$ out of every 100 data below it.') }
        ],
        vocabulary: [
            say('kuartila', 'cuartil', 'الربيعي', 'quartile'),
            say('posizioa', 'posición', 'الموضع', 'position')
        ],
        explanation: say(
            'Kuartilek ordenatutako datuak lau zati berdinetan banatzen dituzte, eta pertzentilek, ehunetan. $P_k$ pertzentilerako, $N\\cdot\\frac{k}{100}$ posizioa kalkulatu eta maiztasun metatuetan bilatzen da. Posizioa osoa ez bada, $P_k$ hurrengo datua da; osoa bada, datu horren eta hurrengoaren batez bestekoa. Datu multzokatuetan tartearen marka ematen da.',
            'Los cuartiles parten los datos ordenados en cuatro partes iguales y los percentiles, en cien. Para $P_k$ se calcula la posición $N\\cdot\\frac{k}{100}$ y se busca en las frecuencias acumuladas. Si la posición no es entera, $P_k$ es el dato siguiente; si es entera, la media de ese dato y el siguiente. En datos agrupados se da la marca del intervalo.',
            'تقسم الربيعيات البيانات المرتبة إلى أربعة أجزاء متساوية، والمئينات إلى مئة. ولـ $P_k$ نحسب الموضع $N\\cdot\\frac{k}{100}$ ونبحث عنه في التكرارات المتجمّعة. وإن لم يكن الموضع صحيحًا فـ $P_k$ هو البيان التالي؛ وإن كان صحيحًا فمتوسط ذلك البيان والذي يليه. وفي البيانات المبوّبة نعطي مركز الفئة.',
            'Quartiles split the ordered data into four equal parts, and percentiles into a hundred. For $P_k$ you work out the position $N\\cdot\\frac{k}{100}$ and look for it in the cumulative frequencies. If the position is not whole, $P_k$ is the next datum; if it is whole, the mean of that datum and the next. For grouped data you give the class mark.'
        ),
        examplePrompt: say('20 datu daude, eta 1, 2, 3, 4, 5 balioen metatuak 3, 8, 14, 18, 20 dira. Aurkitu $P_{30}$.', 'Hay 20 datos y las acumuladas de los valores 1, 2, 3, 4, 5 son 3, 8, 14, 18, 20. Halla $P_{30}$.', 'هناك 20 بيانًا، والمتجمّعة للقيم 1، 2، 3، 4، 5 هي 3، 8، 14، 18، 20. أوجد $P_{30}$.', 'There are 20 data and the cumulative frequencies of the values 1, 2, 3, 4, 5 are 3, 8, 14, 18, 20. Find $P_{30}$.'),
        example: same('$20\\cdot 0{,}3=6\\ \\to\\ P_{30}=\\frac{2+2}{2}=2$'),
        exampleAnswer: say('6 posizioa osoa da: 6. eta 7. datuek 2 balio dute; beraz, $P_{30}=2$.', 'La posición 6 es entera: los datos 6.º y 7.º valen 2, así que $P_{30}=2$.', 'الموضع 6 صحيح: البيانان السادس والسابع قيمتهما 2، إذن $P_{30}=2$.', 'Position 6 is whole: the 6th and 7th data are 2, so $P_{30}=2$.')
    },
    'box-plot': {
        definitions: [
            { term: say('Kuartil arteko ibiltartea', 'Rango intercuartílico', 'المدى الربيعي', 'Interquartile range'), meaning: say('Kutxaren zabalera, $Q_3-Q_1$; bertan dago datuen erdiko erdia.', 'La anchura de la caja, $Q_3-Q_1$, donde está la mitad central de los datos.', 'عرض الصندوق $Q_3-Q_1$، وفيه النصف الأوسط من البيانات.', 'The width of the box, $Q_3-Q_1$, where the middle half of the data lies.') }
        ],
        vocabulary: [
            say('kutxa', 'caja', 'الصندوق', 'box'),
            say('bibotea', 'bigote', 'الشارب', 'whisker'),
            say('atipikoa', 'atípico', 'شاذ', 'outlier')
        ],
        explanation: say(
            'Kutxa-diagramak datuak bost zenbakitan laburtzen ditu: minimoa, $Q_1$, $Me$, $Q_3$ eta maximoa. Kutxaren barruan datuen erdiko erdia dago. Biboteak kutxatik kuartil arteko ibiltartearen 1,5 aldiz baino urrunago ez dauden daturik urrunenetaraino luzatzen dira; urrunago daudenak atipikoak dira, eta aparte markatzen dira.',
            'El diagrama de caja resume los datos con cinco números: el mínimo, $Q_1$, $Me$, $Q_3$ y el máximo. Dentro de la caja está la mitad central de los datos. Los bigotes llegan hasta los datos más alejados que no pasan de 1,5 veces el rango intercuartílico desde la caja; los demás son atípicos y se marcan aparte.',
            'يلخّص مخطط الصندوق البيانات بخمسة أعداد: الأصغر و$Q_1$ و$Me$ و$Q_3$ والأكبر. وفي الصندوق النصف الأوسط من البيانات. ويمتد الشاربان إلى أبعد البيانات التي لا تبعد عن الصندوق أكثر من 1.5 مرة المدى الربيعي؛ وما يتجاوز ذلك شاذ ويُعلَّم وحده.',
            'A box plot sums up the data with five numbers: the minimum, $Q_1$, $Me$, $Q_3$ and the maximum. Inside the box lies the middle half of the data. The whiskers stretch to the furthest data that are no more than 1.5 times the interquartile range from the box; the ones beyond are outliers and are marked on their own.'
        ),
        examplePrompt: say('$Q_1=12$ eta $Q_3=20$ badira, noraino irits daiteke eskuineko bibotea?', 'Con $Q_1=12$ y $Q_3=20$, ¿hasta dónde puede llegar el bigote de la derecha?', 'مع $Q_1=12$ و$Q_3=20$، إلى أين يمكن أن يصل الشارب الأيمن؟', 'With $Q_1=12$ and $Q_3=20$, how far can the right whisker reach?'),
        example: same('$20+1{,}5\\cdot 8=32$'),
        exampleAnswer: say('32 zenbakiraino: 32 baino handiagoa den datu bat atipikoa litzateke.', 'Hasta 32: un dato mayor que 32 sería atípico.', 'حتى 32: البيان الأكبر من 32 يكون شاذًّا.', 'Up to 32: a datum greater than 32 would be an outlier.')
    },
    skewness: {
        definitions: [
            { term: say('Asimetria', 'Asimetría', 'الالتواء', 'Skewness'), meaning: say('Banaketa bat asimetrikoa da haren isatsetako bat bestea baino luzeagoa bada.', 'Una distribución es asimétrica si una de sus colas es más larga que la otra.', 'يكون التوزيع ملتويًا إذا كان أحد ذيليه أطول من الآخر.', 'A distribution is skewed if one of its tails is longer than the other.') }
        ],
        vocabulary: [
            say('isatsa', 'cola', 'الذيل', 'tail'),
            say('simetrikoa', 'simétrica', 'متماثل', 'symmetric')
        ],
        explanation: say(
            'Banaketa simetriko batean, batez bestekoa, mediana eta moda gutxi gorabehera bat datoz. Datu gutxi batzuk oso handiak badira, batez bestekoa eskuinera eramaten dute, baina mediana ia ez dute mugitzen: eskuinetik asimetrikoa da, $\\bar{x}>Me$ duela. Kutxan ikusten da, bibotea eta kutxaren eskuineko erdia luzeagoak direlako.',
            'En una distribución simétrica, la media, la mediana y la moda coinciden más o menos. Si unos pocos datos son muy grandes, tiran de la media hacia la derecha, pero apenas mueven la mediana: es una asimetría por la derecha, con $\\bar{x}>Me$. En la caja se ve porque el bigote y la mitad derecha de la caja son más largos.',
            'في التوزيع المتماثل يتطابق المتوسط والوسيط والمنوال تقريبًا. وإذا كانت بيانات قليلة كبيرة جدًّا فإنها تسحب المتوسط إلى اليمين ولا تكاد تحرّك الوسيط: إنه التواء إلى اليمين مع $\\bar{x}>Me$. ويظهر ذلك في الصندوق لأن الشارب والنصف الأيمن من الصندوق أطول.',
            'In a symmetric distribution, the mean, the median and the mode roughly coincide. If a few data are very large, they pull the mean to the right but hardly move the median: it is skewed to the right, with $\\bar{x}>Me$. You can see it in the box because the right whisker and the right half of the box are longer.'
        ),
        examplePrompt: say('Proba erraz batean, $Mo=9$, $Me=8$ eta $\\bar{x}=7{,}2$. Nora dago isatsa?', 'En una prueba fácil, $Mo=9$, $Me=8$ y $\\bar{x}=7{,}2$. ¿Hacia dónde está la cola?', 'في اختبار سهل $Mo=9$ و$Me=8$ و$\\bar{x}=7{,}2$. إلى أي جهة الذيل؟', 'In an easy test, $Mo=9$, $Me=8$ and $\\bar{x}=7{,}2$. Which way is the tail?'),
        example: same('$7{,}2<8<9$'),
        exampleAnswer: say('Ezkerrera: nota baxu gutxi batzuek batez bestekoa behera eramaten dute.', 'A la izquierda: unas pocas notas bajas tiran de la media hacia abajo.', 'إلى اليسار: علامات منخفضة قليلة تسحب المتوسط إلى الأسفل.', 'To the left: a few low marks pull the mean down.'),
        why: {
            text: say(
                'Zergatik mugitzen da batez bestekoa eta ez mediana? 1, 2, 3, 4, 5 datuetan handiena 50 bihurtzen bada, mediana 3 da oraindik, baina batez bestekoa 3 izatetik 12 izatera pasatzen da: batez bestekoak datu bakoitzaren balioa erabiltzen du, eta medianak haren ordena bakarrik.',
                '¿Por qué se mueve la media y no la mediana? Si el mayor de 1, 2, 3, 4, 5 pasa a ser 50, la mediana sigue siendo 3, pero la media pasa de 3 a 12: la media usa el valor de cada dato y la mediana solo su orden.',
                'لماذا يتحرك المتوسط لا الوسيط؟ إذا صار أكبر القيم 1، 2، 3، 4، 5 هو 50 بقي الوسيط 3، لكن المتوسط ينتقل من 3 إلى 12: المتوسط يستعمل قيمة كل بيان، والوسيط ترتيبه فقط.',
                'Why does the mean move and not the median? If the largest of 1, 2, 3, 4, 5 becomes 50, the median is still 3, but the mean goes from 3 to 12: the mean uses the value of each datum and the median only its order.'
            ),
            math: same('$\\frac{1+2+3+4+50}{5}=12$')
        }
    },

    /* ---------- 4. Measures of spread ---------- */
    'range-mean-deviation': {
        definitions: [
            { term: say('Batez besteko desbideratzea', 'Desviación media', 'الانحراف المتوسط', 'Mean deviation'), meaning: say('Datuek batez bestekoarekiko dituzten distantzien batez bestekoa, zeinurik gabe.', 'La media de las distancias de los datos a la media, sin signo.', 'متوسط مسافات البيانات عن المتوسط دون إشارة.', 'The mean of the distances from the data to the mean, without sign.') }
        ],
        vocabulary: [
            say('ibiltartea', 'recorrido', 'المدى', 'range'),
            say('balio absolutua', 'valor absoluto', 'القيمة المطلقة', 'absolute value'),
            say('distantzia', 'distancia', 'المسافة', 'distance')
        ],
        explanation: say(
            'Bi taldek batez besteko bera izan dezakete eta oso desberdin multzokatuta egon. Ibiltarteak muturrei bakarrik begiratzen die. Batez besteko desbideratzeak datu guztiei begiratzen die: $\\bar{x}$ zenbakiarekiko distantzien batez bestekoa da, balio absolutuarekin, zeinuarekin distantziek beti 0 batzen baitute.',
            'Dos grupos pueden tener la misma media y estar muy distintos de agrupados. El recorrido solo mira los extremos. La desviación media mira todos los datos: es la media de sus distancias a $\\bar{x}$, con valor absoluto, porque con signo las distancias suman siempre 0.',
            'قد يكون لمجموعتين المتوسط نفسه مع اختلاف كبير في تجمّعهما. المدى لا ينظر إلا إلى الطرفين. أما الانحراف المتوسط فينظر إلى كل البيانات: إنه متوسط مسافاتها عن $\\bar{x}$ بالقيمة المطلقة، لأن المسافات بإشاراتها مجموعها 0 دائمًا.',
            'Two groups can have the same mean and be grouped very differently. The range only looks at the ends. The mean deviation looks at all the data: it is the mean of their distances to $\\bar{x}$, with absolute value, because with signs the distances always add up to 0.'
        ),
        examplePrompt: say('Aurkitu 2, 4 eta 9 datuen batez besteko desbideratzea.', 'Halla la desviación media de 2, 4 y 9.', 'أوجد الانحراف المتوسط للبيانات 2 و4 و9.', 'Find the mean deviation of 2, 4 and 9.'),
        example: same('$\\bar{x}=5\\qquad DM=\\frac{3+1+4}{3}\\approx 2{,}67$'),
        exampleAnswer: say('2,67 inguru.', 'Unos 2,67.', 'نحو 2.67.', 'About 2.67.'),
        why: {
            text: say(
                'Zergatik behar da balio absolutua? Batez bestekoarekiko distantziek, zeinuarekin, beti 0 batzen dute: 1, 3 eta 8 datuekin, batez bestekoa 4 izanik, distantziak $-3$, $-1$ eta 4 dira.',
                '¿Por qué hace falta el valor absoluto? Las distancias con signo a la media siempre suman 0: con 1, 3 y 8, de media 4, las distancias son $-3$, $-1$ y 4.',
                'لماذا نحتاج إلى القيمة المطلقة؟ المسافات عن المتوسط بإشاراتها مجموعها 0 دائمًا: مع 1 و3 و8 ومتوسطها 4 تكون المسافات $-3$ و$-1$ و4.',
                'Why is the absolute value needed? The signed distances to the mean always add up to 0: with 1, 3 and 8, mean 4, the distances are $-3$, $-1$ and 4.'
            ),
            math: same('$(1-4)+(3-4)+(8-4)=0$')
        }
    },
    'variance-sd': {
        definitions: [
            { term: say('Desbideratze tipikoa', 'Desviación típica', 'الانحراف المعياري', 'Standard deviation'), meaning: say('Bariantzaren erro karratua, $\\sigma$; datuen unitateetan neurtzen du sakabanatzea.', 'La raíz cuadrada de la varianza, $\\sigma$; mide la dispersión en las unidades de los datos.', 'الجذر التربيعي للتباين $\\sigma$؛ يقيس التشتت بوحدات البيانات.', 'The square root of the variance, $\\sigma$; it measures spread in the units of the data.') }
        ],
        vocabulary: [
            say('bariantza', 'varianza', 'التباين', 'variance'),
            say('karratua', 'cuadrado', 'المربع', 'square')
        ],
        explanation: say(
            'Bariantza batez bestekoarekiko distantzien karratuen batez bestekoa da. Taula batekin azkarragoa da formula praktikoa erabiltzea: karratuen batez bestekoa ken batez bestekoaren karratua. Desbideratze tipikoa, $\\sigma$, haren erro karratua da, eta datuen unitate berean dago; beraz, hura interpretatzen da.',
            'La varianza es la media de los cuadrados de las distancias a la media. Con una tabla es más rápido usar la fórmula práctica: la media de los cuadrados menos el cuadrado de la media. La desviación típica $\\sigma$ es su raíz cuadrada y está en las mismas unidades que los datos, así que es la que se interpreta.',
            'التباين متوسط مربعات المسافات عن المتوسط. ومع جدول يكون أسرع استعمال الصيغة العملية: متوسط المربعات ناقص مربع المتوسط. والانحراف المعياري $\\sigma$ جذره التربيعي، وهو بوحدات البيانات نفسها، ولذلك هو الذي يُفسَّر.',
            'The variance is the mean of the squares of the distances to the mean. With a table it is quicker to use the working formula: the mean of the squares minus the square of the mean. The standard deviation $\\sigma$ is its square root and is in the same units as the data, so it is the one you interpret.'
        ),
        examplePrompt: say('Aurkitu 1, 3, 5 datuen $\\sigma^2$.', 'Halla $\\sigma^2$ de 1, 3, 5.', 'أوجد $\\sigma^2$ للبيانات 1، 3، 5.', 'Find $\\sigma^2$ for 1, 3, 5.'),
        example: same('$\\sigma^2=\\frac{1+9+25}{3}-3^2\\approx 2{,}67$'),
        exampleAnswer: say('2,67 inguru, eta $\\sigma\\approx 1{,}63$.', 'Unos 2,67, y $\\sigma\\approx 1{,}63$.', 'نحو 2.67، و$\\sigma\\approx 1{,}63$.', 'About 2.67, and $\\sigma\\approx 1{,}63$.'),
        why: {
            text: say(
                'Zergatik balio du formula praktikoak? $(x_i-\\bar{x})^2=x_i^2-2x_i\\bar{x}+\\bar{x}^2$ garatu eta batez bestekoa egitean, erdiko gaiak $-2\\bar{x}^2$ ematen du, eta karratuen batez bestekoa ken $\\bar{x}^2$ geratzen da.',
                '¿Por qué funciona la fórmula práctica? Al desarrollar $(x_i-\\bar{x})^2=x_i^2-2x_i\\bar{x}+\\bar{x}^2$ y hacer la media, el término del medio da $-2\\bar{x}^2$, y queda la media de los cuadrados menos $\\bar{x}^2$.',
                'لماذا تصلح الصيغة العملية؟ عند نشر $(x_i-\\bar{x})^2=x_i^2-2x_i\\bar{x}+\\bar{x}^2$ وأخذ المتوسط يعطي الحد الأوسط $-2\\bar{x}^2$، فيبقى متوسط المربعات ناقص $\\bar{x}^2$.',
                'Why does the working formula work? Expanding $(x_i-\\bar{x})^2=x_i^2-2x_i\\bar{x}+\\bar{x}^2$ and taking the mean, the middle term gives $-2\\bar{x}^2$, and what is left is the mean of the squares minus $\\bar{x}^2$.'
            ),
            math: same('$\\frac{4+0+4}{3}=\\frac{4+16+36}{3}-4^2$')
        }
    },
    'coefficient-variation': {
        definitions: [
            { term: say('Aldakuntza-koefizientea', 'Coeficiente de variación', 'معامل الاختلاف', 'Coefficient of variation'), meaning: say('$CV=\\frac{\\sigma}{\\bar{x}}$ zatidura; askotan ehunekotan ematen da.', 'El cociente $CV=\\frac{\\sigma}{\\bar{x}}$; muchas veces se da en porcentaje.', 'خارج القسمة $CV=\\frac{\\sigma}{\\bar{x}}$؛ وكثيرًا ما يُعطى نسبةً مئوية.', 'The quotient $CV=\\frac{\\sigma}{\\bar{x}}$; it is often given as a percentage.') }
        ],
        vocabulary: [
            say('sakabanatuta', 'disperso', 'تشتّت', 'spread out'),
            say('unitateak', 'unidades', 'الوحدات', 'units')
        ],
        explanation: say(
            'Desbideratze tipikoa unitateen eta datuen tamainaren araberakoa da: 5 kg asko da 20 kg-rentzat, eta gutxi 500 kg-rentzat. Bi banaketa konparatzeko, $\\sigma$ batez bestekoaz zatitzen da. Aldakuntza-koefizienteak ez du unitaterik, eta aldagai desberdinak konparatzeko ere balio du, altuerak eta pisuak bezala.',
            'La desviación típica depende de las unidades y del tamaño de los datos: 5 kg es mucho para 20 kg y poco para 500 kg. Para comparar dos distribuciones se divide $\\sigma$ entre la media. El coeficiente de variación no tiene unidades y sirve incluso para comparar variables distintas, como alturas y pesos.',
            'يعتمد الانحراف المعياري على الوحدات وعلى حجم البيانات: 5 كغ كثير مع 20 كغ وقليل مع 500 كغ. ولمقارنة توزيعين نقسم $\\sigma$ على المتوسط. ومعامل الاختلاف لا وحدة له، ويصلح حتى لمقارنة متغيرات مختلفة كالأطوال والأوزان.',
            'The standard deviation depends on the units and on the size of the data: 5 kg is a lot for 20 kg and little for 500 kg. To compare two distributions, divide $\\sigma$ by the mean. The coefficient of variation has no units and even works for comparing different variables, such as heights and weights.'
        ),
        examplePrompt: say('Nota batzuek $\\bar{x}=6$ eta $\\sigma=1{,}2$ dituzte; denbora batzuek, $\\bar{x}=40$ s eta $\\sigma=6$ s. Zeinek aldatzen du gehiago?', 'Unas notas tienen $\\bar{x}=6$ y $\\sigma=1{,}2$; unos tiempos, $\\bar{x}=40$ s y $\\sigma=6$ s. ¿Cuál varía más?', 'لعلامات $\\bar{x}=6$ و$\\sigma=1{,}2$، ولأزمنة $\\bar{x}=40$ ث و$\\sigma=6$ ث. أيهما يتغيّر أكثر؟', 'Some marks have $\\bar{x}=6$ and $\\sigma=1{,}2$; some times, $\\bar{x}=40$ s and $\\sigma=6$ s. Which varies more?'),
        example: same('$\\frac{1{,}2}{6}=0{,}2\\qquad\\frac{6}{40}=0{,}15$'),
        exampleAnswer: say('Notek: haien $CV$ handiagoa da.', 'Las notas: su $CV$ es mayor.', 'العلامات: لأن $CV$ لها أكبر.', 'The marks: their $CV$ is larger.')
    },

    /* ---------- 5. Interpret and compare ---------- */
    outliers: {
        definitions: [
            { term: say('Datu atipikoa', 'Dato atípico', 'القيمة الشاذة', 'Outlier'), meaning: say('Besteetatik oso urrun dagoen datu bat; akats batengatik edo kasu arraro batengatik izan daiteke.', 'Un dato muy alejado de los demás, que puede deberse a un error o a un caso raro.', 'بيان بعيد جدًّا عن الباقي، قد يكون سببه خطأ أو حالة نادرة.', 'A datum very far from the rest, which may be due to a mistake or a rare case.') }
        ],
        vocabulary: [
            say('tartea', 'intervalo', 'المجال', 'interval'),
            say('akatsa', 'error', 'الخطأ', 'mistake')
        ],
        explanation: say(
            'Banaketa askotan, ia datu guztiak batez bestekotik hiru desbideratze tipiko baino gutxiagora daude. Horregatik, $(\\bar{x}-3\\sigma,\\ \\bar{x}+3\\sigma)$ tartetik kanpo dagoen datu bat susmagarria da: neurtzean egindako akats bat edo oso kasu arraro bat izan daiteke. Kontuz: oso urrun dagoen datu batek $\\sigma$ ere handitzen du, eta tartea zabaldu egiten da.',
            'En muchas distribuciones casi todos los datos están a menos de tres desviaciones típicas de la media. Por eso un dato fuera de $(\\bar{x}-3\\sigma,\\ \\bar{x}+3\\sigma)$ es sospechoso: puede ser un error al medir o un caso muy raro. Ojo: un dato muy alejado también agranda $\\sigma$, y el intervalo se ensancha.',
            'في توزيعات كثيرة تقع كل البيانات تقريبًا على بعد أقل من ثلاثة انحرافات معيارية من المتوسط. لذلك يكون البيان خارج $(\\bar{x}-3\\sigma,\\ \\bar{x}+3\\sigma)$ مريبًا: قد يكون خطأ في القياس أو حالة نادرة جدًّا. وانتبه: البيان البعيد جدًّا يكبّر $\\sigma$ أيضًا فيتّسع المجال.',
            'In many distributions almost all the data are less than three standard deviations from the mean. That is why a datum outside $(\\bar{x}-3\\sigma,\\ \\bar{x}+3\\sigma)$ is suspicious: it may be a measuring mistake or a very rare case. Careful: a datum very far away also makes $\\sigma$ bigger, and the interval widens.'
        ),
        examplePrompt: say('Nota batzuek $\\bar{x}=6$ eta $\\sigma=1{,}5$ dituzte. Zein balioren artean ez dago atipikorik?', 'Unas notas tienen $\\bar{x}=6$ y $\\sigma=1{,}5$. ¿Entre qué valores no hay atípicos?', 'لعلامات $\\bar{x}=6$ و$\\sigma=1{,}5$. بين أي قيمتين لا توجد قيم شاذة؟', 'Some marks have $\\bar{x}=6$ and $\\sigma=1{,}5$. Between which values are there no outliers?'),
        example: same('$6-3\\cdot 1{,}5=1{,}5\\qquad 6+3\\cdot 1{,}5=10{,}5$'),
        exampleAnswer: say('1,5 eta 10,5 artean: notak 0 eta 10 artean daudenez, 1,5 baino txikiagoa den nota bat bakarrik izan liteke atipikoa.', 'Entre 1,5 y 10,5: como las notas van de 0 a 10, solo podría ser atípica una nota menor que 1,5.', 'بين 1.5 و10.5: وبما أن العلامات من 0 إلى 10 فلا يمكن أن تكون شاذة إلا علامة أصغر من 1.5.', 'Between 1.5 and 10.5: as the marks go from 0 to 10, only a mark below 1.5 could be an outlier.')
    },
    'standard-scores': {
        definitions: [
            { term: say('Puntuazio tipikoa', 'Puntuación típica', 'الدرجة المعيارية', 'Standard score'), meaning: say('Datu bat batez bestekotik bereizten duten desbideratze tipikoen kopurua: ${z}=\\frac{x-\\bar{x}}{\\sigma}$.', 'El número de desviaciones típicas que separan un dato de la media: ${z}=\\frac{x-\\bar{x}}{\\sigma}$.', 'عدد الانحرافات المعيارية التي تفصل البيان عن المتوسط: ${z}=\\frac{x-\\bar{x}}{\\sigma}$.', 'The number of standard deviations between a datum and the mean: ${z}=\\frac{x-\\bar{x}}{\\sigma}$.') }
        ],
        vocabulary: [
            say('nabarmendu', 'destacar', 'التميّز', 'stand out'),
            say('taldea', 'grupo', 'المجموعة', 'group')
        ],
        explanation: say(
            '8 batek ez du gauza bera balio azterketa zail batean eta erraz batean. Talde desberdinetako datuak konparatzeko, batez bestekoarekiko distantzia desbideratze tipikotan neurtzen da: ${z}=\\frac{x-\\bar{x}}{\\sigma}$. Positiboa bada, datua batez bestekoaren gainetik dago; negatiboa bada, azpitik. Zenbat eta handiagoa, orduan eta gehiago nabarmentzen da datua bere taldean.',
            'Un 8 no vale lo mismo en un examen difícil que en uno fácil. Para comparar datos de grupos distintos se mide su distancia a la media en desviaciones típicas: ${z}=\\frac{x-\\bar{x}}{\\sigma}$. Si es positiva, el dato está por encima de la media; si es negativa, por debajo. Cuanto mayor es, más destaca el dato en su grupo.',
            'العلامة 8 لا تساوي الشيء نفسه في امتحان صعب وفي امتحان سهل. ولمقارنة بيانات من مجموعات مختلفة نقيس بعدها عن المتوسط بالانحرافات المعيارية: ${z}=\\frac{x-\\bar{x}}{\\sigma}$. فإن كانت موجبة فالبيان فوق المتوسط، وإن كانت سالبة فتحته. وكلما كبرت تميّز البيان أكثر في مجموعته.',
            'An 8 is not worth the same in a hard exam as in an easy one. To compare data from different groups, measure their distance to the mean in standard deviations: ${z}=\\frac{x-\\bar{x}}{\\sigma}$. If it is positive, the datum is above the mean; if negative, below. The larger it is, the more the datum stands out in its group.'
        ),
        examplePrompt: say('Atleta batek $12{,}6$ s egiten ditu (batez bestekoa 13 s, $\\sigma=0{,}2$ s), eta beste batek $14{,}1$ s (batez bestekoa $14{,}4$ s, $\\sigma=0{,}3$ s). Denboretan, gutxiago hobe da. Zein nabarmentzen da gehiago?', 'Un atleta corre en $12{,}6$ s (media 13 s, $\\sigma=0{,}2$ s) y otra en $14{,}1$ s (media $14{,}4$ s, $\\sigma=0{,}3$ s). En tiempos, lo bueno es bajar. ¿Quién destaca más?', 'يجري عدّاء في $12{,}6$ ث (المتوسط 13 ث، $\\sigma=0{,}2$ ث) وعدّاءة في $14{,}1$ ث (المتوسط $14{,}4$ ث، $\\sigma=0{,}3$ ث). في الأزمنة الأقل أفضل. من يتميّز أكثر؟', 'One athlete runs in $12{,}6$ s (mean 13 s, $\\sigma=0{,}2$ s) and another in $14{,}1$ s (mean $14{,}4$ s, $\\sigma=0{,}3$ s). With times, lower is better. Who stands out more?'),
        example: same('$\\frac{12{,}6-13}{0{,}2}=-2\\qquad\\frac{14{,}1-14{,}4}{0{,}3}=-1$'),
        exampleAnswer: say('Lehenengoa: haren denbora batez bestekoaren azpitik dago, bi desbideratzera.', 'El primero: su tiempo está dos desviaciones por debajo de la media.', 'الأول: زمنه تحت المتوسط بانحرافين.', 'The first: his time is two deviations below the mean.'),
        why: {
            text: say(
                'Zergatik zatitu $\\sigma$ zenbakiaz? Horrela unitatea aldatzen da: batez bestekoarekiko distantzia desbideratze tipikotan neurtzen da, eta talde bakoitzean bere balioa du. Horregatik, edozein taldetako puntuazio tipikoek 0 batez bestekoa eta 1 desbideratze tipikoa dute.',
                '¿Por qué dividir entre $\\sigma$? Así se cambia la unidad: la distancia a la media se mide en desviaciones típicas, que en cada grupo valen lo suyo. Por eso las puntuaciones típicas de cualquier grupo tienen media 0 y desviación típica 1.',
                'لماذا نقسم على $\\sigma$؟ هكذا نغيّر الوحدة: نقيس البعد عن المتوسط بالانحرافات المعيارية، ولكل مجموعة قيمتها. لذلك للدرجات المعيارية في أي مجموعة متوسط 0 وانحراف معياري 1.',
                'Why divide by $\\sigma$? It changes the unit: the distance to the mean is measured in standard deviations, which are worth their own amount in each group. That is why the standard scores of any group have mean 0 and standard deviation 1.'
            ),
            math: same('$\\frac{9-6}{1{,}5}=2$')
        }
    },
    'transform-data': {
        vocabulary: [
            say('batzea', 'sumar', 'الجمع', 'add'),
            say('biderkatu', 'multiplicar', 'الضرب', 'multiply'),
            say('sakabanatzea', 'dispersión', 'التشتت', 'spread')
        ],
        explanation: say(
            'Datu guztiei zenbaki bera batzen bazaie, batez bestekoa zenbaki horrenbeste mugitzen da, eta sakabanatzea ez da aldatzen: datuak batera lekualdatzen dira. Zenbaki batez biderkatzen badira, batez bestekoa eta desbideratze tipikoa haren bider geratzen dira. Batez bestekoaren berdina den datu bat gehitzeak ez du hura aldatzen, baina $\\sigma$ txikitzen du; oso urrun dagoen batek, handitu.',
            'Si a todos los datos se les suma el mismo número, la media se mueve ese número y la dispersión no cambia: se desplazan juntos. Si se multiplican por un número, la media y la desviación típica se multiplican por él. Un dato nuevo igual a la media no la cambia, pero reduce $\\sigma$; uno muy alejado la aumenta.',
            'إذا أضفنا العدد نفسه إلى كل البيانات تحرّك المتوسط بذلك العدد ولم يتغيّر التشتت: البيانات تنتقل معًا. وإذا ضُربت في عدد ضُرب المتوسط والانحراف المعياري فيه. وإضافة بيان يساوي المتوسط لا تغيّره لكنها تصغّر $\\sigma$، وإضافة بيان بعيد جدًّا تكبّره.',
            'If the same number is added to all the data, the mean moves by that number and the spread does not change: the data shift together. If they are multiplied by a number, the mean and the standard deviation are multiplied by it. Adding a datum equal to the mean does not change it, but makes $\\sigma$ smaller; adding one very far away makes it bigger.'
        ),
        examplePrompt: say('$\\bar{x}=5{,}5$ eta $\\sigma=2$ dituzten nota batzuei puntu 1 batzen zaie guztiei. Nola geratzen dira?', 'A unas notas con $\\bar{x}=5{,}5$ y $\\sigma=2$ se les suma 1 punto a todas. ¿Cómo quedan?', 'أُضيفت نقطة واحدة إلى كل علامات لها $\\bar{x}=5{,}5$ و$\\sigma=2$. كيف تصبح؟', 'Some marks with $\\bar{x}=5{,}5$ and $\\sigma=2$ all get 1 extra point. What are they like now?'),
        example: same('$\\bar{y}=5{,}5+1=6{,}5\\qquad\\sigma_y=2$'),
        exampleAnswer: say('Batez bestekoa 6,5 da, eta desbideratze tipikoa bera, 2.', 'Media 6,5 y la misma desviación típica, 2.', 'المتوسط 6.5 والانحراف المعياري نفسه 2.', 'Mean 6.5 and the same standard deviation, 2.')
    }
}
