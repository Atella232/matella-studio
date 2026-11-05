import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { StatisticsAkTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Estatistika · 4. DBH akademikoak — what each lesson tells: a short
   explanation, its cases, the example as an exercise («Another example»),
   the key words in four languages and, in three lessons, «Why does it
   work?». Plain data so the tests can import it; lessons.tsx merges it into
   the topics. Basque writes the per cent sign first (% 25); Arabic writes
   the decimal point ({,} becomes .).
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const statisticsAkLessonTexts: Record<StatisticsAkTopicId, LessonTexts> = {
    /* ---------- 1. Data and tables ---------- */
    sampling: {
        vocabulary: [
            say('lagina', 'muestra', 'العيّنة', 'sample'),
            say('populazioa', 'población', 'المجتمع', 'population'),
            say('geruzakako laginketa', 'muestreo estratificado', 'المعاينة الطبقية', 'stratified sampling')
        ],
        explanation: say(
            'Populazioa aztertu nahi diren elementu guztiak dira; lagina, benetan aztertzen den zatia, $n$ tamainakoa. Adierazgarria izan behar du, eta horregatik zoriz aukeratzen da. Hiru laginketa mota daude: ausazko soila, sistematikoa eta geruzakako laginketa.',
            'La población son todos los elementos que se quieren estudiar; la muestra, la parte que se estudia de verdad, de tamaño $n$. Debe ser representativa, y por eso se elige al azar. Hay tres tipos: muestreo aleatorio simple, sistemático y muestreo estratificado.',
            'المجتمع هو كل العناصر التي نريد دراستها، والعيّنة هي الجزء الذي ندرسه فعلًا وحجمها $n$. ويجب أن تكون ممثِّلة، لذلك تُختار عشوائيًا. وهناك ثلاثة أنواع: المعاينة العشوائية البسيطة، والمنتظمة، والمعاينة الطبقية.',
            'The population is every element you want to study; the sample, the part you actually study, of size $n$. It must be representative, so it is chosen at random. There are three kinds: simple random sampling, systematic sampling and stratified sampling.'
        ),
        cases: [
            { title: say('Ausazko soila', 'Aleatorio simple', 'عشوائية بسيطة', 'Simple random'), text: say('Guztiek aukera bera, zozketa batean bezala.', 'Todos con la misma posibilidad, como en un sorteo.', 'للجميع الفرصة نفسها كما في القرعة.', 'Everyone has the same chance, as in a draw.') },
            { title: say('Sistematikoa', 'Sistemático', 'منتظمة', 'Systematic'), text: say('Bat zoriz lehen $k$ elementuen artean, eta gero $k$ elementutik behin.', 'Uno al azar entre los $k$ primeros y luego cada $k$.', 'واحد عشوائيًا من أول $k$ ثم كل $k$.', 'One at random among the first $k$, then every $k$.'), math: same('$k=\\frac{N}{n}$') },
            { title: say('Geruzakakoa', 'Estratificado', 'طبقية', 'Stratified'), text: say('Talde bakoitzetik, bere tamainaren araberako zati bat.', 'De cada grupo, una parte proporcional a su tamaño.', 'من كل مجموعة جزء يتناسب مع حجمها.', 'From each group, a part in proportion to its size.') }
        ],
        examplePrompt: say('840 bazkideren artean 40 bazkideko lagin sistematiko bat nahi da. Lehena 5. bazkidea bada, zein dira hurrengo hirurak?', 'De 840 socios se quiere una muestra sistemática de 40. Si el primero es el número 5, ¿cuáles son los tres siguientes?', 'من بين 840 عضوًا نريد عيّنة منتظمة من 40. إذا كان الأول هو الرقم 5 فما الثلاثة التالية؟', 'From 840 members we want a systematic sample of 40. If the first is number 5, which are the next three?'),
        example: same('$\\begin{gathered}k=\\frac{840}{40}=21\\\\ 5,\\ 26,\\ 47,\\ 68\\end{gathered}$'),
        exampleAnswer: say('21 gehitzen da aldi bakoitzean: 26, 47 eta 68.', 'Se suma 21 cada vez: 26, 47 y 68.', 'نضيف 21 في كل مرة: 26 و47 و68.', 'Add 21 each time: 26, 47 and 68.')
    },
    frequencies: {
        vocabulary: [
            say('maiztasun absolutua', 'frecuencia absoluta', 'التكرار المطلق', 'absolute frequency'),
            say('maiztasun erlatiboa', 'frecuencia relativa', 'التكرار النسبي', 'relative frequency'),
            say('maiztasun metatua', 'frecuencia acumulada', 'التكرار المتجمّع', 'cumulative frequency')
        ],
        explanation: say(
            'Maiztasun absolutua, $f_i$, balio bakoitza agertzen den aldi kopurua da; denak batuta, $N$. Maiztasun erlatiboa $h_i=\\frac{f_i}{N}$ da, eta denak batuta 1 ematen dute. Maiztasun metatuak, $F_i$, balio horrena eta aurrekoenak batzen ditu; $H_i=\\frac{F_i}{N}$. Metatuek «zenbat datu dira 2 edo gutxiago?» bezalako galderak erantzuten dituzte.',
            'La frecuencia absoluta, $f_i$, es las veces que aparece cada valor; sumadas, $N$. La frecuencia relativa es $h_i=\\frac{f_i}{N}$, y sumadas dan 1. La frecuencia acumulada, $F_i$, suma la de ese valor y las anteriores; $H_i=\\frac{F_i}{N}$. Las acumuladas responden a preguntas como «¿cuántos datos son 2 o menos?».',
            'التكرار المطلق $f_i$ هو عدد مرات ظهور كل قيمة، ومجموعها $N$. والتكرار النسبي $h_i=\\frac{f_i}{N}$ ومجموعها 1. والتكرار المتجمّع $F_i$ يجمع تكرار تلك القيمة وما قبلها؛ و$H_i=\\frac{F_i}{N}$. والمتجمّعة تجيب عن أسئلة مثل «كم بيانًا قيمته 2 أو أقل؟».',
            'The absolute frequency, $f_i$, is how many times each value appears; added up, $N$. The relative frequency is $h_i=\\frac{f_i}{N}$, and they add up to 1. The cumulative frequency, $F_i$, adds that value\'s and the earlier ones; $H_i=\\frac{F_i}{N}$. Cumulative frequencies answer questions like «how many data are 2 or less?».'
        ),
        examplePrompt: say('20 ikasleren anai-arreba kopurua: 0 → 4, 1 → 9, 2 → 5, 3 → 2. Zer zati dauka anai-arreba bat edo gutxiago?', 'Hermanos de 20 alumnos: 0 → 4, 1 → 9, 2 → 5, 3 → 2. ¿Qué parte tiene 1 hermano o menos?', 'عدد إخوة 20 تلميذًا: 0 → 4، 1 → 9، 2 → 5، 3 → 2. ما نسبة من لهم أخ واحد أو أقل؟', 'Brothers and sisters of 20 pupils: 0 → 4, 1 → 9, 2 → 5, 3 → 2. What fraction has 1 or fewer?'),
        example: same('$\\begin{gathered}F_2=4+9=13\\\\ H_2=\\frac{13}{20}=0{,}65\\end{gathered}$'),
        exampleAnswer: say('Ikasleen % 65 dira anai-arreba bat edo bat ere ez dutenak.', 'El 65 % de los alumnos tiene 1 hermano o ninguno.', '65 % من التلاميذ لهم أخ واحد أو لا إخوة لهم.', '65% of the pupils have 1 brother or sister or none.')
    },
    intervals: {
        vocabulary: [
            say('klase-marka', 'marca de clase', 'مركز الفئة', 'class mark'),
            say('histograma', 'histograma', 'المدرّج التكراري', 'histogram')
        ],
        explanation: say(
            'Balio asko daudenean, datuak zabalera bereko tartetan biltzen dira, $[a,b)$: ezkerreko muturra sartzen da, eta eskuinekoa ez. Zabalera ibiltartea (gorantz biribilduta) zati tarte kopurua da. Klase-markak, $x_i=\\frac{a+b}{2}$, tarteko datu guztiak ordezkatzen ditu. Histograma batekin marrazten dira.',
            'Con muchos valores, los datos se agrupan en intervalos de la misma amplitud, $[a,b)$: el extremo izquierdo entra y el derecho no. La amplitud es el recorrido (redondeado hacia arriba) entre el número de intervalos. La marca de clase, $x_i=\\frac{a+b}{2}$, representa a todos los datos del intervalo. Se dibujan con un histograma.',
            'مع كثرة القيم تُجمع البيانات في فئات متساوية الطول $[a,b)$: الطرف الأيسر داخل والأيمن لا. وطول الفئة هو المدى (مقرّبًا إلى الأعلى) مقسومًا على عدد الفئات. ومركز الفئة $x_i=\\frac{a+b}{2}$ يمثّل كل بيانات الفئة. وتُرسم بالمدرّج التكراري.',
            'With many values, the data are grouped in intervals of the same width, $[a,b)$: the left end is in and the right end is not. The width is the range (rounded up) divided by the number of intervals. The class mark, $x_i=\\frac{a+b}{2}$, stands for all the data in the interval. They are drawn with a histogram.'
        ),
        examplePrompt: say('Pisu batzuk 41 kg eta 78 kg artean daude. 4 tarte nahi dira. Zein zabalera dute?', 'Unos pesos van de 41 kg a 78 kg. Se quieren 4 intervalos. ¿Qué amplitud tienen?', 'أوزان تتراوح بين 41 كغ و78 كغ. نريد 4 فئات. ما طول الفئة؟', 'Some weights go from 41 kg to 78 kg. You want 4 intervals. How wide are they?'),
        example: same('$\\begin{gathered}78-41=37\\ \\to\\ r\'=40\\\\ 40\\div 4=10\\end{gathered}$'),
        exampleAnswer: say('10 zabalera; soberan dauden 3 kg bi muturretan banatzen dira: lehen tartea $[39{,}5;\\ 49{,}5)$ da.', 'Amplitud 10; los 3 kg de más se reparten en los dos extremos: el primer intervalo es $[39{,}5;\\ 49{,}5)$.', 'الطول 10؛ وتُوزّع الكيلوغرامات الثلاثة الزائدة على الطرفين: الفئة الأولى $[39{,}5;\\ 49{,}5)$.', 'Width 10; the 3 extra kg are shared between both ends: the first interval is $[39{,}5;\\ 49{,}5)$.')
    },

    /* ---------- 2. Centralization ---------- */
    mean: {
        vocabulary: [
            say('batez bestekoa', 'media', 'المتوسط', 'mean'),
            say('batez besteko haztatua', 'media ponderada', 'المتوسط المرجّح', 'weighted mean')
        ],
        explanation: say(
            'Batez bestekoa $\\bar{x}=\\frac{\\sum f_i x_i}{N}$ da; beraz, datu guztien batura $N\\cdot\\bar{x}$ da. Bi talde batzeko, batez besteko haztatua erabiltzen da, $\\frac{n_1\\bar{x}_1+n_2\\bar{x}_2}{n_1+n_2}$: talde handienaren batez bestekotik hurbilago geratzen da. Baturarekin falta den datu bat ere aurkitzen da.',
            'La media es $\\bar{x}=\\frac{\\sum f_i x_i}{N}$, así que la suma de todos los datos es $N\\cdot\\bar{x}$. Para juntar dos grupos se usa la media ponderada, $\\frac{n_1\\bar{x}_1+n_2\\bar{x}_2}{n_1+n_2}$: queda más cerca de la del grupo más numeroso. Con la suma también se halla un dato que falta.',
            'المتوسط $\\bar{x}=\\frac{\\sum f_i x_i}{N}$، إذن مجموع كل البيانات $N\\cdot\\bar{x}$. ولجمع مجموعتين نستعمل المتوسط المرجّح $\\frac{n_1\\bar{x}_1+n_2\\bar{x}_2}{n_1+n_2}$: يكون أقرب إلى متوسط المجموعة الأكبر. وبالمجموع نجد أيضًا بيانًا ناقصًا.',
            'The mean is $\\bar{x}=\\frac{\\sum f_i x_i}{N}$, so the sum of all the data is $N\\cdot\\bar{x}$. To join two groups, use the weighted mean, $\\frac{n_1\\bar{x}_1+n_2\\bar{x}_2}{n_1+n_2}$: it ends up closer to the mean of the bigger group. The sum also gives a missing value.'
        ),
        examplePrompt: say('Bost noten batez bestekoa 6 da. Lau hauek dira: 5, 7, 4 eta 8. Zein da bosgarrena?', 'La media de cinco notas es 6. Cuatro son 5, 7, 4 y 8. ¿Cuál es la quinta?', 'متوسط خمس علامات 6. أربع منها 5 و7 و4 و8. ما الخامسة؟', 'The mean of five marks is 6. Four of them are 5, 7, 4 and 8. What is the fifth?'),
        example: same('$5\\cdot 6-(5+7+4+8)=6$'),
        exampleAnswer: say('Baturak $5\\cdot 6=30$ izan behar du; 6 puntu falta dira.', 'La suma tiene que ser $5\\cdot 6=30$; faltan 6 puntos.', 'يجب أن يكون المجموع $5\\cdot 6=30$؛ تنقص 6 نقاط.', 'The sum must be $5\\cdot 6=30$; 6 points are missing.')
    },
    'median-mode': {
        vocabulary: [
            say('mediana', 'mediana', 'الوسيط', 'median'),
            say('moda', 'moda', 'المنوال', 'mode'),
            say('atipikoa', 'atípico', 'قيمة شاذة', 'outlier')
        ],
        explanation: say(
            'Mediana, Me, datu ordenatuen erdiko datua da: $N$ bakoitia bada, $\\frac{N+1}{2}$ postukoa; bikoitia bada, erdiko bien batez bestekoa. Moda, Mo, maiztasun handieneko balioa da. Datu atipiko batek asko mugitzen du batez bestekoa, eta ia ezer ez mediana: soldatetan edo prezioetan, medianak hobeto ordezkatzen du.',
            'La mediana, Me, es el dato central de los datos ordenados: si $N$ es impar, el de la posición $\\frac{N+1}{2}$; si es par, la media de los dos centrales. La moda, Mo, es el valor más frecuente. Un dato atípico mueve mucho la media y casi nada la mediana: con sueldos o precios, la mediana representa mejor.',
            'الوسيط Me هو البيان الأوسط في البيانات المرتّبة: إذا كان $N$ فرديًا فهو في الموقع $\\frac{N+1}{2}$، وإذا كان زوجيًا فمتوسط البيانين الأوسطين. والمنوال Mo هو القيمة الأكثر تكرارًا. والقيمة الشاذة تحرّك المتوسط كثيرًا والوسيط قليلًا جدًا: في الأجور أو الأسعار يمثّل الوسيط أفضل.',
            'The median, Me, is the middle value of the ordered data: if $N$ is odd, the one in position $\\frac{N+1}{2}$; if it is even, the mean of the two middle ones. The mode, Mo, is the most frequent value. An outlier moves the mean a lot and the median hardly at all: with wages or prices, the median represents better.'
        ),
        examplePrompt: say('Kalkulatu 3, 4, 4, 5, 6, 8, 40 datuen batez bestekoa eta mediana. Zeinek ordezkatzen du hobeto?', 'Calcula la media y la mediana de 3, 4, 4, 5, 6, 8, 40. ¿Cuál representa mejor?', 'احسب المتوسط والوسيط للبيانات 3، 4، 4، 5، 6، 8، 40. أيهما يمثّل أفضل؟', 'Work out the mean and the median of 3, 4, 4, 5, 6, 8, 40. Which represents better?'),
        example: same('$\\begin{gathered}\\bar{x}=\\frac{70}{7}=10\\\\ \\text{Me}=5\\end{gathered}$'),
        exampleAnswer: say('Medianak: 40 atipikoa da eta batez bestekoa 10 zenbakiraino igotzen du. Moda 4 da.', 'La mediana: el 40 es atípico y sube la media hasta 10. La moda es 4.', 'الوسيط: 40 قيمة شاذة ترفع المتوسط إلى 10. والمنوال 4.', 'The median: 40 is an outlier and pushes the mean up to 10. The mode is 4.'),
        why: {
            text: say(
                'Batez bestekoak batura guztien artean banatzen du: datu bat 30 handitzen bada, batura 30 handitzen da, eta batez bestekoa, $\\frac{30}{N}$. Medianak erdiko datuaren postua bakarrik begiratzen du: handiena asko hazi arren, erdikoa bera da.',
                'La media reparte la suma entre todos: si un dato crece 30, la suma crece 30 y la media, $\\frac{30}{N}$. La mediana solo mira la posición del dato central: aunque el mayor crezca mucho, el central sigue siendo el mismo.',
                'المتوسط يوزّع المجموع على الجميع: إذا زاد بيان 30 زاد المجموع 30 وزاد المتوسط $\\frac{30}{N}$. أما الوسيط فينظر إلى موقع البيان الأوسط فقط: مهما كبر أكبر البيانات يبقى الأوسط نفسه.',
                'The mean shares the sum among everyone: if one value grows by 30, the sum grows by 30 and the mean by $\\frac{30}{N}$. The median only looks at the position of the middle value: however much the largest grows, the middle one stays the same.'
            )
        }
    },
    'grouped-centre': {
        vocabulary: [
            say('klase-marka', 'marca de clase', 'مركز الفئة', 'class mark'),
            say('tarte modala', 'intervalo modal', 'الفئة المنوالية', 'modal interval')
        ],
        explanation: say(
            'Datuak tartetan daudenean, tarte bakoitzeko datu guztiak haren klase-markan daudela onartzen da: $\\bar{x}=\\frac{\\sum f_i x_i}{N}$, $x_i$ marka izanik. Emaitza hurbilketa bat da. Tarte modala maiztasun handienekoa da, eta tarte mediana, $F_i$ metatuak $\\frac{N}{2}$ lehen aldiz lortzen duen tartea.',
            'Con datos en intervalos se supone que todos los datos de cada intervalo están en su marca de clase: $\\bar{x}=\\frac{\\sum f_i x_i}{N}$, con $x_i$ la marca. El resultado es aproximado. El intervalo modal es el de mayor frecuencia, y el intervalo mediano, el primero cuya acumulada $F_i$ alcanza $\\frac{N}{2}$.',
            'مع البيانات المبوّبة نفترض أن كل بيانات الفئة عند مركزها: $\\bar{x}=\\frac{\\sum f_i x_i}{N}$ حيث $x_i$ مركز الفئة. والنتيجة تقريبية. والفئة المنوالية هي الأكثر تكرارًا، والفئة الوسيطة أول فئة يبلغ فيها المتجمّع $F_i$ القيمة $\\frac{N}{2}$.',
            'With data in intervals, assume all the data of each interval sit at its class mark: $\\bar{x}=\\frac{\\sum f_i x_i}{N}$, with $x_i$ the mark. The result is approximate. The modal interval is the one with the highest frequency, and the median interval, the first whose cumulative $F_i$ reaches $\\frac{N}{2}$.'
        ),
        examplePrompt: say('Notak: $[2,4)$ 3, $[4,6)$ 5, $[6,8)$ 8, $[8,10)$ 4. Kalkulatu batez bestekoa eta tarte modala.', 'Notas: $[2,4)$ 3, $[4,6)$ 5, $[6,8)$ 8, $[8,10)$ 4. Calcula la media y el intervalo modal.', 'العلامات: $[2,4)$ 3، $[4,6)$ 5، $[6,8)$ 8، $[8,10)$ 4. احسب المتوسط والفئة المنوالية.', 'Marks: $[2,4)$ 3, $[4,6)$ 5, $[6,8)$ 8, $[8,10)$ 4. Work out the mean and the modal interval.'),
        example: same('$\\begin{gathered}3\\cdot 3+5\\cdot 5+8\\cdot 7+4\\cdot 9=126\\\\ \\bar{x}=\\frac{126}{20}=6{,}3\\end{gathered}$'),
        exampleAnswer: say('Batez bestekoa 6,3; tarte modala $[6,8)$ da, 8 daturekin.', 'Media 6,3; el intervalo modal es $[6,8)$, con 8 datos.', 'المتوسط 6.3؛ والفئة المنوالية $[6,8)$ وفيها 8 بيانات.', 'Mean 6.3; the modal interval is $[6,8)$, with 8 data.')
    },

    /* ---------- 3. Position ---------- */
    quartiles: {
        vocabulary: [
            say('kuartila', 'cuartil', 'الربيعي', 'quartile'),
            say('kuartil arteko ibiltartea', 'recorrido intercuartílico', 'المدى الربيعي', 'interquartile range')
        ],
        explanation: say(
            'Kuartilek datu ordenatuak lau zati berdinetan banatzen dituzte: $Q_1$ azpitik % 25 geratzen da, Me azpitik % 50 eta $Q_3$ azpitik % 75. Postua $N\\cdot\\frac{k}{100}$ da: osoa bada, datu horren eta hurrengoaren batez bestekoa; hamartarra bada, hurrengo datua. Kuartil arteko ibiltartea $Q_3-Q_1$ da.',
            'Los cuartiles dividen los datos ordenados en cuatro partes iguales: por debajo de $Q_1$ queda el 25 %, de Me el 50 % y de $Q_3$ el 75 %. La posición es $N\\cdot\\frac{k}{100}$: si es entera, la media de ese dato y el siguiente; si es decimal, el dato siguiente. El recorrido intercuartílico es $Q_3-Q_1$.',
            'تقسم الربيعيات البيانات المرتّبة إلى أربعة أجزاء متساوية: تحت $Q_1$ يبقى 25 %، وتحت Me يبقى 50 %، وتحت $Q_3$ يبقى 75 %. والموقع $N\\cdot\\frac{k}{100}$: إذا كان صحيحًا فمتوسط ذلك البيان والتالي، وإذا كان عشريًا فالبيان التالي. والمدى الربيعي $Q_3-Q_1$.',
            'The quartiles split the ordered data into four equal parts: below $Q_1$ lies 25%, below Me 50% and below $Q_3$ 75%. The position is $N\\cdot\\frac{k}{100}$: if it is whole, the mean of that value and the next; if it is a decimal, the next value. The interquartile range is $Q_3-Q_1$.'
        ),
        examplePrompt: say('Kalkulatu $Q_1$ eta $Q_3$ datu hauetan: 1, 2, 2, 3, 4, 4, 5, 6, 7, 9.', 'Calcula $Q_1$ y $Q_3$ de estos datos: 1, 2, 2, 3, 4, 4, 5, 6, 7, 9.', 'احسب $Q_1$ و$Q_3$ لهذه البيانات: 1، 2، 2، 3، 4، 4، 5، 6، 7، 9.', 'Work out $Q_1$ and $Q_3$ of these data: 1, 2, 2, 3, 4, 4, 5, 6, 7, 9.'),
        example: same('$\\begin{gathered}10\\cdot 0{,}25=2{,}5\\ \\to\\ Q_1=2\\\\ 10\\cdot 0{,}75=7{,}5\\ \\to\\ Q_3=6\\end{gathered}$'),
        exampleAnswer: say('Postu hamartarrak: hurrengo datua hartzen da. RIC $=6-2=4$.', 'Posiciones decimales: se toma el dato siguiente. RIC $=6-2=4$.', 'المواقع عشرية: نأخذ البيان التالي. RIC $=6-2=4$.', 'Decimal positions: take the next value. RIC $=6-2=4$.')
    },
    percentiles: {
        vocabulary: [
            say('pertzentila', 'percentil', 'المئين', 'percentile'),
            say('ehuneko metatua', 'porcentaje acumulado', 'النسبة المتجمّعة', 'cumulative percentage')
        ],
        explanation: say(
            '$k$ pertzentilak, $p_k$, datuen % $k$ uzten du azpian; kuartilak $p_{25}$, $p_{50}$ eta $p_{75}$ dira. Taula batean, ehuneko metatuak kalkulatzen dira, $100\\cdot H_i$: $p_k$ da ehuneko metatuak $k$ gainditzen duen lehen balioa. 80 pertzentilean bazaude, % 80 zure azpian edo berdin dago.',
            'El percentil $k$, $p_k$, deja por debajo el $k$ % de los datos; los cuartiles son $p_{25}$, $p_{50}$ y $p_{75}$. En una tabla se calculan los porcentajes acumulados, $100\\cdot H_i$: $p_k$ es el primer valor cuyo porcentaje acumulado supera $k$. Si estás en el percentil 80, el 80 % está por debajo o igual.',
            'المئين $k$ أي $p_k$ يترك تحته $k$ % من البيانات؛ والربيعيات هي $p_{25}$ و$p_{50}$ و$p_{75}$. وفي الجدول نحسب النسب المتجمّعة $100\\cdot H_i$: و$p_k$ أول قيمة تتجاوز نسبتها المتجمّعة $k$. وإذا كنت في المئين 80 فإن 80 % تحتك أو مثلك.',
            'The percentile $k$, $p_k$, leaves $k$% of the data below it; the quartiles are $p_{25}$, $p_{50}$ and $p_{75}$. In a table, work out the cumulative percentages, $100\\cdot H_i$: $p_k$ is the first value whose cumulative percentage passes $k$. If you are in the 80th percentile, 80% are below you or equal.'
        ),
        examplePrompt: say('36, 38, 40 eta 42 neurrien ehuneko metatuak: 20, 55, 80 eta 100. Aurkitu $p_{50}$ eta $p_{90}$.', 'Porcentajes acumulados de las tallas 36, 38, 40 y 42: 20, 55, 80 y 100. Halla $p_{50}$ y $p_{90}$.', 'النسب المتجمّعة للمقاسات 36 و38 و40 و42: 20 و55 و80 و100. أوجد $p_{50}$ و$p_{90}$.', 'Cumulative percentages of the sizes 36, 38, 40 and 42: 20, 55, 80 and 100. Find $p_{50}$ and $p_{90}$.'),
        example: same('$p_{50}=38\\qquad p_{90}=42$'),
        exampleAnswer: say('50 balioa 38 neurrian gainditzen da (% 55), eta 90, 42 neurrian.', 'El 50 se supera en el 38 (55 %) y el 90, en el 42.', 'تُتجاوز 50 عند المقاس 38 (55 %)، و90 عند 42.', '50 is passed at size 38 (55%), and 90 at 42.')
    },
    'box-plot': {
        vocabulary: [
            say('kutxa-diagrama', 'diagrama de caja', 'مخطط الصندوق', 'box plot'),
            say('atipikoa', 'atípico', 'قيمة شاذة', 'outlier')
        ],
        explanation: say(
            'Kutxa-diagramak datuak bost zenbakirekin laburbiltzen ditu. Kutxa $Q_1$ puntutik $Q_3$ puntura doa, marra bat medianan duela. Biboteak $Q_1-1{,}5\\cdot\\text{RIC}$ eta $Q_3+1{,}5\\cdot\\text{RIC}$ mugen barruko azken datura iristen dira; kanpokoak atipikoak dira. Zati bakoitzak datuen % 25 inguru du.',
            'El diagrama de caja resume los datos con cinco números. La caja va de $Q_1$ a $Q_3$, con una raya en la mediana. Los bigotes llegan hasta el último dato dentro de los límites $Q_1-1{,}5\\cdot\\text{RIC}$ y $Q_3+1{,}5\\cdot\\text{RIC}$; los de fuera son atípicos. Cada tramo tiene más o menos el 25 % de los datos.',
            'يلخّص مخطط الصندوق البيانات بخمسة أعداد. يمتد الصندوق من $Q_1$ إلى $Q_3$ وفيه خط عند الوسيط. ويصل الشاربان إلى آخر بيان داخل الحدين $Q_1-1{,}5\\cdot\\text{RIC}$ و$Q_3+1{,}5\\cdot\\text{RIC}$؛ وما خارجهما قيم شاذة. وفي كل جزء نحو 25 % من البيانات.',
            'The box plot sums up the data with five numbers. The box goes from $Q_1$ to $Q_3$, with a line at the median. The whiskers reach the last value inside the limits $Q_1-1{,}5\\cdot\\text{RIC}$ and $Q_3+1{,}5\\cdot\\text{RIC}$; the ones outside are outliers. Each part holds about 25% of the data.'
        ),
        examplePrompt: say('$Q_1=20$, $\\text{Me}=24$ eta $Q_3=30$ dira, eta datuak 8 eta 48 artean daude. Ba al dago atipikorik?', '$Q_1=20$, $\\text{Me}=24$ y $Q_3=30$, y los datos van de 8 a 48. ¿Hay atípicos?', '$Q_1=20$ و$\\text{Me}=24$ و$Q_3=30$، والبيانات من 8 إلى 48. هل توجد قيم شاذة؟', '$Q_1=20$, $\\text{Me}=24$ and $Q_3=30$, and the data go from 8 to 48. Are there outliers?'),
        example: same('$\\begin{gathered}1{,}5\\cdot 10=15\\\\ 20-15=5\\qquad 30+15=45\\end{gathered}$'),
        exampleAnswer: say('48 balioak 45 gainditzen du: atipikoa da. Ezkerreko bibotea 8 arte iristen da.', 'El 48 pasa de 45: es atípico. El bigote izquierdo llega hasta el 8.', '48 يتجاوز 45: قيمة شاذة. والشارب الأيسر يصل إلى 8.', '48 is beyond 45: it is an outlier. The left whisker reaches 8.')
    },

    /* ---------- 4. Dispersion ---------- */
    'mean-deviation': {
        vocabulary: [
            say('sakabanaketa', 'dispersión', 'التشتت', 'spread'),
            say('desbideratze ertaina', 'desviación media', 'الانحراف المتوسط', 'mean deviation')
        ],
        explanation: say(
            'Batez bestekoa ez da nahikoa: 4, 6, 7, 8, 10 eta 7, 7, 7, 7, 7 datuek batez besteko bera dute, baina sakabanaketa desberdina. Ibiltarteak, handiena ken txikiena, bi datu bakarrik erabiltzen ditu. Desbideratze ertaina batez bestekorako distantzien batez bestekoa da: $\\text{DM}=\\frac{\\sum f_i\\,|x_i-\\bar{x}|}{N}$. Txikiagoa, datuak orduan eta bilduago.',
            'La media no basta: 4, 6, 7, 8, 10 y 7, 7, 7, 7, 7 tienen la misma media, pero distinta dispersión. El recorrido, mayor menos menor, solo usa dos datos. La desviación media es la media de las distancias a la media: $\\text{DM}=\\frac{\\sum f_i\\,|x_i-\\bar{x}|}{N}$. Cuanto menor es, más agrupados están los datos.',
            'المتوسط لا يكفي: 4، 6، 7، 8، 10 و7، 7، 7، 7، 7 لهما المتوسط نفسه لكن التشتت مختلف. والمدى (الأكبر ناقص الأصغر) يستعمل بيانين فقط. والانحراف المتوسط هو متوسط المسافات عن المتوسط: $\\text{DM}=\\frac{\\sum f_i\\,|x_i-\\bar{x}|}{N}$. وكلما صغر تجمّعت البيانات أكثر.',
            'The mean is not enough: 4, 6, 7, 8, 10 and 7, 7, 7, 7, 7 have the same mean, but a different spread. The range, largest minus smallest, only uses two values. The mean deviation is the mean of the distances to the mean: $\\text{DM}=\\frac{\\sum f_i\\,|x_i-\\bar{x}|}{N}$. The smaller it is, the closer together the data.'
        ),
        examplePrompt: say('Kalkulatu 2, 5, 6, 7, 10 datuen desbideratze ertaina.', 'Calcula la desviación media de 2, 5, 6, 7, 10.', 'احسب الانحراف المتوسط للبيانات 2، 5، 6، 7، 10.', 'Work out the mean deviation of 2, 5, 6, 7, 10.'),
        example: same('$\\begin{gathered}\\bar{x}=\\frac{30}{5}=6\\\\ \\text{DM}=\\frac{4+1+0+1+4}{5}=2\\end{gathered}$'),
        exampleAnswer: say('Batez beste, datuak 2 urruntzen dira batez bestekotik.', 'De media, los datos se alejan 2 de la media.', 'في المتوسط تبتعد البيانات 2 عن المتوسط.', 'On average, the data are 2 away from the mean.'),
        why: {
            text: say(
                '$x_i-\\bar{x}$ desbideratzeek, zeinuarekin, beti 0 ematen dute: datu batzuk gainetik dauden adina beste batzuk azpitik daude. 2, 5, 6, 7, 10 datuekin eta 6 batez bestekoarekin: $-4-1+0+1+4=0$. Horregatik erabiltzen dira distantziak, balio absolutuarekin.',
                'Las desviaciones $x_i-\\bar{x}$ con su signo siempre suman 0: lo que unos datos están por encima, otros lo están por debajo. Con 2, 5, 6, 7, 10 y media 6: $-4-1+0+1+4=0$. Por eso se usan las distancias, con valor absoluto.',
                'مجموع الانحرافات $x_i-\\bar{x}$ بإشاراتها 0 دائمًا: ما تزيده بعض البيانات فوق المتوسط تنقصه أخرى تحته. مع 2، 5، 6، 7، 10 والمتوسط 6: $-4-1+0+1+4=0$. لذلك نستعمل المسافات بالقيمة المطلقة.',
                'The deviations $x_i-\\bar{x}$ with their signs always add up to 0: what some data are above, others are below. With 2, 5, 6, 7, 10 and mean 6: $-4-1+0+1+4=0$. That is why distances, with absolute value, are used.'
            )
        }
    },
    variance: {
        vocabulary: [
            say('bariantza', 'varianza', 'التباين', 'variance'),
            say('desbideratze tipikoa', 'desviación típica', 'الانحراف المعياري', 'standard deviation')
        ],
        explanation: say(
            'Bariantzak desbideratzeak karratura jasotzen ditu: $\\sigma^2=\\frac{\\sum f_i(x_i-\\bar{x})^2}{N}$, edo laburrago, $\\sigma^2=\\frac{\\sum f_i x_i^2}{N}-\\bar{x}^2$: karratuen batez bestekoa ken batez bestekoaren karratua. Haren unitateak karratuan daudenez, desbideratze tipikoa erabiltzen da, $\\sigma=\\sqrt{\\sigma^2}$, datuen unitateetan.',
            'La varianza eleva las desviaciones al cuadrado: $\\sigma^2=\\frac{\\sum f_i(x_i-\\bar{x})^2}{N}$, o, más corto, $\\sigma^2=\\frac{\\sum f_i x_i^2}{N}-\\bar{x}^2$: la media de los cuadrados menos el cuadrado de la media. Como sus unidades están al cuadrado, se usa la desviación típica, $\\sigma=\\sqrt{\\sigma^2}$, en las unidades de los datos.',
            'التباين يربّع الانحرافات: $\\sigma^2=\\frac{\\sum f_i(x_i-\\bar{x})^2}{N}$، أو باختصار $\\sigma^2=\\frac{\\sum f_i x_i^2}{N}-\\bar{x}^2$: متوسط المربعات ناقص مربع المتوسط. وبما أن وحداته مربّعة نستعمل الانحراف المعياري $\\sigma=\\sqrt{\\sigma^2}$ بوحدات البيانات.',
            'The variance squares the deviations: $\\sigma^2=\\frac{\\sum f_i(x_i-\\bar{x})^2}{N}$, or, shorter, $\\sigma^2=\\frac{\\sum f_i x_i^2}{N}-\\bar{x}^2$: the mean of the squares minus the square of the mean. Since its units are squared, the standard deviation is used, $\\sigma=\\sqrt{\\sigma^2}$, in the units of the data.'
        ),
        examplePrompt: say('Kalkulatu 1, 3, 5 eta 7 datuen bariantza eta desbideratze tipikoa.', 'Calcula la varianza y la desviación típica de 1, 3, 5 y 7.', 'احسب التباين والانحراف المعياري للبيانات 1 و3 و5 و7.', 'Work out the variance and the standard deviation of 1, 3, 5 and 7.'),
        example: same('$\\begin{gathered}\\frac{1+9+25+49}{4}-4^{2}=21-16=5\\\\ \\sigma=\\sqrt{5}\\approx 2{,}24\\end{gathered}$'),
        exampleAnswer: say('Batez bestekoa 4, $\\sigma^2=5$ eta $\\sigma\\approx 2{,}24$.', 'Media 4, $\\sigma^2=5$ y $\\sigma\\approx 2{,}24$.', 'المتوسط 4، و$\\sigma^2=5$ و$\\sigma\\approx 2{,}24$.', 'Mean 4, $\\sigma^2=5$ and $\\sigma\\approx 2{,}24$.')
    },
    cv: {
        vocabulary: [
            say('aldakuntza-koefizientea', 'coeficiente de variación', 'معامل الاختلاف', 'coefficient of variation'),
            say('sakabanaketa erlatiboa', 'dispersión relativa', 'التشتت النسبي', 'relative spread')
        ],
        explanation: say(
            '$\\sigma$ batek ez du asko esaten bere batez bestekorik gabe: 2 kg asko da jaioberrietan, eta gutxi helduetan. Aldakuntza-koefizienteak sakabanaketa erlatiboa neurtzen du: $\\text{CV}=\\frac{\\sigma}{\\bar{x}}$, unitaterik gabe eta askotan ehunekotan. CV txikieneko banaketa da homogeneoena. Batez bestekoa 0 zenbakitik hurbil badago, CV-k ez du zentzurik.',
            'Una $\\sigma$ no dice mucho sin su media: 2 kg es mucho en recién nacidos y poco en adultos. El coeficiente de variación mide la dispersión relativa: $\\text{CV}=\\frac{\\sigma}{\\bar{x}}$, sin unidades y a menudo en porcentaje. La distribución de menor CV es la más homogénea. Si la media está cerca de 0, el CV no tiene sentido.',
            'لا تقول $\\sigma$ الكثير دون متوسطها: 2 كغ كثير عند المواليد وقليل عند البالغين. ومعامل الاختلاف يقيس التشتت النسبي: $\\text{CV}=\\frac{\\sigma}{\\bar{x}}$ بلا وحدات وغالبًا كنسبة مئوية. والتوزيع ذو المعامل الأصغر هو الأكثر تجانسًا. وإذا كان المتوسط قريبًا من 0 فلا معنى للمعامل.',
            'A $\\sigma$ says little without its mean: 2 kg is a lot for newborns and little for adults. The coefficient of variation measures the relative spread: $\\text{CV}=\\frac{\\sigma}{\\bar{x}}$, with no units and often as a percentage. The distribution with the smaller CV is the more even one. If the mean is close to 0, the CV makes no sense.'
        ),
        examplePrompt: say('Talde baten altuerek $\\bar{x}=160$ cm eta $\\sigma=8$ cm dituzte; pisuek, $\\bar{x}=50$ kg eta $\\sigma=5$ kg. Zerk aldatzen du gehiago?', 'Las alturas de un grupo tienen $\\bar{x}=160$ cm y $\\sigma=8$ cm; sus pesos, $\\bar{x}=50$ kg y $\\sigma=5$ kg. ¿Qué varía más?', 'لأطوال مجموعة $\\bar{x}=160$ سم و$\\sigma=8$ سم، ولأوزانها $\\bar{x}=50$ كغ و$\\sigma=5$ كغ. أيهما يتغير أكثر؟', 'The heights of a group have $\\bar{x}=160$ cm and $\\sigma=8$ cm; their weights, $\\bar{x}=50$ kg and $\\sigma=5$ kg. Which varies more?'),
        example: same('$\\frac{8}{160}=0{,}05\\qquad\\frac{5}{50}=0{,}1$'),
        exampleAnswer: say('Pisuak: % 10, altueraren % 5 ehunekoaren aurrean.', 'El peso: un 10 % frente al 5 % de la altura.', 'الوزن: 10 % مقابل 5 % للطول.', 'The weight: 10% against 5% for the height.'),
        why: {
            text: say(
                'Batez bestekoaz zatitzeak sakabanaketa proportzio bihurtzen du: 160 batez bestekoaren gainean 8 $\\sigma$ batez bestekoaren % 5 da. Horrela unitateak desagertzen dira, eta altuerak pisuekin konpara daitezke, edo enpresa handiak txikiekin.',
                'Dividir entre la media convierte la dispersión en una proporción: una $\\sigma$ de 8 sobre una media de 160 es el 5 % de la media. Así se borran las unidades y se pueden comparar alturas con pesos, o empresas grandes con pequeñas.',
                'القسمة على المتوسط تحوّل التشتت إلى نسبة: $\\sigma$ قدره 8 مع متوسط 160 هو 5 % من المتوسط. وهكذا تختفي الوحدات ويمكن مقارنة الأطوال بالأوزان، أو الشركات الكبيرة بالصغيرة.',
                'Dividing by the mean turns the spread into a proportion: a $\\sigma$ of 8 on a mean of 160 is 5% of the mean. That removes the units, so heights can be compared with weights, or big firms with small ones.'
            )
        }
    },

    /* ---------- 5. Two variables ---------- */
    scatter: {
        vocabulary: [
            say('puntu-hodeia', 'nube de puntos', 'سحابة النقاط', 'scatter graph'),
            say('erlazio estatistikoa', 'relación estadística', 'علاقة إحصائية', 'statistical relation')
        ],
        explanation: say(
            'Bi dimentsioko banaketa batean, bi aldagai neurtzen zaizkio indibiduo bakoitzari: $(x_i,y_i)$ bikoteak, marraztuta puntu-hodeia osatzen dutenak. Erlazio funtzional batean, $x$ balioak $y$ zehazki ematen du, $y=4x$ funtzioan bezala. Erlazio estatistiko batean, $x$ balioak $y$-ren joera bakarrik adierazten du. Hodeiak zuzen itxura badu, korrelazio lineala dago.',
            'En una distribución bidimensional se miden dos variables a cada individuo: las parejas $(x_i,y_i)$, que dibujadas forman la nube de puntos. En una relación funcional, $x$ da exactamente $y$, como en $y=4x$. En una relación estadística, $x$ solo indica la tendencia de $y$. Si la nube tiene forma de recta, hay correlación lineal.',
            'في التوزيع الثنائي البعد نقيس متغيرين لكل فرد: الأزواج $(x_i,y_i)$ التي تشكّل عند رسمها سحابة النقاط. في العلاقة الدالية تعطي $x$ قيمة $y$ بالضبط كما في $y=4x$. وفي العلاقة الإحصائية تدل $x$ فقط على اتجاه $y$. وإذا كانت السحابة على شكل مستقيم فهناك ارتباط خطي.',
            'In a two-variable distribution, two variables are measured on each individual: the pairs $(x_i,y_i)$, which, drawn, make the scatter graph. In a functional relation, $x$ gives $y$ exactly, as in $y=4x$. In a statistical relation, $x$ only shows the trend of $y$. If the cloud looks like a line, there is linear correlation.'
        ),
        examplePrompt: say('$(1,\\,1)$, $(2,\\,4)$, $(3,\\,9)$: karratu baten aldea eta azalera. $(6,\\,115)$, $(6,\\,118)$, $(7,\\,121)$: haurren adina eta altuera. Zer erlazio dago kasu bakoitzean?', '$(1,\\,1)$, $(2,\\,4)$, $(3,\\,9)$: lado y área de un cuadrado. $(6,\\,115)$, $(6,\\,118)$, $(7,\\,121)$: edad y altura de niños. ¿Qué relación hay en cada caso?', '$(1,\\,1)$ و$(2,\\,4)$ و$(3,\\,9)$: ضلع مربع ومساحته. $(6,\\,115)$ و$(6,\\,118)$ و$(7,\\,121)$: عمر أطفال وطولهم. ما العلاقة في كل حالة؟', '$(1,\\,1)$, $(2,\\,4)$, $(3,\\,9)$: side and area of a square. $(6,\\,115)$, $(6,\\,118)$, $(7,\\,121)$: age and height of children. What relation is there in each case?'),
        example: same('$\\begin{gathered}y=x^{2}\\\\ x=6\\ \\to\\ y=115,\\ y=118\\end{gathered}$'),
        exampleAnswer: say('Azalera $y=x^{2}$ da: funtzionala. 6 urteko bi haurrek altuera desberdina dute: estatistikoa.', 'El área es $y=x^{2}$: funcional. Dos niños de 6 años miden distinto: estadística.', 'المساحة $y=x^{2}$: علاقة دالية. وطفلان في السادسة طولهما مختلف: علاقة إحصائية.', 'The area is $y=x^{2}$: functional. Two 6-year-olds have different heights: statistical.')
    },
    correlation: {
        vocabulary: [
            say('korrelazioa', 'correlación', 'الارتباط', 'correlation'),
            say('korrelazio-koefizientea', 'coeficiente de correlación', 'معامل الارتباط', 'correlation coefficient')
        ],
        explanation: say(
            'Korrelazioa positiboa da $x$ handitzean $y$ handitzen bada, eta negatiboa txikitzen bada; sendoa da puntuak zuzen batetik hurbil badaude. Korrelazio-koefizienteak, $r$, $-1\\le r\\le 1$ betetzen du: zeinuak noranzkoa ematen du, eta $|r|$ balioak indarra. $|r|=1$ funtzionala da, eta 0 inguruan ez dago korrelaziorik. Korrelazioa ez da kausa.',
            'La correlación es positiva si al aumentar $x$ aumenta $y$, y negativa si disminuye; es fuerte si los puntos están cerca de una recta. El coeficiente de correlación, $r$, cumple $-1\\le r\\le 1$: el signo da el sentido y $|r|$, la fuerza. $|r|=1$ es funcional, y cerca de 0 no hay correlación. Correlación no es causa.',
            'يكون الارتباط موجبًا إذا زادت $y$ بزيادة $x$، وسالبًا إذا نقصت؛ ويكون قويًا إذا كانت النقاط قريبة من مستقيم. ومعامل الارتباط $r$ يحقق $-1\\le r\\le 1$: الإشارة تعطي الاتجاه و$|r|$ القوة. و$|r|=1$ علاقة دالية، وقرب 0 لا ارتباط. والارتباط ليس سببًا.',
            'The correlation is positive if $y$ grows as $x$ grows, and negative if it falls; it is strong if the points are close to a line. The correlation coefficient, $r$, satisfies $-1\\le r\\le 1$: the sign gives the direction and $|r|$ the strength. $|r|=1$ is functional, and near 0 there is no correlation. Correlation is not cause.'
        ),
        examplePrompt: say('Ordenatu sendoenetik ahulenera: $r=-0{,}9$, $r=0{,}4$ eta $r=0{,}75$.', 'Ordena de más fuerte a más débil: $r=-0{,}9$, $r=0{,}4$ y $r=0{,}75$.', 'رتّب من الأقوى إلى الأضعف: $r=-0{,}9$ و$r=0{,}4$ و$r=0{,}75$.', 'Order from strongest to weakest: $r=-0{,}9$, $r=0{,}4$ and $r=0{,}75$.'),
        example: same('$|-0{,}9|>|0{,}75|>|0{,}4|$'),
        exampleAnswer: say('Sendoena $r=-0{,}9$ da, negatiboa: $|r|$ hartzen da kontuan, ez zeinua.', 'La más fuerte es $r=-0{,}9$, negativa: cuenta $|r|$, no el signo.', 'الأقوى $r=-0{,}9$ وهو سالب: المهم $|r|$ لا الإشارة.', 'The strongest is $r=-0{,}9$, negative: $|r|$ counts, not the sign.')
    },
    regression: {
        vocabulary: [
            say('erregresio-zuzena', 'recta de regresión', 'مستقيم الانحدار', 'regression line'),
            say('estimazioa', 'estimación', 'التقدير', 'estimate')
        ],
        explanation: say(
            'Erregresio-zuzena hodeira hobekien egokitzen dena da, eta batez bestekoen puntutik pasatzen da, $(\\bar{x},\\bar{y})$: $\\hat{y}-\\bar{y}=m\\,(x-\\bar{x})$. Haren maldak $r$ koefizientearen zeinua du. Estimatzeko, $x$ ordezten da. Estimazioa fidagarria da $|r|$ 1 zenbakitik hurbil badago eta $x$ datuen tartearen barruan badago.',
            'La recta de regresión es la que mejor se ajusta a la nube, y pasa por el punto de las medias, $(\\bar{x},\\bar{y})$: $\\hat{y}-\\bar{y}=m\\,(x-\\bar{x})$. Su pendiente tiene el signo de $r$. Para estimar, se sustituye $x$. La estimación es fiable si $|r|$ está cerca de 1 y $x$ está dentro del intervalo de los datos.',
            'مستقيم الانحدار هو الأنسب للسحابة، ويمر بنقطة المتوسطين $(\\bar{x},\\bar{y})$: $\\hat{y}-\\bar{y}=m\\,(x-\\bar{x})$. وإشارة ميله إشارة $r$. وللتقدير نعوّض $x$. ويكون التقدير موثوقًا إذا كان $|r|$ قريبًا من 1 وكانت $x$ داخل فترة البيانات.',
            'The regression line is the one that best fits the cloud, and it goes through the point of the means, $(\\bar{x},\\bar{y})$: $\\hat{y}-\\bar{y}=m\\,(x-\\bar{x})$. Its slope has the sign of $r$. To estimate, substitute $x$. The estimate is reliable if $|r|$ is close to 1 and $x$ is inside the interval of the data.'
        ),
        examplePrompt: say('Auto baten prezioaren (€) erregresio-zuzena, urteen arabera, $\\hat{y}=-1500x+18\\,000$ da. Estimatu prezioa 4 urteren buruan.', 'La recta de regresión del precio (€) de un coche según sus años es $\\hat{y}=-1500x+18\\,000$. Estima el precio a los 4 años.', 'مستقيم انحدار سعر سيارة (€) بحسب عمرها $\\hat{y}=-1500x+18\\,000$. قدّر سعرها بعد 4 سنوات.', 'The regression line of the price (€) of a car against its age is $\\hat{y}=-1500x+18\\,000$. Estimate its price after 4 years.'),
        example: same('$\\hat{y}=-1500\\cdot 4+18\\,000=12\\,000$'),
        exampleAnswer: say('12 000 € inguru: malda negatiboak esaten du urtean 1500 € galtzen dituela.', 'Unos 12 000 €: la pendiente negativa dice que pierde 1500 € al año.', 'نحو 12 000 €: الميل السالب يعني أنها تخسر 1500 € في السنة.', 'About €12,000: the negative slope says it loses €1,500 a year.')
    }
}
